/* Example of code demonstrating generators and async generators */

const INTUIT = "INTUIT";
const GOOGLE = "GOOGLE";
const FACEBOOK = "FACEBOOK";
const INTU = "INTU";
const GOOGL = "GOOGL";
const FB = "FB";

(async function(){
    for await (const {price, company} of getAllStockPrices()) {
        console.log(`${company}: ${price}`);
    }
})();

async function* getAllStockPrices() {
    const companies = [INTUIT, GOOGLE, FACEBOOK];
    for(let i = 0; i < companies.length; i++) {
        const company = companies[i];
        yield spawn(getStockPrice(company));
    }
}

function spawn(generator) {
    return new Promise((resolve, reject) => {
        const onResult = lastPromiseResult => {
            const {value, done} = generator.next(lastPromiseResult);
            if (!done) {
                value.then(onResult, reject);
            } else {
                resolve(value);
            }
        }
        onResult();
    });
}

function* getStockPrice(company) {
    const symbol = yield getStockSymbol(company),
        price = yield getSymbolPrice(symbol);
    return {company, price};
}


function getStockSymbol(name) {
    const nameToSymbolMappings = {
        [INTUIT]: INTU,
        [GOOGLE]: GOOGL,
        [FACEBOOK]: FB
    };

    return resolveValueAfterNSeconds(nameToSymbolMappings[name.toUpperCase()], .8);
}

function getSymbolPrice(symbol) {
    const symbolToPriceMappings = {
        [INTU]: 247.34,
        [GOOGL]: 1186.5,
        [FB]: 192.48
    };

    return resolveValueAfterNSeconds(symbolToPriceMappings[symbol.toUpperCase()], .5);
}

function resolveValueAfterNSeconds(value, seconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value);
        }, seconds*1000);
    });
}
