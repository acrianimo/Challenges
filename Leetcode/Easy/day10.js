/* 6 Leetcode Easy problems completed on May 25, 2019 */

/* https://leetcode.com/problems/increasing-order-search-tree/ */
function increasingBST(root) {
  const nodesInOrder = getNodesInOrder(root);
  for (let i = 0; i < nodesInOrder.length; i++) {
    const node = nodesInOrder[i];
    node.left = null;
    if (i === nodesInOrder.length - 1) {
      node.right = null;
    } else {
      node.right = nodesInOrder[i + 1];
    }
  }
  return nodesInOrder[0];

  function getNodesInOrder(n) {
    const nodesInOrder = [];
    getNodesInOrderHelper(n);
    return nodesInOrder;

    function getNodesInOrderHelper(n) {
      if (!n) {
        return;
      }
      getNodesInOrderHelper(n.left);
      nodesInOrder.push(n);
      getNodesInOrderHelper(n.right);
    }
  }
}

/* https://leetcode.com/problems/monotonic-array/ */
function isMonotonic(A) {
  let isPositive = null;

  for (let i = 0; i < A.length - 1; i++) {
    const diff = A[i] - A[i + 1];
    if (diff === 0) {
      continue;
    }
    if (isPositive === null) {
      if (diff < 0) {
        isPositive = false;
      } else {
        isPositive = true;
      }
    } else if ((isPositive && diff < 0) || (!isPositive && diff > 0)) {
      return false;
    }
  }

  return true;
}

/* https://leetcode.com/problems/convert-a-number-to-hexadecimal/ */

function toHex(num) {
  const hexMap = [...new Array(16)].map((_, index) => {
    if (index < 10) {
      return index.toString();
    }
    return String.fromCharCode("a".charCodeAt(0) + index - 10);
  });

  let hex = "";

  while (num !== 0) {
    const hexChar = hexMap[num & 15];
    hex = hexChar + hex;
    num = num >>> 4;
  }

  return hex;
}

function toBinary(num) {
  const bitMap = ["0", "1"];

  let binary = "";

  while (num !== 0) {
    const bit = bitMap[num & 1];
    binary = bit + binary;
    num = num >>> 1;
  }

  return binary;
}

/* https://leetcode.com/problems/goat-latin/ */
function toGoatLatin(str) {
  return str
    .split(" ")
    .map((word, index) => {
      let end = "a".repeat(index + 1);
      if ("aeiou".split("").includes(word[0].toLowerCase())) {
        end = "ma" + end;
      } else {
        end = word[0] + "ma" + end;
        word = word.slice(1);
      }
      return word + end;
    })
    .join(" ");
}

/* https://leetcode.com/problems/verifying-an-alien-dictionary/ */
function isAlienSorted(words, order) {
  const orderMap = getOrderMap(order);

  for (let i = 0; i < words.length - 1; i++) {
    for (let j = i + 1; j < words.length; j++) {
      if (!comesBefore(words[i], words[j], orderMap)) {
        return false;
      }
    }
  }

  return true;

  function comesBefore(a, b, orderMap) {
    let i = 0;
    while (i < a.length && i < b.length) {
      if (a[i] === b[i]) {
        i++;
        continue;
      }
      if (orderMap[a[i]].has(b[i])) {
        return true;
      }
      return false;
    }
    if (i !== a.length && i === b.length) {
      return false;
    }
    return true;
  }

  function getOrderMap(order) {
    const orderMap = {};

    for (let i = 0; i < order.length; i++) {
      orderMap[order[i]] = new Set();
      for (let j = i + 1; j < order.length; j++) {
        orderMap[order[i]].add(order[j]);
      }
    }

    return orderMap;
  }
}
