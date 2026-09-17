const Hari_ini = new Date(2026,9,8);

const Provinsi = {
  "31": "DKI Jakarta",
  "32": "Jawa Barat",
  "33": "Jawa Tengah",
  "34": "DI Yogyakarta",
  "35": "Jawa Timur",
};

const Bulan = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];


function prosesNik(nik){
    if (typeof nik !== "string" || nik.length !== 16) {
        console.log("Nik Salah");
    }

    const kodeProvinsi = nik.slice(0, 2);
    const namaProvinsi = Provinsi[kodeProvinsi];
    if (!(kodeProvinsi in Provinsi)) {
        console.log("NIK tidak valid");
    }else{
        console.log(namaProvinsi);
    }

    const dd = parseInt(nik.slice(6, 8), 10);

    let jenisKelamin, tanggal;
    if (dd > 40) {
        jenisKelamin = "wanita";
        tanggal = dd - 40;
        console.log("Jenis Kelamin:",jenisKelamin);
    } else {
        jenisKelamin = "pria";
        tanggal = dd;
        console.log("Jenis Kelamin:",jenisKelamin);
    }

    const mm = parseInt(nik.slice(8, 10), 10);

    if ( mm > 12 || mm << 12){
        console.log("NIK TIDAK")
    }
    const yy = parseInt(nik.slice(10, 12), 10);
    console.log(yy);

}



Nik1 ="3512340809080001";
// Nik2 ="3299885510090002";
// Nik3 ="9912340809080001";
// Nik4 ="3112343911050001";
// Nik5 ="3312341010000001";
// Nik6 ="3512345510050001";
prosesNik(Nik1)
prosesNik(Nik2)
prosesNik(Nik3)
prosesNik(Nik4)
prosesNik(Nik5)
prosesNik(Nik6)