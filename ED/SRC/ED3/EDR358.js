/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060920   Justin   1050087     二代公文修改
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
//1060920 Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;


/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060920 Justin [1050087] 二代公文修改
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060920 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
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
	    /*1060920 Justin [1050087] 二代公文修改
		case "ibRcvDateS":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txRcvDateS, event.screenX, event.screenY);
			break;
		}
		case "ibRcvDateE":
		{
			Page_BlockSubmit=true;
			jf_CallCalendar(document.all.txRcvDateE, event.screenX, event.screenY);
			break;
		}*/
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060920 Justin [1050087] 二代公文修改 
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
	
    //1060920 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{

		case "btSearch":
			AutoBringOut();
			Page_BlockSubmit = true;
			adjust();
			if(!CheckBeforeSearch())
				Page_BlockSubmit = false;
		    //1060920 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			adjust();
			Page_BlockSubmit = !jf_ConfirmPrint();
		    //1060920 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			adjust();
			Page_BlockSubmit = !jf_ConfirmPreview();
		    //1060920 Justin [1050087] 二代公文修改 
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
	
	if (document.all["txKeyFld"].value == "")
	{
	    strErrMsg += "鍵值欄位不可空白\n";
	    //1060920 Justin [1050087] 二代公文修改
	    //document.all["txKeyFld"].focus();
	    $('#txKeyFld').focus();
	}
	
	if (document.all["txRequireFld"].value == "")
	{
	    strErrMsg += "必要欄位不可空白\n";
	    //1060920 Justin [1050087] 二代公文修改
	    //document.all["txRequireFld"].focus();
	    $('#txRequireFld').focus();
	}
	
	if(!jf_CheckBlankAndAlert())
		bRtnbool = false;
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	var InValidName = "";
	var InValidControlName = "";
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//txInput1不為空白時
		if(document.all["dg1__ctl" + i + "_txInput1"].value != "")
		{
			//txInput2不可空白
			if(document.all["dg1__ctl" + i + "_txInput2"].value == "")
			{
				InValidName += ",Input2不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txInput2";
			}
							
			if(InValidName != "")
			{
			    InValidName = InValidName.substr(1, InValidName.length);
			    //1060920 Justin [1050087] 二代公文修改 
				//jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");						
			    //document.all[InValidControlName].focus();
			    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
			    $('#' + InValidControlName).focus();
				return false;
			}
		}
	}
	return true;
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
function AutoBringOut()
{
	var txRcvDateS = jf_Trim(document.all["txRcvDateS"].value);
	var txRcvDateE = jf_Trim(document.all["txRcvDateE"].value);
	var ErrMsg = "";
	if(txRcvDateS == "" && txRcvDateE != "")
	{
		document.all["txRcvDateS"].value = document.all["txRcvDateE"].value;
		document.all["txRcvDateE"].value = "";
	}
}
function CallPadFunc(strObjName,argCount)
{
	switch(strObjName)
	{		
		case "txRcvDateS":
		case "txRcvDateE":
			if(document.all[strObjName].value != "")
				document.all[strObjName].value = jf_PADL(document.all[strObjName].value,argCount,"0");
			break;
	}
	
	if(strObjName == "txRcvDateS" || strObjName == "txRcvDateE")
	{
		if(!jf_CheckCDATE(document.all[strObjName].value) && jf_Trim(document.all[strObjName].value) != "")
		{
			alert("輸入日期格式不正確，請檢查");
			document.all[strObjName].value = "";
			//document.all[strObjName].focus();
			return false;
		}
	}
	return true;
}
function CheckBeforeSearch()
{
	var NotEmpty = false;
	var ReturnValue = true;
	
	if(jf_Trim(document.all["txRcvDateS"].value) != "")
		NotEmpty = true;
	if(jf_Trim(document.all["txRcvDateE"].value) != "")
		NotEmpty = true;
	if(jf_Trim(document.all["txDocNo"].value) != "")
		NotEmpty = true;
	if(jf_Trim(document.all["txRcvNo"].value) != "")
		NotEmpty = true;
		
	if(document.all["txRcvDateS"].value != "")
		document.all["txRcvDateS"].value = jf_PADL(document.all["txRcvDateS"].value,7,"0");
		
	if(document.all["txRcvDateE"].value != "")
		document.all["txRcvDateE"].value = jf_PADL(document.all["txRcvDateE"].value,7,"0");
		
	var ErrMsg = "";
	if(!jf_CheckCDATE(document.all["txRcvDateS"].value) && jf_Trim(document.all["txRcvDateS"].value) != "")
	{
		ErrMsg = "輸入日期格式不正確，請檢查";
		document.all["txRcvDateS"].value = "";
	}
	else if(!jf_CheckCDATE(document.all["txRcvDateE"].value) && jf_Trim(document.all["txRcvDateE"].value) != "")
	{
		ErrMsg = "輸入日期格式不正確，請檢查";
		document.all["txRcvDateE"].value = "";
	}	
	
	if(jf_Trim(ErrMsg) != "")
	{
		alert(ErrMsg);
		ReturnValue = true;			
	}
	else if(!NotEmpty)
	{		
		alert("查詢條件不可皆為空白");
		ReturnValue = true;
	}
	else
		ReturnValue = false;

	return ReturnValue;
}
function adjust()
{
	var strS = jf_Trim(document.all.txRcvDateS.value);
	var strE = jf_Trim(document.all.txRcvDateE.value);
	if(strS != "" && strE == "")
		document.all.txRcvDateE.value = strS;
	else if(strS == "" && strE != "")
		document.all.txRcvDateS.value = strE;
	else if(strS > strE)
	{
		document.all.txRcvDateS.value = strE;
		document.all.txRcvDateE.value = strS;
	}
	
}
