## Build your own dom API
<p align="center">
  <a href="https://github.com/yingjieweb/dombox"><img src="https://img.shields.io/badge/js%20dombox-%E4%B8%AD%E6%96%87-yellow" alt="js dombox"></a>
  <a href="https://github.com/yingjieweb/dombox/tree/master/lang/english/jsdom"><img src="https://img.shields.io/badge/js%20dombox-%E8%8B%B1%E6%96%87-yellow" alt="js dombox"></a>
  <a href="https://github.com/yingjieweb/dombox/tree/master/lang/chinese/jqdom"><img src="https://img.shields.io/badge/jQuery%20dombox-%E4%B8%AD%E6%96%87-blue" alt="jQuery dombox"></a>
  <a href="https://github.com/yingjieweb/dombox/tree/master/lang/english/jqdom"><img src="https://img.shields.io/badge/jQuery%20dombox-%E8%8B%B1%E6%96%87-blue" alt="jQuery dombox"></a>
</p>

------
    dombox 是一个高效、精简并且功能丰富的JavaScript工具库。它提供的API易于使用，这让诸如HTML文档遍历和操作、事件处理操作更加简单。
使用方式是下载并将 jsdom.js 文件以 `<script src='./jsdom.js'></script>` 的方式引入项目中。
    根据上述步骤将 jsdom 引入项目中后，可以通过 dom.API 的方式对 dombox 库中封装好的方法进行调用，具体的 API 详细介绍如下，相信你
在使用的过程中一定会觉得本库比 JavaScript 的原生 API 高效的多。

>1 create('html')
>    create() 接收一个 html 标签字符串，如：`let div = dom.create('div');` 可以创建一个 div 节点。

>2 append(parent, node)
>    append(parent, node) 接收两个参数，其中第一个参数为节点要插入的父节点，第二个参数为要插入的节点。
