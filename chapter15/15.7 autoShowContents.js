/**
 * 为标题元素（如：<h1>、<h2>）自动生成目录表
 * 该示例展示了文档脚本化的很多概念：元素选取、文档遍历、元素属性设置、innerHTML属性设置和在文档中创建与插入新节点等。
 */

/**
 * 这个模块注册一个可在页面加载完成后自动运行的匿名函数。
 * 当执行这个函数时会去文档中查找id为“TOC”的元素。如果这个元素不存在，就创建一个元素。
 *
 * 生成的TOC目录应当具有自己的CSS样式。整个目录区域的样式className设置为“TOCEntry”
 * 同样我们为不同层次的目录标题定义不同的样式。<h1>标签生成的标题className为“TOCLevel1”，
 * <h2>标签生成的标题className为“TOCLevel2”，以此类推。
 * 段编号的样式为“TOCSectNum”。
 *
 * 具体CSS样式如下：
 * #TOC { border: solid black 1px; margin: 10px; padding: 10px; }
 * .TOCEntry { font-family: sans-serif; }
 * .TOCEntry a { text-decoration: none; }
 * .TOCLevel1 { font-size: 16pt; font-weight: bold; }
 * .TOCLevel2 { font-size: 16pt; margin-left: .5in; }
 * 单位pt，全称是point，译作“磅”，是长度单位、专用印刷单位，大小为1/72英寸，是绝对长度
 * 单位px，全称是pixel，像素，是屏幕上的最小单位，用于网页设计
 * 单位em，即 %，在css中，1em = 100%，是一个比率，结合css继承关系使用
 * PPI（DPI），pixel（dot） per inch，每英寸的像素（点）数，是一个率，表示“清晰度”
 * .TOCSectNum:after { content: ": "; }
 * .TOCSectNum { display: none; }
 * 使用TOCSectNum隐藏段编号
 *
 * 这个模块需要onLoad()工具函数
 */

onLoad(function () {
    // 查找id为TOC的节点，若不存在，则创建
    var toc = document.getElementById('TOC');
    if(!toc) {
        toc = document.createElement('div');
        toc.id = 'TOC';
        document.body.insertBefore(toc, document.body.firstChild);
    }

    // 查找所有的标题元素
    var headings;
    if(document.querySelectorAll) {
        headings = document.querySelectorAll('h1,h2,h3,h4,h5,h6'); // 'h1,h2,h3,h4,h5,h6'在这里的写法是CSS选择器
    } else {
        headings = findHeadings(document.body, []);
    }

    // 递归遍历document的body，查找标题元素
    function findHeadings(root, sects) {
        for(var c = root.firstChild; c != null; c = c.nextSibling) {
            if(c.nodeType !== 1) continue; // nodeType属性值为9表示Document节点，1表示Element，3表示Text，8表示Comment，11表示DocumentFragment
            if(c.targetName.length === 2 && c.targetName.charAt(0) === 'H') {
                sects.push(c);
            } else {
                findHeadings(c, sects);
            }
        }
        return sects;
    }

    // 初始化一个数组来保持跟踪章节号
    var sectionNumbers = [0,0,0,0,0,0];
    // 遍历查找到的章节号
    for(var h = 0, len = headings.len; i < len; i++) {
        var heading = headings[h];

        // 跳过TOC容器中的标题元素
        if(heading.parentNode == toc) {
            continue;
        }

        // 判断标题的级别
        var level = parseInt(heading.targetName.charAt(1));
        if(isNaN(level) || level < 1 || level > 6) {
            continue;
        }

        // 生成章节号
        sectionNumbers[level - 1]++;
        for(var i = level; i < 6; i++) {
            sectionNumbers[i] = 0;
        }
        var sectionNumber = sectionNumbers.slice(0, level).join('.');

        // 为标题级别增加章节号
        var span = document.createElement('span');
        span.className = 'TOCSectNum';
        span.innerHTML = sectionNumber;
        heading.insertBefore(span, heading.firstChild);

        // 增加锚点到标题界别处
        var anchor = document.createElement('a');
        anchor.className = 'TOC' + sectionNumber;
        heading.parentNode.insertBefore(anchor, heading);
        anchor.appendChild(heading);

        // 创建到上述锚点的链接
        var link = document.createElement('a');
        link.href = '#TOC' + sectionNumber;
        link.innerHTML = heading.innerHTML;

        // 修饰链接的容器
        var entry = document.createElement('div');
        entry.className = 'TOCEntry TOCLevel' + level;
        entry.appendChild(link);

        // 将链接的容器添加到TOC容器中
        toc.appendChild(entry);
    }
});