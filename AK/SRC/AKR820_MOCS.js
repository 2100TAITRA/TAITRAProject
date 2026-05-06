/*
DATE    SA		PRG		MGR_NO		DESC
1111117 Cloud   Zen     1110861     新增AKR820_MOCS 銓敘部催卷單列印作業
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;
jf_ShowValidator();

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{

}

function ClientButtonControl(e)
{
	var xObjectName = e.target.id;

	if (IsServerHandling)
		return;

	if (jf_IsTimeOut())
	{
		Page_BlockSubmit = true;
		return;
	}

	switch (xObjectName)
	{

	}
}

function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	if (IsServerHandling)
		return;

	if (jf_IsTimeOut())
	{
		Page_BlockSubmit = true;
		return;
	}

	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btPreview":
			Page_BlockSubmit = !CheckBeforeSearch();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{

}

function ReturnValue()
{

}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforeSearch()
{
	var strErrMsg = '';

	var strEntryDateS = $('#txEntryDateS').val();
	var strEntryDateE = $('#txEntryDateE').val();

	if (strEntryDateS + strEntryDateE == '')
		strErrMsg += '調案日期不可為空。\n';

	if (strEntryDateS == '' && strEntryDateE != '')
		$('#txEntryDateS').val(strEntryDateE);
	else if (strEntryDateS != '' && strEntryDateE == '')
		$('#txEntryDateE').val(strEntryDateS);
	else if (Number(strEntryDateS) > (Number(strEntryDateE))) 
	{
		$('#txEntryDateS').val(strEntryDateE);
		$('#txEntryDateE').val(strEntryDateS);
	}

	strErrMsg += CheckDate('txEntryDateS', '調案日期(起)', true, 7);
	strErrMsg += CheckDate('txEntryDateE', '調案日期(訖)', true, 7);

	if (strErrMsg != '')
	{
		alert(strErrMsg);
		return false;
	}

	return true;
}

function CheckDate(argObj, argMsg, argFromTbtool, argLength) 
{
	var strErrMsg = '';
	var strDate = $('#' + argObj).val();
	if (strDate != '')
	{
		if (strDate.length < argLength) 
		{
			strDate = jf_PADL(strDate, argLength, '0');//YYYMMDD
			$('#' + argObj).val(strDate);
		}

		if (!jf_CheckCDATE(strDate)) 
		{
			strErrMsg += FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argMsg])) + '\n';
			if (argFromTbtool == false)
				jf_ShowMsg(strErrMsg, '');
		}
	}
	return strErrMsg;
}

if (strDate.length < 7)
{
	strDate = jf_PADL(strDate, 7, '0');
	document.all[argObj].value = strDate;
}