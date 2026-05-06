/*	Date		SA		PRG		MGR_NO	DESC
 *	96.01.29	Andy	David	951357	職訓局新增程式，供檔管人員查詢所有未借出的檔案 
 *  96.07.05    Stella  Zoey    001077  職訓局為紙本簽核，因此查詢之STATUS需包含0
 * 105.08.31	Cloud   Kenny	1050087	二代公文系統相關修改
 //	1051019	Leslie		Joe			1050087	二代修改配合行動平台
 
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

//1050831	Kenny   [1050087]	二代公文系統相關修改--Start--
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
//1050831	Kenny   [1050087]	二代公文系統相關修改--End--

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1050831	Kenny   [1050087]	二代公文系統相關修改；一併移除無用code
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
	
	switch (xObjectName)
	{
		case btHelp:
			/*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
			break;
        //1050831	Kenny   [1050087]	二代公文系統相關修改--Start--
		//case "btSDate":
		//{
		//	Page_BlockSubmit=true;
		//	jf_CallCalendar(document.all.txBorDateS, event.screenX, event.screenY);
		//	break;
		//}
		//case "btEDate":
		//{
		//	Page_BlockSubmit=true;
		//	jf_CallCalendar(document.all.txBorDateE, event.screenX, event.screenY);
		//	break;
		//}
        //1050831	Kenny   [1050087]	二代公文系統相關修改--End--
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050831	Kenny   [1050087]	二代公文系統相關修改
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
	
	//1050831	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
        //1050831	Kenny   [1050087]	二代公文系統相關修改；一併移除無用code--Start--
		//case "btClean":
		//	Page_BlockSubmit = true;
		//	jf_ConfirmClean(true);
		//	document.all["txBorDateS"].focus();
		//	break;
        //1050831	Kenny   [1050087]	二代公文系統相關修改；一併移除無用code--End--
		case "btSearch":
			Page_BlockSubmit = false;
			//1050831	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1050831	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1050831	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		
        //1050831	Kenny   [1050087]	二代公文系統相關修改；一併移除無用code--Start--
		//以下屬於DataGrid ToolBar
		//case "btSelectAll":
		//	Page_BlockSubmit = true;
		//	jf_SelectAll("dg1", "_cbSelect");
		//	break;
		//case "btSelectInverse":
		//	Page_BlockSubmit = true;
		//	jf_SelectInverse("dg1", "_cbSelect");
		//	break;
		//case "btSelectClear":
		//	Page_BlockSubmit = true;
		//	jf_SelectClear("dg1", "_cbSelect");
		//	break;
		//case "btDeleteSelected":
		//	Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
		//	jf_SelectBarSubmit();
		//	break;
		//case "btUp":
		//	Page_BlockSubmit = true;
		//	jf_RowUp("dg1", "_cbSelect", strTableFields);
		//	break;
		//case "btDown":
		//	Page_BlockSubmit = true;
		//	jf_RowDown("dg1", "_cbSelect", strTableFields);
		//	break;
        //1050831	Kenny   [1050087]	二代公文系統相關修改；一併移除無用code--End--
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//1050831	Kenny   [1050087]	二代公文系統相關修改；一併移除無用code--Start--
////儲存前檢查
//function jf_ConfirmSave()
//{
//	var bRtnbool = false;
//	
//	if (jf_CheckBeforSave())
//	{
//		// 新增模式需檢查鍵值是否已存在
//		if (jf_GetActionMode()==LayoutModeNew)
//		{
//			if(jf_CheckDataExist(""))//檢查鍵值是否已存在
//			{
//				if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
//					bRtnbool = true;
//			}
//			else
//				bRtnbool = true;
//		}
//		else
//			bRtnbool = true;
//	}
//		
//	return bRtnbool;
//}
//
////儲存前之欄位檢查
//function jf_CheckBeforSave()
//{
//	var bRtnbool = true;
//	var strErrMsg= "";
//	
//	if (document.all["txKeyFld"].value == "")
//	{
//		strErrMsg += "鍵值欄位不可空白\n";
//		document.all["txKeyFld"].focus();
//	}
//	
//	if (document.all["txRequireFld"].value == "")
//	{
//		strErrMsg += "必要欄位不可空白\n";
//		document.all["txRequireFld"].focus();
//	}
//	
//	if(!jf_CheckBlankAndAlert())
//		bRtnbool = false;
//		
//	if (strErrMsg != "")
//	{
//		bRtnbool = false;
//		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
//	}
//	
//	return bRtnbool;
//}
//
////檢查DataGrid資料列是否填完整
//function jf_CheckBlankAndAlert()
//{
//	var InValidName = "";
//	var InValidControlName = "";
//	
//	for(var i = 2; i <= document.all.dg1.rows.length; i++)
//	{
//		//txInput1不為空白時
//		if(document.all["dg1__ctl" + i + "_txInput1"].value != "")
//		{
//			//txInput2不可空白
//			if(document.all["dg1__ctl" + i + "_txInput2"].value == "")
//			{
//				InValidName += ",Input2不可空白";			
//				InValidControlName = "dg1__ctl" + i + "_txInput2";
//			}
//							
//			if(InValidName != "")
//			{
//				InValidName = InValidName.substr(1,InValidName.length);
//				jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");						
//				document.all[InValidControlName].focus();
//				return false;
//			}
//		}
//	}
//	return true;
//}
//1050831	Kenny   [1050087]	二代公文系統相關修改；一併移除無用code--End--
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

function CallPadFunc(strObjName,argCount)
{		
	if(document.all[strObjName].value != "")				
		document.all[strObjName].value = jf_PADL(document.all[strObjName].value,argCount,"0");			
	if(!jf_CheckCDATE(document.all[strObjName].value) &&jf_Trim(document.all[strObjName].value) != "")
	{
		alert("輸入日期格式不正確，請檢查");
		document.all[strObjName].value = "";
        //1050831	Kenny   [1050087]	二代公文系統相關修改
        //document.all[strObjName].focus();
        $('#'+strObjName).focus();
	}
}