#include <stdio.h>

int main(){
    long long V, B;
    char O,C;
    scanf("%lld %c %c %lld", &V, &O, &C, &B);

    switch (O)
    {
    case 'T':
        if ( V > 100){
            if ( C == 'B'){
                if (B == 1)
                {
                    printf("Manuver: Drift Menghindar\n");
                    printf("CRITICAL: Engine Overheat!");
                }else{
                    printf("Manuver: Drift Menghindar");
                }
            }else{
                printf("Manuver: Rem Darurat");
            }
                            
        }else{
            printf("Manuver: Pindah Jalur");
        }
        break;

    case 'L':
        if (V > 80){
            if (B == 1){
                printf("Manuver: Protokol Lompat\n");
                printf("CRITICAL: Engine Overheat!");
            }else{
                printf("Manuver: Protokol Lompat");
            }
            
        }else{
            printf("Manuver: Rem Normal");
        }
        break;

    case 'K':    
        if (V > 150){
            printf("Manuver: Peringatan Batas Kecepatan");
        }else{
            printf("Manuver: Melaju Stabil");
        }
        break;
        
    default:
        printf("Manuver: Rintangan Tidak Dikenali");
    }

}
