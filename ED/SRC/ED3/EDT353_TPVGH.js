/*
DATE	SA		PRG		MGR_NO		DESC
1141022 David     Daniel  1140797     新增程式
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
        case "btEnable":
        case "btDisable":
            if (checkIssueUserExist()) {
                Page_BlockSubmit = !jf_ConfirmPreview();
            } else {
                Page_BlockSubmit = true;
            }
                jf_ToolBarSubmit(xObjectName);
            break
        case "btCancel":
            window.close();
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
function checkIssueUserExist() {
    let IssueUser = new Map();
    let dg1 = document.all["dg1"];
    let strErrMsg = "";
    for (let i = 2; i < dg1.rows.length; i++ ) {
        if (document.all[`dg1__ctl${i}_dlIssue_User`].value!="") {
            if (IssueUser.has(document.all[`dg1__ctl${i}_dlIssue_User`].value)) {
                strErrMsg += `${i-1}、`;
            } else {
                IssueUser.set(document.all[`dg1__ctl${i}_dlIssue_User`].value, document.all[`dg1__ctl${i}_dlIssue_User`].value)
            }
        }
    }

    if (strErrMsg != "") {
        strErrMsg=strErrMsg.slice(0,-1);
        alert(`發文人員不可重複，序${strErrMsg}重複`);
        return false;
    } else {
        return true;
    }
}