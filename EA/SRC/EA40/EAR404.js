/*	DATE 	SA			PRG			MGR_NO	DESC
 *	1110519	Cloud		Cloud 		1110371	二代公文修改 * 1100204  Leslie      Zen         1090927 取消使用document.activeElement
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
var PlanRecord;
//*	1110519	Cloud		 		1110371	二代公文修改
/*if(document.all.tbTool)
	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //*	1110519	Cloud		 		1110371	二代公文修改
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//*	1110519	Cloud		 		1110371	二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //*	1110519	Cloud		 		1110371	二代公文修改
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
		case "btPLAN_S": //計畫批號提示
			Page_BlockSubmit=true;
		    var pUrl = "";
		    PlanRecord = "S";
		    pUrl = "EAT400C1.aspx";
			jf_OpenChildWin(pUrl, "EAT400C1", 800, 500);
			break;	
		case "btPLAN_E": //計畫批號提示
			Page_BlockSubmit=true;
		    var pUrl = "";
		    PlanRecord = "E";
		    pUrl = "EAT400C1.aspx";
			jf_OpenChildWin(pUrl, "EAT400C1", 800, 500);
			break;				
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
//*	1110519	Cloud		 		1110371	二代公文修改
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
    //*	1110519	Cloud		 		1110371	二代公文修改
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
		    //*	1110519	Cloud		 		1110371	二代公文修改
		    //document.all["txFrom"].focus();
			$('#txFrom').focus();
			document.all["rb1"].checked = true;
			break;
		case "btPrint":
		case "btPreview":		
		    Page_BlockSubmit = !jf_CheckBeforSave();
		    //*	1110519	Cloud		 		1110371	二代公文修改
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
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
	
	if (document.all["txFrom"].value == "" && document.all["txTo"].value == "")
	{
	    strErrMsg += "清理批號不可空白\n";
	    //*	1110519	Cloud		 		1110371	二代公文修改
	    //document.all["txFrom"].focus();
	    $('#txFrom').focus();
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
	if (argCallerId == "EAT400C1")
	{
		if (PlanRecord == "S")
		{
		    document.all["txFrom"].value = document.all["lbReturnValue"].options[0].value;
		    //*	1110519	Cloud		 		1110371	二代公文修改
		    //document.all["txFrom"].focus();
		    $('#txFrom').focus();
		}
		else
		{
		    document.all["txTo"].value = document.all["lbReturnValue"].options[0].value;
		    //*	1110519	Cloud		 		1110371	二代公文修改
		    //document.all["txTo"].focus();	
		    $('#txTo').focus();
		}
		Page_BlockSubmit=true;
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
