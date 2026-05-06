/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* 程式修改歷程 
* -------------------------------------------------------------------------------------------------
* 日期			修改人	單號	概要
* -------------------------------------------------------------------------------------------------
* 1140414		Cloud	1140074	新增本作業
* 1140903		Daniel  1141137	(外貿)修改案次號欄位與呈現畫面以符合外貿協會現行檔號邏輯
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
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad() {
	//1140904  Daniel  1141137		(外貿)外貿目次號改為四碼並修改案次號提示欄位的長度
	if (document.all['OrgNickName'].value == 'TAITRA') {
		dCaseSize.style.width = "11.25em";
	}
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
		case "btHelpS":
			strClickBtn = "btHelpS";
			var strUrl = "";
			strUrl = "../EA01/EAC005.aspx?nFrom=EAT361&MODE=1&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txFileYearS.value) + "&FILE_CLS=" + jf_Trim(document.all.txClsNoS.value) + "&SAMLart=" + document.all.SsoArtifact.value;
			jf_OpenChildWin(strUrl, "EAC005", 750, 550);
			Page_BlockSubmit = true;
			break;
		case "btHelpS2":
			strClickBtn = "btHelpS2";
			var strUrl = "";
			strUrl = "../EA01/EAC005.aspx?nFrom=EAT361&MODE=2&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txFileYearS.value) + "&FILE_CLS=" + jf_Trim(document.all.txClsNoS.value) + "&FILE_CASE=" + jf_Trim(document.all.txCaseNoS.value) + "&SAMLart=" + document.all.SsoArtifact.value;
			jf_OpenChildWin(strUrl, "EAC005", 750, 550);
			Page_BlockSubmit = true;
			break;
		case "btHelpE":
			strClickBtn = "btHelpE";
			var strUrl = "";
			strUrl = "../EA01/EAC005.aspx?nFrom=EAT361&MODE=1&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txFileYearE.value) + "&FILE_CLS=" + jf_Trim(document.all.txClsNoE.value) + "&SAMLart=" + document.all.SsoArtifact.value;
			jf_OpenChildWin(strUrl, "EAC005", 750, 550);
			Page_BlockSubmit = true;
			break;
		case "btHelpE2":
			strClickBtn = "btHelpE2";
			var strUrl = "";
			strUrl = "../EA01/EAC005.aspx?nFrom=EAT361&MODE=2&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txFileYearE.value) + "&FILE_CLS=" + jf_Trim(document.all.txClsNoE.value) + "&FILE_CASE=" + jf_Trim(document.all.txCaseNoE.value) + "&SAMLart=" + document.all.SsoArtifact.value;
			jf_OpenChildWin(strUrl, "EAC005", 750, 550);
			Page_BlockSubmit = true;
			break;
		//1140909		Daniel  1141137(外貿)增加國別、細目別查詢子視窗
		case "btHelpCountry":
			var strUrl = "";
			ActiveBtn = "btHelpCountry";
			strUrl = "../EA01/EAI014.aspx";
			jf_OpenChildWin(strUrl, "EAI014", 800, 600);
			Page_BlockSubmit = true;
			break;
		case "btHelpProduct":
			var strUrl = "";
			ActiveBtn = "btHelpProduct";
			strUrl = "../EA01/EAI015.aspx";
			jf_OpenChildWin(strUrl, "EAI015", 800, 600);
			Page_BlockSubmit = true;
			break;
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

		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			$('#txFileDateS').focus();
			//清除後預設勾選之值			
			document.all["rb1"].checked = true;
			break;
		case "btPreview":
		case "btODS":
		case "btExcel":
			var bRtn = true;
			//檢核空白
			if (document.all.txFileDateS.value == "" && document.all.txFileDateE.value == "" && document.all.txinpFileDateS.value == "" && document.all.txinpFileDateE.value == "") {
				bRtn = false;
				alert("點收日期與編目日期不可皆為空");
				
			}
			//先檢核格式
			if (!CheckDate("txFileDateS", "點收日期(起)")) {
				bRtn = false;
				$('#txFileDateS').focus();
				
			}
			if (!CheckDate("txFileDateE", "點收日期(迄)")) {
				bRtn = false;
				$('#txFileDateE').focus();
				
			}
			if (!CheckDate("txinpFileDateS", "編目日期(起)")) {
				bRtn = false;
				$('#txinpFileDateS').focus();
				
			}
			if (!CheckDate("txinpFileDateE", "編目日期(迄)")) {
				bRtn = false;
				$('#txinpFileDateE').focus();
			}
			//做大小交換-併檢核一年

			if (!ChangeDate("txFileDateS", "txFileDateE", "點收日期")) {
				bRtn = false;
				$('#txFileDateS').focus();
			}
			if (!ChangeDate("txinpFileDateS", "txinpFileDateE", "編目日期")) {
				bRtn = false;
				$('#txinpFileDateS').focus();
			}
			if (bRtn) {
				Page_BlockSubmit = false;
				jf_ToolBarSubmit(xObjectName);
			}
			else
				Page_BlockSubmit = true;
			break;
	}
}



/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult) {
	//webserver回傳後動作
	if (argResult.id == wsDuplicateID) {
		if (jf_IsWebServiceSuccess(argResult)) {
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
		}
		else {
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
function CallBack(argCallerId) {
	if (argCallerId == "EAC005") {
		if (document.all.lbReturnValue.length > 0) {
			if (strClickBtn == "btHelpS") {
				document.all.txClsNoS.value = document.all.lbReturnValue.options[1].value;
				document.all.txClsKeyS.value = document.all.lbReturnValue.options[4].value;

			}
			else if (strClickBtn == "btHelpS2") {
				document.all.txFileYearS.value = document.all.lbReturnValue.options[0].value;
				document.all.txClsNoS.value = document.all.lbReturnValue.options[1].value;
				document.all.txClsKeyS.value = document.all.lbReturnValue.options[4].value;
				document.all.txCaseNoS.value = document.all.lbReturnValue.options[2].value;

			}
			else if (strClickBtn == "btHelpE") {
				document.all.txClsNoE.value = document.all.lbReturnValue.options[1].value;
				document.all.txClsKeyE.value = document.all.lbReturnValue.options[4].value;

			}
			else if (strClickBtn == "btHelpE2") {
				document.all.txFileYearE.value = document.all.lbReturnValue.options[0].value;
				document.all.txClsNoE.value = document.all.lbReturnValue.options[1].value;
				document.all.txClsKeyE.value = document.all.lbReturnValue.options[4].value;
				document.all.txCaseNoE.value = document.all.lbReturnValue.options[2].value;
			}
		}
	}
	//1140909		Daniel  1141137(外貿)增加國別、細目別查詢子視窗
	if (argCallerId == "EAI014") {
		if (ActiveBtn == "btHelpCountry") {
			if (document.all["lbReturnValue"].length > 0) {
				document.all["txCountryNo"].value = document.all["lbReturnValue"].options[0].value;
			}
		}
	}
	if (argCallerId == "EAI015") {
		if (ActiveBtn == "btHelpProduct") {
			if (document.all["lbReturnValue"].length > 0) {
				document.all["txProductNo"].value = document.all["lbReturnValue"].options[0].value;
			}
		}
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
//檢核日期格式


var bHasCheck = false;
function CheckDate(argObj, strMsg) {
	if (bHasCheck) {
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
	var strDate = document.all[argObj].value;
	if (strDate != "") {
		if (strDate.length < 7) {
			strDate = jf_PADL(strDate, 7, '0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate)) {
			$('#' + argObj).focus();
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}
function ChangeDate(argOobjs, argOobje,argMsg) {

	var strDateS = jf_Trim(document.all[argOobjs].value);//
	var strDateE = jf_Trim(document.all[argOobje].value);//
	if (strDateS == "" && strDateE != "") {
		document.all[argOobjs].value = strDateE;
	}
	if (strDateS != "" && strDateE == "") {
		document.all[argOobje].value = strDateS;
	}
	if (strDateS != "" && strDateE != "" && strDateS > strDateE) {
		document.all[argOobje].value = strDateS;
		document.all[argOobjs].value = strDateE;
	}
	const startYear = parseInt(document.all[argOobjs].value.substr(0, 3), 10) + 1911;
	const startMonth = parseInt(document.all[argOobjs].value.substr(3, 2), 10);
	const startDay = parseInt(document.all[argOobjs].value.substr(5, 2), 10);

	const endYear = parseInt(document.all[argOobje].value.substr(0, 3), 10) + 1911;
	const endMonth = parseInt(document.all[argOobje].value.substr(3, 2), 10);
	const endDay = parseInt(document.all[argOobje].value.substr(5, 2), 10);

	const startDate = new Date(startYear, startMonth, startDay);
	const endDate = new Date(endYear, endMonth, endDay);

	const maxEndDate = new Date(startDate);
	maxEndDate.setFullYear(maxEndDate.getFullYear() + 1);

	if (endDate > maxEndDate) {
		alert(argMsg + "區間不可超過1年！");
		return false;
	}
	else
		return true;
}

function PADZERO(argid, num) {
	var obj = document.all[argid];
	if (typeof argid == "object")
		obj = argid;
	if (obj.value != "") {
		obj.value = jf_PADL(obj.value, num, "0");
	}
}
//1140903  Daniel  1141137	(外貿)以國別、處別、細目號/產品別欄位取代案次號
function TbOnBlur(argTextBox) {
	if (argTextBox == "txCountryNo" || argTextBox == "txDivisionNo" || argTextBox == "txProductNo") {
		var strTarget = document.all[argTextBox].value;
		if (strTarget != "") {
			if (strTarget.length < 3) {
				if (argTextBox == "txDivisionNo")
					strTarget = jf_PADL(strTarget, 3, '0');
				else
					strTarget = jf_PADR(strTarget, 3, '0');
				document.all[argTextBox].value = strTarget;
			}
		}
	}
}