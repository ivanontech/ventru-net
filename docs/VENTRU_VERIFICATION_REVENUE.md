# Ventru.net Verification Revenue Rail

## Core thesis

Agents will route money and attention toward providers they can trust, call, pay, and verify. Ventru.net should make discovery free, then monetize the business side when companies want to claim, verify, improve AgentRank eligibility, and receive higher-intent agent traffic.

```txt
Agents populate the index.
Businesses claim the value.
Agents get better routes.
Ventru captures the routing and verification fee.
```

## No-sales organic loop

1. Agent browses a normal website.
2. Agent sees no `agent.json`, no `llms.txt`, no action endpoint, no x402 rail.
3. Agent calls `POST /api/discover` / WebProbe.
4. Ventru returns missing rails and a draft profile.
5. Agent submits the business through `POST /api/agent-submit`.
6. Ventru publishes a pending profile with hosted `agent.json` and `llms.txt`.
7. Business starts receiving agent-originated leads or sees itself in search.
8. Business claims the profile through DNS / `.well-known` verification.
9. Business pays to verify, improve trust signals, and become Action Capsule eligible.
10. Outcome telemetry improves rankings, making agents prefer Ventru more.

## Paid verification products

### 1. Claimed Profile — $49/mo

Buyer: small business that wants control of its pending profile.

Includes:

- domain ownership badge
- editable profile
- hosted `agent.json`
- hosted `llms.txt`
- basic monthly freshness check
- claim/contact routing

Why they pay: they are already being indexed and want control over how agents describe/contact them.

### 2. Verified TrustGraph — $199/mo + $299 setup

Buyer: local services, professionals, clinics, financial/crypto services, agencies.

Includes:

- domain verification
- business identity review
- license/insurance fields
- verified badge
- AgentRank eligibility boost
- lead attribution dashboard
- higher trust in capsules/search

Why they pay: agents and users choose verified providers when money, safety, time, or liability is involved.

### 3. Action-Ready Provider — $499/mo + $1,000 setup

Buyer: businesses that want agents to quote, book, reserve, request support, or pay directly.

Includes:

- Verified TrustGraph
- callable action endpoints
- Action Capsule eligibility
- x402/payment metadata
- CRM/webhook routing
- receipt + outcome telemetry
- lead/action attribution

Why they pay: this turns agent discovery into real inbound workflow and revenue.

### 4. Network / Enterprise — $2,500+/mo + $5,000+ setup

Buyer: franchises, marketplaces, service networks, vertical SaaS, agencies.

Includes:

- bulk provider import
- custom trust policy
- SLA/freshness monitoring
- API access
- sponsored placement disclosure
- custom settlement rules
- analytics and volume pricing

Why they pay: they need many locations/providers to become agent-accessible at once.

## Additional transaction economics

- Agent lead fees: $5–$50 depending on vertical and urgency.
- Routed action fees: 1–5% where legal/contractually allowed.
- Paid capsule API usage: x402 micro-fees per capsule/API call.
- Sponsored visibility: allowed only with explicit commercial disclosure and separated from organic AgentRank.
- Verification refresh fees: annual or quarterly re-checks for licenses, insurance, SLA, and ownership.

## Verification workflow

```txt
pending profile → claim request → domain proof → paid tier → human/automated review → verified TrustGraph → Action Capsule eligibility → ongoing telemetry
```

Technical proof methods:

- DNS TXT: `ventru-verify=<token>`
- HTTPS file: `/.well-known/ventru-verify.txt`
- optional business documents for regulated/high-risk categories
- optional license/insurance API checks where available

Endpoint:

```txt
GET /api/verify/{slug}/challenge
POST /api/verify/{slug}/check
GET /api/verification-plans
```

## Why verification is the business model

Search engines monetized attention. Marketplaces monetized demand. Ventru monetizes trust/action-readiness for agents.

The pitch to businesses:

> AI agents are becoming buyers, assistants, and routers. If your company is not verified and action-ready, agents will route around you. Ventru makes your business legible, trusted, callable, and payable by the agentic internet.

## Guardrails

- Do not sell fake trust. Verification must mean something.
- Do not secretly sell rank. Sponsored placement needs disclosure.
- Do not let unverified profiles look verified.
- Do not store private keys or payment secrets in profiles.
- Do not make verified status permanent; freshness and outcome data should decay.
