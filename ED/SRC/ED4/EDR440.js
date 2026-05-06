/*	
DATE	SA		PG		MGR_NO  DESC
1020902	--		Cloud	        修正下拉選單有選擇東西後按下查詢會異常的錯誤
1040825	Leslie	Kevin_C	1040695	增加處理DataGrid超連結的函式
1050823 David	Zen     1050087 二代公文修改
1050902	David	Zen		1050778 鐵改局需求新增查詢條件和報表欄位
1051019 Leslie  Kenny   1050087 二代公文修改
1051130 David   Zen     1051175 新增鐵改局查詢條件和報表欄位
1060223 David   Zen     1051175 修正網址參數名稱
1070830 Kevin   Justin  1070678 弱掃AJAX修改
1080211 Kevin   Zen     1071032 (鐵道局)新增查詢條件及檢核當前帳號為原承辦單位主管才可解除追蹤
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

var iCallID_GetBTypeNo = "";
//1070830 Justin [1070678]弱掃AJAX修改
AjaxPro.Request.prototype.timeout = function () {
    try {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false) {
            this.abort();
        } else {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error) {

    }
    finally {

    }
}
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
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
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
        case "btPreview":
        case "btExcel":
            Page_BlockSubmit = !CheckBeforeSearch();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
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
    if (argResult.id == iCallID_GetBTypeNo)
    {
        if (jf_IsWebServiceSuccess(argResult) && argResult.value.RtnStr != "")
        {
            document.all.ddlWorkType.disabled = false;
            var pTmpAry = argResult.value.RtnStr.split(":");

            var ddlWorkType = document.all.ddlWorkType;
            var emptyItem = new Option('', '');
            ddlWorkType.options.add(emptyItem);

            for (var i = 0; i < pTmpAry.length; i++)
            {
                var pTmpAry2 = pTmpAry[i].split(",");

                var newItem = new Option(pTmpAry2[0] + " " + pTmpAry2[1], pTmpAry2[0]);
                ddlWorkType.options.add(newItem);
            }
        }
        else if (argResult.value.RtnStr == "")
        {
            document.all.ddlWorkType.disabled = true;
        }
        else
        {
            alert('Service Unavailable');
        }
    }
}


/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforeSearch()
{
    var strRecordDueDateS = jf_Trim(document.all.txRecordDueDateS.value);
    var strRecordDueDateE = jf_Trim(document.all.txRecordDueDateE.value);
    //1080211 Zen 1071032 (鐵道局)新增查詢條件及檢核當前帳號為原承辦單位主管才可解除追蹤    var strRcvDateS = jf_Trim(document.all['txRcvDateS'].value);
    var strRcvDateE = jf_Trim(document.all['txRcvDateE'].value);
    var strErrMsg = '';

    var bRtn = true;

    if (strRecordDueDateS + strRecordDueDateE + strRcvDateS + strRcvDateE == '')
        strErrMsg += '日期欄位不可皆為空';

    //1080211 Zen 1071032 (鐵道局)新增查詢條件及檢核當前帳號為原承辦單位主管才可解除追蹤，調整檢核後處理方式    //if (!CheckDATE("txRecordDueDateS", "收創文日期(起)"))
    //{
    //    bRtn = false;
    //    return bRtn;
    //}
    //if (!CheckDATE("txRecordDueDateE", "收創文日期(迄)"))
    //{
    //    bRtn = false;
    //    return bRtn;
    //}

    //1051130 Zen 1051175 新增鐵改局查詢條件和報表欄位
    if (strRecordDueDateS == "" && strRecordDueDateE != "")
        document.all.txRecordDueDateS.value = strRecordDueDateE;
    else if (strRecordDueDateS != "" && strRecordDueDateE == "")
        document.all.txRecordDueDateE.value = strRecordDueDateS;
    else if (strRecordDueDateS.localeCompare(strRecordDueDateE) == 1)
    {
        document.all.txRecordDueDateS.value = strRecordDueDateE;
        document.all.txRecordDueDateE.value = strRecordDueDateS;
    }

    //1080211 Zen 1071032 (鐵道局)新增查詢條件及檢核當前帳號為原承辦單位主管才可解除追蹤    if (strRcvDateS == '' && strRcvDateE != '')
        document.all['txRcvDateS'].value = strRcvDateE;
    else if (strRcvDateS != '' && strRcvDateE == '')
        document.all['txRcvDateE'].value = strRcvDateS;
    else if (Number(strRcvDateS) > (Number(strRcvDateE)))
    {
        document.all['txRcvDateS'].value = strRcvDateE;
        document.all['txRcvDateE'].value = strRcvDateS;
    }

    strErrMsg += CheckDATE("txRecordDueDateS", "批示限辦日期(起)", true);
    strErrMsg += CheckDATE("txRecordDueDateE", "批示限辦日期(迄)", true);
    strErrMsg += CheckDATE("txRcvDateS", "收創文日期(起)", true);
    strErrMsg += CheckDATE("txRcvDateE", "收創文日期(迄)", true);

    if (strErrMsg != '')
    {
        alert(strErrMsg);
        bRtn = false;
    }

    var bHasCheck = false;

    return bRtn;
}

//1080211 Zen 1071032 (鐵道局)新增查詢條件及檢核當前帳號為原承辦單位主管才可解除追蹤，額外傳入來源
//function CheckDATE(argObj, strMsg)
function CheckDATE(argObj, strMsg, argFromTbtool)
{
    if (bHasCheck)
    {
        bHasCheck = false;
        return;
    }
    bHasCheck = true;

    //1080211 Zen 1071032 (鐵道局)新增查詢條件及檢核當前帳號為原承辦單位主管才可解除追蹤    var strErrMsg = '';
    var strDate = document.all[argObj].value;
    if (strDate != "")
    {
        if (strDate.length < 7)
        {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate))
        {
            //1080211 Zen 1071032 (鐵道局)新增查詢條件及檢核當前帳號為原承辦單位主管才可解除追蹤，調整檢核後處理方式--begin            //$('#' + argObj).focus();
            //if (strMsg)
        	//    jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
			//1090831	Joe		--		修正錯誤
        	//strErrMsg += FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argMsg])) + '\n';
        	strErrMsg += FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])) + '\n';
            if (argFromTbtool == false)
                jf_ShowMsg(strErrMsg, '');
            //1080211 Zen 1071032 (鐵道局)新增查詢條件及檢核當前帳號為原承辦單位主管才可解除追蹤，調整檢核後處理方式--end            bHasCheck = false;
            //1080211 Zen 1071032 (鐵道局)新增查詢條件及檢核當前帳號為原承辦單位主管才可解除追蹤，調整檢核後處理方式
            //return false;
        }
    }
    bHasCheck = false;
    //1080211 Zen 1071032 (鐵道局)新增查詢條件及檢核當前帳號為原承辦單位主管才可解除追蹤，調整檢核後處理方式
    return strErrMsg;
}

function dlDeptOnChange()
{
    var str = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value;//使用者點選選單，選到的是哪個index值
    var dlSect = document.all["dlSect"];
    var dlUser = document.all["dlUser"];
    document.all["h_DeptInfo"].value = str;//將單位放入隱藏欄位
    document.all["h_SectInfo"].value = "";
    document.all["h_UserInfo"].value = "";
    fnClearDropDownList(dlSect);
    fnClearDropDownList(dlUser);
    document.all.SectList.value = "";
    document.all.UserList.value = "";
    if (document.all["dlDept"].selectedIndex > 0)//index有可能是0"空白"的情況
    {
        document.all["dlSect"].className = "";
        //1070830 Justin [1070678]弱掃AJAX修改
        //var Sectvalue = EDR440.GetSub(document.all["SsoArtifact"].value, str).value;
        var Sectvalue = ED4.EDR440.GetSub(document.all["SsoArtifact"].value, str).value;
        if (Sectvalue.length > 0)
        {
            dlSect.options.add(new Option("", ""));//DropDownList新增一個空白
            for (var i = 0; i < Sectvalue.length; i++)
            {
                var strSect = Sectvalue[i];
                dlSect.options.add(new Option(strSect.split('|')[0], strSect.split('|')[1]));
                document.all.SectList.value += strSect + ";"
            }
            //1070830 Justin [1070678]弱掃AJAX修改
            //var Uservalue = EDR440.GetUser(document.all["SsoArtifact"].value, str).value;
            var Uservalue = ED4.EDR440.GetUser(document.all["SsoArtifact"].value, str).value;
            if (Uservalue.length > 0)
            {
                dlUser.options.add(new Option("", ""));
                for (var i = 0; i < Uservalue.length; i++)
                {
                    var strUser = Uservalue[i];
                    dlUser.options.add(new Option(strUser.split('|')[0], strUser.split('|')[1]));
                    document.all.UserList.value += strUser + ";"
                }
            }
        }
        else
        {
            document.all["dlSect"].className = "hide";
            dlUser.options.add(new Option("", ""));//DropDownList新增一個空白
            //1070830 Justin [1070678]弱掃AJAX修改
            //var Uservalue = EDR440.GetUser(document.all["SsoArtifact"].value, str).value;
            var Uservalue = ED4.EDR440.GetUser(document.all["SsoArtifact"].value, str).value;
            if (Uservalue.length > 0)
            {
                for (var i = 0; i < Uservalue.length; i++)
                {
                    var strUser = Uservalue[i];
                    dlUser.options.add(new Option(strUser.split('|')[0], strUser.split('|')[1]));
                }
            }
        }
    }
    else
    {
        fnClearDropDownList(dlSect);
        document.all["dlSect"].className = "hide";
    }
}

function dlSectOnChange()
{
    var str = document.all["dlSect"].options[document.all["dlSect"].selectedIndex].value;//使用者點選選單，選到的是哪個index值
    var dlUser = document.all["dlUser"];
    document.all["h_SectInfo"].value = str;//將科別放入隱藏欄位
    document.all["h_UserInfo"].value = "";
    fnClearDropDownList(dlUser);
    document.all.UserList.value = "";
    if (document.all["dlSect"].selectedIndex > 0)//index有可能是0"空白"的情況
    {
        document.all["dlUser"].className = "";
        //1070830 Justin [1070678]弱掃AJAX修改
        //var Uservalue = EDR440.GetUser(document.all["SsoArtifact"].value, str).value;
        var Uservalue = ED4.EDR440.GetUser(document.all["SsoArtifact"].value, str).value;
        dlUser.options.add(new Option("", ""));//DropDownList新增一個空白
        if (Uservalue.length > 0)
        {
            for (var i = 0; i < Uservalue.length; i++)
            {
                var strUser = Uservalue[i];
                dlUser.options.add(new Option(strUser.split('|')[0], strUser.split('|')[1]));
                document.all.UserList.value += strUser + ";"
            }
        }
        else//無人員清空下拉選單
        {
            fnClearDropDownList(dlUser);
        }
    }
    else//有二級單位選單，選擇空白時，應帶出一級單位所有人員
    {
        fnClearDropDownList(dlUser);
        dlUser.options.add(new Option("", ""));//DropDownList新增一個空白
        //1070830 Justin [1070678]弱掃AJAX修改
        //var Uservalue = EDR440.GetUser(document.all["SsoArtifact"].value, document.all["h_DeptInfo"].value).value;
        var Uservalue = ED4.EDR440.GetUser(document.all["SsoArtifact"].value, document.all["h_DeptInfo"].value).value;
        if (Uservalue.length > 0)
        {
            for (var i = 0; i < Uservalue.length; i++)
            {
                var strUser = Uservalue[i];
                dlUser.options.add(new Option(strUser.split('|')[0], strUser.split('|')[1]));
                document.all.UserList.value += strUser + ";"
            }
        }
    }
}
function dlUserOnChange()
{
    var str = document.all["dlUser"].options[document.all["dlUser"].selectedIndex].value;//使用者點選選單，選到的是哪個index值
    document.all["h_UserInfo"].value = str;//將帳號放入隱藏欄位
}

function fnClearDropDownList(obj)//專用呼叫清空
{
    while (obj.options.length > 0)//當list長度大於0的時候，從第一個刪，刪到沒有為止
        obj.options.remove(0);
}

function OpenEDR440C1(argDocNo)
{
    var strDocNo = "";
    if (argDocNo != null)
        //1060223 Zen 1051175 修正網址參數名稱
        //strDocNo = "&DOC_NO=" + argDocNo;
        strDocNo = "&argDocNo=" + argDocNo;
    var strURL = "EDR440C1.aspx?SAMLart=" + document.all.SsoArtifact.value + strDocNo;
    jf_OpenChildWin(strURL, "EDR440C1", 800, 600);
}

function OpenEDT442(argDocNo)
{
    var strDocNo = "";
    if (argDocNo != null)
        //1060223 Zen 1051175 修正網址參數名稱
        //strDocNo = "&DOC_NO=" + argDocNo;
        strDocNo = "&argDocNo=" + argDocNo;
    var strURL = "EDT442.aspx?SAMLart=" + document.all.SsoArtifact.value + strDocNo;
    jf_OpenChildWin(strURL, "EDR442", 800, 600);
}
