/**
 * ==============================================================================
 * 🚀 BACKEND LEARNING STUDIO - SERVER UTAMA (Node.js & Express.js)
 * ==============================================================================
 * File ini adalah server backend nyata yang dirancang untuk pembelajaran.
 * Setiap baris dan blok kode telah diberi komentar penjelasan dalam Bahasa Indonesia.
 * 
 * Konsep Utama yang Dipelajari di sini:
 * 1. Struktur Server Express & Inisialisasi Port
 * 2. Middleware & Urutan Eksekusinya (next())
 * 3. Request Anatomy (req.params, req.query, req.headers, req.body)
 * 4. Operasi CRUD (Create, Read, Update, Delete) & Status Codes
 * 5. Autentikasi dasar (Bearer Token)
 * 6. Real-time Streaming Logs menggunakan Server-Sent Events (SSE)
 * ==============================================================================
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// 1. Inisialisasi Aplikasi Express
const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'data', 'items.json');

// ==============================================================================
// 🛠️ DAFTAR KLIEN REAL-TIME LOGS (Server-Sent Events / SSE)
// ==============================================================================
// Ini memungkinkan frontend menampilkan log terminal secara live saat kamu klik tombol API!
let logClients = [];

function broadcastLog(logData) {
  logClients.forEach(client => {
    client.res.write(`data: ${JSON.stringify(logData)}\n\n`);
  });
}

// ==============================================================================
// 🧱 2. MIDDLEWARE GLOBAL
// ==============================================================================
// Middleware adalah fungsi yang dieksekusi di tengah-tengah antara Request masuk
// dan Response dikirimkan kembali ke klien.

// A. CORS (Cross-Origin Resource Sharing): Mengizinkan browser mengakses API dari domain lain
app.use(cors());

// B. JSON Body Parser: Mengubah request body berformat JSON menjadi object JavaScript (req.body)
app.use(express.json());

// C. URL Encoded Parser: Mendukung parsing data form HTML standar
app.use(express.urlencoded({ extended: true }));

// D. Custom Request Logger Middleware (Mencatat setiap request yang masuk)
app.use((req, res, next) => {
  const startTime = Date.now();
  const timestamp = new Date().toLocaleTimeString('id-ID');

  // Hooking response saat selesai untuk mengukur durasi (latency)
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logEntry = {
      timestamp,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip || '127.0.0.1'
    };

    console.log(`[${logEntry.timestamp}] ${logEntry.method} ${logEntry.url} -> ${logEntry.status} (${logEntry.duration})`);

    // Kirimkan log ke browser jika bukan request stream itu sendiri
    if (!req.originalUrl.startsWith('/api/logs/stream')) {
      broadcastLog(logEntry);
    }
  });

  // next() SANGAT PENTING: Melanjutkan request ke middleware / router berikutnya!
  next();
});

// E. Static Files Middleware: Menyajikan file HTML, CSS, JS frontend dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// ==============================================================================
// 📂 HELPER DATABASE (JSON File-based Storage)
// ==============================================================================
function readDatabase() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('Gagal membaca database:', error);
    return [];
  }
}

function writeDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Gagal menyimpan ke database:', error);
    return false;
  }
}

// Data default untuk fitur reset
const DEFAULT_ITEMS = [
  {
    id: 1,
    title: "Belajar HTTP Methods & REST API",
    category: "Fundamental",
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Memahami Request vs Response Lifecycle",
    category: "Architecture",
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Praktek CRUD dengan Node.js & Express",
    category: "Practical",
    completed: false,
    createdAt: new Date().toISOString()
  }
];

// ==============================================================================
// 📡 3. ROUTE: REAL-TIME STREAMING LOGS (SSE)
// ==============================================================================
app.get('/api/logs/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const clientId = Date.now();
  const newClient = { id: clientId, res };
  logClients.push(newClient);

  // Kirim initial ping
  res.write(`data: ${JSON.stringify({ type: 'SYSTEM', message: 'Tersambung ke Live Server Logs' })}\n\n`);

  req.on('close', () => {
    logClients = logClients.filter(client => client.id !== clientId);
  });
});

// Endpoint untuk mendapatkan ringkasan statistik server
app.get('/api/stats', (req, res) => {
  const items = readDatabase();
  res.json({
    status: "success",
    message: "Server berjalan optimal",
    data: {
      uptimeSeconds: Math.floor(process.uptime()),
      nodeVersion: process.version,
      memoryUsageMB: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
      totalItemsInDb: items.length,
      activeSseConnections: logClients.length,
      serverTime: new Date().toISOString()
    }
  });
});

// ==============================================================================
// 📦 4. MODUL CRUD (Create, Read, Update, Delete) - REST API
// ==============================================================================

/**
 * [READ ALL] GET /api/items
 * Mengambil seluruh data. Mendukung query filter: ?search=... & ?category=... & ?completed=true/false
 */
app.get('/api/items', (req, res) => {
  let items = readDatabase();
  const { search, category, completed } = req.query;

  // Filter berdasarkan search query
  if (search) {
    items = items.filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Filter berdasarkan kategori
  if (category && category !== 'All') {
    items = items.filter(item => 
      item.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter berdasarkan status selesai (completed)
  if (completed !== undefined) {
    const isCompleted = completed === 'true';
    items = items.filter(item => item.completed === isCompleted);
  }

  // 200 OK: Request berhasil dan data dikembalikan
  res.status(200).json({
    status: "success",
    total: items.length,
    filters: { search, category, completed },
    data: items
  });
});

/**
 * [READ ONE] GET /api/items/:id
 * Mengambil 1 data spesifik berdasarkan URL Parameter ID
 */
app.get('/api/items/:id', (req, res) => {
  const items = readDatabase();
  const id = parseInt(req.params.id, 10);

  const item = items.find(i => i.id === id);

  if (!item) {
    // 404 Not Found: Resource yang diminta tidak ditemukan di server
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `Item dengan ID ${id} tidak ditemukan!`
    });
  }

  // 200 OK
  res.status(200).json({
    status: "success",
    data: item
  });
});

/**
 * [CREATE] POST /api/items
 * Menambahkan data baru ke dalam database
 */
app.post('/api/items', (req, res) => {
  const { title, category, completed } = req.body;

  // Validasi Input Sederhana
  if (!title || title.trim() === '') {
    // 400 Bad Request: Client mengirim data yang tidak valid / tidak lengkap
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Field 'title' wajib diisi dan tidak boleh kosong!"
    });
  }

  const items = readDatabase();
  const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;

  const newItem = {
    id: newId,
    title: title.trim(),
    category: category || "Umum",
    completed: Boolean(completed),
    createdAt: new Date().toISOString()
  };

  items.push(newItem);
  writeDatabase(items);

  // 201 Created: Data baru berhasil dibuat di server
  res.status(201).json({
    status: "success",
    code: 201,
    message: "Item baru berhasil ditambahkan!",
    data: newItem
  });
});

/**
 * [UPDATE] PUT /api/items/:id
 * Memperbarui data yang sudah ada berdasarkan ID
 */
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, category, completed } = req.body;
  const items = readDatabase();

  const index = items.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `Item dengan ID ${id} tidak ditemukan untuk diupdate!`
    });
  }

  // Update properti jika disediakan
  if (title !== undefined) items[index].title = title.trim();
  if (category !== undefined) items[index].category = category;
  if (completed !== undefined) items[index].completed = Boolean(completed);
  items[index].updatedAt = new Date().toISOString();

  writeDatabase(items);

  // 200 OK
  res.status(200).json({
    status: "success",
    code: 200,
    message: `Item ID ${id} berhasil diperbarui!`,
    data: items[index]
  });
});

/**
 * [DELETE] DELETE /api/items/:id
 * Menghapus data berdasarkan ID
 */
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const items = readDatabase();

  const itemIndex = items.findIndex(i => i.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `Item dengan ID ${id} tidak ditemukan untuk dihapus!`
    });
  }

  const deletedItem = items.splice(itemIndex, 1)[0];
  writeDatabase(items);

  // 200 OK dengan informasi item yang dihapus
  res.status(200).json({
    status: "success",
    code: 200,
    message: `Item '${deletedItem.title}' (ID: ${id}) berhasil dihapus!`,
    deletedItem
  });
});

/**
 * [RESET DATABASE] POST /api/items/reset
 * Mengembalikan data ke kondisi awal (Mock default)
 */
app.post('/api/items/reset', (req, res) => {
  writeDatabase(DEFAULT_ITEMS);
  res.status(200).json({
    status: "success",
    message: "Database berhasil di-reset ke data default!",
    data: DEFAULT_ITEMS
  });
});

// ==============================================================================
// 🔬 5. ANATOMI HTTP REQUEST & RESPONSE DEMO
// ==============================================================================
/**
 * POST/GET /api/anatomy-demo/:paramContoh
 * Membedah bagian-bagian dari request HTTP yang diterima oleh Express:
 * 1. req.params  -> URL Parameter (:paramContoh)
 * 2. req.query   -> Query Strings (?key=value)
 * 3. req.headers -> Request Headers (Content-Type, User-Agent, Auth, dll)
 * 4. req.body    -> Request Payload / Body JSON
 */
app.all('/api/anatomy-demo/:paramContoh?', (req, res) => {
  const responseData = {
    konsep: "Anatomi HTTP Request yang Diterima Server",
    penjelasan: {
      method: {
        nilai: req.method,
        keterangan: "HTTP Verb yang digunakan client (GET, POST, PUT, DELETE, dll)"
      },
      urlParams: {
        nilai: req.params,
        keterangan: "Diekstrak dari path URL dinamis (misal: /api/anatomy-demo/:paramContoh -> req.params.paramContoh)"
      },
      queryStrings: {
        nilai: req.query,
        keterangan: "Diekstrak dari URL setelah tanda tanya '?' (misal: ?search=backend&page=1 -> req.query)"
      },
      requestHeaders: {
        nilai: {
          "user-agent": req.headers['user-agent'],
          "content-type": req.headers['content-type'] || 'tidak ada',
          "authorization": req.headers['authorization'] || 'tidak ada',
          "accept": req.headers['accept']
        },
        keterangan: "Metadata request seperti jenis format data, info browser, token otentikasi"
      },
      requestBody: {
        nilai: req.body,
        keterangan: "Data muatan (payload) yang dikirim client via POST/PUT/PATCH (diparsing oleh express.json())"
      },
      clientIp: req.ip
    },
    waktuProses: new Date().toISOString()
  };

  res.status(200).json(responseData);
});

// ==============================================================================
// 🚦 6. HTTP STATUS CODES LAB & SIMULATOR
// ==============================================================================
/**
 * GET /api/status-demo/:code
 * Mengembalikan HTTP status code spesifik beserta edukasi kapan menggunakannya
 */
const STATUS_DESCRIPTIONS = {
  200: { name: "200 OK", type: "Success", desc: "Request berhasil! Digunakan untuk GET biasa atau update data." },
  201: { name: "201 Created", type: "Success", desc: "Resource baru berhasil dibuat di database. Umumnya pada response POST." },
  204: { name: "204 No Content", type: "Success", desc: "Request berhasil, tetapi server sengaja tidak mengirim body (misal setelah DELETE)." },
  301: { name: "301 Moved Permanently", type: "Redirection", desc: "Resource telah dipindahkan ke URL baru secara permanen." },
  400: { name: "400 Bad Request", type: "Client Error", desc: "Request client tidak valid, salah format JSON, atau field wajib kurang." },
  401: { name: "401 Unauthorized", type: "Client Error", desc: "Client belum login atau tidak menyertakan Token/API Key yang valid." },
  403: { name: "403 Forbidden", type: "Client Error", desc: "Client sudah login tetapi tidak punya izin akses (Role/Permission ditolak)." },
  404: { name: "404 Not Found", type: "Client Error", desc: "Endpoint URL atau ID data yang dicari tidak ada di server." },
  422: { name: "422 Unprocessable Entity", type: "Client Error", desc: "Format data benar tetapi gagal validasi logika bisnis (misal email duplikat)." },
  429: { name: "429 Too Many Requests", type: "Client Error", desc: "Client mengirim terlalu banyak request dalam rentang waktu singkat (Rate Limit)." },
  500: { name: "500 Internal Server Error", type: "Server Error", desc: "Terjadi error/bug yang tidak terduga pada kode program backend." },
  503: { name: "503 Service Unavailable", type: "Server Error", desc: "Server sedang overload atau sedang maintenance." }
};

app.get('/api/status-demo/:code', (req, res) => {
  const code = parseInt(req.params.code, 10);
  const info = STATUS_DESCRIPTIONS[code];

  if (!info) {
    return res.status(400).json({
      status: "error",
      message: `Kode status ${code} belum terdaftar di simulator demo.`
    });
  }

  if (code === 204) {
    // 204 tidak boleh mengirim body response
    return res.status(204).end();
  }

  res.status(code).json({
    statusCode: code,
    statusName: info.name,
    category: info.type,
    penjelasan: info.desc,
    timestamp: new Date().toISOString()
  });
});

// ==============================================================================
// 🛡️ 7. MIDDLEWARE & AUTHENTICATION LAB
// ==============================================================================

// Middleware Otentikasi Khusus (Bearer Token Checker)
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  // Header Authorization biasanya berformat: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // 401: Tidak ada token disediakan sama sekali
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Akses Ditolak! Header 'Authorization: Bearer <token>' tidak ditemukan."
    });
  }

  // Simulasi validasi token rahasia
  if (token !== 'secret-miko-token-2026') {
    // 403: Token salah atau kadaluarsa
    return res.status(403).json({
      status: "error",
      code: 403,
      message: "Token tidak valid atau kadaluarsa! Gunakan token: 'secret-miko-token-2026'."
    });
  }

  // Pasang payload user ke object request agar bisa diakses oleh handler selanjutnya
  req.user = {
    id: 101,
    username: "miko_developer",
    role: "Fullstack Engineer"
  };

  // Lanjutkan ke handler selanjutnya
  next();
}

/**
 * POST /api/auth-demo/login
 * Simulasi login untuk mendapatkan token
 */
app.post('/api/auth-demo/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'miko' && password === 'rahasia123') {
    return res.status(200).json({
      status: "success",
      message: "Login berhasil! Simpan token ini di Header request Anda.",
      token: "secret-miko-token-2026",
      user: { username: "miko", role: "Fullstack Engineer" }
    });
  }

  res.status(401).json({
    status: "error",
    code: 401,
    message: "Username atau password salah! (Hint: username: 'miko', password: 'rahasia123')"
  });
});

/**
 * GET /api/auth-demo/protected
 * Endpoint rahasia yang dilindungi oleh middleware 'authenticateToken'
 */
app.get('/api/auth-demo/protected', authenticateToken, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Selamat! Anda berhasil mengakses Protected Route.",
    userDataFromToken: req.user,
    rahasiaBackend: "Kunci sukses belajar backend adalah memahami HTTP, Database, dan Security!",
    timestamp: new Date().toISOString()
  });
});

/**
 * GET /api/middleware-demo/latency
 * Simulasi middleware dengan delay buatan untuk mengamati waktu respon
 */
app.get('/api/middleware-demo/latency', (req, res, next) => {
  const delayMs = parseInt(req.query.delay, 10) || 500;
  setTimeout(() => {
    next();
  }, delayMs);
}, (req, res) => {
  res.json({
    status: "success",
    message: `Respon dikirim setelah middleware menahan selama ${req.query.delay || 500}ms.`,
    penjelasan: "Ini mensimulasikan proses lambat seperti pembacaan database besar atau enkripsi password."
  });
});

// ==============================================================================
// ❌ 8. 404 NOT FOUND & GLOBAL ERROR HANDLER
// ==============================================================================
// Jika ada route yang tidak cocok dengan route di atas, Express akan jatuh ke sini:
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: `Endpoint '${req.method} ${req.originalUrl}' tidak ditemukan di server ini.`,
    saran: "Periksa kembali ejaan URL dan method HTTP yang Anda gunakan."
  });
});

// Error Handler Middleware (Menerima 4 argumen: err, req, res, next)
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  res.status(500).json({
    status: "error",
    code: 500,
    message: "Terjadi kesalahan internal pada server backend!",
    errorDetail: err.message
  });
});

// ==============================================================================
// 🚀 9. MENJALANKAN SERVER
// ==============================================================================
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 BACKEND LEARNING STUDIO AKTIF!`);
  console.log(`📡 URL Web & API: http://localhost:${PORT}`);
  console.log(`💡 Buka browser di http://localhost:${PORT} untuk mulai belajar!`);
  console.log(`=======================================================`);
});
