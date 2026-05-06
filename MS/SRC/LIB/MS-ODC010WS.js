/*
DATE	SA		PRG		MGR_NO	DESC
1030922	Yvonne	Kevin	1040010	新增MS-ODC010WS
1050729	David	David	1050087	二代修改
1060203	David	David	1060004	如公文有做過專案申請核可，將核可過的業務類別帶入清單
1060223	David	David	-------	修正B_TYPE_NO來源，應由ODWDCM取得
1060609	David	David	1060295	檢核可否設定併案陳核WS改回傳物件，調整處理邏輯
1061108	David	David	1061074	限辦日期計算邏輯需順延至工作日才呼叫GetUnHoliday()
1070530	David	David	-------	修正WsGetClsInfo()及fnClsRtn()回傳值錯誤問題
1070817	Kevin   Zen     1070678	弱掃XSS修正
1071214	David	David	1071179	分類號檢核新增依公文製作檢核保存年限邏輯處理
1080927	Kevin	David	1080339	jQuery升級3.4.1改寫語法
1081121	Kevin	David	1080339	jQuery升級3.0，呼叫WS後.then()改成一律為非同步處理，如後續有其他處理邏輯會造成異常，調整呼叫方式改為.pipe()
1090102	David	David	1090001	分類號檢核改呼叫GetCKAByYear
1090914	David	David	1090557	新增信保欄位OnBlurWS處理
1091124	Kevin	David	1090850	調整業務類別可用單位判斷邏輯
1100408	David	David	1100192	需由分類號帶出保存年限，且有對應的保存年限時才帶入
1101125	David	David	1101328	新增取得計量單位WS處理
1120922	Kevin	David	1111200	更新組織結構移除實體資源檔，改由timelibws.GetRsrcData取得資料
1121031	David	David	-------	紙本rule物件新增紀錄METADATA_M內的RCVMODE屬性
1121218	David	David	1120821	ws_ComNoClsNo()新增傳入目前公文文號
1130119	David	David	1120995	分類號檢核時，判斷啟用顯示案次號才設定回傳的案次號
1130514	David	David	1120995	修正公文基資案次號預帶判斷邏輯
1131205	David	David	1131143	修正設定併案文號後觸發分類號檢核時，如有預帶母文案次號，不需清空案次號資料
1140718	Joe		Joe		1140937	新增文稿編輯支援傳入創簽類型
*/

//async = 非同步
//rtn.ErrorClass.IsErr

/*
 *  由localStorage['orgInfo_$orgNo$']取得指定機關代碼的XML DOM object (This is a SSOUtil method)
 *  參數: orgNo, 機關代碼
 *  回傳值:
 *	orgInfo: XML DOM object for orgInfo
 * (This is a SSOUtil method)
 */

function CallWsExample(params, dfd) {
	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('timelibws'), 'EXAMPLE', null, params, false, function (rtn, xml) {
	
		console.log(rtn, xml);
		if (rtn.ErrorClass.IsErr == 'false') {

			if (g_QueryDeferred) {
				g_QueryDeferred.resolve({ success: true, wsRtnobj: rtn });
				g_QueryDeferred = null;
			}
		}
		else {
			if (g_QueryDeferred) {
				g_QueryDeferred.reject({ success: false, errMsg: rtn.ErrorClass.ErrMessage.anyType });
				g_QueryDeferred = null;
			
			}
		}
	});
	
	if (dfd) {
		return dfd.promise();
	}
	return null;
}

//取得UIXML資源檔
function WsGetUIInfo()
{
	var theSSOMenuRuleObj;
	if(gObj.uSignType == "E")
		theSSOMenuRuleObj = theSSO.menuRuleAOL;
	else
		theSSOMenuRuleObj = theSSO.menuRulePDoc;

	for (var i = 0 ; i < theSSOMenuRuleObj.length ; i++)
	{
		if(gObj.uOrgNo == theSSOMenuRuleObj[i].orgNo)
		{
			gObj.uMetaMode = theSSOMenuRuleObj[i].getRule(gObj.uFolder, gObj.uSubFolder).metaDataM;
			if(gObj.uSignType == "P")
			{
				gObj.gPDocWebPage = theSSOMenuRuleObj[i].getRule(gObj.uFolder, gObj.uSubFolder).webPage;
				gObj.gPDocWebPageMode = theSSOMenuRuleObj[i].getRule(gObj.uFolder, gObj.uSubFolder).webPage_Mode;
				//1121031 David 新增紀錄METADATA_M內的RCVMODE屬性
				gObj.uRcvMode = theSSOMenuRuleObj[i].getRule(gObj.uFolder, gObj.uSubFolder).RcvNode;
			}
			else
			{
				gObj.gEDocWebPage = theSSOMenuRuleObj[i].getRule(gObj.uFolder, gObj.uSubFolder).webPage;
			}
			break;
		}
	}
}

//讀取XML資源檔-有暫存之寫法，暫不使用
function WsGetCategoryDll() {

	var sOrgInfoXML = window.localStorage['DOC_CATEGORY_' + gObj.uOrgNo];

	if (typeof sOrgInfoXML === 'undefined') {
		fnGetCategoryInfo();
	}
	//orgInfoDoc.children.length
	if (!!sOrgInfoXML && sOrgInfoXML.length) {
		var parser = new DOMParser();
		var orgInfoDOM = parser.parseFromString(sOrgInfoXML, 'text/xml');
		var orgInfoDoc = orgInfoDOM.documentElement;

		$('#dlDocCategory').empty();

		for (var i = 0 ; i < orgInfoDoc.children.length; i++) {
			var val = orgInfoDoc.children[i].children[0].textContent;
			var text = orgInfoDoc.children[i].children[1].textContent;
			$('#dlDocCategory').append(new Option(text, val));
		}

		$('#dlDocCategory').selectmenu('refresh');
	}
	return null;
}

//取得XML資源檔
function fnGetMsResource(Type, Path, Dll) {

	//1120922 David 1111200 更新組織結構移除實體資源檔，改由timelibws.GetRsrcData取得資料
	/*var filename = Type + '_' + gObj.uOrgNo + '.xml';
	var ls_id = Type + '_' + gObj.uOrgNo;

	var wfio = new WebFileIO(SSO_CONFIG.getWSUrl('fileiows'), '', localStorage.Artifact);
	var serverPath = SSO_CONFIG.getRsrcServerPath(Path, gObj.uOrgNo);
	wfio.download(serverPath, filename, {
		async: false,
		success: function (rslt, res) { //
			if (rslt !== undefined) {
				$(Dll).empty();
				
				$items = $(rslt).find('item');
				var len = $items.length;
				for (i = 0; i < len; i++) {
					// method1
					var $item = $($items[i]);
				    //1070817 Zen 1070678 弱掃XSS修正--begin
					//var value = $item.children('value').text();
				    //var text = $item.children('text').text();
					var value = HtmlEncode($item.children('value').text());
					var text = HtmlEncode($item.children('text').text());
				    //1070817 Zen 1070678 弱掃XSS修正--end

					$(Dll).append(new Option(text, value));
				}

				$(Dll).selectmenu('refresh');
				// method2
				//var item = $items[i];
				//var value = SSOUtil.xml_getChildNodeValue(item, 'value'); }
			}
			else {
				console.log("WebFileIO呼叫成功但夾檔資料未下載");
			}
		},
		error: function (errorText) { //
			console.log(errorText);
		}
	});*/

	let TypeMain = "";
	if(Type == "DOC_CATEGORY")
		TypeMain = "GenDocCategory";
	else if(Type == "DOC_PROPERTY")
		TypeMain = "GenDocProperty";

	let sCacheName = Type + "_" + gObj.uOrgNo;
	let sDllXmlstr = "";
	if (typeof window.localStorage[sCacheName] === 'undefined')
	{
		let params = new SOAPClientParameters();
		params.add('argArtifact', localStorage.Artifact);
		params.add('argTypeMain', TypeMain);
		params.add('argTypeDetail', "");
		params.add('argSourceOrgNo', gObj.uOrgNo);

		SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl('timelibws'), 'GetRsrcData', params, false, function (r)
		{
			if('value' in r)
				r = r.value;
			if (!r.ErrorClass.IsErr)
			{
				if (r.RtnStr !== undefined ) {
					sDllXmlstr = r.RtnStr;
					window.localStorage[sCacheName] = sDllXmlstr;
				}
				else
					console.log("取得資源檔異常");
			}
			else
				console.log(r.ErrorClass.ErrMessage[0]);
		});
	}
	else
		sDllXmlstr = window.localStorage[sCacheName];

	if(sDllXmlstr != "")
	{
		$(Dll).empty();

		$items = $(sDllXmlstr).find('item');
		var len = $items.length;
		for (i = 0; i < len; i++)
		{
			var $item = $($items[i]);
			var value = HtmlEncode($item.children('value').text());
			var text = HtmlEncode($item.children('text').text());

			$(Dll).append(new Option(text, value));
		}

		$(Dll).selectmenu('refresh');
	}
}

//取得辦理階段
function WsGetStepName()
{
	return true; //新版未實作
	
	// if($('#dlWorkType option:selected').val() == '')
		// return;
	// //呼叫CASE_WS取得該業務類別下，所有辦理階段
	// var paramsGetBTypeStep = {
		// "argSessionID"		: localStorage.Artifact,
		// "argSourceOrgNo"	: gObj.uOrgNo,
		// "argCaseNo"			: document.all.txCaseNo.value,
		// "argBType"			: $('#dlWorkType option:selected').val()
	// };
	
	// window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "GetBTypeStep", null, paramsGetBTypeStep, false, function(rtn,xml){//
		// console.log(rtn, xml);
		
		// $('#dlStepName').empty();
		// if (rtn.ErrorClass.IsErr != "false" || rtn.RtnStr == '') {
			// $('#dlStepName').get(0).disabled = true;
			// $('#dlStepName').get(0).options.add(new Option('', '')); //第一筆空白
			// return false;
		// }

		// if (rtn.RtnStr != '') {
			// $('#dlStepName').get(0).disabled = false;

			// var pTmpAry = rtn.RtnStr.split(":");

			// //將值塞入 dlStepName
			// if (pTmpAry.length > 1)
				// $('#dlStepName').get(0).options.add(new Option('', '')); //第一筆空白
			// for (var i = 0; i < pTmpAry.length; i++) {
				// var objOption = new Option(pTmpAry[i], pTmpAry[i]);
				// $('#dlStepName').get(0).options.add(objOption);
			// }

			// if (pTmpAry.length == 1) {
				// $('#dlStepName').get(0).selectedIndex = 0;
			// }
		// }
		// return true;
	// }); 
}

function WsGetWorkDate()
{
	if ($('#txLeadTime').val() == '')// || $('#txLeadTime').val() == '0')
	{
		$('#txDueDate').val('');
		return;
	}

	var param = new Array(5);

	if (gObj.gtxLtBy == "M") //依開會日期計算
		param[0] = $('#txMeetDate').val();
	else
		param[0] = $('#txStartDate').val();

	//計算限辦日期
	if (gObj.gtxLtBy == "S") //依速別計算
	{
		if ($('#dlSpd')[0].selectedIndex == -1)
			return;
		if ($('#dlSpd option:selected').val() == '')
			return;

		//依速別計算時不可選擇代碼4
		if($('#dlSpd option:selected').val() == "4")
		{
			alert("目前業務類別是依照速別計算限辦日期，速別不可選擇「4.」。");
			UiSetDlItemByValue("dlSpd", gObj.gSpdNo);
			return;
		}

		var draftSpdNo = theSSO.User.EnvSettings.get("OD_DRAFT_SPD_NO");
		//caesar 0931224
		//因應中企處要求
		//如果是創稿,則限辦日期一律24天
		//邏輯
		//	來文						-->依速別取work_date
		//	創稿且環境變數為空白		-->依速別取work_date
		//	創稿且環境變數不為空白		-->速別給4,取work_date(PROCESS_DAY中,SPD_NO=4之辦理天數設定24天)
		if ($('#cbNewByOu')[0].checked == false) {
			param[1] = $('#dlSpd option:selected').val(); //速別
		}
		else if (draftSpdNo == '') {
			param[1] = $('#dlSpd option:selected').val(); //速別
		}
		else {
			param[1] = draftSpdNo;
		}
	}
	else if (gObj.gtxLtBy == "M") { //依開會日期計算
		param[1] = $('#txLeadTime').val(); //使用者輸入的Lead_time
	}
	else if (gObj.gtxLtBy == "I") { //使用者輸入 -> read txLeadTime
		param[1] = $('#txLeadTime').val(); //使用者輸入的Lead_time
	}
	else if (gObj.gtxLtBy == "B") { //依資料庫Lead_time -> read gtxLeadTimeDB
		param[1] = gObj.gtxLeadTimeDB; //本筆資料的Lead_time
	}
	else {
		return;
	}
	
	if (gObj.gtxLtIncHd == "Y") //含假日
		param[3] = "1";
	else if (gObj.gtxLtIncHd == "H")//扣抵連修
		param[3] = "3";
	else //不含假日
		param[3] = "2";

	var paramsGetWorkDate = {
		"argSessionID": localStorage.Artifact
		,"argSDATE": param[0]
		,"argKey": param[1]
		,"argLtBy": gObj.gtxLtBy
		,"argLtIncHd": param[3]
		,"argLtUom": $('#dlLtUom option:selected').text()
	};
	
	var _dfd = $.Deferred();
	g_QueryDeferred = _dfd;
	CallGetWorkDate(paramsGetWorkDate, _dfd)
	//1081121 David 1080339 .then()改為.pipe()
	//.then(function (rtn)
	.pipe(function (rtn)
	{
		$('#txDueDate').val(rtn.WorkDate);
		if (gObj.gtxLtBy == "S")
			$('#txLeadTime').val(rtn.LeadTime);
	})
	.fail(function () {
		return;
	});

	var iFullAddTime = fnGetFullAddTime("1");//取得補充天數，算補充天數時起算日(第一次算出之限辦日)不算一天補一天回去
	
	//算出原始限辦日期後，再加上補充天數算出最終限辦日期
	if(iFullAddTime != 0)
	{
		paramsGetWorkDate = {
			"argSessionID": localStorage.Artifact
			,"argSDATE": $('#txDueDate').val()
			,"argKey": iFullAddTime
			,"argLtBy": "I"
			,"argLtIncHd": param[3]
			,"argLtUom": "天"
		};
		
		var dfdGetWorkDate2 = $.Deferred();
		g_QueryDeferred = dfdGetWorkDate2;
		CallGetWorkDate(paramsGetWorkDate, dfdGetWorkDate2)
		//1081121 David 1080339 .then()改為.pipe()
		//.then(function (rtn)
		.pipe(function (rtn)
		{
			$('#txDueDate').val(rtn.WorkDate);
		})
		.fail(function () {
			return;
		});
	}

	//如業務類別限辦日期計算邏輯需順延至工作日，呼叫GetUnHoliday()取得限辦日期
	//1061108 David 1061074 補上判斷需順延再呼叫
	if(gObj.gtxDueRule == "Y")
	{
		var paramGetLastDueDate = {
			"argSessionID": localStorage.Artifact
			,"argSDATE": $('#txDueDate').val()
			,"argDAY": 0
			,"argType": "1"
			,"argDueRule": gObj.gtxDueRule
			,"argDeptNo": _rsltODWMSG['INCHARGE_OU']
			,"argStartDate": param[0]
			,"argDocNo": $('#txDocNo').val()
		};
			
		var dfdGetLastDueDate = $.Deferred();
		g_QueryDeferred = dfdGetLastDueDate;
		CallGetLastDueDate(paramGetLastDueDate, dfdGetLastDueDate)
		//1081121 David 1080339 .then()改為.pipe()
		//.then(function (rtn)
		.pipe(function (rtn)
		{
			$('#txDueDate').val(rtn.RtnWorkDate);
		})
		.fail(function () {
			return;
		});
	}

	//紀錄目前速別
	gObj.gSpdNo = $('#dlSpd option:selected').val();
}

function CallGetWorkDate(params, dfd)
{
	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('timelibws'), "GetWorkDate", null, params, false, function (rtn, xml)
	{
		console.log(rtn, xml);
	
		if(rtn.ErrorClass.IsErr == 'false')
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.resolve(rtn);
				g_QueryDeferred = null;
			}
		}
		else
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.reject();
				g_QueryDeferred = null;
			}
		}
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

//取得補充天數
function fnGetFullAddTime(argOriginalLeadTime)
{
	var iFullAddTime = 0;
	var fnGetFullLeadTimeparams = {
		"argSessionID": localStorage.Artifact
		,"argSourceOrgNo": gObj.uOrgNo
		,"argDocNo": $('#txDocNo').val()
		,"argLeadTime": argOriginalLeadTime
		,"argComNo": $('#txComNo').val()
		,"argSumType": $('#txSumType').val()
		,"argEnve": gObj.gOdDocPty5Mode
	};
	
	var _dfd = $.Deferred();
	g_QueryDeferred = _dfd;
	CallGetFullAddTime(fnGetFullLeadTimeparams, _dfd)
	//1081121 David 1080339 .then()改為.pipe()
	//.then(function (rtn)
	.pipe(function (rtn)
	{
		if(parseInt(rtn) != "NaN")
			iFullAddTime = parseInt(rtn);
	})
	.fail(function (){
	});

	return iFullAddTime;
}

function CallGetFullAddTime(params, dfd)
{
	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "fnGetFullLeadTime", null, params, false, function (rtn, xml)
	{
		console.log(rtn, xml);
		if(rtn != 0)
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.resolve(rtn);
				g_QueryDeferred = null;
			}
		}
		else
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.reject();
				g_QueryDeferred = null;
			}
		}
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

function CallGetLastDueDate(params, dfd)
{
	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "GetLastDueDate", null, params, false, function (rtn, xml)
	{
		console.log(rtn, xml);
	
		if (rtn.ErrorClass.IsErr == 'false')
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.resolve(rtn);
				g_QueryDeferred = null;
			}
		}
		else
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.reject();
				g_QueryDeferred = null;
			}
		}
	
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

//由公文性質取得業務類別
//GetBTypeNo
function WsGetWorkTypeDll(argDocProperty)
{
	var ss = '';

	//1120922 David 1111200 更新組織結構移除實體資源檔，改由timelibws.GetRsrcData取得資料
	/*var wfio = new WebFileIO(SSO_CONFIG.getWSUrl('fileiows'));

	var path = SSO_CONFIG.getRsrcServerPath('sso', gObj.uOrgNo);

	wfio.download(path, "BTYPE_" + gObj.uOrgNo + "_" + argDocProperty + ".txt", {
		async: false,
		success: function (fil, res) {//
			console.log("下載業務類別TXT...typeof fil = " + typeof (fil));
			ss = fil;
			console.log(fil, res);
		},
		error: function (status) {//
			console.log("下載業務類別TXT錯誤：" + status);
		},
	});*/
	let sCacheName = "BTYPE_" + gObj.uOrgNo + "_" + argDocProperty;
	if (typeof window.localStorage[sCacheName] === 'undefined')
	{
		let params = new SOAPClientParameters();
		params.add('argArtifact', localStorage.Artifact);
		params.add('argTypeMain', "GenBussinessType");
		params.add('argTypeDetail', argDocProperty);
		params.add('argSourceOrgNo', gObj.uOrgNo);

		SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl('timelibws'), 'GetRsrcData', params, false, function (r)
		{
			if('value' in r)
				r = r.value;
			if (!r.ErrorClass.IsErr)
			{
				if (r.RtnStr !== undefined ) {
					ss = r.RtnStr;
					window.localStorage[sCacheName] = ss;
				}
				else
					console.log("取得業務類別異常");
			}
			else
				console.log(r.ErrorClass.ErrMessage[0]);
		});
	}
	else
		ss = window.localStorage[sCacheName];

	console.log('取得業務類別ss=', ss);

	//$('#dlStepName').empty();
	$('#dlWorkType').empty();

	var pTmpAry = ss.split(";");

	if (pTmpAry.length == 0) {
		//$('#dlStepName').append(new Option('', ''));
		$('#dlWorkType').append(new Option('', ''));
	}

	//依照不同單位取業務類別
	var envGET_BTYPENO_BY_OU = theSSO.User.EnvSettings.get("GET_BTYPENO_BY_OU").toUpperCase();

	var INCHARGE = new String(_rsltODWMSG["INCHARGE_OU"]);
	//1091124 David 1090850 調整判斷
	//INCHARGE = INCHARGE.substring(0, 2);
	var strDeptNo = "";
	var strSectNo = "";
	if(INCHARGE != null && INCHARGE != "")
	{
		strDeptNo = INCHARGE.substring(0, 2);
		if(INCHARGE.length > 2)
			strSectNo = INCHARGE;
	}

	//1000126	Yvonne	FDA因為99年的部分業務類別於100年不使用或是不再給某些單位使用，但辦理中的公文還是要可以用那些業務類別
	//而目前有此類問題的公文多為綠標轉入公文，因應FDA要求進行下列調整：
	//若業務類別代碼為該單位不可用，系統還是要可以帶出該選項
	//(以免公文開啟時發生業務類別代碼與名稱無法對應及後續進行傳送/儲存後，會將業務類別異動為52，進而影響公文處理期限、限辦日期...之問題)
	//所以在初始化的時候先將該選項補add進去
	//1060223 David 修正B_TYPE_NO來源，應由ODWDCM取得
	//var B_TYPE_NO = new String(_rsltODWMSG["B_TYPE_NO"]);
	var B_TYPE_NO = new String(_rsltODWDCM["B_TYPE_NO"]);

	//將值塞入 dlWorkType
	for (var i = 0; i < pTmpAry.length; i++) {
		var pTmpAry2 = pTmpAry[i].split(",");

		var bAdd = false;

		if (envGET_BTYPENO_BY_OU == "Y") {
			//1091124 David 1090850 當業務類別可用對象為單位時，一級單位可使用全一級(含二級)資料，二級單位僅能使用二級資料
			/*if (pTmpAry2[2].replace(/\s/g, "") == gObj.uOrgNo)
				bAdd = true;
			else if (pTmpAry2[2].replace(/\s/g, "") == INCHARGE)
				bAdd = true;
			else if (pTmpAry2[0] == B_TYPE_NO)
				bAdd = true;
			//1060203 David 1060004 如公文有做過專案申請核可，將核可過的業務類別帶入清單
			else if(gObj.gbReturnCaseAppInfo && pTmpAry2[0] == theAOL.docObj.ODWDCM.CAM_B_TYPE_NO)
				bAdd = true;*/
			var BTypeNoUseOU = pTmpAry2[2].replace(/\s/g, "");
			if (BTypeNoUseOU == gObj.uOrgNo)//全機關使用
				bAdd = true;
			else if (strSectNo != "" && (strSectNo == BTypeNoUseOU || strDeptNo == BTypeNoUseOU))//承辦單位為二級單位，可用一級跟自己二級
				bAdd = true;
			else if (strSectNo == "" && strDeptNo == BTypeNoUseOU)//承辦單位為一級單位，僅可用一級
				bAdd = true;
			else if (pTmpAry2[0] == B_TYPE_NO)
				bAdd = true;
			//1060203 David 1060004 如公文有做過專案申請核可，將核可過的業務類別帶入清單
			else if(gObj.gbReturnCaseAppInfo && pTmpAry2[0] == theAOL.docObj.ODWDCM.CAM_B_TYPE_NO)
				bAdd = true;
		}
		else
			bAdd = true;

		if (bAdd)
			$('#dlWorkType').append(new Option(pTmpAry2[1], pTmpAry2[0]));
	}
	$('#dlWorkType').selectmenu('refresh');

	if (pTmpAry.length > 0)
	{
		ObjOnBlur(null, "dlWorkType");
	}
	else
	{
		//清除時效統計相關欄位
		UiClearTimeFields();
	}
	GetBTypeWebInfo();
}

//取得特定業務類別之WebServiceInfo
function WsGetBTypeWebInfo(params, dfd)
{
	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "GetBTypeInfo", null, params, false, function (rtn, xml)
	{
		console.log(rtn, xml);

		if (rtn.IsErr == "false" || rtn.RtnStr != "")
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.resolve(rtn.RtnStr);
				g_QueryDeferred = null;
			}
		}
		else
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.reject();
				g_QueryDeferred = null;
			}
		}
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

//新增由due_date計算lead_time的function
function WsCalcLeadtime() {
	if ($('#txStartDate').val() == '')
		return false;

	//有due_date, 則計算lead_time
	if ($('#txDueDate').val() == '')
		return false;

	//先判斷格式是否正確合理
	if (!jf_CheckCDATE($('#txDueDate').val())) {
		alert("限辦日期格式錯誤");
		return false;
	}
	else if ($('#txDueDate').val() < $('#txStartDate').val()) {
		alert("限辦日期必須大於起算日期");
		return false;
	}

	//通過檢核之後開始計算辦理日期
	var param = new Array(4);

	if (gObj.gtxLtBy == "M") //依開會日期計算
		param[0] = $('#txMeetDate').val();
	else
		param[0] = $('#txStartDate').val();

	param[1] = $('#txDueDate').val();

	if (gObj.gtxLtIncHd == "Y") //含假日
		param[2] = "1";
	else if (gObj.gtxLtIncHd == "H")//扣抵聯休
		param[2] = "3";
	else //不含假日
		param[2] = "2";

	var paramsGetWorkDays = {
		"argSessionID": localStorage.Artifact
		, "argSDATE": param[0]
		, "argDueDate": param[1]
		, "argLtIncHd": param[2]
	};

	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('timelibws'), "GetWorkDays", null, paramsGetWorkDays, false, function (rtn, xml)
	{
		console.log(rtn, xml);
		var strFullLeadTime = rtn.RtnStr;

		//取得補充天數
		var iFullAddTime = fnGetFullAddTime("");

		//依限辦日期計算辦理天數時，須扣除補充天數(展期+補件+外陳外會天數)		
		var iFullLeadTime = parseInt(strFullLeadTime) - iFullAddTime;

		$('#txLeadTime').val(iFullLeadTime);
		UiSetDlItemByValue("dlLtUom", "1");
	});
}

function WsGetClsInfo(argType)//新增由分類號帶分類號名稱
{
	if (jf_Trim($('#txClsNo').val()) == '') {
		$('#txClsName').val('');
		SetdlApplyLimit("1", '');
		return;
	}

	var param = new Array(4);
	param[0] = gObj.uOrgNo;
	param[1] = $('#txClsNo').val();
	param[2] = $('#dlSec option:selected').val();

	// 若公文製作有帶回年度號，則使用輸入之年度號。
	if ($('#txFileYear').val() != '')
		param[3] = $('#txFileYear').val();
	else //年度號無值時，又無公文文號，取當年度作為年度號
	{
		if (jf_Trim($('#txDocNo').val()) != '')
			param[3] = $('#txDocNo').val().substr(0, 3);
		else
			param[3] = '';

		if (param[3] == '') {
			var dttoday = new Date();
			var newYear = dttoday.getFullYear() - 1911;
			newYear = newYear + '';
			newYear = jf_PADL(newYear, 3, "0");
			param[3] = newYear;
		}
		$('#txFileYear').val(param[3]);
	}

	//1090102 David 1090001 上面已完成設定，此處不需要
	/*if (jf_Trim($('#txDocNo').val()) != '')
		param[3] = $('#txDocNo').val().substr(0, 3);
	else
		param[3] = '';*/

	//新增中企處案次號欄位處理，若環境變數OD_CHECK_FILE_CASE設Y，則改為呼叫GetCKAndCaseNo以取得案次號
	//環境變數OD_CHECK_FILE_CASE(顯示案次號欄位)改為機關通用，原中企處特殊行為改以機關代碼區隔。
	//1070530 David 修正回傳值錯誤問題
	var rtnValue = false;
	if (gObj.gFileCaseDisplay == "Y" && gObj.uOrgNo.substring(0, 10) == '313050000G')
	{
		var paramsGetCKAndCaseNo = {
			"argSessionID": localStorage.Artifact,
			"argSourceOrgNo": gObj.uOrgNo,
			"argClsNo": param[1],
			"argSecNo": param[2],
			"argYearNo": param[3]
		};

		window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "GetCKAndCaseNo", null, paramsGetCKAndCaseNo, false, function (rtn, xml) {
			console.log(rtn, xml);

			//1070530 David 修正回傳值錯誤問題
			//return fnClsRtn(rtn, xml, argType);
			rtnValue = fnClsRtn(rtn, xml, argType);
		});
	}
	else
	{
		//1090102 David 1090001 分類號檢核改呼叫GetCKAByYear
		/*var paramsGetCKA = {
			"argSessionID": localStorage.Artifact,
			"argSourceOrgNo": gObj.uOrgNo,
			"argClsNo": param[1]
		};*/
		var paramsGetCKAByYear = {
			"argSessionID": localStorage.Artifact
			,"argSourceOrgNo": gObj.uOrgNo
			,"argYear": param[3]
			,"argClsNo": param[1]
		};

		//1090102 David 1090001 分類號檢核改呼叫GetCKAByYear
		//window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "GetCKA", null, paramsGetCKA, false, function (rtn, xml) {
		window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "GetCKAByYear", null, paramsGetCKAByYear, false, function (rtn, xml) {
			console.log(rtn, xml);

			//1070530 David 修正回傳值錯誤問題
			//return fnClsRtn(rtn, xml, argType);
			rtnValue = fnClsRtn(rtn, xml, argType);
		});
	}
	//1070530 David 修正回傳值錯誤問題
	return rtnValue;
}

function fnClsRtn(rtn, xml, argType)
{
	if (rtn.ErrorClass.IsErr == 'false')
	{
		//1071214 David 1071179 檢核線上簽核保存年限是否符合
		if(argType != "0")//非初始化才檢核
		{
			var strEkeepYear = theSSO.User.EnvSettings.get("OD_ESIGN_KEEPYEAR");
			if(gObj.uSignType == "E" && strEkeepYear != "" && rtn.KeepYear != "")
			{
				var iEKeepYear = parseInt(strEkeepYear);
				var iKeepYear = parseInt(rtn.KeepYear);
				if((!isNaN(iEKeepYear)) && (!isNaN(iKeepYear)) && iEKeepYear != 0)
				{
					if(iEKeepYear<iKeepYear)
					{
						alert("分類號："+$('#txClsNo').val()+"保存年限大於線上簽核公文規定之保存年限("+strEkeepYear+"年)，不宜以線上簽核處理。已更回原分類號");

						$('#txClsNo').val(gObj.gNowClsNo);
						$('#txKeepYear').val(gObj.gNowKeepYear);
						if (gObj.gFileCaseDisplay == "Y" && gObj.gNowFileCaseNo != "")
							$('#txFileCaseNo').val(gObj.gNowFileCaseNo);

						return false;
					}
				}
			}
		}

		$('#txClsName').val(rtn.ClsName);
		SetdlApplyLimit("2", rtn.ApplyLimit);

		if (argType == "0") //初始化
			return true;

		//1100408 David 1100192 調整邏輯，需要帶入保存年限時再執行相關功能，不直接回傳避免後續與保存年限無關的功能未執行
		//如果保存年限有值則不做帶出年限的動作
		//if (theSSO.User.EnvSettings.get("OD_ODC010_CLSNO_BLUR_KEEPYEAR") == 'Y')
			//return true;
		if (theSSO.User.EnvSettings.get("OD_ODC010_CLSNO_BLUR_KEEPYEAR") != 'Y')
		{
			//1100408 David 1100192 未回傳保存年限時不需帶入
			if(rtn.KeepYear != "")
				$('#txKeepYear').val(rtn.KeepYear);

			//因應消防署要求,若輸入之分類號無保存年限代表不合法,要求使用者重新輸入
			if (rtn.KeepYear == '') {
				if (theSSO.User.EnvSettings.get("OD_CLS_RULE") == '1') {
					alert('您輸入之分類號,無對應之保存年限,請重新輸入分類號');
					//1080927 David 1080339 jQuery升級3.4.1改寫語法
					//$('#txClsNo').focus();
					$('#txClsNo').trigger("focus");
					return false;
				}
			}
		}

		//新增分類號OnBlur時，若回傳之案次號有值則顯示至畫面上
		//1130119 David 1120995 判斷啟用顯示案次號時，才設定回傳的案次號
		//if (rtn.CASE_NO != '')
		//1130514 David 1120995 判斷分類號有異動，才連動案次號
		//if (gObj.gFileCaseDisplay == "Y" && rtn.CASE_NO != '')
			//$('#txFileCaseNo').val(rtn.CASE_NO);
		if(gObj.gFileCaseDisplay == "Y" && !gObj.gFirstLoadPage && gObj.gNowClsNo != $('#txClsNo').val())
		{
			//1131205 David 1131143 由併案文號觸發分類號檢核時，因案次號會預帶母文案次號，故不需清空案次號資料
			if(event && event.target.id == "txComNo")
			{
				//do nothing
			}
			else
			{
				//更換分類號後，如原有的案次號欄位有值，先清空
				if($('#txFileCaseNo').val() != '')
					$('#txFileCaseNo').val("");

				//WS有回傳案次號時，再設定至畫面欄位
				if(rtn.CASE_NO != '')
					$('#txFileCaseNo').val(rtn.CASE_NO);
			}
		}

		//1070530 David 修正回傳值錯誤問題
		var rtnValue = true;
		//增加判斷環境變數設定決定是否檢核併案文號之分類號for藥檢局
		var strCheckComNoClsSetting = theSSO.User.EnvSettings.get("OD_ODC010_CHECK_COM_NO_CLS");
		if (jf_Trim($('#txComNo').val()) != '' && strCheckComNoClsSetting.toUpperCase() == "Y")
		{
			var paramsws_ComNoClsNo = {
				"argArtifact": localStorage.Artifact,
				"argSourceOrgNo": gObj.uOrgNo,
				"argComNo": $('#txComNo').val(),
				"argClsNo": $('#txClsNo').val()
				//1121218 David 1120821 新增傳入目前公文文號
				,"argDocNo": $('#txDocNo').val()
			};
			
			var _dfd = $.Deferred();
			g_QueryDeferred = _dfd;
			WsComNoClsNo(paramsws_ComNoClsNo, _dfd)
			//1081121 David 1080339 .then()改為.pipe()
			//.then(function ()
			.pipe(function ()
			{
				//1070530 David 修正回傳值錯誤問題
				//return true;
				rtnValue = true;
			})
			.fail(function (rtn)
			{
				alert(rtn);
				$('#txClsNo, #txClsName, #txFileCaseNo, #txFileCaseName').val('');
				//1080927 David 1080339 jQuery升級3.4.1改寫語法
				//$('#txClsNo').focus();
				$('#txClsNo').trigger("focus");
				//1070530 David 修正回傳值錯誤問題
				//return false;
				rtnValue = false;
			});
		}
		//1070530 David 修正回傳值錯誤問題
		//return true;
		return rtnValue;
	}
	else
	{
		if(rtn.ErrorClass.ErrMessage.anyType.text)
			alert(rtn.ErrorClass.ErrMessage.anyType.text);
		else
			alert(rtn.ErrorClass.ErrMessage.anyType);

		//分類號錯誤時，清空案次號欄位
		$('#txClsNo, #txClsName, #txFileCaseNo, #txFileCaseName').val('');
		//1080927 David 1080339 jQuery升級3.4.1改寫語法
		//$('#txClsNo').focus();
		$('#txClsNo').trigger("focus");
		return false;
	}
}

function WsComNoClsNo(params, dfd)
{
	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "ws_ComNoClsNo", null, params, false, function (rtn, xml)
	{
		console.log(rtn, xml);

		if (rtn == "")
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.resolve();
				g_QueryDeferred = null;
			}
		}
		else
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.reject(rtn);
				g_QueryDeferred = null;
			}
		}
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

function WsCheckKeepYear(params, dfd)
{

	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "CheckKeepYear", null, params, false, function (rtn, xml) {
		console.log(rtn, xml);

		if (rtn && rtn != '') {
			if (g_QueryDeferred) {
				g_QueryDeferred.resolve(rtn);
				g_QueryDeferred = null;
			}
		}
		else {
			if (g_QueryDeferred) {
				g_QueryDeferred.reject();
				g_QueryDeferred = null;
			}
		}
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

function WsGetWorkDays(params, dfd) {
	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('timelibws'), 'GetWorkDays', null, params, false, function (rtn, xml) {

		console.log(rtn, xml);

		if (rtn.ErrorClass.IsErr == 'false') {

			if (g_QueryDeferred) {
				g_QueryDeferred.resolve(rtn);
				g_QueryDeferred = null;
			}
		}
		else
		{
			if (g_QueryDeferred)
			{
				if(rtn.ErrorClass.ErrMessage.anyType)
				{
					if(rtn.ErrorClass.ErrMessage.anyType.text)
						g_QueryDeferred.reject(rtn.ErrorClass.ErrMessage.anyType.text);
					else
						g_QueryDeferred.reject(rtn.ErrorClass.ErrMessage.anyType);
				}
				else
					g_QueryDeferred.reject(rtn.ErrorClass.ErrMessage);
				g_QueryDeferred = null;
			}
		}
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

function WsCheckDocCaseByBTypeUrl(params, dfd)
{
	window.theWebServices.invokeWS(gObj.gBTypeUrl_WebService, "CheckDocCase", null, params, false, function (rtn, xml) {
		console.log(rtn, xml);

		if (rtn.m_bSuccess == "false" || rtn.m_strMsg != "") //m_strMsg = 查無相關案件編號
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.reject();//回傳reject 表示不存在
				g_QueryDeferred = null;
			}
		}
		else
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.resolve();//回傳resolve 表示存在案號
				g_QueryDeferred = null;
			}
		}
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

function WsCheckDocCase(params, dfd) {

	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "CheckDocCase", null, params, false, function (rtn, xml) {

		console.log(rtn, xml);

		if(rtn.IsErr == "true" || rtn.CaseNo == "")
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.reject();//回傳reject 表示不存在
				g_QueryDeferred = null;
			}
		}
		else
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.resolve();//回傳resolve 表示存在案號
				g_QueryDeferred = null;
			}
		}
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

function WsGetDocInfo(params, dfd) {
	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "GetDocInfo", null, params, false, function (rtn, xml) {
		console.log(rtn, xml);

		if (rtn.ErrorClass.IsErr == 'false')
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.resolve(rtn);
				g_QueryDeferred = null;
			}
		}
		else
		{
			if(rtn.ErrorClass.ErrMessage.anyType)
			{
				if(rtn.ErrorClass.ErrMessage.anyType.text)
					g_QueryDeferred.reject(rtn.ErrorClass.ErrMessage.anyType.text);
				else
					g_QueryDeferred.reject(rtn.ErrorClass.ErrMessage.anyType);
			}
			else
				g_QueryDeferred.reject(rtn.ErrorClass.ErrMessage);
			g_QueryDeferred = null;
		}
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

function WsUpdateComClsCase(params, dfd) {

	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "UpdateComClsCase", null, params, false, function (rtn, xml) {
		console.log('UpdateComClsCase', rtn, xml);

		if (rtn.m_bSuccess == 'true')
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.resolve();
				g_QueryDeferred = null;
			}
		}
		else
		{
			if (g_QueryDeferred)
			{
				if(rtn.ErrorClass.ErrMessage.anyType)
				{
					if(rtn.ErrorClass.ErrMessage.anyType.text)
						g_QueryDeferred.reject(rtn.ErrorClass.ErrMessage.anyType.text);
					else
						g_QueryDeferred.reject(rtn.ErrorClass.ErrMessage.anyType);
				}
				else
					g_QueryDeferred.reject(rtn.ErrorClass.ErrMessage);
				g_QueryDeferred = null;
			}
		}
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

function WsCheckCombine(params, dfd) {

	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "CheckCombine", null, params, false, function (rtn, xml) {
		console.log(rtn, xml);

		if (rtn.ErrorClass.IsErr == 'false' && rtn.IsCombine == 'true')
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.resolve(rtn);
				g_QueryDeferred = null;
			}
		}
		else
		{
			if (g_QueryDeferred)
			{
				if(rtn.ErrorClass.ErrMessage.anyType)
				{
					if(rtn.ErrorClass.ErrMessage.anyType.text)
						g_QueryDeferred.reject(rtn.ErrorClass.ErrMessage.anyType.text);
					else
						g_QueryDeferred.reject(rtn.ErrorClass.ErrMessage.anyType);
				}
				else
					g_QueryDeferred.reject(rtn.ErrorClass.ErrMessage);
				g_QueryDeferred = null;
			}
		}
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

function WsCheckDeptNoAndFromNo(params, dfd) {

	//1060609 David 1060295 檢核可否設定併案陳核WS改回傳物件，調整呼叫函式
	//window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "ws_CheckDeptNoAndFromNo", null, params, false, function (rtn, xml) {
	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "wsCheckCanCombine", null, params, false, function (rtn, xml) {
		console.log(rtn, xml);

		//1060609 David 1060295 檢核可否設定併案陳核WS改回傳物件，調整處理邏輯
		/*if (rtn != "")
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.resolve(rtn);
				g_QueryDeferred = null;
			}
		}
		else
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.reject();
				g_QueryDeferred = null;
			}
		}*/
		if(rtn.bSuccess == "true")
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.resolve(rtn);
				g_QueryDeferred = null;
			}
		}
		else
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.reject(rtn.ErrMsg);
				g_QueryDeferred = null;
			}
		}
	
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

function WsGetSumType(params, dfd) {

	//1140718	Joe		1140937		新增文稿編輯支援傳入創簽類型
	// window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('timelibws'), "GetSumType", null, params, false, function (rtn, xml) {
	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('timelibws'), "GetSumTypeForAll", null, params, false, function (rtn, xml) {
		console.log(rtn, xml);

		if (rtn.ErrorClass.IsErr == "false")
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.resolve(rtn);
				g_QueryDeferred = null;
			}
		}
		else
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.reject(rtn);
				g_QueryDeferred = null;
			}
		}

	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

function WsGBGetSyncInfo(params, dfd) {

	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('gblibws'), "GetSyncInfo", null, params, false, function (rtn, xml) {
		console.log(rtn, xml);

		if (rtn != "")
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.resolve(rtn);
				g_QueryDeferred = null;
			}
		}
		else
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.reject();
				g_QueryDeferred = null;
			}
		}
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

function WsUnitCanIssue(params, dfd) {

	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "UnitCanIssue", null, params, false, function (rtn, xml) {
		console.log(rtn, xml);

		if(rtn.m_bSuccess == "true" && rtn.m_strRetStr != "" && rtn.m_strRetStr != null)
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.resolve(rtn);
				g_QueryDeferred = null;
			}
		}
		else
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.reject();
				g_QueryDeferred = null;
			}
		}
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

function WsGetCodeTypeDesc(params, dfd) {

	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "GetCodeTypeDesc", null, params, false, function (rtn, xml) {
		console.log(rtn, xml);

		if(rtn.m_bSuccess == "true")
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.resolve(rtn);
				g_QueryDeferred = null;
			}
		}
		else
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.reject(rtn);
				g_QueryDeferred = null;
			}
		}
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

function WsGetMsgStatus(params, dfd) {

	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "fnGetMsgStatus", null, params, false, function (rtn, xml) {
		console.log(rtn, xml);

		var rtnData = rtn.split("|");
		if(rtnData.length == 5 && rtnData[1] == "" && rtnData[2] == "" && rtnData[3] == "" && rtnData[4] == "")
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.reject(rtnData[0]);
				g_QueryDeferred = null;
			}
		}
		else
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.resolve(rtn);
				g_QueryDeferred = null;
			}
		}
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

function WsGetCoOrgInfo()
{
	//1120922 David 1111200 更新組織結構移除實體資源檔，改由timelibws.GetRsrcData取得資料
	/*var strCoOrgList = "";
	var filename = "SENDOUT_COORG_LIST_" + gObj.uOrgNo + ".txt";

	var wfio = new WebFileIO(SSO_CONFIG.getWSUrl('fileiows'), '', localStorage.Artifact);
	var serverPath = SSO_CONFIG.getRsrcServerPath("SSO", gObj.uOrgNo);
	wfio.download(serverPath, filename, {
		async: false,
		success: function (fil, res) {//
			console.log("下載會簽機關資訊...typeof fil = " + typeof (fil));
			strCoOrgList = fil;
			console.log(fil, res);
		},
		error: function (status) {//
			console.log("下載會簽機關資訊錯誤：" + status);
		}
	});
	
	return strCoOrgList;*/
	let strCoOrgList = "";
	let sCacheName = "SENDOUT_COORG_LIST_" + gObj.uOrgNo;
	if (typeof window.localStorage[sCacheName] === 'undefined')
	{
		let params = new SOAPClientParameters();
		params.add('argArtifact', localStorage.Artifact);
		params.add('argTypeMain', "GenCoworkOrg");
		params.add('argTypeDetail', "");
		params.add('argSourceOrgNo', gObj.uOrgNo);

		SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl('timelibws'), 'GetRsrcData', params, false, function (r)
		{
			if('value' in r)
				r = r.value;
			if (!r.ErrorClass.IsErr)
			{
				if (r.RtnStr !== undefined ) {
					strCoOrgList = r.RtnStr;
					window.localStorage[sCacheName] = strCoOrgList;
				}
				else
					console.log("取得會簽機關異常");
			}
			else
				console.log("取得會簽機關錯誤：" + rtn.ErrorClass.ErrMessage[0]);
		});
	}
	else
		strCoOrgList = window.localStorage[sCacheName];

	return strCoOrgList;
}

function WsGetOrgInfo(params, dfd) {

	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('WEOrgInfows'), "GetOrgInfo", null, params, false, function (rtn, xml) {
		console.log(rtn, xml);

		if (rtn.ErrorClass.IsErr == 'false')
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.resolve(rtn);
				g_QueryDeferred = null;
			}
		}
		else
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.reject(rtn.ErrorClass.ErrMessage.anyType);
				g_QueryDeferred = null;
			}
		}
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

//1090914 David 1090557 新增信保資料WS方法
function WsGetSmegInfo(WSName ,params, dfd)
{
	window.theWebServices.invokeWS(theSSO.User.SystemSets.get("SMEGWS_URL"), WSName, null, params, false, function (rtn, xml) {
		console.log(rtn, xml);

		if (rtn.Result == '0')
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.resolve(rtn);
				g_QueryDeferred = null;
			}
		}
		else
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.reject(rtn.Msg);
				g_QueryDeferred = null;
			}
		}
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

//1101125 David 1101328 新增取得計量單位WS處理
function WsGetAttachCntUnit(params, dfd)
{
	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "GetAttachCntUnit", null, params, false, function (rtn, xml) {
		console.log('GetAttachCntUnit', rtn, xml);

		if (rtn.m_bSuccess == 'true')
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.resolve(rtn.m_strRetStr);
				g_QueryDeferred = null;
			}
		}
		else
		{
			if (g_QueryDeferred)
			{
				g_QueryDeferred.reject(rtn.m_strErrMsg);
				g_QueryDeferred = null;
			}
		}
	});

	if (dfd) {
		return dfd.promise();
	}
	return null;
}

//1070817 Zen 1070678 弱掃XSS修正
function HtmlEncode(s)
{
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    return div.innerHTML;
}

//避免JS檔重複載入
(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("MS-ODC010WS.js").finish();
})();