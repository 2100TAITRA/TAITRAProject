/*****************************************************************************************************
   程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人		單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2011.09.1	CLOUD	  1000673	新增程式
 * 2016.04.12   Zen       1050087   二代公文修改
 //	1051019		Joe			1050087	二代修改配合行動平台
 * 1070830      Zen         1070678 弱掃Ajax修正 
 ****************************************************************************************************/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1050412 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;


//1070830 Zen 1070678 弱掃Ajax修正
AjaxPro.Request.prototype.timeout = function ()
{
    try
    {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false)
        {
            this.abort();
        } else
        {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error)
    {

    }
    finally
    {

    }
}

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad() {
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次

    GetComBoValue("dlDept_Text", "dlDept");
    GetComBoValue("dlUser_Text", "dlUser");
    //var tes=H_dlDept_Text.value
    // document.all.H_dlDept_Value.value=tes;
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
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
    //1050412 Zen 1050087 二代公文修改
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btOpen":
            Page_BlockSubmit = !CheckBeforOpen();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            //1050422 Zen 1050087 二代公文修改
            //if (jf_ConfirmSave() && Comcheck() && SyncDL("dlUser_Text", "dlUser")) //是否通過儲存前必要檢查
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !(jf_ConfirmDelete() && jf_CheckBeforSave);
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = false;
            jf_ConfirmClean(true);
            jf_ToolBarSubmit(xObjectName);
            //1050602 Zen 1050087 二代公文修改
            //document.all["dlDept_Text"].focus();
            $('#dlDept_Text').focus();
            break;
        case "btSearch":
            Page_BlockSubmit = false;
            var strUrl = "";
            var strKeyCol = jf_Trim(document.all["H_dlDept_Text"].value);
            //var strMainTableCol1 = jf_Trim(document.all["H_Artifact"].value);
            /*var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
			var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));*/
            strUrl = "EAM012C1.aspx?rtnObj=lbReturnValue&DEPT_VALUE=" + strKeyCol;
            jf_OpenChildWin(strUrl, "EAM012C1", 800, 600);
            jf_ToolBarSubmit(xObjectName);

            break;
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPrint();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave() {
    var bRtnbool = true;

    bRtnbool = jf_CheckBeforSave();

    if (!bRtnbool)
        return;

    var bRtnbool = false;

    //1050422 Zen 1050087 二代公文修改
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
    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave() {
    var bRtnbool = true;
    var strErrMsg = "";
    var strControlName = "";

    //先檢查承辦單位/承辦人選單
    //jf_DeptCheck('dlDept','dlUser');
    //jf_UserCheck('dlUser');

    if (document.all["dlDept_Text"].value == "") {
        strErrMsg += "承辦單位不可空白\n";
        if (strControlName == "")
            strControlName = "dlDept_Text";

    }
    if (document.all["dlUser_Text"].value == "") {
        strErrMsg += "核決專人不可空白\n";
        if (strControlName == "")
            strControlName = "dlUser_Text";
    }


    if (strErrMsg != "") {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;

}
function CheckBeforOpen() {
    var bRtnbool = true;
    if (document.all["dlDept_Text"].value == "") {

        alert('承辦單位不可空白');
        bRtnbool = false;
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

    if (argCallerId == "EAM012C1") {
        document.all["H_RE_DEPT_NO"].value = jf_Trim(document.all.lbReturnValue.options[0].value);

        document.all["H_RE_USERNAME"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
        document.all["H_RE_ROLE_NO"].value = jf_Trim(document.all.lbReturnValue.options[2].value);

        if (document.all["H_RE_DEPT_NO"].value != "") {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
        //1050602 Zen 1050087 二代公文修改
        //document.all["dlDept_Text"].focus();
        $('#dlDept_Text').focus();
        document.all["H_RE_DEPT_NO"].value = "";
        document.all["H_RE_USERNAME"].value = "";
        document.all["H_RE_ROLE_NO"].value = "";
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
//Combobox Onblur處理 GetComBoValue("dlDept_Text","dlDept");
function SyncDL(argObject, argName) {
    var bDept = false;
    var IsOk = true;
    //如果不為空
    if (jf_Trim(document.all[argObject].value) != "") {
        for (var i = 0 ; i < document.all[argName].length ; i++) {
            if (document.all[argName].options[i].text == document.all[argObject].value) {
                document.all[argName].selectedIndex = i;
                bDept = true;
                break;
            }
        }
        if (!bDept) {
            document.all[argName].selectedIndex = 0;
            document.all[argObject].value = "";
            if (argName == "dlUser")
                alert('您所輸入之核決人不存在於系統中。');
            //1050602 Zen 1050087 二代公文修改
            //document.all[argObject].focus();
            $('#'+argObject).focus();
            return;
        }
        GetComBoValue(argObject, argName);
    }
        //如果為空清除
    else {
        if (argName == "dlDept") {
            document.all["dlUser"].options.length = 0;
            document.all["dlUser_Text"].value = "";
            document.all["H_dlUser_Value"].value = "";
            document.all["H_dlDept_Text"].value = "";
            document.all["H_dlDept_Value"].value = "";
        }
        else
            document.all["H_" + argName + "_Value"].value = "";
    }
    return IsOk;
}
//ComBoBox Onchange檢核
function OnChangeCheck(argObject, argName) {

    if (argObject == "dlDept_Text" && jf_Trim(document.all[argObject].value) != jf_Trim(document.all["H_" + argName + "_Text"].value)) {
        //清空承辦人相關欄位
        document.all["dlUser_Text"].value = "";
        document.all["H_dlUser_Value"].value = "";
    }
    GetComBoValue(argObject, argName);


}
//只單獨檢查承辦單位(點選儲存時)，因為承辦單位onblur檢核在lib裡面。如果寫在跟承辦人同一地方 會跳兩次錯誤訊息
function Comcheck() {
    var IsOk = true;
    if (jf_Trim(document.all["dlDept_Text"].value) != jf_Trim(document.all["H_dlDept_Text"].value) && jf_Trim(document.all["dlDept_Text"].value) != "") {
        alert("該承辦單位不存在");
        document.all["H_dlDept_Value"].value = "";
        document.all["H_dlDept_Text"].value = "";
        //1050602 Zen 1050087 二代公文修改
        //document.all["dlDept_Text"].focus();
        $('#dlDept_Text').focus();
        document.all["H_dlUser_Value"].value = "";
        document.all["dlUser_Text"].value = "";
        document.all["dlUser"].options.length = 0;
        document.all["H_SECT_VALUE"].value = "";
        document.all["H_ROLE_VALUE"].value = "";


        IsOk = false;
    }

    return IsOk;

}
//取得ComBox值
function GetComBoValue(argObject, argName) {
    var strArr1 = new Array();
    if (jf_Trim(document.all[argObject].value) != "") {
        strArr1 = document.all[argName].options[document.all[argName].selectedIndex].value.split(':');
        if (argName == "dlUser") {
            document.all["H_" + argName + "_Value"].value = strArr1[2];
            document.all["H_SECT_VALUE"].value = strArr1[0];
            document.all["H_ROLE_VALUE"].value = strArr1[1];


        }
        else {
            document.all["H_" + argObject].value = strArr1[1];
            document.all["H_" + argName + "_Value"].value = strArr1[0];
        }
    }
}
function DeptOnChange() {
    document.all["dlUser"].options.length = 0;
    //var vaUser = new Object();
    //vaUser.Text = "A";
    //vaUser.val = "A";

    //1070830 Zen 1070678 弱掃Ajax修正
    //vaUser = EAM012.GetMan(document.all["H_Artifact"].value, document.all["H_dlDept_Value"].value).value;//callajax把strSect選單條件下的承辦人帶回	
    vaUser = EA01.EAM012.GetMan(document.all["H_Artifact"].value, document.all["H_dlDept_Value"].value).value;//callajax把strSect選單條件下的承辦人帶回	
    //vaUser.val = EAM012.GetMan(document.all["H_Artifact"].value,document.all["H_dlDept_Value"].value).val

    document.all["dlUser"].options.add(new Option("", ""));

    if (vaUser.length != "") {
        for (var j = 0; j < vaUser.length ; j++) {
            if (vaUser[j] == null)
                break;

            document.all["dlUser"].options.add(new Option(vaUser[j].TXT, vaUser[j].VAL));
        }
    }

    if (document.all["dlUser"].options.length > 10)
        document.all["dlUser"].size = 10;
    else if (document.all["dlUser"].options.length == 1)
        document.all["dlUser"].size = 2;
    else
        document.all["dlUser"].size = document.all["dlUser"].options.length;
}