#include <stdio.h>

int main(){
    int A,B;
    scanf("%d %d", &A, &B);

    int Hasil = (A | B) >> 2;
    printf("Hasil: %d \n", Hasil);
    printf("Status: %s", (Hasil & 1 == 0) ? "Genap" : "Ganjil");
    return 0;
}