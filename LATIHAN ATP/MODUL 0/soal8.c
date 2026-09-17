#include <stdio.h>

int main(){
    int H,M,S,D;

    scanf("%d %d %d \n", &H,&M,&S);
    scanf("%d", &D);

    int totalWaktu = (H*3600) + (M*60) + S;
    printf("%d", totalWaktu);

    int hasil = totalWaktu - D;
    int hasilKoreksi = (hasil < 0) ? hasil + 86400 : hasil;

    H = (hasilKoreksi / 3600) % 24;
    M = (hasilKoreksi/60) % 60;
    S = hasilKoreksi % 60;
    printf("%d %d %d", H,M,S);

}