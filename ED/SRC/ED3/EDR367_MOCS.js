/*
DATE	SA		PRG		MGR_NO			DESC
1111028	Kevin	Zen     1110836         新增EDR367_MOCS 續辦案件查詢作業
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
            Page_BlockSubmit = !CheckBeforeSearch();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            document.getElementById("rbControlDesk").checked = true;
            document.getElementById("rbSignTypeAll").checked = true;
            $('#txSignDateS').focus();
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
	var strSignDateS = $('#txSignDateS').val();
	var strSignDateE = $('#txSignDateE').val();

	if (strDocNoS == '' && strDocNoE != '')
		$('#txDocNoS').val(strDocNoE);
	else if (strDocNoS != '' && strDocNoE == '')
		$('#txDocNoE').val(strDocNoS);
	else if (Number(strDocNoS) > (Number(strDocNoE))) 
	{
		$('#txDocNoS').val(strDocNoE);
		$('#txDocNoE').val(strDocNoS);
	}

    if (strSignDateS == '' && strSignDateE != '')
        $('#txSignDateS').val(strSignDateE);
    else if (strSignDateS != '' && strSignDateE == '')
        $('#txSignDateE').val(strSignDateS);
    else if (Number(strSignDateS) > (Number(strSignDateE)))
    {
        $('#txSignDateS').val(strSignDateE);
        $('#txSignDateE').val(strSignDateS);
    }
    if (strSignDateS + strSignDateE == '')
        strErrMsg += '簽收/送出日期欄位不可空白';

    strErrMsg += CheckDate('txSignDateS', '簽收/送出日期(起)', true, 7);
    strErrMsg += CheckDate('txSignDateE', '簽收/送出日期(訖)', true, 7);


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

function OpenODI260(argOrgNo, argDocNo, argWidth, argHeight) {
    if (argOrgNo != null)
        var strSource = "&SOURCE_ORGNO=" + argOrgNo;
    else
        var strSource = "";
    var strURL = "../../../ODDEP/ODI260.aspx?pDocNo=" + argDocNo + "&SAMLart=" + document.all.SsoArtifact.value + strSource;
    jf_OpenChildWin(strURL, "ODI260", argWidth, argHeight);
}