window.onload = function(){
	
	waterfall("main","box");
	//封装函数==》实现2次调用, 页面加载时一次，  滚动时一次
	
	var data = {
		
		init:[
			
			{"src":"0.jpg"},
			{"src":"1.jpg"},
			{"src":"2.jpg"},
			{"src":"3.jpg"},
			{"src":"4.jpg"},
			{"src":"5.jpg"},
			{"src":"6.jpg"},
			{"src":"7.jpg"},
			{"src":"8.jpg"},
			{"src":"9.jpg"},
			{"src":"10.jpg"},
			{"src":"11.jpg"},
			{"src":"12.jpg"},
			{"src":"13.jpg"},
			{"src":"14.jpg"},
			{"src":"15.jpg"},
			{"src":"16.jpg"},
			{"src":"17.jpg"},
			{"src":"18.jpg"}

		]
		
	};
	
	
	window.onscroll = function(){		
		if(scrollTop){			
			for(var i=0;i<data.init.length;i++){				
				var main = document.getElementById("main");
				var oDiv = document.createElement("div");
				main.appendChild(oDiv);
				oDiv.className = "box";				
				var oPic = document.createElement("div");
				oDiv.appendChild(oPic);
				oPic.className = "pic";				
				var imgs = document.createElement("img");
				oPic.appendChild(imgs);
				imgs.src = "img/"+data.init[i].src+"";				
			}
		}
		waterfall("main","box");
	}
	
}
function scrollTop(){	
	var oParent = document.getElementById("main");
	var oBox = getClassName(oParent,"box");
	var oBoxTop = Math.floor(oBox[oBox.length-1].offsetTop+oBox[oBox.length-1].offsetHeight/2);
	var top = document.documentElement.scrollTop ||  document.body.scrollTop;
	var height = document.documentElement.clientHeight ||  document.body.clientHeight;	
	if(oBoxTop<top+height){
		return true;
	}else{
		return false;
	}
	
	
}
function waterfall(parent,box){	
	var oParent = document.getElementById(parent);
	var oBox = getClassName(oParent,box);
	var oBoxW = oBox[0].offsetWidth;
	var num = Math.floor(document.documentElement.clientWidth / oBoxW);
	oParent.style.cssText ="margin:0 auto;width:"+num*oBoxW+"px;";	
	var hrr = [];	
	for(var i=0;i<oBox.length;i++){		
		if(i<num){
			hrr.push(oBox[i].offsetHeight);
		}else{			
			var oBoxMin = Math.min.apply(null,hrr);
			var oBoxIndex = inArray(hrr,oBoxMin);		
			oBox[i].style.position = "absolute";
			oBox[i].style.top = oBoxMin+"px";
			oBox[i].style.left = oBoxIndex*oBoxW+"px";				
			hrr[oBoxIndex] += oBox[i].offsetHeight;
	
		}
	
	}

}

function inArray(arr,min){	
	for(var i in arr){
		if(arr[i]==min){
			return i;
		}
	}
}


function getClassName(parent,box){	
	var oBox = parent.getElementsByTagName("*");
	var arr = [];	
	for(var i=0;i<oBox.length;i++){		
		if(oBox[i].className == box){	
			arr.push(oBox[i]);	
		}
	}
	return arr;
}