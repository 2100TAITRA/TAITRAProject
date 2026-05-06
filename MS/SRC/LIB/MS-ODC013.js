/*
DATE	SA		PRG		MGR_NO	DESC
1050729	David	David	1050087	新增MS-ODC013
1080927	Kevin	David	1080339	jQuery升級3.4.1改寫語法
1101014	David	David	-------	修正會簽機關檢核未過時清除會簽機關代碼欄位，避免無限跳提示訊息
*/

function fnODC013Init()
{
	if(gObj.gODC013Load)
		return;

	//初始會簽機關選單
	InitCoOrg("ODC013");

	//小日曆設定
	fnSetDataPicker("tx_ODC013_UpIssueDate");

	if(_rsltODWDCM["COSIGN_TYPE"] == "2")//外會
		$("#rb_ODC013_CoSignType2").prop("checked", true).checkboxradio("refresh");
	else//外陳
		$("#rb_ODC013_CoSignType1").prop("checked", true).checkboxradio("refresh");

	$("#combo_ODC013_CoOrgNo1").val(_rsltODWDCM["COORG_NO"]);
	$("#tx_ODC013_CoOrgName1").val(_rsltODWDCM["COORG_NAME"]);
	$("#combo_ODC013_CoOrgNo2").val(_rsltODWDCM["COORG_NO2"]);
	$("#tx_ODC013_CoOrgName2").val(_rsltODWDCM["COORG_NAME2"]);
	$("#combo_ODC013_CoOrgNo3").val(_rsltODWDCM["COORG_NO3"]);
	$("#tx_ODC013_CoOrgName3").val(_rsltODWDCM["COORG_NAME3"]);
	$("#combo_ODC013_CoOrgNo4").val(_rsltODWDCM["COORG_NO4"]);
	$("#tx_ODC013_CoOrgName4").val(_rsltODWDCM["COORG_NAME4"]);
	$("#combo_ODC013_CoOrgNo5").val(_rsltODWDCM["COORG_NO5"]);
	$("#tx_ODC013_CoOrgName5").val(_rsltODWDCM["COORG_NAME5"]);

	$("#tx_ODC013_OutRemark").val(_rsltODWDCM["OUT_REMARK"]);

	$("#tx_ODC013_UpIssueWord").val(_rsltODWDCM["UPISSUE_WORD"]);
	$("#tx_ODC013_UpIssueNo").val(_rsltODWDCM["UPISSUE_NO"]);
	$("#tx_ODC013_UpIssueDate").val(_rsltODWDCM["UPISSUE_DATE"]);
	
	gObj.gODC013Load = true;
}

function InitCoOrg(argFrom)
{
	//會簽機關
	var CoOrgArray = WsGetCoOrgInfo();
	if(CoOrgArray != "")
	{
		var OpCoOrgList = {
			list: []
		};

		var sArr = CoOrgArray.split('@');
		for(var i=0; i<sArr.length; i++)
		{
			var sArr2=sArr[i].split(';');
			if(sArr2[1] && sArr2[1] != "")
				OpCoOrgList.list.push(sArr2[1]);
		}

		$("#combo_" + argFrom + "_CoOrgNo1").mcombobox(OpCoOrgList);
		SetCoOrgListWidth($("#combo_" + argFrom + "_CoOrgNo1")[0]);
		$("#combo_" + argFrom + "_CoOrgNo2").mcombobox(OpCoOrgList);
		SetCoOrgListWidth($("#combo_" + argFrom + "_CoOrgNo2")[0]);
		$("#combo_" + argFrom + "_CoOrgNo3").mcombobox(OpCoOrgList);
		SetCoOrgListWidth($("#combo_" + argFrom + "_CoOrgNo3")[0]);
		$("#combo_" + argFrom + "_CoOrgNo4").mcombobox(OpCoOrgList);
		SetCoOrgListWidth($("#combo_" + argFrom + "_CoOrgNo4")[0]);
		$("#combo_" + argFrom + "_CoOrgNo5").mcombobox(OpCoOrgList);
		SetCoOrgListWidth($("#combo_" + argFrom + "_CoOrgNo5")[0]);
	}
}

function SetCoOrgListWidth(argObj)
{
	if(argObj.nextElementSibling.tagName == "A")
		argObj.nextElementSibling.style.width = "20px";
}

function fnODC013Save()
{
	if(!fnODC013CheckBeforeSave())
		return false;

	SaveCoOrg("ODC013");
	
	//ODWDCM
	var arrODWDCM = new Array();
	var i = 0;

	try
	{
		var strCoSignType = "1"
		if($("#rb_ODC013_CoSignType2")[0].checked==true)
			strCoSignType = "2"
		arrODWDCM[i++] = { fieldname: 'COSIGN_TYPE', value: strCoSignType};

		arrODWDCM[i++] = { fieldname: 'COORG_NO', value: $("#combo_ODC013_CoOrgNo1").val()};
		arrODWDCM[i++] = { fieldname: 'COORG_NAME', value: $("#tx_ODC013_CoOrgName1").val()};
		arrODWDCM[i++] = { fieldname: 'COORG_NO2', value: $("#combo_ODC013_CoOrgNo2").val()};
		arrODWDCM[i++] = { fieldname: 'COORG_NAME2', value: $("#tx_ODC013_CoOrgName2").val()};
		arrODWDCM[i++] = { fieldname: 'COORG_NO3', value: $("#combo_ODC013_CoOrgNo3").val()};
		arrODWDCM[i++] = { fieldname: 'COORG_NAME3', value: $("#tx_ODC013_CoOrgName3").val()};
		arrODWDCM[i++] = { fieldname: 'COORG_NO4', value: $("#combo_ODC013_CoOrgNo4").val()};
		arrODWDCM[i++] = { fieldname: 'COORG_NAME4', value: $("#tx_ODC013_CoOrgName4").val()};
		arrODWDCM[i++] = { fieldname: 'COORG_NO5', value: $("#combo_ODC013_CoOrgNo5").val()};
		arrODWDCM[i++] = { fieldname: 'COORG_NAME5', value: $("#tx_ODC013_CoOrgName5").val()};
		arrODWDCM[i++] = { fieldname: 'APPROVED_DATE', value: $("#txApprovedDate").val()};

		arrODWDCM[i++] = { fieldname: 'OUT_REMARK', value: $("#tx_ODC013_OutRemark").val()};

		arrODWDCM[i++] = { fieldname: 'UPISSUE_WORD', value: $("#tx_ODC013_UpIssueWord").val()};
		arrODWDCM[i++] = { fieldname: 'UPISSUE_NO', value: $("#tx_ODC013_UpIssueNo").val()};
		arrODWDCM[i++] = { fieldname: 'UPISSUE_DATE', value: $("#tx_ODC013_UpIssueDate").val()};

		theAOL.docObj.set('ODC010', 'ODWDCM', arrODWDCM);
	}
	catch(e)
	{
		alert("ODC013儲存失敗：" + e.message);
		return false;
	}
	
	return true;
}

function fnODC013CheckBeforeSave()
{
	var sMsg = "";
	
	//選擇外會時，則會簽機關至少需輸入一組
	if($("#rb_ODC013_CoSignType2")[0].checked && (jf_Trim($("#combo_ODC013_CoOrgNo1").val()) 
		+ jf_Trim($("#combo_ODC013_CoOrgNo2").val()) + jf_Trim($("#combo_ODC013_CoOrgNo3").val())
		+ jf_Trim($("#combo_ODC013_CoOrgNo4").val()) + jf_Trim($("#combo_ODC013_CoOrgNo5").val()) ==""))
	{
		if(sMsg == "")
		{
			//1080927 David 1080339 jQuery升級3.4.1改寫語法
			//$("#combo_ODC013_CoOrgNo1").focus();
			$("#combo_ODC013_CoOrgNo1").trigger("focus");
		}
		sMsg += "本份公文之外會機關(至少一組)、";
	}

	if(sMsg != "")
	{
		sMsg = sMsg.substr(0,sMsg.length-1);
		alert(sMsg+"須有值!!");
		return false;
	}

	return true;
}

function SaveCoOrg(argFrom)
{
	for(var i=0;i<5;i++)//調整畫面會簽機關顯示順序，跑五次使只有機關五資料的時候移動到第一位
	{
		for(var iTarget = 0 ; iTarget < 5 ; iTarget++)
		{
			var CheckTargetSeq = (iTarget+1);
			var CheckTargetNextSeq = (iTarget+2);
			var $CoOrgNoObj = $("#combo_" + argFrom + "_CoOrgNo" + CheckTargetSeq);
			var $CoOrgNameObj = $("#tx_" + argFrom + "_CoOrgName" + CheckTargetSeq);
			var $CoNextOrgNoObj = $("#combo_" + argFrom + "_CoOrgNo" + CheckTargetNextSeq);
			var $CoNextOrgNameObj = $("#tx_" + argFrom + "_CoOrgName" + CheckTargetNextSeq);

			if(jf_Trim($CoOrgNoObj.val()) == "")
			{
				$CoOrgNoObj.val($CoNextOrgNoObj.val());
				$CoOrgNameObj.val($CoNextOrgNameObj.val());
				$CoNextOrgNoObj.val("");
				$CoNextOrgNameObj.val("");
			}
		}
	}
}

function CoOrgOnBlur(argFrom, argSeq)
{
	var $CoOrgNoObj = $("#combo_" + argFrom + "_CoOrgNo" + argSeq);
	var $CoOrgNameObj = $("#tx_" + argFrom + "_CoOrgName" + argSeq);
	
	if(jf_Trim($CoOrgNoObj.val()) == "")
	{
		$CoOrgNameObj.val("");
		return;
	}
	
	var paramsGetOrgInfo = {
		"argSessionId": localStorage.Artifact
		,"argFullName": $CoOrgNoObj.val()
		,"OrgNo": gObj.uOrgNo
		,"DeptNo": ""
		,"UserID": ""
	};
	
	var _dfdGetOrgInfo = $.Deferred();
	g_QueryDeferred = _dfdGetOrgInfo;

	WsGetOrgInfo(paramsGetOrgInfo, _dfdGetOrgInfo)
	.then(function (rtn)
	{
		if(rtn.Count > 0)
		{
			if(rtn.Count == 1)
			{
				$CoOrgNoObj.val(rtn.OrgID.string);
				$CoOrgNameObj.val(rtn.OrgName.string);
			}
			else
			{
				$CoOrgNoObj.val(rtn.OrgID.string[0]);
				$CoOrgNameObj.val(rtn.OrgName.string[0]);
			}
		}
		else
		{
			alert("查無符合條件的機關");
			//1080927 David 1080339 jQuery升級3.4.1改寫語法
			//$CoOrgNoObj.focus();
			$CoOrgNoObj.trigger("focus");
			$CoOrgNameObj.val("");
			//1101014 David 修正會簽機關檢核未過時清除會簽機關代碼欄位，避免無限跳提示訊息
			$CoOrgNoObj.val("");
		}
	})
	.fail(function (errMsg)
	{
		alert(errMsg);
	});
}

//設定WEM010C1查詢功能
function fnOpenWEM010C1(argFrom, argSeq)
{
	var $CoOrgNoObj = $("#combo_" + argFrom + "_CoOrgNo" + argSeq);
	var $CoOrgNameObj = $("#tx_" + argFrom + "_CoOrgName" + argSeq);

	var strQry = "Artifact="+localStorage.Artifact+"&OrgID="+gObj.uOrgNo+"&K1=WEM010&Search="+jf_Trim($CoOrgNoObj.val()) +"&SAMLart="+localStorage.Artifact;

	var WebPage = SSO_CONFIG.getWSUrl("weorginfows");
	var strUrl = WebPage.substring(0,WebPage.lastIndexOf('/'))+"/WEM010C1.aspx?"+strQry;

	var $pane = $("div#ODC010_WEM010C1_DIV");
	$.modal($pane, {
		containerCss: {width: "95%", height: "95%"},
		onShow: function() 
		{
			var $frame = $pane.find('iframe');
			if ($frame.length)
			{
				$pane.css("width", "95%").css("height", "95%");
				$frame.css("width", "100%").css("height", "100%");//iframe有預設border-width
				$frame[0].src = strUrl;
			}
			$("div#ODC010_WEM010C1_DIV")[0].style="width:100%; height:100%; position:absolute; left:0px; top:0px; z-index:0"
			$pane.find(".ui-slide-pane-active").removeClass("ui-slide-pane-active");
			$pane.addClass("ui-slide-pane-active");
		}
	});
	//1080927 David 1080339 jQuery升級3.4.1改寫語法
	//$("div#ODC010_WEM010C1_DIV").find("#Dlg_close_btn").click(function(event, obj)
	$("div#ODC010_WEM010C1_DIV").find("#Dlg_close_btn").on("click",function(event, obj)
	{
		var $pane = $("div#ODC010_WEM010C1_DIV");
		var $frame = $pane.find('iframe');
		$frame[0].src = "";
		$("div#ODC010_WEM010C1_DIV")[0].style="display: none";
		$("div#ODC010_WEM010C1_DIV").find(".ui-slide-pane-active").removeClass("ui-slide-pane-active");
		$("div#ODC010_WEM010C1_DIV").find(".ui-slide-pane-left").addClass("ui-slide-pane-active");
		$.modal.close();

		if($("#txRtnCoOrgInfo").val() != "")
		{
			var sArr = $("#txRtnCoOrgInfo").val().split('^');
			$CoOrgNoObj.val(sArr[2]+sArr[3]);
			$CoOrgNameObj.val(sArr[1]);
			$("#txRtnCoOrgInfo").val("");
		}
	});
}

//小日曆處理
function fnSetDataPicker(argId)
{
	/*var opt={
		dateFormat:"yymm/d/DD"
	};
	$("#" + argId).datepicker(opt);*/
	
	$("#" + argId).datepicker({
		/*showOn: "button",
		buttonImage: "image/SEARCH_DATE.png",
		buttonImageOnly: true,
		buttonText: "Select date",*/
		changeMonth: true,//增加顯示年、月下拉選項
		changeYear: true,
		dateFormat:"Cmmdd"//修改"jquery-ui.js"增加格式"C"，其輸出為民國年(3碼，並自動補0)
	});
}

//避免JS檔重複載入
(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("MS-ODC013.js").finish();
})();