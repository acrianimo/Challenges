/* 3 Easy Leetcode problems completed on April 9, 2019 */

/* https://leetcode.com/problems/find-the-town-judge/ */

function findJudge(N, trust) {
  const {indegrees, outdegrees} = getIndegreesAndOutdegrees(trust);
  for (let i = 1; i <= N; i++) {
    if (indegrees[i] === N - 1 && outdegrees[i] === 0) {
      return i;
    }
  }
  return -1;
  function getIndegreesAndOutdegrees(edges) {
    const indegrees = {},
      outdegrees = {};
    for (const edge of edges) {
      const [src, dest] = edge;
      if (!(src in indegrees)) {
        indegrees[src] = 0;
        outdegrees[src] = 0;
      }
      if (!(dest in indegrees)) {
        indegrees[dest] = 0;
        outdegrees[dest] = 0;
      }
      indegrees[dest]++;
      outdegrees[src]++;
    }
    return {indegrees, outdegrees};
  }
}

/* https://leetcode.com/problems/fair-candy-swap/ */

function fairCandySwap(A, B) {
  const sumOfA = A.reduce((totalSize, size) => totalSize + size, 0),
    sumOfB = B.reduce((totalSize, size) => totalSize + size, 0);
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B.length; j++) {
      const newSumOfA = sumOfA - A[i] + B[j],
        newSumOfB = sumOfB - B[j] + A[i];
      if (newSumOfA === newSumOfB) {
        return [A[i], B[j]];
      }
    }
  }
  return null;
}

/* https://leetcode.com/problems/unique-email-addresses/ */

function numUniqueEmails(emails) {
  const uniqueEmails = new Set();
  emails.forEach(email => uniqueEmails.add(parseEmail(email)));
  return uniqueEmails.size;
  function parseEmail(email) {
    let parsedEmail = "",
      hasPlus = false;
    for (let i = 0; i < email.length; i++) {
      const char = email[i];
      if (char === "@") {
        return parsedEmail + email.slice(i);
      }
      if (char === "+") {
        hasPlus = true;
      }
      if (hasPlus || char === ".") {
        continue;
      }
      parsedEmail += char;
    }
    return parsedEmail;
  }
}
