/**
 * 定时器应用函数
 */

/**
 * 安排函数f()在未来的调用模式
 * 在等待若干秒后调用f()
 * 如果设置了interval，并没有设置end，则对f()的调用不停
 * 如果没有设置interval和end，则在若干秒后值调用f()一次
 * 只指定f，则在start=0时刻执行f()
 * 注意：调用invoke不会阻塞，会立即返回
 * @param f
 * @param start
 * @param interval
 * @param end
 */
function invoke(f, start, interval, end) {
    if(!start) start = 0;
    if(arguments.length <= 2) {
        window.setTimeout(f, start);
    } else {
        window.setTimeout(repeat, start);
        function repeat() {
            var h = window.setInterval(f, start);
            if(end) window.setTimeout(function() {
                window.clearInterval(h);
            }, end);
        }
    }
}
