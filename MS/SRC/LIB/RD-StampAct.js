// Stamp action
// 章戳連動功能
//
//  2015.12.15 - Raymond, 改用theLogger記錄LOG資訊

/*
DATE	MGRNO		SA		PG		Desc
1060609	1060212		Leslie	Leslie	新增鐵工客製化，補陳共用章戳相關邏輯
1080923 1080339     Kevin   Eric    jQuery 3.0 upgrade
1111118	1111286		Leslie	Leslie	針對考試院環境，強制啟用"不顯示"詢問連動發文方式對話框，並清除前單不會執行的部分
1130806	1130509		Leslie	Leslie	[中榮]修改依設定取消加蓋核示語詞時顯示的發文方式對話框
*/


function StampActionHandler() {
    
    function isApproved() {
        // 2015.10 - Eric Peng, 判定公文是否已核決!
				var _docObj = theAOL.docObj;
        var docApproved =(_docObj.get('ODWMSG', 'APP_USER_ID').length || _docObj.get('ODWMSG', 'APP_ROLE_ID').length) ? true : false;
        return docApproved;
    }
    
    /* 2015.10 - Eric Peng, 若加蓋章戳有關聯動作, 執行動作前叫用此函式確認公文狀態,
     * 並決定是否詢問使用者處理方法
     */
    this.actionConfirm = function(actName) {
		var _dfd = $.Deferred();
		
		//1060608	Leslie[1060212]	鐵工局需求，增加"補陳"選用章戳之判定
		var _CheckReapply = false;
		if(SSO_CONFIG.OrgNickName == "RRB" && actName.indexOf("補陳") != -1) {
			_CheckReapply = true;
			actName = actName.replace("補陳","");
		}
		
		var act = theAOL.actDef.find(actName);
		var _docObj = theAOL.docObj;
		
		/* 2015.10 - Eric Peng,
		 * 1. 依PC版邏輯實作
		 * 2. 若公文不可核決, 提示User
		 * 3. 公文已核決時, 提示User是否執行關聯動作 (應在叫用此函式前確認)
		 * 4. 結案類型與目前公文狀態不符, 提示User不會動作!
		*/
		var enableApprove = (SSOUtil.isValueTrue(_docObj.get('ODWDCM', 'CANCEL_APP_ENABLE')));
		var docApproved =(_docObj.get('ODWMSG', 'APP_USER_ID').length || _docObj.get('ODWMSG', 'APP_ROLE_ID').length) ? true : false;
		if((act !== undefined) && (act !== null)) {
			theSSO.Util.isSignDocApprove(theAOL)
			.done(function(rslt){
				var isSignDocApprove = rslt.isSignDocDraft;
				theSSO.Util.getApproveOptionsDlgDisplaySettings(theAOL, theSSO.User.EnvSettings)
				.done(function(approveUISetting){
					if (docApproved) {
						// 公文已核決
						if (act.statusBefore==="unapproved")  {
							if (enableApprove) {
								if (!isSignDocApprove) {
									if (act.approveType==='單位發文' && approveUISetting.userLevel===1) {
										_dfd.resolve({
											action : act,
											showMsg : true,
											msg : "公文目前在一層決行單位, 核決類型不可為單位發文",
											options : [{doAction:false, addStamp:false}] // 一個option, 不執行, 不加蓋!
										})
										return;
									}

									// 2021.6 - 1100489 Eric, 消防署已核決公文再蓋核決章時, 只蓋章, 不提示使用者且不執行異動結案類型(CLOSE_TYPE)作業!
									//1130806	Leslie[1130509]	[中榮]修改依設定取消加蓋核示語詞時顯示的發文方式對話框
									// let sAppActNFA = theSSO.User.EnvSettings.get('AOL_STAMP_APPROVE_ACTION_NFA');
									let sAppActOnly = theSSO.User.EnvSettings.get('AOL_STAMP_APPROVE_ACTION_ONLY');
									//1111118	Leslie[1111286]	考試院環境強制啟用
									// if (typeof sAppActNFA=='string' && SSOUtil.isValueTrue(sAppActNFA)) {
									// if ((typeof sAppActNFA=='string' && SSOUtil.isValueTrue(sAppActNFA)) || SSO_CONFIG.OrgNickName == 'EXAM') {
									if ((SSOUtil.isValueTrue(sAppActOnly)) || SSO_CONFIG.OrgNickName == 'EXAM') {
										// 蓋章但不異動核決類型!
										_dfd.resolve({action:null, showMsg:false, msg:'', options:[{doAction:false, addStamp:true}]});
									}
									else {
										// 公文已核決且此時可核決!
										// ToDo:提示使用者已核決, 蓋此章戳可能異動核決狀態!
										_dfd.resolve({
												action : act,
												showMsg : true,
												msg : "本公文已核決，加蓋此章戳會執行設定之核決關聯作業，是否要執行該作業?\r\n" +
														"是: 加蓋並執行 [" + actName + "] 作業.\r\n" + 
														"否: 加蓋但不執行關聯作業.\r\n" +
														"取消: 不加蓋此章戳",
												options : [{btnText:'是', doAction:true, addStamp:true }, // option1 -> 執行&加蓋!
															{btnText:'否', doAction:false, addStamp:true }, // option2 -> 不執行&加蓋!
															{btnText:'取消', doAction:false, addStamp:false }] // option3-> 不執行&不加蓋!
										});
									}
									return;
								}
							}
							else {
								// 公文已核決且此時不可核決!
								// ToDo:提示使用者不可核決, 蓋此章戳不會執行關連動作!
								_dfd.resolve({
									action : act,
									showMsg : true,
									msg : "本公文已核決且不可變更公文狀態，加蓋此章戳會執行設定之核決關聯作業.\r\n" + 
												"按[確定]鍵: 加蓋但不執行關聯作業.\r\n" +
												"按[取消]鍵: 取消加蓋此章戳作業.",
									options : [{btnText:'確定', doAction:false, addStamp:true },
															{btnText:'取消', doAction:false, addStamp:false }]
								})
								return;
							}
						}
						else if (act.statusAfter==="unapproved"){
							// 目前只有退文關聯動作有此設定
							if (enableApprove) {
								// 可核決 => 可取消核決
								_dfd.resolve({
									action : act,
									showMsg : true,
									msg : "本公文已核決，加蓋此章戳會取消公文核決狀態，是否要執行該作業?\r\n" +
											"是: 加蓋並執行 [" + actName + "] 作業.\r\n" + 
											"否: 加蓋但不執行關聯作業.\r\n" +
											"取消: 不加蓋此章戳.",
									options : [{btnText:'是', doAction:true, addStamp:true},
											{btnText:'否', doAction:false, addStamp:true},
											{btnText:'取消', doAction:false, addStamp:false}]
								});
								return;
							}
							else {
								// 已核決且不可異動核決
								_dfd.resolve({
									action : act,
									showMsg : true,
									msg : "公文已核決, 加蓋此章戳會取消公文核決狀態, 將取消本作業!", 
									options : [{doAction:false, addStamp:true}]
								});
								return;
							}
						}
					}
					else {
						// 公文未核決
						if (act.statusAfter==='approved') {
							if (!enableApprove) {
								_dfd.resolve({
									action : act,
									showMsg : true,
									msg : "加蓋此章戳會執行設定之核決關聯作業, 本公文目前不可核決!\r\n" + 
												"按[確定]鍵: 加蓋但不執行關聯作業.\r\n" +
												"按[取消]鍵: 取消加蓋此章戳作業.",
									options : [{btnText:'確定', doAction:false, addStamp:true },
												{btnText:'取消', doAction:false, addStamp:false }]
								});
								return;
							}
						}
						else {
							if (enableApprove && !isSignDocApprove) {
								if (act.approveType==='單位發文' && approveUISetting.userLevel===1) {
									_dfd.resolve({
										action : act,
										showMsg : true,
										msg : "公文目前在一層決行單位, 核決類型不可為單位發文",
										options : [{doAction:false, addStamp:false}] // 一個option, 不執行, 不加蓋!
									});
									return;
								}
							}
						}
					}
					_dfd.resolve({
						action : act,
						showMsg : false,
						msg : '',
						options : [{doAction:true, addStamp:true}]
					});	
				})
				.fail(function(rslt) {
					if("errMsg" in rslt)	// 2016.2.26 Util.getApproveOptionsDlgDisplaySettings()失敗的話會回傳Object
						_dfd.reject(rslt.errMsg);
					else
						_dfd.reject(rslt);
				});		
			})
			.fail(function(rslt){
				if("errMsg" in rslt)	// 2016.2.26 Util.isSignDocApprove()失敗的話會回傳Object
					_dfd.reject(rslt.errMsg);
				else
					_dfd.reject(rslt);
			});
		}
		else {
				_dfd.resolve({action:null, showMsg:false, msg:'', options:[]});
		}
		return _dfd.promise();
	};
		
    /* 2015.10 - Eric Peng, 加蓋核決章戳, 執行連動核決作業
     * (使用前須先叫用actionConfirm確認是否可執行)
     */
    this.dispatchAct_new = function(actName) {
		// inner function
		/* 由核決人員層級&txName設定值決定預設傳送的異動別及next項目 */
		function _getDefaultTargetForAction(approveUserLevel, value) {
				var defaultTarget = null;
				var txName='', toOU='', items=null;
				if ((typeof value!=='undefined') && value.length)
				{
						if (value.indexOf(';')!==-1) {
								var settings = value.split(';');
								if (settings.length>1) {
										if (approveUserLevel===1) {
												value = settings[0];
										}
										else {
												value = settings[1];
										}
								
										items = value.split('|');
										if (items.length) {
												txName = items[0];
												if (items.length>=2) {
														toOU = items[1];
												}
										}
										else {
												txName = '';
												toOU = '';
										}
								}
								else {
										txName = '';
										toOU = '';
								}
						}
						else {
								items = value.split('|');
								if (items.length) {
										txName = items[0];
										if (items.length>=2) {
												toOU = items[1];
										}
								}
								else {
										txName = '';
										toOU = '';
								}
						}
						
						defaultTarget =  {
								TxName : txName,
								ToOU : toOU,
								OUId : '', RoleId : '', UserId : '',
								OUName : '', RoleName : '', UserName : ''
						};
				}
				return defaultTarget;
		}
		
		var _dfd = $.Deferred();
		
		//1060608	Leslie[1060212]	鐵工局需求，增加"補陳"選用章戳之判定
		var _CheckReapply = false;
		if(SSO_CONFIG.OrgNickName == "RRB" && actName.indexOf("補陳") != -1) {
			_CheckReapply = true;
			actName = actName.replace("補陳","");
		}
		
		var act = theAOL.actDef.find(actName);
		var _docObj = theAOL.docObj;
		
		/* 2015.10 - Eric Peng,
			* 1. 依PC版邏輯實作
			* 2. 公文已核決時, 提示User是否執行關聯動作 (應在叫用此函式前確認)
			* 3. 若公文不可核決, 提示User (應在叫用此函式前確認)
			* 4. 
			*/
		var enableApprove = (SSOUtil.isValueTrue(_docObj.get('ODWDCM', 'CANCEL_APP_ENABLE')));
		var docApproved =(_docObj.get('ODWMSG', 'APP_USER_ID').length || _docObj.get('ODWMSG', 'APP_ROLE_ID').length) ? true : false;
		if((act !== undefined) && (act !== null)) {
			theSSO.Util.isSignDocApprove(theAOL) // 判定是否為先簽後稿時, [簽]之核判!
			.done(function(rslt){
				var isSignDocApprove = rslt.isSignDocDraft;
				theSSO.Util.getApproveOptionsDlgDisplaySettings(theAOL, theSSO.User.EnvSettings)
				.done(function(approveUISetting){
					if (docApproved) {
						if (act.statusBefore==="unapproved")  {
							if (enableApprove) {
								if (!isSignDocApprove) {
									if (act.approveType==='單位發文' && approveUISetting.userLevel===1) {
											_dfd.reject({success:false, errMsg: '公文目前在一層決行單位, 核決類型不可為單位發文'});
											return;
									}
									// 公文已核決且目前可核決!		
									// 使用者要求異動核決狀態並加蓋此章戳!
								}
							}
							else {
								// 公文已核決且此時不可核決!
								// ToDo:提示使用者不可核決, 蓋此章戳可能異動核決狀態!
								_dfd.reject({success:false, errMsg: '本公文已核決且不可變更公文狀態，無法執行設定之核決關聯作業'});
								return;
							}
						}
						else if (act.statusAfter==="unapproved"){
							if (!enableApprove) {
								// 已核決且不可核決
								_dfd.reject({success:false, errMsg: '本公文已核決且不可變更公文狀態，無法執行設定之取消核決關聯作業'});
								return;
							}
						}
					}
					else {
						// 公文尚未核決
						if (act.statusAfter == "approved") {
							if (!enableApprove) {
								_dfd.reject({success:false, errMsg: '本公文不可核決，無法執行設定之核決關聯作業'});
								return;
							}

							// 2021.5.11 - 1090836 Eric, [補]客委會核決時檢查是否符合核判區分設定.
							if (!isSignDocApprove) {
								let draftAppRole = _docObj.get('ODWDCM', 'DRAFT_APP_ROLE');
								let _orgNickName = theUserInfo.OrgNickName;
								if (_orgNickName==='HAC' && draftAppRole.length) {
									let ownRoleId = _docObj.ownRoleId;
									if (draftAppRole!==ownRoleId) {
										let appRoleName = draftAppRole;
										let orgNode =  SSOUtil.getOrgNode(_docObj.sourceOrgNo);
										if (!!orgNode) {
											appRoleName = SSOUtil.getRoleNameForDraftAppRole(orgNode, draftAppRole, _docObj.ICOUId);
											if (appRoleName.length===0) {
												appRoleName = draftAppRole;
											}
										}
										_dfd.reject({success:false, errMsg: '目前公文核判區分設定為['+ appRoleName + ']，請調整核判區分後再進行核決!'});
										return;
									}
								}
							}
						}
						else if (enableApprove && !isSignDocApprove) {
							if (act.approveType==='單位發文' && approveUISetting.userLevel==1) {
								_dfd.reject({success:false, errMsg: '公文目前在一層決行單位, 核決類型不可為單位發文，無法執行設定之核決關聯作業'});
								return;
							}
						}
					}
					
					// 執行核決異動作業
					var $chkApprove = $("#aol #chkApprove");
					var $chkReject = $("#aol #chkReject");
					var $chkApproveB = $("#aol #moChkApprove"); // 2016.10.24 - 行動平台UI
					var $chkRejectB = $("#aol #moChkReject");
					if (act.statusAfter == "approved")
					{
						var closeType = -1;
												
						//1110801	Leslie[1110629]	問題回報序143，考試院UI/UX需求，修改傳送選單
						if($('#btnSendBack').is(':visible'))
							$('#btnSendBack span').text('辦畢退回');

						switch(act.approveType) {
						case '存查': closeType = sso_const.APPROVAL_PERMISSION; break;
						case '機關發文': closeType = sso_const.APPROVAL_PUBLISH_ORG; break;
						case '單位發文': closeType = sso_const.APPROVAL_PUBLISH_UNIT; break;
						}
						
						if (closeType>=sso_const.APPROVAL_MIN && closeType<=sso_const.APPROVAL_MAX) {
							$chkApprove.prop("checked", true).checkboxradio("refresh");
							$chkReject.prop("checked", false).checkboxradio("refresh");
							
							$chkApproveB.prop("checked", true).checkboxradio("refresh");
							$chkRejectB.prop("checked", false).checkboxradio("refresh");
							
							// 傳送電子郵件!
							var sendMail = false;
							if ((typeof act.extraAction !=='undefined') && act.extraAction==='send_mail') {
									sendMail = true;
							}
							
							// 更新公文基資欄位值
							theAOL.docObj.set('aol', 'ODWMSG', [
								{ fieldname: 'CLOSE_TYPE', value: ''+closeType }					
							]);
							theAOL.docObj.set('aol', 'ODWDCM', [
								{ fieldname: 'CLOSE_TYPE', value: ''+closeType },
								{ fieldname: 'IS_NOTIFY', value: sendMail ? 'Y' : 'N' }	
							]);
							
							var defaultTarget = null;
							if ((typeof act.txName !=='undefined') && act.txName.length) {
									defaultTarget = _getDefaultTargetForAction(approveUISetting.userLevel, act.txName);
							}
							
							if ((typeof theAOL != 'undefined') && (typeof theAOL.docObj != 'undefined')) {
								SSOUtil.updateApproveReject(true, false, theAOL.docObj); // 異動公文基資內容!
								SSOUtil.updateTransTarget(true, false, theAOL.docObj, defaultTarget); // 異動傳送選項
							}
						}
						else {
							_dfd.reject({success:false, errMsg:'無效的結案類型代碼:' + closeType});
							return;
						}
					}
					else if (act.statusAfter==="unapproved") {
						//1110801	Leslie[1110629]	問題回報序143，考試院UI/UX需求，修改傳送選單
						if($('#btnSendBack').is(':visible'))
							$('#btnSendBack span').text('退承辦人');
						
						$chkApprove.prop("checked", false).checkboxradio("refresh");
						$chkReject.prop("checked", true).checkboxradio("refresh");
						
						$chkApproveB.prop("checked", false).checkboxradio("refresh");
						$chkRejectB.prop("checked", true).checkboxradio("refresh");
						
						var defaultTarget = null;
						if ((typeof act.txName !=='undefined') && act.txName.length) {
								defaultTarget = _getDefaultTargetForAction(approveUISetting.userLevel, act.txName);
						}
						SSOUtil.updateApproveReject(false, true, theAOL.docObj); // 異動公文基資內容!
						SSOUtil.updateTransTarget(false, true, theAOL.docObj, defaultTarget);
					}
					
					//1060608	Leslie[1060212]	鐵工局需求，增加"補陳"連動
					if(_CheckReapply){
						if(SSO_CONFIG.OrgNickName == "RRB") {
							var ownOuID = Number(theAOL.docObj.get("ODWMSG", "OWN_OU_ID").substr(0, 2));
							if(ownOuID >= 95 && ownOuID <= 98) {
								var val = theAOL.docObj.get("ODWDCM", "SET_REAPPLY_OUID");
								if(val == ownOuID || val == ""){
									theLogger.log("連動設定補陳, 設定補陳(ODWDCM.SET_REAPPLY_OUID)為" + theAOL.docObj.get("ODWMSG", "OWN_OU_ID").substr(0, 2));
									theAOL.docObj.set2("aol", "ODWDCM", {"SET_REAPPLY_OUID": theAOL.docObj.get("ODWMSG", "OWN_OU_ID").substr(0, 2)});
								}
							}
						}
					}
					_dfd.resolve({success:true});
				})
				.fail(function(rslt) {
					_dfd.reject(rslt);
				});		
			})
			.fail(function(rslt){
				_dfd.reject(rslt);
			});
		}
		else {
			_dfd.reject({success:false, errMsg:'動作名稱:' + actName + '沒有對應的定義項目!'});
		}
		return _dfd.promise();
    };
    
	var that = this;
    /*this.install = function() {
        theLogger.log("StampActHandler.install()");
        $(document).on("stampAction", function(event) {
            theLogger.log("on" + event.type + ": '" + event.name + "'");
			that.actionConfirm(event.name).done(function(rslt){
				theLogger.log('-I- actionConfirm() completed. [' + rslt.success?'DONE':'FAILED' + ']');
			})
			.fail(function(rslt) {
				theLogger.log('ERROR-' + rslt.errMsg);
			});
						
            that.dispatchAct(event.name)
			.done(function(rslt){
				theLogger.log('-I- dispatchAct() completed. [' + rslt.success?'DONE':'FAILED' + ']');
			})
			.fail(function(rslt){
				theLogger.log('ERROR-' + rslt.errMsg);
			});
        });
    }*/
    
    function dispatchAct(actName) {
        var act = theAOL.actDef.find(actName);
        if(act != undefined) {
            if ((act.statusBefore == "unapproved" && !isApproved()) ||
                (act.statusBefore == "approved" && isApproved()) ||
                act.statusBefore == "") {
                if(act.statusAfter == "approved") {
                    // TODO: 呼叫Eric提供介面API來設定核決狀態
                    var $chk = $("#aol #chkApprove");
                    if($chk.length && !$chk.prop("checked")) {
                        $chk.trigger('click');//prop("checked", true).checkboxradio("refresh");
                    }
                    // TODO: 呼叫Eric提供介面API來重整傳送對象並預設TX_NAME
                }
                else if(act.statusAfter == "unapproved") {
                    // TODO: 呼叫Eric提供介面API來設定核決狀態
                    var $chk = $("#chkReject");
                    if($chk.length && !$chk.prop("check")) {
                        $chk.trigger('click');//prop("checked", true).checkboxradio("refresh");
                    }
                    // TODO: 呼叫Eric提供介面API來重整傳送對象並預設TX_NAME
                }
            }
        }
        else if(actName.match(/^核決/)) {
            var $chk = $("#aol #chkApprove");
            if($chk.length && !$chk.prop("checked")) {
                $chk.trigger('click');//prop("checked", true).checkboxradio("refresh");
            }
        }
        else if(actName.match(/^退/)) {
            var $chk = $("#chkReject");
            if($chk.length && !$chk.prop("checked")) {
                $chk.trigger('click');//prop("checked", true).checkboxradio("refresh");
            }
        }
    }
    
    this.install = function() {
        theLogger.log("StampActHandler.install()");
        $(document).on("stampAction", function(event) {
            theLogger.log("on" + event.type + ": '" + event.name + "'");
            dispatchAct(event.name);
        });
    }
}

// 下載ActionDefine.xml
function initActionDefine() {
	
    // ActionDefine.xml
	function AD(xmlDoc) {
        
        var _acts = new Array();
        
		$(xmlDoc.documentElement).find("ACTION").each(function(i, act) {
            var $act = $(act);
            var actDef = {
                name: $act.attr("name"),
                statusBefore: $act.find("StatusBefore").text(),
                statusAfter: $act.find("StatusAfter").text(),
                approveType: $act.find("StatusAfter").attr("approve_type"),
                extraAction: $act.find("ExtraAction").attr("action"),
                txName: $act.find("TX_NAME").text()
            }
            if($act.find("TX_NAME").attr("read_env_setting") == "true") {
                // 反查環境變數設定的名稱, 2014.12.31 - Raymond, 增加容錯
				var nm = theSSO.User.EnvSettings.get(actDef.txName); 
                if(nm.length > 0)
                    actDef.txName = nm;
                else
                    theLogger.error("無此環境變數'" + actDef.txName + "'!");
            }
            _acts.push(actDef);
        });
        
        return {
            all: _acts,
            find: function(name) {
                for(var i=0; i<_acts.length; i++) {
                    if(_acts[i].name == name)
                        return _acts[i];
                }
                return undefined;
            }
        }
	}
	
	var dfd = $.Deferred();
	
	var that = this;
	// 使用WebFileIO下載封裝檔
	var wfio = new WebFileIO(SSO_CONFIG.getWSUrl("fileiows"));
    // TODO: 下載的子目錄路徑應改為參數或查詢
	wfio.download(SSO_CONFIG.getRsrcServerPath("AOL", ""), "ActionDefine.xml", {
		success: function(fil, res) {
			theLogger.log(fil);
            theAOL.actDef = new AD(fil);
			dfd.resolve();
		},
		error: function(status) {
			dfd.reject(status);
		}
	});
	
	return dfd;
}

(function() {
    if(window.theModMgr != undefined)
        window.theModMgr.install("RD-StampAct.js").finish();
})();