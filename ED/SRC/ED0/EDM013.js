/*
/* DATE		SA		PRG		MGR_NO		DESC
  1120517	David	Cloud	1111142		新增本程式
  1130219	David	Cloud	1130072		修改增加紀錄使用單位及差假日期增加時分
  1130307	Zen		Zen		1111142		修正日期輸入不完整衍生之開啟後錯誤
  1130521	David   Cloud   1130074     補上長官姓名
  1130530	Zen		Zen		1111142		修正新增類型後錯誤
 */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1130219	Cloud	1130074	增加使用單位資訊；差假增加時分
//var strTableFields = new Array("_txSingName", "_txReplaceSmtp", "_txPageName", "_txW", "_txH", "_tbDATES", "_tbDATEE");
//var strTableFieldsdg3 = new Array("_txFullName", "_txOrgNo", "_txOrgAddress", "_txDeptName", "_txEmpName", "_txTelNo", "_txExt", "_txEmail", "_txSign", "_txSmtp");
//1130521	David   Cloud   1130074     補上長官姓名
//var strTableFields = new Array("_txSingName", "_txReplaceSmtp", "_txPageName", "_txW", "_txH", "_tbDATES", "_tbDATEE", "_txDeptID", "_dlHours", "_dlMins", "_dlHoure","_dlMine");
var strTableFields = new Array("_txSingName", "_txSirName", "_txReplaceSmtp", "_txPageName", "_txW", "_txH", "_tbDATES", "_tbDATEE", "_txDeptID", "_dlHours", "_dlMins", "_dlHoure", "_dlMine");
var strTableFieldsdg3 = new Array("_txFullName", "_txOrgNo", "_txOrgAddress", "_txDeptName", "_txEmpName", "_txTelNo", "_txExt", "_txEmail", "_txSign", "_txSmtp", "_txDeptID");
var strTableFieldsdg4 = new Array("_txValues", "_txText");


/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    SetRadioButton();
    ShowWorkDiv();
    ShowNomailList();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }
    var ActiveDg = xObjectName.split('_')[0];
    var ActiveTableFields = strTableFields;
    if (ActiveDg == "dg3")
        ActiveTableFields = strTableFieldsdg3;
    if (ActiveDg == "dg4")
        ActiveTableFields = strTableFieldsdg4;
    switch (xObjectName.split('_')[1])
    {

        case "btUp":
            Page_BlockSubmit = true;
            jf_RowUp(ActiveDg, "_cbSelect", ActiveTableFields);
            break;
        case "btDown":
            Page_BlockSubmit = true;
            jf_RowDown(ActiveDg, "_cbSelect", ActiveTableFields);
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
            jf_SelectInverse(ActiveDg, "_cbSelect");
            break;
        case "btSelectClear":
            Page_BlockSubmit = true;
            jf_ClearDg(ActiveDg, "_cbSelect", ActiveTableFields);
            break;
        case "btGridNum":
            Page_BlockSubmit = false;
            document.all["txActiveDg"].value = ActiveDg;
            document.all["rbSingName"].disabled = false;
            document.all["rbIssueOrg"].disabled = false;
            document.all["rbNomal"].disabled = false;
            jf_ToolBarSubmit(xObjectName);
            break;
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
        case "btOpen":
            Page_BlockSubmit = false;
            if (document.all["rbNomal"].checked)
            {
                if (document.all["dlNormalTypeList"].options[document.all["dlNormalTypeList"].selectedIndex].value == "")
                {
                    alert("請選擇一般類型名稱或點擊新增。");
                    Page_BlockSubmit = true;
                    return;
                }
            }
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_CheckBlankAndAlert())
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
                document.all["rbSingName"].disabled = false;
                document.all["rbIssueOrg"].disabled = false;
                document.all["rbNomal"].disabled = false;
            }
            else
                Page_BlockSubmit = true;

            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            document.all["rbSingName"].disabled = false;
            document.all["rbIssueOrg"].disabled = false;
            document.all["rbNomal"].disabled = false;
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
    var InValidName = "";
    var InValidControlName = "";

    /*for (var i = 2; i <= document.all.dg1.rows.length; i++) {
        if (document.all["dg1__ctl" + i + "_txASSIGN_ORG_NO"].value != "") {
            if (document.all["dg1__ctl" + i + "_txASSIGN_ORG_NAME"].value == "") {
                InValidName += "序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中，機關代碼有值，機關名稱不可空白";
                InValidControlName = "dg1__ctl" + i + "_txASSIGN_ORG_NAME";
                break;
            }
        }
        else if (document.all["dg1__ctl" + i + "_txASSIGN_ORG_NAME"].value !== "") {
            InValidName += "序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中，機關名稱有值，機關代碼不可空白";
            InValidControlName = "dg1__ctl" + i + "_txASSIGN_ORG_NO";
            break;
        }
    }

    if (InValidName != "") {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([InValidName])), "");
        $('#' + InValidControlName).focus();
        return false;
    }
    else if (!jf_CheckDataGridDuplicate("dg1", "txASSIGN_ORG_NO", "機關代碼", false)) {
        return false;
    }*/
    //1130220 Cloud 1130074 增加時分補上大小檢核 
    var strErrMsg = "";
    if (document.all["rbSingName"].checked == true)
    {
        var startDate = "";
        var endDate = "";
        for (var i = 2; i <= document.all.dg1.rows.length; i++)
        {
            if (document.all["dg1__ctl" + i + "_txSingName"].value != "")
            {
                startDate = document.all["dg1__ctl" + i + "_tbDATES"].value + document.all["dg1__ctl" + i + "_dlHours"].value + document.all["dg1__ctl" + i + "_dlMins"].value;
                endDate = document.all["dg1__ctl" + i + "_tbDATEE"].value + document.all["dg1__ctl" + i + "_dlHoure"].value + document.all["dg1__ctl" + i + "_dlMine"].value;;

                if (startDate != "0000" && endDate != "0000" && endDate <= startDate)
                {
                    if (strErrMsg != "")
                        strErrMsg += "\n";
                    strErrMsg += "[署名1]" + "序號[" + (i - 1) + "]差假日期起迄錯誤";
                }
            }
        }
        for (var i = 2; i <= document.all.dg2.rows.length; i++)
        {
            if (document.all["dg2__ctl" + i + "_txSingName"].value != "")
            {
                startDate = document.all["dg2__ctl" + i + "_tbDATES"].value + document.all["dg2__ctl" + i + "_dlHours"].value + document.all["dg2__ctl" + i + "_dlMins"].value;
                endDate = document.all["dg2__ctl" + i + "_tbDATEE"].value + document.all["dg2__ctl" + i + "_dlHoure"].value + document.all["dg2__ctl" + i + "_dlMine"].value;;
                if (startDate != "0000" && endDate != "0000" && endDate <= startDate)
                {
                    if (strErrMsg != "")
                        strErrMsg += "\n";
                    strErrMsg += "[署名2]" + "序號[" + (i - 1) + "]差假日期起迄錯誤";
                }
            }
        }
    }
    if (strErrMsg != "")
    {
        alert(strErrMsg);
        return false;
    }
    else
        return true;
}


function ShowWorkDiv()
{
    if (jf_GetActionMode() == 0)//0:新增模式 1:修改模式
    {
        document.all["SingDiv"].className = "hide";
        document.all["IssueOrgDiv"].className = "hide";
        document.all["NormalDiv"].className = "hide";

    }
    else
    {
        if (document.all["rbSingName"].checked)
        {
            document.all["SingDiv"].className = "DivTable";
            document.all["IssueOrgDiv"].className = "hide";
            document.all["NormalDiv"].className = "hide";
        }
        else if (document.all["rbIssueOrg"].checked)
        {
            document.all["SingDiv"].className = "hide";
            document.all["IssueOrgDiv"].className = "DivTable";
            document.all["NormalDiv"].className = "hide";
        }
        else
        {
            document.all["SingDiv"].className = "hide";
            document.all["IssueOrgDiv"].className = "hide";
            document.all["NormalDiv"].className = "DivTable";
        }
    }
}

function NormalAdd()
{
    var nickname = prompt("請輸入新增類型名稱", "新增類型名稱");
    //將資訊放入選單並進行開啟
    //檢核是否在選單裡如是，則請使用者開啟維護
    //1130530 Zen 1111142 修正新增類型後錯誤
    //for (var iop = 0; iop < document.all["dlNormalTypeList"].options.length; iop)
    for (var iop = 0; iop < document.all["dlNormalTypeList"].options.length; iop++)
    {
        if (nickname == document.all["dlNormalTypeList"].options[iop].text)
        {
            document.all["dlNormalTypeList"].selectedIndex = iop;
            alert('該類別已存在，請以開啟方式進行維護。')
            break;
        }
    }
    document.all["txADDnewOption"].value = nickname;
    Page_BlockSubmit = false;
    jf_ToolBarSubmit("btOpen");

}
function ShowNomailList()
{
    if (document.all["rbNomal"].checked)
    {
        document.all["dlNormalTypeListDiv"].className = "dTR";
    }
    else
    {
        document.all["dlNormalTypeListDiv"].className = "hide";
    }
}
function SetRadioButton()
{
    if (jf_GetActionMode() == 0)//0:新增模式 1:修改模式
    {
        document.all["rbSingName"].disabled = false;
        document.all["rbIssueOrg"].disabled = false;
        document.all["rbNomal"].disabled = false;
        document.all["btNormalAdd"].disabled = false;

    }
    else
    {
        document.all["rbSingName"].disabled = true;
        document.all["rbIssueOrg"].disabled = true;
        document.all["rbNomal"].disabled = true;
        document.all["btNormalAdd"].disabled = true;
    }
}
function jf_ClearDg(argTableName, argCheckBoxName, argTableFields)
{
    if (document.all[argTableName] == null)
        return;

    var strTemp = new Array();
    var nChecked = 0;
    var nCount = 0;

    var len = document.all[argTableName].rows.length + 1;
    for (i = 2; i < len; i++)
    {
        var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
        if (obj.checked)
        {
            var len2 = argTableFields.length;
            for (j = 0; j < len2; j++)
            {
                var tmpObj = document.all[argTableName + "__ctl" + i + argTableFields[j]];
                if (tmpObj.type == "text") //TextBox
                {
                    tmpObj.value = "";
                }
                /*else if (tmpObj.type == "textarea") //TextArea
                {
                    strTemp[j] = tmpObj.value;
                }
                else if (tmpObj.nodeName == "SPAN") //Label
                {
                    strTemp[j] = tmpObj.innerText;
                }
                else if (tmpObj.nodeName == "SELECT") //DropdownList
                {
                    strTemp[j] = tmpObj.selectedIndex;
                }
                else if (tmpObj.type == "checkbox") //CheckBox 0960604 Leo
                {
                    strTemp[j] = tmpObj.checked;
                }*/
                //1130219	Cloud	1130072	增加 時分選單
                else if (tmpObj.nodeName == "SELECT") //DropdownList
                {
                    strTemp[j] = tmpObj.selectedIndex;
                }

            }
            obj.checked = false;
        }
    }
}

//1130307 Zen 1111142 修正日期輸入不完整衍生之開啟後錯誤
function CheckDate(argObj, argMsg, argFromTbtool, argLength)
{
    var strErrMsg = '';
    var strDate = $('#' + argObj).val();
    if (strDate != '')
    {
        if (strDate.length < argLength) 
        {
            strDate = jf_PADL(strDate, argLength, '0');//YYYMMDD
            $('#' + argObj).val(strDate);
        }

        if (!jf_CheckCDATE(strDate)) 
        {
            strErrMsg += FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argMsg])) + '\n';
            if (argFromTbtool == false)
                jf_ShowMsg(strErrMsg, '');
        }
    }
    return strErrMsg;
}