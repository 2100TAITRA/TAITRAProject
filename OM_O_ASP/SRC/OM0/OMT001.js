/*
DATE	SA		PRG		MGR_NO			DESC
1141110 David   Joeko   1141112         新增駐外帳號維護作業
1150109 --      Joeko   序41            設定假密碼處理檢查密碼問題
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
	//1150109 Joeko 序41 設定假密碼處理檢查密碼問題
	if (document.all.DUMMY_USERKEY != null) {
		document.all.txMima.value = document.all.DUMMY_USERKEY.value;
	}

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
		case "btSave":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
				jf_ToolBarSubmit(xObjectName);
			}
			else
				Page_BlockSubmit = true;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			$('#txAccount').focus();
			break;
	    case "btSearch":
	        Page_BlockSubmit = true;
			var strUrl = "OMI001.aspx?Return=true";
			var strKeyCol = jf_Trim(document.all["txAccount"].value);
			jf_OpenChildWin(strUrl, "OMT001", 800, 600 );
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	return jf_CheckBeforSave();
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg = "";
	// 記錄第一個需要聚焦的欄位
	var firstFocusId = "";
	
	if (document.all["dlOrgNo"].value == "")
	{
		strErrMsg += "隸屬單位不可空白\n";
	}
	
	if (document.all["txAccount"].value == "")
	{
		strErrMsg += "帳號不可空白\n";
		if (firstFocusId === "") firstFocusId = "txAccount";
	}
	if (jf_Trim(document.all["txName"].value) === "") {
		strErrMsg += "名稱不可空白\n";
		if (firstFocusId === "") firstFocusId = "txName";
	}
	if (jf_Trim(document.all["txMima"].value) === "") {
		strErrMsg += "密碼不可空白\n";
		if (firstFocusId === "") firstFocusId = "txMima";
	}

		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
		if (firstFocusId !== "") $('#' + firstFocusId).focus();

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

	if(argCallerId == "OMI001")
	{
		var raw = document.all.lbReturnValue.options[0].value;
		var parts = raw.split("|");

		// 對應欄位：OU_ID → dlOrgNo、USERNAME → txAccount、EMP_NAME → txName
		document.all["dlOrgNo"].value = parts[0] || "";
		document.all["txAccount"].value = parts[1] || "";
		document.all["txName"].value = parts[2] || "";
		Page_BlockSubmit = false;
		jf_OpenButtonSubmit();
		$('#txAccount').focus();
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
