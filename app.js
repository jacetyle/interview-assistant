const personas = [
  {
    id: "ashley",
    name: "Ashley",
    summary:
      "20+ year lifer, highly technical and reliable. Nervous with small talk, strong in systems troubleshooting, guarded about motivation unless probed.",
    profile:
      "Stabilizer mindset, deep institutional memory, cautious openness to change, professional and slightly stiff.",
    probeHints: {
      motivation: "Probe twice on motivation to surface the autonomy issue with the new supervisor.",
      change: "Ask about major change or undefined environments to expose discomfort with ambiguity.",
      failure: "Push for personal responsibility, not only system fixes.",
      ownership: "Redirect if she drifts into technical detail without answering the behavioral core.",
      default: "Use focused follow-ups to tighten wandering answers.",
    },
  },
  {
    id: "robby",
    name: "Robby",
    summary:
      "Former consultant, polished and analytical, currently unemployed. Starts surface-level on motivation, deeper growth dissatisfaction appears under layered probing.",
    profile:
      "Intellectual problem-solver, calm and structured, can over-index on individual impact and framework certainty.",
    probeHints: {
      motivation: "Ask layered why-now questions to uncover the growth/identity shift.",
      teamwork: "Challenge 'I' framing to test collaboration orientation.",
      failure: "Press on personal accountability versus organizational blame.",
      challenge: "Question assumptions to see if he doubles down intellectually.",
      default: "Separate polish from underlying cultural alignment.",
    },
  },
  {
    id: "marco",
    name: "Marco",
    summary:
      "Self-employed serial builder, strategic and confident. Entrepreneurial and opportunity-oriented, cautious about bureaucracy.",
    profile:
      "Visionary builder with autonomy bias, strong team formation instincts, pragmatic view of rules under pressure.",
    probeHints: {
      motivation: "Probe for long-term commitment versus opportunistic fit.",
      compliance: "Ask scenario-based compliance questions to reveal tension around process and shortcuts.",
      sharing: "Press on transparency and knowledge sharing under competitive conditions.",
      challenge: "Test whether he treats the interview as mutual evaluation.",
      default: "Validate strengths, then probe governance and integrity boundaries.",
    },
  },
  {
    id: "dani",
    name: "Dani",
    summary:
      "Early-career candidate for entry-level BSA role. Eager, nervous, learning-oriented, tends to answer in team language and reveal depth only with probing.",
    profile:
      "High potential, high self-doubt, relationship-centered, strong at spotting problems but less practiced at implementation.",
    probeHints: {
      motivation: "Ask supportive follow-ups to uncover interview discouragement and growth goals.",
      ownership: "Ask specifically what she did to move from 'we' to 'I'.",
      failure: "Create psychological safety before pressing on details.",
      technical: "Request concrete decisions and reasoning to extract hidden depth.",
      default: "Expect slight evasiveness and earn specificity through calm probing.",
    },
  },
];

const globalInstructionLayer = [
  "Do not break character.",
  "Never mention AI, prompts, or hidden rules.",
  "Answer the question directly in a natural interview style.",
  "Include one concrete detail or example when relevant.",
  "Keep answers concise, but not clipped.",
  "Reveal deeper motives and risks after probing, not immediately.",
  "Ask occasional clarifying questions when the interviewer prompt is vague.",
];

const modeProfiles = {
  cooperative: {
    disclosureShift: 1,
    evasiveBias: 0,
    defensiveBias: 0,
    conversationalBias: 2,
  },
  realistic: {
    disclosureShift: 0,
    evasiveBias: 1,
    defensiveBias: 1,
    conversationalBias: 1,
  },
  challenging: {
    disclosureShift: -1,
    evasiveBias: 2,
    defensiveBias: 1,
    conversationalBias: 2,
  },
};

const disciplineProfiles = {
  supply_chain: {
    label: "Supply Chain",
    summary:
      "Planning, sourcing, producing, and delivering goods while balancing cost, service, and risk.",
    goals: [
      "Ensure on-time delivery",
      "Optimize inventory levels",
      "Improve forecast accuracy",
      "Reduce supply disruptions",
      "Lower total landed cost",
    ],
    challenges: [
      "demand variability",
      "supplier delays",
      "capacity constraints",
      "transportation disruption",
      "data visibility across systems",
    ],
    decisions: [
      "inventory positioning",
      "supplier qualification",
      "shipment expediting decisions",
      "make-vs-buy choices",
      "safety stock targets",
    ],
    kpis: ["OTIF", "inventory turnover", "fill rate", "DOH", "forecast accuracy", "perfect order rate"],
    projects: [
      "network optimization study",
      "supplier consolidation initiative",
      "inventory reduction program",
      "ERP implementation",
      "new product launch support",
    ],
    vocabulary: ["lead time", "safety stock", "S&OP", "procurement", "throughput", "backorder", "root cause"],
  },
  supervising: {
    label: "Supervising",
    summary:
      "Leading a team to deliver operational results while developing people and maintaining standards.",
    goals: [
      "Meet productivity and quality targets",
      "Improve engagement and retention",
      "Ensure safety and compliance",
      "Develop employee skills",
    ],
    challenges: [
      "performance variability",
      "scheduling conflicts",
      "resource constraints",
      "communication breakdowns",
      "training gaps",
    ],
    decisions: [
      "task assignment",
      "workload balancing",
      "performance improvement actions",
      "shift coverage planning",
      "issue escalation",
    ],
    kpis: ["productivity rate", "defect rate", "turnover", "engagement score", "safety incidents", "SLA adherence"],
    projects: [
      "cross-training rollout",
      "performance coaching program",
      "safety improvement campaign",
      "onboarding program",
      "process improvement initiative",
    ],
    vocabulary: ["coaching", "accountability", "SOP", "delegation", "continuous improvement", "workforce planning"],
  },
  software_development: {
    label: "Software Development",
    summary: "Designing, building, testing, and maintaining software to meet user and business needs.",
    goals: [
      "Deliver high-quality code",
      "Reduce defects and technical debt",
      "Improve performance and scalability",
      "Maintain secure and reliable systems",
    ],
    challenges: [
      "changing requirements",
      "technical debt",
      "integration issues",
      "performance bottlenecks",
      "security vulnerabilities",
      "cross-team dependencies",
    ],
    decisions: [
      "architecture and design patterns",
      "technology stack choices",
      "refactoring priorities",
      "feature tradeoffs",
      "bug prioritization",
    ],
    kpis: ["deployment frequency", "defect rate", "lead time for changes", "system uptime", "code coverage"],
    projects: [
      "API integration",
      "platform migration",
      "performance optimization",
      "security hardening",
      "legacy modernization",
    ],
    vocabulary: ["refactoring", "technical debt", "microservices", "CI/CD", "code review", "regression testing"],
  },
  sales: {
    label: "Sales",
    summary: "Driving revenue through prospecting, relationship building, and closing qualified deals.",
    goals: [
      "Meet or exceed revenue targets",
      "Expand customer base",
      "Increase deal size",
      "Improve retention",
      "Strengthen pipeline coverage",
    ],
    challenges: [
      "long sales cycles",
      "price objections",
      "competitive pressure",
      "forecast inaccuracy",
      "lead quality variability",
    ],
    decisions: [
      "prospect qualification",
      "discounting within guidelines",
      "account prioritization",
      "negotiation strategy",
      "territory focus",
    ],
    kpis: ["revenue attainment", "win rate", "average deal size", "pipeline value", "sales cycle length", "renewal rate"],
    projects: [
      "new territory launch",
      "key account expansion",
      "product launch campaign",
      "sales playbook development",
      "CRM implementation",
    ],
    vocabulary: ["pipeline", "quota", "close rate", "objection handling", "value proposition", "upsell", "discovery call"],
  },
};

const defaultAssessmentReferences = [
  "https://www.principlebasedmanagement.com/en/applying-pbm/hiring",
  "https://www.principlebasedmanagement.com/en/fundamentals/five-dimensions/virtue-and-talents-dimension/our-values",
  "https://www.principlebasedmanagement.com/en/fundamentals/principles/contribution-motivated#motivations-and-behaviors",
];

const state = {
  activePersonaId: personas[0].id,
  interviewMode: "realistic",
  discipline: "software_development",
  log: [],
  probes: {},
  transcript: [],
  memory: {
    lastQuestionIntent: "",
    lastExampleTopic: "",
    lastFollowupRequest: "",
    recentResponses: [],
    substantiveQuestionCount: 0,
    firstAnswerSentences: [],
    priorAnswerSentences: [],
  },
  evaluator: {
    sources: "",
    rubric: "",
    lastReport: "",
  },
};

const el = {
  personaSelect: document.getElementById("personaSelect"),
  globalRules: document.getElementById("globalRules"),
  personaSummary: document.getElementById("personaSummary"),
  interviewMode: document.getElementById("interviewMode"),
  disciplineSelect: document.getElementById("disciplineSelect"),
  questionInput: document.getElementById("questionInput"),
  askQuestionBtn: document.getElementById("askQuestionBtn"),
  resetSessionBtn: document.getElementById("resetSessionBtn"),
  responseBox: document.getElementById("responseBox"),
  probeHintBox: document.getElementById("probeHintBox"),
  sessionLog: document.getElementById("sessionLog"),
  rubricSources: document.getElementById("rubricSources"),
  rubricInput: document.getElementById("rubricInput"),
  runAssessmentBtn: document.getElementById("runAssessmentBtn"),
  clearAssessmentBtn: document.getElementById("clearAssessmentBtn"),
  exportSessionBtn: document.getElementById("exportSessionBtn"),
  assessmentBox: document.getElementById("assessmentBox"),
};

init();

function init() {
  el.interviewMode.value = state.interviewMode;
  el.disciplineSelect.value = state.discipline;
  renderPersonaSelect();
  renderGlobalRules();
  renderPersonaSummary();
  el.rubricSources.value = defaultAssessmentReferences.join("\n");
  bindEvents();
  el.probeHintBox.textContent = modeSummary();
}

function bindEvents() {
  el.personaSelect.addEventListener("change", () => {
    state.activePersonaId = el.personaSelect.value;
    resetSession();
    renderPersonaSummary();
    el.responseBox.textContent = "Persona switched. Ask a question to continue.";
  });

  el.interviewMode.addEventListener("change", () => {
    state.interviewMode = el.interviewMode.value;
    el.probeHintBox.textContent = modeSummary();
  });

  el.disciplineSelect.addEventListener("change", () => {
    state.discipline = el.disciplineSelect.value;
    el.probeHintBox.textContent = modeSummary();
  });

  el.askQuestionBtn.addEventListener("click", () => {
    const question = el.questionInput.value.trim();
    if (!question) {
      el.responseBox.textContent = "Enter an interview question first.";
      return;
    }

    const topic = classifyTopic(question);
    registerQuestionStage(topic);
    incrementProbe(topic);

    const response = buildResponse(getPersona(), topic, question);
    const hint = getProbeHint(getPersona(), topic);

    el.responseBox.textContent = response;
    el.probeHintBox.textContent = hint;
    state.transcript.push({
      role: "interviewer",
      text: question,
      topic,
      timestamp: Date.now(),
    });
    state.transcript.push({
      role: "candidate",
      text: response,
      topic,
      personaId: state.activePersonaId,
      timestamp: Date.now(),
    });
    pushLog(`Q: ${question}`);
    pushLog(`${getPersona().name}: ${response}`);
    renderLog();
    el.questionInput.value = "";
  });

  el.resetSessionBtn.addEventListener("click", () => {
    resetSession();
    el.responseBox.textContent = "Session reset. Ask a question to begin again.";
    el.probeHintBox.textContent = modeSummary();
  });

  el.runAssessmentBtn.addEventListener("click", () => {
    runAssessment();
  });

  el.clearAssessmentBtn.addEventListener("click", () => {
    el.rubricSources.value = "";
    el.rubricInput.value = "";
    state.evaluator.sources = "";
    state.evaluator.rubric = "";
    state.evaluator.lastReport = "";
    el.assessmentBox.textContent = "Assessment cleared.";
  });

  el.exportSessionBtn.addEventListener("click", () => {
    exportSession();
  });
}

function renderGlobalRules() {
  el.globalRules.value = globalInstructionLayer.join("\n");
}

function renderPersonaSelect() {
  el.personaSelect.innerHTML = "";
  for (const persona of personas) {
    const option = document.createElement("option");
    option.value = persona.id;
    option.textContent = persona.name;
    if (persona.id === state.activePersonaId) option.selected = true;
    el.personaSelect.append(option);
  }
}

function renderPersonaSummary() {
  const p = getPersona();
  el.personaSummary.value = `${p.summary}\n\n${p.profile}`;
}

function getPersona() {
  return personas.find((p) => p.id === state.activePersonaId);
}

function resetSession() {
  state.log = [];
  state.probes = {};
  state.transcript = [];
  state.memory = {
    lastQuestionIntent: "",
    lastExampleTopic: "",
    lastFollowupRequest: "",
    recentResponses: [],
    substantiveQuestionCount: 0,
    firstAnswerSentences: [],
    priorAnswerSentences: [],
  };
  renderLog();
}

function renderLog() {
  el.sessionLog.innerHTML = "";
  for (const line of state.log.slice(0, 20)) {
    const li = document.createElement("li");
    li.textContent = line;
    el.sessionLog.append(li);
  }
}

function pushLog(line) {
  state.log.unshift(line);
}

function classifyTopic(question) {
  const q = question.toLowerCase();
  if (isSmalltalk(question) && !containsInterviewIntent(question)) {
    return "smalltalk";
  }
  if (hasAny(q, ["why leave", "why are you looking", "why this role", "motivat", "job search"])) {
    return "motivation";
  }
  if (hasAny(q, ["change", "adapt", "new tool", "overhaul", "ambigu", "uncertain"])) {
    return "change";
  }
  if (hasAny(q, ["fail", "mistake", "regret", "what went wrong"])) {
    return "failure";
  }
  if (hasAny(q, ["compliance", "policy", "rule", "governance", "required process"])) {
    return "compliance";
  }
  if (
    hasAny(q, [
      "team",
      "collaborat",
      "share",
      "knowledge",
      "cross-functional",
      "customer",
      "client",
      "stakeholder",
      "coworker",
      "co-worker",
      "colleague",
      "teammate",
      "peer",
      "conflict",
    ])
  ) {
    return "teamwork";
  }
  if (
    hasAny(q, [
      "role",
      "contribution",
      "specifically",
      "specific example",
      "what did you do",
      "how did you investigate",
      "investigate",
      "i vs we",
      "ownership",
      "actual problem",
      "what was the problem",
      "trying to solve",
      "root cause",
    ])
  ) {
    return "ownership";
  }
  if (hasAny(q, ["technical", "architecture", "system", "troubleshoot", "analysis", "bsa"])) {
    return "technical";
  }
  if (hasAny(q, ["status quo", "challenge", "disagree", "push back"])) {
    return "challenge";
  }
  return "default";
}

function hasAny(value, needles) {
  return needles.some((needle) => value.includes(needle));
}

function incrementProbe(topic) {
  state.probes[topic] = (state.probes[topic] || 0) + 1;
}

function probeLevel(topic, question) {
  const directProbeTerms = ["specifically", "exactly", "personally", "be concrete", "what was your role"];
  const bonus = hasAny(question.toLowerCase(), directProbeTerms) ? 1 : 0;
  const level = (state.probes[topic] || 1) + bonus;
  return Math.min(level, 3);
}

function getProbeHint(persona, topic) {
  const baseHint = persona.probeHints[topic] || persona.probeHints.default;
  return `${baseHint}\n\nMode: ${modeSummary()}`;
}

function buildResponse(persona, topic, question) {
  // Persona engine path is intentionally isolated from evaluator rubric context.
  let targetQuestion = question;
  let targetTopic = topic;
  if (isCorrectionPrompt(question) || isContinuationPrompt(question)) {
    const prior = getLastSubstantiveInterviewerQuestion();
    if (prior) {
      targetQuestion = prior;
      targetTopic = classifyTopic(prior);
    }
  }

  if (targetTopic === "smalltalk") {
    return smalltalkResponse(persona);
  }
  if (isVaguePrompt(targetQuestion)) {
    return vaguePromptResponse(persona);
  }

  const intent = buildQuestionIntent(persona, targetTopic, targetQuestion);
  let response = composeResponseFromIntent(persona, intent);
  response = enforceResponseContracts(persona, intent, response);
  response = applyModeVoice(persona, intent, response);
  response = enforceGlobalLayer(response);
  if (!response.trim()) {
    const fallbackTopic = state.memory.lastExampleTopic || "default";
    const fallback = buildPersonaExample(persona.id, fallbackTopic, 2) || "I can share a concrete example if you want.";
    response = `Yes. One relevant example is this: ${fallback}`;
  }
  response = applyStageResponsePolicy(response, topic);
  rememberResponse(intent, response);
  return response;
}

function registerQuestionStage(topic) {
  if (topic === "smalltalk") return;
  state.memory.substantiveQuestionCount += 1;
}

function applyStageResponsePolicy(response, topic) {
  if (topic === "smalltalk") return response;

  const stage = state.memory.substantiveQuestionCount;
  let sentences = splitSentences(response);
  if (!sentences.length) return response;

  if (stage === 1) {
    sentences = sentences.slice(0, 2);
  } else if (stage === 2) {
    const blocked = new Set(state.memory.firstAnswerSentences);
    sentences = sentences.filter((s) => !blocked.has(normalizeSentence(s)));
    if (!sentences.length) {
      sentences = splitSentences(response).slice(0, 4);
    }
    sentences = sentences.slice(0, 4);
  } else {
    const blocked = new Set(state.memory.priorAnswerSentences);
    sentences = sentences.filter((s) => !blocked.has(normalizeSentence(s)));
    if (!sentences.length) {
      sentences = splitSentences(response);
    }
  }

  return sentences.join(" ").trim();
}

function buildQuestionIntent(persona, topic, question) {
  const rawLevel = probeLevel(topic, question);
  const tuning = getModeTuning();
  const q = question.toLowerCase();
  const scenarioContinuation =
    Boolean(state.memory.lastExampleTopic) &&
    hasAny(q, [
      "they",
      "them",
      "that example",
      "this example",
      "what did they",
      "what was delivered",
      "what did you deliver",
      "what happened next",
      "be more specific",
      "more details",
      "that looked like",
      "how you did it",
      "how did they respond",
      "how did that turn out",
      "turn out",
      "outcomes you mentioned",
      "performance outcomes",
    ]);
  const followupFocus = detectFollowupFocus(q);
  const requiresExample =
    questionNeedsExample(question) ||
    scenarioContinuation ||
    (Boolean(state.memory.lastExampleTopic) && followupFocus !== "none") ||
    hasAny(q, ["difficult problem", "challenge", "failure", "mistake", "customer", "client"]);
  const exampleTopic = scenarioContinuation ? state.memory.lastExampleTopic : resolveExampleTopic(topic, question);

  let detailLevel = clamp(rawLevel + tuning.disclosureShift, 1, 3);
  if (tuning.evasiveBias >= 2) detailLevel = Math.max(1, detailLevel - 1);

  return {
    personaId: persona.id,
    topic,
    question,
    requiresExample,
    followupFocus,
    exampleTopic,
    detailLevel,
    mode: state.interviewMode,
    discipline: state.discipline,
  };
}

function detectFollowupFocus(q) {
  if (
    hasAny(q, [
      "what they expected",
      "what was expected",
      "what was delivered",
      "how did they not match",
      "did not match",
      "didn't match",
      "mismatch",
      "expected and what was delivered",
    ])
  )
    return "mismatch";
  if (hasAny(q, ["what was the problem", "actual problem", "trying to solve", "root cause"])) return "problem";
  if (hasAny(q, ["what did you do", "how did you", "investigate", "what action"])) return "action";
  if (
    hasAny(q, [
      "result",
      "outcome",
      "impact",
      "what happened next",
      "what was delivered",
      "delivered",
      "how did they respond",
      "how did that turn out",
      "turn out",
      "response",
    ])
  )
    return "result";
  return "none";
}

function composeResponseFromIntent(persona, intent) {
  let base;
  if (persona.id === "ashley") base = ashleyResponse(intent.topic, intent.detailLevel);
  else if (persona.id === "robby") base = robbyResponse(intent.topic, intent.detailLevel);
  else if (persona.id === "marco") base = marcoResponse(intent.topic, intent.detailLevel);
  else base = daniResponse(intent.topic, intent.detailLevel);

  base = stripMetaFraming(base);

  if (!intent.requiresExample) {
    return expandNonExampleAnswer(persona.id, intent, base);
  }

  const example = buildContextualExample(persona.id, intent);
  const lead = directLeadForIntent(intent);
  return [lead, example].filter(Boolean).join(" ").trim();
}

function directLeadForIntent(intent) {
  if (!intent.requiresExample) return "";
  if (intent.followupFocus === "problem") return "The core problem was this:";
  if (intent.followupFocus === "action") return "What I did was this:";
  if (intent.followupFocus === "result") return "The result was this:";
  return "Yes. One relevant example is this:";
}

function enforceResponseContracts(persona, intent, response) {
  let out = stripMetaFraming(response).trim();
  if (!out) out = response.trim();

  if (intent.requiresExample && !hasConcreteExample(out)) {
    const fallback = buildContextualExample(persona.id, {
      ...intent,
      detailLevel: Math.max(2, intent.detailLevel),
    });
    out = `${directLeadForIntent(intent)} ${fallback}`.trim();
  }

  if (intent.requiresExample && isTooThin(out)) {
    const expanded = buildContextualExample(persona.id, {
      ...intent,
      detailLevel: 3,
    });
    out = `${directLeadForIntent(intent)} ${expanded}`.trim();
  }

  if (isLikelyRepeat(out)) {
    const altLevel = intent.detailLevel === 3 ? 2 : 3;
    const alt = buildContextualExample(persona.id, {
      ...intent,
      detailLevel: altLevel,
    });
    if (alt && !out.includes(alt)) out = `${directLeadForIntent(intent)} ${alt}`.trim();
  }

  return out;
}

function applyModeVoice(persona, intent, response) {
  let out = response;
  if (intent.mode === "challenging" && !intent.requiresExample) {
    out = `${out} ${challengingTail(persona.id)}`.trim();
  }
  if (
    intent.mode === "cooperative" &&
    intent.requiresExample &&
    intent.followupFocus === "none" &&
    !/\bwhat i learned|learned\b/i.test(out)
  ) {
    out = `${out} What I learned from that was to make expectations explicit earlier.`.trim();
  }
  return out;
}

function challengingTail(personaId) {
  const tails = {
    ashley: "If you want deeper detail, I can go step by step.",
    robby: "If useful, I can unpack the logic further.",
    marco: "If helpful, I can go deeper on tradeoffs.",
    dani: "If helpful, I can explain my specific part in more detail.",
  };
  return tails[personaId] || "";
}

function rememberResponse(intent, response) {
  state.memory.lastQuestionIntent = intent.topic;
  state.memory.lastExampleTopic = intent.exampleTopic;
  state.memory.lastFollowupRequest = intent.followupFocus;
  state.memory.recentResponses.unshift(normalizeForRepeat(response));
  state.memory.recentResponses = state.memory.recentResponses.slice(0, 8);

  if (intent.topic === "smalltalk") return;

  const normalizedSentences = splitSentences(response).map(normalizeSentence).filter(Boolean);
  if (state.memory.substantiveQuestionCount === 1) {
    state.memory.firstAnswerSentences = normalizedSentences.slice();
  }
  state.memory.priorAnswerSentences.push(...normalizedSentences);
  state.memory.priorAnswerSentences = state.memory.priorAnswerSentences.slice(-80);
}

function isLikelyRepeat(response) {
  const normalized = normalizeForRepeat(response);
  return state.memory.recentResponses.includes(normalized);
}

function normalizeForRepeat(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s{2,}/g, " ").trim();
}

function splitSentences(text) {
  return (text || "")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalizeSentence(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function expandNonExampleAnswer(personaId, intent, base) {
  if (intent.mode === "challenging") return base;
  const q = intent.question.toLowerCase();
  if (!hasAny(q, ["why", "how", "decision", "challenge", "tradeoff", "motivation"])) return base;

  const detail = buildPersonaExample(personaId, intent.exampleTopic, Math.max(1, intent.detailLevel - 1));
  const flavor = buildRoleFlavor(
    intent.discipline,
    intent.followupFocus,
    intent.detailLevel,
    intent.exampleTopic,
    intent.question
  );
  if (!detail || base.toLowerCase().includes(detail.toLowerCase())) return base;
  if (isTooThin(base)) return `${base} ${detail} ${flavor}`.trim();
  return base;
}

function buildContextualExample(personaId, intent) {
  const context = buildPersonaExample(personaId, intent.exampleTopic, 1);
  const action = buildPersonaExample(personaId, intent.exampleTopic, 2);
  const result = buildPersonaExample(personaId, intent.exampleTopic, 3);
  const flavor = buildRoleFlavor(
    intent.discipline,
    intent.followupFocus,
    intent.detailLevel,
    intent.exampleTopic,
    intent.question
  );

  const mode = intent.mode;
  const detail = intent.detailLevel;

  if (intent.followupFocus === "problem") {
    return [context, detail >= 3 ? action : "", flavor].filter(Boolean).join(" ");
  }
  if (intent.followupFocus === "action") {
    return [context, action, detail >= 3 ? "I chose that approach because it solved the immediate risk first." : ""]
      .filter(Boolean)
      .concat(flavor)
      .filter(Boolean)
      .join(" ");
  }
  if (intent.followupFocus === "result") {
    return [action, result, flavor].filter(Boolean).join(" ");
  }
  if (intent.followupFocus === "mismatch") {
    return [buildMismatchDetail(intent.discipline)].filter(Boolean).join(" ");
  }

  if (mode === "challenging") {
    return [context, detail >= 2 ? action : "", flavor].filter(Boolean).join(" ");
  }
  if (mode === "realistic") {
    return [context, action, detail >= 2 ? result : "", flavor].filter(Boolean).join(" ");
  }
  return [context, action, result, flavor].filter(Boolean).join(" ");
}

function isTooThin(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return words < 20;
}

function buildMismatchDetail(discipline) {
  if (discipline === "supply_chain") {
    return "They expected full quantity delivery by the committed date, but what was delivered was a partial shipment two days late with several critical SKUs backordered.";
  }
  if (discipline === "software_development") {
    return "They expected the full workflow, including validation and reporting, but what was delivered only covered the core path and missed key edge-case handling.";
  }
  if (discipline === "supervising") {
    return "They expected complete shift coverage with clear escalation notes, but what was delivered was incomplete handoff and inconsistent documentation.";
  }
  if (discipline === "sales") {
    return "They expected a finalized proposal with pricing terms and implementation timeline, but what was delivered was a draft missing commercial terms and delivery milestones.";
  }
  return "They expected one outcome, but what was delivered did not match scope and timing commitments.";
}

function buildRoleFlavor(discipline, focus, level, topic, question) {
  const profile = getDisciplineProfile(discipline);
  if (!profile) return "";
  const q = (question || "").toLowerCase();
  const metricAsked = hasAny(q, ["kpi", "metric", "outcome", "performance", "cost", "rate", "result"]);
  const mismatchAsked = hasAny(q, ["expected", "delivered", "mismatch", "did not match", "didn't match"]);

  const challenge = pickOne(profile.challenges);
  const decision = pickOne(profile.decisions);
  const kpi = pickOne(profile.kpis);
  const project = pickOne(profile.projects);
  const term = pickOne(profile.vocabulary);

  if (focus === "problem") {
    if (!metricAsked) return "";
    return `The hardest part was handling ${challenge} without losing service quality.`;
  }
  if (focus === "action") {
    if (!metricAsked) return "";
    return `I made that call based on ${decision} and the constraints we had in that ${project}.`;
  }
  if (focus === "result") {
    if (!metricAsked) return "";
    return `We tracked the improvement through ${kpi}, which showed the change was sustainable.`;
  }
  if (mismatchAsked) return "";

  if (level >= 3) {
    return `It was part of a ${project}, and I kept the team focused on ${term} while protecting performance outcomes.`;
  }
  if (level === 2) {
    return `That situation required practical tradeoffs tied to ${kpi}.`;
  }
  return "";
}

function getDisciplineProfile(key) {
  return disciplineProfiles[key] || disciplineProfiles.software_development;
}

function disciplineLabel(key) {
  return getDisciplineProfile(key).label;
}

function pickOne(list) {
  if (!Array.isArray(list) || list.length === 0) return "";
  return list[Math.floor(Math.random() * list.length)];
}

function smalltalkResponse(persona) {
  const map = {
    ashley:
      "I am doing well, thanks for asking. I get a little nervous in interviews at first, but I am glad to be here.",
    robby:
      "I am doing well, thank you. I appreciate the chance to speak with you today.",
    marco:
      "Doing well, thanks. Looking forward to the conversation.",
    dani:
      "I am doing well, thank you. A little nervous, but excited to be here.",
  };
  return map[persona.id] || "I am doing well, thanks for asking.";
}

function isVaguePrompt(question) {
  const q = question.trim().toLowerCase();
  if (!q) return true;
  if (isSmalltalk(question) && !containsInterviewIntent(question)) {
    return false;
  }
  if (containsInterviewIntent(question) || questionNeedsExample(question)) {
    return false;
  }
  if (q.split(/\s+/).length >= 6) {
    return false;
  }
  if (q.split(/\s+/).length <= 3) return true;
  return hasAny(q, [
    "can you expand",
    "go on",
    "say more",
    "thoughts?",
    "anything else?",
    "what about that?",
  ]);
}

function isSmalltalk(question) {
  const q = question.trim().toLowerCase();
  return (
    /\bhi\b/.test(q) ||
    /\bhello\b/.test(q) ||
    /\bhey\b/.test(q) ||
    /\bhow are you\b/.test(q) ||
    /\bgood morning\b/.test(q) ||
    /\bgood afternoon\b/.test(q) ||
    /\bgood evening\b/.test(q)
  );
}

function containsInterviewIntent(question) {
  const q = question.toLowerCase();
  return hasAny(q, [
    "tell me about",
    "describe",
    "example",
    "walk me through",
    "what did you do",
    "why",
    "how did",
    "motivation",
    "problem",
    "challenge",
    "failure",
    "mistake",
    "decision",
    "role",
    "contribution",
    "ownership",
    "compliance",
    "tradeoff",
    "customer",
    "client",
  ]);
}

function isContinuationPrompt(question) {
  const q = question.trim().toLowerCase();
  if (!q) return false;
  return hasAny(q, [
    "yes",
    "yes please",
    "please",
    "sure",
    "please do",
    "go ahead",
    "continue",
    "example",
    "specific example",
    "concrete example",
    "answer the question",
    "answer what i asked",
    "i just want you to answer",
    "can you answer that",
  ]);
}

function isCorrectionPrompt(question) {
  const q = question.trim().toLowerCase();
  if (!q) return false;
  return hasAny(q, [
    "that is not an answer",
    "that's not an answer",
    "not an answer",
    "you did not answer",
    "does not answer",
    "what about this example",
    "how does this relate",
    "answer my question",
    "just answer the question",
  ]);
}

function getLastSubstantiveInterviewerQuestion() {
  for (let i = state.transcript.length - 1; i >= 0; i -= 1) {
    const turn = state.transcript[i];
    if (turn.role !== "interviewer") continue;
    const text = (turn.text || "").trim();
    if (!text) continue;
    if (isSmalltalk(text)) continue;
    if (isContinuationPrompt(text)) continue;
    if (isCorrectionPrompt(text)) continue;
    return text;
  }
  return "";
}

function vaguePromptResponse(persona) {
  const map = {
    ashley: "Happy to. Could you clarify which part of that you want me to go deeper on first?",
    robby: "Sure. Could you clarify the specific part you want me to expand on?",
    marco: "Absolutely. Which specific part would you like me to go deeper on?",
    dani: "Yes, of course. Could you tell me which part you want more detail on first?",
  };
  return map[persona.id] || "Happy to. Which part would you like me to focus on first?";
}

function ashleyResponse(topic, level) {
  const map = {
    motivation: [
      "I wasn't actively looking, but this role caught my eye because it uses systems I've worked in for years and I felt I could contribute quickly.",
      "I've had a steady path at my current company and I still care about the work. I am open to applying my experience in a new setting with fresh challenges.",
      "Part of my openness is that my new supervisor is more hands-on than what I was used to. I work best with trust and autonomy, so I'm carefully exploring alternatives.",
    ],
    change: [
      "I can adapt, but I do best when there is clear structure and expectations up front.",
      "When tools or processes shift, I usually ask for a defined plan so I can execute reliably.",
      "I am not anti-change, but undefined environments are harder for me. I perform best when goals and guardrails are explicit.",
    ],
    failure: [
      "A system issue caused recurring customer disruption. I focused on stabilizing operations quickly and documenting the fix.",
      "We traced a repeat incident to a process gap, corrected the root cause, and reduced recurrence. I now build checks sooner.",
      "My miss was not escalating the pattern early enough. I corrected that by tightening my monitoring thresholds and communication timing.",
    ],
    ownership: [
      "I was the person people came to when the issue didn't match normal patterns, and I handled the troubleshooting end to end.",
      "I diagnosed the failure path, coordinated the fix sequence, and validated stability with the customer team.",
      "I owned the technical resolution and follow-through. Where I can improve is giving tighter executive summaries instead of too much detail.",
    ],
    technical: [
      "Most of my work is deep troubleshooting across long-running platforms. I know the dependency patterns and where failures usually hide.",
      "I start with impact containment, then isolate variables, then confirm root cause with controlled tests before changing production behavior.",
      "I have years of system memory that helps me connect small signals quickly. That is why I'm often pulled in for unexplained issues.",
    ],
    default: [
      "I can speak to that from my role, although I may give you a technical angle first.",
      "I have a lot of experience in this area, so I can walk you through what I saw and what I did.",
      "I can answer directly: I focus on reliable execution, customer stability, and practical problem resolution.",
    ],
  };

  return pickByLevel(map[topic] || map.default, level);
}

function robbyResponse(topic, level) {
  const map = {
    motivation: [
      "After my last role ended, I took time to evaluate where I can create the strongest impact and this opportunity stood out.",
      "I have worked in very competitive environments and delivered strong outcomes. At this stage, I want the next move to be intentional and high leverage.",
      "If I am candid, I have felt a plateau in personal growth for a while. I still perform well, but I want a culture where contribution and development are not secondary to internal competition.",
    ],
    teamwork: [
      "I usually lead with structured problem framing and align stakeholders around decision quality.",
      "I can be very direct, and in the past my examples probably over-weight my own role. I am working to articulate team contributions more clearly.",
      "My best work happens when strong people challenge each other constructively. I bring analytical clarity, but sustained results require shared ownership.",
    ],
    ownership: [
      "I led the diagnostic phase by separating symptoms from root constraints and defining what evidence we needed before deciding.",
      "I interviewed account leads, reviewed client-level margin and service data, and built a simple hypothesis tree to test where losses were originating.",
      "I owned the investigation plan, validated the findings with operations and finance, and presented a phased action plan with expected impact ranges.",
    ],
    failure: [
      "One initiative underperformed because adoption assumptions were too optimistic. We corrected with tighter change-management steps.",
      "I could have recognized resistance signals earlier rather than assuming a strong recommendation would carry by itself.",
      "I own that I over-indexed on analytical correctness and under-indexed on coalition building. I now test stakeholder readiness earlier.",
    ],
    challenge: [
      "If challenged, I will explain my reasoning and assumptions transparently.",
      "I do rely on frameworks, but I treat them as tools, not dogma.",
      "My risk is sounding too certain early. I have learned to make uncertainty explicit and invite counter-arguments sooner.",
    ],
    technical: [
      "I approach problems by clarifying the economic objective, identifying key constraints, and then sequencing options by expected value.",
      "In ambiguous situations, I create structure quickly and run short feedback loops so decisions improve with new information.",
      "I am strongest when an organization needs clear reasoning under pressure, especially when teams are debating direction without clear decision criteria.",
    ],
    default: [
      "I start by clarifying the objective, constraints, and what evidence is needed before choosing a path.",
      "I can walk through that with a concrete example if useful.",
      "In short, I optimize for rigorous thinking, measurable outcomes, and practical execution.",
    ],
  };

  return pickByLevel(map[topic] || map.default, level);
}

function marcoResponse(topic, level) {
  const map = {
    motivation: [
      "I like building things that matter, and this role looks like a chance to build with more scale than I typically get on my own.",
      "Friends encouraged me to take a serious look, and I can see a path where my builder experience could accelerate outcomes here.",
      "I will be direct: I am interested, but I evaluate fit hard. If the environment values initiative and judgment, I am all in. If it is mostly process for process' sake, I disengage.",
    ],
    compliance: [
      "I believe governance matters, especially where risk is real.",
      "I support compliance, but I push to keep procedures tied to outcomes so teams do not lose velocity for low-value steps.",
      "My bias is judgment over blind adherence. I will challenge rules that seem inefficient, but I know there are boundaries where strict compliance is non-negotiable.",
    ],
    teamwork: [
      "I am strongest when setting vision, aligning talent, and creating accountability that people actually buy into.",
      "I share context aggressively when it helps execution, and I expect others to operate with similar ownership.",
      "I can be selective with information when stakes are competitive. In a company setting, I have had to be intentional about transparency so trust stays high.",
    ],
    failure: [
      "I have had ventures miss the mark, and I treat that as tuition, not identity.",
      "A past launch failed because we moved fast without enough signal from real users. We corrected with tighter validation loops.",
      "My miss was overconfidence in an early thesis. I learned to put disconfirming evidence on the table sooner, even when it slows momentum.",
    ],
    challenge: [
      "I am comfortable with hard questions and I view this as a two-way diligence process.",
      "If we disagree, I will debate ideas directly and stay focused on outcomes.",
      "I will push on assumptions, including yours, because that is how strong strategies survive contact with reality.",
    ],
    default: [
      "I can answer that, and I may ask clarifying questions so I understand the real objective.",
      "My lens is builder-first: define value, align people, then execute with urgency.",
      "I care about meaningful problems, strong teams, and autonomy to solve with judgment.",
    ],
  };

  return pickByLevel(map[topic] || map.default, level);
}

function daniResponse(topic, level) {
  const map = {
    motivation: [
      "I am looking for a role where I can learn a lot and contribute while I keep figuring out where I can add the most value long-term.",
      "I have been trying to find the right fit for a while, and I really want a place that helps people grow. This BSA role feels like a good way to build practical experience.",
      "Honestly, the search has been discouraging at times. I know I have more to offer than my resume shows, and I am trying to find a team where I can keep learning and actually prove that in real work.",
    ],
    ownership: [
      "We worked on identifying process issues and helping teams understand where handoffs were breaking down.",
      "In that project, I handled a lot of the analysis and documentation, and I was usually the one pulling patterns together before we met as a team.",
      "Specifically, I mapped the workflow, flagged the key data-quality gaps, and recommended the priority order for fixes. I did need support on final implementation details.",
    ],
    failure: [
      "We had a project where we underestimated how long the data cleanup would take, and it delayed our timeline.",
      "I should have raised my concern earlier instead of assuming we could catch up. I learned to communicate risk sooner.",
      "My part was not pushing hard enough when I saw early warning signs. Since then, I try to say concerns clearly even when I am not fully sure yet.",
    ],
    technical: [
      "I usually start by understanding the business process, then where data or handoff issues are creating friction.",
      "I am still building depth, but I can break down requirements, ask clarifying questions, and spot where process logic and system behavior do not line up.",
      "For this BSA path, I am strongest at translating between users and technical teams. I can define requirements and acceptance criteria; implementation architecture is where I still ask for guidance.",
    ],
    challenge: [
      "If someone challenges my idea, I try to listen and adjust. I am still learning, so I do not assume I am always right.",
      "I might get a little nervous in that moment, but I can walk through my reasoning and where I am uncertain.",
      "I do better when feedback is direct and specific. I can take challenge well when I understand exactly what needs to improve.",
    ],
    teamwork: [
      "I care a lot about helping the team succeed and making sure people have the information they need.",
      "I am usually the person sharing notes, connecting people, and checking if everyone has context before decisions are made.",
      "One thing I am improving is making my own contribution clearer, because I tend to default to team language even when I drove part of the work.",
    ],
    default: [
      "That is a good question. We approached that by trying to understand what was actually causing pain for users first.",
      "I can share what we did, and I can also explain what part I specifically handled if that helps.",
      "So, specifically, I focused on analysis and coordination, then worked with the team to convert that into concrete next steps.",
    ],
  };

  let response = pickByLevel(map[topic] || map.default, level);

  // Dani is intentionally a bit evasive until probed.
  if (level === 1 && topic !== "motivation") {
    response += " I might be missing part of what you want me to focus on.";
  }
  if (topic === "ownership" && level < 3) {
    response = response.replace("I ", "We ").replace(" my ", " our ");
  }

  return response;
}

function pickByLevel(options, level) {
  const primary = Math.max(0, Math.min(level - 1, options.length - 1));
  if (options.length === 1) return options[0];

  const allowNeighbor = state.interviewMode !== "challenging";
  const start = allowNeighbor ? Math.max(0, primary - 1) : primary;
  const end = allowNeighbor ? Math.min(options.length - 1, primary + 1) : primary;
  const index = start + Math.floor(Math.random() * (end - start + 1));
  return options[index];
}

function pickByLevelStrict(options, level) {
  const index = Math.max(0, Math.min(level - 1, options.length - 1));
  return options[index];
}

function questionNeedsExample(question) {
  const q = question.toLowerCase();
  return hasAny(q, [
    "tell me about a time",
    "tell me about",
    "can you tell me about",
    "about a time",
    "describe a time",
    "describe a",
    "particularly difficult problem",
    "give me an example",
    "walk me through a time",
    "specific example",
    "concrete example",
    "real example",
    "walk me through",
    "example of",
    "situation where",
    "what happened",
  ]);
}

function resolveExampleTopic(currentTopic, question) {
  if (!questionNeedsExample(question)) return currentTopic;
  const inferred = inferExampleTopicFromQuestion(question, currentTopic);
  if (inferred && inferred !== "default") return inferred;
  if (currentTopic !== "ownership" && currentTopic !== "default") return currentTopic;

  const lastTopic = getLastCandidateTopic();
  if (lastTopic && lastTopic !== "smalltalk" && lastTopic !== "default") {
    return lastTopic;
  }
  return currentTopic;
}

function inferExampleTopicFromQuestion(question, fallbackTopic) {
  const q = question.toLowerCase();
  if (containsCoworkerIntent(question)) return "teamwork";
  if (containsCustomerIntent(question)) return "customer";
  if (hasAny(q, ["failure", "fail", "mistake", "regret", "went wrong"])) return "failure";
  if (hasAny(q, ["change", "adapt", "new tool", "overhaul", "uncertain"])) return "change";
  if (hasAny(q, ["compliance", "policy", "rule", "governance"])) return "compliance";
  if (hasAny(q, ["technical", "system", "architecture", "debug", "outage", "analysis", "bsa"])) return "technical";
  if (hasAny(q, ["motivation", "why leave", "why this role", "why now"])) return "motivation";
  if (hasAny(q, ["challenge", "disagree", "conflict", "push back"])) return "challenge";
  if (hasAny(q, ["ownership", "what did you do", "role", "contribution"])) return "ownership";
  if (hasAny(q, ["difficult problem", "problem you had to solve", "problem to solve"])) return "failure";
  return fallbackTopic || "default";
}

function containsCustomerIntent(question) {
  const q = question.toLowerCase();
  return hasAny(q, ["customer", "client", "stakeholder"]);
}

function containsCoworkerIntent(question) {
  const q = question.toLowerCase();
  return hasAny(q, ["coworker", "co-worker", "colleague", "teammate", "peer", "difficult coworker"]);
}

function getLastCandidateTopic() {
  for (let i = state.transcript.length - 1; i >= 0; i -= 1) {
    const turn = state.transcript[i];
    if (turn.role === "candidate") return turn.topic || "default";
  }
  return "default";
}

function hasConcreteExample(text) {
  const lower = text.toLowerCase();
  return hasAny(lower, [
    "for example",
    "for instance",
    "one time",
    "one case",
    "one engagement",
    "one project",
    "one incident",
    "in one case",
    "in one engagement",
    "in one project",
    "in that project",
    "in that case",
    "a key customer",
    "a major customer",
    "a senior client",
    "last year",
    "we had a",
    "i had a",
    "there was a",
  ]);
}

function buildPersonaExample(personaId, topic, level) {
  const examples = {
    ashley: {
      default: [
        "One time a customer batch process failed repeatedly overnight, and I traced it to a sequencing dependency that only appeared under peak load.",
        "In one case, I coordinated ops and support to stabilize the flow first, then implemented a controlled fix and added monitoring to prevent repeat outages.",
        "In that incident, I owned root-cause isolation, communicated status updates every hour, and we reduced repeat tickets by about a third in the next month.",
      ],
      change: [
        "When our team introduced a new workflow tool, I initially needed a clear runbook before I felt confident using it.",
        "I asked for a structured rollout plan, documented decision points, and helped others transition once the process became stable.",
        "After that rollout, I became one of the people troubleshooting migration edge cases and helped standardize the handoff checklist.",
      ],
      failure: [
        "One incident I missed early signals on caused longer customer disruption than it should have.",
        "I corrected it by escalating sooner, tightening thresholds, and creating a specific alert path for the same pattern.",
        "That change reduced recurrence and improved response time because we had clearer ownership and faster escalation.",
      ],
      ownership: [
        "In that case, I personally led root-cause analysis and owned communication with ops until service was stable.",
        "I isolated the failure path, tested recovery steps in sequence, and documented the exact handoff to avoid repeat errors.",
        "I coordinated the fix end to end, briefed leaders with concise updates, and validated customer impact after stabilization.",
      ],
      teamwork: [
        "On one customer issue, support and operations had different assumptions about the root cause.",
        "I aligned both teams on a shared incident timeline, clarified decision points, and drove one coordinated recovery plan.",
        "That prevented duplicate work and shortened recovery because everyone was operating from the same facts.",
      ],
      customer: [
        "A key customer was frustrated because recurring incidents were affecting their end-of-day processing and they felt they were not getting clear updates.",
        "I set up direct check-ins, translated technical findings into plain language, and gave them concrete timelines at each stage of recovery.",
        "The immediate issue was resolved and the relationship improved because they saw both ownership and transparent communication.",
      ],
    },
    robby: {
      default: [
        "On one client engagement, leadership wanted rapid margin improvement but teams disagreed on where losses were actually occurring.",
        "I built a decision framework, aligned stakeholders on the constraint map, and sequenced pilots instead of pushing a single large bet.",
        "That approach surfaced the real bottleneck and improved operating results while avoiding a costly reorganization.",
      ],
      teamwork: [
        "In a cross-functional transformation, I initially drove too hard from my own analysis and met quiet resistance.",
        "I shifted to co-creating options with operations leads and framed tradeoffs in terms each group cared about.",
        "Adoption improved after that because teams felt ownership in the implementation path, not just the recommendation.",
      ],
      failure: [
        "I had one strategy recommendation underperform because I overestimated readiness for change.",
        "I corrected by adding earlier stakeholder testing and tighter feedback loops before scaling.",
        "That taught me to pair analytical quality with adoption strategy from day one.",
      ],
      motivation: [
        "A recent transition made me reassess fit, and I started mapping where I could contribute beyond just title progression.",
        "I compared role environments and realized I wanted a setting with stronger development and contribution orientation.",
        "That is why this move matters to me now: I want sustained impact and growth, not just another competitive cycle.",
      ],
      customer: [
        "On one engagement, a senior client sponsor became difficult after early recommendations challenged their existing operating model.",
        "I shifted from pushing conclusions to co-defining decision criteria, then walked through tradeoffs with their leadership team.",
        "That lowered defensiveness and moved the account forward because the client felt heard while still confronting the core issue.",
      ],
    },
    marco: {
      default: [
        "In one venture, we saw demand early but execution drifted because team priorities were not tightly aligned.",
        "I reset the vision, clarified decision rights, and rebuilt cadence around the metrics that actually drove value.",
        "Within a quarter, delivery quality improved and we regained momentum without adding extra overhead.",
      ],
      compliance: [
        "During a rapid launch, we had pressure to skip a control step that looked slow.",
        "I pushed to keep the critical controls while trimming low-value process work so we could move fast without blind risk.",
        "That balance let us ship on time and avoid a downstream compliance issue that would have cost us credibility.",
      ],
      failure: [
        "I had a product bet fail because we scaled before we had enough signal from real users.",
        "I reset by narrowing scope, adding faster validation loops, and forcing disconfirming evidence into decisions.",
        "The next release cycle was smaller but materially stronger because learning happened earlier.",
      ],
      ownership: [
        "In one turnaround, I took direct ownership for resetting team priorities and decision rights within the first two weeks.",
        "I replaced diffuse planning with clear goals, rebuilt accountability cadence, and personally handled stakeholder alignment.",
        "That created execution clarity fast and moved the team from reactive activity to measurable delivery.",
      ],
      technical: [
        "On a platform initiative, we had architecture complexity that was slowing delivery and masking quality issues.",
        "I had engineering map failure points, prioritize high-value simplifications, and sequence rollout to control operational risk.",
        "We improved throughput and reliability without pausing business delivery because the plan balanced speed and control.",
      ],
      customer: [
        "In one business, a major customer escalated aggressively after repeated misses on delivery commitments.",
        "I met them directly, reset expectations with a realistic plan, and restructured internal accountability so updates were consistent and credible.",
        "We recovered trust over the next cycle because execution improved and communication became proactive instead of reactive.",
      ],
    },
    dani: {
      default: [
        "In one project, we were seeing repeated handoff issues between business users and the delivery team.",
        "I helped map the process, capture requirement gaps, and organize what needed to be clarified before implementation.",
        "That reduced rework and made the next sprint planning conversation much clearer for everyone.",
      ],
      ownership: [
        "One example was when requirements were unclear and the team kept revisiting the same questions.",
        "I documented the open decisions, met with stakeholders to close gaps, and updated acceptance criteria before build.",
        "That helped us avoid another cycle of rework, even though I still needed support on final technical design choices.",
      ],
      failure: [
        "We had a timeline slip because data cleanup was more complex than we estimated.",
        "I should have raised the risk earlier; after that I started flagging risks sooner and tracking dependencies more explicitly.",
        "That changed how we planned later work and made expectations more realistic.",
      ],
      technical: [
        "In one BSA-style effort, users were reporting inconsistent outputs from the same workflow.",
        "I mapped process inputs, identified where rules were interpreted differently, and documented updated acceptance criteria.",
        "After alignment, testing became more predictable and the team reduced rework caused by ambiguous requirements.",
      ],
      motivation: [
        "In my current role, I have been asking for chances to take on broader analysis responsibilities.",
        "I started shadowing requirement sessions and proactively documenting gaps to build stronger business-analysis skills.",
        "That is why I am pursuing this path now; I want a role where learning and contribution can grow together.",
      ],
      customer: [
        "In one project, an internal customer was upset because the output they expected did not match what was delivered.",
        "I sat with them to understand where expectations diverged, then updated requirements and acceptance criteria with the team.",
        "That reduced tension and helped the next release land better because we aligned early on what success looked like.",
      ],
    },
  };

  const personaExamples = examples[personaId];
  if (!personaExamples) return "";
  const options = personaExamples[topic] || personaExamples.default;
  if (!options) return "";
  return pickByLevelStrict(options, level);
}

function modeSummary() {
  const modeLabel = state.interviewMode[0].toUpperCase() + state.interviewMode.slice(1);
  return `${modeLabel} | ${disciplineLabel(state.discipline)}`;
}

function getModeTuning() {
  const profile = modeProfiles[state.interviewMode] || modeProfiles.realistic;
  return profile;
}

function stripMetaFraming(text) {
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  const filtered = sentences.filter(
    (s) =>
      !/\b(i can (answer|speak|walk you through|walk through)|happy to answer|the way i frame it is this|in short, i optimize|if you want,? i can keep it focused|i can walk through that with a concrete example if useful)\b/i.test(
        s
      )
  );
  return filtered.join(" ").trim();
}

function enforceGlobalLayer(response) {
  let cleaned = response.trim();
  cleaned = cleaned.replace(/\b(as an ai|i am an ai|language model)\b/gi, "");
  return cleaned.replace(/\s{2,}/g, " ").trim();
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function runAssessment() {
  if (!state.transcript.some((t) => t.role === "interviewer")) {
    el.assessmentBox.textContent = "No interview questions yet. Ask at least one question first.";
    return;
  }

  state.evaluator.sources = el.rubricSources.value.trim();
  state.evaluator.rubric = el.rubricInput.value.trim();

  const report = buildInterviewerReport(state.transcript, state.evaluator.rubric, state.evaluator.sources);
  state.evaluator.lastReport = report;
  el.assessmentBox.textContent = report;
}

function exportSession() {
  if (!state.transcript.length && !state.evaluator.lastReport.trim()) {
    el.assessmentBox.textContent = "Nothing to export yet. Run an interview turn and/or an assessment first.";
    return;
  }

  const now = new Date();
  const timestamp = now.toISOString();
  const persona = getPersona();
  const body = buildExportMarkdown(timestamp, persona.name);
  const safePersona = persona.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const safeTs = timestamp.replace(/[:.]/g, "-");
  const fileName = `interview-session-${safePersona}-${safeTs}.md`;

  const blob = new Blob([body], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function buildExportMarkdown(timestamp, personaName) {
  const lines = [];
  lines.push("# Interview Session Export");
  lines.push("");
  lines.push("## Metadata");
  lines.push(`- Exported at: ${timestamp}`);
  lines.push(`- Persona: ${personaName}`);
  lines.push(`- Interview mode: ${state.interviewMode}`);
  lines.push(`- Discipline: ${disciplineLabel(state.discipline)}`);
  lines.push(`- Transcript turns: ${state.transcript.length}`);
  lines.push("");
  lines.push("## Conversation");
  if (!state.transcript.length) {
    lines.push("_No conversation captured yet._");
  } else {
    for (const turn of state.transcript) {
      const who = turn.role === "interviewer" ? "Interviewer" : personaName;
      lines.push(`- **${who}**: ${turn.text}`);
    }
  }
  lines.push("");
  lines.push("## Assessment");
  if (state.evaluator.lastReport.trim()) {
    lines.push("```text");
    lines.push(state.evaluator.lastReport.trim());
    lines.push("```");
  } else {
    lines.push("_No assessment run yet._");
  }
  lines.push("");
  lines.push("## Assessor Inputs");
  lines.push("### Reference Links");
  const links = splitLines(state.evaluator.sources || "");
  if (links.length) {
    for (const link of links) lines.push(`- ${link}`);
  } else {
    lines.push("- None");
  }
  lines.push("");
  lines.push("### Rubric Text");
  if ((state.evaluator.rubric || "").trim()) {
    lines.push("```text");
    lines.push(state.evaluator.rubric.trim());
    lines.push("```");
  } else {
    lines.push("_No rubric text provided._");
  }

  return lines.join("\n");
}

function buildInterviewerReport(transcript, rubricText, sourceText) {
  const questions = transcript.filter((t) => t.role === "interviewer").map((t) => t.text);
  const topics = transcript.filter((t) => t.role === "interviewer").map((t) => t.topic);
  const questionBlob = questions.join(" ").toLowerCase();
  const topicCounts = countBy(topics);
  const sourceLines = splitLines(sourceText);
  const lenses = buildReflectionLenses(questions, questionBlob, topicCounts, rubricText);
  const strengths = lenses.filter((l) => l.status === "observed");
  const opportunities = lenses.filter((l) => l.status !== "observed");

  const summary = [
    "PBM-Aligned Reflection (No Scores)",
    `Questions asked: ${questions.length}`,
    `Distinct topics covered: ${Object.keys(topicCounts).length}`,
    sourceLines.length ? `Reference links captured: ${sourceLines.length}` : "Reference links captured: 0",
    "",
    "What appears strong:",
    ...(strengths.length
      ? strengths.map((l) => `- ${l.name}: ${l.observation}`)
      : ["- Early pattern: keep layering follow-ups to create clearer evidence."]),
    "",
    "Reflection prompts:",
    ...lenses.map((l) => `- ${l.prompt}`),
    "",
    "Recommendations for next round:",
    ...(opportunities.length
      ? opportunities.slice(0, 5).map((l) => `- ${l.recommendation}`)
      : ["- Continue current pattern and add one more decision-quality question per interview."]),
  ];

  if (rubricText.trim()) {
    summary.push("", "Rubric note:");
    summary.push(...buildRubricReflectionNotes(questions, rubricText).map((n) => `- ${n}`));
  }

  summary.push("", "PBM reference anchors:");
  summary.push("- Hiring lens: test values and capability fit through behavioral evidence, not surface polish.");
  summary.push("- Values lens: probe how principles show up in choices under pressure.");
  summary.push("- Contribution-motivated lens: distinguish self-focused signals from contribution-oriented motivation.");

  return summary.join("\n");
}

function buildReflectionLenses(questions, questionBlob, topicCounts, rubricText) {
  const specificPrompts = countMatches(questions, [
    "specifically",
    "exactly",
    "walk me through",
    "what did you do",
    "give me an example",
  ]);
  const repeatedTopics = Object.values(topicCounts).filter((n) => n >= 2).length;
  const ownershipHits = countIncludes(questionBlob, [
    "what was your role",
    "what did you do",
    "personally",
    "ownership",
    "i vs we",
  ]);
  const motivationHits = countIncludes(questionBlob, ["why now", "why leave", "why this role", "what changed"]);
  const riskHits = countIncludes(questionBlob, [
    "compliance",
    "risk",
    "policy",
    "governance",
    "failure",
    "mistake",
    "tradeoff",
  ]);
  const safetyHits = countIncludes(questionBlob, [
    "help me understand",
    "walk me through",
    "what did you learn",
    "when you are ready",
  ]);
  const contributionHits = countIncludes(questionBlob, [
    "team",
    "contribution",
    "customers",
    "mutual benefit",
    "collaboration",
    "knowledge sharing",
  ]);
  const valuesHits = countIncludes(questionBlob, [
    "integrity",
    "principle",
    "value",
    "ethic",
    "trust",
    "respect",
  ]);

  const lenses = [
    {
      name: "Specific Probing",
      status: specificPrompts >= Math.max(2, Math.floor(questions.length / 3)) ? "observed" : "opportunity",
      observation: "You used concrete follow-ups that reduce generic answers.",
      prompt: "Where did I ask for specific behavior versus accept broad narrative?",
      recommendation: "Add more prompts like 'What specifically did you do?' and 'What decision did you personally make?'",
    },
    {
      name: "Layered Questioning",
      status: repeatedTopics >= 2 ? "observed" : "opportunity",
      observation: "You revisited topics and increased disclosure through follow-up depth.",
      prompt: "Did I stay with one topic long enough to expose underlying motivation and judgment?",
      recommendation: "Stay on at least one topic for two follow-ups before switching themes.",
    },
    {
      name: "Ownership Clarity",
      status: ownershipHits >= 2 ? "observed" : "opportunity",
      observation: "You extracted individual ownership rather than only team-level language.",
      prompt: "Did I clearly separate personal ownership from team contribution?",
      recommendation: "Use an ownership sequence: role, decision, action, result.",
    },
    {
      name: "Motivation Depth",
      status: motivationHits >= 2 ? "observed" : "opportunity",
      observation: "You probed beyond surface reasons and uncovered deeper drivers.",
      prompt: "Did I test both stated motivation and underlying motivation?",
      recommendation: "After 'why this role', ask 'what changed now?' and 'what are you moving toward, not just away from?'",
    },
    {
      name: "Values and Judgment",
      status: riskHits + valuesHits >= 3 ? "observed" : "opportunity",
      observation: "You explored principles and decision quality under pressure.",
      prompt: "Did I test how values and judgment hold under tradeoffs and constraints?",
      recommendation: "Add one scenario about rule pressure, one about tradeoffs, and one about accountability for mistakes.",
    },
    {
      name: "Contribution Orientation (PBM)",
      status: contributionHits >= 2 ? "observed" : "opportunity",
      observation: "You explored contribution-motivated behavior and mutual benefit signals.",
      prompt: "Did my questions distinguish status-seeking from contribution-seeking behavior?",
      recommendation: "Ask who benefited, how others were enabled, and what long-term value was created.",
    },
    {
      name: "Interview Climate",
      status: safetyHits >= 1 ? "observed" : "opportunity",
      observation: "Your tone likely supported openness while still testing depth.",
      prompt: "Did my tone create enough psychological safety to surface real answers?",
      recommendation: "Use challenge + support phrasing: 'Help me understand...' before sharper probes.",
    },
  ];

  if (rubricText.trim()) {
    const rubricKeywords = extractRubricKeywords(rubricText);
    const rubricHits = rubricKeywords.filter((k) => questionBlob.includes(k)).length;
    lenses.push({
      name: "Custom Rubric Coverage",
      status: rubricHits >= Math.max(2, Math.floor(rubricKeywords.length / 4)) ? "observed" : "opportunity",
      observation: "Your questions touched key themes from your custom rubric.",
      prompt: "Which rubric criteria did I not explicitly test in my questions?",
      recommendation: "Pick two missing rubric themes and write one direct probe for each before the next session.",
    });
  }

  return lenses;
}

function buildRubricReflectionNotes(questions, rubricText) {
  const questionBlob = questions.join(" ").toLowerCase();
  const keywords = extractRubricKeywords(rubricText);
  if (!keywords.length) {
    return ["Custom rubric provided, but no clear keywords were detected. Consider short bullet criteria."];
  }
  const hitKeywords = keywords.filter((k) => questionBlob.includes(k));
  const missedKeywords = keywords.filter((k) => !questionBlob.includes(k));
  const notes = [];
  if (hitKeywords.length) notes.push(`Covered rubric themes: ${hitKeywords.slice(0, 8).join(", ")}.`);
  if (missedKeywords.length)
    notes.push(`Potentially under-tested themes: ${missedKeywords.slice(0, 8).join(", ")}.`);
  return notes.length ? notes : ["Rubric was loaded; add direct probes to increase explicit coverage."];
}

function extractRubricKeywords(rubricText) {
  const stop = new Set([
    "about",
    "above",
    "after",
    "again",
    "against",
    "being",
    "could",
    "should",
    "would",
    "their",
    "there",
    "these",
    "those",
    "while",
    "where",
    "which",
    "because",
    "under",
    "from",
    "with",
    "this",
    "that",
    "have",
    "they",
    "them",
    "what",
    "when",
    "your",
    "into",
    "only",
    "does",
    "also",
  ]);
  const tokens = (rubricText.toLowerCase().match(/[a-z]{4,}/g) || []).filter((t) => !stop.has(t));
  const counts = countBy(tokens);
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 18)
    .map(([token]) => token);
}

function countMatches(questions, terms) {
  return questions.filter((q) => hasAny(q.toLowerCase(), terms)).length;
}

function countIncludes(text, terms) {
  return terms.filter((term) => text.includes(term)).length;
}

function countBy(items) {
  const out = {};
  for (const item of items) {
    out[item] = (out[item] || 0) + 1;
  }
  return out;
}

function splitLines(value) {
  return value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}
