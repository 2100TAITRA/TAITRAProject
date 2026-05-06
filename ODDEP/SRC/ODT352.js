/*
DATE	SA		PRG		MGR_NO			DESC
0960113	Stella	David	000146			台科大電子交換
0961108 Stella  Matte	001481			新增發文更新傳送及EMAIL發文
0970122 Stella	Matte	0960411			限制電子檔轉出以及email寄送附件總檔案大小
0980924 Stella	David	0980455			使用WebFileIO，應傳入Artifact
0980924 Stella	David	0980416			新增傳送別選項依環境變數判斷點選
0981026 Stella	David	0980530			配合系統參數OD_SUPPORT_EMAIL重新定義，修改相關判斷
0981118 Stella	David	0980509			支援分繕轉出，修改下載DI檔程式邏輯
0990915 ------	David	0990589			附件大小依環境變數值設定顯示
0991203 ------	David	-------			提供參數設定發文資料更新時是否自動轉出電子檔
1000105 Yvonne	David	0990556			新增立委質詢案件轉出處理
1000118 ------	David	-------			新增線上簽核公文封裝作業
1010703	David	David	1010632			B5E元件分繕轉出多轉出SW及附件，程式配合修改
1031028	Leslie	Kenny	1030836			配合SSL修改傳入元件之URL
1040617	Leslie 	Gabby	1040324			增加WebFileIO錯誤訊息處理
1041225	David	David	1040838			(104年法規)新增重新發文原因相關功能(DM檔)
1050818 Kevin   Zen     1050700         弱掃XSS修正
1050830 David	Zen     1050087         二代公文修改
1050906	David	David	1050087			二代轉DI功能修改
1060809	David	David	1060707			配合TBT150二代升級完成，修改開啟TBT150行為
1061016	David	Kevin_C	1060987			修正子視窗開啟後，更改顯示來源下拉選單無法正帶出DataGrid資料的問題
1080214	Kevin	Joe		1080179			修正弱掃Hardcoded Absolute Path
1080527	David	David	1080387			修正電子檔轉出訊息未顯示問題
1090930	David	David	1050087			立委質詢案件轉出二代處理
1100226	David	Joe		1090891			移除已未使用之Email通知功能，避免電子檔轉出異常
1100310	David	David	1090610			由ODT351自動開啟後，執行完發文資料更新自動關閉
1100510	David	David	1100309			傳送加簽功能支援二代
1140512	Leslie	David	1140331			支援工作站加簽，調整加簽處理
*/
//###############################################################################
//						Initial
//###############################################################################

//1060609 David 1050087 配合TBT150二代升級完成，修改開啟TBT150行為
window.SSO_CONFIG = opener.SSO_CONFIG;

var IsServerHandling = new Boolean();
IsServerHandling = false;

//1050830 Zen 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

//96.01.13 000146 David
var CheckFile = document.all["txCheckFile"].value;

var StartRow = 2;
//1100510 David 1100309 紀錄pincode、是否加簽中
var strIgotu = "";
var bSignCert = false;

//function ClientButtonControl()
function ClientButtonControl(e)
{
	//var xObjectName = document.activeElement.id;
	var xObjectName = e.target.id;

	if (IsServerHandling)
		return;

	if (jf_IsTimeOut())
	{
		Page_BlockSubmit = true;
		return;
	}
	
	//1100510 David 1100309 如為加簽中不觸發功能
	if(bSignCert)
		return;

	switch (xObjectName)
	{
		case "btSelectAll":
			Page_BlockSubmit = true;
			try
			{
				SelectAllCb("dg1");
			}
			catch (e) { }
			break;
		case "btClean":
			Page_BlockSubmit = true;
			try
			{
				CleanCb("dg1");
			}
			catch (e) { }
			break;
		case "btReverse":
			Page_BlockSubmit = true;
			try
			{
				ReverseChecked("dg1");
			} catch (e) { }
			break;
		case "btConfirm":
			Page_BlockSubmit = true;
			try
			{
				fnConfirmDocNo();
			} catch (e) { }
			break;
	}
}
//1050830 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	if (IsServerHandling)
		return;

	if (jf_IsTimeOut())
	{
		Page_BlockSubmit = true;
		return;
	}

	//1100510 David 1100309 如為加簽中不觸發功能
	if(bSignCert)
		return;

	//1050830 Zen 1050087 二代公文修改
	//xObjectName = window.event.srcNode.getAttribute("ID");
	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "btTransfer":
			Page_BlockSubmit = true;
			fnCheckBeforeTransferDI();
			break;
		case "btSetup":
			Page_BlockSubmit = true;
			jf_SetupPath(CheckFile);
			break;
		case "btUpdate":
			//Matte 0961120 001481
			//0990831 David 0990552 發文資料更新時一併轉出電子檔
			//0991203 David 依設定判斷是否自動轉出DI
			//if(fnCheckBeforeTransferDI())
			var bAutoTrans = (document.all.H_AutoTransDi.value == "Y") ? true : false;
			if ((bAutoTrans && fnCheckBeforeTransferDI()) || !bAutoTrans)
			{
				//1100510 David 1100309 調整二代發文資料更新架構
				//Page_BlockSubmit = !fnUpdateSendDocInfoBatch();
				Page_BlockSubmit = !fnBeforeUpdate();
				//1050830 Zen 1050087 二代公文修改
				//jf_ToolBarSubmit();
				jf_ToolBarSubmit(xObjectName);
			}
			break;
	}
}

function ClientOnLoad()
{
	if (!document.all.dg1)
		document.all.tbSelect.style.display = "none";
	else
		document.all.tbSelect.style.display = "";
	ClientOnLoadCommon();
	//1050906 David 1050087 二代轉DI修改，不需讀本機端XML
	//LoadXML(CheckFile);

	//1050906 David 1050087 二代修改
	//document.all.trStamp.className = "hide";
	$("#trStamp").hide();
	if (document.all.txSendMode.value == "1")
		document.all.rbReturn.checked = true;
	else if (document.all.txSendMode.value == "2" || document.all.txSendMode.value == "4")
		document.all.rbArchive.checked = true;
	else if (document.all.txSendMode.value == "3")
		document.all.rbNone.checked = true;
		//0980924	David	0980416	新增傳送別選項依環境變數判斷點選
	else if (document.all.txSendMode.value == "5")
		document.all.rbETypeArc.checked = true;
	else if (document.all.txSendMode.value == "6")//0990831 David 0990552 新增用印傳送別
	{
		document.all.rbStamp.checked = true;
		//1050906 David 1050087 二代修改
		//document.all.trStamp.className = "";
		$("#trStamp").show();
	}
	else
		document.all.rbNone.checked = true;

	//1100510 David 1100309 紀錄pincode
	if(opener != null && opener.theSSO != null)
	{
		if(typeof(opener.theSSO.User.igotu) === "string")
		{
			strIgotu = opener.theSSO.User.igotu;
		}
	}
	else if(opener.opener != null && opener.opener.theSSO != null)
	{
		if(typeof(opener.opener.theSSO.User.igotu) === "string")
		{
			strIgotu = opener.opener.theSSO.User.igotu;
		}
	}
}

//###############################################################################
//						Child Window Control Function
//###############################################################################

function CallBack(argCallerId)
{
	//1100510 David 1100309 PinCode回傳處理
	if (argCallerId == "ODT351C3")
	{
		var RtnType =  document.all["lbReturnValue"].options[0].value;
		if(RtnType == "1")
		{
			fnSetUserIguto(document.all["lbReturnValue"].options[1].value)
			win_focus = true;//從ODT351C3回來後，將判斷變數設定回來(Template_util內使用)，避免判斷不在目前程式造成後續alert失敗
			fnUpdateSign();
		}
		else
		{
			alert("線上簽核公文封裝作業，失敗原因：使用者取消輸入金鑰密碼或金鑰密碼為空");
		}
	}

	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

function ReturnValue()
{
	//opener.document.all.lbReturnValue.length = 1;
	//opener.document.all.lbReturnValue.options[0].text = "1";
	//opener.document.all.lbReturnValue.options[0].value = "1";
	//opener.window.CallBack("SYM020C1");
	//close();
}

//###############################################################################
//						WebServices Control Function
//###############################################################################

function OnWSResult(argResult)
{
	//webserver回傳後動作
	//檢查回傳的webserverID
	if (argResult.id == wsUpdateSendDocInfoBatchID)
	{
		//檢查執行是否成功
		//1000118 David 配合線上簽核封裝檔處理，有錯誤訊息時須一併顯示，將jf_IsWebServiceSuccess()移至ODT352內處理
		//if(jf_IsWebServiceSuccess(argResult))
		if (IsWebServiceSuccessByODT352(argResult))
		{
			//1000105 David 0990556 新增下載立委質詢案件轉出檔案
			//1090930 David 1050087 改由Server端執行，Client不需處理
			/*if (arrLegislatorNo.length > 0)
			{
				var LGObj = ODT351.GetLGDownLoadPath(document.all["H_Artifact"].value).value;
				if (LGObj.ErrMsg == "")
				{
					var soap = new ActiveXObject("WSWrapper.WebFileIO");
					//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
					//soap.Init(LGObj.ServerURL);
					var serviceURL = LGObj.ServerURL;
					if (document.all.II_USE_SSL != null)
					{
						if (document.all.II_USE_SSL.value == "Y")
							serviceURL = serviceURL.replace("http://", "https://");
					}
					//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
					try
					{
						soap.Init(serviceURL);

						for (var i = 0 ; i < arrLegislatorNo.length ; i++)
						{
							if (arrLegislatorNo[i] != "")
								soap.AddFile("C:\\TEMP\\", arrLegislatorNo[i] + "_" + LGObj.NowDate + ".txt");
						}
						soap.Download(document.all["H_Artifact"].value, false, LGObj.DownLoadPath);
						//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
					}
					catch (e)
					{
						var strErrMsg = e.message;
						if (soap.hasError)
							strErrMsg += soap.ErrorMessage;
						alert("連接伺服器" + serviceURL + "下載檔案發生錯誤，錯誤訊息為:" + strErrMsg);
					}
					//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
				}
				else
					alert(LGObj.ErrMsg);

				//處理完清空資訊
				arrLegislatorNo = new Array();
			}*/
			alert("更新發文資訊成功");
			return true;
		}
		else
		{
			//alert("更新發文資訊失敗");
			return false;
		}
	}

	if (argResult.id == wsTransferDI)
	{
		//0961108 Stella  Matte   001481
		//if(jf_IsWebServiceSuccess(argResult))
		//{
		if (!argResult.error)
		{
			if (!argResult.value.ErrorClass.IsErr)
			{
				fnDownloadDI(argResult.value);
			}
				//0970122 Matte   0960411  
			//1050906 David 1050087 二代修改
			//else if (argResult.value.ErrorClass.ErrMessage[0].text.indexOf("電子檔") == -1)
			else if (argResult.value.ErrorClass.ErrMessage[0].indexOf("電子檔") == -1)
			{
				fnDownloadDI(argResult.value);
			}
		}
		//}
	}
}

//1000118 David 配合線上簽核封裝檔處理，有錯誤訊息時須一併顯示，將jf_IsWebServiceSuccess()移至ODT352內處理
function IsWebServiceSuccessByODT352(argResult)
{
	if (argResult.error)
	{
		alert(argResult.errorDetail.string);
		return false;
	}
	else
	{
		obj = argResult.value;
		if (obj.ErrorClass.IsErr)
		{
			if (obj.ErrorClass.IsRedirect)
			{
				jf_RedirectToCustomErrPage();
			}
			else
			{
				if (SubmitAOLErrMsg != "")
				{
					//1050906 David 1050087 二代修改
					//obj.ErrorClass.ErrMessage[0].text += "\n\n線上簽核封裝作業失敗共" + AOLErrCount + "筆\n" + SubmitAOLErrMsg;
					obj.ErrorClass.ErrMessage[0] += "\n\n線上簽核封裝作業失敗共" + AOLErrCount + "筆\n" + SubmitAOLErrMsg;
					//加簽失敗清除紀錄的PINCODE
					fnSetUserIguto("");
				}
				//1050906 David 1050087 二代修改
				//alert(obj.ErrorClass.ErrMessage[0].text);
				alert(obj.ErrorClass.ErrMessage[0]);

				//清空資訊
				AOLErrCount = 0;
				SubmitAOLErrMsg = "";
			}
			return false;
		}
		else
		{
			if (SubmitAOLErrMsg != "")
			{
				alert("線上簽核封裝作業失敗共" + AOLErrCount + "筆\n" + SubmitAOLErrMsg);
				//加簽失敗清除紀錄的PINCODE
				fnSetUserIguto("");
				//清空資訊
				AOLErrCount = 0;
				SubmitAOLErrMsg = "";
				return false;
			}
		}
	}
	return true;
}

//###############################################################################
//						ToolBar Control Function
//###############################################################################
//電子檔轉出
var wsTransferDI;//宣告webserver回傳值id
var arDocNo;
function fnCheckBeforeTransferDI()
{
	arDocNo = new Array();
	var bufMsg = "";
	var strMsg = "";
	var nIssueCnt = 0;
	var strSeq = "";

	for (var i = StartRow; i < document.all["dg1"].rows.length + 1 ; i++)
	{
		if (document.all["dg1__ctl" + i + "_cbSelect"].checked)
		{
			//1050830 Zen 1050087 二代公文修改--begin
			//strSeq = document.all["dg1__ctl"+i+"_lbNo"].innerText;
			//arDocNo[nIssueCnt] = document.all["dg1__ctl" + i + "_lbDocNo"].innerText;
			strSeq = document.all["dg1__ctl" + i + "_lbNo"].textContent;
			arDocNo[nIssueCnt] = document.all["dg1__ctl" + i + "_lbDocNo"].textContent;
			//1050830 Zen 1050087 二代公文修改--end
			nIssueCnt++;
		}
	}

	if (nIssueCnt == 0)
	{
		//001481 matte 0961120
		if (document.all.OD_SUPPORT_EMAIL.value == "N")
		{
			alert("請至少選取一筆公文以進行電子檔轉出作業。");
			return false;
		}
		else
		{
			alert("請至少選取一筆公文以進行電子檔轉出作業及Email寄送。");
			return false;
		}
	}
	//轉出電子檔前檢查
	//檢查電子交換轉出路徑設定是否正確且完整
	//0981026 David 0980530 配合系統參數OD_SUPPORT_EMAIL重新定義，修改判斷
	//if( document.all.OD_SUPPORT_EMAIL.value == "N" || document.all.OD_SUPPORT_EMAIL.value == "Y" &&  document.all.nIsTrans.value == "Y")
	if (document.all.OD_SUPPORT_EMAIL.value == "N" || document.all.OD_SUPPORT_EMAIL.value != "N" && document.all.nIsTrans.value == "Y")
	{
		//1050906 David 1050087 二代轉DI功能修改，此處不需要
		/*if (!fnCheckTranPath())
		{
			alert("電子交換轉出路徑設定有誤，無法進行電子檔轉出作業。");
			jf_SetupPath();
			return false;
		}*/
	}

	if (!document.all.dg1)
	{
		alert("無資料可進行電子檔轉出作業。");
		return false;
	}

	//檢查是否已設定電子發文路徑
	//if (!jf_ShowChooseDI())
	//001481 matte 0961120
	//0981026 David 0980530 配合系統參數OD_SUPPORT_EMAIL重新定義，修改判斷
	//if(document.all.OD_SUPPORT_EMAIL.value == "N" || document.all.OD_SUPPORT_EMAIL.value == "Y" &&  document.all.nIsTrans.value == "Y")
	if (document.all.OD_SUPPORT_EMAIL.value == "N" || document.all.OD_SUPPORT_EMAIL.value != "N" && document.all.nIsTrans.value == "Y")
	{
		if (!jf_ShowChooseDI())
			return false;
	}

	//寄送Email通知前檢查
	var bIsNotifyMain = document.all.cbEmailNotifyMain.checked;
	var bIsNotifyCopy = document.all.cbEmailNotifyCopy.checked;
	var bIsNotifyScript = document.all.cbEmailNotifyScript.checked;

	//當要以Email通知受文者時，檢查相關環境變數是否已設定
	//1100226	Joe		1090891			移除已未使用之Email通知功能，避免電子檔轉出異常
	// if (bIsNotifyMain || bIsNotifyCopy || bIsNotifyScript)
	// {
		// if (!jf_CheckForEmail())
			// return false;
	// }

	if (!IsServerHandling)
	{
		fnTransferDI();
		//window.setTimeout("fnTransferDI()", 50);
	}
	return true;
}

//批次發文資料更新
var wsUpdateSendDocInfoBatchID;//宣告webserver回傳值id
//1000105 David 0990556 紀錄立委質詢流水號
var arrLegislatorNo = new Array();
//1100510 David 1100309 二代加簽為非同步作業，改寫發文資料更新處理架構，原行為MARK
/*function fnUpdateSendDocInfoBatch()
{
	if (!document.all.dg1)
	{
		alert("無資料可進行發文資料更新。");
		return;
	}

	var rtnValue = false;
	var nIssueCnt = 0;
	var arDocNo = new Array();
	for (var i = StartRow; i < document.all["dg1"].rows.length + 1 ; i++)
	{
		if (document.all["dg1__ctl" + i + "_cbSelect"].checked)
		{
			//1000118 David 新增線上簽核公文封裝作業--START
			if (document.all.rbReturn.checked || document.all.rbArchive.checked || document.all.rbETypeArc.checked)
			{
				//1050830 Zen 1050087 二代公文修改--begin
				//var strDocNo = document.all["dg1__ctl"+i+"_lbDocNo"].innerText
				//var strSignType = document.all["dg1__ctl"+i+"_lbSignType"].innerText
				//var strMsgId = document.all["dg1__ctl"+i+"_lbMsgId"].innerText
				//var strReturnInfo = document.all["dg1__ctl"+i+"_lbReturnInfo"].innerText
				//var strArchiveInfo = document.all["dg1__ctl"+i+"_lbArchiveInfo"].innerText
				//var strCaseCon = document.all["dg1__ctl"+i+"_lbCaseCon"].innerText
				var strDocNo = document.all["dg1__ctl" + i + "_lbDocNo"].textContent
				var strSignType = document.all["dg1__ctl" + i + "_lbSignType"].textContent
				var strMsgId = document.all["dg1__ctl" + i + "_lbMsgId"].textContent
				var strReturnInfo = document.all["dg1__ctl" + i + "_lbReturnInfo"].textContent
				var strArchiveInfo = document.all["dg1__ctl" + i + "_lbArchiveInfo"].textContent
				var strCaseCon = document.all["dg1__ctl" + i + "_lbCaseCon"].textContent
				//1050830 Zen 1050087 二代公文修改--end
				var strTxInfo = "";

				if (strSignType.toUpperCase() == "E")
				{
					if (document.all.rbArchive.checked)
						strTxInfo = strArchiveInfo + ";94;檔案室;OD95;檔管人員;;;";
					else if (document.all.rbReturn.checked)
						strTxInfo = strReturnInfo;
					else
					{
						if (strCaseCon == "是")
							strTxInfo = strReturnInfo;
						else
							strTxInfo = strArchiveInfo + ";94;檔案室;OD95;檔管人員;;;";
					}

					//1060825 David Wait
					//if (!fnSubmitAOLDocFiles(strDocNo, strMsgId, strTxInfo))
						//continue;
				}
			}
			//1000118 David 新增線上簽核公文封裝作業--END

			//1050819 Zen 1050700 弱掃XSS修正
			//arDocNo[nIssueCnt] = document.all["dg1__ctl" + i + "_lbDocNo"].innerText;
			//1050830 Zen 1050087 二代公文修改
			//arDocNo[nIssueCnt] = encodeURI(document.all["dg1__ctl" + i + "_lbDocNo"].innerText);
			arDocNo[nIssueCnt] = encodeURI(document.all["dg1__ctl" + i + "_lbDocNo"].textContent);

			//1000105 David 0990556 紀錄立委質詢流水號
			//1050830 Zen 1050087 二代公文修改
			//var strLegislatorNo = document.all["dg1__ctl" + i + "_lbLegislatorNo"].innerText;
			var strLegislatorNo = document.all["dg1__ctl" + i + "_lbLegislatorNo"].textContent;
			if (strLegislatorNo != "")
				arrLegislatorNo[arrLegislatorNo.length] = strLegislatorNo;

			nIssueCnt++;
		}
	}

	//0961108 Matte   001481
	//發文更新後傳送模式
	var strMode = "0";
	if (document.all.rbReturn)
	{
		if (!document.all.rbReturn.disabled)	//如果傳送模式disable，則視同不傳送
		{
			if (document.all.rbReturn.checked)
				strMode = "1";
			else if (document.all.rbArchive.checked)
				strMode = "2";
			else if (document.all.rbNone.checked)
				strMode = "3";
				//0980924	David	0980416	新增傳送別選項
			else if (document.all.rbETypeArc.checked)
				strMode = "4";
				//0980924	David	0980416	新增傳送別選項
			else if (document.all.rbStamp.checked)
				strMode = "6";

		}
	}

	//0961108 Matte   001481	
	//判斷單位發文或總發文
	var strCloseType = "";
	if (document.all.rbAll)
		strCloseType = "1";
	else
		strCloseType = "2";

	if (nIssueCnt > 0)
	{
		if (!IsServerHandling)
		{
			var arWSParam = new Array();
			arWSParam[0] = arDocNo;
			arWSParam[1] = strCloseType;
			//1050819 Zen 1050700 弱掃XSS修正
			//arWSParam[2] = document.all.H_Artifact.value;
			arWSParam[2] = encodeURI(document.all.H_Artifact.value);
			arWSParam[3] = strMode;
			callObj = jf_CallWS("ODT351WS.asmx", "UpdateSendDocInfoBatch", false, arWSParam);
			wsUpdateSendDocInfoBatchID = callObj.id;
			rtnValue = OnWSResult(callObj);
		}
	}
	else
	{
		//1000118 David 線上簽核封裝有錯誤訊息
		if (SubmitAOLErrMsg != "")
		{
			alert("線上簽核裝作業失敗共" + AOLErrCount + "筆\n" + SubmitAOLErrMsg);
			SubmitAOLErrMsg = "";
		}
		else
			alert("請至少選取一筆公文以進行發文資料更新作業。");
	}
	
	//1100310 David 1090610 由ODT351自動開啟後，執行完發文資料更新自動關閉
	if(document.all.OPEN_FROM_351)
		jf_CloseSelf();
	return rtnValue;
}*/

//1000118 David 新增線上簽核公文封裝作業
var SubmitAOLErrMsg = "";
var AOLErrCount = 0;
//1080214	Joe		1080179		修正弱掃Hardcoded Absolute Path--S
/*
function fnSubmitAOLDocFiles(argDocNo, argMegID, argTxInfo)
{
	var sWorkPath = "C:\\temp\\sso\\SubmitAOLDocFiles";

	if (document.all.H_Artifact.value == "")
	{
		SubmitAOLErrMsg += "公文文號[" + argDocNo + "]進行線上簽核公文封裝作業失敗，原因：無法取得Artifact\n";
		AOLErrCount++;
		return false;
	}
	if (argMegID == "")
	{
		SubmitAOLErrMsg += "公文文號[" + argDocNo + "]進行線上簽核公文封裝作業失敗，原因：無法取得流程MsgId";
		AOLErrCount++;
		return false;
	}

	if (!document.all.LoginCOM.SetTargetUser(document.all.H_Artifact.value))
	{
		SubmitAOLErrMsg += "公文文號[" + argDocNo + "]進行線上簽核公文封裝作業失敗，原因：SetTargetUser() fail";
		AOLErrCount++;
		return false;
	}
	var nRtn = document.all.LoginCOM.SubmitAOLDocFiles(argDocNo, argMegID, sWorkPath, argTxInfo);

	if (nRtn != 0)
	{
		//取得作業錯誤資訊
		var cnt = document.all.LoginCOM.GetErrorCount();
		var sErrMsg = "";
		for (var i = 0; i < cnt; i++)
		{
			var code = document.all.LoginCOM.GetErrorCode(i);
			sErrMsg = sErrMsg + document.all.LoginCOM.GetErrorMsg(i) + "\n";
		}
		SubmitAOLErrMsg += "公文文號[" + argDocNo + "]進行線上簽核公文封裝作業失敗，原因：" + sErrMsg;
		AOLErrCount++;
		return false;
	}
	return true;
}
*/
//1080214	Joe		1080179		修正弱掃Hardcoded Absolute Path--E

//1100510 David 1100309 調整二代發文資料更新架構
var arrUpdateDocInfo = [];//紀錄待發文資料更新資料
var arrUpdateDoc = [];//紀錄待發文資料更新文號
var nUpdateDocCnt = 0;
function fnBeforeUpdate()
{
	if (!document.all.dg1)
	{
		alert("無資料可進行發文資料更新。");
		return false;
	}

	//初始化
	var bHasSignTypeE = false;
	arrUpdateDocInfo = [];
	arrUpdateDoc = [];
	nUpdateDocCnt = 0;

	//整理待發文資料更新資料
	for (var i = StartRow; i < document.all["dg1"].rows.length + 1 ; i++)
	{
		if (document.all["dg1__ctl" + i + "_cbSelect"].checked)
		{
			var strDocNo = document.all["dg1__ctl" + i + "_lbDocNo"].textContent;
			var strSignType = document.all["dg1__ctl" + i + "_lbSignType"].textContent;
			var strMsgId = document.all["dg1__ctl" + i + "_lbMsgId"].textContent;
			var strCaseCon = document.all["dg1__ctl" + i + "_lbCaseCon"].textContent;
			var strDeptName = document.all["dg1__ctl" + i + "_lbDeptName"].textContent;
			var strOwnOuId = document.all["dg1__ctl" + i + "_lbOwnOuId"].textContent;

			if(strSignType == "E")
				bHasSignTypeE = true;

			arrUpdateDocInfo.push({
				DocNo:strDocNo
				,SignType:strSignType
				,MsgId:strMsgId
				,CaseCon:strCaseCon
				,DeptName:strDeptName
				,OwnOuId:strOwnOuId
			});
		}
	}

	if(arrUpdateDocInfo.length == 0)
	{
		alert("請至少選取一筆公文以進行發文資料更新作業。");
		return false;
	}
	
	//判斷有線上簽核公文且要進行發文後傳送
	if(document.all.rbReturn && !document.all.rbReturn.disabled && !document.all.rbNone.checked && bHasSignTypeE)
	{
		if(document.all.II_SUBMIT_SIGN.value == "Y" && strIgotu == "")//需加簽時才要求金鑰密碼
		{
			jf_ShowModal("ODT351C3.aspx?SAMLart=" + document.all.H_Artifact.value , "560","250");
		}
		else
			fnUpdateSign();
	}
	else
		fnUpdateSign();

	return false;
}

//1100510 David 1100309 封裝加簽處理
function fnUpdateSign()
{
	//設定加簽處理中
	bSignCert = true;

	function doUpdateNext(iDoc)
	{
		if(iDoc < arrUpdateDocInfo.length)
		{
			if (document.all.rbReturn && !document.all.rbReturn.disabled && !document.all.rbNone.checked && arrUpdateDocInfo[iDoc].SignType == "E")
			{
				//SignWork.xml檔案處理及簽體處理
				var strAuthWS = document.all.II_AUTH_WS.value;
				var strSubmitSign = document.all.II_SUBMIT_SIGN.value;
				var strArtifact = document.all.H_Artifact.value;
				var strOrgNo = document.all.H_NowOrgNo.value;
				var strAccount = document.all.txAccount.value;
				var strEmpName = document.all.txEmpName.value;
				var strDocNo = arrUpdateDocInfo[iDoc].DocNo;
				var strMsgId = arrUpdateDocInfo[iDoc].MsgId;
				var strOuName = "總發文";
				var strRoleName = "發文人員";
				if(arrUpdateDocInfo[iDoc].OwnOuId.indexOf("92") != 0)//代碼不是92開頭，表示流程不在總發
				{
					strOuName = arrUpdateDocInfo[iDoc].DeptName;
					strRoleName = "登記桌";
				}
				var strTxName = "";
				if (document.all.rbReturn.checked)
					strTxName = "退回";
				else
				{
					if (arrUpdateDocInfo[iDoc].CaseCon == "是")
						strTxName = "退回";
					else
						strTxName = "歸檔"
				}

				var sHashHeaderb64 = "MCEwCQYFKw4DAhoFAAQU"; //若回傳待簽資料hash, 則header為此值!
				var sHashHeaderb64_SHA256 = "MDEwDQYJYIZIAWUDBAIBBQAEI"; //若回傳待簽資料hash(SHA256), 則header為此值!

				//進行封裝處理
				var DocSignObj = OD.ODT351.SetSignWork(strArtifact, strOrgNo, strDocNo, strMsgId, strAccount, strEmpName, strOuName, strRoleName, strTxName).value;
				if(!DocSignObj.bSuccess)
				{
					SubmitAOLErrMsg += "文號[" + strDocNo + "]：" + DocSignObj.ErrMsg + "\n";
					AOLErrCount++;
					doUpdateNext(iDoc + 1);//處理下一筆公文
				}
				else
				{
					//進行加簽處裡
					if(strSubmitSign == "Y")
					{
						var strCertb64 = "";
						var strSignature = "";

						var fHashSign = false;
						var _encodeMethod = "base64";
						var _hashAlg = "SHA1";
						if (DocSignObj.SignStr.indexOf(sHashHeaderb64)===0 || DocSignObj.SignStr.indexOf(sHashHeaderb64_SHA256)===0) { /* 104法規SHA256 */
							fHashSign = true;
						}
						else { // ODT351不支援非hash值之待簽內容!
							SubmitAOLErrMsg += "文號[" + strDocNo + "]，回傳之待簽內容不正確[非Hash值]! ToBeSign=" + DocSignObj.SignStr + "\n";
							bSignCert = false;
							return false;
						}

						if (fHashSign) {
							_encodeMethod = "hashBase64";
							_hashAlg = "";
						}

						//加簽處理
						var sc = new SmartCard();
						sc.getSCardModuleInfo() //檢核[跨平台簽章元件]版本資訊, 須為V1.3.4.1027版以後才支援使用hash值簽章
						.then(function(rslt){
							var validSCVersion = false;
							var verSegment;
							var verRequired = ['1', '3', '4', '1027'];
							if (typeof rslt.SCModuleInfo=='object' && typeof rslt.SCModuleInfo.serverVersion=='string' && rslt.SCModuleInfo.serverVersion.length) {
								verSegment = rslt.SCModuleInfo.serverVersion.split('.');
								if (verSegment.length>=4 && verSegment[0]>=verRequired[0] &&
									verSegment[1]>=verRequired[1] && verSegment[2]>=verRequired[2] && verSegment[3]>=verRequired[3]) {
									validSCVersion = true;
								}
							}
							
							if (validSCVersion===false) {
								var _dfd = $.Deferred();
								if (verSegment.length) {
									_dfd.reject({success:false, _errMsg:'目前跨平台簽章元件為:V' + rslt.SCModuleInfo.serverVersion + '版, 請更新到V1.3.4.102700版以上再重試作業!'});
								}
								else {
									_dfd.reject({success:false, _errMsg:'無法取得[跨平台簽章元件]版本資訊.'});
								}
								return _dfd.promise();
							}
							else {
								return sc.makeSignature(DocSignObj.SignStr, _encodeMethod, strIgotu , _hashAlg)
							}
						})
						.then(function(rslt) {
							//憑證
							strCertb64 = rslt.certb64;
							//簽體
							strSignature = rslt.signature;
							//成功
							return sc.checkCertLink(strArtifact ,strCertb64, "2", strAuthWS)
						})
						.then(function(){
							return sc.checkCertValidity(strCertb64, "2", strOrgNo, strAuthWS)
						})
						.then(function(){

							//呼叫WebFileIO.signEnvelope進行加簽
							//1140512 David 1140331 傳入呼叫UpdateEnvelope的URL及識別碼
							//var signObj = OD.ODT351.signEnvelope(strArtifact, strOrgNo, strDocNo, strMsgId, DocSignObj.FileWebService, strSignature, strCertb64).value;
							var signObj = OD.ODT351.signEnvelope(strArtifact, strOrgNo, strDocNo, strMsgId, DocSignObj.FileWebService, strSignature, strCertb64, DocSignObj.ImgConvertUrl, DocSignObj.GuId).value;
							if(!signObj.bSuccess)
							{
								SubmitAOLErrMsg += "文號[" + strDocNo + "]：" + signObj.ErrMsg + "\n";
								AOLErrCount++;
							}
							else
							{
								//加簽完成後紀錄至待發文資料更新清單中
								arrUpdateDoc[nUpdateDocCnt] = arrUpdateDocInfo[iDoc].DocNo;
								nUpdateDocCnt++;
							}
							doUpdateNext(iDoc + 1);//處理下一筆公文
						})
						.fail(function(e)
						{
							//加簽失敗
							var errObj = e;
							var errMsg = '', showErr=true;
							if (errObj)
							{
								if (typeof errObj.errMsg=='string' && errObj.errMsg.length) {
									errMsg = errObj.errMsg;
								}
								else if (typeof errObj._errMsg=='string' && errObj._errMsg.length) {
									errMsg = errObj._errMsg;
								}
								if (typeof errObj._showError=='boolean' && errObj._showError===false) {
									showErr = false;
								}
								if (errMsg.length && showErr) {
									SubmitAOLErrMsg += "文號[" + strDocNo + "]：" + errMsg + "\n";
									AOLErrCount++;
								}
							}
							doUpdateNext(iDoc + 1);//處理下一筆公文
						});
					}
					else
					{
						//不需加簽直接紀錄至待發文資料更新清單中
						arrUpdateDoc[nUpdateDocCnt] = arrUpdateDocInfo[iDoc].DocNo;
						nUpdateDocCnt++;
						doUpdateNext(iDoc + 1);//處理下一筆公文
					}
				}
			}
			else
			{
				//不需發文後傳送，或為紙本公文直接紀錄至待發文資料更新清單中
				arrUpdateDoc[nUpdateDocCnt] = arrUpdateDocInfo[iDoc].DocNo;
				nUpdateDocCnt++;
				doUpdateNext(iDoc + 1);//處理下一筆公文
			}
		}
		else//全部公文已執行完封裝及加簽處理
		{
			fnUpdateSendDocInfoBatch();
		}
	}
	doUpdateNext(0);//開始逐筆處理
}

//1100510 David 1100309 處理發文資料更新
function fnUpdateSendDocInfoBatch()
{
	var rtnValue = true;
	var strMode = "0";
	if (document.all.rbReturn && !document.all.rbReturn.disabled)//如果傳送模式disable，則視同不傳送
	{
		if (document.all.rbReturn.checked)
			strMode = "1";
		else if (document.all.rbArchive.checked)
			strMode = "2";
		else if (document.all.rbNone.checked)
			strMode = "3";
		else if (document.all.rbETypeArc.checked)
			strMode = "4";
		else if (document.all.rbStamp.checked)
			strMode = "6";
	}

	//判斷單位發文或總發文
	var strCloseType = "";
	if (document.all.rbAll)
		strCloseType = "1";
	else
		strCloseType = "2";

	if (nUpdateDocCnt > 0)
	{
		if (!IsServerHandling)
		{
			var arWSParam = new Array();
			arWSParam[0] = arrUpdateDoc;
			arWSParam[1] = strCloseType;
			arWSParam[2] = encodeURI(document.all.H_Artifact.value);
			arWSParam[3] = strMode;
			callObj = jf_CallWS("ODT351WS.asmx", "UpdateSendDocInfoBatch", false, arWSParam);
			wsUpdateSendDocInfoBatchID = callObj.id;
			rtnValue = OnWSResult(callObj);
		}
	}
	else
	{
		//1000118 David 線上簽核封裝有錯誤訊息
		if (SubmitAOLErrMsg != "")
		{
			alert("線上簽核裝作業失敗共" + AOLErrCount + "筆\n" + SubmitAOLErrMsg);
			SubmitAOLErrMsg = "";
			//加簽失敗清除紀錄的PINCODE
			fnSetUserIguto("");
		}
		else
			alert("請至少選取一筆公文以進行發文資料更新作業。");
		
		rtnValue = false;
	}

	//完成後設定回來
	bSignCert = false;
	
	//由ODT351自動開啟後，執行完發文資料更新自動關閉
	if(document.all.OPEN_FROM_351)
		jf_CloseSelf();
	
	//if(rtnValue)
	{
		//調整加簽完成後觸發PostBack
		Page_BlockSubmit = false;
		IsServerHandling = true;
		jf_ShowWaitState();
		document.all.ToolBarSenderID.value = "btUpdate";
		__doPostBack("tbTool","")
	}
}

//###############################################################################
//						Client Button Control Function
//###############################################################################
function fnExec(argDocNo)
{
	//1061016	Kevin_C	1060987	修正子視窗開啟後，更改顯示來源下拉選單無法正帶出DataGrid資料的問題
	//Page_BlockSubmit = true;
	var strUrl = "ODT351.aspx?nDocNo=" + argDocNo;
	jf_OpenChildWin(strUrl, "ODT351", 700, 500);
}
function fnDocNoOnBlur()
{
	if (OriginalKeyCode == 13)
	{
		fnConfirmDocNo();
	}
}

function fnConfirmDocNo()
{
	if (!document.all.dg1)
		return;
	var strDocNo = jf_Trim(document.all["txDocNo"].value);
	if (strDocNo == "")
		return;
	var hasDocNo = false;
	//var CanSelect = true;
	for (var i = StartRow; i < document.all["dg1"].rows.length + 1; i++)
	{
		//1050830 Zen 1050087 二代公文修改
		//if (document.all["dg1__ctl" + i + "_lbDocNo"].innerText == strDocNo)
		if (document.all["dg1__ctl" + i + "_lbDocNo"].textContent == strDocNo)
		{
			//if (document.all["dg1__ctl"+i+"_cbSelect"].disabled == false)
			//{
			document.all["dg1__ctl" + i + "_cbSelect"].checked = true;
			document.all["txDocNo"].value = "";
			hasDocNo = true;
			//}
			/*
			else
				CanSelect = false;
			*/
			break;
		}
	}
	/*
	if (!CanSelect)
	{
		document.all["txDocNo"].value = "";
		document.all["txDocNo"].focus();
		alert("公文["+strDocNo+"]發文字號或發文日期未設定，此份公文無法選取，請重新輸入。");
		return;
	}
	*/
	if (!hasDocNo)
	{
		document.all["txDocNo"].value = "";
		//1050830 Zen 1050087 二代公文修改
		//document.all["txDocNo"].focus();
		$('#txDocNo').focus();
		alert("公文[" + strDocNo + "]不存在於下列公文清單中，請重新輸入。");
	}
}

function SelectAllCb(argTableName)
{
	for (var i = StartRow; i < document.all[argTableName].rows.length + 1; i++)
	{
		//if (document.all[argTableName+"__ctl"+i+"_cbSelect"].disabled == false)
		document.all[argTableName + "__ctl" + i + "_cbSelect"].checked = true;
	}
}

function CleanCb(argTableName)
{
	for (var i = StartRow; i < document.all[argTableName].rows.length + 1; i++)
	{
		//if (document.all[argTableName+"__ctl"+i+"_cbSelect"].disabled == false)
		document.all[argTableName + "__ctl" + i + "_cbSelect"].checked = false;
	}
}
/// <summary>
/// 按反向將CheckBox之Checked屬性反向
/// <summary>
function ReverseChecked(argTableName)
{
	for (var i = StartRow; i < document.all[argTableName].rows.length + 1; i++)
	{
		//if (document.all[argTableName+"__ctl"+i+"_cbSelect"].disabled == false)
		//{
		if (document.all[argTableName + "__ctl" + i + "_cbSelect"].checked)
			document.all[argTableName + "__ctl" + i + "_cbSelect"].checked = false;
		else
			document.all[argTableName + "__ctl" + i + "_cbSelect"].checked = true;
		//}
	}
}

//###############################################################################
//						Client Private Function
//###############################################################################
//1050906 David 1050087 二代轉DI功能修改，此處不需要
/*//檢查電子檔轉出路徑是否設定
function fnCheckTranPath()
{
	var bRtn = true;
	//0990831 David 0990552 修改電子轉出路徑設定--START
	//if (nodelist == null || nodelist.length != 6)
	if (nodelist == null || nodelist.length != 1)
		return false;
	//for (var i = 0 ; i < 6 ; i++)
	for (var i = 0 ; i < 1 ; i++)
	{
		if (!nodelist[i].selectSingleNode("DI") || !nodelist[i].selectSingleNode("ATTACH"))
		{
			bRtn = false;
			break;
		}
		if (jf_Trim(nodelist[i].selectSingleNode("DI").text) == "" || jf_Trim(nodelist[i].selectSingleNode("ATTACH").text) == "")
		{
			bRtn = false;
			break;
		}
	}
	//0990831 David 0990552 修改電子轉出路徑設定--END
	return bRtn;
}*/

//下載DI檔案到Client端
var msgDI = "";
var msgSW = "";
var msgAtt = "";
var bufDI = "";
var bufSW = "";
var bufAtt = "";
var numDI = 0;
var numSW = 0;
var numAtt = 0;
var msgDM = ""; var bufDM = ""; var numDM = 0;//1041225 David 1040838 新增下載DM檔

function fnTransferDI()
{
	var nTotal = arDocNo.length;
	var bIsNotifyMain = document.all.cbEmailNotifyMain.checked;
	var bIsNotifyCopy = document.all.cbEmailNotifyCopy.checked;
	var bIsNotifyScript = document.all.cbEmailNotifyScript.checked;
	var arResult = "";
	var ResultSuccess = 0;
	//判斷單位發文或總發文
	var strCloseType = "";
	if (document.all.rbAll)
		strCloseType = "1";
	else
		strCloseType = "2";

	//0970108 Matte 0960411 
	var blCanOverSize = false;
	if (document.all["h_TransDiMode"])
	{
		if (document.all["h_TransDiMode"].value == "1")
		{
			//0990915 David 0990589 附件大小依環境變數值設定顯示
			//if(window.confirm("附件總檔案大小超過1mb，是否繼續電子檔轉出？"))
			var TranAttSize = (!isNaN(document.all["H_TransAttSize"].value)) ? parseInt(document.all["H_TransAttSize"].value) : 0;
			//參數為空或0時，不限制
			if (TranAttSize != 0)
			{
				if (window.confirm("若公文需轉出附件，且附件總檔案大小超過" + TranAttSize + "MB，是否繼續電子檔轉出？"))
					blCanOverSize = true;
			}
			else
				blCanOverSize = true;
		}
	}

	for (var i = 0; i < nTotal; i++)
	{
		window.status = "目前處理進度：第" + (i + 1) + "筆，共" + nTotal + "筆。";
		var arWSParam = new Array();
		arWSParam[0] = arDocNo[i];
		//1050819 Zen 1050700 弱掃XSS修正
		//arWSParam[1] = document.all.H_DIType.value;
		arWSParam[1] = encodeURI(document.all.H_DIType.value);
		arWSParam[2] = strCloseType;
		arWSParam[3] = blCanOverSize
		callObj = jf_CallWS("ODT351WS.asmx", "TransferDI", false, arWSParam);
		wsTransferDI = callObj.id;

		OnWSResult(callObj);

		//0961108 Matte   001481
		if (!callObj.error)
		{
			if (callObj.value.ErrorClass.ErrMessage[0])
			{
				//1050906 David 1050087 二代修改
				//arResult = arResult + callObj.value.ErrorClass.ErrMessage[0].text + "\n";
				arResult = arResult + callObj.value.ErrorClass.ErrMessage[0] + "\n";
			}
			else
				ResultSuccess++;
		}

		//寄送Email通知機關內受文者，未勾選寄送對象就不處理
		//1050906 David wait
		/*if (bIsNotifyMain || bIsNotifyCopy || bIsNotifyScript)
			jf_EmailNotify(arDocNo[i], bIsNotifyMain, bIsNotifyCopy, bIsNotifyScript, document.all.H_NotifyRole.value);*/
	}

	//0961108 Stella  Matte   001481
	var msgg = "";
	var ResultErr = nTotal - ResultSuccess;
	if (arResult != "")
		msgg = "共處理" + nTotal + "筆，成功" + ResultSuccess + "筆，失敗" + ResultErr + "筆，進階資訊如下：\n" + arResult;
	else
		msgg = "共處理" + nTotal + "筆，成功" + ResultSuccess + "筆";
	if (nTotal != 0)
	{
		alert(msgg);
		window.status = "轉出完畢。";
	}
	var msg = "";
	var buf = "";
	if (msgDI != "")
	{
		msg += buf + numDI + "個DI檔：\n" + msgDI;
		buf = "\n";
	}
	if (msgSW != "")
	{
		msg += buf + numSW + "個SW檔：\n" + msgSW;
		buf = "\n";
	}
	//1041225 David 1040838 新增下載DM檔
	if (msgDM != "")
		msg += buf + numDM + "個DM檔：\n" + msgDM;

	if (msgAtt != "")
		msg += buf + numAtt + "個附件檔：\n" + msgAtt;

	if (msg != "")
		alert("檔案下載完成。共下載：\n" + msg);

	msgDI = "";
	bufDI = "";
	msgSW = "";
	bufSW = "";
	msgAtt = "";
	bufAtt = "";
	numDI = 0;
	numSW = 0;
	numAtt = 0;
	msgDM = ""; bufDM = ""; numDM = 0;//1041225 David 1040838 新增下載DM檔
}

function fnDownloadDI(RtnDI)
{
	if (!RtnDI.Documents)
		return;
	//001481 matte 0961120
	if (RtnDI.ServiceURL == "")
		return;
	var objDoc = RtnDI.Documents;
	var serviceURL = RtnDI.ServiceURL;
	var serverDI = RtnDI.DIServerPath;
	var serverAtt = RtnDI.AttachServerPath;
	var FepType = RtnDI.FepType;
	var strEncrypt = RtnDI.EncryptMode;
	var localDI = "";
	var localAtt = "";
	//依電子交換類別取得本機端檔案存放位址
	//1050906 David 1050087 修改轉出路徑設定方式，不需讀本機端設定
	/*for (var i = 0 ; i < nodelist.length ; i++)
	{
		//0990831 David 0990552 修改電子檔轉出路徑設定
		//if (nodelist[i].attributes[0].value == FepType && nodelist[i].attributes[1].value == strEncrypt)
		{
			localDI = nodelist[i].selectSingleNode("DI").text;
			localAtt = nodelist[i].selectSingleNode("ATTACH").text;
			break;
		}
	}*/
	//1050906 David 1050087 調整轉出邏輯，不需下載
	/*var soap = new ActiveXObject("WSWrapper.WebFileIO");
	var soapAttach = new ActiveXObject("WSWrapper.WebFileIO");
	//1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
	if (document.all.II_USE_SSL != null)
	{
		if (document.all.II_USE_SSL.value == "Y")
			serviceURL = serviceURL.replace("http://", "https://");
	}*/
	//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
	try
	{
		//1050906 David 1050087 調整轉出邏輯，不需下載
		//soap.Init(serviceURL);
		//soapAttach.Init(serviceURL);

		for (var i = 0; i < objDoc.length; i++)
		{
			var doc = objDoc[i];
			//1080527 David 1080387 修正電子檔轉出訊息未顯示問題
			if(!doc)
				continue;
			if (doc.DIPath)
			{
				//0981118 David 0980509 支援分繕轉出，修改下載DI檔程式邏輯--START
				var di = doc.DIPath;
				for (var dicount = 0 ; dicount < di.length ; dicount++)
				{
					//soap.AddFile(serverDI, doc.DIPath);
					//msgDI += bufDI + doc.DIPath;
					//1050906 David 1050087 調整轉出邏輯，不需下載
					//soap.AddFile(serverDI, di[dicount]);
					msgDI += bufDI + di[dicount];
					bufDI = "\n";
					numDI++;
				}
				//End
			}
			if (doc.SWPath)
			{
				//1010703 David 1010632 B5E元件分繕轉出多轉出SW及附件，程式配合修改
				//soapAttach.AddFile(serverAtt, doc.SWPath);
				//msgSW += bufSW + doc.SWPath;
				var sw = doc.SWPath;
				for (var SWcount = 0 ; SWcount < sw.length ; SWcount++)
				{
					//1050906 David 1050087 調整轉出邏輯，不需下載
					//soapAttach.AddFile(serverAtt, sw[SWcount]);
					msgSW += bufSW + sw[SWcount];
					bufSW = "\n";
					numSW++;
				}
			}
			if (doc.AttachPath)
			{
				var att = doc.AttachPath;
				for (var j = 0; j < att.length; j++)
				{
					if (att[j])
					{
						//1050906 David 1050087 調整轉出邏輯，不需下載
						//soapAttach.AddFile(serverAtt, att[j]);
						msgAtt += bufAtt + att[j];
						bufAtt = "\n";
						numAtt++;
					}
				}
			}
			//1041225 David 1040838 新增下載DM檔
			if (doc.DMPath)
			{
				var DM = doc.DMPath;
				for (var j = 0; j < DM.length; j++)
				{
					if (DM[j])
					{
						//1050906 David 1050087 調整轉出邏輯，不需下載
						//soapAttach.AddFile(serverAtt, DM[j]);
						msgDM += bufDM + DM[j];
						bufDM = "\n";
						numDM++;
					}
				}
			}
		}
		//0980924	David	0980455	使用WebFileIO，應傳入Artifact
		//soap.Download("", false, localDI);
		//soapAttach.Download("", false, localAtt);
		//1050906 David 1050087 調整轉出邏輯，不需下載
		//soap.Download(document.all.H_Artifact.value, false, localDI);
		//soapAttach.Download(document.all.H_Artifact.value, false, localAtt);
		//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
	}
	catch (e)
	{
		var strErrMsg = e.message;
		//1050906 David 1050087 調整轉出邏輯，不需下載
		/*if (soap.hasError)
			strErrMsg += soap.ErrorMessage;
		if (soapAttach.hasError)
			strErrMsg += soapAttach.ErrorMessage;
		alert("連接伺服器" + serviceURL + "下載檔案發生錯誤，錯誤訊息為:" + strErrMsg);*/
	}
	//1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
}

//1100510 David 1100309 有透過子視窗設定pincode後，回傳給SSO物件
function fnSetUserIguto(argIgotu)
{
	strIgotu = argIgotu;

	if(opener != null && opener.theSSO != null)
		opener.theSSO.User.igotu = strIgotu;
	else if(opener.opener != null && opener.opener.theSSO != null)
		opener.opener.theSSO.User.igotu = strIgotu;
}