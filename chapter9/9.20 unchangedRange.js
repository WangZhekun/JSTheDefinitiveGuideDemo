/**
 * 一个简单的不可变的类
 */

function Range(from, to) {
    this.from = from;
    this.to = to;
    freezeProps(this); // 不可写，不可配置
}

Range.prototype = hideProps({
    constructor: Range,
    includes: function(x) {
        return this.from <= x && x <= this.to;
    },
    foreach: function(f) {
        for(var x = Math.ceil(this.from); x <= this.to; x++) {
            f(x);
        }
    },
    toString: function() {
        return '(' + this.from + '...' + this.to + ')';
    }
}); // prototype的方法不可枚举
