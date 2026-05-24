# Cloudflare hosting for Ventru.net

Ventru.net currently runs as a Node HTTP app with live API routes and local JSON storage. That means the fastest safe way to put the full site on `ventru.net` is:

```txt
Cloudflare DNS + SSL + Tunnel → Node origin running on port 8787
```

This keeps every live endpoint working now:

- `/`
- `/docs.html`
- `/api/search`
- `/api/capsule`
- `/api/paid/capsule`
- `/api/discover`
- `/api/outcome`
- `/.well-known/agent.json`
- `/.well-known/ventru-protocol.json`
- `/openapi.json`

## Prerequisites

1. Own/control `ventru.net`.
2. Add `ventru.net` to Cloudflare.
3. Point the registrar nameservers to the two Cloudflare nameservers.
4. Install Cloudflare Tunnel on the origin machine:

```bash
brew install cloudflared
# or download from https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/
```

5. Start Ventru locally:

```bash
cd /Users/warrenbaum/Projects/agent-web-registry
PORT=8787 npm start
curl http://127.0.0.1:8787/healthz
```

Expected health response:

```json
{
  "ok": true,
  "service": "ventru-net",
  "version": "0.1.0"
}
```

## Create the tunnel

Authenticate Cloudflare:

```bash
cloudflared tunnel login
```

Create a named tunnel:

```bash
cloudflared tunnel create ventru-net
```

Cloudflared will print a tunnel UUID and create a credentials file under `~/.cloudflared/`.

## Configure ingress

Create `~/.cloudflared/ventru-net.yml`:

```yaml
tunnel: YOUR_TUNNEL_UUID
credentials-file: /Users/warrenbaum/.cloudflared/YOUR_TUNNEL_UUID.json

ingress:
  - hostname: ventru.net
    service: http://localhost:8787
  - hostname: www.ventru.net
    service: http://localhost:8787
  - service: http_status:404
```

## Route DNS

```bash
cloudflared tunnel route dns ventru-net ventru.net
cloudflared tunnel route dns ventru-net www.ventru.net
```

In Cloudflare DNS, both hostnames should become proxied CNAMEs to the tunnel.

## Run as a service

For macOS:

```bash
cloudflared service install --config /Users/warrenbaum/.cloudflared/ventru-net.yml
```

If service install does not honor `--config`, use a LaunchAgent plist that runs:

```bash
cloudflared tunnel --config /Users/warrenbaum/.cloudflared/ventru-net.yml run ventru-net
```

## Cloudflare dashboard settings

Recommended defaults:

- SSL/TLS mode: `Full`
- Always Use HTTPS: `On`
- Automatic HTTPS Rewrites: `On`
- Brotli: `On`
- Caching: standard/default for dynamic app; do not aggressively cache `/api/*` yet
- WAF: enable managed rules, but avoid blocking JSON POSTs to `/api/*`

## Verify production

```bash
curl https://ventru.net/healthz
curl https://ventru.net/.well-known/agent.json
curl https://ventru.net/.well-known/ventru-protocol.json
curl -X POST https://ventru.net/api/capsule \
  -H 'content-type: application/json' \
  -d '{"intent":"emergency roof repair palm beach","budget":1000,"urgency":"today"}'
```

## Later: fully serverless Cloudflare Workers

Tunnel is the fastest way to go live because the current app uses Node's HTTP server and writes to local JSON. A full Workers deployment should come later:

1. Convert the server handler from Node `req/res` to the Fetch API.
2. Move `data/businesses.json` to D1 or KV.
3. Move any generated files to R2 if needed.
4. Deploy with Wrangler.
5. Bind `ventru.net` to the Worker route.

That architecture is more scalable, but it is a bigger refactor. Tunnel gets the full MVP online today.
