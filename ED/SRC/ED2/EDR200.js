/*
DATE	    SA	    PRG	    MGR_NO	DESC
1051122     Daivd   Zen     1050087 二代公文修改
1060518     Leslie  Zen     1060215 innerText相關修改*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

var IDType_ACCOUNT = 0;
var IDType_UNIT = 1;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1051122 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1051122 Zen 1050087 二代公文修改
var rowNo;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1051122 Zen 1050087 二代公文修改
    $(window).trigger('resize');
    jf_rdchange();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051122 Zen 1050087 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051122 Zen 1050087 二代公文修改
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    Page_BlockSubmit = true;

    if (xObjectName.indexOf("_btSet") != -1)
    {
        //1051122 Zen 1050087 二代公文修改，移至callback執行--begin
        //var rowNo = xObjectName.substring(8, xObjectName.indexOf("_btSet"));
        document.all['H_RowNo'].value = xObjectName.substring(8, xObjectName.indexOf("_btSet"));
        //var lb1 = "dg1__ctl" + rowNo + "_lbUnitorUser";
        //var hCode = "dg1__ctl" + rowNo + "_H_Code";
        //var hType = "dg1__ctl" + rowNo + "_H_Type";
        //var hName = "dg1__ctl" + rowNo + "_H_NAME";
        //1051122 Zen 1050087 二代公文修改，移至callback執行--end
        var strOgNo = document.all["H_OrgNo"].value;
        //1051122 Zen 1050087 二代公文修改，移至callback執行
        //var strRight = document.all["H_Right"].value;
        //1051122 Zen 1050087 二代showModal
        //var ret = jf_ShowOrgDialogForPesonUnitWithOrgNo(strOgNo);
        jf_ShowOrgDialogForPesonUnitWithOrgNo(strOgNo);
        var strUnitCode = document.all["H_UnitCode"].value;

        //1051122 Zen 1050087 二代公文修改，移至callback執行
        ////如果權限範圍為二級單位但所屬的單位為一級單位，則視同權限範圍為一級單位
        //if (strUnitCode.length == 2 && strRight == "3")
        //    strRight = "2";

        //switch (strRight)
        //{
        //    case "1":
        //        if (ret.InfoType == "Unit")
        //            document.all[hType].value = IDType_UNIT;
        //        else if (ret.InfoType == "Account")
        //            document.all[hType].value = IDType_ACCOUNT;
        //        document.all[lb1].innerText = ret.Name;
        //        document.all[hName].innerText = ret.Name;
        //        document.all[hCode].innerText = ret.Code;
        //        break;
        //    case "2":
        //        if (ret.InfoType == "Unit")
        //        {
        //            if (ret.Code.substr(0, 2) != strUnitCode.substr(0, 2))
        //            {
        //                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["權限不足，請重新選擇。"])), "");
        //                break;
        //            }
        //            document.all[hType].value = IDType_UNIT;
        //        }
        //            else if (ret.InfoType == "Account")
        //        {
        //            if (ret.UnitCode.substr(0, 2) != strUnitCode.substr(0, 2))
        //            {
        //                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["權限不足，請重新選擇。"])), "");
        //                break;
        //            }
        //            document.all[hType].value = IDType_ACCOUNT;
        //        }
        //        document.all[lb1].innerText = ret.Name;
        //        document.all[hName].innerText = ret.Name;
        //        document.all[hCode].innerText = ret.Code;
        //        break;
        //    case "3":
        //        if (ret.InfoType == "Unit")
        //        {
        //            if (ret.Code != strUnitCode)
        //            {
        //                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["權限不足，請重新選擇。"])), "");
        //                break;
        //            }
        //            document.all[hType].value = IDType_UNIT;
        //        }
        //            else if (ret.InfoType == "Account")
        //        {
        //            if (ret.UnitCode != strUnitCode)
        //            {
        //                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["權限不足，請重新選擇。"])), "");
        //                break;
        //            }
        //            document.all[hType].value = IDType_ACCOUNT;
        //        }
        //        document.all[lb1].innerText = ret.Name;
        //        document.all[hName].innerText = ret.Name;
        //        document.all[hCode].innerText = ret.Code;
        //        break;
        //    default:
        //        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["權限不足，無法設定承辦單位及承辦人的查詢條件。"])), "");
        //        break;
        //}
    }
    else if (xObjectName.indexOf("_btClean") != -1)
    {
        var rowNo = xObjectName.substring(8, xObjectName.indexOf("_btClean"));
        var lb1 = "dg1__ctl" + rowNo + "_lbUnitorUser";
        var hName = "dg1__ctl" + rowNo + "_H_NAME";
        var hCode = "dg1__ctl" + rowNo + "_H_Code";
        var hType = "dg1__ctl" + rowNo + "_H_Type";
        document.all[hType].value = "";
        //1060518 Zen 1060215 innerText相關修正--begin        //document.all[hCode].innerText = "";
        //document.all[hName].innerText = "";
        //document.all[lb1].innerText = "";
        document.all[hCode].value = "";
        document.all[hName].value = "";
        document.all[lb1].textContent = "";
        //1060518 Zen 1060215 innerText相關修正--end    }
    Page_BlockSubmit = true;
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051122 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
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

    //1051122 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            Page_BlockSubmit = !jf_checkDateData();
            //1051122 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
            Page_BlockSubmit = !(jf_checkDateData() && jf_ConfirmPrint());
            //1051122 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !(jf_checkDateData() && jf_ConfirmPreview());
            //1051122 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
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
    if (argResult.id == wsDuplicateID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
        }
        else
        {
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
    //1051122 Zen 1050087 二代公文修改--begin
    if (argCallerId == "IFC021")
    {
        var strInfoType = $('#lbReturnValue')[0].options[1].value;
        var strName = $('#lbReturnValue')[0].options[2].value;
        var strCode = $('#lbReturnValue')[0].options[0].value;
        var strRtnUnitCode = $('#lbReturnValue')[0].options[8].value;

        rowNo = document.all['H_RowNo'].value;
        var lb1 = "dg1__ctl" + rowNo + "_lbUnitorUser";
        var hCode = "dg1__ctl" + rowNo + "_H_Code";
        var hType = "dg1__ctl" + rowNo + "_H_Type";
        var hName = "dg1__ctl" + rowNo + "_H_NAME";

        var strUnitCode = document.all["H_UnitCode"].value;
        var strRight = document.all["H_Right"].value;
        //如果權限範圍為二級單位但所屬的單位為一級單位，則視同權限範圍為一級單位
        if (strUnitCode.length == 2 && strRight == "3")
            strRight = "2";

        switch (strRight)
        {
            case "1":
                if (strInfoType == "Unit")
                    document.all[hType].value = IDType_UNIT;
                else if (strInfoType == "Account")
                    document.all[hType].value = IDType_ACCOUNT;
                //1060518 Zen 1060215 innerText相關修正--begin                //document.all[lb1].innerText = strName;
                //document.all[hName].innerText = strName;
                //document.all[hCode].innerText = strCode;
                document.all[lb1].textContent = strName;
                document.all[hName].value = strName;
                document.all[hCode].value = strCode;
                //1060518 Zen 1060215 innerText相關修正--end                break;
            case "2":
                if (strInfoType == "Unit")
                {
                    if (strCode.substr(0, 2) != strUnitCode.substr(0, 2))
                    {
                        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["權限不足，請重新選擇。"])), "");
                        break;
                    }
                    document.all[hType].value = IDType_UNIT;
                }
                else if (strInfoType == "Account")
                {
                    if (strRtnUnitCode.substr(0, 2) != strUnitCode.substr(0, 2))
                    {
                        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["權限不足，請重新選擇。"])), "");
                        break;
                    }
                    document.all[hType].value = IDType_ACCOUNT;
                }
                //1060518 Zen 1060215 innerText相關修正--begin                //document.all[lb1].innerText = strName;
                //document.all[hName].innerText = strName;
                //document.all[hCode].innerText = strCode;
                document.all[lb1].textContent = strName;
                document.all[hName].value = strName;
                document.all[hCode].value = strCode;
                //1060518 Zen 1060215 innerText相關修正--end                break;
            case "3":
                if (strInfoType == "Unit")
                {
                    if (strCode != strUnitCode)
                    {
                        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["權限不足，請重新選擇。"])), "");
                        break;
                    }
                    document.all[hType].value = IDType_UNIT;
                }
                else if (strInfoType == "Account")
                {
                    if (strRtnUnitCode != strUnitCode)
                    {
                        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["權限不足，請重新選擇。"])), "");
                        break;
                    }
                    document.all[hType].value = IDType_ACCOUNT;
                }
                //1060518 Zen 1060215 innerText相關修正--begin                //document.all[lb1].innerText = strName;
                //document.all[hName].innerText = strName;
                //document.all[hCode].innerText = strCode;
                document.all[lb1].textContent = strName;
                document.all[hName].value = strName;
                document.all[hCode].value = strCode;
                //1060518 Zen 1060215 innerText相關修正--end                break;
            default:
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["權限不足，無法設定承辦單位及承辦人的查詢條件。"])), "");
                break;
        }
    }
    //1051122 Zen 1050087 二代公文修改--end

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argUserName, argEmpName, argDeptNo, argDeptName)
{
    try
    {
        var DateStart = document.all["H_DateS"].value;
        var DateEnd = document.all["H_DateE"].value;
        //1051123 Zen 1050087 二代公文修改
        //var strUrl = "EDR201.aspx?USERID=" + escape(argUserName) + "&EmpName=" + escape(argEmpName) + "&DeptNO=" + escape(argDeptNo) + "&DeptName=" + escape(argDeptName) + "&DateS=" + escape(DateStart) + "&DateE=" + escape(DateEnd);
        var strUrl = "EDR201.aspx?USERID=" + encodeURI(argUserName) + "&EmpName=" + encodeURI(argEmpName) + "&DeptNO=" + encodeURI(argDeptNo) + "&DeptName=" + encodeURI(argDeptName) + "&DateS=" + encodeURI(DateStart) + "&DateE=" + encodeURI(DateEnd);
        jf_OpenChildWin(strUrl, "EDR201", 700, 500);
    }
    catch (e) { }
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_OnBlur(argtxobj)
{
    if (argtxobj.value == "")
        return;
    switch (argtxobj.id)
    {
        case "txYear":
            document.all["txYear"].value = jf_PADL(argtxobj.value, 3, "0");
            break;
        case "txStartyear":
            document.all["txStartyear"].value = jf_PADL(argtxobj.value, 7, "0");
            break;
        case "txEndyear":
            document.all["txEndyear"].value = jf_PADL(argtxobj.value, 7, "0");
            break;
    }
}


function jf_rdchange()
{

    if (document.all.rd1.checked)
    {
        document.all["txStartyear"].value = "";
        document.all["txEndyear"].value = "";
        document.all["txYear"].className = "InputFieldNumeric";
        document.all["dlTime"].className = "InputFieldText";
        document.all.txStartyear.className = "DisplayOnly";
        document.all.txStartyear.readOnly = "readonly";
        document.all.txEndyear.className = "DisplayOnly";
        document.all.txEndyear.readOnly = "readonly";
        document.all["txYear"].readOnly = "";
        document.all["dlTime"].disabled = false;
    }
    else
    {
        document.all["txYear"].value = "";
        document.all["dlTime"].value = "year";

        document.all.txStartyear.readOnly = "";
        document.all.txEndyear.readOnly = "";

        document.all["txStartyear"].className = "InputFieldNumeric";
        document.all["txEndyear"].className = "InputFieldNumeric";

        document.all["txYear"].className = "DisplayOnly";
        document.all["dlTime"].className = "DisplayOnly";

        document.all["txYear"].readOnly = "readonly";
        document.all["dlTime"].disabled = true;
    }
}

function jf_checkDateData()
{
    if (document.all["rd1"].checked)
    {
        var strYY = document.all["txYear"].value;
        var strSS = document.all["dlTime"].value;
        if (strYY != "")
        {
            if (strYY.length < 3)
            {
                strYY = jf_PADL(strYY, 3, '0');
                document.all["H_DateS"].value = strYY;
                document.all["H_DateE"].value = strYY;
            }
            else
            {
                document.all["H_DateS"].value = strYY;
                document.all["H_DateE"].value = strYY;
            }

        }
        else
        {
            jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請輸入欲查詢之年度。"])), "");
            //1051122 Zen 1050087 二代公文修改
            //document.all["txYear"].focus();
            $('#txYear').focus();
            return false;
        }
        if (strSS != "")
        {
            if (document.all["dlTime"].value == "year")
            {
                document.all["H_DateS"].value += "0101";
                document.all["H_DateE"].value += "1231";
            }
            else if (document.all["dlTime"].value == "first_season")
            {
                document.all["H_DateS"].value += "0101";
                document.all["H_DateE"].value += "0331";
            }
            else if (document.all["dlTime"].value == "second_season")
            {
                document.all["H_DateS"].value += "0401";
                document.all["H_DateE"].value += "0630";
            }
            else if (document.all["dlTime"].value == "third_season")
            {
                document.all["H_DateS"].value += "0701";
                document.all["H_DateE"].value += "0930";
            }
            else if (document.all["dlTime"].value == "fourth_season")
            {
                document.all["H_DateS"].value += "1001";
                document.all["H_DateE"].value += "1231";
            }
            return true;
        }
        else
        {
            jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請輸入欲查詢區間。"])), "");
            //1051122 Zen 1050087 二代公文修改
            //document.all["dlTime"].focus();
            $('#dlTime').focus();
            return false;
        }
    }
    else
    {
        if (document.all["txStartyear"].value == "")
        {
            jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["起始日期格式不正確。"])), "");
            //1051122 Zen 1050087 二代公文修改
            //document.all["txStartyear"].focus();
            $('#txStartyear').focus();
            return false;
        }
        else if (document.all["txEndyear"].value == "")
        {
            jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["結束日期格式不正確。"])), "");
            //1051122 Zen 1050087 二代公文修改
            //document.all["txEndyear"].focus();
            $('#txEndyear').focus();
            return false;
        }
        else
        {
            if (CheckCDATE("txStartyear", "起始日期格式不正確") && CheckCDATE("txEndyear", "結束日期格式不正確"))
            {
                document.all["H_DateS"].value = document.all["txStartyear"].value;
                document.all["H_DateE"].value = document.all["txEndyear"].value;
                return true;
            }
        }
    }
}