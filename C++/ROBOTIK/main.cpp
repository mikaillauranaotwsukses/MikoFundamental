#include <iostream>
#include <string>
#include <queue>
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

struct Position {
    int row;
    int col;
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

void findPosition(char target, int &outRow, int &outCol) {
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            if (maze[i][j] == target) {
                outRow = i;
                outCol = j;
                return;
            }
        }
    }
    outRow = -1;
    outCol = -1;
}

int bfsFindPath(int startRow, int startCol, int targetRow, int targetCol, string outPath[]) {
    bool visited[ROWS][COLS];
    int parentRow[ROWS][COLS];
    int parentCol[ROWS][COLS];

    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            visited[i][j] = false;
        }
    }

    queue<Position> q;
    q.push({startRow, startCol});
    visited[startRow][startCol] = true;

    int deltaRow[4] = {-1, 1, 0, 0};
    int deltaCol[4] = {0, 0, -1, 1};
    string dirName[4] = {"UP", "DOWN", "LEFT", "RIGHT"};

    bool found = false;

    while (!q.empty()) {
        Position current = q.front();
        q.pop();

        if (current.row == targetRow && current.col == targetCol) {
            found = true;
            break;
        }

        for (int d = 0; d < 4; d++) {
            int newRow = current.row + deltaRow[d];
            int newCol = current.col + deltaCol[d];

            if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS) continue;

            char tile = maze[newRow][newCol];
            if (visited[newRow][newCol] || tile == '#' || tile == 'X') continue;

            visited[newRow][newCol] = true;
            parentRow[newRow][newCol] = current.row;
            parentCol[newRow][newCol] = current.col;
            q.push({newRow, newCol});
        }
    }

    if (!found) return 0;

    Position pathPositions[ROWS * COLS];
    int pathLength = 0;

    int row = targetRow;
    int col = targetCol;
    while (!(row == startRow && col == startCol)) {
        pathPositions[pathLength] = {row, col};
        pathLength++;
        int prevRow = parentRow[row][col];
        int prevCol = parentCol[row][col];
        row = prevRow;
        col = prevCol;
    }
    pathPositions[pathLength] = {startRow, startCol};
    pathLength++;

    for (int i = pathLength - 1; i > 0; i--) {
        int rowDiff = pathPositions[i - 1].row - pathPositions[i].row;
        int colDiff = pathPositions[i - 1].col - pathPositions[i].col;

        if (rowDiff == -1) outPath[pathLength - 1 - i] = "UP";
        else if (rowDiff == 1) outPath[pathLength - 1 - i] = "DOWN";
        else if (colDiff == -1) outPath[pathLength - 1 - i] = "LEFT";
        else if (colDiff == 1) outPath[pathLength - 1 - i] = "RIGHT";
    }

    return pathLength - 1;
}

int main() {
    int startRow, startCol;
    int flagRow, flagCol;
    int goalRow, goalCol;

    findPosition('S', startRow, startCol);
    findPosition('F', flagRow, flagCol);
    findPosition('G', goalRow, goalCol);

    cout << "START : (" << startRow << "," << startCol << ")" << endl;
    cout << "FLAG  : (" << flagRow << "," << flagCol << ")" << endl;
    cout << "GOAL  : (" << goalRow << "," << goalCol << ")" << endl << endl;

    string pathToFlag[ROWS * COLS];
    int lenToFlag = bfsFindPath(startRow, startCol, flagRow, flagCol, pathToFlag);

    cout << "PATH TO FLAG: ";
    for (int i = 0; i < lenToFlag; i++) {
        cout << pathToFlag[i];
        if (i != lenToFlag - 1) cout << ", ";
    }
    cout << endl;

    string pathToGoal[ROWS * COLS];
    int lenToGoal = bfsFindPath(flagRow, flagCol, goalRow, goalCol, pathToGoal);

    cout << "PATH TO GOAL: ";
    for (int i = 0; i < lenToGoal; i++) {
        cout << pathToGoal[i];
        if (i != lenToGoal - 1) cout << ", ";
    }
    cout << endl << endl;

    int robotRow = startRow;
    int robotCol = startCol;

    cout << "Posisi awal:" << endl;
    printMaze(robotRow, robotCol);

    for (int i = 0; i < lenToFlag; i++) {
        if (pathToFlag[i] == "UP") robotRow--;
        else if (pathToFlag[i] == "DOWN") robotRow++;
        else if (pathToFlag[i] == "LEFT") robotCol--;
        else if (pathToFlag[i] == "RIGHT") robotCol++;

        cout << "Setelah " << pathToFlag[i] << ":" << endl;
        printMaze(robotRow, robotCol);
    }
    cout << "FLAG CAPTURED!" << endl << endl;

    for (int i = 0; i < lenToGoal; i++) {
        if (pathToGoal[i] == "UP") robotRow--;
        else if (pathToGoal[i] == "DOWN") robotRow++;
        else if (pathToGoal[i] == "LEFT") robotCol--;
        else if (pathToGoal[i] == "RIGHT") robotCol++;

        cout << "Setelah " << pathToGoal[i] << ":" << endl;
        printMaze(robotRow, robotCol);
    }
    cout << "MISSION COMPLETE" << endl;
    cout << "TOTAL MOVES: " << (lenToFlag + lenToGoal) << endl;

    return 0;
}