/* 5 Easy Leetcode Problems completed on May 15, 2019 */

/* https://leetcode.com/problems/excel-sheet-column-number/ */
function titleToNumber(s) {
    let index = 0,
        columnNumber = 0;
    for (let i = s.length - 1; i >= 0; i--) {
        const charToNumber = s[i].charCodeAt(0) - "A".charCodeAt(0) + 1;
        columnNumber += (Math.pow(26, index++) * charToNumber);
    }
    return columnNumber;
}

/* https://leetcode.com/problems/excel-sheet-column-title/ */
function convertToTitle(number) {
    let title = "";

    while (number > 0) {
        const letter = String.fromCharCode((number - 1) % 26 + "A".charCodeAt(0));
        title = letter + title;
        number = Math.floor((number - 1) / 26);
    }

    return title;
}

/* https://leetcode.com/problems/subtree-of-another-tree/ */
function isSubtree(s, t) {
    if (!s) {
        return false;
    }

    return isSameTree(s, t) || isSubtree(s.left, t) || isSubtree(s.right, t);

    function isSameTree(a, b) {
        if (!a && !b) {
            return true;
        }
        if (!a || !b || a.val !== b.val) {
            return false;
        }
        return isSameTree(a.left, b.left) && isSameTree(a.right, b.right);
    }
}

/* https://leetcode.com/problems/hamming-distance/ */
function hammingDistance(x, y) {
    let hammingDistance = 0;
    while (x || y) {
        hammingDistance += (x & 1) ^ (y & 1);
        y = y >>> 1;
        x = x >>> 1;
    }
    return hammingDistance;
}

/* https://leetcode.com/problems/reverse-linked-list/ */
function reverseListIter(head) {
    let curr = head, temp = head;
    let prev = null;
    while (curr) {
        temp = temp.next;
        curr.next = prev;
        prev = curr;
        curr = temp;
    }
    return prev;
}

/* https://leetcode.com/problems/reverse-linked-list/ */
function reverseListRecursive(head) {
    if (!head) return null;
    let newHead = null;
    reverseListRecursiveHelper(head);
    return newHead;

    function reverseListRecursiveHelper(n) {
        if (!n.next) {
            newHead = n;
            return;
        }
        reverseListRecursiveHelper(n.next);
        const q = n.next;
        q.next = n;
        n.next = null;
    }
}
