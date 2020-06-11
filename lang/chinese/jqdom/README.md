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
需要 new 关键字，而 jQuery 是一个不需要加 new 关键字的构造函数，严格意义上说 jQuery 并不能成为之是构造韩式，其思想只是使用了一些编程的技巧。

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

**2. $ 别名** - 为 jQuery 起一个书写方便的别名 $，并优化封装代码（删除 api 中间变量）。
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

**3.jQuery('selector').addClass(className)** - 查找 selector 选择器所匹配的元素，并给每个元素添加一个值为 className 的 class 属性。
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

**4.jQuery('selector').find(selector1)** - 查找 selector 选择器所匹配的元素，并在其内部继续查找 selector1 所匹配到的元素。
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