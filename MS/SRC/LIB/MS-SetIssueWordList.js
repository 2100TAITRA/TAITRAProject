// 會銜文設定發文字功能模組(桌機版)
// Date		sa		pg		mgr_no		desc
/*1050831	Cloud	cloud	1050087		配合畫面調整，修改程式碼
  1051128 	Cloud	Cloud	1050087		增加處理署名欄位
  1081008	Kevin	Joe		1080339		jQuery升級3.4.1
  1090316	David	David	1090113		畫面欄位為空時，需清空稿件內資料
  1100510	Kevin	David	1100221		支援jQuery3.5.1，調整jQuery.trim用法
*/
var nsEditor = nsEditor||{};

nsEditor.fnSettIssueWordSetting = function(dm, $dlg, refreshView)
{
	var gSettIssueWord;
	var gSettIssueWordrawXml;
	var docObj;
	var Yno = "";
	var SeqNo = "";
	var SeqNoNo = "";
	//1051128 	Cloud	增加處理署名欄位
	var Sing = "";
	function fnInit()
	{
		gSettIssueWordrawXml = dm.accquireXml();
		for(var i=1;i<8;i++)
		{
			if(i==1)
			{
				gSettIssueWord = $(dm.accquireXml().documentElement).find("發文字號");
				if(gSettIssueWord.length!=0)
				{
					var word = gSettIssueWord.find("字").text();
					
					$dlg.find("#IssueWord").val(word);
					docObj = gSettIssueWord.find("文號");
					Yno = docObj.find("年度").text();
					SeqNo = docObj.find("流水號").text();
					SeqNoNo = docObj.find("支號").text();
					$dlg.find("#IssueYno").val(Yno);
					$dlg.find("#Issueno").val(SeqNo);
					$dlg.find("#Issueno_no").val(SeqNoNo);
					if(word+Yno+SeqNo+SeqNoNo=="")//全空白則開啟時自動取號
						fnGettIssueWord();
				}
			}
			else
			{
				gSettIssueWord = $(dm.accquireXml().documentElement).find("發文字號"+i.toString(10));
				if(gSettIssueWord.length!=0)
				{
					$dlg.find("#IssueWord"+i.toString(10)).val(gSettIssueWord.find("字").text());
					docObj = gSettIssueWord.find("文號");
					Yno = docObj.find("年度").text();
					SeqNo = docObj.find("流水號").text();
					SeqNoNo = docObj.find("支號").text();
					//1051128 	Clloud	增加處理署名欄位
					$dlg.find("#Sign_"+i.toString(10)).val(gSettIssueWord.find("署名").text());
					if(Yno+SeqNo+SeqNoNo!="")
					{
						$dlg.find("#IssueYno"+i.toString(10)).val(Yno);
						$dlg.find("#Issueno"+i.toString(10)).val(SeqNo);
						$dlg.find("#Issueno_no"+i.toString(10)).val(SeqNoNo);
					}
					
				}
				
			}
		}
	}
	//1100510 David 1100221 移除jQuery.trim()，使用共用方法
	/*function jf_Trim(Object)
	{
		return jQuery.trim(Object);
	}*/

	//加入-功能無用-避免被要求使用加入方式設定-保留-S
	/*$dlg.find("").click(function(){
	
		var Date = jf_Trim($dlg.find("").val());
		var Week = jf_Trim($dlg.find("").val());
		var hh = jf_Trim($dlg.find("").val());
		if(hh=="")
			hh="00";
		var mm = jf_Trim($dlg.find("#Tomeet_TimeMMItem").val());
		if(mm=="")
			mm="00";
		var Time = hh+mm;
		$("<li data-value='"+Date+"|"+Week+"|"+Time+"'>"+Date+"星期"+Week+Time+"</li>").appendTo($dlg.find("#Tomeet_ItemList"))
				.click(function(evt) {
					$dlg.find("#Tomeet_ItemList").find("li").removeClass("ui-btn-active").css("background","").css("text-shadow","")
					.css("border","");
					$(this).addClass("ui-btn-active").css("background","#fadb4e").css("text-shadow","0 1px 0 #fff")
					.css("border","none");
				});
		$dlg.find("").val("");
		$dlg.find("").val("");
		$dlg.find("").val("");
		$dlg.find("").val("");
		$dlg.find("").listview("refresh");
	
	});
	//移除
	$dlg.find("").click(function(){
		var $si = $dlg.find("").find(".ui-btn-active");
		if($si.length > 0) 
		{
			var $u = $si.eq(0);
			$u.remove();
		}
	});
	//上移
	$dlg.find("").click(function(){
		var $si = $dlg.find("").find(".ui-btn-active");
		if($si.length > 0) {
			var $u = $si.eq(0);
			if($u.prev().length > 0) {
				$u.after($u.prev());
			}
		}
	
	});
	//下移
	$dlg.find("").click(function(){
		var $si = $dlg.find("").find(".ui-btn-active");
		if($si.length > 0) {
			var $u = $si.eq(0);
			if($u.next().length > 0) {
				$u.before($u.next());
			}
		}
	});
	//日期格式轉換
	$dlg.find("").change(function(event){
		
		var DateValue = $dlg.find("#Tomeet_DateItem").val().split('/');
		DateValue[0] = parseInt(DateValue[0])-1911;
		
		if(DateValue[1].indexOf("0")!=-1)
		{
			if(DateValue[1].substr(0,1)=="0")
				DateValue[1] = DateValue[1].substr(1,1);
		}

		$dlg.find("#Tomeet_DateItem").val(DateValue[0]+"年"+DateValue[1]+"月"+DateValue[2]+"日");
		$dlg.find("#Tomeet_WeekItem").val(DateValue[3].substr(2,1));
		$dlg.find("#Tomeet_TimeHHItem").focus();
	});*/
	//加入-功能無用-避免被要求使用加入方式設定-保留-E
	//儲存
	//1081008	Joe		1080339		jQuery升級3.4.1
	// $dlg.find("#List_IssueWord_Save").click(function(){
	$dlg.find("#List_IssueWord_Save").on("click", function(){
	
		//將畫面資料回寫至XML內
		//清空-重塞
		var Word=Yno=Seq=Seq_np="";
		var nodelssue;
		var nodelssueNoInfo;
		//1051128 	Cloud	增加處理署名欄位
		var Sing = "";
		for(var i=1;i<8;i++)
		{
			if(i==1)
			{
				Word = jf_Trim($dlg.find("#IssueWord").val());
				Yno = jf_Trim($dlg.find("#IssueYno").val());
				Seq = jf_Trim($dlg.find("#Issueno").val());
				Seq_np = jf_Trim($dlg.find("#Issueno_no").val());
				//1090316 David 1090113 依畫面資料紀錄至稿件中，不需判斷是否皆不為空，避免清空畫面資料時不會清空稿件資料
				//if(Word+Yno+Seq+Seq_np!="")
				{
					nodelssue = gSettIssueWordrawXml.createElement("發文字號");
					$(nodelssue).append(fnSettIssueWordTextOfElement($(gSettIssueWordrawXml.createElement("字")),Word).get(0));
					nodelssueNoInfo = gSettIssueWordrawXml.createElement("文號");
						$(nodelssueNoInfo).append(fnSettIssueWordTextOfElement($(gSettIssueWordrawXml.createElement("年度")),Yno).get(0));
						$(nodelssueNoInfo).append(fnSettIssueWordTextOfElement($(gSettIssueWordrawXml.createElement("流水號")),Seq).get(0));
						$(nodelssueNoInfo).append(fnSettIssueWordTextOfElement($(gSettIssueWordrawXml.createElement("支號")),Seq_np).get(0));
					$(nodelssue).append(nodelssueNoInfo);
					$(gSettIssueWordrawXml.documentElement).find("發文字號").replaceWith(nodelssue);
				}
			}
			else
			{
				Word = jf_Trim($dlg.find("#IssueWord"+i.toString(10)).val());
				Yno = jf_Trim($dlg.find("#IssueYno"+i.toString(10)).val());
				Seq = jf_Trim($dlg.find("#Issueno"+i.toString(10)).val());
				Seq_np = jf_Trim($dlg.find("#Issueno_no"+i.toString(10)).val());
				//1051128 	Cloud	增加處理署名欄位
				Sing = jf_Trim($dlg.find("#Sign_"+i.toString(10)).val());
				
				//1090316 David 1090113 依畫面資料紀錄至稿件中，不需判斷是否皆不為空，避免清空畫面資料時不會清空稿件資料
				//if(Word+Yno+Seq+Seq_np!="")
				{
					nodelssue = gSettIssueWordrawXml.createElement("發文字號"+i.toString(10));
					$(nodelssue).append(fnSettIssueWordTextOfElement($(gSettIssueWordrawXml.createElement("字")),Word).get(0));
					nodelssueNoInfo = gSettIssueWordrawXml.createElement("文號");
						$(nodelssueNoInfo).append(fnSettIssueWordTextOfElement($(gSettIssueWordrawXml.createElement("年度")),Yno).get(0));
						$(nodelssueNoInfo).append(fnSettIssueWordTextOfElement($(gSettIssueWordrawXml.createElement("流水號")),Seq).get(0));
						$(nodelssueNoInfo).append(fnSettIssueWordTextOfElement($(gSettIssueWordrawXml.createElement("支號")),Seq_np).get(0));
					$(nodelssue).append(nodelssueNoInfo);
					//1051128 	Cloud	增加處理署名欄位
					$(nodelssue).append(fnSettIssueWordTextOfElement($(gSettIssueWordrawXml.createElement("署名")),Sing).get(0));
					$(gSettIssueWordrawXml.documentElement).find("發文字號"+i.toString(10)).replaceWith(nodelssue);
				}
			}
		}
		if($.isFunction(refreshView))
			refreshView();
		$.modal.close();
	});
	//離開
	//1081008	Joe		1080339		jQuery升級3.4.1
	// $dlg.find("#List_IssueWord_Close").click(function(){
	$dlg.find("#List_IssueWord_Close").on("click", function(){
		$.modal.close();
	});
	//設定取得發文字號
	function fnGettIssueWord()
	{
		if(theAOL.docObj.docNo=="")
		{
			alert('未取得公文號，因此不自動取得本文發文字號。');
			return;
		}
		var flo = theAOL.getCurrFolio();
		var n = flo.getDraftCounts(), ordr = 0, dfds = [], trgt = [];
		for(var i=0; i<n; i++) {
			if(!flo.isFromDoc(i)) {	// 非來文才呼叫fnGetIssueNo
				dfds.push(flo.accquireDraftModel(i)
					.done(function(dm) {
						// 判斷是否有發文字號節點, 有才取號
						var nd = dm.nodes("//發文字號");
						if(nd.length > 0) {
							trgt.push({dm: dm});
						}
					})
					.fail(function(errorText) {
						theLogger.error(errorText);
					})
				);
			}
		}
		//取得發文字號，傳入文稿數、MODE=2(按鈕呼叫),發文機關全銜、發文日期現值、承辦單位物件
		var $DocObj = $(dm.accquireXml().documentElement).find("發文機關列表").find("發文機關");
		
		var obj = {
			"IssueOrgName":$DocObj.find("全銜").text(),
			"RpsDeptName":$DocObj.find("承辦單位").text(),
			"IssueDate":$(dm.accquireXml().documentElement).find("發文日期").find("年月日").text()
		};
		
		var res = nsEditor.fnGetIssueNo(trgt.length,null,"0",obj);
		
		if(res.IssueNo_no.length == trgt.length) 
		{	
			for(var i=0; i<res.IssueNo_no.length; i++) {
				try {
					trgt[i].dm.text("//發文字號/字", res.IssueWord);
					trgt[i].dm.text("//發文字號/文號/年度", theAOL.docObj.docNo.substr(0, 3));
					trgt[i].dm.text("//發文字號/文號/流水號", theAOL.docObj.docNo.substr(3, 7));
					trgt[i].dm.text("//發文字號/文號/支號", res.IssueNo_no[i]);
					if(trgt[i].dm.getDocType()=="會銜函")//此處呼叫還須設定子視窗畫面
					{
						$dlg.find("#IssueWord").val(res.IssueWord);
						$dlg.find("#IssueYno").val(theAOL.docObj.docNo.substr(0, 3));
						$dlg.find("#Issueno").val(theAOL.docObj.docNo.substr(3, 7));
						$dlg.find("#Issueno_no").val(res.IssueNo_no[i]);
					}
				}
				catch(e) {
					theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
				}
			}
		}
		else if(res.IssueNo_no.length == 0) 
		{	// 回傳支號陣列數為0, 應是不需取支號的機關
			for(var i=0; i<trgt.length; i++) 
			{
				try 
				{
					trgt[i].dm.text("//發文字號/字", res.IssueWord);
					trgt[i].dm.text("//發文字號/文號/年度", theAOL.docObj.docNo.substr(0, 3));
					trgt[i].dm.text("//發文字號/文號/流水號", theAOL.docObj.docNo.substr(3, 7));
					if(trgt[i].dm.getDocType()=="會銜函")//此處呼叫還須設定子視窗畫面
					{
						$dlg.find("#IssueWord").val(res.IssueWord);
						$dlg.find("#IssueYno").val(theAOL.docObj.docNo.substr(0, 3));
						$dlg.find("#Issueno").val(theAOL.docObj.docNo.substr(3, 7));
					}
				}
				catch(e) {
					theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
				}
			}
		}
		
	}
	function fnSettIssueWordTextOfElement(objElement,textValue)
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

	
	fnInit();
};
(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("MS-SetIssueWordList.js").finish();
})();
