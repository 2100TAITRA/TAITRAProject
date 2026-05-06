/*
DATE	SA		PRG		MGR_NO		DESC
1060420	Cloud	Joe		1050087		二代系統升級
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

//1060420	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1060420	Joe		1050087		二代公文修改
	// jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060420	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060420	joe		1050087		二代修改配合行動平台
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
//1060420 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1060420 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			jf_txTheme_No_Onblur();
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1060420 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			jf_txTheme_No_Onblur();
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1060420 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			jf_txTheme_No_Onblur();
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1060420 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1060420 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			//1060420	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txTheme_No"].focus();
			$('#txTheme_No').focus();
			break;
		case "btSearch":			
			var strUrl = "EAC002.aspx?";
			//var strKeyCol = jf_Trim(document.all["txSecNo"].value);
			jf_OpenChildWin(strUrl, "EAM002", 700, 500 );
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1060420 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1060420 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
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
	
	if (jf_Trim(document.all["txTheme_No"].value) == "")
	{
		strErrMsg += "主題編號欄位不可空白\n";
		//1060420	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txTheme_No"].focus();
		$('#txTheme_No').focus();	
	}
	else 
	{
		if ( document.all["txTheme_No"].value.length > 4 )
		{
			strErrMsg += "主題編號字元個數不可超過4\n";
			//1060420	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txTheme_No"].focus();
			$('#txTheme_No').focus();	
		}
	}
	
	if (jf_Trim(document.all["txTheme"].value ) == "")
	{
		strErrMsg += "主題名稱欄位不可空白\n";
		//1060420	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txTheme"].focus();
		$('#txTheme').focus();	
	}
	else 
	{
		if ( document.all["txTheme"].value.length > 20 )
		{
			strErrMsg += "主題名稱字元個數不可超過20\n";
			//1060420	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txTheme"].focus();
			$('#txTheme').focus();	
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
{
	
	if(argCallerId == "EAC002")
	{
		document.all["txTheme_No"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		//document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		//document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		//document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txTheme_No"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		//1060420	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txTheme_No"].focus();
		$('#txTheme_No').focus();	
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
function jf_txTheme_No_Onblur()
{	
	var txObj = jf_Trim(document.all["txTheme_No"].value) ;
	if ( txObj.length > 0 && txObj.length < 4 )
	{
		document.all["txTheme_No"].value = jf_PADL(txObj, 4, "0");
	}
}