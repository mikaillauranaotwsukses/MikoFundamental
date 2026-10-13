#include <stdio.h>

int main(){
    long long R, C, K, HASIL;
    int A[100][100];
    int selesai = 0;

    HASIL = 0;

    scanf("%lld %lld %lld", &R, &C, &K);

    for(int i = 0; i < R; i++){
        for(int j = 0; j < C; j++){
            scanf("%d", &A[i][j]);
        }
    }

    int i, left = 0, right = C - 1, top = 0, bottom = R - 1;

    while (left <= right && top <= bottom && selesai == 0){

        for (i = left; i <= right && selesai == 0; ++i) {
            printf("%d\n", A[top][i]);
            HASIL = HASIL + A[top][i];
            if (HASIL >= K) selesai = 1;
        }
        top++;

        
        for (i = top; i <= bottom && selesai == 0; ++i) {
            printf("%d\n", A[i][right]);
            HASIL = HASIL + A[i][right];
            if (HASIL >= K) selesai = 1;
        }
        right--;

        
        if (top <= bottom) {
            for (i = right; i >= left && selesai == 0; --i) {
                printf("%d\n", A[bottom][i]);
                HASIL = HASIL + A[bottom][i];
                if (HASIL >= K) selesai = 1;
            }
            bottom--;
        }

        
        if (left <= right) {
            for (i = bottom; i >= top && selesai == 0; --i) {
                printf("%d\n", A[i][left]);
                HASIL = HASIL + A[i][left];
                if (HASIL >= K) selesai = 1;
            }
            left++;
        }
    }

    printf("%lld\n", HASIL);

    return 0;
}