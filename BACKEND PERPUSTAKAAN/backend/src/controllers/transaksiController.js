const pool = require('../config/db');

const formatTransaksi = (row) => {
    const res = {
        id_transaksi: Number(row.id_transaksi),
        id_user: Number(row.id_user),
        id_buku: Number(row.id_buku),
        tanggal_pinjam: row.tanggal_pinjam,
        tanggal_kembali: row.tanggal_kembali,
        status: row.status
    };

    if (row.buku_id_buku) {
        res.buku = {
            id_buku: Number(row.buku_id_buku),
            judul: row.buku_judul,
            pengarang: row.buku_pengarang,
            stok: Number(row.buku_stok)
        };
    } else if (row.buku) {
        res.buku = row.buku;
    }

    if (row.user_id) {
        res.user = {
            id: Number(row.user_id),
            nama: row.user_nama,
            username: row.user_username,
            role: row.user_role
        };
    } else if (row.user) {
        res.user = row.user;
    }

    return res;
};

const pinjamBuku = async (req, res) => {
    const client = await pool.connect();
    try {
        const userId = req.user.id;
        const bukuId = req.params.id_buku;

        if (!bukuId || isNaN(Number(bukuId))) {
            return res.status(400).json({ error: 'ID buku tidak valid' });
        }

        await client.query('BEGIN');

        // Check if book exists and lock row
        const bookResult = await client.query('SELECT * FROM buku WHERE id_buku = $1 FOR UPDATE', [bukuId]);
        if (bookResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'buku tidak ditemukan' });
        }

        const buku = bookResult.rows[0];
        if (Number(buku.stok) <= 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'stok buku habis' });
        }

        // Decrement stock
        await client.query('UPDATE buku SET stok = stok - 1 WHERE id_buku = $1', [bukuId]);

        // Insert transaksi
        const transaksiResult = await client.query(
            "INSERT INTO transaksi (id_user, id_buku, tanggal_pinjam, status) VALUES ($1, $2, CURRENT_TIMESTAMP, 'dipinjam') RETURNING id_transaksi, id_user, id_buku, tanggal_pinjam, tanggal_kembali, status",
            [userId, bukuId]
        );

        await client.query('COMMIT');

        const created = transaksiResult.rows[0];
        res.status(201).json({
            id_transaksi: Number(created.id_transaksi),
            id_user: Number(created.id_user),
            id_buku: Number(created.id_buku),
            tanggal_pinjam: created.tanggal_pinjam,
            tanggal_kembali: created.tanggal_kembali,
            status: created.status
        });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('pinjamBuku error:', err.message);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    } finally {
        client.release();
    }
};

const kembalikanBuku = async (req, res) => {
    const client = await pool.connect();
    try {
        const idTransaksi = req.params.id_transaksi;

        if (!idTransaksi || isNaN(Number(idTransaksi))) {
            return res.status(400).json({ error: 'ID transaksi tidak valid' });
        }

        await client.query('BEGIN');

        // Check transaction
        const transaksiResult = await client.query('SELECT * FROM transaksi WHERE id_transaksi = $1 FOR UPDATE', [idTransaksi]);
        if (transaksiResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'transaksi tidak ditemukan' });
        }

        const transaksi = transaksiResult.rows[0];
        if (transaksi.status === 'kembali') {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'buku sudah dikembalikan sebelumnya' });
        }

        // Update status and return date
        await client.query(
            "UPDATE transaksi SET status = 'kembali', tanggal_kembali = CURRENT_TIMESTAMP WHERE id_transaksi = $1",
            [idTransaksi]
        );

        // Increment book stock
        await client.query('UPDATE buku SET stok = stok + 1 WHERE id_buku = $1', [transaksi.id_buku]);

        await client.query('COMMIT');

        res.status(200).json({ message: 'Buku berhasil dikembalikan' });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('kembalikanBuku error:', err.message);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    } finally {
        client.release();
    }
};

const getRiwayat = async (req, res) => {
    try {
        const userId = req.user.id;
        const cari = req.query.cari;

        let query = `
            SELECT 
                t.id_transaksi,
                t.id_user,
                t.id_buku,
                t.tanggal_pinjam,
                t.tanggal_kembali,
                t.status,
                b.id_buku AS buku_id_buku,
                b.judul AS buku_judul,
                b.pengarang AS buku_pengarang,
                b.stok AS buku_stok
            FROM transaksi t
            JOIN buku b ON t.id_buku = b.id_buku
            WHERE t.id_user = $1
        `;
        const params = [userId];

        if (cari) {
            query += ' AND b.judul ILIKE $2';
            params.push(`%${cari}%`);
        }

        query += ' ORDER BY t.id_transaksi DESC';

        const result = await pool.query(query, params);
        res.status(200).json(result.rows.map(formatTransaksi));
    } catch (err) {
        console.error('getRiwayat error:', err.message);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
};

const getAllTransaksi = async (req, res) => {
    try {
        const cari = req.query.cari;

        let query = `
            SELECT 
                t.id_transaksi,
                t.id_user,
                t.id_buku,
                t.tanggal_pinjam,
                t.tanggal_kembali,
                t.status,
                b.id_buku AS buku_id_buku,
                b.judul AS buku_judul,
                b.pengarang AS buku_pengarang,
                b.stok AS buku_stok,
                u.id AS user_id,
                u.nama AS user_nama,
                u.username AS user_username,
                u.role AS user_role
            FROM transaksi t
            JOIN buku b ON t.id_buku = b.id_buku
            JOIN users u ON t.id_user = u.id
        `;
        const params = [];

        if (cari) {
            query += ' WHERE b.judul ILIKE $1 OR u.nama ILIKE $1';
            params.push(`%${cari}%`);
        }

        query += ' ORDER BY t.id_transaksi DESC';

        const result = await pool.query(query, params);
        res.status(200).json(result.rows.map(formatTransaksi));
    } catch (err) {
        console.error('getAllTransaksi error:', err.message);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
};

module.exports = {
    pinjamBuku,
    kembalikanBuku,
    getRiwayat,
    getAllTransaksi
};
