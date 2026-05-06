/*
DATE 	SA		PRG		MGR_NO		DESC
1100519	Kevin	Joe 	1090603		新增程式
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

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
	
	if(document.all.dlDept.value != "" && document.all.dlUser.options.length == 0){
		if (document.all["H_Dept_Value"].value.split(':').length == 2) {
			SetUser(document.all["H_Dept_Value"].value.split(':')[0], true);
		}
		else if (document.all["H_Dept_Value"].value.split(':').length == 4) {
			SetUser(document.all["H_Dept_Value"].value.split(':')[2], true);
		}
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

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_btFLD_TYPE"] != null)
    {
        btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
    }

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
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

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
        case "btPrint":
        case "btPreview":
        case "btExcel":
            Page_BlockSubmit = !CheckBeforeSearch();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/

//組出回傳值
function ReturnValue(argDept, argUser, argDocNo) {

	try {
		opener.document.all.lbReturnValue.length = 1;
		opener.document.all.lbReturnValue.options[0].value = argDocNo;
		opener.window.CallBack("EDI452");
		close();
	}
	catch (e) { }

}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforeSearch()
{
	var bRtn = true;
    if (document.all.txDocNoS.value == "" && document.all.txDocNoE.value != "")
        document.all.txDocNoS.value = document.all.txDocNoE.value;
    else if (document.all.txDocNoS.value != "" && document.all.txDocNoE.value == "")
        document.all.txDocNoE.value = document.all.txDocNoS.value;
    else if (document.all.txDocNoS.value > document.all.txDocNoE.value) {
        var tmp = document.all.txDocNoS.value;
        document.all.txDocNoS.value = document.all.txDocNoE.value;
        document.all.txDocNoE.value = tmp;
    }

    if (document.all.txDateS.value == "" && document.all.txDateE.value != "")
        document.all.txDateS.value = document.all.txDateE.value;
    else if (document.all.txDateS.value != "" && document.all.txDateE.value == "")
        document.all.txDateE.value = document.all.txDateS.value;
    else if (document.all.txDateS.value > document.all.txDateE.value) {
        var tmp = document.all.txDateS.value;
        document.all.txDateS.value = document.all.txDateE.value;
        document.all.txDateE.value = tmp;
    }
	
	if(document.all.rbCloseY.checked == true || document.all.rbCloseAll.checked == true){
		if(document.all.txDocNoS.value + document.all.txDateS.value == ""){
			alert('查詢結案公文時，請輸入文號或日期條件。');
			bRtn = false;
		}
	}
	
	return bRtn;
}

function CheckDATE(argObj, strMsg)
{
    var strDate = document.all[argObj].value;
    if (strDate != "")
    {
        if (strDate.length < 7)
        {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate))
        {
            $('#' + argObj).focus();
            if (strMsg)
                jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            bHasCheck = false;
            return false;
        }
    }
    return true;
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

var CheckUserNo = "";
var strBuf = "";
function dlDept_Text_onblur() {
    var PriNo = document.all["H_Privilege"].value;
	if (document.all.dlDept.value == "") {
	    document.all["dlDept_Text"].value = "";
	    document.all["H_Dept"].value = "";
	    document.all["dlSect_Text"].value = "";
	    document.all["H_Sect"].value = "";
	    return;
	}
	if (jf_Trim(document.all["dlDept_Text"].value) != "" && document.all["dlDept_Text"].value != document.all["H_Dept"].value || (document.all["dlDept_Text"].value == document.all["H_Dept"].value)) {

		if (ComboBoxCheck("dlDept", "承辦單位")) {
			document.all["H_Dept"].value = document.all["dlDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
            
			if (PriNo == "0003") {
				edjf_SetdlDept("dlDept","dlSect","dlUser","",false,false);	//初始dlSect、dlUser的處理
			}
			else {
			    if (document.all["H_Dept_Value"].value.split(':').length == 6) {
			        while (document.all["dlUser"].length > 0)
			            document.all["dlUser"].remove(0);
			        document.all["dlUser"].options.add(new Option("", ""));
			    }
			    else if (document.all["H_Dept_Value"].value.split(':').length == 2) {
			        SetUser(document.all["H_Dept_Value"].value.split(':')[0], true);
			    }
			    else if (document.all["H_Dept_Value"].value.split(':').length == 4) {
			        SetUser(document.all["H_Dept_Value"].value.split(':')[2], true);
			    }
			}

			CheckUserNo = "";//清空已存在承辦人帳號，供下次連動時紀錄
			strBuf = "";
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
			return;
		}
	}
}

function SetUser(argUnitNo,argSetAllready)
{
	var valUser = new Array(3);
	valUser[0] = argUnitNo;
	valUser[1] = "OD99";
	valUser[2] = false;
	
	callObj = jf_CallWS("../../AK/lib/AK_LIB.asmx", "GetUnitAllUsers", false, valUser);
	
	resultObj = null;
	if( callObj.error )
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([callObj.errorDetail.string])),"");
	else
	{
		if( jf_IsWebServiceSuccess(callObj) )
			resultObj = callObj.value;
	}
	
	var UserNameMem = document.all["dlUser_Text"].value;
	
	//清空選項
	if(argSetAllready)
	{
		while(document.all["dlUser"].length > 0)
			document.all["dlUser"].remove(0);
		document.all["dlUser"].options.add(new Option("",""));
	}
	
	//重新新增選項
	len = resultObj.UserName.length;
	
	for( i=0 ; i<len ; i++ )
	{
		if(CheckAdd(resultObj.UserName[i]))//檢查是否已加入
		{
			//項目格式： [承辦人名稱][承辦單位代碼:承辦科別代碼:承辦人代碼:承辦人名稱]
			var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i]+":"+resultObj.SectNo[i]+":"+resultObj.UserName[i]+":"+resultObj.EmpName[i])
			document.all["dlUser"].options.add(objOption);
						
			CheckUserNo += strBuf + resultObj.UserName[i];
			strBuf = ":";
		}
	}
	
	//清空顯示的Text，以及重設選擇
	document.all["dlUser_Text"].value = "";
	document.all["dlUser"].selectedIndex = -1;
	for( i=0 ; i<len ; i++ )
	{
		if( UserNameMem == resultObj.EmpName[i] || UserNameMem == resultObj.UserName[i] )
		{
			document.all["dlUser"].selectedIndex = i;
			break;
		}
	}
}

//檢查是否加入
function CheckAdd(argUserNo)
{
	if(argUserNo == "")
		return false;
	if(CheckUserNo == "")
		return true;
	if(CheckUserNo.indexOf(argUserNo) != -1)
		return false;
	return true;
}
function dlSect_Text_onblur() {
	if (document.all.dlSect.value == "") {
	    document.all["dlSect_Text"].value = "";
	    document.all["H_Sect"].value = "";
	    return;
	}
	//值若變更時作處理
	if (jf_Trim(document.all["dlSect_Text"].value) != "" && document.all["dlSect_Text"].value != document.all["H_Sect"].value) {

		//呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
		if (ComboBoxCheck("dlSect", "承辦科別")) {
			//存ComboBox_Text的value
			document.all["H_Sect"].value = document.all["dlSect_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
			
			edjf_SetdlSect("dlDept","dlSect","dlUser","",false,true);	//初始化承辦人選單

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
		}
	}
}

function dlUser_Text_onblur() {
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
}
//無值不顯示
function jf_HandleComboxStatus(argComboxID) {
	if (document.all[argComboxID].options.length <= 1)
		document.all[argComboxID + "_Container"].className = "hide";
	else
		document.all[argComboxID + "_Container"].className = "custom-combobox";
}

function CloseTypeChg() {
	if (document.all.rbCloseN.checked) {
		document.all.rbOverAll.disabled = false;
		document.all.rbOverNone.disabled = false;
		document.all.rbOverComing.disabled = false;
		document.all.rbOverAlready.disabled = false;
	}
	else {
		document.all.rbOverAll.checked = true;
		document.all.rbOverAll.disabled = true;
		document.all.rbOverNone.disabled = true;
		document.all.rbOverComing.disabled = true;
		document.all.rbOverAlready.disabled = true;
	}
}