/*
DATE	SA		PRG		MGR_NO			DESC
0960113	Stella	David	000146			台科大電子交換
0981203			Albert	0980336			修正視窗長寬之設定
0990831	------	David	0990552			修改交換路徑設定子視窗，相關取值方式修正
0990916	------	David	0990618			新增99年電子檔轉出版本
1000126	------	David	0990683			EMAIL通知改為分址列印
1010705	Yvonne	Yvonne	1010502			調整ISSUE.XML存放路徑
1011005 Yvonne	Kevin	--				修正抄本寄送Email，稿件有簽會壞掉Bug。
1031028	Leslie	Kenny	1030836			配合SSL修改傳入元件之URL
1040617	Leslie 	Gabby	1040324			增加WebFileIO錯誤訊息處理
1050906	David	David	1050087			二代修改
1051230	David	David	-------			修正無法轉出104B版本的DI
1070817 Kevin   Kevin_C 1070678     	弱掃Hardcoded Absolute Path修正
1070824 Kevin   Joe 	1070678     	弱掃Hardcoded Absolute Path修正
*/
function ShowMsg()
{
    //1050906 David 1050087 
	/*if (document.all["ValidationSummary1"].innerText != "")
		alert(document.all["ValidationSummary1"].innerText);*/
    jf_ShowValidator();
}

function ClientOnLoadCommon()
{
	ShowMsg();
	//all marked by Leslie
	/*jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
	jf_CallWS("ODT351WS.asmx","UpdateSendDocInfo",false,null);
	jf_CallWS("ODT351WS.asmx","UpdateSendDocInfoBatch",false,null);
	jf_CallWS("ODT351WS.asmx","TransferDI",false,null);
	jf_CallWS("ODT351WS.asmx","Bulletin",false,null);
	jf_CallWS("ODT351WS.asmx","IsEmailNotify",false,null);
	jf_CallWS("ODT351WS.asmx","EmailNotify",false,null);*/
}

//設定電子發文路徑
function jf_SetupPath(argType)
{
    //1050906 David 1050087 二代轉DI修改，已無作用
	/*var sFeatures="dialogWidth: 450px;dialogHeight:350px;status:yes";
	var ret = window.showModalDialog("ODT351C1.aspx",window, sFeatures);
	if (ret)
		LoadXML(argType);*/
}

var nodelist;
var nodelist2;
//1070817  Kevin_C 1070678     	弱掃Hardcoded Absolute Path修正
/*function LoadXML(argType)
{
	var xdoc = new ActiveXObject("MSXML2.DOMDocument.3.0");
	//1010705	[1010502]	調整ISSUE.XML存放路徑
	//xdoc.load("C:\\ISSUE.XML");
	xdoc.load("C:\\2100\\ISSUE.XML");
	nodelist = xdoc.selectNodes("//電子交換");
	nodelist2 = xdoc.selectNodes("//電子交換實際發文目錄");
	document.all["lbIssuePath"].options.length = nodelist.length+nodelist2.length;
	//0990831 David 0990552 修改交換路徑設定子視窗，相關取直方式修正--START
	for (var i= 0 ; i < nodelist.length ; i++)
	{
		document.all.lbIssuePath.options[i].text = "";//nodelist[i].attributes[0].value+"|" + nodelist[i].attributes[1].value;
		document.all.lbIssuePath.options[i].value = nodelist[i].selectSingleNode("DI").text;
	}

	//0990831 David 0990552 修改交換路徑設定子視窗，相關取直方式修正--END
	var nodeCnt = nodelist2.length;
	//96.01.08 000146 David
	if(argType == "Y")
	{
		for (var i= 0 ; i < nodelist2.length ; i++)
		{
			document.all.lbIssuePath.options[i+nodeCnt].text = nodelist2[i].attributes[0].value+"|" + nodelist2[i].attributes[1].value;
			//alert(document.all.lbIssuePath.options[i+nodeCnt].text);
			document.all.lbIssuePath.options[i+nodeCnt].value = nodelist2[i].selectSingleNode("DI").text;
			//alert(document.all.lbIssuePath.options[i+nodeCnt].value);
		}
	}
}*/
/*
var nodelist;
function LoadXML()
{
	var xdoc = new ActiveXObject("MSXML2.DOMDocument.3.0");
	xdoc.load("C:\\ISSUE.XML");
	nodelist = xdoc.selectNodes("//電子交換");
	document.all["lbIssuePath"].options.length = nodelist.length;
	for (var i= 0 ; i < nodelist.length ; i++)
	{
		document.all.lbIssuePath.options[i].text = nodelist[i].attributes[0].value+"|" + nodelist[i].attributes[1].value;
		document.all.lbIssuePath.options[i].value = nodelist[i].selectSingleNode("DI").text;
	}
	var nodeCnt = nodelist.length;
}
*/

//選擇電子轉出DI格式
function jf_ShowChooseDI()
{
	var strEnvDI = document.all.H_EnvDIType.value;
	var isShowDI = (strEnvDI.substr(0,1) == "Y") ? true : false;
	//0990916 David 0990618 新增99年版本，修改傳值方式
	//var strDIType = strEnvDI.substr(1,2);
	var strDIType = strEnvDI.substr(1,strEnvDI.length-1);
	//1050906 David 1050087 二代轉DI修改，不提供版本選擇視窗
	/*if (isShowDI)
	{
		var objDI = new Object();
		objDI.EnvDIType = strDIType;
		objDI.DIType = strDIType;
		objDI.RtnTran = true;
		
		var cX = event.clientX + 10;
		var cY = event.clientY + 10;
		//0981203 Albert 0980336 修正視窗長寬之設定
		//var screenWidth = screen.availwidth-10;
		//var screenheight = screen.availheight-20;
		var screenWidth = screen.availWidth-10;
		var screenheight = screen.availHeight-20;
		var screenLeft = screenWidth/2-120;
		var screenTop = screenheight/2-55;
		cX = Math.min(cX, screenLeft);
		cY = Math.min(cY, screenTop);

		var sFeatures="dialogLeft: "+ cX + "px;dialogTop:"+ cY+"px;dialogWidth:220px;dialogHeight:160px;status:no";
		window.showModalDialog("ODT351C2.htm",objDI, sFeatures);
		document.all.H_DIType.value = objDI.DIType;
		return objDI.RtnTran;
	}
	else
	{
		//0990916 David 0990618 新增99年版本
		if(strDIType.length > 3)
			strDIType = strDIType.substr(0,3);
		document.all.H_DIType.value = strDIType;
		return true;
	}*/
	//1051230 David 修正無法轉出104B版本的DI
	/*if(strDIType.length > 3)
		strDIType = strDIType.substr(0,3);*/
	document.all.H_DIType.value = strDIType;
	return true;
}

function jf_CheckForEmail()
{
	var strPDFMode		= document.all.H_PDFMode.value;
	var strNotifyRole	= document.all.H_NotifyRole.value;
	var strWorkPath		= document.all.H_WorkPath.value;
	var chkMsg = "";
	var bufChkMsg = "";
	if (strPDFMode == "")
	{
		chkMsg = "環境變數[OD_ODT351_PDF_MODE]未設定";
		bufChkMsg = "\n";
	}
	if (strNotifyRole == "")
	{
		chkMsg += bufChkMsg + "環境變數[OD_ODT351_NOTIFY_ROLE]未設定";
		bufChkMsg = "\n";
	}
	if (!document.all.lbPrintXSLPath || !document.all.lbPrintXSLPath.options || document.all.lbPrintXSLPath.options.length == 0)
	{
		chkMsg += bufChkMsg + "可Email通知之公文文別設定有誤";
		bufChkMsg = "\n";
	}
	if (strWorkPath == "")
	{
		chkMsg += bufChkMsg + "系統參數[WORKPATH]無法取得";
		bufChkMsg = "\n";
	}
	if (chkMsg != "")
	{
		alert(chkMsg+"\n無法執行Email通知功能");
		return false;
	}
	else
		return true;
	
}

//以Email通知副本及抄件使用者
var wsEmailNotify; //宣告webserver回傳值id
function jf_EmailNotify(argDocNo, argNotifyMain, argNotifyCopy, argNotifyScript, argNotifyRole)
{
	var arWSParam = new Array();
	arWSParam[0] = argDocNo;
	arWSParam[1] = argNotifyMain;
	arWSParam[2] = argNotifyCopy;
	arWSParam[3] = argNotifyScript;
	arWSParam[4] = argNotifyRole;
	callObj = jf_CallWS("ODT351WS.asmx","IsEmailNotify", false, arWSParam);
	wsEmailNotify = callObj.id;
	jf_OnWSResult(callObj);
}

//###############################################################################
//						WebServices Control Function
//###############################################################################

function jf_OnWSResult(argResult)
{
    //webserver回傳後動作
    //檢查回傳的webserverID
	if (argResult.id == wsEmailNotify)
	{
		if(jf_IsWebServiceSuccess(argResult))
		{
			if(!argResult.value.ErrorClass.IsErr)
			{
				jf_SendEmail(argResult.value);
			}
		}
	}
	if (argResult.id == wsSendEmail)
	{
		if(jf_IsWebServiceSuccess(argResult))
		{
			if(!argResult.value.ErrorClass.IsErr)
			{
				alert("公文文號[" + argResult.value.m_DocNo + "]寄送Email通知副本或抄件受文者成功。");
			}
			else
			{
				alert("公文文號[" + argResult.value.m_DocNo + "]寄送Email通知副本或抄件受文者失敗。");
			}
		}
	}
}

//寄發Email通知副本及抄件使用者
var wsSendEmail; //宣告webserver回傳值id
function jf_SendEmail(RtnEmail)
{
	if (RtnEmail.m_bIsNeedNotify)
	{
		var NotifyDoc = RtnEmail.m_NotifyDocs;
		if (!NotifyDoc)
			return;

		var serviceURL	= RtnEmail.ServiceURL;
		var serverURL	= RtnEmail.ServerPath;
		//1070824	Joe		1070678		修正弱掃Hardcoded Absolute Path
		// var local		= "C:\\temp";
		var strOptions	= document.all.H_PDFMode.value;
		var strArtifact	= document.all.H_Artifact.value;
		var bIsNotify	= false;
		
		for (var i = 0; i < NotifyDoc.length; i++)
		{
			var doc = NotifyDoc[i];
			//若稿件之物件未初始化，則跳過不處理
			if (!doc)
				continue;

			//若稿件中無對象需要通知，則跳過不處理
			if (!doc.m_NotifyTarget || doc.m_NotifyTarget.length == 0)
				continue;

			var strDocName = doc.m_DocName;
			if (!strDocName)
				continue;

			//1011005 Kevin 此處需要判斷設定檔是否須轉出Email，不然元件會壞掉(Ex:簽無法發文)。故取消此Mark。
			//1000126 David 0990683 EMAIL通知之PDF改為分址列印此處不需要--START
			var strPrintXSL = "";
			for (var j = 0; j < document.all.lbPrintXSLPath.options.length; j++)
			{
				if (document.all.lbPrintXSLPath.options[j].text == strDocName)
				{
					strPrintXSL = document.all.lbPrintXSLPath.options[j].value;
					break;
				}
			}
			if (strPrintXSL == "")
				continue;
			//1000126 David 0990683 EMAIL通知之PDF改為分址列印此處不需要--END
			//下載檔案
			var soap = new ActiveXObject("WSWrapper.WebFileIO");
			//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
			if ( document.all.II_USE_SSL != null )
			{
				if ( document.all.II_USE_SSL.value == "Y" )
					serviceURL = serviceURL.replace("http://", "https://") ;
			}
			//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
			try
			{
				soap.Init(serviceURL);
				
				if (doc.m_DraftPath)
					soap.AddFile(serverURL, doc.m_DraftPath);

				//1000126 David 0990683 紀錄附件資訊
				var arrAttFiles = new Array();
				if (doc.m_Attach)
				{
					var att = doc.m_Attach;
					for (var j = 0; j < att.length; j++)
					{
						if (att[j])
						{
							soap.AddFile(serverURL, att[j].AttachFileName);
							//1000126 David 0990683 紀錄附件下載實體位置
							arrAttFiles[j] = local +"\\"+ att[j].AttachFileName;
						}
					}
				}
				soap.Download(strArtifact, false, local);
				//alert("local:"+local);
			//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
			}
			catch(e)
			{
				var strErrMsg = e.message;		
				if (soap.hasError)
					strErrMsg += soap.ErrorMessage;
				alert("連接伺服器"+serviceURL+"下載檔案發生錯誤，錯誤訊息為:"+strErrMsg);
			}
			//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END

			//1000126 David 0990683 稿件轉PDF相關設定處理
			var strPDFMode	= document.all.H_PDFMode.value;
			var bAttPDF		= (strPDFMode.substr(0,1) == "Y" )?true:false;//是否含附件
			var bKeepSecret	= (strPDFMode.substr(2,1) == "Y" )?true:false;//行文保密
			var bSealMark	= (strPDFMode.substr(3,1) == "Y" )?true:false;//騎縫章
			var bStamp		= (strPDFMode.substr(4,1) == "Y" )?true:false;//正副抄本章
			var bBarcode	= (strPDFMode.substr(5,1) == "Y" )?true:false;//本文條碼
			var bAttBarcode	= (strPDFMode.substr(6,1) == "Y" )?true:false;//附件條碼
			var bPageNo		= (strPDFMode.substr(7,1) == "Y" )?true:false;//頁碼

			//1000126 David 0990683 轉出附件PDF
			var strTemAttName = "";
			if(bAttPDF && arrAttFiles.length > 0)
			{
				strTemAttName = local + "\\" + RtnEmail.m_DocNo+"_ATT.PDF";
				var strAttErrMsg = document.all["PDF"].ConvertAttachFiles(arrAttFiles,strTemAttName,bSealMark,bAttBarcode,RtnEmail.m_DocNo);
				if(strAttErrMsg != "")
				{
					alert("公文文號[" + RtnEmail.m_DocNo + "]，文別[" + strDocName + "]轉出附件PDF檔有誤，錯誤訊息如下：\n" + strAttErrMsg);
					return;
				}
			}

			//1000126 David 0990683 依受文者各自轉出PDF--START
			var arrAllPDFName = new Array();//紀錄轉出的PDF名稱
			var strDiName = local + "\\" + doc.m_DraftPath;
			var strPdfName = doc.m_DraftPath.substr(0,doc.m_DraftPath.lastIndexOf('.'))+".PDF";
			for (var iIssue = 0; iIssue < doc.m_NotifyTarget.length ; iIssue++)
			{
				var strIssuePdfName = (iIssue+1) + "-" + strPdfName;
				var strOutputPdfName = local + "\\" + strIssuePdfName;
				var strReceiverName = doc.m_NotifyTarget[iIssue].m_DraftTitleName;
				
				//1000126 David 0990683 轉出本文PDF
				//ConvertDIFile(稿件檔完整路徑,輸出之PDF檔完整路徑,受文者名稱,附件PDF檔完整路徑,行文單位保密,正副抄本章,騎縫章,頁碼,條碼,公文文號)
				var strDraftErrMsg = document.all["PDF"].ConvertDIFile(strDiName,strOutputPdfName,strReceiverName,strTemAttName,bKeepSecret,bStamp,bSealMark,bPageNo,bAttBarcode,RtnEmail.m_DocNo);
				if(strDraftErrMsg != "")
				{
					alert("公文文號[" + RtnEmail.m_DocNo + "]，文別[" + strDocName + "]轉出公文PDF檔有誤，錯誤訊息如下：\n" + strDraftErrMsg);
					return;
				}
				arrAllPDFName[iIssue] = strIssuePdfName;
				doc.m_NotifyTarget[iIssue].m_PDFFileName = strIssuePdfName;//紀錄該受文者轉出的PDF名稱
			}
			//1000126 David 0990683 依受文者各自轉出PDF--END

			//1000126 David 0990683 EMAIL通知之PDF改為分址列印此處不需要--START
			/*var LocalFileName = local + "\\" + doc.m_DraftPath;
			//alert(LocalFileName);
			//alert(strPDFMode);
			/*try
			{
				//轉出PDF，如果有錯誤則丟出錯誤訊息(但不表示轉出PDF完全失敗，例如可能是附件檔無法轉出)
				var rtnPDF = document.all["PDF"].MergePDF(strDocName, LocalFileName, "", strPrintXSL, strPDFMode);
				if (rtnPDF)
					alert("公文文號[" + RtnEmail.m_DocNo + "]，文別[" + strDocName + "]轉出稿件PDF檔有誤，錯誤訊息如下：\n" + rtnPDF);
			}
			catch (e)
			{
				alert("公文文號[" + RtnEmail.m_DocNo + "]，文別[" + strDocName + "]轉出稿件PDF檔有誤，錯誤訊息如下：\n" + e.description);
				return;
			}
			//alert("Merge");*/
			//1000126 David 0990683 EMAIL通知之PDF改為分址列印此處不需要--END

			var fso = new ActiveXObject("Scripting.FileSystemObject");
			//1000126 David 0990683 EMAIL通知改為分址列印，多受文者時會轉出多份PDF，調整上傳處理--START
			//原程式行為
			/*var strPDFFileName = doc.m_DraftPath.substring(0,doc.m_DraftPath.lastIndexOf(".")) + ".pdf";
			if (fso.FileExists(local + "\\" + strPDFFileName))
			{
				var strWorkPath = document.all.H_WorkPath.value;
				//AP Server暫存位址為WORK_PATH\INNER_NOTIFY\DOC_NO\DRAFT_NO
				var strServerPath = strWorkPath + "INNER_NOTIFY\\" + RtnEmail.m_DocNo + "\\" + (i+1);
				var soapUp = new ActiveXObject("WSWrapper.WebFileIO");
				soapUp.Init(serviceURL);
				soapUp.AddFile(strServerPath, doc.m_DraftPath,local);
				soapUp.AddFile(strServerPath, strPDFFileName,local);
				if (doc.m_Attach)
				{
					var att = doc.m_Attach;
					for (var j = 0; j < att.length; j++)
					{
						if (att[j])
							soapUp.AddFile(strServerPath, att[j].AttachFileName, local);
					}
				}
				soapUp.Upload(strArtifact, true);
			}
			else
			{
				alert("公文文號[" + RtnEmail.m_DocNo + "]，文別[" + strDocName + "]轉出稿件PDF失敗，無法寄送Email通知。");
				continue;
			}*/

			var strWorkPath = document.all.H_WorkPath.value;
			var strServerPath = strWorkPath + "INNER_NOTIFY\\" + RtnEmail.m_DocNo + "\\" + (i+1);
			var soapUp = new ActiveXObject("WSWrapper.WebFileIO");
			//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
			if ( document.all.II_USE_SSL != null )
			{
				if ( document.all.II_USE_SSL.value == "Y" )
					serviceURL = serviceURL.replace("http://", "https://") ;
			}
			//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
			try
			{	
				soapUp.Init(serviceURL);
				//稿件
				soapUp.AddFile(strServerPath, doc.m_DraftPath, local);
				//轉出的PDF
				for(var iPdf = 0 ; iPdf < arrAllPDFName.length ; iPdf++)
				{
					soapUp.AddFile(strServerPath, arrAllPDFName[iPdf], local);
				}
				//附件
				if (doc.m_Attach)
				{
					var att = doc.m_Attach;
					for (var j = 0; j < att.length; j++)
					{
						if (att[j])
							soapUp.AddFile(strServerPath, att[j].AttachFileName, local);
					}
				}
				//上傳
				soapUp.Upload(strArtifact, true);
			//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
			}
			catch(e)
			{
				var strErrMsg = e.message;		
				if (soapUp.hasError)
					strErrMsg += soapUp.ErrorMessage;
				alert("連接伺服器"+serviceURL+"上傳檔案至AP伺服器失敗，錯誤訊息為:"+strErrMsg);
			}
			//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
			
			var arWSParam = new Array();
			arWSParam[0] = strArtifact;			//使用者權杖
			arWSParam[1] = RtnEmail.m_DocNo;	//公文文號
			arWSParam[2] = (i+1);				//稿序
			arWSParam[3] = doc.m_DraftPath;		//稿件XML檔
			arWSParam[4] = arrAllPDFName;		//稿件PDF檔
			arWSParam[5] = doc.m_NotifyTarget;	//稿件Email通知對象資訊
			arWSParam[6] = doc.m_Attach;		//稿件Email通知對象資訊
			callObj = jf_CallWS("ODT351WS.asmx","EmailNotify", false, arWSParam);
			wsSendEmail = callObj.id;
			jf_OnWSResult(callObj);

			//1000126 David 0990683 EMAIL通知改為分址列印，多受文者時會轉出多份PDF，調整上傳處理--END
		}
	}
	else
	{
		alert("公文文號[" + RtnEmail.m_DocNo + "]無適當的副本或抄件受文者可寄發Email通知。");
	}
}
/*

function jf_IsWebServiceSuccess(argResult)
{
	if(argResult.error)
	{
	    alert(argResult.errorDetail.string);
	    return false;
	}
	else
	{
		obj = argResult.value;
		if(obj.ErrorClass.IsErr)
		{
			if( obj.ErrorClass.IsRedirect)
			{
			   jf_RedirectToCustomErrPage();
			}
			else
				alert( obj.ErrorClass.ErrMessage[0].text);
			
			return false;
		}
	}
	
	return true;
	
}
*/
function jf_IsWebServiceSuccessV3(argResult)
{			
	if(argResult.error)
	{
	    alert(argResult.errorDetail.string);
	    return false;
	}
	else
	{
		obj = argResult.value;
		if(!obj.m_bSuccess)
		{
			if(obj.m_strMsg != "")
				alert(obj.m_strMsg);
			if(obj.m_bRedirect)
			{
				//var strLogFilePath = obj.m_strErrPageQueryStr + "&argAttach=New_" + window.opener.document.all["txLogFileName"].value;
				//jf_OpenMsgWin(strLogFilePath, "CustomErrPage");
			}
			else
			{
				alert("錯誤來源：" + obj.m_strErrSource + "\n" + "錯誤訊息：" + obj.m_strErrMsg + "\n" + "堆疊追蹤：\n" + obj.m_strErrStack);
			}
				
			/*
			if(obj.m_strMsg == "")
			{
				if(obj.m_bRedirect)
				{
					//var strLogFilePath = obj.m_strErrPageQueryStr + "&argAttach=New_" + window.opener.document.all["txLogFileName"].value;
					//jf_OpenMsgWin(strLogFilePath, "CustomErrPage");
				}
				else
				{
					alert("錯誤來源：" + obj.m_strErrSource + "\n" + "錯誤訊息：" + obj.m_strErrMsg + "\n" + "堆疊追蹤：\n" + obj.m_strErrStack);
				}
			}
			else
			{
				alert(obj.m_strMsg);
			}
			*/
			return false;
		}
	}
	return true;
}