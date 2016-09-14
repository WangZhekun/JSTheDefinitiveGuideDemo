/**
 * 当文档为操作准备就绪时，传递给whenReady()的函数将会作为Document对象的方法调用。
 * 和之前的onLoad()函数不同，whenReady()监听DOMContentLoaded和readystatechange事件，
 * 而使用load事件仅仅是为了兼容哪些不支持之前事件的较老浏览器。
 */

/**
 * 传递函数给whenReady，当文档解析完毕且为操作准备就绪时，函数将作为文档对象的方法调用
 * DOMContentLoaded、readystatechange或load事件发生时会触发注册函数
 * 一旦文档准备就绪，所有函数都将被调用，任何传递给whenReady()的函数都将立即调用
 *
 * window对象的load事件直到文档和所有图片加载完毕时才发生
 * DOMContentLoaded事件在文档加载解析完毕所欲延迟（deferred）脚本都执行完毕时会触发，此时图片和异步（async）脚本可能依旧在加载
 * readystatechange事件在load事件之前立即触发
 */
var whenReady = (function () {
    var funcs = []; // 当获得事件时，要运行的函数
    var ready = false; // 当触发事件处理程序时，切换到true

    function handler(e) {
        if(ready) return;

        if(e.type === 'readystatechange' && document.readyState !== 'complete') {
            return
        }

        for(var i = 0, len = funcs.length; i < len; i++) {
            funcs[i].call(document);
        }

        ready = true;
        funcs = null;
    }

    if(document.addEventListener) {
        document.addEventListener('DOMContentLoaded', handler, false);
        document.addEventListener('readystatechange', handler, false);
        window.addEventListener('load', handler, false);
    } else if(document.attachEvent) {
        document.attachEvent('onreadystatechange', handler, false);
        window.attachEvent('onload', handler);
    }

    return function (f) {
        if(ready) {
            f.call(document);
        } else {
            funcs.push(f);
        }
    }
}());
