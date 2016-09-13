/**
 * 查询计算样式与设置内联样式
 */

/**
 * 用指定的因子缩放元素e的文本尺寸
 * @param e
 * @param factor
 */
function scale(e, factor) {
    var size = parseInt(window.getComputedStyle(e, '').fontSize);
    // getComputedStyle()方法获得一个元素的计算样式，第二个参数必填，可以为null或空串，或伪类，如“:after”
    // getComputedStyle()方法返回一个CSSStyleDeclaration对象（计算样式的对象）
    // 计算样式的属性是只读的；计算样式的值是绝对的；无复合属性，如margin等；计算样式的cssText属性未定义
    e.style.fontSize = factor * size + 'px';
}

/**
 * 用指定因子修改元素e的背景色
 * @param e
 * @param factor > 1 颜色变浅，< 1 颜色变暗
 */
function scaleColor(e, factor) {
    var color = window.getComputedStyle(e, '').backgroundColor;

    var components = color.match(/[\d\.]+/g);
    for(var i = 0; i < 3; i++) {
        var x = Number(components[i]) * factor;
        x = Math.round(Math.min(Math.max(x, 0), 255));
        components[i] = String[x];
    }
    if(components.length === 3) {
        e.style.backgroundColor = 'rgb(' + components.join(',')+')';
    } else {
        e.style.backgroundColor = 'rgba(' + components.join(',') + ')';
    }
}
