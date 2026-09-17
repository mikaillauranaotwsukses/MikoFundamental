const pool = require('../config/db');

const getAllBorrowings = async (req,res) => {
    try{
        const result = await pool.query('SELECT borrowings.id, books.title AS book_title, members.name AS member_name, borrowings.borrow_date, borrowings.return_date, borrowings.status FROM borrowings JOIN books ON borrowings.book_id = books.id JOIN members ON borrowings.member_id = members.id ORDER BY borrowings.id DESC');
        res.json(result.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).json({error: 'Terjaadi Kesalahan Server'});
    }
};

const createBowwoing = async (req,res) => {
    const client = await pool.connect();

    try{
        const {book_id, member_id} = req.body;

        if(!book_id || !member_id){
            return res.status(400).json({error: 'book_id dan member_id tidak boleh kosong'});
        }

        await client.query('BEGIN');
        const bookResult = await client.query('SELECT stock FROM books WHERE id = $1 FOR UPDATE', [book_id]);

        if (bookResult.rows.length === 0){
            await client.query('ROLLBACK');
            return res.status(404).json({error: 'Buku tidak dtemukan'});
        }

        const stock = bookResult.rows[0].stock;

        if (stock <= 0){
            await client.query('ROLLBACK');
            return res.status(400).json({error: 'Stok Buku Habis'})
        }

        await client.query('UPDATE books SET stock = stock -1 WHERE id = $1', [book_id]);

        const borrowResult = await client.query("INSERT INTO borrowings (book_id,member_id,status) VALUES ($1,$2, 'dipinjam') RETURNING *", [book_id,member_id]);

        await client.query('COMMIT');
        res.status(201).json(borrowResult.rows[0]);
    }catch (err){
        await client.query('ROLLBACK');
        console.error(err.message);
        res.status(500).json({message: 'Server Sedang Bermasalah'});
    }finally{
        client.release();
    }
};

const returnBorrowing = async (req,res) => {
    const client = await pool.connect();
    try{
        const { id } = req.params;

        await client.query('BEGIN');

        const borrowResult = await client.query('SELECT * FROM borrowings WHERE id = $1', [id]);

        if (borrowResult.rows.length === 0){
            await client.query('ROLLBACK');
            return res.status(404).json({error : 'Peminjaman tidak ditemukan'});
        }

        const borrowing = borrowResult.rows[0];

        if (borrowing.status === 'dikembalikan'){
            await client.query('ROLLBACK');
            return res.status(400).json({error: "Buku sudah dikembalikan sebelumnya"});
        }

        const updated = await client.query("UPDATE borrowings SET status = 'dikembalikan', return_date = CURRENT_DATE WHERE id = $1 RETURNING *", [id]);

        await client.query('UPDATE books SET stock = stock + 1 WHERE id = $1', [borrowing.book_id]);
        await client.query('COMMIT');
        res.json(updated.rows[0]);
    }catch(err){
        await client.query('ROLLBACK');
        console.error(err.message);
        res.status(500).json({error: 'Terjadi Kesalahan Server'});
    } finally{
        client.release();
    }
};

module.exports = {
    getAllBorrowings,
    createBowwoing,
    returnBorrowing
}