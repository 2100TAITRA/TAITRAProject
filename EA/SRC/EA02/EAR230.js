/*
 * DATE      PRG	  MGR_NO	  DESC
 *1140428	Daniel	 1140145	新增程式
 */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

var wsDuplicateID;
var strClickBtn = "";
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad() {

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
			strUrl = "../EA01/EAC005.aspx?nFrom=EAR230&MODE=1&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txYear.value) + "&FILE_CLS=" + jf_Trim(document.all.txClsNoS.value) + "&SAMLart=" + GetParam("SAMLart");
			jf_OpenChildWin(strUrl, "EAC005", 750, 550);
			Page_BlockSubmit = true;
			break;
		case "btHelpS2":
			strClickBtn = "btHelpS2";
			var strUrl = "";
			strUrl = "../EA01/EAC005.aspx?nFrom=EAR230&MODE=2&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txYear.value) + "&FILE_CLS=" + jf_Trim(document.all.txClsNoS.value) + "&FILE_CASE=" + jf_Trim(document.all.txCaseNoS.value) + "&SAMLart=" + GetParam("SAMLart");
			jf_OpenChildWin(strUrl, "EAC005", 750, 550);
			Page_BlockSubmit = true;
			break;
		case "btHelpE":
			strClickBtn = "btHelpE";
			var strUrl = "";
			strUrl = "../EA01/EAC005.aspx?nFrom=EAR230&MODE=1&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txYear.value) + "&FILE_CLS=" + jf_Trim(document.all.txClsNoE.value) + "&SAMLart=" + GetParam("SAMLart");
			jf_OpenChildWin(strUrl, "EAC005", 750, 550);
			Page_BlockSubmit = true;
			break;
		case "btHelpE2":
			strClickBtn = "btHelpE2";
			var strUrl = "";
			strUrl = "../EA01/EAC005.aspx?nFrom=EAR230&MODE=2&SHOWALL=1&FILE_YEAR=" + jf_Trim(document.all.txYear.value) + "&FILE_CLS=" + jf_Trim(document.all.txClsNoE.value) + "&FILE_CASE=" + jf_Trim(document.all.txCaseNoE.value) + "&SAMLart=" + GetParam("SAMLart");
			jf_OpenChildWin(strUrl, "EAC005", 750, 550);
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
		case "btPreview":
		case "btOds":
		case "btExcel":
			Page_BlockSubmit = !UnEmpty();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}


/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
function OnWSResult(argResult) {
	if (argResult.id == wsCheckClsID) {
		if (jf_IsWebServiceSuccess(argResult)) {
			if (jf_IsWebServiceSuccess(argResult)) {
				if (argResult.value.IS_LOWEST != "" && argResult.value.IS_LOWEST != "1") {
					alert('請輸入最底層分類號。');
					$('#' + strOblurID).focus();
				}
				else if (argResult.value.IS_LOWEST != "" && argResult.value.IS_LOWEST == "1") {
					document.all[strOblurkeyID].value = argResult.value.ClsKey;
					document.all["txVerNo"].value = argResult.value.VerNo;
				}
				else {
					alert('此分類號不存在請重新輸入。');
					$('#' + strOblurID).focus();
				}
			}
		}
	}
	if (argResult.id == wsCheckCaseID) {
		if (argResult.error) {
			alert(argResult.errorDetail.string);
			$('#' + strOblurID).focus();
			return;
		}
		WSResult = argResult.value;
		if (WSResult.m_strErrMsg.length != 0) {
			if (WSResult.m_strErrMsg.substring(0, 5) == "無此案次號") {
				alert("輸入的案次號不存在。");
				$('#' + strOblurID).focus();
			}
			else {
				alert(WSResult.m_strErrMsg);
				$('#' + strOblurID).focus();
			}
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
				document.all.txClsNoS.value = document.all.lbReturnValue.options[1].value;
				document.all.txClsKeyS.value = document.all.lbReturnValue.options[4].value;
				document.all.txCaseNoS.value = document.all.lbReturnValue.options[2].value;

			}
			else if (strClickBtn == "btHelpE") {
				document.all.txClsNoE.value = document.all.lbReturnValue.options[1].value;
				document.all.txClsKeyE.value = document.all.lbReturnValue.options[4].value;

			}
			else if (strClickBtn == "btHelpE2") {
				document.all.txClsNoE.value = document.all.lbReturnValue.options[1].value;
				document.all.txClsKeyE.value = document.all.lbReturnValue.options[4].value;
				document.all.txCaseNoE.value = document.all.lbReturnValue.options[2].value;
			}
		}
	}

	if (document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

var wsCheckClsID;
var strOblurID = "";
var strOblurkeyID = "";
function GetParam(p) {
	var strUrl = document.location.toString();
	strUrl = unescape(strUrl);
	var rg_szItems = strUrl.split("?");
	if (rg_szItems.length == 2) {
		var rg_szItems2 = rg_szItems[1].split("&");
		for (var i = 0; i < rg_szItems2.length; i++) {
			var rg_items = rg_szItems2[i].split("=");
			if (rg_items[0] == "SAMLart")
				return rg_items[1];
		}
	}
}
//檢查編目日期不可皆為空白
function UnEmpty() {
	var strYear = jf_Trim(document.all["txYear"].value);

	if (strYear == "") {
		$('#txYear').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["年度號不可為空白"])), "");
		return false;
	}

	return true;
}
//日期onblur
function CheckCDATE(argObj, strMsg) {
	var strDate = document.all[argObj].value;
	if (strDate != "") {
		if (strDate.length < 3) {
			strDate = jf_PADL(strDate, 3, '0');
			document.all[argObj].value = strDate;
		}
	}
	return true;
}
function CheckVol(argObj, strMsg) {
	var strVol = document.all[argObj].value;
	if (strVol != "") {
		if (strVol.length < 4) {
			strVol = jf_PADL(strVol,4, '0');
			document.all[argObj].value = strVol;
		}
	}
	return true;
}
