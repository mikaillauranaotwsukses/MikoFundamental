#include <iostream>


using namespace std;

void SistemMemperbagusNilai(int &nilai){
    if (nilai < 50){
        nilai += 20;
    }else if(nilai >= 50 && nilai <= 69){
        nilai += 15;
    }else if(nilai >= 70 && nilai <= 79){
        nilai += 10;
    }else if(nilai >= 80 && nilai <= 89){
        nilai += 5;
    }else{
        nilai = nilai;
    }
    
}
int main (){
    int InputNilai;

    cin >> InputNilai;
    SistemMemperbagusNilai(InputNilai);
    if (InputNilai < 75){
        cout << InputNilai << endl;
        cout << "REMIDI" << endl;
    }else{
        cout << InputNilai << endl;
        cout << "LULUS" << endl;
    }
    
}