/*
DATE 	SA		PRG		MGR_NO		DESC
1060619	Kevin	Kevin_C	1060456		弱掃Client Potential Code Injection修正
1100819	Kevin	Joe		1100991		弱掃修正Client DOM XSS
*/
var SPLIT		= '|';
var SHOW_ORG	= 1;
var SHOW_ROLE	= 2;
var SHOW_PERSON	= 3;
var UNIT_SCHEMA	= "organizationalUnit";
var ROLE_SCHEMA	= "organizationalRole";
var AP_SCHEMA   = "gipApplication";
var APS_SCHEMA  = "gipApplicationSet";
var PROTOCOL    = "LDAP://";    

function fnOpen(arg,argW,argH)
{
   var sFeatures="dialogWidth: "+ argW + "px;dialogHeight:"+ argH+"px";
   var ret = window.showModalDialog(arg, "", sFeatures);
   return ret;
}

function jf_ShowOrgDialog(argMode)
{
	jf_SaveCookie("nMode",argMode);
	var ret= fnOpen("IIC000.htm" + GetAllParamStr(),"420","460"); //回傳值：name, description, Path
	return ret;
}

//IIC010 伺服器共用視窗
function jf_ShowServerDialog(argParam)
{
	jf_SaveCookie("nSearch",argParam);
	var ret= fnOpen("IIC010.htm" + GetAllParamStr(),"460","400"); //回傳值：CN, displayName, Path
	return ret;
}

function jf_ShowPersonDialog(argParam, argOrgNo)
{
	jf_SaveCookie("nSearch",argParam);
	var param = ReplaceParamStrForOrgNo(GetAllParamStr(), argOrgNo);
	var ret= fnOpen("IIC020.htm" + param,"480","370"); //回傳值：CN, displayName, Path
	return ret;
}

function jf_ShowOrgDialogForPersonWithOrgNo(argOrgNo)
{
	var arrSelectType = new Array(1);
	arrSelectType[0] = "Account";
	var ret = jf_ShowOrgDialogByLevel("0", arrSelectType, argOrgNo);
	return ret;
}
function jf_ShowOrgDialogForAllWithOrgNo(argOrgNo)
{
	var arrSelectType = new Array(3);
	arrSelectType[0] = "Unit";
	arrSelectType[1] = "Role";
	arrSelectType[2] = "Account";
	var ret = jf_ShowOrgDialogByLevel("0", arrSelectType, argOrgNo);
	return ret;
}
function jf_ShowOrgDialogForPerson()
{
	var arrSelectType = new Array(1);
	arrSelectType[0] = "Account";
	var ret = jf_ShowOrgDialogByLevel("0", arrSelectType);
	return ret;
}
function jf_ShowOrgDialogForPersonWithOrgNo(argOrgNo)
{
	var arrSelectType = new Array(1);
	arrSelectType[0] = "Account";
	var ret = jf_ShowOrgDialogByLevel("0", arrSelectType, argOrgNo);
	return ret;
}
function jf_ShowOrgDialogForAll()
{
	var arrSelectType = new Array(3);
	arrSelectType[0] = "Unit";
	arrSelectType[1] = "Role";
	arrSelectType[2] = "Account";
	var ret = jf_ShowOrgDialogByLevel("0", arrSelectType);
	return ret;
}
/// <summary>
/// argParam等於0時(預設)，顯示機關,單位,角色與扮演人員
/// argParam等於1時，顯示機關,單位與放置在機關單位底下的AD帳號物件
/// argSelectType is a string array, the element may be: Org, Unit, Role or Account
///  so, it means user can select Org, Unit, Role and Account
/// argOrgNo為機關代碼, 表示指定顯示某個特定機關即可, 若傳入值為null,undefined or空字串,則表不指定
/// 回傳的物件型態有兩種, 分別為CURInfo與CAccountInfo, 其屬性分別如下
/// public class CURInfo
/// 	{
/// 		public string InfoType = "";//其值有可能為Org, Unit或Role
/// 		public string Code	= "";//單位代碼或角色代碼
/// 		public string Name	= "";
/// 		public string Path	= "";
/// 	 	public string UnitType	= "";
/// 		public string UnitMode	= "";
/// 		public string SuperiorUnitCode	= "";
/// 		public string SourceOrgNo		= "";
/// 		public string SourceOrgName		= "";
/// 		public string FullName			= "";
/// 		public string Description		= "";
/// 		public int ChildCount			= 0;
/// 		public int DisplayRank			= 0;
/// 	}
/// public class CAccountInfo
/// 	{
/// 		public string InfoType = EnumInfoType.Account.ToString();//Account
/// 		public string Code	= "";
/// 		public string Name	= "";
/// 		public string Path	= "";
/// 	}
/// 呼叫此共用函式得到回傳值時可先判斷InfoType的值, 若其值為Account, 
/// 則表示所回傳的物件型態為CAccountInfo
/// <summary>
function jf_ShowOrgDialogByLevel(argParam, argSelectType, argOrgNo)
{
	var sSelectType = "";
	for(var i=0; i<argSelectType.length; i++)
	{
		if(i != 0)
			sSelectType += ",";
		sSelectType += "'" + argSelectType[i] + "'";
	}
	jf_SaveCookie("iic021StrctureType"	, argParam);
	jf_SaveCookie("iic021SelectType"	, sSelectType);
	if(argOrgNo)
		jf_SaveCookie("iic021OrgNo"	, argOrgNo);
	var ret= fnOpen("IIC021.htm","288","470");
	//清除Cookie
	if(argOrgNo)
		jf_SaveCookie("iic021OrgNo"	, "");
	return ret;
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

//IIC030 權利共用視窗
function jf_ShowPrivilegeDialog(argParam, argOrgNo)
{
	var param = ReplaceParamStrForOrgNo(GetAllParamStr(), argOrgNo);
	jf_SaveCookie("nSearch",argParam);
	var ret= fnOpen("IIC030.htm" + param,"560","450"); //回傳值：CN, displayName, Path
	return ret;
}

//IIC040 系統共用視窗
function jf_ShowSystemDialog(argParam, argOrgNo)
{
	var param = ReplaceParamStrForOrgNo(GetAllParamStr(), argOrgNo);
	jf_SaveCookie("nSearch",argParam);
	var ret= fnOpen("IIC040.htm" + param,"490","370"); //回傳值：CN, displayName, Path
	return ret;
}

//IIM110C1 虛擬目錄共用視窗
function jf_ShowVirtualDirDialog(argParam, argOrgNo)
{
	var param = ReplaceParamStrForOrgNo(GetAllParamStr(), argOrgNo);
	jf_SaveCookie("nSearch",argParam);
	var ret= fnOpen("IIM110C1.htm" + param,"490","420"); //回傳值：CN, displayName, Path
	return ret;
	
}

//IIC050 應用程式共用視窗
function jf_ShowApplicationDialog(argOrgNo)
{
	var param = ReplaceParamStrForOrgNo(GetAllParamStr(), argOrgNo);
	var ret = fnOpen("IIC050.htm" + param,"490","400"); //回傳值：CN, Path
	return ret;
}

function ProjectOnLoad()
{
}

//資訊基礎建設共用函式
function BuildRetString(argArr)
{
	var i;
	var ret="";
	for(i=0;i<argArr.length-1;i++)
	   ret+=argArr[i]+SPLIT;
	ret+=argArr[i];   
	return ret;
}

function GetElement(argStr,argIdx)
{
	var ss =argStr.split(SPLIT);
   	return ss[argIdx];
}

function TreeViewReload(argPage)
{
	var i = argPage.indexOf("?");
	if(i != -1)
		parent.navbar.location = argPage;
	else
		//1100819	Joe		1100991		弱掃修正Client DOM XSS
		// parent.navbar.location = argPage + GetAllParamStr();
		parent.navbar.location = argPage + encodeURI(GetAllParamStr());
}

function ViewerReload(argPage)
{
	parent.viewer.location = argPage;
}

function jf_OpenFirstObjOfTV()
{
	parent.navbar.OpenFirstObj();
}

function fnCallW(argWS, argFuncName, argParam)
{
	var callObj = new Object();
	callObj.funcName = argFuncName;      // Name of the remote function.
	callObj.async = false;         // A Boolean that specifies the type of call
	callObj.timeout = 20;         // Timeout value for the method call (seconds)
	// SOAP header information
	callObj.SOAPHeader = "<SOAP-ENV:Header>";
	callObj.SOAPHeader += "<t:Transaction xmlns:t='some-URI' SOAP-ENV:mustUnderstand='1'>";
	callObj.SOAPHeader += 5;
	callObj.SOAPHeader += "</t:Transaction>";  
	callObj.SOAPHeader += "</SOAP-ENV:Header>";  

	service.useService(argWS + "?WSDL", "Serv");

/*	
	if(argParam == null || argParam.length == 0)
		return service.Serv.callService(callObj, argParam);
	else
	{
		var s = "service.Serv.callService(callObj ";
		for(var i=0; i<argParam.length; i++)
			s += ", argParam[" + i + "]";
		s += ");";
		callID = eval(s);
	}
*/
	if (argParam == null)
       callID = service.Serv.callService(callObj  );
       else if (argParam[0] == null)
       callID = service.Serv.callService(callObj  ,
							argParam);
	else if (argParam.length ==1 )
       callID = service.Serv.callService(callObj  ,
							argParam[0]);
	else if (argParam.length ==2 )
       callID = service.Serv.callService(callObj  ,
							argParam[0] , argParam[1]);
	else if (argParam.length ==3 )
       callID = service.Serv.callService(callObj  ,
							argParam[0] , argParam[1] , argParam[2]);
	else if (argParam.length ==4 )
       callID = service.Serv.callService(callObj  ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3]);
	else if (argParam.length ==5 )
       callID = service.Serv.callService(callObj  ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4]);
	else if (argParam.length ==6 )
       callID = service.Serv.callService(callObj  ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5]);
	else if (argParam.length ==7 )
       callID = service.Serv.callService(callObj  ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6]);
	else if (argParam.length ==8 )
       callID = service.Serv.callService(callObj  ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7]);
	else if (argParam.length ==9 )
       callID = service.Serv.callService(callObj  ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8]);
	else if (argParam.length ==10 )
       callID = service.Serv.callService(callObj  ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9]);
	else if (argParam.length ==11 )
       callID = service.Serv.callService(callObj  ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10]);
	else if (argParam.length ==12 )
       callID = service.Serv.callService(callObj  ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11]);
	else if (argParam.length ==13 )
       callID = service.Serv.callService(callObj  ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12]);
	else if (argParam.length ==14 )
       callID = service.Serv.callService(callObj  ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13]);
	else if (argParam.length ==15 )
       callID = service.Serv.callService(callObj  ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13], argParam[14]);
	else if (argParam.length ==16 )
       callID = service.Serv.callService(callObj  ,
							argParam[0] , argParam[1] , argParam[2] , argParam[3] ,
							argParam[4] , argParam[5] , argParam[6] , argParam[7] ,
							argParam[8] , argParam[9] , argParam[10], argParam[11],
							argParam[12], argParam[13], argParam[14], argParam[15]);
	else if (argParam.length >16 )
	{
       callID.error = true;
       callID.errorDetail.string = "輸入參數超出預設陣列最大值16";
    }
	return callID;
}

//呼叫此函式之網頁需具有SsoArtifact欄位
function CheckAccount(argCodeId, argNameId)
{
	var oCode = document.all[argCodeId];
	var oName = document.all[argNameId];
	oCode.value = jf_Trim(oCode.value);

	if (oCode.value == "")
	{
		oName.value = "";
		return true;
	}
	
	var sAuthws = document.all.authWS.value;
	var argWSParam = new Array(2);
	//1060619	Kevin_C	1060456	弱掃Client Potential Code Injection修正 -S
	//argWSParam[0] = document.all.SsoArtifact.value;
	//argWSParam[1] = oCode.value;
	argWSParam[0] = encodeURI(document.all.SsoArtifact.value);
	argWSParam[1] = encodeURI(oCode.value);
	//1060619	Kevin_C	1060456	弱掃Client Potential Code Injection修正 -E
	var CallWsObj = fnCallW(sAuthws, "GetAccountName", argWSParam);

	if(!CallWsObj.error && CallWsObj.value && CallWsObj.value != "")
	{
		oName.value = jf_Trim(CallWsObj.value);
		return true;
	}
	else
	{
		//alert("找不到使用者[" + oCode.value + "]的資料，請重新輸入。");
		//oCode.focus();
		oName.value = "";
		return false;
	}
}

//呼叫此函式之網頁需具有SsoArtifact, txActiveOrgNo欄位
function CheckAccountWithOrgNo(argCodeId, argNameId)
{
	var oCode = document.all[argCodeId];
	var oName = document.all[argNameId];
	var oOrgNo = document.all["txActiveOrgNo"];
	oCode.value = jf_Trim(oCode.value);

	if (oCode.value == "")
	{
		oName.value = "";
		return true;
	}
	
	var sAuthws = document.all.authWS.value;
	var argWSParam = new Array(2);
	//1060619	Kevin_C	1060456	弱掃Client Potential Code Injection修正 -S
	// argWSParam[0] = document.all.SsoArtifact.value;
	// argWSParam[1] = oCode.value;
	// argWSParam[2] = oOrgNo.value;
	argWSParam[0] = encodeURI(document.all.SsoArtifact.value);
	argWSParam[1] = encodeURI(oCode.value);
	argWSParam[2] = encodeURI(oOrgNo.value);
	//1060619	Kevin_C	1060456	弱掃Client Potential Code Injection修正 -E
	var CallWsObj = fnCallW(sAuthws, "GetAccountNameWithOrgNo", argWSParam);

	if(!CallWsObj.error && CallWsObj.value && CallWsObj.value != "")
	{
		if(oName.tagName.toUpperCase() == "INPUT")
			oName.value = jf_Trim(CallWsObj.value);
		else if(oName.tagName.toUpperCase() == "SPAN")
			oName.innerText = jf_Trim(CallWsObj.value);
		else
			oName.value = jf_Trim(CallWsObj.value);
		return true;
	}
	else
	{
		//alert("找不到使用者[" + oCode.value + "]的資料，請重新輸入。");
		//oCode.focus();
		if(oName.tagName.toUpperCase() == "INPUT")
			oName.value = "";
		else if(oName.tagName.toUpperCase() == "SPAN")
			oName.innerText = "";
		else
			oName.value = "";
		return false;
	}
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

/*****************************************************************************
*
*   2005.01.26 新版TreeView 共用區
* 
*****************************************************************************/
// Decide if the names are links or just the icons
USETEXTLINKS = 1  //replace 0 with 1 for hyperlinks
// Decide if the tree is to start all open or just showing the root folders
STARTALLOPEN = 0 //replace 0 with 1 to show the whole tree
HIGHLIGHT = 1

function GenTree()
{
	//產生TreeView
	initializeDocument();
}
