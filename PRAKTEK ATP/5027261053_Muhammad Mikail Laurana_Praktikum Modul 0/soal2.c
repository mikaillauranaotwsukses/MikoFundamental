#include <stdio.h>

int main(){
    int N,K;
    scanf("%d", &N);
    scanf("%d", &K);

    N % 3  ||  K % 3 ? printf("Skill issue banget wok") : printf("Doa ayang berhasil!");
    return 0;
}