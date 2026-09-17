#include <stdio.h>
 int main(){
    int P,K,E;

    scanf("%d %d", &P, &K);
    E = P ^ K;
    printf("%d \n", E);

    int jumlahBit =((E & 1) ? 1 : 0) +
                    ((E & 2) ? 1 : 0) +
                    ((E & 4) ? 1 : 0) +
                    ((E & 8) ? 1 : 0) + 
                    ((E & 16) ? 1 : 0) +
                    ((E & 32) ? 1 : 0) + 
                    ((E & 64) ? 1 : 0) +
                    ((E & 128) ? 1 : 0);

    printf("Status: %s", (jumlahBit % 2 == 0) ? "AMAN" : "BOCOR");
 }