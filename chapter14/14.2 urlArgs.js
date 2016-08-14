/**
 * 提取URL的搜索字符串中的参数
 */

/**
 * 解析URL中搜索串中的name=value参数对象，并将其存储在一个对象中
 */
function urlArgs() {
    var args = {};
    var query = window.location.searchsubstring(1);
    var pairs = query.split('&');
    for(var i = 0, len = pairs.length; i < len; i++) {
        var pos = pairs[i].indexOf('=');
        if(pos === -1) continue;
        var name = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        args[name] = value;
    }
    return args;
}

