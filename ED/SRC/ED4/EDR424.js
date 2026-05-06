/*
DATE	SA		PRG		MGR_NO				DESC
1010326 Kevin   Ivory   1010190             新增程式
1061026	Kevin	Joe		1050087				二代升級
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

//1061026	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1061026	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1061026	joe		1050087		二代修改配合行動平台
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
//1061026 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1061026 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btStatic":
			var xUrl = "../../../ODDEP/ODP420.aspx?nMode=EXEC&SAMLart="+document.all.H_Artifact.value;
			jf_OpenChildWin(xUrl,"ODP420",760,500);
			Page_BlockSubmit = true;
			break;
		case "btExcel":
			Page_BlockSubmit = !CheckBeforeRemitting();
			//1061026 Joe 1050087 二代公文修改
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

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function  CheckBeforeRemitting()
{
	var bRtnbool = true;
	var year2  = document.all.hMaxMonth.value.substr(0,3);
	var month2 = document.all.hMaxMonth.value.substr(3,2);
	
	if(jf_Trim(document.all.txYearMonth.value) != "")
	{
		var strMonth = jf_Trim(document.all.txYearMonth.value);
		if(strMonth.length < 5)
		{
			strMonth = jf_PADL(strMonth,5,"0");
			document.all.txYearMonth.value = strMonth;
		}
		if(!jf_CheckCDATE(strMonth + "01"))
		{
			document.all.txYearMonth.value = "";
			//1061026	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txYearMonth"].focus();
			$('#txYearMonth').focus();
			strErrMsg = "輸入的月份格式錯誤，請重新輸入\n";
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );			
		}
		var year1 = document.all.txYearMonth.value.substr(0,3);
		var month1 = document.all.txYearMonth.value.substr(3,2);
		if(document.all.txYearMonth.value.substr(3,2) == "00")
		{
			strErrMsg = "列印月份不可等於0\n";
			//1061026	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txYearMonth"].focus();
			$('#txYearMonth').focus();
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		}
		
		if(year1>year2||(year1==year2&&month1>month2))
		{
			strErrMsg = "列印月份不可大於目前統計最大月份\n";
			//1061026	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txYearMonth"].focus();
			$('#txYearMonth').focus();
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		}
		if( month2 > 12 )
		{
			strErrMsg = "列印月份格式錯誤\n";
			//1061026	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txYearMonth"].focus();
			$('#txYearMonth').focus();
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );		
		}
	}
	else
	{
		strErrMsg = "列印月份欄位不可為空白\n";
		//1061026	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["txYearMonth"].focus();
		$('#txYearMonth').focus();
		bRtnbool =false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		return bRtnbool;
	}
	
	
	return bRtnbool;
}
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
			//1061026	Joe	1050087	二代系統升級，調整focus寫法
			// document.all[argMonth].focus();
			$('#' + argMonth).focus();
			bCheckM = false;
			alert("輸入的月份格式錯誤，請重新輸入");
		}
	}
	return bCheckM;
}