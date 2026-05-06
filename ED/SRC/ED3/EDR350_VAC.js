/*
 * DATE      SA		PRG		MGR_NO		DESC
 * 1140416	 David	Joe		1140138		新增程式
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
var strTableFields = new Array("_hlLink","_lbRead1","_lbRead2");
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
	
	if(!jf_ConfireSearch())
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
			Page_BlockSubmit = !jf_ConfirmPreview();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_ConfireSearch()
{
	if(document.all["txReturnDateS"].value =="" && document.all["txReturnDateE"].value =="")
	{	
		alert("退文日期不可為空");
		return false;
	}
	
	if (!CheckDate("txReturnDateS","退文日期(起)"))
		return false
	if (!CheckDate("txReturnDateE","退文日期(迄)"))
		return false


	if (document.all.txReturnDateS.value != "" && document.all.txReturnDateE.value == "")
		document.all.txReturnDateE.value = document.all.txReturnDateS.value;
	else if (document.all.txReturnDateE.value != "" && document.all.txReturnDateS.value == "")
		document.all.txReturnDateS.value = document.all.txReturnDateE.value;
	if (document.all.txReturnDateS.value != "" && document.all.txReturnDateE.value != "" && document.all.txReturnDateS.value > document.all.txReturnDateE.value) {
		var Temp = document.all.txReturnDateS.value;
		document.all.txReturnDateS.value = document.all.txReturnDateE.value;
		document.all.txReturnDateE.value = Temp;
	}
		
	return true;
}

function CheckDate(argObj,strMsg)
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
			if (strMsg)
			    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
			$('#' + argObj).focus();
			return false;
		}
	}
	return true;
}
