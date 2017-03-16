/**
 * 利用鸭式辨型实现的函数
 */

/**
 * 如果o实现了除第一个参数之外的参数所表示的方法，则返回true
 * @param o
 */
function quacks(o /*, ...*/) {
    for(var i = 1, len = arguments.length; i < len; i++) {
        var arg = arguments[i];
        switch (typeof arg) {
            case 'string': // 直接用属性名做检查
                if(typeof o[arg] !== 'function') return false;
                continue;
            case 'function': // 检查函数的原型对象上的方法
                arg = arg.prototype; // 进入下一个case
            case 'object': // 检查对象中的方法在待检查对象中是否存在
                for(var m in arg) {
                    if(typeof arg[m] !== 'function') continue;
                    if(typeof o[m] !== 'function') return false;
                }
        }
    }

    // o实现了参数中除第一个外的所有方法
    return true;
}
