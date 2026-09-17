#include <iostream>
using namespace std;

int main(){
    int n,i;
    bool isPrime;

    isPrime = true;

    cin >> n ;

    if ( n < 2) 
    {
        isPrime = false;
    }else{
        for( i = 2; i < n; i++){
            if( n % i == 0) {
                isPrime = false;
                break;
            }
        }
    }

    if (isPrime == true)
    {
        cout << "Bilangan Prima" << endl;
    }else{
        cout << "Bilangan Bukan Prima" <<  endl;
    }

}