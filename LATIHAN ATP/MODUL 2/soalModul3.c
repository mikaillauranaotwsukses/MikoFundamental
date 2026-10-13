#include <stdio.h>

int main(){
    int n;
    scanf("%d", &n);

    for (int i = 2; i <= n; i++){
        if(i > 2){
            printf(" ");
        }

        int bilanganPrima = 1;
        for(int j = 2; j*j <= i; j++){
            if(i % j ==0){
                bilanganPrima = 0;
            }
        }

        if(bilanganPrima == 1){
            printf("*");
        }else{
            printf("%d", i);
        }
    }
    
}