/*
DATE	SA		PRG		MGR_NO			DESC
1140422	Zen 	Zen     1140076         新增EDR214 新增承辦公文案件明細表列印作業
1140509	Zen 	Zen     1140076         修正承辦單位從有值到清空後查詢結果異常之問題
1140814 Zen     Zen     1140076         修正預覽後未初始化人員選單之問題

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
    //1140814 Zen 1140076 修正預覽後未初始化人員選單之問題
    dlDept_Text_onblur(uDeptChecked);
    dlUser_Text_onblur(uUserChecked);
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
        case "btPreview":
        case "btExcel":
        case "btODS":
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
//ComboBox 處理
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
	//1140509 Zen 1140076 修正承辦單位從有值到清空後查詢結果異常之問題
    //if (jf_Trim(document.all["dlDept_Text"].value) != "" && document.all["dlDept_Text"].value != document.all["H_Dept"].value || (document.all["dlDept_Text"].value == document.all["H_Dept"].value))
    //1140814 Zen 1140076 修正預覽後未初始化人員選單之問題
    //if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
    {
		if (ComboBoxCheck("dlDept", "承辦單位"))
		{
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
	//1140509 Zen 1140076 修正承辦單位從有值到清空後查詢結果異常之問題
    //if (jf_Trim(document.all["dlUser_Text"].value) != "" && document.all["dlUser_Text"].value != document.all["H_User"].value)
    if (document.all["dlUser_Text"].value != document.all["H_User"].value)
	{
		document.all["H_User"].value = document.all["dlUser_Text"].value;
		document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
	}
	uUserChecked = false;
	return bCheckOK;

}

function CheckBeforeSearch()
{
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
    else if (Number(strRcvDateS) > (Number(strRcvDateE)))
    {
        $('#txRcvDateS').val(strRcvDateE);
        $('#txRcvDateE').val(strRcvDateS);
    }

    if (strRcvDateS + strRcvDateE == '')
        strErrMsg += '收文日期不可為空';

    strErrMsg += CheckDate('txRcvDateS', '收文日期(起)', true);
    strErrMsg += CheckDate('txRcvDateE', '收文日期(訖)', true);
    strErrMsg += CheckDate('txDueDate', '限辦日期(訖)', true);

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

function DocPropertyOnchange(argCurrObj, argTargetObj)
{
    if (document.all[argCurrObj].value != '')
        document.all[argTargetObj].value = '';
}