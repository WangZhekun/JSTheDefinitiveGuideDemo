/**
 * 一个生成器管道
 * 任何使用关键字yieId的函数（哪怕yieId语句在代码中是不可达的）都称为生成器函数（generator function）
 * yieId作用类似于return，区别在于yieId可以在返回一个值的同时保存函数内部的状态，在下次调用该函数时恢复。
 * 对生成器函数的调用，不是执行一个函数体，而是返回一个生成器对象。
 * 生成器是一个对象，可以表示生成器函数的当前状态。
 * 生成器对象定义了一个next()方法，该方法可回复生成器函数的执行，直到遇到下一个yieId，yieId语句的返回值就是next()的返回值。
 * 如果生成器执行return语句或达到函数末尾终止，那么next()将抛出StopIteration。
 * 只要一个对象包含可抛出StopIteration的next()方法，它就是一个迭代器对象。迭代器对象可通过for/in遍历。
 * 如果next()不能抛出StopIteration，那么无法用for/in遍历，只能显示调用next()方法，在不使用生成器时，显示调用close()方法，结束生成器。
 * 如果当执行生成器的close()方法时，生成器的状态在try语句块中，那么先执行finally从句，再执行close()。如果finally抛出异常，那么异常将传播到close()方法。
 * 生成器经常被用来处理序列化的数据，比如元素排序、多行文本、词法分析器中的单词等。
 * 生成器就像Unix中的管道那样链接使用。这种用法的生成器是“懒惰的”，只有在需要的时候才从生成器管道中取值，而非一次都算出来。
 *
 * 本示例在firefox中可以执行，且在引用js时需要显示指定“type="application/javascript; version=1.7"”js版本
`*/

/**
 * 一个生成器，每次产生一个字符串s
 * 这里没有使用s.split()，因为这样会每次都处理整个字符串，并分配一个数组
 */
function eachline(s) {
    let p = 0;
    while((p = s.indexOf('\n')) != -1) {
        yield s.substring(0, p);
        s = s.substring(p+1);
    }
    if(s.length > 0) yield s;
}

/**
 * 一个生成器函数，对于每个可迭代的i的每个元素都执行f(x)
 */
function map(i, f) {
    for(let x in i) {
        yield f(x);
    }
}

/**
 * 一个生成器函数，针对每个结果为true的f(x)，为i生成一个元素
 */
function select(i, f) {
    for(let x in i) {
        if(f(x)) yield x;
    }
}

// 准备处理的字符串
let text = ' #document \n \n hello \nworld\n quit \n unreached \n';


// 创建一个生成器管道处理字符串
// 首先将文本分隔成行
let lines = eachline(text);

// 然后去掉行首和行尾的空格
let trimmed = map(lines, function(line) {
    return line.trim();
});

// 忽略空行和注释
let nonblank = select(trimmed, function(line) {
    return line.length > 0 && line[0] != '#';
});

// 从管道中取值，并处理
// 当遇到quit时，停止
for(var line in nonblank) {
    if(line === 'quit') break;
    console.log(line);
}
