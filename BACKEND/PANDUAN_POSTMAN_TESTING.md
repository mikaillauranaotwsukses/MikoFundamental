# 📮 PANDUAN LENGKAP PENGUJIAN API & MIDDLEWARE MENGGUNAKAN POSTMAN

**Target:** Mempelajari cara menguji API, pengiriman data (CRUD), dan pemeriksaan Middleware Autentikasi (Bearer Token) secara profesional menggunakan aplikasi Postman.

---

## ⚡ CARA CEPAT (IMPORT 1-KLIK KE POSTMAN)

Saya telah membuatkan file koleksi siap pakai di proyek Anda:  
📁 [postman_collection.json](file:///c:/PROJECT%20MIKAIL%20V2/MIKO%20BELAJAR%20FUNDAMENTAL/BACKEND/postman_collection.json)

### Cara Memasukkannya ke Postman:
1. Buka aplikasi **Postman**.
2. Klik tombol **Import** (di pojok kiri atas jendela Postman).
3. Pilih atau *drag & drop* file `postman_collection.json` dari folder proyek `BACKEND`.
4. Selesai! Seluruh folder pengujian (CRUD, Anatomi HTTP, Middleware, Status Codes) sudah otomatis tersusun rapi di tab **Collections** sebelah kiri!

---

## 🛠️ PANDUAN MANUAL: LANGKAH DEMI LANGKAH

Jika Anda ingin belajar membuat request sendiri dari nol di Postman, ikuti panduan detail di bawah ini:

---

### BAGIAN 1: Menguji Operasi CRUD (REST API)

Pastikan server backend Anda sedang berjalan di `http://localhost:3000`.

```
[ POSTMAN ] ───(HTTP Request)───▶ [ SERVER EXPRESS :3000 ] ───▶ [ data/items.json ]
```

---

#### 1. [GET] Mengambil Semua Data Items
- **Method:** Pilih `GET` dari dropdown.
- **URL:** Masukkan `http://localhost:3000/api/items`
- **Aksi:** Klik tombol biru **Send**.
- **Hasil yang Diharapkan:**
  - Status: `200 OK`
  - Body (JSON): Daftar seluruh item yang ada di database.

---

#### 2. [GET] Menguji Query Params (Pencarian & Filter)
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/items`
- **Di Postman:** Klik tab **Params** (di bawah kolom URL).
  - Masukkan Key: `search`, Value: `HTTP`
  - Masukkan Key: `completed`, Value: `true`
  - *(Perhatikan URL otomatis berubah menjadi: `http://localhost:3000/api/items?search=HTTP&completed=true`)*
- **Aksi:** Klik **Send**.
- **Hasil yang Diharapkan:** Server hanya mengembalikan data yang memiliki judul "HTTP" dan status selesai.

---

#### 3. [POST] Menambah Data Baru Menggunakan JSON Body
- **Method:** Pilih `POST` dari dropdown.
- **URL:** `http://localhost:3000/api/items`
- **Langkah Mengisi Data di Postman:**
  1. Klik tab **Body** (di bawah kolom URL).
  2. Pilih opsi **raw**.
  3. Di ujung kanan, ganti dropdown **Text** menjadi **JSON**.
  4. Ketik JSON berikut di dalam editor teks:
     ```json
     {
       "title": "Belajar Postman API Testing",
       "category": "Testing",
       "completed": false
     }
     ```
- **Aksi:** Klik **Send**.
- **Hasil yang Diharapkan:**
  - Status: `201 Created`
  - Body balasan: Data baru yang berhasil dibuat beserta ID barunya.

---

#### 4. [PUT] Memperbarui Data Item Berdasarkan ID
- **Method:** Pilih `PUT`.
- **URL:** `http://localhost:3000/api/items/1` *(artinya kita ingin mengubah item ID #1)*.
- **Tab Body (raw ➔ JSON):**
  ```json
  {
    "title": "Belajar Postman API Testing (Sudah Berhasil)",
    "completed": true
  }
  ```
- **Aksi:** Klik **Send**.
- **Hasil yang Diharapkan:** Status `200 OK` dan data item ID #1 berubah.

---

#### 5. [DELETE] Menghapus Data Item Berdasarkan ID
- **Method:** Pilih `DELETE`.
- **URL:** `http://localhost:3000/api/items/3` *(menghapus item ID #3)*.
- **Aksi:** Klik **Send**.
- **Hasil yang Diharapkan:** Status `200 OK` dan pesan konfirmasi penghapusan data.

---

### BAGIAN 2: Menguji Middleware & Autentikasi (Bearer Token)

Middleware otentikasi di file [server.js](file:///c:/PROJECT%20MIKAIL%20V2/MIKO%20BELAJAR%20FUNDAMENTAL/BACKEND/server.js) bertugas menjaga endpoint rahasia (`/api/auth-demo/protected`).

```
[ Request Masuk ] ➔ [ Middleware: authenticateToken ] ➔ [ Controller / Data Rahasia ]
```

Mari kita uji 4 skenario keamanan di Postman:

---

#### Skenario 1: Mengakses Endpoint Rahasia Tanpa Token (Uji 401 Unauthorized)
1. **Method:** `GET`
2. **URL:** `http://localhost:3000/api/auth-demo/protected`
3. Jangan atur Authorization apa pun.
4. Klik **Send**.
5. **Amati Hasilnya:**
   - Status: **`401 Unauthorized`**
   - Respon JSON:
     ```json
     {
       "status": "error",
       "code": 401,
       "message": "Akses Ditolak! Header 'Authorization: Bearer <token>' tidak ditemukan."
     }
     ```
   - *Artinya: Middleware berhasil menghadang request yang tidak membawa tanda pengenal!*

---

#### Skenario 2: Login untuk Mendapatkan Token Resmi
1. **Method:** `POST`
2. **URL:** `http://localhost:3000/api/auth-demo/login`
3. Tab **Body** ➔ **raw** ➔ **JSON**:
   ```json
   {
     "username": "miko",
     "password": "rahasia123"
   }
   ```
4. Klik **Send**.
5. **Amati Hasilnya:**
   - Status: **`200 OK`**
   - Server memberikan token: `"secret-miko-token-2026"`.
   - **Salin (copy) string token tersebut.**

---

#### Skenario 3: Mengakses Endpoint Rahasia Menggunakan Bearer Token (Uji 200 OK)
1. Buat tab request baru di Postman.
2. **Method:** `GET`
3. **URL:** `http://localhost:3000/api/auth-demo/protected`
4. **Cara Memasang Token di Postman (Pilih salah satu):**
   - **Cara A (Melalui Tab Authorization - Direkomendasikan):**
     1. Klik tab **Authorization** (di sebelah tab Params).
     2. Pada dropdown **Type**, pilih **Bearer Token**.
     3. Pada kolom **Token**, paste: `secret-miko-token-2026`.
   - **Cara B (Melalui Tab Headers Manual):**
     1. Klik tab **Headers**.
     2. Tambahkan baris baru:
        - Key: `Authorization`
        - Value: `Bearer secret-miko-token-2026`
5. Klik **Send**.
6. **Amati Hasilnya:**
   - Status: **`200 OK`**
   - Respon JSON:
     ```json
     {
       "status": "success",
       "message": "Selamat! Anda berhasil mengakses Protected Route.",
       "userDataFromToken": {
         "id": 101,
         "username": "miko_developer",
         "role": "Fullstack Engineer"
       }
     }
     ```

---

#### Skenario 4: Menguji Token Palsu / Kadaluarsa (Uji 403 Forbidden)
1. Pada tab **Authorization**, ubah token menjadi teks sembarang: `token-ngawur-123`.
2. Klik **Send**.
3. **Amati Hasilnya:**
   - Status: **`403 Forbidden`**
   - Pesan: `"Token tidak valid atau kadaluarsa!"`.

---

#### Skenario 5: Menguji Middleware Delay (Latency)
1. **Method:** `GET`
2. **URL:** `http://localhost:3000/api/middleware-demo/latency?delay=1500`
3. Klik **Send**.
4. **Amati Waktu Respon di Postman:**
   - Lihat di pojok kanan atas bagian respon: **Time: ~1500 ms (1.5 detik)**.
   - Ini membuktikan middleware asynchronous menahan request selama 1.5 detik sebelum memanggil `next()`.

---

### BAGIAN 3: Menulis Tes Otomatis (Automated Tests) di Postman

Postman memiliki fitur canggih untuk memverifikasi apakah API Anda berfungsi dengan benar secara otomatis.

1. Buka request `[GET] http://localhost:3000/api/items`.
2. Klik tab **Scripts** atau **Tests** (di bawah kolom URL).
3. Masukkan script pengujian berikut:

```javascript
// Tes 1: Pastikan Status Code adalah 200
pm.test("Status code harus 200 OK", function () {
    pm.response.to.have.status(200);
});

// Tes 2: Pastikan Response time di bawah 500ms
pm.test("Waktu respon cepat (< 500ms)", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Tes 3: Pastikan ada properti 'data' berupa Array
pm.test("Format data harus berupa Array", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.data).to.be.an("array");
});
```

4. Klik **Send**.
5. Lihat tab **Test Results** di bagian respon bawah. Anda akan melihat:
   - ✅ `PASS: Status code harus 200 OK`
   - ✅ `PASS: Waktu respon cepat (< 500ms)`
   - ✅ `PASS: Format data harus berupa Array`

---

*Panduan ini tersimpan di komputer Anda di file `PANDUAN_POSTMAN_TESTING.md`. Selamat bereksperimen di Postman!*
