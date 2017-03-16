/**
 * 创建一个不可变的类，它的属性和方法都是只读的
 */

function Range(from, to) {
    var  props = {
        from: {
            value: from,
            enumerable: true,
            writable: false,
            configurable: false
        },
        to: {
            value: to,
            enumerable: true,
            writable: false,
            configurable: false
        }
    };
    if(this instanceof Range) { // 如果Range作为构造函数使用，那么this表示创建的Range对象
        Object.defineProperties(this, props);
    } else { // 否则this为window
        Object.create(Range.prototype, props); // 创建拥有指定原型的、拥有指定属性的对象
    }
}

/**
 * 设置属性的特性时，无法识别出它们的可枚举性、可写性或可配置性，这些特性默认为false
 */
Object.defineProperties(Range.prototype, {
    includes: {
        value: function(x) {
            return this.from <= x && x <= this.to;
        }
    },
    foreach: {
        value: function(f) {
            for(var x = Math.ceil(this.from); x < this.to; x++) {
                f(x);
            }
        }
    },
    toString: {
        value: function() {
            return '(' + this.from + '...' + this.to + ')';
        }
    }
});
