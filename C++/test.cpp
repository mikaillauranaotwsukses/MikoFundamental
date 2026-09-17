#include <iostream>
using namespace std;

int main() {
    cout << "Hallo Semua" << endl;

    // int a;
    // cin >> a ;
    // cout << "Nilai Yang Anda Masukan : ";
    // cout << a << endl;

    int a ;
    int b ;
    int hasil;

    cin >> a;
    cin >> b;
    hasil = a * b;

    cout << hasil << endl; 

    if (hasil > 20){
        cout << "Banyak" << endl;
    }


    cin.get();
    return 0;
}