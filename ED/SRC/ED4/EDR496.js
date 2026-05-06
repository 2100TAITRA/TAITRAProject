/*
DATE	SA		PRG		MGR_NO		DESC
1050719	KEVIN	JOE		1050087		二代系統升級
1051019 Leslie  Kenny   1050087     二代公文修改
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

//1050719 Joe 1050087 二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
//1050719 Joe 1050087 二代公文修改
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
//1050719 Joe 1050087 二代公文修改，傳入event參數
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
	//1050719 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			if(jf_CheckMonth("tbSMonth") && jf_CheckMonth("tbEMonth"))
			{
				Page_BlockSubmit = !(jf_ConfirmPrint() && jf_CheckBeforePrint());
				//1050719 Joe 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btPreview":
			if(jf_CheckMonth("tbSMonth") && jf_CheckMonth("tbEMonth"))
			{
				Page_BlockSubmit = !(jf_ConfirmPreview() && jf_CheckBeforePrint());
				//1050719 Joe 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
	}
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
		if(!jf_CheckCDATE(strMonth + "01"))
		{
			document.all[argMonth].value = "";
			//1050719 Joe 1050087 二代公文修改
			//document.all[argMonth].focus();
			$('#' + argMonth).focus();
			bCheckM = false;
			alert("輸入的月份格式錯誤，請重新輸入");
		}
	}
	return bCheckM;
}
//檢核欄位不可為空白、大小順序、是否大於最大統計月份
function jf_CheckBeforePrint()
{
	var bChecked = true;
	var strS = jf_Trim(document.all.tbSMonth.value);
	var strE = jf_Trim(document.all.tbEMonth.value);
	var strH = jf_Trim(document.all.H_MaxYearMonth.value);
	
	if( strS > strH  || strE > strH)
	{
		//1050719 Joe 1050087 二代公文修改
		//document.all.tbEMonth.focus();
		$('#' + document.all.tbEMonth.id).focus();
		bChecked = false;
		alert( "列印月份不可大於最大統計月份");
		return bChecked;
	}
	if( strS == "" &&  strE == "")
	{
		//1050719 Joe 1050087 二代公文修改
		//document.all.tbSMonth.focus();
		$('#' + document.all.tbSMonth.id).focus();
		bChecked = false;
		alert("列印月份欄位不可皆為空白");
		return bChecked;
	}
	
	if( strS != "" && strE == "")
	{
		document.all.tbEMonth.value = strS;
	}
	else if( strS == "" && strE != "")
		document.all.tbSMonth.value = strE;
	else if( strS > strE)
	{
		document.all.tbSMonth.value = strE;
		document.all.tbEMonth.value = strS;
	}
	return bChecked;
}
