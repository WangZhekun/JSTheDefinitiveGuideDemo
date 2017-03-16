/**
 * 创建一个新样式表
 */

/**
 * 对文档添加一个样式表，用指定的样式填充它
 * styles参数可能是字符串或对象。如果它是字符串，就把它作为样式表的文本，如果它是对象，将定义样式规则的每个属性添加到样式表中
 * 属性名即选择器，其值即为对象的样式
 * @param styles
 */
function addStyle(styles) {
    // 创建样式表
    var styleElt, styleSheet;
    if(document.createStyleSheet) {
        styleSheet = document.createStyleSheet();
    } else {
        var head = document.getElementsByTagName('head')[0];
        styleElt = document.createElement('style');
        head.appendChild(styleElt);
        styleSheet = document.styleSheets[document.styleSheets.length - 1];
    }

    if(typeof styles === 'string') {
        if(styleElt) {
            styleElt.innerHTML = styles;
        } else {
            styleSheet.cssText = styles;
        }
    } else {
        var i = 0;
        for(selector in styles) {
            if(styleSheet.insertRule) {
                var rule = selector + '{' + styles[selector] + '}';
                styleSheet.insertRule(rule, i++);
            } else {
                styleSheet.addRule(selector, styles[selector], i++);
            }
        }
    }
}
