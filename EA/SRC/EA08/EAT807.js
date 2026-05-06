/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			SA	 	修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1060427		Cloud	Kevin_C	1050784	新增程式 * 1100204      Leslie  Zen     1090927 取消使用document.activeElement
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
//1100204 Zen 1090927 取消使用document.activeElement//function ClientButtonControl()
function ClientButtonControl(event)
{
    //1100204 Zen 1090927 取消使用document.activeElement    //var xObjectName = document.activeElement.id;
    var xObjectName = event.target.id;

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
	Page_BlockSubmit = true;
	switch (xObjectName)
	{
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			jf_SelectAll("dg1", "_cbSelect");
			break;
		case "btSelectInverse":
			jf_SelectInverse("dg1", "_cbSelect");
			break;
		case "btSelectClear":
			jf_SelectClear("dg1", "_cbSelect");
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
			if (document.all["txClsNo"].value == "")
			{
				alert("最底層分類號欄位不可空白");
				Page_BlockSubmit = true;
			}
			else
			{
				Page_BlockSubmit = false;
			}
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
			var strUrl = "EAT807C1.aspx";
			jf_OpenChildWin(strUrl, "EAT807C1", 700, 500);
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
	if (argResult.id == wsGetClsID)
    {
		if (jf_IsWebServiceSuccess(argResult))
		{
			if (argResult.value.IS_LOWEST != 1) {
				alert("請輸入最底層分類號");
				document.all["h_ClsKey"].value = "";
				document.all["h_ClsLvl"].value = "";
				document.all["txClsNo"].value = "";
				$('#txClsNo').focus();
			}
			else
			{
				document.all["txVerNo"].value = argResult.value.VerNo;
				document.all["h_ClsKey"].value = argResult.value.ClsKey;
				document.all["h_ClsLvl"].value = argResult.value.ClsLvl;
				document.all["lbClsName"].textContent = argResult.value.ClsName;
			}
		}
		else
		{
			document.all["h_ClsKey"].value = "";
			document.all["h_ClsLvl"].value = "";
			document.all["txClsNo"].value = "";
			$('#txClsNo').focus();
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
	if(argCallerId == "EAT807C1")
	{
		document.all["txClsNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		ClsNoOnBlur();
		if (document.all["h_ClsKey"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		$('txClsNo').focus();
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
var wsGetClsID;
function ClsNoOnBlur()
{
	if(document.all["txClsNo"].value != "")
	{
		var arWSParam = new Array(4);
		arWSParam[0] = document.all["h_OrgNo"].value;
		arWSParam[1] = document.all["txVerNo"].value;
		arWSParam[2] = document.all["txClsNo"].value;
		arWSParam[3] = "";
		callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetCls", false, arWSParam);

		wsGetClsID = callObj.id;
		OnWSResult(callObj);
	}
}