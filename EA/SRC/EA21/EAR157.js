/*
DATE	SA		PRG		MGR_NO				DESC
1110925	Cloud	Joe		1111063				新增程式
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
function ClientButtonControl(e)
{
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
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
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

	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPreview":
			Page_BlockSubmit = !jf_CheckBeforSave();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    if (document.all.txDate.value == "")
	{
		alert("列印月份不可為空。");
		return false;
    }

	return true;
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
		}
		else
		{
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


function CheckCDATE(argObj, strMsg) {
	var strDate = document.all[argObj].value;
	if (strDate != "") {
		if (strDate.length < 5) {
			strDate = jf_PADL(strDate, 5, '0');
			document.all[argObj].value = strDate;
		}
		strDate = strDate + "01";
		if (!jf_CheckCDATE(strDate)) {
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
			$('#' + argObj).focus();
			return false;
		}
	}
	return true;
}
