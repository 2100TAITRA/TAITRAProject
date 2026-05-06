/*	DATE 	SA			PRG			MGR_NO	DESC
 *	1050602	Kevin		Joe 		1050087	二代公文修改
 *	1050803	Kevin		Joe 		1050087	修改子視窗大小
 *	1051019	Leslie		Joe			1050087	二代修改配合行動平台
 *	1070906 Kevin		Justin		1070678	弱掃修正CookieHttpOnly
 *	1080816 Kevin		Joe			1080628	修正開啟子視窗前需進行編碼
 *  1100818	Kevin		Joe  		1100991	弱掃修正Client DOM XSS
 *  1131023 Joe         Jason       1130960 增加檢核儲存時鍵值欄位為空白
 *  1150206	Zen			Andy		序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
 */
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050602 Joe 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
document.all.txDescription.onkeydown = fnHandleTextarea;

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
	
	switch (xObjectName)
	{
		case "btPriv_Set":
			Page_BlockSubmit=true;
			//1050713	Joe		1050087		修改showModalDialog子視窗
			//var ret = jf_ShowPrivilegeDialog("");
			jf_ShowPrivilegeDialog("");
			//回傳值：CN, displayName, Path
			
			//1050713	Joe		1050087		修改showModalDialog子視窗--S
			// if( ret != null && ret != "" )
			// {
				// document.all["txPrivilege2"].value   = GetElement(ret, 1);
				// document.all.hPrivilegePath.value = GetElement(ret, 2);
				// document.all["txPrivilege"].text =document.all["txPrivilege2"].value;
			// }
			//1050713	Joe		1050087		修改showModalDialog子視窗--E
			break;
		case "btPriv_Del":
			Page_BlockSubmit=true;
			document.all["txPrivilege2"].value   ="";
			document.all.hPrivilegePath.value = "";
			document.all["txPrivilege"].text ="";
			break;
	}	
}

//1050602 Joe 1050087 二代公文修改，傳入參數event
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
	
	//1050602 Joe 1050087 二代公文修改
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
			/*
			if(typeof(ret) != "string" || ret == "") return;

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
			if( Page_BlockSubmit = !jf_CheckKeyObject()) return;

			document.all.hFlag.value='save';
			//1050602 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;

		case "btDelete":
			if( Page_BlockSubmit = !IsnObjectOK() ) return;

			Page_BlockSubmit = !jf_ConfirmDelete();
			//1050602 Joe 1050087 二代公文修改
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;

		case "btClean":
			Page_BlockSubmit = true;
			var ret = jf_ConfirmClean(true);
			if(ret)
			{
				document.all.hPrivilegePath.value = "";
				//1070906 Justin [1070678]弱掃修正CookieHttpOnly
				//jf_SaveCookie("nObject", "");
			}
			break;
	}
}

function CallBack(argCallerId)
{
	if (argCallerId == "IFM140C1") {
		if (document.all.lbReturnValue.options[0].value == "AP_SCHEMA") {
			//1070906 Justin [1070678]弱掃修正CookieHttpOnly
			//jf_SaveCookie("nObject", document.all.lbReturnValue.options[1].value);
			//TreeViewReload("IFM140T1.aspx" + GetAllParamStr());
			//window.location = "IFM140.aspx" + GetAllParamStr();
			var param = ReplaceParamStr(GetAllParamStr(), "nObject", document.all.lbReturnValue.options[1].value);
			TreeViewReload("IFM140T1.aspx" + param);
			//1100818	Joe		1100991		弱掃修正Client DOM XSS
			// window.location = "IFM140.aspx" + param;
			window.location = "IFM140.aspx" + encodeURI(param);
		}
		else {
			//1070906 Justin [1070678]弱掃修正CookieHttpOnly
			//jf_SaveCookie("nObject", document.all.lbReturnValue.options[1].value);
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
		document.all["txPrivilege2"].value  = strRtnValue[1];
		document.all.hPrivilegePath.value 	= strRtnValue[2];		
		document.all["txPrivilege"].text =document.all["txPrivilege2"].value;
	}
}

function ClientOnLoad()
{
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

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}


function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	document.all[argLabelId].textContent = obj.value;
}

function IsnObjectOK()
{
	/*1070906 Justin [1070678]弱掃修正CookieHttpOnly
	if( jf_ReadCookie("nObject") == null || jf_ReadCookie("nObject") == "")
		return false;
	return true;*/
	return HasParamStr(GetAllParamStr(), "nObject");
}

function fnHandleTextarea()
{
	if(event.keyCode==13)
		event.cancelBubble = true;
}

function jf_MenuInit(){}

function fnRefreshChildNodes()
{
	return parent.fnRefreshChildNodes();
}
function jf_ShowPrivilegeDialog(argParam, argOrgNo)
{
	var argOrgNo="";
	var param = ReplaceParamStrForOrgNo(GetAllParamStr(), argOrgNo);
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
	//jf_SaveCookie("nSearch",argParam);
	//1050713	Joe		1050087		修改showModalDialog子視窗
	//var ret= fnOpen("IFC030.htm" + param,"560","450"); //回傳值：CN, displayName, Path
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
//1050713	Joe		1050087		修改showModalDialog子視窗--S
// function fnOpen(arg,argW,argH)
// {
   // var sFeatures="dialogWidth: "+ argW + "px;dialogHeight:"+ argH+"px";
   // var ret = window.showModalDialog(arg, "", sFeatures);
   // return ret;
// }
//1050713	Joe		1050087		修改showModalDialog子視窗--E
function jf_CheckKeyObject()
{
	//1131023     Jason       1130960 增加檢核儲存時鍵值欄位為空白--S
	if (jf_Trim(document.all.txApplicationSetNo.value) == "") {
		alert("程式集名稱不可空白!!");
		$('#' + txApplicationSetNo.id).focus();
		return false;
	}
	//1131023     Jason       1130960 增加檢核儲存時鍵值欄位為空白--E
	if(jf_Trim(document.all.txDescription.value) != "")
	{
		if( jf_Trim(document.all.txDescription.value).length > 200 )
		{
			//1050602	Joe	1050087	二代系統升級，調整focus寫法
			//document.all.txDescription.focus();
			$('#' + txDescription.id).focus();
			alert("說明文字不可大於200字");
			return false;
		}
		return true;
	}
	return true;	
}