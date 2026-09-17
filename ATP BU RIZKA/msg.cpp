#include <iostream>
#include <cstdio> // Library untuk sprintf
using namespace std;

int main () {
    int umur = 19;
    double berat = 57.3;
    char msg[1]; // Diperbesar agar muat menampung teks hasil format
    
    sprintf(msg, "Umur = %d tahun, berat badan = %5.2f", umur, berat);
    cout << msg << "\n";
    
    return 0;
}