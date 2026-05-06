/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060310   Justin   1050087     二代公文修改
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
//1060310  Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060310  Justin [1050087] 二代公文修改
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060310  Justin [1050087] 二代公文修改
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
//1060310  Justin [1050087] 二代公文修改 
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
	
    //1060310  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1060310  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
		    //1060310  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1060310  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1060310  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
		    //1060310  Justin [1050087] 二代公文修改
			//document.all["txItem_No"].focus();
			$('#txItem_No').focus();
			break;
		case "btSearch":
			
		    var strUrl = "EAC003.aspx?nFrom=EAM003";
		    //1060310  Justin [1050087] 二代公文修改
		    //jf_OpenChildWin(strUrl, "EAM003", 700, 500 );		
		    jf_OpenChildWin(strUrl, "EAM003", 800, 600);
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1060310  Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1060310  Justin [1050087] 二代公文修改 
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
	
	if ( jf_Trim(document.all["txItem_No"].value) == "" )
	{
	    strErrMsg += "項目編號欄位不可空白\n";
	    //1060310  Justin [1050087] 二代公文修改
		//document.all["txItem_No"].focus();
		$('#txItem_No').focus();
	}
	else 
	{
		if ( document.all["txItem_No"].value.length < 5 )
		{
			strErrMsg += "項目編號字元個數不可少於5\n";
		}
		
		if ( document.all["txItem_No"].value.length > 8 )
		{
			strErrMsg += "項目編號字元個數不可超過8\n";
		}
	}
		
	if (jf_Trim(document.all["txItem_Name"].value) == "")
	{
	    strErrMsg += "項目欄位不可空白\n";
	    //1060310  Justin [1050087] 二代公文修改
	    //document.all["txItem_Name"].focus();
	    $('#txItem_Name').focus();
	}
	else 
	{
		if ( document.all["txItem_Name"].value.length > 30 )
		{
		    strErrMsg += "項目字元個數不可超過30\n";
		    //1060310  Justin [1050087] 二代公文修改
		    //document.all["txItem_Name"].focus();
		    $('#txItem_Name').focus();
		}
	}
		
	if ( jf_Trim(document.all["txItem_Desc"].value).length > 100 )
	{
	    strErrMsg += "內容描述不可超過100字\n";
	    //1060310  Justin [1050087] 二代公文修改
	    //document.all["txItem_Desc"].focus();
	    $('#txItem_Desc').focus();
	}	

	if ( jf_Trim(document.all["txItem_Remark"].value).length > 100 )
	{
	    strErrMsg += "備註不可超過100字\n";
	    //1060310  Justin [1050087] 二代公文修改
	    //document.all["txItem_Remark"].focus();
	    $('#txItem_Remark').focus();
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
	
	if(argCallerId == "EAC003")
	{
		document.all["txItem_No"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		
		if(document.all["txItem_No"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
	    //1060310  Justin [1050087] 二代公文修改
		//document.all["txItem_No"].focus();
		$('#txItem_No').focus();
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
