/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1070129      Zen     1050087 二代升級 * 1110103      Zen     1101292 修正多次點擊重複PostBack之問題
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
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

//1070129 Zen 1050087 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if (document.all.dg1 && document.all.tbSelect)
//    document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1070129 Zen 1050087 二代升級    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
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
//1070129 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1070129 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_btFLD_TYPE"] != null)
    {
        btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
    }    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題    if (IsServerHandling)    {        Page_BlockSubmit = true;        return;    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        //1070129 Zen 1050087 二代升級--begin        //case "ibRcvDateS":
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all["txRcvDateS"], event.screenX, event.screenY);
        //    break;
        //case "ibRcvDateE":
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all["txRcvDateE"], event.screenX, event.screenY);
        //    break;
        case "btSelectAll":
            Page_BlockSubmit = true;
            jf_SelectAll("dg1", "_cbSelect");
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
            jf_SelectInverse("dg1", "_cbSelect");
            break;
        case "btSelectClear":
            Page_BlockSubmit = true;
            jf_SelectClear("dg1", "_cbSelect");
            break;
        case "btDeleteSelected":
            Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
            jf_SelectBarSubmit();
            break;
            //1070129 Zen 1050087 二代升級--end    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1070129 Zen 1050087 二代升級//function jf_ToolBarHandle()
function jf_ToolBarHandle(e)
{
    var xObjectName;
    var evBtn;    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題    if (IsServerHandling)    {        Page_BlockSubmit = true;        return;    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1070129 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1070129 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            //if(jf_ConfirmSave()) //是否通過儲存前必要檢查
            //{
            IsServerHandling = true;
            jf_ShowWaitState();
            Page_BlockSubmit = false;
            //}
            //else
            //	Page_BlockSubmit = true;
            //1070129 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1070129 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1070129 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //1070129 Zen 1050087 二代升級            //case "btClean":
            //    Page_BlockSubmit = true;
            //    jf_ConfirmClean(true);
            //    document.all["txKeyFld"].focus();
            //    break;
        case "btSearch":
            //查詢前收(創)文日期欄位值合理性
            if (document.all.txRcvDateS.value != "" && document.all.txRcvDateE.value != "")
            {
                if (document.all.txRcvDateS.value > document.all.txRcvDateE.value)
                {
                    var tempRcvDate;
                    tempRcvDate = document.all.txRcvDateS.value;
                    document.all.txRcvDateS.value = document.all.txRcvDateE.value;
                    document.all.txRcvDateE.value = tempRcvDate;
                }
            }

            //1.不可空白檢查
            /*
			if(document.all.txAcpDateS.value =="" && document.all.txAcpDateE.value =="" && document.all.dlUser_Text.value == "")
			{
				if (!window.confirm("未輸入任何輸入條件有可能導致搜尋過久，確定仍要執行嗎?"))
				{
					Page_BlockSubmit=true;
					return;				
				}
			}
			/*if(document.all.txAcpDateS.value =="" || document.all.txAcpDateE.value =="")
			{
				alert("點收日期不可空白");
				if(document.all.txAcpDateS.value =="")
					document.all.txAcpDateS.focus();
				else
					document.all.txAcpDateE.focus();
				Page_BlockSubmit=true;
				return;
			}*/
            Page_BlockSubmit = false;
            //1070129 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //1070129 Zen 1050087 二代升級            //case "btPrint":
            //    Page_BlockSubmit = !jf_ConfirmPrint();
            //    jf_ToolBarSubmit();
            //    break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1070129 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

            //以下屬於DataGrid ToolBar
            //1070129 Zen 1050087 二代升級            //case "btSelectAll":
            //    Page_BlockSubmit = true;
            //    jf_SelectAll("dg1", "_cbSelect");
            //    break;
            //case "btSelectInverse":
            //    Page_BlockSubmit = true;
            //    jf_SelectInverse("dg1", "_cbSelect");
            //    break;
            //case "btSelectClear":
            //    Page_BlockSubmit = true;
            //    jf_SelectClear("dg1", "_cbSelect");
            //    break;
            //case "btDeleteSelected":
            //    Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
            //    jf_SelectBarSubmit();
            //    break;
            //case "btUp":
            //    Page_BlockSubmit = true;
            //    jf_RowUp("dg1", "_cbSelect", strTableFields);
            //    break;
            //case "btDown":
            //    Page_BlockSubmit = true;
            //    jf_RowDown("dg1", "_cbSelect", strTableFields);
            //    break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//1070129 Zen 1050087 二代升級////儲存前檢查
//function jf_ConfirmSave()
//{
//    var bRtnbool = false;

//    if (jf_CheckBeforSave())
//    {
//        // 新增模式需檢查鍵值是否已存在
//        if (jf_GetActionMode() == LayoutModeNew)
//        {
//            if (jf_CheckDataExist(""))//檢查鍵值是否已存在
//            {
//                if (window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
//                    bRtnbool = true;
//            }
//            else
//                bRtnbool = true;
//        }
//        else
//            bRtnbool = true;
//    }

//    return bRtnbool;
//}

////儲存前之欄位檢查
//function jf_CheckBeforSave()
//{
//    var bRtnbool = true;
//    var strErrMsg = "";

//    if (document.all["txKeyFld"].value == "")
//    {
//        strErrMsg += "鍵值欄位不可空白\n";
//        document.all["txKeyFld"].focus();
//    }

//    if (document.all["txRequireFld"].value == "")
//    {
//        strErrMsg += "必要欄位不可空白\n";
//        document.all["txRequireFld"].focus();
//    }

//    if (!jf_CheckBlankAndAlert())
//        bRtnbool = false;

//    if (strErrMsg != "")
//    {
//        bRtnbool = false;
//        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
//    }

//    return bRtnbool;
//}

////檢查DataGrid資料列是否填完整
//function jf_CheckBlankAndAlert()
//{
//    var InValidName = "";
//    var InValidControlName = "";

//    for (var i = 2; i <= document.all.dg1.rows.length; i++)
//    {
//        //txInput1不為空白時
//        if (document.all["dg1__ctl" + i + "_txInput1"].value != "")
//        {
//            //txInput2不可空白
//            if (document.all["dg1__ctl" + i + "_txInput2"].value == "")
//            {
//                InValidName += ",Input2不可空白";
//                InValidControlName = "dg1__ctl" + i + "_txInput2";
//            }

//            if (InValidName != "")
//            {
//                InValidName = InValidName.substr(1, InValidName.length);
//                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
//                document.all[InValidControlName].focus();
//                return false;
//            }
//        }
//    }
//    return true;
//}

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
function dlDept_Text_onblur()
{
    var bCheckOK = true;
    if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
    {
        //呼叫OD_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
        if (edjf_ComboBoxCheck("dlDept", "承辦單位"))
        {
            //存ComboBox_Text的value
            document.all["H_Dept"].value = document.all["dlDept_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);

            var bSubTree = true;
            if (document.all["H_OD_FLOW_TYPE"].value == "2")
                bSubTree = false;

            edjf_SetdlDept("dlDept", "dlSect", "dlUser", "", false, true);	//初始dlSect、dlUser的處理

            document.all["H_Sect"].value = document.all["dlSect_Text"].value;
            document.all["H_User"].value = document.all["dlUser_Text"].value;
            document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
            document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
            //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
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

            odjf_SetdlSect("dlDept", "dlSect", "dlUser", "", false);	//初始化承辦人選單

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

//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
    if (document.all[argComboxID].options.length <= 1)
        document.all[argComboxID + "_Container"].className = "hide";
    else
        //1070129 Zen 1050087 二代升級        //document.all[argComboxID + "_Container"].className = "InputFieldText";
        document.all[argComboxID + "_Container"].className = "custom-combobox";
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

/*****************************************************************************
* 確認DATE格式是否正確 收(創)文日期 第一格
*****************************************************************************/
var CheckedDate = false;
function CheckDATE(argObj, strMsg, argIsCheckDone)
{
    var strDate = document.all[argObj].value;

    if (strDate != "")
    {
        if (CheckedDate)
        {
            CheckedDate = false;
            return true;
        }
        if (argIsCheckDone)
            CheckedDate = true;

        if (strDate.length < 7)
        {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }

        if (!jf_CheckCDATE(strDate))
        {
            if (strMsg)
                jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            //1070129 Zen 1050087 二代升級            //document.all[argObj].focus();
            $('#' + argObj).focus();
            document.all[argObj].value = "";
            CheckedDate = false;
            return false;
        }
        else
            return true;
    }
    else
        return true;
}
/*****************************************************************************
* 確認DATE格式是否正確 收(創)文日期 第二格
*****************************************************************************/
var CheckedDate1 = false;
function CheckDATE1(argObj, strMsg, argIsCheckDone)
{
    var strDate = document.all[argObj].value;

    if (strDate != "")
    {
        if (CheckedDate1)
        {
            CheckedDate1 = false;
            return true;
        }
        if (argIsCheckDone)
            CheckedDate1 = true;

        if (strDate.length < 7)
        {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }

        if (!jf_CheckCDATE(strDate))
        {
            if (strMsg)
                jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            //1070129 Zen 1050087 二代升級            //document.all[argObj].focus();
            $('#' + argObj).focus();
            document.all[argObj].value = "";
            CheckedDate1 = false;
            return false;
        }
        else
            return true;
    }
    else
        return true;
}
