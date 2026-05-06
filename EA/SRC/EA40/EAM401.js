
 //	1051019	Leslie		Joe			1050087	二代修改配合行動平台
 /*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
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
		case "btHelp":
			var strUrl = "";
			strUrl = "EAC400.aspx?rtnObj=lbReturnValue";
			jf_OpenChildWin(strUrl,"EAC400",750,550);
			Page_BlockSubmit = true;
			break;	
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle()
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
	
	xObjectName= window.event.srcNode.getAttribute("ID");
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			jf_ToolBarSubmit();
			break;
		case "btSave":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			jf_ToolBarSubmit();	
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			jf_ToolBarSubmit();
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit();
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			document.all["rbDefaultCode_0"].checked = true;
			document.all["txMediaNo"].focus();
			break;
		case "btSearch":	
			var strUrl = "";
			strUrl = "EAC401.aspx?rtnObj=lbReturnValue";
			jf_OpenChildWin(strUrl, "EAC401", 700, 500 );			
			break;		
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
		// 新增模式需檢查鍵值是否已存在
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist(""))//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
		else
			bRtnbool = true;
	}
		
	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txMediaNo"].value == "")
	{
		strErrMsg += "媒體代碼不可空白\n";
		document.all["txMediaNo"].focus();
	}
	
	if (document.all["txMediaDesp"].value == "")
	{
		if( strErrMsg == "" )
			document.all["txMediaDesp"].focus();
		strErrMsg += "媒體名稱不可空白\n";
		
	}
	
	if( document.all["txGrpNo"].value == "" )
	{
		if( strErrMsg == "" )
			document.all["txGrpNo"].focus();
		strErrMsg += "群組代碼不可空白\n";		
	}
	//若可以儲存 判斷預設代碼值為 是 或 否
	if( strErrMsg == "" )
	{
		var strMsg = "預設代碼僅可設定一個，若已設定其他代碼為預設代碼，則以目前設定取代之。\n是否繼續儲存？";
		//若為是 請使用者確認是否繼續儲存
		if( document.all["rbDefaultCode_0"].checked == true )
		{
			bRtnbool = window.confirm( strMsg );			
		}		
	}
		
	if (strErrMsg != "")
	{
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
{	//媒體型式 群組 代碼查詢子視窗

	if(argCallerId == "EAC401")
	{
		document.all["txMediaNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		/*document.all["txMediaDesp"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txUnit"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		
		if( document.all.lbReturnValue.options[3].value == 1)
			document.all["rbDefaultCode_0"].checked = true;
		else
			document.all["rbDefaultCode_1"].checked = true;
		
		document.all["txGrpNo"].value = jf_Trim(document.all.lbReturnValue.options[4].value);*/
		
		if(document.all["txMediaNo"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		
		GrpNoOnblur();
	}
	
	//媒體型式 代碼查詢子視窗
	if( argCallerId == "EAC400" )
	{
		document.all["txGrpNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txGrpName"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//群組代碼onblur function
function GrpNoOnblur()
{
}