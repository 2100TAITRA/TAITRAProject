/*
DATE 	    SA		PRG		MGR_NO		DESC
1060522     Cloud   Zen     1050087     二代公文修改
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

//1060522 Zen 1050087 二代升級//if (document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
/*if(document.all.dg1)
	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;*/

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
//1060522 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060522 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
    var xObjectName = e.taerget.id;
	
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
		/*
		case "":
			break;
		*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060522 Zen 1050087 二代升級//function jf_ToolBarHandle()
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
	
    //1060522 Zen 1050087 二代升級	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1060522 Zen 1050087 二代升級			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	    //1060522 Zen 1050087 二代升級	    //case "btPrint":
		//	Page_BlockSubmit = !jf_ConfirmPrint();
		//	jf_ToolBarSubmit();
		//	break;
		//case "btPreview":
		//	Page_BlockSubmit = !jf_ConfirmPreview();
		//	jf_ToolBarSubmit();
		//	break;
		
		////以下屬於DataGrid ToolBar
		//case "btSelectAll":
		//	Page_BlockSubmit = true;
		//	jf_SelectAll("dg1", "_cbSelect");
		//	break;
		//case "btSelectInverse":
		//	Page_BlockSubmit = true;
		//	jf_SelectInverse("dg1", "_cbSelect");
		//	break;
		//case "btSelectClear":
		//	Page_BlockSubmit = true;
		//	jf_SelectClear("dg1", "_cbSelect");
		//	break;
		//case "btDeleteSelected":
		//	Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
		//	jf_SelectBarSubmit();
		//	break;
		//case "btUp":
		//	Page_BlockSubmit = true;
		//	jf_RowUp("dg1", "_cbSelect", strTableFields);
		//	break;
		//case "btDown":
		//	Page_BlockSubmit = true;
		//	jf_RowDown("dg1", "_cbSelect", strTableFields);
		//	break;
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

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{    
	try
	{
	    opener.document.all.lbReturnValue.length = 1;
		opener.document.all.lbReturnValue.options[0].text  = argLink;
		opener.document.all.lbReturnValue.options[0].value = argRead1;
		 
		opener.window.CallBack("EAT400C2");
		window.close();
	}
	catch (e) {}
    
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
