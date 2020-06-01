## Build your own dom API
<p align="center">
  <a href="https://github.com/yingjieweb/dombox"><img src="https://img.shields.io/badge/js%20dombox-%E4%B8%AD%E6%96%87-yellow" alt="js dombox"></a>
  <a href="https://github.com/yingjieweb/dombox/tree/master/lang/english/jsdom"><img src="https://img.shields.io/badge/js%20dombox-%E8%8B%B1%E6%96%87-yellow" alt="js dombox"></a>
  <a href="https://github.com/yingjieweb/dombox/tree/master/lang/chinese/jqdom"><img src="https://img.shields.io/badge/jQuery%20dombox-%E4%B8%AD%E6%96%87-blue" alt="jQuery dombox"></a>
  <a href="https://github.com/yingjieweb/dombox/tree/master/lang/english/jqdom"><img src="https://img.shields.io/badge/jQuery%20dombox-%E8%8B%B1%E6%96%87-blue" alt="jQuery dombox"></a>
</p>

------

&nbsp;&nbsp; dombox 是一个高效、精简并且功能丰富的JavaScript工具库。它提供的API易于使用，这让诸如HTML文档遍历和操作、事件处
理操作更加简单。可以下载 dombox.zip 解压后将 jsdom.js 文件以 `<script src='./jsdom.js'></script>` 的方式引入项目中。

&nbsp;&nbsp; 根据上述步骤将 jsdom 引入项目中后，可以通过 dom.API 的方式对 dombox 库中封装好的方法进行调用，具体的 API 详细介绍
如下，相信你在使用的过程中一定会觉得本库比 JavaScript 的原生 API 高效的多。

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