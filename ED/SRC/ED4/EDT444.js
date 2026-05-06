/*
DATE 	    SA		PRG		MGR_NO		DESC
1060922     Kevin   Joe     1060451     新增EDT444 會辦公文時效統計作業
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
function ClientButtonControl(e)
{
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

    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btPreview":
            Page_BlockSubmit = !(CheckBeforeSearch() && CheckDATE('txYearMonth', '統計月份'));
            jf_ToolBarSubmit(xObjectName);
            break;			
    }
}

function CheckBeforeSearch()
{
    bRtn = true;
    var strErrMsg = "";

    var txYearMonth = document.all.txYearMonth.value;

    if (txYearMonth == "")
    {    
        bRtn = false;
        strErrMsg = "列印月份不可為空";
        $('#txYearMonth').focus();
        alert(strErrMsg);
    }	
    return bRtn;
}

function CheckDATE(argObj, strMsg)
{
    var strDate = document.all[argObj].value;
    if (strDate != "")
    {
        if (strDate.length < 5)
        {
            strDate = jf_PADL(strDate, 5, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate + '01'))
        {
            if (strMsg)
                jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            $('#'+ argObj).focus();
            return false;
        }
    }
    return true;
}