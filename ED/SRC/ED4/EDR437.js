/*	
DATE	SA	     PRG	MGR_NO		DESC
0981210 Stella   Jane   0980609     修改產出"處室別逾期公文統計表"數據不正確的錯誤
1060802	Kevin	 Joe	1050087		二代系統升級
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

//1060802	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1060802	Joe		1050087		二代公文修改
	// jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	rb_checked();
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060802	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060802	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
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
//1060802 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1060802 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{

		case "btPrint":
			if(!document.all.rbOUdelay.checked )
				adjust();
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1060802 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			if(!document.all.rbOUdelay.checked )
				adjust();
			Page_BlockSubmit = !jf_ConfirmPreview();
			//1060802 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
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
function rb_checked()
{
	//1010413	Ivory	1010304	新增全局逾期公文統計表選項
	//if(document.all.rbOUdelay.checked)
	if(document.all.rbOUdelay.checked || document.all.rbAllDelay.checked )
	{
		//1060802	Joe	1050087	二代系統升級--S
		// document.all.hid1.style.display = "block";
		document.all.hid1.className = "dTR";
		// document.all.hid2.style.display = "none";
		document.all.hid2.className = "hide";
		//1060802	Joe	1050087	二代系統升級--E
		//0981210 承辦單位僅於處室別未辦結率統計表時不允許選取，此選項應開放選取[0980609]-Jane
		//1010413	Ivory	1010304	全局逾期公文統計表選項不開放選取承辦單位
		if( document.all.rbOUdelay.checked )
			//1060802	Joe	1050087	二代系統升級
			// document.all.hid3.style.display = "block";
			document.all.hid3.className = "dTR";
		else
			//1060802	Joe	1050087	二代系統升級
			// document.all.hid3.style.display = "none";				
			document.all.hid3.className = "hide";				
	}
	else
	{
		if(document.all.rbOU.checked)
		{
			//1060802	Joe	1050087	二代系統升級
			// document.all.hid3.style.display = "none";
			document.all.hid3.className = "hide";
		}
		else
		{
			//1060802	Joe	1050087	二代系統升級
			// document.all.hid3.style.display = "block";			
			document.all.hid3.className = "dTR";			
		}
		//1060802	Joe	1050087	二代系統升級--S
		// document.all.hid1.style.display = "none";
		document.all.hid1.className = "hide";
		// document.all.hid2.style.display = "block";
		document.all.hid2.className = "dTR";
		//1060802	Joe	1050087	二代系統升級--E
	}

}
//增加此檢查函式，於統計月份欄位Onblur時，自動補0以及檢查統計月份欄位是否符合格式
function Check_MONTH(txYearMonth)
{
	var strYearMonth = document.all.txYearMonthS.value;
	var datebool = false;
	if(strYearMonth != "")
	{
		if(strYearMonth.length < 5)
		{
			strYearMonth = jf_PADL(strYearMonth,5,"0");
			document.all.txYearMonthS.value = strYearMonth;
		}

		if(!jf_CheckCDATE(strYearMonth + "01"))
		{
			jf_ShowMeg("輸入的月份不合法,請重新輸入","您輸入之資料有誤，明細如下，請更正。");
			//1060802	Joe	1050087	二代系統升級，調整focus寫法
			// document.all.txYearMonthS.focus();
			$('#' + document.all.txYearMonthS.id).focus();	
			datebool = false;
		}
		else
		{
			datebool = true;
		}		
	}

	return datebool;
}
function adjust()
{
	var strS = jf_Trim(document.all.txYearMonthS.value);
	var strE = jf_Trim(document.all.txYearMonthE.value);

	if(strS != "" && strE == "")
		document.all.txYearMonthE.value = strS;
	else if(strS == "" && strE != "")
		document.all.txYearMonthS.value = strE;
	else if(strS > strE)
	{
		document.all.txYearMonthS.value = strE;
		document.all.txYearMonthE.value = strS;
	}
	
}
