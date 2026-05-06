/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1100321   Joe   	  1101571     新增程式
 * 1110511	 Joe	  --		  修正檢核欄位名稱錯誤的問題
 * 1110817	 Joe	  1110640	  新增匯出Excel、ODS功能
 */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

var wsDuplicateID;

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
	    case "btPreview":
		//1110817	Joe		1110640		新增匯出Excel、ODS功能
	    case "btExcel":
	    case "btODS":
			Page_BlockSubmit = !CheckBeforSearch();
			jf_ToolBarSubmit(xObjectName);
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
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/


function CheckDate(argName, argShow)
{
	var strDateValue = document.all[argName].value;
	if (strDateValue == "")
		return;
	
	strDateValue = jf_PADL(strDateValue,7,"0");
	document.all[argName].value = strDateValue;
	
	if (!jf_CheckCDATE(strDateValue))
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argShow])),"");
		$('#' + argName).focus();
	}
}


function CheckBeforSearch()
{
	var ErrMsg = "";
	if (document.all.txDateS.value + document.all.txDateE.value + document.all.txDocNoS.value + document.all.txDocNoE.value == "") {
		ErrMsg += "\n" + '發文日期及公文文號不可皆為空白。';
	}
	if (document.all.cbSendWait.checked == false && document.all.cbSendFailed.checked == false && document.all.cbSendSuccess.checked == false) {
		ErrMsg += "\n" + '電子郵件寄送狀態至少需選取一項。';
	}
	//1110511	Joe		--		修正檢核欄位名稱錯誤的問題
	// else if (document.all.cbSendWait.checked == false && document.all.ddlSignType.selectedOptions[0].value == "個人專區") {
	else if (document.all.cbSendWait.checked == true  && document.all.cbSendFailed.checked == false && document.all.cbSendSuccess.checked == false && document.all.ddlIssueType.selectedOptions[0].value == "Personal") {
		ErrMsg += "\n" + '個人專區發文無待寄送狀態，請重新選取查詢條件。';
	}
	if (ErrMsg != "") {
		alert(ErrMsg)
		return false;
    }

	if (document.all.txDateS.value != "" && document.all.txDateE.value == "")
		document.all.txDateE.value = document.all.txDateS.value;
	else if (document.all.txDateE.value != "" && document.all.txDateS.value == "")
		document.all.txDateS.value = document.all.txDateE.value;
	if (document.all.txDateS.value != "" && document.all.txDateE.value != "" && document.all.txDateS.value > document.all.txDateE.value) {
		var Temp = document.all.txDateS.value;
		document.all.txDateS.value = document.all.txDateE.value;
		document.all.txDateE.value = Temp;
	}

	if (document.all.txDocNoS.value != "" && document.all.txDocNoE.value == "")
		document.all.txDocNoE.value = document.all.txDocNoS.value;
	else if (document.all.txDocNoE.value != "" && document.all.txDocNoS.value == "")
		document.all.txDocNoS.value = document.all.txDocNoE.value;
	if (document.all.txDocNoS.value != "" && document.all.txDocNoE.value != "" && document.all.txDocNoS.value > document.all.txDocNoE.value) {
		var Temp = document.all.txDocNoS.value;
		document.all.txDocNoS.value = document.all.txDocNoE.value;
		document.all.txDocNoE.value = Temp;
	}
	return true;
}
