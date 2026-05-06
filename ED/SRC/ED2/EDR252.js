/*
DATE	SA		PRG		MGR_NO			DESC
1141023	David	Andy	1140826			新增已歸檔未成批公文查詢作業
*/
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
		case "btPreview":
			if (jf_CheckBeforSearch())
			{
				IsServerHandling = true;
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function jf_CheckBeforSearch()
{
	var bRtnbool = true;
	var strErrMsg = "";

	if (document.all.txExecDateS.value == '' && document.all.txExecDateE.value == '')
		strErrMsg += "歸檔日期不可皆為空。";

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	else
	{
		if (document.all.txExecDateS.value != "" && document.all.txExecDateE.value == "")
			document.all.txExecDateE.value = document.all.txExecDateS.value;
		else if (document.all.txExecDateE.value != "" && document.all.txExecDateS.value == "")
			document.all.txExecDateS.value = document.all.txExecDateE.value;
		else if (document.all.txExecDateS.value != "" && document.all.txExecDateE.value != "" && document.all.txExecDateS.value > document.all.txExecDateE.value) {
			var temp = document.all.txExecDateS.value;
			document.all.txExecDateS.value = document.all.txExecDateE.value;
			document.all.txExecDateE.value = temp;
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
{}

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
			document.all[argObj].focus();
		}
	}
}