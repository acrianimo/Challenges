/* Coding Problems grinded out on 5/19/2019 */

function getMaxProfit(stockPrices) {
    let maxProfit = 0,
        minStock = stockPrices[0];
    for (let i = 1; i < stockPrices.length; i++) {
        maxProfit = Math.max(maxProfit, stockPrices[i] - minStock);
        minStock = Math.min(minStock, stockPrices[i]);
    }
    return maxProfit;
}

function getProductOfAllIntsExceptAtIndexV1(arr) {
    const output = [];

    if (arr.length < 2) {
        return output;
    }

    for (let i = 0; i < arr.length; i++) {
        let leftProduct = 1,
            rightProduct = 1;

        for (let j = 0; j < i; j++) {
            leftProduct *= arr[j];
        }

        for (let j = i + 1; j < arr.length; j++) {
            rightProduct *= arr[j];
        }

        output.push(leftProduct * rightProduct);
    }

    return output;
}

function getProductOfAllIntsExceptAtIndexV2(arr) {
    const output = [];

    if (arr.length < 2) {
        return output;
    }

    let totalProduct = 1;

    for (let i = 0; i < arr.length; i++) {
        totalProduct *= arr[i];
    }

    for (let i = 0; i < arr.length; i++) {
        output.push(totalProduct / arr[i]);
    }

    return output;
}

function getProductOfAllIntsExceptAtIndexV3(arr) {
    const output = new Array(arr.length).fill(1);

    if (arr.length < 2) {
        return output;
    }

    let left = 1;

    for (let i = 0; i < arr.length; i++) {
        output[i] *= left;
        left *= arr[i];
    }

    let right = 1;

    for (let i = arr.length - 1; i >= 0; i--) {
        output[i] *= right;
        right *= arr[i];
    }

    return output;
}

function mergeLists(myList, otherList) {
    let i = 0, j = 0;
    const mergedLists = [];
    while (i < myList.length && j < otherList.length) {
        if (myList[i] > otherList[j]) {
            mergedLists.push(otherList[j++]);
        } else {
            mergedLists.push(myList[i++]);
        }
    }
    while (i < myList.length) {
        mergedLists.push(myList[i++]);
    }
    while (j < otherList.length) {
        mergedLists.push(otherList[j++]);
    }
    return mergedLists;
}

function isValidBST(n) {
    if (!n) {
        return true;
    }

    return isValidBSTHelper(n, -Infinity, +Infinity);

    function isValidBSTHelper(n, min, max) {
        if (!n) {
            return true;
        }
        if (n.val < min || n.val > max) {
            return false;
        }
        return isValidBSTHelper(n.left, min, n.val) && isValidBSTHelper(n.right, n.val, max);
    }
}

function isPalindromePermutation(str) {
    const letterCounts = new Array(26).fill(0);

    for (const letter of str) {
        const index = letter.charCodeAt(0) - "a".charCodeAt(0);
        letterCounts[index]++;
    }

    let oddCounts = 0;

    for (let i = 0; i < letterCounts.length; i++) {
        if (letterCounts[i] % 2 === 1) {
            oddCounts++;
        }
    }

    return oddCounts <= 1;
}

function myStack() {
    let q1 = [], q2 = [];

    function isEmpty() {
        return q1.length + q2.length === 0;
    }

    function rebalanceElements() {
        while (q2.length > 1) {
            q1.push(q2.shift());
        }
        let temp = q1;
        q1 = q2;
        q2 = temp;
    }

    return {
        push: function (x) {
            q2.push(x)
        },
        pop: function () {
            if (isEmpty()) {
                return null;
            } else if (q1.length === 0) {
                rebalanceElements();
            }
            return q1.shift();
        },
        top: function () {
            if (isEmpty()) {
                return null;
            } else if (q1.length === 0) {
                rebalanceElements();
            }
            return q1[0];
        },
        isEmpty
    }
}

function myQueue() {
    const inStack = [],
        outStack = [];

    function moveElementsToOutStack() {
        while (inStack.length > 0) {
            outStack.push(inStack.pop());
        }
    }

    function isEmpty() {
        return inStack.length + outStack.length === 0;
    }

    return {
        enqueue: function (x) {
            inStack.push(x);
        },
        dequeue: function () {
            if (isEmpty()) {
                return null;
            }
            if (outStack.length === 0) {
                moveElementsToOutStack();
            }
            return outStack.pop();
        },
        peek: function () {
            if (isEmpty()) {
                return null;
            }
            if (outStack.length === 0) {
                moveElementsToOutStack();
            }
            return outStack[outStack.length - 1];
        },
        isEmpty
    }
}

function mergeTwoLists(l1, l2) {
    if (!l1 && !l2) {
        return null;
    }

    const head = { next: null }
    let curr = head;

    while (l1 && l2) {
        if (l1.val <= l2.val) {
            curr.next = l1;
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }

    if (l1) {
        curr.next = l1;
    } else if (l2) {
        curr.next = l2;
    }

    return head.next;
}

function maxSubArray(nums) {
    let currMax = nums[0],
        totalMax = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currMax = Math.max(nums[i], currMax + nums[i]);
        totalMax = Math.max(currMax, totalMax);
    }
    return totalMax;
}


function isValid(s) {
    const stack = [];

    for (const ch of s) {
        if (ch === "(" || ch === "{" || ch === "[") {
            stack.push(ch);
        } else if (matches(ch, stack[stack.length - 1])) {
            stack.pop();
        } else {
            return false;
        }
    }

    function matches(ch, top) {
        const matchMap = {
            ")": "(",
            "]": "[",
            "}": "{"
        }
        return matchMap[ch] === top;
    }

    return stack.length === 0;
}

function reverse(x) {
    const isNegative = x < 0;
    x = Math.abs(x);
    let reversedInt = 0;
    while (x > 0) {
        const digit = x % 10;
        reversedInt = reversedInt * 10 + digit;
        x = Math.floor(x / 10);
    }
    return isNegative ? -1 * reversedInt : reversedInt;
}

function numJewelsInStones(J, S) {
    const jewels = new Set(J.split(""));
    let jewelCount = 0;
    for (const stone of S) {
        if (jewels.has(stone)) {
            jewelCount++;
        }
    }
    return jewelCount;
}


function romanToInt(s) {
    const romanSymbolMappings = getRomanSymbolMappings();

    let value = romanSymbolMappings[s[s.length - 1]];

    for (let i = s.length - 2; i >= 0; i--) {
        const prevVal = romanSymbolMappings[s[i + 1]];
        const currVal = romanSymbolMappings[s[i]];
        if (currVal < prevVal) {
            value -= currVal;
        } else {
            value += currVal;
        }
    }

    return value;

    function getRomanSymbolMappings() {
        const romanSymbolMappings = {
            "I": 1,
            "V": 5,
            "X": 10,
            "L": 50,
            "C": 100,
            "D": 500,
            "M": 1000
        };
        return romanSymbolMappings;
    }
}

function addTwoNumbers(l1, l2) {
    const head = createNode(0);
    let curr = head, carry = 0;

    while (l1 || l2) {
        let sum = carry;
        if (l1) {
            sum += l1.val;
            l1 = l1.next;
        }
        if (l2) {
            sum += l2.val;
            l2 = l2.next;
        }
        const newNode = createNode(sum % 10);
        carry = Math.floor(sum / 10);
        curr.next = newNode;
        curr = curr.next;
    }

    if (carry > 0) {
        curr.next = createNode(carry);
    }

    return head.next;

    function createNode(val) {
        return {
            val,
            next: null
        };
    }
}

function longestPalindrome(s) {
    let longestPalindrome = "";

    for (let i = 0; i < s.length; i++) {
        const p1 = expandAroundCenter(s, i, i);
        if (p1.length > longestPalindrome.length) {
            longestPalindrome = p1;
        }
        const p2 = expandAroundCenter(s, i, i + 1);
        if (p2.length > longestPalindrome.length) {
            longestPalindrome = p2;
        }
    }

    return null || longestPalindrome;

    function expandAroundCenter(s, lo, hi) {
        while (lo >= 0 && hi < s.length && s[lo] === s[hi]) {
            lo--;
            hi++;
        }

        return s.slice(lo + 1, hi);
    }
}

function findKthLargest(nums, k) {
    if (nums.length - k < 0) {
        return null;
    }

    return findKthLargestHelper(nums, 0, nums.length - 1, nums.length - k);

    function findKthLargestHelper(nums, left, right, targetIndex) {
        const pivotIndex = getPivotIndex(nums, left, right);

        if (pivotIndex === targetIndex) {
            return nums[pivotIndex];
        } else if (pivotIndex > targetIndex) {
            return findKthLargestHelper(nums, left, pivotIndex - 1, targetIndex);
        }

        return findKthLargestHelper(nums, pivotIndex + 1, right, targetIndex);
    }

    function getPivotIndex(arr, left, right) {
        let wall = left;
        const pivot = arr[right];

        for (let i = left; i < right; i++) {
            if (arr[i] < pivot) {
                swap(arr, i, wall);
                wall++;
            }
        }

        swap(arr, pivot, wall);

        return wall;

        function swap(arr, x, y) {
            const temp = arr[x];
            arr[x] = arr[y];
            arr[y] = temp;
        }
    }
}
