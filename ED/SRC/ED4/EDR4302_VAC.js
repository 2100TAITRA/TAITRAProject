/*
DATE 	 SA		 PRG	  MGR_NO	DESC
1140610  Joe	 Joe      1140116   新增程式
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
		case "btODS":
		case "btWORD":
			Page_BlockSubmit = !jf_CheckPreview();
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
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_CheckPreview() {
	let strRcvCloseDateS = $('#txRcvDateS').val();
	let strRcvCloseDateE = $('#txRcvDateE').val();

	if (strRcvCloseDateS + strRcvCloseDateE == '') {
		alert('收文日期不可為空。');
		return false;
	}

	if (strRcvCloseDateS == '' && strRcvCloseDateE != '')
		$('#txRcvDateS').val(strRcvCloseDateE);
	else if (strRcvCloseDateS != '' && strRcvCloseDateE == '')
		$('#txRcvDateE').val(strRcvCloseDateS);
	else if (Number(strRcvCloseDateS) > (Number(strRcvCloseDateE))) {
		$('#txRcvDateS').val(strRcvCloseDateE);
		$('#txRcvDateE').val(strRcvCloseDateS);
	}

	if (!ED4.EDR4302_VAC.CheckSearchDays($('#txRcvDateS').val(), $('#txRcvDateE').val()).value)
	{
		alert('查詢範圍最大為90天。');
		return false;
	}

	return true;
}

//檢核日期格式
function CheckDATE(argObj, strMsg) {
	var strDate = document.all[argObj].value;
	if (strDate != "") {
		if (strDate.length < 7) {
			strDate = jf_PADL(strDate, 7, '0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate)) {
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
			$('#' + argObj).focus();
			return false;
		}
	}
	return true;
}
