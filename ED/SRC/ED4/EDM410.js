/*
DATE 	SA		PRG		MGR_NO		DESC
1010727	Yvonne	Yvonne	1010592		修正儲存未檢核不可為空白的條件
1051229 David   Zen     1050087     二代公文修改
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

//1051229 Zen 1050087 二代公文修改//if (document.all.tbTool)
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
//1051229 Zen 1050087 二代公文修改//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051229 Zen 1050087 二代公文修改    //var xObjectName = document.activeElement.id;
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
//1051229 Zen 1050087 二代公文修改//function jf_ToolBarHandle()
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
	
    //1051229 Zen 1050087 二代公文修改	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !CheckBeforSave();
		    //1051229 Zen 1050087 二代公文修改			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":			
			Page_BlockSubmit = !CheckBeforSave();
		    //1051229 Zen 1050087 二代公文修改		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1051229 Zen 1050087 二代公文修改		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1051229 Zen 1050087 二代公文修改		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
		    //1051229 Zen 1050087 二代公文修改			//document.all["txKeyFld"].focus();
			break;
		case "btSearch":
			var strUrl = "";
			var strTranReason = escape(jf_Trim(document.all["txTranReason"].value));
			var strTranStatus = ""
			if(document.all["rbAudit"].checked==true)
			strTranStatus ="1";
			if(document.all["rbDeAudit"].checked==true)
			strTranStatus ="2";
			strUrl = "EDM410C1.aspx?rtnObj=lbReturnValue&argTranReason="+strTranReason+"&argTranStatus="+strTranStatus;
		    //1051229 Zen 1050087 二代公文修改			//jf_OpenChildWin(strUrl, "EDM410C1", 700, 500);
			jf_OpenChildWin(strUrl, "EDM410C1", 800, 600);
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
function CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txTranReason"].value == "")
	{
		strErrMsg += "列管異動原因不可空白\n";
	    //1051229 Zen 1050087 二代公文修改		//document.all["txTranReason"].focus();
		$('#txTranReason').focus();
	}
	if (document.all["rbAudit"].checked == false && document.all["rbDeAudit"].checked == false)
	{
		strErrMsg += "需選擇異動別\n";
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

	if(argCallerId == "EDM410C1")
	{
		var strTranStatus= jf_Trim(document.all.lbReturnValue.options[1].value);
		if(strTranStatus=="1")
			document.all["rbAudit"].checked==true;
		else if(strTranStatus=="2")
			document.all["rbDeAudit"].checked==true;
		document.all["txTranReason"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		if(document.all["txTranReason"].value != "" &&(document.all["rbAudit"].checked || document.all["rbDeAudit"].checked))
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
	    //1051229 Zen 1050087 二代公文修改	    //document.all["txTranReason"].focus();
		$('#txTranReason').focus();
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
