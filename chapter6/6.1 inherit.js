/**
 * Created by Administrator on 2016/3/31.
 * 返回一个继承指定参数的对象
 * 参数为null、非对象或非function时抛TypeError异常
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