/*
DATE	SA		PRG		MGR_NO		DESC
1050427	David	Kenny	1030962		新增程式
1120315	Leslie	Cloud	1120211		升級二代
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
//1120315		Cloud	1120211		升級二代
/*if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	
	SetRangeType();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1120315		Cloud	1120211		升級二代
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1120315		Cloud	1120211		升級二代
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
		//1120315		Cloud	1120211		升級二代
		/*case "ibRcvDateS":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txRcvDateS, event.screenX, event.screenY);
			break;
		}
		case "ibRcvDateE":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txRcvDateE, event.screenX, event.screenY);
			break;
		}
		case "ibCloseDateS":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txCloseDateS, event.screenX, event.screenY);
			break;
		}		
		case "ibCloseDateE":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txCloseDateE, event.screenX, event.screenY);
			break;
		}	*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1120315		Cloud	1120211		升級二代
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
	//1120315		Cloud	1120211		升級二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btPreview":
			if (jf_CheckBeforPrint())
			{
				Page_BlockSubmit = !jf_ConfirmPreview();
				//1120315		Cloud	1120211		升級二代
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
	}
}


function jf_CheckBeforPrint()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	var strRcvDateS = document.all["txRcvDateS"].value ;
	var strRcvDateE = document.all["txRcvDateE"].value ;
	var strCloseDateS = document.all["txCloseDateS"].value ;
	var strCloseDateE = document.all["txCloseDateE"].value ;
	
	if( strRcvDateS != "" || strRcvDateE != "" )
	{
		if ( strRcvDateS == "" )
			strRcvDateS = strRcvDateE;
		if ( strRcvDateE == "" )
			strRcvDateE = strRcvDateS;
		if( strRcvDateS > strRcvDateE )
		{
			var strTemp = "" ;
			strTemp = strRcvDateS ;
			strRcvDateS = strRcvDateE ;
			strRcvDateE = strTemp ;
		}
		document.all["txRcvDateS"].value = strRcvDateS ;
		document.all["txRcvDateE"].value = strRcvDateE ;
	}
	
	if( strCloseDateS != "" || strCloseDateE != "" )
	{
		if ( strCloseDateS == "" )
			strCloseDateS = strCloseDateE;
		if ( strCloseDateE == "" )
			strCloseDateE = strCloseDateS;
		if( strCloseDateS > strCloseDateE )
		{
			var strTemp = "" ;
			strTemp = strCloseDateS ;
			strCloseDateS = strCloseDateE ;
			strCloseDateE = strTemp ;
		}
		document.all["txCloseDateS"].value = strCloseDateS ;
		document.all["txCloseDateE"].value = strCloseDateE ;
	}
	
	if (strRcvDateS == "" && strRcvDateE == "" && strCloseDateS == "" && strCloseDateE == "")
	{
		strErrMsg = "請至少輸入收文日期或結案日期其中一種條件";
		document.all["txRcvDateS"].focus();
	}
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
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

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function CheckDate(id, argErrText)
{
	var strDateValue ;
	strDateValue = document.all[id].value;
	if (strDateValue == "")
		return;
	
	strDateValue  = jf_PADL(strDateValue,7,"0");
	document.all[id].value = strDateValue;
	if (!jf_CheckCDATE(strDateValue))
	{
		jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argErrText])),"");
		document.all[id].focus();
		document.all[id].value="";
	}
}

function SetRangeType()
{
	if ( document.all.rbRptCount.checked )
	{
		document.all.rbAll.checked = true ;
		document.all.rbAll.disabled = true ;
		document.all.rbIn6Days.disabled = true ;
		document.all.rb7to14Days.disabled = true ;
		document.all.rb15to30Days.disabled = true ;
		document.all.rbOver31Days.disabled = true ;
	}
	else
	{
		document.all.rbAll.disabled = false ;
		document.all.rbIn6Days.disabled = false ;
		document.all.rb7to14Days.disabled = false ;
		document.all.rb15to30Days.disabled = false ;
		document.all.rbOver31Days.disabled = false ;
	}
}