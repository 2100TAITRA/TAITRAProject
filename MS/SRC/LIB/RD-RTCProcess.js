/* jshint -W100 */

/*
DATE	MGRNO		SA		PG		Desc
1070123				Eric	Eric	收到taskType='bulletinnotify'訊息時，提示使用者有新進公告
1051006				Eric	David	修正收到公文傳送失敗訊息時，顯示錯誤原因
1050901 			Eric    Eric    草稿傳送reply訊息處理異常修正, MsgId => $MsgId$_$UserId$
1080927 1080339     Kevin   Eric    jQuery 3.0 upgrade. ($.type => SSOUtil.typeOf)
1090210 1081147     Kevin   Kevin   修正通知訊息於瀏覽器縮放後不會顯示問題
1091117 1090722		Kevin	Kevin	修正批次訊息僅處理第一筆訊息問題、改非同步叫用
1100528 1100450     Kevin   Kevin   修正系統公告不會跳出訊息問題
1110426 1101477		Kevin	Kevin	通知訊息新增各類案件辦理情形登錄作業連結
1111101 1110334		Kevin	Kevin	新增二代PDA
*/
/*
 * 處理即時訊息相關函式定義 (此檔案須在theSSO.MP定義後加入@RD-SysUtil.js)
 *
 * 定義 theSSO.MP.processRTCMsg 函式
 */
(function($){
	// constructor for RTCMsgList object
	function RTCMsgList(sArtifact, sNewMsg) {
		this.rtcMetaData = {
			artifact : sArtifact,
			newMsg : sNewMsg
		};
		this.subMsg = [];
		return this;
	}
	
	/*
	 * 去除MsgId開頭的'0'字元
	 */
	function _trimLeftZero(msgId) {
		var len = msgId.length;
		if (len>0) {
			var noneZeroIdx = -1;
			for(var i=0; i<len; i++) {
				if (msgId.charAt(i)=='0') {
					noneZeroIdx = i;
				}
				else {
					break;
				}
			}
			if (noneZeroIdx>=0) {
				return msgId.substring(noneZeroIdx, len-1);
			}
		}
		return msgId;
	}
	
	/* 2014.1 - 處理新進待辦訊息
	 */
	function _processNewMsg_RTC(artifact, msgIdList) {
		// 2019.12.9- 1080339 Eric, jQuery 3 upgrade!
		var _dfd = $.Deferred();

		var msgIds = msgIdList.split(';');
		var msgIdsForProcess = [];
		for(var i=0; i<msgIds.length; i++) {
			var msgId = msgIds[i];
			var doc = theSSO.MP.todolist.builder.getDocByMsgId(msgId);
			if (!doc) {
				msgIdsForProcess.push(msgId);
			}
		}
		
		if (msgIdsForProcess.length==0) {
			theLogger.error('-ERR- processNewMsg_RTC() no valid msgIds.');
			theSSO.MP.rtcMsgProcessing = false;
			_dfd.reject({success:false, errMsg:'No valid msgIds.'});
			return _dfd.promise();
		}
		
		var sMsgIdList = msgIdsForProcess.join(';');
		var rslt = false;
		
		//theWebServices.odmssp.getMsgODWMSG(artifact, sMsgIdList)
		theWebServices.odmssp.getMsgODWMSG(artifact, sMsgIdList, {async:true}) // 2020.12.21 - 1090722 Eric, 改非同步叫用.
			.then(function(ws_rslt) {
				var $odwmsgs = $(ws_rslt.m_docToDoList).find('ODWMSG');
				for(var i=0; i<$odwmsgs.length; i++)
				{
					var odwmsgNode = $odwmsgs[i];
					
					if (!odwmsgNode) {
						continue;
					}
					
					// 加入ToDoList(清單項目)
					var newDoc = theSSO.MP.todolist.builder.insertNewMsg(odwmsgNode);
					if (typeof newDoc === 'undefined' || newDoc===null) {
						theLogger.error('-ERR- insertNewMsg(MsgId=' + msgIds[i] + ') failed. invalid newDoc. [odwmsg=' + odwmsgNode.xml + ']');
						continue;
					}

                    // 2023.4.17 - 1120067 Eric, 切換至代理角色時只顯示讓角色待辦項目
                    let showDocItem = true;
                    let enableShowProxyDocOnly = SSOUtil.isValueTrue(theSSO.User.EnvSettings.get('SSO_ENABLE_SHOW_PROXYDOC_ONLY'));
                    if (enableShowProxyDocOnly) {
                        let active_role = theSSO.User.PlayRoles[theSSO.User.activeRoleIndex];
                        if (active_role!=null && active_role.proxyAccount!='') {
                            if (active_role.isJointProxy) { // 一併代理時只檢核account是否一致
                                let _own_user_id = newDoc.ownUserId; //ODWMSG.OWN_USER_ID;
                                if (active_role.proxyAccount!=_own_user_id) {
                                    showDocItem = false;
                                }
                            }
                            else { // 非一併代理時檢核own_ou_id + own_role_id 是否一致
                                let _own_ou_id = newDoc.ownOUId; //ODWMSG.OWN_OU_ID;
                                let _own_role_id = newDoc.ownRoleId; // ODWMSG.OWN_ROLE_ID;
                                if (active_role.id!=_own_role_id || active_role.unitNo!=_own_ou_id) {
                                    showDocItem = false;
                                }
                            }
                        }
                    }

                    if (showDocItem) {
                        // 2020.11.9 - merge 1090688 Eric, MOI todolist_tb delete msg problem fix.
                        if (typeof theSSO.MP.tdlSuperTable!='undefined' && theSSO.MP.tdlSuperTable!=null) {
                            // 加入View項目(list/icon/searchlist)
                            theSSO.MP.todolist.builder.insertHTMLDOMItem(newDoc);
                        }
                        else {
                            // 轉換supertable
                            theLogger.log('-I- _processNewMsg_RTC() 目前無任何待辦, 叫用_initToDoList_List()以轉換為supertable')
                            _initToDoList_List();
                        }
                    }
				}
				_dfd.resolve({success:true});
			})
			.fail(function(err) {
				theLogger.warn('get msg\'s ODWMSG failed. MsgIdList=' + sMsgIdList);
				_dfd.reject({success:false, errMsg:'Get msg\'s ODWMSG failed. MsgIdList=' + sMsgIdList});
			});
		// 2019.12.9 - 1080339 Eric, jQ3 此處應修改 return會在.then(fn) 的fn叫用前被叫用!
		return _dfd.promise(); //rslt;
	}
	/* 處理傳送作業結果通知訊息
	 * success: true/false, true->傳送成功, 刪除指定MsgId之待辦項目;
	 *          false->傳送失敗，在待辦清單回復該筆公文項目.
	 */
	function _processReplyMsg_RTC(artifact, msgId, success) {
		// 2016.9.1 - 支援草稿reply
		var msgIdTrue = msgId, ICUser = '';
		if (typeof msgId == 'string' && msgId.length) {
			var idxUnderline = msgId.indexOf('_');
			if (idxUnderline!=-1) {
				msgIdTrue = msgId.substring(0, idxUnderline);
				ICUser = msgId.substring(idxUnderline+1, msgId.length);
			}
		}
		
		var docObj = null;
		var isDraft = false; // 2019.3.21 - 1080197
		if (typeof ICUser=='string' && ICUser.length) {
			docObj = theSSO.MP.todolist.builder.getDocByMsgId(msgIdTrue, ICUser);
			isDraft = true;
		}
		else {
			docObj = theSSO.MP.todolist.builder.getDocByMsgId(msgId);
		}
		
		if (docObj) {
			if (success) {
				// 2019.3.21 - 1080197
				if ((typeof docObj.submitProcessing!=='boolean') || (docObj.submitProcessing!==true)) {
					if (isDraft) {
						// 草稿且非傳送中狀態 => 傳送後新增之相同MsgId公文, 不刪除!
						return;
					}
				}

				// 將對應的ToDoList項目刪除...
				theSSO.MP.PreviewCtrl.removePreviewItem(msgId);
				
				// 2016.11.16 - (1)通知類待辦刪除時沒有異動燈號問題, (2)依docObj.submitProcessing決定是否異動燈號統計
				// 2016.11.3 - 暫時改成reply不異動燈號.(傳送作業先異動)
				var updateLight = false;
				if (docObj.signType=='W') {
					updateLight = true;
				}
				else if (typeof docObj.submitProcessing=='undefined' || docObj.submitProcessing!==true) {
					updateLight = true;
				}
				theSSO.MP.todolist.deleteMsg(docObj, true, updateLight); 
			}
			else {
				// 回復公文至原文件夾
				theSSO.MP.todolist.restoreMsg(docObj);
			}
		}
		else {
			theLogger.error('-ERR- processReplyMsg_RTC() docObj for MsgId:' + msgId + ' is NULL.');
		}
	}
	
	/*
	 * 2014.8 - 系統或其它user傳送的通知訊息 -> 顯示提示popup 
	 */
	function _promptMsg(title, msg) {
		var $dlg = $('#prompt_dlg'); // #prompt_dlg, prompt_title, prompt_content
		//1090210 Kevin 1081147 修正通知訊息於瀏覽器縮放後不會顯示問題
		//var dlgPosition = $('#prompt_dlg-popup').position();
		//if (dlgPosition.left>0 && dlgPosition.top>0) {
		if($('#prompt_dlg').parents().hasClass('ui-popup-active')) {
		
			// 尚未關閉 -> 直接取代...
			//$dlg.find('.prompt_title').text(title);
			
			
			// 2018.2.27 - 1070123, 支援斷行(字串陣列)
			if (msg.length) {
				if (SSOUtil.typeOf(msg)=='array') {
					let sHtml = '';
					for(let i=0; i<msg.length; i++) {
						sHtml += msg[i];
						if (i<(msg.length-1)) {
							sHtml += '<br>';
						}
					}
					$dlg.find('.prompt_content')[0].innerHTML = sHtml;
				}
				else {
					//1110426 Kevin 1101477 通知訊息新增各類案件辦理情形登錄作業連結
					//$dlg.find('.prompt_content')[0].innerHTML = msg;
					if(msg.indexOf('各類案件辦理情形登錄作業')==-1)
						$dlg.find('.prompt_content')[0].innerHTML = msg;
					else
					{
						$dlg.find('.prompt_content')[0].innerHTML = msg.replace('各類案件辦理情形登錄作業','<a id="RTCMSG_EDT4901_EXAM">各類案件辦理情形登錄作業</a>');
						
						$dlg.find('.prompt_content').find('#RTCMSG_EDT4901_EXAM').on('click',function(){
							
							let strED_Site = theSSO.User.EnvSettings.get("WS_ED_SITE");
							let pUrl ="";
							if (strED_Site != "")
							{
								pUrl = strED_Site + "ED4/EDT4901_EXAM.aspx?DocNo="+msg.replace(/\D+/g,'');
				
								theStart.ChildWin.push(window.open(pUrl));
							}
						});
					}
				}
			}
			else {
				$dlg.find('.prompt_content')[0].innerHTML = '';
			}
		}
		else {
			$dlg.find('.prompt_title').text(title);
			
			// 2018.2.27 - 1070123, 支援斷行(字串陣列)
			if (msg.length) {
				if (SSOUtil.typeOf(msg)=='array') {
					let sHtml = '';
					for(let i=0; i<msg.length; i++) {
						sHtml += msg[i];
						if (i<(msg.length-1)) {
							sHtml += '<br>';
						}
					}
					$dlg.find('.prompt_content')[0].innerHTML = sHtml;
				}
				else {
					//1110426 Kevin 1101477 通知訊息新增各類案件辦理情形登錄作業連結
					//$dlg.find('.prompt_content')[0].innerHTML = msg;
					if(msg.indexOf('各類案件辦理情形登錄作業')==-1)
						$dlg.find('.prompt_content')[0].innerHTML = msg;
					else
					{
						$dlg.find('.prompt_content')[0].innerHTML = msg.replace('各類案件辦理情形登錄作業','<a id="RTCMSG_EDT4901_EXAM">各類案件辦理情形登錄作業</a>');
						
						$dlg.find('.prompt_content').find('#RTCMSG_EDT4901_EXAM').on('click',function(){
							
							let strED_Site = theSSO.User.EnvSettings.get("WS_ED_SITE");
							let pUrl ="";
							if (strED_Site != "")
							{
								pUrl = strED_Site + "ED4/EDT4901_EXAM.aspx?DocNo="+msg.replace(/\D+/g,'');
				
								theStart.ChildWin.push(window.open(pUrl));
							}
						});
					}
				}
			}
			else {
				$dlg.find('.prompt_content')[0].innerHTML = '';
			}
				
			$dlg.popup('open', { overlayTheme:'a', positionTo:'window', theme:'c', history: false });
		}
	}
	
	/*
	 * 新增公布欄通知訊息 (2014.8 - 經check系統部RTC + SignalR service行為, 應不會丟出此類訊息!)
	 */
	function _addNewBulletin(sMsg) {
		//theSSO.MP.promptMsg('新進公告', '您有新進公告!!');
	}
	
	/*
	 * Process 'eventnotify' or 'bulletinnotify' message
	 */
	function _processRTCMsg_Single(listSingle) {
		if (listSingle.subMsg[0].taksType=='bulletinnotify') {
			/* 2014.8 － 初步檢核目前系統部原始碼，電子公布欄程式不會發送訊息!!! */
		    theSSO.MP.addNewBulletin(listSignle.rtcMetaData.newMsg);
		}
		else {
			var title = '';
			if (listSingle.subMsg[0].taskType==='eventnotify') {
				title = '系統訊息';
			}
			else {
				title = listSingle.subMsg[0].taskType;
			}
		    theSSO.MP.promptMsg(title, listSingle.rtcMetaData.newMsg);
			theSSO.MP.rtcMsgProcessing = false;
		}
	}
	
	function _addToList(todo, subMsg) {
		var taskType = subMsg.TaskType.toLowerCase();
		
		// task types: 'reply', 'eventnotify', 'notification', 'bulletinnotify'
		if (taskType==='reply') { // 公文傳送作業結果回傳通知
			// success or fail?
			var sSuccess = subMsg.Success;
			var sDraft = (typeof subMsg.Draft !== 'undefined') ? subMsg.Draft : '';
			sSuccess = sSuccess.toLowerCase();
			
			sDraft = sDraft.toLowerCase();
			if (sSuccess==='true') {
				todo.listReplySuccess.subMsg.push({
					msgId : subMsg.MsgId,
					draft : (sDraft==='true') ? true : false,
					});
			}
			else {
				todo.listReplyFail.subMsg.push({
					msgId : subMsg.MsgId,
					draft : (sDraft==='true') ? true : false,
					errMsg : (typeof subMsg.ErrMsg != 'undefined') ? subMsg.ErrMsg : '',
					});
			}
		}
		else if (taskType==='eventnotify') { // 系統或其它人員傳送即時通知訊息
		    /* ToDo: 新進公告須通知系統部公布欄，待整合處理 */
			todo.listSingle.subMsg.push({
				taskType : taskType,
			});
		}
		else if (taskType==='notification') { // 新進待辦事項訊息
			var sMsgId = _trimLeftZero(subMsg.MsgId); // MsgId有時前面會補數個'0'字元，應去除！
			var sDraft = (typeof subMsg.Draft !== 'undefined') ? subMsg.Draft : '';
			sDraft = sDraft.toLowerCase();
			
			todo.listNotification.subMsg.push({
				msgId : sMsgId,
				draft : (sDraft==='true') ? true : false,
				actionType : subMsg.ActionType,
			})
		}
		/* 2015.2.25 - Eric Peng, 修改taskType='bulletinnotify' 處理log說明 */
		else if (taskType==='bulletinnotify') {
			//theLogger.warn('-W- 目前未支援\'bulletinnotify\'類型系統通知, 不處理...');
			// 2018.2.27 - 1070123, 二代只須顯示提示訊息即可!
			todo.listBulletin.subMsg.push({
				actionType: subMsg.ActionType
			});
		}
		//1111101 Kevin	1110334	新增二代PDA
		else if (taskType==='pdaevent') {

			todo.listPda.subMsg.push({
				actionType: subMsg.ActionType
			});
		}
		
		else {
			theLogger.error('-ERR- unknown taskType=' + taskType);
		}
	}

	function _processRTCMsgQueue() {
		if (theSSO.MP.rtcMsgProcessing) {
			return;			
		}
		
		theLogger.log('theSSO.MP.processRTCMsgQueue() invoked, 處理queue訊息...')
		if (theSSO.MP.rtcMsgQueue.length) {
			var message = theSSO.MP.rtcMsgQueue.pop();
			theSSO.MP.processRTCMsg(message);
		}
	}
	/*
	 * 2014.7.28 - 處理即時訊息內容
	 *  Note: [2014.8] - 目前未處理 'bulletinnotify', 'comnotify' 及 'cancelcomnotify' 三種訊息
	 *        => Server實作目前不會丟出這三種notify!
	 */
	function _processRTCMsg(rtcMsg) {
		if (theSSO.MP.rtcMsgProcessing) {
			return;		
		}
		
		/* 2014.9 - 手動加入數筆即時訊息到queue內 */
		/*if ((typeof _testSignalR_Multi !== 'undefined') &&
			_testSignalR_Multi && (theSSO.MP.rtcMsgQueue.length===0)) {
			theSSO.MP.rtcMsgQueue.push({"NewMsg":"dGVzdCBhYWFhYQ==",
									    "Artifact":"e56ddf9e-c223-450a-aa63-f6410a59da0e",
										"Address":"192.168.1.47",
										"Msgs":[{"MsgId":"","TaskType":"EventNotify","ActionType":"NewAndPopup","Draft":"False","ErrMsg":"","Success":"False"}]
										});
			theSSO.MP.rtcMsgQueue.push({"NewMsg":"dGVzdCBiYmJi",
									    "Artifact":"e56ddf9e-c223-450a-aa63-f6410a59da0e",
										"Address":"192.168.1.47",
										"Msgs":[{"MsgId":"","TaskType":"EventNotify","ActionType":"NewAndPopup","Draft":"False","ErrMsg":"","Success":"False"}]
										});
			theSSO.MP.rtcMsgQueue.push({"NewMsg":"dGVzdCBjY2NjYw==",
									    "Artifact":"e56ddf9e-c223-450a-aa63-f6410a59da0e",
										"Address":"192.168.1.47",
										"Msgs":[{"MsgId":"","TaskType":"EventNotify","ActionType":"NewAndPopup","Draft":"False","ErrMsg":"","Success":"False"}]
										});
			_testSignalR_Multi = false;
		}*/
		
		var sMsgJSON = JSON.stringify(rtcMsg);
		theLogger.log('RTCMsg=' + sMsgJSON);
		
        // 1. 取提示用文字訊息(<NewMsg>)
		var newMsg = '';
		var i=0, len=0, cnt=0, subMsg=null;
		if (typeof rtcMsg.NewMsg !== 'undefined' && rtcMsg.NewMsg.length) {
			// 即時訊息的文字編碼為UTF-16, 故應先轉為ByteArray再轉出字串.
			var outArr = Base64.decodeToUint8Array(rtcMsg.NewMsg);
			// 轉換為字串...
			len = outArr.length;
			for(i=0; i<len; i+=2) {
				var c = String.fromCharCode(outArr[i] + (outArr[i+1]<<8));
				newMsg += c;
			}
			theLogger.log('<NewMsg>=' + newMsg);
			//1060329 Kevin 新增重複登入處理
			if(!theSSO.logoned)
			{
				theLogger.log('使用者已登出，不處理訊息。')
				return;
			}
			if(newMsg.indexOf('請關閉系統。') != -1)
			{
				alert(newMsg);
				theSSO.logoned = false;
				theSSO.logOutNow = true;
				$('#btn_logout').trigger('click');
				return;
			}
		}
		
		// 2. 取權杖
		var artifact = '';
		/* 2015.12.16 - 中榮問題 1041018 - 系統部David確認, 不可使用RTCMsg的artifact, 應取用登入的Artifact */
		if (typeof localStorage.Artifact !== 'undefined' && localStorage.Artifact.length) {
            artifact = localStorage.Artifact;
        }
		/*if (typeof rtcMsg.Artifact != 'undefined') {
		 *	artifact = rtcMsg.Artifact;
		 }*/
			
		// 3. 依類別建立清單項目	
		var todo = {};
		todo.listReplySuccess = new RTCMsgList(artifact, newMsg);
		todo.listReplyFail = new RTCMsgList(artifact, newMsg);
		todo.listNotification = new RTCMsgList(artifact, newMsg);
		todo.listSingle = new RTCMsgList(artifact, newMsg);
		// 2018.2.27 - Eric, 1070123
		todo.listBulletin = new RTCMsgList(artifact, newMsg);
		//1111101 Kevin	1110334	新增二代PDA
		todo.listPda = new RTCMsgList(artifact, newMsg);
		
		// 2019.9.16 - 1080339 Eric, $.isArray => Array.isArray()
		var fMultiMsgs = Array.isArray(rtcMsg.Msgs);
		if (fMultiMsgs) {
			// rtcMsgs.SubMsg 為一 array, 取出各別項目處理
			cnt = rtcMsg.Msgs.length;
			for(i=0; i<cnt; i++) {
				subMsg = rtcMsg.Msgs[i];
				_addToList(todo, subMsg);
			}
		}
		else {
			// rtcMsgs.SubMsg 為一 object, 內容即為通知訊息.
			subMsg = rtcMsg.Msgs;
			_addToList(todo, subMsg);
		}
		
		if (todo.listReplySuccess.subMsg.length) {
			// 公文傳送成功, 刪除待辦項目
			theSSO.MP.processReplyMsg_RTC(artifact, todo.listReplySuccess.subMsg[0].msgId, true);
		}
		
		if (todo.listReplyFail.subMsg.length) {
			// 公文傳送失敗, 復原待辦項目(移回原文件夾)
			theSSO.MP.processReplyMsg_RTC(artifact, todo.listReplyFail.subMsg[0].msgId, false);

			//1051006 David 修正收到公文傳送失敗訊息時，顯示錯誤原因
			var showErrMsg = todo.listReplyFail.subMsg[0].errMsg;
			// prompt msg here...
			if (showErrMsg.length) {
			    theSSO.MP.promptMsg('傳送失敗', showErrMsg);
			}
		}
		
		if (todo.listNotification.subMsg.length) {
			// 新進待辦項目訊息
			var strMsgIdList = '';
			var actionType = '';
			i=0; subMsg=null;
			for(i=0; i<todo.listNotification.subMsg.length; i++) {
				subMsg = todo.listNotification.subMsg[i];
				strMsgIdList += (subMsg.msgId + ';');
				if (actionType.length===0) {
					actionType = subMsg.actionType.toLowerCase();
					//1091117 Kevin 1090722 修正批次訊息僅處理第一筆訊息問題
					//if (actionType.length>0) {
					//	break;
					//}
				}
			}

			// 2019.12.9 - 1080339 Eric, jQ3 upgrade. 同步叫用時.then(fn)之callback fn仍會非同步被叫用!
			theSSO.MP.processNewMsg_RTC(artifact, strMsgIdList)
			.done(function() {
				if (actionType==='newandpopup') {
					// show prompt msg box
					var showMsg = todo.listNotification.rtcMetaData.newMsg;
					// prompt msg here...
					if (showMsg.length) {
						theSSO.MP.promptMsg('新進待辦事項', showMsg);
					}
				}
			})
			.fail(function(errRslt) {
				if (typeof errRslt.errMsg=='string' && errRslt.errMsg.length) {
					alert(errRslt.errMsg);
				}
			});
		}
		
		if (todo.listSingle.subMsg.length) {
			// 通知類訊息: 顯示popup msg
			_processRTCMsg_Single(todo.listSingle);
		}
		
		// 2018.2.27 - Eric, 1070123-IFM700 RTC訊息.
		if (todo.listBulletin.subMsg.length) {
			let actionType = '';
			let i=0, subMsg=null;
			for(i=0; i<todo.listBulletin.subMsg.length; i++) {
				subMsg = todo.listBulletin.subMsg[i];
				if (actionType.length===0) {
					actionType = subMsg.actionType.toLowerCase();
					if (actionType.length>0) {
						break;
					}
				}
			}

			theStart.InitBU(); // 首頁更新公告項目.
			//1100528 Kevin 1100450 修正系統公告不會跳出訊息問題
			//if (actionType==='newandpopup') {
			if (actionType==='new') {
				// show prompt msg box
				let rawMsg = todo.listBulletin.rtcMetaData.newMsg; //'您有新進系統公告!!';
				let showMsg = rawMsg;
				if (rawMsg.indexOf('\n')!==-1) {
					showMsg = rawMsg.split('\n');
				}
				theSSO.MP.promptMsg('新進系統公告', showMsg);
			}
		}

		//1111101 Kevin	1110334	新增二代PDA
		if (todo.listPda.subMsg.length) {
			
			let actionType = todo.listPda.subMsg[0].actionType.toLowerCase();
					
			if (actionType==='folder')
			{
				$('#btn_mp').triggerHandler("click");
				let folder = todo.listPda.rtcMetaData.newMsg;
				$('#selectedFolder').val(folder).trigger('change');
			}
			else if (actionType==='url')
			{
				theStart.ChildWin.push(window.open(todo.listPda.rtcMetaData.newMsg));
			}
		}
		
		// 2014.9 - 目前訊息處理未使用multi-thread機制(call ODMSSP.GetDocToDoList), 故可在此處直接設定rtcMsgProcessing=false.
		theSSO.MP.rtcMsgProcessing = false;
		
		// 若有尚未處理的訊息，0.5秒後處理下一筆
		if (theSSO.MP.rtcMsgQueue.length) {
			setTimeout(theSSO.MP.processRTCMsgQueue, 500);
		}
	}

    if (theSSO.MP) {
        theSSO.MP.processRTCMsg = _processRTCMsg;
		theSSO.MP.processNewMsg_RTC = _processNewMsg_RTC;
		theSSO.MP.processReplyMsg_RTC = _processReplyMsg_RTC;
		theSSO.MP.promptMsg = _promptMsg;
		theSSO.MP.processRTCMsgQueue = _processRTCMsgQueue;
		//theSSO.MP.processRTCMsg_Reply = _processRTCMsg_Reply; // 傳送公文作業結果回報
		//theSSO.MP.processRTCMsg_Notification = _processRTCMsg_Notification; // 新增待辦事項
		//theSSO.MP.processRTCMsg_Single = _processRTCMsg_Single; // 通知或訊息
    }
})(jQuery);