#include <iostream>

using namespace std;

int main() {
    int n;
    cout << "Input: ";
    cin >> n;
    cout << "Output:\n";

    int i = 1;
    while (i <= n) {
        int j = n;
        while (j > i) {
            cout << " ";
            j--;
        }

        int k = 1;
        while (k <= i) {
            cout << "😘"; 
            k++;
        }
        
        cout << endl;
        i++;
    }

    return 0;
}