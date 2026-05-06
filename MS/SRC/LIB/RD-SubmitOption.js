/* jshint -W100 */
//	1131204	1131151		Leslie	Leslie	修正因單位代碼含非數字部分，造成判斷一層決行與虛擬單位錯誤的問題

/* 2016.11.7 - 自RD-DlgProcessSetting.js 擷取, 以支援其它ASPX程式使用(ex.批次傳送)
 * 該網頁程式須同時include下列JS檔:
 * RD-SysUtil.js
 * RD-Utility.js
 * RD-WebServices.js (叫用WebFileIO下載OrgInfo_$OrgNo$.XML及MPRule_$OrgNo$.xml用)
 *   => 須include: escapeXml.js、Utf7.js、Base64.js、RD-jdataview.js, RD-soapclient.js
 */

/* Wrapper object for 公文基資(ODWMSG/ODWDCM) [目前提供公文批次送使用]
 * 提供下列函式
 * get(target, fieldname) : 取得欄位值, target->'ODWMSG'/'ODWDCM', fieldnames->array of 欄位名稱
 * set(target, fieldsets): 設定欄位值, target->'ODWMSG'/'ODWDCM', fieldsets->array of fieldSet
 * set2(target, fieldsets): 設定欄位值, target->'ODWMSG'/'ODWDCM', fieldsets->object of name/value pair
 * isDraftDoc: 回傳是否為草稿公文 true|false
 * getCurrentFlow_PDoc: 取得文件夾及目前所在人員資訊, 回傳物件: {Folder:'...', SubFolder:'...', OUId:'...', RoleId:'...', UserId:'...' }
 * getODWMSG(): 取得 ODWMSG 物件
 * getODWDCM(): 取得 ODWDCM 物件
 */
function MPDocObj_Lite(sODWMSGXml) {
    // 記錄所有ODWMSG欄位
    function _makeODWMSG(docNode) {
        if (!!docNode) {
            var odwmsg = {};
            var len = docNode.childNodes.length;
            for(var i=0; i<len; i++) {
                var node = docNode.childNodes[i];
                if (node.nodeType==1) { // 只取child elements
                    odwmsg[node.nodeName] = SSOUtil.xml_getNodeValue(node);
                }
            }
            return odwmsg;
        }
        return null;
    }
    
    function _isDraftMsgId(msgId) {
		// 草稿MsgId格式: $MsgId$_$ICUserId$
		if (!!msgId && msgId.length) {
			var nMsgId = -1;
			if (msgId.indexOf('_')!==-1) {
				var msgIdInfo = msgId.split('_');
				if (msgIdInfo.length>=2) {
					nMsgId = parseInt(msgIdInfo[0]);
					if (nMsgId>=window.sso_const.DRAFT_MSG_ID_START && nMsgId<=window.sso_const.DRAFT_MSG_ID_END) {
						return true;
					}
				}
				return false;
			}
			else {
				nMsgId = parseInt(msgId);
				if (nMsgId>=window.sso_const.DRAFT_MSG_ID_START && nMsgId<=window.sso_const.DRAFT_MSG_ID_END) {
					return true;
				}
			}
		}
		return false;
	}
        
    function _getDocFromODWMSG(docNode) {
        if ((typeof docNode === 'undefined') || docNode===null)
			return null;
		
		var doc = null;
	
		// 取紙本/線上簽核公文&SIGN_TYPE="W"項目...
		var msgId = SSOUtil.xml_getChildNodeValue(docNode, 'MSG_ID');
		if (typeof msgId=='undefined' || msgId===null || msgId.length===0) {
			return null;
		}
		
		var signType = SSOUtil.xml_getChildNodeValue(docNode, 'SIGN_TYPE');
		
		// 2013.6 - 篩選去除102年以前項目!
		var docNo = SSOUtil.xml_getChildNodeValue(docNode, 'DOC_NO');
		
		var isDraft = false;
        if (signType=='P' || signType=='E') {
			isDraft = _isDraftMsgId(msgId);
        }
        
		var folder = SSOUtil.xml_getChildNodeValue(docNode, 'FOLDER');
		var subfolder = SSOUtil.xml_getChildNodeValue(docNode, 'SUBFOLDER');
			
		if (signType=='P' || signType=='E') {
			doc = {};
			doc.isDraft = isDraft;
			msgId = SSOUtil.xml_getChildNodeValue(docNode, 'MSG_ID');
			if (msgId.indexOf('_')!==-1) {
				msgId = msgId.substring(0, msgId.indexOf('_'));
			}
			doc.msgId = msgId;
			
			doc.docNo = SSOUtil.xml_getChildNodeValue(docNode, 'DOC_NO');
			doc.signType = signType;
			doc.ICOUName = SSOUtil.xml_getChildNodeValue(docNode, 'IC_OU_NAME');
			doc.ICOUId = SSOUtil.xml_getChildNodeValue(docNode, 'INCHARGE_OU');
			doc.ICUserName = SSOUtil.xml_getChildNodeValue(docNode, 'IC_USER_NAME');
			doc.ICUserId = SSOUtil.xml_getChildNodeValue(docNode, 'IC_USER_ID');
			if (doc.ICUserId.length) {
				doc.ICUserId = doc.ICUserId.toUpperCase();
			}
			doc.sourceOrgNo = SSOUtil.xml_getChildNodeValue(docNode, 'SOURCE_ORGNO');
			doc.subject = SSOUtil.xml_getChildNodeValue(docNode, 'SUBJECT');
			doc.fromSubject = SSOUtil.xml_getChildNodeValue(docNode, 'FROM_SUBJECT');
			
			doc.dueDate = SSOUtil.xml_getChildNodeValue(docNode, 'DUE_DATE');
			doc.outLMT = SSOUtil.xml_getChildNodeValue(docNode, 'MSG_OUT_LMT');
			doc.alarmLMT = SSOUtil.xml_getChildNodeValue(docNode, 'MSG_ALM_LMT');
			doc.alarmTime = SSOUtil.xml_getChildNodeValue(docNode, 'ALARM_TIME');
			doc.docState = SSOUtil.xml_getChildNodeValue(docNode, 'DOC_STATE');
			
			doc.secret = SSOUtil.xml_getChildNodeValue(docNode, 'SECRETE');
			doc.speed = SSOUtil.xml_getChildNodeValue(docNode, 'SPEED');
			doc.folder = SSOUtil.xml_getChildNodeValue(docNode, 'FOLDER');
			doc.subfolder = SSOUtil.xml_getChildNodeValue(docNode, 'SUBFOLDER');
			doc.signTime = SSOUtil.xml_getChildNodeValue(docNode, 'SIGN_TIME'); // 若有表示已閱讀...
			doc.newTime = SSOUtil.xml_getChildNodeValue(docNode, 'NEW_TIME'); // 送方傳送時間
			doc.fromOUName = SSOUtil.xml_getChildNodeValue(docNode, 'FROM_OU'); // 送文單位
			
			// 2013.4
			doc.ownOUId = SSOUtil.xml_getChildNodeValue(docNode, 'OWN_OU_ID');
			doc.ownUserId = SSOUtil.xml_getChildNodeValue(docNode, 'OWN_USER_ID');
			if (doc.ownUserId.length) {
				doc.ownUserId = doc.ownUserId.toUpperCase();
			}
			
			// 2013.9
			doc.ownRoleId = SSOUtil.xml_getChildNodeValue(docNode, 'OWN_ROLE_ID');
				
			// 2013.9 - 傳送
			doc.txName = SSOUtil.xml_getChildNodeValue(docNode, 'TX_NAME');
			doc.toUserName = SSOUtil.xml_getChildNodeValue(docNode, 'TO_USER_NAME'); // 傳送至
			doc.toUserId = SSOUtil.xml_getChildNodeValue(docNode, 'TO_USER_ID');
			if (doc.toUserId.length) {
				doc.toUserId = doc.toUserId.toUpperCase();
			}
			doc.toRoleName = SSOUtil.xml_getChildNodeValue(docNode, 'TO_ROLE_NAME');
			doc.toRoleId = SSOUtil.xml_getChildNodeValue(docNode, 'TO_ROLE_ID');
			doc.toOUName = SSOUtil.xml_getChildNodeValue(docNode, 'TO_OU_NAME');
			doc.toOUId = SSOUtil.xml_getChildNodeValue(docNode, 'TO_OU_ID');
			
			/* 公文電子檔位置(FileIO WS + disk path)
			 *<STORAGE_PATH>D:\FILESRV_DATA\FILE_PATH\upload</STORAGE_PATH>
			 *<SUB_DIR>301060000C\10101\04\1010500001</SUB_DIR>
			 *<WEB_SERVICE>http://deva.nfa.com.tw/WebFileIo/T2100FileIOService.asmx</WEB_SERVICE>
			 */
			doc.fileIOWS = SSOUtil.xml_getChildNodeValue(docNode, 'WEB_SERVICE');
			doc.fileStoragePath = SSOUtil.xml_getChildNodeValue(docNode, 'STORAGE_PATH');
			doc.fileSubDir = SSOUtil.xml_getChildNodeValue(docNode, 'SUB_DIR');
			
			/* 2014.1 - for公文核決. */
			doc.appUserId = SSOUtil.xml_getChildNodeValue(docNode, 'APP_USER_ID');
			doc.appUserName = SSOUtil.xml_getChildNodeValue(docNode, 'APP_USER_NAME');
			doc.appRoleId = SSOUtil.xml_getChildNodeValue(docNode, 'APP_ROLE_ID');
			doc.rejectUserName = SSOUtil.xml_getChildNodeValue(docNode, 'REJECT_USER_NAME');
			
			// RESUPPLY_ALM
			doc.reSupplyALM = SSOUtil.xml_getChildNodeValue(docNode, 'RESUPPLY_ALM');

			/* 2019.1.24 - 1071075, 新增[公文性質]欄位 */
			doc.docPtyName = SSOUtil.xml_getChildNodeValue(docNode, 'DOC_PTY_NAME');
			if (typeof doc.docPtyName!='string') {
				doc.docPtyName = '';
			}
			
			/* 2014.10 - 伺服器處理中狀態 */
			doc.submitProcessing = false;
		}
		else if (signType=='W') {
			folder = SSOUtil.xml_getChildNodeValue(docNode, 'FOLDER');
			var fromSubject = SSOUtil.xml_getChildNodeValue(docNode, 'FROM_SUBJECT');
			if (folder.length && fromSubject.length) // 2013.4 - SIGN_TYPE="W"項目, 須有主旨才列入清單顯示!
			{
				doc = {};
				doc.msgId = SSOUtil.xml_getChildNodeValue(docNode, 'MSG_ID');
				doc.signType = signType;
				doc.folder = folder;
				doc.subfolder = SSOUtil.xml_getChildNodeValue(docNode, 'SUBFOLDER');
				doc.ownUserId = SSOUtil.xml_getChildNodeValue(docNode, 'OWN_USER_ID');
				if (doc.ownUserId.length) {
					doc.ownUserId = doc.ownUserId.toUpperCase();
				}
				doc.subject = SSOUtil.xml_getChildNodeValue(docNode, 'SUBJECT');
				doc.fromSubject = fromSubject;
				
				var url_b64 = SSOUtil.xml_getChildNodeValue(docNode, 'URL');
				var url = '';
				if (url_b64.length>0) {
					url = Base64.decode(url_b64);
				}
				
				doc.url = url; // 2016.8.22 - 二代毋須轉換. _modifyToDoUrl(url);
				//console.log('[W] MsgId=' + doc.msgId + ', url=' + doc.url);
				
				doc.signTime = SSOUtil.xml_getChildNodeValue(docNode, 'SIGN_TIME'); // 若有表示已閱讀...(SIGN_TYPE="W"項目仍有效)
				
				/* 2015.1 - Eric Peng, 新增解析下列欄位 */
				doc.ICOUName = SSOUtil.xml_getChildNodeValue(docNode, 'IC_OU_NAME');
				doc.ICOUId = SSOUtil.xml_getChildNodeValue(docNode, 'INCHARGE_OU');
				doc.ICUserName = SSOUtil.xml_getChildNodeValue(docNode, 'IC_USER_NAME');
				doc.ICUserId = SSOUtil.xml_getChildNodeValue(docNode, 'IC_USER_ID');
				if (doc.ICUserId.length) {
					doc.ICUserId = doc.ICUserId.toUpperCase();
				}
				doc.sourceOrgNo = SSOUtil.xml_getChildNodeValue(docNode, 'SOURCE_ORGNO');
				
				doc.dueDate = SSOUtil.xml_getChildNodeValue(docNode, 'DUE_DATE');
				doc.outLMT = SSOUtil.xml_getChildNodeValue(docNode, 'MSG_OUT_LMT');
				doc.alarmLMT = SSOUtil.xml_getChildNodeValue(docNode, 'MSG_ALM_LMT');
				doc.alarmTime = SSOUtil.xml_getChildNodeValue(docNode, 'ALARM_TIME');
			
				doc.subject = SSOUtil.xml_getChildNodeValue(docNode, 'SUBJECT');
				doc.fromSubject = SSOUtil.xml_getChildNodeValue(docNode, 'FROM_SUBJECT');
				
				doc.secret = SSOUtil.xml_getChildNodeValue(docNode, 'SECRETE');
				doc.speed = SSOUtil.xml_getChildNodeValue(docNode, 'SPEED');
				
				// RESUPPLY_ALM
				doc.reSupplyALM = SSOUtil.xml_getChildNodeValue(docNode, 'RESUPPLY_ALM');

				/* 2019.1.24 - 1071075, 新增[公文性質]欄位 */
				doc.docPtyName = SSOUtil.xml_getChildNodeValue(docNode, 'DOC_PTY_NAME');
				if (typeof doc.docPtyName!='string') {
					doc.docPtyName = '';
				}
				
				doc.newTime = SSOUtil.xml_getChildNodeValue(docNode, 'NEW_TIME'); // 送方傳送時間
			}
		}
		
		// read all field from ODWMSG
		if (!!doc) {
			if (doc.msgId=='0') {
				theLogger.debug('found target example doc...');
			}
			var odwmsg = _makeODWMSG(docNode);
			if (typeof odwmsg == 'object') {
				doc.ODWMSG = odwmsg;
				/* 2016.8 - 草稿的ODWMSG.MSG_ID記錄為不含帳號項目 */
				if (doc.isDraft) {
					doc.ODWMSG.MSG_ID = doc.msgId;
				}
			}
		}
		return doc;
    }
    
	// 取得欄位值!
	function _get(target, fieldname) {
		var rslt;
		var i = 0, name = '', value;
		var srcObj = _docObj.ODWMSG;
		if (target.search('ODWDCM')!==-1) {
			srcObj = _docObj.ODWDCM;
		}
		
		if (typeof srcObj === 'undefined' || srcObj===null) {
			theLogger.error('-ERR- target Object: [' + target + '] 未定義/初始化!');
			return null;
		}
		
		if (typeof fieldname === 'string') {
			value = srcObj[fieldname];
			rslt = value;
		}
		else if (Array.isArray(fieldname)) { // 2019.9.16 - 1080339 Eric, $.isArray => Array.isArray()
			rslt = {};
			for (i=0; i<fieldname.length; i++) {
				name = fieldname[i];
				value = srcObj[name];
				if (typeof value === 'undefined') {
					value = null;
				}
				rslt[name] = value;
			}	
		}
		
		return rslt;
	}
	
	/* 設定欄位值!
	 *
	 * filedSets範例:
	 * fieldSets = [
	 *	{ fieldname : 'TO_OU_ID',  value : valueObj1 },
	 *	{ fieldname : 'TO_OU_NAMe',  value : valueObj2 }
	 * ]
	 */
	function _set(actorId, target, fieldSets) {
		var set;
		var srcObj = _docObj.ODWMSG;
		if (target.search('ODWDCM')!==-1) {
			srcObj = _docObj.ODWDCM;
		}
		
		if (typeof srcObj === 'undefined' || srcObj===null) {
			theLogger.error('-ERR- target Object: [' + target + '] 未定義/初始化!');
			return false;
		}
		
		var mapItem = null;
		var i = 0, j = 0;
		for (i=0; i<fieldSets.length; i++) {
			set = fieldSets[i];
			if (!!set && typeof set.value !=='undefined') {
				srcObj[set.fieldname] = set.value;
				
				// update _docObj attributes
				for (j=0; j<_mapForUpdate.length; j++) {
					mapItem = _mapForUpdate[j];
					if (typeof _docObj[mapItem.attr] !== 'undefined' && mapItem.nodeName===set.fieldname) {
						_docObj[mapItem.attr] = set.value;
						break;
					}
				}
			}
			else {
				throw new Error('欄位:' + set.fieldname + '的設定值未定義!');
			}
		}

		return true;
	}
	
	/* 設定欄位值!
	 * actorId: 觸發異動的source id
	 * target: 'ODWMSG' / 'ODWDCM'
	 * fieldSets: 異動欄位清單及異動值
	 * 
	 * filedSets範例:
	 * fieldSets = [
	 *	{ fieldname : 'TO_OU_ID',  value : valueObj1 },
	 *	{ fieldname : 'TO_OU_NAMe',  value : valueObj2 }
	 * ]
	 */
	function _set2(actorId, target, fieldSets) {
		var set;
		var srcObj = _docObj.ODWMSG;
		if (target.search('ODWDCM')!==-1) {
			srcObj = _docObj.ODWDCM;
		}
		
		if (typeof srcObj === 'undefined' || srcObj===null) {
			theLogger.error('-ERR- target Object: [' + target + '] 未定義/初始化!');
			return false;
		}
		
		var mapItem = null;
		var i = 0, j = 0;
		
		if (fieldSets.length) {
			for (i=0; i<fieldSets.length; i++) {
				set = fieldSets[i];
				if (!!set && (typeof set.value !=='undefined')) {
					srcObj[set.fieldname] = set.value;
					
					// update _docObj attributes
					for (j=0; j<_mapForUpdate.length; j++) {
						mapItem = _mapForUpdate[j];
						if (typeof _docObj[mapItem.attr] !== 'undefined' && mapItem.nodeName===set.fieldname) {
							_docObj[mapItem.attr] = set.value;
							break;
						}
					}
				}
				else {
					throw new Error('欄位:' + set.fieldname + '的設定值未定義!');
				}
			}
		}
		else if (typeof fieldSets == 'object') {
			var name = '';
			for(name in fieldSets) {
				if (fieldSets.hasOwnProperty(name) && (typeof srcObj[name]!=='undefined') && srcObj[name]!==null) {
					srcObj[name] = fieldSets[name];
					
					// update _docObj attributes
					for (j=0; j<_mapForUpdate.length; j++) {
						mapItem = _mapForUpdate[j];
						if (typeof _docObj[mapItem.attr] !== 'undefined' && mapItem.nodeName===name) {
							_docObj[mapItem.attr] = fieldSets[name];
							break;
						}
					}
				}
			}
		}
		return true;
	}
	
	function _getODWMSG() {
		return _docObj.ODWMSG;	
	}
	
	function _getODWDCM() {
		return _docObj.ODWDCM;
	}

	function _isDraftDoc(sso_const) {
		var min_draft_id = 100, max_draft_id = 2000;
		if (typeof sso_const === 'undefined') {
			max_draft_id = sso_const.DRAFT_MSG_ID_END;
			min_draft_id = sso_const.DRAFT_MSG_ID_START;
		}
		
		var msgId='', msgIdInfo = [], msgIdPure=-1;
		if(_docObj.signType=="E" || _docObj.signType=="P") {
			msgId = _docObj.msgId;
			if (!!msgId && msgId.length) {
				if (msgId.indexOf('_')!==-1) {
					msgIdInfo = msgId.split('_');
					if (msgIdInfo.length>=2) {
						msgIdPure = parseInt(msgIdInfo[0]);
						if (msgIdPure<=max_draft_id && msgIdPure>=min_draft_id) {
							return true;
						}
					}
				}
				else {
					msgIdPure = parseInt(msgId);
					if (msgIdPure<=max_draft_id && msgIdPure>=min_draft_id) {
						return true;
					}
				}
			}
		}
		return false;
	}
	
    /* 取得公文的Folder/SubFolder/OwnOUId/OwnRoleId/OwnUserId欄位值 */
	function _getCurrentFlow_PDoc() {
        var currentFlow = null;
        var rslt = _get('ODWMSG', ['FOLDER', 'SUBFOLDER', 'OWN_OU_ID', 'OWN_ROLE_ID', 'OWN_USER_ID']);
        
        if (!!rslt) {
            currentFlow = {};
            currentFlow.Folder = (!!rslt.FOLDER) ? rslt.FOLDER : '';
            currentFlow.SubFolder = (!!rslt.SUBFOLDER) ? rslt.SUBFOLDER : '';
            currentFlow.OUId = (!!rslt.OWN_OU_ID) ? rslt.OWN_OU_ID : '';
            currentFlow.RoleId = (!!rslt.OWN_ROLE_ID) ? rslt.OWN_ROLE_ID : '';
            currentFlow.UserId = (!!rslt.OWN_USER_ID) ? rslt.OWN_USER_ID : '';
            if (currentFlow.UserId.length===0) {
                currentFlow.UserId = theSSO.User.account;
            }
        }
        return currentFlow;
    }
    
    var that = null;
	  
    var xmlParser = new DOMParser();
    var docNode = xmlParser.parseFromString(sODWMSGXml, 'text/xml');
    if (typeof docNode=='undefined' || docNode===false) {
        theLogger.error('MPDocObj_Lite() invalid doc XML string. [xmlParse.parseFromString]');
        return null;
    }
	
    var $odwmsgNode = $(docNode).find('ODWMSG');
    if ($odwmsgNode.length===0) {
        theLogger.error('MPDocObj_Lite() invalid doc XML string [<ODWMSG> not found!].');
        return null;
    }
    
	var _docObj = _getDocFromODWMSG($odwmsgNode[0]);
    if (typeof _docObj=='undefined' || _docObj===null) {
        theLogger.error('MPDocObj_Lite() _getDocFromDOWMSG() return null.');
        return null;
    }
	that = _docObj;
    
    that.getODWMSG = _getODWMSG;
	that.getODWDCM = _getODWDCM;
	that.set = _set;
	that.set2 = _set2; // 2016.7
	that.isDraftDoc = _isDraftDoc;
    
	that.get = _get;
    that.getCurrentFlow_PDoc = _getCurrentFlow_PDoc;
	return that;
}
/*
 取得紙本簽核公文MenuRule
*/
function MenuRulePDoc(artifact, orgNo, options) {
	var _rulePDoc = [];
	var _cTargetsPDoc = [];
	var _targetOrgNo = orgNo;
	var _ruleEnvSetting = {}; // MeneRuleAOL相關的環境變數設定
	
	if (typeof window.MPRulePDoc_Const === 'undefined') {
		window.MPRulePDoc_Const = {
			MENU_SPECIAL_CHECK_LIST: 'AXCDEFOGH',
			MENU_ADV_CHECK_LIST: '1234567890B',
			
			MENU_SEPRATOR: '@',
			MENU_NEXT_EMPLOYEE: 'K',
			
			MENU_SEP_CHAR0:'@', MENU_SEP_CHAR1:	'$', MENU_SEP_CHAR2: '|', MENU_SEP_CHAR3: ']',
			
			// Eric Peng, For 二層式登記桌
			MENU_NEXT_EMPLOYEE_A: 'U', MENU_NEXT_EMPLOYEE_B: 'T',
			
			DDL_SEP_CHAR01: '^', DDL_SEP_CHAR02: '#', DDL_SEP_CHAR03: '%',
			
			UPPER_TRUE: 'TRUE', LOWER_TRUE: 'true',
			OD_TARGET_MINUS: '-', OD_TARGET_PLUS: '+', OD_TARGET_STAR: '*', OD_TARGET_SHARP: '#',
			
			// MINUS setting: <NEXT MINUS=''>
			OFFSET_NOTHING: 0,
			OFFSET_RMV_CURRENT_OU: 1, // -
			OFFSET_RMV_CURRENT_OU_L1: 1, 
			OFFSET_RMV_CURR_ADD_INC: 2, // +
			FFSET_RMV_CURRENT_OU_L2: 3, // #
			OFFSET_ADD_L2_AND_L1: 4, // *
			
			MENU_ITEM_ENABLE: 0,
			MENU_ITEM_DISABLE: 1,
			MENU_ITEM_DISPLAYNONE: 2,
		};
	}
	var _rule_const = window.MPRulePDoc_Const;
	
	function _getNextRoleList(optionNode) {
		var $next = $(optionNode).find('NEXT');
		var sVal = $next.attr('ROLE');
		var roleList = null;
		if (sVal) {
			roleList = sVal.split(";");
		}
		return roleList;
	}
	
	//var orgNo = window.theSSO.User.PlayRoles[0].orgNo;
	function _loadOption(optionNode) {
		if (optionNode.nodeName==='OPTION') {
			var option = {};
			
			var i=0, sSpecialCheck='',  checkItem='';
			option.ownOUId = SSOUtil.xml_getChildNodeValue(optionNode, 'OWN_OU_ID');
			option.docState = SSOUtil.xml_getChildNodeValue(optionNode, 'DOC_STATE');
			option.txName = SSOUtil.xml_getChildNodeValue(optionNode, 'TX_NAME');
			option.display = SSOUtil.xml_getChildNodeValue(optionNode, 'DISPLAY');
			
			if (option.txName=='送會簽') {
				theLogger.log('-I- process txName:"' + option.txName + '"...');
			}
			
			option.specialCheck = '';
			option.advancedCheck = '';
			sSpecialCheck = SSOUtil.xml_getChildNodeValue(optionNode, 'SPECIAL_CHECK');
			if (sSpecialCheck.length) {
				for(i=0; i<sSpecialCheck.length; i++) {
					checkItem = sSpecialCheck.substring(i, i+1);
					if (_rule_const.MENU_SPECIAL_CHECK_LIST.indexOf(checkItem)!==-1) {
						option.specialCheck += checkItem;
					}
					
					if (_rule_const.MENU_ADV_CHECK_LIST.indexOf(checkItem)!==-1) {
						option.advancedCheck += checkItem;
					}
				}
			}
			
			option.next = SSOUtil.xml_getChildNodeValue(optionNode, 'NEXT');
			
			/* 紙本流程<NEXT>有 MINUE attribute */
			var $next = $(optionNode).find('NEXT');
			var minus = SSOUtil.xml_getAttrValue($next[0], 'MINUS');
			if (minus===null) {
				minus = '';
			}
			
			option.m_nOffset = _rule_const.OFFSET_NOTHING;
			if (minus.length) {
				if (minus == _rule_const.OD_TARGET_MINUS) {
					option.m_nOffset = _rule_const.OFFSET_RMV_CURRENT_OU;
				}
				else if (minus == _rule_const.OD_TARGET_PLUS) {
					option.m_nOffset = _rule_const.OFFSET_RMV_CURR_ADD_INC;
				}
				else if (minus == _rule_const.OD_TARGET_STAR) {
					option.m_nOffset = _rule_const.OFFSET_ADD_L2_AND_L1;
				}
				else if (minus == _rule_const.OD_TARGET_SHARP) {
					option.m_nOffset = _rule_const.OFFSET_RMV_CURRENT_OU_L2;
				}
				else if (minus == '1' || minus == '2') {
					option.next += minus;
					option.m_nOffset = _rule_const.OFFSET_NOTHING;
				}
				else {
					option.m_nOffset = _rule_const.OFFSET_NOTHING;
				}
			}
			
			/* 部份項目可自行指定角色
			 * <NEXT Role="xx;xx;xxx;">
			 */
			option.nextRoleList = [];
			if (option.txName.indexOf('退回承辦單位')===0) {
				theLogger.debug('txName contains \'退回承辦單位\'....');
			}
			var roleList = _getNextRoleList(optionNode);
			if (roleList!==null && roleList.length>0) {
				option.nextRoleList = roleList;
			}
			
			//option.reject = SSOUtil.xml_getChildNodeValue(optionNode, 'REJECT');
			option.ouLen = SSOUtil.xml_getChildNodeValue(optionNode, 'OU_LEN');
			//option.optLvl = SSOUtil.xml_getChildNodeValue(optionNode, 'OPT_LVL');
			
			option.equalCheck = SSOUtil.xml_getChildNodeValue(optionNode, 'EQUAL_CHECK');
			option.webPage = SSOUtil.xml_getChildNodeValue(optionNode, 'WEBPAGE'); // for 分會 (FDA MenuRule只有分會有WEBPAGE)
			option.webPage_Minus = '';
			var $webPage = $(optionNode).find('WEBPAGE');
			var webPage_minus = SSOUtil.xml_getAttrValue($webPage[0], 'MINUS');
			if (!!webPage_minus && webPage_minus.length) {
				option.webPage_Minus = webPage_minus;
			}
			
			return option;
		}
		return null;
	}
	
	function _loadRule(ruleNode) {
		var i=0, option;
		if (ruleNode.nodeName==='EDOL_UI_RULE') {
			var rule = {}, $txListNode, $options;
			rule.folder = SSOUtil.xml_getChildNodeValue(ruleNode, 'FOLDER');
			rule.subfolder = SSOUtil.xml_getChildNodeValue(ruleNode, 'SUBFOLDER');
			rule.menuRuleItem = true; // 2016.9.29 - 記錄是否為MPRUlE(E)_$ORG_NO$.XML內的項目...
						
			rule.txList = [];
			$txListNode = $(ruleNode).find('TX_LIST');
			if ($txListNode.length) {
				$options = $txListNode.find('OPTION');
				for (i=0; i<$options.length; i++) {
					option = _loadOption($options[i]);
					if (!!option) {
						rule.txList.push(option);
					}
				}
			}
			
			if (typeof _debug=='boolean' && _debug && rule.folder==='待處理' && rule.subfolder==='主辦') {
				// dump content
				theLogger.debug('MenuRulePDoc for \"' + rule.folder + '/' + rule.subfolder + ':');
				for(i=0; i<rule.txList.length; i++)
				{
					option = rule.txList[i];
					theLogger.debug('\t#' + (i+1) + ' TxName=' + option.txName + ', Next=' + option.next + ', SpecialCheck=' + option.specialCheck);
				}
			}
			return rule;
		}
		return null;
	}
	
	function _loadCTarget(cTargetNode) { // for PDoc
		function _loadCTargetOption(cOptionNode) {
			/* <CTarget NEXTTYPE='X'>/
			 * <OPTION title="xxx" finalTarget="true"> [title/finalTarget皆為optional]
			 *   child nodes: OU_ID / OU_NAME / ROLE_ID / ROLE_NAME / USER_ID / USER_NAME / [OPTION]
			*/
			var i=0, $subOptionNodes = null, subOptionNode = null;
			var cOption = {}, cSubOption=null;
			var sValue = SSOUtil.xml_getAttrValue(cOptionNode, 'title');
			cOption._title = '';
			if (!!sValue && sValue.length) {
				cOption._title = sValue; // 2017.7.6 - bug fix.
			}
			cOption._finalTarget = true;
			sValue = SSOUtil.xml_getAttrValue(cOptionNode, 'finalTarget');
			if (!!sValue && sValue.length) {
				sValue = sValue.toLowerCase();
				if (sValue==='n' || sValue==='false' || sValue==='0') {
					cOption._finalTarget = false;
				}
			}
			
			cOption.ouId = SSOUtil.xml_getChildNodeValue(cOptionNode, 'OU_ID');
			cOption.ouName = SSOUtil.xml_getChildNodeValue(cOptionNode, 'OU_NAME');
			cOption.roleId = SSOUtil.xml_getChildNodeValue(cOptionNode, 'ROLE_ID');
			cOption.roleName = SSOUtil.xml_getChildNodeValue(cOptionNode, 'ROLE_NAME');
			cOption.userId = SSOUtil.xml_getChildNodeValue(cOptionNode, 'USER_ID');
			cOption.userName = SSOUtil.xml_getChildNodeValue(cOptionNode, 'USER_NAME');
			
			cOption.options = [];
			$subOptionNodes = $(cOptionNode).children('OPTION');
			if ($subOptionNodes.length) {
				for(i=0; i<$subOptionNodes.length; i++) {
					subOptionNode = $subOptionNodes[i];
					if (!!subOptionNode) {
						cSubOption = _loadCTargetOption(subOptionNode);
						if (!!cSubOption) {
							cOption.options.push(cSubOption);
						}
					}
				}
			}
			return cOption;
		}
		
		var cTarget, $cOptionNodes, option;
		if (cTargetNode.nodeName==='CTarget') {
			cTarget = {
				options : []
			};
			
			cTarget._nextType = SSOUtil.xml_getAttrValue(cTargetNode, 'NEXTTYPE');
			$cOptionNodes = $(cTargetNode).children('OPTION');
			for (i=0; i<$cOptionNodes.length; i++)
			{
				option = _loadCTargetOption($cOptionNodes[i]);
				if (!!option) {
					cTarget.options.push(option);
				}
			}
			
			// 沒有對象, 回傳null
			if (cTarget.options.length===0) {
				theLogger.warn('-W- CTarget NEXTTYPE=' + cTarget._nextType + ' 沒有任何OPTION, 排除之!');
				return null;
			}
			return cTarget;
		}
		return null;
	}
	
	/* 設定[紙本]MenuRule factory的環境變數 */
	function _setupEnvSetting(ruleEnvSetting, theEnvSettings) {
		if (typeof ruleEnvSetting === 'undefined' || ruleEnvSetting===null) {
			ruleEnvSetting = _ruleEnvSetting;
		}
		
		var strEnvSet = '';
		var envSet = theEnvSettings;
        if (typeof envSet=='undefined' || envSet===null) {
            if (typeof window.theSSO.User.EnvSettings!=='undefined' && window.theSSO.User.EnvSettings!==null) {
                envSet = window.theSSO.User.EnvSettings;
            }
        }
        
        if (typeof envSet=='undefined' || envSet===null) {
            theLogger.error('Error! setupEnvSetting(), 無效的sysEnvSetting.');
            return false;
        }
		
		ruleEnvSetting.underTakerRoles = [];
		strEnvSet = envSet.get('MP_RULE_UNDERTAKER_ROLEID');	// 可承辦公文人員角色
		if (!!strEnvSet && strEnvSet.length) {
			ruleEnvSetting.underTakerRoles = strEnvSet.split(';');
		}
		else {
			ruleEnvSetting.underTakerRoles.push(window.sso_const.ROLENO_OPERATOR);
		}
		
		strEnvSet = envSet.get('MP_RULE_K_CLASS_WITH_SUBUNIT');
		if (!!strEnvSet && strEnvSet.length && (strEnvSet==='N' || strEnvSet=='n')) {
			ruleEnvSetting.KClassWithSubUnit = false;
		}
		else {
			ruleEnvSetting.KClassWithSubUnit = true;
		}
		
		ruleEnvSetting.draftCancelByDesk = envSet.get('DraftCancelByDesk');
		strEnvSet = envSet.get('MainCancelSubfolder');
		if (strEnvSet.length) {
			if (strEnvSet.substring(strEnvSet.length-1, 1)!==';') {
				ruleEnvSetting.mainCancelSubfolder = strEnvSet + ';';
			}
		}
		ruleEnvSetting.checkMeetDateBTypeNo = envSet.get('OD_CHECKMEETDATE_BTYPENO');
		if (typeof ruleEnvSetting.checkMeetDateBTypeNo == 'undefined') {
			ruleEnvSetting.checkMeetDateBTypeNo = '';
		}
		
		ruleEnvSetting.SSOApproveSendTo = envSet.get('SSO_APPROVE_SEND_TO');
		if (typeof ruleEnvSetting.SSOApproveSendTo == 'undefined') {
			ruleEnvSetting.SSOApproveSendTo = '';
		}
		ruleEnvSetting.ODApproveType = envSet.get('OD_APPROVE_TYPE');
		if (typeof ruleEnvSetting.ODApproveType == 'undefined') {
			ruleEnvSetting.ODApproveType = '';
		}
		ruleEnvSetting.MPCanApproveRole = envSet.get('MP_CAN_APPROVE_ROLE');
		if (typeof ruleEnvSetting.MPCanApproveRole == 'undefined') {
			ruleEnvSetting.MPCanApproveRole = '';
		}
		
		var roleList = [];
		strEnvSet = envSet.get('OD_OD99_CAN_APP');
        ruleEnvSetting.OD99CanAppFolder = '';
        ruleEnvSetting.OD99CanApproveBTypeNo = '';
		if(!!strEnvSet && strEnvSet.length) {
			roleList = strEnvSet.split('|'); // 'Y|52|待處理主辦'
			if (roleList.length>=2) {
				ruleEnvSetting.OD99CanApproveBTypeNo = roleList[1]; // 取第二個項目
                //1051206 David 新增紀錄OD_OD99_CAN_APP第三個項目
				if (roleList.length>=3)
					ruleEnvSetting.OD99CanAppFolder = roleList[2]; // 取第三個項目
			}
			else {
				theLogger.error('Error! 無效的環境變數[OD_OD99_CAN_APP]設定值:"' + strEnvSet + '"');
			}	
		}
		
		strEnvSet = envSet.get('OD_SHOW_UNIT_ROLE');
		// 2015.5 - 處理未設定或設定值為空的情況!
		if (!!strEnvSet && strEnvSet.length) {
			roleList = strEnvSet.split('|');
			if (roleList.length>=2) {
				ruleEnvSetting.showUnitRoleId = roleList[0]; // 第一個項目為紙本簽核用的角色代碼! (第二個項目為線上簽核使用)
			}
			else {
				theLogger.error('Error! 無效的環境變數[OD_SHOW_UNIT_ROLE]設定值:"' + strEnvSet + '"');
				ruleEnvSetting.showUnitRoleId = '';
			}	
		}
		else {
			ruleEnvSetting.showUnitRoleId = '';
		}
		
		strEnvSet = envSet.get('OD_CHECK_FILE_CASE');
		ruleEnvSetting.checkFileCase = false;
		if (!!strEnvSet && strEnvSet.length && (strEnvSet==='Y' || strEnvSet==='y')) {
			ruleEnvSetting.checkFileCase = true;
		}
	}
	
	function _init() {
		var sMenuRule = window.localStorage['menuRulePDoc_' + _targetOrgNo];
		var menuRuleFilename = '', ODRPUIFilename = '';
		var success = false;
		if (!sMenuRule || (sMenuRule.length===0)) {
			menuRuleFilename = 'MPRule_' + _targetOrgNo + '.xml';
			success = SSOUtil.getMenuRule(artifact, _targetOrgNo, 'P', options); // 2014.9 - 取得後會存在localStorage內
			if (!success) {
				theLogger.error('Error! 無法取得MenuRule,檔名:' + menuRuleFilename + '檔案內容.');
				return false;
			}
			sMenuRule = window.localStorage['menuRulePDoc_' + _targetOrgNo];
		}
		
		var sODRPUI = window.localStorage['ODRPUI_' + _targetOrgNo];
		if ((typeof sODRPUI == 'undefined') || sODRPUI===null || sODRPUI.length===0) {
			ODRPUIFilename = 'ODRPUI.XML';
			success = SSOUtil.getODRPUI(artifact, _targetOrgNo, options); // 2014.9 - 取得後會存在localStorage內
			if (!success) {
				theLogger.error('Error! 無法取得MenuRule,檔名:' + menuRuleFilename + '檔案內容.');
				return false;
			}
			sODRPUI = window.localStorage['ODRPUI_' + _targetOrgNo];
		}
		
		var parser = null, parse2 = null;
		var $rules = null, $cTargets = null;
		var cntRule = 0, cntTarget = 0;
		var ruleNode, targetNode, rule, cTarget;
		var i = 0, j = 0;
		if (!!sMenuRule && sMenuRule.length) {
			_setupEnvSetting(_ruleEnvSetting);
			
			parser = new DOMParser();
			var menuRuleEDOM = parser.parseFromString(sMenuRule, 'text/xml');
			var menuRulePDoc = menuRuleEDOM.documentElement;
			$rules = $(menuRulePDoc).find('EDOL_UI_RULE');
			$cTargets = $(menuRulePDoc).find('CTarget');
			cntRule = $rules.length;
			cntTarget = $cTargets.length;
			for(i=0; i<cntRule; i++)
			{
				ruleNode = $rules[i];
				rule = _loadRule(ruleNode);
				if (rule) {
					theLogger.log('#' + SSOUtil.jf_PADL2(i, 2, '0') + ' rule for ' + rule.folder + '/' + rule.subfolder + ' loaded.');
					_rulePDoc.push(rule);
				}
			}
			
			for (i=0; i<cntTarget; i++) {
				targetNode = $cTargets[i];
				cTarget = _loadCTarget(targetNode);
				if (cTarget) {
					theLogger.log('#' + SSOUtil.jf_PADL2(i, 2, '0') + ' cTarget for NEXTTYPE=[' + cTarget._nextType + '] loaded.');
					_cTargetsPDoc.push(cTarget);
				}
			}
		}
		else {
			theLogger.error('Error! 無法取得MenuRule,檔名:' + menuRuleFilename + '檔案內容.');
			return false;
		}
		
		if (!!sODRPUI && sODRPUI.length) {
			parse2 = new DOMParser();
			var UISet = parse2.parseFromString(sODRPUI, 'text/xml');
			var docUISet = UISet.documentElement;
			var $UIRules = $(docUISet).find('EDOL_UI_RULE');
			
			var metaDataM = '', buttonF = '', folder='', subfolder='';
			var targetRule=null, newRule=null;
			cntRule = $UIRules.length;
			for(i=0; i<cntRule; i++)
			{
				targetRule=null; newRule=null;
				
				metaDataM = ''; buttonF = '';
				folder=''; subfolder='';

				ruleNode = $UIRules[i];
				folder = SSOUtil.xml_getChildNodeValue(ruleNode, 'FOLDER');
				subfolder = SSOUtil.xml_getChildNodeValue(ruleNode, 'SUBFOLDER');

				metaDataM = SSOUtil.xml_getChildNodeValue(ruleNode, 'METADATA_M');
				buttonF = SSOUtil.xml_getChildNodeValue(ruleNode, 'BUTTON_F');
				webPage = SSOUtil.xml_getChildNodeValue(ruleNode, 'WEBPAGE');
				var $webPage = $(ruleNode).find('WEBPAGE');
				var webPage_Mode = SSOUtil.xml_getAttrValue($webPage[0], 'MODE');
				if (typeof webPage_Mode == 'undefined' || webPage_Mode === null)
					webPage_Mode = '';

				for(j=0; j<_rulePDoc.length; j++) {
					rule = _rulePDoc[j];
					if (rule.folder==folder && rule.subfolder==subfolder) {
						rule.metaDataM = metaDataM;
						rule.buttonF = buttonF;
						rule.webPage = webPage;
						rule.webPage_Mode = webPage_Mode;
						targetRule = rule;
						break;
					}
				}
				
				if (targetRule===null) {
					newRule =  {
						folder: folder,
						subfolder: subfolder,
						metaDataM : metaDataM,
						buttonF: buttonF,
						webPage: webPage,
						webPage_Mode: webPage_Mode,
						txList: null,
					};
					_rulePDoc.push(newRule);
				}
			}
			return true;
		}
		
		theLogger.error('Error! 無法取得ODRPUI, 檔名:' + ODRPUIFilename + ' 檔案內容.');
		return false;
	}
	
	function _getRule(folder, subfolder) {
		var i=0, cnt = _rulePDoc.length;
		for(i=0; i<cnt; i++)
		{
			var rule = _rulePDoc[i];
			if (rule && (rule.folder===folder) && (rule.subfolder===subfolder)) {
				return rule;
			}
		}
		return null;
	}
	
	function _getCTarget(nextType) {
		if (typeof nextType !== 'string') {
			return null;
		}
		
		var cntTarget = _cTargetsPDoc.length;
		var cTarget = null;
		for (i=0; i<cntTarget; i++) {
			cTarget = _cTargetsPDoc[i];
			if (cTarget._nextType===nextType) {
				return cTarget;
			}
		}
		return null;
	}
	
	// call _init() to load menuRule
	_init();
	
	this.init = _init;
	//this.getNextFolder = _getNextFolder;
	this.getRule = _getRule;
	this.getCTarget = _getCTarget;
	this.getRuleCount = function() {
		if (typeof _cTargetsPDoc === 'undefined') {
			return 0;
		}
		else {
			return _cTargetsPDoc.length;
		}
	};
	
	this.ruleEnvSetting = _ruleEnvSetting;
	this.orgNo = _targetOrgNo; // 2013.12 - cache menuRule object
}
/* 目的: 建立紙本簽核公文傳送選單項目
 *
 * 參數:
 *	currentFlow: 目前流程點資訊
 *	menuRule: 公文隸屬機關的MenuRule
 *	orgNode: OrgInfo.xml的<OrgInfo> node
 *	docObj: 公文基資
 *  extraOptions: 其它設定 [forPopupMenu? ]
 */
function _buildPDocNextOptions(currentFlow, menuRule, orgNode, docObj, extraOptions /*, apporveTarget*/) {
	var _options = $.extend({approved:false, rejected:false },
							extraOptions);
	
	var _forPopupMenu = false;
	if (typeof _options.forPopupMenu !== 'undefined' && _options.forPopupMenu===true) {
		_forPopupMenu = true;
	}
	
	// 系統定義的常數
	var SYS_CONST = window.sso_const;
	var _ruleEnvSetting = menuRule.ruleEnvSetting;
	var _rule_const = window.MPRulePDoc_Const;
	var _docObj = docObj;
	var _szEnumTargetNext = ['D1', 'E1', 'E2', 'H', 'H1',
							 'H2', 'K', 'R', 'U', 'T',
							 'E', 'M1' , 'E3', // 2021.7 - 1100433 Eric, merge: 2017.7.4 - 1060389, 新增'E3'
							 'E4', 'E5', 'E6', 'O4']; // 2021.7 - 1100433 Eric, merge: 2017.9.5 - 1060767, 新增'E4, E5, E6, O4'
	var excludeRoleList = ['OD16', 'OD17', 'OD97'];

	function _isValidNext(next) {
		// 2014.9 - 完整功能測試
		return true;
	}
    
	/* 是否應由OrgInfo取得傳送對象 */
	function _shouldEnumTargets(next) {
		var i=0;
		for(i=0; i<_szEnumTargetNext.length; i++) {
			if (next==_szEnumTargetNext[i]) {
				return true;
			}
		}
		return false;
	}

	function _getUnitNode(orgNode, unitNo) {
		if (orgNode && unitNo && unitNo.length)
		{
			if (orgNode) {
				var $orgNode = $(orgNode);
				var xpath = 'Unit[UnitCode="' + unitNo + '"]';
				var unitNode = ($orgNode.find(xpath))[0];
				if (unitNode) {
					return unitNode;
				}	
				else {
					theLogger.warn('-W- _getUnitNode() 找不到UnitNo=[' + unitNo + ']的 <Unit> node.');
				}
			}
		}
		else {
			theLogger.error('-ERR- _getUnitNode() invalid orgNode/unitNo');
		}
		return null;
	}
	
	function _getRoleNode(unitNode, roleNo) {
		if (!!unitNode && roleNo.length)
		{
			var rolePath = 'Role[RoleNo="' + roleNo + '"]';
			if (unitNode)
			{
				var roleNode = ($(unitNode).find(rolePath))[0];
				if (roleNode)
				{
					return roleNode;
				}	
				else {
					theLogger.warn('-W- _getRoleNode() 找不到RoleNo=[' + roleNo + ']的 <Role> node.');
				}
			}
		}
		return null;
	}
	
	function _getRoleOccupants(roleNode, excludeProxy) {
		excludeProxy = (typeof excludeProxy=='booelan' && excludeProxy===false) ? false : true;
		if (!!roleNode)
		{
			var roleOccupants = [];
			var occupantPath = 'RoleOccupant';
			if (roleNode)
			{
				var $occupantNodes = $(roleNode).find(occupantPath);
				var i = 0, cnt = $occupantNodes.length;
				var occupantNode;
				for(i=0; i<cnt; i++)
				{
					occupantNode = $occupantNodes[i];
					var account = SSOUtil.xml_getChildNodeValue(occupantNode, 'Account');
					var name = SSOUtil.xml_getChildNodeValue(occupantNode, 'Name');
					var sProxy = SSOUtil.xml_getAttrValue(occupantNode, 'IsProxy');
					var isProxy = false;
					if (excludeProxy) {
						if (!!sProxy && sProxy.length && (sProxy=='Y' || sProxy=='y')) {
							isProxy = true;
						}
					}
					
					if (!isProxy && !!account && account.length &&
						!!name && name.length) {
						roleOccupants.push({'account': account, 'name': name});
					}
				}
				return roleOccupants;
			}
		}
		return null;
	}
	
	/* 紙本公文傳送選單, 篩選目前可用的rules
	 * ruleOption: <Rule><OPTION>項目
	 * docObj: 目前開啟公文基資
	 * inchargeUser: 公文承辦人資訊
	 * ownUser: 公文目前所在人員資訊
	 * specialCheck: MP右鍵選單:true, Menu for ODC010: false
	*/
	function _displayRuleOption(ruleOption, docObj, inchargeUser, ownUser, forPopupMenu) {
		function _checkItem(strCheck, strItem) {
			if (strCheck.length && strCheck.indexOf(strItem)!==-1) {
				return true;
			}
			return false;
		}
		var i=0;
		var sBTypeNoList='', sBTypeNo='';
		var BTypeNoList = null;
		var match = false;
		var rule_const = window.MPRulePDoc_Const;
		var sc = window.sso_const;
		var value = '';
		if (ruleOption.ownOUId.length) {
			if (ruleOption.ownOUId!=ownUser.OUId) {
				theLogger.log('篩選去除項目:' + ruleOption.txName + ', next=' + ruleOption.next +
							' (ruleOption.ownOUId[' + ruleOption.ownOUId + ']!=ownUser.OUId['+ ownUser.OUId + '])');
				return rule_const.MENU_ITEM_DISPLAYNONE;
			}
		}
		
		// 2016.11.3 - 序483
		if (!!ruleOption.ouLen && ruleOption.ouLen.length) {
			var len = parseInt(ruleOption.ouLen);
			if (len>0) {
				if (ownUser.OUId.length!=len) {
					theLogger.log('ruleOption.ouLen=' + ruleOption.ouLen + ', 不列入 (OwnOUId==' + ownUser.OUId + ')');
					return rule_const.MENU_ITEM_DISPLAYNONE;
				}
			}
		}
		
		// DUE_DATE空白才列出!
		if (_checkItem(ruleOption.specialCheck, 'G') && docObj.ODWMSG.DUE_DATE.length) {
			theLogger.log('篩選去除項目:' + ruleOption.txName + ', next=' + ruleOption.next + ' (SPECIAL_CHECK:G, DUE_DATE不為空白)');
			return rule_const.MENU_ITEM_DISPLAYNONE;
		}
		
		// DUE_DATE不為空白才列出!
		if (_checkItem(ruleOption.specialCheck, 'H') && (docObj.ODWMSG.DUE_DATE.length===0)) {
			theLogger.log('篩選去除項目:' + ruleOption.txName + ', next=' + ruleOption.next + ' (SPECIAL_CHECK:H, DUE_DATE為空白)');
			return rule_const.MENU_ITEM_DISPLAYNONE;
		}
		
		// 不作檢核, for ODC010 Menu item
		if (!forPopupMenu && _checkItem(ruleOption.specialCheck, 'C')) { 
			return rule_const.MENU_ITEM_ENABLE;
		}
		
		// 目前公文狀態DOC_STATE是否符合!
		if (ruleOption.docState.length && ruleOption.docState!=docObj.docState) {
			theLogger.log('篩選去除項目:' + ruleOption.txName + ', next=' + ruleOption.next + ' (公文狀態不同)');
			return rule_const.MENU_ITEM_DISPLAYNONE;
		}
		
		if (ruleOption.txName=='送會簽') {
			theLogger.log('-I- debug txName:' + ruleOption.txName);
		}
		
		// [A] 已核決公文才列出
		if (_checkItem(ruleOption.specialCheck, 'A')) {
			if (docObj.ODWMSG.APP_USER_NAME.length===0) {
				return rule_const.MENU_ITEM_DISPLAYNONE;
			}
		}
		
		// [X]未核決公文才列出
		if (_checkItem(ruleOption.specialCheck, 'X')) {
			if (docObj.ODWMSG.APP_USER_NAME.length>0) {
				return rule_const.MENU_ITEM_DISPLAYNONE;
			}
		}
		
		// "F" 業務類別是否符合
		if (_checkItem(ruleOption.specialCheck, 'F')) {
            // 2016.12.5 - 1051175, FDA才會檢核核決者, 其它機關會在TSP作業中自動給值! (此時尚未設值)
			var appUserDataOk = true;
			if (SSO_CONFIG.OrgNickName=='FDA' && docObj.ODWMSG.APP_USER_NAME.length===0) {
				appUserDataOk = false;
			}
            
			if (!appUserDataOk || //docObj.ODWMSG.APP_USER_NAME.length===0 ||
				docObj.ODWMSG.NEW_BY_OU !== 'N' ||
				docObj.ODWMSG.COM_TYPE != '2') {
				return rule_const.MENU_ITEM_DISPLAYNONE;
			}
			else {
				sBTypeNoList = _ruleEnvSetting.OD99CanApproveBTypeNo; // BTypeNoList string format: '52;11;14'
				if (sBTypeNoList.length) {
					BTypeNoList = sBTypeNoList.split(';');
				}
				
				//2017.10.24 - 1060953 鐵工局如為彙辦公文，可使用承辦人自行決行
				var match = false;
				if (SSO_CONFIG.OrgNickName=='RRB' && docObj.ODWDCM.COMBINE_TYPE_2 === "1"){
					match = true;
				}
				else
				{
					match = false;
					for(i=0; i<BTypeNoList.length; i++) {
						sBTypeNo = BTypeNoList[i];
						if (sBTypeNo.length) {
							if (sBTypeNo==docObj.ODWMSG.B_TYPE_NO) {
								match = true;
								break;
							}
						}
					}
				}
				
				if (!match) {
					return rule_const.MENU_ITEM_DISPLAYNONE;
				}
			}
		}
		
		// 銷號檢查 "C"
		if (_checkItem(ruleOption.specialCheck, 'C')) {
			var subfolder = docObj.subfolder;
			if (subfolder.length) {
				subfolder += ';';
			}
			
			if (_ruleEnvSetting.mainCancelSubfolder.indexOf(subfolder) !== -1) {
				theLogger.log('-I- CheckCancel cond=1, check mainCancelSubfolder...');
				if (ruleOption.advancedCheck.indexOf('5')!== -1) {
					if (docObj.ODWMSG.TX_REASON.length===0) {
						return rule_const.MENU_ITEM_DISABLE;
					}
					
					// 併辦公文不可銷號
					if (docObj.get('ODWDCM', 'COM_DOC_COMBINE_TYPE')!=='1') {
						return rule_const.MENU_ITEM_DISABLE;
					}
					return rule_const.MENU_ITEM_ENABLE;
				}
				return rule_const.MENU_ITEM_ENABLE;
			}
			else if (docObj.IS_OURCV==='1') {
				theLogger.log('CheckCancel cond=5, IS_OURCV=' + docObj.IS_OURCV + ' ...');
				if (ruleOption.advancedCheck.indexOf('5')!== -1) {
					if (docObj.ODWMSG.TX_REASON.length===0) {
						return rule_const.MENU_ITEM_DISABLE;
					}
					
					// 併辦公文不可銷號
					if (docObj.get('ODWDCM', 'COM_DOC_COMBINE_TYPE')!=='1') {
						return rule_const.MENU_ITEM_DISABLE;
					}
					return rule_const.MENU_ITEM_ENABLE;
				}
				return rule_const.MENU_ITEM_ENABLE;
			}
			else if (_ruleEnvSetting.draftCancelByDesk=='Y' && docObj.get('ODWMSG', 'NEW_BY_OU')==='Y') {
				theLogger.log('CheckCancel cond=2, draftCancelByDesk=' + _ruleEnvSetting.draftCancelByDesk + ', NEW_BY_OU=' + docObj.get('ODWMSG', 'NEW_BY_OU'));
				if (ruleOption.advancedCheck.indexOf('5')!== -1) {
					if (docObj.ODWMSG.TX_REASON.length===0) {
						return rule_const.MENU_ITEM_DISABLE;
					}
					
					// 併辦公文不可銷號
					if (docObj.get('ODWDCM', 'COM_DOC_COMBINE_TYPE')!=='1') {
						return rule_const.MENU_ITEM_DISABLE;
					}
					return rule_const.MENU_ITEM_ENABLE;
				}
				return rule_const.MENU_ITEM_ENABLE;
			}
			else if (docObj.dueDate.length===0 &&
					 ruleOption.specialCheck.indexOf(rule_const.MENU_CHECK_DUE_DATE_EMPTY)==-1 &&
					 ruleOption.specialCheck.indexOf(rule_const.MENU_CHECK_DUE_DATE_EMPTY)==-1) {
				theLogger.log('CheckCancel cond=3, docObj.dueDate 為空字串.');
				if (ruleOption.advancedCheck.indexOf('5')!== -1) {
					if (docObj.ODWMSG.TX_REASON.length===0) {
						return rule_const.MENU_ITEM_DISABLE;
					}
					
					// 併辦公文不可銷號
					if (docObj.get('ODWDCM', 'COM_DOC_COMBINE_TYPE')!=='1') {
						return rule_const.MENU_ITEM_DISABLE;
					}
					return rule_const.MENU_ITEM_ENABLE;
				}
				return rule_const.MENU_ITEM_ENABLE;
			}
			else if (ruleOption.specialCheck.indexOf(rule_const.MENU_CHECK_DUE_DATE_EMPTY)==-1 &&
					 ruleOption.specialCheck.indexOf(rule_const.MENU_CHECK_DUE_DATE_EMPTY)==-1) {
				return rule_const.MENU_ITEM_DISPLAYNONE;
			}
		} // End of 銷號檢核'C'
		
		// O + "B": 公文在承辦單位(相同一級單位)
		if (_checkItem(ruleOption.advancedCheck, 'B')) { 
			var ICOUId = docObj.ICOuId;
			var ownOUId = docObj.ownOUId;
			if (ICOUId.length>sc.FIRSTCLASS_UNITNO_LEN) {
				ICOUId = ICOUId.substring(0, sc.FIRSTCLASS_UNITNO_LEN);
			}
			if (ownOUId.length>sc.FIRSTCLASS_UNITNO_LEN) {
				ownOUId = ownOUId.substring(0, sc.FIRSTCLASS_UNITNO_LEN);
			}
			
			if (ownOUId!==ICOUId) {
				return rule_const.MENU_ITEM_DISPLAYNONE;
			}
		}
		
		//if (_checkItem(ruleOption.advancedCheck, '0')) { // "0", EQUAL_CHECK 欄位檢核
		if (ruleOption.equalCheck.length) {
			var sEqualCheck = ruleOption.equalCheck;
			var checkItem = '', docEqualCheck = docObj.get('ODWMSG', 'MPRULE_EQUAL_CHECK');
			var equalChecks = [];
			var equal = false;
			if (sEqualCheck.length) {
				if (docEqualCheck.length) {
					equalChecks = sEqualCheck.split(';');
					for(i=0; i<equalChecks.length; i++) {
						checkItem = equalChecks[i];
						if (checkItem.length && docEqualCheck==checkItem) {
							equal = true;
							break;
						}
					}
				}
				
				if (!equal) {
					return rule_const.MENU_ITEM_DISPLAYNONE;
				}
			}
		}
		
		// O + 1, 主旨及文號不可為空白
		if (_checkItem(ruleOption.advancedCheck, '1')) {
			if (docObj.subject.length===0)
				return rule_const.MENU_ITEM_DISABLE;
			if (docObj.docNo.length===0)
				return rule_const.MENU_ITEM_DISABLE;

			//1111222 David 銓敘部新增任審案需檢核任審身份證字號不可為空
			if (SSO_CONFIG.OrgNickName=='MOCS')
			{
				let sProperty = docObj.get("ODWDCM", "DOC_PROPERTY");
				let sTADocProperty = theSSO.User.SystemSets.get("MOCS_TA_DOC_PROPERTY");
				let sTAPersonID = docObj.get("ODWDCM", "PERSON_ID");
				if(sProperty == sTADocProperty && sTAPersonID == "")
					return rule_const.MENU_ITEM_DISABLE;
			}
		}
		
		// O + 2, 分類號不可為空白
		if (_checkItem(ruleOption.advancedCheck, '2')) {
			if (docObj.get('ODWMSG', 'FILE_CLS').length===0) {
				return rule_const.MENU_ITEM_DISABLE;
			}
			if (_ruleEnvSetting.checkFileCase && docObj.get('ODWMSG', 'FILE_CASE').length===0) {
				return rule_const.MENU_ITEM_DISABLE;
			}
		}
		
		// O + "3", 保存年限
		if (_checkItem(ruleOption.advancedCheck, '3')) {
			if (docObj.get('ODWMSG', 'KEEP_YEAR').length===0) {
				return rule_const.MENU_ITEM_DISABLE;
			}
		}
		
		// O + "4", 檔案數量
		if (_checkItem(ruleOption.advancedCheck, '4')) {
			value = docObj.get('ODWMSG', 'FILE_CNT');
			if (value.length===0 || value=='0') {
				return rule_const.MENU_ITEM_DISABLE;
			}
		}
		
		// O + "5", 銷號原因
		if (_checkItem(ruleOption.advancedCheck, '5')) {
			if (docObj.get('ODWMSG', 'TX_REASON').length===0) {
				return rule_const.MENU_ITEM_DISABLE;
			}
		}
		
		//  O + "6", 關鍵字檢核
		if (_checkItem(ruleOption.advancedCheck, '6')) {
			if (docObj.get('ODWMSG', 'KEY_WORD').length===0) {
				return rule_const.MENU_ITEM_DISABLE;
			}
		}
		
		//  O + "7", 核決者/剔退者擇一
		if (_checkItem(ruleOption.advancedCheck, '7')) {
			if (docObj.get('ODWMSG', 'APP_USER_NAME').length===0 &&
				docObj.get('ODWMSG', 'REJECT_USER_NAME').length===0) {
				return rule_const.MENU_ITEM_DISABLE;
			}
		}
		
		// O + "8", 開會日期
		if (_checkItem(ruleOption.advancedCheck, '8')) {
			value = docObj.get('ODWMSG', 'MEET_DATE');
			if (docObj.get('ODWMSG', 'B_TYPE_NO')==_ruleEnvSetting.checkMeetDateBTypeNo  && value.length!=7) {
				return rule_const.MENU_ITEM_DISABLE;
			}
		}
		
		//1120313	Leslie[銓敘部序124]	新增退文等特殊異動別時，增加檢核異動原因
		// "R", "異動"原因
		if (_checkItem(ruleOption.advancedCheck, 'R')) {
			if (docObj.get('ODWMSG', 'TX_REASON').length===0) {
				return rule_const.MENU_ITEM_DISABLE;
			}
		}
		
		return rule_const.MENU_ITEM_ENABLE;
	} /* End of _displayRuleOption() */
	
	/* 紙本公文傳送選單, 取得指定角色人員 */
	function _getUnitTargets(sNext, orgNode, saveTargets, unitNo, targetRoles, includeSubUnit, isGroupBySubUnits) {
		function _setupRoleTarget(roleNode, sNext, toOUId, toOUName, saveTargets) {
			var roleNo = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleNo');
			var roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
			
			var occupants = _getRoleOccupants(roleNode, true);
			var i=0, occupant=null, theTarget=null, cnt=0;
			if (occupants!==null && occupants.length) {
				for(i=0; i<occupants.length; i++) {
					occupant = occupants[i];
					theTarget = {
						toOU: sNext,
						finalTarget: true,
						'toOUId': toOUId,
						'toOUName': toOUName,
						toRoleId: roleNo,
						toRoleName: roleName,
						toUserId: occupants[i].account,
						toUserName: occupants[i].name,
					};
					
					if (theTarget.toUserId.length) {
						theTarget.toUserId = theTarget.toUserId.toUpperCase();
					}
					
					cnt++;
					saveTargets.push(theTarget);
				}
			}
			return cnt;
		}
		
		var unitNode = _getUnitNode(orgNode, unitNo);
		var unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
		
		var $subUnitNodes, subUnitCnt, subUnitNode, subUnitNo, subUnitName;
		var $roleNodes, roleCnt, roleNode, roleNo;
		//var roleNode = _getRoleNode(unitNode, toRoleId);
		
		var i=0, j=0, totalCnt=0, cnt=0;
		var subUnitTarget = null, listTarget = null;
		
		$roleNodes = $(unitNode).children('Role');
		roleCnt = $roleNodes.length;
		for(j=0; j<roleCnt; j++)
		{
			roleNode = $roleNodes[j];
			if (!!roleNode) {
				roleNo = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleNo');
				if (targetRoles.indexOf(roleNo)==-1) { // 須在角色清單(listUndertakerRole)才列入
					continue;
				}
				cnt = _setupRoleTarget(roleNode, sNext, unitNo, unitName, saveTargets);
				totalCnt += cnt;
			}
		}
		
		if (unitNo.length==SYS_CONST.FIRSTCLASS_UNITNO_LEN && includeSubUnit) {
			$subUnitNodes = $(unitNode).children('Unit');
			subUnitCnt = $subUnitNodes.length;
			for(i=0; i<subUnitCnt; i++) {
				subUnitNode = $subUnitNodes[i];
				subUnitNo = SSOUtil.xml_getChildNodeValue(subUnitNode, 'UnitNo');
				subUnitName = SSOUtil.xml_getChildNodeValue(subUnitNode, 'UnitName');
				
				if (isGroupBySubUnits) {
					subUnitTarget = {
						toOU: sNext,
						finalTarget: false,
						'toOUId': subUnitNo,
						'toOUName': subUnitName,
						toRoleId: '', toRoleName: '',
						toUserId: '', toUserName: '',
						options: []
					};
					listTarget = subUnitTarget.options;
				}
				else {
					listTarget = saveTargets;
				}
					
				$roleNodes = $(subUnitNode).children('Role');
				roleCnt = $roleNodes.length;
				for(j=0; j<roleCnt; j++)
				{
					roleNode = $roleNodes[j];
					roleNo = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleNo');
					if (targetRoles.indexOf(roleNo)==-1) { // 須在角色清單(listUndertakerRole)才列入
						continue;
					}
					cnt = _setupRoleTarget(roleNode, sNext, subUnitNo, subUnitName, listTarget);
					totalCnt += cnt;
				}
				
				if (!!subUnitTarget && subUnitTarget.options.length) {
					saveTargets.push(subUnitTarget);
				}
			}
		}
		
		return totalCnt;
	}
	
	/* 移除<CTarget>子項目為指定unitNo者 */
	function _removeSubUnitOfCTarget(srcCTarget, unitNo) {
		var newCTarget = {
			_nextType: srcCTarget._nexttype,
			options: []
		};
		
		var i=0;
		var option = null;
		for(i=0; i<srcCTarget.options.lenght; i++) {
			option = srcCTarget.options[i];
			if (option===null) continue;
			
			if (option.OUId !== unitNo) {
				newCTarget.options.push(option);
			}
		}
		
		return newCTarget;
	}
	
	/* 將<CTarget>/<OPTION> 項目轉換為傳送選單項目 */
	function _addCTargetOption(finalTarget, cTargetOption) {
		var newTarget = {
			toOU: finalTarget.next,
			finalTarget: cTargetOption._finalTarget,
			toOUId: cTargetOption.ouId,
			toOUName: cTargetOption.ouName,
			toRoleId: cTargetOption.roleId,
			toRoleName: cTargetOption.roleName,
			toUserId: cTargetOption.userId,
			toUserName: cTargetOption.userName,
			options: []
		};
		
		// 2017.7.6 - bug fix
		if (typeof cTargetOption._title=='string' && cTargetOption._title.length) {
			newTarget.title = cTargetOption._title;
		}
		
		var i = 0;
		var cntChild = cTargetOption.options.length;
		var _childOption;
		for(i=0; i<cntChild; i++) {
			_childOption = cTargetOption.options[i];
			_addCTargetOption(newTarget, _childOption);
		}
		
		finalTarget.options.push(newTarget);
	}
	
	/* enumerate specified 'NEXT' targets
	 * orgNode: orgNode for OrgInfo_$OrgNo$.xml
	 * sNext: <TX_LIST>/<OPTION>/<NEXT> value
	 * offset: offset value decided via MINUS attribute (<TX_LIST>/<OPTION>/<NEXT MINUS="x">)
	 * ownUser: ownUser info
	 * inchargeUser : incharge user info
	 * [out] saveTarget: save rslt here
	 * underTakerRoles: 可辦公文角色 (array)
	 * showUnitRoleId: 須有此角色才可列出指定單位(string)
	*/
	function _enumTargets(orgNode, sNext, offset, ownUser, inchargeUser, saveTarget, listUnderTakerRole, showUnitRoleId) {
		var cnt=0, theTarget=null, unitTarget=null;
		var unitNo, unitNode, unitName, roleNode, roleNo, roleName;
		var userInfo;
		var i=0, j=0, found=false;
		
		if (sNext==='K') {
			/*
			 * 取得指定單位下之承辦人
			 * [showUnitRoleId] => 若該指定單位為一級單位且有子單位，則分層級列出子單位承辦人
			 */
	
			/* 是否依二級單位區分使用者
			  2007.03.20 - Eric Peng, 勞委會要求傳送對象layout應與先前版本相同，不再多加二級單位區分
			  New(ClassWithSubUnit)	Org
			 ------------------------------------------------
			  人事室				人事室
			    aaa					  aaa
			    bbb					  bbb
			    一科				  ccc
			      ccc				  ddd
			      ddd				  eee
			    二科				  fff 
			      eee
			      fff
			*/
			var isClassWithSubUnits = _ruleEnvSetting.KClassWithSubUnit;
			cnt = _getUnitTargets(sNext, orgNode, saveTarget.options, ownUser.OUId, listUnderTakerRole, true, isClassWithSubUnits);
			theLogger.log('-I- next="' + sNext + '", _enumTarget count=' + cnt);
			return cnt;
		}
		else if (sNext=='D1') {
			/* DDL1: 公文承辦人
			 * DDL2, DDL3: N/A */
			userInfo = SSOUtil.getOrgUserInfo(orgNode, inchargeUser.OUId, '', inchargeUser.UserId, null, true);
			if (!!userInfo) {
				theTarget = {
					toOU: sNext,
					finalTarget: true,
					'toOUId': inchargeUser.OUId,
					'toOUName': inchargeUser.OUName,
					toRoleId: userInfo.RoleId,
					toRoleName: userInfo.RoleName,
					toUserId: inchargeUser.UserId,
					toUserName: inchargeUser.UserName,
				};
				saveTarget.options.push(theTarget);
				return 1;
			}
			else {
				theLogger.error('Error! _enumTargets() next=' + sNext + ', cannot find userInfo for OUId=' + inchargeUser.OUId + ', UserId=' + inchargeUser.UserId);
			}
		}
		else if (sNext=='E' || sNext=='E1' || sNext=='E2') {
			/* DDL1: 訊息所在單位登記桌
			 * DDL2, DDL3: N/A */
			/* E: 一級單位, E1: InchargeOU 單位, E2: 二級單位 */
			unitNo = ownUser.OUId;
			if ((typeof unitNo =='undefined') || unitNo===null || unitNo.length===0) {
				theLogger.error('Error! _enumTargets() next=' + sNext + ', invalid ownUser.OUId.');
				return 0;
			}
			if (sNext=='E') {
				if (unitNo.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
					unitNo = unitNo.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
				}
			}
			else if (sNext=='E2') {
				if (unitNo.length<=SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
					theLogger.error('Error! _enumTargets() next=' + sNext + ', 但OwnOUId字串長度有誤, [' + unitNo + ', length=' + unitNo.length + '] <= 一級單位代碼長度.');
					return 0;
				}
			}
			
			unitNode =_getUnitNode(orgNode, unitNo);
			unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
			roleNode = _getRoleNode(unitNode, SYS_CONST.ROLENO_REGISTER); // 登記桌
			roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
			if (!!roleNode) {
				theTarget = {
					toOU: sNext,
					finalTarget: true,
					'toOUId': unitNo,
					'toOUName': unitName,
					toRoleId: SYS_CONST.ROLENO_REGISTER,
					toRoleName: roleName,
					toUserId: '', toUserName: '',
				};
				saveTarget.options.push(theTarget);
				return 1;
			}
		}
		else if (sNext=='H' || sNext=='H1' || sNext=='H2') {
			/* DDL1: 承辦單位登記桌
			 * DDL2, DDL3: N/A */
			
			/* H: 一級單位, H1: InchargeOU 單位, H2: 二級單位 */
			unitNo = inchargeUser.OUId;
			if ((typeof unitNo == 'undefined') || unitNo===null || unitNo.length===0) {
				theLogger.error('Error! _enumTargets() next=' + sNext + ', invalid inchargeUser.OUId.');
				return 0;
			}
			if (sNext=='H') {
				if (unitNo.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
					unitNo = unitNo.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
				}
			}
			else if (sNext=='H2') {
				if (unitNo.length<=SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
					theLogger.error('Error! _enumTargets() next=' + sNext + ', 但inchargeOUId字串長度有誤, [' + unitNo + ', length=' + unitNo.length + '] <= 一級單位代碼長度.');
					return 0;
				}
			}
			
			unitNode =_getUnitNode(orgNode, unitNo);
			unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
			roleNode = _getRoleNode(unitNode, SYS_CONST.ROLENO_REGISTER); // 登記桌
			roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
			if (!!roleNode) {
				theTarget = {
					toOU: sNext,
					finalTarget: true,
					'toOUId': unitNo,
					'toOUName': unitName,
					toRoleId: SYS_CONST.ROLENO_REGISTER,
					toRoleName: roleName,
					toUserId: '', toUserName: '',
				};
				saveTarget.options.push(theTarget);
				return 1;
			}
		}
		else if (sNext=='M1') {
			/* DDL1: 承辦單位會簽人員(OD97) [一級]
			 * DDL2, DDL3: N/A */
			
			unitNo = inchargeUser.OUId;
			if ((typeof unitNo == 'undefined') || unitNo===null || unitNo.length===0) {
				theLogger.error('Error! _enumTargets() next=' + sNext + ', invalid inchargeUser.OUId.');
				return 0;
			}
			
			// 取一級單位!
			if (unitNo.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
				unitNo = unitNo.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
			}
			
			unitNode =_getUnitNode(orgNode, unitNo);
			unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
			roleNode = _getRoleNode(unitNode, SYS_CONST.ROLENO_COSIGN); // 會簽人員
			roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
			if (!!roleNode) {
				theTarget = {
					toOU: sNext,
					finalTarget: true,
					'toOUId': unitNo,
					'toOUName': unitName,
					toRoleId: 'OD97',
					toRoleName: roleName,
					toUserId: '', toUserName: '',
				};
				saveTarget.options.push(theTarget);
				return 1;
			}
		}
		else if (sNext=='R') {
			/* DDL1: 目前公文所在一級單位下所有二級單位
		     * DDL2, DDL3: N/A */
			unitNo = ownUser.OUId;
			if (!!unitNo && (unitNo.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN)) {
				unitNo = unitNo.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
			}

			unitNode = _getUnitNode(orgNode, unitNo);
			
			var $subUnitNodes, subUnitCnt, subUnitNode, subUnitNo, subUnitName;
			var $roleNodes, roleCnt;
			var occupants = null;
			$subUnitNodes = $(unitNode).children('Unit');
			subUnitCnt = $subUnitNodes.length;
			for(i=0; i<subUnitCnt; i++) {
				found = false;
				subUnitNode = $subUnitNodes[i];
				subUnitNo = SSOUtil.xml_getChildNodeValue(subUnitNode, 'UnitNo');
				subUnitName = SSOUtil.xml_getChildNodeValue(subUnitNode, 'UnitName');
				if (subUnitNo.length) {
					if (offset==_rule_const.OFFSET_RMV_CURRENT_OU_L2 && unitNo===ownUser.OUId) {
						continue; // R#, 排除目前公文所在二級單位
					}
					
					$roleNodes = $roleNodes = $(subUnitNode).children('Role');
					roleCnt = $roleNodes.length;
					for (j=0; j<roleCnt; j++) {
						occupants = null;
						roleNode = $roleNodes[j];
						roleNo = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleNo');
						/* 單位下須有showUnitRoleId指定角色,且有人扮演該角色才列出 */
						if (roleNo==showUnitRoleId) {
							occupants = _getRoleOccupants(roleNode, true);
							if (occupants.length) {
								found = true;
								break;
							}
						}
					}
					
					if (found) {
						theTarget = {
							toOU: sNext,
							finalTarget: true,
							'toOUId': subUnitNo,
							'toOUName': subUnitName,
							toRoleId: '', toRoleName: '',
							toUserId: '', toUserName: '',
						};
						saveTarget.options.push(theTarget);
						cnt++;
					}
				}
			}
			return cnt;
		}
		else if (sNext=='U') {
			/* DDL1: 所有一級單位 (排除一層決行及虛擬單位)
			 * DDL2: 二級單位
			 * DDL3: 承辦人 */
			var $unitNodes, unitCnt;
			unitTarget = null; i=0;
			var subCnt = 0;
			
			$unitNodes = $(orgNode).children('Unit');
			unitCnt = $unitNodes.length;
			for(i=0; i<unitCnt; i++) {
				unitNode = $unitNodes[i];
				virtual = SSOUtil.xml_getChildNodeValue(unitNode, 'Virtual');
				if ((typeof virtual==='undefined') || (virtual.length===0))
					continue;
				
				/* const int MODE_VIRTUAL_DEPT	=0; // 虛擬單位 (Virtual=2)
					const int MODE_COMMON_DEPT	=1; // 一般單位 (Virtual=1)
					const int MODE_BOTH_DEPT	=2; // 列出所有單位
					const int MODE_APPROVE_DEPT =3; // 決行單位 (Virtual=3, 6)
					const int MODE_DOC_PROCESS_DEPT = 4; // Virtual = 1 or Virtual = 6 (可辦文之一層決行單位), 2007.02.12 - Eric Peng
					
					#define COMMON_UNIT		"1"  // 一般單位
					#define VIRTUAL_UNIT	"2"	 // 虛擬單位, Ex 總收,總發, 研考
					#define APPROVE_UNIT    "3"  // 一層決行單位, Ex. 主任祕書室, 副首長室, 首長室
					#define APPROVE_COMMON_UNIT "6" // 可辦文之一層決行單位
					#define COMMON_ROLE		"OD99"
				 */
				
				// using MODE_COMMON_DEPT here...
				if (virtual!=='1')
					continue;
				
				// 2021.6 - 1100747 Eric, typo fix (SOUtil->SSOUtil)
				unitNo = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitNo');
				unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
				unitTarget = {
					toOU: sNext,
					finalTarget: false,
					'toOUId': unitNo,
					'toOUName': unitName,
					toRoleId: '', toRoleName: '', toUserId: '', toUserName: '',
					options: [],
				};
				subCnt = _getUnitTargets(sNext, orgNode, unitTarget.options, unitNo, listUnderTakerRole, true, true);
				cnt += subCnt;
				
				saveTarget.options.push(unitTarget);
			}
			theLogger.log('-I- next="' + sNext + '", _enumTarget count=' + cnt);
			return cnt;
		}
		else if (sNext=='T') {
			/* DDL1: 公文所在一級單位+其下之二級單位
			 * DDL2: 承辦人
			 * DDL3: N/A */
			unitNo = ownUser.OUId;
			if (!!unitNo && unitNo.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
				unitNo = unitNo.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
			}
			
			if (!!unitNo && unitNo.length) {
				cnt = _getUnitTargets(sNext, orgNode, saveTarget.options, unitNo, listUnderTakerRole, true, true);
			}
			return cnt;
		}
		else if (sNext=='E3') { // 2021.7 - 1100433 Eric, merge: 2017.6.30 (9.5-merge) - 成大需求1060389, 新增紙本簽核傳送至人TO_OU項目
			/* DDL1: 訊息所在單位
			 * DDL2: 單位長官角色, 
			 * DDL3: 人員名稱
			 */
			
			var subCnt = 0;
			unitNo = ownUser.OUId;
			if ((typeof unitNo =='undefined') || unitNo===null || unitNo.length===0) {
				theLogger.error('Error! _enumTargets() next=' + sNext + ', invalid ownUser.OUId.');
				return 0;
			}
			unitNode =_getUnitNode(orgNode, unitNo);
			unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
			var listRoleNo=null, listRoleNoSuper=null;

			var unitNodeSuper=null, unitNoSuper='', unitNameSuper='';
			//1131204	Leslie[1131151]	修正因單位代碼含非數字部分，造成判斷一層決行與虛擬單位錯誤的問題，改用字串紀錄與比對
			// var _unitNo = parseInt(unitNo);
			if (unitNo.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) { // 公文在二級單位
				listRoleNo = SYS_CONST.SECONDCLASS_OFFICER;

				unitNodeSuper = _getUnitNode(orgNode, unitNo.substr(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN));
				if (typeof unitNodeSuper!='undefined' && unitNodeSuper!==null) {
					unitNoSuper = unitNo.substr(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
					unitNameSuper = SSOUtil.xml_getChildNodeValue(unitNodeSuper, 'UnitName');
					listRoleNoSuper = SYS_CONST.FIRSTCLASS_OFFICER;
				}
				else {
					unitNodeSuper = null;
				}
			}
			//1131204	Leslie[1131151]	修正因單位代碼含非數字部分，造成判斷一層決行與虛擬單位錯誤的問題，改用字串紀錄與比對
			// else if (!isNaN(_unitNo) && _unitNo<SYS_CONST.APPROVEUNIT_NUM) { // 公文在一級單位(非核決單位)
			else if (unitNo<SYS_CONST.APPROVEUNIT_NUM) { // 公文在一級單位(非核決單位)
				listRoleNo = SYS_CONST.FIRSTCLASS_OFFICER;
			}
			else {
				listRoleNo = [];
			}

			var listValidRoleNo=[], listValidRoleName=[], listValidRoleNoSuper=[], listValidRoleNameSuper=[];

			var i=0, roleNode=null;
			if (listRoleNoSuper!==null && listRoleNoSuper.length) {
				for(i=0; i<listRoleNoSuper.length; i++) {
					roleNode = _getRoleNode(unitNodeSuper, listRoleNoSuper[i]);
					if (typeof roleNode=='object' && roleNode!==null) {
						roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
						if (roleName.length) {
							listValidRoleNoSuper.push(listRoleNoSuper[i]);
							listValidRoleNameSuper.push(roleName);
						}
					}
				}
			}

			// 篩選RoleNo, 指定單位內有的長官角色才加入!
			for(i=0; i<listRoleNo.length; i++) {
				roleNode = _getRoleNode(unitNode, listRoleNo[i]);
				if (typeof roleNode=='object' && roleNode!==null) {
					roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
					if (roleName.length) {
						listValidRoleNo.push(listRoleNo[i]);
						listValidRoleName.push(roleName);
					}
				}
			}

			if (listValidRoleNoSuper.length) {
				unitTarget = {
					toOU: sNext,
					finalTarget: false,
					'toOUId': unitNoSuper,
					'toOUName': unitNameSuper,
					toRoleId: '', toRoleName: '', toUserId: '', toUserName: '',
					options: [],
				};

				for(i=0; i<listValidRoleNoSuper.length; i++) {
					roleTarget = {
						toOU: sNext,
						finalTarget: false,
						'toOUId': unitNoSuper,
						'toOUName': unitNameSuper,
						toRoleId: listValidRoleNoSuper[i], 
						toRoleName: listValidRoleNameSuper[i], 
						toUserId: '', toUserName: '',
						options: [],
					};
					subCnt = _getUnitTargets(sNext, orgNode, roleTarget.options, unitNoSuper, [listValidRoleNoSuper[i]], false, false);
					cnt += subCnt;
					if (subCnt) {
						unitTarget.options.push(roleTarget);
					}
				}

				if (unitTarget.options.length) {
					saveTarget.options.push(unitTarget)
				}
			}
						
			if (listValidRoleNo.length) {
				unitTarget = {
					toOU: sNext,
					finalTarget: false,
					'toOUId': unitNo,
					'toOUName': unitName,
					toRoleId: '', toRoleName: '', toUserId: '', toUserName: '',
					options: [],
				};

				for(i=0; i<listValidRoleNo.length; i++) {
					roleTarget = {
						toOU: sNext,
						finalTarget: false,
						'toOUId': unitNo,
						'toOUName': unitName,
						toRoleId: listValidRoleNo[i], 
						toRoleName: listValidRoleName[i], 
						toUserId: '', toUserName: '',
						options: [],
					};
					subCnt = _getUnitTargets(sNext, orgNode, roleTarget.options, unitNo, [listValidRoleNo[i]], false, false);
					cnt += subCnt;
					if (subCnt) {
						unitTarget.options.push(roleTarget);
					}
				}

				if (unitTarget.options.length) {
					saveTarget.options.push(unitTarget)
				}
			}
			return cnt;
		}
		else if (sNext=='E4') { // 2021.7 - 1100433 Eric, merge: 2017.9.5 - 1060767
			/* DDL1: 公文承辦人(OD99) [目前所在單位]
			 * DDL2, DDL3: N/A */
			
			unitNo = ownUser.OUId;
			if ((typeof unitNo == 'undefined') || unitNo===null || unitNo.length===0) {
				theLogger.error('Error! _enumTargets() next=' + sNext + ', invalid ownUser.OUId.');
				return 0;
			}
			 
			if (!!unitNo && unitNo.length) {
				cnt = _getUnitTargets(sNext, orgNode, saveTarget.options, unitNo, listUnderTakerRole, false, false);
			}
			return cnt;
		}
		else if (sNext=='E5' || sNext=='E6' || sNext=='O4') { // 2021.7 - 1100433 Eric, merge: 2017.9.5 - 1060767
			/* DDL1: (E5)訊息所在單位(只能是2級)之1級單位
					 (E6)公文承辦1級單位
					 (O4)訊息所在單位(1/2級)
			 * DDL2: 單位長官角色, 
			 * DDL3: 人員名稱
			 */
			
			var targetUnitNo = '';
			var listRoleNo=null;
			if (sNext=='E5') {
				unitNo = ownUser.OUId;
				if ((typeof unitNo =='undefined') || unitNo===null || unitNo.length===0) {
					theLogger.error('Error! _enumTargets() next=' + sNext + ', invalid ownUser.OUId.');
					return 0;
				}
				else if (unitNo.length<=SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
					theLogger.warn('Error! _enumTargets() next=' + sNext + ', invalid ownUser.OUId[=' + unitNo + '] 須為3碼以上');
					return 0;
				}
				targetUnitNo = unitNo.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
				listRoleNo = SYS_CONST.FIRSTCLASS_OFFICER;
			}
			else if (sNext=='E6') {
				unitNo = inchargeUser.OUId;
				if ((typeof unitNo =='undefined') || unitNo===null || unitNo.length===0) {
					theLogger.error('Error! _enumTargets() next=' + sNext + ', invalid ownUser.OUId.');
					return 0;
				}

				// 取1級承辦單位
				if (unitNo.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
					targetUnitNo = unitNo.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
				}
				else {
					targetUnitNo = unitNo;
				}
				listRoleNo = SYS_CONST.FIRSTCLASS_OFFICER;
			}
			else if (sNext=='O4') {
				targetUnitNo = ownUser.OUId;
				if (targetUnitNo.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
					listRoleNo = SYS_CONST.SECONDCLASS_OFFICER;
				}
				else {
					listRoleNo = SYS_CONST.FIRSTCLASS_OFFICER;
				}
			}
			console.log('sNext="' + sNext + '", targetUnitNo="' + targetUnitNo + '", lsitRoleNo="' + listRoleNo.toString() + '"');
			
			unitNode =_getUnitNode(orgNode, targetUnitNo);
			unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
			
			//var unitNodeSuper=null, unitNoSuper='', unitNameSuper='';
			var _unitNo = parseInt(unitNo);
			var listValidRoleNo=[], listValidRoleName=[];

			var i=0, roleNode=null;
			// 篩選RoleNo, 指定單位內有的長官角色才加入!
			for(i=0; i<listRoleNo.length; i++) {
				roleNode = _getRoleNode(unitNode, listRoleNo[i]);
				if (typeof roleNode=='object' && roleNode!==null) {
					roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
					if (roleName.length) {
						listValidRoleNo.push(listRoleNo[i]);
						listValidRoleName.push(roleName);
					}
				}
			}

			if (listValidRoleNo.length) {
				unitTarget = {
					toOU: sNext,
					finalTarget: false,
					'toOUId': targetUnitNo,
					'toOUName': unitName,
					toRoleId: '', toRoleName: '', toUserId: '', toUserName: '',
					options: [],
				};

				for(i=0; i<listValidRoleNo.length; i++) {
					roleTarget = {
						toOU: sNext,
						finalTarget: false,
						'toOUId': targetUnitNo,
						'toOUName': unitName,
						toRoleId: listValidRoleNo[i], 
						toRoleName: listValidRoleName[i], 
						toUserId: '', toUserName: '',
						options: [],
					};
					subCnt = _getUnitTargets(sNext, orgNode, roleTarget.options, targetUnitNo, [listValidRoleNo[i]], false, false);
					cnt += subCnt;
					if (subCnt) {
						unitTarget.options.push(roleTarget);
					}
				}

				if (unitTarget.options.length) {
					saveTarget.options.push(unitTarget)
				}
			}
			return cnt;
		}
		theLogger.warn('-W- _enumTargets() unknow next (紙本):' + sNext);
		return 0;
	}
	
	/* 目的: 取得可核決指定公文的人員(角色)清單 */
	// 2021.6.11 - 1100748 Eric, implement TO_OU="V" (for 醫策會)
	function _enumerateApproveOfficer(docObj, listCanApproveRole, roleOnly) {
		// 2021.6 - Eric ref: LoginCOMCtrl MenuFactory.cpp _enumerateApproveOfficers
		
		/*function _getUpOrgApplyRoleName(sRoleId) {
			if (sRoleId == 'OD01') return '局長';
			else if (sRoleId == 'OD06') return '主任秘書';
			else if (sRoleId == 'OD11') return '組長';
			else if (sRoleId == 'OD21') return '科長';
			return '';
		}*/

		let _appUserList = [];

		// 列出指定單位內的所有可核決人員
		function _getApplyFromUnit(roleList, orgNo, unitNoList, filterMode) {
			if (Array.isArray(roleList)==false || roleList.length==0) {
				return;
			}

			let orgNode = SSOUtil.getOrgNode(orgNo);
			let i=0, j=0, k=0;
			for(i=0; i<unitNoList.length; i++) {
				let unitNo = unitNoList[i];
				if (typeof unitNo!=='string' || unitNo.length==0) continue;

				let unitNode = _getUnitNode(orgNode, unitNo);
				if (unitNode==null) continue;

				for(j=0; j<listCanApproveRole.length; j++) {
					let roleNo = listCanApproveRole[j];
					if (typeof roleNo!=='string' || roleNo.length==0) continue;

					let roleNode = _getRoleNode(unitNode, roleNo);
					if (roleNode==null) continue;

					let roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');

					if (filterMode.toLowerCase()=='roloe') {
						let _appUser = {
							role_id: roleNo,
							role_name: roleName,
							user_id: '',
							user_name: '',
						};
						// check if exist in list
						let exist_role = _appUserList.filter(function(appUser) { 
							if (appUser.role_id === _appUser.role_id) {
								return true;
							}
							return false;
						});
						if (Array.isArray(exist_role)==false || exist_role.length==0) {
							_appUserList.push(_appUser);
						}
					}
					else {
						let occupants = _getRoleOccupants(roleNode);
						if (occupants!==null) {
							for(k=0; k<occupants.length; k++) {
								let occupant = occupants[k];
								let _appUser = {
									role_id: roleNo,
									role_name: roleName,
									user_id: occupant.account,
									user_name: occupant.name,
								};

								// check if exist in list
								let exist_user = _appUserList.filter(function(appUser) { 
									if (appUser.user_id === _appUser.user_id) {
										return true;
									}
									return false;
								});
								if (Array.isArray(exist_user)==false || exist_user.length==0) {
									_appUserList.push(_appUser);
								}
							}
						}
					}
				}
			}
		} // EOF: _getApplyFromUnit()
		
		let i=0;
		// 先取EnvSet.OD_UPORG_APP_LIST項目
		let sAppList = theSSO.User.EnvSettings.get('OD_UPORG_APP_LIST');
		// 格式 = "帳號|姓名|角色代碼|角色名稱"
		// e.g. OD_UPORG_APP_LIST: 'moea01|張部長|OD01|部長;moea01|陳次長|OD01|次長;stella2|劉主任|OD11|主任'
		
		let listItem, sItem, item;
		if (typeof sAppList=='string' && sAppList.length) {
			if (sAppList.substring(sAppList.length-1, sAppList.length)!==';')
				sAppList += ';';
				
			listItem = sAppList.split(';');
			for (i=0; i<listItem.length; i++) {
				sItem = listItem[i];
				if (!!sItem && sItem.length) {
					item = sItem.split('|');
					if (item.length==4) {
						_appUserList.push({user_id:item[0], user_name:item[1], role_id:item[2], role_name:item[3]});
					}
				}
			}
		}
		
		// 取一層決行單位可核決人員
		// OD_SUPERIOR_UNIT_RANK: 設定一層決行單位代碼, 若為空值, 則使用'99','98','97','96','95'
		let sSuprUnitRank = theSSO.User.EnvSettings.get('OD_SUPERIOR_UNIT_RANK');
		let approvalUnit = [];
		if (typeof sSuprUnitRank=='string' && sSuprUnitRank.length) {
			// $UnitNo$|$UnitNo$|$UnitNo$|$UnitNo$
			let superUnit = sSuprUnitRank.split('|');
			if (superUnit.length) {
				approvalUnit.concat(superUnit);
			}
		}
		else {
			approvalUnit.push('99','98','97','96','95');
		}

		// 取得目前單位的可核決人員!
		let currentUnitNo = docObj.ownOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN?docObj.ownOUId.substr(0, sso_const.FIRSTCLASS_UNITNO_LEN):docObj.ownOUId;
		if (approvalUnit.indexOf(currentUnitNo)==-1) {
			approvalUnit.push(currentUnitNo);
		}
		
		_getApplyFromUnit(listCanApproveRole, docObj.sourceOrgNo, approvalUnit, roleOnly?'role':'user');
		if (_appUserList.length) {
			return _appUserList;
		}
		return null;
	} // EOF: _enumerateApproveOfficer()
	
	var folder='', subfolder='';
	folder = currentFlow.Folder;
	subfolder = currentFlow.SubFolder;
	
	var menu = menuRule.getRule(folder, subfolder);
	if ((typeof menu == 'undefined') || (menu===null)) {
		alert('找不到文件夾:' + folder + '/' + subfolder + '的MenuRule!');
		theLogger.warn('找不到文件夾:' + folder + '/' + subfolder + '的MenuRule!');
		return null;
	}
	else if (typeof menu.txList !=='object' || menu.txList===null) {
		theLogger.log('-I- 文件夾:' + folder + '/' + subfolder + ' MenuRule沒有TX_LIST');
		return null;
	}
	else {
		theLogger.log('Doc object folder=' + folder + ', subfolder=' + subfolder);
	}
	
	theLogger.log('Enumerate transTargets, Folder=' + folder + ', SubFolder=' + subfolder);
	
	var _ownUserInfo = null;
	if (currentFlow.UserId.length) {
		_ownUserInfo = SSOUtil.getOrgUserInfo(orgNode, currentFlow.OUId, currentFlow.RoleId, currentFlow.UserId);
	}
	/* 紙本公文 ownUserId 為空非異常!
	 *else {
		theLogger.error('ERROR! currentFlow.UserId is a null string.');
	}*/
	
	var theOwnUser = {
		OUId : currentFlow.OUId,
		OUName : SSOUtil.getOrgUnitName(orgNode, currentFlow.OUId),
		RoleId : currentFlow.RoleId,
		RoleName : SSOUtil.getOrgRoleName(orgNode, currentFlow.OUId, currentFlow.RoleId),
		UserId : currentFlow.UserId,
		UserName : (_ownUserInfo!==null) ? _ownUserInfo.UserName : '',
	};
	console.log('Own User info: OU=(' + theOwnUser.OUName + '-' + theOwnUser.OUId +
				') Role=(' + theOwnUser.RoleName + '-' + theOwnUser.RoleId +
				') User=(' + theOwnUser.UserName + '-' + theOwnUser.UserId + ')');
	
	/* 2015.6 - 公文分文/分辦前沒有承辦人 */
	var inchargeUserInfo = null;
	if (docObj.ICOUId.length && docObj.ICUserId.length) {
		inchargeUserInfo = SSOUtil.getOrgUserInfo(orgNode, docObj.ICOUId, SYS_CONST.ROLENO_OPERATOR, docObj.ICUserId, null); //excludeRoleList);
	}
	var theInchargeUser = null;
	if (typeof inchargeUserInfo=='object' && inchargeUserInfo!==null) {
		theInchargeUser = {
			OUId: docObj.ICOUId,
			OUName: SSOUtil.getOrgUnitName(orgNode, docObj.ICOUId),
			UserId : docObj.ICUserId,
			UserName : inchargeUserInfo.UserName,
		};
		theLogger.log('Incharge User info: OU=(' + theInchargeUser.OUName + '-' + theInchargeUser.OUId +
					') User=(' + theInchargeUser.UserName + '-' + theInchargeUser.UserId + ')');
		
		
		if (!!theInchargeUser) {
			if (!theInchargeUser.UserName || (theInchargeUser.UserName.length===0)) {
				alert("-W- InchargeUserName不可為空字串!!!");
			}
		}
	}
	else if(docObj.ICOUId.length) { // 只有單位時, 取單位資訊
		theInchargeUser = {
			OUId: docObj.ICOUId,
			OUName: SSOUtil.getOrgUnitName(orgNode, docObj.ICOUId),
			UserId : '',
			UserName : '',
		};
	}

	//var _offsetStr = ['', '-', '+', '#', '*'];
	var _NCUApproveNext = 'V'; // 2016.8 - 中央大學核決用NEXT(目前尚未實作完成)
	
	var ruleCnt = menu.txList.length;
	var _theNextOptions = [];
	var s1='', s2='';
	var srcCTarget = null, finalTarget = null;
	var target = null, ruleCTarget = null;
	var trueNext='', trueTxName='', trueDisplay='';
	
	var exist = false, ruleOption = null, validNext = false;
	var displayStatus=_rule_const.MENU_ITEM_DISPLAYNONE;
	var listExcludeUnitNo = [];
	var addICOURegitser=false;
	
	// 2021.6 - 1100748 Eric
	let docApproved = (docObj.get('', 'APP_USER_ID').length || docObj.get('', 'APP_ROLE_ID').length) ? true : false;
	
	var i=0, j=0, k=0, x=0;
	for(i=0; i<ruleCnt; i++)
	{
		exist = false;
		ruleOption = menu.txList[i];
		validNext = _isValidNext(ruleOption.next);
		if (!validNext) {
			console.log('option TX_NAME=' + ruleOption.txName + ', next=' + ruleOption.next + ' IS_VALID_NEXT: ' + (validNext ? 'Y' : 'N'));
			continue;
		}

		// 2021.6 - 1100748 Eric, 批次傳送的TO_OU="V"選項, 改為[已核決]公文才能使用!
		if (ruleOption.next===_NCUApproveNext && (!_forPopupMenu || docApproved)) {
			let _modifiedRuleOption = Object.assign({}, ruleOption); // 複製一個新的ruleOption再修改, 以免異動原始menuRule內容!

			let re = /x/gi;
			_modifiedRuleOption.specialCheck = ruleOption.specialCheck.replace(re, 'A');
			ruleOption = _modifiedRuleOption;
		}
				
		// 依公文狀態篩選應使用的傳送選項
		displayStatus =_displayRuleOption(ruleOption, docObj, theInchargeUser, theOwnUser, _forPopupMenu);
		if (displayStatus==_rule_const.MENU_ITEM_DISPLAYNONE) {
			continue;	
		}
		
		theLogger.debug('列舉異動別:"' + ruleOption.txName + '" (next=' + ruleOption.next + ', offset=' + ruleOption.m_nOffset + ')項目.');
		
		/*LOG_OUT_L4(_T("-I- %s() TX_NAME=\'%s\', NEXT=\'%s\', Offset=%d[\'%s\']\n\tInchargeOU=\'%s\', OwnOUId=\'%s\'\n"),
						   _szFoo, (LPTSTR)CW2T(pRule->m_wsTX_NAME), pRule->m_strNEXT, pRule->m_nOffset,
						   (pRule->m_nOffset<cntOffset&&pRule->m_nOffset>=0)?OffsetStr[pRule->m_nOffset]:_T(""),
						   W2T(pMsg->INCHARGE_OU), W2T(pMsg->OWN_OU_ID));*/
		
		// 若TxName相同, 併入前一個
		target = null; ruleCTarget = null;
		srcCTarget = null; finalTarget = null;
		
		for(x=0; x<_theNextOptions.length; x++) {
			var _target = _theNextOptions[x];
			if (_target.txName == ruleOption.txName) {
				target = _target;
				exist = true;
				break;
			}
		}
		
		if (!exist) {
			target = {
				txName: ruleOption.txName,
				display: ruleOption.display,
				next: ruleOption.next,
				ruleOption: ruleOption,
			};
			
			if (ruleOption.m_nOffset>0) {
				switch(ruleOption.m_nOffset) {
				case _rule_const.OFFSET_RMV_CURRENT_OU: target.next += '-'; break;
				case _rule_const.OFFSET_RMV_CURR_ADD_INC: target.next += '+'; break;
				case _rule_const.FFSET_RMV_CURRENT_OU_L2: target.next += '#'; break;
				case _rule_const.OFFSET_ADD_L2_AND_L1: target.next+= '*'; break;
				}
			}
			
			target.options = [];
		}
		
		trueNext = ruleOption.next;
		trueTxName = ruleOption.txName;
		trueDisplay = ruleOption.displayName;
		if (trueNext===_NCUApproveNext) {
			// 2021.6.21 - 1100748 Eric, bug-fix (醫策會TO_OU="V")
			if (_ruleEnvSetting.SSOApproveSendTo.length===0) {
				theLogger.error('Error! _buildPDocNextOption() processs [' + folder + ']-[' + subfolder + '] NEXT="'+ ruleOption.next + '" failed, SSOApproveSendTo 設定值為空字串.');
				//delete pRet;
				return null;
			}

			// SSO_APPROVE_SEND_TO 環境參數格式 "TX_NAME@DISPLAY_NAME@TO_OU"
			var itemList = _ruleEnvSetting.SSOApproveSendTo.split('@');
			if (itemList.length!==3) 
			{
				theLogger.error('Error! _buildPDocNextOptions() processs [' + folder + ']-[' + subfolder + '] NEXT="'+ ruleOption.next + '" failed, sSSOApproveSendTo 設定值無效:"' + _ruleEnvSetting.SSOApproveSendTo + '" [格式: TX_NAME@TO_OU]');
				//delete pRet;
				return null;
			}

			trueTxName = itemList[0];
			trueDisplay = itemList[1];
			trueNext = itemList[2];
		}
		
		//target.option = ruleOption; (己於targe.ruleOption記錄)
		target.mode = displayStatus; // MENU_ITEM_ENABLE | MENU_ITEM__DISABLE
		
		listExcludeUnitNo = [];
		addICOURegitser = false;
		if (_shouldEnumTargets(trueNext, ruleOption.m_nOffset)) {
			_enumTargets(orgNode, trueNext, ruleOption.m_nOffset, theOwnUser, theInchargeUser, target, _ruleEnvSetting.underTakerRoles, _ruleEnvSetting.showUnitRoleId);
		}
		else {
			ruleCTarget = menuRule.getCTarget(ruleOption.next);
			if (ruleCTarget===null) {
				theLogger.log('-I- _buildPDocNextOptions() 未設定傳送對象項目: next="' + ruleOption.next + '". [非EnumTargets且無對應CTarget項目]');
			}
			else {
				switch(ruleOption.m_nOffset) {
				case _rule_const.OFFSET_RMV_CURRENT_OU:  {	// 1, '-'
						// 不包含"承辦單位"及"目前訊息所在單位" (一級)
						s1 = '';
						if (!!theInchargeUser && !!theInchargeUser.OUId)
							s1 = theInchargeUser.OUId;
						if (s1.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
							s1 = s1.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
						}
						listExcludeUnitNo.push(s1);
						s1 = theOwnUser.OUId;
						if (s1.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
							s1 = s1.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
						}
						listExcludeUnitNo.push(s1);
						break;
					}
				case _rule_const.OFFSET_RMV_CURR_ADD_INC:  { // 2, '+'
						s1 = '';
						if (!!theInchargeUser && !!theInchargeUser.OUId)
							s1 = theInchargeUser.OUId;
						s2 = theOwnUser.OUId;
						if (s1.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
							s1 = s1.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
						}
						if (s2.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) {
							s2 = s2.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
						}
						
						// 若"目前訊息所在一級單位"與"承辦一級單位"不同
						if (s1 != s2) {
							addICOURegitser = true;
						}
						
						listExcludeUnitNo.push(s2);
						break;
					}
				case _rule_const.OFFSET_RMV_CURR_OU_L2: { // 3, '#' 
						/* 不包含 "承辦單位" 及 "目前訊息所在單位" (二級) */
						s1 = '';
						if (!!theInchargeUser && !!theInchargeUser.OUId)
							s1 = theInchargeUser.OUId;
						s2 = theOwnUser.OUId;
						if (s1.length > SYS_CONST.FIRSTCLASS_UNITNO_LEN)
							listExcludeUnitNo.push(s1);
						if (s2.length > SYS_CONST.FIRSTCLASS_UNITNO_LEN)
							listExcludeUnitNo.push(s2);
						break;
					}
				case _rule_const.OFFSET_ADD_L2_AND_L1: { // 4, '*'
						addICOURegitser = true; // pMenuItem->m_spMsg = pMsg
						break;
					}
				}
				
				srcCTarget = ruleCTarget;
				finalTarget = {
					txName: ruleOption.txName,
					display: ruleOption.display,
					next: ruleCTarget._nextType,
					ruleOption: ruleOption,
					options: [],
				};
				
				if (srcCTarget.options.length) {
					var exclude = false, excludeUnitNo='';
					for(j=0;j<srcCTarget.options.length; j++)
					{
						var cTargetOption = srcCTarget.options[j];
						var rsltCTargetOption = null;
						if (typeof cTargetOption==='undefined' || cTargetOption===null)
							continue;
						
						if (cTargetOption._finalTarget) {
							if (listExcludeUnitNo.length && (listExcludeUnitNo.indexOf(cTargetOption.ouId)!==-1)) {
								// 不加入 finalTargets.options
								continue;
							}
							_addCTargetOption(finalTarget, cTargetOption);
						}
						else {
							if (listExcludeUnitNo.length && (listExcludeUnitNo.indexOf(cTargetOption.ouId)!==-1)) {
								exclude = true;
							}
							else {
								for(k=0; k<listExcludeUnitNo.length; k++) {
									excludeUnitNo = listExcludeUnitNo[k];
									if (excludeUnitNo.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN) { // 二級單位項目?
										if (excludeUnitNo.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN) ==
											target.OUId.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN))
										{
											rsltCTargetOption = _removeSubUnitOfCTarget(cTargetOption, excludeUnitNo);
											
											// 篩選後已無項目
											if (!rsltCTargetOption._finalTarget && rsltCTargetOption.options.length===0) {
												exclude = true;
												break;
											}
										}
									}
								}
								
								if (exclude) {
									continue;
								}
							}
							
							if (rsltCTargetOption) {
								_addCTargetOption(finalTarget, rsltCTargetOption);
							}
							else {
								_addCTargetOption(finalTarget, cTargetOption);
							}
						}
					}
				}
				
				if (finalTarget.options.length) {
					for(j=0; j<finalTarget.options.length; j++) {
						target.options.push(finalTarget.options[j]);
					}
				}
			}
		}
			
		// 2021.6 - 1100748 Eric, 下移至此
		if (ruleOption.next==_NCUApproveNext) {
			/* 列出公文核決人員清單 - Extra項目, 非<CMPMenu> items */
			let roleOnly = (_ruleEnvSetting.ODApproveType.toLowerCase()==='role') ? true : false;
			
			approveTarget = {
				txName: trueTxName,
				display: trueDisplay,
				next: trueNext,
				ruleOption: ruleOption,
				mode: displayStatus,
				options: [],
			};
			
			let _options = target.options;
			// 2021.6.21 - 1100748 Eric, TO_OU='V' implement
			if (_forPopupMenu) {
				let canApprovalRoleList = _ruleEnvSetting.MPCanApproveRole.split('|');
				if (canApprovalRoleList.length) {
					let appUserList = _enumerateApproveOfficer(docObj, canApprovalRoleList, roleOnly);
					if (Array.isArray(appUserList) && appUserList.length) {
						approveTarget.options = appUserList;
						target.extra = approveTarget;
					}
				}
				else {
					theLogger.log('-W- _buildPDocNextOptions() TO_OU="V", _ruleEnvSetting.MPCanApproveRole length=0');
					continue;
				}
			}
			else {
				// 開啟公文, 套件上方僅顯示[辦畢退回]選項
				target = approveTarget;
				target.options = _options;
			}
		}

		if (ruleOption.webPage.length) {
			target.webPage = { url: ruleOption.webPage, minus: ruleOption.webPage_Minus };
		}
		else {
			target.webPage = { url: '', minus: ruleOption.webPage_Minus};
		}
		
		if (addICOURegitser) { // 加入承辦單位登記桌
			var ICOUId = docObj.ICOUId;
			var ICOUId2 = ICOUId;
			var ownOUId = docObj.ownOUId;
			var ICOUName='', ICOUNode = null;
			var registerRoleNode, registerRoleName;
			var ICOU_Register = null;
			ICOUId = ICOUId.substring(0, SYS_CONST.FIRSTCLASS_UNITNO_LEN);
			if (ruleOption.m_nOffset==_rule_const.OFFSET_RMV_CURR_ADD_INC ||
				ruleOption.m_nOffset==_rule_const.OFFSET_ADD_L2_AND_L1) {
				ownOUId = docObj.ownOUId;
				if (ICOUId!==ownOUId) {
					/* 加入(一級)承辦單位登記桌 */
					ICOUNode = _getUnitNode(orgNode, ICOUId);
					if (!!ICOUNode) {
						ICOUName = SSOUtil.xml_getChildNodeValue(ICOUNode, 'UnitName');
						registerRoleNode = _getRoleNode(ICOUNode, SYS_CONST.ROLENO_REGISTER);
						if (!!registerRoleNode) {
							registerRoleName = SSOUtil.xml_getChildNodeValue(registerRoleNode, 'RoleName');
						}
					}
					
					ICOU_Register = {
						toOU: target.next,
						finalTarget: true,
						toOUId: ICOUId,
						toOUName: ICOUName,
						toRoleId: SYS_CONST.ROLENO_REGISTER,
						toRoleName: registerRoleName,
						toUserId: '', toUserName: '',
					};
					target.options.push(ICOU_Register);
				}
			}
			
			if (ICOUId2.length>SYS_CONST.FIRSTCLASS_UNITNO_LEN &&
				ruleOption.m_nOffset==_rule_const.OFFSET_ADD_L2_AND_L1) {
				if (ICOUId!==ownOUId) {
					/* 加入(二級)承辦單位登記桌 */
					ICOUNode = _getUnitNode(orgNode, ICOUId2);
					if (!!unitNode) {
						ICOUName = SSOUtil.xml_getChildNodeValue(ICOUNode, 'UnitName');
						registerRoleNode = _getRoleNode(ICOUNode, SYS_CONST.ROLENO_REGISTER);
						if (!!registerRoleNode) {
							registerRoleName = SSOUtil.xml_getChildNodeValue(registerRoleNode, 'RoleName');
						}
					}
					ICOU_Register = {
						toOU: target.next,
						finalTarget: true,
						toOUId: ICOUId,
						toOUName: ICOUName,
						toRoleId: SYS_CONST.ROLENO_REGISTER,
						toRoleName: registerRoleName,
						toUserId: '', toUserName: '',
					};
					target.options.push(ICOU_Register);
				}
			}
		} // End of - if (addICOURegitser)
		
		/* ToDo: 尚未處理NCUApproveOfficer */
		
		// 沒有傳送對象時, 直接將異動別設為finalTarget!
		var fAdd = false;
		if (target.options.length>0) {
			target.finalTarget = false;
			fAdd = true;
		}
		else {
			target.finalTarget = true;
			fAdd = true;
		}
		
		if (!exist && fAdd) {
			_theNextOptions.push(target);
		}
	} // End of ruleOption process
	
	return _theNextOptions;
} /* End of _buildPDocNextOptions */