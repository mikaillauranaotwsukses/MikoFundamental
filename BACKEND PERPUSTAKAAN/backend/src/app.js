const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
require('dotenv').config();
const bookRoutes = require('./routes/bookRoutes')
const memberRoutes = require('./routes/memberRoutes');
const borrowingRoutes = require('./routes/borrowingRoutes');

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/books', bookRoutes);
app.use('/api/member', memberRoutes);
app.use('/api/borrow', borrowingRoutes);

app.get('/', (req,res) => {
    res.json({massage: "Berhasil Koneksi Database POSTGRES"});
});

app.listen(PORT, () => {
    console.log(`Server Berjalan di http:/localhost:${PORT}`);
})