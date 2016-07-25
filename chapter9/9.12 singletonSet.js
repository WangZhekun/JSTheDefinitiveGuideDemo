/**
 * 一个简单的子类
 * 从Set类继承了toString()、toArray()、equals()方法
 * SingletonSet不是静态地借用Set中的方法，而是动态地从Set中继承方法
 */

/**
 * 构造函数
 * @param member
 * @constructor
 */
function SingletonSet(member) {
    this.member = member; // 集合中的唯一成员
}

SingletonSet.prototype = inherit(Set.prototype);

// 给原型添加方法，如果与Set.prototype存在同名方法，则覆盖之
extend(SingletonSet.prototype, {
    constructor: SingletonSet,
    add: function() {
        throw 'read-only set';
    },
    remove: function() {
        throw 'read-only set';
    },
    size: function() {
        return 1;
    },
    foreach: function(f, context) {
        f.call(context, this.member);
    },
    contains: function(x) {
        return x === this.member;
    }
});
