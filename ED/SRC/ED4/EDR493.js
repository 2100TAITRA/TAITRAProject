/*
DATE 	 SA		 PRG	  MGR_NO	DESC
1061023	 Kevin	 Joe	 1050087	二代升級
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

//1061023	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1061023	Joe		1050087		二代公文修改
	// jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1061023	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1061023	joe		1050087		二代修改配合行動平台
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
//1061023 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1061023 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			if(jf_CheckMonth("txYearMonthS") && jf_CheckMonth("txYearMonthE"))
			{
				Page_BlockSubmit = !(jf_ConfirmPrint() && jf_CheckBeforePrint());
				//1061023 Joe 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btPreview":
			if(jf_CheckMonth("txYearMonthS") && jf_CheckMonth("txYearMonthE"))
			{
				Page_BlockSubmit = !(jf_ConfirmPreview() && jf_CheckBeforePrint());
				//1061023 Joe 1050087 二代公文修改
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
			//1061023	Joe	1050087	二代系統升級，調整focus寫法
			// document.all[argMonth].focus();
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
	var strS = jf_Trim(document.all.txYearMonthS.value);
	var strE = jf_Trim(document.all.txYearMonthE.value);
	var strH = jf_Trim(document.all.h_MaxYearMonth.value);
	if( strS == "" &&  strE =="")
	{
		//1061023	Joe	1050087	二代系統升級，調整focus寫法
		// document.all.txYearMonthS.focus();
		$('#' + document.all.txYearMonthS.id).focus();
		bChecked = false;
		alert("列印月份欄位不可皆為空白");
	}
	
	if( strS != "" && strE == "")
		document.all.txYearMonthE.value = strS;
	else if( strS == "" && strE != "")
		document.all.txYearMonthS.value = strE;
	else if( strS > strE)
	{
		document.all.txYearMonthS.value = strE;
		document.all.txYearMonthE.value = strS;
	}
	
	if( strS > strH  || strE > strH)
	{
		//1061023	Joe	1050087	二代系統升級，調整focus寫法
		// document.all.txYearMonthE.focus();
		$('#' + document.all.txYearMonthE.id).focus();
		bChecked = false;
		alert( "列印月份不可大於最大統計月份");
	}
	return bChecked;
}
