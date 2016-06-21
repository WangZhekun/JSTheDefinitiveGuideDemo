/**
 * Created by Administrator on 2016/4/1.
 * 返回任意参数的类
 * 原始的toString方法可以得到对象的类属性,[object class],截取第8个到倒数第2个字符就是对象的类属性
 */
function classof(p) {
    if(p === null) return 'Null';
    if(p === undefined) return 'Undefined';
    return Object.prototype.toString.call(p).slice(8, -1);
}
