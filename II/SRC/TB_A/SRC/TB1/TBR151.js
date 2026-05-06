/*
DATE	SA		PRG		MGR_NO			DESC
1050929	Cloud   Kenny	1050087	        二代公文系統相關修改
1051019	Leslie	Joe		1050087			二代修改配合行動平台
1060921 Cloud	Cloud	--				修正預覽無作用問題
1080318	Kevin	Joe		1080098			弱掃修正禁用WSDL
1080904	Kevin	Joe		1080657			內網專用程式，取消禁用WSDL，改回透過Template處理
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

//1050929	Kenny   [1050087]	二代公文系統相關修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1050929	Kenny   [1050087]	二代公文系統相關修改；移除無用CODE
	//jf_CallWA(document.all.hAuthWS.value, "GetAccountName", false, null);
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
			fnQueryUser("txAccount", "txAccountName");
			break;
        //1050929	Kenny   [1050087]	二代公文系統相關修改--Start--
		//case "btCalendarS":
		//	Page_BlockSubmit = true;
		//	jf_CallCalendar(document.all.txStartDate, event.screenX, event.screenY);
		//	break;
		//case "btCalendarE":
		//	Page_BlockSubmit = true;
		//	jf_CallCalendar(document.all.txEndDate, event.screenX, event.screenY);
		//	break;
        //1050929	Kenny   [1050087]	二代公文系統相關修改--End--
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050929	Kenny   [1050087]	二代公文系統相關修改
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
	
	//1050929	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !jf_Check();
			//1050929	Kenny   [1050087]	二代公文系統相關修改
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
    //1050929	Kenny   [1050087]	二代公文系統相關修改
	//var objFocus = null;
    var objFocus = "";
	
	document.all.txBulletinId.value	= jf_Trim(document.all.txBulletinId.value);
	document.all.txDocNo.value		= jf_Trim(document.all.txDocNo.value);
	//檢查是否有輸入任一條件
	if (document.all.txBulletinId.value == "" && document.all.txDocNo.value == "" 
		&& document.all.dlPasteUnit.selectedIndex <= 0 && document.all.txStartDate.value == ""
		&& document.all.txEndDate.value == "" && document.all.txSubject.value == ""
		&& document.all.txAccount.value == "")
	{
		strErrMsg += "請至少輸入一個搜尋條件。\n";
        //1050929	Kenny   [1050087]	二代公文系統相關修改
		//objFocus = document.all.txBulletinId;
        objFocus = "txBulletinId";
	}
	
	if (strErrMsg != "")
	{
        //1050929	Kenny   [1050087]	二代公文系統相關修改
		//objFocus.focus();
        $('#'+objFocus).focus();
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
function fnQueryUser(argUserId_ID, argUserName_ID)
{
	Page_BlockSubmit = true;
    //1050929	Kenny   [1050087]	二代公文系統相關修改；因jf_ShowModal調整此處不再處理回傳值，回傳值改至CallBack函式處理--Start--
	//var ret = jf_ShowOrgDialogForPerson();
	//if(ret)
	//{
	//	document.all[argUserId_ID].value	= ret.Code;
	//	document.all[argUserName_ID].value	= ret.Name;
	//}
    jf_ShowOrgDialogForPerson();
    //1050929	Kenny   [1050087]	二代公文系統相關修改；因jf_ShowModal調整此處不再處理回傳值，回傳值改至CallBack函式處理--End--
}

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
        //1050929	Kenny   [1050087]	二代公文系統相關修改
		//document.all[argUserId_ID].focus();
        $('#'+argUserId_ID).focus();
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["無法檢核使用者資訊，請聯絡系統管理員處理。"])),"");
		return false;
	}
	if (!CallWsObj.value)
	{
		document.all[argUserId_ID].value = "";
		document.all[argUserName_ID].value = "";
		//1050929	Kenny   [1050087]	二代公文系統相關修改
		//document.all[argUserId_ID].focus();
        $('#'+argUserId_ID).focus();
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["找不到使用者["+strUserId+"]的資料，請重新輸入。"])),"");
		bHasCheck = false;
		return false;
	}
	document.all[argUserName_ID].value = CallWsObj.value;
	bHasCheck = false;
	return true;
}

function ViewReport(argBulletinId)
{
	document.all.txBulletinIdForAction.value = argBulletinId;
	document.all.txActionType.value = "ViewReport";
	jf_ShowWaitState();	
	//1060921 Cloud	修正預覽無作用問題
	__doPostBack("","");
}
function Notify(argBulletinId)
{
	document.all.txBulletinIdForAction.value = argBulletinId;
	document.all.txActionType.value = "Notify";
	jf_ShowWaitState();	
}

//1050929	Kenny   [1050087]	二代公文系統相關修改--Start--
function CallBack(argCallerId)
{   
    //叫用jf_ShowOrgDialogForPerson(TB_LIB)後於TB_LIB開啟IFC021時已限定type為Account故此處不需全部類型都判斷
    if ( argCallerId == "IFC021" )
    {
        document.all.txAccountName.value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all.txAccount.value = jf_Trim(document.all.lbReturnValue.options[0].value);
    }
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}
//1050929	Kenny   [1050087]	二代公文系統相關修改--End--