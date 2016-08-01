/**
 * 抽象类和非抽象Set类的层次结构
 */

/**
 * 这个函数可以用作任意抽象方法
 */
function abstractmethod() {
    throw new Error('abstract method');
}

/**
 * 抽象类AbstractSet的构造方法
 * @constructor
 */
function AbstractSet() {
    throw new Error('Can\'t instantiate abstract classes');
}
/**
 * 抽象方法
 * @type {abstractmethod}
 */
AbstractSet.prototype.contains = abstractmethod;

/**
 * NotSet是AbstractSet的一个非抽象子类
 * 所有不再其他集合中的成员都在这个集合中
 * 因为它是在其他集合是不可写的条件下定义的
 * 同时由于它的成员是无限个，因此它是不可枚举的
 * 我们只能用它来检测元素成员的归属情况
 * 注意，我们使用了Function.prototype.extend()方法来定义这个子类
 */
var NotSet = AbstractSet.extend(
    function NotSet(set) {
        this.set = set
    },
    {
        contains: function (x) {
            return !this.set.contains(x);
        },
        toString: function () {
            return '~' + this.set.toString();
        },
        equals: function (that) {
            return that instanceof NotSet && this.set.equals(that.set);
        }
    }
);

/**
 * AbstractEnumerableSet是AbstractSet的一个抽象子类
 * 它定义了抽象方法size()和foreach()
 * 然后实现了非抽象方法isEmpty()、toArray()、to[Local]String()和equals方法
 * 子类需要实现了contains()、size()和foreach()，这三个方法可以很轻易地调用这5个非抽象方法
 */
var AbstractEnumerableSet = AbstractSet.extend(
    function () {
        throw new Error('Can\'t instantiate abstract classes');
    }, {
        size: abstractmethod,
        foreach: abstractmethod,
        isEmpty: function () {
            return this.size() == 0
        },
        toString: function () {
            var s = '{', i = 0;
            this.foreach(function (v) {
                if (i++ > 0) s += ',';
                s += v;
            });
            return s + '}';
        },
        toLocalString: function () {
            var s = '{', i = 0;
            this.foreach(function (v) {
                if (i++ > 0) s += ',';
                if (v == null) s += v;
                else s += v.toLocaleString();
            });
            return s + '}';
        },
        toArray: function () {
            var a = [];
            this.foreach(function (v) {
                a.push(v);
            });
            return a;
        },
        equals: function (that) {
            if (!(that instanceof AbstractEnumerableSet)) return false;
            if (this.size() != that.size()) return false;
            try {
                this.foreach(function (v) {
                    if (!that.contains(v)) throw false;
                });
                return true;
            } catch (e) {
                if (e === false) return false;
                throw e;
            }
        }
    }
);

/**
 * SingletonSet是AbstractEnumerableSet的非抽象子类
 * singleton集合是只读的，它只包含一个成员
 */
var SingletonSet = AbstractEnumerableSet.extend(
    function SingletonSet(member) {
        this.member = member;
    },
    {
        contains: function (x) {
            return x === this.member;
        },
        size: function () {
            return 1;
        },
        foreach: function (f, ctx) {
            f.call(ctx, this.member);
        }

    }
);

/**
 * AbstractWritableSet是AbstractEnumerableSet的抽象子类
 * 它定义了抽象方法add()和remove()
 * 然后实现了非抽象方法union()、intersection()、difference()
 */
var AbstractWritableSet = AbstractEnumerableSet.extend(
    function () {
        throw new Error('Can\'t instantiate abstract classes');
    },
    {
        add: abstractmethod,
        remove: abstractmethod,
        union: function (that) { // 并集
            var self = this;
            that.foreach(function (v) {
                self.add(v);
            });
            return self;
        },
        instersection: function (that) { // 和集
            var self = this;
            self.foreach(function (v) {
                if (!that.contains(v)) {
                    self.remove(v);
                }
            });
            return self;
        },
        difference: function (that) { // 差集
            var self = this;
            that.foreach(function (v) {
                self.remove(v);
            });
            return self;
        }
    }
);

/**
 * ArraySet是AbstractWritableSet的非抽象子类
 * 它以数组的形式表示集合中的元素
 * 对于它的contains()方法使用了数组的线性查找
 * 因为contains()方法的算法复杂度是O(n)而不是O(1)
 * 它非常适用于相对小型的集合，注意，这里的实现用到了ES5的数组方法indexOf()和forEach()
 */
var ArraySet = AbstractWritableSet.extend(
    function ArraySet() {
        this.values = [];
        this.add.apply(this, arguments);
    },
    {
        contains: function (v) {
            return this.values.indexOf(v) != -1;
        },
        size: function () {
            return this.values.length;
        },
        foreach: function (f, c) {
            this.values.forEach(f, c);
        },
        add: function () {
            for (var i = 0, len = arguments.length; i < len; i++) {
                var arg = arguments[i];
                if (!this.contains(arg)) this.values.push(arg);
            }
            return this;
        },
        remove: function () {
            for(var i = 0, len = arguments; i < len; i++) {
                var arg = arguments[i];
                var p = this.values.indexOf(arg);
                if(p >= 0) this.values.splice(p, 1);
            }
            return this;
        }
    }
);

