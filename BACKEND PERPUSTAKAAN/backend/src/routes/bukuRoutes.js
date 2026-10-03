const express = require('express');
const router = express.Router();
const { authRequired, adminOnly } = require('../middleware/authMiddleware');
const {
    getAllBuku,
    getBukuById,
    createBuku,
    updateBuku,
    deleteBuku
} = require('../controllers/bukuController');

// All buku routes require authentication
router.use(authRequired);

router.get('/', getAllBuku);
router.get('/:id', getBukuById);
router.post('/', adminOnly, createBuku);
router.put('/:id', adminOnly, updateBuku);
router.delete('/:id', adminOnly, deleteBuku);

module.exports = router;
