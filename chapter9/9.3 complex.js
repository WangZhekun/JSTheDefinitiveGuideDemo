/**
 * 表示复数的类
 */

/**
 * 这个构造函数为它所创建的每个实例定义了实例字段r和i
 * 这两个字段分别表示复数的实部和虚部
 * @param real
 * @param imaginary
 * @constructor
 */
function Complex(real, imaginary) {
    if(isNaN(real) || isNaN(imaginary)) {
        throw new TypeError();
    }

    this.r = real;
    this.i = imaginary;
}

Complex.prototype.add = function(that) {
    return new Complex(this.r + that.r, this.i + that.i);
};

Complex.prototype.mul = function(that) {
    return new Complex(this.r * that.r - this.i * that.i, this.r * that.i + this.i * that.r);
};

// 计算复数的模
Complex.prototype.mag = function() {
    return Math.sqrt(this.r * this.r + this.i * this.i);
};

// 求负
Complex.prototype.neg = function() {
    return new Complex(-this.r, -this.i);
};

Complex.prototype.toString = function() {
    return '{' + this.r + ',' + this.i + '}';
};

Complex.prototype.equals = function(that) {
    return that != null && that.constructor === Complex && this.r === that.r && this.i === that.i;
};

Complex.ZERO = new Complex(0, 0);
Complex.ONE = new Complex(1, 0);
Complex.I = new Complex(0, 1);

Complex.parse = function(s) {
    try{
        var m =Complex._format.exec(s);
        return new Complex(parseFloat(m[1]), parseFloat(m[2]));
    } catch(x) {
        throw new TypeError('Can\'t parse \'' + s + '\' as a complex number.');
    }
};

// 下划线前缀表示它是类内部使用的，不属于类的公有API的部分
Complex._format = /^\{([^,]+),([^}]+)\}$/;


