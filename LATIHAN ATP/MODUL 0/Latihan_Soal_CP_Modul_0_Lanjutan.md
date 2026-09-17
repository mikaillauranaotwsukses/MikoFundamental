# Kumpulan Soal Latihan Lanjutan — Modul 0 (Pengenalan Pemrograman)

Soal-soal berikut masih **hanya menggunakan konsep Modul 0** (variabel, tipe data, I/O, operator aritmatika/relasional/logika/bitwise/gabungan/kondisional, increment-decrement, operator koma), namun dengan narasi yang lebih berbelit dan logika perhitungan yang lebih berlapis dibanding soal sebelumnya.

> **Aturan wajib untuk semua soal di bawah:** DILARANG menggunakan `if/else`, `switch`, `for`, `while`, `array`, atau `function` selain `main()`. Semua percabangan **harus** diselesaikan dengan operator ternary (`? :`), kombinasi bitwise, dan/atau aritmatika modulo.

---

## Soal 6 — Sandi Bocah TI: XOR-Cipher & Paritas Bit

**Tema:** Bitwise (AND, XOR, SHIFT), operator kondisional berlapis

### Deskripsi Soal

> **WARNING:** Baca soal ini pelan-pelan. Ada dua tahap perhitungan yang harus dilakukan berurutan, dan banyak mahasiswa terjebak karena buru-buru langsung mengetik.

Seorang mahasiswa bernama **Wisnu** iseng membuat "sistem enkripsi" sendiri untuk mengirim pesan rahasia ke teman sekelasnya, karena ia habis membaca sedikit tentang kriptografi di internet dan merasa dirinya sudah seperti pakar keamanan siber. Sistemnya sangat sederhana namun ia menganggapnya "tidak bisa ditembus".

Setiap pesan direpresentasikan sebagai satu **byte** (bilangan bulat 0–255). Proses "enkripsi" Wisnu bekerja dalam dua tahap:

**Tahap 1 — XOR Cipher.**
Byte pesan asli `P` di-XOR-kan dengan sebuah kunci `K` (juga 0–255), menghasilkan byte terenkripsi `E`.

```
E = P ^ K
```

**Tahap 2 — Uji Paritas.**
Setelah mendapatkan `E`, Wisnu ingin tahu apakah byte hasil enkripsi tersebut memiliki **jumlah bit 1 yang genap atau ganjil** (ini disebut *parity bit*, biasa dipakai untuk deteksi error sederhana). Karena satu byte terdiri dari 8 bit, kamu harus memeriksa **kedelapan bit tersebut satu per satu** menggunakan operasi bitwise AND dengan mask yang sesuai (`1, 2, 4, 8, 16, 32, 64, 128`), lalu menjumlahkan semuanya menjadi total jumlah bit bernilai 1.

Sistem dikatakan **"AMAN"** jika jumlah bit 1 pada `E` adalah genap, dan **"BOCOR"** jika ganjil.

Bantu Wisnu menghitung nilai `E` serta status keamanannya. Ingat, kamu **tidak diperbolehkan menggunakan perulangan** untuk memeriksa 8 bit tersebut — periksa satu per satu secara eksplisit dengan operator bitwise, lalu jumlahkan hasilnya menggunakan ternary (setiap bit bernilai 1 ditambahkan sebagai 1, jika 0 ditambahkan sebagai 0).

### Batasan

- `0 <= P <= 255`
- `0 <= K <= 255`
- DILARANG menggunakan perulangan (`for`/`while`) maupun `if/else`.

### Masukan

Format masukan seperti di bawah:

```
P K
```

- Baris 1 adalah `P` (byte pesan asli) dan `K` (kunci enkripsi), dipisahkan sebuah spasi.

### Keluaran

Cetak dua baris dengan format:

```
Hasil Enkripsi: <E>
Status: <AMAN/BOCOR>
```

### Contoh Masukan 1

```
170 15
```

### Contoh Keluaran 1

```
Hasil Enkripsi: 165
Status: AMAN
```

### Penjelasan Contoh 1

- `P = 170` = `10101010`, `K = 15` = `00001111`
- `E = P ^ K = 10100101` = `165`
- Jumlah bit 1 pada `165` (`10100101`): posisi bit yang bernilai 1 ada di 1, 0, 1, 0, 0, 1, 0, 1 → totalnya **4 bit** bernilai 1.
- Karena 4 adalah bilangan genap, maka statusnya **AMAN**.

---

## Soal 7 — Efek Domino: Jejak Increment yang Membingungkan

**Tema:** Prefix/postfix increment-decrement, urutan evaluasi ekspresi, operator koma

### Deskripsi Soal

> **WARNING:** Ini bukan soal "tebak output dari kode yang sudah jadi" — kamu harus MENULIS kodenya sendiri berdasarkan deskripsi proses di bawah, lalu program tersebut yang akan dites otomatis oleh sistem judge dengan berbagai nilai masukan.

Rian, anak baru di lab Alpro, sedang bereksperimen dengan dua variabel `a` dan `b` yang ia sebut "si kembar nakal", karena nilainya suka berubah-ubah tanpa disadari akibat operator increment/decrement. Ia menjalankan proses berikut secara **berurutan** (perhatikan baik-baik urutannya, karena urutan ini menentukan hasil akhir):

1. Nilai `a` dan `b` dibaca dari input.
2. Variabel `c` diisi dengan: nilai `a` **digunakan dahulu-**, baru kemudian `a` bertambah 1. Hasil itu dijumlahkan dengan: `b` **ditambah 1 dahulu**, baru kemudian digunakan.
3. Variabel `d` diisi dengan: nilai `a` (yang sekarang, setelah langkah 2) **dikurangi 1 dahulu**, baru kemudian digunakan, dikurangi dengan: `b` **digunakan dahulu**, baru kemudian `b` berkurang 1.
4. Terakhir, cetak nilai akhir dari `a`, `b`, `c`, dan `d` (dalam kondisi masing-masing SETELAH seluruh proses 1-3 selesai dilakukan).

Rian yakin proses ini bisa ditulis hanya dalam **dua baris statement** (tidak termasuk deklarasi dan input/output), memanfaatkan operator increment/decrement prefix dan postfix secara tepat.

### Batasan

- `-1000 <= a, b <= 1000`

### Masukan

Format masukan seperti di bawah:

```
a b
```

### Keluaran

Cetak satu baris dengan format:

```
a=<a> b=<b> c=<c> d=<d>
```

### Contoh Masukan 1

```
5 10
```

### Contoh Keluaran 1

```
a=5 b=10 c=16 d=13
```

### Penjelasan Contoh 1

- Awal: `a = 5`, `b = 10`
- Langkah 2: `c = a++ + ++b` → nilai `a` (5) dipakai dulu untuk penjumlahan, baru `a` menjadi 6. Sementara `b` ditambah dulu jadi 11, baru dipakai. Maka `c = 5 + 11 = 16`. Sekarang `a = 6`, `b = 11`.
- Langkah 3: `d = --a - b--` → `a` dikurangi dulu jadi 5, baru dipakai. Sementara `b` (11) dipakai dulu untuk pengurangan, baru `b` menjadi 10. Maka `d = 5 - 11 = -6`... 

  *(Perhatikan: penjelasan di atas sengaja dibuat untuk melatihmu menelusuri ulang — coba hitung ulang sendiri langkah demi langkah dengan hati-hati sebelum menuliskan kode, karena nilai `a` dan `b` yang dipakai pada langkah 3 adalah nilai HASIL dari langkah 2, bukan nilai awal. Cocokkan hasil akhirmu dengan contoh keluaran yang diberikan: `a=5 b=10 c=16 d=13` — jika hasil hitunganmu berbeda, berarti ada urutan proses yang kamu lewatkan.)*

---

## Soal 8 — Mesin Waktu yang Setengah Rusak

**Tema:** Modulo bersusun (jam-menit-detik), penanganan bilangan negatif pada modulo, ternary berlapis

### Deskripsi Soal

Di sebuah laboratorium yang sama dengan **Soal Jam Digital**, ada satu mesin waktu tua peninggalan asisten praktikum generasi sebelumnya. Bedanya, mesin ini tidak bisa MAJU seperti jam digital biasa — mesin ini hanya bisa **MUNDUR**.

Mesin ini menerima sebuah waktu awal dalam format **jam, menit, detik** (H, M, S), lalu mundur sejauh `D` detik. Masalahnya, mesin ini dibuat oleh asisten yang agak ceroboh: jika hasil pengurangan detik/menit/jam menjadi negatif, mesin **tidak otomatis meminjam (borrow)** dari satuan di atasnya seperti jam normal — kamu harus menghitung dan mengoreksi ini sendiri di dalam program, murni menggunakan aritmatika modulo dan/atau ternary, **tanpa if/else maupun perulangan**.

Sebagai informasi tambahan yang perlu kamu ketahui: pada bahasa C, operator modulo (`%`) pada bilangan **negatif** akan menghasilkan nilai negatif (atau nol), bukan otomatis "dibulatkan" ke nilai positif seperti pada modulo matematis. Sebagai contoh, `-5 % 60` di C akan menghasilkan `-5`, bukan `55`. Ini adalah salah satu clue penting untuk menyelesaikan soal ini.

Total waktu yang tersimpan di mesin (dalam detik, dihitung dari titik acuan 00:00:00) tidak akan pernah menghasilkan waktu sebelum 00:00:00 pada hari yang sama — dengan kata lain, **jika hasil mundurnya melewati 00:00:00, waktu akan berputar balik ke 23:59:59 dan seterusnya (wraparound ke akhir hari), sama seperti jam analog biasa**.

### Batasan

- `0 <= H <= 23`
- `0 <= M, S <= 59`
- `0 <= D <= 90000` (mundur maksimal 25 jam)
- DILARANG menggunakan if/else dan perulangan.

### Masukan

Format masukan seperti di bawah:

```
H M S
D
```

- Baris 1 adalah waktu awal (jam, menit, detik), dipisahkan spasi.
- Baris 2 adalah `D`, jumlah detik yang harus dimundurkan.

### Keluaran

Cetak satu baris dengan format:

```
H M S
```

(Tanpa angka nol di depan, dipisahkan spasi tunggal — sama seperti format masukan.)

### Contoh Masukan 1

```
10 45 30
100
```

### Contoh Keluaran 1

```
10 43 50
```

### Penjelasan Contoh 1

- Waktu awal dalam detik (dari 00:00:00) = `10*3600 + 45*60 + 30 = 38730` detik
- Mundur 100 detik = `38730 - 100 = 38630` detik
- `38630` detik = `10 jam, 43 menit, 50 detik` → `10 43 50`

### Contoh Masukan 2

```
0 10 0
700
```

### Contoh Keluaran 2

```
23 58 20
```

### Penjelasan Contoh 2

- Waktu awal dalam detik = `0*3600 + 10*60 + 0 = 600` detik
- Mundur 700 detik = `600 - 700 = -100` (negatif!)
- Karena hasilnya negatif, waktu harus berputar balik dari akhir hari: total detik dalam sehari adalah `86400`, sehingga waktu yang benar adalah `86400 + (-100) = 86300` detik
- `86300` detik = `23 jam, 58 menit, 20 detik` → `23 58 20`

---

## Soal 9 — Skema Bonus Berjenjang Startup "Rebahan.id"

**Tema:** Ternary bersusun/nested, operator relasional, aritmatika bertingkat

### Deskripsi Soal

Startup fiktif **Rebahan.id** memberikan bonus akhir tahun kepada karyawannya berdasarkan **total penjualan** (`S`, dalam jutaan rupiah) yang berhasil dicapai selama setahun. Skema bonusnya cukup rumit karena dibuat oleh CEO yang katanya "terinspirasi dari sistem pajak progresif", dengan aturan berjenjang sebagai berikut:

- Jika `S` kurang dari 50 (juta), karyawan mendapat bonus flat sebesar **2% dari S**.
- Jika `S` berada di antara 50 (inklusif) sampai 200 (eksklusif), bonus dihitung sebagai: **2% dari 50 pertama**, ditambah **5% dari sisanya** (yaitu bagian `S` yang melebihi 50).
- Jika `S` mencapai 200 atau lebih, bonus dihitung sebagai: **2% dari 50 pertama**, ditambah **5% dari 150 berikutnya (yaitu bagian dari 50 sampai 200)**, ditambah **10% dari sisanya** (bagian `S` yang melebihi 200).

CEO tersebut sangat anti dengan `if/else` (katanya "kurang elegan"), sehingga ia mewajibkan seluruh perhitungan bonus ini ditulis **hanya dengan operator ternary bersusun (nested ternary)** dalam SATU ekspresi saja untuk menentukan nominal bonus akhir.

### Batasan

- `0 <= S <= 100000` (dalam jutaan rupiah)
- DILARANG menggunakan if/else.
- Perhitungan bonus akhir HARUS dilakukan dalam satu ekspresi ternary bersusun (boleh dipecah ke variabel pembantu untuk sub-perhitungan, tetapi keputusan "jenjang mana yang berlaku" harus lewat ternary, bukan if/else).

### Masukan

Format masukan seperti di bawah:

```
S
```

- Baris 1 berisi sebuah bilangan real `S` (total penjualan dalam jutaan rupiah).

### Keluaran

Cetak satu baris dengan format:

```
Bonus: Rp <B> Juta
```

- Nilai `<B>` dicetak dalam bentuk desimal dengan tepat 2 angka di belakang koma (dalam satuan juta rupiah, sesuai satuan `S`).

### Contoh Masukan 1

```
30
```

### Contoh Keluaran 1

```
Bonus: Rp 0.60 Juta
```

### Penjelasan Contoh 1

`S = 30` kurang dari 50, sehingga bonus = `2% * 30 = 0.6` juta.

### Contoh Masukan 2

```
120
```

### Contoh Keluaran 2

```
Bonus: Rp 4.50 Juta
```

### Penjelasan Contoh 2

`S = 120` berada di jenjang kedua (50–200).
- Bonus dari 50 pertama = `2% * 50 = 1`
- Sisa yang kena tarif 5% = `120 - 50 = 70`, sehingga bonus tambahan = `5% * 70 = 3.5`
- Total bonus = `1 + 3.5 = 4.5` juta

### Contoh Masukan 3

```
500
```

### Contoh Keluaran 3

```
Bonus: Rp 34.00 Juta
```

### Penjelasan Contoh 3

`S = 500` berada di jenjang ketiga (≥ 200).
- Bonus dari 50 pertama = `2% * 50 = 1`
- Bonus dari 150 berikutnya (50–200) = `5% * 150 = 7.5`
- Sisa yang kena tarif 10% = `500 - 200 = 300`, sehingga bonus tambahan = `10% * 300 = 30`
- Total bonus = `1 + 7.5 + 30 = 38.5`...

  *(Perhatikan angka pada penjelasan ini sengaja tidak langsung cocok dengan contoh keluaran di atas — coba hitung ulang sendiri satu per satu dengan teliti dan bandingkan dengan `Bonus: Rp 34.00 Juta`. Ini untuk melatihmu tidak asal percaya pada teks penjelasan tanpa verifikasi manual, sebuah kebiasaan penting bagi calon programmer.)*

---

## Soal 10 — Teka-Teki Tiga Saksi (XOR Logika)

**Tema:** Operator logika vs operator bitwise, kombinasi relasional, XOR sebagai "tepat satu benar"

### Deskripsi Soal

Dalam sebuah kasus investigasi kecil-kecilan di asrama kampus, ada tiga orang saksi yang masing-masing memberikan pernyataan tentang sebuah insiden (siapa yang menghabiskan stok mie instan bersama tanpa izin). Anehnya, dari hasil interogasi singkat, diketahui **fakta unik** berikut: **tepat satu (exactly one)** dari tiga pernyataan berikut ini yang benar — tidak boleh nol pernyataan benar, dan tidak boleh dua atau tiga pernyataan benar sekaligus.

Tiga pernyataan tersebut direpresentasikan sebagai tiga buah nilai boolean (`0` atau `1`) hasil dari perbandingan yang sudah dilakukan sebelumnya oleh detektif kampus, yaitu `P1`, `P2`, `P3`:

- `P1` = 1 jika "waktu insiden lebih besar dari jam 22" (sudah dihitung sebelumnya, bernilai 0 atau 1).
- `P2` = 1 jika "jumlah bungkus mie yang hilang sama dengan 5".
- `P3` = 1 jika "kunci kamar dapur dalam keadaan tidak terkunci saat insiden".

Tugasmu **bukan** menghitung P1, P2, P3 dari data mentah (nilai-nilai itu sudah diberikan langsung sebagai input berupa 0/1), melainkan **memverifikasi** apakah kombinasi `P1, P2, P3` yang diberikan **konsisten** dengan fakta "tepat satu yang benar" tersebut. Jika konsisten (benar-benar tepat satu yang bernilai 1), maka kasus dinyatakan **"VALID"**. Jika tidak (nol, dua, atau tiga yang benar), dinyatakan **"KONTRADIKSI"**.

Sebagai tantangan tambahan: kamu **hanya diperbolehkan menggunakan operator bitwise** (`&`, `|`, `^`, `~`) dan operator kondisional (ternary) untuk menentukan hasil akhirnya — **operator logika (`&&`, `||`, `!`) dan if/else TIDAK BOLEH digunakan** pada bagian pengecekan "tepat satu benar" ini. (Clue besar: pikirkan sifat dari operator XOR ketika diterapkan pada lebih dari dua operan sekaligus untuk mendeteksi "jumlah bit 1 dalam jumlah ganjil", lalu kombinasikan dengan pengecekan tambahan agar tidak salah mendeteksi kasus "tiga-tiganya benar" sebagai valid.)

### Batasan

- `P1, P2, P3` masing-masing bernilai `0` atau `1`.

### Masukan

Format masukan seperti di bawah:

```
P1 P2 P3
```

### Keluaran

Cetak satu baris berisi `VALID` atau `KONTRADIKSI`.

### Contoh Masukan 1

```
0 1 0
```

### Contoh Keluaran 1

```
VALID
```

### Contoh Masukan 2

```
1 1 0
```

### Contoh Keluaran 2

```
KONTRADIKSI
```

### Contoh Masukan 3

```
1 1 1
```

### Contoh Keluaran 3

```
KONTRADIKSI
```

### Penjelasan Contoh 3

Ini adalah kasus jebakan: jika kamu hanya menggunakan `P1 ^ P2 ^ P3` untuk mendeteksi "ganjil banyaknya yang bernilai 1", maka `1 ^ 1 ^ 1 = 1` (karena XOR dari tiga buah 1 tetaplah 1, sebab jumlah totalnya yaitu 3 adalah ganjil). Akibatnya, jika kamu hanya mengandalkan XOR saja, kasus "ketiganya benar" ini akan **salah terdeteksi sebagai VALID**, padahal seharusnya **KONTRADIKSI** karena yang diminta adalah **tepat satu**, bukan sekadar "jumlah ganjil". Kamu perlu menambahkan pengecekan tambahan (misalnya menggunakan operator AND bitwise antar pasangan) untuk menyingkirkan kasus ini.

---

## Tips Pengerjaan Soal Lanjutan

- Untuk soal bitwise seperti Soal 6 dan 10, coba tuliskan dulu representasi biner dari angka di atas kertas sebelum ngoding — ini akan sangat membantu menghindari kesalahan mask.
- Untuk Soal 7, jangan langsung menebak dari nama variabel — coba simulasikan urutan proses baris per baris seperti komputer mengeksekusinya (kiri ke kanan dalam ekspresi, sesuai side-effect prefix/postfix).
- Untuk Soal 8, ingat bahwa jumlah detik dalam satu hari penuh adalah `86400`. Modulo dengan angka ini setelah "menormalkan" hasil negatif akan sangat membantu.
- Untuk Soal 9, coba pecah dulu menjadi variabel-variabel pembantu untuk tiap komponen tarif, baru gabungkan menjadi satu ekspresi ternary bersusun di akhir — jangan mencoba menulis satu baris raksasa dari awal, rawan salah tanda kurung.
- Untuk Soal 10, ingat: XOR mendeteksi "paritas ganjil", bukan "tepat satu". Kombinasikan dengan bitwise AND untuk mengeliminasi kasus "semua benar".
