const pool = require('../config/db');

const formatBuku = (row) => ({
    id_buku: Number(row.id_buku),
    judul: row.judul,
    pengarang: row.pengarang,
    stok: Number(row.stok)
});

const getAllBuku = async (req, res) => {
    try {
        const cari = req.query.cari;
        let query = 'SELECT id_buku, judul, pengarang, stok FROM buku';
        const params = [];

        if (cari) {
            query += ' WHERE judul ILIKE $1';
            params.push(`%${cari}%`);
        }

        query += ' ORDER BY id_buku ASC';

        const result = await pool.query(query, params);
        res.status(200).json(result.rows.map(formatBuku));
    } catch (err) {
        console.error('getAllBuku error:', err.message);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
};

const getBukuById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT id_buku, judul, pengarang, stok FROM buku WHERE id_buku = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Buku tidak ditemukan' });
        }

        res.status(200).json(formatBuku(result.rows[0]));
    } catch (err) {
        console.error('getBukuById error:', err.message);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
};

const createBuku = async (req, res) => {
    try {
        const { judul, pengarang, stok } = req.body;

        if (!judul || !pengarang) {
            return res.status(400).json({ error: 'Judul dan pengarang wajib diisi' });
        }

        const stokValue = typeof stok !== 'undefined' ? Number(stok) : 0;

        const result = await pool.query(
            'INSERT INTO buku (judul, pengarang, stok) VALUES ($1, $2, $3) RETURNING id_buku, judul, pengarang, stok',
            [judul, pengarang, stokValue]
        );

        res.status(201).json(formatBuku(result.rows[0]));
    } catch (err) {
        console.error('createBuku error:', err.message);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
};

const updateBuku = async (req, res) => {
    try {
        const { id } = req.params;
        const { judul, pengarang, stok } = req.body;

        if (!judul || !pengarang) {
            return res.status(400).json({ error: 'Judul dan pengarang wajib diisi' });
        }

        const stokValue = typeof stok !== 'undefined' ? Number(stok) : 0;

        const result = await pool.query(
            'UPDATE buku SET judul = $1, pengarang = $2, stok = $3 WHERE id_buku = $4 RETURNING id_buku, judul, pengarang, stok',
            [judul, pengarang, stokValue, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Buku tidak ditemukan' });
        }

        res.status(200).json(formatBuku(result.rows[0]));
    } catch (err) {
        console.error('updateBuku error:', err.message);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
};

const deleteBuku = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM buku WHERE id_buku = $1 RETURNING id_buku', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Buku tidak ditemukan' });
        }

        res.status(200).json({ message: 'Buku berhasil dihapus' });
    } catch (err) {
        console.error('deleteBuku error:', err.message);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
};

module.exports = {
    getAllBuku,
    getBukuById,
    createBuku,
    updateBuku,
    deleteBuku
};
