/*
DATE 	SA		PRG		MGR_NO	DESC
1070912  Kevin 	Joe		1061336	新增程式
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

function ShowMsg() {
    jf_ShowValidator();
}

function ClientButtonControl(e)
{
	var xObjectName = e.target.id;

	if (IsServerHandling)
		return;

	if (jf_IsTimeOut()) {
		Page_BlockSubmit = true;
		return;
	}

	switch (xObjectName) {
	}
}

function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	if (IsServerHandling)
		return;

	if (jf_IsTimeOut()) {
		Page_BlockSubmit = true;
		return;
	}

	xObjectName = event.target.id;

	switch (xObjectName) {
		case "btStatic":  //執行統計
			var xUrl = "../../../ODDEP/ODP420.aspx?nMode=EXEC&SAMLart=" + document.all.H_Artifact.value;
			jf_OpenChildWin(xUrl, "ODP420", 760, 500);
			Page_BlockSubmit = true;
			break;
		case "btPrint":
		case "btPreview":
		case "btExcel":
			Page_BlockSubmit = !CheckBeforePrint();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId) {
	if (argCallerId == "ODP420") {
		if (document.all["lbReturnValue"].length == 1) {
			var strMaxUseDate = document.all["lbReturnValue"].options[0].value;
			if (strMaxUseDate == "")
				document.all["lbMaxYear"].textContent = "您尚未執行過統計作業";
			else
				document.all["lbMaxYear"].textContent = "目前統計最大年月：" +
													strMaxUseDate.substr(0, 3) + "年" +
													strMaxUseDate.substr(3, 2) + "月";
			document.all["h_txYM"].textContent = strMaxUseDate;
		}
	}
}

function ClientOnLoad() {
	ShowMsg();
}


function CheckBeforePrint() {
	var bRtn = true;
	var strSMon = jf_Trim(document.all["txSMon"].value);
	var strEMon = jf_Trim(document.all["txEMon"].value);
	if (strSMon + strEMon == "") {
		bRtn = false;
		$('#txSMon').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["列印月份不可皆為空白"])), "");
	}
	if (bRtn == true)
		bRtn = ConfirmData();
	return bRtn;
}

//###########################################################################################
//				其		他		共		用		function
//###########################################################################################
//日期onblur
function CheckDATE(argObj, strMsg) {
	var strDate = document.all[argObj].value;
	if (strDate != "") {
		if (strDate.length < 5) {
			strDate = jf_PADL(strDate, 5, '0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate + "01")) {
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
			$('#' + argObj).focus();
		}
	}
}
function ConfirmData() {
	if (document.all.h_txYM.value == "") {
		return false;
	}
	var bRtnbool = true;
	var year1 = parseInt(document.all.txSMon.value.substr(0, 3));
	if (year1 == 0)
		year1 = parseInt(document.all.txSMon.value.substr(1, 2));
	var month1 = parseInt(document.all.txSMon.value.substr(3, 2));
	if (month1 == 0)
		month1 = parseInt(document.all.txSMon.value.substr(4, 1));

	var year2 = parseInt(document.all.h_txYM.value.substr(0, 3));
	if (year2 == 0)
		year2 = parseInt(document.all.h_txYM.value.substr(1, 2));
	var month2 = parseInt(document.all.h_txYM.value.substr(3, 2));
	if (month2 == 0)
		month2 = parseInt(document.all.h_txYM.value.substr(4, 1));
	if (year1 > year2 || (year1 == year2 && month1 > month2)) {
		strErrMsg = "列印月份不可大於目前統計最大月份\n";
		$('#txSMon').focus();
		bRtnbool = false;
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
	}

	year1 = parseInt(document.all.txEMon.value.substr(0, 3));
	if (year1 == 0)
		year1 = parseInt(document.all.txEMon.value.substr(1, 2));
	month1 = parseInt(document.all.txEMon.value.substr(3, 2));
	if (month1 == 0)
		month1 = parseInt(document.all.txEMon.value.substr(4, 1));

	if (year1 > year2 || (year1 == year2 && month1 > month2)) {
		strErrMsg = "列印月份不可大於目前統計最大月份\n";
		$('#txEMon').focus();
		bRtnbool = false;
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
	}
	return bRtnbool;
}
