#include <stdio.h>

int main()
{
    int n;
    int a[105];
    int kurangEmas = 0, lebihEmas = 0;
    int kurangBesi = 0, lebihBesi = 0;

    scanf("%d", &n);
    for (int i = 0; i < n; i++)
    {
        scanf("%d", &a[i]);
    }

    for (int i = 1; i <= n; i++)
    {
        
        int prima = 1;
        if (i == 1)
        {
            prima = 0;
        }
        for (int j = 2; j * j <= i; j++)
        {
            if (i % j == 0)
            {
                prima = 0;
            }
        }

        int panjang = a[i - 1];

        if (prima == 1){
            
            if (panjang < 7){
                kurangEmas = kurangEmas + (7 - panjang);
            }
            else{
                lebihEmas = lebihEmas + (panjang - 7);
            }
        }
        else{
            
            if (panjang < 7){
                kurangBesi = kurangBesi + (7 - panjang);
            }
            else{
                lebihBesi = lebihBesi + (panjang - 7);
            }
        }
    }

    int beliEmas = kurangEmas - lebihEmas;
    if (beliEmas < 0)
    {
        beliEmas = 0;
    }

    int beliBesi = kurangBesi - lebihBesi;
    if (beliBesi < 0)
    {
        beliBesi = 0;
    }

    long long total = beliEmas + beliBesi;
    long long biaya = (long long)beliEmas * 3000000 + (long long)beliBesi * 500000;

    printf("%lld %lld\n", total, biaya);

    return 0;
}