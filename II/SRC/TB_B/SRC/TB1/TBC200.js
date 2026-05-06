/*
 * Date		SA		PG		MGR_NO		DESC
 * 1040323	Cloud	Kevin_C	1040136		加入小日歷，加入搜尋條件"公文文號"
 * 1050920  Cloud   Justin  1050087     二代公文修改
1051019	Leslie	Joe			1050087		二代修改配合行動平台
 * 1060627	Cloud	Kevin_C	1060508		修正非中榮機關因為沒有公文文號查詢條件，檢核會出錯的問題
 */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//記錄是否已檢核過有註冊onblur事件的欄位的值
var bHasCheck = false;

//1050920 Justin 1050087 二代公文修改 
//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
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
		/*
		case "":
			break;
		*/
	    //1040323	Kevin_C	1040136		加入小日歷
	    /*1050920 Justin 1050087 二代公文修改
		case "btDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txDateS, event.screenX, event.screenY);
			break;
		case "btDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txDateE, event.screenX, event.screenY);
			break;
        */
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050920 Justin 1050087 二代公文修改 
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
	
    //1050920 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			if (fnCheckBeforeSearch())
			{
				Page_BlockSubmit = !jf_CheckKeyObject();
			    //1050920 Justin 1050087 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			else
				Page_BlockSubmit = true;
			break;
		case "btPrint":
			if (fnCheckBeforeSearch())
			{
				Page_BlockSubmit = !jf_ConfirmPrint();
			    //1050920 Justin 1050087 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			else
				Page_BlockSubmit = true;
			break;
		case "btPreview":
			if (fnCheckBeforeSearch())
			{
				Page_BlockSubmit = !jf_ConfirmPreview();
			    //1050920 Justin 1050087 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			else
				Page_BlockSubmit = true;
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

//組出回傳值
function ReturnValue(argNo)
{
	if (!opener)
		return;
    opener.document.all.lbReturnValue.length = 1;
    opener.document.all.lbReturnValue.options[0].value = argNo;
    opener.window.CallBack("TBC200");
    opener.window.focus();
    close();
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//搜尋前檢查條件設定
function fnCheckBeforeSearch()
{
	if ( !CheckCDATE("txDateS", "公告日期(起)") || !CheckCDATE("txDateE", "公告日期(訖)") )
		return false;

	//1060627	Kevin_C	1060508		修正非中榮機關因為沒有公文文號查詢條件，檢核會出錯的問題 -S
	var bIsDocNoHasVal = false;
	if(document.all.txDocNoS && (jf_Trim(document.all.txDocNoS.value) || jf_Trim(document.all.txDocNoE.value)))
		bIsDocNoHasVal = true;
	//1060627	Kevin_C	1060508		修正非中榮機關因為沒有公文文號查詢條件，檢核會出錯的問題 -E
		
	if	(	!jf_Trim(document.all.txNoS.value) && !jf_Trim(document.all.txNoE.value) &&
			!jf_Trim(document.all.txDateS.value) && !jf_Trim(document.all.txDateE.value) && 
			!document.all.dlCategory.options[document.all.dlCategory.selectedIndex].value
			//1040324	Kevin_C	1040136		中榮需求，加入搜尋條件"公文文號"
			//1060627	Kevin_C	1060508		修正非中榮機關因為沒有公文文號查詢條件，檢核會出錯的問題
			//&& !jf_Trim(document.all.txDocNoS.value) && !jf_Trim(document.all.txDocNoE.value)
			&& !bIsDocNoHasVal
		)
	{
	    //1050920 Justin 1050087 二代公文修改
	    //document.all.txNoS.focus();
	    $('#txNoS').focus();
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array(["請至少輸入一個搜尋條件。"]) ), "" );
		return false;
	}

	return true;
}

//檢查日期格式
function CheckCDATE(argObj,strMsg)
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
		    //1050920 Justin 1050087 二代公文修改
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

