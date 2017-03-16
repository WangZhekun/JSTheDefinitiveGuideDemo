/**
 * Created by Administrator on 2016/3/31.
 * 把p中的可枚举属性复制到o中，并返回o
 * 如果o中有同名属性，则覆盖之
 * 这个函数并不处理getter和setter以及复制属性
 */
function extend(o, p) {
    for(var prop in p) {
        o[prop] = p[prop];
    }
    return o;
}

/**
 * 把p中的可枚举属性复制到o中，并返回o
 * 如果o中有同名属性，o中的属性不受影响
 * 这个函数并不处理getter和setter以及复制属性
 * */
function merge(o, p) {
    for(var prop in p) {
        if(o.hasOwnProperty(prop)) continue;
        o[prop] = p[prop];
    }
    return o;
}

/**
 * 如果o中的属性不在p中，则删除o中的属性，返回o
 * */
function restrict(o, p) {
    for(var prop in p) {
        if(!(prop in o)) delete o[prop];
    }
    return o;
}

/**
 * 删除o中的属性在p中存在同名属性，返回o
 * */
function substract(o, p) {
    for(var prop in p) {
        delete o[prop];
    }
    return o;
}

/**
 * 返回一个新对象，该对象中有p和o的属性，如果p和o存在同名属性，使用p中的属性ֵ
 * */
function union(o, p) {
    return extend(extend({}, o), p);
}

/**
 * 返回一个新对象，该对象拥有同时出现在o和p中的属性，使用o中的属性
 * */
function intersection(o, p) {
    return restrict(extend({}, o), p);
}

/**
 * 返回一个数组，这个数组包含的是o中可枚举的自有属性的名字
 * */
function keys(o) {
    if(typeof o !== 'object') throw TypeError();
    var result = [];
    for (var prop in o) {
        if(o.hasOwnProperty(prop)) {
            result.push(prop);
        }
    }
    return result;
}

