/*
DATE	SA	    PRG	    MGR_NO	DESC
1100201	Leslie	Joe		1090927	取消使用document.activeElement
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

if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1100201	Joe		1090927		取消使用document.activeElement
// function ClientButtonControl()
function ClientButtonControl(e)
{
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
		
		case "btCheck":
			if (document.all["txFeed"].value == "")
			{
				alert("RSS URL不可為空。");
				Page_BlockSubmit=true;
				return;
			}
			break;
		
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle()
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
	
	xObjectName= window.event.srcNode.getAttribute("ID");
	
	switch (xObjectName)
	{
		case "btOpen":
			if (document.all["txKeyFld"].value == "")
			{
				alert("頻道名稱不可為空。");
				Page_BlockSubmit=true;
			}
			else
				Page_BlockSubmit=false;
			jf_ToolBarSubmit();
			break;
		case "btSave":
			if (document.all["txFeed"].value == "" || document.all["txLink"].value == "" || document.all["txDesc"].value == ""|| document.all["txPubDate"].value == ""|| document.all["txKeyFld"].value == "")
			{
				alert("畫面所有欄位必須有值才可進行儲存");
				Page_BlockSubmit=true;
			}
			else if(!checkKeyBeforeSave())
				Page_BlockSubmit=true;
			else
				Page_BlockSubmit=false;

			jf_ToolBarSubmit();	
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			jf_ToolBarSubmit();
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit();
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
			document.all["txKeyFld"].focus();
			break;
		case "btSearch":
			var strUrl = "";			
			strUrl = "TBC320.aspx";
			//Cola 000996 修正開啟之子視窗大小			
			jf_OpenChildWin(strUrl, "TBC320", 940, 470 );
			Page_BlockSubmit = true;
			jf_ToolBarSubmit();
			break;	
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			jf_ToolBarSubmit();
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			jf_ToolBarSubmit();
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;
	
	if (jf_CheckBeforSave())
	{
		// 新增模式需檢查鍵值是否已存在
		if (jf_GetActionMode()==LayoutModeNew)
		{
			if(jf_CheckDataExist(""))//檢查鍵值是否已存在
			{
				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
					bRtnbool = true;
			}
			else
				bRtnbool = true;
		}
		else
			bRtnbool = true;
	}
		
	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txKeyFld"].value == "")
	{
		strErrMsg += "鍵值欄位不可空白\n";
		document.all["txKeyFld"].focus();
	}
	
	if (document.all["txRequireFld"].value == "")
	{
		strErrMsg += "必要欄位不可空白\n";
		document.all["txRequireFld"].focus();
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
	
	if(argCallerId == "TBC320")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);

		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}

	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_OpenRSS(id)
{
	if (document.all["txFeed"].value =="")
	{
		alert("RSS URL不可為空。");
		Page_BlockSubmit = true;		
		return;
	}
	var xUrl = document.all["txFeed"].value;
	jf_OpenChildWin(xUrl,"RSS",760,500);
	Page_BlockSubmit = true;
}
function checkKeyBeforeSave()
{
	if(jf_GetActionMode() == LayoutModeNew)
	{
		var arWSParam = new Array(3);
		arWSParam[0] = "RSS_CHANNEL";
		var arFieldName = new Array(2);
		arFieldName[0] = "CHANNEL_TITLE";
		arFieldName[1] = "SOURCE_ORGNO";
		arWSParam[1] = arFieldName;
		var arFieldValue = new Array(2);
		arFieldValue[0] = document.all.txKeyFld.value;
		arFieldValue[1] = document.all.H_SOURCE_ORGNO.value;			
		arWSParam[2] = arFieldValue;
		var CheckMDCMDocNo = jf_CallWS("../../../STD/LIB/SYS.asmx","CheckDataKeyDuplicate",false,arWSParam);
		if(jf_IsWebServiceSuccess(CheckMDCMDocNo))
		{
			if(CheckMDCMDocNo.value.RtnBool)
			{
				var msg = "指定之頻道--『"+document.all.txKeyFld.value+"』--已存在，是否繼續儲存。";
				if(confirm(msg+"\n\r\n\r是否繼續儲存?"))
					return true;
				else
					return false;				
			}
		}
	}
	return true;
}
function FocusAt(argObj)
{
	try
	{
		if(!argObj.disabled)
			argObj.focus();
	}
	catch(e)
	{}
}