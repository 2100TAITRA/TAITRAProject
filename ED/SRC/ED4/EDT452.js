/* 
Date	SA		PG		MGR_NO		DESC
1100520 Kevin	Joe		1090603		新增程式
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
	document.all["H_Dept"].value = document.all["dlDept_Text"].value;
	document.all["H_Sect"].value = document.all["dlSect_Text"].value;
	document.all["H_User"].value = document.all["dlUser_Text"].value;
	document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
	document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
	document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
	document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
	document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
	jf_HandleComboxStatus("dlSect");

	CloseTypeChg();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
    var xObjectName = e.target.id;
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
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
	
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btOpen":
            Page_BlockSubmit = !jf_CheckBeforOpen();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(jf_CheckBeforSave())
				Page_BlockSubmit = false;
			else
				Page_BlockSubmit = true;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCheck":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSearch":
			Page_BlockSubmit = true;
			strUrl = "EDI452.aspx?rtnObj=lbReturnValue&argMode=1";
			jf_OpenChildWin(strUrl, "EDI452", 800, 600);
			break;
	}
}

//開啟前檢核
function jf_CheckBeforOpen()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txDocNo"].value == "")
	{
		strErrMsg += "公文文號欄位不可空白";
		$('#txDocNo').focus();
	}
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

//儲存前檢核
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all.txDocNo.value == "")
		strErrMsg += "公文文號不可空白\n";
	if (document.all.txSubject.value == "")
		strErrMsg += "主旨欄位不可空白\n";
	if (document.all.txRcvDate.value == "")
		strErrMsg += "收創文日期欄位不可空白\n";
	if (document.all.H_Dept.value == "")
		strErrMsg += "承辦單位欄位不可空白\n";
	if (document.all.H_User.value == "")
		strErrMsg += "承辦人欄位不可空白\n";
	if (document.all.txDueDate.value == "")
		strErrMsg += "續辦到期日欄位不可空白\n";

	if (document.all.rbCloseY.checked && document.all.txCloseNo.value == "")
		strErrMsg += "結案文號不可空白\n";
    
    strErrMsg = strErrMsg.substring(0, strErrMsg.length - 1);
    
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

	if (argCallerId == "EDI452") {
		document.all["txDocNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		jf_ToolBarSubmit("btOpen");
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
function CheckDate()
{
	var strErrMsg= "";
    
    var strRecordDueDate = document.all.txRecordDueDate.value;
	if(strRecordDueDate != "")
	{
		if(strRecordDueDate.length < 7)
		{
			strRecordDueDate = jf_PADL(strRecordDueDate,7,"0");
			document.all.txRecordDueDate.value = strRecordDueDate;
		}

		if(!jf_CheckCDATE(strRecordDueDate))
		{
            strErrMsg += "輸入的批示限辦日期不存在，請重新輸入";
		}
        
        if (strErrMsg != "")
        {
            jf_ShowMsg( strErrMsg, "" );        
            document.all.txRecordDueDate.value = "";
            $('#txRecordDueDate').focus();
        }
	}
}


function ComboBoxCheck(argComboBoxID, argKeyMsg) {
	var bRtnBool = false;
	var ComboBoxObj = document.all[argComboBoxID];
	var ComboBoxTextObj = document.all[argComboBoxID + "_Text"];

	var i, j;
	if (ComboBoxObj == null || ComboBoxTextObj == null) {
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["[" + argComboBoxID + "]下拉選單不存在"])), "");
		return bRtnBool;
	}

	for (i = 0 ; i < ComboBoxObj.options.length ; i++) {
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
//ComboBox 處理
var uDeptChecked = false;
function dlDept_Text_onblur(Mode, argIsCheckDone) {
	if (uDeptChecked) {
		uDeptChecked = false;
		return;
	}
	if (argIsCheckDone == "true")
		uDeptChecked = true;
	var bCheckOK = true;
	if (jf_Trim(document.all["dlDept_Text"].value) != "" && document.all["dlDept_Text"].value != document.all["H_Dept"].value || (document.all["dlDept_Text"].value == document.all["H_Dept"].value && Mode == "NotInit")) {

		if (ComboBoxCheck("dlDept", "承辦單位")) {
			document.all["H_Dept"].value = document.all["dlDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
			document.all["dlSect_Container"].className = "custom-combobox";

			edjf_SetdlDept("dlDept", "dlSect", "dlUser", "", false, false);	//初始dlSect、dlUser的處理

			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
			document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
			document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);

			document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
			//依選項多寡固定下拉式選單可見長度
			if (document.all["dlSect"].options.length > 10)
				document.all["dlSect"].size = 10;
			else if (document.all["dlSect"].options.length == 1)
				document.all["dlSect"].size = 2;
			else
				document.all["dlSect"].size = document.all["dlSect"].options.length;

			if (document.all["dlUser"].options.length > 10)
				document.all["dlUser"].size = 10;
			else if (document.all["dlUser"].options.length == 1)
				document.all["dlUser"].size = 2;
			else
				document.all["dlUser"].size = document.all["dlUser"].options.length;

			//無值不顯示
			jf_HandleComboxStatus("dlSect");
			//jf_HandleComboxStatus("dlUser");

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
var uSectChecked = false;
function dlSect_Text_onblur(argIsCheckDone) {
	if (uSectChecked) {
		uSectChecked = false;
		return;
	}
	if (argIsCheckDone)
		uSectChecked = true;
	var bCheckOK = true;
	//值若變更時作處理
	if (jf_Trim(document.all["dlSect_Text"].value) != "" && document.all["dlSect_Text"].value != document.all["H_Sect"].value) {

		//呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
		if (ComboBoxCheck("dlSect", "承辦科別")) {
			//存ComboBox_Text的value
			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);

			edjf_SetdlSect("dlDept", "dlSect", "dlUser", "", false, false);	//初始化承辦人選單

			document.all["H_User"].value = document.all["dlUser_Text"].value;
			document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
			document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);

			if (document.all["dlUser"].options.length > 10)
				document.all["dlUser"].size = 10;
			else if (document.all["dlUser"].options.length == 1)
				document.all["dlUser"].size = 2;
			else
				document.all["dlUser"].size = document.all["dlUser"].options.length;
		}
		else {
			uSectChecked = true;
			document.all["dlSect_Text"].value = "";
			document.all["H_Sect"].value = "";
			alert("承辦單位不存在");
			return false;
		}
	}
	uSectChecked = false;
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
	if (document.all["dlUser_Text"].value != document.all["H_User"].value) {
		if(jf_Trim(document.all["dlUser_Text"].value) != ""){
			document.all["H_User"].value = document.all["dlUser_Text"].value;
			document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
		}
		else{
			document.all["H_User"].value = "";
			document.all["H_User_Value"].value = "";
		}
	}
	uUserChecked = false;
	return bCheckOK;

}
//無值不顯示
function jf_HandleComboxStatus(argComboxID) {
	if (document.all[argComboxID].options.length <= 1)
		document.all[argComboxID + "_Container"].className = "hide";
	else
		document.all[argComboxID + "_Container"].className = "custom-combobox";
}

function CloseTypeChg() {
	if (document.all.rbCloseY.checked) {
		document.all.txSubject.readOnly = true;
		document.all.txSubject.style.backgroundColor = "LightGrey";
		document.all.txRcvDate.readOnly = true;
		document.all.txRcvDate.style.backgroundColor = "LightGrey";
		document.all.txDueDate.readOnly = true;
		document.all.txDueDate.style.backgroundColor = "LightGrey";
		document.all.txCloseNo.readOnly = false;
		document.all.txCloseNo.style.backgroundColor = "";
		$('#dlDept').combobox('setDisable');
		$('#dlSect').combobox('setDisable');
		$('#dlUser').combobox('setDisable');
		document.all.btDelete.disabled = true;
		document.all.dlAlert.disabled = true;
	}
	else {
		document.all.txSubject.readOnly = false;
		document.all.txSubject.style.backgroundColor = "";
		document.all.txRcvDate.readOnly = false;
		document.all.txRcvDate.style.backgroundColor = "";
		document.all.txDueDate.readOnly = false;
		document.all.txDueDate.style.backgroundColor = "";
		document.all.txCloseNo.readOnly = true;
		document.all.txCloseNo.style.backgroundColor = "LightGrey";
		$('#dlDept').combobox('setEnable');
		$('#dlSect').combobox('setEnable');
		$('#dlUser').combobox('setEnable');
		document.all.btDelete.disabled = false;
		document.all.dlAlert.disabled = false;
	}
}

function CheckDate(argObj, argMsg, argFromTbtool) {
	var strErrMsg = '';
	var strDate = document.all[argObj].value;
	if (strDate != "") {
		if (strDate.length < 7) {
			strDate = jf_PADL(strDate, 7, '0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate)) {
			strErrMsg += FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argMsg])) + '\n';
			if (argFromTbtool == false)
				jf_ShowMsg(strErrMsg, '');
			$('#' + argObj).focus();
		}
	}
	return strErrMsg;
}

function fnGetAlertDate() {
	if (document.all.txDueDate.value != "") {
		var strDate = ED4.EDT452.GetAlertDate(document.all.txDueDate.value, document.all.dlAlert.value).value;
		if(strDate > document.all.txDueDate.value || strDate < document.all.txRcvDate.value){
			alert('到期提醒日' + strDate.substring(0, 3) + "/" + strDate.substring(3, 5) + "/" + strDate.substring(5, 7) +  '設定錯誤，設定值需介於收(創)文日期及續辦到期日之間。')
			document.all.h_AlertDate.value = "";
			document.all.lbAlertDate.textContent = "";	
		}
		else{		
			document.all.h_AlertDate.value = strDate;
			document.all.lbAlertDate.textContent = strDate.substring(0, 3) + "/" + strDate.substring(3, 5) + "/" + strDate.substring(5, 7);	
		}
	}
	else {
		document.all.lbAlertDate.textContent = "";
		document.all.h_AlertDate.value = "";
	}
}

function fnCheckCloseState() {
	if (document.all.txCloseNo.value != "") {
		var CheckMsg = ED4.EDT452.CheckClose(document.all.OrgNo.value, document.all.txCloseNo.value).value;
		if (CheckMsg != ""){
			document.all.txCloseNo.value = "";
			alert(CheckMsg);
		}
	}
}