/*
DATE 	 SA     PRG	    MGR_NO		DESC
1060105  David  Zen     1050087     二代公文修改
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

//指定DataGrid欄位
var strTableFields = new Array("_lbRead", "_txInput1", "_txInput2");

//1060105 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060105 Zen 1050087 二代公文修改
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060105 Zen 1050087 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060105 Zen 1050087 二代公文修改
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
        //1060105 Zen 1050087 二代公文修改
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
        case btHelp:
            /*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060105 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
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

    //1060105 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        //1060105 Zen 1050087 二代公文修改
        //case "btOpen":
        //	Page_BlockSubmit = !jf_CheckKeyObject();
        //	jf_ToolBarSubmit();
        //	break;
        case "btSave":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1060105 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //1060105 Zen 1050087 二代公文修改
            //case "btDelete":
            //	Page_BlockSubmit = !jf_ConfirmDelete();
            //	jf_ToolBarSubmit();
            //	break;
            //case "btCancel":
            //	Page_BlockSubmit = !jf_ConfirmCancel();
            //	jf_ToolBarSubmit();
            //	break;
            //case "btClean":
            //	Page_BlockSubmit = true;
            //	jf_ConfirmClean(true);
            //	document.all["txKeyFld"].focus();
            //	break;
        case "btSearch":
            Page_BlockSubmit = false;
            //1060105 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
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

            //1060105 Zen 1050087 二代公文修改
            //case "btPrint":
            //	Page_BlockSubmit = !jf_ConfirmPrint();
            //	jf_ToolBarSubmit();
            //	break;
            //case "btPreview":
            //	Page_BlockSubmit = !jf_ConfirmPreview();
            //	jf_ToolBarSubmit();
            //	break;

            //以下屬於DataGrid ToolBar
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
            //case "btDeleteSelected":
            //	Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
            //	jf_SelectBarSubmit();
            //	break;
            //case "btUp":
            //	Page_BlockSubmit = true;
            //	jf_RowUp("dg1", "_cbSelect", strTableFields);
            //	break;
            //case "btDown":
            //	Page_BlockSubmit = true;
            //	jf_RowDown("dg1", "_cbSelect", strTableFields);
            //	break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
    var bRtnbool = false;

    if (jf_CheckBeforSave())
        bRtnbool = true;

    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (!jf_CheckBlankAndAlert())
        bRtnbool = false;

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
    var strErrMsg = "";
    var InValidControlName = "";
    var bRtnbool = false;

    for (var i = 2; i <= document.all.dg1.rows.length; i++)
    {
        if (document.all["dg1__ctl" + i + "_cbSelect"].checked == true)
        {
            bRtnbool = true;
            break;
        }
    }
    if (!bRtnbool)
    {
        strErrMsg += "請先勾選要異動的公文。\n";
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
