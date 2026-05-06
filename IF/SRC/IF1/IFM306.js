/*
DATE	SA	    PRG	     MGR_NO		    DESC
1070331	Kevin  	Joe		1070118		新增多重機關帳號鏈結作業
1070717	Kevin  	Joe		1070678		弱掃修正Client Potential Code Injection、Heap Inspection
1070810	Kevin  	Joe		1070678		弱掃修正Client Potential Code Injection
1090107	Kevin_C	Joe		1081095		修正JS使用函式避免IE不支援導致程式判斷錯誤
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
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

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
		case "btDgDelete":
			Page_BlockSubmit = false;
			if (fnCheckBeforDgDelete()) {
				IsServerHandling = true;
				__doPostBack("btDgDelete", 0);
			}
			else
				Page_BlockSubmit = true;
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
	
	xObjectName=event.target.id;
	switch (xObjectName)
	{
		case "btSave":
			Page_BlockSubmit = false;
			//1070717	Joe		1070678		修正弱掃Heap Inspection
			// if (document.all.txConnAccount.value != "" && document.all.txConnPwd.value == "")
			if (document.all.txConnAccount.value != "" && document.all.txConnMima.value == "")
			{
				Page_BlockSubmit = true;
				alert('密碼不可為空');
			}
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

/********** 以下為按下儲存鍵後相關處理 **********/


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
/*****************************************************************************
*
*  Custom 處理區
* 
*****************************************************************************/
function fnCheckBeforDgDelete() {
	var bHasChecked = false;
	for (var i = 2; i < document.all.dg1.rows.length + 1; i++) {
		var CheckItem = "dg1__ctl" + i + "_cbdgSelect";
		if (document.all[CheckItem].checked) {
			bHasChecked = true;
			break;
		}
	}

	if (!bHasChecked)
		alert("請勾選預刪除的項目");

	return bHasChecked;
}

function fnGetAccName()
{
	var sAuthws = document.all.authWS.value;
	var argWSParam = new Array(1);
	// 1070810	Joe		1070678		弱掃修正Client Potential Code Injection
	sAuthws = encodeURI(sAuthws)
	//1070717	Joe		1070678		弱掃修正Client Potential Code Injection--S
	// argWSParam[0] = document.all.txConnAccount.value;
	// argWSParam[1] = document.all.dlConnOrg.selectedOptions[0].value;
	argWSParam[0] = encodeURI(document.all.txConnAccount.value);
	//1090107	Joe		1081095		修正取選單值的函式，避免IE不支援
	// argWSParam[1] = encodeURI(document.all.dlConnOrg.selectedOptions[0].value);
	argWSParam[1] = encodeURI(document.all.dlConnOrg.options[document.all.dlConnOrg.selectedIndex].value);
	//1070717	Joe		1070678		弱掃修正Client Potential Code Injection--E
	var CallWsObj = jf_CallWS(sAuthws, "GetAccountNameWithOrgNo", false, argWSParam);
	
	if (!CallWsObj.error && CallWsObj.value && CallWsObj.value != "")
	{
	    document.all.txConnName.value = CallWsObj.value;
	}
}