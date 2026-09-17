const pool = require('../config/db.js');

const getAllBooks = async (req,res) => {
    try{
        const result = await pool.query("SELECT * FROM books ORDER BY id ASC");
        res.json(result.rows);
    } catch (err){
        console.error(err.message);
        res.status(500).json({error: 'Terjadi Kesalahan Server'});
    }
};

const getBookById = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);

        if (result.rows.lenght === 0 ){
            return res.status(404).json({error: "Buku Tidak ditemukan"});
        }

        res.json(result.rows[0]);

    } catch (err){
        console.error(err.message);
        res.status(500).json({error: 'Terjadi kesalahan server'});
    }
};

const createBook = async (req,res) => {
    try{
        const {title, author, isbn, stock} = req.body;

        if(!title || !author){
            return res.status(400).json({error: "Title dan Author Wajib Diisi"})
        }

        const result = await pool.query(
            'INSERT INTO books (title,author,isbn,stok) VALUES ($1,$2,$3,$4) RETURNING *',[title,author,isbn,stock || 0]
        );

        res.status(201).json(result.rows[0]);
    }catch(err){
        console.error(err.message);
        res.status(500).json({error: 'Terjadi Kesalahan Server'});
    }
};

const updateBook = async(req,res) => {
    try{
        const {id} = req.params;
        const { title,author,isbn,stock} = req.body;

        const result = await pool.query('UPDATE books SET title = $1, author =$2, isbn= $3, stock = $4 WHERE id = $5 RETURNING *', [title,author,isbn,stock,id]);

        if (result.rows.length == 0 ){
            return res.status(404).json({ error: 'Terjadi Kesalahan Server'});
        }

        res.json(result.rows[0]);
    }catch (err){
        console.error(err.message);
        res.status(500).json({error: 'Terjadi Kesalahan Server'})
    }
};

const deleteBook = async (req,res) => {
    try{
        const{id} = req.params;
        const result = await pool.query("DELETE FROM books WHERE id = $1 RETURNING*", [id]);
        
        if (result.rows.length == 0 ){
            return res.status(404).json({ error: 'Terjadi Kesalahan Server'});
        }

        res.json('Buku berhasil di hapus');
    }catch (err){
        console.error(err.message);
        res.status(500).json({error: 'Terjadi Kesalahan Server'})
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
