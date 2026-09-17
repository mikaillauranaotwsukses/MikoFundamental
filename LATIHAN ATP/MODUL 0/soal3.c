#include <stdio.h>

int main(){
    int N;

    scanf("%d" , &N);
    printf("Antrian Berikutnya: %d" , (N == 50) ?  1 : N + 1 );
}