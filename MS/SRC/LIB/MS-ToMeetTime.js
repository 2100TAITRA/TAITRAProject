// 開會時間設定功能模組(桌機版)
// Date		sa		pg		mgr_no		desc
/*1050831	Cloud	cloud	1050087		配合畫面調整，修改程式碼
/*1050906	Cloud	cloud	1050087		時分欄位，增加補至兩碼行為
//1051005	Cloud	Cloud	1050087		修正月份10月顯示異常的問題
//1051019	Cloud	Cloud	1050087		配合PAD環境修改編輯區使用物件調整相關邏輯
//1051025	Cloud	Cloud	1050087		調整時分增加轉換上下午寫入時分
  1081008	Kevin	Joe		1080339		jQuery升級3.4.1
  1090316	David	David	1081102		(客委會)開會時間如為0或空，轉成「整」顯示
  1100115	David	Joe		1091005		開會時間改以系統參數控管整點顯示方式
  1100510	Kevin	David	1100221		支援jQuery3.5.1，調整jQuery.trim用法
  1110215	David	Joe		1110204		新增整點可自行設定顯示內容
  1120901 	Kevin	Joe 	1120709 	弱掃修正Client Potential XSS
*/
var nsEditor = nsEditor||{};

nsEditor.ToMeetTimeSetting = function(dm, $dlg, refreshView)
{
	var gTooMeetTime;
	var gToMeetTimerawXml;
	function fnInit()
	{
		//1090121	Joe		1091005		補上僅可輸入數字欄位的設定
		SetNumOnly('Tomeet_TimeHHItem');
		SetNumOnly('Tomeet_TimeMMItem');
		gToMeetTimerawXml = dm.accquireXml();
		gTooMeetTime = $(dm.accquireXml().documentElement).find("> 開會時間列表").clone();//受文者編輯子視窗異動的受文者清單
		var opt={
			dateFormat:"yy/mm/d/DD"			
		};
		$dlg.find("#Tomeet_DateItem").datepicker(opt);
		if(gTooMeetTime.length!=0)
		{
			var TooMeetTimeNode = gTooMeetTime.find("開會時間");
			var Date;
			var Week;
			var Time;
			//1051019	Cloud	1050087		配合PAD環境修改編輯區使用物件調整相關邏輯
			/*for(var node=0;node<TooMeetTimeNode.length;node++)
			{	
				Date = TooMeetTimeNode.eq(node).find("年月日").text();
				Week = TooMeetTimeNode.eq(node).find("星期").text();
				Time = TooMeetTimeNode.eq(node).find("時分").text();
				
				if(Date+Week+Time!="")
				{
					//$dlg.find("#Tomeet_ItemList").append("<option value='"+Date+"|"+Week+"|"+Time+"'>"+Date+"星期"+Week+Time+"</option>");
					$("<li data-value='"+Date+"|"+Week+"|"+Time+"'>"+Date+"星期"+Week+Time+"</li>").appendTo($dlg.find("#Tomeet_ItemList"));
				}
			}*/
			gTooMeetTime.find("開會時間").each(function(idx, nd) 
			{
				nd = $(nd);
				Date = nd.find("年月日").text();
				Week = nd.find("星期").text();
				Time = nd.find("時分").text();
				//1051025	Cloud	Cloud	1050087		調整時分增加轉換上下午寫入時分
				//1090118	Joe		保留4碼判斷，避免讀取舊稿件只有數字
				if(Time.length==4)//僅有4碼增加轉換
				{
					//1090316 David 1081102 支援客製化功能，上下午轉換只需判斷「時」
					//Time  = MeetChangeTime(Time);
					let hh = Time.substring(0,2);
					let mm = Time.substring(2,4);
					hh = MeetChangeTime(hh);
					//1100115	Joe		1091005		改以系統參數判斷整點顯示方式--S
					let strOClock="";
					//1110215	Joe		1110204		修改直接以系統參數紀錄整點顯示方式--S
					if(theSSO.User.SystemSets.MEETTIME_MINTYPE != "")
						strOClock = theSSO.User.SystemSets.MEETTIME_MINTYPE;
					else
						strOClock = "00分";
					/*
					if(theSSO.User.SystemSets.MEETTIME_MINTYPE == "1")
						strOClock = "整";
					else
						strOClock = "00分";
					*/
					//1110215	Joe		1110204		修改直接以系統參數紀錄整點顯示方式--E
					if(mm == "" || mm == "0" || mm == "00")
						mm = strOClock;
					else
						mm += "分";
					/*
					if(SSO_CONFIG.OrgNickName == "HAC")
					{
						if(mm == "00")
							mm = "整";
						else
							mm += "分";
					}
					else
						mm += "分";
					*/
					//1100115	Joe		1091005		改以系統參數判斷整點顯示方式--E

					Time = hh+mm;
				}
				//1100115	Joe		1091005		當目前記錄格式與系統參數設定值不一致時，以系統參數為主--S
				//1110215	Joe		1110204		修改直接以系統參數紀錄整點顯示方式
				// if((Time.indexOf("00分") != -1 && theSSO.User.SystemSets.MEETTIME_MINTYPE == "1") || (Time.indexOf("整") != -1 && theSSO.User.SystemSets.MEETTIME_MINTYPE != "1"))
				if((Time.indexOf("00分") != -1 && theSSO.User.SystemSets.MEETTIME_MINTYPE != "00分") || (Time.indexOf("整") != -1 && theSSO.User.SystemSets.MEETTIME_MINTYPE != "整"))
				{
					if(Time.indexOf("00分") != -1)
						//1110215	Joe		1110204		修改直接以系統參數紀錄整點顯示方式
						// Time = Time.substring(0,Time.indexOf("00分")) + "整";
						Time = Time.substring(0,Time.indexOf("00分")) + theSSO.User.SystemSets.MEETTIME_MINTYPE;
					else
						//1110215	Joe		1110204		修改直接以系統參數紀錄整點顯示方式
						// Time = Time.substring(0,Time.indexOf("整")) + "00分";
						Time = Time.substring(0,Time.indexOf("整")) + theSSO.User.SystemSets.MEETTIME_MINTYPE;
				}
				//1100115	Joe		1091005		當目前記錄格式與系統參數設定值不一致時，以系統參數為主--E
				if(Date+Week+Time!="")
				{
					//1120901 Joe 1120709 弱掃修正Client Potential XSS
					// $("<li data-value='"+Date+"|"+Week+"|"+Time+"'>"+Date+"星期"+Week+Time+"</li>").appendTo($dlg.find("#Tomeet_ItemList"))
					$("<li data-value='"+HtmlEncode(Date)+"|"+HtmlEncode(Week)+"|"+HtmlEncode(Time)+"'>"+HtmlEncode(Date)+"星期"+HtmlEncode(Week)+HtmlEncode(Time)+"</li>").appendTo($dlg.find("#Tomeet_ItemList"))
					//1081008	Joe		1080339		jQuery升級3.4.1
					// .click(function(evt) {
					.on("click", function(evt) {
						$dlg.find("#Tomeet_ItemList").find("li").removeClass("ui-btn-active").css("background","").css("text-shadow","")
						.css("border","");
						$(this).addClass("ui-btn-active").css("background","#fadb4e").css("text-shadow","0 1px 0 #fff")
						.css("border","none");
					});
				}
				$dlg.find("#Tomeet_ItemList").listview("refresh");
			});
		}
		else
		{
			//1050818	Leslie	協助修改IE支援問題
			//$(dm.accquireXml().documentElement).append("<開會時間列表><開會時間><年月日></年月日><星期></星期><時分></時分></開會時間></開會時間列表>");
			var nodeTimeList = gToMeetTimerawXml.createElement("開會時間列表");
			var nodeTime = gToMeetTimerawXml.createElement("開會時間")
			$(nodeTime).append(gToMeetTimerawXml.createElement("年月日"));
			$(nodeTime).append(gToMeetTimerawXml.createElement("星期"));
			$(nodeTime).append(gToMeetTimerawXml.createElement("時分"));
			$(nodeTimeList).append(nodeTime);
			$(gToMeetTimerawXml.documentElement).append(nodeTimeList);
			//1050818	Leslie	協助修改IE支援問題	--END--
			
			gTooMeetTime = $(dm.accquireXml().documentElement).find("> 開會時間列表").clone();
		}
	}
	//1100510 David 1100221 移除jQuery.trim()，改使用共用方法
	/*function jf_Trim(Object)
	{
		return jQuery.trim(Object);
	}*/

	//加入
		//1081008	Joe		1080339		jQuery升級3.4.1
	// $dlg.find("#Tomeet_addItem").click(function(){
	$dlg.find("#Tomeet_addItem").on("click", function(){
	
		var Date = jf_Trim($dlg.find("#Tomeet_DateItem").val());
		var Week = jf_Trim($dlg.find("#Tomeet_WeekItem").val());
		//1050831	Cloud	cloud	1050087		配合畫面調整，修改程式碼
		//var Time = jf_Trim($dlg.find("#Tomeet_TimeItem").val());
		var hh = jf_Trim($dlg.find("#Tomeet_TimeHHItem").val());
		if(hh=="")
			hh="00";
		//1090316 David 1081102 支援客製化功能，上下午轉換只需判斷「時」
		hh = MeetChangeTime(hh);

		var mm = jf_Trim($dlg.find("#Tomeet_TimeMMItem").val());
		//1100115	Joe		1091005		改以系統參數判斷整點顯示方式--S
		var strOClock="";
		//1110215	Joe		1110204		修改直接以系統參數紀錄整點顯示方式--S
		if(theSSO.User.SystemSets.MEETTIME_MINTYPE != "")
			strOClock = theSSO.User.SystemSets.MEETTIME_MINTYPE;
		else
			strOClock = "00分";
		/*
		if(theSSO.User.SystemSets.MEETTIME_MINTYPE == "1")
			strOClock = "整";
		else
			strOClock = "00分";
		*/
		//1110215	Joe		1110204		修改直接以系統參數紀錄整點顯示方式--E
		if(mm == "" || mm == "0" || mm == "00" || isNaN(mm))
			mm = strOClock;
		else
			mm += "分";
		/*
		//1090316 David 1081102 (客委會)開會時間如為0或空，轉成「整」顯示
		if(SSO_CONFIG.OrgNickName == "HAC")
		{
			if(mm=="" || mm == "0" || mm == "00")
				mm = "整";
			else
				mm += "分";
		}
		else
		{
			if(mm=="")
				mm="00";
			mm += "分";
		}
		*/
		//1100115	Joe		1091005		改以系統參數判斷整點顯示方式--E
		var Time = hh+mm;
		//1051025	Cloud	Cloud	1050087		調整時分增加轉換上下午寫入時分
		//1090316 David 1081102 支援客製化功能，上下午轉換只需判斷「時」，調整邏輯
		//Time  = MeetChangeTime(Time);
		//1051019	Cloud	1050087		配合PAD環境修改編輯區使用物件調整相關邏輯
		//$dlg.find("#Tomeet_ItemList").append("<option value='"+Date+"|"+Week+"|"+Time+"'>"+Date+"星期"+Week+Time+"</option>");
		$("<li data-value='"+Date+"|"+Week+"|"+Time+"'>"+Date+"星期"+Week+Time+"</li>").appendTo($dlg.find("#Tomeet_ItemList"))
				//1081008	Joe		1080339		jQuery升級3.4.1
				// .click(function(evt) {
				.on("click", function(evt) {
					$dlg.find("#Tomeet_ItemList").find("li").removeClass("ui-btn-active").css("background","").css("text-shadow","")
					.css("border","");
					$(this).addClass("ui-btn-active").css("background","#fadb4e").css("text-shadow","0 1px 0 #fff")
					.css("border","none");
				});
		$dlg.find("#Tomeet_DateItem").val("");
		$dlg.find("#Tomeet_WeekItem").val("");
		//1050831	Cloud	1050087		配合畫面調整，修改程式碼
		//$dlg.find("#Tomeet_TimeItem").val("");
		$dlg.find("#Tomeet_TimeHHItem").val("");
		$dlg.find("#Tomeet_TimeMMItem").val("");
		//1051019	Cloud	1050087		配合PAD環境修改編輯區使用物件調整相關邏輯
		$dlg.find("#Tomeet_ItemList").listview("refresh");
	
	});
	//移除
	//1081008	Joe		1080339		jQuery升級3.4.1
	// $dlg.find("#Tomeet_delItem").click(function(){
	$dlg.find("#Tomeet_delItem").on("click", function(){
		//1051019	Cloud	1050087		配合PAD環境修改編輯區使用物件調整相關邏輯
		/*var si = $dlg.find("#Tomeet_ItemList").prop("selectedIndex");
		if(si >= 0) 
		{
			var opts = $dlg.find("#Tomeet_ItemList").prop("options");
			opts.remove(si);
		}*/
		var $si = $dlg.find("#Tomeet_ItemList").find(".ui-btn-active");
		if($si.length > 0) 
		{
			var $u = $si.eq(0);
			$u.remove();
		}
	});
	//上移
	//1081008	Joe		1080339		jQuery升級3.4.1
	// $dlg.find("#Tomeet_moveUp").click(function(){
	$dlg.find("#Tomeet_moveUp").on("click", function(){
		//1051019	Cloud	1050087		配合PAD環境修改編輯區使用物件調整相關邏輯
		/*var si = $dlg.find("#Tomeet_ItemList").prop("selectedIndex");
		if(si >= 0) 
		{
			var opts = $dlg.find("#Tomeet_ItemList").find("option").eq(si);
			opts.insertBefore(opts.prev());
		}*/
		var $si = $dlg.find("#Tomeet_ItemList").find(".ui-btn-active");
		if($si.length > 0) {
			var $u = $si.eq(0);
			if($u.prev().length > 0) {
				$u.after($u.prev());
			}
		}
	
	});
	//下移
	//1081008	Joe		1080339		jQuery升級3.4.1
	// $dlg.find("#Tomeet_moveDown").click(function(){
	$dlg.find("#Tomeet_moveDown").on("click", function(){
		//1051019	Cloud	1050087		配合PAD環境修改編輯區使用物件調整相關邏輯
		/*var si = $dlg.find("#Tomeet_ItemList").prop("selectedIndex");
		if(si >= 0) 
		{
			var opts = $dlg.find("#Tomeet_ItemList").find("option").eq(si);
			opts.insertAfter(opts.next());
		}*/
		var $si = $dlg.find("#Tomeet_ItemList").find(".ui-btn-active");
		if($si.length > 0) {
			var $u = $si.eq(0);
			if($u.next().length > 0) {
				$u.before($u.next());
			}
		}
	});
	//日期格式轉換
	//1081008	Joe		1080339		jQuery升級3.4.1
	// $dlg.find("#Tomeet_DateItem").change(function(event){
	$dlg.find("#Tomeet_DateItem").on("change", function(event){
		
		var DateValue = $dlg.find("#Tomeet_DateItem").val().split('/');
		DateValue[0] = parseInt(DateValue[0])-1911;
		
		if(DateValue[1].indexOf("0")!=-1)
		{
			//1051005	Cloud	1050087		修正月份10月顯示異常的問題
			if(DateValue[1].substr(0,1)=="0")
				DateValue[1] = DateValue[1].substr(1,1);
		}

		$dlg.find("#Tomeet_DateItem").val(DateValue[0]+"年"+DateValue[1]+"月"+DateValue[2]+"日");
		$dlg.find("#Tomeet_WeekItem").val(DateValue[3].substr(2,1));
		//1050831	Cloud	1050087		配合畫面調整，修改程式碼
		//$dlg.find("#Tomeet_TimeItem").focus();
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Tomeet_TimeHHItem").focus();
		$dlg.find("#Tomeet_TimeHHItem").trigger("focus");
	});
	//儲存
	//1081008	Joe		1080339		jQuery升級3.4.1
	// $dlg.find("#Tomeet_Save").click(function(){
	$dlg.find("#Tomeet_Save").on("click", function(){
	
		//將畫面資料回寫至XML內
		//var Opts = $dlg.find("#Tomeet_ItemList").find("option");
		var Date;
		var Week;
		var Time;
		var MeetTimeInfo;
		//清空-重塞
		gTooMeetTime.children("開會時間").remove();
		//1051019	Cloud	1050087		配合PAD環境修改編輯區使用物件調整相關邏輯
		/*if(Opts.length!=0)
		{
			for(var opt=0;opt<Opts.length;opt++)
			{	
				Date = Opts.eq(opt).attr("value").split('|')[0];
				Week = Opts.eq(opt).attr("value").split('|')[1];
				Time = Opts.eq(opt).attr("value").split('|')[2];
				
				//1050818	Leslie	協助修改IE支援問題
				//MeetTimeInfo = "<開會時間><年月日>"+Date+"</年月日><星期>"+Week+"</星期><時分>"+Time+"</時分></開會時間>";
				//gTooMeetTime.append(MeetTimeInfo);
				var nodeTime = gToMeetTimerawXml.createElement("開會時間")
				$(nodeTime).append(fnSetToMeetTimeTextOfElement($(gToMeetTimerawXml.createElement("年月日")),Date).get(0));
				$(nodeTime).append(fnSetToMeetTimeTextOfElement($(gToMeetTimerawXml.createElement("星期")),Week).get(0));
				$(nodeTime).append(fnSetToMeetTimeTextOfElement($(gToMeetTimerawXml.createElement("時分")),Time).get(0));
				gTooMeetTime.append(nodeTime);
				//1050818	Leslie	協助修改IE支援問題	--END--
				
			}
			$(gToMeetTimerawXml.documentElement).find("> 開會時間列表").replaceWith(gTooMeetTime);
		}*/
		$dlg.find("#Tomeet_ItemList").find("li").each(function(idx, nd) 
		{
			Date = nd.getAttribute("data-value").split('|')[0];
			Week = nd.getAttribute("data-value").split('|')[1];
			Time = nd.getAttribute("data-value").split('|')[2];
			var nodeTime = gToMeetTimerawXml.createElement("開會時間")
			$(nodeTime).append(fnSetToMeetTimeTextOfElement($(gToMeetTimerawXml.createElement("年月日")),Date).get(0));
			$(nodeTime).append(fnSetToMeetTimeTextOfElement($(gToMeetTimerawXml.createElement("星期")),Week).get(0));
			$(nodeTime).append(fnSetToMeetTimeTextOfElement($(gToMeetTimerawXml.createElement("時分")),Time).get(0));
			gTooMeetTime.append(nodeTime);
		});
		$(gToMeetTimerawXml.documentElement).find("> 開會時間列表").replaceWith(gTooMeetTime);
		//叫用refreshView更新畫面
		if($.isFunction(refreshView))
			refreshView();
		$.modal.close();
	});
	//離開
	//1081008	Joe		1080339		jQuery升級3.4.1
	// $dlg.find("#Tomeet_Close").click(function(){
	$dlg.find("#Tomeet_Close").on("click", function(){
		$.modal.close();
	});
	//1050906	Cloud	cloud	1050087		時分欄位，增加補至兩碼行為
	//1081008	Joe		1080339		jQuery升級3.4.1
	// $dlg.find("#Tomeet_TimeHHItem").blur(function(){
	$dlg.find("#Tomeet_TimeHHItem").on("blur", function(){
		$dlg.find("#Tomeet_TimeHHItem").val(jf_PADL($dlg.find("#Tomeet_TimeHHItem").val(),2,'0'));
	});
	//1081008	Joe		1080339		jQuery升級3.4.1
	// $dlg.find("#Tomeet_TimeMMItem").blur(function(){
	$dlg.find("#Tomeet_TimeMMItem").on("blur", function(){
		$dlg.find("#Tomeet_TimeMMItem").val(jf_PADL($dlg.find("#Tomeet_TimeMMItem").val(),2,'0'));
	});
	function fnSetToMeetTimeTextOfElement(objElement,textValue)
	{
		for(var i=0,maxIdx = objElement.length;i<maxIdx;i++){
			var u = objElement.get(i);
			if("text" in u)
				u.text = textValue;
			else
				u.textContent = textValue;
		}
		return objElement;	//把傳進來的物件再回傳出去，方便再接著呼叫其他JQuery功能
	}
	function jf_PADL(argString, argLength, argFillStr)
	{
		var pi_length;
		pi_length = argString.length; 
		if(pi_length < argLength )
		{
			return jf_PADL(argFillStr+argString, argLength, argFillStr);
		}
		return argString;
	}
	//1090316 David 1081102 支援客製化功能，上下午轉換只需判斷「時」，調整邏輯
	/*function MeetChangeTime(Time)
	{
		var TimeZone = "上午";
		var hh = Time.substring(0,2);
		var mm = Time.substring(2,4);
		if(parseInt(hh)>=12)
		{
			TimeZone = "下午";
			if(parseInt(hh)!=12)
				hh = (parseInt(hh)-12);
		}
		return Time = TimeZone+hh+"時"+mm+"分";
	}*/
	function MeetChangeTime(argHour)
	{
		var TimeZone = "上午";
		var hh = argHour;
		if(parseInt(hh)>=12)
		{
			TimeZone = "下午";
			if(parseInt(hh)!=12)
				hh = (parseInt(hh)-12);
		}
		else
		{
			//1090316 David 1081102 個位數時不顯示0
			hh = parseInt(hh);
		}
		return Time = TimeZone+hh+"時";
	}
	
	fnInit();
};
(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("MS-ToMeetTime.js").finish();
})();

//1090121	Joe		1091005		補上僅可輸入數字欄位的設定
//數字欄位設定(參考Template_Util.js)
function SetNumOnly(argId)
{
	$(function ()
	{
		$("#" + argId).on("keydown", function (e)
		{
			if(e.keyCode == 229)
				return;	
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
				// Allow: Ctrl+A, Command+A
				(e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
				// Allow: home, end, left, right, down, up
				(e.keyCode >= 35 && e.keyCode <= 40)) {
				// let it happen, don't do anything
				return;
			}

			if ((e.shiftKey || (e.keyCode < 48 || (e.keyCode > 57 && e.keyCode != 189 && e.keyCode != 190)))
			&& (e.keyCode < 96 || e.keyCode > 105))
			{
				e.preventDefault();
			}
		});

		$("#" + argId).on("keyup", function (e)
		{
			if (/[^0-9\.-]/g.test(this.value))
			{
				this.value = this.value.replace(/[^0-9\.-]/g, '');
			}

			if (/-/g.test(this.value) && !/^-/g.test(this.value))
			{
				this.value = this.value.replace(/-/g, '');
			}
		});
	});
}

//1120901 Joe 1120709 弱掃修正Client Potential XSS
function HtmlEncode(s) {
	var div = document.createElement('div');
	div.appendChild(document.createTextNode(s));
	return div.innerHTML;
}