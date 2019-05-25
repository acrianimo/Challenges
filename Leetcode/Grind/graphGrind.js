function cloneGraph(node) {
    if (!node) {
        return null;
    }

    const nodeCopies = new Map(),
        queue = [node];
    
    const startNodeCopy = new Node(node.val, []);
    nodeCopies.set(startNodeCopy.val, startNodeCopy);

    while(queue.length > 0) {
        const currNode = queue.shift(),
            currCopyNode = nodeCopies.get(currNode.val);
        for(const n of currNode.neighbors) {
            if (!nodeCopies.has(n.val)) {
                queue.push(n);
                nodeCopies.set(n.val, new Node(n.val, []));
            }
            currCopyNode.neighbors.push(nodeCopies.get(n.val));
        }
    }

    return startNodeCopy;
}

function canFinish(numCourses, prerequisites) {
    const neighbors = {},
        indegrees = new Array(numCourses).fill(0);
    for(const [dest, src] of prerequisites) {
        if (!(dest in neighbors)) {
            neighbors[dest] = new Set();
        } 
        if (!(src in neighbors)) {
            neighbors[src] = new Set();
        }
        neighbors[src].add(dest);
        indegrees[dest]++;
    }
    const queue = [];
    for(let i = 0; i < indegrees.length; i++) {
        if (indegrees[i] === 0) {
            queue.push(i);
        }
    }
    let coursesLeft = numCourses;
    while(queue.length > 0) {
        const n = queue.shift();
        coursesLeft--;
        for(const neighbor of neighbors[n]) {
            if(--indegrees[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    return coursesLeft === 0;
}

const grid = [
    [1, 0, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1]
];

function numIslands(grid) {
    let numIslands = 0;

    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 1) {
                numIslands++;

                const queue = [[i, j]];

                while(queue.length > 0) {
                    const [row, col] = queue.shift();
                    grid[row][col] = 0;

                    const rowD = [1, -1, 0, 0],
                        colD = [0, 0, 1, -1];

                    for(let i = 0; i < 4; i++) {
                        const newRow = row + rowD[i],
                            newCol = col + colD[i];

                        if (newRow < 0 || newCol < 0 || newRow === grid.length || newCol === grid[0].length) {
                            continue;
                        }
                        if (grid[newRow][newCol] === 0) {
                            continue;
                        }

                        queue.push([newRow, newCol]);
                    }
                }
            }
        }
    }

    return numIslands;

    function markV1(grid, row, col) {
        if (row < 0 || col < 0 || row === grid.length || col === grid[0].length || grid[row][col] === 0) {
            return;
        }
        grid[row][col] = 0;
        markV1(grid, row + 1, col);
        markV1(grid, row - 1, col);
        markV1(grid, row, col + 1);
        markV1(grid, row, col - 1);
    }
}

function pacificAtlantic(matrix) {
    const rows = matrix.length,
        cols = matrix[0].length;

    const pacificVisited = createVisitedMatrix(rows, cols);
    const atlanticVisited = createVisitedMatrix(rows, cols);
    const pacificQueue = [];
    const atlanticQueue = [];

    for(let i = 0; i < rows; i++) {
        pacificQueue.push([0, i]);
        pacificVisited[0][i] = true;
        atlanticQueue.push([cols - 1, i]);
        atlanticVisited[cols - 1][i] = true;
    }

    for(let i = 0; i < cols; i++) {
        pacificQueue.push([i, 0]);
        pacificQueue[i][0] = true;
        atlanticQueue.push([rows - 1, i]);
        atlanticVisited[rows - 1][i] = true;
    }

    bfs(matrix, atlanticQueue, atlanticVisited);
    bfs(matrix, pacificQueue, pacificVisited);

    const coordinates = [];

    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            if (pacificVisited[i][j] && atlanticVisited[i][j]) {
                coordinates.push([i, j]);
            }
        }
    }

    return coordinates;

    function bfs(matrix, queue, visited) {
        while(queue.length > 0) {
            const [row, col] = queue.shift();

            const rowD = [1, -1, 0, 0],
                colD = [0, 0, 1, -1];

            for(let i = 0; i < 4; i++) {
                const newRow = rowD[i] + row,
                    newCol = colD[i] + col;

                if (newRow < 0 || newCol < 0 || newRow === matrix.length || newCol === matrix[0].length) {
                    continue;
                }
                if (visited[newRow][newCol] || matrix[newRow][newCol] < matrix[row][col]) {
                    continue;
                }

                queue.push([newRow, newCol]);
            }
        }
    }

    function createVisitedMatrix(rows, cols) {
        const visitedMatrix = [];
        for(let i = 0; i < rows; i++) {
            visitedMatrix.push(new Array(cols).fill(false));
        }
        return visitedMatrix;
    }
}