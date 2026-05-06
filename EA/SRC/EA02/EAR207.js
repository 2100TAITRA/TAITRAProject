/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* 程式修改歷程 
* -------------------------------------------------------------------------------------------------
* 日期			系統分析師	修改人	單號			概要
* -------------------------------------------------------------------------------------------------
* 1070124       Kevin_C     Zen     1050087         二代升級
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

//1070123 Zen 1050087 二代升級
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1070123 Zen 1050087 二代升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1070123 Zen 1050087 二代升級
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

    switch (xObjectName)
    {
        //1070123 Zen 1050087 二代升級
        //case "ibFileDateS":
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all["txFileDateS"], event.screenX, event.screenY);
        //    break;
        //case "ibFileDateE":
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all["txFileDateE"], event.screenX, event.screenY);
        //    break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1070123 Zen 1050087 二代升級
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

    //1070123 Zen 1050087 二代升級
    //xObjectName = window.event.srcNode.getAttribute("ID");
    var xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btPrint":
            Page_BlockSubmit = !CheckBeforePrint();
            //1070123 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !CheckBeforePrint();
            //1070123 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
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


/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforePrint()
{
    var strDateS = jf_Trim(document.all.txFileDateS.value);//發文日期起
    var strDateE = jf_Trim(document.all.txFileDateE.value);//發文日期迄
    var bRtn = true;

    if (!CheckDATE("txFileDateS", "點收日期(起)"))
    {
        bRtn = false;
        //1070123 Zen 1050087 二代升級
        //document.all.txFileDateS.focus();
        $('#txFileDateS').focus();
        return;
    }
    if (!CheckDATE("txFileDateE", "點收日期(迄)"))
    {
        bRtn = false;
        //1070123 Zen 1050087 二代升級
        //document.all.txFileDateE.focus();
        $('#txFileDateE').focus();
        return;
    }
    if (strDateS != "" && strDateE != "" && strDateS > strDateE)
    {
        document.all.txFileDateE.value = strDateS;
        document.all.txFileDateS.value = strDateE;
    }
    if (strDateS == "" && strDateE != "")
    {
        document.all.txFileDateS.value = strDateE;

    }
    if (strDateS != "" && strDateE == "")
    {
        document.all.txFileDateE.value = strDateS;
    }
    if (strDateS == "" && strDateE == "")
    {
        alert("點收日期不可空白");
        //1070123 Zen 1050087 二代升級
        //document.all.txFileDateS.focus();
        $('#txFileDateS').focus();
        bRtn = false;
        return;
    }


    return bRtn;
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
            //1070123 Zen 1050087 二代升級
            //document.all[argObj].focus();
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
