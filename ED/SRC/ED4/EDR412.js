/*
DATE	SA			PRG			MGR_NO	DESC
0991130	--------	Jeffrey		0990517 新增程式，疾管局用
1051004 David       Justin      1050087 二代公文修改
1051019 Leslie      Kenny       1050087 二代公文修改
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
var strTableFields = new Array("_lbIssueDate","_llbDocNo","_lbDeptName", "_lbTypeName", "_lbAppLvl", "_lbDelaminateLvl", "_lbFromSubject", "_InputFieldLabel");
//1051004 Justin 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
	//document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

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
	    /*1051004 Justin 1050087 二代公文修改
		case "btIssueDateS":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txIssueDateS, event.screenX, event.screenY);
			break;
		case "btIssueDateE":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txIssueDateE, event.screenX, event.screenY);
			break;*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051004 Justin 1050087 二代公文修改 
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
	
    //1051004 Justin 1050087 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
		case "btPrint":
		case "btPreview":
		case "btExcel":
		case "btExcel_L":
			//Page_BlockSubmit = !jf_CheckKeyObject();
			if(CheckBeforeOpen())
			{
				//CheckDateIsNotAllNull();
				if(document.all["txIssueDateS"].value == "" && document.all["txIssueDateE"].value == "")
				{
				    alert("發文日期不可皆為空");
				    //1051004 Justin 1050087 二代公文修改
				    //document.all["txIssueDateS"].focus();
				    $('#txIssueDateS').focus();
					return;
				}
				CompareChange();
				Page_BlockSubmit =false;
			}
			else 
				Page_BlockSubmit = true;
		    //1051004 Justin 1050087 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		/*case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			jf_ToolBarSubmit();
			break;
		case "btPreview":
		case "btExcel":
			Page_BlockSubmit = !jf_ConfirmPreview();
			jf_ToolBarSubmit();
			break;*/
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

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{
    /*
	try
	{
	    opener.document.all.lbReturnValue.length = 3;
	    opener.document.all.lbReturnValue.options[0].value = argLink;
	    opener.document.all.lbReturnValue.options[1].value = argRead1;
	    opener.document.all.lbReturnValue.options[2].value = argRead2;
	    opener.window.CallBack("SII020");
	    close();
	}
	catch (e) {}
    */
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
/*****************************************************************************
*  預覽和列印前檢查
*****************************************************************************/
function CheckBeforeOpen()
{	
	if(!CheckDATE("txIssueDateS","發文日期",true))
		return false;
	else if(!CheckDATE("txIssueDateE","發文日期",true))
		return false;
	else {}
	return true;
}
/*****************************************************************************
*  日期大小的比較與互換
*****************************************************************************/
function CompareChange()
{
	var strDateS = document.all.txIssueDateS.value;
	var strDateE = document.all.txIssueDateE.value;
	var strDateT;
	if(strDateS != "" && strDateE != "")
	{
		if(strDateS > strDateE)
		{
			strDateT = strDateS;
			strDateS = strDateE;
			strDateE = strDateT;
			document.all.txIssueDateS.value = strDateS ;
			document.all.txIssueDateE.value = strDateE;
		}
	}
}
/*****************************************************************************
* 確認DATE格式是否正確 
*****************************************************************************/

var CheckedDate = false;
function CheckDATE(argObj,strMsg,argIsCheckDone)
{
	var strDate = document.all[argObj].value;

	if (strDate != "")
	{
		if(CheckedDate)
		{
			CheckedDate = false;
			return true;
		}
		if(argIsCheckDone)
			CheckedDate = true;

		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
			
		if (!jf_CheckCDATE(strDate))
		{
			if (strMsg)
			    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
		    //1051004 Justin 1050087 二代公文修改
			//document.all[argObj].focus();
			$('#' + argObj).focus();
			CheckedDate = false;
			return false;
		}
		else
		{
			CheckedDate = false;
			return true;
		}
	}
	else
		return true;
}
/*****************************************************************************
* 確認DATE格式是否正確 
*****************************************************************************/
function CheckDateIsNotAllNull()
{
	
}
