/*
DATE 	SA		PRG		MGR_NO	DESC
1140512 Joe     Joe     1131299 新增程式
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

function ClientButtonControl(e) {

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
	
	if(IsServerHandling)
	   return;
	
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
		case "btWORD":
			Page_BlockSubmit = !CheckBeforePrint();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CallBack(argCallerId)
{
}

function ClientOnLoad()
{
	fnRpyTypeclick();
}

function CheckBeforePrint()
{
	var bRtn = true;
	if (jf_Trim(document.all["txYearmonth"].value) == "")
	{
		bRtn = false;
		alert("列印月份不可為空白");
		$('#txYearmonth').focus();
	}

	if (bRtn && document.all.h_txYM.value != "" )
	{
		if (document.all["txYearmonth"].value > document.all.h_txYM.value)
		{
			bRtn = false;
			alert("列印月份不可大於目前統計最大月份");
			$('#txYearmonth').focus();
		}
	}

	return bRtn;
}

//###########################################################################################
//				其		他		共		用		function
//###########################################################################################
//日期onblur
function CheckCDATE(argObj,strMsg)
{
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 5)
		{
			strDate = jf_PADL(strDate,5,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate + "01"))
		{
		    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
		    $('#' + argObj).focus();
		}
	}
}

function fnRpyTypeclick() {
	if ($('#rbEIssueDetail').is(':checked'))
	{
		$('#Label4').show();
		$('#dlEIssueDetail').show();
	}
	else
	{
		$('#Label4').hide();
		$('#dlEIssueDetail').hide();
	}
}