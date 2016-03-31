/**
 * Created by Administrator on 2016/3/31.
 * 给Object.prototype添加一个不可枚举的extend()方法
 * 这个方法继承自调用它的对象,将作为参数传入的对象的属性一一复制
 * 除了值以外,也复制属性的特性,除非在目标对象中存在同名的属性
 * 参数对象的所有自有对象(包括不可枚举的属性)也会一一复制
 */
Object.defineProperty(Object.prototype, 'extend', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function (o) {
        var props = Object.getOwnPropertyNames(o);

        for (var i = 0, len = props.length; i < len; i++) {
            if (props[i] in this) continue;
            var desc = Object.getOwnPropertyDescriptor(o, props[i]); // 获取描述符
            Object.defineProperty(this, props[i], desc); // 给this创建一个属性
        }
    }
})
