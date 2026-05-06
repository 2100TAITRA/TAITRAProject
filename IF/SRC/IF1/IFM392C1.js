/*
 * DATE		SA		PRG		MGR_NO		DESC
1110408		Joe		Joe		1110092		新增本作業
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
var strTableFields = new Array("_hlLink","_lbRead1","_lbRead2");

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
	
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSave":		
			var rtn = [];
			$('#dg1').find('input:checked').closest('tr').find('span[id*="lbName"]').each(function(){rtn.push($(this).text());});
			BuildRet(rtn);
			break;
	    case "btSelectAll":
	        Page_BlockSubmit = true;
	        jf_SelectAll("dg1", "_cbSelect");
	        break;
	    case "btSelectInverse":
	        Page_BlockSubmit = true;
	        jf_SelectInverse("dg1", "_cbSelect");
	        break;
	    case "btSelectClear":
	        Page_BlockSubmit = true;
	        jf_SelectClear("dg1", "_cbSelect");
	        break;
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

function BuildRet(arRtn)
{
	DlgCallBack(arRtn.join(';'));
	DlgClose();
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
