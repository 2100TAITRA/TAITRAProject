/*
DATE	SA		PRG		MGR_NO	DESC
1001129 Yvonne	Kevin	1000868	各類公文辦理情形統計表
1061107	David	Joe		1060284	升4.5新增ClientButtonControl
1120315 Leslie  Cloud   1120211 升級二代	
*/

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1120315   Cloud   1120211 升級二代
/*if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/

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
*   Client Button 處理區
* 
*****************************************************************************/
//1061107	Joe		1060284		升4.5新增--S
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
	}	
}
//1061107	Joe		1060284		升4.5新增--E


/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1120315   Cloud   1120211 升級二代	
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
    //1120315   Cloud   1120211 升級二代	
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
		case "btPreview":
		    Page_BlockSubmit = !jf_ConfirmPrint();
		    //1120315   Cloud   1120211 升級二代	
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function jf_ConfirmPrint()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if(document.all.txYearMonthS.value==""&&document.all.txYearMonthE.value=="")
	{
		jf_ShowMeg("列印月份欄位不可皆為空白。","");
		document.all.txYearMonthS.focus();
		return false;
	}
	
	if(!jf_CheckMonth("txYearMonthS"))
		return false;
	if(!jf_CheckMonth("txYearMonthE"))
		return false;

	return bRtnbool;
}


/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//列印月份欄位Onblur時，自動補0以及檢查列印月份欄位是否符合格式
function jf_CheckMonth(argMonth)
{
	var bCheckM = true;
	var strMonth = jf_Trim(document.all[argMonth].value);
	if(strMonth != "")
	{
		if(strMonth.length < 5)
		{
			strMonth = jf_PADL(strMonth,5,"0");
			document.all[argMonth].value = strMonth;
		}
		if(strMonth>document.all["H_YearMonth"].value)
		{
			document.all[argMonth].value = "";
			document.all[argMonth].focus();
			bCheckM = false;
			alert("輸入的月份大於最大統計月份，請重新輸入");
		}
		if(!jf_CheckCDATE(strMonth + "01"))
		{
			document.all[argMonth].value = "";
			document.all[argMonth].focus();
			bCheckM = false;
			alert("輸入的月份格式錯誤，請重新輸入");
		}
	}
	return bCheckM;
}
