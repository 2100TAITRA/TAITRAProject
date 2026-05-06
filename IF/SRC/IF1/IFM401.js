/*
DATE    SA		PRG		MGR_NO		DESC
1070322	Kevin	Kevin	1070199		使用者登入時，系統會自動彈出視窗顯示宣導或警示訊息
 */

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
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
*   ToolBar Button 處理區
* 
*****************************************************************************/

function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	

	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSave":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;

	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
