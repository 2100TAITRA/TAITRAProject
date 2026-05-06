/*
DATE	SA		PRG		MGR_NO		DESC
1050720	KEVIN	JOE		1050087		二代系統升級
1051019 Leslie  Kenny   1050087     二代公文修改
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

//1050720 Joe 1050087 二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
		//1050720 Joe 1050087 二代公文修改
	// jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeEyName", false, null); //使用WebService前必須先呼叫一次
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
//1050720 Joe 1050087 二代公文修改，傳入event參數
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
	
	//1050720 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			if(document.all.txBeginDate.value==""&&document.all.txEndDate.value=="")
			{
				jf_ShowMeg("統計月份欄位不可皆為空白。","");
				//1050720 Joe 1050087 二代公文修改
				//document.all.txBeginDate.focus();
				$('#' + document.all.txBeginDate.id).focus();
			}
			else if(Check_MONTH(document.all.txBeginDate.id))
			{
				if(Check_MONTH(document.all.txEndDate.id))
				{
					adjust();
					Page_BlockSubmit = !jf_ConfirmPrint();
					//1050720 Joe 1050087 二代公文修改
					//jf_ToolBarSubmit();
					jf_ToolBarSubmit(xObjectName);
				}
			}
			break;
		case "btPreview":
			if(document.all.txBeginDate.value==""&&document.all.txEndDate.value=="")
			{
				jf_ShowMeg("統計月份欄位不可皆為空白。","");
				//1050720 Joe 1050087 二代公文修改
				//document.all.txBeginDate.focus();
				$('#' + document.all.txBeginDate.id).focus();
			}
			else if(Check_MONTH(document.all.txBeginDate.id))
			{
				if(Check_MONTH(document.all.txEndDate.id))
				{
					adjust();
					Page_BlockSubmit = !jf_ConfirmPrint();
					//1050720 Joe 1050087 二代公文修改
					//jf_ToolBarSubmit();
					jf_ToolBarSubmit(xObjectName);
				}
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
//增加此檢查函式，於統計月份欄位Onblur時，自動補0以及檢查統計月份欄位是否符合格式
function Check_MONTH(txYearMonth)
{
	var strYearMonth = document.all[txYearMonth].value;
	var datebool = false;
	if(strYearMonth == "")
	{
		datebool =true;
	}
	else
	{
		if(strYearMonth.length < 5)
		{
			strYearMonth = jf_PADL(strYearMonth,5,"0");
			document.all[txYearMonth].value = strYearMonth;
		}
		if(document.all.h_txYM.value<document.all[txYearMonth].value)
		{
			jf_ShowMeg("輸入的月份大於統計月份,請重新輸入","您輸入之資料有誤，明細如下，請更正。");
			//1050720 Joe 1050087 二代公文修改
			//document.all[txYearMonth].focus();
			$('#' + txYearMonth).focus();
			datebool = false;
		}

		if(!jf_CheckCDATE(strYearMonth + "01"))
		{
			jf_ShowMeg("輸入的月份不合法,請重新輸入","您輸入之資料有誤，明細如下，請更正。");
			document.all[txYearMonth].value ="";
			//1050720 Joe 1050087 二代公文修改
			//document.all[txYearMonth].focus();
			$('#' + txYearMonth).focus();
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
	var strS = jf_Trim(document.all.txBeginDate.value);
	var strE = jf_Trim(document.all.txEndDate.value);

	if(strS != "" && strE == "")
		document.all.txEndDate.value = strS;
	else if(strS == "" && strE != "")
		document.all.txBeginDate.value = strE;
	else if(strS > strE)
	{
		document.all.txBeginDate.value = strE;
		document.all.txEndDate.value = strS;
	}
	
}