/**
 * 值的任意集合，Set是一种数据结构，表示非重复的无序集合
 */

function Set() {
    this.values = {}; // 集合数据保存在对象的属性里
    this.n = 0; // 集合中值的个数
    this.add.apply(this, arguments); // 将构造函数的参数都添加到这个集合中
}

Set.prototype.add = function () {
    for (var i = 0, len = arguments.length; i < len; i++) {
        var val = arguments[i];
        var str = Set._v2s(val);
        if (!this.values.hasOwnProperty(str)) {
            this.values[str] = val;
            this.n++;
        }
    }
    return this;
};

Set.prototype.remove = function () {
    for (var i = 0, len = arguments.length; i < len; i++) {
        var str = Set._v2s(arguments[i]);
        if (this.values.hasOwnProperty(str)) {
            delete this.values[str];
            this.n--;
        }
    }

    return this;
};

Set.prototype.contains = function (value) {
    return this.values.hasOwnProperty(Set._v2s(value));
};

Set.prototype.size = function () {
    return this.n;
};

/**
 * 遍历集合所有元素，在指定上下文中调用f
 * @param f
 * @param context
 */
Set.prototype.foreach = function (f, context) {
    for (var s in this.values) {
        if (this.values.hasOwnProperty(s)) {
            f.call(context, this.values[s]);
        }
    }
};


Set._v2s = function (val) {
    switch (val) {
        case undefined:
            return 'u';
        case null:
            return 'n';
        case true:
            return 't';
        case false:
            return 'f';
        default :
            switch (typeof val) {
                case 'number':
                    return '#' + val;
                case 'string':
                    return '"' + val;
                default :
                    return '@' + objectId(val);
            }
    }

    function objectId(o) {
        var prop = "|**objectid**|"; // 私有属性，用以存放id
        if (!o.hasOwnProperty(prop)) {
            o[prop] = Set._v2s.next++;
        }
        return o[prop];
    }
};
Set._v2s.next = 100; // 设置初始id

/**
 * 在p222中给Set添加转换方法
 * 依赖例6.2中的extend函数
 */
extend(Set.prototype, {
    toString: function () {
        var s = '{',
            i = 0;
        this.foreach(function (v) {
            s += ((i++ > 0) ? ',' : '') + v;
        });
        return s + '}';
    },
    toLocaleString: function () {
        var s = '{',
            i = 0;
        this.foreach(function (v) {
            if (i++ > 0) s += ',';
            if (v == null) s += v;
            else s += v.toLocaleString();
        });
    },
    toArray: function () {
        var a = [];
        this.foreach(function (v) {
            a.push(v);
        });
        return a;
    }
});
Set.prototype.toJSON = Set.prototype.toArray;





