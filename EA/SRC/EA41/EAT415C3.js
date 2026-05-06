/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2014.12.18   ClouD   1040846 註記選擇轉為紙本跳出訊息
 * 1060807      Zen     1050087 二代升級
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

//1060807 Zen 1050087 二代升級
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060807 Zen 1050087 二代升級
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次

    if (document.all["txClose"].value == "1" && document.all["txChild"].value == "1")
    {
        window.close();
    }

    cbclick_tx();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060807 Zen 1050087 二代升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060807 Zen 1050087 二代升級
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
//1060807 Zen 1050087 二代升級
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

    //1060807 Zen 1050087 二代升級
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckBeforOpen();
            //1060807 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {

                //2014.12.18   ClouD   1040846 註記選擇轉為紙本跳出訊息
                var seletValue = "";
                /*for (var i = 0; i < document.all["rbErrProce"].length; i++)
			    {
			        if (document.all["rbErrProce"] = true)
			        {
			            seletValue = document.all["rbErrProce"].options[i].value;
			            break;
			        }
			    }*/
                var radioButtons = document.getElementsByName("rbErrProce");
                for (var x = 0; x < radioButtons.length; x++)
                {
                    if (radioButtons[x].checked)
                    {
                        seletValue = radioButtons[x].value;
                        break;
                    }
                }
                if (seletValue == "4")
                {

                    if (window.confirm("請確認本文已轉製為紙本，再進行資料轉換"))//提醒是否覆蓋存檔
                    {
                        IsServerHandling = true;
                        jf_ShowWaitState();
                        Page_BlockSubmit = false;
                    }
                }
                else
                {
                    IsServerHandling = true;
                    jf_ShowWaitState();
                    Page_BlockSubmit = false;
                }
            }
            else
                Page_BlockSubmit = true;
            //1060807 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1060807 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060807 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            //1060807 Zen 1050087 二代升級
            //document.all["txKeyFld"].focus();
            break;
        case "btSearch":
            /*
			var strUrl = "";
			var strKeyCol = jf_Trim(document.all["txKeyFld"].value);
			var strMainTableCol1 = jf_Trim(document.all["txRequireFld"].value);
			var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
			var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));
			strUrl = "SII020.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1+"&argMainTableCol2="+strMainTableCol2+"&argMainTableCol3="+strMainTableCol3;
			jf_OpenChildWin(strUrl, "SII020", 700, 500 );
			*/
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPrint();
            //1060807 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1060807 Zen 1050087 二代升級
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
function jf_CheckBeforOpen()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (document.all["txSampling_NO"].value == "")
    {
        strErrMsg += "抽樣編號不可空白\n";
        //1060807 Zen 1050087 二代升級
        //document.all["txSampling_NO"].focus();
        $('#txSampling_NO').focus();
    }

    if (document.all["txDOC_NO"].value == "")
    {
        strErrMsg += "公文文號不可空白\n";
        //1060807 Zen 1050087 二代升級
        //document.all["txDOC_NO"].focus();
        $('#txDOC_NO').focus();
    }

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (!document.all["cbType1"].checked && !document.all["cbType2"].checked && !document.all["cbTypeZ"].checked)
    {
        strErrMsg += "必需至少勾選一種異常類別\n";
        //1060807 Zen 1050087 二代升級
        //document.all["cbType1"].focus();
        $('#cbType1').focus();
    }

    if (document.all["cbType1"].checked && document.all["txType1"].value == "")
    {
        strErrMsg += "在有勾選線上瀏覽異常下，相關異常訊息(原因)不可空白\n";
        //1060807 Zen 1050087 二代升級
        //document.all["txType1"].focus();
        $('#txType1').focus();
    }

    if (document.all["cbType2"].checked && document.all["txType2"].value == "")
    {
        strErrMsg += "在有勾選數位內容檢測異常下，相關異常訊息(原因)不可空白\n";
        //1060807 Zen 1050087 二代升級
        //document.all["txType2"].focus();
        $('#txType2').focus();
    }

    if (document.all["cbTypeZ"].checked && document.all["txTypeZ"].value == "")
    {
        strErrMsg += "在有勾選其他異常下，相關異常訊息(原因)不可空白\n";
        //1060807 Zen 1050087 二代升級
        //document.all["txTypeZ"].focus();
        $('#txTypeZ').focus();
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
function cbclick_tx()
{
    if (document.all["cbType1"].checked)
    {
        document.all["txType1"].className = "";
        document.all["txType1"].disabled = false;
    }
    else
    {
        document.all["txType1"].className = "displayOnly";
        document.all["txType1"].disabled = true;
    }

    if (document.all["cbType2"].checked)
    {
        document.all["txType2"].className = "";
        document.all["txType2"].disabled = false;
    }
    else
    {
        document.all["txType2"].className = "displayOnly";
        document.all["txType2"].disabled = true;
    }
    if (document.all["cbTypeZ"].checked)
    {
        document.all["txTypeZ"].className = "";
        document.all["txTypeZ"].disabled = false;
    }
    else
    {
        document.all["txTypeZ"].className = "displayOnly";
        document.all["txTypeZ"].disabled = true;
    }
}
//1041218 Cloud [1040846] 提供點選紙本時顯示路徑
function fnErrProce(argSelectvalue)
{
    if (argSelectvalue == "4")
    {
        document.all["lbFileInfo"].className = "";
    }
    else
    {
		//1080117	Kevin_C	---	修BUG
        //document.all["lbFileInfo"].className = "HIDE";
        document.all["lbFileInfo"].className = "hide";
    }
}
