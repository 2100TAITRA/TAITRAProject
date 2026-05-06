/*
DATE 	SA		PRG		MGR_NO	DESC
1040921	CLOUD	CLOUD	1040614	因方案未考量無核可權長官移交部分，取消檢核核可權相關檢核
1120424 Cloud   Zen     1120211 二代升級
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

//1120424 Zen 1120211 二代升級
////指定DataGrid欄位
//var strTableFields = new Array("_lbRead", "_txInput1", "_txInput2");

//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if (document.all.dg1)
//    document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

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
function ClientOnLoad()
{

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

}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1120424 Zen 1120211 二代升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1120424 Zen 1120211 二代升級
    //var xObjectName = document.activeElement.id;
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

        //1120424 Zen 1120211 二代升級
        //以下屬於DataGrid ToolBar
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
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1120424 Zen 1120211 二代升級
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

    //1120424 Zen 1120211 二代升級
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1120424 Zen 1120211 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSearch":
            if (ConfirmSearch()) //查詢前檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1120424 Zen 1120211 二代升級
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
            //1120424 Zen 1120211 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1120424 Zen 1120211 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1120424 Zen 1120211 二代升級
        ////以下屬於DataGrid ToolBar
        //case "btSelectAll":
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
    }
}

//1120424 Zen 1120211 二代升級
///********** 以下為按下儲存鍵後相關處理 **********/
////儲存前檢查
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

    //1120424 Zen 1120211 二代升級
    if (argCallerId == "EDT241C1")
    {
        //1120424 Zen 1120211 二代升級，以CallBack改寫
        if (rtn.bSuccess == true)
        {
            //document.all[strUserNameFld].value = rtn.strMsg;//將姓名顯示出來
            document.all["txTakeDeptNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
            document.all["txTakeDeptName"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
            document.all["txTakeRoleNo"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
            document.all["txTakeRoleName"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
            document.all["txTakeUserName"].value = jf_Trim(document.all.lbReturnValue.options[4].value);
            return true;
        }
        else
        {
            alert(rtn.strErrMsg)
            document.all['txUserName'].value = "";
            document.all['txUser'].value = "";
            document.all["txTakeDeptNo"].value = "";
            document.all["txTakeDeptName"].value = "";
            document.all["txTakeRoleNo"].value = "";
            document.all["txTakeRoleName"].value = "";
            return false
        }
    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
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
//取得輸入帳號的所有角色資訊
function fnGetUserInfo(strUserId, strType)
{
    var rtn = new RtnVal();
    rtn.bSuccess = true;
    rtn.strErrMsg = "";
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
        var RoleNoList = new Array();
        var RoleNameList = new Array();

        rtn.strMsg = objWsRtn.EmpName;//將姓名儲存起來

        //取得角色大於"最小核可角色"的角色
        for (idx = 0; idx < DeptCount; idx++)
        {
            if (strType == "TAKEUSER")//接管人ONBLUR才需要過濾
            {
                if (document.all["CurrRoleId"].value != "")//查詢過才有值，沒查詢過不進行過濾
                {
                    //1040921	CLOUD	1040614	因方案未考量無核可權長官移交部分，取消檢核核可權相關檢核
                    //if(objWsRtn.RoleNo[idx]<=document.all["CurrRoleId"].value)
                    //{
                    DeptNoList.push(objWsRtn.DeptNo[idx]);
                    DeptNameList.push(objWsRtn.DeptName[idx]);
                    RoleNoList.push(objWsRtn.RoleNo[idx]);
                    RoleNameList.push(objWsRtn.RoleName[idx]);
                    //}
                }
                else
                {
                    DeptNoList.push(objWsRtn.DeptNo[idx]);
                    DeptNameList.push(objWsRtn.DeptName[idx]);
                    RoleNoList.push(objWsRtn.RoleNo[idx]);
                    RoleNameList.push(objWsRtn.RoleName[idx]);
                }
            }
            else
            {
                DeptNoList.push(objWsRtn.DeptNo[idx]);
                DeptNameList.push(objWsRtn.DeptName[idx]);
                RoleNoList.push(objWsRtn.RoleNo[idx]);
                RoleNameList.push(objWsRtn.RoleName[idx]);
            }
        }
        rtn.rtnVal[0] = DeptNoList;
        rtn.rtnVal[1] = DeptNameList;
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
        rtn.strErrMsg = "此人無扮演角色"
        return rtn;
    }
    else
    {
        return rtn;
    }
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
        return true;
    }

    //1120424 Zen 1120211 二代升級，改為全域變數傳遞至子視窗
    //var rtn = new RtnVal();
    var strUserId = document.all[strUserFld].value

    rtn = fnGetUserInfo(strUserId, "TAKEUSER");

    if (rtn.bSuccess == false)
    {
        alert(rtn.strErrMsg)
        document.all[strUserNameFld].value = "";
        document.all[strUserFld].value = "";
        document.all["txTakeDeptNo"].value = "";
        document.all["txTakeDeptName"].value = "";
        document.all["txTakeRoleNo"].value = "";
        document.all["txTakeRoleName"].value = "";
        return false
    }

    rtn = fnShowChooseDlg(rtn, strPrivInfo);

    //1120424 Zen 1120211 二代升級，以CallBack改寫
    //if (rtn.bSuccess == true)
    //{
    //    document.all[strUserNameFld].value = rtn.strMsg;//將姓名顯示出來
    //    document.all["txTakeDeptNo"].value = rtn.rtnVal[0];
    //    document.all["txTakeDeptName"].value = rtn.rtnVal[1];
    //    document.all["txTakeRoleNo"].value = rtn.rtnVal[2];
    //    document.all["txTakeRoleName"].value = rtn.rtnVal[3];
    //    return true;
    //}
    //else
    //{
    //    alert(rtn.strErrMsg)
    //    document.all[strUserNameFld].value = "";
    //    document.all[strUserFld].value = "";
    //    document.all["txTakeDeptNo"].value = "";
    //    document.all["txTakeDeptName"].value = "";
    //    document.all["txTakeRoleNo"].value = "";
    //    document.all["txTakeRoleName"].value = "";
    //    return false
    //}
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

    var dgCount = document.all.dg1.rows.length

    if (dgCount < 2)
    {
        alert("請先執行查詢後，再設定接管人")
        return false;
    }
    var CheckMessage = CheckCanApp();
    if (CheckMessage != "")
    {
        alert(CheckMessage + ",無核可權,請更改接管帳號或接管角色。");
    }
    return true;
}

function CheckCanApp()
{
    var bHaSappRole = false;
    var HadSet = false;
    var strRtnmessage = "";

    var strTakeUser = document.all["txTakeUser"].value;
    var strTakeName = document.all["txTakeUserName"].value;
    var strDeptNo = document.all["txTakeDeptNo"].value;
    var strDeptName = document.all["txTakeDeptName"].value;
    var strRoleNo = document.all["txTakeRoleNo"].value;
    var strRoleName = document.all["txTakeRoleName"].value;


    for (var i = 2; i <= document.all.dg1.rows.length; i++)
    {
        if (document.all["dg1__ctl" + i + "_cbSelect"].checked)
        {
            //檢核接管角色
            var el = document.getElementById("dg1__ctl" + i + "_dlEnableInfo");
            for (var iRole = 0; iRole < el.options.length; iRole++) 
            {
                //1040921	CLOUD	1040614	因方案未考量無核可權長官移交部分，取消檢核核可權相關檢核
                //if(el.options[iRole].value.split('|')[1] == strRoleNo)//設定角色存在FLOW_SET可核可選單中
                //{
                //設定角色小於目前流程擁有角色則不可核可(代碼較大表示角色權職較小)-不可核可
                if (strRoleNo > document.all["dg1__ctl" + i + "_H_txOwnRoleid"].value)
                {
                    if (strRtnmessage != "")
                        strRtnmessage += ",";

                    strRtnmessage += "序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "-" + document.all["dg1__ctl" + i + "_lbSubFolder"].innerText + "現行擁有角色大於接管角色";
                    bHaSappRole = false;
                    break;
                }
                //設定角色大於目前流程擁有角色則可核可(代碼較小表示角色權職較大)-可核可
                else if (strRoleNo < document.all["dg1__ctl" + i + "_H_txOwnRoleid"].value)	
                {
                    bHaSappRole = true;
                    break;
                }
                else if (strRoleNo == document.all["dg1__ctl" + i + "_H_txOwnRoleid"].value)	
                {
                    //相同時時 判斷目前角色在FLOW_SET是否有設定OUID；有設定OUID時是否與接管人角色相同
                    if (el.options[iRole].value.split('|')[0] == "" || el.options[iRole].value.split('|')[0] == strDeptNo)//可核可角色OU_ID為空白或是與目前設定角色相同
                    {
                        bHaSappRole = true;
                        break;
                    }
                    else
                    {
                        if (strRtnmessage != "")
                            strRtnmessage += ",";

                        strRtnmessage += "序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "-" + document.all["dg1__ctl" + i + "_lbSubFolder"].innerText;

                        bHaSappRole = false;
                        break;
                    }
                }
                //}

            }
            if (bHaSappRole)
            {
                document.all["dg1__ctl" + i + "_txTakeId"].value = strTakeUser
                document.all["dg1__ctl" + i + "_txTakeName"].value = strTakeName
                document.all["dg1__ctl" + i + "_txTakeOuid"].value = strDeptNo
                document.all["dg1__ctl" + i + "_txTakeDeptName"].value = strDeptName
                document.all["dg1__ctl" + i + "_cbSelect"].checked = false;
                document.all["dg1__ctl" + i + "_txTakeRoleId"].value = strRoleNo;
                document.all["dg1__ctl" + i + "_txTakeRoleName"].value = strRoleName;
            }
            else
            {
                if (strRtnmessage != "")
                    strRtnmessage += ",";
                strRtnmessage += "序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "-" + document.all["dg1__ctl" + i + "_lbSubFolder"].innerText;
            }
            HadSet = true;
        }
    }

    if (HadSet == false)
    {
        strRtnmessage = "請先勾選要移交的公文";
        return strRtnmessage;
    }
    return strRtnmessage;
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
    rtn = fnGetUserInfo(strUserId, "USER");

    if (rtn.bSuccess == false)
        return rtn;

    rtn = fnChectPriv(rtn, strPrivInfo);
    return rtn;

}
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
    var arrRoleNoList = argRtn.rtnVal[2];
    var arrRoleNameList = argRtn.rtnVal[3];
    var arrLeagth = arrDeptNoList.length;
    var CurrDeptNoList = new Array();
    var CurrDeptNameList = new Array();
    var CurrRoleNoList = new Array();
    var CurrRoleNameList = new Array();

    //依權限，將多餘的單位角色移除
    switch (strPrivInfo)
    {
        case "0":
            //可移交所有承辦人
            CurrDeptNoList = argRtn.rtnVal[0];
            CurrDeptNameList = argRtn.rtnVal[1];
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
                    CurrRoleNoList.push(arrRoleNoList[ArrIdx]);
                    CurrRoleNameList.push(arrRoleNameList[ArrIdx]);
                }
            }
            break;
    }

    argRtn.rtnVal[0] = CurrDeptNoList;
    argRtn.rtnVal[1] = CurrDeptNameList;
    argRtn.rtnVal[2] = CurrRoleNoList;
    argRtn.rtnVal[3] = CurrRoleNameList;
    if (CurrDeptNoList.length == 0)
    {
        argRtn.bSuccess = false;
        argRtn.strErrMsg = rtn;
    }
    else if (CurrDeptNoList.length > 1)
    {
        var artifact = document.all.SsoArtifact.value;
        var sFeatures = "dialogWidth: 480px;dialogHeight:370px";
        var argUrl = "EDT241C1.ASPX?SAMLart=" + artifact
        //1120424 Zen 1120211 二代升級
        //var rtnfromwin = window.showModalDialog(argUrl, argRtn, sFeatures);
        var rtnfromwin = jf_OpenChildWin(argUrl, '', 'width=480, height=370');

        //1120424 Zen 1120211 二代升級
        rtnfromwin.argRtn = argRtn;

        //1120424 Zen 1120211 二代升級
        //if (rtnfromwin != null)
        //{
        //    argRtn = rtnfromwin;
        //}
        //else
        //{
        //    //若是直接關閉就取得第一個單位 
        //    argRtn.rtnVal[0] = CurrDeptNoList[0];
        //    argRtn.rtnVal[1] = CurrDeptNameList[0];
        //    argRtn.rtnVal[2] = CurrRoleNoList[0];
        //    argRtn.rtnVal[3] = CurrRoleNameList[0];
        //}
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
    //1120424 Zen 1120211 二代升級
    //var ret = jf_ShowModal("../../../II/IIC020.htm?SAMLart=" + artifact, "480", "370"); //回傳值：CN, displayName, Path
    var ret = jf_ShowModal("../../../IF/IF1/IFC020.htm?SAMLart=" + artifact, 800, 600); //回傳值：CN, displayName, Path
    return ret;
}
//查詢前檢查
function ConfirmSearch()
{
    var bRtnbool = false;

    if (CheckBeforSearch())
    {
        bRtnbool = true;
    }

    return bRtnbool;
}

//查詢前之欄位檢查
function CheckBeforSearch()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (document.all["txUser"].value == "")
    {
        strErrMsg += "移交人不可空白\n";
        document.all["txUser"].focus();
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
    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}
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
            break;
        }
    }

    if (bRtnbool == false)
        alert("尚未設定接管人，請先完成接管人設定後再移交。")

    return bRtnbool;
}