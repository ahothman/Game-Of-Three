function getStartNumber(){
    var start = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER ) + 2
    return start
}

function getNextNumber(number) {
    var modThreeArr = [number-1,number,number+1].filter(num=>num%3 == 0)
    var max =  Math.max.apply(null,modThreeArr)
    return max/3
}

module.exports = {
    getStartNumber,
    getNextNumber
}