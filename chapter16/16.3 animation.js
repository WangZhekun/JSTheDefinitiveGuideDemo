/**
 * CSS动画
 */

/**
 * 将e转化为相对定位的元素，使之左右“震动”
 * 第一个参数可以是元素对象或元素的id
 * 如果第二个参数是函数，以e为参数，它将在动画结束时调用
 * 第三个参数指定e震动的距离，默认是5像素
 * 第四个参数指定震动多久，默认是500毫秒
 * @param e
 * @param oncomplete
 * @param distance
 * @param time
 */
function shake(e, oncomplete, distance, time) {
    if(typeof e === 'string') {
        e = document.getElementById(e);
    }

    time = time || 500;
    distance = distance || 5;

    var originalStyle = e.style.cssText;
    e.style.position = 'relative';
    var start = new Date().getTime();
    animate(); // 动画开始

    /**
     * 函数检查消耗的时间，并更新e的位置
     * 如果动画完成，它将e还原为原始状态
     * 否则，它更新e的位置，安排它自身重新运行
     */
    function animate() {
        var now = new Date().getTime();
        var elapsed = now - start;
        var fraction = elapsed / time;
        if(fraction < 1) {
            var x = distance * Math.sin(fraction*4*Math.PI); // 以正弦函数往复摇动两次
            e.style.left = x + 'px';
            // 最多25毫秒后重新执行animate，为了产生每秒40帧动画
            setTimeout(animate, Math.min(25, time - elapsed));
        } else {
            e.style.cssText = originalStyle;
            if(oncomplete) oncomplete(e);
        }
    }
}

/**
 * 以毫秒级的时间将e从完全不透明淡出到完全透明
 * 在调用函数时假设e是完全不透明的
 * oncomplete是一个可选函数，以e为参数，它将在动画结束时调用
 * 如果不指定time，默认为500毫秒
 * 该函数在IE中不能正常工作，但也可以修改得能工作
 * 除了opacity，IE使用非标准的filter属性
 * @param e
 * @param oncomplete
 * @param time
 */
function fadeOut(e, oncomplete, time) {
    if(typeof e === 'string') e = document.getElementById(e);
    time = time || 500;

    var ease = Math.sqrt; // 平方根，动画的曲线，一开始淡出得较快，然后缓慢一些
    var start = new Date().getTime();

    animate();

    function animate() {
        var elapsed = new Date().getTime() - start;
        var fraction = elapsed / time;
        if(fraction < 1) { // 动画未完成
            var opacity = 1 - ease(fraction); // 计算不透明度
            e.style.opacity = String(opacity);
            setTimeout(animate, Math.min(25, time - elapsed)); // 调度下一帧
        } else {
            e.style.opacity = '0'; // 使e完全透明
            if(oncomplete) oncomplete();
        }
    }
}