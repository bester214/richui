
//分享的内容参数列表:
var imgUrl_sina = '';//新浪微博的配图
var content_sina = '';//新浪微博分享的文案
var title_weixin = '';//微信和朋友圈的标题
var imgUrl_weixin = '';//微信和朋友圈的配图 最大32k
var content_weixin = '';//微信和朋友圈的内容
var link_weixin = '';//微信和朋友圈的链接
var content_message = '';//短信的内容
var link_weixin_wp = '';
var ua = navigator.userAgent.toLowerCase();
var updateFlag = true;
var channel = "";
var activityName = "";

var link = $('<link>')
	link.attr('rel','stylesheet');
	link.attr('type','text/css');
	link.attr('href','css/share.css');
	$('head').append(link);


function share() {
	
	if(is_android()){
		if (typeof window.zjsjyyt == "object" && window.zjsjyyt != null) {
			versionid_and = window.zjsjyyt.get("versionid");//获取版本号 1.7.x string
			if(typeof versionid_and == 'string'&&versionid_and != null){
				
		
			}else{  
				$(".j-upDateBox").show();
				// 取消升级
				$(".appUpdate").click(function(){
					applink(); 
				});
				updateFlag =  false;
			}
		}
	}
	if(is_iphone()){ 
		versionid_ios();
	}
	
	if(updateFlag){
		//$(".j-closeShare").show();
		$("body").append(
			"<div id='zhezhao'></div>"
			+ "<div id='shareBox'>"
			+ "<h1>分享到</h1>"
			+ "<div class='shareIcons'><span class='j-wx'><i></i><b>微信好友</b></span><span class='j-wxq'><i></i><b>微信朋友圈</b></span><span class='j-wb'><i></i><b>新浪微博</b></span><span class='j-xx'><i></i><b>短信好友</b></span></div>"
			+"<div class='warmhint'>温馨提示：如分享存在问题，请将app升级到最新版本</div>"
			+ "<div class='closeShare j-closeShare'>取消分享</div>"
		);
		$(".j-closeShare").click(function() {
			//$(".j-closeShare").hide();
				$("#zhezhao,#shareBox").remove();
		});
		// var shareNum;
		// shareNum = 2;
		// if(shareNum == 2){
		// 	$(".j-wb,.j-xx").hide();
		// }
	
		//分享朋友圈（wp）wp的图片需手动转换成base64格式
		var friends_wp_content = {
			title : title_weixin,//需要赋值为分享的标题
			description : content_weixin, //需要赋值为分享的内容
			image : link_weixin_wp,
			url : link_weixin
		}
	
		// app端提供的分享方案
		
		var operStr_friends = JSON.stringify(friends_wp_content);
		var jsonObj_friends = {
			operType : 'shareFriendCircleByWeb',
			operStr : operStr_friends,
			callback : ''
		};
		//分享到微信(wp)
		var operStr_weixin = JSON.stringify(friends_wp_content);
		var jsonObj_weixin = {
			operType : 'shareWeChat',
			operStr : operStr_weixin,
			callback : ''
		};
	
		//调用短信分享（wp）
		var jsonObj_message_content=
		{
		    phone:"",//手机号为空
		    description: content_message, //需要赋值为分享的内容
		}
		var operStr_message = JSON.stringify(jsonObj_message_content); 
		var jsonObj_message =
		{
		    operType:'SMSShare',
		    operStr: operStr_message,
		    callback:''
		};
		//获取版本号(wp)
		var jsonObj_version =
		{
		    operType:'getVersion',
		    operStr: '',
		    callback:'getVersionCallback'
		};
		
		if(is_wp()){
			window.external.notify(JSON.stringify(jsonObj_version));
		}
	
		//不传号码 只传内容
		$('#shareBox .j-xx').click(function(){ 
			
	        if(is_android()){ // message1 为安卓系统自带的发短信功能 message2 为对话框形式
	            window.stub.jsMethod('com.zjmobile.app.message1','4',content_message);
	        }
		    
			if(is_iphone()){ 
				message_ios_share();
			}
			if(is_wp()){ 
				window.external.notify(JSON.stringify(jsonObj_message)); 
			}
			
			shareCount(channel, 'xx', activityName);
		})
	
		$('#shareBox .j-wx').click(function(){ 
		
	        if(is_android()){ 
	            window.stub.jsMethod('com.zjmobile.app.weixin','4',title_weixin+'&&&'+imgUrl_weixin+'&&&'+content_weixin+'&&&'+link_weixin);
	        }
			if(is_iphone()){ 
				weixin_ios_share();
			}
			if(is_wp()){ 		
				window.external.notify(JSON.stringify(jsonObj_weixin)); 
			}
		
			shareCount(channel, 'wxhy', activityName);
		})
		$('#shareBox .j-wxq').click(function(){ 
			
	        if(is_android()){ 
	            window.stub.jsMethod('com.zjmobile.app.friends','4',content_weixin+'&&&'+imgUrl_weixin+'&&&'+content_weixin+'&&&'+link_weixin);
	        }
			if(is_iphone()){ 
				friends_ios_share();
			}
			if(is_wp()){ 
				window.external.notify(JSON.stringify(jsonObj_friends));
			}
			
			shareCount(channel, 'wxpyq', activityName);
		})
		$('#shareBox .j-wb').click(function(){ 
			
	        if(is_android()){ 
	            window.stub.jsMethod('com.zjmobile.app.sina','4',content_sina+'&&&'+imgUrl_sina);
	        }
			if(is_iphone()){ 
				weibo_ios_share();
			}
			if(is_wp()){ 
				// alert('weibo is on the way')
		        window.external.notify(JSON.stringify(jsonObj_weibo));
			}
			
			shareCount(channel, 'xlwb', activityName);
		})
	}
}

//短信分享(ios)
function message_ios_share(){ 
    var json ='{"function":"displaySMSComposerSheetWithPhone:","argument":"'+content_message+'","callback":""}';
       
    webPostnotification(json);	
}
//微信好友的分享(ios)
function weixin_ios_share(){ 
    var json ='{"function":"showWXFriendsView:","argument":"'+title_weixin+'&&&'+imgUrl_weixin+'&&&'+content_weixin+'&&&'+link_weixin+'","callback":""}';    
    webPostnotification(json);	
}
//微信朋友圈的分享(ios)
function friends_ios_share(){ 
    var json ='{"function":"showWXFriendCircleView:","argument":"'+content_weixin+'&&&'+imgUrl_weixin+'&&&'+content_weixin+'&&&'+link_weixin+'","callback":""}';     
    webPostnotification(json);	
}
//新浪微博的分享(ios)
function weibo_ios_share(){ 
    var json ='{"function":"xinlangWeiboShareButtonPressed:","argument":"'+content_sina+'&'+imgUrl_sina+'","callback":""}';
          
    webPostnotification(json);	
}
//版本号判断
function versionid_ios(){       
    var json ='{"function":"getVersionNumOfAPP:","argument":"","callback":"versionid_ios_cbk"}';
    webPostnotification(json);
}
function webPostnotification(func){
    document.location ="webkitpostnotification:"+func;
   
}
function versionid_ios_cbk(info){//info为版本号 string
   	 updateFlag = true;
}
function getVersionCallback(){ 
	$('.j-share').show();
}
function is_android(){
    if(ua.match(/android/i)=="android") {
        return true;
     } else {
        return false;
    }
}
function is_iphone(){
    if(ua.match(/iphone/i)=="iphone") {
        return true;
     } else {
        return false;
    }
}
function is_wp(){
    if(ua.match(/iemobile/i)=="iemobile") {
        return true;
     } else {
        return false;
    }
}
function is_qq(){//qq客户端 
    if(ua.match(/qq\//i)=="qq/") {
        return true;
     } else {
        return false;
    }
}
function is_weixin(){
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
function is_weibo(){
    if(ua.match(/Weibo/i) == "weibo"){
        return true;
    }else{
        return false;
    }
}

function is_chrome(){
    if(ua.match(/Chrome/i) == "chrome"){
        return true;
    }else{
        return false;
    }
}
function is_baidu(){
    if(ua.match(/baidu/i) == "baidu"){
        return true;
    }else{
        return false;
    }
}
function is_uc(){
    if(ua.match(/uc/i) == "uc"){
        return true;
    }else{
        return false;
    }
}
function is_360(){
    if(ua.match(/360/i) == "360"){
        return true;
    }else{
        return false;
    }
}


//唤醒app
function customClickEvent() {
    var clickEvt;
    if (window.CustomEvent) {
        clickEvt = new window.CustomEvent('click', {
            canBubble: true,
            cancelable: true
        });
    } else {
        clickEvt = document.createEvent('Event');
        clickEvt.initEvent('click', true, true);
    }

    return clickEvt;
}


function applink(){
  if(is_android()){
    if(is_weixin()||is_qq()){
        window.location = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.example.businesshall'; 
    }else if(is_baidu()){ 
       window.location = 'intent://platformapi/startapp?#Intent;package=com.example.businesshall;scheme=zjmobile;end;';
       var clickedAt = +new Date;  
         setTimeout(function(){
             !window.document.webkitHidden && setTimeout(function(){ 
                   if (+new Date - clickedAt < 2000){  
                       window.location = 'http://app.m.zj.chinamobile.com/zjweb/';  
                   }  
             }, 500);       
         }, 500) 
    }else if(is_uc()||is_360()){ 
       window.location = 'zjmobile://platformapi/startapp';
       var clickedAt = +new Date;  
         setTimeout(function(){
             !window.document.webkitHidden && setTimeout(function(){ 
                   if (+new Date - clickedAt < 2000){  
                       window.location = 'http://app.m.zj.chinamobile.com/zjweb/';  
                   }  
             }, 500);       
         }, 500)          
    }else{   
    // android 下 chrome 浏览器通过 谷歌内核特有 intent 协议唤起
        var intentUrl = 'intent://platformapi/startapp?#Intent;package=com.example.businesshall;scheme=zjmobile;end;';

        var openIntentLink = document.getElementById('openIntentLink');
        if (!openIntentLink) {
            openIntentLink = document.createElement('a');
            openIntentLink.id = 'openIntentLink';
            openIntentLink.style.display = 'none';
            document.body.appendChild(openIntentLink);
        }
        openIntentLink.href = intentUrl;
        // 执行click
        openIntentLink.dispatchEvent(customClickEvent());
        window.location = 'http://app.m.zj.chinamobile.com/zjweb/';  

    }
     } 
  if(is_iphone()){
    if(is_qq()||is_weibo()){
      window.location = 'https://itunes.apple.com/us/app/zhe-jiang-yi-dong-shou-ji/id898243566'; 
    }else if(is_weixin()){
      window.location = 'http://app.m.zj.chinamobile.com/zjweb/';
    }else{ 
      window.location = 'zjmobile://RootViewController'; 
        var clickedAt = +new Date;  
         setTimeout(function(){
             !window.document.webkitHidden && setTimeout(function(){ 
                   if (+new Date - clickedAt < 2000){  
                       window.location = 'https://itunes.apple.com/us/app/zhe-jiang-yi-dong-shou-ji/id898243566';  
                   }  
             }, 500);       
         }, 500) 
       } 
  } 
  if(is_wp()){
    window.location = 'zjmobile://platformapi/startapp';  
    var clickedAt = +new Date;  
    setTimeout(function(){
         !window.document.webkitHidden && setTimeout(function(){ 
               if (+new Date - clickedAt < 2000){  
                   window.location = 'http://www.windowsphone.com/s?appid=c472daf1-0568-4b44-9abd-ead3073d257a';  
               }  
         }, 500);       
    }, 500);
  }
}

//  分享统计, qudao-渠道, type-分享方式, activity-活动编号
function shareCount(qudao, shareTpe, activity){
	
	if(channel!=null && channel!="" && activityName!=null && activityName!=""){
		// 异步请求
		$.ajax({url:basePath+"/share/shareCount.do?r=" + Math.random(),
			type:'post',
			data:{"type":qudao+'-'+shareTpe, "code":activity},
			async:true,// 异步
			timeout:60000,// 超时时间60s
			dataType:'json',// 返回json
			success:function(data){},
			error:function(){}
		});
	}
};
