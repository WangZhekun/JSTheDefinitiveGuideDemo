/**
 * 通过ID查找多个元素
 */

function getElements() {
    var eles = {};
    for(var i = 0, len = arguments.length; i < len; i++) {
        var ele = document.getElementById(arguments[i]);
        if(ele) {
            eles[arguments[i]] = ele;
        }
    }
    return eles;
}
