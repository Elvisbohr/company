// JavaScript Document
window.onload = function(){
	$(".marketing").addClass("active");
	$(".heightHun").each(function(index, element) {
	   var oP = $(this).parent();
	   $(this).height(oP.height());
	});
	//将Canvas的宽高设定成其父元素的宽高，以充满他的父元素。也可以直接使用
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		canvas.width = canvas.parentNode.offsetWidth;
  		canvas.height = canvas.parentNode.offsetHeight;
		// 让矩形动起来。要做动画我们需要持续的清空画布并重新绘制新的矩形，就像电影每秒播放24张图片。我们新建一个loop函数，用来绘制每一帧的图像，并使用requestAnimFrame来告诉浏览器每一帧都要使用loop来绘制。
		//如果浏览器支持requestAnimFrame则使用requestAnimFrame否则使用setTimeout
		//loop();
		// 接下来我们更改每一帧中的矩形的高度来模拟波浪的形态，波浪其实是在波峰与波谷之间做周期性运动。我们假设波峰与波谷间都是50px，那么矩形的高度的变化值应该在-50px到50px之间。为了达到周期性的效果我们采用正弦函数sin(x)，因为不管x值怎么变化sin(x)的值始终在-1与1之间。我们新建一个变量 var step =0 使其在每一帧中自增，表示每一帧角度增加一度，并用Math.sin()取他的正弦值。JS中的sin使用的弧度值，我们需要把step转换成弧度值,var angle = step*Math.PI/180; 取角度的正弦值乘以50得到了矩形高度的变化量。将变化量加在矩形的左上与右上两个顶点的y坐标上。
		//初始角度为0
		 var step = 0;
		 //定义三条不同波浪的颜色
		  function loop(){
			  var lines = ["rgba(22,159,70, 0.7)", "rgba(84,184,109, 0.6)", "rgba(97,189,113, 0.3)"];
		   ctx.clearRect(0,0,canvas.width,canvas.height);
		   step++;
		   //画3个不同颜色的矩形
		   for(var j = lines.length - 1; j >= 0; j--) {
			 ctx.fillStyle = lines[j];
			 //每个矩形的角度都不同，每个之间相差45度
			 var angle = (step+j*45)*Math.PI/180;
			 var deltaHeight = Math.sin(angle) * 50;
			 var deltaHeightRight = Math.cos(angle) * 50;
			 ctx.beginPath();
			 ctx.moveTo(0, canvas.height/2+deltaHeight);
			 ctx.bezierCurveTo(canvas.width /2, canvas.height/2+deltaHeight-50, canvas.width / 2,         canvas.height/2+deltaHeightRight-50, canvas.width, canvas.height/2+deltaHeightRight);
			 ctx.lineTo(canvas.width, canvas.height);
			 ctx.lineTo(0, canvas.height);
			 ctx.lineTo(0, canvas.height/2+deltaHeight);
			 ctx.closePath();
			 ctx.fill();
		  }
		 }
		 window.setInterval(function(){
			 loop()
		},30);
}
