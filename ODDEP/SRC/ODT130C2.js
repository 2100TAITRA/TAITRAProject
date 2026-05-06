/*	
DATE	SA		PRG		MSG_NO          DESC	
1110927	David	Kevin	1110880			新增任審資訊子視窗
1111123	David	David	1110881			支援ODC010開啟處理
1130313 David	Zen     1130021         支援介接WS取得任職機關、職稱等名稱
1130920 Kevin   Zen     1130833         檢核任職機關代碼僅可為9碼
*/

var CurrOrgIdObj;
var CurrOrgNameObj;

var IsServerHandling = new Boolean();
IsServerHandling = false;

jf_ShowValidator();

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

function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {

    }
}

function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSave":
            Page_BlockSubmit = true;
            if (txPERSON_ID_onblur())
                ReturnValue();
            //jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean();
            $('#txPERSON_ID').focus();
            break;
    }
}

function CallBack(argCallerId)
{
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

function ClientOnLoad()
{
    if (document.all["nFrom"])
    {
        document.all["txPERSON_FULL_NAME"].value = parent.theAOL.docObj.ODWDCM.PERSON_FULL_NAME;
        document.all["txPERSON_ID"].value = parent.theAOL.docObj.ODWDCM.PERSON_ID;
        document.all["txJOB_ORGNO"].value = parent.theAOL.docObj.ODWDCM.JOB_ORGNO;
        document.all["txJOB_ORGNAME"].value = parent.theAOL.docObj.ODWDCM.JOB_ORGNAME;
        document.all["txJOB_NO"].value = parent.theAOL.docObj.ODWDCM.JOB_NO;
        document.all["txJOB_TITLE_NO"].value = parent.theAOL.docObj.ODWDCM.JOB_TITLE_NO;
        document.all["txJOB_TITLE"].value = parent.theAOL.docObj.ODWDCM.JOB_TITLE;
    }
    else
    {
        document.all["txPERSON_FULL_NAME"].value = opener.document.all["lbReturnValue"].options[0].value;
        document.all["txPERSON_ID"].value = opener.document.all["lbReturnValue"].options[1].value;
        document.all["txJOB_ORGNO"].value = opener.document.all["lbReturnValue"].options[2].value;
        document.all["txJOB_ORGNAME"].value = opener.document.all["lbReturnValue"].options[3].value;
        document.all["txJOB_NO"].value = opener.document.all["lbReturnValue"].options[4].value;
        document.all["txJOB_TITLE_NO"].value = opener.document.all["lbReturnValue"].options[5].value;
        document.all["txJOB_TITLE"].value = opener.document.all["lbReturnValue"].options[6].value;
        opener.document.all["lbReturnValue"].options.length = 0;
    }
}

function OnWSResult(argResult)
{
    if (jf_IsWebServiceSuccess(argResult))
    {
    }
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    document.all[argLabelId].textContent = obj.value;
}

function ReturnValue()
{
    if (document.all["nFrom"])
    {
        parent.theAOL.docObj.ODWDCM.PERSON_FULL_NAME = document.all["txPERSON_FULL_NAME"].value;
        parent.theAOL.docObj.ODWDCM.PERSON_ID = document.all["txPERSON_ID"].value;
        parent.theAOL.docObj.ODWDCM.JOB_ORGNO = document.all["txJOB_ORGNO"].value;
        parent.theAOL.docObj.ODWDCM.JOB_ORGNAME = document.all["txJOB_ORGNAME"].value;
        parent.theAOL.docObj.ODWDCM.JOB_NO = document.all["txJOB_NO"].value;
        parent.theAOL.docObj.ODWDCM.JOB_TITLE_NO = document.all["txJOB_TITLE_NO"].value;
        parent.theAOL.docObj.ODWDCM.JOB_TITLE = document.all["txJOB_TITLE"].value;

        var $dlg = parent.$("#ODC010_CLSNO_DIV");
        var $btn = $dlg.find("a#Dlg_close_btn");
        $btn.click();
    }
    else
    {
        opener.document.all.lbReturnValue.length = 7;
        opener.document.all.lbReturnValue.options[0].value = document.all.txPERSON_FULL_NAME.value;
        opener.document.all.lbReturnValue.options[1].value = document.all.txPERSON_ID.value;
        opener.document.all.lbReturnValue.options[2].value = document.all.txJOB_ORGNO.value;
        opener.document.all.lbReturnValue.options[3].value = document.all.txJOB_ORGNAME.value;
        opener.document.all.lbReturnValue.options[4].value = document.all.txJOB_NO.value;
        opener.document.all.lbReturnValue.options[5].value = document.all.txJOB_TITLE_NO.value;
        opener.document.all.lbReturnValue.options[6].value = document.all.txJOB_TITLE.value;
        opener.window.CallBack("ODT130C2");
        close();
    }
}

var isChecked = false;

function txPERSON_ID_onblur()
{

    if (isChecked)
    {
        isChecked = false;
        return true;
    }
    else
    {
        isChecked = true;
    }

    if (document.all.txPERSON_ID.value == "")
        return true;

    if (!OD.ODT130C2.CheckTwId(document.all.txPERSON_ID.value).value)
    {
        $('#txPERSON_ID').focus();
        alert("身分證格式不正確。");
        return false;
    }

    var wsParam = new Array();
    wsParam[0] = document.all.txPERSON_ID.value;
    var CallWsObj = jf_CallWS("../TA/TAWS.asmx", "GetTBCInfo", false, wsParam);

    if (CallWsObj.value.bSuccess)
    {
        if (CallWsObj.value.Exist == "1") 
        {
            document.all.txPERSON_ID.value = jf_Trim(CallWsObj.value.Id);
            document.all.txPERSON_FULL_NAME.value = jf_Trim(CallWsObj.value.Name);
            document.all.txJOB_ORGNO.value = jf_Trim(CallWsObj.value.JobOrgNo);
            document.all.txJOB_ORGNAME.value = jf_Trim(CallWsObj.value.JobOrgName);
            document.all.txJOB_NO.value = jf_Trim(CallWsObj.value.JobNo);
            document.all.txJOB_TITLE_NO.value = jf_Trim(CallWsObj.value.JobTitleNo);
            document.all.txJOB_TITLE.value = jf_Trim(CallWsObj.value.JobTitle);
            return true;
        }
        else 
        {
            document.all.txJOB_TITLE_NO.value = "";
            $('#txPERSON_ID').focus();
            alert(CallWsObj.value.ErrMsg);
            return true;
        }
    }
    else 
    {
        document.all.txJOB_TITLE_NO.value = "";
        $('#txPERSON_ID').focus();
        alert(CallWsObj.value.ErrMsg);
        return false;
    }
}

//1130313 Zen 1130021 支援介接WS取得任職機關、職稱等名稱
function CallTaWS()
{
    if (document.all['txJOB_ORGNO'].value == '')
        return;

    //1130920 Zen 1130833 檢核任職機關代碼僅可為9碼
    if (document.all['txJOB_ORGNO'].value.length != 9)
    {
        alert('任職機關代碼僅可為9碼。');
        return;
    }

    let params = new SOAPClientParameters();
    params.add('argJobOrgNo', document.all['txJOB_ORGNO'].value);
    params.add('argJobNo', document.all['txJOB_NO'].value);
    var rtnObj = SOAPClient.invokeJSON('../TA/TAWS.asmx', "GetTAJobInfo", params, false, null);

    if (rtnObj.value.bSuccess == false)
        alert(rtnObj.value.ErrMsg);
    else if (rtnObj.value.Exist == '0')
        alert('於任審系統查無對應名稱');
    else if (rtnObj.value.JobOrgName != '')
        document.all['txJOB_ORGNAME'].value = rtnObj.value.JobOrgName;
    else if (rtnObj.value.JobTitle != '')
        document.all['txJOB_TITLE'].value = rtnObj.value.JobTitle;
}