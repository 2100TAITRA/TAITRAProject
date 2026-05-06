/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * -------------------------------------------------------------------------------------------------
 * 日期			SA		修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1120321      Cloud   Cloud   1120211 升級二代
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;
//* 1120321      Cloud      1120211 升級二代
/*if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/
AjaxPro.Request.prototype.timeout = function () {
	try {
		this.duration = new Date().getTime() - this.__start;
		var r = this.onTimeout(this.duration, this);
		if (typeof r == "undefined" || r != false) {
			this.abort();
		} else {
			this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
		}
	}
	catch (error) {

	}
	finally {

	}
}

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //* 1120321      Cloud      1120211 升級二代
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次	
	ObjOnBlur();
	if(document.all.DISABLEDDDLDEPT && document.all.DISABLEDDDLDEPT.value=="Y")
		document.all["dlDept"].disabled = true;
		
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl()
{
	var xObjectName = document.activeElement.id;
	
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
		case "btKeyHelp": //計畫批號提示
			Page_BlockSubmit=true;
		    var pUrl = "";
		    pUrl = "../EA40/EAT403C1.aspx";
			jf_OpenChildWin(pUrl, "EAT400C3", 750, 500);
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//* 1120321      Cloud      1120211 升級二代
//function jf_ToolBarHandle()
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
    //* 1120321      Cloud      1120211 升級二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
		    Page_BlockSubmit = !ConfirmPreview();
		    //* 1120321      Cloud      1120211 升級二代
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !ConfirmPreview();
		    //* 1120321      Cloud      1120211 升級二代
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btExcel":
	        Page_BlockSubmit = !ConfirmPreview();
		    //* 1120321      Cloud      1120211 升級二代
		    //jf_ToolBarSubmit();
	        jf_ToolBarSubmit(xObjectName);
	        break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
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
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	if (argCallerId == "EAT403C1")
	{
		document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
		document.all["txPlanNo"].focus();
		ObjOnBlur();
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function ObjOnBlur() {
	
	if (document.all.txPlanNo.value != "") {

		if (document.all["H_PLANNO"].value == "")
			document.all["H_PLANNO"].value = document.all.txPlanNo.value;
		else if (document.all["H_PLANNO"].value != document.all.txPlanNo.value)
		{
			document.all["H_SOURCENO"].value = "";
			document.all["H_DEPTNO"].value = "";
			document.all["H_PLANNO"].value = document.all.txPlanNo.value;
		}
		var strCode = EA50.EAR511.CheckExist(document.all["txPlanNo"].value).value;
		if (strCode == "N") {
			alert('批號不存在。');
			return false;
		}
		else {
			if (strCode.indexOf('|') != -1) {
				document.all.txPlanName.value = strCode.split('|')[0];
				if (document.all["H_SOURCENO"].value == "")//未選
				{
					if (strCode.split('|')[1] != "") {

						for (var i = 0; i < document.all["dlSourcelist"].options.length; i++) {
							if (document.all["dlSourcelist"].options[i].value == strCode.split('|')[1]) {
								document.all["dlSourcelist"].selectedIndex = i;
								document.all["dlSourcelist"].disabled = true;
								document.all["H_SOURCENO"].value = strCode.split('|')[1];
								break;
							}
						}
					}
					else {
						document.all["dlSourcelist"].selectedIndex = 0;
						document.all["dlSourcelist"].disabled = false;
					}
					dlSourcelist_onblur();
				}
				if (document.all["H_DEPTNO"].value == "") {
					//設定列印單位
					if (strCode.split('|')[2] != "") {
						document.all["H_DEPTNO"].value = strCode.split('|')[2];
						for (var idept = 0; idept < document.all["dlDept"].options.length; idept++) {
							if (document.all["dlDept"].options[idept].value == strCode.split('|')[2]) {
								document.all["dlDept"].selectedIndex = idept;
								document.all["dlDept"].disabled = true;
								break;
							}
						}
					}
					else {
						document.all["dlDept"].selectedIndex = 0;
						document.all["dlDept"].disabled = false;
					}
				}
				return true;
			}
			else {
				alert(strCode);
				return false;
			}
		}
	}
}
function ConfirmPreview()
{
	if (document.all.txPlanNo.value == "") {
		alert("批號不可為空白。");
		return false;
	}
	else {
		return ObjOnBlur();
	}
}
function dlSourcelist_onblur() {
	if (document.all["dlSourcelist"].options[document.all["dlSourcelist"].selectedIndex].value != "") {
		document.all["H_SOURCENO"].value = document.all["dlSourcelist"].options[document.all["dlSourcelist"].selectedIndex].value;
		var strCode = EA50.EAR511.GetDeptInfo(document.all["dlSourcelist"].options[document.all["dlSourcelist"].selectedIndex].value).value;
		if (strCode.indexOf("ERR") != -1) {
			alert(strCode);
		}
		document.all["H_DEPTNO"].value = "";
		document.all["H_DETPNOLIST"].value = "";
		while (document.all.dlDept.options[0] != null) {
			document.all.dlDept.options[0] = null;
		}
		var SectDropListChild = document.createElement("OPTION");
		SectDropListChild.value = "";
		SectDropListChild.text = "";
		document.all.dlDept.options.add(SectDropListChild);
		var arrDeptList = strCode.split(';');
		for (var i = 0; i < arrDeptList.length; i++) {
			SectDropListChild = document.createElement("OPTION");
			SectDropListChild.value = arrDeptList[i].split('|')[0];
			SectDropListChild.text = arrDeptList[i].split('|')[1];
			document.all["H_DETPNOLIST"].value += arrDeptList[i] + ";";
			document.all.dlDept.options.add(SectDropListChild);
		}
	}
	else {
		document.all["H_DEPTNO"].value = "";
		document.all["H_DETPNOLIST"].value = "";
		document.all["H_SOURCENO"].value = "";
	}
}
function GetDeptNo() {
	document.all["H_DEPTNO"].value = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value;

}