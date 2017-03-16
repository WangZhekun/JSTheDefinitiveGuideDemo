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
        // Object.defineProperty 和 Object.defineProperties用来
        // 创建新属性时，其未指定的特性默认为false；
        // 修改属性时，未指定的特性保持原来的值
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
        // Object.defineProperty 和 Object.defineProperties用来
        // 创建新属性时，其未指定的特性默认为false；
        // 修改属性时，未指定的特性保持原来的值
    });
    return o;
}
