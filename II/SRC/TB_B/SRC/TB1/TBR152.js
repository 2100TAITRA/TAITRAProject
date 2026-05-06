/*
DATE	SA		PRG		MGR_NO			DESC
1050922	Cloud   Kenny	1050087	        二代公文系統相關修改
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

//1050922	Kenny   [1050087]	二代公文系統相關修改
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
		case "btView" :
			Page_BlockSubmit = true;
			fnbtAddOrgItem();
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050922	Kenny   [1050087]	二代公文系統相關修改
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
	
	//1050922	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btPrint":
			Page_BlockSubmit = true;
			if(jf_Check()) //是否通過檢查
			{
				Page_BlockSubmit = !jf_ConfirmPrint();
			}
			//1050922	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = true;
			if(jf_Check()) //是否通過檢查
			{
				Page_BlockSubmit = !jf_ConfirmPreview();
			}
			//1050922	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

//檢查
function jf_Check()
{
	var bRtnbool = true;
	var strErrMsg= "";
	var objFocus = null;
	
	if (jf_Trim(document.all.txMain.value) == "")
	{
		strErrMsg += "請輸入公告對象。\n";
        //1050922	Kenny   [1050087]	二代公文系統相關修改
		//objFocus = document.all.txMain;
	}
	
	if (strErrMsg != "")
	{
        //1050922	Kenny   [1050087]	二代公文系統相關修改
		//objFocus.focus();
		$('#txMain').focus();
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}


//公告對象dg button click 事件  
function fnbtAddOrgItem()
{
	var actE = document.activeElement;
	//var ret = jf_ShowOrgDialogForOUA();
    //1050922	Kenny   [1050087]	二代公文系統相關修改；回傳值改至CallBack函式處理--Start--
	//var ret = jf_ShowOrgDialogForPerson();
	//if(ret)
	//{
	//	document.all.txOrgNo.value = ret.SourceOrgNo;
	//	if(ret.InfoType == "Role")
	//	{
	//		document.all.txType.value = "1";
	//		document.all.txUnitCode.value = ret.UnitCode;
	//		document.all.txRoleCode.value = ret.RoleCode;
	//		document.all.txMain.value = ret.UnitName + ret.RoleName;
	//	}
	//	else
	//	{
	//		document.all.txMain.value = ret.Name;
	//		document.all.txCode.value = ret.Code;
	//		if(ret.InfoType == "Unit" )
	//			document.all.txType.value = "2";
	//		else if(ret.InfoType == "Org" )
	//			document.all.txType.value = "4";
	//		else if(ret.InfoType == "Account")
	//			document.all.txType.value = "0";
			
	//	}
	//}	
    jf_ShowOrgDialogForPerson();
    //1050922	Kenny   [1050087]	二代公文系統相關修改；回傳值改至CallBack函式處理--End--
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
    
    //1050922	Kenny   [1050087]	二代公文系統相關修改--Start--
    //因叫用TB_LIB.jf_ShowOrgDialogForPerson時已限定type為Account故不需全部類型都判斷
    if ( argCallerId == "IFC021" )
    {
        document.all.txMain.value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all.txCode.value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all.txType.value = "0";
    }
    //1050922	Kenny   [1050087]	二代公文系統相關修改--End--
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;

}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
