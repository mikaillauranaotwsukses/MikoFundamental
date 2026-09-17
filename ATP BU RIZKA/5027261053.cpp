#include <iostream>
using namespace std;

/*
    Function untuk menghitung kalkulator, operasi akan menyesuaikan dengan input yang diberikan pengguna
*/
void hitungKalkulator(float a, float b, char aritmatika){
    float hasil = 0;
    
    switch (aritmatika)
    {
    case '1':
        hasil = a + b;
        cout << a << "+" << b << "=" << hasil << endl;
        break;

    case '2':
        hasil = a - b;
        cout << a << "-" << b << "=" << hasil << endl;
        break;
    
    case '3':
        hasil = a * b;
        cout << a << "*" << b << "=" << hasil << endl;
        break;

    case '4':
        hasil = a/b;
        if (b != 0) {
            cout << a << " / " << b << " = " << hasil << endl;
        } else {
            cout << "Error: Pembagian dengan nol tidak diperbolehkan!" << endl;
        }
        break;

    case '5':
        hasil = a + b;
        cout << a << "+" << b << "=" << hasil << endl;
        hasil = a - b;
        cout << a << "-" << b << "=" << hasil << endl;
        hasil = a * b;
        cout << a << "*" << b << "=" << hasil << endl;
        hasil = a/b;
        if (b != 0) {
            cout << a << " / " << b << " = " << hasil << endl;
        } else {
            cout << "Error: Pembagian dengan nol tidak diperbolehkan!" << endl;
        }
        break;
    default:
        cout << "Operasi yang kamu masukkan salah!" << endl;
        break;
    }
}


int main (){
    float a,b,hasil;
    char aritmatika;
    char confirm;

    /*
        do-while memungkinkan untuk user bisa mengulang operasi dari awal lagi
    */
    do
    {
        cout << "Selamat Datang di Kalkulator Sederhana" << endl;
        cout << "Masukan Angka Pertama: "; // User menginput angka pertama
        cin >> a ;
        cout << "Masukan Angka Kedua: "; // User menginput angka kedua
        cin >> b ;
        cout << "Masukan Operasi" << endl; // User memilih ingin melakukan operasi apa atau memilih untuk melakukan semua operator
        cout << "1 = Penjumlahan" << endl; // User memilih ingin melakukan operasi apa atau memilih untuk melakukan semua operator
        cout << "2 = Pengurangan" << endl; // User memilih ingin melakukan operasi apa atau memilih untuk melakukan semua operator
        cout << "3 = Perkalian" << endl; // User memilih ingin melakukan operasi apa atau memilih untuk melakukan semua operator
        cout << "4 = Pembagian" << endl; // User memilih ingin melakukan operasi apa atau memilih untuk melakukan semua operator
        cout << "5 = untuk menghitung semua operator" << endl; // User memilih ingin melakukan operasi apa atau memilih untuk melakukan semua operator
        cin >> aritmatika;
        
        hitungKalkulator(a,b,aritmatika);
        cout << "Apakah ingin mengulang: (Y/N)" << endl;
        cin >> confirm; // input untuk mengonfirmasi apakah ingin mengulang operasi kalkulator
    } while (confirm == 'y' || confirm == 'Y'); 
    
    cout << "\nTerima kasih telah menggunakan kalkulator!" << endl;
    
    cin.get();
    return 0;
    
}
