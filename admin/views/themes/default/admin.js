var IsMobile = $('#IsMobile').text();
var moWidth = $(document).width()-20;
var moHeight = $(window).height()-60;
$(function(){
	//版本信息
	$('#webmisVersion').webmisVersion();
	//导航菜单
	var NavId = $('#NavId').text();
	var MenuTwoId = $('#MenuTwoId').text();
	menuOne(NavId);
	menuTwo(MenuTwoId,true);
	//显示、隐藏头部
	$('#TopMenus').click(function(){
		if($("#top").is(":hidden")){
			$("#top").slideDown('fast');
		}else{
			$("#top").slideUp('fast');
		}
		return false;
	});
	//显示、隐藏左侧菜单
	$('#LeftMenus').click(function(){
		if($("#tb_left").is(":hidden")){
			$("#tb_left").show();
		}else{
			$("#tb_left").hide();
		}
		return false;
	});
	//全选,全不选
	$('#checkboxY').click(function () {
		$(this).hide();
		$(this).parent().parent().parent().parent().find("input:checkbox").prop("checked", true);
		$('#checkboxN').show().click(function () {
			$(this).hide();
			$('#checkboxY').show();
			$(this).parent().parent().parent().parent().find("input:checkbox").prop("checked", false);
			return false;
		});
		return false;
	});
});
/*点击一级菜单*/
function menuOne(id){
	var title = $('#nav_'+id).text();
	$('#menu_title').text(title);
	//导航样式
	$('#webmis_menu').find('a').attr('class','nav_an2');
	$('#nav_'+id).attr('class','nav_an1');
	//隐藏二级菜单
	$('#menus').find('.menuOne').hide();
	//显示对应菜单
	$('#menuOne_'+id).show().find('div').hover( 
		function () { 
			$(this).attr('class','menu_an_bg2 UI');
		},
		function () { 
			$(this).attr('class','menu_an_bg1 UI');
		}
	);
}
/*点击二级菜单*/
function menuTwo(id,type){
	//显示对应菜单
	var p = $('#menuThree_'+id);
	if(p.is(':hidden')){
		if(type){p.show();}else{p.slideDown('fast');}
		$('#menuTwo_'+id).find('#tu').attr('class','jian UI');
	}else{
		p.slideUp('fast');
		$('#menuTwo_'+id).find('#tu').attr('class','jia UI');
	}
}
/*
** ******动作******
*/
/*删除*/
function actionDel(dataUrl,targetUrl) {
	var id = $('#listBG').webmis('GetInputID',{type:' '});
	if(id!=' '){
		$.webmis.win('open',{title:'删除',width:210,height:140,content:'<div class="delData"><input type="submit" id="delSub" value="彻底删除" /></div>'});
		$('#delSub').webmis('SubClass'); //按钮样式
		//点击提交
		$('#delSub').click(function(){
			$.post($base_url+dataUrl,{'id':id},function(data){
				if(data){
					$.webmis.win('close');
					var url = $('#getUrl').text();
					$.webmis.win('open',{content:'<b class="green">删除成功</b>',target:targetUrl+url,AutoClose:3});
				}else{
					$.webmis.win('close');
					$.webmis.win('open',{content:'<b class="red">删除失败</b>',AutoClose:3});
				}
			});
		});
	}else{
		$.webmis.win('open',{content:'<b class="red">请选择！</b>',AutoClose:3});
	}
}
/*审核*/
function actionAudit(dataUrl,targetUrl) {
	var id = $('#listBG').webmis('GetInputID',{type:' '});
	if(id!=' '){
		$.webmis.win('open',{title:'审核',width:240,height:140,content:'<div class="delData"><input type="submit" id="auditSub1" value="通过" />&nbsp;&nbsp;<input type="submit" id="auditSub2" value="不通过" /></div>'});
		$('#auditSub1,#auditSub2').webmis('SubClass'); //按钮样式
		//通过
		$('#auditSub1').click(function(){
			auditData(id,'1');
		});
		//不通过
		$('#auditSub2').click(function(){
			auditData(id,'2');
		});
	}else{
		$.webmis.win('open',{content:'<b class="red">请选择！</b>',AutoClose:3});
	}
	//提交数据
	var auditData = function(id,state){
		$.post($base_url+dataUrl,{'id':id,'state':state},function(data){
			if(data){
				$.webmis.win('close');
				var url = $('#getUrl').text();
				$.webmis.win('open',{content:'<b class="green">审核成功</b>',target:targetUrl+url,AutoClose:3});
			}else{
				$.webmis.win('close');
				$.webmis.win('open',{content:'<b class="red">审核失败</b>',AutoClose:3});
			}
		});
	}
}