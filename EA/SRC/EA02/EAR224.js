/*
DATE	SA		PRG		MGR_NO		DESC
1140710 Joe     Daniel  1140144     新增程式
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

    if (IsServerHandling)
        return;

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

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }


    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btPreview":
        case "btODS":
        case "btExcel":
            if (CheckBeforePreview())
                Page_BlockSubmit = !jf_ConfirmPreview();
            else
                Page_BlockSubmit = true;
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}



/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforePreview() {
    if (document.all["txCloseDateS"].value + document.all["txCloseDateE"].value + document.all["txExpArchiveDate"].value == "") {
        $('#txCloseDateS').focus();
        alert("結案日期與應歸檔日期不可皆為空白,請重新輸入");
        return false;
    }
    if (document.all.txCloseDateS.value == "")
        document.all.txCloseDateS.value = document.all.txCloseDateE.value;
    else if (document.all.txCloseDateE.value == "")
        document.all.txCloseDateE.value = document.all.txCloseDateS.value;
    else if (document.all.txCloseDateS.value > document.all.txCloseDateE.value) {
        var strTemp = document.all.txCloseDateE.value;
        document.all.txCloseDateE.value = document.all.txCloseDateS.value;
        document.all.txCloseDateS.value = strTemp;
    }
    return true;
}
function CheckCDATE(argObj, strMsg) {
    var strDate = document.all[argObj].value;
    if (strDate != "") {
        if (strDate.length < 7) {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate)) {
            alert(strMsg);
            $('#' + argObj).focus();
            return false;
        }
    }
    return true;
}
function jfCheckExpArchiveDate(argObj, argExpArchiveDateS, argExpArchiveDateE, argDueDays) {
    if (txExpArchiveDate.value != "" && dlDueDays.value!="") {
        var rtn = EA02.EAR224.CheckExpArchiveDate(argExpArchiveDateS, argExpArchiveDateE, argDueDays);
        if (rtn.value != "") {
            alert(rtn.value);
            document.getElementById(argObj).selectedIndex = 0
            $('#' + argObj).focus();
        }
    }
}


