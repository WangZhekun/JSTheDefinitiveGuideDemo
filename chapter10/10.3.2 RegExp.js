/**
 * RegExp对象的exec方法
 */

var str = '123abc456efg789';
var reg = /(\d+)/g;
console.log(reg.exec(str)); // Array对象，{0: '123', 1: '123', index: 0, input: '123abc456efg789', length: 2}
// 第一个'123'是正则表达是匹配的字符串，第二个'123'是正则表达式的“()”中的子表达式匹配的结果
// index表示字符串中匹配的子串的起始索引
console.log(reg.lastIndex); // 3
console.log(reg.exec(str)); // Array对象，{0: '456', 1: '456', index: 6, input: '123abc456efg789', length: 2}
console.log(reg.lastIndex);
console.log(reg.exec(str));
console.log(reg.lastIndex);
console.log(reg.exec(str));
console.log(reg.lastIndex);
