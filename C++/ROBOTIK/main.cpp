#include <iostream>
using namespace std;

const int ROWS = 7;
const int COLS = 7;

char maze[ROWS][COLS] = {
    {'#','#','#','#','#','#','#'},
    {'#','S','.','.','#','G','#'},
    {'#','#','#','.','#','.','#'},
    {'#','.','.','.','.','.','#'},
    {'#','.','#','#','#','.','#'},
    {'#','.','.','X','.','F','#'},
    {'#','#','#','#','#','#','#'}
};

void printMaze(int robotRow, int robotCol) {
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            if (i == robotRow && j == robotCol) {
                cout << "R ";
            } else {
                cout << maze[i][j] << " ";
            }
        }
        cout << endl;
    }
}

int main() {
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            cout << maze[i][j] << " ";
        }
        cout << endl;
    }

    int robotRow = 1;
    int robotCol = 1;

    string commands[] = {"RIGHT", "RIGHT", "DOWN", "DOWN","RIGHT","RIGHT","DOWN","DOWN","UP","UP","UP","UP"};

    cout << "Posisi awal:" << endl;
    printMaze(robotRow, robotCol);

    for (int i = 0; i < 12; i++) {
        if (commands[i] == "UP") robotRow--;
        else if (commands[i] == "DOWN") robotRow++;
        else if (commands[i] == "LEFT") robotCol--;
        else if (commands[i] == "RIGHT") robotCol++;

        cout << "Setelah perintah " << commands[i] << ":" << endl;
        printMaze(robotRow, robotCol);
    }

    return 0;
}


ini saya coba otak atik kode fullnya. Apakah sudah benar?