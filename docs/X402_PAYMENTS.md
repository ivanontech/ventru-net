# Ventru.net x402 Payments

Ventru should be agent-first. Agents need to discover price, pay for API usage, and receive machine-native results without a sales call.

## MVP endpoints

- `GET /.well-known/x402.json` — payment manifest for paid Ventru resources.
- `GET /api/x402/quote?endpoint=/api/paid/capsule` — quote a specific endpoint.
- `GET /api/x402/status` — demo facilitator/status endpoint.
- `POST /api/paid/capsule` — paid Action Capsule endpoint.

## Demo behavior

`POST /api/paid/capsule` returns `402 Payment Required` until the agent sends either:

```txt
X-PAYMENT: <receipt>
```

or:

```txt
X402-PAYMENT: <receipt>
```

Production should verify the receipt with an x402 facilitator before returning paid resources. The MVP intentionally accepts any non-empty payment header so the agent flow can be demonstrated locally.

## Example

```bash
curl -i http://localhost:8787/api/paid/capsule \
  -H 'content-type: application/json' \
  -d '{"intent":"emergency roof repair palm beach"}'
```

Returns `402` plus `x-accept-payment` metadata.

```bash
curl http://localhost:8787/api/paid/capsule \
  -H 'content-type: application/json' \
  -H 'X-PAYMENT: demo-receipt' \
  -d '{"intent":"emergency roof repair palm beach"}'
```

Returns a signed Action Capsule plus a demo `payment_receipt`.

## Strategy

Use x402 for:

- paid API calls and capsule generation;
- agent submission review fees;
- routed provider lead/action fees;
- future settlement attribution inside Action Capsules.
