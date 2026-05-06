/*
DATE	SA		PRG		MGR_NO		DESC
1071122	Kevin	Kevin_C	1070583	    新增來文參考檔案上傳作業
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
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
	var xObjectName = e.target.id;
	var pNo = xObjectName.substring(8,xObjectName.indexOf("_btDgdel"));
	var btDgdel;
	if (document.all["dg1__ctl"+pNo+"_btDgdel"] != null)
		btDgdel = document.all["dg1__ctl"+pNo+"_btDgdel"].id;
		
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		case "btUpLoad":
			Page_BlockSubmit = true;
			fnAddFile();
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
	
	if(IsServerHandling)
	   return;
	
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
			Page_BlockSubmit = !jf_CheckKeyObject();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			IsServerHandling = true;
			jf_ShowWaitState();
			Page_BlockSubmit = true;
			UploadFile();
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			$('#txDocNo').focus();
			break;
	}
}


/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//檢核及記錄應加入之檔案
var AllFiles = [];
function fnAddFile() {
	if (!document.all.dg1)
		return;
	var strFileFullPath = "";
	var strSrcFileName = "";
	//取得檔案資訊方式
	for (var iFile = 0 ; iFile < $('#txAttach')[0].files.length ; iFile++) {
		var bFileNameCheck = true;
		var bFileSizeCheck = true;
		var currentFile = $('#txAttach')[0].files[iFile];
		var nFileSize = Math.ceil(currentFile.size / 1024);

		var strFileName = currentFile.name;
		for (var i = 1; i < document.all.dg1.rows.length; i++) {
			//原先已有之附件
			if (document.all["dg1__ctl" + (i + 1) + "_lbFileName"])
				strSrcFileName = document.all["dg1__ctl" + (i + 1) + "_lbFileName"].textContent;
			else
				strSrcFileName = document.all.dg1.rows[i].cells[2].childNodes[0].textContent;
			if (strFileName == strSrcFileName) {
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["已有相同檔名之檔案存在，無法加入。"])), "");
				$('btAddFile').focus();
				return;
			}
		}

		fnAddAttach(strFileName, strFileFullPath, "", "", "", "");
		AllFiles.push($('#txAttach')[0].files[iFile]);
	}

	//將focus設到加入附件的按鈕以便使用者繼續加入
	$('btAddFile').focus();
}
//加入附件共用函式，僅加入資料列，確認時才上傳檔案
function fnAddAttach(argFileName, argFileFullPath, argFileSize, argFileDesc, argFileType, argFileDraftSeq) {
	var rowCnt = document.all.dg1.rows.length;
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
	spanFileName.name = "FileName";
	spanFileName.textContent = argFileName;
	spanFileName.className = "InputFieldLabel";
	colFile.appendChild(spanFileName);
	//附件描述
	var coldes = document.createElement("TD");
	coldes.setAttribute("align", "Left");
	var spanFileDesc = document.createElement("SPAN");
	spanFileDesc.name = "FileDesc";
	spanFileDesc.textContent = document.all.txAttachDesc.value;
	spanFileDesc.className = "InputFieldLabel";
	coldes.appendChild(spanFileDesc);

	var colDel = document.createElement("TD");
	colDel.setAttribute("align", "middle");
	colDel.setAttribute("nowrap", "nowrap");
	//刪除按鈕
	colDel.innerHTML = "<INPUT id=\"dg1__ctl" + (document.all.dg1.rows.length + 1) + "_btDelete\" type=\"submit\" value=\"刪除\" onclick=\"fnDeleteAttachItem()\" />";
	colDel.setAttribute("visible", "true");

	var strOpenPath = argFileFullPath.replace(/\\/g, "\\\\");
	//Add to dg1
	row.appendChild(colSeq);
	row.appendChild(colDel);
	row.appendChild(colFile);
	row.appendChild(coldes);

    //附件描述
	var colUpdUser = document.createElement("TD");
	colUpdUser.setAttribute("align", "Left");
	var spanUpdUser = document.createElement("SPAN");
	spanUpdUser.name = "UpdUser";
	spanUpdUser.textContent = "";
	spanUpdUser.className = "InputFieldLabel";
	colUpdUser.appendChild(spanUpdUser);

    //附件描述
	var colUpdTime = document.createElement("TD");
	colUpdTime.setAttribute("align", "Left");
	var spanUpdTime = document.createElement("SPAN");
	spanUpdTime.name = "UpdTime";
	spanUpdTime.textContent = "";
	spanUpdTime.className = "InputFieldLabel";
	colUpdTime.appendChild(spanUpdTime);

	row.appendChild(colUpdUser);
	row.appendChild(colUpdTime);

	document.all.dg1.children[0].appendChild(row);
}
var strUpload = "";
function UploadFile() {
	var strSrcFileName = "";
	var strSrcFileDesc = "";
	var strPath = "";
	var strBuffer = "";
	var iDgLength = document.all.dg1.rows.length;
	//先將不存在的附件移掉
	for (var i = 1; i < iDgLength; i++) {
		var bIsFileExist = false;
	    //取得附件檔名&描述
		strSrcFileName = document.all.dg1.rows[i].cells[2].textContent.trim();
		strSrcFileDesc = document.all.dg1.rows[i].cells[3].textContent.trim();

		strUpdUser = document.all.dg1.rows[i].cells[4].textContent.trim();
		strUpdTime = document.all.dg1.rows[i].cells[5].textContent.trim().replaceAll(':', '');

		for (var iArrfile = 0; iArrfile < AllFiles.length; iArrfile++) {
			if (AllFiles[iArrfile].name == strSrcFileName) {
				bIsFileExist = true;
				break;
			}
		}
		if (!bIsFileExist)
			AllFiles.splice(iArrfile, 1);
		document.all.H_AttachInf.value += strBuffer + strSrcFileName + ":" + strSrcFileDesc + ":" + strUpdUser + ":" + strUpdTime;
		strBuffer = "|";
	}
	if (AllFiles.length > 0)
	{
		//將檔案上傳到伺服器
		var strArtifact = jf_GetArtifact();
		var strWebService = document.all["txWS"].value;

		var ioWS = new WebFileIO(strWebService, strArtifact);
		ioWS.upload(document.all["txPath"].value, AllFiles, UploadCallBack);
	}
	else
	{
		Page_BlockSubmit = false;
		jf_ToolBarSubmit("btSave");
	}
}
function UploadCallBack(result) {
	if (result.hasError) {
	    alert("上傳附件至SERVER端失敗：" + result.ErrorMessage);
	}
	else {
	    Page_BlockSubmit = false;
	    jf_ToolBarSubmit("btSave");
	}
}

//刪除附件
function fnDeleteAttachItem() {
	Page_BlockSubmit = true;
	//先刪除資料
	var deleteRow = event.srcElement.parentNode.parentNode;
	var strDelFileName = "";
	if (deleteRow.cells[2].childNodes[1] && deleteRow.cells[2].childNodes[1].textContent.trim() != "")
		strDelFileName = deleteRow.cells[2].childNodes[1].textContent.trim();
	else
		strDelFileName = deleteRow.cells[2].textContent.trim();

	//紀錄檔名
	if (document.all.H_AttachDel.value != "")
		document.all.H_AttachDel.value += "|" + strDelFileName;
	else
		document.all.H_AttachDel.value += strDelFileName;
	document.all.dg1.children[0].removeChild(deleteRow);
	//再重設序號及style
	for (var i = 1; i < document.all.dg1.rows.length; i++) {
		var row = document.all.dg1.rows[i];
		var rowBgColor = (i % 2) ? "White" : "rgb(201, 243, 245)";
		row.style.backgroundColor = rowBgColor;
		row.childNodes[0].innerText = i;
	}
}
function OpenFile(argFileName) {
	var DownToPath = document.all["H_WorkPath"].value + "EDT139\\" + document.all.txDocNo.value + "\\";
	var DownFromPath = document.all["txPath"].value;
	var strArtifact = jf_GetArtifact();
	var rtnVal = ED1.EDT139.AttDownLoad(DownFromPath, DownToPath, strArtifact, document.all["txWS"].value, argFileName).value;
	if (rtnVal[1] != "")
		alert(rtnVal[1]);
	else
		openDlg(rtnVal[0] + "&OpenType=download", strArtifact, "");

}