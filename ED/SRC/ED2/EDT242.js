/*
DATE		SA		PRG		MGR_NO		DESC
1011224		Yvonne	Jagle	------		新增本作業
1020111		Yvonne	Jagle	------		修正承辦人欄位未ONBLUR問題
1060927     David   Zen     1050087     二代升級
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//指定DataGrid欄位
var strTableFields = new Array("_lbRead", "_txInput1", "_txInput2");

//1060927 1050087 Zen 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060927 1050087 Zen 二代升級    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次

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

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060927 1050087 Zen 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060927 1050087 Zen 二代升級    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_btFLD_TYPE"] != null)
    {
        btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
    }

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case "btDateS":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txRcvDateS, event.screenX, event.screenY);
            break;
        case "btDateE":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txRcvDateE, event.screenX, event.screenY);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060927 1050087 Zen 二代升級//function jf_ToolBarHandle()
function jf_ToolBarHandle(e)
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

    //1060927 1050087 Zen 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    var xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            if (CheckBeforeSearch())
            {
                //1020111	Jagle	避免直接點選查詢時承辦人會錯誤
                dlUser_Text_onblur();
                Page_BlockSubmit = false;
                //1060927 1050087 Zen 二代升級                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btPrint":
            if (CheckBeforeSearch())
            {
                Page_BlockSubmit = false;
                //1060927 1050087 Zen 二代升級                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btPreview":
            if (CheckBeforeSearch())
            {
                Page_BlockSubmit = false;
                //1060927 1050087 Zen 二代升級                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
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
            //document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
        }
        else
        {
            //document.all["txReadOnly"].value = "";
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
    /*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//檢核日期格式
var CheckedDate = false;
var ObjName = "";
var strBDate = "";
function CheckDATE(argObj, strMsg, argIsCheckDone)
{
    if (ObjName != argObj)
        CheckedDate = false;
    ObjName = argObj;

    var strDate = jf_Trim(document.all[argObj].value);

    if (strDate != "")
    {
        if (strDate.length < 7)
        {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }

        if (strBDate != strDate)
            CheckedDate = false;

        strBDate = strDate;

        if (CheckedDate)
        {
            CheckedDate = false;
            return true;
        }
        if (argIsCheckDone)
            CheckedDate = true;

        if (!jf_CheckCDATE(strDate))
        {
            if (strMsg)
                jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            //1060927 1050087 Zen 二代升級            //document.all[argObj].focus();
            $('#' + argObj).focus();
            CheckedDate = false;
            return false;
        }
        else
            return true;
    }
    else
        return true;
}

function CheckBeforeSearch()
{
    var strDateS = document.all["txRcvDateS"].value;
    var strDateE = document.all["txRcvDateE"].value;
    var strDocS = document.all["txDocNoS"].value;
    var strDocE = document.all["txDocNoE"].value;

    if (!CheckDATE("txRcvDateS", "收文日期(起)", true))
        return false;
    if (!CheckDATE("txRcvDateE", "收文日期(訖)", true))
        return false;

    if (strDateS == "" && strDateE == "" && strDocS == "" && strDocE == "")
    {
        alert("文號及收文日期不可皆為空，請至少輸入一項條件！");
        return false;
    }

    //文號調整
    if (strDocS != "" && strDocE != "" && strDocS > strDocE)
    {
        document.all.txDocNoS.value = strDocE;
        document.all.txDocNoE.value = strDocS;
    }
    else if (strDocS != "" || strDocE != "")
    {
        if (strDocS == "")
            document.all["txDocNoS"].value = document.all["txDocNoE"].value;
        if (strDocE == "")
            document.all["txDocNoE"].value = document.all["txDocNoS"].value;
    }

    //收文日期調整
    if (strDateS != "" && strDateE != "" && strDateS > strDateE)
    {
        document.all.txRcvDateS.value = strDateE;
        document.all.txRcvDateE.value = strDateS;
    }
    else if (strDateS != "" || strDateE != "")
    {
        if (strDateS == "")
            document.all["txRcvDateS"].value = document.all["txRcvDateE"].value;
        if (strDateE == "")
            document.all["txRcvDateE"].value = document.all["txRcvDateS"].value;
    }
    return true;
}

function dlDept_Text_onblur()
{
    var bCheckOK = true;
    if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
    {
        //呼叫ED_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
        if (edjf_ComboBoxCheck("dlDept", "承辦單位"))
        {
            //存ComboBox_Text的value
            document.all["H_Dept"].value = document.all["dlDept_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
            //初始dlSect、dlUser的處理
            edjf_SetdlDept("dlDept", "dlSect", "dlUser", "", false, true);
            //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
            document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
            document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
            //依選項多寡固定下拉式選單可見長度
            SetdlLenth(document.all["dlSect"]);
            SetdlLenth(document.all["dlUser"]);
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
            //初始化承辦人選單
            edjf_SetdlSect("dlDept", "dlSect", "dlUser", "", false);
            //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
            document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
            //依選項多寡固定下拉式選單可見長度
            SetdlLenth(document.all["dlUser"]);
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

function SetdlLenth(argDLObj)
{
    if (argDLObj.options.length > 10)
        argDLObj.size = 10;
    else if (argDLObj.options.length == 1)
        argDLObj.size = 2;
    else
        argDLObj.size = argDLObj.options.length;
}

//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
    if (document.all[argComboxID].options.length <= 1)
        document.all[argComboxID + "_Container"].className = "hide";
    else
        //1060927 1050087 Zen 二代升級        //document.all[argComboxID + "_Container"].className = "InputFieldText";
        document.all[argComboxID + "_Container"].className = "custom-combobox";
}