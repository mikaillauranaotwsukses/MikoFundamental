#include <stdio.h>  

int main()
{
    double G,X,Y;
    int N;
    
    scanf("%lf %d", &G, &N);
    X = G * 0.88 ;
    Y = (X * 0.4) / (N+1);
    printf("Gaji Bersih adalah Rp %.2f\n", X);
    printf("Gaji Per Anak adalah Rp %.2f", Y);
    return 0;
} 