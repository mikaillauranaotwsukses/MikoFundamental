#include <stdio.h> 

int main(){
    int X;
    scanf("%d", &X);

    const char *Poisoned = (X & 1) ? "Poisoned" : "Sehat";
    const char *Shielded = (X & 2) ? "Shielded" : "No Shielded";
    const char *Berserk = (X & 4) ? "Berserk" : "Normal";

    printf("Poisoned: %s \n", Poisoned);
    printf("Shielded: %s \n", Shielded);
    printf("Berserk: %s \n", Berserk);
}