#include <stdio.h>
int main(){
    int N;
    int A[20005];
    int turun = 0;

    scanf("%d", &N);

    for(int i = 0; i < N; i++){
        scanf("%d", &A[i]);
    }

    for (int i = 0; i < N; i++)
    {
        
        if (A[i] > A[(i + 1) % N])
        {
            turun++;
        }
    }

    if (turun <= 1)
    {
        printf("YA\n");
    }
    else
    {
        printf("TIDAK\n");
    }

    return 0;
}