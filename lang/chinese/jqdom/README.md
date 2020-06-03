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

**1. 链式调用思想** - jQuery在查找节点或操作节点后，并不会返回节点本身，而是返回一个可以操作当前节点的api对象
```javascript
window.jQuery = function (selector) {
  let nodes = document.querySelectorAll(selector);  //返回一个伪数组
  let api = {
    addClass:function (className) { //这里用到闭包一直访问通过选择器获取的nodes
      for (let i=0;i<nodes.length;i++){
        nodes[i].classList.add(className);
      }
      return api; //return api返回能操作nodes的对象，为了链式调用
    }
  }
  return api; //return api返回能操作nodes的对象，为了链式调用
}
```