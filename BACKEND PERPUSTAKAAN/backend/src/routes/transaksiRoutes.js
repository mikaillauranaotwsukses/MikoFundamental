const express = require('express');
const router = express.Router();
const { authRequired, adminOnly } = require('../middleware/authMiddleware');
const {
    pinjamBuku,
    kembalikanBuku,
    getRiwayat,
    getAllTransaksi
} = require('../controllers/transaksiController');

// All transaksi routes require authentication
router.use(authRequired);

router.post('/pinjam/:id_buku', pinjamBuku);
router.post('/kembali/:id_transaksi', kembalikanBuku);
router.get('/riwayat', getRiwayat);
router.get('/', adminOnly, getAllTransaksi);

module.exports = router;
