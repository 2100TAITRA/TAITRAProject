/*
DATE	SA		PRG		MGR_NO			DESC
1061006	David	Kevin_C	1060667			EPT011升二代，新增程式
1061103	David	Kevin_C	1060667			開啟時，DG預設勾選
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

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	CheckStatus();
	if (document.all.NODATA != null)
	{
		if (document.all.NODATA.value == "Y")
		{
			alert('目前流程尚未設定待議對象，請聯絡系統管理員，視窗即將關閉。');
			var $dlg = parent.$('#aol #docSysSettingDlgContainer');
			var $btn = $dlg.find('a#docSysDlg_close_btn');
			$btn.trigger('click');
		}
	}
	if (document.all.Completed != null) {
		if (document.all.Completed.value == "Y")
		{
			alert('傳送成功');
			var $dlg = parent.$('#aol #docSysSettingDlgContainer');
			var $btn = $dlg.find('a#docSysDlg_close_btn');
			$btn.trigger('click')
		}
	}
	if (document.all.NOCHECK != null) {
		if (document.all.NOCHECK.value == "Y") {
			alert('請至少勾選一個對象');
			document.all.NOCHECK.value = "";
		}
	}
	//1061103	Kevin_C	1060667		開啟時，DG預設勾選
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
		document.all["dg1__ctl"+i+"_cbSelect"].checked = true;
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
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
	
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btTransfer":
			Page_BlockSubmit = !CheckStatus();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClose":
			var $dlg = parent.$('#aol #docSysSettingDlgContainer');
			var $btn = $dlg.find('a#docSysDlg_close_btn');
			$btn.trigger('click');
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
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckStatus()
{
	if (document.all.ALREADY_HAS_NOTIFY_INFO != null) {
		if (document.all.ALREADY_HAS_NOTIFY_INFO.value == "Y") {
			if (!window.confirm("目前流程已發送過待議通知，是否重新發送")) {
				var $dlg = parent.$('#aol #docSysSettingDlgContainer');
				var $btn = $dlg.find('a#docSysDlg_close_btn');
				$btn.trigger('click');
				return false;
			}
		}
	}
	return true;
}