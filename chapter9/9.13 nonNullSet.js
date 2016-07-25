/**
 * 在子类中调用父类的构造函数和方法
 * 在定义子类时，我们希望对父类的行为进行修改或扩充，而不是完全替换，所以构造函数和子类的方法需要调用或链接到父类的构造函数和父类方法
 */

/**
 * NonNullSet是Set的子类，它的成员不能是null和undefined
 * @constructor
 */
function NonNullSet() {
    // 链接到父类
    Set.apply(this, arguments);
}

NonNullSet.prototype = inherit(Set.prototype);
NonNullSet.prototype.constructor = NonNullSet;
/**
 * 在调用父类的add方法之前，过滤参数
 */
NonNullSet.prototype.add = function() {
    for(var i = 0, len = arguments.length; i < len; i++) {
        if(arguments[i] == null) {
            throw new Error('Can\'t add null or undefined to a NonNullSet');
        }
    }
    return Set.prototype.add.apply(this, arguments);
};
