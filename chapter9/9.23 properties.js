/**
 * ECMAScript 5属性操作
 */

/**
 * 给Object.prototype定义properties()方法，
 * 这个方法返回一个表示调用它的对象上的属性名列表的对象
 * （如果不带参调用，则表示该对象的所有属性）
 * 返回的对象定义了4个有用的方法：toString()、descriptors()、hide()和show()
 */
(function namespace() {

    function properties() {
        var names;
        if(arguments.length == 0) {
            names = Object.getOwnPropertyNames(this);
        } else if(arguments.length == 1 && Array.isArray(arguments[0])) {
            names = arguments[0];
        } else {
            names = Array.prototype.splice.call(arguments, 0);
        }

        // 返回一个新的Properties对象，用以表示属性名字
        return new Properties(this, names);
    }

    Object.defineProperty(Object.prototype, "properties", {
        value: properties,
        enumerable: false,
        writable:true,
        configurable: true
    });

    /**
     * Properties类表示一个对象的属性集合
     * @param o
     * @param names
     * @constructor
     */
    function Properties(o, names) {
        this.o = o; // 属性所属的对象
        this.names = names; // 属性的名字
    }

    /**
     * 将代表这些属性的对象设置为不可枚举的
     */
    Properties.prototype.hide = function() {
        var o = this.o, hidden = {enumerable: false};
        this.names.forEach(function (n) {
            if(o.hasOwnProperty(n)) {
                Object.defineProperty(o, n, hidden);
            }
        });
        return this;
    };

    /**
     * 将这些属性设置成只读的、不可配置的
     */
    Properties.prototype.freeze = function() {
        var o = this.o, frozen = {writable: false, configurable: false};
        this.names.forEach(function(n) {
            if(this.hasOwnProperty(n)) {
                Object.defineProperty(o, n, frozen);
            }
        });
        return this;
    };

    /**
     * 返回一个对象，这个对象是名字到属性描述符的映射表
     * 使用它来复制属性，连同属性特性一起复制
     * Object.defineProperties(dest, src.properties().descriptors();
     */
    Properties.prototype.descriptors = function() {
        var o = this.o, desc = {};
        this.names.forEach(function(n) {
            if(o.hasOwnProperty(n)) {
                desc[n] = Object.getOwnPropertyDescriptor(o, n);
            }
        });
        return desc;
    };

    /**
     * 返回一个格式化良好的属性列表
     * 里列表中包含名字、值和属性特性，使用“permanent”表示不可配置
     * 使用“readonly”表示不可写，使用“hidden”表示不可枚举
     * 普通的可枚举、可写和可配置属性不包含特性列表
     */
    Properties.prototype.toString = function() {
        var o = this.o;
        var lines = this.names.mag(nameToString);
        return  '{\n' + lines.join(',\n') + '\n}';

        function nameToString(n) {
            var s = '', desc = Object.getOwnPropertyDescriptor(o, n);
            if(!desc) return 'nonexitent ' + n + ': ndefined';
            if(!desc.configurable) s += 'permanent ';
            if((desc.get && !desc.set) || !desc.writable) s += 'readonly ';
            if(!desc.enumerable) s += 'hidden ';
            if(desc.get || desc.set) {
                s += 'accessor ' + n;
            } else {
                s += n + ': ' + ((typeof desc.value === 'function') ? 'function' : desc.value);
            }
            return s;
        }
    };

    // 将原型对象中的实例方法设置为不可枚举
    // Properties.prototype是一个对象，而对象继承Object.prototype
    // 上文中的properties()是Object.prototype的方法
    Properties.prototype.properties().hide();
}());

