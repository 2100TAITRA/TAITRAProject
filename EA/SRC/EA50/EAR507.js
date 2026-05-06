 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1060327      Joe  	1050087 二代系統升級
 * 1100401		Joe		1101529	新增Excel匯出功能
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

//指定DataGrid欄位
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

//1060327	Joe		1050087		二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;



/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1060327	Joe		1050087		二代公文修改--S
	// jf_CallWS("../EALIB/EA_LIB.asmx", "GetDespFromPlanMain", false, null);
	// jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//1060327	Joe		1050087		二代公文修改--S
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060327	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1060327	joe		1050087		二代修改配合行動平台
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
		case "btKeyHelp": //銷毀計畫		
			Page_BlockSubmit=true;
			var strUrl = "";
			strUrl = "EAT501C1.aspx";
			jf_OpenChildWin(strUrl, "EAT501C1", 700, 500 );			
			break;
			
		case "btHelp": //計畫批號提示
			Page_BlockSubmit=true;
		    var pUrl = "";
		    pUrl = "../EA40/EAT400C1.aspx";
			jf_OpenChildWin(pUrl, "EAT400C1", 750, 500);
			break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060327 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1060327 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{		
		//1060327 Joe 1050087 二代公文修改，無使用查詢功能--S
		// case "btSearch":
			// Page_BlockSubmit = !jf_CheckBeforSave();
			// jf_ToolBarSubmit(xObjectName);
			// break;
		//1060327 Joe 1050087 二代公文修改，無使用查詢功能--E
			
		case "btPrint":
			Page_BlockSubmit = true;
			if ((document.all.txDPlan.value == "") && (document.all.txPlanNo.value == ""))
			{
				alert("銷毀計畫編號及清理批號不可空白");
				//1060327	Joe	1050087	二代系統升級，調整focus寫法
				//document.all.txDPlan.focus();
				$('#' + document.all.txDPlan.id).focus();	
				return;
			}
			if (document.all.txPlanNo.value != "")
			{
				var param = new Array(1);
				param[0] = document.all.txPlanNo.value;
				var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "CheckPlanTypeDestroy", false , param);
				var iCallID_txPlanNo1 = callObj.id;
				if (callObj.value.RtnBool == false)
				{
					alert("清理計畫批號之清理範圍必須為銷毀，請重新輸入");
					//1060327	Joe	1050087	二代系統升級，調整focus寫法
					//document.all.txPlanNo.focus();
					$('#' + document.all.txPlanNo.id).focus();	
					return;
				}			
			}
			Page_BlockSubmit = false;
			//1060327 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;

		//1110331	Joe		1101529		新增匯出Excel功能
		case "btExcel":
		case "btPreview":
			Page_BlockSubmit = true;
			if ((document.all.txDPlan.value == "") && (document.all.txPlanNo.value == ""))
			{
				alert("銷毀計畫編號及清理批號不可空白");
				//1060327	Joe	1050087	二代系統升級，調整focus寫法
				//document.all.txDPlan.focus();
				$('#' + document.all.txDPlan.id).focus();	
				return;
			}
			if (document.all.txPlanNo.value != "")
			{
				var param = new Array(1);
				param[0] = document.all.txPlanNo.value;
				var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "CheckPlanTypeDestroy", false , param);
				var iCallID_txPlanNo1 = callObj.id;
				if (callObj.value.RtnBool == false)
				{
					alert("清理計畫批號之清理範圍必須為銷毀，請重新輸入");
					//1060327	Joe	1050087	二代系統升級，調整focus寫法
					//document.all.txPlanNo.focus();
					$('#' + document.all.txPlanNo.id).focus();	
					return;
				}			
			}
			Page_BlockSubmit = false;
			//1060327 Joe 1050087 二代公文修改
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
	
	if (document.all["txDPlan"].value == "")
	{
		strErrMsg += "銷毀計畫不可空白\n";
		//1060327	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txDPlan"].focus();
		$('#txDPlan').focus();	
	}
	
	/*if (document.all["txRequireFld"].value == "")
	{
		strErrMsg += "必要欄位不可空白\n";
		document.all["txRequireFld"].focus();
	}
	
	if(!jf_CheckBlankAndAlert())
		bRtnbool = false;
	*/	
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
	
	if (argCallerId == "EAT400C1")
	{
		document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
		//1060327	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txPlanNo"].focus();
		$('#txPlanNo').focus();	
	}
	
	if (argCallerId == "EAT501C1")
	{
		document.all["txDPlan"].value = document.all["lbReturnValue"].options[0].value;
		//1060327	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txDPlan"].focus();
		$('#txDPlan').focus();	
	}
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function ObjOnBlur(argObjName)
{
	switch(argObjName)
	{
		case "txPlanNo": //清理批號檢查Plan_Main有無存在

			if(document.all.txPlanNo.value != "")
			{
				var param = new Array(1);
				param[0] = document.all.txPlanNo.value;
				var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDespFromPlanMain", false, param);
				var iCallID_txPlanNo = callObj.id;
				if (callObj.value.RtnStr == "nodata")
				{
					alert("無此計畫編號，請重新輸入");
					//1060327	Joe	1050087	二代系統升級，調整focus寫法
					//document.all.txPlanNo.focus();
					$('#' + document.all.txPlanNo.id).focus();	
				}
				else
					document.all.txDesc.value = callObj.value.RtnStr;
			}
			break;
		case "txDPlan":
			if (document.all.txDPlan.value != "")
			{
				var param = new Array(1);
				param[0] = document.all.txDPlan.value;
				var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "CheckDPMByDPlanNo", false , param);
				var iCallID_txDPlan = callObj.id;
				if (callObj.value.RtnBool == false)
				{
					alert("無此銷毀計畫編號，請重新輸入");
					//1060327	Joe	1050087	二代系統升級，調整focus寫法
					//document.all.txDPlan.focus();
					$('#' + document.all.txDPlan.id).focus();	
				}
			}
			break;	
	}
}