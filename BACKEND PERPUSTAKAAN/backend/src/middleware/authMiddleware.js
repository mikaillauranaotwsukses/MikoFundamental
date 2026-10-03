const { verifyToken } = require('../utils/jwt');

const authRequired = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token tidak ditemukan' });
    }

    const token = authHeader.substring(7).trim();
    try {
        const decoded = verifyToken(token);
        req.user = {
            id: Number(decoded.user_id),
            role: decoded.role
        };
        req.userId = Number(decoded.user_id);
        req.role = decoded.role;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token tidak valid atau kadaluarsa' });
    }
};

const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Akses khusus admin' });
    }
    next();
};

module.exports = {
    authRequired,
    adminOnly
};
