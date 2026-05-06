/*****************************************************
 DATE	  SA		PRG		MGR_NO      DESC
1001108	David	 	Ken		1000914		新增程式
1070112 David       Justin  1050087     二代公文修改
********************************************************/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//指定DataGrid欄位
var strTableFields = new Array("_hlLink","_lbRead1","_lbRead2");
//1070112 Justin [1050087] 二代公文修改
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
//1070112 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
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
	    /*1070112 Justin [1050087] 二代公文修改
		case "btPostDateS":
			jf_CallCalendar(document.all["txPostDateS"], event.screenX, event.screenY);
			Page_BlockSubmit = true;
			break;
		case "btPostDateE":
			jf_CallCalendar(document.all["txPostDateE"], event.screenX, event.screenY);
			Page_BlockSubmit = true;
			break;*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1070112 Justin [1050087] 二代公文修改 
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
	
    //1070112 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
		case "btPrint":
		case "btPreview":
		case "btExcel":
			Page_BlockSubmit = !jf_CheckRequiredFile();
		    //1070112 Justin [1050087] 二代公文修改 
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
//日期onblur

CheckCount = 0;

function CheckDDATE(argObj,strMsg)
{
    if (CheckCount != 0)
	{
		CheckCount = 0;
		return;
	}

	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
			CheckCount = 1;
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			document.all[argObj].value = "";
		    //1070112 Justin [1050087] 二代公文修改
		    //document.all[argObj].focus();
			$('#' + argObj).focus();
			CheckCount = 0;
			return false;
		}
	}	
	return true;
}

function jf_CheckRequiredFile()
{
	if (document.all["txPostDateS"].value == "" && document.all["txPostDateE"].value == "")
	{
	    alert("郵寄日期起迄欄位不能皆為空");
	    //1070112 Justin [1050087] 二代公文修改
		document.all["txPostDateS"].focus();
		$('#txPostDateS').focus();
		return false;
	}

	if(!CheckDDATE("txPostDateS","郵寄日期(起)",true))
		return false;

	if(!CheckDDATE("txPostDateE","郵寄日期(迄)",true))
		return false;
		
	var strSDate = document.all.txPostDateS.value;
	var strEDate = document.all.txPostDateE.value;

	// 當起值 > 迄值需作起迄交換	
	if(strSDate != "" && strEDate != "" && strSDate > strEDate )
	{
		document.all.txPostDateS.value = strEDate;
		document.all.txPostDateE.value = strSDate;
	}	
	
	if(strSDate == "" && strEDate != "")
	document.all.txPostDateS.value = strEDate;
	if(strEDate == "" && strSDate != "")
	document.all.txPostDateE.value = strSDate;
		return true ;
}