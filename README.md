## Build your own DOM API
<p align="center">
  <a href="https://github.com/yingjieweb/dombox"><img src="https://img.shields.io/badge/js%20dombox-%E4%B8%AD%E6%96%87-yellow" alt="js dombox"></a>
  <a href="https://github.com/yingjieweb/dombox/tree/master/lang/english/jsdom"><img src="https://img.shields.io/badge/js%20dombox-English-yellow" alt="js dombox"></a>
  <a href="https://github.com/yingjieweb/dombox/tree/master/lang/chinese/jqdom"><img src="https://img.shields.io/badge/jQuery%20dombox-%E4%B8%AD%E6%96%87-blue" alt="jQuery dombox"></a>
  <a href="https://github.com/yingjieweb/dombox/tree/master/lang/english/jqdom"><img src="https://img.shields.io/badge/jQuery%20dombox-English-blue" alt="jQuery dombox"></a>
</p>

------

&nbsp;&nbsp; dombox 是一个高效、精简、功能丰富的 JavaScript 工具库。它提供的 API 易于使用，这让诸如 HTML 文档遍历和操作、事件处
理操作更加简单。可以下载 dombox.zip 解压后将 jsdom.js 文件以 `<script src='./jsdom.js'></script>` 的方式引入项目中。

&nbsp;&nbsp; 根据上述步骤将 jsdom 引入项目中后，可以通过 dom.API 的方式对 dombox 库中封装好的方法进行调用，具体的 API 详细介绍
如下，相信你在使用的过程中一定会觉得本库比 JavaScript 的原生 API 高效的多。具体使用可参考如下文档：

**1. create(node)** - 创建新的 dom 节点或元素

&nbsp;&nbsp; create(node) 接收一个可包裹文本节点的 html 标签字符串，如：`let div = dom.create('<div>div</div>');` 可以创建一个 div 节点。
```JavaScript
let div = dom.create('<div>div</div>');
let span = dom.create('<span>span</span>');
let text = dom.create('<text>text</text>');
console.log(div, span, text);  //<div>div</div> <span>span</span> <text>text</text>
```
**2. before(node1, node2)** - 在匹配元素的前面插入新的节点，使二者成为兄弟节点

&nbsp;&nbsp; before(node1, node2) 接收两个参数，node1表示要插入的节点位置，node2表示要插入的节点本身，前插入。
```JavaScript
let span = dom.create('<span>span</span>');
let div = dom.create('<div>div</div>');
dom.before(span, div);
console.log(span.parentNode);  //<div>div</div> <span>span</span>
```
**3. after(node1, node2)** - 在匹配元素的后面插入新的节点，使二者成为兄弟节点

&nbsp;&nbsp; after(node1, node2) 接收两个参数，node1表示要插入的节点位置，node2表示要插入的节点本身，后插入。
```JavaScript
let span = dom.create('<span>span</span>');
let text = dom.create('<text>text</text>');
dom.after(span, text);
console.log(span.parentNode);  //<span>span</span> <text>text</text>
```
**4. append(parentNode, node)** - 在匹配的parentNode元素里面的末尾处插入 node 节点

&nbsp;&nbsp; append(parentNode, node) 接收两个参数，其中parentNode为要被插入节点的位置，node为要被插入的新节点。
```JavaScript
let span = dom.create('<span>span</span>');
let text = dom.create('<text>text</text>');
dom.append(span, text);
console.log(span); //<span>span<text>text</text></span>
```
**5. wrap(node, parentNode)** - node节点直接从原来的位置跳到parent节点中

&nbsp;&nbsp; wrap(node, parentNode) 接收两个参数，其中node为任意dom节点，parentNode为要被插入节点的位置。
```JavaScript
let span = dom.create('<span>span</span>');
let div = dom.create('<div>div</div>');
dom.wrap(span, div);
console.log(div);  //<div>div<span>span</span></div>
```
**6. remove(node)** - 将node元素从其父节点中移除

&nbsp;&nbsp; remove(node) 参数node为要从dom树种移除的节点，该方法会将移除的node节点作为返回值。
```JavaScript
let span = dom.create('<span>span</span>');
let text = dom.create('<text>text</text>');
dom.append(span, text);
console.log(span);  //<span>span<text>text</text></span>
let temp = dom.remove(text);
console.log(temp);  //<text>text</text>
console.log(span);  //<span>span</span>
```
**7. empty(node)** - 将node元素内的所有子元素清除

&nbsp;&nbsp; empty(node) 参数node为要被清空内容的元素节点，该方法会将node节点中被移除的子元素以数组的形式返回。
```JavaScript
let div = dom.create('<div><span>span</span><text>text</text></div>');
console.log(div); //<div><span>span</span><text>text</text></div>
let temp = dom.empty(div);
console.log(div); //<div></div>
console.log(temp); //[span, text]
```
**8. attr(node, name, value)** - 读写node节点的属性

&nbsp;&nbsp; attr(node, name, value) 接收三个参数时会将node节点的name属性设置为value，接收两个参数时会读取node节点的name属性，并返回。
```JavaScript
let div = dom.create('<div>div</div>');
dom.attr(div, 'id', 'web'); //设置div的id属性为web
console.log(dom.attr(div, 'id')); //读取div的id属性：web
```
**9. text(node, string)** - 读写node节点的文本内容

&nbsp;&nbsp; text(node, string) 接收两个参数时会将node节点文本内容设置为string，接收一个参数时会读取node节点的文本内容，并返回。
```JavaScript
let div = dom.create('<div>div</div>');
console.log(dom.text(div)); //div
dom.text(div, 'this is a div');
console.log(dom.text(div)); //this is a div
```
**10. html(node, string)** - 读写node节点的HTML内容

&nbsp;&nbsp; html(node, string) 接收两个参数时会将node节点的HTML结构设置为string，接收一个参数时会读取node节点的HTML结构，并返回。
```JavaScript
let div = dom.create('<div>div</div>');
console.log(dom.html(div));  //div
dom.html(div, '<span id="span">span</span>');
console.log(div); //<div><span id="newSpan"></span></div>
```
**11. style(node, name, value)** - 读写node节点的style属性

&nbsp;&nbsp; style(node, name, value) 接收三个参数时，node为要被设置style属性的节点，name表示将要为node节点设置的style属性，value为相应的style属性的属性值。

&nbsp;&nbsp; style(node, name, value) 接收两个参数时，根据name参数的类型分为两种情况，如果name参数为 `border` 或 `color` 这样的字
符串形式，则style方法会读取node节点的name属性值，并返回；如果name参数的类型为`border:{1px solid red}`这样的形式，则style方法会将node节点的border属性设置为 `1px solid red`。
```JavaScript
let div = dom.create('<div>div</div>');
dom.style(div, 'border', '1px solid red');
console.log(div); //<div style="border:1px solid red;">div</div>
console.log(dom.style(div, 'border'));  //1px solid red
dom.style(div, {border: '1px solid green'});
console.log(div); //<div style="border:1px solid green;">div</span></div>
```
**12. class.add(node, string)、class.remove(node, string)、class.has(string)** - 给node节点新增/移除/判断是否含有class属性

- class.add(node, string)  表示给node节点新增一个值为string的class属性。
- class.remove(node, string)  表示将node节点的值为string的class属性移除。
- class.add(node, string)  判断node节点是否含有值为string的class属性，有则返回true，否则返回false。
```JavaScript
let div = dom.create('<div>div</div>');
dom.class.add(div, 'header');
console.log(div); //<div class="header">div</div>
console.log(dom.class.has(div, 'header'));  //true
dom.class.remove(div, 'header');
console.log(div); //<div class>div</div>
```
**13. on(node, eventName, callback)、off(node, eventName, callback)** - 给node添加/移除事件监听函数

- on(node, eventName, callback) 表示给node节点添加eventName的事件，回调函数为callback。
- off(node, eventName, callback) 表示将node节点的eventName事件回调函数callback移除。
```JavaScript
let div = dom.create('<div>div</div>');
dom.append(window.body, div);
function fun() { console.log(0.0) };  //定义callback
dom.on(div, 'click', fun);  //给div节点新增点击事件
dom.off(div, 'click', fun); //将div节点的点击事件移除
```
**14. find(selector, scope)** - 获取标签或标签的集合，支持在指定范围内查找

&nbsp;&nbsp; find(selector, scope) 接收两个参数时，在scope范围内查找selector。接收一个参数时，在全局document范围内查找selector。
```JavaScript
<div id="scope">
    <div id="first">first</div>
</div>
let scope = dom.find('#scope'); //内部调用querySelectorAll()，返回元素或元素集合
let first_scope = dom.find('#first', scope[0]);  //在指定范围scope[0]内查找
console.log(first_scope[0]);  //<div id="first">first</div>
```
**15. parent(node)** - 获取node节点的父元素

&nbsp;&nbsp; find(selector, scope) 接收两个参数时，在scope范围内查找selector。接收一个参数时，在全局document范围内查找selector。
```JavaScript
<div id="scope">
    <div id="first">first</div>
</div>
let parent = dom.parent(dom.find('#first')[0]);
console.log(parent);  //<div id="scope">...</div>
```
**16. children(node)** - 获取node节点的所有子元素

&nbsp;&nbsp; children(node) 获取node节点的所有子元素，并将所有子元素以伪数组的形式返回。
```JavaScript
<div id="scope">
    <div id="first">first</div>
    <div id="second">second</div>
</div>
let children = dom.children(dom.find('#scope')[0]);
console.log(children);  //[div#first, div#second]
```
**17. siblings(node)** - 获取node节点的所有兄弟节点

&nbsp;&nbsp; siblings(node) 获取node节点的所有兄弟节点，并将所有兄弟节点以数组的形式返回。
```JavaScript
<div id="scope">
    <div id="first">first</div>
    <div id="second">second</div>
    <div id="third">third</div>
</div>
let children = dom.children(dom.find('#scope')[0]);
console.log(children);  //[div#second, div#third]
```
**18. next(node)** - 获取node节点的后一个兄弟节点

&nbsp;&nbsp; next(node) 获取node节点的后一个兄弟节点，并将其作为返回值，如果node节点后不存在其他节点，则返回null。
```JavaScript
<div id="first">first</div>
<div id="second">second</div>
let next = dom.next(dom.find('#first')[0]);
console.log(next);  //<div id="second">second</div>
```
**19. previous(node)** - 获取node节点的前一个兄弟节点

&nbsp;&nbsp; previous(node) 获取node节点的前一个兄弟节点，并将其作为返回值，如果node节点前不存在其他节点，则返回null。
```JavaScript
<div id="first">first</div>
<div id="second">second</div>
let previous = dom.previous(dom.find('#second')[0]);
console.log(previous);  //<div id="first">first</div>
```
**20. each(nodeList, callback)** - 遍历nodeList内的所有节点，并给每个节点添加回调函数

&nbsp;&nbsp; each(nodeList, callback) 遍历nodeList内的所有节点，并给每个节点添加一个回调函数，回调函数内可以设置相应的操作。
```JavaScript
<div id="scope">
    <div id="first">first</div>
    <div id="second">second</div>
    <div id="third">third</div>
</div>
let nodeList = dom.children(dom.find('#scope')[0])
dom.each(nodeList, (item) => {
  item.style.color = 'red';
});
```
**21. index(node)** - 获取node节点在其兄弟节点中的排序位次

&nbsp;&nbsp; index(node) 返回node节点在其兄弟节点中的排序位置，并将所在位置的数字作为返回值。
```JavaScript
<div id="scope">
    <div id="first">first</div>
    <div id="second">second</div>
</div>
let first = dom.find('#first')[0];
console.log(dom.index(first));  //0
```

&nbsp;&nbsp; **最后**：[这是源码链接](https://github.com/yingjieweb/dombox/blob/master/src/JSDom/jsdom.js) ，该插件如有改进会
第一时间发布到这里，如果大家有发现错误或有性能优化的好点子可直接在相应文档进行编辑修改。欢迎提交对本仓库的改进建议~