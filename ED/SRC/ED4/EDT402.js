/*
DATE	SA		PRG		MGR_NO		DESC
0951211 Stella  Whay	950721      新增[流程資訊]按鈕
0970708	--		Leslie	0970512		額外修正開啟EDI200會出現"隸屬機關:測試用"的問題
1030930 Cloud	Gabby	1030688		修正傳送後不會自動關閉視窗的問題
1040123	Cloud	Gabby	1030975		增加判斷系統參數FLOW_APPROVE_MODE，決定申請者是否可以核可
1050429 Cloud   Justin  1050087     二代公文修改
1051019 Leslie  Kenny   1050087     二代公文修改
1061103 Kevin	Zen		1061071	    修正點擊核可多次會收到重複通知之問題
1070412 Cloud   Zen     1061071     修正檢核失敗後無法postback之問題
1070830 Kevin   Justin  1070678     弱掃AJAX修改
1070912 Kevin	Joe		1070172		新增功能線上瀏覽、撤回、參考附件、預排流程，紙本公文不提供線上申請
1071022 Kevin	Joe		1070172		所有功能卡高榮機關暱稱
1080419	Cloud	Kevin_C	1070172		修正流程資訊位置不正確的問題
1080423	Cloud	Kevin_C	1080047		增加字數檢核
1080514	Cloud	Kevin_C	1080047		修正使用物件錯誤的問題
1080916 Kevin	Kevin_C	1080774		新增撤回功能
1110103 Kevin   Zen     1101292     修正多次點擊重複PostBack之問題
1110821 Cloud   Cloud   1110629     修正無資料不該有title
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

/*1050429 Justin 1050087 二代公文修改
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
    //1080419	Kevin_C	1070172		修正流程資訊位置不正確的問題
    //1110821 Cloud 1110629 調整作法 以下不需要
    //*if(document.all.dgAttach.className=="hide")
		//document.all.AttachTable.style.cssText = "display:none";
    //1030930 Gabby [1030688] 註解掉此行以修正傳送後不會自動關閉視窗的問題
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    dlSpdNo_onchange();
    //1130522 	Jason	1130387     修改說明欄位顯示資訊
    if (document.all["H_ShowDecList"].value == "N") {
        document.all["divDescList"].style.display = "none";//隱藏資訊
        document.all["divDescList2"].style.display = "none";//隱藏資訊
    }
    //1130918   Cloud   1130941     弱掃XSS修正
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
    	//1070912	Joe	1070172	新增加入附件--S
    	case "btAddFile":
    		document.getElementById('fileInput').click();
    		break;
    		//1070912	Joe	1070172	新增加入附件--E
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
//1050429 Justin 1050087 二代公文修改 
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

    //1050429 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1050429 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
				//1071022	Joe		1070172		所有附件功能卡高榮
				if(document.all.H_OrgNickName.value == "KVGH")
                //1070912	Joe		1070172		新增上傳功能
					UploadFile();
            }
            else
                Page_BlockSubmit = true;
            //1050429 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1050429 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1050429 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_CheckBeforSave();
            //1050429 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_CheckBeforSave();
            //1050429 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btTransfer":
            /*1050429 Justin 1050087 二代公文修改
			var ddlIdx=2;
			var nextOpt = GetToolbarCtrl(ddlIdx);
			var aOptions = nextOpt.getOptions();
			document.all.SelectedUser.value = aOptions.value;
			document.all.SelectedUser2.value = aOptions[aOptions.selectedIndex].text;*/
            document.all.SelectedUser.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].value;
            document.all.SelectedUser2.value = document.all.ddlNextUser.options[document.all.ddlNextUser.selectedIndex].text;
            Page_BlockSubmit = !jf_CheckBeforSave();
            //alert("安全的到這裡");
            //1050429 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
			//1070912	Joe		1070172		新增上傳功能--S
				//1071022	Joe		1070172		所有附件功能卡高榮
			// if(Page_BlockSubmit == false)
			if(Page_BlockSubmit == false && document.all.H_OrgNickName.value == "KVGH")
                UploadFile();
			//1070912	Joe		1070172		新增上傳功能--E
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCheck":
            //1050429 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
            //950721  新增[流程資訊]按鈕 by whay
        case "btSearch":
            if (jf_CheckKeyObject())
            {
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
                //jf_ToolBarSubmit();
            }
            break;
            //1040123 Gabby[1030975] 增加核可鍵
        case "btApprove":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1050429 Justin 1050087 二代公文修改 
            //jf_ToolBarSubmit();
            //1061103 Zen 1061071 修正點擊核可多次會收到重複通知之問題
            //1070412 Zen 1061071 修正檢核失敗後無法postback之問題
            if (Page_BlockSubmit == false)
                IsServerHandling = true;
            jf_ToolBarSubmit(xObjectName);
            break;
            //1040123 Gabby[1030975]--END
			//1080916	Kevin_C	1080774		新增撤回
		case "btBack":
			Page_BlockSubmit = !window.confirm("確定要撤回嗎?");
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
	//1080423	Kevin_C	1080047	增加字數檢核
	//1080514	Kevin_C	1080047	修正使用物件錯誤的問題
	//if (!isMaxLength(document.all.txApplyReason,'原因分析','300'))
	if (!isMaxLength(document.all.txReason,'原因分析','300'))
        return false;
    var bRtnbool = true;
    var strErrMsg = "";
    var buf = "";
    var strNSpdNo = GetDropDownListSelectedValue("dlSpdNo");
    var strOSpdNo = document.all["H_OSpdNo"].value;
    var strReason = document.all["txReason"].value;
    var strNDueDate = document.all["txNDueDate"].value;
    var strToday, strMonth, strDate;
    var dateToday = new Date();

    strMonth = dateToday.getMonth() + 1;
    strDate = dateToday.getDate();
    if (strMonth < 10)
    {
        strMonth = '0' + strMonth;
    }
    if (strDate < 10)
        strDate = '0' + strDate;
    strToday = '0' + (dateToday.getFullYear() - 1911) + strMonth + strDate;

    if (strReason == "")
    {
        if (strErrMsg != "") buf = "\n";
        strErrMsg = "原因分析不可為空白" + buf + strErrMsg;
        /*1050505 Justin 1050087 二代公文修改
		document.all["txReason"].focus();*/
        $('#txReason').focus();
    }
    if (strReason.length > 300)
    {
        if (strErrMsg != "") buf = "\n";
        strErrMsg = "原因分析長度不可大於300個字" + buf + strErrMsg;
        /*1050505 Justin 1050087 二代公文修改
		document.all["txReason"].focus();*/
        $('#txReason').focus();
    }
    if (strNDueDate == "")
    {
        if (strErrMsg != "") buf = "\n";
        strErrMsg = "新限辦日期不可為空白" + buf + strErrMsg;
        /*1050505 Justin 1050087 二代公文修改
		document.all["txNDueDate"].focus();*/
        $('#txNDueDate').focus();
    }
    if (strNSpdNo == strOSpdNo)
    {
        if (strErrMsg != "") buf = "\n";
        strErrMsg = "速別並未變更，不需要申請" + buf + strErrMsg;
        /*1050505 Justin 1050087 二代公文修改
		document.all["dlSpdNo"].focus();*/
        $('#dlSpdNo').focus();
    }

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    if (strNDueDate < strToday && bRtnbool == true)
    {
        var ret = window.confirm("修改本份公文速別後，會造成公文逾期，是否儲存?");
        bRtnbool = ret;
    }
    //bRtnbool=false;

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

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//取出DropDownList的selected value
function GetDropDownListSelectedValue(argObjId)
{
    var index = document.all[argObjId].selectedIndex;
    return document.all[argObjId].options[index].value;
}
/*1050429 Justin 1050087 二代公文修改
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

//950526 David 95.06.20 修改strDurDate判斷引用空的隱藏欄位
function dlSpdNo_onchange()
{
    var index = document.all["dlSpdNo"].selectedIndex;
    var val = document.all["dlSpdNo"].options[index].value;
    var strDueDate = document.all["H_DueDate"].value;
    var argDueDate = strDueDate.split(':');

    if (val == "1")//普通件
    {
        if (argDueDate != "")
            document.all["txNDueDate"].value = argDueDate[0];
        fnSetTextBoxReadOnly("txNDueDate");
    }
    else if (val == "2")//速件
    {
        if (argDueDate != "")
            document.all["txNDueDate"].value = argDueDate[1];
        fnSetTextBoxReadOnly("txNDueDate");
    }
    else if (val == "3")//最速件
    {
        if (argDueDate != "")
            document.all["txNDueDate"].value = argDueDate[2];
        fnSetTextBoxReadOnly("txNDueDate");
    }
    else if (val == "4")//限辦
    {
        fnSetTextBoxReadWrite("txNDueDate");
    }

}

function dlPhraseNo_onchange()
{
    var index = document.all["dlPhraseNo"].selectedIndex;
    //1050429 Justin 1050087 二代公文修改
    //var val = document.all["dlPhraseNo"].options[index].innerText;
    var val = document.all["dlPhraseNo"].options[index].textContent;
    document.all["txReason"].value += val;
    document.all["dlPhraseNo"].options[0].selected = true;
    /*1050505 Justin 1050087 二代公文修改
	document.all["txReason"].focus();*/
    $('#txReason').focus();
}

function fnSetTextBoxReadWrite(elementId)
{
    document.all[elementId].className = "InputFieldNumeric";
    document.all[elementId].readOnly = false;
    //document.all[elementId].disabled = false;//disabled=true會導致server看不到value
}

function fnSetTextBoxReadOnly(elementId)
{
    document.all[elementId].className = "DisplayOnly InputFieldNumeric";
    document.all[elementId].readOnly = true;
    document.all[elementId].style.color = "Navy";
    //document.all[elementId].disabled = true;//避免觸發onclick事件
}

//日期onblur
function CheckCDATE(argObj, strMsg)
{
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
            jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            /*1050505 Justin 1050087 二代公文修改
			document.all[argObj].focus();*/
            $('#' + argObj).focus();
        }
    }
}


//1070912	Joe	1070172	新增加入附件--S
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
    //1110821 Cloud     1110629     修正無附件不該顯示title問題
	if (AllFiles.length != 0) {
	    document.all.dgAttach.className = "";
	    document.all.dgAttachhead.className = "dghead";
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
    //1110821 Cloud     1110629     修正無附件不該顯示title問題
    //coldes.innerHTML = "<INPUT id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_txFileDesc\" type=\"TextBox\" value=\"" + argFileDesc + "\"/>";
	coldes.innerHTML = "<INPUT id=\"dgAttach__ctl" + (document.all.dgAttach.rows.length + 1) + "_txFileDesc\" type=\"TextBox\" style=\"WIDTH: 10.5em;\" value=\"" + argFileDesc + "\"/>";


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
	var DownToPath = document.all["H_WorkPath"].value + "EDT402\\" + document.all.txApplyNo.value + "\\";
	var DownFromPath = document.all["H_StartPath"].value + "\\EDT402\\" + document.all.txApplyNo.value + "\\";
	var rtnVal = ED4.EDT402.AttDownLoad(DownFromPath, DownToPath, document.all.nArtifact.value, document.all.H_WS.value, argFileName).value;
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
			strPath = document.all["H_StartPath"].value + "\\EDT402\\" + document.all.txApplyNo.value + "\\";
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
//1070912	Joe	1070172	新增加入附件--E
//1080423	Kevin_C	1080047	增加字數檢核 -S
var bHasCheck = false;
function isMaxLength(obj,argText,argMaxNum)
{
	if (bHasCheck)
    {
        bHasCheck = false;
        return;
    }
	bHasCheck = true;
	var nMaxNum = parseInt(argMaxNum);
    if (obj.value.length == nMaxNum)
    {
		var nCode = parseInt(event.keyCode);
        if (nCode != 8 && nCode!=9 && nCode != 13 && nCode != 16 && nCode != 46 && (nCode < 33 || nCode > 40))
		{
            event.returnValue = false;
			jf_ShowMsg("", argText+"長度不可超過"+argMaxNum+"字");
			bHasCheck = false;
			return false;
		}
    } else if (obj.value.length > nMaxNum)
    {
		event.returnValue = false;
        jf_ShowMsg("", argText+"長度不可超過"+argMaxNum+"字");
        obj.value = obj.value.substring(0, nMaxNum);
		bHasCheck = false;
		return false;
    }
	bHasCheck = false;
	return true;
}
//1080423	Kevin_C	1080047	增加字數檢核 -E
//1130918   Cloud   1130941     弱掃XSS修正-S
var arrDesc = new Array("lbDesc", "DescList1", "DescList2", "DescList3", "DescList4","DescList5");
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