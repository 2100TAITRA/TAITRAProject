/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
程式修改歷程 
-------------------------------------------------------------------------------------------------
日期		修改人	單號	概要
-------------------------------------------------------------------------------------------------
1010410		Leslie	1010290	(國合會)配合EIP整合進行修改，新增本作業
1061016		Kevin	1060934 國合會訊息整合支援二代
1070731     Zen     1070678     弱掃Client Password In Comment修正
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
window.onload = Login;

function Login()
{
	//1061016 Kevin 1060934 國合會訊息整合支援二代 Start
	if (document.all.txMsg && document.all.txMsg.value != "")
		alert(document.all.txMsg.value);

	if (document.all.txStoragePage && document.all.txStoragePage.value != "")
		window.localStorage.RedirectPage = document.all.txStoragePage.value;

	if (document.all.txRedirectPage.value != "")
	window.location = document.all.txRedirectPage.value;

	var DocList = $('#DocListPrepared');
	if (DocList && DocList.val() == '1') {
	    //1110520 Leslie[1110371] 純檔管升級二代
	    //var useT2100OD = $('#h_UseT2100OD').val();
	    jf_ShowModal('AKI800View.ashx');
	}

	//var account		= (document.all["txAccount"])?document.all["txAccount"].value:"";	
	//var strUrl = document.all["RedirectPage"].value;
	//
	////0981204	Leslie[0980627]	改為開啟Deploy.htm以避免無法自動更新
	//var s = "file://c:/2100/SSO/Deploy.htm"
	//
	//if(account != "")
	//	s += "?UserId=" + account;
	//
	//if(account != "")
	//{
	//	var oShell = new ActiveXObject("Shell.Application");
	//	var strFeature = "";
   	//	var strWidth = "";	
   	//	var strHeight = "";
   	//	var strWinName = "";
	//	var param = "file:///C:/2100/SSO/Medium.html?Feature="+strFeature+"&TargetUrl="+ escape(encodeURIComponent(s))+"&WinName="+strWinName+"&Feature="+strFeature+"&Width="+strWidth+"&Height="+strHeight;
	//
	//	//0970130 Stella 修正因IE7.0後無法取得網址參數，故配合AKI802方式一律寫出txt檔
	//	var fsolog = new ActiveXObject("Scripting.FileSystemObject");
	//	var pLogFile = fsolog.CreateTextFile("c:\\2100\\SSO\\WebEdit.TXT",true);
	//	pLogFile.write(param);
	//	pLogFile.close();
	//	var fsolog = new ActiveXObject("Scripting.FileSystemObject");
	//	var pLogFile = fsolog.CreateTextFile("C:\\2100\\SSO\\RedirectPage.txt",true);
	//	pLogFile.write(strUrl);
	//	pLogFile.close();
	//
	//	var commandtoRun ="";
	//	try
	//	{
	//		oShell.ShellExecute("IEXPLORE.EXE", param, null, null, "0");
	//		//window.open(s, '', 'fullscreen=no,menubar=no,titlebar=no,toolbar=no,resizable=yes,status=yes')
	//		opener = parent;
	//	}
	//	catch(e)
	//	{
	//	}
	//	//0981207	Leslie	因應IE8調整，以避免關閉視窗時會跳出提醒訊息
	//	window.open("","_self"); 
	//	window.close();
	//}
	//1061016 Kevin 1060934 End
}

/*if(document.all["txErrMsg"].value != "")
	alert(document.all["txErrMsg"].value);*/


function jf_ShowModal(argUrl, argWidth, argHeight) {
    if (document.all.II_USE_SSL && document.all.II_USE_SSL.value == "Y")
        argUrl = argUrl.replace(/http:/ig, 'https:');

    var sFeatures = "dialogWidth: " + argWidth + "px;dialogHeight:" + argHeight + "px";
    openDlg(argUrl, "0", "URL", argWidth, argHeight);
}