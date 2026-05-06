/*
DATE	SA		PRG		MGR_NO	DESC
1061005 Kevin   Joe		1060099 新增程式
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

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
	jf_HandleComboxStatus("dlUser");

	document.all["H_Dept_T"].value = document.all["dlDept_T_Text"].value;
	document.all["H_Sect_T"].value = document.all["dlSect_T_Text"].value;
	document.all["H_User_T"].value = document.all["dlUser_T_Text"].value;
	document.all["H_Dept_T_Value"].value = edjf_GetSelectValue(document.all["dlDept_T"], document.all["H_Dept_T"].value);
	document.all["H_Sect_T_Value"].value = edjf_GetSelectValue(document.all["dlSect_T"], document.all["H_Sect_T"].value);
	document.all["H_User_T_Value"].value = edjf_GetSelectValue(document.all["dlUser_T"], document.all["H_User_T"].value);
	document.all["H_dlSect_T_Value"].value = edjf_SaveCurrDL(document.all["dlSect_T"]);
	document.all["H_dlUser_T_Value"].value = edjf_SaveCurrDL(document.all["dlUser_T"]);
	jf_HandleComboxStatus("dlSect_T");
	jf_HandleComboxStatus("dlUser_T");

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
			Page_BlockSubmit = !fn_CheckBeforeSave();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			if (jf_ConfirmClean(true))
			{
				$('#txAppNoS').focus();
				document.all.rbTypeAll.checked = true;
				document.all.rbOrderNo.checked = true;
			}
			break;
		case "btPreview":
			Page_BlockSubmit = !fn_CheckBeforeSave();
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
function ReturnValue(argLink)
{
	try {
		opener.document.all.lbReturnValue.length = 1;
		opener.document.all.lbReturnValue.options[0].value = argLink;
		opener.window.CallBack("EAI812");
		close();
	}
	catch (e) { }
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
var uSectChecked = false;
var uUserChecked = false;
function dlDept_Text_onblur(Mode, argIsCheckDone) {
	if (uDeptChecked) {
		uDeptChecked = false;
		return;
	}
	if (argIsCheckDone == "true")
		uDeptChecked = true;
	var bCheckOK = true;
	if (jf_Trim(document.all["dlDept_Text"].value) == "")
	{
		document.all["dlSect_Text"].value = "";
		document.all["dlUser_Text"].value = "";
		document.all["dlSect"].length = 0;
		document.all["dlUser"].length = 0;
		document.all["H_Dept"].value = document.all["dlDept_Text"].value;
		document.all["H_Sect"].value = document.all["dlSect_Text"].value;
		document.all["H_User"].value = document.all["dlUser_Text"].value;
		document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
		document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
		document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
		document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
		document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
		jf_HandleComboxStatus("dlSect");
		jf_HandleComboxStatus("dlUser");
	}
	if (jf_Trim(document.all["dlDept_Text"].value) != "" && document.all["dlDept_Text"].value != document.all["H_Dept"].value || (document.all["dlDept_Text"].value == document.all["H_Dept"].value && Mode == "NotInit")) {

		if (ComboBoxCheck("dlDept", "承辦單位")) {
			document.all["H_Dept"].value = document.all["dlDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
			document.all["dlSect_Container"].className = "custom-combobox";

			edjf_SetdlDept("dlDept", "dlSect", "dlUser", "", false, true);	//初始dlSect、dlUser的處理

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
			jf_HandleComboxStatus("dlUser");

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
function dlSect_Text_onblur(argIsCheckDone) {
	if (uSectChecked) {
		uSectChecked = false;
		return;
	}
	if (argIsCheckDone)
		uSectChecked = true;
	var bCheckOK = true;
	if (jf_Trim(document.all["dlSect_Text"].value) == "")
	{
		edjf_SetdlDept("dlDept", "dlSect", "dlUser", "", false, true);
	}
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


var uDept_T_Checked = false;
var uSect_T_Checked = false;
var uUser_T_Checked = false;
function dlDept_T_Text_onblur(Mode, argIsCheckDone) {
	if (uDept_T_Checked) {
		uDept_T_Checked = false;
		return;
	}
	if (argIsCheckDone == "true")
		uDept_T_Checked = true;
	var bCheckOK = true;
	if (jf_Trim(document.all["dlDept_T_Text"].value) == "") {
		document.all["dlSect_T_Text"].value = "";
		document.all["dlUser_T_Text"].value = "";
		document.all["dlSect_T"].length = 0;
		document.all["dlUser_T"].length = 0;
		document.all["H_Dept_T"].value = document.all["dlDept_T_Text"].value;
		document.all["H_Sect_T"].value = document.all["dlSect_T_Text"].value;
		document.all["H_User_T"].value = document.all["dlUser_T_Text"].value;
		document.all["H_Dept_T_Value"].value = edjf_GetSelectValue(document.all["dlDept_T"], document.all["H_Dept_T"].value);
		document.all["H_Sect_T_Value"].value = edjf_GetSelectValue(document.all["dlSect_T"], document.all["H_Sect_T"].value);
		document.all["H_User_T_Value"].value = edjf_GetSelectValue(document.all["dlUser_T"], document.all["H_User_T"].value);
		document.all["H_dlSect_T_Value"].value = edjf_SaveCurrDL(document.all["dlSect_T"]);
		document.all["H_dlUser_T_Value"].value = edjf_SaveCurrDL(document.all["dlUser_T"]);
		jf_HandleComboxStatus("dlSect_T");
		jf_HandleComboxStatus("dlUser_T");
	}
	if (jf_Trim(document.all["dlDept_T_Text"].value) != "" && document.all["dlDept_T_Text"].value != document.all["H_Dept_T"].value || (document.all["dlDept_T_Text"].value == document.all["H_Dept_T"].value && Mode == "NotInit")) {

		if (ComboBoxCheck("dlDept_T", "承辦單位")) {
			document.all["H_Dept_T"].value = document.all["dlDept_T_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_T_Value"].value = edjf_GetSelectValue(document.all["dlDept_T"], document.all["H_Dept_T"].value);
			document.all["dlSect_T_Container"].className = "custom-combobox";

			edjf_SetdlDept("dlDept_T", "dlSect_T", "dlUser_T", "", false, true);	//初始dlSect_T、dlUser的處理

			document.all["H_Sect_T"].value = document.all["dlSect_T_Text"].value;
			document.all["H_User_T"].value = document.all["dlUser_T_Text"].value;
			document.all["H_Sect_T_Value"].value = edjf_GetSelectValue(document.all["dlSect_T"], document.all["H_Sect_T"].value);
			document.all["H_User_T_Value"].value = edjf_GetSelectValue(document.all["dlUser_T"], document.all["H_User_T"].value);
			document.all["H_dlSect_T_Value"].value = edjf_SaveCurrDL(document.all["dlSect_T"]);
			document.all["H_dlUser_T_Value"].value = edjf_SaveCurrDL(document.all["dlUser_T"]);
			//依選項多寡固定下拉式選單可見長度
			if (document.all["dlSect_T"].options.length > 10)
				document.all["dlSect_T"].size = 10;
			else if (document.all["dlSect_T"].options.length == 1)
				document.all["dlSect_T"].size = 2;
			else
				document.all["dlSect_T"].size = document.all["dlSect_T"].options.length;

			if (document.all["dlUser_T"].options.length > 10)
				document.all["dlUser_T"].size = 10;
			else if (document.all["dlUser_T"].options.length == 1)
				document.all["dlUser_T"].size = 2;
			else
				document.all["dlUser_T"].size = document.all["dlUser_T"].options.length;

			//無值不顯示
			jf_HandleComboxStatus("dlSect_T");
			jf_HandleComboxStatus("dlUser_T");

		}
		else {
			uDept_T_Checked = true;
			document.all["dlDept_T_Text"].value = "";
			document.all["H_Dept_T"].value = "";
			alert("承辦單位不存在");
			return false;
		}
	}
	uDept_T_Checked = false;
	return bCheckOK;
}
function dlSect_T_Text_onblur(argIsCheckDone) {
	if (uSect_T_Checked) {
		uSect_T_Checked = false;
		return;
	}
	if (argIsCheckDone)
		uSect_T_Checked = true;
	var bCheckOK = true;
	if (jf_Trim(document.all["dlSect_T_Text"].value) == "") {
		edjf_SetdlDept("dlDept_T", "dlSect_T", "dlUser_T", "", false, true);
	}
	//值若變更時作處理
	if (jf_Trim(document.all["dlSect_T_Text"].value) != "" && document.all["dlSect_T_Text"].value != document.all["H_Sect_T"].value) {

		//呼叫ED_LIB.js，檢查dlSect_T_Text所輸入的值是否存在於下拉式選單
		if (ComboBoxCheck("dlSect_T", "承辦科別")) {
			//存ComboBox_Text的value
			document.all["H_Sect_T"].value = document.all["dlSect_T_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_T_Value"].value = edjf_GetSelectValue(document.all["dlSect_T"], document.all["H_Sect_T"].value);

			edjf_SetdlSect("dlDept_T", "dlSect_T", "dlUser_T", "", false, true);	//初始化承辦人選單

			document.all["H_User_T"].value = document.all["dlUser_T_Text"].value;
			document.all["H_User_T_Value"].value = edjf_GetSelectValue(document.all["dlUser_T"], document.all["H_User_T"].value);
			document.all["H_dlUser_T_Value"].value = edjf_SaveCurrDL(document.all["dlUser_T"]);

			if (document.all["dlUser_T"].options.length > 10)
				document.all["dlUser_T"].size = 10;
			else if (document.all["dlUser_T"].options.length == 1)
				document.all["dlUser_T"].size = 2;
			else
				document.all["dlUser_T"].size = document.all["dlUser_T"].options.length;
		}
		else {
			uSect_T_Checked = true;
			document.all["dlSect_T_Text"].value = "";
			document.all["H_Sect_T"].value = "";
			alert("承辦單位不存在");
			return false;
		}
	}
	uSect_T_Checked = false;
	return bCheckOK;


}
function dlUser_T_Text_onblur(argIsCheckDone) {
	if (uUser_T_Checked) {
		uUser_T_Checked = false;
		return;
	}
	if (argIsCheckDone)
		uUser_T_Checked = true;
	var bCheckOK = true;
	//值若變更時作處理
	if (jf_Trim(document.all["dlUser_T_Text"].value) != "" && document.all["dlUser_T_Text"].value != document.all["H_User_T"].value) {
		document.all["H_User_T"].value = document.all["dlUser_T_Text"].value;
		document.all["H_User_T_Value"].value = edjf_GetSelectValue(document.all["dlUser_T"], document.all["H_User_T"].value);
	}
	uUser_T_Checked = false;
	return bCheckOK;
}
//無值不顯示
function jf_HandleComboxStatus(argComboxID) {
	if (document.all[argComboxID].options.length <= 1)
		document.all[argComboxID + "_Container"].className = "hide";
	else
		document.all[argComboxID + "_Container"].className = "custom-combobox";
}

//取得下拉選單物件中，與指定Text相對應的值
function edjf_GetSelectValue(argSelect, argText) {
	var RtnValue = "";
	for (var i = 0; i < argSelect.options.length; i++) {
		if (argSelect.options[i].text == argText) {
			RtnValue = argSelect.options[i].value;
			break;
		}
	}
	return RtnValue;
}

//將下拉選單裡的options轉成字串相加再回傳，格式： [項目Text;項目Value|項目Text;項目Value|...]
function edjf_SaveCurrDL(argSource) {
	var strTemp = "";
	for (var i = 0 ; i < argSource.options.length ; i++)
		strTemp += argSource.options[i].text + ";" + argSource.options[i].value + "|";

	return strTemp.substr(0, strTemp.length - 1);
}
function edjf_SetdlDept(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree, argDeptOnly) {
	//取得Combo物件
	var DeptComboBoxObj = document.all[argDeptComboBoxID];
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var SectComboBoxObj = document.all[argSectComboBoxID];
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	var UserComboBoxObj = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];

	//如果一級單位目前所選為空值，則將二級單位及人員設定為無選項且顯示為空值
	if (DeptComboBoxTextObj.value == "") {
		if (SectComboBoxObj != null && SectComboBoxTextObj != null) {
			while (SectComboBoxObj.length > 0)
				SectComboBoxObj.remove(0);
			SectComboBoxObj.size = 2;
			SectComboBoxObj.options.add(new Option("", ""));
			SectComboBoxTextObj.value = "";
		}

		if (UserComboBoxObj != null && UserComboBoxTextObj != null) {
			while (UserComboBoxObj.length > 0)
				UserComboBoxObj.remove(0);
			UserComboBoxObj.size = 2;
			UserComboBoxObj.options.add(new Option("", ""));
			UserComboBoxTextObj.value = "";
		}
		return;
	}

	if (SectComboBoxObj != null && SectComboBoxTextObj != null) {
		//承辦科別下拉選單不為隱藏才初始
		if (SectComboBoxTextObj.className != "hide") {
			var val = DeptComboBoxObj.value.split(":")[0];

			var callObj = jf_CallWS("../../../ED/EDLIB/EDWS.asmx", "GetSubUnit", false, val);

			var resultObj = null;
			if (jf_IsWebServiceSuccess(callObj)) {
				resultObj = callObj.value;
				//return;
			}

			var SectNameMem = SectComboBoxTextObj.value;

			//清空選項
			while (SectComboBoxObj.length > 0)
				SectComboBoxObj.remove(0);

			//重新新增選項
			len = resultObj.SectName.length;
			SectComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
			SectComboBoxObj.options.add(new Option("", ""));
			//檢核是否加入"(僅含一級單位)"的選項
			if (len > 0 && argDeptOnly)//若有二級單位,且要顯示"(僅含一級單位)"的選項
				SectComboBoxObj.options.add(new Option("(僅含一級單位)", ""));

			for (i = 0 ; i < len ; i++) {
				//項目格式： [承辦科別名稱][承辦單位代碼:承辦單位名稱:承辦科別代碼:承辦科別名稱]
				var objOption = new Option(resultObj.SectName[i], resultObj.SecNo[i] + ":" + resultObj.SectName[i] + ":" + resultObj.SecNo[i] + ":" + resultObj.SectName[i])
				SectComboBoxObj.options.add(objOption);
			}

			//清空顯示的Text，以及重設選擇
			SectComboBoxTextObj.value = "";
			SectComboBoxObj.selectedIndex = -1;
			for (i = 0 ; i < len ; i++) {
				if (SectNameMem == resultObj.SectName[i] || SectNameMem == resultObj.SecNo[i]) {
					SectComboBoxTextObj.value = resultObj.SectName[i];
					SectComboBoxObj.selectedIndex = i; +1
					break;
				}
			}
		}
	}

	if (UserComboBoxObj != null && UserComboBoxTextObj != null) {
		//承辦人下拉選單不為隱藏才初始
		if (UserComboBoxTextObj.className != "hide") {
			var valUser = new Array(3);
			if (SectComboBoxObj == null)
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
			else if (SectComboBoxObj.selectedIndex == -1)	//如果承辦科別有選擇就以承辦科別為單位代碼參數
				valUser[0] = DeptComboBoxObj.value.split(":")[0];
			else
				valUser[0] = SectComboBoxObj.value.split(":")[2];
			valUser[1] = argRoleNo;
			valUser[2] = argSubTree;

			valUser[0] = encodeURI(valUser[0]);
			valUser[1] = encodeURI(valUser[1]);
			valUser[2] = encodeURI(valUser[2]);
			var callObj = jf_CallWS("../../../ED/EDLIB/EDWS.asmx", "GetUnitAllUsers", false, valUser);

			var resultObj = null;
			if (jf_IsWebServiceSuccess(callObj)) {
				resultObj = callObj.value;
				//return;
			}

			var UserNameMem = UserComboBoxTextObj.value;

			//清空選項
			while (UserComboBoxObj.length > 0)
				UserComboBoxObj.remove(0);

			//重新新增選項
			len = resultObj.UserName.length;
			UserComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
			UserComboBoxObj.options.add(new Option("", ""));
			for (i = 0 ; i < len ; i++) {
				//項目格式： [承辦人名稱][承辦單位代碼:承辦科別代碼:承辦人代碼:承辦人名稱]
				var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i] + ":" + resultObj.SectNo[i] + ":" + resultObj.UserName[i] + ":" + resultObj.EmpName[i])
				UserComboBoxObj.options.add(objOption);
			}

			//清空顯示的Text，以及重設選擇
			UserComboBoxTextObj.value = "";
			UserComboBoxObj.selectedIndex = -1;
			for (i = 0 ; i < len ; i++) {
				if (UserNameMem == resultObj.EmpName[i] || UserNameMem == resultObj.UserName[i]) {
					UserComboBoxTextObj.value = resultObj.EmpName[i];
					UserComboBoxObj.selectedIndex = i + 1;
					break;
				}
			}
		}
	}
}
function edjf_SetdlSect(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree) {
	//取得Combo物件
	var DeptComboBoxObj = document.all[argDeptComboBoxID];
	var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
	var SectComboBoxObj = document.all[argSectComboBoxID];
	var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
	var UserComboBoxObj = document.all[argUserComboBoxID];
	var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];

	//如果承辦單位目前所選為空值，則將承辦科別及承辦人也都設定為無選項且顯示為空值
	if (DeptComboBoxTextObj.value == "") {
		if (SectComboBoxObj != null && SectComboBoxTextObj != null) {
			while (SectComboBoxObj.length > 0)
				SectComboBoxObj.remove(0);
			SectComboBoxObj.size = 2;
			SectComboBoxObj.options.add(new Option("", ""));
			SectComboBoxTextObj.value = "";
		}

		if (UserComboBoxObj != null && UserComboBoxTextObj != null) {
			while (UserComboBoxObj.length > 0)
				UserComboBoxObj.remove(0);
			UserComboBoxObj.size = 2;
			UserComboBoxObj.options.add(new Option("", ""));
			UserComboBoxTextObj.value = "";
		}
		return;
	}

	if (UserComboBoxObj != null && UserComboBoxTextObj != null) {
		var valUser = new Array(3);
		if (SectComboBoxObj.value == "")
			valUser[0] = DeptComboBoxObj.value.split(":")[0];
		else
			valUser[0] = SectComboBoxObj.value.split(":")[2];
		valUser[1] = argRoleNo;
		valUser[2] = argSubTree;

		valUser[0] = encodeURI(valUser[0]);
		valUser[1] = encodeURI(valUser[1]);
		valUser[2] = encodeURI(valUser[2]);
		callObj = jf_CallWS("../../../ED/EDLIB/EDWS.asmx", "GetUnitAllUsers", false, valUser);

		resultObj = null;
		if (callObj.error)
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([callObj.errorDetail.string])), "");
		else {
			if (jf_IsWebServiceSuccess(callObj))
				resultObj = callObj.value;
		}

		var UserNameMem = UserComboBoxTextObj.value;

		//清空選項
		while (UserComboBoxObj.length > 0)
			UserComboBoxObj.remove(0);

		//重新新增選項
		len = resultObj.UserName.length;
		UserComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
		UserComboBoxObj.options.add(new Option("", ""));
		for (i = 0 ; i < len ; i++) {
			//項目格式： [承辦人名稱][承辦單位代碼:承辦科別代碼:承辦人代碼:承辦人名稱]
			var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i] + ":" + resultObj.SectNo[i] + ":" + resultObj.UserName[i] + ":" + resultObj.EmpName[i])
			UserComboBoxObj.options.add(objOption);
		}

		//清空顯示的Text，以及重設選擇
		UserComboBoxTextObj.value = "";
		UserComboBoxObj.selectedIndex = -1;
		for (i = 0 ; i < len ; i++) {
			if (UserNameMem == resultObj.EmpName[i] || UserNameMem == resultObj.UserName[i]) {
				UserComboBoxTextObj.value = resultObj.EmpName[i];
				UserComboBoxObj.selectedIndex = i;
				break;
			}
		}
	}
}

function CheckCDATE(argObj, strMsg) {
	var strDate = document.all[argObj].value;
	if (strDate != "") {
		if (strDate.length < 7) {
			strDate = jf_PADL(strDate, 7, '0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate)) {
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
			$('#' + argObj).focus();
			return false;
		}
	}
	return true;
}

function fn_CheckBeforeSave()
{
	var bPostBack = false;
	if (document.all.txAppNoS.value != "" || document.all.txAppNoE.value != "")
	{
		if (document.all.txAppNoS.value == "")
			document.all.txAppNoS.value = document.all.txAppNoE.value;
		else if (document.all.txAppNoE.value == "")
			document.all.txAppNoE.value = document.all.txAppNoS.value;
		else if(document.all.txAppNoS.value > document.all.txAppNoE.value)
		{
			var temp = document.all.txAppNoE.value;
			document.all.txAppNoE.value = document.all.txAppNoS.value;
			document.all.txAppNoS.value = temp;
		}
		bPostBack = true;
	}
	if (document.all.txAppDateS.value != "" || document.all.txAppDateE.value != "")
	{
		if (document.all.txAppDateS.value == "")
			document.all.txAppDateS.value = document.all.txAppDateE.value;
		else if (document.all.txAppDateE.value == "")
			document.all.txAppDateE.value = document.all.txAppDateS.value;
		else if (document.all.txAppDateS.value > document.all.txAppDateE.value) {
			var temp = document.all.txAppDateE.value;
			document.all.txAppDateE.value = document.all.txAppDateS.value;
			document.all.txAppDateS.value = temp;
		}
		bPostBack = true;
	}
	if (jf_Trim(document.all["dlDept_T_Text"].value) != "" || jf_Trim(document.all["dlDept_Text"].value) != "")
		bPostBack = true;
	if (!bPostBack)
		alert("查詢條件不可為空白");
	return bPostBack;
}