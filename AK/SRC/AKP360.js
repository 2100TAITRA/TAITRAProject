/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號			概要
 * -------------------------------------------------------------------------------------------------
//1120814   Cloud 屏東縣政府問題彙整表 序143 修正查詢條件無用問題-一併修正查詢無資料後就會開始異常問題
 * 1130612		Cloud	屏東縣政府問題彙整表 序728 現場偶有公文完成加簽後，卻未呼叫更新DB的WS，造成一直被重複撈出，修改補強，判斷封裝檔已含有檔管點收加簽節點時，直接進行更新DB
 * 1130710		Cloud	屏東序831 修正密碼、憑證使用政策檢核錯誤問題
 * 1140110		Cloud	序2462_使用AKP360點收加簽作業出現跨平台網頁元件加簽異常錯誤訊息。-現場情境為一次加簽多筆才會遇到(回報案例為20~30筆，但有2筆遇到錯誤為跨平台網頁元件回覆逾時其他正常簽完)
                       ，檢視當天事件檢視器無任何異常，且當下直接重簽那2筆也可正常完成，經與Ying討論，決議補強與跨平台網頁元件相關錯誤訊息，並請現場確認跨平台網頁元件 並更新至最新版。
 * 1140716		Cloud	1131250			補強檢核憑證是否將屆期限					   
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var IsServerHandling = new Boolean();
IsServerHandling = false;
var arrUpdateDocInfo = [];//紀錄待
var SubmitAOLErrMsg = "";
var AOLErrCount = 0;
var strIgotu = "";
var bSignCert = false;
var serverList;
AjaxPro.Request.prototype.timeout = function () {
    try {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false) {
            this.abort();
        } else {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error) {

    }
    finally {

    }
}
function ShowMsg() {
    jf_ShowValidator();
}
//* 1140716		Cloud	1131250			補強檢核憑證是否將屆期限	
var CertTimeOut= "";

function ClientButtonControl(event) {
    //如為加簽中不觸發功能
    //如為加簽中不觸發功能
    if (bSignCert) {
        Page_BlockSubmit = true;
        return;
    }
    var xObjectName = event.target.id;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName) {
        //以下屬於DataGrid ToolBar
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
    }
}
function jf_ToolBarHandle(event) {
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }
    //如為加簽中不觸發功能
    if (bSignCert) {
        Page_BlockSubmit = true;
        return;
    }
        

    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btStart":
            
            var selectCnt = 0;
            var strCheckedDocNo = "";
            var tempsymbol = "";
            AOLErrCount = 0;
            arrUpdateDocInfo = [];
            if (!document.all.dg1)
                alert('下方資料列中並無資料，請先執行搜尋後，將欲加簽之公文勾選再執行本作業。');
            else {
                for (var k = 2; k < document.all.dg1.rows.length + 1; k++) {
                    if (document.all["dg1__ctl" + k + "_cbSelect"].checked) {
                        strCheckedDocNo += tempsymbol + "'" + document.all["dg1__ctl" + k + "_lbDocNo"].innerText + "'";
                        tempsymbol = ",";
                        selectCnt++;
                    }
                }
                strCheckedDocNo = "(" + strCheckedDocNo + ")";
            }
            if (selectCnt == 0) {
                alert('至少必須勾選一筆註記資料');
                return;
            }
            //Cola -- end --
			//* 1130710		Cloud	修正密碼、憑證使用政策檢核錯誤問題
			
            //執行加簽工作
            for (var i = 2; i <= document.all.dg1.rows.length; i++) {
                if (document.all["dg1__ctl" + i + "_cbSelect"].checked) {
                    var strDocNo = document.all["dg1__ctl" + i + "_lbDocNo"].textContent;
                    var strStorePath = document.all["dg1__ctl" + i + "_txStorePath"].value;
                    var strSubDir = document.all["dg1__ctl" + i + "_txSubDir"].value;
                    var strFileWs = document.all["dg1__ctl" + i + "_txWS"].value;
                    arrUpdateDocInfo.push({
                        DocNo: strDocNo
                        , StorePath: strStorePath
                        , SubDir: strSubDir
                        , FileWsUrl: strFileWs
                    });
                }
            }
            //1130710 Cloud	屏東序881 修正密碼憑證檢核未跳出訊息問題
			//fnUpdateSign();
			strIgotu = document.all["txPin"].value;
			if (strIgotu == "") {
				alert("未輸入PINCODE。");
			}
			else
			{
				var scCheCK = new SmartCard();
				var strCertb64 = "";
				var strSignature = "";
				//取得憑證資訊
				scCheCK.getSCardModuleInfo().then(function(rslt){
					if (rslt.success) {
						var now = new Date();
						var sTBS = now.getFullYear() + '-' + padLeft((now.getMonth() + 1), 2) + '-' +
						padLeft(now.getDate(), 2) + '-' + padLeft(now.getHours(), 2) + '-' +
						padLeft(now.getMinutes(), 2) + '-' + padLeft(now.getSeconds(), 2);
						var tbsB64 =  Base64.encode(sTBS);
						//密碼檢核
						scCheCK.makeSignature(tbsB64, 'base64', strIgotu, 'SHA1').then(function (r){
							//憑證檢核
							var strAuthWS = document.all.II_AUTH_WS.value;				
							scCheCK.checkCertValidity(r.certb64, "1", opener.theSSO.User.orgid, strAuthWS)
							.then(function (rCheckslt) {
							if (rCheckslt.success)
							{
								//* 1140716		Cloud	1131250			補強檢核憑證是否將屆期限	
								if("wornMsg" in rCheckslt)
								{
									CertTimeOut=rCheckslt.wornMsg;
								}
								scCheCK.reset();
								bSignCert = true;
								fnUpdateSign();
							}
							else {
								document.all["txPin"].focus();
								alert(rCheckslt.errMsg);
							}
							})
							.fail(function(Errrslt){
								alert(Errrslt._errMsg);
							});
						})
						.fail(function(r){
							document.all["txPin"].focus();
							alert(r._errMsg);
						});
					}
					else if (!!rslt._errMsg) {
						alert(rslt._errMsg);
					}
				})
			}
            Page_BlockSubmit = true;
            break;

        case "btSearch":
            if (bSignCert)
                return;
            if (document.all.txAcpDateS.value == "" && document.all.txAcpDateE.value == "" && document.all.dlUser_Text.value == "") {
                if (!window.confirm("未輸入任何輸入條件有可能導致搜尋過久，確定仍要執行嗎?")) {
                    Page_BlockSubmit = true;
                    return;
                }
            }
            Page_BlockSubmit = false;
            CheckRowNum();
            //1120814   Cloud 屏東縣政府問題彙整表 序143 修正查詢條件無用問題-一併修正查詢無資料後就會開始異常問題
            //jf_ToolBarSubmit(xObjectName);
            jf_ToolBarSubmit(xObjectName);
            break;


    }
}

function fnUpdateSign() {
	//1130710 Cloud	屏東序881 修正密碼憑證檢核未跳出訊息問題-移出函式外做
    //strIgotu = document.all["txPin"].value;
    //if (strIgotu == "") {
        //strIgotu = prompt('請輸入PINCODE');
        //if (strIgotu != "") {
            //bSignCert = true;
            //doUpdateNext(0);
        //}
        //else
        //alert("未輸入PINCODE。");
    //}
    //else {
		//1130710 Cloud 調整錯誤訊息清空時間點
        SubmitAOLErrMsg = "";
        bSignCert = true;
        doUpdateNext(0);
    //}
}
var WorkDoc;
function doUpdateNext(iDoc) {
    if (iDoc < arrUpdateDocInfo.length) {
        var WorkUlr = "";
        var WorkNm = ws_GetWebSolder(arrUpdateDocInfo[iDoc].FileWsUrl);
        if (WorkNm == undefined)
            WorkNm = 0;
        if (serverList[WorkNm] == undefined)
            WorkUlr = serverList[0];
        else
            WorkUlr = serverList[WorkNm];

        theLogger.log('-I-DOC_NO[' + arrUpdateDocInfo[iDoc].DocNo + ']GET-WorkNm-' + WorkNm);
        //WorkUlr = WorkUlr.replace('ImgConvert', 'WebSFolder').replace('ImgConvertWS.asmx', 'WebSFolder.asmx');
		WorkUlr = WorkUlr.replace(/imgconvert/i,'WebSFolder').replace(/imgconvertws.asmx/i,'WebSFolder.asmx');

        UpdateEnvelope(WorkUlr, iDoc)
            .then(function (argResult) {
                //進行加簽處裡
                var strCertb64 = "";
                var strSignature = "";
                var fHashSign = false;
                var _encodeMethod = "base64";
                var _hashAlg = "SHA1";
                var strDocNo = arrUpdateDocInfo[iDoc].DocNo;
				var sHashHeaderb64 = "MCEwCQYFKw4DAhoFAAQU"; //若回傳待簽資料hash, 則header為此值!
				var sHashHeaderb64_SHA256 = "MDEwDQYJYIZIAWUDBAIBBQAEI"; //若回傳待簽資料hash(SHA256), 則header為此值!
				var strAuthWS = document.all.II_AUTH_WS.value;
                if (argResult.RtnStr.indexOf(sHashHeaderb64) === 0 || argResult.RtnStr.indexOf(sHashHeaderb64_SHA256) === 0) { /* 104法規SHA256 */
                    fHashSign = true;
                }
                else { 
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
                    .then(function (rslt) {
                        return sc.makeSignature(argResult.RtnStr, _encodeMethod, strIgotu, _hashAlg)
                    })
					//1130710 Cloud	屏東序881 檢核移到外面
                    /*.then(function (rslt) {
                        //憑證
                        strCertb64 = rslt.certb64;
                        //簽體
                        strSignature = rslt.signature;
                        //憑證檢核                      
                        return sc.checkCertValidity(strCertb64, "1", opener.theSSO.User.orgid, strAuthWS)
                    })
                    .then(function () {*/
					.then(function (rslt) {
						//憑證
                        strCertb64 = rslt.certb64;
                        //簽體
                        strSignature = rslt.signature;

                        //呼叫signEnvelope進行加簽
                        SignEnvelopd(WorkUlr, iDoc, strCertb64, strSignature)
                            .then(function (r) {
                                //增加更新DB
                                UpdateDocInfo(iDoc)
                                    .then(function (r) {
                                        theLogger.log('-I-機關：['+ opener.theSSO.User.orgid+']-DOC_NO[' + arrUpdateDocInfo[iDoc].DocNo + ']處理完畢');
                                        doUpdateNext(iDoc + 1);//處理下一筆公文 
                                    })
                                    .fail(function (r) {
                                        theLogger.log('-I-機關：[' + opener.theSSO.User.orgid +']-DOC_NO[' + arrUpdateDocInfo[iDoc].DocNo + ']更新資料庫異常：' + r.m_strErrMsg);
                                        SubmitAOLErrMsg += "文號[" + arrUpdateDocInfo[iDoc].DocNo + "]更新資料庫異常：" + r.m_strErrMsg + "\n";
                                        doUpdateNext(iDoc + 1);//處理下一筆公文 
                                    });
                            })
                            .fail(function (r) {
                                theLogger.log('-I-機關：[' + opener.theSSO.User.orgid +']-DOC_NO[' + arrUpdateDocInfo[iDoc].DocNo + ']加簽異常：' + r.m_strErrMsg);
                                SubmitAOLErrMsg += "文號[" + arrUpdateDocInfo[iDoc].DocNo + "]加簽異常：" + r.m_strErrMsg + "\n";
                                AOLErrCount++;
                                doUpdateNext(iDoc + 1);//處理下一筆公文*/
                            });
                    })
                    .fail(function (e) {
                        //加簽失敗
                        var errObj = e;
                        var errMsg = '', showErr = true;
                        if (errObj) {
                            if (typeof errObj.errMsg == 'string' && errObj.errMsg.length) {
                                errMsg = errObj.errMsg;
                            }
                            else if (typeof errObj._errMsg == 'string' && errObj._errMsg.length) {
                                errMsg = errObj._errMsg;
                            }
                            if (typeof errObj._showError == 'boolean' && errObj._showError === false) {
                                showErr = false;
                            }
                            if (errMsg.length && showErr) {
								//1140110		Cloud	序2462_使用AKP360點收加簽作業出現跨平台網頁元件加簽異常錯誤訊息
                                //SubmitAOLErrMsg += "文號[" + arrUpdateDocInfo[iDoc].DocNo + "]跨平台網頁元件加簽異常：" + errMsg + "\n";
								SubmitAOLErrMsg += "文號[" + arrUpdateDocInfo[iDoc].DocNo + "]跨平台網頁元件加簽異常：" + errMsg + "，請稍後重簽。\n";
                                AOLErrCount++;
                            }
                        }
                        doUpdateNext(iDoc + 1);//處理下一筆公文
                    });
            })
            .fail(
                function (e) {
                    //取得簽體失敗
                    var errObj = e;
                    var errMsg = '', showErr = true;
                    if (errObj) {
                        if (typeof errObj.m_strErrMsg == 'string' && errObj.m_strErrMsg.length) {
                            errMsg = errObj.m_strErrMsg;
                        }
                        else if (typeof errObj.m_strErrMsg == 'string' && errObj.m_strErrMsg.length) {
                            errMsg = errObj.m_strErrMsg;
                        }
                        if (errMsg.length) {
							//* 1121020		Cloud	屏東縣政府問題彙整表 序239 現場偶有公文完成加簽後，卻未呼叫更新DB的WS，造成一直被重複撈出，修改補強，判斷封裝檔已含有檔管點收加簽節點時，直接進行更新DB-S
							if(errMsg.indexOf("封裝檔時已含有檔案管理單位點收簽章")!=-1)
							{
								 //增加更新DB
                                UpdateDocInfo(iDoc)
                                    .then(function (r) {
                                        theLogger.log('-I-機關：['+ opener.theSSO.User.orgid+']-DOC_NO[' + arrUpdateDocInfo[iDoc].DocNo + ']封裝檔已加簽，直接更新資料庫，處理完畢');
                                        
                                    })
                                    .fail(function (r) {
                                        theLogger.log('-I-機關：[' + opener.theSSO.User.orgid +']-DOC_NO[' + arrUpdateDocInfo[iDoc].DocNo + ']更新資料庫異常：' + r.m_strErrMsg);
                                        SubmitAOLErrMsg += "文號[" + arrUpdateDocInfo[iDoc].DocNo + "]更新資料庫異常：" + r.m_strErrMsg + "\n";
                                    });
							}
							//* 1121020		Cloud	屏東縣政府問題彙整表 序239 現場偶有公文完成加簽後，卻未呼叫更新DB的WS，造成一直被重複撈出，修改補強，判斷封裝檔已含有檔管點收加簽節點時，直接進行更新DB-E
							else
							{
                            SubmitAOLErrMsg += "文號[" + arrUpdateDocInfo[iDoc].DocNo + "]取得簽體失敗：" + errMsg + "\n";
                            AOLErrCount++;
                        }
                    }
                    }
                    doUpdateNext(iDoc + 1);//處理下一筆公文
                });
    }
    else//全部公文已執行完封裝及加簽處理，或無需加簽
    {
        //完成後設定回來
        bSignCert = false;
		//* 1140716		Cloud	1131250			補強檢核憑證是否將屆期限	
        if(CertTimeOut!="")
			alert(CertTimeOut);
		CertTimeOut="";
        if (SubmitAOLErrMsg != "") {
			//1130710	Cloud	屏東序831 因TEMPLATE有改寫ALERT 判斷非當前作用中頁面時把訊息吃掉，故跳出訊息前皆FOCUS回來避免錯誤是接在跨平台網頁元件視窗之後
			document.all["txPin"].focus();
			alert(" 點收加簽作業失敗共" + AOLErrCount + "筆\n" + SubmitAOLErrMsg);
			//1130710 Cloud 調整錯誤訊息清空時間點
            //SubmitAOLErrMsg = "";
            //strIgotu = "";

        }
        else {
            //調整加簽完成後觸發PostBack
            Page_BlockSubmit = false;
            IsServerHandling = true;
            jf_ShowWaitState();
			alert("加簽完畢。");
            document.all.ToolBarSenderID.value = "btSearch";
            __doPostBack("tbTool", "");
        }
    }

}



function ClientOnLoad() {
    ShowMsg();
    serverList = opener.SSO_CONFIG.getIsoConvertURLs();
}

function ws_GetWebSolder(url) {
    // get WebMethodInfo
    var params = new SOAPClientParameters(), res;

    SOAPClient.invokeJSON(url, "getWebSfolder", params, false, function (r) {
        if (r.error == true) {	// invokeJSON回傳錯誤的物件結構需轉成呼叫invoke時的格式
            var err = { m_bSuccess: false };
            if (!!r.errorDetail) {
                //err.m_ErrCode = r.errorDetail;
                //err.m_strErrMsg = r.errorDetail.string;
                //if (!!r.errorDetail.raw && !!r.errorDetail.raw.responseJSON && !!r.errorDetail.raw.responseJSON.Message) {
                //	err.m_ErrCode = r.errorDetail.raw.responseJSON.ExceptionType;
                //	err.m_strErrMsg = r.errorDetail.raw.responseJSON.Message + '\r\n' + r.errorDetail.raw.responseJSON.StackTrace;
                //}
            }
            else {	// 無errorDetail?
                err.m_ErrCode = r;
                err.m_strErrMsg = "invokeJSON失敗, 但未回傳errorDetail";
            }
            return err;
        }
        else
            res = r.value;
    });
    return res;
}

function UpdateEnvelope(argUrl, iDoc) {
    var _dfd = $.Deferred();
    var params = new SOAPClientParameters(), res;
    params.add('argArtifact', $('#txSAMLart').val());
    params.add('argFileServerUrl', arrUpdateDocInfo[iDoc].FileWsUrl);
    params.add('argEnvFileFullPath', arrUpdateDocInfo[iDoc].StorePath + "\\" + arrUpdateDocInfo[iDoc].SubDir);
    params.add('argDocNo', arrUpdateDocInfo[iDoc].DocNo);
    params.add('argMode', "0");
    params.add('argOrgNo', opener.theSSO.User.orgid);

    theLogger.log('-I-DOC_NO[' + arrUpdateDocInfo[iDoc].DocNo+']Call-' + argUrl + "-" + "wsAkp360UpdateEnvelope");
    SOAPClient.invokeJSON(argUrl, "wsAkp360UpdateEnvelope", params, true,
        function(r) {
			if (r.error == true) {	// invokeJSON回傳錯誤的物件結構需轉成呼叫invoke時的格式
			 var err = { m_bSuccess: false };
			 err.m_strErrMsg = r.errorDetail.string;
				_dfd.reject(err);
			}
				else
				{
                if ('value' in r)
                    r = r.value;
                theLogger.log(`-I-DOC_NO[${arrUpdateDocInfo[iDoc].DocNo}]wsAkp360UpdateEnvelope-returns：`);
                theLogger.log(r);
				if(r.m_bSuccess)
				{
					if (r.RtnStr === "") {
						_dfd.reject(r);
					}
					else {
						_dfd.resolve(r);
					}
				}
				else
				{_dfd.reject(r);}
				}
				
        });
    return _dfd.promise();
}
function SignEnvelopd(argUrl, iDoc, argSignCert, argSignature) {
    var _dfd = $.Deferred();

    var params = new SOAPClientParameters(), res;
    params.add('argArtifact', $('#txSAMLart').val());
    params.add('argFileServerUrl', arrUpdateDocInfo[iDoc].FileWsUrl);
    params.add('argEnvFileFullPath', arrUpdateDocInfo[iDoc].StorePath + "\\" + arrUpdateDocInfo[iDoc].SubDir);
    params.add('argDocNo', arrUpdateDocInfo[iDoc].DocNo);
    params.add('argSignature', argSignature);
    params.add('argSignCert', argSignCert);
    params.add('argMode', "0");
    params.add('argOrgNo', opener.theSSO.User.orgid);
    theLogger.log(`-I-CALL DOC_NO[${arrUpdateDocInfo[iDoc].DocNo}]wsAkp360SignEnvelopd：`);
    SOAPClient.invokeJSON(argUrl, "wsAkp360SignEnvelopd", params, true,
        function (r) {
			if (r.error == true) {	// invokeJSON回傳錯誤的物件結構需轉成呼叫invoke時的格式
			 var err = { m_bSuccess: false };
			 err.m_strErrMsg = r.errorDetail.string;
				_dfd.reject(err);
			}
				else
				{
            if ('value' in r)
                r = r.value;
            theLogger.log(`-I-DOC_NO[${arrUpdateDocInfo[iDoc].DocNo}]wsAkp360SignEnvelopd-returns：`);
            theLogger.log(r);
            if (r.m_bSuccess === false) {
                _dfd.reject(r);
            }
            else {
                _dfd.resolve(r);
            }
				}
			
        });
    return _dfd.promise();
}
function UpdateDocInfo(iDoc) {
    var _dfd = $.Deferred();
    //(string sArtifact, string sDocNo, string strStorePath, string strSubDir)
    var params = new SOAPClientParameters(), res;
    params.add('sArtifact', $('#txSAMLart').val());
    params.add('sDocNo', arrUpdateDocInfo[iDoc].DocNo);
    params.add('strStorePath', arrUpdateDocInfo[iDoc].StorePath);
    params.add('strSubDir', arrUpdateDocInfo[iDoc].SubDir);
    theLogger.log('-I-Call-' + document.location.origin + "/AK/AKP360WS.ASMX" + "-" + "WriteCopyByDoc2");
    SOAPClient.invokeJSON(document.location.origin + "/AK/AKP360WS.ASMX", "WriteCopyByDoc2", params, true,
        function (r) {
            if ('value' in r)
                r = r.value;
            theLogger.log('-I-wsAkp360SignEnvelopd:');
            theLogger.log(r);
            if (r.length === 0) {
                _dfd.reject(new Error('回傳權仗為空字串!'));
            }
            else {
                _dfd.resolve(r);
            }
        });
    return _dfd.promise();
}


function TxOnBlur(argObjName) {
    switch (argObjName) {
        case "txAcpDateS":
        case "txAcpDateE":
            if (document.all[argObjName].value == "") return;
            if (!jf_CheckCDATE(document.all[argObjName].value)) {
                alert("日期格式錯誤：" + document.all[argObjName].value);
                document.all[argObjName].focus();
                return;
            }
            break;
    }

}


//全部選取
function jf_SelectAll(argTableName, argCheckBoxName) {
    var i, j;
    if (document.all[argTableName] == null)
        return;

    var len = document.all[argTableName].rows.length + 1;
    for (i = 2; i < len; i++) {
        var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
        if (obj.disabled == false)
            obj.checked = true;
    }
}

//反向選取
function jf_SelectInverse(argTableName, argCheckBoxName) {
    var i, j;
    if (document.all[argTableName] == null)
        return;

    var len = document.all[argTableName].rows.length + 1;
    for (i = 2; i < len; i++) {
        var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
        if (obj.disabled == false) {
            if (obj.checked)
                obj.checked = false;
            else
                obj.checked = true;
        }
    }
}

//清除選取
function jf_SelectClear(argTableName, argCheckBoxName) {
    var i, j;
    if (document.all[argTableName] == null)
        return;

    var len = document.all[argTableName].rows.length + 1;
    for (i = 2; i < len; i++) {
        var obj = document.all[argTableName + "__ctl" + i + argCheckBoxName];
        if (obj.disabled == false)
            obj.checked = false;
    }
}
var bHasCheck = false;
function CheckRowNum() {
    if (bHasCheck) {
        bHasCheck = false;
        return true;
    }
    bHasCheck = true;
    if (parseInt(document.all.txRowNum.value) > parseInt(document.all.RowNum.value)) {
        alert("輸入筆數大於系統限制" + document.all.RowNum.value + "，請縮小筆數");
        Page_BlockSubmit = true;
        document.all.txRowNum.focus();
    }
    bHasCheck = false;
}
function padLeft(num, len) {
        if(typeof num != "string")
            num = num.toString();
        if(num.length >= len)
            return num;
        else
            return arguments.callee("0" + num, len);
}

