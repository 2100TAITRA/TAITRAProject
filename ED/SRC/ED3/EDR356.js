/*
DATE	SA		PRG		MGR_NO				DESC
1030804	Cloud	Eric	1030466				新增程式
1060913 Cloud   Justin  1050087             二代公文修改
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
//1060913 Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060913 Justin [1050087] 二代公文修改
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060913 Justin [1050087] 二代公文修改
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
//1060913 Justin [1050087] 二代公文修改 
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
	
    //1060913 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			Page_BlockSubmit = !jf_CheckDate();
		    //1060913 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			Page_BlockSubmit = !jf_CheckDate();
		    //1060913 Justin [1050087] 二代公文修改 
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

function jf_CheckYearMonth(obj,objName)
{
	if(jf_Trim(document.all[obj].value) != "")
	{
		var strDate = jf_Trim(document.all[obj].value);
		strDate += "01";
		strDate = jf_PADL(strDate,7,"0");
		document.all[obj].value = strDate.substr(0,5);
		
		if (!jf_CheckCDATE(strDate))
		{
			document.all[obj].value = "";
			alert(objName + "欄位格式有誤，請重新輸入");
		    //1060913 Justin [1050087] 二代公文修改
			//document.all[obj].focus();
			$('#' + obj).focus();
			return false;
		}
		else return true;
	}
	else return true;
}


function jf_CheckDate()
{
	if(jf_Trim(document.all["txDateS"].value) != ""&&jf_Trim(document.all["txDateE"].value) != "")
	{
		var strDateS = jf_Trim(document.all["txDateS"].value);
		var strDateE = jf_Trim(document.all["txDateE"].value);
		strDateS += "01";
		strDateE += "01";
		strDateS = jf_PADL(strDateS,7,"0");
		strDateE = jf_PADL(strDateE,7,"0");
		document.all["txDateS"].value = strDateS.substr(0,5);
		document.all["txDateE"].value = strDateE.substr(0,5);
		if (!jf_CheckCDATE(strDateS))
		{
			document.all["txDateS"].value = "";
			alert("日期(起)欄位格式有誤，請重新輸入");
		    //1060913 Justin [1050087] 二代公文修改
			//document.all["txDateS"].focus();
			$('#txDateS').focus();
			return false;
		}
		if (!jf_CheckCDATE(strDateE))
		{
			document.all["txDateE"].value = "";
			alert("日期(迄)欄位格式有誤，請重新輸入");
		    //1060913 Justin [1050087] 二代公文修改
			//document.all["txDateE"].focus();
			$('#txDateE').focus();
			return false;
		}
		return true;
	}
	else if(jf_Trim(document.all["txDateS"].value) != "") 
	{
		var strDateS = jf_Trim(document.all["txDateS"].value);
		strDateS += "01";
		strDateS = jf_PADL(strDateS,7,"0");
		document.all["txDateS"].value = strDateS.substr(0,5);
		if (!jf_CheckCDATE(strDateS))
		{
			document.all["txDateS"].value = "";
			alert("日期(起)欄位格式有誤，請重新輸入");
		    //1060913 Justin [1050087] 二代公文修改
			//document.all["txDateS"].focus();
			$('#txDateS').focus();
			return false;
		}
		else
		{
			document.all["txDateE"].value = document.all["txDateS"].value
			return true;
		}
	}
	else if(jf_Trim(document.all["txDateE"].value) != "") 
	{
		var strDateS = jf_Trim(document.all["txDateE"].value);
		strDateE += "01";
		strDateE = jf_PADL(strDateE,7,"0");
		document.all["txDateE"].value = strDateE.substr(0,5);
		if (!jf_CheckCDATE(strDateE))
		{
			document.all["txDateE"].value = "";
			alert("日期(迄)欄位格式有誤，請重新輸入");
		    //1060913 Justin [1050087] 二代公文修改
			//document.all["txDateE"].focus();
			$('#txDateE').focus();
			return false;
		}
		else
		{
			document.all["txDateS"].value = document.all["txDateE"].value
			return true;
		}
	}
	else
	{
		alert("統計日期不可空白");
		return false;
	}
	return true;
}

