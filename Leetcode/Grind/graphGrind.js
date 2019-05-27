/* https://leetcode.com/problems/clone-graph/ */
function cloneGraph(node) {
  if (!node) {
    return null;
  }

  const nodeCopies = new Map(),
    queue = [node];

  const startNodeCopy = new Node(node.val, []);
  nodeCopies.set(startNodeCopy.val, startNodeCopy);

  while (queue.length > 0) {
    const currNode = queue.shift(),
      currCopyNode = nodeCopies.get(currNode.val);
    for (const n of currNode.neighbors) {
      if (!nodeCopies.has(n.val)) {
        queue.push(n);
        nodeCopies.set(n.val, new Node(n.val, []));
      }
      currCopyNode.neighbors.push(nodeCopies.get(n.val));
    }
  }

  return startNodeCopy;
}

/* https://leetcode.com/problems/course-schedule/ */
function canFinish(numCourses, prerequisites) {
  const neighbors = {},
    indegrees = new Array(numCourses).fill(0);
  for (const [dest, src] of prerequisites) {
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
  for (let i = 0; i < indegrees.length; i++) {
    if (indegrees[i] === 0) {
      queue.push(i);
    }
  }
  let coursesLeft = numCourses;
  while (queue.length > 0) {
    const n = queue.shift();
    coursesLeft--;
    for (const neighbor of neighbors[n]) {
      if (--indegrees[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }
  return coursesLeft === 0;
}

/* https://leetcode.com/problems/number-of-islands/ */
function numIslands(grid) {
  let numIslands = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 1) {
        numIslands++;
        bfs(grid, i, j);
      }
    }
  }

  return numIslands;

  function bfs(grid, i, j) {
    const queue = [[i, j]];
    while (queue.length > 0) {
      const [row, col] = queue.shift();
      grid[row][col] = 0;

      const rowD = [1, -1, 0, 0],
        colD = [0, 0, 1, -1];

      for (let i = 0; i < 4; i++) {
        const newRow = row + rowD[i],
          newCol = col + colD[i];

        if (
          newRow < 0 ||
          newCol < 0 ||
          newRow === grid.length ||
          newCol === grid[0].length
        ) {
          continue;
        }
        if (grid[newRow][newCol] === 0) {
          continue;
        }

        queue.push([newRow, newCol]);
      }
    }
  }

  function dfs(grid, row, col) {
    if (
      row < 0 ||
      col < 0 ||
      row === grid.length ||
      col === grid[0].length ||
      grid[row][col] === 0
    ) {
      return;
    }
    grid[row][col] = 0;
    const rowD = [1, -1, 0, 0],
      colD = [0, 0, 1, -1];
    for (let i = 0; i < 4; i++) {
      markV1(grid, rowD[i] + row, colD[i] + col);
    }
  }
}

/* https://leetcode.com/problems/pacific-atlantic-water-flow/ */
function pacificAtlantic(matrix) {
  const rows = matrix.length,
    cols = matrix[0].length;

  const pacificVisited = createVisitedMatrix(rows, cols);
  const atlanticVisited = createVisitedMatrix(rows, cols);
  const pacificQueue = [];
  const atlanticQueue = [];

  for (let i = 0; i < rows; i++) {
    pacificQueue.push([i, 0]);
    pacificVisited[i][0] = true;
    atlanticQueue.push([i, cols - 1]);
    atlanticVisited[i][cols - 1] = true;
  }

  for (let i = 0; i < cols; i++) {
    pacificQueue.push([0, i]);
    pacificVisited[0][i] = true;
    atlanticQueue.push([rows - 1, i]);
    atlanticVisited[rows - 1][i] = true;
  }

  bfs(matrix, atlanticQueue, atlanticVisited);
  bfs(matrix, pacificQueue, pacificVisited);

  const coordinates = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (pacificVisited[i][j] && atlanticVisited[i][j]) {
        coordinates.push([i, j]);
      }
    }
  }

  return coordinates;

  function bfs(matrix, queue, visited) {
    while (queue.length > 0) {
      const [row, col] = queue.shift();

      const rowD = [1, -1, 0, 0],
        colD = [0, 0, 1, -1];

      for (let i = 0; i < 4; i++) {
        const newRow = rowD[i] + row,
          newCol = colD[i] + col;

        if (
          newRow < 0 ||
          newCol < 0 ||
          newRow === matrix.length ||
          newCol === matrix[0].length
        ) {
          continue;
        }
        if (
          visited[newRow][newCol] ||
          matrix[newRow][newCol] < matrix[row][col]
        ) {
          continue;
        }

        visited[newRow][newCol] = true;
        queue.push([newRow, newCol]);
      }
    }
  }

  function createVisitedMatrix(rows, cols) {
    const visitedMatrix = [];
    for (let i = 0; i < rows; i++) {
      visitedMatrix.push(new Array(cols).fill(false));
    }
    return visitedMatrix;
  }
}

/* https://leetcode.com/problems/longest-consecutive-sequence/ */
function longestConsecutiveV1(nums) {
  if (!nums || nums.length === 0) {
    return 0;
  }
  nums.sort((a, b) => a - b);
  let longestConsecutive = 1,
    k = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1] + 1) {
      k++;
      longestConsecutive = Math.max(k, longestConsecutive);
    } else {
      k = 1;
    }
  }
  return longestConsecutive;
}

/* https://leetcode.com/problems/longest-consecutive-sequence/ */
function longestConsecutiveV2(nums) {
  if (!nums || nums.length === 0) {
    return 0;
  }
  nums = new Set(nums);
  let longestConsecutive = 1;
  for (const num of nums) {
    let count = 1,
      start = num;
    while (nums.has(++start)) {
      count++;
    }
    longestConsecutive = Math.max(count, longestConsecutive);
  }
  return longestConsecutive;
}

/* https://leetcode.com/problems/alien-dictionary/ */
function alienOrder(words) {
  if (words.length === 0) {
    return "";
  }
  if (words.length === 1) {
    return words[0];
  }

  const {graph, indegrees} = getGraphAndIndegrees(words),
    order = topologicalSort(graph, indegrees);

  return order;

  function getGraphAndIndegrees(words) {
    const graph = new Map(),
      indegrees = {};
    for (let i = 0; i < words.length - 1; i++) {
      const minLen = Math.min(words[i].length, words[i + 1].length);
      for (let j = 0; j < minLen; j++) {
        const l1 = words[i][j],
          l2 = words[i + 1][j];
        if (!graph.has(l1)) {
          graph.set(l1, new Set());
          indegrees[l1] = 0;
        }
        if (l1 === l2 || graph.get(l1).has(l2)) {
          continue;
        }
        if (!graph.has(l2)) {
          graph.set(l2, new Set());
          indegrees[l2] = 0;
        }
        graph.get(l1).add(l2);
        indegrees[l2]++;
      }
    }
    return {graph, indegrees};
  }

  function topologicalSort(graph, indegrees) {
    let order = "";
    const queue = [];
    for (const l in indegrees) {
      if (indegrees[l] === 0) {
        queue.push(l);
      }
    }
    while (queue.length > 0) {
      const l = queue.shift();
      order += l;
      const neighbors = graph.get(l);
      for (const n of neighbors) {
        if (--indegrees[n] === 0) {
          queue.push(n);
        }
      }
    }
    return graph.size === order.length ? order : "";
  }
}

/* https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/ */
function countComponents(n, edges) {
  const graph = buildGraph(n, edges),
    visited = new Set();
  let count = 0;
  for (const node in graph) {
    if (!visited.has(parseInt(node))) {
      dfs(graph, node, visited);
      count++;
    }
  }
  return count;

  function dfs(graph, n, visited) {
    visited.add(n);
    const neighbors = graph[n];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        dfs(graph, neighbor, visited);
      }
    }
  }

  function buildGraph(n, edges) {
    const graph = {};
    for (let i = 0; i < n; i++) {
      graph[i] = new Set();
    }
    for (const edge of edges) {
      const [src, dest] = edge;
      graph[src].add(dest);
      graph[dest].add(src);
    }
    return graph;
  }
}
