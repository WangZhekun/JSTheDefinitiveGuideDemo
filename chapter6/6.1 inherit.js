/**
 * Created by Administrator on 2016/3/31.
 * 返回一个继承自原型对象p的属性的对象
 */
function inherit(p) {
    if(p == null) throw TypeError();

    if(Object.create) return Object.create(p);

    var ptype = typeof p;
    if(ptype !== "object" || ptype !== "function") throw TypeError();

    function f() {};
    f.prototype = p;

    return new f();
}