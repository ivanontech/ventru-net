# API Reference

Base URL locally:

```txt
http://localhost:8787
```

LAN demo URL from the M4 Mac:

```txt
http://10.0.0.113:8787
```

## Discovery

### `GET /healthz`

Health check.

### `GET /llms.txt`

Concise LLM-facing overview of the registry.

### `GET /.well-known/agent.json`

Agent manifest describing capabilities and endpoints.

### `GET /.well-known/agent-index.json`

Registry discovery manifest.

### `GET /.well-known/ventru-protocol.json`

Experimental proprietary protocol manifest for Ventru Action Capsules.

### `GET /robots.txt`

Crawler hints with links to `sitemap.xml`, `llms.txt`, and agent manifest.

### `GET /sitemap.xml`

Dynamic sitemap covering homepage, manifests, registry API, and seeded business profiles.

## Registry

### `GET /api/search?q=&location=&category=`

Returns ranked providers.

### `GET /api/businesses`

Returns all businesses.

### `POST /api/businesses`

Creates a business profile.

Required JSON:

```json
{
  "name": "Boca Emergency Plumbing",
  "category": "local_service",
  "summary": "24/7 emergency plumbing in Boca Raton",
  "serviceAreas": ["Boca Raton"],
  "actions": ["request_quote"]
}
```

### `POST /api/intent`

Returns a ranked route plan for a user goal.

```json
{
  "task": "emergency roof leak repair",
  "location": "Palm Beach",
  "budget": 1000,
  "urgency": "today"
}
```

### `POST /api/capsule`

Returns a signed, expiring `signed_action_capsule` with ranked providers, trust policy, commercial disclosure, executable route bodies, receipt template, expiry timestamp, and SHA-256 signature.

```json
{
  "intent": "emergency roof repair palm beach"
}
```

### `GET /.well-known/x402.json`

Machine-readable payment requirements for agents paying for Ventru API usage.

### `GET /api/x402/quote?endpoint=/api/paid/capsule`

Returns the x402 payment requirement for a paid endpoint.

### `POST /api/paid/capsule`

x402-gated Action Capsule endpoint. Without payment proof, returns `402 Payment Required` and an `x-accept-payment` header.

```bash
curl http://localhost:8787/api/paid/capsule \
  -H 'content-type: application/json' \
  -H 'X-PAYMENT: demo-receipt' \
  -d '{"intent":"emergency roof repair palm beach"}'
```

### `POST /api/agent-submit`

Agent-native submission endpoint. Accepts either a website URL to import or a structured business profile. New submissions are marked `pending_verification`.

```json
{
  "url": "openpalmbeach.com",
  "submitted_by": "autonomous_agent"
}
```

### `POST /api/import-url`

Imports a current human website and returns a draft profile.

```json
{
  "url": "https://business.com"
}
```

### `GET /api/businesses/{slug}/agent.json`

Machine-readable provider profile.

### `GET /api/businesses/{slug}/llms.txt`

Concise provider summary for LLM context.

### `POST /api/actions/{slug}/{action}`

Stub quote/book/pay action endpoint. Currently returns `accepted_stub`; next step is CRM/payment/calendar integration.
