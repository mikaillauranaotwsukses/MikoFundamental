#include <stdio.h>

int main(){
    char A,B,C,D,E,F,G,H,I,J,K;
    scanf("%c%c%c%c%c%c%c%c%c%c%c",&A,&B,&C,&D,&E,&F,&G,&H,&I,&J,&K);

    long long Match = 0;
    if(A == K) Match++;
    if(B == J) Match++;
    if(C == I) Match++;
    if(D == H) Match++;
    if(E == G) Match++;

    switch (Match) {
    case 5:
        if (A == ' ' || B == ' ' || C == ' ' || D == ' ' || E == ' ' || F == ' ' || G == ' ' || H == ' ' || I == ' ' || J == ' ' || K == ' '){
            printf("M1RR0R M4St3r");
        }else{
            printf("SP4C3 R3FL3CTION");
        }
        break;
    
    case 3:
        printf("4LM0ST M1SS");
        break;

    case 4:
        printf("4LM0ST M1SS");
        break;
    
    case 2:
        printf("N34R M1SS");
        break;

    case 1:
        printf("N34R M1SS");
        break;
    
    default:
        printf("CH40S D3T3CT3D");
        break;
    }
    
    return 0;
}