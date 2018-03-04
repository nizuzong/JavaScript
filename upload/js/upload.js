function Upload(opt){
    var def = {
      url:'upload.php',
    	container:'.pic-list',
    	file:"#file",
    	size:2,
      callback:null
    };
    var settings = this.extend({}, def, opt);
    this.settings = settings;
    this.init();	
}
Upload.prototype={
		constructor:Upload,
		init : function(){
			this.file = typeof this.settings.file === 'string' ? document.querySelector(this.settings.file) : this.settings.file;
            this.bindEvent();
            this.size = this.settings.size;
            this.list = document.querySelector(this.settings.container);
            this.url = this.settings.url;
    },
    bindEvent:function(){
           var that=this;
           this.file.addEventListener('change', function () {
               var files = this.files;
               var type = files[0].type;
               var size = files[0].size;
               // console.log(type+','+size)
               var error = "";

              if(type.indexOf('image/') !== 0){
                 error = '请上传正确的图片格式的文件';

              }else if(size > that.size * 1024 * 1024){
                 error('请上传小于' + that.size + 'M的图片')
              }
              if(error){
                alert(error);
                return false;
              }
              that.showLoading();

                that.ImgToBase64(files[0],720,2,function(img){
                    that.ajax(that.url,{'img':img},function(rs){
                        var json = eval('('+ rs +')');
                        if(json.url){
                           that.settings.callback && that.settings.callback(json.url);
                        }
                    });
                })
           });    
    },
           

		showLoading:function(){
            var node = document.createElement('li');
            node.innerHTML = '<img src = ""/>';
            this.list.insertBefore(node,this.list.lastElementChild);
           

		},
	  //压缩图片
    ImgToBase64:function(file, maxLen, scale, callBack) {
        var img = new Image();
        var reader = new FileReader();//读取客户端上的文件
        reader.onload = function () {
            var url = reader.result;//读取到的文件内容.这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的.所以必须使用reader.onload，
            img.src = url;//reader读取的文件内容是base64,利用这个url就能实现上传前预览图片
        };
        img.onload = function () {
           //生成比例
           var width = img.width, height = img.height;
           //计算缩放比例
           var rate = 1;
           if (width >= height) {
               if (width > maxLen) {
                   rate = maxLen / width;
               }
           } else {
               if (height > maxLen) {
                   rate = maxLen / height;
               }
           };
           img.width = width * rate;
           img.height = height * rate;
           //生成canvas
           var canvas = document.createElement("canvas");
           var ctx = canvas.getContext("2d");
           canvas.width = img.width;
           canvas.height = img.height;
           ctx.drawImage(img, 0, 0, img.width, img.height);
           var base64 = canvas.toDataURL('image/jpeg', scale).substring(22);
           callBack(base64)
       };
       reader.readAsDataURL(file);
  },
    

    ajax:function(url,data,callback){
         var xhr = new XMLHttpRequest();
         xhr.open('post',url,true);
         xhr.onreadystatechange = function(){
             if(this.readyState == 4 && this.status === 200){
                 callback && callback(this.responseText);
             }
         }
         xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
         if(typeof data === 'object'){
             var str='';
             for(let k in data){
                 str += k + '=' + data[k] + '&';
             }
             data = str.slice(0,-1);
         }
         xhr.send(data);
    },
		extend:function(){
			for(let i = 0; i < arguments.length; i++){
                 for(let k in arguments[i]){
                    arguments[0][k] = arguments[i][k];
                 }
			}

			return arguments[0];
		}
}