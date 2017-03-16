/**
 * 将className当做一个CSS类集合
 */

/**
 * 如果e有classList属性则返回它。否则，返回一个为e模拟DOMTokenList API的对象
 * 返回的对象有contains()、add()、remove()、toggle()和toString()等方法
 * 来检测和修改元素e的类集合。如果classList属性是原生支持的，
 * 返回的类数组对象有length和数组索引属性。模拟DOMTokenList不是类数组对象，
 * 但是它有一个toArray()方法来返回一个含元素类名的纯数组快照
 * @param e
 */
function classList(e) {
    if(e.classList) {
        return e.classList;
    } else {
        return new CSSClassList(e);
    }
}

/**
 * CSSClassList是一个模拟DOMTokenList的JavaScript类
 * @param e
 * @constructor
 */
function CSSClassList(e) {
    this.e = e;
}
CSSClassList.prototype.contains = function(c) {
    if(c.length === 0 || c.indexOf(' ') !== -1) {
        throw new Error('Invalid class name: \'' + c + '\'');
    }
    var classes = this.e.className;
    if(!classes) {
        return false;
    }
    if(classes === c) {
        return true;
    }
    return classes.search("\\b" + c + "\\b") !== -1;
};
CSSClassList.prototype.add = function (c) {
    if(this.contains(c)) {
        return;
    }
    var classes = this.e.className;
    if(classes && classes[classes.length - 1] !== ' ') {
        c = ' ' + c;
    }
    this.e.className += c;
};
CSSClassList.prototype.remove = function (c) {
    if(c.length === 0 || c.indexOf(' ') !== -1) {
        throw new Error('Invalid class name: \'' + c + '\'');
    }
    var pattern = new RegExp('\\b' + c + '\\b\\s*', 'g');
    this.e.className = this.e.className.replace(pattern, '');
};
CSSClassList.prototype.toggle = function (c) {
    if(this.contains(c)) {
        this.remove(c);
        return false;
    } else {
        this.add(c);
        return true;
    }
};
CSSClassList.prototype.toString = function () {
    return this.e.className;
};
CSSClassList.prototype.toArray = function () {
    return this.e.className.match(/\b\w+\b/g) || [];
};