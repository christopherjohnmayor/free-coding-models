# 🌐 free-coding-models — Website Plan

## ✅ Task Tracker

> Stack : **TanStack Start + Vite + Tailwind v4 + shadcn + MDX + Shiki + Pagefind + Vercel**
> URL prod : `freecodingmodels.vercel.app` · Root : `website/` · Repo : `free-coding-models`

### Sprint 1 — Setup + Landing
- [x] Plan finalisé et décisions verrouillées
- [x] Bootstrap TanStack Start dans `website/`
- [x] Tailwind v4 + Geist/Geist Mono fonts
- [x] Theme provider (Auto/Dark/Light) + CSS vars FCM
- [x] Layout : nav + footer
- [ ] Deploy preview Vercel configuré
- [x] Section Hero (wordmark + subtitle + terminal block)
- [x] Section Visual demo (screenshot full-bleed + glow)
- [x] Section Social proof bar (logos outils CLI)
- [x] Section Comparison table
- [x] Section Feature pillars (4 pillars numérotés)
- [x] Section Deployment cards (Local / Docker / Daemon)
- [x] Section Smart Model Router (ASCII diagram)
- [x] Section Provider showcase mini
- [ ] Section Security badges
- [x] Section Final CTA + footer
- [ ] OG image par défaut
- [ ] Deploy production sur `freecodingmodels.vercel.app`
- [x] Passe React best practices (CSS classes hover, no any, no inline handlers)

### Sprint 2 — Docs
- [ ] Script `scripts/sync-docs.mjs` (copie `../docs/*.md` → `content/docs/`)
- [ ] MDX pipeline (Vite plugin + remark/rehype + Shiki Vitesse Dark/Light)
- [ ] Layout docs (sidebar sticky + ToC droite)
- [ ] Composants MDX custom (Callout, Kbd, Terminal, ProviderCard, TierBadge…)
- [ ] Pagefind search (post-build hook)
- [ ] 10 pages docs portées depuis `docs/*.md`
- [ ] « Edit on GitHub » sur chaque page

### Sprint 3 — Blog + auto-release CI
- [ ] Routes `/blog`, `/blog/[slug]`, `/blog/tag/[tag]`, `/blog/feed.xml`
- [ ] Frontmatter zod schema (title, date, type, tags, version, excerpt, cover)
- [ ] Layout post (sidebar ToC + body + share)
- [ ] Index blog liste façon Linear changelog
- [ ] OG image dynamique par post (satori)
- [ ] Script `scripts/changelog-to-blogpost.mjs`
- [ ] GitHub Action auto-commit release post depuis `CHANGELOG.md`
- [ ] 2-3 posts initiaux

### Sprint 4 — Pages dynamiques + Polish
- [ ] `/providers` interactif (parse `sources.js`)
- [ ] `/models` virtualisé (~170 lignes, `@tanstack/react-virtual`)
- [ ] `/tools` grille avec install commands
- [ ] `/changelog` rendu depuis `CHANGELOG.md` + GitHub API
- [ ] OG images dynamiques par page (satori)
- [ ] Lighthouse > 95 + A11y audit (axe-core)
- [ ] 404 custom page
- [ ] Sitemap + RSS

---

> Site web public et marketing pour le package `free-coding-models`.
> But : convertir un visiteur curieux en `npm install -g free-coding-models` en moins de **10 secondes**, et l'aider à rester via une doc claire.

---

## 1. 🎯 Objectifs

| # | Objectif | KPI mesurable |
|---|----------|---------------|
| 1 | Faire comprendre la valeur en **< 5s** sur le hero | Bounce rate < 50% |
| 2 | Pousser l'install npm/Docker | Click-through sur "Copy install command" |
| 3 | Documenter sans noyer | Temps moyen sur `/docs` > 1min30 |
| 4 | Crédibiliser (170 modèles, 16 providers, supply chain verified) | Visites sur `/providers`, étoiles GitHub |
| 5 | Capter la communauté (Discord, GitHub) | Conversions vers Discord / star button |
| 6 | Publier les releases & deep-dives via blog | Visites uniques sur `/blog`, partages |

---

## 2. 🧱 Stack recommandée

| Choix | Recommandation | Pourquoi |
|-------|----------------|----------|
| 🟢 **Framework** | **TanStack Start** (React + Vite + file-based router + SSR/SSG) | Demande explicite de BAWSS. Vite-native (cohérent avec `vite` déjà dans `devDependencies`), routing typé end-to-end, server functions, streaming SSR, prerendering route-par-route |
| 🟢 **Routing** | **TanStack Router** (built-in) | Type-safe routes, search params validés, code-splitting auto |
| 🟢 **Data layer** | **TanStack Query** (intégré) | Cache, ISR-like behavior, hydration SSR propre |
| 🟢 **Hébergement** | **Vercel** ou **Netlify** ou **Cloudflare Pages** (TanStack Start déploie partout) | 🟢 reco : **Vercel** (preview deploys, OG image gen, Analytics gratuit). 🟡 Cloudflare Pages si on veut Edge full-stack moins cher |
| 🟢 **Styling** | **Tailwind CSS v4 + shadcn/ui (compatible TanStack)** | Cohérent avec la palette TUI, composants accessibles |
| 🟢 **Contenu doc + blog** | **MDX** via `@mdx-js/rollup` (plugin Vite officiel) | Permet d'embarquer composants React dans `docs/*.md` et `blog/*.mdx`. Pas de framework lock-in |
| 🟢 **Frontmatter** | **gray-matter** + `zod` schema (validation au build) | Typage strict des posts blog (title, date, author, tags) |
| 🟢 **Recherche** | **Pagefind** (statique, zéro infra) | Indexation au build, ~50KB de JS client, zéro backend |
| 🟢 **Code blocks** | **Shiki** (highlighting compile-time, themes Vitesse Dark/Light) + bouton "Copy" | Pas de runtime JS, qualité IDE-grade |
| 🟢 **Analytics** | **Plausible** (open-source friendly, cookie-less) | Respecte le ton « pas de tracking invasif » du projet |
| 🟢 **OG images** | **`satori` + `@vercel/og`** (compatible TanStack via API route) | OG images dynamiques par post de blog / page de doc |
| 🟢 **Sitemap & RSS** | Generated manuellement via TanStack Start build hooks | `/sitemap.xml` + `/feed.xml` (pour le blog) |
| 🟡 Alternative 1 | **Astro + Starlight** | Encore plus léger, parfait pour docs, mais on perd la flexibilité React full-app |
| 🔴 Alternative 2 | **Next.js 16** | Le standard, mais BAWSS a explicitement demandé TanStack Start |

> 📖 **Stack finale** : **TanStack Start + Vite + Tailwind + shadcn + MDX + Shiki + Pagefind + Vercel**.
> Vite-natif (cohérent avec ton repo), routing 100% typé, SSR/SSG/SPA hybride au choix par route, et tu gardes la main sur tout.

### 2.1 Pourquoi TanStack Start est solide ici

- **Vite déjà dans le repo** (`devDependencies`) → l'écosystème est familier
- **File-based routing typé** : zéro doute sur les liens cassés au build
- **SSG par défaut pour la landing, docs et blog** → Lighthouse parfait
- **SSR streaming** pour `/providers` et `/models` (data depuis `sources.js`)
- **Server functions** (`createServerFn`) pour les ISR-like : GitHub stars, npm version (revalidate 1h)
- **Pas de runtime lock-in** : déployable sur Vercel, Netlify, Cloudflare Workers, Bun, Node bare
- **Pas de "use client / use server" verbeux** comme Next.js → moins d'over-engineering pour un site marketing

---

## 3. 🗺️ Sitemap (arbo)

```
/                       → Landing (hero, features, providers, demo, CTA install)
/docs                   → Landing docs (cards par sujet)
  /docs/quickstart      → 60-second install + premier launch
  /docs/cli             → Référence flags (depuis docs/flags.md)
  /docs/config          → Config & API keys (depuis docs/config.md)
  /docs/stability       → Stability score expliqué (depuis docs/stability.md)
  /docs/integrations    → Outils CLI supportés (depuis docs/integrations.md)
  /docs/router          → Smart Model Router + daemon
  /docs/dashboard       → Web dashboard local (port 19280)
  /docs/docker          → Run via Docker / docker-compose
  /docs/sync-set        → --sync-set (depuis docs/sync-set.md)
  /docs/development     → Contribuer (depuis docs/development.md)
/providers              → Tableau interactif des 16 providers + filtres
/models                 → Catalogue live des ~170 modèles (data depuis sources.js)
/tools                  → Tools supportés (OpenCode, OpenClaw, Crush, Goose…) avec install guide
/changelog              → CHANGELOG.md rendu joliment + filtre par version (aussi syndiqué sur /blog)
/blog                   → Index blog (releases + deep-dives + comparatifs providers)
  /blog/[slug]          → Post MDX (frontmatter strict)
  /blog/tag/[tag]       → Filtre par tag
  /blog/feed.xml        → Flux RSS pour les release watchers
/security               → SECURITY.md + supply chain badges
/about                  → Vanessa / Vava-Nessa + contributors
/legal/license          → MIT + model licensing breakdown
/404                    → Custom (ton playful)
```

---

## 4. 🏠 Landing (`/`)

> **Vibe global** : terminal-brutalist, mono-chrome dark, accents vert FCM (parcimonieux), monospace partout où ça compte, screenshots de TUI utilisés comme démonstration. Zero gradient, zero shadow molles, zero illustration cartoon. C'est un outil dev, on parle dev.
>
> ⚠️ **Inspiration ≠ copie** : [herdr.dev](https://herdr.dev/) sert de **référence visuelle** (densité, monochrome, comparison table, screenshots full-bleed). On garde **notre identité** : on **ne copie pas** les phrases ni les patterns de structure exacts. FCM a son ton à lui (le vert NVIDIA, le ton playful Vava, les émojis du TUI).

### 4.1 Sections (de haut en bas, ordre herdr.dev-style)

#### A. **Navigation persistante** (top, sticky, fond translucide blur léger)
- À gauche : `[logo] free-coding-models` (logo SVG monochrome)
- Au centre : `Docs` · `Blog` · `Providers` · `Models` · `Changelog`
- À droite : `GitHub ★ 1.2k` (live count) · bouton **`Install`** (CTA pill vert flash) · toggle theme
- Hauteur ~56px, bordure bottom 1px `--border-subtle`

#### B. **Hero** (above the fold, full viewport height -nav)
- **Wordmark** (H1, exactement le titre du README) : **`free-coding-models`**
  - Affiché en grand, font Geist semi-bold, légèrement tracking-tight
  - À gauche du wordmark : le logo `logo.webp` (taille ~64px), comme dans le README
- **Subtitle** (du README aussi) : *« Find the fastest free coding model in seconds »*
- **Subhead** secondaire (mono, plus petit) : *« Track ~170 models across ~15 trusted free or free-limited AI providers in real time »*
- **Dual CTA** :
  - Primaire (rempli vert FCM) : **`Quick start →`**
  - Secondaire (border-only) : **`Read the docs`**
- **Bloc terminal copiable** dessous (VRAI terminal stylisé) :
  ```
  $ npm install -g free-coding-models
  $ free-coding-models
  ```
  Avec barre de title style macOS terminal (3 ronds rouge/jaune/vert), prompt `$` vert FCM, output animé qui montre 3-4 lignes du TUI qui se remplit.
- **Pas de gif en hero** — un screenshot statique haute résolution du TUI avec un léger glow vert autour (signature visuelle FCM). Le gif/video reste plus bas.

#### C. **Visual demo section** (large, full-bleed)
- **Screenshot du TUI en taille réelle**, comme herdr le fait avec son terminal screenshot
- Optionnel : version `<video autoplay muted loop playsinline>` (mp4 H.265 < 500KB) qui montre :
  1. Le TUI qui ping les modèles
  2. Sort par stabilité
  3. Press Enter → launch OpenCode
- Caption mono dessous : *« Real ping. Real stability score. Real launch. »*

#### D. **Social proof bar** (« Used in the wild » / « Works with »)
- Format herdr : grille horizontale de **logos d'outils CLI intégrés** :
  OpenCode · OpenClaw · Crush · Goose · Aider · Continue · Cline · Kilo · Qwen Code · OpenHands · Amp · Hermes · Xcode · Pi · Rovo · Gemini · Copilot · ForgeCode
- Logos en monochrome (grayscale), passent en couleur au hover
- Au-dessus : stats live en mono « **+ 12k installs/week · 1.2k ★ · 8 contributors** »

#### E. **Comparison table** (LE truc signature herdr — section différenciation)
Tableau 3-4 colonnes pour planter la position :

| | Manual API key juggling | Provider dashboards | Paid routers (OpenRouter Pro…) | **free-coding-models** |
|---|:---:|:---:|:---:|:---:|
| Tests 170 models in parallel | — | — | — | ✓ |
| Stability score (not just avg) | — | — | — | ✓ |
| Auto-writes tool config | — | — | — | ✓ |
| 100% free tier focused | — | — | — | ✓ |
| Local OpenAI router | — | — | ✓ | ✓ |
| Works offline-first | — | — | — | ✓ |
| Zero telemetry by default | ✓ | — | — | ✓ (opt-in) |

Cellules vides = `—` discret, cellules cochées = `✓` en vert flash. La colonne FCM est légèrement surlignée.

#### F. **Feature pillars** (4 cards numérotées, façon herdr « Survives disconnects… »)
**Pas une grille de 10 features molles** — 4 piliers numérotés, gros titres, description courte :

1. **`01 / Real-time stability scoring`**
   *p95 + jitter + spike rate + uptime. Avg latency mentirait. Ça non.*

2. **`02 / Picks your model. Writes the config.`**
   *Enter → ta config OpenCode/Crush/Goose est mise à jour, l'outil se lance. 10 secondes.*

3. **`03 / Local OpenAI-compatible router`**
   *Un seul endpoint `localhost:19280/v1`, failover automatique entre les 16 providers libres.*

4. **`04 / 0 paid key required to start`**
   *NVIDIA NIM, Groq, Cerebras, Google AI Studio… des dizaines de modèles S+ sans carte bleue.*

#### G. **Deployment options** (3 cards parallèles, façon herdr « Local / SSH / Thin Client »)
- **`Local`** — `npm install -g free-coding-models` + snippet TUI
- **`Docker`** — `docker run -p 19280:19280 ghcr.io/vava-nessa/...` + snippet
- **`Daemon background`** — `free-coding-models --daemon-bg` + endpoint à pointer
Chaque card avec : titre mono, 1 phrase, bloc code, lien `View guide →`

#### H. **Smart Model Router** (section dédiée mid-page)
- Diagramme ASCII-art (style terminal, pas Mermaid) :
  ```
  ┌─ your coding tool ─┐
  │  OpenCode / Crush  │
  └─────────┬──────────┘
            │ http://localhost:19280/v1
            ▼
  ┌─ free-coding-models daemon ─┐
  │  ◉ probe · ◉ score · ◉ pick │
  └──┬──────┬──────┬──────┬─────┘
     ▼      ▼      ▼      ▼
   NVIDIA  Groq  Cerebras  …
  ```
- Bloc config en 4 lignes mono :
  ```
  Base URL: http://localhost:19280/v1
  Model:    fcm
  API key:  fcm-local
  ```
- Petit caption : *« One endpoint. 16 fallbacks. Zero downtime. »*
- Lien : `Router docs →`

#### I. **Provider showcase** (mini-grille → CTA vers /providers)
- Top 6-8 providers avec logo + nombre de modèles + free tier en 1 ligne
- En bas : `→ See all 16 providers`

#### J. **From the blog** (3 derniers posts)
- 3 cards horizontales : date · tag · titre · 1 ligne d'extrait
- Le dernier release post toujours en premier
- Lien `→ All posts`

#### K. **Security & Supply Chain** (encart compact, mono, sérieux)
Format herdr : ligne de badges + 1 phrase
> *« 1 runtime dep · npm provenance signed · SBOM published · MIT »*
- Lien `Security policy →`

#### L. **Final CTA** (full-bleed bottom)
- Reprise du wordmark `free-coding-models` en plus petit
- Reprise de la subtitle : *« Find the fastest free coding model in seconds »*
- Mêmes dual CTA : `Quick start` · `Read the docs`
- Mini-mention en mono : *Free forever. No credit card. No telemetry by default.*

#### M. **Footer** (minimal, mono)
- 4 colonnes : Product · Docs · Community · Legal
- Logo + tagline + © Vanessa Depraute (Vava-Nessa) + lien Discord/GitHub/RSS

### 4.2 Wireframe ASCII

```
┌──────────────────────────────────────────────────────────────┐
│ [▣ fcm]    Docs  Blog  Providers  Models  Changelog    ★1.2k │ [Install]
├──────────────────────────────────────────────────────────────┤
│                                                              │
│       [logo]                                                 │
│                                                              │
│              free-coding-models                              │
│                                                              │
│        Find the fastest free coding model in seconds         │
│                                                              │
│   ~170 models across ~15 trusted free AI providers, live     │
│                                                              │
│              [ Quick start → ]   [ Read the docs ]           │
│                                                              │
│   ╭─ ● ● ● ─────────────────────── free-coding-models ─╮     │
│   │ $ npm install -g free-coding-models                │     │
│   │ $ free-coding-models                               │     │
│   │ ✓ pinging 170 models...                            │     │
│   │ ✓ Kimi K2 · NVIDIA · 142ms · stability 96 🥇       │     │
│   ╰────────────────────────────────────────────────────╯     │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│        [ Full-bleed TUI screenshot, slight green glow ]      │
├──────────────────────────────────────────────────────────────┤
│  Works with:                                                 │
│  [OpenCode] [OpenClaw] [Crush] [Goose] [Aider] [Continue]... │
├──────────────────────────────────────────────────────────────┤
│  ┌───────────┬────────┬────────┬────────┬──────────────┐     │
│  │           │ manual │ dashb. │ paid r.│ free-cod...m │     │
│  │ parallel  │   —    │   —    │   —    │      ✓       │     │
│  │ stability │   —    │   —    │   —    │      ✓       │     │
│  │ config wr │   —    │   —    │   —    │      ✓       │     │
│  └───────────┴────────┴────────┴────────┴──────────────┘     │
└──────────────────────────────────────────────────────────────┘
```

---

## 5. 📚 Section Docs (`/docs/*`)

### 5.1 Layout

- **Sidebar gauche** (sticky) : arborescence
- **Contenu central** : MDX rendu avec Shiki
- **Sidebar droite** : ToC + bouton « Edit on GitHub » + last update timestamp

### 5.2 Source de vérité

- **Single source** : les fichiers `docs/*.md` existants dans le repo
- Le site les **lit directement** au build via MDX → zéro duplication, le repo reste autoritaire
- Webhook GitHub → redeploy Vercel sur push main

### 5.3 Composants MDX custom à créer

| Composant | Rôle |
|-----------|------|
| `<Callout type="info\|warn\|danger">` | Encarts visuels |
| `<Terminal>` | Bloc code avec output coloré façon TUI |
| `<KeyboardKey>` | Affiche `[Ctrl+P]` stylisé |
| `<ProviderCard>` | Card provider réutilisable |
| `<TierBadge>` | Badge tier `S+`, `S`, `A`, etc. avec couleur |
| `<FlagTable>` | Auto-rendu d'une table de flags |
| `<DemoSnippet>` | Mini terminal interactif (npm run / output simulé) |

### 5.4 Pages docs prioritaires (ordre d'écriture)

1. **Quickstart** (90% des nouveaux visiteurs)
2. **CLI flags** (déjà dans `docs/flags.md`)
3. **Config & API keys** (déjà dans `docs/config.md`)
4. **Smart Model Router** (à extraire du README, gros chapitre)
5. **Docker** (à extraire du README)
6. **Web dashboard** (à extraire du README + screenshots)
7. **Stability score** (déjà dans `docs/stability.md`)
8. **Tool integrations** (déjà dans `docs/integrations.md`)
9. **--sync-set** (déjà dans `docs/sync-set.md`)
10. **Development / Contributing** (déjà dans `docs/development.md`)

---

## 6. 🔌 Pages dynamiques

### 6.1 `/providers` — tableau live
- **Source** : `sources.js` parsé au build
- Colonnes : provider · logo · models count · tier range · free tier · env var · signup link
- **Filtres client-side** : par tier, par free-tier type (no credit card, tokens/day, RPM)
- Search bar

### 6.2 `/models` — catalogue
- **Source** : `sources.js`
- ~170 lignes, virtualisées avec `@tanstack/react-virtual`
- Filtres : provider, tier, context window, SWE-bench score
- Colonne « Compatible with » → outils CLI compatibles

### 6.3 `/tools` — outils CLI supportés
- Une card par outil avec :
  - Logo + nom
  - Install command
  - Flag FCM correspondant
  - Compatibilité (Regular / Rovo / Gemini / Zen)
  - Lien vers le repo officiel

### 6.4 `/changelog`
- Source : `CHANGELOG.md` (lu au build)
- Mais aussi : `git log` via GitHub API pour les commits inter-release
- Filter par version, search keyword
- **Sync auto vers `/blog`** : à chaque release, un post blog `release-X.Y.Z.mdx` est généré (voir §6.5)

### 6.5 `/blog` — Blog & release notes 📝

Format inspiré des blogs dev modernes (Vercel, Linear, Resend) : minimaliste, mono, lecture confortable.

#### Structure des fichiers
```
content/blog/
├── 2026-05-17-v0-3-67-docker-packaging.mdx
├── 2026-05-10-v0-3-66-forgecode-copilot.mdx
├── 2026-04-22-stability-score-deep-dive.mdx
├── 2026-04-15-why-we-built-the-router.mdx
└── ...
```

#### Frontmatter typé (validé via zod au build)
```mdx
---
title: "v0.3.67 — Docker Packaging & Daemon+Web Merge"
slug: "v0-3-67-docker-packaging"
date: 2026-05-17
type: "release"          # release | deep-dive | comparison | tutorial
tags: ["release", "docker", "router"]
version: "0.3.67"        # only for type=release
author: "vava-nessa"
excerpt: "First-class Docker support, combined daemon+web dashboard, and 6 security fixes."
cover: "/blog/covers/v0-3-67.png"
draft: false
---
```

#### Types de posts (3-4 catégories suffisent)

| Type | Cadence | Contenu type |
|------|---------|--------------|
| **`release`** | À chaque bump version | Auto-généré depuis `CHANGELOG.md` (voir auto-gen plus bas), enrichi à la main si besoin |
| **`deep-dive`** | 1×/mois | « Comment on calcule le stability score », « Architecture du daemon » |
| **`comparison`** | 1×/mois | « NVIDIA NIM vs Groq pour Kimi K2 », « Free tiers réels en 2026 » |
| **`tutorial`** | À l'occasion | « Setup FCM + OpenCode en 2 min », « Run FCM behind a corporate proxy » |

#### Layout d'un post
- Sidebar gauche : ToC sticky
- Centre : titre H1 + métadonnées (date, author avatar, reading time auto-calculé, tags)
- Cover image (16:9, optionnelle, OG image générée auto si absente)
- Body MDX avec composants custom (terminal, callouts, comparaison tables)
- Bas de page : « Share on X » · « Discuss on Discord » · « Edit on GitHub » · suggestions de posts liés

#### Layout de l'index `/blog`
- Filtres : `All · Releases · Deep dives · Tutorials · Comparisons`
- Liste chronologique, format ligne (façon Linear changelog) :
  ```
  ────────────────────────────────────────────────
  2026-05-17 · release · v0.3.67
  Docker Packaging & Daemon+Web Merge
  First-class Docker support, combined daemon+web…
  ────────────────────────────────────────────────
  ```
- Pas de cards lourdes, du texte mono, lecture rapide
- Pagination 20 posts par page
- Bouton **`Subscribe via RSS`** + `Follow on X` + Discord

#### Auto-génération release posts (CI)

Sur chaque push de `CHANGELOG.md` :
1. Un GitHub Action lit la nouvelle entrée `## [X.Y.Z] - YYYY-MM-DD`
2. Génère `content/blog/YYYY-MM-DD-vX-Y-Z-<slug>.mdx`
3. Convertit les sections `### Added / ### Fixed / ### Changed` en MDX
4. Commit le fichier dans la branche `main`
5. Vercel redeploy automatiquement → post visible

Script : `scripts/changelog-to-blogpost.mjs` (à créer).

#### Composants MDX dispos dans les posts (en plus de ceux des docs)
| Composant | Rôle |
|-----------|------|
| `<ReleaseHeader version="0.3.67" date="2026-05-17" />` | En-tête release stylisé |
| `<Section icon="✨" title="Added">…</Section>` | Section colorée du changelog |
| `<CommitLink sha="7997f38">` | Lien typé vers le commit |
| `<ProviderHighlight name="NVIDIA NIM" />` | Card provider compacte inline |
| `<Tweet id="..." />` | Embed Tweet/X (server-rendered) |

#### Flux RSS / Atom
- `/blog/feed.xml` → flux RSS 2.0
- `/blog/atom.xml` → flux Atom
- Headers `Content-Type: application/rss+xml`
- Auto-generated au build via `feed` package

#### Newsletter (Phase 5, optionnel)
- Resend ou Loops avec un simple endpoint server function TanStack Start
- Email à chaque nouveau post `type=release`
- Pas de tracking pixel

---

## 7. 🎨 Design system — terminal-brutalist (inspiré herdr.dev)

> **Principe directeur** : on respecte l'intelligence du dev. Pas de fluff marketing, pas de gradients de licorne, pas d'illustration cartoon. Le site DOIT ressembler à un outil dev — net, mono-chrome, dense, fonctionnel. **Le terminal est le langage visuel.**

### 7.1 Palette (dark-first, terminal-grade)

```css
/* Backgrounds — comme un terminal Vitesse Dark */
--bg-base:        #0a0a0a;   /* deep charcoal, herdr-style */
--bg-elevated:    #111111;   /* cards, code blocks */
--bg-subtle:      #161616;   /* hover, table stripes */
--bg-overlay:     rgba(10,10,10,0.85);  /* modal/nav blur backdrop */

/* Borders — fines, jamais épaisses */
--border-subtle:  #1f1f1f;
--border-default: #2a2a2a;
--border-emphasis:#3a3a3a;

/* Text — high contrast, terminal palette */
--text-primary:   #f5f5f5;   /* body */
--text-secondary: #a3a3a3;   /* meta, captions */
--text-muted:     #6b6b6b;   /* timestamps, hints */
--text-disabled:  #404040;

/* Brand — vert FCM, parcimonieux (signature, pas wallpaper) */
--brand:          #76b900;   /* vert flash, accents CTA, prompt $ */
--brand-hover:    #8dd300;
--brand-dim:      #3d6b00;   /* hover/visited, état actif discret */
--brand-glow:     rgba(118,185,0,0.15);  /* glow autour du terminal screenshot */

/* Tier colors — cohérent TUI */
--tier-s-plus:    #ff6b00;
--tier-s:         #ffa500;
--tier-a-plus:    #76b900;
--tier-a:         #3d6b00;
--tier-b:         #1a56db;
--tier-c:         #7280a0;

/* Semantic — minimal */
--success:        #76b900;
--warning:        #f5a524;
--danger:         #ef4444;
--info:           #3b82f6;

/* Light mode (secondaire, inversion) */
--bg-base-light:    #fafafa;
--bg-elevated-light:#ffffff;
--text-primary-light:#0a0a0a;
```

> ⚠️ **Règle d'or herdr** : le vert FCM (`--brand`) n'est utilisé **que** sur :
> - CTA primaires
> - Prompts `$` dans les blocs terminal
> - Cellules cochées des tableaux de comparaison
> - Stats clés au survol
> - Liens internes
>
> Partout ailleurs : monochrome. Sinon ça vire en sapin de Noël.

### 7.2 Typographie

| Usage | Font | Notes |
|-------|------|-------|
| **Display / H1** | **`Geist`** (variable) ou **`IBM Plex Sans`** | Tight tracking, poids 600-700 |
| **H2-H4** | Geist | 500-600 |
| **Body** | Geist | 16px, line-height 1.7 |
| **Mono / code / terminal** | **`Geist Mono`** ou **`JetBrains Mono`** ou **`Berkeley Mono`** | 14px, ligatures off (cohérent avec un vrai terminal) |
| **UI mono (badges, métadonnées)** | Geist Mono | 12-13px, uppercase tracking-wide pour `RELEASE`, `v0.3.67` |

Tout chargé via `@fontsource` ou Google Fonts auto-self-host via Vite plugin.

### 7.3 Layout & spacing

- **Grid max-width** : 1280px content, 1440px full-bleed sections
- **Gutter** : 24px desktop / 16px mobile
- **Spacing scale** : 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 (Tailwind par défaut)
- **Sections** : padding vertical 96px desktop / 64px mobile
- **Bordures** : 1px partout (jamais 2px+, sauf focus ring)
- **Border-radius** : 4-6px max (jamais arrondi extrême). Boutons pill OK pour `Install` uniquement.
- **Shadows** : interdites sauf focus-visible (vert glow brand)

### 7.4 Composants signature

| Composant | Style |
|-----------|-------|
| **Terminal block** | Header avec 3 ronds macOS rouge/jaune/vert (`#ff5f57`, `#febc2e`, `#28c840`), title bar `free-coding-models`, body `--bg-elevated`, prompt `$` en `--brand` |
| **CTA primaire** | Fond `--brand`, texte `#0a0a0a`, padding 12px 24px, font-weight 600, hover : `--brand-hover` + très léger scale 1.01 |
| **CTA secondaire** | Border `--border-emphasis`, fond transparent, texte `--text-primary`, hover : `--bg-subtle` |
| **Code inline** | Fond `--bg-subtle`, border `--border-subtle`, padding 2px 6px, font-mono |
| **Comparison table** | Lignes stripées `--bg-base` / `--bg-subtle`, `✓` en `--brand`, `—` en `--text-muted`, colonne FCM avec border-left `--brand` |
| **Feature card** | Border `--border-default`, padding 32px, numéro `01 /` en mono `--text-muted`, titre H3, body `--text-secondary` |
| **Tier badge** | Pill mono uppercase, fond couleur tier à 15% alpha, bordure couleur tier à 40%, texte couleur tier plein |
| **Provider logo** | Grayscale 100% par défaut, transition 200ms vers couleur au hover |

### 7.5 Animations & motion

**Règles façon herdr** : motion **discret**, fonctionnel, jamais décoratif.

- Fade-in subtil au scroll (Intersection Observer + `opacity 0→1` + `translateY 8px→0`, 400ms ease-out, **une seule fois**)
- Hover boutons : 150ms ease-out
- Hover logos providers : grayscale → couleur 250ms
- Terminal animé (hero) : typing effect simulé via CSS steps + variable visibility
- Pas de parallax. Pas de scroll-jacking. Pas d'auto-rotate carousel.

### 7.6 Iconographie

- **Lucide React** pour les icônes UI (search, copy, arrow, github, discord) — toujours monochrome `--text-secondary`
- **Émojis natifs** uniquement dans le contenu MDX (docs, blog) — pas dans la chrome UI
- **Logos providers** : SVG, monochrome par défaut, couleur au hover
- **Pas de favicon générique** — créer un favicon mono `[▣]` ou un mini logo en SVG

### 7.7 Theme switcher (3 modes comme le TUI)

- `Auto` (suit `prefers-color-scheme`) → défaut
- `Dark` (forcé)
- `Light` (forcé)
- Toggle dans la nav, persisté via `localStorage`
- Easter egg : taper `G` au clavier (comme dans le TUI) cycle aussi le thème 😉

---

## 8. 🚀 SEO & Performance

### 8.1 SEO

- `<title>` unique par page, max 60 chars
- `<meta description>` 150-160 chars
- **Open Graph image** dynamique par page (Vercel `@vercel/og`) :
  - Landing → headline + screenshot TUI
  - Docs page → titre + breadcrumb
- **Schema.org** `SoftwareApplication` + `BreadcrumbList`
- `sitemap.xml` auto-généré
- `robots.txt` permissif
- Canonical URLs
- `npm.io` / `socket.dev` / `snyk.io` cross-links
- Mots-clés cibles : *free coding LLM*, *free API LLM models*, *AI coding CLI*, *opencode router*, *NVIDIA NIM free*, *Groq free*, *Cerebras free*, *Kimi K2 free*, *DeepSeek V3 free*

### 8.2 Performance

- **Core Web Vitals cibles** : LCP < 1.5s · INP < 200ms · CLS < 0.05
- Lighthouse > 95 partout
- Images : `next/image` avec AVIF + WebP + sizes
- Pas de JS bloquant sur la landing (Server Components partout sauf interactifs)
- Cache Components Next.js 16 pour `/providers` et `/models` (ISR `revalidate: 3600`)
- Preload demo `<video>` poster
- Fonts : `next/font` avec `display: swap`

### 8.3 Accessibilité

- WCAG AA min, AAA visé sur les CTA
- Contraste ratio testé sur dark/light
- Tous les interactifs accessibles clavier
- `aria-label` sur les icônes seules
- Focus visible (cohérent avec le ton « readable everywhere » du TUI)
- Pas de carousel auto-play sans pause

---

## 9. 🛠️ Architecture technique — TanStack Start

```
website/
├── app/
│   ├── routes/                       # File-based routing (TanStack Router)
│   │   ├── __root.tsx                # Root layout : nav, footer, theme provider
│   │   ├── index.tsx                 # Landing /
│   │   ├── providers.tsx             # /providers
│   │   ├── models.tsx                # /models
│   │   ├── tools.tsx                 # /tools
│   │   ├── changelog.tsx             # /changelog
│   │   ├── security.tsx              # /security
│   │   ├── about.tsx                 # /about
│   │   ├── docs/
│   │   │   ├── route.tsx             # Layout docs (sidebar + ToC)
│   │   │   ├── index.tsx             # /docs landing
│   │   │   └── $slug.tsx             # /docs/[slug] dynamic MDX
│   │   ├── blog/
│   │   │   ├── route.tsx             # Layout blog
│   │   │   ├── index.tsx             # /blog index
│   │   │   ├── $slug.tsx             # /blog/[slug] post
│   │   │   ├── tag.$tag.tsx          # /blog/tag/[tag]
│   │   │   └── feed[.]xml.ts         # /blog/feed.xml (RSS)
│   │   ├── og/$.tsx                  # /og/* — OG image generation (satori)
│   │   ├── sitemap[.]xml.ts          # /sitemap.xml
│   │   └── api/
│   │       ├── stars.ts              # GitHub stars (server fn, cache 1h)
│   │       ├── npm-version.ts        # npm version (server fn, cache 1h)
│   │       └── downloads.ts          # npm downloads/week
│   ├── server/                       # Server-only utilities
│   │   ├── mdx.ts                    # MDX loader + Shiki transform
│   │   ├── blog.ts                   # Blog index + frontmatter validation (zod)
│   │   ├── docs.ts                   # Read docs/*.md from parent repo
│   │   ├── sources.ts                # Parse sources.js (ESM dynamic import)
│   │   ├── changelog.ts              # Parse CHANGELOG.md
│   │   └── github.ts                 # GitHub API helpers
│   ├── components/
│   │   ├── nav.tsx
│   │   ├── footer.tsx
│   │   ├── hero.tsx
│   │   ├── terminal.tsx              # Terminal block component (header + body)
│   │   ├── install-block.tsx         # Copy-to-clipboard
│   │   ├── feature-pillar.tsx        # Numbered card 01/02/03/04
│   │   ├── comparison-table.tsx
│   │   ├── provider-table.tsx        # /providers interactive table
│   │   ├── model-table.tsx           # /models virtualized table
│   │   ├── tool-grid.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── search.tsx                # Pagefind binding
│   │   ├── code-block.tsx            # Shiki-rendered code block + copy btn
│   │   └── mdx/                      # Custom MDX components
│   │       ├── callout.tsx
│   │       ├── kbd.tsx
│   │       ├── provider-card.tsx
│   │       ├── tier-badge.tsx
│   │       ├── flag-table.tsx
│   │       ├── release-header.tsx
│   │       └── section.tsx
│   ├── lib/
│   │   ├── theme.ts                  # next-themes-like, custom for TanStack
│   │   ├── reading-time.ts
│   │   ├── slugify.ts
│   │   └── utils.ts
│   ├── styles/
│   │   ├── globals.css               # Tailwind base + custom CSS vars
│   │   └── prose.css                 # Typography for docs/blog MDX
│   ├── client.tsx                    # TanStack Start client entry
│   ├── ssr.tsx                       # TanStack Start SSR entry
│   ├── router.tsx                    # Router config
│   └── routeTree.gen.ts              # Auto-generated by TanStack Router plugin
├── content/
│   ├── docs/                         # Symlinks ou copies de ../docs/*.md
│   └── blog/
│       ├── 2026-05-17-v0-3-67-...mdx
│       └── ...
├── public/
│   ├── logo.svg                      # Logo monochrome
│   ├── logo-mark.svg                 # Favicon
│   ├── tui-screenshot.webp           # Screenshot hero
│   ├── demo.mp4                      # Réencodé depuis demo.gif (10× plus léger)
│   └── og-default.png
├── scripts/
│   ├── changelog-to-blogpost.mjs     # CI : auto-gen post à chaque release
│   ├── build-pagefind.mjs            # Post-build : index search
│   └── sync-docs.mjs                 # Copie docs/*.md → content/docs/
├── app.config.ts                     # TanStack Start config (Vite + plugins)
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── package.json
└── README.md
```

### 9.1 Décisions clés

- **Mono-repo** ? 🟢 **Sous-dossier `website/`** dans le repo `free-coding-models` (lecture directe de `sources.js`, `CHANGELOG.md`, `docs/`)
- 🟡 Alternative : repo séparé `free-coding-models-website` synchro via git submodule
- 🔴 À éviter : duplication manuelle des docs

### 9.2 Lecture de `sources.js`

- `sources.js` est en ESM → `import()` dynamique au build dans `server/sources.ts`
- Typage en TS : `Provider`, `Model`, `Tier`
- Snapshot au build (SSG) pour `/providers` et `/models`
- Server function avec cache 1h pour les pings dynamiques optionnels

### 9.3 Pipeline MDX (docs + blog)

```
content/docs/*.md  ─┐
content/blog/*.mdx ─┤→ Vite plugin @mdx-js/rollup
                    │   + remark-gfm (tables, autolinks)
                    │   + remark-frontmatter
                    │   + rehype-shiki (syntax highlight)
                    │   + rehype-slug + rehype-autolink-headings
                    │   + custom components
                    └→ React tree → SSR/SSG
```

### 9.4 Server functions clés (TanStack Start)

| Fonction | Cache | Source |
|----------|-------|--------|
| `getGithubStars()` | 1h | api.github.com/repos/vava-nessa/free-coding-models |
| `getNpmVersion()` | 1h | registry.npmjs.org/free-coding-models/latest |
| `getNpmDownloads()` | 6h | api.npmjs.org/downloads/point/last-week |
| `getContributors()` | 24h | api.github.com/repos/.../contributors |
| `getProviders()` | build-time | `../sources.js` |
| `getBlogPosts()` | build-time | `content/blog/*.mdx` |
| `getDocsPages()` | build-time | `content/docs/*.md` |

### 9.5 Pourquoi pas Next.js

- TanStack Start a 95% des features (SSR, SSG, server functions, file routing, middleware, OG, sitemap)
- Vite > Turbopack pour la DX dans ce repo (Vite est déjà familier)
- Pas de RSC complexity dont on n'a pas besoin pour un site marketing
- Le routeur est plus prédictible (zero magic)
- Pas de dépendance Next.js → moins de churn entre majors

---

## 10. 🔄 CI / CD

- **PR previews** : Vercel deploy preview automatique
- **Lighthouse CI** sur chaque PR (action GitHub `treosh/lighthouse-ci-action`)
- **Visual regression** : optionnel, Chromatic ou Percy
- **Link checker** : `lychee` en CI pour éviter les liens cassés vers docs
- **A11y check** : `axe-core` via `@axe-core/playwright`
- **Auto-resync changelog** : sur push de `CHANGELOG.md` → Vercel redeploy (déjà natif)

---

## 11. 🌍 Domaine & infra ✅ DÉCIDÉ

- **Domaine production** : 🟢 **`freecodingmodels.vercel.app`** (gratuit, fourni par Vercel, HTTPS auto)
- **Domaine custom plus tard** (optionnel) : `free-coding-models.dev` ou similaire — pas une priorité, l'URL Vercel est propre et suffisante
- **DNS** : géré par Vercel (rien à faire)
- **CDN** : Vercel Edge Network (inclus)
- **HTTPS** : Let's Encrypt via Vercel (auto)
- **Preview deploys** : `freecodingmodels-git-<branch>-vava-nessa.vercel.app` sur chaque PR
- **Analytics** : Vercel Analytics gratuit pour projet hobby OSS

### Project Vercel
- Owner : Vava-Nessa (compte perso)
- Project name : `freecodingmodels`
- Root directory : `website/`
- Build command : `pnpm install --frozen-lockfile && pnpm build` (depuis `website/`)
- Output directory : `dist/` (TanStack Start default avec preset Vercel)
- Framework preset : **Other** (TanStack Start n'a pas encore de preset officiel, on configure `vinxi/vercel`)
- Install command : `pnpm install --frozen-lockfile`
- Node version : 20.x (LTS)
- Env vars nécessaires :
  - `GITHUB_TOKEN` (optionnel, pour stars/contributors sans rate limit)
  - `PLAUSIBLE_DOMAIN` (si on active Plausible)
  - `RESEND_API_KEY` (Phase 6 newsletter)

---

## 12. 📅 Roadmap (phase par phase)

### Phase 0 — Setup (½ journée)
- [ ] Bootstrap TanStack Start dans `website/` (`npx create-tsrouter-app@latest`)
- [ ] Tailwind v4 + shadcn (adapter Tailwind, copier composants headless)
- [ ] Layout global : `__root.tsx`, nav, footer, theme provider
- [ ] Theme system (Auto/Dark/Light avec localStorage)
- [ ] Geist + Geist Mono fonts self-hosted
- [ ] Deploy Vercel preview
- [ ] Repo wiring : symlink ou script `sync-docs.mjs` pour `../docs/*.md`

### Phase 1 — Landing MVP herdr-style (2-3 jours)
- [ ] Hero (tagline + terminal block animé)
- [ ] Visual demo section (screenshot full-bleed avec glow)
- [ ] Social proof bar (logos outils CLI)
- [ ] Comparison table (LE truc signature)
- [ ] 4 feature pillars numérotés
- [ ] 3 deployment cards (Local / Docker / Daemon)
- [ ] Router section (diagramme ASCII)
- [ ] Provider showcase mini
- [ ] Security badges + final CTA + footer
- [ ] OG image par défaut
- [ ] Deploy production

### Phase 2 — Docs (2-3 jours)
- [ ] MDX pipeline (Vite plugin + remark/rehype)
- [ ] Layout docs (sidebar sticky + ToC droite)
- [ ] Shiki theme Vitesse Dark/Light
- [ ] Composants MDX custom (Callout, Kbd, Terminal, ProviderCard, TierBadge…)
- [ ] Recherche Pagefind (post-build hook)
- [ ] 10 pages docs portées depuis `docs/*.md`
- [ ] « Edit on GitHub » sur chaque page

### Phase 3 — Pages dynamiques (1-2 jours)
- [ ] `/providers` interactif (parse `sources.js` au build)
- [ ] `/models` virtualisé (~170 lignes, `@tanstack/react-virtual`)
- [ ] `/tools` grille avec install commands
- [ ] `/changelog` rendu depuis `CHANGELOG.md` + git log GitHub API

### Phase 4 — Blog (1-2 jours)
- [ ] Routes `/blog`, `/blog/[slug]`, `/blog/tag/[tag]`
- [ ] Frontmatter zod schema + validation au build
- [ ] Layout post (sidebar ToC + body + share)
- [ ] Index liste façon Linear changelog
- [ ] Flux RSS `/blog/feed.xml`
- [ ] OG image générée par post (satori)
- [ ] CI : `changelog-to-blogpost.mjs` auto-commit du release post
- [ ] 3-5 posts initiaux (1 deep-dive « stability score », 1 comparison « free providers in 2026 », 1 tuto setup)

### Phase 5 — Polish (1 jour)
- [ ] Terminal animé hero (typing effect)
- [ ] OG images dynamiques pour chaque doc/blog post
- [ ] Lighthouse > 95 partout
- [ ] A11y audit (axe-core)
- [ ] 404 page custom playful
- [ ] favicon + apple-touch-icon

### Phase 6 — Croissance (continu)
- [ ] i18n (FR pour Vava 🇫🇷 + EN par défaut)
- [ ] Newsletter (Resend ou Loops) → email à chaque release post
- [ ] Sponsors / GitHub Sponsors integration
- [ ] Comparatifs providers récurrents (1× /mois)

---

## 13. ⚠️ Risques & garde-fous

| Risque | Mitigation |
|--------|------------|
| Docs qui dérivent du README/repo | **Single source** = `docs/*.md` lues au build, jamais dupliquées |
| `sources.js` ESM pas importable côté Next | Wrapper `lib/sources.ts` + `dynamic import` fallback |
| Gif lourd (~5-10 MB) | Réencoder en `.mp4` H.265 ou `.webm` AV1 → ~500KB |
| Trop de JS sur la landing | Default Server Component, `'use client'` uniquement copy-button et toggle theme |
| SEO sur mot-clé compétitif | Long-tail keywords : *free Kimi K2 API*, *free DeepSeek V3 coding*, *NVIDIA NIM free tier coding* |
| Coût hébergement | Vercel Hobby gratuit OK pour ce traffic |
| Maintenance | Auto-rebuild sur push `main` → toujours sync avec le repo |

---

## 14. ✅ Definition of Done

Le site est livré quand :
- [ ] Landing déployée sur domaine custom (https)
- [ ] Les 10 pages docs principales portées depuis `docs/*.md`
- [ ] `/providers` et `/models` rendus depuis `sources.js`
- [ ] Lighthouse Performance + SEO + A11y > 90
- [ ] Mobile responsive jusqu'à 360px
- [ ] Dark mode + light mode testés
- [ ] OG image visible quand on partage sur Twitter/Discord/Slack
- [ ] Recherche docs fonctionnelle
- [ ] Lien « Edit on GitHub » sur chaque page docs
- [ ] CHANGELOG.md auto-rendu sur `/changelog`
- [ ] CI passe : link check, a11y, Lighthouse

---

## 15. ✅ Décisions verrouillées + Next actions

### Décisions actées par BAWSS

| # | Sujet | Décision |
|---|-------|----------|
| 1 | **Domaine** | ✅ `freecodingmodels.vercel.app` (gratuit, HTTPS auto, pas de custom domain pour l'instant) |
| 2 | **Repo** | ✅ Sous-dossier `website/` du repo `free-coding-models` |
| 3 | **Portée MVP** | ✅ Phase 1 + 2 + 4 (Landing + Docs + Blog skeleton avec auto-release) |
| 4 | **Hero baseline** | ✅ Wordmark `free-coding-models` + subtitle README *« Find the fastest free coding model in seconds »* — **PAS** de phrase calquée sur herdr |
| 5 | **Auto-blog releases** | ✅ Oui — CI auto-commit `release-vX.Y.Z.mdx` depuis `CHANGELOG.md` |

### Plan d'exécution (3-5 jours selon dispo)

**Sprint 1 — Setup + Landing (Phase 0 + 1) — ~1 jour**
1. `pnpm dlx create-tsrouter-app@latest website -- --tailwind --typescript`
2. Wirer `app.config.ts` (preset Vercel) + Tailwind v4 + Geist/Geist Mono
3. Theme provider (Auto/Dark/Light) + nav + footer
4. Premier deploy preview Vercel
5. Hero + terminal block + dual CTA
6. Visual demo + social proof bar
7. Comparison table + 4 feature pillars
8. 3 deployment cards + Router section + final CTA
9. Push → `freecodingmodels.vercel.app` live

**Sprint 2 — Docs (Phase 2) — ~1-2 jours**
1. Script `scripts/sync-docs.mjs` qui copie `../docs/*.md` → `content/docs/`
2. MDX pipeline (`@mdx-js/rollup` + remark/rehype + Shiki)
3. Layout docs (sidebar + ToC droite)
4. Composants MDX custom (Callout, Kbd, Terminal, ProviderCard, TierBadge…)
5. Pagefind search
6. 10 pages portées + `Edit on GitHub`

**Sprint 3 — Blog + auto-release (Phase 4) — ~1 jour**
1. Routes `/blog`, `/blog/[slug]`, `/blog/tag/[tag]`, `/blog/feed.xml`
2. Frontmatter zod schema
3. Layout post + index façon Linear changelog
4. OG image generation (satori)
5. Script `scripts/changelog-to-blogpost.mjs`
6. GitHub Action qui détecte un bump de `CHANGELOG.md` → génère le post → auto-commit
7. 2-3 posts initiaux (un deep-dive « stability score » + un comparatif « free providers in 2026 » + le release v0.3.67 auto-généré)

**Sprint 4 — Pages dynamiques + Polish (Phase 3 + 5) — ~1 jour**
1. `/providers`, `/models`, `/tools`, `/changelog`
2. OG images dynamiques
3. Lighthouse > 95 + A11y axe-core
4. 404 custom

→ **Prêt à scaffolder dès que tu valides « GO ».**

---

## 16. 🎨 Références d'inspiration

> ⚠️ On s'inspire de **l'aesthetic** (densité, palette, monochrome, typographie, terminal-style), **pas du contenu ni de la structure mot-pour-mot**. FCM doit avoir son **identité propre** : son vert NVIDIA, son ton playful, ses émojis du TUI.

| Site | Ce qu'on PIQUE | Ce qu'on NE COPIE PAS |
|------|----------------|-----------------------|
| [herdr.dev](https://herdr.dev/) | Densité visuelle, monochrome dark, comparison table comme outil de différenciation, logos grayscale → couleur au hover, screenshots full-bleed | Les phrases (« One terminal. The whole herd »), le mascotte cow, les pillars numérotés à 4 (on adapte au contenu FCM) |
| [linear.app/changelog](https://linear.app/changelog) | Format liste minimaliste du blog/changelog, typographie | Le branding |
| [vercel.com/blog](https://vercel.com/blog) | Layout MDX clean, OG images dynamiques | Le ton trop corporate |
| [resend.com](https://resend.com) | Dark mode subtil, accent unique parcimonieux | Le branding |
| [bun.com](https://bun.com) | Developer-first density, monospace partout | Le ton |
| [react.dev](https://react.dev) | Layout docs (sidebar + ToC droite) | Le branding |

---

*Plan rédigé le 2026-05-26 — révisable à tout moment.*
*Stack : **TanStack Start + Vite + Tailwind + shadcn + MDX + Shiki + Pagefind + Vercel***
*Vibe : **terminal-brutalist** inspiré [herdr.dev](https://herdr.dev/)*
