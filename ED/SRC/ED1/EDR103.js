/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1050411	David	Joe 	1050087		二代公文修改
 * 1050520	David	JOE		1050087		二代系統升級，調整focus寫法
 * 1051019  Leslie  Kenny   1050087     二代公文修改
 */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050411 Joe 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

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
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050411 Joe 1050087 二代公文修改，參數多加event
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
	
	//1050411 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{
		case "btPrint":
			Page_BlockSubmit = !(jf_ConfirmPrint() && CheckPeriod());
			//1050411 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !(jf_ConfirmPreview() && CheckPeriod());
			//1050411 Joe 1050087 二代公文修改
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
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//argDate.focus();
		$('#' + argDate.id).focus();
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
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all[argObj].focus();
			$('#' + argObj).focus();			
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
	
	if (document.all["txDateS"].value == "")
	{
		strErrMsg += "起始日期不可空白\n";
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txDateS"].focus();
		$('#txDateS').focus();			
	}
	
	if (document.all["txDateE"].value == "")
	{
		strErrMsg += "結束日期不可空白\n";
		//1050520	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txDateE"].focus();
		$('#txDateE').focus();	
	}
	
	if (strErrMsg != "")
	{
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		return false ;
	}
	return true	;
}
