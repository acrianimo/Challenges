/* Code for the BFS algorithm applied to many different graph formats */
/* All algorithms assume that valid inputs are passed in as parameters */

/**
 * The BFS algorithm applied to a graph represented by an Adjacency Matrix
 * @param {2D-Array} adjacencyMatrix represents a graph in Adjacency Matrix format
 */

function bfsAdjacencyMatrix(adjacencyMatrix) {
  const n = adjacencyMatrix.length,
    visited = new Array(n).fill(0),
    queue = [];
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      queue.push(i);
      visited[i] = 1;
      while (queue.length > 0) {
        const next = queue.shift(),
          neighbors = adjacencyMatrix[next];
        for (let j = 0; j < neighbors.length; j++) {
          if (neighbors[j] && !visited[j]) {
            queue.push(j);
            visited[j] = 1;
          }
        }
        console.log(next);
      }
    }
  }
}

/**
 * The BFS algorithm applied to a graph represented by an Adjacency List
 * @param {2D-Array} adjacencyList represents a graph in Adjacency List format
 */

function bfsAdjacencyList(adjacencyList) {
  const n = adjacencyList.length,
    visited = new Array(n).fill(0),
    queue = [];
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      queue.push(i);
      visited[i] = 1;
      while (queue.length > 0) {
        const next = queue.shift(),
          neighbors = adjacencyList[next];
        for (const n of neighbors) {
          if (!visited[n]) {
            queue.push(n);
            visited[n] = 1;
          }
        }
        console.log(next);
      }
    }
  }
}

/**
 * The BFS algorithm applied to a graph represented by an Edge List
 * @param {2D-Array} edgeList represents a graph in Edge List format
 * @param {Integer} n represents the number of nodes in the graph
 */

function bfsEdgeList(edgeList, n) {
  const visited = new Array(n).fill(0),
    graph = buildGraph(edgeList),
    queue = [];
  for (const node in graph) {
    if (!visited[node]) {
      queue.push(node);
      visited[node] = 1;
      while (queue.length > 0) {
        const next = queue.shift(),
          neighbors = graph[next];
        for (const n of neighbors) {
          if (!visited[n]) {
            queue.push(n);
            visited[n] = 1;
          }
        }
        console.log(next);
      }
    }
  }
  function buildGraph(edgeList) {
    const graph = {};
    for (const edge of edgeList) {
      const [src, dest] = edge;
      if (!(src in graph)) {
        graph[src] = new Set();
      }
      if (!(dest in graph)) {
        graph[dest] = new Set();
      }
      graph[src].add(dest);
    }
  }
}

/**
 * The BFS algorithm applied to a node in a graph
 * @param {Object} node represents a node object in a graph (Format: {name: String, neighbors: Set})
 */

function bfsNodeObj(node) {
  const queue = [node],
    visited = new Set([node]);
  while (queue.length > 0) {
    const next = queue.shift(),
      {neighbors, name} = next;
    for (const n of neighbors) {
      if (!visited.has(n.name)) {
        queue.push(n);
        visited.add(n.name);
      }
    }
    console.log(name);
  }
}

/**
 * The BFS algorithm applied to a graph represented by an object
 * @param {Object} graph represents a graph in object format (Keys: nodes, Values: neighbors)
 */

function bfsGraphObj(graph) {
  const queue = [],
    visited = new Set();
  for (const node in graph) {
    if (!visited.has(node)) {
      queue.push(node);
      visited.add(node);
      while (queue.length > 0) {
        const next = queue.shift(),
          neighbors = graph[next];
        for (const n of neighbors) {
          if (!visited.has(n)) {
            queue.push(n);
            visited.add(n);
          }
        }
        console.log(next);
      }
    }
  }
}
