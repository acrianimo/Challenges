/* Code example demonstrating how async/await is implemented using generators */

(async function(){
    const result = await makeSomeRequestsV1();
    console.log(result);
})();

(function(){
    spawn(makeSomeRequestsV2).then(console.log);
})();

async function makeSomeRequestsV1() {
    const res1 = await Promise.resolve(5);
    const res2 = await Promise.resolve(5);
    return `V1: ${res1 * res2}`;
}

function* makeSomeRequestsV2() {
    const res1 = yield Promise.resolve(5);
    const res2 = yield Promise.resolve(5);
    return `V2: ${res1 * res2}`;
}

function spawn(generator) {
    const iterator = generator();
    return new Promise((resolve, reject) => {
        onRequest();
        function onRequest(lastPromiseResult) {
            const {value, done} = iterator.next(lastPromiseResult);
            if (!done) {
                value.then(onRequest).catch(reject);
            } else {
                resolve(value);
            }
        }
    });
}