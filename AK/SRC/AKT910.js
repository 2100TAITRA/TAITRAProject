
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1070926 Zen 1050087 二代升級//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

function ShowMsg()
{
    //1070926 Zen 1050087 二代升級    //if (document.all["ValidationSummary1"].innerText != "")
    //    alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
}

//1070926 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1070926 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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
        //1070926 Zen 1050087 二代升級        //case "btBackGround":
        //    var strUrl = "AKT900C1.htm";
        //    jf_ShowModal(strUrl, 760, 550);
        //    Page_BlockSubmit = true;
        //    break;
        //case "btDesc":
        //    var strUrl = "AKT900C2.htm";
        //    jf_ShowModal(strUrl, 760, 550);
        //    Page_BlockSubmit = true;
        //    break;
    }
}

//1070926 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1070926 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    var xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            if (jf_CheckKeyObject())
                SetCanSubmit();
            else
                SetCanNotSubmit();
            //1070926 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1070926 Zen 1050087 二代升級        //case "btSave":
        //    if (ConfirmSave())//是否通過儲存前必要檢查
        //        SetCanSubmit();
        //    else
        //        SetCanNotSubmit();
        //    jf_ToolBarSubmit();
        //    break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1070926 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            if (jf_ConfirmCancel())
                SetCanSubmit();
            else
                SetCanNotSubmit();
            //1070926 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1070926 Zen 1050087 二代升級        //case "btClean":
        //    Page_BlockSubmit = true;
        //    jf_ConfirmClean();
        //    document.all["txRptNo"].focus();
        //    break;
        //case "btSearch":
        //    var strUrl = "AKT900C3.aspx?rtnObj=lbReturnValue";
        //    jf_OpenChildWin(strUrl, "AKT900C3", 660, 400);
        //    break;
        //case "btPrint":
        //    if (CheckBeforPrint())
        //    {
        //        if (jf_ConfirmPrint())
        //            SetCanSubmit();
        //        else
        //            SetCanNotSubmit();
        //    }
        //    else
        //        SetCanNotSubmit();
        //    jf_ToolBarSubmit();
        //    break;
        //case "btPreview":
        //    if (CheckBeforPrint())
        //    {
        //        if (jf_ConfirmPrint())
        //            SetCanSubmit();
        //        else
        //            SetCanNotSubmit();
        //    }
        //    else
        //        SetCanNotSubmit();
        //    jf_ToolBarSubmit();
        //    break;
    }
}

function CallBack(argCallerId)
{
    if (argCallerId == "AKT900C3")
    {
        document.all["txRptNo"].value = document.all["lbReturnValue"].options[0].text;
        jf_OpenButtonSubmit();
    }
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
    ShowMsg();
    //1070926 Zen 1050087 二代升級    //jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
}

function OnWSResult(argResult)
{
}

//1070926 Zen 1050087 二代升級//function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
//{
//    var index = document.all[argDDLId].selectedIndex;
//    var obj = document.all[argDDLId].options[index];

//    document.all[argTextBoxId].value = obj.text;
//    document.all[argLabelId].innerText = obj.value;
//}

//############################################################################################
//							ToolBar Click function
//############################################################################################
//儲存前檢查
function ConfirmSave()
{
    var bRtnbool = false;
    if (CheckBeforSave())
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

//儲存前key值外之欄位檢查
function CheckBeforSave()
{
    var bRtnbool = true;
    return bRtnbool;
}

//預覽/列印前欄位檢查
function CheckBeforPrint()
{
    var bRtnbool = true;
    return bRtnbool;
}
//############################################################################################
//							其		他		function
//############################################################################################
function SetCanSubmit()
{
    IsServerHandling = true;
    jf_ShowWaitState();
    Page_BlockSubmit = false;
}

function SetCanNotSubmit()
{
    Page_BlockSubmit = true;
}

//取消TextBox中enter的功能
function fnHandleTextarea()
{
    if (event.keyCode == 13)
        event.cancelBubble = true;
}