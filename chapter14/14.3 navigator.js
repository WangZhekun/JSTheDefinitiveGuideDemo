/**
 * 使用navigator.userAgent来进行浏览器的嗅探
 */

/**
 * 为客户端嗅探定义browser.name和browser.version，这里使用了jQuery 1.4.1中的代码
 * name和number都是字符串，对于不同浏览器的输出的不同。检测结果如下：
 *
 * “webkit”：Safari或Chrome；版本号是Webkit的版本
 * “opera”：Opera；版本号是软件版本
 * “mozilla”：Firfox或者其他基于gecko内核的浏览器；版本号是Gecko的版本
 * “msie”：IE；版本号是软件的版本
 */
var browser = (function(){
    var s = window.navigator.userAgent.toLocaleLowerCase();
    var match = /(webkit)[\/]([\w.]+)/.exec(s) ||
        /(opera)(?:.*version)?[\/]([\w.]+)/.exec(s) ||
        /(msie) ([\w.]+)/.exec(s) ||
        !/compatible/.test(s) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) || [];
    return {name: match[1], version: match[2]};
}());
