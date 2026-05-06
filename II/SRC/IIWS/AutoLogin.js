/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 98.12.07		Leslie	0980336	因應IE8調整
 * 98.12.04		Leslie	0980627	修正開啟之目標頁面，由Start.htm改為Deploy.htm
 * 1051107      Kevin   1050087 二代系統升級
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
window.onload = Login;

function Login()
{
    //1051107 Kevin 1050087 二代系統升級 Start
    window.location = document.all.txRedirectPage.value;
	//var account	= document.all["txAccount"].value;
	//var orgno	= document.all["txOrgNo"].value;
	//var artifact	= document.all["txArtifact"].value;
	////0981204	Leslie[0980627]	改為開啟Deploy.htm以避免無法自動更新
	////var s = "file://c:/2100/SSO/Start.htm"
	//var s = "file://c:/2100/SSO/Deploy.htm"
	//
	////0981207 Leslie 修正因IE7.0後無法取得網址參數，故配合AKI802方式一律寫出txt檔	==Start==
	//var oShell = new ActiveXObject("Shell.Application");
	//var strFeature = "";
	//var strWidth = "";	
	//var strHeight = "";
	//var strWinName = "";
    //
	////Leslie	優先處理Artifact
	//if(artifact != "")
	//	s +="?SAMLart=" + artifact;
	//else if(account != "")
	//{
	//	s += "?UserId=" + account;
	//}
	//var param = "file:///C:/2100/SSO/Medium.html?Feature="+strFeature+"&TargetUrl="+ escape(encodeURIComponent(s))+"&WinName="+strWinName+"&Feature="+strFeature+"&Width="+strWidth+"&Height="+strHeight;
	//	//s += "?UserId=" + account + "&OrgNo=" + orgno + "&SAMLart=" + artifact;
	////window.open(s, '', 'fullscreen=no,menubar=no,titlebar=no,toolbar=no,resizable=yes,status=yes')
	////opener = parent;
	//
	//var fsolog = new ActiveXObject("Scripting.FileSystemObject");
	//var pLogFile = fsolog.CreateTextFile("c:\\2100\\SSO\\WebEdit.TXT",true);
	//pLogFile.write(param);
	//pLogFile.close();
    //
	//var commandtoRun ="";
	//try
	//{
	//	oShell.ShellExecute("IEXPLORE.EXE", param, null, null, "0");
	//}
	//catch(e)
	//{
	//}
	//window.open("","_self"); 	//0981207	Leslie	因應IE8調整，以避免關閉視窗時會跳出提醒訊息
	////0981207	==END==
    //window.close();
    //1051107 Kevin 1050087 End
}