/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 106.03.31    Zen     1050087 二代公文修改
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060331 Zen 1050087 二代公文修改//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1060331 Zen 1050087 二代公文修改//if (document.all["ValidationSummary1"].innerText != "")
//    alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

//1060331 Zen 1050087 二代公文修改//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060331 Zen 1050087 二代公文修改    //var xObjectName = document.activeElement.id;
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
        case "btHelp":
            var strUrl = "";
            strUrl = "AKT410C1.aspx?rtnObj=lbReturnValue";
            //1060331 Zen 1050087 二代公文修改            //jf_OpenChildWin(strUrl, "AKT410C1", 740, 500);
            jf_OpenChildWin(strUrl, "AKT410C1", 800, 600);
            Page_BlockSubmit = true;
            break;
    }
}

//1060331 Zen 1050087 二代公文修改//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
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

    //1060331 Zen 1050087 二代公文修改    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    if (document.all['dlName'].selectedIndex == -1)
        document.all['txHiddenField'].value = "";
    else
        document.all['txHiddenField'].value = document.all['dlName'].value;

    switch (xObjectName)
    {
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean();
            document.all["txDesc"].value = "";
            //1060331 Zen 1050087 二代公文修改            //document.all["txPlanNo"].focus();
            $('#txPlanNo').focus();
            break;
        case "btPrint":
            if (PlanNoUnAllowEmpty())
                Page_BlockSubmit = !jf_ConfirmPrint();
            else
                Page_BlockSubmit = true;
            //1060331 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            if (PlanNoUnAllowEmpty())
                Page_BlockSubmit = !jf_ConfirmPreview();
            else
                Page_BlockSubmit = true;
            //1060331 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId)
{
    if (argCallerId == "AKT410C1")
    {
        //帶出清理計畫
        document.all["txPlanNo"].value = document.all.lbReturnValue.options[0].text;
        //帶出計畫說明
        GetPlanDesc();
    }
}

function ClientOnLoad()
{
    //1060331 Zen 1050087 二代公文修改    //jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, null);
}

function OnWSResult(argResult)
{
    if (argResult.id == wsGetPlanDescID)
    {
        if (!argResult.value.ErrorClass.IsErr)
            document.all["txDesc"].value = argResult.value.RtnField0[0];
        else
        {
            strErrMsg = "無此計畫批號";
            //1060331 Zen 1050087 二代公文修改            //document.all["txPlanNo"].focus();
            $('#txPlanNo').focus();
            document.all["txDesc"].value = "";
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
        }
    }
}

//1060331 Zen 1050087 二代公文修改//function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
//{

//    var index = document.all[argDDLId].selectedIndex;
//    var obj = document.all[argDDLId].options[index];

//    document.all[argTextBoxId].value = obj.text;
//    document.all[argLabelId].innerText = obj.value;
//}
function ReturnValue()
{
    //opener.document.all.lbReturnValue.length = 1;
    //opener.document.all.lbReturnValue.options[0].text = "1";
    //opener.document.all.lbReturnValue.options[0].value = "1";
    //opener.window.CallBack("SYM020C1");
    //close();
}

var wsGetPlanDescID;
function GetPlanDesc()
{
    var arKeyName = new Array(1);
    var arKeyValue = new Array(1);
    var arRtnFldName = new Array(1);
    var arOrdFldName = new Array(1);

    if (!IsServerHandling)
    {
        if (document.all["txPlanNo"].value != "")
        {
            Page_BlockSubmit = true;

            arKeyName[0] = "PLAN_NO";
            arKeyValue[0] = document.all["txPlanNo"].value;
            arRtnFldName[0] = "PLAN_DESC";
            arOrdFldName[0] = "PLAN_NO";

            var arWSParam = new Array(5);
            arWSParam[0] = "PLAN_MAIN";
            arWSParam[1] = arKeyName;
            arWSParam[2] = arKeyValue;
            arWSParam[3] = arRtnFldName;
            arWSParam[4] = arOrdFldName;
            callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, arWSParam);
            wsGetPlanDescID = callObj.id;
            OnWSResult(callObj);
        }
        else
            document.all["txDesc"].value = "";
    }
}

function PlanNoUnAllowEmpty()
{
    var bRtnBool = true;
    var strPlanNo;

    strPlanNo = jf_Trim(document.all["txPlanNo"].value);
    if (strPlanNo == "")
    {
        bRtnBool = false;
        //1060331 Zen 1050087 二代公文修改        //document.all["txPlanNo"].focus();
        $('#txPlanNo').focus();
        jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["清理計畫"])), "");
    }

    return bRtnBool;
}
