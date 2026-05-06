/*
DATE	SA		PG		MGR_NO			DESC
1000323	David	David	1000278			新增程式
1031112	Leslie	Kevin_C	1020726	        於__doPostBack前加上IsServerHandling=true,避免重複執行
1050928 Cloud   Justin  1050087         二代公文修改
1051019	Leslie	Joe			1050087		二代修改配合行動平台
1070803 Kevin   Justin	1070678			弱掃修正Client Cookies Inspection
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

//指定DataGrid欄位
var strTableFields = new Array("_hlLink","_lbRead1","_lbRead2");
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
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
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
		case "btPrint":
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
		strErrMsg += "請至少輸入一個搜尋條件。";
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
	
	if(!CheckDATE("txStartDate","公告日期(起)",true))
		return false;
	if(!CheckDATE("txEndDate","公告日期(訖)",true))
		return false;
	
	return bRtnbool;
}

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

//日期欄位檢核
var CheckedDate = false;
var ObjName = "";
var strBDate = "";
function CheckDATE(argObj,strMsg,argIsCheckDone)
{
	if(ObjName != argObj)
		CheckedDate = false;
	ObjName = argObj;
	
	var strDate = document.all[argObj].value;
	
		
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}

		if(strBDate != strDate)
			CheckedDate = false;	
		
		strBDate = strDate;

		if(CheckedDate)
		{
			CheckedDate = false;
			return true;
		}
		if(argIsCheckDone)
			CheckedDate = true;

		if (!jf_CheckCDATE(strDate))
		{
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
		    //1050928 Justin 1050087 二代公文修改
		    //document.all[argObj].focus();
			$('#' + argObj).focus();
			CheckedDate = false;
			return false;
		}
		else
			return true;
	}
	else
		return true;
}

//通知未點閱人員
function Notify()
{
	//判斷畫面上是否還有需要通知的人
	var bNeedSend = false;
	for(var i = 2; i <= document.all.dg1.rows.length ; i++)
	{
	    //1050928 Justin 1050087 二代公文修改
		//if(document.all["dg1__ctl" + i + "_lbSignDate"].innerText == "")
	    if (document.all["dg1__ctl" + i + "_lbSignDate"].textContent == "")
		{
			bNeedSend = true;
			break;
		}
	}

	if(!bNeedSend)
		alert("無須通知人員");
	else
	{
		if(document.all["txNotify"].value == "")
		{
		    document.all["txNotify"].value = "Notify";
		    //1031112    Kevin_C[1020726]   IsServerHandling = true;放在__doPostBack下面無效，交換順序
			IsServerHandling = true;
			jf_ShowWaitState()
			__doPostBack("txNotify", "");
		}
	}

}