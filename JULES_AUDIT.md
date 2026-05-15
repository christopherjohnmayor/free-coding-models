# Security Audit Report: free-coding-models

## Executive Summary
This audit identified multiple critical and high-severity vulnerabilities in the `free-coding-models` project. The issues primarily stem from unsafe handling of shell commands, insecure API exposure due to permissive CORS settings, and unsafe modification of JavaScript object properties leading to Prototype Pollution.

---

## 1. CORS Misconfiguration Leading to Local API Key Leak (Authentication/Authorization Flaws / Secrets Leaked)
**Severity:** Critical
**Location:** `web/server.js:239-246` and `web/server.js:215-217`

**Description:**
The local web dashboard server exposes an API endpoint `/api/key/:prov` that returns the plaintext API keys stored in `~/.free-coding-models.json`. The web server binds to `localhost:3333` but explicitly allows any cross-origin request (`Access-Control-Allow-Origin: *`). Because the server is listening locally, any malicious website the user visits while the dashboard is running can issue an XMLHttpRequest or `fetch()` to `http://localhost:3333/api/key/openai` and read the user's API keys.

```javascript
  // CORS for local dev
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  // ...
  const keyMatch = url.pathname.match(/^\/api\/key\/(.+)$/)
  if (keyMatch) {
    const providerKey = decodeURIComponent(keyMatch[1])
    const rawKey = getApiKey(config, providerKey)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ key: rawKey || null }))
    return
  }
```

**Recommendation:**
Restrict CORS headers. Ensure `Access-Control-Allow-Origin` is strictly bound to the origin of the web dashboard or removed entirely if only served directly from the same local server. Additionally, endpoints exposing secrets should use strong local authentication (e.g., passing a one-time token generated on startup) rather than relying solely on the loopback interface.

---

## 2. Command Injection via Unsafe Shell Execution (Injection Vulnerabilities)
**Severity:** Critical
**Location:** `src/opencode.js:616-630`

**Description:**
The `launchDesktop` function in `src/opencode.js` uses `child_process.exec()` with a command string constructed dynamically from `modelRef`. `modelRef` is built using `${providerKey}/${ocModelId}`. While `providerKey` and `modelId` originate from configuration and sources, if any of these values are manipulated (e.g., via malicious model definitions or modified configuration), an attacker can inject shell commands. 

```javascript
    const { exec } = await import('child_process')
    let command
    if (isMac) {
      command = 'open -a OpenCode'
    } else if (isWindows) {
      command = 'start "" "%LOCALAPPDATA%\\Programs\\OpenCode\\OpenCode.exe" 2>nul || start "" "%PROGRAMFILES%\\OpenCode\\OpenCode.exe" 2>nul || start OpenCode'
    } else if (isLinux) {
      command = `opencode-desktop --model ${modelRef} 2>/dev/null || flatpak run ai.opencode.OpenCode --model ${modelRef} 2>/dev/null || snap run opencode --model ${modelRef} 2>/dev/null || xdg-open /usr/share/applications/opencode.desktop 2>/dev/null || echo "OpenCode not found"`
    }
    exec(command, (err) => { ... })
```

**Recommendation:**
Refactor the shell execution to use `child_process.spawn()` or `child_process.execFile()` with arguments passed as an array to prevent shell interpolation. If `exec` must be used, all dynamic parameters like `${modelRef}` must be strictly validated or properly shell-escaped.

---

## 3. Prototype Pollution via Unsafe Object Assignment
**Severity:** High
**Location:** `web/server.js:300-313`

**Description:**
The settings API endpoint (`POST /api/settings`) parses arbitrary JSON user input and iterates over it to update the `config` object. 

```javascript
            const settings = JSON.parse(body)
            // ...
            if (settings.providers) {
              for (const [key, value] of Object.entries(settings.providers)) {
                if (!config.providers[key]) config.providers[key] = {}
                config.providers[key].enabled = value.enabled !== false
              }
            }
```

If an attacker passes a payload such as `{"providers": {"__proto__": {"enabled": true, "polluted": "yes"}}}`, the `Object.entries` loop yields `key = "__proto__"`. Because `config.providers["__proto__"]` resolves to `Object.prototype`, the code evaluates `config.providers["__proto__"].enabled = value.enabled !== false`, allowing arbitrary property injection into the global `Object.prototype`.

**Recommendation:**
Validate the `key` to explicitly forbid unsafe properties like `__proto__`, `constructor`, and `prototype`. Ensure `config.providers` is created with a `null` prototype or sanitize inputs properly.

---

## 4. Path Traversal using Insecure URL resolution (Path Traversal / Insecure File Handling)
**Severity:** Low / Medium
**Location:** `web/server.js:201-209`

**Description:**
The server uses `new URL(req.url, ...)` to parse request paths and passes `url.pathname` directly to `path.join` for static file serving. Although Node.js's `URL` constructor normalizes `/../` path components internally (making trivial path traversal difficult), if an attacker uses URL encoded slashes and dots (e.g., `/assets/..%2f..%2fetc/passwd`), the `pathname` property maintains the encoded string. If the path was `decodeURIComponent`'d prior to `path.join`, it would allow escaping the `dist` directory. Currently, since the server does not decode the `pathname` before passing it to `path.join`, standard file system reads simply fail because the literal encoded string (`..%2f..`) isn't a valid directory on most filesystems. However, this relies on a fragile mechanism. If any changes introduce `decodeURIComponent` on the `pathname` later, this will immediately become a critical path traversal vulnerability. 

**Recommendation:**
Always resolve the absolute path and check if the resulting path is contained within the intended base directory using `path.resolve` and `path.startsWith()` before attempting to read any file. 

---

## Other Observations
- **XSS (Cross-Site Scripting):** The `web/app.legacy.js` file uses `.innerHTML` to render tables and settings. The application correctly attempts to use `escapeHtml()` on dynamic string fields (e.g., `model.label`, `model.modelId`), minimizing the immediate risk. 
- **Dependency Vulnerabilities:** `package.json` relies minimally on external libraries (only `chalk`). There are no glaringly vulnerable third-party dependencies.
- **Insecure Deserialization / Unsafe Eval:** No usages of `eval()` or dangerous deserialization functions were observed in critical pathways.

