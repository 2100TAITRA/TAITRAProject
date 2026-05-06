/*
DATE		SA			PRG		MGR_NO			DESC
1060217		Cloud		Joe		1050087		二代公文修改
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1060217	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
	
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060217 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1060217 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			if(!CheckYear())
				return;
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1060217 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if(!CheckYear())
				return;
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1060217 Joe 1050087 二代公文修改
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
function PadYearLeft(argFld)
{
	var strYear = jf_Trim(document.all[argFld].value);
	if(strYear != "")
		document.all[argFld].value = jf_PADL(strYear, 3, "0");
}

function CheckYear()
{
	//檔案年度
	var strFileYearS = jf_Trim(document.all.txFileYearS.value);
	var strFileYearE = jf_Trim(document.all.txFileYearE.value);
	
	if(strFileYearS != "" && strFileYearE != "")
	{
		strFileYearS = jf_PADL(strFileYearS, 3, "0");
		strFileYearE = jf_PADL(strFileYearE, 3, "0");
		
		if(strFileYearS > strFileYearE)
		{
			var strTemp = strFileYearS;
			strFileYearS = strFileYearE;
			strFileYearE = strTemp;
		}
	}
	else if(strFileYearS != "" && strFileYearE == "")
	{
		strFileYearS = jf_PADL(strFileYearS, 3, "0");
		strFileYearE = strFileYearS;
	}
	else if(strFileYearS == "" && strFileYearE != "")
	{
		strFileYearE = jf_PADL(strFileYearE, 3, "0");
		strFileYearS = strFileYearE;
	}
	
	document.all.txFileYearS.value = strFileYearS;
	document.all.txFileYearE.value = strFileYearE;
	
	//統計擬銷毀年度
	var strPdesYearS = jf_Trim(document.all.txPdesYearS.value);
	if(strPdesYearS == "000")
		strPdesYearS = "";
	var strPdesYearE = jf_Trim(document.all.txPdesYearE.value);
	if(strPdesYearE == "000")
		strPdesYearE = "";
	
	if(strPdesYearS != "" && strPdesYearE != "")
	{
		strPdesYearS = jf_PADL(strPdesYearS, 3, "0");
		strPdesYearE = jf_PADL(strPdesYearE, 3, "0");
		
		if(strPdesYearS > strPdesYearE)
		{
			var strTemp = strPdesYearS;
			strPdesYearS = strPdesYearE;
			strPdesYearE = strTemp;
		}
	}
	else if(strPdesYearS != "" && strPdesYearE == "")
	{
		strPdesYearS = jf_PADL(strPdesYearS, 3, "0");
		strPdesYearE = strPdesYearS;
	}
	else if(strPdesYearS == "" && strPdesYearE != "")
	{
		strPdesYearE = jf_PADL(strPdesYearE, 3, "0");
		strPdesYearS = strPdesYearE;
	}
	else
	{
		alert("請輸入統計擬銷毀年度");
		//1060217	Joe	1050087	二代系統升級，調整focus寫法
		// document.all.txPdesYearS.focus();
		$('#' + document.all.txPdesYearS.id).focus();
		return false;
	}
	
	document.all.txPdesYearS.value = strPdesYearS;
	document.all.txPdesYearE.value = strPdesYearE;
	
	return true;
}

