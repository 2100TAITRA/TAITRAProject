/*
DATE 	 SA		 PRG	  MGR_NO	DESC
1110314  Kevin   Kevin    1101584   新增程式公文處理情形統計表(含流程時間)
1110412  Kevin	 Kevin	  --		修正考試院開啟程式
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
		case "btPreview":
			if(jf_CheckMonth("txYearMonth"))
			{
				Page_BlockSubmit = !(jf_ConfirmPreview() && jf_CheckBeforePrint());
				jf_ToolBarSubmit(xObjectName);
			}
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
//檢核欄位不可為空白、大小順序、是否大於最大統計月份
function jf_CheckBeforePrint()
{
	var bChecked = true;
	var strY = jf_Trim(document.all.txYearMonth.value);
	var strH = jf_Trim(document.all.h_MaxYearMonth.value);
	
	
	if( strY > strH  )
	{
		$('#' + document.all.txYearMonth.id).focus();
		bChecked = false;
		alert( "列印月份不可大於最大統計月份");
	}
	return bChecked;
}
