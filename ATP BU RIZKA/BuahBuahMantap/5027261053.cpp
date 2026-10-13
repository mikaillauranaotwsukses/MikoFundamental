#include <iostream>
#include <string>

using namespace std;

struct Buah {
    string Nama;
    int Jumlah;
    int Harga;
};

int main() {
    Buah dataBuah;

    cout << "Masukkan nama buah   : ";
    getline(cin, dataBuah.Nama); 

    cout << "Masukkan jumlah buah : ";
    cin >> dataBuah.Jumlah;

    cout << "Masukkan harga buah  : ";
    cin >> dataBuah.Harga;

    cout << "\n=== Data Buah ===" << endl;
    cout << "Nama   : " << dataBuah.Nama << endl;
    cout << "Jumlah : " << dataBuah.Jumlah << endl;
    cout << "Harga  : Rp " << dataBuah.Harga << endl;

    return 0;
}