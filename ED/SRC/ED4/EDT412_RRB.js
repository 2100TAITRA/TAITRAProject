/*
 * DATE		PRG			MGR_NO		DESC
 * 1050914	Justin		1050814     新增EDT412_RRB 解除列管作業
 * 1051019	Kenny		1050087     二代公文修改
 * 1060608	Kevin_C		1060446		增加線上瀏覽功能
 * 1060613	Justin		1060456		弱掃Client Potential Code Injection修正
 * 1061106  Zen         1061063     修正開起紙本文時線上瀏覽功能異常問題
 * 1070126  Zen         1070044     (鐵改局)新增刪除功能
 * 1070830  Justin      1070678     弱掃AJAX修改
 * 1071025  Joe         1071093     不檢核報告單文號必須為子文
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
    if (document.all["txDOC_NO"].readOnly != true)
    {
        document.all.open.className = "hide";
        document.all["H_AUDIT_REASON"].value = "";
    } else
        document.all.open.className = "";
    if (document.all["H_AUDIT_REASON"].value != "不需回報會議紀錄")
    {
        if (document.all.open.className == "")
            document.all.Type1.className = "";
        document.all.Type2.className = "hide";
        document.all.rbType1.checked = true;
        document.all["H_AUDIT_REASON"].value = "會議記錄";
    }
    else if (document.all["H_AUDIT_REASON"].value == "不需回報會議紀錄")
    {
        document.all.Type1.className = "hide";
        document.all.Type2.className = "";
        document.all.rbType2.checked = true;
    }
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改；移除
//function ClientButtonControl()
//{
//}

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
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            jf_ToolBarSubmit(xObjectName);
            document.all.open.className = "hide";
            break;
        case "btSave":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            jf_ToolBarSubmit(xObjectName);
            break;
            // 1060608		Kevin_C	1060446		增加線上瀏覽功能
        case "btPreview":
            Page_BlockSubmit = true;
            //1060613 Justin [1060456] 弱掃Client Potential Code Injection修正
            //var Artifact = jf_Trim(document.all.H_txArtifact.value);
            //var DocNo = jf_Trim(document.all.txDOC_NO.value);
            //var OrgNo = jf_Trim(document.all.H_txOrgNo.value);
            var Artifact = encodeURI(jf_Trim(document.all.H_txArtifact.value));
            var DocNo = encodeURI(jf_Trim(document.all.txDOC_NO.value));
            var OrgNo = encodeURI(jf_Trim(document.all.H_txOrgNo.value));
            DownloadDocument(Artifact, DocNo, OrgNo);
            jf_ToolBarSubmit(xObjectName);
            break;
            //1070126 Zen 1070044 (鐵改局)新增刪除功能
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
    var bRtnbool = false;

    if (jf_CheckBeforSave())
        bRtnbool = true;
    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (document.all["txDEAUDIT_DATE"].value == "")
    {
        strErrMsg += "解除列管日期欄位不可空白\n";
        $('#txDEAUDIT_DATE').focus();
    }

    if (document.all["rbType1"].checked)
    {
        if (document.all["txDEAUDIT_DOC_NO"].value == "")
        {
            strErrMsg += "會議記錄文號欄位不可空白\n";
            $('#txDEAUDIT_DOC_NO').focus();
        } 
		//1071025  Joe     1071093     不檢核報告單文號必須為子文--S
		// else if (document.all["txDOC_NO"].value != document.all["H_COM_NO"].value)
        // {
            // strErrMsg += '此公文非文號' + document.all["txDOC_NO"].value + '的併案子文，請進行併案陳核設定或重新輸入\n';
            // $('#txDEAUDIT_DOC_NO').focus();
        // }
		//1071025  Joe     1071093     不檢核報告單文號必須為子文--E
    } else if (document.all["rbType2"].checked)
    {
        if (document.all["txDEAUDIT_REMARK"].value == "")
        {
            strErrMsg += "備註欄位不可空白\n";
            $('#txDEAUDIT_REMARK').focus();
        }
    }
    else
        strErrMsg += "請選擇解除列管原因\n";

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
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
        }
        else
        {
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
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function rbType_onchange()
{
    if (document.all["rbType1"].checked)
    {
        document.all.Type1.className = "";
        document.all.Type2.className = "hide";
        document.all["H_AUDIT_REASON"].value = "會議記錄";
    }
    else if (document.all["rbType2"].checked)
    {
        document.all.Type1.className = "hide";
        document.all.Type2.className = "";
        document.all["H_AUDIT_REASON"].value = "不需回報會議紀錄";
    }
}

function txDEAUDIT_DOC_NO_OnBlur()
{
    if (document.all["txDEAUDIT_DOC_NO"].value != "")
    {
        //1070830 Justin [1070678]弱掃AJAX修改
	    //document.all["H_COM_NO"].value = EDT412_RRB.CheckExistMADM(document.all["H_OrgNo"].value, document.all["txDEAUDIT_DOC_NO"].value).value;
	    document.all["H_COM_NO"].value = ED4.EDT412_RRB.CheckExistMADM(document.all["H_OrgNo"].value, document.all["txDEAUDIT_DOC_NO"].value).value;
        if (document.all["H_COM_NO"].value != "NotExist")
        {
			//1071025  Joe     1071093     不檢核報告單文號必須為子文--S
			/*
            if (document.all["txDOC_NO"].value == document.all["H_COM_NO"].value)
            {
                //1070830 Justin [1070678]弱掃AJAX修改
                //document.all["txDEAUDIT_SUBJECT"].value = EDT412_RRB.getFROM_SUBJECT(document.all["H_OrgNo"].value, document.all["txDEAUDIT_DOC_NO"].value).value;
		        document.all["txDEAUDIT_SUBJECT"].value = ED4.EDT412_RRB.getFROM_SUBJECT(document.all["H_OrgNo"].value, document.all["txDEAUDIT_DOC_NO"].value).value;
            }
            else
                alert('此公文非文號' + document.all["txDOC_NO"].value + '的併案子文，請進行併案陳核設定或重新輸入');
			*/
			document.all["txDEAUDIT_SUBJECT"].value = ED4.EDT412_RRB.getFROM_SUBJECT(document.all["H_OrgNo"].value, document.all["txDEAUDIT_DOC_NO"].value).value;
			//1071025  Joe     1071093     不檢核報告單文號必須為子文--E
        } else
            alert('輸入之公文文號不存在');
    }
}
// 1060608		Kevin_C	1060446		增加線上瀏覽功能
function DownloadDocument(argArt, argDocNo, argOrgNo)
{
    var artifact = argArt;
    var strDocNo = argDocNo;
    var strOrgNo = argOrgNo;
    try
    {
        var wsUrl = opener.theWebServices.url('fileiows');
        var param = [];
        param[0] = artifact;
        param[1] = strDocNo;
        param[2] = strOrgNo;

        //1061106 Zen 1061063 修正開起紙本文時線上瀏覽功能異常問題--begin
        //var rtnObj = jf_CallW(wsUrl, 'GetOnLineApplyDocUnvByJSON', false, param);
        //if (!rtnObj.error)
        //{
        //    if (rtnObj.value.m_bSuccess)
        //    {
        //        var sUnvObj = rtnObj.value.RtnStr;
        //        if (sUnvObj !== "")
        //        {
        //            var UnvObj = JSON.parse(sUnvObj);
        //            var objViewDoc = {
        //                UNVObj: UnvObj,
        //                docInfoPage: "AKI802",
        //                openDocModule: 'AOL',
        //                signType: 'E',
        //                readOnlyMode: true
        //            };
        //            var $docId = jf_GetSessionID() + "_" + (+new Date());
        //            localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
        //            var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
        //            jf_OpenChildWin(unvUrl, "EDT412_RRB_ViewDoc");
        //        }
        //    }
        //    else
        //    {
        //        alert(rtnObj.value.m_strErrMsg);
        //    }
        //}
        //else
        //{
        //    alert(rtnObj.error.errorDetail.string)
        //}
        var unvSrc = '{"UnvRoot":{"Version":"3.4","Artifact":"#artifact#","USER_ORGNO":"#SourceOrgNo#","Doc":{"Subject":"","SourceOrgNo":"#SourceOrgNo#","DocNo":"#DocNo#","Att":{"Type":"7","Alias":"正版電子檔案","PrintEnable":"TRUE"}}}}';
        unvSrc = unvSrc.replace('#artifact#', artifact);
        unvSrc = unvSrc.replace('#DocNo#', strDocNo);
        unvSrc = unvSrc.replace(/#SourceOrgNo#/g, strOrgNo);

        var strSignType = encodeURI(document.all.H_SignType.value);

        var sUnvObj = unvSrc;
        if (sUnvObj !== "")
        {
            var UnvObj = JSON.parse(sUnvObj);
            var objViewDoc = {
                UNVObj: UnvObj,
                docInfoPage: "EDT412_RRB",
                openDocModule: 'AOL',
                signType: strSignType,
                readOnlyMode: false,
                disableSave: true
            };
            var $docId = jf_GetSessionID() + "_" + (+new Date());
            localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
            var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
            jf_OpenChildWin(unvUrl, "ViewDoc");
        }
        //1061106 Zen 1061063 修正開起紙本文時線上瀏覽功能異常問題--end
    } catch (e)
    {
        alert('開啟失敗');
    }
}