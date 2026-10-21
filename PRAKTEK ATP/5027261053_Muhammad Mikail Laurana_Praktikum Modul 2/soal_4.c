// #include <stdio.h>

// int main()
// {
//     int n, m;
//     char maze[105][105];
//     int visited[105][105];
//     int rowAt[10005], colAt[10005], tryDir[10005];
//     char path[10005];

//     int dr[4] = {0, 1, 0, -1};
//     int dc[4] = {1, 0, -1, 0};
//     char huruf[4] = {'R', 'D', 'L', 'U'};

//     int depth = 0;
//     int gagal = 0;
//     int i, j;

//     scanf("%d %d", &n, &m);
//     for (i = 0; i < n; i++)
//     {
//         scanf("%s", maze[i]);
//     }

//     for (i = 0; i < 105; i++)
//     {
//         for (j = 0; j < 105; j++)
//         {
//             visited[i][j] = 0;
//         }
//     }

//     rowAt[0] = 0;
//     colAt[0] = 0;
//     tryDir[0] = 0;
//     visited[0][0] = 1;

//     while (maze[rowAt[depth]][colAt[depth]] != 'E' && gagal == 0)
//     {
//         if (tryDir[depth] < 4)
//         {
//             int d = tryDir[depth];
//             int nr = rowAt[depth] + dr[d];
//             int nc = colAt[depth] + dc[d];
//             tryDir[depth]++;

//             if (nr >= 0 && nr < n && nc >= 0 && nc < m
//                 && (maze[nr][nc] == '.' || maze[nr][nc] == 'E')
//                 && visited[nr][nc] == 0)
//             {
//                 visited[nr][nc] = 1;
//                 path[depth] = huruf[d];
//                 depth++;
//                 rowAt[depth] = nr;
//                 colAt[depth] = nc;
//                 tryDir[depth] = 0;
//             }
//         }
//         else
//         {
//             if (depth == 0)
//             {
//                 gagal = 1;     
//             }
//             else
//             {
//                 depth--;
//             }
//         }
//     }

//     if (gagal == 1)
//     {
//         printf("Ditolak loh yaa awokawok\n");
//     }
//     else
//     {
//         path[depth] = '\0';
//         printf("%s\n", path);

//         printf("Yang datang dan pergi\n");
//         printf("Kan membuatmu mengerti\n");
//         printf("Karna kita terlalu tersakiti\n");
//         printf("Tuk mengenal perih\n");
//         printf("Yang dan dan pergi\n");
//         printf("Semua yang harus di lalui\n");
//         printf("Karna kita terlalu tersakiti\n");
//         printf("Tuk menjadi manusia\n");
//     }

//     return 0;
// }


#include <stdio.h>

int main() {
    int jumlahBaris, jumlahKolom;
    char petaLabirin[105][105];
    int sudahDikunjungi[105][105];

    int posisiBaris[10005], posisiKolom[10005];
    int arahBerikutnya[10005];
    char jalurPerjalanan[10005];

    int perubahanBaris[4] = {0, 1, 0, -1};
    int perubahanKolom[4] = {1, 0, -1, 0};
    char hurufArah[4] = {'R', 'D', 'L', 'U'};

    int tingkatPencarian = 0;
    int pencarianGagal = 0;
    int indeksBaris, indeksKolom;

    scanf("%d %d", &jumlahBaris, &jumlahKolom);

    for (indeksBaris = 0; indeksBaris < jumlahBaris; indeksBaris++) {
        scanf("%s", petaLabirin[indeksBaris]);
    }

    for (indeksBaris = 0; indeksBaris < 105; indeksBaris++) {
        for (indeksKolom = 0; indeksKolom < 105; indeksKolom++) {
            sudahDikunjungi[indeksBaris][indeksKolom] = 0;
        }
    }

    posisiBaris[0] = 0;
    posisiKolom[0] = 0;
    arahBerikutnya[0] = 0;
    sudahDikunjungi[0][0] = 1;

    while (petaLabirin[posisiBaris[tingkatPencarian]][posisiKolom[tingkatPencarian]] != 'E' && pencarianGagal == 0) {
        if (arahBerikutnya[tingkatPencarian] < 4) {
            int nomorArah = arahBerikutnya[tingkatPencarian];
            int barisTujuan = posisiBaris[tingkatPencarian] + perubahanBaris[nomorArah];
            int kolomTujuan = posisiKolom[tingkatPencarian] + perubahanKolom[nomorArah];

            arahBerikutnya[tingkatPencarian]++;

            if (barisTujuan >= 0 && barisTujuan < jumlahBaris && kolomTujuan >= 0 && kolomTujuan < jumlahKolom && (petaLabirin[barisTujuan][kolomTujuan] == '.' || petaLabirin[barisTujuan][kolomTujuan] == 'E') && sudahDikunjungi[barisTujuan][kolomTujuan] == 0) {
                sudahDikunjungi[barisTujuan][kolomTujuan] = 1;
                jalurPerjalanan[tingkatPencarian] = hurufArah[nomorArah];

                tingkatPencarian++;

                posisiBaris[tingkatPencarian] = barisTujuan;
                posisiKolom[tingkatPencarian] = kolomTujuan;
                arahBerikutnya[tingkatPencarian] = 0;
            }
        } else {
            if (tingkatPencarian == 0) {
                pencarianGagal = 1;
            } else {
                tingkatPencarian--;
            }
        }
    }

    if (pencarianGagal == 1) {
        printf("Ditolak loh yaa awokawok\n");
    } else {
        jalurPerjalanan[tingkatPencarian] = '\0';
        printf("%s\n", jalurPerjalanan);

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
