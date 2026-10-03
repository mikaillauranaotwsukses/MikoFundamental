const bcrypt = require('bcrypt');
const pool = require('../config/db');
const { generateToken } = require('../utils/jwt');

const register = async (req, res) => {
    try {
        const { nama, username, password } = req.body;

        if (!nama || !username || !password) {
            return res.status(400).json({ error: 'Nama, username, dan password wajib diisi' });
        }

        if (password.length < 4) {
            return res.status(400).json({ error: 'Password minimal 4 karakter' });
        }

        // Check if username already exists
        const checkUser = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
        if (checkUser.rows.length > 0) {
            return res.status(400).json({ error: 'Gagal mendaftar, username mungkin sudah dipakai' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (nama, username, password, role) VALUES ($1, $2, $3, $4) RETURNING id, nama, username, role',
            [nama, username, hashedPassword, 'user']
        );

        const user = result.rows[0];
        user.id = Number(user.id);

        res.status(201).json({
            message: 'Registrasi berhasil',
            user: user
        });
    } catch (err) {
        console.error('Register error:', err.message);
        res.status(500).json({ error: 'Gagal mendaftar, username mungkin sudah dipakai' });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username dan password wajib diisi' });
        }

        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'username atau password salah' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'username atau password salah' });
        }

        const userId = Number(user.id);
        const token = generateToken(userId, user.role);

        res.status(200).json({
            token: token,
            user: {
                id: userId,
                nama: user.nama,
                username: user.username,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
};

module.exports = {
    register,
    login
};
