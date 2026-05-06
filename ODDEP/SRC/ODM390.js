/*
DATE 	    SA		PRG		MGR_NO		DESC
1050411     David   Zen     1050087     二代公文修改
1060518     Leslie  Zen     1060215     innerText相關修改*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050411 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//if (document.all["ValidationSummary1"].innerText != "")
//	alert(document.all["ValidationSummary1"].innerText);
jf_ShowValidator();

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
//1050411 Zen 1050087 二代公文修改
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
    //1050411 Zen 1050087 二代公文修改
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1050411 Zen 1050087 二代公文修改
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
            //1050411 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1050411 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1050411 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean();
            //1050602 Zen 1050087 二代公文修改
            //document.all["txBulkNo"].focus();
            $('#txBulkNo').focus();
            break;
        case "btSearch":
            //1050411 Zen 1050087 二代公文修改
            Page_BlockSubmit = true;
            var strUrl = "";
            var strBulkNo = document.all["txBulkNo"].value;
            strUrl = "ODC390.aspx?rtnObj=lbReturnValue&argBulkNo=" + strBulkNo;
            jf_OpenChildWin(strUrl, "ODC390", 800, 600);
            break;
    }
}

function CallBack(argCallerId)
{
    if (argCallerId == "ODC390")
    {
        document.all["txBulkNo"].value = document.all.lbReturnValue.options[0].text;
        jf_OpenButtonSubmit();
    }
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
    //1050411 Zen 1050087 二代公文修改
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
                if (jf_CheckDataExist())//檢查鍵值是否已存在
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

    if (document.all["txBulkName"].value == "")
    {
        strErrMsg = "大宗掛號單名稱不可空白";
        //1050602 Zen 1050087 二代公文修改
        //document.all["txBulkName"].focus();
        $('#txBulkName').focus();
    }

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    return bRtnbool;
}