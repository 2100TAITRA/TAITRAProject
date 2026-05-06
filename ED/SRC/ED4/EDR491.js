
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期		 SA           PG           單號	     概要
 * -------------------------------------------------------------------------------------------------
 * 1020701	 Kevin	      Erin  	   1020353	 新增報表
 * 1061020	 Kevin		  Joe		   1050087	 二代升級
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;
var IsCheck = new Boolean();
IsCheck = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1061020	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}
/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1061020	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1061020	joe		1050087		二代修改配合行動平台
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
//1061020 Joe 1050087 二代公文修改，傳入參數event
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
	//1061020 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			Page_BlockSubmit = !ColumnCheck();
			//1061020 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !ColumnCheck();
			//1061020 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btAppLvl1":
			Page_BlockSubmit = !ColumnCheck();
			//1061020 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btAppLvl2":
			Page_BlockSubmit = !ColumnCheck();
			//1061020 Joe 1050087 二代公文修改
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
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
	*/
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//列印年份開頭自動補0、日期檢核
//1061020	Joe		1050087		二代公文修改
// function PadZero(obj,num)
function PadZero(id,num)
{
	//1061020	Joe		1050087		二代公文修改
	var obj = document.all[id];
	//補0
	if(jf_Trim(obj.value) == "")
	{
		obj.value = jf_Trim(obj.value);
	}
	else
	{
		obj.value = jf_Trim(obj.value);
		obj.value = jf_PADL(obj.value,num,"0");
	}
	if (IsCheck)
	{
		IsCheck = false;
		return;
	}
	//檢核日期合理性
	IsCheck = true;
	if(!jf_CheckCDATE(obj.value+"01"))
	{
		alert("統計月份日期不合法，請重新輸入。");
		if(obj.id == "txBeginDate")
			//1061020	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txBeginDate"].focus();
			$('#txBeginDate').focus();
		else if(obj.id == "txEndDate")
			//1061020	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txEndDate"].focus();
			$('#txEndDate').focus();
	}
	IsCheck = false;
}
//預覽列印前檢核
function ColumnCheck()
{
	var BYear = document.all["txBeginDate"].value;
	var EYear = document.all["txEndDate"].value;
	document.all["txBeginDate"].onblur();
	document.all["txEndDate"].onblur();

	if(jf_Trim(BYear) == "" && jf_Trim(EYear) != "")
	{
		//BYear為空&EYear不為空 BYear值設為EYear
		document.all["txBeginDate"].value = EYear; 
	}
	else if(jf_Trim(EYear) == "" && jf_Trim(BYear) != "")
	{
		//EYear為空&BYear不為空 EYear值設為BYear
		document.all["txEndDate"].value = BYear; 
	}
	if(!jf_CheckCDATE(BYear+"01") && jf_Trim(BYear) != "")
	{
		return false;
	}
	if(!jf_CheckCDATE(EYear+"01") && jf_Trim(EYear) != "")
	{
		return false;
	}
	return true;
}