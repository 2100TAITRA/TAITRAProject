/*
日期	SA		PG		單號		DESC
1031028	Leslie	Kenny	1030836		配合SSL修改傳入元件之URL
1040730 Cloud   Cloud   1030160     修改for外陳外會，增加判斷doc_extra.ComeOthers欄位開啟公文製作時取得稿件路徑增加機關代碼
1060728 Cloud   Zen     1050087     二代升級
1100504 Kevin   Zen     1100473     弱掃Client DOM XSS修正
1110630 Leslie  Zen     1110371     純檔管線上瀏覽功能補修改至EAI300系列程式
1131015 Kevin   Zen     1130941     弱掃Client Dynamic File Inclusion修正
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

//1060728 Zen 1050087 二代升級
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

var iCallID_ToDoList = null;
//1060728 Zen 1050087 二代升級
//var fso = new ActiveXObject("Scripting.FileSystemObject");
var uEditWin, uTimerID;
var uClientPath = "";
var iCallID = 0;
var SumDocWin, SumComWin;
var DetDocWin, DetComWin;
var PDFWin;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
//1060728 Zen 1050087 二代升級
//function ClientOnLoad()
function ClientOnLoad(e)
{
    //解決StartupScript問題 #2007.07.19 Andy
    if (document.all["CALL_DOC_CHECK"])
    {
        var s = document.all["CALL_DOC_CHECK"].value;
        if (s == "1")
        {
            getOpenerValue('DOC_CHECK');
            document.all["CALL_DOC_CHECK"].value = "";
        }
    }

    //1060728 Zen 1050087 二代升級
    //jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, null); //使用WebService前必須先呼叫一次

    //1060728 Zen 1050087 二代升級，改用二代線上瀏覽模組
    //OpenUnv();

    //解決StartupScript問題 #2007.07.19 Andy
    if (document.all["CALLEAI301"])
    {
        var s = document.all["CALLEAI301"].value;
        if (s != "")
        {
            //1060728 Zen 1050087 二代升級
            //jf_OpenSumDocWin(s);
            EAI302fn.jf_OpenSumDocWin(s);
            document.all["CALLEAI301"].value = "";
        }
    }
    if (document.all["OpenEAI303"])
    {
        var s = document.all["OpenEAI303"].value;
        if (s != "")
        {
            //1060728 Zen 1050087 二代升級
            //jf_OpenDetDocWin(s);
            EAI302fn.jf_OpenDetDocWin(s)
            document.all["OpenEAI303"].value = "";
        }
    }
    if (document.all["APPLY1"])
    {
        var s = document.all["APPLY1"].value;
        if (s != "")
        {
            jf_OpenChildWin(s, 'AKT850', 800, 530);
            document.all["APPLY1"].value = "";
        }
    }
    if (document.all["APPLY2"])
    {
        var s = document.all["APPLY2"].value;
        if (s != "")
        {
            jf_OpenChildWin(s, 'AKT800', 800, 530);
            document.all["APPLY2"].value = "";
        }
    }

    //1060728 Zen 1050087 二代升級
    var DocList = $('#DocListPrepared');
    if (DocList && DocList.val() == '1')
    {
        //1110630 Zen 1110371 純檔管線上瀏覽功能補修改至EAI300系列程式
        var useT2100OD = $('#h_UseT2100OD').val();
        if (useT2100OD != '1')
            jf_ShowModal('EAI300View.ashx');
        else
            if (opener.CallBackByImgView())
                alert("檢索清單已準備完成，請由檢索側屜調閱公文影像。");
    }
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060728 Zen 1050087 二代升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060728 Zen 1050087 二代升級
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
        case "btOpenEdit":		//文稿編輯
            Page_BlockSubmit = true;
            //1060728 Zen 1050087 二代升級--begin
            //DownloadDocument();
            var strArtifact = jf_GetArtifact();
            var strOrgNo = jf_Trim(document.all["txOrgNo"].value);
            var strDocNo = document.all["lbDOC_NO"].textContent;
            DownloadDocument(strArtifact, strDocNo, strOrgNo);
            //1060728 Zen 1050087 二代升級--end
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060728 Zen 1050087 二代升級
//function jf_ToolBarHandle()
function jf_ToolBarHandle(e)
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

    //1060728 Zen 1050087 二代升級
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btSUM1":			// 顯示摘要
        case "btFIRSTDOC1":		// 畫面切換到第一筆
        case "btPRIORDOC1":		// 畫面切換到上一筆
        case "btNEXTDOC1":		// 畫面切換到下一筆
        case "btLASTDOC1":		// 畫面切換到最末筆
        case "btDetailPrint":	// 明細列印
            Page_BlockSubmit = false;
            //1060728 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btIMAGE1":		// 線上瀏覽
        case "btAPPLY1":		// 申請調檔
            if (document.all.cbSELECT.checked == false)
            {
                document.all.cbSELECT.checked = true;
                SelectItem('DOC_CHECK');
            }
            pStr = document.all["DOC_CHECK"].value;
            if (pStr.indexOf('1') == -1)
            {
                alert('請至少勾選一筆資料!!');
                return;
            }
            else
            {
                Page_BlockSubmit = false;
                //1060728 Zen 1050087 二代升級
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btQueryProcess":	// 流程查詢
            Page_BlockSubmit = true;
            if (CheckBeforeQueryProcess())
            {
                //1060728 Zen 1050087 二代升級
                //var xUrl = document.all["ODWebPath"].value + "ODI260.aspx?pDocNo=" + document.all["lbDOC_NO"].innerText + "&SAMLart=" + document.all["Artifact"].value + "&SOURCE_ORGNO=" + document.all["txOrgNo"].value;
                var xUrl = document.all["ODWebPath"].value + "ODI260.aspx?pDocNo=" + document.all["lbDOC_NO"].textContent + "&SAMLart=" + document.all["Artifact"].value + "&SOURCE_ORGNO=" + document.all["txOrgNo"].value;
                jf_OpenChildWin(xUrl, "ODI260", 750, 450);
            }
            else
            {
                alert("歷史檔案未提供公文辦理流程紀錄");
            }
            //1060728 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btEXIT1":			// 離開
            ret = window.confirm("確定要離開本程式嗎？");
            Page_BlockSubmit = true;
            //1060728 Zen 1050087 二代升級
            //if (ret) window.close();
            if (ret)
                jf_CloseSelf();
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
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            var result = argResult.value;
            if (result.substring(0, 1) == "0")
                jf_OpenPDFWin(result.substring(1, result.length), null, "fullscreen=no,Height=" + String(window.screen.height - 54) + ",Width=" + String(window.screen.width - 8) + ",Top=0,Left=0,Scrollbars=yes,titlebar=yes,status=yes,resizeable=yes");
            else
            {
                if (result.substring(0, 1) == "1" || result.substring(0, 1) == "2")
                    alert(result.substring(1, result.length));
                else
                    alert(result);
            }
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
    /*
    if(argCallerId == "SII020")
    {
        document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
        document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
        document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
        document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
        if(document.all["txKeyFld"].value != "")
        {
            Page_BlockSubmit=false;
            jf_OpenButtonSubmit();
        }
        document.all["txKeyFld"].focus();
    }
    */

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{
    /*
    try
    {
        opener.document.all.lbReturnValue.length = 3;
        opener.document.all.lbReturnValue.options[0].value = argLink;
        opener.document.all.lbReturnValue.options[1].value = argRead1;
        opener.document.all.lbReturnValue.options[2].value = argRead2;
        opener.window.CallBack("SII020");
        close();
    }
    catch (e) {}
    */
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function getOpenerValue(key)
{
    if (document.all["h_tbFlag"].value == "")
    {
        document.all["h_tbFlag"].value = "PostBack";
        document.all[key].value = opener.document.all[key].value;

        setSelect(key);
    }
}

function setSelect(key)
{
    var Info = document.all[key].value;
    var flag;
    var SEQ_NO = document.all["lbSEQ_NO"].innerHTML;

    flag = Info.substr(parseInt(SEQ_NO) - 1, 1);
    if (flag == "1")
        document.all["cbSELECT"].checked = true;
    else
        document.all["cbSELECT"].checked = false;
}

/*****************************************************
 name: SelectItem
 desc: 處理選取checkbox
*****************************************************/
function SelectItem(argCookie_nm)
{
    var pStr = document.all[argCookie_nm].value;
    pStr1 = '';
    pStr2 = '';
    pType = 0;

    //1060728 Zen 1050087 二代升級
    //var pi_index = Number(document.all["lbSEQ_NO"].innerText);
    var pi_index = Number(document.all["lbSEQ_NO"].textContent);

    if (document.all.cbSELECT.checked) { pType = '1' }
    else { pType = '0' }

    if (pi_index == 1) { pStr1 = '' }
    else { pStr1 = pStr.substring(0, pi_index - 1) }
    pStr2 = pStr.substring(pi_index, pStr.length)

    pStr = pStr1 + pType + pStr2
    document.all[argCookie_nm].value = pStr;
    opener.document.all[argCookie_nm].value = document.all[argCookie_nm].value;
}

/**************************************************
  以下處理線上瀏覽
 **************************************************/
//1060728 Zen 1050087 二代升級，因應二代系統將公文加入公文檢索側屜--begin
//function OpenUnv()
//{
//    if (document.all.txUnvFile.value == "") return;

//    DownLoadByHttpTrans();

//    var oShell = new ActiveXObject("Shell.Application");
//    var param = "";
//    //var param = " /filename="+strPath + " /userid=frank /stampPath="+pPath+"\\StampBox.xml" ;
//    var commandtoRun = document.all.txUnvFileLocal.value;
//    oShell.ShellExecute(commandtoRun, param, "", "", "0");

//    document.all.txUnvFile.value = ""; //reset
//}

//function DownLoadByHttpTrans()
//{
//    //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
//    //document.all.dnFile.Servername = document.all["txServerName"].value; 
//    var serviceURL = document.all["txServerName"].value;
//    if (document.all.II_USE_SSL != null)
//    {
//        if (document.all.II_USE_SSL.value == "Y")
//            serviceURL = serviceURL.replace("http://", "https://");
//    }
//    document.all.dnFile.Servername = serviceURL;

//    document.all.dnFile.Port = document.all["txServerPort"].value;
//    document.all.dnFile.displayProgress = true;

//    var strFile = document.all.txUnvFile.value;
//    document.all.dnFile.addItem(strFile);

//    if (document.all.dnFile.download() == 0)
//    {
//        document.all.dnFile.resetItem();
//        window.status = "下載完畢!";
//    }
//    else
//    {
//        document.all.dnFile.resetItem();
//        alert("下載失敗!\n" + document.all.dnFile.ErrorString);
//        window.status = "下載失敗!";
//    }
//}
//1060728 Zen 1050087 二代升級，因應二代系統將公文加入公文檢索側屜--end

/**************************************************
  以下處理流程查詢
 **************************************************/
function CheckBeforeQueryProcess()
{
    var KeyName = new Array(2);
    KeyName[0] = "SOURCE_ORGNO";
    KeyName[1] = "DOC_NO";
    var KeyValue = new Array(2);
    KeyValue[0] = document.all["txOrgNo"].value;
    //1060728 Zen 1050087 二代升級
    //KeyValue[1] = document.all["lbDOC_NO"].innerText;
    KeyValue[1] = document.all["lbDOC_NO"].textContent;
    var RtnFldName = new Array(1);
    RtnFldName[0] = "MSG_ID";
    var OrdFldName = new Array(1);
    OrdFldName[0] = "MSG_ID";

    var param = new Array(5);
    param[0] = "TODO_LIST";
    param[1] = KeyName;
    param[2] = KeyValue;
    param[3] = RtnFldName;
    param[4] = OrdFldName;
    RtnObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, param);

    if (jf_IsWebServiceSuccess(RtnObj))
        return true;
    else
        return false;
}

/**************************************************
  以下處理文稿編輯
 **************************************************/
//1060728 Zen 1050087 二代升級，改用二代線上瀏覽模組--begin
//function DownloadDocument()
//{
//var artifact = document.all.Artifact.value;
//var strDocNo = document.all["lbDOC_NO"].innerText;
//var ret;
//ret = document.all.ocx.SetTargetUser(artifact);
//if (ret == false)
//{
//    alert("使用者權杖(Artifact) 驗證失敗，無法執行文稿調閱");
//    return;
//}
//GetTempPath();

//ret = document.all.ocx.DownloadDocument3(artifact, document.all["txOrgNo"].value, strDocNo, uClientPath);

//if (ret)
//    OpenEdit(strDocNo);
//else
//    alert("歷史檔案未提供文稿調閱功能");
//}

//function OpenEdit(argDocNo)
//{
//    var EditPath = "file:///C:/2100/公文製作/MainCtrl.html?MODE=2&ID=" + document.all["USERNAME"].value + "&ReadOnly=Yes&Action=Open&Location=";
//    //找尋是否有製作檔 FOLDER = 文號-00-99
//    var IsFolderExist = false;
//    // 公文製作檔目錄
//    var pDocFolder = uClientPath + "\\" + argDocNo + "-00-99";
//    //1040730   Cloud   [1030160] 修改for外陳外會，增加判斷doc_extra.ComeOthers欄位開啟公文製作時取得稿件路徑增加機關代碼
//    if (document.all.IsComeOthers)//他機關外陳外會公文
//        pDocFolder = uClientPath + "\\" + argDocNo + "-" + document.all["txOrgNo"].value + "-00-99";
//    if (fso.FolderExists(pDocFolder))
//        IsFolderExist = true;
//    if (IsFolderExist)
//    {
//        while (pDocFolder.indexOf("\\") != -1)
//        {
//            pDocFolder = pDocFolder.replace("\\", "/");
//        }
//        EditPath += pDocFolder + "/";
//        try
//        {
//            EditPath += "&OrgID=" + document.all.nOrgID.value;
//            if (document.all.ocx.GetEnvSet("AKI802_WEBEDIT_BY_SHELL") == "Y")
//            {
//                //caesar 0940519 避免XP SP2問題
//                //改以ShellExecute開啟公文製作
//                var oShell = new ActiveXObject("Shell.Application");
//                var strFeature = "";
//                var strWidth = "";
//                var strHeight = "";
//                var strWinName = "";
//                var param = "file:///C:/2100/SSO/Medium.html?Feature=" + strFeature + "&TargetUrl=" + escape(encodeURIComponent(EditPath)) + "&WinName=" + strWinName + "&Feature=" + strFeature + "&Width=" + strWidth + "&Height=" + strHeight;
//                var commandtoRun = "";

//                oShell.ShellExecute("IEXPLORE.EXE", param, null, null, "0");
//            }
//            else
//            {
//                uEditWin = jf_OpenChildWin(EditPath);
//                uTimerID = setInterval("WaitClose();", 500);
//            }
//        }
//        catch (e)
//        {
//            alert(e.message);
//            DeleteTmpFolder();
//        }
//    }
//    else
//    {
//        alert("公文製作檔不存在");
//        DeleteTmpFolder();
//    }

//}

//function GetTempPath()
//{
//    var x;
//    var e = new Enumerator(fso.Drives);
//    while (!e.atEnd())
//    {
//        x = e.item();
//        if (x.DriveType == 2)
//            break;
//        e.moveNext();
//    }
//    uClientPath = x.DriveLetter + ":\\EAI302_EDIT_TMP";
//    if (!fso.FolderExists(uClientPath))
//        fso.CreateFolder(uClientPath)
//}

//function WaitClose()
//{
//    if (uEditWin.closed)
//    {
//        clearInterval(uTimerID);
//        DeleteTmpFolder();
//    }
//}

//function DeleteTmpFolder()
//{
//    if (fso.FolderExists(uClientPath))
//        fso.DeleteFolder(uClientPath);
//}

function DownloadDocument(argArt, argDocNo, argOrgNo)
{
    var artifact = argArt;
    var strDocNo = argDocNo;
    var strOrgNo = argOrgNo;
    var ret;

    try
    {
        var wsUrl = "";
        if (opener.theWebServices)
            wsUrl = opener.theWebServices.url('fileiows');
        else
            wsUrl = opener.opener.theWebServices.url('fileiows');
        var param = [];
        param[0] = artifact;
        param[1] = strDocNo;
        param[2] = strOrgNo;

        var rtnObj = jf_CallW(wsUrl, 'GetOnLineApplyDocUnvByJSON', false, param);
        if (!rtnObj.error)
        {
            if (rtnObj.value.m_bSuccess)
            {
                var sUnvObj = rtnObj.value.RtnStr;
                if (sUnvObj !== "")
                {
                    var UnvObj = JSON.parse(sUnvObj);
                    var objViewDoc = {
                        UNVObj: UnvObj,
                        docInfoPage: "AKI802",
                        openDocModule: 'AOL',
                        signType: 'E',
                        readOnlyMode: true
                    };
                    var $docId = jf_GetSessionID() + "_" + (+new Date());
                    localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
                    var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
                    jf_OpenChildWin(unvUrl, "ODT251ViewDoc");
                }
            }
            else
            {
                alert(rtnObj.value.m_strErrMsg);
            }
        }
        else
        {
            alert(rtnObj.error.errorDetail.string)
        }
    } catch (e)
    {
        alert('開啟失敗');
    }
}
//1060728 Zen 1050087 二代升級，改用二代線上瀏覽模組--end

//1060728 Zen 1050087 二代升級，改用location指定url避免視窗的opener錯亂
var EAI302fn = {
    jf_OpenSumDocWin: function jf_OpenSumDocWin(sUrl)
    {
        //1131015 Zen 1130941 弱掃Client Dynamic File Inclusion修正
        //var sUrlHeader = window.location.origin;
        var sUrlFolder = window.location.pathname;
        //1100504 Zen 1100473 弱掃Client DOM XSS修正
        //window.location.href = sUrlHeader + sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + sUrl;
        //1131015 Zen 1130941 弱掃Client Dynamic File Inclusion修正
        //window.location.href = HtmlEncode(sUrlHeader) + sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + sUrl;
        window.location.href = sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + sUrl;
    },

    jf_OpenDetDocWin: function jf_OpenDetDocWin(sUrl)
    {
        //1131015 Zen 1130941 弱掃Client Dynamic File Inclusion修正
        //var sUrlHeader = window.location.origin;
        var sUrlFolder = window.location.pathname;
        //1100504 Zen 1100473 弱掃Client DOM XSS修正
        //window.location.href = sUrlHeader + sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + sUrl;
        //1131015 Zen 1130941 弱掃Client Dynamic File Inclusion修正
        //window.location.href = HtmlEncode(sUrlHeader) + sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + sUrl;
        window.location.href = sUrlFolder.substring(0, sUrlFolder.lastIndexOf("/") + 1) + sUrl;
    }
}

//1100504 Zen 1100473 弱掃Client DOM XSS修正
function HtmlEncode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}