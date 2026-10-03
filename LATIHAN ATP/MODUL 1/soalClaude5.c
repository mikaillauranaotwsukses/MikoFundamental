#include <stdio.h>

int main(){
    double x1,y1,x2,y2,x3,y3,x4,y4;
    scanf("%lf %lf", &x1, &y1);
    scanf("%lf %lf", &x2, &y2);
    scanf("%lf %lf", &x3, &y3);
    scanf("%lf %lf", &x4, &y4);

    double d1x = x2 - x1, d1y = y2 - y1;   // arah segment 1
    double d2x = x4 - x3, d2y = y4 - y3;   // arah segment 2

    double denom = d1x * d2y - d1y * d2x;

    if (denom != 0) {
        // Tidak sejajar -> pasti ada 1 titik potong garis (tak terbatas)
        double cx = x3 - x1, cy = y3 - y1;
        double t = (cx * d2y - cy * d2x) / denom;
        double s = (cx * d1y - cy * d1x) / denom;

        if (t >= 0 && t <= 1 && s >= 0 && s <= 1) {
            if (t == 0 || t == 1 || s == 0 || s == 1) {
                printf("BERSENTUHAN DIUJUNG");
            } else {
                double px = x1 + t * d1x;
                double py = y1 + t * d1y;
                printf("BERPOTONGAN: %.2f %.2f", px, py);
            }
        } else {
            printf("HMMMM NOTHING");
        }
    } else {
        // Sejajar -> cek collinear (satu garis yang sama) atau tidak
        double cx = x3 - x1, cy = y3 - y1;
        double cross = cx * d1y - cy * d1x;

        if (cross != 0) {
            printf("SEJAJAR");
        } else {
            // Collinear -> proyeksikan C dan D ke parameter t di garis 1
            double t3, t4;
            if (d1x != 0) {
                t3 = (x3 - x1) / d1x;
                t4 = (x4 - x1) / d1x;
            } else {
                t3 = (y3 - y1) / d1y;
                t4 = (y4 - y1) / d1y;
            }

            double lo2 = t3 < t4 ? t3 : t4;
            double hi2 = t3 > t4 ? t3 : t4;

            double overlapStart = lo2 > 0 ? lo2 : 0;
            double overlapEnd   = hi2 < 1 ? hi2 : 1;

            if (overlapStart < overlapEnd) {
                printf("MENUMPUK DISATU JALUR YANG SAMA");
            } else if (overlapStart == overlapEnd) {
                printf("BERSENTUHAN DIUJUNG");
            } else {
                printf("HMMMM NOTHING");
            }
        }
    }

    return 0;
}