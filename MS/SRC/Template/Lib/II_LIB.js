var SPLIT		= '|';
var SHOW_ORG	= 1;
var SHOW_ROLE	= 2;
var SHOW_PERSON	= 3;
var UNIT_SCHEMA	= "gipUnit3";
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
	var ret= fnOpen("IIC000.htm","480","430"); //回傳值：name, description, Path
	return ret;
}

//IIC010 伺服器共用視窗
function jf_ShowServerDialog(argParam)
{
	jf_SaveCookie("nSearch",argParam);
	var ret= fnOpen("IIC010.htm","480","370"); //回傳值：CN, displayName, Path
	return ret;
}

function jf_ShowPersonDialog(argParam)
{
	jf_SaveCookie("nSearch",argParam);
	var ret= fnOpen("IIC020.htm","480","370"); //回傳值：CN, displayName, Path
	return ret;
}

//IIC030 權利共用視窗
function jf_ShowPrivilegeDialog(argParam)
{
	jf_SaveCookie("nSearch",argParam);
	var ret= fnOpen("IIC030.htm","480","370"); //回傳值：CN, displayName, Path
	return ret;
}

//IIC040 系統共用視窗
function jf_ShowSystemDialog(argParam)
{
	jf_SaveCookie("nSearch",argParam);
	var ret= fnOpen("IIC040.htm","490","370"); //回傳值：CN, displayName, Path
	return ret;
}

//IIM110C1 虛擬目錄共用視窗
function jf_ShowVirtualDirDialog(argParam)
{
	jf_SaveCookie("nSearch",argParam);
	var ret= fnOpen("IIM110C1.htm","490","370"); //回傳值：CN, displayName, Path
	return ret;
	
}

//IIC050 應用程式共用視窗
function jf_ShowApplicationDialog()
{
	var ret = fnOpen("IIC050.htm","490","400"); //回傳值：CN, Path
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
	parent.navbar.location=argPage;
}

function ViewerReload(argPage)
{
	parent.viewer.location = argPage;
}

function jf_OpenFirstObjOfTV()
{
	parent.navbar.OpenFirstObj();
}
