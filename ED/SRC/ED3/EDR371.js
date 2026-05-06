/*****************************************************
 DATE	  SA		PRG		MGR_NO      DESC
1000908   Yvonne	Ken		1000597		新增程式
1060926   kevin     Justin  1050087     二代公文修改
********************************************************/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;
//1060926 Justin [1050087] 二代公文修改
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
//1060926 Justin [1050087] 二代公文修改
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
	    /*1060926 Justin [1050087] 二代公文修改
		case "ibDateS":
			Page_BlockSubmit=true; 
			jf_CallCalendar(document.all["txDateS"], event.screenX, event.screenY);
			break;
		case "ibDateE":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all["txDateE"], event.screenX, event.screenY);
			break;*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060926 Justin [1050087] 二代公文修改 
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
	
    //1060926 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
		case "btPreview":
	    case "btExcel":
			Page_BlockSubmit = !jf_CheckRequiredFile(); 
	        //1060926 Justin [1050087] 二代公文修改 
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

var CheckCount = 0;

function CheckDDATE(argObj,strMsg)
{
    if (CheckCount != 0)
	{
		CheckCount = 0;
		return;
	}

	var strDate = jf_Trim(document.all[argObj].value);
	if (strDate != "")
	{
		if (strDate.length < 5)
		{
			strDate = jf_PADL(strDate,5,'0');
			document.all[argObj].value = strDate;
		}
		strDate = strDate + '01'
		
		if (!jf_CheckCDATE(strDate))
		{
			CheckCount = 1;
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
		    //1060926 Justin [1050087] 二代公文修改
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
	var strSDate = jf_Trim(document.all.txDateS.value);
	var strEDate = jf_Trim(document.all.txDateE.value);

	if (strSDate == "" && strEDate == "")
	{
	    alert("統計月份起迄欄位不能皆為空");
	    //1060926 Justin [1050087] 二代公文修改
	    //document.all["txDateS"].focus();
	    $('#txDateS').focus();
		return false;
	}

	if(!CheckDDATE("txDateS","統計月份(起)",true))
		return false;

	if(!CheckDDATE("txDateE","統計月份(訖)",true))
		return false;
		

	// 當起值 > 迄值需作起迄交換	
	if(strSDate != "" && strEDate != "" && strSDate > strEDate )
	{
		document.all.txDateS.value = strEDate;
		document.all.txDateE.value = strSDate;
	}	
	
	if(strSDate == "" && strEDate != "")
	document.all.txDateS.value = strEDate;
	if(strEDate == "" && strSDate != "")
	document.all.txDateE.value = strSDate;
		return true ;
}