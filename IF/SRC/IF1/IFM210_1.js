/*
DATE		單號       SA		PRG		DESC
1010216		1010140    Leslie	Cloud   修正檢核帳號時不該比對大小寫的BUG 
1040210		1030931	   Kevin	Kenny	開啟IFC020前增加寫入Cookie資訊
1040311		1030931	   Kevin	Kenny	開啟IFC020前增加寫入Cookie單位代碼資訊
1040408		1030930	   Kevin	Kenny	增加Client 端檢核單位管理人增加之帳號是否屬於其管理範圍
1040409		1030930	   Kevin	Kenny	增加非VGH機關Client 端檢核單位管理人增加之帳號是否屬於其管理範圍
1040504		1040296    Kevin	Kenny	增加判斷是否為一級單位管理員，避免檢核後無法新增二級單位角色人員
1041022		1040882    Kevin	Kenny	系統管理員不檢核機關代碼，避免多機關架構下新增子機關角色時出現不屬於管理單位錯誤訊息
1050722		1050087    Kevin	Kevin_C	升二代
1050815		1050700	   Kevin	Justin	弱掃Client Potential Code Injection修正
1051019		1050087    Leslie	Joe		二代修改配合行動平台
1051108		1051150    Kevin	Kenny   修改弱掃Client Potential Code Injection
1070830		1070678	   Kevin	Joe		配合內政部IIS環境設定改為使用AjaxPro
1070906		1070678	   Kevin	Justin	弱掃修正CookieHttpOnly
1080816		1080628	   Kevin	Joe		修正開啟子視窗前需進行編碼
1091228		1090945	   Joe		Joe		新增重複帳號檢核
1100818		1100991	   Kevin	Joe  	弱掃修正Client DOM XSS
1130726		序154	   Zen		Zen		修正開啟帳號設定子視窗太小之問題
1150206		序63	   Zen		Andy	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
*/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050722	1050087	Kevin	Kevin_C	升二代
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;
//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro--S
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
//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro--E

function ShowMsg()
{
	//1050722	1050087	Kevin	Kevin_C	升二代
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
	
	Page_BlockSubmit=true;
	
	switch (xObjectName)
	{
		
		case "btDeployPrivilege":
			//1070906 Justin [1070678]弱掃修正CookieHttpOnly--S
			//jf_SaveCookie("nObject",document.all.nObject.value);
			//jf_SaveCookie("nOrgNo" , document.all["txActiveOrgNo"].value);
			//jf_ShowModal("IFM210C2.htm" + GetAllParamStr(), "480","500");
			var param = ReplaceParamStr(GetAllParamStr(), "nObject", document.all.nObject.value);
			param = ReplaceParamStr(param, "nOrgNo", document.all["txActiveOrgNo"].value);
			//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
			//jf_ShowModal("IFM210C2.htm" + param, "480", "500");
			jf_ShowModal("IFM210C2.htm" + param);
		break;
		case "btEnvSetting":
			//jf_SaveCookie("nObject",document.all.nObject.value);
			//jf_SaveCookie("nOrgNo" , document.all["txActiveOrgNo"].value);
			//jf_ShowModal("IFM210C3.htm" + GetAllParamStr(), "680","500");
			var param = ReplaceParamStr(GetAllParamStr(), "nObject", document.all.nObject.value);
			param = ReplaceParamStr(param, "nOrgNo", document.all["txActiveOrgNo"].value);
			//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
			//jf_ShowModal("IFM210C3.htm" + param, "680","500");
			jf_ShowModal("IFM210C3.htm" + param);
			//1070906 Justin [1070678]弱掃修正CookieHttpOnly--E
  		    break;
				
		
	}	
	//1050722	1050087	Kevin	Kevin_C	升二代，IF專案裡面沒有bt210C1，此段程序不會執行 -S
	//if (xObjectName.indexOf("bt210C1") > 0)
	//{
	//	Page_BlockSubmit = true;
		
	//	//1040210	Kenny	[1030931]	開啟IFC020前增加寫入Cookie資訊
	//	//1040213	Kenny	[1030931]	修正傳入資料
	//	//jf_SaveCookie("PrivType", "3");
	//	jf_SaveCookie("PrivType", document.all.PrivType.value);
	//	//1040311	Kenny	[1030931]	開啟IFC020前增加寫入Cookie單位代碼資訊
	//	jf_SaveCookie("DeptNo", document.all.DeptNo.value);	
		
	//	fnOpen("IFC020.htm" + GetAllParamStr(),"650","450");
	//}
	//1050722	1050087	Kevin	Kevin_C	升二代，IF專案裡面沒有bt210C1，此段程序不會執行 -E
}

//1050722	1050087	Kevin	Kevin_C	升二代
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
	
	//1050722	1050087	Kevin	Kevin_C	升二代
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName=  event.target.id;
	
	switch (xObjectName)
	{
		case "btOpen":
			Page_BlockSubmit = true;
			//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
			//var ret = jf_ShowModal("IFM210C1.htm" + GetAllParamStr(), "380", "460");
			var ret = jf_ShowModal("IFM210C1.htm" + GetAllParamStr());
			ProcessCreate(ret);
			break;
		case "btSave":
			Page_BlockSubmit = false;
			if(jf_Trim(document.all.txRoleNo.value)=="")
			{
				Page_BlockSubmit=true;
				alert("角色代碼不可空白");
				//1050722	1050087	Kevin	Kevin_C	升二代
				//document.all.txRoleNo.focus();			
				$('#txRoleNo').focus();
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
			jf_ConfirmClean();
			break;
		case "btSearch":
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
	//1050722	1050087	Kevin	Kevin_C	升二代
	//jf_ToolBarSubmit();
	jf_ToolBarSubmit(xObjectName);
}

function CallBack(argCallerId)
{
	//1050722	1050087	Kevin	Kevin_C	升二代 -S
	if(argCallerId == "IFC020")
	{
		if(strId1 != "" && strId2 != "")
		{
			//1091228	Joe		1090945		新增重複帳號檢核--S
			var argAccout = GetElement(document.all.lbReturnValue.options[0].value,0);
			if(argAccout != ""){
				for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++){
					if (document.all["dg1__ctl" + iRow + "_txAccount"].value == argAccout){
						alert("序" + document.all["dg1__ctl" + iRow + "_lbSeq"].innerText + "已有帳號" + argAccout + "，不可重複輸入。");
						return;
					}
				}
				document.all[strId1].value=GetElement(document.all.lbReturnValue.options[0].value,1);
				document.all[strId2].value=GetElement(document.all.lbReturnValue.options[0].value,2);
				document.all[strId1].previousSibling.previousSibling.value = GetElement(document.all.lbReturnValue.options[0].value,0);
			//1091228	Joe		1090945		新增重複帳號檢核--E
			}
		}
	}
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
	//1050722	1050087	Kevin	Kevin_C	升二代 -E
}


function ClientOnLoad()
{
	//var sAuthws = document.all.authWS.value;
	//fnCallW(sAuthws, "GetAccountName", null);
	//ShowMsg();
	
	if(document.all.nReload!=null)
		//1100818	Joe		1100991		弱掃修正Client DOM XSS
		// parent.navbar.location = parent.navbar.location;
		parent.navbar.location = encodeURI(parent.navbar.location);
	if(document.all.nLoadOrgPage!=null)
		//1100818	Joe		1100991		弱掃修正Client DOM XSS
		// document.location = document.location;
		document.location = encodeURI(document.location);
	if(document.all["UnitSchemaStr"])
		UNIT_SCHEMA = UnitSchemaStr;
}

function OnWSResult(argResult)
{
    if(jf_IsWebServiceSuccess(argResult))
    {
    }
}

//1050722	1050087	Kevin	Kevin_C	升二代 -S
//function fnOpen(arg,argW,argH)
//{
//   var sFeatures="dialogWidth: "+ argW + "px;dialogHeight:"+ argH+"px";
//   var ret = window.showModalDialog(arg, "", sFeatures);
//   return ret;
//}
//1050722	1050087	Kevin	Kevin_C	升二代 -E
function jf_DeleteOccupant(argTextBoxId,argIdx,argNameTextBoxId,argUserId)
{
	
	document.all[argTextBoxId].value="";
	document.all[argNameTextBoxId].value="";
	document.all[argUserId].value="";
}
//1050722	1050087	Kevin	Kevin_C	升二代
var strId1="";var strId2="";
function jf_SetOccupant(argTextBoxId1,argTextBoxId2)
{
	var selectType = "'Account'";
//	var ret = jf_ShowOrgDialogByLevel("0", selectType);
//	var ret = jf_ShowOrgDialogForPerson("0");
	//1050722	1050087	Kevin	Kevin_C	升二代 -S
	//var ret = jf_ShowPersonDialog("");
	//if(ret!=null)
	//{
	//	//回傳格式=代碼,名稱,DN
	//	//document.all.lbRoleOccupant.options[argIdx].value=GetElement(ret,2);
	//	//document.all.lbRoleOccupant.options[argIdx].text=GetElement(ret,2);
	//	document.all[argTextBoxId1].value=GetElement(ret,1);
	//	document.all[argTextBoxId2].value=GetElement(ret,2);
	//	document.all[argTextBoxId1].previousSibling.previousSibling.value = GetElement(ret,0);
	//}	
	strId1 = argTextBoxId1;
	strId2 = argTextBoxId2;
	jf_ShowPersonDialog("");
	//1050722	1050087	Kevin	Kevin_C	升二代 -E
}


function ProcessCreate(ret)
{
	if(ret==null)
		return;
	var strNewObject = GetElement(ret,5);
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

function CallGetAccountName(argEventObj)
{
	//1050815 Justin 1050700 弱掃Client Potential Code Injection修正
	//var sArt = document.all.SsoArtifact.value;
	var sArt = encodeURI(document.all.SsoArtifact.value);
    //1051108   Kenny   [1051150]   修改Client Potential Code Injection
	//var sAuthws = document.all.authWS.value;
    var sAuthws = encodeURI(document.all.authWS.value);

	if(sArt == "" || sAuthws == "" || jf_Trim(argEventObj.value) == "")
		return;

	var param = new Array(2);
	param[0] = sArt;
	param[1] = argEventObj.value;
	var result = fnCallW(sAuthws, "GetAccountName", param);
	
	if(result.error == false)
	{
		argEventObj.nextSibling.nextSibling.value = result.value;
	}
	else
		alert(result.errorDetail.string);
}

var temp = 2;
//填完帳號後直接按下ToolBar時的處理
function CheckAccount(argTemp)
{
	var pNo = argTemp;
	var txAccount;
	var txAccountName;
	
	//取得確實onblur的是哪個TextBox
	if (document.all["dg1__ctl"+pNo+"_txAccount"] != null)
		txAccount = document.all["dg1__ctl" + pNo + "_txAccount"];
		
	//取得接onblur回傳值的是哪個TextBox
	if (document.all["dg1__ctl"+pNo+"_txAccount"] != null)
		txAccountName = document.all["dg1__ctl" + pNo + "_txAccountName"];
		
	if(!txAccount || !txAccountName)
		return false;
	
	var strAccountId = jf_Trim(txAccount.value);
	
	if (strAccountId == "")
	{
		txAccountName.value = "";
		return true;
	}
	
	var argWSParam = new Array(1);
	argWSParam[0] = strAccountId;
	var CallWsObj = fnCallW(strIIWSUrl, "GetAccountName", argWSParam);

	if(!CallWsObj.error && CallWsObj.value && CallWsObj.value != "")
	{
		txAccountName.value = jf_Trim(CallWsObj.value);
		return true;
	}
	else
	{
		txAccountName.value = "";
		return false;
	}
}

//2006.11.24 Stella 增加修改功能鍵可開啟IIM300
function jf_OpenModifyAccWin(argTextBoxId)
{
	var strAccount = jf_Trim(document.all[argTextBoxId].value);
	if(strAccount == "")
		return;
	var strUrl = "IFM300.aspx"+GetAllParamStr()+"&nMode=2&Acc="+strAccount;
	var strWinStyle = "fullscreen=no,menubar=no,titlebar=no,toolbar=no,resizable=yes,status=yes";
	jf_OpenChildWin(strUrl,"IFM300","800","600");
}
function jf_ShowPersonDialog(argParam, argOrgNo)
{
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--S
	//jf_SaveCookie("nSearch",argParam);
	var param = ReplaceParamStrForOrgNo(GetAllParamStr(), argOrgNo);
	//1040210	Kenny	[1030931]	開啟IFC020前增加寫入Cookie資訊
	//1040213	Kenny	[1030931]	修正傳入資料
	//jf_SaveCookie("PrivType", "3");
	//jf_SaveCookie("PrivType", document.all.PrivType.value);	
	//1040311	Kenny	[1030931]	開啟IFC020前增加寫入Cookie單位代碼資訊
	//jf_SaveCookie("DeptNo", document.all.DeptNo.value);	
	
	//1050722	1050087	Kevin	Kevin_C	升二代
	//var ret= fnOpen("IFC020.htm" + param,"480","370"); //回傳值：CN, displayName, Path
	//jf_ShowModal("IFC020.htm" + param,"480","370")
	//1080816	Joe		1080628		新增開啟子視窗前轉碼
	// jf_ShowModal("IFC020.htm" + param + "&nSearch=" + argParam + "&PrivType=" + document.all.PrivType.value + "&DeptNo=" + document.all.DeptNo.value, "800", "600");
	//1130726 Zen 1130006 修正來文附件不含頁面時開啟電子檔錯誤之問題
	//jf_ShowModal("IFC020.htm" + param + "&nSearch=" + encodeURIComponent(argParam) + "&PrivType=" + document.all.PrivType.value + "&DeptNo=" + document.all.DeptNo.value, "800", "600");
	//1150206	Andy	序63	修正IF系列開啟的子視窗在較大的縮放比例下可能會無法完整顯示的問題
	//jf_ShowModal("IFC020.htm" + param + "&nSearch=" + encodeURIComponent(argParam) + "&PrivType=" + document.all.PrivType.value + "&DeptNo=" + document.all.DeptNo.value, "1024", "768");
	jf_ShowModal("IFC020.htm" + param + "&nSearch=" + encodeURIComponent(argParam) + "&PrivType=" + document.all.PrivType.value + "&DeptNo=" + document.all.DeptNo.value);
	//1070904 Justin [1070678]弱掃修正CookieHttpOnly--E
	//1050722	1050087	Kevin	Kevin_C	升二代
	//return ret;
}
function GetElement(argStr,argIdx)
{
	var SPLIT = "|";
	var ss =argStr.split(SPLIT);
   	return ss[argIdx];
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
//1050722	1050087	Kevin	Kevin_C	升二代，沒用的CODE -S
// function jf_ShowOrgDialogByLevel(argParam, argSelectType, argOrgNo)
// {
	// var sSelectType = "";
	// for(var i=0; i<argSelectType.length; i++)
	// {
		// if(i != 0)
			// sSelectType += ",";
		// sSelectType += "'" + argSelectType[i] + "'";
	// }
	// jf_SaveCookie("iic021StrctureType"	, argParam);
	// jf_SaveCookie("iic021SelectType"	, sSelectType);
	// if(argOrgNo)
		// jf_SaveCookie("iic021OrgNo"	, argOrgNo);
		
	////1040210	Kenny	[1030931]	開啟IFC020前增加寫入Cookie資訊
	////1040213	Kenny	[1030931]	修正傳入資料
	////jf_SaveCookie("PrivType", "3");
	// jf_SaveCookie("PrivType", document.all.PrivType.value);
	////1040311	Kenny	[1030931]	開啟IFC020前增加寫入Cookie單位代碼資訊
	// jf_SaveCookie("DeptNo", document.all.DeptNo.value);	
	
	// var ret= fnOpen("IFC020.htm","288","470");
	////清除Cookie
	// if(argOrgNo)
		// jf_SaveCookie("iic021OrgNo"	, "");
	// return ret;
// }
//1050722	1050087	Kevin	Kevin_C	升二代 -E
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

function jf_CheckName(argAccount,argUserId,argEmpName)
{
	if(document.all[argAccount].value=="")
	{document.all[argEmpName].value="";
		document.all[argUserId].value="";}
	else
	{
		//1091228	Joe		1090945		新增重複帳號檢核--S
		for (var iRow = 2; iRow < document.all.dg1.rows.length + 1; iRow++){
			if ("dg1__ctl" + iRow + "_txAccount" != argAccount && document.all["dg1__ctl" + iRow + "_txAccount"].value == document.all[argAccount].value){
				alert("序" + document.all["dg1__ctl" + iRow + "_lbSeq"].innerText + "已有帳號" + document.all[argAccount].value + "，不可重複輸入。");
				document.all[argAccount].value="";
				document.all[argEmpName].value="";
				document.all[argUserId].value="";
				document.all[argAccount].focus();
				return;
			}
		}
		//1091228	Joe		1090945		新增重複帳號檢核--E
		for(var i=0 ; i<document.all["H_dlUSERNAME"].options.length;i++)
		{
			//if(document.all[argAccount].value==document.all["H_dlUSERNAME"].options[i].value)
			//1010140    1010216 Leslie  Cloud   修正檢核帳號時不該比對大小寫的BUG 
			if(document.all[argAccount].value.toUpperCase()==document.all["H_dlUSERNAME"].options[i].value)
			{	
				document.all[argEmpName].value=document.all["H_dlUSERNAME"].options[i].text;
			
			}
		}
		for(var i=0 ; i<document.all["H_dlUserId"].options.length;i++)
		{
			//if(document.all[argAccount].value==document.all["H_dlUserId"].options[i].value)
			//1010140    1010216 Leslie  Cloud   修正檢核帳號時不該比對大小寫的BUG 
			if(document.all[argAccount].value.toUpperCase()==document.all["H_dlUserId"].options[i].value.toUpperCase())
			{	
				//1040408	Kenny	[1030930]	增加Client 端檢核單位管理人增加之帳號是否屬於其管理範圍，增加if判斷式
				if ( document.all["H_txUnitNo"].value != "" )
				{
					var strDeptNo = document.all["H_txUnitNo"].value ;
					var strOrgNo = document.all["txActiveOrgNo"].value ;
					var strUsername = document.all[argAccount].value ;
					var strUserPriv = document.all["UserPriv"].value ;
					
					//1040409	Kenny	[1030930]	增加取得機關別稱
					var strOrgNickName = document.all["OrgNickName"].value ;
					
					if ( strUserPriv == "0" )
					    strDeptNo = "";
				    //1040504   Kenny   [1040296]   增加判斷是否為一級單位管理員，傳入之單位代碼需取前兩碼，避免檢核後無法新增二級單位角色人員
					else if (strUserPriv == "1")
					    strDeptNo = strDeptNo.substring(0, 2);
					
					//1040409	Kenny	[1030930]	增加if()判斷式判斷使用機關，原邏輯至於此
					if ( strOrgNickName == "TPVGH" || strOrgNickName == "TVGH" || strOrgNickName == "KVGH" )
					{
						//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro
						// if ( !IFM210_1.CheckCanAdd( strOrgNo, strUsername, strDeptNo ).value )
						if ( !IF1.IFM210_1.CheckCanAdd( strOrgNo, strUsername, strDeptNo ).value )
						{					
							alert("此帳號不屬於您的管理單位。");
							document.all[argAccount].value = "" ;
							document.all[argEmpName].value = "" ;
							document.all[argUserId].value = "" ;
							//1050722	1050087	Kevin	Kevin_C	升二代
							//document.all[argAccount].focus();
							$('#argAccount').focus();
							return ;
						}
						else
						{
							document.all[argUserId].value=document.all["H_dlUserId"].options[i].text;
							return;
						}
					}
					else  // 增加非VGH機關檢核單位管理人可新增帳號
					{
						//1041022   Kenny	[1040882]   增加傳入Artifact以確認管理者權限
						//if (!IFM210_1.CheckCanAddNormal(strOrgNo, strUsername, strDeptNo).value)
						//1070830	Joe		1070678		配合內政部IIS環境設定改為使用AjaxPro
						// if ( !IFM210_1.CheckCanAddNormal( strOrgNo, strUsername, strDeptNo, document.all.SsoArtifact.value ).value )
						if ( !IF1.IFM210_1.CheckCanAddNormal( strOrgNo, strUsername, strDeptNo, document.all.SsoArtifact.value ).value )
						{					
							alert("此帳號不屬於您的管理單位。");
							document.all[argAccount].value = "" ;
							document.all[argEmpName].value = "" ;
							document.all[argUserId].value = "" ;
							//1050722	1050087	Kevin	Kevin_C	升二代
							//document.all[argAccount].focus();
							$('#argAccount').focus();
							return ;
						}
						else
						{
							document.all[argUserId].value=document.all["H_dlUserId"].options[i].text;
							return;
						}
					}
				}
				else  // 1040408	Kenny	[1030930]	調整原邏輯至此
				{
					document.all[argUserId].value=document.all["H_dlUserId"].options[i].text;
					return;
				}
			}
			else if(i==document.all["H_dlUSERNAME"].options.length-1)
			{
				
				document.all[argAccount].value=="";
				//1050722	1050087	Kevin	Kevin_C	升二代
				//document.all[argAccount].focus();
				$('#argAccount').focus();
				alert("帳號不存在。");
				//1040311	Kenny	[1030930]	若帳號不存在清除該帳號資訊
				document.all[argAccount].value = "" ;
				document.all[argEmpName].value = "" ;
				document.all[argUserId].value = "" ;
				
				return;			
			}
		}
	}
	
}