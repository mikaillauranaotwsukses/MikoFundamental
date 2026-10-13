const pool = require('../config/db');

const getAllMembers = async (req,res) => {
    try{
        const result = await pool.query('SELECT * FROM members ORDER BY id ASC');
        res.json(result.rows);
    } catch (err){
        console.error(err.message);
        res.status(500).json({error: 'Terjadi Kesalahan Server'});
    }
};

const getMemberById = async (req,res) => {
    try{
        const {id} = req.params
        const result = await pool.query('SELECT * FROM members WHERE id=$1', [id]);

        if(result.rows.length == 0){
            return res.status(404).json({ error :'Data tidak ditemukan'});
        }
        res.json(result.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).json({error: 'Terjadi Kesalahan Server'});
    }
}

const createMember = async (req,res) => {
    try{
        const { name , email} = req.body;

        if (!name || !email){
            return res.status(404).json({error :" Masukan nama dan email"});
        }
        const result = await pool.query("INSERT INTO members (name, email) VALUES ($1,$2) RETURNING*", [name,email]);
        res.status(201).json(result.rows);
    }catch{
        console.error(err.message);
        res.status(500).json({error: 'Terjadi Kesalaham Server'});
    }
}

const updateMember = async(req,res) => {
    try{
        const {id} = req.params;
        const {name, email}= req.body;

        if(!name || !email){
            return res.status(404).json({error: 'Terjadi Kesalah Server'});
        }

        const result = await pool.query("UPDATE members SET name = $1, email=$2 WHERE id=$3 RETURNING*", [name,email,id]);
        res.json(result.rows);
    }catch (err){
        console.err(err.message);
        res.status(500).json({error: "Terjadi Kesalahan Server"});
    }
}

const deleteMember = async(req,res) => {
    try{
        const {id} = req.params;

        const result = await pool.query("DELETE FROM members WHERE id=$1 RETURNING*", [id]);

        if(result.rows.length == 0){
            return res.status(404).json({error: "Terjadi Kesalahan Server"})
        }
        res.json('Member Berhasil di Hapus');
    }catch(err){
        console.error(err.message);
        res.status(500).json({error: "Terjadi Kesalahan Server"});
    }

}

module.exports = {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
}