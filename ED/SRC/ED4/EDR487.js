/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期	    SA	     	PM          單號	    概要
 * -------------------------------------------------------------------------------------------------
 * 1050825	Kevin		Joe			1050087		二代升級
 * 1051019  Leslie      Kenny       1050087     二代公文修改
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1050825 Joe 1050087 二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1050825 Joe 1050087 二代公文修改	
	// jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
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
//1050825 Joe 1050087 二代公文修改，參數多加event
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
	
	//1050825 Joe 1050087 二代公文修改
	// xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{

		case "btPrint":
			if(Check_MONTH())
			{
				Page_BlockSubmit = !jf_ConfirmPrint();
				//1050825 Joe 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
		case "btPreview":
			//1050825 Joe 1050087 二代公文修改
			Page_BlockSubmit = true;
			if(Check_MONTH())
			{
				Page_BlockSubmit = !jf_ConfirmPreview();
				//1050825 Joe 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
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
	var bRtnbool = true;
	var strErrMsg= "";

	
	if (document.all["txBeginDate"].value == "")
	{
		strErrMsg += "統計月份欄位不可空白\n";		
		//1050825	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["txBeginDate"].focus();
		$('#txBeginDate').focus();
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
//增加此檢查函式，於統計月份欄位Onblur時，自動補0以及檢查統計月份欄位是否符合格式
function Check_MONTH()
{
	var strYearMonth = document.all.txBeginDate.value;
	var datebool = false;
	if(strYearMonth != "")
	{
		if(strYearMonth.length < 5)
		{
			strYearMonth = jf_PADL(strYearMonth,5,"0");
			document.all.txBeginDate.value = strYearMonth;
		}
		if(document.all.h_txYM.value<document.all.txBeginDate.value)
		{
			jf_ShowMeg("輸入的月份大於統計月份,請重新輸入","您輸入之資料有誤，明細如下，請更正。");
			//1050825	Joe	1050087	二代系統升級，調整focus寫法
			// document.all.txBeginDate.focus();
			$('#' + document.all.txBeginDate.id).focus();
			datebool = false;
		}
		else if(!jf_CheckCDATE(strYearMonth + "01"))
		{
			jf_ShowMeg("輸入的月份不合法,請重新輸入","您輸入之資料有誤，明細如下，請更正。");
			//1050825	Joe	1050087	二代系統升級，調整focus寫法
			// document.all.txBeginDate.focus();
			$('#' + document.all.txBeginDate.id).focus();
			datebool = false;
		}
		else
		{
			datebool = true;
		}		
	}
	else
	{
			jf_ShowMeg("請輸入月份。","您輸入之資料有誤，明細如下，請更正。");
	}
	return datebool;
}
