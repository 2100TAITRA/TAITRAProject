/*
DATE	SA		PRG		MGR_NO		DESC
1110622	Cloud	Joe		1110335		新增程式
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
		
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btDetail"));
	var btDetail, txGuid;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl" + pNo +"_btDetail"] != null)
	{
		btDetail = document.all["dg1__ctl" + pNo + "_btDetail"].id;
		txGuid = document.all["dg1__ctl" + pNo + "_txGuid"].value;
	}
	
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
		case btDetail:
			Page_BlockSubmit = true;
			var DetailUrl = "EDT214C1.aspx?GUID=" + txGuid + "&DOC_NO=" + document.all["txDocNo"].value;
			//1110715	Joe		因應航港需求調整預設視窗大小
			// jf_OpenChildWin(DetailUrl, "EDT214C1");
			window.open(DetailUrl);
			break;
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
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
