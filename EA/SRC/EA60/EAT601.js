/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號			概要
 * -------------------------------------------------------------------------------------------------
 *100.08.02		Jeff	1000631	配合公文文號改為文(編)號 警示訊息一併更動
 *103.11.12	    Leslie	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
 * 1060613      Justin  1050087 二代公文修改
 ***************************************************************************************************

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
var strTableFields = new Array("_lbDocNo","_lbFileNo","_lbAdvis");
//1060613 Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060613 Justin [1050087] 二代公文修改
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../EALIB/EA_LIB.asmx", "GetFieldValue", false, null);
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060613 Justin [1050087] 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;
	
	/*var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	var btHelp;
	
	//取得確實按下的是哪個？鍵
	if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	{
		btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
		CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	}*/
	
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
			jf_OpenChildWin(pUrl, "EAT400C1", 800, 500);
			break;
			
		case "btDocAdd":
		case "btFileAdd":
			AutoBringOut();
			if(!CheckAddFieldEmpty(xObjectName))
				Page_BlockSubmit = true;
			else
			{
			    Page_BlockSubmit = false;
			    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
			    IsServerHandling = true;
			    //1060613 Justin [1050087] 二代公文修改
			    //__doPostBack("", "");
			    __doPostBack(xObjectName, "");
			}			
			break;
			//[0970649]Add by Cola 新增櫥位號及單位加入
		case "btAdd_Stock":
		case "btAdd_DEPT":		
			AutoBringOut();
			if(!CheckAddFieldEmpty(xObjectName))
				Page_BlockSubmit = true;
			else
			{
			    Page_BlockSubmit = false;
			    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
			    IsServerHandling = true;
			    //1060613 Justin [1050087] 二代公文修改
			    //__doPostBack("","");	
			    __doPostBack(xObjectName, "");
			}			
			break;	
		case "btSet":		
			if(CheckDocNoExist())
			{
				if(!CheckSetRules())
					Page_BlockSubmit = true;
				else
				{
				    Page_BlockSubmit = false;
				    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
				    IsServerHandling = true;
				    //1060613 Justin [1050087] 二代公文修改
				    //__doPostBack("","");
				    __doPostBack("btSet", "");
				}			
			}
			else
			{
				Page_BlockSubmit = true;				
			}
			break;		
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060613 Justin [1050087] 二代公文修改 
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
	
    //1060613 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	var Index = ChooseType();
	switch (xObjectName)
	{
		case "btOpen":
			if(jf_Trim(document.all["txPlanNo"].value) != "")
				Page_BlockSubmit = false;
			else
			{
				alert("清理批號不可為空白");
				Page_BlockSubmit = true;
			    //1060613 Justin [1050087] 二代公文修改
				//document.all["txPlanNo"].focus();
				$('#txPlanNo').focus();
			}
		    //1060613 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
		case "btClean":
			Page_BlockSubmit = false;
		    //1060613 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(jf_CheckBeforSave()) //是否通過儲存前必要檢查
			{	
				if(CheckDgCBox())
				{
					if(CheckDocNoExist())
					{
						IsServerHandling = true;
						jf_ShowWaitState();	
						Page_BlockSubmit = false;				
					}
					else
						Page_BlockSubmit = true;
				}
				else
				{
					Page_BlockSubmit = true;
				}
			}
			else
				Page_BlockSubmit = true;
		    //1060613 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			/*Page_BlockSubmit = !jf_ConfirmDelete();
			jf_ToolBarSubmit();
			break;*/
			if(jf_CheckBeforSave()) //是否通過儲存前必要檢查
			{	
				if(CheckDgCBox())
				{
					if(CheckDocNoExist())
					{
						IsServerHandling = true;
						jf_ShowWaitState();	
						Page_BlockSubmit = false;				
					}
					else
						Page_BlockSubmit = true;
				}
				else
				{
					Page_BlockSubmit = true;
				}
			}
			else
				Page_BlockSubmit = true;
		    //1060613 Justin [1050087] 二代公文修改 
		    //jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		
		case "btSearch":
			if(jf_CheckBeforSave())
			{
				IsServerHandling = true;
				Page_BlockSubmit = false;
			    //1060613 Justin [1050087] 二代公文修改 
			    //jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			else
				Page_BlockSubmit = true;
			break;
		
		
		//以下屬於DataGrid ToolBar
		case "btSelectAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbSelect"+Index);
			break;
		case "btSelectInverse":
			Page_BlockSubmit = true;
			jf_SelectInverse("dg1", "_cbSelect"+Index);
			break;
		case "btSelectClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbSelect"+Index);
			break;
		case "btDeleteSelected":
		    Page_BlockSubmit = !CheckBeforeSetting("dg1", "_cbSelect3");
		    //1060613 Justin [1050087] 二代公文修改
			//jf_SelectBarSubmit();
			jf_SelectBarSubmit(xObjectName);
			break;
		
	}
}


//儲存前之欄位檢查
function jf_CheckBeforSave()
{
	var bRtnbool = true;
	var strErrMsg= "";
	
	if (document.all["txPlanNo"].value == "")
	{
	    strErrMsg += "清理批號不可空白\n";
	    //1060613 Justin [1050087] 二代公文修改
	    //document.all["txPlanNo"].focus();
	    $('#txPlanNo').focus();
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

//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
	var InValidName = "";
	var InValidControlName = "";
	
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//txInput1不為空白時
		if(document.all["dg1__ctl" + i + "_txInput1"].value != "")
		{
			//txInput2不可空白
			if(document.all["dg1__ctl" + i + "_txInput2"].value == "")
			{
				InValidName += ",Input2不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txInput2";
			}
							
			if(InValidName != "")
			{
			    InValidName = InValidName.substr(1, InValidName.length);
			    //1060613 Justin [1050087] 二代公文修改
			    //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
			    //document.all[InValidControlName].focus();
			    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
			    $('#' + InValidControlName).focus();
				return false;
			}
		}
	}
	return true;
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
   var strErrMsg;
	//清理計畫存不存在檢查
	if (argResult.id == wsCheckPlanID)
	{		
		if (argResult.value.UtyRtn.m_bSuccess)
		{
			document.all.txPlanType.value = argResult.value.PlanType;
			CheckIsTransfer();			
		}
		else
		{
			document.all.txPlanType.value = "";
			
		    Page_BlockSubmit = true;
		    strErrMsg = "無此計畫編號";
		    //1060613 Justin [1050087] 二代公文修改
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
			if (argResult.value.RtnField0[0].substr(0,1) != "1")
			{
				/*strErrMsg = "清理計畫："+document.all["txPlanNo"].value+"未將清查納入，無法列印檔案清查報告書。";
				jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])),"");
				document.all["txPlanNo"].focus();
				Page_BlockSubmit = true;*/
			}
			else 
			{  
				document.all["txDesc"].value = argResult.value.RtnField1;
				CheckPlanStatus();
			}
			
				
		}
    }
  /*
    if (argResult.id == wsGetTypeID2)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
			if (argResult.value.RtnField0[0] != "4")
			{
				Rtnbool = window.confirm("清理計畫："+document.all["txPlanNo"].value+"尚未完成清理作業,是否繼續列印檔案清查報告書?");
				if(Rtnbool)
				{
				  Page_BlockSubmit = false;
				}else
				{				
				document.all["txPlanNo"].focus();
				Page_BlockSubmit = true;
				}
			}
			else
			{
			    Page_BlockSubmit = false;
				
			}
		}
    }*/
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
		if(document.all["txPlanNo"].value != "")
		{
			Page_BlockSubmit=false;
			document.all.ToolBarSenderID.value = "btOpen";	
			if(Page_BlockSubmit==false)
			{
				IsServerHandling = true;
				jf_ShowWaitState();
				__doPostBack("tbTool",0);
			}
		}
	    //1060613 Justin [1050087] 二代公文修改
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

//補0
function CallPadFunc(strObjName,argCount)
{	
	switch(strObjName)
	{		
		case "txTDate":								
			if(document.all[strObjName].value != "")				
				document.all[strObjName].value = jf_PADL(document.all[strObjName].value,argCount,"0");
			break;					
		case "txYearS":						
		case "txYearE":
		case "txSeqS":
		case "txSeqE":
			if(document.all[strObjName].value != "")				
				document.all[strObjName].value = jf_PADL(document.all[strObjName].value,3,"0");
			break;		
		case "txVolE":
		case "txVolS":
			if(document.all[strObjName].value != "")				
				document.all[strObjName].value = jf_PADL(document.all[strObjName].value,4,"0");
			break;
	}
	
	if(!jf_CheckCDATE(document.all[strObjName].value) &&jf_Trim(document.all[strObjName].value) != "" && strObjName == "txTDate")
	{
		alert("輸入日期格式不正確，請檢查");
		document.all[strObjName].value = "";			
	}
}

function CheckAddFieldEmpty(activeObjName)
{
	var actionJudge = true;
	var strErrMsg = "";
	
	if(document.all["txPlanNo"].value == "")
	{
		actionJudge = false;
		strErrMsg += "清理批號不可空白\n";
	}
	
	switch(activeObjName)
	{
		case "btDocAdd":
		{
			if(document.all["txDocNo"].value == "")
			{
				//100.08.02		Jeff	1000631	配合公文文號改為文(編)號 警示訊息一併更動
				actionJudge = false;
				//strErrMsg += "公文文號不可空白\n";
				strErrMsg += "文(編)號不可空白\n";
			}
			break;
		}
		
		case "btFileAdd":
		{
			if(document.all["txYearS"].value == "" && document.all["txYearE"].value == "" && document.all["txClsS"].value == "" && document.all["txClsE"].value == "" && document.all["txCaseS"].value == "" && document.all["txCaseE"].value == "" && document.all["txVolS"].value == "" && document.all["txVolE"].value == "" && document.all["txSeqS"].value == "" && document.all["txSeqE"].value == "")
			{
				actionJudge = false;
				strErrMsg += "檔號不可皆為空白\n";				
			}
			else
			{
				if(CheckFileNoRange(strErrMsg) != "")
				{
					strErrMsg  = CheckFileNoRange(strErrMsg);
					actionJudge = false;							
				}
			}
			break;
		}
		//[0970649]Add by Cola 針對櫥位號 / 單位進行檢核
		case "btAdd_Stock":
		{
			if(document.all["txStockNoS"].value == "" && document.all["txStockNoE"].value == "")
			{
				actionJudge = false;
				strErrMsg += "櫥位號不可皆為空白\n";
			    //1060613 Justin [1050087] 二代公文修改
				//document.all["txStockNoS"].focus();
				$('#txStockNoS').focus();
			}
			break;
		}		
		case "btAdd_DEPT":
		{
			//檢核承辦單位不可空白
			if (document.all["dlDept"].options(document.all["dlDept"].selectedIndex).text=="")
			{
				actionJudge = false;	
				strErrMsg += "承辦單位不可空白\n";
			    //1060613 Justin [1050087] 二代公文修改
				//document.all["dlDept_Text"].focus();
				$('#dlDept_Text').focus();
			}		
			break;
		}
	}	
	
	if(strErrMsg != "")
		alert(strErrMsg);
		
	return actionJudge;
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

function CheckSetRules()
{
	var bJudge = document.all["rbTran"].checked;
	var ErrMsg = "";	
	if(bJudge)
	{
		if(document.all["txTDate"].value == "")
		{
			ErrMsg = "請輸入日期\n";
			document.all["txTDate"].value = "";
		    //1060613 Justin [1050087] 二代公文修改
			//document.all["txTDate"].focus();
			$('#txTDate').focus();
			if(!CheckBeforeSetting("dg1","_cbSelect"))
				ErrMsg += "請至少勾選一筆資料\n";
		}
	}
	else
	{
		if(!CheckBeforeSetting("dg1","_cbSelect"))
			ErrMsg = "請至少勾選一筆資料\n";
	}
	if(ErrMsg != "")
	{
		alert(ErrMsg);
		return false;
	}
	else
		return true;
}

function CheckBeforeSetting(argTableName, argCheckBoxName)
{
	if(document.all[argTableName] == null)
		return false;

	//至少要勾選一筆才return true
	for (iRow=2;iRow<document.all[argTableName].rows.length+1;iRow++)
	{
		if (document.all[argTableName + "__ctl" + iRow + argCheckBoxName].checked)
			return true;
	}
	return false;
}

function CheckDgCBox()
{
	var bSelect = false;
	var strErrMsg = "";	
	var selectCnt=0;
	if (document.all.dg1)
	{
		for (var k=2;k<document.all.dg1.rows.length+1;k++)
		{	
			if (document.all["dg1__ctl"+k+"_cbSelect2"].checked)
				selectCnt++;
			else
			{
				if (document.all["dg1__ctl"+k+"_cbSelect3"].checked)
					selectCnt++;						
			}
		}
	}
	if (selectCnt==0)
	{
		if (strErrMsg!="")
			strErrMsg += "\n至少必須勾選一筆註記資料";	
		else
			strErrMsg += "至少必須勾選一筆註記資料";		
	}
	if (strErrMsg != "")
	{
	    alert(strErrMsg);
	    //1060613 Justin [1050087] 二代公文修改
	    //document.all.txPlanNo.focus();
	    $('#txPlanNo').focus();
		return false;
	}	
	bSelect = true;
	return bSelect;
}

//檢查DG內是否有重複的欄位
//請自行設定欄位內容的屬性值
//ex:txBox=>value,Label=>innerHTML...等
function CheckDocNoExist()
{
	var objDgName = "dg1";
		
	var pDgLen = document.all[objDgName].rows.length;  //有header,筆數為實際筆數+1			
	var strObjName = "";	//First Compare
	var strtxDocNo = "";	//Second Compare
	var strErrMsg = "";		//ErrMsg		
	var strMarkArray = new Array(pDgLen);
	
	if(pDgLen == 2)
	{
	    //1060613 Justin [1050087] 二代公文修改
	    //if(jf_Trim(document.all["dg1__ctl2_lbSEQ_NO"].innerText) == "")
	    if (jf_Trim(document.all["dg1__ctl2_lbSEQ_NO"].textContent) == "")
		{
			alert("請先加入資料");
			return false;
		}
	}
	for(var i=2;i<pDgLen;i++)
	{
		strObjName = objDgName+"__ctl"+i+"_lbDocNo";
		strObjName2 = objDgName+"__ctl"+i+"_lbAdviseBy";
					
		for(var j=i+1;j<=pDgLen;j++)
		{	
			strtxDocNo = objDgName+"__ctl"+j+"_lbDocNo";										
			strtxAdviseBy = objDgName+"__ctl"+j+"_lbAdviseBy";
							
			if(document.all[strtxDocNo].innerHTML == document.all[strObjName].innerHTML && document.all[strtxAdviseBy].innerHTML == document.all[strObjName2].innerHTML)
			{
				//alert('輸入的公文文號(目次號)與序號 ' + (i-1) + ' 重覆');
				//document.all[strObjName].focus();
				if(document.all[strtxDocNo].innerHTML != "")
					strMarkArray[j] = "1";				
			}				
		}
	}	
	//100.08.02		Jeff	1000631	配合公文文號改為文(編)號 警示訊息一併更動
	//var ErrMsgHeader = "輸入的公文文號(目次號)第";
	ErrMsgHeader = "輸入的文(編)號(目次號)第";
	var ErrMsgFooter = "有重複情形,請檢查";
	for(var i=2;i<pDgLen+1;i++)
	{
		if(strMarkArray[i] == "1")
		{
			strErrMsg += (i-1);
			if(i<pDgLen)
				strErrMsg += ",";
			else
				strErrMsg += "項";
		}
	}
	
	if(strErrMsg != "")
	{
		alert(ErrMsgHeader+strErrMsg+ErrMsgFooter);		
		return false;
	}
	else
		return true;
	
}

function AutoBringOut()
{
	if(document.all["txYearE"].value == "" && document.all["txClsE"].value == "" && document.all["txCaseE"].value == "" && document.all["txVolE"].value == "" && document.all["txSeqE"].value == "")
	{		
		document.all["txYearE"].value = document.all["txYearS"].value;
		document.all["txClsE"].value = document.all["txClsS"].value;
		document.all["txCaseE"].value = document.all["txCaseS"].value;
		document.all["txVolE"].value = document.all["txVolS"].value;
		document.all["txSeqE"].value = document.all["txSeqS"].value;
	}
	
}

function ChooseType()
{
	if(document.all["rb1"].checked)
		return "";
	if(document.all["rb2"].checked)
		return "2";
	if(document.all["rb3"].checked)
		return "3";
}