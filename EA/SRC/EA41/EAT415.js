/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1060620      Zen     1050087 二代升級 * 1110103      Zen     1101292 修正多次點擊重複PostBack之問題 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1060620 Zen 1050087 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060620 Zen 1050087 二代升級    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    if (document.all["StartField"])
    {
        var s = document.all["StartField"].value;
        if (s != "")
        {
            document.all["StartField"].value = "";
            jf_OpenSumDocWin2(s);
        }
    }
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060620 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060620 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題    if (IsServerHandling)    {        Page_BlockSubmit = true;        return;    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case "btSelectAll":
            var len = document.all["cbListDept"].rows.length;
            for (i = 0; i < len; i++)
            {
                var obj = document.all["cbListDept" + "_" + i];
                obj.checked = true;
            }
            Page_BlockSubmit = true;
            break;
        case "btReverse":
            var len = document.all["cbListDept"].rows.length;
            for (i = 0; i < len; i++)
            {
                var obj = document.all["cbListDept" + "_" + i];
                if (obj.checked)
                    obj.checked = false;
                else
                    obj.checked = true;
            }
            Page_BlockSubmit = true;
            break;
        case "btPLAN": //計畫批號提示
            Page_BlockSubmit = true;
            var pUrl = "";
            pUrl = "../EA40/EAT400C1.aspx";
            //1060620 Zen 1050087 二代升級            //jf_OpenChildWin(pUrl, "EAT400C1", 750, 500);
            jf_OpenChildWin(pUrl, "EAT400C1", 800, 600);
            break;
        case "btCancel2":
            Page_BlockSubmit = false;
            //1060626 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060620 Zen 1050087 二代升級//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題    if (IsServerHandling)    {        Page_BlockSubmit = true;        return;    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1060620 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1060620 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1060620 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCheck":
            Page_BlockSubmit = false;
            //1060620 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1060620 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060620 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            //1060620 Zen 1050087 二代升級            //document.all["txKeyFld"].focus();
            break;
        case "btSearch":
            //1060620 Zen 1050087 二代升級            Page_BlockSubmit = true;
            var strKeyCol = jf_Trim(document.all["txPLAN_NO"].value);
            var strUrl = "EAI415.aspx?rtnObj=lbReturnValue&PLAN_NO=" + strKeyCol;
            jf_OpenChildWin(strUrl, "EAI415", 800, 500);
            break;
        case "btPrint":
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1060620 Zen 1050087 二代升級            //jf_ToolBarSubmit();
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

    if (document.all["txPLAN_NO"].value == "")
    {
        strErrMsg += "清理批號不可空白\n";
        //1060620 Zen 1050087 二代升級        //document.all["txPLAN_NO"].focus();
        $('#txPLAN_NO').focus();
    }
    if (document.all["rbRtype1"].checked)
    {
        if (document.all["txNum"].value == "")
        {
            strErrMsg += "選擇抽樣筆數時，筆數欄位不可空白\n";
            //1060620 Zen 1050087 二代升級            //document.all["txNum"].focus();
            $('#txNum').focus();
        }
    }
    else if (document.all["rbRtype2"].checked)
    {
        if (document.all["txPercent"].value == "")
        {
            strErrMsg += "選擇抽樣比例時，比例欄位不可空白\n";
            //1060620 Zen 1050087 二代升級            //document.all["txPercent"].focus();
            $('#txPercent').focus();
        }
    }
    if (document.all["rbGroup"].checked && !document.all["cbDept"].checked && !document.all["cbYear"].checked)
    {
        strErrMsg += "選擇抽樣方式為逐單位或年度抽樣時，必需勾選至少承辦單位或年度\n";
        //1060620 Zen 1050087 二代升級        //document.all["cbDept"].focus();
        $('#cbDept').focus();
    }
    if ((document.all["txYearS"].value != "") && (document.all["txYearE"].value != ""))
    {
        if (document.all["txYearS"].value > document.all["txYearE"].value)
        {
            strErrMsg += "檔案年度起不可大於迄\n";
            //1060620 Zen 1050087 二代升級            //document.all["txYearS"].focus();
            $('#txYearS').focus();
        }
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
    if (argCallerId == "EAT400C1")
    {
        document.all["txPLAN_NO"].value = document.all["lbReturnValue"].options[0].value;
        //1060620 Zen 1050087 二代升級        //document.all["txPLAN_NO"].focus();
        $('#txPLAN_NO').focus();
        Page_BlockSubmit = true;
    }
    if (argCallerId == "EAI415")
    {
        document.all["txSampling_NO"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
        //		document.all["txPRIV_NAME"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
        //		document.all["txIN_USE"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
        //		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
        if (jf_Trim(document.all["txSampling_NO"].value) != "")
        {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
        //1060620 Zen 1050087 二代升級        //document.all["txSampling_NO"].focus();
        $('#txSampling_NO').focus();
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
function jf_OpenSumDocWin2(sUrl)
{
    //1060626 Zen 1050087 二代升級    //SampDetail = open(sUrl, "SampDetail", "fullscreen=no,Height=480,Width=900,Top=" + String((window.screen.height - 600) / 2) + ",Left=" + String((window.screen.width - 800) / 2) + ",Scrollbars=yes,titlebar=yes,status=yes,resizeable=no");
    SampDetail = open(sUrl, "SampDetail", "fullscreen=no,Height=768,Width=1024,Top=" + String((window.screen.height - 768) / 2) + ",Left=" + String((window.screen.width - 1024) / 2) + ",Scrollbars=yes,titlebar=yes,status=yes,resizeable=no");
    SampDetail.focus();

    //moveBy(screen.width,screen.height);
}
function Rtype1Click()
{
    //1060620 Zen 1050087 二代升級    //document.all["txNum"].focus();
    $('#txNum').focus();
}
function Rtype2Click()
{
    //1060620 Zen 1050087 二代升級    //document.all["txPercent"].focus();
    $('#txPercent').focus();
}
function NumFocus()
{
    document.all["rbRtype1"].checked = true;
    document.all["rbRtype2"].checked = false;
}
function PercentFocus()
{
    document.all["rbRtype1"].checked = false;
    document.all["rbRtype2"].checked = true;
}
function PADZERO(obj, num)
{
    if (obj.value != "")
    {
        obj.value = jf_PADL(obj.value, num, "0");
    }
}