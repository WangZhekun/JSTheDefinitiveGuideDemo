/**
 * 方法借用（borrowing）的泛型实现
 * 自定义泛型方法（generic method），如本例中，可以被Range、Complex、Card等简单类使用。
 * 多个类中的方法共用一个单独的函数。在经典的面向对象中，把一个类的方法用到其他的类中的做法叫做“多重继承”（multiple inheritance）。
 * 在js中这个方法叫“方法借用”（borrowing）。
 */

var generic = {
    toString: function() {
        var s = '[';
        // 并不是构造函数的name属性是非标准的，所有不是所有环境都可用
        if(this.constructor && this.constructor.name) {
            s += this.constructor.name + ':';
        }

        var n = 0;
        for(var name in this) {
            if(!this.hasOwnProperty(name)) continue;
            var value = this[name];
            if(typeof value === 'function') continue;
            if(n++) s += ',';
            s += name + '=' + value;
        }
        return s + ']';
    },
    /**
     * 通常比较this和that的构造函数和实例属性来判断它们是否相等
     * 这种方法只适合于那些实例属性是原始值的情况，原始值可以通过“===”来比较
     * 这里还处理一种特殊情况，就是忽略由Set类添加的特殊属性
     * 只能进行浅比较，不适用于实例太复杂的类
     * @param that
     */
    equals: function(that) {
        if(that == null) return false;
        if(this.constructor !== that.constructor) return false;
        for(var name in this) {
            if(name === '|**objectid**|') continue;
            if(!this.hasOwnProperty(name)) continue;
            if(this[name] !== that[name]) return false;
        }
        return true;
    }
};