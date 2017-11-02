
//封装pageX Y的方法，兼容IE的
function getPage(ev){
          var e = ev||window.event;
          var x1 = e.pageX;
          var y1 = e.pageY;
          var pop ={x:0,y:0};
          pop.x=x1;
          pop.y=y1;
          if(x1===undefined){
               x1=e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);
          }
          if(y1===undefined){
               y1=e.clientY+(document.documentElement.scrollTop||document.body.scrollTop);
          }
          return pop;
          }
//滚轮事件，兼容火狐
/*document.onmousewheel=function(){//除火狐以外的滚轮事件
    alert(1);
}*/
//兼容火狐的
/*if(document.addEventListener){
     document.addEventListener("DOMMouseScroll",function(){
     alert("滚轮");
     },false)
}*/



//封装标准浏览器和火狐浏览器的滚轮事件
     function mousewhell(e){
          var e=e||window.event;
          var bool;
          if(e.wheelDelta){//标准浏览器大于零向上，小于零向下
               bool=e.wheelDelta>0?true:false;
          }else{
               bool=e.detal<0?true:false;//火狐浏览器大于零向下，小于零向上
          }
          if(bool){
               alert("向上")
          }else{
               alert("向下")
          }
     }



//封装hasClass函数
          function hasClass(objtag,cName){
               //按空格转换为数组
           var arr = objtag.className.split(/\s+/);
           bool = -1;
           //遍历数组
           for(var i=0;i<arr.length;i++){
               //如果他中有查找的类，返回下标
               if(arr[i]==cName){
                    bool=i;
                    break;
               }
           }
           //如果他中没有查找的类，返回-1
           return bool;
          }



//封装一个添加类的方法          
     function addClass(objtag,cName){
               //按空格转换为数组
           var arr = objtag.className.split(/\s+/);
           //当查找没有要插入的类的时候
           if(hasClass(objtag,cName)==-1){
               //把需要插入的类压入数组
               arr.push(cName);
               //把数组转化为字符串，并让他的class名等于这个
               objtag.className=arr.join(" ");
           }
           return objtag.className
          }



//封装一个删除类的函数
          function removeClass(objtag,cName){
               //按空格转换为数组
           var arr = objtag.className.split(/\s+/);
           //当查找到要插入的类的时候
           if(hasClass(objtag,cName)!=-1){
               //删除查找到的类
               arr.splice(hasClass(objtag,cName),1);
               //把数组转化为字符串，并让他的class名等于这个
               objtag.className=arr.join(" ")
           }
           return objtag.className;
          }


 //封装一个类名的方法         
         function getElementsByClassName(objtag,cName){
               //获取到所以查找的
         var elements = document.getElementsByTagName(objtag);
         var arr=[];
         //遍历div 
         for(var i=0;i<elements.length;i++){
          //如果有要查找的类，压入空数组
          if(hasClass(elements[i],cName)!=-1){
               arr.push(elements[i]);
          }
         }
         return arr;
          }


//封装ID方法
          function $(id){
               return document.getElementById(id)
          }


//封装添加在节点后面的方法
          function insertAfter(newNode,target){
               //当追加在最后一个元素时：
          if(target.parentNode.lastChild==target){
               target.parentNode.appendChild(newNode);
          }else{
               target.parentNode.insertBefore(newNode,target.nextSibling)
          }
          }


//封装一个阻止事件默认行为的
function preven(e){
               if(e){
                    e.preventDefault();
               }else{
                    window.event.returnValue=false;
               }
          }


//阻止冒泡的封装方法
     function stopBubble(e){
          if(e.stopPropagation){
               e.stopPropagation();                                                                  
          }else{
               window.event.cancelBubble=true;
          }
     }



//封装事件处理程序添加事件
     function addEvent(obj,type,fn){
          if(obj.addEventListener){
               obj.addEventListener(type,fn,false);
          }else if(obj.attachEvent){
               obj.attachEvent("on"+type,fn);
          }else{
               obj["on"+type]=fn;
          }
     }



//封装事件处理程序删除事件
     function removeEvent(obj,type,fn){
          if(obj.removeEventListener){
               obj.removeEventListener(type,fn,false);
          }else if(obj.detachEvent){
               obj.detachEvent("on"+type,fn);
          }else{
               obj["on"+type]=null;
          }
     }


//封装获取style中样式的函数
function getStyle(dom,attr){
   if(getComputedStyle(dom,null)){
     getComputedStyle(dom,null)[attr];
   }else{
     dom.currentStyle[attr];
   }
}


    //鼠标在可视区域内的拖拽 不兼容非标准IE
    function clientDrag(obj){
    obj.onmousedown=function(ev){
    ev=ev || event; //事件对象
    var ms_b=ev.clientX-obj.offsetLeft; 
    var ms_t=ev.clientY-obj.offsetTop;
    document.onmousemove=function(ev){
        ev=ev || event; //事件对象
        var currX=ev.clientX-ms_b; //定义currX的横坐标
        var currY=ev.clientY-ms_t;  //定义currY的纵坐标
        //兼容标准浏览器的宽度
        var Width=document.body.clientWidth || document.documentElement.cilentWidth;
        //兼容标准浏览器的高度
        var Height=document.body.clientHeight || document.documentElement.cilentHeight;
        if(currX<0) {currX=0;} //如果currX小于或等于0
        else if(currX>Width-obj.clientWidth){ //如果currX大于减去可视区的宽度
            currX=Width-obj.clientWidth; //则currX等于剩下的宽度
        }
        if(currY<0) {currY=0;}  //如果currY小于或等于0
        else if(currY>Height-obj.clientHeight){ //如果currY大于减去可视区的高度
            currY=Height-obj.clientHeight; //则currY等于剩下的高度
        }
        obj.style.left=currX +'px'; //输出横坐标
        obj.style.top=currY +'px';  //输出纵坐标
        return false;
    }
    document.onmouseup=function(){
        document.onmousemove=document.onmouseup=null;
    }
}
}