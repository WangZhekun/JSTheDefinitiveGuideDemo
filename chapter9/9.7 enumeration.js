/**
 * js中的枚举类
 */

/**
 * 这个函数创建了一个新的枚举类型，实参对象表示类的每个实例的名字和值
 * 返回值是一个构造函数，它标识了这个新类
 * 注意，这个构造函数也会抛出异常：不能使用它来创建该类的新实例
 * 返回的构造函数包含名/值对的映射表
 * 包括由值组成的数组，以及一个foreach()迭代器函数
 * @param namesToValues
 */
function enumeration(namesToValues) {
    var enumeration = function () {
        throw 'Can\'t Instantiate Enumerations';
    };

    var proto = enumeration.prototype = {
        constructor: enumeration,
        toString: function () {
            return this.name;
        },
        valueOf: function () {
            return this.value;
        },
        toJSON: function () {
            return this.name;
        }
    };

    enumeration.values = []; // 用以存放枚举对象的数组

    for (var name in namesToValues) {
        var e = inherit(proto);
        e.name = name;
        e.value = namesToValues[name];
        enumeration[name] = e;
        enumeration.values.push(e);
    }

    enumeration.foreach = function (f, c) {
        for (var i = 0, len = this.values.length; i < len; i++) {
            f.call(c, this.values[i]);
        }
    };

    return enumeration;
}
