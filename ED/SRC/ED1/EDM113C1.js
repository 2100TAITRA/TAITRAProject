/*
DATE 	SA		PRG		MGR_NO		DESC
1060105	David   Kenny	1050087	    二代公文系統相關修改
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

//1060105	Kenny   [1050087]	二代公文系統相關修改
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
//1060105	Kenny   [1050087]	二代公文系統相關修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060105	Kenny   [1050087]	二代公文系統相關修改
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
//1060105	Kenny   [1050087]	二代公文系統相關修改
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
	
	//1060105	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1060105	Kenny   [1050087]	二代公文系統相關修改
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
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{
	try
	{
	    opener.document.all.lbReturnValue.length = 3;
	    opener.document.all.lbReturnValue.options[0].value = argLink;
	    opener.document.all.lbReturnValue.options[1].value = argRead1;
	    opener.document.all.lbReturnValue.options[2].value = argRead2;
	    opener.window.CallBack("EDM113C1");
	    close();
	}
	catch (e) {}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
