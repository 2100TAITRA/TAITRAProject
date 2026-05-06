/*
DATE 	    SA		PRG		MGR_NO		DESC
1060407     Kevin   Zen     1050799     新增EDR444 會辦公文時效統計表列印作業
1060919     Kevin   Joe     1060451     新增統計鍵開啟EDT444
1091007     Kevin   Joe     1090544     新增匯出Excel功能
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
            Page_BlockSubmit = !(CheckBeforeSearch() && CheckDATE('txYearMonthS', '列印日期(起)') && CheckDATE('txYearMonthE', '列印日期(訖)'));
            jf_ToolBarSubmit(xObjectName);
            break;			
		//1060919	Joe		1060451		改為開啟EDT444--S
		case "btStatic":  //執行統計
			var xUrl = "EDT444.aspx?nMode=EXEC";
			jf_OpenChildWin(xUrl,"EDT444",760,500);
			Page_BlockSubmit = true;
			break;
		//1060919	Joe		1060451		改為開啟EDT444--E
		//1091007	Joe		1090544		新增Excel匯出功能--S
		case "btExcel":
			Page_BlockSubmit = !(CheckBeforeSearch() && CheckDATE('txYearMonthS', '列印日期(起)') && CheckDATE('txYearMonthE', '列印日期(訖)'));
			jf_ToolBarSubmit(xObjectName);
			break;
		//1091007	Joe		1090544		新增Excel匯出功能--E
    }
}

function CheckBeforeSearch()
{
    bRtn = true;
    var strErrMsg = '';

    var txYearMonthS = document.all.txYearMonthS.value;
    var txYearMonthE = document.all.txYearMonthE.value;

    if (txYearMonthS + txYearMonthE == '')
    {    
        bRtn = false;
        strErrMsg = '列印月份不可為空';
        $('#txYearMonthS').focus();
        alert(strErrMsg);
        return bRtn;
    }

    if (txYearMonthS == '')
        document.all.txYearMonthS.value = txYearMonthE;
    else if (txYearMonthE == '')
        document.all.txYearMonthE.value = txYearMonthS;
    else if (txYearMonthS.localeCompare(txYearMonthE) > 0)
    {
        document.all.txYearMonthS.value = txYearMonthE;
        document.all.txYearMonthE.value = txYearMonthS;
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