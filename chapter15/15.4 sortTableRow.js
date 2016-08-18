/**
 * 表格的行排序
 */

/**
 * 按列排序
 * 根据指定表格每行第n个单元格的值，对第一个<tbody>中的行进行排序（行的排序一句是该行的第n个单元格的值）
 * 如果存在comparator函数则使用它，否则按照字母表顺序比较
 * @param table
 * @param n
 * @param comparator
 */
function sortrows(table, n, comparator) {
    var tbody = table.tBodies[0]; // 第一个<tbody>，可能是隐式创建的
    var rows = tbody.getElementsByTagName('tr'); // tbody中的所有行
    rows = rows.slice(0); // 真实数组中的快照，但是该快照有什么用呢？？

    rows.sort(function(row1, row2) {
        var cell1 = row1.getElementsByClassName('td')[n];
        var cell2 = row2.getElementsByClassName('td')[n];
        var val1 = cell1.textContent || cell1.innerText; // 当cell1或cell2为undefined时怎么办
        var val2 = cell2.textContent || cell2.innerText;
        if(comparator) return comparator(val1, val2);
        if(val1 < val2) return -1;
        else if(val1 > val2) return 1;
        else return 0;
    });

    for(var i = 0, len = rows.length; i < len; i++) {
        tbody.appendChild(rows[i]); // tbody中自动将tr从以前的位置移动到最后，所以没必要删除原有的tr
    }
}

/**
 * 单击th时触发按列排序
 * @param table
 */
function makeSortable(table) {
    var headers = table.getElementsByTagName('th');
    for(var i = 0, len = headers.length; i < len; i++) {
        (function(n) { // 田涛函数来创建本地作用域，主要是当th的click事件发生时，i的值可能已经变了
           headers[i].onclick = function() {
               sortrows(table, n);
           }
        }(i))
    }
}
