/*
DATE 	SA		PRG		MGR_NO		DESC
1040826 --		Cloud	1020969		(merge)選擇彙併辦母文，子文一併勾選		增加撈取彙併辦子文，並顯示於查詢清單中
1040826	--		Cloud	1040614		增加取得代核示公文，增加組室、科別條件，報表、datagrid增加移交組室科別資訊
1041005	--		Cloud 	--			修正移交公文判斷，應該判斷接管人員角色
1050511	David	Kenny	1050204	    一併修正前單1. 當狀態(待核示)後方因串上文號而未判斷到的問題，2. 未判斷流程擁有者導致自動勾選非主辦項目
1060908	David	Joe		--	    	補宣告pNo
1070824	David	Kevin_C	1070436		增加撈取受會公文
1091211 Zen     Zen     1090893     修正無法一次移交多筆併案子文之問題
1130105 Zen     Zen     1120722     二代升級
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
var SPLIT = "|";

//指定DataGrid欄位
var strTableFields = new Array("_lbDocNo", "_lbDeptName", "_lbEmpName");

//1130105 Zen 1120722 二代升級
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if (document.all.dg1)
//    document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

//各function回傳資料用的
function RtnVal()
{
    this.bSuccess = false;
    this.strErrMsg = "";
    this.strMsg = "";
    this.rtnVal = new Object;
}

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
var oTimerId;
function ClientOnLoad()
{
    //1130105 Zen 1120722 二代升級
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../EDLIB/EDWS.asmx", "GetAccountInfo", false, null); //使用WebService前必須先呼叫一次

    //初始化畫面	
    fnInitDisplay();

    //ClientOnLoad完成後要做的事	
    oTimerId = setInterval("fnAfterPageLoad()", 10);
}

function fnAfterPageLoad()
{
    clearInterval(oTimerId); //clear
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1130105 Zen 1120722 二代升級
//function ClientButtonControl()
function ClientButtonControl(e)
{

    //1130105 Zen 1120722 二代升級
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    //1060908	Joe		--		補宣告pNo
    var pNo = xObjectName.substring(8, xObjectName.indexOf("_cbSelect"));

    //取得確實按下的是哪個？鍵
	let cbSelect = '';
    if (document.all["dg1__ctl" + pNo + "_cbSelect"] != null)
    {
        cbSelect = document.all["dg1__ctl" + pNo + "_cbSelect"].id;
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
        case cbSelect:
            jf_SelectComNo(pNo, cbSelect);
            break;
        //1130105 Zen 1120722 二代升級
        //以下屬於DataGrid ToolBar
        case "btSelectAll":
            Page_BlockSubmit = true;
            DgSelect(true);
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
            DgSelect(null);
            break;
        case "btSelectClear":
            Page_BlockSubmit = true;
            DgSelect(false);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1130105 Zen 1120722 二代升級
//function jf_ToolBarHandle()
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

    //1130105 Zen 1120722 二代升級
    //xObjectName = window.event.srcNode.getAttribute("ID");
    var xObjectName = e.target.id;

    switch (xObjectName)
    {

        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1130105 Zen 1120722 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSearch":
            if (jf_ConfirmSearch()) //查詢前檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1130105 Zen 1120722 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btMove":
            if (jf_ConfirmMove()) //移交前檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1130105 Zen 1120722 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1130105 Zen 1120722 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

        //1130105 Zen 1120722 二代升級
        ////以下屬於DataGrid ToolBar
        //case "btSelectAll":
        //    Page_BlockSubmit = true;
        //    //1091211 Zen 1090893 修正無法一次移交多筆併案子文之問題
        //    //jf_SelectAll("dg1", "_cbSelect");
        //    DgSelect(true);
        //    break;
        //case "btSelectInverse":
        //    Page_BlockSubmit = true;
        //    //1091211 Zen 1090893 修正無法一次移交多筆併案子文之問題
        //    //jf_SelectInverse("dg1", "_cbSelect");
        //    DgSelect(null);
        //    break;
        //case "btSelectClear":
        //    Page_BlockSubmit = true;
        //    //1091211 Zen 1090893 修正無法一次移交多筆併案子文之問題
        //    //jf_SelectClear("dg1", "_cbSelect");
        //    DgSelect(false);
        //    break;
    }
}


//查詢前檢查
function jf_ConfirmSearch()
{
    var bRtnbool = false;

    if (jf_CheckBeforSearch())
    {
        bRtnbool = true;
    }

    return bRtnbool;
}

//查詢前之欄位檢查
function jf_CheckBeforSearch()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (document.all["txUser"].value == "")
    {
        strErrMsg += "移交人不可空白\n";
        //1130105 Zen 1120722 二代升級
        //document.all["txUser"].focus();
        $('#txUser')[0].focus();
    }
    else
    {
        var rtn = new RtnVal()
        rtn = fnCheckUser(document.all["txUser"].value, document.all["h_PrivInfo"].value)
        if (rtn.bSuccess == true)
        {
            document.all["txUserName"].value = rtn.strMsg;
        }
        else
        {
            strErrMsg += rtn.strErrMsg + "\n";
            bRtnbool = false;
            document.all["txUser"].value = "";
            document.all["txUserName"].value = "";
        }
    }
    //1070824	Kevin_C	1070436		增加撈取受會公文
    //if(document.all["cbxUnClosedDoc"].checked == false && document.all["cbxClosedDoc"].checked == false)
    if (document.all["cbxUnClosedDoc"].checked == false && document.all["cbxClosedDoc"].checked == false && document.all["cbxOtherDoc"].checked == false)
    {
        strErrMsg += "查詢範圍至少需勾選一個選項\n";
        bRtnbool = false;
    }


    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}
//移交前檢查(檢核是否有設定移交人)
function jf_ConfirmMove()
{
    var bRtnbool = false;

    var dgCount = document.all.dg1.rows.length;

    if (dgCount < 2)
    {
        alert("請先執行查詢後，再移交。")
        return bRtnbool;
    }

    for (var i = 2; i <= dgCount; i++)
    {
        if (document.all["dg1__ctl" + i + "_txTakeName"].value != "")
        {
            bRtnbool = true;
        }
    }

    if (bRtnbool == false)
        alert("尚未設定接管人，請先完成接管人設定後再移交。")

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
                //1130105 Zen 1120722 二代升級
                //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");

                //1130105 Zen 1120722 二代升級
                //document.all[InValidControlName].focus();
                $('#' + InValidControlName)[0].focus();
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
            //document.all["txUser"].value = jf_Trim(argResult.value.RtnStr);
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
        document.all["txUser"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
    	
    	
        document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
        if(document.all["txUser"].value != "")
        {
            Page_BlockSubmit=false;
            jf_OpenButtonSubmit();
        }
        document.all["txUser"].focus();
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
//將畫面初始化
function fnInitDisplay()
{

    if (document.all.ShowDisableAccount && document.all.ShowDisableAccount.value == "YES")
        document.all.trOtherSettings.style.display = "";///系統管理人可以看到其它設定

    if (jf_GetActionMode() == LayoutModeNew)
    {
        document.all['btSetTakeUser'].style.display = 'none';
    }
    else
    {
        document.all['btSetTakeUser'].style.display = '';
    }

    if (document.all.MoveSuccessed && document.all.MoveSuccessed.value == "YES")
        alert('移交完成');

    fnOtherSetClick("cbxDeleteRole")

}
//帶出移交人姓名
function fnGetEmpName(strUserFld, strUserNameFld, strPrivInfo)
{
    if (document.all[strUserFld].value == "")
    {
        document.all[strUserNameFld].value = "";
        return rtn;
    }

    var rtn = new RtnVal();
    var strUserId = document.all[strUserFld].value

    rtn = fnCheckUser(strUserId, strPrivInfo)

    if (rtn.bSuccess == true)
    {
        document.all[strUserNameFld].value = rtn.strMsg;//將姓名顯示出來
        return true;
    }
    else
    {
        alert(rtn.strErrMsg)
        document.all[strUserNameFld].value = "";
        document.all[strUserFld].value = "";
        return false;
    }
}
//帶出接管人姓名
function fnGetTakeName(strUserFld, strUserNameFld, strPrivInfo)
{

    if (document.all[strUserFld].value == "")
    {
        document.all[strUserNameFld].value = "";
        document.all["txOldTakeUser"].value = document.all[strUserFld].value;
        //1130105 Zen 1120722 二代升級
        ClearDL(document.all.ddlTakeUserRoleList);
        document.all["txTakeDeptNo"].value = "";
        document.all["txTakeDeptName"].value = "";
        return true;
    }
    //如果接管人沒有變動就不再檢核
    //1040831	Cloud	[1040614]-有可能切換角色 此段mark
    //if(document.all["txOldTakeUser"].value == document.all[strUserFld].value)
    //return true;

    var rtn = new RtnVal();
    var strUserId = document.all[strUserFld].value

    rtn = fnGetUserInfo(strUserId);

    if (rtn.bSuccess == false)
    {
        alert(rtn.strErrMsg)
        document.all[strUserNameFld].value = "";
        document.all[strUserFld].value = "";
        document.all["txTakeDeptNo"].value = "";
        document.all["txTakeDeptName"].value = "";
        document.all["txOldTakeUser"].value = "";
        //1130105 Zen 1120722 二代升級
		ClearDL(document.all.ddlTakeUserRoleList);
        return false
    }

    rtn = fnShowChooseDlg(rtn, strPrivInfo);

    if (rtn.bSuccess == true)
    {
        document.all[strUserNameFld].value = rtn.strMsg;//將姓名顯示出來
        //1130105 Zen 1120722 二代升級--begin
        //document.all["txTakeDeptNo"].value = rtn.rtnVal[0];
        //document.all["txTakeDeptName"].value = rtn.rtnVal[1];
        document.all["txTakeDeptNo"].value = "";
        document.all["txTakeDeptName"].value = "";
        //1130105 Zen 1120722 二代升級--end
        //記錄本次檢核的接管人
        document.all["txOldTakeUser"].value = document.all[strUserFld].value;
        //1040828	Cloud	[1040614] 增加紀錄接管角色
        document.all["H_TakeRole"].value = rtn.rtnVal[2];
        return true;
    }
    else
    {
        alert(rtn.strErrMsg)
        document.all[strUserNameFld].value = "";
        document.all[strUserFld].value = "";
        document.all["txTakeDeptNo"].value = "";
        document.all["txTakeDeptName"].value = "";
        document.all["txOldTakeUser"].value = "";
        //1040828	Cloud	[1040614] 增加紀錄接管角色
        document.all["H_TakeRole"].value = "";
        return false
    }
}
//設定接管人
function fnSetTakeUser()
{
    if (document.all["txTakeUser"].value == "")
    {
        alert("接管人不可為空白")
        return false;
    }
    if (document.all["txTakeUser"].value == document.all["txUser"].value)
    {
        alert("移交人與接管人不可相同")
        return false;
    }

    //1130105 Zen 1120722 二代升級
    //if (!fnGetTakeName("txTakeUser", "txTakeUserName", document.all["h_PrivInfo"].value))
    //    return false;



    var dgCount = document.all.dg1.rows.length
    var strTakeUser = document.all["txTakeUser"].value;
    var strTakeName = document.all["txTakeUserName"].value;

    //1130105 Zen 1120722 二代升級，配合選節結構調整資料取得方式--begin
    //var strDeptNo = document.all["txTakeDeptNo"].value;
    //var strDeptName = document.all["txTakeDeptName"].value;
    ////1040828	Cloud	[1040614]	增加判斷待核示公文增加檢核單位及長官
    //var strTakeRoleID = document.all["H_TakeRole"].value;
    let strText = document.all.ddlTakeUserRoleList.options[document.all.ddlTakeUserRoleList.selectedIndex].text;
    let strValue = document.all.ddlTakeUserRoleList.value;
    var strDeptNo = strValue.split('-')[0];
    var strDeptName = strText.split('-')[0];
    var strTakeRoleID = strValue.split('-')[1];
    //1130105 Zen 1120722 二代升級，配合選節結構調整資料取得方式--end

    if (dgCount < 2)
    {
        alert("請先執行查詢後，再設定接管人")
        return false;
    }

    var HadSet = false;
    //1040828	Cloud	[1040614]	增加判斷待核示公文增加檢核單位及長官
    var strCheckApp = "";

    for (var i = 2; i <= dgCount; i++)
    {
        if (document.all["dg1__ctl" + i + "_cbSelect"].checked)
        {
            //1040828	Cloud	[1040614]	增加判斷待核示公文增加檢核單位及長官
            var strUpOwnOuid = document.all["dg1__ctl" + i + "_H_txOwnOuid"].value.substring(0, 2);
            //1050511	Kenny	[1050204]	一併修正前單當狀態(待核示)後方因串上文號而未判斷到的問題
            //if(document.all["dg1__ctl" + i + "_lbNote"].innerText=="待核示")
            //1130105 Zen 1120722 二代升級
            //if (document.all["dg1__ctl" + i + "_lbNote"].innerText.indexOf("待核示") != -1)
            if (document.all["dg1__ctl" + i + "_lbNote"].textContent.indexOf("待核示") != -1)
            {
                if (document.all["dg1__ctl" + i + "_H_txOwnOuid"].value == strDeptNo || strUpOwnOuid == strDeptNo || strDeptNo.substring(0, 1) == "9")//接管單位同移交單位或是上層
                {
                    //設定角色大於目前流程擁有角色則可核可(代碼較小表示角色權職較大)-可核可
                    if (strTakeRoleID <= document.all["dg1__ctl" + i + "_H_txOwnRoleid"].value)
                    {
                        //1130105 Zen 1120722 二代升級--begin
                        //document.all["dg1__ctl" + i + "_txTakeId"].innerText = strTakeUser;//接管人帳號
                        //document.all["dg1__ctl" + i + "_txTakeDeptNo"].innerText = strDeptNo;//接管人單位
                        //document.all["dg1__ctl" + i + "_txTakeRoleID"].value = strTakeRoleID;//接管人角色
                        //document.all["dg1__ctl" + i + "_txTakeName"].innerText = strTakeName;
                        //document.all["dg1__ctl" + i + "_txTakeDeptName"].innerText = strDeptName;
                        document.all["dg1__ctl" + i + "_txTakeId"].value = strTakeUser;//接管人帳號
                        document.all["dg1__ctl" + i + "_txTakeDeptNo"].value = strDeptNo;//接管人單位
                        document.all["dg1__ctl" + i + "_txTakeRoleID"].value = strTakeRoleID;//接管人角色
                        document.all["dg1__ctl" + i + "_txTakeName"].value = strTakeName;
                        document.all["dg1__ctl" + i + "_txTakeDeptName"].value = strDeptName;
                        //1130105 Zen 1120722 二代升級--end

                        document.all["dg1__ctl" + i + "_cbSelect"].checked = false;
                    }
                    else
                    {
                        if (strCheckApp != "")
                            strCheckApp += ",";
                        //1130105 Zen 1120722 二代升級
                        //strCheckApp += "序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "、文號：" + document.all["dg1__ctl" + i + "_lbDocNo"].innerText + "、現行擁有角色大於接管角色";
                        strCheckApp += "序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "、文號：" + document.all["dg1__ctl" + i + "_lbDocNo"].textContent + "、現行擁有角色大於接管角色";
                    }

                }
                else
                {
                    if (strCheckApp != "")
                        strCheckApp += ",";

                    //1130105 Zen 1120722 二代升級
                    //strCheckApp += "序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "、文號：" + document.all["dg1__ctl" + i + "_lbDocNo"].innerText + "、接管單位與流程現行單位不同";
                    strCheckApp += "序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "、文號：" + document.all["dg1__ctl" + i + "_lbDocNo"].textContent + "、接管單位與流程現行單位不同";
                }
            }
            else
            {
                //1041005	Cloud 修正此處判斷，應該判斷接管人員角色
                //if(document.all["dg1__ctl" + i + "_H_txOwnRoleid"].value!="OD99")
                if (strTakeRoleID != "OD99")
                {
                    if (strCheckApp != "")
                        strCheckApp += ",";
                    //1130105 Zen 1120722 二代升級
                    //strCheckApp += "序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "、文號：" + document.all["dg1__ctl" + i + "_lbDocNo"].innerText + "、僅能移交給承辦人角色";
                    strCheckApp += "序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "、文號：" + document.all["dg1__ctl" + i + "_lbDocNo"].textContent + "、僅能移交給承辦人角色";
                }
                else
                {
                    //1130105 Zen 1120722 二代升級--begin
                    //document.all["dg1__ctl" + i + "_txTakeId"].innerText = strTakeUser;
                    //document.all["dg1__ctl" + i + "_txTakeName"].innerText = strTakeName;
                    //document.all["dg1__ctl" + i + "_txTakeDeptNo"].innerText = strDeptNo;
                    //document.all["dg1__ctl" + i + "_txTakeDeptName"].innerText = strDeptName;
                    document.all["dg1__ctl" + i + "_txTakeId"].value = strTakeUser;
                    document.all["dg1__ctl" + i + "_txTakeName"].value = strTakeName;
                    document.all["dg1__ctl" + i + "_txTakeDeptNo"].value = strDeptNo;
                    document.all["dg1__ctl" + i + "_txTakeDeptName"].value = strDeptName;
                    //1130105 Zen 1120722 二代升級--end
                    document.all["dg1__ctl" + i + "_cbSelect"].checked = false;
                }
            }
            HadSet = true;
        }
    }
    //1040828	Cloud	[1040614]	增加判斷待核示公文增加檢核單位及長官
    if (strCheckApp != "")
    {
        strCheckApp += ",不可移交,請更改接管帳號或接管單位(角色)。";
        alert(strCheckApp);
        return false;

    }

    if (HadSet == false)
    {
        alert("請先勾選要移交的公文")
        return false
    }

    return true;
}

//開啟人員帳號子視窗
function fnQueryUser(strUserFld, strUserNameFld, argType)
{
    Page_BlockSubmit = true;
    var rtn = new RtnVal();
    var ret = jf_ShowPersonDialog("");
    if (ret)
    {
        document.all[strUserFld].value = GetElement(ret, 0);
        var strPrivInfo = document.all["h_PrivInfo"].value;
        if (argType == "GetEmpName")
        {
            fnGetEmpName(strUserFld, strUserNameFld, strPrivInfo)
        }
        else
        {
            fnGetTakeName(strUserFld, strUserNameFld, strPrivInfo)
        }
    }
}


//檢核使用者是否有權限移交此帳號
function fnCheckUser(strUserId, strPrivInfo)
{
    var rtn = new RtnVal();
    rtn = fnGetUserInfo(strUserId);

    if (rtn.bSuccess == false)
        return rtn;

    rtn = fnChectPriv(rtn, strPrivInfo);
    return rtn;

}
//取得帳號之姓名，及其所扮演承辦人的角色資訊
function fnGetUserInfo(strUserId)
{
    var rtn = new RtnVal();
    rtn.bSuccess = true;
    rtn.strErrMsg = "";
    //1040826	Cloud	[1040614]	增加角色資訊
    //rtn.rtnVal = new Array(2);
    rtn.rtnVal = new Array(4);

    var arWSParam = new Array(2);
    arWSParam[0] = document.all["h_SourceOrgno"].value;
    arWSParam[1] = strUserId;
    var callObj = jf_CallWA("../EDLIB/EDWS.asmx", "GetAccountInfo", false, arWSParam);
    if (!callObj.error && callObj.value.m_bSuccess)
    {
        var objWsRtn = callObj.value;
        var DeptCount = objWsRtn.Count;
        var DeptNoList = new Array();
        var DeptNameList = new Array();
        //1040826	Cloud	[1040614]	增加角色資訊
        var RoleNoList = new Array();
        var RoleNameList = new Array();

        rtn.strMsg = objWsRtn.EmpName;//將姓名儲存起來

        //取得有承辦人角色的單位
        for (idx = 0; idx < DeptCount; idx++)
        {
            //1040826	Cloud	[1040614]	增加角色資訊-判斷待核示的公文移交增加判斷待核角色放入長官角色
            //if(objWsRtn.RoleNo[idx] == "OD99")
            //1040914	Cloud	[1040614]	因應增加長官可移轉待核示公文，新增模式不檢核角色
            if (jf_GetActionMode() != LayoutModeNew)
            {
                if (objWsRtn.RoleNo[idx] == "OD99" || document.all["H_txAppRole"].value.indexOf(objWsRtn.RoleNo[idx]) != -1)
                {
                    DeptNoList.push(objWsRtn.DeptNo[idx])
                    DeptNameList.push(objWsRtn.DeptName[idx])
                    //1040826	Cloud	[1040614]	增加角色資訊
                    RoleNoList.push(objWsRtn.RoleNo[idx]);
                    RoleNameList.push(objWsRtn.RoleName[idx]);

                }
            }
            else
            {
                DeptNoList.push(objWsRtn.DeptNo[idx])
                DeptNameList.push(objWsRtn.DeptName[idx])
                //1040826	Cloud	[1040614]	增加角色資訊
                RoleNoList.push(objWsRtn.RoleNo[idx]);
                RoleNameList.push(objWsRtn.RoleName[idx]);
            }
        }
        rtn.rtnVal[0] = DeptNoList;
        rtn.rtnVal[1] = DeptNameList;
        //1040826	Cloud	[1040614]	增加角色資訊
        rtn.rtnVal[2] = RoleNoList;
        rtn.rtnVal[3] = RoleNameList;

    }
    else
    {
        if (callObj.error)
            rtn.strErrMsg = callObj.errorDetail.string;
        else
            rtn.strErrMsg = callObj.value.m_strErrMsg;
    }

    if (rtn.strErrMsg != "")
    {
        rtn.bSuccess = false;
        return rtn;
    }
    if (rtn.rtnVal[0].length == 0)
    {
        rtn.bSuccess = false;
        rtn.strErrMsg = "此人無承辦人角色"
        return rtn;
    }
    else
    {
        return rtn;
    }
}
function fnOtherSetClick(cbxfld)
{
    if (document.all[cbxfld].checked)
    {
        if (cbxfld == "cbxDeleteRole")
        {
            document.all["cbxDisableAccount"].checked = false
            document.all["ddlNewDeptNo"].disabled = false;
        }
        else
        {
            document.all["cbxDeleteRole"].checked = false
            document.all["ddlNewDeptNo"].disabled = true;
        }
    }
    else
        document.all["ddlNewDeptNo"].disabled = true;
}

//檢核權限
function fnChectPriv(CheckObj, strPrivInfo)
{
    var rtn = "";
    var strDeptNo = document.all["h_DeptNo"].value;
    var strSectNo = document.all["h_SectNo"].value;

    if (strSectNo == "")
        strSectNo = strDeptNo;
    if (strDeptNo.length > 2)
        strDeptNo = strDeptNo.substring(0, 2);

    var arrDeptNoList = CheckObj.rtnVal[0];
    var arrLeagth = arrDeptNoList.length;
    switch (strPrivInfo)
    {
        case "0":
            //"可移交所有承辦人"
            break;
        case "1":
            rtn = "只可移交同組室人員公文"
            for (ArrIdx = 0; ArrIdx < arrLeagth; ArrIdx++)
            {
                if (arrDeptNoList[ArrIdx].indexOf(strDeptNo) != -1)
                    rtn = "";
            }
            break;
        case "2":
            rtn = "只可移交同科人員公文"
            for (ArrIdx = 0; ArrIdx < arrLeagth; ArrIdx++)
            {
                if (arrDeptNoList[ArrIdx] == strSectNo)
                    rtn = "";
            }
            break;
        case "3":
            rtn = "只可移交同科人員公文"
            for (ArrIdx = 0; ArrIdx < arrLeagth; ArrIdx++)
            {
                if (arrDeptNoList[ArrIdx] == strSectNo)
                    rtn = "";
            }
            break;
    }

    if (rtn == "")
    {
        CheckObj.bSuccess = true;
    }
    else
    {
        CheckObj.bSuccess = false;
        CheckObj.strErrMsg = rtn;
    }

    return CheckObj;
}
function fnShowChooseDlg(argRtn, strPrivInfo)
{
    var strDeptNo = document.all["h_DeptNo"].value;
    var strSectNo = document.all["h_SectNo"].value;

    if (strSectNo == "")
        strSectNo = strDeptNo;
    if (strDeptNo.length > 2)
        strDeptNo = strDeptNo.substring(0, 2);

    var rtn = "";
    var arrDeptNoList = argRtn.rtnVal[0];
    var arrDeptNameList = argRtn.rtnVal[1];
    //1040826	Cloud	[1040614]	增加回傳角色資訊
    var arrRoleNoList = argRtn.rtnVal[2];
    var arrRoleNameList = argRtn.rtnVal[3];
    var arrLeagth = arrDeptNoList.length;
    var CurrDeptNoList = new Array();
    var CurrDeptNameList = new Array();
    //1040826	Cloud	[1040614]	增加回傳角色資訊
    var CurrRoleNoList = new Array();
    var CurrRoleNameList = new Array();

    //依權限，將多餘的單位角色移除
    switch (strPrivInfo)
    {
        case "0":
            //可移交所有承辦人
            CurrDeptNoList = argRtn.rtnVal[0];
            CurrDeptNameList = argRtn.rtnVal[1];
            //1040826	Cloud	[1040614]	增加回傳角色資訊
            CurrRoleNoList = argRtn.rtnVal[2];
            CurrRoleNameList = argRtn.rtnVal[3];
            break;
        case "1":
            rtn = "只可移交同組室人員公文"
            for (ArrIdx = 0; ArrIdx < arrLeagth; ArrIdx++)
            {
                if (arrDeptNoList[ArrIdx].indexOf(strDeptNo) != -1)
                {
                    CurrDeptNoList.push(arrDeptNoList[ArrIdx]);
                    CurrDeptNameList.push(arrDeptNameList[ArrIdx]);
                    //1040826	Cloud	[1040614]	增加回傳角色資訊
                    CurrRoleNoList.push(arrRoleNoList[ArrIdx]);
                    CurrRoleNameList.push(arrRoleNameList[ArrIdx]);
                }
            }
            break;
        case "2":
            rtn = "只可移交同科人員公文"
            for (ArrIdx = 0; ArrIdx < arrLeagth; ArrIdx++)
            {
                if (arrDeptNoList[ArrIdx] == strSectNo)
                {

                    CurrDeptNoList.push(arrDeptNoList[ArrIdx]);
                    CurrDeptNameList.push(arrDeptNameList[ArrIdx]);
                    //1040826	Cloud	[1040614]	增加回傳角色資訊
                    CurrRoleNoList.push(arrRoleNoList[ArrIdx]);
                    CurrRoleNameList.push(arrRoleNameList[ArrIdx]);
                }
            }
            break;
        case "3":
            rtn = "只可移交同科人員公文"
            for (ArrIdx = 0; ArrIdx < arrLeagth; ArrIdx++)
            {
                if (arrDeptNoList[ArrIdx] == strSectNo)
                {
                    CurrDeptNoList.push(arrDeptNoList[ArrIdx]);
                    CurrDeptNameList.push(arrDeptNameList[ArrIdx]);
                    //1040826	Cloud	[1040614]	增加回傳角色資訊
                    CurrRoleNoList.push(arrRoleNoList[ArrIdx]);
                    CurrRoleNameList.push(arrRoleNameList[ArrIdx]);
                }
            }
            break;
    }

    argRtn.rtnVal[0] = CurrDeptNoList;
    argRtn.rtnVal[1] = CurrDeptNameList;
    //1040826	Cloud	[1040614]	增加回傳角色資訊
    argRtn.rtnVal[2] = CurrRoleNoList;
    argRtn.rtnVal[3] = CurrRoleNameList;
    if (CurrDeptNoList.length == 0)
    {
        argRtn.bSuccess = false;
        argRtn.strErrMsg = rtn;
    }
    //1130105 Zen 1120722 二代升級
    //else if (CurrDeptNoList.length > 1)
    //{
    //    var artifact = document.all.SsoArtifact.value;
    //    var sFeatures = "dialogWidth: 480px;dialogHeight:370px";
    //    var argUrl = "EDT241C1.ASPX?SAMLart=" + artifact
    //    var rtnfromwin = window.showModalDialog(argUrl, argRtn, sFeatures);
    //    if (rtnfromwin != null)
    //    {
    //        argRtn = rtnfromwin;
    //    }
    //    else
    //    {
    //        //若是直接關閉就取得第一個單位 
    //        argRtn.rtnVal[0] = CurrDeptNoList[0];
    //        argRtn.rtnVal[1] = CurrDeptNameList[0];
    //        //1040826	Cloud	[1040614]	增加回傳角色資訊
    //        argRtn.rtnVal[2] = CurrRoleNoList[0];
    //        argRtn.rtnVal[3] = CurrRoleNameList[0];
    //    }
    //}
    else
    {
        ClearDL(document.all.ddlTakeUserRoleList);
        for (var iRoles = 0; iRoles < CurrDeptNoList.length; iRoles++)
        {
            //1130105 Zen 1120722 二代升級，額外將角色資訊填入選單
            //var objOption = new Option(CurrDeptNameList[iRoles], CurrDeptNoList[iRoles]);
            var objOption = new Option(CurrDeptNameList[iRoles] + '-' + CurrRoleNameList[iRoles], CurrDeptNoList[iRoles] + '-' + CurrRoleNoList[iRoles]);
            document.all['ddlTakeUserRoleList'].options.add(objOption);
        }
    }
    return argRtn;
}

function GetElement(argStr, argIdx)
{
    var ss = argStr.split(SPLIT);
    return ss[argIdx];
}
function jf_ShowPersonDialog(argParam)
{
    jf_SaveCookie("nSearch", argParam);
    var artifact = document.all.SsoArtifact.value;
    var ret = jf_ShowModal("../../../II/IIC020.htm?SAMLart=" + artifact, "480", "370"); //回傳值：CN, displayName, Path
    return ret;
}


//1040826 Cloud	[1020969]	(merge)選擇彙併辦母文，子文一併勾選
//function jf_SelectComNo()
function jf_SelectComNo(argCb)
{
    //1040827	Cloud	[1040614]	修正母文打勾再取消子文還是維持打勾問題
    /*for (var iRow=2 ; iRow < document.all["dg1"].rows.length + 1 ; iRow++)
    {
        if ( document.all["dg1__ctl"+iRow+"_cbSelect"].checked && document.all["dg1__ctl"+iRow+"_txComNo"].value != "" && document.all["dg1__ctl"+iRow+"_txComType"].value == "1" )
        {
            for (var iRow2=iRow+1 ; iRow2 < document.all["dg1"].rows.length + 1 ; iRow2++)
            {
                if ( document.all["dg1__ctl"+iRow+"_txComNo"].value == document.all["dg1__ctl"+iRow2+"_txComNo"].value )
                    document.all["dg1__ctl"+iRow2+"_cbSelect"].checked = true ;
            }
        }
    }*/
    var pNo = argCb.substring(8, argCb.indexOf("_cbSelect"));
    //1050511	Kenny	[1050204]	一併修正前單未判斷流程擁有者導致自動勾選非主辦項目
    //var iNextIdx = ++pNo;
    var iNextIdx = parseInt(pNo, 10) + 1;
    if (document.all["dg1__ctl" + pNo + "_txComNo"] && document.all["dg1__ctl" + pNo + "_txComNo"].value != "")
    {
        //1050511	Kenny	[1050204]	一併修正前單未判斷流程擁有者導致自動勾選非主辦項目
        var strComOwnOuId = document.all["dg1__ctl" + pNo + "_H_txOwnOuid"].value;
        var strComOwnRoleId = document.all["dg1__ctl" + pNo + "_H_txOwnRoleid"].value;

        for (var iRow2 = iNextIdx; iRow2 < document.all["dg1"].rows.length + 1; iRow2++)
        {
            //1050511	Kenny	[1050204]	一併修正前單未判斷流程擁有者導致自動勾選非主辦項目
            var strNowOwnOuId = document.all["dg1__ctl" + iRow2 + "_H_txOwnOuid"].value;
            var strNowOwnRoleId = document.all["dg1__ctl" + iRow2 + "_H_txOwnRoleid"].value;

            //1050511	Kenny	[1050204]	一併修正前單未判斷流程擁有者導致自動勾選非主辦項目，擁有者單位角色相同才勾選
            //if ( document.all["dg1__ctl"+pNo+"_txComNo"].value == document.all["dg1__ctl"+iRow2+"_txComNo"].value )
            if (document.all["dg1__ctl" + pNo + "_txComNo"].value == document.all["dg1__ctl" + iRow2 + "_txComNo"].value
                && strComOwnOuId == strNowOwnOuId && strComOwnRoleId == strNowOwnRoleId)
            {
                if (document.all[argCb].checked)
                    document.all["dg1__ctl" + iRow2 + "_cbSelect"].checked = true;
                else
                    document.all["dg1__ctl" + iRow2 + "_cbSelect"].checked = false;
            }
        }
    }

}
//1040826	Cloud	[1040614]	增加單位科別選單
function dlDept_Change()
{
    var ddlDept = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value;
    //建立二級單位選單
    eajf_SetdlSectByUnitCode(ddlDept, "dlSect", false);
    //取得二級單位資訊，postback重建用
    document.all["H_Sect_AllValue"].value = edjf_SaveCurrDL(document.all["dlSect"]);
}
function dlSect_Change()
{
    var SectItem = document.all["dlSect"].options[document.all["dlSect"].selectedIndex];
    if (SectItem.value != "")
        document.all["H_Sect_Value"].value = SectItem.value;
    else
        document.all["H_Sect_Value"].value = "";
}

//1091211 Zen 1090893 修正無法一次移交多筆併案子文之問題
function DgSelect(argSelect)
{
    for (var i = 2; i < document.all['dg1'].rows.length + 1; i++)
    {
        if (document.all['dg1__ctl' + i + '_cbSelect'].disabled == false)
        {
            bCurrSelect = document.all['dg1__ctl' + i + '_cbSelect'].checked;

            if (argSelect != null)
                document.all['dg1__ctl' + i + '_cbSelect'].checked = argSelect;
            else
                document.all['dg1__ctl' + i + '_cbSelect'].checked = !bCurrSelect;

            jf_SelectComNo('dg1__ctl' + i + '_cbSelect');
        }
    }
}

//1130105 Zen 1120722 二代升級
function ClearDL(argObj)
{
    for (var i = 0; i < argObj.length; i++)
        argObj.remove(0);

    argObj.length = 0;
    return;
}