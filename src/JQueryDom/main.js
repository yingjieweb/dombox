//return api
window.jQuery('.dom1');  //jQuery 为全局变量，window 可省略。返回一个 api 对象，该对象可操作当前 .dom 元素
window.jQuery('.dom1').print();  //NodeList [div.dom1]。 print 函数也返回一个 api 对象，这样即可一直链式调用下去

//addClass():添加class属性
//jQuery('.dom1').addClass('red'); //以dom1为类名的元素被添加了red类名

//find():找当前元素的孩子
//jQuery('.dom2').find('.child1').addClass('blue');  //dom2>chicken的元素被添加了blue类名

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

