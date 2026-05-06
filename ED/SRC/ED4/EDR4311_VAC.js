/*
DATE 	 SA		 PRG	  MGR_NO	DESC
1140519  Joe	 Joe      1140085   新增程式
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

function ClientButtonControl(e)
{

	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	Page_BlockSubmit=true;
	switch (xObjectName)
	{

	}
}

function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	xObjectName = event.target.id
	
	Page_BlockSubmit=false;

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


function CheckBeforeSearch()
{
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
	
	if($('#txYearmonthS').val() > $('#h_MaxYearMonth').val())
	{
		$('#txYearmonthS').focus();
		alert( "列印月份不可大於最大統計月份");
		ReturnValue = false;
	}

	return ReturnValue;
}
var bHasCheck = false;
function CheckDATE(argObj,strMsg)
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 5)
		{
			strDate = jf_PADL(strDate,5,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate + '01'))
		{

			$('#'+argObj).focus(); 
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}
function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	switchStatMode();
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

function switchStatMode() {
	
	if ($('#rbMonth').is(':checked')) {
		$('#txYMSeparator').show();
		$('#txYearmonthE').show();
	} else {
		$('#txYMSeparator').hide();
		$('#txYearmonthE').hide();
		$('#txYearmonthE').val($('#txYearmonthS').val());
	}
}





