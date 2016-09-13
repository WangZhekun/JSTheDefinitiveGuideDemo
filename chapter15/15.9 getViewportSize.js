/**
 * 查询窗口的视口大小
 */

/**
 * 作为一个对象的w和h属性返回视口的尺寸
 */
function getViewportSize(w) {
    // 使用指定窗口，不指定则使用当前窗口
    w = w || window;

    // 除了IE 8以及更早的版本以外，其他浏览器的都能使用
    if(w.innerWidth != null) {
        return {
            w: w.innerWidth,
            h: w.innerHeight
        }
    }

    // 对标准模式下的IE（或任何浏览器）
    var d = w.document;
    if(document.compatMode == 'CSS1Compat') {
        return {
            w: d.documentElement.clientWidth,
            h: d.documentElement.clientHeight
        }
    }

    // 怪异模式下
    return {
        w: d.body.clientWidth,
        h: d.body.clientHeight
    }
}
