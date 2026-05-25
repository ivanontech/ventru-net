# Ventru Agentic Internet Standards Implementation Plan

> **For Hermes:** Execute directly with TDD-style source tests and smoke checks.

**Goal:** Extend Ventru.net from an agent-ready directory/protocol demo into a fuller agentic internet bridge: free personal verification, paid business verification, identity manifests, and agent-to-agent message envelopes.

**Architecture:** Keep the existing Node HTTP server and static frontend. Add pure builder functions first, cover them with node:test, then expose JSON endpoints and visible homepage sections. Preserve existing endpoints and compatibility aliases.

**Tech Stack:** Node.js ESM, node:test, static HTML/CSS/JS.

---

### Task 1: Add free personal verification and paid business/LLC plans

- Modify `src/server.js` `buildVerificationPlans()`.
- Add a `personal_free` plan priced at $0 for people, creators, agents, researchers, portfolios, blogs, and open-source projects.
- Keep business/LLC plans paid.
- Add policy language: people verify free; commercial/business/LLC profiles pay to become trusted routes.
- Update tests in `test/server.test.js`.

### Task 2: Add Vetru identity object and endpoint

- Add `buildVetruIdentity()` pure function.
- Expose `GET /.well-known/vetru.json` and `GET /api/identity`.
- Include identity, trust, search, capsules, outcome, payments, and communication endpoints.
- Update OpenAPI and sitemap/manifests.

### Task 3: Add agent-to-agent message envelope

- Add `buildAgentMessageEnvelope()` pure function.
- Expose `POST /api/messages`.
- Envelope fields: sender, recipient, intent, action, trust_requirements, budget, deadline, user_consent, response_schema, expiry, signature.
- Add MCP/agent manifest references.

### Task 4: Update frontend narrative

- Update homepage copy around verification to explicitly say: Free for people, paid for businesses/LLCs.
- Add a visible Agent-to-Agent communication section and demo form/result.
- Add API links for `/.well-known/vetru.json`, `/api/identity`, and `/api/messages`.
- Wire `app.js` form handler.

### Task 5: Docs, tests, smoke

- Add/update docs for Ventru identity and agent messaging.
- Run `npm test`.
- Run local server smoke with curl.
- Commit changes.
