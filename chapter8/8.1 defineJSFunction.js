/**
 * 定义JS函数
 */

/**
 * 输出o的每个可枚举属性的名字和值
 * @param o
 */
function printprops(o) {
    for(var prop in o) {
        console.log(prop + ':' + o[prop] + '\n');
    }
}

/**
 * 计算两个点的笛卡尔积
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 */
function distance(x1, y1, x2, y2) {
    var x = x2 - x1;
    var y = y2 - y1;
    return Math.sqrt(x*x + y*y);
}

/**
 * 递归计算x的阶乘
 * @param x
 * @returns {number}
 */
function factorial(x) {
    if(x <= 1) return 1;
    return x * factorial(x - 1);
}

/**
 * 函数表达式，计算x的平方
 * @param x
 * @returns {number}
 */
var square = function(x) {
    return x*x;
};

/**
 * 函数表达式可以包含函数名，在递归时特别有用
 * @param x
 * @returns {number}
 */
var f = function fact(x) {
    if(x <= 1) return 1;
    return x * fact(x - 1);
};

/**
 * 匿名函数作为递归函数调用
 * arguments.callee指向当前调用的函数
 * arguments.caller可以访问调用栈，但不是标准属性
 */
var f = function(x) {
    if(x <= 1) return 1;
    return x * arguments.callee;
};

/**
 * 匿名函数作为参数传递
 * @type {Array}
 */
var data = [];
data.sort(function(a, b) {
    return a - b;
});

/**
 * 函数表达式定义后立即调用
 */
var tensquared = (function(x){ return x*x; }(10));
