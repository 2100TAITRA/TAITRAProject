/*
 * DATE			PRG		MGR_NO		DESC
 * 1050928		Justin	1050087		二代公文修改
 * 1051019		Joe		1050087		二代修改配合行動平台
 * 1070803		Justin	1070678		弱掃修正Client Cookies Inspection
 * 1080318		Joe		1080098		弱掃修正禁用WSDL
 * 1080904		Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理
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
//1050928 Justin 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	jf_CallWA(document.all.hAuthWS.value, "GetAccountName", false, null);
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	Joe		1050087		配合行動平台進行修正
	//var xObjectName = document.activeElement.id;
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
	    case "btUser":
	        //1050929 Justin 1050087 二代ShowModalDialog修改
	        //fnQueryUser("txAccount", "txAccountName");
	        //1070803 Justin [1070678]弱掃修正Client Cookies Inspection
			//jf_SaveCookie("iic021SelectType", "'Account'");
	        Page_BlockSubmit = true;
			//1070803 Justin [1070678]弱掃修正Client Cookies Inspection
	        //jf_ShowModal("../../../IF/IF1/IFC021.aspx" + GetAllParamStr(), "288", "470");
			jf_ShowModal("../../../IF/IF1/IFC021.aspx" + GetAllParamStr() + "&iic021SelectType=Account", "288", "470");
			break;
		/*1050928 Justin 1050087 二代公文修改 
		case "btCalendarS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txStartDate, event.screenX, event.screenY);
			break;
		case "btCalendarE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txEndDate, event.screenX, event.screenY);
			break;*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050928 Justin 1050087 二代公文修改 
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
	
    //1050928 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !jf_Check();
		    //1050928 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_Check();
		    //1050928 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

//檢查
function jf_Check()
{
	var bRtnbool = true;
	var strErrMsg= "";
	var objFocus = null;
	
	document.all.txBulletinId.value	= jf_Trim(document.all.txBulletinId.value);
	document.all.txDocNo.value		= jf_Trim(document.all.txDocNo.value);
	//檢查是否有輸入任一條件
	if (document.all.txBulletinId.value == "" && document.all.txDocNo.value == "" 
		&& document.all.dlPasteUnit.selectedIndex <= 0 && document.all.txStartDate.value == ""
		&& document.all.txEndDate.value == "" && document.all.txSubject.value == ""
		&& document.all.txAccount.value == "")
	{
		strErrMsg += "請至少輸入一個搜尋條件。\n";
		objFocus = document.all.txBulletinId;
	}
	
	if (strErrMsg != "")
	{
	    //1050928 Justin 1050087 二代公文修改
	    //objFocus.focus();
	    $('#txBulletinId').focus();
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//查詢使用者
/*1050929 Justin 1050087 二代ShowModalDialog修改
function fnQueryUser(argUserId_ID, argUserName_ID)
{
	Page_BlockSubmit = true;
	var ret = jf_ShowOrgDialogForPerson();
	if(ret)
	{
		document.all[argUserId_ID].value	= ret.Code;
		document.all[argUserName_ID].value	= ret.Name;
	}	
}*/
//1050929 Justin 1050087 二代公文修改，行為改成與window.open() 相似，都由CallBack()負責取得回傳值與執行後續行為
function CallBack(argCallerId) {
    if (argCallerId == "IFC021") {
        if (IsRationalValue(document.all["lbReturnValue"].options)) {
            document.all["txAccount"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
            document.all["txAccountName"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
            //修改showmodaldialog開啟視窗，清除Cookie
			//1070803 Justin [1070678]弱掃修正Client Cookies Inspection
            //jf_SaveCookie("iic021SelectType", "");
        }
    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

function IsRationalValue(val) {
    if (val == undefined)
        return false;
    if (val == null)
        return false;
    return true;
}
//1050929 Justin 1050087 二代公文修改--END--

//檢核使用者
function fnCheckUser(argUserId_ID, argUserName_ID)
{
	var strUserId = jf_Trim(document.all[argUserId_ID].value);
	if (strUserId == "")
	{
		document.all[argUserId_ID].value = "";
		document.all[argUserName_ID].value = "";
		return true;
	}
	document.all[argUserId_ID].value = strUserId;
	
	//1080318	Joe		1080098		弱掃修正禁用WSDL--S
	/*
	var arWSParam = new Array(1);
	arWSParam[0] = strUserId;
	CallWsObj = jf_CallWA(document.all.hAuthWS.value, "GetAccountName", false, arWSParam);
	*/
	//1080904	Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理--S
	// var params = new SOAPClientParameters();
	// params.add('argArtifact',  jf_GetArtifact());
	// params.add('argAccount', strUserId);
	// var CallWsObj = SOAPClient.invokeJSON(document.all.hAuthWS.value, "GetAccountName", params ,false, null)
	var arWSParam = new Array(1);
	arWSParam[0] = strUserId;
	CallWsObj = jf_CallWA(document.all.hAuthWS.value, "GetAccountName", false, arWSParam);
	//1080904	Joe		1080657		內網專用程式，取消禁用WSDL，改回透過Template處理--E
	//1080318	Joe		1080098		弱掃修正禁用WSDL--E
	if (!CallWsObj)
	{
		document.all[argUserId_ID].value = "";
		document.all[argUserName_ID].value = "";
	    //1050928 Justin 1050087 二代公文修改
		//document.all[argUserId_ID].focus();
		$('#' + argUserId_ID).focus();
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["無法檢核使用者資訊，請聯絡系統管理員處理。"])),"");
		return false;
	}
	if (!CallWsObj.value)
	{
		document.all[argUserId_ID].value = "";
		document.all[argUserName_ID].value = "";
	    //1050928 Justin 1050087 二代公文修改
		//document.all[argUserId_ID].focus();
		$('#' + argUserId_ID).focus();
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["找不到使用者["+strUserId+"]的資料，請重新輸入。"])),"");
		bHasCheck = false;
		return false;
	}
	document.all[argUserName_ID].value = CallWsObj.value;
	bHasCheck = false;
	return true;
}