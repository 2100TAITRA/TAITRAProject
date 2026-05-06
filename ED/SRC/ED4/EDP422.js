/*
DATE	SA		PRG		MGR_NO	DESC
0950902	Caesar	Charles	955011	統計月份欄位Onblur時，自動補0以及檢查統計月份欄位是否符合格式
1050526	Kevin	Joe 	1050087	二代公文修改
1051019 Leslie  Kenny   1050087 二代公文修改
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

//1050526 Joe 1050087 二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1051019   Kenny   [1050087]   二代公文修改；移除無用CODE
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	
	if(document.all.lbExecName.textContent == "")
		document.all.trExecName.className = "hide";
	else
		document.all.trExecName.className = "dTR";
		
	if(document.all.lbExecTime.textContent == "")
		document.all.trExecTime.className = "hide";
	else
		document.all.trExecTime.className = "dTR";
	
	if(document.all.lbSeqNo.textContent == "")
		document.all.trSeqNo.className = "hide";
	else
		document.all.trSeqNo.className = "dTR";
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
//1050526 Joe 1050087 二代公文修改，傳入event參數
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
	
	//1050526 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			if( document.all.txYearMonth.value == "" )
			{
				alert("請輸入統計月份。");
				//1050526	Joe	1050087	二代系統升級，調整focus寫法
				//document.all.txYearMonth.focus();
				$('#' + txYearMonth.id).focus();		
				return;
			}
			if( jf_CheckCDATE(document.all.txYearMonth.value + "01") == false )
			{
				alert("統計月份之格式不正確．(YYYMM)");
				//1050526	Joe	1050087	二代系統升級，調整focus寫法
				//document.all.txYearMonth.focus();
				$('#' + txYearMonth.id).focus();
				return;
			}
			else
			{
				if(document.all.hMaxMonth.value != "")
				{
					var year1 = parseInt(document.all.txYearMonth.value.substr(0,3));
					if(year1 == 0)
						year1 = parseInt(document.all.txYearMonth.value.substr(1,2));
					var month1 = parseInt(document.all.txYearMonth.value.substr(3,2));
					if(month1 == 0)
						month1 = parseInt(document.all.txYearMonth.value.substr(4,1));
					var year2 = parseInt(document.all.hMaxMonth.value.substr(0,3));
					if(year2 == 0)
						year2 = parseInt(document.all.hMaxMonth.value.substr(1,2));
					var month2 = parseInt(document.all.hMaxMonth.value.substr(3,2));
					if(month2 == 0)
						month2 = parseInt(document.all.hMaxMonth.value.substr(4,1));
						
					if(year1<year2 || (year1==year2 && month1<month2))
					{
						alert("目前系統已統計至"+year2+"年"+month2+"月，歷史統計資料均已鎖定，無法進行解除鎖定作業。");
						//1050526	Joe	1050087	二代系統升級，調整focus寫法
						//document.all.txYearMonth.focus();
						$('#' + txYearMonth.id).focus();
						return;
					}
					if(year1>year2 || (year1==year2 && month1>month2))
					{
						if(((year1-year2)*12-month2+month1)>0)
						{
							alert("目前系統僅統計至"+year2+"年"+month2+"月，無法開啟。");
							//1050526	Joe	1050087	二代系統升級，調整focus寫法
							//document.all.txYearMonth.focus();
							$('#' + txYearMonth.id).focus();
							return;
						}
					}
				}
			}
			//1050526 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btUnLock":
			Page_BlockSubmit = !window.confirm("確定要解除此月份的統計鎖定嗎?");
			//1050526 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050526 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
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
	
	if (document.all["txYearMonth"].value == "")
	{
		strErrMsg += "統計月份欄位不可空白\n";
		//1050526	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txYearMonth"].focus();
		$('#txYearMonth').focus();	
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
			//document.all["txYearMonth"].value = jf_Trim(argResult.value.RtnStr);
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
		document.all["txYearMonth"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txYearMonth"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txYearMonth"].focus();
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
//[問題單955011] Charles 增加此檢查函式，於統計月份欄位Onblur時，自動補0以及檢查統計月份欄位是否符合格式 0950818
function Check_MONTH()
{
	var strYearMonth = document.all.txYearMonth.value;
	if(strYearMonth != "")
	{
		if(strYearMonth.length < 5)
		{
			strYearMonth = jf_PADL(strYearMonth,5,"0");
			document.all.txYearMonth.value = strYearMonth;
		}

		if(!jf_CheckCDATE(strYearMonth + "01"))
		{
			jf_ShowMeg("輸入的月份不合法,請重新輸入","您輸入之資料有誤，明細如下，請更正。");
			//1050526	Joe	1050087	二代系統升級，調整focus寫法
			//document.all.txYearMonth.focus();
			$('#' + txYearMonth.id).focus();	
		}
	}
}