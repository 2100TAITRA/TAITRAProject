/*
DATE	SA		PRG		MGR_NO			DESC
1141119 David   Daniel  1141112     新增駐外其他檔案上傳作業
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

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad() {
	// 綁定「新增」按鈕事件
	//document.getElementById("btSelectFile").addEventListener("click", function () {
	//	Page_BlockSubmit = true;
	//	document.getElementById("fileInput").click();
	//});
	// 綁定「下載」按鈕事件
	//document.getElementById("btFileOpen").addEventListener("click", function () {
	//	Page_BlockSubmit = true;
	//	fnFileDownload();
	//});
	//// 綁定「刪除」按鈕事件
	//document.getElementById("btFileDelete").addEventListener("click", function () {
	//	Page_BlockSubmit = true;
	//	fnDeleteAttachItem();
	//});
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e) {
	var xObjectName = e.target.id;

	if (IsServerHandling)
		return;

	//檢查是否TimeOut
	if (jf_IsTimeOut()) {
		Page_BlockSubmit = true;
		return;
	}

	switch (xObjectName) {
		/*
		case "":
			break;
		*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/

function jf_ToolBarHandle(event) {
	var xObjectName;
	var evBtn;

	if (IsServerHandling)
		return;

	//檢查是否TimeOut
	if (jf_IsTimeOut()) {
		Page_BlockSubmit = true;
		return;
	}

	xObjectName = event.target.id;

	switch (xObjectName) {
		//case "btUpLoad":
		//	if (jf_CheckBeforUpLoad) //是否通過儲存前必要檢查
		//	{
		//		IsServerHandling = true;
		//		jf_ShowWaitState();
		//		Page_BlockSubmit = false;
		//		jf_ToolBarSubmit(xObjectName);
		//	}
		//	else
		//		Page_BlockSubmit = true;
		//	jf_ToolBarSubmit(xObjectName);
		//	break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/

//儲存前之欄位檢查
function jf_CheckBeforUpLoad() {
	var bRtnbool = true;
	var strErrMsg = "";
	// 記錄第一個需要聚焦的欄位
	var firstFocusId = "";

	if (document.all["txUpLoadFile"].value == "") {
		strErrMsg += "請選擇要上傳的檔案\n";
	}


	if (strErrMsg != "") {
		bRtnbool = false;
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
		if (firstFocusId !== "") $('#' + firstFocusId).focus();

	}

	return bRtnbool;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
*
*****************************************************************************/
//var WaitUpLoadFiles = [];
//function fnAddFile() {
//	var fileInput = document.querySelector('input[type="file"][id$="fileInput"]');
//	var currentFile = fileInput.files[0];
//	var strFileName = currentFile.name;
//	fnAddAttach(strFileName);
//	WaitUpLoadFiles.push(strFileName);
//}
//function fnAddAttach(argFileName) {
//	document.getElementById("txUpLoadFile").value = argFileName;
//	document.getElementById("H_txUpLoadFile").value = argFileName;
//	document.getElementById("btSelectFile").value = "更換";
//}
//function fnDeleteAttach(argSeq) {
//	document.all["txContralGuid"].value = document.all["dg1__ctl" + (argSeq) + "_H_lbFileGuid"].textContent;
//	jf_ToolBarSubmit("btDelete");
//}
function ReturnValue(argLink, argPathID) {
	var strFullPath = document.all[argPathID].textContent;
	var result = OM0.OMT002.btDownLoadProc(argLink, strFullPath).value;

	if (result.indexOf("ERR") != -1)
		alert(result);
	else
		window.open(result);
}