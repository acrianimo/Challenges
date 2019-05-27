/* https://leetcode.com/problems/same-tree/ */
function sameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return sameTree(p.left, q.left) && sameTree(p.right, q.right);
}

/* https://leetcode.com/problems/maximum-depth-of-binary-tree/ */

function maxDepth(root) {
  if (!root) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

/* https://leetcode.com/problems/invert-binary-tree/ */
function invertTree(root) {
  if (!root) {
    return null;
  }
  const temp = root.left;
  root.left = invertTree(root.right);
  root.right = invertTree(temp);
  return root;
}

/* https://leetcode.com/problems/binary-tree-maximum-path-sum/ */
function maxPathSum(root) {
  if (!root) return null;
  let maxPathSum = -Infinity;
  maxPathSumHelper(root);
  return maxPathSum;

  function maxPathSumHelper(root) {
    if (!root) return null;
    const left = maxPathSumHelper(root.left);
    const right = maxPathSumHelper(root.right);
    let localMax = -Infinity;
    if (left && right) {
      localMax = Math.max(localMax, root.val + left + right);
    }
    if (left) {
      localMax = Math.max(localMax, root.val + left);
    }
    if (right) {
      localMax = Math.max(localMax, root.val + right);
    }
    localMax = Math.max(localMax, root.val);
    maxPathSum = Math.max(maxPathSum, localMax);
    return localMax;
  }
}

/* https://leetcode.com/problems/binary-tree-level-order-traversal/ */
function levelOrder(root) {
  if (!root) {
    return [];
  }
  let queue = [root],
    currLvl = [],
    nextLvl = [];

  const allLvls = [];

  while (queue.length > 0) {
    const front = queue.shift();
    currLvl.push(front.val);
    if (front.left) {
      nextLvl.push(front.left);
    }
    if (front.right) {
      nextLvl.push(front.right);
    }
    if (queue.length === 0) {
      allLvls.push(currLvl);
      currLvl = [];
      queue = nextLvl;
      nextLvl = [];
    }
  }

  return allLvls;
}

function createNode(val) {
  return {
    val,
    left: null,
    right: null
  };
}

/* https://leetcode.com/problems/serialize-and-deserialize-binary-tree/ */
function serialize(node) {
  if (!node) return "null";
  let maxIndex = 0;
  const nodes = {},
    queue = [{node, index: 0}];
  while (queue.length > 0) {
    const {node, index} = queue.shift();
    nodes[index] = node;
    if (node.left) {
      const leftChildIndex = 2 * index + 1;
      maxIndex = Math.max(maxIndex, leftChildIndex);
      queue.push({node: node.left, index: leftChildIndex});
    }
    if (node.right) {
      const rightChildIndex = 2 * index + 2;
      maxIndex = Math.max(maxIndex, rightChildIndex);
      queue.push({node: node.right, index: rightChildIndex});
    }
  }
  const data = [];
  for (let i = 0; i <= maxIndex; i++) {
    if (nodes[i]) {
      data.push(nodes[i].val.toString());
    } else {
      data.push("null");
    }
  }
  return data.join(",");
}

/* https://leetcode.com/problems/serialize-and-deserialize-binary-tree/ */
function deserialize(str) {
  const data = str.split(",");
  return deserializeHelper(data, 0);

  function deserializeHelper(data, index) {
    if (index >= data.length || data[index] === "null") {
      return null;
    }
    const n = createNode(data[index]);
    n.left = deserializeHelper(data, 2 * index + 1);
    n.right = deserializeHelper(data, 2 * index + 2);
    return n;
  }

  function createNode(val) {
    return {
      val,
      next: null,
      right: null
    };
  }
}

/* https://leetcode.com/problems/subtree-of-another-tree/ */
function isSubtree(a, b) {
  if (!a && !b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  return sameTree(a, b) || isSubtree(a.left, b) || isSubtree(a.right, b);
}

/* https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/ */
function buildTree(preorder, inorder) {
  const map = inorder.reduce((map, next, index) => {
    map[next] = index;
    return map;
  }, {});

  let preorderIndex = -1;

  return buildTreeHelper(0, inorder.length - 1);

  function buildTreeHelper(inorderLo, inorderHi) {
    if (
      preorderIndex === preorder.length ||
      inorderLo < 0 ||
      inorderHi === inorder.length ||
      inorderLo > inorderHi
    ) {
      return null;
    }
    const node = createNode(preorder[++preorderIndex]),
      inorderIndex = map[node.val];
    node.left = buildTreeHelper(inorderLo, inorderIndex - 1);
    node.right = buildTreeHelper(inorderIndex + 1, inorderHi);
    return node;
  }
}

/* https://leetcode.com/problems/validate-binary-search-tree/ */
function validateBST(root) {
  return validateBSTHelper(root, -Infinity, +Infinity);

  function validateBSTHelper(n, min, max) {
    if (!n) {
      return true;
    }
    if (n.val < min || n.val > max) {
      return false;
    }
    return (
      validateBSTHelper(n.left, min, n.val) &&
      validateBSTHelper(n.right, n.val, max)
    );
  }
}

/* https://leetcode.com/problems/kth-smallest-element-in-a-bst/ */
function kthSmallestV1(root, k) {
  const inorderElements = getElementsInorder(root);
  if (k - 1 >= inorderElements.length) {
    return null;
  }
  return inorderElements[k - 1];

  function getElementsInorder(n) {
    const inorderElements = [];
    getElementsInorderHelper(n);
    return inorderElements;

    function getElementsInorderHelper(n) {
      if (!n) {
        return;
      }
      getElementsInorderHelper(n.left);
      inorderElements.push(n.val);
      getElementsInorderHelper(n.right);
    }
  }
}

/* https://leetcode.com/problems/kth-smallest-element-in-a-bst/ */
function kthSmallestV2(root, k) {
  const stack = [];
  let curr = 0;

  while (root) {
    stack.push(root);
    root = root.left;
  }

  while (stack.length > 0) {
    const top = stack.pop();
    curr += 1;
    if (curr === k) {
      return top.val;
    }
    if (top.right) {
      root = top.right;
      while (root) {
        stack.push(root);
        root = root.left;
      }
    }
  }

  return null;
}

/* https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/ */
function lowestCommonAncestorV1(root, p, q) {
  if (!root) {
    return null;
  }
  const val = parseInt(root.val);
  if (val === p || val === q) {
    return root;
  }
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) {
    return root;
  }
  return left ? left : right;
}

/* https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/ */
function lowestCommonAncestorV2(root, p, q) {
  if (!p || !q) {
    return null;
  }
  while (root) {
    if (p.val > root.val && q.val > root.val) {
      root = root.right;
    } else if (p.val < root.val && q.val < root.val) {
      root = root.left;
    } else {
      return root.val;
    }
  }
  return null;
}

/* https://leetcode.com/problems/implement-trie-prefix-tree/ */
function Trie() {
  const root = createNode();

  return {
    insert,
    search,
    startsWith
  };

  function insert(word) {
    let curr = root;
    for (const ch of word) {
      if (!curr.children.has(ch)) {
        curr.children.set(ch, createNode());
      }
      curr = curr.children.get(ch);
    }
    curr.isWordComplete = true;
  }

  function search(word) {
    let curr = root;
    for (const ch of word) {
      if (!curr.children.has(ch)) {
        return false;
      }
      curr = curr.children.get(ch);
    }
    return curr.isWordComplete;
  }

  function startsWith(word) {
    let curr = root;
    for (const ch of word) {
      if (!curr.children.has(ch)) {
        return false;
      }
      curr = curr.children.get(ch);
    }
    return true;
  }

  function createNode() {
    return {
      isWordComplete: false,
      children: new Map()
    };
  }
}

/* https://leetcode.com/problems/add-and-search-word-data-structure-design/ */
function WordDictionary() {
  const root = createNode();

  return {
    addWord,
    search
  };

  function addWord(word) {
    let curr = root;
    for (const ch of word) {
      if (!curr.children.has(ch)) {
        curr.children.set(ch, createNode());
      }
      curr = curr.children.get(ch);
    }
    curr.isWordComplete = true;
  }

  function search(word) {
    return searchHelper(root, word);

    function searchHelper(n, word) {
      for (let i = 0; i < word.length; i++) {
        const ch = word[i],
          {children} = n;
        if (ch === ".") {
          if (children.size > 0) {
            for (const node of children.values()) {
              if (searchHelper(node, word.slice(i + 1))) {
                return true;
              } else {
                return false;
              }
            }
          } else {
            return false;
          }
        } else {
          if (!children.has(ch)) {
            return false;
          }
          return searchHelper(children.get(ch), word.slice(i + 1));
        }
      }
      return n.isWordComplete;
    }
  }

  function createNode() {
    return {
      isWordComplete: false,
      children: new Map()
    };
  }
}

/* https://leetcode.com/problems/word-search-ii */
function findWords(board, words) {
  const dictionary = getDictionary(words),
    foundWords = new Set();

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      findWordsHelper(board, i, j, "", foundWords, dictionary);
    }
  }

  return Array.from(foundWords);

  function findWordsHelper(board, i, j, str, foundWords, dictionary) {
    if (isInvalid(board, i, j, str, dictionary)) {
      return;
    }

    const temp = board[i][j],
      newStr = str + temp;

    board[i][j] = "@";

    if (dictionary.search(newStr)) {
      foundWords.add(newStr);
      return;
    }

    const rowD = [1, -1, 0, 0],
      colD = [0, 0, 1, -1];

    for (let i = 0; i < 4; i++) {
      findWordsHelper(rowD[i] + i, colD[i] + j, newStr, foundWords, dictionary);
    }

    board[i][j] = temp;

    function isInvalid(board, i, j, str, dictionary) {
      return (
        i < 0 ||
        i === board.length ||
        j < 0 ||
        j === board[0].length ||
        board[i][j] === "@" ||
        !dictionary.startsWith(str)
      );
    }
  }

  function getDictionary(words) {
    const dictionary = Trie();
    words.forEach(word => dictionary.insert(word));
    return dictionary;
  }
}
