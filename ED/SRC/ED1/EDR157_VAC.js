/*
DATE	SA		PRG		MGR_NO			DESC
1140603 Zen     Levi    1140096         新增程式
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
			Page_BlockSubmit = !jf_ConfirmSearch();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function jf_ConfirmSearch() {
	var bRtnbool = false;
	if (CheckBeforeSearch())//檢查日期欄位是否為空
	{
		if (CheckCDATE("txRcvDateS", "收文日期(起)"))
		{
			if (CheckCDATE("txRcvDateE", "收文日期(迄)"))
			{
				bRtnbool = true;
			}

		}
	}
	return bRtnbool;
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

function CheckBeforeSearch() {
	//strRcvDateS : 暫存起值
	//strRcvDateE : 暫存迄值
	// txRcvDateS : 物件起值
	// txRcvDateE : 物件迄值

	var strErrMsg = '';
	var strRcvDateS = $('#txRcvDateS').val();
	var strRcvDateE = $('#txRcvDateE').val();

	if (strRcvDateS == '' && strRcvDateE != '')
		$('#txRcvDateS').val(strRcvDateE);
	else if (strRcvDateS != '' && strRcvDateE == '')
		$('#txRcvDateE').val(strRcvDateS);
	else if (Number(strRcvDateS) > (Number(strRcvDateE))) {
		$('#txRcvDateS').val(strRcvDateE);
		$('#txRcvDateE').val(strRcvDateS);
	}

	if (strRcvDateS + strRcvDateE == '')
		strErrMsg += '收文日期不可為空';

	if (strErrMsg != '') {
		alert(strErrMsg);
		return false;
	}

	return true;
}

//日期onblur
function CheckCDATE(argObj, strMsg) {
	var strDate = document.all[argObj].value;
	if (strDate != "") {
		if (strDate.length < 7) {
			strDate = jf_PADL(strDate, 7, '0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate)) {
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
			document.all[argObj].value = "";
			$('#' + argObj).focus();
			return false;
		}
	}
	return true;
}