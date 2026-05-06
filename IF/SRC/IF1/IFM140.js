/*	DATE 	SA			PRG			MGR_NO	DESC
 *	1050531	Kevin		Joe 		1050087	二代公文修改
 *	1050803	Kevin		Joe 		1050087	修改子視窗大小
 *	1051019	Leslie		Joe			1050087	二代修改配合行動平台
 *	1070906 Kevin		Justin		1070678	弱掃修正CookieHttpOnly
 *	1080816 Kevin		Joe			1080628	修正開啟子視窗前需進行編碼
 *  1091130	Joe			Joe			信保序15 移除ClientOnload無用呼叫WS
 *  1091210	Kevin		Joe			1090891	修改滲透測試，移除無用的路徑資訊
 *  1100818	Kevin		Joe  		1100991	弱掃修正Client DOM XSS
 *  1131023 Joe         Jason       1130960 增加檢核儲存時鍵值欄位為空白
 *  1140417 Leslie    　Levi　      1131224 新增操作手冊功能
 *  1141223	Leslie		Andy		1141162	新增檔案大小檢核
 *  1150206	Zen			Andy		序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
 */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/

//1140415	Levi  1131224	新版AJAX非同步時會有TIMEOUT異常，增加此段避開異常-S
AjaxPro.Request.prototype.timeout = function () {
	try {
		this.duration = new Date().getTime() - this.__start;
		var r = this.onTimeout(this.duration, this);
		if (typeof r == "undefined" || r != false) {
			this.abort();
		} else {
			this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
		}
	}
	catch (error) {

	}
	finally {

	}
}
//1140415	Levi  1131224	新版AJAX非同步時會有TIMEOUT異常，增加此段避開異常-E









func_AppType();
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1050531 Joe 1050087 二代公文修改
// if(document.all.tbTool)
	// document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
document.all.ddlApplicationType.onchange = func_AppType;
document.all.txDescription.onkeydown = fnHandleTextarea;
function func_AppType()
{
	var obj = document.all.ddlApplicationType;
	if (obj.value == 1) //伺服器端應用程式
	{
		document.all.rbLoginAuto.checked = true;

		document.all.tr_AutoLogin.className    = "hide";
		document.all.tr_AccountObjID.className = "hide";
		document.all.tr_PasswdObjID.className  = "hide";
		document.all.tr_ChkBtnObjID.className  = "hide";
		document.all.tr_FuncNameObjID.className= "hide";
		document.all.td_PassArtifact.className  = "hide";
		document.all.tr_FileName.className   = "dTR";
		document.all.tr_VirtualDir.className = "dTR";
		document.all.td_PassIdPwd.className   = "";
	}
	else if(obj.value == 2) //使用者端應用程式
	{
		document.all.tr_VirtualDir.className = "hide";
		document.all.td_PassIdPwd.className   = "hide";
		document.all.td_PassArtifact.className= "";
	}
}

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1091130	Joe		信保序15	移除無用呼叫
	// jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
	
	if( document.all.hFlag.value == 'del' )
	{
		//if(fnRefreshChildNodes() == false)
			TreeViewReload("IFM140T1.aspx");
	}
	else if( document.all.hFlag.value == 'save' )
	{
		//if(fnRefreshChildNodes() == false)
			TreeViewReload("IFM140T1.aspx");
	}
	
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019	joe		1050087		二代修改配合行動平台
// function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	joe		1050087		二代修改配合行動平台
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
		case "btPriv_Set":
			/*
			var ret = jf_ShowPrivilegeDialog("");
			if( ret != null && ret != "" )
			{
				document.all.txUserPrivilege.value  = GetElement(ret, 1);
				document.all.txPriv.value  = GetElement(ret, 1);
				document.all.txPrivIdentity.value	= GetElement(ret, 2);				
				document.all.hPrivilegePath.value	= GetElement(ret, 2);
			}
			*/
			//1050629	Joe		1050087		修改showModalDialog子視窗
			jf_ShowPrivilegeDialog("");
			Page_BlockSubmit=true;
			break;
		case "btVD_Set":
			/*
			var ret = jf_ShowVirtualDirDialog("");
			if( ret != null && ret != "" )
			{
				document.all.txVirtualDir.value    = GetElement(ret, 0);
				document.all.hVirtualDirPath.value = GetElement(ret, 2);
			}
			*/
			//1050629	Joe		1050087		修改showModalDialog子視窗
			jf_ShowVirtualDirDialog("");
			Page_BlockSubmit=true;
			break;
		case "btPriv_Del":
			document.all.txUserPrivilege.value    = "";
			//1091210	Joe		1090891		修改滲透測試，移除無用的路徑資訊
			// document.all.hPrivilegePath.value = "";
			document.all.txPriv.value  = "";
			document.all.txPrivIdentity.value	= "";
			Page_BlockSubmit=true;
			break;
		case "btVD_Del":
			document.all.txVirtualDir.value    = "";
			//1091210	Joe		1090891		修改滲透測試，移除無用的路徑資訊
			// document.all.hVirtualDirPath.value = "";
			Page_BlockSubmit=true;
			break;

		case "":
			document.getElementById('fileInput').click();
			Page_BlockSubmit = true;
			break;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050531 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1050531 Joe 1050087 二代公文修改
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = true;
			//1050628	Joe		修正ShowModalDialog開啟視窗問題
			//var ret = jf_ShowModal('IFM140C1.htm' + GetAllParamStr(),'400','490');
			//1050803	Joe		1050087		修正子視窗大小
			// jf_ShowModal('IFM140C1.aspx' + GetAllParamStr(), '400', '490');
			//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
			//jf_ShowModal('IFM140C1.aspx' + GetAllParamStr(), '800', '600');
			jf_ShowModal('IFM140C1.aspx' + GetAllParamStr());
			/*if(typeof(ret) != "string" || ret == "") return;

			var theType = GetElement(ret, 0);
			if ( theType == "AP_SCHEMA" )
			{
				jf_SaveCookie("nObject", GetElement(ret, 1));
				//if(fnRefreshChildNodes() == false)
					TreeViewReload("IFM140T1.aspx" + GetAllParamStr()); 
				window.location = "IFM140.aspx" + GetAllParamStr();
			}
			else if ( theType == "APS_SCHEMA" )
			{
				jf_SaveCookie("nObject", GetElement(ret, 1));
				//if(fnRefreshChildNodes() == false)
					TreeViewReload("IFM140T1.aspx" + GetAllParamStr());
				window.location = "IFM140_1.aspx" + GetAllParamStr();
			}
			*/
			break;
		case "btSave":
			if( Page_BlockSubmit = !IsnObjectOK() ) return; 
			Page_BlockSubmit = !fnChkSomething();
			if (!Page_BlockSubmit) 
				document.all.hFlag.value = 'save';	
			//1050531 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			BeforeSav();
			jf_ToolBarSubmit(xObjectName);				
			break;
		case "btDelete":
			if( Page_BlockSubmit = !IsnObjectOK() ) return;
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1050531 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;

			//1140417 Levi 1131224 保留隱藏欄位
			keephidden();

			var ret = jf_ConfirmClean(true);

			//1140417 Levi 1131224 保留隱藏欄位
			sethidden();



			if(ret)
			{
				//1091210	Joe		1090891		修改滲透測試，移除無用的路徑資訊
				// document.all.hPrivilegePath.value = "";
				// document.all.hVirtualDirPath.value = "";
				//1070906 Justin [1070678]弱掃修正CookieHttpOnly
				//jf_SaveCookie("nObject", "");
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
	
	if (document.all["txKeyFld"].value == "")
	{
		strErrMsg += "鍵值欄位不可空白\n";
		//1050531	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txKeyFld"].focus();
		$('#txKeyFld').focus();
	}
	
	if (document.all["txRequireFld"].value == "")
	{
		strErrMsg += "必要欄位不可空白\n";
		//1050531	Joe	1050087	二代系統升級，調整focus寫法
		//document.all["txRequireFld"].focus();
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
	
	//1050713	Joe	1050087	二代系統升級--S
	if (argCallerId == "IFM140C1") 
	{
		if (document.all.lbReturnValue.options[0].value == "AP_SCHEMA") 
		{
			//1070906 Justin [1070678]弱掃修正CookieHttpOnly
			//jf_SaveCookie("nObject",document.all.lbReturnValue.options[1].value);
			//TreeViewReload("IFM140T1.aspx" + GetAllParamStr());
			//window.location = "IFM140.aspx" + GetAllParamStr();
			var param = ReplaceParamStr(GetAllParamStr(), "nObject", document.all.lbReturnValue.options[1].value);
			TreeViewReload("IFM140T1.aspx" + param);
			//1100818	Joe		1100991		弱掃修正Client DOM XSS
			// window.location = "IFM140.aspx" + param;
			window.location = "IFM140.aspx" + encodeURI(param);
		}
		else 
		{
			//1070906 Justin [1070678]弱掃修正CookieHttpOnly
			//jf_SaveCookie("nObject",document.all.lbReturnValue.options[1].value);
			//TreeViewReload("IFM140T1.aspx" + GetAllParamStr());
			//window.location = "IFM140_1.aspx" + GetAllParamStr();
			var param = ReplaceParamStr(GetAllParamStr(), "nObject", document.all.lbReturnValue.options[1].value);
			TreeViewReload("IFM140T1.aspx" + param);
			//1100818	Joe		1100991		弱掃修正Client DOM XSS
			// window.location = "IFM140_1.aspx" + param;
			window.location = "IFM140_1.aspx" + encodeURI(param);
		}
	}
	if (argCallerId == "IFC030") 
	{
		var strRtnValue = document.all.lbReturnValue.options[0].value.split("|");
		document.all.txUserPrivilege.value  = strRtnValue[1];
		document.all.txPriv.value  = strRtnValue[1];
		document.all.txPrivIdentity.value	= strRtnValue[2];				
		//1091210	Joe		1090891		修改滲透測試，移除無用的路徑資訊
		// document.all.hPrivilegePath.value	= strRtnValue[2];	
	}
	if (argCallerId == "IFM110C1") 
	{		
		var strRtnValue = document.all.lbReturnValue.options[0].value.split("|");
		document.all.txVirtualDir.value    = strRtnValue[0];
		//1091210	Joe		1090891		修改滲透測試，移除無用的路徑資訊
		// document.all.hVirtualDirPath.value = strRtnValue[2];
	}
	//1050713	Joe	1050087	二代系統升級--E
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function fnHandleTextarea()
{
	if(event.keyCode==13)
		event.cancelBubble = true;
}

function IsnObjectOK()
{
	/*1070906 Justin [1070678]弱掃修正CookieHttpOnly
	if( jf_ReadCookie("nObject") == null || jf_ReadCookie("nObject") == "")
		return false;
	return true;*/
	return HasParamStr(GetAllParamStr(), "nObject");
}
function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].textContent = obj.value;
}
function fnChkSomething()
{
	//1131023     Jason       1130960 增加檢核儲存時鍵值欄位為空白--S
	if (jf_Trim(document.all.txApplicationNo.value) == "" )
	{
		alert("應用程式名稱不可空白!!");
		$('#' + txApplicationNo.id).focus();
		return false;
	}
	//1131023     Jason       1130960 增加檢核儲存時鍵值欄位為空白--E
	if(document.all.ddlApplicationType.value == 1)
	{
		if( jf_Trim(document.all.txFilename.value) == "" )
		{
			alert("檔案名稱不可空白!!");			
			//1050531	Joe	1050087	二代系統升級，調整focus寫法
			//document.all.txFilename.focus();
			$('#' + txFilename.id).focus();
			return false;
		}
		
		if( jf_Trim(document.all.txVirtualDir.value) == "" )
		{
			alert("虛擬目錄不可空白");		
			//1050531	Joe	1050087	二代系統升級，調整focus寫法
			//document.all.btVD_Set.focus();
			$('#' + btVD_Set.id).focus();
			return false;
		}
	}
	else if(document.all.ddlApplicationType.value == 2)
	{
		//若為'使用者端程式'時的必要項：帳號物件ID, 密碼物件ID, 確認鈕ID, 函式ID, 檔案名稱, 所屬系統
		if( jf_Trim(document.all.txFilename.value) == "" )
		{
			alert("檔案名稱不可空白!!");		
			//1050531	Joe	1050087	二代系統升級，調整focus寫法
			//document.all.txFilename.focus();
			$('#' + txFilename.id).focus();
			return false;
		}
		if( jf_Trim(document.all.ddlApplicationType.value) == "" )
		{
			alert("請選擇應用程式類型!!");		
			//1050531	Joe	1050087	二代系統升級，調整focus寫法
			//document.all.ddlApplicationType.focus();
			$('#' + ddlApplicationType.id).focus();
			return false;
		}
		if( jf_Trim(document.all.ddlAuditMode.value) == "" )
		{
			alert("請選擇是否執行紀錄檔!!");		
			//1050531	Joe	1050087	二代系統升級，調整focus寫法
			//document.all.ddlAuditMode.focus();
			$('#' + ddlAuditMode.id).focus();
			return false;
		}
	}
	if(jf_Trim(document.all.txDescription.value) != "")
	{
		if( jf_Trim(document.all.txDescription.value).length > 200 )
		{
			//1050531	Joe	1050087	二代系統升級，調整focus寫法
			//document.all.txDescription.focus();
			$('#' + txDescription.id).focus();
			alert("說明文字不可大於200字");
			return false;
		}
	}	
	if(jf_Trim(document.all.txSeq.value) != "")
	{
		if( isNaN(document.all.txSeq.value) == true)
		{
			//1050531	Joe	1050087	二代系統升級，調整focus寫法
			//document.all.txSeq.focus();
			$('#' + txSeq.id).focus();
			alert("排序號必須為數字");
			return false;
		}
	}
	return true;
}
function fnRefreshChildNodes()
{
	return parent.fnRefreshChildNodes();
}

function TreeViewReload(argPage)
{
	var i = argPage.indexOf("?");
	if(i != -1)
		//1100818	Joe		1100991		弱掃修正Client DOM XSS
		// parent.navbar.location = argPage;
		parent.navbar.location = encodeURI(argPage);
	else
		//1100818	Joe		1100991		弱掃修正Client DOM XSS
		// parent.navbar.location = argPage + GetAllParamStr();
		parent.navbar.location = encodeURI(argPage + GetAllParamStr());
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
//IFC030 權利共用視窗
function jf_ShowPrivilegeDialog(argParam, argOrgNo)
{
	var param = ReplaceParamStrForOrgNo(GetAllParamStr(), argOrgNo);
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
	//jf_SaveCookie("nSearch", argParam);

	//1050629	Joe		1050087		修改showModalDialog子視窗
	//var ret= fnOpen("IFC030.htm" + param,"560","450"); 
	//1050803	Joe		1050087		修正子視窗大小
	// jf_ShowModal("IFC030.htm" + param, "560", "450");
	//jf_ShowModal("IFC030.htm" + param, "800", "600");
	//1080816	Joe		1080628		新增開啟子視窗前轉碼
	// jf_ShowModal("IFC030.htm" + param + "&nSearch=" + argParam, "800", "600");
	//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
	//jf_ShowModal("IFC030.htm" + param + "&nSearch=" + encodeURIComponent(argParam), "800", "600");
	jf_ShowModal("IFC030.htm" + param + "&nSearch=" + encodeURIComponent(argParam));
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--E
	//return ret;
}

//IFM110C1 虛擬目錄共用視窗
function jf_ShowVirtualDirDialog(argParam, argOrgNo)
{
	var param = ReplaceParamStrForOrgNo(GetAllParamStr(), argOrgNo);
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
	//jf_SaveCookie("nSearch", argParam);
	//1050629	Joe		1050087		修改showModalDialog子視窗
	//var ret= fnOpen("IFM110C1.htm" + param,"490","420"); 
	//1050803	Joe		1050087		修正子視窗大小
	// jf_ShowModal("IFM110C1.htm" + param, "490", "420");
	//jf_ShowModal("IFM110C1.htm" + param, "800", "600");
	//1080816	Joe		1080628		新增開啟子視窗前轉碼
	// jf_ShowModal("IFM110C1.htm" + param + "&nSearch=" + argParam, "800", "600");
	//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
	//jf_ShowModal("IFM110C1.htm" + param + "&nSearch=" + encodeURIComponent(argParam), "800", "600");
	jf_ShowModal("IFM110C1.htm" + param + "&nSearch=" + encodeURIComponent(argParam));
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--E
	//return ret;
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
function GetElement(argStr,argIdx)
{
	var SPLIT="|";
	var ss =argStr.split(SPLIT);
   	return ss[argIdx];
}	

function ReplaceParamStrForOrgNo(argParamStr, argOrgNo)
{
	if(argParamStr == "")
		return "";
	if(typeof(argOrgNo) == "undefined" || argOrgNo == "")
		return argParamStr;

	var ret = "";
	var bStartWithQ = argParamStr.indexOf("?") == 0;
	if(bStartWithQ)
		argParamStr = argParamStr.replace("?", "");
	if(bStartWithQ)
		ret = "?";
		
	var bHasOrgNoParam = false;
	var arrPara = argParamStr.split("&");
	for(var i=0; i<arrPara.length; i++)
	{
		var arrOnePara = arrPara[i].split("=");
		if(arrOnePara[0].toUpperCase() == "nOrgNo".toUpperCase())
		{
			arrOnePara[1] = argOrgNo;
			bHasOrgNoParam = true;
		}
		if(i != 0)
			ret += "&";
		ret += arrOnePara[0] + "=" + arrOnePara[1];
	}
	if(bHasOrgNoParam == false)
		ret += "&nOrgNo=" + argOrgNo;
	return ret;
}

//1070906 Justin [1070678]弱掃修正CookieHttpOnly--S
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

function HasParamStr(argParamStr, argKey)
{
	if(argParamStr == "")
		return false;

	var bStartWithQ = argParamStr.indexOf("?") == 0;
	if(bStartWithQ)
		argParamStr = argParamStr.replace("?", "");

	var arrPara = argParamStr.split("&");
	for(var i=0; i<arrPara.length; i++)
	{
		var arrOnePara = arrPara[i].split("=");
		if(arrOnePara[0].toUpperCase() == argKey.toUpperCase())
		{
			if(arrOnePara[1] != "")
				return true;
		}
	}
	return false;
}
//1070906 Justin [1070678]弱掃修正CookieHttpOnly--E
//1050629	Joe		1050087		修改showModalDialog子視窗
/*
function fnOpen(arg,argW,argH)
{
	var sFeatures="dialogWidth: "+ argW + "px;dialogHeight:"+ argH+"px";
	var ret = window.showModalDialog(arg, "", sFeatures);
	return ret;
}
*/

//1140417　Levi　1131224 新增操作手冊功能--S    

//檔案格式檢驗
function CheckAllowAtt(argFilename) {
	var blAllow = false;
	var arrAllowAtt = document.querySelector("#H_AllowAtt").value.split(";");
	
	var File = argFilename.split('.').pop().toUpperCase();
	
	if (arrAllowAtt.includes(File)) {
		blAllow = true;
	}

	return blAllow;
}



// 按鈕綁定事件
for (let i = 1; i < document.querySelectorAll("#dgManual tr").length; i++) {
	// 綁定「新增」按鈕事件
	document.getElementById("dgManual__ctl" + (i + 1) + "_btAddFile").addEventListener("click", function () {
		Page_BlockSubmit = true;
		setUpdateRow(this);
		document.getElementById("dgManual__ctl" + (i + 1) + "_fileInput").click();
	});

	// 綁定「刪除」按鈕事件
	document.getElementById("dgManual__ctl" + (i + 1) + "_btDelFile").addEventListener("click", function () {
		Page_BlockSubmit = true;
		setUpdateRow(this);
		fnDeleteAttachItem();
	});

	// 綁定「下載」按鈕事件
	document.getElementById("dgManual__ctl" + (i + 1) + "_btOpenFile").addEventListener("click", function () {
		Page_BlockSubmit = true;
		setUpdateRow(this);
		fnFileDownload();
	});
}


// 按鈕所對應的資料列
var selectedUpdateRow = null;

function setUpdateRow(btn) {
	selectedUpdateRow = btn.closest("tr"); 
}


var WaitUpLoadFiles = [];
function fnAddFile() {
	if (!document.all.dgManual)
		return;
	
	var strSrcFileName = "";
	var fileInput = selectedUpdateRow.querySelector('input[type="file"][id$="fileInput"]');
	var currentFile = fileInput.files[0];
	var strFileName = currentFile.name;
	//1141223   Andy    1141162     新增檔案大小檢核
	var nFileSize = currentFile.size;
	var strSizeErr = "";

	//檔名格式驗證
	if (!CheckAllowAtt(strFileName)) {
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["上傳之檔案並非系統設定格式，無法加入。"])), "");
		fileInput.value = "";
		selectedUpdateRow.querySelector('input[type="submit"][id$="btAddFile"]').focus();
		return;
	}

	//1141223   Andy    1141162     新增檔案大小檢核
	if (nFileSize != 0)
		nFileSize = Math.ceil(nFileSize / 1024);
	var nFileSizeLimit = (document.all["TB_FILE_SIZE_LIMIT"].value == "") ? 0 : parseInt(document.all["TB_FILE_SIZE_LIMIT"].value, 10);
	if (nFileSizeLimit < nFileSize) {
		strSizeErr += strFileName + "(檔案大小" + nFileSize + "KB)";
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strSizeErr + "，已超過檔案大小上限[" + nFileSizeLimit + "KB]\n故無法選擇此檔。"])), "");
		return;
	}

	//Sever儲存區檔案是否重複驗證
	var rtnBool = IF1.IFM140.CheckFileExists(strFileName);
	if (rtnBool.value) {
		jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["檔案儲存區已有相同檔名之檔案存在，無法加入。"])), "");
		fileInput.value = "";
		selectedUpdateRow.querySelector('input[type="submit"][id$="btAddFile"]').focus();
		return;
	}

	//DG上傳區檔案是否重複驗證
	for (var i = 1; i < document.querySelectorAll("#dgManual tr").length; i++) {
		//原先已有之附件
		if (document.getElementById("dgManual__ctl" + (i + 1) + "_lbFileName"))
			strSrcFileName = document.getElementById("dgManual__ctl" + (i + 1) + "_lbFileName").textContent;
		else
			strSrcFileName = document.querySelectorAll('#dgManual tr td:nth-child(2) [id$="_lbFileName"]')[(i - 1)].textContent;

		if (strFileName == strSrcFileName) {
			jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["檔案上傳區已有相同檔名之檔案存在，無法加入。"])), "");
			fileInput.value = "";
			selectedUpdateRow.querySelector('input[type="submit"][id$="btAddFile"]').focus();
			return;
		}


		
	}

	fnAddAttach(strFileName);
	WaitUpLoadFiles.push(strFileName);
}

//新增加入附件
function fnAddAttach(argFileName) {

	var ManualName = selectedUpdateRow.querySelector('[id$="_txManual"]');
	var spanFileName = selectedUpdateRow.querySelector('[id$="_lbFileName"]');
	var thisbtAddFile = selectedUpdateRow.querySelector('input[type="submit"][id$="btAddFile"]');
	var thisbtDelFile = selectedUpdateRow.querySelector('input[type="submit"][id$="btDelFile"]');
	var thisbtOpenFile = selectedUpdateRow.querySelector('input[type="submit"][id$="btOpenFile"]');


	spanFileName.textContent = argFileName;





	thisbtAddFile.className = "hide";
	thisbtDelFile.className = "visible";
	thisbtOpenFile.className = "visible";

	ManualName.value = "";
	ManualName.focus();
}






function fnDeleteAttachItem() {

	//Page_BlockSubmit = true;
	//先刪除資料

	var strDelFileName = "";
	var ManualName = selectedUpdateRow.querySelector('[id$="_txManual"]');
	var spanFileName = selectedUpdateRow.querySelector('[id$="_lbFileName"]');
	var thisbtAddFile = selectedUpdateRow.querySelector('input[type="submit"][id$="btAddFile"]');
	var thisbtDelFile = selectedUpdateRow.querySelector('input[type="submit"][id$="btDelFile"]');
	var thisbtOpenFile = selectedUpdateRow.querySelector('input[type="submit"][id$="btOpenFile"]');
	var fileInput = selectedUpdateRow.querySelector('input[type="file"][id$="fileInput"]');

	strDelFileName = spanFileName.textContent.trim();
	
	if (document.getElementById("H_FileDel").value != "")
		document.getElementById("H_FileDel").value += "|" + strDelFileName;
	else
		document.getElementById("H_FileDel").value += strDelFileName;


	spanFileName.textContent = "";
	
	thisbtAddFile.className = "visible";
	thisbtDelFile.className = "hide";
	thisbtOpenFile.className = "hide";

	if (WaitUpLoadFiles.includes(strDelFileName)) {
		var index = WaitUpLoadFiles.indexOf(strDelFileName);
		WaitUpLoadFiles.splice(index, 1);
	}

	ManualName.value = "";
	fileInput.value = "";
}




function base64EncodeUnicode(str) {
	return btoa(unescape(encodeURIComponent(str)));
}


function fnFileDownload() {
	
	var strFileIOWS = document.getElementById("H_WebService").value;
	var strFilePath = document.getElementById("H_StartPath").value;
	var strArtifact = document.getElementById("H_Artifact").value;
	var strFileName = selectedUpdateRow.querySelector('[id$="_lbFileName"]').textContent;
	var fileInput = selectedUpdateRow.querySelector('input[type="file"][id$="fileInput"]').files[0];
	var url = "/odtools/docatt.ashx?DocNo=IFM140&SAMLart=" + strArtifact + "&FileIOWS=" + strFileIOWS + "&FilePath=" + base64EncodeUnicode(strFilePath) + "&FileName=" + base64EncodeUnicode(strFileName) ;
	

	if (fileInput) {
		var fileURL = URL.createObjectURL(fileInput);
		window.open(fileURL);
	}
	else {
		window.open(url);
    }
	
}


function BeforeSav() {

	document.getElementById("H_UpLoad").value = "";
	document.getElementById("H_FileName").value = "";
	document.getElementById("H_ManaulName").value = "";


	document.getElementById("H_UpLoad").value = WaitUpLoadFiles.join("|");

	var IsFirst = true
		
	for (var i = 1; i < document.querySelectorAll("#dgManual tr").length; i++) {
		if (document.getElementById("dgManual__ctl" + (i + 1) + "_lbFileName").textContent == "")
			continue;

		if (IsFirst) {
			document.getElementById("H_FileName").value += document.getElementById("dgManual__ctl" + (i + 1) + "_lbFileName").textContent;
			document.getElementById("H_ManaulName").value += document.getElementById("dgManual__ctl" + (i + 1) + "_txManual").value;
			IsFirst = false;
		}

		else {
			document.getElementById("H_FileName").value += "|" + document.getElementById("dgManual__ctl" + (i + 1) + "_lbFileName").textContent;
			document.getElementById("H_ManaulName").value += "|" + document.getElementById("dgManual__ctl" + (i + 1) + "_txManual").value;
		}

	}
	    
}


var keepManaulName = "";
var keepFileName = "";
var keepFileDel = "";
var keepArtifact = "";
var keepWebService = "";
var keepStartPath = "";
var keepAllowAtt = ""


function keephidden() {
	keepManaulName = document.querySelector("#H_ManaulName").value;
	keepFileName = document.querySelector("#H_FileName").value;
	keepFileDel = document.querySelector("#H_FileDel").value;
	keepArtifact = document.querySelector("#H_Artifact").value;
	keepWebService = document.querySelector("#H_WebService").value;
	keepStartPath = document.querySelector("#H_StartPath").value;
	keepAllowAtt = document.querySelector("#H_AllowAtt").value;
}

function sethidden() {
	document.querySelector("#H_ManaulName").value = keepManaulName;
	document.querySelector("#H_FileName").value = keepFileName;
	document.querySelector("#H_FileDel").value = keepFileDel;
	document.querySelector("#H_Artifact").value = keepArtifact
	document.querySelector("#H_WebService").value = keepWebService
	document.querySelector("#H_StartPath").value = keepStartPath
	document.querySelector("#H_AllowAtt").value = keepAllowAtt
}


//1140417　Levi　1131224 新增操作手冊功能--E