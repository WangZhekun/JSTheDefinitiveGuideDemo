/**
 * 将函数用作值
 */

function add(x, y) {
    return x + y;
}
function subtract(x, y) {
    return x - y;
}
function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    return x / y;
}

/**
 * 按照指定计算函数计算指定操作数
 * 将上述四个函数作为第一个参数，将两个操作数作为第二个和第三个参数传入
 * @param operator
 * @param operand1
 * @param operand2
 * @returns {*}
 */
function operate(operator, operand1, operand2) {
    return operator(operand1, operand2);
}

// 计算(3+4)+4/5
var i = operate(add, operate(add, 3, 4), operate(multiply, 4, 5));
console.log('(3+4)+4/5=' + i);

var operators = {
    add: function (x, y) {
        return x + y;
    },
    subtract: function (x, y) {
        return x - y;
    },
    multiply: function (x, y) {
        return x * y;
    },
    divide: function (x, y) {
        return x / y;
    },
    pow: Math.pow // 乘方
};

function operate2(operator, operand1, operand2) {
    if(typeof operators[operator] === 'function') {
        return operators[operator](operand1, operand2);
    } else {
        throw 'unknown operator';
    }
}

var j = operate2('add', 'hello', operate2('add', 'world'));
console.log(i);

var k = operate2('pow', 10, 2);
console.log(k);


