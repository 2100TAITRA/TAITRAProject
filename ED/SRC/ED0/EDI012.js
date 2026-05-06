/*
DATE    SA		PRG		MGR_NO	        DESC
1130910 Leslie  Leslie  1130694         新增來文文字子視窗
1131008 Kevin   Jason   1130941         航港局弱掃復掃修正Client Potential XSS
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
        case 'btDownload':
            downLoadFile();
            Page_BlockSubmit = true;
            break;
    }
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function downLoadFile()
{
    var arText = [];
    var strLine = '';
    $('.DivBaseTable input,.DivBaseTable span,.DivBaseTable textarea').each(function (i, o) {
        if (o.tagName == 'SPAN') {
            if (strLine != '') 
                arText.push(strLine)
            strLine = $(o).text()
        }
        else if (o.tagName == 'INPUT')
            strLine += $(o).val()
        else
            strLine += $(o).text()
    })
    if (strLine != '')
        arText.push(strLine)
    //1131008   Jason	1130941 航港局弱掃復掃修正Client Potential XSS
    //var fileName = $('#txRcv_FromNo').val() + ".TXT";
    var fileName = HtmlEncode($('#txRcv_FromNo').val()) + ".TXT";
    
    let data = arText.join('\r\n');
    let blob = new Blob([data], { type: "application/octet-stream" });
    
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
//1131008   Jason	1130941 航港局弱掃復掃修正Client Potential XSS
function HtmlEncode(s) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}