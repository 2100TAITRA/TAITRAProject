/*
DATE	SA		PRG		MGR_NO	DESC
1010406 kevin	Ivory	1010127	新增EDI590 公文送達簽收簿查詢作業 
1061005 kevin   Justin  1050087 二代公文修改
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
//1061005 Justin [1050087] 二代公文修改
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
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1061005 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
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
	    /*1061005 Justin [1050087] 二代公文修改
		case "btBatchDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txBatchDateS"], event.screenX, event.screenY);
			break;
		case "btBatchDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txBatchDateE"], event.screenX, event.screenY);
			break;*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1061005 Justin [1050087] 二代公文修改 
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
	
    //1061005 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !CheckBeforeRemitting();
		    //1061005 Justin [1050087] 二代公文修改 
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

//組出回傳值
function ReturnValue(argLink, argRead1)
{
	try
	{
	    opener.document.all.lbReturnValue.length = 2;
	    opener.document.all.lbReturnValue.options[0].value = argLink;
	    opener.document.all.lbReturnValue.options[1].value = argRead1;
	    opener.window.CallBack("EDI590");
	    close();
	}
	catch (e) {}
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
			    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
		    //1061005 Justin [1050087] 二代公文修改
		    //document.all[argObj].focus();
			$('#' + argObj).focus();
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	
	return true;
	
}

function CheckBeforeRemitting()
{
	if(jf_Trim(document.all.txBatchDateS.value) + jf_Trim(document.all.txBatchDateE.value) + jf_Trim(document.all.txDocNo.value) == "" )
	{
		alert("請擇一條件輸入查詢");
		return false;
	}
	var strBatchDateS = document.all.txBatchDateS.value;
	var strBatchDateE = document.all.txBatchDateE.value;
	
	if(!CheckDATE("txBatchDateS","成批日期(起)",true))
		return false;
	if(!CheckDATE("txBatchDateE","成批日期(訖)",true))
		return false;
	// 當起值 > 迄值需作起迄交換	
	if(strBatchDateS != "" && strBatchDateE != "" && strBatchDateS > strBatchDateE )
	{
		document.all.txBatchDateS.value = strBatchDateE;
		document.all.txBatchDateE.value = strBatchDateS;
	}
	
	// 起訖欄位值其一為空白,則將起訖值帶為相同
	if( strBatchDateS != "" && strBatchDateE == "" )
		document.all.txBatchDateE.value = strBatchDateS;
	if(	strBatchDateS == "" && strBatchDateE != "" ) 
		document.all.txBatchDateS.value = strBatchDateE;	
		
	return true;
}