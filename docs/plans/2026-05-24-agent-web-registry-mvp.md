# Ventru.net Registry MVP Implementation Plan

**Goal:** Build the first working prototype of an agent-readable business registry: landing page, machine-readable profile format, profile generator, search API, and MCP/OpenAPI discovery placeholders.

**Architecture:** Zero-dependency Node.js HTTP server serving static frontend files and JSON APIs backed by a local JSON database. This keeps the MVP deployable anywhere while Delist/Ivan decide final name/domain.

**Tech Stack:** Node.js 22, native `http`, `node:test`, static HTML/CSS/JS, JSON schema-ish profile format.

**Done Looks Like:** `npm test` passes, server boots, homepage loads, `/api/search`, `/api/businesses`, `/api/businesses/:slug/agent.json`, `/api/businesses/:slug/llms.txt`, and `/.well-known/agent-index.json` return valid responses.

---

## Build Steps

1. Scaffold package, server, public frontend, seed data, and tests.
2. Implement profile normalization, validation, search scoring, agent.json generation, and llms.txt generation.
3. Implement landing page explaining “Google for AI agents” and a live profile generator.
4. Verify with tests and curl smoke checks.
5. Keep branding neutral: use `Ventru.net Registry` until business name/domain is chosen.
