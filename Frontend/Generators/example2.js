/* Code example demonstrating the conversion of a generator to a state machine */

function* fibonacci() {
    let a = 1, b = 1;
    yield a;
    yield b;
    while(true) {
        const c = a + b;
        yield c;
        a = b;
        b = c;
    }
}

function fibonacciStateMachine() {
    let state = 0;
    let a = 1, b = 1;
    return {
        next: function() {
            state++;
            let currVal;
            switch(state) {
                case 1: 
                    currVal = 1;
                    break;
                case 2: 
                    currVal = 1;
                    break;
                default: 
                    const c = a + b;
                    currVal = c;
                    a = b;
                    b = c;
                    break;
            }
            return {
                done: false,
                value: currVal
            }
        }
    }
}
