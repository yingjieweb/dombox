//return api
// window.jQuery('.dom1');  //jQuery 为全局变量，window 可省略。返回一个 api 对象，该对象可操作当前 .dom 元素
// jQuery('.dom1').print();  //NodeList [div.dom1]。 print 函数也返回一个 api 对象，这样即可一直链式调用下去

//addClass():添加class属性
// $('.dom1').addClass('red');  //给 class 为 dom1 的元素添加一个值为 red 的 class 属性，可继续链式调用下去
// $('.dom1').print(); //NodeList [div.dom1.red]

//find():找当前元素的孩子
$('.dom1').find('.child1').addClass('blue');  //dom1 > child1 的元素被添加了blue类名
$('.dom1').find('.child1').print(); //NodeList [div.child1.blue]

//end():返回上一级
//jQuery('.dom3').find('.child1').addClass('blue').end().addClass('orange');  //dom3被添加了orange类名

//each():为每个元素添加一个回调函数
//jQuery('.dom4').find('.child1').each((node)=>{console.log(node)});  //<div class="child1">child1</div>

//print() & parent()
//jQuery('.child1').parent().parent().print();

//children
//jQuery('.dom5').children().print();

//siblings
//jQuery('.dom6').siblings().print();

