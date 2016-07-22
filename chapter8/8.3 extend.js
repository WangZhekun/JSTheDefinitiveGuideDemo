/**
 * 特性情况下返回带补丁的extend
 */

/**
 * 定义一个扩展函数，用来将第二个以及后续参数复制到第一个参数
 * 处理IE bug：在许多IE版本中，如果o的属性拥有一个不可枚举的同名属性，则for/in循环不会枚举对象o的可枚举性属性，
 * 夜就是说，将不会正确地处理诸如toString的属性，除非我们显示检测它
 */
var extend = (function () {
    // 检查IE bug
    for(var p in {toString: null}) {
        // 如果执行到这里，说明没有上述IE bug
        return function extend(o) {
            for(var i = 1, len = arguments.length; i < len; i++) {
                var source = arguments[i];
                for(var prop in source) {
                    o[prop] = source[prop];
                }
            }
        };

        // 如果执行到这里说明存在上述IE bug
        return function patched_extend(o) {
            for(var i = 1, len = arguments.length; i < len; i++) {
                var source = arguments[i];
                // 复制可枚举属性
                for(var prop in source) {
                    o[prop] = source[prop];
                }
                // 复制特殊属性
                for(var j = 0, proLen = protoprops.length; i < proLen; j++) {
                    prop = protoprops[j];
                    if(source.hasOwnProperty(prop)) o[prop] = source[prop];
                }
            }
        };

        var protoprops = ['toString', 'valueOf', 'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString'];
    }
}());