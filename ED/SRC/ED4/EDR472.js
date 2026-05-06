/*****************************************************
 DATE	  SA		PRG		MGR_NO      DESC
1000927   David 	Ken		1000596		新增程式
1061006	  Kevin		Joe		1050087		二代升級
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

//1061006	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

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
//1061006	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1061006	joe		1050087		二代修改配合行動平台
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
//1061006 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1061006 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
		case "btPreview":
	    case "btExcel":
			Page_BlockSubmit = !jf_CheckRequiredFile(); 
			//1061006 Joe 1050087 二代公文修改
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

function CheckYDATE(argObj,strMsg)
{

    var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 3)
		{
			strDate = jf_PADL(strDate,3,'0');
			document.all[argObj].value = strDate;
		}
	}
	
	return true;
}

function CheckMDATE(argObj,strMsg)
{

    if (CheckCount != 0)
	{
		CheckCount = 0;
		return;
	}

	var strDate = document.all[argObj].value;
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
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			//1061006	Joe	1050087	二代系統升級，調整focus寫法
			// document.all[argObj].focus();
			$('#' + argObj).focus();
			CheckCount = 0;
			return false;
		}
	}
	
	return true;
}

function jf_CheckRequiredFile()
{
	if(!CheckYDATE("txYear","統計年份",true))
		return false;

	if(!CheckMDATE("txMonth","統計月份",true))
		return false;
		
	if (document.all["rbYrpt"].checked && document.all["txYear"].value == "")
	{
		alert("年報表統計年份不可為空");
		//1061006	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["txYear"].focus();
		$('#txYear').focus();
		return false;
	}
	
	if (document.all["rbMrpt"].checked && document.all["txMonth"].value == "")
	{
		alert("月報表統計月份不可為空");
		//1061006	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["txMonth"].focus();
		$('#txMonth').focus();
		return false;
	}	
		
	return true ;
}