/*
DATE	SA		PRG		MGR_NO			DESC
1140521 Joe     Levi    1140086         新增程式
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
	switchRptSelected()
}

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
		case "btExcel":
		case "btODS":
			Page_BlockSubmit = !CheckBeforeSearch();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CheckBeforeSearch() {
	var ReturnValue = true;
	if (document.all.txYearmonthS.value == "" && document.all.txYearmonthE.value == "") {
		alert('列印月份不可為空白。');
		ReturnValue = false;
	}

	if (document.all.txYearmonthS.value == "" && document.all.txYearmonthE.value != "")
		document.all.txYearmonthS.value = document.all.txYearmonthE.value;
	else if (document.all.txYearmonthS.value != "" && document.all.txYearmonthE.value == "")
		document.all.txYearmonthE.value = document.all.txYearmonthS.value;
	else if (document.all.txYearmonthS.value > document.all.txYearmonthE.value) {
		var tmp = document.all.txYearmonthS.value;
		document.all.txYearmonthS.value = document.all.txYearmonthE.value;
		document.all.txYearmonthE.value = tmp;
	}

	if ($('#txYearmonthS').val() > $('#h_MaxYearMonth').val()) {
		$('#txYearmonthS').focus();
		alert("列印月份不可大於最大統計月份");
		ReturnValue = false;
	}

	if ($('#txYearmonthS').val().substring(0, 3) != $('#txYearmonthE').val().substring(0, 3)) {
		alert('年度統計表不可跨年度查詢。');
		ReturnValue = false;
	}

	return ReturnValue;
}
var bHasCheck = false;
function CheckDATE(argObj, strMsg) {
	if (bHasCheck) {
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
	var strDate = document.all[argObj].value;
	if (strDate != "") {
		if (strDate.length < 5) {
			strDate = jf_PADL(strDate, 5, '0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate + '01')) {

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
			//document.all["txKeyField"].value = jf_Trim(argResult.value.RtnStr);
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


function switchRptSelected() {

	if ($('#rbRptL3').is(':checked')) {
		$('#txYMSeparator').show();
		$('#txYearmonthE').show();
	} else {
		$('#txYMSeparator').hide();
		$('#txYearmonthE').hide();
		$('#txYearmonthE').val($('#txYearmonthS').val());
	}
}
