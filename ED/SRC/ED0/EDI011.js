/*
DATE    SA		PRG		MGR_NO	        DESC
1050926	David   Zen	    1050087	        新增EDI011 電子收文明細
1051019 Leslie  Kenny   1050087         二代公文修改
1060509 Kevin   Zen     1060215         調整檔案下載行為
1070412 David   Zen     1070318         (客委會)新增打包下載之功能
1070419 David   Zen     1070323         (客委會)公文內容文字檔支援以新分頁開啟
1070830 Kevin   Justin  1070678         弱掃AJAX修改
1130202 Kevin   Zen     1130024         (銓敘部)支援下載來文電子檔R.pdf預帶文號做為檔案名稱
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

var bInsert = new Boolean();//判斷是否在擁有多筆資料時額外新增
bInsert = true;

//紀錄Call WebService物件的id
var iCallerID;
var iCallID_CheckOutEmp;
//1070830 Justin [1070678]弱掃AJAX修改
AjaxPro.Request.prototype.timeout = function () {
    try {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false) {
            this.abort();
        } else {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error) {

    }
    finally {

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
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
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

    //1070412 Zen 1070318 (客委會)新增打包下載之功能
    switch (xObjectName)
    {
        case "btPackage":
            DownloadPackageFile();
            break;
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

    }
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

//1070419 Zen 1070323 (客委會)公文內容文字檔支援以新分頁開啟，額外傳入檔案類型
//function downLoadFile(argID)
function downLoadFile(argID, argFileType)
{
    var strFullPath = document.all[argID].textContent;
    var strWebService = document.all.H_txWebService.value;
    var strArtifact = document.all.H_txArtifact.value;
    var strKv1 = document.all.H_txFileSeq.value;
    var strSourceOrgno = document.all.H_txSourceOrgno.value;
    //1130202 Zen 1130024 (銓敘部)支援下載來文電子檔R.pdf預帶文號做為檔案名稱
    let strSpecifiedName = document.all['H_txSpecifiedName'].value;

    //1060509 Zen 1060215 調整檔案下載行為
    //var result = EDI011.getFiles(strFullPath, strWebService, strArtifact, strKv1, strSourceOrgno).value;
    //1070419 Zen 1070323 (客委會)公文內容文字檔支援以新分頁開啟，額外傳入檔案類型
    //var result = ED0.EDI011.getFiles(strFullPath, strWebService, strArtifact, strKv1, strSourceOrgno).value;
    //1130202 Zen 1130024 (銓敘部)支援下載來文電子檔R.pdf預帶文號做為檔案名稱
    //var result = ED0.EDI011.getFiles(strFullPath, strWebService, strArtifact, strKv1, strSourceOrgno, argFileType).value;
    var result = ED0.EDI011.getFiles(strFullPath, strWebService, strArtifact, strKv1, strSourceOrgno, argFileType, strSpecifiedName).value;

    if (result.strErrMsg != '')
        alert(result.strErrMsg);
    else
        window.open(result.strURL);
}

//1070412 Zen 1070318 (客委會)新增打包下載之功能
function DownloadPackageFile()
{
    var strSourceOrgno = document.all.H_txSourceOrgno.value;
    var strWebService = document.all.H_txWebService.value;
    var strArtifact = document.all.H_txArtifact.value;
    var strKv1 = document.all.H_txFileSeq.value;
    var arrFile = new Array();
    //1130202 Zen 1130024 (銓敘部)支援下載來文電子檔R.pdf預帶文號做為檔案名稱
    let strSpecifiedName = document.all['H_txSpecifiedName'].value;

    for (var i = 2; i <= document.all['dg1'].rows.length; i++)
        if (document.all["dg1__ctl" + i + "_cbSelect"].checked == true)
            arrFile.push(document.all["dg1__ctl" + i + "_lbFilePath"].textContent);

    if (arrFile.length == 0)
        alert('至少需勾選一個檔案');
    else
    {
        //1130202 Zen 1130024 (銓敘部)支援下載來文電子檔R.pdf預帶文號做為檔案名稱
        //var strZipPath = ED0.EDI011.GetPackageFiles(strSourceOrgno, strWebService, strArtifact, strKv1, arrFile).value;
        var strZipPath = ED0.EDI011.GetPackageFiles(strSourceOrgno, strWebService, strArtifact, strKv1, arrFile, strSpecifiedName).value;
        if (strZipPath.bHasFile)
            window.open(strZipPath.strURL);
        if (strZipPath.strErrMsg != '')
            alert(strZipPath.strErrMsg);
    }
}