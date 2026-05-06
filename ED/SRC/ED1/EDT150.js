/*
DATE	SA		PRG		MGR_NO			DESC
1131211 David   Cloud   1130983         依cdc版本新增共通版edt150
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



/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    if (document.all.Completed != null)
    {
        if (document.all.Completed.value.toUpperCase() == "Y")
		{
			var $dlg = parent.$("#ODC010_CLSNO_DIV");
			var $btn = $dlg.find("a#Dlg_close_btn");
			$btn.click();
		}
    }
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/

function ClientButtonControl(e)
{
    
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
            //1080521 Zen 1080378 二代升級
            //case "btDate":
            //    Page_BlockSubmit = true;
            //    jf_CallCalendar(document.all.txAttExfileDate, event.screenX, event.screenY);
            //    break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/

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

    
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            
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
            
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            var $btn = $dlg.find("a#Dlg_close_btn");
            $btn.click();
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
        bRtnbool = true;
    }

    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";
    
    if (document.all["txDocNo"].value == "")
    {
        strErrMsg += "公文文號不可空白\n";
        $('#txDocNo').focus();
    }

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

    var InValidControlName = "";
    var pMsg = "";

    var bNeedAttExtfileDate = false;

    for (var i = 2; i <= document.all.dg1.rows.length; i++)
    {
        var strdlMediaType = "dg1__ctl" + i + "_ddlMediaType";
        var strdlFileUnit = "dg1__ctl" + i + "_ddlFileUnit";
        var strdlFileType = "dg1__ctl" + i + "_ddlFileType";

        //附件名稱不為空白時
        if (jf_Trim(document.all["dg1__ctl" + i + "_txAttDesc"].value) != "")
        {
            var InValidName = "";
            
            //媒體型式不可空白
            if (document.all[strdlMediaType].options[document.all[strdlMediaType].selectedIndex].value == "")
            {
                InValidName += ",媒體型式不可空白";
                InValidControlName = strdlMediaType;
            }
            //數量不可空白
            if (document.all["dg1__ctl" + i + "_txFileCnt"].value == "")
            {
                InValidName += ",數量不可空白";
                InValidControlName = "dg1__ctl" + i + "_txFileCnt";
            }
            //計量單位不可空白
            if (document.all[strdlFileUnit].options[document.all[strdlFileUnit].selectedIndex].value == "")
            {
                InValidName += ",計量單位不可空白";
                InValidControlName = strdlFileUnit;
            }
            //歸檔否不可空白
            if (document.all[strdlFileType].options[document.all[strdlFileType].selectedIndex].value == "")
            {
                InValidName += ",歸檔否不可空白";
                InValidControlName = strdlFileType;
            }
            if (!bNeedAttExtfileDate)
            {
                if (document.all[strdlFileType].options[document.all[strdlFileType].selectedIndex].value == "3")
                    bNeedAttExtfileDate = true;
            }
            if ((bNeedAttExtfileDate) && jf_Trim(document.all["txAttExfileDate"].value) == "" && document.all[strdlFileType].options[document.all[strdlFileType].selectedIndex].value == "3")
            {
                InValidName += ",歸檔否為抽存續辦,故預計歸檔日期不可空白";
                InValidControlName = "txAttExfileDate";
            }
            if (InValidName != "")
            {
                InValidName = InValidName.substr(1, InValidName.length);
                pMsg += "序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName + "\n";
            }
        }
    }
    
    if (!bNeedAttExtfileDate)
        document.all["txAttExfileDate"].value = "";
    if (pMsg != "")
    {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([pMsg])), "");
    
        $('#' + InValidControlName).focus();
        return false;
    }
    return true;
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
            //document.all["txDocNo"].value = jf_Trim(argResult.value.RtnStr);
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
		document.all["txDocNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txDocNo"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txDocNo"].focus();
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
//日期onblur
function CheckDate(argObj, strMsg)
{
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
            if (strMsg != "")
                jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            else
                jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["日期格式有誤"])), "");
            
            $('#' + argObj).focus();
            return false;
        }
    }
    return true;

}

