/*
DATE	SA		PRG		MGR_NO		DESC
1111130	David	David	1110881		新增程式
1120222	David	David	-------		(需求序14衍伸修改)調整程式操作模式
1120411	David	David	-------		(銓敘部問題彙整表序213)支援「已辦畢-結案未歸檔」「已辦畢-已核定待發文」
1130124	David	Zen		1130022		調整強制簽收子視窗大小
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;
window.onunload = ClientOnUnLoad;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1120222 David 完成後不關閉視窗
	/*if(!!document.all.SendSuccess)
	{
		alert("強制簽收完成，已於背景傳送處理中");
		opener.window.CallBack("EDT271C2");
	    close();
	}*/

	//1130124 Zen 1130022 調整強制簽收子視窗大小，因視窗較小隱藏footer
	$('.footStatus')[0].className = 'hide'
}

function ClientOnUnLoad()
{
	//1120222 David 關閉時，如執行過強制簽收，需通知母視窗
	if(!!document.all.IsExecute)
		opener.window.CallBack("EDT271C2");
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
		case "btCheck":
			fnDocOnblur();
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

	xObjectName = event.target.id;

	switch (xObjectName)
	{
		//以下屬於DataGrid ToolBar
		case "btCancel":
			Page_BlockSubmit = true;
			//1120222 David 關閉時，如執行過強制簽收，需通知母視窗
			if(!!document.all.IsExecute)
				opener.window.CallBack("EDT271C2");
			window.close();
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

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function fnDocOnblur(argType)
{
	if(CheckBeforeSned())
	{
		Page_BlockSubmit=false;
		jf_ToolBarSubmit("btSend");
	}
}

function CheckBeforeSned()
{
	if($("#txDocNo").val() == "")
		return false;
	let CheckRtn = ED2.EDT271C2_MOCS.CheckDoc($("#SsoArtifact").val(), $("#OrgNo").val(), $("#txDocNo").val(), $("#OuId").val()).value;
	if(CheckRtn.bSuccess)
	{
		$("#txMsgId").val(CheckRtn.MsgID);
		$("#txFlowType").val(CheckRtn.FlowType);//1120411 David 紀錄流程類型
		return true;
	}
	else
	{
		alert("無法執行強制簽收，錯誤訊息：" + CheckRtn.ErrMsg);
		$("#txDocNo").val("");
		return false;
	}
}