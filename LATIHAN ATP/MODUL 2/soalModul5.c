#include <stdio.h>
#include <string.h>

int main(){
    char R[105];
    int a,i,u,e,o;
    a = 0;
    i = 0;
    u = 0;
    e = 0;
    o = 0;


    fgets(R, 105, stdin);
    int len = strlen(R);

    for(int i = 0; i < len; i++){
        switch (R[i])
        {
        case 'A':
        case 'a':
            a++;
        case 'I':
        case 'i':
            i++;
        case 'U':
        case 'u':
            u++;
        case 'E':
        case 'e':
            e++;
        case 'O':
        case 'o':
            o++;
    }

    printf("A/a : %d\n", a);
    printf("I/i : %d\n", i);
    printf("U/u : %d\n", u);
    printf("E/e : %d\n", e);
    printf("O/o : %d\n", o);

    return 0;
}