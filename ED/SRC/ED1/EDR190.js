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
		case "btSearch":
		case "btExcel":
			Page_BlockSubmit = !CheckBeforeSearch();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

//日期onblur
function CheckCDATE(argObj,strMsg)
{
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			$('#' + argObj).focus();
		}
	}
}

function CheckBeforeSearch()
{	
	var ErrMsg = '';
	if (document.all.txRcvDateS.value + document.all.txRcvDateE.value == ""){
		ErrMsg += '收文日期不可為空。';
	}
	if (!document.all.cbConfidenceH.checked && !document.all.cbConfidenceM.checked && !document.all.cbConfidenceL.checked) {
		ErrMsg += (ErrMsg != "" ? '\n' : "") + '至少需勾選一項信心水準。';
	}
	if(ErrMsg != "")
	{
		alert(ErrMsg);
		return false;
	}

	if (document.all.txRcvDateS.value == "" && document.all.txRcvDateE.value != "")
		document.all.txRcvDateS.value = document.all.txRcvDateE.value;
	else if (document.all.txRcvDateS.value != "" && document.all.txRcvDateE.value == "")
		document.all.txRcvDateE.value = document.all.txRcvDateS.value;
	else if (document.all.txRcvDateS.value > document.all.txRcvDateE.value) {
		var tmp = document.all.txRcvDateS.value;
		document.all.txRcvDateS.value = document.all.txRcvDateE.value;
		document.all.txRcvDateE.value = tmp;
	}

	return true;
}
