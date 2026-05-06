/*
DATE	SA	    PRG	    MGR_NO	DESC
1031028	Leslie	Kenny	1030836	配合SSL修改傳入元件之URL
1110314	Leslie	Zen		1110287	升級二代
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1110314	Zen	1110287	二代系統升級
/*
document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

if (document.all["ValidationSummary1"].innerText != "")
	alert(document.all["ValidationSummary1"].innerText);
*/
	
function ClientOnLoad()
{
}

//1110314	Zen	1110287	二代系統升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1110314	Zen	1110287	二代系統升級
	//var xObjectName = document.activeElement.id;
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
/*		case "btHelp":
			var strUrl = "";
			strUrl = "AKT410C1.aspx?rtnObj=lbReturnValue";
			jf_OpenChildWin(strUrl, "AKT410C1", 740, 500);
			Page_BlockSubmit = true;
			break;
*/
	}	
}

//1110314	Zen	1110287	二代系統升級，傳入參數event
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
	
	//1110314	Zen	1110287	二代系統升級
	//xObjectName= window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;	
	
	switch (xObjectName)
	{

		case "btDownLoad":
			if(document.all.txAllFile.value == "")
				Page_BlockSubmit = true;
			else
			{
				Page_BlockSubmit = false;
				//1110314	Zen	1110287	二代系統升級
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;	
	}
}


//1110325 Zen 1110287 補提供瀏覽舊公文功能，移除下載DI相關功能
//function DownLoad(argFileName,argType)
//{
//	if(argType == "3" || argType == "4")
//	{
//		var FilePath = document.all.HttpPath.value + argFileName;
//		window.open(FilePath);
//	}
//	else
//	{

//		var strClientPath = "C:\\2100\\AKI808\\";
//		CreateClientFolder(strClientPath);
	
//		var strApPath = document.all.WorkPath.value ;
	
//		try
//		{
//			//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
//			//document.all.WsWrapper.Init(document.all.txApWebService.value);
//			var serviceURL = document.all.txApWebService.value ;
//			//var serviceURL = "https://SYS2013/WebFileIo/T2100FileIOService.asmx" ;
//			if ( document.all.II_USE_SSL != null )
//			{
//				if ( document.all.II_USE_SSL.value == "Y" )
//					serviceURL = serviceURL.replace("http://", "https://") ;
//			}
			
//			alert(serviceURL);
//			document.all.WsWrapper.Init(serviceURL);
//			//AddFile(server path, filename);
//			document.all.WsWrapper.AddFile(strApPath, argFileName);
//			//Download(artifact, isdelsource, client path)
//			document.all.WsWrapper.Download(document.all.txArtifact.value, false, strClientPath);
			
//			//產生預覽畫面
//			//alert(strClientPath +argFileName );
//			document.all.xdpv.XmlOrDIFilePath = strClientPath +argFileName ;
//			document.all.xdpv.Preview();
//		}
//		catch(e)
//		{
//			alert("產生稿件失敗，錯誤訊息為：" + e.message);
//		}
//	}
//}

//1110325 Zen 1110287 補提供瀏覽舊公文功能，移除下載DI相關功能
////於Client端建立出相同結構之目錄
////傳入參數 example："C:\2100\AKI808\"
//function CreateClientFolder(argFolder)
//{
//	var fso = new ActiveXObject("Scripting.FileSystemObject");
//	var strDirToCreate = "";
//	var strDirTemp = argFolder.split('\\');

//	for(var j=0;j<strDirTemp.length;j++)
//	{
//		if(strDirTemp[j] != "")
//		{
//			strDirToCreate += strDirTemp[j] + "\\";
//			if(!fso.FolderExists(strDirToCreate))
//			{
//				fso.CreateFolder(strDirToCreate);
//			}
//		}
//	}
	
//	fso=null;
//}


