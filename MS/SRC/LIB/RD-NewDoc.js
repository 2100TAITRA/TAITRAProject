/* jshint -W100 */

/*
DATE	MGRNO		SA		PG		Desc
1060808				Eric 	Eric	創稿時若叫用WS函式失敗, 未正確回報錯誤訊息問題.
1060502      		Eric	Eric    側屜tab文字切換修改. (創稿&新增文稿)
1051007	NO.???		Eric	Eric	詢問紙本簽核原因子窗, 支援線上轉紙本作業.
1050908	NO.174		Eric	Eric	紙本創稿, 環境變數OD_NEED_P_RECORD值為"Y"或"P"才須詢問紙本簽核原因.
1060308	航港501		Eric	David	修正可創稿單位角色判斷邏輯
1091231 1090722		Kevin	Kevin	額外確認SR註冊狀態
1110401 1110383		Raymond	Raymond	線上轉紙本時, 詢問紙本簽核原因的子視窗新增顯示雙面列印核取方塊選項, 後續列印分頁依此選項決定是否在奇數頁的文稿或附件頁次後插入空白頁
1110524 1110383		Raymond	Raymond	修正轉紙本新增的「雙面列印」選項ID與列印子視窗的雙面列印選項相同, 造成第1次開啟列印子視窗時雙面列印選項顯示樣式異常的問題 #bothSide -> #bothSideE2P
1121004 1120776		Raymond	Raymond	修改詢問轉紙本簽核原因的確認子視窗中提供顯示傳入的訊息文字
*/

(function($) {
    theSSO.MP.changeNewDocSidePaneTitle = function (docLoaded) {
        var _title = '';
        var $drawerTab = $('#leftDrawer #tab_newdraft .drawer_title');
        var $drawerHint = $('#newDocWorkspace .dragControlPane .drag_item_title');
        
         // 20170427 - Eric, 美工異動側桌標籤內容
        var $hintText = $drawerHint.find('span');
        if (docLoaded) {
            _title = '新增稿件'; // 2016.10.3 - 與AOL一致!
            // 2021.2.18 - 1090927 Eric, iPhone landscape support
            if (window.SDLMode) { // 2021.4.19 - Eric
                _title = '新稿';
            }
        }
        else {
            _title = '創稿';
        }
        
        if ($drawerTab.text()!==_title) {
            setTimeout(function() {
                $drawerTab.text(_title);
                $hintText.text(_title);
            }, 100);
        }
        
        var $newDocOptions = $('#newDocWorkspace .newDoc_options');
        if(docLoaded) {
            setTimeout(function() {
                $drawerHint.addClass('insertDraftMode');
                $newDocOptions.css('visibility', 'hidden');
            }, 100);
        }
        else {
            setTimeout(function() {
                $drawerHint.removeClass('insertDraftMode');
                $newDocOptions.css('visibility', 'visible');
            }, 100);
        }
    };
    
    function _acceptInchargeRoleId(roleId) {
        switch(roleId) {
		//1060308 David 僅OD16、OD17，及單位91、92、93、94不可創稿，二代誤植單位為角色代碼判斷
        //case 'OD91': case 'OD92': case 'OD93': case 'OD94':
        case 'OD16': case 'OD17':
            return false;
        default:
            return true;
        }
    }

	//1060308 David 新增可創稿單位判斷
	function _acceptInchargeOuId(OuId) {
        switch(OuId) {
        case '91': case '92': case '93': case '94':
            return false;
        default:
            return true;
        }
    }

    function _selectInchageActiveRole(SSOUser, rslt) {
        var activeRole = SSOUser.PlayRoles[SSOUser.activeRoleIndex];
        if (!!activeRole) {
			//1060308 David 新增可創稿單位判斷
            //if (_acceptInchargeRoleId(activeRole.id)) {
			if (_acceptInchargeRoleId(activeRole.id) && _acceptInchargeOuId(activeRole.unitNo)) {
                return activeRole;
            }
            
            var i=0, ssoRole=null, validRoles=[];
            for(i=0; i<SSOUser.PlayRoles.length; i++) {
                ssoRole = SSOUser.PlayRoles[i];
                if (ssoRole===null) continue;

				//1060308 David 新增可創稿單位判斷
                //if (_acceptInchargeRoleId(ssoRole.id)) {
				if (_acceptInchargeRoleId(ssoRole.id) && _acceptInchargeOuId(activeRole.unitNo)) {
                    validRoles.push(ssoRole);
                }
            }

            if (validRoles.length===0) {
                rslt.errMsg = '目前所設定之角色不允許創稿';
            }
            else if (validRoles.length>1) {
                rslt.errMsg = '請先切換您目前設定之角色後,再行創稿';
            }
            else {
                return validRoles[0];
            }
        }
        return null;
    }
    
    /* 顯示子視窗詢問紙本簽核原因 */
	// 1121004 Raymond 1120776 新增第3個參數可指定E2PMsg的訊息文字內容
    //function _showGetPDocReasonDlg(_reasonList, action) {
    function _showGetPDocReasonDlg(_reasonList, action, E2PMsg) {
        action = (typeof action==='string') ? action : 'newDoc';
        
        var $theDlg = $('#askPDocReasonDialog');
        var _dfd = $.Deferred();
        
        // 2016.10.6 - 顯示確認列印文字
        if (action=='E2P') {
            $theDlg.find('.E2PMsg').show();
			//2017.03.21	Leslie	即使不需輸入轉紙本原因，仍需再次確認列印結果是否正確，是否真的要轉成紙本
			if(_reasonList == null){
				$theDlg.find('.prompt_reason_desc, #reason_code-button, .ui-input-text').hide();	//沒有轉紙本原因，則隱藏相關欄位
				// 1121004 Raymond 1120776 若指定E2PMsg參數則顯示之, 再加顯示一行'按確定鍵將開始列印簽核文件。'訊息
				//$theDlg.find('.E2PMsg').html('請確認印表機是否已正確列印出文件！<br>若正確列印，按確定鍵繼續將本文轉為紙本簽核文件。');
				$theDlg.find('.E2PMsg').html((E2PMsg + '\n\n按確定鍵開始列印簽核文件。').replace(/\n/g, '<br>'));
			}
			else{
				$theDlg.find('.prompt_reason_desc, #reason_code-button, .ui-input-text').show();
				// 1121004 Raymond 1120776 若指定E2PMsg參數則顯示之, 再加顯示一行'請輸入轉紙本說明及原因後，按確定鍵將開始列印簽核文件。'訊息
				//$theDlg.find('.E2PMsg').html('請確認印表機是否已正確列印出文件！<br>若正確列印，請輸入轉紙本說明及原因後，按確定鍵繼續將本文轉為紙本簽核文件。');
				$theDlg.find('.E2PMsg').html((E2PMsg + '\n\n請輸入轉紙本說明及原因後，按確定鍵開始列印簽核文件。').replace(/\n/g, '<br>'));
			}
			// 1121004 Raymond 1120776 修改線上轉紙本的確認子視窗標題文字
			//$theDlg.find('h1').text('請確認列印結果是否正確');	//修正線上轉紙本時的對話框Title
			$theDlg.find('h1').text('轉紙本列印');
			$theDlg.find('#bothSideE2P').closest(".ui-checkbox").show();	// 1110401 Raymond 1110383 線上轉紙本時, 顯示新增的雙面列印選項, 1110524 Raymond 1110383 修正ID與列印子視窗的雙面列印選項相同, 造成第1次開啟列印子視窗時雙面列印選項顯示樣式異常的問題 #bothSide -> #bothSideE2P
        }
		else{	//2017.3.21	Leslie	非線上轉紙本時，應復原外觀
			$theDlg.find('.E2PMsg').hide();
			$theDlg.find('.prompt_reason_desc, #reason_code-button, .ui-input-text').show();
			$theDlg.find('h1').text('請輸入紙本簽核原因');
			$theDlg.find('#bothSideE2P').closest(".ui-checkbox").hide();	// 1110401 Raymond 1110383 非線上轉紙本時, 隱藏新增的雙面列印選項, 1110524 Raymond 1110383 修正ID與列印子視窗的雙面列印選項相同, 造成第1次開啟列印子視窗時雙面列印選項顯示樣式異常的問題 #bothSide -> #bothSideE2P
        }
        
        $(document).on('popupafteropen', '#askPDocReasonDialog', function(event, ui) {
            var $select = $theDlg.find('select#reason_code');
            $select.html('');
            
			if(_reasonList == null)	//2017.4.12	Leslie	增加檢核是否為無需輸入轉紙本原因的模式(因傳入值為null，會連帶引起後續錯誤)
				return;
            
            var $newOptions=null, $targetOption=null;
            var i=0, reason=null, sOption='', $option;
            for(i=0; i<_reasonList.length; i++) {
                reason = _reasonList[i];
                
                sOption = '<option>' + reason.explain + '</option>';
                $option = $(sOption);
                
                if (!!$option) {
                    // 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
                    //$option.attr('value', i);
                    $option.val(i);

                    $option.attr('data-code', reason.no);
                    $option.attr('data-enter', reason.enableEnter?'Y':'N');
                    $option.appendTo($select);
                }
            }
            
            $newOptions = $select.find('option');
            $targetOption = $($newOptions[0]);
            // 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
            //$targetOption.attr('selected', 'selected');
            $targetOption.prop('selected', true);
            $select.selectmenu('refresh');
            
            $theDlg.find('#reason_desc').val('');
            reason = _reasonList[0];
            if (!reason.enableEnter) {
                $theDlg.find('#reason_desc').textinput('disable');
            }
        });
        
        $(document).on('popupcreate', '#askPDocReasonDialog', function(event, ui) {
            // why not been called? ahhhhhh ahhhhh ahhhh....
        });
        
        $(document).on('change', '#askPDocReasonDialog select#reason_code', function(event, ui) {
            var reason = _reasonList[event.target.selectedIndex];
            var $reasonDesc = $theDlg.find('#reason_desc');
            
            if (reason.enableEnter) {
                if ($reasonDesc.prop('disabled')===true) {
                    $reasonDesc.textinput('enable');
                }
            }
            else {
                $reasonDesc.val('');
                $reasonDesc.textinput('refresh');
                $reasonDesc.textinput('disable');
            }
        });
        
        // 結束後清除 selectmenu object
        $(document).on('popupafterclose', '#askPDocReasonDialog', function(event, ui) {
            //setTimeout(function() {$theDlg.popup('destroy');}, 200);
        });
        
        $('#askPDocReasonDialog #btn_PDRDCancel').on('click', function(){
            var PDocReason = {success:true, userCancel:true, code: '', desc: ''};
            _dfd.resolve(PDocReason);
            $('#askPDocReasonDialog').popup('close');
        });
        
        $('#askPDocReasonDialog #btn_PDRDOK').on('click', function(){
            reasonCode = '';
            reasonText = '';
            enableEnter = false;
            var sEnableEnter = '';
            
            var $select = $theDlg.find('select#reason_code');
            var $targetOption = $select.find('option:selected');
            if ($targetOption.length) {
                reasonCode = $targetOption.attr('data-code');
                sEnableEnter = $targetOption.attr('data-enter');
            }
			
			//2017.4.11	Leslie	線上轉紙本且未啟用紙本需輸入原因時，即跳過轉紙本原因檢核
			if($select.is(':visible') == false){	//未顯示原因，表示無需檢核
				// 1110401 Raymond 1110383 若新增的雙面列印選項有顯示則將其設定值回傳
				if($theDlg.find("#bothSideE2P").is(":visible"))	// 1110524 Raymond 1110383 修正ID與列印子視窗的雙面列印選項相同, 造成第1次開啟列印子視窗時雙面列印選項顯示樣式異常的問題 #bothSide -> #bothSideE2P
					_dfd.resolve({success:true, needReason:false, code: '', desc: '', bothSide:$theDlg.find("#bothSideE2P").prop("checked")});	// 1110524 Raymond 1110383 修正ID與列印子視窗的雙面列印選項相同, 造成第1次開啟列印子視窗時雙面列印選項顯示樣式異常的問題 #bothSide -> #bothSideE2P
				else
				_dfd.resolve({success:true, needReason:false, code: '', desc: ''});
				$('#askPDocReasonDialog').popup('close');
				return;
			}
            
            if (sEnableEnter.toLowerCase()=='y') {
                enableEnter = true;
                reasonText = $theDlg.find('#reason_desc').val();
            }
            
            if (enableEnter===true && reasonText.length===0) {
                alert('請輸入紙本簽核原因!');
                return;
            }
            
            // confirm data validaty
            if (reasonCode.length===0) {
                alert('無效的CReasonNo!');
                return;
            }
            
			// 1110401 Raymond 1110383 若新增的雙面列印選項有顯示則將其設定值回傳
			if($theDlg.find("#bothSideE2P").is(":visible"))	// 1110524 Raymond 1110383 修正ID與列印子視窗的雙面列印選項相同, 造成第1次開啟列印子視窗時雙面列印選項顯示樣式異常的問題 #bothSide -> #bothSideE2P
				pDocReason = {success:true, code: reasonCode, 'enableEnter': enableEnter, desc: reasonText, bothSide:$theDlg.find("#bothSideE2P").prop("checked")};	// 1110524 Raymond 1110383 修正ID與列印子視窗的雙面列印選項相同, 造成第1次開啟列印子視窗時雙面列印選項顯示樣式異常的問題 #bothSide -> #bothSideE2P
			else
            pDocReason = {success:true, code: reasonCode, 'enableEnter': enableEnter, desc: reasonText};
            _dfd.resolve(pDocReason);
            $('#askPDocReasonDialog').popup('close');
        });
        
        var _options = {corners: false, history: false, positionTo: 'window' }; 
        $theDlg.popup(_options);
        $('#askPDocReasonDialog').popup('open', _options);
        SSOUtil.loading('hide');
        return _dfd.promise();
    }
    
	// 1121004 Raymond 1120776 新增第5個參數可指定E2PMsg的訊息文字內容
    //function _getPDocReason(artifact, orgNo, signType, action) {
    function _getPDocReason(artifact, orgNo, signType, action, E2PMsg) {
        action = (typeof action=='string') ? action : 'newDoc';
        
        var _debugRun = false;
        var _dfd = $.Deferred();
        
        var askPSignReason = false;
        var sODNeedPRecord = theSSO.User.EnvSettings.get('OD_NEED_P_RECORD');
        
        if (signType=='P') {
            // 2016.9.8 - 紙本創稿, OD_NEED_P_RECORD值為"Y"或"P"才須詢問紙本簽核原因.
            if (typeof sODNeedPRecord=='string' &&
                (sODNeedPRecord=='Y' || sODNeedPRecord=='P')) {
                askPSignReason = true;    
            }
            
            if (!askPSignReason) {
                _dfd.resolve({success:true, needReason:false, code: '', desc: ''});
                return _dfd.promise();
            }
		}
		else if(signType == "E") {	// 2016.10.6 - Raymond
            // 2016.10.6 - 線上轉紙本, OD_NEED_P_RECORD值為"Y"或"E"才須詢問紙本簽核原因.
            if (action=='E2P') {
                if (typeof sODNeedPRecord=='string' &&
                    (sODNeedPRecord=='Y' || sODNeedPRecord=='E')) {
                    askPSignReason = true;    
                }
            }
            
            if (!askPSignReason) {
				if (action=='E2P'){	//2017.3.24	Leslie	只有線上轉紙本要一律顯示原因
				// 1121004 Raymond 1120776 傳入E2PMsg參數
				//2017.03.21	Leslie	即使不需輸入轉紙本原因，仍需再次確認列印結果是否正確，是否真的要轉成紙本
				//_showGetPDocReasonDlg(null, action)
				_showGetPDocReasonDlg(null, action, E2PMsg)
				.done(function(rslt){
					if (typeof rslt.userCancel!=='undefined' &&  rslt.userCancel) {
						_dfd.reject({success:false, _showError:false, _errMsg:'使用者取消作業.'});
					}
					else {
						SSOUtil.loading('show');
						_dfd.resolve($.extend({needReason:true}, rslt));
					}
				})
				.fail(function() {
					_dfd.reject({success:false, _showError:true, _errMsg:'無法取得紙本簽核原因設定值.'});
				});
				}
				else
					_dfd.resolve({success:true, needReason:false, code: '', desc: ''});
                return _dfd.promise();
            }
		}
        else {
            _dfd.resolve({success:true});
            return _dfd.promise();
        }
        
		// ToDo: 顯示子視窗讓使用者選擇或輸入紙本簽核原因!
		if (SSOUtil.getSignReasonList(artifact, orgNo)) {
			var sSignReasonXML = localStorage['SignReasonList_' + orgNo];
			if (typeof sSignReasonXML=='undefined' || sSignReasonXML===null || sSignReasonXML.length===0) {
				theLogger.error('ERROR! 無法取得紙本簽核原因設定檔內容! 檔名：SignReasonList_' + orgNo + '.XML');
				_dfd.reject({success:false, _showError:true, _errMsg:'無法取得紙本簽核原因設定! [OrgNo=' + orgNo + ']'});
				return _dfd.promise();
			}
			
			var signReason_xn = (new DOMParser()).parseFromString(sSignReasonXML, 'text/xml');
			var reasonList_xn = $(signReason_xn).find('List');
			var reason_xn = null, reasonList = [];
			var no='', explain='', enter=false, sVal='';
			for(i=0; i<reasonList_xn.length; i++) {
				no=''; explain=''; sVal=''; enter=false;
				reason_xn = $(reasonList_xn[i]);
				no = SSOUtil.xml_getChildNodeValue(reason_xn, 'CRULE_NO');
				explain = SSOUtil.xml_getChildNodeValue(reason_xn, 'CRULE_EXPLAIN');
				sVal = SSOUtil.xml_getChildNodeValue(reason_xn, 'ENTER_REASON');
				if (sVal=='Y') {
					enter = true;
				}
				if (no.length && explain.length) {
					reasonList.push({'no': no, 'explain': explain, 'enableEnter': enter});
				}
			}
			
			if (reasonList.length) {
				if (_debugRun) {
					console.log('reasonList=' + reasonList);
					_dfd.resolve({success:false, code: reasonList[0].no, desc: ''});
					return _dfd.promise();
				}
				
				// 1121004 Raymond 1120776 傳入E2PMsg參數
				//_showGetPDocReasonDlg(reasonList, action)
				_showGetPDocReasonDlg(reasonList, action, E2PMsg)
				.done(function(rslt){
					if (typeof rslt.userCancel!=='undefined' &&  rslt.userCancel) {
						_dfd.reject({success:false, _showError:false, _errMsg:'使用者取消作業.'});
					}
					else {
						SSOUtil.loading('show');
						_dfd.resolve($.extend({needReason:true}, rslt));
					}
				})
				.fail(function() {
					_dfd.reject({success:false, _showError:true, _errMsg:'無法取得紙本簽核原因設定值.'});
				});
			}
			else {
				_dfd.reject({success:false, _showError:true, _errMsg:'無法取得紙本簽核原因設定值.'});
			}
		}
		else {
			_dfd.reject({success:false, _showError:true, _errMsg:'無法取得紙本簽核原因設定檔.'});
		}
        return _dfd.promise();
    }
	nsEditor._getPDocReason = _getPDocReason;	// 2016.10.6 - Raymond, 開放給轉紙本功能使用
    
    //$(document).on('click', '#newDocWorkspace ul.newDraftList li > a', function(event) {
    theSSO.MP.newDocProc = function (tmplName, rsrcObj) {
		
		//1091231 Kevin 1090722 新增權杖&SR連線檢核
		if(!theSSO.MP.CheckLoginStatus())
			return;
		
        var signType = 'E'; // 預設為線上簽核
        var $options = $('#newDocWorkspace .newDoc_options input[name="choice-signType2"]');
        var $option = null;
        var i=0, id='';
        for(i=0; i<$options.length; i++) {
            $option = $($options[i]);
            if ($option.prop('checked')===true) {
                id = $option.attr('id');
                if (id=='radio-choice-signTypeP') {
                    signType='P';
                }
                break;
            }
        }
        
        // 檢核是否為可創稿角色
        var _rslt = { errMsg:'' };
        var inchargeRole= _selectInchageActiveRole(theSSO.User, _rslt);
        if (inchargeRole===null) {
            if (_rslt.errMsg.length) {
                alert(_rslt.errMsg);
            }
            else {
                alert('目前人員之角色不允許創稿');
            }
            return;
        }

        SSOUtil.loading('show');
        
        var SAMLart = localStorage.Artifact;
        
        var docType='';
        
        // 詢問紙本簽核原因!
        _getPDocReason(SAMLart, inchargeRole.orgNo, signType)
        .then(function(rslt){
            if (typeof rsrcObj!=='undefined' && typeof rsrcObj.subDocType!=='undefined' && rsrcObj.subDocType.length) {
                docType = rsrcObj.subDocType;
            }
            else if (typeof rsrcObj!=='undefined' && typeof rsrcObj.docType!=='undefined' && rsrcObj.docType.length) {
                docType = rsrcObj.docType;
            }
            
            // 1100917 Raymond 1080763 合併1070348, 自訂範本的docType, subDocType為空值!
            /*if (docType.length===0) {
                var dfd = $.Deferred();
                dfd.reject({success: false, _showError:true, _errMsg:'無法取得文稿類型(docType)資訊!'});
                return dfd.promise();
            }*/
            
            if (signType=='P') {
                return theSSO.MP.todolist.builder.createNewDoc(SAMLart, signType, rslt, inchargeRole, docType);
            }
            else {
                return theSSO.MP.todolist.builder.createNewDoc(SAMLart, signType, null, inchargeRole, docType);
            }
        })
        .then(function(rslt){
            if (rslt.success && !!rslt.docObj) {
                localStorage.new_draft_from_tmpl = JSON.stringify(rsrcObj);
                var _docObj = theSSO.MP.todolist.builder.getDocByMsgId(rslt.docObj.msgId, rslt.docObj.ICUserId);
                theSSO.MP.todolist.builder.insertHTMLDOMItem(_docObj);
                
                theSSO.MP.openDocWithAOL(localStorage.Artifact, _docObj, 'todolist');
                
                SSOUtil.loading('hide');
                
                // 關閉創稿側桌
                if ($('#newDocWorkspace').is(':visible')) {
                    $('#newDocWorkspace .dragControlPane .drag_to_close').trigger('click');
                }
            }
        })
        .fail(function(failRslt_NewDoc){
            SSOUtil.loading('hide');
            if (!!failRslt_NewDoc) {
                // 2017.8.8 - Eric Peng, bug-fix
                if (typeof failRslt_NewDoc.message=='string' && failRslt_NewDoc.message.length &&
                    (typeof failRslt_NewDoc._errMsg!=='string' || failRslt_NewDoc._errMsg.length==0)) {
                    failRslt_NewDoc._errMsg = failRslt_NewDoc.message;
                }

                if (typeof failRslt_NewDoc._errMsg=='string' && failRslt_NewDoc._errMsg.length) {
                    theLogger.error('創稿作業失敗, ErrMsg=' + failRslt_NewDoc._errMsg);
                }
                
                if (!!failRslt_NewDoc._showError && !!failRslt_NewDoc._errMsg) {
                    alert('創稿作業失敗, 原因:' + failRslt_NewDoc._errMsg);
                    failRslt_NewDoc._showError = false;
                }
            }
        });
    };
    
})(jQuery);