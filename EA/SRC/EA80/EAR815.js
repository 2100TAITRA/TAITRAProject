/*
DATE		SA		PRG		    MGR_NO			DESC
1090930     Cloud   Zen		    1090562         新增EAR815 調還卷統計表列印作業
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
function ClientOnLoad() {
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e) {
    var xObjectName = e.target.id;

    if (IsServerHandling) {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName) {
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(event) {
    var xObjectName;
    var evBtn;

    if (IsServerHandling) {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btPreview":
            Page_BlockSubmit = true;
            if (CheckBeforeSearch()) {
                Page_BlockSubmit = false;
                jf_ToolBarSubmit(xObjectName);
            }

            break;
    }
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforeSearch() {
    var strErrMsg = '';
    var strDateS = $('#txDateS').val();
    var strDateE = $('#txDateE').val();

    if (document.all['rbDept'].checked) {
        if (strDateS + strDateE == '')
            strErrMsg += '統計日期不可為空';

        if (strDateS == '' && strDateE != '')
            $('#txDateS').val(strDateE);
        else if (strDateS != '' && strDateE == '')
            $('#txDateE').val(strDateS);
        else if (Number(strDateS) > (Number(strDateE))) {
            $('#txDateS').val(strDateE);
            $('#txDateE').val(strDateS);
        }

        strErrMsg += CheckDate('txDateS', '統計日期(起)', true, 7);
        strErrMsg += CheckDate('txDateE', '統計日期(訖)', true, 7);

        if (Number(strDateE) - Number(strDateS) > 10000)
            strErrMsg += '統計日期區間不可超過一年。';
    }
    else if (document.all['rbMonth'].checked) {
        strErrMsg += CheckDate('txMonth', '統計年月', true, 5);
    }

    if (strErrMsg != '') {
        alert(strErrMsg);
        return false;
    }

    return true;
}

function CheckDate(argObj, argMsg, argFromTbtool, argLength) {
    var strErrMsg = '';
    var strDate = $('#' + argObj).val();
    if (strDate != '') {
        if (strDate.length < argLength) {
            strDate = jf_PADL(strDate, argLength, '0');//YYYMMDD
            $('#' + argObj).val(strDate);
        }

        if (strDate.length == 5)
            strDate += '01';

        if (!jf_CheckCDATE(strDate)) {
            strErrMsg += FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argMsg])) + '\n';
            if (argFromTbtool == false)
                jf_ShowMsg(strErrMsg, '');
        }
    }
    return strErrMsg;
}