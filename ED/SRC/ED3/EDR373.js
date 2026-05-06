/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		系統分析師	修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1001114				Cloud	1000788 新增發文人員工作量列印作業
 * 1120315   Leslie     Cloud   1120211 升級二代
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
//* 1120315   Leslie     Cloud   1120211 升級二代
/*if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	rbLvCheck();
	
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
	
	    //* 1120315   Leslie     Cloud   1120211 升級二代
		/*case "btSendDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txIssueDateS"], event.screenX, event.screenY);
			break;
		case "btSendDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all["txIssueDateE"], event.screenX, event.screenY);
			break;*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//* 1120315        Cloud   1120211 升級二代
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
    //* 1120315        Cloud   1120211 升級二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
	
		case "btPrint":
		    Page_BlockSubmit = !CheckBeforeSearch();
		    //* 1120315        Cloud   1120211 升級二代
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
		    Page_BlockSubmit = !CheckBeforeSearch();
		    //* 1120315        Cloud   1120211 升級二代
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
function CheckBeforeSearch()
{
    var strSDate	=	jf_Trim(document.all.txIssueDateS.value);
	var strEDate	=	jf_Trim(document.all.txIssueDateE.value);
    var bRtn = true;
	if(strSDate == "" && strEDate == "")
	{
		alert("發文日期不可皆為空");
		document.all["txIssueDateS"].focus();
		return false;
	}
	
	if(!CheckDATE("txIssueDateS","發文日期(起)"))
	{  
	   bRtn = false;
	   return;
	}
	
	if(!CheckDATE("txIssueDateE","發文日期(迄)"))
	{
		bRtn = false;
		return;
	}
	if(strSDate != "" && strEDate != "" && strSDate > strEDate)
	{
		document.all.txIssueDateS.value = strEDate;
		document.all.txIssueDateE.value = strSDate;
	}

	if(strSDate == "" && strEDate != "")
	{ 
	document.all.txIssueDateS.value = strEDate;
	
	}
	if(strSDate != "" && strEDate == "")
	{ 
	document.all.txIssueDateE.value = strSDate;
	
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
			document.all[argObj].focus();
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}
function rbLvCheck()
{	
	if(document.all["rbRoleId1"].checked==true)
	{		
		document.all["dlUserOd93"].className="hide";
		document.all["dlUserOd92"].className="";
		document.all["dlUserOd92"].selectedIndex="0";
		return;
	}
	else
	{
		document.all["dlUserOd92"].className="hide";
		document.all["dlUserOd93"].className="";
		document.all["dlUserOd93"].selectedIndex="0";
	}
	
}

