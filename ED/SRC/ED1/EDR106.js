/*
DATE	SA		PRG		MGR_NO			DESC
1030804	Cloud	Kenny	1030467			新增程式
1050824 --      Zen     1050087         二代公文修改
1051019 Leslie  Kenny   1050087         二代公文修改
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

//1050824 Zen 1050087 二代公文修改
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
//1050824 Zen 1050087 二代公文修改
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
	
    //1050824 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			Page_BlockSubmit = !jf_CheckDate();
		    //1050824 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":

			Page_BlockSubmit = !jf_CheckDate();
		    //1050824 Zen 1050087 二代公文修改
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
			alert(objName+"欄位格式有誤，請重新輸入");
		    //1050824 Zen 1050087 二代公文修改
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
	if(jf_Trim(document.all["txYMStart"].value) != ""&&jf_Trim(document.all["txYMEnd"].value) != "")
	{
		var strDateS = jf_Trim(document.all["txYMStart"].value);
		var strDateE = jf_Trim(document.all["txYMEnd"].value);
		strDateS += "01";
		strDateE += "01";
		strDateS = jf_PADL(strDateS,7,"0");
		strDateE = jf_PADL(strDateE,7,"0");
		document.all["txYMStart"].value = strDateS.substr(0,5);
		document.all["txYMEnd"].value = strDateE.substr(0,5);
		
		var strStart = document.all["txYMStart"].value ;
		var strEnd = document.all["txYMEnd"].value ;
		var strTmp = "" ;
		if ( strStart > strEnd )
		{
			strTmp = strStart ;
			strStart = strEnd ;
			strEnd = strTmp ;
			
			document.all["txYMStart"].value = strStart;
			document.all["txYMEnd"].value = strEnd;
		}
		
		if (!jf_CheckCDATE(strDateS))
		{
			document.all["txYMStart"].value = "";
			alert("日期(起)欄位格式有誤，請重新輸入");
		    //1050824 Zen 1050087 二代公文修改
			//document.all["txYMStart"].focus();
			$('#txYMStart').focus();
			return false;
		}
		if (!jf_CheckCDATE(strDateE))
		{
			document.all["txYMEnd"].value = "";
			alert("日期(迄)欄位格式有誤，請重新輸入");
		    //1050824 Zen 1050087 二代公文修改
			document.all["txYMEnd"].focus();
			$('#txYMEnd').focus();
			return false;
		}
		return true;
	}
	else if(jf_Trim(document.all["txYMStart"].value) != "") 
	{
		var strDateS = jf_Trim(document.all["txYMStart"].value);
		strDateS += "01";
		strDateS = jf_PADL(strDateS,7,"0");
		document.all["txYMStart"].value = strDateS.substr(0,5);
		if (!jf_CheckCDATE(strDateS))
		{
			document.all["txYMStart"].value = "";
			alert("日期(起)欄位格式有誤，請重新輸入");
		    //1050824 Zen 1050087 二代公文修改
			document.all["txYMStart"].focus();
			$('#txYMStart').focus();
			return false;
		}
		else
		{
			document.all["txYMEnd"].value = document.all["txYMStart"].value;
			return true;
		}
	}
	else if(jf_Trim(document.all["txYMEnd"].value) != "") 
	{
		var strDateE = jf_Trim(document.all["txYMEnd"].value);
		strDateE += "01";
		strDateE = jf_PADL(strDateE,7,"0");
		document.all["txYMEnd"].value = strDateE.substr(0,5);
		if (!jf_CheckCDATE(strDateE))
		{
			document.all["txYMEnd"].value = "";
			alert("日期(迄)欄位格式有誤，請重新輸入");
		    //1050824 Zen 1050087 二代公文修改
			document.all["txYMEnd"].focus();
			$('#txYMEnd').focus();
			return false;
		}
		else
		{
			document.all["txYMStart"].value = document.all["txYMEnd"].value;
			return true;
		}
	}
	else
	{
		alert("須輸入統計日期");
		return false;
	}
	return true;
}
