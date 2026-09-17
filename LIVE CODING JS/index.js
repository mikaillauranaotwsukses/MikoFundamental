const Hari_ini = new Date(2026,8,8);

const Provinsi = {
  "31": "DKI Jakarta",
  "32": "Jawa Barat",
  "33": "Jawa Tengah",
  "34": "DI Yogyakarta",
  "35": "Jawa Timur",
};

const Bulan = [
  "PlaceHolder", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];


function prosesNik(nik){

    console.log("--------------------");

    console.log("Test Case:", nik)
    if (typeof nik !== "string" || nik.length !== 16) {
        console.log("Nik Salah");
        return "Nik Tidak Valid"
    }

    const kodeProvinsi = nik.slice(0, 2);
    const namaProvinsi = Provinsi[kodeProvinsi];
    const dd = parseInt(nik.slice(6, 8), 10);
    const mm = parseInt(nik.slice(8, 10), 10);
    const namaBulan = Bulan[mm];
    const yy = parseInt(nik.slice(10, 12), 10);
    let jenisKelamin, tanggal,lolos;


    if (!(kodeProvinsi in Provinsi)){
        console.log("NIK tidak valid \n")
        return "Nik Tidak Valid"
    } 
    

    if (dd > 40) {
        jenisKelamin = "wanita";
        tanggal = dd - 40;
    } else {
        jenisKelamin = "pria";
        tanggal = dd;
    }

    if ( mm > 12 || mm < 1){
        console.log("NIK TIDAK VALID \n");
        return "Nik Tidak Valid"
    }

    if (yy >= 0 && yy <= 26) {
        tahun = 2000 + yy;
    } else {
        tahun = 1900 + yy;
    }

    const cekTanggal = new Date(tahun, mm - 1, tanggal);
    if (cekTanggal.getDate() !== tanggal) {
        console.log("NIK tidak valid \n");
        return "NIK tidak valid";
    }

    if (cekTanggal > Hari_ini){
        console.log("NIK tidak valid \n");
        return "NIK tidak valid";
    } 

    let umur = 2026 - tahun;
    if (mm > 9 || (mm === 9 && tanggal > 8)) {
        umur = umur - 1 ; 
    }
    
    
    if (jenisKelamin === "wanita") {
        lolos = umur >= 15 && umur <= 18;
    } else {
        lolos = umur >= 16 && umur <= 19;
    }

    if (!lolos) {
        console.log("Maaf Anda Tidak Lolos \n");
        return "maaf anda tidak lolos";
    }

    console.log("SELAMAT ANDA LOLOS");
    console.log("Nama Provinsi:", namaProvinsi);
    console.log("Jenis Kelamin:", jenisKelamin);
    console.log("Tanggal Lahir:" ,tanggal,namaBulan,tahun);
    console.log("Umur: ", umur, "\n");
}



Nik1 ="3312340806080001";
Nik2 ="329885510000290";
Nik3 ="8889997773332222";
Nik4 ="3112343911050001";
Nik5 ="3312341010000001";
Nik6 ="3512345510050001";
prosesNik(Nik1)
prosesNik(Nik2)
prosesNik(Nik3)
prosesNik(Nik4)
prosesNik(Nik5)
prosesNik(Nik6)