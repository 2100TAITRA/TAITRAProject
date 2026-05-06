/*
DATE		SA		PRG		MSG_NO		DESC
1001101		David   Jeff	1000857     新增程式
1120315     Leslie   Cloud   1120211     升級二代
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

//指定DataGrid欄位
var strTableFields = new Array("_hlLink","_lbRead1","_lbRead2");
//1120315        Cloud   1120211     升級二代
/*if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/

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
function ClientButtonControl()
{
	var xObjectName = document.activeElement.id;
	
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
	    //1120315        Cloud   1120211     升級二代
		/*case "btDateS":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txDateS, event.screenX, event.screenY);
			break;
		case "btDateE":
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txDateE, event.screenX, event.screenY);
			break;*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1120315        Cloud   1120211     升級二代
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
    //1120315        Cloud   1120211     升級二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			if(!CheckBeforeSearch())
			{
				Page_BlockSubmit = true;
			}
			else if(!CheckNoData())
			{
				Page_BlockSubmit = true;
				alert("日期欄位不可空白");
			}
			else
			    Page_BlockSubmit = !jf_CheckKeyObject();
		        //1120315        Cloud   1120211     升級二代
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			if(!CheckBeforeSearch())
			{
				Page_BlockSubmit = true;
			}
			else if(!CheckNoData())
			{
				Page_BlockSubmit = true;
				alert("日期欄位不可空白");
			}
			else
				Page_BlockSubmit = !jf_ConfirmPrint();
		    //1120315        Cloud   1120211     升級二代
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
		case "btExcel":
			if(!CheckBeforeSearch())
			{
				Page_BlockSubmit = true;
			}
			else if(!CheckNoData())
			{
				Page_BlockSubmit = true;
				alert("日期欄位不可空白");
			}
			else
				Page_BlockSubmit = !jf_ConfirmPreview();
		    //1120315        Cloud   1120211     升級二代
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
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//檢核日期格式用------start---------
var CheckedDate = false;
var ObjName = "";
var strBDate = "";
function CheckDATE(argObj,strMsg,argIsCheckDone)
{
	if(ObjName != argObj)
		CheckedDate = false;
	ObjName = argObj;
		
	var strDate = jf_Trim(document.all[argObj].value);	
	
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}

		if(strBDate != strDate)
			CheckedDate = false;	
		
		strBDate = strDate;

		if(CheckedDate)
		{
			CheckedDate = false;
			return true;
		}
		if(argIsCheckDone)
			CheckedDate = true;

		if (!jf_CheckCDATE(strDate))
		{
			if (strMsg)
				jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			document.all[argObj].focus();
			CheckedDate = false;
			return false;
		}
		else
			return true;
	}
	else
		return true;
}
///-----end-------
function CheckBeforeSearch()
{
	var strDateS = document.all["txDateS"].value;
	var strDateE = document.all["txDateE"].value;
	if(strDateS != "" && strDateE != "" && strDateS > strDateE)
	{
		document.all.txDateS.value = strDateE;
		document.all.txDateE.value = strDateS;
	}
	if(!CheckDATE("txDateS","日期欄位(起)",true))
		return false;
	if(!CheckDATE("txDateE","日期欄位(訖)",true))
		return false;
	else if (strDateS == "" || strDateE == "")
	{
		if(strDateS == "")
		{
			document.all["txDateS"].value=document.all["txDateE"].value;
		}
		else
		{
			document.all["txDateE"].value=document.all["txDateS"].value;
		}
	}			
	return true;
}
//空白檢查
function CheckNoData()
{
	var strDateS = jf_Trim(document.all["txDateS"].value);
	var strDateE = jf_Trim(document.all["txDateE"].value);
	if(strDateS=="" && strDateE=="")
		return false;
	else	
		return true;		
}
