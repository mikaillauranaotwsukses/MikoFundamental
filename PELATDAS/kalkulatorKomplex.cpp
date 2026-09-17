#include <iostream>
using namespace std;

float tambah (float a, float b){
    float x = a + b ;

    return x;
}

float kurang (float a, float b){
    float x = a - b ;

    return x;
}

float kali (float a, float b){
    float x = a * b ;

    return x;
}

float bagi (float a, float b){
    float x = a / b ;

    return x;
}

int main (){
    int a,b,hasil;
    char aritmatika;


    cout << "Selamat Datang di Kalkulator Sederhana" << endl;
    cin.get();
    cout << "Masukan Angka Pertama" << endl;
    cin >> a ;
    cout << "Masukan Angka Kedua" << endl;
    cin >> b ;
    cout << "Masukan Operasi(+,-,/,*)" << endl;
    cin >> aritmatika;

    if (aritmatika == '+'){
        hasil = tambah(a, b);
    }else if (aritmatika == '-'){
        hasil = kurang(a, b);
    }else if(aritmatika == '/'){
        hasil = bagi(a, b);
    }else if(aritmatika == '*'){
        hasil = kali(a, b);
    }else{
        cout << "Operasi anda salah !!!" << endl;
    }

    cout << a << aritmatika << b << "=" << hasil << endl;

    cin.get();
    return 0;
    
}


