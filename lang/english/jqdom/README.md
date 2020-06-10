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