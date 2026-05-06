/*
DATE	SA		PRG		MGR_NO		DESC
1040209	Kevin	Kevin	1030911		新增軟體正式憑證
1050127	Kevin	Kevin	1050023		支援軟體正式憑證Server申請 & 調整按鈕控制方式
1070717	Kevin	Joe		1070678		修正弱掃Heap Inspection
1070816	Kevin	Joe		1070678		修正弱掃Client Server Empty Password
1070817	Kevin	Joe		1070852		移除展期功能
1080214	Kevin	Kevin	1080179		修正Client Use Of Iframe Without Sandbox
1081029	Kevin	Leslie	1080927		配合iOS13環境JQM行為差異，修正程式UI控制及流程邏輯
1130227 Kevin 	Kevin	1130188 	修正Jquery升級之後無法顯示輸入密碼視窗問題
1140716 Zen     Zen     1140108     支援修改既有軟體憑證密碼
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;
//1081029	Leslie	配合iOS13，改用自訂對話框，並使用callback Function控制流程
//window.onload = ClientOnLoad;

//1050127 Kevin 1050023 調整按鈕控制方式
//1081029	Leslie	配合iOS13，改用自訂對話框，並使用callback Function控制流程
//document.all.btDownload.onclick = ClientButtonControl;
//1070817	Joe		1070852		移除展期功能
//document.all.btExtent.onclick = ClientButtonControl;

// 字串左邊補0, 輸入數字會輸出字串

function _padLeft(num, len) {
	if(typeof num != "string")
		num = num.toString();
		
	if(num.length >= len)
		return num;
	
	return arguments.callee("0" + num, len);
}

function getTimeStr(_tmObj) {
	if (typeof _tmObj !=='undefined' && _tmObj!==null) {
		return _padLeft(_tmObj.getMonth()+1, 2) + '/' + _padLeft(_tmObj.getDate(), 2) + ' ' +
			   _padLeft(_tmObj.getHours(), 2) + ':' + _padLeft(_tmObj.getMinutes(), 2) + ':' + _padLeft(_tmObj.getSeconds(), 2);
	}
	else {
		return '';
	}		
}

function ClientOnLoad() {

	// 2019.10.23 - 1080927 Eric, debug for iPad OS 13 pfx installation
	if (window.logger) {
		//window.logger.clear();
		window.logger.add('navigator.ua=' + window.navigator.userAgent);
		window.logger.add('@ClientOnLoad href=' + window.location.href);
	}
	
	g_orgNo = $('#H_txOrgNo').val();
	g_account = $('#H_txAcc').val();
	g_CN = $('#H_txEmp').val();
	
	// 2019.10.23 - 1080927 Eric, debug for iPad OS 13 pfx installation
	if (window.logger) {
		window.logger.add('g_orgNo=' + g_orgNo + ', g_account=' + g_account + ', g_CN=' + g_CN);
	}
	
	//下載憑證需安裝
	if ($('#H_txCert').length > 0 && $('#H_txCert').val() != '') {
		// 2021.9.2 - Eric, 測iPadOS 15 beta
		if (window.logger) {
			var txCert = $('#H_txCert').val();
			window.logger.add('@ClientOnLoad gonna invoke installCert(), txCert=' + txCert);
		}
		installCert();
	}

	if ($('#H_txMSG').length > 0 && $('#H_txMSG').val() != "") {
		alert($('#H_txMSG').val());
		$('#H_txMSG').val('');
	}
	//deleteCert() Server增加FLAG處理
	
	//1081029	Leslie	配合iOS13，改用自訂對話框，並使用callback Function控制流程
	if($('#H_txMode').val() == 'btDownload')
		$('#btDownload').prop('disabled',false);
	$('#btDownload').on('click', function (e) { e.preventDefault(); ClientButtonControl(e); });

	//1140716 Zen 1140108 支援修改既有軟體憑證密碼，憑證已發放時啟用下載按鈕並調整內文
	if ($('#H_txStatus').val() == '4')
		$('#btDownload').html('重設密碼');
	
	//代替window.confirm()，需以$('selector').trigger('click')叫用，並以物件傳入外部參數，ex：{a:'msg',b:callback}
	$('#pupConfirm').on('click',function(e,options){
		if(options && options.title)
			$('#popupTitle').html(options.title.replace('\n','<br>'));
		if(options && options.oP){
			let txFld = options.title.replace('請輸入','');
			$('#lbInfo').text(txFld);
			$('#txInfo').val('').prop('placeholder',txFld);
			$('#popupDialog').data('outPut',options.oP);
			$('#txInfo').show();
		}
		else
			$('#txInfo').hide();
		if(!(options && options.cb))
			$.extend(options,{cb:function(rtn){}});	//外部未傳入callback時，寫入假函式
		//1130227 Kevin 1130188 修正Jquery升級之後無法顯示輸入密碼視窗問題
		$('#popupDialog-popup').removeClass('out');
		$('#popupDialog').off('popupafterclose');
		$('#popupDialog').on('popupafterclose',{cb:options.cb,rtnToOutPut:('oP' in options)},function(e){
			let dlgResult = $(this).data('dlgResult');
			if(e.data && e.data.rtnToOutPut && dlgResult){	//使用者按"確定"
				if($(this).data('outPut') && $(this).data('outPut').length){
					let rtn = $(this).find('#txInfo').val();
					$(this).data('outPut').val(rtn);
					if(e.data && e.data.cb)
						e.data.cb(rtn)
				}				
			}else{
				if(e.data && e.data.cb && !e.data.rtnToOutPut)
					e.data.cb(dlgResult);
			}
		})
		//e.preventDefault();
	});		
	$('#btPopNO,#popupDialog-screen').on('click',function(e){
		e.preventDefault();
		$('#popupDialog').data('dlgResult',false);
	})
	$('#btPopOK').on('click',function(e){
		e.preventDefault();
		$('#popupDialog').data('dlgResult',true);
	})
	//1081029	Leslie	配合iOS13，改用自訂對話框，並使用callback Function控制流程	==END==
}
$(function(){
	function initLog() {
		let sLogDate = localStorage['SCM950_logDate']; // YYYYMMDD
		let now = new Date();
		let sToDay = _padLeft(now.getMonth()+1, 2) + _padLeft(now.getDate(), 2) + _padLeft(now.getHours(), 2);
		if (typeof sLogDate=='string' && sLogDate.length) {
			if (sToDay != sLogDate) {
				localStorage.SCM950_logDate = '';
			}
		}
		else {
			localStorage.SCM950_logDate = sToDay;
		}
	}

	initLog();

	// 2019.10.9 - 1080905 Eric, debug for iPad OS 13 pfx installation
	if ($('#scDevMode').length && $('#scDevMode').val() == '1') {
		alert('devMode On');
		$('#logArea').show();
		window._debug = false;
		if ($('#logPanel').length) {
			var $logPanel = $('#logPanel');
			var log_content = '';
			if ('SCM950_logData' in localStorage) {
				log_content = localStorage.SCM950_logData;
			}
			
			window.logger = {
				add: function(newlog) {
					let tm = new Date();
					var _newLog = getTimeStr(tm) + '-' + newlog;
					var log = log_content + '\r\n' + _newLog;
					log_content = log;
					//$logPanel.text(log_content);
					$logPanel.val(log_content);
					localStorage.SCM950_logData = log_content;
				},
				getLogContent: function() {
					return log_content;
				},
				clear: function() {
					log_content = '';
					localStorage.SCM950_logData = '';
					//$logPanel.text(log_content);
					$logPanel.val(log_content);
				}
			};
			window.logger.add('window._debug=' + window._debug + ' [@document ready]');
			//window.logger.clear();
		}
		$('#delCert').show().on('click',function(e){
			deleteCert();
			e.preventDefault();
		});
		$('#clearLog').show().on('click',function(e){
			if(window.logger)
				window.logger.clear();
			e.preventDefault();
		});
	}
	ClientOnLoad();
})

//1050127 Kevin 1050023 調整按鈕控制方式
function ClientButtonControl(event)
{
	var xObjectName;
	if (event)
		xObjectName = event.target.id;
	else
		//xObjectName = document.activeElement.id;
		return false;
	if (IsServerHandling)
		return false;
	
	switch (xObjectName)
	{
		case "btDownload":
			//1081029	Leslie	配合iOS13，改用自訂對話框，並使用callback Function控制流程
			//Page_BlockSubmit = false;

			//1050127 Kevin 1050023 支援軟體正式憑證Server申請
			//getCert();
			if ($('#H_txSignMode').val() != "2")
			{
				//1081029	Leslie	配合iOS13，改用自訂對話框，並使用callback Function控制流程
				//getCert();
				getCert(function(rtn){
					if (window.logger) {
						window.logger.add('btDownload getCert finish!-' + rtn);
					}
					if(rtn != null && rtn != undefined && rtn.length > 0){
						Page_BlockSubmit = false;
						jf_ToolBarSubmit(xObjectName);
					}
				})
			}
			else
			{
				//1081029	Leslie	配合iOS13，改用自訂對話框，並使用callback Function控制流程
				//var strID = window.prompt("請輸入身分證字號。", "");
				//$('#H_txID').val(strID);
				//setPwd();
				showPrompt("請輸入身分證字號",$('#H_txID'),function(rtn){
					setPwd(function(rtn){
						if(rtn != null && rtn != undefined && rtn.length > 0){
							Page_BlockSubmit = false;
							jf_ToolBarSubmit(xObjectName);
						}
					})
				})
			}
			//1081029	Leslie	配合iOS13，改用自訂對話框，並使用callback Function控制流程
			//jf_ToolBarSubmit(xObjectName);
			break;
		case "btExtent":
			Page_BlockSubmit = false;
			jf_ToolBarSubmit(xObjectName);
			break;
	}
}

//1050127 Kevin 1050023 調整按鈕控制方式
//function ClientButtonControl() {
//	/*var currentDoc = document;
//
//	if (document.activeElement == document.body) {
//		currentDoc = window.frames['child-iframe'].document;
//	}
//	if (currentDoc.activeElement.type == "submit") {
//		alert(currentDoc.activeElement.id)
//	}*/
//
//	/*$('btDownload').on('click', function (event) {
//		alert(event.currentTarget === this); // true
//	})*/
//	//alert(event.currentTarget.id);
//
//	if ($('#H_txMode').length > 0 && $('#H_txMode').val() == 'btDownload') {
//		getCert();
//	}
//}

var g_orgNo = ''; //機關代碼
var g_account = ''; //帳號
var g_cert = ''; //憑證
var g_CN = ''; //名字
var g_queryCertDeferred = null, g_genKeyDeferred = null, g_installCertDeferred = null;

/* Native actions:
 *  (注意: 所有作業均須提供帳號, App內部會以帳號作為鍵值的一部份記錄憑證／金鑰資訊)
 *  genKey: 產出新的金鑰對並回傳CSR
 *  regenCSR: 以現有的金鑰對產出並回傳CSR (展期用)
 *  delCert: 刪除本機現有憑證
 *  installCert: 將CA取得的憑證匯入app keychain. (匯入作業會驗證是否為目前金鑰對之憑證)
 *  getCert: 取出app keychain內安裝的憑證
 */

/* 產出金鑰對及憑證CSR [action: 'genKey']
 * 參數:
 *   params: (object of arguments, 所有參數值都必須轉為'字串'型別)
 *     orgNo: 機關代碼
 *     account：帳號
 *     cn: 姓名, 憑證主體名稱 (ou/o/c!?)
 *     keylen: 金鑰長度 1024/2048 (預設2048)
 *     deleteExist: '1' / '0'，是否刪除指定帳號已安裝的keypair / Certificate.
 *   callback: 產出CSR後，叫用此函式傳回CSR內容. (ex. setCSRData)
 *     callback參數:
 *       errCode: 錯誤代碼, '字串' ('0'或空字串表示無錯誤)
 *       errMsg: 錯誤說明
 *       csr: base64編碼的csr內容
 */
//1081029	Leslie	配合iOS13，改用自訂對話框，並使用callback Function控制流程
//function requestCSR() {
function requestCSR(callback) {

	var params = {
		orgNo: g_orgNo,
		account: g_account,
		keylen: '2048', /* 轉成字串型別, 目前實作只接受1024/2048 */
		cn: g_CN,
		/*ou: '人事室二科', org: '台中榮總', c: 'TW' */
		deleteExist: '1'
	};

	// setup Deferred object
	var _dfd = $.Deferred();
	g_genKeyDeferred = _dfd;

	nativeCall('genKey', params, 'setCSRData', _dfd)
	.then(function (rslt) {
		if (window.logger) {
			window.logger.add('@requestCSR "genKey".then()');
		}
		if (rslt.success) {
			if (window.logger) {
				window.logger.add('@requestCSR "genKey" finish callback, gonna ask ID...');
			}
		
			$('#H_txCSR').val(rslt.csr);
			//1081029	Leslie	配合iOS13，改用自訂對話框，並使用callback Function控制流程
			//var strID = window.prompt("請輸入身分證字號。", "");
			//$('#H_txID').val(strID);
			showPrompt("請輸入身分證字號",$('#H_txID'), callback);
		}
	})
	.fail(function (err) {
		alert('憑證要求錯誤, ErrCode=' + err.errCode + ' ErrMsg=' + err.errMsg);
	});
}
		
/* 使用現有金鑰對產出新的CSR [action: 'regenCSR']
 * 參數:
 *   params: (object of arguments, 所有參數值都必須轉為'字串'型別)
 *     account：帳號
 *     cn: 姓名, 憑證主體名稱 (ou/o/c!?)
 *     
 *   callback: 產出CSR後，叫用此函式傳回CSR內容. (ex. setCSRData)
 *     callback參數:
 *       errCode: 錯誤代碼, '字串' ('0'或空字串表示無錯誤)
 *       errMsg: 錯誤說明
 *       csr: base64編碼的csr內容
 */
//1081029	Leslie	配合iOS13，改用自訂對話框，並使用callback Function控制流程
//function requestExtendedCSR() {
function requestExtendedCSR(callback) {
	var params = {
		orgNo: g_orgNo,
		account: g_account,
		cn: g_CN
		/*ou: '人事室二科', org: '台中榮總', c: 'TW' */
	};

	// setup Deferred object
	var _dfd = $.Deferred();
	g_genKeyDeferred = _dfd;

	nativeCall('regenCSR', params, 'setCSRData', _dfd)
	.then(function (rslt) {
		if (rslt.success) {
			// 2019.10/9 - 1080905 Eric, debug for iPad OS 13 pfx installation
			if (window.logger) {
				window.logger.add('@requestExtendedCSR "regenCSR" finish callback, gonna ask ID...')
			}
			$('#H_txCSR').val(rslt.csr);
		    //1081029	Leslie	配合iOS13，改用自訂對話框，並使用callback Function控制流程
			//var strID = window.prompt("請輸入身分證字號。", "");
		    //$('#H_txID').val(strID);
			showPrompt("請輸入身分證字號",$('#H_txID'),callback);
		}
	})
	.fail(function (err) {
		alert('憑證展期要求錯誤, ErrCode=' + err.errCode + ' ErrMsg=' + err.errMsg);
	});
}

//1081029	Leslie	配合iOS13，改用自訂對話框，並使用callback Function控制流程
//function setPwd()
function setPwd(callback)
{
	//1070816	Joe		1070678		修正弱掃Client Server Empty Password
	//var strPwd = window.prompt("請輸入憑證密碼。", "");
	//1081029	Leslie	配合iOS13，改用自訂對話框，並使用callback Function控制流程
	//var strMima = window.prompt("請輸入憑證密碼。", "");
	showPrompt("請輸入憑證密碼",$('#H_txMima'),function(strMima){
		var arPWDRule = $('#H_PWD_RULE').val().split('|');
		var regexStr = arPWDRule[0];
		if (arPWDRule.length < 2)
			arPWDRule[1] = '密碼格式不正確,請重新輸入';

		if (strMima.match(regexStr) != strMima)
		{
			$('#H_txMima').val('');
			alert(arPWDRule[1]);
			setPwd(callback);
		}
		else if(callback)
			callback(strMima)
	});
	
	//1081029	Leslie	配合iOS13，改用自訂對話框，並使用callback Function控制流程
	/*var arPWDRule = $('#H_PWD_RULE').val().split('|');
	var regexStr = arPWDRule[0];
	if (arPWDRule.length < 2)
		arPWDRule[1] = '密碼格式不正確,請重新輸入';

	//1070816	Joe		1070678		修正弱掃Client Server Empty Password
	// if (strPwd.match(regexStr) != strPwd)
	if (strMima.match(regexStr) != strMima)
	{
		//1070717	Joe		1070678		修正弱掃Heap Inspection
		// $('#H_txPwd').val('');
		$('#H_txMima').val('');
		alert(arPWDRule[1]);
		setPwd();
	}
	else
	{
		//1070717	Joe		1070678		修正弱掃Heap Inspection
		// $('#H_txPwd').val(strPwd);
		//1070816	Joe		1070678		修正弱掃Client Server Empty Password
		// $('#H_txMima').val(strPwd);
		$('#H_txMima').val(strMima);
	}*/
}

/* callback function for 'genKey' */
function setCSRData(errCode, errMsg, csr) {
	var orgNo = g_orgNo;
	var account = g_account;
	//alert('base64CSR=' + csr);
	localStorage[orgNo + '-' + account + '-CSR'] = csr;

	if ((errCode == '' || errCode === '0') && (errMsg.length == 0) && csr.length) {
		if (window.logger) {
			window.logger.add('@setCSRData g_genKeyDeferred.resolve');
		}
		g_genKeyDeferred.resolve({ success: true, csr: csr });

	}
	else {
		if (window.logger) {
			window.logger.add('@setCSRData g_genKeyDeferred.reject');
		}
		g_genKeyDeferred.reject({ success: false, errCode: errCode, errMsg: errMsg });
	}
}

/* 取得指定帳號安裝在裝置內的憑證 [action: 'getCert']
 * 參數:
 *   params: (object of arguments, 所有參數值都必須轉為'字串'型別)
 *     orgNo: 機關代碼
 *     account：帳號
 *     
 *   callback: 叫用此函式傳回Cert內容. (ex. setNativeCert)
 *     callback參數:
 *       errCode: 錯誤代碼, '字串' ('0'或空字串表示無錯誤)
 *       errMsg: 錯誤說明
 *       cert: base64編碼的cert內容
 */
//1081029	Leslie	配合iOS13，改用自訂對話框，並使用callback Function控制流程
//function getCert() {
function getCert(callback){
	var params = {
		orgNo: g_orgNo,
		account: g_account
	};

	// setup Deferred object
	var _dfd = $.Deferred();
	g_queryCertDeferred = _dfd;
	
	nativeCall('getCert', params, 'setNativeCert', _dfd)
	.then(function (rslt) {
		if (window.logger) {
				window.logger.add('@getCert - rslt.success='+rslt.success+' rslt.certExist='+rslt.certExist);
			}
		if (rslt.success && rslt.certExist)
		{
			// 2019.10/9 - 1080905 Eric, debug for iPad OS 13 pfx installation
			if (window.logger) {
				window.logger.add('@getCert finish callback ');
			}
			//1050127 Kevin 1050023 調整按鈕控制方式
			//if (rslt.cert == $('#H_WaitExtCert').val())
			if (rslt.cert == $('#H_txWaitExtCert').val()){
				//1081029	Leslie	配合iOS13，改用自訂對話框，並使用callback Function控制流程
				//requestExtendedCSR();
				requestExtendedCSR(function(strID){
					if (window.logger) {
						window.logger.add('requestExtendedCSR finish!-'+strID);
					}
					if(callback)
						callback(strID);
				});
			}
			else
			{
				//1050127 Kevin 1050023 修正已安裝憑證處理邏輯
				//alert('指定帳號:' + g_account + ' 已安裝憑證:' + rslt.cert);
				//1081029	Leslie	配合iOS13，改用自訂對話框，並使用callback Function控制流程
				//if(window.confirm('指定帳號:' + g_account + ' 已安裝憑證。\r\n是否取代憑證？'))
				showConfirm('指定帳號:'+g_account+' 已安裝憑證。\n是否取代憑證？',function(rtn){
					if(rtn){
						deleteCert();
						//1081029	Leslie	配合iOS13，改用自訂對話框，並使用callback Function控制流程
						//requestCSR();
						requestCSR(function(strID){
							if (window.logger) {
								window.logger.add('requestCSR finish!-'+strID);
							}
							if(callback)
								callback(strID);
						});
					}
				});
			}
		}
		else if (rslt.success && !rslt.certExist) {
			//alert('指定帳號:' + g_account + ' 未安裝憑證!');
			//1081029	Leslie	配合iOS13，改用自訂對話框，並使用callback Function控制流程
			//requestCSR();
			requestCSR(function(strID){
				if (window.logger) {
					window.logger.add('requestCSR finish!-' + strID);
				}
				if(callback)
					callback(strID);
			});
		}
	})
	.fail(function (err) {
		alert('查詢憑證作業錯誤, ErrCode=' + err.errCode + ' ErrMsg=' + err.errMsg);
	});
}

function setNativeCert(errCode, errMsg, cert) {
	if ((errCode == '' || errCode === '0') && (errMsg.length == 0) && cert.length) {
		var _account = g_account.toUpperCase();

		g_cert = cert;

		if (g_queryCertDeferred) {
			g_queryCertDeferred.resolve({ success: true, certExist: true, cert: cert });
		}
	}
	else if (errCode == '0' && (cert.length == 0)) {

		if (g_queryCertDeferred) {
			g_queryCertDeferred.resolve({ success: true, certExist: false, cert: '' });
		}
	}
	else {
		if (g_queryCertDeferred) {
			g_queryCertDeferred.reject({ success: false, errCode: errCode, errMsg: errMsg });
		}
	}
}

/* 安裝憑證到裝置app的keychain[action: 'installCert']
 * 參數:
 *   params: (object of arguments, 所有參數值都必須轉為'字串'型別)
 *     orgNo: 機關代碼
 *     account：帳號
 *     sn: 憑證序號
 *     issuer: 憑證發行者
 *     subject: 憑證主體
 *     startDate: 憑證起始效期 yyyMMddHHmmss (中華民國年，年3碼月2碼日2碼時2碼分2碼秒2碼)
 *     endDate: 憑證結束效期 yyyMMddHHmmss (中華民國年，年3碼月2碼日2碼時2碼分2碼秒2碼)
 *     replaceExist: '1'/'0', 是否取代原安裝的憑證.[預設'0']
 *   callback:
 *     作業完成一律叫用callback Func, 若ErrCode=0則表示作業成功,
 *     ErrCode小於0, 則表示作業時發生錯誤, ErrMsg有錯誤說明.
 */
function installCert() {
	var params = {
		orgNo: g_orgNo,
		account: g_account,
		sn: $('#H_txSn').val(),
		issuer: $('#H_txIssuer').val(),
		subject: $('#H_txSubject').val(),
		startDate: $('#H_txStartDate').val(),
		endDate: $('#H_txEndDate').val(),
		cert: $('#H_txCert').val()
	};

	// setup Deferred object
	var _dfd = $.Deferred();
	g_installCertDeferred = _dfd;
	
	// 2021.9.2 - Eric, 測iPadOS 15 beta
	if (window.logger) {
		window.logger.add('@installCert(), before nativeCall(\'installCert\', ...) params=' + JSON.stringify(params));
	}	

	nativeCall('installCert', params, 'certInstalled', _dfd)
		.then(function (rslt) {
			if (rslt.success) {
				//1081029	Leslie	增修install憑證後，一併清除localStorage.certData-$account$
				delete localStorage['certData-'+g_account];
				/* 取得憑證後更新localStorag[certData-$account$]內容! */
				alert('憑證安裝成功');
			}

		})
	.fail(function (err) {
		alert('安裝憑證作業錯誤, ErrCode=' + err.errCode + ' ErrMsg=' + err.errMsg);
	});
}

function certInstalled(errCode, errMsg) {
	
	if ((errCode == '' || errCode === '0') && (errMsg.length == 0) ) {
		if (g_installCertDeferred) {
			g_installCertDeferred.resolve({ success: true });
		}
	}
	else {
		if (g_installCertDeferred) {
			g_installCertDeferred.reject({ success: false, errCode: errCode, errMsg: errMsg });
		}
	}
}

/* 刪除安裝於裝置app keychain的憑證[action: 'delCert']
 * 參數:
 *   params: (object of arguments, 所有參數值都必須轉為'字串'型別)
 *     orgNo: 機關代碼
 *     account：帳號
 *     delKeyPari: '1'/'0', 是否一併刪除金鑰對(keypair), 預設'1':刪除
 *   callback:
 *     作業完成一律叫用callback Func, 若ErrCode=0則表示作業成功,
 *     ErrCode小於0, 則表示作業時發生錯誤, ErrMsg有錯誤說明.
 */
function deleteCert() {
	var params = {
		orgNo: g_orgNo,
		account: g_account,
		delKeyPair: '1'
	};
	
	//1081029	Leslie	增修刪除憑證後，一併清除localStorage.certData-$account$
	//nativeCall('delCert', params, 'certDeleted');
	var _dfd = $.Deferred();
	g_installCertDeferred = _dfd;
	
	nativeCall('delCert', params, 'certDeleted',_dfd)
	.then(function(rslt){
		// 2019.10/9 - 1080905 Eric, debug for iPad OS 13 pfx installation
		if (window.logger) {
			window.logger.add('certDeleted=' + rslt.toString());
		}
		
		if (rslt.success) {
			delete localStorage['certData-'+g_account];
		}
	})
	.fail(function(err){
		alert('刪除慼證作業錯誤, ErrCode=' + err.errCode + ' ErrMsg=' + err.errMsg);
	})
	//1081029	Leslie	增修刪除憑證後，一併清除localStorage.certData-$account$	==END==
}

function certDeleted(errCode, errMsg) {

}

/* 使用此JS函式叫用 native objective-c code
 * [iframe.src url格式: 'CertMgmt://' + action + '#' + params]
 *
 * Protocol: 固定字串: 'CertMgmt://'
 * action : 字串, 作業代碼
 * args : object of arguments
 *      1. each item is a name:value pair
 *      2. 設定值必須為字串型別.
 * callback : function name of callback
 */
function nativeCall(action, args, callback, dfd) {
	var hasCallback = callback;

	/* 將args物件轉換為參數字串 */
	var fullParam = '';
	var itemStr;
	for (idx in args) {
		if (fullParam.length) {
			itemStr = '&' + idx + '=' + encodeURIComponent(args[idx]);
		}
		else {
			itemStr = idx + '=' + encodeURIComponent(args[idx]);
		}
		fullParam += itemStr;
	}

	var iframe = document.createElement("IFRAME");
	var urlStr = "CertMgmt://" + action + "#" + fullParam;
	if (callback) {
		urlStr += '&callback=' + callback;
	}
	//alert('urlStr=' + urlStr);
	//1081029	Leslie
	if (window.logger) {
		window.logger.add('[nativeCall] urlStr=' + urlStr);	
	}

	iframe.setAttribute("src", urlStr);
	// For some reason we need to set a non-empty size for the iOS6 simulator...
	iframe.setAttribute("height", "1px");
	iframe.setAttribute("width", "1px");
	//1080214 Kevin 1080179 修正Client Use Of Iframe Without Sandbox
	iframe.setAttribute("sandbox", "allow-same-origin allow-scripts allow-popups allow-forms allow-modals");
	document.documentElement.appendChild(iframe);
	iframe.parentNode.removeChild(iframe);
	iframe = null;

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

//1050127 Kevin 1050023 調整按鈕控制方式
function jf_ToolBarSubmit(argButton)
{
	if (Page_BlockSubmit == false)
	{
		document.all.ToolBarSenderID.value = argButton;
		IsServerHandling = true;
		__doPostBack(argButton, 0);
		//1081029	Leslie
		Page_BlockSubmit = true;
	}
}

/*
1081101	Leslie	新增自訂對話框共用函式
strTitle:對話框主訊息
outPut:prompt的回傳值要放在哪個欄位，需為jQuery物件
callback:callback Function，二個函式都會經由callback函式回傳結果，用於流程判斷
showPrompt():只在確定時呼叫callback，並傳入對話框中輸入的值
showConfirm():一律呼叫callback，並傳入true/false
*/
function showPrompt(strTitle,outPut,callback){
	if (window.logger) {
		window.logger.add('@showPrompt '+strTitle);
	}
	$('#pupConfirm').trigger('click',{title:strTitle,oP:outPut,cb:callback})
}
function showConfirm(strTitle,callback){
	if (window.logger) {
		window.logger.add('@showConfirm '+strTitle);
	}
	$('#pupConfirm').trigger('click',{title:strTitle,cb:callback})
}