// #include <iostream>
// #include <string>

// using namespace std;

// string Balik(const string& teks) {
//     // base case: string kosong, berhenti
//     if (teks.empty()) {
//         return "";
//     }

//     // recursive case: balik sisanya, lalu tempel karakter pertama di belakang
//     return Balik(teks.substr(1)) + teks[0];
// }

// int main() {
//     string input;

//     cout << "Masukkan kata: ";
//     getline(cin, input);

//     cout << "Hasil reverse: " << Balik(input) << endl;

//     return 0;
// }



// #include <iostream>
// #include <string>

// using namespace std;

// void Balik(const string& teks, int i) {
//     // base case: indeks sudah lewat karakter pertama, berhenti
//     if (i < 0) {
//         return;
//     }

//     cout << teks[i];       // cetak karakter di posisi i
//     Balik(teks, i - 1);    // lanjut ke karakter sebelumnya
// }

// int main() {
//     string input;

//     cout << "Masukkan kata: ";
//     getline(cin, input);

//     cout << "Hasil reverse: ";
//     Balik(input, input.length() - 1);
//     cout << endl;

//     return 0;
// }

#include <iostream>
#include <string>

using namespace std;

void Balik(string teks, int i) {
    // base case: indeks sudah lewat karakter pertama, berhenti
    if (i < 0) {
        return;
    }

    cout << teks[i];       // cetak karakter di posisi i
    Balik(teks, i - 1);    // lanjut ke karakter sebelumnya
}

int main() {
    string input;

    cout << "Masukkan kata: ";
    getline(cin, input);

    cout << "Hasil reverse: ";
    Balik(input, input.length() - 1);
    cout << endl;

    return 0;
}