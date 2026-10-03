const express = require('express');
const router = express.Router();
const { authRequired, adminOnly } = require('../middleware/authMiddleware');
const {
    getAllAnggota,
    updateAnggota,
    deleteAnggota
} = require('../controllers/anggotaController');

// All anggota routes require authentication and admin role
router.use(authRequired, adminOnly);

router.get('/', getAllAnggota);
router.put('/:id', updateAnggota);
router.delete('/:id', deleteAnggota);

module.exports = router;
