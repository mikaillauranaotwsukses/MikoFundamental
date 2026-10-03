#include <stdio.h>

int main(){
    int Hari, Mundur, m;

    scanf("%d %d", &Hari, &Mundur);
    scanf("%d", &m);

    if (Mundur > Hari){
        Mundur = Mundur % 7;
    }

    int HariMulai = Hari - Mundur;
    if (HariMulai < 0)
    {
        HariMulai = HariMulai + 7;
    }
    
    switch (HariMulai){
    case 0:
        if (m % 2 == 0){
            printf("Minggu Kwak");
        }else{
            printf("Minggu Kwik");
        }
        break;

    case 1:
        if (m % 2 == 0){
            printf("Senin Kwik");
        }else{
            printf("Senin Kwak");
        }
        break;
    case 2:
        if (m % 2 == 0){
            printf("Selasa Kwik");
        }else{
            printf("Selasa Kwak");
        }
        break;
    case 3:
        if (m % 2 == 0){
            printf("Rabu Kwik");
        }else{
            printf("Rabu Kwak");
        }
        break;
    case 4:
        if (m % 2 == 0){
            printf("Kamis Kwik");
        }else{
            printf("Kamis Kwak");
        }
        break;
    case 5:
        if (m % 2 == 0){
            printf("Jumat Kwik");
        }else{
            printf("Jumat Kwak");
        }
        break;
    case 6:
        if (m % 2 == 0){
            printf("Sabtu Kwak");
        }else{
            printf("Sabtu Kwik");
        }
        break;
    default:
        break;
    }

}