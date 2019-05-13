/* 3 Easy Daily Coding problems completed on May 12, 2019 */

function deepestLevelNode(node) {
    if (!node) {
        return null;
    }
    
    let maxLvl = -1*Infinity,
        maxLvlNode = null;

    helper(node, 0);
    
    return maxLvlNode;
    
    function helper(node, currLvl) {
        if (currLvl > maxLvl) {
            maxLvl = currLvl;
            maxLvlNode = node;
        }
        if (node.left) {
            helper(node.left, currLvl + 1);
        }
        if (node.right) {
            helper(node.right, currLvl + 1);
        }
    }
}

function mergeIntervals(intervals) {
    if (!intervals) {
        return null;
    }

    intervals.sort((a, b) => a[0] - b[0]);
    let currInterval = intervals[0];
    const mergedIntervals = [];

    for(let i = 1; i < intervals.length; i++) {
        if (currInterval[1] >= intervals[i][0]) {
            currInterval[1] = Math.max(currInterval[1], intervals[i][1]);
        } else {
            mergedIntervals.push(currInterval);
            currInterval = intervals[i];
        }
    }

    mergedIntervals.push(currInterval);

    return mergedIntervals;
}

function nthPerfectNumber(n) {
    let perfectNumberIndex = 0
        currNum = 0,
        currPerfectNumber = null;

    while(perfectNumberIndex < n) {
        if (sumDigits(currNum) === 10) {
            currPerfectNumber = currNum;
            perfectNumberIndex++;
        }
        currNum++;
    }

    return currPerfectNumber;

    function sumDigits(n) {
        if (n === 0) {
            return 0;
        }
        return n % 10 + sumDigits(Math.floor(n / 10));
    }
}