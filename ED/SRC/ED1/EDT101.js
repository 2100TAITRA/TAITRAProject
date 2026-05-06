/*
DATE	SA		PRG		MGR_NO	DESC 
1010806	Cloud	Cloud	1010739	新增寄送E-MAIL功能
1011128	David	David	1010983	新增來文機關，來文機關欄位改為自動完成元件
1050408	David	Joe		1050087	二代系統修改
1050520	David	JOE		1050087	二代系統升級，調整focus寫法
1051019 Leslie  Kenny   1050087 二代公文修改
1110103 Kevin   Zen     1101292 修正多次點擊重複PostBack之問題
1120207 Zen     Zen     1111055 新增同日期不可登錄重複掛號號碼郵件之防呆檢核
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050408 Joe 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1120207 Zen 1111055 新增同日期不可登錄重複掛號號碼郵件之防呆檢核
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
    ////1011128 David 1010983 初始化詞庫下載元件
    //1050408 Joe 1050087 快速完成元件，暫不修改--START
    /*if (document.all.H_WeDictsyncWsdl && document.all.H_WeDictsyncWsdl.value != "")
    {
        var dsync = new ActiveXObject("DictSync.Synchronizer");
        dsync.INIFile = "C:\\2100\\公文製作\\ED21.ini";
        dsync.WSDL = document.all.H_WeDictsyncWsdl.value;
    }

    //1011128 David 1010983 來文機關欄位內容設定
    if(document.all.txFromOrg.value != "")
        document.all.txAutoFromOrg.value = document.all.txFromOrg.value;
    */
    //1050408 Joe 1050087 快速完成元件，暫不修改--END

    //1090924 Zen 1090687 單位異動後更新承辦人選單之行為改於Client端執行避免頻繁PostBack
    document.all["H_Dept"].value = '';
    var strEmpName = document.all["H_User"].value;
    dlDept_Text_onblur();
    document.all["H_User"].value = strEmpName;
    document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
    document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
    document.all['dlUser'].value = document.all["H_User_Value"].value;
    document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1050408 Joe 1050087 二代公文修改，因快速元件問題，暫不處理
    switch (xObjectName)
    {
        //1011128 David 1010983 新增「加入備註」按鈕
        case "btInsertDesc":
            Page_BlockSubmit = true;
            InsertxDesc("txDesc", document.all.txFromOrg.value);
            break;
        //1050516	Joe	1050087	處理子視窗查詢--START--
        case "btSearchGrp":
            Page_BlockSubmit = true;
            strOrgID = document.all.H_OrgNo.value;
            var path = document.all.H_Wed010C1Path.value;
            var strUrl = "";
            strUrl = path + "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + strOrgID + "&K1=WEM010";//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
            jf_OpenChildWin(strUrl, "WEM010C1", 700, 500);
            break;
        //1050516	Joe	1050087	處理子視窗查詢--END--
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050408 Joe 1050087 二代公文修改，參數多加event
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1050408 Joe 1050087 二代公文修改
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1050408 Joe 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_ConfirmSave(xObjectName)) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState(xObjectName);
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1050408 Joe 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1050408 Joe 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1050408 Joe 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            document.all["rblMailType_0"].checked = true;
            document.all.txRcv_date.value = jf_GetDateNow();
            //1050520	Joe	1050087	二代系統升級，調整focus寫法
            //document.all.txMailNo.focus();
            $('#' + txMailNo.id).focus();
            break;
        case "btSearch":
            Page_BlockSubmit = true;
            var strUrl = "";
            strUrl = "EDI101.aspx?rtnObj=lbReturnValue";
            jf_OpenChildWin(strUrl, "EDI101", 1024, 768);
            break;
        //1010806	Cloud	Cloud	1010739	新增寄送E-MAIL功能
        case "btSendEmail":
            Page_BlockSubmit = !checkBeforeSendEmail();
            //1050408 Joe 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
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
        bRtnbool = true;
    }

    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    if (!CheckCDATE("txRcv_date", "登錄日期") || !CheckTIME("txRcv_time", "登錄時間"))
        return false;
    var strErrMsg = "";
    var objFocus = null;

    if (document.all["txRcv_date"].value == "")
    {
        strErrMsg += "登錄日期不可空白\n";
        objFocus = document.all.txRcv_date;
    }

    if (document.all["txDept"].value == "")
    {
        strErrMsg += "收件單位不可空白\n";
        if (!objFocus)
            objFocus = document.all.txDept;
    }

    if (jf_Trim(document.all.txDesc.value) && (jf_Trim(document.all.txDesc.value).length > 200))
    {
        strErrMsg += "備註內容不可超過兩百字\n";
        if (!objFocus)
            objFocus = document.all.txDesc;
    }

    //1120207 Zen 1111055 新增同日期不可登錄重複掛號號碼郵件之防呆檢核
	//1131105	Joe		序1183		修正舊資料無法維護的問題，新增模式下才進行郵件登錄檢核
	if (jf_GetActionMode()==LayoutModeNew)
	{	
		var bExist = ED1.EDT101.CheckMailExist(document.all['H_OrgNo'].value, document.all['txRcv_date'].value, document.all['txRegNo'].value).value;
		if (bExist)
		{
			strErrMsg += '此郵件已登錄過無法重複登錄。\n';
			objFocus = document.all['txRegNo'];
		}	
	}

    if (strErrMsg != "")
    {
        //1050520	Joe	1050087	二代系統升級，調整focus寫法
        //objFocus.focus();
        $('#' + objFocus.id).focus();
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
        return false;
    }

    ////1011128 David 1010983 儲存前觸發自動完成元件Onblur 
    //1050408 Joe 1050087 二代系統修改，因快速完成元件問題，暫不處理
    //txAutoFromOrg_onblur();

    return true;
}
//1010806	Cloud	[1010739]	新增寄送E-MAIL功能
function checkBeforeSendEmail()
{
    if (document.all.H_txUserName.value == "")
    {
        alert('收件人非校內使用者，不可寄送E-MAIL');
        return false;
    }
    return true;
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{

    if (argCallerId == "EDI101")
    {
        document.all["txMailNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);

        if (document.all["txMailNo"].value != "")
        {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
        //1050520	Joe	1050087	二代系統升級，調整focus寫法
        //document.all["txMailNo"].focus();
        $('#txMailNo').focus();
    }

    //1050516	Joe		新增處理WEM010C1回傳值
    if (argCallerId == "WEM010C1")
    {
        var RtnStr = document.all["lbReturnValue"].options[0].value;
        var RtnArr = RtnStr.split('^');
        document.all.txFromOrg.value = RtnArr[1];
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
function fnUserOnChange()
{
    //1090924 Zen 1090687 單位異動後更新承辦人選單之行為改於Client端執行避免頻繁PostBack
    var strEmpName = document.all.dlUser.options[document.all.dlUser.selectedIndex].text;
    if (strEmpName != document.all["H_User"].value)
    {
        document.all.txUser.value = document.all.dlUser.options[document.all.dlUser.selectedIndex].text;
        //呼叫ED_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
        document.all["H_User"].value = document.all.txUser.value;
        document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
    }
    document.all.txUser.value = strEmpName;
}
//1011128 David 1010983 來文機關欄位內容設定
//1050408 Joe 1050087 二代系統修改，因快速完成元件問題，先不對此控制項做處理
/*
function txAutoFromOrg_onblur()
{
    document.all.txFromOrg.value = document.all.txAutoFromOrg.value;
}
*/

//1011128 David 1010983 新增加入備註功能鍵
function InsertxDesc(controlID, value)
{
    var control = document.getElementById(controlID);

    if (document.all)
    {
        //1050520	Joe	1050087	二代系統升級，調整focus寫法
        //control.focus();
        $('#' + control.id).focus();
        document.selection.createRange().text = value;
    }
    else
    {
        var selLength = control.textLength;
        var selStart = control.selectionStart;
        var selEnd = control.selectionEnd;
        if (selEnd == 1 || selEnd == 2) selEnd = selLength;
        control.value = (control.value).substring(0, selStart) + value + (control.value).substring(selEnd, selLength);
    }
}

//1090924 Zen 1090687 單位異動後更新承辦人選單之行為改於Client端執行避免頻繁PostBack
function dlDept_Text_onblur()
{
    var strDeptName = document.all.dlDept.options[document.all.dlDept.selectedIndex].text;
    if (strDeptName != document.all["H_Dept"].value)
    {
        //呼叫ED_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單

        document.all.txDept.value = strDeptName;
        //存ComboBox_Text的value
        document.all["H_Dept"].value = document.all.txDept.value;
        //存所選擇的ComboBox項目的value
        document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);

        var valUser = new Array(3);
        valUser[0] = encodeURI(dlDept.value);
        valUser[1] = '';
        valUser[2] = true;
        var callObj = jf_CallWS("../EDLIB/EDWS.asmx", "GetUnitAllUsers", false, valUser);

        var resultObj = null;
        if (jf_IsWebServiceSuccess(callObj))
        {
            resultObj = callObj.value;
        }

        //清空選項
        while (dlUser.length > 0)
            dlUser.remove(0);

        //重新新增選項
        len = resultObj.UserName.length;
        dlUser.options.add(new Option("", ""));
        for (i = 0; i < len; i++)
        {
            //項目格式： [承辦人名稱][承辦單位代碼:承辦科別代碼:承辦人代碼:承辦人名稱]
            var objOption = new Option(resultObj.EmpName[i], resultObj.UserName[i])
            dlUser.options.add(objOption);
        }

        document.all["H_User"].value = document.all["dlUser"].value;
        document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
        //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
        document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);

    }
}