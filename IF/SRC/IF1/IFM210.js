/*****************************************************************************************************
   程式修改歷程
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人		單號	概要
 * -------------------------------------------------------------------------------------------------
 * 2011.10.03	CLOUD	  1000539	新增程式
 * 2011.02.17   CLOUD     1010140   修改帳號輸入小寫時onblur檢核錯誤
 * 2016.03.03	Kevin_C		1050080	單位代碼不需檢核是否為數字
 * 2016.06.16	Kevin_C		1050087	升級二代公文系統
 * 1051019		Joe			1050087	二代修改配合行動平台
 * 1070803		Joe			1070678	修正弱掃Client Cookies Inspection
 * 1070905		Joe			1070678	修正弱掃Client Cookies Inspection
 * 1070906		Justin		1070678	弱掃修正CookieHttpOnly、Client Cookies Inspection
 * 1100818		Joe  	  1100991	弱掃修正Client DOM XSS
 * 1101026		Joe			1101211	提供最多10個系統管理員
 * 1110308		Joe			1110076	新增ODT130單位選單
 * 1150206		Andy		序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
 ****************************************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050615	Kevin_C		1050087		升級二代公文系統
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050615	Kevin_C		1050087		升級二代公文系統
	//if (document.all["ValidationSummary1"].innerText != "")
	//	alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator()
}

//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
	// var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	Page_BlockSubmit = true;	
	switch (xObjectName)
	{
		case "btHelp1":
			//1050615	Kevin_C		1050087		升級二代公文系統 -S
			//var ret = jf_ShowOrgDialogForPersonWithOrgNo(document.all.txActiveOrgNo.value);
			//if(ret)
			//{
			//	document.all.txManager1.value		= ret.Code;
			//	document.all.txManagerName1.value	= ret.Name;
			//}
			jf_ShowOrgDialogForPersonWithOrgNo(document.all.txActiveOrgNo.value);
			strClickBtn = "btHelp1";
			//1050615	Kevin_C		1050087		升級二代公文系統 -E
			break;
		case "btHelp2":
			//1050615	Kevin_C		1050087		升級二代公文系統 -S
			//var ret = jf_ShowOrgDialogForPersonWithOrgNo(document.all.txActiveOrgNo.value);
			//if(ret)
			//{
			//	document.all.txManager2.value		= ret.Code;
			//	document.all.txManagerName2.value	= ret.Name;
			//}
			jf_ShowOrgDialogForPersonWithOrgNo(document.all.txActiveOrgNo.value);
			strClickBtn = "btHelp2";
			//1050615	Kevin_C		1050087		升級二代公文系統 -E
			break;
		case "btHelp3":
			//1050615	Kevin_C		1050087		升級二代公文系統 -S
			//var ret = jf_ShowOrgDialogForPersonWithOrgNo(document.all.txActiveOrgNo.value);
			//if(ret)
			//{
			//	document.all.txManager3.value		= ret.Code;
			//	document.all.txManagerName3.value	= ret.Name;
			//}
			jf_ShowOrgDialogForPersonWithOrgNo(document.all.txActiveOrgNo.value);
			strClickBtn = "btHelp3";
			//1050615	Kevin_C		1050087		升級二代公文系統 -E
			break;
		//1101026	Joe		1101211		提供最多10個系統管理員
		case "btHelp4":
			jf_ShowOrgDialogForPersonWithOrgNo(document.all.txActiveOrgNo.value);
			strClickBtn = "btHelp4";
			break;
		case "btHelp5":
			jf_ShowOrgDialogForPersonWithOrgNo(document.all.txActiveOrgNo.value);
			strClickBtn = "btHelp5";
			break;
		case "btHelp6":
			jf_ShowOrgDialogForPersonWithOrgNo(document.all.txActiveOrgNo.value);
			strClickBtn = "btHelp6";
			break;
		case "btHelp7":
			jf_ShowOrgDialogForPersonWithOrgNo(document.all.txActiveOrgNo.value);
			strClickBtn = "btHelp7";
			break;
		case "btHelp8":
			jf_ShowOrgDialogForPersonWithOrgNo(document.all.txActiveOrgNo.value);
			strClickBtn = "btHelp8";
			break;
		case "btHelp9":
			jf_ShowOrgDialogForPersonWithOrgNo(document.all.txActiveOrgNo.value);
			strClickBtn = "btHelp9";
			break;
		case "btHelp10":
			jf_ShowOrgDialogForPersonWithOrgNo(document.all.txActiveOrgNo.value);
			strClickBtn = "btHelp10";
			break;
		//1101026	Joe		1101211		提供最多10個系統管理員
		case "btDel1":
			document.all.txManager1.value		= "";
			document.all.txManagerName1.value	= "";
			break;
		case "btDel2":
			document.all.txManager2.value		= "";
			document.all.txManagerName2.value	= "";
			break;
		case "btDel3":
			document.all.txManager3.value		= "";
			document.all.txManagerName3.value	= "";
			break;
		//1101026	Joe		1101211		提供最多10個系統管理員
		case "btDel4":
			document.all.txManager4.value		= "";
			document.all.txManagerName4.value	= "";
			break;
		case "btDel5":
			document.all.txManager5.value		= "";
			document.all.txManagerName5.value	= "";
			break;
		case "btDel6":
			document.all.txManager6.value		= "";
			document.all.txManagerName6.value	= "";
			break;
		case "btDel7":
			document.all.txManager7.value		= "";
			document.all.txManagerName7.value	= "";
			break;
		case "btDel8":
			document.all.txManager8.value		= "";
			document.all.txManagerName8.value	= "";
			break;
		case "btDel9":
			document.all.txManager9.value		= "";
			document.all.txManagerName9.value	= "";
			break;
		case "btDel10":
			document.all.txManager10.value		= "";
			document.all.txManagerName10.value	= "";
			break;
		//1101026	Joe		1101211		提供最多10個系統管理員
		case "btDeployPrivilege":
			//1070906 Justin [1070678]弱掃修正CookieHttpOnly--S
			//jf_SaveCookie("nObject", document.all.nObject.value);
			//jf_SaveCookie("nOrgNo" , document.all["txActiveOrgNo"].value);
			//jf_ShowModal("IFM210C2.htm" + GetAllParamStr(),"480","500");
			var param = ReplaceParamStr(GetAllParamStr(), "nObject", document.all.nObject.value);
			param = ReplaceParamStr(param, "nOrgNo", document.all["txActiveOrgNo"].value);
			//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
			//jf_ShowModal("IFM210C2.htm" + param, "480","500");
			jf_ShowModal("IFM210C2.htm" + param);
			break;
		case "btEnvSetting":
			//jf_SaveCookie("nObject",document.all.nObject.value);
			//jf_SaveCookie("nOrgNo" , document.all["txActiveOrgNo"].value);
			//jf_ShowModal("IFM210C3.htm" + GetAllParamStr(),"680","500");
			var param = ReplaceParamStr(GetAllParamStr(), "nObject", document.all.nObject.value);
			param = ReplaceParamStr(param, "nOrgNo", document.all["txActiveOrgNo"].value);
			//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
			//jf_ShowModal("IFM210C3.htm" + param, "680", "500");
			jf_ShowModal("IFM210C3.htm" + param);
			//1070906 Justin [1070678]弱掃修正CookieHttpOnly--E
		break;
	}	
}

//1050616	Kevin_C	1050087	升級二代公文系統
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;
	
	if(IsServerHandling)
	   return;
	
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	//1050615	Kevin_C		1050087		升級二代公文系統
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = true;
			//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
			//var ret =jf_ShowModal("IFM210C1.htm" + GetAllParamStr(),"380","460");
			var ret = jf_ShowModal("IFM210C1.htm" + GetAllParamStr());
			ProcessCreate(ret);
			break;
		case "btSave":
			Page_BlockSubmit = !jf_CheckKeyObject();
			var strOrgCode = jf_Trim(document.all.txOrgCode.value);
			if(strOrgCode == "")
			{
				Page_BlockSubmit = true;
				//1050615	Kevin_C		1050087		升級二代公文系統
				//alert(document.all.lbOrgCode.innerText.substring(0,4) + "不可空白");
				alert(document.all.lbOrgCode.textContent.substring(0,4) + "不可空白");
				//1050615	Kevin_C		1050087		升級二代公文系統
				//document.all.txOrgCode.focus();
				$('txOrgCode').focus()
				return;
			}

			if(document.all["dlDeptType"] && document.all["txcheckmode"].value=="")
			{
				//1050303	Kevin_C	1050080	單位代碼不需檢核是否為數字 -S
				//if(isNaN(strOrgCode))
				//{
				//	Page_BlockSubmit = true;
				//	alert("單位代碼請填數字");
				//	document.all.txOrgCode.focus();
				//	return;
				//}
				//1050303	Kevin_C	1050080	單位代碼不需檢核是否為數字 -E

				//檢核單位類型選一層決行時之單位代碼 #2005.09.28 Andy
				var nOrgCode = 0;
				var nDeptIdx = document.all["dlDeptType"].selectedIndex;
				if(nDeptIdx == 2 || nDeptIdx == 3) //"一層決行單位"或"一層決行一般單位"
				{
					nOrgCode = parseInt(strOrgCode);	
					if(nOrgCode < 95)
					{
						Page_BlockSubmit = true;
						alert("單位類型屬一層決行時代碼必須為95以上");
						//1050615	Kevin_C		1050087		升級二代公文系統
						//document.all.txOrgCode.focus();
						$('txOrgCode').focus();
						return;
					}
				}
			}
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			break;
		case "btClean":
			Page_BlockSubmit = true;
			document.all.txManagerName1.value = "";
			document.all.txManagerName2.value = "";
			document.all.txManagerName3.value = "";
			//1101026	Joe		1101211		提供最多10個系統管理員
			document.all.txManagerName4.value = "";
			document.all.txManagerName5.value = "";
			document.all.txManagerName6.value = "";
			document.all.txManagerName7.value = "";
			document.all.txManagerName8.value = "";
			document.all.txManagerName9.value = "";
			document.all.txManagerName10.value = "";
			//1101026	Joe		1101211		提供最多10個系統管理員
			jf_ConfirmClean();
			break;
		case "btPrint":
			//Page_BlockSubmit = !jf_ConfirmPrint();
			Page_BlockSubmit = false;
			break;
		case "btPreview":
			//Page_BlockSubmit = !jf_ConfirmPreview();
			Page_BlockSubmit = false;
			break;
	}
	//1050615	Kevin_C		1050087		升級二代公文系統
	//jf_ToolBarSubmit();
	jf_ToolBarSubmit(xObjectName);
}
//1050615	Kevin_C		1050087		升級二代公文系統
var strClickBtn = "";
function CallBack(argCallerId)
{
	//1050615	Kevin_C		1050087		升級二代公文系統 -S
	if(argCallerId == "IFC021")
	{
		if(strClickBtn != "")
		{
			switch (strClickBtn)
			{
				case "btHelp1":
					document.all.txManager1.value		= document.all.lbReturnValue.options[0].value;
					document.all.txManagerName1.value	= document.all.lbReturnValue.options[2].value;
					break;
				case "btHelp2":
					document.all.txManager2.value		= document.all.lbReturnValue.options[0].value;
					document.all.txManagerName2.value	= document.all.lbReturnValue.options[2].value;
					break;
				case "btHelp3":
					document.all.txManager3.value		= document.all.lbReturnValue.options[0].value;
					document.all.txManagerName3.value	= document.all.lbReturnValue.options[2].value;
					break;
				//1101026	Joe		1101211		提供最多10個系統管理員
				case "btHelp4":
					document.all.txManager4.value		= document.all.lbReturnValue.options[0].value;
					document.all.txManagerName4.value	= document.all.lbReturnValue.options[2].value;
					break;
				case "btHelp5":
					document.all.txManager5.value		= document.all.lbReturnValue.options[0].value;
					document.all.txManagerName5.value	= document.all.lbReturnValue.options[2].value;
					break;
				case "btHelp6":
					document.all.txManager6.value		= document.all.lbReturnValue.options[0].value;
					document.all.txManagerName6.value	= document.all.lbReturnValue.options[2].value;
					break;
				case "btHelp7":
					document.all.txManager7.value		= document.all.lbReturnValue.options[0].value;
					document.all.txManagerName7.value	= document.all.lbReturnValue.options[2].value;
					break;
				case "btHelp8":
					document.all.txManager8.value		= document.all.lbReturnValue.options[0].value;
					document.all.txManagerName8.value	= document.all.lbReturnValue.options[2].value;
					break;
				case "btHelp9":
					document.all.txManager9.value		= document.all.lbReturnValue.options[0].value;
					document.all.txManagerName9.value	= document.all.lbReturnValue.options[2].value;
					break;
				case "btHelp10":
					document.all.txManager10.value		= document.all.lbReturnValue.options[0].value;
					document.all.txManagerName10.value	= document.all.lbReturnValue.options[2].value;
					break;
				//1101026	Joe		1101211		提供最多10個系統管理員
			}
		}
	}
	//1050712	Kevin_C	1050087	升二代 -E
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
	//1050615	Kevin_C		1050087		升級二代公文系統 -E
}

function ClientOnLoad()
{
	ShowMsg();
	//var sAuthws = document.all.authWS.value;
	//fnCallW(sAuthws, "GetAccountNameWithOrgNo", false, null);
	
	if(document.all["txcheckmode"].value!="")
	{
		document.all.tr_satus.className   = "hide";
		document.all.tr_OrderBy.className ="hide";
		//1110308	Joe		1110076		新增ODT130單位選單
		document.all.tr_OrderBy2.className ="hide";
	}

	if(document.all.nReload!=null)
		//1100818	Joe		1100991		弱掃修正Client DOM XSS
		// parent.navbar.location="IFM210T1.aspx" + GetAllParamStr();
		parent.navbar.location="IFM210T1.aspx" + encodeURI(GetAllParamStr());
	/*1070906 Justin [1070678]弱掃修正CookieHttpOnly
	if(jf_ReadCookie("nCleanOrgNoField")!=null)
	{
		if(jf_ReadCookie("nCleanOrgNoField")=="true")
		{
			jf_SaveCookie("nCleanOrgNoField","false");
			document.all.txOrgCode.value="";
		}
	}*/
	if(document.all["UnitSchemaStr"])
		UNIT_SCHEMA = document.all["UnitSchemaStr"].value;
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

function ProcessCreate(ret)
{
	if(ret==null)
		return;
	var strNewObject = GetElement(ret,4);
	var strNewType   = GetElement(ret,1);
	
	//1070906 Justin [1070678]弱掃修正CookieHttpOnly--S
	//jf_SaveCookie("nObject",strNewObject);
	var param = ReplaceParamStr(GetAllParamStr(), "nObject", strNewObject);
	if(strNewType==UNIT_SCHEMA)
	{
		//TreeViewReload("IFM210T1.aspx" + GetAllParamStr());
		//document.location = "IFM210.aspx" + GetAllParamStr();
		//jf_SaveCookie("nCleanOrgNoField","true");
		TreeViewReload("IFM210T1.aspx" + param);
		//1100818	Joe		1100991		弱掃修正Client DOM XSS
		// document.location = "IFM210.aspx" + param;
		document.location = "IFM210.aspx" + encodeURI(param);
	}
	else
	{
		//TreeViewReload("IFM210T1.aspx" + GetAllParamStr());
		//document.location = "IFM210_1.aspx" + GetAllParamStr();
		TreeViewReload("IFM210T1.aspx" + param);
		//1100818	Joe		1100991		弱掃修正Client DOM XSS
		// document.location = "IFM210_1.aspx" + param;
		document.location = "IFM210_1.aspx" + encodeURI(param);
	}
	//1070906 Justin [1070678]弱掃修正CookieHttpOnly--E
}
//1070906 Justin [1070678]弱掃修正CookieHttpOnly
function ReplaceParamStr(argParamStr, argKey, argValue)
{
	if(argParamStr == "")
		return "";
	if(typeof(argValue) == "undefined" || argValue == "")
		return argParamStr;

	var ret = "";
	var bStartWithQ = argParamStr.indexOf("?") == 0;
	if(bStartWithQ)
		argParamStr = argParamStr.replace("?", "");
	if(bStartWithQ)
		ret = "?";
		
	var bHasKeyParam = false;
	var arrPara = argParamStr.split("&");
	for(var i=0; i<arrPara.length; i++)
	{
		var arrOnePara = arrPara[i].split("=");
		if(arrOnePara[0].toUpperCase() == argKey.toUpperCase())
		{
			arrOnePara[1] = argValue;
			bHasKeyParam = true;
		}
		if(i != 0)
			ret += "&";
		ret += arrOnePara[0] + "=" + arrOnePara[1];
	}
	if(bHasKeyParam == false)
		ret += "&" + argKey + "=" + argValue;
	return ret;
}

function GetAllParamStr()
{
	var strParam = "";
	var pUrl = unescape(this.location);
	if( pUrl != -1 )
	{
		var i = pUrl.indexOf("?");
		if(i != -1)
			strParam = pUrl.substr(i); 
	}
	return strParam;
}
function jf_ShowOrgDialogForPersonWithOrgNo(argOrgNo)
{
	var arrSelectType = new Array(1);
	arrSelectType[0] = "Account";
	var ret = jf_ShowOrgDialogByLevel("0", arrSelectType, argOrgNo);
	return ret;
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
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection--E
	//1050615	Kevin_C		1050087		升級二代公文系統 -S
	//var ret= fnOpen("IFC021.htm","288","470");
	////清除Cookie
	//if(argOrgNo)
	//	jf_SaveCookie("iic021OrgNo"	, "");
	//return ret;
	// else
		// jf_SaveCookie("iic021OrgNo"	, "");
	//1070803	Joe		1070678		修正弱掃Client Cookies Inspection
	//jf_ShowModal("IFC021.htm","288","470");
	//1070905	Joe		1070678		修正弱掃Client Cookies Inspection--S
	if (argOrgNo)
		//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
		//jf_ShowModal("IFC021.aspx?iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo, "288", "470");
		jf_ShowModal("IFC021.aspx?iic021SelectType=" + sSelectType + "&iic021OrgNo=" + argOrgNo);
	else
	//1070905	Joe		1070678		修正弱掃Client Cookies Inspection--E
	//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
	//jf_ShowModal("IFC021.aspx?iic021SelectType=" + sSelectType, "288", "470");
		jf_ShowModal("IFC021.aspx?iic021SelectType=" + sSelectType);
	//1050615	Kevin_C		1050087		升級二代公文系統 -E
}
//1050615	Kevin_C		1050087		升級二代公文系統
//function fnOpen(arg,argW,argH)
//{
//   var sFeatures="dialogWidth: "+ argW + "px;dialogHeight:"+ argH+"px";
//   var ret = window.showModalDialog(arg, "", sFeatures);
//   return ret;
//}
function CheckAccountWithOrgNo(Manager,MangerName)
{	

	for(var i=0 ; i<document.all["h_dlDeptName"].options.length;i++)
	{
		//if(document.all[Manager].value==document.all["h_dlDeptName"].options[i].value)
		// 2011.02.17   CLOUD     1010140   修改帳號輸入小寫時onblur檢核錯誤	
	    if(document.all[Manager].value.toUpperCase()==document.all["h_dlDeptName"].options[i].value)
	    {	
			document.all[MangerName].value=document.all["h_dlDeptName"].options[i].text;
			return;
		}
		
	}
}