/* https://leetcode.com/problems/valid-mountain-array/ */

function validMountainArray(A) {
  const len = A.length;
  if (len < 3) return false;
  let left = null;
  for (let i = 0; i < A.length - 1; i++) {
    if (A[i + 1] < A[i]) {
      left = i;
      break;
    }
  }
  if (!left) return false;
  let right = null;
  for (let i = len - 1; i > 0; i--) {
    if (A[i - 1] < A[i]) {
      right = i;
      break;
    }
  }
  return right && left === right;
}

/* https://leetcode.com/problems/smallest-range-i/ */

function smallestRange(A, K) {
  const sum = A.reduce((sum, num) => sum + num, 0),
    average = Math.floor(sum / A.length),
    B = [];
  for (const num of A) {
    const avgDiff = Math.abs(average - num);
    if (avgDiff >= 0 && avgDiff <= K) {
      B.push(average);
    } else if (num < average) {
      B.push(num + K);
    } else {
      B.push(num - K);
    }
  }
  let minOfB = Infinity,
    maxOfB = -1 * Infinity;
  for (const num of B) {
    minOfB = Math.min(minOfB, num);
    maxOfB = Math.max(maxOfB, num);
  }
  return maxOfB - minOfB;
}

console.log(reverseOnlyLetters("Test1ng-Leet=code-Q!"));

function reverseOnlyLetters(S) {
  if (!S) return null;
  const letters = S.split("");
  let lo = 0,
    hi = letters.length - 1;
  while (lo < hi) {
    if (!isLetter(letters[lo])) {
      lo++;
      continue;
    }
    if (!isLetter(letters[hi])) {
      hi--;
      continue;
    }
    const temp = letters[lo];
    letters[lo] = letters[hi];
    letters[hi] = temp;
    lo++;
    hi--;
  }
  return letters.join("");
  function isLetter(letter) {
    const lowerCaseLetter = letter.toLowerCase(),
      letterIndex = lowerCaseLetter.charCodeAt(0) - "a".charCodeAt(0);
    return letterIndex >= 0 && letterIndex <= 25;
  }
}
