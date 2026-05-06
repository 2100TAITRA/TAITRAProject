/*
DATE	SA		PRG		MGR_NO			DESC
1140908 Cloud   Daniel  1141137         新增程式
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
function ClientOnLoad() {
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e) {
	var xObjectName = e.target.id;

	if (IsServerHandling)
		return;

	//檢查是否TimeOut
	if (jf_IsTimeOut()) {
		Page_BlockSubmit = true;
		return;
	}

	switch (xObjectName) {
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(event) {
	var xObjectName;
	var evBtn;

	if (IsServerHandling)
		return;
	if (jf_IsTimeOut()) {
		Page_BlockSubmit = true;
		return;
	}
	xObjectName = event.target.id;

	switch (xObjectName) {
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if (jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();
				Page_BlockSubmit = false;
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
			$('#txProductNo').focus();
			break;
		case "btSearch":
			Page_BlockSubmit = true;
			var strUrl = "EAI015.aspx";
			jf_OpenChildWin(strUrl, "EAI015", 700, 500);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave() {
	var bRtnbool = false;
	if (jf_CheckKeyObject())//檢查key值是否輸入
	{	
		if (jf_CheckBeforSave())
		{
			// 新增模式需檢查鍵值是否已存在
			if (jf_GetActionMode() == LayoutModeNew) {
				if (jf_CheckDataExist(""))//檢查鍵值是否已存在
				{
					if (window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
						bRtnbool = true;
				}
				else
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
	}
	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave() {
	var bRtnbool = true;
	var strErrMsg = "";

	if (document.all["txProductNo"].value == "") {
		strErrMsg += "細目號/產品別代碼不可空白\n";
		$('#txProductNo').focus();
	}

	if (document.all["txProductName"].value == "") {
		strErrMsg += "細目號/產品別名稱不可空白\n";
		$('#txProductName').focus();
	}

	if (strErrMsg != "") {
		bRtnbool = false;
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
	}

	return bRtnbool;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult) {
	//webserver回傳後動作
	if (argResult.id == wsDuplicateID) {
		if (jf_IsWebServiceSuccess(argResult)) {
		}
		else {
		}
	}
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId) {

	if (argCallerId == "EAI015") {
		document.all["txProductNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		if (document.all["txProductNo"].value != "") {
			Page_BlockSubmit = false;
			jf_OpenButtonSubmit();
		}
		$('#txProductNo').focus();
	}


	//清空lbReturnValue物件
	if (document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
*
*****************************************************************************/
function TbOnBlur(argTextBox) {
	if (argTextBox == "txProductNo") {
		var strTarget = document.all[argTextBox].value;
		if (strTarget != "") {
			if (strTarget.length < 3) {
				strTarget = jf_PADR(strTarget, 3, '0');
				document.all[argTextBox].value = strTarget;
			}
		}
	}
}