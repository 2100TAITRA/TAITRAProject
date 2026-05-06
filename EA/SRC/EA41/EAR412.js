/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 106.03.29    Zen     1050087 二代公文修改
 * 1140702      Daniel  1140226 新增密等查詢條件，新增匯出Excel、ODS功能，新增退輔會專用報表、Excel、ODS
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

//1060329 Zen 1050087 二代公文修改//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//InitObj();[0970649]MArked by Cola , pageload時不需要initobj.
cbFM_onclick();

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060329 Zen 1050087 二代公文修改    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060329 Zen 1050087 二代公文修改//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060329 Zen 1050087 二代公文修改    //var xObjectName = document.activeElement.id;
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
        case "btKeyHelp": //計畫批號提示
            Page_BlockSubmit = true;
            var pUrl = "";
            pUrl = "../EA40/EAT400C1.aspx";
            //1060329 Zen 1050087 二代公文修改            //jf_OpenChildWin(pUrl, "EAT400C1", 800, 500);
            jf_OpenChildWin(pUrl, "EAT400C1", 800, 600);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060329 Zen 1050087 二代公文修改//function jf_ToolBarHandle()
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

    //1060329 Zen 1050087 二代公文修改    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        //1060329 Zen 1050087 二代公文修改        //case "btOpen":
        //    Page_BlockSubmit = !jf_CheckKeyObject();
        //    jf_ToolBarSubmit();
        //    break;
        //case "btSave":
        //    if (jf_ConfirmSave()) //是否通過儲存前必要檢查
        //    {
        //        IsServerHandling = true;
        //        jf_ShowWaitState();
        //        Page_BlockSubmit = false;
        //    }
        //    else
        //        Page_BlockSubmit = true;
        //    jf_ToolBarSubmit();
        //    break;
        //case "btDelete":
        //    Page_BlockSubmit = !jf_ConfirmDelete();
        //    jf_ToolBarSubmit();
        //    break;
        //case "btCancel":
        //    Page_BlockSubmit = !jf_ConfirmCancel();
        //    jf_ToolBarSubmit();
        //    break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            //1060329 Zen 1050087 二代公文修改            //document.all["txPlanNo"].focus();
            $('#txPlanNo').focus();
            InitObj();
            cbFM_onclick()
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
            if ((jf_Trim(document.all.txPlanNo.value) != "") || (document.all.dlStoreNo.selectedIndex != 0 && document.all.dlStoreNo.selectedIndex != -1) || ((jf_Trim(document.all.txYearS.value) != "") && (jf_Trim(document.all.txClsS.value) != "")) || ((jf_Trim(document.all.txYearE.value) != "") && (jf_Trim(document.all.txClsE.value) != "")))
            {
                Page_BlockSubmit = !jf_ConfirmPrint();
                //1060329 Zen 1050087 二代公文修改                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            else
            {


                if ((jf_Trim(document.all.txDateS.value) != "") || (jf_Trim(document.all.txDateE.value) != ""))
                {

                    Page_BlockSubmit = !jf_ConfirmPrint();
                    //1060329 Zen 1050087 二代公文修改                    //jf_ToolBarSubmit();
                    jf_ToolBarSubmit(xObjectName);
                }
                else
                {

                    //1060329 Zen 1050087 二代公文修改                    //document.all.txDateS.focus();
                    $('#txDateS').focus();
                    alert("請輸入註記日期或清理計畫，庫房，檔號其中一項!!")
                    Page_BlockSubmit = !jf_ConfirmPrint();
                }
            }
            break;
        case "btPreview":
        //1140702 Daniel  1140226  新增匯出Excel ODS
        case "btODS":
        case "btExcel":
            if ((jf_Trim(document.all.txPlanNo.value) != "") || (document.all.dlStoreNo.selectedIndex != 0 && document.all.dlStoreNo.selectedIndex != -1) || ((jf_Trim(document.all.txYearS.value) != "") && (jf_Trim(document.all.txClsS.value) != "")) || ((jf_Trim(document.all.txYearE.value) != "") && (jf_Trim(document.all.txClsE.value) != "")))
            {
                Page_BlockSubmit = !jf_ConfirmPreview();
                //1060329 Zen 1050087 二代公文修改                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            else
            {


                if ((jf_Trim(document.all.txDateS.value) != "") || (jf_Trim(document.all.txDateE.value) != ""))
                {

                    Page_BlockSubmit = !jf_ConfirmPreview();
                    //1060329 Zen 1050087 二代公文修改                    //jf_ToolBarSubmit();
                    jf_ToolBarSubmit(xObjectName);
                }
                else
                {

                    //1060329 Zen 1050087 二代公文修改                    //document.all.txDateS.focus();
                    $('#txDateS').focus();
                    alert("請輸入註記日期或清理計畫，庫房，檔號其中一項!!")
                    Page_BlockSubmit = !jf_ConfirmPreview();
                }
            }
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
//1060329 Zen 1050087 二代公文修改//function jf_ConfirmSave()
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

//儲存前之欄位檢查
//1060329 Zen 1050087 二代公文修改//function jf_CheckBeforSave()
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

//    if (strErrMsg != "")
//    {
//        bRtnbool = false;
//        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
//    }

//    return bRtnbool;
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

    if (argCallerId == "EAT400C1")
    {
        document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
        //1060329 Zen 1050087 二代公文修改        //document.all["txPlanNo"].focus();
        $('#txPlanNo').focus();
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
//檢核該清理批號是否存在
function CheckPlanNo()
{
    if (!jf_CheckDataExist("") && jf_Trim(document.all["txPlanNo"].value) != "")
    {
        Page_BlockSubmit = false;
        alert("此清理批號不存在");
        document.all["txPlanNo"].value = "";
        //1060329 Zen 1050087 二代公文修改        //document.all["txPlanNo"].focus();
        $('#txPlanNo').focus();
    }
}

//補0
function CallPadFunc(strObjName, argCount)
{
    switch (strObjName)
    {
        case "txYearS":
        case "txYearE":
        case "txDateS":
        case "txDateE":
            if (document.all[strObjName].value != "")
                document.all[strObjName].value = jf_PADL(document.all[strObjName].value, argCount, "0");
            break;
    }
    if (strObjName == "txDateS" || strObjName == "txDateE")
    {
        if (!jf_CheckCDATE(document.all[strObjName].value) && jf_Trim(document.all[strObjName].value) != "")
        {
            alert("輸入日期格式不正確，請檢查");
            document.all[strObjName].value = "";
        }
    }

}

function cbFM_onclick()
{
    if (document.all["USE_STOCK"].value != "1")
    {

        if (document.all["cbFM"].checked == true)
        {
            document.all["rb31"].disabled = true;
            document.all["rb32"].disabled = true;
            document.all["rb33"].disabled = true;
            //[0970649]Add by Cola 新增之stock一併設定
            document.all["rbGroup_Stock"].disabled = true;
        }
        if (document.all["cbFM"].checked == false)
        {
            document.all["rb31"].disabled = false;
            document.all["rb32"].disabled = false;
            document.all["rb33"].disabled = false;
            //[0970649]Add by Cola 新增之stock一併設定
            document.all["rbGroup_Stock"].disabled = false;
        }
    }

}

function InitObj()
{
    document.all["rb11"].checked = true;
    document.all["rb21"].checked = true;
    document.all["rb31"].checked = true;
    document.all["cbFM"].checked = true
}
