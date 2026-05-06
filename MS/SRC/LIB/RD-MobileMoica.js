/*
DATE	MGRNO		SA		PG		Desc
1120516	1111006		Leslie	Leslie	[Merge]新增行動自然人憑證模組[1110117]，新增本作業
*/

(function($){
	theMoica = {
		checkDeviceStatus : function(argArtiact,idNum, options){
			var _dfd = $.Deferred();
			var wsUrl = (options && options.url) ? options.url : sessionStorage['AuthwsURL'];
			var wsFuncName = 'checkDeviceStatus';
			if (!wsUrl || wsUrl.length==0) {
				theLogger.error('-ERR- AuthWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
				_dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
				return _dfd.promise();
			}
			
			var async = false;
			if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
				async = true;
			}
			
			var params = new SOAPClientParameters(), res;
			params.add("argArtifact",argArtiact);
			params.add("argIdNum", idNum);
			
			SOAPClient.invokeJSON(wsUrl, wsFuncName, params, async,function(r) {
					console.log(r);
					if(typeof r.value == 'object' && 'isSuccess' in r.value) 
						_dfd.resolve(r.value);
					else if(r.error)
						_dfd.reject(new Error(r.error.errorDetail.string));
					else {
						throw new Error('叫用MOICACore.checkDeviceStatus!');
					}
			 });
			return _dfd.promise();
		},
		registUserForMoica : function(argArtiact,idNum, verifyMode, options){
			var _dfd = $.Deferred();
			var wsUrl = (options && options.url) ? options.url : sessionStorage['AuthwsURL'];
			var wsFuncName = 'registUserForMoica';
			if (!wsUrl || wsUrl.length==0) {
				theLogger.error('-ERR- AuthWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
				_dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
				return _dfd.promise();
			}
			
			var async = false;
			if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
				async = true;
			}
			
			var params = new SOAPClientParameters(), res;
			params.add("argArtifact",argArtiact);
			params.add("argIdNum", idNum.toUpperCase());
			params.add("verifyMode", verifyMode);
			
			SOAPClient.invokeJSON(wsUrl, wsFuncName, params, async,function(r) {
					console.log(r);
					if(typeof r.value == 'object' && 'isSuccess' in r.value) 
						_dfd.resolve(r.value);
					else if(r.error)
						_dfd.reject(new Error(r.error.errorDetail.string));
					else {
						throw new Error('叫用MOICACore.registUserForMoica!');
					}
			 });
			return _dfd.promise();
		},
		initMoicaID : function(argArtiact, idNum, deviceStatus,registCert, options){
			var _dfd = $.Deferred();
			var wsUrl = (options && options.url) ? options.url : sessionStorage['AuthwsURL'];
			var wsFuncName = 'initMoicaID';
			if (!wsUrl || wsUrl.length==0) {
				theLogger.error('-ERR- AuthWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
				_dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
				return _dfd.promise();
			}
			
			var async = false;
			if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
				async = true;
			}
			
			var params = new SOAPClientParameters(), res;
			params.add("argArtifact", argArtiact);
			params.add("argIdNum", idNum);
			params.add("argDeviceStatus", deviceStatus);
			params.add("argRegistCert", registCert);
			
			SOAPClient.invokeJSON(wsUrl, wsFuncName, params, async,function(r) {
					console.log(r);
					if(typeof r.value == 'string') 
						_dfd.resolve(r.value);
					else if(r.error)
						_dfd.reject(new Error(r.errorDetail.string));
					else {
						throw new Error('叫用MOICACore.initMoicaID!');
					}
			 });
			return _dfd.promise();
		},
		CheckResultByMobileMoica : function(options){
			var _dfd = $.Deferred();
			var wsUrl = (options && options.url) ? options.url : sessionStorage['AuthwsURL'];
			var wsFuncName = 'CheckResultByMobileMoica';
			if (!wsUrl || wsUrl.length==0) {
				theLogger.error('-ERR- AuthWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
				_dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
				return _dfd.promise();
			}
			
			var async = false;
			if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
				async = true;
			}
			
			var params = new SOAPClientParameters(), res;
			params.add("trancation_id", sessionStorage["trancation_id"]);
			params.add("sp_ticket_id", sessionStorage["sp_ticket_id"]);
			
			SOAPClient.invokeJSON(wsUrl, wsFuncName, params, async,function(r) {
					console.log(r);
					if(typeof r.value == 'object' && 'isSuccess' in r.value) 
						_dfd.resolve(r.value);
					else if(r.error)
						_dfd.reject(new Error(r.error.errorDetail.string));
					else {
						throw new Error('叫用MOICACore.CheckResultByMobileMoica!');
					}
			 });
			return _dfd.promise();
		},
		InitVerifyForMoica : function(argOrgNo, userName, verifyMode, options){
			var _dfd = $.Deferred();
			var wsUrl = (options && options.url) ? options.url : sessionStorage['AuthwsURL'];
			var wsFuncName = 'InitVerifyForMoica';
			if (!wsUrl || wsUrl.length==0) {
				theLogger.error('-ERR- AuthWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
				_dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
				return _dfd.promise();
			}
			
			var async = false;
			if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
				async = true;
			}
			
			var params = new SOAPClientParameters(), res;
			params.add("argOrgNo",argOrgNo);
			params.add("argUserName", userName);
			params.add("verifyMode", verifyMode);
			
			SOAPClient.invokeJSON(wsUrl, wsFuncName, params, async,function(r) {
					console.log(r);
					if(typeof r.value == 'object' && 'isSuccess' in r.value) 
						_dfd.resolve(r.value);
					else if(r.error)
						_dfd.reject(new Error(r.error.errorDetail.string));
					else {
						throw new Error('叫用MOICACore.InitVerifyForMoica!');
					}
			 });
			return _dfd.promise();
		},
		CheckLogonByMobileMoica : function(argOrgNo, argUserName, options){
			var _dfd = $.Deferred();
			var wsUrl = (options && options.url) ? options.url : sessionStorage['AuthwsURL'];
			var wsFuncName = 'CheckLogonByMobileMoica';
			if (!wsUrl || wsUrl.length==0) {
				theLogger.error('-ERR- AuthWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
				_dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
				return _dfd.promise();
			}
			
			var async = false;
			if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
				async = true;
			}
			
			var params = new SOAPClientParameters(), res;
			params.add("trancation_id", sessionStorage["trancation_id"]);
			params.add("sp_ticket_id", sessionStorage["sp_ticket_id"]);
			params.add("argOrgNo", argOrgNo);
			params.add("argUserName", argUserName);
			
			SOAPClient.invokeJSON(wsUrl, wsFuncName, params, async,function(r) {
					console.log(r);
					if(typeof r.value == 'object' && 'isSuccess' in r.value) 
						_dfd.resolve(r.value);
					else if(r.error)
						_dfd.reject(new Error(r.error.errorDetail.string));
					else {
						throw new Error('叫用MOICACore.CheckLogonByMobileMoica!');
					}
			 });
			return _dfd.promise();
		},
		InitSignDataByMoica : function(argArtiact, signData, verifyMode, options){
			var _dfd = $.Deferred();
			var wsUrl = (options && options.url) ? options.url : sessionStorage['AuthwsURL'];
			var wsFuncName = 'InitSignDataByMoica';
			if (!wsUrl || wsUrl.length==0) {
				theLogger.error('-ERR- AuthWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
				_dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
				return _dfd.promise();
			}
			var async = false;
			if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
				async = true;
			}
			
			var params = new SOAPClientParameters(), res;
			params.add("argArtifact", argArtiact);
			params.add("signData", signData);
			params.add("verifyMode", verifyMode);
			
			SOAPClient.invokeJSON(wsUrl, wsFuncName, params, async,function(r) {
					console.log(r);
					if(typeof r.value == 'object' && 'isSuccess' in r.value) 
						_dfd.resolve(r.value);
					else if(r.error)
						_dfd.reject(new Error(r.error.errorDetail.string));
					else {
						throw new Error('叫用MOICACore.InitSignDataByMoica!');
					}
			 });
			return _dfd.promise();
		},
		verifyMode :{PUSH:'PUSH',QRCode:'QRCode',WebToAPP:'WebToAPP'},
		verifyTimeOut: 180,
		actionMoicaAPP : function(user_id, sp_ticket, inFrame){
			let applestore = 'https://apps.apple.com/tw/app/行動自然人憑證/id1462866416';
			let googleplay = 'https://play.google.com/store/apps/details?id=tw.gov.moi.tfido'
			var mobileMoica = "mobilemoica://moica.moi.gov.tw/w2a/verifySign?sp_ticket="+sp_ticket;
			mobileMoica += '&rtn_url='+Base64.encode(location.origin + '/MS/RD-queryWebToAPPRslt.html').replace(/\+/g,'-');
			let rtn_val = '{"id_num":"' + user_id + '"}';
			mobileMoica += '&rtn_val='+Base64.encode(rtn_val).replace(/\+/g,'-')
			
			function triggerMoica(bParent,mobileMoica){
				if(bParent)
					parent.location = mobileMoica;
				else
					window.location = mobileMoica;
			}
			if(/Android/i.test(navigator.userAgent))
			{
				triggerMoica(inFrame,mobileMoica);
				timeout = setTimeout(function(){
					if(document.visibilityState == 'visible' && localStorage["queryWebToAPPRslt"] == undefined)
					if(confirm('未安裝行動自然人APP，\n是否現在前往安裝?')){
					  document.location = googleplay;
					}
				 }, 10000);
			}
			else if(/iPhone/i.test(navigator.userAgent)||/iPad/i.test(navigator.userAgent))
			{ 
				 triggerMoica(inFrame,mobileMoica);
				 timeout = setTimeout(function(){
					if(document.visibilityState == 'visible' && localStorage["queryWebToAPPRslt"] == undefined)
					if(confirm('未安裝行動自然人APP，\n是否現在前往安裝?')){
					  document.location = applestore;
					}
				 }, 10000);
			}
			else
			{	
				//let msg = 'iPhone or Android Phone Only!';
				alert('僅支援 iPhone、iPad 或 Android 系統');
			}
		},
		cancleCheckResult : function(){
			if(this.moicaDeferred != null)
				this.moicaDeferred.reject("使用者取消等候");
			this.verifyTimeOut = 0;
			if(this.countDown != null)
				clearInterval(this.countDown);
		}
	}
})(jQuery);

function initIdNum(registCert){
	var _dfd = $.Deferred();
	var id_num = $('#id_num').val();
	var artifact = sessionStorage["Artifact"];
	theMoica.initMoicaID(artifact,id_num,"YY",registCert,{async:true}).then(function(rslt){
		console.log(rslt);
		if(rslt == ""){
			//alert("登錄成功");
			_dfd.resolve();
		}
		else{
			_dfd.reject(new Error(rslt));
		}
	})
	return _dfd.promise();
}

function CheckResultByMoica(){
	var _dfd = $.Deferred();
	theMoica.CheckResultByMobileMoica({async:true}).then(function(rslt){
		console.log(rslt);
		if(rslt.isSuccess)
			_dfd.resolve({'done':true,'signed':rslt.signedData,'signCert':rslt.signCert});
		else if(!rslt.isSuccess && rslt.errorMsg.indexOf('尚未完成') != 0)
			_dfd.resolve({'done':false});
		else
			_dfd.reject({'done':true,'errMsg':rslt.errorMsg});
	})
	return _dfd.promise();
}

function registUserForMoica(id_num,verifyMode){
	var _dfd = $.Deferred();
	var artifact = sessionStorage["Artifact"];
	theMoica.registUserForMoica(artifact,id_num,verifyMode,{async:true}).then(function(rslt){
		console.log(rslt);
		if(rslt.isSuccess)
			_dfd.resolve(rslt,verifyMode);
		else{
			_dfd.reject(new Error(rslt));
		}
	})
	return _dfd.promise();
}

function waitResult(){
	var _dfd = $.Deferred();
	var iEnd = 180;
	var countDown = setInterval(function(){
		iEnd--;
		if(iEnd == 0){
			clearInterval(countDown);
		}
		if(iEnd%3 == 0){
			CheckResultByMoica().then(function(rslt){
				if(rslt.done){
					clearInterval(countDown);
					//驗證成功
					_dfd.resolve(rslt);
				}
			})
			.fail(function(err){
				clearInterval(countDown);
				alert(err.errMsg)
				_dfd.reject(new Error(err.errMsg));
			})
		}
	},1000)
	return 	_dfd.promise();
}

$(document).on('pagebeforecreate','#dlgMoica', function(){
	var isMobile = navigator.userAgent.search(/Mobile/gi) > 0;
	if (!isMobile && !window.realMac) {
		isMobile = navigator.userAgent.search(/Macintosh/gi) > 0;
	}
	
	if(!isMobile)
		$('#apiMode').find('option[value="WebToAPP"]').remove();
	else
		$('#apiMode').find('option[value="PUSH"]').remove();
})

$(document).on('pagecreate', '#dlgMoica', function(event, ui) {
	if(location.search.indexOf('IFM300')){
		$(this).css({
			'max-width':'50vw',
			'margin':'auto',
			'position':'relative',
			'margin-top':'calc(20vw - 100px)'
		})
	}
	
	$('#CancelBtn').on('click',function(){
		DlgClose();
	})
	
	$('#OKBtn').on('click',function(){
		var _dfd = $.Deferred();
		var id_num = $('#id_num').val();
		var verifyMode = $('#apiMode').val();
		var artifact = sessionStorage["Artifact"];
		theMoica.checkDeviceStatus(artifact,id_num,{async:true}).then(function(rslt){
			console.log(rslt);
			if(rslt.isSuccess){
				if(rslt.result == "YY")
					return registUserForMoica(id_num,verifyMode);
			}
			else{
				alert(rslt.errorMsg);
			}
		})
		.then(function(rslt,verifyMode){
			sessionStorage["trancation_id"]=rslt.trancation_id;
			sessionStorage["sp_ticket_id"]=rslt.sp_ticket_id;
			sessionStorage["id_num"]=id_num;
			
			//顯示QRCode或叫用WebToAPP
			if(rslt.genQRCode && verifyMode=="QRCode"){
				sessionStorage["QrCode"] = rslt.sp_ticket;
				$.mobile.changePage('RD-MoicaQrCode.html', { role: "dialog",data:'IFM300' }); 				
			}
			else if(verifyMode == "PUSH"){
				//循環叫用getResult
				return waitResult()
			}
			else{
				//WebToAPP
				theMoica.actionMoicaAPP(id_num, rslt.sp_ticket, true);
				return waitResult()
			}
			return 	_dfd.promise();
		})
		.then(function(rslt){
			return initIdNum(rslt.signCert);
		})
		.done(function(){
			alert('登錄成功!');
			DlgClose();
		})
		.fail(function(err){
			if (typeof err=='object' && typeof err.description=='string' && err.description.length) {
				alert(err.description);
				//theLogger.error('_postLoginProcess() failed. err=' + err.description);
			}
			else {
				// alert('登入系統作業失敗!');
				// theLogger.error('_postLoginProcess() failed.' + (typeof err=='object')?('err=' + err.toString()):'');
			}
			var errMsg;
			if (!!err && err.message) {
				errMsg = err.message;
			}
			else if (!!err && err.errMsg) {
				errMsg = err.errMsg;
			}
			console.error('Invoke checkDeviceStatus failed, errMsg:' + errMsg);
			alert(errMsg);
		})
	})
});

$(document).on('pagecreate', '#dlgQrCode', function(event,ui) {
	$('#imgQrCode').attr('src','data:image/png;base64,'+sessionStorage["QrCode"]).css('max-width','400px');
	$('.countDown').css('color','red');
	//$('#qrCodeArea').css('padding-left','calc(50% - 200px)');
	$('#dlgQrCode').css({
		'max-width': '700px',
		'margin-left': 'calc(50% - 350px)',
		'text-align': 'center'
	})
	var argMode = $(this).data("url").split("?")[1];;
	var countDown;
	if(argMode != "IFM300"){
		$('#dlgQrCode').find('.ui-btn.ui-icon-delete').off('click').on('click',function(){
			clearInterval(theMoica.countDown);
			if(theMoica.moicaDeferred != null)
				theMoica.moicaDeferred.reject("使用者取消等候");
			$.mobile.changePage( window.location.href+'#home')
		})
	}
	
	function _waitScanAndVerify(){
		var iEnd = 180;
		var _dfd = $.Deferred();
		countDown = setInterval(function(){
			$('.countDown').text(iEnd--);
			if(iEnd == 0){
				clearInterval(countDown);
				$('#dlgQrCode').find('.ui-btn.ui-icon-delete').trigger('click');
			}
			if(iEnd%3 == 0){
				CheckResultByMoica().then(function(rslt){
					if(rslt.done){
						//驗證成功
						return initIdNum(rslt.signCert);
					}
					return 	_dfd.promise();
				})
				.done(function(){
					alert('登錄成功!');
					//關
					clearInterval(countDown);
					DlgClose();
				})
				.fail(function(err){
					clearInterval(countDown);
					alert(err.message)
					$('#dlgQrCode').find('.ui-btn.ui-icon-delete').trigger('click');
				})
			}
		},1000)
	}
	
	function _pureWait(){
		countDown = setInterval(function(){
			$('.countDown').text(theMoica.verifyTimeOut);
			if(theMoica.verifyTimeOut <= 0){
				clearInterval(countDown);
				$.mobile.changePage( window.location.href+'#home')
			}
		},1000)
	}
	
	$('#RstQrCodeBtn').on('click',function(){
		var _dfd = $.Deferred();
		clearInterval(countDown);
		if(argMode == "IFM300"){
			registUserForMoica(sessionStorage["id_num"],theMoica.verifyMode.QRCode).then(function(rslt){
				$('#imgQrCode').attr('src','data:image/png;base64,'+rslt.sp_ticket);
				sessionStorage["trancation_id"]=rslt.trancation_id;
				sessionStorage["sp_ticket_id"]=rslt.sp_ticket_id;
				_waitScanAndVerify();
			})
			.fail(function(err){
				alert(err.errMsg)
				$('#dlgQrCode').find('.ui-btn.ui-icon-delete').trigger('click');
			})
		}
		else if(argMode == "Logon"){
			var orgid  = sessionStorage["moica_org_id"];
			var userid = sessionStorage["moica_user_id"];
			theMoica.InitVerifyForMoica(org_id, user_id, theMoica.verifyMode.QRCode, {async:true,url:SSO_CONFIG.getWSUrl('authws')}).then(function(rslt){
				$('#imgQrCode').attr('src','data:image/png;base64,'+rslt.sp_ticket);
				sessionStorage["trancation_id"]=rslt.trancation_id;
				sessionStorage["sp_ticket_id"]=rslt.sp_ticket_id;
				theMoica.verifyTimeOut = 180;
				//_pureWait()
			})
			.fail(function(err){
				alert(err.errMsg)
				$('#dlgQrCode').find('.ui-btn.ui-icon-delete').trigger('click');
			})
		}
		else if(argMode == "Sign"){
			theMoica.InitSignDataByMoica(localStorage["Artifact"], theMoica.toBeSign, theMoica.verifyMode.QRCode, {async:true,url:SSO_CONFIG.getWSUrl('authws')}).then(function(rslt){
				$('#imgQrCode').attr('src','data:image/png;base64,'+rslt.sp_ticket);
				sessionStorage["trancation_id"]=rslt.trancation_id;
				sessionStorage["sp_ticket_id"]=rslt.sp_ticket_id;
				theMoica.verifyTimeOut = 180;
				//_pureWait()
			})
			.fail(function(err){
				alert(err.errMsg)
				$('#dlgQrCode').find('.ui-btn.ui-icon-delete').trigger('click');
			})
		}
	})
	if(argMode == "IFM300")
		_waitScanAndVerify();
	// else
		// _pureWait();
});

$(function() {
	$(document).on('click','#cancleMoibleMoica', function(){theMoica.cancleCheckResult();})
})