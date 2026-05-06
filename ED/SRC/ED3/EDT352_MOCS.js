/*
DATE		SA		PRG		MGR_NO		DESC
1111111		David	David	1110883		新增程式
1111229		David	David	-------		(序55，銓敘部序278)調整日期為非必要條件
1111230		David	David	-------		(序67，序265)新增支援紙本歸檔
1120315		David	David	-------		(銓敘部問題彙整表序134、需求序40)支援線上簽核加簽
1130401		David	David	-------		執行功能時，判斷sServerHandling=true，補上Page_BlockSubmit=true避免重複執行
*/

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//指定DataGrid欄位
var strTableFields = new Array("_lbRead","_txInput1","_txInput2");

//1120315 David 支援線上簽核加簽，新增變數
window.SSO_CONFIG = opener.SSO_CONFIG;
var strIgotu = "";//紀錄pincode
var bSignCert = false;//是否加簽中
var arrUpdateDocInfo = [];//紀錄待發文資料更新資料
var nUpdateDocCnt = 0;
var SubmitAOLErrMsg = "";
var AOLErrCount = 0;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	//1120315 David 紀錄pincode
	if(opener != null && opener.theSSO != null)
	{
		if(typeof(opener.theSSO.User.igotu) === "string")
		{
			strIgotu = opener.theSSO.User.igotu;
		}
	}
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
    var xObjectName = e.target.id;
	
	if(IsServerHandling)
	{
		//1130401 David 補上Page_BlockSubmit=true避免重複執行
		Page_BlockSubmit=true;
		return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	//1120315 David 如為加簽中不觸發功能
	if(bSignCert)
		return;
	
	switch (xObjectName)
	{
	    case "btAdd":
	        Page_BlockSubmit = true;
	        fnDocOnblur("Add");
	        break;
	}	
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle()
{
	var xObjectName;
	
	if(IsServerHandling)
	{
		//1130401 David 補上Page_BlockSubmit=true避免重複執行
		Page_BlockSubmit=true;
		return;
	}
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	//1120315 David 如為加簽中不觸發功能
	if(bSignCert)
		return;

	xObjectName = event.target.id;
	
	switch (xObjectName)
	{
		case "btSearch":
		    Page_BlockSubmit = !jf_CheckBeforSearch();
		    if (document.all.txAddFlag.value == "Y")
		        Page_BlockSubmit = !window.confirm("查詢後會清除現已輸入的文號改以查詢結果顯示，請問是否繼續?");
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btUpdate":
			Page_BlockSubmit = !jf_CheckBeforUpdate();
			jf_ToolBarSubmit(xObjectName);
			break;
		case "btSelectAll":
            Page_BlockSubmit = true;
            jf_SelectAll("dg1", "_cbSelect");
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
            jf_SelectInverse("dg1", "_cbSelect");
            break;
        case "btSelectClear":
            Page_BlockSubmit = true;
            jf_SelectClear("dg1", "_cbSelect");
            break;
		//1111230 David 新增歸檔處理
		case "btArchive":
			Page_BlockSubmit = !jf_CheckBeforArchive();
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

function jf_CheckBeforSearch()
{
	var bRtnbool = true;
	var strErrMsg= "";

	//1111229 David 調整日期為非必要條件
	/*if (document.all["txSendDateS"].value + document.all["txSendDateE"].value == "")
	{
		strErrMsg += "送發日期不可為空\n";
		$('#txSendDateS').focus();
	}*/

	if (!CheckCDATE("txSendDateS", "送發日期(起)"))
	    return false;
	if (!CheckCDATE("txSendDateE", "送發日期(迄)"))
	    return false;

	//1111229 David 調整日期合理性邏輯
	var strS = jf_Trim(document.all.txSendDateS.value);
	var strE = jf_Trim(document.all.txSendDateE.value);
	if(strS != "" && strE == "")
		document.all.txSendDateE.value = strS;
	else if(strS == "" && strE != "")
		document.all.txSendDateS.value = strE;
	else if(strS > strE)
	{
		document.all.txSendDateS.value = strE;
		document.all.txSendDateE.value = strS;
	}

	if (strErrMsg != "")
	{
		bRtnbool = false;
		jf_ShowMsg( FormatStr( jf_GetErrMsg(CustErr), new Array([strErrMsg]) ), "" );
	}
	
	return bRtnbool;
}


function jf_CheckBeforUpdate() {
    var bRtnbool = false;

    if (document.all.dg1) {
        for (var i = 2; i <= document.all.dg1.rows.length; i++) {
            if (document.all["dg1__ctl" + i + "_cbSelect"].checked) {
                bRtnbool = true;
                break;
            }
        }

        if (bRtnbool == false)
            alert("請至少勾選一筆公文");
    }
    else
    {
        alert("無公文資料，請先查詢或輸入公文");
    }

    return bRtnbool;
}

//1111230 David 新增歸檔前檢核
function jf_CheckBeforArchive() {
    var bRtnbool = false;
	
	//1120315 David 加簽參數初始化
	var bHasSignTypeE = false;
	arrUpdateDocInfo = [];
	nUpdateDocCnt = 0;
	SubmitAOLErrMsg = "";
	AOLErrCount = 0;

    if (document.all.dg1) {
        for (var i = 2; i <= document.all.dg1.rows.length; i++) {
            if (document.all["dg1__ctl" + i + "_cbSend"].checked) {
                bRtnbool = true;
                break;
            }
        }

        if (bRtnbool == false)
		{
			alert("請至少勾選一筆公文");
			return false;
		}
    }
    else
    {
        alert("無公文資料，請先查詢或輸入公文");
		return false;
    }

	//1120313 David 整理待加簽資料
	for (var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		if (document.all["dg1__ctl" + i + "_cbSend"].checked)
		{
			var strDocNo = document.all["dg1__ctl" + i + "_lbDocNo"].textContent;
			var strSignType = document.all["dg1__ctl" + i + "_hSignType"].value;
			var strMsgId = document.all["dg1__ctl" + i + "_hMsgID"].value;

			if(strSignType == "E")
			{
				bHasSignTypeE = true;

				arrUpdateDocInfo.push({
					DocNo:strDocNo
					,SignType:strSignType
					,MsgId:strMsgId
				});
			}
		}
	}

	//1120313 David 新增加簽處理
	if(bHasSignTypeE)
	{
		if(opener.theSSO.User.EnvSettings.II_SUBMIT_SIGN == "Y" && strIgotu == "")//需加簽時才要求金鑰密碼
		{
			jf_ShowModal(opener.theSSO.User.EnvSettings.WS_LOCATION + "ODT351C3.aspx?SAMLart=" + $('#SsoArtifact').val() , "560","250");
		}
		else
			fnUpdateSign();
	}
	else
		fnUpdateSign();
	
	//1120313 David 新增加簽處理，此處一律回傳false
    //return bRtnbool;
	return false;
}

//1120315 David 封裝加簽處理
function fnUpdateSign()
{
	//設定加簽處理中
	bSignCert = true;

	function doUpdateNext(iDoc)
	{
		if(iDoc < arrUpdateDocInfo.length)
		{
			//SignWork.xml檔案處理及簽體處理
			var strAuthWS = document.all.II_AUTH_WS.value;
			var strSubmitSign = opener.theSSO.User.EnvSettings.II_SUBMIT_SIGN;
			var strArtifact = $('#SsoArtifact').val();
			var strOrgNo = opener.theSSO.User.orgid;
			var strAccount = opener.theSSO.User.account;
			var strEmpName = opener.theSSO.User.name;
			var strDocNo = arrUpdateDocInfo[iDoc].DocNo;
			var strMsgId = arrUpdateDocInfo[iDoc].MsgId;
			var strOuName = "總發文";
			var strRoleName = "發文人員";
			var strTxName = "歸檔";

			var sHashHeaderb64 = "MCEwCQYFKw4DAhoFAAQU"; //若回傳待簽資料hash, 則header為此值!
			var sHashHeaderb64_SHA256 = "MDEwDQYJYIZIAWUDBAIBBQAEI"; //若回傳待簽資料hash(SHA256), 則header為此值!

			//進行封裝處理
			var DocSignObj = ED3.EDT352_MOCS.SetSignWork(strArtifact, strOrgNo, strDocNo, strMsgId, strAccount, strEmpName, strOuName, strRoleName, strTxName).value;
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
					sc.getSCardModuleInfo()
					.then(function(rslt){
						return sc.makeSignature(DocSignObj.SignStr, _encodeMethod, strIgotu , _hashAlg)
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
						var signObj = ED3.EDT352_MOCS.signEnvelope(strArtifact, strOrgNo, strDocNo, strMsgId, DocSignObj.FileWebService, strSignature, strCertb64).value;
						if(!signObj.bSuccess)
						{
							SubmitAOLErrMsg += "文號[" + strDocNo + "]：" + signObj.ErrMsg + "\n";
							AOLErrCount++;
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
					//不需加簽直接處理下一筆公文
					doUpdateNext(iDoc + 1);
				}
			}
		}
		else//全部公文已執行完封裝及加簽處理，或無需加簽
		{
			//完成後設定回來
			bSignCert = false;

			if (SubmitAOLErrMsg != "")
			{
				alert("線上簽核裝作業失敗共" + AOLErrCount + "筆\n" + SubmitAOLErrMsg);
				SubmitAOLErrMsg = "";
				//加簽失敗清除紀錄的PINCODE
				fnSetUserIguto("");
			}
			else
			{
				//調整加簽完成後觸發PostBack
				Page_BlockSubmit = false;
				IsServerHandling = true;
				jf_ShowWaitState();
				document.all.ToolBarSenderID.value = "btArchive";
				__doPostBack("tbTool","");
			}
		}
	}
	doUpdateNext(0);//開始逐筆處理
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
		if(jf_IsWebServiceSuccess(argResult))
		{
			//document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
		}
		else
		{
			//document.all["txReadOnly"].value = "";
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
	//1120315 David PinCode回傳處理
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

	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

//檢核日期格式
function CheckCDATE(argObj, strMsg) {
    var strDate = document.all[argObj].value;
    if (strDate != "") {
        if (strDate.length < 7) {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate)) {
            if (strMsg)
                jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            $('#' + argObj).focus();
            return false;
        }
    }
    return true;
}


function fnDocOnblur(argType) {
    if (event.keyCode == 13 || argType == "Add") {
        if (document.all.dg1) {
            for (var i = 2; i <= document.all.dg1.rows.length; i++) {
                if (document.all["dg1__ctl" + i + "_lbDocNo"].textContent == document.all.txDocNo.value) {
                    alert("文號" + document.all.txDocNo.value + "已存在於清單內，請重新輸入。");
                    return;
                }
            }
        }
        Page_BlockSubmit = false;
        IsServerHandling = true;
        __doPostBack("btAdd", 0);
    }
}

//1111229 David 新增開啟DocView功能
function ViewPaper(argOrgNo,argDocNo,argSignType)
{
	try
	{
		var unvSrc = '{"UnvRoot":{"Version":"3.4","Artifact":"#artifact#","USER_ORGNO":"#SourceOrgNo#","Doc":{"Subject":"","SourceOrgNo":"#SourceOrgNo#","DocNo":"#DocNo#","Att":{"Type":"7","Alias":"正版電子檔案","PrintEnable":"TRUE"}}}}';
		unvSrc = unvSrc.replace('#artifact#',$('#SsoArtifact').val());
		unvSrc = unvSrc.replace('#DocNo#',argDocNo);
		unvSrc = unvSrc.replace(/#SourceOrgNo#/g,argOrgNo);
		var objViewDoc = {
			UNVObj: JSON.parse(unvSrc),
			docInfoPage: "AKI802",
			openDocModule: 'AOL',
			signType: argSignType,
			readOnlyMode: false,
			disableSave: true
		};
		var $docId = jf_GetSessionID() + "_" + (+new Date());
		localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
		var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + $('#SsoArtifact').val() + "&DocId=" + $docId;
		jf_OpenChildWin(unvUrl, "AKI802ViewDoc");
	} catch (e) {
		alert('開啟失敗');
	}
}

//1120315 David 有透過子視窗設定pincode後，回傳給SSO物件
function fnSetUserIguto(argIgotu)
{
	strIgotu = argIgotu;

	if(opener != null && opener.theSSO != null)
		opener.theSSO.User.igotu = strIgotu;
}