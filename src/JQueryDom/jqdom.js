window.jQuery = function (selector) {
  let nodes = document.querySelectorAll(selector); //伪数组

  return {  //封装过程见optimize.js
    addClass:function (className) { //addClass(){}
      for (let i=0;i<nodes.length;i++){
        nodes[i].classList.add(className);
      }
      return this;
    },
    find:function (selector) {  //find(){}
      let array = [];
      for (let i=0;i<nodes.length;i++){
        array = array.concat(Array.from(nodes[i].querySelectorAll(selector)));
      }
      return array;
    }
  }
}