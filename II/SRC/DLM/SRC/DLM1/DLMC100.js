/*
 DATE		SA		PG		MGR_NO		DESC
 1051019	Leslie	Joe		1050087		二代修改配合行動平台
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
//1050512 Zen 1050087 二代公文修改
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
	GetParamValue();
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
	
	switch (xObjectName)
	{
		case "imgdate1":
			Page_BlockSubmit = true;
			break;
		case "imgdate2":
			Page_BlockSubmit = true;
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050512 Zen 1050087 二代公文修改
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
	
    //1050512 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050512 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1050512 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1050512 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;

	}
}
function jf_CheckKeyObject()
{
	var bRtnbool = true;
	if (document.all["tbIssueNo"].value == "")
	{
		if (document.all["txIssueStartDate"].value == "")
		{
			if (document.all["txIssueEndDate"].value == "")
			{
				if (document.all["tbSubject"].value == "")
				{
					if (document.all["ddlDept"].value == "")
					{
					    alert("請至少輸入一條件值");
					    //1050606 Zen 1050087 二代公文修改
					    //document.all["tbIssueNo"].focus();
					    $('#tbIssueNo').focus();
						bRtnbool = false;
					}
				}
			}
		}
	}
	return bRtnbool;
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
	if(argCallerId == "DLMC100")
	{
		if(jf_Trim(document.all.lbReturnValue.options[0].value) !="")
			document.all["tbIssueNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		if(jf_Trim(document.all.lbReturnValue.options[1].value) !="")
			document.all["tbSubject"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argLink, argRead1)
{
	try
	{
	    opener.document.all.lbReturnValue.length = 2;
	    opener.document.all.lbReturnValue.options[0].value = argLink;
	    opener.document.all.lbReturnValue.options[1].value = argRead1;
	    opener.window.CallBack("DLMT100");
	    close();
	}
	catch (e) {}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function GetParamValue()
{
	/*
	var strIssueNo = GetParam("argIssueNo");
	var strSubject = decodeURIComponent(GetParam("argSubject"));
	document.all.tbIssueNo.value = strIssueNo;
	document.all.tbSubject.value = strSubject;
	*/
}
function fnCalculateDays()
{
	//檢查日期格式
	var strSDate = document.all.txIssueStartDate.value;
	var strEDate = document.all.txIssueEndDate.value;
	if (strSDate != "" && strSDate.length < 7)
	{
		strSDate = jf_PADL(strSDate,7,'0');
		document.all.txIssueStartDate.value = strSDate;
	}
	if (strEDate != "" &&  strEDate.length < 7)
	{
		strEDate = jf_PADL(strEDate,7,'0');
		document.all.txIssueEndDate.value = strEDate;
	}
	if (strSDate != "" && !jf_CheckCDATE(strSDate))
	{
	    //1050606 Zen 1050087 二代公文修改
	    //document.all.txIssueStartDate.focus();
	    $('#txIssueStartDate').focus();
		jf_ShowMsg( FormatStr( jf_GetErrMsg(InFormatErr2), new Array(["發文日期(起)"]) ), "" );
		return false;
	}
	if (strEDate != "" && !jf_CheckCDATE(strEDate))
	{
	    //1050606 Zen 1050087 二代公文修改
	    //document.all.txIssueEndDate.focus();
	    $('#txIssueEndDate').focus();
		jf_ShowMsg( FormatStr( jf_GetErrMsg(InFormatErr2), new Array(["發文日期(迄)"]) ), "" );
		return false;
	}
}
//取得參數值
function GetParam(ParamName)
{
	var arr = this.GetParamArray();
	if( ParamName == "" )	return "";
	for(var i=0 ; i<arr.length ; i++)
		if( arr[i][0] == ParamName )
			return arr[i][1];
	return "";		
}

function GetParamArray()
{
	var arrayOfParamLen = 0;
	var arrayOfParam = new Array ;
	
	var pUrl = unescape(this.location);
	if( pUrl != -1 )
	{
		var i,j,k;
		i = pUrl.indexOf("?");
		var paramStr = pUrl.substr(i+1); 
		var arr = paramStr.split("&");
		for(j=0 ; j<arr.length ; j++)
		{
			
			k = arr[j].indexOf("=");
			if( k != -1 )
			{
				arrayOfParam[arrayOfParamLen] = new Array(2);
				arrayOfParam[arrayOfParamLen][0] = arr[j].substr(0,k);
				arrayOfParam[arrayOfParamLen][1] = arr[j].substr(k+1);
				arrayOfParamLen++;
			}
		}
	}
	return arrayOfParam;
}