/*	--------------------------------------------------------------------
 * DATE			SA		PRG		MGR_NO	DESC
 * 1021023		Cloud	Eileen	        新增本作業
 * 1071012      Cloud   Zen     1050087 二代升級
 * --------------------------------------------------------------------*/

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1071011 Zen 1050087 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1071011 Zen 1050087 二代升級    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1071011 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1071011 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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
//1071011 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1071011 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            //1071011 Zen 1050087 二代升級            //document.all["txYearS"].focus();
            $('#txYearS').focus();
            break;
        //1071011 Zen 1050087 二代升級        //case "btPrint":
        //    Page_BlockSubmit = !jf_ConfirmPrint();
        //    jf_ToolBarSubmit();
        //    break;
        case "btPreview":
            Page_BlockSubmit = !jf_CheckBeforePreview(false);
            //1071011 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btExcel":
            Page_BlockSubmit = !jf_CheckBeforePreview(true);
            //1071011 Zen 1050087 二代升級            //jf_ToolBarSubmit();
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
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_CheckBeforePreview(outwardExcel)
{
    var strYearS = jf_Trim(document.all.txYearS.value);
    var strYearE = jf_Trim(document.all.txYearE.value);

    if (strYearS != "" || strYearE != "")
    {
        // 補足為三碼
        if (strYearS != "" && strYearS.length < 3) strYearS = jf_PADL(strYearS, 3, "0");
        if (strYearE != "" && strYearE.length < 3) strYearE = jf_PADL(strYearE, 3, "0");

        // 其中一方為空白則補上相同值
        if (strYearS == "") strYearS = strYearE;
        else if (strYearE == "") strYearE = strYearS;

        // 起始年>迄末年，起迄互調
        if (parseInt(strYearS, 10) > parseInt(strYearE, 10))
        {
            var temp = strYearS;
            strYearS = strYearE;
            strYearE = temp;
        }

        document.all.txYearS.value = strYearS;
        document.all.txYearE.value = strYearE;

        if (outwardExcel && parseInt(strYearS, 10) != parseInt(strYearE, 10))
        {
            alert("使用匯出Excel功能時，統計年度起迄必須相同！");
            return false;
        }

        return true;
    }
    else
    {
        alert("統計年度不可空白");
        //1071011 Zen 1050087 二代升級        //document.all.txYearS.focus();
        $('#txYearS').focus();
        return false;
    }
}