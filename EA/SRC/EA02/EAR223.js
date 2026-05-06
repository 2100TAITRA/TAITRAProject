/*
DATE	SA	    PRG	    MGR_NO	DESC
1111207 Cloud   Zen     1110890 新增EAR223銓敘部個人檔標籤列印作業
1111223 Cloud   Zen     1110890 新增文號欄位並支援輸入文號後自動帶出對應資料
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

AjaxPro.Request.prototype.timeout = function ()
{
    try
    {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false)
        {
            this.abort();
        } else
        {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error)
    {

    }
    finally
    {

    }
}

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
//1060215  Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
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
        case btHelp:
            break;
        case "btGridNum":
            Page_BlockSubmit = false;
            jf_ToolBarSubmit(xObjectName);
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
        case "btClean":
            Page_BlockSubmit = true;
            var strGridNum = document.all["txGridNum"].value;
            if (jf_ConfirmClean(false))
                document.all["txGridNum"].value = strGridNum;
            break;
        case "btPreview":
                Page_BlockSubmit = !CheckBeforeSearch();
                jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CheckBeforeSearch()
{
    let bRtn = true;
    for (var i = 2; i < document.all['dg1'].rows.length + 1; i++) 
    {
        let txPersonFullName = document.all['dg1__ctl' + i + '_txPersonFullName'].value;
        let txFourCornerNo = document.all['dg1__ctl' + i + '_txFourCornerNo'].value;
        let txPersonId = document.all['dg1__ctl' + i + '_txPersonId'].value;

        if ((txPersonFullName == '' && txFourCornerNo == '' && txPersonId == '') || (txPersonFullName != '' && txFourCornerNo != '' && txPersonId != ''))
            continue;
        else
        {
            $('#dg1__ctl' + i + '_txPersonFullName').focus();
            alert('個人檔資料輸入不完整。')
            bRtn = false;
            break;
        }
    }

    return bRtn;
}

function CheckDataExist(argId, argType)
{
    let strErrMsg = '';
    
    if (document.all[argId].value == '')
        return;

    let pNo = argId.substring(8, argId.indexOf('_' + argType));
    let strPersonFullName = document.all['dg1__ctl' + pNo + '_txPersonFullName'].value;
    let strFourCornerNo =   document.all['dg1__ctl' + pNo + '_txFourCornerNo'].value;
    let strPersonId =        document.all['dg1__ctl' + pNo + '_txPersonId'].value;

    if (strPersonFullName == '' || strFourCornerNo == '' || strPersonId == '')
        return;

    let rtnObj = EA02.EAR223.CheckPersonCaseMain(document.all['H_txSourceOrgno'].value, strPersonFullName, strFourCornerNo, strPersonId);
    strErrMsg += rtnObj.value;
    if (strErrMsg != '')
    {
        alert(strErrMsg);
        $('#' + argId).focus();
    }
}


//1111223 Zen 1110890 新增文號欄位並支援輸入文號後自動帶出對應資料
function GetPersonData(argId, argType)
{
    let strRtn = '';

    if (document.all[argId].value == '')
        return;

    let pNo = argId.substring(8, argId.indexOf('_' + argType));
    let strDocNo = document.all['dg1__ctl' + pNo + '_txDocNo'].value;

    if (strDocNo == '')
        return;

    let rtnObj = EA02.EAR223.GetPersonData(document.all['H_txSourceOrgno'].value, strDocNo);
    strRtn += rtnObj.value;
    if (strRtn != '')
    {
        let strRtnArr = strRtn.split('|');
        document.all['dg1__ctl' + pNo + '_txPersonFullName'].value = strRtnArr[0];
        document.all['dg1__ctl' + pNo + '_txFourCornerNo'].value = strRtnArr[1];
        document.all['dg1__ctl' + pNo + '_txPersonId'].value = strRtnArr[2];
    }
}