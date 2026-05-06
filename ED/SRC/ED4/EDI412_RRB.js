/*
DATE    SA		PRG		MGR_NO	        DESC
1050920	David   Zen	    1050814	        新增EDI412_RRB 開會會勘通知單查詢作業
1051019 Leslie  Kenny   1050087         二代公文修改
1060602 David   Zen     1060434         修正查詢條件邏輯錯誤及增加報表副表頭
1061214 Kevin   Joe     1061228         新增解除列管鍵
1061228	David   Zen		1061330			修正承辦單位、承辦人查詢條件失效之問題
1100201	Leslie	Joe		1090927			取消使用document.activeElement
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;


/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1061214	Joe		1061228		改由Server端處理--S
	//1061228 Zen 1061330 修正承辦單位、承辦人查詢條件失效之問題
    dlDept_Text_onblur('onblur', 'true');
	dlSect_Text_onblur('onblur');
	dlUser_Text_onblur('onblur');
	//1061214	Joe		1061228		改由Server端處理--E
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
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
            Page_BlockSubmit = !CheckBeforeSearch();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !CheckBeforeSearch();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btExcel":
            Page_BlockSubmit = !CheckBeforeSearch();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function ComboBoxCheck(argComboBoxID, argKeyMsg)
{
    var bRtnBool = false;
    var ComboBoxObj = document.all[argComboBoxID];
    var ComboBoxTextObj = document.all[argComboBoxID + "_Text"];

    var i, j;
    if (ComboBoxObj == null || ComboBoxTextObj == null)
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["[" + argComboBoxID + "]下拉選單不存在"])), "");
        return bRtnBool;
    }

    for (i = 0 ; i < ComboBoxObj.options.length ; i++)
    {
        if (ComboBoxTextObj.value == ComboBoxObj.options[i].text)
        {
            bRtnBool = true;
            break;
        }
    }

    if (!bRtnBool)
    {
        //jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入的"+argKeyMsg+"不在選單當中"])),"");
        $('#' + argComboBoxID + "_Text").focus();
        ComboBoxTextObj.select();
    }
    return bRtnBool;
}

//ComboBox 處理
var uDeptChecked = false;
function dlDept_Text_onblur(Mode, argIsCheckDone)
{
    if (uDeptChecked)
    {
        uDeptChecked = false;
        return;
    }
    if (argIsCheckDone == "true")
        uDeptChecked = true;
    var bCheckOK = true;
    if (ComboBoxCheck("dlDept", "承辦單位"))
    {
        document.all["H_Dept"].value = document.all["dlDept_Text"].value;
        //存所選擇的ComboBox項目的value
        document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
        document.all["dlSect_Container"].className = "custom-combobox";

        edjf_SetdlDept("dlDept", "dlSect", "dlUser", "", false, false);	//初始dlSect、dlUser的處理

        document.all["H_Sect"].value = document.all["dlSect_Text"].value;
        document.all["H_User"].value = document.all["dlUser_Text"].value;
        document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
        document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
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

        jf_HandleComboxStatus("dlSect");
    }
    else
    {
        uDeptChecked = true;
        document.all["dlDept_Text"].value = "";
        document.all["H_Dept"].value = "";
        alert("承辦單位不存在");
        return false;
    }
    uDeptChecked = false;
    return bCheckOK;
}

var uSectChecked = false;
function dlSect_Text_onblur(argIsCheckDone)
{
    if (uSectChecked)
    {
        uSectChecked = false;
        return;
    }
    if (argIsCheckDone)
        uSectChecked = true;
    var bCheckOK = true;
    //呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
    if (ComboBoxCheck("dlSect", "承辦科別"))
    {
        //存ComboBox_Text的value
        document.all["H_Sect"].value = document.all["dlSect_Text"].value;
        //存所選擇的ComboBox項目的value
        document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);

        edjf_SetdlSect("dlDept", "dlSect", "dlUser", "", false, true);	//初始化承辦人選單

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
    {
        uSectChecked = true;
        document.all["dlSect_Text"].value = "";
        document.all["H_Sect"].value = "";
        alert("承辦單位不存在");
        return false;
    }
    uSectChecked = false;
    return bCheckOK;
}

var uUserChecked = false;
function dlUser_Text_onblur(argIsCheckDone)
{
    if (uUserChecked)
    {
        uUserChecked = false;
        return;
    }
    if (argIsCheckDone)
        uUserChecked = true;
    var bCheckOK = true;
    //值若變更時作處理
    if (document.all["dlUser_Text"].value != document.all["H_User"].value)
    {
        document.all["H_User"].value = document.all["dlUser_Text"].value;
        document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
    }
    uUserChecked = false;
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

var bHasCheck = false;
function CheckDATE(argObj, strMsg)
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
            $('#' + argObj).focus();
            if (strMsg)
                jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            bHasCheck = false;
            return false;
        }
    }
    bHasCheck = false;
    return true;
}
//1100201	Joe		1090927		取消使用document.activeElement
// function checkDeptUserDDL(argIsCheckDone)
function checkDeptUserDDL(argIsCheckDone, event)
{
	//1100201	Joe		1090927		取消使用document.activeElement
    // if (document.activeElement.id == "dlDept_Text" && jf_Trim(document.all["dlDept_Text"].value) != "")
    if (event.target.id == "dlDept_Text" && jf_Trim(document.all["dlDept_Text"].value) != "")
    {
        if (!dlDept_Text_onblur(argIsCheckDone))
            return false;
    }
	//1100201	Joe		1090927		取消使用document.activeElement
    // if (document.activeElement.id == "dlSect_Text" && jf_Trim(document.all["dlSect_Text"].value) != "")
    if (event.target.id == "dlSect_Text" && jf_Trim(document.all["dlSect_Text"].value) != "")
    {
        if (!dlSect_Text_onblur(argIsCheckDone))
            return false;
    }
	//1100201	Joe		1090927		取消使用document.activeElement
    // if (document.activeElement.id == "dlUser_Text" && jf_Trim(document.all["dlUser_Text"].value) != "")
    if (event.target.id == "dlUser_Text" && jf_Trim(document.all["dlUser_Text"].value) != "")
    {
        if (!dlUser_Text_onblur(argIsCheckDone))
            return false;
    }
    return true;
}

function CheckBeforeSearch()
{
    var ErrMsg = '';

    if (document.all["txDocNoS"].value == "" && document.all["txDocNoE"].value == ""
        && document.all["txRcvDateS"].value == "" && document.all["txRcvDateE"].value == ""
        && document.all["txMeetDateS"].value == "" && document.all["txMeetDateE"].value == "")
        ErrMsg += "公文文號(起)、(迄)\n收文日期(起)、(迄)\n開會日期(起)、(迄)不可皆為空白\n";

    //1060602 Zen 1060434 動態調整欄位範圍--begin
    var strDocNoS = document.all["txDocNoS"].value;
    var strDocNoE = document.all["txDocNoE"].value;
    var strRcvDateS = document.all["txRcvDateS"].value;
    var strRcvDateE = document.all["txRcvDateE"].value;
    var strMeetDateS = document.all["txMeetDateS"].value;
    var strMeetDateE = document.all["txMeetDateE"].value;

    if (strDocNoS == "" && strDocNoE != "")
        document.all.txDocNoS.value = strDocNoE;
    else if (strDocNoS != "" && strDocNoE == "")
        document.all.txDocNoE.value = strDocNoS;
    else if (strDocNoS.localeCompare(strDocNoE) == 1)
    {
        document.all.txDocNoS.value = strDocNoE;
        document.all.txDocNoE.value = strDocNoS;
    }

    if (strRcvDateS == "" && strRcvDateE != "")
        document.all.txRcvDateS.value = strRcvDateE;
    else if (strRcvDateS != "" && strRcvDateE == "")
        document.all.txRcvDateE.value = strRcvDateS;
    else if (strRcvDateS.localeCompare(strRcvDateE) == 1)
    {
        document.all.txRcvDateS.value = strRcvDateE;
        document.all.txRcvDateE.value = strRcvDateS;
    }

    if (strMeetDateS == "" && strMeetDateE != "")
        document.all.txMeetDateS.value = strMeetDateE;
    else if (strMeetDateS != "" && strMeetDateE == "")
        document.all.txMeetDateE.value = strMeetDateS;
    else if (strMeetDateS.localeCompare(strMeetDateE) == 1)
    {
        document.all.txMeetDateS.value = strMeetDateE;
        document.all.txMeetDateE.value = strMeetDateS;
    }
    //1060602 Zen 1060434 動態調整欄位範圍--end
    
    if (ErrMsg == '')
        return true;
    else
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([ErrMsg])), "");
    return false;
}

//1061214	JOE		1061228			新增解除列管鍵--S
function DocWritePaper(argDocNo) {
	var strUrl = "";

	strUrl += "../../../ED/ED4/EDT412_RRB.aspx?rtnObj=lbReturnValue";
	strUrl += "&argDocNo=" + argDocNo;
	var strArtifact = document.all["H_Artifact"].value;
	strUrl += "&SAMLart=" + strArtifact;
	jf_OpenChildWin(strUrl, "", 960, 720);
}
//1061214	JOE		1061228			新增解除列管鍵--E