/**
 * 返回对象p的类
 * 对象的toString方法返回‘[object class]’
 */
function classof(p) {
    if(p === null) return 'Null';
    if(p === undefined) return 'Undefined';
    return Object.prototype.toString.call(p).slice(8, -1);
}
