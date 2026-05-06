/*
DATE	SA		PRG		MGR_NO			DESC
1111028	Kevin	Zen     1110836         新增EDI453 續辦案件查詢作業
*/

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

	//1120905   Joe     1120700     新增收文日期
	SetExcelUI()
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
    {
        Page_BlockSubmit = true;
        return;
    }

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
    {
        Page_BlockSubmit = true;
        return;
    }

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
		case "btPreview":
			//1120905   Joe     1120700     新增收文日期
        case "btExcel":
            Page_BlockSubmit = !CheckBeforeSearch();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforeSearch()
{
	var strErrMsg = '';
	var strDocNoS = $('#txDocNoS').val();
	var strDocNoE = $('#txDocNoE').val();
    var strCloseDateS = $('#txCloseDateS').val();
	var strCloseDateE = $('#txCloseDateE').val();
	//1120905   Joe     1120700     新增收文日期
    var strRcvDateS = $('#txRcvDateS').val();
	var strRcvDateE = $('#txRcvDateE').val();

	if (strDocNoS == '' && strDocNoE != '')
		$('#txDocNoS').val(strDocNoE);
	else if (strDocNoS != '' && strDocNoE == '')
		$('#txDocNoE').val(strDocNoS);
	else if (Number(strDocNoS) > (Number(strDocNoE))) 
	{
		$('#txDocNoS').val(strDocNoE);
		$('#txDocNoE').val(strDocNoS);
	}

    if (strCloseDateS == '' && strCloseDateE != '')
        $('#txCloseDateS').val(strCloseDateE);
    else if (strCloseDateS != '' && strCloseDateE == '')
        $('#txCloseDateE').val(strCloseDateS);
    else if (Number(strCloseDateS) > (Number(strCloseDateE)))
    {
        $('#txCloseDateS').val(strCloseDateE);
        $('#txCloseDateE').val(strCloseDateS);
	}

	//1120905   Joe     1120700     新增收文日期
	if (strRcvDateS == '' && strRcvDateE != '')
		$('#txRcvDateS').val(strRcvDateE);
	else if (strRcvDateS != '' && strRcvDateE == '')
		$('#txRcvDateE').val(strRcvDateS);
	else if (Number(strRcvDateS) > (Number(strRcvDateE))) {
		$('#txRcvDateS').val(strRcvDateE);
		$('#txRcvDateE').val(strRcvDateS);
	}

	//1120905   Joe     1120700     取消日期檢核
	// if (strDocNoS + strDocNoE + strCloseDateS + strCloseDateE == '')
       // strErrMsg += '公文文號、結案日期不可皆為空';

    strErrMsg += CheckDate('txCloseDateS', '結案日期(起)', true, 7);
	strErrMsg += CheckDate('txCloseDateE', '結案日期(訖)', true, 7);

	//1120905   Joe     1120700     新增收文日期
    strErrMsg += CheckDate('txRcvDateS', '結案日期(起)', true, 7);
    strErrMsg += CheckDate('txRcvDateE', '結案日期(訖)', true, 7);

    if (strErrMsg != '')
    {
        alert(strErrMsg);
        return false;
    }

    return true;
}

function CheckDate(argObj, argMsg, argFromTbtool, argLength)
{
    var strErrMsg = '';
    var strDate = $('#' + argObj).val();
    if (strDate != '')
    {
        if (strDate.length < argLength)
        {
            strDate = jf_PADL(strDate, argLength, '0');//YYYMMDD
            $('#' + argObj).val(strDate);
        }

        if (!jf_CheckCDATE(strDate))
        {
            strErrMsg += FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argMsg])) + '\n';
            if (argFromTbtool == false)
                jf_ShowMsg(strErrMsg, '');
        }
    }
    return strErrMsg;
}

function ReturnValue(argDocNo)
{
	strUrl = 'EDT453.aspx?argDocNo=' + argDocNo;
	jf_OpenChildWin(strUrl, "EDT453", 1024, 768);
}

function ComboBoxCheck(argComboBoxID, argKeyMsg)
{
	var bRtnBool = false;
	var ComboBoxObj = document.all[argComboBoxID];
	var ComboBoxTextObj = document.all[argComboBoxID + "_Text"];

	var i, j;
	if (ComboBoxObj == null || ComboBoxTextObj == null)
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["[" + argComboBoxID + "]下拉選單不存在"])), "");
		return bRtnBool;
	}

	for (i = 0; i < ComboBoxObj.options.length; i++)
	{
		if (ComboBoxTextObj.value == ComboBoxObj.options[i].text)
		{
			bRtnBool = true;
			break;
		}
	}

	if (!bRtnBool)
	{
		$('#' + argComboBoxID + "_Text").focus();
		ComboBoxTextObj.select();
	}
	return bRtnBool;
}

//ComboBox 處理
var uDeptChecked = false;
function dlDept_Text_onblur(argIsCheckDone)
{
	if (uDeptChecked)
	{
		uDeptChecked = false;
		return;
	}
	if (argIsCheckDone == "true")
		uDeptChecked = true;
	var bCheckOK = true;
	if (jf_Trim(document.all["dlDept_Text"].value) != "" && document.all["dlDept_Text"].value != document.all["H_Dept"].value || (document.all["dlDept_Text"].value == document.all["H_Dept"].value))
	{
		if (ComboBoxCheck("dlDept", "承辦單位"))
		{
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
		}
		else
		{
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
	if (uSectChecked)
	{
		uSectChecked = false;
		return;
	}
	if (argIsCheckDone)
		uSectChecked = true;
	var bCheckOK = true;
	//值若變更時作處理
	if (jf_Trim(document.all["dlSect_Text"].value) != "" && document.all["dlSect_Text"].value != document.all["H_Sect"].value)
	{

		//呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
		if (ComboBoxCheck("dlSect", "承辦科別"))
		{
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
		else
		{
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
	if (uUserChecked)
	{
		uUserChecked = false;
		return;
	}
	if (argIsCheckDone)
		uUserChecked = true;
	var bCheckOK = true;
	//值若變更時作處理
	if (jf_Trim(document.all["dlUser_Text"].value) != "" && document.all["dlUser_Text"].value != document.all["H_User"].value)
	{
		document.all["H_User"].value = document.all["dlUser_Text"].value;
		document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
	}
	uUserChecked = false;
	return bCheckOK;

}

//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
	if (document.all[argComboxID].options.length <= 1)
		document.all[argComboxID + "_Container"].className = "hide";
	else
		document.all[argComboxID + "_Container"].className = "custom-combobox";
}

//1120905   Joe     1120700     新增收文日期
function SetExcelUI() {
	if (document.all.rbReason.checked)
		document.all.btExcel.disabled = false;
	else
		document.all.btExcel.disabled = true;
}