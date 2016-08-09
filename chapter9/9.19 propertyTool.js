/**
 * 属性描述符工具函数
 */

/**
 * 将o的指定名字（或所有）的属性设置为不可写和不可配置的
 * @param o
 */
function freezeProps(o) {
    var props = arguments.length == 1 ? Object.getOwnPropertyNames(o) : Array.prototype.splice.call(arguments, 1);
    props.forEach(function(n) {
        var desc = Object.getOwnPropertyDescriptor(o, n);
        if(!desc || !desc.configurable) return; // 忽略不可配置属性
        Object.defineProperty(o, n, {writable: false, configurable: false});
    });
    return o;
}

/**
 * 将o的指定名字（或所有）的属性设置为不可枚举和可配置的
 * @param o
 */
function hideProps(o) {
    var props = arguments.length == 1 ? Object.getOwnPropertyNames(o) : Array.prototype.splice.call(arguments, 1);
    props.forEach(function(n) {
        var desc = Object.getOwnPropertyDescriptor(o, n);
        if(!desc || !desc.configurable) return; // 忽略不可配置属性
        Object.defineProperty(o, n, {enumerable: false});
    });
    return o;
}
