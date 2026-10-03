const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const bukuRoutes = require('./routes/bukuRoutes');
const anggotaRoutes = require('./routes/anggotaRoutes');
const transaksiRoutes = require('./routes/transaksiRoutes');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/buku', bukuRoutes);
app.use('/api/anggota', anggotaRoutes);
app.use('/api/transaksi', transaksiRoutes);

app.get('/', (req, res) => {
    res.json({ message: "API Perpustakaan Berhasil Berjalan" });
});

app.listen(PORT, () => {
    console.log(`Server Berjalan di http://localhost:${PORT}`);
});

module.exports = app;