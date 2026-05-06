/*
 * DATE     PRG     MGR_NO      DESC
 * 1060615  Justin  1050087     二代公文修改
 * 1110103  Zen     1101292     修正多次點擊重複PostBack之問題
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;
var xDoc = document.all;
//1060615 Justin [1050087] 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

txBkpDayhidden();

function ShowMsg() {
    //1060615 Justin [1050087] 二代公文修改 
    //if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//1060615 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e) {
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName) {
        case "btStoragePath":
            document.all.htxActiveBtn.value = "txStoragePath";
            var strUrl = "";
            xOldKey = "1";
            strUrl = "DFM310C2.aspx?rtnObj=lbReturnValue&k1=" + xOldKey;//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
            jf_OpenChildWin(strUrl, "DFM310C2", 700, 500);
            Page_BlockSubmit = true;
            break;
        case "btSrvNo":
            document.all.htxActiveBtn.value = "btSrvNo";
            var strUrl = "";
            xOldKey = "1";
            strUrl = "DFM310C1.aspx?rtnObj=lbReturnValue&k1=" + xOldKey;//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
            jf_OpenChildWin(strUrl, "DFM310C1", 700, 500);
            Page_BlockSubmit = true;
            break;
        case "btBkupSrvno":
            document.all.htxActiveBtn.value = "btBkupSrvno";
            var strUrl = "";
            xOldKey = "2";
            strUrl = "DFM310C1.aspx?rtnObj=lbReturnValue&k1=" + xOldKey;//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
            jf_OpenChildWin(strUrl, "DFM310C1", 700, 500);
            Page_BlockSubmit = true;
            break;
    }
}

//1060615 Justin [1050087] 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event) {
    var xObjectName;
    var evBtn;

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    //1060615 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1060615 Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_CheckObjectValue()) {
                // 新增模式需檢查鍵值是否已存在
                if (jf_GetActionMode() == LayoutModeNew) {
                    Page_BlockSubmit = true;
                    var arKeyName = new Array(2);
                    var arKeyValue = new Array(2);
                    arKeyName[0] = "SRV_NO";
                    arKeyValue[0] = document.all["txSrvNo"].value;
                    arKeyName[1] = "STORAGE_PATH";
                    arKeyValue[1] = document.all["txStoragePath"].value;

                    var arWSParam = new Array(3);
                    arWSParam[0] = "STORAGE_MAIN";
                    arWSParam[1] = arKeyName;
                    arWSParam[2] = arKeyValue;

                    callObj = jf_CallWS("Template/lib/sys.asmx", "CheckDataKeyDuplicate", false, arWSParam);
                    if (callObj.error)
                        alert(callObj.errorDetail.string);
                    else {
                        wsCheckDataKeyID = callObj.id;
                        OnWSResult(callObj);
                    }
                }

            }
            else Page_BlockSubmit = true;
            //1060615 Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            if (document.all.txUsedSpace.value != 0)
            { alert("儲存區正被使用中,不可刪除!!"); Page_BlockSubmit = true; }
            else
            { Page_BlockSubmit = false; }
            //1060615 Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060615 Justin [1050087] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean();
            break;
        case "btSearch":
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPrint();
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            break;
    }
}

function CallBack(argCallerId) {
    //將lbReturnValue的資料帶入適當的欄位
    if (argCallerId == "DFM310C1") {
        if (document.all.htxActiveBtn.value == "btSrvNo") {
            document.all["txSrvNo"].value = document.all["lbReturnValue"].options[0].text;
            //1060615 Justin [1050087] 二代公文修改
            //document.all["txSrvName"].value = document.all["lbReturnValue"].options[0].value;
            document.all["txSrvName"].textContent = document.all["lbReturnValue"].options[0].value;
        }
        else if (document.all.htxActiveBtn.value == "btBkupSrvno") {
            document.all["txBkupSrvno"].value = document.all["lbReturnValue"].options[0].text;
            //1060615 Justin [1050087] 二代公文修改
            //document.all["txBkupSrvname"].value = document.all["lbReturnValue"].options[0].value;
            document.all["txBkupSrvname"].textContent = document.all["lbReturnValue"].options[0].value;
        }


        //回傳值為鍵值時，觸動TextChange事件
        //__doPostBack();//for .NET Framework 1.0
        //__doPostBack("","");//for .NET Framework 1.1
        //jf_OpenButtonSubmit();
        //清空lbReturnValue物件
        if (document.all["lbReturnValue"].options != null)
            document.all["lbReturnValue"].options.length = 0;
    }
    if (argCallerId == "DFM310C2") {
        document.all["txSrvNo"].value = document.all["lbReturnValue"].options[0].text;
        document.all["txStoragePath"].value = document.all["lbReturnValue"].options[0].value;
        //回傳值為鍵值時，觸動TextChange事件
        //__doPostBack();//for .NET Framework 1.0
        //__doPostBack("","");//for .NET Framework 1.1
        jf_OpenButtonSubmit();
        //清空lbReturnValue物件
        if (document.all["lbReturnValue"].options != null)
            document.all["lbReturnValue"].options.length = 0;
    }

}

function ClientOnLoad() {
    ShowMsg();
    //1060615 Justin [1050087] 二代公文修改
    //jf_CallWS("Template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);
    //jf_CallWS("Template/Lib/SYS.asmx", "GetCodeName", false, null);
}


var wsCheckDataKeyID;
var wsCheckDataKeyID2;
var wsGetGrpNameID;
var wsGetGrpNameID2;
function OnWSResult(argResult) {
    if (argResult.id == wsCheckDataKeyID) {
        if (jf_IsWebServiceSuccess(argResult)) {
            if (argResult.value.RtnBool == true)
                if (window.confirm(jf_GetErrMsg(KeyExist)) == false) {
                    Page_BlockSubmit = true;
                    //1060615 Justin [1050087] 二代公文修改
                    //xDoc.txSrvNo.focus();
                    $('#txSrvNo').focus();
                }
                else
                    Page_BlockSubmit = false;
            else
                Page_BlockSubmit = false;
        }
    }
    if (argResult.id == wsCheckDataKeyID2) {
        if (jf_IsWebServiceSuccess(argResult)) {
            if (argResult.value.RtnBool == false)
                alert("儲存區目錄名稱不存在!!");

        }
    }
    if (argResult.id == wsGetGrpNameID) {
        //檢查執行是否成功
        if (jf_IsWebServiceSuccess(argResult)) {
            //1060615 Justin [1050087] 二代公文修改
            //document.all["txSrvName"].value = argResult.value.RtnDataSet.text;
            document.all["txSrvName"].textContent = argResult.value.RtnDataSet.text;
        }
        else {
            //1060615 Justin [1050087] 二代公文修改
            //document.all["txSrvName"].value = "";
            //document.all["txSrvNo"].focus();
            document.all["txSrvName"].textContent = "";
            $('#txSrvNo').focus();
        }
    }
    if (argResult.id == wsGetGrpNameID2) {
        //檢查執行是否成功
        if (jf_IsWebServiceSuccess(argResult)) {
            //1060615 Justin [1050087] 二代公文修改
            //document.all["txBkupSrvname"].value = argResult.value.RtnDataSet.text;
            document.all["txBkupSrvname"].textContent = argResult.value.RtnDataSet.text;
        }
        else {
            //1060615 Justin [1050087] 二代公文修改
            //document.all["txBkupSrvname"].value = "";
            //document.all["txBkupSrvno"].focus();
            document.all["txBkupSrvname"].textContent = "";
            $('#txBkupSrvno').focus();
        }
    }
}
function txBkpDayhidden() {
    for (var n = 2 ; n < (document.all.dg1.rows.length + 1) ; n++) {
        if (document.all["dg1__ctl" + n + "_dlBkpPeriod"].selectedIndex == 1)
        { document.all["dg1__ctl" + n + "_txBkpDay"].className = "hidden"; }
    }
}

function dlBkpPeriodOnChange() {
    var xObjectName = event.srcElement.id;
    var pNo = xObjectName.substring(8, xObjectName.indexOf("_dlBkpPeriod"));
    var Index = document.all["dg1__ctl" + pNo + "_dlBkpPeriod"].selectedIndex;
    if (Index == 1) { document.all["dg1__ctl" + pNo + "_txBkpDay"].className = "hidden"; }
    if (Index == 2) { document.all["dg1__ctl" + pNo + "_txBkpDay"].className = ""; }
    if (Index == 3) { document.all["dg1__ctl" + pNo + "_txBkpDay"].className = ""; }
    /*1060615 Justin [1050087] 二代公文修改
    if (Index == 2 && document.all["dg1__ctl" + pNo + "_txBkpDay"].value != "" && (document.all["dg1__ctl" + pNo + "_txBkpDay"].value > 7 || document.all["dg1__ctl" + pNo + "_txBkpDay"].value < 1)) { alert("備份日只允許輸入1~7數字"); document.all["dg1__ctl" + pNo + "_txBkpDay"].focus(); }
    if (Index == 3 && document.all["dg1__ctl" + pNo + "_txBkpDay"].value != "" && (document.all["dg1__ctl" + pNo + "_txBkpDay"].value > 31 || document.all["dg1__ctl" + pNo + "_txBkpDay"].value < 1)) { alert("備份日只允許輸入1~31數字"); document.all["dg1__ctl" + pNo + "_txBkpDay"].focus(); }*/
    if (Index == 2 && document.all["dg1__ctl" + pNo + "_txBkpDay"].value != "" && (document.all["dg1__ctl" + pNo + "_txBkpDay"].value > 7 || document.all["dg1__ctl" + pNo + "_txBkpDay"].value < 1)) { alert("備份日只允許輸入1~7數字"); $('#dg1__ctl' + pNo + '_txBkpDay').focus(); }
    if (Index == 3 && document.all["dg1__ctl" + pNo + "_txBkpDay"].value != "" && (document.all["dg1__ctl" + pNo + "_txBkpDay"].value > 31 || document.all["dg1__ctl" + pNo + "_txBkpDay"].value < 1)) { alert("備份日只允許輸入1~31數字"); $('#dg1__ctl' + pNo + '_txBkpDay').focus(); }
}
function dlBkpDayOnBlur() {
    var xObjectName = event.srcElement.id;
    var pNo = xObjectName.substring(8, xObjectName.indexOf("_txBkpDay"));
    var strDay = document.all["dg1__ctl" + pNo + "_txBkpDay"].value;
    /*1060615 Justin [1050087] 二代公文修改
    if (document.all["dg1__ctl" + pNo + "_dlBkpPeriod"].selectedIndex == 2 && document.all["dg1__ctl" + pNo + "_txBkpDay"].value != "" && (document.all["dg1__ctl" + pNo + "_txBkpDay"].value > 7 || document.all["dg1__ctl" + pNo + "_txBkpDay"].value < 1)) { alert("備份日只允許輸入1~7數字"); document.all["dg1__ctl" + pNo + "_txBkpDay"].focus(); }
    if (document.all["dg1__ctl" + pNo + "_dlBkpPeriod"].selectedIndex == 3 && document.all["dg1__ctl" + pNo + "_txBkpDay"].value != "" && (document.all["dg1__ctl" + pNo + "_txBkpDay"].value > 31 || document.all["dg1__ctl" + pNo + "_txBkpDay"].value < 1)) { alert("備份日只允許輸入1~31數字"); document.all["dg1__ctl" + pNo + "_txBkpDay"].focus(); }*/
    if (document.all["dg1__ctl" + pNo + "_dlBkpPeriod"].selectedIndex == 2 && document.all["dg1__ctl" + pNo + "_txBkpDay"].value != "" && (document.all["dg1__ctl" + pNo + "_txBkpDay"].value > 7 || document.all["dg1__ctl" + pNo + "_txBkpDay"].value < 1)) { alert("備份日只允許輸入1~7數字"); $('#dg1__ctl' + pNo + '_txBkpDay').focus(); }
    if (document.all["dg1__ctl" + pNo + "_dlBkpPeriod"].selectedIndex == 3 && document.all["dg1__ctl" + pNo + "_txBkpDay"].value != "" && (document.all["dg1__ctl" + pNo + "_txBkpDay"].value > 31 || document.all["dg1__ctl" + pNo + "_txBkpDay"].value < 1)) { alert("備份日只允許輸入1~31數字"); $('#dg1__ctl' + pNo + '_txBkpDay').focus(); }
}


function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId) {
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1060615 Justin [1050087] 二代公文修改 
    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}
function jf_CheckObjectValue() {
    var xFocusObj;

    var strErr = "";

    var k;

    if (jf_Trim(xDoc.txSrvNo.value) == "") {
        strErr += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array([" 伺服機編號"])) + "\n";
        if (xFocusObj == null)
            xFocusObj = xDoc.txSrvNo;
    }
    if (jf_Trim(xDoc.txStoragePath.value) == "" && xFocusObj == null) {
        strErr += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["儲存區目錄名稱"])) + "\n";
        if (xFocusObj == null)
            xFocusObj = xDoc.txStoragePath;

    }

    if ((document.all["dlUseType"].selectedIndex == 0 || document.all["dlUseType"].selectedIndex == -1) && xFocusObj == null) {
        strErr += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["儲存區種類"])) + "\n";
        if (xFocusObj == null)
            xFocusObj = xDoc.dlUseType;

    }

    if (document.all["txBkupSrvno"].value != "" && document.all["txBkupStorage"].value == "") {
        strErr += FormatStr(jf_GetErrMsg(CustErr), new Array(["若異地備援伺服機不為空白時,則異地備援儲存區目錄名稱不可為空白!"])) + "\n";
        if (xFocusObj == null)
            xFocusObj = xDoc.txBkupStorage;
    }
    //var n;
    for (k = 2 ; k < (document.all.dg1.rows.length + 1) ; k++) {
        if ((document.all["dg1__ctl" + k + "_dlBkpType"].selectedIndex != 0) && (document.all["dg1__ctl" + k + "_dlBkpType"].selectedIndex) != -1) {
            if (document.all["dg1__ctl" + k + "_dlBkpPeriod"].selectedIndex == 0 || document.all["dg1__ctl" + k + "_dlBkpPeriod"].selectedIndex == -1) {
                strErr += FormatStr(jf_GetErrMsg(CustErr), new Array(["當備份種類不為空白,則備份週期不許空白!"])) + "\n";
                // if (xFocusObj == null)
                //	{n=k;	xFocusObj = document.all["dg1__ctl"+n+"_dlBkpPeriod"];} 
            }
            if ((document.all["dg1__ctl" + k + "_dlBkpPeriod"].selectedIndex == 2 || document.all["dg1__ctl" + k + "_dlBkpPeriod"].selectedIndex == 3 || document.all["dg1__ctl" + k + "_dlBkpPeriod"].selectedIndex == 4) && document.all["dg1__ctl" + k + "_txBkpDay"].value == "") {
                strErr += FormatStr(jf_GetErrMsg(CustErr), new Array(["當備份種類不為空白,則備份日不許空白!"])) + "\n";
                //  if (xFocusObj == null)
                //{n=k;	xFocusObj = document.all["dg1__ctl"+n+"_txBkpDay"];} 
            }
            if (document.all["dg1__ctl" + k + "_txBkpFilename"].value == "") {
                strErr += FormatStr(jf_GetErrMsg(CustErr), new Array(["當備份種類不為空白,則備份目的地不許空白!"])) + "\n";
            }
            // if (xFocusObj == null)
            //{n=k;	xFocusObj = document.all["dg1__ctl"+n+"_txBkpFilename"];} 
        }
    }
    if (strErr != "") {
        jf_ShowMeg(strErr, "");
        //1060615 Justin [1050087] 二代公文修改
        //if (xFocusObj != null) xFocusObj.focus();
        if (xFocusObj != null) $('#' + xFocusObj.id).focus();
        return false;
    }
    else {
        return true;
    }

}
function txSrvNo_onBlur() {
    // 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
    if ((document.activeElement.id == "btExit") || (document.activeElement.id == "btExitImg")
	     || (document.activeElement.id == "btCancel") || (document.activeElement.id == "btCancelImg")) return;

    var arKeyName = new Array(1);
    var arKeyValue = new Array(1);
    var arRtnFldName = new Array(1);
    var arOrdFldName = new Array(1);

    if (!IsServerHandling) {
        if (document.all["txSrvNo"].value != "") {
            Page_BlockSubmit = true;

            arKeyName[0] = "SRV_NO";
            arKeyValue[0] = document.all["txSrvNo"].value;
            arRtnFldName[0] = "SRV_ALIAS";
            arOrdFldName[0] = "SRV_NO";

            var arWSParam = new Array(5);
            arWSParam[0] = "FILESRV_HEADER";
            arWSParam[1] = arKeyName;
            arWSParam[2] = arKeyValue;
            arWSParam[3] = arRtnFldName;
            arWSParam[4] = arOrdFldName;

            callObj = jf_CallWS("Template/Lib/SYS.asmx", "GetCodeName", false, arWSParam);
            wsGetGrpNameID = callObj.id;
            OnWSResult(callObj);
        }
    }
}
function txBkupSrvNo_onBlur() {
    // 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
    if ((document.activeElement.id == "btExit") || (document.activeElement.id == "btExitImg")
	     || (document.activeElement.id == "btCancel") || (document.activeElement.id == "btCancelImg")) return;

    var arKeyName = new Array(1);
    var arKeyValue = new Array(1);
    var arRtnFldName = new Array(1);
    var arOrdFldName = new Array(1);

    if (!IsServerHandling) {
        if (document.all["txBkupSrvno"].value != "") {
            Page_BlockSubmit = true;

            arKeyName[0] = "SRV_NO";
            arKeyValue[0] = document.all["txBkupSrvno"].value;
            arRtnFldName[0] = "SRV_ALIAS";
            arOrdFldName[0] = "SRV_NO";

            var arWSParam = new Array(5);
            arWSParam[0] = "FILESRV_HEADER";
            arWSParam[1] = arKeyName;
            arWSParam[2] = arKeyValue;
            arWSParam[3] = arRtnFldName;
            arWSParam[4] = arOrdFldName;

            callObj = jf_CallWS("Template/Lib/SYS.asmx", "GetCodeName", false, arWSParam);
            wsGetGrpNameID2 = callObj.id;
            OnWSResult(callObj);
        }
    }
}
function CheckStoragePath() {

    if (!IsServerHandling) {
        if (document.all["txBkupStorage"].value != "") {
            var arKeyName = new Array(2);
            var arKeyValue = new Array(2);
            arKeyName[0] = "SRV_NO";
            arKeyValue[0] = document.all["txBkupSrvno"].value;
            arKeyName[1] = "STORAGE_PATH";
            arKeyValue[1] = document.all["txBkupStorage"].value;

            var arWSParam = new Array(3);
            arWSParam[0] = "STORAGE_MAIN";
            arWSParam[1] = arKeyName;
            arWSParam[2] = arKeyValue;

            callObj = jf_CallWS("Template/lib/sys.asmx", "CheckDataKeyDuplicate", false, arWSParam);
            if (callObj.error)
                alert(callObj.errorDetail.string);
            else {
                wsCheckDataKeyID2 = callObj.id;
                OnWSResult(callObj);
            }
        }
    }
}

