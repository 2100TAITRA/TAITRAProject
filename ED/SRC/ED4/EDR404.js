/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* 程式修改歷程 
* -------------------------------------------------------------------------------------------------
* 日期			SA		修改人		單號		概要
* 101/08/09		Kevin	Chris		1010390	    新增程式，EDR404 公文展期申請作業
* 105/04/19     Kevin   Justin      1050087     二代公文修改
* 1051019       Leslie  Kenny       1050087     二代公文修改
* -------------------------------------------------------------------------------------------------
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

//1050421 Justin 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1051019   Kenny   [1050087]   二代公文修改；一併移除無用CODE
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
	
    //1050421 Justin 1050087 二代公文修改 
	/*switch (xObjectName)
	{
		case "ibClose_DateS":
			Page_BlockSubmit=true;			
			jf_CallCalendar(document.all.txClose_DateS, event.screenX, event.screenY);
			break;
		case "ibClose_DateE":
			Page_BlockSubmit=true;			
			jf_CallCalendar(document.all.txClose_DateE, event.screenX, event.screenY);
			break;		
	}*/
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050421 Justin 1050087 二代公文修改 
//function jf_ToolBarHandle()
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
	
    //1050421 Justin 1050087 二代公文修改 
    //xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{		
		case "btExcel":
			if(CheckDATEbeforeAction())
			{			
				Page_BlockSubmit = !jf_CheckBeforSave();
			    //1050421 Justin 1050087 二代公文修改 
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
	
	if (jf_Trim(document.all["txClose_DateS"].value) == ""&&jf_Trim(document.all["txClose_DateE"].value) == "")
	{
	    strErrMsg += "結案日期起迄不可皆為空白\n";
	    /*1050505 Justin 1050087 二代公文修改
		document.all["txClose_DateS"].focus();*/
	    $('#txClose_DateS').focus();
	}		
	var strClose_DateS = jf_Trim(document.all.txClose_DateS.value);
	var strClose_DateE = jf_Trim(document.all.txClose_DateE.value);	
	//若只輸入一邊結案日期，將另一邊設為相同值
	if( strClose_DateS != "" && strClose_DateE == "" )
		document.all.txClose_DateE.value = strClose_DateS;
	if(	strClose_DateS == "" && strClose_DateE != "" ) 
		document.all.txClose_DateS.value = strClose_DateE;		

	//若結案日期迄值大於起值，則將兩邊互換	
	strClose_DateS = jf_Trim(document.all.txClose_DateS.value);
	strClose_DateE = jf_Trim(document.all.txClose_DateE.value);	
	if( strClose_DateS>= strClose_DateE)
	{
		document.all.txClose_DateS.value = strClose_DateE;	
		document.all.txClose_DateE.value = strClose_DateS;	
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
//檢核日期格式
bHasCheck = false;
function CheckDATE(argObj,strMsg)
{
    
	if (bHasCheck)
	{
		bHasCheck = false;
		return;
	}
	bHasCheck = true;
	var strDate = document.all[argObj].value;
	if (strDate != "")
	{
		if (strDate.length < 7)
		{
			strDate = jf_PADL(strDate,7,'0');
			document.all[argObj].value = strDate;
		}
		if (!jf_CheckCDATE(strDate))
		{
			if (strMsg)
			    jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
		    /*1050505 Justin 1050087 二代公文修改
			document.all[argObj].focus();*/
			$('#'+argObj).focus();
			bHasCheck = false;
			return false;
		}
	}
	bHasCheck = false;	
	
	return true;	
}
//按下預覽/列印前再檢核一次日期
function CheckDATEbeforeAction()
{
	if(!CheckDATE("txClose_DateS","結案日期(起)"))
		return false;		
	else if(!CheckDATE("txClose_DateE","結案日期(迄)"))
		return false;	
	else
		return true;
}