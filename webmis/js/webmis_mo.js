/*
* WebMIS 3.2
* Copyright (c) 灵创网络 http://www.ksphp.com/
* Date: 2013-06-28
* 主要用于封装WebMIS前段样式
*/
/*参数*/
var $base_url = 'http://www.ksphp.com/';
var $webmis_root = '/webmis/';
var $webmis_js = $webmis_root+'js/';
var $webmis_css = $webmis_root+'css/';
var $webmis_plugin = $webmis_root+'plugin/';

$(function(){
	$base_url = $('#base_url').text();			//网址
	$('#webmisVersion').text('WebMIS v4.0');	//版本
/*
** 加载 css,js
*/
	var include = function (options) {
		var defaults = {files: '', doc: 'body'}
		var options = $.extend(defaults, options);
		var files = options.files;
		for (var i=0; i<files.length; i++) {
			var att = files[i].replace(/^\s|\s$/g, "").split('.');
			var ext = att[att.length - 1].toLowerCase();
			var isCSS = ext == "css";
			var tag = isCSS ? "link" : "script";
			var attr = isCSS ? " type='text/css' rel='stylesheet' " : " language='javascript' type='text/javascript' ";
			var link = (isCSS ? "href" : "src") + "='" + files[i] + "'";
			$(options.doc).append("<" + tag + attr + link + "></" + tag + ">");
		}
	}
/*
** 信息提示框
*/
	/*关闭窗口*/
	var closeWin = function (target) {
		$('#WebMisWin').slideUp('fast');
		$('#WebMisWinBg').remove();
		if(target && target!='false'){
			window.location.href = $base_url+target;
		}
		clearInterval(WebMisInt);
	}
	/*打开窗口*/
	var openWin = function (options) {
		var defaults = {
			title:'信息提示',
			width:210,
			height:150,
			content:'<div class="load"><span class="onLoad">&nbsp;</span><span class="text">正在加载</span></div>',
			target:false,
			overflow:false,
			AutoClose:false,
			AlphaBG:0.4
		}
		var options = $.extend(defaults, options);
		//创建
		var creatWinbox=function(){
			var html = '<div id="WebMisWinBg" class="WebMisWinBg">&nbsp;</div>';
			html += '<span id="WebMisWin" class="WebMisWin" style="width:'+options.width+'px;height:'+options.height+'px">';
			html += '  <div id="WebMisWinTop" class="WebMisWin_top">';
			html += '    <span class="title">'+options.title+'</span>';
			html += '    <a href="#" class="close">&nbsp;</a>';
			html += '  </div>';
			html += '  <div class="WebMisWin_ct">'+options.content+'</div>';
			html += '</span>';
			//加载信息框
			$('#WebMisWin').remove();
			$('body').prepend(html);
			//点击关闭窗口
			$('#WebMisWin .close').click(function(){
				closeWin(options.target);
				return false;
			});
			//ESC键关闭
			$(document).keydown(function(e){
				if(e.which == 27){closeWin(options.target);}
			});
			//获取参数
			var winWindt = $(window).width();
			var winHeight = $(window).height();
			var bodyWidth = $(document).width();
			var bodyHeight = $(document).height();
			var Win = $('#WebMisWin');
			//计算垂直居中位置
			var mleft = (winWindt-Win.width())/2-10;
			var mtop = (winHeight-Win.height())/2;
			//限制顶部
			if(mtop < 10){mtop = 10;}
			//显示信息框
			Win.css({'left':mleft+"px",'top':mtop+"px"}).slideDown('fast');
			$('#WebMisWinBg').css({'width':bodyWidth+"px",'height':bodyHeight+"px"}).fadeTo("slow",options.AlphaBG);
		}

		//提示框类型
		if(options.overflow){
			options.content = '<div id="WebMisWinCT" style="width: 100%; height: '+(options.height-55)+'px; overflow: auto;">'+options.content+'</div>';
		}else if(options.AutoClose){
			options.content = '<div style="line-height: 30px; text-align: center; padding-top: 10px;">'+options.content;
			options.content += '<br /><span style="color: #666;"><b id="WebMisWinIntNum" class="red">&nbsp;</b> 秒后自动关闭</span>';
			options.content += '</div>';
			//开始倒计时
			WinInterval(options.AutoClose,options.target,'#WebMisWinIntNum');
		}else{
			options.content = '<div id="WebMisWinCT">'+options.content+'</div>';
		}
		creatWinbox();
	}
	/*加载内容*/
	var loadWin = function (data) {
		$('#WebMisWinCT').html(data);   //加载内容
	}
	/*添加选项卡*/
	var addWinMenu = function (options) {
		var defaults = {change: '#winTopMenuBody', menus: ['选项卡1','选项卡2','选项卡3']}
		var options = $.extend(defaults, options);
		//添加选项
		var menu = options.menus;
		var html = '<span id="WebMisTopMenu" class="WebMisTopMenu">';
		var an = 'an1';
		for (var i=0; i<menu.length; i++) {
			if (i!=0) {an = 'an2';}
			html += '<a herf="#" class="'+an+'" num="'+i+'">'+menu[i]+'</a>';
		}
		html += '</span>';
		$('#WebMisWinTop').append(html);
		//添加事项
 		$('#WebMisTopMenu a').click(function() {
			var num = $(this).attr('num');
			var n = 0;
			//初始化
			$('#WebMisTopMenu a').each(function(){
				$(this).attr('class','an2');
				$(options.change+n).hide();
				n++;
			});
			//改变
			$(this).attr('class','an1');
			$(options.change+num).show();
		});
	}
/*
** WebMis UI插件
*/
	$.fn.webmis = function (effect,options) {
		var $this = this;

		/* 表格隔行换色 */
		var TableOddColor = function (options) {
			var defaults = {oddClass:'TableTrBg1',overClass:'TableTrBg2'}
			var options = $.extend(defaults, options);
			//隔行变色
			$this.children('tr:odd').addClass(options.oddClass);
			//鼠标经过样式变化处
			$this.children('tr').hover(
				function () { 
					$(this).addClass(options.overClass);
				},
				function () { 
					$(this).removeClass(options.overClass);
				}
			);
		}

		/* 命名空间 */
		switch (effect){
			case 'AutoSelect':
				AutoSelect(options);
			break;
			case 'GetInputID':
				return GetInputID(options);
			break;
			case 'SubClass':
				SubClass(options);
			break;
			case 'TableOddColor':
				TableOddColor(options);
			break;
			case 'TableAdjust':
				TableAdjust();
			break;
		};
	}
/*
** 命名空间
*/
	$.webmis={
		inc: include,
		win: {open: openWin, load: loadWin, close: closeWin, menu: addWinMenu},
		test: function () {alert('test');}
	};
});
/*
** 倒计时信息提示
*/
var WebMisInt,WebMisTime;
function WinInterval(time,target,numID){
	WebMisTime = time;
	WebMisInt = setInterval("WinIntervalFun('"+target+"','"+numID+"')",1000);
}
function WinIntervalFun(target,numID){
	if (WebMisTime == 0) {
		$.webmis.win.close(target);
		clearInterval(WebMisInt);
	}
	$(numID).text(WebMisTime);
	WebMisTime--;
}