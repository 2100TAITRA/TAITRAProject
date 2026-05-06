/*
DATE 	 SA		 PRG	  MGR_NO	DESC
1140701  Cloud 	 Andy     1140242   新增程式
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
function ClientOnLoad() {
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
		case "btPreview":
		case "btExcel":
		case "btODS":
			Page_BlockSubmit = !jf_CheckPreview()
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
function jf_dlUserChange() {
	document.all["H_userID"].value = document.all.dlBorrowUser.options[document.all.dlBorrowUser.selectedIndex].value;
}
function InitUserList() {
	SetUserByDept("dlBorrowDept", "dlBorrowUser");
	document.all["empUserId"].value = document.all.dlBorrowDept.options[document.all.dlBorrowDept.selectedIndex].value;
	document.all["H_userID"].value = "";
	document.all["H_UserInfo"].value = "";
	if (document.all["dlBorrowUser"].options.length != 0) {
		for (var i = 0; i < document.all["dlBorrowUser"].options.length; i++) {
			if (document.all["dlBorrowUser"].options[i].text !== "" && document.all["dlBorrowUser"].options[i].value.split(":")[2] != "")
				document.all["H_UserInfo"].value += document.all["dlBorrowUser"].options[i].text + ";" + document.all["dlBorrowUser"].options[i].value + "|";
		}
	}
}
function SetUserByDept(argDeptObjID, argUserObjID) {
	var DeptObj = document.all[argDeptObjID];
	var i, j, len;
	var val = DeptObj.options[DeptObj.selectedIndex].value;
	var result = val.split(':')[0];

	callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDeptAllUsers", false, result);

	var resultObj = null;
	if (callObj.error) {
		alert(callObj.errorDetail.string);
	}
	else {
		if (jf_IsWebServiceSuccess(callObj))
			resultObj = callObj.value;
	}

	var UserObj = document.all[argUserObjID];
	var UserNameMem = DeptObj.options[DeptObj.selectedIndex].text;

	//clear
	len = UserObj.length;
	for (i = 0; i < len; i++)
		UserObj.remove(0);

	//add new data
	len = resultObj.UserName.length;
	UserObj.options.add(new Option("", ""));
	for (i = 0; i < len; i++) {
		var objOption = new Option(resultObj.EmpName[i], resultObj.UserName[i])
		UserObj.options.add(objOption);
	}

	UserObj.selectedIndex = -1;
	for (i = 0; i < len; i++) {
		if (UserNameMem == resultObj.EmpName[i] || UserNameMem == resultObj.UserName[i]) {
			UserObj.selectedIndex = i;
			break;
		}
	}
}
function jf_CheckPreview() {
	var ReturnValue = true;
	if (document.all.txWorkDateS.value == "" && document.all.txWorkDateE.value == "") {
		alert('調案日期不可皆為空白。');
		ReturnValue = false;
		return;
	}

	if (document.all.txWorkDateS.value == "" && document.all.txWorkDateE.value != "")
		document.all.txWorkDateS.value = document.all.txWorkDateE.value;
	else if (document.all.txWorkDateS.value != "" && document.all.txWorkDateE.value == "")
		document.all.txWorkDateE.value = document.all.txWorkDateS.value;
	else if (document.all.txWorkDateS.value > document.all.txWorkDateE.value) {
		var tmp = document.all.txWorkDateS.value;
		document.all.txWorkDateS.value = document.all.txWorkDateE.value;
		document.all.txWorkDateE.value = tmp;
	}
	var startDate = convertRocDate(document.all.txWorkDateS.value);
	var endDate = convertRocDate(document.all.txWorkDateE.value);
	var sixMonthsLater = new Date(startDate);
	sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

	if (endDate > sixMonthsLater) {
		alert('區間不可超過半年。');
		ReturnValue = false;
		return;
	}

	return ReturnValue;
}

function convertRocDate(rocStr) {
	if (!rocStr || rocStr.length !== 7) return null;
	var rocYear = parseInt(rocStr.substr(0, 3), 10) + 1911;
	var month = rocStr.substr(3, 2);
	var day = rocStr.substr(5, 2);
	return new Date(`${rocYear}-${month}-${day}`);
}

//檢核日期格式
function CheckCDATE(argObj, strMsg) {
	var strDate = document.all[argObj].value;
	if (strDate != "") {
		if (strDate.length < 7) {
			strDate = jf_PADL(strDate, 7, '0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate)) {
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
			$('#' + argObj).focus();
			return false;
		}
	}
	return false;
}