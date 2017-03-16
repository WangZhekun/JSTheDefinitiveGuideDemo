/**
 * 类工厂是一种非常强大和有用的特性，类似这种创建类工厂的能力是js语言动态特性的一个体现
 * 使用包装函数和例9.11中的Function.prototype.extend()重写例9.13
 */

var NonNullSet = (function(){
    var superclass = Set;
    return superclass.extend(
        function(){ superclass.apply(this, arguments); }, // 子类的构造函数
        {
            add: function() {
                for(var i = 0, len = arguments.length; i < len; i++) {
                    if(arguments[i] == null) {
                        throw new Error('Can\'t add null or undefined');
                    }
                }
                return superclass.prototype.add.apply(this, arguments);
            }
        } // 子类的方法
    );
}());
