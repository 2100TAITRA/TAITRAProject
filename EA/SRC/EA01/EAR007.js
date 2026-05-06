/*
DATE	SA		PRG		MGR_NO				DESC
1060720	Cloud	Justin	1060423				新增程式
1140612 Cloud   Joeko   1140264             新增ODS
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
	    case "ibCls":
	        Page_BlockSubmit = true;

	        var strVerNo = document.all["txVerNo"].value;
	        var strUrl = "../EA01/EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAR007" + "&VER_NO=" + strVerNo + "&MODE=1";
	        jf_OpenChildWin(strUrl, "EAC005", 800, 600);
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
		case "btPrint":
		case "btPreview":
		case "btExcel":
		//1140612   Joeko   1140264     新增ODS
		case "btODS":
			Page_BlockSubmit = !jf_CheckBeforSave();
			jf_ToolBarSubmit(xObjectName);
			break;
	    case "btClean":
	        Page_BlockSubmit = false;
	        if (jf_ConfirmClean(true)) {
	            jf_ToolBarSubmit(xObjectName);
	        }
	        break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	if (document.all.txVerNo.value == "" || document.all.txYear.value == "")
	{
		alert("版本別、年度號欄位皆不可為空白！");
		return false;
    }
	return true;
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
    if (argCallerId == "EAC005") {
        document.all["txFileCls"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
        document.all["txVerNo"].value = jf_Trim(document.all.lbReturnValue.options[5].value);
    }

	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/