/*
DATE	SA		PRG		MGR_NO	DESC
1120322 David   Joe     1110883 新增程式
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
	
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btSearch":
		case "btPreview":
			Page_BlockSubmit = !jf_ConfireSearch();
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
	if(document.all["txDocNoS"].value == "" && document.all["txDocNoE"].value == "" && document.all["txIssueDateS"].value == "" && document.all["txIssueDateE"].value == "")
	{	
		alert('公文文號及發文日期不可皆為空白。')
		return false;
	}
	
	if(!CheckDate("txIssueDateS","發文日期(起)"))
		return false
	if(!CheckDate("txIssueDateE","發文日期(迄)"))
		return false
	
	var DocNoS = jf_Trim(document.all["txDocNoS"].value);
	var DocNoE = jf_Trim(document.all["txDocNoE"].value);
	if ( document.all["txDocNoS"].value != "" || document.all["txDocNoE"].value != "" )
	{
		if ( DocNoS != "" && DocNoE == "" )
			document.all["txDocNoE"].value = DocNoS ;
		else if ( DocNoS == "" && DocNoE != "" )
			document.all["txDocNoS"].value = DocNoE ;
		else if ( DocNoS > DocNoE )
		{
			document.all["txDocNoS"].value = DocNoE ;
			document.all["txDocNoE"].value = DocNoS ;
		}	
	}
	
	var IssueDateS = jf_Trim(document.all["txIssueDateS"].value);
	var IssueDateE = jf_Trim(document.all["txIssueDateE"].value);
	if ( document.all["txIssueDateS"].value != "" || document.all["txIssueDateE"].value != "" )
	{
		if ( IssueDateS != "" && IssueDateE == "" )
			document.all["txIssueDateE"].value = IssueDateS ;
		else if ( IssueDateS == "" && IssueDateE != "" )
			document.all["txIssueDateS"].value = IssueDateE ;
		else if ( IssueDateS > IssueDateE )
		{
			document.all["txIssueDateS"].value = IssueDateE ;
			document.all["txIssueDateE"].value = IssueDateS ;
		}	
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
