#include <stdio.h>

int main(){
    double C;
    double F,K;

    scanf("%lf", &C);
    F = (C * 9.0 / 5.0) + 32;
    K = C + 273.15;

    printf("Suhu dalam Farenheit: %.2f\n", F);
    printf("Suhu dalam Kelvin: %.2f", K);
}