//1. create
let div = dom.create('<div>div</div>');
let span = dom.create('<span>span</span>');
let text = dom.create('<text>text</text>');
console.log(div, span, text);  //<div>div</div> <span>span</span> <text>text</text>

//2. before
dom.before(span, div);
console.log(span.parentNode);  //<div>div</div> <span>span</span>

//3. after
dom.after(span, text);
console.log(span.parentNode);  //<div>div</div> <span>span</span> <text>text</text>

//4. append
dom.append(span, text);
console.log(span); //<span>span<text>text</text></span>

//5. wrap
dom.wrap(span, div);
console.log(div);  //<div>div<span>span</span></div>

//6. remove
let temp = dom.remove(text);
console.log(temp);  //<text>text</text>

//7. empty
dom.empty(div);
console.log(div); //<div></div>

//8. attr
dom.attr(div, 'id', 'web');
console.log(dom.attr(div, 'id')); //web

//9. text
dom.text(div, 'this is a div');
console.log(dom.text(div)); //this is a div

//10. html
dom.html(div, '<span id="newSpan">span<span>');
console.log(div); //<div id="web"><span id="newSpan"></span></div>

//11. style
dom.style(div, 'border', '1px solid red');
console.log(div); //<div id="web" style="border:1px solid red;"><span id="newSpan"></span></div>
console.log(dom.style(div, 'border'));  //1px solid red
dom.style(div, {border: '1px solid green'});
console.log(div); //<div id="web" style="border:1px solid green;"><span id="newSpan"></span></div>

//12. class
dom.class.add(div, 'header');
console.log(div); //<div id="web" class="header" style="border:1px solid green;"><span id="newSpan"></span></div>
console.log(dom.class.has(div, 'header'));  //true
dom.class.remove(div, 'header');
console.log(div); //<div id="web" class style="border:1px solid green;"><span id="newSpan"></span></div>

//13. on & off
function fun() {
  console.log(0.0)
}

dom.on(div, 'click', fun);
dom.off(div, 'click', fun);

//14. find
let scope = dom.find('#scope'); //内部调用querySelectorAll，返回数组
let first_scope = dom.find('#first', scope[0]);  //使用的时候注意加 [0]
console.log(first_scope[0]);  //使用的时候注意加 [0]

//15. parent
let parent = dom.parent(dom.find('#scope')[0]);
console.log(parent);  //<body>...</body>

//16. children
let children = dom.children(dom.find('#scope')[0]);
console.log(children);

//17. siblings
let siblings = dom.siblings(dom.find('#scope')[0]);
console.log(siblings);

//18. next
let next = dom.next(dom.find('#scope')[0]);
console.log(next);

//19. previous
let previous = dom.previous(dom.find('#scope')[0]);
console.log(previous);

//20. each()
let first = dom.find('#first');
dom.each(first, fun);

//21. index
let scope1 = dom.find('#scope');
console.log(dom.index(scope1[0]));  //0
