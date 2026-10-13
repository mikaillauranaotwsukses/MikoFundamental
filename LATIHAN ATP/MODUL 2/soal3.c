#include <stdio.h>

int main() {
    int R, C;
    int A[100][100];

    scanf("%d %d", &R, &C);

    for (int i = 0; i < R; i++) {
        for (int j = 0; j < C; j++) {
            scanf("%d", &A[i][j]);
        }
    }

    printf("Matriks awal:\n");
    for (int i = 0; i < R; i++) {
        for (int j = 0; j < C; j++) {
            if (j > 0) printf(" ");
            printf("%d", A[i][j]);
        }
        printf("\n");
    }

    printf("Matriks transpose:\n");
    for (int j = 0; j < C; j++) {
        
        for (int i = 0; i < R; i++) {
            // if (i > 0) printf(" ");
            printf("\t%d", A[i][j]);
        }
        printf("\n");
    }

    return 0;
}