#include <stdio.h>

int main(){
    long long R,C;
        
    scanf("%lld %lld", &R, &C);
    int A[1000][1000];

    for(int i = 0; i < R; i++){
        for(int j = 0; j < C; j++){
            scanf("%d", &A[i][j]);
        }
    }

    for (int j = 0; j < C; j++) {
        for (int i = R - 1; i >=0 ; i--) {
            printf("%d", A[i][j]);
            printf(" ");
        }
        printf("\n");
    }

    return 0;
}