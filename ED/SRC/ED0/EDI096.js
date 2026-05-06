/*
DATE 		SA		PRG		MGR_NO		DESC
1020904		Yvonne	Eileen	1020438		新增程式
1050719     David   Zen     1050087     二代公文修改
1051019     Leslie  Kenny   1050087     二代公文修改
*/

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050720 Zen 1050087  二代公文修改
//document.all.txType.focus();
$('#txType').focus();

// 10201004	Eileen	檢查是否有值，若有值則補零；若沒有值則不做任何事
//1050720 Zen 1050087  二代公文修改
//document.all.txType.onblur = CheckValueLength ;

//1050720 Zen 1050087  二代公文修改
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
//1050720 Zen 1050087  二代公文修改
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
	
    //1050720 Zen 1050087  二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !CheckBeforeSearch();
		    //1050720 Zen 1050087  二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function CheckBeforeSearch()
{
	var bRtnbool = true;
	var strErrMsg= ""; // error message
	var SearchConditions = false ;
	
	//畫面上顯示大寫只是效果，讓類別代碼實際的值變成大寫
	document.all.txType.value = jf_Trim(document.all.txType.value.toUpperCase());	
	document.all.txTypeName.value = jf_Trim(document.all.txTypeName.value);
	
	// 各欄位去前、後空白的值
	var strType = jf_Trim( document.all.txType.value); // 類別代碼
	var strDept = jf_Trim(document.all.dlDept.value); // 附件所屬單位
	var strTypeName = jf_Trim(document.all.txTypeName.value); // 類別名稱
	
	if ( strType == "" && strDept == "" && strTypeName == "" )
	{
		strErrMsg += "請至少輸入一組查詢條件。\n";
	    //1050720 Zen 1050087  二代公文修改
		//document.all.txType.focus();
		$('#txType').focus();
	}
	
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}
/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//組出回傳值
function ReturnValue(argTypeNo, argDeptNo)
{
	try
	{
	    opener.document.all.lbReturnValue.length = 2;
	    opener.document.all.lbReturnValue.options[0].value = argTypeNo;
	    opener.document.all.lbReturnValue.options[1].value = argDeptNo;
	    opener.window.CallBack("EDI096");
	    close();
	}
	catch (e) {}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
// 10201004	Eileen	檢查代碼是否有值，若有值則補足三碼；若沒有值則不做任何事
//1050720 Zen 1050087  二代公文修改
//function CheckValueLength()
//{
//	var strTypeValue = jf_Trim( document.all.txType.value ) ;
//	if ( strTypeValue != "" && strTypeValue.length < 3 )
//		document.all.txType.value = jf_PADL(strTypeValue, 3, "0");
//}