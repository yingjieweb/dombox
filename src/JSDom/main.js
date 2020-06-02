//1. create
// let div = dom.create('<div>div</div>');
// let span = dom.create('<span>span</span>');
// let text = dom.create('<text>text</text>');
// console.log(div, span, text);  //<div>div</div> <span>span</span> <text>text</text>

//2. before
// let span = dom.create('<span>span</span>');
// let div = dom.create('<div>div</div>');
// dom.before(span, div);
// console.log(span.parentNode);  //<div>div</div> <span>span</span>

//3. after
// let span = dom.create('<span>span</span>');
// let text = dom.create('<text>text</text>');
// dom.after(span, text);
// console.log(span.parentNode);  //<span>span</span> <text>text</text>

//4. append
// let span = dom.create('<span>span</span>');
// let text = dom.create('<text>text</text>');
// dom.append(span, text);
// console.log(span); //<span>span<text>text</text></span>

//5. wrap
// let span = dom.create('<span>span</span>');
// let div = dom.create('<div>div</div>');
// dom.wrap(span, div);
// console.log(div);  //<div>div<span>span</span></div>

//6. remove
// let span = dom.create('<span>span</span>');
// let text = dom.create('<text>text</text>');
// dom.append(span, text);
// console.log(span);  //<span>span<text>text</text></span>
// let temp = dom.remove(text);
// console.log(temp);  //<text>text</text>
// console.log(span);  //<span>span</span>

//7. empty
// let div = dom.create('<div><span>span</span><text>text</text></div>');
// console.log(div); //<div><span>span</span><text>text</text></div>
// let temp = dom.empty(div);
// console.log(div); //<div></div>
// console.log(temp) //[span, text]

//8. attr
// let div = dom.create('<div>div</div>');
// dom.attr(div, 'id', 'web');
// console.log(dom.attr(div, 'id')); //web

//9. text
// let div = dom.create('<div>div</div>');
// console.log(dom.text(div)); //div
// dom.text(div, 'this is a div');
// console.log(dom.text(div)); //this is a div

//10. html
// let div = dom.create('<div>div</div>');
// console.log(dom.html(div));  //div
// dom.html(div, '<span id="span">span</span>');
// console.log(div); //<div><span id="newSpan"></span></div>

//11. style
// let div = dom.create('<div>div</div>');
// dom.style(div, 'border', '1px solid red');
// console.log(div); //<div style="border:1px solid red;">div</div>
// console.log(dom.style(div, 'border'));  //1px solid red
// dom.style(div, {border: '1px solid green'});
// console.log(div); //<div style="border:1px solid green;">div</span></div>

//12. class
// let div = dom.create('<div>div</div>');
// dom.class.add(div, 'header');
// console.log(div); //<div class="header">div</div>
// console.log(dom.class.has(div, 'header'));  //true
// dom.class.remove(div, 'header');
// console.log(div); //<div class>div</div>

//13. on & off
// let div = dom.create('<div>div</div>');
// dom.append(window.body, div);
// function callback() { console.log(0.0) }
// dom.on(div, 'click', callback);
// dom.off(div, 'click', callback);

//14. find
// let scope = dom.find('#scope'); //内部调用querySelectorAll()，返回元素或元素集合
// let first_scope = dom.find('#first', scope[0]);  //在指定范围scope[0]内查找
// console.log(first_scope[0]);  //<div id="first">first</div>

//15. parent
// let parent = dom.parent(dom.find('#scope')[0]);
// console.log(parent);  //<body>...</body>

//16. children
// let children = dom.children(dom.find('#scope')[0]);
// console.log(children);  //[div#first, div#second, div#third]

//17. siblings
// let siblings = dom.siblings(dom.find('#first')[0]);
// console.log(siblings);  //[div#second, div#third]

//18. next
// let next = dom.next(dom.find('#first')[0]);
// console.log(next);  //<div id="second">second</div>

//19. previous
// let previous = dom.previous(dom.find('#second')[0]);
// console.log(previous);  //<div id="first">first</div>

//20. each()
// let nodeList = dom.children(dom.find('#scope')[0])
// dom.each(nodeList, (item) => {
//   item.style.color = 'red';
// });

//21. index
// let first = dom.find('#first')[0];
// console.log(dom.index(first));  //0
