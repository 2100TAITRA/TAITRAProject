/*
DATE 	SA		PRG		MGR_NO	DESC
1060405	David	Kevin_C	1050802	新增程式
1060825	Kevin_C	1060745	修正核判紀錄檢核邏輯錯誤
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

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
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
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
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
	
	xObjectName= event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
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
			jf_ToolBarSubmit(xObjectName);	
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSearch":
			Page_BlockSubmit = true;
			var pUrl = "EDT245C1.aspx";
			jf_OpenChildWin(pUrl, "EDT245C1", 200, 240);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
	var bRtnbool = false;

	if (jf_CheckBeforSave())
		bRtnbool = true;

	return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if(document.getElementById("ddlUser").options[document.getElementById("ddlUser").selectedIndex].value == "")
	{
		strErrMsg = "承辦人員不可為空\n";
		$('ddlUser').focus();
	}
	
	if (document.all["txCloseDate"].value != "")
	{
		if(document.getElementById("ddlOuStoreNo").options[document.getElementById("ddlOuStoreNo").selectedIndex].value == "")
		{
			strErrMsg += "單位檔號不可為空\n";
			$('ddlOuStoreNo').focus();
		}
		//1060825	Kevin_C	1060745	修正核判紀錄檢核邏輯錯誤
		//if(document.getElementById("ddlSignRecord").options[document.getElementById("ddlSignRecord").selectedIndex].value == "")
		if(document.all["ddlSignRecord_Text"].value == "")
		{
			strErrMsg += "核判紀錄不可為空\n";
			$('ddlSignRecord').focus();
		}
	}

	if (strErrMsg != "")
	{
		strErrMsg = strErrMsg.substring(0, strErrMsg.length-1)
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	else if (document.all["txCloseDate"].value != ""){
		if (!window.confirm("設定歸檔日期並儲存，此份公文則視為辦理完成，無法再由此程式進行維護，請問是否儲存?"))
			bRtnbool = false;
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
	if(argCallerId == "EDT245C1")
	{
		document.all.txDocNo.value = document.all.lbReturnValue.options[0].value;
		document.all.lbReturnValue.length = 0;
		Page_BlockSubmit = false;
		jf_ToolBarSubmit("btOpen");
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
//TEXT多行設定字數
function isMaxLength(obj)
{
	if (obj.value.length > 300)
	{
		jf_ShowMsg("", "主旨長度不可超過300!");
		obj.value = obj.value.substring(0, 300)
	}
}
//檢核日期格式
var bHasCheck = false;
function CheckDate(argObj)
{
	if (bHasCheck)
	{
		bHasCheck = false;
		return true;
	}
	bHasCheck = true;
	argObj.value = jf_Trim(argObj.value);
	if (argObj.value != "")
	{
		argObj.value = jf_PADL(argObj.value, 7, "0");
		if (!jf_CheckCDATE(argObj.value))
		{
			alert('辦理日期格式不正確');
			$('#' + argObj.id).focus();
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}