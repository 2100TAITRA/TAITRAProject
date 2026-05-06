/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人  單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1041120		Kenny	1040921	(Merge 1010877)新增子視窗SHOW清理處置以及內容描述資訊
 * 1050815		Kevin_C	1050087	升二代
 //	1051019		Joe			1050087	二代修改配合行動平台
 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1050815	Kevin_C	1050087	升二代
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1050815	Kevin_C	1050087	升二代
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
//1050815	Kevin_C	1050087	升二代
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
	
	//1050815	Kevin_C	1050087	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName=event.target.id;
	
	//1050815	Kevin_C	1050087	升二代 -S
	// switch (xObjectName)
	// {
		// case "btOpen":
			// Page_BlockSubmit = !jf_CheckKeyObject();
			
			// jf_ToolBarSubmit();
			// break;
		// case "btSave":
			// if(jf_ConfirmSave()) //是否通過儲存前必要檢查
			// {
				// IsServerHandling = true;
				// jf_ShowWaitState();	
				// Page_BlockSubmit = false;
			// }
			// else
				// Page_BlockSubmit = true;
			// jf_ToolBarSubmit();	
			// break;
		// case "btDelete":
			// Page_BlockSubmit = !jf_ConfirmDelete();
			// jf_ToolBarSubmit();
			// break;
		// case "btCancel":
			// Page_BlockSubmit = !jf_ConfirmCancel();
			// jf_ToolBarSubmit();
			// break;
		// case "btClean":
			// Page_BlockSubmit = true;
			// jf_ConfirmClean(true);
			// document.all["txKeyFld"].focus();
			// break;
		// case "btSearch":
			// /*
			// var strUrl = "";
			// var strKeyCol = jf_Trim(document.all["txKeyFld"].value);
			// var strMainTableCol1 = jf_Trim(document.all["txRequireFld"].value);
			// var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
			// var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));
			// strUrl = "SII020.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1+"&argMainTableCol2="+strMainTableCol2+"&argMainTableCol3="+strMainTableCol3;
			// jf_OpenChildWin(strUrl, "SII020", 700, 500 );
			// */
			// break;
		// case "btPrint":
			// Page_BlockSubmit = !jf_ConfirmPrint();
			// jf_ToolBarSubmit();
			// break;
		// case "btPreview":
			// Page_BlockSubmit = !jf_ConfirmPreview();
			// jf_ToolBarSubmit();
			// break;
	// }
	//1050815	Kevin_C	1050087	升二代 -E
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
//1050815	Kevin_C	1050087	升二代 -S
// function jf_ConfirmSave()
// {
	// var bRtnbool = false;
	
	// if (jf_CheckBeforSave())
	// {
		////新增模式需檢查鍵值是否已存在
		// if (jf_GetActionMode()==LayoutModeNew)
		// {
			// if(jf_CheckDataExist(""))//檢查鍵值是否已存在
			// {
				// if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
					// bRtnbool = true;
			// }
			// else
				// bRtnbool = true;
		// }
		// else
			// bRtnbool = true;
	// }
		
	// return bRtnbool;
// }


//儲存前之欄位檢查
// function jf_CheckBeforSave()
// {
	// var bRtnbool = true;
	// var strErrMsg= "";
	
	// if (document.all["txKeyFld"].value == "")
	// {
		// strErrMsg += "鍵值欄位不可空白\n";
		// document.all["txKeyFld"].focus();
	// }
	
	// if (document.all["txRequireFld"].value == "")
	// {
		// strErrMsg += "必要欄位不可空白\n";
		// document.all["txRequireFld"].focus();
	// }
		
	// if (strErrMsg != "")
	// {
		// bRtnbool = false;
		// jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	// }
	
	// return bRtnbool;
// }
//1050815	Kevin_C	1050087	升二代 -E

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

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
