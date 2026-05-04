# Graph Report - /Users/vava/Documents/GitHub/free-coding-models  (2026-05-04)

## Corpus Check
- 106 files · ~293,864 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 811 nodes · 1793 edges · 33 communities detected
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 165 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_FileRouter Utils|File/Router Utils]]
- [[_COMMUNITY_UI Rendering Helpers|UI Rendering Helpers]]
- [[_COMMUNITY_App Lifecycle & Cache|App Lifecycle & Cache]]
- [[_COMMUNITY_Config Management|Config Management]]
- [[_COMMUNITY_Tool Bootstrap & Install|Tool Bootstrap & Install]]
- [[_COMMUNITY_Analysis & Model Filtering|Analysis & Model Filtering]]
- [[_COMMUNITY_Install & Catalog|Install & Catalog]]
- [[_COMMUNITY_Cleanup Functions|Cleanup Functions]]
- [[_COMMUNITY_OpenClaw Integration|OpenClaw Integration]]
- [[_COMMUNITY_Ping & Quota Monitoring|Ping & Quota Monitoring]]
- [[_COMMUNITY_Model Management|Model Management]]
- [[_COMMUNITY_Theme & Colors|Theme & Colors]]
- [[_COMMUNITY_Telemetry|Telemetry]]
- [[_COMMUNITY_Test Framework|Test Framework]]
- [[_COMMUNITY_Config Security|Config Security]]
- [[_COMMUNITY_Kilo Config|Kilo Config]]
- [[_COMMUNITY_Provider Quota Fetchers|Provider Quota Fetchers]]
- [[_COMMUNITY_Command Palette|Command Palette]]
- [[_COMMUNITY_Model Merger|Model Merger]]
- [[_COMMUNITY_Changelog Loader|Changelog Loader]]
- [[_COMMUNITY_Constants|Constants]]
- [[_COMMUNITY_Tier Colors|Tier Colors]]
- [[_COMMUNITY_Provider Metadata|Provider Metadata]]
- [[_COMMUNITY_Product Flags|Product Flags]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]

## God Nodes (most connected - your core abstractions)
1. `router-dashboard.js` - 52 edges
2. `RouterRuntime` - 39 edges
3. `runApp()` - 32 edges
4. `installProviderEndpoints()` - 23 edges
5. `free-coding-models CLI` - 23 edges
6. `prepareExternalToolLaunch()` - 21 edges
7. `saveConfig()` - 21 edges
8. `renderTable()` - 18 edges
9. `cleanupLegacyProxyArtifacts()` - 17 edges
10. `normalizeRouterConfig()` - 17 edges

## Surprising Connections (you probably didn't know these)
- `Parallel Pings` --semantically_similar_to--> `Health Probe Engine`  [INFERRED] [semantically similar]
  README.md → tasks/PRD-smart-model-router.md
- `Smart Recommend` --semantically_similar_to--> `Stability Score`  [INFERRED] [semantically similar]
  README.md → docs/stability.md
- `Command Palette` --conceptually_related_to--> `Install Endpoints (Y key)`  [INFERRED]
  task/COMMAND_PALETTE.md → docs/integrations.md
- `runApp()` --calls--> `fetchLastReleaseDate()`  [INFERRED]
  /Users/vava/Documents/GitHub/free-coding-models/src/app.js → /Users/vava/Documents/GitHub/free-coding-models/src/updater.js
- `runApp()` --calls--> `promptUpdateNotification()`  [INFERRED]
  /Users/vava/Documents/GitHub/free-coding-models/src/app.js → /Users/vava/Documents/GitHub/free-coding-models/src/updater.js

## Hyperedges (group relationships)
- **Router Core Components** — router_daemon, circuit_breaker, health_probe_engine, scoring_algorithm [EXTRACTED 1.00]
- **Router TUI Screens** — router_dashboard, set_manager, token_usage_screen, position_picker [EXTRACTED 1.00]
- **TUI State Management Files** — src_app_js, src_key_handler_js, src_overlays_js, src_render_table_js [EXTRACTED 1.00]

## Communities

### Community 0 - "File/Router Utils"
Cohesion: 0.07
Nodes (44): main(), atomicWriteJson(), attachClientAbort(), buildDefaultRouterSet(), buildProviderModelsUrl(), buildRouterSetFromFavorites(), buildUpstreamMeta(), cloneHeadersForUpstream() (+36 more)

### Community 1 - "UI Rendering Helpers"
Cohesion: 0.07
Nodes (65): calculateViewport(), clampOverlayOffset(), displayWidth(), keepOverlayTargetVisible(), padEndDisplay(), sliceOverlayLines(), stripAnsi(), tintOverlayLines() (+57 more)

### Community 2 - "App Lifecycle & Cache"
Cohesion: 0.04
Nodes (66): agent-tui (Visual TUI Testing), API Key Management, CHANGELOG v0.3.56, Circuit Breaker, CLI Flags Reference, Command Palette, Circuit Breaker Cooldown/Backoff, Daemon HTTP Endpoints (+58 more)

### Community 3 - "Config Management"
Cohesion: 0.06
Nodes (45): fetchOpenRouterFreeModels(), filterByTierOrExit(), runFiableMode(), runApp(), createMouseHandler(), createOverlayRenderers(), sortResultsWithPinnedFavorites(), renderTable() (+37 more)

### Community 4 - "Tool Bootstrap & Install"
Cohesion: 0.14
Nodes (45): addApiKey(), buildPersistedConfig(), cloneConfigValue(), createBackup(), _emptyConfig(), _emptyProfileSettings(), isPlainObject(), isProviderEnabled() (+37 more)

### Community 5 - "Analysis & Model Filtering"
Cohesion: 0.16
Nodes (31): backupIfExists(), buildInstallRecord(), canonicalizeToolMode(), ensureDirFor(), getDefaultPaths(), getDirectInstallSupport(), getManagedProviderId(), getManagedProviderLabel() (+23 more)

### Community 6 - "Install & Catalog"
Cohesion: 0.1
Nodes (25): $(), animateValue(), buildDetailChart(), escapeHtml(), formatAvg(), formatPing(), getFilteredModels(), loadSettingsPage() (+17 more)

### Community 7 - "Cleanup Functions"
Cohesion: 0.23
Nodes (30): applyOpenAiCompatEnv(), backupIfExists(), buildGeminiEnv(), buildToolEnv(), cloneInheritedEnv(), deleteEnvKeys(), ensureDir(), ensureJcodeModelPrefix() (+22 more)

### Community 8 - "OpenClaw Integration"
Cohesion: 0.14
Nodes (26): getApiKey(), buildOpenAiCompatibleProviderConfig(), loadOpenCodeConfig(), saveOpenCodeConfig(), createZaiProxy(), getOpenCodeConfigPath(), getOpenCodeModelId(), isTcpPortAvailable() (+18 more)

### Community 9 - "Ping & Quota Monitoring"
Cohesion: 0.22
Nodes (25): cleanupAider(), cleanupAmp(), cleanupCrush(), cleanupGoose(), cleanupLegacyEnvFiles(), cleanupLegacyProxyArtifacts(), cleanupMainConfig(), cleanupOpenClaw() (+17 more)

### Community 10 - "Model Management"
Cohesion: 0.15
Nodes (19): buildPingRequest(), extractQuotaPercent(), fetchProviderQuotaPercent(), getHeaderValue(), getProviderQuotaPercentCached(), ping(), resolveCloudflareUrl(), usagePlaceholderForProvider() (+11 more)

### Community 11 - "Theme & Colors"
Cohesion: 0.12
Nodes (9): buildRouterTestConfig(), closeRouterTestServer(), listenOnRandomPort(), mockResult(), postRouterChat(), renderAtWidth(), routerChatBody(), withMockProvider() (+1 more)

### Community 12 - "Telemetry"
Cohesion: 0.17
Nodes (16): buildOpenAiCompatibleProviderConfig(), getKiloConfigPath(), loadKiloConfig(), saveKiloConfig(), getKiloModelId(), spawnKilo(), startKilo(), executableSuffixes() (+8 more)

### Community 13 - "Test Framework"
Cohesion: 0.14
Nodes (9): buildDetailChart(), DetailPanel(), formatAvg(), formatPing(), pingClass(), parseSwe(), sweClass(), verdictCls() (+1 more)

### Community 14 - "Config Security"
Cohesion: 0.19
Nodes (13): loadBackups(), parseAiderConfig(), parseAmpConfig(), parseCrushConfig(), parseGooseConfig(), parseKiloConfig(), parseOpenHandsConfig(), parsePiConfig() (+5 more)

### Community 15 - "Kilo Config"
Cohesion: 0.25
Nodes (13): getOpenClawConfigPath(), loadOpenClawConfig(), saveOpenClawConfig(), spawnOpenClawCli(), startOpenClaw(), buildEnvContent(), buildRcSourceLine(), detectShellInfo() (+5 more)

### Community 16 - "Provider Quota Fetchers"
Cohesion: 0.25
Nodes (13): buildHeaders(), buildSyncCandidates(), collectApiKeys(), isOpenRouterFreeModelId(), isRouteableProvider(), jsonRequest(), normalizeModelId(), parseSwePercent() (+5 more)

### Community 17 - "Command Palette"
Cohesion: 0.26
Nodes (13): checkForUpdate(), checkForUpdateDetailed(), detectGlobalInstallPermission(), detectPackageManager(), fetchLastReleaseDate(), getInstallArgs(), getManualInstallCmd(), hasSudoCommand() (+5 more)

### Community 18 - "Model Merger"
Cohesion: 0.33
Nodes (11): buildTelemetryProperties(), ensureTelemetryConfig(), getTelemetryDistinctId(), getTelemetrySystem(), getTelemetryTerminal(), isTelemetryDebugEnabled(), isTelemetryEnabled(), parseTelemetryEnv() (+3 more)

### Community 19 - "Changelog Loader"
Cohesion: 0.32
Nodes (11): buildIsolatedConfig(), copyArtifactIfExists(), findExecutableOnPath(), main(), normalizeTerminalText(), parseCliArgs(), printHelp(), runInteractiveTranscript() (+3 more)

### Community 20 - "Constants"
Cohesion: 0.22
Nodes (4): classifyToolTranscript(), detectTranscriptFindings(), normalizeTestfcmToolName(), resolveTestfcmToolSpec()

### Community 21 - "Tier Colors"
Cohesion: 0.36
Nodes (7): createProviderQuotaFetcher(), fetchOpenRouterRaw(), fetchProviderQuota(), fetchSiliconFlowRaw(), makeCacheKey(), parseOpenRouterResponse(), parseSiliconFlowResponse()

### Community 22 - "Provider Metadata"
Cohesion: 0.57
Nodes (6): clearCache(), getCacheAge(), getCachePath(), isCacheFresh(), loadCache(), saveCache()

### Community 23 - "Product Flags"
Cohesion: 0.25
Nodes (4): App(), useFilter(), useSSE(), useTheme()

### Community 24 - "Community 24"
Cohesion: 0.53
Nodes (5): buildCommandPaletteEntries(), buildCommandPaletteTree(), filterCommandPaletteEntries(), flattenCommandTree(), fuzzyMatchCommand()

### Community 25 - "Community 25"
Cohesion: 0.8
Nodes (4): buildCliHelpLines(), buildCliHelpText(), formatEntry(), paint()

### Community 26 - "Community 26"
Cohesion: 0.47
Nodes (3): noteUserActivity(), refreshAutoPingMode(), setPingMode()

### Community 27 - "Community 27"
Cohesion: 0.6
Nodes (3): buildMergedModels(), parseCtxK(), parseSwePercent()

### Community 28 - "Community 28"
Cohesion: 0.83
Nodes (3): formatChangelogForDisplay(), getLatestChanges(), loadChangelog()

### Community 29 - "Community 29"
Cohesion: 0.5
Nodes (2): getModelConfig(), patchOpenClawModelsJson()

### Community 33 - "Community 33"
Cohesion: 1.0
Nodes (2): checkPort(), main()

### Community 59 - "Community 59"
Cohesion: 1.0
Nodes (1): PRD — Smart Model Router

### Community 60 - "Community 60"
Cohesion: 1.0
Nodes (1): TUI Footer

## Knowledge Gaps
- **28 isolated node(s):** `PRD — Smart Model Router`, `Token Usage Screen`, `src/render-table.js (Table Rendering)`, `useSSE Hook`, `useFilter Hook` (+23 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 29`** (4 nodes): `getModelConfig()`, `patch-openclaw.js`, `patch-openclaw-models.js`, `patchOpenClawModelsJson()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (3 nodes): `checkPort()`, `main()`, `dev-web.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 59`** (1 nodes): `PRD — Smart Model Router`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 60`** (1 nodes): `TUI Footer`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `runApp()` connect `Config Management` to `File/Router Utils`, `UI Rendering Helpers`, `App Lifecycle & Cache`, `Tool Bootstrap & Install`, `Analysis & Model Filtering`, `Install & Catalog`, `Kilo Config`, `Command Palette`, `Provider Metadata`?**
  _High betweenness centrality (0.270) - this node is a cross-community bridge._
- **Why does `getApiKey()` connect `OpenClaw Integration` to `File/Router Utils`, `Tool Bootstrap & Install`, `Analysis & Model Filtering`, `Cleanup Functions`, `Telemetry`, `Kilo Config`, `Provider Quota Fetchers`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Why does `Command Palette` connect `App Lifecycle & Cache` to `Config Management`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Are the 30 inferred relationships involving `runApp()` (e.g. with `checkConfigSecurity()` and `checkForUpdate()`) actually correct?**
  _`runApp()` has 30 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `installProviderEndpoints()` (e.g. with `saveConfig()` and `getToolMeta()`) actually correct?**
  _`installProviderEndpoints()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PRD — Smart Model Router`, `Token Usage Screen`, `src/render-table.js (Table Rendering)` to the rest of the system?**
  _28 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `File/Router Utils` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._