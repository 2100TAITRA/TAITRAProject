/*
DATE		SA		PRG		MGR_NO		DESC
1040224	    Kevin	Kenny	1030982		新增程式
1050831		Kevin	Joe		1050087		二代升級
1051019     Leslie  Kenny   1050087     二代公文修改
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

//1050831 Joe 1050087 二代公文修改--S
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1050831 Joe 1050087 二代公文修改--E

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
//1050831 Joe 1050087 二代公文修改，參數多加event
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
	
	//1050831 Joe 1050087 二代公文修改
	// xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btPrint":
			Page_BlockSubmit = !CheckBeforeRemitting();
			//1050831 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = !CheckBeforeRemitting();
			//1050831 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btExcel":
			Page_BlockSubmit = !CheckBeforeRemitting();
			//1050831 Joe 1050087 二代公文修改
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
	
	if (document.all["txKeyFld"].value == "")
	{
		strErrMsg += "鍵值欄位不可空白\n";
		//1050831	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["txKeyFld"].focus();
		$('#txKeyFld').focus();
	}
	
	if (document.all["txRequireFld"].value == "")
	{
		strErrMsg += "必要欄位不可空白\n";
		//1050831	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["txRequireFld"].focus();
		$('#txRequireFld').focus();
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
function rbLvCheck()
{	
	if(document.all["rbYearMon"].checked==true)
	{		
		document.all["txYear"].readOnly=true;
		document.all["txYearMon"].readOnly = false;
		//1050831	Joe	1050087	二代系統升級--S
		//document.all["txYear"].className = "displayonly";
		document.all["txYear"].className = "DisplayOnly";
		//document.all["txYearMon"].className = "InputFieldText";
		document.all["txYearMon"].className = "InputFieldNumeric";
		//1050831	Joe	1050087	二代系統升級--E
		document.all["txYear"].value="";
		//1050831	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["txYearMon"].focus();
		$('#txYearMon').focus();
		document.all["txYear"].tabIndex=-1;
	}
	else
	{
		document.all["txYearMon"].readOnly=true;
		document.all["txYear"].readOnly = false;
		//1050831	Joe	1050087	二代系統升級--S
		//document.all["txYearMon"].className = "displayonly";
		document.all["txYearMon"].className = "DisplayOnly";
		//document.all["txYear"].className = "InputFieldText";
		document.all["txYear"].className = "InputFieldNumeric";
		//1050831	Joe	1050087	二代系統升級--E
		document.all["txYearMon"].value="";
		//1050831	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["txYear"].focus();
		$('#txYear').focus();
		document.all["txYearMon"].tabIndex=-1;
	}
}

function  CheckBeforeRemitting()
{
	var bRtnbool = true;
	var year2  = document.all.hMaxMonth.value.substr(0,3);
	var month2 = document.all.hMaxMonth.value.substr(3,2);
	
	if (jf_Trim(document.all["dlOrg"].value) == "")
	{
	    strErrMsg = "隸屬機關選項不可為空白";
		//1050831	Joe	1050087	二代系統升級，調整focus寫法
		// document.all["dlOrg"].focus();
		$('#dlOrg').focus();
	    bRtnbool = false;
	    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
	}
	else if(jf_Trim(document.all.txYearMon.value) != "")
	{
		var strMonth = jf_Trim(document.all.txYearMon.value);
		if(strMonth.length < 5)
		{
			strMonth = jf_PADL(strMonth,5,"0");
			document.all.txYearMon.value = strMonth;
		}
		if(!jf_CheckCDATE(strMonth + "01"))
		{
			document.all.txYearMon.value = "";
			//1050831	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txYearMon"].focus();
			$('#txYearMon').focus();
			strErrMsg = "輸入的月份格式錯誤，請重新輸入";
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );			
		}
		var year1 = document.all.txYearMon.value.substr(0,3);
		var month1 = document.all.txYearMon.value.substr(3,2);
		if ( year1 == "000" )
		{
			strErrMsg = "列印年度不可等於0";
			//1050831	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txYearMon"].focus();
			$('#txYearMon').focus();
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		}
		
		if(document.all.txYearMon.value.substr(3,2) == "00")
		{
			strErrMsg = "列印月份不可等於0";
			//1050831	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txYearMon"].focus();
			$('#txYearMon').focus();
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		}
		
		if(year1>year2||(year1==year2&&month1>month2))
		{
			strErrMsg = "列印月份不可大於目前統計最大月份";
			//1050831	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txYearMon"].focus();
			$('#txYearMon').focus();
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		}
		if( month2 > 12 )
		{
			strErrMsg = "列印月份格式錯誤";
			//1050831	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txYearMon"].focus();
			$('#txYearMon').focus();
			bRtnbool =false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );		
		}
	}
	else if ( jf_Trim(document.all.txYear.value) != "" )
	{
		var strYear = jf_Trim(document.all.txYear.value);

		if(strYear.length < 3)
		{
			strYear = jf_PADL(strYear,3,"0");
			document.all.txYear.value = strYear;
		}

		if(strYear > year2)
		{
			strErrMsg = "列印年度不可大於目前統計最大年度";
			//1050831	Joe	1050087	二代系統升級，調整focus寫法
			// document.all["txYear"].focus();
			$('#txYear').focus();
			bRtnbool = false;
			jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		}
		
	}
	else if ( document.all.rbYearMon.checked && jf_Trim(document.all.txYearMon.value) == "" )
	{
		strErrMsg = "請輸入欲查詢月份";
		document.all.rbYearMon.checked = true ;
		bRtnbool =false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		return bRtnbool;
	}
	else if ( document.all.rbYear.checked && jf_Trim(document.all.txYear.value) == "" )
	{
		strErrMsg = "請輸入欲查詢年度";
		document.all.rbYear.checked = true ;
		bRtnbool =false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
		return bRtnbool;
	}

	return bRtnbool;
}
