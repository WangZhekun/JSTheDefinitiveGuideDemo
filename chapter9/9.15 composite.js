/**
 * 使用组合代替继承的集合的实现
 */

/**
 * 实现一个FilteredSet，它包装某个指定的“集合”对象，并对传入add()方法的值应用了某种指定的过滤器
 * “范围”类中其他所有的核心方法延续到包装后的实例中
 */
var FilteredSet = Set.extend( // 使用例9.11中的Function.prototype.extend方法同样是继承了Set类吗？？？只继承了Set的toString、toJSON等方法，更好的实现方法见例9.16
    function FilteredSet(set, filter) {
        this.set = set;
        this.filter = filter;
    },
    {
        add: function() {
            if(this.filter) {
                for(var i = 0, len = arguments.length; i < len; i++) {
                    var v = arguments[i];
                    if(!this.filter(v)) {
                        throw new Error('FilteredSet: value ' + v + ' rejected by filter');
                    }
                }
            }

            this.set.add.apply(this.set, arguments);
            return this;
        },
        remove: function() {
            this.set.remove.apply(thi.set, arguments);
            return this;
        },
        contains: function(v) {
            return this.set.contains(v);
        },
        size: function() {
            return this.set.size();
        },
        foreach: function(f, c) {
            this.set.foreach(f, c);
        }
    }
);
