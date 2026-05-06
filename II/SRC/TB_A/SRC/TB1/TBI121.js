/*
DATE 	    SA		PRG		MGR_NO		DESC
1120804		Leslie	Zen     1120426		新增TBI121 公告對象子視窗
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//記錄是否已檢核過有註冊onblur事件的欄位的值
var bHasCheck = false;


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

	if (IsServerHandling)
		return;

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
		return;

	//檢查是否TimeOut
	if (jf_IsTimeOut())
	{
		Page_BlockSubmit = true;
		return;
	}

	xObjectName = event.target.id;

	switch (xObjectName)
	{

	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/