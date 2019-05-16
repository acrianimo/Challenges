/* 3 Easy coding problems completed sometime in May */

/* https://www.geeksforgeeks.org/evaluation-of-expression-tree/ */
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

/* https://leetcode.com/problems/longest-palindrome/ */
function largestPalindrome(s) {
    const letterOccurences = getLetterOccurences(s);
    let largestPalindrome = 0,
        largestOddOccurence = 0;
    for(const letter in letterOccurences) {
        const letterOccurence = letterOccurences[letter];
        if (letterOccurence % 2 === 0) {
            largestPalindrome += letterOccurence;
        } else if (letterOccurence > largestOddOccurence){
            largestOddOccurence = letterOccurence;
        }
    }
    return largestPalindrome + largestOddOccurence;
    function getLetterOccurences(s) {
        const letterOccurences = {};
        for(const letter of s) {
            if (letter in letterOccurences) {
                letterOccurences[letter]++;
            } else {
                letterOccurences[letter] = 1;
            }
        }
        return letterOccurences;
    }
}

/* https://leetcode.com/problems/keyboard-row/ */
function findWords(words) {
    const rows = [
        new Set("qwertyuiop".split("")), 
        new Set("asdfghjkl".split("")), 
        new Set("zxcvbnm".split(""))
    ];
    for(const word of words) {
        for(const row of rows) {
            let index = 0;
            for(const letter of word) {
                if (row.has(letter.toLowerCase())) {
                    index++;
                } else {
                    break;
                }
            }
            if (index === word.length) {
                output.push(word);
            } else if (index > 0) {
                break;
            }
        }
    }

    return output;
}