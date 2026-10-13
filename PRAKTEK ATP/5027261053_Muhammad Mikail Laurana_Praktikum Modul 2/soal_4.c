#include <stdio.h>

int main()
{
    int n, m;
    char maze[105][105];
    int visited[105][105];
    int rowAt[10005], colAt[10005], tryDir[10005];
    char path[10005];

    int dr[4] = {0, 1, 0, -1};
    int dc[4] = {1, 0, -1, 0};
    char huruf[4] = {'R', 'D', 'L', 'U'};

    int depth = 0;
    int gagal = 0;
    int i, j;

    scanf("%d %d", &n, &m);
    for (i = 0; i < n; i++)
    {
        scanf("%s", maze[i]);
    }

    for (i = 0; i < 105; i++)
    {
        for (j = 0; j < 105; j++)
        {
            visited[i][j] = 0;
        }
    }

    rowAt[0] = 0;
    colAt[0] = 0;
    tryDir[0] = 0;
    visited[0][0] = 1;

    while (maze[rowAt[depth]][colAt[depth]] != 'E' && gagal == 0)
    {
        if (tryDir[depth] < 4)
        {
            int d = tryDir[depth];
            int nr = rowAt[depth] + dr[d];
            int nc = colAt[depth] + dc[d];
            tryDir[depth]++;

            if (nr >= 0 && nr < n && nc >= 0 && nc < m
                && (maze[nr][nc] == '.' || maze[nr][nc] == 'E')
                && visited[nr][nc] == 0)
            {
                visited[nr][nc] = 1;
                path[depth] = huruf[d];
                depth++;
                rowAt[depth] = nr;
                colAt[depth] = nc;
                tryDir[depth] = 0;
            }
        }
        else
        {
            if (depth == 0)
            {
                gagal = 1;     
            }
            else
            {
                depth--;
            }
        }
    }

    if (gagal == 1)
    {
        printf("Ditolak loh yaa awokawok\n");
    }
    else
    {
        path[depth] = '\0';
        printf("%s\n", path);

        printf("Yang datang dan pergi\n");
        printf("Kan membuatmu mengerti\n");
        printf("Karna kita terlalu tersakiti\n");
        printf("Tuk mengenal perih\n");
        printf("Yang dan dan pergi\n");
        printf("Semua yang harus di lalui\n");
        printf("Karna kita terlalu tersakiti\n");
        printf("Tuk menjadi manusia\n");
    }

    return 0;
}