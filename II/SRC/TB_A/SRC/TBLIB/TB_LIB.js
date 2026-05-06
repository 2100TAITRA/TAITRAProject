/*
DATE	SA		PRG		MGR_NO			DESC
1050922	Cloud   Kenny	1050087	        二代公文系統相關修改；一併調整開起子視窗路徑
1070803 Kevin   Justin	1070678			弱掃修正Client Cookies Inspection
1120313	Kevin	Cloud	1120203			弱掃修正Client DOM XSS
*/

var SPLIT = "|";
function ProjectOnLoad()
{

}

function GetParamArray()
{
	var arrayOfParamLen = 0;
	var arrayOfParam = new Array(0);
	
	var pUrl = unescape(this.location);
	if( pUrl != -1 )
	{
		var i,j,k;
		i = pUrl.indexOf("?");
		var paramStr = pUrl.substr(i+1); 
		var arr = paramStr.split("&");
		for(j=0 ; j<arr.length ; j++)
		{
			
			k = arr[j].indexOf("=");
			if( k != -1 )
			{
				arrayOfParam[arrayOfParamLen] = new Array(2);
				arrayOfParam[arrayOfParamLen][0] = arr[j].substr(0,k);
				arrayOfParam[arrayOfParamLen][1] = arr[j].substr(k+1);
				arrayOfParamLen++;
			}
		}
	}
	return arrayOfParam;
}

//取得參數值
function GetParam(p)
{
	var arr = this.GetParamArray();
	if( p == "" )	return "";
	for(var i=0 ; i<arr.length ; i++)
		if( arr[i][0] == p )
			return arr[i][1];
	return "";		
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
		//1091124	Leslie[1090885]	取消網址列的權杖
		else
			strParam = "?";	//串上"?"以避免外部呼叫端會串上各程式專用的參數
	}
	//1120313	Cloud	1120203			弱掃修正Client DOM XSS
	//return strParam;
	return encodeURI(strParam);
}

function jf_ShowGroupDialog()
{
	var artifact = document.all.SsoArtifact.value;
    //1050922   Kenny   [1050087]   二代公文系統相關修改；一併調整開起子視窗路徑
	//return jf_ShowModal("../../../II/IIC023.htm?SAMLart=" + artifact,"500","530"); //回傳值：CGroup
    return jf_ShowModal("../../../IF/IF1/IFC023.htm?SAMLart=" + artifact,"800","600"); //回傳值：CGroup
}
//1051004	Cloud	[1050087]	升級二代 無用mark
/*function jf_ShowOrgDialogForOUA()
{
	if(document.all.txOrgNo)
	{
		var OrgNo = document.all.txOrgNo.value;
		jf_ReadCookie("iic021OrgNo", OrgNo);
	}
	var arrSelectType = new Array(3);
	arrSelectType[0] = "Org";
	arrSelectType[1] = "Unit";
	arrSelectType[2] = "Account";
	var ret = jf_ShowOrgDialogByLevel("0", arrSelectType);
	return ret;
}*/

function jf_ShowOrgDialogForPerson()
{
	var arrSelectType = new Array(1);
	arrSelectType[0] = "Account";
    //1050922   Kenny   [1050087]   二代公文系統相關修改；jf_ShowOrgDialogByLevel以jf_ShowModal開起子視窗，不再接回傳值
	//var ret = jf_ShowOrgDialogByLevel("0", arrSelectType);
	//return ret;
    jf_ShowOrgDialogByLevel("0", arrSelectType);
}
/// <summary>
/// argParam等於0時(預設)，顯示機關,單位,角色與扮演人員
/// argParam等於1時，顯示機關,單位與放置在機關單位底下的AD帳號物件
/// argSelectType is a string array, the element may be: Org, Unit, Role or Account
///  so, it means user can select Org, Unit, Role and Account
/// <summary>
function jf_ShowOrgDialogByLevel(argParam, argSelectType)
{
	var sSelectType = "";
	for(var i=0; i<argSelectType.length; i++)
	{
		if(i != 0)
			sSelectType += ",";
		//1070803 Justin [1070678]弱掃修正Client Cookies Inspection--S
        //sSelectType += "'" + argSelectType[i] + "'";
		sSelectType += argSelectType[i];
	}
	//jf_SaveCookie("iic021StrctureType", argParam);
	//jf_SaveCookie("iic021SelectType", sSelectType);
	//1070803 Justin [1070678]弱掃修正Client Cookies Inspection--E
	var artifact = document.all.SsoArtifact.value;
    //1050922   Kenny   [1050087]   二代公文系統相關修改；一併調整開起子視窗路徑--Start--
	//var ret= jf_ShowModal("../../../II/IIC021.htm?SAMLart=" + artifact,"288","470"); //回傳值：CInfo
    //return ret;
	//1070803 Justin [1070678]弱掃修正Client Cookies Inspection
    //jf_ShowModal("../../../IF/IF1/IFC021.htm?SAMLart=" + artifact,"800","600"); //回傳值：CInfo
	jf_ShowModal("../../../IF/IF1/IFC021.htm?SAMLart=" + artifact + "&iic021SelectType=" + sSelectType,"800","600");
    //1050922   Kenny   [1050087]   二代公文系統相關修改；一併調整開起子視窗路徑--End--
}


//檢查email格式
function checkMail(argMail)
{
	if (jf_Trim(argMail) == "" )return true;
	if (argMail.match(/([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})/))
		return true;
	else
		return false;
	
}