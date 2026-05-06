/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期	    SA	     	PG          單號	    概要
 * -------------------------------------------------------------------------------------------------
 * 0991105  David	  	                        增加小日曆
 * 1050526  Kevin       Zen         1050087     二代公文修改
 * 1051019  Leslie      Kenny       1050087     二代公文修改
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
//1050526 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1050526 Zen 1050087 二代公文修改
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	jf_ChangeSourceType();
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
		case "btDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txDateS, event.screenX, event.screenY);
			break;
		case "btDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txDateE, event.screenX, event.screenY);
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050526 Zen 1050087 二代公文修改
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
	
    //1050526 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{	
		case "btPrint":		
			Page_BlockSubmit = !jf_ConfirmPrint();			
		    //1050526 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1050526 Zen 1050087 二代公文修改
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
	/*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

//當rbRpt報表種類radio button 被按下時 onclick 檢查是否有改變報表種類
function jf_ChangeTextBox()
{
	var strToday = document.all.txToday.value;
	
	if( document.all.rbRpt_0.checked == true ) //選擇日報表
	{
		document.all.txDateS.maxLength = 7;
		document.all.txDateE.maxLength = 7;
		document.all.txDateS.value = strToday;
		document.all.txDateE.value = strToday;
	}
	if( document.all.rbRpt_1.checked == true ) //選擇月報表
	{	
		document.all.txDateS.maxLength = 5;
		document.all.txDateE.maxLength = 5;
		document.all.txDateS.value = strToday.substring(0,5);
		document.all.txDateE.value = strToday.substring(0,5);
	}
}

//dlSourceType onchange 時 檢查哪一項被選擇
function jf_ChangeSourceType()
{	
	if( document.all.dlSourceType.selectedIndex == 1 || document.all.dlSourceType.selectedIndex == 3 || document.all.dlSourceType.selectedIndex == 0 )
	{
		document.all.lbRcvOrg.className = "hide";
		document.all.dlRcvOrg.className = "hide";
	}
	else
	{
		document.all.lbRcvOrg.className = "InputFieldLabel";
		document.all.dlRcvOrg.className = "InputFieldLabel";
	}
}