#include <stdio.h>
#include <math.h>

int main(){
    int m, t1, n, t2, t3;
    double o;

    scanf("%d,%d %d,%d %lf,%d", &m, &t1, &n, &t2, &o, &t3);

    double cekO = 

    if (m > n && n > o && t1 == t2) {
        printf("Korban");
    } else if (o > m && m > n && t3 == t1) {
        printf("Pelaku");
    } else if (n > o && o > m && t3 == t2) {
        printf("Pengamat");
    } else if (m % 2 == 0 || n % 2 != 0 || fabs(o*100 - round(o*100)) > 1e-6) {
        printf("Eror");
    } else {
        printf("Ambigu");
    }

    return 0;
}