/*
DATE	SA		PRG		MGR_NO		DESC
1141023 David     Daniel  1140797     新增程式
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
    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btOpen":
        case "btSave":
            Page_BlockSubmit = !jf_ConfirmPreview();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = false;
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

