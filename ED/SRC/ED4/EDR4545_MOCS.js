/*
DATE 	 SA		 PRG	  MGR_NO	DESC
1111212  Kevin   Joe      1110845   新增程式
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
		case "btPreview":
			Page_BlockSubmit = !jf_CheckPreview();
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
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function jf_CheckPreview()
{
	var bChecked = true;
	if(document.all.txMonth.value == ""){
		alert('統計月份不可為空');
		return false;
	}
	else{
		if(document.all.lbMaxYearMonth.textContent == "過統計作業"){
			alert('請先透過ODP420執行統計作業後再預覽報表');
			return false;
		}
		else if(document.all.txMonth.value > document.all.lbMaxYearMonth.textContent.replace('年','').replace('月','')){
			alert('列印月份不可超過目前最大統計年月');
			return false;
		}
		bChecked = jf_CheckMonth('txMonth');
	}
	return bChecked;
		
}


//列印月份欄位Onblur時，自動補0以及檢查列印月份欄位是否符合格式
function jf_CheckMonth(argMonth)
{
	var bCheckM = true;
	var strMonth = jf_Trim(document.all[argMonth].value);
	if(strMonth != "")
	{
		if(strMonth.length < 5)
		{
			strMonth = jf_PADL(strMonth,5,"0");
			document.all[argMonth].value = strMonth;
		}
		if(!jf_CheckCDATE(strMonth + "01"))
		{
			document.all[argMonth].value = "";
			$('#' + argMonth).focus();
			bCheckM = false;
			alert("輸入的月份格式錯誤，請重新輸入");
		}
	}
	return bCheckM;
}