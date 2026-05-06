/*
 * DATE		SA		PRG			MGR_NO		DESC
 * 0991125	Yvonne	Bill		------		新增程式，EDT190退文原因維護作業，用來取代ODT130的移文原因欄位
 * 1050502  David   Zen         1050087     二代公文修改
 * 1051019  Leslie  Kenny       1050087     二代公文修改
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

//1050502 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1050502 Zen 1050087 二代公文修改
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
	//var xObjectName = document.activeElement.id;
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
		case "btDate":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txAssignDate, event.screenX, event.screenY);
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050502 Zen 1050087 二代公文修改
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
	
    //1050502 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
		    //1050502 Zen 1050087 二代公文修改
			//jf_ToolBarSubmit();
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
		    //1050502 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
		    //1050502 Zen 1050087 二代公文修改
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			/*//0991125	Bill	點選取消後就直接關閉視窗
			window.opener = null;
			window.open = ('', '_self', '');
			window.close();*/
			Page_BlockSubmit = !jf_ConfirmCancel();
			jf_ToolBarSubmit();
			
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
	if (!CheckCDATE("txAssignDate" , "移文日期"))
		return false;
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txDocNo"].value == "")
	{
	    strErrMsg += "公文文號欄位不可空白\n";
	    //1050606 Zen 1050087 二代公文修改
	    //document.all["txDocNo"].focus();
	    $('#txDocNo').focus();
	}
	
	if (document.all["txAssignDate"].value == "")
	{
	    strErrMsg += "移文日期欄位不可空白\n";
	    //1050606 Zen 1050087 二代公文修改
	    //document.all["txAssignDate"].focus();
	    $('#txAssignDate').focus();
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

//0991125	Bill	設定txDocNo內容改變時，textBox的Css與是否唯讀的模式切換
/*function txDocNoOnChange()
{
	if(document.all.txDocNo.value=="")
	{
		document.all.txDocNo.className = "KeyUpperField";
		document.all.txDocNo.disabled = false;
		document.all.txDocNo.readOnly = false;
	}
	else
	{
		document.all.txDocNo.className = "DisplayOnly";
		document.all.txDocNo.disabled = true;
	}
}*/

//0991125	Bill	將移文原因的DDL所選到的值存入移文原因的textBox
function dlAssignReasonOnChange()
{
	document.all.txAssignReason.value = document.all.dlAssignReason.options[document.all.dlAssignReason.selectedIndex].text;
	/*if(document.all.txAssignReason.value=="")
	{
		document.all.txAssignReason.className = "KeyUpperField";
		document.all.txAssignReason.disabled = false;
		document.all.txAssignReason.readOnly = false;
	}
	else
	{
		document.all.txAssignReason.className = "DisplayOnly";
		document.all.txAssignReason.disabled = true;
	}*/
}