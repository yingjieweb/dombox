//return api
let api = window.jQuery('.dom');  //window可省略，jQuery为全局变量
console.log(api); //返回一个api对象，改对象可操作当前元素

//addClass
jQuery('.dom').addClass('red');

//find
let children = jQuery('.dom').find('.child1');
console.log(children);