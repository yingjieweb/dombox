/*window.jQuery = function (selector) {
  let node = document.querySelectorAll(selector);
  let api = {
    addClass:function (className) { //这里用到闭包一直访问通过选择器获取的node
      for (let i=0;i<node.length;i++){
        node[i].classList.add(className);
      }
      return api; //return api返回能操作node的对象，为了链式调用
    }
  }
  return api; //return api返回能操作node的对象，为了链式调用
}*/

/*window.jQuery = function (selector) {
  let node = document.querySelectorAll(selector);
  let api = {
    addClass:function (className) {
      for (let i=0;i<node.length;i++){
        node[i].classList.add(className);
      }
      return this; //举例：person.say('erha') === person.say.call(person,'erha'); return this 就是 return api
    }
  }
  return api; //return api返回能操作node的对象，为了链式调用
}*/

window.jQuery = function (selector) {
  let node = document.querySelectorAll(selector);
  return {
    addClass:function (className) {
      for (let i=0;i<node.length;i++){
        node[i].classList.add(className);
      }
      return this;  //return this返回能操作node的对象，为了链式调用
    }
  }
}
