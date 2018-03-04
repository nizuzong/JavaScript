<?php
//header("Access-Control-Allow-Origin:*");

$base64 = $_POST["img"];//压缩后的图片
$file = base64_decode($base64);//图片格式
$name = "uploads/" .time(). ".jpg";
file_put_contents($name, $file);
$arr = array('code'=>1, 'msg'=>'上传成功', 'url'=>$name);

echo json_encode($arr);

?>
