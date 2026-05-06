/* 實作SignalR client端功能
/*
DATE	SA		PRG		MGR_NO	DESC
1090522	Kevin	Kevin	1090361 調整斷線處理邏輯
1091021 Kevin	Kevin	1090722 整理Log輸出，調整重連時間，調整註冊方式
*/
 /*
 * client methods:
 *   cHello(message: string)
 *   cGetMsgObj(message: object)
 *   cGetMsgStr(message: string)
 *   
 * server methods:
 *   sHello(SAMLart, userId + ';' + orgId) : 登錄client使用者資訊
 *   sRunQueue() : 啟動Server的SR Queue
 */


(function($) {
    function _connectSignalR(url, SAMLart, userId, orgId) {
		theLogger.log('SignalR _connectSignalR url=' + url);
		
        var _stateConversion = { 0: 'connecting',
                                 1: 'connected',
                                 2: 'reconnecting',
                                 4: 'disconnected'};
        
		theSSO.SignalR_State = _stateConversion[4];
		
		//1090930 Kevin 1090705 開啟SR套件Log
		$.connection.hub.logging = false;
		
		$.connection.hub.url = url; //"http://sysap01/SignalR";
		//auto,longPolling,serverSentEvents,webSockets
		var tranSportType = 'auto';
		
		//建立與Server端的Hub的物件，注意Hub的開頭字母一定要為小寫
        theSSO.chat = $.connection.t2100SRHUB;
			
		if ((typeof theSSO.chat ==='undefined') || (theSSO.chat===null)) {
			theLogger.error('SignalR proxy object failed.');
			return false;
		}
		
		/*
		 * 2014.7 - 以下 theSSO.chat.client.cXXX 為可供server叫用的client methods
		 */
		
		/* server叫用此函式傳送即時訊息 */
		//1090522 Kevin 1090361 調整斷線處理邏輯
        //theSSO.chat.client.cGetMsgObj = function (message) {
        theSSO.chat.client.cGetMsgObj = function (message, msgid) {
        	
			theLogger.log("SignalR Client Msg: " + message);
			//1090522 Kevin 1090361 調整斷線處理邏輯
			theSSO.chat.server.sSendMsg(SAMLart, msgid, 'GetMsg');
				
			if (theSSO.MP.rtcMsgProcessing) {
				theSSO.MP.rtcMsgQueue.push(message);
				theLogger.warn('SignalR RTCMsg處理中, 接收到另一筆訊息, 將其加入待處理queue...[queue count=' + theSSO.MP.rtcMsgQueue.length + ']');
				return;
			}
			else {
				theSSO.MP.processRTCMsg(message);
			}
		}

		// server叫用此函式, 回傳登錄結果及SR Queue執行狀況
        theSSO.chat.client.cHello = function (message) {
            theLogger.log('SignalR Client hello:' + message);
			
			//1040814 Kevin 1040577 重新連線後歸0
			theSSO.SRReConCount = 0;
			//1091021 Kevin 1090722 額外紀錄是否已註冊
			theSSO.SRLastError = '';
			theSSO.SRSetHello = true;
			
			//20150417 Kevin 調整架構訊息移至SRService處理
			//// 2014.9 - 若SR queue停止中, 則下命令開啟!
			//if (message.search('SR Queue停止中')!==-1) {
            //    console.log('-I- SR Queue停止中, 叫用 Server.sRunQueue 啟動...');
			//	theSSO.chat.server.sRunQueue();
			//}
		}
		
		/* 啟動MsgQueue後server叫用此函式告知啟動結果 */
		theSSO.chat.client.cGetMsgStr = function (message) {
			theLogger.log('SignalR Client getMsgString:' + message);
		}
		
		// callbacks
        /* 連線狀態異動時被叫用 */
		$.connection.hub.stateChanged(function(state) {
			var sTime = SSOUtil.getROCTime(new Date());
			theLogger.log('SignalR ' + sTime + ' state changed from: ' + _stateConversion[state.oldState]
						+ ' to: ' + _stateConversion[state.newState]);
			theSSO.SignalR_State = _stateConversion[state.newState];
		});
		/* SignalR連線中斷,自動重新連線前會被叫用 */
		$.connection.hub.reconnecting(function(){
			var sTime = SSOUtil.getROCTime(new Date());
			theLogger.log('SignalR ' + sTime + ' reConnecting...');
		});
        /* SignalR連線中斷,自動重新連線成功後會被叫用 */
		$.connection.hub.reconnected(function(){
			var sTime = SSOUtil.getROCTime(new Date());
			theLogger.log('SignalR ' + sTime + ' reConnected.');

			//1050823 Kevin 調整函示名稱
			//// 20150417 Kevin 重新連線後叫用server函式, 登錄連線使用者資訊.
			//window.chat.server.sHello(SAMLart, userId + ';' + orgId);
			//1090522 Kevin 1090361 調整斷線處理邏輯
			theLogger.log('SignalR sHello:SAMLart=' + SAMLart + ', UseId=' + userId + ', OrgId=' + orgId);
			
			//1091021 Kevin 1090722 調整斷線處理邏輯
			theSSO.SRSetHello = false;
			theSSO.chat.server.sHello(SAMLart, userId + ';' + orgId, $.connection.hub.transport.name, theSSO.SRLastError);
		});
        /* SignalR連線關閉後會被叫用 */
		$.connection.hub.disconnected(function(){
			var sTime = SSOUtil.getROCTime(new Date());
			var sErr = '';
			if ($.connection.hub.lastError) 
			{
				sErr = ' Error Reason: ' +  $.connection.hub.lastError.message;
				
				//1090522 Kevin 1090361 調整斷線處理邏輯
				theSSO.SRLastError += $.connection.hub.lastError.message;
			}
			theLogger.error('SignalR ' + sTime + ' DisConnected.' + sErr);
            
            // re-start in timeout
			if (theSSO.logoned) {
				
				//1040814 Kevin 1040577 配合SR機制調整重連頻率 Start
				theSSO.SRReConCount = theSSO.SRReConCount + 1;
				//1091021 Kevin 1090722 調整斷線處理邏輯
				//var iReConMsec = 180 * 1000;
				var iReConMsec = 60 * 1000;
				if (theSSO.SRReConCount <= 10) {
					iReConMsec = theSSO.SRReConCount * 1000;
				}
				theLogger.log('SignalR SRReConCount:' + theSSO.SRReConCount + ' iReConMsec:' + iReConMsec);
				//1040814 Kevin 1040577 End
			
	            setTimeout(function() {
	                theLogger.log('SignalR gonna restart SignalR connection....');
	                
					if (!theSSO.logoned)
						return;

	                //$.connection.hub.start()
					$.connection.hub.start({ transport: tranSportType })
	                 .done(function(){
	                    theLogger.log('SignalR hub re-started: SAMLart=' + SAMLart + ', UseId=' + userId + ', OrgId=' + orgId);
	                    // 重新連線後叫用server函式, 登錄連線使用者資訊.
						//1091021 Kevin 1090722 額外紀錄是否已註冊
						theSSO.SRSetHello = false;
	                    //1090522 Kevin 1090361 調整斷線處理邏輯
	                    //theSSO.chat.server.sHello(SAMLart, userId + ';' + orgId);
	                    theSSO.chat.server.sHello(SAMLart, userId + ';' + orgId, $.connection.hub.transport.name, theSSO.SRLastError);
	                 })
	                 .fail(function(){
	                    theLogger.error('SignalR re-start could not connecte to:' + url);
	                 });
				//1040814 Kevin 1040577 配合SR機制調整重連頻率
	            //}, 180 * 1000);// 20150417 Kevin 三分鐘後再重試連線! 因嘗試連線佔效能，拉長間距
				}, iReConMsec);
			}
		});
        /* SignalR連線關閉後會被叫用 */
		$.connection.hub.error(function(error){
			var sTime = SSOUtil.getROCTime(new Date());
			theLogger.error('SignalR ' + sTime + ' Error: ' + error);
			
			//1090522 Kevin 1090361 調整斷線處理邏輯
			theSSO.SRLastError += error;
		});
		
		// 將連線打開
		//$.connection.hub.start().done(function () {
		$.connection.hub.start({ transport: tranSportType }).done(function () {
				//當連線完成後，呼叫Server端的sHello方法，並傳送權杖,使用者帳號及機關代碼資訊給Server
				
				// dump transport method used.
				theLogger.log('SignalR Connected, transport=' + $.connection.hub.transport.name);
				
				theLogger.log('SignalR hub start: SAMLart=' + SAMLart + ', UseId=' + userId + ', OrgId=' + orgId);
				
				// 叫用server函式, 登錄連線使用者資訊.
				//1091021 Kevin 1090722 額外紀錄是否已註冊
				theSSO.SRSetHello = false;
				//1090522 Kevin 1090361 調整斷線處理邏輯
				//theSSO.chat.server.sHello(SAMLart, userId + ';' + orgId);
				theSSO.chat.server.sHello(SAMLart, userId + ';' + orgId, $.connection.hub.transport.name, theSSO.SRLastError);
			})
			.fail(function(){
				theLogger.error('SignalR could not connecte to:' + url);
			});
	}
    
    SSOUtil.connectSignalR = _connectSignalR;
    //1090522 Kevin 1090361 調整斷線處理邏輯
    theSSO.SRLastError = '';
	theSSO.SRSetHello = false;
})(jQuery);