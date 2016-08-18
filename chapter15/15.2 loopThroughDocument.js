/**
 * 可移植的文档遍历函数
 */

/**
 * 返回元素e的第n层祖先元素，如果不存在此类祖先或祖先不是Element（例如Document或DocumentFragment）则返回null
 * 如果n为0，返回e本身，如果n为1或省略，返回e的父元素
 * @param e
 * @param n
 */
function parent(e, n) {
    if(n === undefined) n = 1;
    while (n-- && e) {
        e = e.parentNode;
    }
    if(!e || e.nodeType !== 1) return null; // nodeType属性值为9表示Document节点，1表示Element，3表示Text，8表示Comment，11表示DocumentFragment
    return e;
}

/**
 * 返回元素的第n个兄弟节点
 * n为0，返回e
 * n为正，返回后续第n个兄弟节点
 * n为负，返回前面的第n个兄弟节点
 * @param e
 * @param n
 */
function sibling(e, n) {
    while(e && n != 0) {
        if(n > 0) {
            if(e.nextElementSibling) {
                e = e.nextElementSibling;
            } else {
                for(e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling) {
                }
            }
            n--;
        } else {
            if(e.previousElementSibling) {
                e = e.previousElementSibling;
            } else {
                for(e = e.previousSibling; e && e.nodeType !== 1; e = e.previousSibling) {
                }
            }
            n++;
        }
    }
    return e;
}

/**
 * 返回元素e的第n个子元素，如果不存在了则为null
 * 负值n代表从后往前计数。0表示第一个子元素，而-1代表最后一个，-2表示倒数第二个，以此类推
 * @param e
 * @param n
 */
function child(e, n) {
    if(e.children) { // children数组是Element的属性
        if(n < 0) n += e.children.length;
        if(n < 0) return null;
        return e.children[n];
    }

    // e没有children数组的情况，找到第一个子元素并向前数，或找到最后一个子元素并往回数
    if(n >= 0) {
        if(e.firstElementChild) {
            e = e.firstElementChild;
        } else {
            for(e = e.firstChild; e && e.nodeType !== 1; e = e.nextSibling) {
            }
        }
        return sibling(e, n); // 当n等于0时表示child()需要返回第一个子元素，即此时的e
    } else {
        if(e.lastElementChild) {
            e = e.lastElementChild;
        } else {
            for(e = e.lastChild; i && e.nodeType !== 1; e = e.previousSibling) {}
        }
        return sibling(e, n+1);
    }
}
