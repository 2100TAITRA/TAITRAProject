/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060811   Justin   1060378     新增特定業務流程查詢作業
 */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;
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
		case "btSearch":
			Page_BlockSubmit = !jf_CheckKeyObject();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//組出回傳值
function ReturnValue(argFLOW_NO, arFLOW_NAME, argOU_NAME, argFLOW_SIGN_TYPE)
{
    
	try
	{
	    opener.document.all.lbReturnValue.length = 4;
	    opener.document.all.lbReturnValue.options[0].value = argFLOW_NO;
	    opener.document.all.lbReturnValue.options[1].value = arFLOW_NAME;
	    opener.document.all.lbReturnValue.options[2].value = argOU_NAME;
	    opener.document.all.lbReturnValue.options[3].value = argFLOW_SIGN_TYPE;
	    opener.window.CallBack("EDI004");
	    close();
	}
	catch (e) {}
    
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
