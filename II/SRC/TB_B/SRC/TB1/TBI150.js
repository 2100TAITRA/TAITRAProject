/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

var idxDownload = 0;
var idxFirst = 2;
var idxPrev = 3;
var idxNext = 4;
var idxLast = 5;
var idxTotal = 8;
var idxCount = 12;
var idxGo = 14;
var idxCurrentCount = 1;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	try
	{
		var strSAMLart		= GetParam("SAMLart");
		var strSeqNo		= GetParam("SeqNo");
		var strBulletinId	= GetParam("BulletinId");
		var strTotal = parent.fnGetBulletinCount();
		var strFileCount = parent.fnGetFileCount();
		idxCurrentCount = strSeqNo;
		GetToolbarCtrl(idxCount).setAttribute("value", strSeqNo);
		GetToolbarCtrl(idxTotal).setAttribute("text", strTotal);
		fnSetToolbarCtrl(strSeqNo, strTotal);
		if (!strFileCount)
			GetToolbarCtrl(idxDownload).setAttribute("disabled", true);
	}
	catch(ex){
		DisableAll();
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle()
{
	Page_BlockSubmit=true;
	var xObjectName;
	var evBtn;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	xObjectName = window.event.srcNode.getAttribute("ID");
	
	switch (xObjectName)
	{
		case "btDownload":
			parent.fnDownload();
			break;
		case "btFirst":
			fnChangeCount("First");
			break;
		case "btPrev":
			GetToolbarCtrl(idxCount).setAttribute("value", idxCurrentCount);
			fnChangeCount("Prev");
			break;
		case "btNext":
			GetToolbarCtrl(idxCount).setAttribute("value", idxCurrentCount);
			fnChangeCount("Next");
			break;
		case "btLast":
			fnChangeCount("Last");
			break;
		case "btGo":
			fnChangeCount("Go");
			break;
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function fnChangeCount(argType)
{
	var iCount = parseInt( GetToolbarCtrl(idxCount).getAttribute("value"), 10 );
	var iTotal = parseInt( GetToolbarCtrl(idxTotal).getAttribute("text"), 10 );

	var oCount = GetToolbarCtrl(idxCount);
	var strCount = oCount.getAttribute("value");
	if (iCount != 0 && (!iCount || iCount != strCount))
	{
		oCount.focus();
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["筆數必須為正整數，請重新輸入。"])),"");
		return;
	}
	else if (iCount < 1 || iCount > iTotal)
	{
		oCount.focus();
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["筆數必須為介於1與"+iTotal+"之間，請重新輸入。"])),"");
		return;
	}

	switch (argType)
	{
		case "First":	//第一筆
			iCount = 1;
			break;
		case "Prev":	//上一筆
			iCount--;
			break;
		case "Next":	//下一筆
			iCount++;
			break;
		case "Last":	//最後一筆
			iCount = iTotal;
			break;
		case "Go":		//Go
			break;
	}
	idxCurrentCount = iCount;
	GetToolbarCtrl(idxCount).setAttribute("value", idxCurrentCount);
	fnSetToolbarCtrl(iCount, iTotal);
	parent.fnReShow( parent.fnGetBulletinId(iCount-1) );
}

//依據總比數及目前顯示比數來設定Toolbar按鈕的啟用或停用
function fnSetToolbarCtrl(argCount, argTotal)
{
	if (argTotal == 0)
	{
		GetToolbarCtrl(idxDownload).setAttribute("disabled", true);
		GetToolbarCtrl(idxFirst).setAttribute("disabled", true);
		GetToolbarCtrl(idxPrev).setAttribute("disabled", true);
		GetToolbarCtrl(idxNext).setAttribute("disabled", true);
		GetToolbarCtrl(idxLast).setAttribute("disabled", true);
		GetToolbarCtrl(idxCount).setAttribute("disabled", true);
		GetToolbarCtrl(idxGo).setAttribute("disabled", true);
		return;
	}
	//設定上一筆、第一筆的啟用或停用
	if (argCount == 1)
	{
		GetToolbarCtrl(idxFirst).setAttribute("disabled", true);
		GetToolbarCtrl(idxPrev).setAttribute("disabled", true);
	}
	else
	{
		GetToolbarCtrl(idxFirst).setAttribute("disabled", false);
		GetToolbarCtrl(idxPrev).setAttribute("disabled", false);
	}

	//設定下一筆、末一筆的啟用或停用
	if (argCount == argTotal)
	{
		GetToolbarCtrl(idxLast).setAttribute("disabled", true);
		GetToolbarCtrl(idxNext).setAttribute("disabled", true);
	}
	else
	{
		GetToolbarCtrl(idxLast).setAttribute("disabled", false);
		GetToolbarCtrl(idxNext).setAttribute("disabled", false);
	}
}

function GetToolbarCtrl(argObjIndex)
{
	return document.all.tbTool.getItem(argObjIndex);
}
function DisableAll()
{
		GetToolbarCtrl(idxFirst).setAttribute("disabled", true);
		GetToolbarCtrl(idxPrev).setAttribute("disabled", true);
		GetToolbarCtrl(idxNext).setAttribute("disabled", true);
		GetToolbarCtrl(idxLast).setAttribute("disabled", true);
		GetToolbarCtrl(idxCount).setAttribute("disabled", true);
		GetToolbarCtrl(idxGo).setAttribute("disabled", true);
}