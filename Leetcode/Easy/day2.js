/* 3 Easy Leetcode Problems completed on April 7, 2019 */

/* https://leetcode.com/problems/partition-array-into-three-parts-with-equal-sum/ */
function canThreePartsEqualSum(A) {
  const sum = A.reduce((sum, num) => sum + num, 0);
  if (sum % 3 === 1) return false;
  const partSum = sum / 3;
  let parts = 0,
    currSum = 0,
    i = 0;
  while (i < A.length) {
    currSum += A[i];
    if (currSum === partSum) {
      parts++;
      currSum = 0;
    }
    i++;
  }
  return parts === 3;
}

/* https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers/ */
function sumRootToLeaf(root) {
  const binaryNumbers = getBinaryNumbers(root),
    sum = binaryNumbers.reduce((sum, binaryNumber) => {
      const decimalNumber = convertBinaryToDecimal(binaryNumber);
      return sum + decimalNumber;
    }, 0);
  return sum;
  function getBinaryNumbers(root) {
    const binaryNumbers = [];
    getBinaryNumbersHelper(root, "", binaryNumbers);
    return binaryNumbers;
    function getBinaryNumbersHelper(n, binaryNumber, binaryNumbers) {
      binaryNumber += n.val;
      if (!n.left && !n.right) {
        binaryNumbers.push(binaryNumber);
        return;
      }
      if (n.left) {
        getBinaryNumbersHelper(n.left, binaryNumber, getBinaryNumbers);
      }
      if (n.right) {
        getBinaryNumbersHelper(n.right, binaryNumber, getBinaryNumbers);
      }
    }
  }
  function convertBinaryToDecimal(binary) {
    let decimalNumber = 0,
      index = 0;
    for (let i = binary.length - 1; i >= 0; i--) {
      decimalNumber += parseInt(binaryNumber[i]) * Math.exp(2, index++);
    }
    return decimalNumber;
  }
}

/* https://leetcode.com/problems/remove-outermost-parentheses/ */
function removeOuterParentheses(S) {
  const stack = [];
  let str = "";
  for (let i = 0; i < S.length; i++) {
    if (S[i] === "(") {
      stack.push("(");
      if (stack.length > 1) {
        str += "(";
      }
    } else {
      if (stack.length > 1) {
        str += ")";
      }
      stack.pop();
    }
  }
  return str;
}
