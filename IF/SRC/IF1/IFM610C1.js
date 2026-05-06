/*
 * DATE		SA		PRG		MGR_NO		DESC
 * 1050713	Kevin	Kevin_C	1050087		升二代
 1051019	Leslie	Joe		1050087		二代修改配合行動平台
 1150206	Zen		Andy	序63        修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
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

//1050713	Kevin_C	1050087	升二代
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
		case "btBrowse":
			Page_BlockSubmit = true;
			//1050713	Kevin_C	1050087	升二代 移除本機應用程式相關功能 -S
			//if( document.all.rb_TypeLocal.checked == true )
			//{
			//	document.all.hFileObj.click();
			//	document.all.txPath.value = document.all.hFileObj.value;
			//}
			//else
			//{
			//	var ret = jf_ShowModal("IFC050.htm" + GetAllParamStr(), 400, 500);
			//	if(ret)
			//	{
			//		document.all.txPath.value   = ret.Name;
			//		document.all.hAppPath.value = ret.Path;
			//	}
			//}
			//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
			//jf_ShowModal("IFC050.htm" + GetAllParamStr(), 600, 360);
			jf_ShowModal("IFC050.htm" + GetAllParamStr());
			//1050713	Kevin_C	1050087	升二代 移除本機應用程式相關功能 -E
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050712	Kevin_C	1050087	升二代
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
	
	//1050712	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName=event.target.id;
	
	switch (xObjectName)
	{
		case "btSave":
			Page_BlockSubmit = !fnChkBeforSave();
			//1050712	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1050712	Kevin_C	1050087	升二代
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function fnOpen(arg,argW,argH)
{
   var site="http://localhost/if/"
   var sFeatures = "dialogWidth: " + argW + "px;dialogHeight:" + argH + "px"; 
    //var ret = window.open(site+arg, "", sFeatures);
   var ret = window.showModalDialog(site + arg, "", sFeatures);
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
	if(argCallerId == "Left")
	{
		if(document.all.lbReturnValue)
		{
			document.all.txPath.value   = document.all.lbReturnValue.options[1].value;
			document.all.hAppPath.value = document.all.lbReturnValue.options[0].value;
		}
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
function fnChkBeforSave()
{
	if( jf_Trim(document.all.txName.value) == "" )
	{
		alert("捷徑名稱不可空白!!");
		return false;
	}
	//1050713	Kevin_C	1050087	升二代 移除本機應用程式相關功能 -S
	//if( document.all.rb_TypeSrv.checked == true )
	//{
		if( jf_Trim(document.all.hAppPath.value) == "" )
		{
			alert("請選擇應用程式!!");
			return false;
		}
	//}
	//else
	//{
	//	if( jf_Trim(document.all.txPath.value) == "" )
	//	{
	//		alert("請輸入程式路徑!!");
	//		return false;
	//	}
	//}
	//1050713	Kevin_C	1050087	升二代 移除本機應用程式相關功能 -E
	
	var strName = document.all.txName.value;
	var obj = document.all.ddlShortCut;
	var len = obj.length;
	for(var i=0 ; i<len ; i++)
	{
		if(obj[i].value == strName)
		{
			if( jf_Trim(document.all.hSave.value) == strName )
				break;
			alert("已有相同的捷徑名稱存在，請更換欲儲存的捷徑名稱");
			return false;
		}
	}
	return true;
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