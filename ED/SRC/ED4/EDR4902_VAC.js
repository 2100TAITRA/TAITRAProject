/*
DATE	SA		PRG		MGR_NO		DESC
1140509 Joe     Daniel  1140229     新增程式
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
    dlFinishTypeChange();
    dlCloseTypeChange();
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


    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btPreview":
        case "btExcel":
        case "btOds":
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
    if (document.all["txRCVDateS"].value + document.all["txRCVDateS"].value == "") {
        $('#txRCVDateS').focus();
        alert("收(創)文日期不可為空白,請重新輸入");
        return false;
    }
    if (document.all.txRCVDateS.value == "")
        document.all.txRCVDateS.value = document.all.txRCVDateE.value;
    else if (document.all.txRCVDateE.value == "")
        document.all.txRCVDateE.value = document.all.txRCVDateS.value;
    else if (document.all.txRCVDateS.value > document.all.txRCVDateE.value) {
        var strTemp = document.all.txRCVDateE.value;
        document.all.txRCVDateE.value = document.all.txRCVDateS.value;
        document.all.txRCVDateS.value = strTemp;
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
function dlFinishTypeChange() {
    $('#dlFinishType').on('change', function () {
        const finishVal = $(this).val();
        if (finishVal === "Wait") {
            $('#dlCloseType').val('');
        }
    });
}
function dlCloseTypeChange() {
    $('#dlCloseType').on('change', function () {
        const closeVal = $(this).val();
        const finishVal = $('#dlFinishType').val();
        if (closeVal !== "") {
            $('#dlFinishType').val('Finish');
        }
    });
}