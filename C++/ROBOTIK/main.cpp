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

    int robotRow = 1;
    int robotCol = 1;

    string commands[] = {"RIGHT", "RIGHT", "DOWN", "DOWN"};
    int totalCommands = sizeof(commands);

    cout << "Posisi awal:" << endl;
    printMaze(robotRow, robotCol);

    for (int i = 0; i < totalCommands; i++) {
    int nextRow = robotRow;
    int nextCol = robotCol;

    if (commands[i] == "UP") nextRow--;
    else if (commands[i] == "DOWN") nextRow++;
    else if (commands[i] == "LEFT") nextCol--;
    else if (commands[i] == "RIGHT") nextCol++;

    if (nextRow < 0 || nextRow >= ROWS || nextCol < 0 || nextCol >= COLS) {
        cout << "Perintah " << commands[i] << " ditolak: keluar dari batas map!" << endl;
        continue;
    }

    char nextTile = maze[nextRow][nextCol];

    if (nextTile == '#') {
        cout << "Perintah " << commands[i] << " ditolak: menabrak tembok!" << endl;
        continue;
    }

    if (nextTile == 'X') {
        cout << "Perintah " << commands[i] << " ditolak: menginjak ranjau!" << endl;
        continue;
    }

    robotRow = nextRow;
    robotCol = nextCol;

    cout << "Setelah perintah " << commands[i] << ":" << endl;
    printMaze(robotRow, robotCol);
}

    return 0;
}
