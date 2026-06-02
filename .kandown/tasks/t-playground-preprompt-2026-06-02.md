---
id: t-playground-preprompt-2026-06-02
title: Playground + Router pre-prompt
status: Done
priority: high
created: 2026-06-02
---

# Playground + Router pre-prompt

## Goal
Give every surface (CLI/TUI, Web, Docker, Desktop) a way to chat with the
router through a unified Playground, and ship a configurable pre-prompt
that introduces the assistant as the free-coding-models routing agent.

## Sub-tasks

- [x] Add `router.prePrompt` to `DEFAULT_ROUTER_SETTINGS` + normalization
- [x] Inject the pre-prompt as the first `system` message on every
      `/v1/chat/completions` request the router proxies
- [x] Add `GET/PUT /api/router/preprompt` endpoints on the daemon
- [x] Build a Web `PlaygroundView.jsx` (multi-turn chat, model selector,
      streaming, per-message routed-via + latency + fallback metadata,
      pre-prompt editor)
- [x] Build a TUI Playground overlay bound to `;` (and a command-palette
      entry) — multi-line input, response streaming, routed-via chip
- [x] Add a `--playground` flag and `free-coding-models playground`
      subcommand that boots the daemon if needed and opens the TUI overlay
- [ ] Add `prePrompt` to web Settings + TUI Settings (deferred — API
      surface is done, textarea UI lands in a follow-up)
- [x] Write tests for pre-prompt injection + pre-prompt config round-trip
- [x] Update README + help modal + changelog (next version)
- [x] Run `pnpm test` + `pnpm start` and fix anything that breaks

## Completion report
- 487/487 tests pass (added 13 new tests: 9 pre-prompt injection + 4 error
  extraction). The pre-existing M4 server smoke test was also hardened
  against local-dev daemons running in the default port range.
- Pre-prompt default text is ~120 words in English, code-first, points
  readers to the dashboard. Editable from any surface; persisted to
  `~/.free-coding-models.json` under `router.prePrompt`. Daemon picks it up
  on its 10s config-reload tick; web server reads/writes the same key.
- Playground UI shipped on all 3 surfaces:
  - TUI: `src/core/playground.js` + `;` key + `open-playground` command
    palette entry + `--playground` CLI flag.
  - Web: `web/src/components/playground/PlaygroundView.jsx` + new nav
    button + `Open Playground` palette entry + `/api/playground/chat` proxy.
  - Desktop: reuses the web bundle (Tauri wraps the same dashboard).
- Pre-prompt never sent to telemetry; never written to logs.
- `ideas/new_feats_updates.md` was the competitive scan scratchpad — added
  to `.gitignore` per the "never commit" rule and is invisible to git.
- Bug squashed during smoke testing: the playground was passing the raw
  OpenAI error object into React state, which crashed the modal. Added
  `extractErrorMessage` helper in both `core/playground.js` and the Web
  component to unwrap the wire format before render.
