/*
DATE	SA		PRG		MGR_NO			DESC
1100917	David	David	1080763			Merge至共通版
*/

var CurrOrgIdObj;
var CurrOrgNameObj;
var u_IbPersonInfo;
var u_txPersonInfo;
var u_lbFileInfo;
var u_txFileNameInfo;
var u_txFileidInfo;

var IsServerHandling = new Boolean();
IsServerHandling = false;


jf_ShowValidator();


function ClientButtonControl(e) {
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

}

function jf_ToolBarHandle(event) {
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }
    xObjectName = event.target.id;

    switch (xObjectName) {
        
        case "btSave":
            if (ConfirmSave())//是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState(xObjectName);
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId) {
    //來文機關查詢子視窗
    if (argCallerId == "WEM070C1") {
        document.all[u_lbFileInfo].textContent = document.all["lbReturnValue"].options[0].value;
        document.all[u_txFileNameInfo].value = document.all["lbReturnValue"].options[1].value;
        document.all[u_txFileidInfo].value = document.all["lbReturnValue"].options[2].value;
    }
    if (argCallerId == "IFC021") {
        
        if (document.all["lbReturnValue"].options[1].value == "Account") {
            //型態|帳號
            document.all[u_txPersonInfo].value = document.all["lbReturnValue"].options[1].value + "|" + document.all["lbReturnValue"].options[0].value;
            document.all[u_IbPersonInfo].textContent = document.all["lbReturnValue"].options[2].value;
        }
        else if (document.all["lbReturnValue"].options[1].value == "Role") {
            //型態|單位代碼|角色代碼
            if ("91,92,93,94".indexOf(document.all["lbReturnValue"].options[8].value) != -1)
            {
                alert('此單位下人員不可創稿，請重新選擇。');
                return;
            }
            if ("OD16,OD17".indexOf(document.all["lbReturnValue"].options[4].value.toUpperCase()) != -1)
            {
                alert('此角色不可創稿，請重新選擇。');
                return;
            }
            document.all[u_txPersonInfo].value = document.all["lbReturnValue"].options[1].value + "|" + document.all["lbReturnValue"].options[8].value + "|" + document.all["lbReturnValue"].options[4].value;
            document.all[u_IbPersonInfo].textContent = document.all["lbReturnValue"].options[9].value + ' ' + document.all["lbReturnValue"].options[5].value;
        }
    }
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad() {
    if (document.all["Errmsg"])
    {
        alert(document.all["Errmsg"].value);
    }
}

function OnWSResult(argResult) {
}



//儲存前檢查
function ConfirmSave() {
    var bcheck = false;
    var bcPearheck = false;
    var pDg1Len = document.all.dg2.rows.length + 1;  //有header,筆數為實際筆數+1, 第1筆由2開始 10 筆 -> 即2至11
    for (i = 2; i < pDg1Len; i++) {
        if (document.all["dg2__ctl" + i + "_txHpersoninfo"].value != "") {
            bcPearheck = true;
            if (document.all["dg2__ctl" + i + "_h_filenamelist"].value == "")
            {
                alert('序' + i.toString() + '並未選擇範本。不可儲存。');
                bcheck = false;
                break;
            }
            else
            {
                bcheck = true
                break;
            }
        }
    }
    if (!bcPearheck)
    {
        alert('未設定任何對象。');
        bcheck = false;
    }
    return bcheck;
}

//儲存前key值外之欄位檢查
function CheckBeforSave() {
    var bRtnbool = true;
    return bRtnbool;
}
function jf_DeletePerson(arglbid, argtxId, argIdx) {
    Page_BlockSubmit = true;
    document.all[arglbid].textContent = "";//清除畫面顯示資訊
    document.all[argtxId].value = "";//清除隱藏欄位
}

function jf_SetPerson(arglbId, argtxId, argIdx) {

    u_IbPersonInfo = arglbId;
    u_txPersonInfo = argtxId;

    Page_BlockSubmit = true;
    var arrSelectType = new Array(2);
    arrSelectType[0] = "Account";
    arrSelectType[1] = "Role";
    
    jf_ShowOrgDialogByLevel(0, arrSelectType);
    
}
function jf_ShowOrgDialogByLevel(argParam, argSelectType, argOrgNo) {
    var sSelectType = "";
    for (var i = 0; i < argSelectType.length; i++) {
        if (i != 0)
            sSelectType += ",";
		sSelectType += argSelectType[i];
    }
    jf_ShowModal("../../../IF/IF1/IFC021.aspx?iic021SelectType=" + sSelectType, "384", "640");
    Page_BlockSubmit = true;
}
function jf_SetSample(arglbifle,argtxfilename,argfileid) {

    u_lbFileInfo = arglbifle;
    u_txFileNameInfo = argfileid;
    u_txFileidInfo = argtxfilename;
    strUrl = "WEM070C1.ASPX?rtnObj=lbReturnValue&FileLIstid=" + document.all[u_txFileidInfo].value;
    jf_OpenChildWin(strUrl, "WEM070C1", 384, 640);

    Page_BlockSubmit = true;
}
function GetAllParamStr() {
    var strParam = "";
    var pUrl = unescape(this.location.search);	//一樣要經過解碼
    if (pUrl != -1)
        return pUrl;
    return strParam;
}