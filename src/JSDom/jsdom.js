window.dom = {
  create: function (node) {  //create(){}
    let container = document.createElement('template'); //template标签可以容纳任何元素
    container.innerHTML = node.trim();
    return container.content.firstChild;
  },
  before: function (node, newNode) { //before(){}
    node.parentNode.insertBefore(newNode, node);
  },
  after: function (node, newNode) { //after(){}
    node.parentNode.insertBefore(newNode, node.nextSibling); //即使node节点没有next兄弟也能成功
  },
  append: function (parent, node) { //append(){}
    parent.appendChild(node);
  },
  wrap: function (node, parent) { //warp(){}
    dom.before(node, parent);
    dom.append(parent, node);  //node节点直接从原来的位置跳到parent节点中
  },
  remove: function (node) {
    node.parentNode.removeChild(node);  //考虑到需要返回node，不能用remove()
    return node;
  },
  /*empty:function(node){ //直接node.innerHTML = '';也可以
    let childNodes = node.childNodes; //可以简写：let {childNodes} = node;
    let array = [];
    for (let i=0;i<childNodes.length;i++){  //因为childNodes.length属性在每次删除元素后会发生变化，优化如下：
      array.push(childNodes[i]);
      dom.remove(childNodes[i]);
    }
    return array;
  },*/
  empty: function (node) { //empty(){}
    let array = [];
    let first = node.firstChild;
    while (first) {
      array.push(dom.remove(node.firstChild));
      first = node.firstChild;
    }
    return array; //注意回车也会被当作节点加入进来
  },
  attr: function (node, name, value) { //attr(){}
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text: function (node, string) { //text(){}
    if (arguments.length === 2) {
      if ('innerText' in node) {  //适配ie
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ('innerText' in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  html: function (node, string) { //html(){}
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style: function (node, name, value) {  //style(){}
    // dom.style(div, 'color', 'red')
    if (arguments.length === 3) {
      node.style[name] = value;
    } else if (arguments.length === 2) {
      // dom.style(div, 'color')
      if (typeof name === 'string') {
        return node.style[name];
        // dom.style(div, {color: 'red'})
      } else if (name instanceof Object) {
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  class: {
    add: function (node, className) { //add(){}
      node.classList.add(className);
    },
    remove: function (node, className) {  //remove(){}
      node.classList.remove(className);
    },
    has: function (node, className) { //has(){}
      return node.classList.contains(className);
    }
  },
  on: function (node, eventName, fn) { //on(){}
    node.addEventListener(eventName, fn);
  },
  off: function (node, eventName, fn) { //off(){}
    node.removeEventListener(eventName, fn);
  },
  find: function (selector, scope) { //find(){} scope为查找范围，是字符串，需要提前获取好
    return (scope || document).querySelectorAll(selector);//返回一个数组，注意在使用的时候加[0]
  },
  parent: function (node) {  //parent(){}
    return node.parentNode;
  },
  children: function (node) {  //children(){}
    return node.children;
  },
  siblings: function (node) {  //sibling(){}
    return Array.from(node.parentNode.children) //children是伪数组，通过Array.form转换为数组
        .filter(item => item !== node); //然后调用数组的filter函数，将自身删除，剩余兄弟节点
  },
  next: function (node) {  //next(){}
    let x = node.nextSibling;
    while (x && x.nodeType === 3) { //排除回车的文本节点
      x = x.nextSibling;
    }
    return x;
  },
  previous: function (node) {  //previous(){}
    let x = node.previousSibling;
    while (x && x.nodeType === 3) { //排除回车的文本节点
      x = x.previousSibling;
    }
    return x;
  },
  each: function (nodeList, fun) { //each(){}
    for (let i = 0; i < nodeList.length; i++) {
      fun.call(null, nodeList[i]);
    }
  },
  index: function (node) { //index(){}
    const list = dom.children(node.parentNode)
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  }
}