/*	
DATE	SA		PRG		MSG_NO			DESC	
1000403 David	Zola	1000035 		允許儲存沒有機關代碼的來文機關預設來文字與主旨內容
1050407 David   Zen     1050087         二代公文修改
1050518 David   Zen     1050087         WEM010C1子視窗修改
1060518 Leslie  Zen     1060215         innerText相關修改*/

var CurrOrgIdObj;
var CurrOrgNameObj;

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050407 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//    alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//function ClientButtonControl()
function ClientButtonControl(e) {
    //var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName) {
        case "btFromPrompt":
            CurrOrgIdObj = document.all.txFromOrgNo;
            CurrOrgNameObj = document.all.txFromOrgName;
            var strUrl = "";
            //1050518 Zen 1050087 WEM010C1子視窗修改--begin
            //strUrl = "WEM010C1.aspx?OrgID=" + document.all.h_OrgNo.value + "&K1=Dlg_Dept&Search=" + CurrOrgIdObj.value;
            var path = document.all.H_Wed010C1Path.value;
            strUrl = path + "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + document.all.h_OrgNo.value + "&K1=WEM010";
            //jf_OpenChildWin(strUrl, "WEM010C1", 700, 500);
            jf_OpenChildWin(strUrl, "WEM010C1", 800, 600);
            //1050518 Zen 1050087 WEM010C1子視窗修改--end
            Page_BlockSubmit = true;
            break;
    }
}
//1050407 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event) {
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }
    //1050407 Zen 1050087 二代公文修改
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btOpen":
            if (jf_CheckKeyObject())
                Page_BlockSubmit = !FromOrgNo_onblur();
            else
                Page_BlockSubmit = true;
            //1050407 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
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
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            var h_OrgNo = document.all.h_OrgNo.value;
            var h_DeptNo = document.all.h_DeptNo.value;
            var h_UserId = document.all.h_UserId.value;
            jf_ConfirmClean();
            document.all["txFromOrgName"].value = "";
            //1050602 Zen 1050087 二代公文修改
            //document.all["txFromOrgNo"].focus();
            $('#txFromOrgNo').focus();
            document.all.h_OrgNo.value = h_OrgNo;
            document.all.h_DeptNo.value = h_DeptNo;
            document.all.h_UserId.value = h_UserId;
            break;
    }
}

function CallBack(argCallerId) {
    //來文機關查詢子視窗
    if (argCallerId == "WEM010C1") {
        var DeptInfo = document.all["lbReturnValue"].options[0].value;
        //1050518 Zen 1050087 WEM010C1子視窗修改
        //var DeptArray = DeptInfo.split(',');
        var DeptArray = DeptInfo.split('^');
        CurrOrgNameObj.value = DeptArray[1];
        CurrOrgIdObj.value = DeptArray[2];
        //1000403 Zola	1000035 判斷沒有機關代碼則以原始識別碼取代 --START
        if (CurrOrgIdObj.value == "") {
            CurrOrgIdObj.value = DeptArray[0];
            document.all.h_OrgID.value = DeptArray[0];
        }
        //1000403 Zola	1000035 判斷沒有機關代碼則以原始識別碼取代 --END
        if (DeptArray[3] != "")
            CurrOrgIdObj.value += DeptArray[3];
    }
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad() {
    //1050407 Zen 1050087 二代公文修改
    //jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
    //jf_CallWS("lib/WEOrgInfo.asmx", "GetOrgInfo", false, null);
    //jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
}

function OnWSResult(argResult) {
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId) {
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}

//儲存前檢查
function ConfirmSave() {
    var bRtnbool = false;
    if (jf_CheckKeyObject())//檢查key值是否輸入
    {
        if (CheckBeforSave())
            bRtnbool = true;
    }
    return bRtnbool;
}

//儲存前key值外之欄位檢查
function CheckBeforSave() {
    var bRtnbool = true;
    return bRtnbool;
}

function FromOrgNo_onblur() {
    if (document.all["txFromOrgNo"].value == "") {
        document.all["txFromOrgName"].value = "";
        //1000403 Zola 1000035 新增的識別碼欄位,也一並清空
        document.all["h_OrgID"].value = "";
        return false;
    }
    else {
        //1000403 Zola 1000035 增加原始識別碼的回傳值
        //return GetOrgInfo(document.all.txFromOrgNo,document.all.txFromOrgName,true);
        return GetOrgInfo(document.all.txFromOrgNo, document.all.txFromOrgName, document.all.h_OrgID, true);
    }
}

var Checked = false;
//1000403 Zola 1000035 增加原始識別碼的回傳值
//function GetOrgInfo(argTxObj,argLbObj,argIsCheckDone)	
function GetOrgInfo(argTxObj, argLbObj, arg_OrgID, argIsCheckDone) {

    if (argTxObj.value == "") {
        Checked = false;
        return false;
    }

    if (Checked) {
        Checked = false;
        return true;
    }
    if (argIsCheckDone)
        Checked = true;

    Page_BlockSubmit = true;
    var wsParam = new Array();
    wsParam[0] = argTxObj.value;
    wsParam[1] = document.all.h_OrgNo.value;
    wsParam[2] = document.all.h_DeptNo.value;
    wsParam[3] = document.all.h_UserId.value;
    var CallWsObj = jf_CallWS("lib/WEOrgInfo.asmx", "GetOrgInfo", false, wsParam);

    //檢查執行是否成功
    if (jf_IsWebServiceSuccess(CallWsObj)) {
        if (!CallWsObj.value.ErrorClass.IsErr) {
            if (CallWsObj.value.Count > 0) {
                argTxObj.value = jf_Trim(CallWsObj.value.OrgID[0]);
                argLbObj.value = jf_Trim(CallWsObj.value.OrgName[0]);

                //1000403 Zola 1000035 增加原始識別碼的回傳值
                arg_OrgID.value = jf_Trim(CallWsObj.value._OrgID[0]);
                if (argTxObj.value == "") argTxObj.value = arg_OrgID.value;
                return true;
            }
            else {
                argLbObj.value = "";
                arg_OrgID.value = "";
                //1050602 Zen 1050087 二代公文修改
                //argTxObj.focus();
                $('#' + argTxObj.id).focus();
                jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["查無此機關代碼"])), "");
                Checked = false;
                return false;
            }
        }
        else {
            alert(CallWsObj.value.ErrorClass.ErrMessage[0]);
            Checked = false;
            return false;
        }
    }
    else {
        Checked = false;
        return false;
    }
}