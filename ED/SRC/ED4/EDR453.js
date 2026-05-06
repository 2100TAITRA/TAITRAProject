/*
DATE		SA		PRG		MGR_NO		DESC
1040119	    Kevin	Kenny	1030976		新增程式
1070301     Kevin   Justin  1050087     二代公文修改
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
//1070301 Justin [1050087] 二代公文修改
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
//1070301 Justin [1050087] 二代公文修改
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
//1070301 Justin [1050087] 二代公文修改 
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
	
    //1070301 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
		    //1070301 Justin [1050087] 二代公文修改
		    //document.all["txYearMonth"].focus();
			document.all["RadioButtonList1"][1].checked = true
			$('#txYearMonth').focus();
			break;
		case "btPrint":
			Page_BlockSubmit = !CheckDate();
		    //1070301 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !CheckDate();
		    //1070301 Justin [1050087] 二代公文修改 
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

function CheckDate()
{
	var bCheckM = true;
	var strYearMonth = jf_Trim(document.all["txYearMonth"].value);
	if(strYearMonth != "")
	{
		if(strYearMonth.length < 5)
		{
			strYearMonth = jf_PADL(strYearMonth,5,"0");
			document.all["txYearMonth"].value = strYearMonth;
		}
		if(!jf_CheckCDATE(strYearMonth + "01"))
		{
		    //document.all["txYearMonth"].value = "";
		    //1070301 Justin [1050087] 二代公文修改
		    //document.all["txYearMonth"].focus();
		    $('#txYearMonth').focus();
			bCheckM = false;
			alert("輸入的月份格式錯誤，請重新輸入");
		}
	}
	else
	{
	    //1070301 Justin [1050087] 二代公文修改
	    //document.all["txYearMonth"].focus();
	    $('#txYearMonth').focus();
		bCheckM = false;
		alert("請輸入查詢月份");
	}
	return bCheckM;
}
