/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1050315      Kenny   1050087 二代公文系統相關修改
 * 1051019      Kenny   1050087 二代公文修改
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

//指定DataGrid欄位
//var strTableFields = new Array("_hlLink","_lbRead1","_lbRead2");

//1050315	Kenny   [1050087]	二代公文系統相關修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;


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
//1050315	Kenny   [1050087]	二代公文系統相關修改
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
	
	//1050315	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btPrint":
			Page_BlockSubmit = !(jf_ConfirmPrint() && CheckPeriod());
			//1050315	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !(jf_ConfirmPreview() && CheckPeriod());
			//1050315	Kenny   [1050087]	二代公文系統相關修改
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
		}
		else
		{
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
function ReturnValue(argLink, argRead1, argRead2)
{

}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_OnBlur(argDate)
{
	if (!Check_CDATE(argDate.id, "日期"))
		//1050315	Kenny   [1050087]	二代公文系統相關修改
		//argDate.focus();
		$('#'+argDate).focus();
}
var bHasCheck = false;

function Check_CDATE(argObj , strMsg )
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
			if (strDate.length < 5)
			{
				strDate = jf_PADL(strDate,5,'0');
				document.all[argObj].value = strDate;
			}
		if (!jf_Check_CDATE(strDate , 5))
		{
			//1050315	Kenny   [1050087]	二代公文系統相關修改
			//document.all[argObj].focus();
			$('#'+argObj).focus();
			if (strMsg)
				jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}

function jf_Check_CDATE(argStr , arglength) 
{
	// adapting for other layouts should be easy
	if (argStr.length < arglength)
		{argStr = jf_PADL(argStr,arglength,'0');}
	var pYear,pMonth,pDay;
	pYear=parseInt(argStr.substring(0,3),10)+1911;
	pMonth=parseInt(argStr.substring(3,5),10);
	pDay = arglength ;
	if (!jf_validDate(pYear, pMonth-1, pDay)) 
		{return false}
	else 
		{return true}
	
	bHasCheck = false;
	return true;
}
function jf_validDate(y, m, d) // m = 0..11
 { with (new Date(y, m, d)) return ((getMonth()==m)) }

function CheckPeriod()
{
	var strErrMsg	=	""	;
	var strTemp		=	""	;
	var	strDateS	=	""	;
	var	strDateE	=	""	;
	var strMax		=	""	;
	var	strMin		=	""	;
	var strYearS	=	""	;
	var strYearE	=	""	;
	var strMonS		=	""	;
	var strMonE		=	""	;
	var period		=	""	;
	
	if (document.all["txDateS"].value == "")
	{
		strErrMsg += "起始日期不可空白\n";
		//1050315	Kenny   [1050087]	二代公文系統相關修改
		//document.all["txDateS"].focus();
		$('#txDateS').focus();
	}
	
	if (document.all["txDateE"].value == "")
	{
		strErrMsg += "結束日期不可空白\n";
		//1050315	Kenny   [1050087]	二代公文系統相關修改
		//document.all["txDateE"].focus();
		$('#txDateE').focus();
	}
	
	strDateS	=	document.all.txDateS.value;
	strDateE	=	document.all.txDateE.value;
	
	if(strDateS > strDateE)
	{
		strTemp		=	strDateS	;
		strDateS	=	strDateE	;
		strDateE	=	strTemp		;
	}
	
	strYearS	=	parseInt(strDateS.substring(0,3),10)
	strYearE	=	parseInt(strDateE.substring(0,3),10)
	strMonS		=	parseInt(strDateS.substring(3,5),10);
	strMonE		=	parseInt(strDateE.substring(3,5),10);	
	
	period=(strYearE-strYearS)*12+(strMonE-strMonS)+1	;
	
	if(period>12)
	{
		strErrMsg += "請縮小查詢期間至一年內\n";
		//1050315	Kenny   [1050087]	二代公文系統相關修改
		//document.all["txDateS"].focus();
		$('#txDateS').focus();
	}
	
	if (strErrMsg != "")
	{
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		return false ;
	}
	return true	;
}
