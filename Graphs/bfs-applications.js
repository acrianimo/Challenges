/* Code for the BFS algorithm applied to various practical problems */

/**
 * Gets the path between 2 nodes in a graph, if a path exists
 * If a path doesn't exist, the algorithm returns null
 *
 * @param {Object} adjacencyMatrix represents a graph in adjacency matrix format
 * @param {String} src represents the name of the source node in the graph
 * @param {String} dest represents the name of the destination node in the graph
 * @returns {Array} represents the path between the source and destination nodes
 */

function getPathBetweenNodes(adjacencyMatrix, src, dest) {
  const queue = [src],
    parents = {src: null},
    visited = new Set([src]);
  while (queue.length > 0) {
    const next = queue.shift();
    for (let i = 0; i < adjacencyMatrix[next].length; i++) {
      if (adjacencyMatrix[next][i] && i === dest) {
        parents[dest] = next;
        return getPath(parents, dest);
      }
      if (adjacencyMatrix[next][i] && !visited.has(i)) {
        parents[i] = next;
        queue.push(i);
        visited.add(i);
      }
    }
  }
  return null;
  function getPath(parents, dest) {
    let curr = dest;
    const path = [];
    while (curr) {
      path.push(curr);
      curr = parents[curr];
    }
    path.reverse();
    return path;
  }
}

/**
 * Determines whether a path exists between 2 nodes
 *
 * @param {Object} graph represents a graph in object format (Keys: nodes, Values: neighbors)
 * @param {String} src represents the name of the source node in the graph
 * @param {String} dest represents the name of the destination node in the graph
 * @returns {Boolean} represents whether a path exists between 2 nodes
 */

function doesPathExist(graph, src, dest) {
  const queue = [src],
    visited = new Set([src]);
  while (queue.length > 0) {
    const next = queue.shift(),
      neighbors = graph[next];
    for (const n of neighbors) {
      if (n === dest) {
        return true;
      }
      if (!visited.has(n)) {
        queue.push(n);
        visited.add(n);
      }
    }
  }
  return false;
}

/**
 * Determines the lowest path cost between 2 nodes in an unweighted graph
 *
 * @param {Object} graph represents a graph in object format (Keys: nodes, Values: neighbors)
 * @param {String} src represents the name of the source node in the graph
 * @param {String} dest represents the name of the destination node in the graph
 * @returns {Integer} represents the lowest path cost between the source and the destination
 */
function lowestPathCostBetweenNodes(graph, src, dest) {
  const queue = [{node: src, distance: 0}],
    visited = new Set([src]);
  while (queue.length > 0) {
    const {node, distance} = queue.shift();
    let newDistance = distance + 1;
    const neighbors = graph[node];
    for (const n of neighbors) {
      if (n === dest) {
        return newDistance;
      }
      if (!visited.has(n)) {
        queue.push({node: n, distance: newDistance});
        visited.add(n);
      }
    }
  }
  return -1;
}

/**
 * Determines whether an undirected graph is 2 colorable
 *
 * @param {Object} graph represents a graph in object format (Keys: nodes, Values: neighbors)
 * @param {String} src represents the name of the source node in the graph
 * @param {String} dest represents the name of the destination node in the graph
 * @returns {Boolean} represents whether a graph is 2 colorable
 */
function isGraphBipartite(graph, n) {
  const visited = new Array(n).fill(0),
    queue = [];
  for (let i = 0; i < n; i++) {
    if (visited[i] === 0) {
      queue.push(i);
      while (queue.length > 0) {
        const next = queue.shift(),
          neighbors = graph[next];
        visited[next] = 1;
        for (const n of neighbors) {
          if (visited[n] === 0) {
            queue.push(n);
            visited[n] = visited[next] === 1 ? -1 : 1;
          } else if (visited[n] === visited[next]) {
            return false;
          }
        }
      }
    }
  }
  return true;
}

/**
 * Determines the number of connected components in an undirected graph
 *
 * @param {2-D Array} adjacencyList represents a graph in adjacency list format
 * @param {Integer} n represents the number of nodes in the graph
 * @returns {Integer} represents the number of connected components in the graph
 */
function numberOfConnectedComponents(adjacencyList, n) {
  let count = 0;
  const queue = [],
    visited = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    if (visited[i] === 0) {
      queue.push(i);
      visited[i] = 1;
      count++;
      while (queue.length > 0) {
        const next = queue.shift(),
          neighbors = adjacencyList[next];
        for (const n of neighbors) {
          if (visited[n] === 0) {
            visited[n] = 1;
            queue.push(n);
          }
        }
      }
    }
  }
  return count;
}
