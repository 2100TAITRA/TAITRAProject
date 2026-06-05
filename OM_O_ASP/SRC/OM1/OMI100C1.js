/*
DATE		SA			PRG		MGR_NO			DESC
1141110     David       Cloud   1141112         駐外收文查詢作業
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
var AllFiles = [];


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
        //case "btAddFile":
            //document.getElementById('fileInput' + nInputFileCnt).click();
            //break;
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
        case "btSearch":
            Page_BlockSubmit = true;
            if (jf_CheckBeforSearch()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                Page_BlockSubmit = false;
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btSelectAll":
            Page_BlockSubmit = true;
            jf_SelectAll("dg1", "_cbSelect");
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
            jf_SelectInverse("dg1", "_cbSelect");
            break;
        case "btPackage":
            Page_BlockSubmit = true;
            DownloadPackageFile();
            break;
        case "btClean":
            window.close();
            break;
        
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查

//儲存前之欄位檢查
function jf_CheckBeforSearch()
{
    var bRtnbool = true;
    var strErrMsg = "";
    if (document.all["txIssueDateS"].value == "" && document.all["txIssueDateE"].value == "") {
        alert("發文日期不可皆為空白。")
    }
    else {
        if (!CheckDate("txIssueDateS", "發文日期(起)格式輸入錯誤")) {
            Page_BlockSubmit = true;
            $('#txIssueDateS').focus();
            return;
        }
        if (!CheckDate("txIssueDateE", "發文日期(迄)格式輸入錯誤")) {
            Page_BlockSubmit = true;
            $('#txIssueDateE').focus();
            return;
        }
        if (document.all["txIssueDateS"].value != "" && document.all["txIssueDateE"].value == "") {
            document.all["txIssueDateE"].value = document.all["txIssueDateS"].value;
        }
        if (document.all["txIssueDateS"].value == "" && document.all["txIssueDateE"].value != "") {
            document.all["txIssueDateS"].value = document.all["txIssueDateE"].value;
        }
        if (document.all["txIssueDateS"].value != "" && document.all["txIssueDateE"].value != "") {
            if (document.all["txIssueDateS"].value > document.all["txIssueDateE"].value) {
                var TempDate = document.all["txIssueDateS"].value;
                document.all["txIssueDateS"].value = document.all["txIssueDateE"].value;
                document.all["txIssueDateE"].value = TempDate;
            }
        }
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

    //if (argCallerId == "EAC005")
    //{
    //    if (document.all["txFileCls"] != null)
    //        document.all["txFileCls"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
    //    if (document.all["txVerNo"] != null)
    //        document.all["txVerNo"].value = jf_Trim(document.all.lbReturnValue.options[5].value);

    //}
    ////清空lbReturnValue物件
    //if (document.all["lbReturnValue"].options != null)
    //    document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckDate(argId, argText) {
    document.all[argId].value = jf_Trim(document.all[argId].value);
    if (document.all[argId].value != "") {
        document.all[argId].value = jf_PADL(document.all[argId].value, 7, "0");
        if (!jf_CheckCDATE(document.all[argId].value)) {
            alert(argText + '格式不正確');
            $('#' + argId).focus();
            return false;
        }
    }
    return true;
}

function downLoadFile(argPathID,argFileName) {
    var strFullPath = document.all[argPathID].textContent;

    var result = OM1.OMI100C1.getFiles(strFullPath, argFileName, document.all.txSySid.value, document.all.strSourceOrgno.value).value;

    if (result.indexOf("ERR")!=-1)
        alert(result);
    else
        window.open(result);
}
function DownloadPackageFile() {

    var arrFromFile = new Array();
    var arrToFile = new Array();
    for (var i = 2; i <= document.all['dg1'].rows.length; i++) {
        if (document.all["dg1__ctl" + i + "_cbSelect"].checked == true) {
            arrFromFile.push(document.all["dg1__ctl" + i + "_lbFilePath"].textContent);
            arrToFile.push(document.all["dg1__ctl" + i + "_lbFileName"].textContent);
        }
    }

    if (arrFromFile.length == 0)
        alert('至少需勾選一個檔案');
    else {
        //GetPackageFiles(string[] argOrgFullPath, string[] argToFileName, string argSysID, string argSourceNo)
        var strZipPath = OM1.OMI100C1.GetPackageFiles(arrFromFile, arrToFile, document.all.txSySid.value, document.all.strSourceOrgno.value).value;
        if (strZipPath.indexOf("ERR") != -1)
            alert(strZipPath);
        else
            window.open(strZipPath);
        
            
    }
}