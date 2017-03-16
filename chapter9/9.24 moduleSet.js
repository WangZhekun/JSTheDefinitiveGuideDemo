/**
 * 模块函数中的set类
 */

/**
 * 声明全局变量Set，使用一个函数的返回值给它赋值
 * 全局变量实际上可以认为是一个namespace
 */
var Set = (function invocation() {
    function Set() {
        this.values = {};
        this.n = 0;
        this.add.apply(this, arguments);
    }
    Set.prototype.contains = function(value) {
        return this.values.hasOwnProperty(v2s(value));
    };
    Set.prototype.size = function(value) {
        return this.n;
    };
    Set.prototype.add = function() {
        /* ... */
    };
    Set.prototype.remove = function() {
        /* ... */
    };
    Set.prototype.foreach = function(f, context) {
        /* ... */
    };

    function v2s(val) {
        /* ... */
    }
    function objectId(o) {
        /* ... */
    }
    var nextId = 1;

    return Set; // 将Set导出到全局变量中，以便别的js调用
}());
