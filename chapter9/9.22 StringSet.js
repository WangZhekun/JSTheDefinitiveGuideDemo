/**
 * StringSet: 利用ECMAScript 5的特性定义的子类
 */

function StringSet() {
    this.set = Object.create(null); // 创建一个不包含原型的对象
    // in关键字遍历所有可枚举属性（或索引），Object.hasOwnProperty()判断属性是否是指定对象自己的属性（而非继承来的）
    this.n = 0;
    this.add.apply(this.arguments);
}

/**
 * 注意特性中只指定了value，其他特性默认为false，只读方法让这个类难于子类化（被继承）
 * @type {AbstractWritableSet}
 */
StringSet.prototype = Object.create(AbstractWritableSet.prototype, {
    constructor: {value: StringSet},
    contains: {
        value: function (x) {
            return x in this.set;
            // 注意in的使用，因为this.set是一个没有prototype的对象，所以in的效果和Object.hasOwnProperty()效果一样
        }
    },
    size: {
        value: function (x) {
            return this.n;
        }
    },
    foreach: {
        value: function (f, c) {
            Object.keys(this.set).forEach(f, c);
        }
    },
    add: {
        value: function () {
            for (var i = 0, len = arguments.length; i < len; i++) {
                if (!(arguments[i] in this.set)) {
                    this.set[arguments[i]] = true;
                    this.n++;
                }
            }
            return this;
        }
    },
    remove: {
        value: function() {
            for(var i = 0, len = arguments.length; i < len; i++) {
                if(arguments[i] in this.set) {
                    delete this.set[arguments[i]];
                    this.n--
                }
            }
            return this;
        }
    }
});