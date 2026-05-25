const form = document.querySelector('#profile-form');
const result = document.querySelector('#result');
const importForm = document.querySelector('#import-form');
const importResult = document.querySelector('#import-result');
const searchForm = document.querySelector('#search-form');
const searchResults = document.querySelector('#search-results');
const agentSubmitForm = document.querySelector('#agent-submit-form');
const agentSubmitResult = document.querySelector('#agent-submit-result');
const discoverForm = document.querySelector('#discover-form');
const discoverResult = document.querySelector('#discover-result');
const outcomeForm = document.querySelector('#outcome-form');
const outcomeResult = document.querySelector('#outcome-result');
const messageForm = document.querySelector('#message-form');
const messageResult = document.querySelector('#message-result');
const inboxForm = document.querySelector('#inbox-form');
const inboxResult = document.querySelector('#inbox-result');
const capsuleForm = document.querySelector('#capsule-form');
const capsuleResult = document.querySelector('#capsule-result');
const themeToggle = document.querySelector('#theme-toggle');
const REMOTE_API_BASE = 'https://ventru.net';
const API_BASE = ['ivanontech.github.io'].includes(window.location.hostname) ? REMOTE_API_BASE : '';

function apiPath(path) {
  return `${API_BASE}${path}`;
}

function rewriteApiLinks() {
  if (!API_BASE) return;
  document.querySelectorAll('a[href^="/api/"], a[href^="/profiles/"]').forEach((link) => {
    const href = link.getAttribute('href');
    link.setAttribute('href', apiPath(href));
  });
}

rewriteApiLinks();

function csv(value) {
  return value.split(',').map((item) => item.trim()).filter(Boolean);
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char]);
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('ventru-theme', theme);
  if (themeToggle) themeToggle.textContent = theme === 'dark' ? 'Light' : 'Dark';
}

setTheme(localStorage.getItem('ventru-theme') || 'light');
themeToggle?.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

function renderResults(results = []) {
  if (!searchResults) return;
  if (!results.length) {
    searchResults.innerHTML = '<div class="result-empty">No matches yet. Try roofing, wallet, GPU, Palm Beach, or Remote.</div>';
    return;
  }
  searchResults.innerHTML = results.map((business) => `
    <article class="result-card">
      <div class="result-meta">
        <span class="pill">${escapeHtml(business.category)}</span>
        <span class="pill">score ${escapeHtml(business.score)}</span>
        ${business.trust?.verified ? '<span class="pill">verified</span>' : '<span class="pill">pending</span>'}
      </div>
      <h3>${escapeHtml(business.name)}</h3>
      <p>${escapeHtml(business.description || business.summary || '')}</p>
      <p>${escapeHtml((business.serviceAreas || []).join(', ') || 'No service area listed')}</p>
      <div class="result-links">
        <a href="${apiPath(`/api/providers/${encodeURIComponent(business.id || business.slug)}/agent.json`)}">agent.json</a>
        <a href="${apiPath(`/api/providers/${encodeURIComponent(business.id || business.slug)}/llms.txt`)}">llms.txt</a>
      </div>
    </article>
  `).join('');
}

async function runSearch(event) {
  event?.preventDefault();
  if (!searchResults || !searchForm) return;
  const data = new FormData(searchForm);
  const params = new URLSearchParams();
  if (data.get('q')) params.set('q', data.get('q'));
  if (data.get('location')) params.set('location', data.get('location'));
  searchResults.innerHTML = '<div class="result-empty">Searching Ventru...</div>';
  const response = await fetch(apiPath(`/api/search?${params}`));
  const body = await response.json();
  renderResults(body.results || []);
}

searchForm?.addEventListener('submit', runSearch);
runSearch();


discoverForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(discoverForm);
  discoverResult.textContent = 'Running Ventru WebProbe...';
  try {
    const response = await fetch(apiPath('/api/discover'), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ url: data.get('url'), intent: data.get('intent') || 'evaluate agent readiness' })
    });
    const body = await response.json();
    discoverResult.textContent = JSON.stringify(body, null, 2);
  } catch (error) {
    discoverResult.textContent = JSON.stringify({ ok: false, error: error.message }, null, 2);
  }
});

capsuleForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(capsuleForm);
  capsuleResult.textContent = 'Generating signed Action Capsule...';
  try {
    const response = await fetch(apiPath('/api/capsule'), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        intent: data.get('intent'),
        budget: Number(data.get('budget') || 0),
        urgency: data.get('urgency') || 'normal'
      })
    });
    const body = await response.json();
    capsuleResult.textContent = JSON.stringify(body, null, 2);
  } catch (error) {
    capsuleResult.textContent = JSON.stringify({ ok: false, error: error.message }, null, 2);
  }
});

outcomeForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(outcomeForm);
  outcomeResult.textContent = 'Reporting signed outcome telemetry...';
  try {
    const response = await fetch(apiPath('/api/outcome'), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        capsule_id: data.get('capsule_id'),
        provider: data.get('provider'),
        action: data.get('action'),
        status: data.get('status') || 'completed',
        response_time_seconds: 120,
        user_satisfied: true,
        agent: 'browser_demo_agent'
      })
    });
    const body = await response.json();
    outcomeResult.textContent = JSON.stringify(body, null, 2);
  } catch (error) {
    outcomeResult.textContent = JSON.stringify({ ok: false, error: error.message }, null, 2);
  }
});

messageForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(messageForm);
  messageResult.textContent = 'Creating signed agent-to-agent thread message...';
  try {
    const response = await fetch(apiPath('/api/messages'), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        type: 'quote_request',
        from: {
          name: 'Ventru.net Agent',
          domain: data.get('from_domain') || 'ventru.net',
          endpoint: `${window.location.origin}/api/messages`
        },
        to: {
          name: 'Recipient Agent',
          domain: data.get('to_domain') || 'cryptoia.ai',
          handle: data.get('to_handle') || undefined
        },
        payload: {
          intent: data.get('intent'),
          budget: Number(data.get('budget') || 0),
          request: 'Reply with POST /api/messages/:id/reply or poll /api/messages/inbox?domain=your-domain'
        },
        relatesTo: {},
        expiresAt: new Date(Date.now() + 1000 * 60 * 60).toISOString()
      })
    });
    const body = await response.json();
    messageResult.textContent = JSON.stringify(body, null, 2);
  } catch (error) {
    messageResult.textContent = JSON.stringify({ ok: false, error: error.message }, null, 2);
  }
});

inboxForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(inboxForm);
  const domain = data.get('domain') || 'cryptoia.ai';
  inboxResult.textContent = `Polling ${domain} inbox...`;
  try {
    const response = await fetch(apiPath(`/api/messages/inbox?domain=${encodeURIComponent(domain)}`));
    const body = await response.json();
    inboxResult.textContent = JSON.stringify(body, null, 2);
  } catch (error) {
    inboxResult.textContent = JSON.stringify({ ok: false, error: error.message }, null, 2);
  }
});

agentSubmitForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(agentSubmitForm);
  agentSubmitResult.textContent = 'Agent submitting site to Ventru...';
  try {
    const response = await fetch(apiPath('/api/agent/submit'), {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-payment': 'demo-agent-submission-receipt' },
      body: JSON.stringify({
        url: data.get('url'),
        submitted_by: data.get('submitted_by') || 'browser_agent'
      })
    });
    const body = await response.json();
    agentSubmitResult.textContent = JSON.stringify(body, null, 2);
    if (body.ok) runSearch();
  } catch (error) {
    agentSubmitResult.textContent = JSON.stringify({ ok: false, error: error.message }, null, 2);
  }
});

importForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(importForm);
  importResult.textContent = 'Importing website and drafting agent profile...';
  try {
    const response = await fetch(apiPath('/api/import-site'), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ url: data.get('url') })
    });
    const body = await response.json();
    importResult.textContent = JSON.stringify(body, null, 2);

    if (body.ok && body.draft && form) {
      form.elements.name.value = body.draft.name || '';
      form.elements.category.value = body.draft.category || '';
      form.elements.summary.value = body.draft.summary || '';
      form.elements.serviceAreas.value = (body.draft.serviceAreas || []).join(', ');
      form.elements.actions.value = (body.draft.actions || []).join(', ');
      form.elements.paymentMethods.value = (body.draft.paymentMethods || []).join(', ');
      document.querySelector('#generator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } catch (error) {
    importResult.textContent = JSON.stringify({ ok: false, error: error.message }, null, 2);
  }
});

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const payload = {
    name: data.get('name'),
    category: data.get('category'),
    summary: data.get('summary'),
    serviceAreas: csv(data.get('serviceAreas') || ''),
    actions: csv(data.get('actions') || 'request_quote'),
    paymentMethods: csv(data.get('paymentMethods') || 'card, x402'),
    services: [{ name: 'Initial consultation', priceMin: 0, priceMax: 250, unit: 'consult' }],
    trust: { verified: false, rating: 0, reviewCount: 0, responseSlaMinutes: 1440 },
    agentContact: { email: '' }
  };

  result.textContent = 'Creating profile...';
  const response = await fetch(apiPath('/api/businesses'), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const body = await response.json();
  result.textContent = JSON.stringify(body, null, 2);
  if (body.ok) runSearch();
});
