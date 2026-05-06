/*
DATE	SA		PRG		MGR_NO			DESC
1050930	Cloud   Kenny	1050087	        二代公文系統相關修改
1051019	Leslie	Joe			1050087		二代修改配合行動平台
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

//1050930	Kenny   [1050087]	二代公文系統相關修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	Joe		1050087		配合行動平台進行修正
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
        //1050930	Kenny   [1050087]	二代公文系統相關修改--Start--
		//case "ImgStartDate":
		//	Page_BlockSubmit = true;
		//	break;
		//case "ImgEndDate":
		//	Page_BlockSubmit = true;
		//	break;
        //1050930	Kenny   [1050087]	二代公文系統相關修改--End--
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050930	Kenny   [1050087]	二代公文系統相關修改
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
	
	//1050930	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btPrint":
			if(jf_Check())
				Page_BlockSubmit = !jf_ConfirmPrint();
			else
				Page_BlockSubmit = true;
			//1050930	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if(jf_Check())
				Page_BlockSubmit = !jf_ConfirmPreview();
			else
				Page_BlockSubmit = true;
			//1050930	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function jf_Check()
{
	var bRtnbool = true;
    //1050930	Kenny   [1050087]	二代公文系統相關修改
	//var objFocus = null;
    var objFocus = "";
	var strErrMsg= "";
		//檢查日期格式
	var strSDate = document.all.txStartDate.value;
	var strEDate = document.all.txEndDate.value;
	if (strSDate != "" && strSDate.length < 7)
	{
		strSDate = jf_PADL(strSDate,7,'0');
		document.all.txStartDate.value = strSDate;
	}
	if (strEDate != "" &&  strEDate.length < 7)
	{
		strEDate = jf_PADL(strEDate,7,'0');
		document.all.txEndDate.value = strEDate;
	}
	if (document.all["txStartDate"].value == "" && document.all["txEndDate"].value == "")
	{
		strErrMsg += "日期起迄值不可空白\n";
        //1050930	Kenny   [1050087]	二代公文系統相關修改
		//objFocus = document.all.txStartDate;
        objFocus = "txStartDate";
	}
	else if (document.all["txStartDate"].value == "")
	{
		strErrMsg += "日期起值不可空白\n";
        //1050930	Kenny   [1050087]	二代公文系統相關修改
		//objFocus = document.all.txStartDate;
        objFocus = "txStartDate";
	}
	else if (document.all["txEndDate"].value == "")
	{
		strErrMsg += "日期迄值不可空白\n";
        //1050930	Kenny   [1050087]	二代公文系統相關修改
		//objFocus = document.all.txEndDate;
        objFocus = "txEndDate";
	}
	
	if (!jf_CheckCDATE(document.all.txStartDate.value) && document.all["txStartDate"].value != "")
	{	
		strErrMsg += "日期起值格式錯誤\n";
        //1050930	Kenny   [1050087]	二代公文系統相關修改
		//objFocus = document.all.txStartDate;
        objFocus = "txStartDate";
	}
	if (!jf_CheckCDATE(document.all.txEndDate.value) && document.all["txEndDate"].value != "")
	{	
		strErrMsg += "日期迄值格式錯誤\n";
        //1050930	Kenny   [1050087]	二代公文系統相關修改
		//objFocus = document.all.txEndDate;
        objFocus = "txEndDate";
	}		
	if (strErrMsg != "")
	{
        //1050930	Kenny   [1050087]	二代公文系統相關修改
		//objFocus.focus();
        $('#'+objFocus).focus();
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}		
	
	return bRtnbool;
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
	/*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
/*function fnCalculateDays()
{

	if (strSDate != "" && !jf_CheckCDATE(strSDate))
	{
		document.all.txStartDate.focus();
		jf_ShowMsg( FormatStr( jf_GetErrMsg(InFormatErr2), new Array(["日期起值有誤"]) ), "" );
		return false;
	}
	if (strEDate != "" && !jf_CheckCDATE(strEDate))
	{
		document.all.txEndDate.focus();
		jf_ShowMsg( FormatStr( jf_GetErrMsg(InFormatErr2), new Array(["日期迄值有誤"]) ), "" );
		return false;
	}
}*/
