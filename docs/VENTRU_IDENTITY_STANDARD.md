# Ventru Identity Standard

Ventru.net exposes a canonical identity manifest for the agentic internet:

```txt
GET /.well-known/ventru.json
GET /api/identity
```

## Purpose

Ventru is not only a search page. It is a bridge from the old human web into agent-native infrastructure:

```txt
Old Web → WebProbe → Ventru Profile → TrustGraph → AgentRank → Action Capsule → Outcome API → Agent-to-Agent Message
```

The identity manifest tells agents what Ventru is, what primitives it supports, how verification works, and which endpoints are safe to call.

## Verification policy

```txt
People verify free.
Businesses and LLCs pay for commercial verification/action routing.
```

Free personal verification exists for individuals, portfolios, creators, researchers, developers, blogs, open-source projects, and noncommercial agents.

Paid commercial verification exists for businesses, LLCs, funds, agencies, clinics, contractors, SaaS companies, ecommerce businesses, marketplaces, and professional services that want trusted routing, AgentRank eligibility, leads, Action Capsules, payment metadata, and outcome dashboards.

## Endpoint family

- `GET /.well-known/ventru.json` — canonical identity manifest.
- `GET /.well-known/agent.json` — compatibility agent manifest.
- `GET /llms.txt` — LLM-readable operating instructions.
- `POST /api/discover` — WebProbe for old websites.
- `POST /api/capsule` — signed Action Capsules.
- `POST /api/outcome` — outcome telemetry receipts.
- `POST /api/messages` — signed agent-to-agent messages.
- `GET /api/verification-plans` — free/premium verification policy.
