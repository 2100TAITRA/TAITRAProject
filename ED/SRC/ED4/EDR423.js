/*
DATE	SA		PRG		MGR_NO				DESC
1061024	Kevin	Joe		1050087				二代升級
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

//1061024	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1061024	Joe		1050087		二代公文修改
	// jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1061024	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1061024	joe		1050087		二代修改配合行動平台
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
//1061024 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1061024 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
	
		case "btStatic":  //執行統計
			var xUrl = "../../../ODDEP/ODP420.aspx?nMode=EXEC&SAMLart="+document.all.H_Artifact.value;
			jf_OpenChildWin(xUrl,"ODP420",760,500);
			Page_BlockSubmit = true;
			break;
		case "btExcel":
			Page_BlockSubmit = CheckBeforeSearch();
			//1061024 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}


/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforeSearch()
{
	var bRtn = false;
	if(strSDate == "" && strEDate == "")
	{
		alert("列印年度不可皆為空");
		//1061024	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["txYearMonthS"].focus();
		$('#txYearMonthS').focus();
		bRtn = true;
	}
	if(!CheckDATE("txYearMonthS","列印年度(起)"))
	{
		bRtn = false;
		return;
	}
	if(!CheckDATE("txYearMonthE","列印年度(迄)"))
	{
		bRtn = false;	 
		return;
	}
	var strSDate	=	jf_Trim(document.all.txYearMonthS.value);
	var strEDate	=	jf_Trim(document.all.txYearMonthE.value);
	var strLDate	=	jf_Trim(document.all.H_txLastY.value);
	if(strSDate != "" && strEDate != "" && strSDate > strEDate)
	{
		document.all.txYearMonthE.value = strSDate;
		document.all.txYearMonthS.value = strEDate;
	}
	if(strSDate == "" && strEDate != "")
	{ 
	document.all.txYearMonthS.value = strEDate;
	
	}
	if(strSDate != "" && strEDate == "")
	{ 
	document.all.txYearMonthE.value = strSDate;
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
	var strLDate	=	jf_Trim(document.all.H_txLastY.value);
	if (strDate != "")
	{
		if (strDate.length < 3)
		{
			strDate = jf_PADL(strDate,3,'0');
			document.all[argObj].value = strDate;
			
		}
	}
	if(strDate>strLDate)
	{
		alert(strMsg+"不可大於最後統計年限");
		//1061024	Joe	1050087	二代系統升級，調整focus寫法
		// document.all[argObj].focus();
		$('#' + argObj).focus();
		bHasCheck = false;
		return false;
	}
	bHasCheck = false;
	return true;
}
