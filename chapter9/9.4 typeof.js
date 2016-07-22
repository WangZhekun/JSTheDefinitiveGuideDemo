/**
 * 可以判断值的类型的type函数
 */

/**
 * 以字符串形式返回o的类型
 * -如果o是null，返回‘null’；如果o是NaN，返回‘nan’
 * -typeof返回的值不是‘object’，则返回这个值
 * 注意，有一些js将正则表达式识别为函数
 * -如果o的类不是‘Object’，则返回这个值
 * -如果o包含构造函数且这个构造函数有名称，则返回这个名称
 * -否则，返回‘Object’
 * @param o
 */
function type(o) {
    var t, c, n; // type, class, name
    if(o === null) return 'null';
    if(o !== o) return 'nan';
    if((t = typeof o) !== 'object') return t;
    if((c = classof(o)) !== 'Object') return c;
    if(o.constructor && typeof o.constructor === 'function' && (n = o.constructor.getName())) return n;
    // ？？问题：并不是所有的对象都具有constructor属性
    return 'Object';
}

/**
 * 返回对象的类
 * @param o
 * @returns {Array.<T>|string|Blob|ArrayBuffer}
 */
function classof(o) {
    return Object.prototype.toString.call(o).slice(8, -1);
}

Function.prototype.getName = function() {
    if('name' in this) return this.name;
    return this.name = this.toString().match(/functon\s*([^(]*)\(/)[1];
    // ？？问题：当函数为匿名函数时，this.toString().match(/functon\s*([^(]*)\(/)的结果是null，
    // 但type(new function(){})的值为Object，匿名函数为构造函数的name属性为空串
};
