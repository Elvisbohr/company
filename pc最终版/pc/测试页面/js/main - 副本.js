// JavaScript Document
(function(){
	// banner-start
var oSlideItem,slideNum,oPagesA,oSlideWrap;
var slideFun = {
		/* slide初始化 */
		init : function(){
			oSlideItem = $('.slide-wrapper .slide-item');
			
			slideNum = oSlideItem.length;
			oPagesA = $('.pages a');
			for(var s = 0; s < slideNum; s++){
				//背景图
				$(oSlideItem[s]).find(".bg").css('background-image','url(./img/banner'+ (s+1) +'.jpg)');
				//a的下标
				$(oPagesA[s]).attr('data-num',s);
			}	
		},
		/*
		slide切换 
		oSlideItem:slide-item object
		oPagesA:pages->a object
		num:下标 number
		 */
		turnSlide : function(num){
			//slide的切换
			$(oSlideItem).removeClass("cur");
			//$(oSlideItem[num]).fadeIn();
			$(oSlideItem[num]).addClass("cur");
			//页码的切换
			oPagesA.removeClass('cur');
			$(oPagesA[num]).addClass('cur');
		},
		/* 定时器 */
		timerOn : function(){
			var oldNum = parseInt($('.pages a.cur').attr('data-num')),
				nowNum = oldNum + 1;
			if(nowNum >= slideNum){
				nowNum = 0;
			}
			this.turnSlide(nowNum);
		},
		/* 彩线 */
		lineOn : function(){
			$(".gradual_line .roll_line").removeClass("rollLineAni");
			/* $(".gradual_line .roll_line").css({"left":"-100%","transition":"all 0s"}); */
			setTimeout(function(){
				//$(".gradual_line .roll_line").css({"left":"0","transition":"all linear 8.3s"});
				$(".gradual_line .roll_line").addClass("rollLineAni");
			},200);
		}
	}
	slideFun.init();
	/* pages */
	oPagesA.click(function(e){
		var curNum = $(this).attr('data-num');
		slideFun.lineOn();
		slideFun.turnSlide(curNum);
		window.clearInterval(t);
		t = window.setInterval(function(){
			slideFun.timerOn();
		},8300);
	})
	
	var t = window.setInterval(function(){
		slideFun.timerOn();
		slideFun.lineOn();
	},8300);
	
	/* oSlideWrap = $('.slide-wrapper');
	oSlideWrap.mouseenter(function(){
		window.clearInterval(t);
	})
	oSlideWrap.mouseleave(function(){
		slideFun.lineOn();
		t = window.setInterval(function(){
			slideFun.timerOn();
		},8300); 
	})*/
	//侧栏
	$(".menu .menu_icon").click(function(){
		var className = $(this).attr("class");
		if(className.indexOf("close") < 0){
			$(this).addClass("close");
			$(".sidebar").css({"right":"0"});
			$(".menu_right .menu_txt .menu").css({"opacity":"0"});
			$(".menu_right .menu_txt .close").css({"opacity":"1"});
		}else{
			$(this).removeClass("close");
			$(".sidebar").css({"right":"-319px"});
			$(".menu_right .menu_txt .menu").css({"opacity":"1"});
			$(".menu_right .menu_txt .close").css({"opacity":"0"});
		}
		//
	})
	$(".sidebar .close i").click(function(){
		$(".sidebar").css({"right":"-319px"});
	})
	$(".footer_arrow").mouseenter(function(){
		$(".footer").css({"bottom":"0"});
	})
	$(".footer").mouseleave(function(){
		$(".footer").css({"bottom":"-240px"});
	})
	
	
	$(".turn .prev").click(function(){
		turn("prev");
	})
	$(".turn .next").click(function(){
		turn("next");
	})
	
	//切换
	function turn(action){
		var oldIndex = parseInt($(".main .page.active").attr("data-num")),actIndex,
			pageCount =$(".page_box .page").length ;
		switch(action){
			case "prev":
				actIndex = oldIndex - 1
				if(actIndex > 0){
					editPage(actIndex);
				}
				break;
			case "next":
				actIndex = oldIndex + 1;
				if(actIndex <= pageCount){
					editPage(actIndex);
				};
				break;
		}
		if(actIndex <=1){
			$(".prev").addClass("no_turn");
		}else{
			$(".prev").removeClass("no_turn");
		}
		if(actIndex >= pageCount){
			$(".next").addClass("no_turn");
		}else{
			$(".next").removeClass("no_turn");
		}
	}
	//对page的操作
	function editPage(index){
		$(".main .page").removeClass("active");
		$(".main .page"+ index +"").addClass("active");
		console.log(".main .page"+ index +"");
	}
	

})()