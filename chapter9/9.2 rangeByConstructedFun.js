/**
 * 使用构造函数来定义“范围类”
 */

/**
 * 这是一个构造函数
 * @param from
 * @param to
 * @constructor
 */
function Range(from, to) {
    this.from = from;
    this.to = to;
}

Range.prototype = {
    // 如果x在范围内，则返回true，否则返回false
    // 可比较数字、字符串、日期
    includes: function(x) {
        return this.from <= x && x <= this.to;
    },
    // 对范围内的每个整数都调用一次f
    // 可用数字范围
    foreach: function(f) {
        for(var x = Math.ceil(this.from); x <= this.to; x++) {
            f(x);
        }
    },
    // 返回这个范围的字符串
    toString: function() {
        return '(' + this.from + '...' + this.to + ')';
    }
};
