#include <iostream>
#include <string>

using namespace std;

struct DataSiswa{
    string NRP;
    string Name;
    int Score[4];
    double AverageScore;
    bool Status;
};

void inputStudent(DataSiswa &s){
    cout << "NRP: ";
    cin >> s.NRP;
    cout << "Name: ";
    cin >> s.Name;
    cout << "Scores (Math, Programming, Database, Statistics): ";
    for(int i = 0; i < 4; i++){
        cin >> s.Score[i];
    }
}

void calculateAverage(DataSiswa &s){
    int total = 0;
    for(int i = 0; i < 4; i++){
        total += s.Score[i];
    }
    s.AverageScore = total / 4.0;
}

void defineStatus(DataSiswa &s){
    if(s.AverageScore >= 75){
        s.Status = true;
    } else {
        s.Status = false;
    }
}

void printReport(DataSiswa siswa[], int n){
    for(int i = 0; i < n; i++){
        cout << "\nNRP: " << siswa[i].NRP << endl;
        cout << "Name: " << siswa[i].Name << endl;
        cout << "Scores: ";
        for(int j = 0; j < 4; j++){
            cout << siswa[i].Score[j] << " ";
        }
        cout << "\nAverage: " << siswa[i].AverageScore << endl;
        if(siswa[i].Status){
            cout << "Status: PASS" << endl;
        } else {
            cout << "Status: NEED ACADEMIC ASSISTANCE" << endl;
        }
    }
}

int main(){
    DataSiswa SiswaMantap[100];
    int n;

    cout << "Number of students: ";
    cin >> n;

    for(int i = 0; i < n; i++){
        cout << "\nStudent " << i + 1 << endl;
        inputStudent(SiswaMantap[i]);
        calculateAverage(SiswaMantap[i]);
        defineStatus(SiswaMantap[i]);
    }

    printReport(SiswaMantap, n);

    return 0;
}