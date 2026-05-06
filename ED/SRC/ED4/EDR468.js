/*
DATE		SA		PRG		MGR_NO		DESC
1050914		Kevin	Joe		1050116		新增本作業
1051019     Leslie  Kenny   1050087     二代公文修改
1060216     Kevin   Justin  1060085     新增判斷為鐵改局時逾期天數改為自幾天起
1060526     Kevin	Joe		1060399	    依需求修改報表，不顯示二級單位
1060801		Kevin	Joe		1060399		修改由通知開啟時會辦單位初始化邏輯
1140226		Joe		Joe		1131189		新增北榮客製化報表
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
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	//1060526	Kevin	Joe		1060399	    預設為全部
	//document.all.rbType1.checked = true;
	//1140211	Joe		1131189		修正應於Server預設
	// document.all.rbType3.checked = true;
	// document.all.rbPrint1.checked = true;
	
	//初始化comboBox
	//1060801	Joe		1060399		修改由通知開啟時會辦單位初始化邏輯--S
	if (document.all.dlCoWDept.disabled == true && document.all.dlCoWUser.disabled == false)
	{
		if (document.all.dlCoWSect.disabled == true)
			dlCoWSect_Text_onblur("Onblur","true");
		else
			dlCoWDept_Text_onblur("Onblur", "true");
	}
	//1060801	Joe		1060399		修改由通知開啟時會辦單位初始化邏輯--E
	
	document.all["H_Dept"].value = document.all["dlDept_Text"].value;
	document.all["H_Sect"].value = document.all["dlSect_Text"].value;
	document.all["H_User"].value = document.all["dlUser_Text"].value;
	document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
	document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
	document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
	document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
	document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
	jf_HandleComboxStatus("dlSect");

	document.all["H_CoWDept"].value = document.all["dlCoWDept_Text"].value;
	document.all["H_CoWSect"].value = document.all["dlCoWSect_Text"].value;
	document.all["H_CoWUser"].value = document.all["dlCoWUser_Text"].value;
	document.all["H_CoWDept_Value"].value = edjf_GetSelectValue(document.all["dlCoWDept"], document.all["H_CoWDept"].value);
	document.all["H_CoWSect_Value"].value = edjf_GetSelectValue(document.all["dlCoWSect"], document.all["H_CoWSect"].value);
	document.all["H_CoWUser_Value"].value = edjf_GetSelectValue(document.all["dlCoWUser"], document.all["H_CoWUser"].value);
	document.all["H_dlCoWSect_Value"].value = edjf_SaveCurrDL(document.all["dlCoWSect"]);
	document.all["H_dlCoWUser_Value"].value = edjf_SaveCurrDL(document.all["dlCoWUser"]);
	jf_HandleComboxStatus("dlCoWSect");
	
	if(document.all["dg1"] != undefined)
		fnDgDate();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
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
		case "btSearch":
		case "btPreview":
		case "btExcel":
			//檢查日期欄位、公文文號起訖是否需交換
			Page_BlockSubmit = CheckDateSE();
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
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//DataGrid欄位處理
function fnDgDate()
{
	for(i=2;i<document.all["dg1"].rows.length + 1; i++)
	{
		var tempControl = document.all["dg1__ctl" + i + "_lbRCV_DATE"];
		tempControl.textContent = tempControl.textContent.substring(0,3) + '/' + tempControl.textContent.substring(3,5) + '/' + tempControl.textContent.substring(5,7) 
	}		
}
//檢查日期欄位、公文文號起訖是否需交換
function CheckDateSE()
{
	var Temp;
	if(document.all["txDateS"].value=="" && document.all["txDateE"].value== "")
	{
		alert("稽催期間不可為空");
		return true;
	}
	else
	{
		if (document.all["txDateS"].value == "")
			document.all["txDateS"].value = document.all["txDateE"].value;
		else if (document.all["txDateE"].value == "")
			document.all["txDateE"].value = document.all["txDateS"].value;
		else if (document.all["txDateS"].value > document.all["txDateE"].value) {
			Temp = document.all["txDateS"].value;
			document.all["txDateS"].value = document.all["txDateE"].value;
			document.all["txDateE"].value = Temp;
		}
	}
	if (document.all["txRcvDateS"].value != "" || document.all["txRcvDateE"].value != "")
	{
		if (document.all["txRcvDateS"].value == "")
			document.all["txRcvDateS"].value = document.all["txRcvDateE"].value;
		else if (document.all["txRcvDateE"].value == "")
			document.all["txRcvDateE"].value = document.all["txRcvDateS"].value;
		else if (document.all["txRcvDateS"].value > document.all["txRcvDateE"].value)
		{
			Temp = document.all["txRcvDateS"].value;
			document.all["txRcvDateS"].value = document.all["txRcvDateE"].value;
			document.all["txRcvDateE"].value = Temp;
		}
	}

	if (document.all["txCoWDateS"].value != "" || document.all["txCoWDateE"].value != "") {
		if (document.all["txCoWDateS"].value == "")
			document.all["txCoWDateS"].value = document.all["txCoWDateE"].value;
		else if (document.all["txCoWDateE"].value == "")
			document.all["txCoWDateE"].value = document.all["txCoWDateS"].value;
		else if (document.all["txCoWDateS"].value > document.all["txCoWDateE"].value) {
			Temp = document.all["txCoWDateS"].value;
			document.all["txCoWDateS"].value = document.all["txCoWDateE"].value;
			document.all["txCoWDateE"].value = Temp;
		}
	}
    //1060216 Justin [1060085] 新增判斷為鐵改局時逾期天數改為自幾天起
	if (document.all["txDayE"].className != "hide")
	    if (document.all["txDayS"].value != "" || document.all["txDayE"].value != "") {
		    if (document.all["txDayS"].value == "")
			    document.all["txDayS"].value = document.all["txDayE"].value;
		    else if (document.all["txDayE"].value == "")
			    document.all["txDayE"].value = document.all["txDayS"].value;
		    else if (document.all["txDayS"].value > document.all["txDayE"].value) {
			    Temp = document.all["txDayS"].value;
			    document.all["txDayS"].value = document.all["txDayE"].value;
			    document.all["txDayE"].value = Temp;
		    }
	    }

	if (document.all["txSDocNo"].value != "" || document.all["txEDocNo"].value != "")
	{
		if (document.all["txSDocNo"].value == "")
			document.all["txSDocNo"].value = document.all["txEDocNo"].value;
		else if (document.all["txEDocNo"].value == "")
			document.all["txEDocNo"].value = document.all["txSDocNo"].value;
		else if (document.all["txSDocNo"].value > document.all["txEDocNo"].value)
		{
			Temp = document.all["txSDocNo"].value;
			document.all["txSDocNo"].value = document.all["txEDocNo"].value;
			document.all["txEDocNo"].value = Temp;
		}
	}

	return false;
}
//檢查日期格式
function txDateS_blur()
{
	CheckDate(document.all["txDateS"], "稽催期間(起)");
}

function txDateE_blur()
{
	CheckDate(document.all["txDateE"], "稽催期間(迄)");
}

function txRcvDateS_blur()
{
	CheckDate(document.all["txRcvDateS"], "收創文日期(起)");
}
function txRcvDateE_blur()
{
	CheckDate(document.all["txRcvDateE"], "收創文日期(迄)");
}
function txCoWDateS_blur()
{
	CheckDate(document.all["txCoWDateS"], "會辦日期(起)");
}
function txCoWDateE_blur()
{
	CheckDate(document.all["txCoWDateE"], "會辦日期(迄)");
}
function CheckDate(argObj,argObjName)
{
	if(argObj.value != "")
	{
		jf_PADCHAR(argObj,7,'0');
		if(!jf_CheckCDATE(argObj.value))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName+"格式不正確"])),"");
			$('#' + argObj.id).focus();			
			return false;
		}
	}
}

//ComboBox 處理

//無值不顯示
function jf_HandleComboxStatus(argComboxID) {
	//1060525	Joe		1060398		一律隱藏二級單位--S
	//if (document.all[argComboxID].options.length <= 1)
	//	document.all[argComboxID + "_Container"].className = "hide";
	//else
	//	document.all[argComboxID + "_Container"].className = "custom-combobox";
	document.all[argComboxID + "_Container"].className = "hide";
	//1060525	Joe		1060398		一律隱藏二級單位--E
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

var uCoWDeptChecked = false;
function dlCoWDept_Text_onblur(Mode, argIsCheckDone) {
	if (uCoWDeptChecked) {
		uCoWDeptChecked = false;
		return;
	}
	if (argIsCheckDone == "true")
		uCoWDeptChecked = true;
	var bCheckOK = true;
	if (jf_Trim(document.all["dlCoWDept_Text"].value) != "" && document.all["dlCoWDept_Text"].value != document.all["H_CoWDept"].value || (document.all["dlCoWDept_Text"].value == document.all["H_CoWDept"].value && Mode == "NotInit")) {

		if (ComboBoxCheck("dlCoWDept", "承辦單位")) {
			document.all["H_CoWDept"].value = document.all["dlCoWDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_CoWDept_Value"].value = edjf_GetSelectValue(document.all["dlCoWDept"], document.all["H_CoWDept"].value);
			document.all["dlCoWSect_Container"].className = "custom-combobox";

			edjf_SetdlDept("dlCoWDept", "dlCoWSect", "dlCoWUser", "", true, true);	//初始dlCoWSect、dlCoWUser的處理

			document.all["H_CoWSect"].value = document.all["dlCoWSect_Text"].value;
			document.all["H_CoWUser"].value = document.all["dlCoWUser_Text"].value;
			document.all["H_CoWSect_Value"].value = edjf_GetSelectValue(document.all["dlCoWSect"], document.all["H_CoWSect"].value);
			document.all["H_CoWUser_Value"].value = edjf_GetSelectValue(document.all["dlCoWUser"], document.all["H_CoWUser"].value);
			document.all["H_dlCoWSect_Value"].value = edjf_SaveCurrDL(document.all["dlCoWSect"]);

			document.all["H_dlCoWUser_Value"].value = edjf_SaveCurrDL(document.all["dlCoWUser"]);
			//依選項多寡固定下拉式選單可見長度
			if (document.all["dlCoWSect"].options.length > 10)
				document.all["dlCoWSect"].size = 10;
			else if (document.all["dlCoWSect"].options.length == 1)
				document.all["dlCoWSect"].size = 2;
			else
				document.all["dlCoWSect"].size = document.all["dlCoWSect"].options.length;

			if (document.all["dlCoWUser"].options.length > 10)
				document.all["dlCoWUser"].size = 10;
			else if (document.all["dlCoWUser"].options.length == 1)
				document.all["dlCoWUser"].size = 2;
			else
				document.all["dlCoWUser"].size = document.all["dlCoWUser"].options.length;

			//無值不顯示
			jf_HandleComboxStatus("dlCoWSect");
			//jf_HandleComboxStatus("dlCoWUser");

		}
		else {
			uCoWDeptChecked = true;
			document.all["dlCoWDept_Text"].value = "";
			document.all["H_CoWDept"].value = "";
			alert("承辦單位不存在");
			return false;
		}
	}
	uCoWDeptChecked = false;
	return bCheckOK;
}
var uCoWSectChecked = false;
function dlCoWSect_Text_onblur(argIsCheckDone) {
	if (uCoWSectChecked) {
		uCoWSectChecked = false;
		return;
	}
	if (argIsCheckDone)
		uCoWSectChecked = true;
	var bCheckOK = true;
	//值若變更時作處理
	if (jf_Trim(document.all["dlCoWSect_Text"].value) != "" && document.all["dlCoWSect_Text"].value != document.all["H_CoWSect"].value) {

		//呼叫ED_LIB.js，檢查dlCoWSect_Text所輸入的值是否存在於下拉式選單
		if (ComboBoxCheck("dlCoWSect", "承辦科別")) {
			//存ComboBox_Text的value
			document.all["H_CoWSect"].value = document.all["dlCoWSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_CoWSect_Value"].value = edjf_GetSelectValue(document.all["dlCoWSect"], document.all["H_CoWSect"].value);

			edjf_SetdlSect("dlCoWDept", "dlCoWSect", "dlCoWUser", "", false, true);	//初始化承辦人選單

			document.all["H_CoWUser"].value = document.all["dlCoWUser_Text"].value;
			document.all["H_CoWUser_Value"].value = edjf_GetSelectValue(document.all["dlCoWUser"], document.all["H_CoWUser"].value);
			document.all["H_dlCoWUser_Value"].value = edjf_SaveCurrDL(document.all["dlCoWUser"]);

			if (document.all["dlCoWUser"].options.length > 10)
				document.all["dlCoWUser"].size = 10;
			else if (document.all["dlCoWUser"].options.length == 1)
				document.all["dlCoWUser"].size = 2;
			else
				document.all["dlCoWUser"].size = document.all["dlCoWUser"].options.length;
		}
		else {
			uCoWSectChecked = true;
			document.all["dlCoWSect_Text"].value = "";
			document.all["H_CoWSect"].value = "";
			alert("承辦單位不存在");
			return false;
		}
	}
	uCoWSectChecked = false;
	return bCheckOK;


}
var uCoWUserChecked = false;
function dlCoWUser_Text_onblur(argIsCheckDone) {
	if (uCoWUserChecked) {
		uCoWUserChecked = false;
		return;
	}
	if (argIsCheckDone)
		uCoWUserChecked = true;
	var bCheckOK = true;
	//值若變更時作處理
	if (jf_Trim(document.all["dlCoWUser_Text"].value) != "" && document.all["dlCoWUser_Text"].value != document.all["H_CoWUser"].value) {
		document.all["H_CoWUser"].value = document.all["dlCoWUser_Text"].value;
		document.all["H_CoWUser_Value"].value = edjf_GetSelectValue(document.all["dlCoWUser"], document.all["H_CoWUser"].value);
	}
	uCoWUserChecked = false;
	return bCheckOK;

}