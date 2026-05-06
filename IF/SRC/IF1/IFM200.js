/*
DATE	SA		PRG		MSG_NO		DESC
1050614	Kevin	Kevin_C	1050087		升級二代公文系統
1051019	Leslie	Joe		1050087		二代修改配合行動平台
1070904 Kevin	Justin	1070678		弱掃修正CookieHttpOnly
1080816 Kevin	Joe		1080628		修正開啟子視窗前需進行編碼
1150206	Zen		Andy	序63		修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050614	Kevin_C	1050087		升級二代公文系統
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
	//1050614	Kevin_C	1050087		升級二代公文系統
	//if (document.all["ValidationSummary1"].innerText != "")
	//	alert(document.all["ValidationSummary1"].innerText);
	jf_ShowValidator();	
}
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
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
//1050614	Kevin_C	1050087		升級二代公文系統
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
	
	//1050614	Kevin_C	1050087		升級二代公文系統
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName= event.target.id;

	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = !jf_CheckKeyObject();
			//1050614	Kevin_C	1050087		升級二代公文系統
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSave":
			if(ConfirmSave())//是否通過儲存前必要檢查
			{
				IsServerHandling = true;
				jf_ShowWaitState();	
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			//1050614	Kevin_C	1050087		升級二代公文系統
			//jf_ToolBarSubmit();	
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btDelete":
			Page_BlockSubmit = !jf_ConfirmDelete();
			//1050614	Kevin_C	1050087		升級二代公文系統
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btCancel":
			Page_BlockSubmit = !jf_ConfirmCancel();
			//1050614	Kevin_C	1050087		升級二代公文系統
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btClean":
			Page_BlockSubmit = true;
			document.all["txPrivNo"].value = "";
			document.all["txPrivName"].value = "";
			//1050614	Kevin_C	1050087		升級二代公文系統
			//document.all["txPrivNo"].focus();
			$('#txPrivNo').focus()
			break;
		case "btSearch":
			var filter = document.all.txPrivNo.value;
			//1050614	Kevin_C	1050087		升級二代公文系統，不再使用showModalDialog -S
			//var ret = jf_ShowPrivilegeDialog(filter, document.all["dlOrg"].value);
			//if(ret!=null)
			//{
			//	//回傳格式=代碼,名稱,DN
			//	document.all.txPrivNo.value=GetElement(ret,0);
			//	Page_BlockSubmit = false;
			//	jf_OpenButtonSubmit();
			//}
			Page_BlockSubmit = true;
			jf_ShowPrivilegeDialog(filter, document.all["dlOrg"].value);
			//1050614	Kevin_C	1050087		升級二代公文系統，不再使用showModalDialog -E
			break;			
			
		case "btRevSearch":
			Page_BlockSubmit = false;
			//1050614	Kevin_C	1050087		升級二代公文系統
			//jf_ToolBarSubmit();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}
//IIC030 權利共用視窗
function jf_ShowPrivilegeDialog(argParam, argOrgNo)
{
	var param = ReplaceParamStrForOrgNo(GetAllParamStr(), argOrgNo);
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
	//jf_SaveCookie("nSearch",argParam);
	//1050614	Kevin_C	1050087		升級二代公文系統，不再使用showModalDialog -S
	//var ret= fnOpen("IFC030.htm" + param,"560","450"); //回傳值：CN, displayName, Path
	//return ret;
	//jf_ShowModal("IFC030.htm"+param, "560","450");
	//1080816	Joe		1080628		新增開啟子視窗前轉碼
	// jf_ShowModal("IFC030.htm" + param + "&nSearch=" + argParam, "560","450");
	//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
	//jf_ShowModal("IFC030.htm" + param + "&nSearch=" + encodeURIComponent(argParam), "560","450");
	jf_ShowModal("IFC030.htm" + param + "&nSearch=" + encodeURIComponent(argParam));
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--E
	//1050614	Kevin_C	1050087		升級二代公文系統，不再使用showModalDialog -E
}
//1050614	Kevin_C	1050087		升級二代公文系統，不再使用showModalDialog -S
//function fnOpen(arg,argW,argH)
//{
//   var sFeatures="dialogWidth: "+ argW + "px;dialogHeight:"+ argH+"px";
//   var ret = window.showModalDialog(arg, "", sFeatures);
//   return ret;
//}
//1050614	Kevin_C	1050087		升級二代公文系統，不再使用showModalDialog -E
function jf_SaveCookie(argCookieName, argValue)
{
	document.cookie = argCookieName + '=' + escape(argValue) + ';path=/';
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
var SPLIT		= '|';
function GetElement(argStr,argIdx)
{
	var ss =argStr.split(SPLIT);
   	return ss[argIdx];
}




function jf_DropDownListOnClick(argTextBoxId,argDDLId,argLabelId)
{
	var index	= document.all[argDDLId].selectedIndex;
	var obj		= document.all[argDDLId].options[index];
	
	document.all[argTextBoxId].value = obj.text;
	//1050614	Kevin_C	1050087		升級二代公文系統
	//document.all[argLabelId].innerText = obj.value;
	document.all[argLabelId].textContent = obj.value;
}

//儲存前檢查
function ConfirmSave()
{
	var bRtnbool = false;
	if(jf_CheckKeyObject())//檢查key值是否輸入
	{		
			// 新增模式需檢查鍵值是否已存在
			if (jf_GetActionMode()==LayoutModeNew)
			{
				if(jf_CheckDataExist(""))//檢查鍵值是否已存在
				{
					if (window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
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
/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
	//1050628	Joe		1050087		修改showmodaldialog開啟視窗
	if (argCallerId == "IFC030") {
		if (document.all["lbReturnValue"].options) {
			var ret = jf_Trim(document.all.lbReturnValue.options[0].value);
			if(ret!="")
			{
				//回傳格式=代碼,名稱,DN
				document.all.txPrivNo.value=GetElement(ret,0);
				if(jf_CheckKeyObject())
				{
					Page_BlockSubmit = false;
					jf_OpenButtonSubmit();
				}
			}
		}
	}
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

