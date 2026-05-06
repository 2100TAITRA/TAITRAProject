/*
DATE	SA		PRG		MGR_NO				DESC
1050825	Kevin	Joe		1050087				二代升級
1051019 Leslie  Kenny   1050087             二代公文修改
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

//1050825 Joe 1050087 二代公文修改--S
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1050825 Joe 1050087 二代公文修改--E

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1050825 Joe 1050087 二代公文修改
	// jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
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
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050825 Joe 1050087 二代公文修改，參數多加event
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
	
	//1050825 Joe 1050087 二代公文修改
	// xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		case "btStatic":  //執行統計
			var xUrl = "../../../ODDEP/ODP420.aspx?nMode=EXEC&SAMLart="+document.all.H_Artifact.value;			
			//1050825 Joe 1050087 二代公文修改
			// jf_OpenChildWin(xUrl,"ODP420",760,500);
			jf_OpenChildWin(xUrl,"ODP420",800,600);
			Page_BlockSubmit = true;
			break;
		case "btExcel":
			if(!CheckBeforeExcuteExcel())
			{
				Page_BlockSubmit = false;
				//1050825 Joe 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			else
			{
				Page_BlockSubmit = true;
			}
			break;
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforeExcuteExcel()
{	
	var strSDate = document.all.txYearMonthS.value;
	var strEDate = document.all.txYearMonthE.value;
	if(strSDate == "" && strEDate == "")
	{
		alert("列印年月不可皆為空");
		//1050825	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["txYearMonthS"].focus();
		$('#txYearMonthS').focus();
		bRtn = true;
		return;
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
	var strLDate = document.all.H_txLastY.value;
	var bRtn = false;
	
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
function CheckDATE(argObj,strMsg)
{	
	bHasCheck = true;
	var strDate = document.all[argObj].value;
	var strLDate	=	document.all.H_txLastY.value;
	if (strDate != "")
	{
		if((strDate%100)>12||(strDate%100)<1)
		{
			alert(strMsg+"月份錯誤");
			//1050825	Joe	1050087	二代系統升級，調整focus寫法
			// document.all[argObj].focus();
			$('#'+argObj).focus();
			bHasCheck = false;
			return bHasCheck;
		}
		if(strDate>strLDate)
		{
			alert(strMsg+"不可大於最後統計年限");
			//1050825	Joe	1050087	二代系統升級，調整focus寫法
			// document.all[argObj].focus();
			$('#'+argObj).focus();
			bHasCheck = false;
			return bHasCheck;
		}
	}
	return bHasCheck;
}
