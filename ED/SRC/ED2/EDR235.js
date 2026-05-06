/*
DATE    SA		PRG		MGR_NO	        DESC
1071226	Kevin   Zen	    1071226	        新增EDR235 人民陳情案件處理情形設定作業
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

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
            Page_BlockSubmit = !CheckBeforePreview();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CheckBeforePreview()
{
    var strErrMsg = '';
    var strDocNoS = document.all['txDocNoS'].value;
    var strDocNoE = document.all['txDocNoE'].value;
    var strCloseDateS = document.all["txCloseDateS"].value;
    var strCloseDateE = document.all["txCloseDateE"].value;

    if (strDocNoS == "" && strDocNoE == "" && strCloseDateS == "" && strCloseDateE == "")
        strErrMsg += '公文文號、結案日期不可皆為空白';

    if (strDocNoS == '' && strDocNoE != '')
        document.all['txDocNoS'].value = strDocNoE;
    else if (strDocNoS != '' && strDocNoE == '')
        document.all['txDocNoE'].value = strDocNoS;
    else if (Number(strDocNoS) > (Number(strDocNoE)))
    {
        document.all['txDocNoS'].value = strDocNoE;
        document.all['txDocNoE'].value = strDocNoS;
    }

    if (strCloseDateS == '')
        document.all.txCloseDateS.value = strCloseDateE;
    else if (strCloseDateE == '')
        document.all.txCloseDateE.value = strCloseDateS;
    else if (Number(strCloseDateS) > Number(strCloseDateE))
    {
        document.all.txCloseDateS.value = strCloseDateE;
        document.all.txCloseDateE.value = strCloseDateS;
    }

    strErrMsg += CheckDate('txCloseDateS', '結案日期(起)', true);
    strErrMsg += CheckDate('txCloseDateE', '結案日期(迄)', true);

    if (strErrMsg != '')
    {
        alert(strErrMsg);
        return false;
    }

    return true;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckDate(argObj, argMsg, argFromTbtool)
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
            if (argFromTbtool == false)
                jf_ShowMsg(strErrMsg, '');
        }
    }
    return strErrMsg;
}

function DownloadDocument(argArtifact, argDocNo, argSourceOrgno, argSignType)
{
    try
    {
        var wsUrl = opener.theWebServices.url('fileiows');
        var param = [];
        param[0] = argArtifact;
        param[1] = argDocNo;
        param[2] = argSourceOrgno;

        var unvSrc = '{"UnvRoot":{"Version":"3.4","argArtifact":"#argArtifact#","USER_ORGNO":"#SourceOrgNo#","Doc":{"Subject":"","SourceOrgNo":"#SourceOrgNo#","DocNo":"#DocNo#","Att":{"Type":"7","Alias":"正版電子檔案","PrintEnable":"TRUE"}}}}';
        unvSrc = unvSrc.replace('#argArtifact#', argArtifact);
        unvSrc = unvSrc.replace('#DocNo#', argDocNo);
        unvSrc = unvSrc.replace(/#SourceOrgNo#/g, argSourceOrgno);

        var sUnvObj = unvSrc;
        if (sUnvObj !== "")
        {
            var UnvObj = JSON.parse(sUnvObj);
            var objViewDoc = {
                UNVObj: UnvObj,
                docInfoPage: "EDR235",
                openDocModule: 'AOL',
                signType: argSignType,
                readOnlyMode: false,
                disableSave: true
            };
            var $docId = jf_GetSessionID() + "_" + (+new Date());
            localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
            var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
            jf_OpenChildWin(unvUrl, "ViewDoc");
        }

    } catch (e)
    {
        alert('開啟失敗');
    }
}