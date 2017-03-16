/**
 * 查询窗口滚动条的位置
 * 其他关于视口坐标和文档坐标的知识点，见15.8章！！！！
 */

/**
 * 以一个对象的x和y属性的方式返回滚动条的偏移量
 */
function getScrollOffset(w) {
    // 指定窗口，如果不带参数，则为当前窗口
    w = w || window;

    // 除了IE 8以及更早的版本以外，其他浏览器的都能用
    if(w.pageXOffset != null) {
        return {
            x: w.pageXOffset,
            y: w.pageYOffset
        }
    }

    // 对标准模式下的IE（或任何浏览器）
    var d = w.document;
    if(document.compatMode == 'CSS1Compat') {
        return {
            x: d.documentElement.scrollLeft,
            y: d.documentElement.scrollTop
        }
    }

    // 对怪异模式下的浏览器
    return {
        x: d.body.scrollLeft,
        y: d.body.scrollTop
    }
}
