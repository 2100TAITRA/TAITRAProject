/* Date		SA			PG			MGR_NO		DESC
 * 0990625	------		David		0990024		附件顯示邏輯調整，附件下載配合修正
 * 1000112	------		David		0991063		正式公文列印時，新增顯示交換章戳(樣板須配合修改)
 * 1000209	------		David		1000174		新增正式公文預覽功能
 * 1000517	------		David		1000452		因改以系統參數判斷開啟TBI130是否需登入，不登入時Artifact由隱藏欄位取得
 * 1010112	David		David		1010023		轉公文PDF檔時，如有子類別，需轉出對應的PDF
 * 1020904	David		Cloud		1020609		將原呼叫ws[getfile]行為修改為Ajax
 * 1031028	Leslie		Kenny		1030836		配合SSL修改傳入元件之URL
 * 1031112	Cloud		--			--			配合SSL修改開啟網址
 * 1050406  Cloud       Kenny       1050133     修改判斷文別方式
 * 1050603	Cloud		Kevin_C		1050293		修正式公文列印沒反應的問題
 * 1051004  Cloud       Cloud       1050087     升級二代
 * 1051019	Leslie	Joe			1050087		二代修改配合行動平台
 * 1060206	Cloud		Cloud		航港局-序393 修正壓縮下載勾選誤判問題
 * 1060516	Leslie		Zen			1060215		調整檔案下載行為
 * 1061210  Cloud       Zen         1061210     修正附件PDF預覽功能異常之問題
 * 1071107	Cloud		Kevin_C		1071115		下載相關功能增加傳入該公告機關代碼
 * 1080214	Kevin		Joe			1080179		弱掃修正Hardcoded Absolute Path
 * 1090702	Kevin		Joe			1090485		弱掃修正XSS
 */
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;
// 1051004  Cloud      1050087     升級二代
//document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
//紀錄Call WebService物件的id
var wsDuplicateID;
var txViewPage_index=8;
var txTotalPage_index=10;
var tbws = "";
try
{
    // 1051004  Cloud      1050087     升級二代
	//tbws = document.all.H_TBWS.innerText;
	//if(typeof(tbws) == "undefined")//for Mozilla
		tbws = document.all.H_TBWS.textContent;
}
catch(e)
{
}

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	fnCheckAlertMsg(); //檢查是否alert訊息
	fnCheckDisplayDiv(); //檢查是否顯示DIV內容
	IsServerHandling = false;

	document.all["txDownload"].value = ""; //清空紀錄是否下載檔案之欄位值
	try
	{
		// 1020904	Cloud	1020609	將原呼叫ws[getfile]行為修改為Ajax
		//jf_CallWA(jf_Trim(tbws), "GetFile", false, null);//呼叫下載檔案的webservice
	}
	catch(e){}
	//document.all.WsWrapper.Download(null, false, null);
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019	Joe		1050087		配合行動平台進行修正
//function ClientButtonControl()
function ClientButtonControl(e)
{
	//1051019	Joe		1050087		配合行動平台進行修正
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;
	
	if(IsServerHandling)
	   return;
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit = true;
		return;
	}
	
	switch (xObjectName)
	{
		case "btdownload":
			document.all["txDownload"].value = "Download";
			if(!fnDownload())
				Page_BlockSubmit = true;			
			break;
		case "ImbtPrintDI":
		    Page_BlockSubmit = true;
		    //1051004   Cloud   升級二代
		    //if(document.all["H_lbDi"].innerText =="")
		    if(document.all["H_lbDi"].textContent =="")
				alert("無公文di檔");
			else
			{
				//1000209 David 1000174 新增正式公文預覽功能，調整傳入參數
				//DownLoadFileToClient("DI");
		    	DownLoadFileToClient("1");
		    	
			}
			break;
	    case "ImbtPrintPDF":
	        //1051004   Cloud   升級二代
	        //if(document.all["H_lbPdf"].innerText =="")
	        if (document.all["H_lbPdf"].textContent == "")
				alert("無公文Pdf檔");
			else
			{
	        	DownLoadFileToClient("PDF");
	        	Page_BlockSubmit = true;
			}
			break;
		//1000209 David 1000174 新增正式公文預覽功能
		case "ImbtPreviewDI":
		    Page_BlockSubmit = true;
		    //1051004   Cloud   升級二代
		    //if(document.all["H_lbDi"].innerText =="")
		    if (document.all["H_lbDi"].textContent == "")
				alert("無公文di檔");
			else
			{
				DownLoadFileToClient("2");
			}
			break;
		// 1051004  Cloud      1050087     升級二代
		    case "btDownload":
                fnDownload();
                break;
			case "btFirst":
			document.all["txDownload"].value = "";
                fnChangeCount("btFirst");
                break;
            case "btPreview":
            	document.all["txDownload"].value = "";
                fnChangeCount("btPreview");
                break;
		case "btNext":
			document.all["txDownload"].value = "";
                fnChangeCount("btNext");
                break;
		case "btLast":
			document.all["txDownload"].value = "";
                fnChangeCount("btLast");
                break;
		case "btChangePage":
			document.all["txDownload"].value = "";
                fnChangeCount("btChangePage");
                break;
	}
}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
		if(jf_IsWebServiceSuccess(CallWsObj))
		{
		}
		else
		{
		}
    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argLink)
{
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//檢查是否alert訊息
function fnCheckAlertMsg()
{
	if(document.all["AlertMsg"] == null)
		return;
		
	var strAlertMsg = document.all["AlertMsg"].value;
	if(strAlertMsg != "")
		parent.fnShowMsgAndClose(strAlertMsg); //呼叫母視窗顯示訊息並關閉視窗
}

//檢查是否顯示DIV內容
function fnCheckDisplayDiv()
{
	if(document.all["DisplayDiv"] == null)
		return;
	
	var strDisplayDiv = document.all["DisplayDiv"].value;
	if(strDisplayDiv == "true")
	{
	    // 1051004  Cloud      1050087     升級二代
	    //document.all["DivBulletin"].style.display = "block";
	    document.all["DivBulletin"].className = "";
	}
	else
	{
	    // 1051004  Cloud      1050087     升級二代
	    //document.all["DivBulletin"].style.display = "none";
	    document.all["DivBulletin"].className = "hide";
	}
}

//傳回電子檔數目
function fnGetFileCount()
{
	if(document.all["ListNum"] == null)
		return;
		
	return document.all["ListNum"].value;
}

//下載勾選電子檔
function fnDownload()
{
	var bChecked = false;
	
	//檢查CheckBox是否被勾選
	for(var i = 2; i < document.all["dg1"].rows.length+2; i++)
	{
		//0990625 David 0990024 改以cbSelect2判斷
		//if(document.all["dg1__ctl" + i + "_cbSelect"].checked)
		if(document.all["dg1__ctl" + i + "_cbSelect2"].checked)
			bChecked = true;
	}
	
	//沒有任何CheckBox被勾選時
	if(bChecked == false)
	{
		jf_ShowMsg("請至少勾選一個電子檔", "");
	}
	else
	{
		document.all["txDownload"].value = "Download"; //設定值告知Server需下載檔案
		//IsServerHandling = true;
		jf_ShowWaitState();
		__doPostBack("txDownload", ""); //PostBack回Server
	}
	return bChecked;
}

//按下連結時開啟子視窗
//1071107	Kevin_C	1071115	增加取得機關代碼
//function fnHyperLink(argBulletinId, argFileType, argSeqNo, argSAMLart, argbsStrusername)
function fnHyperLink(argBulletinId, argFileType, argSeqNo, argSAMLart, argbsStrusername, argOrgno)
{
    //1071107	Kevin_C	1071115	增加取得機關代碼
	//var strUrl = "TBI200.aspx?rtnObj=lbReturnValue&BulletinId=" + argBulletinId + "&FileType=" + argFileType;
    var strUrl = "TBI200.aspx?rtnObj=lbReturnValue&BulletinId=" + argBulletinId + "&FileType=" + argFileType + "&OrgNo=" + argOrgno;
	if(argSeqNo != "") //有附件檔時設定附件檔序號
	{
		strUrl += "&SeqNo=" + argSeqNo;
	}
	//開啟附件時若需身分驗證才需傳SAMLart
	if(argbsStrusername != "")
	{
	strUrl += "&KStr=" + argbsStrusername + "&OpenType=2";
	}
	else
	{
	strUrl += "&SAMLart=" + argSAMLart + "&OpenType=1";
	}
	//1051006	Cloud	1050087	升級二代
	//jf_OpenChildWin(strUrl, "");
	var $dlg = $("#dlgASPXPage").clone(true);
	$('body').append($dlg);
	var $frame = $dlg.find('iframe.aspx_page_content');
	if ($frame.length)
	{
		$frame[0].src = strUrl;
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle()
{
    // 1051004  Cloud      1050087     升級二代-函式保留，功能移至ClientButtonControl
	/*var xObjectName;
		
	if(IsServerHandling)
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	xObjectName= window.event.srcNode.getAttribute("ID");
	
	switch (xObjectName)
	{
		//以下屬於DataGrid ToolBar
	    
		case "btDownload":
			fnDownload();
			break;
		case "btFirst":
			fnChangeCount("btFirst");
			break;
		case "btPreview":
			fnChangeCount("btPreview");
			break;
		case "btNext":
			fnChangeCount("btNext");
			break;
		case "btLast":
			fnChangeCount("btLast");
			break;
		case "btChangePage":
			fnChangeCount("btChangePage");
			break;
	}*/
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function GetToolbarCtrl(argObjIndex)
{
	return document.all.tbSelect.getItem(argObjIndex);
}
function fnChangeCount(argType)
{
    // 1051004  Cloud      1050087     升級二代
	//var iCount = parseInt(GetToolbarCtrl(txViewPage_index).getAttribute("value"));
    //var iTotal = parseInt(GetToolbarCtrl(txTotalPage_index).getAttribute("value"));
    var iCount = parseInt(document.all["txViewPage"].value);
    var iTotal = parseInt(document.all["txTotalPage"].value);

	
	switch (argType)
	{
		case "btFirst":	//第一筆
			iCount = 1;
			break;
		case "btPreview":	//上一筆
			iCount--;
			break;
		case "btNext":	//下一筆
			iCount++;
			break;
		case "btLast":	//最後一筆
			iCount = iTotal;
			break;
		case "btChangePage":		//Go
			break;
	}
	if (iCount <= 0)
	{
	    // 1051004  Cloud      1050087     升級二代
	    //GetToolbarCtrl(txViewPage_index).focus();
	    $('txViewPage').focus();
	    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["筆數必須為正整數，請重新輸入。"])), "");
	    Page_BlockSubmit = true;
		return;
	}
	else if (isNaN(iCount) || iCount < 1 || iCount > iTotal)
	{
	    // 1051004  Cloud      1050087     升級二代
	    //GetToolbarCtrl(txViewPage_index).focus();
	    $('txViewPage').focus();
	    jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["筆數必須為介於1與" + iTotal + "之間，請重新輸入。"])), "");
	    Page_BlockSubmit = true;
		return;
	}
	else
	{
	    // 1051004  Cloud      1050087     升級二代
	//GetToolbarCtrl(txViewPage_index).setAttribute("value",iCount);
	    //fnSetToolbarCtrl(iCount, iTotal);
		document.all["txViewPage"].value = iCount;
		// 1051004  Cloud      1050087     升級二代-改為使用隱藏欄位
		//parent.fnReShow( parent.fnGetBulletinId(iCount-1) , iCount );
		document.all["H_SeqNo"].value = iCount;
		document.all["H_BulletinId"].value = parent.fnGetBulletinId(iCount - 1);
		document.all["H_BulletinNum"].value = parent.fnReShow(parent.fnGetBulletinId(iCount - 1), iCount);;
		//1060206	Cloud		Cloud		航港局-序393 一併修正切換頁無反應問題
		document.all["txDownload"].value = ""; //清空紀錄是否下載檔案之欄位值
		__doPostBack("txDownload", ""); //PostBack回Server
	}
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)--檔案下載功能
* 
*****************************************************************************/
//使用WsWrapper下載檔案至Client端(1:XML轉DOC 2:速報單轉DOC)
function DownLoadFileToClient(argMode)
{
	//1080214	Joe			1080179		弱掃修正Hardcoded Absolute Path
	// var strClientPath = "C:\\Temp\\";
	var strFileName = "";
	//1000209 David 1000174 新增正式公文預覽功能，調整參數判斷
	//if(argMode == "DI")
	if(argMode == "1" || argMode == "2")
		//1051004   Cloud   1050087 升級二代
		//strFileName = document.all.H_lbDi.innerText;
		strFileName = document.all.H_lbDi.textContent;
	else
		//1051004   Cloud   1050087 升級二代
		//strFileName = document.all.H_lbPdf.innerText;
		strFileName = document.all.H_lbPdf.textContent;
	//取得AP FileIO資訊
	// 1020904	Cloud	1020609	將原呼叫ws[getfile]行為修改為Ajax-S
	//var arWSParam = new Array(2);
	//arWSParam[0] = document.all.lbBulletinId.innerText;
	//arWSParam[1] = strFileName;
	//callObj = jf_CallWA(jf_Trim(tbws), "GetFile", false, arWSParam);

	//if(!jf_IsWebServiceSuccess(callObj))
		//return false;
	//var strWebService = callObj.value.Info.WebService;
	//var strApPath = callObj.value.Info.StartPath;
	//1060516 Zen 1060215 調整檔案下載行為
	//var callObj = TBI140.GetFile(document.all.H_Artifact.value, document.all.lbBulletinId.innerText, strFileName).value
	//1090702	Joe		1090485		弱掃修正XSS
	// var callObj = TB1.TBI140.GetFile(document.all.H_Artifact.value,document.all.lbBulletinId.innerText,strFileName).value
	var callObj = TB1.TBI140.GetFile(HtmlEncode(document.all.H_Artifact.value),HtmlEncode(document.all.lbBulletinId.innerText),HtmlEncode(strFileName)).value
	if(callObj[0]!="")
	{
		alert("取得檔案下載失敗，錯誤："+callObj[0]);
		return;
	}
    //1051004   Cloud   1050087 升級二代，此處僅支援附件pdf預覽，正式公文預覽/列印不進行因此，調整為由回傳物件中的SERVER檔案位置直接進行OPEN
    //後面功能皆MARK-正式公文預覽/列印暫不支援
    //1061210 Zen 1061210 修正附件PDF預覽功能異常之問題
	//jf_OpenChildWin("http://" + document.all.H_txTBSrvName.value + callObj[1], "")
	jf_OpenChildWin(callObj[1], "")

	/*var strApPath = callObj[1];
	var strWebService = callObj[2];
	// 1020904	Cloud	1020609	將原呼叫ws[getfile]行為修改為Ajax-E
	
	//1000517 David 1000452 不須登入時，由隱藏欄位取得Artifact
	var strArtifact = jf_GetArtifact();
	if(document.all.H_txLogin.value == "N")
		strArtifact = document.all.H_Artifact.value;
	try
	{
		//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
		if ( document.all.II_USE_SSL != null )
		{
			if ( document.all.II_USE_SSL.value == "Y" )
				strWebService = strWebService.replace("http://", "https://") ;
		}
		
		document.all.WsWrapper.Init(strWebService);
		//AddFile(server path, filename);
		document.all.WsWrapper.AddFile(strApPath, strFileName);
		//Download(artifact, isdelsource, client path)
		document.all.WsWrapper.Download(strArtifact, false, strClientPath);
	}
	catch(e)
	{
		alert("下載失敗");
		return;
	}
	//1000209 David 1000174 新增正式公文預覽功能，調整參數判斷
	//if(argMode == "DI")
	if(argMode == "1" || argMode == "2")
	{
		var idx = strFileName.lastIndexOf(".");
		var strLocalPdfName = strFileName.substring(0, idx) + ".pdf";
		var FilePdfName = strClientPath + strLocalPdfName;
		//FilePdfName = "file://" + FilePdfName;
		FilePdfName = FilePdfName;
		var cvtResult = fnOnConvertDi(strClientPath + strFileName ,FilePdfName );
		if(cvtResult == false)
		{
			alert("轉換DI失敗.");
			return;
		}

		//1000209 David 1000174 新增正式公文預覽功能，依參數判斷進行列印或預覽
		if(argMode == "1")//列印
		{
			//1050603	Kevin_C		1050293		修正式公文列印沒反應的問題 -S
			//ht = new ActiveXObject("DnP.PrintPDF");
			//ht.PlugInSource = document.all["H_lbPlugInSource"].innerText;
			//ht.Print("file://" + FilePdfName);
			//ht.Print(FilePdfName);
			var oShell = new ActiveXObject("Shell.Application");
			var commandtoRun = "file://" + FilePdfName;
			oShell.ShellExecute(commandtoRun, "", "", "print", "0");
			//1050603	Kevin_C		1050293		修正式公文列印沒反應的問題 -E
		}
		else if(argMode == "2")//預覽
		{
			//上傳PDF檔至SERVER WORKPATH
			//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
			//document.all.WsWrapper.Init(document.all.H_txWebService.value);
			var serviceURL = document.all.H_txWebService.value ;
			if ( document.all.II_USE_SSL != null )
			{
				if ( document.all.II_USE_SSL.value == "Y" )
					serviceURL = serviceURL.replace("http://", "https://") ;
			}
			document.all.WsWrapper.Init(serviceURL);
			
			document.all.WsWrapper.AddFile(document.all.H_txWorkPath.value, strLocalPdfName, strClientPath);
			document.all.WsWrapper.Upload(strArtifact, true);
			//開啟檔案
			//1031112	Cloud	配合SSL修改開啟網址
			//window.open("http://" + document.all.H_txTBSrvName.value + "/workpath/" + strLocalPdfName);
			jf_OpenChildWin("http://" + document.all.H_txTBSrvName.value + "/workpath/" + strLocalPdfName,"");
		}
	}
	else
	{
		ht = new ActiveXObject("DnP.PrintPDF");
		ht.PlugInSource = document.all["H_lbPlugInSource"].innerText;
		ht.Print(strClientPath + strFileName);	
	}*/
}

//strDIName指的是xml檔
//1051004   Cloud   [1050087] 此段不支援-待二待重新找新方法
/*function fnOnConvertDi(strDIName , strPDFName)
{
	var sPrintXSLPathName = "";

	var fso = new ActiveXObject("Scripting.FileSystemObject");
	if(!fso.FileExists(strDIName))
		return false;
	var pFile = fso.OpenTextFile(strDIName, 1, false);
	if(pFile == null)
		return false;
	var strDiInfo = pFile.ReadAll();
	pFile.Close();

	var xdoc = new ActiveXObject("MSXML2.DOMDocument");
	xdoc.async = false;
	xdoc.resolveExternals = false;
	xdoc.load(strDIName);
	if(xdoc.documentElement.nodeName == null || xdoc.documentElement.nodeName == "")
	{
		alert("DI格式有誤。");
		return false;
	}

	var sDocType = xdoc.documentElement.nodeName;
	//1010112 David 1010023 判斷是否有子類別，如無再使用文別
	var DocTypeNode = xdoc.selectNodes("//函類別 | //令類別");
	for(var iNodes = 0 ; iNodes < DocTypeNode.length ; iNodes++)
	{
		var ChildType = DocTypeNode[iNodes].attributes.getNamedItem("代碼");
		if(ChildType != null && ChildType.text != "")
			sDocType = ChildType.text;
	}

	//取得xsl檔全徑名
	for (var i=0; i<document.all.lbPrintXSLPath.options.length; i++)
	{
	    //1050406   Kenny   [1050133]   修改判斷文別方式，避免如：DI取得的是「函」卻先判斷到「書函」(因config設定順序)此種狀況而導致錯誤
	    //if (document.all.lbPrintXSLPath.options[i].text.indexOf(sDocType) != -1)
	    if (document.all.lbPrintXSLPath.options[i].text == sDocType)
		{
			sPrintXSLPathName = document.all.lbPrintXSLPath.options[i].value;
			break;
		}
	}

	if(sPrintXSLPathName == "")
	{
		alert("沒有對應的XSL檔供轉換。");
		return false;
	}
	var objret = document.all["exp"];
	try {
		//exp.OrgNo = orgNo.value;
		objret.PrintXSLFileName = sPrintXSLPathName;
		var AllowName = document.all["H_lbAllowName"].innerText;
		var bKeepSecret	= false;	//行文單位保密
		var bStamp	= false;	//是否加蓋正副抄本章
		var bSeal	= false;	//騎縫章
		var bPageNo	= true;		//頁碼
		var bBarcode	= false;	//條碼
		objret.DocName	= xdoc.documentElement.nodeName + "（稿一）";
		//1000112 David 0991063 新增顯示交換章戳(樣板須配合修改)
		objret.AppendExchStamp = 1;
		var ret = objret.ConvertDIFile(strDIName, strPDFName, AllowName, "", bKeepSecret, bStamp, bSeal, bPageNo, bBarcode, "");
		return true;
	}catch(e) {
		alert(e.message + " " + objret.ProcResult);
	}

	return false;
}*/
//cloud- 無用 mark
/*function fnContextMenu()
{
	if(document.selection.type == "Text")
		event.cancelBubble = true;
}*/

//0990625 David 0990024 附件顯示邏輯調整，附件下載配合修正
function fnCheckAttItem(strCheckId)
{
	//1060206	Cloud	航港局-序393 修正壓縮下載異常問題
	//var Row = strCheckId.id.substr(0,strCheckId.id.lastIndexOf("_")+1);
	var Row = strCheckId.substr(0,strCheckId.lastIndexOf("_")+1);
	var lbFileType = Row + "lbFileType";
    //1051004   Cloud   1050087 升級二代
    //var FileType = document.all[lbFileType].innerText;
    var FileType = document.all[lbFileType].textContent;
	if(FileType == "AttTitle" || FileType == "FromAttTitle")
	{
		var type = "1";
		if(FileType == "FromAttTitle")
			type = "4";
		for(var i = 2; i < document.all["dg1"].rows.length+2; i++)
		{
		    //1051004   Cloud   1050087 升級二代
		    //if(document.all["dg1__ctl" + i + "_lbFileType"].innerText == type)
		    if (document.all["dg1__ctl" + i + "_lbFileType"].textContent == type)
			{
				if(document.all[Row+"cbSelect"].checked)
					document.all["dg1__ctl" + i + "_cbSelect2"].checked = true;
				else
					document.all["dg1__ctl" + i + "_cbSelect2"].checked = false;
			}
		}
	}
	else if(FileType == "1" || FileType == "4")
	{
		var AllCkeck = true;
		for(var i = 2; i < document.all["dg1"].rows.length+2; i++)
		{
		    //1051004   Cloud   1050087 升級二代
		    //if(document.all["dg1__ctl" + i + "_lbFileType"].innerText == FileType)
		    if (document.all["dg1__ctl" + i + "_lbFileType"].textContent == FileType)
			{
				if(!document.all["dg1__ctl" + i + "_cbSelect2"].checked)
				{
					AllCkeck = false;
					break;
				}
			}
		}
		var Title = "AttTitle";
		if(FileType == "4")
			Title = "FromAttTitle";
		
		for(var i = 2; i < document.all["dg1"].rows.length+2; i++)
		{
		    //1051004   Cloud   1050087 升級二代
		    //if(document.all["dg1__ctl" + i + "_lbFileType"].innerText == Title)
		    if (document.all["dg1__ctl" + i + "_lbFileType"].textContent == Title)
			{
				if(AllCkeck)
					document.all["dg1__ctl" + i + "_cbSelect"].checked = true;
				else
					document.all["dg1__ctl" + i + "_cbSelect"].checked = false;
				break;
			}
		}
	}
	else
	{
		if(document.all[Row+"cbSelect"].checked)
			document.all[Row+"cbSelect2"].checked = true;
		else
			document.all[Row+"cbSelect2"].checked = false;
	}
}

//1090702	Joe		1090485		弱掃修正XSS--S
function HtmlEncode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}
//1090702	Joe		1090485		弱掃修正XSS--E