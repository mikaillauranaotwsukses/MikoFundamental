#include <stdio.h>  

int main(){
    int H, G;
    double X;

    scanf("%d %d", &H, &G);
    X = ( H * G) * 1.1;
    printf("Total Tagihan: %.2f", X);
    return 0;
}