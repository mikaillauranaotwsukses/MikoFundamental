#include <stdio.h>

int main(){
    int AwalHarga,AdminBiaya,Total,Metode;
    scanf("%d", &Metode);
    scanf("%d", &AwalHarga);

    switch (Metode){
    case 1:
        AdminBiaya = 0;
        Total = AwalHarga + AdminBiaya;
        printf("========STRUK PEMBELIAN======== \n");
        printf("Harga: Rp%d \n", AwalHarga, "\n");
        printf("Metode Pembayaran: Tunai \n");
        printf("Biaya Admin: Rp%d \n", AdminBiaya, "\n");
        printf("------------------------------- \n");
        printf("Total Biaya: Rp%d", Total, "\n");
        break;
    
    case 2:
        AdminBiaya = 1000;
        Total = AwalHarga + AdminBiaya;
        printf("========STRUK PEMBELIAN======== \n");
        printf("Harga: Rp%d \n", AwalHarga);
        printf("Metode Pembayaran: QRIS \n");
        printf("Biaya Admin: Rp%d \n", AdminBiaya);
        printf("------------------------------- \n");
        printf("Total Biaya: Rp%d", Total, "\n");
        break;
    
    case 3:
        AdminBiaya = 1500;
        Total = AwalHarga + AdminBiaya;
        printf("========STRUK PEMBELIAN======== \n");
        printf("Harga: Rp%d \n", AwalHarga);
        printf("Metode Pembayaran: FastPayment \n");
        printf("Biaya Admin: Rp%d \n", AdminBiaya);
        printf("------------------------------- \n");
        printf("Total Biaya: Rp%d \n", Total);
        break;
    
    case 4:
        AdminBiaya = 6000;
        Total = AwalHarga + AdminBiaya;
        printf("========STRUK PEMBELIAN======== \n");
        printf("Harga: Rp%d \n", AwalHarga);
        printf("Metode Pembayaran: Transfer Bank \n");
        printf("Biaya Admin: Rp%d \n", AdminBiaya);
        printf("------------------------------- \n");
        printf("Total Biaya: Rp%d \n", Total);
        break;
    
    default:
        printf("SISTEM TIDAK DIKENALI!");
        break;
    }

    return 0;
}