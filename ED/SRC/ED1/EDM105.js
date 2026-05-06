/*
DATE 	    SA		PRG		MGR_NO		DESC
1061219     David   Kevin_C	1061027     新增程式
1100201		Leslie	Joe		1090927		取消使用document.activeElement
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

var strTableFields = new Array("_txOuName");

if(document.all.dg1)
	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

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
//1100201	Joe		1090927		取消使用document.activeElement
// function ClientButtonControl()
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
	
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btSave":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);	
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit(xObjectName);
			break;
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect");
			break;
		case "btDeleteSelected":
			Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
			jf_SelectBarSubmit();
			break;
		case "btUp":
			Page_BlockSubmit = true;
			jf_RowUp("dg1", "_cbSelect", strTableFields);
			break;
		case "btDown":
			Page_BlockSubmit = true;
			jf_RowDown("dg1", "_cbSelect", strTableFields);
			break;
	}
}
