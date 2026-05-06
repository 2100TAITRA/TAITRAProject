/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 Latest Updated by Andy 2007.04.09
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
	1120831		Joe		1120709	弱掃修正XSS
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
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
var EAR227_DocList = new Object();
EAR227_DocList.Info = new Array();
var gDgInit = true;

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
	
	if (gDgInit) {
		document.all.dg1.children[0].childNodes[0].style.backgroundColor = "#5f9cc5";
		document.all.dg1.children[0].childNodes[0].style.textAlign = "center";
		document.all.dg1.children[0].childNodes[0].style.border = "1";
		document.all.dg1.children[0].childNodes[0].setAttribute("rules", "col");
		document.all.dg1.children[0].childNodes[1].remove();
		gDgInit = false;
		document.all["tbSelect"].className = "hide";
	}
	/*if (document.all.dg1 && document.all.dg1.rows.length > 1 && document.all["dg1"].className != "hide") {
		document.all["tbSelect"].className = "DivTable";
	}
	else {
		document.all["tbSelect"].className = "hide";
	}*/

}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/

function ClientButtonControl(event)
{
  
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	Page_BlockSubmit = true;
	xObjectName = event.target.id;
	switch (xObjectName)
	{
		case "btAddDocNo":
			//檢核公文不可為空
			if (document.all["txDocNo"].value == "") {
				alert('公文文號不可為空。');
				return;
			}
			//檢核公文是否存在
			var DgLength = document.all.dg1.rows.length;
			for (var j = 1; j < DgLength; j++) {
				if (document.all["dg1__ctl" + j + "_lbDocNo"].textContent == document.all["txDocNo"].value) {
					alert('文號已存在於下方捲動區，不可透過加入新增。');
					return;
				}
			}
			var AttType = "0";
			if (document.all["rbBigAtt"].checked)
				AttType = "1";
			var SearchParam = new Array(7);
			//new string[7] { u_UserInfo.SOURCE_ORGNO, txDateS.Text, txDateE.Text, txDocNo.Text, txRemarkS.Text, txRemarkE.Text, strAttType };strAttType0:光碟、1:大附
			SearchParam[0] = document.all["SourceNo"].value;
			SearchParam[1] = "";
			SearchParam[2] = "";
			SearchParam[3] = "";
			SearchParam[4] = "";
			SearchParam[5] = document.all["txDocNo"].value;
			SearchParam[6] = AttType;
			var AddObj = EA02.EAR227_EXAM.SearchProcData(SearchParam).value;
			if (AddObj.strErrMsg != "")
				alert(AddObj.strErrMsg);
			else {
				if (AddObj.bHasData == true) {
					document.all.dg1.className = "";
					document.all.tbSelect.className = "";
					for (var iDoc = 0; iDoc < AddObj.Info.length; iDoc++) {
						EAR227_DocList.Info[EAR227_DocList.Info.length] = AddObj.Info[iDoc];
					}
					document.all["txDocNo"].value = "";
					fnbulideDG();
				}
				else {
					alert("查無符合條件資料。");

				}
			}
			
			//重建畫面
			fnbulideDG();

			
			
			break;
		case "btSelectAll":
			SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			SelectClear("dg1", "_cbSelect");
			break;
		case "btDeleteErrDoc":
			//檢核至少需勾選一個
			Page_BlockSubmit = true;
			var hasKeepData = false;
			if (CheckDgCBox()) {
				for (var i = 1; i < document.all.dg1.rows.length; i++) {
					//將保留資訊Keep至物件
					if (document.all["dg1__ctl" + i + "_cbSelect"].checked != true) {
						hasKeepData = true;
					}
					else//刪除物件
					{
						EAR227_DocList.Info[i - 1] = undefined;
					}
				}
				//更新物件
				DeleteRow();
				//畫面整個刪除
				$("#dg1").find("tr[Id*=Data]").remove();
				if (hasKeepData) {
					fnbulideDG();
				}
				else {
					document.all.dg1.className = "hide";
					document.all.tbSelect.className = "hide";
				}
				
			}
			break;
	}	
}
//全部選取
function SelectAll(argTableName, argCheckBoxName) {
	if (document.all[argTableName] == null)
		return;

	for (i = 1; i < document.all[argTableName].rows.length; i++) {
		var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
		obj.checked = true;
		EAR227_DocList.Info[i - 1].Print = "1"
	}
}

//反向選取
function SelectInverse(argTableName, argCheckBoxName) {
	if (document.all[argTableName] == null)
		return;

	for (i = 1; i < document.all[argTableName].rows.length; i++) {
		var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
		if (obj.disabled == false) {
			if (obj.checked) {
				obj.checked = false;
				EAR227_DocList.Info[i - 1].Print = "0"
			}
			else {
				obj.checked = true;
				EAR227_DocList.Info[i - 1].Print = "1"
			}
		}
	}
}

//清除選取
function SelectClear(argTableName, argCheckBoxName) {
	if (document.all[argTableName] == null)
		return;

	for (i = 1; i < document.all[argTableName].rows.length; i++) {
		var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
		obj.checked = false;
		EAR227_DocList.Info[i - 1].Print = "0"
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
	xObjectName= event.target.id;
	
	switch (xObjectName) {
		case "btOpen":
			Page_BlockSubmit = true;
			if (jf_Trim(document.all.txDateS.value) == "" && jf_Trim(document.all.txDateE.value) == "" &&
				jf_Trim(document.all.txRemarkS.value) == "" && jf_Trim(document.all.txRemarkE.value) == "" &&
				jf_Trim(document.all.txDocNo.value) == "") {
				alert("至少需輸入一項條件");
			}
			else {

				//進行日期檢查交換
				if (document.all["txDateS"].value != "" && document.all["txDateE"].value == "") {
					document.all["txDateE"].value = document.all["txDateS"].value;
				}
				if (document.all["txDateS"].value == "" && document.all["txDateE"].value != "") {
					document.all["txDateS"].value = document.all["txDateE"].value;
				}
				if (document.all["txDateS"].value != "" && document.all["txDateE"].value != "") {
					if (document.all["txDateS"].value > document.all["txDateE"].value) {
						var TempDate = document.all["txDateS"].value;
						document.all["txDateS"].value = document.all["txDateE"].value;
						document.all["txDateE"].value = TempDate;
					}
				}
				var AttType = "0";
				if (document.all["rbBigAtt"].checked)
					AttType = "1";
				var SearchParam = new Array(7);
				//new string[7] { u_UserInfo.SOURCE_ORGNO, txDateS.Text, txDateE.Text, txDocNo.Text, txRemarkS.Text, txRemarkE.Text, strAttType };strAttType0:光碟、1:大附
				SearchParam[0] = document.all["SourceNo"].value;
				SearchParam[1] = document.all["txRemarkS"].value;
				SearchParam[2] = document.all["txRemarkE"].value;
				SearchParam[3] = document.all["txDateS"].value;
				SearchParam[4] = document.all["txDateE"].value;
				SearchParam[5] = document.all["txDocNo"].value;
				SearchParam[6] = AttType;
				//透過AJAX 建立畫面
				EAR227_DocList = EA02.EAR227_EXAM.SearchProcData(SearchParam).value;
				if (EAR227_DocList.strErrMsg != "")
					alert(EAR227_DocList.strErrMsg);
				else {
					if (EAR227_DocList.bHasData == true) {
						document.all.dg1.className = "";
						document.all.tbSelect.className = "";
						fnbulideDG();
					}
					else {
						document.all.dg1.className = "hide";
						document.all.tbSelect.className = "hide";
						alert("查無符合條件資料。");
						document.body.style.cursor = "default";
					}
				}
			}
			break;
		case "btPreview":
			Page_BlockSubmit = true;
			document.body.style.cursor = "wait";
			window.status = "處理中,請稍候!!";
			if (CheckDgCBox()) {
				var Atttype = "0";
				if (document.all["rbBigAtt"].checked) {
				    Atttype = "1";
				    if (document.all["txStart"].value == "")
				    {
				        alert('起始位置不可為空白。');
				        return;
				    }
				    else
				    {
				        if (document.all["txStart"].value == "0")
				        {
				            alert('起始位置不可為0。');
				            return;
				        }
				            
				    }
				}
				//整理實際上需要印出的資料物件
				var EAR227Print_DocList = new Object();
				EAR227Print_DocList.Info = new Array();
				var PrtObjInx = 0;
				for (var iPrt = 0; iPrt < EAR227_DocList.Info.length; iPrt++) {
					if (EAR227_DocList.Info[iPrt].Print == "1") {
						EAR227Print_DocList.Info[EAR227Print_DocList.Info.length] = EAR227_DocList.Info[iPrt];
					}
				}
				var strRtn = EA02.EAR227_EXAM.Print(EAR227Print_DocList, document.all["txStart"].value, Atttype, document.all["SourceNo"].value).value;
				if (strRtn.indexOf("ERR-") == -1) {
				    var strPath = strRtn.split('|');
				    openDlg(strPath[0], strPath[1], strPath[2]);
				    document.body.style.cursor = "default";
				}
				else {
				    alert(strRtn.split('-')[1]);
				    document.body.style.cursor = "default";
				}
			}
			break;
		case "btClean":
			IsServerHandling = true;
			jf_ShowWaitState();
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave()) {
		bRtnbool = true;
	}	
	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	
	var strErrMsg= "";
	var ErrMsgCount = 0;
	
	
	if(document.all["dg1"])
	{
		
		var DgLength = document.all.dg1.rows.length;
		var Count = 0;
		for(var j=1;j<DgLength;j++)
		{
			if (document.all["dg1__ctl" + j +"_cbSelect"].checked)
			{
				Count++;
				break;
			}
		}
		if (Count == 0)
			strErrMsg += "至少勾選一筆公文。";

	}
	else
		strErrMsg += "無可供預覽資料。";
	

	
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
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//建立畫面
function fnbulideDG()
{
	$("#dg1").find("tr[Id*=Data]").remove();
	for (var iDoc = 0; iDoc < EAR227_DocList.Info.length; iDoc++) {
		fnAddDgRow(EAR227_DocList.Info[iDoc]);
	}
}

function TbOnBlur(strObjName) {
    if (jf_Trim(document.all[strObjName].value) != "") {
        document.all[strObjName].value = jf_PADL(jf_Trim(document.all[strObjName].value), 7, "0");
		if (!jf_CheckCDATE(document.all[strObjName].value)) {
			if(strObjName == "txDateS")
				alert("編目日期(起)格式不正確");
			else
				alert("編目日期(迄)格式不正確");
			document.all[strObjName].focus();
		}
	}
}
function CheckDgCBox() {
	var bSelect = false;
	var strErrMsg = "";
	if (document.all.dg1.rows.length > 1) {
		for (var i = 1; i < document.all.dg1.rows.length ; i++) {
			if (document.all["dg1__ctl" + i + "_cbSelect"].checked) {
				bSelect = true;
				break;
			}
		}
		if (!bSelect)
			strErrMsg += "至少勾選一筆資料\n";
	}
	else {
		strErrMsg += "捲動區中無資料，請先加入資料\n";
	}
	if (strErrMsg != "")
		alert(strErrMsg);

	return bSelect;
}

function fnAddDgRow(argObj,argRow) {
	var rowCnt = document.all.dg1.rows.length;
	//設定row的背景色
	//create row
	var row = document.createElement("TR");
	row.id = "Data" + rowCnt.toString();
	//create column
	//序
	var colSeq = document.createElement("TD");
	colSeq.setAttribute("align", "middle");
	colSeq.setAttribute("nowrap", "nowrap");
	colSeq.style.width = "1.5em";
	colSeq.className = "InputFieldLabel";
	colSeq.innerText = rowCnt;
	//選
	var cselect = document.createElement("TD");
	cselect.setAttribute("align", "middle");
	cselect.setAttribute("nowrap", "nowrap");
	cselect.style.width = "1.5em";

	var cspelect = document.createElement("INPUT");
	cspelect.id = "dg1__ctl" + htmlencode((document.all.dg1.rows.length).toString()) + "_cbSelect";
	cspelect.setAttribute("type", "checkbox");
	cspelect.setAttribute("onclick", "javascript:SetPrint()");
	if (argObj.Print == "1")
		cspelect.setAttribute("checked", "true");
	cselect.appendChild(cspelect);

	//文號
	var colDoc = document.createElement("TD");
	colDoc.setAttribute("align", "middle");
	colDoc.setAttribute("nowrap", "nowrap");
	colDoc.style.width = "8.5em";
	var cspanDoc = document.createElement("SPAN");
	cspanDoc.id = "dg1__ctl" + htmlencode((document.all.dg1.rows.length).toString()) + "_lbDocNo";
	cspanDoc.textContent = argObj.Doc_No;
	cspanDoc.className = "InputFieldLabel";
	colDoc.appendChild(cspanDoc);
	
	
	//-案由
	var cFromSubject = document.createElement("TD");
	cFromSubject.setAttribute("align", "middle");
	cFromSubject.setAttribute("nowrap", "nowrap");
	cFromSubject.style.width = "25em";
	cFromSubject.style.height = "4em";
	
	//
	var spanFromSubject = document.createElement("textarea");
	spanFromSubject.id = "dg1__ctl" + htmlencode((document.all.dg1.rows.length).toString()) + "_txSubject";
	spanFromSubject.value = htmlencode(argObj.Subject);
	spanFromSubject.style.height = "inherit";
	spanFromSubject.style.width = "95%";
	spanFromSubject.setAttribute("onblur", "javascript:SetFromInfo()");
	cFromSubject.appendChild(spanFromSubject);
	
	//檔號-s
	//-檔號
	var cFileNo = document.createElement("TD");
	cFileNo.setAttribute("align", "middle");
	cFileNo.setAttribute("nowrap", "nowrap");
	cFileNo.style.width = "20em";
	var spanFileNo = document.createElement("SPAN");
	spanFileNo.id = "dg1__ctl" + htmlencode((document.all.dg1.rows.length).toString()) + "_lbFileNo";
	spanFileNo.textContent = argObj.File_NO;
	spanFileNo.className = "InputFieldLabel";
	cFileNo.appendChild(spanFileNo);
	//檔號-e
	//保存年限-s
	var cKeepYearinfo = document.createElement("TD");
	cKeepYearinfo.setAttribute("align", "middle");
	cKeepYearinfo.setAttribute("nowrap", "nowrap");
	cKeepYearinfo.style.width = "3.5em";
	
	//-文字
	var spanKeepYearinfo = document.createElement("SPAN");
	spanKeepYearinfo.id = "dg1__ctl" + htmlencode((document.all.dg1.rows.length).toString()) + "_lbKeepYear";
	spanKeepYearinfo.textContent = argObj.Keep_Year;
	spanKeepYearinfo.className = "InputFieldLabel";
	cKeepYearinfo.appendChild(spanKeepYearinfo);
	//保存年限-e
	//備註-s
	var cRemarkinfo = document.createElement("TD");
	cRemarkinfo.setAttribute("align", "middle");
	cRemarkinfo.setAttribute("nowrap", "nowrap");
	cRemarkinfo.style.width = "20em";
	cRemarkinfo.style.height = "4em";
	
	//-文字
	var spanDesc = document.createElement("textarea");
	spanDesc.id = "dg1__ctl" + htmlencode((document.all.dg1.rows.length).toString()) + "_txDesc";
	//1120831	Joe		1120709		弱掃修正XSS
	// spanDesc.value = argObj.Desc;
	spanDesc.value = htmlencode(argObj.Desc);
	spanDesc.style.height = "inherit";
	spanDesc.style.width = "95%";
	spanDesc.setAttribute("onblur", "javascript:SetDescInfo()");
	cRemarkinfo.appendChild(spanDesc);
	//備註-e
	//-按鈕-S
	var cCopyinfo = document.createElement("TD");
	cCopyinfo.setAttribute("align", "middle");
	cCopyinfo.setAttribute("nowrap", "nowrap");
	cCopyinfo.style.width = "3em";
	cCopyinfo.innerHTML = "<input type=\"submit\" value=\"複製\" onclick=\"javascript:CopyRow() \" language=\"javascript\" id=\"dg1__ctl" + htmlencode((document.all.dg1.rows.length).toString()) + "_btCopy\">";
	var spanCopyinfo = document.createElement("SPAN");
	spanCopyinfo.className = "InputFieldLabel";
	cCopyinfo.appendChild(spanCopyinfo);
	//-按鈕-E
	row.appendChild(colSeq);//序
	row.appendChild(cselect);//選
	row.appendChild(colDoc);//文號
	row.appendChild(cFromSubject);//案由
	row.appendChild(cFileNo);//檔號
	row.appendChild(cKeepYearinfo);//保存年限
	row.appendChild(cRemarkinfo);//內容摘要
	row.appendChild(cCopyinfo);//複製鈕
	if (argRow != undefined)
	{
		document.all.dg1.children[0].children[argRow].after(row);
	}
	else
		document.all.dg1.children[0].appendChild(row);
	
}
function htmlencode(s) {
	var div = document.createElement('div');
	div.appendChild(document.createTextNode(s));
	return div.innerHTML;
}
function SetFromInfo() {
	Page_BlockSubmit = true;
	var xObjectName = event.target.id;
	var btSubjectIndex = xObjectName.substring(8, xObjectName.indexOf("_txSubject"));
	EAR227_DocList.Info[btSubjectIndex - 1].Subject = document.all[xObjectName].value;
}
function SetDescInfo() {
	Page_BlockSubmit = true;
	var xObjectName = event.target.id;
	var bttxDescIndex = xObjectName.substring(8, xObjectName.indexOf("_txDesc"));
	EAR227_DocList.Info[bttxDescIndex - 1].Desc = document.all[xObjectName].value;
}
function SetPrint() {
	Page_BlockSubmit = true;
	var xObjectName = event.target.id;
	var cSelectIndex = xObjectName.substring(8, xObjectName.indexOf("_cbSelect"));
	if (document.all[xObjectName].checked)
		EAR227_DocList.Info[cSelectIndex - 1].Print = "1";
	else
		EAR227_DocList.Info[cSelectIndex - 1].Print = "0";
}
//複製功能鈕
function CopyRow() {
	Page_BlockSubmit = true;
	var xObjectName = event.target.id;

	var btCopyIndex = xObjectName.substring(8, xObjectName.indexOf("_btCopy"));

	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl" + btCopyIndex + "_btCopy"] != null) {
		//取得被複製的row-加入物件
		var CopyObj = new Object();
		CopyObj.Print = EAR227_DocList.Info[btCopyIndex - 1].Print;
		CopyObj.Doc_No = EAR227_DocList.Info[btCopyIndex - 1].Doc_No;
		CopyObj.File_NO = EAR227_DocList.Info[btCopyIndex - 1].File_NO;
		CopyObj.Keep_Year = EAR227_DocList.Info[btCopyIndex - 1].Keep_Year;
		CopyObj.Subject = EAR227_DocList.Info[btCopyIndex - 1].Subject;
		CopyObj.Desc = EAR227_DocList.Info[btCopyIndex - 1].Desc;
		//取得被複製的row-加入物件
		AddCopyNewRow(btCopyIndex, CopyObj);
		//重建畫面
		fnbulideDG();
	}

}
function AddCopyNewRow(argTargetRow,argCopyObj) {

	var TempEAR227_DocList = new Object();
	TempEAR227_DocList.Info = new Array();
	var NewRowCount = EAR227_DocList.Info.length+1;

	for (i = 0; i < NewRowCount; i++) {

		if (i < argTargetRow) {
			TempEAR227_DocList.Info[i] = EAR227_DocList.Info[i]; /*迴圈變數i小於插入值位置Index時,每一個元素所放的位置不變*/
		}
		else if (i == argTargetRow) {
			TempEAR227_DocList.Info[i] = argCopyObj; //i等於Index時,將插入值賦給陣列b
		}
		else {
			TempEAR227_DocList.Info[i] = EAR227_DocList.Info[i - 1]; /*因為插入了一個新的元素,所以插入位置後的每一個元素所存放的位置都要向後移一位*/
		}

	}
	EAR227_DocList = TempEAR227_DocList;
}
//function DeleteRow(argTargetRow) {
//刪除功能鈕
function DeleteRow() {
	var TempEAR227_DocList = new Object();
	TempEAR227_DocList.Info = new Array();
	/*var NewRowCount = EAR227_DocList.Info.length - 1;

	for (i = 0; i < NewRowCount; i++) {

		if (i < argTargetRow) {
			TempEAR227_DocList.Info[i] = EAR227_DocList.Info[i];
		}
		else {
			TempEAR227_DocList.Info[i] = EAR227_DocList.Info[i + 1];
		}
	}*/
	var TempObjInx = 0;
	for (i = 0; i < EAR227_DocList.Info.length; i++) {
		if (EAR227_DocList.Info[i] != undefined) {
			TempEAR227_DocList.Info[TempObjInx] = EAR227_DocList.Info[i];
			TempObjInx++;
		}
	}
	EAR227_DocList = TempEAR227_DocList;
}
function fnEnableStart() {
	if (document.all["rbDisc"].checked)
		document.all["txStart"].disabled = true;
	else
		document.all["txStart"].disabled = false;
}


