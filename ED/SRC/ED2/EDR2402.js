/*
DATE 	SA		PRG		MGR_NO	DESC
1070322 Kevin   Zen     1061343 以ODR240修改，新增EDR2402 會辦公文明細表
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

function ClientButtonControl(e)
{
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case "btSDate":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txSDate, event.screenX, event.screenY);
            break;
        case "btEDate":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txEDate, event.screenX, event.screenY);
            break;
    }
}

function jf_ToolBarHandle(e)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            if (document.all.dg1)
            {
                document.all.dg1.outerHTML = "";
            }
            Page_BlockSubmit = !CheckCondition();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
        case "btPreview":
        case "btExcel":
            if (document.all.dg1)
            {
                document.all.dg1.outerHTML = "";
            }
            Page_BlockSubmit = !CheckCondition();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function ClientOnLoad()
{
    //初始時先儲存下拉式選單的Text、Value、所有選項Value
    document.all["H_Dept"].value = document.all["dlDept_Text"].value;
    document.all["H_Sect"].value = document.all["dlSect_Text"].value;
    document.all["H_User"].value = document.all["dlUser_Text"].value;
    document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
    document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
    document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
    document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
    document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);

    //無值不顯示
    jf_HandleComboxStatus("dlSect");
}

function CheckCondition()
{
    var strDept = jf_Trim(document.all["dlDept_Text"].value);
    var strUser = jf_Trim(document.all["dlUser_Text"].value);
    var strSDate = jf_Trim(document.all["txSDate"].value);
    var strEDate = jf_Trim(document.all["txEDate"].value);
    if (strDept + strUser + strSDate + strEDate == "")
    {
        document.all["dlDept_Text"].focus();
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請至少輸入一個條件"])), "");
        return false;
    }

    var strCoWorkDayS = document.all['txCoWorkDayS'].value;
    var strCoWorkDayE = document.all['txCoWorkDayE'].value;

    if (strCoWorkDayS == '' && strCoWorkDayE != '')
        document.all['txCoWorkDayS'].value = strCoWorkDayE
    else if (strCoWorkDayS != '' && strCoWorkDayE == '')
        document.all['txCoWorkDayE'].value = strCoWorkDayS
    else if (Number(strCoWorkDayS) > Number(strCoWorkDayE))
    {
        document.all['txCoWorkDayS'].value = strCoWorkDayE
        document.all['txCoWorkDayE'].value = strCoWorkDayS
    }

    //下拉式選單檢查
    if (!jf_CheckBeforeSearch())
        return false;

    return true;
}

function DocFlowInfo(argDocNo)
{
    var strPage = document.all["H_Url"].value;
    var strWidth = document.all["H_Width"].value;
    var strHeight = document.all["H_Height"].value;
    var strDocNo = argDocNo;
    var strArtifact = document.all["H_Artifact"].value;

    if (document.all.H_SourceOrgNo != null)
        var strSource = "&SOURCE_ORGNO=" + document.all.H_SourceOrgNo.value;
    else
        var strSource = "";

    var strUrl = strPage + "?pDocNo=" + strDocNo + "&SAMLart=" + strArtifact + strSource;
    jf_OpenChildWin(strUrl, "FlowPage", strWidth, strHeight);
}

//下拉選單onblur時的檢查
function dlDept_Text_onblur()
{
    var bCheckOK = true;
    if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
    {
        //呼叫OD_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
        if (edjf_ComboBoxCheck("dlDept", "承辦單位"))
        {
            //存ComboBox_Text的value
            document.all["H_Dept"].value = document.all["dlDept_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);

            var bSubTree = true;
            if (document.all["H_OD_FLOW_TYPE"].value == "2")
                bSubTree = false;

            //初始dlSect、dlUser的處理
            edjf_SetdlDept("dlDept", "dlSect", "dlUser", "", bSubTree, true);

            document.all["H_Sect"].value = document.all["dlSect_Text"].value;
            document.all["H_User"].value = document.all["dlUser_Text"].value;
            document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
            document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
            //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
            document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
            document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);

            //依選項多寡固定下拉式選單可見長度
            if (document.all["dlSect"].options.length > 10)
                document.all["dlSect"].size = 10;
            else if (document.all["dlSect"].options.length == 1)
                document.all["dlSect"].size = 2;
            else
                document.all["dlSect"].size = document.all["dlSect"].options.length;

            if (document.all["dlUser"].options.length > 10)
                document.all["dlUser"].size = 10;
            else if (document.all["dlUser"].options.length == 1)
                document.all["dlUser"].size = 2;
            else
                document.all["dlUser"].size = document.all["dlUser"].options.length;

            //無值不顯示
            jf_HandleComboxStatus("dlSect");
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}

function dlSect_Text_onblur()
{
    var bCheckOK = true;
    //值若變更時作處理
    if (document.all["dlSect_Text"].value != document.all["H_Sect"].value)
    {
        //呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
        if (edjf_ComboBoxCheck("dlSect", "承辦科別"))
        {
            //存ComboBox_Text的value
            document.all["H_Sect"].value = document.all["dlSect_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);

            edjf_SetdlSect("dlDept", "dlSect", "dlUser", "", false, true);

            document.all["H_User"].value = document.all["dlUser_Text"].value;
            document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
            document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);

            if (document.all["dlUser"].options.length > 10)
                document.all["dlUser"].size = 10;
            else if (document.all["dlUser"].options.length == 1)
                document.all["dlUser"].size = 2;
            else
                document.all["dlUser"].size = document.all["dlUser"].options.length;
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}

function dlUser_Text_onblur()
{
    var bCheckOK = true;
    //值若變更時作處理
    if (document.all["dlUser_Text"].value != document.all["H_User"].value)
    {
        //呼叫ED_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
        if (edjf_ComboBoxCheck("dlUser", "承辦人"))
        {
            document.all["H_User"].value = document.all["dlUser_Text"].value;

            document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}

//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
    if (document.all[argComboxID].options.length <= 1)
        document.all[argComboxID + "_Container"].className = "hide";
    else
        document.all[argComboxID + "_Container"].className = "custom-combobox";
}

//查詢前檢查
function jf_CheckBeforeSearch()
{
    if (!dlDept_Text_onblur(true))
        return false;

    if (!dlSect_Text_onblur(true))
        return false;

    if (!dlUser_Text_onblur(true))
        return false;

    return true;
}

/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/

//紀錄是否已檢核過有註冊onblur事件的欄位的值(通常發生在輸入完後直接按下儲存件時)
var bHasCheck = false;

//檢查日期格式
function CheckCDATE(argObj, strMsg)
{
    if (bHasCheck)
    {
        bHasCheck = false;
        return;
    }
    bHasCheck = true;
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
            document.all[argObj].focus();
            if (strMsg)
                jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            bHasCheck = false;
            return false;
        }
    }
    bHasCheck = false;
    return true;
}
