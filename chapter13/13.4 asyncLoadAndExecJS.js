/**
 * 异步加载和执行js
 */

function loadasync(url) {
    var head = document.getElementsByTagName('head')[0];
    var s = document.createElement('script');
    s.src = url;
    head.appendChild(s);
}