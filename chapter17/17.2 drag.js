/**
 * 拖动文档元素
 */

/**
 * Drag.js：拖动绝对定位的HTML元素
 *
 * 这个模块定义了一个drag()函数，它用于mousedown事件处理程序的调用
 * 随后的mousemove事件将移动指定元素，mouseup事件将终止拖动
 * 这些实现能同标准和IE两种事件模型一起工作
 * 它需要用到本书其他地方介绍的getScrollOffsets()方法
 *
 * @param elementToDrag 接收mousedown事件的元素或某些包含元素，它必须是绝对定位的元素，它的left和top样式会随用户的拖动而变化
 * @param event mousedown事件对象
 */
function drag(elementToDrag, event) {
    // 将光标的坐标转化为文档坐标
    var scroll = getScrollOffset();
    var startX = event.clientLeft + scroll.x;
    var startY = event.clientTop + scroll.y;

    // 记录元素原始位置
    // elementToDrag要求是绝对定位的
    // 假设elementToDrag的offsetParent就是文档的body元素
    var origX = elementToDrag.offsetLeft;
    var origY = elementToDrag.offsetTop;

    // 计算光标到元素左上角的距离
    var deltaX = startX - origX;
    var deltaY = startY - origY;

    if(document.addEventListener) {
        // 捕获事件（捕获阶段是事件传播的第一阶段）
        document.addEventListener('mousemove', moveHandler, true);
        document.addEventListener('mouseup', upHandler, true);
    } else if(document.attachEvent) {
        // 在IE模型中
        // 捕获事件是通过调用元素上的setCapture()
        elementToDrag.setCapture(); // 将鼠标事件捕获到指定的文档的对象，这个对象会为当前应用程序或整个系统接收所有鼠标事件
        // setCapture()方法有一个bool参数，为true时（默认），容器会捕获容器内所有对象的鼠标事件，即容器内的对象不会触发鼠标事件；
        // 参数为false时，容器不会捕获容器内对象的鼠标事件，即容器内的对象可以正常地触发事件和取消冒泡
        elementToDrag.attachEvent('onmousemove', moveHandler);
        elementToDrag.attachEvent('onmouseup', upHandler);
        // 作为mouseup事件看待鼠标捕获的丢失
        elementToDrag.attachEvent('onlosecapture', upHandler);
    }

    // 阻止事件冒泡
    if(event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }

    // 取消事件的默认操作
    if(event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.returnValue = false;
    }

    function moveHandler(e) {
        e = e || window.event;

        var scroll = getScrollOffset();
        elementToDrag.style.left = e.clientX + scroll.x - deltaX + 'px';
        elementToDrag.style.top = e.clientY + scroll.y - deltaY + 'px';

        // 阻止冒泡
        if(e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    }

    function upHandler(e) {
        e = e || window.event;

        if(document.removeEventListener) {
            document.removeEventListener('mouseup', upHandler, true);
            document.removeEventListener('mousemove', moveHandler, true);
        } else if(document.detachEvent) {
            elementToDrag.detachEvent('onlosecapture', upHandler);
            elementToDrag.detachEvent('onmouseup', upHandler);
            elementToDrag.detachEvent('onmousemove', moveHandler);
            elementToDrag.releaseCapture(); // 释放鼠标事件的捕获
        }

        // 阻止冒泡
        if(e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    }
}
