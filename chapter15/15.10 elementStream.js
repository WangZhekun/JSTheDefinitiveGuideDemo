/**
 * 针对innerHTML属性的流式API
 * 利用指定元素的innerHTML属性包装了简单的write()和close()方法
 */

/**
 * 为设置元素的innerHTML定义简单的“流式”API
 * @param elt
 * @constructor
 */
function ElementStream(elt) {
    if(typeof elt === 'string') {
        elt = document.getElementById(elt);
    }
    this.elt = elt;
    this.buffer = '';
}
ElementStream.prototype.write = function () {
    this.buffer += Array.prototype.join.call(arguments, '');
};
ElementStream.prototype.writeln = function () {
    this.buffer += Array.prototype.join.call(arguments, '') + '\n'; // 此处的“\n”只能使输出的文本是换行，在html渲染中，并不能换行
};
ElementStream.prototype.close = function () {
    this.elt.innerHTML = this.buffer;
    this.buffer = '';
}


