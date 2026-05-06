/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060320   Justin   1050087     二代公文修改
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
//1060320  Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    /*1060320  Justin [1050087] 二代公文修改 移除無用jf_CallWS
	jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	jf_CallWS("../EALIB/EA_LIB.asmx", "GetFieldValue", false, null);*/
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060320  Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
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
		case "btHelp": //計畫批號提示
			Page_BlockSubmit=true;
		    var pUrl = "";
		    pUrl = "../EA40/EAT400C1.aspx";
		    //1060320  Justin [1050087] 二代公文修改
		    //jf_OpenChildWin(pUrl, "EAT400C1", 800, 500);
		    jf_OpenChildWin(pUrl, "EAT400C1", 800, 600);
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060320  Justin [1050087] 二代公文修改 
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
	
    //1060320  Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		
		case "btPrint":
			if(CheckBeforePrint())
			{
				Page_BlockSubmit = !jf_ConfirmPrint();
			    //1060320  Justin [1050087] 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			else
				Page_BlockSubmit = true;			
			break;
		case "btPreview":
			if(CheckBeforePrint())
			{
				Page_BlockSubmit = !jf_ConfirmPreview();
			    //1060320  Justin [1050087] 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			else
				Page_BlockSubmit = true;
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
    var strErrMsg;
	//清理計畫存不存在檢查
	if (argResult.id == wsCheckPlanID)
	{		
		if (argResult.value.UtyRtn.m_bSuccess)
			CheckIsTransfer();					
		else
		{			
		    Page_BlockSubmit = true;
		    strErrMsg = "無此計畫編號";
		    //1060320  Justin [1050087] 二代公文修改
		    //document.all["txPlanNo"].focus();
		    $('#txPlanNo').focus();
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
		}
    }    
    //清理計畫是否有將'清查'納入
    if (argResult.id == wsGetTypeID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{			
			document.all["txDesc"].value = argResult.value.RtnField1;
			CheckPlanStatus();
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
	    //1060320  Justin [1050087] 二代公文修改
	    //document.all["txPlanNo"].focus();
	    $('#txPlanNo').focus();
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

var wsCheckPlanID;
function txPlanNo_onblur()
{
	if (!IsServerHandling)
	{
		if (document.all["txPlanNo"].value != "")
		{
			Page_BlockSubmit = true;
			
			var arWSParam = new Array(1);
			arWSParam[0] = document.all["txPlanNo"].value;
			callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ChkPlan", false, arWSParam);
			wsCheckPlanID = callObj.id;
			OnWSResult(callObj);
		}
	}
}
var wsGetTypeID2;
function CheckPlanStatus()
{
	var arKeyName = new Array(1);
	var arKeyValue = new Array(1);
	var arRtnFldName = new Array(1);
	var arOrdFldName = new Array(1);
	
	if (!IsServerHandling)
	{
		if (document.all["txPlanNo"].value != "")
		{
			Page_BlockSubmit = true;
			
			arKeyName[0]    = "PLAN_NO";
			arKeyValue[0]   = document.all["txPlanNo"].value;
			arRtnFldName[0] = "PLAN_STATUS";
			arOrdFldName[0] = "PLAN_NO";

			var arWSParam = new Array(5);
			arWSParam[0] = "PLAN_MAIN";
			arWSParam[1] = arKeyName;
			arWSParam[2] = arKeyValue;
			arWSParam[3] = arRtnFldName;
			arWSParam[4] = arOrdFldName;
			callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, arWSParam);
			wsGetTypeID2 = callObj.id;
			OnWSResult(callObj);
		}
	}
}

//檢查清理計畫是否有將'移轉'納入
var wsGetTypeID;
function CheckIsTransfer()
{
	var arKeyName = new Array(1);
	var arKeyValue = new Array(1);
	var arRtnFldName = new Array(2);
	var arOrdFldName = new Array(1);
	
	if (!IsServerHandling)
	{
		if (document.all["txPlanNo"].value != "")
		{
			Page_BlockSubmit = true;
			
			arKeyName[0]    = "PLAN_NO";
			arKeyValue[0]   = document.all["txPlanNo"].value;
			arRtnFldName[0] = "PLAN_TYPE";
			arRtnFldName[1] = "PLAN_DESC";
			arOrdFldName[0] = "PLAN_NO";

			var arWSParam = new Array(5);
			arWSParam[0] = "PLAN_MAIN";
			arWSParam[1] = arKeyName;
			arWSParam[2] = arKeyValue;
			arWSParam[3] = arRtnFldName;
			arWSParam[4] = arOrdFldName;			
			callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, arWSParam);	
			
			wsGetTypeID = callObj.id;
			OnWSResult(callObj);
		}
	}
}

function CheckBeforePrint()
{
	var ErrMsg = "";
	if(document.all["txPlanNo"].value == "")
		ErrMsg = "清理批號不可空白\n";
	if(CheckFileNoRange(ErrMsg))
		ErrMsg += CheckFileNoRange(ErrMsg);
		
	if(ErrMsg != "")
	{
		alert(ErrMsg);
		return false;
	}
	else
		return true;		
}


//判斷檔號起訖的合理性
function CheckFileNoRange(argStr)
{
	var JCls	= 0;	//0:兩者為空,1:其中一個為空,2:不相等,3:相等
	var JCase	= 0;
	var JVol	= 0;
	var JSeq	= 0;
	var jBool	= true;
	
	
	if(document.all["txSeqS"].value != "" && document.all["txSeqE"].value != "")
	{
		if(document.all["txSeqS"].value != document.all["txSeqE"].value )
			JSeq = 2;
		else
			JSeq = 3;
	}
	else if(document.all["txSeqS"].value != "" || document.all["txSeqE"].value != "")
		JSeq = 1;
	//////////////////////////////////////////目次
	if(document.all["txVolS"].value != "" && document.all["txVolE"].value != "")
	{
		if(document.all["txVolS"].value != document.all["txVolE"].value )
			JVol = 2;
		else
			JVol = 3;
	}
	else if(document.all["txVolS"].value != "" || document.all["txVolE"].value != "")
		JVol = 1;
	//////////////////////////////////////////卷次
	if(document.all["txCaseS"].value != "" && document.all["txCaseE"].value != "")
	{
		if(document.all["txCaseS"].value != document.all["txCaseE"].value )
			JCase = 2;
		else
			JCase = 3;
	}
	else if(document.all["txCaseS"].value != "" || document.all["txCaseE"].value != "")
		JCase = 1;
	/////////////////////////////////////////案次
	if(document.all["txClsS"].value != "" && document.all["txClsE"].value != "")
	{
		if(document.all["txClsS"].value != document.all["txClsE"].value )
			JCls = 2;
		else
			JCls = 3;
	}
	else if(document.all["txClsS"].value != "" || document.all["txClsE"].value != "")
		JCls = 1;
	/////////////////////////////////////////分類
	
	if(JSeq == 1)	//只有其中一項，視為錯誤
	{
		argStr += "目次範圍起迄值有誤\n";
		return argStr;
	}
	
	if(JVol == 1)	//只有其中一項，視為錯誤
	{
		argStr += "卷次範圍起迄值有誤\n";
		return argStr;
	}
	
	if(JCase == 1)	//只有其中一項，視為錯誤
	{
		argStr += "案次號範圍起迄值有誤\n";
		return argStr;
	}
	
	if(JCls == 1)	//只有其中一項，視為錯誤
	{
		argStr += "分類號範圍起迄值有誤\n";
		return argStr;
	}
	
	/////////////////////////////////////95.08.15
	if(JSeq == 2)	//目次不相等
	{
		jBool = false;
		if(JVol != 3)	//若卷次不為相等的情況則提示錯誤訊息
		{
			argStr += "卷次號範圍需相同\n";
			jBool = true;
			return argStr;			
		}
		
		if(JCase != 3)	//若案次不為相等的情況則提示錯誤訊息
		{
			argStr += "案次號範圍需相同\n";
			jBool = true;
			return argStr;			
		}		
		
		if(JCls != 3)
		{
			argStr += "分類號範圍需相同\n";
			jBool = true;
			return argStr;			
		}		
		
		/*if(!jBool)
		{
			argStr += "目次號範圍需相同\n";			
			return argStr;						
		}*/
	}
	
	if(JSeq == 0 || JSeq == 3)	//目次為空白，則往上檢查卷次號
	{
		if(JVol == 2)	//卷次不相等
		{			
			jBool = false;
			if(JCase != 3)	//若案次不為相等的情況則提示錯誤訊息
			{
				argStr += "案次號範圍需相同\n";
				jBool = true;
				return argStr;			
			}		
		
			if(JCls != 3)
			{
				argStr += "分類號範圍需相同\n";
				jBool = true;
				return argStr;			
			}		
			
			if(!jBool && JSeq != 0)
			{
				argStr += "卷次號範圍需相同\n";				
				return argStr;				
			}
		}		
		
		if(JVol == 0)	//若卷次為空白，則往上檢查案次號
		{
			if(JCase == 2)	//若案次不相等，則往上檢查分類號
			{
				jBool = false;
				if(JCls != 3)
				{
					argStr += "分類號範圍需相同\n";
					jBool = true;
					return argStr;			
				}				
				
				if(jBool)
				{
					argStr += "案次號範圍需相同\n";				
					return argStr;						
				}
			}			
		}
		
		if(JVol == 3)	//卷次相等，往上檢核案次以及分類是否相等
		{
			if(JCase != 3)
			{
				argStr += "案次號範圍需相同\n";
				return argStr;				
			}
			
			if(JCls != 3)
			{
				argStr += "分類號範圍需相同\n";
				return argStr;					
			}
		}		
	}				
	
	return argStr;
}

//補0
function CallPadFunc(strObjName,argCount)
{	
	switch(strObjName)
	{					
		case "txYearS":						
		case "txYearE":
			if(document.all[strObjName].value != "")				
				document.all[strObjName].value = jf_PADL(document.all[strObjName].value,3,"0");
			break;		
	}
	
	if(!jf_CheckCDATE(document.all[strObjName].value) &&jf_Trim(document.all[strObjName].value) != "" && strObjName == "txTDate")
	{
		alert("輸入日期格式不正確，請檢查");
		document.all[strObjName].value = "";			
	}
}
//[0970649]Add by Cola 設定按下案卷時，櫥位號排序選項不可點選
function SearchType(argType)
{
	if(argType == "rb1")
	{
		document.all["rbORDER_STOCK"].Enabled = true;
		document.all["rbORDER_STOCK"].disabled = false;	
		if(document.all["txStock"].value == "Y")
			document.all["rb3"].checked = true;
		else
			document.all["rb3"].checked = true;	
	}
	else
	{
		document.all["rb3"].checked = true;
		document.all["rbORDER_STOCK"].disabled = true;
	}
}