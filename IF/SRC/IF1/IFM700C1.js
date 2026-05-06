/*
Date	SA		PRG		MGR_NO		DESC	
1001123 		Ivory	1000539		新增系統公告新增程式
1050718	Kevin	Kevin_C	1050087		升二代
1051019	Leslie	Joe		1050087		二代修改配合行動平台
1060428	Kevin	Joe		1060305		修正說明文字上限應為1000
1070904	Kevin	Justin	1070678		弱掃修正CookieHttpOnly
1150206 Zen		Andy	序63        修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
*/

document.all.rbSomeTarget.onclick = fnTargetClick;
document.all.rbAllTarget.onclick  = fnTargetClick;
if( document.all.rbSomeTarget.checked )
	document.all.btnTargetSet.disabled = false;
else
	document.all.btnTargetSet.disabled = true;

//1050718	Kevin_C	1050087		升二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
document.all.txContent.onkeydown = fnHandleTextarea;
function fnTargetClick()
{
	if( document.all.rbSomeTarget.checked )
		document.all.btnTargetSet.disabled = false;
	else
		document.all.btnTargetSet.disabled = true;
}
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1050718	Kevin_C	1050087		升二代
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
	
	/*1070904 Justin [1070678]弱掃修正CookieHttpOnly
	if( typeof(returnValue) == "string" && returnValue != "" )
	{
		var SPLIT = "|";
		var arr = returnValue.split(SPLIT);
		if( arr[0] = "new")
		{
			jf_SaveCookie("nIFM700C1", arr[1]);
		}
	}*/
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
		case "btnAttach": //附件之設定
			Page_BlockSubmit=true;
			//1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
			//jf_SaveCookie("nIFM700C2", unescape(jf_ReadCookie("nIFM700C1")));
			//jf_SaveCookie("nOrgNo",document.all.nOrgNo.value);
			//jf_ShowModal("IFM700C2.htm" + GetAllParamStr(), 800, 750);
			//1090120	Joe		1081111		修改為隱藏欄位紀錄公告編號
			// jf_ShowModal("IFM700C2.htm" + "?nIFM700C2=" + document.all.nIFM700C1.value + "&nOrgNo=" + document.all.nOrgNo.value, 800, 750);
			//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
			//jf_ShowModal("IFM700C2.htm" + "?nIFM700C2=" + document.all.H_nIFM700C1.value + "&nOrgNo=" + document.all.nOrgNo.value, 800, 750);
			jf_ShowModal("IFM700C2.htm" + "?nIFM700C2=" + document.all.H_nIFM700C1.value + "&nOrgNo=" + document.all.nOrgNo.value);
			break;
		case "btnTargetSet": //發布對象之設定
			Page_BlockSubmit=true;
			//jf_SaveCookie("nIFM700C3", unescape(jf_ReadCookie("nIFM700C1")));
			//jf_SaveCookie("nOrgNo",document.all.nOrgNo.value);
			//jf_ShowModal("IFM700C3.htm" + GetAllParamStr(), 800, 750);
			//1090120	Joe		1081111		修改為隱藏欄位紀錄公告編號
			// jf_ShowModal("IFM700C3.htm" + "?nIFM700C3=" + document.all.nIFM700C1.value + "&nOrgNo=" + document.all.nOrgNo.value, 800, 750);
			//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
			//jf_ShowModal("IFM700C3.htm" + "?nIFM700C3=" + document.all.H_nIFM700C1.value + "&nOrgNo=" + document.all.nOrgNo.value, 800, 750);
			jf_ShowModal("IFM700C3.htm" + "?nIFM700C3=" + document.all.H_nIFM700C1.value + "&nOrgNo=" + document.all.nOrgNo.value);
			//1070904 Justin [1070678]弱掃修正CookieHttpOnly--E
			break;
		break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050718	Kevin_C	1050087		升二代
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
	
	//1050718	Kevin_C	1050087		升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1050718	Kevin_C	1050087		升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			Page_BlockSubmit = !jf_CheckKeyObject();
			if(Page_BlockSubmit) return;
			if(Page_BlockSubmit = !fnChkForSave()) return;
			//1050718	Kevin_C	1050087		升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1050718	Kevin_C	1050087		升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050718	Kevin_C	1050087		升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			//1090120	Joe		1081111		修改為隱藏欄位紀錄公告編號
			var nIFM700C1Temp = document.all.H_nIFM700C1.value;
			jf_ConfirmClean();
			document.all.rbAllTarget.checked = true ;
			//1090120	Joe		1081111		修改為隱藏欄位紀錄公告編號
			document.all.H_nIFM700C1.value = nIFM700C1Temp;
			break;
		case "btSearch":
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
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
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
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/



function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1050718	Kevin_C	1050087		升二代
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}


function fnChkForSave()
{
	//若發布對象為所有人，則清除發布對象的隱藏值
	if(document.all.rbAllTarget.checked)
		document.all.hPublishTo.value = "";

	//檢查公告期限的格式
	var strDate = jf_Trim(document.all.txPublishDate.value);
	if( strDate != "" )
	{
		if( !CheckDATE("txPublishDate","公告日期") )
		{
			//1050718	Kevin_C	1050087		升二代
			//document.all.txPublishDate.focus();
			$('#txPublishDate').focus();
			return false;
		}
	}
	var strEDate = jf_Trim(document.all.txDate.value);
	if( strEDate != "" )
	{
		if( !CheckDATE("txDate","公告期限") )
		{
			//1050718	Kevin_C	1050087		升二代
			//document.all.txDate.focus();
			$('#txDate').focus();
			return false;
		}
	}
	
	if( strDate != "" && strEDate != "" )
	{
		if(strDate > strEDate)
		{
			alert("公告期限不得小於公告日期");
			//1050718	Kevin_C	1050087		升二代
			//document.all.txDate.focus();
			$('#txDate').focus();
			return false;
		}
	}

	if( jf_Trim(document.all.txSubject.value) == "" )
	{
		alert("主旨不可空白");
		return false;
	}
	if( jf_Trim(document.all.txContent.value) == "" )
	{
		alert("內容不可空白");
		return false;
	}
	
	if(jf_Trim(document.all.txContent.value) != "")
	{
		//1060428	Joe		1060305		修正說明文字上限應為1000
		// if( jf_Trim(document.all.txContent.value).length > 200 )
		if( jf_Trim(document.all.txContent.value).length > 1000 )
		{
			//1050718	Kevin_C	1050087		升二代
			//document.all.txContent.focus();
			$('#txContent').focus();
			alert("說明文字不可大於1000字");
			return false;
		}
	}	
	if( document.all.rbAllTarget.checked == false && document.all.rbSomeTarget.checked == false )
	{
		alert("請選擇發布對象");
		return false ;
	}
	return true;
}
/*1070904 Justin [1070678]弱掃修正CookieHttpOnly
function handleReturnValue()
{
	if( typeof(returnValue) == 'string' && returnValue != '' )
	{
		var arr = returnValue.split(SPLIT);
		if(arr[0] == 'save' || arr[0] == 'del')
		{
			jf_SaveCookie('nIFM700C1', '');
			close();
		}
		
		jf_SaveCookie('nIFM700C1', arr[1]);
	}
}*/

function fnHandleTextarea()
{
	if(event.keyCode==13)
		event.cancelBubble = true;
}
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


var bHasCheck = false;
function CheckDATE(argObj,strMsg)
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
			//1050718	Kevin_C	1050087		升二代
			//document.all[argObj].focus();
			$('#'+argObj).focus();
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}