## Build your own dom API
<p align="center">
  <a href="https://github.com/yingjieweb/dombox"><img src="https://img.shields.io/badge/js%20dombox-%E4%B8%AD%E6%96%87-yellow" alt="js dombox"></a>
  <a href="https://github.com/yingjieweb/dombox/tree/master/lang/english/jsdom"><img src="https://img.shields.io/badge/js%20dombox-%E8%8B%B1%E6%96%87-yellow" alt="js dombox"></a>
  <a href="https://github.com/yingjieweb/dombox/tree/master/lang/chinese/jqdom"><img src="https://img.shields.io/badge/jQuery%20dombox-%E4%B8%AD%E6%96%87-blue" alt="jQuery dombox"></a>
  <a href="https://github.com/yingjieweb/dombox/tree/master/lang/english/jqdom"><img src="https://img.shields.io/badge/jQuery%20dombox-%E8%8B%B1%E6%96%87-blue" alt="jQuery dombox"></a>
</p>

------

&nbsp;&nbsp; 声明：这份文档是我自己在研究 jQuery 的过程中，尝试自己手写 jQuery 做的一份文档，封装的强度肯定不如 jQuery，只是作为自我练习封装思想的一个
参考手册，如果你想使用 jQuery 开发项目，这里推荐你到 [jQuery官网](https://www.jquery123.com/) 学习，如果你想学习一些封装思想，那这份文档比较适合你。

&nbsp;&nbsp; 与 dombox 的封装思想略有不同，jQuery 是一个全局的特殊函数，用户可以通过 `window.jQuery('selector')` 的方式调用该函数，用于获取对应的元素，
但是该函数的返回值却不是当前元素，而是返回一个对象，称为 jQuery 构造出来的对象，这个对象可以操作当前对应的元素，这就是 jQuery 的链式调用原理（闭包）。

&nbsp;&nbsp; 注意：jQuery 是一个全局的特殊函数，虽然其构造了一些东西（操作元素的 api 对象），但其实际上并不属于构造函数，因为普通的构造函数一般在声明的时候
需要 new 关键字，而 jQuery 是一个不需要加 new 关键字的构造函数，严格意义上说 jQuery 并不能称之为是构造函数，其思想只是使用了一些编程的技巧。

&nbsp;&nbsp; 注意：由于 jQuery 的主要封装思想是链式操作，所以需要在每一步返回可操作当前元素的 api 对象，该对象并不是 DOM 元素，它不能使用 DOM 相关的 API，
如：querySelector()、appendChild()，而是只能使用 jQuery 相关的 API，如：find()、each()。所以在实际的开发工作中，为了更好的明确是 DOM 元素还是 jQuery
元素，我们一般做一些规范性的规定，jQuery 返回的 api 对象采取前加 $ 标记的命名风格，如：`let $div = jQuery('.div');`。

**1. 链式调用** - jQuery 在查找节点或操作节点后，并不会返回节点本身，而是返回一个可以操作当前节点的 api 对象，从而实现 jQuery 的链式风格。
```javascript
window.jQuery = function (selector) {
  let nodes = document.querySelectorAll(selector);  //返回一个伪数组
  let api = {
    print: function () { 
      console.log(nodes); //这里用到闭包一直访问通过选择器获取的 nodes
      return api; //return api 返回能操作 nodes 的对象，为了链式调用
    }
  }
  return api; //return api 返回能操作 nodes 的对象，为了链式调用
}

<div class="dom1"></div>
window.jQuery('.dom1');  //jQuery 为全局变量，window 可省略。返回一个 api 对象，该对象可操作当前 .dom 元素
jQuery('.dom1').print();  //NodeList [div.dom1]。 print 函数也返回一个 api 对象，这样即可一直链式调用下去
```

**2. $ 基础别名** - 为 jQuery 起一个书写方便的别名 $，并优化封装代码（删除 api 中间变量）。
```javascript
window.$ = window.jQuery = function (selector) {  // 为 jQuery 起一个书写方便的别名 $
  let nodes = document.querySelectorAll(selector);
  return {  //删除 api 中间变量，直接 return api 对象
    print: function () { 
      console.log(nodes);
      //return api; //return api 返回能操作 nodes 的对象，为了链式调用
      return this; //举例：person.say('erha') === person.say.call(person,'erha'); return this 就是 return api
    }
  }
  //return api; //return api 返回能操作 nodes 的对象，为了链式调用
}

<div class="dom1"></div>
window.$('.dom1');  //$ 为全局变量，window 可省略。返回一个 api 对象，该对象可操作当前 .dom1 元素
$('.dom1').print();  //NodeList [div.dom1]。 print 函数也返回一个 api 对象，这样即可一直链式调用下去
```

**3.$('selector').addClass(className)** - addClass 方法用于查找 selector 选择器所匹配的元素，并给每个元素添加一个值为 className 的 class 属性。
```javascript
window.$ = window.jQuery = function (selector) {
  let nodes = document.querySelectorAll(selector);
  return {
    addClass: function (className) {  //给匹配 selector 选择器的元素添加 class
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].classList.add(className);
      }
      return this;  //return this 就是 return api
    }
  }
}

<div class="dom1"></div>
$('.dom1').addClass('red');  //给 class 为 dom1 的元素添加一个值为 red 的 class 属性，可继续链式调用下去
$('.dom1').print(); //NodeList [div.dom1.red]
```

**4.$('selector').find(selector1)** - find 方法用于查找 selector 选择器所匹配的元素，并在其内部继续查找 selector1 所匹配到的元素。
```javascript
window.$ = window.jQuery = function (selectorOrArray) {
  let nodes;  //考虑到作用域问题，声明的nodes放在if-else外面
  if (typeof selectorOrArray === 'string') {
    nodes = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {  //find()函数可能会传递一个数组给jQuery选择器
    nodes = selectorOrArray;
  }
  return {
    find: function (selector) {  //find(){}
      let array = [];
      for (let i = 0; i < nodes.length; i++) {
        array = array.concat(Array.from(nodes[i].querySelectorAll(selector)));  //querySelectorAll 得到的是一个伪数组
      }
      return jQuery(array); //返回新的一个jQuery对象，操作当前元素，这样可以继续实现链式操作
    }
  }
}

<div class="dom1">
  <div class="child1">child1</div>
  <div class="child2">child2</div>
</div>
$('.dom1').find('.child1').addClass('blue');  //dom1 > child1 的元素被添加了blue类名
$('.dom1').find('.child1').print(); //NodeList [div.child1.blue]
```

**5.$(selector).find(selector1).end()** - end 方法用于返回上一级 api 操作的元素，如当前语法可返回一个可操作 selector 选择器对应元素的 api 对象。
```javascript
window.$ = window.jQuery = function (selectorOrArray) {
  let nodes;
  if (typeof selectorOrArray === 'string') {
    nodes = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    nodes = selectorOrArray;
  }
  return {
    find:function (selector) {
      let array = [];
      for (let i=0;i<nodes.length;i++){
        array = array.concat(Array.from(nodes[i].querySelectorAll(selector)));
      }
      array.oldApi = this;  //find()在返回新的jQuery对象之前，先将老的api存到数组里，为end()做准备 —— 当前this指向旧的api
      return jQuery(array); //将含有oldApi的array作为参数传递到jQuery中，会返回一个新的api对象，用来操作新的元素
    },
    oldApi: selectorOrArray.oldApi,  //selectorOrArray参数就是find中的array，里面存了oldApi
    end: function () {
      return this.oldApi; //这里的this指向新的api，新的api中存在一个一个oldApi属性(array.oldApi)
    }
  }
}
<div class="dom1">
  <div class="child1">child1</div>
</div>
$('.dom1').find('.child1').addClass('blue').end().addClass('orange');  //dom1被添加了orange类名
$('.dom1').print(); //NodeList [div.dom1.orange]
```

**6.$(selector).each(fun);** - each(fun) 方法用于查找 selector 选择器所匹配的元素，并给每个元素添加一个 fun 函数。
```javascript
window.$ = window.jQuery = function (selectorOrArray) {
  let nodes;
  if (typeof selectorOrArray === 'string') {
    nodes = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    nodes = selectorOrArray;
  }
  return {
    each(fun) {  //参数为一个回调函数，每执行一次遍历操作，就调用一下回调操作，并传递一个nodes[i]给该回调函数
      for (let i = 0; i < nodes.length; i++) { //这个nodes为调用each()方法的api要操作的nodes
        fun.call(null, nodes[i]);
      }
      return this;
    }
  }
}

<div class="dom1">
  <div class="child1">child1</div>
</div>
$('.dom1').find('.child1').each((node) => {
  console.log(node);
});  //<div class="child1">child1</div>
```

**7.$(selector).parent()** - parent 方法用于查找 selector 选择器所匹配的元素的所有父元素。
```javascript
window.$ = window.jQuery = function (selectorOrArray) {
  let nodes;
  if (typeof selectorOrArray === 'string') {
    nodes = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    nodes = selectorOrArray;
  }
  return {
    parent() { //调用parent方法的对象可能是一个元素数组的api，则其要操作的元素的父元素可能为多个
      let parent = [];  //就需要定义一个数组，用来准备存储当前调用parent()方法的api内要操作的节点们的父元素
      this.each((node) => { //this指代那些要找父元素的元素对象的api
        if (parent.indexOf(node.parentNode) === -1)  //去重效果，避免多个元素的父元素一样，会打印多次
          parent.push(node.parentNode); //将找到的父元素存到parent数组中
      })
      return jQuery(parent);  //要将parent数组对象化，为链式操作做准备
    }
  }
}

<div class="dom1">
  <div class="child1">child1</div>
</div>
$('.child1').parent().print();  //[div.dom1]
```

**8.$(selector).children()** - children 方法用于查找 selector 选择器所匹配的元素的所有子元素。
```javascript
window.jQuery = function (selectorOrArray) {
  let nodes;
  if (typeof selectorOrArray === 'string') {
    nodes = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    nodes = selectorOrArray;
  }
  return {
    children() {
      let children = [];
      this.each((node) => {
        children.push(...node.children);  //node可能有多个children，需要用到数组解构赋值
      })
      return jQuery(children);  //为链式调用做准备，返回能操作children的api
    }
  }
}

<div class="dom1">
  <div class="child1">child1</div>
  <div class="child2">child2</div>
</div>
$('.dom1').children().print();  //[div.child1, div.child2]
```

**9. $(selector).siblings()** - siblings 方法用于查找 selector 选择器所匹配的元素的所有兄弟元素。
```javascript
window.jQuery = function (selectorOrArray) {
  let nodes;
  if (typeof selectorOrArray === 'string') {
    nodes = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    nodes = selectorOrArray;
  }
  return {
    siblings() { //调用siblings()方法的api所操作的元素可能是一个数组
      let siblings = [];  //所以需要用数组来存储其兄弟节点
      this.each((node) => { //each遍历每一个节点
        siblings.push(...Array.from(node.parentNode.children));
        siblings.filter(item => !item.indexOf(siblings));
      })
      return jQuery(siblings);
    }
  }
}

<div class="child1">child1</div>
<div class="child2">child2</div>
<div class="child3">child3</div>
$('.child1').siblings().print(); //[div.child2, div.child3]
```

**10.$('<div class="new">div<div>')** - jQuery 接收这种形式的串时，其内部调用 createElement() 用于创建新的元素。
```javascript
window.jQuery = function (selectorOrArrayOrTemplate) {
  let nodes;
  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") { // 创建 div
      nodes = [createElement(selectorOrArrayOrTemplate)];
    } else {  // 查找 div
      nodes = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    nodes = selectorOrArrayOrTemplate;
  }
  function createElement(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  }
  return {
    print: function () { //打印api所操作的元素
      console.log(nodes);
    }
  }
}

$('<div class="new">div<div>').print(); //[div.new]
```

**★ jquery.prototype** - 上述的封装方式在使用的过程中，基本上每一步的链式操作都会返回一个新的 api 对象，这样不免会造成内存的浪费，所以我们
可以把这个 api 对象中公共的函数放到 jQuery 的原型上，每一步链式操作都返回这个 jQuery 原型对象，这样就可以避免内存的浪费。
```javascript
window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  let nodes;
  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") { // 创建 div
      nodes = [createElement(selectorOrArrayOrTemplate)];
    } else {  // 查找 div
      nodes = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    nodes = selectorOrArrayOrTemplate;
  }

  function createElement(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  }

  const api = Object.create(jQuery.prototype) // 创建一个 api 对象: api.__protp__ === jQuery.prototype  // const api = {__proto__: jQuery.prototype}
  Object.assign(api, {  //相当于： api.elements = elements; api.oldApi = selectorOrArrayOrTemplate.oldApi;
    nodes: nodes,
    oldApi: selectorOrArrayOrTemplate.oldApi
  })
  return api;
}

jQuery.prototype = {
  constructor: jQuery,
  //...那些封装的 api 方法
}
```
&nbsp;&nbsp; **最后**：[这是源码链接](https://github.com/yingjieweb/dombox/blob/master/src/JQueryDom/jqdom.js) ，以上是 jQuery
的基本封装思想，上述封装的 api 仅作为研究封装思想的例子，如果你想深入学习 jQuery，还是推荐你到 [jQuery官网](https://www.jquery123.com/)
进行学习。后续如果源码有改动的话会第一时间发布到这里，如果大家有发现错误或有性能优化的好点子可直接在相应文档进行编辑修改。欢迎提交对本仓库的改进建议~