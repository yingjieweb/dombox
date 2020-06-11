/**********************封装jquery：通过选择器拿到元素后，返回一个可以操作改元素的api对象 → 链式调用***************************/
/*window.jQuery = function (selector) {
  let nodes = document.querySelectorAll(selector);  //返回一个伪数组
  let api = {
    addClass: function (className) { //这里用到闭包一直访问通过选择器获取的nodes
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].classList.add(className);
      }
      return api; //return api返回能操作nodes的对象，为了链式调用
    }
  }
  return api; //return api返回能操作nodes的对象，为了链式调用
}*/
/***************************************return api改为return this******************************************************/
/*window.jQuery = function (selector) {
  let nodes = document.querySelectorAll(selector);
  let api = {
    addClass: function (className) {
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].classList.add(className);
      }
      return this; //举例：person.say('erha') === person.say.call(person,'erha'); return this 就是 return api
    }
  }
  return api;
}*/
/***************************************删除api变量，直接return对象******************************************************/
/*window.jQuery = function (selector) {
  let nodes = document.querySelectorAll(selector);  //返回一个伪数组
  return {           //删除中间变量api，直接返回操作元素的对象
    addClass: function (className) {
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].classList.add(className);
      }
      return this;
    }
  }
}*/
/**********************************************find()函数**************************************************************/
/*window.jQuery = function (selector) {
  let nodes = document.querySelectorAll(selector);
  return {
    find: function (selector) {  //find(){}
      let array = [];
      for (let i = 0; i < nodes.length; i++) {
        array = array.concat(Array.from(nodes[i].querySelectorAll(selector)));
      }
      return array; //返回选中的元素数组，这样将不能继续链式调用，进行如下优化
    }
  }
}*/
/***********************************************find()函数优化**********************************************************/
/*window.jQuery = function (selectorOrArray) {
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
}*/
/***********************************************end()函数**************************************************************/
/*window.jQuery = function (selectorOrArray) {
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
      return this.oldApi; //这里的this指向新的api，新的api中存在一个oldApi属性(array.oldApi)
    }
  }
}*/
/***********************************************each()函数*************************************************************/
/*window.jQuery = function (selectorOrArray) {
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
}*/
/**************************************print()函数 & parent()函数*******************************************************/
/*window.jQuery = function (selectorOrArray) {
  let nodes;
  if (typeof selectorOrArray === 'string') {
    nodes = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    nodes = selectorOrArray;
  }
  return {
    print: function () { //打印api所操作的元素
      console.log(nodes);
    },
    parent() { //调用parent方法的对象可能是一个元素数组的api，则其要操作的元素的父元素可能为多个
      let parent = [];  //就需要定义一个数组，用来准备存储当前调用parent()方法的api内要操作的节点们的父元素
      this.each((node) => { //this指代那些要找父元素的元素对象的api
        if (parent.indexOf(node.parentNode) === -1)  //去重效果，避免多个元素的父元素一样，会打印多次
          parent.push(node.parentNode); //将找到的父元素存到parent数组中
      })
      return jQuery(parent);  //要将parent数组对象化，为链式操作做准备
    }
  }
}*/
/*******************************************children()函数*************************************************************/
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
/*****************siblings()获取兄弟、index()获取排行老几(从0开始)、next()获取弟弟、previous()获取哥哥**********************/
/*window.jQuery = function (selectorOrArray) {
  let nodes;
  if (typeof selectorOrArray === 'string'){
    nodes = document.querySelectorAll(selectorOrArray);
  }else if (selectorOrArray instanceof Array){
    nodes = selectorOrArray;
  }
  return {
    siblings(){ //调用siblings()方法的api所操作的元素可能是一个数组
      let siblings = [];  //所以需要用数组来存储其兄弟节点
      this.each((node)=>{ //each遍历每一个节点
        siblings.push(...Array.from(node.parentNode.children));
        siblings.filter(item => !item.indexOf(siblings));
      })
      return jQuery(siblings);
    },
    index(){},
    next(){},
    previous(){}
  }
}*/
/*********************************************bash alias***************************************************************/
/*window.$ = window.jQuery;*/
