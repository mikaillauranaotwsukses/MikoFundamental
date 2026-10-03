const bcrypt = require('bcrypt');
const pool = require('../config/db');

const formatUser = (row) => ({
    id: Number(row.id),
    nama: row.nama,
    username: row.username,
    role: row.role
});

const getAllAnggota = async (req, res) => {
    try {
        const cari = req.query.cari;
        let query = "SELECT id, nama, username, role FROM users WHERE role = 'user'";
        const params = [];

        if (cari) {
            query += ' AND nama ILIKE $1';
            params.push(`%${cari}%`);
        }

        query += ' ORDER BY id ASC';

        const result = await pool.query(query, params);
        res.status(200).json(result.rows.map(formatUser));
    } catch (err) {
        console.error('getAllAnggota error:', err.message);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
};

const updateAnggota = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, username, password } = req.body;

        if (!nama || !username) {
            return res.status(400).json({ error: 'Nama dan username wajib diisi' });
        }

        // Check if user exists and is a member (role = 'user')
        const checkUser = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (checkUser.rows.length === 0) {
            return res.status(404).json({ error: 'Anggota tidak ditemukan' });
        }

        let query = '';
        let params = [];

        if (password && password.trim() !== '') {
            const hashedPassword = await bcrypt.hash(password, 10);
            query = 'UPDATE users SET nama = $1, username = $2, password = $3 WHERE id = $4 RETURNING id, nama, username, role';
            params = [nama, username, hashedPassword, id];
        } else {
            query = 'UPDATE users SET nama = $1, username = $2 WHERE id = $3 RETURNING id, nama, username, role';
            params = [nama, username, id];
        }

        const result = await pool.query(query, params);
        res.status(200).json(formatUser(result.rows[0]));
    } catch (err) {
        console.error('updateAnggota error:', err.message);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
};

const deleteAnggota = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM users WHERE id = $1 AND role = \'user\' RETURNING id', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Anggota tidak ditemukan' });
        }

        res.status(200).json({ message: 'Anggota berhasil dihapus' });
    } catch (err) {
        console.error('deleteAnggota error:', err.message);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
};

module.exports = {
    getAllAnggota,
    updateAnggota,
    deleteAnggota
};
