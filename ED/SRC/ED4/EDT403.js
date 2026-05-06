/*
DATE	SA		PRG		MGR_NO		DESC
0970708	--		Leslie	0970512		額外修正開啟EDI200會出現"隸屬機關:測試用"的問題
1050503 Cloud   Justin  1050087     二代公文修改
1050818	Cloud	Kevin_C	1050087		二代修改，改用二代瀏覽模組
1051019 Leslie  Kenny   1050087     二代公文修改
1060613 Kevin	Justin	1060456		弱掃Client Potential Code Injection修正
1061103 Kevin	Zen		1061071	    修正點擊核可多次會收到重複通知之問題
1070412 Cloud   Zen     1061071     修正檢核失敗後無法postback之問題
1070731 Kevin	Justin	1070678		修正弱掃Hardcoded Absolute Path
1070830 Kevin   Justin  1070678     弱掃AJAX修改
1070912 Kevin	Joe		1070172		新增功能線上瀏覽、撤回、參考附件、預排流程，紙本公文不提供線上申請
1130522 Cloud   Jason	1130387     修改說明欄位顯示資訊
1130918 Cloud   Cloud   1130941     弱掃XSS修正
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
var strTableFields = new Array("_lbRead", "_txInput1", "_txInput2");

/*1050503 Justin 1050087 二代公文修改  
if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/
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
    jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    //1130522 	Jason	1130387     修改說明欄位顯示資訊
    if (document.all["H_ShowDecList"].value == "N") {
        document.all["divDescList"].style.display = "none";//隱藏資訊
        document.all["divDescList2"].style.display = "none";//隱藏資訊
    }
    //1130918 Cloud    1130941     弱掃XSS修正
    SetDescDecode();
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
        case btHelp:
            /*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050503 Justin 1050087 二代公文修改 
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
    {
        //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1050503 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btTransfer":
            /*1050503 Justin 1050087 二代公文修改 
			var ddlIdx=1;
			var nextOpt = GetToolbarCtrl(ddlIdx);
			var aOptions = nextOpt.getOptions();
			document.all.SelectedUser.value = aOptions.value;
			document.all.SelectedUser2.value = aOptions[aOptions.selectedIndex].text;*/
            document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
            document.all.SelectedUser2.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].text;

            Page_BlockSubmit = !CheckUnAllowEmpty();
            //1050503 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btApprove":
            Page_BlockSubmit = !CheckUnAllowEmpty();
            //1050503 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btReject":
            Page_BlockSubmit = !CheckUnAllowEmpty();
            //1050503 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
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
            //1050503 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            //1050818	Kevin_C	二代修改
            //jf_ToolBarSubmit(xObjectName);
            break;
        case "btSearch":
            Page_BlockSubmit = true;
            var strArtifact = document.all.nArtifact.value;
            var strDocNo = document.all["txDocNo"].value;
            var strApplyNo = document.all["txApplyNo"].value;
            var strHttp = document.all.nHttp.value;
            var strSourceOrgno = document.all.nSourceOrgno.value;
            //var strUrl = strHttp +"ODI260.aspx?nFrom=EDT402&pDocNo="+strDocNo+"&uApplyNo=" + strApplyNo+"&SAMLart=" + strArtifact;
            //0970512	Leslie	增加傳入Artifact，才不會出現"隸屬機關:測試用"
            var strUrl = strHttp + "EDI200.aspx?SOURCE_ORGNO=" + strSourceOrgno + "&argMsgFrom=EDT402&argTargetNo=" + strDocNo + "&SAMLart=" + strArtifact;
            jf_OpenChildWin(strUrl, "EDI200", 800, 600);
            //1050503 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
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
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckUnAllowEmpty()
{
    var bRtnbool = true;
    var strErrMsg = "";
    //if (document.all["txDesc"].value == "")		//Leslie	線上申請之簽核作業統一不強制要求輸入簽核意見
    //{
    //	strErrMsg = "審核意見不可為空白";
    //	document.all["txDesc"].focus();
    //}
    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    return bRtnbool;
}

function dlPhraseNo_onchange()
{
    var index = document.all["dlPhraseNo"].selectedIndex;
    //1050503 Justin 1050087 二代公文修改
    //var val = document.all["dlPhraseNo"].options[index].innerText;
    var val = document.all["dlPhraseNo"].options[index].textContent;
    document.all["txDesc"].value += val;
    document.all["dlPhraseNo"].options[0].selected = true;
    /*1050505 Justin 1050087 二代公文修改
	document.all["txReason"].focus();*/
    $('#txReason').focus();
}

function GetToolbarCtrl(argId)
{
    return document.all.tbTool.getItem(argId);
    for (var i = 0; i < 20; i++)
    {
        var o = document.all.tbTool.getItem(i);
        if (o != null)
        {
            alert(o.getAttribute("ID"));
            if (o.getAttribute("ID") == argId)
                return o;
        }
    }
    return null;
}
/*1070731 Justin [1070678]修正弱掃Hardcoded Absolute Path
function GetTempPath()
{
    var fso, f;
    var ForReading = 1, ForWriting = 2;
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
    //1050818	Kevin_C	二代修改，改用二代瀏覽模組 -S
    //var ret;

    // ret = document.all.ocx.SetTargetUser(artifact);
    // if(ret==false)
    // {
    // alert("使用者權杖(Artifact) 驗證失敗，無法執行文稿調閱");
    // return;
    // }
    // GetTempPath();
    // ret =document.all.ocx.DownloadDocument3(	artifact,strOrgNo,strDocNo,uClientPath);
    // if(ret)
    // {
    ////Create DPP File
    // var gLogFile = "C:\\temp\\aol.dpp";
    // var fso, f;
    // var ForReading = 1, ForWriting = 2;
    // fso = new ActiveXObject("Scripting.FileSystemObject");
    // if(!fso.FileExists(gLogFile))
    // {
    // f = fso.CreateTextFile(gLogFile,true);
    // }
    // else
    // {
    // f= fso.OpenTextFile(gLogFile, 2, true);
    // }

    // f.WriteLine("<root>");
    // f.WriteLine("<DOC_NO>"+strDocNo+"</DOC_NO>");
    // f.WriteLine("</root>");
    // f.close();
    // var oShell = new ActiveXObject("Shell.Application");
    // var param = "SAMLart="+artifact+" Sys_Dir=C:\2100\aol\od "+gLogFile;

    // var commandtoRun = "c:\\2100\\aol\\aol.exe";
    // oShell.ShellExecute(commandtoRun, param, "", "", "0")
    // }
    // else
    // alert("下載失敗!");
    try
    {
        var wsUrl = opener.theWebServices.url('fileiows');
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
    //1050818	Kevin_C	二代修改，改用二代瀏覽模組 -E
}

//1070912	Joe		1070172		附件瀏覽功能--S
function OpenFile(argFileName) {
	var DownToPath = document.all["H_WorkPath"].value + "EDT402\\" + document.all.txApplyNo.value + "\\";
	var DownFromPath = document.all["H_StartPath"].value + "\\EDT402\\" + document.all.txApplyNo.value + "\\";
	var rtnVal = ED4.EDT402.AttDownLoad(DownFromPath, DownToPath, document.all.H_txArtifact.value, document.all.H_WS.value, argFileName).value;
	if (rtnVal[1] != "")
		alert(rtnVal[1]);
	else
	    openDlg(rtnVal[0] + "&OpenType=download", document.all.H_txArtifact.value, "");
	Page_BlockSubmit = true; 
}
//1070912	Joe		1070172		附件瀏覽功能--E
//1130918   Cloud   1130941     弱掃XSS修正-S
var arrDesc = new Array("lbDesc", "DescList1", "DescList2", "DescList3", "DescList4", "DescList5");
function SetDescDecode() {
    for (var iDsc = 0; iDsc < arrDesc.length; iDsc++) {
        htmlDecode(arrDesc[iDsc]);
    }
}
function htmlDecode(argId) {
    var tempVal = document.all[argId].textContent;
	if(tempVal!="")
	{
		var div = document.createElement('div');
		div.innerHTML = tempVal;
		document.all[argId].textContent = div.textContent;
	}
}
//1130918   Cloud   1130941     弱掃XSS修正-E