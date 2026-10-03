#include <stdio.h>

int main(){
    int JamMulaiEren, MenitMulaiEren, JamSelesaiEren, MenitSelesaiEren;
    int JamMulaiMikasa, MenitMulaiMikasa, JamSelesaiMikasa, MenitSelesaiMikasa;

    scanf("%d:%d %d:%d", &JamMulaiEren, &MenitMulaiEren, &JamSelesaiEren, &MenitSelesaiEren);
    scanf("%d:%d %d:%d", &JamMulaiMikasa, &MenitMulaiMikasa, &JamSelesaiMikasa, &MenitSelesaiMikasa);

    int MulaiEren    = JamMulaiEren * 60 + MenitMulaiEren;
    int SelesaiEren  = JamSelesaiEren * 60 + MenitSelesaiEren;
    int MulaiMikasa   = JamMulaiMikasa * 60 + MenitMulaiMikasa;
    int SelesaiMikasa = JamSelesaiMikasa * 60 + MenitSelesaiMikasa;

    int ErenPotongan1_Mulai, ErenPotongan1_Selesai;
    int ErenPotongan2_Mulai, ErenPotongan2_Selesai;
    int ErenPunyaPotongan2;

    if (MulaiEren == SelesaiEren) {
        ErenPotongan1_Mulai = 0;
        ErenPotongan1_Selesai = 1440;
        ErenPunyaPotongan2 = 0;
        ErenPotongan2_Mulai = 0;
        ErenPotongan2_Selesai = 0;
    } else if (MulaiEren < SelesaiEren) {
        ErenPotongan1_Mulai = MulaiEren;
        ErenPotongan1_Selesai = SelesaiEren;
        ErenPunyaPotongan2  = 0;
        ErenPotongan2_Mulai = 0;
        ErenPotongan2_Selesai = 0;
    } else {
        ErenPotongan1_Mulai = MulaiEren;
        ErenPotongan1_Selesai = 1440;
        ErenPotongan2_Mulai = 0;
        ErenPotongan2_Selesai = SelesaiEren;
        ErenPunyaPotongan2 = 1;
    }

    int MikasaPotongan1_Mulai, MikasaPotongan1_Selesai;
    int MikasaPotongan2_Mulai, MikasaPotongan2_Selesai;
    int MikasaPunyaPotongan2;

    if (MulaiMikasa == SelesaiMikasa) {
        MikasaPotongan1_Mulai = 0;
        MikasaPotongan1_Selesai = 1440;
        MikasaPunyaPotongan2 = 0;
        MikasaPotongan2_Mulai = 0;
        MikasaPotongan2_Selesai = 0;
    } else if (MulaiMikasa < SelesaiMikasa) {
        MikasaPotongan1_Mulai = MulaiMikasa;
        MikasaPotongan1_Selesai = SelesaiMikasa;
        MikasaPunyaPotongan2 = 0;
        MikasaPotongan2_Mulai = 0;
        MikasaPotongan2_Selesai = 0;
    } else {
        MikasaPotongan1_Mulai = MulaiMikasa;
        MikasaPotongan1_Selesai = 1440;
        MikasaPotongan2_Mulai = 0;
        MikasaPotongan2_Selesai = SelesaiMikasa;
        MikasaPunyaPotongan2 = 1;
    }

    int TotalMenitNumpuk = 0;
    int TitikMulaiNumpuk, TitikSelesaiNumpuk, PanjangNumpuk;

    TitikMulaiNumpuk   = ErenPotongan1_Mulai > MikasaPotongan1_Mulai ? ErenPotongan1_Mulai : MikasaPotongan1_Mulai;
    TitikSelesaiNumpuk = ErenPotongan1_Selesai < MikasaPotongan1_Selesai ? ErenPotongan1_Selesai : MikasaPotongan1_Selesai;
    PanjangNumpuk = TitikSelesaiNumpuk - TitikMulaiNumpuk;
    if (PanjangNumpuk > 0) TotalMenitNumpuk += PanjangNumpuk;

    if (MikasaPunyaPotongan2) {
        TitikMulaiNumpuk   = ErenPotongan1_Mulai > MikasaPotongan2_Mulai ? ErenPotongan1_Mulai : MikasaPotongan2_Mulai;
        TitikSelesaiNumpuk = ErenPotongan1_Selesai < MikasaPotongan2_Selesai ? ErenPotongan1_Selesai : MikasaPotongan2_Selesai;
        PanjangNumpuk = TitikSelesaiNumpuk - TitikMulaiNumpuk;
        if (PanjangNumpuk > 0) TotalMenitNumpuk += PanjangNumpuk;
    }

    if (ErenPunyaPotongan2) {
        TitikMulaiNumpuk   = ErenPotongan2_Mulai > MikasaPotongan1_Mulai ? ErenPotongan2_Mulai : MikasaPotongan1_Mulai;
        TitikSelesaiNumpuk = ErenPotongan2_Selesai < MikasaPotongan1_Selesai ? ErenPotongan2_Selesai : MikasaPotongan1_Selesai;
        PanjangNumpuk = TitikSelesaiNumpuk - TitikMulaiNumpuk;
        if (PanjangNumpuk > 0) TotalMenitNumpuk += PanjangNumpuk;
    }

    if (ErenPunyaPotongan2 && MikasaPunyaPotongan2) {
        TitikMulaiNumpuk   = ErenPotongan2_Mulai > MikasaPotongan2_Mulai ? ErenPotongan2_Mulai : MikasaPotongan2_Mulai;
        TitikSelesaiNumpuk = ErenPotongan2_Selesai < MikasaPotongan2_Selesai ? ErenPotongan2_Selesai : MikasaPotongan2_Selesai;
        PanjangNumpuk = TitikSelesaiNumpuk - TitikMulaiNumpuk;
        if (PanjangNumpuk > 0) TotalMenitNumpuk += PanjangNumpuk;
    }

    if (TotalMenitNumpuk > 180) {
        printf("%d WALL SECURE", TotalMenitNumpuk);
    } else if (TotalMenitNumpuk >= 60) {
        printf("%d ALERT", TotalMenitNumpuk);
    } else if (TotalMenitNumpuk >= 1) {
        printf("%d HIGH ALERT", TotalMenitNumpuk);
    } else {
        printf("%d TITAN BREACH", TotalMenitNumpuk);
    }

    return 0;
}