const express = require('express');
const pool = require('./config/db')
const cors = require('cors');
require('dotenv').config();
const memberRoutes = require('./routes/memberRoutes');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/member', memberRoutes);

app.get('/' , (req,res) => {
    res.json({message: "Berhasil Koneksi"})
});

app.listen(PORT,() => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
})