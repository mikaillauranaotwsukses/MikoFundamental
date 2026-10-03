#include <stdio.h>

int main(){
    long long Hari, Mundur, C, BagianKwak, BagianKwik, TotalKwak, TotalKwik;
    long long T,K,J,S;

    scanf("%lld %lld", &Hari, &Mundur);
    scanf("%lld %lld %lld %lld", &T, &K, &J, &S);

    if (Mundur > Hari){
        Mundur = Mundur % 7;
    }else{
        Mundur = Mundur;
    }

    long long HariMulai = Hari - Mundur;
    if (HariMulai < 0)
    {
        HariMulai = HariMulai + 7;
    }else{
        HariMulai = HariMulai + 0;
    }
    
    switch (HariMulai){
        
    case 0:
        C = J + S;
        if (C % 2 == 0){
            BagianKwik = C/2;
            BagianKwak = C - BagianKwik;
        }else{
            BagianKwik = (C/2) + 1 ;
            BagianKwak = C - BagianKwik;
        }

        TotalKwak = T + BagianKwak;
        TotalKwik = K + BagianKwik;

        if (TotalKwak > TotalKwik){
            printf("Kwak %lld", TotalKwak);
        }else if (TotalKwak == TotalKwik){
            printf ("Sama %lld", TotalKwak);
        }else{
            printf("Kwik %lld", TotalKwik);
        }
        break;

    case 1:
        C = J + S;
        if (C % 2 == 0){
            BagianKwak = C/2;
            BagianKwik = C - BagianKwak;
        }else{
            BagianKwak = (C/2) + 1;
            BagianKwik = C - BagianKwak;
        }

        TotalKwak = T + BagianKwak;
        TotalKwik = K + BagianKwik;

        if (TotalKwak > TotalKwik){
            printf("Kwak %lld", TotalKwak);
        }else if (TotalKwak == TotalKwik){
            printf ("Sama %lld", TotalKwak);
        }else{
            printf("Kwik %lld", TotalKwik);
        }
        break;
    
    case 2:
        C = J + S;
        if (C % 2 == 0){
            BagianKwak = C/2;
            BagianKwik = C - BagianKwak;
        }else{
            BagianKwak = (C/2) + 1;
            BagianKwik = C - BagianKwak;
        }

        TotalKwak = T + BagianKwak;
        TotalKwik = K + BagianKwik;

        if (TotalKwak > TotalKwik){
            printf("Kwak %lld", TotalKwak);
        }else if (TotalKwak == TotalKwik){
            printf ("Sama %lld", TotalKwak);
        }else{
            printf("Kwik %lld", TotalKwik);
        }
        break;
    case 3:
        C = J + S;
        if (C % 2 == 0){
            BagianKwak = C/2;
            BagianKwik = C - BagianKwak;
        }else{
            BagianKwak = (C/2) + 1;
            BagianKwik = C - BagianKwak;
        }

        TotalKwak = T + BagianKwak;
        TotalKwik = K + BagianKwik;

        if (TotalKwak > TotalKwik){
            printf("Kwak %lld", TotalKwak);
        }else if (TotalKwak == TotalKwik){
            printf ("Sama %lld", TotalKwak);
        }else{
            printf("Kwik %lld", TotalKwik);
        }
        break;
    case 4:
        C = J + S;
        if (C % 2 == 0){
            BagianKwak = C/2;
            BagianKwik = C - BagianKwak;
        }else{
            BagianKwak = (C/2) + 1;
            BagianKwik = C - BagianKwak;
        }

        TotalKwak = T + BagianKwak;
        TotalKwik = K + BagianKwik;

        if (TotalKwak > TotalKwik){
            printf("Kwak %lld", TotalKwak);
        }else if (TotalKwak == TotalKwik){
            printf ("Sama %lld", TotalKwak);
        }else{
            printf("Kwik %lld", TotalKwik);
        }
        break;
    case 5:
        C = J + S;
        if (C % 2 == 0){
            BagianKwak = C/2;
            BagianKwik = C - BagianKwak;
        }else{
            BagianKwak = (C/2) + 1;
            BagianKwik = C - BagianKwak;
        }

        TotalKwak = T + BagianKwak;
        TotalKwik = K + BagianKwik;

        if (TotalKwak > TotalKwik){
            printf("Kwak %lld", TotalKwak);
        }else if (TotalKwak == TotalKwik){
            printf ("Sama %lld", TotalKwak);
        }else{
            printf("Kwik %lld", TotalKwik);
        }
        break;

    case 6:
        C = J + S;
        if (C % 2 == 0){
            BagianKwik = C/2;
            BagianKwak = C - BagianKwik;
        }else{
            BagianKwik = (C/2) + 1;
            BagianKwak = C - BagianKwik;
        }

        TotalKwak = T + BagianKwak;
        TotalKwik = K + BagianKwik;

        if (TotalKwak > TotalKwik){
            printf("Kwak %lld", TotalKwak);
        }else if (TotalKwak == TotalKwik){
            printf ("Sama %lld", TotalKwak);
        }else{
            printf("Kwik %lld", TotalKwik);
        }
        break;

    default:
        break;
    }

}