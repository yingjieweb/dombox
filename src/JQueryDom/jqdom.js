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
  print: function () {
    console.log(this.nodes);
  },
  addClass: function (className) {
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].classList.add(className);
    }
    return this;
  },
  find: function (selector) {
    let array = [];
    for (let i = 0; i < this.nodes.length; i++) {
      array = array.concat(Array.from(this.nodes[i].querySelectorAll(selector)));
    }
    array.oldApi = this;
    return jQuery(array);
  },
  end: function () {
    return this.oldApi;
  },
  each: function (fun) {
    for (let i = 0; i < this.nodes.length; i++) {
      fun.call(null, this.nodes[i]);
    }
    return this;
  },
  parent: function () {
    let parent = [];
    this.each((node) => {
      if (parent.indexOf(node.parentNode) === -1)
        parent.push(node.parentNode);
    })
    return jQuery(parent);
  },
  children: function () {
    let children = [];
    this.each((node) => {
      children.push(...node.children);
    })
    return jQuery(children);
  },
  siblings: function () {
    let siblings = [];
    let array = [];
    this.each((node) => {
      siblings.push(...Array.from(node.parentNode.children).filter(item => item !== node));
      console.log(siblings);
    })
    return jQuery(siblings);
  }
}