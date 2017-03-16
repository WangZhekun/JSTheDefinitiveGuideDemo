/**
 * 给Object.prototype添加一个不可枚举的extend()方法
 * 这个方法继承自调用它的对象，将作为参数传入的对象的属性一一复制
 * 除值之外，还复制特性，除非this中有同名属性
 * 参数对象的所有自有属性（包括不可枚举属性）都会被一一复制
 */
Object.defineProperty(Object.prototype, 'extend', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function (o) {
        var props = Object.getOwnPropertyNames(o); // 获得所有自有属性，包括不可枚举属性

        for (var i = 0, len = props.length; i < len; i++) {
            if (props[i] in this) continue;
            var desc = Object.getOwnPropertyDescriptor(o, props[i]); // 获得o中的属性的描述符
            Object.defineProperty(this, props[i], desc); // 给this创建一个属性
        }
    }
})
