/*
DATE 	 SA		 PRG	  MGR_NO	DESC
1140728  Joe     Joe      1140119   新增程式
1140814	 Joe	 Joe	  序179		新增統計機關條件
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
	//1140814	Joe		序179		新增統計機關條件
	rbStaticOrgChg();
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
	let strYearmonthS = $('#txYearmonthS').val();
	let strYearmonthE = $('#txYearmonthE').val();

	if (strYearmonthS + strYearmonthE == '') {
		alert('發文日期不可為空。');
		return false;
	}

	if (strYearmonthS == '' && strYearmonthE != '')
		$('#txYearmonthS').val(strYearmonthE);
	else if (strYearmonthS != '' && strYearmonthE == '')
		$('#txYearmonthE').val(strYearmonthS);
	else if (Number(strYearmonthS) > (Number(strYearmonthE))) {
		$('#txYearmonthS').val(strYearmonthE);
		$('#txYearmonthE').val(strYearmonthS);
	}

	if ($('#txYearmonthE').val() > document.all.HMaxYM.value)
	{
		alert("列印月份不可超過最大統計年月。");
		return false;
	}

	return true;
}

//檢核日期格式
function CheckDATE(argObj, strMsg) {
	var strDate = document.all[argObj].value;
	if (strDate != "") {
		if (strDate.length < 5) {
			strDate = jf_PADL(strDate, 5, '0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate + '01')) {
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
			$('#' + argObj).focus();
			return false;
		}
	}
	return true;
}

//1140814	Joe		序179		新增統計機關條件
function rbStaticOrgChg()
{
	if ($('#rbStaticOrgOwn').prop('checked'))
		$('#divSub').hide();
	else
		$('#divSub').show();
}