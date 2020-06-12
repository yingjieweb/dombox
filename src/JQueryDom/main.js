//return api
// window.jQuery('.dom1');  //jQuery 为全局变量，window 可省略。返回一个 api 对象，该对象可操作当前 .dom 元素
// jQuery('.dom1').print();  //NodeList [div.dom1]。 print 函数也返回一个 api 对象，这样即可一直链式调用下去

//addClass():添加class属性
// $('.dom1').addClass('red');  //给 class 为 dom1 的元素添加一个值为 red 的 class 属性，可继续链式调用下去
// $('.dom1').print(); //NodeList [div.dom1.red]

//find():找当前元素的孩子
// $('.dom1').find('.child1').addClass('blue');  //dom1 > child1 的元素被添加了blue类名
// $('.dom1').find('.child1').print(); //NodeList [div.child1.blue]

//end():返回上一级
// $('.dom1').find('.child1').addClass('blue').end().addClass('orange');  //dom1被添加了orange类名
// $('.dom1').print(); //NodeList [div.dom1.orange]

//each():为每个元素添加一个回调函数
// $('.dom1').find('.child1').each((node) => {
//   console.log(node);
// });  //<div class="child1">child1</div>

//print() & parent():查找父节点
// $('.child1').parent().print();  //[div.dom1]

//children():查找子节点
// $('.dom1').children().print();  //[div.child1, div.child2]

//siblings():查找兄弟节点
// $('.child1').siblings().print(); //[div.child2, div.child3]

//index()
//previous()
//next()

//新增
//appendTo()

//remove()
//empty()

//text()
//html()
//attr()
//css()
//on()
//off()