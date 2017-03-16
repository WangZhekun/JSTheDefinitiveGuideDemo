/**
 * 处理鼠标滚轮事件
 */

/**
 * 把内容元素装入到一个指定大小（最小50X50）的窗体或视口内
 * 可选参数contentX和contentY指定内容相对于窗体的初始偏移量（如果指定，必须<=0）
 * 这个窗体有mousewheel事件处理程序
 * 它允许用户平移元素和缩放窗体
 */
function enclose(content, framewidth, frameheight, contentX, contentY) {
    framewidth = Math.max(framewidth, 50);
    frameheight = Math.max(frameheight, 50);
    contentX = Math.min(contentX, 0) || 0;
    contentY = Math.min(contentY, 0) || 0;

    var frame = document.createElement('div');
    frame.className = 'enclosure';
    frame.style.width = framewidth + 'px';
    frame.style.height = frameheight + 'px';
    frame.style.overflow = 'hidden';
    frame.style.boxSizing = 'border-box';
    frame.style.webkitBoxSizing = 'border-box';
    frame.style.MozBoxSizing = 'border-box';
    content.parentNode.insertBefore(frame, content);
    frame.appendChild(content);

    content.style.position = 'relative';
    content.style.left = contentX + 'px';
    content.style.top = contentY + 'px';
}