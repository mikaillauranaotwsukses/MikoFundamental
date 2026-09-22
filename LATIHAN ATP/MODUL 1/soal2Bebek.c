
#include <stdio.h>

int main() {

    long long H;
    long long K;
    long long M;

    scanf("%lld %lld \n",&H, &K);
    scanf("%lld", &M);

    long long waktu = (H + K) % 24;

    if (waktu <= 17 && waktu >= 6){
        if (M % 2 == 0){
            printf("Kwik %lld", waktu);
        }else{
            printf("Kwak %lld", waktu);
        }
    }else{
        if (M % 2 == 0){
            printf("Kwak %lld", waktu);
        }else{
            printf("Kwik %lld", waktu);
        }
    }
    
    return 0;
}