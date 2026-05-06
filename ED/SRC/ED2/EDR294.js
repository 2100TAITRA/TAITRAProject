/*
DATE 	 SA		 PRG	MGR_NO		DESC
1060103 David   Zen     1050087     二代公文修改
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

//1060103 Zen 1050087 二代公文修改//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    //給定隱藏欄位值
    document.all["H_FromDept"].value = document.all["dlFromDept_Text"].value;
    document.all["H_FromSect"].value = document.all["dlFromSect_Text"].value;
    document.all["H_FromDept_Value"].value = edjf_GetSelectValue(document.all["dlFromDept"], document.all["H_FromDept"].value);
    document.all["H_FromSect_Value"].value = edjf_GetSelectValue(document.all["dlFromSect"], document.all["H_FromSect"].value);
    document.all["H_dlFromSect_Value"].value = edjf_SaveCurrDL(document.all["dlFromSect"]);

    document.all["H_RcvDept"].value = document.all["dlRcvDept_Text"].value;
    document.all["H_RcvSect"].value = document.all["dlRcvSect_Text"].value;
    document.all["H_User"].value = document.all["dlUser_Text"].value;
    document.all["H_RcvDept_Value"].value = edjf_GetSelectValue(document.all["dlRcvDept"], document.all["H_RcvDept"].value);
    document.all["H_RcvSect_Value"].value = edjf_GetSelectValue(document.all["dlRcvSect"], document.all["H_RcvSect"].value);
    document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
    document.all["H_dlRcvSect_Value"].value = edjf_SaveCurrDL(document.all["dlRcvSect"]);
    document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);


}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060103 Zen 1050087 二代公文修改//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060103 Zen 1050087 二代公文修改    //var xObjectName = document.activeElement.id;
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
        case btHelp:
            /*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060103 Zen 1050087 二代公文修改//function jf_ToolBarHandle()
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

    //1060103 Zen 1050087 二代公文修改    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {

        case "btSearch":
            Page_BlockSubmit = !jf_CheckBeforSave();
            //1060103 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_CheckBeforSave();
            //1060103 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_CheckBeforSave();
            //1060103 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
    var bRtnbool = false;

    if (jf_CheckBeforSave())
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

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (document.all["txTime"].value == "")
    {
        strErrMsg += "時限欄位不可空白\n";
        //1060103 Zen 1050087 二代公文修改        //document.all["txTime"].focus();
        $('#txTime').focus();
    }

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
    var InValidName = "";
    var InValidControlName = "";

    for (var i = 2; i <= document.all.dg1.rows.length; i++)
    {
        //txInput1不為空白時
        if (document.all["dg1__ctl" + i + "_txInput1"].value != "")
        {
            //txInput2不可空白
            if (document.all["dg1__ctl" + i + "_txInput2"].value == "")
            {
                InValidName += ",Input2不可空白";
                InValidControlName = "dg1__ctl" + i + "_txInput2";
            }

            if (InValidName != "")
            {
                InValidName = InValidName.substr(1, InValidName.length);
                //1060103 Zen 1050087 二代公文修改                //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
                //1060103 Zen 1050087 二代公文修改                //document.all[InValidControlName].focus();
                $('#' + InValidControlName).focus();
                return false;
            }
        }
    }
    return true;
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
function DocFlowInfo(argDocNo)
{
    var strPage = document.all["H_Url"].value;
    var strUrl = strPage + "&pDocNo=" + argDocNo;

    jf_OpenChildWin(strUrl, "FlowPage", 700, 500);
}

function dlDept_Text_onblur(argType)
{
    var bCheckOK = true;
    var dept_type = "";
    if (argType == "From")
        dept_type = "送文單位"
    else
        dept_type = "收文單位"
    if (document.all["dl" + argType + "Dept_Text"].value != document.all["H_" + argType + "Dept"].value)
    {
        //呼叫OD_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
        if (edjf_ComboBoxCheck("dl" + argType + "Dept", dept_type))
        {
            //存ComboBox_Text的value
            document.all["H_" + argType + "Dept"].value = document.all["dl" + argType + "Dept_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_" + argType + "Dept_Value"].value = edjf_GetSelectValue(document.all["dl" + argType + "Dept"], document.all["H_" + argType + "Dept"].value);

            var bSubTree = true;
            if (document.all["H_OD_FLOW_TYPE"].value == "2")
                bSubTree = false;
            if (argType == "From")//送文單位無送文人選項
                edjf_SetdlDept("dl" + argType + "Dept", "dl" + argType + "Sect", "", "", false, true);	//初始dlSect、dlUser的處理
            else
            {
                edjf_SetdlDept("dl" + argType + "Dept", "dl" + argType + "Sect", "dlUser", "", false, true);	//初始dlSect、dlUser的處理

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

            document.all["H_" + argType + "Sect"].value = document.all["dl" + argType + "Sect_Text"].value;
            document.all["H_" + argType + "Sect_Value"].value = edjf_GetSelectValue(document.all["dl" + argType + "Sect"], document.all["H_" + argType + "Sect"].value);
            //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
            document.all["H_dl" + argType + "Sect_Value"].value = edjf_SaveCurrDL(document.all["dl" + argType + "Sect"]);

            //依選項多寡固定下拉式選單可見長度
            if (document.all["dl" + argType + "Sect"].options.length > 10)
                document.all["dl" + argType + "Sect"].size = 10;
            else if (document.all["dl" + argType + "Sect"].options.length == 1)
                document.all["dl" + argType + "Sect"].size = 2;
            else
                document.all["dl" + argType + "Sect"].size = document.all["dl" + argType + "Sect"].options.length;
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}

function dlSect_Text_onblur(argType)
{
    var bCheckOK = true;
    var sect_type = "";
    if (argType == "From")
        sect_type = "送文科別"
    else
        sect_type = "收文科別"
    //值若變更時作處理
    if (document.all["dl" + argType + "Sect_Text"].value != document.all["H_" + argType + "Sect"].value)
    {
        //呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
        if (edjf_ComboBoxCheck("dl" + argType + "Sect", sect_type))
        {
            //存ComboBox_Text的value
            document.all["H_" + argType + "Sect"].value = document.all["dl" + argType + "Sect_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_" + argType + "Sect_Value"].value = edjf_GetSelectValue(document.all["dl" + argType + "Sect"], document.all["H_" + argType + "Sect"].value);

            //odjf_SetdlSect()在下方
            if (argType == "From")//送文單位無送文人選項
                odjf_SetdlSect("dl" + argType + "Dept", "dl" + argType + "Sect", "", "", false);	//初始化承辦人選單
            else
            {
                odjf_SetdlSect("dl" + argType + "Dept", "dl" + argType + "Sect", "dlUser", "", false);	//初始化承辦人選單

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
        if (edjf_ComboBoxCheck("dlUser", "收文人"))
        {
            document.all["H_User"].value = document.all["dlUser_Text"].value;

            document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}


/**********************************************************************************************
  Name : function odjf_SetdlSect()
  Desc : 承辦科別下拉式選單變動時，連動變動承辦人下拉式選單	Charles 0950921
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argSectComboBoxID		: string 二級單位Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
		 argRoleNo				: string 指定之角色
		 argSubTree				: string 是否包含次級單位
  Rtn  : none
 **********************************************************************************************/
function odjf_SetdlSect(argDeptComboBoxID, argSectComboBoxID, argUserComboBoxID, argRoleNo, argSubTree)
{
    //取得Combo物件
    var DeptComboBoxObj = document.all[argDeptComboBoxID];
    var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
    var SectComboBoxObj = document.all[argSectComboBoxID];
    var SectComboBoxTextObj = document.all[argSectComboBoxID + "_Text"];
    var UserComboBoxObj = document.all[argUserComboBoxID];
    var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];

    //如果承辦單位目前所選為空值，則將承辦科別及承辦人也都設定為無選項且顯示為空值
    if (DeptComboBoxTextObj.value == "")
    {
        if (SectComboBoxObj != null && SectComboBoxTextObj != null)
        {
            while (SectComboBoxObj.length > 0)
                SectComboBoxObj.remove(0);
            SectComboBoxObj.size = 2;
            SectComboBoxObj.options.add(new Option("", ""));
            SectComboBoxTextObj.value = "";
        }

        if (UserComboBoxObj != null && UserComboBoxTextObj != null)
        {
            while (UserComboBoxObj.length > 0)
                UserComboBoxObj.remove(0);
            UserComboBoxObj.size = 2;
            UserComboBoxObj.options.add(new Option("", ""));
            UserComboBoxTextObj.value = "";
        }
        return;
    }

    if (UserComboBoxObj != null && UserComboBoxTextObj != null)
    {
        var valUser = new Array(3);
        if (SectComboBoxObj.value == "")
            valUser[0] = DeptComboBoxObj.value.split(":")[0];
        else
            valUser[0] = SectComboBoxObj.value.split(":")[2];
        valUser[1] = argRoleNo;
        valUser[2] = argSubTree;

        callObj = jf_CallWS("../ED4/EDR402.asmx", "GetUnitAllUsers", false, valUser);

        resultObj = null;
        if (callObj.error)
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([callObj.errorDetail.string])), "");
        else
        {
            if (jf_IsWebServiceSuccess(callObj))
                resultObj = callObj.value;
        }

        var UserNameMem = UserComboBoxTextObj.value;

        //清空選項
        while (UserComboBoxObj.length > 0)
            UserComboBoxObj.remove(0);

        //重新新增選項
        len = resultObj.UserName.length;
        UserComboBoxObj.size = len > 0 ? (len + 1) : 2;	//因為如果只有一個空白選項，Size也只有1的話，下拉選單會很奇怪，至少為2
        UserComboBoxObj.options.add(new Option("", ""));
        for (i = 0 ; i < len ; i++)
        {
            //項目格式： [承辦人名稱][承辦單位代碼:承辦科別代碼:承辦人代碼:承辦人名稱]
            var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i] + ":" + resultObj.SectNo[i] + ":" + resultObj.UserName[i] + ":" + resultObj.EmpName[i])
            UserComboBoxObj.options.add(objOption);
        }

        //清空顯示的Text，以及重設選擇
        UserComboBoxTextObj.value = "";
        UserComboBoxObj.selectedIndex = -1;
        for (i = 0 ; i < len ; i++)
        {
            if (UserNameMem == resultObj.EmpName[i] || UserNameMem == resultObj.UserName[i])
            {
                UserComboBoxTextObj.value = resultObj.EmpName[i];
                UserComboBoxObj.selectedIndex = i;
                break;
            }
        }
    }
}