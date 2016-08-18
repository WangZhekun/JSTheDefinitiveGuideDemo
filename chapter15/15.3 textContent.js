/**
 * 查找元素的后代节点中的所有Text节点
 */

/**
 * 返回元素e的纯文本内容，递归进入其子元素
 * 该方法的效果类似于textContent属性
 * @param e
 */
function textContent(e) {
    var child, type, s = '';
    for(child = e.firstChild; child != null; child = child.nextSibling) {
        type = child.nodeType;
        if(type === 3 || type === 4) { // Text和CDATASection节点
            s += child.nodeValue; // nodeValue属性可读写，设置它可以改变Text或CDATASection节点所显示的内容
        } else {
            s += textContent(child);
        }
    }
    return s;
}
