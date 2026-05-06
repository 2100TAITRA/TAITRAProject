/*
DATE	SA		PRG		MGR_NO			DESC
1140903 Cloud   Daniel  1141137         新增程式
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
var strTableFields = new Array("_hlCountryNo", "_hlCountryName");

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

	//檢查是否TimeOut
	if (jf_IsTimeOut()) {
		Page_BlockSubmit = true;
		return;
	}
	xObjectName = event.target.id;

	switch (xObjectName) {
		case "btSearch":
			Page_BlockSubmit = !jf_CheckKeyObject();
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
	//清空lbReturnValue物件
	if (document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argLink) {

	try {
		opener.document.all.lbReturnValue.length = 1;
		opener.document.all.lbReturnValue.options[0].value = argLink;
		opener.window.CallBack("EAI014");
		close();
	}
	catch (e) { }

}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
*
*****************************************************************************/
function TbOnBlur(argTextBox) {
	if (argTextBox == "txCountryNo") {
		var strTarget = document.all[argTextBox].value;
		if (strTarget != "") {
			if (strTarget.length < 3) {
				strTarget = jf_PADR(strTarget, 3, '0');
				document.all[argTextBox].value = strTarget;
			}
		}
	}
}