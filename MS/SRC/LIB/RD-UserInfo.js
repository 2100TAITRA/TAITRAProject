(function($){
    var sso = window.theSSO;
	if (typeof window.theSSO.User === 'undefined') {
		sso.User = {};
	}
	
	if (typeof sso.User.EnvSettings === 'undefined')	{
		sso.User.EnvSettings = {
			get : function(envName) {
					var value = this[envName];
					if (typeof value === 'undefined' || value===null) {
						value = '';
					}
					return value;
			}
		};
	}
	
	if (typeof sso.User.SystemSets === 'undefined')	{
		sso.User.SystemSets = {
			get : function(envName) {
					var value = this[envName];
					if (typeof value === 'undefined') {
						value = '';
					}
					return value;
			}
		};
	}
	
	/* 2021.5.3 - 1100333 Eric, merge: 2020.5.19 - 1090329 Eric
	 * 轉換JSON_Object. (parse User info 用)
	 * 
	 * 參數:
	 *  xmlNode: [in] xml node to be convert
	 *  fieldnames: [in] 要轉換的屬性清單
	 *  obj: [out] target object
	 *  attrs: [out] target object's attribute list.
	 */
	function convertJSONObj(srcObj, fieldnames, targetObj, attrs)
	{
		if (!fieldnames || !attrs) {
			return false;
		}
		
		if (fieldnames.length != attrs.length) {
			return false;
		}
		
		for(var i=0; i<fieldnames.length; i++) {
			var fieldname = fieldnames[i];
			var value = srcObj[fieldname];
			targetObj[attrs[i]] = value;
		}	
	}

	// 新增函式至 SSOUtil
	SSOUtil.parseUserInfo = function(User, rslt)
	{
		//1050719 Kevin 增加取得帳號以及所屬機關
		//var fieldnames = ['m_Name', 'm_Birthday', 'm_Email', 'm_Title', 'm_Sex'];
		//var objAttrs = ['name', 'birthday', 'email', 'title', 'sex'];
		var fieldnames = ['m_Name', 'm_Birthday', 'm_Email', 'm_Title', 'm_Sex', 'm_Account', 'm_SourceOrgNo'];
		var objAttrs = ['name', 'birthday', 'email', 'title', 'sex', 'account', 'orgid'];
		SSOUtil.convertXMLNodeToObj(rslt, fieldnames, User, objAttrs);
	};

	// 2021.5.3 - 1100333 Eric, merge: 2020.5.19 - 1090329 Eric
	SSOUtil.parseUserInfo2 = function(User, rslt)
	{
		var fieldnames = ['m_Name', 'm_Birthday', 'm_Email', 'm_Title', 'm_Sex', 'm_Account', 'm_SourceOrgNo', 'OrgNickName'];
		var objAttrs = ['name', 'birthday', 'email', 'title', 'sex', 'account', 'orgid', 'OrgNickName'];
		convertJSONObj(rslt.AD_Account, fieldnames, User, objAttrs);
	};
	
	SSOUtil.parsePlayRoles = function(playRoles, rslt)
	{
		var fieldnames = [ 'm_Name', 'm_RoleNo', 'm_SuperiorUnit', 'm_SourceOrgNo', 'm_ProxyAccount', 'm_ProxyUserName'];
		var objAttrs = ['name', 'id', 'unitNo', 'orgNo', 'proxyAccount', 'proxyUserName'];
		
		// 清除原有內容
		while(playRoles.length) {
			playRoles.pop();
		}
		
		// xnl: xmlNodeList, xn: xmlNode
		var playRoles_xnl = $('m_PlayRoles', rslt);
		if (playRoles_xnl.length) {
			var playRoles_xn = playRoles_xnl[0];
			
			var roles_xnl = $('Role', playRoles_xn);
			for(var i=0; i<roles_xnl.length; i++)
			{
				var role_xn = roles_xnl[i];
				var role = {};
				SSOUtil.convertXMLNodeToObj(role_xn, fieldnames, role, objAttrs);
				playRoles.push(role);
			}
		}
	}

	// 2021.5.3 - 1100333 Eric, merge: 2020.5.19 - 1090329 Eric
	SSOUtil.parsePlayRoles2 = function(playRoles, rslt)
	{
        // 2023.4.17 - 1120067 Eric, 新增[是否一併代理]選項, 以決定切換代理角色時顯示的代理公文項目
        // new fieldname = m_IsJointProxy
		var fieldnames = [ 'm_Name', 'm_RoleNo', 'm_SuperiorUnit', 'm_SourceOrgNo', 'm_ProxyAccount', 'm_ProxyUserName'];
		var objAttrs = ['name', 'id', 'unitNo', 'orgNo', 'proxyAccount', 'proxyUserName'];
		
		// 清除原有內容
		while(playRoles.length) {
			playRoles.pop();
		}
		
		// xnl: xmlNodeList, xn: xmlNode
		var roles = rslt.AD_Account.m_PlayRoles.Role;
		if (Array.isArray(roles)) {
			for(var i=0; i<roles.length; i++) {
				var role_raw = roles[i];
				let roleItem = {};
				convertJSONObj(role_raw, fieldnames, roleItem, objAttrs);

                // 2023.4.17 - 1120067 Eric, 新增[是否一併代理]選項
                let isJointProxy = false;
                if (roleItem.proxyAccount.length) {
                    if (typeof role_raw.m_IsJointProxy=='string' && role_raw.m_IsJointProxy.length && SSOUtil.isValueTrue(role_raw.m_IsJointProxy)) {
                        isJointProxy = true;
                    }
                }
                roleItem.isJointProxy = isJointProxy;
				playRoles.push(roleItem);
			}
		}
		else if (typeof roles!=='undefined' && roles!==null) {
			let roleItem = {};
			convertJSONObj(roles, fieldnames, roleItem, objAttrs);

            // 2023.4.17 - 1120067 Eric, 新增[是否一併代理]選項
            let isJointProxy = false;
            if (roleItem.proxyAccount.length) {
                if (typeof role_raw.m_IsJointProxy=='string' && role_raw.m_IsJointProxy.length && SSOUtil.isValueTrue(role_raw.m_IsJointProxy)) {
                    isJointProxy = true;
                }
            }
            roleItem.isJointProxy = isJointProxy;
			playRoles.push(roleItem);
		}
	};
	
	// 2015.2 - 讀取鏈結憑證資訊!
	SSOUtil.parseUserCerts = function(certs, rslt)
	{
		// 清除原有內容
		while(certs.length) {
			certs.pop();
		}
		
		// xnl: xmlNodeList, xn: xmlNode
		var certs_xnl = $('m_Certificates m_Cert', rslt);
		var i=0, length = certs_xnl.length;
		for(i=0; i<length;i++) {
			var cert_xn = certs_xnl[i];
			
			var _tempCert = ($(cert_xn).attr('tempCert')==='true') ? true : false;
			var _softCert = ($(cert_xn).attr('softCert')==='true') ? true : false;
			//1140610	Leslie[1131183]	[Merge]新增取得行動自然人憑證註記[1110117]
			var _isFido = ($(cert_xn).attr('isFido')==='true') ? true : false;
			var _base64Cert = $(cert_xn).contents().eq(0).text();
			var cert = {
				tempCert: _tempCert,
				softCert: _softCert,
				//1140610	Leslie[1131183]	[Merge]新增取得行動自然人憑證註記[1110117]
				isFido: _isFido,
				base64: _base64Cert
			};
			certs.push(cert);
		}
	}
	
	// 2021.5.3 - 1100333 Eric, merge: 2020.5.19 - 1090329 Eric
	SSOUtil.parseUserCerts2 = function(certs, rslt)
	{
		// 清除原有內容
		while(certs.length) {
			certs.pop();
		}

		if (typeof rslt.AD_Account.m_Certificates=='string' && rslt.AD_Account.m_Certificates.length==0) {
			return;
		}
		
		// xnl: xmlNodeList, xn: xmlNode
		var certs_xnl = rslt.AD_Account.m_Certificates.m_Cert;
		if (Array.isArray(certs_xnl)) { // multiple objects.
			for(i=0; i<certs_xnl.length;i++) {
				var cert_xn = certs_xnl[i];
				
				if (typeof cert_xn=='string' && cert_xn.length) { // string item
					certs.push({ 
						tempCert: false,
						softCert: false,
						//1140610	Leslie[1131183]	[Merge]新增取得行動自然人憑證註記[1110117]
						isFido: false,
						base64: cert_xn});
				}
				else { // object item
					var _tempCert = SSOUtil.isValueTrue(cert_xn['@tempCert']);
					var _softCert = SSOUtil.isValueTrue(cert_xn['@softCert']);
					//1140610	Leslie[1131183]	[Merge]新增取得行動自然人憑證註記[1110117]
					var _isFido = SSOUtil.isValueTrue(cert_xn['@isFido']);
					var _base64Cert = cert_xn['#text'];
					var cert = {
						tempCert: _tempCert,
						softCert: _softCert,
						//1140610	Leslie[1131183]	[Merge]新增取得行動自然人憑證註記[1110117]
						isFido: _isFido,
						base64: _base64Cert
					};
					certs.push(cert);
				}
			}
		}
		else if (typeof certs_xnl=='string' && certs_xnl.length) { // single, string,  // 2020.5.21 - typo fix
			certs.push({ 
				tempCert: false,
				softCert: false,
				//1140610	Leslie[1131183]	[Merge]新增取得行動自然人憑證註記[1110117]
				isFido: false,
				base64: certs_xnl}); // 2020.5.21 - typo fix
		}
		else { // single, obect
			var _tempCert = SSOUtil.isValueTrue(certs_xnl['@tempCert']);
			var _softCert = SSOUtil.isValueTrue(certs_xnl['@softCert']);
			//1140610	Leslie[1131183]	[Merge]新增取得行動自然人憑證註記[1110117]
			var _isFido = SSOUtil.isValueTrue(certs_xnl['@isFido']);
			var _base64Cert = certs_xnl['#text'];
			var cert = {
				tempCert: _tempCert,
				softCert: _softCert,
				//1140610	Leslie[1131183]	[Merge]新增取得行動自然人憑證註記[1110117]
				isFido: _isFido,
				base64: _base64Cert
			};
			certs.push(cert);
		}
	};

	SSOUtil.initSystemSettings = function(envSettings, systemSets, rslt, noAlert) // 2020.7.9 - 1090390 Eric, add noAlert for SubmitDocPage.
	{
		noAlert = (typeof noAlert=='boolean')?noAlert:false;

		var accountName = 'AD_Account';
		
		var listName = 'm_EnvSettings';
		var nodeName = 'm_EnvSetting';
		var envSetName = 'EnvSettingName';
		var envSetValue = 'EnvSettingValue';
		
		var syslistName = 'm_SystemSets';
		var sysNodeName = 'm_SystemSet';
		var sysSetName = 'SystemSetsName';
		var sysSetValue = 'SystemSetsValue';
		
		// rslt = <AD_Account>
		// <AD_Account>/<m_EnvSettings>/<m_EnvSetting>
		if (rslt.nodeName!=accountName) {
			// 2020.7.9 - 1090390 Eric, add noAlert for SubmitDocPage.
			if (!noAlert) {
				alert('Invalide xml content rslt nodeName=' + rslt.nodeName);
			}
			else {
				console.warn('ERROR! SSOUtil.initSystemSettings() Invalide xml content rslt nodeName=' + rslt.nodeName)
			}
			return false;
		}
		
		var envSets_xnl = $(accountName + '> ' + listName, rslt);
		if (envSets_xnl.length) {
			var envSets_xn = envSets_xnl[0];
			
			var envSet_xnl = $(nodeName, envSets_xn);
			var cnt = envSet_xnl.length
			for(var i=0; i<cnt; i++) {
				var envSet_xn = envSet_xnl[i];
				var name = SSOUtil.xml_getChildNodeValue(envSet_xn, envSetName);
				var value = SSOUtil.xml_getChildNodeValue(envSet_xn, envSetValue);
				if (name.length) {
					envSettings[name] = value;
				}
			}
		}
		
		var sysSets_xnl = $(accountName + '> ' + syslistName, rslt);
		if (sysSets_xnl.length) {
			var sysSets_xn = sysSets_xnl[0];
			
			var sysSet_xnl = $(sysNodeName, sysSets_xn);
			var cnt = sysSet_xnl.length
			for(var i=0; i<cnt; i++) {
				var sysSet_xn = sysSet_xnl[i];
				var name = SSOUtil.xml_getChildNodeValue(sysSet_xn, sysSetName);
				var value = SSOUtil.xml_getChildNodeValue(sysSet_xn, sysSetValue);
				if (name.length) {
					systemSets[name] = value;
				}
			}
		}
		
		return true;
	}

	// 2021.5.13 - add noAlert for DocSubmitPage
	// 2021.5.3 - 1100333 Eric, merge: 2020.5.19 - 1090329 Eric
	SSOUtil.initSystemSettings2 = function(envSettings, systemSets, rslt, noAlert)
	{
		var envSetName = 'EnvSettingName';
		var envSetValue = 'EnvSettingValue';
		
		var sysSetName = 'SystemSetsName';
		var sysSetValue = 'SystemSetsValue';
		
		// rslt = <AD_Account>
		// <AD_Account>/<m_EnvSettings>/<m_EnvSetting>
		if (typeof rslt.AD_Account=='undefined' || rslt.AD_Account===null) {
			if (noAlert) {
				alert('Invalide rslt.AD_Account');
			}
			else {
				console.warn('ERROR! SSOUtil.initSystemSettings2() Invalide rslt.AD_Account.');
			}
			return false;
		}
		
		var envSets_rawlist = rslt.AD_Account.m_EnvSettings.m_EnvSetting;
		if (envSets_rawlist.length) {
			let cnt = envSets_rawlist.length;
			for(var i=0; i<cnt; i++) {
				var envSet_raw = envSets_rawlist[i];
				var name = envSet_raw[envSetName];
				var value = envSet_raw[envSetValue];
				if (name.length) {
					envSettings[name] = value;
				}
			}
		}
		
		var sysSets_rawlist = rslt.AD_Account.m_SystemSets.m_SystemSet;
		if (sysSets_rawlist.length) {
			let cnt = sysSets_rawlist.length;
			for(var i=0; i<cnt; i++) {
				var sysSet_raw = sysSets_rawlist[i];
				var name = sysSet_raw[sysSetName];
				var value = sysSet_raw[sysSetValue];
				if (name.length) {
					systemSets[name] = value;
				}
			}
		}
		return true;
	};

	// 2023.8.28 - 1120750 Leslie	配合組改，增加機關代碼對照
	if (typeof window.theSSO.OrgMap === 'undefined') {
		sso.OrgMap = {};
	}
	SSOUtil.initOrgMap = function(OrgMap, rslt){
		const oldOrgProp = "OLD_ORGNO";
		const newOrgProp = "NEW_ORGNO";
		var orgMap_rawlist = rslt.AD_Account.m_OrgMap.Org;
		if (orgMap_rawlist.length) {
			let cnt = orgMap_rawlist.length;
			for(var i=0; i<cnt; i++) {
				var org_raw = orgMap_rawlist[i];
				var name = org_raw[oldOrgProp];
				var value = org_raw[newOrgProp];
				if (name.length) {
					OrgMap[name] = value;
				}
			}
		}
		//1120912	Leslie[序193]	增修當只有一個機關時，rslt.AD_Account.m_OrgMap.Org會只是一個物件(非陣列)
		else{
			var name = rslt.AD_Account.m_OrgMap.Org[oldOrgProp];
			var value = rslt.AD_Account.m_OrgMap.Org[newOrgProp];
			OrgMap[name] = value;
		}
	}
})(jQuery);

