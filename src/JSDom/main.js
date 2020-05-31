//create
let div = dom.create('<div>div</div>');
let span = dom.create('<span>span</span>');
let text = dom.create('<text>text</text>');
console.log(div, span, text);  //<div>div</div> <span>span</span> <text>text</text>

//after
dom.after(span, text);
console.log(span.parentNode);  //<span>span</span> <text>text</text>

//before
dom.before(span, div);
console.log(span.parentNode);  //<div>div</div> <span>span</span> <text>text</text>

//append
dom.append(span, text);
console.log(span); //<span>span<text>text</text></span>

//wrap
dom.wrap(span, div);
console.log(div);  //<div>div<span>span<text>text</text></span></div>

//remove
let temp = dom.remove(text);
console.log(temp);  //<text>text</text>

//empty
dom.empty(div);
console.log(div); //<div></div>

//attr
dom.attr(div, 'id', 'web');
console.log(dom.attr(div, 'id')); //web

//text
dom.text(div, 'this is a div');
console.log(dom.text(div)); //this is a div

//html
dom.html(div, '<span id="newSpan">span<span>');
console.log(div); //<div id="web"><span id="newSpan"></span></div>

//style
dom.style(div, 'border', '1px solid red');
console.log(div); //<div id="web" style="border:1px solid red;"><span id="newSpan"></span></div>
console.log(dom.style(div, 'border'));  //1px solid red
dom.style(div, {border: '1px solid green'});
console.log(div); //<div id="web" style="border:1px solid green;"><span id="newSpan"></span></div>

//class
dom.class.add(div, 'header');
console.log(div); //<div id="web" class="header" style="border:1px solid green;"><span id="newSpan"></span></div>
console.log(dom.class.has(div, 'header'));  //true
dom.class.remove(div, 'header');
console.log(div); //<div id="web" class style="border:1px solid green;"><span id="newSpan"></span></div>

//on & off
function fun() {
  console.log(0.0)
}

dom.on(div, 'click', fun);
dom.off(div, 'click', fun);

//find
let scope = dom.find('#scope'); //内部调用querySelectorAll，返回数组
let first_scope = dom.find('#first', scope[0]);  //使用的时候注意加 [0]
console.log(first_scope[0]);  //使用的时候注意加 [0]

//parent
let parent = dom.parent(dom.find('#scope')[0]);
console.log(parent);  //<body>...</body>

//children
let children = dom.children(dom.find('#scope')[0]);
console.log(children);

//siblings
let siblings = dom.siblings(dom.find('#scope')[0]);
console.log(siblings);

//next
let next = dom.next(dom.find('#scope')[0]);
console.log(next);

//previous
let previous = dom.previous(dom.find('#scope')[0]);
console.log(previous);

//each()
let first = dom.find('#first');
dom.each(first, fun);

//index
let scope1 = dom.find('#scope');
console.log(dom.index(scope1[0]));  //0