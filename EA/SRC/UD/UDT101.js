/*
 * DATE     PRG     MGR_NO  DESC
 * 1060516  Justin  1060400 二代公文修改
 * 1061103  Zen		1061071	修正點擊核可多次會收到重複通知之問題
 * 1070412  Zen     1061071 修正檢核失敗後無法postback之問題
 * 1070830  Zen     1070678 弱掃Ajax修正
 * 1081231	Kevin_C	1081095	修正取下拉選單選項的屬性在IE不支援的問題
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

//指定DataGrid欄位
var strTableFields = new Array("_lbRead", "_txInput1", "_txInput2");
//1060516 Justin [1060400] 二代公文修改
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
function ClientOnLoad()
{
    //1060516 Justin [1060400] 二代公文修改
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060516 Justin [1060400] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_btFLD_TYPE"] != null)
    {
        btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
    }

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        /*1060516 Justin [1060400] 二代公文修改
		case "btCrtDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txCrtDate, event.screenX, event.screenY);
			break;
		case "btRmvsecDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txRmvsecDate, event.screenX, event.screenY);
			break;
		case "btAttExtFileDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txAttExtFileDate, event.screenX, event.screenY);
			break;*/
        case "btClsNo":
            var strUrl = "../EA01/EAC005.aspx?FILE_CLS=" + document.all["txFileCls"].value + "&FILE_YEAR=" + "&MODE=1&nFrom=EAT230&VER_NO=";
            //1060516 Justin [1060400] 二代公文修改
            //jf_OpenChildWin(strUrl, "EAC005", 700, 500);
            jf_OpenChildWin(strUrl, "EAC005", 800, 600);
            Page_BlockSubmit = true;
            break;
        case btHelp:
            /*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060516 Justin [1060400] 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
    {
        //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1060516 Justin [1060400] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            //Page_BlockSubmit = !jf_CheckKeyObject();
            Page_BlockSubmit = false;
            //1060516 Justin [1060400] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCommit":
            Page_BlockSubmit = !jf_ConfirmSave();
            //1060516 Justin [1060400] 二代公文修改 
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btReject":
            Page_BlockSubmit = !jf_ConfirmSave();
            //1060516 Justin [1060400] 二代公文修改 
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btTransfer":
            var ddlIdx = 2;
            /*1060516 Justin [1060400] 二代公文修改
			var nextOpt = GetToolbarCtrl(ddlIdx);
			var aOptions = nextOpt.getOptions();
			document.all.SelectedUser.value = aOptions.value;
			document.all.SelectedUser2.value = aOptions[aOptions.selectedIndex].text;*/
			//1081231	Kevin_C	1081095	修正取下拉選單選項的屬性在IE不支援的問題
            //document.all.SelectedUser.value = document.all.ddlNextUser.selectedOptions[0].value;
            //document.all.SelectedUser2.value = document.all.ddlNextUser.selectedOptions[0].text;
			document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
            document.all.SelectedUser2.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].text;
            Page_BlockSubmit = !jf_ConfirmSave();
            //1060516 Justin [1060400] 二代公文修改 
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1060516 Justin [1060400] 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSearch":
            var strArtifact = document.all.SsoArtifact.value;
            var strApplyNo = document.all["txApplyNo"].value;
            var strHttp = document.all.nHttp.value;
            var strSourceOrgno = document.all.nSourceOrgno.value;
            var strUrl = strHttp + "EDI200.aspx?SOURCE_ORGNO=" + strSourceOrgno + "&argMsgFrom=UDT100&argMsgFromId=" + strApplyNo + "&SAMLart=" + strArtifact;
            //1060516 Justin [1060400] 二代公文修改
            //jf_OpenChildWin(strUrl, "EDI200", 700, 500);
            jf_OpenChildWin(strUrl, "EDI200", 800, 600);
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
        case "btDeleteSelected":
            Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
            //1060516 Justin [1060400] 二代公文修改 
            //jf_ToolBarSubmit();
            //jf_SelectBarSubmit();
            jf_SelectBarSubmit(xObjectName);
            break;
        case "btUp":
            Page_BlockSubmit = true;
            jf_RowUp("dg1", "_cbSelect", strTableFields);
            break;
        case "btDown":
            Page_BlockSubmit = true;
            jf_RowDown("dg1", "_cbSelect", strTableFields);
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
    var bRtnbool = false;

    if (jf_CheckBeforSave())
    {
        // 新增模式需檢查鍵值是否已存在
        if (jf_GetActionMode() == LayoutModeNew)
        {
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
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
    var InValidName = "";
    var InValidControlName = "";

    for (var i = 2; i <= document.all.dg1.rows.length; i++)
    {
        //txInput1不為空白時
        if (document.all["dg1__ctl" + i + "_txInput1"].value != "")
        {
            //txInput2不可空白
            if (document.all["dg1__ctl" + i + "_txInput2"].value == "")
            {
                InValidName += ",Input2不可空白";
                InValidControlName = "dg1__ctl" + i + "_txInput2";
            }

            if (InValidName != "")
            {
                InValidName = InValidName.substr(1, InValidName.length);
                //1060516 Justin [1060400] 二代公文修改
                //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
                //document.all[InValidControlName].focus();
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
                $('#' + InValidControlName).focus();
                return false;
            }
        }
    }
    return true;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            //document.all["txApplyNo"].value = jf_Trim(argResult.value.RtnStr);
        }
        else
        {
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
function CallBack(argCallerId)
{
    if (argCallerId == "EAC005")
    {
        if (document.all["lbReturnValue"].length > 0)
        {
            document.all["txFileCls"].value = document.all["lbReturnValue"].options[1].value;
        }
    }
    //1060516 Justin [1060400] 二代公文修改
    //document.all["txFileCls"].focus();
    $('#txFileCls').focus();

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
/*取得tbTool的物件*/
function GetToolbarCtrl(argId)
{
    return document.all.tbTool.getItem(argId);
    for (var i = 0; i < 20; i++)
    {
        var o = document.all.tbTool.getItem(i);
        if (o != null)
        {
            alert(o.getAttribute("ID"));
            if (o.getAttribute("ID") == argId)
                return o;
        }
    }
    return null;
}

//紀錄Client端所選擇之UserID
function jf_dlUserChange()
{
    //alert(document.all["dlUser"].options(document.all["dlUser"].selectedIndex).value)
    var empUserInfo = document.all["dlUser"].options(document.all["dlUser"].selectedIndex).value;
    var tempstr = empUserInfo.split(":");
    document.all["empUserId"].value = tempstr[2];

}

/**********************************************************************************************
  Name : function akjf_DeptCheck()
  Desc : 離開部門欄位的合理性檢查與人員欄位的連動處理
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
  Rtn  : none
 **********************************************************************************************/
function jf_DeptCheck(argDeptComboBoxID, argUserComboBoxID)
{
    /*** 離開欄位時檢查代碼或名稱是否存在 ***/
    var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
    var DeptComboBoxObj = document.all[argDeptComboBoxID];
    var i, j, len;
    var checkOK = false;
    for (i = 0 ; i < DeptComboBoxObj.options.length ; i++)
    {
        if (checkOK) break;
        var arr = DeptComboBoxObj.options[i].value.split(":");
        for (j = 3 ; j >= 0 ; j--)
        {
            if (arr[j] == DeptComboBoxTextObj.value)
            {
                checkOK = true;
                DeptComboBoxObj.selectedIndex = i;
                break;
            }
        }
    }
    if (!checkOK)
    {
        ClearDL(document.all.dlUser);
        document.all["dlUser_Text"].value = "";
        document.all["txDL"].value = "";

        //alert("單位輸入錯誤");
        return;
    }
    /*** END ***/

    var val = DeptComboBoxObj.value;
    var arr = val.split(":");

    if (arr.length != 4) return;

    if (arr[2] == "") val = arr[0];
    else val = arr[2];

    callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDeptAllUsers", false, val);

    var resultObj = null;
    if (callObj.error)
    {
        alert(callObj.errorDetail.string);
    }
    else
    {
        if (jf_IsWebServiceSuccess(callObj))
            resultObj = callObj.value;
    }

    var UserComboBoxObj = document.all[argUserComboBoxID];
    var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];
    var UserNameMem = DeptComboBoxTextObj.value;

    //clear the ComboBox of User
    len = UserComboBoxObj.length;
    for (i = 0 ; i < len ; i++)
        UserComboBoxObj.remove(0);

    //add new data into the ComboBox of User
    len = resultObj.UserName.length;
    UserComboBoxObj.options.add(new Option("", ""));
    for (i = 0 ; i < len ; i++)
    {
        var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i] + ":" + resultObj.SectNo[i] + ":" + resultObj.UserName[i])
        UserComboBoxObj.options.add(objOption);
    }

    //clear the data of ComboBox of User and reset it.
    UserComboBoxTextObj.value = "";
    UserComboBoxObj.selectedIndex = -1;
    for (i = 0 ; i < len ; i++)
    {
        if (UserNameMem == resultObj.EmpName[i] || UserNameMem == resultObj.UserName[i])
        {
            UserComboBoxTextObj.value = resultObj.EmpName[i];
            UserComboBoxObj.selectedIndex = i;
            break;
        }
    }
}
//將DropDownList裡的item清除
function ClearDL(argObj)
{
    for (var i = 0 ; i < argObj.length; i++)
        argObj.remove(0);

    argObj.length = 0;
    return;
}
//取得dldept有無存在於下方ddl中
function GetDeptTextExist()
{
    var checker = false;

    for (var i = 0; i < document.all["dlDept"].options.length; i++)
    {
        if (document.all["dlDept"].options[i].text == document.all["dlDept_Text"].value)
        {
            checker = true;
        }
    }
    return checker;

}

//分類號OnBlur
function txFileClsOnBlur()
{
    if (document.all["txFileCls"].value != "")
    {
        //1070830 Zen 1070678 弱掃Ajax修正
        //var CheckResult = UDT101.CheckCls(document.all.nSourceOrgno.value, document.all["txFileCls"].value).value;
        var CheckResult = UD.UDT101.CheckCls(document.all.nSourceOrgno.value, document.all["txFileCls"].value).value;
        if (CheckResult.split(',')[0] == "false")
        {
            document.all["txFileCls"].value = "";
            document.all["txClsKey"].value = "";
            document.all["txKeepYear"].value = "";
            alert(CheckResult.split(',')[1]);
            //1060516 Justin [1060400] 二代公文修改
            //document.all["txFileCls"].focus();
            $('#txFileCls').focus();
        }
        else
        {
            document.all["txClsKey"].value = CheckResult.split(',')[2];
            document.all["txKeepYear"].value = CheckResult.split(',')[3];
        }
    }
}

//日期格式檢查
//1060516 Justin [1060400] 二代公文修改
//function Check_DATE(obj,focus_obj)
function Check_DATE(argid, focus_obj)
{
    //1060516 Justin [1060400] 二代公文修改
    var obj = document.all[argid];
    if (obj.value != "")
    {
        obj.value = jf_PADL(obj.value, 7, "0");

        if (!jf_CheckCDATE(obj.value))
        {
            jf_ShowMsg("輸入的日期不合法,請重新輸入", "您輸入之資料有誤，明細如下，請更正後重試");
            //1060515 Justin [1060400] 二代公文修改
            //obj.focus();
            $('#' + argid).focus();
            Page_BlockSubmit = true;
        }
        else
        {
            if (focus_obj != null)
            {
                focus_obj.focus();
            }
        }
    }
}

/*核可原因變更時*/
function dlPhraseNo_onchange()
{
    var index = document.all["dlPhraseNo"].selectedIndex;
    //1060516 Justin [1060400] 二代公文修改
    //var val		= document.all["dlPhraseNo"].options[index].innerText;
    var val = document.all["dlPhraseNo"].options[index].textContent;
    document.all["txDesc"].value += val;
    document.all["dlPhraseNo"].options[0].selected = true;
    //1060516 Justin [1060400] 二代公文修改
    //document.all["txDesc"].focus();
    $('#txDesc').focus();
}
