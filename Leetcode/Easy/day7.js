/* 4 Easy Daily Coding problems completed on May 13, 2019 */

/* https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/ */
function getNthFib(n) {
    if (n === 1) {
        return 0;
    }
    
    let a = 0,
        b = 1;
    
    for(let i = 2; i <= n; i++) {
        const c = a + b;
        a = b;
        b = c;
    }

    return a;
}

/* https://leetcode.com/problems/maximum-product-of-three-numbers/ */
function largestProduct(list) {
    const len = list.length;
    
    if (len < 3) {
        return null;
    }

    list.sort((a, b) => a - b);

    const case1 = list[0] * list[1] * list[len - 1],
        case2 = list[len - 1] * list[len - 2] * list[len - 3];

    return Math.max(case1, case2);
}

/* https://www.algoexpert.io/questions/River%20Sizes */
function riverSizes(matrix) {
    const riverSizes = [];
    
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 1) {
                const riverSize = riverSizesHelper(matrix, i, j);
                riverSizes.push(riverSize);
            }
        }
    }
    
    return riverSizes;

    function riverSizesHelper(matrix, i, j) {
        if (isInvalidMove(matrix, i, j)) {
            return 0;
        }
        
        matrix[i][j] = 0;
        
        return 1 + riverSizesHelper(matrix, i + 1, j) + 
            riverSizesHelper(matrix, i - 1, j) + 
            riverSizesHelper(matrix, i, j + 1) + 
            riverSizesHelper(matrix, i, j - 1);

        function isInvalidMove(matrix, i, j) {
            return i < 0 || j < 0 || i === matrix.length || j === matrix[i].length || matrix[i][j] === 0;
        }
    }
}

/* https://leetcode.com/problems/encode-and-decode-tinyurl/ */
function urlShortener() {
    const urlToShort = {},
        shortToUrl = {};

    const possibleChars = (function getPossibleChars() {
        const chars = [],
            getLetter = (i, startLetter) => String.fromCharCode(i + startLetter.charCodeAt(0));
        for(let i = 0; i < 26; i++) {
            chars.push(getLetter(i, "a"));
            chars.push(getLetter(i, "A"));
            if (i < 10) {
                chars.push(i.toString());
            }
        }
        return chars;
    })();

    return {
        shorten,
        restore
    };

    function shorten(url) {
        const sixRandomChars = getSixRandomChars(possibleChars);
        urlToShort[url] = sixRandomChars;
        shortToUrl[sixRandomChars] = url;
        return sixRandomChars;
    }

    function restore(short) {
        const url = shortToUrl[short];
        if (!url) {
            return null;
        }
        return url;
    }

    function getSixRandomChars(arr) {
        const arrCopy = arr.slice();
        shuffle(arrCopy);
        return arrCopy.slice(0, 6).join("");

        function shuffle(arr) {
            for(let i = 0; i < arr.length; i++) {
                const randomIndex = Math.floor(Math.random() * arr.length),
                    temp = arr[i];
                arr[i] = arr[randomIndex];
                arr[randomIndex] = temp;
            }
        }
    }
}