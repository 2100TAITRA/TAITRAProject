/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		SA		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1020320	David	Jagle	1020185	增加匯出EXCEL功能
 //1051117  Cloud   Zen     1050863 新增交通部客製化欄位及報表
 //1060207  Cloud   Joe     1050863 二代升級
 * 1090422	Cloud	Kevin_C	1090251	增加庫房查詢條件連動功能
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

//1060207	Joe		1050087		二代公文修改
// if (document.all.tbTool)
    // document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1051117 Zen 1050863 新增交通部客製化欄位及報表
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../EALIB/EA_LIB.asmx", "GetEmp", false, null); //使用WebService前必須先呼叫一次

    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	//1090422	Kevin_C	1090251避免postBack後選單跑掉
	dlStoreTypeChang();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060207	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060207	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;

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

		//1060207	Joe		1050087		二代公文修改--S
        // case "ImCLOSES":
            // Page_BlockSubmit = true;
            // jf_CallCalendar(document.all.txCLOSE_DATES, event.screenX - 0, event.screenY - 0);
            // break;
        // case "ImCLOSEE":
            // Page_BlockSubmit = true;
            // jf_CallCalendar(document.all.txCLOSE_DATEE, event.screenX - 0, event.screenY - 0);
            // break;
		//1060207	Joe		1050087		二代公文修改--E

    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060207 Joe 1050087 二代公文修改，傳入參數event
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

	//1060207 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            dlUser_onblur();

            if (GetDeptTextExist())
                document.all["txDL"].value = collectDL();
            else
                document.all["txDL"].value = "";
            //1051117 Zen 1050863 若為交通部則檢核至少輸入一個條件
            if (document.all.txCLOSE_DATES != undefined)
                Page_BlockSubmit = false;
            else
                Page_BlockSubmit = !CheckBeforeSearch();

			//1060207 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
			//1060207 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            //1051117 Zen 1050863 紀錄隱藏欄位
            var strStoreNo = document.all.H_StoreNo.value;
            jf_ConfirmClean(true);
            //1051117 Zen 1050863 避免交通部使用時跳出錯誤
            if (document.all.txCLOSE_DATES != undefined)
				//1060207	Joe	1050087	二代系統升級，調整focus寫法
				// document.all["txCLOSE_DATES"].focus();
				$('#txCLOSE_DATES').focus();
            //1051117 Zen 1050863 預設排序方式
            document.getElementById("rbCloseDate").checked = true
            //1051117 Zen 1050863 紀錄隱藏欄位
            document.all.H_StoreNo.value = strStoreNo;
            break;
        case "btPrint":
            dlUser_onblur();

            if (GetDeptTextExist())
                document.all["txDL"].value = collectDL();
            else
                document.all["txDL"].value = "";
            //1051117 Zen 1050863 若為交通部則檢核至少輸入一個條件
            if (document.all.txCLOSE_DATES != undefined)
                Page_BlockSubmit = false;
            else
                Page_BlockSubmit = !CheckBeforeSearch();
			//1060207 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            dlUser_onblur();

            if (GetDeptTextExist())
                document.all["txDL"].value = collectDL();
            else
                document.all["txDL"].value = "";
            //1051117 Zen 1050863 若為交通部則檢核至少輸入一個條件
            if (document.all.txCLOSE_DATES != undefined)
                Page_BlockSubmit = false;
            else
                Page_BlockSubmit = !CheckBeforeSearch();
			//1060207 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
            break;
            //1020320	Jagle	[1020185]	增加匯出EXCEL功能
        case "btExcel":
            dlUser_onblur();

            if (GetDeptTextExist())
                document.all["txDL"].value = collectDL();
            else
                document.all["txDL"].value = "";
            //1051117 Zen 1050863 若為交通部則檢核至少輸入一個條件
            if (document.all.txCLOSE_DATES != undefined)
                Page_BlockSubmit = false;
            else
                Page_BlockSubmit = !CheckBeforeSearch();
			//1060207 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
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

    if (document.all["txKeyFld"].value == "")
    {
        strErrMsg += "鍵值欄位不可空白\n";
		//1060207	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["txKeyFld"].focus();
		$('#txKeyFld').focus();
    }

    if (document.all["txRequireFld"].value == "")
    {
        strErrMsg += "必要欄位不可空白\n";
		//1060207	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txRequireFld"].focus();
		$('#txRequireFld').focus();
    }

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
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
//紀錄Client端所選擇之UserID
function jf_dlUserChange()
{
    //alert(document.all["dlUser"].options(document.all["dlUser"].selectedIndex).value)
    var empUserInfo = document.all["dlUser"].options(document.all["dlUser"].selectedIndex).value;
    var tempstr = empUserInfo.split(":");
    document.all["empUserId"].value = tempstr[2];

}
function CheckDate(id, str)
{
    var strDateValue;
    strDateValue = document.all[id].value;
    if (strDateValue == "")
    {
        return;
    }

    strDateValue = jf_PADL(strDateValue, 7, "0");
    document.all[id].value = strDateValue;
    if (!jf_CheckCDATE(strDateValue))
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([str])), "");
		
		//1060207	Joe	1050087	二代系統升級，調整focus寫法
		// document.all[id].focus();
		$('#' + id).focus();
        document.all[id].value = "";
    }
}
//取得ComboBox中，與目前ComboBox_Text相對應的值
function jf_GetSelectValue()
{
    var RtnValue = "";
    for (var i = 0; i < argSelect.options.length; i++)
    {
        if (argSelect.options[i].value == argText)
        {
            RtnValue = argSelect.options[i].value;
            break;
        }
    }
    return RtnValue;
}
function collectDL()
{
    var str = "";
    for (var i = 0; i < document.all["dlUser"].options.length; i++)
    {
		//1060207 Joe 1050087 二代公文修改
        // str += document.all["dlUser"].options(i).text + "," + document.all["dlUser"].options(i).value + ","
        str += document.all["dlUser"].options[i].text + "," + document.all["dlUser"].options[i].value + ","
    }
    return str;
}
function dlUser_onblur()
{
    var checker = false;
    if (document.all["dlUser_Text"].value == "")
    {
        checker = true;
        document.all["empUserId"].value = "";
    }
    else
    {

        for (var i = 0; i < document.all["dlUser"].options.length; i++)
        {
            if (document.all["dlUser"].options[i].text == document.all["dlUser_Text"].value)
            {
                checker = true;
				//1060207 Joe 1050087 二代公文修改
                // document.all["empUserId"].value = document.all["dlUser"].options(i).value.split(":")[2];
                document.all["empUserId"].value = document.all["dlUser"].options[i].value.split(":")[2];
            }
        }
    }

    if (!checker)
    {
        document.all["empUserId"].value = document.all["dlUser_Text"].value;
    }

    return checker;
}
//1051117 Zen 1050863 檢核是否輸入條件
function CheckBeforeSearch()
{
    var strDept = document.all.dlDept_Text.value;
    var strUser = document.all.dlUser_Text.value;
    var strDocFileType = document.all.dlDocFileType.value;
    var strDocState = document.all.dlDocState.value;

    if (strDept + strUser + strDocFileType + strDocState == "")
    {
        alert("請至少輸入一個條件");
        return false;
    }
    return true;
}

/**********************************************************************************************
  Name : function akjf_DeptCheck()
  Desc : 離開部門欄位的合理性檢查與人員欄位的連動處理
  Parm : argDeptComboBoxID      : string 部門Combobox 物件 ID
		 argUserComboBoxID      : string 人員Combobox 物件 ID
  Rtn  : none
 **********************************************************************************************/
function jf_DeptCheck(argDeptComboBoxID, argUserComboBoxID)
{
    /*** 離開欄位時檢查代碼或名稱是否存在 ***/
    var DeptComboBoxTextObj = document.all[argDeptComboBoxID + "_Text"];
    var DeptComboBoxObj = document.all[argDeptComboBoxID];
    var i, j, len;
    var checkOK = false;
    for (i = 0 ; i < DeptComboBoxObj.options.length ; i++)
    {
        if (checkOK) break;
        var arr = DeptComboBoxObj.options[i].value.split(":");
        for (j = 3 ; j >= 0 ; j--)
        {
            if (arr[j] == DeptComboBoxTextObj.value)
            {
                checkOK = true;
                DeptComboBoxObj.selectedIndex = i;
                break;
            }
        }
    }
    if (!checkOK)
    {
        ClearDL(document.all.dlUser);
        document.all["dlUser_Text"].value = "";
        document.all["txDL"].value = "";

        //alert("單位輸入錯誤");
        return;
    }
    /*** END ***/

    var val = DeptComboBoxObj.value;
    var arr = val.split(":");

    if (arr.length != 4) return;

    if (arr[2] == "") val = arr[0];
    else val = arr[2];

    callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDeptAllUsers", false, val);

    var resultObj = null;
    if (callObj.error)
    {
        alert(callObj.errorDetail.string);
    }
    else
    {
        if (jf_IsWebServiceSuccess(callObj))
            resultObj = callObj.value;
    }

    var UserComboBoxObj = document.all[argUserComboBoxID];
    var UserComboBoxTextObj = document.all[argUserComboBoxID + "_Text"];
    var UserNameMem = DeptComboBoxTextObj.value;

    //clear the ComboBox of User
    len = UserComboBoxObj.length;
    for (i = 0 ; i < len ; i++)
        UserComboBoxObj.remove(0);

    //add new data into the ComboBox of User
    len = resultObj.UserName.length;
    UserComboBoxObj.options.add(new Option("", ""));
    for (i = 0 ; i < len ; i++)
    {
        var objOption = new Option(resultObj.EmpName[i], resultObj.DeptNo[i] + ":" + resultObj.SectNo[i] + ":" + resultObj.UserName[i])
        UserComboBoxObj.options.add(objOption);
    }

    //clear the data of ComboBox of User and reset it.
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
//將DropDownList裡的item清除
function ClearDL(argObj)
{
    for (var i = 0 ; i < argObj.length; i++)
        argObj.remove(0);

    argObj.length = 0;
    return;
}
//取得dldept有無存在於下方ddl中
function GetDeptTextExist()
{
    var checker = false;

    for (var i = 0; i < document.all["dlDept"].options.length; i++)
    {
        if (document.all["dlDept"].options[i].text == document.all["dlDept_Text"].value)
        {
            checker = true;
        }
    }
    return checker;

}
//1090422	Kevin_C	1090251	增加庫房查詢條件連動功能
function dlStoreTypeChang()
{
	var strSelectedValue = document.all.dlStoreType.options[document.all.dlStoreType.selectedIndex].value;
	if(strSelectedValue == "")
	{
		document.all.dlStoreNoAll.className = "";
		document.all.dlStoreNo1.className = "hide";
		document.all.dlStoreNo2.className = "hide";
	}
	else if(strSelectedValue == "1")
	{
		document.all.dlStoreNoAll.className = "hide";
		document.all.dlStoreNo1.className = "";
		document.all.dlStoreNo2.className = "hide";
	}
	else if(strSelectedValue == "2")
	{
		document.all.dlStoreNoAll.className = "hide";
		document.all.dlStoreNo1.className = "hide";
		document.all.dlStoreNo2.className = "";
	}
}