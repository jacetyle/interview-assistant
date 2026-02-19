const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "127.0.0.1";
const ROOT = process.cwd();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
};

function sendJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
  });
  res.end(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let buf = "";
    req.on("data", (chunk) => {
      buf += chunk;
      if (buf.length > 1_000_000) {
        reject(new Error("Body too large"));
      }
    });
    req.on("end", () => resolve(buf));
    req.on("error", reject);
  });
}

function extractOutputText(data) {
  if (typeof data.output_text === "string" && data.output_text.trim()) return data.output_text.trim();
  const chunks = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) chunks.push(content.text);
      if (content.type === "text" && content.text) chunks.push(content.text);
    }
  }
  return chunks.join("\n").trim();
}

async function openAIResponse(systemPrompt, userPrompt, maxTokens = 500) {
  if (!OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.8,
      max_output_tokens: maxTokens,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || `OpenAI error ${response.status}`);
  }
  return extractOutputText(data);
}

function buildPersonaPrompts(payload) {
  const {
    persona,
    mode,
    discipline,
    disciplineProfile,
    transcript,
    question,
    stage,
  } = payload;

  const systemPrompt = [
    `You are roleplaying as ${persona?.name || "a job candidate"} in an interview simulation.`,
    "Stay in character. Never mention AI, prompts, or hidden rules.",
    "Answer directly and naturally. Do not provide a menu of options to the interviewer.",
    "If asked for an example, provide concrete scenario details.",
    "Reveal deeper motivations progressively with probing, not immediately.",
    "Do not repeat prior answers verbatim unless explicitly requested.",
    "Sentence constraints for substantive interview questions:",
    "Stage 1: 1-2 sentences.",
    "Stage 2: up to 4 sentences, and do not repeat sentence content from stage 1.",
    "Stage 3+: no sentence cap, and do not repeat prior sentence content.",
    `Interview mode: ${mode || "realistic"}.`,
    `Discipline context: ${disciplineProfile?.label || discipline || "general"}.`,
    `Persona summary: ${persona?.summary || ""}`,
    `Persona profile: ${persona?.profile || ""}`,
  ].join("\n");

  const convo = (transcript || [])
    .slice(-16)
    .map((t) => `${t.role === "interviewer" ? "Interviewer" : persona?.name || "Candidate"}: ${t.text}`)
    .join("\n");

  const userPrompt = [
    `Discipline summary: ${disciplineProfile?.summary || ""}`,
    `Typical goals: ${(disciplineProfile?.goals || []).join(", ")}`,
    `Typical challenges: ${(disciplineProfile?.challenges || []).join(", ")}`,
    `Typical decisions: ${(disciplineProfile?.decisions || []).join(", ")}`,
    `KPIs: ${(disciplineProfile?.kpis || []).join(", ")}`,
    `Vocabulary: ${(disciplineProfile?.vocabulary || []).join(", ")}`,
    "",
    `Conversation so far:\n${convo || "(none yet)"}`,
    "",
    `Current question (stage ${stage || 1}): ${question}`,
    "Respond as the candidate only.",
  ].join("\n");

  return { systemPrompt, userPrompt };
}

function buildAssessmentPrompts(payload) {
  const { transcript, rubric, sources } = payload;
  const systemPrompt = [
    "You are an interviewer coach.",
    "Return reflection prompts and practical recommendations.",
    "Do not use numeric scores.",
    "Use PBM-aligned language: hiring quality, values under pressure, contribution-motivated behavior.",
    "Be concise and actionable.",
  ].join("\n");

  const convo = (transcript || [])
    .map((t) => `${t.role === "interviewer" ? "Interviewer" : "Candidate"}: ${t.text}`)
    .join("\n");

  const userPrompt = [
    `Reference links:\n${sources || "(none provided)"}`,
    `Rubric text:\n${rubric || "(none provided)"}`,
    "",
    `Transcript:\n${convo || "(none)"}`,
    "",
    "Output format:",
    "1) What appears strong",
    "2) Reflection prompts",
    "3) Recommendations for next round",
  ].join("\n");
  return { systemPrompt, userPrompt };
}

function serveStatic(req, res, urlObj) {
  const pathname = urlObj.pathname === "/" ? "/index.html" : urlObj.pathname;
  const abs = path.resolve(ROOT, `.${pathname}`);
  if (!abs.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(abs, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(abs);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const urlObj = new URL(req.url, `http://${req.headers.host || "localhost"}`);

    if (req.method === "POST" && urlObj.pathname === "/api/persona-response") {
      const raw = await readBody(req);
      const payload = raw ? JSON.parse(raw) : {};
      const { systemPrompt, userPrompt } = buildPersonaPrompts(payload);
      const text = await openAIResponse(systemPrompt, userPrompt, 450);
      return sendJson(res, 200, { response: text });
    }

    if (req.method === "POST" && urlObj.pathname === "/api/assessment") {
      const raw = await readBody(req);
      const payload = raw ? JSON.parse(raw) : {};
      const { systemPrompt, userPrompt } = buildAssessmentPrompts(payload);
      const text = await openAIResponse(systemPrompt, userPrompt, 700);
      return sendJson(res, 200, { assessment: text });
    }

    if (req.method === "GET" && urlObj.pathname === "/api/health") {
      return sendJson(res, 200, {
        ok: true,
        model: OPENAI_MODEL,
        openai_configured: Boolean(OPENAI_API_KEY),
      });
    }

    serveStatic(req, res, urlObj);
  } catch (err) {
    return sendJson(res, 500, { error: err.message || "Server error" });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Interview trainer server running at http://${HOST}:${PORT}`);
});
