/**
 * ==============================================================================
 * ⚡ MIKAIL BACKEND STUDIO - CLIENT JAVASCRIPT
 * ==============================================================================
 * Mengelola seluruh interaksi UI, request HTTP ke backend Express,
 * visualisasi alur pipeline, dan real-time Server-Sent Events (SSE) terminal.
 * ==============================================================================
 */

// State Global
let currentAuthToken = localStorage.getItem('backend_demo_token') || '';
let totalLogsCount = 0;

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initSSE();
  initStatsPoller();
  initPipelineVisualizer();
  initCrudLab();
  initAnatomyLab();
  initMiddlewareLab();
  initGuideTabs();
  initHeaderActions();
  
  // Initial data load
  fetchItems();
});

/* ==========================================================================
   1. TAB SWITCHER LOGIC
   ========================================================================== */
function initTabs() {
  const tabButtons = document.querySelectorAll('.nav-tab');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTabId = button.getAttribute('data-tab');

      // Update button state
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Update panel visibility
      tabPanels.forEach(panel => {
        if (panel.id === targetTabId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

function initGuideTabs() {
  const guideBtns = document.querySelectorAll('.guide-nav-btn');
  const guidePanels = document.querySelectorAll('.guide-panel');

  guideBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetGuideId = btn.getAttribute('data-guide');

      guideBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      guidePanels.forEach(p => {
        if (p.id === targetGuideId) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   2. REAL-TIME SERVER-SENT EVENTS (SSE) & TERMINAL
   ========================================================================== */
function initSSE() {
  const terminalLogs = document.getElementById('terminalLogs');
  const logBadgeCounter = document.getElementById('logBadgeCounter');
  const chkAutoScroll = document.getElementById('chkAutoScroll');
  const statusIndicator = document.getElementById('statusIndicator');
  const serverStatusText = document.getElementById('serverStatusText');

  const eventSource = new EventSource('/api/logs/stream');

  eventSource.onopen = () => {
    statusIndicator.classList.remove('offline');
    serverStatusText.textContent = 'Server Online :3000';
    appendLogEntry({
      type: 'SYSTEM',
      message: 'Tersambung ke Live Server Logs (Port 3000)'
    });
  };

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      appendLogEntry(data);
    } catch (e) {
      console.error('Format data SSE tidak valid:', e);
    }
  };

  eventSource.onerror = () => {
    serverStatusText.textContent = 'Server Offline / Reconnecting';
    statusIndicator.classList.add('offline');
  };

  function appendLogEntry(data) {
    totalLogsCount++;
    logBadgeCounter.textContent = totalLogsCount;

    const row = document.createElement('div');
    row.className = 'log-entry';

    if (data.type === 'SYSTEM') {
      row.classList.add('log-system');
      row.innerHTML = `<span class="log-time">[${new Date().toLocaleTimeString('id-ID')}]</span> <span class="log-msg">${escapeHtml(data.message)}</span>`;
    } else {
      const statusGroup = Math.floor(data.status / 100);
      const statusClass = `status-${statusGroup}xx`;

      row.innerHTML = `
        <span class="log-time">[${escapeHtml(data.timestamp)}]</span>
        <span class="log-method ${escapeHtml(data.method)}">${escapeHtml(data.method)}</span>
        <span class="log-url">${escapeHtml(data.url)}</span>
        <span class="log-status ${statusClass}">${escapeHtml(data.status.toString())}</span>
        <span class="log-duration">⚡ ${escapeHtml(data.duration)}</span>
      `;
    }

    terminalLogs.appendChild(row);

    if (chkAutoScroll.checked) {
      terminalLogs.scrollTop = terminalLogs.scrollHeight;
    }
  }

  // Terminal Controls
  document.getElementById('btnClearTerminal').addEventListener('click', () => {
    terminalLogs.innerHTML = '';
    totalLogsCount = 0;
    logBadgeCounter.textContent = '0';
  });

  const terminalDrawer = document.getElementById('terminalDrawer');
  document.getElementById('btnMinimizeTerminal').addEventListener('click', () => {
    terminalDrawer.classList.toggle('minimized');
  });

  document.getElementById('btnToggleTerminal').addEventListener('click', () => {
    terminalDrawer.classList.toggle('minimized');
  });
}

/* ==========================================================================
   3. STATS POLLER (RAM, Uptime, Items)
   ========================================================================== */
function initStatsPoller() {
  const statItemsCount = document.getElementById('statItemsCount');
  const statMemory = document.getElementById('statMemory');
  const statUptime = document.getElementById('statUptime');

  async function updateStats() {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const json = await res.json();
        const { uptimeSeconds, memoryUsageMB, totalItemsInDb } = json.data;

        statItemsCount.textContent = totalItemsInDb;
        statMemory.textContent = `${memoryUsageMB} MB`;

        // Format uptime
        if (uptimeSeconds < 60) {
          statUptime.textContent = `${uptimeSeconds}s`;
        } else {
          const mins = Math.floor(uptimeSeconds / 60);
          const secs = uptimeSeconds % 60;
          statUptime.textContent = `${mins}m ${secs}s`;
        }
      }
    } catch (err) {
      // Ignore if server unreachable
    }
  }

  updateStats();
  setInterval(updateStats, 3000);
}

/* ==========================================================================
   4. TAB 1: PIPELINE ANIMATION SIMULATOR
   ========================================================================== */
function initPipelineVisualizer() {
  const btnSimulate = document.getElementById('btnSimulatePipeline');
  const statusText = document.getElementById('pipelineStatusText');

  const steps = [
    { id: 'step-client', arrow: 'arrow-1', text: '1. Client (Browser) membuat HTTP Request (GET /api/items) dan mengirim paket data melalui jaringan TCP/IP.' },
    { id: 'step-middleware', arrow: 'arrow-2', text: '2. Express Server menerima request, lalu menjalankan Middleware: CORS, JSON Parser, dan Custom Logger.' },
    { id: 'step-router', arrow: 'arrow-3', text: '3. Router mencocokkan URL /api/items dengan handler controller yang sesuai.' },
    { id: 'step-database', arrow: 'arrow-4', text: '4. Controller memanggil fungsi database (membaca data/items.json) untuk mengambil data.' },
    { id: 'step-response', arrow: null, text: '5. Server membungkus hasil menjadi JSON dan mengirim HTTP Response status 200 OK kembali ke browser.' }
  ];

  let isRunning = false;

  btnSimulate.addEventListener('click', async () => {
    if (isRunning) return;
    isRunning = true;
    btnSimulate.disabled = true;

    // Reset visual
    document.querySelectorAll('.pipeline-step').forEach(s => s.classList.remove('active-step'));
    document.querySelectorAll('.pipeline-arrow').forEach(a => a.classList.remove('active-arrow'));

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const stepEl = document.getElementById(step.id);
      const arrowEl = step.arrow ? document.getElementById(step.arrow) : null;

      stepEl.classList.add('active-step');
      if (arrowEl) arrowEl.classList.add('active-arrow');
      statusText.textContent = step.text;

      await sleep(1000);

      stepEl.classList.remove('active-step');
      if (arrowEl) arrowEl.classList.remove('active-arrow');
    }

    statusText.textContent = '✅ Siklus Request-Response selesai dalam beberapa milidetik!';
    btnSimulate.disabled = false;
    isRunning = false;
  });
}

/* ==========================================================================
   5. TAB 2: CRUD LAB LOGIC
   ========================================================================== */
function initCrudLab() {
  const crudForm = document.getElementById('crudForm');
  const formTitle = document.getElementById('formTitle');
  const submitText = document.getElementById('submitText');
  const submitIcon = document.getElementById('submitIcon');
  const btnCancelEdit = document.getElementById('btnCancelEdit');

  const itemIdInput = document.getElementById('itemId');
  const itemTitleInput = document.getElementById('itemTitle');
  const itemCategoryInput = document.getElementById('itemCategory');
  const itemCompletedInput = document.getElementById('itemCompleted');

  // -------------------------------------------------------------
  // CUSTOM COMMAND FORM RUNNER (FORMULIR PENULISAN PERINTAH)
  // -------------------------------------------------------------
  const customCommandForm = document.getElementById('customCommandForm');
  const customMethod = document.getElementById('customMethod');
  const customUrl = document.getElementById('customUrl');
  const customBodyContainer = document.getElementById('customBodyContainer');
  const customBody = document.getElementById('customBody');
  const jsonValidationBadge = document.getElementById('jsonValidationBadge');
  const btnToggleHeaders = document.getElementById('btnToggleHeaders');
  const customHeadersContainer = document.getElementById('customHeadersContainer');
  const customAuthHeader = document.getElementById('customAuthHeader');
  const btnExecuteCommand = document.getElementById('btnExecuteCommand');

  // Update method color & body visibility
  function updateMethodState() {
    const method = customMethod.value;
    customMethod.className = `method-selector tag-${method.toLowerCase()}`;

    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      customBodyContainer.style.display = 'block';
    } else {
      customBodyContainer.style.display = 'none';
    }
  }

  if (customMethod) {
    customMethod.addEventListener('change', updateMethodState);
  }

  // Validate JSON in real-time
  function validateJsonBody() {
    if (!customBody) return true;
    const text = customBody.value.trim();
    if (!text) {
      jsonValidationBadge.textContent = 'Body Kosong';
      jsonValidationBadge.className = 'json-validation-badge';
      return true;
    }
    try {
      JSON.parse(text);
      jsonValidationBadge.textContent = 'JSON Valid ✓';
      jsonValidationBadge.className = 'json-validation-badge valid';
      return true;
    } catch (e) {
      jsonValidationBadge.textContent = 'JSON Error ✗';
      jsonValidationBadge.className = 'json-validation-badge invalid';
      return false;
    }
  }

  if (customBody) {
    customBody.addEventListener('input', validateJsonBody);
  }

  // Toggle Headers
  if (btnToggleHeaders) {
    btnToggleHeaders.addEventListener('click', () => {
      const isHidden = customHeadersContainer.style.display === 'none';
      customHeadersContainer.style.display = isHidden ? 'block' : 'none';
    });
  }

  // Template Preset Buttons
  document.querySelectorAll('.btn-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const method = btn.getAttribute('data-method');
      const url = btn.getAttribute('data-url');
      const body = btn.getAttribute('data-body');

      if (customMethod) customMethod.value = method;
      if (customUrl) customUrl.value = url;
      updateMethodState();

      if (body && customBody) {
        try {
          const parsed = JSON.parse(body);
          customBody.value = JSON.stringify(parsed, null, 2);
        } catch (e) {
          customBody.value = body;
        }
      }
      validateJsonBody();
    });
  });

  // Submit Custom Command
  if (customCommandForm) {
    customCommandForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const method = customMethod.value.toUpperCase();
      let url = customUrl.value.trim();
      if (!url.startsWith('/')) url = '/' + url;

      const headers = { 'Content-Type': 'application/json' };
      const authVal = customAuthHeader.value.trim();
      if (authVal) {
        headers['Authorization'] = authVal.startsWith('Bearer ') ? authVal : `Bearer ${authVal}`;
      }

      let bodyPayload = null;
      if (['POST', 'PUT', 'PATCH'].includes(method)) {
        const rawBody = customBody.value.trim();
        if (rawBody) {
          if (!validateJsonBody()) {
            alert('Format JSON pada Request Body tidak valid. Mohon periksa tanda koma, kurung kurawal, atau tanda kutip.');
            return;
          }
          try {
            bodyPayload = JSON.parse(rawBody);
          } catch (err) {
            alert('Format JSON tidak valid!');
            return;
          }
        }
      }

      btnExecuteCommand.disabled = true;
      btnExecuteCommand.innerHTML = '<span>⏳</span> Mengirim...';

      const startTime = performance.now();
      try {
        const options = {
          method,
          headers
        };
        if (bodyPayload) {
          options.body = JSON.stringify(bodyPayload);
        }

        const res = await fetch(url, options);
        const duration = Math.round(performance.now() - startTime);

        let jsonResponse = {};
        if (res.status === 204) {
          jsonResponse = { status: "success", message: "204 No Content (Berhasil tanpa payload body)" };
        } else {
          try {
            jsonResponse = await res.json();
          } catch (err) {
            jsonResponse = { status: "unknown", rawText: await res.text() };
          }
        }

        updateResponseInspector(method, url, res.status, duration, jsonResponse, bodyPayload);

        // Re-fetch items table if data might have changed
        if (url.startsWith('/api/items')) {
          fetchItems();
        }
      } catch (err) {
        console.error('Gagal mengeksekusi request custom:', err);
        updateResponseInspector(method, url, 500, 0, { error: err.message });
      } finally {
        btnExecuteCommand.disabled = false;
        btnExecuteCommand.innerHTML = '<span>🚀</span> Kirim';
      }
    });
  }

  // Quick Trigger Buttons
  document.getElementById('btnCrudGetAll').addEventListener('click', () => {
    fetchItems();
  });

  document.getElementById('btnCrudGetOne').addEventListener('click', () => {
    fetchOneItem(1);
  });

  document.getElementById('btnCrudDeleteDemo').addEventListener('click', () => {
    deleteItem(3);
  });

  // Filter Button
  document.getElementById('btnApplyFilter').addEventListener('click', () => {
    const search = document.getElementById('filterSearch').value.trim();
    const category = document.getElementById('filterCategory').value;
    
    let queryParams = [];
    if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
    if (category) queryParams.push(`category=${encodeURIComponent(category)}`);

    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    fetchItems(queryString);
  });

  // Form Submit (POST or PUT)
  crudForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = itemIdInput.value;
    const isEdit = Boolean(id);

    const payload = {
      title: itemTitleInput.value.trim(),
      category: itemCategoryInput.value,
      completed: itemCompletedInput.checked
    };

    const url = isEdit ? `/api/items/${id}` : '/api/items';
    const method = isEdit ? 'PUT' : 'POST';

    const startTime = performance.now();
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const duration = Math.round(performance.now() - startTime);
      const json = await res.json();

      updateResponseInspector(method, url, res.status, duration, json, payload);
      resetForm();
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  });

  btnCancelEdit.addEventListener('click', () => {
    resetForm();
  });

  function resetForm() {
    itemIdInput.value = '';
    itemTitleInput.value = '';
    itemCategoryInput.value = 'Fundamental';
    itemCompletedInput.checked = false;

    formTitle.innerHTML = '📝 Tambah Item Baru (<code>POST /api/items</code>)';
    submitText.textContent = 'Simpan Item (POST)';
    submitIcon.textContent = '➕';
    btnCancelEdit.style.display = 'none';
  }

  // Copy Response Button
  document.getElementById('btnCopyResponse').addEventListener('click', () => {
    const code = document.getElementById('responseJsonOutput').textContent;
    navigator.clipboard.writeText(code).then(() => {
      const btn = document.getElementById('btnCopyResponse');
      btn.textContent = '✅ Copied!';
      setTimeout(() => btn.textContent = '📋 Copy', 2000);
    });
  });
}

// Fetch All Items
async function fetchItems(queryString = '') {
  const url = `/api/items${queryString}`;
  const startTime = performance.now();

  try {
    const res = await fetch(url);
    const duration = Math.round(performance.now() - startTime);
    const json = await res.json();

    updateResponseInspector('GET', url, res.status, duration, json);
    renderTable(json.data || []);
  } catch (err) {
    console.error('Gagal mengambil data items:', err);
  }
}

// Fetch Single Item
async function fetchOneItem(id) {
  const url = `/api/items/${id}`;
  const startTime = performance.now();

  try {
    const res = await fetch(url);
    const duration = Math.round(performance.now() - startTime);
    const json = await res.json();

    updateResponseInspector('GET', url, res.status, duration, json);
  } catch (err) {
    console.error(err);
  }
}

// Delete Item
async function deleteItem(id) {
  const url = `/api/items/${id}`;
  const startTime = performance.now();

  try {
    const res = await fetch(url, { method: 'DELETE' });
    const duration = Math.round(performance.now() - startTime);
    const json = await res.json();

    updateResponseInspector('DELETE', url, res.status, duration, json);
    fetchItems();
  } catch (err) {
    console.error(err);
  }
}

// Edit Item (Populate Form)
function editItem(id, title, category, completed) {
  document.getElementById('itemId').value = id;
  document.getElementById('itemTitle').value = title;
  document.getElementById('itemCategory').value = category;
  document.getElementById('itemCompleted').checked = completed === 'true' || completed === true;

  document.getElementById('formTitle').innerHTML = `✏️ Edit Item #${id} (<code>PUT /api/items/${id}</code>)`;
  document.getElementById('submitText').textContent = `Perbarui Item #${id} (PUT)`;
  document.getElementById('submitIcon').textContent = '💾';
  document.getElementById('btnCancelEdit').style.display = 'inline-flex';

  // Scroll to form
  document.getElementById('crudForm').scrollIntoView({ behavior: 'smooth' });
}

// Render Table
function renderTable(items) {
  const tbody = document.getElementById('itemsTableBody');
  const countBadge = document.getElementById('dbItemsCount');
  countBadge.textContent = `${items.length} Items`;

  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color: var(--text-dim); padding: 20px;">Database kosong. Tambah item baru atau klik 'Reset Database'!</td></tr>`;
    return;
  }

  tbody.innerHTML = items.map(item => `
    <tr>
      <td><code>#${escapeHtml(item.id.toString())}</code></td>
      <td><strong>${escapeHtml(item.title)}</strong></td>
      <td><span class="badge">${escapeHtml(item.category)}</span></td>
      <td>
        <span class="${item.completed ? 'badge-completed' : 'badge-pending'}">
          ${item.completed ? '✅ Selesai' : '⏳ Proses'}
        </span>
      </td>
      <td>
        <div style="display: flex; gap: 6px;">
          <button class="btn btn-xs btn-secondary" onclick="editItem('${item.id}', '${escapeQuotes(item.title)}', '${escapeQuotes(item.category)}', ${item.completed})">✏️</button>
          <button class="btn btn-xs btn-danger" onclick="deleteItem(${item.id})">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Update Response Inspector
function updateResponseInspector(method, url, status, duration, json, bodyPayload = null) {
  const resStatusCode = document.getElementById('resStatusCode');
  const resDuration = document.getElementById('resDuration');
  const responseJsonOutput = document.getElementById('responseJsonOutput');
  const curlOutput = document.getElementById('curlOutput');

  resStatusCode.textContent = `${status} ${getStatusName(status)}`;
  resStatusCode.className = `status-badge ${status >= 200 && status < 300 ? 'status-200' : 'status-404'}`;
  resDuration.textContent = `${duration}ms`;

  responseJsonOutput.textContent = JSON.stringify(json, null, 2);

  // Generate cURL
  let curl = `curl -X ${method} "http://localhost:3000${url}"`;
  if (bodyPayload) {
    curl += ` \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(bodyPayload)}'`;
  }
  curlOutput.textContent = curl;
}

/* ==========================================================================
   6. TAB 3: HTTP ANATOMY BUILDER
   ========================================================================== */
function initAnatomyLab() {
  const btnSendAnatomy = document.getElementById('btnSendAnatomy');

  btnSendAnatomy.addEventListener('click', async () => {
    const param = document.getElementById('anatomyParam').value.trim();
    const query = document.getElementById('anatomyQuery').value.trim();
    const headerAuth = document.getElementById('anatomyHeader').value.trim();
    const rawBody = document.getElementById('anatomyBody').value.trim();

    let parsedBody = {};
    try {
      parsedBody = JSON.parse(rawBody);
    } catch (e) {
      alert('Format JSON pada Body tidak valid! Mohon periksa kembali kurung kurawal atau kutip dua.');
      return;
    }

    const url = `/api/anatomy-demo/${encodeURIComponent(param)}?${query}`;
    
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': headerAuth
        },
        body: JSON.stringify(parsedBody)
      });

      const json = await res.json();
      const p = json.penjelasan;

      document.getElementById('outParams').textContent = JSON.stringify(p.urlParams.nilai, null, 2);
      document.getElementById('outQuery').textContent = JSON.stringify(p.queryStrings.nilai, null, 2);
      document.getElementById('outHeaders').textContent = JSON.stringify(p.requestHeaders.nilai, null, 2);
      document.getElementById('outBody').textContent = JSON.stringify(p.requestBody.nilai, null, 2);
    } catch (err) {
      console.error(err);
    }
  });
}

/* ==========================================================================
   7. TAB 4: MIDDLEWARE & AUTH LAB
   ========================================================================== */
function initMiddlewareLab() {
  const btnAuthLogin = document.getElementById('btnAuthLogin');
  const btnAccessProtected = document.getElementById('btnAccessProtected');
  const btnAccessWithoutToken = document.getElementById('btnAccessWithoutToken');
  const btnClearToken = document.getElementById('btnClearToken');
  const tokenValue = document.getElementById('tokenValue');
  
  const latencyRange = document.getElementById('latencyRange');
  const latencyValue = document.getElementById('latencyValue');
  const btnTestLatency = document.getElementById('btnTestLatency');

  const mwStatusBadge = document.getElementById('mwStatusBadge');
  const mwJsonOutput = document.getElementById('mwJsonOutput');

  // Update token display if already in state
  renderTokenState();

  btnAuthLogin.addEventListener('click', async () => {
    const username = document.getElementById('authUsername').value;
    const password = document.getElementById('authPassword').value;

    const res = await fetch('/api/auth-demo/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const json = await res.json();
    if (res.ok && json.token) {
      currentAuthToken = json.token;
      localStorage.setItem('backend_demo_token', currentAuthToken);
      renderTokenState();
    }

    mwStatusBadge.textContent = `${res.status} ${getStatusName(res.status)}`;
    mwStatusBadge.className = `badge ${res.ok ? 'badge-success' : 'badge-danger'}`;
    mwJsonOutput.textContent = JSON.stringify(json, null, 2);
  });

  btnAccessProtected.addEventListener('click', async () => {
    const res = await fetch('/api/auth-demo/protected', {
      headers: {
        'Authorization': `Bearer ${currentAuthToken}`
      }
    });
    const json = await res.json();

    mwStatusBadge.textContent = `${res.status} ${getStatusName(res.status)}`;
    mwStatusBadge.className = `badge ${res.ok ? 'badge-success' : 'badge-danger'}`;
    mwJsonOutput.textContent = JSON.stringify(json, null, 2);
  });

  btnAccessWithoutToken.addEventListener('click', async () => {
    // Send without Authorization header
    const res = await fetch('/api/auth-demo/protected');
    const json = await res.json();

    mwStatusBadge.textContent = `${res.status} ${getStatusName(res.status)}`;
    mwStatusBadge.className = `badge ${res.ok ? 'badge-success' : 'badge-danger'}`;
    mwJsonOutput.textContent = JSON.stringify(json, null, 2);
  });

  btnClearToken.addEventListener('click', () => {
    currentAuthToken = '';
    localStorage.removeItem('backend_demo_token');
    renderTokenState();
  });

  // Latency Simulator
  latencyRange.addEventListener('input', () => {
    latencyValue.textContent = `${latencyRange.value}ms`;
  });

  btnTestLatency.addEventListener('click', async () => {
    const ms = latencyRange.value;
    btnTestLatency.disabled = true;
    btnTestLatency.innerHTML = '<span>⏳</span> Menunggu respon server...';

    const startTime = performance.now();
    const res = await fetch(`/api/middleware-demo/latency?delay=${ms}`);
    const actualDuration = Math.round(performance.now() - startTime);
    const json = await res.json();

    json.actualClientMeasuredTime = `${actualDuration}ms`;
    mwStatusBadge.textContent = `${res.status} OK (${actualDuration}ms)`;
    mwStatusBadge.className = 'badge badge-success';
    mwJsonOutput.textContent = JSON.stringify(json, null, 2);

    btnTestLatency.disabled = false;
    btnTestLatency.innerHTML = '<span>⏳</span> Jalankan Request dengan Delay';
  });

  function renderTokenState() {
    if (currentAuthToken) {
      tokenValue.textContent = currentAuthToken;
      tokenValue.classList.remove('text-muted');
      btnClearToken.style.display = 'inline-block';
    } else {
      tokenValue.textContent = '(Belum login / belum ada token)';
      tokenValue.classList.add('text-muted');
      btnClearToken.style.display = 'none';
    }
  }
}

/* ==========================================================================
   8. TAB 5: STATUS CODE TRIGGER FUNCTION (Global scope)
   ========================================================================== */
window.triggerStatusCode = async function(code) {
  const output = document.getElementById('statusDemoOutput');
  const badge = document.getElementById('statusDemoBadge');

  output.textContent = '// Mengirim request ke server...';

  try {
    const res = await fetch(`/api/status-demo/${code}`);
    let text = '';
    
    if (code === 204) {
      text = '// [204 No Content]: Response berhasil tanpa data payload body.';
    } else {
      const json = await res.json();
      text = JSON.stringify(json, null, 2);
    }

    badge.textContent = `Status: ${res.status} ${getStatusName(res.status)}`;
    badge.className = `badge ${res.status >= 200 && res.status < 300 ? 'badge-success' : 'badge-danger'}`;
    output.textContent = text;

    document.getElementById('statusResultBox').scrollIntoView({ behavior: 'smooth' });
  } catch (err) {
    console.error(err);
  }
};

/* ==========================================================================
   9. HEADER ACTIONS (Reset DB)
   ========================================================================== */
function initHeaderActions() {
  document.getElementById('btnResetDb').addEventListener('click', async () => {
    if (confirm('Kembalikan data ke awal (default)?')) {
      await fetch('/api/items/reset', { method: 'POST' });
      fetchItems();
    }
  });
}

/* ==========================================================================
   HELPERS
   ========================================================================== */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function escapeHtml(text) {
  if (!text) return '';
  return text.replace(/[&<>"']/g, function(m) {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#039;';
      default: return m;
    }
  });
}

function escapeQuotes(text) {
  if (!text) return '';
  return text.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function getStatusName(code) {
  const map = {
    200: 'OK',
    201: 'Created',
    204: 'No Content',
    301: 'Moved Permanently',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    422: 'Unprocessable Entity',
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    503: 'Service Unavailable'
  };
  return map[code] || '';
}
