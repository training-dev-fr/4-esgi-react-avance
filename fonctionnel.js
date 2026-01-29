Array.prototype.forEach2 = function(predicate){
    for(let element of this){
        predicate(element);
    }
}

Array.prototype.map2 = function(predicate){
    let result = [];
    for(let element of this){
        result.push(predicate(element));
    }
    return result;
}

let arr = [1,2,3];

let arr2 = arr.map2(number => number * 2)
console.log(arr2)