/*
DATE	SA		PRG		MGR_NO	DESC
1120314 Leslie  Cloud   1120211 升級二代
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

//指定DataGrid欄位
var strTableFields = new Array("_hlLink","_lbRead1","_lbRead2");
//1120314   Cloud   1120211 升級二代
/*if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl()
{
	var xObjectName = document.activeElement.id;
	
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
	    //1120314   Cloud   1120211 升級二代
		/*case "btRcvDateS":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txRcvDateS, event.screenX, event.screenY);
			break;
		case "btRcvDateE":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txRcvDateE, event.screenX, event.screenY);
			break;
		case "btIssueDateS":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txIssueDateS, event.screenX, event.screenY);
			break;
		case "btIssueDateE":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txIssueDateE, event.screenX, event.screenY);
			break;		*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1120314   Cloud   1120211 升級二代
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
    //1120314   Cloud   1120211 升級二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;;
	
	switch (xObjectName)
	{
		case "btSearch":
		    Page_BlockSubmit = !CheckBeforeRemitting();
		    //1120314   Cloud   1120211 升級二代
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
		    Page_BlockSubmit = !CheckBeforeRemitting();
		    //1120314   Cloud   1120211 升級二代
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
		    Page_BlockSubmit = !CheckBeforeRemitting();
		    //1120314   Cloud   1120211 升級二代
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
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
bHasCheck = false;

//檢核日期格式
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
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			document.all[argObj].focus();
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	
	return true;
	
}

function CheckBeforeRemitting()
{
	if(jf_Trim(document.all.txRcvDateS.value) == "" && jf_Trim(document.all.txRcvDateE.value) == "" &&　jf_Trim(document.all.txIssueDateS.value) == "" && jf_Trim(document.all.txIssueDateE.value) == ""　)
	{
		alert("收創日期起迄欄位及發文日期起迄欄位不能皆為空");
		return false;
	}
	var strRcvDateS   = document.all.txRcvDateS.value;
	var strRcvDateE	  = document.all.txRcvDateE.value;
	var strIssueDateS = document.all.txIssueDateS.value;
	var strIssueDateE = document.all.txIssueDateE.value;
	
	if(!CheckDATE("txRcvDateS","收創日期(起)",true))
		return false;
	if(!CheckDATE("txRcvDateE","收創日期(訖)",true))
		return false;
	if(!CheckDATE("txIssueDateS","發文日期(起)",true))
		return false;
	if(!CheckDATE("txIssueDateE","發文日期(訖)",true))
		return false;
				
	// 當起值 > 迄值需作起迄交換	
	if(strRcvDateS != "" && strRcvDateE != "" && strRcvDateS > strRcvDateE )
	{
		document.all.txRcvDateS.value = strRcvDateE;
		document.all.txRcvDateE.value = strRcvDateS;
	}
	if(strIssueDateS != "" && strIssueDateE != "" && strIssueDateS > strIssueDateE )
	{
		document.all.txIssueDateS.value = strIssueDateE;
		document.all.txIssueDateE.value = strIssueDateS;
	}	
	
	// 起訖欄位值其一為空白,則將起訖值帶為相同
	if( strRcvDateS != "" && strRcvDateE == "" )
		document.all.txRcvDateE.value = strRcvDateS;
	if(	strRcvDateS == "" && strRcvDateE != "" ) 
		document.all.txRcvDateS.value = strRcvDateE;	
	if( strIssueDateS != "" && strIssueDateE == "" )
		document.all.txIssueDateE.value = strIssueDateS;
	if(	strIssueDateS == "" && strIssueDateE != "" ) 
		document.all.txIssueDateS.value = strIssueDateE;
		
	return true;
}
