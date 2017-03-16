/**
 * 定义不可枚举的属性
 */

(function() {
    /**
     * 定义一个不可枚举的只读属性objectId，被所有对象继承
     */
    Object.defineProperty(Object.prototype, 'objectId', {
        getter: idGetter, // 取值器
        enumerable: false, // 不可枚举
        configurable: false // 不可删除
    });
    var idprop = "|**objectId**|";
    var nextid = 1;
    function idGetter() {
        if(!(idprop in this)) {
            if(!Object.isExtensible(this)) { // this不可扩展
                throw new Error('Can\'t define id for nonextensible objects');
            }
            // 给this增加属性
            Object.defineProperty(this, idprop, {
                value: nextid++,
                writable: false, // 不可写
                enumerable: false, // 不可枚举
                configurable: false // 不可删除
            })
        }
    }
}());
