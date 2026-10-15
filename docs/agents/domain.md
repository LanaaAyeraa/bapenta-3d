# Domain Docs

How engineering skills consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`GLOSSARY.md`** at the repo root.
- **`docs/adr/`**: read ADRs that touch the area you're about to work in.

## File structure

Single-context repository layout:

```
/
├── GLOSSARY.md
├── docs/adr/
│   └── 0001-3d-interactive-architecture.md
├── docs/agents/
│   ├── issue-tracker.md
│   ├── triage-labels.md
│   └── domain.md
└── src/
```

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a test name), use the term as defined in `GLOSSARY.md`. Don't drift to synonyms the glossary explicitly avoids.
