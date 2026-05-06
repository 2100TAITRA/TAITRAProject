/* DATE		SA		PRG		MGR_NO		DESC
 * 1110317  David   Joe		1101454     新增本程式
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
	cbIssueType_OnClick();
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
		case "btExcel":
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
	if (document.all.txDateS.value + document.all.txDateE.value + document.all.txDocNoS.value + document.all.txDocNoE.value == "") {
		alert('發文日期及公文文號不可皆為空白。');
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

function cbIssueType_OnClick() {
    if (document.all.cbIssueType5.checked && document.all.cbIssueType2.checked && document.all.cbIssueType3.checked && document.all.cbIssueType8.checked && document.all.cbIssueType1.checked && document.all.cbIssueType9.checked && document.all.cbIssueType4.checked) {
        document.all.btPreview.disabled = false;
        document.all.btExcel.disabled = false;
    }
	else if (!document.all.cbIssueType5.checked && !document.all.cbIssueType2.checked && !document.all.cbIssueType3.checked && !document.all.cbIssueType8.checked && !document.all.cbIssueType1.checked && !document.all.cbIssueType9.checked && !document.all.cbIssueType4.checked){
		document.all.btExcel.disabled = true;
	}
    else{
        document.all.btPreview.disabled = true;
        document.all.btExcel.disabled = false;
	}
}