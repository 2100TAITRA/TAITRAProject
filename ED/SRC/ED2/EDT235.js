/*
DATE    SA		PRG		MGR_NO	        DESC
1071226	Kevin   Zen	    1071226	        新增EDT235 人民陳情案件處理情形設定作業
1080220 Kevin   Zen	    1080161	        修改線上瀏覽方式為公文檢索側屜模式
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

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btPreview"));
    var btPreview;

    //取得確實按下的是哪個鍵
    if (document.all["dg1__ctl" + pNo + "_btPreview"] != null)
        btPreview = document.all["dg1__ctl" + pNo + "_btPreview"].id;

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
        case btPreview:
            Page_BlockSubmit = true;
            var strArtifact = encodeURI(jf_Trim(document.all.H_txArtifact.value));
            var strDocNo = encodeURI(document.all["dg1__ctl" + pNo + "_lbDocNo"].textContent);
            var strSourceOrgno = encodeURI(jf_Trim(document.all.H_txSourceOrgno.value));
            var strSignType = encodeURI(document.all["dg1__ctl" + pNo + "_H_lbSignType"].textContent);
            DownloadDocument(strArtifact, strDocNo, strSourceOrgno, strSignType);
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
        case "btSearch":
            Page_BlockSubmit = !CheckBeforeSearch();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            var bDg1Hide = document.all['dg1'].className == 'hide';
            Page_BlockSubmit = bDg1Hide || !CheckBeforeSave();
            jf_ToolBarSubmit(xObjectName);
    }
}

function CheckBeforeSearch()
{
    var strErrMsg = '';
    var strDocNoS = document.all['txDocNoS'].value;
    var strDocNoE = document.all['txDocNoE'].value;
    var strRcvDateS = document.all["txRcvDateS"].value;
    var strRcvDateE = document.all["txRcvDateE"].value;
    var strCloseDateS = document.all["txCloseDateS"].value;
    var strCloseDateE = document.all["txCloseDateE"].value;

    if (strDocNoS == "" && strDocNoE == "" && strRcvDateS == "" && strRcvDateE == "" && strCloseDateS == "" && strCloseDateE == "")
        strErrMsg += '公文文號、收創文日期、結案日期不可皆為空白';

    if (strDocNoS == '' && strDocNoE != '')
        document.all['txDocNoS'].value = strDocNoE;
    else if (strDocNoS != '' && strDocNoE == '')
        document.all['txDocNoE'].value = strDocNoS;
    else if (Number(strDocNoS) > (Number(strDocNoE)))
    {
        document.all['txDocNoS'].value = strDocNoE;
        document.all['txDocNoE'].value = strDocNoS;
    }

    if (strRcvDateS == '')
        document.all.txRcvDateS.value = strRcvDateE;
    else if (strRcvDateE == '')
        document.all.txRcvDateE.value = strRcvDateS;
    else if (Number(strRcvDateS) > Number(strRcvDateE))
    {
        document.all.txRcvDateS.value = strRcvDateE;
        document.all.txRcvDateE.value = strRcvDateS;
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

    strErrMsg += CheckDate('txRcvDateS', '收文日期(起)', true);
    strErrMsg += CheckDate('txRcvDateE', '收文日期(迄)', true);
    strErrMsg += CheckDate('txCloseDateS', '結案日期(起)', true);
    strErrMsg += CheckDate('txCloseDateE', '結案日期(迄)', true);

    if (strErrMsg != '')
    {
        alert(strErrMsg);
        return false;
    }

    return true;
}

function CheckBeforeSave()
{
    var strErrList = '';
    var strCaseType = '';
    var strCloseType = '';
    var strFromType = '';
    var strCaseFrom = '';
    var strCombine = '';

    for (var i = 2 ; i < dg1.rows.length + 1 ; i++)
    {
        strCaseType = document.all['dg1__ctl' + i + '_dlCaseType'].value;
        strCloseType = document.all['dg1__ctl' + i + '_dlCloseType'].value;
        strFromType = document.all['dg1__ctl' + i + '_dlFromType'].value;
        strCaseFrom = document.all['dg1__ctl' + i + '_dlCaseFrom'].value;
        strCombine = strCaseType + strCloseType + strFromType + strCaseFrom;

        //僅接受全有值或全空之資料
        if (!(strCombine.length == 0 || strCombine.length == 4))
            strErrList += document.all['dg1__ctl' + i + '_lbDocNo'].textContent + '\n';
    }

    if (strErrList != '')
    {
        alert('文號：\n' + strErrList + '辦理情形輸入不完整');
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

        //1080220 Zen 1080161 修改線上瀏覽方式為公文檢索側屜模式--begin
        //var unvSrc = '{"UnvRoot":{"Version":"3.4","Artifact":"#Artifact#","USER_ORGNO":"#SourceOrgNo#","Doc":{"Subject":"","SourceOrgNo":"#SourceOrgNo#","DocNo":"#DocNo#","Att":{"Type":"7","Alias":"正版電子檔案","PrintEnable":"TRUE"}}}}';
        //unvSrc = unvSrc.replace('#Artifact#', argArtifact);
        //unvSrc = unvSrc.replace('#DocNo#', argDocNo);
        //unvSrc = unvSrc.replace(/#SourceOrgNo#/g, argSourceOrgno);

        var strOpenDocModule = 'AOL';
        if (argSignType == 'P')
            strOpenDocModule = 'UniView';
        //1080220 Zen 1080161 修改線上瀏覽方式為公文檢索側屜模式--end

        //1080220 Zen 1080161 修改線上瀏覽方式為公文檢索側屜模式
        var rtnObj = jf_CallW(wsUrl, 'GetOnLineApplyDocUnvByJSON', false, param);
		var sUnvObj = rtnObj.value.RtnStr;
        if (!rtnObj.error)
        {
            if (rtnObj.value.m_bSuccess)
            {
                if (sUnvObj !== "")
                {
                    var UnvObj = JSON.parse(sUnvObj);
                    var objViewDoc = {
                        UNVObj: UnvObj,
                        docInfoPage: "EDT235",
                        //1080220 Zen 1080161 修改線上瀏覽方式為公文檢索側屜模式
                        //openDocModule: 'AOL',
                        openDocModule: strOpenDocModule,
                        signType: argSignType,
                        readOnlyMode: false,
                        disableSave: true
                    };
                    var $docId = jf_GetSessionID() + "_" + (+new Date());
                    localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
                    var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
                    jf_OpenChildWin(unvUrl, "ViewDoc");
                }
            }
            else
                alert('無可調閱之影像供線上瀏覽。');
        }
    } catch (e)
    {
        alert('開啟失敗');
    }
}