/*
DATE 	SA		PRG		MGR_NO	DESC
0951018	Stella	Charles	955105	二層式登記桌修改
1050418 David   Zen     1050087 二代公文修改 
1050817 Kevin   Zen     1050700 弱掃XSS修正
1060518 Leslie  Zen     1060215 innerText相關修改
1070903	David	Kevin_C	1070828	修正新增及修改模式的顯示邏輯及儲存功能無法正常INSERT的問題
1070830	David	Kevin_C	1070678	因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
1140918	Zen		Andy	1140058	修正無法儲存的問題
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1071001	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
AjaxPro.Request.prototype.timeout = function () {
	try {
		this.duration = new Date().getTime() - this.__start;
		var r = this.onTimeout(this.duration, this);
		if (typeof r == "undefined" || r != false) {
			this.abort();
		} else {
			this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
		}
	}
	catch (error) {

	}
	finally {

	}
}

//1050421 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050421 Zen 1050087 二代公文修改
	//if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//function ClientButtonControl()
function ClientButtonControl(e)
{
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case "btHelp":
			var strUrl = "";
			//1070903	Kevin_C	1070828		機關查詢改開啟WEM010C1,且III600已不再維護(同ODT130)
			if(document.all.H_Wed010C1Path && document.all.H_Wed010C1Path.value != "")
			{
				strUrl = document.all.H_Wed010C1Path.value + "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + document.all.h_OrgNo.value + "&K1=WEM010";
				jf_OpenChildWin(strUrl, "WEM010C1", 700, 500 );
			}
			else
				alert("紀錄WEDEP站台之環境變數WS_WEDEP_SITE未設定或設定錯誤，無法開啟機關查詢，請洽系統管理員");
			Page_BlockSubmit=true;
			break;
	}	
}
//1050421 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;

	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

    //1050421 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050421 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(ConfirmSave())//是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1050421 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			if (jf_ConfirmDelete())
				Page_BlockSubmit = !CheckBeforeDelete();
			else
				Page_BlockSubmit = true;
		    //1050421 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050421 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
	//1070903	Kevin_C	1070828		機關查詢改開啟WEM010C1,且III600已不再維護(同ODT130)
	//if (argCalledId == "III600")
	//{
	//	document.all["txOrgno"].value  = document.all["lbReturnValue"].options[1].value;
	//	document.all["txOrgName"].value= document.all["lbReturnValue"].options[0].value;
	//}
	if(argCallerId == "WEM010C1")
	{
		var DeptInfo = document.all["lbReturnValue"].options[0].value;
		var DeptArray = DeptInfo.split('^');
		document.all.txOrgName.value = DeptArray[1];
		if(DeptArray[9]=="")
		{document.all.txOrgno.value = DeptArray[1];}
		else
		{document.all.txOrgno.value = DeptArray[9];}
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
    //1050421 Zen 1050087 二代公文修改
	//jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	//jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
	//jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, null);
	ShowMsg();
	
	//[需求單955102] 初始時先儲存二級單位下拉式選單的Text、Value、所有選項Value  Charles 0951018
	if(document.all["H_OD_FLOW_TYPE"].value == "2")
	{
		//設定收文科別的下拉選單
		if(document.all["dlDept_Text"].value == "")
		{
			while(document.all["dlSubDept"].length > 0)
				document.all["dlSubDept"].remove(0);
			document.all["dlSubDept"].size = 2;
			document.all["dlSubDept"].options.add(new Option("",""));
			document.all["dlSubDept_Text"].value = "";
		}
		if(document.all["dlSubDept_Text"].value != "")
			document.all["dlSubDept_Container"].className = "";
		else
			document.all["dlSubDept_Container"].className = "DisplayOnly";
	}
	document.all["H_Dept"].value = document.all["dlDept_Text"].value ;
	document.all["H_SubDept"].value = document.all["dlSubDept_Text"].value ;
	document.all["H_SubDept_Value"].value = odjf_GetSelectValue(document.all["dlSubDept"],document.all["H_SubDept"].value);
	document.all["H_dlSubDept_Value"].value = odjf_SaveCurrDL(document.all["dlSubDept"]);
	
	//無值不顯示
	jf_HandleComboxStatus("dlSubDept");
}

function OnWSResult(argResult)
{
	var bRtn = false;
	var iSeq;
	var iPrev;
	var iNext;
   	//檢查回傳的webserverID
	//1070903	Kevin_C	1070828		移除沒用的CODE
    //if (argResult.id == wsGetDocID)
    //{
	//	//檢查執行是否成功
	//	if(jf_IsWebServiceSuccess(argResult))
	//	{
	//		bRtn = true;
	//		for (var iRtn=0;iRtn<argResult.value.RtnField0.length;iRtn++)
	//		{
	//			//新增模式
	//			if (document.all["TemplateMode"].value == "0")
	//			{
	//				if (Number(document.all["txSDoc"].value) > argResult.value.RtnField0[iRtn])
	//					iSeq = iRtn;
	//				else break;
	//			}
	//			else
	//			{
	//				if (Number(document.all["txSDoc"].value) == argResult.value.RtnField0[iRtn])
	//					iSeq = iRtn;
	//				else break;
	//			}
	//		}
	//		if (document.all["TemplateMode"].value == "0")
	//			iPrev = iSeq;
	//		else
	//			iPrev = iSeq-1;
	//		iNext = iSeq + 1;
	//		//比較起值合理性:[起值]必須大於上一筆的迄值 且 小於下一筆的起值
	//		if ((Number(document.all["txSDoc"].value) <= argResult.value.RtnField1[iPrev]) || (Number(document.all["txSDoc"].value) >= argResult.value.RtnField0[iNext]))
	//		{
	//		    bRtn = false;
	//		    //1050525 Zen 1050087 二代公文修改
	//		    //document.all["txSDoc"].focus();
	//		    $('#txSDoc').focus();
	//			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["文號(起) 正在使用中"])),"");
	//		}
	//		//比較迄值合理性:[迄值]必須小於下一筆的起值
	//		if (bRtn)
	//		{
	//			if (Number(document.all["txEDoc"].value) >= Number(argResult.value.RtnField0[iNext]))
	//			{
	//				bRtn = false;
	//			    //1050525 Zen 1050087 二代公文修改
	//				//document.all["txEDoc"].focus();
	//				$('#txEDoc').focus();
	//				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["文號(迄) 正在使用中"])),"");
	//			}
	//		}
	//	}
	//}
	//else if (argResult.id == wsGetOrgNameID)
	if (argResult.id == wsGetOrgNameID)
	{
		//檢查執行是否成功
		//1070903	Kevin_C	1070828		修正機關查詢功能(參考ODT134)
		//if(!argResult.error)
		//	document.all["txOrgName"].value = argResult.value[0][1];
		if(jf_IsWebServiceSuccess(argResult))
		{		
			if(!argResult.value.ErrorClass.IsErr)
			{
				if(argResult.value.Count > 0)
				{
					document.all.txOrgno.value = argResult.value.OrgID[0];
					document.all.txOrgName.value = argResult.value.OrgName[0];
				}
				else //1010504	Ivory	1010382	找不到值時應清空
				{
					document.all.txOrgName.value = "";
				}
			}
			else
			{
				alert(argResult.value.ErrorClass.ErrMessage[0]);
			}
		}
	}
	return bRtn;
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if (CheckEmpty())
	{
		if (Number(document.all["txSDoc"].value) > Number(document.all["txEDoc"].value))
		{
			bRtnbool = false;
		    //1050525 Zen 1050087 二代公文修改
			//document.all["txEDoc"].focus();
			$('#txEDoc').focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["文號(起)不可大於文號(迄)"])),"");
		}
		else
		{
			//if (CheckBeforSave())
				bRtnbool = CheckDocFormat();
			//1070903	Kevin_C	1070828		增加儲存前檢核
			var strDeptNo="";
			if (document.all["rb1"].checked)
			{
				strDeptNo = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value.split(':')[0];
				if (document.all["H_SubDept_Value"].value != "")
					strDeptNo = document.all["H_SubDept_Value"].value.split(':')[2];
				//1071001	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
				//var strRtn = window.ODT110Right.IsDocUsedExist(document.all["h_OrgNo"].value, document.all["txYear"].value, strDeptNo, "", "").value;
				//1140918	Andy	1140058			修正無法儲存的問題
				//var strRtn = windowRight.OD.ODT110Right.IsDocUsedExist(document.all["h_OrgNo"].value, document.all["txYear"].value, strDeptNo, "", "").value;
				var strRtn = OD.ODT110Right.IsDocUsedExist(document.all["h_OrgNo"].value, document.all["txYear"].value, strDeptNo, "", "").value;
				if (strRtn == "Y")
				{
					jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["該單位已設定公文提號"])), "");
					bRtnbool = false;
				}
				else if (strRtn != "N")
				{
					alert(strRtn);
					bRtnbool = false;
				}
			}
			else
			{
				//1071001	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
				//var strRtn = window.ODT110Right.IsDocUsedExist(document.all["h_OrgNo"].value, document.all["txYear"].value, "", document.all.txOrgno.value, document.all.txOrgName.value).value;
				//1140918	Andy	1140058			修正無法儲存的問題
				//var strRtn = windowRight.OD.ODT110Right.IsDocUsedExist(document.all["h_OrgNo"].value, document.all["txYear"].value, "", document.all.txOrgno.value, document.all.txOrgName.value).value;
				var strRtn = OD.ODT110Right.IsDocUsedExist(document.all["h_OrgNo"].value, document.all["txYear"].value, "", document.all.txOrgno.value, document.all.txOrgName.value).value;
				if (strRtn == "Y")
				{
					jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["該機關已設定公文提號"])), "");
					bRtnbool = false;
				}
				else if (strRtn != "N")
				{
					alert(strRtn);
					bRtnbool = false;
				}
			}
		}
	}
	//[需求單955102] 儲存前檢查 Charles 0951019
	if(!dlDept_Text_onblur(true))
		bRtnbool = false;
	
    if(document.all["H_OD_FLOW_TYPE"].value == "2")
    {
		if(!dlSubDept_Text_onblur(true))
			bRtnbool = false;
    }
    
	return bRtnbool;
}

var wsGetDocID;
//儲存前key值外之欄位檢查
//1070903	Kevin_C	1070828		移除沒用的CODE
//function CheckBeforSave()
//{
//	return true;
//	var bRtnbool;
//	var arKeyName = new Array(1);
//	var arKeyValue = new Array(1);
//	var arRtnFldName = new Array(2);
//	var arOrdFldName = new Array(1);
	
//	arKeyName[0]    = "USE_YEAR";
//	arKeyValue[0]   = document.all["txYear"].value;
//	arRtnFldName[0] = "DOC_START";
//	arRtnFldName[1] = "DOC_END";
//	arOrdFldName[0] = "DOC_START";

//	var arWSParam = new Array(5);
//	arWSParam[0] = "DOC_USED";
//	arWSParam[1] = arKeyName;
//	arWSParam[2] = arKeyValue;
//	arWSParam[3] = arRtnFldName;
//	arWSParam[4] = arOrdFldName;
//	callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, arWSParam);
//	wsGetDocID = callObj.id;
//	bRtnbool = OnWSResult(callObj);
//	return bRtnbool;
//}

var wsGetOrgNameID;//宣告webserver回傳值id
function CheckOrgno()
{
    //1050817 Zen 1050700 弱掃XSS修正
	//var strOrgno = jf_Trim(document.all["txOrgno"].value);
	//1070903	Kevin_C	1070828		修正取得機關資訊，由WEOrgInfo WS之GetOrgInfo取得 -S
    //var strOrgno = encodeURI(jf_Trim(document.all["txOrgno"].value));
	//if (strOrgno != "")
	//{
	//	var arWSParam = new Array(1);
	//	arWSParam[0] = strOrgno;
	//	callObj = jf_CallWS("lib/OD_LIB.asmx", "GetUnitInfo", false, arWSParam);
	//	wsGetOrgNameID = callObj.id;
	//	OnWSResult(callObj);
	//	IsServerHandling = true;
	//	jf_ShowWaitState();
	//}
	if(document.all.txOrgno.value == "")
		return;

	var wsParam = new Array();
	wsParam[0] = document.all.txOrgno.value;
	wsParam[1] = document.all.h_OrgNo.value;
	wsParam[2] = document.all.h_DeptNo.value;
	wsParam[3] = document.all.h_UserId.value;
	var CallWsObj = jf_CallWS("lib/WEOrgInfo.asmx","GetOrgInfo",false,wsParam);
	wsGetOrgNameID = CallWsObj.id;
	OnWSResult(CallWsObj);
	//1070903	Kevin_C	1070828		修正取得機關資訊，由WEOrgInfo WS之GetOrgInfo取得 -E
}

//不可空白檢查
function CheckEmpty()
{
	var strErrMsg="";
	var bRtn = true;
	if (document.all["txEDoc"].value == "")
	{
		strErrMsg = "文號區間(迄)不可空白\n" + strErrMsg;
	    //1050525 Zen 1050087 二代公文修改
		//document.all["txEDoc"].focus();
		$('#txEDoc').focus();
	}
	if (document.all["txSDoc"].value == "")
	{
		strErrMsg = "文號區間(起)不可空白\n" + strErrMsg;
	    //1050525 Zen 1050087 二代公文修改
		//document.all["txSDoc"].focus();
		$('#txSDoc').focus();
	}
	if (document.all["rb1"].checked)
	{
		if ((document.all["dlDept_Text"].value == "") && (!document.all["dlDept_Text"].disabled))
		{
			strErrMsg = "單位不可空白\n" + strErrMsg;
		    //1050525 Zen 1050087 二代公文修改
			//document.all["dlDept_Text"].focus();
			$('#dlDept_Text').focus();
		}
	}
	else if (document.all["rb2"].checked)
	{
		if (document.all["txOrgno"].value == "")
		{
			strErrMsg = "下屬機關不可空白\n" + strErrMsg;
		    //1050525 Zen 1050087 二代公文修改
			//document.all["txOrgno"].focus();
			$('#txOrgno').focus();
		}
	}
	if (document.all["txYear"].value == "")
	{
		strErrMsg = "年度不可空白\n" + strErrMsg;
	    //1050525 Zen 1050087 二代公文修改
		//document.all["txYear"].focus();
		$('#txYear').focus();
	}
	if (strErrMsg != "")
	{
		bRtn = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
	}
	return bRtn;
}

function CheckDocFormat()
{
	var bRtn = true;
	var strValue = jf_Trim(document.all["txMaxSeq"].value);
	var strSDoc = jf_Trim(document.all["txSDoc"].value);
	var strEDoc = jf_Trim(document.all["txEDoc"].value);
	
	if ((strValue == "") || (strValue == "0") || (document.all["txYear"].className == ""))
		bRtn = true;
	else
	{
		if (Number(strValue) < Number(strSDoc))
		{
			bRtn = false;
		    //1050525 Zen 1050087 二代公文修改
			//document.all["txSDoc"].focus();
			$('#txSDoc').focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["文號(起)不可大於 目前已用最大號"])),"");
		}
		else
		{
			if (Number(strValue) > Number(strEDoc))
			{
				bRtn = false;
			    //1050525 Zen 1050087 二代公文修改
				//document.all["txEDoc"].focus();
				$('#txEDoc').focus();
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["文號(迄)不可小於 目前已用最大號"])),"");
			}
		}
	}
	return bRtn;
}

function CheckBeforeDelete()
{
	var bRtn = true;
	if (document.all["txMaxSeq"].value != "0")
	{
		bRtn = false;
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["本組文號正在使用中,不允許刪除"])),"");
	}
	return bRtn;
}

//[需求單955105] 下拉選單檢查 Charles 0951018 ↓
function dlDept_Text_onblur()
{
	var bCheckOK = true;
	if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
	{
		//呼叫OD_LIB.js，檢查dlFmDept_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlDept", "單位"))
		{
			//存ComboBox_Text的value
			document.all["H_Dept"].value = document.all["dlDept_Text"].value;
			
			if(document.all["H_OD_FLOW_TYPE"].value == "2")
			{
				//設定收文科別的下拉選單
				odjf_SetdlDept("dlDept","dlSubDept","","",false);
				//存ComboBox_Text的value
				document.all["H_SubDept"].value = document.all["dlSubDept_Text"].value;
				//存所選擇的ComboBox項目的value
				document.all["H_SubDept_Value"].value = odjf_GetSelectValue(document.all["dlSubDept"],document.all["H_SubDept"].value);
				//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlFmSubDept的處理
				document.all["H_dlSubDept_Value"].value = odjf_SaveCurrDL(document.all["dlSubDept"]);
				//依選項多寡固定下拉式選單可見長度
				if(document.all["dlSubDept"].options.length > 10)
					document.all["dlSubDept"].size = 10;
				else if(document.all["dlSubDept"].options.length ==1)
					document.all["dlSubDept"].size = 2;
				else
					document.all["dlSubDept"].size = document.all["dlSubDept"].options.length;
				//無值不顯示
				jf_HandleComboxStatus("dlSubDept");
			}
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

function dlSubDept_Text_onblur()
{
	var bCheckOK = true;
	if (document.all["dlSubDept_Text"].value != document.all["H_SubDept"].value)
	{
		//呼叫OD_LIB.js，檢查dlFmDept_Text所輸入的值是否存在於下拉式選單
		if(odjf_ComboBoxCheck("dlSubDept", "二級單位"))
		{
			//存ComboBox_Text的value
			document.all["H_SubDept"].value = document.all["dlSubDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_SubDept_Value"].value = odjf_GetSelectValue(document.all["dlSubDept"],document.all["H_SubDept"].value);
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
    if (document.all[argComboxID].options.length <= 1)
		document.all[argComboxID+"_Container"].className = "hide";
    else
        //1050421 Zen 1050087 二代公文修改
        document.all[argComboxID + "_Container"].className = "custom-combobox";
}
//[需求單955105] 下拉選單檢查 Charles 0951018 ↑