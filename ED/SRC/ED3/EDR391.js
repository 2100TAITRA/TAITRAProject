/*
DATE	SA		PRG		MGR_NO				DESC
1000914 Yvonne  Ivory   1000599             新增程式
1060926 kevin   Justin  1050087             二代公文修改
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
//1060926 Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060926 Justin [1050087] 二代公文修改
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060926 Justin [1050087] 二代公文修改
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
	    /*1060926 Justin [1050087] 二代公文修改
		case "btBackDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txBackDateS"], event.screenX, event.screenY);
			break;
		case "btBackDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txBackDateE"], event.screenX, event.screenY);
			break;	
		case "btSendDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txSendDateS"], event.screenX, event.screenY);
			break;
		case "btSendDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txSendDateE"], event.screenX, event.screenY);
			break;*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060926 Justin [1050087] 二代公文修改 
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
	
    //1060926 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btExcel":
			Page_BlockSubmit = !CheckBeforeRemitting();
		    //1060926 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
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
			    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
		    //1060926 Justin [1050087] 二代公文修改
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
	if(jf_Trim(document.all.txBackDateS.value) == "" && jf_Trim(document.all.txBackDateE.value) == "")
	{
		alert("退文日期起迄欄位不能皆為空");
		return false;
	}
	var strSDateS = document.all.txSendDateS.value;
	var strSDateE = document.all.txSendDateE.value;
	var strBDateS = document.all.txBackDateS.value;
	var strBDateE = document.all.txBackDateE.value;
	
	if(!CheckDATE("txBackDateS","退文日期(起)",true))
		return false;
	if(!CheckDATE("txBackDateE","退文日期(訖)",true))
		return false;
	// 當起值 > 迄值需作起迄交換	
	if(strSDateS != "" && strSDateE != "" && strSDateS > strSDateE )
	{
		document.all.txSendDateS.value = strSDateE;
		document.all.txSendDateE.value = strSDateS;
	}
	if(strBDateS != "" && strBDateE != "" && strBDateS > strBDateE )
	{
		document.all.txBackDateS.value = strBDateE;
		document.all.txBackDateE.value = strBDateS;
	}	
	
	// 起訖欄位值其一為空白,則將起訖值帶為相同
	if( strBDateS != "" && strBDateE == "" )
		document.all.txBackDateE.value = strBDateS;
	if(	strBDateS == "" && strBDateE != "" ) 
		document.all.txBackDateS.value = strBDateE;	
	if( strSDateS != "" && strSDateE == "" )
		document.all.txSendDateE.value = strSDateS;
	if(	strSDateS == "" && strSDateE != "" ) 
		document.all.txSendDateS.value = strSDateE;
		
	return true;
}