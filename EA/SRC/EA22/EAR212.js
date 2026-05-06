/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* ---------------------------------------------------------------------------------------------
* 日期		SA		修改人		單號		摘要
* ---------------------------------------------------------------------------------------------
* 1030305	Cloud	Kenny		1030051		新增程式
* 1071008   Cloud   Zen         1050087 二代升級* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1071008 Zen 1050087 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

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
//1071008 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1071008 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1071008 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1071008 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            document.all["rbOrderFileNo"].checked = true;
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_CheckBeforeSearch();
            //1071008 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_CheckBeforeSearch();
            //1071008 Zen 1050087 二代升級            //jf_ToolBarSubmit();
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
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
// 查詢前之欄位檢查
function jf_CheckBeforeSearch()
{
    var temp;
    var bRtnbool = true;
    var strErrMsg = "";

    if (document.all.txFileYear.value == "" && document.all.txFileCls.value == "" && document.all.txFileCase.value == "" && document.all.txFileVol.value == "" &&
		document.all.txDocNo1.value == "" && document.all.txDocNo2.value == "" && document.all.txLocation1.value == "" && document.all.txLocation2.value == "")
    {
        strErrMsg += "查詢條件不可皆為空白\n";
        //1071008 Zen 1050087 二代升級        //document.all["txFileYear"].focus();
        $('#txFileYear').focus();
    }
    else
    {
        // 檢查檔號
        if (document.all["txFileYear"].value != "" || document.all["txFileCls"].value != "" || document.all["txFileCase"].value != "" || document.all["txFileVol"].value != "")
        {
            if (document.all["txFileYear"].value == "")
            {
                strErrMsg += "年度號不可為空\n";
                //1071008 Zen 1050087 二代升級                //document.all["txFileYear"].focus();
                $('#txFileYear').focus();
            }
            else if (document.all["txFileCls"].value == "" || document.all["txFileCase"].value == "")
            {
                strErrMsg += "檔號輸入不完全\n";
                /*
				document.all["txFileYear"].value = "";
				document.all["txFileCls"].value = "";
				document.all["txFileCase"].value = "";
				document.all["txFileVol"].value = "";
				*/
                //1071008 Zen 1050087 二代升級                //document.all["txFileYear"].focus();
                $('#txFileYear').focus();
            }
        }
        // 檢查文號
        if (document.all.txDocNo1.value != "" && document.all.txDocNo2.value == "")
        {
            document.all.txDocNo2.value = document.all.txDocNo1.value;
        }
        else if (document.all.txDocNo1.value == "" && document.all.txDocNo2.value != "")
        {
            document.all.txDocNo1.value = document.all.txDocNo2.value;
        }
        else if (document.all.txDocNo1.value > document.all.txDocNo2.value)
        {
            temp = document.all.txDocNo1.value;
            document.all.txDocNo1.value = document.all.txDocNo2.value;
            document.all.txDocNo2.value = temp;
        }

        // 檢查存放位置
        if (document.all.txLocation1.value != "" && document.all.txLocation2.value == "")
        {
            document.all.txLocation2.value = document.all.txLocation1.value;
        }
        else if (document.all.txLocation1.value == "" && document.all.txLocation2.value != "")
        {
            document.all.txLocation1.value = document.all.txLocation2.value;
        }
        else if (document.all.txLocation1.value > document.all.txLocation2.value)
        {
            temp = document.all.txLocation1.value;
            document.all.txLocation1.value = document.all.txLocation2.value;
            document.all.txLocation2.value = temp;
        }
    }

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

// 不足3碼左補0
function PadLeftWithZero(argLen)
{
    if (jf_Trim(event.srcElement.value) != "")
        event.srcElement.value = jf_PADL(event.srcElement.value, argLen, "0");
}