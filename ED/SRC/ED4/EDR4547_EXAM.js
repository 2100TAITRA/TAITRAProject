/*	
DATE	SA		PG		MGR_NO      DESC
1111122	Kevin	Kevin   1111012 	新增EDR4547_EXAM 發文時效統計表列印作業
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
    document.all.btExcel.disabled = false;
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
        case "btStatic":  //執行統計
			var xUrl = "../../../ODDEP/ODP420_EXAM.aspx?nMode=EXEC&SAMLart=" + document.all.H_Artifact.value;
            jf_OpenChildWin(xUrl, "ODP420", 760, 500);
            Page_BlockSubmit = true;
            break;
        case "btPreview":
            Page_BlockSubmit = !CheckBeforeSearch();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btExcel":
            Page_BlockSubmit = !CheckBeforeSearch();
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
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforeSearch()
{
    var strErrMsg = '';
    var bRtn = true;

    if (document.all.txDateS.value == '' && document.all.txDateE.value == '') {
        strErrMsg += '日期欄位不可皆為空';
        $('#txDateS').focus();
    }
    /*
    else if (document.all.txDateE.value > document.all.hMaxMonth.value) {
        strErrMsg += '列印月份不可大於目前統計最大月份';
        $('#txYearmonth').focus();
    }
    */

    if (strErrMsg != '')
    {
        alert(strErrMsg);
        bRtn = false;
    }

    return bRtn;
}

function CheckDATE(argObj, argMsg)
{
    var strErrMsg = '';
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
            strErrMsg += FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argMsg])) + '\n';
            jf_ShowMsg(strErrMsg, '');
            $('#' + argObj).focus();
            return;
        }
        if (strDate > document.all.hMaxMonth.value) {
            alert(argMsg + '不可大於目前統計最大月份');
            $('#' + argObj).focus();
            return;
        }

        var DateArr = ED4.EDR4547_EXAM.GetStaticDate(document.all["H_OrgNo"].value, strDate).value;
        if (DateArr[0] != "") {
            alert(DateArr[0]);
            $('#' + argObj).focus();
            return;
        }
        
        document.all.txDateS.value = DateArr[1];
        document.all.txDateE.value = DateArr[2];
    }

}
