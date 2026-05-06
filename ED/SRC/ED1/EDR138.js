/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		 SA           PG           單號	     概要
 * -------------------------------------------------------------------------------------------------
 * 1001011				Ken			1000602		新增公文收文傳送統計表列印作業
 * 1051013  Devid       Zen         1050087     二代公文修改
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

//1051013 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

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
//1051013 Zen 1050087 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051013 Zen 1050087 二代公文修改
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
        //1051013 Zen 1050087 二代公文修改
        //case "btRcvDateS":
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all.txRcvDateS, event.screenX, event.screenY);
        //    break;
        //case "btRcvDateE":
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all.txRcvDateE, event.screenX, event.screenY);
        //    break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051013 Zen 1050087 二代公文修改
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

    //1051013 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btExcel":
            Page_BlockSubmit = !jf_CheckRequiredFile();
            //1051013 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}


/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//日期onblur

CheckCount = 0;

function CheckDDATE(argObj, strMsg)
{
    if (CheckCount != 0)
    {
        CheckCount = 0;
        return;
    }

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
            CheckCount = 1;
            jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            //1051013 Zen 1050087 二代公文修改
            //document.all[argObj].focus();
            $('#' + argObj).focus();
            CheckCount = 0;
            return false;
        }
    }
    return true;
}

function jf_CheckRequiredFile()
{
    if (document.all["txRcvDateS"].value == "" && document.all["txRcvDateE"].value == "")
    {
        alert("統計日期起迄欄位不能皆為空");
        //1051013 Zen 1050087 二代公文修改
        //document.all["txRcvDateS"].focus();
        $('#txRcvDateS').focus();
        return false;
    }

    if (!CheckDDATE("txRcvDateS", "統計期間(起)", true))
        return false;

    if (!CheckDDATE("txRcvDateE", "統計期間(迄)", true))
        return false;

    var strSDate = document.all.txRcvDateS.value;
    var strEDate = document.all.txRcvDateE.value;

    // 當起值 > 迄值需作起迄交換	
    if (strSDate != "" && strEDate != "" && strSDate > strEDate)
    {
        document.all.txRcvDateS.value = strEDate;
        document.all.txRcvDateE.value = strSDate;
    }

    if (strSDate == "" && strEDate != "")
        document.all.txRcvDateS.value = strEDate;
    if (strEDate == "" && strSDate != "")
        document.all.txRcvDateE.value = strSDate;
    return true;
}