import BigNumber from "bignumber.js";

export function roundNumber(num, roundNum = 4) {
    BigNumber.set({ DECIMAL_PLACES: roundNum, ROUNDING_MODE: 1 })
    let decVal = new BigNumber(num)
    return decVal.toFixed(roundNum)
}

export function roundNumberOne(num, roundNum = 4) {
    let decVal = new BigNumber(num)
    return decVal.toFixed(roundNum)
}

export function mergeAmount(num, symbol) {
    // let finalNum = roundNumber(num)
    // return finalNum + ' ' + symbol
    return num + ' ' + symbol
}

export function isGreaterThanOrEqualTo(one, two) {
    let numOne = BigNumber(one)
    console.log({ one, numOne, two });
    return numOne.isGreaterThanOrEqualTo(BigNumber(two))
}

export function numToString(num) {
    let numOne = BigNumber(num)
    return numOne.toString()
}

export function percentageOf(ofPercent, inNum, roundNum = 4) {
    let numOne = BigNumber(inNum)
    // return numOne.multipliedBy(ofPercent).dividedBy(100).toFixed(roundNum)
    // return numOne.multipliedBy(ofPercent).dividedBy(100)
    return (numOne.multipliedBy(BigNumber(ofPercent))) / 100
}

export function multipliedBy(one, two, roundNum = 4) {
    let numOne = BigNumber(one)
    // return numOne.multipliedBy(two).toFixed(roundNum)
    return numOne.multipliedBy(two)
}

export function plusNum(one, two, roundNum = 4) {
    let numOne = BigNumber(one)
    // return numOne.plus(two).toFixed(roundNum)
    return numOne.plus(two)
}

export function minusNum(one, two) {
    let numOne = BigNumber(one)
    return numOne.minus(two)
}

export function isEqualTo(one, two) {
    return BigNumber(one).isEqualTo(BigNumber(two))
}

export function isLessThanOrEqualTo(one, two) {
    return BigNumber(one).isLessThanOrEqualTo(BigNumber(two))
}

// CHECK FOR NON NEGATIVE AND GREATER THAN ZERO
export function validNum(num) {
    let numOne = BigNumber(num)
    return numOne.isInteger(num) && numOne.isGreaterThan(0)
}

export function validFloat(num) {
    let numOne = BigNumber(num)
    return numOne.isPositive() && numOne.isGreaterThan(0)
}

export function toNum(num) {
    return BigNumber(num).toNumber()
}

export function mulBy(one, two) {
    return BigNumber(one).multipliedBy(two)
}

export function divBy(one, two) {
    return BigNumber(one).dividedBy(two)
}


export const ChainIDS = {
    Mainnet: 1,
    Ropsten: 3,
    Goerli: 5,
    Polygon: 137
}

export function stringify(obj) {
    let cache = [];
    let str = JSON.stringify(obj, function (key, value) {
        if (typeof value === "object" && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    });
    cache = null; // reset the cache
    return str;
}
