/*
DATE	SA		PRG		MGR_NO	DESC
1030922	Yvonne	Kevin	1040010	新增MS-ODC010 辦理階段尚未處理
1050729	David	David	1050087	二代修改，辦理階段二代不實作
1051206	David	David	1051175	新增鐵工局已案管制案號檢核、及子文解除檢核
1051214	David	David	1050780	新增會議型式選單欄位
1051228	David	David	1051345	調整鐵工局會議型式檢核邏輯
1060110	David	David	-------	因DUE_DATE資料改由ODWDCM內取得，儲存時新增更新ODWDCM內資料
1060111	David	David	-------	檢核紙本併同歸檔數量，新增判斷SPECIAL_CHECK有G時再檢核(同流程傳送)
1060203	David	David	1060004	新增專案申請核可公文不可異動公文性質，業務類別及設定併案
1060217	David	David	-------	修正檢核案件編號邏輯與一代不同BUG
1060323	David	David	1060153	修正主旨儲存時需Trim處理
1060603	David	David	1060310	調整取消併案時的公文性質、業務類別連動處理
1060609	David	David	1060295	檢核可否設定併案陳核WS改回傳物件，調整處理邏輯
1060802	David	David	1060668	儲存前檢核DB內紀錄的DUE_DATE與目前基資檔內的DUE_DATE資料是否一致，不一致時顯示詢問訊息
1060808	David	David	1060698	新增併案相關檢核行為及錯誤處理
1060824	David	David	1060713	修正案次號欄位ID錯誤問題
1060915	David	David	1060889	修改線上簽核密件公文判斷邏輯
1060920	David	David	1060658	修正應用限制連動處理未考慮密等公文問題
1060920	David	David	1060664	調整txDueDate欄位可否異動邏輯
1061024	David	David	1060953	(鐵工局)新增彙辦欄位處理
1061108	David	David	1061074	新增文別連動處理
1061212	David	David	1061250	併案文號欄位開放異動判斷透過共用函式處理
1061222	David	David	1061170	修正應用限制欄位未正確儲存問題
1061228	David	David	-------	如APPLY_LIMIT為空，依環境變數給予預設值
1070301	David	David	1070049	新增鐵工局需求：1.列管公文不可為子文。2.母文為列管公文時，解併時將目前公文調整成一般公文
1070530	David	David	-------	修正母文分類案次號更新成功處理
1071105	David	David	1071076	新增環境變數MS_KEY_CASECLS邏輯處理
1071214	David	David	1071179	分類號檢核新增依公文製作檢核保存年限邏輯處理
1080226	David	David	1080085	密件公文啟用如實顯示主旨時，儲存需更新畫面主旨資料至IN_SUBJECT
1080927	Kevin	David	1080339	jQuery升級3.4.1改寫語法
1081121	Kevin	David	1080339	jQuery升級3.0，呼叫WS後.then()改成一律為非同步處理，如後續有其他處理邏輯會造成異常，調整呼叫方式改為.pipe()
1081122	David	David	1080986	簽核類型不同不可設定彙辦
1090102	David	David	1090001	分類案次查詢，一律傳入年度號
1090506	Kevin	David	1080867	支援彙併辦、併案陳核並存狀態，儲存WDCM的併案資訊時新增紀錄COMBINE_TYPE
1090612	David	David	1090407	公文性質為一般公文限期辦畢時，業務類別時效計算不依照速別時，速別才預帶空白
1090720	David	David	-------	修改OD_CHECK_FILE_CASE=S的設定
1090914	David	David	1090557	新增信保欄位處理
1091104	David	David	1090557	信保資料便利性處理
1091127	David	David	1090557	調整信保欄位連動處理
1100408	David	David	1100192	需由分類號帶出保存年限，且有對應的保存年限時才帶入
1100510	Kevin	David	1100221	支援jQuery3.5.1，調整jQuery.trim用法
1101126	David	David	1101275	新增核決時間檢核
1100221	David	David	1110086	帶入母文分類號資訊時，新增帶入母文年度號
1110329	Kevin	David	1110164	弱掃調整click、blur、change事件不可寫在html內，改由JS註冊
1111021	David	David	-------	(陸委會序118)未啟用密件顯示真實主旨，如畫面欄位不為密不錄由(稿件無主旨，使用者需自行輸入)，寫到IN_SUBJECT，FROM_SUBJECT改為密不錄由
1111123	David	David	1110881	新增銓敘部任審視窗處理
1111202	Kevin	David	1110835	新增銓敘部人民陳情辦理情形按鈕處理
1111208	David	David	1111215	調整環境變數SEC_CAN_AOL預設值處理，避免無法正常檢核線上簽核不可密件公文
1111219	David	David	1111366	調整開會通知檢核邏輯，避免開會日期與收文日期同天，且設定為收文隔天起算時檢核異常
1111226	David	Joe		1111097	調整檔號全形字變更為半形字(參照1100860)
1120901 Kevin	Leslie	1120709	弱掃修正Client DOM Stored XSS
1130112	David	David	1121043	異動密等、速別時，新增公文背景顏色處理邏輯
1131211	David	David	1130983	依系統參數判斷實體附件維護是否另開程式處理，調整附件資訊處理
1140208	David	David	1131322	核決日期無值時，清空核決時間
1140304	David	David	1140136	比對母子文案次號時，需加上年度號條件
1140319	David	David	1131053	新增增加附件筆數按鈕處理
1140619	David	David	1140885	可人工輸入限辦日期時，如為來文公文，不允許異動限辦日期
1140718	Joe		Joe		1140937	新增日期計算支援傳入創稿類型
1140725	David	David	1140784	新增紙本併同歸檔選單處理
1141009	David	David	1141012	外貿公文端不使用分類案次號
1150204	David	David	序56	密件公文儲存時如無主旨，IN_SUBJECT一樣紀錄密不錄由
*/

/* 依照文件之說明
AreaDocNo	公文基資區
公文文號	txDocNo			收創文日	txRcvDate		創稿		cbNewByOu
公文來源	txDocSource		目前狀態	txStatus		收文別		txRcvType
來文者		txFromOrg		來文信箱	txFromEmail
文別		dlDocCategory	本別		dlDocType		速別		dlSpd			密等		dlSec
來文日期	txFromDate		來文字		txFromWord		來文號		txFromNo
AreaOwnId	承辦單位區
主旨		txSubject		並列案由	txAppSubject	其他案由	txOtherSubject
承辦單位	txDeptShow		承辦人		txUser			會辦單位	txCoDeptShow	會辦人		txCoUser
AreaState	公文時效區
案件編號	txCaseNo		併案文號	txComNo,dlComNo	併案情形	dlComType
公文性質	dlProperty		時效統計	txSumType,txSumTypeShow	關鍵字		txKeyWord
業務類別	txWorkTypeNo,dlWorkType		處理期限	txLeadTime,dlLtUom
起算日期	txStartDate		開會日期	txMeetDate		限辦日期	txDueDate
AreaArchi 	公文檔管區
分類號		txClsNo,txClsName			案次號		txFileCaseNo,txFileCaseName
保存年限	txKeepYear		應解密日期	txDSecDate		應用限制	dlApplyLimit	併件		cbCom
解密條件	comboDSecCond									檔案數量	txFileCnt
(檔案)單位	dlFileUnit									紙本併同歸檔 txRcvFileCnt
*/

//全域物件
var gObj = {
uOrgNo : "",
gODC011Load : false,
gODC012Load : false,
gODC013Load : false,
gPage : "",
gPDocWebPage : "",
gPDocWebPageMode : "",
gEDocWebPage : "",
gCoSignPage : "",
gbComClsCaseTheSame : false,	//紀錄母文與目前公文之分類案次號是否相同
gFileYear : "",	//紀錄稿件原有的年度號
gClsNo : "",	//紀錄稿件原有的分類號
gFileCase : "",	//紀錄稿件原有的案次號
gKeepYear : "",	//紀錄稿件原有的保存年限
gOdDocPty5Mode : "",	//存放環境變數OD_DOC_PTY_5_MODE的設定值
gDefApply : "",	//紀錄環境變數OD_DEFAULT_APPLY_LIMIT設定
gDefApplyBySec : "",	//紀錄環境變數OD_APPLY_LIMIT_BY_SEC設定
gClsAppLmt : "",	//紀錄分類號的應用限制設定
gNowSecNo : "",	//紀錄目前的的密等
gNowClsNo : "",	//紀錄目前的的分類號
gSpdNo : "",	//紀錄目前速別
gFirstLoadPage : false,
gtxLtBy : "",
gtxLtIncHd : "",
gtxLeadTimeDB : "",
gtxDueRule : "",
gIsFirstDoc : false,	//創稿 + start_date="" -> true
gtxComNo : "",
gdlProperty : "",
gdlWorkTypeIdx : "",
gtxDocProperty : "",
uWorkTypeNow : "",
uCaseNoNow : "",
uSignType : "",
uMetaMode : "",
uRcvMode : "",
uFolder : "",
uSubFolder : "",
gBTypeUrl_WebService : "",
gBTypeUrl_LinkUrl : "",
gBtypeUrl_SearchUrl : "",
gCaseNoBeforeChange : "",
gFileCaseDisplay : "", //紀錄環境變數OD_CHECK_FILE_CASE設定
gSecCanAol : "",//紀錄環境變數SEC_CAN_AOL設定
gIsCheckSecField : "",//紀錄環境變數OD_ODC010_IS_CHECK_SEC_FIELD設定
gOD99CanAPP : "",//紀錄環境變數OD_OD99_CAN_APP設定
gSourceComNo : "",//1051205 David 1051175 紀錄開啟公文時的母文號
gbReturnCaseAppInfo : false//1060203 David 1060004 紀錄是否帶回專案申請核可的資料
,gMsKeyCaseCls : "" //1071105 David 1071076 紀錄環境變數MS_KEY_CASECLS設定
,gNowFileCaseNo : ""//1071214 David 1071179 紀錄目前的的案次號
,gNowKeepYear : ""//1071214 David 1071179 紀錄目前的的保存年限
//1091127 David 1090557 紀錄目前的專案卡號、列管編號
,gClientCardNo : "",gManageBankNo : "",gManageCaseNo : ""
,gEnableAttArchiveNote : false//1131211 David 1130983 紀錄系統參數ENABLE_ATT_ARCHIVE_NOTE設定值
};

//全域物件初始化
function gObjInit()
{
	for(nm in gObj)
	{
		if (true)
		{
			if (typeof gObj[nm] == 'boolean')
			{
				gObj[nm] = false;
			}
			else
			{
				gObj[nm] = '';
			}
		}
	}
}

//1110329 David 1110164 弱掃調整click、blur、change事件不可寫在html內，改由JS註冊
function AddEventInit()
{
	//fnDivControl
	$("#btDocInfo, #btAttachInfo, #btComInfo, #btSignSet, #btCoSignSet")
	.on("click", function() {fnDivControl(this.id)});

	//ODC010
	//blur
	$('#dlDocCategory, #txWorkTypeNo, #txComNo, #txKeyWord, #txLeadTime, #txStartDate, #txMeetDate, #txDueDate')
	.on('blur',function(){ObjOnBlur(event,this.id)});
	$('#txClsNo, #txFileCaseNo, #txKeepYear, #txDSecDate, #txFileCnt, #txRcvFileCnt')
	.on('blur',function(){ObjOnBlur(event,this.id)});
	//信保欄位blur
	$('#txClientCardNo, #txTaxIdNo, #txManageBankNo, #txManageCaseNo, #txBankCode, #txBankBranchCode')
	.on('blur',function(){ObjOnBlur(event,this.id)});

	//blur、change
	$("#dlSec, #dlProperty, #dlWorkType, #txCaseNo, #dlLtUom")
	.on("blur", function(){ObjOnBlur(event, this.id)}).on("change", function() {ObjOnBlur(event, this.id)});

	$("#dlSpd").on("blur", dlSpdOnChange).on("change", dlSpdOnChange);
	$("#btOtherSubject").on("click", fnHideOtherSubject);
	$("#ibtCaseNo").on("click", fnSearchCase);
	$("#ibtClsNo").on("click", fnSearchClsNo);
	$("#ibtFileCase").on("click", fnSearchFileCaseNo);
	$("#cbCombineType2").on("click", fnSetCombineType2);
	$("#cbCom").on('click',function(){fnCheckCbComClsCase(event)});
	//1111123 David 1110881 新增銓敘部任審視窗處理
	$("#btTAPerson").on("click", fnSearchTAPerson);
	//1111202 David 1110835 新增銓敘部人民陳情辦理情形按鈕處理
	$("#btMOCSPetition").on("click", fnOpenMOCSPetition);
	//1140319 David 1131053 新增增加附件筆數按鈕處理
	$("#btAddAttachNewRow").on("click", fnAddAttachNewRow);
	//1140725 David 1140784 新增紙本併同歸檔選單處理
	$("#dlIsRcvFile").on("blur", function(){ObjOnBlur(event, this.id)}).on("change", function() {ObjOnBlur(event, this.id)});

	//ODC011
	$("#ddlAppType").on("change", fnAppTypeChange);
	$("#ddlApply").on("change", fnApplyDDLChange);
	$('#txShowApprovedDate, #txShowApprovedTime')
	.on('blur',function(){ObjOnBlur(event,this.id)});

	$("#dlRemark").on("change", dlCancelChange);
	$("#btSetCom").on("click", fnSetCom);

	//ODC012、013
	for(let iSeq = 1 ; iSeq < 6; iSeq++)
	{
		$("#combo_ODC013_CoOrgNo" + iSeq).on('blur',function(){CoOrgOnBlur('ODC013',iSeq)});
		$("#ibtOrgNo" + iSeq).on('click',function(){fnOpenWEM010C1('ODC013',iSeq)});

		$("#combo_ODC012_CoOrgNo" + iSeq).on('blur',function(){CoOrgOnBlur('ODC012',iSeq)});
		$("#ibt012OrgNo" + iSeq).on('click',function(){fnOpenWEM010C1('ODC012',iSeq)});
	}
	$('#tx_ODC013_UpIssueDate, #tx_ODC012_UpIssueDate, #tx_ODC012_ApprovedDate')
	.on('blur',function(){ObjOnBlur(event,this.id)});
	$("#tx_ODC012_UpCloseTime").on('blur',function(){fnODC012ChkTime('tx_ODC012_UpCloseTime')});
	$("#dl_ODC012_Apply").on("change", fnODC012ApplyDDLChange);
}

var g_QueryDeferred = null;
function WsExample() {

	var paramsws_CheckDeptNoAndFromNo = {
		"argArtifact": localStorage.Artifact
		, "argSourceOrgNo": gObj.uOrgNo
		, "argComNo": rtn.ComNo.split(":")[0]
		, "argDocNo": $('#txDocNo').val()
		, "argKeyWord": $('#txKeyWord').val()
	};

	// setup Deferred object
	var _dfd = $.Deferred();
	g_QueryDeferred = _dfd;

	CallWsExample(params, _dfd)
	.then(function (rslt) {
		if (rslt.success) {
			document.all.txLeadTime.value = rslt.wsRtnobj.RtnStr;
		}
	})
	.fail(function (err) {
		alert(err.errMsg);
	});
}

function fnODC010Init(argReadOnly)
{
	gObjInit();
	//1110329 David 1110164 弱掃調整click、blur、change事件不可寫在html內，改由JS註冊
	AddEventInit();
	gObj.gFirstLoadPage = true;
	gObj.gPage = "ODC010";

	console.info('ODC010初始化，取得權杖：', localStorage.Artifact);

	_rsltODWMSG = theAOL.docObj.get('ODWMSG', alODWMSG);
	console.log('_rsltODWMSG done!', _rsltODWMSG);

	_rsltODWDCM = theAOL.docObj.get('ODWDCM', alODWDCM);
	console.log('_rsltODWDCM done!', _rsltODWDCM);

	gObj.uOrgNo = _rsltODWMSG["SOURCE_ORGNO"];
	gObj.uSignType = _rsltODWMSG["SIGN_TYPE"];
	gObj.uFolder = _rsltODWMSG["FOLDER"];
	gObj.uSubFolder = _rsltODWMSG["SUBFOLDER"];

	if (gObj.uOrgNo == "") {
		gObj.uOrgNo = theSSO.User.EnvSettings.get("OD_DEFAULT_ORGNO");
		console.info('ODC010從元件取得機關代碼:' + gObj.uOrgNo);
	}
	else {
		console.info('ODC010從公文取得機關代碼:' + gObj.uOrgNo);
	}

	gObj.gOdDocPty5Mode = theSSO.User.EnvSettings.get("OD_DOC_PTY_5_MODE");
	gObj.gDefApplyBySec = "YN";
	var EnvOdApplyLimitBySec = theSSO.User.EnvSettings.get("OD_APPLY_LIMIT_BY_SEC");
	if(EnvOdApplyLimitBySec != null && EnvOdApplyLimitBySec != "")
		gObj.gDefApplyBySec = EnvOdApplyLimitBySec.toUpperCase();
	if(gObj.gDefApplyBySec.length < 2)
		gObj.gDefApplyBySec = "YN";
	gObj.gDefApply = theSSO.User.EnvSettings.get("OD_DEFAULT_APPLY_LIMIT");

	gObj.gFileCaseDisplay = theSSO.User.EnvSettings.get("OD_CHECK_FILE_CASE").toUpperCase();
	gObj.gSecCanAol = theSSO.User.EnvSettings.get("SEC_CAN_AOL").toUpperCase();
	//1111208 David 1111215 調整SEC_CAN_AOL使用預設值處理
	if(gObj.gSecCanAol == "")
		gObj.gSecCanAol = "N";
	gObj.gIsCheckSecField = theSSO.User.EnvSettings.get("OD_ODC010_IS_CHECK_SEC_FIELD").toUpperCase();
	gObj.gOD99CanAPP = theSSO.User.EnvSettings.get("OD_OD99_CAN_APP");
	gObj.gMsKeyCaseCls = theSSO.User.EnvSettings.get("MS_KEY_CASECLS");//1071105 David 1071076 紀錄環境變數MS_KEY_CASECLS設定
	gObj.gEnableAttArchiveNote = theSSO.User.SystemSets.get("ENABLE_ATT_ARCHIVE_NOTE") == "Y";//1131211 David 1130983 紀錄系統參數ENABLE_ATT_ARCHIVE_NOTE設定值

	//載入靜態資源檔
	UiInitStaticDll();
	//取得公文文別
	fnGetMsResource('DOC_CATEGORY', 'AOL\\OD\\SYS', '#dlDocCategory');
	//取得公文性質
	fnGetMsResource('DOC_PROPERTY', 'AOL\\OD\\SYS', '#dlProperty');
	//載入公文
	UiInitDocInfo();
	//取得UI控制檔
	WsGetUIInfo();

	var $ODC010 = $(".doc-info");
	var ItemButtonObj = $ODC010.find("button");
	var ItemInputObj = $ODC010.find("input");
	var ItemSelectObj = $ODC010.find("select");
	var ItemImgObj = $ODC010.find("IMG");

	if(argReadOnly)
	{
		$.each(ItemButtonObj , function(index, val) {UiSetObjMotifyMode("#" + ItemButtonObj[index].id , 'R', '');});
		$.each(ItemInputObj , function(index, val) {UiSetObjMotifyMode("#" + ItemInputObj[index].id , 'R', '');});
		$.each(ItemSelectObj , function(index, val) {UiSetObjMotifyMode("#" + ItemSelectObj[index].id , 'R', '');});
		$.each(ItemImgObj , function(index, val) {UiSetObjMotifyMode("#" + ItemImgObj[index].id , 'R', '');});
		fnSetClassHide("AreaButtonAttachInfo,AreaButtonComInfo,AreaButtonSignSet,AreaButtonCoSignSet", true);
		return;
	}
	else if(gObj.uMetaMode == "")
	{
		alert("於使用介面設定檔中找不到對應的資料夾設定：\n\r資料夾："+gObj.uFolder + "\n\r子資料夾："+ gObj.uSubFolder);
		$.each(ItemButtonObj , function(index, val) {UiSetObjMotifyMode("#" + ItemButtonObj[index].id , 'R', '');});
		$.each(ItemInputObj , function(index, val) {UiSetObjMotifyMode("#" + ItemInputObj[index].id , 'R', '');});
		$.each(ItemSelectObj , function(index, val) {UiSetObjMotifyMode("#" + ItemSelectObj[index].id , 'R', '');});
		$.each(ItemImgObj , function(index, val) {UiSetObjMotifyMode("#" + ItemImgObj[index].id , 'R', '');});
		fnSetClassHide("AreaButtonAttachInfo,AreaButtonComInfo,AreaButtonSignSet,AreaButtonCoSignSet", true);
		return;
	}

	//程式啟動之控制
	//fnODC001Init(document.all.txMetaMode.value);
	UiSetControl();

	ObjOnBlur(null, 'txClsNo');
	//1061222 David 1061170 因Init觸發分類號連動會將應用限制帶回預設值，新增依資料庫資料帶入
	//1061228 David 如APPLY_LIMIT為空，依環境變數給予預設值
	//UiSetDlItemByValue("dlApplyLimit", _rsltODWDCM['APPLY_LIMT']);
	if(_rsltODWDCM['APPLY_LIMT'] == "")
	{
		var nDefaultApplyLimit = theSSO.User.EnvSettings.get("OD_DEFAULT_APPLY_LIMIT");
		if (nDefaultApplyLimit == "N" || nDefaultApplyLimit == "Y" || nDefaultApplyLimit == "R")
			UiSetDlItemByValue("dlApplyLimit", nDefaultApplyLimit);
		else
			UiSetDlItemByValue("dlApplyLimit", "Y");
	}
	else
		UiSetDlItemByValue("dlApplyLimit", _rsltODWDCM['APPLY_LIMT']);
	ObjOnBlur(null, 'txFileCaseNo');
	ObjOnBlur(null, 'txKeepYear');

	//是否為創稿 && 無起算日期
	if ($('#cbNewByOu')[0].checked && $('#txStartDate').val() == "")
		gObj.gIsFirstDoc = true;

	GetSumType(true);

	ObjOnBlur(null, 'txStartDate');
	ObjOnBlur(null, 'dlWorkType');

	fnAfterPageLoad();

	//1051205 David 1051175 紀錄開啟公文時的母文號
	gObj.gSourceComNo = $('#txComNo').val();

	gObj.gFirstLoadPage = false;
}

function fnAfterPageLoad()
{
	//顯示併案文號
	UiLoadWDCMComNo();

	//取得辦理階段
	//WsGetStepName();
	//SetDlItemByValue(document.all.dlStepName, document.all.txStepName.value);

	gObj.uWorkTypeNow = $('#dlWorkType option:selected').val();

	//公文來源為會銜時速別固定為最速件
	SetSpd();

	//1061212 David 1061250 併案文號欄位開放異動判斷透過共用函式處理
	/*var sVal = $('#dlComType option:selected').val();
	if (sVal == "1" || sVal == "2")
	{
		UiSetObjMotifyMode("#txComNo" , 'R', '');
	}*/
	UiComNoCtrl("");

	gObj.gtxComNo = $('#txComNo').val();
	gObj.gdlProperty = $('#dlProperty option:selected').val();
	gObj.gdlWorkTypeIdx = $('#dlWorkType option:selected').val();

	gObj.gFileYear = $('#txFileYear').val();
	gObj.gClsNo = $('#txClsNo').val();
	//1090720 David 支援OD_CHECK_FILE_CASE=S設定功能
	//if (gObj.gFileCaseDisplay == "Y")
	if (gObj.gFileCaseDisplay == "Y" || gObj.gFileCaseDisplay == "S")
	{
		//1060824 David 1060713 修正案次號欄位ID錯誤問題
		//gObj.gFileCase = $('#txFileCase').val();
		gObj.gFileCase = $('#txFileCaseNo').val();
	}
	gObj.gKeepYear = $('#txKeepYear').val();
	gObj.gSpdNo = $('#dlSpd option:selected').val();

	//為避免尚未取得KEY_WORD值，使用setTimeout處理。
	UifnKeyWord();

	UiLoadComInfoToPage();

	//附件資訊頁面
	//1131211 David 1130983 未啟用實體附件歸檔註記設定模式時，才處理附件UI
	if(!gObj.gEnableAttArchiveNote)
		UifnBindAttach();

	//1060203 David 1060004 如公文已做過專案申請核可，不允許異動公文性質、業務類別及辦理天數
	SetCaseAppDisable();

	//1091104 David 1090557 信保資料便利性處理
	if(SSO_CONFIG.OrgNickName == "SMEG")
	{
		if ($('#txClientCardNo').val() != "" && $('#txClientName').val() == "")
			ObjOnBlur(null, 'txClientCardNo');
		if ($('#txTaxIdNo').val() != "" && $('#txTaxIdName').val() == "")
			ObjOnBlur(null, 'txTaxIdNo');
		if ($('#txManageBankNo').val() != "" && $('#txManageCaseNo').val() != "" && $('#txManageName').val() == "")
			ObjOnBlur(null, 'txManageBankNo');
		if ($('#txBankCode').val() != "" && $('#txBankName').val() == "")
			ObjOnBlur(null, 'txBankCode');
		if ($('#txBankBranchCode').val() != "" && $('#txBankBranchName').val() == "")
			ObjOnBlur(null, 'txBankBranchCode');
	}

	//1071214 David 1071179 紀錄目前的分類案次號保存年限
	gObj.gNowClsNo = $('#txClsNo').val();
	gObj.gNowFileCaseNo = $('#txFileCaseNo').val();
	gObj.gNowKeepYear = $('#txKeepYear').val();
	
	//1091127 David 1090557 紀錄目前的專案卡號、列管編號
	gObj.gClientCardNo = $('#txClientCardNo').val();
	gObj.gManageBankNo = $('#txManageBankNo').val();
	gObj.gManageCaseNo = $('#txManageCaseNo').val();
}

//當公文來源是會銜時，速別固定為最速件
function SetSpd()
{
	if($('#txDocSource').val() == "會銜")
	{
		//速別固定為最速件
		if($('#dlSpd option:selected').val() != "3")
		{
			UiSetDlItemByValue("dlSpd", "3");
			dlSpdOnChange();
		}
		//設定速別為disable
		UiSetObjMotifyMode("#dlSpd" , 'R', '');
	}
}

function ObjOnBlur(event, argObjName) {
	if (!!event) {
        console.log('ODC010-ObjOnBlur:' + event.target.id);
    }
	
	//當觸發者為不是disable時才真正執行onblur的動作
	if (!gObj.gFirstLoadPage && event && event.target && event.target.id) {
		if ($('#' + event.target.id)[0].readOnly)
			return;
		if ($('#' + event.target.id)[0].disabled)
			return;
	}

	switch (argObjName) {
		case "dlProperty": //公文性質
			fndlPropertyOnChange(event);
			break;

		case "txFileCnt": //檔案數量
			if ($('#txFileCnt').val() == '')
				return;
			if (isNaN($('#txFileCnt').val())) {
				alert('請輸入數字');
				if (!$('#txFileCnt')[0].disabled)
				{
					//1080927 David 1080339 jQuery升級3.4.1改寫語法
					//$('#txFileCnt').focus();
					$('#txFileCnt').trigger("focus");
				}
			}
			break;
			
		case "txRcvFileCnt": //紙本併同歸檔
			if ($('#txRcvFileCnt').val() == '')
				return;
			if (isNaN($('#txRcvFileCnt').val())) {
				alert('請輸入數字');
				if (!$('#txRcvFileCnt')[0].disabled)
				{
					//1080927 David 1080339 jQuery升級3.4.1改寫語法
					//$('#txRcvFileCnt').focus();
					$('#txRcvFileCnt').trigger("focus");
				}
			}
			break;

		case "txDueDate": //限辦日期(readonly now)
			if (jf_fnChkDate('txDueDate', "限辦日期") && !$('#txDueDate')[0].readOnly) //當限辦日期onBlur時要計算lead_time
				WsCalcLeadtime();
			break;

			//Kevin Wait No Ui
		case "txCloseDateI": //預計結案日
			break;

		case "txDSecDate":
			//日期檢核
			jf_fnChkDate('txDSecDate', "解密期限");
			break;

		case "txLeadTime": //處理期限
			if (isNaN($('#txLeadTime').val()))
			{
				alert('請輸入數字');
				if (!$('#txLeadTime')[0].disabled)
				{
					//1080927 David 1080339 jQuery升級3.4.1改寫語法
					//$('#txLeadTime').focus();
					$('#txLeadTime').trigger("focus");
				}
			}
			if(!$('#txLeadTime')[0].readOnly)
				WsGetWorkDate();
			break;

		case "txStartDate":  //起算日期
			if (!jf_fnChkDate('txStartDate', "起算日期"))
				return;
			if (!$('#txStartDate')[0].readOnly)
				WsGetWorkDate();
			break;

		case "txWorkTypeNo": //新增業務類別代碼欄位供使用者輸入，輸入後OnBlur要改變下拉選單資料
			UiSetDlItemByValue("dlWorkType", jf_Trim($('#txWorkTypeNo').val()));
			if($('#dlWorkType')[0].selectedIndex == -1)
			{
				gObj.uWorkTypeNow = '';
				UiClearTimeFields();
				if (jf_Trim($('#txWorkTypeNo').val()) != '')
				{
					alert("輸入之業務類別代碼不存在，請重新輸入或檢視公文性質是否選擇正確");
					//1080927 David 1080339 jQuery升級3.4.1改寫語法
					//$('#txWorkTypeNo').val('').focus();
					$('#txWorkTypeNo').val('').trigger("focus");
				}
				return;
			}
			//$('#dlWorkType option[value=' + jf_Trim($('#txWorkTypeNo').val()).toUpperCase() + ']').prop('selected', true);
			//$('#dlWorkType').selectmenu('refresh');
			UiSetDlItemByValue("dlWorkType", jf_Trim($('#txWorkTypeNo').val()).toUpperCase());
			
			ObjOnBlur(null, "dlWorkType");
			break;

		case "dlWorkType": //業務類別
			console.log('dlWorkType', gObj.uWorkTypeNow, $('#dlWorkType option:selected').val());

			//若變更公文性質時要跳出提示訊息
			if (event && event.target.id == "dlWorkType")
			{
				if (!fnChangeDueDateConfirm(event.target))
					return;
			}

			if ($('#dlWorkType option:selected').val() == '')
			{
				gObj.uWorkTypeNow = '';
				//清除時效統計相關欄位
				UiClearTimeFields();
				return;
			}

			if (gObj.uWorkTypeNow == $('#dlWorkType option:selected').val())
				return; //not change

			$('#txWorkTypeNo').val($('#dlWorkType option:selected').val());

			//避免每次均呼叫 web service
			gObj.uWorkTypeNow = $('#dlWorkType option:selected').val();

			if ($('#dlWorkType option:selected').val() == '') {
				//相關欄位不可輸入
				UiSetObjMotifyMode('#txLeadTime', 'R', '0');
				UiSetObjMotifyMode('#dlLtUom', 'R', '');
				UiSetObjMotifyMode('#txStartDate', 'R', '');

				//$('#dlStepName').empty().selectmenu('refresh');
				return;
			}

			if (!gObj.gFirstLoadPage)
			{
				//取得時效統計類別，限辦日期是否可人工輸入
				GetSumType(false);
				//WsGetStepName(); //呼叫CASE_WS取得該業務類別下，所有辦理階段

				//1090612 David 1090407 「一般公文限期辦畢」時，速別預帶空白依照業務類別判斷
				if($('#dlProperty option:selected').val() == "2")
				{
					if(gObj.gtxLtBy != "S")//不依照速別計算時，預帶4
					{
						UiSetDlItemByValue("dlSpd","4");
						dlSpdOnChange();
					}
					else
					{
						//依照速別計算時，如目前速別為4，需調整為預設值，避免無法計算限辦日期
						if($('#dlSpd option:selected').val() == "4")
						{
							UiSetDlItemByValue("dlSpd","1");
							dlSpdOnChange();
						}
					}
				}
				else
				{
					//如公文性質由限期辦畢調整為其他時，需將速別調整為預設值，避免無法計算限辦日期
					if($('#dlSpd option:selected').val() == "4")
					{
						UiSetDlItemByValue("dlSpd","1");
						dlSpdOnChange();
					}
				}
			}
			UiCaseRelatedCtrl();
			//設定業務類別欄位ToolTip Wait
			break;

		case "txCaseNo":
			//先檢核公文性質
			var val = $('#dlProperty option:selected').val();
			
			var CheckDocCaseparams = {
				"argSessionID": localStorage.Artifact
				, "argSourceOrgNo": gObj.uOrgNo
				, "argCaseNo": $('#txCaseNo').val()
			};

			var _dfd = $.Deferred();
			g_QueryDeferred = _dfd;

			if (val != "1" && val != "2" && val != "3")
			{
				//新增案號檢核
				if (gObj.gBTypeUrl_WebService != "" && jf_Trim($('#txCaseNo').val()) != "")
				{
					//因為子文業務類別為52，而FDA將該組業務類別對應的CASE_WEBSERVICE設定叫用INLIB檢核，導致綠標子文會跳出"查無相關案件編號"
					if (!(jf_Trim($('#txCaseNo').val()) == "G" + jf_Trim($('#txComNo').val())))
					{
						var bCheckSucces = false;
						try
						{
							WsCheckDocCaseByBTypeUrl(CheckDocCaseparams, _dfd)
							//1081121 David 1080339 .then()改為.pipe()
							//.then(function () {
							.pipe(function () {
								bCheckSucces = true;
							})
							.fail(function () {
								bCheckSucces = false;
							});
						}
						catch(ex)
						{
							alert("叫用" + gObj.gBTypeUrl_WebService + "失敗。" + ex.message);
							//1080927 David 1080339 jQuery升級3.4.1改寫語法
							//$('#txCaseNo').focus();
							$('#txCaseNo').trigger("focus");
							break;
						}
						
						if(!bCheckSucces)
						{
							alert("查無相關案件編號");
							//1080927 David 1080339 jQuery升級3.4.1改寫語法
							//$('#txCaseNo').focus();
							$('#txCaseNo').trigger("focus");
							break;
						}
					}
					//這部份已檢核過，若沒有break會再跑到ODLIB那邊，就會跳出找不到訊息
					break;
				}
				UiCaseRelatedCtrl();
				//當business_type沒有設webservcie時以OD_LIB.asmx檢核案件編號
			}

			if (gObj.uCaseNoNow == $('#txCaseNo').val())
				return;

			//檢查案件編號是否正確
			if ($('#txCaseNo').val() == "")
			{
				gObj.uCaseNoNow = "";

				if (event && event.target.id == "txCaseNo")//0980326 Leo 0980129 當觸發者為txCaseNo才做清空的動作
				{
					//Clear 併案文號
					$('#txComNo').val('');
					ObjOnBlur(null, "txComNo");

					//$('#dlStepName').empty().selectmenu('refresh');
				}
				return;
			}

			WsCheckDocCase(CheckDocCaseparams, _dfd)
			.then(function () {
				//判斷SUM_TYPE
				UiDisplaySumType();

				UiSetcbComEnable();

				//如母文簽核類型與目前公文不同，併件欄位不勾選且不可異動
				if ($('#txComNo').val() != "" && $('#dlComNo')[0].length > 1 && $('#dlComNo')[0].options[0].value != _rsltODWMSG['SIGN_TYPE'])
				{
					UiSetObjMotifyMode('#cbCom', 'R', '0');
					//1081122 David 1080986 不可併件時也不可設定彙辦
					UiSetObjMotifyMode('#cbCombineType2', 'R', '0');
				}
				else
				{
					//如母子文分類案次號不相同，併件欄位不勾選
					if (gObj.gbComClsCaseTheSame)
					{
						//若母文檢核通過則取環境變數決定併件是否勾選
						$('#cbCom').prop("checked", theSSO.User.EnvSettings.get("OD_ODC010_COM_STATUS").toUpperCase() == "Y").checkboxradio("refresh");
						//1061024 David 1060953 新增彙辦欄位處理
						//1081122 David 1080986 相同簽核類型可設定彙辦，調整設定時機
						//UiSetObjMotifyMode('#cbCombineType2', 'W', '0');
					}
					else
					{
						$('#cbCom').prop("checked", false).checkboxradio("refresh");
					}
					//1081122 David 1080986 需判斷所有併案公文相同簽核類型才可設定彙辦
					var bAllComSameSignType = true;
					var strPrevSignType = "";
					for(var iComNo = 0 ; iComNo < $('#dlComNo')[0].options.length ; iComNo++)
					{
						var ComSignType = $('#dlComNo')[0].options[iComNo].value;
						if(bAllComSameSignType && strPrevSignType != "" && strPrevSignType != ComSignType)
						{
							bAllComSameSignType = false;
							break;
						}

						strPrevSignType = ComSignType;
					}
					if(bAllComSameSignType)
						UiSetObjMotifyMode('#cbCombineType2', 'W', '0');
				}
				gObj.uCaseNoNow = $('#txCaseNo').val();
			})
			.fail(function () {
				alert("查無此案件編號");
			});
			break;
		case "txComNo":
			if ($('#txComNo').val() == gObj.gtxComNo)
				return;

			//1070301 David 1070049 記錄母文是否為列管公文
			var bComNoIsAudit = false;

			//1051205 David 1051175 鐵工局檢核以案管制子文結案後不可解除併案關係
			if(SSO_CONFIG.OrgNickName == "RRB")
			{
				if($('#txComNo').val() == "" && $("#txDocState").val() >= 10 && gObj.gSourceComNo != "" )
				{
					var paramsGetDocInfo = {
						"argSessionID": localStorage.Artifact
						, "argDocNo": gObj.gSourceComNo
						, "argSourceOrgNo": gObj.uOrgNo
					};

					var _dfd = $.Deferred();
					g_QueryDeferred = _dfd;

					var CheckAuditComCanCancel = false;
					WsGetDocInfo(paramsGetDocInfo, _dfd)
					//1081121 David 1080339 .then()改為.pipe()
					//.then(function (rtn)
					.pipe(function (rtn)
					{
						if(rtn.IsAudit == "Y")
						{
							CheckAuditComCanCancel = false;
							alert("以案管制結案子文不可解除併案關係 \n請撤銷公文流程至待處理主辦再操作");
							$('#txComNo').val(gObj.gSourceComNo);
						}
						else
							CheckAuditComCanCancel = true;
					})
					.fail(function (ErrMsg)
					{
						CheckAuditComCanCancel = false;
						alert("判斷以案管制結案子文可否解除併案關係失敗：" + ErrMsg);
						$('#txComNo').val(gObj.gSourceComNo);
					});

					if(!CheckAuditComCanCancel)
						return;
				}
				//1070301 David 1070049 判斷母文是否為列管公文
				else if($('#txComNo').val() == "" && ($('#txDocNo').val() != gObj.gtxComNo))
				{
					var GetComNoAudit = false;
					var paramsGetDocInfo = {
						"argSessionID": localStorage.Artifact
						, "argDocNo": gObj.gtxComNo
						, "argSourceOrgNo": gObj.uOrgNo
					};

					var _dfd = $.Deferred();
					g_QueryDeferred = _dfd;

					WsGetDocInfo(paramsGetDocInfo, _dfd)
					//1081121 David 1080339 .then()改為.pipe()
					//.then(function (rtn)
					.pipe(function (rtn)
					{
						GetComNoAudit = true;
						if(rtn.IsAudit == "Y")
							bComNoIsAudit = true;
					})
					.fail(function (ErrMsg)
					{
						alert("判斷母文是否為列管公文失敗：" + ErrMsg);
						$('#txComNo').val(gObj.gtxComNo);
					});

					if(!GetComNoAudit)
						return;
				}

				//1070301 David 1070049 若目前公文為列管公文，不可為子文
				if($('#txComNo').val() != "" && theAOL.docObj.ODWMSG.IS_AUDIT == "Y")
				{
					$('#txComNo').val('');
					alert("以案管制列管公文，不可為子文");
					return;
				}
			}

			//DVD 用意不明
			//fnResetDlTxNameForAppAndComNo($("#txAppUserName").val());

			if ($('#txComNo').val() == '')
			{	
				$('#dlComNo').empty();
				$('#dlComNo').selectmenu('refresh');

				UiSetDlItemByValue("dlComType","");
				//當母文號有變化時使公文性質、案號、業務類別
				UiCaseRelatedCtrl();

				$('#txCaseNo').val('');
				gObj.gCaseNoBeforeChange = '';

				//1060203 David 1060004 如公文有做過專案申請核可，依核可的資料帶入
				//1060808 David 1060698 調整判斷
				//if(theAOL.docObj.ODWDCM.CAM_DOC_PROPERTY != "")
				if(theAOL.docObj.ODWDCM.CAM_DOC_PROPERTY && theAOL.docObj.ODWDCM.CAM_DOC_PROPERTY != "")
				{
					gObj.gbReturnCaseAppInfo = true;
					UiSetDlItemByValue("dlProperty", theAOL.docObj.ODWDCM.CAM_DOC_PROPERTY);
					fndlPropertyOnChange();

					$('#txWorkTypeNo').val(theAOL.docObj.ODWDCM.CAM_B_TYPE_NO);
					ObjOnBlur(null, "txWorkTypeNo");

					$('#txLeadTime').val(theAOL.docObj.ODWDCM.CAM_EXT_DAY);
					UiSetDlItemByText("dlLtUom", "天");
					ObjOnBlur(null, "txLeadTime");

					$('#txCaseNo').val(theAOL.docObj.ODWDCM.DC_CASE_NO);

					SetCaseAppDisable();

					gObj.gbReturnCaseAppInfo = false;
				}
				else
				{
					//1060603 David 1060310 獨立FDA併案文號清空處理邏輯
					//1070301 David 1070049 新增鐵工局處理邏輯，母文為列管公文時，解併時將目前公文調整成一般公文
					//if (SSO_CONFIG.OrgNickName == "FDA")
					if (SSO_CONFIG.OrgNickName == "FDA" || (SSO_CONFIG.OrgNickName == "RRB" && bComNoIsAudit))
					{
						//1060603 David 1060310 FDA設定回一般公文時，速別切回普通
						UiSetDlItemByValue("dlSpd","1");
						dlSpdOnChange();

						//(FDA)當併案文號被清空時，將公文性質連動為第一個選項
						UiSetDlItemByValue("dlProperty","1");
						fndlPropertyOnChange(event);
					}
				}

				UiSetObjMotifyMode('#cbCom', 'R', '0');
				
				//1061024 David 1060953 新增彙辦欄位處理
				UiSetObjMotifyMode('#cbCombineType2', 'R', '0');

				//1110221 David 1110086 年度號與公文文號前3碼不同時，清空分類號資訊
				if($('#txFileYear').val() != '')
				{
					let strFileYear = "";
					if($('#txDocNo').val() != "")
						strFileYear = $('#txDocNo').val().substr(0,3);
					else
					{
						var dttoday = new Date();
						var newYear = dttoday.getFullYear() - 1911;
						newYear = newYear + "";
						newYear = jf_PADL(newYear, 3, "0");
						strFileYear = newYear;
					}

					if($('#txFileYear').val() != strFileYear)
						$('#txFileYear, #txClsNo, #txClsName, #txFileCaseNo, #txFileCaseName, #txKeepYear').val('');
				}

				gObj.gtxComNo = "";
				return;
			}

			//1060203 David 1060004 專案管制公文不可設定併案
			if($('#dlProperty option:selected').val() == "3")
			{
				$('#txComNo').val("");
				alert("專案管制公文不可設定併案文號");
				return;
			}

			var paramsCheckCombine = {
				"argSessionID": localStorage.Artifact,
				"argSourceOrgNo": gObj.uOrgNo,
				"argDocNo": $('#txDocNo').val(),
				"argDocNoSignType": _rsltODWMSG['SIGN_TYPE'],
				"argComNo": $('#txComNo').val()

			};
			if (!fnComNo(paramsCheckCombine))
			{
				//1060609 David 1060295 併案檢核未過時清空併案文號
				$('#txComNo').val("");

				//若該欄位為readonly，則不進行focus
				if ($('#txComNo')[0].readOnly)
					return;
				else
				{
					//1080927 David 1080339 jQuery升級3.4.1改寫語法
					//$('#txComNo').focus();
					$('#txComNo').trigger("focus");
					return;
				}
			}
			else
			{
				UiSetcbComEnable();
				UiCtrlCaseNo();

				//如母文簽核類型與目前公文不同，併件欄位不勾選且不可異動
				if ($('#txComNo').val() != "" && $('#dlComNo')[0].length > 1 && $('#dlComNo')[0].options[0].value != _rsltODWMSG['SIGN_TYPE'])
				{
					UiSetObjMotifyMode('#cbCom', 'R', '0');
					//1081122 David 1080986 不可併件時也不可設定彙辦
					UiSetObjMotifyMode('#cbCombineType2', 'R', '0');
				}
				else
				{
					//如母子文分類案次號不相同，併件欄位不勾選
					if (gObj.gbComClsCaseTheSame) {
							
						//若母文檢核通過則取環境變數決定併件是否勾選 0950710
						$('#cbCom').prop("checked", theSSO.User.EnvSettings.get("OD_ODC010_COM_STATUS").toUpperCase() == "Y").checkboxradio("refresh");
						//1061024 David 1060953 新增彙辦欄位處理
						//1081122 David 1080986 需判斷所有併案公文相同簽核類型才可設定彙辦，調整設定時機
						//UiSetObjMotifyMode('#cbCombineType2', 'W', '0');
					}
					else {
						$('#cbCom').prop("checked", false).checkboxradio("refresh");
					}
					//1081122 David 1080986 需判斷所有併案公文相同簽核類型才可設定彙辦
					var bAllComSameSignType = true;
					var strPrevSignType = "";
					for(var iComNo = 0 ; iComNo < $('#dlComNo')[0].options.length ; iComNo++)
					{
						var ComSignType = $('#dlComNo')[0].options[iComNo].value;
						if(bAllComSameSignType && strPrevSignType != "" && strPrevSignType != ComSignType)
						{
							bAllComSameSignType = false;
							break;
						}

						strPrevSignType = ComSignType;
					}
					if(bAllComSameSignType)
						UiSetObjMotifyMode('#cbCombineType2', 'W', '0');
				}

				//若變更併案文號時要跳出提示訊息
				if (event && event.target.id == "txComNo") {
					if (!fnChangeDueDateConfirm(event.target))
						return;
				}
				gObj.gtxComNo = $('#txComNo').val();
			}
			break;

		case "dlLtUom": //處理期限單位
			WsGetWorkDate();
			break;

		case "txMeetDate": //開會日期
			//於開會日期onblur時一律檢核日期格式以避免user在輸完日期後才改業務類別。

			$('#txMeetDate').val(jf_Trim($('#txMeetDate').val()));

			//0970110 Stella 修改若MeetDate欄位不為ReadOnly時再做此處理
			if (!$('#txMeetDate')[0].readOnly && $('#txMeetDate').val() == '') {
				$('#txDueDate').val('');
				return;
			}

			if (!jf_fnChkDate('txMeetDate', "開會日期")) {
				//1080927 David 1080339 jQuery升級3.4.1改寫語法
				//$('#txMeetDate').focus();
				$('#txMeetDate').trigger("focus");
				return;
			}

			WsGetWorkDate();
			break;

		case "txKeyWord":
			var strKeyWord = jf_Trim($('#txKeyWord').val());
			strKeyWord = strKeyWord.replace(/&/g, "＆");
			strKeyWord = strKeyWord.replace(/</g, "＜");
			strKeyWord = strKeyWord.replace(/>/g, "＞");

			$('#txKeyWord').val(strKeyWord);

			if (jf_Trim($('#txKeyWord').val()) != "") {
				var paramsCheckKeyWord = {
					"argSessionID": localStorage.Artifact
					, "argSourceOrgNo": gObj.uOrgNo
					, "argKeyWord": $('#txKeyWord').val()
					, "argOuId": _rsltODWMSG['INCHARGE_OU']
				};

				window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "CheckKeyWord", null, paramsCheckKeyWord, false, function (rtn, xml) { //
					console.log(rtn, xml);
					if (rtn.ErrorClass.IsErr == 'false' || rtn.strDocNo != "") {
						$('#txComNo').val(rtn.strDocNo);
						ObjOnBlur(null, 'txComNo');
					}
				});
			}
			break;

		case "dlSec":
			//(僑委會)客製化檢核密等與分類號的關係(密以上，分類號為9開頭；普通則分類號開頭不可為9)
			if (SSO_CONFIG.OrgNickName == 'OCAC')
			{
				if (!fnChkSecAndClsForOCAC())
				{
					//1080927 David 1080339 jQuery升級3.4.1改寫語法
					//$('#txClsNo').value('').focus();
					$('#txClsNo').value('').trigger("focus");
					return;
				}
			}
			//1060915 David 1060889 修改線上簽核密件公文判斷邏輯
			//if(gObj.gSecCanAol == "N" && $('#dlSec option:selected').val() != "1")
			if(gObj.uSignType == "E" && gObj.gSecCanAol == "N" && $('#dlSec option:selected').val() != "1")
			{
				alert("密件公文依規定不可採用線上簽核形式辦理，如需以密件辦理請轉為紙本簽核。");
				UiSetDlItemByValue("dlSec", "1");
				return;
			}

			//修改根據環境變數設定帶出預設值
			//1060920 David 1060658 依全域變數使用，不需重複取
			/*var strDefApply = "YN";
			if (theSSO.User.EnvSettings.get("OD_APPLY_LIMIT_BY_SEC") != null && theSSO.User.EnvSettings.get("OD_APPLY_LIMIT_BY_SEC") != "")
				strDefApply = theSSO.User.EnvSettings.get("OD_APPLY_LIMIT_BY_SEC").toUpperCase();
			if (strDefApply.length < 2)
				strDefApply = "YN";
			if ($("#dlSec option:selected").val() != "1")
			{
				SetdlApplyLimit("3", strDefApply.substring(1, 2));
			}
			else
			{
				SetdlApplyLimit("3", strDefApply.substring(0, 1));
			}*/
			if ($("#dlSec option:selected").val() != "1")
				SetdlApplyLimit("3", gObj.gDefApplyBySec.substring(1, 2));
			else
				SetdlApplyLimit("3", gObj.gDefApplyBySec.substring(0, 1));

			//增加判斷環境變數是否一併處理案次號連動for中企處
			//環境變數OD_CHECK_FILE_CASE(顯示案次號欄位)改為機關通用，原中企處特殊行為改以機關代碼區隔。
			if (gObj.gFileCaseDisplay == "Y" && SSO_CONFIG.OrgNickName == 'SMEA')
			{
				var strFileCase = $('#txFileCaseNo').val();
				if (jf_Trim(strFileCase) != "" && strFileCase.length >= 2)
				{
					if ($("#dlSec option:selected").val() != "1")
						strFileCase = "B" + strFileCase.substr(1, strFileCase.length);
					else
						strFileCase = "A" + strFileCase.substr(1, strFileCase.length);
				}
				//1060824 David 1060713 修正案次號欄位ID錯誤問題
				//$('#txFileCase').val(strFileCase);
				//ObjOnBlur(null, "txFileCase");
				$('#txFileCaseNo').val(strFileCase);
				ObjOnBlur(null, "txFileCaseNo");
			}

			//調整ODRPUI邏輯，配合開放來文輸入密等，當調整為密以上，同時開放解密條件欄位，並進行相關處理
			if ($('#dlSec option:selected').val() != "1")
			{
				UiSetObjMotifyMode('#comboDSecCond', 'W', '');
				if(theSSO.User.EnvSettings.get("SEC_USE_SUBJECT").toUpperCase() != "Y")
					$('#txSubject').val("密不錄由");
			}
			else
			{
				//切換普通時，帶回原本主旨。
				$('#txSubject').val($('#txInSubject').val());
				$("#comboDSecCond").val("");
				$("#txDSecDate").val("");
				UiSetObjMotifyMode('#comboDSecCond', 'R', '');
			}

			//1130112 David 1121043 新增公文背景顏色處理邏輯
			fnChangeDocBackColor($('#dlSpd option:selected').val(), $("#dlSec option:selected").val());

			break;

		case "txClsNo": //分類號
			if ($('#txClsNo').val() == '') //修改分類號清空onblur時分類名未清空的問題
			{
				//1071214 David 1071179 案次號清空時，一併清空保存年限
				//$('#txClsName, #txFileCaseNo, #txFileCaseName').val('');
				$('#txClsName, #txFileCaseNo, #txFileCaseName, #txKeepYear').val('');

				//清空時設為預設值
				gObj.gbComClsCaseTheSame = false;
				//增觸發母子文分類案次併件檢核
				fnCheckCbComClsCase();

				//1071214 David 1071179 紀錄目前的分類案次號保存年限
				gObj.gNowClsNo = $('#txClsNo').val();
				gObj.gNowFileCaseNo = $('#txFileCaseNo').val();
				gObj.gNowKeepYear = $('#txKeepYear').val();

				//1110221 David 1110086 分類號清空時，如年度號與公文文號前3碼不同時，清空年度號資訊
				if($('#txFileYear').val() != '')
				{
					let strFileYear = "";
					if($('#txDocNo').val() != "")
						strFileYear = $('#txDocNo').val().substr(0,3);
					else
					{
						var dttoday = new Date();
						var newYear = dttoday.getFullYear() - 1911;
						newYear = newYear + "";
						newYear = jf_PADL(newYear, 3, "0");
						strFileYear = newYear;
					}

					if($('#txFileYear').val() != strFileYear)
						$('#txFileYear').val('');
				}

				return;
			}

			//1111226	Joe		1111097		調整檔號全形字變更為半形字
			$('#txClsNo').val(fnFullToHalf($('#txClsNo').val()));
			//依環境變數設定，檢查分類號長度
			var strLmtClsLen = theSSO.User.EnvSettings.get("OD_CLS_LEN");
			if (strLmtClsLen != null && jf_Trim(strLmtClsLen) != '' && strLmtClsLen != "0") {
				var iLmtClsLen = parseInt(strLmtClsLen);
				if (iLmtClsLen != 0) {
					var inpClsNo = jf_Trim($('#txClsNo').val());
					if (inpClsNo.length < iLmtClsLen) {
						alert("分類號至少需輸入" + strLmtClsLen + "碼!!");
						//1080927 David 1080339 jQuery升級3.4.1改寫語法
						//$('#txClsNo').focus();
						$('#txClsNo').trigger("focus");
						return;
					}
				}
			}

			//(僑委會)客製化檢核密等與分類號的關係(密以上，分類號為9開頭；普通則分類號開頭不可為9)
			if (SSO_CONFIG.OrgNickName == 'OCAC') {
				if (!fnChkSecAndClsForOCAC()) {
					//1080927 David 1080339 jQuery升級3.4.1改寫語法
					//$('#txClsNo').value('').focus();
					$('#txClsNo').value('').trigger("focus");
					return;
				}
			}

			if (!WsGetClsInfo('1')) {
				return false;
			}
			else
			{
				//分類號檢核無錯誤時才focus到案次號
				//1090720 David 支援OD_CHECK_FILE_CASE=S設定功能
				//if (gObj.gFileCaseDisplay == "Y")
				if (gObj.gFileCaseDisplay == "Y" || gObj.gFileCaseDisplay == "S")
				{
					//1080927 David 1080339 jQuery升級3.4.1改寫語法
					//$('#txFileCaseNo').focus();
					$('#txFileCaseNo').trigger("focus");
				}
				else
				{
					//新增觸發母子文分類案次併件檢核
					fnCheckCbComClsCase();
				}

				//1071214 David 1071179 紀錄目前的分類案次號保存年限
				gObj.gNowClsNo = $('#txClsNo').val();
				gObj.gNowFileCaseNo = $('#txFileCaseNo').val();
				gObj.gNowKeepYear = $('#txKeepYear').val();

				return true;
			}
			break;

		case "txFileCaseNo": //新增案次號欄位OnBlur檢核
			//1111226	Joe		1111097		調整檔號全形字變更為半形字
			$('#txFileCaseNo').val(fnFullToHalf($('#txFileCaseNo').val()));
			txFileCaseNoOnBlur();
			//新增觸發母子文分類案次併件檢核
			fnCheckCbComClsCase();

			//1071214 David 1071179 紀錄目前的分類案次號保存年限
			gObj.gNowClsNo = $('#txClsNo').val();
			gObj.gNowFileCaseNo = $('#txFileCaseNo').val();
			gObj.gNowKeepYear = $('#txKeepYear').val();

			break;

		case "txKeepYear": //保存年限欄位
			if (jf_Trim($('#txKeepYear').val()) == '')
				return;

			if ($('#txKeepYear')[0].disabled || $('#txKeepYear')[0].readOnly)
				return;

			if (isNaN(jf_Trim($('#txKeepYear').val())) && $('#txKeepYear').val() != "?") {
				alert("保存年限欄位請輸入半形數字，若保存年限為永久請輸入99。");
				//1080927 David 1080339 jQuery升級3.4.1改寫語法
				//$('#txKeepYear').focus();
				$('#txKeepYear').trigger("focus");
				return;
			}

			var paramsCheckKeepYear = {
				"argSessionId": localStorage.Artifact,
				"argSourceOrgNo": gObj.uOrgNo,
				"argClsNo": $('#txClsNo').val(),
				"argKeepYear": $('#txKeepYear').val()
			};
	
			var _dfd = $.Deferred();
			g_QueryDeferred = _dfd;
	
			WsCheckKeepYear(paramsCheckKeepYear, _dfd)
			.then(function (strCheckErr) {
				alert(strCheckErr);
				//1080927 David 1080339 jQuery升級3.4.1改寫語法
				//$('#txKeepYear').val('').focus();
				$('#txKeepYear').val('').trigger("focus");
			})
			.fail(function () {
			});
			break;
		case "txShowApprovedDate":
			//日期檢核
			if($("#txShowApprovedDate").val() == "")
			{
				//1140208 David 1131322 核決日期無值時，清空核決時間
				$('#txShowApprovedTime').val('');
				return;
			}
			//1101126 David 1101275 調整欄位名稱
			//jf_fnChkDate('txShowApprovedDate', "核決時間");
			jf_fnChkDate('txShowApprovedDate', "核決日期");
			break;
		case "tx_ODC013_UpIssueDate":
			//日期檢核
			if($("#tx_ODC013_UpIssueDate").val() == "")
				return;
			jf_fnChkDate('tx_ODC013_UpIssueDate', "上級發文日");
			break;
		case "tx_ODC012_ApprovedDate":
			//日期檢核
			if($("#tx_ODC012_ApprovedDate").val() == "")
				return;
			jf_fnChkDate('tx_ODC012_ApprovedDate', "核決日期");
			break;
		case "tx_ODC012_UpIssueDate": //上級發文日
			if(jf_fnChkDate("tx_ODC012_UpIssueDate", "上級發文日"))
				fnODC012CloseDateChange()
			break;
		case "tx_ODC012_ApprovedDate": //核決日期
			if(jf_fnChkDate("tx_ODC012_ApprovedDate", "核決日期"))
				fnODC012CloseDateChange()
			break;
		//1061108 David 1061074 新增文別連動處理
		case "dlDocCategory":
			fnDocCategoryChange();
			break;
		//1090914 David 1090557 新增信保欄位連動處理
		case "txClientCardNo"://專案卡號
			if ($('#txClientCardNo').val() == '')
			{
				//1091127 David 1090557 調整當原本專案卡號不為空時，才清空統一編號
				//$('#txClientName, #txTaxIdNo, #txTaxIdName').val('');
				$('#txClientName').val('');
				if(gObj.gClientCardNo != "")
				{
					$('#txTaxIdNo, #txTaxIdName').val('');
					gObj.gClientCardNo = "";
				}

				UiSetObjMotifyMode('#txTaxIdNo,#txManageBankNo,#txManageCaseNo', 'W', '');
				if($('#txClsNo').val() == "AA")
				{
					$('#txClsNo').val('');
					ObjOnBlur(null ,'txClsNo');
				}
				return;
			}
			if ($('#txClientCardNo').val().length != 8)
				$('#txClientCardNo').val(jf_PADL($('#txClientCardNo').val(), 8, "0"));

			var paramsGetCardInfo = {
				"argCardNo": $('#txClientCardNo').val()
			};

			var _dfd = $.Deferred();
			g_QueryDeferred = _dfd;

			WsGetSmegInfo("GetCardInfo", paramsGetCardInfo, _dfd)
			.pipe(function (rtn) {
				$('#txManageBankNo, #txManageCaseNo, #txManageName').val('');
				$('#txClientName').val(rtn.ClientName);
				$('#txTaxIdNo').val(rtn.TxIdNo);
				$('#txTaxIdName').val(rtn.TxIdName);
				UiSetObjMotifyMode('#txTaxIdNo,#txManageBankNo,#txManageCaseNo', 'R', '');
				//1091127 David 1090557 紀錄目前的專案卡號
				gObj.gClientCardNo = $('#txClientCardNo').val();

				//分類號帶入AA
				$('#txClsNo').val('AA');
				if(!ObjOnBlur(null ,'txClsNo'))
					return;
				else
				{
					$("#txFileCaseNo").val($('#txClientCardNo').val());
					$("#txFileCaseName").val($('#txClientName').val());
					ObjOnBlur(null ,'txFileCaseNo');
				}
			})
			.fail(function (strErr) {
				alert(strErr);
				$('#txClientCardNo').val('').trigger("focus");
				$('#txClientCardName, #txTaxIdNo, #txTaxIdName').val('');
				UiSetObjMotifyMode('#txTaxIdNo,#txManageBankNo,#txManageCaseNo', 'W', '');
				
				$('#txClsNo').val('');
				ObjOnBlur(null ,'txClsNo');
			});
			break;
		case "txTaxIdNo"://統一編號
			if ($('#txTaxIdNo').val() == '')
			{
				$('#txTaxIdName').val('');
				return;
			}
			if ($('#txTaxIdNo').val().length != 8)
				$('#txTaxIdNo').val(jf_PADL($('#txTaxIdNo').val(), 8, "0"));

			var paramsGetTaxIdInfo = {
				"argTxidNo": $('#txTaxIdNo').val()
			};

			var _dfd = $.Deferred();
			g_QueryDeferred = _dfd;

			WsGetSmegInfo("GetTaxIdInfo", paramsGetTaxIdInfo, _dfd)
			.pipe(function (rtn) {
				$('#txTaxIdName').val(rtn.TxIdName);
			})
			.fail(function (strErr) {
				alert(strErr);
				//$('#txTaxIdNo').val('').trigger("focus");
			});
			break;
		case "txManageBankNo"://列管銀行代號
		case "txManageCaseNo"://列管卡號
			if ($('#txManageBankNo').val() == "" || $('#txManageCaseNo').val() == "")
			{
				UiSetObjMotifyMode('#txClientCardNo,#txTaxIdNo,#txBankCode,#txBankBranchCode', 'W', '');
				//1091127 David 1090557 調整當原本列管編號不為空時，才清空統編跟銀行代碼
				//$('#txManageName, #txTaxIdNo, #txTaxIdName, #txBankCode, #txBankName, #txBankBranchCode, #txBankBranchName, #txShowBankName').val('');
				$('#txManageName').val('');
				if(gObj.gManageBankNo != "" && gObj.gManageCaseNo != "")
				{
					$('#txTaxIdNo, #txTaxIdName, #txBankCode, #txBankName, #txBankBranchCode, #txBankBranchName, #txShowBankName').val('');
					gObj.gManageBankNo = "";
					gObj.gManageCaseNo = "";
				}

				if($('#txClsNo').val() == "BB")
				{
					$('#txClsNo').val('');
					ObjOnBlur(null ,'txClsNo');
				}
				return;
			}
			if ($('#txManageBankNo').val() != "" && $('#txManageBankNo').val().length != 3)
				$('#txManageBankNo').val(jf_PADL($('#txManageBankNo').val(), 3, "0"));
			
			if ($('#txManageCaseNo').val() != "" && $('#txManageCaseNo').val().length != 6)
				$('#txManageCaseNo').val(jf_PADL($('#txManageCaseNo').val(), 6, "0"));

			var paramsGetTaxIdInfo = {
				"argBankNo": $('#txManageBankNo').val()
				,"argCaseNo": $('#txManageCaseNo').val()
			};

			var _dfd = $.Deferred();
			g_QueryDeferred = _dfd;

			WsGetSmegInfo("GetManageInfo", paramsGetTaxIdInfo, _dfd)
			.pipe(function (rtn) {
				$('#txManageName').val(rtn.txManageName);
				$('#txClientCardNo, #txClientName').val('');
				$('#txTaxIdNo').val(rtn.TxIdNo);
				$('#txTaxIdName').val(rtn.TxIdName);
				$('#txBankCode').val(rtn.BankCode);
				$('#txBankName').val(rtn.BankName);
				$('#txManageName').val(rtn.BankName + "-" + rtn.TxIdName);
				$('#txBankBranchCode').val(rtn.BankBranchCode);
				$('#txBankBranchName').val(rtn.BankBranchName);
				$('#txShowBankName').val(rtn.BankName + "-" + rtn.BankBranchName);
				UiSetObjMotifyMode('#txClientCardNo,#txTaxIdNo,#txBankCode,#txBankBranchCode', 'R', '');
				//1091127 David 1090557 紀錄目前的列管編號
				gObj.gManageBankNo = $('#txManageBankNo').val();
				gObj.gManageCaseNo = $('#txManageCaseNo').val();
				
				//分類號帶入BB
				$('#txClsNo').val('BB');
				if(!ObjOnBlur(null ,'txClsNo'))
					return;
				else
				{		
					$("#txFileCaseNo").val($('#txManageBankNo').val() + $('#txManageCaseNo').val());
					$("#txFileCaseName").val($('#txManageName').val());
					ObjOnBlur(null ,'txFileCaseNo');
				}
			})
			.fail(function (strErr) {
				alert(strErr);
				UiSetObjMotifyMode('#txClientCardNo,#txTaxIdNo,#txBankCode,#txBankBranchCode', 'W', '');
				$('#txManageBankNo').val('').trigger("focus");
				
				$('#txClsNo').val('');
				ObjOnBlur(null ,'txClsNo');
			});
			break;
		case "txBankCode"://銀行總行代碼
			if ($('#txBankCode').val() == '')
			{
				$('#txBankName, #txBankBranchCode, #txBankBranchName, #txShowBankName').val('');
				return;
			}
			if ($('#txBankCode').val().length != 3)
				$('#txBankCode').val(jf_PADL($('#txBankCode').val(), 3, "0"));

			var paramsGetBankInfo = {
				"argBankCode": $('#txBankCode').val()
				,"argBranchCode": $('#txBankBranchCode').val()
			};

			var _dfd = $.Deferred();
			g_QueryDeferred = _dfd;

			WsGetSmegInfo("GetBankInfo", paramsGetBankInfo, _dfd)
			.pipe(function (rtn) {
				$('#txBankName').val(rtn.BankName);
				if($('#txBankBranchCode').val() == "")
					$('#txShowBankName').val(rtn.BankName);
				else
				{
					$('#txBankBranchName').val(rtn.BankBranchName);
					$('#txShowBankName').val(rtn.BankName + "-" + rtn.BankBranchName);
				}
			})
			.fail(function (strErr) {
				alert(strErr);
				$('#txBankCode').val('').trigger("focus");
				$('#txBankName, #txBankBranchCode, #txBankBranchName, #txShowBankName').val('');
			});
			break;
			break;
		case "txBankBranchCode"://銀行分行代碼
			if ($('#txBankBranchCode').val() == '')
			{
				$('#txBankBranchName').val('');
				if($('#txBankName').val() != '')
					$('#txShowBankName').val($('#txBankName').val());
				return;
			}

			if ($('#txBankBranchCode').val().length != 4)
				$('#txBankBranchCode').val(jf_PADL($('#txBankBranchCode').val(), 4, "0"));

			var paramsGetBankInfo = {
				"argBankCode": $('#txBankCode').val()
				,"argBranchCode": $('#txBankBranchCode').val()
			};

			var _dfd = $.Deferred();
			g_QueryDeferred = _dfd;

			WsGetSmegInfo("GetBankInfo", paramsGetBankInfo, _dfd)
			.pipe(function (rtn) {
				$('#txBankName').val(rtn.BankName);
				$('#txBankBranchName').val(rtn.BankBranchName);
				$('#txShowBankName').val(rtn.BankName + "-" + rtn.BankBranchName);
			})
			.fail(function (strErr) {
				alert(strErr);
				$('#txBankBranchCode').val('').trigger("focus");
				$('#txBankBranchName').val('');
				if($('#txBankName').val() != '')
					$('#txShowBankName').val($('#txBankName').val());
			});
			break;
		//1101126 David 1101275 新增核決時間檢核
		case "txShowApprovedTime":
			if ($('#txShowApprovedTime').val() == "")
				return true;

			if ($('#txShowApprovedTime').val().length < 4)
				$('#txShowApprovedTime').val(jf_PADL($('#txShowApprovedTime').val(), 4, "0"));
			
			let strShowApprovedTime = $('#txShowApprovedTime').val();
			
			let iHours = parseInt(strShowApprovedTime.substr(0, 2), 10);
			let iMinutes = parseInt(strShowApprovedTime.substr(2, 2), 10);
			
			if(iHours > 23 || iMinutes >59)
			{
				alert("核決時間格式錯誤");
				$('#txShowApprovedTime').val("").trigger("focus");
				return false;
			}
			return true;
			break;
		//1140725 David 1140784 新增紙本併同歸檔選單處理
		case "dlIsRcvFile":
			if($('#dlIsRcvFile').val() == "0")
			{
				$("#txIsRcvFile").val("0");
				$("#txRcvFileCnt").val("0");
				UiSetObjMotifyMode("#txRcvFileCnt", "R", "");
			}
			else
			{
				$("#txIsRcvFile").val("1");
				UiSetObjMotifyMode("#txRcvFileCnt", "W", "");
			}
			break;
		default:
			break;
	}
}

function fnChkSecAndClsForOCAC() {
	var bPassChk = true;
	var strClsNo = jf_Trim($('#txClsNo').val());

	if ($("#dlSec option:selected").val() != "1") { //密以上，分類號為9開頭
		if (strClsNo != "" && strClsNo.length >= 1 && strClsNo.substring(0, 1) != '9') {
			bPassChk = false;
			alert("密件公文分類號開頭需為9");
		}
	}
	else { //普通，分類號開頭不可為9
		if (strClsNo != "" && strClsNo.length >= 1 && strClsNo.substring(0, 1) == '9') {
			bPassChk = false;
			alert("非密件公文分類號開頭不可為9");
		}
	}
	return bPassChk;
}

function fndlPropertyOnChange(event) //公文性質
{
	if ($('#dlProperty')[0].selectedIndex == -1) {
		return;
	}

	//若變更公文性質時要跳出提示訊息
	if (event && event.target.id == "dlProperty") {
		if (!fnChangeDueDateConfirm(event.target))
			return;
	}

	//依rita指示,併案情形若為彙辦或併辦,則公文性質不可為專案管理類型之工作
	var sDocProperty = $('#dlProperty option:selected').val();

	if ($('#dlComType')[0].selectedIndex == 1 || $('#dlComType')[0].selectedIndex == 2) {
		if (sDocProperty == "3" || sDocProperty == "4" || sDocProperty == "5" || sDocProperty == "6" || sDocProperty == "7")
		{
			alert('彙併辦公文,不可選擇以案管制類之公文性質[' + $('#dlProperty option:selected').text() + ']');
			UiSetDlItemByValue("dlProperty","1");
			//1080927 David 1080339 jQuery升級3.4.1改寫語法
			//$('#dlProperty')[0].focus();
			//1090612 David 1090407 調整寫法
			//$('#dlProperty')[0].trigger("focus");
			$('#dlProperty').trigger("focus");
			return;
		}
	}
	if (gObj.gtxDocProperty == sDocProperty) {
		return;
	}
	if (sDocProperty == "") {
		gObj.gtxDocProperty = "";
		gObj.uWorkTypeNow = "";

		$('#txDueDate').val('');

		UiSetObjMotifyMode('#txLeadTime', 'R', '');
		UiSetObjMotifyMode('#dlLtUom', 'R', '');

		$('#dlWorkType').empty().selectmenu('refresh');
		//$('#dlStepName').empty().selectmenu('refresh');
		return;
	}

	//取得業務類別相關控制
	WsGetWorkTypeDll($('#dlProperty option:selected').val());

	//案件編號相關控制
	UiCtrlCaseNo();
	//立案相關控制
	UiCaseRelatedCtrl();

	//切換公文性質為「一般公文限期辦畢」時，速別自動調整到「4：」
	//1090612 David 1090407 速別預帶空白依照業務類別判斷，此處不需要
	/*if($('#dlProperty option:selected').val() == "2")
	{
		UiSetDlItemByValue("dlSpd","4");
		dlSpdOnChange();
	}
	else
	{
		//如公文性質由限期辦畢調整為其他時，需將速別調整為預設值，避免無法計算限辦日期
		if($('#dlSpd option:selected').val() == "4")
		{
			UiSetDlItemByValue("dlSpd","1");
			dlSpdOnChange();
		}
	}*/
}

//iCallID_CheckCombine
function fnComNo(paramsCheckCombine) {

	// setup Deferred object
	var _dfd = $.Deferred();
	g_QueryDeferred = _dfd;

	var rtn;
	var bWsSuccess = true;

	WsCheckCombine(paramsCheckCombine, _dfd)
	//1081121 David 1080339 .then()改為.pipe()
	//.then(function (rtn2) {
	.pipe(function (rtn2) {
		rtn = rtn2
	})
	.fail(function (errMsg) {

		if (errMsg != "")
			alert(errMsg);
		else
			alert('查無此併案文號');
		if ($('#dlProperty option:selected').text() != "專案管制") {
			$('txCaseNo').val('');
			gObj.gCaseNoBeforeChange = "";
		}
		//1080927 David 1080339 jQuery升級3.4.1改寫語法
		//$('#txComNo').val('').focus();
		$('#txComNo').val('').trigger("focus");
		bWsSuccess = false;
	});
	
	if(!bWsSuccess)
		return false;

	//當併案母文號和公文文號相同時不檢核
	if (rtn.ComNo.split(":")[0] != $('#txDocNo').val())
	{
		// 新增檢核來文字號、關鍵字、署收件號、承辦單位
		var paramsws_CheckDeptNoAndFromNo = {
			"argArtifact": localStorage.Artifact
			, "argSourceOrgNo": gObj.uOrgNo
			, "argComNo": rtn.ComNo.split(":")[0]
			, "argDocNo": $('#txDocNo').val()
			, "argKeyWord": $('#txKeyWord').val()
		};

		// setup Deferred object
		var bCheckDeferred = true;
		var _dfd = $.Deferred();
		g_QueryDeferred = _dfd;
		//1060609 David 1060295 檢核可否設定併案陳核WS改回傳物件，調整處理邏輯
		/*WsCheckDeptNoAndFromNo(paramsws_CheckDeptNoAndFromNo, _dfd)
		.then(function (rtnsStr)
		{			
			var aryMsg = rtnsStr.split("|");
			if (aryMsg.length) {
				for (i = 0 ; i < aryMsg.length ; i++) {
					if (!confirm(aryMsg[i]))
						bCheckDeferred = false;
				}
			}
			else {
				if (!confirm(aryMsg))
					bCheckDeferred = false;
			}
		})
		.fail(function () {
			bCheckDeferred = true;
		});*/
		//1060808 David 1060698 新增錯誤處理
		try
		{
			WsCheckDeptNoAndFromNo(paramsws_CheckDeptNoAndFromNo, _dfd)
			//1081121 David 1080339 .then()改為.pipe()
			//.then(function (rtn)
			.pipe(function (rtn)
			{
				if(rtn.bCanCombine == "false")
				{
					//不允許併案時顯示訊息
					bCheckDeferred = false;
					alert(rtn.CantMsg);
				}
				else
				{
					if(rtn.ConfirmMsg != "")
					{
						//允許併案但需由使用者確認
						var aryMsg = rtn.ConfirmMsg.split("|");
						if (aryMsg.length) {
							for (i = 0 ; i < aryMsg.length ; i++) {
								if (!confirm(aryMsg[i]))
									bCheckDeferred = false;
							}
						}
						else {
							if (!confirm(aryMsg))
								bCheckDeferred = false;
						}
					}
					else
					{
						//允許併案且不需詢問
						bCheckDeferred = true;
					}
				}
			})
			.fail(function (rtn) {
				//呼叫WS異常，中止後續處理
				bCheckDeferred = false;
				alert("判斷能否併案發生異常，錯誤訊息：" + rtn);
			});
		}
		catch(ex)
		{
			alert("判斷能否併案發生異常，錯誤訊息：" + ex.message);
			bCheckDeferred = false;
		}
		
		if(!bCheckDeferred)
			return false;
	}

	//將相關文號存入dlComNo，待存檔至WDCM時，將相關文號存入
	$('#dlComNo')[0].length = 0;
	//1090506 David 1080867 新增紀錄COMBINE_TYPE
	$('#dlCombineType')[0].length = 0;
	var pComNoAry = rtn.ComNo.split(":");
	var pCaseNoAry = rtn.CaseNo.split(":");

	var pClsNoAry = rtn.ClsNo.split(":");
	var pFileCaseAry = rtn.FileCase.split(":");
	var pKeepYearAry = rtn.KeepYear.split(":");
	var pKeyWord = rtn.keyword.split(":");
	var pDocPropertyAry = rtn.DocProperty.split(":");
	var pBTypeNoAry = rtn.BTypeNo.split(":");
	var pStepNameAry = rtn.StepName.split(":");
	var pFileYear = rtn.FileYear.split(":");//1110221 David 1110086 紀錄年度號

	var pSignTypeAry = rtn.SignType.split(":");

	var bComNoAndDocNoDifferent = false;
	var strComClsNo = "";
	var strComFileCase = "";
	var strComKeepYear = "";
	var strComKeyWord = "";
	var strComDocProperty = "";
	var strComBTypeNo = "";
	var strCompStepName = "";
	var strComFileYear = "";//1110221 David 1110086 紀錄母文年度號

	for (var i = 0 ; i < pComNoAry.length; i++)
	{
		if (i == 0)//第一筆(母文)塞到畫面上
		{
			//不論併案文號是否與公文文號相同，需將對應的案件編號更新到畫面中
			$('#txComNo').val(pComNoAry[i]);
			$('#txCaseNo').val(pCaseNoAry[i]);
			gObj.gCaseNoBeforeChange = $('#txCaseNo').val();
			if (pComNoAry[i] != $('#txDocNo').val())
			{
				bComNoAndDocNoDifferent = true;
				strComClsNo = jf_Trim(pClsNoAry[i]);
				strComFileCase = jf_Trim(pFileCaseAry[i]);
				strComKeepYear = jf_Trim(pKeepYearAry[i]);
				strComKeyWord = jf_Trim(pKeyWord[i]);
				strComDocProperty = jf_Trim(pDocPropertyAry[i]);
				strComBTypeNo = jf_Trim(pBTypeNoAry[i]);
				strCompStepName = jf_Trim(pStepNameAry[i]);
				strComFileYear = jf_Trim(pFileYear[i]);//1110221 David 1110086 紀錄母文年度號
			}
		}

		//找出若母文的分類號為空白時，找出第一筆分類號不為空白之子文帶入
		if (strComClsNo == "")
		{
			if (pClsNoAry[i])
			{
				strComClsNo = jf_Trim(pClsNoAry[i]);
				strComKeepYear = jf_Trim(pKeepYearAry[i]);
				strComFileYear = jf_Trim(pFileYear[i]);//1110221 David 1110086 紀錄年度號
			}
		}

		var objOption = new Option(pComNoAry[i], pSignTypeAry[i]);
		$('#dlComNo')[0].options.add(objOption);
		//1090506 David 1080867 新增紀錄COMBINE_TYPE，由ODC010輸入母文號，一定是併案陳核
		var CombineTypeOption = new Option("併案陳核", "3");
		$('#dlCombineType')[0].options.add(CombineTypeOption);
	}

	//依取得之母文資訊進行相關檢核
	if(bComNoAndDocNoDifferent)
	{
		//原行為
		if (theSSO.User.EnvSettings.get("OD_ODC010_CHECK_COM_NO_CLS").toUpperCase() == "Y")
		{
			if (strComClsNo != "" && jf_Trim($('#txClsNo').val()) == "")
			{
				$('#txClsNo').val(strComClsNo);
				if (gObj.gFileCaseDisplay == "Y" || gObj.gFileCaseDisplay == "S")//案次號顯示時才處理案次號
					$('#txFileCaseNo').val(strComFileCase);

				$('#txFileYear').val(strComFileYear);//1110221 David 1110086 依母文年度號設定

				gObj.gbComClsCaseTheSame = true;

				//觸發分類號Onblur事件
				ObjOnBlur(null, 'txClsNo');
			}
			else if (strComClsNo != "" && jf_Trim($('#txClsNo').val()) != "" && strComClsNo != jf_Trim($('#txClsNo').val()))
			{
				alert("與相關併案分類號" + strComClsNo + "不同，不允許併案");
				//1080927 David 1080339 jQuery升級3.4.1改寫語法
				//$('#txClsNo').val('').focus();
				$('#txClsNo').val('').trigger("focus");
				if (gObj.gFileCaseDisplay == "Y" || gObj.gFileCaseDisplay == "S")//案次號顯示時才處理案次號
					$('#txFileCaseNo').val('');

				gObj.gbComClsCaseTheSame = false;
			}
			//1020328 David 1010952 若母文分類號(案次號)為空，將子文分類號(案次號)更新回母文
			else if (strComClsNo == "" && jf_Trim($('#txClsNo').val()) != "")
			{
				if (confirm("目前母文分類號(案次號)為空，是否將畫面上分類號(案次號)更新回母文？"))
				{
					var paramsUpdateComClsCase = {
						"argSessionID": localStorage.Artifact
						, "argSourceOrgno": gObj.uOrgNo
						, "argComNo": $('#txComNo').val()
						, "argFileCls": $('#txClsNo').val()
						, "argFileYear": ''
						, "argFileCase": ''
						, "argbUpdateFileCase": false
					};

					if ((gObj.gFileCaseDisplay == "Y" || gObj.gFileCaseDisplay == "S") && $('#txFileCaseNo').val() != "")//案次號顯示且有值時才處理
					{
						paramsUpdateComClsCase.argFileYear = $('#txFileYear').val();
						paramsUpdateComClsCase.argFileCase = $('#txFileCaseNo').val();
						paramsUpdateComClsCase.argbUpdateFileCase = true;
					}

					// setup Deferred object
					var _dfd = $.Deferred();
					g_QueryDeferred = _dfd;

					WsUpdateComClsCase(paramsUpdateComClsCase, _dfd)
					//1060808 David 1060698 修正更新成功處理
					/*.then(function (rslt) {
						if (rslt.success) {
							gObj.gbComClsCaseTheSame = true;//完成後設定母子文分類案次號相同
							alert("更新成功");
						}
					})*/
					//1081121 David 1080339 .then()改為.pipe()
					//.then(function () {
					.pipe(function () {
						gObj.gbComClsCaseTheSame = true;//完成後設定母子文分類案次號相同
						alert("更新成功");
					})
					.fail(function (errMsg) {
						alert(errMsg);
					});
				}
			}
			else if(strComClsNo == jf_Trim($('#txClsNo').val()))
			{
				gObj.gbComClsCaseTheSame = true;
			}
		}
		else//新行為
		{
			var bFileCaseNeedCheck = false;
			if (gObj.gFileCaseDisplay == "Y" || gObj.gFileCaseDisplay == "S")//案次號顯示時才處理案次號
				bFileCaseNeedCheck = true;

			if (strComClsNo != "")//母文分類號不為空時才檢核
			{
				if (($('#txClsNo').val() != "" && $('#txClsNo').val() != strComClsNo) ||
					//1140304 David 1140136 比對母子文案次號時，需加上年度號條件
					//(bFileCaseNeedCheck && $('#txFileCaseNo').val() != "" && $('#txFileCaseNo').val() != strComFileCase))
					(bFileCaseNeedCheck && $('#txFileCaseNo').val() != "" && 
					($('#txFileCaseNo').val() != strComFileCase || $('#txFileYear').val() != strComFileYear)))
				{
					var CheckClsMsg = "本份文的「分類號」";
					if (bFileCaseNeedCheck)
						CheckClsMsg += "、「案次號」";
					CheckClsMsg += "與母文不同\n\r選擇『確定』將自動調整「分類號」";
					if (bFileCaseNeedCheck)
						CheckClsMsg += "、「案次號」";
					CheckClsMsg += "同母文，或是選擇『取消』保持原設定？";
					var Rtnbool = window.confirm(CheckClsMsg);
					if (Rtnbool)
					{
						$('#txClsNo').val(strComClsNo);
						
						if (gObj.gFileCaseDisplay == "Y" || gObj.gFileCaseDisplay == "S") //案次號顯示時才處理案次號
							$('#txFileCaseNo').val(strComFileCase);
						if (strComKeepYear != "")
							$('#txKeepYear').val(strComKeepYear);
						$('#txFileYear').val(strComFileYear);//1110221 David 1110086 依母文年度號設定

						gObj.gbComClsCaseTheSame = true;

						//觸發分類號Onblur事件
						ObjOnBlur(null, 'txClsNo');
					}
					else
					{
						gObj.gbComClsCaseTheSame = false;
					}
				}
				else
				{
					$('#txClsNo').val(strComClsNo);

					if (gObj.gFileCaseDisplay == "Y" || gObj.gFileCaseDisplay == "S") //案次號顯示時才處理案次號
						$('#txFileCaseNo').val(strComFileCase);
					if (strComKeepYear != "")
						$('#txKeepYear').val(strComKeepYear);
					$('#txFileYear').val(strComFileYear);//1110221 David 1110086 依母文年度號設定

					gObj.gbComClsCaseTheSame = true;

					//觸發分類號Onblur事件
					ObjOnBlur(null, 'txClsNo');
				}
			}
			else
			{
				//若母文分類號(案次號)為空，將子文分類號(案次號)更新回母文
				if ($('#txClsNo').val() != "")
				{
					if (confirm("目前母文分類號(案次號)為空，是否將畫面上分類號(案次號)更新回母文？"))
					{
						var paramsUpdateComClsCase = {
							"argSessionID": localStorage.Artifact
							, "argSourceOrgno": gObj.uOrgNo
							, "argComNo": $('#txComNo').val()
							, "argFileCls": $('#txClsNo').val()
							, "argFileYear": ''
							, "argFileCase": ''
							, "argbUpdateFileCase": false
						};

						if ((gObj.gFileCaseDisplay == "Y" || gObj.gFileCaseDisplay == "S") && $('#txFileCaseNo').val() != "")//案次號顯示且有值時才處理
						{
							paramsUpdateComClsCase.argFileYear = $('#txFileYear').val();
							paramsUpdateComClsCase.argFileCase = $('#txFileCaseNo').val();
							paramsUpdateComClsCase.argbUpdateFileCase = true;
						}

						// setup Deferred object
						var _dfd = $.Deferred();
						g_QueryDeferred = _dfd;

						WsUpdateComClsCase(paramsUpdateComClsCase, _dfd)
						//1070530 David 修正更新成功處理
						/*.then(function (rslt) {
							if (rslt.success) {
								gObj.gbComClsCaseTheSame = true;//完成後設定母子文分類案次號相同
								alert("更新成功");
							}
						})*/
						//1081121 David 1080339 .then()改為.pipe()
						//.then(function () {
						.pipe(function () {
							gObj.gbComClsCaseTheSame = true;//完成後設定母子文分類案次號相同
							alert("更新成功");
						})
						.fail(function (errMsg) {
							alert(errMsg);
						});
					}
				}
			}
		}

		if (strComKeyWord != "") //帶回關鍵字
			$('#txKeyWord').val(strComKeyWord);

		if (strComDocProperty != $('#dlProperty option:selected').val())//設定併案母文時，如母文公文性質與子文不同，顯示確認訊息
		{
			var strComDocPropertyName = "";
			for (var iPro = 0 ; iPro < $('#dlProperty')[0].options.length ; iPro++)
			{
				var option = $('#dlProperty')[0].options[iPro];
				if (option.value == strComDocProperty)
				{
					strComDocPropertyName = option.text;
					break;
				}
			}
			var strDocPropertyName = $('#dlProperty option:selected').text();

			if (confirm("目前公文性質「" + strDocPropertyName + "」與母文公文性質「" + strComDocPropertyName + "」不同，是否需自動帶入？"))
			{
				UiSetDlItemByValue("dlProperty", strComDocProperty);
				fndlPropertyOnChange();

				//有設定預設業務類別時，帶入該設定
				var strDef = theSSO.User.EnvSettings.get("OD_DEFAULT_BTYPENO_" + strComDocProperty);
				if (strDef != "")
				{
					UiSetDlItemByValue("dlWorkType", strDef);
					ObjOnBlur(null, 'dlWorkType');
					//fnSetDDLValueByText(document.all.dlStepName, strCompStepName);
				}
				
				//(FDA客製化)新增當母文為人民申請時，不允許子文異動業務類別
				if(SSO_CONFIG.OrgNickName == 'FDA' && $('#dlProperty option:selected').val() == '5')
				{
					UiSetObjMotifyMode('#dlWorkType,#txWorkTypeNo', 'R', '');
				}
			}
		}
		else
		{
			if (SSO_CONFIG.OrgNickName == 'FDA')
			{
				//有設定預設業務類別時，帶入該設定
				var strDef = theSSO.User.EnvSettings.get("OD_DEFAULT_BTYPENO_" + strComDocProperty);
				if (strDef != "")
				{
					UiSetDlItemByValue("dlWorkType", strDef);

					ObjOnBlur(null, "dlWorkType");
					//fnSetDDLValueByText(document.all.dlStepName, strCompStepName);

					//(FDA客製化)新增當母文為人民申請時，不允許子文異動業務類別
					if($('#dlProperty option:selected').val() == '5')
					{
						UiSetObjMotifyMode('#dlWorkType,#txWorkTypeNo', 'R', '');
					}
				}
			}
		}

		//不應以是否有設定預設業務類別判斷流程是否須帶入母文之承辦單位承辦人
		if(gObj.uSubFolder == "主辦待分辦")
		{
			var paramsGetDocInfo = {
				"argSessionID": localStorage.Artifact
				, "argDocNo": $('#txComNo').val()
				, "argSourceOrgNo": gObj.uOrgNo
			};

			var _dfd = $.Deferred();
			g_QueryDeferred = _dfd;

			WsGetDocInfo(paramsGetDocInfo, _dfd)
			//1081121 David 1080339 .then()改為.pipe()
			//.then(function (rtn)
			.pipe(function (rtn)
			{
				var SetOuId = "";
				var SetOuName = "";
				var SetUserId = "";
				var SetUserName = "";
				//1.先判斷是否有科別代碼，若有且為3碼則以科別代碼設定
				if(rtn.SectNo != "" && rtn.SectNo >= 3)
				{
					SetOuId = rtn.SectNo;
					SetOuName = rtn.SectName;
				}
				else//2.若沒有科別代碼，則以單位代碼設定
				{
					SetOuId =rtn.DeptNo;
					SetOuName = rtn.DeptName;
				}

				SetUserId = rtn.Username;
				SetUserName = rtn.EmpName;

				var nextTarget = {
					TxName : "分辦",
					OUId : SetOuId,
					OUName : SetOuName,
					RoleId : "OD99",
					RoleName : "承辦人",
					UserId : SetUserId,
					UserName : SetUserName
				}

				var SetComNoObj_ODWMSG = theAOL.docObj.get('ODWMSG', alODWMSG);
				var SetComNoObj_ODWDCM = theAOL.docObj.get('ODWDCM', alODWDCM);

				var SSOSetTargetObj = SSOUtil.updatePDocTransTargetFromDI(theAOL.docObj, nextTarget, SetComNoObj_ODWMSG, SetComNoObj_ODWDCM);
				if(typeof SSOSetTargetObj != "undefined" && typeof SSOSetTargetObj.match_all != "undefined")
				{
					if(!SSOSetTargetObj.match_all)
					{
						switch(SSOSetTargetObj.match_level)
						{
							case -1:
								alert("無法設定母文承辦人，母文承辦單位。\n錯誤原因：無「分辦」異動別可使用。");
								break;
							case 0:
								alert("無法設定母文承辦人，母文承辦單位。\n錯誤原因：無對應承辦單位可設定。");
								break;
							case 1:
							case 2:
								alert("無法設定母文承辦人，母文承辦單位。\n錯誤原因：無對應承辦人員可設定。");
								break;
						}
					}
				}
			})
			.fail(function (errMsg) {
				alert(errMsg);
			});
		}
	}

	//當併案文號onblur通過檢核
	UiSetDlItemByValue("dlComType", "3");
	return true;
}

//取得時效統計類別
function GetSumType(argInit) {

	console.log('WsGetSumType()', argInit);

	if($('#dlWorkType')[0].selectedIndex == -1)
		return;

	if ($('#dlWorkType option:selected').val() == '')
		return;

	//呼叫 WS 取得該業務類別下之時效統計類別及處理期限是否可人工輸入
	var paramsGetSumType = {
		"argSessionID": localStorage.Artifact,
		"argSourceOrgNo": gObj.uOrgNo,
		"argDocProperty": $('#dlProperty option:selected').val(),
		"argSpdNo": $('#dlSpd option:selected').val(),
		"argBTypeNo": $('#dlWorkType option:selected').val(),
		//1140718	Joe		1140937		新增日期計算支援傳入創稿類型
		// "argRcvDate": $('#txRcvDate').val()
		"argRcvDate": $('#txRcvDate').val(),
		"argFromDate": "",
		"argNewByOU": $('#cbNewByOu')[0].checked ? "Y" : "N"
	};

	var dfdGetSumType = $.Deferred();
	g_QueryDeferred = dfdGetSumType;
	WsGetSumType(paramsGetSumType, dfdGetSumType)
	//1081121 David 1080339 .then()改為.pipe()
	//.then(function (rtn)
	.pipe(function (rtn)
	{
		if (argInit)
		{
			gObj.gtxLtIncHd = rtn.LtIncHd;
			gObj.gtxLtBy = rtn.LtBy;
			gObj.gtxLeadTimeDB = rtn.LeadTimeDB;

			//處理期限
			if ($('#txLeadTime').val() == '' || $('#txLeadTime').val() == "0" || !gObj.gFirstLoadPage)
				$('#txLeadTime').val(rtn.LeadTimeDB);

			if (rtn.LtBy == "I") //使用者輸入
			{
				if (gModifyMode == "A" || gModifyMode == "O")
					UiSetObjMotifyMode('#dlLtUom,#txLeadTime', 'W', '');

				//1060920 David 1060664 修正欄位可否異動邏輯
				//UiSetObjMotifyMode('#txMeetDate,#txDueDate', 'R', '');
				$('#txMeetDate').val("");
				UiSetObjMotifyMode('#txMeetDate', 'R', '');
				UiSetObjMotifyMode('#txDueDate', 'W', '');
				//1140619 David 1140885 可人工輸入限辦日期時，如為來文公文，不允許異動限辦日期相關欄位
				if(!$("#cbNewByOu")[0].checked)
					UiSetObjMotifyMode('#dlLtUom,#txLeadTime,#txDueDate', 'R', '');
			}
			else if (rtn.LtBy == "M")//開會日期
			{
				if (gModifyMode == "A" || gModifyMode == "O")
					UiSetObjMotifyMode('#txLeadTime,#dlLtUom,#txMeetDate', 'W', '');

				UiSetObjMotifyMode('#txDueDate', 'R', '');
			}
			else//由系統計算
			{
				UiSetObjMotifyMode('#dlLtUom,#txLeadTime,#txMeetDate,#txDueDate', 'R', '');
			}

			//起算日期
			if (rtn.StartRule == "3" && !gObj.gIsFirstDoc)//人工輸入
			{
				if (gModifyMode == "A" || gModifyMode == "O") { //擴充O屬性完全開放主旨欄位
					UiSetObjMotifyMode('#txStartDate', 'W', '');
				}
			}
			else
			{
				//系統計算
				UiSetObjMotifyMode('#txStartDate', 'R', '');
			}
			return true;
		}
		else
		{
			//argInit == false
			//$('#dlStepName').empty().selectmenu('refresh');;
			if (rtn.ErrorClass.IsErr != "false") {
				//$('dlStepName')[0].disabled = true;
				//$('dlStepName')[0].options.add(new Option('', '')); //第一筆空白
				return false;
			}

			$('#txSumType').val(rtn.SumType);
			UiDisplaySumType();

			gObj.gtxLtIncHd = rtn.LtIncHd;
			gObj.gtxLtBy = rtn.LtBy;
			gObj.gtxLeadTimeDB = rtn.LeadTimeDB;

			//紀錄業務類別之限辦日期計算邏輯是否需順延至工作日
			gObj.gtxDueRule = rtn.DueRule;

			//處理期限
			//是空白或0就帶出 LeadTimeDB 的值
			if ($('#txLeadTime').val() == '' || $('#txLeadTime').val() == "0" || !gObj.gFirstLoadPage)
				$('#txLeadTime').val(rtn.LeadTimeDB);

			//起算日期系統計算
			if (rtn.StartRule != "3" && (!$('#cbNewByOu')[0].checked || $('#txStartDate').val() !="" ))
				$('#txStartDate').val(rtn.StartDateCalcBySys); //起算日期(系統計算的方式下才會有值)

			if (rtn.LtBy == "I")//使用者輸入
			{
				//擴充O屬性完全開放主旨欄位
				if (gModifyMode == "A" || gModifyMode == "O")
				{
					UiSetObjMotifyMode('#dlLtUom', 'W', '');
				}
				//1060920 David 1060664 修正欄位可否異動邏輯
				$('#txMeetDate').val("");
				UiSetObjMotifyMode('#txMeetDate', 'R', '');
				UiSetObjMotifyMode('#txDueDate,#txLeadTime', 'W', '');
				//1140619 David 1140885 可人工輸入限辦日期時，如為來文公文，不允許異動限辦日期相關欄位
				if(!$("#cbNewByOu")[0].checked)
					UiSetObjMotifyMode('#dlLtUom,#txLeadTime,#txDueDate', 'R', '');
			}
			else if (rtn.LtBy == "M")//enable 開會日期
			{
				//擴充O屬性完全開放主旨欄位
				if (gModifyMode == "A" || gModifyMode == "O")
				{
					UiSetObjMotifyMode('#txLeadTime,#dlLtUom,#txMeetDate', 'W', '');
				}
				UiSetObjMotifyMode('#txDueDate', 'R', '');
			}
			else
			{
				//由系統計算
				UiSetObjMotifyMode('#dlLtUom,#txLeadTime,#txMeetDate,#txDueDate', 'R', '');
			}

			//計算單位 ("天","月")
			UiSetDlItemByText("dlLtUom" , rtn.LtUom);

			if (rtn.StartRule == "3" && !gObj.gIsFirstDoc)//人工輸入
			{
				//0990303 Stella 擴充O屬性完全開放主旨欄位
				if (gModifyMode == "A" || gModifyMode == "O")
				{
					UiSetObjMotifyMode('#txStartDate', 'W', '');
				}
			}
			else //系統計算
			{
				UiSetObjMotifyMode('#txStartDate', 'R', '');
			}

			//限辦日期
			if (!$('#cbNewByOu')[0].checked || $('#txStartDate').val() != '') //非創稿下才帶值出來
				WsGetWorkDate();

			//取得辦理階段
			//WsGetStepName();
			return true;
		}
	})
	.fail(function (rtn) {
		alert(rtn.ErrorClass.ErrMessage.anyType);
		return false;
	});
}

//新增分類號案次號檢核完成後，母子文分類案次併件檢核
function fnCheckCbComClsCase(event) {
	event = event || window.event;
	if (event && event.target.id == "txComNo")
		return;

	if ($('#txComNo').val() == "" || $('#txComNo').val() == $('#txDocNo').val()) {
		return;
	}

	//1141009 David 1141012 外貿公文端不需分類案次號
	if(SSO_CONFIG.OrgNickName == "TAITRA")
		return;
	
	var paramsws_GetComClsCase = {
		"argSessionID": localStorage.Artifact
		, "argSourceOrgNo": gObj.uOrgNo
		, "argComNo": $('#txComNo').val()
	};

	//1060808 David 1060698 新增錯誤處理
	try
	{
		//1060808 David 1060698 修正BUG
		//window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "ws_GetComClsCase", null, paramsws_GetComClsCase, false, function (r, xml) {//
		window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "ws_GetComClsCase", null, paramsws_GetComClsCase, false, function (rtn, xml) {//
			console.log(rtn, xml);

			if ((gObj.gFileCaseDisplay == "Y" || gObj.gFileCaseDisplay == "S") && event && event.target.id == "txFileCaseNo" && document.all.cbCom.checked) { //由案次號觸發
				if ($('#txFileCaseNo').val() != rtn.CaseNo || $('#txClsNo').val() != rtn.ClsNo) {
					var Rtnbool = window.confirm("併件時公文「分類號」、「案次號」必須與母文相同，確定併件？");
					if (Rtnbool) {
						if ($('#txClsNo').val() != rtn.ClsNo) {
							$('#txClsNo').val(rtn.ClsNo);
							$('#txFileCaseNo').val(rtn.CaseNo);
							ObjOnBlur(null, 'txClsNo');
						}
						else {
							$('#txFileCaseNo').val(rtn.CaseNo);
							ObjOnBlur(null, 'txFileCaseNo');
						}
					}
					else {
						$('#cbCom').prop("checked", false).checkboxradio("refresh");
					}
				}
			}
			else if (event && event.target.id == 'txClsNo' && document.all.cbCom.checked) { //由分類號觸發
				if ($('#txClsNo').val() != rtn.ClsNo) {
					var Rtnbool = window.confirm("併件時公文「分類號」必須與母文相同，確定併件？");
					if (Rtnbool) {
						$('#txClsNo').val(rtn.ClsNo);
						ObjOnBlur(null, 'txClsNo');
					}
					else {
						$('#cbCom').prop("checked", false).checkboxradio("refresh");
					}
				}
			}
			else if (event && event.target.id == "cbCom" && $('#cbCom')[0].checked) { //由併件觸發
				if ($('#txFileCaseNo').val() != rtn.CaseNo || $('#txClsNo').val() != rtn.ClsNo) {
					var MsgStamp = "";
					if (gObj.gFileCaseDisplay == "Y" || gObj.gFileCaseDisplay == "S") {
						MsgStamp = "、「案次號」";
					}

					if (window.confirm("併件時公文「分類號」" + MsgStamp + "必須與母文相同，確定併件？")) {
						if ($('#txClsNo').val() != rtn.ClsNo) {
							$('#txClsNo').val(rtn.ClsNo);
							$('#txFileCaseNo').val(rtn.CaseNo);
							ObjOnBlur(null, 'txClsNo');
						}
						else {
							$('#txFileCaseNo').val(rtn.CaseNo);
							ObjOnBlur(null, "txFileCaseNo");
						}
					}
					else {
						$('#cbCom').prop("checked", false).checkboxradio("refresh");
					}
				}
			}
		});
	}
	catch(ex)
	{
		alert("母子文分類案次併件檢核發生錯誤" + ex.message);
	}
}

//跳出警示訊息，並可讓使用者取消操作
function fnChangeDueDateConfirm(argObj)
{
	if (gObj.gOdDocPty5Mode != "1")
		return true;

	var rtnBool = true;

	//只有人民申請案件要處理
	var DocProperty = $('#dlProperty option:selected').val();

	switch (argObj.id) {
		case "dlWorkType": //業務類別
			if ($('#txComNo').val() == '')
				return true;
			if ((gObj.gdlProperty == "5" || DocProperty == "5") && gObj.gdlWorkTypeIdx != $('#dlWorkType')[0].selectedIndex)
			{
				rtnBool = window.confirm("異動本筆公文資訊時，系統將自動重新調整相關母子文之辦理期限。")
				if (rtnBool) {
					gObj.gdlWorkTypeIdx = $('#dlWorkType')[0].selectedIndex;
				}
				else { //不同意時要恢復原值
					$('#dlWorkType')[0].selectedIndex = gObj.gdlWorkTypeIdx;
				}
			}
			break;

		case "dlProperty": //公文性質
			if ($('#txComNo').val() == '')
				return true;
			if ((gObj.gdlProperty == "5" || DocProperty == "5") && gObj.gdlProperty != DocProperty) {

				rtnBool = window.confirm("異動本筆公文資訊時，系統將自動重新調整相關母子文之辦理期限。")
				if (rtnBool) {
					gObj.gdlProperty = $('#dlProperty option:selected').val();
				}
				else
				{
					//不同意時要恢復原值
					UiSetDlItemByValue("dlProperty", gObj.gdlProperty);
					//1080927 David 1080339 jQuery升級3.4.1改寫語法
					//$('#dlProperty').focus();
					$('#dlProperty').trigger("focus");
				}
			}
			break;

		case "txComNo": //併案文號
			if ($('#txComNo').val() == '')
				return true;

			//取得母文的公文性質
			var ComNoPty = ""

			var paramsGetDocInfo = {
				"argSessionID": localStorage.Artifact
				//1060808 David 1060698 調整來源應為母文文號
				//, "argDocNo": $('#txDocNo').val()
				, "argDocNo": $('#txComNo').val()
				, "argSourceOrgNo": gObj.uOrgNo
			};

			// setup Deferred object
			var _dfd = $.Deferred();
			g_QueryDeferred = _dfd;

			//1060808 David 1060698 新增錯誤處理
			try
			{
				WsGetDocInfo(paramsGetDocInfo, _dfd)
				//1081121 David 1080339 .then()改為.pipe()
				//.then(function (rtn)
				.pipe(function (rtn)
				{
					ComNoPty = rtn.DocProperty;//取得母文的公文性質

					//1060808 David 1060698 取得母文資訊成功才進行
					if ((DocProperty == "5" || ComNoPty == "5") && gObj.gtxComNo != $('#txComNo').val())
					{
						rtnBool = confirm("異動本筆公文資訊時，系統將自動重新調整相關母子文之辦理期限。")
						if (rtnBool)
						{
							gObj.gtxComNo = $('#txComNo').val();
						}
						else//不同意時要恢復原值
						{
							$('#txComNo').val(gObj.gtxComNo);
							//1080927 David 1080339 jQuery升級3.4.1改寫語法
							//$('#txComNo')[0].focus();
							//1090612 David 1090407 調整寫法
							//$('#txComNo')[0].trigger("focus");
							$('#txComNo').trigger("focus");
						}
					}
				})
				.fail(function (errMsg) {//1060808 David 1060698 新增錯誤處理
					alert(errMsg);
					rtnBool = false;
				});
			}
			catch(ex)
			{
				alert("取得母文公文性質發生錯誤" + ex.message);
				rtnBool = false;
			}

			//1060808 David 1060698 取得母文資訊成功才進行
			/*if ((DocProperty == "5" || ComNoPty == "5") && gObj.gtxComNo != $('#txComNo').val())
			{
				rtnBool = confirm("異動本筆公文資訊時，系統將自動重新調整相關母子文之辦理期限。")
				if (rtnBool)
				{
					gObj.gtxComNo = $('#txComNo').val();
				}
				else//不同意時要恢復原值
				{
					$('#txComNo').val(gObj.gtxComNo);
					$('#txComNo')[0].focus();
				}
			}*/
			break;
	}
	return rtnBool;
}

function txFileCaseNoOnBlur()
{
	var strFileCase = jf_Trim($('#txFileCaseNo').val());
	if (strFileCase == '')
	{
		//清空案次號對應的案名
		$('#txFileCaseName').val('');
		// 清空時設為預設值
		gObj.gbComClsCaseTheSame = false;
		//新增觸發母子文分類案次併件檢核
		fnCheckCbComClsCase();
		return;
	}

	if ($('#txClsNo').val() == '') //分類號無值時，清空案次號欄位
	{
		//1071214 David 1071179 案次號清空時，一併清空保存年限
		//$('#txClsName, #txFileCaseNo, #txFileCaseName').val('');
		$('#txClsName, #txFileCaseNo, #txFileCaseName, #txKeepYear').val('');

		//清空時設為預設值
		gObj.gbComClsCaseTheSame = false;
		//新增觸發母子文分類案次併件檢核
		fnCheckCbComClsCase();
		return;
	}

	var param = new Array(4);
	param[0] = gObj.uOrgNo;
	param[1] = $('#txClsNo').val();
	param[2] = strFileCase;

	//若公文製作有帶回年度號，則使用輸入之年度號。
	if ($('#txFileYear').val() != '')
		param[3] = $('#txFileYear').val();
	else {
		if (param[3] == '') {
			var dttoday = new Date();
			var newYear = dttoday.getFullYear() - 1911;
			newYear = newYear + '';
			newYear = jf_PADL(newYear, 3, '0');
			param[3] = newYear;
		}
		$('#txFileYear').val(param[3]);
	}

	var paramsCheckFileCaseNo = {
		"argSessionID": localStorage.Artifact
		, "argSourceOrgNo": gObj.uOrgNo
		, "argClsNo": $('#txClsNo').val()
		, "argCaseNo": $('#txFileCaseNo').val()
		, "argYearNo": $('#txFileYear').val()
	};

	//1090914 David 1090557 新增信保案次號檢核邏輯
	var strCheckFileCaseNoWSName = "CheckFileCaseNo";
	if(SSO_CONFIG.OrgNickName == "SMEG")
	{
		strCheckFileCaseNoWSName = "CheckSmegFileCaseNo";
		paramsCheckFileCaseNo = {
			"argSessionID": localStorage.Artifact
			, "argSourceOrgNo": gObj.uOrgNo
			, "argClsNo": $('#txClsNo').val()
			, "argCaseNo": $('#txFileCaseNo').val()
			, "argCaseName": $('#txFileCaseName').val()
			, "argYearNo": $('#txFileYear').val()
		};
	}

	//1090914 David 1090557 支援信保案次號檢核邏輯，調整呼叫WS方法
	//window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "CheckFileCaseNo", null, paramsCheckFileCaseNo, false, function (rtn, xml) { //iCallID_CheckFileCaseNo
	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), strCheckFileCaseNoWSName, null, paramsCheckFileCaseNo, false, function (rtn, xml) { //iCallID_CheckFileCaseNo
		console.log(rtn, xml);

		var bwsRst = true;
		//取不到案次號時，若使用年度不為今年，則再以今年年度找一次。(避免跨年度問題)
		//找不到且未使用輸入之年度號，才使用今年年度。
		if (rtn.ErrorClass.IsErr != 'false' && $('#txFileYear').val() == '') {
			var dttoday = new Date();
			var newYear = dttoday.getFullYear() - 1911;
			newYear = newYear + '';
			newYear = jf_PADL(newYear, 3, "0");

			if (param[3] != newYear) {
				param[3] = newYear;

				paramsCheckFileCaseNo.argYearNo = newYear;

				window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "CheckFileCaseNo", null, params, false, function (rtn2, xml) {//
					console.log(rtn2, xml);

					//1060824 David 1060713 修正邏輯，交給後續統一處理
					/*if (rtn2.ErrorClass.IsErr == 'false') {

						if (rtn2.CaseName != '')
							$('#txFileCaseName').val(rtn2.CaseName);

						$('#txFileCaseNo').val($('#txFileCaseNo').val().toUpperCase());
						bwsRst = true;
					}
					else {
						$('#txFileCaseNo').focus();
						bwsRst = false;
					}*/
					rtn = rtn2;
				});
			}
		}

		if (rtn.ErrorClass.IsErr == 'false')
		{
			if (rtn.CaseName != '')
				$('#txFileCaseName').val(rtn.CaseName);

			$('#txFileCaseNo').val($('#txFileCaseNo').val().toUpperCase());
			bwsRst = true;
		}
		else
		{
			//1060824 David 1060713 顯示錯誤訊息
			if(rtn.ErrorClass.ErrMessage.anyType.text)
				alert(rtn.ErrorClass.ErrMessage.anyType.text);
			else
				alert(rtn.ErrorClass.ErrMessage.anyType);

			//1080927 David 1080339 jQuery升級3.4.1改寫語法
			//$('#txFileCaseNo').val("").focus();
			$('#txFileCaseNo').val("").trigger("focus");
			bwsRst = false;
		}
		if (bwsRst)
		{
			var strFileCase = jf_Trim($('#txFileCaseNo').val());

			//環境變數OD_CHECK_FILE_CASE(顯示案次號欄位)改為機關通用，原中企處特殊行為改以機關代碼區隔。
			//若為第一次叫用ObjOnBlur("txFileCaseNo")，則先不做分類號與密等檢核。
			if (strFileCase.length < 2 || SSO_CONFIG.OrgNickName != 'SMEA' || gObj.gFirstLoadPage)
				return;

			if (strFileCase.substr(0, 1).toUpperCase() == "B")
			{
				if ($("#dlSec option:selected").val() == "1")//密等為密以上時不處理
				{
					if (document.all.dlSec.disabled) { //修正當密等不可修改時，不可輸入不符合密等的案次號
						alert("此處密等不允許修改，請輸入非密件案次號。");
						//1080927 David 1080339 jQuery升級3.4.1改寫語法
						//$('#txFileCaseNo').focus();
						$('#txFileCaseNo').trigger("focus");
					}
					else
					{
						UiSetDlItemByValue("dlSec", "2");
					}
				}
			}
			else if (strFileCase.substr(0, 1).toUpperCase() == "A") {
				//修正當密等不可修改時，不可輸入不符合密等的案次號
				if ($("#dlSec option:selected").val() != "1")
				{
					if (document.all.dlSec.disabled)
					{
						alert("此處密等不允許修改，請輸入密件案次號。");
						//1080927 David 1080339 jQuery升級3.4.1改寫語法
						//$("#txFileCaseNo").focus();
						$("#txFileCaseNo").trigger("focus");
					}
					else
					{
						UiSetDlItemByValue("dlSec", "1");
					}
				}
			}
		}
	});
}

//argMode：1:初始化呼叫。2:分類號OnBlur呼叫。3:密等連動呼叫
//argClsAppLmt：分類號或密等預設的應用限制
function SetdlApplyLimit(argMode, argClsAppLmt)
{
	if ((argMode == "1" && $('#dlApplyLimit')[0].selectedIndex == -1) || argMode == "2")
	{
		//1060920 David 1060658 修正分類號連動應用限制處理未考慮密等公文問題
		if($('#dlSec option:selected').val() != "1")
		{
			UiSetDlItemByValue("dlApplyLimit", gObj.gDefApplyBySec.substring(1,2));
		}
		else
		{
			var nDefaultApplyLimit = theSSO.User.EnvSettings.get("OD_DEFAULT_APPLY_LIMIT");
			if (nDefaultApplyLimit == "N" || nDefaultApplyLimit == "Y" || nDefaultApplyLimit == "R")
			{
				UiSetDlItemByValue("dlApplyLimit", nDefaultApplyLimit);
			}
			else if (nDefaultApplyLimit == "C" && argClsAppLmt != "")
			{
				if (argClsAppLmt == "N" || argClsAppLmt == "Y" || argClsAppLmt == "R")
				{
					UiSetDlItemByValue("dlApplyLimit", argClsAppLmt);
				}
			}
		}
	}
	else if (argMode == "3")
	{
		UiSetDlItemByValue("dlApplyLimit", argClsAppLmt);
	}
}

function dlSpdOnChange()
{
	//因應速別改變，調整辦理期限 
	WsGetWorkDate();

	//1130112 David 1121043 新增公文背景顏色處理邏輯
	fnChangeDocBackColor($('#dlSpd option:selected').val(), $("#dlSec option:selected").val());
}

function fnODC010Save()
{
	if(gObj.gPage == "ODC011")
	{
		//目前在擬辦設定,先呼叫該頁之儲存
		if(!fnODC011Save())
			return false;
	}

	if(gObj.gPage == "ODC013")
	{
		//目前在會簽待送出設定,先呼叫該頁之儲存
		if(!fnODC013Save())
			return false;
	}
	if(gObj.gPage == "ODC012")
	{
		//目前在會簽中,先呼叫該頁之儲存
		if(!fnODC012Save())
			return false;
	}

	//附件頁面檢核
	//1131211 David 1130983 未啟用實體附件歸檔註記設定模式時，才處理附件資訊
	if(!gObj.gEnableAttArchiveNote)
	{
		var RtnVal = fnBeforeSaveAttach();
		if (RtnVal == "")
			fnSaveAttach();
		else
		{
			alert(RtnVal);
			return false;
		}
	}

	//不為第一次載入則需確認儲存
	if(!gObj.gFirstLoadPage && !ChkBeforeSave())
		return false;
	
	//新版用不到
	//fnSetEmpBeforeDisp();
	
	//如修改年度號、分類號、保存年限或案次號時，更新稿件內資訊
	if(!SaveDraftMgmtInfo())
		return false;

	console.log('fnODC010Save()');

	if(!SaveWMSG())
		return false;

	if(!SaveWDCM())
		return false;
	
	gObj.gFileYear = $('#txFileYear').val();
	gObj.gClsNo = $('#txClsNo').val();
	//1090720 David 支援OD_CHECK_FILE_CASE=S設定功能
	//if (gObj.gFileCaseDisplay == "Y")
	if (gObj.gFileCaseDisplay == "Y" || gObj.gFileCaseDisplay == "S")
	{
		//1060824 David 1060713 修正案次號欄位ID錯誤問題
		//gObj.gFileCase = $('#txFileCase').val();
		gObj.gFileCase = $('#txFileCaseNo').val();
	}
	gObj.gKeepYear = $('#txKeepYear').val();
	gObj.gSpdNo = $('#dlSpd option:selected').val();

	//1061222 David 1061170 新增紀錄初始基資資訊function
	SetSourceODWObj()

	return true;
}

function fnSaveAttach()
{
	var strAttach="";
	//1140319 David 1131053 支援DOC_ATTACH紀錄超過10筆，調整筆數判斷
	let tbAttach = $(".AreaDocAttach");
	let rowAttCount = tbAttach.find("tr").length-1; //取得目前行數(扣除標題列）
	
	//1140319 David 1131053 調整筆數判斷
	//for(var i = 1 ; i <= 10 ; i++)
	for(var i = 1 ; i <= rowAttCount ; i++)
	{
		var val = fnGetOneAttach(
			"txAttaName"+i,
			"ddlRem"+i,
			"txCnt"+i,
			"ddlUnit"+i);
		if(val=="")
			continue;
		if(strAttach!="")
			strAttach+="@";
		strAttach+=val;
	}
	$('#txAttach').val(strAttach);
}

function fnGetOneAttach(argAttaName,argDDLRem,argFileCnt,argDDLUnit)
{
	if(jf_Trim($('#' + argAttaName).val())=="")
		return "";
	var ret = "";
	ret += $("#" + argAttaName).val() + "*";
	ret += $("#" + argDDLRem + " option:selected").val() + "*";
	ret += $("#" + argFileCnt).val() + "*";
	ret += $("#" + argDDLUnit + " option:selected").val() + "*";
	return ret;
}

function ChkBeforeSave()
{
	if (!gObj.gIsFirstDoc && $('#dlProperty option:selected').val() == "2" && $('#txDueDate').val() == "")
	{
		alert("當公文性質為" + $('#dlProperty option:selected').text() + "時，辦理期限不可空白");
		if (!$('#txDueDate')[0].disabled)
		{
			//1080927 David 1080339 jQuery升級3.4.1改寫語法
			//$('#txDueDate')[0].focus();
			//1090612 David 1090407 調整寫法
			//$('#txDueDate')[0].trigger("focus");
			$('#txDueDate').trigger("focus");
		}
		return false;
	}

	if (!$('#dlComType')[0].disabled && $('#dlComType')[0].selectedIndex != -1)
	{
		if ($('#dlComType')[0].options[$('#dlComType')[0].selectedIndex].value != "")
		{
			if ($('#txComNo').val() == "")
			{
				alert("當併案情形不為空白時，併案文號不可空白");
				//1080927 David 1080339 jQuery升級3.4.1改寫語法
				//$('#txComNo').focus();
				$('#txComNo').trigger("focus");
				return false;
			}
		}
	}

	if ($('#txComNo').val() != "" && !$('#dlComType')[0].disabled)
	{
		if ($('#dlComType')[0].selectedIndex == -1 || $('#dlComType')[0].options[$('#dlComType')[0].selectedIndex].value == "")
		{
			alert("當併案文號不為空白時，併案情形不可空白");
			if (!$('#dlComType')[0].disabled)
			{
				//1080927 David 1080339 jQuery升級3.4.1改寫語法
				//$('#dlComType')[0].focus();
				//1090612 David 1090407 調整寫法
				//$('#dlComType')[0].trigger("focus");
				$('#dlComType').trigger("focus");
			}
			return false;
		}
	}

	if ($('#dlWorkType')[0].selectedIndex == -1 || $('#dlWorkType option:selected').val() == "")
	{
		alert("業務類別不可空白");
		if (!$('#dlWorkType')[0].disabled)
		{
			//1080927 David 1080339 jQuery升級3.4.1改寫語法
			//$('#dlWorkType')[0].focus();
			//1090612 David 1090407 調整寫法
			//$('#dlWorkType')[0].trigger("focus");
			$('#dlWorkType').trigger("focus");
		}
		return false;
	}

	//1060920 David 1060664 調整判斷邏輯
	//if ($('#txLeadTime')[0].readOnly == true)
	if ($('#txDueDate')[0].readOnly == true)
	{
		if ($('#txLeadTime').val() == "" || $('#txLeadTime').val() == "0")
		{
			alert("辦理期限不可以為 空白 或 0");
			if (!$('#txLeadTime')[0].readOnly && !$('#txLeadTime')[0].disabled)
			{
				//1080927 David 1080339 jQuery升級3.4.1改寫語法
				//$('#txLeadTime').focus();
				$('#txLeadTime').trigger("focus");
			}
			return false;
		}
	}
	else//使用者自行輸入限辦日期功能
	{
		//有兩種CASE, 一種有START_DATE(ODT130分辦進來的), 一種沒有START_DATE(創稿進來的)
		if ($('#txStartDate').val() != "")
		{
			//具有start_date
			if (($('#txLeadTime').val() == "" || $('#txLeadTime').val() == "0") && ($('#txDueDate').val() == ""))
			{
				alert("辦理期限及辦理期限不能同時為空白");
				return false;
			}

			//有due_date, 則計算lead_time
			if ($('#txDueDate').val() != "")
			{
				//先判斷格式是否正確合理
				if (!jf_CheckCDATE($('#txDueDate').val()))
				{
					alert("限辦日期格式錯誤");
					return false;
				}
				else
				{
					if ($('#txDueDate').val() < $('#txStartDate').val())
					{
						alert("限辦日期必須大於起算日期");
						return false;
					}
				}

				//通過檢核之後開始計算辦理日期
				var paramsGetWorkDays = {
					"argSessionID": localStorage.Artifact
				, "argSDATE": $('#txStartDate').val()
				, "argDueDate": $('#txDueDate').val()
				, "argLtIncHd": ''
				};

				if (gObj.gtxLtIncHd == "Y")
					paramsGetWorkDays.argLtIncHd = "1"; //含假日
				else if (gObj.gtxLtIncHd == "H")
					paramsGetWorkDays.argLtIncHd = "3"; //扣抵聯休
				else
					paramsGetWorkDays.argLtIncHd = "2"; //不含假日

				var _dfd = $.Deferred();
				g_QueryDeferred = _dfd;
				
				var bGetWorkDays = false;

				WsGetWorkDays(paramsGetWorkDays, _dfd)
				//1081121 David 1080339 .then()改為.pipe()
				//.then(function (wsRtnobj) {
				.pipe(function (wsRtnobj) {
					
					//依限辦日期計算辦理天數時，須扣除補充天數(展期+補件+外陳外會天數)
					var strFullLeadTime = wsRtnobj.RtnStr;

					//取得補充天數
					var iFullAddTime = fnGetFullAddTime("");

					//依限辦日期計算辦理天數時，須扣除補充天數(展期+補件+外陳外會天數)
					var iFullLeadTime = parseInt(strFullLeadTime) - iFullAddTime;
					$('#txLeadTime').val(iFullLeadTime);
					UiSetDlItemByText("dlLtUom", "天");//設定單位為天
					bGetWorkDays = true;
				})
				.fail(function (errMsg) {
					alert(errMsg);
					bGetWorkDays = false;
				});

				if(!bGetWorkDays)
					return false;
			} //due_date為空白則不需處理, 照原本處理模式即可
		}
		else
		{
			//沒有start_date
			//僅卡限辦日期格式問題
			if (($('#txLeadTime').val() == "" || $('#txLeadTime').val() == "0") && ($('#txDueDate').val() == ""))
			{
				alert("處理期限及限辦日期不能同時為空白");
				return false;
			}

			//先判斷格式是否正確合理
			if ($('#txDueDate').val().length != 7)
			{
				alert("限辦日期格式錯誤");
				return false;
			}
			else
			{
				var dttoday = new Date();
				var newYear = dttoday.getFullYear() - 1911;
				newYear = newYear + "";
				newYear = jf_PADL(newYear, 3, "0");
				var newMonth = dttoday.getMonth() + 1;
				newMonth = newMonth + "";
				newMonth = jf_PADL(newMonth, 2, "0");
				var newDay = dttoday.getDate() + "";
				newDay = newDay + "";
				newDay = jf_PADL(newDay, 2, "0");
				var newDate = newYear + newMonth + newDay;

				if ($('#txDueDate').val() != "")
				{
					if ($('#txDueDate').val() < newDate)
					{
						alert("限辦日期不可小於今天日期");
						return false;
					}
				}
			}
		}
	}

	if (gObj.gtxLtBy == "M") //起算日期由開會日期決定
	{
		if ($('#txMeetDate').val() == "")
		{
			alert('開會日期不可空白')
			//1080927 David 1080339 jQuery升級3.4.1改寫語法
			//$('#txMeetDate').focus();
			$('#txMeetDate').trigger("focus");
			return false;
		}

		//1111219 David 1111366 調整檢核邏輯
		/*if ($('#txMeetDate').val() < $('#txStartDate').val())
		{
			alert('起算日期不可大於開會日期')
			//1080927 David 1080339 jQuery升級3.4.1改寫語法
			//$('#txStartDate').focus();
			$('#txStartDate').trigger("focus");
			return false;
		}*/
		if ($('#txStartDate').val() > $('#txDueDate').val())
        {
            alert("限辦日期不可小於起算日期");
            $('#txMeetDate').trigger("focus");
            return false;
        }
	}

	//1060111 David 檢核紙本併同歸檔數量，新增判斷SPECIAL_CHECK有G時再檢核(同流程傳送)
	//if($("#txIsRcvFile").val() == "1")
	if($("#txIsRcvFile").val() == "1" && theAOL.nextTarget.ruleOption.specialCheck.indexOf('G') != -1)
	{
		if($("#txRcvFileCnt").val() == "" || $("#txRcvFileCnt").val() == "0")
		{
			alert("紙本併同歸檔數量不可為空或0");
			return false;
		}
	}

	if(gObj.gIsCheckSecField == "Y" && $("#dlSec option:selected").val() != "1" && $("#comboDSecCond").val() == "")
	{
		alert("密等為密以上時，解密條件不可為空");
		return false;
	}

	//新增檢核案件編號是否存在
	if (!fnChkCaseNo())
		return false;

	//1051214 David 1050780 新增會議型式儲存前檢核
	//1051228 David 1051345 調整鐵工局會議型式檢核邏輯，改於WebEditSave內處理
	/*if(SSO_CONFIG.OrgNickName == "RRB")
	{
		if($('#dlDocCategory option:selected').val() == "4" && $('#dlMeetingType option:selected').val() == "0")
		{
			alert("開會通知單需選取會議型式");
			return false;
		}
	}*/

	//1060802 David 1060668 檢核DB內紀錄的DUE_DATE與目前基資檔內的DUE_DATE資料是否一致，不一致時顯示詢問訊息
	var bCheckDueDate = true;
	if(!gObj.gIsFirstDoc && $('#txDocNo').val() != "")
	{
		var NowDueDate = $("#txDueDate").val();
		//取得目前DB紀錄的業務類別，速別、限辦日期、處理期限、開會日期、起算日期
		var paramsGetDocInfo = {
			"argSessionID": localStorage.Artifact
			, "argDocNo": $('#txDocNo').val()
			, "argSourceOrgNo": gObj.uOrgNo
		};

		var _dfd = $.Deferred();
		g_QueryDeferred = _dfd;
		WsGetDocInfo(paramsGetDocInfo, _dfd)
		//1081121 David 1080339 .then()改為.pipe()
		//.then(function (rtn)
		.pipe(function (rtn)
		{
			if($("#txWorkTypeNo").val() == rtn.BusinessType && $('#dlSpd option:selected').val() == rtn.SpdNo && $("#txStartDate").val()  == rtn.StartDate
				&& $("#txLeadTime").val() == rtn.LeadTime && $("#dlLtUom option:selected").text() == rtn.LtUom && $("#txMeetDate").val() == rtn.MeetDate
				&& NowDueDate != rtn.DueDate)
			{
				var strConfirmDueDate = "在業務類別及時效相關設定未異動情形下\n";
				strConfirmDueDate += "目前限辦日期：" + NowDueDate + "，與資料庫紀錄的限辦日期：" + rtn.DueDate + "不相符\n";
				strConfirmDueDate += "請問是否繼續？\n\n";
				strConfirmDueDate += "如不繼續請將公文關閉但不儲存，並重新開啟公文進行後續作業";
				if (confirm(strConfirmDueDate))
					bCheckDueDate = true;
				else
					bCheckDueDate = false;
			}
		})
		.fail(function (ErrMsg)
		{
			alert("取得目前公文原始公文資料失敗：" + ErrMsg);
			bCheckDueDate = false;
		});
	}
	if(!bCheckDueDate)
		return false;

	//1060808 David 1060698 新增檢核併案合理性
	if($("#txComNo").val() != "" && $('#dlComType option:selected').val() == "")
	{
		alert("檢核併案關係異常，請重新設定併案關係");
		return false;
	}

	return true;
}

function fnBeforeSaveAttach()
{
	var Rtn ="";

	//1140319 David 1131053 支援DOC_ATTACH紀錄超過10筆，調整筆數判斷
	let tbAttach = $(".AreaDocAttach");
	let rowAttCount = tbAttach.find("tr").length-1; //取得目前行數(扣除標題列）

	//1140319 David 1131053 調整筆數判斷
	//for(var i=1 ; i <= 10 ; i++)
	for(var i=1 ; i <= rowAttCount ; i++)
	{
		if($("#txAttaName"+i).val() != "")
		{
			var ddlRemSelectValue = $("#ddlRem" + i + " option:selected").val();
			var ddlUnitSelectValue = $("#ddlUnit" + i + " option:selected").val();

			if(ddlRemSelectValue == "" || ddlUnitSelectValue == "" || $("#txCnt"+i).val() == "" || $("#txCnt"+i).val() == "0" )
			{
				if (Rtn == "")
					Rtn = i;
				else
					Rtn = Rtn +"、" + i;
			}
			
		}
	}
	if (Rtn != "")
		Rtn = "附件頁面序" + Rtn + "的媒體型式 / 數量 / 計量單位不可為空白。";
	return Rtn;
}

//新增此function用來Check案號是否存在
function fnChkCaseNo() {
	//檢查案件編號是否正確
	if ($('#txCaseNo').val() == "")
		return true;

	var paramsCheckDocCase = {
		"argSessionID": localStorage.Artifact
		, "argSourceOrgNo": gObj.uOrgNo
		, "argCaseNo": $('#txCaseNo').val()
	};

	var _dfd = $.Deferred();
	g_QueryDeferred = _dfd;

	//先檢核公文性質
	var val = $('#dlProperty option:selected').val();
	
	var bCheckResult = false;

	//1060217 David 修正檢核案件編號邏輯與一代不同BUG
	/*if (val != "1" && val != "2" && val != "3")
	{
		if(gObj.gBTypeUrl_WebService != "")
		{
			//1000909	[1000420]	Yvonne	因為子文業務類別為52，而FDA將該組業務類別對應的CASE_WEBSERVICE設定叫用INLIB檢核
			//導致綠標子文會跳出"查無相關案件編號"
			if (!(jf_Trim($('#txCaseNo').val()) == "G" + jf_Trim($('#txComNo').val())))
			{
				try
				{
					WsCheckDocCaseByBTypeUrl(paramsCheckDocCase, _dfd)
					.then(function () {
						bCheckResult = true;
					})
					.fail(function () {
						bCheckResult = confirm("輸入的案件編號尚未立案，請確定是否繼續動作。");
					});
				}
				catch(ex)
				{
					alert(ex.message);
					$('#txCaseNo').focus();
					bCheckResult = false;
				}
			}
			bCheckResult = true;
		}
		
		//1041013 David 配合FDA取消使用檢驗系統，調整案號判斷邏輯
		if(jf_Trim($('#txCaseNo').val()) != "" && (jf_Trim($('#txCaseNo').val()) == "G"+jf_Trim($('#txComNo').val())))
			bCheckResult = true;

		//1051206 David 1051175 新增鐵工局已案管制編號檢核
		if(SSO_CONFIG.OrgNickName == "RRB")
		{
			WsCheckDocCase(paramsCheckDocCase, _dfd)
			.then(function () {
				bCheckResult = true;
			})
			.fail(function () {
				bCheckResult = confirm("系統查無相關案件編號，請確定是否繼續動作。");
			});
		}
	}
	else
	{
		WsCheckDocCase(paramsCheckDocCase, _dfd)
		.then(function () {
			bCheckResult = true;
		})
		.fail(function () {
			bCheckResult = confirm("系統查無相關案件編號，請確定是否繼續動作。");
		});
	}*/

	/*
	1. 案件編號 == G+母文文號：回傳true
	2. 公文性質不為1、2、3，且業務類別WebService有設定：依設定WebService檢核結果回傳
	3. 其他狀況：依照OD_LIB.asmx內CheckDocCase()檢核結果回傳
	*/
	if(jf_Trim($('#txCaseNo').val()) != "" && (jf_Trim($('#txCaseNo').val()) == "G"+jf_Trim($('#txComNo').val())))
		bCheckResult = true;
	else if(val != "1" && val != "2" && val != "3" && gObj.gBTypeUrl_WebService != "")
	{
		try
		{
			WsCheckDocCaseByBTypeUrl(paramsCheckDocCase, _dfd)
			//1081121 David 1080339 .then()改為.pipe()
			//.then(function () {
			.pipe(function () {
				bCheckResult = true;
			})
			.fail(function () {
				bCheckResult = confirm("輸入的案件編號尚未立案，請確定是否繼續動作。");
			});
		}
		catch(ex)
		{
			alert(ex.message);
			//1080927 David 1080339 jQuery升級3.4.1改寫語法
			//$('#txCaseNo').focus();
			$('#txCaseNo').trigger("focus");
			bCheckResult = false;
		}
	}
	else
	{
		WsCheckDocCase(paramsCheckDocCase, _dfd)
		//1081121 David 1080339 .then()改為.pipe()
		//.then(function () {
		.pipe(function () {
			bCheckResult = true;
		})
		.fail(function () {
			bCheckResult = confirm("系統查無相關案件編號，請確定是否繼續動作。");
		});
	}
	
	return bCheckResult;
}

//設定綠標按鈕事件
function fnSetGBClick()
{
	// 1120901 Leslie  1120709 弱掃修正Client DOM Stored XSS(綠標，已不再使用)
	// var strED_Site = theSSO.User.EnvSettings.get("WS_ED_SITE");
	// var pUrl ="";
	// var SAMLart = localStorage.Artifact;
	// if (strED_Site != "")
	// {
		// pUrl = AddUrlSlash(strED_Site) + "ED6/EDT610.aspx?argID=ODC010&argDocNo="+jf_Trim($("#txDocNo").val())+"&SAMLart="+SAMLart;
	// }
	// else
	// {
		// /*var steTempUrl = document.all.txWsLocation.value.toUpperCase();
		// steTempUrl = steTempUrl.replace("ODDEP","ED");
		// pUrl = AddUrlSlash(steTempUrl)+"ED6/EDT610.aspx?argID=ODC010&argDocNo="+jf_Trim(document.all.txDocNo.value)+"&SAMLart="+SAMLart;*/
	// }

	// //1080927 David 1080339 jQuery升級3.4.1改寫語法
	// //$("#btNewGBCase").attr("data-url", pUrl)
	// //.click(function(evt)
	// $("#btNewGBCase").attr("data-url", pUrl).on("click",function(evt)
	// {
		// var url = $("#btNewGBCase").attr("data-url");
		// if(typeof url !== "undefined" && url.length)
		// {
			// var $pane = $("div#ODC010_EDT610_DIV");
			// $.modal($pane, {
				// containerCss: {width: "95%", height: "95%"},
				// onShow: function() 
				// {
					// //$pane.width(w); $pane.height(h);
					// var $frame = $pane.find('iframe');
					// if ($frame.length)
					// {
						// $pane.css("width", "95%").css("height", "95%");
						// $frame.css("width", "95%").css("height", "95%");//iframe有預設border-width
						// $frame[0].src = pUrl;
					// }
					// $("div#ODC010_EDT610_DIV")[0].style="width:100%; height:100%; position:absolute; left:0px; top:0px; z-index:0"
					// $pane.find(".ui-slide-pane-active").removeClass("ui-slide-pane-active");
					// $pane.addClass("ui-slide-pane-active");
				// }
			// });
		// }
	// });
	// // 關閉查詢iframe時叫用
	// //1080927 David 1080339 jQuery升級3.4.1改寫語法
	// //$("div#ODC010_EDT610_DIV").find("#Dlg_close_btn").click(function(event, obj)
	// $("div#ODC010_EDT610_DIV").find("#Dlg_close_btn").on("click",function(event, obj)
	// {
		// var $pane = $("div#ODC010_EDT610_DIV");
		// //$pane.width(w); $pane.height(h);
		// var $frame = $pane.find('iframe');
		// $frame[0].src = "";
		// $("div#ODC010_EDT610_DIV")[0].style="display: none";
		// $("div#ODC010_EDT610_DIV").find(".ui-slide-pane-active").removeClass("ui-slide-pane-active");
		// $("div#ODC010_EDT610_DIV").find(".ui-slide-pane-left").addClass("ui-slide-pane-active");
		// $.modal.close();

		// if($('#txDocNo').val() != "")
		// {
			// var paramsGetSyncInfo = {
				// "session": localStorage.Artifact,
				// "argOrg": gObj.uOrgNo,
				// "argDocNo":$('#txDocNo').val()
			// };

			// var dfdGetSyncInfo = $.Deferred();
			// g_QueryDeferred = dfdGetSyncInfo;
			// WsGBGetSyncInfo(paramsGetSyncInfo, dfdGetSyncInfo)
			// .then(function (rtn)
			// {
				// var xGBDoc = (new DOMParser()).parseFromString(rtn, "text/xml");
				// if(xGBDoc !== undefined)
				// {
					// $("#txSubject").val($(xGBDoc).find('FROM_SUBJECT').eq(0).text());
					// $("#txFromWord").val($(xGBDoc).find('FROM_NO_WORD').eq(0).text());
					// $("#txFromNo").val($(xGBDoc).find('FROM_NO_NO').eq(0).text());
					// $("#txFromOrg").val($(xGBDoc).find('FROMORG_NAME').eq(0).text());
					

					// var sDocProperty = $(xGBDoc).find('DOC_PROPERTY').eq(0).text();
					// UiSetDlItemByValue("dlProperty", sDocProperty);

					// //先將案號清掉避免發生檢核案件編號不通過情況(因為此時公文性質、業務類別可能與原本不同，對應檢核用的WS不同
					// gObj.gCaseNoBeforeChange = "";
					// $("#txCaseNo").val("");
					// fndlPropertyOnChange();

					// $("#txWorkTypeNo").val($(xGBDoc).find('B_TYPE_NO').eq(0).text());
					// ObjOnBlur(null, "txWorkTypeNo");

					// $("#txStartDate").val($(xGBDoc).find('START_DATE').eq(0).text());
					// var GBLeadTime = $(xGBDoc).find('LEAD_TIME').eq(0).text();
					// if(GBLeadTime != "0")
						// $("#txLeadTime").val($(xGBDoc).find('LEAD_TIME').eq(0).text());
					// ObjOnBlur(null, "txLeadTime");

					// //案件編號、併案文號、限辦日期，並將欄位鎖起來
					// $("#txCaseNo").val($(xGBDoc).find('CASE_NO').eq(0).text());
					// gObj.gCaseNoBeforeChange = $("#txCaseNo").val();

					// $("#txComNo").val($(xGBDoc).find('COM_NO').eq(0).text());
					// ObjOnBlur(null, "txComNo");
					// if ($("#txComNo").val() != "")
						// UiSetDlItemByValue("dlComType","3");

					// var sDueDate = $(xGBDoc).find('DUE_DATE').eq(0).text();
					// if ($("#txDueDate").val() != sDueDate)
						// $("#txDueDate").val(sDueDate);
					// UiCaseRelatedCtrl();
					// //--end--

					// if ($("#txWorkTypeNo").val() != "11")//若為刪除立案的情況(sBtypeNo=11)時不進行這段處理
					// {
						// //設定單位
						// var sUnitNo = $(xGBDoc).find('SUBUNIT_CODE').eq(0).text()
						// if(sUnitNo =="")
							// sUnitNo = $(xGBDoc).find('OU_ID').eq(0).text();
					
						// var sUnitName = $(xGBDoc).find('SUBUNIT_NAME').eq(0).text();
						// if(sUnitName =="")
							// sUnitName = $(xGBDoc).find('OU_NAME').eq(0).text();

						// //設定人
						// var sUserName = $(xGBDoc).find('USERNAME').eq(0).text();
						// var sEmpName = $(xGBDoc).find('EMP_NAME').eq(0).text();

						// var nextTarget = {
						  // TxName : "分辦",
						  // OUId : sUnitNo,
						  // OUName : sUnitName,
						  // RoleId : "OD99",
						  // RoleName : "承辦人",
						  // UserId : sUserName,
						  // UserName : sEmpName
						// }

						// var GBObj_ODWMSG = theAOL.docObj.get('ODWMSG', alODWMSG);
						// var GBObj_ODWDCM = theAOL.docObj.get('ODWDCM', alODWDCM);

						// var SSOSetTargetObj = SSOUtil.updatePDocTransTargetFromDI(theAOL.docObj, nextTarget, GBObj_ODWMSG, GBObj_ODWDCM);
						// if(typeof SSOSetTargetObj != "undefined" && typeof SSOSetTargetObj.match_all != "undefined")
						// {
							// if(!SSOSetTargetObj.match_all)
							// {
								// switch(SSOSetTargetObj.match_level)
								// {
									// case -1:
										// alert("帶回資料時發生異常。\n錯誤原因：無「分辦」異動別可使用。");
										// break;
									// case 0:
										// alert("帶回資料時發生異常。\n錯誤原因：無對應承辦單位可設定。");
										// break;
									// case 1:
									// case 2:
										// alert("帶回資料時發生異常。\n錯誤原因：無對應承辦人員可設定。");
										// break;
								// }
							// }
						// }
					// }
					// //1000112	Yvonne	修正由EDT610帶回，在ODC010中直接關掉導致再開啟公文時畫面上出現的是前次業務類別代碼之問題
					// //(因為此時client端的xml未更新，而重新開啟公文時，叫用window.external.OpenMessage僅會重新載ODWDCM.xml，不會重載ODWMSG.xml所導致)
					// /*SaveWDCM();
					// SaveWMSG();
					// if(!GenEnvCmdFile(false))
						// return;//產生更新用異動檔失敗
					// parent.TemplateSave();*/
				// }
			// })
			// .fail(function () 
			// {
				// alert("叫用GetSyncInfo失敗。\n\n請關閉此公文後重新開啟，以免資料異常。");
			// });
		// }
	// });
}

//設定案件編號查詢事件
function fnSearchCase()
{
	//1111229 David 順手修正判斷錯誤問題
	//if(!$("#txCaseNo")[0].readOnly)
	if($("#txCaseNo")[0].readOnly)
		return;

	var val = $('#dlProperty option:selected').val();
	if(val=="1")
	{
	}
	else
	{
		var WebPage = theSSO.User.EnvSettings.get("OD_SEARCHCASE_GENERIC");

		if(val != "2" && val !="3")
		{
			var idx= $('#dlWorkType option:selected').val();;
			if(idx=="")
			{
				alert('您尚未選擇業務類別');
				return;
			}

			if(gObj.gBtypeUrl_SearchUrl != "")
				WebPage = gObj.gBtypeUrl_SearchUrl;
		}
		
		if(WebPage == "")
		{
			alert("尚未設定案件查詢作業路徑");
			return;
		}

		WebPage = WebPage+"?rtnObj=lbReturnValue&nFROM=ODC010&SAMLart="+localStorage.Artifact + "&argSpChildWinMode=1&argCase="+$('#txCaseNo').val()+"&argDocNo="+$('#txDocNo').val();

		var $pane = $("div#ODC010_ODI210_DIV");
		$.modal($pane, {
			containerCss: {width: "95%", height: "95%"},
			onShow: function() 
			{
				var $frame = $pane.find('iframe');
				if ($frame.length)
				{
					$pane.css("width", "95%").css("height", "95%");
					$frame.css("width", "95%").css("height", "95%");//iframe有預設border-width
					$frame[0].src = WebPage;
				}
				$("div#ODC010_ODI210_DIV")[0].style="width:100%; height:100%; position:absolute; left:0px; top:0px; z-index:0"
				$pane.find(".ui-slide-pane-active").removeClass("ui-slide-pane-active");
				$pane.addClass("ui-slide-pane-active");
			}
		});
		//1080927 David 1080339 jQuery升級3.4.1改寫語法
		//$("div#ODC010_ODI210_DIV").find("#Dlg_close_btn").click(function(event, obj)
		$("div#ODC010_ODI210_DIV").find("#Dlg_close_btn").on("click", function(event, obj)
		{
			var $pane = $("div#ODC010_ODI210_DIV");
			var $frame = $pane.find('iframe');
			$frame[0].src = "";
			$("div#ODC010_ODI210_DIV")[0].style="display: none";
			$("div#ODC010_ODI210_DIV").find(".ui-slide-pane-active").removeClass("ui-slide-pane-active");
			$("div#ODC010_ODI210_DIV").find(".ui-slide-pane-left").addClass("ui-slide-pane-active");
			$.modal.close();

			if($("#txRtnCaseNo").val() != "")
			{
				$("#txCaseNo").val($("#txRtnCaseNo").val());
				$("#txRtnCaseNo").val("");
				//1080927 David 1080339 jQuery升級3.4.1改寫語法
				//$("#txCaseNo").focus();
				$("#txCaseNo").trigger("focus");
			}
		});
	}
}

//取得特定業務類別之WebServiceInfo
function GetBTypeWebInfo()
{
	gObj.gBTypeUrl_WebService = "";
	gObj.gBTypeUrl_LinkUrl = "";
	gObj.gBtypeUrl_SearchUrl = "";

	if($("#dlWorkType option:selected").val() == "")
		return;

	var paramsGetBTypeInfo = {
		"argSessionID": localStorage.Artifact
		,"argSourceOrgNo": gObj.uOrgNo
		,"argBType": $('#dlWorkType option:selected').val()
	};

	var _dfd = $.Deferred();
	g_QueryDeferred = _dfd;
	WsGetBTypeWebInfo(paramsGetBTypeInfo, _dfd)
	.then(function (rtnStr)
	{			
		var pTmpAry = rtnStr.split(";");
		gObj.gBtypeUrl_SearchUrl = pTmpAry[0];
		gObj.gBTypeUrl_WebService = pTmpAry[1];
		gObj.gBTypeUrl_LinkUrl = pTmpAry[2];
	})
	.fail(function () {
	});
}

//設定分類號查詢事件
function fnSearchClsNo()
{
	if($("#txClsNo")[0].readOnly)
		return;

	var WebPage = theSSO.User.EnvSettings.get("WS_EA_SITE");

	if(WebPage == "")
	{
		alert("尚未設定分類號查詢作業路徑");
		return;
	}

	//1090102 David 1090001 取得年度號
	var strFileYear = "";
	if($('#txFileYear').val() != "")
		strFileYear = $('#txFileYear').val();
	else if($('#txDocNo').val() != "")
		strFileYear = $('#txDocNo').val().substr(0,3);

	if(strFileYear == "")
	{
		var dttoday = new Date();
		var newYear = dttoday.getFullYear() - 1911;
		newYear = newYear + "";
		newYear = jf_PADL(newYear, 3, "0");
		strFileYear = newYear;
	}

	var szInchargeOu = _rsltODWMSG['INCHARGE_OU'];
	if($('#txClsNo').val() != "")
		WebPage = WebPage+ "EA01/EAC005.aspx?DEPT_NO="+szInchargeOu+"&nFrom=ODC010&MODE=1&FILE_CLS="+$('#txClsNo').val() +"&SAMLart="+localStorage.Artifact;
	else	
		WebPage = WebPage+ "EA01/EAC005.aspx?DEPT_NO="+szInchargeOu+"&nFrom=ODC010&MODE=1&SAMLart="+localStorage.Artifact;
	
	//1090102 David 1090001 分類案次查詢，一律傳入年度號
	WebPage += "&FILE_YEAR=" + strFileYear;
			
	var $pane = $("div#ODC010_CLSNO_DIV");
	$.modal($pane, {
		containerCss: {width: "95%", height: "95%"},
		onShow: function() 
		{
			var $frame = $pane.find('iframe');
			if ($frame.length)
			{
				$pane.css("width", "95%").css("height", "95%");
				$frame.css("width", "95%").css("height", "95%");//iframe有預設border-width
				$frame[0].src = WebPage;
			}
			$("div#ODC010_CLSNO_DIV")[0].style="width:100%; height:100%; position:absolute; left:0px; top:0px; z-index:0"
			$pane.find(".ui-slide-pane-active").removeClass("ui-slide-pane-active");
			$pane.addClass("ui-slide-pane-active");
		}
	});
	//1080927 David 1080339 jQuery升級3.4.1改寫語法
	//$("div#ODC010_CLSNO_DIV").find("#Dlg_close_btn").click(function(event, obj)
	$("div#ODC010_CLSNO_DIV").find("#Dlg_close_btn").on("click", function(event, obj)
	{
		var $pane = $("div#ODC010_CLSNO_DIV");
		var $frame = $pane.find('iframe');
		$frame[0].src = "";
		$("div#ODC010_CLSNO_DIV")[0].style="display: none";
		$("div#ODC010_CLSNO_DIV").find(".ui-slide-pane-active").removeClass("ui-slide-pane-active");
		$("div#ODC010_CLSNO_DIV").find(".ui-slide-pane-left").addClass("ui-slide-pane-active");
		$.modal.close();
		if($("#txRtnClsNo").val() != "")
		{
			$("#txClsNo").val($("#txRtnClsNo").val());
			//1100408 David 1100192 需由分類號帶出保存年限，且有對應的保存年限時才帶入
			if (theSSO.User.EnvSettings.get("OD_ODC010_CLSNO_BLUR_KEEPYEAR") != 'Y' && $("#txRtnKeepYear").val() != "")
				$("#txKeepYear").val($("#txRtnKeepYear").val());

			$("#txRtnClsNo, #txRtnKeepYear").val("");

			ObjOnBlur(null ,'txClsNo');
		}
	});
}

//設定案次號號查詢事件
function fnSearchFileCaseNo()
{
	//1071105 David 1071076 新增環境變數MS_KEY_CASECLS邏輯處理
	//if($("#txFileCaseNo")[0].readOnly)
	if(gObj.gMsKeyCaseCls != "N" && $("#txFileCaseNo")[0].readOnly)
		return;

	var WebPage = theSSO.User.EnvSettings.get("WS_EA_SITE");
		
	if(WebPage == "")
	{
		alert("尚未設定案次號查詢作業路徑");
		return;
	}
	
	var strFileYear = "";
	if($('#txFileYear').val() != "")
		strFileYear = $('#txFileYear').val();
	else if($('#txDocNo').val() != "")
		strFileYear = $('#txDocNo').val().substr(0,3);

	if(strFileYear == "")
	{
		var dttoday = new Date();
		var newYear = dttoday.getFullYear() - 1911;
		newYear = newYear + "";
		newYear = jf_PADL(newYear, 3, "0");
		strFileYear = newYear;
	}

	var szInchargeOu = _rsltODWMSG['INCHARGE_OU'];
	if($('#txClsNo').val() != "")
		WebPage = WebPage+ "EA01/EAC005.aspx?DEPT_NO="+szInchargeOu+"&nFrom=ODC010&MODE=2&FILE_YEAR="+strFileYear+"&FILE_CLS="+$('#txClsNo').val() +"&SAMLart="+localStorage.Artifact;
	else	
		WebPage = WebPage+ "EA01/EAC005.aspx?DEPT_NO="+szInchargeOu+"&nFrom=ODC010&MODE=2&FILE_YEAR="+strFileYear+"&SAMLart="+localStorage.Artifact;

	if($('#txFileCaseNo').val() != "")
		WebPage += "&FILE_CASE=" + $('#txFileCaseNo').val();
			
	var $pane = $("div#ODC010_FILECASE_DIV");
	$.modal($pane, {
		containerCss: {width: "95%", height: "95%"},
		onShow: function() 
		{
			var $frame = $pane.find('iframe');
			if ($frame.length)
			{
				$pane.css("width", "95%").css("height", "95%");
				$frame.css("width", "95%").css("height", "95%");//iframe有預設border-width
				$frame[0].src = WebPage;
			}
			$("div#ODC010_FILECASE_DIV")[0].style="width:100%; height:100%; position:absolute; left:0px; top:0px; z-index:0"
			$pane.find(".ui-slide-pane-active").removeClass("ui-slide-pane-active");
			$pane.addClass("ui-slide-pane-active");
		}
	});
	//1080927 David 1080339 jQuery升級3.4.1改寫語法
	//$("div#ODC010_FILECASE_DIV").find("#Dlg_close_btn").click(function(event, obj)
	$("div#ODC010_FILECASE_DIV").find("#Dlg_close_btn").on("click", function(event, obj)
	{
		var $pane = $("div#ODC010_FILECASE_DIV");
		var $frame = $pane.find('iframe');
		$frame[0].src = "";
		$("div#ODC010_FILECASE_DIV")[0].style="display: none";
		$("div#ODC010_FILECASE_DIV").find(".ui-slide-pane-active").removeClass("ui-slide-pane-active");
		$("div#ODC010_FILECASE_DIV").find(".ui-slide-pane-left").addClass("ui-slide-pane-active");
		$.modal.close();
		if($("#txRtnClsNo").val() != "")
		{
			$("#txClsNo").val($("#txRtnClsNo").val());
			//1100408 David 1100192 需由分類號帶出保存年限，且有對應的保存年限時才帶入
			if (theSSO.User.EnvSettings.get("OD_ODC010_CLSNO_BLUR_KEEPYEAR") != 'Y' && $("#txRtnKeepYear").val() != "")
				$("#txKeepYear").val($("#txRtnKeepYear").val());

			$("#txRtnClsNo, #txRtnKeepYear").val("");

			//1071214 David 1071179 調整檢核邏輯，檢核未過不觸發案次號檢核
			//ObjOnBlur(null ,'txClsNo'));
			if(!ObjOnBlur(null ,'txClsNo'))
				return;
		}
		
		if($("#txRtnFileCase").val() != "")
		{
			$("#txFileCaseNo").val($("#txRtnFileCase").val());
			$("#txRtnFileCase").val("");
			ObjOnBlur(null ,'txFileCaseNo');
		}
	});
}

//1111123 David 1110881 新增銓敘部任審視窗處理
function fnSearchTAPerson()
{
	if(SSO_CONFIG.OrgNickName != "MOCS")
		return;

	if($('#dlProperty option:selected').val() != theSSO.User.SystemSets.get("MOCS_TA_DOC_PROPERTY"))
	{
		alert("公文非銓審案，不可開啟任審設定視窗");
		return;
	}

	var WebPage = SSO_CONFIG.ServerHost + "/ODDEP/ODT130C2.aspx?nFrom=ODC010";

	var $pane = $("div#ODC010_CLSNO_DIV");
	$.modal($pane, {
		containerCss: {width: "90%", height: "60%"},
		onShow: function() 
		{
			var $frame = $pane.find('iframe');
			if ($frame.length)
			{
				$pane.css("width", "95%").css("height", "95%");
				$frame.css("width", "95%").css("height", "95%");//iframe有預設border-width
				$frame[0].src = WebPage;
			}
			$("div#ODC010_CLSNO_DIV")[0].style="width:100%; height:100%; position:absolute; left:0px; top:0px; z-index:0";
			$pane.find(".ui-slide-pane-active").removeClass("ui-slide-pane-active");
			$pane.addClass("ui-slide-pane-active");
		}
	});
	$("div#ODC010_CLSNO_DIV").find("#Dlg_close_btn").on("click", function(event, obj)
	{
		var $pane = $("div#ODC010_CLSNO_DIV");
		var $frame = $pane.find('iframe');
		$frame[0].src = "";
		$("div#ODC010_CLSNO_DIV")[0].style="display: none";
		$("div#ODC010_CLSNO_DIV").find(".ui-slide-pane-active").removeClass("ui-slide-pane-active");
		$("div#ODC010_CLSNO_DIV").find(".ui-slide-pane-left").addClass("ui-slide-pane-active");
		$.modal.close();
	});
}
//1111202 David 1110835 新增銓敘部人民陳情辦理情形按鈕處理
function fnOpenMOCSPetition()
{
	if(SSO_CONFIG.OrgNickName != "MOCS")
		return;

	if($('#dlProperty option:selected').val() != "6")
	{
		alert("公文非人民陳情案件，不可開啟人民陳情案件維護作業");
		return;
	}

	let strEDT2301Url = SSO_CONFIG.ServerHost + "/ED/ED2/EDT2301_MOCS.aspx?argDocNo=" + $('#txDocNo').val();
	window.open(strEDT2301Url);
}

function SaveWDCM()
{
	//業務類別

	//For WMSG
	/*if (document.all.dlWorkType.length > 0 && document.all.dlWorkType.selectedIndex != -1)
		document.all.txBTypeNo2.value = document.all.dlWorkType.options[document.all.dlWorkType.selectedIndex].value;
	else
		document.all.txBTypeNo2.value = "";*/

	//[問題單950967] 儲存前檢查若是創稿但txDocTypeDB的值卻是空值，則應補填入定稿(C) Charles 0951011
	//若之後更改定稿所表示的值，如不再為C，則連同fnAfterPageLoad()中一併修改
	if ($("#cbNewByOu")[0].checked && $("#dlDocType option:selected").val() == "")
		UiSetDlItemByValue("dlDocType", "C");

	try
	{
		var arrODWDCM = new Array();
		var i = 0;

		//文別
		arrODWDCM[i++] = { fieldname: 'DOC_CATEGORY', value: $("#dlDocCategory option:selected").val()};
		//本別
		arrODWDCM[i++] = { fieldname: 'FROMDOC_TYPE', value: $("#dlDocType option:selected").val()};
		//並列案由
		arrODWDCM[i++] = { fieldname: 'APP_SUBJECT', value: $("#txAppSubject").val()};
		//其他案由
		arrODWDCM[i++] = { fieldname: 'OTHER_SUBJECT', value: $("#txOtherSubject").val()};
		//案件編號
		arrODWDCM[i++] = { fieldname: 'CASE_NO', value: $("#txCaseNo").val()};
		//併案情形
		//1060808 David 1060698 新增合理性判斷
		//arrODWDCM[i++] = { fieldname: 'COMBINE_TYPE', value: $("#dlComType option:selected").val()};
		if($("#txComNo").val() != "")
			arrODWDCM[i++] = { fieldname: 'COMBINE_TYPE', value: $("#dlComType option:selected").val()};
		else
			arrODWDCM[i++] = { fieldname: 'COMBINE_TYPE', value: ""};
		//公文性質
		arrODWDCM[i++] = { fieldname: 'DOC_PROPERTY', value: $("#dlProperty option:selected").val()};
		//業務類別
		arrODWDCM[i++] = { fieldname: 'B_TYPE_NO', value: $("#dlWorkType option:selected").val()};
		//關鍵字
		arrODWDCM[i++] = { fieldname: 'KEY_WORD', value: $("#txKeyWord").val()};
		//處理期限
		arrODWDCM[i++] = { fieldname: 'LEAD_TIME', value: $("#txLeadTime").val()};
		arrODWDCM[i++] = { fieldname: 'LT_UOM', value: $("#dlLtUom option:selected").text()};
		//起算日期
		arrODWDCM[i++] = { fieldname: 'START_DATE', value: $("#txStartDate").val()};
		//分類號
		arrODWDCM[i++] = { fieldname: 'FILE_CLS', value: $("#txClsNo").val()};
		//保存年限
		arrODWDCM[i++] = { fieldname: 'KEEP_YEAR', value: $("#txKeepYear").val()};
		//案次號
		//1090720 David 支援OD_CHECK_FILE_CASE=S設定功能
		//if(gObj.gFileCaseDisplay == "Y")
		if(gObj.gFileCaseDisplay == "Y" || gObj.gFileCaseDisplay == "S")
			arrODWDCM[i++] = { fieldname: 'FILE_CASE', value: $("#txFileCaseNo").val()};
		//解密期限
		arrODWDCM[i++] = { fieldname: 'EXTRMVSEC_DATE', value: $("#txDSecDate").val()};
		//解密條件
		arrODWDCM[i++] = { fieldname: 'EXTRMVSEC_COND', value: $("#comboDSecCond").val()};
		//SUM_TYPE
		arrODWDCM[i++] = { fieldname: 'SUM_TYPE', value: $("#txSumType").val()};
		//年度號
		arrODWDCM[i++] = { fieldname: 'FILE_YEAR', value: $("#txFileYear").val()};
		//DOC_STATE
		arrODWDCM[i++] = { fieldname: 'DOC_STATE', value: $("#txDocState").val()};
		//檔案數量
		arrODWDCM[i++] = { fieldname: 'FILE_CNT', value: $("#txFileCnt").val()};
		//檔案數量單位
		arrODWDCM[i++] = { fieldname: 'FILE_UNIT', value: $("#dlFileUnit option:selected").text()};
		//附件頁籤資料
		arrODWDCM[i++] = { fieldname: 'ATTACH', value: $("#txAttach").val()};

		//1051214 David 1050780 新增會議型式選單欄位
		var strMeetingType = $("#dlMeetingType option:selected").val();
		//1051228 David 1051345 調整鐵工局會議型式檢核邏輯，改於WebEditSave內處理
		/*if($('#dlDocCategory option:selected').val() != "4")
			strMeetingType = "0";*/
		arrODWDCM[i++] = { fieldname: 'MEETING_TYPE', value: strMeetingType};

		//1060110 David 因DUE_DATE資料改由ODWDCM內取得，儲存時新增更新ODWDCM內資料
		arrODWDCM[i++] = { fieldname: 'DUE_DATE', value: $("#txDueDate").val()};

		//1061222 David 1061170 修正應用限制欄位未正確儲存問題
		arrODWDCM[i++] = { fieldname: 'APPLY_LIMT', value: $("#dlApplyLimit option:selected").val()};
		
		//1090914 David 1090557 新增信保欄位儲存處理
		if(SSO_CONFIG.OrgNickName == "SMEG")
		{
			arrODWDCM[i++] = { fieldname: 'CLIENT_CARD_NO', value: $("#txClientCardNo").val()};
			arrODWDCM[i++] = { fieldname: 'CLIENT_NAME', value: $("#txClientName").val()};
			arrODWDCM[i++] = { fieldname: 'TAX_ID_NO', value: $("#txTaxIdNo").val()};
			arrODWDCM[i++] = { fieldname: 'TAX_ID_NAME', value: $("#txTaxIdName").val()};
			arrODWDCM[i++] = { fieldname: 'MANAGE_BANK_NO', value: $("#txManageBankNo").val()};
			arrODWDCM[i++] = { fieldname: 'MANAGE_CASE_NO', value: $("#txManageCaseNo").val()};
			arrODWDCM[i++] = { fieldname: 'MANAGE_NAME', value: $("#txManageName").val()};
			arrODWDCM[i++] = { fieldname: 'BANK_CODE', value: $("#txBankCode").val()};
			arrODWDCM[i++] = { fieldname: 'BANK_NAME', value: $("#txBankName").val()};
			arrODWDCM[i++] = { fieldname: 'BANK_BRANCH_CODE', value: $("#txBankBranchCode").val()};
			arrODWDCM[i++] = { fieldname: 'BANK_BRANCH_NAME', value: $("#txBankBranchName").val()};
			var strSmegDelay = "0";
			if($('#cbSmegDelay')[0].checked)
				strSmegDelay = "1";
			arrODWDCM[i++] = { fieldname: 'SMEG_DELAY', value: strSmegDelay};
		}

		theAOL.docObj.set('ODC010', 'ODWDCM', arrODWDCM);

		//存COM_NO
		if (!SaveWDCMComNo())
			return false;

		return true;
	}
	catch (e)
	{
		console.error("儲存WDCM發生錯誤：" + e.message);
		alert("儲存WDCM發生錯誤：" + e.message);
		return false;
	}
}

//併案資訊
function SaveWDCMComNo()
{
	try
	{
		var arrComObj = [];

		//再重新加入
		if($("#txComNo").val() != "")
		{
			for(var i = 0 ; i < $("#dlComNo")[0].length ; i++)
			{
				var SaveComObj = {
					COM_DOC_NO : ""
					,SIGN_TYPE : ""
					//1090506 David 1080867 新增紀錄COMBINE_TYPE
					,COM_COMBINE_TYPE : ""
				};

				SaveComObj.COM_DOC_NO = $("#dlComNo option")[i].text;
				SaveComObj.SIGN_TYPE = $("#dlComNo option")[i].value;
				//1090506 David 1080867 新增紀錄COMBINE_TYPE
				SaveComObj.COM_COMBINE_TYPE = $("#dlCombineType option")[i].value;
				arrComObj.push(SaveComObj);
			}
		}

		var arrODWMSG = [];
		arrODWMSG.push({fieldname: 'COM_NO', value: arrComObj});
		theAOL.docObj.set('ODC010', 'ODWDCM', arrODWMSG);

		//1061024 David 1060953 新增處理彙辦資訊
		var SvaeCombineType2 = "";

		//取COM_STATUS值以設定是否勾選併件選項
		var SaveComStatus = "";
		if($('#txComNo').val() == "")
		{
			SaveComStatus = "";
			$("#txMerge").val("N");
			//1061024 David 1060953 新增處理彙辦資訊
			SvaeCombineType2 = "";
		}
		else if($('#cbCombineType2')[0].checked)//1061024 David 1060953 勾選彙辦時強制併件
		{
			SvaeCombineType2 = "1";
			SaveComStatus = "1";
			$("#txMerge").val("Y");
		}
		else if($('#cbCom')[0].checked)
		{
			SaveComStatus = "1";
			$("#txMerge").val("Y");
		}
		else
		{
			SaveComStatus = "0";
			$("#txMerge").val("N");
		}

		var arrODWDCMForComStatus = new Array();
		arrODWDCMForComStatus[0] = { fieldname: 'MERGE', value: $("#txMerge").val()};
		arrODWDCMForComStatus[1] = { fieldname: 'COM_STATUS', value: SaveComStatus};
		//1061024 David 1060953 新增處理彙辦資訊
		arrODWDCMForComStatus[2] = { fieldname: 'COMBINE_TYPE_2', value: SvaeCombineType2};
		theAOL.docObj.set('ODC010', 'ODWDCM', arrODWDCMForComStatus);
		
		if($('#txComNo').val() != "" && $('#txComNo').val() != $('#txDocNo').val())
		{
			var arrODWMSGForComType = new Array();
			arrODWMSGForComType[0] = { fieldname: 'COM_TYPE', value: "2"};
			theAOL.docObj.set('ODC010', 'ODWMSG', arrODWMSGForComType);
		}

		return true;
	}
	catch(e)
	{
		alert("儲存併案文號資訊失敗："+e.message );
		return false;
	}
}

function SaveWMSG()
{
	try
	{
		//1060323 David 1060153 修正主旨儲存時需Trim處理
		$("#txSubject").val($("#txSubject").val().trim());
	
		if ($("#dlSec option:selected").val() == "1")
			$("#txInSubject").val($("#txSubject").val());
		//1080226 David 1080085 密件公文啟用如實顯示主旨時，儲存需更新畫面主旨資料至IN_SUBJECT
		else if(theSSO.User.EnvSettings.get("SEC_USE_SUBJECT").toUpperCase() == "Y")
			$("#txInSubject").val($("#txSubject").val());
		else//1111021 David 未啟用密件顯示真實主旨，如畫面欄位不為密不錄由(稿件無主旨，使用者需自行輸入)，寫到IN_SUBJECT，FROM_SUBJECT改為密不錄由
		{
			if($("#txSubject").val() != "密不錄由")
			{
				$("#txInSubject").val($("#txSubject").val());
				$("#txSubject").val("密不錄由");
			}
			//1150204 David 序56 密件公文儲存時如無主旨，IN_SUBJECT一樣紀錄密不錄由
			if($("#txInSubject").val() == "")
				$("#txInSubject").val("密不錄由");
		}

		var arrODWMSG = new Array();
		var i = 0;

		//速別
		arrODWMSG[i++] = { fieldname: 'SPEED', value: $("#dlSpd option:selected").val()};
		//密等
		arrODWMSG[i++] = { fieldname: 'SECRETE', value: $("#dlSec option:selected").val()};
		//主旨
		arrODWMSG[i++] = { fieldname: 'FROM_SUBJECT', value: $("#txSubject").val()};
		arrODWMSG[i++] = { fieldname: 'SUBJECT', value: $("#txInSubject").val()};
		//業務類別
		arrODWMSG[i++] = { fieldname: 'B_TYPE_NO', value: $("#dlWorkType option:selected").val()};
		//開會日期
		arrODWMSG[i++] = { fieldname: 'MEET_DATE', value: $("#txMeetDate").val()};
		//限辦日期
		arrODWMSG[i++] = { fieldname: 'DUE_DATE', value: $("#txDueDate").val()};
		//分類號
		arrODWMSG[i++] = { fieldname: 'FILE_CLS', value: $("#txClsNo").val()};
		//保存年限
		arrODWMSG[i++] = { fieldname: 'KEEP_YEAR', value: $("#txKeepYear").val()};
		//案次號
		//1090720 David 支援OD_CHECK_FILE_CASE=S設定功能
		//if(gObj.gFileCaseDisplay == "Y")
		if(gObj.gFileCaseDisplay == "Y" || gObj.gFileCaseDisplay == "S")
			arrODWMSG[i++] = { fieldname: 'FILE_CASE', value: $("#txFileCaseNo").val()};
		//DOC_STATE
		arrODWMSG[i++] = { fieldname: 'DOC_STATE', value: $("#txDocState").val()};
		//1140725 David 1140784 新增是否紙本併同歸檔選單
		arrODWMSG[i++] = { fieldname: 'IS_RCVFILE', value: $("#txIsRcvFile").val()};
		//紙本併同歸檔頁數
		arrODWMSG[i++] = { fieldname: 'RCVFILE_CNT', value: $("#txRcvFileCnt").val()};
		//檔案數量
		arrODWMSG[i++] = { fieldname: 'FILE_CNT', value: $("#txFileCnt").val()};

		theAOL.docObj.set('ODC010', 'ODWMSG', arrODWMSG);

		return true;
	}
	catch (e)
	{
		alert("SaveWMSG 錯誤" + e.message);
		return false;
	}
}

//切換核決者及併案文號時異動別選項處理
function fnResetDlTxNameForAppAndComNo(argAppUserId)
{
	var strBeforeTxName = "";
	var strBeforeUnit = "";
	var strBeforeUser = "";

	/*var nextTarget =  {
	  TxName = '',
	  OUId = '',
	  OUName = '',
	  RoleId = '',
	  RoleName = '',
	  UserId = '',
	  UserName = '',
	};*/

	var ResetTxName_ODWMSG = theAOL.docObj.get('ODWMSG', alODWMSG);
	var ResetTxName_ODWDCM = theAOL.docObj.get('ODWDCM', alODWDCM);
	
	ResetTxName_ODWMSG["REJECT_USER_NAME"] = $("#txRejectUserName").val();
	ResetTxName_ODWMSG["APP_USER_NAME"] = $("#txAppUserName").val();
	ResetTxName_ODWMSG["APP_USER_ID"] = $("#txAppUserId").val();
	ResetTxName_ODWMSG["APP_ROLE_ID"] = $("#txAppRoleId").val();
	ResetTxName_ODWMSG["DOC_STATE"] = $("#txDocState").val();

	ResetTxName_ODWDCM["DOC_STATE"] = $("#txDocState").val();

	SSOUtil.updatePDocTransTargetFromDI(theAOL.docObj, null, ResetTxName_ODWMSG, ResetTxName_ODWDCM)
}

//更新稿件內資訊
function SaveDraftMgmtInfo() {

	console.log('SaveDraftMgmtInfo()');

	if (gObj.gFileYear != $('#txFileYear').val() || gObj.gClsNo != $('#txClsNo').val() ||
		//1060824 David 1060713 修正案次號欄位ID錯誤問題
		//(gObj.gFileCaseDisplay == "Y" && gObj.gFileCase != $('#txFileCase').val())
		//1090720 David 支援OD_CHECK_FILE_CASE=S設定功能
		//(gObj.gFileCaseDisplay == "Y" && gObj.gFileCase != $('#txFileCaseNo').val())
		((gObj.gFileCaseDisplay == "Y" || gObj.gFileCaseDisplay == "S") && gObj.gFileCase != $('#txFileCaseNo').val())
		|| gObj.gKeepYear != $('#txKeepYear').val()) {

		theAOL.getCurrFolio().setAllDraftText("/*/年度號", $('#txFileYear').val()).done
		(
			function (arr) {
				if (arr[0] && arr[0].success && arr[0].success == false) {
					console.error("設定各稿年度號時發生異常：" + arr[0].errorText);
					alert("設定各稿年度號時發生異常：" + arr[0].errorText);
					return false;
				}
				else {
					gObj.gFileYear = $('#txFileYear').val();
				}
			}
		);
		theAOL.getCurrFolio().setAllDraftText("/*/分類號", $('#txClsNo').val()).done
		(
			function (arr) {
				if (arr[0] && arr[0].success && arr[0].success == false) {
					console.error("設定各稿分類號時發生異常：" + arr[0].errorText);
					alert("設定各稿分類號時發生異常：" + arr[0].errorText);
					return false;
				}
				else {
					gObj.gClsNo = $('#txClsNo').val();
				}
			}
		);
		//1090720 David 支援OD_CHECK_FILE_CASE=S設定功能
		//if (gObj.gFileCaseDisplay == "Y") {
		if (gObj.gFileCaseDisplay == "Y" || gObj.gFileCaseDisplay == "S") {
			//1060824 David 1060713 修正案次號欄位ID錯誤問題
			//theAOL.getCurrFolio().setAllDraftText("/*/案次號", $('#txFileCase').val()).done
			theAOL.getCurrFolio().setAllDraftText("/*/案次號", $('#txFileCaseNo').val()).done
			(
				function (arr) {
					if (arr[0] && arr[0].success && arr[0].success == false) {
						console.error("設定各稿案次號時發生異常：" + arr[0].errorText);
						alert("設定各稿案次號時發生異常：" + arr[0].errorText);
						return false;
					}
					else {
						//1060824 David 1060713 修正案次號欄位ID錯誤問題
						//gObj.gFileCase = $('#txFileCase').val();
						gObj.gFileCase = $('#txFileCaseNo').val();
					}
				}
			);
		}
		theAOL.getCurrFolio().setAllDraftText("/*/保存年限", $('#txKeepYear').val()).done
		(
			function (arr) {
				if (arr[0] && arr[0].success && arr[0].success == false) {
					console.error("設定各稿保存年限時發生異常：" + arr[0].errorText);
					alert("設定各稿保存年限時發生異常：" + arr[0].errorText);
					return false;
				}
				else {
					gObj.gKeepYear = $('#txKeepYear').val();
				}
			}
		);
	}
	return true;
}

function fnHideOtherSubject()
{
	if($("#btOtherSubject").text() == ">>")
	{
		$(".AreaHideSubject").show();
		$("#btOtherSubject").text("<<");
	}
	else
	{
		$(".AreaHideSubject").hide();
		$("#btOtherSubject").text(">>");
	}
}

function fnODC011ChangeRemark()
{
	if(gObj.gPage == "ODC011")
	{
		fnODC011SetOptionsForRemark();
	}
}

//檢查中文日期格式是否正確
function jf_fnChkDate(argObjName, argTitle) {
	if ($('#' + argObjName).val() == "")
		return true;

	if ($('#' + argObjName).val().length < 7)
		$('#' + argObjName).val(jf_PADL($('#' + argObjName).val(), 7, "0"));

	if (!jf_CheckCDATE($('#' + argObjName).val())) {
		alert(argTitle + "格式錯誤");
		//1080927 David 1080339 jQuery升級3.4.1改寫語法
		//$('#' + argObjName).val("").focus();
		$('#' + argObjName).val("").trigger("focus");
		return false;
	}
	return true;
}

//將字串左邊補足特定字元
function jf_PADL(argString, argLength, argFillStr) {
	var pi_length;
	pi_length = argString.length;
	if (pi_length < argLength) {
		return jf_PADL(argFillStr + argString, argLength, argFillStr);
	}
	return argString;
}

//檢查輸入之民國日期字串(七碼YYYMMDD)是否正確
function jf_CheckCDATE(argStr) { // adapting for other layouts should be easy
	if (argStr.length < 7)
	{ argStr = jf_PADL(argStr, 7, '0'); }
	var pYear, pMonth, pDay;
	pYear = parseInt(argStr.substring(0, 3), 10) + 1911;
	pMonth = parseInt(argStr.substring(3, 5), 10);
	pDay = parseInt(argStr.substring(5, 7), 10);

	if (!jf_ValidDate(pYear, pMonth - 1, pDay))
		return false;
	else
		return true;
}

function jf_ValidDate(y, m, d) {
	with (new Date(y, m, d)) return ((getDate() == d) && (getMonth() == m))
}

//1100510 David 1100221 移除jQuery.trim()，改由共用方法處理
/*function jf_Trim(argStr)
{
	return jQuery.trim(argStr);
}*/

function AddUrlSlash(argUrl)
{
	if(argUrl == "") return "";
	if(argUrl.substring(argUrl.length-1, argUrl.length) !="/")
		return argUrl + "/";
	else
		return argUrl;
}

//1060203 David 1060004 如公文已做過專案申請核可，不允許異動公文性質、業務類別及辦理天數
function SetCaseAppDisable()
{
	//1060808 David 1060698 調整判斷
	//if(theAOL.docObj.ODWDCM.CAM_DOC_PROPERTY != "")
	if(theAOL.docObj.ODWDCM.CAM_DOC_PROPERTY && theAOL.docObj.ODWDCM.CAM_DOC_PROPERTY != "")
	{
		UiSetObjMotifyMode("#dlProperty,#dlWorkType,#txWorkTypeNo" , 'R', '此份公文已做過專案申請核可，不允許異動公文性質及業務類別');
		UiSetObjMotifyMode("#txLeadTime,#dlLtUom,#txDueDate" , 'R', '此份公文已做過專案申請核可，不允許異動時效相關欄位');
	}
}

//1061024 David 1060953 新增勾選彙辦處理
function fnSetCombineType2()
{
	if($('#cbCombineType2')[0].checked)
	{
		UiSetObjMotifyMode('#cbCom', 'R', '1');
	}
	else
	{
		UiSetObjMotifyMode('#cbCom', 'W', '0');
	}
}

//1061108 David 1061074 新增文別連動處理
function fnDocCategoryChange()
{
	if ($('#dlDocCategory')[0].selectedIndex == -1) {
		return;
	}

	var sDocCategoey = $('#dlDocCategory option:selected').val();

	if(SSO_CONFIG.OrgNickName == "RRB" && (sDocCategoey == "4" || sDocCategoey == "B"))
	{
		//公文性質帶入一般公文
		if (gObj.gtxDocProperty != "1")
		{
			UiSetDlItemByValue("dlProperty", "1");
			fndlPropertyOnChange();
		}

		//業務類別帶入12開會通知
		UiSetDlItemByValue("dlWorkType", "12");
		ObjOnBlur(null, 'dlWorkType');
	}
}

//避免JS檔重複載入
(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("MS-ODC010.js").finish();
})();
