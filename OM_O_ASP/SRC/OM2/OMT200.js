/*
DATE		SA			PRG		MGR_NO			DESC
1141106     David       Cloud   1141112         新增駐外發文登錄作業
1141222     Leslie      Cloud   1141162         修改增加檔案上傳時檢核檔案類型-調整白名單設定比照公文製作
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
var AllFiles = [];


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
	if(document.all.dgAttach.rows.length==1)
	{document.all.DivdgAttach.className="hide";}
        
    
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
var nInputFileCnt = '';
function ClientButtonControl(e)
{
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
        case "btAddFile":
            document.getElementById('fileInput' + nInputFileCnt).click();
            break;
    }
}
//加入附件
function fnAddFile() {
    if (!document.all.dgAttach)
        return;
    var strFileFullPath = "";

    var nFileSizeLimit = (document.all.txFileSizeLimit.value == "") ? 0 : parseInt(document.all.txFileSizeLimit.value, 10);
    for (var iFile = 0; iFile < $('#fileInput' + nInputFileCnt)[0].files.length; iFile++) {
        var bFileNameCheck = true;
        var bFileSizeCheck = true;
        var currentFile = $('#fileInput' + nInputFileCnt)[0].files[iFile];

        var strFileName = currentFile.name;
		var nFileSize = Math.ceil(currentFile.size);
        var nCheckFileSize = Math.ceil(currentFile.size / 1024/1024);
        var rowCnt = document.all.dgAttach.rows.length;
        if (nFileSizeLimit < nCheckFileSize) {
            jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["您所選取的檔案大小為[" + nCheckFileSize + "MB]，已超過附件檔案總上限[" + nFileSizeLimit + "MB]，\n故無法選擇此檔。"])), "");
            return;
        }
        //取得副檔名檢核-
        if (document.all["WE_ATTACH_CHECK"].value != "") {
            //1141222     Cloud   1141162         修改增加檔案上傳時檢核檔案類型 - 調整白名單設定比照公文製作
            //if (document.all["WE_ATTACH_CHECK"].value.indexOf("|") != -1) {
                //var strSystemSet = document.all["WE_ATTACH_CHECK"].value.split("|");
                //var strWhiteList = strSystemSet[1].split(";");
                var strWhiteList = document.all["WE_ATTACH_CHECK"].value.split(";");
                var bIsInWhiteList = false;
                var strFileExt = strFileName.split(".")[1].toUpperCase();
                var arrTempFileExt = strFileName.split(".");
                var strFileExt = arrTempFileExt[arrTempFileExt.length - 1].toUpperCase();
                for (var nList = 0; nList < strWhiteList.length; nList++)
                    if (strFileExt == strWhiteList[nList].toUpperCase()) {
                        bIsInWhiteList = true;
                        break;
                    }
                //若副檔名不在白名單中
                if (!bIsInWhiteList) {
                    //1141222     Cloud   1141162         修改增加檔案上傳時檢核檔案類型 - 調整白名單設定比照公文製作
                    //if (strSystemSet[0] == "C") {
                    //    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["依行政院國發會函頒「推動ODF-CNS15251為政府文件標準格式實施計畫」，106年全面推動各機關使用可編輯ODF-CNS15251文書軟體。執行期間:抱歉您的附件無法存檔，請用ODF軟體轉成PDF或ODF的文件以符合規定。PDF與ODF文件轉換方式，請參閱「員工入口網」->「網路資料夾」->「公用表單」->「資訊室」->「105年公文線上簽核教育訓練教材」->「推動ODF時程資料」。"])), "");
                    //    return;
                    //}
                    //else if (strSystemSet[0] == "W") {
                    //    if (!confirm("依行政院國發會函頒「推動ODF-CNS15251為政府文件標準格式實施計畫」，106年全面推動各機關使用可編輯ODF-CNS15251文書軟體。宣導最後階段:請將您的附件用ODF軟體轉成PDF或ODF的文件以符合規定。PDF與ODF文件轉換方式，請參閱「員工入口網」->「網路資料夾」->「公用表單」->「資訊室」->「105年公文線上簽核教育訓練教材」->「推動ODF時程資料。"))
                    //        return;
                    //}
                    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["非准許夾帶上傳的檔案類型。"])), "");
                    return;
                }
            //1141222     Cloud   1141162         修改增加檔案上傳時檢核檔案類型 - 調整白名單設定比照公文製作
            //}
            //else
                //alert("系統參數WE_ATTACH_CHECK設定值錯誤");
        }
        var rowCnt = document.all.dgAttach.rows.length;
        for (var i = 1; i < document.all.dgAttach.rows.length; i++) {
            var strSrcFileName = document.all.dgAttach.rows[i].cells[1].children[0].innerText;
            if (strFileName == strSrcFileName) {
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["已有相同檔名之檔案存在，無法加入。"])), "");
                $('btAddFile').focus();
                return;
            }
        }

        let strFileFullPath = URL.createObjectURL(currentFile);

        fnAddAttach(strFileName, strFileFullPath, nFileSize, "", "Client", "");
        
    }

    
    if (nInputFileCnt == '')
        nInputFileCnt = 0;

    nInputFileCnt = Number(nInputFileCnt) + 1;
    var InputFile = document.createElement("INPUT");
    InputFile.setAttribute("type", "file");
    InputFile.setAttribute("id", "fileInput" + nInputFileCnt);
    InputFile.setAttribute("name", "fileInput" + nInputFileCnt);
    InputFile.setAttribute("class", "hide");
    InputFile.setAttribute("onchange", "fnAddFile()");
    InputFile.setAttribute("multiple", "multiple");
    var fileDiv = $('#fileInput')[0].parentNode
    fileDiv.appendChild(InputFile);
    $('btAddFile').focus();
	
}
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
    
    var colDel = document.createElement("TD");
    colDel.setAttribute("align", "middle");
    colDel.setAttribute("nowrap", "nowrap");
    colDel.innerHTML = "<INPUT type=\"button\" value=\"刪除\" onclick=\"fnDeleteAttachItem()\" style=\"height: 2em;\" />";
    colDel.setAttribute("visible", "true");
    var strOpenPath = argFileFullPath.replace(/\\/g, "\\\\");
    
    //if (argFileType == "Server")
        //colDel.innerHTML += "&nbsp;<INPUT type=\"button\" value=\"下載\" onclick=\"OpenFile('" + htmlencode(strOpenPath) + "')\" />";
    //else
    colDel.innerHTML += `&nbsp;<INPUT type="button" value="開啟" onclick="OpenFile('${argFileName}','${htmlencode(argFileFullPath)}')" style=\"height: 2em;\" />`;

    //Add to dgAttach
    row.appendChild(colSeq);
    row.appendChild(colFile);
    
    row.appendChild(colDel);
    
    document.all.dgAttach.children[0].appendChild(row);
	if (document.all.dgAttach.rows.length>1)
	{document.all.DivdgAttach.className="dghead";}
	
    $(window).trigger('resize');

}
function fnDeleteAttachItem() {
    Page_BlockSubmit = true;
    //先刪除資料
    var deleteRow = event.srcElement.parentNode.parentNode;
    document.all.dgAttach.children[0].removeChild(deleteRow);
    //再重設序號及style
    for (var i = 1; i < document.all.dgAttach.rows.length; i++) {
        var row = document.all.dgAttach.rows[i];
        var rowBgColor = (i % 2) ? "#F7F7DE" : "White";
        row.style.backgroundColor = rowBgColor;
        row.childNodes[0].innerText = i;
    }
	if (document.all.dgAttach.rows.length==1)
	{document.all.DivdgAttach.className="dghead";}
}
function OpenFile(argFileName, argUrlPath) {
    if (argUrlPath?.match(/^blob/)) {
        Page_BlockSubmit = true;
        let bDownload = "PDF;JPG;GIF;PNG".indexOf(argFileName.substring(argFileName.lastIndexOf('.') + 1).toUpperCase()) < 0;
        let $dlLink = $('<A style="display:none">下載</A>').attr({
            "data-role": "none",
            "href": argUrlPath,
            "rel": "external",
            "data-ajax": "false",
            "target": "_blank",
        });

        if (bDownload)
            $dlLink.attr({ "download": argFileName });

        $dlLink[0].click();
        return;
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
        case "btSave":
            Page_BlockSubmit = true;
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
				//檢核總大小
				const files = document.querySelectorAll('input[type="file"][id^="fileInput"]');
				let totalSize = 0;
				for (let i = 0; i < files.length; i++) {
					if(files[i].files[0])
						totalSize += files[i].files[0].size;
				}

				// 限制大小
				var nFileSizeLimit = (document.all.txFileSizeLimit.value == "") ? 0 : parseInt(document.all.txFileSizeLimit.value, 10);
				const limitSize = nFileSizeLimit * 1024 * 1024;

				if (totalSize > limitSize) {
					alert('上傳檔案總大小超過 '+document.all.txFileSizeLimit.value+'MB（目前 ${(totalSize / 1024 / 1024).toFixed(2)} MB)');
					Page_BlockSubmit = true;
					return;
				}
				else
				{
					IsServerHandling = true;
					Page_BlockSubmit = false;
					jf_ToolBarSubmit(xObjectName);
				}
            }			
            break;
        case "btCancel":
            //Page_BlockSubmit = !jf_ConfirmCancel();
            //jf_ToolBarSubmit(xObjectName);
            window.close();
            break;
        
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
    var bRtnbool = false;
    if (CheckDate("txIssueDateS", "發文日期")) {
        if (jf_CheckBeforSave()) {
            bRtnbool = true;
        }
    }
    //檢核總大小
    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";
    var strCheckList = ["txIssueNo", "txIssueDateS", "txSubject","txDocPDFPath"]
    var strCheckListName = ["發文字號", "發文日期", "主旨", "本文PDF"]
    for (var iCheck = 0; iCheck < strCheckList.length; iCheck++) {

        if (document.all[strCheckList[iCheck]].value == "") {
            strErrMsg += strCheckListName[iCheck]+"不可空白\n";
            
        }
    }
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
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{

    if (argCallerId == "EAC005")
    {
        if (document.all["txFileCls"] != null)
            document.all["txFileCls"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
        if (document.all["txVerNo"] != null)
            document.all["txVerNo"].value = jf_Trim(document.all.lbReturnValue.options[5].value);

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
function CheckDate(argId, argText) {
    document.all[argId].value = jf_Trim(document.all[argId].value);
    if (document.all[argId].value != "") {
        document.all[argId].value = jf_PADL(document.all[argId].value, 7, "0");
        if (!jf_CheckCDATE(document.all[argId].value)) {
            alert(argText + '格式不正確');
            $('#' + argId).focus();
            return false;
        }
    }
    return true;
}
function htmlencode(s) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}

