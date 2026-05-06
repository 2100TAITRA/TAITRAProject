/*
DATE 	SA		PRG		MGR_NO	DESC
1020624	Kevin	Kevin	1020413	由EDT404複製程式
1030514	David	Eric	1030361	新增DownloadDocument函式提供使用
1060222	David	Kevin_C	1050087	升二代
1060613 Kevin	Justin	1060456	弱掃Client Potential Code Injection修正
1070830 Kevin   Justin  1070678 弱掃AJAX修改
1100201	Leslie	Joe		1090927	取消使用document.activeElement
1110103	Kevin   Zen     1101292	修正多次點擊重複PostBack之問題
1110127 Cloud   Cloud   1101418 新增附件瀏覽功能
1110706 Cloud   Cloud   1110647 設定改分相關連結
1140616	Cloud	Andy	1140628	新增展開、收合按鈕以顯示前次改分申請資訊
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
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

//1060222	Kevin_C	1050087	升二代
//if(document.all.tbTool)
	//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

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
	//1060222	Kevin_C	1050087	升二代
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次

	document.all["dListDeptNo"].disabled = true;
	document.all["dListDeptNo"].className = "displayOnly";

	document.all["dListDeptNo"].style.display = "none";
	document.all["Label9"].style.display = "none";	

	document.getElementById("dvfirst").style.display = "";
    //1110706 Cloud 1110647 考試院說明設定5行高-S
	if (document.all["OrgNickName"].value == "EXAM") {
	    document.all["txReason"].style.height = "6em";
	    document.all["txReason"].style.width = "35em";
	    document.all["txReason"].maxLength = "1000";
	}
    //1110706 Cloud 1110647 考試院說明設定5行高-E
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1100201	Joe		1090927		取消使用document.activeElement
// function ClientButtonControl()
function ClientButtonControl(e)
{
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;

	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;

	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
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
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
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
//1060222	Kevin_C	1050087	升二代
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	//1110103 Zen 1101292 修正多次點擊重複PostBack之問題
	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}

	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	//1060222	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;

	switch (xObjectName)
	{
		case "btTransfer":
			//1060222	Kevin_C	1050087	升二代 -S
			// var ddlIdx=1;
			// var nextOpt = GetToolbarCtrl(ddlIdx);
			// var aOptions = nextOpt.getOptions();
			// document.all.SelectedUser.value = aOptions.value;
			// document.all.SelectedUser2.value = aOptions[aOptions.selectedIndex].text;
			var idx = document.getElementById("ddlNextUser").selectedIndex;
			document.all.SelectedUser.value = document.getElementById("ddlNextUser").options[idx].value;
			document.all.SelectedUser2.value = document.getElementById("ddlNextUser").options[idx].text;
			//1060222	Kevin_C	1050087	升二代 -E
			Page_BlockSubmit = !CheckUnAllowEmpty();
			//1060222	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btApprove":
			Page_BlockSubmit = !CheckUnAllowEmpty();
			//1060222	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btReject":
			Page_BlockSubmit = !CheckUnAllowEmpty();
			//1060222	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
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
			DownloadDocument(Artifact,DocNo,OrgNo);
			//1060222	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
		case "btSearch":
			Page_BlockSubmit=true;
			var strOrgNo = document.all.nSourceOrgno.value;
			var strDocNo = document.all["txDocNo"].value;
			var strHttp =document.all.nHttp.value;
			var strArtifact = document.all.H_txArtifact.value;

			var strUrl = strHttp +"EDI200.aspx?SOURCE_ORGNO=" + strOrgNo + "&argMsgFrom=EDT404&argTargetNo=" + strDocNo + "&SAMLart=" + strArtifact;
			jf_OpenChildWin(strUrl, "EDI200", 700, 500 );
			//1060222	Kevin_C	1050087	升二代
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

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	return bRtnbool;
}

//1060222	Kevin_C	1050087	升二代
// function GetToolbarCtrl(argId)
// {
	// return document.all.tbTool.getItem(argId);
	// for(var i=0;i<20;i++)
	// {
		// var o=document.all.tbTool.getItem(i);
		// if(o!=null)
		// {
			// alert(o.getAttribute("ID"));
			// if(o.getAttribute("ID")==argId)
				// return o;
		// }
	// }
	// return null;
// }

//1030514 Eric 1030361	新增DownloadDocument函式提供使用
function DownloadDocument(argArt,argDocNo,argOrgNo)
{
	var artifact = argArt;
	var strDocNo = argDocNo;
	var strOrgNo	=argOrgNo;
	//1060222	Kevin_C	1050087	二代修改，改用二代瀏覽模組 -S
	// var ret;
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
	try {
		var wsUrl = opener.theWebServices.url('fileiows');
		var param = [];
		param[0] = artifact;
		param[1] = strDocNo;
		param[2] = strOrgNo;

		var rtnObj = jf_CallW(wsUrl, 'GetOnLineApplyDocUnvByJSON', false, param);
		if (!rtnObj.error) {
			if (rtnObj.value.m_bSuccess) {
				var sUnvObj = rtnObj.value.RtnStr;
				if (sUnvObj !== "") {
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
			else{
				alert(rtnObj.value.m_strErrMsg);
			}
		}
		else{
			alert(rtnObj.error.errorDetail.string)
		}
	} catch (e) {
		alert('開啟失敗');
	}
	//1060222	Kevin_C	1050087	二代修改，改用二代瀏覽模組 -E
}
//1030514 Eric 1030361	新增GetTempPath函式提供使用
//1060222   Kevin_C 1050087 二代修改，改用二代瀏覽模組，移除無用函式
// var uClientPath = "";
// function GetTempPath()
// {
	// var fso, f;
	// var ForReading = 1, ForWriting = 2;
	// fso = new ActiveXObject("Scripting.FileSystemObject");
	// uClientPath = "c:\\TEMP\\AKI802_EDIT_TMP\\";
	// if(!fso.FolderExists(uClientPath))
		// fso.CreateFolder(uClientPath)
// }

//常用審核意見
function dlPhraseNo_onchange()
{
	var index	= document.all["dlPhraseNo"].selectedIndex;
	var val		= document.all["dlPhraseNo"].options[index].innerText;
	document.all["txDesc"].value += val;
	document.all["dlPhraseNo"].options[0].selected = true;
	//1060222	Kevin_C	1050087	升二代
	//document.all["txDesc"].focus();
	$('txDesc').focus();
}

//1110127 Cloud   1101418 新增附件瀏覽功能-S
function OpenFile(argFileName) {
	var DownToPath = document.all["H_WorkPath"].value + "EDT404\\" + document.all.txApplyNo.value + "\\";
	var DownFromPath = document.all["H_StartPath"].value + "\\EDT404\\" + document.all.txApplyNo.value + "\\";
	var rtnVal = ED4.EDT416.AttDownLoad(DownFromPath, DownToPath, document.all.H_txArtifact.value, document.all.H_WS.value, argFileName).value;
	if (rtnVal[1] != "")
		alert(rtnVal[1]);
	else
		openDlg(rtnVal[0] + "&OpenType=download", document.all.H_txArtifact.value, "");
	Page_BlockSubmit = true; 
}
//1110127 Cloud   1101418 新增附件瀏覽功能-E
//1110706 Cloud   Cloud   1110647 設定相關連結-開啟EDT404-S
function OpenEdt404(argApplyNo) {
    var strArtifact = document.all.H_txArtifact.value;
    var strOrgNo = document.all.nSourceOrgno.value;
    var strDocNo = document.all["txDocNo"].value;
    var strHttp = document.all.nHttp.value;
    strHttp = strHttp.replace("ED2", "ED4");
    var strUrl = strHttp + "EDT404.aspx?SOURCE_ORGNO=" + strOrgNo + "&argApply=" + argApplyNo + "&argDocNo=" + strDocNo + "&SAMLart=" + strArtifact;
    jf_OpenChildWin(strUrl, "EDT404", 1024, 768);
}
//1110706 Cloud   Cloud   1110647 設定相關連結-開啟EDT404-E
//1140612	Andy	1140628	新增展開、收合按鈕以顯示前次改分申請資訊
function ExpandDataGrid() {
	var divdg = document.getElementById('DivDg0');
	divdg.style.height = ''
	divdg.style.minHeight = '110px'
}
function CloseDataGrid() {
	var divdg = document.getElementById('DivDg0');
	divdg.style.height = '110px'
}
