/*
DATE	SA		PRG		MGR_NO		DESC
1141215 Cloud   Daniel  1141433     新增程式
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
    RptTypeChange();
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
        case "btSearch":
            if (CheckBeforeSearch())
                Page_BlockSubmit = !jf_ConfirmPreview();
            else
                Page_BlockSubmit = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            if (CheckDataGrid())
                Page_BlockSubmit = !jf_ConfirmPreview();
            else
                Page_BlockSubmit = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            jf_ToolBarSubmit(xObjectName);
            break;
        //以下屬於DataGrid ToolBar
        case "btSelectAll":
            Page_BlockSubmit = true;
            jf_SelectAll("dg1", "_cbSelect");
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
            jf_SelectInverse("dg1", "_cbSelect");
            break;
        case "btSelectClear":
            Page_BlockSubmit = true;
            jf_SelectClear("dg1", "_cbSelect");
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
function CheckBeforeSearch() {
    if (document.all["txIssueDateS"].value.trim() + document.all["txIssueDateS"].value.trim() == "") {
        $('#txIssueDateS').focus();
        alert("發文日期不可為空白,請重新輸入");
        return false;
    }
    if (document.all.txIssueDateS.value.trim() == "")
        document.all.txIssueDateS.value = document.all.txIssueDateE.value;
    else if (document.all.txIssueDateE.value.trim() == "")
        document.all.txIssueDateE.value = document.all.txIssueDateS.value;
    else if (document.all.txIssueDateS.value > document.all.txIssueDateE.value) {
        var strTemp = document.all.txIssueDateE.value;
        document.all.txIssueDateE.value = document.all.txIssueDateS.value;
        document.all.txIssueDateS.value = strTemp;
    }
    if (document.all["txIssueTimeHS"].value.trim() == "" && document.all["txIssueTimeMS"].value != "")
        document.all["txIssueTimeHS"].value = document.all["txIssueTimeHE"].value;
    if (document.all["txIssueTimeHE"].value.trim() == "" && document.all["txIssueTimeME"].value != "")
        document.all["txIssueTimeHE"].value = document.all["txIssueTimeHS"].value;
    if (document.all["txIssueTimeHS"].value != "" && document.all["txIssueTimeMS"].value.trim() == "")
        document.all["txIssueTimeMS"].value = "00"
    if (document.all["txIssueTimeHE"].value != "" && document.all["txIssueTimeME"].value.trim() == "")
        document.all["txIssueTimeME"].value = "59"
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
function RptTypeChange(){
    if (document.all["rbAddressTag"].checked) {
        document.all["txStartIndex"].disabled = false;
        if (document.all["txStartIndex"].value.trim() == "")
            document.all["txStartIndex"].value = "1";
    } else if (document.all["rbRegisteredSlip"].checked){
        document.all["txStartIndex"].disabled = true;
        if (document.all["txStartIndex"].value.trim() == "")
            document.all["txStartIndex"].value = "1";
    }
}
function CheckDataGrid() {
    var booLessSingleChecked = false;
    var ErrSeq = "";
    var dg1 = document.all["dg1"];
    if (document.all["txIsSearch"].value!="TRUE") {
        alert("無公文資料，請先查詢。");
        return false;
    }
    for (var i = 2; i < dg1.rows.length+1; i++) {
        if (document.all[`dg1__ctl${i}_cbSelect`].checked) {
            if (!booLessSingleChecked)
                booLessSingleChecked = true;
            if (document.all[`dg1__ctl${i}_txRcvOrg`].value.trim() == "" || document.all[`dg1__ctl${i}_txPostCode`].value.trim() == "" || document.all[`dg1__ctl${i}_txAddress`].value.trim() == "")
                ErrSeq += document.all[`dg1__ctl${i}_lbSEQ_NO`].innerHTML+"、"
        }
    }
    if (!booLessSingleChecked) {
        alert("至少需勾選一筆公文");
        return false;
    }
    if (ErrSeq != "") {
        alert(`序${ErrSeq.slice(0, -1)}，受文者、地址欄位不可為空白`)
        return false;
    }
    return true
}
function CheckStartIndex() {
    if (document.all["txStartIndex"].value.trim() == "" || document.all["txStartIndex"].value.trim() == "0") {
        txStartIndex.value = "1";
    }
}
function CheckIssueTime(argObj) {
    var strTime = document.all[argObj].value;
    if (strTime != "") {
        if (strTime.length < 2) {
            strTime = jf_PADL(strTime, 2, '0');
            document.all[argObj].value = strTime;
        }
    }
}