/*
DATE	SA		PRG		MGR_NO			DESC
1140506 Cloud   Levi    1140117         新增程式
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
	//PostBack後，重置選單狀態
	handledlRtnType()
	handledlOverType()
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
			if (document.all["dlDept"].value != "")
				document.all["txDL"].value = collectDL();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			break;
	}
}

function jf_ConfirmSearch() {
	var bRtnbool = false;
	if (CheckBeforeSearch())//檢查日期欄位是否為空
	{
		if (CheckCDATE("txDateS", "調案日期(起)"))
		{
			if (CheckCDATE("txDateE", "調案日期(迄)"))
			{
				if (CheckMonth())
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

//紀錄Client端所選擇之UserID
function jf_dlUserChange() {
	var empUserInfo = document.all["dlUser"].options[document.all["dlUser"].selectedIndex].value;
	if (empUserInfo == "") {
		document.all["empUserId"].value = "";
		return;
	}
	var tempstr = empUserInfo.split(":");
	document.all["empUserId"].value = tempstr[2];
}

function CheckBeforeSearch() {
	//strDateS : 暫存起值
	//strDateE : 暫存迄值
	// txDateS : 物件起值
	// txDateE : 物件迄值

	var strErrMsg = '';
	var strDateS = $('#txDateS').val();
	var strDateE = $('#txDateE').val();

	if (strDateS == '' && strDateE != '')
		$('#txDateS').val(strDateE);
	else if (strDateS != '' && strDateE == '')
		$('#txDateE').val(strDateS);
	else if (Number(strDateS) > (Number(strDateE))) {
		$('#txDateS').val(strDateE);
		$('#txDateE').val(strDateS);
	}

	if (strDateS + strDateE == '')
		strErrMsg += '調案日期不可為空';

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

//歸還情況onchange
function handledlRtnType() {
	if (document.getElementById('dlRtnType').value === "1") {

		document.getElementById('dlOverType').value = "";
		document.getElementById('dlOverType').disabled = true;

		document.getElementById('dlOverDay').value = "";
		document.getElementById('dlOverDay').disabled = true;
	}

	else {
		document.getElementById('dlOverType').disabled = false;
	}
}
//逾期別onchange
function handledlOverType() {
	if (document.getElementById('dlOverType').value === "1") {

		document.getElementById('dlOverDay').disabled = false;
	}

	else {
		document.getElementById('dlOverDay').value = "";
		document.getElementById('dlOverDay').disabled = true;
	}
}

function ClearUser() {
	if (document.all.dlDept.selectedIndex == 0) {
		document.all["empUserId"].value = "";
		var UserObj = document.all["dlUser"];
		len = UserObj.length;
		for (i = 0; i < len; i++)
			UserObj.remove(0);
	}
}


function collectDL() {
	var str = "";
	for (var i = 0; i < document.all["dlUser"].options.length; i++) {
		str += document.all["dlUser"].options[i].text + "," + document.all["dlUser"].options[i].value + ",";
	}
	return str;
}

//檢查調案日期不可大於一個月
function CheckMonth() {
	var strSDate = jf_Trim(document.all["txDateS"].value);
	var strEDate = jf_Trim(document.all["txDateE"].value);

	if (strEDate < strSDate) {
		var temp = strSDate;
		strSDate = strEDate;
		strEDate = temp;
	}

	function rocToDate(rocStr) {
		if (rocStr.length !== 7) return null;
		var rocYear = parseInt(rocStr.substring(0, 3), 10) + 1911;
		var month = parseInt(rocStr.substring(3, 5), 10) - 1; 
		var day = parseInt(rocStr.substring(5, 7), 10);
		return new Date(rocYear, month, day);
	}

	var startDate = rocToDate(strSDate);
	var endDate = rocToDate(strEDate);
	var diffDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

	if (diffDays > 31) {
		$('#txDateS').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["調案日期間隔不可大於一個月"])), "");
		return false;
	}

	return true;
}