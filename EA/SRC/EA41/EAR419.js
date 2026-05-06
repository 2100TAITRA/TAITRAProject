/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			SA		PG		單號		概要
 * -------------------------------------------------------------------------------------------------
 * 1060424		Kevin	Joe		1050087		二代升級
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

	//1060424	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1060424	Joe		1050087		二代公文修改
	// jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060424	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060424	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
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
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060424 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1060424 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			Autoinput();
			if(!CheckBeforePreview())
			{
				Page_BlockSubmit = !jf_ConfirmPrint();
				//1060424 Joe 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btPreview":
			Autoinput();
			if(!CheckBeforePreview())
			{
				Page_BlockSubmit = !jf_ConfirmPreview();
				//1060424 Joe 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
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
//若未輸入公文文號及檔號 則提示訊息
function CheckBeforePreview()
{
	var strtxDocNoS = jf_Trim(document.all.txDocNoS.value);
	var strtxDocNoE = jf_Trim(document.all.txDocNoE.value);
	
	var strtxYearS = jf_Trim(document.all.txYearS.value);
	var strtxYearE = jf_Trim(document.all.txYearE.value);
	
	var strtxClsS = jf_Trim(document.all.txClsS.value);
	var strtxClsE = jf_Trim(document.all.txClsE.value);
	
	var strtxCaseS = jf_Trim(document.all.txCaseS.value);
	var strtxCaseE = jf_Trim(document.all.txCaseE.value);
	
	var strtxVolS = jf_Trim(document.all.txVolS.value);
	var strtxVolE = jf_Trim(document.all.txVolE.value);
	
	var strtxSeqS = jf_Trim(document.all.txSeqS.value);
	var strtxSeqE = jf_Trim(document.all.txSeqE.value);
	
	var CheckRes = 0;
	var rtnRes = true;
	
	if(strtxDocNoS == "" && strtxDocNoE == "")
	{
		CheckRes+=1;
	}
	if((strtxYearS == "" || strtxClsS == "" || strtxCaseS == "" || strtxVolS  == "" || strtxSeqS == "") &&
		(strtxYearE == "" || strtxClsE == "" || strtxCaseE == "" || strtxVolE  == "" || strtxSeqE == ""))
	{
		CheckRes+=1;
	}
	
	if(CheckRes<2)
	{
		rtnRes = false;	
	}
	if(CheckRes==2)
	{
		 if(confirm("若未輸入公文文號/檔號，搜尋時間較長，是否繼續?")==true)
		 {
			rtnRes = false;	
		 }
	}	
	return rtnRes;
}
function Autoinput()
{
	var strtxDocNoS = jf_Trim(document.all.txDocNoS.value);
	var strtxDocNoE = jf_Trim(document.all.txDocNoE.value);
	
	var strtxYearS = jf_Trim(document.all.txYearS.value);
	var strtxYearE = jf_Trim(document.all.txYearE.value);
	
	var strtxClsS = jf_Trim(document.all.txClsS.value);
	var strtxClsE = jf_Trim(document.all.txClsE.value);
	
	var strtxCaseS = jf_Trim(document.all.txCaseS.value);
	var strtxCaseE = jf_Trim(document.all.txCaseE.value);
	
	var strtxVolS = jf_Trim(document.all.txVolS.value);
	var strtxVolE = jf_Trim(document.all.txVolE.value);
	
	var strtxSeqS = jf_Trim(document.all.txSeqS.value);
	var strtxSeqE = jf_Trim(document.all.txSeqE.value);
	
	if(strtxDocNoS != "" && strtxDocNoE == "")
	{
		document.all.txDocNoE.value = strtxDocNoS;
	}
	else if(strtxDocNoS == "" && strtxDocNoE != "")
	{
		document.all.txDocNoS.value = strtxDocNoE;
	}
	if((strtxYearS == "" && strtxClsS == "" && strtxCaseS == "" && strtxVolS  == "" && strtxSeqS == "") ||
		(strtxYearE == "" && strtxClsE == "" && strtxCaseE == "" && strtxVolE  == "" && strtxSeqE == ""))
	{
		if(strtxYearS != "" && strtxYearE == "")
		{
			document.all.txYearE.value = strtxYearS;
		}
		else if(strtxYearS == "" && strtxYearE != "")
		{
			document.all.txYearS.value = strtxYearE;
		}
		
		if(strtxClsS != "" && strtxClsE == "")
		{
			document.all.txClsE.value = strtxClsS;
		}
		else if(strtxClsS == "" && strtxClsE != "")
		{
			document.all.txClsS.value = strtxClsE;
		}
		
		if(strtxCaseS != "" && strtxCaseE == "")
		{
			document.all.txCaseE.value = strtxCaseS;
		}
		else if(strtxCaseS == "" && strtxCaseE != "")
		{
			document.all.txCaseS.value = strtxCaseE;
		}
		
		if(strtxVolS != "" && strtxVolE == "")
		{
			document.all.txVolE.value = strtxVolS;
		}
		else if(strtxVolS == "" && strtxVolE != "")
		{
			document.all.txVolS.value = strtxVolE;
		}
		
		if(strtxSeqS != "" && strtxSeqE == "")
		{
			document.all.txSeqE.value = strtxSeqS;
		}
		else if(strtxSeqS == "" && strtxSeqE != "")
		{
			document.all.txSeqS.value = strtxSeqE;
		}
	}
}
			
		