const pool = require('../config/db');

const getAllMember = async (req,res) => {
    try{
        const result = await pool.query("SELECT * FROM members ORDER BY id ASC");
        res.json(result.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).json({error : "Terjadi Kesalahan Server"});
    }
}

const getMemberById = async (req,res) => {
    try{
        const {id} = req.params;
        const result = await pool.query("SELECT * FROM members WHERE id=$1 RETURNING *", [id]);

        if(result.rows.length === 0){
            res.status(404).json({error: "Data tidak ditemukan"});
        }
        res.json(result.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).json({error : "Terjadi Kesalahan Server"});
    }
}

const createMember = async (req,res) => {
    try{
        const{id} = req.params;
        const { name,email } = req.body;

        if(!name || !email){
            return res.status(404).json({error: "Email dan Nama harus diisi"});
        }
        const result = await pool.query("INSERT INTO members (name,email) VALUES ($1,$2) RETURNING *", [name,email]);
        res.json(result.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).json({error : "Terjadi Kesalahan Server"});
    }
}

const updateMember = async (req,res) => {
    try{
        const{id} = req.params;
        const { name,email } = req.body;

        if(!name || !email){
            return res.status(404).json({error: "Email dan Nama harus diisi"});
        }
        
        const result = await pool.query("UPDATE members SET name= $1,email=$2 WHERE id=$3 RETURNING *", [name,email,id]);
        if(result.rows.length === 0){
            res.status(404).json({error: "Data tidak ditemukan"});
        }
        res.json(result.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).json({error : "Terjadi Kesalahan Server"});
    }
};

const deleteMember = async (req,res) => {
    try{
        const{id} = req.params;
        
        const result = await pool.query("DELETE FROM members WHERE id=$1 RETURNING *", [id]);
        if(result.rows.length === 0){
            res.status(404).json({error: "Data tidak ditemukan"});
        }
        res.json("Member Berhasil dihapus");
    }catch(err){
        console.error(err.message);
        res.status(500).json({error : "Terjadi Kesalahan Server"});
    }
};

module.exports ={
    getAllMember,
    getMemberById,
    updateMember,
    createMember,
    deleteMember
};