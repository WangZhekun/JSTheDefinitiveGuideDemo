/**
 * 定义子类
 */

/**
 *
 * @param superclass 父类的构造函数
 * @param constructor 新的子类的构造函数
 * @param methods 实例方法：复制至原型中
 * @param statics 类属性：复制至构造函数中
 */
function defineSubClass(superclass, constructor, methods, statics) {
    // 建立子类的原型对象
    constructor.prototype = inherit(superclass.prototype); // 这只能表示子类继承了父类的原型，子类并没有继承父类构造函数中用“this.”创建的方法？？？？
    constructor.prototype.constructor = constructor;

    if(methods) extend(constructor.prototype, methods);
    if(statics) extend(constructor, statics);
    return constructor;
}

Function.prototype.extend = function(constructor, methods, statics) {
    return defineSubClass(this, constructor, methods, statics);
};