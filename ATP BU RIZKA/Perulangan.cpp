#include <iostream>
using namespace std;

int main(){
    int m,n,o;
    cout << "Masukan Jumlah Baris ";
    cin >> m;

    // for( n = 0; n < m; n++){
    //     for ( o = 0; o < m; o++)
    //     {
    //         cout << "*";
    //     }
    //     cout << endl;
    // }

    n=0;
    while (n < m)
    {
        o=0;
        while (o<m)
        {
            cout << "1";
            o++;
        }
        cout << endl;
        n++;
    }
    
    return 0;
}