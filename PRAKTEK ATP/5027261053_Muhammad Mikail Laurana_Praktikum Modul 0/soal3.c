#include <stdio.h>


int main(){
    int U,H,M,C;
    scanf("%d %d %d %d", &U, &H, &M, &C);
    
    long long bensinMax = U / H;
    long long sisa = U % H;
    long long cashBack = bensinMax / M;
    long long totalCasback = cashBack * C;
    long long sisaTotal = sisa + totalCasback;

    printf("Hendra mendapatkan %lld liter bensin dan sisa uang %lld Euro.", bensinMax, sisaTotal);
    return 0;
}