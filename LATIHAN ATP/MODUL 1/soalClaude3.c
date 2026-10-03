#include <stdio.h>
#include <math.h>

int main(){
    long long a,b,c,D;
    scanf("%lld", a);
    scanf("%lld", b);
    scanf("%lld", c);

    if (a == 0) {
        printf("Bukan persamaan kuadrat!");
        return 0;
    }

    D = (b*b) - 4*a*c;

    if (D < 0 || D == 0)
    {
        printf("Tidak ada akar real!");
        return 0;
    }

    long long AkarD = sqrt(D);

    x1 = ((-1 * b) - AkarD) / (2*a);
    x1 = ((-1 * b) + AkarD) / (2*a);
    
    long long hasil = x1*x2;

    printf("%lld", hasil);
}