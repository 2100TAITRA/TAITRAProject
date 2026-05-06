/*
 * DATE		SA		PRG			MGR_NO		DESC
 * 1131115	David	Joe			1130294		新增程式
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
function ClientOnLoad()
{
	$('#SetupBtn').hide();
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
		case "btStatic":
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			jf_ToolBarSubmit(xObjectName);
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
	}
}


/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function CheckBeforeStatic() {
	if (document.all.txStaticMonth.value== "") {
		alert('統計月份不可為空。');
		return false;
	}
	if (document.all.txStaticMonth.value > document.all.h_maxStaticYM.value)
	{
		alert('統計月份不可超過最大統計年月後一月。');
		return false;
	}
	return true;
}

function CheckBeforePreview() {
	if (document.all.txPreviewMonthS.value == "" && document.all.txPreviewMonthE.value != "")
		document.all.txPreviewMonthS.value = document.all.txPreviewMonthE.value;
	else if (document.all.txPreviewMonthS.value != "" && document.all.txPreviewMonthE.value == "")
		document.all.txPreviewMonthE.value = document.all.txPreviewMonthS.value;
	else if (document.all.txPreviewMonthS.value > document.all.txPreviewMonthE.value) {
		var tmp = document.all.txPreviewMonthS.value;
		document.all.txPreviewMonthS.value = document.all.txPreviewMonthE.value;
		document.all.txPreviewMonthE.value = tmp;
	}

	if (document.all.txPreviewMonthS.value == "") {
		alert('列印月份不可為空。');
		return false;
	}
	if (document.all.txPreviewMonthE.value > document.all.h_maxPreviewYM.value) {
		alert('列印月份不可超過最大統計年月。');
		return false;
	}
	return true;
}

//日期onblur
function CheckDate5(argObj, strMsg) {
	var strDate = document.all[argObj].value;
	if (strDate != "") {
		if (strDate.length < 5) {
			strDate = jf_PADL(strDate, 5, '0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate + '01')) {
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
			$('#' + argObj).focus();
		}
	}
}