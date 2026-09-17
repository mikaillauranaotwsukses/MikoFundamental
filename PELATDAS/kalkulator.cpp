#include <iostream>
using namespace std;

int main (){
    float a,b,hasil;
    char aritmatika;

    cout << "Selamat Datang di Kalkulator Sederhana" << endl;
    cout << "Masukan Angka Pertama" << endl;
    cin >> a ;
    cout << "Masukan Angka Kedua" << endl;
    cin >> b ;
    cout << "Masukan Operasi(+,-,/,*)" << endl;
    cin >> aritmatika;

    if (aritmatika == '+')
    {
        hasil = a + b;
    }else if (aritmatika == '-'){
        hasil = a - b;
    }else if(aritmatika == '/'){
        hasil = a/b;
    }else if(aritmatika == '*'){
        hasil = a * b;
    }else{
        cout << "Operasi anda salah !!!" << endl;
    }

    cout << a << aritmatika << b << "=" << hasil << endl;

    cin.get();
    return 0;
    
}
