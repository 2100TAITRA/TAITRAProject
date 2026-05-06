/*
DATE    SA		PRG		MGR_NO			DESC
0980512 Stella  Iris	0980222			增加判斷使用者是否使用公文系統,若未使用則直接開啟程式
1031007	Kevin	Kevin	1030791			不使用FSO元件
1050720	Kevin	Kevin	1050087			二代系統升級
*/
window.onload = Login;

function Login()
{
	//1050720 Kevin 1050087 二代系統升級 Start
	window.localStorage.RedirectPage = document.all.txStoragePage.value;
	window.location = document.all.txRedirectPage.value;
	//var strUrl = document.all.txRedirectPage.value;
	//var strLogin = document.all.txLogin.value;
	//var strUseOd = document.all.txUseOd.value;
	//
	////0980222 --iris 先判斷使用者是否使用公文系統
	////有安裝依原程式行為
	////沒有安裝,則直接開啟程式
	//if(strUseOd == "0")	//未安裝 系統參數USE_T2100_OD=0
	//{
	//	strUrl = decodeURIComponent(strUrl);
	//	window.open(strUrl, "","fullscreen=no");
	//	window.open("","_self"); 
	//	window.close();
	//}
	//else
	//{
	//	//使用者已登入，直接開啟指定網頁
	//	if(strLogin == "Y" )	
	//	{
	//		var strFeature = "";
   	//		var strWidth = "";	
   	//		var strHeight = "";
   	//		var strWinName = "";
   	//		strUrl = decodeURIComponent(strUrl);
   	//		var param = "";
	//		param = "file:///C:/2100/SSO/Medium.html?Feature="+strFeature+"&TargetUrl="+ escape(encodeURIComponent(strUrl))+"&WinName="+strWinName+"&Feature="+strFeature+"&Width="+strWidth+"&Height="+strHeight;
	//		
	//		//1031007 Kevin 1030791 不使用FSO元件
	//		// var fsolog = new ActiveXObject("Scripting.FileSystemObject");
	//		// var pLogFile = fsolog.CreateTextFile("c:\\2100\\SSO\\WebEdit.TXT",true);
	//		// pLogFile.write(param);
	//		// pLogFile.close();
	//		
	//		var oShell = new ActiveXObject("Shell.Application");
	//		var commandtoRun ="";
	//		try
	//		{
	//			oShell.ShellExecute("IEXPLORE.EXE", param, null, null, "0");
	//			opener = parent;
	//		}
	//		catch(e)
	//		{
	//		}
	//		//0980407 Stella 因應IE7調整，以避免關閉視窗時會跳出提醒訊息
	//		window.open("","_self"); 
	//		window.close();
	//	}
	//	//使用者尚未登入，跳出警示訊息詢問，確定後再導入登入畫面
	//	else
	//	{
	//		if(window.confirm("您目前尚未登入公文系統無法瀏覽詳細內容，是否要開啟公文系統進行登入以檢視詳細資訊？"))
	//		{
	//			var oShell = new ActiveXObject("Shell.Application");
	//			var strFeature = "";
   	//			var strWidth = "";	
   	//			var strHeight = "";
   	//			var strWinName = "";
	//			
   	//			var s = "file://c:/2100/SSO/Start.htm?To=AutoRedirect";
	//			var param = "file:///C:/2100/SSO/Medium.html?Feature="+strFeature+"&TargetUrl="+ escape(encodeURIComponent(s))+"&WinName="+strWinName+"&Feature="+strFeature+"&Width="+strWidth+"&Height="+strHeight;
	//			try
	//			{
	//				//1031007 Kevin 1030791 不使用FSO元件
	//				// var fsolog = new ActiveXObject("Scripting.FileSystemObject");
	//				// var pLogFile = fsolog.CreateTextFile("c:\\2100\\SSO\\WebEdit.TXT",true);
	//				// pLogFile.write(param);
	//				// pLogFile.close();
	//				
	//				//1031007 Kevin 1030791 改由Medium.htmlClient寫入
	//				param += "&RedirectPage=" + escape(encodeURIComponent(strUrl));
	//				// var fsolog = new ActiveXObject("Scripting.FileSystemObject");
	//				// var pLogFile = fsolog.CreateTextFile("C:\\2100\\SSO\\RedirectPage.txt",true);
	//				// pLogFile.write(strUrl);
	//				// pLogFile.close();
	//
	//				var commandtoRun ="";
	//				oShell.ShellExecute("IEXPLORE.EXE", param, null, null, "0");
	//				opener = parent;
	//			}
	//			catch(e)
	//			{
	//				alert("尚未於C:\\2100\\安裝公文系統，無法自動開啟公文系統供使用者登入。");
	//			}
	//		}
	//		window.open("","_self"); 
	//		window.close();
	//	}
	//}
	//1050720 Kevin 1050087 二代系統升級 End
}

