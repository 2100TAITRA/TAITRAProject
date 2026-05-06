/*
DATE	SA		PRG		MGR_NO	DESC
1030922	Yvonne	Kevin	1040010	新增MS-ODC010UI
1040130         Raymond         新增'回閱','抄本'checkbox
1050729	David	David	1050087	二代修改
1051214	David	David	1050780	新增會議型式選單欄位
1060110	David	David	-------	將DUE_DATE資料改由ODWDCM內取得，避免因未重取待辦造成開啟公文帶出舊資料
1060307	David	David	-------	修正本別選項內容同法規定義
1060526	David	David	1060426	修正取得併案資訊時新增判斷不為undefined再取得資料
1060728	David	David	-------	修正UiDisplaySumType()內判斷txCaseNo欄位語法錯誤問題
1060814	David	David	-------	修正gObj.gtxDocProperty未正確記錄問題
1061024	David	David	1060953	(鐵工局)新增彙辦欄位
1061212	David	David	1061250	1.併案文號欄位開放異動判斷透過共用函式處理，且併案母文如有子文資訊時，不允許異動併案文號欄位。2.順手修正時效統計鎖定處理未實作問題
1061228	David	David	-------	如APPLY_LIMIT為空，依環境變數給予預設值
1071105	David	David	1071076	新增環境變數MS_KEY_CASECLS邏輯處理
1080211	David	David	1080042	調整解密條件選單內容
1080927	Kevin	David	1080339	jQuery升級3.4.1改寫語法
1081212	David	David	1080963	修正設定CheckBox、RadioButton，需refresh後UI呈現才會更新
1090102	David	David	1090001	新增紀錄公文製作傳入的年度號
1090506	Kevin	David	1080867	支援彙併辦、併案陳核並存狀態，調整相關判斷
1090914	David	David	1090557	新增信保欄位處理
1090928	David	David	1090559	信保開放附件頁面給線上簽核使用
1100514	David	David	-------	信保統一編號欄位支援英數
1101110	David	David	1101179	調整併件欄位Enable判斷時機，避免不同簽核類型公文可併件
1101125	David	David	1101328	計量單位選單依代碼檔資料設定
1110330	Kevin	David	1101477	考試院符合的承辦單位、資料夾時，需顯示「辦理情形」按鈕
1110426 Kevin	Kevin	1101477 各類案件辦理情形登錄作業新增文號
1111123	David	David	1110881	銓敘部客製化UI處理
1111202	Kevin	David	1110835	新增銓敘部人民陳情辦理情形按鈕處理
1111220	David	David	-------	(銓敘部)調整解密條件選單初始邏輯，邏輯同公文製作處理邏輯
1111229	David	David	-------	(彙整表序45，銓敘部序40)銓敘部不使用公文系統案件管理，不需顯示案件設定區域
1120313	Kevin	Cloud	1120203	弱掃修正Client DOM Stored XSS
1120529	David	David	1120235	有設定併案文號顯示名稱時，依設定值顯示
1120901 Kevin	Leslie  1120709 弱掃修正Client DOM Stored XSS
1131211	David	David	1130983	依系統參數判斷實體附件維護是否另開程式處理
1140319	David	David	1131053	新增增加附件筆數按鈕處理
1140725	David	David	1140784	新增是否紙本併同歸檔選單，調整紙本併同歸檔數量ENABLE邏輯
1140801	Kevin	Leslie	1141011	弱掃修正[Client DOM Stored XSS]，試用套件消毒
1141009	David	David	1141012	外貿公文端不使用分類案次號
*/
/* 依照文件之說明
AreaDocNo	公文機資區	
公文文號	txDocNo			收創文日	txRcvDate		創稿		cbNewByOu
公文來源	txDocSource		目前狀態	txStatus		收文別		txRcvType
來文者		txFromOrg		來文信箱	txFromEmail		回閱		cbReSign		抄本		cbCopyReq
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
分類號		txClsNo,txClsName			案次號		txFileCaseNo,txFileCaseName		保存年限	txKeepYear
應解密日期	txDSecDate		應用限制	dlApplyLimit	併件		cbCom
解密條件	comboDSecCond									檔案數量	txFileCnt
(檔案)單位	dlFileUnit									紙本併同歸檔 txRcvFileCnt
*/
/*XML內所有元素*/
var alODWMSG = 	['MSG_ID', 'DOC_NO', 'THREAD', 'SPEED', 'SECRETE'//_rsltODWMSG #xmldso2
				, 'SIGN_TYPE', 'MSG_OUT_LMT', 'MSG_ALM_LMT', 'DUE_DATE', 'ALARM_TIME'
				, 'NEW_TIME', 'FROM_OU', 'FROM_OU_ID', 'FROM_USER', 'FROM_ORG', 'FROM_SUBJECT'
				, 'SUBJECT', 'OWN_USER_ID', 'OWN_OU_ID', 'OWN_ROLE_ID', 'OWN_OU_LVL'
				, 'OWN_ROLE_LVL', 'TO_USER_ID', 'TO_USER_NAME', 'TO_OU_ID', 'TO_OU_NAME'
				, 'TO_ROLE_ID', 'TO_ROLE_NAME', 'INCHARGE_OU', 'FOLDER', 'SUBFOLDER'
				, 'TX_NAME', 'TX_REASON', 'STATUS_FLAG', 'COPY_REQ', 'RE_SIGN'
				, 'IC_OU_NAME', 'IC_USER_ID', 'IC_USER_NAME', 'APP_USER_ID', 'APP_USER_NAME'
				, 'APP_ROLE_ID', 'STORAGE_PATH', 'SUB_DIR', 'WEB_SERVICE', 'SRV_NO'
				, 'TMP_CER', 'FROM_MSG_ID', 'FROM_THREAD', 'URL', 'SYSID'
				, 'CLOSE_F', 'CASE_CON', 'CLOSE_TYPE', 'SOURCE_ORGNO', 'ORGNAME'
				, 'DOC_STATE', 'ODUE_DATE', 'TRAN_MARK', 'STORE_TYPE', 'REJECT_USER_NAME'
				, 'RESENT_DUEDATE', 'RESENT_WARNDATE', 'FILE_CNT', 'NEW_BY_OU', 'FILE_YEAR'
				, 'FILE_CLS', 'KEEP_YEAR', 'KEY_WORD', 'SERVER_DRAFT', 'SIGN_TIME'
				, 'DRAFT_MSG_ID', 'B_TYPE_NO', 'MEET_DATE', 'IS_OURCV', 'COM_TYPE'
				, 'FROM_USER_ID', 'RCV_TYPE', 'MPRULE_EQUAL_CHECK', 'IS_PROXY_DOC', 'CURR_LOCATION'
				, 'FROM_THREAD_MSG_ID', 'OU_RCV_MSG_ID', 'FILE_CASE', 'RCV_DATE', 'WWKF_MARK'
				, 'IS_RCVFILE', 'RCVFILE_CNT', 'BLOCK_NAME', 'SIGN_DUEDATE'];
/*XML內所有元素*/
var alODWDCM = 	['RCV_DATE', 'NEW_BY_OU', 'RCV_TYPE', 'H_SUBMIT', 'MAIL_ADDR'//_rsltODWDCM #xmldso1
				, 'FROMDOC_TYPE', 'DOC_CATEGORY', 'FROMORG_DATE', 'OU_NAME', 'EMP_NAME'
				, 'DOC_PROPERTY', 'CASE_NO', 'B_TYPE_NO', 'STEP_NAME', 'COMBINE_TYPE'
				, 'KEY_WORD', 'FILE_YEAR', 'FILE_CLS', 'KEEP_YEAR', 'APPLY_LIMT'
				, 'EXTRMVSEC_COND', 'EXTRMVSEC_DATE', 'RMVSEC_ID', 'MERGE', 'CLOSE_F'
				, 'CASE_CON', 'CLOSE_TYPE', 'FILE_CNT', 'FILE_UNIT', 'LEAD_TIME'
				, 'LT_UOM', 'SUM_TYPE', 'START_DATE', 'DOC_SOURCE', 'DOC_STATE'
				, 'COORG_NO', 'COORG_NAME', 'COORG_NO2', 'COORG_NAME2', 'COORG_NO3' , 'COORG_NAME3'
				, 'COORG_NO4', 'COORG_NAME4', 'COORG_NO5', 'COORG_NAME5', 'COSIGN_TYPE', 'OUT_REMARK', 'UPISSUE_WORD', 'UPISSUE_NO'
				, 'UPISSUE_DATE', 'IS_NOTIFY', 'FILE_CASE', 'APP_SUBJECT', 'OTHER_SUBJECT'
				, 'DUE_DATE', 'ODUE_DATE', 'FROM_NO_WORD', 'FROM_NO_NO', 'APPROVED_DATE'
				, 'COWORK_M_USER_NAME', 'LOCKRCV_MONTH', 'LOCKCLOSE_MONTH', 'LOCKTODO_MONTH', 'CLOSE_DATE'
				, 'COM_STATUS', 'DELAMINATE_LVL', 'PROXY_TYPE', 'SRC_RCV_NO', 'SRC_RCV_DATE'
				, 'COM_NO', 'M_COM_CASE_NO', 'M_CASE_NO', 'LOCK_SETTING', 'LOCK_MSG'
				, 'CANCEL_APP_ENABLE', 'CANCEL_ENABLE', 'FROMORGNO', 'POSTCODE', 'ADDRESS'
				, 'SENDTYPE', 'RCV_TASK', 'ISSUE_TASK', 'ATTACH'];

//1051214 David 1050780 新增會議型式選單欄位
alODWDCM.push('MEETING_TYPE');

//1061024 David 1060953 新增彙辦欄位
alODWDCM.push('COMBINE_TYPE_2');

//1090914 David 1090557 新增信保欄位
alODWDCM.push('CLIENT_CARD_NO','CLIENT_NAME','MANAGE_BANK_NO','MANAGE_CASE_NO','MANAGE_NAME','TAX_ID_NO','TAX_ID_NAME');
alODWDCM.push('BANK_CODE','BANK_NAME','BANK_BRANCH_CODE','BANK_BRANCH_NAME','SMEG_DELAY','DRAFT_SOURCE_TYPE');

var gDisPlayMode = '';	//是否顯示欄位
var gModifyMode = '';	//是否啟用欄位
var gWebEditMode = '';	//公文製作唯讀模式開啟 是(R)

function UiSetControl()
{
	//第一碼 A	L
	//第二碼 A(完全開放)	S(承辦人模式)	L(完全不開放)	E(承辦人可修改主旨模式)	若來文時用以下設定(cbNewByOu)
	//第三碼 R 公文製作以唯讀模式開啟

	var argMode = gObj.uMetaMode//"LA"; //測試用

	//設定預設唯讀欄位
	var ObjReadOnly = [
		'#txDocNo','#txRcvDate','#cbNewByOu','#txDocSource','#txStatus','#txRcvType',
		'#txFromOrg','#txFromEmail','#txFromDate','#txFromNo','#txFromWord','#txDeptShow',
		'#txUser','#txCoDeptShow','#txCoUser','#dlComType','#dlDocType','#txClsName','#txFileCaseName',
		'#txSumTypeShow',"#txLeadTime","#dlLtUom","#txStartDate","#txMeetDate","#txDueDate"
		//1061024 David 1060953 新增彙辦欄位
		,"#cbCombineType2"
		//1090914 David 1090557 新增信保欄位
		,"#txClientName","#txTaxIdName","#txManageName","#txShowBankName"
			];
		$.each(ObjReadOnly	, function(index, val) {UiSetObjMotifyMode(ObjReadOnly[index] , 'R', '');});

	gDisPlayMode = argMode.substr(0, 1).toUpperCase();
	gModifyMode = argMode.substr(1, 1).toUpperCase();
	gWebEditMode = argMode.substr(2, 1).toUpperCase();//新增MetaData第三碼，控制文稿編輯開啟公文製作模式
	
	//數字欄位設定
	fnODC010SetNumOnly();

	console.log('是否顯示欄位：', gDisPlayMode);

	if (gDisPlayMode == 'A')
	{
		fnSetClassHide("AreaSubject,AreaOwnId,AreaCoOwnId,AreaState,AreaArchi,AreaDochr", false);
	}
	else//if(gDisPlayMode=='L')
	{
		fnSetClassHide("AreaSubject,AreaOwnId,AreaCoOwnId,AreaState,AreaArchi,AreaDochr", true);
	}
	
	//1061024 David 1060953 新增彙辦欄位處理
	fnSetClassHide("CombineType2Area", true);

	console.log('是否啟用欄位：', gModifyMode);

	//欄位可否編輯 擴充O屬性完全開放主旨欄位
	if (gModifyMode == 'A' || gModifyMode == 'O') //可以修改
		EnableColumn('W');
	else  // 'L' 不能修改
		EnableColumn('R');

	//Kevin Wait
	//1030428 David 1030181	新增列管公文按鍵，依是否為草稿及環境變數USE_AUDIT_DOC判斷是否顯示
	//if(!IsDraft($('#txMsgId')[0].value))
	//95.10.16 950925 David 新增併案資訊頁面修改
	//var IsShowComDetail = theSSO.User.EnvSettings.get('OD_IS_SHOW_COM_DETAIL');

	//案件編號相關控制
	UiCtrlCaseNo();
	//立案相關控制
	UiCaseRelatedCtrl();
	//時效統計鎖定
	//1061212 David 1061250 修正時效統計鎖定處理未實作問題
	CheckLockSetting();

	//綠標按鈕控制
	UiGBCtrl();

	//案次號控制
	UiFileCaseCtrl();

	//按鈕控制
	UiButtonCtrl();

	//畫面欄位寬度控制
	UiWidthCtrl();

	//1051214 David 1050780 新增客製化欄位處理
	UiCustomerCtrl();
}

function EnableColumn(argEnable)
{
	//第一區
	UiSetObjMotifyMode('#dlDocCategory', argEnable, '');
	UiSetObjMotifyMode('#dlSec', argEnable, '');
	UiSetObjMotifyMode('#dlSpd', argEnable, '');

	//第二區
	UiSetObjMotifyMode('#txSubject', argEnable, '');
	UiSetObjMotifyMode('#txAppSubject', argEnable, '');
	UiSetObjMotifyMode('#txOtherSubject', argEnable, '');

	//第三區 關鍵詞、併案文號、案件編號、業務類別、辦理階段、分類號、保存年限
	UiSetObjMotifyMode('#dlProperty', argEnable, '');
	UiSetObjMotifyMode('#dlWorkType', argEnable, '');
	UiSetObjMotifyMode('#txWorkTypeNo', argEnable, '');
	UiSetObjMotifyMode('#txCaseNo', argEnable, '');
	UiSetObjMotifyMode('#ibtCaseNo', argEnable, '');

	//以下欄位於模式為 承辦人模式(S)下可編輯
	if (gModifyMode == "S" || gModifyMode == "E")
	{
		argEnable = 'W';

		//承辦人模式時新增依環境變數判斷是否可異動業務類別欄位
		var strNodifyModeSEnBTypeNo = theSSO.User.EnvSettings.get("MODIFYMODE_S_ENBTYPENO");
		if(strNodifyModeSEnBTypeNo != "" && strNodifyModeSEnBTypeNo.toUpperCase() == "Y")
		{
			UiSetObjMotifyMode('#dlWorkType', argEnable, '');
			UiSetObjMotifyMode('#txWorkTypeNo', argEnable, '');
		}
	}

	//UiSetObjMotifyMode('#dlStepName', argEnable, '');

	//第四區
	UiSetObjMotifyMode('#txClsNo', argEnable, '');
	UiSetObjMotifyMode('#ibtClsNo', argEnable, '');
	UiSetObjMotifyMode('#txDSecDate', argEnable, '');

	UiSetObjMotifyMode('#txFileCnt', argEnable, '');
	UiSetObjMotifyMode('#dlFileUnit', argEnable, '');
	UiSetObjMotifyMode('#txFileCaseNo', argEnable, '');
	//1051214 David 1050780 新增會議型式欄位
	UiSetObjMotifyMode('#dlMeetingType', argEnable, '');

	//若為來文則文別,速別,密等,主旨,並列案由,其他案由為唯讀.
	if (!$('#cbNewByOu')[0].checked) {
		UiSetObjMotifyMode('#dlSec', 'R', '');
		UiSetObjMotifyMode('#dlSpd', 'R', '');
		UiSetObjMotifyMode('#dlDocCategory', 'R', '');

		UiSetObjMotifyMode('#txSubject', 'R', '');
		UiSetObjMotifyMode('#txAppSubject', 'R', '');
		UiSetObjMotifyMode('#txOtherSubject', 'R', '');
	}

	//將承辦人模式(E)移至此處，並增加O
	//新增承辦人可修改主旨模式
	if (gModifyMode == "E" || gModifyMode == "O")
	{
		UiSetObjMotifyMode('#txSubject', argEnable, '');
		UiSetObjMotifyMode('#txAppSubject', argEnable, '');
		UiSetObjMotifyMode('#txOtherSubject', argEnable, '');
	}

	if(gObj.uRcvMode == "1")
	{
		$('#dlDocType').selectmenu('enable');
		$('#dlDocCategory').selectmenu('enable');
		$('#dlSec').selectmenu('enable');

		if($('#comboDSecCond').val() =="")
			UiSetObjMotifyMode('#comboDSecCond', 'R', '');
		else
			UiSetObjMotifyMode('#comboDSecCond', 'W', '');
	}

	//1061212 David 1061250 併案文號欄位開放異動判斷透過共用函式處理
	/*//會核中主辦不可以修改母文號欄位
	var strFolderDiscuss = theSSO.User.EnvSettings.get("FOLDER_DISCUSS") != null ? theSSO.User.EnvSettings.get("FOLDER_DISCUSS") : "會核中";
	if(gObj.gOdDocPty5Mode == "1" && gObj.uFolder == strFolderDiscuss)
		UiSetObjMotifyMode('#txComNo', 'R', '');
	else
		UiSetObjMotifyMode('#txComNo', argEnable, '');*/
	UiComNoCtrl(argEnable);

	//判斷環境變數決定保存年限欄位是否可以自行輸入
	var strKeepYearEnable = theSSO.User.EnvSettings.get("OD_ODC010_KEEPYEAR_ENABLE");
	if(strKeepYearEnable != "" && strKeepYearEnable.toUpperCase() == "N")
		UiSetObjMotifyMode('#txKeepYear', 'R', '');
	else
		UiSetObjMotifyMode('#txKeepYear', argEnable, '');

	//判斷環境變數決定應用限制欄位是否可以自行輸入
	var strApplyLimitEnable = theSSO.User.EnvSettings.get("OD_ODC010_MODIFY_APPLY_LIMIT");
	if(strApplyLimitEnable != "" && strApplyLimitEnable.toUpperCase() == "N")
		UiSetObjMotifyMode('#dlApplyLimit', 'R', '');
	else
		UiSetObjMotifyMode('#dlApplyLimit', argEnable, '');

	//當環境變數OD_ODC010_RMVSEC_MODIFY設定為N時不允許修改外部來文的解密條件
	var strModifyRmvSec = theSSO.User.EnvSettings.get("OD_ODC010_RMVSEC_MODIFY");
	if(strModifyRmvSec != null && strModifyRmvSec != "" && strModifyRmvSec.toUpperCase() == "N")
		UiSetObjMotifyMode('#comboDSecCond', 'R', '');
	else
		UiSetObjMotifyMode('#comboDSecCond', argEnable, '');

	//Kevin Wait
	//勞委會收文公文且公文性質為人民陳情案件不允許於ODC010修改公文性質
	//var strPlead = theSSO.User.EnvSettings.get("OD_PLEAD");

	//1071105 David 1071076 新增環境變數MS_KEY_CASECLS邏輯處理
	if(gObj.gFileCaseDisplay == "Y" && gObj.gMsKeyCaseCls == "N")
	{
		$("#tdtxClsNo")[0].style.width = "122px";
		$("#tdibtClsNo")[0].style.width = "";
		$("#ibtClsNo").hide();
		UiSetObjMotifyMode('#txClsNo,#txFileCaseNo', 'R', '');
	}
}

//修正關鍵字欄位輸入特殊字元時，ODC010無法開啟問題。
function UifnKeyWord()
{
	var strKeyWord = jf_Trim($('#txKeyWord').val());
	strKeyWord = strKeyWord.replace(/＆/g,"&");
	strKeyWord = strKeyWord.replace(/＜/g,"<");
	strKeyWord = strKeyWord.replace(/＞/g,">");
	$('#txKeyWord').val(strKeyWord);
}

//CheckBox 併件 enable
function UiSetcbComEnable()
{
	if($('#txCaseNo').val() != "" || $('#txComNo').val() != "")
		UiSetObjMotifyMode('#cbCom', 'W', '');
	else
		UiSetObjMotifyMode('#cbCom', 'R', '');
}

//案件編號相關控制
function UiCtrlCaseNo()
{
	if (gModifyMode != 'A' && gModifyMode != 'S' && gModifyMode != 'O') //不可以修改
		return;

	//非一般公文(限辦)
	if ($('#dlProperty option:selected').val() != '1'	&& $('#dlProperty option:selected').val() != '2') {
	
		UiSetObjMotifyMode('#txCaseNo', 'W', '');

		if (gObj.gCaseNoBeforeChange != '')
			$('#txCaseNo').val(gObj.gCaseNoBeforeChange);
		
		if (!gObj.gFirstLoadPage)
			ObjOnBlur(null, 'txCaseNo');
	}
	else //一般公文、一般公文限辦
	{
		if ($('#txCaseNo').val() != '')
			gObj.gCaseNoBeforeChange = $('#txCaseNo').val();
		gObj.uCaseNoNow = '';
		UiSetObjMotifyMode('#txCaseNo', 'R', '');
	}
}

//用於顯示或隱藏'開啟', '立案', '?', 以及是否disable案件編號
function UiCaseRelatedCtrl()
{
	var nDisableWorkType = false;
	var nColor = '';

	GetBTypeWebInfo();
	//1060814 David 修正gObj.gtxDocProperty未正確記錄問題
	//uDocPropertyNow = $('#dlProperty')[0].options[$('#dlProperty')[0].selectedIndex].value;
	gObj.gtxDocProperty = $('#dlProperty option:selected').val();
	var bCanNewCaseNow = false;
	if (gObj.uSubFolder == '主辦待分辦')
		bCanNewCaseNow = true; //只有主辦待分辦可以立案

	var bIsChildDoc = false;//是否為子文
	if ($('#txDocNo').val() != '' && $('#txComNo').val() != '' && $('#txDocNo').val() != $('#txComNo').val())
		bIsChildDoc = true;

	var bIsComDoc = false;//是否為母文
	if ($('#txDocNo').val() != '' && $('#txComNo').val() != '' && $('#txDocNo').val() == $('#txComNo').val())
		bIsComDoc = true;

	/****************************按鍵控制 Start*******************************************/
	//0981112 Stella 取消立案等功能鍵
	//1060814 David 修正gObj.gtxDocProperty未正確記錄問題
	//if (uDocPropertyNow == '1' || uDocPropertyNow == '2' || uDocPropertyNow == '3')
	if (gObj.gtxDocProperty == '1' || gObj.gtxDocProperty == '2' || gObj.gtxDocProperty == '3')
	{}
	else
	{
		if ($('#txCaseNo').val() == '')
		{}
		else
		{
			if (bIsComDoc)
			{
				//0950315 CAESAR 依rita指示 若公文基資中案件編號不為空白,且併案文號為母文,則不允許修改業務類別
				nDisableWorkType = true;
				nColor = 'LightGrey';
			}
		}

		if (gObj.gBtypeUrl_SearchUrl != '') {
			UiSetObjMotifyMode('#ibtCaseNo', 'W', '');
		}
		else {
			UiSetObjMotifyMode('#ibtCaseNo', 'R', '');
		}
	}

	/****************************欄位控制 Start*******************************************/
	if (gObj.uSubFolder == '主辦待分辦' || gObj.uSubFolder == '主辦待送文'   //只在某幾個subfloder
		|| gObj.uSubFolder == '紙本簽核' || gObj.uSubFolder == '主辦')
	{
		if (nDisableWorkType == true) //母文有案號
		{
			UiSetObjMotifyMode('#txComNo', 'R', '');
			UiSetObjMotifyMode('#dlWorkType', 'R', '');

			UiSetObjMotifyMode('#txWorkTypeNo', 'R', '');
			UiSetObjMotifyMode('#dlProperty', 'R', '');

			UiSetObjMotifyMode('#txCaseNo', 'R', '');
		}
		else
		{
			//若為子文時則不允許修改業務類別及案號 子文時可以變更業務類別
			if (bIsChildDoc)
			{
				//子文時可以變更併案文號
				//1061212 David 1061250 併案文號欄位開放異動判斷透過共用函式處理
				//UiSetObjMotifyMode('#txComNo', 'W', '');
				UiComNoCtrl("W");
				UiSetObjMotifyMode('#dlProperty', 'R', '');
				UiSetObjMotifyMode('#txCaseNo', 'R', '');
			}
			else
			{
				//若非以上各項時以ODRPUI.XML設定為主 擴充O屬性完全開放主旨欄位
				if (gModifyMode == 'A' || gModifyMode == 'O') //可以修改
					EnableColumn('W');
				else  // 'L' 不能修改
					EnableColumn('R');
			}
		}
	}
	
	//(FDA客製化)新增當母文為人民申請時，不允許子文異動業務類別
	if(SSO_CONFIG.OrgNickName == 'FDA' && bIsChildDoc && $('#dlProperty option:selected').val() == '5')
	{
		UiSetObjMotifyMode('#dlWorkType,#txWorkTypeNo', 'R', '');
	}

	//1111123 David 1110881 配合銓敘部個人任審資訊，調整UI處理
	if(SSO_CONFIG.OrgNickName == 'MOCS')
	{
		if($('#dlProperty option:selected').val() != theSSO.User.SystemSets.get("MOCS_TA_DOC_PROPERTY"))
			UiSetObjMotifyMode('#btTAPerson', 'R', '');
		else
			UiSetObjMotifyMode('#btTAPerson', 'W', '');

		//1111202 David 1110835 新增銓敘部人民陳情辦理情形按鈕處理
		if($('#dlProperty option:selected').val() == "6")
			UiSetObjMotifyMode('#btMOCSPetition', 'W', '');
		else
			UiSetObjMotifyMode('#btMOCSPetition', 'R', '');
	}
}

function CheckLockSetting()
{
	//1061212 David 1061250 修正時效鎖定相關欄位處理
	/*var LockSetting = $('#txLockSetting').val();
	var LockRcvMonth = $('#txLockRcvMonth').val();
	var LockCloseMonth = $('#txLockCloseMonth').val();
	var LockTodoMonth = $('#txLockTodoMonth').val();
	var LockMsg = $('#txLockMsg').val();*/
	var LockSetting = _rsltODWDCM['LOCK_SETTING'];
	var LockRcvMonth = _rsltODWDCM['LOCKRCV_MONTH'];
	var LockCloseMonth = _rsltODWDCM['LOCKCLOSE_MONTH'];
	var LockTodoMonth = _rsltODWDCM['LOCKTODO_MONTH'];
	var LockMsg = _rsltODWDCM['LOCK_MSG'];

	if (LockSetting == 'Y') {
		if (LockRcvMonth != '' || LockCloseMonth != '' || LockTodoMonth != '') {
			UiSetObjMotifyMode('#txStartDate', 'R', LockMsg);
			UiSetObjMotifyMode('#dlProperty', 'R', LockMsg);
			UiSetObjMotifyMode('#dlWorkType', 'R', LockMsg);
			UiSetObjMotifyMode('#txWorkTypeNo', 'R', LockMsg);

			//案件編號欄位會影響DOC_PROPERTY以及B_TYPE_NO，所以也必須設定唯讀
			UiSetObjMotifyMode('#txCaseNo', 'R', LockMsg);
			UiSetObjMotifyMode('#ibtCaseNo', 'R', LockMsg);

			UiSetObjMotifyMode('#btEditCase', 'R', LockMsg);
			UiSetObjMotifyMode('#btNewCase', 'R', LockMsg);

			UiSetObjMotifyMode('#txComNo', 'R', LockMsg);
			UiSetObjMotifyMode('#txDeptShow', 'R', LockMsg);
			UiSetObjMotifyMode('#txSumTypeShow', 'R', LockMsg);
		}

		if (LockRcvMonth != '') {
			UiSetObjMotifyMode('#txRcvDate', 'R', LockMsg);
		}
		if (LockCloseMonth != '') {
			UiSetObjMotifyMode('#txRcvDate', 'R', LockMsg);
			UiSetObjMotifyMode('#txDueDate', 'R', LockMsg);
			UiSetObjMotifyMode('#cbNewByOu', 'R', LockMsg);
		}
		if (LockTodoMonth != '') {
			UiSetObjMotifyMode('#txDueDate', 'R', LockMsg);
			UiSetObjMotifyMode('#cbNewByOu', 'R', LockMsg);
		}
	}
}

function UiSetObjMotifyMode(objNames, argMode, argMsg)
{
	console.log('', objNames, argMode, argMsg);

	var arrobjName = objNames.split(',');

	for (i = 0 ; i < arrobjName.length ; i++)
	{
		var objName = arrobjName[i];

		if (!$(objName)[0])
		{
			console.log('設定物件 Null:', objName);
			return;
		}

		//(argMode == "R")
		var bDisabled = true;
		var strColor = 'LightGrey';
		var strClassName = 'DisplayOnly';
		var SelectDisable = 'disable';

		if (argMode == "W")
		{
			bDisabled = false;
			strColor = '';
			strClassName = '';
			SelectDisable = 'enable';
		}

		if (objName.indexOf('#tx') != -1)
		{
			$(objName)[0].readOnly = bDisabled;
			$(objName)[0].style.backgroundColor = strColor;
			$(objName)[0].title = argMsg;
			//樣式會變化 不可用
			//$(objName)[0].className = strClassName;
		}
		if (objName.indexOf('#cb') != -1)
		{
			$(objName)[0].readOnly = bDisabled;
			$(objName)[0].disabled = bDisabled;
			$(objName)[0].style.backgroundColor = strColor;
			//1081212 David 1080963 修正設定CheckBox、RadioButton，需refresh後UI呈現才會更新
			$(objName).checkboxradio("refresh");

			if(argMsg=="1")
				$(objName).prop("checked", true).checkboxradio("refresh");
			else if(argMsg=="0")
				$(objName).prop("checked", false).checkboxradio("refresh");
		}
		if (objName.indexOf('#dl') != -1 || objName.indexOf('#ddl') != -1)
		{
			$(objName).selectmenu(SelectDisable);
		}
		if (objName.indexOf('#rb') != -1)
		{
			$(objName)[0].disabled = bDisabled;
			$(objName)[0].style.backgroundColor = strColor;
			//1081212 David 1080963 修正設定CheckBox、RadioButton，需refresh後UI呈現才會更新
			$(objName).checkboxradio("refresh");
		}
		if(objName.indexOf('#combo') != -1)
		{
			$(objName)[0].disabled = bDisabled;
			$(objName)[0].style.backgroundColor = strColor;
		}
		if(objName.indexOf('#ibt') != -1)
		{
			$(objName)[0].disabled = bDisabled;
			//不需設定由各別IMG BUTTON控制
			//$(objName)[0].onclick = false;
		}
		if(objName.indexOf('#bt') != -1)
		{
			$(objName)[0].disabled = bDisabled;
			$(objName)[0].onclick = false;
		}
		// 把物件disable 
		//$('#txDocNo').attr('disabled', 'true').css('background', 'LightGrey').css('color', 'blue');
		// 把物件enable (移除disabled屬性)
		//$('.AreaDocNo').removeAttr('disabled');
		// 或是可以把屬性設定為'' 
		//$('.AreaDocNo').attr('disabled', '');
	}
}

function UiInitStaticDll()
{
	var OpDocTypes = {
		//1060307 David 修正本別選項內容同法規定義
		/*'1': '正本'
		, '2': '副本'
		, 'C': '定稿'*/
		'1': '正本'
		, '2': '副本'
		, '3': '抄本'
		, '4': '影本'
		, '5': '譯本'
		, 'A': '稿本'
		, 'B': '草稿'
		, 'C': '定稿'
		, 'D': '底圖'
		, 'E': '藍圖'
	};
	var OpDocSpds = {
		'1': '1.普通件'
		, '2': '2.速件'
		, '3': '3.最速件'
		, '4': '4.'
	};
	var OpDocSecs = {
		'1': ' '
		, '2': '密'
		, '3': '機密'
		, '4': '極機密'
		, '5': '絕對機密'
	};
	var OpDocComs = {
		'1': '併辦'
		, '2': '彙辦'
		, '3': '併案陳核'
	};
	var OpLtUoms = {
		'1': '天'
		, '2': '月'
	};
	var OpDocPropertys = {
		'1': '一般公文'
		, '2': '一般公文限期辦理'
		, '3': '專案管制'
		, '4': '立委質詢'
		, '5': '人民申請'
		, '6': '人民陳情'
		, '7': '訴願'
	};
	var OpApplyLimits = {
		'Y': '開放'
		, 'N': '不開放'
		, 'R': '限制開放'
	};
	var OpDSecConds = {
		list: [
			//1080211 David 1080042 調整解密條件選單內容
			//'本件於公布時解密'
			//, '本件至 年 月 日解密'
			//, '附件抽存後解密'
			'(本件至 年 月 日解密)'
			,'(本件於公布時解密)'
			,'(其他(其他特別條件或另行檢討後辦理解密))'
		]
	};
	var OpFileUnits = {
		'1': '頁'
		, '2': '件'
	};

	$('#dlDocType').empty();
	$('#dlDocType').append(new Option('', ''));
	$.each(OpDocTypes, function (val, text) { //
		$('#dlDocType').append(new Option(text, val));
	});
	$('#dlDocType').selectmenu('refresh');

	$('#dlSpd').empty();
	$.each(OpDocSpds, function (val, text) { //
		$('#dlSpd').append(new Option(text, val));
	});
	$('#dlSpd').selectmenu('refresh');

	$('#dlSec').empty();
	$.each(OpDocSecs, function (val, text) { //
		$('#dlSec').append(new Option(text, val));
	});
	$('#dlSec').selectmenu('refresh');

	$('#dlComType').empty();
	$('#dlComType').append(new Option('', ''));
	$.each(OpDocComs, function (val, text) { //
		$('#dlComType').append(new Option(text, val));
	});
	$('#dlComType').selectmenu('refresh');

	$('#dlLtUom').empty();
	$.each(OpLtUoms, function (val, text) { //
		$('#dlLtUom').append(new Option(text, val));
	});
	$('#dlLtUom').selectmenu('refresh');

	$('#dlProperty').empty();
	$.each(OpDocPropertys, function (val, text) { //
		$('#dlProperty').append(new Option(text, val));
	});
	$('#dlProperty').selectmenu('refresh');

	//1080927 David 1080339 jQuery升級3.4.1改寫語法
	//$("#dlWorkType").bind("change", function (event, ui) { //
	$("#dlWorkType").on("change", function (event, ui) { //
		ObjOnBlur(null, 'dlWorkType');
	});

	$('#dlApplyLimit').empty();
	$.each(OpApplyLimits, function (val, text) { //
		$('#dlApplyLimit').append(new Option(text, val));
	});
	$('#dlApplyLimit').selectmenu('refresh');

	$('#dlFileUnit').empty();
	$.each(OpFileUnits, function (val, text) { //
		$('#dlFileUnit').append(new Option(text, val));
	});
	$('#dlFileUnit').selectmenu('refresh');

	//1051214 David 1050780 新增會議型式選單欄位
	var OpMeetingType = {
		'0': '非開會通知單'
		, '1': '一般會議'
		, '2': '無紙化會議'
	};
	$('#dlMeetingType').empty();
	$.each(OpMeetingType, function (val, text) {
		$('#dlMeetingType').append(new Option(text, val));
	});
	$('#dlMeetingType').selectmenu('refresh');

	console.log('InitStaticDll done!');

	//1111220 David 調整解密條件初始邏輯
	//$("#comboDSecCond").mcombobox(OpDSecConds);
	thePublicRsrc.getDataXML(gObj.uOrgNo)
	.done(function(datDoc) {
		// 列舉解密條件或保密期限清單
		var $decOpts = $(datDoc.documentElement).find("data[type='解密條件或保密期限']");
		if($decOpts.length > 0 && $decOpts.find("代碼").length > 0) {
			theLogger.warn("DataXML已設定'解密條件或保密期限'資料代碼項目, 使用DataXML設定的選單項目");

			var DataSecCondList = [];
			$decOpts.find("代碼").each(function(){
			  DataSecCondList.push($(this).attr('value'));
			});
			let DataSecCondObj = {list:DataSecCondList};
			$("#comboDSecCond").mcombobox(DataSecCondObj);
		}
		else {
			theLogger.warn("無法取得DataXML, 解密條件依法規建議選項設定");
			$("#comboDSecCond").mcombobox(OpDSecConds);
		}
	})
	.fail(function() {
		theLogger.warn("無法取得DataXML, 解密條件依法規建議選項設定")
		$("#comboDSecCond").mcombobox(OpDSecConds);
	});
}

var _rsltODWMSG = null;
var _rsltODWDCM = null;

//讀取公文基資
function UiInitDocInfo() {
	/*
	//取得, 單一欄位
	var _msgId = theAOL.docObj.get('ODWMSG', 'MSG_ID');

	//取得, 複數欄位
	var _rslt = theAOL.docObj.get('ODWMSG', ['DOC_NO', 'SUBJECT', 'TO_OU_ID']); 
	var _subject = _rslt['SUBJECT']; 
	var _docNo 	 = _rslt['DOC_NO'];
	 */

	$('#txDocNo').val(_rsltODWMSG['DOC_NO']);
	$('#txRcvDate').val(_rsltODWDCM['RCV_DATE']);
	$('#cbNewByOu').prop("checked", _rsltODWMSG['NEW_BY_OU'] == "Y").checkboxradio("refresh");
	//1050715 David 取消回閱抄本
	/*$('#cbReSign').prop("checked", _rsltODWMSG['RE_SIGN'] == "Y")		// 2015.1.30 - Raymond added, for 回閱
		.bind("change", function() {theAOL.docObj.set('0', 'ODWMSG', [{fieldname:'RE_SIGN', value:(this.checked)?'Y':'N'}]);}).checkboxradio("refresh");
	$('#cbCopyReq').prop("checked", _rsltODWMSG['COPY_REQ'] == "Y")		// 2015.1.30 - Raymond added, for 抄本
		.bind("change", function() {theAOL.docObj.set('0', 'ODWMSG', [{fieldname:'COPY_REQ', value:(this.checked)?'Y':'N'}]);}).checkboxradio("refresh");*/
	
	//公文來源 DOC_SOURCE
	if(_rsltODWDCM['DOC_SOURCE'] == '')
		$('#txDocSource').val('正常公文');
	else if(_rsltODWDCM['DOC_SOURCE'] == '1')
		$('#txDocSource').val('上級機關交辦');
	else if(_rsltODWDCM['DOC_SOURCE'] == '2')
		$('#txDocSource').val('上級機關交議');
	else if(_rsltODWDCM['DOC_SOURCE'] == '3')
		$('#txDocSource').val('會銜');

	$('#txDocState').val(_rsltODWMSG['DOC_STATE']);
	$('#txStatus').val(fnShowDocStateDesc(_rsltODWMSG['DOC_STATE']));

	//顯示收文別
	if(_rsltODWDCM['RCV_TYPE'] == 'E')
		$('#txRcvType').val('電子交換');
	else if(_rsltODWDCM['RCV_TYPE'] =='M')
		$('#txRcvType').val('電子郵件');
	else if(_rsltODWDCM['RCV_TYPE'] =='P')
		$('#txRcvType').val('紙本');
		
	$('#txFromOrg').val(_rsltODWMSG['FROM_ORG']);
	$('#txFromEmail').val(_rsltODWDCM['MAIL_ADDR']);

	// 2016.5 - test jQuery upgrade.
	if (_rsltODWDCM['DOC_CATEGORY'].length)
	{
		UiSetDlItemByValue("dlDocCategory", _rsltODWDCM['DOC_CATEGORY']);
    }
	
	if($('#cbNewByOu')[0].checked)
	{
		//顯示本別 創稿 -> 一律顯示為 定稿
		UiSetDlItemByValue("dlDocType", "C");
	}
	else
	{
		UiSetDlItemByValue("dlDocType", _rsltODWDCM['FROMDOC_TYPE']);
	}

	UiSetDlItemByValue("dlSpd", _rsltODWMSG['SPEED']);

	UiSetDlItemByValue("dlSec", _rsltODWMSG["SECRETE"]);

	$('#txFromDate').val(_rsltODWDCM['FROMORG_DATE']);
	$('#txFromWord').val(_rsltODWDCM['FROM_NO_WORD']);
	$('#txFromNo').val(_rsltODWDCM['FROM_NO_NO']);
	$('#txSubject').val(_rsltODWMSG['FROM_SUBJECT']);
	$('#txInSubject').val(_rsltODWMSG['SUBJECT']);
	$('#txAppSubject').val(_rsltODWDCM['APP_SUBJECT']);
	$('#txOtherSubject').val(_rsltODWDCM['OTHER_SUBJECT']);
	$('#txDeptShow').val(_rsltODWMSG['IC_OU_NAME']);
	$('#txUser').val(_rsltODWDCM['EMP_NAME']);

	var sSubFolder = _rsltODWMSG['SUBFOLDER'];

	if (sSubFolder == "會辦待分辦" || sSubFolder == "受會" || sSubFolder == "會辦待送文") {
		var pOwnOu = _rsltODWMSG["OWN_OU_ID"];

		//$('#txCoDeptShow').val(document.all.IEControl.GetUnitNameOf(
		//		gObj.uOrgNo,
		//		_rsltODWMSG("OWN_OU_ID").substr(0,2)))
		$('#txCoUser').val(_rsltODWDCM['COWORK_M_USER_NAME']);
	}

	$('#txCaseNo').val(_rsltODWDCM['CASE_NO']);
	UiSetDlItemByValue("dlComType", _rsltODWDCM['COMBINE_TYPE']);
	//1061212 David 1061250 併案文號欄位開放異動判斷透過共用函式處理
	/*if($('#dlComType option:selected').val() != 0)
	{
		var sVal = $('#dlComType option:selected').val();
		if(sVal=="1" || sVal=="2")
		{
			UiSetObjMotifyMode("#txComNo", "R", "");
		}
	}*/
	UiComNoCtrl("");

	//如果公文性質未設定，則預設值為「一般公文」
	var strDocProperty = _rsltODWDCM['DOC_PROPERTY'];
	if(strDocProperty == "")
		strDocProperty = "2";
	UiSetDlItemByValue("dlProperty", strDocProperty);

	$('#txSumType').val(_rsltODWDCM['SUM_TYPE']);
	$('#txSumTypeShow').val($('#dlProperty option[value=' + _rsltODWDCM['SUM_TYPE'] + ']').text());

	$('#txKeyWord').val(_rsltODWDCM['KEY_WORD']);

	WsGetWorkTypeDll(_rsltODWDCM['DOC_PROPERTY']);
	UiSetDlItemByValue("dlWorkType", _rsltODWDCM['B_TYPE_NO']);
	$('#txWorkTypeNo').val($('#dlWorkType option:selected').val());

	UiSetDlItemByText("dlLtUom", _rsltODWDCM['LT_UOM']);

	$('#txLeadTime').val(_rsltODWDCM['LEAD_TIME']);
	$('#txStartDate').val(_rsltODWDCM['START_DATE']);
	$('#txMeetDate').val(_rsltODWMSG['MEET_DATE']);
	//1060110 David 將DUE_DATE資料改由ODWDCM內取得，避免因未重取待辦造成開啟公文帶出舊資料
	//$('#txDueDate').val(_rsltODWMSG['DUE_DATE']);
	$('#txDueDate').val(_rsltODWDCM['DUE_DATE']);

	//1090102 David 1090001 新增紀錄公文製作傳入的年度號
	if(_rsltODWMSG['FILE_YEAR'] != "")
		$('#txFileYear').val(_rsltODWMSG['FILE_YEAR']);
	$('#txClsNo').val(_rsltODWDCM['FILE_CLS']);
	$('#txFileCaseNo').val(_rsltODWDCM['FILE_CASE']);
	$('#txKeepYear').val(_rsltODWDCM['KEEP_YEAR']);
	$('#txDSecDate').val(_rsltODWDCM['EXTRMVSEC_DATE']);

	//1061228 David 如APPLY_LIMIT為空，依環境變數給予預設值
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

	$('#cbCom').prop("checked", _rsltODWDCM['MERGE'].toUpperCase()=='Y').checkboxradio("refresh");

	$('#comboDSecCond').val(_rsltODWDCM['EXTRMVSEC_COND']);
	$('#txFileCnt').val(_rsltODWDCM['FILE_CNT']);

	UiSetDlItemByText("dlFileUnit", _rsltODWDCM['FILE_UNIT']);

	$('#txAttach').val(_rsltODWDCM['ATTACH']);

	$('#txRcvFileCnt').val(_rsltODWMSG['RCVFILE_CNT']);
	$('#txIsRcvFile').val(_rsltODWMSG['IS_RCVFILE']);

	//1140725 David 1140784 新增是否紙本併同歸檔選單，調整紙本併同歸檔數量ENABLE邏輯
	/*if(_rsltODWMSG["IS_RCVFILE"] == "1")
		UiSetObjMotifyMode("#txRcvFileCnt", "W", "");
	else
		UiSetObjMotifyMode("#txRcvFileCnt", "R", "");*/
	if(gObj.uSignType == "E" && theAOL.docObj.ODWDCM.RCVSCAN_SYSID != "")
	{
		UiSetDlItemByValue("dlIsRcvFile", $('#txIsRcvFile').val());
		ObjOnBlur(null, "dlIsRcvFile");
	}
	else
	{
		UiSetObjMotifyMode("#txRcvFileCnt, #dlIsRcvFile", "R", "");
	}

	//1051214 David 1050780 新增會議型式選單欄位
	var strMeetingType = _rsltODWDCM['MEETING_TYPE'];
	if(strMeetingType == "")
		strMeetingType = "0";
	UiSetDlItemByValue("dlMeetingType", strMeetingType);

	//ODC011
	$('#txStoreType').val(_rsltODWMSG['STORE_TYPE']);
	$('#txApprovedDate').val(_rsltODWDCM['APPROVED_DATE']);
	$('#txCloseType').val(_rsltODWDCM['CLOSE_TYPE']);
	$('#txTranMark').val(_rsltODWMSG['TRAN_MARK']);
	$('#txAppUserName').val(_rsltODWMSG['APP_USER_NAME']);
	$('#txAppUserId').val(_rsltODWMSG['APP_USER_ID']);
	$('#txAppRoleId').val(_rsltODWMSG['APP_ROLE_ID']);
	$('#txRejectUserName').val(_rsltODWMSG['REJECT_USER_NAME']);
	$('#txCloseDate').val(_rsltODWDCM['CLOSE_DATE']);
	$('#txCaseCon').val(_rsltODWDCM['CASE_CON']);
	$('#txCloseF').val(_rsltODWDCM['CLOSE_F']);
	$('#txCancelAppEnable').val(_rsltODWDCM['CANCEL_APP_ENABLE']);
	$('#hNewTime').val(_rsltODWMSG['NEW_TIME']);
	//1111123 David 1110881 新增銓敘部客製化續辦處理
	if(SSO_CONFIG.OrgNickName == "MOCS")
		$('#txFurtherState').val(theAOL.docObj.ODWDCM.FURTHER_STATE);

	//1090914 David 1090557 新增信保欄位顯示處理
	if(SSO_CONFIG.OrgNickName == "SMEG")
	{
		$('#txClientCardNo').val(_rsltODWDCM['CLIENT_CARD_NO']);
		$('#txClientName').val(_rsltODWDCM['CLIENT_NAME']);
		$('#txTaxIdNo').val(_rsltODWDCM['TAX_ID_NO']);
		$('#txTaxIdName').val(_rsltODWDCM['TAX_ID_NAME']);
		$('#txManageBankNo').val(_rsltODWDCM['MANAGE_BANK_NO']);
		$('#txManageCaseNo').val(_rsltODWDCM['MANAGE_CASE_NO']);
		$('#txManageName').val(_rsltODWDCM['MANAGE_NAME']);
		$('#txBankCode').val(_rsltODWDCM['BANK_CODE']);
		$('#txBankName').val(_rsltODWDCM['BANK_NAME']);
		$('#txBankBranchCode').val(_rsltODWDCM['BANK_BRANCH_CODE']);
		$('#txBankBranchName').val(_rsltODWDCM['BANK_BRANCH_NAME']);
		if($('#txBankName').val() != "")
		{
			var strShowBankName = $('#txBankName').val();
			if($('#txBankBranchName').val() != "")
				strShowBankName += "-"+$('#txBankBranchName').val();
			
			$('#txShowBankName').val(strShowBankName);
		}
		$('#cbSmegDelay').prop("checked", _rsltODWDCM['SMEG_DELAY'] == "1").checkboxradio("refresh");
		
		//欄位Disable處理
		if($('#txClientCardNo').val() != "")
		{
			UiSetObjMotifyMode('#txTaxIdNo,#txManageBankNo,#txManageCaseNo', 'R', '');
		}
		else if($('#txManageBankNo').val() != "")
		{
			UiSetObjMotifyMode('#txClientCardNo,#txTaxIdNo,#txBankCode,#txBankBranchCode', 'R', '');
		}
	}

	console.log('Load Doc done');
}

function UiClearTimeFields()
{
	if (gObj.gFirstLoadPage)
		return;

	//清除時效統計相關欄位
	$('#txSumType').val("");
	$('#txSumTypeShow').val("");
	$('#txLeadTime').val("");
	$('#txSumType').val("");
	UiSetDlItemByValue("dlLtUom", "1");
	$('#txStartDate').val("");
	$('#txDueDate').val("");
}

//時效統計類別
function UiDisplaySumType() {
	if ($('#dlWorkType option:selected').val() == "") {
		$('#txSumType, #txSumTypeShow').val('');
		return;
	}

	//1060728 David 修正未加#之BUG
	//if ($('txCaseNo').val() != '') { //案件編號有值
	if ($('#txCaseNo').val() != '') { //案件編號有值
		if ($('#txDocNo').val() == $('#txComNo').val()) {
			$('#txSumType').val($('#dlProperty option:selected').val());
		}
	}
	$('#txSumTypeShow').val($('#dlProperty option[value=' + $('#txSumType').val() + ']').text());
}

function fnShowDocStateDesc(strDocState) {
	if (strDocState == "01")
		return "尚未辦畢";
	if (strDocState == "02")
		return "已銷號";
	if (strDocState == "09")
		return "已辦畢";
	if (strDocState == "10")
		return "已辦畢";
	if (strDocState == "13")
		return "已送檔待點收";
	if (strDocState == "20")
		return "已點收";
	if (strDocState == "25")
		return "已點收";
	if (strDocState == "30")
		return "已銷毀";
	if (strDocState == "35")
		return "提供文史機關使用";
	if (strDocState == "40")
		return "已移轉";
	if (strDocState == "50")
		return "已移交";
}

//避免JS檔重複載入
(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("MS-ODC010UI.js").finish();
})();

function fnDivControl(argType)
{
	if(argType != "btSignSet" && gObj.gPage == "ODC011" && !fnODC011Save())
	{
		return;
	}
	if(argType != "btCoSignSet" && gObj.gPage == "ODC013" && !fnODC013Save())
	{
		return;
	}
	if(argType != "btCoSignSet" && gObj.gPage == "ODC012" && !fnODC012Save())
	{
		return;
	}

	//1140319 David 1131053 新增增加附件筆數按鈕
	fnSetClassHide("AreaButtonAddAttach", true);

	/*
	//公文基資：AreaDocNo,AreaSubjectInfo,AreaState,AreaArchi,AreaDochr
	//附件：AreaDocAttach
	//併件資訊：AreaCoworkInfo
	//擬辦：AreaSignSet,AreaSignSethr,AreaMCase
	//會簽：AreaODC012,AreaODC013
	*/
	if (argType == "btDocInfo")
	{
		//初始化
		fnSetClassHide("AreaDocNo,AreaSubjectInfo,AreaState,AreaArchi,AreaDochr", false);
		fnSetClassHide("AreaDocAttach,AreaComInfo,AreaSignSet,AreaSignSethr,AreaMCase,AreaODC012,AreaODC013", true);
		//1090914 David 1090557 新增信保欄位處理
		if(SSO_CONFIG.OrgNickName == "SMEG")
			fnSetClassHide("AreaSmeg", false);

		if (gDisPlayMode == 'A')
		{
			fnSetClassHide("AreaSubject,AreaOwnId,AreaCoOwnId,AreaState,AreaArchi,AreaDochr", false);
		}
		else//if(gDisPlayMode=='L')
		{
			fnSetClassHide("AreaSubject,AreaOwnId,AreaCoOwnId,AreaState,AreaArchi,AreaDochr", true);
		}

		console.log('是否啟用欄位：', gModifyMode);

		//欄位可否編輯 擴充O屬性完全開放主旨欄位
		if (gModifyMode == 'A' || gModifyMode == 'O') //可以修改
			EnableColumn('W');
		else  // 'L' 不能修改
			EnableColumn('R');

		gObj.gPage = "ODC010";
	}
	if (argType == "btAttachInfo")
	{
		//1131211 David 1130983 修改依系統參數判斷是否開啟EDT150
		if(gObj.gEnableAttArchiveNote)
		{
			if(theAOL.docObj.docNo == "")
			{
				alert("請先取得公文號");
				return;
			}
			let sEDT150Url = SSO_CONFIG.ServerHost + "/ED/ED1/EDT150.aspx?nFrom=ODC010&DocNo="+theAOL.docObj.docNo;

			var $pane = $("div#ODC010_CLSNO_DIV");
			$.modal($pane, {
				containerCss: {width: "95%", height: "95%"},
				onShow: function() 
				{
					var $frame = $pane.find('iframe');
					if ($frame.length)
					{
						$pane.css("width", "95%").css("height", "95%");
						$frame.css("width", "98%").css("height", "95%");//iframe有預設border-width
						$frame[0].src = sEDT150Url;
					}
					$("div#ODC010_CLSNO_DIV")[0].style="width:100%; height:100%; position:absolute; left:0px; top:0px; z-index:0"
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
		else
		{
			fnSetClassHide("AreaDocNo,AreaSubjectInfo,AreaState,AreaArchi,AreaDochr", true);
			fnSetClassHide("AreaComInfo,AreaSignSet,AreaSignSethr,AreaMCase,AreaODC012,AreaODC013", true);
			fnSetClassHide("AreaDocAttach", false);
			//1090914 David 1090557 新增信保欄位處理
			if(SSO_CONFIG.OrgNickName == "SMEG")
				fnSetClassHide("AreaSmeg", true);
			
			//1140319 David 1131053 新增增加附件筆數按鈕
			fnSetClassHide("AreaButtonAddAttach", false);
			
		}
	}
	if (argType == "btComInfo")
	{
		fnSetClassHide("AreaDocNo,AreaSubjectInfo,AreaState,AreaArchi,AreaDochr", true);
		fnSetClassHide("AreaDocAttach,AreaSignSet,AreaSignSethr,AreaMCase,AreaODC012,AreaODC013",true);
		fnSetClassHide("AreaComInfo",false);
		//1090914 David 1090557 新增信保欄位處理
		if(SSO_CONFIG.OrgNickName == "SMEG")
			fnSetClassHide("AreaSmeg", true);
	}
	if (argType == "btSignSet")
	{
		fnSetClassHide("AreaDocNo,AreaSubjectInfo,AreaState,AreaArchi,AreaDochr", true);
		fnSetClassHide("AreaDocAttach,AreaComInfo,AreaODC012,AreaODC013", true);
		//1111229 David 銓敘部不使用公文系統案件管理，不需顯示案件設定區域
		if(SSO_CONFIG.OrgNickName == "MOCS")
			fnSetClassHide("AreaSignSet,AreaSignSethr", false);
		else
			fnSetClassHide("AreaSignSet,AreaSignSethr,AreaMCase", false);
		//1090914 David 1090557 新增信保欄位處理
		if(SSO_CONFIG.OrgNickName == "SMEG")
			fnSetClassHide("AreaSmeg", true);

		gObj.gPage = "ODC011";
		fnODC011Init();
	}
	if (argType == "btCoSignSet")
	{
		fnSetClassHide("AreaDocNo,AreaSubjectInfo,AreaState,AreaArchi,AreaDochr", true);
		fnSetClassHide("AreaDocAttach,AreaComInfo,AreaSignSet,AreaSignSethr,AreaMCase", true);
		//1090914 David 1090557 新增信保欄位處理
		if(SSO_CONFIG.OrgNickName == "SMEG")
			fnSetClassHide("AreaSmeg", true);

		if(gObj.gCoSignPage == "ODC012")
		{
			fnSetClassHide("AreaODC012", false);
			fnSetClassHide("AreaODC013", true);
			gObj.gPage = "ODC012";
			fnODC012Init();
		}
		else
		{
			fnSetClassHide("AreaODC012", true);
			fnSetClassHide("AreaODC013", false);
			gObj.gPage = "ODC013";
			fnODC013Init();
		}
	}
}

//取出併案文號的部份，並顯示於畫面上
function UiLoadWDCMComNo()
{
	console.log('UiLoadWDCMComNo() Start');

	$('#dlComNo').empty();
	$('#dlFromSubject').empty();
	$('#dlFromOrg').empty();
	$('#dlFromNo').empty();
	$('#dlFileNo').empty();
	$('#dlCombineType').empty();

	var NeedSetComInfo = false;
	if(typeof theAOL.getCurrFolio().ODC010SetComInfo == 'undefined')
	{
		theAOL.getCurrFolio().ODC010SetComInfo = [];
		NeedSetComInfo = true;
	}

	//1081122 David 1080986 紀錄所有併案公文簽核類型是否相同
	var bAllComSameSignType = true;
	var strPrevSignType = "";
	var ComNoObj = _rsltODWDCM['COM_NO'];
	for(var iComList = 0 ; iComList < ComNoObj.length ; iComList++)
	{
		var ComObj = ComNoObj[iComList];

		//1060526 David 1060426 判斷併案資訊節點存在才取值
		var ComDocNo="", ComSignType="", ComFromSubject="", ComFromOrgName="", ComFromNo="", ComCombineTypeValue="";
		var ComFileYear="", ComFileCls="", ComFileCase="", ComFileVol="", ComFileSeq="";

		if( ComObj.COM_DOC_NO != undefined) ComDocNo = ComObj.COM_DOC_NO;
		if( ComObj.SIGN_TYPE != undefined) ComSignType = ComObj.SIGN_TYPE;
		if( ComObj.FROM_SUBJECT != undefined) ComFromSubject = ComObj.FROM_SUBJECT;
		if( ComObj.FROMORG_NAME != undefined) ComFromOrgName = ComObj.FROMORG_NAME;
		if( ComObj.FROM_NO != undefined) ComFromNo = ComObj.FROM_NO;
		if( ComObj.COM_FILE_YEAR != undefined) ComFileYear = ComObj.COM_FILE_YEAR;
		if( ComObj.COM_FILE_CLS != undefined) ComFileCls = ComObj.COM_FILE_CLS;
		if( ComObj.COM_FILE_CASE != undefined) ComFileCase = ComObj.COM_FILE_CASE;
		if( ComObj.COM_FILE_VOL != undefined) ComFileVol = ComObj.COM_FILE_VOL;
		if( ComObj.COM_FILE_SEQ != undefined) ComFileSeq = ComObj.COM_FILE_SEQ;
		if( ComObj.COM_COMBINE_TYPE != undefined) ComCombineTypeValue = ComObj.COM_COMBINE_TYPE;

		//1060526 David 1060426 依判斷後的資料顯示
		/*if(iComList == 0) //第一筆塞到畫面上
		{
			$('#txComNo').val(ComObj.COM_DOC_NO);
		}
		$('#dlComNo').append(new Option(ComObj.COM_DOC_NO, ComObj.SIGN_TYPE));//COM_NO as Text, SIGN_TYPE as value
		$('#dlFromSubject').append(new Option(ComObj.FROM_SUBJECT, iComList));
		$('#dlFromOrg').append(new Option(ComObj.FROMORG_NAME, iComList));
		$('#dlFromNo').append(new Option(ComObj.FROM_NO, iComList));

		var ComFileNo	 = ComObj.COM_FILE_YEAR+"-"+ComObj.COM_FILE_CLS+"-"+ComObj.COM_FILE_CASE+"-"+ComObj.COM_FILE_VOL+"-"+ComObj.COM_FILE_SEQ;
		$('#dlFileNo').append(new Option(ComFileNo, iComList));

		var ComCombineType = "";
		if(jf_Trim(ComObj.COM_COMBINE_TYPE) == "1")
			ComCombineType = "併辦";
		if(jf_Trim(ComObj.COM_COMBINE_TYPE) == "2")
			ComCombineType = "彙辦";
		if(jf_Trim(ComObj.COM_COMBINE_TYPE) == "3")
			ComCombineType = "併案陳核";
		$('#dlCombineType').append(new Option(ComCombineType, iComList));

		if(NeedSetComInfo)
		{
			var ShowComObj = {
				COM_DOC_NO : ComObj.COM_DOC_NO,
				SIGN_TYPE : ComObj.SIGN_TYPE,
				COM_COMBINE_TYPE : ComCombineType,
				COM_FILE_CASE : ComObj.COM_FILE_CASE,
				COM_FILE_CLS : ComObj.COM_FILE_CLS,
				COM_FILE_SEQ : ComObj.COM_FILE_SEQ,
				COM_FILE_VOL : ComObj.COM_FILE_VOL,
				COM_FILE_YEAR : ComObj.COM_FILE_YEAR,
				FROMORG_NAME : ComObj.FROMORG_NAME,
				FROM_NO : ComObj.FROM_NO,
				FROM_SUBJECT : ComObj.FROM_SUBJECT,
			};

			theAOL.getCurrFolio().ODC010SetComInfo.push(ShowComObj);
		}*/
		if(iComList == 0) //第一筆塞到畫面上
		{
			$('#txComNo').val(ComDocNo);
		}
		$('#dlComNo').append(new Option(ComDocNo, ComSignType));//COM_NO as Text, SIGN_TYPE as value
		$('#dlFromSubject').append(new Option(ComFromSubject, iComList));
		$('#dlFromOrg').append(new Option(ComFromOrgName, iComList));
		$('#dlFromNo').append(new Option(ComFromNo, iComList));

		var ComFileNo = ComFileYear+"-"+ComFileCls+"-"+ComFileCase+"-"+ComFileVol+"-"+ComFileSeq;
		$('#dlFileNo').append(new Option(ComFileNo, iComList));

		var ComCombineType = "";
		if(jf_Trim(ComCombineTypeValue) == "1")
			ComCombineType = "併辦";
		if(jf_Trim(ComCombineTypeValue) == "2")
			ComCombineType = "彙辦";
		if(jf_Trim(ComCombineTypeValue) == "3")
			ComCombineType = "併案陳核";
		//1090506 David 1080867 value改紀錄公文的COMBINE_TYPE
		//$('#dlCombineType').append(new Option(ComCombineType, iComList));
		$('#dlCombineType').append(new Option(ComCombineType, ComCombineTypeValue));
		
		//1081122 David 1080986 與前筆比對簽核類型是否相同
		if(bAllComSameSignType && strPrevSignType != "" && strPrevSignType != ComSignType)
			bAllComSameSignType = false;

		//1081122 David 1080986 紀錄簽核類型
		strPrevSignType = ComSignType;

		if(NeedSetComInfo)
		{
			var ShowComObj = {
				COM_DOC_NO : ComDocNo,
				SIGN_TYPE : ComSignType,
				COM_COMBINE_TYPE : ComCombineType,
				COM_FILE_CASE : ComFileCase,
				COM_FILE_CLS : ComFileCls,
				COM_FILE_SEQ : ComFileSeq,
				COM_FILE_VOL : ComFileVol,
				COM_FILE_YEAR : ComFileYear,
				FROMORG_NAME : ComFromOrgName,
				FROM_NO : ComFromNo,
				FROM_SUBJECT : ComFromSubject,
			};

			theAOL.getCurrFolio().ODC010SetComInfo.push(ShowComObj);
		}
	}

	$('#dlComNo').selectmenu('refresh');
	$('#dlFromSubject').selectmenu('refresh');
	$('#dlFromOrg').selectmenu('refresh');
	$('#dlFromNo').selectmenu('refresh');
	$('#dlFileNo').selectmenu('refresh');
	$('#dlCombineType').selectmenu('refresh');

	//1101110 David 1101179 調整執行時機
	UiSetcbComEnable();

	//取COM_STATUS值以設定是否勾選併件選項
	if($('#txComNo').val() == "")
	{
		$('#cbCom').prop("checked", false).checkboxradio("refresh");

		//1061024 David 1060953 新增彙辦欄位處理
		UiSetObjMotifyMode('#cbCombineType2', 'R', '0');
	}
	else
	{
		//1081122 David 1080986 有1個不同簽核類型的併案公文，就不可彙辦
		if(!bAllComSameSignType)
			UiSetObjMotifyMode('#cbCombineType2', 'R', '0');

		//1081122 David 1080986 目前公文簽核類型與母文不同，不可併件、不可彙辦
		if($('#dlComNo')[0].options[0].value != gObj.uSignType)
		{
			UiSetObjMotifyMode('#cbCom', 'R', '0');
			UiSetObjMotifyMode('#cbCombineType2', 'R', '0');
		}
		else
		{
			if(_rsltODWDCM['COM_STATUS'] == "1")
				$('#cbCom').prop("checked", true).checkboxradio("refresh");
			else
				$('#cbCom').prop("checked", false).checkboxradio("refresh");

			//1081122 David 1080986 全併案公文相同簽核類型，才可彙辦
			if(bAllComSameSignType)
			{
				//1061024 David 1060953 新增彙辦欄位處理
				var strCombineType2 = _rsltODWDCM['COMBINE_TYPE_2'];
				if(strCombineType2 == "")
					strCombineType2 = "0";
				UiSetObjMotifyMode('#cbCombineType2', 'W', strCombineType2);
			}
		}
	}
	//1101110 David 1101179 調整執行時機
	//UiSetcbComEnable();

	//1061024 David 1060953 勾選彙辦時強制併件
	if($('#cbCombineType2')[0].checked)
		UiSetObjMotifyMode('#cbCom', 'R', '1');

	console.log('UiLoadWDCMComNo() End');
}

function UiGBCtrl()
{
	if(gObj.uSignType == "P")
	{
		//依環境變數設定是否顯示綠標立案功能鍵
		var ArrGBFolderList = theSSO.User.EnvSettings.get("OD_GB_FOLDER_LIST").split("|");//ex. Y|待處理+主辦待分辦;
		if (ArrGBFolderList[0].toUpperCase() == "Y")
		{
			var sGBFolderList = ArrGBFolderList[1];
			if(sGBFolderList.lastIndexOf(";") != (sGBFolderList.length-1))
				sGBFolderList += ";";

			var sCurrFolder = gObj.uFolder + "+" +  gObj.uSubFolder + ";";

			if(sGBFolderList.indexOf(sCurrFolder)!=-1)
			{
				var GBDeptList = theSSO.User.SystemSets.get("EDT610_DEPARTNO_NAME");

				//檢核是否為可承辦綠標公文的單位，若是才顯示功能鍵
				if (GBDeptList != "")
				{
					var ArrDeptList = GBDeptList.split("|");//ex. 12;食品組  16;醫療器材及化妝品組
					for(i = 0 ; i < ArrDeptList.length ; i++)
					{
						var ArrDept = ArrDeptList[i].split(';');						
						if ($('#txDeptShow').val() == ArrDept[1])
						{
							$('.AreaNewGBCase').show();
							fnSetGBClick();
							break;
						}
					}
				}
			}
		}
	}
}

function UiFileCaseCtrl()
{
	//依環境變數設定是否顯示案次號相關欄位
	if(gObj.gFileCaseDisplay != "Y")
		fnSetClassHide("FileCaseArea", true);
}

function UiButtonCtrl()
{
	var DocWebPage = gObj.gEDocWebPage;
	if(gObj.uSignType == "P")
		DocWebPage = gObj.gPDocWebPage;

	//擬辦設定
	if(DocWebPage.toUpperCase().indexOf("ODC002") == -1 && DocWebPage.toUpperCase().indexOf("ODC011") == -1 && DocWebPage.toUpperCase().indexOf("ODC005") == -1)
		fnSetClassHide("AreaButtonSignSet", true);
	else
		fnSetClassHide("AreaButtonSignSet", false);

	//會簽設定
	if(DocWebPage.toUpperCase().indexOf("ODC012") == -1 && DocWebPage.toUpperCase().indexOf("ODC013") == -1)
		fnSetClassHide("AreaButtonCoSignSet", true);
	else
	{
		fnSetClassHide("AreaButtonCoSignSet", false);
		if(DocWebPage.toUpperCase().indexOf("ODC012") != -1)
			gObj.gCoSignPage = "ODC012";
		else
			gObj.gCoSignPage = "ODC013";
	}
	
	//1140319 David 1131053 新增增加附件筆數按鈕，預設隱藏
	fnSetClassHide("AreaButtonAddAttach", true);

	if(gObj.uSignType == "P")
	{
		//併案資訊
		if(theSSO.User.EnvSettings.get("OD_IS_SHOW_COM_DETAIL").toUpperCase() != "Y")
			fnSetClassHide("AreaButtonComInfo", true);

		fnSetClassHide("AreaButtonAttachInfo", false);
	}
	else
	{
		fnSetClassHide("AreaButtonComInfo,AreaButtonAttachInfo", true);

		//1090928 David 1090559 信保開放附件頁面給線上簽核使用
		if(SSO_CONFIG.OrgNickName == "SMEG")
			fnSetClassHide("AreaButtonAttachInfo", false);
	}
}

function UiLoadComInfoToPage()
{
	if(typeof theAOL.getCurrFolio().ODC010SetComInfo != 'undefined')
	{
		var ComCount = theAOL.getCurrFolio().ODC010SetComInfo.length;
		for (i=0;i<ComCount;i++)
		{
			var iSeq = i+1;
			var oRow = $('#tbComInfo')[0].insertRow();
			if (((i+1)%2)==0)
			{
				oRow.style = "BACKGROUND-COLOR: #f7f7de";
			}
			else
			{
				oRow.style = "BACKGROUND-COLOR: #white";
			}

			var COM_DOC_NO = theAOL.getCurrFolio().ODC010SetComInfo[i].COM_DOC_NO;
			var SIGN_TYPE = theAOL.getCurrFolio().ODC010SetComInfo[i].SIGN_TYPE;
			var COM_COMBINE_TYPE = theAOL.getCurrFolio().ODC010SetComInfo[i].COM_COMBINE_TYPE;

			var COM_FILE_CASE = theAOL.getCurrFolio().ODC010SetComInfo[i].COM_FILE_CASE;
			var COM_FILE_CLS = theAOL.getCurrFolio().ODC010SetComInfo[i].COM_FILE_CLS;
			var COM_FILE_SEQ = theAOL.getCurrFolio().ODC010SetComInfo[i].COM_FILE_SEQ;
			var COM_FILE_VOL = theAOL.getCurrFolio().ODC010SetComInfo[i].COM_FILE_VOL;
			var COM_FILE_YEAR = theAOL.getCurrFolio().ODC010SetComInfo[i].COM_FILE_YEAR;
			var FILE_NO = COM_FILE_YEAR+"-"+COM_FILE_CLS+"-"+COM_FILE_CASE+"-"+COM_FILE_VOL+"-"+COM_FILE_SEQ;

			var FROMORG_NAME = theAOL.getCurrFolio().ODC010SetComInfo[i].FROMORG_NAME;
			var FROM_NO = theAOL.getCurrFolio().ODC010SetComInfo[i].FROM_NO;
			var FROM_SUBJECT = theAOL.getCurrFolio().ODC010SetComInfo[i].FROM_SUBJECT;

			oCell = oRow.insertCell();
			oCell.innerHTML = "<span id=\"dg2:_ctl"+(iSeq+1)+"lbSeq\">"+iSeq+"</span>";
			oCell.align = "center";
			oCell = oRow.insertCell();
			oCell.innerHTML = "<span id=\"dg2:_ctl"+(iSeq+1)+"lbDoc\">"+COM_DOC_NO+"</span>";
			oCell.align = "center";

			oCell = oRow.insertCell();
			oCell.innerHTML = "<span id=\"dg2:_ctl"+(iSeq+1)+"lbFileNo\">"+FILE_NO+"</span>";
			oCell.align = "center";
			oCell = oRow.insertCell();
			oCell.innerHTML = "<span id=\"dg2:_ctl"+(iSeq+1)+"lbCombineType\">"+COM_COMBINE_TYPE+"</span>";
			oCell.align = "center";

			oCell = oRow.insertCell();
			oCell.innerHTML = "<span id=\"dg2:_ctl"+(iSeq+1)+"lbDoc\">"+FROM_SUBJECT+"</span>";
			oCell.align = "center";
			oCell = oRow.insertCell();
			oCell.innerHTML = "<span id=\"dg2:_ctl"+(iSeq+1)+"lbDoc\">"+FROMORG_NAME+"</span>";
			oCell.align = "center";
			oCell = oRow.insertCell();
			oCell.innerHTML = "<span id=\"dg2:_ctl"+(iSeq+1)+"lbDoc\">"+FROM_NO+"</span>";
			oCell.align = "center";
		}
	}
}

function UifnBindAttach()
{
	console.log('UifnBindAttach() Start');

	//1101125 David 1101328 計量單位初始化
	InitAttachCntUnit();

	var strAttach = $("#txAttach").val();
	if(strAttach =="")
		return;

	var sArr = strAttach.split('@');

	for(var i=1;i<=sArr.length;i++)
	{
		//1140319 David 1131053 筆數超過10筆時，補上缺的列數
		if(i>10)
			fnAddAttachNewRow();

		fnBindOneAttach(
			sArr[i-1],
			"txAttaName" + i,
			"ddlRem" + i,
			"txCnt" + i,
			"ddlUnit" + i);
	}
	console.log('UifnBindAttach() end');
}

function fnBindOneAttach(strVal,argFileDesc,argDDLRem,argFileCnt,argDDLFileUnit)
{
	var sArr = strVal.split('*');
	$('#' + argFileDesc).val(sArr[0]);
	UiSetDlItemByValue(argDDLRem,sArr[1]);
	$('#' + argFileCnt).val(sArr[2]);
	UiSetDlItemByText(argDDLFileUnit,sArr[3]);
}

//1101125 David 1101328 計量單位初始化
function InitAttachCntUnit()
{
	//確認localStorage內是否已有資料，有資料不需重複取得
	
	var strAttachCntUnit = window.localStorage['AttachCntUnit'];
	if (typeof strAttachCntUnit === 'undefined'){

		var paramsGetAttachCntUnit = {
		"argArtifact": localStorage.Artifact
		};

		var _dfd = $.Deferred();
		g_QueryDeferred = _dfd;

		WsGetAttachCntUnit(paramsGetAttachCntUnit, _dfd)
		.pipe(function (rtn) {
			window.localStorage['AttachCntUnit'] = rtn;
			strAttachCntUnit = rtn;
		})
		.fail(function (rtn) {
			alert(rtn + "。系統以預設值處理")
		});
	}

	//無資料時依法規建議的預設值處理
	if(strAttachCntUnit == "")
		strAttachCntUnit = "頁;件;張;卷;幅;其他";
	
	//1120313		Cloud	1120203	弱掃修正Client DOM Stored XSS	
	strAttachCntUnit = htmlencode(strAttachCntUnit);

	//設定至畫面選單中
	var arrAttachCntUnit = strAttachCntUnit.split(';');
	for(var i = 1 ; i < 11 ; i++)
	{
		var strddlUnitId = "ddlUnit" + i;
		$('#' + strddlUnitId).append(new Option("", ""));
		for(var iUnit = 0 ; iUnit < arrAttachCntUnit.length ; iUnit++)
		{
			// 1120901 Leslie  1120709 弱掃修正Client DOM Stored XSS
			// $('#' + strddlUnitId).append(new Option(arrAttachCntUnit[iUnit], arrAttachCntUnit[iUnit]));
			// 1140801	Leslie[1141011]	弱掃修正[Client DOM Stored XSS]，試用套件消毒
			// $('#' + strddlUnitId).append(new Option(htmlencode(arrAttachCntUnit[iUnit]), htmlencode(arrAttachCntUnit[iUnit])));
			$('#' + strddlUnitId).append(new Option(DOMPurify.sanitize(arrAttachCntUnit[iUnit]), DOMPurify.sanitize(arrAttachCntUnit[iUnit])));	//留著，再不行用這個
		}
		$('#' + strddlUnitId).selectmenu('refresh');
	}
}

function UiSetDlItemByText(objNames, argText)
{
	var arrobjName = objNames.split(',');

	for (i = 0 ; i < arrobjName.length ; i++)
	{
		var objName = arrobjName[i];

		if (!$("#" + objName + "")[0])
		{
			console.log('設定物件 Null:', objName);
			continue;
		}
		var selectObj = $("select#" + objName + "");
		
		for(var i = 0 ; i < selectObj[0].length ; i++)
		{
			var SelectOption =  $("#" + objName + " option")[i];
			if(SelectOption.text == argText)
			{
				selectObj[0].selectedIndex = i;
				selectObj.selectmenu("refresh");
				break;
			}
		}
	}
}

function UiSetDlItemByValue(objNames, argValue)
{
	var arrobjName = objNames.split(',');

	for (i = 0 ; i < arrobjName.length ; i++)
	{
		var objName = arrobjName[i];

		if (!$("#" + objName + "")[0])
		{
			console.log('設定物件 Null:', objName);
			continue;
		}
		var selectObj = $("select#" + objName + "");
		selectObj[0].selectedIndex = -1;
		selectObj.selectmenu("refresh");
		
		for(var i = 0 ; i < selectObj[0].length ; i++)
		{
			var SelectOption =  $("#" + objName + " option")[i];
			if(SelectOption.value == argValue)
			{
				selectObj[0].selectedIndex = i;
				selectObj.selectmenu("refresh");
				break;
			}
		}
	}
}

function UiWidthCtrl()
{
	//密等
	$("#dlSec-button").css('height','1.4em');

	//文別
	$("#dlDocCategory-button").css('width','12em');

	//公文性質
	//1111123 David 1110881 配合銓敘部個人任審資訊，調整公文性質選單預設寬度
	//$("#dlProperty-button").css('width','6.5em').parent().css('width','6.5em');
	$("#dlProperty-button").css('width','18em').parent().css('width','18em');
	
	//併案情形
	$("#dlComType-button").css('width','4em');
	$("#dlComType-button").css('font','-webkit-small-control');
	
	//業務類別選單
	$("#dlWorkType-button").css('width','40em').parent().css('width','40em');
	
	//辦理期限單位
	$("#dlLtUom-button").css('width','2em');
	
	//ODC011
	//核決者類型選單
	$("#ddlAppType-button").css('width','5em');

	//原因註記選單
	$("#dlRemark-button").css('height','1.4em');
}

function fnSetClassHide(argTarget, argHide)
{
	var arrobjName = argTarget.split(',');

	for (i = 0 ; i < arrobjName.length ; i++)
	{
		var $objName = $("." + arrobjName[i] + "");

		if (!$objName[0])
		{
			console.log('設定物件 Null:', arrobjName[i]);
			continue;
		}

		if(argHide)
			$objName.hide();
		else
			$objName.show();
	}
}

//數字欄位設定
function fnODC010SetNumOnly()
{
	//解密期限
	SetNumOnly("txDSecDate");
	//限辦日期
	SetNumOnly("txDueDate");
	//起算日期
	SetNumOnly("txStartDate");
	//開會日期
	SetNumOnly("txMeetDate");
	//處理期限
	SetNumOnly("txLeadTime");
	//檔案數量
	SetNumOnly("txFileCnt");
	//紙本併同歸檔
	SetNumOnly("txRcvFileCnt");
	//附件頁籤數量欄位
	for(var iCnt = 1 ; iCnt < 11 ; iCnt++)
	{
		SetNumOnly("txCnt" + iCnt);
	}
	//1090914 David 1090557 信保欄位處理
	SetNumOnly("txClientCardNo");
	//1100514 David 支援英數，不限定數字
	//SetNumOnly("txTaxIdNo");
	SetNumOnly("txManageBankNo");
	SetNumOnly("txManageCaseNo");
	SetNumOnly("txBankCode");
	SetNumOnly("txBankBranchCode");
}

//數字欄位設定(參考Template_Util.js)
function SetNumOnly(argId)
{
	//1080927 David 1080339 jQuery升級3.4.1改寫語法
	//$(document).ready(function ()
	$(function ()
	{
		//1080927 David 1080339 jQuery升級3.4.1改寫語法
		//$("#" + argId).keydown(function (e)
		$("#" + argId).on("keydown", function (e)
		{
			if(e.keyCode == 229)
				return;	
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
				// Allow: Ctrl+A, Command+A
				(e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
				// Allow: home, end, left, right, down, up
				(e.keyCode >= 35 && e.keyCode <= 40)) {
				// let it happen, don't do anything
				return;
			}

			if ((e.shiftKey || (e.keyCode < 48 || (e.keyCode > 57 && e.keyCode != 189 && e.keyCode != 190)))
			&& (e.keyCode < 96 || e.keyCode > 105))
			{
				e.preventDefault();
			}
		});

		//1080927 David 1080339 jQuery升級3.4.1改寫語法
		//$("#" + argId).keyup(function (e)
		$("#" + argId).on("keyup", function (e)
		{
			if (/[^0-9\.-]/g.test(this.value))
			{
				this.value = this.value.replace(/[^0-9\.-]/g, '');
			}

			if (/-/g.test(this.value) && !/^-/g.test(this.value))
			{
				this.value = this.value.replace(/-/g, '');
			}
		});
	});
}

//1051214 David 1050780 新增客製化欄位處理
function UiCustomerCtrl()
{
	//1090914 David 1090557 新增信保欄位處理，預設隱藏
	fnSetClassHide("AreaSmeg", true);

	if(SSO_CONFIG.OrgNickName == "RRB")
	{
		fnSetClassHide("AreaMeetingType", false);
		
		//1061024 David 1060953 新增彙辦欄位處理
		fnSetClassHide("CombineType2Area", false);
	}
	else if(SSO_CONFIG.OrgNickName == "SMEG") //1090914 David 1090557 新增信保欄位處理
	{
		fnSetClassHide("AreaSmeg", false)
	}
	else if(SSO_CONFIG.OrgNickName == "EXAM")//1110330 David 1101477 新增考試院辦理情形按鈕處理
	{
		let ArrEXAMSTATODC010Set = theSSO.User.SystemSets.get("EXAMSTAT_ODC010_SET").split("|");//EX：10;11;14|主辦;主辦待送文|送總發文;歸檔
		if(ArrEXAMSTATODC010Set.length == 3)
		{
			let arrUseEXAMSTATOuId = ArrEXAMSTATODC010Set[0].split(";");
			let arrUseEXAMSTATFolder = ArrEXAMSTATODC010Set[1].split(";");
			let strDeptNo = _rsltODWMSG['INCHARGE_OU'];
			if(strDeptNo.length > 2)
				strDeptNo = strDeptNo.substr(0,2);

			//符合的單位及資料夾，才顯示按鈕
			if(arrUseEXAMSTATFolder.includes(gObj.uSubFolder) && arrUseEXAMSTATOuId.includes(strDeptNo))
			{
				$('.AreaEXAMEXSTAT').show();
				//設定開啟
				let strED_Site = theSSO.User.EnvSettings.get("WS_ED_SITE");
				let pUrl ="";
				if (strED_Site != "")
					//1110426 Kevin 1101477 各類案件辦理情形登錄作業新增文號
					//pUrl = AddUrlSlash(strED_Site) + "ED4/EDT4901_EXAM.aspx";
					pUrl = AddUrlSlash(strED_Site) + "ED4/EDT4901_EXAM.aspx?DocNo=" + $('#txDocNo').val();

				$("#btEXAMEXSTAT").attr("data-url", pUrl).on("click",function(evt)
				{
					var url = $("#btEXAMEXSTAT").attr("data-url");
					if(typeof url !== "undefined" && url.length)
						window.open(url);
					else
						alert("環境變數WS_ED_SITE未設定，無法開啟");
				});
			}
		}
	}
	else if(SSO_CONFIG.OrgNickName == "MOCS")//1111123 David 1110881 配合銓敘部個人任審資訊，調整UI處理
	{
		$('#tdProperty').attr('colspan', 3);
		$("#dlProperty-button").css('width','12em').parent().css('width','12em');
		$('#tdTAPerson').css('width','6em').show();
		
		//1111202 David 1110835 新增銓敘部人民陳情辦理情形按鈕處理
		if(!theAOL.docObj.isDraft)
		{
			let strOwnOuId = theAOL.docObj.ownOUId;
			if(strOwnOuId.length > 2)
				strOwnOuId = strOwnOuId.substr(0,2);
			let strInChargeOuId = theAOL.docObj.ICOUId;
			if(strInChargeOuId.length > 2)
				strInChargeOuId = strInChargeOuId.substr(0,2);

			if(strOwnOuId == strInChargeOuId)
				$('#divMOCSPetition').show();
		}

		//1111229 David 銓敘部不使用公文系統案件管理，不需顯示案件子視窗
		$("#ibtCaseNo").hide();
	}
	else if(SSO_CONFIG.OrgNickName == "TAITRA")//1141009 David 1141012 外貿客製化處理
	{
		//公文端不需分類案次號資訊
		fnSetClassHide("ClsArea", true);
		$("#txClsNo").val('');
		$("#txFileCaseNo").val('');
		$("#txKeepYear").val('');
	}

	//1120529 David 1120235 有設定併案文號顯示名稱時，依設定值顯示
	if(theSSO.User.SystemSets.get("ODC010_COMNO_TITLE") != "")
	{
		let strComnoTitle = theSSO.User.SystemSets.ODC010_COMNO_TITLE + "：";
		$('#tdComNo').html(strComnoTitle);
	}
}
//1061212 David 1061250 新增併案文號欄位處理共用函式
function UiComNoCtrl(argEnable)
{
	if(argEnable == "")
		argEnable = "W";

	//彙併辦不允許異動併案文號欄位
	var sComType = $('#dlComType option:selected').val();
	if (sComType == "1" || sComType == "2")
	{
		UiSetObjMotifyMode("#txComNo" , 'R', '');
		return;
	}
	
	//會核中主辦不可以修改母文號欄位
	var strFolderDiscuss = theSSO.User.EnvSettings.get("FOLDER_DISCUSS") != null ? theSSO.User.EnvSettings.get("FOLDER_DISCUSS") : "會核中";
	if(gObj.gOdDocPty5Mode == "1" && gObj.uFolder == strFolderDiscuss)
	{
		UiSetObjMotifyMode('#txComNo', 'R', '');
		return;
	}

	//併案陳核母文，如有子文資訊時，不允許異動併案文號欄位
	if(sComType == "3")
	{
		var ComNoObj = _rsltODWDCM['COM_NO'];
		if($('#txDocNo').val() != '' && $('#txComNo').val() != '' && $('#txDocNo').val() == $('#txComNo').val() && ComNoObj.length > 1)
		{
			UiSetObjMotifyMode('#txComNo', 'R', '');
			return;
		}
	}

	UiSetObjMotifyMode('#txComNo', argEnable, '');
}

//1140319 David 1131053 新增增加附件筆數按鈕處理
function fnAddAttachNewRow()
{
	let tbAttach = $(".AreaDocAttach"); // 取得表格
    let rowAttCount = tbAttach.find("tr").length; // 取得目前行數，計算新索引（含標題列）
	
	//取得第一筆的媒體形式及計量單位
	let ddlRemOptions = $("#ddlRem1 option").clone().removeAttr("selected");
	let ddlUnitOptions = $("#ddlUnit1 option").clone().removeAttr("selected");

    // 建立新的 <tr>，直接使用字串組合
    let newRow = $(`
        <tr style="BACKGROUND-COLOR: #f7f7de">
            <td><span id="dg1__ctl${rowAttCount}_lbSEQ_NO">${rowAttCount}</span></td>
            <td align="center">
                <input id="txAttaName${rowAttCount}" style="WIDTH: 400px; HEIGHT: 24px" maxLength="50">
            </td>
            <td align="center">
                <select data-mini="true" id="ddlRem${rowAttCount}" data-theme="c" style="width:80px">
                </select>
            </td>
            <td align="center">
                <input id="txCnt${rowAttCount}" style="WIDTH: 50px" maxLength="4" style="ime-mode:disabled;">
            </td>
            <td align="center">
                <select data-mini="true" id="ddlUnit${rowAttCount}" data-theme="c" style="width:80px">
                </select> 
            </td>
        </tr>
    `);
	
	//設定媒體形式及計量單位
	newRow.find("#ddlRem" + rowAttCount).append(ddlRemOptions);
	newRow.find("#ddlUnit" + rowAttCount).append(ddlUnitOptions);
	
	//設定數字欄位
	SetNumOnly("txCnt" + rowAttCount);

    // 插入新列到表格中
    tbAttach.append(newRow);

    //套用 JQM 樣式
    newRow.enhanceWithin();

    //手動刷新 <select> 下拉選單，確保 JQM 初始化
    newRow.find("select").selectmenu();
}