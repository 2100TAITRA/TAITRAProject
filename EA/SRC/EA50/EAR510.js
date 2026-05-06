/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2006.08.24
 * -------------------------------------------------------------------------------------------------
 * 日期			SA		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1080724		Cloud	Kevin_C	1071087	升二代
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1080724	Kevin_C	1071087	升二代
//if(document.all.tbTool)
//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad() {
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1080724	Kevin_C	1071087	升二代
// function ClientButtonControl()
function ClientButtonControl(e) {
    //1080724	Kevin_C	1071087	升二代
    // var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName) {
        case "btKeyHelp": //計畫批號提示
            Page_BlockSubmit = true;
            var pUrl = "";
            pUrl = "../EA40/EAT400C1.aspx";
            jf_OpenChildWin(pUrl, "EAT400C1", 800, 600);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1080724	Kevin_C	1071087	升二代
//function jf_ToolBarHandle()
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

    //1080724	Kevin_C	1071087	升二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPrint();
            //1080724	Kevin_C	1071087	升二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1080724	Kevin_C	1071087	升二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = false;
            jf_ConfirmClean(true);
            document.all["rbType1"].checked = true;
            document.all["rbOrder1"].checked = true;
            document.all["cbFM"].checked = true;
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave() {
    var bRtnbool = false;

    if (jf_CheckBeforSave()) {
        // 新增模式需檢查鍵值是否已存在
        if (jf_GetActionMode() == LayoutModeNew) {
            if (jf_CheckDataExist(""))//檢查鍵值是否已存在
            {
                if (window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
                    bRtnbool = true;
            }
            else
                bRtnbool = true;
        }
        else
            bRtnbool = true;
    }

    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave() {
    var bRtnbool = true;
    var strErrMsg = "";

    if (document.all["txKeyFld"].value == "") {
        strErrMsg += "鍵值欄位不可空白\n";
        //1080724	Kevin_C	1071087	升二代
        //document.all["txKeyFld"].focus();
        $('#txKeyFld').focus();
    }

    if (document.all["txRequireFld"].value == "") {
        strErrMsg += "必要欄位不可空白\n";
        //1080724	Kevin_C	1071087	升二代
        //document.all["txRequireFld"].focus();
        $('#txRequireFld').focus();
    }

    if (strErrMsg != "") {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult) {
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID) {
        if (jf_IsWebServiceSuccess(argResult)) {
            //document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
        }
        else {
            //document.all["txReadOnly"].value = "";
        }
    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId) {
    //清空lbReturnValue物件
    if (argCallerId == "EAT400C1") {
        document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
        //1080724	Kevin_C	1071087	升二代
        //document.all["txPlanNo"].focus();
        $('#txPlanNo').focus();
    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function ObjOnBlur(argObjName) {
    switch (argObjName) {
        case "txPlanNo": //清理批號檢查Plan_Main有無存在

            if (document.all.txPlanNo.value != "") {
                var param = new Array(1);
                param[0] = document.all.txPlanNo.value;
                var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDespFromPlanMain", false, param);
                var iCallID_txPlanNo = callObj.id;
                if (callObj.value.RtnStr == "nodata") {
                    alert("無此計畫編號，請重新輸入");
                    //1080724	Kevin_C	1071087	升二代
                    //document.all.txPlanNo.focus();
                    $('#txPlanNo').focus();
                }
                else
                    document.all.txPlanName.value = callObj.value.RtnStr;
            }
            break;
    }
}
