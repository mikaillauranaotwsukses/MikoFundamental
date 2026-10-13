const express = require('express');
const router = express.Router();
const{
    getAllBorrowings,
    createBowwoing,
    returnBorrowing
} = require('../controllers/borrowController');

router.get('/', getAllBorrowings);
router.post('/', createBowwoing);
router.put('/:id/return', returnBorrowing);

module.exports = router;