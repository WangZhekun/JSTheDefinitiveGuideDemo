/**
 * Created by Administrator on 2016/3/31.
 * 将p中的可枚举属性复制到o中,并返回o
 * 如果o和p有同名属性,那么覆盖o中的同名属性
 * 该函数不处理getter和setter,以及属性的复制(属性的值是对象时,为浅拷贝)
 * 合集
 */
function extend(o, p) {
    for(var prop in p) {
        o[prop] = p[prop];
    }
    return o;
}

/**
 * 将p中的可枚举属性复制到o中,并返回o
 * 如果o和p有同名属性,那么不覆盖o中的同名属性
 * 该函数不处理getter和setter,以及属性的复制(属性的值是对象时,为浅拷贝)
 * 合集
 * */
function merge(o, p) {
    for(var prop in p) {
        if(o.hasOwnProperty(prop)) continue;
        o[prop] = p[prop];
    }
    return o;
}

/**
 * 如果o中的属性在p中没有同名属性,则删除该属性,并返回o
 * 并集
 * */
function restrict(o, p) {
    for(var prop in p) {
        if(!(prop in o)) delete o[prop];
    }
    return o;
}

/**
 * 如果o中存在p中的同名属性,则删除之,并返回o
 * 差集
 * */
function substract(o, p) {
    for(var prop in p) {
        delete o[prop];
    }
    return o;
}

/**
 * 返回一个新对象,该对象是o和p的合集,同名属性使用p中的值
 * 合集
 * */
function union(o, p) {
    return extend(extend({}, o), p);
}

/**
 * 返回一个新对象,该对象拥有o和p的共同属性,属性值使用o的
 * 并集
 * */
function intersection(o, p) {
    return restrict(extend({}, o), p);
}

/**
 * 返回一个数组,这个数组包含o中可枚举的自有属性的名字
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

