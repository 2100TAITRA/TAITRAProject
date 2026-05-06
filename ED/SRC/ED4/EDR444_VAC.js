/*
DATE 	 SA		 PRG	  MGR_NO	DESC
1140515  Joe     Joe      1140072   新增程式
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

function ClientButtonControl(e)
{

	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	Page_BlockSubmit=true;
	switch (xObjectName)
	{

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
	
	xObjectName = event.target.id
	
	Page_BlockSubmit=false;

	switch (xObjectName)
	{
		case "btPreview":
		case "btExcel":
		case "btODS":
			Page_BlockSubmit = !CheckBeforeSearch();
			jf_ToolBarSubmit(xObjectName);
			break;
	}	
}


function CheckBeforeSearch()
{
	if (document.all.txCoRcvDateS.value + document.all.txCoRcvDateE.value == "")
	{
		alert('簽收日期不可皆為空白');
		return false;
	}

	if (document.all.txCoRcvDateS.value == "" && document.all.txCoRcvDateE.value != "")
		document.all.txCoRcvDateS.value = document.all.txCoRcvDateE.value;
	else if (document.all.txCoRcvDateS.value != "" && document.all.txCoRcvDateE.value == "")
		document.all.txCoRcvDateE.value = document.all.txCoRcvDateS.value;
	else if (document.all.txCoRcvDateS.value > document.all.txCoRcvDateE.value) {
		var tmp = document.all.txCoRcvDateS.value;
		document.all.txCoRcvDateS.value = document.all.txCoRcvDateE.value;
		document.all.txCoRcvDateE.value = tmp;
	}

	return true;
}
var bHasCheck = false;
function CheckDATE(argObj,strMsg)
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
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

			$('#'+argObj).focus(); 
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}
function CallBack(argCallerId)
{

}

function ClientOnLoad()
{
	document.all["H_Dept"].value = document.all["dlCoDept_Text"].value;
	document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlCoDept"], document.all["H_Dept"].value);
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

function dlCoDept_Text_onblur() {
	var bCheckOK = true;
	if (document.all["dlCoDept_Text"].value != document.all["H_Dept"].value) {
		//呼叫OD_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
		if (edjf_ComboBoxCheck("dlCoDept", "會辦單位")) {
			//存ComboBox_Text的value
			document.all["H_Dept"].value = document.all["dlCoDept_Text"].value;
			//存所選擇的ComboBox項目的value
			document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlCoDept"], document.all["H_Dept"].value);

			edjf_SetdlDept("dlCoDept", "", "dlUser", "", false, true);  


			document.all["H_User"].value = document.all["dlUser_Text"].value;
			document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
			//將下拉式選單的text與value轉成字串相加，於postback時，初始化dlUser的處理
			document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);

			//依選項多寡固定下拉式選單可見長度

			if (document.all["dlUser"].options.length > 10)
				document.all["dlUser"].size = 10;
			else if (document.all["dlUser"].options.length == 1)
				document.all["dlUser"].size = 2;
			else
				document.all["dlUser"].size = document.all["dlUser"].options.length;

		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}


function dlUser_Text_onblur() {
	var bCheckOK = true;
	//值若變更時作處理
	if (document.all["dlUser_Text"].value != document.all["H_User"].value) {
		//呼叫ED_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
		if (edjf_ComboBoxCheck("dlUser", "會辦人")) {
			document.all["H_User"].value = document.all["dlUser_Text"].value;

			document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
		}
		else
			bCheckOK = false;
	}
	return bCheckOK;
}

function OverStatuschange()
{
	if ($('#dlOverStatus').val() == 'N' && $('#dlOverdue').val() != "")
		$('#dlOverdue').val("");
}
function OverDuechange()
{
	if ($('#dlOverStatus').val() == 'N' && $('#dlOverdue').val() != "")
		$('#dlOverStatus').val("");
}