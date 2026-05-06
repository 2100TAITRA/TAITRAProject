/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 96.01.24		David	955244	SSO帳號整合登入，新增Type3-取得母視窗上資訊
 * 97.01.30		Stella	0970046	修正因IE7.0後無法取得網址參數，故配合AKI802方式一律寫出txt檔
 * 98.12.04		Leslie	0980627	修正開啟之目標頁面，由Start.htm改為Deploy.htm
 * 98.12.07		Leslie	0980336	因應IE8調整
 * 99.03.25		Leslie	0990159	雲科大SSO整合，改以Artifact開啟Client視窗
 *101.11.02		Leslie	--		修正單一簽入整合邏輯，增加叫用AuthWS函式之功能，以確實註冊使用者端IP	 
 *1041005		Kevin	1040345 調整PAD版介接方式為開新視窗
 *1050914       Kevin   1050087 二代系統升級
 *1060831       Kevin   1060634 中興支援自動輸入帳號密碼功能
 *1070731       Joe     1070678 修正弱掃第三批
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

//1050914 Kevin 1050087 二代系統升級 Start
window.onload = Login;
function Login()
{
    if (document.all.txMsg && document.all.txMsg.value != "")
        alert(document.all.txMsg.value);

    //1060831 Kevin	1060634	中興支援自動輸入帳號密碼功能
    if (document.all.txRedirectPage.value)
	    window.location = document.all.txRedirectPage.value;
}
 
////1011102	Leslie	修改載入之執行邏輯，先準備AuthWS之WSDL
////window.onload = Login;
//window.onload = PrepareWS;
//
//function PrepareWS()
//{
//	//1041005 Kevin 1040345 調整PAD版介接方式為開新視窗
//	if (document.all["PAD_URL"] && document.all["PAD_URL"].value != "")
//	{
//	    window.open(document.all["PAD_URL"].value, "電子公文系統");
//	    return;
//	}
//	
//	service.onserviceavailable = Login;
//	CallWS("http://localhost/IIWS/AuthWS.asmx","RegistIPWithArtifact",null);
//}
//
//function Login()
//{
//	service.onserviceavailable = null;	//1020321	Leslie	避免開啟二個公文系統
//	var account		= document.all["txAccount"].value;	
//	
//	//0981204	Leslie[0980627]	改為開啟Deploy.htm以避免無法自動更新
//	//var s = "file://c:/2100/SSO/Start.htm"
//	var s = "file://c:/2100/SSO/Deploy.htm"
//	
//	if(account != "")
//		s += "?UserId=" + account;
//    //s += "?UserId=" + account + "&LoginType=" + LogonType;	
//
//	//1011102	Leslie	有權杖時，增加登錄目前IP
//	//0990325	Leslie[0990159]	增加處理Artifact
//	if(document.all["txArtifact"] && document.all["txArtifact"].value != "")
//	{
//		s += "?SAMLart=" + document.all["txArtifact"].value;
//		
//		var param = new Array();
//		param[0] = document.all["txArtifact"].value;
//		param[1] = "";
//		
//		CallWS("http://localhost/IIWS/AuthWS.asmx","RegistIPWithArtifact",param);
//	}
//	
//	if(account != "" || document.all["txArtifact"])		//0990330	Leslie	ADD	"|| document.all["txArtifact"]"
//	{
//		var oShell = new ActiveXObject("Shell.Application");
//		var strFeature = "";
//   		var strWidth = "";	
//   		var strHeight = "";
//   		var strWinName = "";
//		var param = "file:///C:/2100/SSO/Medium.html?Feature="+strFeature+"&TargetUrl="+ escape(encodeURIComponent(s))+"&WinName="+strWinName+"&Feature="+strFeature+"&Width="+strWidth+"&Height="+strHeight;
//
//		//0970130 Stella 修正因IE7.0後無法取得網址參數，故配合AKI802方式一律寫出txt檔
//		var fsolog = new ActiveXObject("Scripting.FileSystemObject");
//		var pLogFile = fsolog.CreateTextFile("c:\\2100\\SSO\\WebEdit.TXT",true);
//		pLogFile.write(param);
//		pLogFile.close();
//
//		var commandtoRun ="";
//		try
//		{
//			oShell.ShellExecute("IEXPLORE.EXE", param, null, null, "0");
//			//window.open(s, '', 'fullscreen=no,menubar=no,titlebar=no,toolbar=no,resizable=yes,status=yes')
//			opener = parent;
//		}
//		catch(e)
//		{
//		}
//		//0981207	Leslie	因應IE8調整，以避免關閉視窗時會跳出提醒訊息
//		window.open("","_self"); 
//		window.close();
//	}
//	else if(document.all.act!=null)	//1020321	加else
//	{
//		var oShell = new ActiveXObject("Shell.Application");
//		var s = "file://c:/2100/SSO/Deploy.htm"
//		if(document.all.to.value != "")
//			s += "?Act=WINDOWS&To=";
//		else	
//			s += "?Act=WINDOWS";
//		var strFeature = "";
//   		var strWidth = "";	
//   		var strHeight = "";
//   		var strWinName = "";
//		var param = "file:///C:/2100/SSO/Medium.html?Feature="+strFeature+"&TargetUrl="+ escape(encodeURIComponent(s))+"&WinName="+strWinName+"&Feature="+strFeature+"&Width="+strWidth+"&Height="+strHeight;
//
//		//0970130 Stella 修正因IE7.0後無法取得網址參數，故配合AKI802方式一律寫出txt檔
//		var fsolog = new ActiveXObject("Scripting.FileSystemObject");
//		var pLogFile = fsolog.CreateTextFile("c:\\2100\\SSO\\WebEdit.TXT",true);
//		pLogFile.write(param);
//		pLogFile.close();
//
//		var commandtoRun ="";
//		try
//		{
//			var fsolog = new ActiveXObject("Scripting.FileSystemObject");
//			var pLogFile = fsolog.CreateTextFile("c:\\2100\\SSO\\WebEdit.TXT",true);
//			pLogFile.write(param);
//			pLogFile.close();
//			oShell.ShellExecute("IEXPLORE.EXE", param, null, null, "0");
//			//window.open(s, '', 'fullscreen=no,menubar=no,titlebar=no,toolbar=no,resizable=yes,status=yes')
//			opener = parent;
//		}
//		catch(e)
//		{
//		}
//		//0981207	Leslie	因應IE8調整，以避免關閉視窗時會跳出提醒訊息
//		window.open("","_self"); 
//		window.close();
//	}
//}
//
///*if(document.all["txErrMsg"].value != "")
//	alert(document.all["txErrMsg"].value);*/
//	
////1011102	Leslie	新增呼叫AuthWS之CallW()(因為AuthWS之函式無需傳入SessionID)
//function CallWS(sWsUrl, sFunc, arrParam)
//{
//	var callObj = new Object();
//	callObj.funcName = sFunc;	// Name of the remote function.
//	callObj.async = true;		// A Boolean that specifies the type of call
//	callObj.timeout = 15;		// Timeout value for the method call (seconds)
//
//	// SOAP header information
//	callObj.SOAPHeader = "<SOAP-ENV:Header>";
//	callObj.SOAPHeader += "<t:Transaction xmlns:t='some-URI' SOAP-ENV:mustUnderstand='1'>";
//	callObj.SOAPHeader += 5;
//	callObj.SOAPHeader += "</t:Transaction>";  
//	callObj.SOAPHeader += "</SOAP-ENV:Header>";  
//
//	var iCallID = "";
//	service.useService(sWsUrl+"?WSDL", "S1");
//	
//	if(arrParam == null)
//		return;
//	
//	if(arrParam.length == 1)
//		iCallID = service.S1.callService(callObj, arrParam[0]);
//	else if(arrParam.length == 2)
//		iCallID = service.S1.callService(callObj, arrParam[0], arrParam[1]);
//	else if(arrParam.length == 3)
//		iCallID = service.S1.callService(callObj, arrParam[0], arrParam[1], arrParam[2]);
//}
//1050914 Kevin 1050087 二代系統升級 End