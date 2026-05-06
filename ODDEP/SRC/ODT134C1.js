var IsServerHandling = new Boolean();
IsServerHandling = false;;

document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

jf_ShowValidator();

function ClientOnLoad()
{
    document.all["H_Dept"].value = document.all["dlDept_Text"].value;
    document.all["H_Sect"].value = document.all["dlSect_Text"].value;
    document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
    document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
    document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSect"]);

    ////無值不顯示
    jf_HandleComboxStatus("dlSect");
}

function ClientButtonControl(e)
{
    if (IsServerHandling)
    {
        return;
    }

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            Page_BlockSubmit = !CheckBeforSearch();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function jf_ToolBarHandle(e)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
    {
        return;
    }

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean();
            if (document.all['dg1'])
                document.all['dg1'].className = 'hide';
            break;
        case "btSendMail":
            Page_BlockSubmit = !CheckBeforSendMail();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CheckBeforSearch()
{
    var bRtn = true;
    var strEmpName = document.all["txEmpName"].value;
    var strdlDept = document.all["dlDept"].value;
    if (strEmpName == "" && strdlDept == "")
    {
        bRtn = false;
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["姓名和承辦單位不可皆為空。"])), "");
        $('#txEmpName').focus();
    }
    return bRtn;
}

function CheckBeforSendMail()
{
    var bRtn = true;
    var strEmail = document.all["txEmail"].value;

    if (strEmail == '')
    {
        bRtn = false;
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["Email欄位不可為空。"])), "");
        $('#txEmail').focus();
    }

    var Regex = new RegExp("^([\\w-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([\\w-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$", 'g');
    if (strEmail != '' && Regex.test(strEmail) == false)
    {
        bRtn = false;
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["Email格式錯誤，請重新輸入"])), "");
        $('#txEmail').focus();
    }

    return bRtn;
}


/*******************************************************************************************
				其		他		共		用		function
********************************************************************************************/
function dlDept_Text_onblur()
{
    var bCheckOK = true;
    if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
    {
        //呼叫OD_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
        if (odjf_ComboBoxCheck("dlDept", "承辦單位"))
        {
            //存ComboBox_Text的value
            document.all["H_Dept"].value = document.all["dlDept_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Dept_Value"].value = odjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);

            var bSubTree = true;
            if (document.all["H_OD_FLOW_TYPE"].value == "2")
                bSubTree = false;

            odjf_SetdlDept("dlDept", "dlSect", null, "", bSubTree, true);	//初始dlSect

            document.all["H_Sect"].value = document.all["dlSect_Text"].value;
            document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
            //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect的處理
            document.all["H_dlSect_Value"].value = odjf_SaveCurrDL(document.all["dlSect"]);

            //依選項多寡固定下拉式選單可見長度
            if (document.all["dlSect"].options.length > 10)
                document.all["dlSect"].size = 10;
            else if (document.all["dlSect"].options.length == 1)
                document.all["dlSect"].size = 2;
            else
                document.all["dlSect"].size = document.all["dlSect"].options.length;

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
        if (odjf_ComboBoxCheck("dlSect", "承辦科別"))
        {
            //存ComboBox_Text的value
            document.all["H_Sect"].value = document.all["dlSect_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Sect_Value"].value = odjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);

            odjf_SetdlSect("dlDept", "dlSect", null, "", false, true);
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
        $('#' + argComboxID).combobox('hide');
    else
        $('#' + argComboxID).combobox('show');
}

function SetEmail(argEmail)
{
    document.all['txEmail'].value = argEmail;
}