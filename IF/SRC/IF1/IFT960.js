/* 
DATE		SA		PRG		MGR_NO			DESC
1040209		Kevin	Kevin	1030911			新增軟體正式憑證
1060524		Kevin	Joe		1050087			二代升級改寫為IFI960
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
var strTableFields = new Array("lbSEQ_NO", "lbCardID", "lbExpDate", "lbEntryDate", "lbEntryUser", "lbStatus", "lbBorrowUser");


/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	if ($('#H_txMSG').length > 0 && $('#H_txMSG').val() != "") {
		alert($('#H_txMSG').val());
		$('#H_txMSG').val('');
	}
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
		case "btCommit":
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			jf_ToolBarSubmit(xObjectName);
			break;
	}
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
		if (jf_IsWebServiceSuccess(argResult))
		{
		}
		else
		{
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
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/