/*
DATE		SA		PRG			MGR_NO		DESC
1051117		Kevin	Joe			1050595		新增程式
1051118		Kevin	Joe			1050595		二代升級
1060612		Kevin	Joe			1060028		中榮需求，變更查詢區間列印
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

//1051118   Joe   1050595   二代升級--S
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1051118   Joe   1050595   二代升級--S

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

	document.all.dlDept.selectedIndex = -1;
	document.all.dlSect.selectedIndex = -1;
	document.all.dlUser.selectedIndex = -1;
	document.all.dlDept_Text.value = "";
	document.all.dlSect_Text.value = "";
	document.all.dlUser_Text.value = "";

	jf_HandleComboxStatus("dlSect");

	document.all.rbType1.checked = true;
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051118   Joe   1050595   二代升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051118   Joe   1050595   二代升級
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
//1051118 Joe 1050595 二代升級，參數多加event
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
	
	//1051118 Joe 1050595 二代升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{

		case "btPrint":
			Page_BlockSubmit = !Check_MONTH();
			//1051118 Joe 1050595 二代升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !Check_MONTH();
			//1051118 Joe 1050595 二代升級
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btExcel":
			Page_BlockSubmit = !Check_MONTH();
			//1051118 Joe 1050595 二代升級
			//jf_ToolBarSubmit();
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
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//增加此檢查函式，於統計月份欄位Onblur時，自動補0以及檢查統計月份欄位是否符合格式
function Check_MONTH()
{
	//1060612	Joe		1060028		變更為區間查詢--S
	if(document.all.txMonth.value == "" && document.all.txMonthEnd.value == "")
	{
		jf_ShowMeg("列印日期不可為空白,請重新輸入", "");		
		return false;
	}
	else if(document.all.txMonth.value == "")
		document.all.txMonth.value = document.all.txMonthEnd.value;
	else if(document.all.txMonthEnd.value == "")
		document.all.txMonthEnd.value = document.all.txMonth.value;
	else if(document.all.txMonth.value > document.all.txMonthEnd.value)
	{
		var strTemp = document.all.txMonthEnd.value;
		document.all.txMonthEnd.value = document.all.txMonth.value;
		document.all.txMonth.value = strTemp;
	}		
	//1060612	Joe		1060028		變更為區間查詢--E
	var bCheckPostBack;
	if (document.all.txMonth.value.length < 5)
	{
		document.all.txMonth.value = jf_PADL(document.all.txMonth.value, 5, "0");
	}
	//1060612	Joe		1060028		變更為區間查詢--S
	if (document.all.txMonthEnd.value.length < 5)
	{
		document.all.txMonthEnd.value = jf_PADL(document.all.txMonthEnd.value, 5, "0");
	}
	// if (!jf_CheckCDATE(document.all.txMonth.value + "01"))
	if (!jf_CheckCDATE(document.all.txMonth.value + "01") || !jf_CheckCDATE(document.all.txMonthEnd.value + "01"))
	//1060612	Joe		1060028		變更為區間查詢--E
	{
		jf_ShowMeg("輸入的月份不合法,請重新輸入", "");
		bCheckPostBack = false;
		//1060612	Joe		1060028		變更為區間查詢
		if(!jf_CheckCDATE(document.all.txMonth.value + "01"))
			//1051118	Joe		1050595		升級二代
			// document.all.txMonth.focus();
			$('#' + txMonth.id).focus();
		//1060612	Joe		1060028		變更為區間查詢--S
		else
			$('#' + txMonthEnd.id).focus();
		//1060612	Joe		1060028		變更為區間查詢--E
		return false;
	}
	else
	{
		bCheckPostBack = true;
	}
	return bCheckPostBack;
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

	if (!bRtnBool) 
	{
		//1051118	Joe		1050595		升級二代
		// ComboBoxTextObj.focus();
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
			//1051118	Joe		1050595		升級二代
			// document.all["dlSect_Container"].className = "InputFieldText";
			document.all["dlSect_Container"].className = "custom-combobox";
			edjf_SetdlDept("dlDept", "dlSect", "dlUser", "", true, true);	//初始dlSect、dlUser的處理

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

			edjf_SetdlSect("dlDept", "dlSect", "dlUser", "", false, true);	//初始化承辦人選單

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
	if (jf_Trim(document.all["dlUser_Text"].value) != "" && document.all["dlUser_Text"].value != document.all["H_User"].value) {
		document.all["H_User"].value = document.all["dlUser_Text"].value;
		document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
	}
	uUserChecked = false;
	return bCheckOK;

}
//無值不顯示
function jf_HandleComboxStatus(argComboxID) {
	if (document.all[argComboxID].options.length <= 1)
		document.all[argComboxID + "_Container"].className = "hide";
	else
		//1051118	Joe		1050595		升級二代
		// document.all[argComboxID + "_Container"].className = "InputFieldText";
		document.all[argComboxID + "_Container"].className = "custom-combobox";
}
