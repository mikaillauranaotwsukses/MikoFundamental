#include <stdio.h>  

int main() {
    int H, M;
    scanf("%d %d", &H, &M);

    H += 1;
    M += 30;

    H = H + (M / 60);
    H = H % 24;
    M = M % 60;

    printf("%d %d", H, M);
} 