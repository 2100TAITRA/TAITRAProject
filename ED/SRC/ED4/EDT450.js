/*
DATE		SA		PRG		MGR_NO		DESC
1070509		Kevin	Joe		1070227		新增程式
1070724		Kevin	Joe		1070227		修改提示訊息，不提供新增模式下覆蓋原有資料。
1070803 	Kevin   Joe     1070227 	修正新增模式下一律自動取號
1070830     Kevin   Justin  1070678     弱掃AJAX修改
1080115     Kevin   Joe		1070227     修正承辦單位為必要欄位
1090107		Kevin_C	Joe		1081095		修正JS使用函式避免IE不支援導致程式判斷錯誤
1110103     Kevin   Zen     1101292     修正多次點擊重複PostBack之問題
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
	//開啟後判斷下拉選單
	fnCheckDept();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
	var xObjectName = e.target.id;

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
		case "btAddFile":
			document.getElementById('fileInput').click();
			break;
		case "btDept1":
			var OuType = '1';
			strUrl = "EDM451.aspx?SAMLart=" + document.all.nArtifact.value + "&argAssignNo=" + document.all.txAssignNo.value + "&argOuType=" + OuType;
			jf_OpenChildWin(strUrl, "EDM451", 800, 600);
			break;
		case "btDept2":
			var OuType = '2';
			strUrl = "EDM451.aspx?SAMLart=" + document.all.nArtifact.value + "&argAssignNo=" + document.all.txAssignNo.value + "&argOuType=" + OuType;
			jf_OpenChildWin(strUrl, "EDM451", 800, 600);
			break;
		case "btDept3":
			var OuType = '3';
			strUrl = "EDM451.aspx?SAMLart=" + document.all.nArtifact.value + "&argAssignNo=" + document.all.txAssignNo.value + "&argOuType=" + OuType;
			jf_OpenChildWin(strUrl, "EDM451", 800, 600);
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
	
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			if (document.all.txAssignNo.value == "")
			{
				Page_BlockSubmit = true;
				alert('案件編號不可為空');
			}
			else
			{
				Page_BlockSubmit = false;
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btSave":
			Page_BlockSubmit = true;
			if (jf_CheckBeforeSave())
			{
				//1070803	Joe		1070227		修正新增模式下一律自動取號
				// var AssignNoObj = ED4.EDT450.GetAssignNo(document.all.H_OuId.value, document.all.H_OrgNo.value, document.all.txAssignNo.value).value;
				var AssignNoObj = ED4.EDT450.GetAssignNo(document.all.H_OuId.value, document.all.H_OrgNo.value, document.all.txAssignNo.value, document.all.TemplateMode.value).value;
				if (AssignNoObj[0] == "true" || (AssignNoObj[0] == "Check" && document.all.TemplateMode.value == "1")) {
					Page_BlockSubmit = false;
					document.all.txAssignNo.value = AssignNoObj[1];
					UploadFile();
					jf_ToolBarSubmit(xObjectName);
				}
				else if (AssignNoObj[0] == "Check" && document.all.TemplateMode.value == "0") {
					//1070724	Joe		1070227		修改提示訊息，不提供新增模式下覆蓋原有資料。--S
					// Page_BlockSubmit = !window.confirm("案件編號" + AssignNoObj[1] + "已有資料，確定要覆蓋嗎");
					// if (Page_BlockSubmit == false) {
						// document.all.txAssignNo.value = AssignNoObj[1];
						// UploadFile();
						// jf_ToolBarSubmit(xObjectName);
					// }
					alert("案件編號「" + AssignNoObj[1] + "」已有資料，如要新增資料，請清空案件編號，系統會自動取號。如要修改資料，請透過開啟功能進行。")
					//1070724	Joe		1070227		修改提示訊息，不提供新增模式下覆蓋原有資料。--E
				}
				else {
					alert(AssignNoObj[2]);
				}
			}
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			$('#txAssignNo').focus();
			break;
		    //1070710 Kevin 1070227 新增查詢
	    case "btSearch":
	        Page_BlockSubmit = true;
	        var strUrl = "EDR450.aspx?rtnObj=lbReturnValue&SAMLart=" + document.all.SsoArtifact.value;
	        jf_OpenChildWin(strUrl, "EDR450", 800, 600);
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
//1070710 Kevin 1070227 新增查詢
function CallBack(argCallerId) {

    if (argCallerId == "EDR450") {
        document.all.txAssignNo.value = jf_Trim(document.all.lbReturnValue.options[0].value);
        Page_BlockSubmit = false;
        jf_OpenButtonSubmit();
    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_CheckBeforeSave()
{
	var bRtn = true;
	var strErrMsg ="";

	if (document.all.txAssignDate.value == "" || document.all.txAssignTime.value == "")
	{
		bRtn = false;
		strErrMsg += "交辦日期不可為空\n";
		if (document.all.txAssignDate.value == "")
			$('#txAssignDate').focus();
		else
			$('#txAssignTime').focus();
	}
	if (document.all.txFromOrg.value == "") {
		bRtn = false;
		strErrMsg += "來文機關不可為空\n";
	}
	if (document.all.txFromReason.value == "") {
		bRtn = false;
		strErrMsg += "來文事由不可為空\n";
	}
	if (document.all.txAssignReason.value == "") {
		bRtn = false;
		strErrMsg += "交辦指示不可為空\n";
	}

    //1070710 Kevin 1070227 新增檢核
	//1090107	Joe		1081095		修正取選單值的函式，避免IE不支援
	// if (document.all["dlDept1"].selectedOptions[0].value == "OTHERS" && document.all["txDept1"].value == "") {
	if (document.all.dlDept1.options[document.all.dlDept1.selectedIndex].value == "OTHERS" && document.all["txDept1"].value == "") {
	    bRtn = false;
	    strErrMsg += "承辦單位(一)不可為空\n";
	}
	//1090107	Joe		1081095		修正取選單值的函式，避免IE不支援
	// if (document.all["dlDept2"].selectedOptions[0].value == "OTHERS" && document.all["txDept2"].value == "") {
	if (document.all.dlDept2.options[document.all.dlDept2.selectedIndex].value == "OTHERS" && document.all["txDept2"].value == "") {
	    bRtn = false;
	    strErrMsg += "承辦單位(二)不可為空\n";
	}
	//1090107	Joe		1081095		修正取選單值的函式，避免IE不支援
	// if (document.all["dlDept3"].selectedOptions[0].value == "OTHERS" && document.all["txDept3"].value == "") {
	if (document.all.dlDept3.options[document.all.dlDept3.selectedIndex].value == "OTHERS" && document.all["txDept3"].value == "") {
	    bRtn = false;
	    strErrMsg += "承辦單位(三)不可為空\n";
	}
	
	//1080115	Joe		1070227		修正承辦單位為必要欄位--S
	//1090107	Joe		1081095		修正取選單值的函式，避免IE不支援
	// if (document.all["dlDept1"].selectedOptions[0].value + document.all["dlDept2"].selectedOptions[0].value + document.all["dlDept3"].selectedOptions[0].value == "")
	if (document.all.dlDept1.options[document.all.dlDept1.selectedIndex].value + document.all.dlDept2.options[document.all.dlDept2.selectedIndex].value + document.all.dlDept3.options[document.all.dlDept3.selectedIndex].value == "")
	{
	    bRtn = false;
	    strErrMsg += "承辦單位不可皆為空白";
	}
	//1080115	Joe		1070227		修正承辦單位為必要欄位--E

	if (strErrMsg != "")
	{
		alert(strErrMsg);
	}
	return bRtn;
}
//日期onblur
function CheckDATE(argObj,strMsg)
{
	var bRtnbool = false;
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			$('#' + argObj).focus();
			bRtnbool = true;
		}
	}
	return bRtnbool;
}
function fnDeptOnCng(argdlObjID, argtxObjID, argbtObjID)
{
	//1090107	Joe		1081095		修正取選單值的函式，避免IE不支援
	// var dlValue = document.all[argdlObjID].selectedOptions[0].value;
	var dlValue = document.all[argdlObjID].options[document.all[argdlObjID].selectedIndex].value;
	//處理Textbox是否顯示
	if (dlValue == "OTHERS") {
		//1080115	Joe		1070227		修正承辦單位為必要欄位
		document.all[argtxObjID].className = "RequireField";
	}
	else {
		document.all[argtxObjID].className = "hide";
	}

	//處理辦理情形
	if (document.all.TemplateMode.value == 0)
		document.all[argbtObjID].disabled = true
	else
	{
	    //1070710 Kevin 1070227 修正未輸入時不可點選
	    if (dlValue == "")
	        document.all[argbtObjID].disabled = true;
	    else
		//交辦單位為目前使用者所屬單位
		if (document.all.H_MainOuId.value == document.all.H_OuId.value)
			document.all[argbtObjID].disabled = false;
		else if (dlValue == document.all.H_OuId.value)
			document.all[argbtObjID].disabled = false;
		else
			document.all[argbtObjID].disabled = true;
	}

}

function fnCheckDept()
{
	fnDeptOnCng('dlDept1', 'txDept1', 'btDept1');
	fnDeptOnCng('dlDept2', 'txDept2', 'btDept2');
	fnDeptOnCng('dlDept3', 'txDept3', 'btDept3');
}
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
	coldes.innerHTML = "<INPUT id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_txFileDesc\" type=\"TextBox\" value=\"" + argFileDesc + "\"/>";


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
}

function OpenFile(argFileName) {
	var DownToPath = document.all["H_WorkPath"].value + "EDT450\\" + document.all.txAssignNo.value + "\\0\\";
	var DownFromPath = document.all["H_StartPath"].value + "\\EDT450\\" + document.all.txAssignNo.value + "\\0\\";
	var rtnVal = ED4.EDT450.AttDownLoad(DownFromPath, DownToPath, document.all.nArtifact.value, document.all.H_WS.value, argFileName).value;
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
			strPath = document.all["H_StartPath"].value + "\\EDT450\\" + document.all.txAssignNo.value + "\\0\\";
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