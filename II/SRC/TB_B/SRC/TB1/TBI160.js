/*
DATE	SA	    PRG	    MGR_NO	DESC
1100201	Leslie	Joe		1090927	取消使用document.activeElement
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
	fnCheckAlertMsg(); //檢查是否alert訊息
	fnCheckDisplayDiv(); //檢查是否顯示DIV內容
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1100201	Joe		1090927		取消使用document.activeElement
// function ClientButtonControl()
function ClientButtonControl(e)
{
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit = true;
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
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
		if(jf_IsWebServiceSuccess(CallWsObj))
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
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argLink)
{    
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//檢查是否alert訊息
function fnCheckAlertMsg()
{
	if(document.all["AlertMsg"] == null)
		return;
		
	var strAlertMsg = document.all["AlertMsg"].value;
	if(strAlertMsg != "")
		parent.fnShowMsgAndClose(strAlertMsg); //呼叫母視窗顯示訊息並關閉視窗
}

//檢查是否顯示DIV內容
function fnCheckDisplayDiv()
{
	if(document.all["DisplayDiv"] == null)
		return;
	
	var strDisplayDiv = document.all["DisplayDiv"].value;
	if(strDisplayDiv == "true")
	{
		document.all["DivBulletin"].style.display = "block";
	}
	else
	{
		document.all["DivBulletin"].style.display = "none";
	}
}