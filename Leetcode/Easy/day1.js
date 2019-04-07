/* 3 Easy Leetcode Problems completed on April 6, 2019 */

/* https://leetcode.com/problems/find-common-characters/ */
function commonChars(A) {
    const allCommonLetterOccurences = getLetterOccurences(A[0]);
    for(let i = 1; i < A.length; i++) {
        const letterOccurences = getLetterOccurences(A[i]);
        for(let j = 0; j < 26; j++) {
            allCommonLetterOccurences[j] = Math.min(allCommonLetterOccurences[j], letterOccurences[j]);
        }
    }
    const commonChars = [];
    for(let i = 0; i < 26; i++) {
        const letter = String.fromCharCode(i + "a".charCodeAt(0));
        for(let j = 0; j < allCommonLetterOccurences[i]; j++) {
            commonChars.push(letter);
        }
    }
    return commonChars;
    function getLetterOccurences(A) {
        const letterOccurences = new Array(26).fill(0);
        for(const letter of A) {
            const letterIndex = letter.charCodeAt(0) - "a".charCodeAt(0);
            letterOccurences[letterIndex]++; 
        }
        return letterOccurences;
    }
}

/* https://leetcode.com/problems/longest-palindrome/ */
function longestPalindrome(s) {
    const letterOccurences = getLetterOccurences(s);
    let longestLen = 0,
        maxOddOccurences = 0;
    for(let i = 0; i < 26; i++) {
        const occurences = letterOccurences[i];
        if (occurences % 2 === 1) {
            maxOddOccurences = Math.max(maxOddOccurences, occurences);
        } else {
            longestLen += occurences;
        }
    }
    return maxOddOccurences + longestLen;
    function getLetterOccurences(A) {
        const letterOccurences = new Array(26).fill(0);
        for(const letter of A) {
            const letterIndex = letter.charCodeAt(0) - "a".charCodeAt(0);
            letterOccurences[letterIndex]++; 
        }
        return letterOccurences;
    }
}

/* https://leetcode.com/problems/longest-word-in-dictionary/ */
function longestWord(words) {
    words = new Set(words);
    const wordsWithOneLess = new Set(),
        wordsWithOneMore = new Set();
    let longestWord = "";
    for(const word of words) {
        if (word.length > 1) {
            const wordMinusALetter = word.slice(0, word.length - 1);
            if (words.has(wordMinusALetter)) {
                wordsWithOneLess.add(word);
            }
            wordsWithOneMore.add(wordMinusALetter);
        }
    }
    for(const word of words) {
        if (!wordsWithOneMore.has(word)) {
            let currWord = word.slice(0, word.length - 1);
            while(currWord.length > 1 && wordsWithOneLess.has(currWord)) {
                currWord = currWord.slice(0, currWord.length - 1);
            }
            if (currWord.length === 1) {
                if (word.length > longestWord.length) {
                    longestWord = word;
                } else if (word.length === longestWord.length) {
                    longestWord = longestWord > word ? word : longestWord;
                }
            }
        }
    }
    return longestWord;
} 
