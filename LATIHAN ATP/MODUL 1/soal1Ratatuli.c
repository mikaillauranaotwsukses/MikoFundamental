#include <stdio.h>

int main(){
    char A,B,C,D,E,F,G;
    scanf("%c%c%c%c%c%c%c",&A,&B,&C,&D,&E,&F,&G);

    if(A == G && B == F && C == E){
        if (A == ' ' || B == ' ' || C == ' ' || D == ' ' || E == ' ' || F == ' ' || G == ' ')
        {
            printf("TUH KAN GAENAK, BUMBUNYA KURANG LENGKAP");
        }else{
            printf("OM ANTON SUKA DENGAN MASAKANMU");
        }
        
    }else{
        printf("SKINNER MELAPORKANMU!");
    }
    
    return 0;
}