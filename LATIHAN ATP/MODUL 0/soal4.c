#include <stdio.h>

int main(){
    int A,B;
    scanf("%d %d", &A,&B);

    A = A+B;
    B = A-B;
    A = A-B;
    printf("A=%d B=%d\n", A, B);
    printf("Jumlah= %d", A+B);
}