---
id: t-api-keys
title: Cleanup API keys and provider catalogs
status: Backlog
order: 0
priority: P2
tags: [maintenance, api-keys, providers]
assignee: chacha
created: 2026-05-15
ownerType: human
---

# Cleanup API Keys and Provider Catalogs

## Context

After provider audit in May 2025, several issues identified:

### Providers with issues

| Provider | Status | Required Action |
|----------|--------|-----------------|
| **NVIDIA NIM** | ✅ Audited, 11 models removed | Done |
| **Groq** | ✅ OK | No changes |
| **Cerebras** | ✅ OK | Monitor Qwen3 235B deprecated May 27 2026 |
| **Mistral LP** | ✅ OK | No changes |
| **SambaNova** | ❌ Invalid key (401) | Regenerate key on cloud.sambanova.ai |
| **OpenRouter** | ❌ Invalid key (401) | Regenerate key, then clean up gone :free models |
| **Qwen/DashScope** | ❌ Key not configured | Configure DASHSCOPE_API_KEY locally |
| **HuggingFace** | N/A | Not used in codebase |
| **Replicate** | N/A | Not used in codebase |

### OpenRouter - Free models to verify/remove

These models are no longer in the :free catalog (either exhausted or removed):
- `google/gemma-3-12b-it:free` ❌
- `google/gemma-3-27b-it:free` ❌
- `google/gemma-3-4b-it:free` ❌
- `google/gemma-3n-e2b-it:free` ❌
- `google/gemma-3n-e4b-it:free` ❌
- `google/gemma-4-31b-a4b-it:free` ❌
- `inclusionai/ling-2.6-1t:free` ❌
- `tencent/hy3-preview:free` ❌

New free models discovered on OpenRouter:
- `arcee-ai/trinity-large-thinking:free` ✨ (add if available)
- `deepseek/deepseek-v4-flash:free` ✨ (add if available)
- `inclusionai/ring-2.6-1t:free` ✨ (add if available)

## Subtasks

- [ ] Regenerate SambaNova key on cloud.sambanova.ai
- [ ] Regenerate OpenRouter key (or verify if free tier/quota exhausted)
- [ ] Configure DASHSCOPE_API_KEY locally
- [ ] Test OpenRouter with new key
- [ ] OpenRouter: Remove 8 gone free models
- [ ] OpenRouter: Add new available free models
- [ ] Test Cerebras Qwen3 235B (deprecated May 27 2026)

## Notes

⚠️ API keys stored in password manager (1Password), not in this file.

Sources: audit done in May 2025 via curl ping tests.