/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* 程式修改歷程 
* -------------------------------------------------------------------------------------------------
* 日期			系統分析師	修改人	單號			概要
* -------------------------------------------------------------------------------------------------
* 1000914		Yvonne		Cloud	1000599			新增各單位退件清單查詢作業
* 1060926       kevin       Justin  1050087         二代公文修改
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

//指定DataGrid欄位
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");
//1060926 Justin [1050087] 二代公文修改
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
//1060926 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}
	
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
	    /*1060926 Justin [1050087] 二代公文修改	
		case "btSendDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txRTNDateS"], event.screenX, event.screenY);
			break;
		case "btSendDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txRTNDateE"], event.screenX, event.screenY);
			break;
		case "btISSDATES":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txISSUEDateS"], event.screenX, event.screenY);
			break;
		case "btISSDATEE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txISSUEDateE"], event.screenX, event.screenY);
			break;*/
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060926 Justin [1050087] 二代公文修改 
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
	
    //1060926 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
		case "btPrint":
		case "btPreview":
	    case "btExcel":
	        Page_BlockSubmit =!CheckBeforeSearch();
	        //1060926 Justin [1050087] 二代公文修改 
	        //jf_ToolBarSubmit();
	        jf_ToolBarSubmit(xObjectName);
            break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforeSearch()
{
    var strSDate	=	jf_Trim(document.all.txRTNDateS.value);//退件日期起
	var strEDate	=	jf_Trim(document.all.txRTNDateE.value);//退件日期迄
	var strSDateS	=	jf_Trim(document.all.txISSUEDateS.value);//發文日期起
	var strSDateE	=	jf_Trim(document.all.txISSUEDateE.value);//發文日期迄
    var bRtn = true;
	if(strSDate == "" && strEDate == "")
	{
	    alert("退件日期起迄欄位不能皆為空");
	    //1060926 Justin [1050087] 二代公文修改
	    //document.all["txRTNDateS"].focus();
	    $('#txRTNDateS').focus();
		return false;
	}
	
	if(!CheckDATE("txRTNDateS","退件日期(起)"))
	{  
	   bRtn = false;
	 
	   return;
	}
	
	if(!CheckDATE("txRTNDateE","退件日期(迄)"))
	{
	 
		bRtn = false;
		return;
	}
	if(strSDate != "" && strEDate != "" && strSDate > strEDate)
	{
		document.all.txRTNDateE.value = strSDate;
		document.all.txRTNDateS.value = strEDate;
	}
	if(strSDateS != "" && strSDateE != "" && strSDateS > strSDateE)
	{
		document.all.txISSUEDateE.value = strSDateS;
		document.all.txISSUEDateS.value = strSDateE;
	}
	if(strSDate == "" && strEDate != "")
	{ 
	document.all.txRTNDateS.value = strEDate;
	
	}
	if(strSDate != "" && strEDate == "")
	{ 
	document.all.txRTNDateE.value = strSDate;
	
	}
	if(strSDateS == "" && strSDateE != "")
	{ 
	document.all.txISSUEDateS.value = strSDateE;
	
	}
	if(strSDateS != "" && strSDateE == "")
	{ 
	document.all.txISSUEDateE.value = strSDateS;
	
	}
	
	return bRtn;
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
		    //1060926 Justin [1050087] 二代公文修改
		    //document.all[argObj].focus();
		    $('#' + argObj).focus();
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}