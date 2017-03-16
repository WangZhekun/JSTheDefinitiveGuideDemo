/**
 * 类工厂和方法链
 * 上接例9.13，将非null集合的概念推而广之，称为“过滤后的集合”，这个集合中的成员必须首先传入一个过滤函数再执行添加操作。
 * 为此定义一个可以接收两个参数的工厂函数：子类和用于add()方法过滤函数。
 */

/**
 * 这个函数返回具体Set类的子类
 * 并重写该类的add()方法用以对添加的元素做特殊的过滤
 * @param superclass 父类
 * @param filter add()方法的过滤函数
 * @return 子类构造方法
 */
function filteredSetSubclass(superclass, filter) {
    var constructor = function() {
        superclass.apply(this, arguments);
    };
    var proto = constructor.prototype = inherit(superclass.prototype);
    proto.constructor = constructor;
    proto.add = function() {
        for(var i = 0, len = arguments.length; i < len; i++) {
            var v = arguments[i];
            if(!filter(v)) {
                throw new Error('value ' + v + ' rejected by filter');
            }
        }
        superclass.prototype.add.apply(this, arguments);
    };
    return constructor;
}
