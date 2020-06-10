window.$ = window.jQuery = function (selectorOrArray) {
  let nodes;
  if (typeof selectorOrArray === 'string') {
    nodes = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    nodes = selectorOrArray;
  }
  return {
    print: function () {
      console.log(nodes);
    },
    find: function (selector) {
      let array = [];
      for (let i = 0; i < nodes.length; i++) {
        array = array.concat(Array.from(nodes[i].querySelectorAll(selector)));
      }
      array.oldApi = this;
      return jQuery(array);
    },
    each(fun) {
      for (let i = 0; i < nodes.length; i++) {
        fun.call(null, nodes[i]);
      }
    },
    parent() {
      let parent = [];
      this.each((node) => {
        if (parent.indexOf(node.parentNode) === -1)
          parent.push(node.parentNode);
      })
      return jQuery(parent);
    },
    children() {
      let children = [];
      this.each((node) => {
        children.push(...node.children);
      })
      return jQuery(children);
    },
    siblings() { //调用siblings()方法的api所操作的元素可能是一个数组
      let siblings = [];  //所以需要用数组来存储其兄弟节点
      let array = [];
      this.each((node) => { //each遍历每一个节点
        siblings.push(...Array.from(node.parentNode.children).filter(item => item !== node));
        console.log(siblings);
      })
      return jQuery(siblings);
    },
    addClass: function (className) {
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].classList.add(className);
      }
      return this;
    },
    oldApi: selectorOrArray.oldApi,
    end: function () {
      return this.oldApi;
    }
  }
}