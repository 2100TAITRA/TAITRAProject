/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * DATE 	SA		PRG			MGR_NO	DESC
 * 1040417	David	Eric		1040131	新增改分銷號查詢作業
 * 1120589  Zen		Alexander   1120589 升二代公文修改
 * -------------------------------------------------------------------------------------------------
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
//1120589  Alexander  1120589 升二代公文修改
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
function ClientButtonControl()
{
	var xObjectName = document.activeElement.id;
	var pNo = xObjectName.substring(8,xObjectName.indexOf("_btProcess"));
	var btProcess;
	if (document.all["dg1__ctl"+pNo+"_btProcess"] != null)
	    btProcess = document.all["dg1__ctl" + pNo + "_btProcess"].id;

	var pNo2 = xObjectName.substring(8, xObjectName.indexOf("_btSend"));
	var btSend;
	if (document.all["dg1__ctl" + pNo2 + "_btSend"] != null)
	    btSend = document.all["dg1__ctl" + pNo2 + "_btSend"].id;
	
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
		case "btRcvDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txRcvDateS, event.screenX, event.screenY);
			break;
	    case "btRcvDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txRcvDateE, event.screenX, event.screenY);
			break;
		case "btTxTimeS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txTxTimeS, event.screenX, event.screenY);
			break;
	    case "btTxTimeE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txTxTimeE, event.screenX, event.screenY);
			break;
	    case btProcess:
	        var strPage = document.all.H_Http.value;
			var strUrl = strPage + "?pDocNo=" + document.all["dg1__ctl"+pNo+"_H_DOCNO"].value + "&SOURCE_ORGNO=" + document.all["H_OrgNo"].value + "&SAMLart=" + document.all["H_Artifact"].value;
			jf_OpenChildWin(strUrl, "FlowPage", 760, 520 );
			Page_BlockSubmit=true;
			break;
	    case btSend:
	        document.all.H_SendNo.value = parseInt(pNo2) - 2;
	        IsServerHandling = true;
	        Page_BlockSubmit = false;
	        __doPostBack('H_SendNo', '');
	        break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1120589  Alexander  1120589 升二代公文修改
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
	//1120589  Alexander  1120589 升二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !CheckBeforeSearch();
			//1120589  Alexander  1120589 升二代公文修改
			/*jf_ToolBarSubmit();*/
			jf_ToolBarSubmit(xObjectName);
			break;
		//1120589  Alexander  1120589 升二代公文修改
		//case "btDate":
		//	Page_BlockSubmit = true;
		//	jf_CallCalendar(document.all.txIssueDate, event.screenX, event.screenY);
		//break;
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
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
var CheckedDate = false;
var objName = "";
function CheckDATE(argObj,strMsg,argIsCheckDone)
{
	if(objName != argObj)
		CheckedDate = false;
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if(CheckedDate)
		{
			CheckedDate = false;
			return true;
		}
		if(argIsCheckDone)
			CheckedDate = true;

		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
			//1120589  Alexander  1120589 升二代公文修改
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
function CheckBeforeSearch()
{
	if(document.all.txRcvDateS.value == "" && document.all.txRcvDateE.value == "" && document.all.txTxTimeS.value == "" && document.all.txTxTimeE.value == "")
	{
		alert("請至少輸入一個條件");
		return false;
	}
	var strDateS = document.all.txRcvDateS.value;
	var strDateE = document.all.txRcvDateE.value;
	if(strDateS != "" && strDateE != "" && strDateS > strDateE)
	{
		document.all.txRcvDateS.value = strDateE;
		document.all.txRcvDateE.value = strDateS;
	}
	var strTimeS = document.all.txTxTimeS.value;
	var strTimeE = document.all.txTxTimeE.value;
	if(strTimeS != "" && strTimeE != "" && strTimeS > strTimeE)
	{
		document.all.txTxTimeS.value = strTimeE;
		document.all.txTxTimeE.value = strTimeS;
	}
	if(!CheckDATE("txRcvDateS","收(創)文日期(起)",true))
		return false;
	if(!CheckDATE("txRcvDateE","收(創)文日期(訖)",true))
		return false;
	if(!CheckDATE("txTxTimeS","改分銷號日期(起)",true))
		return false;
	if(!CheckDATE("txTxTimeE","改分銷號日期(訖)",true))
		return false;
	return true;
}
function jf_TypeOnchange(argValue,argCount)
{
    var i = parseInt(argCount)+2;
    if (document.all["dg1__ctl" + i + "_dlType"].selectedIndex == 0)
    {
        document.all["dg1__ctl" + i + "_dlUnit"].className = "";
    }
    else
    {
        document.all["dg1__ctl" + i + "_dlUnit"].className = "hide";
    }
}