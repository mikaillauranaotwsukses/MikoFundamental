#include <stdio.h>

int main(){
    long long N;

    do
    {
        printf("Masukkan angka(0 untuk berhenti):");
        scanf("%lld", &N);
        if(N % 2 == 0){
            printf("Genap \n");
        }else{
            printf("Ganjil \n");
        }
        
    } while (N != 0);
    
    return 0;
}