/*	
DATE	    SA		PRG		MSG_NO			DESC
0970305     Stella  Matte   0970150         支援二級單位
1050411     David   Zen     1050087         二代公文修改
1060518     Leslie  Zen     1060215         innerText相關修改*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1050411 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

var xDoc = document.all;

function ShowMsg()
{
    //1050411 Zen 1050087 二代公文修改
    //if (document.all["ValidationSummary1"].innerText != "")
    //	alert(document.all["ValidationSummary1"].innerText);
    jf_ShowValidator();
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
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            if (document.all.dlDEPT.selectedIndex == 0 || document.all.dlDEPT.selectedIndex == -1)
            {
                Page_BlockSubmit = true;
                alert("請輸入單位!!");
            }
            else
                Page_BlockSubmit = false;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_CheckObjectValue())
            {
                // 新增模式需檢查鍵值是否已存在
                if (jf_GetActionMode() == LayoutModeNew)
                {
                    Page_BlockSubmit = true;

                    //0970305  Matte  0970150  支援二級單位
                    var DEPT = new Array(4);
                    if (document.all["H_SectNo_Value"].value != "")
                        DEPT = document.all["H_SectNo_Value"].value.split(':');
                    else
                        DEPT = document.all["H_DeptNo_Value"].value.split(':');
                    var arKeyName = new Array(2);
                    var arKeyValue = new Array(2);
                    arKeyName[0] = "SOURCE_ORGNO";
                    arKeyName[1] = "OU_ID";
                    arKeyValue[0] = document.all["H_OrgNo"].value;
                    if (DEPT[2] != "")
                        arKeyValue[1] = DEPT[2];
                    else
                        arKeyValue[1] = DEPT[0];

                    var arWSParam = new Array(3);
                    arWSParam[0] = "ISSUE_WORD";
                    arWSParam[1] = arKeyName;
                    arWSParam[2] = arKeyValue;

                    callObj = jf_CallWS("/Template/lib/sys.asmx", "CheckDataKeyDuplicate", false, arWSParam);
                    if (callObj.error)
                        alert(callObj.errorDetail.string);
                    else
                    {
                        wsCheckDataKeyID = callObj.id;
                        OnWSResult(callObj);
                    }
                }
            }
            else
                Page_BlockSubmit = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean();
            break;
        case "btSearch":
            break;
        case "btPrint":
            Page_BlockSubmit = false;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = false;
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
    ShowMsg();
    //jf_CallWS("/Template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null)
    //jf_CallWS("lib/OD_LIB.asmx","HelloWorld",false,null);
    //jf_CallWS("lib/AK_LIB.asmx", "GetDeptAllUsers", false, null);

    //1050602 Zen 1050087 二代公文修改
    dlSECT_Container.style.removeProperty('display');
}

var wsCheckDataKeyID;
function OnWSResult(argResult)
{
    if (argResult.id == wsCheckDataKeyID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (argResult.value.RtnBool == true)
                if (window.confirm(jf_GetErrMsg(KeyExist)) == false)
                {
                    Page_BlockSubmit = true;
                    //xDoc.dlDEPT.focus();
                }
                else
                    Page_BlockSubmit = false;
            else
                Page_BlockSubmit = false;
        }
    }
}

function jf_CheckObjectValue()
{
    var strErr = "";
    var xFocusObj;
    if (xDoc.dlDEPT.selectedIndex == 0 || xDoc.dlDEPT.selectedIndex == -1)
    {
        strErr += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["單位"])) + "\n";
        if (xFocusObj == null)
            xFocusObj = xDoc.dlDEPT_Text;
    }
    if (jf_Trim(xDoc.txOrgWord.value) == "" && xFocusObj == null)
    {
        strErr += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["總發文代字"])) + "\n";
        if (xFocusObj == null)
            xFocusObj = xDoc.txOrgWord;
    }
    if (jf_Trim(xDoc.txOuWord.value) == "" && xFocusObj == null)
    {
        strErr += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["單位發文代字"])) + "\n";
        if (xFocusObj == null)
            xFocusObj = xDoc.txOuWord;
    }
    if (jf_Trim(xDoc.txOrgSecWord.value) == "" && xFocusObj == null)
    {
        strErr += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["總發文密件代字"])) + "\n";
        if (xFocusObj == null)
            xFocusObj = xDoc.txOrgSecWord;
    }
    if (jf_Trim(xDoc.txOuSecWord.value) == "" && xFocusObj == null)
    {
        strErr += FormatStr(jf_GetErrMsg(UnAllowEmpty), new Array(["單位發文密件代字"])) + "\n";
        if (xFocusObj == null)
            xFocusObj = xDoc.txOuSecWord;
    }

    if (strErr != "")
    {
        jf_ShowMeg(strErr, "");
        //1050602 Zen 1050087 二代公文修改
        //xFocusObj.focus();
        $('#' + xFocusObj.id).focus();
        return false;
    }
    else
    {
        return true;
    }
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1060518 Zen 1060215 innerText相關修正    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}

function fnCopyOrgWord()
{
    Page_BlockSubmit = true;
    document.all.txOrgSecWord.value = jf_Trim(document.all.txOrgWord.value);
}

function fnCopyOuWord()
{
    Page_BlockSubmit = true;
    document.all.txOuSecWord.value = jf_Trim(document.all.txOuWord.value);
}
//0970305  Matte  0970150  支援二級單位
var uDeptChecked = false;
function dlDEPT_Text_onblur(argIsCheckDone)
{
    if (uDeptChecked)
    {
        uDeptChecked = false;
        return;
    }
    if (argIsCheckDone)
        uDeptChecked = true;

    var bCheckOK = true;

    //呼叫OD_LIB.js，檢查dlDEPT_Text所輸入的值是否存在於下拉式選單
    if (odjf_ComboBoxCheck("dlDEPT", "承辦單位") && jf_Trim(document.all["dlDEPT_Text"].value) != "")
    {
        var strSubTree = false;
        if (document.all["H_OD_FLOW_TYPE"].value != "2")
        {
            strSubTree = true;
        }

        odjf_SetdlDept("dlDEPT", "dlSECT", "", "", strSubTree);

        //存ComboBox_Text的value
        document.all["H_Value"].value = document.all["dlDEPT_Text"].value;
        document.all["H_Sect_Value"].value = document.all["dlSECT_Text"].value;
        //存所選擇的ComboBox項目的value
        document.all["H_DeptNo_Value"].value = odjf_GetSelectValue(document.all["dlDEPT"], document.all["H_Value"].value);
        document.all["H_SectNo_Value"].value = odjf_GetSelectValue(document.all["dlSECT"], document.all["H_Sect_Value"].value);
        //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
        document.all.H_dlSect_Value.value = odjf_SaveCurrDL(document.all["dlSECT"]);
        //依選項多寡固定下拉式選單可見長度
        document.all["dlSECT_Container"].disabled = "";
        document.all["dlSECT_Text"].disabled = "";
        if (document.all["dlSECT"].options.length > 10)
            document.all["dlSECT"].size = 10;
        else if (document.all["dlSECT"].options.length == 1)
        {
            document.all["dlSECT"].size = 2;
            document.all["dlSECT_Container"].disabled = true;
            document.all["dlSECT_Text"].disabled = true;
        }
        else
            document.all["dlSECT"].size = document.all["dlSECT"].options.length;
    }
    else
        bCheckOK = false;

    return bCheckOK;
}
//0970305  Matte  0970150  支援二級單位
var uSectChecked = false;
function dlSECT_Text_onblur(argIsCheckDone)
{
    if (uSectChecked)
    {
        uSectChecked = false;
        return;
    }
    if (argIsCheckDone)
        uSectChecked = true;

    var bCheckOK = true;

    //呼叫OD_LIB.js，檢查dlSECT_Text所輸入的值是否存在於下拉式選單
    if (odjf_ComboBoxCheck("dlSECT", "承辦科別") || jf_Trim(document.all["dlSECT_Text"].value) != "")
    {
        var strSubTree = false;
        if (document.all["H_OD_FLOW_TYPE"].value != "2")
        {
            strSubTree = true;
        }

        //呼叫OD_LIB.js，初始dlUser的處理
        odjf_SetdlSect("dlDEPT", "dlSECT", "", "", strSubTree);

        //存ComboBox_Text的value
        document.all["H_Sect_Value"].value = document.all["dlSECT_Text"].value;
        //存所選擇的ComboBox項目的value
        document.all["H_SectNo_Value"].value = odjf_GetSelectValue(document.all["dlSECT"], document.all["H_Sect_Value"].value);
    }
    else
        bCheckOK = false;
    return bCheckOK;
}
