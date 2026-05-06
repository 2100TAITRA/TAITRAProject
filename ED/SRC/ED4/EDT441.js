/* DATE		SA		PRG		MGR_NO			DESC
 * 1060109	David	Kevin_C	1051234			新增程式
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
		case "btDelete":
			Page_BlockSubmit = !CheckBeforeDeleteSelected("dg1", "_cbSelect");
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit(xObjectName);
			break;
		
		//以下屬於DataGrid ToolBar
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
	if (!CheckDate(document.all["txDetailDate"]))
		return false;
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txDetailDate"].value == "")
	{
		strErrMsg += "辦理日期欄位不可空白\n";
		document.all["txDetailDate"].focus();
	}
	
	if (document.all["txDetailDesc"].value == "")
	{
		strErrMsg += "辦理情形欄位不可空白\n";
		document.all["txDetailDesc"].focus();
	}
		
	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforeDeleteSelected(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return false;

	//至少要勾選一筆才return true
	for (iRow=2;iRow<document.all[argTableName].rows.length+1;iRow++)
	{
		if (document.all[argTableName + "__ctl" + iRow + argCheckBoxName].checked)
			return true;
	}
	return false;
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
		argObj.value = jf_PADL(argObj.value,7,"0");	
		if (!jf_CheckCDATE(argObj.value))
		{
			alert('辦理日期格式不正確');
			$('#'+argObj.id).focus();
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;
	return true;
}
//TEXT多行設定字數
function isMaxLength(obj)
{
	if(obj.value.length>300)
	{
		jf_ShowMsg("","辦理情形長度不可超過300!");
		obj.value=obj.value.substring(0,300)
	}
}