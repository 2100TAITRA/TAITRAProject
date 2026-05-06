/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			SA			PG		單號		概要
 * -------------------------------------------------------------------------------------------------
 * 1030515		David		Kenny	1020724		新增移文查詢作業
 //1051108      David       Zen     1050087     二代公文修改
 
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
var strTableFields = new Array("_hlLink", "_lbFromorgName", "_lbFromNo", "_lbAssignOrg", "_lbAssignDate", "_lbStatus");

//1051108 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
/*if(document.all.dg1)
	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;*/

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1051108 Zen 1050087 二代公文修改
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051108 Zen 1050087 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051108 Zen 1050087 二代公文修改
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
	    //1051108 Zen 1050087 二代公文修改
	    //case "btAssignDateS":
		//	Page_BlockSubmit=true;
		//	jf_CallCalendar(document.all["txAssignDateS"], event.screenX, event.screenY);
		//	break;
		//case "btAssignDateE":
		//	Page_BlockSubmit=true;
		//	jf_CallCalendar(document.all["txAssignDateE"], event.screenX, event.screenY);
		//	break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051108 Zen 1050087 二代公文修改
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
	
    //1051108 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btSearch":
			if ( jf_CheckBeforeSearch() )
			{
				Page_BlockSubmit = !jf_CheckKeyObject();
			    //1051108 Zen 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
				break;
			}
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
	/*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue( argDocNo )
{
	try
	{
	    opener.document.all.lbReturnValue.length = 1;  // 回傳值數量
	    opener.document.all.lbReturnValue.options[0].value = argDocNo;  // 將要回傳的物件放入lbReturnValue
	    opener.window.CallBack("EDI142");  // 呼叫母視窗執行Callback()
	    close();
	}
	catch (e) {}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_CheckBeforeSearch()
{
	var bRtnbool = true;
	var strErrMsg = "";

	jf_CheckDocNo() ;
	jf_CheckAssignDate() ;
	
	if ( !jf_CheckDocNo() && !jf_CheckAssignDate() && document.all["dlAssignOrg"].selectedIndex == 0 )
		strErrMsg += "請至少選擇一項輸入\n";

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}

	return bRtnbool;
}

function jf_CheckDocNo()
{
	var DocNoS = jf_Trim(document.all["txDocNoS"].value);
	var DocNoE = jf_Trim(document.all["txDocNoE"].value);
	if ( document.all["txDocNoS"].value != "" || document.all["txDocNoE"].value != "" )
	{
		if ( DocNoS != "" && DocNoE == "" )
			document.all["txDocNoE"].value = DocNoS ;
		else if ( DocNoS == "" && DocNoE != "" )
			document.all["txDocNoS"].value = DocNoE ;
		else if ( DocNoS > DocNoE )
		{
			document.all["txDocNoS"].value = DocNoE ;
			document.all["txDocNoE"].value = DocNoS ;
		}	
		
		return true ;
	}
	else 
		return false ;
	
}

function jf_CheckAssignDate()
{
	var DateS = jf_Trim(document.all["txAssignDateS"].value);
	var DateE = jf_Trim(document.all["txAssignDateE"].value);
	if ( DateS != "" || DateE != "" )
	{
		if ( DateS != "" && DateE == "" )
			document.all["txAssignDateE"].value = DateS ;
		else if ( DateS == "" && DateE != "" )
			document.all["txAssignDateS"].value = DateE ;
		else if ( DateS > DateE )
		{
			document.all["txAssignDateS"].value = DateE ;
			document.all["txAssignDateE"].value = DateS ;	
		}	
		
		return true ;
	}
	else 
		return false ;
}