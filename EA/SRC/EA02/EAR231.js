/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * -------------------------------------------------------------------------------------------------
 * 日期		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 *1140606	Joeko	1131321	新增歸檔案件數量統計表列印作業
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;



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
function ClientButtonControl()
{
	var xObjectName = document.activeElement.id;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit = true;
		return;
	}
	
	switch (xObjectName)
	{
		/*
		case "":
			break;
		*/
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
		Page_BlockSubmit = true;
		return;
	}
	
	xObjectName = event.target.id
	
	switch (xObjectName) {
		case "btPrint":
		case "btPreview":
		case "btExcel":
		case "btODS":
			if (!CheckBeforePreviewOrExport()) {
				Page_BlockSubmit = true;
				return;
			}
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

}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforePreviewOrExport() {
	var start = document.all.txInpFileDateStart.value.trim();
	var end = document.all.txInpFileDateEnd.value.trim();

	// 起訖皆空白
	if (start === "" && end === "") {
		alert("編目日期起訖不可為空白。");
		$('#txInpFileDateStart').focus();
		return false;
	}

	// 區間超過一年
	if (start !== "" && end !== "") {
		const startDate = parseRocDate(start);
		const endDate = parseRocDate(end);
		const diffDays = Math.abs((endDate - startDate) / (1000 * 60 * 60 * 24));

		if (diffDays > 366) {
			alert("編目日期區間不可超過1年。");
			$('#txInpFileDateEnd').focus();
			return false;
		}
	}
	if (start !== "" && end === "")
		document.all["txInpFileDateEnd"].value = start;
	else if (start === "" && end !== "")
		document.all["txInpFileDateStart"].value = end;
	else if (start > end) {
		document.all["txInpFileDateStart"].value = end;
		document.all["txInpFileDateEnd"].value = start;
	}
	return true;
}

// 民國年月日字串轉 Date
function parseRocDate(rocStr) {
	var rocYear = parseInt(rocStr.substring(0, 3), 10) + 1911;
	var month = parseInt(rocStr.substring(3, 5), 10);
	var day = parseInt(rocStr.substring(5, 7), 10);
	return new Date(rocYear, month - 1, day);
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