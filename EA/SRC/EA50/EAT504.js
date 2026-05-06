/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人  單號	概要
 * -------------------------------------------------------------------------------------------------
 * 95.12.08		whay    951284	刪除關聯資料前跳出警告訊息
 *100.02.23     Davis   0990662 增加小日曆 
 * 1060726      Zen     1050087 二代升級 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1060727 Zen 1050087 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060727 Zen 1050087 二代升級    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060727 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060727 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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
        //1060727 Zen 1050087 二代升級        //case "btDate":             //[0990662] davis   增加小日曆 
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all.txDate, event.screenX, event.screenY);
        //    break;
        case "btKeyHelp": //銷毀計畫		
            Page_BlockSubmit = true;
            var strUrl = "";
            strUrl = "EAT501C1.aspx";
            jf_OpenChildWin(strUrl, "EAT501C1", 700, 500);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060727 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1060727 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = false;//!jf_CheckKeyObject();
            //1060727 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            /*if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;*/
            Page_BlockSubmit = false;
            //1060727 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060727 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

        case "btSearch":
            Page_BlockSubmit = true;
            var strUrl = "";
            strUrl = "EAT501C1.aspx";
            jf_OpenChildWin(strUrl, "EAT501C1", 700, 500);
            break;
        case "btCancelDestroy":
            Page_BlockSubmit = false;
            //1060727 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            //951284刪除關聯性提醒  by whay 0951207
            if (jf_ConfirmDelete())
            {
                Page_BlockSubmit = false;
                //1060727 Zen 1050087 二代升級                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            else
            {
                Page_BlockSubmit = true;
                //1060727 Zen 1050087 二代升級                //document.all["txDPlan"].focus();
                $('#txDPlan').focus();
            }

            break;
            /*Page_BlockSubmit = false;
			jf_ToolBarSubmit();
			break;*/
            /*case "btPrint":
                Page_BlockSubmit = !jf_ConfirmPrint();
                jf_ToolBarSubmit();
                break;
            case "btPreview":
                Page_BlockSubmit = !jf_ConfirmPreview();
                jf_ToolBarSubmit();
                break;*/
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

    if (document.all["txDPlan"].value == "")
    {
        strErrMsg += "銷毀計畫不可空白\n";
        //1060727 Zen 1050087 二代升級        //document.all["txDPlan"].focus();
        $('#txDPlan').focus();
    }

    if (document.all["txNo"].value == "")
    {
        strErrMsg += "核准文號不可空白\n";
        //1060727 Zen 1050087 二代升級        //document.all["txNo"].focus();
        $('#txNo').focus();
    }

    if (document.all["txDate"].value == "")
    {
        strErrMsg += "銷毀日期不可空白\n";
        //1060727 Zen 1050087 二代升級        //document.all["txDate"].focus();
        $('#txDate').focus();
    }

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}
//951284刪除關聯性提醒  by whay 0951207
function jf_ConfirmDelete()
{
    return window.confirm("確定要將此檔案的關聯資料刪除？");
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

    if (argCallerId == "EAT501C1")
    {
        document.all["txDPlan"].value = document.all["lbReturnValue"].options[0].value;
        //1060727 Zen 1050087 二代升級        //document.all["txDPlan"].focus();
        $('#txDPlan').focus();
        //1060727 Zen 1050087 二代升級，查詢後執行開啟        jf_ToolBarSubmit("btOpen");    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//Davis     0990662   增加日期檢核
function ObjOnBlur(argObjName)
{
    switch (argObjName)
    {
        case "txDate":
            if (document.all.txDate.value != "")
            {
                CallPadFunc("txDate");
                if (!jf_CheckCDATE(document.all.txDate.value))
                {
                    alert("無效日期格式，請重新輸入")
                    //1060727 Zen 1050087 二代升級                    //document.all.txDate.focus();
                    $('#txDate').focus();
                }
            }
            break;
    }
}
//Davis     0990662   增加日期檢核
function CallPadFunc(strObjName)
{
    switch (strObjName)
    {
        case "txDate":
            if (document.all[strObjName].value != "")
                document.all[strObjName].value = jf_PADL(document.all[strObjName].value, 7, "0");
            break;
    }
}