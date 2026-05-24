# Ventru.net Agentic Backend

Ventru.net is no longer just a human-facing website or directory. The backend is the product: a routing, trust, payment, capsule, and outcome layer for autonomous agents.

## Live loop

```txt
Ventru Discovery → Ventru Search → Ventru TrustGraph → AgentRank → Action Capsule → x402 Rail → Outcome API → Memory/Telemetry
```

## Core services

- `POST /api/discover` — Ventru WebProbe. Probes a normal website for agent-readable signals and drafts a profile if the site is not agent-ready.
- `GET /api/search` — human/agent searchable provider index.
- `GET /api/verify/{slug}/challenge` — domain ownership challenge using DNS TXT or `.well-known` proof.
- `POST /api/intent` — lower-level ranked route plan for an agent task.
- `POST /api/capsule` — signed, expiring Action Capsule with route bodies and receipt template.
- `GET /.well-known/x402.json` — machine-readable payment requirements.
- `POST /api/paid/capsule` — demo x402-gated paid capsule endpoint.
- `POST /api/outcome` — signed outcome telemetry receipt so routing improves from real agent results.
- `GET /.well-known/mcp.json` — MCP-style tool manifest for agents.
- `GET /.well-known/ai-plugin.json` — AI plugin compatibility manifest.

## Do we need a server?

Yes. Static files can sell the idea, but the actual company needs a real backend because agents need dynamic operations:

- fetch/probe websites
- issue fresh verification challenges
- score/rank providers
- create short-lived Action Capsules
- verify payment receipts
- accept outcome telemetry
- rate-limit and audit API calls
- store provider profiles, trust proofs, and ranking history

MVP can run as a Node server. Production should be:

- HTTPS behind Cloudflare or equivalent WAF/CDN
- Postgres for providers, verification, capsules, outcomes, and billing records
- Redis/queue for crawling/import jobs
- object storage for proofs/receipts
- secrets manager for signing keys
- structured audit logs
- rate limits and API keys for agent clients

## Security stance

### SHA-256 vs signatures

SHA-256 by itself is only a digest. It proves data did not accidentally change if the digest is trusted, but it does **not** prove who issued the data.

For the MVP Ventru uses HMAC-SHA-256:

```txt
signature = HMAC_SHA256(secret, stable_json_payload)
```

That is materially better than a raw hash because only the holder of the secret can mint valid capsules/receipts.

### Production signing

For production, move from shared-secret HMAC to public/private-key signing:

- Ed25519 for normal modern signatures
- publish public keys at `/.well-known/ventru-keys.json`
- rotate keys with `kid` key IDs
- include `issued_at`, `expires_at`, `nonce`, `audience`, and canonical payload hash

### Quantum-resistant path

Quantum-resistant signatures are not necessary for the first demo, but the protocol should be designed for agility.

Recommended path:

- Now: HMAC-SHA-256 for MVP demo capsules and outcome receipts.
- Production v1: Ed25519 signatures with key IDs and rotation.
- Future/high-assurance: hybrid signatures such as Ed25519 + ML-DSA/Dilithium once ecosystem tooling is stable.

Do not replace SHA-256 with a random exotic hash. The stronger move is signature design, key management, expiry, replay protection, and payment/identity verification.

## Production hardening checklist

- Enforce HTTPS only.
- Store signing secrets outside code/env files in a secrets manager.
- Add API keys/OAuth for write endpoints.
- Rate-limit `/api/discover`, `/api/capsule`, `/api/paid/capsule`, and `/api/outcome`.
- Validate x402 receipts with a real facilitator before serving paid resources.
- Verify DNS TXT or HTTPS `.well-known` proof before setting `trust.verified=true`.
- Add nonces to capsules to prevent replay.
- Add capsule audience/client binding for high-value actions.
- Persist outcome telemetry in append-only audit logs.
- Separate sponsored ranking from organic AgentRank with commercial disclosure.
