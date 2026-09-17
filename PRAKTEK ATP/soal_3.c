#include <stdio.h> 

int main(){
    int HH,MM,X;

    scanf("%d:%d", &HH, &MM);
    scanf("%d", &X);

    int durasi = (HH * 60) + MM;

    const char *status = (X & 1) ? "Engine Overheat" : "Injection Failure";
    const char *level = (X & 2) ? "Fatal" : "Tidak Fatal";

    printf("Durasi perjalanan: %d Menit\n", durasi);
    printf("Status permasalahan: %s \n", status);
    printf("Level permasalahan: %s \n", level);
}