#include <stdio.h>

int main(){
    int A,B,C,Tertinggi,Terendah,D;
    scanf("%d %d %d", &A, &B, &C);
    int R = (A + B + C)/3;

    Tertinggi = A;
    Terendah = A;
    
    if (B > Tertinggi){
        Tertinggi = B;
    }

    if (C > Tertinggi){
        Tertinggi = C;
    }

    if (B < Terendah){
        Terendah = B;
    }

    if (C < Terendah){
        Terendah = C;
    }
    
    
    D  = Tertinggi-Terendah;
    

    // if (R >= 80 && D <= 10){
    //     printf("STABLE %d %d", R ,D);
    // }else if(R >= 80 && D > 10){
    //     printf("OVERLOAD %d %d", R, D);
    // }else if (R >= 60 || (R >= 50 && D <= 5)){
    //     printf("WARNING %d %d", R, D);
    // }else if(A == 0 || B == 0 || C == 0){
    //     printf("SHUTDOWN %d %d", R, D);
    // }else{
    //     printf("CRITICAL %d %d", R, D);
    // }

    if (A == 0 || B == 0 || C == 0){
        printf("SHUTDOWN");
    }else if(R >= 80 && D <= 10){
        printf("STABLE %d %d", R, D);
    }else if(R >= 80 && D > 10){
        printf("OVERLOAD %d %d", R ,D);
    }else if( R >= 60 || (R >= 50 && D <= 5)){
        printf("WARNING %d %d", R, D);
    }else{
        printf("CRITICAL %d %d", R, D);
    }
    
    
}