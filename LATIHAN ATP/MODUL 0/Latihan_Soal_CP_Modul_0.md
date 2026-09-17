# Kumpulan Soal Latihan — Modul 0 (Pengenalan Pemrograman)

Soal-soal ini dirancang mengikuti gaya soal praktikum (AmbaCar, Kasih Sayang Ayah, Jam Digital) dan **hanya menggunakan konsep yang ada di Modul 0**:
variabel, tipe data dasar, `printf`/`scanf`, operator aritmatika, increment/decrement, relasional, logika, bitwise, operator gabungan, dan operator kondisional (ternary).

> **Catatan umum:** Semua soal di bawah **tidak boleh menggunakan `if/else`, `switch`, `for`, `while`, atau `array`**, karena konsep-konsep tersebut belum diajarkan di Modul 0. Gunakan operator ternary (`? :`) jika diperlukan sebuah pengambilan keputusan.

---

## Soal 1 — Kalkulator Kasir Warkop

**Tema:** Operator aritmatika, operator gabungan, format output

### Deskripsi Soal

Kabayan baru saja membuka usaha warkop kecil-kecilan bernama **Warkop Sadewa**. Setiap pelanggan yang datang akan memesan sejumlah `Q` gelas kopi, dengan harga satu gelas kopi adalah `H` rupiah.

Kabayan menerapkan aturan berikut untuk setiap transaksi:

1. Total harga sebelum pajak dihitung dari `Q * H`.
2. Warkop Sadewa mengenakan pajak restoran sebesar 10% dari total harga.
3. Setelah pajak, pelanggan juga dikenakan biaya layanan (*service charge*) tetap sebesar `Rp2000`.

Bantu Kabayan membuat program untuk menghitung total tagihan akhir yang harus dibayar pelanggan.

### Batasan

- `1 <= Q <= 100`
- `1000 <= H <= 50000`

### Masukan

Format masukan seperti di bawah:

```
H Q
```

- Baris 1 adalah `H` (harga satu gelas kopi) dan `Q` (jumlah gelas yang dipesan), dipisahkan oleh sebuah spasi.

### Keluaran

Cetak satu baris dengan format:

```
Total Tagihan: Rp <X>
```

- Nilai `<X>` dicetak dalam bentuk desimal dengan tepat 2 angka di belakang koma.

### Contoh Masukan 1

```
5000 3
```

### Contoh Keluaran 1

```
Total Tagihan: Rp 18500.00
```

### Penjelasan Contoh 1

- Total sebelum pajak = `5000 * 3` = `15000`
- Pajak 10% = `1500`
- Total setelah pajak = `15000 + 1500` = `16500`
- Total akhir = `16500 + 2000` (service charge) = `18500`

---

## Soal 2 — Status Karakter Game

**Tema:** Operator bitwise, operator kondisional (ternary)

### Deskripsi Soal

Danu sedang membuat game RPG sederhana. Setiap karakter dalam game memiliki satu variabel `status` bertipe bilangan bulat yang menyimpan kondisi karakter tersebut dalam bentuk **bit flag**, dengan aturan sebagai berikut:

- **Bit 0** (nilai 1): Menunjukkan apakah karakter dalam kondisi *Poisoned* (1 = Poisoned, 0 = Sehat).
- **Bit 1** (nilai 2): Menunjukkan apakah karakter sedang *Shielded* atau terlindungi (1 = Shielded, 0 = Tidak Shielded).
- **Bit 2** (nilai 4): Menunjukkan apakah karakter dalam mode *Berserk* (1 = Berserk, 0 = Normal).

Tugasmu adalah membaca nilai `status` dan menampilkan kondisi karakter berdasarkan ketiga bit tersebut menggunakan operator bitwise.

### Batasan

- `0 <= status <= 7`
- **TIDAK BOLEH menggunakan if/else.** Gunakan operator ternary untuk menentukan teks yang dicetak.

### Masukan

Format masukan seperti di bawah:

```
status
```

- Baris 1 berisi sebuah bilangan bulat `status`.

### Keluaran

Cetak tiga baris dengan format:

```
Poisoned: <Ya/Tidak>
Shielded: <Ya/Tidak>
Berserk: <Ya/Tidak>
```

### Contoh Masukan 1

```
5
```

### Contoh Keluaran 1

```
Poisoned: Ya
Shielded: Tidak
Berserk: Ya
```

### Penjelasan Contoh 1

`status = 5` dalam biner adalah `101`.

```
101 (status = 5)
& 001 (mask = 1)
-----
001 -> hasil 1 (TRUE) -> Poisoned: Ya

101 (status = 5)
& 010 (mask = 2)
-----
000 -> hasil 0 (FALSE) -> Shielded: Tidak

101 (status = 5)
& 100 (mask = 4)
-----
100 -> hasil 4 (TRUE) -> Berserk: Ya
```

---

## Soal 3 — Antrean Nomor Loket

**Tema:** Operator modulo, operator kondisional (ternary), tanpa perulangan

### Deskripsi Soal

Sebuah kantor layanan publik menggunakan mesin nomor antrean yang hanya memiliki nomor urut dari **1 sampai 50**. Setiap kali ada pelanggan baru, nomor antrean akan bertambah satu dari nomor pelanggan sebelumnya. Namun, karena keterbatasan mesin, setelah nomor mencapai 50, nomor antrean berikutnya akan **kembali ke nomor 1** (bukan 0).

Diberikan nomor antrean pelanggan saat ini `N`, tentukan nomor antrean yang akan diberikan kepada pelanggan berikutnya.

### Batasan

- `1 <= N <= 50`
- **TIDAK BOLEH menggunakan if/else.** Gunakan operator modulo dan/atau ternary.

### Masukan

Format masukan seperti di bawah:

```
N
```

- Baris 1 berisi sebuah bilangan bulat `N`, yaitu nomor antrean pelanggan saat ini.

### Keluaran

Cetak satu baris berisi nomor antrean pelanggan berikutnya.

### Contoh Masukan 1

```
23
```

### Contoh Keluaran 1

```
24
```

### Contoh Masukan 2

```
50
```

### Contoh Keluaran 2

```
1
```

### Penjelasan Contoh 2

Karena nomor antrean maksimal adalah 50, setelah nomor 50 tercapai, nomor berikutnya harus kembali ke 1, bukan 0. Perhatikan bahwa operasi modulo biasa (`N % 50`) akan menghasilkan `0` untuk `N = 50`, sehingga dibutuhkan penyesuaian menggunakan ternary agar hasilnya tetap `1`.

---

## Soal 4 — Tukar Nilai Tanpa Variabel Bantuan

**Tema:** Operator gabungan, operator aritmatika, operator koma

### Deskripsi Soal

Salsa sedang belajar tentang operator pada bahasa C. Dosennya memberi tantangan: tukar nilai dari dua buah variabel bilangan bulat `A` dan `B`, **tanpa menggunakan variabel bantuan (variabel ketiga)**. Salsa hanya boleh menggunakan operator aritmatika dan/atau operator gabungan pada kedua variabel tersebut.

Setelah nilai `A` dan `B` tertukar, cetak juga hasil penjumlahan keduanya sebagai bentuk verifikasi (nilai ini seharusnya tidak berubah baik sebelum maupun sesudah pertukaran).

### Batasan

- `-10000 <= A, B <= 10000`
- **TIDAK BOLEH mendeklarasikan variabel bantuan/ketiga.**

### Masukan

Format masukan seperti di bawah:

```
A B
```

- Baris 1 adalah dua bilangan bulat `A` dan `B`, dipisahkan oleh sebuah spasi.

### Keluaran

Cetak dua baris dengan format:

```
A=<nilai A setelah tukar> B=<nilai B setelah tukar>
Jumlah=<A+B>
```

### Contoh Masukan 1

```
7 15
```

### Contoh Keluaran 1

```
A=15 B=7
Jumlah=22
```

### Penjelasan Contoh 1

- Sebelum tukar: `A = 7`, `B = 15`
- Setelah pertukaran tanpa variabel bantuan (misalnya dengan `A += B; B = A - B; A -= B;`): `A = 15`, `B = 7`
- Jumlah `A + B` tetap `22`, baik sebelum maupun sesudah pertukaran, sebagai bukti pertukaran berjalan benar.

---

## Soal 5 — Konversi Suhu Multi-Skala

**Tema:** Operator aritmatika, tipe data floating, format output presisi

### Deskripsi Soal

Sebuah stasiun cuaca mini mencatat suhu dalam derajat **Celsius (C)**. Untuk keperluan laporan internasional, suhu tersebut perlu dikonversi sekaligus ke dua skala lain: **Fahrenheit (F)** dan **Kelvin (K)**, menggunakan rumus berikut:

```
F = (C * 9 / 5) + 32
K = C + 273.15
```

Buatlah program untuk mengonversi suhu Celsius yang diberikan menjadi Fahrenheit dan Kelvin.

### Batasan

- `-273.15 <= C <= 1000.0`

### Masukan

Format masukan seperti di bawah:

```
C
```

- Baris 1 berisi sebuah bilangan real `C` (suhu dalam Celsius).

### Keluaran

Cetak dua baris dengan format:

```
Fahrenheit: <F>
Kelvin: <K>
```

- Nilai `<F>` dan `<K>` dicetak dalam bentuk desimal dengan tepat 2 angka di belakang koma.

### Contoh Masukan 1

```
25
```

### Contoh Keluaran 1

```
Fahrenheit: 77.00
Kelvin: 298.15
```

### Penjelasan Contoh 1

- `F = (25 * 9 / 5) + 32 = 45 + 32 = 77`
- `K = 25 + 273.15 = 298.15`

---

## Tips Pengerjaan

- Pastikan tipe data yang digunakan sesuai (`int` untuk bilangan bulat, `float`/`double` untuk bilangan real).
- Perhatikan pembagian bilangan bulat (*integer division*) — hasil `9/5` pada tipe `int` akan terpotong menjadi `1`, bukan `1.8`. Gunakan casting atau pastikan salah satu operan bertipe `float`/`double` bila diperlukan hasil presisi.
- Untuk soal yang melarang `if/else`, ingat kembali bentuk operator ternary:
  ```c
  kondisi ? nilai_jika_benar : nilai_jika_salah
  ```
- Gunakan `%d` untuk `int`, `%f` untuk `float`/`double`, dan `%.2f` untuk membatasi 2 angka di belakang koma pada output.
