/*
DATE 	SA		PRG		MGR_NO	DESC
1020624	Kevin	Kevin	1020413	由EDT404複製程式
1040826	David	Kevin_C 1040617	新增線上瀏覽功能
1060613 Kevin	Justin	1060456	弱掃Client Potential Code Injection修正
1070830 Kevin   Justin  1070678 弱掃AJAX修改
1100201	Leslie	Joe		1090927	取消使用document.activeElement
1110103	Kevin   Zen     1101292	修正多次點擊重複PostBack之問題
1110127 Cloud   Cloud   1101418 新增附件瀏覽功能
1110706 Cloud   Cloud   1110647 設定改分相關連結
1110821 Cloud   Cloud   1110629 無資料不顯示title
1140612	Cloud	Andy	1140628	新增展開、收合按鈕以顯示前次改分申請資訊
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

//1060218	Kevin_C	1050087	升二代
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
	//1060218	Kevin_C	1050087	升二代
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	
	document.all["dListDeptNo"].disabled = true;
	document.all["dListDeptNo"].style.display = "none";
	document.all["Label9"].style.display = "none";	

	document.getElementById("dvfirst").style.display = "";
    //1110706 Cloud 1110647 考試院說明設定5行高-S
	if (document.all["OrgNickName"].value == "EXAM")
	{
	    document.all["txReason"].style.height = "6em";
	    document.all["txReason"].style.width = "35em";
	    document.all["txReason"].maxLength = "1000";
	}
    //1110706 Cloud 1110647 考試院說明設定5行高-E
}
//1110706 Cloud 1110647 考試院說明預覽申請單時，限制500字、儲存\傳送時限制1000
var strWork = "";

var oTimerId ;
function fnAfterPageLoad()
{	
	 clearInterval(oTimerId); //clear
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
    //1110127 Cloud      1101418 新增附件瀏覽功能-無用一併MARK-S
	/*var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}*/
    //1110127 Cloud      1101418 新增附件瀏覽功能-無用一併MARK-E

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
	    //1110127 Cloud      1101418 新增附件瀏覽功能-新增加入附件--S
    	case "btAddFile":
    		document.getElementById('fileInput').click();
    		break;
    	    //1110127 Cloud      1101418 新增附件瀏覽功能-新增加入附件--E
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
//1060218	Kevin_C	1050087	升二代
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
	
	//1060218	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
    //1110706 Cloud 1110647 考試院說明預覽申請單時，限制500字、儲存\傳送時限制1000
	strWork = xObjectName;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1060218	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			    //1110127 Cloud      1101418 新增附件瀏覽功能-無用一併MARK-新增上傳功能
                UploadFile();
			}
			else
				Page_BlockSubmit = true;
			//1060218	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();	
			jf_ToolBarSubmit(xObjectName);	
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1060218	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1060218	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_CheckBeforSave();
			//1060218	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_CheckBeforSave();
			//1060218	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btTransfer":
			//1060218	Kevin_C	1050087	升二代 -S
			//var ddlIdx=2;
			//var nextOpt = GetToolbarCtrl(ddlIdx);
			//var aOptions = nextOpt.getOptions();
			//document.all.SelectedUser.value = aOptions.value;
			//document.all.SelectedUser2.value = aOptions[aOptions.selectedIndex].text;
			var idx = document.getElementById("ddlNextUser").selectedIndex;
			document.all.SelectedUser.value = document.getElementById("ddlNextUser").options[idx].value;
			document.all.SelectedUser2.value = document.getElementById("ddlNextUser").options[idx].text;
			//1060218	Kevin_C	1050087	升二代 -E
			Page_BlockSubmit = !jf_CheckBeforSave();
		    //1110127 Cloud      1101418 新增附件瀏覽功能-無用一併MARK-新增上傳功能--S
			if(Page_BlockSubmit == false)
                UploadFile();
		    //1110127 Cloud      1101418 新增附件瀏覽功能-無用一併MARK-新增上傳功能--E
			//1060218	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCheck":
			Page_BlockSubmit = false;
			//1060218	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	    //1040826	Kevin_C 1040617	新增線上瀏覽功能
	    case "btPreviewOnline":
	        Page_BlockSubmit = true;
	        //1060613 Justin [1060456] 弱掃Client Potential Code Injection修正
	        //var Artifact = jf_Trim(document.all.SsoArtifact.value);
	        //var DocNo = jf_Trim(document.all["txDocNo"].value);
	        //var OrgNo = jf_Trim(document.all.nSourceOrgno.value);
	        var Artifact = encodeURI(jf_Trim(document.all.SsoArtifact.value));
	        var DocNo = encodeURI(jf_Trim(document.all["txDocNo"].value));
	        var OrgNo = encodeURI(jf_Trim(document.all.nSourceOrgno.value));
	        DownloadDocument(Artifact, DocNo, OrgNo);
	        //1060218	Kevin_C	1050087	升二代
	        //jf_ToolBarSubmit();
	        jf_ToolBarSubmit(xObjectName);
	        //1110127 Cloud 1101418 補break
	        break;
		case "btSearch":
			Page_BlockSubmit=true;
			if(jf_CheckKeyObject())
			{
				var strArtifact = document.all.nArtifact.value;
				var strOrgNo = document.all.nSourceOrgno.value;
				var strDocNo = document.all["txDocNo"].value;
				var strApplyNo = document.all["txApplyNo"].value;
				var strHttp =document.all.nHttp.value;

				var strUrl = strHttp + "EDI200.aspx?SOURCE_ORGNO=" + strOrgNo + "&argMsgFrom=EDT404&argTargetNo=" + strDocNo + "&SAMLart=" + strArtifact;
				jf_OpenChildWin(strUrl, "EDI200", 700, 500 );
			}
			//1060218	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
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
	
	var strErrMsg= "";
	var buf = "";
	var strReason = document.all["txReason"].value;
    //1110706 Cloud 1110647 考試院說明預覽申請單時，限制500字、儲存\傳送時限制1000-S
	if (document.all["OrgNickName"].value == "EXAM")
	{
	    if (strWork == "btPreview")
	    {
	        if (strReason.length > 500) {
	            if (strErrMsg != "") buf = "\n";
	            strErrMsg = "說明長度不可大於500個字" + buf + strErrMsg;
	            $('txReason').focus();
	        }
	    }
	    else
	    {
	        if (strReason.length > 1000) {
	            if (strErrMsg != "") buf = "\n";
	            strErrMsg = "說明長度不可大於1000個字" + buf + strErrMsg;
	            $('txReason').focus();
	        }
	    }
	}
	//1110706 Cloud 1110647 考試院說明預覽申請單時，限制500字、儲存\傳送時限制1000-E
	else
	{
	    if (strReason.length > 300) {
	        if (strErrMsg != "") buf = "\n";
	        //1110127 CLOUD 1101418 配合欄位名稱調整訊息內容
	        //strErrMsg = "原因分析長度不可大於300個字"+buf+strErrMsg;
	        strErrMsg = "說明長度不可大於300個字" + buf + strErrMsg;
	        //1060218	Kevin_C	1050087	升二代
	        //document.all["txReason"].focus();
	        $('txReason').focus();
	    }
	}

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
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
		if(jf_IsWebServiceSuccess(argResult))
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
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//1060218	Kevin_C	1050087	升二代
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

function dlPhraseNo_onchange()
{
	var index	= document.all["dlPhraseNo"].selectedIndex;
	var val		= document.all["dlPhraseNo"].options[index].innerText;
	document.all["txReason"].value += val;
	document.all["dlPhraseNo"].options[0].selected = true;
	//1060218	Kevin_C	1050087	升二代
	//document.all["txReason"].focus();
	$('txReason').focus();
}

//取消TextBox中enter的功能
function fnHandleTextarea()
{
	if(event.keyCode==13)
		event.cancelBubble = true;
}

function fnControlDeptSync()
{
	var vIndex = document.all["dListDeptNo"].selectedIndex;
	document.all["dltempDept"].selectedIndex = vIndex;
	document.all["txTempBox"].value = document.all["dltempDept"].options[vIndex].value;
}
//1040826   Kevin_C 1040617 新增線上瀏覽功能 -S
function DownloadDocument(argArt, argDocNo, argOrgNo) {
    var artifact = argArt;
    var strDocNo = argDocNo;
    var strOrgNo = argOrgNo;
	//1060218	Kevin_C	1050087	二代修改，改用二代瀏覽模組 -S
    // var ret;
    // ret = document.all.ocx.SetTargetUser(artifact);
    // if (ret == false) {
        // alert("使用者權杖(Artifact) 驗證失敗，無法執行文稿調閱");
        // return;
    // }
    // GetTempPath();
    // ret = document.all.ocx.DownloadDocument3(artifact, strOrgNo, strDocNo, uClientPath);
    // if (ret) {
        ////Create DPP File
        // var gLogFile = "C:\\temp\\aol.dpp";
        // var fso, f;
        ////var ForReading = 1, ForWriting = 2;
        // fso = new ActiveXObject("Scripting.FileSystemObject");
        // if (!fso.FileExists(gLogFile)) {
            // f = fso.CreateTextFile(gLogFile, true);
        // }
        // else {
            // f = fso.OpenTextFile(gLogFile, 2, true);
        // }

        // f.WriteLine("<root>");
        // f.WriteLine("<DOC_NO>" + strDocNo + "</DOC_NO>");
        // f.WriteLine("</root>");
        // f.close();
        // var oShell = new ActiveXObject("Shell.Application");
        // var param = "SAMLart=" + artifact + " Sys_Dir=C:\2100\aol\od " + gLogFile;

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
	//1060218	Kevin_C	1050087	二代修改，改用二代瀏覽模組 -E
}
//1060218   Kevin_C 1050087 二代修改，改用二代瀏覽模組，移除無用函式
// function GetTempPath() {
    // var fso, f;
    ////var ForReading = 1, ForWriting = 2;
    // fso = new ActiveXObject("Scripting.FileSystemObject");

    // uClientPath = "c:\\TEMP\\AKI802_EDIT_TMP\\";
    // if (!fso.FolderExists(uClientPath))
        // fso.CreateFolder(uClientPath)
// }
//1040826   Kevin_C 1040617 新增線上瀏覽功能 -E

//1110127 Cloud      1101418 新增附件瀏覽功能-無用一併MARK-新增加入附件--S
//存放檔案物件及暫存(格式檢核未放入)
var AllFiles = [];
function fnAddFile() {
	if (!document.all.dgAttach)
		return;
	var strFileFullPath = "";
	var strSrcFileName = "";
	//取得檔案資訊方式
	for (var iFile = 0 ; iFile < $('#fileInput')[0].files.length ; iFile++) {
		var bFileNameCheck = true;
		var bFileSizeCheck = true;
		var currentFile = $('#fileInput')[0].files[iFile];
		var nFileSize = Math.ceil(currentFile.size / 1024);

		var strFileName = currentFile.name;
		for (var i = 1; i < document.all.dgAttach.rows.length; i++) {
			//原先已有之附件
			if (document.all["dgAttach__ctl" + (i + 1) + "_lbFileName"])
				strSrcFileName = document.all["dgAttach__ctl" + (i + 1) + "_lbFileName"].textContent;
			else
				strSrcFileName = document.all.dgAttach.rows[i].cells[1].childNodes[0].textContent;
			if (strFileName == strSrcFileName) {
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["已有相同檔名之檔案存在，無法加入。"])), "");
				$('btAddFile').focus();
				return;
			}
		}

		fnAddAttach(strFileName, strFileFullPath, "", "", "", "");
		AllFiles.push($('#fileInput')[0].files[iFile]);
	    //1110821 Cloud   Cloud   1110629     修正無附件不該顯示title問題
		if (AllFiles.length != 0) {
		    document.all.dgAttach.className = "";
		    document.all.dgAttachhead.className = "dghead";
		}
	}

	//將focus設到加入附件的按鈕以便使用者繼續加入
	$('btAddFile').focus();
}

//新增加入附件共用函式
function fnAddAttach(argFileName, argFileFullPath, argFileSize, argFileDesc, argFileType, argFileDraftSeq) {
	var rowCnt = document.all.dgAttach.rows.length;
	//設定row的背景色
	var rowBgColor = (rowCnt % 2) ? "White" : "#C9F3F5";
	//create row
	var row = document.createElement("TR");
	row.style.backgroundColor = rowBgColor;
	//create column
	var colSeq = document.createElement("TD");
	colSeq.setAttribute("align", "middle");
	colSeq.setAttribute("nowrap", "nowrap");
	colSeq.className = "InputFieldLabel";
	colSeq.innerText = rowCnt;
	var colFile = document.createElement("TD");
	colFile.setAttribute("align", "Left");
	var spanFileName = document.createElement("SPAN");
	var spanFilePath = document.createElement("SPAN");
	var spanFileSize = document.createElement("SPAN");
	var spanFileDesc = document.createElement("SPAN");
	var spanFileComeFrom = document.createElement("SPAN");
	var spanFileDraftSeq = document.createElement("SPAN");
	spanFileName.name = "FileName";
	spanFileName.textContent = argFileName;
	spanFilePath.name = "FilePath";
	spanFilePath.textContent = argFileFullPath;
	spanFileSize.name = "FileSize";
	spanFileSize.textContent = argFileSize;
	spanFileDesc.name = "FileDesc";
	spanFileDesc.textContent = argFileDesc;
	spanFileComeFrom.name = "FileComeFrom";
	spanFileComeFrom.textContent = argFileType;
	spanFileDraftSeq.name = "FileDraftSeq";
	spanFileDraftSeq.textContent = argFileDraftSeq;
	spanFileName.className = "InputFieldLabel";
	spanFilePath.style.display = "none";
	spanFileSize.style.display = "none";
	spanFileDesc.style.display = "none";
	spanFileComeFrom.style.display = "none";
	spanFileDraftSeq.style.display = "none";
	colFile.appendChild(spanFileName);
	colFile.appendChild(spanFilePath);
	colFile.appendChild(spanFileSize);
	colFile.appendChild(spanFileDesc);
	colFile.appendChild(spanFileComeFrom);
	colFile.appendChild(spanFileDraftSeq);
	//附件描述
	var coldes = document.createElement("TD");

	coldes.setAttribute("align", "middle");
	coldes.setAttribute("nowrap", "nowrap");
	coldes.innerHTML = "<INPUT id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_txFileDesc\" type=\"TextBox\" style=\"WIDTH: 14em;\" value=\"" + argFileDesc + "\"/>";


	var colDel = document.createElement("TD");
	colDel.setAttribute("align", "middle");
	colDel.setAttribute("nowrap", "nowrap");
	//刪除按鈕
	colDel.innerHTML = "<INPUT id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_btDelete\" type=\"submit\" value=\"刪除\" onclick=\"fnDeleteAttachItem()\" />";
	colDel.setAttribute("visible", "true");

	var strOpenPath = argFileFullPath.replace(/\\/g, "\\\\");
	//Add to dgAttach
	row.appendChild(colSeq);
	row.appendChild(colFile);
	row.appendChild(coldes);
	row.appendChild(colDel);
	document.all.dgAttach.children[0].appendChild(row);

}

//刪除附件
function fnDeleteAttachItem() {
	Page_BlockSubmit = true;
	//先刪除資料

	var deleteRow = event.srcElement.parentNode.parentNode;
	var strDelFileName = "";
	if (deleteRow.cells[1].childNodes[0].textContent.trim() != "")
		strDelFileName = deleteRow.cells[1].childNodes[0].textContent.trim();
	else
		strDelFileName = deleteRow.cells[1].textContent.trim();

	if (document.all.H_AttachDel.value != "")
		document.all.H_AttachDel.value += "|" + strDelFileName;
	else
		document.all.H_AttachDel.value += strDelFileName;
	document.all.dgAttach.children[0].removeChild(deleteRow);
	//再重設序號及style
	for (var i = 1; i < document.all.dgAttach.rows.length; i++) {
		var row = document.all.dgAttach.rows[i];
		var rowBgColor = (i % 2) ? "White" : "rgb(201, 243, 245)";
		row.style.backgroundColor = rowBgColor;
		row.childNodes[0].innerText = i;
	}
    //*1110820    Cloud   1110629 修正無附件不應顯示title問題
	if (document.all.dgAttach.rows.length == 1) {
	    document.all.dgAttach.className = "hide";
		document.all.dgAttachhead.className = "hide dghead";
	}
}

function OpenFile(argFileName) {
	var DownToPath = document.all["H_WorkPath"].value + "EDT404\\" + document.all.txApplyNo.value + "\\";
	var DownFromPath = document.all["H_StartPath"].value + "\\EDT404\\" + document.all.txApplyNo.value + "\\";
	var rtnVal = ED4.EDT415.AttDownLoad(DownFromPath, DownToPath, document.all.nArtifact.value, document.all.H_WS.value, argFileName).value;
	if (rtnVal[1] != "")
		alert(rtnVal[1]);
	else
		openDlg(rtnVal[0] + "&OpenType=download", document.all.nArtifact.value, "");
	Page_BlockSubmit = true; 
}
//上傳檔案
var strUpload = "";
function UploadFile() {
	var strSrcFileName = "";
	var strSrcFileDesc = "";
	var strPath = "";
	var strBuffer = "";
	var iDgLength = document.all.dgAttach.rows.length;
	//先將不存在的附件移掉
	for (var i = 1; i < iDgLength; i++) {
		var bIsFileExist = false;
		//取得附件檔名&描述
		strSrcFileName = document.all.dgAttach.rows[i].cells[1].textContent.trim();
		if (document.all.dgAttach.rows[i].cells[2].childNodes[1])
			strSrcFileDesc = document.all.dgAttach.rows[i].cells[2].childNodes[1].value.trim();
		else
			strSrcFileDesc = document.all.dgAttach.rows[i].cells[2].childNodes[0].value.trim();
		for (var iArrfile = 0; iArrfile < AllFiles.length; iArrfile++) {
			if (AllFiles[iArrfile].name == strSrcFileName) {
				bIsFileExist = true;
				break;
			}
		}
		if (!bIsFileExist)
			AllFiles.splice(iArrfile, 1);
		document.all.H_AttachInf.value += strBuffer + strSrcFileName + ":" + strSrcFileDesc;
		strBuffer = "|";
	}
	if (AllFiles.length > 0) {
		try {
			var ioWS = new WebFileIO(document.all.H_WS.value, document.all.nArtifact.value);
			strPath = document.all["H_StartPath"].value + "\\EDT404\\" + document.all.txApplyNo.value + "\\";
			ioWS.upload(strPath, AllFiles, UploadCallBack);
		}
		catch (e) {

		}
	}
}
function UploadCallBack(result) {
	if (result.hasError) {
		alert("上傳附件至SERVER端失敗：" + result.ErrorMessage)
		Page_BlockSubmit = true;
	}
	else {
		IsServerHandling = true;
	}
}
//1110127 Cloud      1101418 新增附件瀏覽功能-無用一併MARK-新增加入附件--E
//1110706 Cloud   Cloud   1110647 設定相關連結-開啟EDT404-S
function OpenEdt404(argApplyNo)
{
    var strArtifact = document.all.nArtifact.value;
    var strOrgNo = document.all.nSourceOrgno.value;
    var strDocNo = document.all["txDocNo"].value;
    var strHttp =document.all.nHttp.value;
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

