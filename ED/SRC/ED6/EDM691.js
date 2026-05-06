/*
DATE	SA		PRG		MGR_NO			DESC
1050413 David   Zen     1050087         二代公文修改 
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
//1050413 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1050413 Zen 1050087 二代公文修改
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
//1050413 Zen 1050087 二代公文修改
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
    //1050413 Zen 1050087 二代公文修改
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
		    Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050413 Zen 1050087 二代公文修改
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
		    //1050413 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
		    Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050413 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
		    Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050413 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
		    jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
		    //1050603 Zen 1050087 二代公文修改
			//document.all["txFlowCodes"].focus();
			$('#txFlowCodes').focus();
			break;
		case "btSearch":
			
			var strUrl = "";
			var strFlowCodes = jf_Trim(document.all["txFlowCodes"].value);
			var strFlowName = escape(jf_Trim(document.all["txFlowName"].value));
			var strCloseType = document.all['dlCloseType'].value;
			var strTimeCount = document.all['dlTimeCount'].value;			
			strUrl = "EDC691.aspx?rtnObj=lbReturnValue";
			if(strFlowCodes != "")
				strUrl +="&argFlowCodes="+strFlowCodes;
			if(strFlowName != "")
				strUrl +="&argFlowName="+strFlowName;
			if(strCloseType != "")
				strUrl +="&argCloseType="+strCloseType;
			if(strTimeCount != "")
				strUrl +="&argTimeCount="+strTimeCount;

			jf_OpenChildWin(strUrl, "EDC691", 700, 500 );
			
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
	
	if (jf_Trim(document.all["txFlowCodes"].value) == "")
	{
		strErrMsg += "辦理情形代碼不可為空白\n";
	    //1050603 Zen 1050087 二代公文修改
		//document.all["txFlowCodes"].focus();
		$('#txFlowCodes').focus();
	}
	
	if (jf_Trim(document.all["txFlowName"].value) == "")
	{
		strErrMsg += "辦理情形名稱不可為空白\n";
	    //1050603 Zen 1050087 二代公文修改
		//document.all["txFlowName"].focus();
		$('#txFlowName').focus();
	}
	
	if (jf_Trim(document.all["dlCloseType"].value) == "")
	{
		strErrMsg += "結案別不可為空白\n";
	    //1050603 Zen 1050087 二代公文修改
		//document.all["dlCloseType"].focus();
		$('#dlCloseType').focus();
    }

	if (jf_Trim(document.all["dlTimeCount"].value) == "")
	{
		strErrMsg += "時效計算性質不可為空白\n";
	    //1050603 Zen 1050087 二代公文修改
		//document.all["dlTimeCount"].focus();
		$('#dlTimeCount').focus();
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
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	
	if(argCallerId == "EDC691")
	{
		document.all["txFlowCodes"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
 
 		if(document.all["txFlowCodes"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
	    //1050603 Zen 1050087 二代公文修改
 		//document.all["txFlowCodes"].focus();
 		$('#txFlowCodes').focus();
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