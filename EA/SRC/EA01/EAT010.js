/*
DATE 	    SA		PRG		MGR_NO		DESC
1070426     Cloud   Zen     1070222     二代升級
1080906		Zen		Zen		1080777		由內政部特別版Merge 1070222至共通版
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

//1070426 Zen 1070222 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1070426 Zen 1070222 二代升級    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次

    if (document.all["H_Check"].value != "")
    {
        alert("儲存成功");
        document.all["H_Check"].value = "";
    }
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1070426 Zen 1070222 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1070426 Zen 1070222 二代升級    //var xObjectName = document.activeElement.id;
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
//1070426 Zen 1070222 二代升級//function jf_ToolBarHandle()
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

    //1070426 Zen 1070222 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        /*case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			jf_ToolBarSubmit();
			break;*/
        case "btSave":
            PADZERO(document.all["txOldYear"], 3);
            PADZERO(document.all["txNewYear"], 3);
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1070426 Zen 1070222 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            /*case "btDelete":
                Page_BlockSubmit = !jf_ConfirmDelete();
                jf_ToolBarSubmit();
                break;
            case "btCancel":
                Page_BlockSubmit = !jf_ConfirmCancel();
                jf_ToolBarSubmit();
                break;
            case "btClean":
                Page_BlockSubmit = true;
                jf_ConfirmClean(true);
                document.all["txKeyFld"].focus();
                break;
            case "btSearch":
                var strUrl = "";
                var strKeyCol = jf_Trim(document.all["txKeyFld"].value);
                var strMainTableCol1 = jf_Trim(document.all["txRequireFld"].value);
                var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
                var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));
                strUrl = "SII020.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1+"&argMainTableCol2="+strMainTableCol2+"&argMainTableCol3="+strMainTableCol3;
                jf_OpenChildWin(strUrl, "SII020", 700, 500 );
                break;
            case "btPrint":
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
        /*if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist(""))//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
		else*/
        bRtnbool = true;
    }

    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (document.all["txOldYear"].value == "")
    {
        strErrMsg += "舊年度不可空白\n";
        //1070426 Zen 1070222 二代升級        //document.all["txOldYear"].focus();
        $('#txOldYear').focus();
    }

    if (document.all["txNewYear"].value == "")
    {
        strErrMsg += "新年度不可空白\n";
        //1070426 Zen 1070222 二代升級        //document.all["txNewYear"].focus();
        $('#txNewYear').focus();
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
//年度開頭自動補0
function PADZERO(obj, num)
{
    if (obj.value != "")
    {
        obj.value = jf_PADL(obj.value, num, "0");
    }
}