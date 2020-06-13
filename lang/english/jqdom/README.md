## Build your own dom API
<p align="center">
  <a href="https://github.com/yingjieweb/dombox"><img src="https://img.shields.io/badge/js%20dombox-%E4%B8%AD%E6%96%87-yellow" alt="js dombox"></a>
  <a href="https://github.com/yingjieweb/dombox/tree/master/lang/english/jsdom"><img src="https://img.shields.io/badge/js%20dombox-%E8%8B%B1%E6%96%87-yellow" alt="js dombox"></a>
  <a href="https://github.com/yingjieweb/dombox/tree/master/lang/chinese/jqdom"><img src="https://img.shields.io/badge/jQuery%20dombox-%E4%B8%AD%E6%96%87-blue" alt="jQuery dombox"></a>
  <a href="https://github.com/yingjieweb/dombox/tree/master/lang/english/jqdom"><img src="https://img.shields.io/badge/jQuery%20dombox-%E8%8B%B1%E6%96%87-blue" alt="jQuery dombox"></a>
</p>

------

&nbsp;&nbsp; Declaration: this document is in the process of study jQuery myself, try to write a jQuery to do a document, the strength of the packaging must not jQuery, 
just as a reference manual self practice packaging ideas, if you want to use the jQuery development project, here recommend you to study the 
 [jQuery's official website](https://www.jquery123.com/) , if you want to learn some packaging ideas, that the document is suitable for you.
 
&nbsp;&nbsp; With dombox encapsulation ideology is slightly different, jQuery is a global special function, the user can through the `window.jQuery (' selector ')` way 
to call the function, is used to obtain the corresponding element, but the function return value is not the current element, but returns an object, known as the jQuery 
structure of object, the object can operate on the corresponding element, this is the chain jQuery calls principle (closures).

&nbsp;&nbsp; Note: jQuery is a global special function, although its structure something (API object operation element), but it actually does not belong to the constructor,
because ordinary constructor when general statement need new keywords, and jQuery is a don't need to add new keywords constructors, technically is constructed of jQuery does 
not become a Korean, the idea just use some programming skills.

&nbsp;&nbsp; Note: Since jQuery's main encapsulation idea is chain operation, an API object that manipulates the current element needs to be returned at each step.
This object is not a DOM element. Instead of using DOM-related apis such as querySelector(), appendChild(), it can only use jquery-related apis such as find(),
each(). However, in the actual development work, in order to better clarify whether it is DOM element or jQuery element, we generally make some normative provisions.
The API object returned by jQuery adopts the naming style with $tag before it, such as：`let $div = jQuery('.div');`。

**1. Chain calls** - When jQuery finds a node or operation node, it does not return the node itself, but an API object that can operate on the current node,
thus achieving the chain style of jQuery.
```javascript
window.jQuery = function (selector) {
  let nodes = document.querySelectorAll(selector);  //Returns a pseudo-array
  let api = {
    print: function () { 
      console.log(nodes); //the closure is used to access nodes all the way
      return api; //return api Returns an object that can operate nodes for chained calls
    }
  }
  return api; //return api Returns an object that can operate nodes for chained calls
}

<div class="dom1"></div>
window.jQuery('.dom1');  //jQuery is a global variable, window can be omitted. Returns an API object that manipulates the current.dom element
jQuery('.dom1').print();  //NodeList [div.dom1]. The print function also returns an API object, which keeps the call chained
```

**2. $ Base aliases** - Give jQuery a convenient nickname: $, and optimize the wrapper code (remove API intermediate variables).
```javascript
window.$ = window.jQuery = function (selector) {  // Base aliases $
  let nodes = document.querySelectorAll(selector);
  return {  //Remove the API intermediate variables and simply return the API object
    print: function () { 
      console.log(nodes);
      //return api; //return api . Returns an object that can operate nodes for chained calls
      return this; //such as: person.say('erha') === person.say.call(person,'erha'); return this === return api
    }
  }
  //return api; //return api Returns an object that can operate nodes for chained calls
}

<div class="dom1"></div>
window.$('.dom1');  //jQuery is a global variable, window can be omitted. Returns an API object that manipulates the current.dom element
$('.dom1').print();  //NodeList [div.dom1]. The print function also returns an API object, which keeps the call chained
```

**3.$('selector').addClass(className)** - The addClass method is used to find the selector match element and add a class attribute with the className value to each element.
```javascript
window.$ = window.jQuery = function (selector) {
  let nodes = document.querySelectorAll(selector);
  return {
    addClass: function (className) {  //Add a class to the element that matches the Selector
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].classList.add(className);
      }
      return this;  //return this === return api
    }
  }
}

<div class="dom1"></div>
$('.dom1').addClass('red');  //Add a class attribute with the value red to the element for class dom1, and you can continue the call chain
$('.dom1').print(); //NodeList [div.dom1.red]
```

**4.$('selector').find(selector1)** - The find method is used to find the selector matching element, and within it continues to look for the element selector1 matches.
```javascript
window.$ = window.jQuery = function (selectorOrArray) {
  let nodes;
  if (typeof selectorOrArray === 'string') {
    nodes = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {  //find() might pass an array to the jQuery selector
    nodes = selectorOrArray;
  }
  return {
    find: function (selector) {  //find(){}
      let array = [];
      for (let i = 0; i < nodes.length; i++) {
        array = array.concat(Array.from(nodes[i].querySelectorAll(selector)));  //querySelectorAll() will get is a pseudo-array
      }
      return jQuery(array); //Returns a new jQuery object that manipulates the current element, allowing you to continue the chain operation
    }
  }
}

<div class="dom1">
  <div class="child1">child1</div>
  <div class="child2">child2</div>
</div>
$('.dom1').find('.child1').addClass('blue');  //dom1 > child1 addClass 'blue'
$('.dom1').find('.child1').print(); //NodeList [div.child1.blue]
```

**5.$(selector).find(selector1).end()** - The end method is used to return elements of the previous API operation, such as the current syntax that returns an API object corresponding to an operatable Selector.
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
      array.oldApi = this;  //Before finding () returns the new jQuery object, save the old API to an array in preparation for end() -- currently this points to the old API
      return jQuery(array); //Passing an Array with oldApi as a parameter to jQuery returns a new API object to manipulate the new element
    },
    oldApi: selectorOrArray.oldApi,  //The selectorOrArray parameter is the Array in find that holds the oldApi
    end: function () {
      return this.oldApi; //Here, 'this' is pointing to the new API, and there is an oldApi property (Array.oldAPI)
    }
  }
}
<div class="dom1">
  <div class="child1">child1</div>
</div>
$('.dom1').find('.child1').addClass('blue').end().addClass('orange');  //Dom1 was added with the 'orange' class name
$('.dom1').print(); //NodeList [div.dom1.orange]
```

**6.$(selector).each(fun);** - The each(Fun) method is used to find the selector matching elements and add a fun function to each element.
```javascript
window.$ = window.jQuery = function (selectorOrArray) {
  let nodes;
  if (typeof selectorOrArray === 'string') {
    nodes = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    nodes = selectorOrArray;
  }
  return {
    each(fun) {  //Parameter is a callback function. After each traversal, the callback operation is called and a nodes[I] is passed to the callback function
      for (let i = 0; i < nodes.length; i++) { //This nodes is the nodes that the API invoking the each() method will operate on
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

**7.$(selector).parent()** - The parent method is used to find all the parent elements of the selector selector's matched element.
```javascript
window.$ = window.jQuery = function (selectorOrArray) {
  let nodes;
  if (typeof selectorOrArray === 'string') {
    nodes = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    nodes = selectorOrArray;
  }
  return {
    parent() { //The object calling the parent method may be an API for an array of elements, and the parent of the element it is operating on May be multiple
      let parent = [];  //need to define an array that is ready to store the parent elements of the nodes to be manipulated in the API that is currently calling the parent() method
      this.each((node) => { //this指代那些要找父元素的元素对象的api
        if (parent.indexOf(node.parentNode) === -1)  //duplicate removal
          parent.push(node.parentNode); //Stores the parent element found in the parent array
      })
      return jQuery(parent);  //To objectify the Parent array, prepare for the chain operation
    }
  }
}

<div class="dom1">
  <div class="child1">child1</div>
</div>
$('.child1').parent().print();  //[div.dom1]
```

**8.$(selector).children()** - The Children method is used to find all the children of the selector selector's matched element.
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
        children.push(...node.children);  //Node may have more than one child and requires an array to deconstruct the assignment
      })
      return jQuery(children);  //To prepare for a chained call, return an API that can manipulate children
    }
  }
}

<div class="dom1">
  <div class="child1">child1</div>
  <div class="child2">child2</div>
</div>
$('.dom1').children().print();  //[div.child1, div.child2]
```

**9. $(selector).siblings()** - The Siblings method is used to find all siblings of the selector's matching element.
```javascript
window.jQuery = function (selectorOrArray) {
  let nodes;
  if (typeof selectorOrArray === 'string') {
    nodes = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    nodes = selectorOrArray;
  }
  return {
    siblings() {  //The element that the API calls the siblings () method operates on might be an array
      let siblings = [];  //So you need an array to store its sibling nodes
      this.each((node) => {
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

**10.$('<div class="new">div<div>')** - When jQuery receives a string of this form, it internally calls createElement() to create a new element.
```javascript
window.jQuery = function (selectorOrArrayOrTemplate) {
  let nodes;
  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") { // create div
      nodes = [createElement(selectorOrArrayOrTemplate)];
    } else {  // find div
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
    print: function () {
      console.log(nodes);
    }
  }
}

$('<div class="new">div<div>').print(); //[div.new]
```

**★ jquery.prototype** - The way of packaging in the process of use, and basically every step of the chain operation will return a new API objects,
so inevitably cause waste of memory, so we can put this API objects of public function in the jQuery on the prototype of every step of the chain operation 
is to return the jQuery object prototype, so you can avoid the waste of memory.
```javascript
window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  let nodes;
  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") { //  div
      nodes = [createElement(selectorOrArrayOrTemplate)];
    } else {  // find div
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

  const api = Object.create(jQuery.prototype) // create an api object: api.__protp__ === jQuery.prototype  // const api = {__proto__: jQuery.prototype}
  Object.assign(api, {  //The equivalent of: api.elements = elements; api.oldApi = selectorOrArrayOrTemplate.oldApi;
    nodes: nodes,
    oldApi: selectorOrArrayOrTemplate.oldApi
  })
  return api;
}

jQuery.prototype = {
  constructor: jQuery,
  //...Those encapsulated API methods
}
```
&nbsp;&nbsp; **Finally**：[Source Link](https://github.com/yingjieweb/dombox/blob/master/src/JQueryDom/jqdom.js) ,The above is the basic encapsulation idea of jQuery.
The above encapsulated API is only used as an example to study the encapsulation idea. If you want to learn jQuery in depth, you are recommended to learn 
[jQuery official website](https://www.jquery123.com/). If there is any change in the source code, it will be published here in the first time. If you find any errors
or have good ideas for performance optimization, you can directly edit and modify in the corresponding document.Suggestions for improvement of the warehouse are welcome ~