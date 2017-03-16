/**
 * 通过访问器封装Range的私有变量，但访问器可以被修改，所以需要使用ECMAScript 5的特性封装不可修改的访问器
 */

/**
 * Range类是可变的，但断点变量进行了良好的封装
 * @param from
 * @param to
 * @constructor
 */
function Range(from, to) {
    if(from > to) throw new Error('Rnage: from must be <= to');

    function getFrom() {
        return from;
    }
    function getTo() {
        return to;
    }
    function setFrom(f) {
        if(f <= to) from = f;
        else throw new Error('Range: from must be <= to');
    }
    function setTo(t) {
        if(t >= from) to = t;
        else throw new Error('Range: to must be >= from');
    }
    Object.defineProperties(this, {
        from: {get: getFrom, set: setFrom, enumerable: true, configurable: false},
        to: {get: getTo, set: setTo, enumerable: true, configurable: false}
    });
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
