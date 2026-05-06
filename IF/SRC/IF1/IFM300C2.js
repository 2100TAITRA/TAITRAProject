/*
單號		DATE		SA		PRG		DESC
1010189		1010302		--		Leslie	修正開啟代理之權利設定後，代理紀錄儲存錯誤之問題
1010322     1010502     Leslie  Cloud	新增小日曆按鈕
1050087		1050725     Kevin   Kenny	二代公文系統相關修改
1050700		1050815		Kevin	Justin	弱掃Client Potential Code Injection修正
1050087		1050822		Kevin   Kenny   調整IE11點開小日曆選定日期後無法設定欄位問題
1050087 	1051019		Leslie	Joe		二代修改配合行動平台
1051150     1051108     Kevin   Kenny   修改弱掃Client Potential Code Injection
1060186 	1060421		Kevin	Joe		二代升級衍伸問題導致未代理到角色權利
1070678		1070803		Kevin	Joe		修正弱掃Client Cookies Inspection
1070678		1070904		Kevin	Justin	弱掃修正CookieHttpOnly
1070678		1070905		Kevin	Joe		修正弱掃Client Cookies Inspection
1090640		1090924		Kevin	Joe		修正日期合理性未判斷至分
1150206		序63		Zen		Andy	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
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

//指定DataGrid欄位
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

//1050725	Kenny   [1050087]	二代公文系統相關修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
	
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

//1050725	Kenny   [1050087]	二代公文系統相關修改
var u_AccountId ;
var u_NameId ;
var u_Idx ;

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
//1050725	Kenny   [1050087]	二代公文系統相關修改
//function ClientButtonControl()
//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl(event)
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	//var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
	//var btHelp;
	
	//取得確實按下的是哪個？鍵
	//if (document.all["dg1__ctl"+pNo+"_btFLD_TYPE"] != null)
	//{
	//	btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
	//	CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
	//}
	//10100501  1010322 Cloud        代理區間DG 增加小日期按鈕--Start
    //1050725	Kenny   [1050087]	二代公文系統相關修改；因原小日曆按鍵取消，調整代理日期區間設定方式--Start--
	//var pStartNo = xObjectName.substring(8, xObjectName.indexOf("_btStartDate"));
	//var pEndNo = xObjectName.substring(8, xObjectName.indexOf("_btEndDate"));
	//var btStartDate;
	//var btEndDate;
	//var argYear;
	//var argMonth;
	//var argDay;
	//if (document.all["dg2__ctl"+pStartNo+"_btStartDate"] != null)
	//{
	//	btStartDate = document.all["dg2__ctl" + pStartNo + "_btStartDate"].id;
	//	argYear = document.all["dg2__ctl" + pStartNo + "_txStartYear"].id;
	//	argMonth = document.all["dg2__ctl" + pStartNo + "_txStartMonth"].id;
	//	argDay = document.all["dg2__ctl" + pStartNo + "_txStartDay"].id;
	//}
	//if(document.all["dg2__ctl" + pEndNo + "_btEndDate"] != null)
	//{
	//	btEndDate = document.all["dg2__ctl" + pEndNo + "_btEndDate"].id;
	//	argYear = document.all["dg2__ctl" + pEndNo + "_txEndYear"].id;
	//	argMonth = document.all["dg2__ctl" + pEndNo + "_txEndMonth"].id;
	//	argDay = document.all["dg2__ctl" + pEndNo + "_txEndDay"].id;
	//}
    //1050725	Kenny   [1050087]	二代公文系統相關修改；因原小日曆按鍵取消，調整代理日期區間設定方式--End--
	//1010420  1010322 Cloud        代理區間DG 增加小日期按鈕--end
	
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
        //1050725	Kenny   [1050087]	二代公文系統相關修改；無Button3，移除此部分--Start--
		//case "Button3":
		//	fnOpen('IFC020.aspx','450','360');
		//	break;
        //1050725	Kenny   [1050087]	二代公文系統相關修改；無Button3，移除此部分--End--
        //1050725	Kenny   [1050087]	二代公文系統相關修改；無btDeployPrivilege，移除此部分--Start--
		//case "btDeployPrivilege":
		//	Page_BlockSubmit=true;
		//	jf_SaveCookie("nObject",document.all.nObject.value);
  		//    jf_ShowModal("IFM210C2.htm","480","500");
  		//    break;
        //1050725	Kenny   [1050087]	二代公文系統相關修改；無btDeployPrivilege，移除此部分--End--
        //1010501  1010322 Cloud        代理區間DG 增加小日期
        //1050725	Kenny   [1050087]	二代公文系統相關修改；因原小日曆按鍵取消，調整代理日期區間設定方式--Start--
  		//case btStartDate:
		//	Page_BlockSubmit=true;
		//	//1020130 Cloud 修改函式名稱避免叫錯
		//	//jf_CallCalendar(argYear, argMonth, argDay)
		//	CallCalendar(argYear, argMonth, argDay)
		//	break;
		//case btEndDate:
		//	Page_BlockSubmit=true;
		//	//1020130 Cloud 修改函式名稱避免叫錯
		//	//jf_CallCalendar(argYear, argMonth, argDay)
		//	CallCalendar(argYear, argMonth, argDay)
		//	break;
        //1050725	Kenny   [1050087]	二代公文系統相關修改；因原小日曆按鍵取消，調整代理日期區間設定方式--End--
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050725	Kenny   [1050087]	二代公文系統相關修改
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
	
	//1050725	Kenny   [1050087]	二代公文系統相關修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btSearch":
			//1050725	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPrint":
			Page_BlockSubmit = !jf_ConfirmPrint();
			//1050725	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btPreview":
			Page_BlockSubmit = false;
			//1050725	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			var str="";
			if(!fnCheckDate())
				return;
			Page_BlockSubmit = false ;
			//1010302	Leslie	修正開啟代理之權利設定後，代理紀錄儲存錯誤之問題
			//1070904 Justin [1070678]弱掃修正CookieHttpOnly
			//jf_SaveCookie("nObject",document.all.nObject.value);
			//1050725	Kenny   [1050087]	二代公文系統相關修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":	//恢復使用"清除"鍵，但改為只清除"代理區間"
			Page_BlockSubmit = true;
			if(window.confirm("確定要清除嗎?"))
			{
				fnCleanDate(true);
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
	
	if(!jf_CheckBlankAndAlert())
		bRtnbool = false;
		
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
		if(jf_Trim(document.all["dg1__ctl" + i + "_txInput1"].value) != "")
		{
			//txInput2不可空白
			if(jf_Trim(document.all["dg1__ctl" + i + "_txInput2"].value) == "")
			{
				InValidName += ",Input2不可空白";			
				InValidControlName = "dg1__ctl" + i + "_txInput2";
			}
							
			if(InValidName != "")
			{
				InValidName = InValidName.substr(1,InValidName.length);
                //1050725	Kenny   [1050087]	二代公文系統相關修改--Start--
				//jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText+"之列中,"+InValidName])),"");
                //document.all[InValidControlName].focus();
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序"+document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent+"之列中,"+InValidName])),"");
                $('#'+InValidControlName).focus(); 
                //1050725	Kenny   [1050087]	二代公文系統相關修改--End--
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
    
    if ( argCallerId == "IFC021" )
    {
        var strRetCode = jf_Trim(document.all.lbReturnValue.options[0].value);
        var strRetName = jf_Trim(document.all.lbReturnValue.options[2].value);
        
        if(document.all["txNowAccount"].value == strRetCode)
		{
			document.all[u_AccountId].value		= "";
			document.all[u_NameId].value			= "";
			alert("代理人與被代理人不可相同");
			return;
		}
		document.all.lbProxy.options[u_Idx].value	= strRetCode;
		document.all.lbProxy.options[u_Idx].text	= strRetCode;
		document.all[u_AccountId].value		        = strRetCode;
		document.all[u_NameId].value			    = strRetName;
    }
	//1060421	Joe		1060186		修正將cookie移至CallBack後再儲存--S
    if ( argCallerId == "IFM210C2" )
    {
		//1070904 Justin [1070678]弱掃修正CookieHttpOnly
		//jf_SaveCookie("nObject",document.all.nObject.value);
	}
	//1060421	Joe		1060186		修正將cookie移至CallBack後再儲存--E
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_DeleteProxy(argAccountId, argNameId,argIdx)
{
	Page_BlockSubmit=true;
	document.all.lbProxy.options[argIdx].text = "";
	document.all.lbProxy.options[argIdx].value = "";
	document.all[argAccountId].value = "";
	document.all[argNameId].value = "";
	
	document.all.lbIsProxyOfAccount.options[argIdx].text = "0";
}

function jf_SetProxy(argAccountId, argNameId, argIdx)
{
    u_AccountId = argAccountId ;
    u_NameId = argNameId ;
    u_Idx = argIdx ;

	Page_BlockSubmit=true;
	var arrSelectType = new Array(1);
	arrSelectType[0] = "Account";
    //1050725	Kenny   [1050087]	二代公文系統相關修改--Start--
	//var ret = jf_ShowOrgDialogByLevel(0, arrSelectType);
	//if(ret!=null)
	//{
	//	if(document.all["txNowAccount"].value == ret.Code)
	//	{
	//		document.all[argAccountId].value		= "";
	//		document.all[argNameId].value			= "";
	//		alert("代理人與被代理人不可相同");
	//		return;
	//	}
	//	document.all.lbProxy.options[argIdx].value	= ret.Code;
	//	document.all.lbProxy.options[argIdx].text	= ret.Code;
	//	document.all[argAccountId].value		= ret.Code;
	//	document.all[argNameId].value			= ret.Name;
	//}	
    jf_ShowOrgDialogByLevel(0, arrSelectType);
    //1050725	Kenny   [1050087]	二代公文系統相關修改--End--
}
function jf_ShowOrgDialogByLevel(argParam, argSelectType, argOrgNo)
{
	var sSelectType = "";
	for(var i=0; i<argSelectType.length; i++)
	{
		if(i != 0)
			sSelectType += ",";
		//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
		// sSelectType += "'" + argSelectType[i] + "'";
		sSelectType += argSelectType[i];
	}
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection--S
	// jf_SaveCookie("iic021StrctureType"	, argParam);
	// jf_SaveCookie("iic021SelectType"	, sSelectType);
	// if(argOrgNo)
		// jf_SaveCookie("iic021OrgNo"	, argOrgNo);
    //1050725	Kenny   [1050087]	二代公文系統相關修改--Start--
	//var ret= fnOpen("IFC021.htm","288","470");
    // jf_ShowModal("IFC021.htm","288","470");
	//1070905	Joe		1070678		修正弱掃Client Cookies Inspection--S
	if (argOrgNo)
		//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
		//jf_ShowModal("IFC021.aspx?iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo, "288", "470");
		jf_ShowModal("IFC021.aspx?iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo);
	else
	//1070905	Joe		1070678		修正弱掃Client Cookies Inspection--E
		//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
		//jf_ShowModal("IFC021.aspx?iic021SelectType=" + sSelectType,"288","470");
		jf_ShowModal("IFC021.aspx?iic021SelectType=" + sSelectType);
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection--E
    Page_BlockSubmit=true;
    //1050725	Kenny   [1050087]	二代公文系統相關修改--End--
	//清除Cookie
	// if(argOrgNo)
		// jf_SaveCookie("iic021OrgNo"	, "");
    //1050725	Kenny   [1050087]	二代公文系統相關修改
	//return ret;
}
//1050725	Kenny   [1050087]	二代公文系統相關修改；取消fnOpen功能--Start--
//function fnOpen(arg,argW,argH)
//{
//   var sFeatures="dialogWidth: "+ argW + "px;dialogHeight:"+ argH+"px";
//   var ret = window.showModalDialog(arg, "", sFeatures);
//   return ret;
//}
//1050725	Kenny   [1050087]	二代公文系統相關修改；取消fnOpen功能--End--


function CallGetAccountName(argAccountId, argNameId, argIdx)
{
	var sArt = jf_GetArtifact();
    //1051108   Kenny   [1051150]   修改Client Potential Code Injection
	//var sAuthws = document.all.authWS.value;
    var sAuthws = encodeURI(document.all.authWS.value);

	if(sArt == "" || sAuthws == "")
		return;
	document.all[argAccountId].value = jf_Trim(document.all[argAccountId].value);
	if(jf_Trim(document.all[argAccountId].value) == "")
	{
		document.all[argNameId].value = "";
		document.all.lbProxy.options[argIdx].value	= "";
		document.all.lbProxy.options[argIdx].text	= "";
		return;
	}

	if(jf_Trim(document.all["txNowAccount"].value) == jf_Trim(document.all[argAccountId].value))
	{
		document.all[argAccountId].value		= "";
		document.all[argNameId].value			= "";
		alert("代理人與被代理人不可相同");
		return;
	}

	var param = new Array(2);
    //1051108   Kenny   [1051150]   修改Client Potential Code Injection
	//param[0] = sArt;
    param[0] = encodeURI(sArt);
	//1050815 Justin 1050700 弱掃Client Potential Code Injection修正
	//param[1] = document.all[argAccountId].value;
	param[1] = encodeURI(document.all[argAccountId].value);
    //1050725	Kenny   [1050087]	二代公文系統相關修改
	//var result = jf_CallWA(sAuthws, "GetAccountName",false, param);
    var result = jf_CallW(sAuthws, "GetAccountName",false, param);

		
	//jf_CallW	參數不變
	//jf_CallWS	自動增加一個SessionID參數
	//jf_CallWA	自動增加一個Artifact參數
	
    //1050725	Kenny   [1050087]	二代公文系統相關修改，因無error屬性，修改直接判斷回傳value值，取消if/else判斷--Start--
	//if(result.error == false)
	//{
		if(result.value == "")
		{
			document.all[argAccountId].value = "";
			document.all[argNameId].value = "";
			alert("帳號不存在。");
		}
		else
		{
			document.all.lbProxy.options[argIdx].value	= document.all[argAccountId].value;
			document.all.lbProxy.options[argIdx].text	= document.all[argAccountId].value;
			document.all[argNameId].value = result.value;
		}
	//}
	//else
	//	alert(result.errorDetail.string);
    //1050725	Kenny   [1050087]	二代公文系統相關修改，因無error屬性，修改直接判斷回傳value值，取消if/else判斷--End--
}


function fnCheckDate()
{
	var bRet = true;
	//修正警告訊息時，所需的變數
	var strErrMsg = "";	
	var strBreak = "";
	var objFirstFixTB;
	var IdxArr = new Array(5);
	//================變數 End=================
	var str = document.all.nIDList.value;
	if ( str != "" )
	{
		var nIDList= str.split('|');
		for(var i=0;i<5;i++)
		{
			var nIdArr = nIDList[i].split(';');
			var txStartYear		=nIdArr[0];
			var txStartMonth	=nIdArr[1];
			var txStartDay		=nIdArr[2];
			var ddlStart		=nIdArr[3];
			var ddlStart2		=nIdArr[4];		
			var txEndYear		=nIdArr[5];
			var txEndMonth		=nIdArr[6];
			var txEndDay		=nIdArr[7];
			var ddlEnd			=nIdArr[8];
			var ddlEnd2			=nIdArr[9];		
			var txReason		=nIdArr[10];
		
			bRet = bRet && jf_ChkDateFmt(	document.all[txStartYear],
											document.all[txStartMonth],
											document.all[txStartDay],
											1,			//could be null
											"CHY",		//民國年
											1			//補滿0
											);

			bRet = bRet && jf_ChkDateFmt(	document.all[txEndYear],
											document.all[txEndMonth],
											document.all[txEndDay],
											1,			//could be null
											"CHY",		//民國年
											1			//補滿0
											);
			var startDate =	document.all[txStartYear].value+document.all[txStartMonth].value+document.all[txStartDay].value;
			var endDate	  = document.all[txEndYear].value+document.all[txEndMonth].value+document.all[txEndDay].value;
			if(jf_Trim(startDate)!="")
			{
				if(jf_Trim(endDate)=="")
				{
					//修正錯誤訊息內容並顯示錯誤序號
					jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty),new Array(["序號["+(i+1)+"]代理期間日期"])),"");
                    //1050725	Kenny   [1050087]	二代公文系統相關修改
					//document.all[txEndYear].focus();
                    $('#'+txEndYear).focus(); 
					return false;
				}
			}
		
			if(jf_Trim(endDate)!="")
			{
				if(jf_Trim(startDate)=="")
				{
					//修正錯誤訊息內容並顯示錯誤序號
					jf_ShowMeg(FormatStr(jf_GetErrMsg(UnAllowEmpty),new Array(["序號["+(i+1)+"]代理期間日期"])),"");
                    //1050725	Kenny   [1050087]	二代公文系統相關修改
					//document.all[txStartYear].focus();
                    $('#'+txStartYear).focus(); 
					return false;
				}
			}
			
			//增加檢核是否年月日均完整輸入
			if( (jf_Trim(startDate) != "" && jf_Trim(startDate).length < 7) || (jf_Trim(endDate) != "" && jf_Trim(endDate).length < 7) )
			{
				fnFocusEmpty((i+1),nIdArr);
				return false;
			}
			
			if(startDate!="" && endDate !="")
			{
				//1090924	Joe		1090640		修正日期合理性未判斷至分--S
				// startDate += document.all[ddlStart].value;
				// endDate += document.all[ddlEnd].value;
				startDate += document.all[ddlStart].value + document.all[ddlStart2].value;
				endDate += document.all[ddlEnd].value +  document.all[ddlEnd2].value;
				//1090924	Joe		1090640		修正日期合理性未判斷至分--E
				if(endDate <= startDate)
				{
					jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr),new Array(["序號["+(i+1)+"]代理期間起迄日期錯誤"])),"");
                    //1050725	Kenny   [1050087]	二代公文系統相關修改
					//document.all[txStartYear].focus();
                    $('#'+txStartYear).focus(); 
					return false;
				}
			}
			
			if(jf_Trim(endDate)!="" && jf_Trim(endDate)< document.all.nCurrDt.value)
			{
				
				//修正警告訊息，增加顯示序號及日期區間內容 ---Start---
				strErrMsg += strBreak+"序號["+(i+1)+"]所紀錄之代理區間["+jf_Trim(startDate)+"~"+jf_Trim(endDate)+"]";
				strBreak = "\n";
				if(!objFirstFixTB)
					objFirstFixTB = document.all[txEndYear];
				IdxArr[i] = true;
				bRet = false;
				//修正警告訊息，增加顯示序號及日期區間內容 ----End----
			}
			
		}
	
	
		//顯示無效區間的警告訊息，並詢問是否清除無效區間
		if(strErrMsg != "")
		{
			if(confirm(strErrMsg+strBreak+"無效，是否清除無效之代理區間？"))
			{
				fnCleanDate(false,IdxArr);
				bRet = true;
			}
			else
				objFirstFixTB.focus();	
		}
		//顯示無效區間的警告訊息，並詢問是否清除無效區間 ---End---
	}
	else
	{
		strErrMsg += "無最新代理資料無法儲存";
		alert(strErrMsg);
		bRet = false;
	}
			
	return bRet;
}
//增加代理人帳號欄位之狀態檢核
function CheckBeforeSave()
{
	var dg1 = document.all["dg1"];
	var iLen = dg1.rows.length;
	var lbProxy = document.all.lbProxy;
	var iProxy = 0;
	
	for(var i=2;i<=iLen;i++)
	{
		for(var idxRole = 1;idxRole <= 8;idxRole++)
		{
			iProxy = ((i-2)*8)+idxRole-1;
			var strAccount = "dg1__ctl"+i+"_txAccount"+idxRole;
			if(!document.all[strAccount])
				break;
			else
			{
				if(jf_Trim(document.all[strAccount].value).toUpperCase() != lbProxy.options[iProxy].value.toUpperCase())
				{
					strCurrColumn = strAccount;
					strCurrAccount = document.all[strAccount].value;
					document.all[strAccount].onblur();
					return false;
				}				
			}
		}
	}
	if(strCurrColumn != "" && document.all[strCurrColumn].value != strCurrAccount)	//表示呼叫後有被清掉
	{
		return false;
	}
	return true;
}
function jf_SetProxyOfAccount(argCheckBoxId, argIdx)
{
    if( document.all[argCheckBoxId].checked == true )
        document.all.lbIsProxyOfAccount.options[argIdx].value = "1";
    else
        document.all.lbIsProxyOfAccount.options[argIdx].value = "0";
}
function jf_SetPrivilege(argUser,argProxy)
{
	Page_BlockSubmit=true;
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
	//jf_SaveCookie("nObject",argProxy);
	//jf_SaveCookie("nPrivPool",argUser);
    //1050725	Kenny   [1050087]	二代公文系統相關修改
    //jf_ShowModal("IFM210C2.htm","480","500");
    //jf_ShowModal("IFM210C2.htm","480","700");
	//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
	//jf_ShowModal("IFM210C2.htm" + "?nObject=" +argProxy+ "&nPrivPool=" +argUser,"480","700");
	jf_ShowModal("IFM210C2.htm" + "?nObject=" + argProxy + "&nPrivPool=" + argUser);
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--E
    //1010302	Leslie	修正開啟代理之權利設定後，代理紀錄儲存錯誤之問題
	//1060421	Joe		1060186		修正將cookie移至CallBack後再儲存
   	// jf_SaveCookie("nObject",document.all.nObject.value);
}
//清除代理區間內容
function fnCleanDate(isAllClear,IdxArr)
{
	var str = document.all.nIDList.value;
	var nIDList= str.split('|');
	if(!IdxArr)
		IdxArr = new Array([true,true,true,true,true]);
	
	for(var i=0;i<5;i++)
	{
		var nIdArr = nIDList[i].split(';');
		if(IdxArr[i] || isAllClear)
		{
			for(var j=0;j<nIdArr.length-1;j++)
			{
				if(j==3 || j==4 || j==8 || j==9)
					document.all[nIdArr[j]].selectedIndex = 0;					
				else
					document.all[nIdArr[j]].value = "";
			}
		}
	}
}

//1010420  1010322 Cloud        代理區間DG 增加小日期按鈕--Start
//1020130	Cloud 修改函式名稱
//function jf_CallCalendar(argYear, argMonth, argDay)
//1050725	Kenny   [1050087]	二代公文系統相關修改；因原小日曆按鍵取消，MARK原設定部分--Start--
//function CallCalendar(argYear, argMonth, argDay)
//{
//	var sPath = "../../../STD/LIB/calendar.htm";
//	strFeatures = "dialogWidth=337px;dialogHeight=330px;center=yes;help=no;status=no;dialogLeft=" + "" + ";dialogTop=" + "";
//	var st = document.all[argYear].value+document.all[argMonth].value+document.all[argDay].value;
//	var sDate = "";
//	sDate = showModalDialog(sPath, st, strFeatures);

//	if( typeof(sDate) == "undefined" )
//		sDate = "";

//	//1020130	Cloud 修改函式名稱避免叫錯
//	//formatDate(sDate,argYear,argMonth,argDay);
//	formatDateClient(sDate,argYear,argMonth,argDay);

//}

//格式轉換：11/02/2003 --> 0921102
//1020130	Cloud 修改函式名稱避免叫錯
//function formatDate(sDate,argYear,argMonth,argDay)
//function formatDateClient(sDate,argYear,argMonth,argDay)
//{
//	if(sDate=="")	return "";
//	var arrayDate = sDate.split("/");
//	var Dday = arrayDate[0];
//	var Dmon = arrayDate[1];
//	var Dyea = (parseInt(arrayDate[2]) - 1911) + "";

//	if( Dyea.length == 2 )
//		Dyea = "0" + Dyea;
//	else if( Dyea.length == 1 )
//		Dyea = "00" + Dyea;
	
//	if( Dmon.length == 1 )
//		Dmon = "0" + Dmon;
//	if( Dday.length == 1 )
//		Dday = "0" + Dday;
//		document.all[argYear].value=Dyea;
//		document.all[argMonth].value=Dmon;
//		document.all[argDay].value=Dday;
//}
//1010420  1010322 Cloud        代理區間DG 增加小日期--end
//1050725	Kenny   [1050087]	二代公文系統相關修改；因原小日曆按鍵取消，MARK原設定部分--End--

//1050725	Kenny   [1050087]	二代公文系統相關修改；因原小日曆按鍵取消，調整代理日期區間設定方式--Start--
function SetDate(argObj)
{
	//1050822	Kenny	[1050087]	二代公文系統相關修改；調整IE11點開小日曆選定日期後無法設定欄位問題--Start--
    //var strDg2Id = argObj.id ;
    //var strDate = argObj.value;
    var strDg2Id = argObj;
    var strDate = document.all[argObj].value;
	//1050822	Kenny	[1050087]	二代公文系統相關修改；調整IE11點開小日曆選定日期後無法設定欄位問題--End--
    
    var pStartNo = "";
	var pEndNo = "";
    var argYear = "";
	var argMonth = "";
	var argDay = "";
    
    if ( strDg2Id.indexOf("_H_txStartDate") != -1 )
        pStartNo = strDg2Id.substring(8, strDg2Id.indexOf("_H_txStartDate"));
    else
        pEndNo = strDg2Id.substring(8, strDg2Id.indexOf("_H_txEndDate"));
	
	if (document.all["dg2__ctl"+pStartNo+"_H_txStartDate"] != null)
    {
        document.all["dg2__ctl" + pStartNo + "_txStartYear"].value = strDate.substr(0, 3);
        document.all["dg2__ctl" + pStartNo + "_txStartMonth"].value = strDate.substr(3, 2);
        document.all["dg2__ctl" + pStartNo + "_txStartDay"].value = strDate.substr(5, 2);
	}
	else if(document.all["dg2__ctl" + pEndNo + "_H_txEndDate"] != null)
	{
        document.all["dg2__ctl" + pEndNo + "_txEndYear"].value = strDate.substr(0, 3);
        document.all["dg2__ctl" + pEndNo + "_txEndMonth"].value = strDate.substr(3, 2);
        document.all["dg2__ctl" + pEndNo + "_txEndDay"].value = strDate.substr(5, 2);
	}
}
//1050725	Kenny   [1050087]	二代公文系統相關修改；因原小日曆按鍵取消，調整代理日期區間設定方式--End--
