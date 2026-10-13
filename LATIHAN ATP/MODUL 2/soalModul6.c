#include <stdio.h>
#include <string.h>

int main()
{
    char s[1005];
    int besar = 0;   // 1 kalau huruf berikutnya harus kapital

    scanf("%s", s);
    int len = strlen(s);

    for (int i = 0; i < len; i++)
    {
        char c = s[i];

        if (c == '_')
        {
            besar = 1;
        }
        else
        {
            if (c >= 'A' && c <= 'Z')
            {
                c = c + 32;   // jadikan huruf kecil
            }

            if (besar == 1)
            {
                c = c - 32;   // jadikan huruf besar
                besar = 0;
            }

            printf("%c", c);
        }
    }
    printf("\n");

    return 0;
}