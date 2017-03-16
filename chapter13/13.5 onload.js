/**
 * 当文档载入完成时调用一个函数
 */

/**
 * 注册函数f，当文档载入完成时执行f
 * 如果文档载入完成，尽快异步执行f
 * @param f
 */
function onLoad(f) {
    if(onLoad.loaded) {
        window.setTimeout(f, 0); // 将f放到异步队列，并尽快执行它
    } else if(window.addEventListener) {
        window.addEventListener('load', f, false);
    } else if(window.attachEvent) {
        window.attachEvent('load', f);
    }
}

onLoad.loaded = false;
onLoad(function() {
    onLoad.loaded = true;
});
