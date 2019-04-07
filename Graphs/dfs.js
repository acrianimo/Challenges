/* Code for the DFS algorithm applied to many different graph formats */

/**
 * The DFS algorithm applied to a graph represented by an Adjacency Matrix
 * @param {2D-Array} adjacencyMatrix represents a graph in Adjacency Matrix format
 */

function dfsAdjacencyMatrix(adjacencyMatrix) {
    const n = adjacencyMatrix.length,
        visited = new Array(n).fill(0);
    for(let i = 0; i < n; i++) {
        if (!visited[i]) {
            dfsHelper(adjacencyMatrix, i, visited);
        }
    }
    function dfsHelper(adjacencyMatrix, node, visited) {
        console.log(node);
        visited[node] = 1;
        const neighbors = adjacencyMatrix[node];
        for(let i = 0; i < neighbors.length; i++) {
            if (neighbors[i] && !visited[i]) {
                dfsHelper(adjacencyMatrix, i, visited);
            }
        }
    }
}

/**
 * The DFS algorithm applied to a graph represented by an Adjacency List
 * @param {2D-Array} adjacencyList represents a graph in Adjacency List format
 */

function dfsAdjacencyList(adjacencyList) {
    const n = adjacencyList.length,
        visited = new Array(n).fill(0);
    for(let i = 0; i < n; i++) {
        if (!visited[i]) {
            dfsHelper(adjacencyList, i, visited);
        }
    }
    function dfsHelper(adjacencyList, node, visited) {
        console.log(node);
        visited[node] = 1;
        const neighbors = adjacencyList[node];
        for(let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];
            if (!visited[neighbor]) {
                dfsHelper(adjacencyList, neighbor, visited);
            }
        }
    }
}

/**
 * The DFS algorithm applied to a graph represented by an Edge List
 * @param {2D-Array} edgeList represents a graph in Edge List format
 * @param {Integer} n represents the number of nodes in the graph 
 */

function dfsEdgeList(edgeList, n) {
    const graph = buildGraph(edgeList),
        visited = new Array(n).fill(0);
    for(const node in graph) {
        if (!visited[node]) {
            dfsHelper(graph, node, visited);
        }
    }
    function dfsHelper(graph, node, visited) {
        console.log(node);
        visited[node] = 1;
        const neighbors = graph[node];
        for(const neighbor of neighbors) {
            if (!visited[neighbor]) {
                dfsHelper(graph, neighbor, visited);
            }
        }
    }
    function buildGraph(edgeList, n) {
        const graph = initializeGraph(n);
        for(const edge of edgeList) {
            const [src, dest] = edge;
            graph[src].add(dest);
        }
        return graph;
        function initializeGraph(n) {
            const graph = {};
            for(let i = 0; i < n; i++) {
                graph[i] = new Set();
            }
            return graph;
        }
    }
}

/**
 * The DFS algorithm applied to a node in a graph
 * @param {Object} node represents a node object in a graph (Format: {name: String, neighbors: Set})
 */

function dfsNodeObj(node) {
    const visited = new Set();
    dfsHelper(node, visited);
    function dfsHelper(node, visited) {
        const {name, neighbors} = node;
        console.log(name);
        visited.add(name);
        for(const neighbor of neighbors) {
            const {name} = neighbor;
            if (!visited.has(neighbor.name)) {
                dfsHelper(neighbor, visited);
            }
        }
    }
}

/**
 * The DFS algorithm applied to a graph represented by an object
 * @param {Object} graph represents a graph in object format (Keys: nodes, Values: neighbors)
 */

function dfsGraphObj(graph) {
    const visited = new Set();
    for(const node in graph) {
        if (!visited.has(node)) {
            dfsHelper(graph, node, visited);
        }
    }
    function dfsHelper(graph, node, visited) {
        console.log(node);
        visited.add(node);
        const neighbors = graph[node];
        for(const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                dfsHelper(graph, neighbor, visited);
            }
        }
    }
}   