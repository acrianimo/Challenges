/* Code for the DFS algorithm applied to various practical problems */

/**
 * Gets the path between 2 nodes in a graph, if a path exists
 * If a path doesn't exist, the algorithm returns null
 * 
 * @param {Object} graph represents a graph in object format (Keys: nodes, Values: neighbors)
 * @param {String} src represents the name of the source node in the graph
 * @param {String} dest represents the name of the destination node in the graph 
 * @returns {Array} represents the path between the source and destination nodes
 */

function getPathBetweenNodes(graph, src, dest) {
    const parentNodes = {src: null},
        visited = new Set(),
        doesPathExist = doesPathExistHelper(graph, src, dest, parentNodes, visited) || null;
    return doesPathExist && getPath(dest, parentNodes);
    function doesPathExistHelper(graph, node, dest, parentNodes, visited) {
        if (node === dest) {
            return true;
        }
        const neighbors = graph[node];
        for(const n of neighbors) {
            if (!visited.has(n)) {
                parentNodes[n] = node;
                if (getPathBetweenNodesHelper(graph, n, dest, parentNodes, visited)) {
                    return true;
                }
            }
        }
        return false;
    }
    function getPath(node, parentNodes) {
        const path = [];
        let currNode = node;
        while(currNode) {
            path.push(currNode);
            currNode = parentNodes[currNode];
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

function doesPathExist (graph, src, dest) {
    return doesPathExistHelper(graph, src, dest, new Set());
    function doesPathExistHelper(graph, node, dest, visited) {
        if (node === dest) {
            return true;
        }
        visited.add(node);
        const neighbors = graph[node];
        for(const n of neighbors){
            if (!visited.has(n) && doesPathExistHelper(graph, n, dest, visited)) {
                return true;
            }
        }
        return false;
    }
}

/**
 * Determines whether a cycle exists in an undirected graph
 * 
 * @param {Object} graph represents an undirected graph in object format (Keys: nodes, Values: neighbors)
 * @param {String} src represents the name of the source node in the graph
 * @param {String} dest represents the name of the destination node in the graph 
 * @returns {Boolean} represents whether the graph has a cycle 
 */

function hasUndirectedCycle(graph) {
    const visited = new Set();
    for(const node in graph) {
        if (hasUndirectedCycleHelper(graph, node, null, visited)) {
            return true;
        }
    }
    return false;
    function hasUndirectedCycleHelper(graph, node, parent, visited) {
        visited.add(node);
        const neighbors = graph[node];
        for(const n of neighbors) {
            if (!visited.has(n) && hasUndirectedCycleHelper(graph, n, node, visited)) {
                return true;
            } else if (visited.has(n) && parent && n !== parent) {
                return true;                
            }
        }
        return false;
    }
}

/**
 * Determines whether a cycle exists in a directed graph
 * 
 * @param {Object} graph represents a directed graph in object format (Keys: nodes, Values: neighbors)
 * @param {String} src represents the name of the source node in the graph
 * @param {String} dest represents the name of the destination node in the graph 
 * @returns {Boolean} represents whether a cycle exists in a directed graph 
 */

function hasDirectedCycle(graph) {
    const visited = new Set(),
        recurStack = new Set();
    for (const node in graph) {
        if (hasDirectedCycleHelper(graph, node, visited, recurStack)) {
            return true;
        }
    }
    return false;
    function hasDirectedCycleHelper(graph, node, visited, recurStack) {
        visited.add(node);
        recurStack.add(node);
        const neighbors = graph[node];
        for(const neighbor of neighbors) {
            if (!visited.has(neighbor) && hasDirectedCycleHelper(graph, neighbor, visited, recurStack)) {
                return true;
            } else if (recurStack.has(neighbor)) {
                return true;
            }
        }
        recurStack.delete(neighbor);
        return false;
    }
}

/**
 * Groups connected components of a graph
 * 
 * @param {Object} graph represents an undirected graph in object format (Keys: nodes, Values: neighbors)
 * @returns {Object} represents an object containing the number of components in the graph as well as the grouped components of a graph
 */

function getConnectedComponentsDetails(graph) {
    const connectedComponents = [],
        visited = new Set();
    for(const node in graph) {
        if (!visited.has(node)) {
            const connectedComponent = [];
            getConnectedComponentsDetailsHelper(graph, node, visited, connectedComponent);
            connectedComponents.push(connectedComponent);
        }
    }
    return {
        numberOfConnectedComponents: connectedComponents.length,
        connectedComponents
    };
    function getConnectedComponentsDetailsHelper(graph, node, visited, connectedComponent) {
        visited.add(node);
        connectedComponent.push(node);
        const neighbors = graph[node];
        for(const n of neighbors) {
            if (!visited.has(n)) {
                getConnectedComponentsDetailsHelper(graph, n, visited, connectedComponent);
            }
        }
    }
}

/**
 * Determines whether a graph in Adjacency Matrix format is bipartite 
 * 
 * @param {2D-Array} adjacencyMatrix represents a graph in adjacency matrix format
 * @param {Integer} n represents the number of nodes in a graph
 * @returns {Boolean} represents whether a graph is bipartite
 */
function isGraphTwoColorable(adjacencyMatrix, n) {
    const visited = new Array(n).fill(0);
    for(let i = 0; i < n; i++) {
        if (visited[i] === 0 && !isGraphTwoColorableHelper(adjacencyMatrix, 1, i, visited)) {
            return false;
        }
    }
    return true;
    function isGraphTwoColorableHelper(adjacencyMatrix, color, n, visited) {
        if (visited[n] !== 0) {
            return color !== visited[n];
        }
        visited[n] = color;
        for(let i  = 0; i < adjacencyMatrix[n].length; i++) {
            if (adjacencyMatrix[n][i] && !isGraphTwoColorableHelper(adjacencyMatrix, -color, i, visited)) {
                return false;
            }
        }
        return true;
    }
} 