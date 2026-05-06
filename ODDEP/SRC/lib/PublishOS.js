/*
DATE	SA		PRG		MGR_NO		DESC
1000902	David	David	1000678		新增海外發文共用Function
1010426	David	David	1010297		公文PDF改為依受文者各數轉出，調整附件邏輯
1010608	David	David	1010557		受文者新增判斷是否含附件
1010608	David	David	1010539		受文者依稿件個別判斷，並修正程式邏輯FOR ODT351叫用(以OST120_IN也會叫用，目前該程式廢除)
1021224	David	David	-------		無附件時不需上傳，避免錯誤
1031028	Leslie	Kenny	1030836		配合SSL修改傳入元件之URL
1040617	Leslie 	Gabby	1040324		增加WebFileIO錯誤訊息處理
1060220	David	David	-------		修正海外上傳公文PDF WSWrapper.init異常問題
1070824	Kevin   Joe     1070678 	修正弱掃Hardcoded Absolute Path
*/
function jf_PublishOS(strArtifact,argSourceOrgno,argOsDocInfo,argOsIssueInfo,argOsAttInfo)
{
	var rtn = new rtnObject();
	var strWs = document.all.H_OS_WS.value;

	//取得公文實體檔資訊及OS Server資訊
	var arWSParam = new Array();
	arWSParam[0] = argSourceOrgno;
	arWSParam[1] = argOsDocInfo.DocNo;
	callObj = jf_CallWS(strWs,"GetServerDocFileInfo", false, arWSParam);
	var _SaveL = callObj.value;
	if(!_SaveL.bSuccess)
	{
		rtn.bSuccess = false;
		rtn.ErrMsg = _SaveL.ErrMsg;
		return rtn;
	}

	var serviceURL = _SaveL.WebService;
	var FilePath = _SaveL.FullPath+"-00-99";
	//1070824	Joe		1070678		修正弱掃Hardcoded Absolute Path
	// var local = "C:\\TEMP\\OS\\"+argOsDocInfo.DocNo+"\\";
	CreateAllFolder(local);

	try
	{
		var soap = new ActiveXObject("WSWrapper.WebFileIO");
		//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
		if ( document.all.II_USE_SSL != null )
		{
			if ( document.all.II_USE_SSL.value == "Y" )
				serviceURL = serviceURL.replace("http://", "https://") ;
		}
		
		soap.Init(serviceURL);
		soap.AddFile(FilePath,"");
		soap.Download(strArtifact, false, local);
	}
	catch(ex)
	{
		var ErrorMessage = ex.message;
		rtn.bSuccess = false;
		//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
		//rtn.ErrMsg = "下載公文稿件檔案時發生錯誤，無法進行海外發文，訊息為："+ErrorMessage;
		if (soap.hasError)
			ErrorMessage += soap.ErrorMessage;
		rtn.ErrMsg = "連接伺服器"+serviceURL+"下載公文稿件檔案時發生錯誤，無法進行海外發文，訊息為："+ErrorMessage;
		//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
		return rtn;
	}

	var xdoc = new ActiveXObject("MSXML2.DOMDocument.3.0");
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	if(!fso.FileExists(local+"DraftMgmt.XML"))
	{
		rtn.bSuccess = false;
		rtn.ErrMsg = "公文文號["+argOsDocInfo.DocNo+"]之稿件資源檔不存在，無法進行海外發文";
		return rtn;
	}
	xdoc.load(local+"DraftMgmt.XML");
	var nodelist = xdoc.selectNodes("//文稿");

	var bKeepSecret = false;	//行文單位保密
	var bStamp = true;			//是否加蓋正副抄本章
	var bSeal = false;			//騎縫章
	var bPageNo = true;			//頁碼
	var bBarcode = false;		//條碼

	//1010608 David 1010539 受文者依稿件個別判斷，所以可能公文多個稿發海外，調整程式邏輯--START
	//舊程式行為--START
	//取得第一份稿件檔名
	/*var FirstXmlName = nodelist[0].attributes.getNamedItem("路徑").value;
	if(!fso.FileExists(local+FirstXmlName))
	{
		rtn.bSuccess = false;
		rtn.ErrMsg = "公文文號["+argOsDocInfo.DocNo+"]之稿件一不存在，無法進行海外發文";
		return rtn;
	}
	//將第一份稿件轉成PDF
	var DiFileName = local+FirstXmlName;
	//1010426 David 1010297 公文PDF可能有多份，調整宣告位置
	//var PdfName = local+argOsDocInfo.DocNo+".pdf";

	//1010426 David 1010297 公文PDF資訊單獨紀錄
	var argDocPdfInfo = new DocPdfInfo();

	//1010426 David 1010297 紀錄不重複的受文者資訊
	var ExistOuId = "";
	var argIssueInfo = new IssueInfo();

	//1010426 David 1010297 公文PDF依受文者數量轉出
	for(var iPdf = 0 ; iPdf < argOsDocInfo.OuId.length ; iPdf++)
	{
		//1010426 David 1010297 公文PDF可能有多份，調整宣告位置
		var PdfSeq = (iPdf+1)+"";
		var PdfName = local+argOsDocInfo.DocNo+"-"+PdfSeq+".pdf";
		try
		{
			//1010426 David 1010297 轉PDF傳入受文者名稱
			//var strAttErrMsg = document.all["PDF"].ConvertDIFile(DiFileName,PdfName,"","",bKeepSecret,bStamp,bSeal,bPageNo,bBarcode,argOsDocInfo.DocNo);
			var strAttErrMsg = document.all["PDF"].ConvertDIFile(DiFileName,PdfName,argOsDocInfo.OuName[iPdf],"",bKeepSecret,bStamp,bSeal,bPageNo,bBarcode,argOsIssueInfo.DocNo);
			if(strAttErrMsg != "")
			{
				rtn.bSuccess = false;
				rtn.ErrMsg = "公文文號["+argOsDocInfo.DocNo+"]轉出PDF檔有誤，錯誤訊息：\n" + strAttErrMsg;
				return rtn;
			}
		}
		catch(ex)
		{
			var ErrorMessage = ex.message;
			rtn.bSuccess = false;
			rtn.ErrMsg = "公文文號["+argOsDocInfo.DocNo+"]轉出PDF檔有誤，錯誤訊息：\n" + ErrorMessage;
			return rtn;
		}

		//1010426 David 1010297 紀錄公文PDF資訊
		argDocPdfInfo.PdfName[argDocPdfInfo.PdfName.length] = argOsDocInfo.DocNo+"-"+PdfSeq+".pdf";
		argDocPdfInfo.OuId[argDocPdfInfo.OuId.length] = argOsIssueInfo.OuId[iPdf];

		//1010426 David 1010297 紀錄不重複的受文者資訊
		if(ExistOuId.indexOf(argOsIssueInfo.OuId[iPdf]) == -1)
		{
			ExistOuId += ","+argOsIssueInfo.OuId[iPdf];
			argIssueInfo.OuId[argIssueInfo.OuId.length] = argOsIssueInfo.OuId[iPdf];
			argIssueInfo.OuName[argIssueInfo.OuId.length] = argOsIssueInfo.OuName[iPdf];
			argIssueInfo.IssueWord[argIssueInfo.OuId.length] = argOsIssueInfo.IssueWord[iPdf];
			argIssueInfo.IssueNo[argIssueInfo.OuId.length] = argOsIssueInfo.IssueNo[iPdf];
			//1010608 David 1010557 紀錄是否含附件
			argIssueInfo.HasAttach[argIssueInfo.OuId.length] = argOsIssueInfo.HasAttach[iPdf];
		}
	}

	var ActuallyUpload = new Array();	//紀錄檔案名稱
	var UploadPath = new Array();		//紀錄檔案於Client位置

	//將PDF檔設定為實際要上傳的第一個附件
	//1010426 David 1010297 公文PDF另外紀錄，調整邏輯
	//ActuallyUpload[0] = argOsDocInfo.DocNo+".pdf";
	//UploadPath[0] = local;

	//由第一份稿件取得附件名稱並記錄
	xdoc.load(local+FirstXmlName);
	var AttNoseList = xdoc.selectNodes("//附件列表/附件檔名");
	var DocAtt = new Array();
	for(var i = 0 ; i < AttNoseList.length ; i++)
	{
		DocAtt[i] = AttNoseList[i].text;
	}

	//如傳入之附件資訊已有附件，一併紀錄
	for(var j = 0 ; j < argAttInfo.FileName.length ; j++)
	{
		var IsDocAtt = false;
		//比對是否為公文附件
		for(var iDocAtt = 0 ; iDocAtt < DocAtt.length ; iDocAtt++)
		{
			if(DocAtt[iDocAtt] == argAttInfo.FileName[j])
			{
				ActuallyUpload[ActuallyUpload.length] = argAttInfo.FileName[j];
				UploadPath[UploadPath.length] = local;
				IsDocAtt = true;
				continue;
			}
		}

		//如不是公文附件，紀錄實際位置及名稱
		if(!IsDocAtt)
		{
			ActuallyUpload[ActuallyUpload.length] = argAttInfo.FileName[j];
			UploadPath[UploadPath.length] = argAttInfo.FilePath[j];
		}
	}

	try
	{
		//上傳檔案至海外Server暫存區
		var UploadAttInfo = new AttInfo();
		var OsFilePath = _SaveL.OsWorkPath+argOsDocInfo.DocNo+"\\"
		var soapUpLoad = new ActiveXObject("WSWrapper.WebFileIO");
		soapUpLoad.Init(_SaveL.OsWebService);
		for(var iAtt = 0 ; iAtt < ActuallyUpload.length ; iAtt++)
		{
			soapUpLoad.AddFile(OsFilePath, ActuallyUpload[iAtt], UploadPath[iAtt]);	
			UploadAttInfo.FileName[iAtt] = ActuallyUpload[iAtt];
			UploadAttInfo.FilePath[iAtt] = OsFilePath;//紀錄檔案在海外暫存區的位置
		}
		soapUpLoad.Upload(strArtifact, true);
		
		//1010426 David 1010297 上傳公文PDF至海外Server暫存區
		var soapPdfUpLoad = new ActiveXObject("WSWrapper.WebFileIO");
		soapPdfUpLoad.Init(_SaveL.OsWebService);
		for(var i = 0 ; i < argDocPdfInfo.PdfName.length ; i++)
		{
			soapPdfUpLoad.AddFile(OsFilePath, argDocPdfInfo.PdfName[i], local);	
			argDocPdfInfo.PdfPath[i] = OsFilePath;//紀錄檔案在海外暫存區的位置
		}
		soapPdfUpLoad.Upload(strArtifact, true);
		
	}
	catch(ex)
	{
		var ErrorMessage = ex.message;
		rtn.bSuccess = false;
		rtn.ErrMsg = "上傳公文檔案至海外暫存區時發生錯誤，訊息為："+ErrorMessage;
		return rtn;
	}

	//呼叫WS將資料寫入DB及將檔案搬移至海外正式儲存區
	var arWSParam = new Array();
	arWSParam[0] = argOsDocInfo;
	//1010426 David 1010297 改為傳入不重複的受文者資訊
	//arWSParam[1] = argOsIssueInfo;
	arWSParam[1] = argIssueInfo;
	arWSParam[2] = UploadAttInfo;
	//1010426 David 1010297 新增傳入公文PDF資訊物件
	arWSParam[3] = argDocPdfInfo;
	callObj = jf_CallWS(strWs,"PublishOsWs", false, arWSParam);
	var RtnObject = callObj.value;
	if(!RtnObject.m_bSuccess)
	{
		rtn.bSuccess = false;
		rtn.ErrMsg = RtnObject.m_strErrMsg;
		return rtn;
	}
	else
	{
		rtn.bSuccess = true;
		rtn.ErrMsg = "";
	}*/
	//舊程式行為--END


	//傳入WS參數設定
	var WsOsDocInfo = new Array();
	var WsOsIssueInfo = new Array();
	var WsOsAttInfo = new Array();
	var WsOsDocPdfInfo = new Array();

	//由受文者判斷哪份稿件要發海外文
	var OldDraft = "";
	var bDraftChange = false;
	var xNowdoc = new ActiveXObject("MSXML2.DOMDocument.3.0");
	var NewOsDocInfo = new OsDocInfo();
	var NewOsIssueInfo = new OsIssueInfo();
	var NewOsAttInfo = new OsAttInfo();
	var NewOsDocPdfInfo = new OsDocPdfInfo();
	var iPdf = 1;
	var NowXmlName = "";
	for(var iIssue = 0 ; iIssue < argOsIssueInfo.OuId.length ; iIssue++)
	{
		var NowDraft = argOsIssueInfo.DraftNo[iIssue];
		var NowDocNo = argOsIssueInfo.IssueNo[iIssue];

		if(OldDraft != NowDraft)
		{
			OldDraft = NowDraft;
			NowXmlName = nodelist[NowDraft-1].attributes.getNamedItem("路徑").value;
			bDraftChange = true;
		}

		//將已處理完成之物件紀錄至傳入物件中
		if(bDraftChange && iIssue != 0)
		{
			WsOsDocInfo[WsOsDocInfo.length]		= NewOsDocInfo;
			WsOsIssueInfo[WsOsIssueInfo.length]	= NewOsIssueInfo;
			WsOsAttInfo[WsOsAttInfo.length]		= NewOsAttInfo;
			WsOsDocPdfInfo[WsOsDocPdfInfo.length]	= NewOsDocPdfInfo;
		}

		if(bDraftChange)//稿件改變，設定目前稿件資訊物件
		{
			//初始化
			NewOsDocInfo = new OsDocInfo();
			NewOsDocPdfInfo = new OsDocPdfInfo();
			NewOsIssueInfo = new OsIssueInfo();
			NewOsAttInfo = new OsAttInfo();
			bDraftChange = false;
			iPdf = 1;
	
			//DocInfo
			if(!fso.FileExists(local+NowXmlName))
			{
				rtn.bSuccess = false;
				rtn.ErrMsg = "公文文號["+NowDocNo+"]之稿件["+NowDraft+"]不存在，無法進行海外發文";
				return rtn;
			}

			xNowdoc.load(local+NowXmlName);
			NewOsDocInfo.DocNo = NowDocNo;
			var SubjectNode = xNowdoc.selectSingleNode("//主旨/文字");
			if(SubjectNode)
				NewOsDocInfo.Subject = SubjectNode.text;
			else
				NewOsDocInfo.Subject = argOsDocInfo.Subject;

			var RootName = xNowdoc.documentElement.nodeName;
			var strDocCategory = "";
			if(RootName == "函")
			{
				var DocCategoryNode = xNowdoc.selectSingleNode("//函類別");
				if(DocCategoryNode)
					strDocCategory = DocCategoryNode.attributes[0].value;
			}
			else if(RootName == "令")
			{
				var DocCategoryNode = xNowdoc.selectSingleNode("//令類別");
				if(DocCategoryNode)
					strDocCategory = DocCategoryNode.attributes[0].value;
			}
			if(strDocCategory == "")
				strDocCategory = RootName;

			NewOsDocInfo.DocCategory = strDocCategory;

			NewOsDocInfo.OuId = argOsDocInfo.OuId;
			NewOsDocInfo.OuName	= argOsDocInfo.OuName;
			NewOsDocInfo.UserName = argOsDocInfo.UserName;
			NewOsDocInfo.EmpName = argOsDocInfo.EmpName;
			NewOsDocInfo.SpdNo = argOsDocInfo.SpdNo;
			NewOsDocInfo.IssueDate = argOsDocInfo.IssueDate;
			NewOsDocInfo.IssueTime = argOsDocInfo.IssueTime;
			NewOsDocInfo.IssueOuId = argOsDocInfo.IssueOuId;
			NewOsDocInfo.IssueOuName = argOsDocInfo.IssueOuName;
			NewOsDocInfo.IssueUserName = argOsDocInfo.IssueUserName;
			NewOsDocInfo.IssueEmpName = argOsDocInfo.IssueEmpName;
			
			////紀錄附件資訊
			for(var iAtt = 0 ; iAtt < argOsAttInfo.FileName.length ; iAtt++)
			{
				if(argOsAttInfo.DraftNo[iAtt] == NowDraft)
				{
					NewOsAttInfo.FileName[NewOsAttInfo.FileName.length] = argOsAttInfo.FileName[iAtt];
					NewOsAttInfo.FilePath[NewOsAttInfo.FilePath.length] = local;
				}
			}
		}

		//轉出受文者對應的PDF檔
		var PdfSeq = iPdf+"";
		var PdfName = NowDocNo + "-" + PdfSeq+".pdf";
		try
		{
			var strAttErrMsg = document.all["PDF"].ConvertDIFile(local+NowXmlName,local+PdfName,argOsIssueInfo.OuName[iIssue],"",bKeepSecret,bStamp,bSeal,bPageNo,bBarcode,argOsDocInfo.DocNo);
			if(strAttErrMsg != "")
			{
				rtn.bSuccess = false;
				rtn.ErrMsg = "公文文號["+argOsDocInfo.DocNo+"]轉出PDF檔有誤，錯誤訊息：\n" + strAttErrMsg;
				return rtn;
			}
		}
		catch(ex)
		{
			var ErrorMessage = ex.message;
			rtn.bSuccess = false;
			rtn.ErrMsg = "公文文號["+argOsDocInfo.DocNo+"]轉出PDF檔有誤，錯誤訊息：\n" + ErrorMessage;
			return rtn;
		}
		iPdf++;

		//紀錄公文PDF資訊
		NewOsDocPdfInfo.PdfName[NewOsDocPdfInfo.PdfName.length] = PdfName;
		NewOsDocPdfInfo.OuId[NewOsDocPdfInfo.OuId.length] = argOsIssueInfo.OuId[iIssue];

		//紀錄受文者資訊
		NewOsIssueInfo.OuId[NewOsIssueInfo.OuId.length] = argOsIssueInfo.OuId[iIssue];
		//1060220 David 修正NewOsIssueInfo物件內錯誤問題
		/*NewOsIssueInfo.OuName[NewOsIssueInfo.OuId.length] = argOsIssueInfo.OuName[iIssue];
		NewOsIssueInfo.IssueWord[NewOsIssueInfo.OuId.length] = argOsIssueInfo.IssueWord[iIssue];
		NewOsIssueInfo.IssueNo[NewOsIssueInfo.OuId.length] = argOsIssueInfo.IssueNo[iIssue];
		NewOsIssueInfo.HasAttach[NewOsIssueInfo.OuId.length] = argOsIssueInfo.HasAttach[iIssue];*/
		NewOsIssueInfo.OuName[NewOsIssueInfo.OuName.length] = argOsIssueInfo.OuName[iIssue];
		NewOsIssueInfo.IssueWord[NewOsIssueInfo.IssueWord.length] = argOsIssueInfo.IssueWord[iIssue];
		NewOsIssueInfo.IssueNo[NewOsIssueInfo.IssueNo.length] = argOsIssueInfo.IssueNo[iIssue];
		NewOsIssueInfo.HasAttach[NewOsIssueInfo.HasAttach.length] = argOsIssueInfo.HasAttach[iIssue];

		//將最後一筆處理完成之物件紀錄至傳入物件中
		if(iIssue+1 == argOsIssueInfo.OuId.length)
		{
			WsOsDocInfo[WsOsDocInfo.length]		= NewOsDocInfo;
			WsOsIssueInfo[WsOsIssueInfo.length]	= NewOsIssueInfo;
			WsOsAttInfo[WsOsAttInfo.length]		= NewOsAttInfo;
			WsOsDocPdfInfo[WsOsDocPdfInfo.length]	= NewOsDocPdfInfo;
		}
	}

	try
	{
		//上傳附件檔案至海外Server暫存區
		var OsFilePath = _SaveL.OsWorkPath+argOsDocInfo.DocNo+"\\"
		var soapUpLoad = new ActiveXObject("WSWrapper.WebFileIO");
		//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
		//soapUpLoad.Init(_SaveL.OsWebService);
		var serviceURL = _SaveL.OsWebService ;
		if ( document.all.II_USE_SSL != null )
		{
			if ( document.all.II_USE_SSL.value == "Y" )
				serviceURL = serviceURL.replace("http://", "https://") ;
		}
		soapUpLoad.Init(serviceURL);
		
		//1021224 David 判斷是否需上傳檔案
		var bNeedUploadAtt = false
		for(var iDraft = 0 ; iDraft < WsOsAttInfo.length ; iDraft++)
		{
			for(var iAtt = 0 ; iAtt < WsOsAttInfo[iDraft].FileName.length ; iAtt++)
			{
				soapUpLoad.AddFile(OsFilePath, WsOsAttInfo[iDraft].FileName[iAtt], local);
				WsOsAttInfo[iDraft].FilePath[iAtt] = OsFilePath;//紀錄檔案在海外暫存區的位置
				bNeedUploadAtt = true;
			}
		}
		//1021224 David 有檔案才需上傳
		if(bNeedUploadAtt)
			soapUpLoad.Upload(strArtifact, true);
		
		//上傳公文PDF至海外Server暫存區
		var soapPdfUpLoad = new ActiveXObject("WSWrapper.WebFileIO");
		//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
		//soapPdfUpLoad.Init(_SaveL.OsWebService);
		//1060220 David 修正海外上傳供文PDF WSWrapper.init異常問題
		/*var serviceURL = _SaveL.OsWebService ;
		if ( document.all.II_USE_SSL != null )
		{
			if ( document.all.II_USE_SSL.value == "Y" )
				serviceURL = serviceURL.replace("http://", "https://") ;
		}
		soapUpLoad.Init(serviceURL);*/
		soapPdfUpLoad.Init(serviceURL);
		
		for(var iDraft = 0 ; iDraft < WsOsDocPdfInfo.length ; iDraft++)
		{
			for(var iPdf = 0 ; iPdf < WsOsDocPdfInfo[iDraft].PdfName.length ; iPdf++)
			{
				soapPdfUpLoad.AddFile(OsFilePath, WsOsDocPdfInfo[iDraft].PdfName[iPdf], local);
				WsOsDocPdfInfo[iDraft].PdfPath[iPdf] = OsFilePath;//紀錄檔案在海外暫存區的位置
			}
		}
		soapPdfUpLoad.Upload(strArtifact, true);
	}
	catch(ex)
	{
		var ErrorMessage = ex.message;
		rtn.bSuccess = false;
		//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
		//rtn.ErrMsg = "上傳公文檔案至海外暫存區時發生錯誤，訊息為："+ErrorMessage;
		if (soapPdfUpLoad.hasError)
			ErrorMessage += soapPdfUpLoad.ErrorMessage;
		rtn.ErrMsg = "連接伺服器"+serviceURL+"上傳公文檔案至海外暫存區時發生錯誤，訊息為："+ErrorMessage;
		//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
		return rtn;
	}

	//呼叫WS將資料寫入DB及將檔案搬移至海外正式儲存區
	var arWSParam = new Array();
	arWSParam[0] = WsOsDocInfo;
	arWSParam[1] = WsOsIssueInfo;
	arWSParam[2] = WsOsAttInfo;
	arWSParam[3] = WsOsDocPdfInfo;
	callObj = jf_CallWS(strWs,"PublishOsWsBatch", false, arWSParam);
	var RtnObject = callObj.value;
	if(!RtnObject.m_bSuccess)
	{
		rtn.bSuccess = false;
		rtn.ErrMsg = RtnObject.m_strErrMsg;
		return rtn;
	}
	else
	{
		rtn.bSuccess = true;
		rtn.ErrMsg = "";
	}

	//1010608 David 1010539 受文者依稿件個別判斷，所以可能公文多個稿發海外，調整程式邏輯--END

	rtn.bSuccess = true;
	return rtn;
}

function CreateAllFolder(argPath)
{
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	if(argPath.lastIndexOf("\\") != argPath.length - 1)
		argPath += "\\";
	var idx = argPath.indexOf("\\");
	idx = argPath.indexOf("\\", idx + 1);
	while(idx != -1)
	{
		var subPath = argPath.substring(0, idx);
		if(fso.FolderExists(subPath) == false)
			fso.CreateFolder(subPath);
		idx = argPath.indexOf("\\", idx + 1);
	}
}

function rtnObject()
{
	this.bSuccess = false;
	this.ErrMsg = "";
}

//附件資訊物件
function OsAttInfo()
{
	this.FileName = new Array();	//檔案名稱
	this.FilePath = new Array();	//於AP SERVER上的路徑
	//1010608 David 1010539 紀錄附件所屬稿號
	this.DraftNo  = new Array();	//稿號
}

//1010426 David 1010297 新增宣告受文者資訊物件
function OsIssueInfo()
{
	this.OuId = new Array();		//受文者單位代碼
	this.OuName = new Array();		//受文者單位名稱
	this.IssueWord = new Array();	//發文字
	this.IssueNo = new Array();		//發文號
	//1010608 David 1010557 新增紀錄是否含附件
	this.HasAttach = new Array();	//是否含附件
	//1010608 David 1010539 新增紀錄稿號
	this.DraftNo = new Array();		//稿號
}

//1010426 David 1010297 新增紀錄公文PDF資訊物件
function OsDocPdfInfo()
{
	this.PdfName = new Array(); //PDF名稱
	this.PdfPath = new Array();	//PDF於AP Server上的路徑
	this.OuId = new Array();	//PDF屬於那個單位
}

//1010608 David 1010539 公文資訊物件
function OsDocInfo()
{
	this.DocNo			= "";	//公文文號
	this.OuId			= "";	//承辦單位代碼
	this.OuName			= "";	//承辦單位名稱
	this.UserName		= "";	//承辦人帳號
	this.EmpName		= "";	//承辦人名稱
	this.Subject		= "";	//主旨
	this.SpdNo			= "";	//速別代碼
	this.DocCategory	= "";	//文別
	this.IssueDate		= "";	//發文日期
	this.IssueTime		= "";	//發文時間
	this.IssueOuId		= "";	//發文單位代碼
	this.IssueOuName	= "";	//發文單位名稱
	this.IssueUserName	= "";	//發文人員帳號
	this.IssueEmpName	= "";	//發文人員名稱
}