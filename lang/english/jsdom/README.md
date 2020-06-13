## Build your own DOM API
<p align="center">
  <a href="https://github.com/yingjieweb/dombox"><img src="https://img.shields.io/badge/js%20dombox-%E4%B8%AD%E6%96%87-yellow" alt="js dombox"></a>
  <a href="https://github.com/yingjieweb/dombox/tree/master/lang/english/jsdom"><img src="https://img.shields.io/badge/js%20dombox-%E8%8B%B1%E6%96%87-yellow" alt="js dombox"></a>
  <a href="https://github.com/yingjieweb/dombox/tree/master/lang/chinese/jqdom"><img src="https://img.shields.io/badge/jQuery%20dombox-%E4%B8%AD%E6%96%87-blue" alt="jQuery dombox"></a>
  <a href="https://github.com/yingjieweb/dombox/tree/master/lang/english/jqdom"><img src="https://img.shields.io/badge/jQuery%20dombox-%E8%8B%B1%E6%96%87-blue" alt="jQuery dombox"></a>
</p>

------

&nbsp;&nbsp; dombox is an efficient, streamlined, and feature-rich library of JavaScript tools. The API it provides is easy to use, 
making things like HTML document traversal and manipulation, and event manipulation easier. You can download dombox.zip and unzip 
it to introduce jsdom.js files into the project in the form of `<script src='./jsdom.js'></script>`.

&nbsp;&nbsp; After introducing jsdom into the project according to the above steps, you can call the encapsulated methods in the dombox 
library by means of dom.API. The specific API is described below in detail.Refer to the following documentation for use:

**1. create(node)** - Create a new dom node or element

&nbsp;&nbsp; create(node) Receive an HTML tag string that wraps a text node, such as `let div = dom.create('div');` can create a div node.
```JavaScript
let div = dom.create('<div>div</div>');
let span = dom.create('<span>span</span>');
let text = dom.create('<text>text</text>');
console.log(div, span, text);  //<div>div</div> <span>span</span> <text>text</text>
```
**2. before(node1, node2)** - Insert a new node in front of the matching element to make them siblings

&nbsp;&nbsp; before(node1, node2) Receive two parameters, node1 for the location of the node to be inserted and node2 for the node itself to be inserted.
```JavaScript
let span = dom.create('<span>span</span>');
let div = dom.create('<div>div</div>');
dom.before(span, div);
console.log(span.parentNode);  //<div>div</div> <span>span</span>
```
**3. after(node1, node2)** - Insert a new node after the matched element to make them siblings

&nbsp;&nbsp; after(node1, node2) Receive two parameters, node1 for the location of the node to be inserted, node2 for the node itself to be inserted, and then insert.
```JavaScript
let span = dom.create('<span>span</span>');
let text = dom.create('<text>text</text>');
dom.after(span, text);
console.log(span.parentNode);  //<span>span</span> <text>text</text>
```
**4. append(parentNode, node)** - Insert the node at the end of the matched parentNode element

&nbsp;&nbsp; append(parentNode, node) Receives two parameters, where parentNode is the location of the node to be inserted and node is the new node to be inserted.
```JavaScript
let span = dom.create('<span>span</span>');
let text = dom.create('<text>text</text>');
dom.append(span, text);
console.log(span); //<span>span<text>text</text></span>
```
**5. wrap(node, parentNode)** - The node jumps directly from its original location into the parent node

&nbsp;&nbsp; wrap(node, parentNode) Receives two parameters, of which node is any dom node and parentNode is the location of the node to be inserted.
```JavaScript
let span = dom.create('<span>span</span>');
let div = dom.create('<div>div</div>');
dom.wrap(span, div);
console.log(div);  //<div>div<span>span</span></div>
```
**6. remove(node)** - Removes the node element from its parent node

&nbsp;&nbsp; remove(node) The parameter node is the node to be removed from the dom tree, and the method takes the removed node as the return value.
```JavaScript
let span = dom.create('<span>span</span>');
let text = dom.create('<text>text</text>');
dom.append(span, text);
console.log(span);  //<span>span<text>text</text></span>
let temp = dom.remove(text);
console.log(temp);  //<text>text</text>
console.log(span);  //<span>span</span>
```
**7. empty(node)** - Clears all child elements within the node element

&nbsp;&nbsp; empty(node) The parameter node is the element node whose content is to be cleared, and the method returns the removed 
child elements from the node as an array.
```JavaScript
let div = dom.create('<div><span>span</span><text>text</text></div>');
console.log(div); //<div><span>span</span><text>text</text></div>
let temp = dom.empty(div);
console.log(div); //<div></div>
console.log(temp); //[span, text]
```
**8. attr(node, name, value)** - Read and write the properties of the node

&nbsp;&nbsp; attr(node, name, value) When three parameters are received, the name property of the node is set to value; when two 
parameters are received, the name property of the node is read and returned.
```JavaScript
let div = dom.create('<div>div</div>');
dom.attr(div, 'id', 'web'); //Set the id property of div to web
console.log(dom.attr(div, 'id')); //Read the id property of div: web
```
**9. text(node, string)** - Read and write the text content of the node

&nbsp;&nbsp; text(node, string) When receiving two parameters, the text content of the node will be set to string, and when receiving one 
parameter, the text content of the node will be read and returned.
```JavaScript
let div = dom.create('<div>div</div>');
console.log(dom.text(div)); //div
dom.text(div, 'this is a div');
console.log(dom.text(div)); //this is a div
```
**10. html(node, string)** - Read and write the HTML content of the node

&nbsp;&nbsp; html(node, string) When receiving two parameters, the HTML structure of the node will be set to string, and when receiving 
one parameter, the HTML structure of the node will be read and returned.
```JavaScript
let div = dom.create('<div>div</div>');
console.log(dom.html(div));  //div
dom.html(div, '<span id="span">span</span>');
console.log(div); //<div><span id="newSpan"></span></div>
```
**11. style(node, name, value)** - Read and write the style property of the node

&nbsp;&nbsp; style(node, name, value) When receiving three parameters, node is the node to be set with the style property, name is the style 
property to be set for the node, and value is the property value of the corresponding style property.

&nbsp;&nbsp; style(node, name, value) When receiving two parameters, there are two cases according to the type of the name parameter. 
If the name parameter is in the form of a string like `border` or `color`, the style method will read the value of the name attribute 
of the node and return it. If the name parameter is of type 'border:{1px solid red}', the style method sets the border property of the node to `1px solid red`.
```JavaScript
let div = dom.create('<div>div</div>');
dom.style(div, 'border', '1px solid red');
console.log(div); //<div style="border:1px solid red;">div</div>
console.log(dom.style(div, 'border'));  //1px solid red
dom.style(div, {border: '1px solid green'});
console.log(div); //<div style="border:1px solid green;">div</span></div>
```
**12. class.add(node, string)、class.remove(node, string)、class.has(string)** - Add/remove/determine the class attribute to the node

- class.add(node, string)  Represents adding a class attribute with a value of string to the node.
- class.remove(node, string)  Means to remove the class property of the node whose value is string.
- class.add(node, string)  To determine whether the node has a class attribute with a value of string, return true or false.
```JavaScript
let div = dom.create('<div>div</div>');
dom.class.add(div, 'header');
console.log(div); //<div class="header">div</div>
console.log(dom.class.has(div, 'header'));  //true
dom.class.remove(div, 'header');
console.log(div); //<div class>div</div>
```
**13. on(node, eventName, callback)、off(node, eventName, callback)** - Add/remove event listener functions to node

- on(node, eventName, callback) Represents the event that adds eventName to the node, and the callback function is callback.
- off(node, eventName, callback) Represents the removal of the eventName event callback function callback for the node.
```JavaScript
let div = dom.create('<div>div</div>');
dom.append(window.body, div);
function fun() { console.log(0.0) };  //Define the callback
dom.on(div, 'click', fun);  //Add a click event to the div node
dom.off(div, 'click', fun); //Removes the click event from the div node
```
**14. find(selector, scope)** - Gets a tag or a collection of tags that support lookups within a specified range

&nbsp;&nbsp; find(selector, scope) When two arguments are received, look for the selector within the scope scope. When you receive a 
parameter, look for a selector within the global document scope.
```JavaScript
<div id="scope">
    <div id="first">first</div>
</div>
let scope = dom.find('#scope'); //Internally, querySelectorAll() is called to return an element or a collection of elements
let first_scope = dom.find('#first', scope[0]);  //Lookup within the specified scope[0]
console.log(first_scope[0]);  //<div id="first">first</div>
```
**15. parent(node)** - Gets the parent element of the node

&nbsp;&nbsp; find(selector, scope) When two arguments are received, look for the selector within the scope scope. When you receive a 
parameter, look for a selector within the global document scope.
```JavaScript
<div id="scope">
    <div id="first">first</div>
</div>
let parent = dom.parent(dom.find('#first')[0]);
console.log(parent);  //<div id="scope">...</div>
```
**16. children(node)** - Gets all the child elements of the node

&nbsp;&nbsp; children(node) Gets all the child elements of the node and returns them as a pseudo-array.
```JavaScript
<div id="scope">
    <div id="first">first</div>
    <div id="second">second</div>
</div>
let children = dom.children(dom.find('#scope')[0]);
console.log(children);  //[div#first, div#second]
```
**17. siblings(node)** - Gets all siblings of the node

&nbsp;&nbsp; siblings(node) Gets all the siblings of the node and returns them as an array.
```JavaScript
<div id="scope">
    <div id="first">first</div>
    <div id="second">second</div>
    <div id="third">third</div>
</div>
let children = dom.children(dom.find('#scope')[0]);
console.log(children);  //[div#second, div#third]
```
**18. next(node)** - Gets the next sibling of the node

&nbsp;&nbsp; next(node) Gets the next sibling of the node and uses it as the return value, or null if no other node exists after the node.
```JavaScript
<div id="first">first</div>
<div id="second">second</div>
let next = dom.next(dom.find('#first')[0]);
console.log(next);  //<div id="second">second</div>
```
**19. previous(node)** - Gets the previous sibling of the node

&nbsp;&nbsp; previous(node) Gets the previous sibling of the node and uses it as the return value, or null if no other node exists before the node.
```JavaScript
<div id="first">first</div>
<div id="second">second</div>
let previous = dom.previous(dom.find('#second')[0]);
console.log(previous);  //<div id="first">first</div>
```
**20. each(nodeList, callback)** - Walk through all the nodes in nodeList and add callback functions to each node

&nbsp;&nbsp; each(nodeList, callback) Walk through all the nodes in nodeList and add a callback function to each node, where you can set the corresponding operation.
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
**21. index(node)** - Gets the ordering position of the node in its sibling nodes

&nbsp;&nbsp; index(node) Returns the sorted position of the node in its sibling nodes, with the number in that position as the return value.
```JavaScript
<div id="scope">
    <div id="first">first</div>
    <div id="second">second</div>
</div>
let first = dom.find('#first')[0];
console.log(dom.index(first));  //0
```

&nbsp;&nbsp; **Finally**：[Source link](https://github.com/yingjieweb/dombox/blob/master/src/JSDom/jsdom.js) ,
Improvements to the plugin will be posted here as soon as possible, and if you find bugs or have good ideas for performance optimization, 
you can edit and modify the plugin directly in the corresponding document. Suggestions for improvement of the warehouse are welcome ~