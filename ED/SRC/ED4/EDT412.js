/*
DATE 	SA		PRG		MGR_NO		DESC
1041111 David   Kenny   1040919     新增確認功能鍵
1050114	David	Kevin_C	1041004		列管且已辦結公文才能解除列管
1050302 David   Kenny   1041015     增加支援解除列管通知線上瀏覽功能
1050909 David   Zen     1050087     二代公文修改
1051019 Leslie  Kenny   1050087     二代公文修改
1060412 David   Zen     1060236     (鐵改局)儲存前檢核備註欄位是否為空
1060613 Kevin	Justin	1060456		弱掃Client Potential Code Injection修正
1061106 David   Zen     1061063     修正開起紙本文時線上瀏覽功能異常問題
1070731 Kevin	Justin	1070678		修正弱掃Hardcoded Absolute Path
1070830 Kevin   Justin  1070678     弱掃AJAX修改
1070926	David	Joe		--			修正EDI411開啟時抓不到opener.theWebServices的問題
1140409 Zen     Zen     1131243     支援記錄續辦文號
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

//1050909 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1070830 Justin [1070678]弱掃AJAX修改
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
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    //1050114	Kevin_C	1041004		設定解除列管警語位置
    //1050920 David   Zen     1050087     二代公文修改
    //if (!document.all.dg1)
    //    document.getElementById('DivForDg1').style.height = '0px';
    //else
    //{
    //    var nHeight = document.all.dg1.rows.length * 23;
    //    if (nHeight > 200)
    //        document.getElementById('DivForDg1').style.height = '200px';
    //    else
    //        document.getElementById('DivForDg1').style.height = nHeight + 'px';
    //}
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
        case "btAuditDate":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all["txDeAuditDate"], event.screenX, event.screenY);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050909 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
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

    //1050909 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1050909 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
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
            //1050909 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1050909 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1050909 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            document.all["txDocNo"].focus();
            break;
        //1041111   Kenny   [1040919]   增加確認功能鍵供由SSO開啟時使用
        case "btCheck":
            Page_BlockSubmit = false;
            //1050909 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1050302   Kenny   [1041015]   增加支援解除列管通知線上瀏覽功能
        case "btPreview":
            Page_BlockSubmit = true;
            //1060613 Justin [1060456] 弱掃Client Potential Code Injection修正
            //var Artifact = jf_Trim(document.all.H_txArtifact.value);
            //var DocNo = jf_Trim(document.all.txDocNo.value);
            //var OrgNo = jf_Trim(document.all.H_txOrgNo.value);
            var Artifact = encodeURI(jf_Trim(document.all.H_txArtifact.value));
            var DocNo = encodeURI(jf_Trim(document.all.txDocNo.value));
            var OrgNo = encodeURI(jf_Trim(document.all.H_txOrgNo.value));
            DownloadDocument(Artifact, DocNo, OrgNo);
            //1050909 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
    var bRtnbool = false;

    if (jf_CheckBeforSave())
    {
        // 新增模式需檢查鍵值是否已存在
        if (jf_GetActionMode() == LayoutModeNew)
        {
            if (jf_CheckDataExist(""))//檢查鍵值是否已存在
            {
                if (window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
                    bRtnbool = true;
            }
            else
                bRtnbool = true;
        }
        else
            bRtnbool = true;
    }

    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";
    if (!CheckDATE("txDeAuditDate", "解除列管日期"))
    {
        bRtnbool = false;
        //1050909 Zen 1050087 二代公文修改
        //document.all["txDeAuditDate"].focus();
        $('#txDeAuditDate').focus();
        return bRtnbool;
    }
    if (document.all["txDocNo"].value == "")
    {
        strErrMsg += "公文文號不可空白\n";
        //1050909 Zen 1050087 二代公文修改
        document.all["txDocNo"].focus();
        $('#txDocNo').focus();
    }
    if (document.all["txDeAuditDate"].value == "")
    {
        strErrMsg += "解除列管日期不可空白\n";
        //1050909 Zen 1050087 二代公文修改
        document.all["txDeAuditDate"].focus();
        $('#txDeAuditDate').focus();
    }
    if (document.all["dlDeAuditReason"].selectedIndex == 0)
    {
        strErrMsg += "需選擇解除列管原因\n";
    }
    //1050113	Kevin_C	1041004		增加解除列管條件 -S
    if (document.all["txAuditStatus"].value != "列管中")
    {
        strErrMsg += "列管中公文才能解除列管\n";
    }
    if (document.all["txCloseDate"].value == "")
    {
        strErrMsg += "需為已辦結公文才能解除列管\n";
    }
    //1060412 Zen 1060236 (鐵改局)儲存前檢核備註欄位是否為空
    if (document.all.H_txOrgNickName.value == 'RRB' && document.all.txDeAuditRemark.value == '')
    {
        strErrMsg += "備註欄位不可空白\n";
    }

    //1140409 Zen 1131243 支援記錄續辦文號
    let strFurtherDocno = document.all['txFurtherDocno'].value;
    if (strFurtherDocno != '')
        if (strFurtherDocno == document.all['txDocNo'].value)
            strErrMsg += "續辦文號不可與當前列管中公文相同\n";
        else if (strFurtherDocno != '' && ED4.EDT412.CheckCloseDate(document.all["txSourceOrgno"].value, strFurtherDocno).value == '')
            strErrMsg += "續辦文號需以結案\n";

    strErrMsg = strErrMsg.substring(0, strErrMsg.length - 1);
    //1050113	Kevin_C	1041004		增加解除列管條件 -E
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
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
var bHasCheck = false;
function CheckDATE(argObj, strMsg)
{
    if (bHasCheck)
    {
        bHasCheck = false;
        return;
    }
    bHasCheck = true;
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
            //1050909 Zen 1050087 二代公文修改
            //document.all[argObj].focus();
            $('#' + argObj).focus();
            if (strMsg)
                jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            bHasCheck = false;
            return false;
        }
    }
    bHasCheck = false;
    return true;
}
var bHasCheckDoc = false;
function CheckDocNO()
{
    /*if(document.all["txDocNo"].value!="")
    {
        if (bHasCheckDoc)
        {
            bHasCheckDoc = false;
            return true;
        }
        bHasCheckDoc = true;
        var IsDocExist=EDT412.CheckDoc(document.all["txDocNo"].value,document.all["txSourceOrgno"].value)
        if(IsDocExist.value=="false")
        {
            alert('輸入公文未列管過');
            document.all["txDocNo"].value="";
            document.all["txDocNo"].focus();
            bHasCheckDoc = false;
            return false;
        }
    }
    bHasCheckDoc = false;
    return true;*/
}
//1050302   Kenny   [1041015]   增加支援解除列管通知線上瀏覽功能--Start--
var uClientPath = "";

/*1070731 Justin [1070678]修正弱掃Hardcoded Absolute Path
function GetTempPath()
{
    var fso, f;
    fso = new ActiveXObject("Scripting.FileSystemObject");

    uClientPath = "c:\\TEMP\\AKI802_EDIT_TMP\\";
    if (!fso.FolderExists(uClientPath))
        fso.CreateFolder(uClientPath)
}*/

function DownloadDocument(argArt, argDocNo, argOrgNo)
{
    var artifact = argArt;
    var strDocNo = argDocNo;
    var strOrgNo = argOrgNo;
    //1050909 Zen 1050087 二代公文修改，改用二代瀏覽模組--begin
    //var ret;
    //ret = document.all.ocx.SetTargetUser(artifact);
    //if (ret == false)
    //{
    //    alert("使用者權杖(Artifact)驗證失敗，無法執行文稿調閱");
    //    return;
    //}
    //GetTempPath();
    //ret = document.all.ocx.DownloadDocument3(artifact, strOrgNo, strDocNo, uClientPath);
    //if (ret) {
    //    //Create DPP File
    //    var gLogFile = "C:\\temp\\aol.dpp";
    //    var fso, f;
    //    fso = new ActiveXObject("Scripting.FileSystemObject");
    //    if (!fso.FileExists(gLogFile))
    //        f = fso.CreateTextFile(gLogFile, true);
    //    else 
    //        f = fso.OpenTextFile(gLogFile, 2, true);

    //    f.WriteLine("<root>");
    //    f.WriteLine("<DOC_NO>" + strDocNo + "</DOC_NO>");
    //    f.WriteLine("</root>");
    //    f.close();
    //    var oShell = new ActiveXObject("Shell.Application");
    //    var param = "SAMLart=" + artifact + " Sys_Dir=C:\2100\aol\od " + gLogFile;

    //    var commandtoRun = "c:\\2100\\aol\\aol.exe";
    //    oShell.ShellExecute(commandtoRun, param, "", "", "0")
    //}
    //else
    //    alert("下載失敗!");
    try
    {
        //1070926	Joe		--		修正EDI411開啟時抓不到opener.theWebServices的問題--S
        // var wsUrl = opener.theWebServices.url('fileiows');
        // var param = [];
        // param[0] = artifact;
        // param[1] = strDocNo;
        // param[2] = strOrgNo;
        //1070926	Joe		--		修正EDI411開啟時抓不到opener.theWebServices的問題--E

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
        //            jf_OpenChildWin(unvUrl, "ODT251ViewDoc");
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
                docInfoPage: "EDT412",
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
    //1050909 Zen 1050087 二代公文修改，改用二代瀏覽模組--end
}
//1050302   Kenny   [1041015]   增加支援解除列管通知線上瀏覽功能--End--