/*
DATE 	    SA		PRG		MGR_NO		DESC
1050520     David   Zen     1050087     二代公文修改
1060518     Leslie  Zen     1060215     innerText相關修改*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050607 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050607 Zen 1050087 二代公文修改--begin
    //if (document.all["ValidationSummary1"].innerText != "")
    //    alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
    //1050607 Zen 1050087 二代公文修改--end
}

//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
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
        /*
		case "":
			break;
		*/
    }
}
//1050607 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
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

    //1050607 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1050607 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (ConfirmSave())//是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1050607 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1050607 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean();
            document.all["dlColumn"].selectedIndex = 0;
            //1050607 Zen 1050087 二代公文修改
            //document.all["dlColumn"].focus();
            $('$dlColumn').focus();
            break;
    }
}

function CallBack(argCallerId)
{
}

function ClientOnLoad()
{
    //1050607 Zen 1050087 二代公文修改
    //jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
    //jf_CallWS("AKT116WS.asmx","BubbleFun"  ,false,  null);
}

function OnWSResult(argResult)
{
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}

//儲存前檢查
function ConfirmSave()
{
    var bRtnbool = false;
    if (jf_CheckKeyObject())//檢查key值是否輸入
    {
        if (CheckBeforSave())
        {
            // 新增模式需檢查鍵值是否已存在
            if (jf_GetActionMode() == LayoutModeNew)
            {
                if (CheckDataExist(document.all["H_OrgNo"].value))//檢查鍵值是否已存在
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
    }
    return bRtnbool;
}

//儲存前key值外之欄位檢查
function CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (document.all["txColumnName"].value == "")
    {
        strErrMsg += "欄位名稱不可空白";
        //1050607 Zen 1050087 二代公文修改
        //document.all["txColumnName"].focus();
        $('#txColumnName').focus();
    }

    if (!jf_CheckBlankAndAlert())
        bRtnbool = false;
    if (!CheckDuplicate() || !bRtnbool)
        bRtnbool = false;

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    return bRtnbool;
}

function CheckDataExist(argOrgNo)
{
    var arrValue = new Array(KeyObjectArr.length);
    var arrFieldName = new Array(KeyObjectArr.length);

    for (var i = 0; i < KeyObjectArr.length; i++)
    {
        var index = document.all[KeyObjectArr[i]].selectedIndex;
        arrValue[i] = document.all[KeyObjectArr[i]].options[index].value;
        arrFieldName[i] = FieldNameArr[i];
    }

    if (argOrgNo != "")
    {
        arrFieldName[arrFieldName.length] = "SOURCE_ORGNO"
        arrValue[arrValue.length] = argOrgNo;
    }
    var arWSParam = new Array(3);

    arWSParam[0] = document.all["KeyTableName"].value;//"EMPLOYEE";
    arWSParam[1] = arrFieldName;
    arWSParam[2] = arrValue;

    callObj = jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, arWSParam);

    if (jf_IsWebServiceSuccess(callObj))
    {
        if (callObj.value.RtnBool == true)
            return true;

        return false;
    }
    else
        return false;
}

function jf_CheckBlankAndAlert()
{
    var strErrMsg = "";
    for (var iRow = 2; iRow <= document.all.dg1.rows.length; iRow++)
    {
        if (document.all["dg1__ctl" + iRow + "_cbSelect"].checked == false)
            continue;
        var index = document.all["dg1__ctl" + iRow + "_dlPostType"].selectedIndex;
        if (index == 0)
        {
            strErrMsg = "勾選時，郵寄方式不可空白";
            //1050607 Zen 1050087 二代公文修改
            //document.all["dg1__ctl" + iRow + "_cbSelect"].focus();
            $('#dg1__ctl' + iRow + "_cbSelect").focus();
        }
    }
    if (strErrMsg != "")
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
        return false;
    }
    return true;
}

function CheckDuplicate()
{
    var strErrMsg = "";
    for (var iRow = 2; iRow <= document.all.dg1.rows.length; iRow++)
    {
        if (document.all["dg1__ctl" + iRow + "_cbSelect"].checked == false)
            continue;
        var index1 = document.all["dg1__ctl" + iRow + "_dlPostType"].selectedIndex;
        for (var iCol = iRow + 1; iCol <= document.all.dg1.rows.length; iCol++)
        {
            if (document.all["dg1__ctl" + iCol + "_cbSelect"].checked == false)
                continue;
            var index2 = document.all["dg1__ctl" + iCol + "_dlPostType"].selectedIndex;
            if (index1 == index2)
            {
                strErrMsg = "郵寄方式不可重複";
                //1050607 Zen 1050087 二代公文修改
                //document.all["dg1__ctl" + iCol + "_cbSelect"].focus();
                $('#dg1__ctl' + iCol + "_cbSelect").focus();
                break;
            }
        }
        if (strErrMsg != "") break;
    }

    if (strErrMsg != "")
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
        return false;
    }
    return true;
}