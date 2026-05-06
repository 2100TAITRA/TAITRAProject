/*
 * DATE      PRG		MGR_NO		DESC
 * 1111206   Joe		1110828     新增程式
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
			Page_BlockSubmit = !CheckBeforePreview();
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
    if (argResult.id == iCallID_CheckOrgNo)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			if(argResult.value.Count > 0)
			{
				document.all.txOrgno.value = jf_Trim(argResult.value.OrgID[0]);
				document.all.txOrgName.value = jf_Trim(argResult.value.OrgName[0]);
			}
			else
				document.all.txOrgName.value = "";
			
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
function CheckBeforePreview() {
	if (document.all.txPostDateS.value + document.all.txPostDateE.value == "") {
		alert("郵寄日期不可為空白,請重新輸入");
		return false;
	}

	if (document.all.txPostDateS.value == "")
		document.all.txPostDateS.value = document.all.txPostDateE.value;
	else if (document.all.txPostDateE.value == "")
		document.all.txPostDateE.value = document.all.txPostDateS.value;
	else if (document.all.txPostDateS.value > document.all.txPostDateE.value) {
		var strTemp = document.all.txPostDateE.value;
		document.all.txPostDateE.value = document.all.txPostDateS.value;
		document.all.txPostDateS.value = strTemp;
	}

	return true;
}

function CheckDateS()
{
	var strDateValue ;
	strDateValue = document.all.txPostDateS.value;
	if (strDateValue == "")
	{  
		return;
	}
	
	strDateValue  = jf_PADL(strDateValue,7,"0");
	document.all.txPostDateS.value = strDateValue;
	if (!jf_CheckCDATE(strDateValue))
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["郵寄日期(起)"])),"");
		$('#txPostDateS').focus();
	}
}

function CheckDateE()
{
	var strDateValue ;
	strDateValue = document.all.txPostDateE.value;
	if (strDateValue == "")
	{  
		return;
	}
	
	strDateValue  = jf_PADL(strDateValue,7,"0");
	document.all.txPostDateE.value = strDateValue;
	if (!jf_CheckCDATE(strDateValue))
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array(["郵寄日期(訖)"])),"");
		document.all.txPostDateE.focus();
		$('#txPostDateE').focus();
	}
}
