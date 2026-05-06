/*
DATE	SA		PRG		MGR_NO		DESC
0970708	--		Leslie	0970512		額外修正開啟EDI200會出現"隸屬機關:測試用"的問題
1050505 Cloud   Justin  1050087     二代公文修改
1050818	Cloud	Kevin_C	1050087		二代修改，改用二代瀏覽模組
1051019 Leslie  Kenny   1050087     二代公文修改
1060613 Kevin	Justin	1060456		弱掃Client Potential Code Injection修正
1061103 Kevin   Zen		1061071	    修正點擊核可多次會收到重複通知之問題
1070412 Cloud   Zen     1061071     修正檢核失敗後無法postback之問題
1070731 Kevin	Justin	1070678		修正弱掃Hardcoded Absolute Path
1070830 Kevin   Justin  1070678     弱掃AJAX修改
1091110	Cloud	Joe		1090709		新增移文功能
1100610	Cloud	Joe		--			自測問題修正，Poestbock前取消鎖定改分單位支援Server Side自動改分判斷
1100714	Cloud	Joe		1100660		高雄大學新增改分需求
1110103 Kevin   Zen     1101292     修正多次點擊重複PostBack之問題
1110127 Cloud   Cloud   1101418		新增功能附件
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
//1070830 Justin [1070678]弱掃AJAX修改
//1110127 Cloud    1101418		新增功能附件-需使用ajaxpro 取消mark
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
/*1050505 Justin 1050087 二代公文修改 
if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/

//David 95.06.15 控制PaAge_Load時是否讓單位名稱DL顯示
//1100714   Joe     1100660     高大可由核決人員選取改分對象
if (document.all["OrgNick"].value != "NUK") {
    document.all["dListDeptNo"].disabled = true;
    document.all["dListDeptNo"].className = "displayOnly";
}
//1091110	Joe	1090709	新增移文選項
document.all["dlAssignOrg"].disabled = true;
document.all["dlAssignOrg"].className = "displayOnly";
if (document.all["dlApplyType"].selectedIndex == 0)
{
    document.all["dListDeptNo"].style.display = "";
    document.all["Label9"].style.display = "";
	//1091110	Joe	1090709	新增移文選項--S
	document.all["dlAssignOrg"].style.display = "none";
}
else if (document.all["dlApplyType"].selectedIndex == 2) {
	document.all["dListDeptNo"].style.display = "none";
	document.all["Label9"].style.display = "";
	document.all["Label9"].innerText = "建議移文單位：";
}
else
{
	document.all["dlAssignOrg"].style.display = "none";
	//1091110	Joe	1090709	新增移文選項--E
    //document.all["dListDeptNo"].disabled = false;
    document.all["dListDeptNo"].style.display = "none";
    document.all["Label9"].style.display = "none";
    document.all["testTD"].style.width = "410 px";	//Leslie	把"銷號"的下拉式選單給"頂"回正確位置@@
}

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1051019   Kenny   [1050087]   二代公文修改；移除無用CODE
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
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

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

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
//1050505 Justin 1050087 二代公文修改 
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

    //1050505 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btTransfer":
            /*1050505 Justin 1050087 二代公文修改
			var ddlIdx=1;
			var nextOpt = GetToolbarCtrl(ddlIdx);
			var aOptions = nextOpt.getOptions();
			document.all.SelectedUser.value = aOptions.value;
			document.all.SelectedUser2.value = aOptions[aOptions.selectedIndex].text;
            */
            document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
            document.all.SelectedUser2.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].text;
            //1100714	Joe		1100660		高雄大學新增核可前檢核改分單位不可為空
            // Page_BlockSubmit = !CheckUnAllowEmpty();
            Page_BlockSubmit = !CheckUnAllowEmpty(xObjectName);
            //1050505 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btApprove":
            //1100714	Joe		1100660		高雄大學新增核可前檢核改分單位不可為空
            // Page_BlockSubmit = !CheckUnAllowEmpty();
            Page_BlockSubmit = !CheckUnAllowEmpty(xObjectName);
            //1050505 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false){
				//1100610	Joe		自測問題修正，Poestbock前取消鎖定支援Server Side自動改分判斷
				document.all["dListDeptNo"].disabled = false;
                IsServerHandling = true;
			}
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btReject":
            //1100714	Joe		1100660		高雄大學新增核可前檢核改分單位不可為空
            // Page_BlockSubmit = !CheckUnAllowEmpty();
            Page_BlockSubmit = !CheckUnAllowEmpty(xObjectName);
            //1050505 Justin 1050087 二代公文修改 
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
            //1050505 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            //1050818	Kevin_C	二代修改
            //jf_ToolBarSubmit(xObjectName);
            break;
        case "btSearch":
            Page_BlockSubmit = true;
            var strOrgNo = document.all.nSourceOrgno.value;
            //1110127 Cloud    1101418	修正取得網址
            //var strHttp = document.all.nHttp.value;
            var strArtifact = document.all.H_txArtifact.value;
			var strDocNo = document.all.txDocNo.value;
            //0970512	Leslie	增加傳入Artifact，才不會出現"隸屬機關:測試用"
            //1110127 Cloud    1101418		修正取得網址
            //var strUrl = strHttp + "EDI200.aspx?SOURCE_ORGNO=" + strOrgNo + "&argMsgFrom=EDT404&argTargetNo=" + strDocNo + "&SAMLart=" + strArtifact;
            var strUrl = "../ED2/EDI200.aspx?SOURCE_ORGNO=" + strOrgNo + "&argMsgFrom=EDT404&argTargetNo=" + strDocNo + "&SAMLart=" + strArtifact;
            jf_OpenChildWin(strUrl, "EDI200", 800, 600);
            //1050505 Justin 1050087 二代公文修改 
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
//1100714	Joe		1100660		高雄大學新增核可前檢核改分單位不可為空
//function CheckUnAllowEmpty()
function CheckUnAllowEmpty(argObject)
{
    var bRtnbool = true;
    var strErrMsg = "";
    //if (document.all["txDesc"].value == "")			//Leslie	線上申請之簽核作業統一不強制要求輸入簽核意見
    //{
    //	strErrMsg = "審核意見不可為空白";
    //	document.all["txDesc"].focus();
    //}
	//1100714	Joe		1100660		高雄大學新增核可前檢核改分單位不可為空
    if (document.all["OrgNick"].value == "NUK" && argObject == "btApprove") {
		if (document.all.dlApplyType.options[document.all.dlApplyType.selectedIndex].value == "1" && document.all.dListDeptNo.options[document.all.dListDeptNo.selectedIndex].value == ""){
			strErrMsg = "改分單位不可為空白";
		}
	}
    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    return bRtnbool;
}

/*1050505 Justin 1050087 二代公文修改
function GetToolbarCtrl(argId)
{
	return document.all.tbTool.getItem(argId);
	for(var i=0;i<20;i++)
	{
		var o=document.all.tbTool.getItem(i);
		if(o!=null)
		{
			alert(o.getAttribute("ID"));
			if(o.getAttribute("ID")==argId)
				return o;
		}
	}
	return null;
}*/
//David 95.06.13 控制選擇改分時顯示或隱藏單位名稱DL
function fnControlDeptHide()
{
    var vIndex = document.all["dlApplyType"].selectedIndex;

    if (vIndex == 0)
        document.all["dListDeptNo"].style.display = "";
    else
        //document.all["dListDeptNo"].disabled = false;
        document.all["dListDeptNo"].style.display = "none";
}
//David 95.06.13 使DDL同步變化
function fnControlDeptSync()
{
    var vIndex = document.all["dListDeptNo"].selectedIndex;
    document.all["dltempDept"].selectedIndex = vIndex;
    //1100714   Joe     1100660     配合高大總收可自行選取改分單位，調整txTempBox值
    document.all["txTempBox"].value = document.all["dltempDept"].options[document.all["dltempDept"].selectedIndex].value;
}

var uClientPath = "";

/*1070731 Justin [1070678]修正弱掃Hardcoded Absolute Path
function GetTempPath()
{
    var fso, f;
    //var ForReading = 1, ForWriting = 2;
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
    var ret;
    //1050818	Kevin_C	二代修改，改用二代瀏覽模組 -S
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
    ////var ForReading = 1, ForWriting = 2;
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
//常用審核意見
function dlPhraseNo_onchange()
{
    var index = document.all["dlPhraseNo"].selectedIndex;
    /*1050505 Justin 1050087 二代公文修改 
	var val = document.all["dlPhraseNo"].options[index].innerText;*/
    var val = document.all["dlPhraseNo"].options[index].textContent;
    document.all["txDesc"].value += val;
    document.all["dlPhraseNo"].options[0].selected = true;
    /*1050505 Justin 1050087 二代公文修改
    document.all["txDesc"].focus();*/
    $('#txDesc').focus();
}

//1110127 Cloud    1101418		新增功能附件-S
function OpenFile(argFileName) {
	var DownToPath = document.all["H_WorkPath"].value + "EDT404\\" + document.all.txApplyNo.value + "\\";
	var DownFromPath = document.all["H_StartPath"].value + "\\EDT404\\" + document.all.txApplyNo.value + "\\";
	var rtnVal = ED4.EDT405.AttDownLoad(DownFromPath, DownToPath, document.all.H_txArtifact.value, document.all.H_WS.value, argFileName).value;
	if (rtnVal[1] != "")
		alert(rtnVal[1]);
	else
	    openDlg(rtnVal[0] + "&OpenType=download", document.all.H_txArtifact.value, "");
	Page_BlockSubmit = true; 
}
//1110127 Cloud    1101418		新增功能附件-e