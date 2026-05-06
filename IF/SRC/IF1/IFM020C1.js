/*	Date	SA		PG		Merge	Desc
 *	1050804	Kevin	Kevin_C	1050087	升二代
 *	1051019	Leslie	Joe		1050087	二代修改配合行動平台
 *	1070904 Kevin	Justin	1070678	弱掃修正CookieHttpOnly
 *	1080816 Kevin	Joe		1080628	修正開啟子視窗前需進行編碼
 *	1150206	Zen		Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
 */ 
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1050804	Kevin_C	1050087	升二代
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	
	//0970035	Leslie	設定RadioButton的選取值
	document.all["RBGRP"].value = document.all["txRadioValue"].value;
	document.all[document.all["txRadioValue"].value].checked = "checked";
	fnRBGRP_Change(document.all[document.all["txRadioValue"].value]);
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;

	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	switch (xObjectName)
	{
	    case "btHelpPriv":
	        /*1070904 Justin [1070678]修正無法開啟子視窗問題
			var ret = jf_ShowPersonDialog("");
			if(ret)
				document.all["txPrivate"].value = GetElement(ret, 0);*/
	        jf_ShowPersonDialog("");
			break;
		/*
		case "":
			break;
		*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050804	Kevin_C	1050087	升二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	if(IsServerHandling)
	   return;

	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	//1050804	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName=event.target.id;

	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = false;
			//1050804	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["txGrpNo"].value = jf_Trim(argResult.value.RtnStr);
		}
		else
		{
			//document.all["txReadOnly"].value = "";
		}
    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
    //1070904 Justin [1070678]修正無法開啟子視窗問題
    if (argCallerId == "IFC020") {
        if (IsRationalValue(document.all["lbReturnValue"].options))
        {
            document.all["txPrivate"].value = GetElement(document.all.lbReturnValue.options[0].value, 0);
        }
    }
    
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

//1070904 Justin [1070678]修正無法開啟子視窗問題
function IsRationalValue(val)
{
    if (val == undefined)
        return false;
    if (val == null)
        return false;
    return true;
}
//組出回傳值
function ReturnValue(argGrpNo, argGrpNm)
{
    opener.document.all.lbReturnValue.length = 2;
    opener.document.all.lbReturnValue.options[0].value = argGrpNo;
    opener.document.all.lbReturnValue.options[1].value = argGrpNm;
    opener.window.CallBack("IFM020C1");
    opener.window.focus();
    close();
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//Leslie	0970035		處理畫面Event
function fnRBGRP_Change(argObj)
{
	document.all["txRadioValue"].value = argObj.id;
	var DeptCss;
	var PrivateCss;
	if(argObj.id == "rbDept")
	{
		DeptCss = "";
		//1050804	Kevin_C	1050087	升二代
		//PrivateCss = "Hide"	
		PrivateCss = "hide";
	}
	else if(argObj.id == "rbPrivate")
	{
		//1050804	Kevin_C	1050087	升二代
		//DeptCss = "Hide";
		DeptCss = "hide";
		PrivateCss = ""	
	}
	else
	{
		//1050804	Kevin_C	1050087	升二代
		//DeptCss = "Hide";
		//PrivateCss = "Hide"	
		DeptCss = "hide";
		PrivateCss = "hide";
	}
	trDept.className = DeptCss;
	if(document.all["txPrivate"])
	{
		document.all["txPrivate"].className = PrivateCss;
		document.all["btHelpPriv"].className = PrivateCss;
	}
}
function GetElement(argStr,argIdx)
{
	var SPLIT = "|";
	var ss =argStr.split(SPLIT);
   	return ss[argIdx];
}
function jf_ShowPersonDialog(argParam, argOrgNo)
{
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly
	//jf_SaveCookie("nSearch",argParam);
	var param = ReplaceParamStrForOrgNo(GetAllParamStr(), argOrgNo);
    //1070904 Justin [1070678]弱掃修正CookieHttpOnly及修正無法開啟子視窗問題
    //var ret= fnOpen("IFC020.htm" + param,"480","370"); //回傳值：CN, displayName, Path
	//return ret;
	//1080816	Joe		1080628		新增開啟子視窗前轉碼
	// jf_ShowModal("IFC020.htm" + param + "&nSearch=" + argParam, "480", "370");
	//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
	//jf_ShowModal("IFC020.htm" + param + "&nSearch=" + encodeURIComponent(argParam), "480", "370");
	jf_ShowModal("IFC020.htm" + param + "&nSearch=" + encodeURIComponent(argParam));
}
/*1070904 Justin [1070678]修正無法開啟子視窗問題
function fnOpen(arg,argW,argH)
{
   var sFeatures="dialogWidth: "+ argW + "px;dialogHeight:"+ argH+"px";
   var ret = window.showModalDialog(arg, "", sFeatures);
   return ret;
}*/
function GetAllParamStr()
{
	var strParam = "";
	var pUrl = unescape(this.location);
	if( pUrl != -1 )
	{
		var i = pUrl.indexOf("?");
		if(i != -1)
			strParam = pUrl.substr(i); 
	}
	return strParam;
}
function ReplaceParamStrForOrgNo(argParamStr, argOrgNo)
{
	if(argParamStr == "")
		return "";
	if(typeof(argOrgNo) == "undefined" || argOrgNo == "")
		return argParamStr;

	var ret = "";
	var bStartWithQ = argParamStr.indexOf("?") == 0;
	if(bStartWithQ)
		argParamStr = argParamStr.replace("?", "");
	if(bStartWithQ)
		ret = "?";
		
	var bHasOrgNoParam = false;
	var arrPara = argParamStr.split("&");
	for(var i=0; i<arrPara.length; i++)
	{
		var arrOnePara = arrPara[i].split("=");
		if(arrOnePara[0].toUpperCase() == "nOrgNo".toUpperCase())
		{
			arrOnePara[1] = argOrgNo;
			bHasOrgNoParam = true;
		}
		if(i != 0)
			ret += "&";
		ret += arrOnePara[0] + "=" + arrOnePara[1];
	}
	if(bHasOrgNoParam == false)
		ret += "&nOrgNo=" + argOrgNo;
	return ret;
}