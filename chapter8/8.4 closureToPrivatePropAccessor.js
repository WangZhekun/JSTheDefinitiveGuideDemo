/**
 * 利用闭包实现的私有属性存取器方法
 */

/**
 * 给对象o增加了属性存取器方法，方法名称为get<name>和set<name>。
 * 如果提供一个判定函数，setter方法就会用它来检测参数的合法性，然后再存储它，如果判定函数返回false，setter方法抛出异常。
 * getter和setter函数所操作的属性值保存在函数的局部变量。getter和setter方法同样是局部函数，可以访问局部变量。
 * 对于两个访问器，这个变量是私有的
 * @param o
 * @param name
 * @param predicate
 */
function addPrivateProperty(o, name, predicate) {
    var value;
    o['get' + name] = function () {
        return value;
    };

    o['set' + name] = function (v) {
        if (predicate && !predicate(v)) {
            throw Error('set' + name + ': invalid value ' + v)
        } else {
            value = v;
        }
    };
}
