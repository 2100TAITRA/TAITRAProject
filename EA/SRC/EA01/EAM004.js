/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人  單號	 概要
 * -------------------------------------------------------------------------------------------------
 * 95.12.14		whay    951267  版本代號改為3碼
 //1060321      Zen     1050087 二代公文修改
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

//1060321 Zen 1050087 二代公文修改//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/

function ClientOnLoad()
{
    //1060321 Zen 1050087 二代公文修改    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060321 Zen 1050087 二代公文修改//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060321 Zen 1050087 二代公文修改    //var xObjectName = document.activeElement.id;
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
        /*
		case "":
			break;
		*/
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060321 Zen 1050087 二代公文修改//function jf_ToolBarHandle()
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

    //1060321 Zen 1050087 二代公文修改    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            jf_txVer_No_Onblur();
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1060321 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            jf_txVer_No_Onblur();
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1060321 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            jf_txVer_No_Onblur();
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1060321 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060321 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            //1060321 Zen 1050087 二代公文修改            //document.all["txVer_No"].focus();
            $('#txVer_No').focus();
            break;
        case "btSearch":
            var strUrl = "EAC004.aspx";
            //1060321 Zen 1050087 二代公文修改            //jf_OpenChildWin(strUrl, "EAM004", 700, 500);
            jf_OpenChildWin(strUrl, "EAM004", 800, 600);
            break;
            /*	
            case "btPrint":
                Page_BlockSubmit = !jf_ConfirmPrint();
                jf_ToolBarSubmit();
                break;
            case "btPreview":
                Page_BlockSubmit = !jf_ConfirmPreview();
                jf_ToolBarSubmit();
                break;
                */
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

    if (jf_Trim(document.all["txVer_No"].value) == "")
    {
        strErrMsg += "版本代號欄位不可空白\n";
        //1060321 Zen 1050087 二代公文修改        //document.all["txVer_No"].focus();
        $('#txVer_No').focus();
    }
    else
    {
        //951267 版本代號改為3碼 by whay
        if (document.all["txVer_No"].value.length > 3)
        {
            strErrMsg += "版本代號長度不可超過3\n";
        }
    }

    if (jf_Trim(document.all["txVer_Desp"].value) != "")
    {
        if (document.all["txVer_Desp"].value.length > 60)
        {
            strErrMsg += "版本說明字元個數不可超過60\n";
        }
    }

    if (jf_Trim(document.all["dlUse_State"].value) == "1")
    {
        if (jf_Trim(document.all["txStart_Date"].value) == "")
        {
            strErrMsg += "啟用欄位不可空白\n";
            //1060321 Zen 1050087 二代公文修改            //document.all["txStart_Date"].focus();
            $('#txStart_Date').focus();
        }
        else
        {
            if (!jf_IsDATEValidate("txStart_Date"))
            {
                strErrMsg += "請輸入正確啟用日期\n";
            }
        }

        if (jf_Trim(document.all.txStop_Date.value) != "")
        {

            if (!jf_IsDATEValidate("txStop_Date"))
            {
                strErrMsg += "請輸入正確停用日期\n";
            }
        }
    }

    if (jf_Trim(document.all["dlUse_State"].value) == "0")
    {
        if (jf_Trim(document.all["txStart_Date"].value) == "")
        {
            strErrMsg += "啟用欄位不可空白\n";
            //1060321 Zen 1050087 二代公文修改            //document.all["txStart_Date"].focus();
            $('#txStart_Date').focus();
        }
        else
        {
            if (!jf_IsDATEValidate("txStart_Date"))
            {
                strErrMsg += "請輸入正確啟用日期\n";
            }
        }

        if (jf_Trim(document.all["txStop_Date"].value) == "")
        {
            strErrMsg += "停用欄位不可空白\n";
            //1060321 Zen 1050087 二代公文修改            //document.all["txStop_Date"].focus();
            $('#txStop_Date').focus();
        }
        else
        {
            if (!jf_IsDATEValidate("txStop_Date"))
            {
                strErrMsg += "請輸入正確停用日期\n";
            }
        }
    }

    if (jf_Trim(document.all["txStart_Date"].value) > jf_Trim(document.all["txStop_Date"].value) &&
                     jf_Trim(document.all["txStop_Date"].value) != "")
    {
        strErrMsg += "停用日期不可比起用日期早\n";
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

    if (argCallerId == "EAC004")
    {
        document.all["txVer_No"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
        if (document.all["txVer_No"].value != "")
        {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
        //1060321 Zen 1050087 二代公文修改        //document.all["txVer_No"].focus();
        $('#txVer_No').focus();
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
function jf_txVer_No_Onblur()
{
    var txObj = jf_Trim(document.all["txVer_No"].value);
    if (txObj.length > 0 && txObj.length < 2)
    {
        document.all["txVer_No"].value = jf_PADL(txObj, 2, "0");
    }
}

function jf_dlUse_State_Onchange()
{
    var strState = document.all.dlUse_State.value;

    if (strState == "1")
    {
        document.all.lbstartD.className = "RequireField";
        document.all.txStart_Date.className = "RequireField";
        document.all.lbStopD.className = "InputFieldLabel";
        document.all.txStop_Date.className = "InputFieldText";
    }
    else
    {
        document.all.lbstartD.className = "RequireField";
        document.all.txStart_Date.className = "RequireField";
        document.all.lbStopD.className = "RequireField";
        document.all.txStop_Date.className = "RequireField";
    }

}
function jf_IsDATEValidate(argName)
{
    // adapting for other layouts should be easy
    var argStr = jf_Trim(document.all[argName].value);
    if (argStr.length < 7)
    {
        argStr = jf_PADL(argStr, 7, '0');
        document.all[argName].value = "";
        return false;
    }
    var pYear, pMonth, pDay;
    pYear = parseInt(argStr.substring(0, 3), 10) + 1911;
    pMonth = parseInt(argStr.substring(3, 5), 10);
    pDay = parseInt(argStr.substring(5, 7), 10);

    if (!ValidDate(pYear, pMonth - 1, pDay))
    {
        document.all[argName].value = "";
        return false;
    }

    return true;
}

//補0
function CallPadFunc(strObjName)
{
    switch (strObjName)
    {
        case "txStart_Date":
        case "txStop_Date":
            if (document.all[strObjName].value != "")
                document.all[strObjName].value = jf_PADL(document.all[strObjName].value, 7, "0");
            break;
    }
}