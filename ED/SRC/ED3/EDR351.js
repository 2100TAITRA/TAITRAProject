/*
 日期		SA			PG		單號		DESC
1001026		Yvonne		Jeff	1000787		新增程式
1061107 	David		Joe		1060284		升4.5新增ClientButtonControl
1120315     Leslie      Cloud   1120211     升級二代
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
//1120315         Cloud   1120211     升級二代
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
function ClientButtonControl()
{
	
	var xObjectName = document.activeElement.id;
	
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
//1120315         Cloud   1120211     升級二代
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
    //1120315         Cloud   1120211     升級二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
		    Page_BlockSubmit = !(jf_ConfirmPrint() && CheckPeriod() && Check_CDATE("txDate", "日期"));
		    //1120315         Cloud   1120211     升級二代
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !(jf_ConfirmPreview() && CheckPeriod() && Check_CDATE("txDate" , "日期" ));
		    //1120315         Cloud   1120211     升級二代
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
function jf_OnBlur(argDate)
{
	if (!Check_CDATE(argDate.id, "日期"))
		argDate.focus();
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
			document.all[argObj].focus();
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
	
	if (jf_Trim(document.all["txDate"].value) == "")
	{
		strErrMsg += "發文日期不可空白\n";
		document.all["txDate"].focus();
	}
	if (strErrMsg != "")
	{
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		return false ;
	}
	return true	;
}
