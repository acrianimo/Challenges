const root = createNode("*");
root.left = createNode("+");
root.left.left = createNode("3");
root.left.right = createNode("2");
root.right = createNode("+");
root.right.left = createNode("4");
root.right.right = createNode("5");

console.log(evaluate(root));

function createNode(val) {
    return {
        val,
        left: null,
        right: null
    };
}

function evaluate(node) {
    if (!node) {
        return 0;
    }
    const {val} = node;
    
    if (!node.left && !node.right) {
        return parseInt(val);
    }
    
    const left = evaluate(node.left),
        right = evaluate(node.right);
    
    if (val === "+") {
        return left + right;
    } else if (val === "-") {
        return left - right;
    } else if (val === "/") {
        return left / right;
    }
    return left * right; 
}