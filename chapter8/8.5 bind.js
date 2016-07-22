/**
 * ECMAScript 3版本的Function.bind()方法
 * ECMAScript 5中的bind()方法的作用是将函数绑定到某个对象
 * 在函数f()上调用bind()方法并传入一个对象o作为参数，这个方法将返回一个新函数。调用新函数将会把原始的函数f()当做o的方法来调用
 * 除bind()的第一个实参外，其他实参会依次传入f()的形参中（在调用的时候），如：
 *  function f(y, z) { return this.x + y + z;}
 *  var g = f.bind({x: 1}, 2);
 *  g(3) // 6 f的参数y为2，z为3
 */

/**
 * 在ECMAScript 3中模拟bind方法，并将其另存为Function.prototype.bind，以便所有的函数对象都继承它
 */
if(!Function.prototype.bind) {
    Function.prototype.bind = function(o /*, args*/) {
        // 将this和argument保存到变量中
        // 以便在后面嵌套的函数中使用
        // this表示函数本身，实际上var f = function(x,y) {...}等效与var f = new Function('x', 'y', '...');
        // 所以继承自Function.prototype的方法中的this指的是对象f
        // Function.prototype.bind的bind是function本身的属性，注意与function作为构造函数的类的对象的方法区分
        // 而函数f中的shis指的是window
        var self = this, boundArgs = arguments;

        // bind方法的返回值是一个函数
        return function() {
            var args = [], i;
            for(i = 1, len = boundArgs.length; i < len; i++) args.push(boundArgs[i]);
            for(i = 0, len = arguments.length; i < len; i++) args.push(arguments[i]);
            return self.apply(o, args);
        }
    }
}
