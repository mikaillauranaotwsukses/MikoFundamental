#include <iostream>
#include <string>

using namespace std;

struct Buah {
    string Nama;
    int Jumlah;
    int Harga;
};

void PrintHasil(const Buah& data) {
    cout << "\n=== Data Buah ===" << endl;
    cout << "Nama   : " << data.Nama << endl;
    cout << "Jumlah : " << data.Jumlah << endl;
    cout << "Harga  : Rp " << data.Harga << endl;
}

int main() {
    Buah dataBuah;

    cout << "Masukkan nama buah   : ";
    getline(cin, dataBuah.Nama);

    cout << "Masukkan jumlah buah : ";
    cin >> dataBuah.Jumlah;

    cout << "Masukkan harga buah  : ";
    cin >> dataBuah.Harga;

    PrintHasil(dataBuah);

    return 0;
}