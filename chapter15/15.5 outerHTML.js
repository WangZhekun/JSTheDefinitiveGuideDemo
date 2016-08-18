/**
 * 使用innerHTML实现outerHTML属性
 */

/**
 * 为那些不支持outerHTML属性的浏览器实现outerHTML
 * 假设浏览器支持innerHTML，并有个可扩展的Element.prototype
 * 并且可以定义getter和setter
 */
(function() {

    /**
     * 如果存在outerHTML属性，则返回
     */
    if(document.createElement('div').outerHTML) {
        return;
    }

    /**
     * 返回this的引用元素的外部HTML（this本身的HTML）
     * @returns {string}
     */
    function outerHTMLGetter() {
        var container = document.createElement('div');
        container.appendChild(this.cloneNode(true)); // 需要先复制一个this，否则会改动当前的DOM结构
        return container.innerHTML;
    }

    /**
     * 将value设置为this引用元素的外部HTML（用value代替this）
     * @param value 字符串
     */
    function outerHTMLSetter(value) {
        var container = document.createElement('div');
        container.innerHTML = value;
        while(container.firstChild) {
            this.parentNode.insertBefore(container.firstChild, this); // 从container中删除第一个子节点，插入到this的前面
        }
        this.parentNode.removeChild(this);
    }

    // 定义outerHTML属性
    if(Object.defineProperty) {
        Object.defineProperty(Element.prototype, 'outerHTML', {
            get: outerHTMLGetter,
            set: outerHTMLSetter,
            enumerable: false,
            configurable: true
        });
    } else {
        Element.prototype.__defineGetter__('outerHTML', outerHTMLGetter);
        Element.prototype.__defineSetter__('outerHTML', outerHTMLSetter);
    }
}());