/*
DATE 		SA		PRG		MGR_NO		DESC
1020322		David	Jagle	1020039		新增本作業
1050721     David   Zen     1050087     二代公文修改
1051019     Leslie  Kenny   1050087     二代公文修改
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

//1050721 Zen 1050087  二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1050721 Zen 1050087  二代公文修改
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
//1050721 Zen 1050087  二代公文修改
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
	
    //1050721 Zen 1050087  二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			CruleNoOnblur();
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050721 Zen 1050087  二代公文修改
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
		    //1050721 Zen 1050087  二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
		    //1050721 Zen 1050087  二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
		    //1050721 Zen 1050087  二代公文修改
			//document.all["txCruleNo"].focus();
			$('#txCruleNo').focus();
			document.all["rbN"].checked = true;
			break;
		case "btSearch":
			var strUrl = "";
			strUrl = "EDI095.aspx?Return=true";
			jf_OpenChildWin(strUrl, "EDI095", 700, 500 );
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
				alert("該代碼已存在，請開啟後進行修改。");
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
	
	if (document.all["txCruleNo"].value == "")
	{
		strErrMsg += "紙本簽核原因代碼欄位不可空白\n";
	    //1050721 Zen 1050087  二代公文修改
		//document.all["txCruleNo"].focus();
		$('#txCruleNo').focus();
	}
	else
		CruleNoOnblur();
	
	if (document.all["txCruleExplan"].value == "")
	{
		strErrMsg += "紙本簽核原因名稱欄位不可空白\n";
	    //1050721 Zen 1050087  二代公文修改
		//document.all["txCruleExplan"].focus();
		$('#txCruleExplan').focus();
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
	if(argCallerId == "EDI095")
	{
		document.all["txCruleNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		if(document.all["txCruleNo"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
	    //1050721 Zen 1050087  二代公文修改
		//document.all["txCruleNo"].focus();
		$('#txCruleNo').focus();
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
//代碼欄位自動補0
function CruleNoOnblur()
{
	if(document.all["txCruleNo"].value != "" && document.all["txCruleNo"].value.length < 2)
		document.all.txCruleNo.value = jf_PADL(document.all.txCruleNo.value,2,"0");
}