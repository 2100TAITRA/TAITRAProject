/*
DATE	SA		PRG		MGR_NO			DESC
1111028	Kevin	Zen     1110836         新增EDT453 存查續辦登錄作業
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;
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
function ClientButtonControl(e)
{
	var xObjectName = e.target.id;

	var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;

	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl" + pNo + "_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}

	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}

	//檢查是否TimeOut
	if (jf_IsTimeOut())
	{
		Page_BlockSubmit = true;
		return;
	}

	switch (xObjectName)
	{

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

	if (IsServerHandling)
	{
		Page_BlockSubmit = true;
		return;
	}

	//檢查是否TimeOut
	if (jf_IsTimeOut())
	{
		Page_BlockSubmit = true;
		return;
	}

	xObjectName = event.target.id;
			

	switch (xObjectName)
	{
		case "btSave":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = true;
			jf_CloseSelf();
			break;
		case "btClean":
			Page_BlockSubmit = true;
			jf_ConfirmClean(true);
	}
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

