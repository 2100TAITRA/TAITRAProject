/*
DATE	SA		PRG		MGR_NO			DESC
1100720	Cloud	Joe		1100647			新增異動撤銷申請查詢作業
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

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
			if (jf_CheckBeforSearch())
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
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

	if (document.all.txApplyDateS.value + document.all.txApplyDateE.value + document.all.txDocNoS.value + document.all.txDocNoE.value + document.all.h_DeptInfo.value + document.all.h_SectInfo.value + document.all.h_UserInfo.value == '')
		strErrMsg += "查詢條件不可皆為空。";

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	else
	{
		if (document.all.txApplyDateS.value != "" && document.all.txApplyDateE.value == "")
			document.all.txApplyDateE.value = document.all.txApplyDateS.value;
		else if (document.all.txApplyDateE.value != "" && document.all.txApplyDateS.value == "")
			document.all.txApplyDateS.value = document.all.txApplyDateE.value;
		else if (document.all.txApplyDateS.value != "" && document.all.txApplyDateE.value != "" && document.all.txApplyDateS.value > document.all.txApplyDateE.value) {
			var temp = document.all.txApplyDateS.value;
			document.all.txApplyDateS.value = document.all.txApplyDateE.value;
			document.all.txApplyDateE.value = temp;
		}

		if (document.all.txDocNoS.value != "" && document.all.txDocNoE.value == "")
			document.all.txDocNoE.value = document.all.txDocNoS.value;
		else if (document.all.txDocNoE.value != "" && document.all.txDocNoS.value == "")
			document.all.txDocNoS.value = document.all.txDocNoE.value;
		else if (document.all.txDocNoS.value != "" && document.all.txDocNoE.value != "" && document.all.txDocNoS.value > document.all.txDocNoE.value) {
			var temp = document.all.txDocNoS.value;
			document.all.txDocNoS.value = document.all.txDocNoE.value;
			document.all.txDocNoE.value = temp;
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

function dlDeptOnChange() {
	var str = document.all["dlDept"].options[document.all["dlDept"].selectedIndex].value;//使用者點選選單，選到的是哪個index值
	var dlSect = document.all["dlSect"];
	var dlUser = document.all["dlUser"];
	document.all["h_DeptInfo"].value = str;//將單位放入隱藏欄位
	document.all["h_SectInfo"].value = "";
	document.all["h_UserInfo"].value = "";
	fnClearDropDownList(dlSect);
	fnClearDropDownList(dlUser);
	document.all.SectList.value = "";
	document.all.UserList.value = "";
	if (document.all["dlDept"].selectedIndex > 0)//index有可能是0"空白"的情況
	{
		document.all["dlSect"].className = "";
		var Sectvalue = ED2.EDR221.GetSub(document.all["SsoArtifact"].value, str).value;
		if (Sectvalue.length > 0) {
			dlSect.options.add(new Option("", ""));//DropDownList新增一個空白
			for (var i = 0; i < Sectvalue.length; i++) {
				var strSect = Sectvalue[i];
				dlSect.options.add(new Option(strSect.split('|')[0], strSect.split('|')[1]));
				document.all.SectList.value += strSect + ";"
			}
			var Uservalue = ED2.EDR221.GetUser(document.all["SsoArtifact"].value, str).value;
			if (Uservalue.length > 0) {
				dlUser.options.add(new Option("", ""));
				for (var i = 0; i < Uservalue.length; i++) {
					var strUser = Uservalue[i];
					dlUser.options.add(new Option(strUser.split('|')[0], strUser.split('|')[1]));
					document.all.UserList.value += strUser + ";"
				}
			}
		}
		else {
			document.all["dlSect"].className = "hide";
			dlUser.options.add(new Option("", ""));//DropDownList新增一個空白

			var Uservalue = ED2.EDR221.GetUser(document.all["SsoArtifact"].value, str).value;
			if (Uservalue.length > 0) {
				for (var i = 0; i < Uservalue.length; i++) {
					var strUser = Uservalue[i];
					dlUser.options.add(new Option(strUser.split('|')[0], strUser.split('|')[1]));
				}
			}
		}
	}
	else {
		fnClearDropDownList(dlSect);
		document.all["dlSect"].className = "hide";
	}
}
function dlSectOnChange() {
	var str = document.all["dlSect"].options[document.all["dlSect"].selectedIndex].value;//使用者點選選單，選到的是哪個index值
	var dlUser = document.all["dlUser"];
	document.all["h_SectInfo"].value = str;//將科別放入隱藏欄位
	document.all["h_UserInfo"].value = "";
	fnClearDropDownList(dlUser);
	document.all.UserList.value = "";
	if (document.all["dlSect"].selectedIndex > 0)//index有可能是0"空白"的情況
	{
		document.all["dlUser"].className = "";
		var Uservalue = ED2.EDR221.GetUser(document.all["SsoArtifact"].value, str).value;
		dlUser.options.add(new Option("", ""));//DropDownList新增一個空白
		if (Uservalue.length > 0) {
			for (var i = 0; i < Uservalue.length; i++) {
				var strUser = Uservalue[i];
				dlUser.options.add(new Option(strUser.split('|')[0], strUser.split('|')[1]));
				document.all.UserList.value += strUser + ";"
			}
		}
		else//無人員清空下拉選單
		{
			fnClearDropDownList(dlUser);
		}
	}
	else//有二級單位選單，選擇空白時，應帶出一級單位所有人員
	{
		fnClearDropDownList(dlUser);
		dlUser.options.add(new Option("", ""));//DropDownList新增一個空白
		var Uservalue = ED2.EDR221.GetUser(document.all["SsoArtifact"].value, document.all["h_DeptInfo"].value).value;
		if (Uservalue.length > 0) {
			for (var i = 0; i < Uservalue.length; i++) {
				var strUser = Uservalue[i];
				dlUser.options.add(new Option(strUser.split('|')[0], strUser.split('|')[1]));
				document.all.UserList.value += strUser + ";"
			}
		}
	}
}
function dlUserOnChange() {
	var str = document.all["dlUser"].options[document.all["dlUser"].selectedIndex].value;//使用者點選選單，選到的是哪個index值
	document.all["h_UserInfo"].value = str;//將帳號放入隱藏欄位
}

function fnClearDropDownList(obj)//專用呼叫清空
{
    while (obj.options.length > 0)//當list長度大於0的時候，從第一個刪，刪到沒有為止
        obj.options.remove(0);
}