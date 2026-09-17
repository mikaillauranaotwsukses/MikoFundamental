#include <stdio.h>
int main(){
    double x1,x2,y1,y2;
    double m;

    scanf("%lf %lf", &x1,&y1);
    scanf("%lf %lf", &x2,&y2);

    m = (y2 - y1)/(x2-x1);
    
    x1 == x2 ? printf("Gradien Garis: Tidak Terdefinisi") : printf("Gradien Garis: %.2lf", m);
    return 0;
}