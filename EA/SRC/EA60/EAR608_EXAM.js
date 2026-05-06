/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人  單號		概要
 * -------------------------------------------------------------------------------------------------
 *1110401       Cloud   1101536     新增此作業
 
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



/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
    
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
        case "btHelp": //計畫批號提示
            Page_BlockSubmit = true;
            var pUrl = "";
            pUrl = "../EA40/EAT400C1.aspx";
            jf_OpenChildWin(pUrl, "EAT400C1", 800, 500);
            break;
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
        case "btPrint":
            if (CheckBeforePrint())
            {
                Page_BlockSubmit = !jf_ConfirmPrint();
                jf_ToolBarSubmit(xObjectName);
            }
            else
                Page_BlockSubmit = true;
            break;
        case "btPreview":
            if (CheckBeforePrint())
            {
                Page_BlockSubmit = !jf_ConfirmPreview();
                jf_ToolBarSubmit(xObjectName);
            }
            else
                Page_BlockSubmit = true;
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
    var strErrMsg;
    //清理計畫存不存在檢查
    if (argResult.id == wsCheckPlanID)
    {
        if (argResult.value.m_bSuccess)
        {
            
            if (argResult.value.RtnField0 != "000100")
            {
                Page_BlockSubmit = true;
                strErrMsg = "非移轉批號。";
                $('#txPlanNo').focus();
                jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
            }
        }
        else
        {
            Page_BlockSubmit = true;
            strErrMsg = "無此批號";
            $('#txTPlan').focus();
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
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

    if (argCallerId == "EAT400C1")
    {
        document.all["txTPlan"].value = document.all["lbReturnValue"].options[0].value;
        $('#txTPlan').focus();
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
var wsCheckPlanID;
function txPlanNo_onblur()
{
   
    var arKeyName = new Array(1);
    var arKeyValue = new Array(1);
    var arRtnFldName = new Array(1);
    var arOrdFldName = new Array(1);

    if (!IsServerHandling)
    {
        if (jf_Trim(document.all["txTPlan"].value) != "")
        {
            Page_BlockSubmit = true;

            arKeyName[0] = "PLAN_NO";
            arKeyValue[0] = jf_Trim(document.all["txTPlan"].value);
            arRtnFldName[0] = "PLAN_TYPE";
            arOrdFldName[0] = "PLAN_NO";

            var arWSParam = new Array(5);
            arWSParam[0] = "PLAN_MAIN";
            arWSParam[1] = arKeyName;
            arWSParam[2] = arKeyValue;
            arWSParam[3] = arRtnFldName;
            arWSParam[4] = arOrdFldName;
            callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, arWSParam);

            wsCheckPlanID = callObj.id;
            OnWSResult(callObj);
        }
    }
}

/*var wsGetTypeID;
function CheckIsTransfer()
{
    var arKeyName = new Array(1);
    var arKeyValue = new Array(1);
    var arRtnFldName = new Array(1);
    var arOrdFldName = new Array(1);

    if (!IsServerHandling)
    {
        if (document.all["txTPlan"].value != "")
        {
            Page_BlockSubmit = true;

            arKeyName[0] = "PLAN_NO";
            arKeyValue[0] = document.all["txTPlan"].value;
            arRtnFldName[0] = "PLAN_TYPE";
            arOrdFldName[0] = "PLAN_NO";

            var arWSParam = new Array(5);
            arWSParam[0] = "PLAN_MAIN";
            arWSParam[1] = arKeyName;
            arWSParam[2] = arKeyValue;
            arWSParam[3] = arRtnFldName;
            arWSParam[4] = arOrdFldName;
            callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, arWSParam);

            wsGetTypeID = callObj.id;
            OnWSResult(callObj);
        }
    }
}*/
//補0


function CheckBeforePrint()
{
    var ErrMsg = "";
    if (document.all["txTPlan"].value == "")
        ErrMsg = "移轉批號不可空白\n";
    else
    {
        txPlanNo_onblur();
    }
    if (ErrMsg != "")
    {
        alert(ErrMsg);
        return false;
    }
    else
        return true;
}