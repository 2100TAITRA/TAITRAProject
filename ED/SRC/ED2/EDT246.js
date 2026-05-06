/*
DATE	SA		PRG		MGR_NO			DESC
1100727	David	Joe		1100652			新增EDT246主管異動移交設定作業
1100818	David	Joe		--				自測修正承辦科別顯示邏輯
1131022 Joe     Jason   1130763         調整檢核邏輯由「角色+帳號」，變更為「單位+角色+帳號」
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;
var strAlertMsg  = "";
var pNo = "";
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
	if (document.all.dg1)
		document.all.divSelect.className = "DgSelectToolBar";
	
	//1100818	Joe		--		自測修正承辦科別顯示邏輯
	if(document.all["dlDept"].selectedIndex > 0)
		document.all["dlSect"].className = "";
	else
		document.all["dlSect"].className = "hide";
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

	if(xObjectName.indexOf("_btDgHelp") != -1){
		pNo = xObjectName.substring(8, xObjectName.indexOf("_btDgHelp"));
		xObjectName = "btHelp";
	}
	switch (xObjectName)
	{
		case "btHelp":
			Page_BlockSubmit = true;
			jf_ShowModal("/IF/IF1/IFC020.aspx" + GetAllParamStr(),"800","600")
            break;
		case "btAdd":
            if (jf_CheckBeforAdd())
            {
				Page_BlockSubmit = false;
                IsServerHandling = true;
                __doPostBack("btAdd", 0);
            }
			else
				Page_BlockSubmit = true;
            break;
		case "btDgDelete":
			if (fnCheckBeforDgDelete())
            {
				Page_BlockSubmit = false;
                IsServerHandling = true;
                __doPostBack("btDgDelete", 0);
            }
			else
				Page_BlockSubmit = true;
			break;
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbdgSelect");
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbdgSelect");
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbdgSelect");
			break;
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
		case "btSave":
			if (jf_CheckBeforSave()) //是否通過儲存前必要檢查
			{
				if (strAlertMsg != "") {
					if (window.confirm(strAlertMsg)) {
						IsServerHandling = true;
						jf_ShowWaitState();
						Page_BlockSubmit = false;
						document.all["H_TranStart"].value = "Y";
                    }
				}
				else {
					IsServerHandling = true;
					jf_ShowWaitState();
					Page_BlockSubmit = false;
                }
			}
			else
				Page_BlockSubmit = true;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";

	if(!document.all.dg1)
		strErrMsg += "請先加入移交資料後再進行儲存功能\n";
	else
	{
		for (var i = 2; i < document.all.dg1.rows.length + 1; i++) {

			var strDate = document.all["dg1__ctl" + i + "_txdgDate"].value;
			if (strDate == "") {
				strErrMsg += "序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "移交日期不可為空。\n";
			}
			else if (strDate == document.all["H_SysDate"].value) {
			    strAlertMsg = "待移交資料有生效日期為今天的資料，儲存後即會進行移交處理，請問是否執行？";
			}
		}
	}
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}

	return bRtnbool;
}

function jf_CheckBeforAdd()
{
    var bRtnbool = true;
    var strErrMsg = "";

	if (document.all["h_DeptInfo"].value == "") {
		strErrMsg += "被異動人單位不可為空\n";
		$('#dlDept').focus();
	}
	if (document.all["h_UserInfo"].value == "") {
		strErrMsg += "被異動人不可為空\n";
		$('#dlUser').focus();
	}
	else {
		for (var i = 2; i < document.all.dg1.rows.length + 1; i++) {
			//1131022     Jason   1130763         調整檢核邏輯由「角色 + 帳號」，變更為「單位 + 角色 + 帳號」
			//if ((document.all["h_UserInfo"].value.split('-')[0] + "-" + document.all["h_UserInfo"].value.split('-')[2]) == (document.all["dg1__ctl" + i + "_txdgFromRoleId"].value + "-" + document.all["dg1__ctl" + i + "_txdgFromUsername"].value)) {
			if ((document.all["h_DeptInfo"].value.split('-')[0] + "-" + document.all["h_UserInfo"].value.split('-')[0] + "-" + document.all["h_UserInfo"].value.split('-')[2]) == (document.all["dg1__ctl" + i + "_txdgOuId"].value+ "-" +document.all["dg1__ctl" + i + "_txdgFromRoleId"].value + "-" + document.all["dg1__ctl" + i + "_txdgFromUsername"].value)) {
				strErrMsg += "被異動人與序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "重複，請透過下方表格維護。\n";
				$('#dlUser').focus();
				break;
			}
		}
	}
	if (document.all["txToUserName"].value == "") {
		strErrMsg += "異動人不可為空\n";
		$('#txToUserName').focus();
	}
	if (document.all["txDate"].value == "") {
		strErrMsg += "生效日期不可為空\n";
		$('#txDate').focus();
	}
	else if (!CheckTranDate("txDate", "生效日期")){
		bRtnbool = false;
		$('#txDate').focus();
	}

	if (strErrMsg != "") {
		bRtnbool = false;
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
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
	if(argCallerId == "IFC020")
	{
		if(document.all.lbReturnValue.options[0])
		{
			if(pNo != "")
			{
				document.all["dg1__ctl" + pNo + "_txdgToUsername"].value = GetElement(document.all.lbReturnValue.options[0].value, 0);
				document.all["dg1__ctl" + pNo + "_txdgToEmpname"].value = GetElement(document.all.lbReturnValue.options[0].value, 1);
			}
			else
			{
				document.all["txToUserName"].value = GetElement(document.all.lbReturnValue.options[0].value, 0);
				document.all["txToEmpName"].value = GetElement(document.all.lbReturnValue.options[0].value, 1);
			}
		}
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
		var Sectvalue = ED2.EDT246.GetSub(document.all["SsoArtifact"].value, str.split('-')[0]).value;
		if (Sectvalue.length > 0) {
			dlSect.options.add(new Option("", ""));//DropDownList新增一個空白
			for (var i = 0; i < Sectvalue.length; i++) {
				var strSect = Sectvalue[i];
				dlSect.options.add(new Option(strSect.split('|')[0], strSect.split('|')[1]));
				document.all.SectList.value += strSect + ";"
			}
			var Uservalue = ED2.EDT246.GetUser(document.all["H_OrgNo"].value, str.split('-')[0]).value;
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

			var Uservalue = ED2.EDT246.GetUser(document.all["H_OrgNo"].value, str.split('-')[0]).value;
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
		var Uservalue = ED2.EDT246.GetUser(document.all["H_OrgNo"].value, str.split('-')[0]).value;
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
		var Uservalue = ED2.EDT246.GetUser(document.all["H_OrgNo"].value, document.all["h_DeptInfo"].value.split('-')[0]).value;
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

//檢核日期格式
function CheckTranDate(argObj, strMsg) {
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
		if (strDate < document.all["H_SysDate"].value) {
			alert(strMsg + '不可小於系統日期');
			$('#' + argObj).focus();
			return false;
		}
	}
	return true;
}

function fnCheckBeforDgDelete() {
	var bHasChecked = false;
	for (var i = 2; i < document.all.dg1.rows.length + 1; i++) {
		var CheckItem = "dg1__ctl" + i + "_cbdgSelect";
		if (document.all[CheckItem].checked) {
			bHasChecked = true;
			break;
		}
	}

	if (!bHasChecked)
		alert("請勾選預刪除的項目");

	return bHasChecked;
}

function GetAllParamStr()
{
	var strParam = "";
	var pUrl = unescape(this.location);
	if( pUrl != -1 )
	{
		var i = pUrl.indexOf("?");
		if(i != -1)
			strParam = pUrl.substr(i); 
	}
	return strParam;
}
function fnClearDropDownList(obj)
{
    while (obj.options.length > 0)
        obj.options.remove(0);
}

function GetElement(argStr, argIdx) {
	var ss = argStr.split(SPLIT);
	return ss[argIdx];
}