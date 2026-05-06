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
			Page_BlockSubmit = !(jf_ConfirmPrint() && CheckDateStyle() );
			//1050411 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !(jf_ConfirmPreview() && CheckDateStyle() );
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
function fnDeptOnChange()
{
	document.all.txRcvDept.value = document.all.dlDept.options[document.all.dlDept.selectedIndex].text ;
}

var bHasCheck = false;

function CheckDateStyle()
{
	var	strErrMsg	=	""	;
	var bRtnbool = true;
	var strRcvDateTimeS	=	document.all.txRcvDateTimeS.value	;
	var strRcvDateTimeE	=	document.all.txRcvDateTimeE.value	;
	var strRcvDateS		=	""	;
	var strRcvDateE		=	""	;

	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	
	if (strRcvDateTimeS != "" )
	{
		if (strRcvDateTimeS.length != 7 && strRcvDateTimeS.length != 11)
		{
			strErrMsg += "起始時間格式錯誤\n";
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txRcvDateTimeS"].focus();
			$('#txRcvDateTimeS').focus();
		}
		strRcvDateS = strRcvDateTimeS.substr(0,7);
		if(!jf_CheckCDATE(strRcvDateS))
		{
			strErrMsg += "起始時間格式錯誤\n";
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txRcvDateTimeS"].focus();
			$('#txRcvDateTimeS').focus();
		}
	}
	
	if(strRcvDateTimeE != "" )
	{
		if (strRcvDateTimeE.length != 7 && strRcvDateTimeE.length != 11)
		{
			strErrMsg += "結束時間格式錯誤\n";
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txRcvDateTimeE"].focus();
			$('#txRcvDateTimeE').focus();
		}
		strRcvDateE = strRcvDateTimeE.substr(0,7);
		
		if(!jf_CheckCDATE(strRcvDateE))
		{
			strErrMsg += "結束時間格式錯誤\n";
			//1050520	Joe	1050087	二代系統升級，調整focus寫法
			//document.all["txRcvDateTimeE"].focus();
			$('#txRcvDateTimeE').focus();
		}
	}
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	return bRtnbool;
}





