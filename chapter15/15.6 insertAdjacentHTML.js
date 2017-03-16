/**
 * 使用innerHTML实现insertAdjacentHTML()
 *
 * insertAdjacentHTML第一个参数的四个位置如下：
 * [beforebegin]<div>[afterbegin]there are some child nodes[beforeend]</div>[afterend]
 */

/**
 * 本模块为不支持insertAdjacentHTML方法的浏览器的定义了该方法
 * 还定义了一些可移植的HTML插入函数，它们的名字比insertAdjacentHTML更符合逻辑：
 * Insert.before()、Insert.after()、Insert.atStart()、Insert.atEnd()
 */
var Insert = (function () {
    // 如果元素有原生的insertAdjacentHTML，则使用它完成插入
    if(document.createElement('div').insertAdjacentHTML) {
        return {
            before: function (e, h) {
                e.insertAdjacentHTML('beforebegin', h);
            },
            after: function (e, h) {
                e.insertAdjacentHTML('afterend', h);
            },
            atStart: function (e, h) {
                e.insertAdjacentHTML('afterbegin', h);
            },
            atEnd: function (e, h) {
                e.insertAdjacentHTML('beforeend', h);
            }
        }
    }

    // 创建4个插入函数，并以此定义insertAdjacentHTML

    // 定义一个工具函数，传入HTML字符串，返回一个DocumentFragment，它包含了解析后的HTML的表示
    function fragment(html) {
        var ele = document.createElement('div');
        var frag = document.createDocumentFragment();
        ele.innerHTML = html;
        while (ele.firstChild) {
            frag.appendChild(ele.firstChild);
        }
        return frag;
    }

    var Insert = {
        before: function (e, h) {
            e.parentNode.insertBefore(fragment(h), e);
        },
        after: function (e, h) {
            e.parentNode.insertBefore(fragment(h), e.nextSibling);
        },
        atStart: function (e, h) {
            e.insertBefore(fragment(h), e.firstChild);
        },
        atEnd: function (e, h) {
            e.appendChild(fragment(h));
        }
    };

    // 基于上述四个函数，实现insertAdjacentHTML
    Element.prototype.insertAdjacentHTML = function (pos, html) {
        switch (pos.toLowerCase()) {
            case 'beforebegin': return Insert.before(this, html);
            case 'afterend': return Insert.after(this, html);
            case 'afterbegin': return Insert.atStart(this, html);
            case 'beforeend': return insert.atEnd(this, html);
        }
    };

    return Insert;

}());