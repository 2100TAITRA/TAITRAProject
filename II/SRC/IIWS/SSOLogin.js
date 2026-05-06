/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 101.03.12	Leslie	1010215 標檢局單一簽入整合，新增作業系統單一簽入整合，Type-「OS」，以作為日漸增加之相同需求，新增本程式
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
window.onload = SSoLogin;

function SSoLogin(){
var wshell = new ActiveXObject("WScript.Shell");
var strUserName = wshell.ExpandEnvironmentStrings("%USERNAME%");
var strUserDnsDomain = wshell.ExpandEnvironmentStrings("%USERDNSDOMAIN%");
	if(strUserDnsDomain != "%USERDNSDOMAIN%" && strUserDnsDomain == strServerDomain)	//發佈版
	{
		document.all["txAccount"].value = strUserName;
		Login();
	}
}