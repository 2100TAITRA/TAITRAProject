/*
DATE	SA		PRG		MGR_NO			DESC
1140512 Zen     Levi    1140042         新增程式
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
}

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
		case "btPreview":		
		case "btExcel":
		case "btODS":
			Page_BlockSubmit = !jf_ConfirmSearch();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function jf_ConfirmSearch() {
	var bRtnbool = false;
	if (CheckBeforeSearch())//檢查日期欄位是否為空
	{
		if (CheckCDATE("txRcvDateS", "收文日期(起)"))
		{
			if (CheckCDATE("txRcvDateE", "收文日期(迄)"))
			{
				bRtnbool = true;
			}

		}
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
			//document.all["txKeyField"].value = jf_Trim(argResult.value.RtnStr);
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
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function ComboBoxCheck(argComboBoxID, argKeyMsg) {
	var bRtnBool = false;
	var ComboBoxObj = document.all[argComboBoxID];
	var ComboBoxTextObj = document.all[argComboBoxID + "_Text"];

	var i, j;
	if (ComboBoxObj == null || ComboBoxTextObj == null) {
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["[" + argComboBoxID + "]下拉選單不存在"])), "");
		return bRtnBool;
	}

	for (i = 0; i < ComboBoxObj.options.length; i++) {
		if (ComboBoxTextObj.value == ComboBoxObj.options[i].text) {
			bRtnBool = true;
			break;
		}
	}

	if (!bRtnBool) {
		$('#' + argComboBoxID + "_Text").focus();
		ComboBoxTextObj.select();
	}
	return bRtnBool;
}

var uDeptChecked = false;
function dlDept_Text_onblur(argIsCheckDone) {
	if (uDeptChecked) {
		uDeptChecked = false;
		return;
	}
	if (argIsCheckDone == "true")
		uDeptChecked = true;
	var bCheckOK = true;
	//1140509 Zen 1140076 修正承辦單位從有值到清空後查詢結果異常之問題
	//if (jf_Trim(document.all["dlDept_Text"].value) != "" && document.all["dlDept_Text"].value != document.all["H_Dept"].value || (document.all["dlDept_Text"].value == document.all["H_Dept"].value))
	if (document.all["dlDept_Text"].value != document.all["H_Dept"].value) {
		if (ComboBoxCheck("dlDept", "承辦單位")) {
			document.all["H_Dept"].value = document.all["dlDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);

			edjf_SetdlDept("dlDept", "", "dlUser", "", true, true);	//初始dlSect、dlUser的處理

			document.all["H_User"].value = document.all["dlUser_Text"].value;
			document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);

			document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);

			//依選項多寡固定下拉式選單可見長度
			if (document.all["dlUser"].options.length > 10)
				document.all["dlUser"].size = 10;
			else if (document.all["dlUser"].options.length == 1)
				document.all["dlUser"].size = 2;
			else
				document.all["dlUser"].size = document.all["dlUser"].options.length;
		}
		else {
			uDeptChecked = true;
			document.all["dlDept_Text"].value = "";
			document.all["H_Dept"].value = "";
			alert("承辦單位不存在");
			return false;
		}
	}

	uDeptChecked = false;
	return bCheckOK;
}

var uUserChecked = false;
function dlUser_Text_onblur(argIsCheckDone) {
	if (uUserChecked) {
		uUserChecked = false;
		return;
	}
	if (argIsCheckDone)
		uUserChecked = true;
	var bCheckOK = true;
	//值若變更時作處理
	//1140509 Zen 1140076 修正承辦單位從有值到清空後查詢結果異常之問題
	//if (jf_Trim(document.all["dlUser_Text"].value) != "" && document.all["dlUser_Text"].value != document.all["H_User"].value)
	if (document.all["dlUser_Text"].value != document.all["H_User"].value) {
		document.all["H_User"].value = document.all["dlUser_Text"].value;
		document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
	}
	uUserChecked = false;
	return bCheckOK;

}

function CheckBeforeSearch() {
	//strRcvDateS : 暫存起值
	//strRcvDateE : 暫存迄值
	// txRcvDateS : 物件起值
	// txRcvDateE : 物件迄值

	var strErrMsg = '';
	var strRcvDateS = $('#txRcvDateS').val();
	var strRcvDateE = $('#txRcvDateE').val();

	if (strRcvDateS == '' && strRcvDateE != '')
		$('#txRcvDateS').val(strRcvDateE);
	else if (strRcvDateS != '' && strRcvDateE == '')
		$('#txRcvDateE').val(strRcvDateS);
	else if (Number(strRcvDateS) > (Number(strRcvDateE))) {
		$('#txRcvDateS').val(strRcvDateE);
		$('#txRcvDateE').val(strRcvDateS);
	}

	if (strRcvDateS + strRcvDateE == '')
		strErrMsg += '收文日期不可為空';

	if (strErrMsg != '') {
		alert(strErrMsg);
		return false;
	}

	return true;
}

//日期onblur
function CheckCDATE(argObj, strMsg) {
	var strDate = document.all[argObj].value;
	if (strDate != "") {
		if (strDate.length < 7) {
			strDate = jf_PADL(strDate, 7, '0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate)) {
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
			document.all[argObj].value = "";
			$('#' + argObj).focus();
			return false;
		}
	}
	return true;
}
