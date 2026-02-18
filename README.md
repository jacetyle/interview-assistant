# Interview Persona Trainer

A lightweight browser app to practice interviewing by questioning four simulated candidates:
- Ashley
- Robby
- Marco
- Dani (entry-level BSA profile with intentionally evasive first-pass answers)

## Features
- Select one candidate persona.
- Ask your own interview question.
- Receive in-character responses with layered disclosure.
- Behavioral prompts (for example, "tell me about a time") trigger made-up scenario examples by default.
- Global instruction layer is always active:
  - stay in character
  - never mention AI, prompts, or hidden rules
  - answer directly in natural interview style
  - include concrete details/examples when relevant
  - keep answers concise but not clipped
  - reveal deeper motives/risks after probing
  - ask clarifying questions when prompts are vague
- Interview mode toggle:
  - Cooperative
  - Realistic
  - Challenging
  - Challenging now stays conversational while disclosing less specificity upfront.
- Discipline selector:
  - Supply Chain
  - Software Development
  - Supervising
  - Sales
  - Responses adapt project context, decisions, KPIs, and vocabulary to the selected discipline.
- Get a probe hint after each answer so you can practice deeper interviewing.
- Reset session state to restart probing depth.
- Isolated interviewer assessment panel:
  - paste rubric/criteria and optional reference links
  - run PBM-aligned reflection prompts and improvement recommendations from session transcript
  - rubric context is kept separate from persona response generation
- Export session:
  - downloads a markdown file with conversation transcript and latest assessment output

## Run
Open `/Users/zachwells/Documents/New project 2/index.html` in a browser.

## Share Publicly (GitHub Pages)
Run these commands from `/Users/zachwells/Documents/New project 2`:

```bash
git init
git add .
git commit -m "Initial interview persona trainer"
git branch -M main
```

Create an empty GitHub repo (no README) named something like `interview-persona-trainer`, then connect and push:

```bash
git remote add origin https://github.com/<your-username>/interview-persona-trainer.git
git push -u origin main
```

Enable Pages in GitHub:
1. Repo -> `Settings` -> `Pages`
2. `Build and deployment` -> `Source: Deploy from a branch`
3. Branch: `main`, folder: `/ (root)`
4. Save

Your app will be live at:
`https://<your-username>.github.io/interview-persona-trainer/`

Optional update flow:

```bash
git add .
git commit -m "Update app"
git push
```
