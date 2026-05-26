---
name: update_models
description: Audit all AI model providers in sources.js against their live APIs. Detects deprecated, removed, new, and config-changed models. Generates per-provider markdown reports, applies fixes to sources.js, archives reports, and bumps version. Trigger with /skill:update_models or when the user asks to update/audit/verify models.
---

# Update Models — Provider Audit Skill

Audits every model in `sources.js` against live provider APIs and documentation. Generates a markdown report per provider, then optionally applies fixes and bumps a new version.

## When to Use

- User says "update models", "audit models", "check models", "verify providers", "bump models"
- User triggers `/skill:update_models`
- Periodic maintenance to keep the model catalog accurate

## Architecture

This project (`free-coding-models`) maintains a `sources.js` file with model arrays per provider. Each provider has a different API, different model IDs, and different deprecation cadence. This skill automates the verification workflow.

## Workflow

Execute these phases **in order**. Do NOT skip phases. Do NOT proceed to the next phase without user confirmation.

---

### Phase 1: Discovery & Planning

1. Read `sources.js` and extract every provider key, model count, and model list.
2. Read any existing reports in `provider_updates/` to know which providers were recently audited.
3. Present a summary table to the user:

```
| # | Provider | Models | Last Audited | Status |
|---|----------|--------|-------------|--------|
| 1 | nvidia   | 26     | 2026-05-26  | ✅ Recent |
| 2 | groq     | 8      | never       | 🔍 Needs audit |
```

4. Ask the user: "Which providers should I audit? (All / Only stale / Specific providers)"

---

### Phase 2: Audit — Spawn Researchers

For **each provider** to audit, spawn a `researcher` subagent with a detailed prompt. Use **parallel** subagent calls (up to 8 at a time) for speed.

#### Researcher Prompt Template

For each provider, construct a prompt following this exact template:

```
You are auditing the {PROVIDER_NAME} provider for the free-coding-models npm package.

## Current models in sources.js for {PROVIDER_NAME}:
{PASTE_THE_MODEL_ARRAY_FROM_SOURCES_JS}

## Your task:
1. Search the web for the CURRENT {PROVIDER_NAME} model catalog — check their official API docs, model pages, and recent announcements.
2. For EACH model listed above, check if it still exists (not deprecated/removed).
3. Identify any NEW models available that are NOT in the list above.
4. Identify any config changes (context window changes, model ID changes, score updates).

## Output format:
Write a markdown file to {PROJECT_ROOT}/provider_updates/{provider_key}.md following this structure:

# {PROVIDER_NAME} — Model Validity Audit

**Verification date:** {TODAY}
**Source:** {PROVIDER_DOCS_URL}

---

## Summary
| Stat | Count | Details |
|------|-------|---------|
| ✅ Confirmed existing | X | ... |
| 🗑️ Deprecated — to remove | X | ... |
| ❌ Removed — to remove | X | ... |
| ➕ New — to add | X | ... |
| ⚠️ Config to fix | X | ... |

---

## 🗑️ DEPRECATED Models / ❌ REMOVED
[For each: model ID, display name, tier, status, replacement, action]

## ➕ New models to add
[For each: model ID, display name, suggested tier, ctx, URL, action]

## ✅ CONFIRMED Operational Models
[Table of all confirmed models by tier]

## ⚠️ Config Changes
[Table of models with context/score/ID changes]

## Changes to apply in sources.js
[Exact lines to REMOVE, ADD, and MODIFY with BEFORE/AFTER]
```

#### Provider Reference Data

Use this table to build the researcher prompts correctly:

| Provider Key | Provider Name | Source URL | Notes |
|-------------|---------------|-----------|-------|
| `nvidia` | NVIDIA NIM | https://build.nvidia.com | Check each model page for "deprecated" banner |
| `groq` | Groq | https://console.groq.com/docs/models | Also check /docs/deprecations |
| `cerebras` | Cerebras | https://inference-docs.cerebras.ai | Check models/overview page |
| `sambanova` | SambaNova | https://docs.sambanova.ai | Check sambacloud-models + deprecations pages |
| `openrouter` | OpenRouter | https://openrouter.ai/api/v1/models | Filter for :free suffix |
| `github-models` | GitHub Models | https://models.github.ai/catalog/models | REST API catalog |
| `mistral` | Mistral LP | https://docs.mistral.ai | Check models overview + deprecation notices |
| `codestral` | Codestral | https://docs.mistral.ai | Codestral model card, part of Mistral API |
| `scaleway` | Scaleway | https://www.scaleway.com/en/docs/ | Check supported-models page |
| `googleai` | Google AI Studio | https://ai.google.dev | Check models page + deprecations page |
| `zai` | Z.ai | https://docs.z.ai | Check pricing page for free models |
| `qwen` | Alibaba DashScope | https://help.aliyun.com/zh/model-studio/ | Check text-generation-model page |
| `cloudflare` | Cloudflare Workers AI | https://developers.cloudflare.com/workers-ai/models/ | Check each model page |
| `ovhcloud` | OVHcloud AI | https://endpoints.ai.cloud.ovh.net | Check public catalog |
| `gemini` | Gemini CLI | https://ai.google.dev | Same models as googleai, CLI tool |
| `opencode-zen` | OpenCode Zen | https://opencode.ai/docs/zen/ | Check API /zen/v1/models |

#### Subagent Output Handling

Researchers cannot write files directly. After they return results:
- Extract the markdown report content from each researcher's response
- Write each report to `provider_updates/{provider_key}.md`
- Confirm file creation to the user

---

### Phase 3: Review Reports

After ALL reports are generated:

1. Read each `provider_updates/{provider_key}.md` file
2. Present a **global summary table** to the user:

```
| Provider | 🔴 Remove | ➕ Add | ⚠️ Fix | Net | Key Finding |
|----------|-----------|--------|---------|-----|-------------|
| cerebras | 2 | 0 | 2 | -2 | Deprecation tomorrow |
| groq     | 0 | 0 | 4 | 0  | Context corrections only |
| ...      |   |   |   |    |                         |
```

3. Ask the user: "Reports are ready. Proceed to apply changes to sources.js? (Yes / Review first / Select providers)"

---

### Phase 4: Apply Fixes to sources.js

For each provider the user approves:

1. Read the report's "Changes to apply in sources.js" section
2. Apply changes to `sources.js` using the `edit` tool with exact text matching:
   - **REMOVE** deprecated/phantom models
   - **ADD** new models (insert at correct tier position)
   - **FIX** context windows, scores, model IDs
3. For removed models, add a comment line: `// Removed ({DATE}): {model_id} ({reason})`
4. Update provider array in-place — keep tier comments and structure intact

**Critical rules for editing sources.js:**
- Always use the `edit` tool with exact `oldText`/`newText` matching
- Never restructure the file — only swap model lines in-place
- Keep all existing comments and tier separators
- Test after changes with `node -e "import {MODELS} from './sources.js'; console.log(MODELS.length)"`

After all edits:
1. Run `node -e "import {sources, MODELS} from './sources.js'; ..."` to count models
2. Present the new totals to the user

---

### Phase 5: Update README.md

1. Update model counts in the provider table (the `| # | Provider | Models |` table)
2. Update the total model count mentions ("~157 coding models" etc.)
3. Update badge URLs if model count changed significantly

---

### Phase 6: Archive & Version Bump

Ask the user: "Ready to archive reports and bump version? (Yes / Skip archive / Cancel)"

If yes:

1. **Archive reports:**
   ```bash
   CURRENT_VERSION=$(node -e "console.log(require('./package.json').version)")
   mkdir -p provider_updates/archive/v${CURRENT_VERSION}
   mv provider_updates/*.md provider_updates/archive/v${CURRENT_VERSION}/
   ```

2. **Create changelog:**
   - Create `changelog/v{NEXT_VERSION}.md` with all changes from all reports
   - Use sections: `### Removed`, `### Added`, `### Fixed`, `### Changed`
   - List each model change with its provider

3. **Version bump:**
   ```bash
   # Read current, increment patch
   jq '.version = "NEW_VERSION"' package.json > tmp && mv tmp package.json
   ```

4. **Commit and push:**
   ```bash
   git add .
   git commit -m "NEW_VERSION - 🔍 Full provider audit: PROVIDER_COUNT providers, MODEL_COUNT models verified"
   git push origin main
   ```

5. **Wait for npm publish:**
   ```bash
   for i in $(seq 1 30); do
     sleep 10
     v=$(npm view free-coding-models version 2>/dev/null)
     echo "Attempt $i: npm version = $v"
     if [ "$v" = "NEW_VERSION" ]; then echo "✅ published!"; break; fi
   done
   ```

6. **Verify global install:**
   ```bash
   npm install -g free-coding-models@NEW_VERSION
   free-coding-models --help | head -5
   ```

---

## Files Reference

| File | Purpose |
|------|---------|
| `sources.js` | All model definitions per provider — the primary file to edit |
| `provider_updates/` | Current audit reports (one .md per provider) |
| `provider_updates/archive/` | Archived reports from previous versions |
| `changelog/vX.Y.Z.md` | Per-version changelog |
| `README.md` | Provider table and model counts |
| `package.json` | Version number |

## Tips

- **Batch researchers** — Spawn up to 8 researchers in parallel for speed
- **Prioritize by urgency** — If a provider has deprecations "tomorrow", flag it 🔴
- **Be conservative** — Don't add models that aren't clearly free/coding-relevant
- **Check endpoints** — Some models exist on paid endpoints only; skip those
- **Context windows matter** — Providers often limit context below the model's theoretical max; report the actual limit on the provider, not the model spec
- **Gemini counts twice** — The `googleai` and `gemini` arrays are usually identical; apply changes to both
- **Run tests after** — Always run `pnpm test` after editing sources.js

## Error Handling

- If a researcher returns incomplete data for a provider, re-spawn for that specific provider
- If `sources.js` edit fails (text mismatch), re-read the file to get the exact current text
- If npm publish fails or times out, check GitHub Actions logs
- If tests fail after editing, revert the problematic change and report to user
