/* 3 Easy Leetcode Problems completed on April 14, 2019 */

/* https://leetcode.com/problems/buddy-strings/ */
function buddyStrings(A, B) {
  if (A === B || A.length !== B.length || A.length < 2) {
    return false;
  }
  const aLetterCounts = getLetterCounts(A),
    bLetterCounts = getLetterCounts(B);
  for (let i = 0; i < 26; i++) {
    if (aLetterCounts[i] !== bLetterCounts[i]) {
      return false;
    }
  }
  let diff = 0;
  for (let i = 0; i < A.length; i++) {
    if (A[i] !== B[i]) {
      diff++;
    }
  }
  return diff === 2;
  function getLetterCounts(str) {
    const letterCounts = new Array(26).fill(0);
    for (const letter of str) {
      const index = letter.charCodeAt(0) - "a".charCodeAt(0);
      letterCounts[index]++;
    }
    return letterCounts;
  }
}

/* https://leetcode.com/problems/design-linked-list/ */
function MyLinkedList() {
  let head, tail;
  head = tail = null;
  let count = 0;
  return {
    addAtHead,
    addAtTail,
    addAtIndex,
    deleteAtIndex,
    get
  };
  function isEmpty() {
    return count === 0;
  }
  function createNode(data) {
    return {
      val: data,
      prev: null,
      right: null
    };
  }
  function getNodeAtIndex(index) {
    let currIndex = 0;
    let currNode = head;
    while (currIndex < index && currNode) {
      currNode = currNode.next;
      currIndex++;
    }
    if (currIndex === index) {
      return currNode;
    }
    return null;
  }
  function addAtHead(data) {
    const newNode = createNode(data);
    if (isEmpty()) {
      head = tail = newNode;
    } else {
      const temp = head;
      head = newNode;
      head.next = temp;
      temp.prev = head;
    }
    count++;
  }
  function addAtTail(data) {
    const newNode = createNode(data);
    tail.next = newNode;
    newNode.prev = tail;
    tail = newNode;
    count++;
  }
  function addAtIndex(index, data) {
    if (index > count) {
      return;
    }
    if (index === 0) {
      addAtHead(data);
    } else if (index === count) {
      addAtTail(data);
    } else if (index < count) {
      const nodeAtIndex = getNodeAtIndex(index),
        newNode = createNode(data);
      newNode.next = nodeAtIndex.next;
      nodeAtIndex.next.prev = newNode;
      newNode.prev = nodeAtIndex;
      nodeAtIndex.next = newNode;
    }
    count++;
  }
  function deleteAtIndex(index) {
    if (isEmpty() || index >= count) {
      return;
    }
    if (index === 0) {
      if (head === tail) {
        head = tail = null;
      } else {
        head = head.next;
        head.prev = null;
      }
    } else if (index === count - 1) {
      tail = tail.prev;
      tail.next = null;
    } else if (index < count - 1) {
      const nodeAtIndex = getNodeAtIndex(index);
      nodeAtIndex.next.prev = nodeAtIndex.prev;
      nodeAtIndex.prev.next = nodeAtIndex.next;
    }
    count--;
  }
  function get(index) {
    let currIndex = 0;
    let currNode = head;
    while (currIndex < index && currNode) {
      currNode = currNode.next;
      currIndex++;
    }
    if (currIndex === index) {
      return currNode.val;
    }
    return -1;
  }
}

/* https://leetcode.com/problems/sort-array-by-parity/ */
function sortArrayByParity(A) {
  let k = 0;
  for (let i = 0; i < A.length; i++) {
    if (A[i] % 2 === 0) {
      swap(A, i, k);
      k++;
    }
  }
  return A;
  function swap(A, i, k) {
    const temp = A[i];
    A[i] = A[k];
    A[k] = temp;
  }
}
