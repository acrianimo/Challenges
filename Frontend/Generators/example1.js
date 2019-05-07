/* Code example demonstrating generators */

const INTUIT = "INTUIT";
const GOOGLE = "GOOGLE";
const FACEBOOK = "FACEBOOK";
const INTU = "INTU";
const GOOGL = "GOOGL";
const FB = "FB";

(async function(){
    for await (const {companyName, stockPrice} of getAllStockPrices()) {
        console.log(`${companyName}: ${stockPrice}`);
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
        onResult();
        function onResult(lastResult) {
            const {value, done} = generator.next(lastResult);
            if (!done) {
                if (value instanceof Promise) {
                    value.then(onResult).catch(reject);
                } else {
                    onResult(value);
                }
            } else {
                resolve(value);
            }
        }
    });
}

function* getStockPrice(companyName) {
    const companySymbol = yield getStockSymbol(companyName),
        stockPrice = yield getSymbolPrice(companySymbol);
    return {companyName, stockPrice};
}

function getStockSymbol(companyName) {
    const companyNameToSymbolMappings = {
        [INTUIT]: INTU,
        [GOOGLE]: GOOGL,
        [FACEBOOK]: FB
    };

    return resolveValueAfterNSeconds(companyNameToSymbolMappings[companyName.toUpperCase()], .8);
}

function getSymbolPrice(companySymbol) {
    const companySymbolToPriceMappings = {
        [INTU]: 247.34,
        [GOOGL]: 1186.5,
        [FB]: 192.48
    };

    return resolveValueAfterNSeconds(companySymbolToPriceMappings[companySymbol.toUpperCase()], .5);
}

function resolveValueAfterNSeconds(value, seconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value);
        }, seconds*1000);
    });
}