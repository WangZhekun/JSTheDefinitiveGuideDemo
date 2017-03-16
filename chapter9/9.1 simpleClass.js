/**
 * 一个表示范围的类
 */

function range(from, to) {
    // 使用例6.1中的方法构建继承自range.methods的对象
    var r = inherit(range.methods);
    r.from = from;
    r.to = to;

    return r;
}

range.methods = {
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


