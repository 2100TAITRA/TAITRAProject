/*
DATE		SA		PRG		MGR_NO		DESC
1061024     David   Justin  1060953     新增本作業
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
		case "btPreview":
		case "btExcel":
		    Page_BlockSubmit = !CheckBefore();
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
function CheckBefore()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (document.all["txRcvDateS"].value == "" && document.all["txRcvDateE"].value == "")
    {
        strErrMsg += "日期不可皆為空白";
    }

    if (strErrMsg != "") {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    else {
        CheckSE(document.all["txSDocNo"], document.all["txEDocNo"]);
        CheckSE(document.all["txRcvDateS"], document.all["txRcvDateE"]);
    }

    return bRtnbool;
}

//檢查起迄
function CheckSE(argObjS, argObjE)
{
    var strS = argObjS.value;
    var strE = argObjE.value;

    if (strS == "" && strE != "")
        argObjS.value = strE;
    if (strE == "" && strS != "")
        argObjE.value = strS;

    if (strS != "" && strE != "" && strS > strE) {
        argObjS.value = strE;
        argObjE.value = strS;
    }
}

//檢查日期格式
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

//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
	if (document.all[argComboxID].options.length <= 1)
		document.all[argComboxID + "_Container"].className = "hide";
	else
		document.all[argComboxID + "_Container"].className = "custom-combobox";
}

function ComboBoxCheck(argComboBoxID, argKeyMsg)
{
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
function dlDept_Text_onblur(Mode, argIsCheckDone)
{
	if (uDeptChecked) {
		uDeptChecked = false;
		return;
	}
	if (argIsCheckDone == "true")
		uDeptChecked = true;
	var bCheckOK = true;
	if (document.all["dlDept_Text"].value != document.all["H_Dept"].value || (document.all["dlDept_Text"].value == document.all["H_Dept"].value && Mode == "NotInit")) {

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
function dlSect_Text_onblur(argIsCheckDone)
{
	if (uSectChecked) {
		uSectChecked = false;
		return;
	}
	if (argIsCheckDone)
		uSectChecked = true;
	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlSect_Text"].value != document.all["H_Sect"].value) {

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
function dlUser_Text_onblur(argIsCheckDone)
{
	if (uUserChecked) {
		uUserChecked = false;
		return;
	}
	if (argIsCheckDone)
		uUserChecked = true;
	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlUser_Text"].value != document.all["H_User"].value) {
		document.all["H_User"].value = document.all["dlUser_Text"].value;
		document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
	}
	uUserChecked = false;
	return bCheckOK;

}