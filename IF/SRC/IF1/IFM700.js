/*
Date	   SA	  PRG	 MGR_NO		DESC	
1001123 		Ivory	1000539		新增系統公告維護程式
1050617	Kevin	Kevin_C	1050087		升級二代公文系統
 1051019	Leslie	Joe		1050087		二代修改配合行動平台
1070904	Kevin	Justin	1070678		弱掃修正CookieHttpOnly
1150206	   Zen	  Andy	序63        修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
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
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

//1050617	Kevin_C	1050087		升級二代公文系統
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
//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1050617	Kevin_C	1050087		升級二代公文系統
	Page_BlockSubmit = true;
	
	switch (xObjectName)
	{
		case btHelp:
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050617	Kevin_C	1050087		升級二代公文系統
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
	
	//1050617	Kevin_C	1050087		升級二代公文系統
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btSave":
			Page_BlockSubmit = true;
			//1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
			//jf_SaveCookie("nOrgNo" , document.all["dlOrg"].value);
			var SPLIT = "|";
			var param = ReplaceParamStrForOrgNo(GetAllParamStr(), document.all["dlOrg"].value);
			//1050617	Kevin_C	1050087		升級二代公文系統 -S
			//var ret = jf_ShowModal("IFM700C1.htm" + param, 600, 400);
			//if( typeof(ret) == "string" && ret != "")
			//{
			//	window.location = "IFM700.aspx" + GetAllParamStr();
			//}
			//1050617	Kevin_C	1050087		升級二代公文系統 -E
			//清除Cookie
			//jf_SaveCookie("nIFM700C1", "");
			//1050617	Kevin_C	1050087		升級二代公文系統
			//jf_ShowModal("IFM700C1.htm" + param, 900, 900);
			//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
			//jf_ShowModal("IFM700C1.htm" + param + "&nIFM700C1=", 900, 900);
			jf_ShowModal("IFM700C1.htm" + param + "&nIFM700C1=");
			//1070904 Justin [1070678]弱掃修正CookieHttpOnly--E
			break;
	}
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	var InValidName = "";
	var InValidControlName = "";
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//txInput1不為空白時
		if(document.all["dg1__ctl" + i + "_txInput1"].value != "")
		{
			//txInput2不可空白
			if(document.all["dg1__ctl" + i + "_txInput2"].value == "")
			{
				InValidName += ",Input2不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txInput2";
			}
							
			if(InValidName != "")
			{
				InValidName = InValidName.substr(1,InValidName.length);
				//1050617	Kevin_C	1050087		升級二代公文系統
				//jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");						
				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent+"之列中,"+InValidName])),"");						
				document.all[InValidControlName].focus();
				return false;
			}
		}
	}
	return true;
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
	//1050712	Kevin_C	1050087	升二代 -S
	if(argCallerId == "IFM700C1")
	{
		if( document.all.lbReturnValue.options[0].value == "save" || document.all.lbReturnValue.options[0].value == "del")
			window.location.reload();
	}
	//1050712	Kevin_C	1050087	升二代 -E
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].innerText = obj.value;
}


function storeCookie(argPath)
{
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
	//jf_SaveCookie("nIFM700C1", argPath);
	//jf_SaveCookie("nOrgNo" , document.all["dlOrg"].value);
	//1050712	Kevin_C	1050087	升二代 -S
	//var ret = jf_ShowModal("IFM700C1.htm" + GetAllParamStr(), 600, 400);
	//if( typeof(ret) == "string" && ret != "")
	//	window.location = "IFM700.aspx" + GetAllParamStr();
	//jf_ShowModal("IFM700C1.htm" + GetAllParamStr(), 900, 900);
	//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
	//jf_ShowModal("IFM700C1.htm" + GetAllParamStr() + "&nOrgNo=" + document.all["dlOrg"].value + "&nIFM700C1=" + argPath, 900, 900);
	jf_ShowModal("IFM700C1.htm" + GetAllParamStr() + "&nOrgNo=" + document.all["dlOrg"].value + "&nIFM700C1=" + argPath);
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--E
	//1050712	Kevin_C	1050087	升二代 -E
	//清除Cookie
	//1050712	Kevin_C	1050087	升二代
	//jf_SaveCookie("nIFM700C1", "");
}

function GetAllParamStr()
{
	var strParam = "";
	var pUrl = unescape(this.location);
	if( pUrl != -1 )
	{
		var i = pUrl.indexOf("?");
		if(i != -1)
			strParam = pUrl.substr(i); 
	}
	return strParam;
}
function ReplaceParamStrForOrgNo(argParamStr, argOrgNo)
{
	if(argParamStr == "")
		return "";
	if(typeof(argOrgNo) == "undefined" || argOrgNo == "")
		return argParamStr;

	var ret = "";
	var bStartWithQ = argParamStr.indexOf("?") == 0;
	if(bStartWithQ)
		argParamStr = argParamStr.replace("?", "");
	if(bStartWithQ)
		ret = "?";
		
	var bHasOrgNoParam = false;
	var arrPara = argParamStr.split("&");
	for(var i=0; i<arrPara.length; i++)
	{
		var arrOnePara = arrPara[i].split("=");
		if(arrOnePara[0].toUpperCase() == "nOrgNo".toUpperCase())
		{
			arrOnePara[1] = argOrgNo;
			bHasOrgNoParam = true;
		}
		if(i != 0)
			ret += "&";
		ret += arrOnePara[0] + "=" + arrOnePara[1];
	}
	if(bHasOrgNoParam == false)
		ret += "&nOrgNo=" + argOrgNo;
	return ret;
}