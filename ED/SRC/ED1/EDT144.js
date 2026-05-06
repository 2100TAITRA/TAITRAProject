/*
DATE	SA		PRG		MGR_NO      DESC
1140612 David   Zen     1140382     新增EDT144 待登錄管制案件查詢子視窗
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

//指定DataGrid欄位

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

	if (IsServerHandling)
		return;

	//檢查是否TimeOut
	if (jf_IsTimeOut())
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

	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
    }

	//檢查是否TimeOut
	if (jf_IsTimeOut())
	{
		Page_BlockSubmit = true;
		return;
	}
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !CheckBeforeSearch();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
function ReturnValue(argDocNo, argSeqNo)
{

	try
	{
		opener.document.all.lbReturnValue.length = 2;
		opener.document.all.lbReturnValue.options[0].value = argDocNo;
		opener.document.all.lbReturnValue.options[1].value = argSeqNo;
		opener.window.CallBack("EDT144");

		close();
	}
	catch (e) { }

}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
*
*****************************************************************************/
function CheckBeforeSearch()
{
	let strErrMsg = '';

	let strReceiveDateS = $('#txReceiveDateS').val();
	let strReceiveDateE = $('#txReceiveDateE').val();

	if (strReceiveDateS + strReceiveDateE == '')
		strErrMsg += '轉入日期不可為空。\n';

	if (strReceiveDateS == '' && strReceiveDateE != '')
		$('#txReceiveDateS').val(strReceiveDateE);
	else if (strReceiveDateS != '' && strReceiveDateE == '')
		$('#txReceiveDateE').val(strReceiveDateS);
	else if (Number(strReceiveDateS) > (Number(strReceiveDateE))) 
	{
		$('#txReceiveDateS').val(strReceiveDateE);
		$('#txReceiveDateE').val(strReceiveDateS);
	}

	strErrMsg += CheckDate('txReceiveDateS', '轉入日期(起)', true, 7);
	strErrMsg += CheckDate('txReceiveDateE', '轉入日期(訖)', true, 7);

	strErrMsg = strErrMsg.slice(0, -1);

	if (strErrMsg != '')
	{
		alert(strErrMsg);
		return false;
	}

	return true;
}

//2.日期相關檢核
function CheckDate(argObj, argMsg, argFromTbtool, argLength) 
{
	let strErrMsg = '';
	let strDate = $('#' + argObj).val();
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