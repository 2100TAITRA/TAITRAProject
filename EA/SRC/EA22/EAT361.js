/*
 * DATE      PRG	  MGR_NO	  DESC
 * 1060619   Justin   1050087     二代公文修改
 * 1080705	 Cloud	  1080525	  Merge 單號[1050781]檔號相關功能
 * 1080828	 Joe	  1080732	  弱掃修正Client Potential Code Injection
 * 1080906	 Joe	  1080732	  弱掃修正Client Potential Code Injection，還是被掃出來，改成在給值時直接加看看
 * 1090318	 Cloud	  1081109	  修改支援輸入年度、分類即可取得版本別
 * 1140410   Levi     1140264     新增匯出 Excel、ODS
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
//1060619 Justin [1050087] 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//1080705    Cloud   1050525 將1050781功能移植	新增檔號起迄條件，修改子視窗開啟部分，紀錄點選按鍵
var strClickBtn = "";
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    /*1060619 Justin [1050087] 二代公文修改
	jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	//jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
	jf_CallWS("../EALIB/EA_LIB.asmx","ws_GetCls",false,null);*/
	
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060619 Justin [1050087] 二代公文修改
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
	    /*1060619 Justin [1050087] 二代公文修改
		case "btCalendarF":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txSDate, event.screenX, event.screenY);
			break;
		case "btCalendarT":
			Page_BlockSubmit = true;
			jf_CallCalendar(document.all.txEDate, event.screenX, event.screenY);
			break;*/
		//1080705    Cloud   1050525 將1050781功能移植	新增檔號起迄條件，修改子視窗開啟部分
		/*case "btHelp":
			var strUrl = "";
			strUrl = "../EA01/EAC005.aspx?rtnObj=lbReturnValue&nFrom=EAT361&MODE=1";
			jf_OpenChildWin(strUrl,"EAC005",750,550);
			Page_BlockSubmit = true;
			break;*/
		case "btHelpS":
			strClickBtn = "btHelpS";
			var strUrl = "";
			strUrl = "../EA01/EAC005.aspx?nFrom=EAT361&MODE=1&SHOWALL=1&VER_NO="+jf_Trim(document.all.txVerNo.value)+"&FILE_YEAR="+jf_Trim(document.all.txFileYearS.value)+"&FILE_CLS="+jf_Trim(document.all.txClsNoS.value)+"&SAMLart="+GetParam("SAMLart");
			jf_OpenChildWin(strUrl,"EAC005",750,550);
			Page_BlockSubmit = true;
			break;
		case "btHelpS2":
			strClickBtn = "btHelpS2";
			var strUrl = "";
			strUrl = "../EA01/EAC005.aspx?nFrom=EAT361&MODE=2&SHOWALL=1&VER_NO="+jf_Trim(document.all.txVerNo.value)+"&FILE_YEAR="+jf_Trim(document.all.txFileYearS.value)+"&FILE_CLS="+jf_Trim(document.all.txClsNoS.value)+"&FILE_CASE="+jf_Trim(document.all.txCaseNoS.value)+"&SAMLart="+GetParam("SAMLart");
			jf_OpenChildWin(strUrl,"EAC005",750,550);			
			Page_BlockSubmit = true;
			break;
		case "btHelpE":
			strClickBtn = "btHelpE";
			var strUrl = "";
			strUrl = "../EA01/EAC005.aspx?nFrom=EAT361&MODE=1&SHOWALL=1&VER_NO="+jf_Trim(document.all.txVerNo.value)+"&FILE_YEAR="+jf_Trim(document.all.txFileYearE.value)+"&FILE_CLS="+jf_Trim(document.all.txClsNoE.value)+"&SAMLart="+GetParam("SAMLart");
			jf_OpenChildWin(strUrl,"EAC005",750,550);
			Page_BlockSubmit = true;
			break;
		case "btHelpE2":
			strClickBtn = "btHelpE2";
			var strUrl = "";
			strUrl = "../EA01/EAC005.aspx?nFrom=EAT361&MODE=2&SHOWALL=1&VER_NO="+jf_Trim(document.all.txVerNo.value)+"&FILE_YEAR="+jf_Trim(document.all.txFileYearE.value)+"&FILE_CLS="+jf_Trim(document.all.txClsNoE.value)+"&FILE_CASE="+jf_Trim(document.all.txCaseNoE.value)+"&SAMLart="+GetParam("SAMLart");
			jf_OpenChildWin(strUrl,"EAC005",750,550);			
			Page_BlockSubmit = true;
			break;
		//1080705    Cloud   1050525 將1050781功能移植	新增案號條件起迄，修改子視窗開啟部分 -E
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060619 Justin [1050087] 二代公文修改 
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
	
    //1060619 Justin [1050087] 二代公文修改 
    //xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{		
		case "btPrint":
		case "btPreview":
		//1140421 Levi 1140264 新增Excel、ODS
		case "btExcel":
		case "btODS":
			Page_BlockSubmit = !UnEmpty();
			Page_BlockSubmit = !CheckCDATE( "txSDate", "編目日期(起)");
			Page_BlockSubmit = !CheckCDATE( "txEDate", "編目日期(迄)");			
		    //1060619 Justin [1050087] 二代公文修改 
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
    if(argResult.id == wsCheckClsID)
    {
		if(jf_IsWebServiceSuccess(argResult))
		{
		    //1060619 Justin [1050087] 二代公文修改
			//document.all["txClsName"].innerText = jf_Trim(argResult.value.RtnField0[0]);
			//1080705 Cloud 1080525 將單號1050781 功能移植-s
			//document.all["txClsName"].textContent = jf_Trim(argResult.value.RtnField0[0]);
			if (jf_IsWebServiceSuccess(argResult))
			{
				if (argResult.value.IS_LOWEST != "" && argResult.value.IS_LOWEST != "1")
				{
					alert('請輸入最底層分類號。');
					$('#'+strOblurID).focus();
				}
				else if (argResult.value.IS_LOWEST != "" && argResult.value.IS_LOWEST == "1")
				{
					document.all[strOblurkeyID].value = argResult.value.ClsKey;
					//* 1090318	 Cloud	  1081109	  修改支援輸入年度、分類即可取得版本別-補上設定版號
					document.all["txVerNo"].value = argResult.value.VerNo;
				}
				else
				{
					alert('此分類號不存在請重新輸入。');
					$('#' + strOblurID).focus();
				}
			}
			//1080705 Cloud 1080525 將單號1050781 功能移植-e
		}
		/*else
		{
		    document.all["txClsNo"].value = "";
		    //1060619 Justin [1050087] 二代公文修改
			//document.all["txClsNo"].focus();
			$('#txClsNo').focus();
		}*/
    }
	//1080705 Cloud 1080525 將單號1050781 功能移植
    if (argResult.id == wsCheckCaseID)
    {    	
    	if (argResult.error)
    	{
    		alert(argResult.errorDetail.string);
    		$('#' + strOblurID).focus();
    		return;
    	}
    	WSResult = argResult.value;
    	if (WSResult.m_strErrMsg.length != 0)
    	{
    		if (WSResult.m_strErrMsg.substring(0, 5) == "無此案次號")
    		{
    			alert("輸入的案次號不存在。");
    			$('#' + strOblurID).focus();
    		}
    		else
    		{
    			alert(WSResult.m_strErrMsg);
    			$('#' + strOblurID).focus();
    		}
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
	//1080705 Cloud 1080525 將單號1050781功能放過來
	/*if (argCallerId=="EAC005")
	{
		if(document.all["lbReturnValue"].length>0)
		{
			document.all["txClsNo"].value =document.all["lbReturnValue"].options[1].value;
			CLSNO_Onblur();
		}
	}*/
	if (argCallerId=="EAC005")
	{
		if ( document.all.lbReturnValue.length > 0 )
		{
			document.all.txVerNo.value = document.all.lbReturnValue.options[5].value;
			if(strClickBtn == "btHelpS")
			{
				document.all.txClsNoS.value = document.all.lbReturnValue.options[1].value;
				document.all.txClsKeyS.value = document.all.lbReturnValue.options[4].value;
				
			}
			else if( strClickBtn == "btHelpS2")
			{
				document.all.txFileYearS.value = document.all.lbReturnValue.options[0].value;
				document.all.txClsNoS.value = document.all.lbReturnValue.options[1].value;
				document.all.txClsKeyS.value = document.all.lbReturnValue.options[4].value;
				document.all.txCaseNoS.value = document.all.lbReturnValue.options[2].value;
				
			}
			else if(strClickBtn == "btHelpE")
			{
				document.all.txClsNoE.value = document.all.lbReturnValue.options[1].value;
				document.all.txClsKeyE.value = document.all.lbReturnValue.options[4].value;
				
			}
			else if(strClickBtn == "btHelpE2")
			{
				document.all.txFileYearE.value = document.all.lbReturnValue.options[0].value;
				document.all.txClsNoE.value = document.all.lbReturnValue.options[1].value;
				document.all.txClsKeyE.value = document.all.lbReturnValue.options[4].value;
				document.all.txCaseNoE.value = document.all.lbReturnValue.options[2].value;
			}
		}
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

//txClsNoOnblur帶出分類名稱  學習EAM005做法
var wsCheckClsID;
//1080705 Cloud 1080525 比照單號1050781 新增功能
//function CLSNO_Onblur()
var strOblurID = "";
var strOblurkeyID = "";
function CLSNO_Onblur(argObj)
{
	
	var strSource = document.all["H_OrgNo"].value;
	//1080705 CLOUD 1080525 將單號1050781功能移植
	//var strUpper_Cls = jf_Trim(document.all["txClsNo"].value);
	
	/*if (strUpper_Cls != "")
	{
		
		var arKeyName = new Array("SOURCE_ORGNO","CLS_NO");
		var arKeyValue = new Array(strSource, strUpper_Cls);
		var arRtnFldName = new Array("CLS_NAME");
		var arOrdFldName = new Array("VER_NO DESC");
		
		var argWSParam = new Array(5);
		argWSParam[0] = "CLASS_MAIN";
		argWSParam[1] = arKeyName;
		argWSParam[2] = arKeyValue;
		argWSParam[3] = arRtnFldName;
		argWSParam[4] = arOrdFldName;
						
		var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, argWSParam);
		wsCheckClsID = callObj.id;
		OnWSResult(callObj);									
	}
	else
	{
	    //1060619 Justin [1050087] 二代公文修改 
	    //document.all["txClsName"].innerText = "";
	    document.all["txClsName"].textContent = "";
	}*/
	var strClsNo = argObj.value;
	strOblurID = argObj.id;
	if (strOblurID == "txClsNoS")
		strOblurkeyID = "txClsKeyS";
	else
		strOblurkeyID = "txClsKeyE";
	if (strClsNo != "")
	{
		var param1 = new Array(4);
		//1080906	Joe		1080732		弱掃修正Client Potential Code Injection--S
		// param1[0] = document.all["H_OrgNo"].value;
		// param1[1] = document.all["txVerNo"].value;
		// param1[2] = strClsNo;
		param1[0] = encodeURI(document.all["H_OrgNo"].value);
		param1[1] = encodeURI(document.all["txVerNo"].value);
		param1[2] = encodeURI(strClsNo);
		//1080906	Joe		1080732		弱掃修正Client Potential Code Injection--E
		//* 1090318	 Cloud	  1081109	  修改支援輸入年度、分類即可取得版本別-增加傳入年度
		//param1[3] = "";
		if (strOblurID == "txClsNoS")
			param1[3] = document.all["txFileYearS"].value;
		else
			param1[3] = document.all["txFileYearE"].value
		//1080828	Joe		1080732		弱掃修正Client Potential Code Injection--S
		param1[0] = encodeURI(param1[0]);
		param1[1] = encodeURI(param1[1]);
		param1[2] = encodeURI(param1[2]);
		param1[3] = encodeURI(param1[3]);
		//1080828	Joe		1080732		弱掃修正Client Potential Code Injection--E
		var callObj = jf_CallWS("../ealib/ea_LIB.asmx", "ws_GetCls", false, param1);
		wsCheckClsID = callObj.id;
		OnWSResult(callObj);
	}
}
//1080705    Cloud   1050525 將1050781功能移植	新增案次號條件檢核，抓取權杖-S
var wsCheckCaseID;
function CheckCaseNo(argObj)
{
	var strCaseNo = argObj.value;
	strOblurID = argObj.id;
	if (strCaseNo == "")
		return;
	if ((strOblurID == "txCaseNoS" && document.all["txClsKeyS"].value == "") || (strOblurID == "txCaseNoE" && document.all["txClsKeyE"].value == ""))
		return;
		
	var param = new Array(4);
	//1080906	Joe		1080732		弱掃修正Client Potential Code Injection
	// param[0] = document.all["H_OrgNo"].value;
	param[0] = encodeURI(document.all["H_OrgNo"].value);
	
	if(strOblurID == "txCaseNoS")
	{
		//1080906	Joe		1080732		弱掃修正Client Potential Code Injection--S
		// param[1] = document.all["txFileYearS"].value;
		// param[2] = document.all["txClsKeyS"].value;//分類號鍵值
		// param[3] = document.all["txCaseNoS"].value;
		param[1] = encodeURI(document.all["txFileYearS"].value);
		param[2] = encodeURI(document.all["txClsKeyS"].value);//分類號鍵值
		param[3] = encodeURI(document.all["txCaseNoS"].value);
		//1080906	Joe		1080732		弱掃修正Client Potential Code Injection--E
	}
	else if(strOblurID == "txCaseNoE")
	{
		//1080906	Joe		1080732		弱掃修正Client Potential Code Injection--S
		// param[1] = document.all["txFileYearE"].value;
		// param[2] = document.all["txClsKeyE"].value;//分類號鍵值
		// param[3] = document.all["txCaseNoE"].value;
		param[1] = encodeURI(document.all["txFileYearE"].value);
		param[2] = encodeURI(document.all["txClsKeyE"].value);//分類號鍵值
		param[3] = encodeURI(document.all["txCaseNoE"].value);
		//1080906	Joe		1080732		弱掃修正Client Potential Code Injection--E
	}
	//1080828	Joe		1080732		弱掃修正Client Potential Code Injection--S
	param1[0] = encodeURI(param1[0]);
	param1[1] = encodeURI(param1[1]);
	param1[2] = encodeURI(param1[2]);
	param1[3] = encodeURI(param1[3]);
	//1080828	Joe		1080732		弱掃修正Client Potential Code Injection--E
	var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_CheckCase", false, param);
	wsCheckCaseID = callObj.id;
	OnWSResult(callObj);
}
function GetParam(p)
{
	var strUrl = document.location.toString();
	strUrl = unescape(strUrl);
	var rg_szItems = strUrl.split("?");
	if (rg_szItems.length == 2)
	{
		var rg_szItems2 = rg_szItems[1].split("&");
		for (var i = 0; i < rg_szItems2.length; i++)
		{
			var rg_items = rg_szItems2[i].split("=");
			if (rg_items[0] == "SAMLart")
				return rg_items[1];
		}
	}
}
//1080705    Cloud   1050525 將1050781功能移植	新增案次號條件檢核，抓取權杖-E

//檢查編目日期不可皆為空白
function UnEmpty()
{	
	var strSDate = jf_Trim(document.all["txSDate"].value);
	var strEDate = jf_Trim(document.all["txEDate"].value);
	
	if (strSDate + strEDate == "")
	{
	    //1060619 Justin [1050087] 二代公文修改
	    //document.all["txSDate"].focus();
	    $('#txSDate').focus();
		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["編目日期不可皆為空白"])),"");
		return false;
	}
	
	return true;
}
//日期onblur
function CheckCDATE(argObj,strMsg)
{
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
			jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])),"");
			document.all[argObj].value = "";
		    //1060619 Justin [1050087] 二代公文修改
			//document.all[argObj].focus();
			$('#' + argObj).focus();
			return false;		
		}
	}
	return true;
}
