/*
DATE		SA		PRG		MGR_NO		DESC
1051028		David	David	1050087		新增二代批次傳送功能
1060726		David	David	-------		修正for迴圈內變數未宣告，導致程式異常問題
1061106		David	David	1060992		支援OD_APPROVE_TYPE設定為ALL及USER的行為
1070830     Kevin   Justin  1070678     弱掃AJAX修改
1070904		Kevin	Justin	1070678		弱掃修正CookieHttpOnly
1071008		David	David	-------		修正設定功能中，若二級單位未選擇時，不取二級單位資訊
1071026		David	David	-------		修正設定角色清單預設值判斷
1110120		David	Joe		1101393		新增設定並傳送鍵
1120727     Joe     Joe     序134       修正每次輸入都檢查文號的問題
1120821		Joe     Joe		序151		onblur後focus回文號
1121025		David	David	-------		(各機關問題彙整表序286)一併設定流程後，更新勾選筆數
1121109		David	Joe		序306		修正傳送後須解鎖Textbox欄位
1121218		David	Joe		序343		調整傳送後取消勾選，並鎖定選項
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1070830 Justin [1070678]弱掃AJAX修改
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
//紀錄Call WebService物件的id
var wsDuplicateID;

var bMPShowCls = document.all.MP_BATCHSUBMIT_SHOW_CLS.value;
var bEnableKeepYear = document.all.OD_ODC010_KEEPYEAR_ENABLE.value;
var bMPShowFileCase = document.all.MP_BATCHSUBMIT_SHOW_FILECASE.value;
var bShowSubUnit = document.all.OD_BATCHSUBMIT_SHOW_SUBUNIT.value;
var bInitValue = document.all.MP_BATCHSUBMIT_INIT_VALUE.value;
var bInitRoleID = document.all.MP_BATCHSUBMIT_INIT_ROLEID.value;
var bEnableUnitFile = document.all.OD_ENABLE_UNITFILE.value;
var bMpBatchSubmitReject = document.all.MP_BATCHSUBMIT_REJECT.value;
var bObApproveType = document.all.OD_APPROVE_TYPE.value;
var bmpBatchSubmitCheckFiling = document.all.MP_BATCHSUBMIT_CHECK_FILING.value;
var bCheckMeetDateBTypeNo = document.all.OD_CHECKMEETDATE_BTYPENO.value;

var MODE_TRAN = "MODETRAN";
var MODE_TRAN_INCHARGE = "INCH";
var MODE_TRAN_CUSTOM = "CUSTOM";
var MODE_TRAN_REJECT = "REJECT";
var MODE_FILE_ORG = "ORG";
var MODE_FILE_UNIT = "UNIT";

var gClose = false;
var gSubmiting = false;
var menuRule;
var orgNode;

//1110411	Joe		--		自測Bug修正
//document.all.CheckSendCount.textContent = "0";

var gCheckSendIndexList = "";
var gCheckSetIndexList = "";
var gReadyToCheckIdx = "";

if (typeof theSSO == 'object') {
	var _defaultOrgNo = '';

	/* 分析ODMSSP.GetUserInfo的回傳內容 */
	theSSO.parseAccountInfo = function (User, rslt) {
		var fieldnames = ['m_Name', 'm_Birthday', 'm_Email', 'm_Title', 'm_Sex', 'm_Account', 'm_SourceOrgNo'];
		var objAttrs = ['name', 'birthday', 'email', 'title', 'sex', 'account', 'orgid'];
		SSOUtil.convertXMLNodeToObj(rslt, fieldnames, User, objAttrs);
	};

	theSSO.invokeGetUserInfoWS = function (artifact, options) {
		var _dfd = $.Deferred();

		var wsUrl = (options && options.url) ? options.url : ''; //SSO_CONFIG.getWSUrl('samlws');
		if (!wsUrl || wsUrl.length === 0) {
			theLogger.error('-E- SAMLWS.getUserInfoForPad was invoked, but WS\'s url was missing!');
			_dfd.reject(new Error('SAMLWS尚未設定服務網址URL'));
			return _dfd.promise();
		}

		var async = false;
		if (options && (typeof options.async !== 'undefined') && (options.async === true)) {
			async = true;
		}

		var params = new SOAPClientParameters();
		params.add("argArtifact", artifact);

		// SOAPClient.invoke() params:
		//   url, method name, method parameter values,
		//   call mode (async=true, sync=false), callback method
		SOAPClient.invoke(wsUrl, 'GetUserInfoForPad', params, async,
							function (r) {
								theLogger.log('-I- SAMLWS.getUserInfoForPad returns:');
								theLogger.log(r);
								if (typeof r !== 'object') {
									_dfd.reject({ errMsg: '回傳之UserInfo內容異常!' });
								}
								else {
									_dfd.resolve(r);
								}
							});
		return _dfd.promise();
	};

	/*分析ODMSSP.GetUserInfo的回傳內容*/
	theSSO.parseUserInfo = function (SAMLart, rslt) {
		var _dfd = $.Deferred();

		if (typeof rslt === 'object') {
			// parser user info into theSSO.User object
			if (!!window.theSSO) {
				window.theSSO.RawUser = rslt;
			}

			if (!window.theSSO.User) {
				_dfd.reject(new Error('@mLogin.js:_parseUserInfo(), window.theSSO.User is invalid!'));
				return _dfd.promise();
			}

			theSSO._dbgAlert('gonna SSOUtil.parseUserInfo() ...');

			// parse user data (個人基資)
			SSOUtil.parseUserInfo(window.theSSO.User, rslt);

			// parse play roles
			if (!window.theSSO.User.PlayRoles) {
				window.theSSO.User.PlayRoles = [];
			}
			SSOUtil.parsePlayRoles(window.theSSO.User.PlayRoles, rslt);

			// parse linked cert(s) [2015.2]
			if (!window.theSSO.User.Certs) {
				window.theSSO.User.Certs = [];
			}
			SSOUtil.parseUserCerts(window.theSSO.User.Certs, rslt);

			// parse EnvSets
			if (!window.theSSO.User.EnvSettings) {
				theLogger.error('-ERR- theSSO.User.EnvSettings not defined...');
			}
			else {
				SSOUtil.initSystemSettings(window.theSSO.User.EnvSettings, window.theSSO.User.SystemSets, rslt);
			}
		}

		theSSO.User.activeRoleIndex = 0;

		theLogger.log('EOF theSSO.parseUserInfo().');

		_dfd.resolve();
		return _dfd.promise();
	};

	theSSO.setDefaultOrgNo = function (orgNo) {
		_defaultOrgNo = orgNo;
	};

	theSSO.getDefaultOrgNo = function () {
		return _defaultOrgNo;
	};

	/* 系統設定檔及資源檔在Server的存放位置 (Ex. MenuRuleE_XXX.XML, OrgInfo_XXX.XML)
	 *  =>舊版為Client端檔案, 新版改成由Server直接下載使用
	 */
	theSSO.getRsrcServerPath = function (subDir, orgNo) {
		var rsrcRootPath = theSSO.User.SystemSets.SYS_RSRC_PATH;
		if (typeof rsrcRootPath !== 'string') {
			rsrcRootPath = '';
			return;
		}

		var realDir = subDir.replace(/^\/|\/$/g, ''); // 去除字串前,後的'/'及'\'字元
		var dir = '';

		var _IISystemMode = theSSO.User.SystemSets.IISystemMode;
		if (typeof _IISystemMode == 'string' && _IISystemMode.length) {
			_IISystemMode = _IISystemMode.toLowerCase();
		}
		if (_IISystemMode === 'normal') {
			// Normal架構一律找defaultOrgNo子目錄
			if ((typeof orgNo === 'string') && orgNo.length) {
				dir = rsrcRootPath + '\\' + _defaultOrgNo; // 與機關相關->在$OrgNo$子目錄內
			}
			else {
				dir = rsrcRootPath + '\\DEFAULT'; // 與機關無關->在DEFAULT子目錄內
			}
		}
		else {
			// ASP架構才會有orgNo子目錄
			if ((typeof orgNo === 'string') && orgNo.length) {
				dir = rsrcRootPath + '\\' + orgNo; // 與機關相關->在$OrgNo$子目錄內
			}
			else {
				dir = rsrcRootPath + '\\DEFAULT'; // 與機關無關->在DEFAULT子目錄內
			}
		}

		if (realDir.length) {
			return dir + '\\' + realDir;
		}
		return dir;
	};
}

if (typeof SSOUtil.getMenuRule_Obj == 'undefined') {
	if (typeof theSSO.menuRuleAOL == 'undefined' || theSSO.menuRuleAOL === null) {
		theSSO.menuRuleAOL = [];
		theSSO.menuRulePDoc = []; // 2016.6
	}

	/* 取得 MenuRule Object (MenuRuleAOL / MenuRulePDoc) */
	SSOUtil.getMenuRule_Obj = function (artifact, orgNo, signType, options) {
		var menuRule = null, menuRuleT = null, arrMenuRule = null;
		if (signType == 'E') {
			arrMenuRule = theSSO.menuRuleAOL;
		}
		else {
			arrMenuRule = theSSO.menuRulePDoc;
		}

		for (var i = 0; i < arrMenuRule.length; i++) {
			menuRuleT = arrMenuRule[i];
			if (menuRuleT.orgNo == orgNo) {
				menuRule = menuRuleT;
				break;
			}
		}

		if (menuRule === null) {
			if (signType == 'E') {
				//menuRule = new MenuRuleAOL(artifact, orgNo);
				//theSSO.menuRuleAOL.push(menuRule);
			}
			else if (signType == 'P') {
				menuRule = new MenuRulePDoc(artifact, orgNo, options);
				theSSO.menuRulePDoc.push(menuRule);
			}
		}
		return menuRule;
	};
}

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
	theSSO.resetUserAndOrgData();

	_getUserInfo(document.all.SsoArtifact.value)
		.then(function(){
			//alert('DONE!');
			menuRule = SSOUtil.getMenuRule_Obj(document.all.SsoArtifact.value, document.all.OrgNo.value, "P", {url:theSSO.WSServerHost + '/WebFileIO/T2100FileIoService.asmx'});
			orgNode = SSOUtil.getOrgNode(document.all.OrgNo.value);
		})
		.fail(function(rslt){
			alert('取得使用者資訊失敗，FAILE!');
		});

	if(bMPShowCls.toUpperCase() == "Y")
	{
		document.all.txClsNo.style.display = "";
		document.all.lbClsNo.style.display = "";
		document.all.txClsNo.readOnly = false;
		//document.all.ibtClsNo.style.display = "";

		//加上分類號及保存年限欄位	
		if(bEnableKeepYear.toUpperCase() == "N")
		{
			document.all.txKeepYear.readOnly = true;
			document.all.txKeepYear.style.backgroundColor = "LightGrey";
		}
		document.all.txKeepYear.style.display = "";
		document.all.lbKeepYear.style.display = "";

		//紀錄是否顯示案次號欄位
		if(bMPShowFileCase.toUpperCase() == "Y")
		{
			document.all.lbFileCase.style.display = "";
			document.all.txFileCase.style.display = "";
			//document.all.ibtFileCase.style.display = "";
			document.all.lbFileYear.style.display = "";
			document.all.txFileYear.style.display = "";
		}
		else
		{
			document.all.lbFileCase.style.display = "none";
			document.all.txFileCase.style.display = "none";
			//document.all.ibtFileCase.style.display = "none";
			document.all.lbFileYear.style.display = "none";
			document.all.txFileYear.style.display = "none";
		}
	}
	else
	{
		document.all.txClsNo.style.display = "none";	
		document.all.lbClsNo.style.display = "none";
		//document.all.ibtClsNo.style.display = "none";

		document.all.txKeepYear.style.display = "none";
		document.all.lbKeepYear.style.display = "none";

		document.all.lbFileCase.style.display = "none";
		document.all.txFileCase.style.display = "none";
		//document.all.ibtFileCase.style.display = "none";
		document.all.lbFileYear.style.display = "none";
		document.all.txFileYear.style.display = "none";

		bMPShowFileCase = "N";
	}

	if(jf_ReadCookie("MODE_TRAN")==MODE_TRAN_INCHARGE)
		fnTranSelect(document.all.rbInchargeOu);
	else if(jf_ReadCookie("MODE_TRAN")==MODE_TRAN_REJECT)
		fnTranSelect(document.all.rbRejectOu);
	else
		fnTranSelect(document.all.rbCustomOu);

	if(bEnableUnitFile == "Y")
	{
		document.all.rbOrgStore.disabled=false;
		document.all.rbUnitStore.disabled=false;
	}
	else
	{
		document.all.rbOrgStore.checked=true;
		document.all.rbUnitStore.checked=false;
		document.all.rbOrgStore.disabled=true;
		document.all.rbUnitStore.disabled=true;
	}
	if(bMpBatchSubmitReject == "Y")
		document.all.trReject.style.display = "";
	else
		document.all.trReject.style.display = "none";

	fnStoreSelect(document.all.rbOrgStore);

	fnUnitChange(false);
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
	   return;
	
	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}
	
	switch (xObjectName)
	{
		/*
		case "":
			break;
		*/
	}
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(event)
{
	var xObjectName;
	var evBtn;

	if(IsServerHandling)
	   return;

	//檢查是否TimeOut
	if(jf_IsTimeOut())
	{
		Page_BlockSubmit=true;
		return;
	}

	xObjectName = event.target.id;

	switch (xObjectName)
	{
		case "DVDTEST":
			alert("DVDTEST");
			break;
		case "btSubFolder":
			//Page_BlockSubmit = true;
			break;
		case "btSet":
			Page_BlockSubmit = true;
			if(fnGetCheckNum("MODIFY"))
			{
				fnSetInfo();
				fnCheckForSet("MODIFY");
				
				//將由"設定"轉勾選至"傳送"的INDEX依紀錄順序設定至gCheckSendIndexList內
				var arrAddToSend = gCheckSetIndexList.split(';');
				for( var i = 0 ; i < arrAddToSend.length ; i++)
				{
					if(gReadyToCheckIdx.indexOf(";" + arrAddToSend[i] + ";") != -1)
					{
						AddDocIndex(arrAddToSend[i],"1");
					}
				}
				gReadyToCheckIdx = "";
				gCheckSetIndexList = "";
				SetSendCount();//1121025 David 設定流程後，更新勾選筆數
			}			
			break;
		case "btClean":
			Page_BlockSubmit = true;
			break;
		case "btTransfer":
			Page_BlockSubmit = true;
			//測試
			//alert("依此順序:"+gCheckSendIndexList+" 進行傳送");return;

			if(gSubmiting==true)
			{
				alert('傳送中,請稍後!');
				break;
			}
			if(fnGetCheckNum("TRAN") && fnCheckForSet("TRAN"))
			{
				gSubmiting=true;
				fnSubmit();
			}
			break;
			//1110120	Joe		1101393		新增設定並傳送鍵--S
		case "btSetTransfer":
			Page_BlockSubmit = true;
			if(fnGetCheckNum("MODIFY"))
			{
				fnSetInfo();
				fnCheckForSet("MODIFY");
				
				//將由"設定"轉勾選至"傳送"的INDEX依紀錄順序設定至gCheckSendIndexList內
				var arrAddToSend = gCheckSetIndexList.split(';');
				for( var i = 0 ; i < arrAddToSend.length ; i++)
				{
					if(gReadyToCheckIdx.indexOf(";" + arrAddToSend[i] + ";") != -1)
					{
						AddDocIndex(arrAddToSend[i],"1");
					}
				}
				gReadyToCheckIdx = "";
				gCheckSetIndexList = "";
				
				if(gSubmiting==true)
				{
					alert('傳送中,請稍後!');
					break;
				}
				if(fnGetCheckNum("TRAN") && fnCheckForSet("TRAN"))
				{
					gSubmiting=true;
					fnSubmit();
				}
			}			
			break;
			//1110120	Joe		1101393		新增設定並傳送鍵--E

		//以下屬於DataGrid ToolBar
		case "btAll":
			Page_BlockSubmit = true;
			jf_SelectAll("dg1", "_cbDgSet");
			
			//勾選所有的"設定"時，重新紀錄公文勾選"設定"INDEX順序
			gCheckSetIndexList = "";

			for(var i = 2; i <= document.all.dg1.rows.length; i++)
			{
				//勾選所有的"設定"時，重新紀錄公文勾選"設定"INDEX順序
				if(gCheckSetIndexList != "")
					gCheckSetIndexList += ";";
				gCheckSetIndexList += i;
			}

			break;
		case "btChange":
			Page_BlockSubmit = true;
			for(var i = 2; i <= document.all.dg1.rows.length; i++)
			{
				if(document.all["dg1__ctl" + i + "_cbDgSet"].checked)
				{
					document.all["dg1__ctl" + i + "_cbDgSet"].checked = false;
					//取消勾選時於紀錄清單中移除
					CancelDocIndex(i,"2");
				}
				//1121218	Joe		序343	鎖定時不會選取
				// else
				else if(document.all["dg1__ctl" + i + "_cbDgSet"].disabled == false)
				{
					document.all["dg1__ctl" + i + "_cbDgSet"].checked = true;

					//勾選時加入紀錄清單中
					AddDocIndex(i,"2");
				}
			}
			
			break;
		case "btClear":
			Page_BlockSubmit = true;
			jf_SelectClear("dg1", "_cbDgSet");

			//取消勾選所有的"設定"時，清空已紀錄的公文勾選"設定"INDEX順序
			gCheckSetIndexList = "";
			break;
		case "btDocNo2":
			Page_BlockSubmit = true;
			fnCheckDoc();
			break;
	}
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
	/*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/

	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{
    /*
	try
	{
	    opener.document.all.lbReturnValue.length = 3;
	    opener.document.all.lbReturnValue.options[0].value = argLink;
	    opener.document.all.lbReturnValue.options[1].value = argRead1;
	    opener.document.all.lbReturnValue.options[2].value = argRead2;
	    opener.window.CallBack("SII020");
	    close();
	}
	catch (e) {}
    */
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function _getUserInfo(SAMLart)
{
	var _dfd = $.Deferred();
	theSSO.invokeGetUserInfoWS(SAMLart, {url:theSSO.WSServerHost + '/IIWS/SAML.asmx'})
	.then(function(rslt) {
		if (typeof _debugTime ==='boolean' && _debugTime===true) {
			SSOUtil.dev_logTimeElapse('SAMLWS.getUserInfoForPad', tmSecBegin);
		}
		return theSSO.parseUserInfo(SAMLart, rslt);
	})
	.then(function() {
		theLogger.log('-I- _getUserInfo() done.');
		
		theSSO.setDefaultOrgNo(theSSO.User.orgid);
		_dfd.resolve({success:true});
	})
	.fail(function(){
		theLogger.error('ERROR! _getUserInfo() failed.');
		_dfd.reject({success:false, errMsg:'invoke _getUserInfo() failed.'});
		delete theSSO.User;
	});
	return _dfd.promise();
}

function fnDelOptions(argObj)
{
	for(var i=argObj.options.length-1;i>-1;i--)
		argObj.options.remove(i);
}

function fnDelOptions(argObj)
{
	var idx = argObj.options.length;
	for(var i=idx-1;i>=0;i--)
	{
		argObj.options.remove(i);
	}
}

//依照環境變數帶出預設角色
var SF,UN,RI,AP,IT;

function fnUnitChange(argCheck)
{
	if(argCheck)
	{
		fnTranSelect(document.all.rbCustomOu);
	}
	var nSum = "";
	var idx	= document.all.ddlFlowUnit.selectedIndex;
	var unitNo = document.all.ddlFlowUnit[idx].value;
	var bGetSub = true;

	if (bShowSubUnit == "Y")
	{
		bGetSub = false;
		var HasSub = 0;
		document.all.trFlowSubUnit.className = "";

		fnDelOptions(document.all.ddlFlowSubUnit);
		fnAddOption(document.all.ddlFlowSubUnit, "", "");

		//取得二級單位資訊
		for(var iSub = 0 ; iSub < document.all.dlAllSubUnit.options.length ; iSub++)
		{
			var SubValue = document.all.dlAllSubUnit.options[iSub].value;
			var arrSubValue = SubValue.split('|');
			
			if(arrSubValue[0] == unitNo)
			{
				HasSub++;
				fnAddOption(document.all.ddlFlowSubUnit, arrSubValue[1], document.all.dlAllSubUnit.options[iSub].text);
			}
		}

		if(HasSub == 0)
		{
			fnDelOptions(document.all.ddlFlowSubUnit);
			document.all.trFlowSubUnit.className = "hide";	//無二級單位，則不顯示二級單位下拉選單
		}
	}
	else
		document.all.trFlowSubUnit.className = "hide";	//無二級單位，則不顯示二級單位下拉選單

	//取得角色資訊
	fnDelOptions(document.all.ddlFlowRole);
	fnAddOption(document.all.ddlFlowRole,"","");
    //1070830 Justin [1070678]弱掃AJAX修改
	//var RoleObj = EDT270.GetRoleInfo(document.all.SsoArtifact.value, document.all.OrgNo.value, unitNo, bGetSub).value;
	var RoleObj = ED2.EDT270.GetRoleInfo(document.all.SsoArtifact.value, document.all.OrgNo.value, unitNo, bGetSub).value;
	if(RoleObj.bSuccess)
	{
		for(var iRole = 0 ; iRole < RoleObj.arrRole.length ; iRole++)
		{
			var RoleName = RoleObj.arrRole[iRole].RoleName;
			if(RoleObj.arrRole[iRole].bSub)
				RoleName = RoleObj.arrRole[iRole].DeptName + "-" + RoleObj.arrRole[iRole].RoleName;

			var DeptNo = RoleObj.arrRole[iRole].DeptNo;
			var RoleNo = RoleObj.arrRole[iRole].RoleNo;

			fnAddOption(document.all.ddlFlowRole, DeptNo+"|"+RoleNo, RoleName);
		}
	}
	else
	{
		alert("取得單位內角色資訊失敗，失敗訊息：" + RoleObj.ErrMsg);
	}
	
	if(bInitValue == "Y")
	{
		var idx2 = document.all.ddlSubFolder.selectedIndex;
		var Subfolder = document.all.ddlSubFolder.options[idx2].text;

		//讀取環境變數MP_BATCHSUBMIT_INIT_ROLEID規則來決定切換資料夾時帶出的角色規則
		if (SF==null) //如果紀憶體沒有查表規則,則讀取並且宣告
		{
			var ChangeRoleRule = bInitRoleID;
			firstDecomposition=ChangeRoleRule.split("|");
			SF = new Array();
			UN = new Array();
			RI = new Array();
			AP = new Array();
			IT = new Array();		//0960125 Stella  紀錄要帶出的發文設定類型
			//1060726 David 修正for迴圈內變數未宣告，導致程式異常問題
			//for (i=0;i<firstDecomposition.length;i++)
			for (var i=0 ; i<firstDecomposition.length ; i++)
			{
				var secondDecomposition=firstDecomposition[i].split(";");
				SF[i] = secondDecomposition[0];
				UN[i] = secondDecomposition[1];
				RI[i] = secondDecomposition[2];
				AP[i] = secondDecomposition[3];
				if(secondDecomposition.length == 5)
					IT[i] = secondDecomposition[4];
				else
					IT[i] = secondDecomposition[4];
			}
		}
		var blUnitSet = false;
		//根據規則去跑迴圈決定帶出之預設值
		//1060726 David 修正for迴圈內變數未宣告，導致程式異常問題
		//for (i=0;i<SF.length;i++)
		for (var i=0 ; i<SF.length ; i++)
		{
			if (i>0)
				if (SF[i] != SF[i-1])
					blUnitSet = false;

			if (SF[i]==Subfolder)
			{
				if (UN[i]=="")
				{
					if (blUnitSet==false)
					{
						fnSetDDLValueByValue(document.all.ddlFlowRole, RI[i]);
						
						if (AP[i].toUpperCase()=="Y")
						{
							document.all.cbAutoApp.checked = true;
							//alert(AP[i]);
						}
						else if (AP[i].toUpperCase()=="N")
							document.all.cbAutoApp.checked = false;	
						if(IT[i] != "")
						{
							if(IT[i] == "1")
								document.all.rbO.checked = true;
							else if(IT[i] == "2")
								document.all.rbU.checked = true;
							else if(IT[i] == "3")
								document.all.rbSave.checked = true;
						}
						break;
					}
				}
				else
				{
					if (UN[i] == unitNo)
					{
						blUnitSet = true;
						fnSetDDLValueByValue(document.all.ddlFlowRole, RI[i]);
						if (AP[i].toUpperCase()=="Y")
						{
							document.all.cbAutoApp.checked = true;
						}
						else if (AP[i].toUpperCase()=="N")
						{
							document.all.cbAutoApp.checked = false;	
						}
						if(IT[i] != "")
						{
							if(IT[i] == "1")
								document.all.rbO.checked = true;
							else if(IT[i] == "2")
								document.all.rbU.checked = true;
							else if(IT[i] == "3")
								document.all.rbSave.checked = true;
						}
					}
					else
					{
					}
				}
			}
			else if (SF[i].toUpperCase() == "DEFAULT")
			{
				fnSetDDLValueByValue(document.all.ddlFlowRole, RI[i]);
				if (AP[i].toUpperCase()=="Y")
					document.all.cbAutoApp.checked = true;
				else if (AP[i].toUpperCase()=="N")
					document.all.cbAutoApp.checked = false;
				if(IT[i] != "")
				{
					if(IT[i] == "1")
						document.all.rbO.checked = true;
					else if(IT[i] == "2")
						document.all.rbU.checked = true;
					else if(IT[i] == "3")
						document.all.rbSave.checked = true;
				}
			}
		}
	}

	fnRoleChange();
}

function fnSubUnitChange(argCheck)
{
	if(argCheck)
	{
		fnTranSelect(document.all.rbCustomOu);
	}
	var nSum = "";
	var idx = document.all.ddlFlowSubUnit.selectedIndex;
	var unitNo = document.all.ddlFlowSubUnit[idx].value;
	if(idx == 0)
	{
		fnUnitChange(true);
		return;
	}

	fnDelOptions(document.all.ddlFlowRole);
	fnAddOption(document.all.ddlFlowRole,"","");
    //1070830 Justin [1070678]弱掃AJAX修改
    //var RoleObj = EDT270.GetRoleInfo(document.all.SsoArtifact.value , document.all.OrgNo.value, unitNo, false).value;
	var RoleObj = ED2.EDT270.GetRoleInfo(document.all.SsoArtifact.value, document.all.OrgNo.value, unitNo, false).value;
	if(RoleObj.bSuccess)
	{
		for(var iRole = 0 ; iRole < RoleObj.arrRole.length ; iRole++)
		{
			var RoleName = RoleObj.arrRole[iRole].RoleName;
			var DeptNo = RoleObj.arrRole[iRole].DeptNo;
			var RoleNo = RoleObj.arrRole[iRole].RoleNo;

			fnAddOption(document.all.ddlFlowRole, DeptNo+"|"+RoleNo, RoleName);
		}
	}
	else
	{
		alert("取得單位內角色資訊失敗，失敗訊息：" + RoleObj.ErrMsg);
	}

	if(bInitValue == "Y")
	{
		var idx2 = document.all.ddlSubFolder.selectedIndex;
		var Subfolder = document.all.ddlSubFolder.options[idx2].text;
		
		//讀取環境變數MP_BATCHSUBMIT_INIT_ROLEID規則來決定切換資料夾時帶出的角色規則
		if (SF==null) //如果紀憶體沒有查表規則,則讀取並且宣告
		{
			var ChangeRoleRule = bInitRoleID;
			firstDecomposition=ChangeRoleRule.split("|");
			SF = new Array();
			UN = new Array();
			RI = new Array();
			AP = new Array();
			//1060726 David 修正for迴圈內變數未宣告，導致程式異常問題
			//for (i=0;i<firstDecomposition.length;i++)
			for (var i=0 ; i<firstDecomposition.length ; i++)
			{
				var secondDecomposition=firstDecomposition[i].split(";");
				SF[i] = secondDecomposition[0];
				UN[i] = secondDecomposition[1];
				RI[i] = secondDecomposition[2];
				AP[i] = secondDecomposition[3];
			}
		}
		var blUnitSet = false;
		//根據規則去跑迴圈決定帶出之預設值
		//1060726 David 修正for迴圈內變數未宣告，導致程式異常問題
		//for (i=0;i<SF.length;i++)
		for (var i=0 ; i<SF.length ; i++)
		{
			if (i>0)
				if (SF[i] != SF[i-1])
					blUnitSet = false;
						
			if (SF[i]==Subfolder)
			{
				if (UN[i]=="")
				{
					if (blUnitSet==false)
					{
						fnSetDDLValueByValue(document.all.ddlFlowRole, RI[i]);
						
						if (AP[i].toUpperCase()=="Y")
						{	
							document.all.cbAutoApp.checked = true;
							//alert(AP[i]);
						}
						else if (AP[i].toUpperCase()=="N")
							document.all.cbAutoApp.checked = false;	
						break;
					}
				}
				else
				{
					if (UN[i] == unitNo)
					{			
						blUnitSet = true;
						fnSetDDLValueByValue(document.all.ddlFlowRole, RI[i]);
						if (AP[i].toUpperCase()=="Y")
						{	
							document.all.cbAutoApp.checked = true;
						}
						else if (AP[i].toUpperCase()=="N")
						{
							document.all.cbAutoApp.checked = false;	
						}
					}
				}
			}
			else if (SF[i].toUpperCase() == "DEFAULT")
			{
				fnSetDDLValueByValue(document.all.ddlFlowRole, RI[i]);
				if (AP[i].toUpperCase()=="Y")
					document.all.cbAutoApp.checked = true;
				else if (AP[i].toUpperCase()=="N")
					document.all.cbAutoApp.checked = false;
			}
		}
	}
	fnRoleChange();
}

var blProgChange = false;
var preRoleID = "";
function fnRoleChange()
{
	fnDelOptions(document.all.ddlFlowUser);
	fnAddOption(document.all.ddlFlowUser,"","");

	var idx	= document.all.ddlFlowRole.selectedIndex;
	if(idx == 0)
		return;

	var roleNoInfo = document.all.ddlFlowRole[idx].value;
	var unitNo	= roleNoInfo.split('|')[0];
	var roleNo = roleNoInfo.split('|')[1];
	var nNum;
	var nSum	="";
	blProgChange = false;
    //1070830 Justin [1070678]弱掃AJAX修改
	//var UserObj = EDT270.GetRoleUser(document.all.SsoArtifact.value, document.all.OrgNo.value, unitNo, roleNo).value;
	var UserObj = ED2.EDT270.GetRoleUser(document.all.SsoArtifact.value, document.all.OrgNo.value, unitNo, roleNo).value;
	if(UserObj.bSuccess)
	{
		for(var iUser = 0 ; iUser < UserObj.arrUser.length ; iUser++)
		{
			var UserName = UserObj.arrUser[iUser].UserName;
			var EmpName = UserObj.arrUser[iUser].EmpName;

			fnAddOption(document.all.ddlFlowUser, UserName, EmpName);
		}
	}
	else
	{
		alert("取得角色扮演人員資訊失敗，失敗訊息：" + UserObj.ErrMsg);
	}

	//David Wait
	/*//2006.07.11 JEFF 變更需求單FOR勞委會（單號950596）：帶出所有處室下之承辦人
	if (document.all.sso.GetEnvSet("MP_BATCHSUBMIT_GET_OD99").toUpperCase() == "Y")
	{
		if (roleNo=="OD99")
		{
			var k;
			var subUnitRoleNo;
			//[需求單955155] 因應二層式登紀桌架構之修改 Charles 0951104
			var nRoles = OD_BATCHSUBMIT_SHOW_SUBUNIT == "N" ? document.all.sso.GetSubRoleOfUnit(strOrgValue,unitNo) : document.all.sso.GetRoleOfUnit(strOrgValue,unitNo);

			for(k=0;k<nRoles;k++) // 處下角色為roleNo的數量
			{
				subUnitRoleNo = document.all.sso.GetMemberRoleIdOfIdx(k).split('|');
				if (subUnitRoleNo.length==2)
				{
					if( subUnitRoleNo[1] == "OD99" ) //為科室角色 可split取得 科室代號 角色代號
					{

						nNum	= document.all.sso.GetRoleOccupant(strOrgValue,subUnitRoleNo[0],roleNo);
						for(var j=0;j<nNum;j++)
						{
							lacc = document.all.sso.GetOccupantAccount(strOrgValue,subUnitRoleNo[0],roleNo,j);
							lname= document.all.sso.GetOccupantName(strOrgValue,subUnitRoleNo[0],roleNo,j);
							nToken = "?"+lacc+"&"+lname
							if(nSum.indexOf(nToken)==-1)
							{
								nSum+=nToken;
								fnAddOption(document.all.ddlFlowUser,lacc,lname);
								//加入preRoleID字串，以供fnUserChnage查詢
								//格式  Role1&UserID1;Role2&UserID2.....
								preRoleID += subUnitRoleNo[0] + "&" + lacc + ";";
							}
						}
					}
					blProgChange = true;
				}
				
				//如果啟用環境變數MP_BATCHSUBMIT_GET_OD99，則註冊fnUserChange()事件
				document.all.ddlFlowUser.onchange = fnUserChange;				

			}
		}	
	}*/
}
function fnTranSelect(argObj)
{
	if(argObj==document.all.rbInchargeOu)
	{
		//1070904 Justin [1070678]弱掃修正CookieHttpOnly-無用Cookie移除
		//jf_SaveCookie("MODE_TRAN",MODE_TRAN_INCHARGE);
		document.all.rbInchargeOu.checked=true;
		document.all.rbCustomOu.checked=false;
		document.all.rbRejectOu.checked=false;
		document.all.ddlApply.disabled=false;
		document.all.cbAutoApp.disabled=false;
	}
	else if(argObj==document.all.rbRejectOu)
	{
		//1070904 Justin [1070678]弱掃修正CookieHttpOnly-無用Cookie移除
		//jf_SaveCookie("MODE_TRAN",MODE_TRAN_REJECT);
		document.all.rbInchargeOu.checked=false;
		document.all.rbCustomOu.checked=false;
		document.all.rbRejectOu.checked=true;
		document.all.ddlApply.selectedIndex=-1;
		document.all.ddlApply.disabled=true;
		document.all.cbAutoApp.disabled=true;
		document.all.cbAutoApp.checked=false;
	}
	else
	{
		//1070904 Justin [1070678]弱掃修正CookieHttpOnly-無用Cookie移除
		//jf_SaveCookie("MODE_TRAN",MODE_TRAN_CUSTOM);
		document.all.rbInchargeOu.checked=false;
		document.all.rbCustomOu.checked=true;
		document.all.rbRejectOu.checked=false;
		document.all.ddlApply.disabled=false;
		document.all.cbAutoApp.disabled=false;
	}
}

function fnStoreSelect(argObj)
{
	if(argObj==document.all.rbOrgStore)
	{
		//1070904 Justin [1070678]弱掃修正CookieHttpOnly-無用Cookie移除
		//jf_SaveCookie("MODE_FILE",MODE_FILE_ORG);
		document.all.rbOrgStore.checked=true;
		document.all.rbUnitStore.checked=false;
	}
	else
	{
		//1070904 Justin [1070678]弱掃修正CookieHttpOnly-無用Cookie移除
		//jf_SaveCookie("MODE_FILE",MODE_FILE_UNIT);
		document.all.rbOrgStore.checked=false;
		document.all.rbUnitStore.checked=true;
	}
}

function fnRemarkChange()
{	
	if(jf_Trim(document.all.tbRemark.value)=="")
	{
		var idx = document.all.ddlRemark.selectedIndex;
		var val = document.all.ddlRemark.options[idx].text;
		document.all.tbRemark.value = val;
	}
}

function SetSendCount()
{
	var iCnt = 0;
	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		//若有勾選時
		if(document.all["dg1__ctl" + i + "_cbDgSend"].checked)
			iCnt++;
	}

	document.all.CheckSendCount.textContent = iCnt+"";
}

function fnSetInfo()
{
	var ouId = "";
	var ouName = "";
	var roleId = "";
	var roleName = "";
	var userId = "";
	var userName = "";

	//處理擬辦設定	
	var valCloseF = "Y";
	var valCaseCon = "N";
	var valCloseType = "";

	if(document.all.rbO.checked)
		valCloseType	= "1";
	else if(document.all.rbU.checked)
		valCloseType	= "2";
	else if(document.all.rbSave.checked)
		valCloseType	= "3";
	else
		valCloseType	= "";

	if(document.all.rbCustomOu.checked)
	{
		var ouIdx = document.all.ddlFlowUnit.selectedIndex;
		ouName = document.all.ddlFlowUnit[ouIdx].textContent;
		ouId = document.all.ddlFlowUnit[ouIdx].value;
		var roleIdx = document.all.ddlFlowRole.selectedIndex;
		
		//若為二層式登紀桌架構則需判斷是否選擇二級單位
		if (bShowSubUnit == "Y")
		{
			if (document.all.trFlowSubUnit.className == "")
			{
				var iIdx = document.all.ddlFlowSubUnit.selectedIndex;
				//1071008 David 修正若二級單位未選擇時，不取二級單位資訊
				if(iIdx > 0)
				{
					var SectId = document.all.ddlFlowSubUnit[iIdx].value;
					var SectName = document.all.ddlFlowSubUnit[iIdx].textContent;
					if (SectId != ouId)
					{
						ouId = SectId;
						ouName = SectName;
					}
				}
			}
		}

		if(roleIdx==-1)
		{
			roleName = "";
			roleId = "";
		}
		else
		{
			roleName = document.all.ddlFlowRole[roleIdx].textContent;
			if(roleName.indexOf("-")!=-1)
			{
				var temp = roleName;
				roleName = GetSplitStr(temp,"-",1);
				ouName = GetSplitStr(temp,"-",0);
			}

			roleId = document.all.ddlFlowRole[roleIdx].value;
			if(roleId.indexOf("|")!=-1)
			{
				var temp = roleId;
				roleId = GetSplitStr(temp,"|",1);
				ouId = GetSplitStr(temp,"|",0);
			}
		}

		var userIdx	= document.all.ddlFlowUser.selectedIndex;
		if(userIdx==-1)
		{
			userName = "";
			userId = "";
		}
		else
		{
			userName = document.all.ddlFlowUser[userIdx].textContent;
			userId = document.all.ddlFlowUser[userIdx].value;
		}
	}

	for(var i = 2; i <= document.all.dg1.rows.length; i++)//依序將資料寫入
	{
		if(!document.all["dg1__ctl" + i + "_cbDgSet"].checked)
			continue;

		var sDocState = document.all["dg1__ctl" + i + "_txdgDocState"].value;
		if(valCloseType != "" && sDocState < "10") //非原設定時才變更發文設定
		{
			document.all["dg1__ctl" + i + "_txdgCloseType"].value = valCloseType;
			document.all["dg1__ctl" + i + "_lbdgCloseType"].textContent = TranslateProc(valCloseType);
		}
		else
		{
			if(document.all["dg1__ctl" + i + "_txdgCloseType"].value == "")
			{
				document.all["dg1__ctl" + i + "_txdgCloseType"].value = "1";
				document.all["dg1__ctl" + i + "_lbdgCloseType"].textContent = TranslateProc("1");
			}
		}

		fnSetInfoForCurrentRec(i);
		
		if(document.all.rbInchargeOu.checked || document.all.rbRejectOu.checked)
		{
			ouId = document.all["dg1__ctl" + i + "_txdgInCharge"].value.substring(0,2);
			ouName = document.all["dg1__ctl" + i + "_txdgIcOuName"].value;

			//傳送至"原承辦單位"修改成"原承辦單位/原承辦人"
			var flowOwnOuId = document.all["dg1__ctl" + i + "_txdgOwnOuId"].value.substring(0,2);
			if(flowOwnOuId == ouId) //目前流程單位與原承辦單位在同一單位內則直接退回原承辦人
			{
				roleId = "";
				roleName = "";
				userId = document.all["dg1__ctl" + i + "_txdgIcUserId"].value;
				userName = document.all["dg1__ctl" + i + "_txdgIcUserName"].value;
			}
			else //目前流程單位與原承辦單位在不同單位則退回原承辦單位登紀桌
			{
				roleId = "OD17";
				roleName = "登紀桌";
				userId = "";
				userName = "";
			}
		}

		fnProcPaperFlow(i, ouId, ouName, roleId, roleName, userId,	userName);	

		var txName = document.all["dg1__ctl" + i + "_txdgTxName"].value;
		if(txName == "")
			document.all["dg1__ctl" + i + "_lbDgStatus"].textContent = "無法判定異動別";
		else
			document.all["dg1__ctl" + i + "_lbDgStatus"].textContent = "";
	}
}

function TranslateProc(argCloseType)
{
	var strRet = "";
	
	if(argCloseType=="")
		strRet = "未設定";
	else if(argCloseType=="N")
		strRet = "未設定";
	else
	{
		if(argCloseType=="1")
			strRet = "總發文";
		if(argCloseType=="2")
			strRet = "單位發文";
		if(argCloseType=="3")
			strRet = "存查";	
	}
	return strRet;
}

function fnSetInfoForCurrentRec(argDgIndex)
{
	var appName = "";
	var appAcc = "";
	var appRole = "";
	var appMakeup = "";
	var strAppType = "";

	if(!document.all.cbAutoApp.checked)
	{
		var idx = document.all.ddlAppType.selectedIndex;
		strAppType = document.all.ddlAppType.options[idx].text;
		var appIdx = document.all.ddlApply.selectedIndex;

		if(appIdx==-1 || (document.all.ddlApply.disabled==true))
		{
		}
		else
		{
			appName = document.all.ddlApply[appIdx].textContent;
			appMakeup = document.all.ddlApply[appIdx].value;
			if(appMakeup!="")
			{
				appAcc = GetSplitStr(appMakeup,"|",0);
				appRole = GetSplitStr(appMakeup,"|",1);
			}
		}
	}
	else
	{
		var strOwnOuId = document.all["dg1__ctl" + argDgIndex + "_txdgOwnOuId"].value;

		var appMakeup = GetMaxApplyUserOf(strOwnOuId.substring(0,2));
		if(appMakeup && appMakeup != "")
		{
			//appMakeup內容：角色代碼|角色名稱|帳號|人名
			if (bObApproveType == "ROLE")
			{
				//1061106 David 1060992 支援OD_APPROVE_TYPE設定為ALL及USER的行為，調整取單位最大核決資訊行為
				/*//核決者帳號應為空，名稱應顯示為角色名稱
				appAcc 	= "";
				appRole	= GetSplitStr(appMakeup, "|", 1);
				appName	= GetSplitStr(appMakeup, "|", 2);*/
				appAcc 	= "";
				appRole	= GetSplitStr(appMakeup, "|", 0);
				appName	= GetSplitStr(appMakeup, "|", 1);
			}
			else
			{
				//1061106 David 1060992 支援OD_APPROVE_TYPE設定為ALL及USER的行為，調整取單位最大核決資訊行為
				/*appAcc 	= GetSplitStr(appMakeup,"|",0);
				appName	= GetSplitStr(appMakeup,"|",1);
				appRole	= GetSplitStr(appMakeup,"|",2);*/
				appAcc 	= GetSplitStr(appMakeup, "|", 2);
				appRole	= GetSplitStr(appMakeup, "|", 0);
				appName	= GetSplitStr(appMakeup, "|", 3);
			}
		}
	}
	
	//設定檔案數量
	var fileCnt = jf_Trim(document.all.txFileCnt.value);
	if(fileCnt != "")
		document.all["dg1__ctl" + argDgIndex + "_txdgFileCnt"].value = fileCnt;

	//設定分類號
	var fileCls = jf_Trim(document.all.txClsNo.value);
	if (fileCls != "")
	{
		document.all["dg1__ctl" + argDgIndex + "_txdgFileCls"].value = fileCls;
		document.all["dg1__ctl" + argDgIndex + "_lbdgFileCls"].textContent = fileCls;
	}

	//設定保存年限
	var KeepYear = jf_Trim(document.all.txKeepYear.value);
	if(KeepYear != "")
	{
		document.all["dg1__ctl" + argDgIndex + "_txdgKeepYear"].value = KeepYear;
		document.all["dg1__ctl" + argDgIndex + "_lbdgKeepYear"].textContent = KeepYear;
	}

	//設定原因註紀
	var tranMark = jf_Trim(document.all.txRemark.value);
	if(tranMark != "")
	{
		document.all["dg1__ctl" + argDgIndex + "_txdgRemark"].value = tranMark;
		document.all["dg1__ctl" + argDgIndex + "_lbdgRemark"].textContent = tranMark;
	}
	//檔案庫房
	if(document.all.rbOrgStore.checked==true)
	{
		document.all["dg1__ctl" + argDgIndex + "_txdgStoreType"].value = "1";
		document.all["dg1__ctl" + argDgIndex + "_lbdgStoreType"].textContent = "檔案室";
	}
	else
	{
		document.all["dg1__ctl" + argDgIndex + "_txdgStoreType"].value = "2";
		document.all["dg1__ctl" + argDgIndex + "_lbdgStoreType"].textContent = "單位歸檔";
	}
	//剔退者
	if(strAppType=="剔退者")
	{
		document.all["dg1__ctl" + argDgIndex + "_txdgRejectUserName"].value = appName;
	}
	else
	{
		//當核決者有值時不應該直接設定，否則會造成核決者有誤
		if(appName != "")
		{
			if(document.all["dg1__ctl" + argDgIndex + "_txdgAppUserName"].value != "" && document.all.cbAutoApp.checked)
			{
			}
			else
			{
				document.all["dg1__ctl" + argDgIndex + "_lbdgAppUserName"].textContent = appName;
				document.all["dg1__ctl" + argDgIndex + "_txdgAppUserName"].value = appName;
				document.all["dg1__ctl" + argDgIndex + "_txdgAppUserId"].value = appAcc;
				document.all["dg1__ctl" + argDgIndex + "_txdgAppRoleId"].value = appRole;
			}
		}
	}

	//設定年度案次號
	var FileCase = document.all.txFileCase.value;
	if(FileCase != "")
	{
		document.all["dg1__ctl" + argDgIndex + "_txdgFileCase"].value = FileCase;
		document.all["dg1__ctl" + argDgIndex + "_lbdgFileCase"].textContent = FileCase;

		var FileYear = document.all.txFileYear.value;
		document.all["dg1__ctl" + argDgIndex + "_txdgFileYear"].value = FileYear;
		document.all["dg1__ctl" + argDgIndex + "_lbdgFileYear"].textContent = FileYear;
	}
}

function GetMaxApplyUserOf(argOuId)
{
	if(argOuId == null || argOuId == "")
		return "";

	var rtnValue = "";
	//1060726 David 修正for迴圈內變數未宣告，導致程式異常問題
	//for(i = 0 ; i < document.all.dllAllAppRole.options.length ; i++)
	for(var i = 0 ; i < document.all.dllAllAppRole.options.length ; i++)
	{
		//1061106 David 1060992 支援OD_APPROVE_TYPE設定為ALL及USER的行為，調整取單位最大核決資訊行為
		/*var RoleInfo = document.all.dllAllAppRole.options[i].value;
		var RoleDeptNo = GetSplitStr(RoleInfo,"|",0);
		if(RoleDeptNo == argOuId)
			return RoleInfo;*/
		if(argOuId == document.all.dllAllAppRole.options[i].text)
			return document.all.dllAllAppRole.options[i].value;
	}
}

function fnProcPaperFlow(argDgIndex, argOuId, argOuName, argRoleId, argRoleName, argUserId, argUserName)
{	
	if(argOuName==null)
		return;
	if(argOuName.toString()=="")
		return;

	var inchargeOU = document.all["dg1__ctl" + argDgIndex + "_txdgInCharge"].value;
	var appUserId = document.all["dg1__ctl" + argDgIndex + "_txdgAppUserId"].value;
	var appUserName = document.all["dg1__ctl" + argDgIndex + "_txdgAppUserName"].value;
	var appRoleId = document.all["dg1__ctl" + argDgIndex + "_txdgAppRoleId"].value;
	var flowOwnOuId = document.all["dg1__ctl" + argDgIndex + "_txdgOwnOuId"].value;
	var inchargeUserId = document.all["dg1__ctl" + argDgIndex + "_txdgIcUserId"].value;
	var Folder = document.all["dg1__ctl" + argDgIndex + "_txdgFolder"].value;
	var subFolder = document.all["dg1__ctl" + argDgIndex + "_txdgSubFolder"].value;
	var msgId = document.all["dg1__ctl" + argDgIndex + "_txdgMsgId"].value;
	
	//更新目前資料至XML物件內
	var XmlInfo = SetXmlDate(argDgIndex);
	
	var IsApp = false;
	if (bObApproveType =="ROLE")
	{
		if (appRoleId != "")
			IsApp = true;
	}
	else
	{
		if (appUserId !="")
			IsApp = true;
	}

	var txName = fnGetTxNameByRule(msgId,appUserId,argOuId,argRoleId,argUserId,Folder,subFolder,inchargeOU,inchargeUserId,flowOwnOuId,XmlInfo,IsApp);

	if (txName != "")
	{
		var SendTarget = "";
		if (argUserId != "")
			SendTarget = argOuName + " " + argUserName;
		else
			SendTarget = argOuName+" "+argRoleName;
		document.all["dg1__ctl" + argDgIndex + "_lbdgSendTarget"].textContent = SendTarget;

		document.all["dg1__ctl" + argDgIndex + "_lbdgTxName"].textContent = txName;
		document.all["dg1__ctl" + argDgIndex + "_txdgTxName"].value = txName;
		
		document.all["dg1__ctl" + argDgIndex + "_txdgToUserId"].value = argUserId;
		document.all["dg1__ctl" + argDgIndex + "_txdgToUserName"].value = argUserName;
		document.all["dg1__ctl" + argDgIndex + "_txdgToOuId"].value = argOuId;
		document.all["dg1__ctl" + argDgIndex + "_txdgToOuName"].value = argOuName;
		document.all["dg1__ctl" + argDgIndex + "_txdgToRoleId"].value = argRoleId;
		document.all["dg1__ctl" + argDgIndex + "_txdgToRoleName"].value = argRoleName;
	}
	else
	{
		document.all["dg1__ctl" + argDgIndex + "_lbdgTxName"].textContent = txName;
		document.all["dg1__ctl" + argDgIndex + "_txdgTxName"].value = txName;
	}
}

//紀錄已取過的rule資訊
var tx_name		=	new Array();
var ou_id		=	new Array();
var ou_name		=	new Array();
var role_id		=	new Array();
var role_name	=	new Array();
var user_id		=	new Array();
var user_name	=	new Array();
var grobal_txname = new Array();

function fnGetTxNameByRule(argMsgId, argAppUserId, argToOuId, argToRoleId ,argToUserId ,argFolder ,argSubFolder, argInchargeOU,argInchargeUserId,argFlowOwnOuId,argXmlInfo,argIsApp)
{
	//如果未選擇單位、角色及帳號等選項，則設定argToOuId,argToRoleId,argToUserId為空白，使用環境變數來取得異動別
	if (!document.all.rbCustomOu.checked)
	{
		argToOuId = "";
		argToRoleId = "";
		argToUserId = "";
	}

	//選擇原承辦單位/承辦人之處理
	if (document.all.rbInchargeOu.checked)
	{
	   //同單位但有一二級之分時，取前兩碼判斷以避免無法判斷異動別
	   if (argInchargeOU.toString().substr(0,2) == argFlowOwnOuId.toString().substr(0,2)) //如果公文承辦單位與目前流程單位相同位置，則代表送回原承辦人
	   {
			argToOuId = argInchargeOU;
			argToRoleId = "OD99";
			argToUserId = argInchargeUserId;
		}
		else  //如果公文承辦單位與目前流程所在單位不同，則代表送給承辦單位之登紀桌
		{
			argToOuId = argInchargeOU;
			argToRoleId = "OD17";
			argToUserId = "";
		}
	}

	//如果是科室下角色,則取前兩碼
	if (argFlowOwnOuId.toString().substr(0,2) != argToOuId.toString().substr(0,2))
	{
		if (argToOuId.length > 2)
			argToOuId = argToOuId.substr(0,2);
	}
	
	var nextOptions;
	var sODWMSGXml = argXmlInfo;
	
	try
	{
		var docObj = new MPDocObj_Lite(sODWMSGXml);
		var currentFlow = docObj.getCurrentFlow_PDoc();
		//_buildPDocNextOptions()內會依目前公文基資及RULE內SPECIAL_CHECK、DOC_STATE等進行篩選並回傳可用的異動別，程式後續不需再進行檢核
		nextOptions = _buildPDocNextOptions(currentFlow, menuRule, orgNode, docObj, {forPopupMenu: true});
		if (!!nextOptions) {
			//alert('nextOptions DDL1 item count=' + nextOptions.length);
		}
		else {
			return "";
			//alert('nextOptions == null');
		}
	}
	catch(e)
	{
		alert("取得可用異動別資訊失敗: " + e.message);
		return "";
	}

	//創建查表陣列，查詢陣列已獲得tx_name
	var tx_name		=	new Array();
	var ou_id		=	new Array();
	var ou_name		=	new Array();
	var role_id		=	new Array();
	var role_name	=	new Array();
	var user_id		=	new Array();
	var user_name	=	new Array();
	var grobal_txname = new Array();	//存放upper layer txname陣列

	//查表陣列的counter
	var RowCount = 0;
	var RowCountTxName = 0;
	var Return_Val = "";

	//紀錄取得的異動別資訊
	//1060726 David 修正for迴圈內變數未宣告，導致程式異常問題
	//for (idx1 = 0 ; idx1 < nextOptions.length ; idx1++)
	for (var idx1 = 0 ; idx1 < nextOptions.length ; idx1++)
	{
		if(typeof nextOptions[idx1].options == 'undefined' || nextOptions[idx1].options.length == 0)
		{
			grobal_txname[RowCountTxName] = nextOptions[idx1].txName;
			RowCountTxName ++;
		}
		else
		{
			//1060726 David 修正for迴圈內變數未宣告，導致程式異常問題
			//for (j = 0 ; j < nextOptions[idx1].options.length ; j++)
			for (var j = 0 ; j < nextOptions[idx1].options.length ; j++)
			{
				if(nextOptions[idx1].options[j].finalTarget || 
				(typeof nextOptions[idx1].options[j].options == 'undefined' || nextOptions[idx1].options[j].options.length == 0))
				{
					tx_name[RowCount] = nextOptions[idx1].txName;
					ou_id[RowCount] = nextOptions[idx1].options[j].toOUId;
					ou_name[RowCount] = nextOptions[idx1].options[j].toOUName;
					role_id[RowCount] = nextOptions[idx1].options[j].toRoleId;
					role_name[RowCount] = nextOptions[idx1].options[j].toRoleName;
					user_id[RowCount] = nextOptions[idx1].options[j].toUserId;
					user_name[RowCount] = nextOptions[idx1].options[j].toUserName;
					RowCount++;
				}
				else
				{
					//1060726 David 修正for迴圈內變數未宣告，導致程式異常問題
					//for (k = 0 ; k < nextOptions[idx1].options[j].options.length ; k++)
					for (var k = 0 ; k < nextOptions[idx1].options[j].options.length ; k++)
					{
						tx_name[RowCount] = nextOptions[idx1].txName;
						ou_id[RowCount] = nextOptions[idx1].options[j].options[k].toOUId;
						ou_name[RowCount] = nextOptions[idx1].options[j].options[k].toOUName;
						role_id[RowCount] = nextOptions[idx1].options[j].options[k].toRoleId;
						role_name[RowCount] = nextOptions[idx1].options[j].options[k].toRoleName;
						user_id[RowCount] = nextOptions[idx1].options[j].options[k].toUserId;
						user_name[RowCount] = nextOptions[idx1].options[j].options[k].toUserName;
						RowCount++;
					}
				}
			}
		}
	}

	//加入環境變數至查表陣列中
	var strEnvTxName = argFolder + "-" + argSubFolder + "_DEF_TXNAME";
	var strGetTxName = "";
	strGetTxName = theSSO.User.EnvSettings.get(strEnvTxName);
	
	//根據傳入參數進行查表，並決定回傳值為何
	var Return_Val = "";
	if (argToUserId == "")//如果傳送對象為空白，則argToOuId與argToRoleId同時match才算找到tx_name
	{	
		//如果都為空白，則取環境變數得到該資料夾之預設值，如果預設值在查表陣列中找到，則使用此值
		if ((argToOuId == "") && (argToRoleId == ""))  
		{
			return (strGetTxName);
		}
		else
		{
			//1060726 David 修正for迴圈內變數未宣告，導致程式異常問題
			//for (i = 0 ; i < RowCount ; i++)
			for (var i = 0 ; i < RowCount ; i++)
			{
				//修正批次傳送有傳送對象的異動別，沒選擇傳送對象仍然可判定異動別BUG
				if ((ou_id[i] == argToOuId) && (role_id[i] == argToRoleId) && (user_id[i]==""))
				{

					Return_Val = tx_name[i];
					//根據環境變數判斷，當有傳送對象及傳送單位相同時，再多判斷發文設定 for 職訓局
					var CloseTypeTxName = theSSO.User.EnvSettings.get("MP_BATCHSUBMIT_TXNAME_BY_CLOSETYPE");
					if(CloseTypeTxName.indexOf(';')!=-1 && CloseTypeTxName.indexOf(Return_Val)!=-1)
					{
						var arrType = CloseTypeTxName.split(';');
						var ActualTxName;
						if(document.all.rbO.checked == true || document.all.rbU.checked == true)
							ActualTxName = arrType[0];
						else
							ActualTxName = arrType[1];
						if (ActualTxName==Return_Val)
							break;
						else
						{
							Return_Val="";
							continue;
						}
					}

					//當TX_NAME為歸檔或單位歸檔時,檢查是否與設定選項一樣
					if ((Return_Val == theSSO.User.EnvSettings.get("MP_BATCHSUBMIT_ORGSTORE_TXNAME")) || (Return_Val==theSSO.User.EnvSettings.get("MP_BATCHSUBMIT_UNITSTORE_TXNAME")))
					{
						//檢查Return_Val是否與設定選項一樣
						var filing_type;
						if (document.all.rbOrgStore.checked==true)
							filing_type = theSSO.User.EnvSettings.get("MP_BATCHSUBMIT_ORGSTORE_TXNAME");
						else
							filing_type = theSSO.User.EnvSettings.get("MP_BATCHSUBMIT_UNITSTORE_TXNAME");
						if (filing_type==Return_Val)
						{
							break;
						}
						else
						{
							Return_Val="";
							continue;
						}
					}

					if (Return_Val=="")
						continue;
					else
						break;
				}
			}
		}
	}
	else
	{
		//如果有傳送對象，則argToOuId與argToUserId皆有值才算找到tx_name
		//1060726 David 修正for迴圈內變數未宣告，導致程式異常問題
		//for (i=0;i<RowCount;i++)
		for (var i=0 ; i<RowCount ; i++)
		{
			if ((ou_id[i].substring(0,2) == argToOuId.substring(0,2)) && (user_id[i] == argToUserId))
			{
				Return_Val = tx_name[i];
			}

			if (Return_Val=="")
				continue;
			else
				break;
		}
	}

	//如果於CheckRule中找不到該傳送對象之異動別,則讀取環境變數當作預設之異動別(環境變數必須存於剩下沒傳送對象之異動別列表中
	if (Return_Val == "")
	{
		//1060726 David 修正for迴圈內變數未宣告，導致程式異常問題
		//for (i=0;i<RowCountTxName;i++)
		for (var i=0 ; i<RowCountTxName ; i++)
		{
			if (grobal_txname[i] == strGetTxName)
			{	
				Return_Val = strGetTxName;
				return (Return_Val);
			}
		}
	}
	return (Return_Val);
}

function fnCheckForSet(argColumn)
{
	var strMsg	= "";
	var ret = 0;
	var col= "_cbDgSend";
	if(argColumn=="MODIFY")
		col = "_cbDgSet";

	for(var i = 2; i <= document.all.dg1.rows.length; i++)//依序將資料寫入
	{
		//若有勾選時
		if(document.all["dg1__ctl" + i + col].checked)
		{
			var strDocNo = document.all["dg1__ctl" + i + "_lbdgDocNo"].textContent;

			msg = fnCheckRecord(i, strDocNo);
			if(msg!="")
			{
				msg += "\n";
				if(argColumn=="MODIFY")
					strMsg +="無法設定公文文號["+val2+"]";
				else
					strMsg +="無法傳送公文文號["+val2+"]";
				strMsg +=msg;
				//取消設定傳送
				document.all["dg1__ctl" + i + "_cbDgSend"].checked = false;
				document.all["dg1__ctl" + i + "_cbDgSet"].checked = false;
			}
			else
			{
				document.all["dg1__ctl" + i + "_cbDgSend"].checked = true;
				document.all["dg1__ctl" + i + "_cbDgSet"].checked = false;

				//紀錄要進行勾選"傳送"的"設定"INDEX
				if(argColumn=="MODIFY")
					gReadyToCheckIdx += ";" + i + ";";
			}
		}
	}

	if(strMsg!="")
	{
		alert(strMsg);
		return false;
	}

	return true;
}

function fnCheckRecord(argIndex, argDocNo)
{
	var val2 = argDocNo;
	var strOrgValue = document.all.OrgNo.value;
	var strFolder = document.all["dg1__ctl" + argIndex + "_txdgFolder"].value;
	var strSubFolder = document.all["dg1__ctl" + argIndex + "_txdgSubFolder"].value;
	var strTxName = document.all["dg1__ctl" + argIndex + "_txdgTxName"].value;
	var msg = "";

	if(document.all.rbOrgStore.checked==false)
	{
		var sNewByOu = document.all["dg1__ctl" + argIndex + "_txdgNewByOu"].value;
		var strIsOuRcv = document.all["dg1__ctl" + argIndex + "_txdgIsOuRcv"].value;
		//讀取環境變數決定是否卡單位歸檔錯誤訊息
		if (bmpBatchSubmitCheckFiling == "Y")
		{
			if(sNewByOu=="N" && strIsOuRcv!="1")
			{
				msg += '#總收公文不可設定單位歸檔';
			}
		}
	}

	var sCloseType = document.all["dg1__ctl" + argIndex + "_txdgOldStoreType"].value;
	var sDocState = document.all["dg1__ctl" + argIndex + "_txdgDocState"].value;
	if(sDocState >= "10")
	{
		var valCloseType = "";
		if(document.all.rbO.checked)
			valCloseType = "1";
		else if(document.all.rbU.checked)
			valCloseType = "2";
		else if(document.all.rbSave.checked)
			valCloseType = "3";

		if(valCloseType != "" && sCloseType != valCloseType)
			msg += "#已結案公文不允許修改發文設定，若需修改請至公文基資頁面調整";
	}
	return msg;
}

function fnSubFolderChange()
{
	document.all.ToolBarSenderID.value = "btSearch";
	__doPostBack("btSearch", "");
}

function fnGetCheckNum(argColName)
{
	var ret = 0;
	var col= "_cbDgSend";
	if(argColName=="MODIFY")
		col = "_cbDgSet";

	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		if(document.all["dg1__ctl" + i + col].checked)
			ret++;
	}

	if(ret==0)
	{
		if(argColName=="MODIFY")
			alert("請先勾選[設定]後,再執行此動作");
		else
			alert("請先勾選[傳送]後,再執行此動作");	
		return false;
	}
	return true;
}

//1110120	Joe		1101393		因可直接傳送，故預設值調整為空，避免undefined被記錄
// var szAllTran;
var szAllTran="";
function fnSubmit()
{
	var artifact = document.all.SsoArtifact.value;

	for(var i = 2; i <= document.all.dg1.rows.length; i++)
	{
		if(document.all["dg1__ctl" + i + "_cbDgSend"].checked)
		{
			if(szAllTran!="")
				szAllTran+=";";
			szAllTran+=i;
		}
	}

	jf_ShowWaitState();

	fnProcessOneRecord(0);

	fnCheckClose();
}

function fnProcessOneRecord(i)
{
	//依紀錄的公文勾選順序傳送
	var szItems;
	if(gCheckSendIndexList != "")
		szItems = gCheckSendIndexList.split(';');
	else
		szItems = szAllTran.split(';');

	if(i > document.all.dg1.rows.length)
	{
		gClose=true;
		gSubmiting=false;
		return;
	}

	if(i>=szItems.length)
	{
		gClose=true;
		gSubmiting=false;
	}

	var SendIndex = szItems[i];

	if(document.all["dg1__ctl" + SendIndex + "_txdgTxName"].value =="")
	{
		//dso.recordset.fields(colStatIdx) = "流程未設定完成,不傳送";
		setTimeout("fnProcessOneRecord("+i+1+")",300);
		return;
	}

	var DocNo = document.all["dg1__ctl" + SendIndex + "_lbdgDocNo"].textContent;
	var MsgId = document.all["dg1__ctl" + SendIndex + "_txdgMsgId"].value;
	var OrgNo = document.all["dg1__ctl" + SendIndex + "_txdgOrgNo"].value;

	var TxName = document.all["dg1__ctl" + SendIndex + "_txdgTxName"].value;
	var ToOuId = document.all["dg1__ctl" + SendIndex + "_txdgToOuId"].value;
	var ToOuName = document.all["dg1__ctl" + SendIndex + "_txdgToOuName"].value;
	var ToRoleId = document.all["dg1__ctl" + SendIndex + "_txdgToRoleId"].value;
	var ToRoleName = document.all["dg1__ctl" + SendIndex + "_txdgToRoleName"].value;
	var ToUserId = document.all["dg1__ctl" + SendIndex + "_txdgToUserId"].value;
	var ToUserName = document.all["dg1__ctl" + SendIndex + "_txdgToUserName"].value;
	var AppUserId = document.all["dg1__ctl" + SendIndex + "_txdgAppUserId"].value;
	var AppUserName = document.all["dg1__ctl" + SendIndex + "_txdgAppUserName"].value;
	var AppRoleId = document.all["dg1__ctl" + SendIndex + "_txdgAppRoleId"].value;
	var CloseType = document.all["dg1__ctl" + SendIndex + "_txdgCloseType"].value;
	var StoreType = document.all["dg1__ctl" + SendIndex + "_txdgStoreType"].value;
	var Remark = document.all["dg1__ctl" + SendIndex + "_txdgRemark"].value;
	var RejectUserName = document.all["dg1__ctl" + SendIndex + "_txdgRejectUserName"].value;
	var FileCnt = document.all["dg1__ctl" + SendIndex + "_txdgFileCnt"].value;
	var FileCls = document.all["dg1__ctl" + SendIndex + "_txdgFileCls"].value;
	var KeepYear = document.all["dg1__ctl" + SendIndex + "_txdgKeepYear"].value;
	var FileYear = document.all["dg1__ctl" + SendIndex + "_txdgFileYear"].value;
	var FileCase = document.all["dg1__ctl" + SendIndex + "_txdgFileCase"].value;

	var strMenuSetting = 
		TxName +"@"+
		ToOuId +"@"+
		ToOuName +"@"+ 
		ToRoleId +"@"+ 
		ToRoleName +"@"+ 
		ToUserId +"@"+
		ToUserName +"@"+
		AppUserId +"@"+
		AppUserName +"@"+
		AppRoleId +"@"+
		CloseType +"@"+
		StoreType +"@"+
		Remark +"@"+
		""+"@"+
		""+"@"+
		""+"@"+
		RejectUserName +"@"+
		FileCnt +"@頁@"+
		FileCls +"@"+
		KeepYear +"@"+
		FileYear+"@"+
		FileCase;

	var sWsLocation = document.all.ODMSSP.value;
	var remotePath = document.all["dg1__ctl" + SendIndex + "_txdgStoragePath"].value;
	var subdir = document.all["dg1__ctl" + SendIndex + "_txdgSubDir"].value;
	var addPath = AddSlash(remotePath) + AddSlash(subdir);

	var param = new Array(6);
		param[0] = OrgNo;
		param[1] = MsgId;
		param[2] = DocNo;
		param[3] = strMenuSetting;
		param[4] = addPath;
		param[5] = document.all["dg1__ctl" + SendIndex + "_txdgWebService"].value;

	var callObj = jf_CallWS(sWsLocation, "MenuSubmit", false, param);
	argResult= callObj;
	fnCheckAndNext(i, SendIndex);
}

function fnCheckAndNext(i, argSendIndex)
{
	//1121218	Joe		序343	調整傳送後取消勾選
	document.all["dg1__ctl" + argSendIndex + "_cbDgSend"].checked = false;
	
	if(argResult.error)
	{
		alert(argResult.errorDetail.string);
		document.all["dg1__ctl" + argSendIndex + "_lbDgStatus"].textContent = "傳送失敗";
	}
	else
	{
		obj = argResult.value;
		if(obj.m_bSuccess==false)
		{
			alert( obj.m_strErrMsg);
			document.all["dg1__ctl" + argSendIndex + "_lbDgStatus"].textContent = "傳送失敗";
		}
		else
		{
			document.all["dg1__ctl" + argSendIndex + "_lbDgStatus"].textContent = "傳送成功";
			//1121218	Joe		序343	傳送成功不提供再次選取
			document.all["dg1__ctl" + argSendIndex + "_cbDgSet"].checked = false;
			document.all["dg1__ctl" + argSendIndex + "_cbDgSend"].disabled = true;
			document.all["dg1__ctl" + argSendIndex + "_cbDgSet"].disabled = true;
		}
	}

	var x=i+1;
	setTimeout("fnProcessOneRecord("+x+")",300);
}

function fnAddOption(argDDL,argValue,argText)
{
	var oOption = document.createElement("OPTION");
	argDDL.options.add(oOption);
	oOption.innerText = argText;
	oOption.value = argValue;
}

function fnSetDDLValueByValue(argDDL,argValue)
{
	argDDL.selectedIndex = 0;
	//1060726 David 修正for迴圈內變數未宣告，導致程式異常問題
	//for(i=0;i<argDDL.options.length;i++)
	for(var i=0 ; i<argDDL.options.length ; i++)
	{
		//1071026 David 修正設定角色清單預設值判斷
		/*var option = argDDL.options[i];
		if(option.value==argValue)
		{
			argDDL.selectedIndex =i;
			break;
		}*/
		var OptionValue = argDDL.options[i].value;
		if(argDDL.id == "ddlFlowRole")
			OptionValue = OptionValue.split('|')[1];
		if(OptionValue==argValue)
		{
			argDDL.selectedIndex =i;
			break;
		}
	}
}
function fnSetDDLValueByText(argDDL,argText)
{
	argDDL.selectedIndex = 0;
	//1060726 David 修正for迴圈內變數未宣告，導致程式異常問題
	//for(i=0;i<argDDL.options.length;i++)
	for(var i=0 ; i<argDDL.options.length ; i++)
	{
		var option = argDDL.options[i];
		if(option.text==argText)
		{
			argDDL.selectedIndex =i;
			break;
		}
	}
}
function GetSplitStr(argStr,argSep,argIdx)
{
	var rg_szItems = argStr.split(argSep);
	if(argIdx < rg_szItems.length)
		return rg_szItems[argIdx];
	return ""; 
}

//於紀錄清單中加入
function AddDocIndex(argIndex, argType)
{
	var bExist = false;
	var strTargetList = gCheckSendIndexList;
	if(argType == "2")
		strTargetList = gCheckSetIndexList;
	
	var szCheckItems = strTargetList.split(';');

	for(var i = 0 ; i < szCheckItems.length ; i++)
	{
		if(szCheckItems[i] == argIndex)
		{
			bExist = true;
			break;
		}
	}

	if(!bExist)
	{
		if(strTargetList != "")
			strTargetList += ";";
		strTargetList += argIndex;
	}

	if(argType == "1")
		gCheckSendIndexList = strTargetList;
	else if(argType == "2")
		gCheckSetIndexList = strTargetList;
}

//於紀錄清單中移除
function CancelDocIndex(argIndex,argType)
{
	var strTargetList = gCheckSendIndexList;
	if(argType == "2")
		strTargetList = gCheckSetIndexList;

	var szCheckItems = strTargetList.split(';');

	strTargetList = "";
	for(var i = 0 ; i < szCheckItems.length ; i++)
	{
		if(szCheckItems[i] != argIndex)
		{
			if(strTargetList != "")
				strTargetList += ";";
			strTargetList += szCheckItems[i];
		}
	}

	if(argType == "1")
		gCheckSendIndexList = strTargetList;
	else if(argType == "2")
		gCheckSetIndexList = strTargetList;
}

//紀錄或取消公文勾選的INDEX順序
function RecordCheckDocIndex(e,argType)
{
	var xObjectName = e.id;
	var bCheck = false;

	var iTargetIdx = xObjectName.substring(8, xObjectName.indexOf("_cbDgSend"));
	if(argType == "2")
		iTargetIdx = xObjectName.substring(8, xObjectName.indexOf("_cbDgSet"));;

	if(argType == "1" && document.all["dg1__ctl" + iTargetIdx + "_cbDgSend"].checked)
		bCheck = true;
	else if(argType == "2" && document.all["dg1__ctl" + iTargetIdx + "_cbDgSet"].checked)
		bCheck = true;

	if(bCheck)
	{
		AddDocIndex(iTargetIdx,argType);
	}
	else
	{
		CancelDocIndex(iTargetIdx,argType);
	}

	SetSendCount();
}

function fnCheckClose()
{
	if(gClose==false)
	{
		setTimeout('fnCheckClose()',500);
		return;
	}

	//傳送完成後，清空已紀錄公文勾選順序相關變數
	gCheckSendIndexList = "";
	gCheckSetIndexList = "";
	document.all.CheckSendCount.textContent = "0";
	gReadyToCheckIdx = "";

	jf_ShowNormalState();

	//職訓局傳送完後不跳出訊息
	if(document.all.OrgNickName.value == "EVTA")
	{
		document.all.rbSame.checked = true;
	}
	else
	{
		if(confirm("傳送完畢,是否關閉批次傳送視窗"))
			close();
	}
}

function jf_ShowNormalState()
{
	for(var i=0;i<document.all.length;i++)
	{		
		document.all[i].style.cursor = "";
	}
	window.status = "就緒";
	
	//1121109	Joe		序306		修正傳送後須解鎖Textbox欄位--S
	$('input[type=text]').each(function (){
		this.readOnly = false;
	})
	
	if(bMPShowCls.toUpperCase() == "Y" && bEnableKeepYear.toUpperCase() == "N")
		document.all.txKeepYear.readOnly = true;
	//1121109	Joe		序306		修正傳送後須解鎖Textbox欄位--E
}

function AddSlash(strPath)
{
	if(strPath.lastIndexOf("\\") != strPath.length-1)
		return strPath+"\\";
	return strPath ;
}

function SetXmlDate(argIndex)
{
	var XmlInfo = unescape(document.all["dg1__ctl" + argIndex + "_txdgXmlInfo"].value);
	var xmlData = loadXMLFile(XmlInfo);
	
	var ODWMSG = $(xmlData.documentElement);
	
	//檔案數量
	fnSetTextOfDeptElement(ODWMSG.find("FILE_CNT"), document.all["dg1__ctl" + argIndex + "_txdgFileCnt"].value);

	//分類號
	fnSetTextOfDeptElement(ODWMSG.find("FILE_CLS"), document.all["dg1__ctl" + argIndex + "_txdgFileCls"].value);

	//保存年限
	fnSetTextOfDeptElement(ODWMSG.find("KEEP_YEAR"), document.all["dg1__ctl" + argIndex + "_txdgKeepYear"].value);

	//原因註紀
	fnSetTextOfDeptElement(ODWMSG.find("TRAN_MARK"), document.all["dg1__ctl" + argIndex + "_txdgRemark"].value);

	//檔案庫房
	fnSetTextOfDeptElement(ODWMSG.find("STORE_TYPE"), document.all["dg1__ctl" + argIndex + "_txdgStoreType"].value);

	//剔退者
	fnSetTextOfDeptElement(ODWMSG.find("REJECT_USER_NAME"), document.all["dg1__ctl" + argIndex + "_txdgRejectUserName"].value);
	
	//核決者
	fnSetTextOfDeptElement(ODWMSG.find("APP_USER_ID"), document.all["dg1__ctl" + argIndex + "_txdgAppUserId"].value);
	fnSetTextOfDeptElement(ODWMSG.find("APP_USER_NAME"), document.all["dg1__ctl" + argIndex + "_txdgAppUserName"].value);
	fnSetTextOfDeptElement(ODWMSG.find("APP_ROLE_ID"), document.all["dg1__ctl" + argIndex + "_txdgAppRoleId"].value);

	//年度號
	fnSetTextOfDeptElement(ODWMSG.find("FILE_YEAR"), document.all["dg1__ctl" + argIndex + "_txdgFileYear"].value);
	
	//案次號
	fnSetTextOfDeptElement(ODWMSG.find("FILE_CASE"), document.all["dg1__ctl" + argIndex + "_txdgFileCase"].value);

	var serializer = new XMLSerializer();
	var XMLString = serializer.serializeToString(ODWMSG.get(0));

	return XMLString;
}

function loadXMLFile(file)
{
	var xmlDoc;
	if (window.DOMParser)
	{
		//判斷是不是能夠處理DOM模型物件
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(file,"text/xml");
		return xmlDoc;
	}
	else
	{
		alert("您的瀏覽器不支援Javascript!! ");
	}
}

function fnSetTextOfDeptElement(objElement,textValue)
{
	for(var i=0,maxIdx = objElement.length;i<maxIdx;i++){
		var u = objElement.get(i);
		if("text" in u)
			u.text = textValue;
		else
			u.textContent = textValue;
	}
}

//1120727   Joe     序134       修正每次輸入都檢查文號的問題
//function fnProcKeyPress()
function fnProcDoconblur()
{
	//1071002 David 修正處理邏輯
	//var kc = event.keyCode;
    //if(kc==13)

		fnCheckDoc();
}

function fnCheckDoc()
{
	var docNo = jf_Trim(document.all.txDocNo2.value);
	if(docNo == "")
		return;
	
	//1120821	Joe		序151		onblur後focus回文號
	document.all.txDocNo2.value = "";
	$('#txDocNo2').focus();
	
	if(!DocExist(docNo))
	{
		alert("公文文號["+docNo+"]不存於目前之文件盒,請重新選擇文件盒開啟");
		return;
	}
	
	fnSetInfoForDocNo(docNo);
	if(document.all.cbSet.checked)
	{		
		var msg = fnCheckForSet2(docNo);
		if(msg!="")
		{
			alert(strMsg);
		}
		else//1121025 David 一併設定流程後，更新勾選筆數
			SetSendCount();
	}

	//1120821	Joe		序151		onblur後focus回文號
	//document.all.txDocNo2.value = "";
}

function DocExist(argDocNo)
{
	var bExist = false;
	for(var i = 2; i <= document.all.dg1.rows.length; i++)//依序將資料寫入
	{
		var DocNo = document.all["dg1__ctl" + i + "_lbdgDocNo"].textContent;
		var MsgId = document.all["dg1__ctl" + i + "_txdgMsgId"].value;

		if(DocNo != argDocNo)
			continue;
		
		bExist = true;
		break;
	}
	
	return bExist;
}

function fnSetInfoForDocNo(argDocNo)
{
	var retMsgId = "";

	var ouId = "";
	var ouName = "";
	var roleId = "";
	var roleName = "";
	var userId = "";
	var userName = "";

	//處理擬辦設定	
	var valCloseF = "Y";
	var valCaseCon = "N";
	var valCloseType = "";

	if(document.all.rbO.checked)
		valCloseType	= "1";
	else if(document.all.rbU.checked)
		valCloseType	= "2";
	else if(document.all.rbSave.checked)
		valCloseType	= "3";
	else
		valCloseType	= "";

	if(document.all.rbCustomOu.checked)
	{
		var ouIdx = document.all.ddlFlowUnit.selectedIndex;
		ouName = document.all.ddlFlowUnit[ouIdx].textContent;
		ouId = document.all.ddlFlowUnit[ouIdx].value;
		var roleIdx = document.all.ddlFlowRole.selectedIndex;
		
		//若為二層式登紀桌架構則需判斷是否選擇二級單位
		if (bShowSubUnit == "Y")
		{
			if (document.all.trFlowSubUnit.className == "")
			{
				var iIdx = document.all.ddlFlowSubUnit.selectedIndex;
				//1071008 David 修正若二級單位未選擇時，不取二級單位資訊
				if(iIdx > 0)
				{
					var SectId = document.all.ddlFlowSubUnit[iIdx].value;
					var SectName = document.all.ddlFlowSubUnit[iIdx].textContent;
					if (SectId != ouId)
					{
						ouId = SectId;
						ouName = SectName;
					}
				}
			}
		}

		if(roleIdx==-1)
		{
			roleName = "";
			roleId = "";
		}
		else
		{
			roleName = document.all.ddlFlowRole[roleIdx].textContent;
			if(roleName.indexOf("-")!=-1)
			{
				var temp = roleName;
				roleName = GetSplitStr(temp,"-",1);
				ouName = GetSplitStr(temp,"-",0);
			}

			roleId = document.all.ddlFlowRole[roleIdx].value;
			if(roleId.indexOf("|")!=-1)
			{
				var temp = roleId;
				roleId = GetSplitStr(temp,"|",1);
				ouId = GetSplitStr(temp,"|",0);
			}
		}

		var userIdx	= document.all.ddlFlowUser.selectedIndex;
		if(userIdx==-1)
		{
			userName = "";
			userId = "";
		}
		else
		{
			userName = document.all.ddlFlowUser[userIdx].textContent;
			userId = document.all.ddlFlowUser[userIdx].value;
		}
	}

	for(var i = 2; i <= document.all.dg1.rows.length; i++)//依序將資料寫入
	{
		var DocNo = document.all["dg1__ctl" + i + "_lbdgDocNo"].textContent;
		var MsgId = document.all["dg1__ctl" + i + "_txdgMsgId"].value;

		//1121218	Joe		序343	傳送成功不提供再次選取
		if(document.all["dg1__ctl" + i + "_cbDgSend"].disabled == true)
			continue;
		
		if(DocNo != argDocNo)
			continue;

		//紀錄勾選的公文INDEX
		AddDocIndex(i,"1");

		document.all["dg1__ctl" + i + "_cbDgSet"].checked = true;

		if(!document.all.cbSet.checked)
			continue;

		var sDocState = document.all["dg1__ctl" + i + "_txdgDocState"].value;
		if(valCloseType != "" && sDocState < "10") //非原設定時才變更發文設定
		{
			document.all["dg1__ctl" + i + "_txdgCloseType"].value = valCloseType;
			document.all["dg1__ctl" + i + "_lbdgCloseType"].textContent = TranslateProc(valCloseType);
		}
		else
		{
			if(document.all["dg1__ctl" + i + "_txdgCloseType"].value == "")
			{
				document.all["dg1__ctl" + i + "_txdgCloseType"].value = "1";
				document.all["dg1__ctl" + i + "_lbdgCloseType"].textContent = TranslateProc("1");
			}
		}

		fnSetInfoForCurrentRec(i);

		if(document.all.rbInchargeOu.checked || document.all.rbRejectOu.checked)
		{
			ouId = document.all["dg1__ctl" + i + "_txdgInCharge"].value.substring(0,2);
			ouName = document.all["dg1__ctl" + i + "_txdgIcOuName"].value;

			//傳送至"原承辦單位"修改成"原承辦單位/原承辦人"
			var flowOwnOuId = document.all["dg1__ctl" + i + "_txdgOwnOuId"].value.substring(0,2);
			if(flowOwnOuId == ouId) //目前流程單位與原承辦單位在同一單位內則直接退回原承辦人
			{
				roleId = "";
				roleName = "";
				userId = document.all["dg1__ctl" + i + "_txdgIcUserId"].value;
				userName = document.all["dg1__ctl" + i + "_txdgIcUserName"].value;
			}
			else //目前流程單位與原承辦單位在不同單位則退回原承辦單位登紀桌
			{
				roleId = "OD17";
				roleName = "登紀桌";
				userId = "";
				userName = "";
			}
		}

		fnProcPaperFlow(i, ouId, ouName, roleId, roleName, userId,	userName);	

		var txName = document.all["dg1__ctl" + i + "_txdgTxName"].value;
		if(txName == "")
			document.all["dg1__ctl" + i + "_lbDgStatus"].textContent = "無法判定異動別";
		else
			document.all["dg1__ctl" + i + "_lbDgStatus"].textContent = "";
	}
}

function fnCheckForSet2(argDocNo)
{
	var strMsg = "";

	for(var i = 2; i <= document.all.dg1.rows.length; i++)//依序將資料寫入
	{
		var DocNo = document.all["dg1__ctl" + i + "_lbdgDocNo"].textContent;

		//1121218	Joe		序343	傳送成功不提供再次選取
		if(document.all["dg1__ctl" + i + "_cbDgSend"].disabled == true)
			continue;

		if(DocNo != argDocNo)
			continue;

		var msg = fnCheckRecord(i, argDocNo);
		if(msg != "")
		{
			msg += "\n";
			strMsg +="無法設定公文文號["+argDocNo+"]";
			strMsg +=msg;
			//取消設定傳送
			document.all["dg1__ctl" + i + "_cbDgSend"].checked = false;
			document.all["dg1__ctl" + i + "_cbDgSet"].checked = false;
		}
		else
		{
			document.all["dg1__ctl" + i + "_cbDgSend"].checked = true;
			document.all["dg1__ctl" + i + "_cbDgSet"].checked = false;
		}
		strMsg = msg;
		break;
	}
	return strMsg;
}