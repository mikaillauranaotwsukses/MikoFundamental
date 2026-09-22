#include <iostream>
#include <string>
#include <queue>
using namespace std;

const int ROWS = 7;
const int COLS = 7;

char maze[ROWS][COLS] = {
    {'#','#','#','#','#','#','#'},
    {'#','S','#','.','.','.','#'},
    {'#','.','#','.','#','G','#'},
    {'#','.','.','.','#','.','#'},
    {'#','#','#','.','.','.','#'},
    {'#','X','.','.','F','.','#'},
    {'#','#','#','#','#','#','#'}
};

struct Position {
    int row;
    int col;
};

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

class RobotBase {
protected:
    int currentRow;
    int currentCol;

public:
    RobotBase(int startRow, int startCol) {
        currentRow = startRow;
        currentCol = startCol;
    }

    void Viz() {
        for (int i = 0; i < ROWS; i++) {
            for (int j = 0; j < COLS; j++) {
                if (i == currentRow && j == currentCol) {
                    cout << "R ";
                } else {
                    cout << maze[i][j] << " ";
                }
            }
            cout << endl;
        }
        cout << endl;
    }
};

class Robot : public RobotBase {
public:
    Robot(int startRow, int startCol) : RobotBase(startRow, startCol) {}

    int findPathTo(int targetRow, int targetCol, string outPath[]) {
        bool visited[ROWS][COLS];
        int parentRow[ROWS][COLS];
        int parentCol[ROWS][COLS];

        for (int i = 0; i < ROWS; i++)
            for (int j = 0; j < COLS; j++)
                visited[i][j] = false;

        queue<Position> q;
        q.push({currentRow, currentCol});
        visited[currentRow][currentCol] = true;

        int deltaRow[4] = {-1, 1, 0, 0};
        int deltaCol[4] = {0, 0, -1, 1};

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
        while (!(row == currentRow && col == currentCol)) {
            pathPositions[pathLength] = {row, col};
            pathLength++;
            int prevRow = parentRow[row][col];
            int prevCol = parentCol[row][col];
            row = prevRow;
            col = prevCol;
        }
        pathPositions[pathLength] = {currentRow, currentCol};
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

    void moveAlongPath(string path[], int length) {
        for (int i = 0; i < length; i++) {
            if (path[i] == "UP") currentRow--;
            else if (path[i] == "DOWN") currentRow++;
            else if (path[i] == "LEFT") currentCol--;
            else if (path[i] == "RIGHT") currentCol++;

            cout << "Setelah " << path[i] << ":" << endl;
            Viz();
        }
    }

    void executeMission() {
        int flagRow, flagCol;
        int goalRow, goalCol;
        findPosition('F', flagRow, flagCol);
        findPosition('G', goalRow, goalCol);

        cout << "Posisi awal:" << endl;
        Viz();

        string pathToFlag[ROWS * COLS];
        int lenToFlag = findPathTo(flagRow, flagCol, pathToFlag);
        moveAlongPath(pathToFlag, lenToFlag);
        cout << "FLAG CAPTURED!" << endl << endl;

        string pathToGoal[ROWS * COLS];
        int lenToGoal = findPathTo(goalRow, goalCol, pathToGoal);
        moveAlongPath(pathToGoal, lenToGoal);

        cout << "MISSION COMPLETE" << endl;
        cout << "TOTAL MOVES: " << (lenToFlag + lenToGoal) << endl;
    }
};

int main() {
    int startRow, startCol;
    findPosition('S', startRow, startCol);

    Robot robot1(startRow, startCol);
    robot1.executeMission();

    return 0;
}