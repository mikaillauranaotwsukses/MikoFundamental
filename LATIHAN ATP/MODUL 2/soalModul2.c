#include <stdio.h>

int main()
{
    int n;
    scanf("%d", &n);

    for (int i = 1; i <= n; i++)
    {
        if (i > 1)
        {
            printf(" ");
        }

        if (i % 2 == 0){
            printf("*");
        }
        else
        {
            printf("%d", i);
        }
    }
    printf("\n");

    return 0;
}