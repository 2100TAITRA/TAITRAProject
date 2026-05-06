// 受文者編輯子視窗功能模組(桌機版)
//	掛在nsEditor命名空間下 
//	
/*DATE 		SA		PG		MGR_NO		DESC	
  1050905	Cloud	Cloud	1050087		修正第一個受文者為需選擇時，發生異常的bug
  1050919	Cloud	Cloud	1050087		增加功能判斷theAOL.getCurrFolio().needSecControl，實做密件控管功能
  1050920	Cloud	Cloud	1050087		修正主持人、列席者、出席者寫入受文者時寫入錯誤資訊bug
  1050923	Cloud	Cloud	1050087		修正加入群組時，群組內受文者附件預設異常問題
										修改群組全銜顯示方式，文字僅保劉群組名稱，畫面顯示以名稱+群組代號顯示
  1050930	Cloud	Cloud	--			修正受文者差異子視窗問題
  1051006	Cloud	Cloud	--			修改開啟預設勾選多筆模式
  1051019	Cloud	Cloud	--			修正排序功能
  1051026	Cloud	Cloud	--			調整儲存檢核函式，改為物件可由受文者清單呼叫
  1051102	Leslie	Leslie	--			提供受文者輸入建立選單
  1051108	Cloud	Cloud	--			修正由畫面增加的受文者會被誤判不可使用電子交換bug及本別、發文方式、附件異動後直接離開不會提醒需儲存
  1051116	Cloud	Cloud	--			修正無括號點擊會異常問題
  1051121	Cloud	Cloud	--			配合匯出csv檔為big5，調整匯入時編碼預設big5
  1051206	Cloud	Cloud	--			重新設定序
  1051207	Cloud	Cloud	--			提供檢察功能
  1051208 	Cloud	Cloud	--			修正受文者群組切換本別時，不會異動底下受文者本別問題
  1051216 	Cloud	Cloud	--			修正未取得環境變數設定是否勾選保留姓名及正副本選項問題
  1051219   Cloud	Cloud	--			修正 更改群組正副本稱謂，異動整個底下受文者BUG
  1051227	Cloud	Cloud	--			調整匯入時，切割各資訊用的特殊符號
  1051229	Cloud	Cloud	--			odc010也使用了函式jf_DeptTrim()-調整此處的jf_DeptTrim()=>jf_DeptTrim()名稱
  1060104	Cloud	Cloud	--			修正批次檢核會異動群組本別資訊
  1060111	Cloud	Cloud	--			修正，匯入di受文者無法使用批次檢核帶回基資問題
  1060112	Cloud	Cloud	--			修正開會通知單主持、列席、出席附件預設錯誤問題
  1060117	Cloud	Cloud	1050376		姓名、正副本稱謂限制增加60字
  1060207	Cloud	Cloud	FDA-序2614	修正群組移動功能無作用BUG
  1060216	Cloud	Cloud	FDA-序2642	調整匯出CSV檔為UTF-8，修改程式碼，匯入時先以UTF-8讀入，如讀到亂碼再用BIG5讀
  1060327	Cloud	Cloud	1050802		受文者增加紀錄內部單位代碼TAG
  1060619	Cloud	Cloud	1060472		(國合會)依發文方式判斷檔案大小後自動勾選上傳至附件下載區
  1060620	Cloud	Cloud	1060147		(中興大學)增加匯入舊稿件時，自動檢核受文者正確性
  1060621	Cloud	Cloud	--			修正新增受文者後姓名欄位未清除問題
  1060626	Cloud	Cloud	1040289		(中興大學)內部字樣改為公佈欄
  1060809	Cloud	Cloud	1060716 	一併調整恢復匯入至一群組名稱預設值時機點
  1060919	Cloud	Cloud	1060871 	修正，群組更改正副本稱謂，不會同步更新至畫面問題
  1060919   Cloud	Cloud 	--			修正輸入別稱候選單不會自動展開問題
  1061003	Cloud	Cloud	1060856		修改預覽受文者列表異常錯誤訊息
  1061025	Cloud	Cloud	1060861		修改分割符號以DATA.XML提供設定，以免受文者名稱有分割符號
  1061101   Cloud   Cloud   --          修改GetDictInfo 查詢時，未加入OWNER條件，導致個人群組也會被不同帳號查出
  1061122	Cloud	Cloud	--			批次檢核時，增加判斷如群組的SYSID及群組代碼不為空白，且相等時改以名稱檢核
  1070205	Cloud	Cloud	NCKU107169	修正，選擇子視窗帶回後，群組受文者變成單一受文者問題
  1070507	Cloud	Cloud	--			修正加入時多筆受文者重複時，選擇子視窗不會消失問題
  1070529 	Cloud	Cloud	1070183		新增附件分繕功能
  1070724	Cloud	Cloud	1070704		修正重複受文者為人時，子視窗選擇異常問題
  1070806	Cloud	Cloud	1070685		新增受文者時，增加寫入附件下載區識別碼
  1070817   Kevin   Zen     1070678     弱掃XSS修正
  1070910	Cloud	Cloud	1070685		修正屬性判斷方式錯誤問題
  1070925	Cloud	Cloud	--			修正群組異動正副本稱謂時，不會儲存至全銜的bug
  1070926	Cloud	Cloud	--			修正，系統參數[OD_DISPATCH_ISSUE]設定啟用顯示無法電子交換原因時，檢核可否選擇電子交換時電郵應可視為可電子交換卻被阻擋問題參考單號(1030979)
  1071003	Cloud	Cloud	--			修正，for舊稿件，受文者僅有全銜，補上一代受文者編輯子視窗，開啟時增加檢核受文者是否有完整tag，如無則補齊
  1071109	Cloud	Cloud	1071112		修正匯入至一群組，受文者姓名消失問題，一併修正匯入姓名未取代正副本稱謂問題
  1071123	Cloud	Cloud	--			修正ie開啟時，預帶受文者無法顯示問題
  1071224	David	David	1071175		新增依電子交換現況判斷能否使用電子發文方式
  1080312	David	David	1080089		分繕表新增紀錄受文者全銜、姓名、編號資訊，調整程式邏輯
  1080315	David	David	1080221		修正加入群組受文者且展開時，含附件畫面資料錯誤問題
  1080517	David	David	1080407		調整內部電子公布欄畫面顯示由「內部」改為「公布欄」
  1080521	David	Zen		1080377		修正受文者編輯子視窗之受文者欄位輸入特定字元後無法儲存之問題
  1080605	David	Zen		1080458		修正受文者編輯子視窗新增群組受文者後正副本稱謂未同步更新至文面之問題
  1080903	Kevin	Joe		1080339		jQuery升級2.2.4
  1081003	David	David	1080869		修正附件分繕取得資訊語法，避免IE不支援造成異常
  1081008	Kevin	Joe		1080339		jQuery升級3.4.1
  1090219	David	Joe		1080764 	(Merge1070362)新增受文者時，如受文者不存在，跳出提醒視窗
  1090220	David	Joe		1080755		密件公文，不可選擇紙本發文以外方式
  1090318	David	David	1090089		新增新增高榮客製化讀入受文者列表後自動檢核邏輯，並補上依系統參數判斷是否執行功能至二代
  1090616	David	Joe		1080755		修正密件新增受文者發文方式為空白問題
  1090915	David	Joe		1090555		信保新增銀行代碼資訊
  1091007	David	David	-------		修正1080407一律改為公布欄，調整排除字樣設定，避免發文方式重複出現公布欄
  1100128	David	Joe		1090608		修正郵遞區號為6碼
  1100305	David	David	1090610		儲存前檢核效能調教
  1100329	David	David	1090844		1.新增合併群組、群組展開功能。2.匯入匯出新增支援群組
  1100506	Kevin	David	1100473		弱掃修正Client Potential XSS
  1100510	Kevin	David	1100221		支援jQuery3.5.1，調整jQuery.trim用法
  1100525	Leslie	David	1100495		移除受文者時，一併移除分繕資訊
  1100701	Raymond	Raymond	1090927		手機平板也改用受文者編輯子視窗, 判斷小螢幕時微調受文者編輯子視窗內受影響的欄位寬高, 以提供可拖拉顯示區域的功能
  1100922	Kevin	David	1100991		弱掃修正Client Potential XSS
  1100924	David	David	1090844		修正新增群組合併功能，造成下方列表受文者顯示被擋住問題
  1101119	David	David	1101333		修正批次檢核正副本稱謂處理後，資料還是為空時預設為受文者名稱
  1110223	David	David	1101455		新增「單位/ 人員」查詢視窗、個人受文者新增依別名帶入正副本稱謂
  1110225	David	David	1101481		新增個人專區發文方式、考試院客製化人工傳遞處理、發文方式UI調整
  1110322	David	Joe		1110216		新增匯入受文者依受文者檢核邏輯取得資料
  1110324	David	David	-------		修正動態選單產生方向，避免靠近畫面底部時選單被遮住
  1110517	David	David	1101455		(考試院現場反應)合併群組新增附件調整訊息通知
  1110519	David	David	1101481		修正啟用無法電子交換檢核異常問題，支援個人專區判斷
  1110804	David	Joe		--			修正稿件與受文者紙本發文方式記錄內容不同，導致判斷檢核無法正常生效的問題
  1110816	David	David	--			加入的受文者有別名時，帶入姓名欄位
  1110901	David	Joe		1110615		受文者編輯相關UI調整
  1111102	David	Joe		--			修正Tag名稱錯誤的問題
  1120104	David	Joe		1111415		修正預覽受文者無法正確取得TextArea的問題
  1120117	David	David	-------		(銓敘部問題彙整表序109)判斷如為批次檢核時，需傳入對應的受文者序，避免選擇視窗無法正確帶回內容
  1120418	David	David	-------		(銓敘部問題彙整表序235(現場問題回報序109))新增判斷稿件可否使用電子交換
  1120502	David	Joe		1120213		新增標檢局客製化正副本稱謂帶入邏輯
  1120626	David	Joe		序84		調整標檢局客製化欄位名稱
  1120815	David	Joe		1120245		調整資料顯示方式改以|區隔
  1120901 	Kevin	Leslie	1120709		弱掃修正Client DOM Stored XSS
  1120919	David	David	1120668		批次檢核完成後，受文者編號屬性資料需保留原本的編號，避免分繕表判斷異常
  1121121 	David	Joe 	序320		新增依參數判斷預設輸入模式
  1121213	David	Joe		1120743		調整當使用者依匯入資料為主時，提示訊息變更
  1130227	Joe		Joe		序43		修正參數漏傳導致受文者無法正確帶入的問題
  1130522	Joe		Joe		屏序602		修正自行輸入之受文者誤判為內部單位的問題
  1130813	Raymond	David	1130313		支援離線版調整程式邏輯
  1130906	Joe		Joe		序986		修正受文者編輯子視窗合併群組本別功能異常
  1140725	Joe		Joe		1140383		新增輸入前檢核正副本稱謂
  1140728	David	David	1140381		新增附件分繕異動旗標判斷處理
  1140814	Joe		Joe		1130366		調整onchange再執行異動
  1140908	David	David	1140873		個人專區發文方式新增判斷是否區分收發功能
  1141017	Joe		Joe		1140064		調整受文者欄位應顯示為正式名稱
  1141017	Joe		Joe		1141126		外貿增加傳真欄位
  1141110	David	David	1141112		海外發文支援外貿使用，調整文字
  1141229	David	David	1141432		1.新增外貿客製化欄位處理。2.新增外貿客製化匯入匯出格式。3.外貿不提供單筆修正視窗
  1150112	David	David	序19		修正外貿客製化欄位物件判斷，避免新增群組受文者異常
*/
var nsEditor = nsEditor||{};

// 取環境變數、系統參數
var docNoManual;
var strDLGUseTrace;//環境變數DLG_USETRACE是否啟用追蹤修訂功能
var strHasTB;
var gHasOs;
var strHasOutSideTB;//應已無用，暫保留 
var strOdSupportEmail;
var strWeUnitTitle;
var strOdTbConbine;
var strTbPasTeDays;
var strDlgAttachSizeSet;
var strWeCheckissue;
var strOdDispatchIssue;
var strOdOrgissueType;
var strOdTranScriptCheck;
var gWeViewDeleteGrp;
var bUsePersonal = false;//1110225 David 1101481 新增個人專區發文方式

//各全域變數
var strOrgNickName;
var activeDept;

var pSendType = ""
//各受文者發文方式&default
//1110225 David 1101481 調整發文方式選單處理邏輯
/*var DefaultsendWays = "<option value='郵寄'>郵寄</option><option value='人工傳遞'>人工傳遞</option><OPTION value='電子交換'>電子交換</OPTION>"
+"<OPTION value='電子郵件'>電子郵件</OPTION><OPTION value='內部電子公布欄'>內部電子公布欄</OPTION><OPTION value='海外發文'>海外發文</OPTION>";
var sendWays = DefaultsendWays;*/
var defaultIssueType = "郵寄";
//本別default
var gDefaultdocType = "";
var gGrpDeptNode = null;
//群組編輯子視窗開啟時，群組於受文者編輯子視窗的序
var indexOfGrp;
var gcolWidthsDept;//受文者編輯子視窗TITLE
var $list;
var gGrpBInit;//群組子視窗註冊事件判斷
var gModibInit;//修改子視窗註冊事件判斷
var oDocIssueTypeChange;//紀錄整份文前一次發文方式，用於判斷有切換過發文方式時，於受文者異動細項發文方式時重現細項選單
//發文方式按鈕顯示
//1110225 David 1101481 支援新增發文方式及發文方式UI調整，修改內容
/*//1080517 David 1080407 調整內部電子公布欄畫面顯示由「內部」改為「公布欄」
//var gIssueBt 		= new Array('人工'    ,'郵寄','電子'    ,'電郵'    ,'內部'          ,'海外');
var gIssueBt 		= new Array('人工'    ,'郵寄','電子'    ,'電郵'    ,'公布欄'        ,'海外');
//發文方式於XML儲存的資訊
var gIssueTypeSort 	= new Array('人工傳遞','郵寄','電子交換','電子郵件','內部電子公布欄','海外發文');
//發文方式的類型
var gIssueSendType 	= new Array('紙本'    ,'紙本','電子交換','電子交換','電子公布欄'    ,'電子交換');*/
//發文方式顯示
//1141110 David 1141112 調整參數初始值處理時機，避免使用擴充發文方式時選像異常
/*var gIssueBt 		= new Array('人工傳遞','郵寄','電子交換','電子郵件','公布欄'        ,'海外',    '個人專區');
//發文方式於XML儲存的資訊
var gIssueTypeSort 	= new Array('人工傳遞','郵寄','電子交換','電子郵件','內部電子公布欄','海外發文','個人專區');
//發文方式的類型
var gIssueSendType 	= new Array('紙本'    ,'紙本','電子交換','電子交換','電子公布欄'    ,'電子交換','電子交換');*/
var gIssueBt;
var gIssueTypeSort;
var gIssueSendType;

var gDocType = new Array("正本","副本","抄本");
var gDocTypeText = new Array("正本","副本","抄本");
var gIsAttch = new Array("是","否");
var gDispatchIssue = new Array(false,false,false,false);
var gDisableIssueBt = new Array();
var docType;
var qdocNo;
//匯入時使用的陣列
var DataInfo = new Array(6);
var gArOrgName = new Array();
var gArOrgFullName = new Array();
var gMultiOrgIdx = -1;
var gCopyNameTo = 2;
var gTakeFullName = 0; //預設不帶正式名稱
var gInclude = false;//判斷是否由匯入帶回
var gIncludeGrpName = "";//匯入至一群組值使用的受文者、正副本稱謂名稱
var gShearch = false;//判斷是否由查詢帶回
var gAddnew = false;//判斷是否為自行加入
var gGrpExpand = false;//判斷群組究竟要不要展開
var gCheckXmlindex = -1;//檢核受文者時xml的序
var gCheckPostNo = new Array(false,true,false);//預設郵遞區號檢查設定
var gCheckAddress = new Array(false,true,false);//預設地址檢查設定
var iSmeetDoc = false;
var gMuitDeptSeq;//受文者批次修正時，儲存的Arrylist
var gAddnewDept;
//1070507	Cloud	修正加入時多筆受文者重複時，選擇子視窗不會消失問題
var gAddnewEmp;
//是否正在執行自動切換公文發文方式
var bIsAutoChangeSendType = false;
var gErrorMessage = "";
//1140725	Joe		1140383		新增輸入前檢核正副本稱謂
var gIssueCheckMessage = "";
var gCheckDuplicte = "10";//同本別才警告且抄本不檢查同名時 交換代碼不檢查
var gTBCombine = false;
var gTbReSet = false;//判斷公告設定是否異動
//判斷是否通過儲存前的檢核
var bCkeckBeforeSave = true;
//公告相關設定節點
var objBulletin;
var gSymbol = "、";
var gChangeCnt = 0;
var gNeedSecControl;
var bHasSave;
var gEditSn="";//當前流程點代號
var gTraceInfo = new Array();//追蹤修訂啟用時，紀錄流程點及對應者的名稱
var gdm;
var gRegenTable;
var gCallByExit = false;//由離開觸發的儲存
var gXmlObj;
var gheight;
//1051019	Cloud 修正排序功能
/*排序設定*/
var gSort = new Array('正本','主持人','出席者','列席者','副本','抄本');
var gjf_SetSendType;
var searchTimeout;	//Leslie	動態查詢的Delay時間
//1051216 	Cloud	修正未取得環境變數設定是否勾選保留姓名及正副本選項問題
var gDlgKeepFullName;	
//1060620	Cloud	1060147		(中興大學)增加匯入舊稿件時，自動檢核受文者正確性
var gIsNcHuAutOcheck = false;
var gIsAskForcheck = false;
var gIsKeepAutOCheck = null;
//1060620	Cloud	1060147		(中興大學)增加匯入舊稿件時，自動檢核受文者正確性
//1070507	Cloud	修正加入時多筆受文者重複時，選擇子視窗不會消失問題
var gChooseBack = false;
var gChooseBackEnd = false;
//nsEditor.showReceiverSetting = function(dm, refreshView){	// dm為文稿物件, 2016.10.4 - Raymond, 新增refreshView參數
//1070529 	Cloud	1070183		新增附件分繕功能
var g_mailMerge;
var g_mailMergeCont=0;
//1080312 David 1080089 調整紀錄方式
//var g_mailMergeDept="";
//var g_arrmailMergeClearDept = new Array();
var g_mailMergeDept;
var gMailMergeModify = [];//紀錄要清除分繕附件資訊的分繕表的Index
//1070724	Cloud	1070704		修正重複受文者為人時，子視窗選擇異常問題
var gChooseEmpEndReSet;
//1070806	Cloud	1070685		新增受文者時，增加寫入附件下載區識別碼
var gDept_SeqNo=undefined;
var gDlid="";//用於紀錄新增不存在資料庫受文者時，透過自行取得識別碼，於受文者新增至稿件時寫入稿件
var gDLWork="";//用於紀錄新增不存在資料庫受文者時，透過自行取得識別碼，於受文者新增至稿件時寫入稿件
//1090219	Joe	1080764 	紀錄新增受文者不存在資料庫時處理
var gNoDbDataList="";
var gMailMergeDelete = [];//1100525 David 1100495 紀錄要刪除附件分繕的受文者
let gDraftType = "";//1120418 David 紀錄稿件文別(函類別、令類別)
let gNoElecDraftType = [];//1120418 David 紀錄不可使用電子交換發文的文別
//1140728 David 1140381 紀錄dm物件及是否有附件分繕設定
let gdmObj;
let ghasDispatchAtt = false;
//1141110 David 1141112 海外發文支援外貿使用，調整文字
var gOsIssueBtName = "海外";
var gOsIssueTypeSort = "海外發文";

nsEditor.showReceiverSetting = function(dm, refreshView,argAuto){	// dm為文稿物件, 2016.10.4 - Raymond, 新增refreshView參數

	docNoManual = theSSO.User.EnvSettings.get("OD_DOCNO_MANUAL");
	strDLGUseTrace= theSSO.User.EnvSettings.get("DLG_USETRACE");//環境變數DLG_USETRACE是否啟用追蹤修訂功能
	if(strDLGUseTrace=="")
		strDLGUseTrace ="N";
	strHasTB = theSSO.User.EnvSettings.get("HAS_TB");
	gHasOs = theSSO.User.EnvSettings.get("HAS_OS");
	strHasOutSideTB = theSSO.User.SystemSets.get("TB_HAS_OUTSIDE");//應已無用，暫保留 
	strOdSupportEmail = theSSO.User.SystemSets.get("OD_SUPPORT_EMAIL");
	if(strOdSupportEmail=="")
		strOdSupportEmail="N";
	strWeUnitTitle = theSSO.User.SystemSets.get("WE_UNITTITLE");
	strOdTbConbine = theSSO.User.SystemSets.get("OD_TB_COMBINE");
	strTbPasTeDays = theSSO.User.SystemSets.get("TB_PASTE_DAYS");
	strDlgAttachSizeSet = theSSO.User.SystemSets.get("DLG_ATTACH_SIZE_SET");
	strWeCheckissue = theSSO.User.SystemSets.get("WE_CHECKISSUE");
	strOdDispatchIssue = theSSO.User.SystemSets.get("OD_DISPATCH_ISSUE");
	strOdOrgissueType = theSSO.User.SystemSets.get("OD_ORGISSUE_TYPE");
	strOdTranScriptCheck = theSSO.User.SystemSets.get("OD_TRANSCRIPT_CHECK");
	gWeViewDeleteGrp = theSSO.User.SystemSets.get("WE_VIEWDELETEGRP");
	//1051216 	Cloud	修正未取得環境變數設定是否勾選保留姓名及正副本選項問題
	gDlgKeepFullName = theSSO.User.EnvSettings.get("DLG_KEEPFULLNAME");
	bUsePersonal = theSSO.User.SystemSets.get("USE_PERSONAL")=="Y";//1110225 David 1101481 新增個人專區發文方式
	//1140908 David 1140873 個人專區發文方式新增判斷是否區分收發功能
	if(bUsePersonal && theSSO.User.SystemSets.get("USE_PERSONAL_MODE") == "1")
		bUsePersonal = false;

	var that = this;
	bIsAutoChangeSendType = false;
	var rawXml = dm.accquireXml();	// rawXml原始XML文件從dm取得
	activeDept = $(rawXml.documentElement).find("> 受文者列表").clone();//受文者編輯子視窗異動的受文者清單
	objBulletin = $(rawXml.documentElement).find("> 公告設定").clone();//編輯子視窗異動的公告設定節點
	//1070806	Cloud	1070685		新增受文者時，增加寫入附件下載區識別碼-s
	gDept_SeqNo = activeDept.attr("編號");
	if(activeDept.attr("編號")==undefined || activeDept.attr("編號")=="")//無編號屬性
	{
		gDept_SeqNo = 1;
		activeDept.attr("編號","1");
	}
	else
		gDept_SeqNo = parseInt(activeDept.attr("編號"));

	//1130813 David 1130313 離線版不要啟用受文者識別碼功能
	//if(theSSO.User.EnvSettings.get("HAS_DL")=="1")
	if(theSSO.User.EnvSettings.get("HAS_DL")=="1" && (!theSSO || theSSO.offlineMode != true))
		gDLWork = $(rawXml.documentElement).attr("DLWork");
	//1070806	Cloud	107685		新增受文者時，增加寫入附件下載區識別碼-e
	//1070529 	Cloud	1070183		新增附件分繕功能
	g_mailMerge = dm.accquireMailMergeTable();	//取得目前已設定的分繕表
	g_mailMergeCont = g_mailMerge.count();//判斷是否有分繕表
	//1080312 David 1080089 調整邏輯
	//g_mailMergeDept="";
	//g_arrmailMergeClearDept = new Array();//紀錄要清除分繕表的受文者
	g_mailMergeDept = null;
	gMailMergeModify = [];
	gMailMergeDelete = [];//1100525 David 1100495 初始化

	//各全域變數
	gXmlObj = activeDept.get(0).ownerDocument;
	strOrgNickName = theUserInfo.OrgNickName;
	//1110225 David 1101481 已統一公布欄發文方式，無需客製化調整
	/*//1060626	Cloud	1040289		(中興大學)內部字樣改為公佈欄
	if(strOrgNickName=="NCHU")
		gIssueBt = new Array('人工'    ,'郵寄','電子'    ,'電郵'    ,'公布欄'          ,'海外');*/

	//1141110 David 1141112 調整參數初始值處理時機，避免使用擴充發文方式時選像異常
	gIssueBt		= new Array('人工傳遞','郵寄','電子交換','電子郵件','公布欄'        ,'海外',    '個人專區');
	gIssueTypeSort	= new Array('人工傳遞','郵寄','電子交換','電子郵件','內部電子公布欄','海外發文','個人專區');
	gIssueSendType	= new Array('紙本'    ,'紙本','電子交換','電子交換','電子公布欄'    ,'電子交換','電子交換');

	//1110225 David 1101481 考試院客製化人工傳遞處理
	if(strOrgNickName=="EXAM")
	{
		//調整人工傳遞顯示為機關間人工交換
		if(!gIssueBt.includes("機關間人工交換"))
		{
			gIssueBt.splice(0, 1, "機關間人工交換");
			gIssueTypeSort.splice(0, 1, "機關間人工交換");
		}

		//新增機關內函件傳遞
		if(!gIssueBt.includes("機關內函件傳遞"))
		{
			gIssueBt.splice(1, 0, "機關內函件傳遞");
			gIssueTypeSort.splice(1, 0, "機關內函件傳遞");
			gIssueSendType.splice(1, 0, "紙本");
		}
	}
	
	//1141110 David 1141112 海外發文支援外貿使用，調整文字
	if(strOrgNickName=="TAITRA")
	{
		gOsIssueBtName = "駐外";
		gOsIssueTypeSort = "駐外下載";

		//將'海外'替換為'駐外'
		gIssueBt[gIssueBt.indexOf('海外')] = gOsIssueBtName;
		gIssueTypeSort[gIssueTypeSort.indexOf('海外發文')] = gOsIssueTypeSort;
	}

	//1141021	Joe		1141126		調整發文細項、客製化發文方式提前取得
	GetOdOrgIssueTypeAndDispatchIssue();

	//各受文者發文方式&default
	//本別default
	gGrpDeptNode = null;
	//1050919	Cloud	1050087		增加功能判斷theAOL.getCurrFolio().needSecControl，實做密件控管功能
	gNeedSecControl = theAOL.getCurrFolio().needSecControl();
	
	if(rawXml.documentElement.tagName=="開會通知單" || rawXml.documentElement.tagName=="會勘通知單")
	{
		gDocType = new Array("主持","出席","列席","副本","抄本");
		gDocTypeText = new Array("主持人","出席者","列席者","副本","抄本");
		iSmeetDoc = true;
		//ChangeDocTypeSelectList("Dept_dlDocType");
	}
	else
	{
		gDocType = new Array("正本","副本","抄本");
		gDocTypeText = new Array("正本","副本","抄本");
		iSmeetDoc = false;
	}
	qdocNo = $(rawXml.documentElement).find("公文文號").text();

	//公佈欄相關設定
	if(strOdTbConbine!="" && strOdTbConbine=="Y")
		gTBCombine = true;

	if(strTbPasTeDays=="")
		strTbPasTeDays = "10";

	//群組編輯子視窗開啟時，群組於受文者編輯子視窗的序
	//1060620	Cloud	[1060147]	(中興大學)增加匯入舊稿件時，自動檢核受文者正確性-非中興自動開啟即關閉
	gIsNcHuAutOcheck = false;
	gIsAskForcheck = false;
	gIsKeepAutOCheck = null;
	//1090219	Joe	1080764 	紀錄新增受文者不存在資料庫時處理
	gNoDbDataList="";
	gDraftType = dm.getDocType();//1120418 David 紀錄稿件文別(函類別、令類別)
	if(gDraftType == "函" || gDraftType == "令")
		gDraftType == dm.getSubDocType();
	gNoElecDraftType = theSSO.User.SystemSets.get("NOELEC_DRAFT_TYPE").split('|');//1120418 David 紀錄不可使用電子交換方式的文別
	//1140728 David 1140381 紀錄dm物件及是否有附件分繕設定
	gdmObj = dm;
	ghasDispatchAtt = dm.accquireMailMergeTable().hasDispatchAtt();//1140728 David 1140381 紀錄是否有附件分繕設定

	// 載入子視窗
	Util.getDlg("MS-Dept.html").done(function($dlg) 
	{
		gGrpBInit = false;
		gModibInit = false;
		gChangeCnt = 0;
		bHasSave = false;
		gAddnew = false;
		//gdm = dm;//稿件物件
		gdm = $(dm.accquireXml().documentElement);//稿件物件
					
		if(docNoManual) 
		{
		}
		else 
		{
		}
		//
		//========================================受文者編輯子視窗區========================================/
		// 綁定按鈕
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_btSave").click(function() 
		$dlg.find("#Dept_btSave").on("click", function() 
		{
			if(fncheckBeforeSave() && bCkeckBeforeSave)
			{		
				var bCheckSave = false;
				if(activeDept.find("受文者").length==0)
				{
					if(window.confirm("無任何受文者，是否儲存？"))
					{
						bCheckSave = true;
					}
				}
				else
					bCheckSave = true;
				//1140725	Joe		1140383		新增輸入前檢核
				if(gIssueCheckMessage != "" && theUserInfo.OrgNickName == "HAC")
					bCheckSave = window.confirm("您序" + gIssueCheckMessage + "的「受文者」與「正副本稱謂」不一致，請確認是否儲存。「正副本稱謂」僅是稿面呈現的文字。");
				gIssueCheckMessage = "";
				if(bCheckSave)
				{
					//受文者編輯子視窗新增的受文者會有<電子交換現況></電子交換現況>TAG減少原函式fnChkIsAnyCanEIssue呼叫WS行為-先移除再寫回稿件
					//1071224 David 1071175 保留<電子交換現況>欄位
					//activeDept.find("電子交換現況").remove();
					
					if(gTBCombine)
						SetBulletinSetting();

					PutIsSecret();
					//1070529 Cloud 1070183 清除異動過是否含附件受文者的分繕表
					//1080312 David 1080089 調整異動分繕表邏輯
					/*for(var arrDpet = 0 ; arrDpet < g_arrmailMergeClearDept.length ; arrDpet++)
					{
						var AttDescIndex = g_mailMerge.find("受文者",g_arrmailMergeClearDept[arrDpet]);
						if(AttDescIndex!=-1)
							g_mailMerge.clearAtt(AttDescIndex);
					}*/
					if(gMailMergeModify.length > 0)
					{
						for(var iModify = 0 ; iModify < gMailMergeModify.length ; iModify++)
						{
							if(gMailMergeModify[iModify].Type == "1")
							{
								g_mailMerge.clearAtt(gMailMergeModify[iModify].MailMergeIndex);
							}					
							else
							{
								//依編號取得全銜及姓名
								var DeptName = activeDept.find("受文者[編號='"+gMailMergeModify[iModify].DeptSeqNo+"']").find("全銜").text();
								var DeptFullName = activeDept.find("受文者[編號='"+gMailMergeModify[iModify].DeptSeqNo+"']").find("正式名稱").text();
								var DeptEmpName = activeDept.find("受文者[編號='"+gMailMergeModify[iModify].DeptSeqNo+"']").find("姓名").text();
								var ChangeObj = {
									"fullName": DeptFullName//正式名稱
									,"name": DeptName//全銜
									,"userName": DeptEmpName//姓名
								}
								g_mailMerge.set2(gMailMergeModify[iModify].MailMergeIndex, ChangeObj);
							}
						}
						//1100525 David 1100495 儲存完成後，清空物件
						gMailMergeModify = [];
					}

					//1100525 David 1100495 刪除附件分繕資訊
					if(gMailMergeDelete.length > 0)
					{
						for(var iDelete = 0 ; iDelete < gMailMergeDelete.length ; iDelete++)
						{
							var HasIndex = g_mailMerge.find2("受文者", gMailMergeDelete[iDelete]);
							if(HasIndex != -1)
								g_mailMerge.del(HasIndex);
						}
						//處理完成後，清空物件
						gMailMergeDelete = [];
					}

					$(rawXml.documentElement).find("> 受文者列表").replaceWith(activeDept);
					
					alert('儲存完畢');
					// 叫用全域選取器的refresh重新整理受文者項目
					//window.tokenSelector.refresh();
					// 2016.10.4 - Raymond, 叫用refreshView callback更新畫面
					if($.isFunction(refreshView))
						refreshView();
					bHasSave = true;
					//1070806 Cloud 1070685 新增紀錄稿件所用流水號
					activeDept.attr("編號",gDept_SeqNo);
					if(gCallByExit)//由離開觸發則關閉視窗
					{
						$.modal.close();
						//1140728 David 1140381 關閉視窗時，呼叫是否顯示附件管理子視窗方法
						nsEditor.checkHasDispatchAttAndChanged(gdmObj);
					}
				}
			}
			else
			{
				if(gErrorMessage!="")
					alert('發生錯誤，無法儲存！\n\r'+gErrorMessage);
				//1140725	Joe		1140383		新增輸入前檢核正副本稱謂
				gIssueCheckMessage = "";
			}
		});
		//離開
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_btExit").click(function() 
		$dlg.find("#Dept_btExit").on("click", function() 
		{
			//1060619	Cloud	[1060472]	(國合會)依發文方式判斷檔案大小後自動勾選上傳至附件下載區
			if(strOrgNickName=="ICDF")
			{
				fnCheckUpLoad("CLOSE");
				//1140728 David 1140381 關閉視窗時，呼叫是否顯示附件管理子視窗方法
				nsEditor.checkHasDispatchAttAndChanged(gdmObj);
			}
			else
			{
				if(gChangeCnt!=0 && !bHasSave)
				{
					if(window.confirm("受文者資訊已經變動，您是否要儲存更動？"))
					{
						gCallByExit = true;
						//1081008	Joe		1080339		jQuery升級3.4.1
						// $("#Dept_btSave").click();
						$("#Dept_btSave").trigger("click");
					}
					else
						$.modal.close();
				}
				else
				{
					$.modal.close();
					//1140728 David 1140381 關閉視窗時，呼叫是否顯示附件管理子視窗方法
					nsEditor.checkHasDispatchAttAndChanged(gdmObj);
				}
			}

		});
		//******************欄位ENVENT觸發事件區*******************//
		//預覽受文者清單
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_btPrint").click(function() 
		$dlg.find("#Dept_btPrint").on("click", function() 
		{
			fnPrintDeptList();
		}
		);
		//本文發文方式
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_dlSendType").change(function() 
		$dlg.find("#Dept_dlSendType").on("change", function() 
		{
			dlSendTypeOnChange();
			pSendType = $("#Dept_dlSendType option:selected").val();
			if(pSendType=="紙本公文")
				gDisableIssueBt.push("電子");
			else
				gDisableIssueBt.push("");
		}
		);
		//本別選單
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_dlDocType").change(function() 
		$dlg.find("#Dept_dlDocType").on("change", function() 
		{
			gDefaultdocType = $("#Dept_dlDocType option:selected").val();
		}
		);
		
		//畫面受文者及正副本稱謂用的連動
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_txOrgName").blur(function() 
		//1140814	Joe		1130366		調整onchange再執行異動
		// $dlg.find("#Dept_txOrgName").on("blur", function() 
		$dlg.find("#Dept_txOrgName").on("change", function() 
		{
			fnTxOrgNameOnblur('Dept_txOrgName');
		}
		);
		//1051108 Leslie	受文者增加選單功能
		$dlg.find("#Dept_txOrgName").on("input",function() 
		{
			if($(this).prop('comStart')) return;	//中文輸入未完成時，不做查詢
			if( $(this).val()=="" || $(this).val().length < 2 )
				return;
			clearTimeout(searchTimeout);
			var that = this;
			searchTimeout = setTimeout(function(){
			var params = new SOAPClientParameters();
				params.add('argOrgNo', theUserInfo.OrgID);
				params.add('argQueryString', $("#Dept_txOrgName").val());
				//1061101   Cloud   修改GetDictInfo 查詢時，未加入OWNER條件，導致個人群組也會被不同帳號查出
				params.add('argOwner', theUserInfo.UserID);
				theLogger.log("搜尋["+$(that).val()+"]");
				SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetDictInfo", params ,true, 
				function(r)
					{
						//1090914	Joe		1090555		修正排序處理方式，於Server端組好排序
						// theLogger.log("取得資料："+r.value.OrgName.length+","+r.value.OrgNo.length+","+r.value.SysId.length+"。");
						theLogger.log("取得資料："+r.value.OrgInfo.length + "。");
						theLogger.log(r.value);
						var availabelTags = new Array();
						var strTemp = $("#Dept_txOrgName").val();
						//1060919   Cloud	修正輸入別稱候選單不會自動展開問題
						//1090914	Joe		1090555		修正排序處理方式
						// var bNick = false;
						for(var vl in r.value){
							//1090914	Joe		1090555		修正排序處理方式，於Server端組好排序--S
							// if(vl=="Alias")
								// bNick = true;
							//1090914	Joe		1090555		修正排序處理方式，於Server端組好排序--E
							var vlObj = r.value[vl];
							//1081008	Joe		1080339		jQuery升級3.4.1
							// if($.type(vlObj) == "array"){
							if(Array.isArray(vlObj)){
								for(var i=0,o;o=vlObj[i];i++){
									//1090914	Joe		1090555		修正排序處理方式，於Server端組好排序--S
									if(strOrgNickName == "SMEG" && o.Type == "SysId" && o.sys.length == 7){
										//1120815	Joe		1120245		調整資料顯示方式改以|區隔
										// availabelTags.push(o.v + "（"+o.sys+"）");
										availabelTags.push(o.v + "｜"+o.sys);
									}
									else if(o.Type != "Alias"){
										if(o.orgno && jf_DeptTrim(o.orgno)!= "")
											//1120815	Joe		1120245		調整資料顯示方式改以|區隔
											// availabelTags.push(o.v+"（"+o.orgno+"）");
											availabelTags.push(o.v+"｜"+o.orgno);
										else
											availabelTags.push(o.v);
									}
									else
										//1120815	Joe		1120245		調整資料顯示方式改以|區隔
										// availabelTags.push(o.v+"（"+o.alias+"）");
										availabelTags.push(o.v+"｜"+o.alias);
									/*
									// if(!bNick){
										if(o.orgno && jf_DeptTrim(o.orgno)!= "")
											//1051118 Cloud 有些名稱會使用半型括號改為使用全型括號
											//availabelTags.push(o.v+"("+o.orgno+")");
											availabelTags.push(o.v+"（"+o.orgno+"）");
										else
											availabelTags.push(o.v);
									}
									else
										availabelTags.push(o.v+"（"+o.alias+"）");
									*/
									//1090914	Joe		1090555		修正排序處理方式，於Server端組好排序--E
								}
								//1090914	Joe		1090555		修正排序處理方式，於Server端組好排序
								// bNick = false;
							}
						}
						$dlg.find("#Dept_txOrgName").autocomplete({
							source:availabelTags,
							appendTo:"#areaSearch",
							select: function(event,ui){
								//1051116	Cloud	修正無括號點擊會異常問題
								//ui.item.value = ui.item.value.substr(0,ui.item.value.lastIndexOf("("));
								//1051118 Cloud 有些名稱會使用半型括號改為使用全型括號
								//if(ui.item.value.lastIndexOf("(")!=-1)
									//ui.item.value = ui.item.value.substr(0,ui.item.value.lastIndexOf("("));
								//1120815	Joe		1120245		調整資料顯示方式改以|區隔
								// if(ui.item.value.lastIndexOf("（")!=-1)
									// ui.item.value = ui.item.value.substr(0,ui.item.value.lastIndexOf("（"));
								if(ui.item.value.lastIndexOf("｜")!=-1)
									ui.item.value = ui.item.value.substr(0,ui.item.value.lastIndexOf("｜"));
								else
									ui.item.value = ui.item.value;
							}
						}).autocomplete( "search", strTemp );
					}
				)
			},300);	//TimeOut時間
		}).on('compositionstart', function(){
			$(this).prop('comStart', true);
			console.log('中文輸入，start');
		}).on('compositionend', function(){
			$(this).prop('comStart', false);
			console.log('中文輸入，end');
			$(this).trigger("input");
		});
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_txEmpName").blur(function() 
		$dlg.find("#Dept_txEmpName").on("blur", function() 
		{
			fnTxOrgNameOnblur('Dept_txEmpName');
		}
		);
		/*$dlg.find("#Dept_txOrgName").keydown(function(e) 
		{
			if(e.keyCode==115)
			{
				$("input#Dept_txOrgName").blur();
				fnAddnew("New");
			}
		}
		);
		$dlg.find("#Dept_txEmpName").keydown(function(e) 
		{
			if(e.keyCode==115)
			{
				$("input#Dept_txEmpName").blur();
				fnAddnew("New");
			}
		}
		);
		$dlg.find("#Dept_txOrgFullName").keydown(function(e) 
		{
			if(e.keyCode==115)
				fnAddnew("New");
		}
		);*/
		
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.keydown(function(event)
		$dlg.on("keydown",function(event)
		{
			if(event.keyCode == 113) //F2常用查詢-F1在瀏覽器有其他作用...
				fnOpenWem010C1();
			else if (event.keyCode == 120) //改成F9加入...F4 IE有作用F5~F7都有 F10~F12要DEBUG...
			{
				//1081008	Joe		1080339		jQuery升級3.4.1
				// $("input#Dept_txEmpName").blur();
				$("input#Dept_txEmpName").trigger("blur");
				fnAddnew("New");				
			}
		});
		//*****************欄位ENVENT觸發事件區********************//
		//*********************各按鈕功能區************************//
		//新增受文者
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_btAddNew").click(function() 
		$dlg.find("#Dept_btAddNew").on("click", function() 
		{
			fnAddnew("New");
		});
		//分隔字元
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_btSymbol").click(function() 
		$dlg.find("#Dept_btSymbol").on("click", function() 
		{
			if($("#Dept_txOrgName").val()!="")
			{
				$("#Dept_txOrgName").val($("#Dept_txOrgName").val()+gSymbol);
			}
		});

		//匯入至一群組checkbox
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_cbAutoGroupdiv").click(function() {
		$dlg.find("#Dept_cbAutoGroupdiv").on("click", function() {
			if($("input#Dept_cbAutoGroup").prop("checked"))
				$("input#Dept_cbAutoGroup").prop("checked",false);
			else
				$("input#Dept_cbAutoGroup").prop("checked",true);
		});
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("input#Dept_cbAutoGroup").click(function() {
		$dlg.find("input#Dept_cbAutoGroup").on("click", function() {
			if($("input#Dept_cbAutoGroup").prop("checked"))
				$("input#Dept_cbAutoGroup").prop("checked",false);
			else
				$("input#Dept_cbAutoGroup").prop("checked",true);
		});
		//群組展開的checkbox
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_divcbExpGroup").click(function() {
		$dlg.find("#Dept_divcbExpGroup").on("click", function() {
			if($("input#Dept_cbExpGroup").prop("checked"))
				$("input#Dept_cbExpGroup").prop("checked",false);
			else
				$("input#Dept_cbExpGroup").prop("checked",true);
		});
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("input#Dept_cbExpGroup").click(function() {
		$dlg.find("input#Dept_cbExpGroup").on("click", function() {
			if($("input#Dept_cbExpGroup").prop("checked"))
				$("input#Dept_cbExpGroup").prop("checked",false);
			else
				$("input#Dept_cbExpGroup").prop("checked",true);
		});
		//公佈欄設定區CHECKBOX
		//內部
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("input#Dept_cbInsideTBdiv").click(function() {
		$dlg.find("input#Dept_cbInsideTBdiv").on("click", function() {
			TBEvent('1');
		});
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("input#Dept_InsideTB").click(function() {
		$dlg.find("input#Dept_InsideTB").on("click", function() {
			TBEvent('1');
		});
		//外部
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("input#Dept_cbOutsideTBdiv").click(function() {
		$dlg.find("input#Dept_cbOutsideTBdiv").on("click", function() {
			TBEvent('2');
		});
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("input#Dept_OutsideTB").click(function() {
		$dlg.find("input#Dept_OutsideTB").on("click", function() {
			TBEvent('2');
		});
		//輔以EMAIL通知公布欄受文者
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("input#Dept_divTBEmail").click(function() {
		$dlg.find("input#Dept_divTBEmail").on("click", function() {
			TBEvent('3');
		});
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("input#Dept_TBEmail").click(function() {
		$dlg.find("input#Dept_TBEmail").on("click", function() {
			TBEvent('3');
		});
		//全選
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_btCheckAll").click(function() {
		$dlg.find("#Dept_btCheckAll").on("click", function() {
			$("#receiverList").find("li.ui-table-item-PC").find("input[type='checkbox']").prop("checked",true);
		});
		//反向選取
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_btReverse").click(function() {
		$dlg.find("#Dept_btReverse").on("click", function() {
			var icheckboxlength = $("#receiverList").find("li.ui-table-item-PC").find("input[type='checkbox']").length;
			for(var i=0;i<icheckboxlength;i++)
			{
				if($("#receiverList").find("li.ui-table-item-PC").find("input[type='checkbox']")[i].checked)
					$("#receiverList").find("li.ui-table-item-PC").find("input[type='checkbox']").eq(i).prop("checked",false);
				else
					$("#receiverList").find("li.ui-table-item-PC").find("input[type='checkbox']").eq(i).prop("checked",true);
			}
		});
		//刪除
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_btDelete").click(function() {
		$dlg.find("#Dept_btDelete").on("click", function() {
		
			var icheckboxlength = $("#receiverList").find("input[id^='Dept_cel']").length;
			
			var arCheckedIdx = new Array();
			for (var i = 0 ; i < icheckboxlength ; i++)
			{
				//if($("#receiverList").find("input[id^='Dept_cel']")[i].checked)
				if($("#receiverList").find("div.ui-table-column-item").find("input[id^='Dept_cel_"+i+"']").prop("checked"))
					arCheckedIdx[arCheckedIdx.length] = i+1;//xml的序
			}
			if(arCheckedIdx.length==0)
			{		
				alert('請先勾選欲刪除的受文者資訊');
				return;
			}	
			
			if(!confirm('請確認是否刪除第'+arCheckedIdx+'筆受文者資訊？'))
				return;
			//arCheckedIdx裡的是畫面的序，跟受文者在XML結構裡的相同
			var CreateSN="";
			var xmlObj ="";
			var Deptinfo = "";
			var bGrp = false;
			for(var i=arCheckedIdx.length-1;i>=0;i--)
			{
				bGrp = false;
				//依序取得勾選受文者-XML物件
				if(activeDept.find("受文者[序='"+arCheckedIdx[i]+"']").length==0)
				{
					xmlObj = activeDept.find("受文者列表[序='"+arCheckedIdx[i]+"']");
					bGrp = true;
				}
				else
					xmlObj = activeDept.find("受文者[序='"+arCheckedIdx[i]+"']");

				//1100525 David 1100495 紀錄刪除的受文者資訊
				if(g_mailMergeCont!=0 )
				{
					if(bGrp)
					{
						var GrpDeptObj = xmlObj.find("受文者");
						var iDeptLength = GrpDeptObj.length;
						for(var iDept = 0 ; iDept < iDeptLength ; iDept++)
						{
							var DeptSeqNo = $(GrpDeptObj[iDept]).attr("編號");
							var DeptFullName = $(GrpDeptObj[iDept]).find("全銜").text();
							var DeptName = $(GrpDeptObj[iDept]).find("正式名稱").text();
							var DeptEmpName = $(GrpDeptObj[iDept]).find("姓名").text();
							setMailMergeDelete(DeptSeqNo, DeptFullName, DeptName, DeptEmpName)
						}
					}
					else
					{
						var DeptSeqNo = xmlObj.attr("編號");
						var DeptFullName = xmlObj.find("全銜").text();
						var DeptName = xmlObj.find("正式名稱").text();
						var DeptEmpName = xmlObj.find("姓名").text();
						setMailMergeDelete(DeptSeqNo, DeptFullName, DeptName, DeptEmpName)
					}
				}

				if(strDLGUseTrace=="Y")//追蹤修訂取得建立流程點
				{
					CreateSN = xmlObj.attr("CreateSN");
					if(CreateSN==gEditSn)//建立點為現在流程-直接刪除
					{
						$("#receiverList").find("li.ui-table-item-PC").eq(arCheckedIdx[i]-1).remove();
						xmlObj.remove();
					}
					else//追蹤修訂啟用時-非當前流程建立：
					{
						//1050819 Cloud	配合ie環境 修改程式寫法
						/*Deptinfo = "CreateSN='"+CreateSN+"' DeleteSN='"+gEditSn+"'";//刪除為現在流程-建立刪除者資訊
						
						if(bGrp==true)//群組加上以下資訊
							Deptinfo += " 群組代號='"+xmlObj.attr("群組代號")+"' 全銜='"+xmlObj.attr("全銜")+"' 正式名稱='"+xmlObj.attr("正式名稱")+"' SYSID='"+xmlObj.attr("SYSID")+"'";
						
						//畫面資訊改為DISABLE+橫線、XML資料TAG改為已刪除、加上刪除者屬性
						//1050819 Cloud	配合ie環境 修改程式寫法
						//xmlObj.wrap("<已刪除 序='"+xmlObj.attr("序")+"' 本別='"+xmlObj.attr("本別")+"' "+Deptinfo+" ></已刪除>");
						//再把下層的<受文者></受文者>或是<受文者列表></受文者列表>移除
						//xmlObj.children().unwrap();*/
						var DeleteNode;
						if(bGrp==true)
						{
							DeleteNode = activeDept.find("受文者列表[序='"+xmlObj.attr("序")+"']").get(0);
						}
						else
						{
							DeleteNode = activeDept.find("受文者[序='"+xmlObj.attr("序")+"']").get(0);
						}
						DeleteNode.setAttribute("DeleteSN",gEditSn);//設定刪除者屬性
						fnDeptWrap(DeleteNode,"已刪除","Delete");
					}
				}
				else
				{
					//依序移除勾選受文者-畫面
					$("#receiverList").find("li.ui-table-item-PC").eq(arCheckedIdx[i]-1).remove();
					xmlObj.remove();
				}
			}
			jf_onChange();
			fnReGenTable();
			$("input#Dept_cel").prop("checked",false);
		});
		//取消刪除-(追蹤修訂功能)
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_btCelDelete").click(function() {
		$dlg.find("#Dept_btCelDelete").on("click", function() {
			
			//取得被刪除的受文者
			var iDelcheckboxlength = $("#receiverTable").find("div.ui-table-column-item-delete").length;
			
			var arDelCheckedIdx = new Array();
			var index="";
			//將被刪除者序儲存置ARRAY
			for (var iDel = 0 ; iDel < iDelcheckboxlength ; iDel++)
			{
				index = $("#receiverTable").find("div.ui-table-column-item-delete").eq(iDel).find("input").eq(1).attr("id").split('_')[2];
				arDelCheckedIdx[arDelCheckedIdx.length] = parseInt(index)+1;//xml的序
			}
			if(arDelCheckedIdx.length==0)
			{		
				alert('請先勾選欲恢復刪除的受文者資訊');
				return;
			}
			if(!confirm('請確認是否恢復被刪除的第'+arDelCheckedIdx+'筆受文者資訊？'))
				return;
			//逐個將被刪除者重新APPEND至受文者列表中
			var reBuildnode;
			var reBuildInfo="";
			var reBuildDocType="";
			var bappendNew = false;
			var bIsGrp = false ;
			var reBuildSeq="";
			for(var iDept=0;iDept<arDelCheckedIdx.length;iDept++)
			{
				bIsGrp = false ;
				//建立基本資訊-恢復刪除建立者為現在流程-//fnReGenTable重建時會給序，因此不需要給
				//本別
				//1050819 Cloud	配合ie環境 修改程式寫法
				/*reBuildDocType = activeDept.find("已刪除[序='"+arDelCheckedIdx[iDept]+"']").attr("本別");
				reBuildBaseInfo = " 本別='"+reBuildDocType+"' ";*/
				
				if(activeDept.find("已刪除[序='"+arDelCheckedIdx[iDept]+"']").attr("群組代號")!=undefined)//表示為群組
				{
					bIsGrp = true;
					//1050819 Cloud	配合ie環境 修改程式寫法
					/*reBuildBaseInfo +=" 全銜='"+activeDept.find("已刪除[序='"+arDelCheckedIdx[iDept]+"']").attr("全銜")+"'"+
						" 群組代號='"+activeDept.find("已刪除[序='"+arDelCheckedIdx[iDept]+"']").attr("群組代號")+"'"+
						" SYSID='"+activeDept.find("已刪除[序='"+arDelCheckedIdx[iDept]+"']").attr("SYSID")+"' ";*/
				}
				
				//當前流程刪除他流程的受文者又取消時直接將CSS設回並更換原節點名稱
				if(gEditSn == activeDept.find("已刪除[序='"+arDelCheckedIdx[iDept]+"']").attr("DeleteSN"))
				{
					//寫回原資訊
					//1050819 Cloud	配合ie環境 修正恢復撰寫方式
					/*reBuildSeq = activeDept.find("已刪除[序='"+arDelCheckedIdx[iDept]+"']").attr("序");
					reBuildBaseInfo += " 序='"+reBuildSeq
					
					//從未啟用追蹤修訂到啟用時會有公文沒有CreateSN-因此判斷無此屬性則不建立CreateSN屬性
					
					/*if(activeDept.find("已刪除[序='"+arDelCheckedIdx[iDept]+"']").attr("CreateSN")!=undefined)
						reBuildBaseInfo +="' CreateSN='"+activeDept.find("已刪除[序='"+arDelCheckedIdx[iDept]+"']").attr("CreateSN")+"'";*/

					fnSetDelteColumn(arDelCheckedIdx[iDept]-1,"CelDelete");
					
					reBuildnode = activeDept.find("已刪除[序='"+arDelCheckedIdx[iDept]+"']").get(0);

					//置換節點
					//1050819 Cloud	配合ie環境 修改程式寫法
					if(bIsGrp)
						//reBuildnode.wrap("<受文者列表 "+reBuildBaseInfo+"></受文者列表>");
						fnDeptWrap(reBuildnode,"受文者列表","Delete");//此處傳入detele表式將被設為已刪除的節點刪掉，設定回該有節點
					else
						//reBuildnode.wrap("<受文者 "+reBuildBaseInfo+"></受文者>");
						fnDeptWrap(reBuildnode,"受文者","Delete");
					//reBuildnode.children().unwrap();	
					
					$("#receiverList").find("input[type='checkbox']").prop("checked",false);
				}
				else//非當前流程建立者以新增方式加回
				{
					bappendNew = true;
					//複製重建節點
					reBuildnode = activeDept.find("已刪除[序='"+arDelCheckedIdx[iDept]+"']").clone();
					//1050819 Cloud	配合ie環境 修正恢復撰寫方式
					//reBuildBaseInfo +=" CreateSN='"+gEditSn+"'";//取消刪除他流程刪除的受文者-建立者為當前
					//先放進去列表再做修改
					//activeDept.append(reBuildnode);
					var NewSeq = activeDept.children("受文者,受文者列表,已刪除").length;
					var NewBulidNode = reBuildnode.get(0);
					NewSeq++;
					NewBulidNode.setAttribute("序",NewSeq);
					NewBulidNode.setAttribute("CreateSN",gEditSn);
					NewBulidNode.setAttribute("DeleteSN","");
					
					
					if(bIsGrp)
					{
						//做tag置換
						//1050819 Cloud	配合ie環境 修正恢復撰寫方式
						/*activeDept.children().eq(activeDept.children("受文者,受文者列表,已刪除").length).wrap("<受文者列表 "+reBuildBaseInfo+"></受文者列表>");
						reBuildnode.wrap();*/
						fnDeptWrap(NewBulidNode,"受文者列表","Rebulid");
						
					}
					else
						//1050819 Cloud	配合ie環境 修正恢復撰寫方式
						//activeDept.children().eq(activeDept.children("受文者,受文者列表,已刪除").length).wrap("<受文者 "+reBuildBaseInfo+"></受文者>");
						fnDeptWrap(NewBulidNode,"受文者","Rebulid");
					//1050819 Cloud	配合ie環境 修正恢復撰寫方式
					/*reBuildnode.children().unwrap();
					//移除已刪除TAG
					activeDept.children().eq(activeDept.children("受文者,受文者列表,已刪除").length).children().children().unwrap();*/
				}
			}
			jf_onChange();
			
			if(bappendNew)//有將不同流程受文者加回才進行ReGenTable
				fnReGenTable();
		});
		
		//匯入鈕
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_btInclude").click(function (e) 
		$dlg.find("#Dept_btInclude").on("click", function (e) 
		{
			//1081008	Joe		1080339		jQuery升級3.4.1
			// $("input#Dept_fileInput").click();//觸發真的匯入欄位進行匯入
			$("input#Dept_fileInput").trigger("click");//觸發真的匯入欄位進行匯入
		});
		//匯入檔案
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_fileInput").change(function (e) 
		$dlg.find("#Dept_fileInput").on("change", function (e) 
		{
			var files = e.target.files;
			if(files=="")
				return;
			if($("input#Dept_cbAutoGroup").prop("checked"))
			{
				var params = new SOAPClientParameters();
				params.add('argGrpName', files[0].name.split('.')[0]);
				params.add('argOrgNo', theUserInfo.OrgID);
				//1130813 David 1130313 支援離線版invokeJSON改為非同步行為
				//SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "ChkGrpNameExt", params ,false, 
				SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "ChkGrpNameExt", params , true, function(r)
				{
					if(r.value!="OK")
					{
						alert(r.value);
						$("input#Dept_fileInput").val("");
						return;
					}
					else
					{
						gIncludeGrpName = files[0].name.split('.')[0];//以檔名做正副本稱謂以及受文者資訊
						fnInptfile(files);
					}
				});
			}
			else
			{
				//進行匯入
				fnInptfile(files);
			}
		});
		
		//匯出
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_btOutclude").click(function(e) 
		$dlg.find("#Dept_btOutclude").on("click", function(e) 
		{
			//1100329 David 1090844 群組受文者單獨匯出，先判斷是否有群組受文者
			var bHasGrp = false;
			if(activeDept.find("受文者[序*='_']").length != 0)
				bHasGrp = true;

			//1130813 David 1130313 匯出功能改為Client處理
			/*var strProgenitor = "";//正本受文者
			var strCopy = "";//副本受文者
			var strTranScript = "";//抄本受文者
			var strEmcee = "";//主持人受文者
			var strPreaence = "";//出席者受文者
			var strGuest = "";//列席者受文者
			//1100329 David 1090844 群組受文者單獨匯出，有群組時先取得非群組受文者
			//var Oouputobj = activeDept.find("受文者");
			var Oouputobj;
			if(bHasGrp)
				Oouputobj = activeDept.find("受文者:not([序*='_'])");
			else
				Oouputobj = activeDept.find("受文者");
			var strComma = ",";
			var strTitle = "序" + strComma + "受文者" + strComma + "郵遞區號" + strComma + "地址"+strComma + "Email"+strComma + "本別"+strComma + "姓名"+ "&amp;nbsp;";
			for (var i = 0; i < Oouputobj.length; i++)
			{
				var strFullName = Oouputobj.eq(i).find("正式名稱").text();
				var strAdress = Oouputobj.eq(i).find("地址").text();
				var strZip = Oouputobj.eq(i).find("郵遞區號").text();
				var strIndex = i;
				strIndex++;
				var strEmpName = Oouputobj.eq(i).find("姓名").text();
				var strEmail = Oouputobj.eq(i).find("Email").text();
				var pDocType = Oouputobj.eq(i).attr("本別");
				var strDeptInfo = strIndex+ strComma + strFullName + strComma + strZip + strComma + strAdress;
				

				if (strEmail.indexOf("|CHECK") != -1)
					strEmail = strEmail.Split('|')[0];
				strDeptInfo += strComma + strEmail;
				strDeptInfo += strComma + pDocType;
				strDeptInfo += strComma + strEmpName + "&amp;nbsp;";

				switch (pDocType)
				{
					case "正本":
						strProgenitor += strDeptInfo ;
						break;
					case "副本":
						strCopy += strDeptInfo ;
						break;
					case "抄本":
						strTranScript += strDeptInfo ;
						break;
					case "主持人":
						strEmcee += strDeptInfo ;
						break;
					case "出席者":
						strPreaence += strDeptInfo;
						break;
					case "列席者":
						strGuest += strDeptInfo;
						break;
				}
			}
			if(strProgenitor!="")
				strProgenitor = strTitle+strProgenitor;
			if(strCopy!="")
				strCopy = strTitle+strCopy;
			if(strTranScript!="")
				strTranScript = strTitle+strTranScript;
			if(strEmcee!="")
				strEmcee = strTitle+strEmcee;
			if(strPreaence!="")
				strPreaence = strTitle+strPreaence;
			if(strGuest!="")
				strGuest = strTitle+strGuest;

			//1100329 David 1090844 群組受文者單獨匯出，處理群組受文者資訊
			var GrpArray = [];
			if(bHasGrp)
			{
				var GrpObj = activeDept.find("受文者列表");
				for (var iGrp = 0; iGrp < GrpObj.length; iGrp++)
				{
					var GrpName = GrpObj.eq(iGrp).attr("全銜");
					var GrpOrgObj = GrpObj.eq(iGrp).find("受文者");
					var GrpOrgInfo = "";

					for (var iGrpOrg = 0; iGrpOrg < GrpOrgObj.length; iGrpOrg++)
					{
						var strFullName = GrpOrgObj.eq(iGrpOrg).find("正式名稱").text();
						var strAdress = GrpOrgObj.eq(iGrpOrg).find("地址").text();
						var strZip = GrpOrgObj.eq(iGrpOrg).find("郵遞區號").text();
						var strIndex = iGrpOrg;
						strIndex++;
						var strEmpName = GrpOrgObj.eq(iGrpOrg).find("姓名").text();
						var strEmail = GrpOrgObj.eq(iGrpOrg).find("Email").text();
						var pDocType = GrpOrgObj.eq(iGrpOrg).attr("本別");
						var strDeptInfo = strIndex+ strComma + strFullName + strComma + strZip + strComma + strAdress;
						strDeptInfo += strComma + strEmail;
						strDeptInfo += strComma + pDocType;
						strDeptInfo += strComma + strEmpName;
						strDeptInfo += "&amp;nbsp;";
						
						GrpOrgInfo += strDeptInfo;
					}
					
					GrpArray.push(GrpName + "|" + strTitle + GrpOrgInfo);
				}
			}

			var params = new SOAPClientParameters();
			params.add('argProgenitor', strProgenitor);
			params.add('argCopy', strCopy);
			params.add('argTranScript', strTranScript);
			params.add('argEmcee', strEmcee);
			params.add('argPreaence', strPreaence);
			params.add('argGuest', strGuest);
			params.add('argDocNo', qdocNo);
			params.add('artifact', theUserInfo.Artifact);
			//1100329 David 1090844 新增傳入群組受文者資訊
			params.add('argGrpInfo', GrpArray);
			SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "Outclude", params ,false, 
			function(r){
				if(r.value.indexOf('ERR-')!=-1)
				{
					alert(r.value);
					return;
				}
				else
				{
					window.open(r.value);
				}
			})*/
			let iCheckOutPutSingle = activeDept.find("受文者");
			let iCheckOutPutGrp = activeDept.find("受文者列表");
			if(iCheckOutPutSingle.length == 0 && iCheckOutPutGrp.length == 0)
			{
				alert("無受文者可匯出");
				return;
			}

			
			//1141229 David 1141432 調整匯出格式支援外貿客製化功能，並調整既有功能不依本別區分，僅區分群組
			/*var Oouputobj = activeDept.find("受文者");
			var arrProgenitorCsvData = [], arrCopyCsvData = [], arrTranScriptCsvData = [], arrEmceeCsvData = [], arrPreaenceCsvData = [], arrGuestCsvData = [];
			for (var i = 0; i < Oouputobj.length; i++)
			{
				var strFullName = Oouputobj.eq(i).find("正式名稱").text();
				var strAdress = Oouputobj.eq(i).find("地址").text();
				var strZip = Oouputobj.eq(i).find("郵遞區號").text();
				var strIndex = i;
				strIndex++;
				var strEmpName = Oouputobj.eq(i).find("姓名").text();
				var strEmail = Oouputobj.eq(i).find("Email").text();
				if (strEmail.indexOf("|CHECK") != -1)
					strEmail = strEmail.Split('|')[0];
				var pDocType = Oouputobj.eq(i).attr("本別");

				//紀錄匯出資料
				var arrOrgCsvData = [strIndex, strFullName, strZip, strAdress, strEmail, pDocType, strEmpName];
				//1141017	Joe		1141126		外貿增加傳真欄位
				if(strOrgNickName == "TAITRA")
				{
					var FaxNo = Oouputobj.eq(i).find("傳真").text();
					arrOrgCsvData.push(FaxNo);
				}

				switch (pDocType)
				{
					case "正本":
						arrProgenitorCsvData.push(arrOrgCsvData);
						break;
					case "副本":
						arrCopyCsvData.push(arrOrgCsvData);
						break;
					case "抄本":
						arrTranScriptCsvData.push(arrOrgCsvData);
						break;
					case "主持人":
						arrEmceeCsvData.push(arrOrgCsvData);
						break;
					case "出席者":
						arrPreaenceCsvData.push(arrOrgCsvData);
						break;
					case "列席者":
						arrGuestCsvData.push(arrOrgCsvData);
						break;
				}
			}
			var zip = new JSZip();

			//正本
			if(arrProgenitorCsvData.length > 0)
				AddCsvDataToZip(arrProgenitorCsvData, "正本");
			//副本
			if(arrCopyCsvData.length > 0)
				AddCsvDataToZip(arrCopyCsvData, "副本");
			//抄本
			if(arrTranScriptCsvData.length > 0)
				AddCsvDataToZip(arrTranScriptCsvData, "抄本");
			//主持人
			if(arrEmceeCsvData.length > 0)
				AddCsvDataToZip(arrEmceeCsvData, "主持人");
			//出席者
			if(arrPreaenceCsvData.length > 0)
				AddCsvDataToZip(arrPreaenceCsvData, "出席者");
			//列席者
			if(arrGuestCsvData.length > 0)
				AddCsvDataToZip(arrGuestCsvData, "列席者");
			
			//群組受文者單獨匯出，處理群組受文者資訊
			if(bHasGrp)
			{
				let GrpObj = activeDept.find("受文者列表");
				for (let iGrp = 0; iGrp < GrpObj.length; iGrp++)
				{
					let GrpName = GrpObj.eq(iGrp).attr("全銜");
					let GrpOrgObj = GrpObj.eq(iGrp).find("受文者");
					let arrGrpCsvData = []

					for (let iGrpOrg = 0; iGrpOrg < GrpOrgObj.length; iGrpOrg++)
					{
						let strFullName = GrpOrgObj.eq(iGrpOrg).find("正式名稱").text();
						let strAdress = GrpOrgObj.eq(iGrpOrg).find("地址").text();
						let strZip = GrpOrgObj.eq(iGrpOrg).find("郵遞區號").text();
						let strIndex = iGrpOrg;
						strIndex++;
						let strEmpName = GrpOrgObj.eq(iGrpOrg).find("姓名").text();
						let strEmail = GrpOrgObj.eq(iGrpOrg).find("Email").text();
						let pDocType = GrpOrgObj.eq(iGrpOrg).attr("本別");
						
						//紀錄匯出資料
						let arrOrgCsvData = [strIndex, strFullName, strZip, strAdress, strEmail, pDocType, strEmpName];
						
						//1141017	Joe		1141126		外貿增加傳真欄位
						if(strOrgNickName == "TAITRA")
						{
							let FaxNo = GrpOrgObj.eq(iGrpOrg).find("傳真").text();
							arrOrgCsvData.push(FaxNo);
						}
						
						arrGrpCsvData.push(arrOrgCsvData);
					}
					
					AddCsvDataToZip(arrGrpCsvData, GrpName);
				}
			}
			
			//將檔案新增至壓縮檔內
			function AddCsvDataToZip(argCsvDataArr, argType)
			{
				var csvContent = "序,受文者,郵遞區號,地址,Email,本別,姓名\r\n";
				//1141017	Joe		1141126		外貿增加傳真欄位
				if(strOrgNickName == "TAITRA")
					csvContent = "序,受文者,郵遞區號,地址,Email,本別,姓名,傳真\r\n";
				argCsvDataArr.forEach(function(rowArray) {
					var row = rowArray.join(",");
					csvContent += row + "\r\n";
				});
				var blob = new Blob([String.fromCharCode(0xFEFF), csvContent], {type: "text/plain;charset=utf-8"});
				zip.file(argType + ".csv", blob);
			}*/
			var zip = new JSZip();
			var Oouputobj;
			if(bHasGrp)
				Oouputobj = activeDept.find("受文者:not([序*='_'])");
			else
				Oouputobj = activeDept.find("受文者");

			if(strOrgNickName == "TAITRA")
			{
				let sCsvDataTitle = "本別,受文者名稱,對應機關名稱,含附件,發文方式,郵遞區號,地址,電子郵件信箱,名址條名稱,人名,職稱,傳真";
				let arrCsvData = [];
				for (let i = 0; i < Oouputobj.length; i++)
				{
					let sDocType = Oouputobj.eq(i).attr("本別");
					let sOrgTitle = Oouputobj.eq(i).find("全銜").text();
					let sOrgName = Oouputobj.eq(i).find("正式名稱").text();
					let sHasAtt = Oouputobj.eq(i).find("含附件").text();
					let sIssueType = Oouputobj.eq(i).find("發文方式").text();
					let sPostCode = Oouputobj.eq(i).find("郵遞區號").text();
					let sAdress = Oouputobj.eq(i).find("地址").text();
					let sEmail = Oouputobj.eq(i).find("Email").text();
					if (sEmail.indexOf("|CHECK") != -1)
						sEmail = sEmail.Split('|')[0];
					let sNameAddress = Oouputobj.eq(i).find("名址條名稱").text();
					let sEmpName = Oouputobj.eq(i).find("姓名").text();
					let sJobTitle = Oouputobj.eq(i).find("職稱").text();
					let sFaxNo = Oouputobj.eq(i).find("傳真").text();

					//紀錄匯出資料
					let arrOrgCsvData = [sDocType, sOrgTitle, sOrgName, sHasAtt, sIssueType, sPostCode, sAdress, sEmail, sNameAddress, sEmpName, sJobTitle, sFaxNo];
					arrCsvData.push(arrOrgCsvData);
				}

				if(arrCsvData.length > 0)
					AddCsvDataToZip(sCsvDataTitle, arrCsvData, "受文者");

				//群組受文者單獨匯出，處理群組受文者資訊
				if(bHasGrp)
				{
					let GrpObj = activeDept.find("受文者列表");
					for (let iGrp = 0; iGrp < GrpObj.length; iGrp++)
					{
						let GrpName = GrpObj.eq(iGrp).attr("全銜");
						let GrpOrgObj = GrpObj.eq(iGrp).find("受文者");
						let arrGrpCsvData = []

						for (let iGrpOrg = 0; iGrpOrg < GrpOrgObj.length; iGrpOrg++)
						{
							let sDocType = GrpOrgObj.eq(iGrpOrg).attr("本別");
							let sOrgTitle = GrpOrgObj.eq(iGrpOrg).find("全銜").text();
							let sOrgName = GrpOrgObj.eq(iGrpOrg).find("正式名稱").text();
							let sHasAtt = GrpOrgObj.eq(iGrpOrg).find("含附件").text();
							let sIssueType = GrpOrgObj.eq(iGrpOrg).find("發文方式").text();
							let sPostCode = GrpOrgObj.eq(iGrpOrg).find("郵遞區號").text();
							let sAdress = GrpOrgObj.eq(iGrpOrg).find("地址").text();
							var sEmail = GrpOrgObj.eq(iGrpOrg).find("Email").text();
							if (sEmail.indexOf("|CHECK") != -1)
								sEmail = sEmail.Split('|')[0];
							let sNameAddress = GrpOrgObj.eq(iGrpOrg).find("名址條名稱").text();
							let sEmpName = GrpOrgObj.eq(iGrpOrg).find("姓名").text();
							let sJobTitle = GrpOrgObj.eq(iGrpOrg).find("職稱").text();
							let sFaxNo = GrpOrgObj.eq(iGrpOrg).find("傳真").text();
							
							//紀錄匯出資料
							let arrOrgCsvData = [sDocType, sOrgTitle, sOrgName, sHasAtt, sIssueType, sPostCode, sAdress, sEmail, sNameAddress, sEmpName, sJobTitle, sFaxNo];
							arrGrpCsvData.push(arrOrgCsvData);
						}

						AddCsvDataToZip(sCsvDataTitle, arrGrpCsvData, GrpName);
					}
				}
			}
			else
			{
				let sCsvDataTitle = "序,受文者,郵遞區號,地址,Email,本別,姓名";
				let arrCsvData = [];
				for (let i = 0; i < Oouputobj.length; i++)
				{
					let iSeqNo = i;
					iSeqNo++;
					let aFullName = Oouputobj.eq(i).find("正式名稱").text();
					let aPostCode = Oouputobj.eq(i).find("郵遞區號").text();
					let aAdress = Oouputobj.eq(i).find("地址").text();
					let sEmail = Oouputobj.eq(i).find("Email").text();
					if (sEmail.indexOf("|CHECK") != -1)
						sEmail = strEmail.Split('|')[0];
					let sDocType = Oouputobj.eq(i).attr("本別");
					let sEmpName = Oouputobj.eq(i).find("姓名").text();

					//紀錄匯出資料
					let arrOrgCsvData = [iSeqNo, aFullName, aPostCode, aAdress, sEmail, sDocType, sEmpName];
					arrCsvData.push(arrOrgCsvData);
				}

				if(arrCsvData.length > 0)
					AddCsvDataToZip(sCsvDataTitle, arrCsvData, "受文者");

				//群組受文者單獨匯出，處理群組受文者資訊
				if(bHasGrp)
				{
					let GrpObj = activeDept.find("受文者列表");
					for (let iGrp = 0; iGrp < GrpObj.length; iGrp++)
					{
						let GrpName = GrpObj.eq(iGrp).attr("全銜");
						let GrpOrgObj = GrpObj.eq(iGrp).find("受文者");
						let arrGrpCsvData = []

						for (let iGrpOrg = 0; iGrpOrg < GrpOrgObj.length; iGrpOrg++)
						{
							let iSeqNo = iGrpOrg;
							iSeqNo++;
							let aFullName = GrpOrgObj.eq(iGrpOrg).find("正式名稱").text();
							let aPostCode = GrpOrgObj.eq(iGrpOrg).find("郵遞區號").text();
							let aAdress = GrpOrgObj.eq(iGrpOrg).find("地址").text();
							let sEmail = GrpOrgObj.eq(iGrpOrg).find("Email").text();
							if (sEmail.indexOf("|CHECK") != -1)
								sEmail = strEmail.Split('|')[0];
							let sDocType = GrpOrgObj.eq(iGrpOrg).attr("本別");
							let sEmpName = GrpOrgObj.eq(iGrpOrg).find("姓名").text();

							//紀錄匯出資料
							let arrOrgCsvData = [iSeqNo, aFullName, aPostCode, aAdress, sEmail, sDocType, sEmpName];
							arrGrpCsvData.push(arrOrgCsvData);
						}

						AddCsvDataToZip(sCsvDataTitle, arrGrpCsvData, GrpName);
					}
				}
			}

			//將檔案新增至壓縮檔內
			function AddCsvDataToZip(argCsvDataTitle, argCsvDataArr, argType)
			{
				let csvContent = argCsvDataTitle + "\r\n";
				argCsvDataArr.forEach(function(rowArray) {
					let row = rowArray.join(",");
					csvContent += row + "\r\n";
				});
				let blob = new Blob([String.fromCharCode(0xFEFF), csvContent], {type: "text/plain;charset=utf-8"});
				zip.file(argType + ".csv", blob);
			}

			//壓縮檔下載處理
			zip.generateAsync({type:"blob"})
			.then(function(content) {
				let url = URL.createObjectURL(content);
				let link = document.createElement("a");
				link.href = url;
				link.download = qdocNo + "匯出受文者.zip";
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			});
		});

		//開啟查詢子視窗
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_btSearch").click(function(e) 
		$dlg.find("#Dept_btSearch").on("click", function(e) 
		{
			fnOpenWem010C1();
		});
		
		//批次檢核-開啟受文者差異子視窗
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_btCheckBatch").click(function() 
		$dlg.find("#Dept_btCheckBatch").on("click", function() 
		{
			var arCheckedIdx = new Array();
			//var icheckboxlength = $("#receiverList").find("li.ui-table-item-PC").find("input[type='checkbox']").length;
			//取得所有CHECKBOX
			var icheckboxlength = $("#receiverList").find("input[id^='Dept_cel']").length;
			for (var i = 0 ; i < icheckboxlength ; i++)
			{
				//if($("#receiverList").find("li.ui-table-item-PC").find("input[type='checkbox']")[i].checked)
				//if($("#receiverList").find("input[id^='Dept_cel']")[i].checked)
				//確定是啟用()的CHECKBOX才放入Array中
				if($("#receiverList").find("div.ui-table-column-item").find("input[id^='Dept_cel_"+i+"']").prop("checked"))
					arCheckedIdx[arCheckedIdx.length] = i+1;//xml的序
			}
			if(arCheckedIdx.length==0)
			{		
				alert('請先勾選欲檢核的受文者資訊');
				return;
			}	
			if(strWeCheckissue!=undefined && strWeCheckissue.split('|')[0]=="Y")
			{
				var strXML = "<受文者列表>";
				var xmlNode;
				for(var i=0;i<arCheckedIdx.length;i++)
				{
					//依序取得勾選受文者-XML物件
					if(activeDept.find("受文者[序='"+arCheckedIdx[i]+"']").length!=0)//以序去找有找到則為單筆受文者
					{
						xmlNode = activeDept.find("受文者[序='"+arCheckedIdx[i]+"']");
						
						if(xmlNode.html()!=undefined)//支援IE
						//1050930	Cloud	Cloud	--			修正受文者差異子視窗問題
							//strXML +="<受文者 序='"+arCheckedIdx[i]+"'>"+xmlNode+"</受文者>";
							strXML +="<受文者 序='"+arCheckedIdx[i]+"'>"+xmlNode.html()+"</受文者>";
						else
							strXML +=xmlNode.get(0).xml;

					}						
					else
					{
						//勾選為群組，取得群組下所有受文者
						var iDeptInGrp = activeDept.find("受文者[序^='"+arCheckedIdx[i]+"_']").length;
						var xmlseq=0;
						for(var iDept=0;iDept<iDeptInGrp;iDept++)
						{
							xmlseq = iDept+1;
							xmlNode = activeDept.find("受文者[序='"+arCheckedIdx[i]+"_"+xmlseq+"']");
							if(xmlNode.html()!=undefined)//支援IE
								//1050930	Cloud	Cloud	--			修正受文者差異子視窗問題
								//strXML +="<受文者 序='"+arCheckedIdx[i]+"_"+xmlseq+"'>"+xmlNode+"</受文者>";
								strXML +="<受文者 序='"+arCheckedIdx[i]+"_"+xmlseq+"'>"+xmlNode.html()+"</受文者>";
							else
								strXML += xmlNode.get(0).xml;
							
						}
					}
				}
				strXML += "</受文者列表>";
				fnOpenWem010C3(strXML);
			}
			else
			{
				//1130813 David 1130313 支援離線版invokeJSON改為非同步行為，調整呼叫fnAddnew()邏輯
				/*for(var i=0;i<arCheckedIdx.length;i++)
				{
					//1060623 Cloud 1060147 中興大學-由自動檢核呼叫時，增加判斷是否要繼續檢核-非自動檢核則一律檢核
					if(!gIsNcHuAutOcheck || (gIsNcHuAutOcheck && (gIsKeepAutOCheck==null || gIsKeepAutOCheck==true)))// null 表示為第一次
						fnAddnew("CHECK",arCheckedIdx[i]);
					gCheckXmlindex=-1;
				}
				//檢核完重建
				fnReGenTable();
				jf_onChange();
				//1060623 Cloud	1060147 如為中興大學自動檢核，為群組但不存在DB則逐個底下受文者進行檢核		
				if(gIsNcHuAutOcheck)
				{	
					if(gIsKeepAutOCheck)
						alert("受文者資料已帶入，請自行再確認。");
				}
				else
				{
					//1121213	Joe		1120743		調整當使用者依匯入資料為主時，提示訊息變更--S
					if(theSSO.User.SystemSets.DEPT_INCLUDE_RULE == "Y")
						alert('因使用自行匯入，故郵遞區號、地址不進行檢核。');
					else
					//1121213	Joe		1120743		調整當使用者依匯入資料為主時，提示訊息變更--E
						alert('檢核完畢。');
				}*/
				function doChecked(iCheck)
				{
					if(iCheck < arCheckedIdx.length)
					{
						if(!gIsNcHuAutOcheck || (gIsNcHuAutOcheck && (gIsKeepAutOCheck==null || gIsKeepAutOCheck==true)))// null 表示為第一次
						{
							fnAddnew("CHECK",arCheckedIdx[iCheck]).done(function() {
								gCheckXmlindex=-1;
								doChecked(iCheck+1);
							});
						}
						else
							doChecked(iCheck+1);
					}
					else
					{
						//檢核完重建
						fnReGenTable();
						jf_onChange();
						//如為中興大學自動檢核，為群組但不存在DB則逐個底下受文者進行檢核		
						if(gIsNcHuAutOcheck)
						{	
							if(gIsKeepAutOCheck)
								alert("受文者資料已帶入，請自行再確認。");
						}
						else
						{
							//調整當使用者依匯入資料為主時，提示訊息變更
							if(theSSO.User.SystemSets.DEPT_INCLUDE_RULE == "Y")
								alert('因使用自行匯入，故郵遞區號、地址不進行檢核。');
							else
								alert('檢核完畢。');
						}
					}
				}
				doChecked(0);
			}
		});
		//副本均含附件
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_btCopyHasAtt").click(function() {
		$dlg.find("#Dept_btCopyHasAtt").on("click", function() {
		
			//利用next去找，如果中間有加任何物件，就會異常，有增加的話這裡必須修改
			//1050819	Cloud	配合ie修改語法
			//$("#receiverList").find("input[value='副本']").next().find("input").attr("value","是");
			var obj = $("#receiverList").find("input[value='副本']").next().attr("value","是");
			//1050818 Cloud	配合IE修改節點資訊修改方式
			//activeDept.find("受文者[本別='副本']").find("含附件").text("是");
			//1051108	Cloud	修正本別、發文方式、附件異動後直接離開不會提醒需儲存bug
			//fnSetTextOfElement(activeDept.find("受文者[本別='副本']").find("含附件"),"是");
			fnSetTextOfDeptElement(activeDept.find("受文者[本別='副本']").find("含附件"),"是");
			//1080312 David 1080089 調整紀錄異動的資料邏輯
			/*//1070529 Cloud 1070183 新增附件分繕功能-異動過清除群組內受文者分繕表-S
			var arrDeptList = activeDept.find("受文者[本別='副本']").find("正式名稱");
			for(var arrDpet=0;arrDpet<arrDeptList.length;arrDpet++)
			{
				var ModeDeptName = "";
				if("text" in arrDeptList[arrDpet])
					ModeDeptName = arrDeptList[arrDpet].text ;
					else
					ModeDeptName = arrDeptList[arrDpet].textContent;					
				g_arrmailMergeClearDept.push(ModeDeptName);
			}					
			//1070529	Cloud	1070183		新增附件分繕功能-異動過清除群組內受文者分繕表-E*/
			if(g_mailMergeCont!=0 )//有分繕表，才觸發處理
			{
				var arrCopyDeptList = activeDept.find("受文者[本別='副本']");
				if (arrCopyDeptList && arrCopyDeptList.length > 0)
				{
					for(var arrDpet = 0 ; arrDpet < arrCopyDeptList.length ; arrDpet++)
					{
						var pDeptSeqNo = arrCopyDeptList.eq(arrDpet).attr("編號");
						var pDeptDullName = arrCopyDeptList.eq(arrDpet).find("全銜").text();
						var pDeptName = arrCopyDeptList.eq(arrDpet).find("正式名稱").text();
						var pDeptEmpName = arrCopyDeptList.eq(arrDpet).find("姓名").text();

						setMailMergeModify("1", pDeptSeqNo, pDeptDullName, pDeptName, pDeptEmpName);
					}

					//1140728 David 1140381 異動既有受文者是否含附件時，設定附件分繕異動旗標
					gdmObj.needSaveDispatchAtt(true);
				}
			}
		});
		
		//郵遞區號
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_btQueryZip").click(function() {
		$dlg.find("#Dept_btQueryZip").on("click", function() {
			window.open("http://www.post.gov.tw/post/internet/f_searchzone/index.jsp?ID=190102");
		});
		
		//移動至最前
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_rbFirst").click(function() {
		$dlg.find("#Dept_rbFirst").on("click", function() {
			//1080903	Joe		1080339		jQuery升級2.2.4
			// $("#Dept_txSeq").val("").attr("disabled",true);
			$("#Dept_txSeq").val("").prop("disabled",true);
		});
		
		//移動至最後
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_rbLast").click(function() {
		$dlg.find("#Dept_rbLast").on("click", function() {
			//1080903	Joe		1080339		jQuery升級2.2.4
			// $("#Dept_txSeq").val("").attr("disabled",true);
			$("#Dept_txSeq").val("").prop("disabled",true);
			
		});
		//移動至指定位置
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_rbAfter").click(function() {
		$dlg.find("#Dept_rbAfter").on("click", function() {
			//1080903	Joe		1080339		jQuery升級2.2.4
			// $("#Dept_txSeq").val("").attr("disabled",false);
			$("#Dept_txSeq").val("").prop("disabled",false);
			
		});
		//移動鈕
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Detp_btMoveTo").click(function() 
		$dlg.find("#Detp_btMoveTo").on("click", function() 
		{
			var icheckboxlength = $("#receiverList").find("input[id^='Dept_cel']").length;
			var arCheckedIdx = new Array();
			for (var i = 0 ; i < icheckboxlength ; i++)
			{
				if($("#receiverList").find("li.ui-table-item-PC").find("input[id^='Dept_cel_"+i+"']")[0].checked)
				{
					arCheckedIdx[arCheckedIdx.length] = i+1;//xml的序
				}
			}

			if(arCheckedIdx.length==0)
			{
				alert("受尚未勾選資料!");
				return;
			}
			var TargetIndex;
			var Mode;
			if($("#Dept_rbFirst").prop("checked"))
			{
				Mode = "First";
				TargetIndex=0;
			}
			else if($("#Dept_rbLast").prop("checked"))
			{
				Mode = "After";
				TargetIndex=activeDept.children("受文者,受文者列表,已刪除").length-1;
			}
			else
			{
				TargetIndex = parseInt($("#Dept_txSeq").val())-1;
			}

			fnMoveXmlData(TargetIndex,Mode,arCheckedIdx);
			fnReGenTable();
		});

		//註冊機關查詢子視窗回傳按鈕(WEM010C1)
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("div#WEM010C1_DIV").find("#searchDlg_close_btn").click(function(event, obj)
		$dlg.find("div#WEM010C1_DIV").find("#searchDlg_close_btn").on("click", function(event, obj)
		{
			var $pane = $("div#WEM010C1_DIV");
			var $frame = $pane.find('iframe');
			$frame[0].src = "";
			$("div#WEM010C1_DIV")[0].style="display: none";
			$("div#WEM010C1_DIV").removeClass("ui-slide-pane-active");
			$("#receiverSetting").find(".ui-slide-pane-left").addClass("ui-slide-pane-active");
			var bMuit = false;
			if($("#lbRtnValue").val().indexOf('|')!=-1)//表示回傳多筆	
				bMuit = true;
			var backValueDeptList = $("#lbRtnValue").val().split('|');//不能TRIM掉，WEM010 單筆回傳跟多筆回傳，群組的結構不同，以|判斷
			var backValueDept;
			//1130813 David 1130313 支援離線版invokeJSON改為非同步行為，調整呼叫fnAddnew()邏輯
			/*for(var iDept=0;iDept<backValueDeptList.length;iDept++)
			{
				if(backValueDeptList[iDept]=="")
					continue;
				gShearch = true;				
				backValueDept = backValueDeptList[iDept].split('^');
				$("input#Dept_txOrgName").val(backValueDept[1]);
				$("input#Dept_txOrgFullName").val(backValueDept[1]);

				if(backValueDept[backValueDept.length-1]=="Y")
				{
					if(bMuit)//多筆時群組時SYSID在第3個
						$("input#Dept_txDeptSysId").val(backValueDept[2]);
					else
						$("input#Dept_txDeptSysId").val(backValueDept[14]);
				}
				else
					$("input#Dept_txDeptSysId").val(backValueDept[14]);
				fnAddnew("Search");
			}
			gShearch = false;*/
			function dobackValue(iDept)
			{
				if(iDept < backValueDeptList.length)
				{
					if(backValueDeptList[iDept]=="")
						dobackValue(iDept+1);
					else
					{
						gShearch = true;
						backValueDept = backValueDeptList[iDept].split('^');
						$("input#Dept_txOrgName").val(backValueDept[1]);
						$("input#Dept_txOrgFullName").val(backValueDept[1]);
						
						if(backValueDept[backValueDept.length-1]=="Y")
						{
							if(bMuit)//多筆時群組時SYSID在第3個
								$("input#Dept_txDeptSysId").val(backValueDept[2]);
							else
								$("input#Dept_txDeptSysId").val(backValueDept[14]);
						}
						else
							$("input#Dept_txDeptSysId").val(backValueDept[14]);
					}
					fnAddnew("Search").done(function() {
						dobackValue(iDept+1);
					});
				}
				else
					gShearch = false;
			}
			dobackValue(0);
		});
		//註冊受文者差異子視窗選擇(WEM010C3-直接借用WEM010C1的DIV)
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("div#WEM010C1_DIV").find("#differentDlg_close_btn").click(function(event, obj)
		$dlg.find("div#WEM010C1_DIV").find("#differentDlg_close_btn").on("click", function(event, obj)
		{
			var $pane = $("div#WEM010C1_DIV");
			var $frame = $pane.find('iframe');
			$frame[0].src = "";
			$("div#WEM010C1_DIV")[0].style="display: none";
			$("div#WEM010C1_DIV").removeClass("ui-slide-pane-active");
			$("#receiverSetting").find(".ui-slide-pane-left").addClass("ui-slide-pane-active");

			if($("input#WEM010C3VALUE").val()!="")
			{
				var DeptInfolist = $("input#WEM010C3VALUE").val().split('|');
				var DeptInfo;
				var idElentSeq;
				for(var iDept=0;iDept<DeptInfolist.length;iDept++)
				{
					DeptInfo = DeptInfolist[iDept].split('^');

					if(DeptInfo[0].indexOf('_')==-1)//非群組受文者
					{
						idElentSeq = DeptInfo[0]-1;
						//寫入畫面
						$("#receiverList").find("input[id='Dept_dldocissuetype_"+idElentSeq+"']").val(fnchangeIssueButton(DeptInfo[1]));
						$("#receiverList").find("input[id='Dept_txPostNo_"+idElentSeq+"']").val(DeptInfo[2]);
						$("#receiverList").find("input[id='Dept_txAddress_"+idElentSeq+"']").val(DeptInfo[3]);

						if(strOdSupportEmail != "N")
							$("#receiverList").find("input[id='Dept_txEmail_"+idElentSeq+"']").val(DeptInfo[4]);
					}
					//將資料寫入受文者XML
					//1050818 Cloud	配合ie環境修改節點資訊異動方式
					/*activeDept.find("受文者[序='"+DeptInfo[0]+"']").find("發文方式").text(DeptInfo[1]);//發文方式
					activeDept.find("受文者[序='"+DeptInfo[0]+"']").find("郵遞區號").text(DeptInfo[2]);//郵遞區號
					activeDept.find("受文者[序='"+DeptInfo[0]+"']").find("地址").text(DeptInfo[3]);//地址*/
					//1051108	Cloud	修正本別、發文方式、附件異動後直接離開不會提醒需儲存bug
					//fnSetTextOfElement(activeDept.find("受文者[序='"+DeptInfo[0]+"']").find("發文方式"),DeptInfo[1]);
					//fnSetTextOfElement(activeDept.find("受文者[序='"+DeptInfo[0]+"']").find("郵遞區號"),DeptInfo[2]);
					//fnSetTextOfElement(activeDept.find("受文者[序='"+DeptInfo[0]+"']").find("地址"),DeptInfo[3]);
					fnSetTextOfDeptElement(activeDept.find("受文者[序='"+DeptInfo[0]+"']").find("發文方式"),DeptInfo[1]);
					fnSetTextOfDeptElement(activeDept.find("受文者[序='"+DeptInfo[0]+"']").find("郵遞區號"),DeptInfo[2]);
					fnSetTextOfDeptElement(activeDept.find("受文者[序='"+DeptInfo[0]+"']").find("地址"),DeptInfo[3]);
					if(strOdSupportEmail != "N")
						//1050818 Cloud	配合ie環境修改節點資訊異動方式
						//activeDept.find("受文者[序='"+DeptInfo[0]+"']").find("Email").text(DeptInfo[4])
						//1051108	Cloud	修正本別、發文方式、附件異動後直接離開不會提醒需儲存bug
						//fnSetTextOfElement(activeDept.find("受文者[序='"+DeptInfo[0]+"']").find("Email"),DeptInfo[4]);
						fnSetTextOfDeptElement(activeDept.find("受文者[序='"+DeptInfo[0]+"']").find("Email"),DeptInfo[4]);
					//1050818 Cloud	配合ie環境修改節點資訊異動方式
					//activeDept.find("受文者[序='"+DeptInfo[0]+"']").find("機關代碼").text(DeptInfo[5].substring(0,10));
						//1051108	Cloud	修正本別、發文方式、附件異動後直接離開不會提醒需儲存bug
					if(DeptInfo[5].length==10)
						fnSetTextOfDeptElement(activeDept.find("受文者[序='"+DeptInfo[0]+"']").find("機關代碼"),DeptInfo[5]);

					if(DeptInfo[5].length>10)
					{
						//1050818 Cloud	配合ie環境修改節點資訊異動方式
						//activeDept.find("受文者[序='"+DeptInfo[0]+"']").find("單位代碼").text(DeptInfo[5].substring(10,17));
						//1051108	Cloud	修正本別、發文方式、附件異動後直接離開不會提醒需儲存bug
						//fnSetTextOfElement(activeDept.find("受文者[序='"+DeptInfo[0]+"']").find("單位代碼"),DeptInfo[5].substring(10,17));	
						fnSetTextOfDeptElement(activeDept.find("受文者[序='"+DeptInfo[0]+"']").find("機關代碼"),DeptInfo[5].substring(0,10));
						fnSetTextOfDeptElement(activeDept.find("受文者[序='"+DeptInfo[0]+"']").find("單位代碼"),DeptInfo[5].substring(10,17));
					}
					//取消勾選
					$("input#Dept_cel_"+iDept).prop("checked",false);
				}
			}
		});

		//刪除重複受文者
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_btDeleteRepeat").click(function() 
		$dlg.find("#Dept_btDeleteRepeat").on("click", function() 
		{
			var ndOrgList = activeDept.find("受文者");
			if (ndOrgList && ndOrgList.length > 0)
			{
				var pErrDupSeq = '';
				var pDeleteSeq = new Array();//紀錄要刪除的受文者序

				for (var i = 0 ; i < ndOrgList.length ; i++)
				{
					var pIssueType = ndOrgList.eq(i).find("發文方式").text();
					var pFullName = ndOrgList.eq(i).find("正式名稱").text();
					var pOrgNo = jf_DeptTrim(ndOrgList.eq(i).find("機關代碼").text());
					var pDeptNo = jf_DeptTrim(ndOrgList.eq(i).find("單位代碼").text());
					var pSeq = ndOrgList.eq(i).attr("序");
					var pDocType = ndOrgList.eq(i).attr("本別");
					var ndDupOrg = null;
					var pEmpname = (ndOrgList.eq(i).find("姓名").text())?ndOrgList.eq(i).find("姓名").text() : "";
					//檢查是否有重覆的受文者
					//0:不警告 1:同本別才警告且抄本不檢查(程式預設值) 2:同本別才警告 3:抄本不檢查 4:均檢查 -->
					//重複名稱 或是 重複機關/單位代碼 提示字串內無當前受文者序時，才需經過以下檢核
					if(pErrDupSeq.indexOf(pSeq) == -1)
					{
						switch (gCheckDuplicte.charAt(0))
						{
							case "0":
							break;
							case "1":
								if (pDocType == '抄本')
									ndDupOrg = null;
								else
								{
									ndDupOrg = activeDept.find("受文者[本別='"+pDocType+"']").find("正式名稱:contains("+pFullName+")").filter(function() {return $(this).text() == pFullName;}).parent().find("姓名:contains("+pEmpname+")").filter(function() {return $(this).text() == pEmpname;}).parent();
								}
							break;
							
							case "2":
								ndDupOrg = activeDept.find("受文者[本別='"+pDocType+"']").find("正式名稱:contains("+pFullName+")").filter(function() {return $(this).text() == pFullName;}).parent();
							break;
							
							case "3":
								if (pDocType == '抄本')
									ndDupOrg = null;
								else
								ndDupOrg = activeDept.find("受文者[本別!='抄本']").find("正式名稱:contains("+pFullName+")").filter(function() {return $(this).text() == pFullName;}).parent().find("姓名:contains("+pEmpname+")").filter(function() {return $(this).text() == pEmpname;}).parent();
							break;
							
							case "4":
								ndDupOrg = activeDept.find("受文者").find("正式名稱:contains("+pFullName+")").filter(function() {return $(this).text() == pFullName;}).parent().find("姓名:contains("+pEmpname+")").filter(function() {return $(this).text() == pEmpname;}).parent();
							break;
						}

						if (ndDupOrg != null && ndDupOrg.length > 1)
						{
							var pDupSeq = new Array();
							for (var IdxDupOrg = 0;IdxDupOrg < ndDupOrg.length ; IdxDupOrg++)
							{
								pDupSeq[IdxDupOrg] = ndDupOrg.eq(IdxDupOrg).attr("序");
								
								if(IdxDupOrg != 0)
									pDeleteSeq[pDeleteSeq.length] = pDupSeq[IdxDupOrg];
							}
							pErrDupSeq += pDupSeq+' ';
						}
					}
				}
				if(pDeleteSeq.length > 0)
				{
					if(window.confirm('有受文者名稱重複，是否刪除重複受文者，僅保留第一筆受文者資訊？'))
					{
						var bDeleteSingle = false;
						var objGrp;
						for(var idelete = 0 ; idelete < pDeleteSeq.length ; idelete++)
						{
							activeDept.find("受文者[序='"+pDeleteSeq[idelete]+"']").remove();
							//判斷如為群組，底下受文者皆沒有時也一併移除自己
							if(pDeleteSeq[idelete].indexOf("_")!=-1)//表示為群組內受文者
							{
								objGrp = activeDept.find("受文者列表[序='"+pDeleteSeq[idelete].split('_')[0]+"']");//取得群組
								if(objGrp.children("受文者,已刪除").length==0)
								{
									activeDept.find("受文者列表[序='"+pDeleteSeq[idelete].split('_')[0]+"']").remove();
								}
							}
							bDeleteSingle = true;
						}
					}
				}
				else
					alert("無重複受文者");
				//重建TABLE
				if(bDeleteSingle)
				{
					fnReGenTable();
				}
			}
		});
		//批次修正
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_btEdit").click(function() 
		$dlg.find("#Dept_btEdit").on("click", function() 
		{
			var bHasGrp = false;
			//var icheckboxlength = $("#receiverList").find("li.ui-table-item-PC").find("input[type='checkbox']").length;
			var icheckboxlength = $("#receiverList").find("input[id^='Dept_cel']").length;

			var arCheckedIdx = new Array();
			var checkElementSeq;//單筆時用來記錄被點選的畫面序
			for (var i = 0 ; i < icheckboxlength ; i++)
			{
				//if($("#receiverList").find("li.ui-table-item-PC").find("input[id^='Dept_cel_'"+i+"]")[0].checked)
				if($("#receiverList").find("div.ui-table-column-item").find("input[id^='Dept_cel_"+i+"']").prop("checked"))
				{
					checkElementSeq = i;//僅有一筆被勾選時會被用到
					//利用是否有含附件的鈕判斷是否有勾選群組
					if($("#Dept_dlattach_"+i).length==0)
						bHasGrp = true;
					
					arCheckedIdx[arCheckedIdx.length] = i+1;//xml的序
				}
			}
			//設定至全域物件，供子視窗回傳時，直接利用可對畫面做事情
			gMuitDeptSeq = arCheckedIdx;
			if(arCheckedIdx.length==0)
			{		
				alert('請先勾選欲修正的受文者資訊');
				return;
			}
			
			if(arCheckedIdx.length==1)
			{
				if(bHasGrp)//單一群組開啟
				{
					$("#receiverSetting").find(".ui-slide-pane-left").css("opacity","0.4");//隱藏受文者編輯子視窗
					fnOpenModeOrg(arCheckedIdx[0],"0",activeDept,theUserInfo,SOAPClient,SSO_CONFIG,"Grp");
				}
				else//單筆受文者
					fnOpenModifyWin("Dept_lbOrgname_"+checkElementSeq,"0");//非群組直接比照點選超聯結開法
			}
			else//多筆以上開啟修正子視窗批次MODE
			{
				$("#receiverSetting").find(".ui-slide-pane-left").css("opacity","0.4");//隱藏受文者編輯子視窗
				fnOpenModeOrg("","0",activeDept,theUserInfo,SOAPClient,SSO_CONFIG,"Muit")
			}
		});
		
		//排序功能
		//1081008	Joe		1080339		jQuery升級3.4.1
		// $dlg.find("#Dept_btSort").click(function(event) 
		$dlg.find("#Dept_btSort").on("click", function(event) 
		{
			//1051019	Cloud	修正排序功能-修改邏輯比照一代排序
			var all = activeDept.eq(0).children("已刪除, 受文者, 受文者列表");
			/*$all.sort(function(a, b) {
				var aNm = "", bNm = "";
				if($("#Dept_orderBy").val() == "本別") 
				{
					aNm = $(a).attr("本別");
					bNm = $(b).attr("本別");
				}
				else 
				{
					aNm = $(a).find("> 發文方式").text();
					bNm = $(b).find("> 發文方式").text();
				}
				return aNm.localeCompare(bNm);
			});
			activeDept.eq(0).children("已刪除, 受文者, 受文者列表").remove();
			$all.appendTo(activeDept);*/
			if (all.length==0) return;
			var OrgList = $(all);
			var SortList = new Array();
			//取得本別的大小 如 正本為 0 副本 為 4 
			for (var i = 0 ; i < OrgList.length ; i++)
			{
				if($("#Dept_orderBy").val() == "本別") 
				{					
					var nDocType = 100;
					for (var n = 0 ; n < gSort.length ; n++)
					{
						if ($(OrgList.get(i)).attr("本別")== gSort[n])
						{
							nDocType = n;
							break;
						}
					}
					SortList[i] = new Array(nDocType,i);
				}
				else
				{
					var nIssueType = 100;
					for (var n = 0 ; n < gIssueTypeSort.length ; n++)
					{
						if ($(OrgList.get(i)).find("發文方式").length==0)
							break;
						if ($(OrgList.get(i)).find("發文方式").text() == gIssueTypeSort[n])
						{
							nIssueType = n;
							break;
						}
					}
					SortList[i] = new Array(nIssueType,i);
				}
			}
			//利用javascript 陣列的排序找出 由上而下的順序
			SortList.sort(function(a,b){return(a[0]-b[0]);});
			
			var docElement = activeDept.get(0).ownerDocument;
			var newNode = docElement.createElement("受文者列表");
			newNode.appendChild(activeDept.find("文字")[0]);
			
			for (var k = 0 ; k < SortList.length; k++)
			{
				newNode.appendChild(OrgList[SortList[k][1]]);
			}
			activeDept = $(newNode);
			fnReGenTable();
		});
		
		//1100329 David 1090844 新增合併群組功能
		$dlg.find("#Dept_btMergeGrp").on("click", function(event) 
		{
			var icheckboxlength = $("#receiverList").find("input[id^='Dept_cel']").length;
			
			//1110517 David 1101455 紀錄預計合併的受文者含附件狀況
			let bHasAttach = false;
			let bNotHasAttach = false;
			let arAttach = new Array();

			var arCheckedIdx = new Array();
			for (var i = 0 ; i < icheckboxlength ; i++)
			{
				if($("#receiverList").find("div.ui-table-column-item").find("input[id^='Dept_cel_"+i+"']").prop("checked"))
				{
					var iCheckSeq = i+1;
					if(activeDept.find("[序='" + iCheckSeq + "']").attr('群組代號') == undefined)
						arCheckedIdx[arCheckedIdx.length] = iCheckSeq;//xml的序

					//1110517 David 1101455 紀錄預計合併的受文者含附件狀況
					let IsAttach = activeDept.find("受文者[序='"+iCheckSeq+"']").find("含附件").text();
					arAttach[arAttach.length] = IsAttach;
					if(IsAttach == "是")
						bHasAttach = true;
					if(IsAttach == "否")
						bNotHasAttach = true;
				}
			}
			if(arCheckedIdx.length==0 || arCheckedIdx.length == 1)
			{		
				alert('請先勾選至少2筆欲合併的受文者');
				return;
			}

			//1110517 David 1101455 如預計合併受文者含附件狀況不同時，新增訊息說明
			//var strNewGrpName = prompt('預計將序'+arCheckedIdx+' 合併為群組受文者，請輸入群組名稱');
			let strAttDesc = "";
			if(bHasAttach == bNotHasAttach)
				strAttDesc = "，且調整群組內受文者為含附件";
			var strNewGrpName = prompt('預計將序'+arCheckedIdx+' 合併為群組受文者' + strAttDesc + '，請輸入群組名稱');
			if(strNewGrpName != null)
			{
				if(strNewGrpName == "")
				{
					alert('請輸入群組名稱');
					return;
				}

				var XMLseq = receiverList.children.length+1;//XML物件內的紀錄於TAG內的序
				var newGrpNode = gXmlObj.createElement("受文者列表");
				newGrpNode.setAttribute("序",XMLseq);
				newGrpNode.setAttribute("本別",gDefaultdocType);
				newGrpNode.setAttribute("全銜", strNewGrpName);
				newGrpNode.setAttribute("正式名稱",strNewGrpName);
				newGrpNode.setAttribute("群組代號","");
				newGrpNode.setAttribute("SYSID","");
				if(strDLGUseTrace=="Y")
				{
					//1110517 David 修正既有BUG
					//newGrpNode.setAttribute("CreateSN",CreateSN);
					newGrpNode.setAttribute("CreateSN",gEditSn);
				}
				fnMakeNode("文字",strNewGrpName,newGrpNode);

				for(var iMergeGrp = 0 ; iMergeGrp < arCheckedIdx.length ; iMergeGrp ++)
				{
					var MergeGrpObj = activeDept.find("受文者[序='"+arCheckedIdx[iMergeGrp]+"']");
					//1130906	Joe		序986		修正受文者編輯子視窗合併群組本別功能異常
					// fnSetTextOfDeptElement(MergeGrpObj.find("本別"),gDefaultdocType);
					MergeGrpObj.attr("本別", gDefaultdocType);
					//1110517 David 1101455 依預計合併受文者的狀況判斷合併後的含附件
					//fnSetTextOfDeptElement(MergeGrpObj.find("含附件"),"是");
					if(strAttDesc != "")
						fnSetTextOfDeptElement(MergeGrpObj.find("含附件"),"是");
					else
						fnSetTextOfDeptElement(MergeGrpObj.find("含附件"),arAttach[iMergeGrp]);
					newGrpNode.append(MergeGrpObj[0]);
				}
				
				activeDept.append(newGrpNode);
				gRegenTable();
				gChangeCnt++;
			}
		});

		//1100329 David 1090844 新增展開群組功能
		$dlg.find("#Dept_btGrpDisband").on("click", function(event) 
		{
			var icheckboxlength = $("#receiverList").find("input[id^='Dept_cel']").length;
			
			var arCheckedIdx = new Array();
			for (var i = 0 ; i < icheckboxlength ; i++)
			{
				if($("#receiverList").find("div.ui-table-column-item").find("input[id^='Dept_cel_"+i+"']").prop("checked"))
				{
					var iCheckSeq = i+1;
					if(activeDept.find("[序='" + iCheckSeq + "']").attr('群組代號') != undefined)
						arCheckedIdx[arCheckedIdx.length] = iCheckSeq;//xml的序
				}
			}
			if(arCheckedIdx.length==0)
			{		
				alert('請先勾選欲展開的的群組受文者');
				return;
			}

			for(var iGrpDisband = 0 ; iGrpDisband < arCheckedIdx.length ; iGrpDisband ++)
			{
				var GrpDisbandObj = activeDept.find("受文者列表[序='"+arCheckedIdx[iGrpDisband]+"']");
				GrpDisbandObj.find("文字").remove();
				GrpDisbandObj.find("已刪除").remove();
				GrpDisbandObj.children().unwrap();
			}
			gRegenTable();
			gChangeCnt++;
		});

		//1110223 David 1101455 新增「單位/人員」按鈕開啟WEI001處理
		$dlg.find("#Dept_btWEI001").on("click", function(e) 
		{
			var strQry = "SAMLart="+localStorage.Artifact;

			var WebPage = SSO_CONFIG.getWSUrl("weorginfows");
			var strUrl = WebPage.substring(0,WebPage.lastIndexOf('/'))+"/WEI001.aspx?"+strQry;

			var $pane = $("div#WEI001_DIV");
			var $frame = $pane.find('iframe');
			if ($frame.length)
			{
				$frame.css("width", "70%").css("height", "60%").css("margin-top", "10%").css("margin-left", "15%");
				$frame[0].src = strUrl;
			}
			$("div#WEI001_DIV")[0].style="width:100%; height:100%; position:absolute; z-index:0"
			$pane.find(".ui-slide-pane-active").removeClass("ui-slide-pane-active");
			$pane.addClass("ui-slide-pane-active");
		});

		//1110223 David 1101455 新增WEI001關閉處理
		$dlg.find("div#WEI001_DIV").find("#WEI001Dlg_close_btn").on("click",function(event, obj)
		{
			var $pane = $("div#WEI001_DIV");
			var $frame = $pane.find('iframe');
			$frame[0].src = "";
			$("div#WEI001_DIV")[0].style="display: none";
			$("div#WEI001_DIV").find(".ui-slide-pane-active").removeClass("ui-slide-pane-active");
			$("div#WEI001_DIV").find(".ui-slide-pane-left").addClass("ui-slide-pane-active");

			if($("#txWEI001RtnValue").val() != "")
			{
				var sArr = $("#txWEI001RtnValue").val();
				$("#txWEI001RtnValue").val("");

				if(sArr != "")
				{
					//WEI001帶回時設定為多筆模式
					let bSingle = $("#Dept_rgNoSplit").prop("checked");
					$("#Dept_rgIsSplit").prop("checked",true);

					$("#Dept_txOrgName").val(sArr);
					fnAddnew("New");

					//加入完成後切回原本的設定值
					if(bSingle)
						$("#Dept_rgNoSplit").prop("checked",true);
				}
			}
		});
		
		//******************************************************各按鈕功能區******************************************************//
		//*******************共用函式區****************************//
		//初始化時建立畫面TABLE
		function fnInit(i, node)
		{
			var DeptInfo;
			//-追蹤修訂增加取得-取得建立者、刪除者
			var CreatSName = "";//用來顯示在TOOTIP的資訊
			var DeleteSName = "";					
			if(strDLGUseTrace=="Y")
			{
				CreatSName = fnGetSnName($(node),"CreateSN");//用來顯示在TOOTIP的資訊
				DeleteSName = fnGetSnName($(node),"DeleteSN");					
			}
			if(node.tagName=="受文者" || (node.tagName=="已刪除" && strDLGUseTrace=="Y"))
			{
				DeptInfo = 
				{
					"Seq": i+1,
					"Orgname": $(node).find("正式名稱").text(),
					"EmpName": $(node).find("姓名").text(),
					"OrgFullName": $(node).find("全銜").text(),
					"DocType": $(node).attr("本別"),
					"attach": $(node).find("含附件").text(),
					"docissuetype": $(node).find("發文方式").text(),
					"PostNo": $(node).find("郵遞區號").text(),
					"Address": $(node).find("地址").text(),
					"Email": $(node).find("Email").text(),
					"GrpName": $(node).find("文字").text(),
					"CreatSName": CreatSName,
					"DeleteSName": DeleteSName,
					//1141017	Joe		1141126		外貿增加傳真欄位
					"FaxNo": $(node).find("傳真").text(),
					//1141229 David 1141432 外貿增加欄位
					"NameAddress": $(node).find("名址條名稱").text()
					,"JobTitle": $(node).find("職稱").text()
				};
				fnCreatDeptTable(DeptInfo,node.tagName,i,node);
			}
			else if(node.tagName=="受文者列表")
			{
				//1051121 Cloud	增加判斷如為空白不給括號
				var GrpNo = jf_DeptTrim($(node).attr("群組代號"));
				if(GrpNo!="")
					GrpNo = "("+GrpNo+")";
					
				DeptInfo = 
				{
					"Seq": i+1,
					//1051219 Cloud	修正應撈取全銜
					//"OrgFullName": $(node).attr("正式名稱"),
					"OrgFullName": $(node).attr("全銜"),
					"DocType": $(node).attr("本別"),
					//1051121 Cloud	增加判斷如為空白不給括號
					//"GrpName": $(node).find("文字").text()+"("+$(node).attr("群組代號")+")",
					//1141017	Joe		1140064		調整受文者欄位應顯示為正式名稱
					// "GrpName": $(node).find("文字").text()+GrpNo,
					"GrpName": $(node).attr("正式名稱")+GrpNo,
					"CreatSName": CreatSName,
					"DeleteSName": DeleteSName,
				};
				fnCreatDeptTable(DeptInfo,node.tagName,i,node);
			}
		}
		
		//新增//argXmlindex為批次檢核時才有值，直接取SYSID
		function fnAddnew(argMode,argXmlindex)
		{
			//1130813 David 1130313 支援離線版非同步行為，新增Deferred處理
			var AddNewDfd = $.Deferred();

			//1060623 Cloud	1060147 如為中興大學自動檢核-判斷是否為群組
			var isGrpWork = false;
			if(argMode=="New")
				gAddnew = true
			
			if(argXmlindex==null)
			{
				//1100525 David 1100495 去空白
				$("#Dept_txOrgName").val(jf_DeptTrim($("#Dept_txOrgName").val()));
				$("#Dept_txEmpName").val(jf_DeptTrim($("#Dept_txEmpName").val()));
				//1070205 Cloud 增加判斷有sysid時(由選擇子視窗觸發，也往下進行)
				//if($("#Dept_txOrgName").val()=="" && $("#Dept_txEmpName").val()=="")
					if($("#Dept_txOrgName").val()=="" && $("#Dept_txEmpName").val()=="" && $("#Dept_txDeptSysId").val()=="")
						return;
				else if ($("#Dept_txOrgName").val()=="" && $("#Dept_txEmpName").val()!="")
					$("#Dept_txOrgName").val($("#Dept_txEmpName").val());
			}
			else
			{
				//1070507 Cloud 選擇子視窗回來不須再透過xml取得
				if(!gChooseBack)
				{
					if(activeDept.find("受文者列表[序='"+argXmlindex+"']").length!=0)//群組
					{
						$("#Dept_txDeptSysId").val(activeDept.find("受文者列表[序='"+argXmlindex+"']").attr("SYSID"));
						//1060111	Cloud	修正，匯入di受文者無法使用批次檢核帶回基資問題-匯入di不會有sysid 需用名稱
						$("#Dept_txOrgName").val(activeDept.find("受文者列表[序='"+argXmlindex+"']").attr("全銜"));
						//1060623 Cloud	1060147 如為中興大學自動檢核-判斷是否為群組
						//1061122	Cloud	批次檢核時，增加判斷如群組的SYSID及群組代碼不為空白，且相等時改以名稱檢核
						if(activeDept.find("受文者列表[序='"+argXmlindex+"']").attr("SYSID")==activeDept.find("受文者列表[序='"+argXmlindex+"']").attr("群組代號"))
							$("#Dept_txDeptSysId").val("");
						isGrpWork = true;
					}
					else//受文者
					{
						$("#Dept_txDeptSysId").val(activeDept.find("受文者[序='"+argXmlindex+"']").find("SYSID").text());
						//1060111	Cloud	修正，匯入di受文者無法使用批次檢核帶回基資問題-匯入di不會有sysid 需用名稱
						$("#Dept_txOrgName").val(activeDept.find("受文者[序='"+argXmlindex+"']").find("全銜").text());
					}
				}
				//檢核時 如沒有SYSID，表示資料庫，跳過不檢核直接下一筆
				//1060111	Cloud	修正，匯入di受文者無法使用批次檢核帶回基資問題-匯入di不會有sysid 需用名稱-mark
				/*if($("#Dept_txDeptSysId").val()=="")
					return;*/
				//設定目前檢核的受文者的序
				gCheckXmlindex = argXmlindex;
				
			}
			var params = new SOAPClientParameters();
			if($("#Dept_txDeptSysId").val()!="")
			{
				params.add('argSYSID', $("#Dept_txDeptSysId").val());
				params.add('OrgNo', theUserInfo.OrgID);
				params.add('DeptNo', theUserInfo.DepartID);
				params.add('UserID', theUserInfo.UserID);
				params.add('Artifact', theUserInfo.Artifact);
				//1070806 Cloud 1070685 修改叫用GetOrgInfo4ADWithDLKey-此功能不特別區分gDLWork=="Y"
				//SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetOrgbySYSID", params, false,function(r){
				params.add("argSeq", gDept_SeqNo.toString());
				params.add('argDocNo', qdocNo);
				//1121116      Joe      1120743     新增依匯入資料為主+批次檢核時不處理地址變動
				if(theSSO.User.SystemSets.DEPT_INCLUDE_RULE == "Y")
				{
					params.add('argPostNo', activeDept.find("受文者[序='"+argXmlindex+"']").find("郵遞區號").text());
					params.add('argAddress', activeDept.find("受文者[序='"+argXmlindex+"']").find("地址").text());
				}
				//1130227	Joe		序43		修正參數漏傳導致受文者無法正確帶入的問題--S
				else
				{
					params.add('argPostNo', "");
					params.add('argAddress', "");
				}
				//1130227	Joe		序43		修正參數漏傳導致受文者無法正確帶入的問題--E
				params.add('argDeptIncludeRule', theSSO.User.SystemSets.DEPT_INCLUDE_RULE);
				//1130813 David 1130313 支援離線版invokeJSON改為非同步行為
				//SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetOrgbySYSIDWithDLkey", params, false,function(r){
				SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetOrgbySYSIDWithDLkey", params, true,function(r)
				{
					//1060623 Cloud	1060147 如為中興大學自動檢核，整合GetOrgbySYSID部分新增函式一起處理
					//fnHandleDataIn(r)
					fnDataCheck(r,argXmlindex,isGrpWork);
					
					//1130813 David 1130313 支援離線版非同步行為，調整邏輯
					fnAddnewEnd();
					AddNewDfd.resolve();
				});
			}
			else 
			{
				gArOrgName = new Array();
				gArOrgFullName = new Array();
				var orgNameValue = $("#Dept_txOrgName").val();//一直使用.val()效能會不好-調整orgNameValue
				if($("#Dept_rgIsSplit").prop("checked"))
				{
					if(orgNameValue.indexOf(gSymbol)==-1)//沒有加入分割符號則表示單筆
					{
						//1120815	Joe		1120245		調整資料顯示方式改以|區隔
						// if(orgNameValue.lastIndexOf("（")!=-1)
							// orgNameValue = orgNameValue.substr(0,orgNameValue.lastIndexOf("（"));
						if(orgNameValue.lastIndexOf("｜")!=-1)
							orgNameValue = orgNameValue.substr(0,orgNameValue.lastIndexOf("｜"));
						$("#Dept_txOrgName").val(orgNameValue);
					}
					gArOrgName = $("#Dept_txOrgName").val().split(gSymbol);
					gArOrgFullName = $("#Dept_txOrgFullName").val().split(gSymbol);
				}
				else
				{
					//1060112 Cloud	調整因選單內會有（，單筆判斷有（時，進行切割
					//1120815	Joe		1120245		調整資料顯示方式改以|區隔
					// if(orgNameValue.lastIndexOf("（")!=-1)
						// $("#Dept_txOrgName").val(orgNameValue.substr(0,orgNameValue.lastIndexOf("（")));
					if(orgNameValue.lastIndexOf("｜")!=-1)
						$("#Dept_txOrgName").val(orgNameValue.substr(0,orgNameValue.lastIndexOf("｜")));
					gArOrgName.push($("#Dept_txOrgName").val());
					gArOrgFullName.push($("#Dept_txOrgFullName").val());
				}

				//1130813 David 1130313 支援離線版invokeJSON改為非同步行為
				/*for(var iDept=0;iDept<gArOrgName.length;iDept++)
				{	
					if(gArOrgName[iDept]=="")
						continue;
					
					gMultiOrgIdx = iDept;
					params.add('argFullName', gArOrgName[iDept]);
					params.add('OrgNo', theUserInfo.OrgID);
					params.add('DeptNo', theUserInfo.DepartID);
					params.add('UserID', theUserInfo.UserID);
					params.add('Artifact', theUserInfo.Artifact);
					//1070806 Cloud 1070685 修改叫用GetOrgInfo4ADWithDLKey-此功能不特別區分gDLWork=="Y"
					params.add("argSeq", gDept_SeqNo.toString());
					params.add('argDocNo', qdocNo);
					//SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetOrgInfo4AD", params, false,function(r)
					SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetOrgInfo4ADWithDLKey", params, false,function(r)
					{
						//1060102 Cloud	批次檢核時回傳資訊如空(資料庫沒有)，則不進行任何異動
						//1060623 Cloud	1060147 如為中興大學自動檢核，整合GetOrgbySYSID部分新增函式一起處理
						//if(argXmlindex==null || (argXmlindex!=null &&  r.value.Count!="0"))
							//fnHandleDataIn(r);
						fnDataCheck(r,argXmlindex,isGrpWork);	
						//1090219	Joe	1080764 	紀錄新增受文者不存在資料庫時處理--S
						if(gMultiOrgIdx==gArOrgName.length-1 && gNoDbDataList!="" && theSSO.User.SystemSets.get("WE_ALERT_ORGNOTINDB") == "1")
						{
							alert('以下受文者：'+gNoDbDataList+'，不存在資料庫，請確認是否修正。');
							gNoDbDataList = "";
						}
						//1090219	Joe	1080764 	紀錄新增受文者不存在資料庫時處理--E
					});
				}
				gArOrgName = new Array();
				gArOrgFullName = new Array();
				gMultiOrgIdx = -1;
				//1060111	Cloud	修正，匯入di受文者無法使用批次檢核帶回基資問題-匯入di不會有sysid 需用名稱-清空
				$("#Dept_txOrgName").val("");
				//1060621	Cloud	修正新增受文者後姓名欄位未清除問題
				$("#Dept_txEmpName").val("");*/

				function CallGetOrgInfo4ADWithDLKey(iDept)
				{
					if(iDept < gArOrgName.length)
					{
						if(gArOrgName[iDept]=="")
							CallGetOrgInfo4ADWithDLKey(iDept+1);
						else
						{
							gMultiOrgIdx = iDept;
							params.add('argFullName', gArOrgName[iDept]);
							params.add('OrgNo', theUserInfo.OrgID);
							params.add('DeptNo', theUserInfo.DepartID);
							params.add('UserID', theUserInfo.UserID);
							params.add('Artifact', theUserInfo.Artifact);
							params.add("argSeq", gDept_SeqNo.toString());
							params.add('argDocNo', qdocNo);
							SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetOrgInfo4ADWithDLKey", params, true,function(r)
							{
								fnDataCheck(r,argXmlindex,isGrpWork);
								
								CallGetOrgInfo4ADWithDLKey(iDept+1);
							});
						}
					}
					else//全部受文者已執行完
					{
						fnAfterGetOrgInfo4ADWithDLKey();
						fnAddnewEnd();
						AddNewDfd.resolve();
					}
				}
				CallGetOrgInfo4ADWithDLKey(0);

				//1130813 David 1130313 支援離線版非同步行為，改為CallBack邏輯
				function fnAfterGetOrgInfo4ADWithDLKey(){
					gArOrgName = new Array();
					gArOrgFullName = new Array();
					gMultiOrgIdx = -1;
					//1060111	Cloud	修正，匯入di受文者無法使用批次檢核帶回基資問題-匯入di不會有sysid 需用名稱-清空
					$("#Dept_txOrgName").val("");
					//1060621	Cloud	修正新增受文者後姓名欄位未清除問題
					$("#Dept_txEmpName").val("");
				}
			}
			
			//1130813 David 1130313 支援離線版非同步行為，改為CallBack邏輯
			function fnAddnewEnd(){
				gAddnew = false;
				$("input#Dept_txOrgName").focus();
				gChangeCnt++;
			}
			
			//1130813 David 1130313 支援離線版非同步行為，新增Deferred處理
			return AddNewDfd.promise();
		}
		//1060623 Cloud	1060147 如為中興大學自動檢核，整合GetOrgbySYSID部分新增函式一起處理-S
		function fnDataCheck(argData,argXmlindex,argIsGrp)
		{
			if(argXmlindex==null || (argXmlindex!=null &&  argData.value.Count!="0"))
				fnHandleDataIn(argData);
			//1060623 Cloud	1060147 如為中興大學自動檢核，為群組但不存在DB則逐個底下受文者進行檢核		
			if(gIsNcHuAutOcheck && (argXmlindex!=null && argData.value.Count=="0"))
			{
				if(!gIsAskForcheck)
				{
					//1090318 David 1090089 因已開放依參數判斷是否啟用，調整訊息內容
					//if(window.confirm("注意：系統偵測到「舊稿件受文者資\r　　　訊」與「系統資料庫（全校通\r　　　用）之受文者資訊」不符，是\r　　　否仍須帶入。\r\n選擇「確定」：系統自動帶入「舊稿件\r　　　受文者資訊」，並將上述偵測到\r　　　不符之處，以系統資訊取代。\r\n選擇「取消」：清除所有受文者資訊"))
					if(window.confirm("注意：系統偵測到「舊稿件受文者資訊」與「系統資料庫（機關通用）之\r　　　受文者資訊」不符，是否仍須帶入。\r\n選擇「確定」：系統自動帶入「舊稿件受文者資訊」，並將上述偵測到不\r　　　符之處，以系統資訊取代。\r\n選擇「取消」：清除所有受文者資訊"))
						gIsKeepAutOCheck = true;
					else//刪除所有受文者
					{
						activeDept.eq(0).children("已刪除, 受文者, 受文者列表").remove();
						gIsKeepAutOCheck = false;
					}
					gIsAskForcheck = true;
				}
				
				if(gIsKeepAutOCheck)
				{
					if(argIsGrp)//非群組時僅會跳出訊息，受文者TAG不異動
					{
						var oDeptInGrp = activeDept.find("受文者列表[序='"+argXmlindex+"']").find("受文者");
						//1130813 David 1130313 支援離線版invokeJSON改為非同步行為，調整呼叫fnAddnew()邏輯
						/*for(var iDeptInGrp=0;iDeptInGrp<oDeptInGrp.length;iDeptInGrp++)
						{
							var oDeptInGrpSeq = oDeptInGrp.eq(iDeptInGrp).attr("序");
								fnAddnew("CHECK",oDeptInGrpSeq);
						}*/
						function doKeepAutoCheck(iDeptInGrp)
						{
							if(iDeptInGrp < oDeptInGrp.length)
							{
								var oDeptInGrpSeq = oDeptInGrp.eq(iDeptInGrp).attr("序");
								fnAddnew("CHECK",oDeptInGrpSeq).done(function() {
									doKeepAutoCheck(iDeptInGrp+1);
								});
							}
						}
						doKeepAutoCheck(0);
					}
				}
			}			
		}
		//1060623 Cloud	1060147 如為中興大學自動檢核，整合GetOrgbySYSID部分新增函式一起處理-S
		//新增受文者-WS回傳資料處理`;argXmlIndex為批次檢核時才有值，用回傳物件取代原物件
		function fnHandleDataIn(argData)
		{			
			var XMLseq = receiverList.children.length+1;//XML物件內的紀錄於TAG內的序<受文者 序>
			var seq =receiverList.children.length;//畫面物件內的INDEX順序
			if(argData.value.IsGrp == false)//非群組
			{
				if(argData.value.Count=="1")//回傳僅有一筆
				{
					if(argData.value.Email[0].indexOf('|')!=-1)//有兩筆以上Eamil開啟人員選擇子視窗
					{
						var XmlSeq = receiverList.children.length+1;
						fnOpenWinChoose(argData,"Emp",$dlg,"",XmlSeq);
						//建立空白畫面-由子視窗回傳後取代
						var DeptInfo = 
						{
							"Seq": XMLseq,
							"OrgName": "",
							"EmpName": "",
							"OrgFullName": "",
							"DocType": "",
							"attach": "",
							"defaultIssueType": "",
							"PostNo": "",
							"Address": "",
							"Email": "",
							"GrpName": "",
							"CreatSName": "",
							"DeleteSName": "",
							"CreateSN":gEditSn,
							//1090915	Joe		1090555		信保新增銀行代碼資訊
							"Bank":"",
							"BankSub":"",
						};
						fnCreatDeptTable(DeptInfo,"受文者",XmlSeq);
						//1060623 Cloud	1060147 如為中興大學自動檢核有自資料庫取得資料則設定為ture，但自動檢核時才跳出不同訊息
						gIsKeepAutOCheck = true;
					}
					else
					{
						fnAddOneNewDept(argData.value,seq,XMLseq,"單筆");
						//1060623 Cloud	1060147 如為中興大學自動檢核有自資料庫取得資料則設定為ture，但自動檢核時才跳出不同訊息
						gIsKeepAutOCheck = true;
					}
				}
				else if(argData.value.Count=="0")//不存在資料庫
				{
					//if(gCheckXmlindex==-1)//表示為新增，如不存在DB，不進行檢核
					//1070806	Cloud 1070685 增加取得識別碼
					if(gDLWork=="Y")
					{
						theWebServices.getDocHash(theUserInfo.OrgID, qdocNo+gDept_SeqNo.toString())
								.done(function(rtnValue) {
									gDlid = rtnValue;
							fnAddOneNewDept(null,seq,XMLseq,"單筆");
						})
						.fail(function(errorText) {
							alert("呼叫取得識別碼函式發生錯誤，請聯絡系統管理人。\r\n錯誤訊息：" + errorText);
						});
					}
					else
						fnAddOneNewDept(null,seq,XMLseq,"單筆");
					//1090219	Joe	1080764 	紀錄新增受文者不存在資料庫時處理
					if(gNoDbDataList!="")
						gNoDbDataList +="、";
					gNoDbDataList +=jf_DeptTrim(gArOrgName[gMultiOrgIdx]);
				}
				else//回傳資料超過兩筆以上-開啟選擇子視窗
				{
					//增加取得現在受文者數量
					var XmlSeq = receiverList.children.length+1;
					//1120117 David 判斷如為批次檢核時，需傳入對應的受文者序
					if(gCheckXmlindex != -1)
						XmlSeq = gCheckXmlindex;
					fnOpenWinChoose(argData,"Org",$dlg,"",XmlSeq);
					//建立空白畫面-由子視窗回傳後取代
					//1070205 Cloud NCKU107169 改為選擇後由sysid重新呼叫ws新增
					/*var DeptInfo = 
					{
						"Seq": XMLseq,
						"Orgname": "",
						"EmpName": "",
						"OrgFullName": "",
						"DocType": "",
						"attach": "",
						"docissuetype": "",
						"PostNo": "",
						"Address": "",
						"Email": "",
						"GrpName": "",
						"CreatSName": "",
						"DeleteSName": "",
						"CreateSN":gEditSn,
					};
					fnCreatDeptTable(DeptInfo,"受文者",XmlSeq);*/
					//1070507	Cloud	修正加入時多筆受文者重複時，選擇子視窗不會消失問題
					var DeptInfo = 
					{
						"Seq": XMLseq,
						"OrgName": "",
						"EmpName": "",
						"OrgFullName": "",
						"DocType": "",
						"attach": "",
						"defaultIssueType": "",
						"PostNo": "",
						"Address": "",
						"Email": "",
						"GrpName": "",
						"CreatSName": "",
						"DeleteSName": "",
						"CreateSN":gEditSn,
						//1090915	Joe		1090555		信保新增銀行代碼資訊
						"Bank":"",
						"BankSub":"",
					};
					fnAddOneNewDept(null,seq,XMLseq,"單筆");
					//1060623 Cloud	1060147 如為中興大學自動檢核有自資料庫取得資料則設定為ture，但自動檢核時才跳出不同訊息
					gIsKeepAutOCheck = true;
				}
			}
			else 
			{
				fnAddGrpNewDept(argData.value,seq,XMLseq);
			}
		
			fnReSet();
		}
		//新增單一收文者-含群組展開
		//增加傳入參數，為XML內要被插入節點、畫面被取代的資訊(選擇子視窗回傳呼叫處理)
		//function fnAddOneNewDept(r,seq,XMLseq,argMode,argGrpIndex)
		function fnAddOneNewDept(r,seq,XMLseq,argMode,argGrpIndex,argChooseXmlPrveSeq,argChooseSeq)
		{
			var OrgFullName="";
			var EmpName =$("#Dept_txEmpName").val();
			var strDocIssueType = defaultIssueType;
			var DeptInfo;
			var orgName;
			var docType = gDefaultdocType;
			//1050818 Cloud	配合IE建立節點修改
			var CreateSN =gEditSn;
			if(argMode=="群組")//此為新增受文者為群組-展開-群組建立方式分為匯入、新增兩種方式 WS皆會回傳有值物件
			{
				OrgFullName = r.OrgName[argGrpIndex];//受文者(正式名稱)
				
				if(r.DocType[argGrpIndex]!="")
					docType = r.DocType[argGrpIndex];
				//1050920	Cloud	Cloud	1050087		修正主持人、列席者、出席者寫入受文者時寫入錯誤資訊bug
				//var IsAttach = (docType=="正本" || "主持人、出席者、列席者".indexOf(docType) != -1)?"是":"否";
				//1060112	Cloud	修正開會通知單主持、列席、出席附件預設錯誤問題
				//var IsAttach = (docType=="正本" || "主持、出席、列席".indexOf(docType) != -1)?"是":"否";
				var IsAttach = (docType=="正本" || "主持人、出席者、列席者".indexOf(docType) != -1)?"是":"否";
				//1140728 David 1140381 有設定附件分繕時，新加入受文者預設不含附件，並設定附件分繕異動旗標
				if(ghasDispatchAtt)
					IsAttach = "否";
				gdmObj.needSaveDispatchAtt(true);

				//若為內部單位，依系統參數WE_UNITTITLE設定全銜
				if(strWeUnitTitle != "" && r.IsInside[argGrpIndex] == "Y" && r.OrgID[argGrpIndex] == theUserInfo.OrgID)
				{
					//1060908 Cloud 修正使用錯誤參數
					//OrgFullName = strWeUnitTitle+OrgName;
					OrgFullName = strWeUnitTitle+OrgFullName;
				}
				if(gCheckXmlindex!=-1)//為CHECK時取得當前受文者建立資訊
				{
					docType = activeDept.find("受文者列表[序='"+gCheckXmlindex+"']").attr("本別");
				}
				strDocIssueType = fungetIssueType(r.defaultIssueType[argGrpIndex],"單筆");//將資料庫發文方式轉換	
				//1090915	Joe		1090555		信保新增銀行代碼資訊--S
				var Bank = r == null ? "" : r.Bank[argGrpIndex] == null ? "" : r.Bank[argGrpIndex];
				var BankSub = r == null ? "" : r.BankSub[argGrpIndex] == null ? "" : r.BankSub[argGrpIndex];
				//1090915	Joe		1090555		信保新增銀行代碼資訊--E
				//製作TABLE 用的物件資訊
				DeptInfo =
				{
					"Seq": XMLseq,
					"Orgname": r.OrgName[argGrpIndex],
					"EmpName": "",//群組展開不寫姓名
					"OrgFullName": OrgFullName,
					"DocType": docType,
					"attach": IsAttach,
					"docissuetype": strDocIssueType,
					"PostNo": r.PostNo[argGrpIndex],
					"Address": r.Address[argGrpIndex],
					"Email": r.Email[argGrpIndex],
					"GrpName": "",
					"CreatSName": theUserInfo.UserName,
					"DeleteSName": "",
					//1050818 Cloud 增加傳入建立者資訊
					"CreateSN":CreateSN,
					//1090915	Joe		1090555		信保新增銀行代碼資訊--S
					"Bank":Bank,
					"BankSub":BankSub,
					//1090915	Joe		1090555		信保新增銀行代碼資訊--E
				};
			}
			else//單一受文者
			{
				OrgFullName = jf_DeptTrim($("#Dept_txOrgFullName").val());
				var Int = new RegExp("\[^a-zA-Z0-9\]","g");//檢查是否有非數字及英文字 字元

				if(r!=null)
				{
					if (gTakeFullName != 0)//要以正式名稱取代別名
						orgName= r.OrgName[0];
					else if (!Int.test(orgName))//若是英數字就帶回則直接帶回
					{
						orgName= r.OrgName[0];
					}
					else if (jf_DeptTrim(orgName) == '')//空白(callback)
						orgName= r.OrgName[0];

					if(jf_DeptTrim(r.DocType[0])!="")
						docType = jf_DeptTrim(r.DocType[0]);

					//有資料庫資訊時-將資料庫發文方式轉換
					strDocIssueType = fungetIssueType(r.defaultIssueType[0],"單筆");
				}
				else
				{
					orgName = jf_DeptTrim(gArOrgName[gMultiOrgIdx]);
				}

				if (gCopyNameTo == 1)
					OrgFullName = orgName;
				else if(gInclude)
					OrgFullName = orgName;
				else if(gMultiOrgIdx != -1 && gArOrgFullName[gMultiOrgIdx] != null)
				{
					if (jf_DeptTrim(gArOrgFullName[gMultiOrgIdx]) == "" & gCopyNameTo == 2)
						OrgFullName = orgName;
					else
						OrgFullName = gArOrgFullName[gMultiOrgIdx];
				}
				else if (jf_DeptTrim($("#Dept_txOrgFullName").val()) == "" && gCopyNameTo == 2)
					OrgFullName = orgName;
					
				//判斷若為內部單位，依系統參數WE_UNITTITLE設定全銜
				if(r!=null)
				{
					if(strWeUnitTitle != "" && r.IsInside[0] == "Y" && r.OrgID[0] == theUserInfo.OrgID)
					{
						OrgFullName = strWeUnitTitle+OrgFullName;
					}

					//1110223 David 1101455 有回傳人員別名表示為內部人員，依別名設定正副本稱謂
					if(r.UserAlias[0] && r.UserAlias[0] != '')
						OrgFullName = r.UserAlias[0];
				}
				//姓名不為空時全銜改為姓名
				//1071109 Cloud 修正取代時機點
				/*if(EmpName!="")
					OrgFullName = EmpName;*/

				if(gInclude)//匯入時，使用物件內姓名(即匯入時的資訊)
				{
					EmpName = r.EmpName[0];
					//1071109 Cloud 修正取代時機點
					if(EmpName!="")
						OrgFullName = EmpName;
					
					//1141229 David 1141432 依匯入時的正副本稱謂使用
					if(r.OrgFullName && r.OrgFullName[0] != null && r.OrgFullName[0] != "")
						OrgFullName = r.OrgFullName[0];
				}
				
				//1110816 David 有別名時，帶入姓名欄位
				if(r!=null && r.UserAlias[0] && r.UserAlias[0] != '')
					EmpName = r.UserAlias[0];

				//1101119 David 1101333 修正批次檢核正副本稱謂處理後，資料還是為空時預設為受文者名稱
				if(OrgFullName == "") OrgFullName = orgName;

				//1050920	Cloud	Cloud	1050087		修正主持人、列席者、出席者寫入受文者時寫入錯誤資訊bug
				//var IsAttach = (docType=="正本" || "主持人、出席者、列席者".indexOf(docType) != -1)?"是":"否";
				//1060112	Cloud	修正開會通知單主持、列席、出席附件預設錯誤問題
				//var IsAttach = (docType=="正本" || "主持、出席、列席".indexOf(docType) != -1)?"是":"否";
				var IsAttach = (docType=="正本" || "主持人、出席者、列席者".indexOf(docType) != -1)?"是":"否";
				//1141229 David 1141432 新增外貿客製化匯入欄位處理
				//1141231	Leslie[北榮-序479]	修正無法加入不存在的受文者的問題(加入"!!r &&")
				if(!!r && r.attach && r.attach[0] && (r.attach[0] == "是" || r.attach[0] == "否"))
					IsAttach = r.attach[0];

				//製作TABLE 用的物件資訊
				//1050818 Cloud	配合IE修改建立節點方式，優先取得資訊
				if(strDLGUseTrace=="Y")//追蹤修訂啟用
				{
					if(gCheckXmlindex!=-1)//為CHECK時取得當前受文者建立資訊
						// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
						// CreateSN = activeDept.find("受文者[序='"+gCheckXmlindex+"']").attr("CreateSN");
						CreateSN = HtmlEncode(activeDept.find("受文者[序='"+gCheckXmlindex+"']").attr("CreateSN"));
				}
				if(gCheckXmlindex!=-1)//為CHECK時取得當前受文者建立資訊
				{
					// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
					// docType = activeDept.find("受文者[序='"+gCheckXmlindex+"']").attr("本別");
					// IsAttach = activeDept.find("受文者[序='"+gCheckXmlindex+"']").find("含附件").text();
					docType = HtmlEncode(activeDept.find("受文者[序='"+gCheckXmlindex+"']").attr("本別"));
					IsAttach = HtmlEncode(activeDept.find("受文者[序='"+gCheckXmlindex+"']").find("含附件").text());
				}
				else
				{
					//1140728 David 1140381 有設定附件分繕時，新加入受文者預設不含附件，並設定附件分繕異動旗標
					if(ghasDispatchAtt)
						IsAttach = "否";
					gdmObj.needSaveDispatchAtt(true);
				}

				//1090318 David 1090089 新增高榮客製化讀入受文者列表後自動檢核邏輯
				var strPostalCode = r == null ? "" : r.PostNo == null ? "" : r.PostNo[0];
				var strAddress = r == null ? "" : r.Address == null ? "" : r.Address[0];
				var strEmail = r == null ? "" : r.Email == null ? "" : r.Email[0];
				if(gIsNcHuAutOcheck && gCheckXmlindex != -1)
				{
					let strInternalID = r == null ? "" : r.Internal == null ? "" : r.Internal[0];
					// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
					// let strOriginalTitle = activeDept.find("受文者[序='"+gCheckXmlindex+"']").find("全銜").text();
					// let strOriginalPostalCode = activeDept.find("受文者[序='"+gCheckXmlindex+"']").find("郵遞區號").text();
					// let strOriginalAddress = activeDept.find("受文者[序='"+gCheckXmlindex+"']").find("地址").text();
					// let strOriginalEmail = activeDept.find("受文者[序='"+gCheckXmlindex+"']").find("Email").text();
					let strOriginalTitle = HtmlEncode(activeDept.find("受文者[序='"+gCheckXmlindex+"']").find("全銜").text());
					let strOriginalPostalCode = HtmlEncode(activeDept.find("受文者[序='"+gCheckXmlindex+"']").find("郵遞區號").text());
					let strOriginalAddress = HtmlEncode(activeDept.find("受文者[序='"+gCheckXmlindex+"']").find("地址").text());
					let strOriginalEmail = HtmlEncode(activeDept.find("受文者[序='"+gCheckXmlindex+"']").find("Email").text());

					if(strInternalID != "")
					{
						//內部單位不更新正副本稱謂
						if(strOriginalTitle != "")
							OrgFullName = strOriginalTitle;
					}
					else
					{
						//外機關不更新正副本稱謂、郵遞區號、地址、EMAIL
						if(strOriginalTitle != "")
							OrgFullName = strOriginalTitle;

						strPostalCode = strOriginalPostalCode;
						strAddress = strOriginalAddress;
						strEmail = strOriginalEmail;
					}

					if(r!=null)
					{
						r.PostNo[0] = strPostalCode;
						r.Address[0] = strAddress;
						r.Email[0] = strEmail;
					}
				}
				
				//1090915	Joe		1090555		信保新增銀行代碼資訊--S
				var Bank = r == null ? "" : r.Bank == null ? "" : r.Bank[0];
				var BankSub = r == null ? "" : r.BankSub == null ? "" : r.BankSub[0];
				//1090915	Joe		1090555		信保新增銀行代碼資訊--E

				//1141021	Joe		1141126		新增可匯入傳真號碼
				//1141229 David 1141432 新增外貿客製化匯入欄位處理
				//var FaxNo = r == null ? "" : r.FaxNo == null ? "" : r.FaxNo;
				//1150112 David 序19 修正物件判斷
				//let FaxNo = r == null ? "" : r.FaxNo == null ? "" : r.FaxNo[0];
				//let NameAddress = r == null ? "" : r.NameAddress == null ? "" : r.NameAddress[0];
				//let JobTitle = r == null ? "" : r.JobTitle == null ? "" : r.JobTitle[0];
				let FaxNo = r?.FaxNo?.[0] ?? "";
				let NameAddress = r?.NameAddress?.[0] ?? "";
				let JobTitle = r?.JobTitle?.[0] ?? "" ;

				DeptInfo =
				{
					"Seq": XMLseq,
					"Orgname": orgName,
					"EmpName": EmpName,
					"OrgFullName": OrgFullName,
					"DocType": docType,
					"attach": IsAttach,
					"docissuetype": strDocIssueType,
					//1090318 David 1090089 調整資料來源
					//"PostNo": r == null ? "" : r.PostNo == null ? "" : r.PostNo[0] ,
					//"Address": r == null ? "" : r.Address == null ? "" : r.Address[0],
					//"Email": r == null ? "" : r.Email == null ? "" : r.Email[0],
					"PostNo": strPostalCode,
					"Address": strAddress,
					"Email": strEmail,
					"GrpName": "",
					"CreatSName": theUserInfo.UserName,
					"DeleteSName": "",
					//1050818 Cloud 增加傳入建立者資訊
					"CreateSN":CreateSN,
					//1090915	Joe		1090555		信保新增銀行代碼資訊--S
					"Bank":Bank,
					"BankSub":BankSub,
					//1090915	Joe		1090555		信保新增銀行代碼資訊--E
					//1141021	Joe		1141126		新增可匯入傳真號碼
					"FaxNo":FaxNo,
					//1141229 David 1141432 新增外貿客製化匯入欄位處理
					"NameAddress":NameAddress
					,"JobTitle":JobTitle
				};
			}
										
			//建立畫面資訊
			if(gCheckXmlindex==-1)//表示為非CHECK-才需要建立TABLE
				//增加傳入要被取代的物件序
				//fnCreatDeptTable(DeptInfo,"受文者",seq);
				fnCreatDeptTable(DeptInfo,"受文者",seq,null,argChooseSeq);
			//1070507 Cloud 有gCheckXmlindex時，序應該為gCheckXmlindex
			else
				XMLseq = gCheckXmlindex;
			
			var nodeDeptInfo = "";							
			
			//建立新節點FOR 受文者物件//傳入WS回傳物件，序，經過轉換的發文方式，預設不含附件、單筆不傳入群組序、畫面上本別預設選單
			if(argMode=="群組")//群組展開，需傳入[argGrpIndex]-WS物件回傳的群組物件內目前受文者的INDEX
			{
				//1080315 David 1080221 修正加入群組受文者且展開時，含附件畫面資料錯誤問題
				//nodeDeptInfo = fnCreatNewNode(r,XMLseq,strDocIssueType,"否",argGrpIndex,docType,DeptInfo);
				nodeDeptInfo = fnCreatNewNode(r,XMLseq,strDocIssueType,IsAttach,argGrpIndex,docType,DeptInfo);
			}
			else
			{
				if(r!=null)//r為DB回傳資料
					//1051109	 Cloud	修正附件預設值
					//nodeDeptInfo = fnCreatNewNode(r,XMLseq,strDocIssueType,"否",null,docType,DeptInfo);
					nodeDeptInfo = fnCreatNewNode(r,XMLseq,strDocIssueType,IsAttach,null,docType,DeptInfo);
				else//DB無資料-用輸入資料建立XML
					//1051109	 Cloud	修正附件預設值
					//nodeDeptInfo = fnCreatNewNode(null,XMLseq,strDocIssueType,"否",null,docType,DeptInfo);
					nodeDeptInfo = fnCreatNewNode(null,XMLseq,strDocIssueType,IsAttach,null,docType,DeptInfo);
			}
			//將節點加入受文者列表物件
			
			if(gCheckXmlindex==-1)//表示為非CHECK新增而不以replaceWith方式
			{
				//1050818 Cloud	配合調整createnode方式，修改調整以下行為改為fnCreatNewNode裡建立節點時使用
				/*if(strDLGUseTrace=="Y")//紀錄建立流程
					activeDept.append("<受文者 本別='"+docType+"' 序='"+XMLseq+"' CreateSN='"+gEditSn+"'>"+nodeDeptInfo+"</受文者>");
				else
					activeDept.append("<受文者 本別='"+docType+"' 序='"+XMLseq+"' >"+nodeDeptInfo+"</受文者>");*/

				//增加判斷有傳入欲插入序時將XML資訊插入(選擇子視窗回傳)
				if(argChooseXmlPrveSeq!=-1 && argChooseXmlPrveSeq!=undefined)
				{
					var node = activeDept.find("受文者[序='"+argChooseXmlPrveSeq+"']");
					
					if(node.length==0)
						node = activeDept.find("受文者列表[序='"+argChooseXmlPrveSeq+"']");

					$(nodeDeptInfo).insertAfter(node);
				}
				else
					activeDept.append(nodeDeptInfo);
			}
			else
			{
				//1050818 Cloud	配合調整createnode方式，修改調整以下行為改為fnCreatNewNode裡建立節點時使用
				/*if(strDLGUseTrace=="Y")//保留建立流程
				{
					var CreateSN = activeDept.find("受文者[序='"+gCheckXmlindex+"']").attr("CreateSN");
					activeDept.find("受文者[序='"+gCheckXmlindex+"']").replaceWith("<受文者 本別='"+docType+"' 序='"+gCheckXmlindex+"' CreateSN='"+CreateSN+"'>"+nodeDeptInfo+"</受文者>");
				}
				else
					activeDept.find("受文者[序='"+gCheckXmlindex+"']").replaceWith("<受文者 本別='"+docType+"' 序='"+gCheckXmlindex+"' >"+nodeDeptInfo+"</受文者>");*/

				//1120919 David 1120668 批次檢核完成後，受文者編號屬性資料需保留原本的編號，避免分繕表判斷異常
				$(nodeDeptInfo).attr("編號", activeDept.find("受文者[序='"+gCheckXmlindex+"']").attr("編號"));

				activeDept.find("受文者[序='"+gCheckXmlindex+"']").replaceWith(nodeDeptInfo);
			}
		}
		//新增群組受文者
		function fnAddGrpNewDept(r,seq,XMLseq)
		{
			//群組展開
			//(1)新增時勾選群組展開
			//(2)匯入時，未勾選匯入至一群組
			//(3)查詢帶回時，子視窗勾選帶回時展開群組
			//(4)gCheckXmlindex==-1 表示為檢核時呼叫
			//1050818 Cloud	配合IE修改建立節點方式增加屬性提供給群組使用
			var CreateSN=gEditSn;
			if(((gAddnew && $("input#Dept_cbExpGroup").prop("checked")) || (gInclude && $("input#Dept_cbAutoGroup").prop("checked")==false) ||
				(gShearch && $("input#RtnIsExpand").val()!="1")) &&  gCheckXmlindex==-1)//argCheckXmlIndex-Check模式有值，checkmode不會做展開
			{
				gGrpExpand = true;
				for(var nGrp=1;nGrp<r.OrgID.length;nGrp++)
				{
					if (r.ContactPsn[nGrp] == "NICK") continue;	
					var XMLseq = receiverList.children.length+1;//XML物件內的紀錄於TAG內的序<受文者 序>
					var seq =receiverList.children.length;//畫面物件內的INDEX順序
					
					fnAddOneNewDept(r,seq,XMLseq,"群組",nGrp);
				}
			}
			else//群組不展開
			{
				var OrgFullName = r.OrgName[0];
				var OrgName = r.OrgName[0];
				//1100329 David 1090844 無OrgID時不需顯示
				//var GrpName = r.OrgName[0]+"("+r.OrgID[0]+")";
				var GrpName = r.OrgName[0];
				if(r.OrgID[0] != "")
					GrpName += "("+r.OrgID[0]+")";
				var GrpNo = r.OrgID[0];
				var SYSID = r.SysId[0];
				var docType = gDefaultdocType;
				//1050818 Cloud	配合IE調整建立節點方式宣告新節點
				var newGrpNode;
				if($("#Dept_txOrgFullName").val()!="")//以畫面輸入的正副本稱謂為主
					OrgFullName = $("#Dept_txOrgFullName").val();

				if(r.DocType[0]!="")
					docType = r.DocType[0];
					
				if(gInclude)//匯入時，受文者、正副本稱謂使用檔名GrpNo = SYSID給空白
				{
					OrgFullName = GrpName = OrgName = gIncludeGrpName;
					GrpNo = SYSID = "";
					//1060809	Cloud	[1060716] 一併調整一併調整恢復匯入至一群組名稱預設值時機點恢復預設值時機點
					gIncludeGrpName = "";
				}
				var IsAttach = (docType=="正本" || "主持人、出席者、列席者".indexOf(docType) != -1)?"是":"否";
				//1050818 Cloud	配合IE修改建立節點方式資訊提早取得
				//1070507 Cloud	檢核，且非由選擇視窗回傳
				//if(gCheckXmlindex!=-1)
				if(gCheckXmlindex!=-1 && !gChooseBack)
				{
					// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
					// CreateSN = activeDept.find("受文者列表[序='"+gCheckXmlindex+"']").attr("CreateSN");
					CreateSN = HtmlEncode(activeDept.find("受文者列表[序='"+gCheckXmlindex+"']").attr("CreateSN"));
					//1060104 Cloud	補上檢核不異動本別
					// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
					// docType = activeDept.find("受文者列表[序='"+gCheckXmlindex+"']").attr("本別");
					docType = HtmlEncode(activeDept.find("受文者列表[序='"+gCheckXmlindex+"']").attr("本別"));
				}
				//1140728 David 1140381 有設定附件分繕時，新加入受文者預設不含附件，並設定附件分繕異動旗標
				if(ghasDispatchAtt)
					IsAttach = "否";
				gdmObj.needSaveDispatchAtt(true);

				//1090318 David 1090089 紀錄原來的群組全銜
				if(gIsNcHuAutOcheck && gCheckXmlindex != -1)
				{
					// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
					// var strGrpTitle = activeDept.find("受文者列表[序='"+gCheckXmlindex+"']").attr("全銜");
					var strGrpTitle = HtmlEncode(activeDept.find("受文者列表[序='"+gCheckXmlindex+"']").attr("全銜"));
					if(strGrpTitle != "")
						OrgFullName = strGrpTitle;
				}
				//1090915	Joe		1090555		信保新增銀行代碼資訊--S
				var Bank = r == null ? "" : r.Bank[0] == null ? "" : r.Bank[0];
				var BankSub = r == null ? "" : r.BankSub[0] == null ? "" : r.BankSub[0];
				//1090915	Joe		1090555		信保新增銀行代碼資訊--E
			
				var DeptInfo = 
				{
					"Seq": XMLseq,
					"Orgname": OrgName,
					"EmpName": "",
					"OrgFullName": OrgFullName,
					"DocType": docType,
					"attach": IsAttach,
					"docissuetype": defaultIssueType,
					"PostNo": "",
					"Address": "",
					"Email": "",
					"GrpName": GrpName,
					"CreatSName": theUserInfo.UserName,
					"DeleteSName": "",
					//1050818 Cloud 增加傳入建立者資訊
					"CreateSN":CreateSN,
					//1090915	Joe		1090555		信保新增銀行代碼資訊--S
					"Bank":Bank,
					"BankSub":BankSub,
					//1090915	Joe		1090555		信保新增銀行代碼資訊--E
				};
				
				if(gCheckXmlindex==-1)//表示為非CHECK-才需要建立TABLE
					fnCreatDeptTable(DeptInfo,"受文者列表",seq);
				else//非-1時替換序
					XMLseq = gCheckXmlindex;
					
				newGrpNode = gXmlObj.createElement("受文者列表");
				newGrpNode.setAttribute("序",XMLseq);
				newGrpNode.setAttribute("本別",docType);
				//1080605 Zen 1080458 修正受文者編輯子視窗新增群組受文者後正副本稱謂未同步更新至文面之問題
				//newGrpNode.setAttribute("全銜",OrgName);
				newGrpNode.setAttribute("全銜", OrgFullName);
				newGrpNode.setAttribute("正式名稱",OrgName);
				newGrpNode.setAttribute("群組代號",GrpNo);
				newGrpNode.setAttribute("SYSID",SYSID);
				if(strDLGUseTrace=="Y")
					newGrpNode.setAttribute("CreateSN",CreateSN);
				
				var GrpWord = gXmlObj.createElement("文字");
				//1050923 Cloud	群組名稱-不加入群組代號-顯示於子視窗時，才加上群組代號
				//fnMakeNode("文字",GrpName,newGrpNode);
				//1051121 Cloud 匯入時，受文者、正副本稱謂使用檔名GrpNo = SYSID給空白
				if(gInclude)
				{
					fnMakeNode("文字",OrgName,newGrpNode);
				}
				else				
				{				
					//1080605 Zen 1080458 修正受文者編輯子視窗新增群組受文者後正副本稱謂未同步更新至文面之問題
					//fnMakeNode("文字",r.OrgName[0],newGrpNode);
					fnMakeNode("文字", OrgFullName, newGrpNode);
				}

				//調整fnCreatDeptlist直接建立整個受文者列表
				//DeptInfo = fnCreatDeptlist(r,XMLseq,"否",docType);
				//1050923	Cloud	1050087		修正加入群組時，群組內受文者附件預設異常問題
				//DeptInfo = fnCreatDeptlist(r,XMLseq,"否",docType,newGrpNode);
				DeptInfo = fnCreatDeptlist(r,XMLseq,IsAttach,docType,newGrpNode);
				//1050818 Cloud 配合ie環境修改建立節點方式
				if(gCheckXmlindex==-1)//表示為非CHECK
				{
					/*if(strDLGUseTrace=="Y")//追蹤修訂時增加建立者資訊
						activeDept.append("<受文者列表 本別='"+docType+"' 序='"+XMLseq+"' 全銜='"+OrgName+"' 正式名稱='"+OrgName+"' 群組代號='"+GrpNo+"' SYSID='"+SYSID+"' CreateSN='"+gEditSn+"'><文字>"+OrgName+"</文字>"+DeptInfo+"</受文者列表>");
					else
						activeDept.append("<受文者列表 本別='"+docType+"' 序='"+XMLseq+"' 全銜='"+OrgName+"' 正式名稱='"+OrgName+"' 群組代號='"+GrpNo+"' SYSID='"+SYSID+"'><文字>"+OrgName+"</文字>"+DeptInfo+"</受文者列表>");*/
					activeDept.append(DeptInfo);
				}
				else//CHECK 時，修改資料應保持建立者資訊
				{
					/*if(strDLGUseTrace=="Y")//追蹤修訂時增加建立者資訊
					{
						var CreateSN = activeDept.find("受文者列表[序='"+gCheckXmlindex+"']").attr("CreateSN");
						activeDept.find("受文者列表[序='"+gCheckXmlindex+"']").replaceWith("<受文者列表 本別='"+docType+"' 序='"+gCheckXmlindex+"' 全銜='"+OrgName+"' 正式名稱='"+OrgName+"' 群組代號='"+GrpNo+"' SYSID='"+SYSID+"' CreateSN='"+CreateSN+"'><文字>"+OrgName+"</文字>"+DeptInfo+"</受文者列表>");
					}
					else
						activeDept.find("受文者列表[序='"+gCheckXmlindex+"']").replaceWith("<受文者列表 本別='"+docType+"' 序='"+gCheckXmlindex+"' 全銜='"+OrgName+"' 正式名稱='"+OrgName+"' 群組代號='"+GrpNo+"' SYSID='"+SYSID+"' ><文字>"+OrgName+"</文字>"+DeptInfo+"</受文者列表>");*/
						//1070507 Cloud 調整xml內都先建立空白<受文者>故此處調整，非check時，以<受文者>取得取代
					if(gChooseBack)
						activeDept.find("受文者[序='"+gCheckXmlindex+"']").replaceWith(DeptInfo);
					else
						activeDept.find("受文者列表[序='"+gCheckXmlindex+"']").replaceWith(DeptInfo);
				}
					
			}
			//不展開設回預設
			gGrpExpand = false;
		}
		//建立畫面資訊及建立XML節點-由fnAddGrpNewDept、fnAddOneNewDept、fnInit呼叫
		//增加傳入當選擇子視窗回傳時，將節點取代
		//function fnCreatDeptTable(DeptInfo,NodeType,argSeq,node)
		function fnCreatDeptTable(DeptInfo,NodeType,argSeq,node,argChooseReplaceItem)
		{
			//1110830	Joe		1110615		調整畫面UI--S
			/*
			var $li = $("<li class='ui-table-item-PC'><div class='ui-table-column-item' ></div></li>").find('div');//取得第一個位置
			var $list = $dlg.find("#receiverList");//取得TABLE 畫面要放入區塊

			var colWidths = gcolWidthsDept;

			//1110225 David 1101481 序號欄位設定唯讀
			//fnsetTablaColumn($("<input style='border-style:none;background-color:Transparent;font-weight:600;'>").appendTo($li),colWidths[0],DeptInfo.Seq,"","序");
			fnsetTablaColumn($("<input style='border-style:none;background-color:Transparent;font-weight:600;' readonly>").appendTo($li),colWidths[0],DeptInfo.Seq,"","序");

			fnsetTablaColumn($("<input type='checkbox'>").appendTo($li),colWidths[1],"","Dept_cel_"+argSeq,"選");

			var addressWidth;

			if(strOdSupportEmail!="N")
				addressWidth = colWidths[11];
			else
			{
				addressWidth = parseInt(colWidths[11].substring(0,colWidths[11].length-2))+parseInt(colWidths[12].substring(0,colWidths[12].length-2));
				addressWidth+"px";
			}

			if(NodeType == "受文者" || NodeType == "已刪除") 
			{
				//公文初次開啟受文者編輯子視窗時，預設加入的受文者不會有序，以防萬一補上
				if(node!=undefined)
					node.setAttribute("序",DeptInfo.Seq);

				fnsetTablaColumn($("<input style='border-style:none;background-color:Transparent;font-weight:600;text-decoration:underline;cursor: pointer;'></div>").appendTo($li),colWidths[2],DeptInfo.Orgname+"|"+DeptInfo.CreatSName+"|"+DeptInfo.DeleteSName,"Dept_lbOrgname_"+argSeq,"正式名稱","Org");
				//1060117	Cloud	1050376		姓名、正副本稱謂限制增加60字	
				//fnsetTablaColumn($("<input>").appendTo($li),colWidths[3],DeptInfo.EmpName,"Dept_txEmpName_"+argSeq,"姓名","Org");
				fnsetTablaColumn($("<input maxlength=60>").appendTo($li),colWidths[3],DeptInfo.EmpName,"Dept_txEmpName_"+argSeq,"姓名","Org");
				//1060117	Cloud	1050376		姓名、正副本稱謂限制增加60字			
				//fnsetTablaColumn($("<input>").appendTo($li),colWidths[4],DeptInfo.OrgFullName,"Dept_txOrgFullName_"+argSeq,"全銜","Org");
				fnsetTablaColumn($("<input maxlength=60>").appendTo($li),colWidths[4],DeptInfo.OrgFullName,"Dept_txOrgFullName_"+argSeq,"全銜","Org");

				fnsetTablaColumn($("<input type='button' ></input>").appendTo($li),colWidths[5],"↑","Dept_MoveUp_"+argSeq,"上移","Org");

				fnsetTablaColumn($("<input type='button' ></input>").appendTo($li),colWidths[6],"↓","Dept_MoveDown_"+argSeq,"下移","Org");				

				fnsetTablaColumn($("<input type='button' ></input>").appendTo($li),colWidths[7],DeptInfo.DocType,"Dept_dlDocType_"+argSeq,"本別","Org");

				fnsetTablaColumn($("<input type='button' ></input>").appendTo($li),colWidths[8],DeptInfo.attach,"Dept_dlattach_"+argSeq,"含附件","Org");

				//1110225 David 1101481 調整發文方式UI
				$("<div style='display: inline-block' id='Dept_IssueTypeList_"+argSeq+"'></div>").appendTo($li);//放動態選單
				fnsetTablaColumn($("<input type='button'></input>").appendTo($li),colWidths[9],DeptInfo.docissuetype,"Dept_dldocissuetype_"+argSeq,"發文方式","Org");

				fnsetTablaColumn($("<input>").appendTo($li),colWidths[10],DeptInfo.PostNo,"Dept_txPostNo_"+argSeq,"郵遞區號","Org");

				fnsetTablaColumn($("<input>").appendTo($li),addressWidth,DeptInfo.Address,"Dept_txAddress_"+argSeq,"地址","Org");

				if(strOdSupportEmail!="N")
					fnsetTablaColumn($("<input>").appendTo($li),colWidths[12],DeptInfo.Email,"Dept_txEmail_"+argSeq,"Email","Org");
			}
			else if(NodeType == "受文者列表" || NodeType == "受文者列表|已刪除") 
			{
				if(strDLGUseTrace=="Y")
				{//追蹤修訂時，受文者列表如被刪除會紀錄為"受文者列表|已刪除"
					if(NodeType.indexOf('|')!=-1)
					{
						NodeType = NodeType.split('|')[1];
					}
				}
				//$li.addClass("ui-table-item-PC-group");
				//公文初次開啟受文者編輯子視窗時，預設加入的受文者不會有序，以防萬一補上
				if(node!=undefined)
					node.setAttribute("序",DeptInfo.Seq);
				fnsetTablaColumn($("<input style='border-style:none;background-color:Transparent;font-weight:600;text-decoration:underline;cursor: pointer;'>").appendTo($li),colWidths[2],DeptInfo.GrpName+"|"+DeptInfo.CreatSName+"|"+DeptInfo.DeleteSName,"Dept_lbOrgname_"+argSeq,"文字","Grp");
				fnsetTablaColumn($("<input style='border-color:transparent;background-color:Transparent;font-weight:600;'>").appendTo($li),colWidths[3],"-","","","Grp");
				fnsetTablaColumn($("<input>").appendTo($li),colWidths[4],DeptInfo.OrgFullName,"Dept_txOrgFullName_"+argSeq,"全銜","Grp");
				fnsetTablaColumn($("<input type='button' ></input>").appendTo($li),colWidths[5],"↑","Dept_MoveUp_"+argSeq,"上移","Grp");
				fnsetTablaColumn($("<input type='button' ></input>").appendTo($li),colWidths[6],"↓","Dept_MoveDown_"+argSeq,"下移","Grp");				
				fnsetTablaColumn($("<input type='button' ></input>").appendTo($li),colWidths[7],DeptInfo.DocType,"Dept_dlDocType_"+argSeq,"本別","Grp");
			}
			//增加判斷有傳入要取代的序時，將資訊取代(選擇子視窗回傳)
			if(argChooseReplaceItem!=-1 && argChooseReplaceItem!=undefined)
			{
				$list.children().eq(argChooseReplaceItem).replaceWith($li.parent());
			}
			else
				$li.parent().appendTo($list);
			//由是否有DeleteSn判斷是否已被刪除增加ReadOnly設定
			if(NodeType == "已刪除")
			{
				fnSetDelteColumn(argSeq,"Delete");
			}
			*/
			
			var InputAttr = theSSO.User.SystemSets.get("DEPT_SHOW_FULLDATA") == "Y" ? "textarea style='resize:none;overflow:hidden'" : "input";
			
			var colWidths = gcolWidthsDept;
			
			var addressWidth;

			if(strOdSupportEmail!="N")
				addressWidth = colWidths[11];
			else
			{
				addressWidth = parseInt(colWidths[11].substring(0,colWidths[11].length-2))+parseInt(colWidths[12].substring(0,colWidths[12].length-2));
				addressWidth+"px";
			}
			
			var $li;
			if(theSSO.User.SystemSets.get("DEPT_SHOW_FULLDATA") == "Y")
				$li = $("<li class='ui-table-item-PC'><div class='ui-table-column-item' style='height:" + fnGetReceiverHeight(DeptInfo, colWidths, addressWidth) + "'></div></li>").find('div');//取得第一個位置
			else
				$li = $("<li class='ui-table-item-PC'><div class='ui-table-column-item' ></div></li>").find('div');//取得第一個位置
			var $list = $dlg.find("#receiverList");//取得TABLE 畫面要放入區塊
			
			fnsetTablaColumn($("<input style='border-style:none;background-color:Transparent;font-weight:600;' readonly>").appendTo($li),colWidths[0],DeptInfo.Seq,"","序");

			fnsetTablaColumn($("<input type='checkbox'>").appendTo($li),colWidths[1],"","Dept_cel_"+argSeq,"選");
			

			if(NodeType == "受文者" || NodeType == "已刪除") 
			{
				//公文初次開啟受文者編輯子視窗時，預設加入的受文者不會有序，以防萬一補上
				if(node!=undefined)
					node.setAttribute("序",DeptInfo.Seq);

				if(theSSO.User.SystemSets.get("DEPT_SHOW_FULLDATA") == "Y")
					//1111102	Joe		--		修正Tag名稱錯誤的問題
					// fnsetTablaColumn($("<textarea style='border-style:none;background-color:Transparent;font-weight:600;text-decoration:underline;cursor: pointer;resize:none;overflow:hidden'></div>").appendTo($li),colWidths[2],DeptInfo.Orgname+"|"+DeptInfo.CreatSName+"|"+DeptInfo.DeleteSName,"Dept_lbOrgname_"+argSeq,"正式名稱","Org");
					fnsetTablaColumn($("<textarea style='border-style:none;background-color:Transparent;font-weight:600;text-decoration:underline;cursor: pointer;resize:none;overflow:hidden'></textarea>").appendTo($li),colWidths[2],DeptInfo.Orgname+"|"+DeptInfo.CreatSName+"|"+DeptInfo.DeleteSName,"Dept_lbOrgname_"+argSeq,"正式名稱","Org");
				else
					//1111102	Joe		--		修正Tag名稱錯誤的問題
					// fnsetTablaColumn($("<input style='border-style:none;background-color:Transparent;font-weight:600;text-decoration:underline;cursor: pointer;'></div>").appendTo($li),colWidths[2],DeptInfo.Orgname+"|"+DeptInfo.CreatSName+"|"+DeptInfo.DeleteSName,"Dept_lbOrgname_"+argSeq,"正式名稱","Org");
					fnsetTablaColumn($("<input style='border-style:none;background-color:Transparent;font-weight:600;text-decoration:underline;cursor: pointer;'>").appendTo($li),colWidths[2],DeptInfo.Orgname+"|"+DeptInfo.CreatSName+"|"+DeptInfo.DeleteSName,"Dept_lbOrgname_"+argSeq,"正式名稱","Org");
				
				fnsetTablaColumn($("<" + InputAttr + ">").appendTo($li),colWidths[3],DeptInfo.EmpName,"Dept_txEmpName_"+argSeq,"姓名","Org");
				fnsetTablaColumn($("<" + InputAttr + ">").appendTo($li),colWidths[4],DeptInfo.OrgFullName,"Dept_txOrgFullName_"+argSeq,"全銜","Org");

				fnsetTablaColumn($("<input type='button' ></input>").appendTo($li),colWidths[5],"↑","Dept_MoveUp_"+argSeq,"上移","Org");

				fnsetTablaColumn($("<input type='button' ></input>").appendTo($li),colWidths[6],"↓","Dept_MoveDown_"+argSeq,"下移","Org");				

				fnsetTablaColumn($("<input type='button' ></input>").appendTo($li),colWidths[7],DeptInfo.DocType,"Dept_dlDocType_"+argSeq,"本別","Org");

				fnsetTablaColumn($("<input type='button' ></input>").appendTo($li),colWidths[8],DeptInfo.attach,"Dept_dlattach_"+argSeq,"含附件","Org");

				$("<div style='display: inline-block' id='Dept_IssueTypeList_"+argSeq+"'></div>").appendTo($li);//放動態選單
				fnsetTablaColumn($("<input type='button'></input>").appendTo($li),colWidths[9],DeptInfo.docissuetype,"Dept_dldocissuetype_"+argSeq,"發文方式","Org");

				fnsetTablaColumn($("<" + InputAttr + ">").appendTo($li),colWidths[10],DeptInfo.PostNo,"Dept_txPostNo_"+argSeq,"郵遞區號","Org");

				fnsetTablaColumn($("<" + InputAttr + ">").appendTo($li),addressWidth,DeptInfo.Address,"Dept_txAddress_"+argSeq,"地址","Org");

				if(strOdSupportEmail!="N")
					fnsetTablaColumn($("<" + InputAttr + ">").appendTo($li),colWidths[12],DeptInfo.Email,"Dept_txEmail_"+argSeq,"Email","Org");
				
				//1141017	Joe		1141126		外貿增加傳真欄位
				if(strOrgNickName == "TAITRA")
				{
					//1141229 David 1141432 新增外貿客製化欄位
					//fnsetTablaColumn($("<" + InputAttr + ">").appendTo($li),colWidths[13],DeptInfo.FaxNo,"Dept_FaxNo_"+argSeq,"傳真","Org");
					fnsetTablaColumn($("<" + InputAttr + ">").appendTo($li),colWidths[13],DeptInfo.NameAddress,"Dept_NameAddress_"+argSeq,"名址條名稱","Org");
					fnsetTablaColumn($("<" + InputAttr + ">").appendTo($li),colWidths[14],DeptInfo.JobTitle,"Dept_JobTitle_"+argSeq,"職稱","Org");
					fnsetTablaColumn($("<" + InputAttr + ">").appendTo($li),colWidths[15],DeptInfo.FaxNo,"Dept_FaxNo_"+argSeq,"傳真","Org");
				}
			}
			else if(NodeType == "受文者列表" || NodeType == "受文者列表|已刪除") 
			{
				if(strDLGUseTrace=="Y")
				{//追蹤修訂時，受文者列表如被刪除會紀錄為"受文者列表|已刪除"
					if(NodeType.indexOf('|')!=-1)
					{
						NodeType = NodeType.split('|')[1];
					}
				}
				//$li.addClass("ui-table-item-PC-group");
				//公文初次開啟受文者編輯子視窗時，預設加入的受文者不會有序，以防萬一補上
				if(node!=undefined)
					node.setAttribute("序",DeptInfo.Seq);
				if(theSSO.User.SystemSets.get("DEPT_SHOW_FULLDATA") == "Y")
					fnsetTablaColumn($("<textarea style='border-style:none;background-color:Transparent;font-weight:600;text-decoration:underline;cursor: pointer;resize:none;overflow:hidden'>").appendTo($li),colWidths[2],DeptInfo.GrpName+"|"+DeptInfo.CreatSName+"|"+DeptInfo.DeleteSName,"Dept_lbOrgname_"+argSeq,"文字","Grp");
				else
					fnsetTablaColumn($("<input style='border-style:none;background-color:Transparent;font-weight:600;text-decoration:underline;cursor: pointer;'>").appendTo($li),colWidths[2],DeptInfo.GrpName+"|"+DeptInfo.CreatSName+"|"+DeptInfo.DeleteSName,"Dept_lbOrgname_"+argSeq,"文字","Grp");
				fnsetTablaColumn($("<input style='border-color:transparent;background-color:Transparent;font-weight:600;'>").appendTo($li),colWidths[3],"-","","","Grp");
				fnsetTablaColumn($("<" + InputAttr + ">").appendTo($li),colWidths[4],DeptInfo.OrgFullName,"Dept_txOrgFullName_"+argSeq,"全銜","Grp");
				fnsetTablaColumn($("<input type='button' ></input>").appendTo($li),colWidths[5],"↑","Dept_MoveUp_"+argSeq,"上移","Grp");
				fnsetTablaColumn($("<input type='button' ></input>").appendTo($li),colWidths[6],"↓","Dept_MoveDown_"+argSeq,"下移","Grp");				
				fnsetTablaColumn($("<input type='button' ></input>").appendTo($li),colWidths[7],DeptInfo.DocType,"Dept_dlDocType_"+argSeq,"本別","Grp");
			}
			//增加判斷有傳入要取代的序時，將資訊取代(選擇子視窗回傳)
			if(argChooseReplaceItem!=-1 && argChooseReplaceItem!=undefined)
			{
				$list.children().eq(argChooseReplaceItem).replaceWith($li.parent());
			}
			else
				$li.parent().appendTo($list);
			//由是否有DeleteSn判斷是否已被刪除增加ReadOnly設定
			if(NodeType == "已刪除")
			{
				fnSetDelteColumn(argSeq,"Delete");
			}
		}
		function fnGetReceiverHeight(DeptInfo, colWidths, addressWidth)
		{
			var Height=0;
		    var ruler = document.getElementById("receiverTemp");
			ruler.rows = 1;
		    ruler.style.display = '';
			ruler.style.width = colWidths[2];
		　  ruler.textContent = DeptInfo.Orgname;
			Height = Height > ruler.scrollHeight + ruler.rows*3 ? Height : ruler.scrollHeight + ruler.rows*3;
			
			ruler.style.width = colWidths[3];
		　  ruler.textContent = DeptInfo.EmpName;
			Height = Height > ruler.scrollHeight + ruler.rows*3 ? Height : ruler.scrollHeight + ruler.rows*3;
			
			ruler.style.width = colWidths[4];
		　  ruler.textContent = DeptInfo.OrgFullName;
			Height = Height > ruler.scrollHeight + ruler.rows*3 ? Height : ruler.scrollHeight + ruler.rows*3;
			
			ruler.style.width = addressWidth;
		　  ruler.textContent = DeptInfo.Address;
			Height = Height > ruler.scrollHeight + ruler.rows*3 ? Height : ruler.scrollHeight + ruler.rows*3;
			
			ruler.style.width = colWidths[12];
		　  ruler.textContent = DeptInfo.Email;
			Height = Height > ruler.scrollHeight + ruler.rows*3 ? Height : ruler.scrollHeight + ruler.rows*3;
			ruler.style.display ='none';
		　  return Height+5 + 'px';
		}
		//1110830	Joe		1110615		調整畫面UI--E
		
		//建立畫面欄位設定各屬性-及欄位連動註冊
		function fnsetTablaColumn(argobj,argWith,argval,argId,argTagName,argDeptType)
		{
			var OpenWinMode ="0";
			//群組時開啟群組編輯子視窗
			if(argTagName=="文字")
				OpenWinMode ="1";

			//1080312 David 1080089 紀錄正式名稱，全銜、姓名、編號資訊
			if(argTagName=="序")
			{
				if(g_mailMergeCont!=0 )//有分繕表，才觸發分繕處理
				{
					var pDeptDullName = activeDept.find("受文者[序='"+argval+"']").find("全銜").text();
					var pDeptName = activeDept.find("受文者[序='"+argval+"']").find("正式名稱").text();
					var pDeptEmpName = activeDept.find("受文者[序='"+argval+"']").find("姓名").text();
					var pDeptSeqNo = activeDept.find("受文者[序='"+argval+"']").attr("編號");
					g_mailMergeDept ={
						"name": pDeptDullName
						,"fullName": pDeptName
						,"userName": pDeptEmpName
						,"sn": pDeptSeqNo
					}
				}
			}

			//1080312 David 1080089 新增姓名及全銜欄位事件註冊處理
			if(argTagName=="全銜" || argTagName=="姓名")
			{
				if(g_mailMergeCont!=0 )//有分繕表，才觸發分繕處理
				{
					//1081008	Joe		1080339		jQuery升級3.4.1
					// argobj.bind("change",function(envnt) {
					argobj.on("change",function(envnt) {
						var index = parseInt(event.target.id.split("_")[2]);
						index++;
						var pDeptSeqNo = activeDept.find("受文者[序='"+index+"']").attr("編號");
						var pDeptDullName = activeDept.find("受文者[序='"+index+"']").find("全銜").text();
						var pDeptName = activeDept.find("受文者[序='"+index+"']").find("正式名稱").text();
						var pDeptEmpName = activeDept.find("受文者[序='"+index+"']").find("姓名").text();

						setMailMergeModify("2", pDeptSeqNo, pDeptDullName, pDeptName, pDeptEmpName);
					});
				}
			}

			if(argTagName=="正式名稱" || argTagName=="文字")
			{
				//追蹤修訂增加顯示刪除者建立者
				var Title="";
				if(strDLGUseTrace=="Y")
				{
					var TitleInfo =argval.split('|');
					Title = argval = TitleInfo[0];
					if(TitleInfo[1]!="")
						Title += " 建立者："+TitleInfo[1];
					if(TitleInfo[2]!="")
						Title += " 刪除者："+TitleInfo[2];
				}
				else
				{
					Title = argval = argval.split('|')[0];
				}
				argobj.css("width", argWith).val(argval).attr("id",argId).attr('title',Title)
				//1081008	Joe		1080339		jQuery升級3.4.1
				// .bind("click",function(envnt) {fnOpenModifyWin(event.target.id,OpenWinMode);});
				.on("click",function(envnt) {fnOpenModifyWin(event.target.id,OpenWinMode);});
				//1070529 Cloud 1070183 新增附件分繕功能
				//1080312 David 1080089 調整資料紀錄邏輯
				//g_mailMergeDept = argval;//名稱取得附件分繕資訊
			}
			else if(argTagName=="選")
			{
				argobj.css("width", argWith).val(argval).attr("id",argId);
			}
			else
			{
				if(argTagName=="序")
					argobj.css("width", argWith).val(argval).attr("id",argId);
				//1110225 David 1101481 修改發文方式UI，調整邏輯
				else if(argTagName=="發文方式")
				{
					argval = fnchangeIssueButton(argval);
					obj = gIssueBt;
					objValue = gIssueTypeSort;

					argobj.css("width", argWith).val(argval).attr("id",argId).css("background-color", "hsla(0, 0%, 0%, 0)")
					.on("click",function(envnt) {fnSetIssueList(obj,objValue,event.target.id,argTagName);});
				}
				else
				{
					//1050722 Cloud	註冊細項發文方式按鈕
					//1110225 David 1101481 修改發文方式UI，調整邏輯
					//if(argTagName=="發文方式" ||argTagName=="含附件" || argTagName=="本別")
					if(argTagName=="含附件" || argTagName=="本別")
					{
						var obj = gIsAttch;
						var objValue = gIsAttch;
						
						if(argTagName=="本別")
						{
							obj = gDocType;
							objValue = gDocTypeText;
							//轉換本別
							switch(argval)
							{
								case "主持人":
									argval ="主持";
								break;
								case "列席者":
									argval ="列席";
								break;
								case "出席者":
									argval ="出席";
								break;
							}
						}
						//1110225 David 1101455 修改發文方式UI，調整邏輯
						/*if(argTagName=="發文方式")
						{
							argval = fnchangeIssueButton(argval);
							obj = gIssueBt;
							objValue = gIssueTypeSort;
						}*/
						//1070529 Cloud 1070183 分繕顯示附件摘要屬性-S
						if(g_mailMergeCont!=0 && argTagName=="含附件")//附件有分繕
						{
							//取得受文者是第幾個
							//1080312 David 1080089 調整判斷方式
							//var AttDescIndex = g_mailMerge.find("受文者",g_mailMergeDept);
							var AttDescIndex = g_mailMerge.find2("受文者", g_mailMergeDept);
							
							var dept_AttDescList ="";
							if(AttDescIndex!=-1)//取得附件分繕資訊
							{
								var arrAttDescList = g_mailMerge.getAtt(AttDescIndex);//取得受文者所有分繕附件
								if(arrAttDescList != null){	
									for(var ai = 0;ai < arrAttDescList.length;ai++){
										if(ai==0)
											dept_AttDescList += arrAttDescList[ai].desc;
										else
											dept_AttDescList += "、"+arrAttDescList[ai].desc;
									}
									argobj.attr("title",dept_AttDescList);
								}
							}
						}
						//1070529 Cloud 1070183 分繕顯示附件摘要屬性-E
						argobj.css("width", argWith).val(argval).attr("id",argId)
						//1081008	Joe		1080339		jQuery升級3.4.1
						// .css("background-color", "hsla(0, 0%, 0%, 0)").bind("click",function(envnt) {fngolGetDocSendWay(obj,objValue,event.target.id,argTagName,argDeptType);});
						.css("background-color", "hsla(0, 0%, 0%, 0)").on("click",function(envnt) {fngolGetDocSendWay(obj,objValue,event.target.id,argTagName,argDeptType);});
					}
					//上下移功能
					else if(argTagName=="上移" || argTagName=="下移")
					{
						argobj.css("width", argWith).val(argval).attr("id",argId)
						//1081008	Joe		1080339		jQuery升級3.4.1
						// .bind("click",function(envnt) {fnMoveDataRow(event.target.id,argTagName,argDeptType);jf_onChange();});
						.on("click",function(envnt) {fnMoveDataRow(event.target.id,argTagName,argDeptType);jf_onChange();});
					}
					else
					{
						//1060919 Cloud 1060871 修正修改群組正副本稱謂，畫面不會連動問題
						if(argDeptType=="Grp")
							argTagName = "文字";
						argobj.css("width", argWith).val(argval).attr("id",argId)
						//1081008	Joe		1080339		jQuery升級3.4.1
						// .bind("change",function(envnt) {fnSetDeptInfo(event.target.id,argTagName,event.target.value,argDeptType);jf_onChange();});
						.on("change",function(envnt) {fnSetDeptInfo(event.target.id,argTagName,event.target.value,argDeptType);jf_onChange();});
						
						if(argTagName=="郵遞區號")
							//1100128	Joe		1090608		修正郵遞區號為6碼
							// argobj.attr('maxlength','5');
							argobj.attr('maxlength','6');
						if(argTagName=="全銜")
							argobj.attr('title',argval);

						//1141229 David 1141432 新增外貿客製化欄位處理
						if(argTagName=="名址條名稱")
							argobj.attr('maxlength','60');
						if(argTagName=="職稱")
							argobj.attr('maxlength','20');
						if(argTagName=="傳真")
							argobj.attr('maxlength','20');
					}
				}
			}
		}
		
		//受文者、正副本稱謂欄位輸入連動
		function fnTxOrgNameOnblur(argElmentId)
		{
			if (jf_DeptTrim($("#"+argElmentId).val()) != '')//輸入的受文者或是姓名不為空
			{		
				if (argElmentId == 'Dept_txOrgName')//如果是ONBLUR欄位是受文者
				{
					//1120502	Joe		1120213		新增標檢局客製化正副本稱謂帶入邏輯
					if(strOrgNickName == "BSMI"){
						$("#Dept_txOrgFullName").val($("#Dept_txOrgName").val());//放入正副本稱謂
					}
					else{					
						//1140814	Joe		1130366		調整onchange就會進行判斷改動
						// if (jf_DeptTrim($("#Dept_txOrgFullName").val()) != '')//正副本稱謂不為空時不將值放入 
							// return;
						$("#Dept_txOrgFullName").val($("#Dept_txOrgName").val());//放入正副本稱謂	
					}
				}
				else if (argElmentId == 'Dept_txEmpName')//如果是ONBLUR欄位是姓名
				{						
					//1120502	Joe		1120213		新增標檢局客製化正副本稱謂帶入邏輯
					if(strOrgNickName == "BSMI")
						$("#Dept_txOrgFullName").val($("#Dept_txOrgName").val() + $("#Dept_txEmpName").val());//放入正副本稱謂
					else
						$("#Dept_txOrgFullName").val($("#Dept_txEmpName").val());//放入正副本稱謂
				}
			}
		}
		
		//將畫面異動資訊設定至XML物件
		function fnSetDeptInfo(argId,argTagName,argVal,argDeptType)
		{
			//1050818 CLOUD	配合IE環境修改節點更動寫法
			//var index = argId.split("_")[2];
			var index = parseInt(argId.split("_")[2]);
			index++;
			if(argDeptType=="Grp")
			{
				/*activeDept.find("受文者列表").eq(index).attr(argTagName,jf_DeptTrim(argVal));
				activeDept.find("受文者列表").eq(index).find("文字").text(jf_DeptTrim(argVal));*/
				//1051108	Cloud	修正本別、發文方式、附件異動後直接離開不會提醒需儲存bug
				//fnSetTextOfElement(activeDept.find("受文者列表[序='"+index+"']").find(argTagName),jf_DeptTrim(argVal));
				//1051219 Cloud	修正 更改群組正副本稱謂，異動整個底下受文者BUG
				//1060919	Cloud	1060871 	修正，群組更改正副本稱謂，不會同步更新至畫面問題
				//activeDept.find("受文者列表[序='"+index+"']").attr("全銜",jf_DeptTrim(argVal));
				fnSetTextOfDeptElement(activeDept.find("受文者列表[序='"+index+"']").find(argTagName),jf_DeptTrim(argVal));
				//1070925	Cloud	修正群組異動正副本稱謂時，不會儲存至全銜的bug
				activeDept.find("受文者列表[序='"+index+"']").attr("全銜",jf_DeptTrim(argVal));
			}
			else
				//activeDept.find(">受文者").eq(index).find(argTagName).text(jf_DeptTrim(argVal));
				//1051108	Cloud	修正本別、發文方式、附件異動後直接離開不會提醒需儲存bug
				//fnSetTextOfElement(activeDept.find("受文者[序='"+index+"']").find(argTagName),jf_DeptTrim(argVal));
				fnSetTextOfDeptElement(activeDept.find("受文者[序='"+index+"']").find(argTagName),jf_DeptTrim(argVal));
			
		}
		//群組建立新節點-群組不展開呼叫
		//1050818 Cloud	增加傳入受文者列表節點供append
		//function fnCreatDeptlist(objDept,argIndex,argHasAatt,argDefaultDocType)
		function fnCreatDeptlist(objDept,argIndex,argHasAatt,argDefaultDocType,argGrpNode)
		{
			var strDeptList ="";
			var docType = "";
			var docIssueType = "";
			var OrgFullName = "";
			//1050818 Cloud	配合IE修改建立節點方式
			var GrpNode;
			var CreateSN = gEditSn;
			//1090318 David 1090089 紀錄原來的群組資訊
			var arrOriginalGrp = [];
			if(gIsNcHuAutOcheck && gCheckXmlindex != -1)
			{
				activeDept.find("受文者列表[序='"+gCheckXmlindex+"']").find("受文者").each(function(o){
					let $o=$(this);
					arrOriginalGrp.push({
						OrgName:$o.find("正式名稱").text()
						,FullName:$o.find("全銜").text()
						,PostalCode:$o.find("郵遞區號").text()
						,Address:$o.find("地址").text()
						,Email:$o.find("Email").text()
					});
				});
			}
			for(var nGrp=1;nGrp<objDept.OrgID.length;nGrp++)
			{
				//取得受文者本別
				docType = objDept.DocType[nGrp];

				//取得受文者預設發文方式
				docIssueType = fungetIssueType(objDept.defaultIssueType[nGrp],"群組");

				if(docType=="")//
					docType = argDefaultDocType;

				OrgFullName = objDept.OrgName[nGrp];
				//1090318 David 1090089 新增高榮客製化讀入受文者列表後自動檢核邏輯
				if(gIsNcHuAutOcheck && gCheckXmlindex != -1)
				{
					let strInternalID = objDept.Internal[nGrp];
					
					//取得原群組內的受文者資訊
					let OriginalGrpOrg = arrOriginalGrp.filter(function(o){
							return o.OrgName == OrgFullName;
						})

					//WS回傳的群組內受文者資料，與原本的群組受文者相符時
					if (OriginalGrpOrg!=null && OriginalGrpOrg.length > 0)
					{
						if(strInternalID != "")
						{
							//內部單位不更新正副本稱謂
							if(OriginalGrpOrg[0].FullName != "")
								OrgFullName = OriginalGrpOrg[0].FullName;
						}
						else
						{
							//外機關不更新正副本稱謂、郵遞區號、地址、EMAIL
							if(OriginalGrpOrg[0].FullName != "")
								OrgFullName = OriginalGrpOrg[0].FullName;

							objDept.PostNo[nGrp] = OriginalGrpOrg[0].PostalCode;
							objDept.Address[nGrp] = OriginalGrpOrg[0].Address;
							objDept.Email[nGrp] = OriginalGrpOrg[0].Email;
						}
					}
				}

				//若為內部單位，依系統參數WE_UNITTITLE設定全銜
				if(strWeUnitTitle != "" && objDept.IsInside[nGrp] == "Y" && objDept.OrgID[nGrp] == theUserInfo.OrgID)
				{
					OrgFullName= strWeUnitTitle+OrgFullName;
				}

				//1090915	Joe		1090555		信保新增銀行代碼資訊
				var Bank = objDept == null ? "" : objDept.Bank[nGrp] == null ? "" : objDept.Bank[nGrp];
				var BankSub = objDept == null ? "" : objDept.BankSub[nGrp] == null ? "" : objDept.BankSub[nGrp];

				//1141229 David 1141432 新增外貿客製化匯入處理
				if(objDept.OrgFullName && objDept.OrgFullName[nGrp] != null && objDept.OrgFullName[nGrp] != "")
					OrgFullName = objDept.OrgFullName[nGrp];
				//1150112 David 序19 修正物件判斷
				//let FaxNo = objDept.FaxNo == null ? "" : objDept.FaxNo[nGrp] == null ? "" : objDept.FaxNo[nGrp];
				//let NameAddress = objDept.NameAddress == null ? "" : objDept.NameAddress[nGrp] == null ? "" : objDept.NameAddress[nGrp];
				//let JobTitle = objDept.JobTitle == null ? "" : objDept.JobTitle[nGrp] == null ? "" : objDept.JobTitle[nGrp];
				let FaxNo = objDept?.FaxNo?.[nGrp] ?? "";
				let NameAddress = objDept?.NameAddress?.[nGrp] ?? "";
				let JobTitle = objDept?.JobTitle?.[nGrp] ?? "";

				var DeptInfo = 
				{
					"OrgFullName": OrgFullName,
					"CreatSName": theUserInfo.UserName,
					"DeleteSName": "",
					//1050818 Cloud 增加傳入建立者資訊
					"CreateSN":CreateSN,
					//1090915	Joe		1090555		信保新增銀行代碼資訊
					"Bank":Bank,
					"BankSub":BankSub,
					//1141017	Joe		1141126		外貿增加傳真欄位
					//1141229 David 1141432 外貿增加欄位
					//"FaxNo": "",
					"FaxNo": FaxNo
					,"NameAddress": NameAddress
					,"JobTitle": JobTitle
				};
				//1050818 Cloud	配合IE修改建立節點方式
				//strDeptList +=fnCreatNewNode(objDept,argIndex,docIssueType,argHasAatt,nGrp,docType,DeptInfo);
				strDeptList =fnCreatNewNode(objDept,argIndex,docIssueType,argHasAatt,nGrp,docType,DeptInfo);
				argGrpNode.appendChild(strDeptList);
			}
			//return strDeptList;
			return argGrpNode;
		}
		//單筆建立新節點
		/*
			參數：
			objDept：WS回傳物件 
			argIndex：畫面INDEX 
			argSendWay：預設發文方式 
			argHasAatt：是否含附件
			argGrpIndx：群組時，受文者於群組內的INDEX 
			argGrpDefaultDocType：受文者於DB的本別如為空則為畫面選擇的本別
			argDeptInfo：建立畫面用資訊-DB無資料時，以此資訊建立XML；以及因全銜會因系統參數設定不同而顯示不同
			以argDeptInfo建立
		*/
		function fnCreatNewNode(objDept,argIndex,argIssueType,argHasAatt,argGrpIndx,argDefaultDocType,argDeptInfo)
		{
			var strRtnInfo ="";
			//1050818	Cloud	修改支援ie環境使用
			var NewNode;
			//1070806	Cloud 1070685 更新全域變數流水號
			//1080312 David 1080089 無附件下載區時還是會有編號屬性，調整邏輯
			//if(gDLWork=="Y")
				//gDept_SeqNo++;
			//1050920	Cloud	Cloud	1050087		修正主持人、列席者、出席者寫入受文者時寫入錯誤資訊bug			
			switch(argDefaultDocType)
			{
				case "主持":
					argDefaultDocType ="主持人";
				break;
				case "列席":
					argDefaultDocType ="列席者";
				break;
				case "出席":
					argDefaultDocType ="出席者";
				break;
			}
			if(objDept!=null)//無DB回傳物件
			{
				if(argGrpIndx==null)
				{
					//1050818	Cloud	修改支援ie環境使用
					/*strRtnInfo ="<全銜>"+argDeptInfo.OrgFullName+"</全銜>"+
					"<正式名稱>"+objDept.OrgName[0]+"</正式名稱>"+
					"<機關代碼>"+objDept.OrgID[0]+"</機關代碼>"+
					"<單位代碼>"+objDept.DeptNo[0]+"</單位代碼>"+
					"<郵遞區號>"+objDept.PostNo[0]+"</郵遞區號>"+
					"<地址>"+objDept.Address[0]+"</地址>"+
					"<發文方式>"+argIssueType+"</發文方式>"+
					"<含附件>"+argHasAatt+"</含附件>"+
					"<櫃號>"+objDept.CabinetNo[0]+"</櫃號>"+
					"<匣道>"+objDept.GateWay[0]+"</匣道>"+
					"<SYSID>"+objDept.SysId[0]+"</SYSID>"+
					"<Email>"+objDept.Email[0]+"</Email>"+
					"<內部>"+objDept.IsInside[0]+"</內部>"+
					"<海外單位>"+objDept.OverSea[0]+"</海外單位>"+
					"<國別>"+objDept.CountryType[0]+"</國別>"+
					"<郵寄地區>"+objDept.RegionNo[0]+"</郵寄地區>"+
					"<姓名>"+argDeptInfo.EmpName+"</姓名>"+
					//增加電子交換現況 TAG，以減少原函式fnChkIsAnyCanEIssue以逐受文者呼叫WS重取電子交換現況
					//檢核是否有機關可電子交換功能
					"<電子交換現況>"+objDept.FepStatus[0]+"</電子交換現況>";
					"<ERR/>";*/
					NewNode = gXmlObj.createElement("受文者");
					NewNode.setAttribute("序",argIndex);
					NewNode.setAttribute("本別",argDefaultDocType);
					//1080220 David 1080089 新增編號
					NewNode.setAttribute("編號",gDept_SeqNo.toString());
					if(strDLGUseTrace=="Y")
						NewNode.setAttribute("CreateSN",argDeptInfo.CreateSN);
					//1070806	Cloud 1070685 增加紀錄識別碼
					if(gDLWork=="Y")
						//1070910	Cloud	1070685		修正屬性判斷方式錯誤問題
						//NewNode.setAttribute("識別碼",objDept == null ? "" : objDept.DLID[0]);
						NewNode.setAttribute("識別碼",objDept.DLID == null ? "" : objDept.DLID[0]);

					//1071109 Cloud	修正，有姓名有值時，全銜使用姓名
					//fnMakeNode("全銜",argDeptInfo.OrgFullName,NewNode);
					var DeptOrgFullName = argDeptInfo.OrgFullName;
					if(argDeptInfo.EmpName!=null && argDeptInfo.EmpName!="")
						DeptOrgFullName = argDeptInfo.EmpName;
					fnMakeNode("全銜",DeptOrgFullName,NewNode);
					fnMakeNode("正式名稱",objDept == null ? "" : objDept.OrgName==null ? "" : objDept.OrgName[0],NewNode);
					fnMakeNode("機關代碼",objDept == null ? "" : objDept.OrgID==null ? "" : objDept.OrgID[0],NewNode);
					fnMakeNode("單位代碼",objDept == null ? "" : objDept.DeptNo==null ? "" : objDept.DeptNo[0],NewNode);
					fnMakeNode("郵遞區號",objDept == null ? "" : objDept.PostNo==null ? "" : objDept.PostNo[0],NewNode);
					fnMakeNode("地址",objDept == null ? "" : objDept.Address==null ? "" : objDept.Address[0],NewNode);
					fnMakeNode("發文方式",argIssueType,NewNode);
					fnMakeNode("含附件",argHasAatt,NewNode);
					fnMakeNode("櫃號",objDept == null ? "" : objDept.CabinetNo==null ? "" : objDept.CabinetNo[0],NewNode);
					fnMakeNode("匣道",objDept == null ? "" : objDept.GateWay==null ? "" : objDept.GateWay[0],NewNode);
					fnMakeNode("SYSID",objDept == null ? "" : objDept.SysId==null ? "" : objDept.SysId[0],NewNode);
					fnMakeNode("Email",objDept == null ? "" : objDept.Email==null ? "" : objDept.Email[0],NewNode);
					fnMakeNode("內部",objDept == null ? "" : objDept.IsInside==null ? "" : objDept.IsInside[0],NewNode);
					fnMakeNode("海外單位",objDept == null ? "" : objDept.OverSea==null ? "" :  objDept.OverSea[0],NewNode);
					fnMakeNode("國別",objDept == null ? "" : objDept.CountryType==null ? "" :  objDept.CountryType[0],NewNode);
					fnMakeNode("郵寄地區",objDept == null ? "" : objDept.RegionNo==null ? "" : objDept.RegionNo[0],NewNode);
					fnMakeNode("姓名",argDeptInfo.EmpName,NewNode);
					fnMakeNode("電子交換現況",objDept == null ? "" : objDept.FepStatus==null ? "" : objDept.FepStatus[0],NewNode);
					//1060327 Cloud 1050802 增加寫入內部單位代碼
					fnMakeNode("內部單位代碼",objDept == null ? "" : objDept.Internal==null ? "" : objDept.Internal[0],NewNode);
					//1090915	Joe		1090555		信保新增銀行代碼資訊--S
					if(strOrgNickName == "SMEG")
					{
						fnMakeNode("總行代碼",objDept == null ? "" : objDept.Bank==null ? "" : objDept.Bank[0],NewNode);
						fnMakeNode("分行代碼",objDept == null ? "" : objDept.BankSub==null ? "" : objDept.BankSub[0],NewNode);
					}
					//1090915	Joe		1090555		信保新增銀行代碼資訊--E
					//1141017	Joe		1141126		外貿增加傳真欄位
					if(strOrgNickName == "TAITRA")
					{
						fnMakeNode("傳真", objDept == null ? "" : objDept.FaxNo==null ? "" : objDept.FaxNo, NewNode);
						//1141229 David 1141432 外貿增加欄位
						fnMakeNode("名址條名稱", objDept == null ? "" : objDept.NameAddress==null ? "" : objDept.NameAddress, NewNode);
						fnMakeNode("職稱", objDept == null ? "" : objDept.JobTitle==null ? "" : objDept.JobTitle, NewNode);
					}
				}
				else
				{
					strRtnInfo = "";
					//1050818 Cloud	配合ie環境修改建立節點方式
					NewNode = gXmlObj.createElement("受文者");
					if(!gGrpExpand)//不展開則加上<受文者>TAG
					{
						//1050818 Cloud	配合ie環境修改建立節點方式
						/*if(strDLGUseTrace=="Y")//追蹤修訂開啟增加建立者
							strRtnInfo ="<受文者 序='"+argIndex+"_"+argGrpIndx+"' 本別='"+argGrpDefaultDocType+"' CreateSN='"+gEditSn+"'>";
						else
							strRtnInfo ="<受文者 序='"+argIndex+"_"+argGrpIndx+"' 本別='"+argGrpDefaultDocType+"'>";*/
						NewNode.setAttribute("序",argIndex+"_"+argGrpIndx);
						//1080220 David 1080089 新增編號
						NewNode.setAttribute("編號",gDept_SeqNo.toString());
					}
					else
					{
						NewNode.setAttribute("序",argIndex);
						//1080220 David 1080089 新增編號
						NewNode.setAttribute("編號",gDept_SeqNo.toString());
					}
					NewNode.setAttribute("本別",argDefaultDocType);	
					//一律設定此屬性-避免功能被忽然啟用
					NewNode.setAttribute("CreateSN",argDeptInfo.CreateSN);
					//1070806	Cloud 1070685 增加紀錄識別碼
					if(gDLWork=="Y")
						//1070910	Cloud	1070685		修正屬性判斷方式錯誤問題
						//NewNode.setAttribute("識別碼",objDept == null ? "" : objDept.DLID[argGrpIndx]);
						NewNode.setAttribute("識別碼",objDept.DLID == null ? "" : objDept.DLID[argGrpIndx]);
					//1050818 Cloud	配合ie環境修改建立節點方式
					/*strRtnInfo +="<全銜>"+argDeptInfo.OrgFullName+"</全銜>"+
					"<正式名稱>"+objDept.OrgName[argGrpIndx]+"</正式名稱>"+
					"<機關代碼>"+objDept.OrgID[argGrpIndx]+"</機關代碼>"+
					"<單位代碼>"+objDept.DeptNo[argGrpIndx]+"</單位代碼>"+
					"<郵遞區號>"+objDept.PostNo[argGrpIndx]+"</郵遞區號>"+
					"<地址>"+objDept.Address[argGrpIndx]+"</地址>"+
					"<發文方式>"+argIssueType+"</發文方式>"+
					"<含附件>"+argHasAatt+"</含附件>"+
					"<櫃號>"+objDept.CabinetNo[argGrpIndx]+"</櫃號>"+
					"<匣道>"+objDept.GateWay[argGrpIndx]+"</匣道>"+
					"<SYSID>"+objDept.SysId[argGrpIndx]+"</SYSID>"+
					"<Email>"+objDept.Email[argGrpIndx]+"</Email>"+
					"<內部>"+objDept.IsInside[argGrpIndx]+"</內部>"+
					"<海外單位>"+objDept.OverSea[argGrpIndx]+"</海外單位>"+
					"<國別>"+objDept.CountryType[argGrpIndx]+"</國別>"+
					"<郵寄地區>"+objDept.RegionNo[argGrpIndx]+"</郵寄地區>"+
					"<姓名></姓名>"+
					//增加電子交換現況 TAG，以減少原函式fnChkIsAnyCanEIssue以竹受文者呼叫WS重取電子交換現況
					//檢核是否有機關可電子交換功能
					"<電子交換現況>"+objDept.FepStatus[argGrpIndx]+"</電子交換現況>";
					if(!gGrpExpand)
						strRtnInfo +="</受文者>";*/
					//1071109 Cloud	修正，有姓名有值時，全銜使用姓名
					//fnMakeNode("全銜",argDeptInfo.OrgFullName,NewNode);
					var GrpOrgFullName = argDeptInfo.OrgFullName;
					if(objDept.EmpName[argGrpIndx]!=null && objDept.EmpName[argGrpIndx]!="")
						GrpOrgFullName = objDept.EmpName[argGrpIndx];
					fnMakeNode("全銜",GrpOrgFullName,NewNode);
					fnMakeNode("正式名稱",objDept.OrgName[argGrpIndx],NewNode);
					fnMakeNode("機關代碼",objDept.OrgID[argGrpIndx],NewNode);
					fnMakeNode("單位代碼",objDept.DeptNo[argGrpIndx],NewNode);
					fnMakeNode("郵遞區號",objDept.PostNo[argGrpIndx],NewNode);
					fnMakeNode("地址",objDept.Address[argGrpIndx],NewNode);
					fnMakeNode("發文方式",argIssueType,NewNode);
					fnMakeNode("含附件",argHasAatt,NewNode);
					fnMakeNode("櫃號",objDept.CabinetNo[argGrpIndx],NewNode);
					fnMakeNode("匣道",objDept.GateWay[argGrpIndx],NewNode);
					fnMakeNode("SYSID",objDept.SysId[argGrpIndx],NewNode);
					fnMakeNode("Email",objDept.Email[argGrpIndx],NewNode);
					fnMakeNode("內部",objDept.IsInside[argGrpIndx],NewNode);
					fnMakeNode("海外單位",objDept.OverSea[argGrpIndx],NewNode);
					fnMakeNode("國別",objDept.CountryType[argGrpIndx],NewNode);
					fnMakeNode("郵寄地區",objDept.RegionNo[argGrpIndx],NewNode);
					//1071109	Cloud	[1071112]	修正匯入至一群組，受文者姓名消失問題
					//fnMakeNode("姓名",argDeptInfo.EmpName,NewNode);
					fnMakeNode("姓名",objDept.EmpName[argGrpIndx],NewNode);
					fnMakeNode("電子交換現況",objDept.FepStatus[argGrpIndx],NewNode);
					//1060327 Cloud 1050802 增加寫入內部單位代碼
					fnMakeNode("內部單位代碼",objDept.Internal[argGrpIndx],NewNode);
					//1090915	Joe		1090555		信保新增銀行代碼資訊--S
					if(strOrgNickName == "SMEG")
					{
						fnMakeNode("總行代碼",objDept.Bank[argGrpIndx],NewNode);
						fnMakeNode("分行代碼",objDept.BankSub[argGrpIndx],NewNode);
					}
					//1090915	Joe		1090555		信保新增銀行代碼資訊--E
					//1141017	Joe		1141126		外貿增加傳真欄位
					if(strOrgNickName == "TAITRA")
					{
						//1141229 David 1141432 外貿增加欄位
						//fnMakeNode("傳真", "", NewNode);
						//1150112 David 序19 修正物件判斷
						//let FaxNo = objDept.FaxNo[argGrpIndx] == null ? "" : objDept.FaxNo[argGrpIndx];
						//let NameAddress = objDept.NameAddress[argGrpIndx] == null ? "" : objDept.NameAddress[argGrpIndx];
						//let JobTitle = objDept.JobTitle[argGrpIndx] == null ? "" : objDept.JobTitle[argGrpIndx];
						let FaxNo = objDept?.FaxNo?.[argGrpIndx] ?? "";
						let NameAddress = objDept?.NameAddress?.[argGrpIndx] ?? "";
						let JobTitle = objDept?.JobTitle?.[argGrpIndx] ?? "";

						fnMakeNode("傳真", FaxNo, NewNode);
						fnMakeNode("名址條名稱", NameAddress, NewNode);
						fnMakeNode("職稱", JobTitle, NewNode);
					}
				}
			}
			else
			{
				//1050818 Cloud	配合ie環境修改建立節點方式
				/*strRtnInfo ="<全銜>"+argDeptInfo.OrgFullName+"</全銜>"+
				"<正式名稱>"+argDeptInfo.Orgname+"</正式名稱>"+
				"<機關代碼></機關代碼>"+
				"<單位代碼></單位代碼>"+
				"<郵遞區號></郵遞區號>"+
				"<地址></地址>"+
				"<發文方式>"+argIssueType+"</發文方式>"+
				"<含附件>否</含附件>"+
				"<櫃號></櫃號>"+
				"<匣道></匣道>"+
				"<SYSID></SYSID>"+
				"<Email></Email>"+
				"<內部></內部>"+
				"<海外單位></海外單位>"+
				"<國別></國別>"+
				"<郵寄地區></郵寄地區>"+
				"<姓名>"+argDeptInfo.EmpName+"</姓名>"+
				//增加電子交換現況 TAG，以減少原函式fnChkIsAnyCanEIssue以竹受文者呼叫WS重取電子交換現況
				//檢核是否有機關可電子交換功能
				"<電子交換現況></電子交換現況>"+
				"<ERR/>";*/
				NewNode = gXmlObj.createElement("受文者");
				NewNode.setAttribute("序",argIndex);
				NewNode.setAttribute("本別",argDefaultDocType);
				//1080220 David	1080089 新增流水號
				NewNode.setAttribute("編號",gDept_SeqNo.toString());
				if(strDLGUseTrace=="Y")
					NewNode.setAttribute("CreateSN",argDeptInfo.CreateSN);
				//1070806	Cloud 1070685 增加紀錄識別碼
				if(gDLWork=="Y")
					NewNode.setAttribute("識別碼",gDlid);
				gDlid = "";
				fnMakeNode("全銜",argDeptInfo.OrgFullName,NewNode);
				fnMakeNode("正式名稱",argDeptInfo.Orgname,NewNode);
				fnMakeNode("機關代碼","",NewNode);
				fnMakeNode("單位代碼","",NewNode);
				fnMakeNode("郵遞區號","",NewNode);
				fnMakeNode("地址","",NewNode);
				fnMakeNode("發文方式",argIssueType,NewNode);
				fnMakeNode("含附件",argHasAatt,NewNode);
				fnMakeNode("櫃號","",NewNode);
				fnMakeNode("匣道","",NewNode);
				fnMakeNode("SYSID","",NewNode);
				fnMakeNode("Email","",NewNode);
				fnMakeNode("內部","",NewNode);
				fnMakeNode("海外單位","",NewNode);
				fnMakeNode("國別","",NewNode);
				fnMakeNode("郵寄地區","",NewNode);
				fnMakeNode("姓名",argDeptInfo.EmpName,NewNode);
				fnMakeNode("電子交換現況","",NewNode);
				//1060327 Cloud 1050802 增加寫入內部單位代碼
				fnMakeNode("內部單位代碼","",NewNode);
				//1090915	Joe		1090555		信保新增銀行代碼資訊--S
				if(strOrgNickName == "SMEG")
				{
					fnMakeNode("總行代碼","",NewNode);
					fnMakeNode("分行代碼","",NewNode);
				}
				//1090915	Joe		1090555		信保新增銀行代碼資訊--E
				//1141017	Joe		1141126		外貿增加傳真欄位
				if(strOrgNickName == "TAITRA")
				{
					fnMakeNode("傳真", "", NewNode);
					//1141229 David 1141432 外貿增加欄位
					fnMakeNode("名址條名稱", "", NewNode);
					fnMakeNode("職稱", "", NewNode);
				}
			}
			docType = $("#Dept_dlDocType option:selected").val();//將docType設回預設

			//1080312 David 1080089 無附件下載區時還是會有編號屬性，調整邏輯
			gDept_SeqNo++;

			//return strRtnInfo;
			return NewNode;
		}
		//1050818 Cloud	配合ie環境修改建立節點方式-新增建立節點函式
		function fnMakeNode(argTagName,argTageValue,argAppendNode)
		{
			var nd = gXmlObj.createElement(argTagName);
			if("text" in nd)
				nd.text = jf_DeptTrim(argTageValue);
			else
				nd.textContent = jf_DeptTrim(argTageValue);
			return argAppendNode.appendChild(nd);
		}
		
		//開啟群組編輯子視窗或是受文者修改子視窗 0:受文者修改子視窗 1:群組編輯子視窗
		function fnOpenModifyWin(argID,argMode)
		{
			if(argMode=="1")
			{
				var grpID = argID.split("_")[2];
				grpID++;
				var ObjGrp = activeDept.find("[序='"+grpID+"']").clone();
				$("#receiverSetting").find(".ui-slide-pane-left").removeClass("ui-slide-pane-active");//隱藏受文者編輯子視窗
				$("#receiverSetting").find(".ui-slide-pane-GRP").addClass("ui-slide-pane-active");//顯示群組編輯子視窗
				//1110225 David 1101481 調整發文方式選單處理邏輯
				//fnOpenModeGrp(argID,ObjGrp,$dlg,strDoctype,sendWays,theUserInfo,SOAPClient,SSO_CONFIG);
				fnOpenModeGrp(argID,ObjGrp,$dlg,strDoctype,theUserInfo,SOAPClient,SSO_CONFIG);
			}
			else
			{
				//1141229 David 1141432 外貿不提供單筆修正視窗
				if(strOrgNickName == "TAITRA")
					return;
				fnOpenModeOrg(argID,"0",activeDept,theUserInfo,SOAPClient,SSO_CONFIG,"Org",$dlg);//修改子視窗傳入參數argMode判斷是由群組還是單編輯子視窗開啟
			}
			
		}
		//讀入匯入檔案
		//1060216	Cloud	FDA-序2642	調整匯出CSV檔為UTF-8，修改程式碼，匯入時先以UTF-8讀入，如讀到亂碼再用BIG5讀
		var beInptfileReload = false;
		function fnInptfile(argFile)
		{
			if(argFile[0]==null)
				return;
			var reader = new FileReader();
			//1060216	Cloud	FDA-序2642	調整匯出CSV檔為UTF-8，修改程式碼，匯入時先以UTF-8讀入，如讀到亂碼再用BIG5讀
			if(beInptfileReload)
			{
				reader.readAsText(argFile[0],'big5');
				beInptfileReload = false;
			}
			else
			{
				reader.readAsText(argFile[0]);
			}

			//1051121	Cloud	配合匯出csv檔為big5，調整匯入時編碼預設big5
			//reader.readAsText(argFile[0]);
			//1060216	Cloud	FDA-序2642	調整匯出CSV檔為UTF-8，修改程式碼，匯入時先以UTF-8讀入，如讀到亂碼再用BIG5讀
			//reader.readAsText(argFile[0],'big5');
			reader.onload = function(e) 
			{
				var temp = e.target.result;
				//1060216	Cloud	FDA-序2642	調整匯出CSV檔為UTF-8，修改程式碼，匯入時先以UTF-8讀入，如讀到亂碼再用BIG5讀
				if(temp.indexOf('��')!=-1)
				{
					beInptfileReload = true;
					fnInptfile(argFile);
				}
				else
				{
					var data = $.csv.toArrays(temp);
					//序,受文者,郵遞區號,地址,Email,本別,姓名
					if (data && data.length > 0) 
					{
						//紀錄各資訊位置
						var OrgIndx = 0;
						var PoseCodeIndx = 0;
						var EmailIndx = 0;
						var AddressIndx = 0;
						var DocTypeIndx = 0;
						var EmpNameIndx = 0;
						//1141021	Joe		1141126		新增可匯入傳真號碼
						//1141229 David 1141432 紀錄外貿客製化匯入欄位
						//var FaxNoIndx = 0;
						var FaxNoIndx = -1;
						var iOrgTitleIndx = -1;//正副本稱謂
						var iHasAttIndx = -1;//含附件
						var iIssueTypeIndx = -1;//發文方式
						var iNameAddressIndx = -1;//名址條名稱
						var iJobTitleIndx = -1;//職稱
						if(strOrgNickName == "TAITRA")
						{
							//因外貿匯入欄位無序號欄位，後續無法用欄位index=0判斷
							OrgIndx = -1;
							PoseCodeIndx = -1;
							EmailIndx = -1;
							AddressIndx = -1;
							DocTypeIndx = -1;
							EmpNameIndx = -1;
						}

						var bRead = false;
						//紀錄各資訊
						var arOrg = new Array();//用ARRAY是為了可以給gArOrgName用
						var arrPoseCode = "";
						var arrAddress = "";
						var arrEmail = "";
						var arrDocType = "";
						var arrEmpName = "";
						//1141021	Joe		1141126		新增可匯入傳真號碼
						var arrFaxNo = "";
						//1141229 David 1141432 紀錄外貿客製化匯入欄位
						var arrOrgTitle = "";//正副本稱謂
						var arrHasAtt = "";//含附件
						var arrIssueType = "";//發文方式
						var arrNameAddress = "";//名址條名稱
						var arrJobTitle = "";//職稱

						for(var iRow=0;iRow<data.length;iRow++)
						{
							bRead = false;//每筆資料讀入處理
							for(var icolumn=0;icolumn<data[iRow].length;icolumn++)
							{
								//1141021	Joe		1141126		新增可匯入傳真號碼
								//1141229 David 1141432 客製化外貿匯入處理，調整邏輯
								/*if(strOrgNickName == "TAITRA")
								{
									if(icolumn>7)
										break;
								}
								else if(icolumn>6)//資料列最多7，超過即表示有多餘的逗號不進行處理
									break;*/
								if(strOrgNickName == "TAITRA")
								{
									if(icolumn > 12)//資料列最多12，超過即表示有多餘的逗號不進行處理
										break;

									if(iRow==0)//第一個ROW 是TITLE
									{
										switch(data[iRow][icolumn].toUpperCase())//紀錄個別資訊位於哪個位置
										{
											case "本別":
												DocTypeIndx = icolumn;
												break;
											case "受文者名稱":
												iOrgTitleIndx = icolumn;	
												break;
											case "對應機關名稱":
												OrgIndx = icolumn;	
												break;
											case "含附件":
												iHasAttIndx = icolumn;	
												break;
											case "發文方式":
												iIssueTypeIndx = icolumn;	
												break;
											case "郵遞區號":
												PoseCodeIndx = icolumn;	
												break;
											case "地址":
												AddressIndx = icolumn;
												break;
											case "電子郵件信箱":
												EmailIndx = icolumn;
												break;
											case "名址條名稱":
												iNameAddressIndx = icolumn;	
												break;
											case "人名":
												EmpNameIndx = icolumn;
												break;
											case "職稱":
												iJobTitleIndx = icolumn;	
												break;
											case "傳真":
												FaxNoIndx = icolumn;	
												break;
										}
									}
									else
									{
										if(!bRead)//單筆資料第一次讀入先處理沒有title的資訊
										{
											//0表示讀取時TITLE沒有讀到對應資訊，資訊直接給予空白
											if(OrgIndx == -1)
											{
												alert("無標題資料，無法匯入");
												return;//無受文者TITLE直接不用繼續了
											}
										
											//判斷受文者空白直接下一筆
											if(data[iRow][OrgIndx]==undefined || (data[iRow][OrgIndx]!=undefined && data[iRow][OrgIndx].toUpperCase()==""))
												continue;

											if(DocTypeIndx == -1)
												arrDocType += "|";
											if(iOrgTitleIndx == -1)
												arrOrgTitle += "|";
											if(iHasAttIndx == -1)
												arrHasAtt += "|";
											if(iIssueTypeIndx == -1)
												arrIssueType += "|";
											if(PoseCodeIndx == -1)
												arrPoseCode += "|";
											if(AddressIndx == -1)
												arrAddress += "|";
											if(EmailIndx == -1)
												arrEmail += "|";
											if(iNameAddressIndx == -1)
												arrNameAddress += "|";
											if(EmpNameIndx == -1)
												arrEmpName += "|";
											if(iJobTitleIndx == -1)
												arrJobTitle+="|";
											if(FaxNoIndx == -1)
												arrFaxNo+="|";

											bRead = true;
										}
										let sColumnValue = "";
										switch(icolumn)
										{
											case DocTypeIndx://本別
												if(data[iRow][icolumn] == undefined)
													arrDocType += "|";
												else
													arrDocType += jf_DeptTrim(data[iRow][icolumn])+ "|";
												break;
											case OrgIndx://受文者
												sColumnValue = jf_DeptTrim(data[iRow][icolumn]);
												if(sColumnValue.length > 60)
													sColumnValue = sColumnValue.substring(0,60);
												arOrg = arOrg.concat(sColumnValue);
												break;
											case iOrgTitleIndx://正副本稱謂
												if(data[iRow][icolumn]==undefined)
													arrOrgTitle += "|";
												else
												{
													sColumnValue = jf_DeptTrim(data[iRow][icolumn]);
													if(sColumnValue.length > 60)
														sColumnValue = sColumnValue.substring(0,60);
													arrOrgTitle += sColumnValue + "|";
												}
												break;
											case iHasAttIndx://含附件
												if(data[iRow][icolumn]==undefined)
													arrHasAtt += "|";	
												else
													arrHasAtt += jf_DeptTrim(data[iRow][icolumn])+ "|";
												break;
											case iIssueTypeIndx://發文方式
												if(data[iRow][icolumn]==undefined)
													arrIssueType += "|";	
												else
													arrIssueType += fnGetIssueTypeByWord(jf_DeptTrim(data[iRow][icolumn]))+ "|";
												break;
											case PoseCodeIndx://郵遞區號
												if(data[iRow][icolumn]==undefined)
													arrPoseCode += "|";	
												else
												{
													sColumnValue = jf_DeptTrim(data[iRow][icolumn]);
													if(sColumnValue.length > 6)
														sColumnValue = sColumnValue.substring(0,6);
													arrPoseCode += sColumnValue + "|";
												}
												break;
											case AddressIndx://地址
												if(data[iRow][icolumn]==undefined)
													arrAddress +="|";	
												else
												{
													sColumnValue = jf_DeptTrim(data[iRow][icolumn]);
													if(sColumnValue.length > 200)
														sColumnValue = sColumnValue.substring(0,200);
													arrAddress += sColumnValue + "|";
												}
												break;
											case EmailIndx://電子郵件
												if(data[iRow][icolumn]==undefined)
													arrEmail +="|";	
												else
												{
													sColumnValue = jf_DeptTrim(data[iRow][icolumn]);
													if(sColumnValue.length > 80)
														sColumnValue = sColumnValue.substring(0,80);
													arrEmail += sColumnValue + "|";
												}
												break;
											case iNameAddressIndx://名址條名稱
												if(data[iRow][icolumn]==undefined)
													arrNameAddress +="|";	
												else
												{
													sColumnValue = jf_DeptTrim(data[iRow][icolumn]);
													if(sColumnValue.length > 60)
														sColumnValue = sColumnValue.substring(0,60);
													arrNameAddress += sColumnValue + "|";
												}
												break;
											case EmpNameIndx://姓名
												if(data[iRow][icolumn]==undefined)
													arrEmpName +="|";	
												else
												{
													sColumnValue = jf_DeptTrim(data[iRow][icolumn]);
													if(sColumnValue.length > 60)
														sColumnValue = sColumnValue.substring(0,60);
													arrEmpName += sColumnValue + "|";
												}
												break;
											case iJobTitleIndx://職稱
												if(data[iRow][icolumn]==undefined)
													arrJobTitle +="|";	
												else
												{
													sColumnValue = jf_DeptTrim(data[iRow][icolumn]);
													if(sColumnValue.length > 20)
														sColumnValue = sColumnValue.substring(0,20);
													arrJobTitle += sColumnValue + "|";
												}
												break;
											case FaxNoIndx://傳真
												if(data[iRow][icolumn]==undefined)
													arrFaxNo +="|";	
												else
												{
													sColumnValue = jf_DeptTrim(data[iRow][icolumn]);
													if(sColumnValue.length > 20)
														sColumnValue = sColumnValue.substring(0,20);
													arrFaxNo += sColumnValue + "|";
												}
												break;
										}
									}
								}
								else
								{
									if(icolumn>6)//資料列最多7，超過即表示有多餘的逗號不進行處理
										break;
									if(iRow==0)//第一個ROW 是TITLE
									{
										switch(data[iRow][icolumn].toUpperCase())//紀錄個別資訊位於哪個位置
										{
											case "受文者":
												OrgIndx = icolumn;	
											break;
											
											case "郵遞區號":
												PoseCodeIndx =icolumn;	
											break;
											
											case "EMAIL":
												EmailIndx =icolumn;
											break;
											
											case "地址":
												AddressIndx =icolumn;
											break;
											
											case "本別":
												DocTypeIndx =icolumn;
											break;
											
											case "姓名":
												EmpNameIndx =icolumn;
											break;
											//1141021	Joe		1141126		新增可匯入傳真號碼
											//1141229 David 1141432 客製化外貿匯入處理，調整邏輯
											/*case "傳真":
												FaxNoIndx =icolumn;
											break;*/
										}
									}
									else
									{
										if(!bRead)//單筆資料第一次讀入先處理沒有title的資訊
										{
											//0表示讀取時TITLE沒有讀到對應資訊，資訊直接給予空白
											
											if(OrgIndx == 0)
												return;//無受文者TITLE直接不用繼續了
										
											//判斷受文者空白直接下一筆
											if(data[iRow][OrgIndx]==undefined || 
											(data[iRow][OrgIndx]!=undefined && data[iRow][OrgIndx].toUpperCase()==""))
												continue;
										
											if(PoseCodeIndx == 0)
												//1051227	Cloud	調整匯入時，切割各資訊用的特殊符號
												//arrPoseCode+=",";	
												arrPoseCode+="|";	
											if(EmailIndx == 0)
												//1051227	Cloud	調整匯入時，切割各資訊用的特殊符號
												//arrEmail +=",";	
												arrEmail +="|";
											if(AddressIndx == 0)
												//1051227	Cloud	調整匯入時，切割各資訊用的特殊符號
												//arrAddress +=",";	
												arrAddress +="|";	
											if(DocTypeIndx == 0)
												//1051227	Cloud	調整匯入時，切割各資訊用的特殊符號
												//arrDocType +=",";	
												arrDocType +="|";	
											if(EmpNameIndx == 0)
												//1051227	Cloud	調整匯入時，切割各資訊用的特殊符號
												//arrEmpName +=",";
												arrEmpName +="|";
											//1141021	Joe		1141126		新增可匯入傳真號碼
											//1141229 David 1141432 客製化外貿匯入處理，調整邏輯
											/*if(FaxNoIndx == 0)
												arrFaxNo +="|";*/
											bRead = true;
										}
										switch(icolumn)
										{
											case OrgIndx://對應至TILE位置
												arOrg = arOrg.concat(jf_DeptTrim(data[iRow][icolumn]));
											break;
											
											case PoseCodeIndx:
												if(data[iRow][icolumn]==undefined)//
													//1051227	Cloud	調整匯入時，切割各資訊用的特殊符號
													//arrPoseCode+=",";	
													arrPoseCode+="|";	
												else
													//1051227	Cloud	調整匯入時，切割各資訊用的特殊符號
													//arrPoseCode+=jf_DeptTrim(data[iRow][icolumn])+ ",";
													arrPoseCode+=jf_DeptTrim(data[iRow][icolumn])+ "|";
											break;
											
											case EmailIndx:
												if(data[iRow][icolumn]==undefined)
													//1051227	Cloud	調整匯入時，切割各資訊用的特殊符號
													//arrEmail +=",";	
													arrEmail +="|";	
												else
													//1051227	Cloud	調整匯入時，切割各資訊用的特殊符號
													//arrEmail +=jf_DeptTrim(data[iRow][icolumn])+ ",";
													arrEmail +=jf_DeptTrim(data[iRow][icolumn])+ "|";
											break;
											
											case AddressIndx:
												if(data[iRow][icolumn]==undefined)
													//1051227	Cloud	調整匯入時，切割各資訊用的特殊符號
													//arrAddress +=",";	
													arrAddress +="|";	
												else
													//1051227	Cloud	調整匯入時，切割各資訊用的特殊符號
													//arrAddress +=jf_DeptTrim(data[iRow][icolumn])+ ",";
													arrAddress +=jf_DeptTrim(data[iRow][icolumn])+ "|";
											break;
											
											case DocTypeIndx:
												if(data[iRow][icolumn]==undefined)
													//1051227	Cloud	調整匯入時，切割各資訊用的特殊符號
													//arrDocType +=",";	
													arrDocType +="|";	
												else
													//1051227	Cloud	調整匯入時，切割各資訊用的特殊符號
													//arrDocType +=jf_DeptTrim(data[iRow][icolumn])+ ",";
													arrDocType +=jf_DeptTrim(data[iRow][icolumn])+ "|";
											break;
											
											case EmpNameIndx:
												if(data[iRow][icolumn]==undefined)
													//1051227	Cloud	調整匯入時，切割各資訊用的特殊符號
													//arrEmpName +=",";	
													arrEmpName +="|";	
												else
													//1051227	Cloud	調整匯入時，切割各資訊用的特殊符號
													//arrEmpName +=jf_DeptTrim(data[iRow][icolumn])+ ",";
													arrEmpName +=jf_DeptTrim(data[iRow][icolumn])+ "|";
											break;
											//1141021	Joe		1141126		新增可匯入傳真號碼
											//1141229 David 1141432 客製化外貿匯入處理，調整邏輯
											/*case FaxNoIndx:
												if(data[iRow][icolumn]==undefined)
													arrFaxNo +="|";	
												else
													arrFaxNo +=jf_DeptTrim(data[iRow][icolumn])+ "|";
											break;*/
										}
									}
								}
							}
						}
					} 
					else 
					{
						alert('無資料可供匯入');
						return;
					}

					//1141229 David 1141432 無匯入資料時，不需繼續執行
					if(arOrg.length == 0)
					{
						alert('匯入資料有誤，無法執行');
						return;
					}

					DataInfo[0] = true;
					//1051227	Cloud	調整匯入時，切割各資訊用的特殊符號
					/*DataInfo[1] = arrPoseCode.split(',');
					DataInfo[2] = arrAddress.split(',');
					DataInfo[3] = arrEmail.split(',');
					DataInfo[4] = arrDocType.split(',');
					DataInfo[5] = arrEmpName.split(',');*/
					DataInfo[1] = arrPoseCode.split('|');
					DataInfo[2] = arrAddress.split('|');
					DataInfo[3] = arrEmail.split('|');
					DataInfo[4] = arrDocType.split('|');
					DataInfo[5] = arrEmpName.split('|');
					//1141021	Joe		1141126		新增可匯入傳真號碼
					DataInfo[6] = arrFaxNo.split('|');
					//1141229 David 1141432 新增紀錄外貿匯入欄位
					DataInfo[7] = arrHasAtt.split('|');//含附件
					DataInfo[8] = arrIssueType.split('|');//發文方式
					DataInfo[9] = arrNameAddress.split('|');//名址條名稱
					DataInfo[10] = arrJobTitle.split('|');//職稱
					DataInfo[11] = arrOrgTitle.split('|');//正副本稱謂

					gArOrgName = gArOrgName.concat(arOrg);
					gArOrgFullName = gArOrgFullName.concat(arOrg);

					//匯入呼叫WS
					//1130813 David 1130313 支援離線版invokeJSON改為非同步行為，改為CallBack邏輯
					//fnAddDeptList();
					fnAddDeptList().done(function() {
						$("input#Dept_fileInput").val("");
						fnInptfileEnd();
					});
				}
				//1130813 David 1130313 支援離線版invokeJSON改為非同步行為，改為CallBack邏輯
				//$("input#Dept_fileInput").val("");
				
			};
			//1130813 David 1130313 支援離線版invokeJSON改為非同步行為，改為CallBack邏輯
			function fnInptfileEnd()
			{
				//全域變數恢復預設
				gArOrgName = new Array();
				gArOrgFullName = new Array();
				//$("input#Dept_fileInput").val("");
				gInclude = false;
				//1060809	Cloud	[1060716] 一併調整一併調整恢復匯入至一群組名稱預設值時機點恢復預設值時機點
				//gIncludeGrpName = "";
			}
		}
		//一次增加多筆受文者，供匯入呼叫
		function fnAddDeptList()
		{
			//1130813 David 1130313 支援離線版非同步行為，新增Deferred處理
			var AddDeptListDfd = $.Deferred();

			var params = new SOAPClientParameters();
			params.add('argFullNameArr', gArOrgName);
			params.add('OrgNo', theUserInfo.OrgID);
			params.add('DeptNo', theUserInfo.DepartID);
			params.add('UserID', theUserInfo.UserID);
			params.add('Artifact', theUserInfo.Artifact);
			params.add('bIsCsv', DataInfo[0]);
			params.add('argPostNo', DataInfo[1]);
			params.add('argAddress', DataInfo[2]);
			params.add('argEmail', DataInfo[3]);
			params.add('argDocType', DataInfo[4]);
			params.add('bAutoGroup', $("input#Dept_cbAutoGroup").prop("checked"));
			params.add('argEmpName', DataInfo[5]);
			//1070807 [1070685] Cloud 新增寫入識別碼
			params.add("argSeq", gDept_SeqNo.toString());
			params.add('argDocNo', qdocNo);
			//1110322	Joe		1110216		新增傳入受文者檢核邏輯
			params.add('gCheckDuplicte', gCheckDuplicte.charAt(0));
			//1130813 David 1130313 支援離線版invokeJSON改為非同步行為
			//SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetOrgInfoBatch", params, false, function(rslt)
			SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetOrgInfoBatch", params, true, function(rslt)
			{
				if (typeof rslt == 'object') 
				{
					//1051213 Cloud 補上ws錯誤時判斷
					if(rslt.error)
					{
						alert('匯入受文者時WebServe發生異常，錯誤訊息：'+rslt.responseText);
						//全域變數恢復預設
						gArOrgName = new Array();
						gArOrgFullName = new Array();
						$("input#Dept_fileInput").val("");
						gInclude = false;
						gIncludeGrpName = "";
						//1130813 David 1130313 支援離線版非同步行為，新增Deferred處理
						//return;
						AddDeptListDfd.resolve();
					}
					if(rslt.value!=null && rslt.value.ErrorClass!=null && rslt.value.ErrorClass.IsErr)
					{
						alert('匯入受文者時WebServe發生異常，錯誤訊息：'+rslt.value.ErrorClass.ErrMessage[0]);
						//全域變數恢復預設
						gArOrgName = new Array();
						gArOrgFullName = new Array();
						$("input#Dept_fileInput").val("");
						gInclude = false;
						gIncludeGrpName = "";
						//1130813 David 1130313 支援離線版非同步行為，新增Deferred處理
						//return;
						AddDeptListDfd.resolve();
					}
					if (rslt.value.Count  > 0)
					{
						gInclude = true;
						
						var retOrgCnt = rslt.value.Count;
						var ResultChoose;
						
						//progressClear(retOrgCnt);

						for(var idxOrg = 0;idxOrg < retOrgCnt;idxOrg++)
						{
							var XMLseq = receiverList.children.length+1;//XML物件內的紀錄於TAG內的序<受文者 序>
							var seq =receiverList.children.length;//畫面物件內的INDEX順序
							
							//ShowProgress(1,"正在處理取得之機關資訊...");
							var reOrgInfo = rslt.value.RtnBatch[idxOrg];
							
							//兩筆以上開啟選擇子視窗
							if (reOrgInfo.Count  > 1 && !reOrgInfo.IsGrp)
							{
								var XmlSeq = receiverList.children.length+1;
								fnOpenWinChoose(reOrgInfo,"Org",$dlg);
								//建立空白畫面-由子視窗回傳後取代
								var DeptInfo = 
								{
									"Seq": XMLseq,
									"Orgname": "",
									"EmpName": "",
									"OrgFullName": "",
									"DocType": "",
									"attach": "",
									"docissuetype": "",
									"PostNo": "",
									"Address": "",
									"Email": "",
									"GrpName": "",
									"CreatSName": "",
									"DeleteSName": "",
									"CreateSN":gEditSn,
									//1090915	Joe		1090555		信保新增銀行代碼資訊
									"Bank":"",
									"BankSub":"",
								};
								//1141021	Joe		1141126		新增可匯入傳真號碼
								//1141229 David 1141432 客製化外貿匯入處理，調整邏輯
								/*if(strOrgNickName == "TAITRA")
								{
									if(DataInfo[6] != undefined)
									{
										if(DataInfo[6].length > idxOrg)
										{
											DeptInfo.FaxNo = DataInfo[6][idxOrg];
										}
									}
								}*/
								if(strOrgNickName == "TAITRA")
								{
									DeptInfo.FaxNo = DataInfo[6][idxOrg];
									DeptInfo.attach = DataInfo[7][idxOrg];
									DeptInfo.defaultIssueType = DataInfo[8][idxOrg];
									DeptInfo.NameAddress = DataInfo[9][idxOrg];
									DeptInfo.JobTitle = DataInfo[10][idxOrg];
									DeptInfo.OrgFullName = DataInfo[11][idxOrg];
								}

								fnCreatDeptTable(DeptInfo,"受文者",XmlSeq);
							}
							else
							{
								//1141021	Joe		1141126		新增可匯入傳真號碼
								//1141229 David 1141432 客製化外貿匯入處理，調整邏輯
								/*if(strOrgNickName == "TAITRA")
								{
									if(DataInfo[6] != undefined)
									{
										if(DataInfo[6].length > idxOrg)
										{
											reOrgInfo.FaxNo = DataInfo[6][idxOrg];
										}
									}
								}*/
							}

							//群組 塞進群組
							if (reOrgInfo.Count > 0 &&  reOrgInfo.IsGrp)
							{
								//1141229 David 1141432 客製化外貿匯入處理
								if(strOrgNickName == "TAITRA")
								{
									reOrgInfo.FaxNo = [];
									reOrgInfo.defaultIssueType = [];
									reOrgInfo.NameAddress = [];
									reOrgInfo.JobTitle = [];
									reOrgInfo.OrgFullName = [];
									for(let iGrp = 1 ; iGrp < reOrgInfo.OrgID.length ; iGrp++)
									{
										reOrgInfo.FaxNo[iGrp] = DataInfo[6][iGrp-1];
										reOrgInfo.defaultIssueType[iGrp] = DataInfo[8][iGrp-1];
										reOrgInfo.NameAddress[iGrp] = DataInfo[9][iGrp-1];
										reOrgInfo.JobTitle[iGrp] = DataInfo[10][iGrp-1];
										reOrgInfo.OrgFullName[iGrp] = DataInfo[11][iGrp-1];
									}
								}

								fnAddGrpNewDept(reOrgInfo,seq,XMLseq);
							}
							//單筆加入
							else if (reOrgInfo.Count > 0)
							{
								//1141229 David 1141432 客製化外貿匯入處理
								if(strOrgNickName == "TAITRA")
								{
									reOrgInfo.FaxNo = [];
									reOrgInfo.FaxNo[0] = DataInfo[6][idxOrg];
									reOrgInfo.attach = [];
									reOrgInfo.attach[0] = DataInfo[7][idxOrg];
									reOrgInfo.defaultIssueType = [];
									reOrgInfo.defaultIssueType[0] = DataInfo[8][idxOrg];
									reOrgInfo.NameAddress = [];
									reOrgInfo.NameAddress[0] = DataInfo[9][idxOrg];
									reOrgInfo.JobTitle = [];
									reOrgInfo.JobTitle[0] = DataInfo[10][idxOrg];
									reOrgInfo.OrgFullName = [];
									reOrgInfo.OrgFullName[0] = DataInfo[11][idxOrg];
								}
								fnAddOneNewDept(reOrgInfo,seq,XMLseq,"單筆");
							}
							//不存在DB-匯入時會將不存在DB的資料以匯入資訊建立回傳物件
							if (reOrgInfo.Count == 0)
							{
								fnAddOneNewDept(reOrgInfo,seq,XMLseq,"單筆");
							}
						}
						//1130813 David 1130313 支援離線版非同步行為，改為CallBack邏輯
						/*//1090219	Joe	1080764 	紀錄新增受文者不存在資料庫時處理
						if(rslt.value.strNoDbDataList!="" && theSSO.User.SystemSets.get("WE_ALERT_ORGNOTINDB") == "1")
							alert("以下受文者不存在資料庫："+rslt.value.strNoDbDataList+"請確認是否修正");
						//1121116	Joe		1120743		新增判斷匯入資料是否有異動
						if(rslt.value.AlertAddChg != "")
							alert("匯入完畢，" + rslt.value.AlertAddChg + "之郵遞區號及地址已帶入系統資料");*/
						GetOrgInfoBatchEnd(rslt);
						AddDeptListDfd.resolve();
					}
				}
				else 
				{
					//1130813 David 1130313 支援離線版非同步行為，新增Deferred處理
					//throw new Error('叫用 WebFileIO.GetOrgInfoBatch  時發生錯誤!');
					alert('叫用 WebFileIO.GetOrgInfoBatch  時發生錯誤!');
					GetOrgInfoBatchEnd();
					AddDeptListDfd.resolve();
				}
				//1130813 David 1130313 支援離線版非同步行為，改為CallBack邏輯
				function GetOrgInfoBatchEnd(rslt)
				{
					if(rslt != null)
					{
						if(rslt.value.strNoDbDataList!="" && theSSO.User.SystemSets.get("WE_ALERT_ORGNOTINDB") == "1")
								alert("以下受文者不存在資料庫："+rslt.value.strNoDbDataList+"請確認是否修正");
						if(rslt.value.AlertAddChg != "")
							alert("匯入完畢，" + rslt.value.AlertAddChg + "之郵遞區號及地址已帶入系統資料");
					}

					//全域變數恢復預設
					gArOrgName = new Array();
					gArOrgFullName = new Array();
					$("input#Dept_fileInput").val("");
					gInclude = false;
					//1060809	Cloud	[1060716] 一併調整一併調整恢復匯入至一群組名稱預設值時機點恢復預設值時機點
					//gIncludeGrpName = "";
				}
			});

			//1130813 David 1130313 支援離線版非同步行為，新增Deferred處理
			return AddDeptListDfd.promise();
		}
		//開啟WEM010C1
		function fnOpenWem010C1()
		{
			var WebPage = SSO_CONFIG.getWSUrl("weorginfows");
			var strQry = "OrgID="+theUserInfo.OrgID+"&DeptID="+theUserInfo.DepartID+"&UserID="+theUserInfo.UserID+
			"&Artifact="+theUserInfo.Artifact+"&SAMLart="+theUserInfo.Artifact;
			
			if (jf_DeptTrim($("#Dept_txOrgName").val()) != "")
				strQry +="&K1=Dlg_Dept&Search="+escape(jf_DeptTrim($("#Dept_txOrgName").val()));
			else
				strQry +="&K1=Dlg_Dept&Search=";
			var strUrl = WebPage.substring(0,WebPage.lastIndexOf('/'))+"/WEM010C1.aspx?"+strQry;
			var $pane = $("div#WEM010C1_DIV");
			var $frame = $pane.find('iframe');
			if ($frame.length)
			{
				$frame.css("width", "60%").css("height", "60%").css("margin-top", "10%").css("margin-left", "20%");//iframe有預設border-width;//iframe有預設border-width
				$frame[0].src = strUrl;
			}
			$("div#WEM010C1_DIV")[0].style="width:100%; height:100%; position:absolute; left:0px; top:0px; z-index:0"
			$pane.find(".ui-slide-pane-active").removeClass("ui-slide-pane-active");
			$pane.addClass("ui-slide-pane-active");
		}
		//開啟WEM010C3
		function fnOpenWem010C3(strXML)
		{
			var WebPage = SSO_CONFIG.getWSUrl("weorginfows");
			$("div#WEM010C1_DIV").find("input#WEM010C3VALUE").val(escape(strXML));//設定傳入值
			var strQry = "argRoleID="+strWeCheckissue.split('|')[1]+"&SAMLart="+theUserInfo.Artifact+
			"&HasTb="+strHasTB+"&SupEmail="+strOdSupportEmail+"&TbHaOutSide="+strHasOutSideTB+"&HasOS="+gHasOs;
			
			var strUrl = WebPage.substring(0,WebPage.lastIndexOf('/'))+"/WEM010C3.aspx?"+strQry;
			var $pane = $("div#WEM010C1_DIV");
			var $frame = $pane.find('iframe');
			if ($frame.length)
			{
				$frame.css("width", "80%").css("height", "85%").css("margin-top", "10%").css("margin-left", "15%");//iframe有預設border-width;//iframe有預設border-width
				$frame[0].src = strUrl;
			}
			$("div#WEM010C1_DIV")[0].style="width:100%; height:100%; position:absolute; left:0px; top:0px; z-index:0"
			$pane.find(".ui-slide-pane-active").removeClass("ui-slide-pane-active");
			$pane.addClass("ui-slide-pane-active");
		}
		
		//儲存前檢核
		//1051026	Cloud	調整儲存檢核函式，改為物件可由受文者清單呼叫-改為全域函式
		/*function fncheckBeforeSave()
		{
			//1050902 Cloud	修正檢核對象，僅檢核受文者即可
			//var ndOrgList = activeDept.children("受文者,受文者列表,已刪除");
			var ndOrgList = activeDept.children("受文者");
			if (ndOrgList && ndOrgList.length > 0)
			{
				bIsAutoChangeSendType = true;
				//檢核發文方式是否有受文者發文方式使用
				var pSendTypeText = $("#Dept_dlSendType option:selected").text();
				var bIsMatchSendType = false;
				//檢核發文細項方式是否有受文者發文方式使用
				//var pSendDetailType = oDoc.dlSendDetailType.options[oDoc.dlSendDetailType.selectedIndex].text;
				var pSendDetailType = $("#Dept_dlSendDetailType option:selected").text();
				var bIsMatchSendDetailType = $("#Dept_dlSendDetailType option:selected").children().length == 1 ;
				//檢核公文是否為紙本發文
				var bIsPaper = $("#Dept_dlSendType option:selected").val() == '紙本公文';
				//紀錄無法電子發文原因
				var CantEIssueReason = $("#Dept_dlCantEIssueReason option:selected").val();
				//先檢查全部受文者不為抄本時才可以忽略抄本判斷
				var TransCript_Check = false;
				//strOdTranScriptCheck
				if(strOdTranScriptCheck=="N")
				{
					for (var iOrgList = 0 ; iOrgList < ndOrgList.length ; iOrgList++)
					{
						if(ndOrgList.eq(iOrgList).attr("本別")!="抄本")
						{
							TransCript_Check = true;
							break;
						}
					}
				}
				//紀錄是否通過檢核
				var bCanPassCheck = true;
				//以使用者選擇公文發文方式檢核是否符合受文者發文方式
				for (var iOrgList = 0 ; iOrgList < ndOrgList.length ; iOrgList++)
				{
					var pIssueType = ndOrgList.eq(iOrgList).find("發文方式").text();
					var pDocType = ndOrgList.eq(iOrgList).attr("本別");
					
					if (pDocType == '抄本' && strOdTranScriptCheck=="N" && TransCript_Check)
						continue;
					//系統紀錄所有發文方式-檢核各受文者自己發文方式
					for(var iType=0;iType<gIssueSendType.length;iType++)
					{
						if(gIssueTypeSort[iType] == pIssueType)
						{
							//公文紙本發文受文者有電子交換或是公文電子交換受文者有公佈欄則不通過檢核
							if((bIsPaper && gIssueSendType[iType]!='紙本')||(pSendType =='電子交換' && gIssueSendType[iType]=='電子公布欄'))
							{
								bCanPassCheck = false;
								break;
							}
							//檢核全文發文方式是否與受文者發文類型相同(紙本、電子交換...)
							if(pSendTypeText == gIssueSendType[iType])
								bIsMatchSendType = true;
							
							//檢核發文方式細項是否與受文者發文方式相同(人工傳遞、郵寄、電子交換...)
							if(pSendDetailType == pIssueType || pSendDetailType=="")
								bIsMatchSendDetailType = true;
							break;
						}
					}
					if(!bCanPassCheck)
						break;
				}
				//檢核未通過
				if(!bCanPassCheck)
				{
					bIsMatchSendType = false;
					bIsMatchSendDetailType = $("#Dept_dlSendDetailType option:selected").text().length == 1 ;
				}
				//發文方式或發文細項方式不符合-此處邏輯只要有一個受文者完全符合發文方式跟細項檢核就不會進來
				if(!bIsMatchSendType || !bIsMatchSendDetailType)
				{
					//自動切換發文方式-直到發文方式及發文細項方式可以符合其中一個受文者的發文方式
					for (var iSendType = $("#Dept_dlSendType").children().length-1 ; iSendType >= 0 ; iSendType--)
					{
						$("#Dept_dlSendType option:eq("+iSendType+")").prop('selected', true);
						dlSendTypeOnChange();
						//自動切換發文方式細項
						for(var iDetailType = 0; iDetailType < $("#Dept_dlSendDetailType").children.length; iDetailType++)
						{
							$("#Dept_dlSendDetailType option:eq("+iDetailType+")").prop('selected', true);
							
							//紀錄公文發文方式
							pSendTypeText = $("#Dept_dlSendType option:selected").text();
							pSendDetailType = $("#Dept_dlSendDetailType option:selected").text();
							
							//各受文者
							for (var iOrgList = 0 ; iOrgList < ndOrgList.length ; iOrgList++)
							{
								
								var pIssueType = ndOrgList.eq(iOrgList).find("發文方式").text();
								var pDocType = ndOrgList.eq(iOrgList).attr("本別");
								
								//如果參數設為N且受文者不全部為抄本時，忽略抄本的發文方式判斷
								if (pDocType == '抄本' && strOdTranScriptCheck=="N" && TransCript_Check)
									continue;
								
								//系統紀錄所有發文方式迴圈
								for(var iType=0;iType<gIssueSendType.length;iType++)
								{
									if(gIssueTypeSort[iType] == pIssueType)
									{	
										//檢核發文方式是否與受文者發文方式使用
										if(pSendTypeText == gIssueSendType[iType])
											bIsMatchSendType = true;
										//檢核發文方式細項是否與受文者發文方式使用
										if(pSendDetailType == pIssueType || pSendDetailType=="")
											bIsMatchSendDetailType = true;
										break;
									}
								}
								if(bIsMatchSendType && bIsMatchSendDetailType)
									break;
							}
							if(bIsMatchSendType && bIsMatchSendDetailType)
								break;
						}
						if(bIsMatchSendType && bIsMatchSendDetailType)
							break;
					}
				}
				//如原本有無法電子交換原因，則放回去
				if($("#Dept_dlSendType option:selected").val() == '紙本公文')
				{
					$("#Dept_dlCantEIssueReason").val(CantEIssueReason);
				}
				bIsAutoChangeSendType = false;
				//利用dlSendTypeOnChange去做一次全受文者檢核
				dlSendTypeOnChange();
			}
			
			gErrorMessage = "";//於檢查前將錯誤訊息清空，避免重複跳出訊息
			var RtnBool = false;
			//重設序，實在沒有保留必要-先MARK
			/*for (var i = 1 ; i < activeDept.children("受文者,受文者列表,已刪除").length; i++)
			{
				//追蹤修訂功能
				var bIsGrp=false;//是否為群組受文者
				if(activeDept.children("受文者,受文者列表,已刪除").eq(i).attr("群組代號")!=undefined)
					bIsGrp=true;

				if (!bIsGrp)
					activeDept.children("受文者,受文者列表,已刪除").eq(i).attr("序",i);
				else
				{
					activeDept.children("受文者,受文者列表,已刪除").eq(i).attr("序",i);
					var oGrp = activeDept.children("受文者,受文者列表,已刪除").eq(i);
					for (var j = 1 ; j < oGrp.children("受文者,已刪除").length ; j++)
					{
						oGrp.children("受文者,已刪除").eq(j).attr("序",i+'_'+j);
					}
				}
			}*/
			/*pSendType = $("#Dept_dlSendType option:selected").val();
			
			//檢核發文方式是否與受文者發文方式使用
			//var pSendTypeText = oDoc.dlSendType.options[oDoc.dlSendType.selectedIndex].text;
			var pSendTypeText = $("#Dept_dlSendType option:selected").text();
			var bIsMatchSendType = false;
			//檢核發文細項方式是否與受文者發文方式使用
			//var pSendDetailType = oDoc.dlSendDetailType.options[oDoc.dlSendDetailType.selectedIndex].text;
			var pSendDetailType = $("#Dept_dlSendDetailType option:selected").text();
			var bIsMatchSendDetailType = pSendDetailType=="" ;
			//檢核發文細項方式是否包含電子發文
			var bIsHaveEIssue = false;
			
			var bIsPaper = pSendType == '紙本公文';
			//var ndOrgList = gDomOrg.selectNodes("//受文者");
			var pErrList1 = '';
			var pErrList2 = '';
			var pErrList3 = '';
			var pErrList4 = '';
			var pErrDupName = '';
			var pErrDupNo = '';
			var ndOrgList = activeDept.find("受文者");
			if (ndOrgList && ndOrgList.length > 0)
			{
			
				//先檢查全部受文者不為抄本時才可以忽略抄本判斷
				var TransCript_Check = false;
				if(strOdTranScriptCheck=="N")
				{
					if(activeDept.find("受文者[本別!='抄本']").length!=0)
						TransCript_Check = true;
				}
				for (var i = 0 ; i < ndOrgList.length ; i++)
				{
					var pIssueType = ndOrgList.eq(i).find("發文方式").text();
					var pFullName = ndOrgList.eq(i).find("正式名稱").text();
					var pOrgNo = jf_DeptTrim(ndOrgList.eq(i).find("機關代碼").text());
					var pDeptNo = jf_DeptTrim(ndOrgList.eq(i).find("單位代碼").text());
					var pSeq = ndOrgList.eq(i).attr("序");
					var pDocType = ndOrgList.eq(i).attr("本別");
					var ndDupOrg = null;
					var ndDupOrgNo = null;
					//配合姓名欄位增加 修改檢核機制
					//var pEmpname = (ndOrgList[i].selectSingleNode("姓名").text)?ndOrgList[i].selectSingleNode("姓名").text : "";
					var pEmpname = (ndOrgList.eq(i).find("姓名").text())?ndOrgList.eq(i).find("姓名").text() : "";
					//檢查是否有重覆的受文者
					//0:不警告 1:同本別才警告且抄本不檢查(程式預設值) 2:同本別才警告 3:抄本不檢查 4:均檢查 -->
					
					//重複名稱 或是 重複機關/單位代碼 提示字串內無當前受文者序時，才需經過以下檢核
					if(pErrDupName.indexOf(pSeq) == -1)
					{
						switch (gCheckDuplicte.charAt(0))
						{
							case "0":
							break;
							
							case "1":
								if (pDocType == '抄本')
									ndDupOrg = null;
								else
								{
									ndDupOrg = activeDept.find("受文者[本別='"+pDocType+"']").find("正式名稱:contains("+pFullName+")").filter(function() {return $(this).text() == pFullName;}).parent().find("姓名:contains("+pEmpname+")").filter(function() {return $(this).text() == pEmpname;}).parent();
								}
							break;
							
							case "2":
								ndDupOrg = activeDept.find("受文者[本別='"+pDocType+"']").find("正式名稱:contains("+pFullName+")").filter(function() {return $(this).text() == pFullName;}).parent();
							break;
							
							case "3":
								if (pDocType == '抄本')
									ndDupOrg = null;
								else
								ndDupOrg = activeDept.find("受文者[本別!='抄本']").find("正式名稱:contains("+pFullName+")").filter(function() {return $(this).text() == pFullName;}).parent().find("姓名:contains("+pEmpname+")").filter(function() {return $(this).text() == pEmpname;}).parent();
							break;
							
							case "4":	
								ndDupOrg = activeDept.find("受文者").find("正式名稱:contains("+pFullName+")").filter(function() {return $(this).text() == pFullName;}).parent().find("姓名:contains("+pEmpname+")").filter(function() {return $(this).text() == pEmpname;}).parent();
							break;
						}

						if (ndDupOrg!=null && ndDupOrg.length > 1)
						{
							var pDupSeq = new Array();
							for (var IdxDupOrg = 0;IdxDupOrg < ndDupOrg.length ; IdxDupOrg++)
							{
								pDupSeq[IdxDupOrg] = ndDupOrg.eq(IdxDupOrg).attr("序");
							}
							pErrDupName += '\n\r 序'+pDupSeq+' '+pFullName+' 名稱重覆';
						}
					}
					if(pErrDupNo.indexOf(pSeq) == -1)
					{
						//檢查是否有重覆的機關、單位代碼
						if(pOrgNo !='')//現行受文者無機關代碼則不做此項檢核
						{
							switch (gCheckDuplicte.charAt(1))
							{
								case "0":
								break;
								case "1":
									if (pDocType == '抄本')
										ndDupOrgNo = null;
									else										
										ndDupOrgNo = activeDept.find("受文者[本別='"+pDocType+"']").find("機關代碼:contains("+pOrgNo+")").filter(function() {return $(this).text() == pOrgNo;}).parent().find("單位代碼:contains("+pDeptNo+")").filter(function() {return $(this).text() == pDeptNo;}).parent().find("姓名:contains("+pEmpname+")").filter(function() {return $(this).text() == pEmpname;}).parent();
								break;
								case "2":
									ndDupOrgNo = ndDupOrgNo = activeDept.find("受文者[本別='"+pDocType+"']").find("機關代碼:contains("+pOrgNo+")").filter(function() {return $(this).text() == pOrgNo;}).parent().find("單位代碼:contains("+pDeptNo+")").filter(function() {return $(this).text() == pDeptNo;}).parent().find("姓名:contains("+pEmpname+")").filter(function() {return $(this).text() == pEmpname;}).parent();
								break;
								
								case "3":
									if (pDocType == '抄本')
										ndDupOrgNo = null;
									else
										ndDupOrgNo = activeDept.find("受文者[本別!='抄本']").find("機關代碼:contains("+pOrgNo+")").filter(function() {return $(this).text() == pOrgNo;}).parent().find("單位代碼:contains("+pDeptNo+")").filter(function() {return $(this).text() == pDeptNo;}).parent().find("姓名:contains("+pEmpname+")").filter(function() {return $(this).text() == pEmpname;}).parent();
								break;
								
								case "4":
									ndDupOrgNo = activeDept.find("受文者").find("機關代碼:contains("+pOrgNo+")").filter(function() {return $(this).text() == pOrgNo;}).parent().find("單位代碼:contains("+pDeptNo+")").filter(function() {return $(this).text() == pDeptNo;}).parent().find("姓名:contains("+pEmpname+")").filter(function() {return $(this).text() == pEmpname;}).parent();
								break;
							}
							if (ndDupOrgNo = null && ndDupOrgNo.length > 1)
							{
								var pDupSeq = new Array();
								for (var IdxDupOrg = 0;IdxDupOrg < ndDupOrgNo.length ; IdxDupOrg++)
								{
									pDupSeq[IdxDupOrg] = ndDupOrgNo.eq(IdxDupOrg).attr("序");;
								}
								pErrDupNo += '\n\r 序'+pDupSeq+' 電子交換代碼重覆';
							}
						}
					}

					
					var Isinside = ndOrgList.eq(i).find("內部").length==1?ndOrgList.eq(i).find("內部").text():"N";
					//取得是否為海外單位
					var OverSea = ndOrgList.eq(i).find("海外單位").length==1?ndOrgList.eq(i).find("海外單位").text():"0";

					if (pIssueType == '電子交換')
					{
						var pAllOrgNo = pOrgNo + pDeptNo;//取完整機關代碼(機關代碼+單位代碼)
						
						if(pAllOrgNo.length != 10 && pAllOrgNo.length != 17 && OverSea != "1")
							pErrList1 += '\n\r 序'+pSeq+' '+pFullName+' 無機關代碼 發文方式不可為電子交換';
					}
					else if (pIssueType == '')
						pErrList2 += '\n\r 序'+pSeq+' '+pFullName+' 發文方式不可為空白';
					//檢核是否可Email發文，及檢核電子郵件欄位
					else if (pIssueType == '電子郵件')
					{
						var strEmail = ndOrgList.eq(i).find("Email").length==1?ndOrgList.eq(i).find("Email").text():"";
						var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
						
						if(strOdSupportEmail == "I" && Isinside == "N")
							pErrList2 += '\n\r 目前僅提供內部受文者使用電子郵件發文，序'+pSeq+' '+pFullName+' 發文方式不可為電子郵件';
						else if(strOdSupportEmail == "O" && Isinside == "Y")
							pErrList2 += '\n\r 目前僅提供外部受文者使用電子郵件發文，序'+pSeq+' '+pFullName+' 發文方式不可為電子郵件';
						else if(strEmail == "")
							pErrList2 += '\n\r 序'+pSeq+' '+pFullName+' 發文方式為電郵時，電子郵件欄位不可為空白';
						
						else if(strEmail.indexOf(";") != -1 && strEmail.indexOf("|CHECK") != -1)
							pErrList2 += '\n\r 序'+pSeq+' '+pFullName+' 有取得兩個以上信箱，請進行篩選';
							
						else if(strEmail.split("@").length > 2)
						{
							if(strEmail.indexOf(";")==-1)
								pErrList2 += '\n\r 序'+pSeq+' '+pFullName+' 有取得兩個以上信箱，請以分號切割';
							else
							{
								var strSplitEmail = strEmail.split(";");
								for(var nOfEmail = 0; nOfEmail<strSplitEmail.length;nOfEmail++)
								{
									if(!emailRule.test(strSplitEmail[nOfEmail]))
									{
										pErrList2 += '\n\r 序'+pSeq+' '+pFullName+' 信箱格式不合規定，請檢查是否有特殊字元';
										break;
									}
								}
							}
						}
						else if(!emailRule.test(strEmail))
						{
							pErrList2 += '\n\r 序'+pSeq+' '+pFullName+' 信箱格式不合規定，請檢查是否有特殊字元';
						}
						if (strEmail.indexOf("<") != -1 || strEmail.indexOf(">") != -1)
						{
							pErrList2 += '\n\r 序'+pSeq+' '+pFullName+' Email欄位不可包含<、>等會有資安風險字元';
						}
						
						if(pErrList2=="" && strEmail.indexOf("|CHECK") != -1)
						{
							ndOrgList.eq(i).find("Email").text(ndOrgList.eq(i).find("Email").text().split("|")[0]);
						}
						
					}
					//檢核是否可使用內部電子公布欄發文方式
					else if(pIssueType == '內部電子公布欄' && Isinside == "N")
						pErrList2 += '\n\r 僅提供內部受文者使用內部電子公布欄發文，序'+pSeq+' '+pFullName+' 發文方式不可為「內部」';
					//檢核是否可使用海外發文
					else if(pIssueType == '海外發文')
					{
						if(OverSea == "0")
							pErrList2 += '\n\r 序'+pSeq+' '+pFullName+' 不為海外單位，不可使用海外發文方式';
					}

					//檢查郵遞區號
					var pPostNo = ndOrgList.eq(i).find("郵遞區號").text();
					if (jf_Trim(pPostNo) == '')
					{
						if(pIssueType == '人工傳遞' && gCheckPostNo[0])
								pErrList3 += '\n\r 序'+pSeq+' '+pFullName+' 郵遞區號不可為空白';
						else if(pIssueType == '郵寄' && gCheckPostNo[1])
								pErrList3 += '\n\r 序'+pSeq+' '+pFullName+' 郵遞區號不可為空白';
						else if(pIssueType == '電子交換' && gCheckPostNo[2])
								pErrList3 += '\n\r 序'+pSeq+' '+pFullName+' 郵遞區號不可為空白';
					}
					//檢查地址
					var pAddress = ndOrgList.eq(i).find("地址").text();
					if (jf_Trim(pAddress) == '')
					{
						if(pIssueType == '人工傳遞' && gCheckAddress[0])
								pErrList3 += '\n\r 序'+pSeq+' '+pFullName+' 地址不可為空白';
						else if(pIssueType == '郵寄' && gCheckAddress[1])
								pErrList3 += '\n\r 序'+pSeq+' '+pFullName+' 地址不可為空白';
						else if(pIssueType == '電子交換' && gCheckAddress[2])
								pErrList3 += '\n\r 序'+pSeq+' '+pFullName+' 地址不可為空白';
					}
					//如果參數設為N且受文者不全部為抄本時，忽略抄本的發文方式判斷
					if (pDocType == '抄本' && strOdTranScriptCheck=="N" && TransCript_Check)
						continue;
					
					//檢核發文方式
					for(var iType=0;iType<gIssueSendType.length;iType++)
					{
						//取得按鈕對應iType
						if(gIssueTypeSort[iType] == pIssueType)
						{
							if (bIsPaper && gIssueSendType[iType]!='紙本')
								pErrList1 += '\n\r本文預設為紙本發文 序'+pSeq+' '+pFullName+' 發文方式不應為'+pIssueType;
							else if(pSendType =='電子交換' && pIssueType !='內部電子公布欄' && gIssueSendType[iType]=='電子公布欄')
								pErrList1 += '\n\r本文預設為電子交換 序'+pSeq+' '+pFullName+' 發文方式不應為'+pIssueType;
							
							//新增檢核發文細項方式是否包含電子發文
							if (gIssueSendType[iType]!='紙本')
								bIsHaveEIssue = true;
								
							//檢核發文方式是否與受文者發文方式使用
							if(pSendTypeText == gIssueSendType[iType])
								bIsMatchSendType = true;
								
							//檢核發文方式細項是否與受文者發文方式使用
							if(pSendDetailType == pIssueType)
								bIsMatchSendDetailType = true;
							break;
						}
					}
				}
				//新增檢核發文細項是否選擇
				//if(pSendDetailType == "" && dlSendDetailType.length != 1)
				if(pSendDetailType == "" && $("#Dept_dlSendDetailType").children().length != 1)
				{
					pErrList1 += '\n\r請選擇發文方式細項。';
				}

				//新增檢核發文方式是否與受文者發文方式使用
				if(!bIsMatchSendDetailType || !bIsMatchSendType)
					pErrList1 += '\n\r本文預設發文方式與實際發文方式無相符之項目，請重新選擇。';
				
			
			}
			pErrList1 += pErrDupName+pErrDupNo+pErrList2+pErrList3;
			if (pErrList1 != "")
			{
				gErrorMessage = '受文者資訊有下列錯誤 請修正'+pErrList1;
				RtnBool = false;
			}
			else
			{
				gErrorMessage ="";
				RtnBool = true;
			
			}
			//檢核是否開啟無法電子交換原因
			if($("#Dept_dlSendType option:selected").text() == "紙本" && gDispatchIssue[0])
			{
				
				$("#Dept_aCantEIssueReason").css("display","");

				
				if($("#Dept_dlCantEIssueReason option:selected").val() == "")
				{
					gErrorMessage += "\n\r您選擇此份稿件的發文方式為紙本，請輸入無法電子交換原因!!";
					
					$("#Dept_dlCantEIssueReason").focus();
					RtnBool = false;
				}
			}
			
			//新增公布欄區塊設定檢核
			if(gTBCombine && gTbReSet)
			{
				if($("#Dept_InsideTB").prop("checked") || $("#Dept_OutsideTB").prop("checked"))
				{
					if($("#Dept_pasteday").val() == "")
					{
						gErrorMessage += "\n\r 請輸入張貼期限!";
						RtnBool = false;
					}
					else
					{
						try
						{
							var PastrDay = $("#Dept_pasteday").val();
							var iDay = PastrDay.toString(10);
						}
						catch(e)
						{
							gErrorMessage += "\n\r 公告天數請輸入數字!";
							RtnBool = false;
						}
					}
				}
			}
			return RtnBool;
		}*/
		//切換發文方式連動發文方式細項，儲存時會自動切換成至少符合一個受文者的發文方式
		/*function dlSendTypeOnChange()
		{	
			//發文細項連動
			dlSendDetailTypeChange();
						
			bCkeckBeforeSave = true;
			//檢核是否顯示無法電子交換原因
			//由程式切換時不須進行以下檢核-自動切換完畢後，最後會整個進行檢核
			if(gDispatchIssue[0] && !bIsAutoChangeSendType)
			{
				if($("#Dept_dlSendType option:selected").text() == "紙本")
				{
					//紙本發文，則要求輸入電子交換原因
					if($("#Dept_aCantEIssueReason").css("display").toUpperCase()=="NONE")
					{
						alert("本份文發文方式設定為紙本時，請輸入無法電子交換原因!!");
						$("#Dept_aCantEIssueReason").css("display","");
							bCkeckBeforeSave = false;//未輸入不可交換原因不儲存
					}
				}
				else if($("#Dept_dlSendType option:selected").text() == "電子交換")
				{
					//海外系統不檢核機關代碼
					if(!fnChkIsAnyCanEIssueBatch() && !gHasOs)
					{
						alert("沒有可電子交換機關，本份文發文設定自動改為紙本，並請輸入無法電子交換原因!!");
						$("#Dept_dlSendType option:eq(0)").prop('selected', true);
						dlSendDetailTypeChange();
						$("#Dept_aCantEIssueReason").css("display","");
						bCkeckBeforeSave = false;//檢核未過不儲存
					}
					else
					{
						//清除無法電子交換原因
						$("#Dept_dlSendType option:eq(0)").prop('selected', true);
						$("#Dept_dlCantEIssueReason").css("display","none");
					}
				}
				else
				{
					//清除無法電子交換原因
					$('#Dept_dlSendType option:eq(0)').prop('selected', true);
					$("#Dept_dlCantEIssueReason").css("display","none");
				}
			}
			jf_SetSendType();
		}

		//電子發文細項連動
		function dlSendDetailTypeChange()
		{
			var strSendType = $("#Dept_dlSendType option:selected").text();
			var strSendDetailType = $("#Dept_dlSendDetailType option:selected").text();
			
			$("#Dept_dlSendDetailType").children().remove();
			$("#Dept_dlSendDetailType").append("<OPTION value=''></OPTION>");
			
			
			for(var i=0;i<$("#Dept_H_dlSendDetailType").children().length;i++)
			{
				
				if(strSendType == $("#Dept_H_dlSendDetailType").children().eq(i).val())
					$("#Dept_dlSendDetailType").append("<OPTION value='"+strSendType+"'>"+$("#Dept_H_dlSendDetailType").children().eq(i).text()+"</OPTION>");
					
			}
			if($("#Dept_dlSendDetailType").children().length==1)
				$("#Dept_dlSendDetailType").css("display","none");
			else
			{
				
				$("#Dept_dlSendDetailType").css("display","");
				
				for(var i = 0; i < $("#Dept_dlSendDetailType").children().length; i++)
				{
					if(strSendDetailType == $("#Dept_dlSendDetailType").children().eq(i).text())
					{
						$("#Dept_dlSendDetailType option:eq("+i+")").prop('selected', true);
						break;
					}
				}
			}
		}
		//整份為電子發文時-檢核是否有任何可以電子交換的公文
		function fnChkIsAnyCanEIssueBatch()
		{
			var checkObj = activeDept.find("受文者");
			var RtnBool = false;
			for (var i = 0 ; i < checkObj.length ; i++)
			{
				RtnBool = fnChkIsAnyCanEIssue(checkObj.eq(i));
				if(RtnBool)
					break;
			}
			return RtnBool;
		}
		//逐筆檢核是否可以使用電子發文
		function fnChkIsAnyCanEIssue(argOrg)
		{
			var RtnBool = false;
			var FepStatus = "";
			var pIssueType = argOrg.find("發文方式");
			//直接判斷XML內電子交換現況，沒有TAG才call ws
			if(argOrg.find("電子交換現況").text().length!=0 && argOrg.find("電子交換現況").text()!="")
			{
				FepStatus = argOrg.find("電子交換現況").text();
			}
			else
			{
				var params = new SOAPClientParameters();
				if(argOrg.find("SysId").text()!="")
				{
					params.add('argSYSID', argOrg.find("SysId").text());
					params.add('OrgNo', theUserInfo.OrgID);
					params.add('DeptNo', theUserInfo.DepartID);
					params.add('UserID', theUserInfo.UserID);
					params.add('Artifact', theUserInfo.Artifact);
					SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetOrgbySYSID", params, false,function(r)
					{
						FepStatus = r.value.FepStatus[0];
					});
				}
				else
				{
					params.add('argFullName', argOrg.find("正式名稱").text());
					params.add('OrgNo', theUserInfo.OrgID);
					params.add('DeptNo', theUserInfo.DepartID);
					params.add('UserID', theUserInfo.UserID);
					params.add('Artifact', theUserInfo.Artifact);
					SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetOrgInfo4AD", params, false,function(r)
					{
						FepStatus = r.value.FepStatus[0];
					});
				}
			}
			
			if(FepStatus == "T")//"電子交換"
				RtnBool = true;
			else
			{
				if(pIssueType == "內部電子公布欄"|| pIssueType=="電子郵件" || pIssueType=="電子交換")
					RtnBool = true;
			}
			return RtnBool;
		}*/
		//公布欄勾選相關設定
		function TBEvent(argMode)
		{
			switch(argMode)
			{
				case "1"://內部
					if($("#Dept_InsideTB").prop("checked"))
						//1080903	Joe		1080339		jQuery升級2.2.4
						// $("#Dept_AllOrg").attr("disabled",false);
						$("#Dept_AllOrg").prop("disabled",false);
					else
					{
						
						if($("#Dept_AllOrg").prop("checked"))
							$("#Dept_AllOrg").prop("checked",false);
						//1080903	Joe		1080339		jQuery升級2.2.4
						// $("#Dept_AllOrg").attr("disabled",true);
						$("#Dept_AllOrg").prop("disabled",true);
					}
					gTbReSet = true;
				break;
				case "2"://外部
					
					if($("#Dept_OutsideTB").prop("checked"))
						//1080903	Joe		1080339		jQuery升級2.2.4
						// $("#Dept_Public").attr("disabled",false);
						$("#Dept_Public").prop("disabled",false);
					else
					{
						if($("#Dept_Public").prop("checked"))
							$("#Dept_Public").prop("checked",false);
						//1080903	Joe		1080339		jQuery升級2.2.4
						// $("#Dept_Public").attr("disabled",true);
						$("#Dept_Public").prop("disabled",true);
					}
					gTbReSet = true;
				break;
				case "3"://是否EMAIL通知公布欄受文者
					if($("#Dept_TBEmail").prop("checked"))
						//1080903	Joe		1080339		jQuery升級2.2.4
						// $("#Dept_EmailToOD17").attr("disabled",false);
						$("#Dept_EmailToOD17").prop("disabled",false);
					else
					{
						if($("#Dept_EmailToOD17").prop("checked"))
							$("#Dept_EmailToOD17").prop("checked",false);
							//1080903	Joe		1080339		jQuery升級2.2.4
							// $("#Dept_EmailToOD17").attr("disabled",true);
							$("#Dept_EmailToOD17").prop("disabled",true);
					}
					gTbReSet = true;
				break;
				case "0":
					TBEvent("1");
					TBEvent("2");
					TBEvent("3");
				break;
			}
			if(($("#Dept_InsideTB").prop("checked") || $("#Dept_OutsideTB").prop("checked") ) && $("#Dept_txTBPasteDays").val() != "" && $("#Dept_pasteday").val() == "")
				$("#Dept_pasteday").val($("#Dept_txTBPasteDays").val());
		}
		function SetBulletinSetting()
		{
			//儲存公告設定
			
			if($("#Dept_InsideTB").prop("checked") || $("#Dept_OutsideTB").prop("checked"))
			{
				//發布
				objBulletin.find("發布").text("是");
				//內部
				//if(oDoc.InsideTB.checked)
				if($("#Dept_InsideTB").prop("checked"))
				{
					objBulletin.find("內部").text("是");
					if($("#Dept_AllOrg").prop("checked"))
						objBulletin.find("內部").attr("全機關","是");
					else
						objBulletin.find("內部").attr("全機關","否");
				}
				else
				{
					objBulletin.find("內部").text("否");
					objBulletin.find("內部").attr("全機關","否");
					
				}
				//外部
				if($("#Dept_OutsideTB").prop("checked"))
				{
					objBulletin.find("外部").text("是");
					if($("#Dept_Public").prop("checked"))
						objBulletin.find("外部").attr("民眾","是");
					else
						objBulletin.find("外部").attr("民眾","否");
				}
				else
				{
					objBulletin.find("外部").text("否");
					objBulletin.find("外部").attr("民眾","否");
				}
				//期限
				objBulletin.find("期限").text($("#Dept_pasteday").val());

				//Email通知
				if($("#Dept_TBEmail").prop("checked") && !$("#Dept_EmailToOD17").prop("checked"))
					objBulletin.find("Email").text("2");
				else if($("#Dept_TBEmail").prop("checked") && !$("#Dept_EmailToOD17").prop("checked"))
					objBulletin.find("Email").text("1");
				else
					objBulletin.find("Email").text("0");
			}
			else
			{
				objBulletin.find("發布").text("否");
				objBulletin.find("內部").text("否");
				objBulletin.find("內部").attr("全機關","否");
				objBulletin.find("外部").text("否");
				objBulletin.find("外部").attr("民眾","否");
				objBulletin.find("期限").text("0");
				objBulletin.find("Email").text("0");
			}
			//儲存公告設定
			$(rawXml.documentElement).find("> 公告設定").replaceWith(objBulletin);
		}
		//儲存
		function PutIsSecret()
		{
			
			//儲存電子交換處理機制類別細項
			if($(rawXml.documentElement).find("電子交換處理機制類別細項").length!=0)
			{
				//1050818 Cloud	配合IE修改節點異動方式
				//$(rawXml.documentElement).find("電子交換處理機制類別細項").replaceWith("<電子交換處理機制類別細項>"+$("#Dept_dlSendDetailType option:selected").text()+"</電子交換處理機制類別細項>");
				//1051108	Cloud	修正本別、發文方式、附件異動後直接離開不會提醒需儲存bug
				//fnSetTextOfElement($(rawXml.documentElement).find("電子交換處理機制類別細項"),$("#Dept_dlSendDetailType option:selected").text());
				fnSetTextOfDeptElement($(rawXml.documentElement).find("電子交換處理機制類別細項"),$("#Dept_dlSendDetailType option:selected").text());
			}
			else
			{
				//1050818 Cloud	配合IE修改節點異動方式
				//$(rawXml.documentElement).append("<電子交換處理機制類別細項>"+$("#Dept_dlSendDetailType option:selected").text()+"</電子交換處理機制類別細項>");
				fnMakeNode("電子交換處理機制類別細項",$("#Dept_dlSendDetailType option:selected").text(),rawXml.documentElement);
			}
			
			//儲存本文發文方式
			if($(rawXml.documentElement).find("本文發文方式").length!=0)
			{
				//$(rawXml.documentElement).find("本文發文方式").replaceWith("<本文發文方式>"+$("#Dept_dlSendType option:selected").text()+"</本文發文方式>");
				//1051108	Cloud	修正本別、發文方式、附件異動後直接離開不會提醒需儲存bug
				//fnSetTextOfElement($(rawXml.documentElement).find("本文發文方式"),$("#Dept_dlSendType option:selected").text());
				fnSetTextOfDeptElement($(rawXml.documentElement).find("本文發文方式"),$("#Dept_dlSendType option:selected").text());
			}
			else
			{
				//$(rawXml.documentElement).append("<本文發文方式>"+$("#Dept_dlSendType option:selected").text()+"</本文發文方式>");
					fnMakeNode("本文發文方式",$("#Dept_dlSendType option:selected").text(),rawXml.documentElement);
			}
			
			var strExchangeType = $("#Dept_dlSendType option:selected").val();
			var nodeIsEncrypt = "";
			if (strExchangeType == "電子交換")
			{
				
				strExchangeType = "第一類";
				nodeIsEncrypt = "不加密";	
			}
			//1050818 Cloud	配合ie環境調正節點修正方式
			//$(rawXml.documentElement).find("電子交換處理機制類別").text(strExchangeType);
			//$(rawXml.documentElement).find("是否加密").text(nodeIsEncrypt);
			//1051108	Cloud	修正本別、發文方式、附件異動後直接離開不會提醒需儲存bug
			//fnSetTextOfElement($(rawXml.documentElement).find("電子交換處理機制類別"),strExchangeType);
			//fnSetTextOfElement($(rawXml.documentElement).find("是否加密"),nodeIsEncrypt);
			fnSetTextOfDeptElement($(rawXml.documentElement).find("電子交換處理機制類別"),strExchangeType);
			fnSetTextOfDeptElement($(rawXml.documentElement).find("是否加密"),nodeIsEncrypt);

			//存入無法電子交換原因
			fnSaveCantEIssueReason();
		}
		//儲存無法電子交換原因
		function fnSaveCantEIssueReason()
		{
			if($(rawXml.documentElement).find("無法電子交換原因").length!=0)
			{
				//1050818 Cloud	配合ie環境調正節點修正方式
				//$(rawXml.documentElement).find("無法電子交換原因").text($("#Dept_dlCantEIssueReason option:selected").val());
				//1051108	Cloud	修正本別、發文方式、附件異動後直接離開不會提醒需儲存bug
				//fnSetTextOfElement($(rawXml.documentElement).find("無法電子交換原因"),$("#Dept_dlCantEIssueReason option:selected").val());
				fnSetTextOfDeptElement($(rawXml.documentElement).find("無法電子交換原因"),$("#Dept_dlCantEIssueReason option:selected").val());
			}
			else
			{
				//$(rawXml.documentElement).append("<無法電子交換原因>"+$("#Dept_dlCantEIssueReason option:selected").text()+"</無法電子交換原因>");
				
				fnMakeNode("無法電子交換原因",$("#Dept_dlCantEIssueReason option:selected").text(),rawXml.documentElement);
			}
		}
		//畫面清空重建畫面
		function fnReGenTable()
		{
			$dlg.find("#receiverList").children().remove();//清空受文者桌面
			var DeptInfo;
			var XMLseq;
			var XmlObj;
			var XMLGepDeptseq;
			var DeptType="";
			var CreatSName="";
			var DeleteSName="";
			//以受文者物件重建
			for(var i=0;i<activeDept.children("受文者,受文者列表,已刪除").length;i++)
			{
				XMLseq = i;
				XMLseq++;
				XmlObj = activeDept.children("受文者,受文者列表,已刪除").eq(i);
				XmlObj.attr("序",XMLseq);//序重建

				if(strDLGUseTrace=="Y")
				{
					CreatSName = fnGetSnName(XmlObj,"CreateSN");//用來顯示在TOOTIP的資訊
					DeleteSName = fnGetSnName(XmlObj,"DeleteSN");					
				}								
				if(XmlObj.attr("群組代號")!=undefined)//表示為群組
				{
					DeptType="受文者列表";
					
					//有啟用追蹤修訂，取得刪除者判斷
					if(strDLGUseTrace=="Y" && XmlObj.attr("DeleteSN")!=undefined && XmlObj.attr("DeleteSN")!="")
							DeptType="受文者列表|已刪除";
					
					//重建底下受文者序
					for(var iDept=0;iDept<XmlObj.children("受文者,已刪除").length;iDept++)
					{
						XMLGepDeptseq = iDept;
						XMLGepDeptseq++;
						XmlObj.children("受文者,已刪除").eq(iDept).attr("序",XMLseq+"_"+XMLGepDeptseq);
					}
					//1100329 David 1090844 無群組代號時不需顯示
					//1141017	Joe		1140064		調整受文者欄位應顯示為正式名稱
					// var strGrpName = XmlObj.find("文字").text();
					var strGrpName = XmlObj.attr("正式名稱");
					if(XmlObj.attr("群組代號") != "")
						strGrpName += "("+XmlObj.attr("群組代號")+")";
					DeptInfo = 
					{
						"Seq": XMLseq,
						"Orgname": XmlObj.attr("正式名稱"),
						"EmpName": "",
						"OrgFullName": XmlObj.attr("全銜"),
						"DocType": XmlObj.attr("本別"),
						"attach": "",
						"docissuetype": "",
						"PostNo": "",
						"Address": "",
						"Email": "",
						//1100329 David 1090844 無群組代號時不需顯示
						//"GrpName": XmlObj.find("文字").text()+"("+XmlObj.attr("群組代號")+")",
						"GrpName": strGrpName,
						"CreatSName": CreatSName,
						"DeleteSName": DeleteSName,
					};
				}
				else
				{
					DeptType = "受文者";
					if(strDLGUseTrace=="Y" && XmlObj.attr("DeleteSN")!=undefined && XmlObj.attr("DeleteSN")!="")
						DeptType="已刪除";
					DeptInfo =
					{
						"Seq": XMLseq,
						"Orgname": XmlObj.find("正式名稱").text(),
						"EmpName": XmlObj.find("姓名").text(),
						"OrgFullName": XmlObj.find("全銜").text(),
						"DocType": XmlObj.attr("本別"),
						"attach": XmlObj.find("含附件").text(),
						"docissuetype": XmlObj.find("發文方式").text(),
						"PostNo": XmlObj.find("郵遞區號").text(),
						"Address": XmlObj.find("地址").text(),
						"Email": XmlObj.find("Email").text(),
						"GrpName": "",
						"CreatSName": CreatSName,
						"DeleteSName": DeleteSName,
						//1141017	Joe		1141126		外貿增加傳真欄位
						"FaxNo": XmlObj.find("傳真").text(),
						//1141229 David 1141432 外貿增加欄位
						"NameAddress": XmlObj.find("名址條名稱").text()
						,"JobTitle": XmlObj.find("職稱").text()
					};
					
				}
				fnCreatDeptTable(DeptInfo,DeptType,i);
				DeptType = "";//恢復設定
			}
		}
		//恢復畫面初始值
		function fnReSet()
		{
			$("#Dept_txOrgName").val("");
			$("#Dept_txOrgFullName").val("");
			$("#lbRtnValue").val("");
			$("#RtnIsExpand").val("");
			$("#Dept_txDeptSysId").val("");
			//1060621	Cloud	修正新增受文者後姓名欄位未清除問題
			$("#Dept_txEmpName").val("");
			//1070507	Cloud	修正加入時多筆受文者重複時，選擇子視窗不會消失問題
			if(gChooseBackEnd){
				fnReGenTable();
				gChooseBackEnd = gChooseBack = false;
				gCheckXmlindex =-1;
			}
		}
		//用於判斷是否異動過資料
		function jf_onChange()
		{
			gChangeCnt++;
		}
		var wsPrintGrpListID;
		//預覽受文者列表
		function fnPrintDeptList()
		{
			var ListGrp=false;
			var arPara;
	
			if(activeDept.find("受文者列表").length!=0)
			{
				if(window.confirm("是否展開群組"))
				{
					ListGrp=true;
				}
				else
					ListGrp=false;
			}
			if(ListGrp)
			{
				var ndOrgList = activeDept.find("受文者");
				var arPageparam = new Array();
				var ParaIdx = 0;
				
				for (var i = 0 ; i < ndOrgList.length ; i++)
				{
					var pFullName	= ndOrgList.eq(i).find("正式名稱").text();
					var pZip		= ndOrgList.eq(i).find("郵遞區號").text();
					var pAddress	= ndOrgList.eq(i).find("地址").text();
					var pIssueType	= ndOrgList.eq(i).find("發文方式").text();
					var pAttch		= ndOrgList.eq(i).find("含附件").text();
					var pEmpName	= ndOrgList.eq(i).find("姓名").text();
					
					arPara = new Array(6);
					arPara[0] = pFullName;
					arPara[1] = pZip;
					arPara[2] =	pAddress;
					arPara[3] = pIssueType;
					arPara[4] = pAttch;
					//1110816 David 群組內清單補上姓名處理
					arPara[5] = pEmpName;
					arPageparam[ParaIdx++] = arPara;
				}
			}
			else
			{
				var objacTiveobj = $("#receiverTable").find("li.ui-table-item-PC").find("div.ui-table-column-item");
				//1120104	Joe		1111415		修正預覽受文者無法正確取得TextArea的問題--S
				/*
				//1111102	Joe		--		配合顯示全部資料調整Tag屬性--S
				var objFullName;
				if(theSSO.User.SystemSets.get("DEPT_SHOW_FULLDATA") == "Y")
					objFullName=objacTiveobj.find("textarea[id^='Dept_lbOrgname']");
				else
				//1111102	Joe		--		配合顯示全部資料調整Tag屬性--E
					objFullName=objacTiveobj.find("input[id^='Dept_lbOrgname']");
				//郵遞區號
				var objZip=objacTiveobj.find("input[id^='Dept_txPostNo']");
				//地址
				var objAddress=objacTiveobj.find("input[id^='Dept_txAddress']");
				//發文方式	
				var objIssueType=objacTiveobj.find("input[id^='Dept_dldocissuetype']");
				
				//附件
				var objAttch=objacTiveobj.find("input[id^='Dept_dlattach']");
				//姓名
				var objEmpName=objacTiveobj.find("input[id^='Dept_txEmpName']");
				*/
				//受文者稱謂
				var objFullName, objZip, objAddress, objIssueType, objAttch, objEmpName;
				if(theSSO.User.SystemSets.get("DEPT_SHOW_FULLDATA") == "Y")
				{
					objFullName=objacTiveobj.find("textarea[id^='Dept_lbOrgname']");
					objZip=objacTiveobj.find("textarea[id^='Dept_txPostNo']");
					objAddress=objacTiveobj.find("textarea[id^='Dept_txAddress']");
					objIssueType=objacTiveobj.find("input[id^='Dept_dldocissuetype']");
					objAttch=objacTiveobj.find("input[id^='Dept_dlattach']");
					objEmpName=objacTiveobj.find("textarea[id^='Dept_txEmpName']");
				}
				else{
					
					objFullName=objacTiveobj.find("input[id^='Dept_lbOrgname']");
					objZip=objacTiveobj.find("input[id^='Dept_txPostNo']");
					objAddress=objacTiveobj.find("input[id^='Dept_txAddress']");
					objIssueType=objacTiveobj.find("input[id^='Dept_dldocissuetype']");
					objAttch=objacTiveobj.find("input[id^='Dept_dlattach']");
					objEmpName=objacTiveobj.find("input[id^='Dept_txEmpName']");
				}
				//1120104	Joe		1111415		修正預覽受文者無法正確取得TextArea的問題--E
				
				var arPageparam = new Array();
				var ParaIdx = 0;
				
				for (var j=0;j<objFullName.length;j++)
				{
					arPara = new Array(6);
					if(objFullName[j]!=undefined)
					arPara[0] = objFullName[j].value;
					else
					arPara[0] = "";
					if(objZip[j]!=undefined)
					arPara[1] = objZip[j].value;
					else
					arPara[1] = "";
					if(objAddress[j]!=undefined)
					arPara[2] = objAddress[j].value;
					else
					arPara[2] = "";
					if(objIssueType[j]!=undefined)
					arPara[3] = objIssueType[j].value;
					else
					arPara[3] = "";
					if(objAttch[j]!=undefined)
					arPara[4] = objAttch[j].value;
					else
					arPara[4] = "";
					if(objEmpName[j]!=undefined)
					arPara[5] = objEmpName[j].value;
					else
					arPara[5] = "";
					
					arPageparam[ParaIdx++] = arPara;
				}
				
			}	
			var params = new SOAPClientParameters();
			params.add('argPageString',arPageparam);
			params.add('argArtifact', theUserInfo.Artifact);
			params.add('argMode', "DlgDept");
			SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "PrintGrpList", params, false,function(r)
			{
				if(r.value.ErrorClass.IsErr==false)
				{
					window.open(r.value.Url);
				}
				else
				{
					//1061003	Cloud	1060856		修改預覽受文者列表異常錯誤訊息
					//alert('產生受文者列表發生異常：'+r.value.ErrorClass.StackTrace);
					alert('產生受文者列表發生異常：'+r.value.ErrorClass.StackTrace+" 錯誤："+r.value.ErrorClass.ErrMessage[0]);
				}
			});
			
		}
		function LoadSettingData()
		{
			thePublicRsrc.getDataXML(theUserInfo.OrgID).done(function(datDoc) {
				
				var $src = $(datDoc.documentElement);
				var ndInputCheck = $src.find("data[type='受文者輸入檢核方式設定']");
				if (ndInputCheck.length != 0)
				{
					var ndCheckPostNo = ndInputCheck.find("代碼[value='郵遞區號']");
					if (ndCheckPostNo.length !=0)
					{
						var arCheckPostNo = ndCheckPostNo.text();
						if (arCheckPostNo.length == 3)
						{
							gCheckPostNo[0] = arCheckPostNo.charAt(0) == "Y";
							gCheckPostNo[1] = arCheckPostNo.charAt(1) == "Y";
							gCheckPostNo[2] = arCheckPostNo.charAt(2) == "Y";
						}
					}
					var ndCheckAddress = ndInputCheck.find("代碼[value='地址']");
					if (ndCheckAddress.length != 0)
					{
						var arCheckAddress = ndCheckAddress.text();
						if (arCheckAddress.length == 3)
						{
							gCheckAddress[0] = arCheckAddress.charAt(0) == "Y";
							gCheckAddress[1] = arCheckAddress.charAt(1) == "Y";
							gCheckAddress[2] = arCheckAddress.charAt(2) == "Y";
						}
					}
				}
				var ndCheckGateWay = $src.find("data[type='匣道檢核設定']");
				if (ndCheckGateWay.length !=0)
				{
					ndCheckGateWay = ndCheckGateWay.find("代碼");
					gCheckGateWay = ndCheckGateWay.text() == "Y";
				}
				var ndNameControl = $src.find("data[type='受文者名稱控制']");
				if (ndNameControl.length != 0)
				{
					ndNameControl = ndNameControl.find("代碼");
					gTakeFullName = ndNameControl.text().charAt(0);
					gCopyNameTo = ndNameControl.text().charAt(1);
				}
				var ndDefaultIssueType = $src.find("[type='無預設發文方式之預設值']");
				if (ndDefaultIssueType.length != 0)
				{
					ndDefaultIssueType = ndDefaultIssueType.find("代碼");
					
					var gDefaultIssueType = ndDefaultIssueType.text();
					switch(gDefaultIssueType)
					{
						case "1":
							defaultIssueType = "人工傳遞";
						break;
						
						case "2":
							defaultIssueType = "郵寄";
						break;
						
						case "3":
							defaultIssueType = "電子交換";
						break;
						case "4":
							defaultIssueType = "電子郵件";
						break;
						
						case "5":
							if(strHasTB!=0)
								defaultIssueType = "內部電子公布欄";
						break;
						
						case "7":
							if (gHasOs=="Y")
							{
								//1141110 David 1141112 海外發文支援外貿使用，調整文字
								//defaultIssueType = "海外發文";
								defaultIssueType = gOsIssueTypeSort;
							}
						break;
					}
				}
				var ndCheckDuplicte = $src.find("[type='受文者重覆處理設定']");
				if (ndCheckDuplicte.length !=0)
				{
					ndCheckDuplicte = ndCheckDuplicte.find("代碼")
					gCheckDuplicte = ndCheckDuplicte.text();
				}
				
				$("#Dept_dlCantEIssueReason").children().remove();
				$("#Dept_dlCantEIssueReason").append("<OPTION value=''></OPTION>");
				
				
				var ndlCantEIssueReason = $src.find("data[type='無法電子交換原因']");
				if (ndlCantEIssueReason.length != 0 && gDispatchIssue[0] )
				{
					ndlCantEIssueReason = ndlCantEIssueReason.find("代碼");
					for(var ind = 0; ind < ndlCantEIssueReason.length; ind++)
					    //1070817 Zen 1070678 弱掃XSS修正
					    //$("#Dept_dlCantEIssueReason").append("<OPTION value='" + ndlCantEIssueReason.eq(ind).text() + "'>" + ndlCantEIssueReason.eq(ind).text() + "</OPTION>");
					    $("#Dept_dlCantEIssueReason").append("<OPTION value='" + HtmlEncode(ndlCantEIssueReason.eq(ind).text()) + "'>" + HtmlEncode(ndlCantEIssueReason.eq(ind).text()) + "</OPTION>");
				}
				
				//針對 dlSendType.text 做設定
				$("#Dept_dlSendDetailType").children().remove();
				$("#Dept_dlSendDetailType").append("<OPTION value=''></OPTION>");
				$("#Dept_H_dlSendDetailType").children().remove();
				$("#Dept_H_dlSendDetailType").append("<OPTION value=''></OPTION>");
					
				var ndlSendDetailType = $src.find("data[type='紙本發文方式']");
				if (ndlSendDetailType.length != 0 && gDispatchIssue[1])
				{
					ndlSendDetailType = ndlSendDetailType.find("代碼");

					for(var ind = 0; ind < ndlSendDetailType.length; ind++)
					    //1070817 Zen 1070678 弱掃XSS修正
					    //$("#Dept_H_dlSendDetailType").append("<OPTION value='" + ndlSendDetailType.eq(ind).text() + "'>紙本</OPTION>");
					    $("#Dept_H_dlSendDetailType").append("<OPTION value='" + HtmlEncode(ndlSendDetailType.eq(ind).text()) + "'>紙本</OPTION>");
				}

				var ndlSendDetailType = $src.find("[type='電子發文方式']");
				if (ndlSendDetailType.length !=0 && gDispatchIssue[2])
				{
					ndlSendDetailType = ndlSendDetailType.find("代碼");
					for(var ind = 0; ind < ndlSendDetailType.length; ind++)
					    //1070817 Zen 1070678 弱掃XSS修正
					    //$("#Dept_H_dlSendDetailType").append("<OPTION value='" + ndlSendDetailType.eq(ind).text() + "'>電子交換</OPTION>");
					    $("#Dept_H_dlSendDetailType").append("<OPTION value='" + HtmlEncode(ndlSendDetailType.eq(ind).text()) + "'>電子交換</OPTION>");
				}
				
				var ndlSendDetailType = $src.find("[type='公布欄發文方式']");
				if (ndlSendDetailType.length !=0 && gDispatchIssue[3])
				{
					ndlSendDetailType = ndlSendDetailType.find("代碼");
					for(var ind = 0; ind < ndlSendDetailType.length; ind++)
					    //1070817 Zen 1070678 弱掃XSS修正
					    //$("#Dept_H_dlSendDetailType").append("<OPTION value='" + ndlSendDetailType.eq(ind).text() + "'>電子公布欄</OPTION>");
					    $("#Dept_H_dlSendDetailType").append("<OPTION value='" + HtmlEncode(ndlSendDetailType.eq(ind).text()) + "'>電子公布欄</OPTION>");
				}
				//1061025 Cloud [1060861] 增加以參數設定分割符號
				var ndSymBol = $src.find("[type='Symbol']");
				if(ndSymBol.length!=0)
				{
					if(ndSymBol.find("代碼").text()!="")
						gSymbol = ndSymBol.find("代碼").text();
				}
				
				dlSendDetailTypeChange();
			})	
		}
		//讀出本份文發文方式
		function SetExchangeType()
		{
			
			var strSendType;
			if($(rawXml.documentElement).find("電子交換處理機制類別").length !=0)
				strSendType = $(rawXml.documentElement).find("電子交換處理機制類別").text();
			else
			{
				//$(rawXml.documentElement).append("<電子交換處理機制類別></電子交換處理機制類別>");
				rawXml.documentElement.appendChild(rawXml.createElement("電子交換處理機制類別"));
				strSendType ="";
			}

			//取得電子交換處理機制類別細項
			var strSendDetailType;
			if($(rawXml.documentElement).find("電子交換處理機制類別細項").length !=0)
			{
				strSendDetailType = $(rawXml.documentElement).find("電子交換處理機制類別細項").text();
			}
			else
			{
				//$(rawXml.documentElement).append("<電子交換處理機制類別細項></電子交換處理機制類別細項>");
				rawXml.documentElement.appendChild(rawXml.createElement("電子交換處理機制類別細項"));
				strSendDetailType ="";
			}
			//取得本文發文方式
			var strDocSendType;
			if($(rawXml.documentElement).find("本文發文方式").length !=0)
			{
				pSendType = strDocSendType = $(rawXml.documentElement).find("本文發文方式").text();
				//1110804	Joe		--		修正稿件與受文者紙本發文方式記錄內容不同，導致判斷檢核無法正常生效的問題
				// if(pSendType=="" || pSendType==undefined)
				if(pSendType=="" || pSendType==undefined || pSendType == "紙本")
					pSendType = "紙本公文";
	 
			}
			else
			{
				//$(rawXml.documentElement).append("<本文發文方式></本文發文方式>");
				rawXml.documentElement.appendChild(rawXml.createElement("本文發文方式"));
				strDocSendType ="";
				pSendType = "紙本公文";
			}

			//載入無法電子交換原因
			var strCantEIssueReason;
			if($(rawXml.documentElement).find("無法電子交換原因").length !=0)
			{
				
				strCantEIssueReason = $(rawXml.documentElement).find("無法電子交換原因").text();
			}
			else
			{
				//$(rawXml.documentElement).append("<無法電子交換原因></無法電子交換原因>");
				rawXml.documentElement.appendChild(rawXml.createElement("無法電子交換原因"));
				strCantEIssueReason ="";
			}
			
			if(jf_DeptTrim(strCantEIssueReason) != "")
			{
				$("#Dept_div_CantEIssueReason").css("display","");
				$("#Dept_dlCantEIssueReason").val(strCantEIssueReason);
			}
			else
				$("#Dept_div_CantEIssueReason").css("display","none");

			var strIsEncrypt;
			if($(rawXml.documentElement).find("是否加密").length !=0)
				strIsEncrypt = $(rawXml.documentElement).find("是否加密").text();
			else
			{

				//$(rawXml.documentElement).append("<是否加密></是否加密>");
				rawXml.documentElement.appendChild(rawXml.createElement("是否加密"));
				strIsEncrypt ="";
			}
			
			var bIsSendTypeNull = true;
			
			for (var i = 0 ; i < $("#Dept_dlSendType").children().length ; i++)
			{
				if (strDocSendType == $("#Dept_dlSendType").children().eq(i).text())
				{
					$("#Dept_dlSendType option:eq("+i+")").prop('selected', true);
					bIsSendTypeNull = false;
					break;
				}
			}
			if (bIsSendTypeNull)//本文發文方式若無值，則預設為電子發文-第一、二類
			{
				$("#Dept_dlSendType").val("電子交換");
				pSendType = "電子交換";
			}
			//修改預設發文方式為紙本-//1050919 Cloud	實作密件控管功能
			if(gNeedSecControl == true)
			{
				$("#Dept_dlSendType").val("紙本公文");
				pSendType = "紙本公文";
				bIsSendTypeNull = false;
			}
			
			//設定發文方式細項
			dlSendDetailTypeChange();
			
			if(strSendDetailType!="")
			{
				for (var i = 0 ; i < $("#Dept_dlSendDetailType").children().length ; i++)
				{
					if (jf_DeptTrim(strSendDetailType) == $("#Dept_dlSendDetailType").children().eq(i).text())
					{
						$("#Dept_dlSendDetailType option:eq("+i+")").prop('selected', true);
						break;
					}
				}
			}
			else
				$("#Dept_dlSendDetailType option:eq(0)").prop('selected', true);
				
			jf_SetSendType();
		}
		function jf_SetSendType()
		{
			if(gDispatchIssue[0] && $("#Dept_dlSendType option:selected").val()=="紙本公文")
				$("#Dept_div_CantEIssueReason").css("display","");
			else
			{
				$("#Dept_div_CantEIssueReason").css("display","none");
				$("#Dept_dlCantEIssueReason").val("");
			}
		}
		//追蹤修訂-刪除、取消刪除
		function fnSetDelteColumn(argIndex,argMode)
		{
			if(argMode=="Delete")
			{	
				$("#receiverTable").find("li.ui-table-item-PC").eq(argIndex).find("INPUT[type!='checkbox']")
				//1080903	Joe		1080339		jQuery升級2.2.4
				// .attr("Readonly",true).css("opacity","0.4").attr('disabled', true)
				.prop("Readonly",true).css("opacity","0.4").prop('disabled', true)
				.css("text-decoration","line-through").css("color","red");
				$("#receiverTable").find("li.ui-table-item-PC").eq(argIndex).find("div.ui-table-column-item").addClass("ui-table-column-item-delete");
				$("#receiverTable").find("li.ui-table-item-PC").eq(argIndex).find("div.ui-table-column-item").removeClass("ui-table-column-item");
			}
			else
			{
				$("#receiverTable").find("li.ui-table-item-PC").eq(argIndex).find("div.ui-table-column-item-delete").addClass("ui-table-column-item");
				$("#receiverTable").find("li.ui-table-item-PC").eq(argIndex).find("div.ui-table-column-item").removeClass("ui-table-column-item-delete");
				$("#receiverTable").find("li.ui-table-item-PC").eq(argIndex).find("INPUT[type!='checkbox']")
				//1080903	Joe		1080339		jQuery升級2.2.4
				// .attr("Readonly",false).css("opacity","").attr('disabled', false)
				.prop("Readonly",false).css("opacity","").prop('disabled', false)
				.css("text-decoration","").css("color","");
				//將全銜的底線還回去
				$("#Dept_lbOrgname_"+argIndex).css("text-decoration","underline");
			}
		}
		//上下移功能
		function fnMoveDataRow(argID,argMode,argDataMode)
		{
			var Nowseq = parseInt(argID.split('_')[2]);//現在異動的受文者序
			var Newseq = Nowseq;//新的位置序-判斷上下移之後再做++ --
			var XMLseq = Nowseq+1;//現在受文者在XML序
			var NewXMLseq = XMLseq;//新受文者在XML序-判斷上下移之後再做++ --
			
			if(argMode=="上移")
			{
				if(Nowseq == 0)
				{
					alert("已移到第一筆");
					return;
				}
				NewXMLseq--;
				Newseq--;//
				//XML資料搬移
				if(argDataMode=="Org")
				{
					activeDept.find("受文者[序='"+XMLseq+"']").prev().attr("序","");//序交換
					activeDept.find("受文者[序='"+XMLseq+"']").insertBefore(activeDept.find("受文者[序='"+XMLseq+"']").prev()).attr("序",NewXMLseq);
					activeDept.find("受文者[序='"+NewXMLseq+"']").next().attr("序",XMLseq);//序交換
					//做ID交換完畢再做畫面資料更換
					
				}
				else
				{
					activeDept.find("受文者列表[序='"+XMLseq+"']").prev().attr("序","");//序交換
					activeDept.find("受文者列表[序='"+XMLseq+"']").insertBefore(activeDept.find("受文者列表[序='"+XMLseq+"']").prev()).attr("序",NewXMLseq);
					activeDept.find("受文者列表[序='"+NewXMLseq+"']").next().attr("序",XMLseq);//序交換
				}
				fnMoveData($("li.ui-table-item-PC").eq(Nowseq).find("input"),NewXMLseq,argDataMode);//替換現在上移的受文者ID
				
				fnMoveData($("li.ui-table-item-PC").eq(Nowseq).prev().find("input"),XMLseq,argDataMode);//替換被移下來的受文者ID
				//畫面資料搬移
				$("li.ui-table-item-PC").eq(Nowseq).insertBefore($("li.ui-table-item-PC").eq(Nowseq).prev());
			}
			else
			{
				
				if($("li.ui-table-item-PC").length==XMLseq)//新的序已經是最大長度，不做移動
				{
					alert("已移到最後一筆");
					return;
				}
				NewXMLseq++;
				Newseq++;
				//XML資料搬移
				if(argDataMode=="Org")
				{
					//把下一筆的序換成暫存
					activeDept.find("受文者[序='"+XMLseq+"']").next().attr("序","");
					//把自己塞到下一筆後面去
					activeDept.find("受文者[序='"+XMLseq+"']").insertAfter(activeDept.find("受文者[序='"+XMLseq+"']").next()).attr("序",NewXMLseq);
					activeDept.find("受文者[序='"+NewXMLseq+"']").prev().attr("序",XMLseq);
					//做ID交換完畢再做畫面資料更換
					
				}
				else
				{
					activeDept.find("受文者列表[序='"+XMLseq+"']").next().attr("序","");//序交換
					activeDept.find("受文者列表[序='"+XMLseq+"']").insertAfter(activeDept.find("受文者列表[序='"+XMLseq+"']").next()).attr("序",NewXMLseq);
					activeDept.find("受文者列表[序='"+NewXMLseq+"']").prev().attr("序",XMLseq);
				}
				fnMoveData($("li.ui-table-item-PC").eq(Nowseq).find("input"),NewXMLseq,argDataMode);//替換現在的受文者ID
				fnMoveData($("li.ui-table-item-PC").eq(Nowseq).next().find("input"),XMLseq,argDataMode);//替換被移下來的受文者ID
				//畫面資料搬移
				$("li.ui-table-item-PC").eq(Nowseq).insertAfter($("li.ui-table-item-PC").eq(Nowseq).next());
			}
		}
		//畫面資料搬移
		function fnMoveData(argData,newseq)
		{
			var Iputidindex=newseq-1;//新位置的id數字
			for(var iData=0;iData<argData.length;iData++)//逐個INPUT換ID
			{
				if(iData==0)
					argData.eq(iData).val(newseq);//序僅換值
				else
				{
					if(argData.eq(iData).attr("id")!="")
					{
						newid = argData.eq(iData).attr("id").split('_')[0]+"_"+argData.eq(iData).attr("id").split('_')[1]+"_"+Iputidindex;
						argData.eq(iData).attr("id",newid);
					}
				
				}
			}
		}
		//移動至最前、最後、指定位置
		function fnMoveXmlData(argTargetIndex,argMode,arCheckedIdx)
		{
			if(argMode=="First")
			{
				for(var iXmldata=arCheckedIdx.length-1;iXmldata>-1;iXmldata--)
				{
					//1060207	Cloud	FDA-序2614	修正群組移動功能無作用BUG
					//activeDept.find("受文者[序='"+arCheckedIdx[iXmldata]+"']").insertBefore(activeDept.children("受文者,受文者列表,已刪除").eq(argTargetIndex));
					activeDept.find("[序='"+arCheckedIdx[iXmldata]+"']").insertBefore(activeDept.children("受文者,受文者列表,已刪除").eq(argTargetIndex));
				}
			}
			else if(argMode=="After")
			{
				for(var iXmldata=arCheckedIdx.length-1;iXmldata>-1;iXmldata--)
				{
					//1060207	Cloud	FDA-序2614	修正群組移動功能無作用BUG
					//activeDept.find("受文者[序='"+arCheckedIdx[iXmldata]+"']").insertAfter(activeDept.children("受文者,受文者列表,已刪除").eq(argTargetIndex));
					activeDept.find("[序='"+arCheckedIdx[iXmldata]+"']").insertAfter(activeDept.children("受文者,受文者列表,已刪除").eq(argTargetIndex));
				}
			}
			else
			{
				for(var iXmldata=arCheckedIdx.length-1;iXmldata>-1;iXmldata--)
				{
					//1060207	Cloud	FDA-序2614	修正群組移動功能無作用BUG
					//activeDept.find("受文者[序='"+arCheckedIdx[iXmldata]+"']").insertAfter(activeDept.children("受文者,受文者列表,已刪除").eq(argTargetIndex));
					activeDept.find("[序='"+arCheckedIdx[iXmldata]+"']").insertAfter(activeDept.children("受文者,受文者列表,已刪除").eq(argTargetIndex));
				}
			}
			
		}
		//1060619	Cloud	[1060472]	(國合會)依發文方式判斷檔案大小後自動勾選上傳至附件下載區
		function fnCheckUpLoad(argType)
		{
			var nSendE=0;			//電子交換數量
			var nSendEmail=0;		//電郵數量
			var bEmailMatch=true;	//是否為內部信箱
			var nAllFileSize = 0;	//總共附件大小
			var bComfirm=false;		//是否跳出提示視窗
			var bIsAttach=false;	//是否有其中一個受文者含附件
			var rtn = true;
			//var ndOrgList = gDomOrg.selectNodes("//受文者");
			var ndOrgList = activeDept.find("受文者");
			if (ndOrgList && ndOrgList.length > 0)
			{
				for (var i = 0 ; i < ndOrgList.length ; i++)
				{
					
					var pIssueType = ndOrgList.eq(i).find("發文方式").text();
					var strEmail = "";
					if(ndOrgList.eq(i).find("Email").length!=0)
						strEmail   = ndOrgList.eq(i).find("Email").text();
						
					if(pIssueType=="電子郵件")
					{
						var bIsMatch = strEmail.match(/.*?@icdf.org.tw/);
						if(!bIsMatch)
							bEmailMatch=false;
						nSendEmail++;
					}
					else if(pIssueType=="電子交換")
					{
						nSendE++;
					}
					if(ndOrgList.eq(i).find("含附件").text()=="是")
						bIsAttach=true;
				}
			}
			var SettingNode = gdm.find("附件下載區設定");
			if(SettingNode.length!=0)
			{
				var strIsUpLoad = gdm.find("是否上傳至附件下載區").text();
				if(strIsUpLoad.text!="Y" || bIsAttach)//如果沒勾選上傳至附件下載區且其中一個受文者含附件，即進行檢核
				{
					var root=gdm.find("附件列表");
					var ndAttachList = root.find("附件檔名");
					if(ndAttachList.length != 0)
					{
						for(var iAtt=0;iAtt<ndAttachList.length;iAtt++)
						{
							nAllFileSize+=parseInt(ndAttachList.eq(iAtt).attr("大小"));
						}		
						var nAttachSizeSendE = 0;
						var nAttachSizeInternal = 0;
						var nAttachSizeExternal = 0;
						if(strDlgAttachSizeSet != "")
						{
							var strTempSize = strDlgAttachSizeSet.split("|");
							if(strTempSize.length == 3)
							{
								nAttachSizeInternal = parseInt(strTempSize[0],10);//會內電郵
								nAttachSizeExternal = parseInt(strTempSize[1],10);//會外電郵
								nAttachSizeSendE = parseInt(strTempSize[2],10);//電子交換
							}
						}
						if(nSendE!=0 && nAllFileSize>nAttachSizeSendE)
						{
							bComfirm=true;//有電子交換受文者且附件大小大於設定
						}
						else if(nSendEmail!=0)
						{
							if(nAllFileSize > nAttachSizeInternal && bEmailMatch)
							{
								bComfirm=true;//有電子郵件受文者且附件大小大於設定無外部信箱
							}
							else if(nAllFileSize > nAttachSizeExternal && !bEmailMatch)
							{
								bComfirm=true;//有電子郵件受文者且附件大小大於設定且有外部信箱
							}

						}
						//如選擇"是"，將上傳至附件下載區選項勾起，並將所有受文者的是否含附件改為"否"
						if(bComfirm)
						{
							//var StrAttach = oDoc['tbOrgAttch'];
							var bUpLoad=window.confirm("附件大小超過限制!\n\n您是否要將附件上傳至附件下載區?");
							if(bUpLoad)
							{
								//strIsUpLoad.text="Y";
								//gdm.find("是否上傳至附件下載區").text("Y");
								fnSetTextOfDeptElement(gdm.find("是否上傳至附件下載區"),"Y");
								if (gdm.find("附件列表").find("文字").text().indexOf("識別碼")==-1)
								{
									try
									{
										//得識別碼功能
										var strHashString ="";
										if(theSSO.User.EnvSettings.get("DL_HAS_DOCHASH")=="Y")
										{	
											//var strDocNo = openerObj.external.DocNo;
											//var strOrgNo = openerObj.external.OrgID;
											var strDocNo = theAOL.docObj.docNo;
											var strOrgNo = theUserInfo.OrgID;
											//if(strDocNo == null || strDocNo == "")
											if(strDocNo.length==0 || strDocNo == "")
											{
												alert("無公文文號，無法取得識別碼，請先行要號後再勾選上傳至附件下載區。");
												if(argType=="CLOSE")
												{
													//1081008	Joe		1080339		jQuery升級3.4.1
													// $("#Dept_btSave").click();
													$("#Dept_btSave").trigger("click");
													//儲存後關閉
													$.modal.close();
												}
											
											}
											else
											{	
												theWebServices.getDocHash(strOrgNo, strDocNo)
												.done(function(rtnValue) {
													var strHashString = " 識別碼：" + rtnValue;
													var attTxt = theSSO.User.EnvSettings.get("WE_DLG_ATTACH_DEFAULT_STR") + strHashString + "。";
													//gdm.find("附件列表").find("文字").text(attTxt);
													fnSetTextOfDeptElement(gdm.find("附件列表").find("文字"),attTxt);
													$('[id^=Dept_dlattach_]').text("否");
													$('[id^=Dept_dlattach_]').val("否");
													if(ndOrgList.length==1)//如受文者只有一人
													{
														//ndOrgList.eq(0).find("含附件").text("否");
														fnSetTextOfDeptElement(ndOrgList.eq(0).find("含附件"),"否");
													}
													else
													{
														for (var iorg = 0 ; iorg < ndOrgList.length ; iorg++)
														{
															//ndOrgList.eq(iorg).find("含附件").text("否");
															fnSetTextOfDeptElement(ndOrgList.eq(iorg).find("含附件"),"否");
														}
													}
													if(argType=="CLOSE")
													{
														//1081008	Joe		1080339		jQuery升級3.4.1
														// $("#Dept_btSave").click();
														$("#Dept_btSave").trigger("click");
														//儲存後關閉
														$.modal.close();
													}
													
												})
												.fail(function(errorText) {
													alert("呼叫取得識別碼函式發生錯誤，請聯絡系統管理人。\r\n錯誤訊息：" + errorText);
													if(argType=="CLOSE")
													{
														//1081008	Joe		1080339		jQuery升級3.4.1
														// $("#Dept_btSave").click();
														$("#Dept_btSave").trigger("click");
														//儲存後關閉
														$.modal.close();
													}
												});
											}
										}
									}
									catch (e)
									{}
									finally
									{}
								}
								else
								$.modal.close();
							}
							else
							 $.modal.close();
						}
						else
						 $.modal.close();
					}
					else
						$.modal.close();
				}
				else
				$.modal.close();
			}
			else
			$.modal.close();
		}

	    //1070817 Zen 1070678 弱掃XSS修正
		function HtmlEncode(s)
		{
		    var div = document.createElement('div');
		    div.appendChild(document.createTextNode(s));
		    return div.innerHTML;
		}
		//1071003	Cloud	修正，for舊稿件，受文者僅有全銜，補上一代受文者編輯子視窗，開啟時增加檢核受文者是否有完整tag，如無則補齊-S	
		function DeptfnReGroup()
		{
			//先把不為element的node清除
			//activeDept.eq(0).children("已刪除, 受文者, 受文者列表")[0]
			var WorkDept;
			fnReGroupSeq = 1;
			fnReGepDeptSeq = 1;
			for (var i = activeDept.eq(0).children("已刪除, 受文者, 受文者列表").length-1; i >= 0 ; i--)
			{
				WorkDept = activeDept.eq(0).children("已刪除, 受文者, 受文者列表")[i];
				if (WorkDept.nodeType != 1)
				{
					$(WorkDept).remove();
					continue;
				}
				if (WorkDept.nodeName != "文字" && WorkDept.nodeName != "受文者" && WorkDept.nodeName != "已刪除" && WorkDept.nodeName != "受文者列表")
				{
					$(WorkDept).remove();
					continue;
				}
				else if (WorkDept.nodeName == "文字" )
				{
					if (i != 0)
					{
						$(WorkDept).remove();
						continue;
					}
				}
				else if (WorkDept.nodeName == "受文者")
				{
					if($(WorkDept).attr("本別")=="敬陳者")
					{
						$(WorkDept).remove();
						continue;
					}
					fnReReciver(WorkDept,"DEPT")
				}
				else if (WorkDept.nodeName == "受文者列表")
				{
					var ndRcvList = $(WorkDept).eq(0).children("已刪除, 受文者");
					var WorkGrpDept;
					fnReReciver(WorkDept,"GRP")
					for (var iGrp = ndRcvList.length-1; iGrp >= 0 ; iGrp--)
					{
						WorkGrpDept = ndRcvList[iGrp];
						if (WorkGrpDept.nodeType != 1)
						{
							$(WorkGrpDept).remove();
							continue;
						}
						if (WorkGrpDept.nodeName != "文字" && WorkGrpDept.nodeName != "受文者" && WorkGrpDept.nodeName != "已刪除")
						{
							$(WorkGrpDept).remove();
							continue;
						}
						else if (WorkGrpDept.nodeName == "文字" )
						{
							if (i != 0)
							{
								$(WorkGrpDept).remove();
								continue;
							}
						}
						else if (WorkGrpDept.nodeName == "受文者" || WorkGrpDept.nodeName == "已刪除")
						{
							fnReReciver(WorkGrpDept,"DEPT")
						}
					}
				}
			}
			
		}
		function fnReReciver(argNode,argNodeTpye)
		{
			if ($(argNode).attr("序")==undefined)
			{
				argNode.setAttribute("序","");
			}
			if ($(argNode).attr("本別")==undefined)
			{
				argNode.setAttribute("本別","抄本");
			}
			if(argNodeTpye=="GRP")//群組類型
			{
				if ($(argNode).find("文字").length==0)
				{
					var GrpWord = "";
					if ($(argNode).attr("全銜")!=undefined && $(argNode).attr("全銜")!="")
						GrpWord = $(argNode).attr("全銜");
					else if ($(argNode).attr("正式名稱")!=undefined && $(argNode).attr("正式名稱")!="")
						GrpWord = $(argNode).attr("正式名稱");
					fnMakeNode("文字",GrpWord,argNode);
				}
				if ($(argNode).attr("全銜")==undefined)
				{
					if ($(argNode).find("文字").length!=0 && $(argNode).find("文字").text()!="")
						argNode.setAttribute("全銜",$(argNode).find("文字").text());
					else
						argNode.setAttribute("全銜","");
				}	
				if ($(argNode).attr("正式名稱")==undefined)
				{
					argNode.setAttribute("正式名稱","");
				}
				if ($(argNode).attr("群組代號")==undefined)
				{
					argNode.setAttribute("群組代號","");
				}
				if ($(argNode).attr("SYSID")==undefined)
				{
					argNode.setAttribute("SYSID","");
				}
			}
			if(argNodeTpye=="DEPT")//受文者類型
			{
				if ($(argNode).attr("編號")==undefined)
				{
					argNode.setAttribute("編號",gDept_SeqNo);
					gDept_SeqNo++;
				}
				if ($(argNode).attr("CreateSN")==undefined)
				{
					argNode.setAttribute("CreateSN",'0');
				}
				if ($(argNode).find("全銜").length==0)
				{
					fnMakeNode("全銜","",argNode);
				}
				if ($(argNode).find("正式名稱").length==0)
				{
					fnMakeNode("正式名稱",$(argNode).find("全銜").text(),argNode);
				}
				var strAllOrgNo = "";
				var strOrgNo = "";
				var strDeptNo = "";
				if($(argNode).find("機關代碼").length!=0 && $(argNode).find("機關代碼").text().length == 17)
				{
					strAllOrgNo = $(argNode).find("機關代碼").text();
					strOrgNo = strAllOrgNo.substr(0,10);
					strDeptNo = strAllOrgNo.substr(10,7);
				}
				if ($(argNode).find("機關代碼").length==0)
				{
					fnMakeNode("機關代碼",strOrgNo,argNode);
				}
				if ($(argNode).find("單位代碼").length==0)
				{
					fnMakeNode("單位代碼",strDeptNo,argNode);
				}
				if ($(argNode).find("郵遞區號").length==0)
				{
					fnMakeNode("郵遞區號","",argNode);
				}
				if ($(argNode).find("地址").length==0)
				{
					fnMakeNode("地址","",argNode);
				}
				if ($(argNode).find("發文方式").length==0)
				{
					fnMakeNode("發文方式","郵寄",argNode);
				}
				if ($(argNode).find("含附件").length==0)
				{
					fnMakeNode("含附件","否",argNode);
				}
				if ($(argNode).find("櫃號").length==0)
				{
					fnMakeNode("櫃號","",argNode);
				}
				if ($(argNode).find("匣道").length==0)
				{
					fnMakeNode("匣道","",argNode);
				}
				if ($(argNode).find("SYSID").length==0)
				{
					fnMakeNode("SYSID","",argNode);
				}
				if ($(argNode).find("Email").length==0 && strOdSupportEmail != "N")
				{
					fnMakeNode("Email","",argNode);
				}
				if ($(argNode).find("FEP交換代碼").length==0)
				{
					fnMakeNode("FEP交換代碼","",argNode);
				}
				if ($(argNode).find("內部").length==0)
				{
					fnMakeNode("內部","否",argNode);
				}
				else if ($(argNode).find("內部").text()=="")
				{
					//1071123	Cloud	修正ie開啟時，預帶受文者無法顯示問題
					if("text" in $(argNode).find("內部").get(0))
						$(argNode).find("內部").get(0).text = "否"
					else
						$(argNode).find("內部").text("否");
				}
				if ($(argNode).find("ERR").length==0)
				{
					fnMakeNode("ERR","",argNode);
				}
				if ($(argNode).find("海外單位").length==0)
				{
					fnMakeNode("海外單位","0",argNode);
				}
				else if ($(argNode).find("海外單位").text()=="")
				{
					//1071123	Cloud	修正ie開啟時，預帶受文者無法顯示問題
					if("text" in $(argNode).find("海外單位").get(0))
						$(argNode).find("海外單位").get(0).text = "0"
					else
						$(argNode).find("海外單位").text("0");
				}
				if ($(argNode).find("國別").length==0)
				{
					fnMakeNode("國別","",argNode);
				}
				else if ($(argNode).find("國別").text()=="")
				{
					//1071123	Cloud	修正ie開啟時，預帶受文者無法顯示問題
					if("text" in $(argNode).find("國別").get(0))
						$(argNode).find("國別").get(0).text = "0"
					else
						$(argNode).find("國別").text("0");
				}
				if ($(argNode).find("郵寄地區").length==0)
				{
					fnMakeNode("郵寄地區","",argNode);
				}
				if ($(argNode).find("姓名").length==0)
				{
					fnMakeNode("姓名","",argNode);
				}
				//1141017	Joe		1141126		外貿增加傳真欄位
				//1141229 David 1141432 外貿增加欄位
				//if($(argNode).find("傳真").length==0 && strOrgNickName == "TAITRA")
					//fnMakeNode("傳真", "", argNode);
				if(strOrgNickName == "TAITRA")
				{
					if($(argNode).find("名址條名稱").length == 0)
						fnMakeNode("名址條名稱", "", argNode);
					if($(argNode).find("職稱").length == 0)
						fnMakeNode("職稱", "", argNode);
					if($(argNode).find("傳真").length == 0)
						fnMakeNode("傳真", "", argNode);
				}
			}
		}
		//1071003	Cloud	修正，for舊稿件，受文者僅有全銜，補上一代受文者編輯子視窗，開啟時增加檢核受文者是否有完整tag，如無則補齊-E

		/***********************************************************************************************/
		//***************受文者編輯子視窗初始化******************************//
		// 1100701 Raymond 1090927 手機平板也改用受文者編輯子視窗, 判斷小螢幕時受文者編輯子視窗改用固定大小
		var cntrW = "95%", cntrH = "95%";
		if(window.SDLMode) {
			cntrW = 972;	// 用最小尺寸規格1024X768的寬度計算1024*95%=972
			cntrH = 730;	// 用最小尺寸規格1024X768的高度計算768*95%=730
		}
		$.modal($dlg, {
			// 1100701 Raymond 1090927 手機平板也改用受文者編輯子視窗, 判斷小螢幕時受文者編輯子視窗改用固定大小
			//containerCss: {width: "95%", height: "95%"},
			containerCss: {width: cntrW, height: cntrH},
			onShow: function() 
			{
				
				//1060620	Cloud	[1060147]	(中興大學)增加匯入舊稿件時，自動檢核受文者正確性-非中興自動開啟即關閉
				//1090318 David 1090089 支援高榮使用，並補上依系統參數判斷是否執行功能至二代
				/*if(argAuto == true && strOrgNickName!="NCHU")
				{
					$.modal.close();
						return;
				}
				if(argAuto == true && strOrgNickName=="NCHU")
				{
					gIsNcHuAutOcheck = true;
				}*/
				if(argAuto == true)
				{
					if(strOrgNickName=="NCHU" || strOrgNickName=="KVGH" || theSSO.User.SystemSets.get("DEPT_AUTO_CHECK") == "Y")
						gIsNcHuAutOcheck = true;
					else
					{
						$.modal.close();
						return;
					}
				}
				//1110225 David 1101481 考試院使用時調整發文方式顯示長度
				if(strOrgNickName == "EXAM")
				{
					$('#DEPT_IssueTitle').css("width","11%");
					$('#DEPT_Address').css("width","20%");
				}

				//1130813 David 1130313 離線版進入時隱藏功能鍵
				if(theSSO.offlineMode)
				{
					$("#Dept_btPrint").css("display","none");//預覽受文者清單
					$("#Dept_btSearch").css("display","none");//常用機關查詢
					$("#Dept_btQueryZip").css("display","none");//郵遞區號
					$("#Grp_btZip").css("display","none");//群組內郵遞區號
					$("#Grp_btGrpPrint").css("display","none");//群組內預覽群組清單
				}
				
				//1141017	Joe		1141126		外貿增加傳真欄位
				if(strOrgNickName == "TAITRA")
				{
					$('#DEPT_IssueTitle').css("width","6.5%");
					//1141229 David 1141432 新增外貿客製化欄位，調整欄寬比例
					//$('#DEPT_Address').css("width","20%");
					//$('#DEPT_Emiailtile').css("width","10%");
					$('#DEPT_Address').css("width","12%");
					$('#DEPT_Emiailtile').css("width","8%");
					$('#DeptOrgName').css("width","12%");
					$('#DeptOrgTitle').css("width","12%");
				}
				else
				{
					$("#FaxNo").css("display","none");
					//1141229 David 1141432 新增外貿客製化欄位
					$("#NameAddress").css("display","none");
					$("#JobTitle").css("display","none");
				}

				//$dlg.enhanceWithin();
				if(activeDept.length) 
				{
					gcolWidthsDept = [];
					$dlg.find(".ui-table-header-PC .ui-table-column-header").each(function(i, elem) 
					{
						gcolWidthsDept.push($(elem).css("width"));
					});
				}

				$list = $dlg.find("#receiverList");//取得畫面要放入區塊
				//1051206 Cloud	文面調整受文者順序時，不會重設序號，開啟時重設
				//1071003 Cloud	調整排序時間點
				/*
				for (var i = 0 ; i < activeDept.children("受文者,受文者列表,已刪除").length; i++)
				{
					//追蹤修訂功能
					var bIsGrp=false;//是否為群組受文者
					if(activeDept.children("受文者,受文者列表,已刪除").eq(i).attr("群組代號")!=undefined)
						bIsGrp=true;
					
					var xmlseq = i+1;

					if (!bIsGrp)
						activeDept.children("受文者,受文者列表,已刪除").eq(i).attr("序",xmlseq);
					else
					{
						activeDept.children("受文者,受文者列表,已刪除").eq(i).attr("序",xmlseq);
						var oGrp = activeDept.children("受文者,受文者列表,已刪除").eq(i);
						for (var j = 0 ; j < oGrp.children("受文者,已刪除").length ; j++)
						{
							var Grpsew = j+1;
							oGrp.children("受文者,已刪除").eq(j).attr("序",xmlseq+'_'+Grpsew);						}
					}
				}*/
				//1071003	Cloud	修正，for舊稿件，受文者僅有全銜，補上一代受文者編輯子視窗，開啟時增加檢核受文者是否有完整tag，如無則補齊
				DeptfnReGroup();
				//1071003 Cloud	調整排序時間點
				for (var i = 0 ; i < activeDept.children("受文者,受文者列表,已刪除").length; i++)
				{
					//追蹤修訂功能
					var bIsGrp=false;//是否為群組受文者
					if(activeDept.children("受文者,受文者列表,已刪除").eq(i).attr("群組代號")!=undefined)
						bIsGrp=true;
					
					var xmlseq = i+1;

					if (!bIsGrp)
						activeDept.children("受文者,受文者列表,已刪除").eq(i).attr("序",xmlseq);
					else
					{
						activeDept.children("受文者,受文者列表,已刪除").eq(i).attr("序",xmlseq);
						var oGrp = activeDept.children("受文者,受文者列表,已刪除").eq(i);
						for (var j = 0 ; j < oGrp.children("受文者,已刪除").length ; j++)
						{
							var Grpsew = j+1;
							oGrp.children("受文者,已刪除").eq(j).attr("序",xmlseq+'_'+Grpsew);						}
					}
				}
				activeDept.eq(0).children("已刪除, 受文者, 受文者列表").each(fnInit);//讀取XML內容放入

				gChangeCnt = 0;

				//取得發文細項
				//1141021	Joe		1141126		調整發文細項、客製化發文方式提前取得
				//GetOdOrgIssueTypeAndDispatchIssue();
				
				//取得DATA.XML
				LoadSettingData();
				//本份文發文方式
				//1051026	Cloud	調整為全域函式
				gjf_SetSendType = jf_SetSendType;
				SetExchangeType();
				//1090220	Joe	1080755		密件公文，不可選擇紙本發文以外方式
				//1090717	Joe		1080755		因仍有機關使用密件電子發文，修正使用系統參數控管此功能
				if(theSSO.User.SystemSets.get("SECDOC_CAN_EISSUE") == "N"){
					if(Common.NowSecNo!="1" && Common.NowSecNo!="")
					{
						$dlg.find("#Dept_dlSendType").children("option[value='紙本公文']").prop('selected', true);
						pSendType = "紙本公文";
						$dlg.find("#Dept_dlSendType").attr('disabled', true);
					}
					else
						$dlg.find("#Dept_dlSendType").attr('disabled', false);
				}
				ChangeDocTypeSelectList("Dept_dlDocType");
				gDefaultdocType = $("#Dept_dlDocType option:selected").val();
				docType = $("#Dept_dlDocType option:selected").val();
				//取得最外框大小-用於設定視窗高度
				if(gheight==undefined)
				{
					gheight  = $("div#simplemodal-container").css("height").toUpperCase();
					gheight =  parseInt(gheight.substring(0,gheight.indexOf('P')));
					// 1100701 Raymond 1090927 手機平板也改用受文者編輯子視窗, 判斷小螢幕時受文者編輯子視窗改用固定大小
					var _dheight = $dlg.height();
					gheight = parseInt(_dheight) - 24;	// 小螢幕時內層simplemodal-data會固定高度(最小尺寸規格1024X768的高度768*95%=730), 外層則會依螢模高度而變得小於內層的高度, 此時若只用外層的高度計算table-body-container的高度的話會造成受文者清單項目無法顯示, 用內層的實際高度減去外層simplemodal-container的padding在非小螢幕狀態下會等於前2行抓的高度
				}
				//1100924 David 1090844 修正新增群組合併功能，造成下方列表受文者顯示被擋住問題
				//var height =(gheight-308);//扣去上方輸入區
				var height =(gheight-348);//扣去上方輸入區
				
				$("div#receiverTable-GRP").find(".ui-table-body-container").css("height",(gheight-140)+"px");//設定群組編輯子視窗
				//宣告全域函式，FOR 選擇視窗選擇機關後回傳使用
				//1070205 Clooud Ncku107169 將新增函是宣告為全域
				//gAddnewDept = fnAddOneNewDept;
				gAddnewDept = fnAddnew;
				gRegenTable = fnReGenTable;
				//1070507	Cloud	修正加入時多筆受文者重複時，選擇子視窗不會消失問題
				gAddnewEmp = fnAddOneNewDept;
				//1070724	Cloud	1070704		修正重複受文者為人時，子視窗選擇異常問題
				gChooseEmpEndReSet = fnReSet; 

				if(strHasTB == 1)//有公佈欄系統
				{
					if(!gTBCombine)//是否整合公布欄
					{
						$("#Dept_PasteTBSpan").css("display","none");
					}
					else
					{
						height =(height-70);//扣去公布欄高度
						$("#Dept_PasteTBSpan").css("display","");
					}
					if(strHasOutSideTB == 0)//沒有外部公布欄
						$("#Dept_cbOutsideTBdiv").css("display","none");
				}
				else
				{
					$("#Dept_PasteTBSpan").css("display","none");
				}
				//設定受文者子視窗
				$("div#receiverTable").find(".ui-table-body-container").css("height",height+"px");
				$("#Dept_txTBPasteDays").val(strTbPasTeDays);
				if(strOdSupportEmail=="N")
					$("#DEPT_Emiailtile").css("display","none");
				if(strDLGUseTrace=="Y")
				{
					$("#Dept_btCelDelete").css("display","");
						gEditSn = dm.getEditSN();//取得當前流程點代碼
				}	
				//1051006 Cloud	預設多筆模式
				$("#Dept_rgIsSplit").prop("checked",true);
				//1051216 Cloud 增加判斷環境變數設定是否保留正副本稱謂的勾選(受文者修改子視窗)
				if(gDlgKeepFullName=="Y")
					$("input#Mode_KeepName").prop("checked",true);
				else
					$("input#Mode_KeepName").prop("checked",false);
				//1121121 Joe 序320	新增依參數判斷預設輸入模式
				if(theSSO.User.SystemSets.get("WE_DEPT_DEF_INPUTMODE")=="0")
					$("#Dept_rgNoSplit").prop("checked",true);
				else
					$("#Dept_rgIsSplit").prop("checked",true);
				//1060620	Cloud	[1060147]	(中興大學)增加匯入舊稿件時，自動檢核受文者正確性-非中興自動開啟即關閉
				if(gIsNcHuAutOcheck)
				{
					//1081008	Joe		1080339		jQuery升級3.4.1--S
					// $("#receiverList").find("input[id^='Dept_cel']").click();
					$("#receiverList").find("input[id^='Dept_cel']").trigger("click");
					// $dlg.find("#Dept_btCheckBatch").click();
					$dlg.find("#Dept_btCheckBatch").trigger("click");
					//1081008	Joe		1080339		jQuery升級3.4.1--E
					//1090318 David 1090089 完成後關閉，避免使用批次檢核功能時進入開啟舊稿件的自動檢核功能
					gIsNcHuAutOcheck = false;
				}
			
				//1120626	Joe		序84		調整標檢局客製化欄位名稱
				if(strOrgNickName=="BSMI")
				{
					document.all.TitleOrg.textContent = "發文機關/單位受文者";
					document.all.TitleName.textContent = "二級單位/個人受文者";
				}
				else
				{
					document.all.TitleOrg.textContent = "受文者(機關/單位)";
					document.all.TitleName.textContent = "姓名";
				}
				
				//1130813 David 1130313 初始化時檢核及補上受文者交換現況
				//避免後續fnChkIsAnyCanEIssue檢核時因CALL WS為非同步處理，造成各呼叫處執行續混亂
				fnCheckReceiverFepStatus();
			}
		});
		//***************受文者編輯子視窗初始化******************************//
	});
};
/*************************************************各視窗共用函式*******************************************************************/
//提供共用函式，供切換發文方式、本別、含附件時使用
function fngolGetDocSendWay(argObj,argValueObj,argID,argTagName,argDeptMode)
{
	var argIdx = argID.split("_")[2];
		argIdx++;

	var strDisWord = "";
	var value = $("#"+argID).val();
	
	//1110225 David 1101481 發文方式獨立處理，移除fngolGetDocSendWay內切換發文方式邏輯
	/*//取得是否為內部單位or人員
	var IsInside = activeDept.find("受文者[序='"+argIdx+"']").find("內部").text();

	if (strHasTB != 1)
	{
		//1060626 Cloud	1040289 中興字樣改為公佈欄
		//1091007 David 修正1080407一律改為公布欄，調整排除字樣設定
		//if(strOrgNickName=="NCHU")
			//strDisWord += "公布欄";
		//else
			//strDisWord += "內部";
		strDisWord += "公布欄";
	}
	
	//支援電子郵件發文 
	if(strOdSupportEmail=="N" || (strOdSupportEmail == "I" && IsInside == "N") || (strOdSupportEmail == "O" && IsInside == "Y"))
		strDisWord += "電郵";

	if(pSendType=="紙本公文")
	{
		for(var iType=0;iType<gIssueBt.length;iType++)
		{
			if(gIssueSendType[iType] != "紙本")
				strDisWord += gIssueBt[iType]
		}
	}
	if(IsInside == "N")
	{
		//1060626 Cloud	1040289 中興字樣改為公佈欄
		//1091007 David 修正1080407一律改為公布欄，調整排除字樣設定
		//if(strOrgNickName=="NCHU")
			//strDisWord += "公布欄";
		//else
			//strDisWord += "內部";
		strDisWord += "公布欄";
	}

	if(gHasOs!="Y")
		strDisWord += "海外";
	else
	{
		var IsOverSea = activeDept.find("受文者[序='"+argIdx+"']").find("海外單位").text();
		if(IsOverSea == "0" || IsOverSea == "")
			strDisWord += "海外";
	}
	if(activeDept.find("受文者[序='"+argIdx+"']").find("機關代碼").text()=="")
		strDisWord += "電子";

	//1071224 David 1071175 新增依電子交換現況判斷能否使用電子發文方式
	if(activeDept.find("受文者[序='"+argIdx+"']").find("電子交換現況").length != 0 && activeDept.find("受文者[序='"+argIdx+"']").find("電子交換現況").text() != "T")
		strDisWord += "電子";*/
	
	var j=0,k=0;
	for(var i=0;i<argObj.length;i++)
	{
		var tmp = argObj[i];
		//重新循環
		j=(i==argObj.length-1)?0:i+1;

		//先找到目前的是哪一個
		if (value == tmp)
		{
			//取得下一個選項且為可用的
			//若j+k超過index大小，要重新循環
			//1110225 David 1101481 發文方式獨立處理，移除fngolGetDocSendWay內切換發文方式邏輯
			/*while(strDisWord.indexOf(argObj[j+k]) != -1 && strDisWord != "")
			{
				k++;
				//若j+k超過index大小，要重新循環
				if (j+k > argObj.length-1)
					k = 0-j;
			}*/
			//若j+k超過index大小，要重新循環
			if (j+k > argObj.length-1)
				k = 0-j;	
			$("#"+argID).val(argObj[j+k]);
			//設定至XML物件內
			if(argTagName=="本別")
			{
				if(argDeptMode=="Grp")
				{
					activeDept.find("受文者列表[序='"+argIdx+"']").attr(argTagName,argValueObj[j+k]);
					//1051208 	Cloud	修正受文者群組切換本別時，不會異動底下受文者本別問題
					for(var GrpDept=0;GrpDept<activeDept.find("受文者列表[序='"+argIdx+"']").find("受文者").length;GrpDept++)
					{
						activeDept.find("受文者列表[序='"+argIdx+"']").find("受文者").eq(GrpDept).attr(argTagName,argValueObj[j+k]);
					}
				}
				else
					activeDept.find("受文者[序='"+argIdx+"']").attr(argTagName,argValueObj[j+k]);
				gChangeCnt++;
			}
			else
				//1050818 Cloud	配合ie調整修改text方式
				//activeDept.find("受文者[序='"+argIdx+"']").find(argTagName).text(argValueObj[j+k]);
				//1051108	Cloud	修正本別、發文方式、附件異動後直接離開不會提醒需儲存bug
				//fnSetTextOfElement(activeDept.find("受文者[序='"+argIdx+"']").find(argTagName),jf_DeptTrim(argValueObj[j+k]));
				fnSetTextOfDeptElement(activeDept.find("受文者[序='"+argIdx+"']").find(argTagName),jf_DeptTrim(argValueObj[j+k]));
			//1070529 Cloud 1070183 新增附件分繕功能-不管是否皆清除分繕表-S
			if(argTagName=="含附件")
			{
				//1080312 David 1080089 調整紀錄異動的資料邏輯
				//g_arrmailMergeClearDept.push(document.all["Dept_lbOrgname_"+argID.split('_')[2]].value);//紀錄要清除分繕表的受文者
				var ItemIndex = argID.split('_')[2];
				var pDeptDullName = document.all["Dept_txOrgFullName_"+ItemIndex].value;
				var pDeptName = document.all["Dept_lbOrgname_"+ItemIndex].value;
				var pDeptEmpName = document.all["Dept_txEmpName_"+ItemIndex].value;
				var ShowOrderNo = (parseInt(ItemIndex)+1).toString();
				var pDeptSeqNo = activeDept.find("受文者[序='"+ShowOrderNo+"']").attr("編號");

				setMailMergeModify("1", pDeptSeqNo, pDeptDullName, pDeptName, pDeptEmpName);

				//1140728 David 1140381 異動既有受文者是否含附件時，設定附件分繕異動旗標
				gdmObj.needSaveDispatchAtt(true);
			}
			//1070529 Cloud 1070183 新增附件分繕功能-不管是否皆清除分繕表-E
			break;
		}
	}
}
//取得發文細項
function GetOdOrgIssueTypeAndDispatchIssue()
{
	if (strOdDispatchIssue !="")
	{
		var strDispatchIssue = strOdDispatchIssue.toUpperCase();

		if (strDispatchIssue.length == 4)
		{
			if(strDispatchIssue.substr(0,1)=="Y")
				gDispatchIssue[0] = true;
			if(strDispatchIssue.substr(1,1)=="Y")
				gDispatchIssue[1] = true;
			if(strDispatchIssue.substr(2,1)=="Y")
				gDispatchIssue[2] = true;
			if(strDispatchIssue.substr(3,1)=="Y")
				gDispatchIssue[3] = true;
		}
		else
			alert('系統參數：OD_DISPATCH_ISSUE 設定有誤，請檢查。');
	}
		
	if (strOdOrgissueType !="")
	{
		var OrgissueType = strOdOrgissueType.split('$');
		
		var SendType = new Array('紙本','電子交換','電子公布欄');
		
		for(var iClass=0;iClass<3;iClass++)
		{
			if (OrgissueType[iClass] && OrgissueType[iClass]!="")
			{
				var Type = OrgissueType[iClass].split(';');

				for(var iType=0;iType<Type.length;iType++)
				{
					var Name = Type[iType].split('|');
					
					gIssueSendType[gIssueSendType.length] = SendType[iClass];
					
					gIssueBt[gIssueBt.length] = Name[1];
					
					gIssueTypeSort[gIssueTypeSort.length] = Name[2];
				}
			}
		}
	}
}
//新增受文者時轉換發文方式
function fungetIssueType(argIssueType,argMode)
{
	//1050919 Cloud	實作密件控管功能
	if(gNeedSecControl == true)
		argIssueType = "2";

	var strShowMsg = "受文者"
	if(argMode=="群組")
		strShowMsg = "群組內有受文者"
	switch(argIssueType)
	{
		case "1":
			argIssueType = "人工傳遞";
			//1110225 David 1101481 新增考試院人工傳遞處理
			if(strOrgNickName == "EXAM")
				argIssueType = "機關間人工交換";
		break;

		case "2":
			argIssueType = "郵寄";
		break;

		case "3":
			if (pSendType != "紙本公文")
			{
				argIssueType = "電子交換";
				//1120418 David 新增判斷稿件可否使用電子交換
				if(gNoElecDraftType.includes(gDraftType))
					argIssueType = defaultIssueType;
			}
			else
			{
				//1090220	Joe	1080755 密件公文不詢問
				//1090717	Joe		1080755		因仍有機關使用密件電子發文，修正使用系統參數控管此功能
				if(theSSO.User.SystemSets.get("SECDOC_CAN_EISSUE") == "N"){
					if(Common.NowSecNo=="" || Common.NowSecNo=="1")
					{
						if(window.confirm(strShowMsg+"預設發文方式為電子交換發文，是否調整本份公文的發文為電子交換?"))
						{
							$("#Dept_dlSendType").val("電子交換");
							argIssueType = "電子交換";
							pSendType = "電子交換";
						}
						else
							argIssueType = defaultIssueType;
					}
					else
						argIssueType = defaultIssueType;
				}
				else{
					if(window.confirm(strShowMsg+"預設發文方式為電子交換發文，是否調整本份公文的發文為電子交換?"))
					{
						$("#Dept_dlSendType").val("電子交換");
						argIssueType = "電子交換";
						pSendType = "電子交換";
					}
					else
						argIssueType = defaultIssueType;
				}
				//1090616	Joe	1080755	修正密件新增受文者發文方式為空白問題
			}
		break;

		case "4":
			if(strOdSupportEmail!="N")
			{
				if (pSendType != "紙本公文")
					argIssueType = "電子郵件";
				else
				{
					//1090220	Joe	1080755 密件公文不詢問
					//1090717	Joe		1080755		因仍有機關使用密件電子發文，修正使用系統參數控管此功能
					if(theSSO.User.SystemSets.get("SECDOC_CAN_EISSUE") == "N"){
						if(Common.NowSecNo=="" || Common.NowSecNo=="1")
						{
							if(window.confirm(strShowMsg+"預設發文方式為電子郵件，是否調整本份公文的發文為電子交換?"))
							{
								$("#Dept_dlSendType").val("電子交換");
								argIssueType = "電子郵件";
								pSendType = "電子交換";
							}
							else
								argIssueType = defaultIssueType;
						}
						//1090616	Joe	1080755	修正密件新增受文者發文方式為空白問題
						else
							argIssueType = defaultIssueType;
					}
					else{
						if(window.confirm(strShowMsg+"預設發文方式為電子郵件，是否調整本份公文的發文為電子交換?"))
						{
							$("#Dept_dlSendType").val("電子交換");
							argIssueType = "電子郵件";
							pSendType = "電子交換";
						}
						else
							argIssueType = defaultIssueType;
					}
				}
			}
			else
				argIssueType = defaultIssueType;
		break;

		case "5":
			if(strHasTB!=0)
			{
				if(pSendType != "紙本公文")
				{
					argIssueType = "內部電子公布欄";
				}
				else
				{
					//1090220	Joe	1080755 密件公文不詢問
					//1090717	Joe		1080755		因仍有機關使用密件電子發文，修正使用系統參數控管此功能
					if(theSSO.User.SystemSets.get("SECDOC_CAN_EISSUE") == "N"){
						if(Common.NowSecNo=="" || Common.NowSecNo=="1")
						{
							if(window.confirm(strShowMsg+"預設發文方式為內部電子公布欄，是否調整本份公文的發文為電子交換?"))
							{
								$("#Dept_dlSendType").val("電子交換");
								argIssueType = "內部電子公布欄";
								pSendType = "電子公布欄";
							}
							else
								argIssueType = defaultIssueType;
						}
						//1090616	Joe	1080755	修正密件新增受文者發文方式為空白問題
						else
							argIssueType = defaultIssueType;
					}
					else{
						if(window.confirm(strShowMsg+"預設發文方式為內部電子公布欄，是否調整本份公文的發文為電子交換?"))
						{	
							$("#Dept_dlSendType").val("電子交換");
							argIssueType = "內部電子公布欄";
							pSendType = "電子公布欄";
						}
						else
							argIssueType = defaultIssueType;
					}
				}
			}
			else
				argIssueType = defaultIssueType;
		break;

		case "7":
			if (gHasOs=="Y")
			{
				//1141110 David 1141112 海外發文支援外貿使用，調整文字
				//argIssueType = "海外發文";
				argIssueType = gOsIssueTypeSort;
			}
			else
				argIssueType = defaultIssueType;
		break;

		//1110225 David 1101481 新增考試院人工傳遞處理
		case "8":
			argIssueType = "機關內函件傳遞";
		break;
		case "9":
			argIssueType = "個人專區";
		break;

		default :
			//1141017	Joe		1141126		客製化發文方式選項預帶邏輯處理
			var bFindIssue = false;
			if (strOdOrgissueType !="")
			{
				var OrgissueType = strOdOrgissueType.split('$');
				
				for(var iClass=0;iClass<3;iClass++)
				{
					if (OrgissueType[iClass] && OrgissueType[iClass]!="" && bFindIssue == false)
					{
						var Type = OrgissueType[iClass].split(';');

						for(var iType=0;iType<Type.length;iType++)
						{
							var Name = Type[iType].split('|');
							if(argIssueType == Name[0])
							{
								argIssueType = Name[1];
								bFindIssue = true;
								break;
							}
						}
					}
				}
			}
			if(bFindIssue == false)
				argIssueType = defaultIssueType;
		break;
	}
	return argIssueType;
}

//1141229 David 1141432 新增取得發文方式文字對應代碼方法
function fnGetIssueTypeByWord(argIssueTypeWord)
{
	let sRtnIssueType = "2";
	switch(argIssueTypeWord)
	{
		case "人工傳遞":
			sRtnIssueType = "1";
			break;
		case "郵寄":
			sRtnIssueType = "2";
			break;
		case "電子交換":
			sRtnIssueType = "3";
			break;
		case "電子郵件":
			sRtnIssueType = "4";
			break;
		case "內部電子公布欄":
			sRtnIssueType = "5";
			break;
		case gOsIssueTypeSort:
			sRtnIssueType = "7";
			break;
		case "個人專區":
			sRtnIssueType = "9";
			break;
		default :
			if (strOdOrgissueType !="")
			{
				var OrgissueType = strOdOrgissueType.split('$');
				
				for(var iClass=0;iClass<3;iClass++)
				{
					if (OrgissueType[iClass] && OrgissueType[iClass]!="")
					{
						var Type = OrgissueType[iClass].split(';');

						for(var iType=0;iType<Type.length;iType++)
						{
							var Name = Type[iType].split('|');
							if(argIssueTypeWord == Name[1])
							{
								sRtnIssueType = Name[0];
								break;
							}
						}
					}
				}
			}
		break;
	}
	return sRtnIssueType;
}

//轉換細項發文按鈕顯示字樣
function fnchangeIssueButton(argIsstype)
{
	for(var i=0;i<gIssueTypeSort.length;i++)
	{
		if(gIssueTypeSort[i]==argIsstype)
		{
			return gIssueBt[i];
			break;
		}
	}
}

//去空白
function jf_DeptTrim(Object)
{
	//1100510 David 1100221 改由共用方法處理
	//return jQuery.trim(Object);
	return jf_Trim(Object);
}
//建立群組編輯子視窗，修改子視窗下拉選單發文方式
function fngolSetGrpdlDocIssueType(argMode,argInside,argOrgNo,argIsoversea,argDocType,argId,argFepStatus)
{
	//1110225 David 1101481 調整發文方式選單處理邏輯
	let $IssueDropdown = $("#" + argId);
	$IssueDropdown.children().remove();
	for(let iIssue = 0 ; iIssue < gIssueBt.length ; iIssue++)
	{
		//$IssueDropdown.append("<OPTION value='" + + "'>" + gIssueBt + "</OPTION>");
		$IssueDropdown.append($("<option></option>").attr("value", gIssueTypeSort[iIssue]).text(gIssueBt[iIssue]));
	}

	if(argMode=="Grp")//群組編輯子視窗僅有判斷環境變數與系統參數
	{
		if(gHasOs!="Y")
		{
			//1141110 David 1141112 海外發文支援外貿使用，調整文字
			//$("select#"+argId).find("option[value='海外發文']").remove();
			$("select#"+argId).find("option[value='" + gOsIssueTypeSort + "']").remove();
		}

		if(strOdSupportEmail=="N")
			$("select#"+argId).find("option[value='電子郵件']").remove();
	}
	else if(argMode=="ModeOrg")
	{
		//1110225 David 1101481 修正判斷
		//if(argInside == "N")//外部
		//1130522	Joe		序602		自行輸入之受文者內部TAG預設為空
		// if(argInside == "N" || argInside == "否")//外部
		if(argInside == "N" || argInside == "否" || argInside == "")//外部
		{
			if(strOdSupportEmail == "I" )
				$("select#"+argId).find("option[value='電子郵件']").remove();
			
			//1110225 David 1101481 考試院公佈欄使用邏輯調整
			if(strOrgNickName == "EXAM"){}//考試院不需檢核
			else
				$("select#"+argId).find("option[value='內部電子公布欄']").remove();

			//1110225 David 1101481 外部受文者不可使用個人專區
			$("select#"+argId).find("option[value='個人專區']").remove();
		}
		else//內部
		{
			if(strOdSupportEmail == "O")
				$("select#"+argId).find("option[value='電子郵件']").remove();
		}
		if(argIsoversea == "0" || gHasOs!="Y")//非海外
		{
			//1141110 David 1141112 海外發文支援外貿使用，調整文字
			//$("select#"+argId).find("option[value='海外發文']").remove();
			$("select#"+argId).find("option[value='" + gOsIssueTypeSort + "']").remove();
		}
		if (pSendType == "紙本公文" && argDocType != "抄本")
		{
			$("select#"+argId).find("option[value='電子交換']").remove();
			$("select#"+argId).find("option[value='電子郵件']").remove();
		}

		if(strOdSupportEmail == "N" || strOdSupportEmail == "")
			$("select#"+argId).find("option[value='電子郵件']").remove();
		//1051108	Cloud	修正由畫面增加的受文者會被誤判不可使用電子交換bug
		//if(argOrgNo.length<10 || argFepStatus!="T")
		if(argOrgNo.length<10 && argFepStatus!="T")
			$("select#"+argId).find("option[value='電子交換']").remove();
	}
	if(strHasTB!="1")
		$("select#"+argId).find("option[value='內部電子公布欄']").remove();

	//1110225 David 1101481 個人專區處理
	if(!bUsePersonal)
		$("select#"+argId).find("option[value='個人專區']").remove();

	//1141110 David 1141112 前端已將擴充發文方式方式加入選單，此處不需重複處理
	//$("select#"+argId).append(fngolGetOdOrgIssueType());
}
//1141110 David 1141112 已不需要
/*function fngolGetOdOrgIssueType()
{
	var strOrgIssueType="";
	if (strOdOrgissueType !="")
	{
		//$8|內電|內部電子交換$
		var OrgissueType = strOdOrgissueType.split('$');
		
		var SendType = new Array('紙本','電子交換','電子公布欄');//自定義固定為三組
		
		for(var iClass=0;iClass<3;iClass++)
		{
			if(pSendType=="紙本公文" && iClass>0)//紙本公文時，僅放入紙本發文方式
				break;
				
			if (OrgissueType[iClass] && OrgissueType[iClass]!="")
			{
				var Type = OrgissueType[iClass].split(';');

				for(var iType=0;iType<Type.length;iType++)
				{
					var Name = Type[iType].split('|');
					strOrgIssueType +="<option value="+Name[2]+">"+Name[1]+"</option>";
				}
			}
		}
	}
	return strOrgIssueType;
}*/

//受文者修改子視窗回傳-單筆
function fnRestDept(argSeq,argXmlDom)
{
	$("#receiverSetting").find(".ui-slide-pane-ModeOrg").removeClass("ui-slide-pane-active");//隱藏修改子視窗
	$("#receiverSetting").find(".ui-slide-pane-ModeOrg").css("width","100%");//隱藏修改子視窗
	$("#receiverSetting").find(".ui-slide-pane-left").css("opacity","");//顯示受文者編輯子視窗
	//畫面資料回寫行為
	if(argSeq!=null && argXmlDom!=null)
	{
		$("#Dept_lbOrgname_"+argSeq).val(argXmlDom.find("正式名稱").text());
		$("#Dept_txEmpName_"+argSeq).val(argXmlDom.find("姓名").text());
		$("#Dept_txOrgFullName_"+argSeq).val(argXmlDom.find("全銜").text());
		//1051215 Cloud	調整主持、出席、列席由修改子視窗問題
		//$("#Dept_dlDocType_"+argSeq).val(argXmlDom.attr("本別"));
		var strDocType=argXmlDom.attr("本別");
		//轉換本別
		switch(strDocType)
		{
			case "主持人":
				strDocType ="主持";
			break;
			case "列席者":
				strDocType ="列席";
			break;
			case "出席者":
				strDocType ="出席";
			break;
		}
		$("#Dept_dlDocType_"+argSeq).val(strDocType);
		$("#Dept_dlattach_"+argSeq).val(argXmlDom.find("含附件").text());
		$("#Dept_dldocissuetype_"+argSeq).val(fnchangeIssueButton(argXmlDom.find("發文方式").text()));
		$("#Dept_txPostNo_"+argSeq).val(argXmlDom.find("郵遞區號").text());
		$("#Dept_txAddress_"+argSeq).val(argXmlDom.find("地址").text());
		$("#Dept_txEmail_"+argSeq).val(argXmlDom.find("Email").text());
		gChangeCnt++;
	}
	//取消勾選
	$("input#Dept_cel").prop("checked",false);
	
}
//受文者修改子視窗回傳-多筆
function fnMuitSetDept(argMode,argNewDocType,argNewAttach,argNewXmlDocIsstype)
{
	$("#receiverSetting").find(".ui-slide-pane-left").css("opacity","");//顯示受文者編輯子視窗
	$("#receiverSetting").find(".ui-slide-pane-ModeOrg-Muit").removeClass("ui-slide-pane-active");//隱藏修改子視窗
	$("#receiverSetting").find(".ui-slide-pane-ModeOrg-Muit").css("width","100%");//隱藏修改子視窗
	
	if(argMode=="Save")
	{
		var elmentIDsEQ;
		var NewDocIsstype = fnchangeIssueButton(argNewXmlDocIsstype);//修改子視窗選單設定值
		var iGrp=false;
		for(var iDept=0;iDept<gMuitDeptSeq.length;iDept++)
		{
			iGrp=false;
			elmentIDsEQ = gMuitDeptSeq[iDept]-1;
			
			//判斷是否為群組div.ui-table-column-item-為了避免啟用追蹤修定時，連被刪除的都被改掉
			if($("#receiverList").find("div.ui-table-column-item").find("INPUT#Dept_dlattach_"+elmentIDsEQ).length==0)
				iGrp = true;
			
			//本別
			if($("INPUT#Muit_editDocType").prop("checked"))
				$("#receiverList").find("div.ui-table-column-item").find("INPUT#Dept_dlDocType_"+elmentIDsEQ).val(argNewDocType);
			
			//修改是否含附件			
			if($("INPUT#Muit_editAttach").prop("checked") && !iGrp)
				$("#receiverList").find("div.ui-table-column-item").find("INPUT#Dept_dlattach_"+elmentIDsEQ).val(argNewAttach);
			
			//發文方式
			//if(!iGrp)
			//修改發文方式
			if($("INPUT#Muit_DocIssue").prop("checked") && !iGrp)
				$("#receiverList").find("div.ui-table-column-item").find("INPUT#Dept_dldocissuetype_"+elmentIDsEQ).val(NewDocIsstype);
			
			//取消勾選
			$("input#Dept_cel_"+iDept).prop("checked",false);
		}
		//取消勾選
		$("input#Dept_cel").prop("checked",false);
		gChangeCnt++;
	}
	
	
}
//受文者修改子視窗回傳-群組
function fnModeGrpSetDept(argMode,argSeq,argNewDocType,argOrgname,argFullName)
{
	$("#receiverSetting").find(".ui-slide-pane-left").css("opacity","");//顯示受文者編輯子視窗
	$("#receiverSetting").find(".ui-slide-pane-ModeOrg-GRP").removeClass("ui-slide-pane-active");//隱藏修改子視窗
	$("#receiverSetting").find(".ui-slide-pane-ModeOrg-GRP").css("width","100%");//隱藏修改子視窗
	
	if(argMode=="Save")
	{
		$("#receiverList").find("INPUT#Dept_lbOrgname_"+argSeq).val(argOrgname);
		//1111102	Joe		--		配合顯示全部資料調整Tag屬性--S
		if(theSSO.User.SystemSets.get("DEPT_SHOW_FULLDATA") == "Y")
			$("#receiverList").find("textarea#Dept_lbOrgname_"+argSeq).val(argOrgname);
		else
		//1111102	Joe		--		配合顯示全部資料調整Tag屬性--E
			$("#receiverList").find("INPUT#Dept_lbOrgname_"+argSeq).val(argOrgname);
		objFullName=objacTiveobj.find("input[id^='Dept_lbOrgname']");
		$("#receiverList").find("INPUT#Dept_txOrgFullName_"+argSeq).val(argFullName);
		$("#receiverList").find("INPUT#Dept_dlDocType_"+argSeq).val(argNewDocType);
		//取消勾選
		$("input#Dept_cel_"+argSeq).prop("checked",false);
		gChangeCnt++;
	}
	
}
//供視窗建立本別選單
function ChangeDocTypeSelectList(argId)
{
	if(iSmeetDoc)
	{
		$("select#"+argId).children().remove();
		//1051215 Cloud	修正本別選項建立異常問題
		/*$("select#"+argId).append("<OPTION value='主持'>主持人</OPTION><OPTION value='出席'>出席者</OPTION>"+
				"<OPTION value='列席'>列席者</OPTION><OPTION value='副本'>副本</OPTION>"+
				"<OPTION value=''>抄本</OPTION>")*/
		$("select#"+argId).append("<OPTION value='主持人'>主持人</OPTION><OPTION value='出席者'>出席者</OPTION>"+
				"<OPTION value='列席者'>列席者</OPTION><OPTION value='副本'>副本</OPTION>"+
				"<OPTION value='抄本'>抄本</OPTION>")
	}
}
//選擇子視窗回傳處理
function fnReturnValueFromChoose(argID,argRtnObj,argMode,argBclose)
{
	var ChooseSep = argID.split('_')[3];
	//var XMLseq = receiverList.children.length+1;//XML物件內的紀錄於TAG內的序<受文者 序>
	//var seq =receiverList.children.length;//畫面物件內的INDEX順序
	//1070507	Cloud	修正加入時多筆受文者重複時，選擇子視窗不會消失問題
	if(argBclose)
	{
		$("#receiverSetting").find(".ui-slide-pane-left").css("opacity","");//顯示主視窗*/
		//1070507	Cloud	修正加入時多筆受文者重複時，選擇子視窗不會消失問題
		gChooseBackEnd = true;
	}
	//1070205 Cloud 調整處理方式為透過呼叫ws新增
	/*var XMLseq = argID.split('_')[4];//XML內的序
	var prveXmlsrq = -1;
	var seq = -1;*/
	//1050905	1050087	Cloud	修正第一個受文者為需選擇時，異常問題
	//if(parseInt(XMLseq)!=0)//不是第一筆則取得前一個序
	//1070205 Cloud 調整處理方式為透過呼叫ws新增
	/*if(parseInt(XMLseq)!=1)//不是第一筆則取得前一個序
	{
		prveXmlsrq = parseInt(XMLseq)-1;//XML內前一個XML的序		
		//1050905	1050087	Cloud	修正第一個受文者為需選擇時，異常問題
		//seq = parseInt(XMLseq)-1;//畫面物件的序	
	}
	seq = parseInt(XMLseq)-1;//畫面物件的序
	$("#ui-slide-pane-Choose-Org_"+XMLseq).remove();//改為移除因為畫面都用複製出來的
	if(argMode=="Org")
	{
		//$("#receiverList-Choose-Org").empty();//清空畫面
		
		//有兩筆以上的機關由WS回傳物件結構同群組，利用群組展開方式建立受文者
		//修改建立方式為建立節點後塞入
		gGrpExpand = true;//因回傳結構，利用群組展開方式建立節點
		gAddnewDept(argRtnObj.value,seq,XMLseq,"群組",Number(ChooseSep),prveXmlsrq,seq);
	}
	else
	{
		//$("#receiverList-Choose-Emp").empty();//清空畫面
		var EmailInfo = argRtnObj.value.Email[0].split('|');//切割|CHECK
		EmailInfo = EmailInfo[0].split(';');//切割資訊
		argRtnObj.value.DeptNo[0]="";
		argRtnObj.value.Email[0]=EmailInfo[ChooseSep];
		//gAddnewDept(argRtnObj.value,seq,XMLseq,"單筆");
		gAddnewDept(argRtnObj.value,seq,XMLseq,"單筆",null,prveXmlsrq,seq);
		
	}*/
	//1070507	Cloud	修正加入時多筆受文者重複時，選擇子視窗不會消失問題-s
	/*$("#Dept_txDeptSysId").val(argRtnObj.value.SysId[ChooseSep]);
	gAddnewDept("New");*/
	var XMLseq = argID.split('_')[4];//XML內的序
	$("#ui-slide-pane-Choose-Org_"+XMLseq).remove();//改為移除因為畫面都用複製出來的
	if(argMode=="Org")
	{
		//因有可能重複的是群組，群組必須依靠新增取得群組後回來取代-調整此處靠新增取代-
		gCheckXmlindex = XMLseq;
		$("#Dept_txDeptSysId").val(argRtnObj.value.SysId[ChooseSep]);
		gChooseBack = true;
		gAddnewDept("CHECK",gCheckXmlindex);
		
	}
	else
	{	
		//1070724	Cloud	Cloud	1070704		修正重複受文者為人時，子視窗選擇異常問題
		var prveXmlsrq = -1;
		var seq = -1;
		if(parseInt(XMLseq)!=1)//不是第一筆則取得前一個序
		{
			prveXmlsrq = parseInt(XMLseq)-1;//XML內前一個XML的序		
		}
		seq = parseInt(XMLseq)-1;//畫面物件的序
		//var EmailInfo = argRtnObj.value.Email[0].split('|');//切割|CHECK
		//EmailInfo = EmailInfo[0].split(';');//切割資訊
		//argRtnObj.value.Email[0]=EmailInfo[ChooseSep];
		argRtnObj.value.Email[0]=argRtnObj.value.DeptNo[0].split(';')[ChooseSep].split('|')[1]
		argRtnObj.value.DeptNo[0]="";
		//1070724	Cloud	Cloud	1070704		修正重複受文者為人時，子視窗選擇異常問題
		//argRtnObj.value.Email[0]=EmailInfo[ChooseSep];
		gAddnewEmp(argRtnObj.value,null,XMLseq,"單筆",null,prveXmlsrq,seq);//新增gAddnewEmp 為原本的fnAddOneNewDept
		//1070724	Cloud	1070704		修正重複受文者為人時，子視窗選擇異常問題
		if(argBclose)//人員選擇子視窗新增至稿件邏輯與機關不同，機關有sysid透過gAddnewDept觸發畫面重建故判斷非機關時並關閉選擇視窗時，觸發重建畫面
			gChooseEmpEndReSet();
	}
	//1070507	Cloud	修正加入時多筆受文者重複時，選擇子視窗不會消失問題-e
	
}
//傳入XML物件，SIDE :建立者或是刪除者-群組編輯子視窗會呼叫
function fnGetSnName(argObj,argSnSide)
{
	var RtnName = "";
	try
	{
		if(argObj.attr(argSnSide)!=undefined && argObj.attr(argSnSide)!="undefined")//表示有建立者資訊
		{
			if(gTraceInfo[argObj.attr(argSnSide)]!=undefined)
				RtnName = gTraceInfo[argObj.attr(argSnSide)];
			else
			{
				RtnName = gdm.getTCSess(argObj.attr(argSnSide)).name;
				gTraceInfo[argObj.attr(argSnSide)] = RtnName;
			}
		}
	}
	catch(e)
	{
		//轉換名字壞掉就算了，不能讓程式壞掉
	}
	return RtnName;
}
//群組編輯子視窗關閉
function fnCallbackDept(argExpend,argGrpindex)
{
	$("#receiverSetting").find(".ui-slide-pane-GRP").removeClass("ui-slide-pane-active");//隱藏受文者編輯子視窗
	$("#receiverSetting").find(".ui-slide-pane-left").addClass("ui-slide-pane-active");//顯示群組編輯子視窗
	//判斷當群組內含附件不是完全相同時 將群組解開
	if(argExpend)
	{
		activeDept.find("受文者列表[序='"+argGrpindex+"']").find("文字").remove();
		activeDept.find("受文者列表[序='"+argGrpindex+"']").find("已刪除").remove();
		activeDept.find("受文者列表[序='"+argGrpindex+"']").children().unwrap();
		gRegenTable();
	}
	
}
//1050819 Cloud	參照群組視窗函式撰寫供受文者視窗用節點替換函式
function fnDeptWrap(objElement, newNodeName,argMode)//
{
	var docElement = activeDept.get(0).ownerDocument;
	var newNode = docElement.createElement(newNodeName);
	var domElement = objElement;
	
	//copy 所有Attribute
	for(var i=0,maxAttrIdx = domElement.attributes.length;i<maxAttrIdx;i++){
		newNode.setAttribute(domElement.attributes[i].name,domElement.attributes[i].value);
	}
	
	//copy 所有的子節點
	var cloneNodeList = $(objElement).children().clone();
	for(var i=0,maxIdx = cloneNodeList.length;i<maxIdx;i++)
		$(newNode).append(cloneNodeList[i]);
	//新建立的Node，塞在自己的前面
	if(argMode=="Delete")
	{
		domElement.parentNode.insertBefore(newNode,domElement);
		//再把自己砍了~~
		$(domElement).remove();
	}
	else//恢復刪除則利用新增方式增加
	{
		activeDept.append(newNode);
	}
}
//1051026	Cloud	調整儲存檢核函式，改為物件可由受文者清單呼叫
nsEditor.Dept_fnCheckBeforeSeve = function Dept_fnCheckBeforeSeve(argdm)
{
	return fncheckBeforeSave(argdm);
}
//1051026	Cloud	調整儲存檢核函式，改為物件可由受文者清單呼叫
function fncheckBeforeSave(argdm)
{
	//1051026	Cloud	調整儲存檢核函式，改為物件可由受文者清單呼叫
	var activeDeptObj;
	if(argdm!=undefined)
	{
		activeDeptObj = argdm.find("> 受文者列表");
	}
	else
	{
		activeDeptObj = activeDept;
	}

	//1100305 David 1090610 將受文者資訊紀錄為Array物件，供後續檢核使用，避免XML物件重複find耗時
	var arrIssueData = [];
	activeDeptObj.find("受文者").each(function(o){
		let $o=$(this);
		var pEmpname = ($o.find("姓名").text())?$o.find("姓名").text() : "";

		arrIssueData.push({
			DocType:$o.attr("本別")
			,IssueType:$o.find("發文方式").text()
		});
	});

	//var ndOrgList = activeDeptObj.children("受文者");
	//1100305 David 1090610 改由Array物件判斷，不需重複find
	//var ndOrgList = activeDeptObj.find("受文者");
	//if (ndOrgList && ndOrgList.length > 0)
	var iOrgLength = arrIssueData.length;
	if (iOrgLength > 0)
	{
		bIsAutoChangeSendType = true;
		//檢核發文方式是否有受文者發文方式使用
		//1051026	Cloud	增加判斷dm不為undefined由dm讀取資訊
		//var pSendTypeText = $("#Dept_dlSendType option:selected").text();
		var pSendTypeText = "";
		if(argdm!=undefined)
		{
			pSendTypeText = argdm.find("本文發文方式").text();
			if(pSendTypeText=="")
				pSendTypeText = '電子交換';
		}
		else
			pSendTypeText = $("#Dept_dlSendType option:selected").text();
		var bIsMatchSendType = false;
		
		//檢核發文細項方式是否有受文者發文方式使用
		//1051026	Cloud	增加判斷dm不為undefined由dm讀取資訊
		//var pSendDetailType = $("#Dept_dlSendDetailType option:selected").text();
		var pSendDetailType = "";
		if(argdm!=undefined)
		{
			pSendDetailType = argdm.find("電子交換處理機制類別細項").text();
		}
		else
			pSendDetailType = $("#Dept_dlSendDetailType option:selected").text();
		//1051026	Cloud	增加判斷dm不為undefined由dm讀取資訊	
		//var bIsMatchSendDetailType = $("#Dept_dlSendDetailType option:selected").children().length == 1 ;
		var bIsMatchSendDetailType = true;
		if(argdm!=undefined)
		{
			var DetailCount = 0;

			thePublicRsrc.getDataXML(theUserInfo.OrgID).done(function(datDoc) {	
				var $src = $(datDoc.documentElement);
				var ndlSendDetailType = $src.find("data[type='紙本發文方式']");
				if (ndlSendDetailType.length != 0 && gDispatchIssue[1])
				{
					ndlSendDetailType = ndlSendDetailType.find("代碼");
					DetailCount +=ndlSendDetailType.length;
				}

				var ndlSendDetailType = $src.find("[type='電子發文方式']");
				if (ndlSendDetailType.length !=0 && gDispatchIssue[2])
				{
					ndlSendDetailType = ndlSendDetailType.find("代碼");
					DetailCount +=ndlSendDetailType.length;
				}

				var ndlSendDetailType = $src.find("[type='公布欄發文方式']");
				if (ndlSendDetailType.length !=0 && gDispatchIssue[3])
				{
					ndlSendDetailType = ndlSendDetailType.find("代碼");
					DetailCount +=ndlSendDetailType.length;
				}
				bIsMatchSendDetailType = DetailCount == 0;
			})
		}
		else
			bIsMatchSendDetailType = $("#Dept_dlSendDetailType option:selected").children().length == 1 ;
		
		//檢核公文是否為紙本發文
		//1051026	Cloud	增加判斷dm不為undefined由dm讀取資訊
		//var bIsPaper = $("#Dept_dlSendType option:selected").val() == '紙本公文';
		var bIsPaper = pSendTypeText == '紙本公文';
		
		//紀錄無法電子發文原因
		var CantEIssueReason = $("#Dept_dlCantEIssueReason option:selected").val();
		//先檢查全部受文者不為抄本時才可以忽略抄本判斷
		var TransCript_Check = false;
		//strOdTranScriptCheck
		if(strOdTranScriptCheck=="N")
		{
			//1100305 David 1090610 改由Array物件判斷
			/*for (var iOrgList = 0 ; iOrgList < ndOrgList.length ; iOrgList++)
			{
				if(ndOrgList.eq(iOrgList).attr("本別")!="抄本")
				{
					TransCript_Check = true;
					break;
				}
			}*/
			var HasScript = arrIssueData.filter(function(o){
				return o.DocType == "抄本";
			})
			if(HasScript && HasScript.length > 0)
				TransCript_Check = true;
		}
		//紀錄是否通過檢核
		var bCanPassCheck = true;
		//以使用者選擇公文發文方式檢核是否符合受文者發文方式
		//1100305 David 1090610 改由Array物件判斷
		//for (var iOrgList = 0 ; iOrgList < ndOrgList.length ; iOrgList++)
		for (var iOrgList = 0 ; iOrgList < iOrgLength ; iOrgList++)
		{
			//1100305 David 1090610 改由Array物件判斷
			//var pIssueType = ndOrgList.eq(iOrgList).find("發文方式").text();
			//var pDocType = ndOrgList.eq(iOrgList).attr("本別");
			var pIssueType = arrIssueData[iOrgList].IssueType;
			var pDocType = arrIssueData[iOrgList].DocType;
			
			if (pDocType == '抄本' && strOdTranScriptCheck=="N" && TransCript_Check)
				continue;
			//系統紀錄所有發文方式-檢核各受文者自己發文方式
			for(var iType=0;iType<gIssueSendType.length;iType++)
			{
				if(gIssueTypeSort[iType] == pIssueType)
				{
					//公文紙本發文受文者有電子交換或是公文電子交換受文者有公佈欄則不通過檢核
					if((bIsPaper && gIssueSendType[iType]!='紙本')||(pSendType =='電子交換' && gIssueSendType[iType]=='電子公布欄'))
					{
						bCanPassCheck = false;
						break;
					}
					//檢核全文發文方式是否與受文者發文類型相同(紙本、電子交換...)
					if(pSendTypeText == gIssueSendType[iType])
						bIsMatchSendType = true;
					
					//檢核發文方式細項是否與受文者發文方式相同(人工傳遞、郵寄、電子交換...)
					if(pSendDetailType == pIssueType || pSendDetailType=="")
						bIsMatchSendDetailType = true;
					break;
				}
			}
			if(!bCanPassCheck)
				break;
		}
		//檢核未通過
		if(!bCanPassCheck)
		{
			bIsMatchSendType = false;
			bIsMatchSendDetailType = $("#Dept_dlSendDetailType option:selected").text().length == 1 ;
		}
		//發文方式或發文細項方式不符合-此處邏輯只要有一個受文者完全符合發文方式跟細項檢核就不會進來
		//1051026	Cloud	增加判斷dm為undefined才進行-表示為編輯子視窗儲存呼叫
		//if(!bIsMatchSendType || !bIsMatchSendDetailType)
		if(argdm==undefined && ( !bIsMatchSendType || !bIsMatchSendDetailType))
		{
			//自動切換發文方式-直到發文方式及發文細項方式可以符合其中一個受文者的發文方式
			for (var iSendType = $("#Dept_dlSendType").children().length-1 ; iSendType >= 0 ; iSendType--)
			{
				$("#Dept_dlSendType option:eq("+iSendType+")").prop('selected', true);
					dlSendTypeOnChange();
				//自動切換發文方式細項
				for(var iDetailType = 0; iDetailType < $("#Dept_dlSendDetailType").children.length; iDetailType++)
				{
					$("#Dept_dlSendDetailType option:eq("+iDetailType+")").prop('selected', true);
					
					//紀錄公文發文方式
					pSendTypeText = $("#Dept_dlSendType option:selected").text();
					pSendDetailType = $("#Dept_dlSendDetailType option:selected").text();
					
					//各受文者
					//1100305 David 1090610 改由Array物件判斷
					//for (var iOrgList = 0 ; iOrgList < ndOrgList.length ; iOrgList++)
					for (var iOrgList = 0 ; iOrgList < iOrgLength ; iOrgList++)
					{
						//1100305 David 1090610 改由Array物件判斷
						//var pIssueType = ndOrgList.eq(iOrgList).find("發文方式").text();
						//var pDocType = ndOrgList.eq(iOrgList).attr("本別");
						var pIssueType = arrIssueData[iOrgList].IssueType;
						var pDocType = arrIssueData[iOrgList].DocType;

						//如果參數設為N且受文者不全部為抄本時，忽略抄本的發文方式判斷
						if (pDocType == '抄本' && strOdTranScriptCheck=="N" && TransCript_Check)
							continue;

						//系統紀錄所有發文方式迴圈
						for(var iType=0;iType<gIssueSendType.length;iType++)
						{
							if(gIssueTypeSort[iType] == pIssueType)
							{	
								//檢核發文方式是否與受文者發文方式使用
								if(pSendTypeText == gIssueSendType[iType])
									bIsMatchSendType = true;
								//檢核發文方式細項是否與受文者發文方式使用
								if(pSendDetailType == pIssueType || pSendDetailType=="")
									bIsMatchSendDetailType = true;
								break;
							}
						}
						if(bIsMatchSendType && bIsMatchSendDetailType)
							break;
					}
					if(bIsMatchSendType && bIsMatchSendDetailType)
						break;
				}
				if(bIsMatchSendType && bIsMatchSendDetailType)
					break;
			}
		}
		//如原本有無法電子交換原因，則放回去
		//1051026	Cloud	清單呼叫不做電子交換原因放回功能
		if(argdm==undefined)
		{
			if($("#Dept_dlSendType option:selected").val() == '紙本公文')
			{
				$("#Dept_dlCantEIssueReason").val(CantEIssueReason);
			}
		}
		bIsAutoChangeSendType = false;
		//利用dlSendTypeOnChange去做一次全受文者檢核
		//1051026	Cloud	增加判斷dm為undefined才進行-表示為編輯子視窗儲存呼叫
		//清單呼叫不做自動切換發文方式及細項切換
		if(argdm==undefined)
			dlSendTypeOnChange();
	}

	gErrorMessage = "";//於檢查前將錯誤訊息清空，避免重複跳出訊息
	var RtnBool = false;
	//argdm重設序
	if(argdm!=undefined)
	{
		for (var i = 0 ; i < activeDeptObj.children("受文者,受文者列表,已刪除").length; i++)
		{
			//追蹤修訂功能
			var bIsGrp=false;//是否為群組受文者
			var xmlseq = i+1;
			if(activeDeptObj.children("受文者,受文者列表,已刪除").eq(i).attr("群組代號")!=undefined)
				bIsGrp=true;

			if (!bIsGrp)
				activeDeptObj.children("受文者,受文者列表,已刪除").eq(i).attr("序",xmlseq);
			else
			{
				activeDeptObj.children("受文者,受文者列表,已刪除").eq(i).attr("序",xmlseq);
				var oGrp = activeDeptObj.children("受文者,受文者列表,已刪除").eq(i);
				for (var j = 0 ; j < oGrp.children("受文者,已刪除").length ; j++)
				{
					var xmlGRPseq = j+1;
					oGrp.children("受文者,已刪除").eq(j).attr("序",xmlseq+'_'+xmlGRPseq);
				}
			}
		}
	}
	//1051026	Cloud	增加判斷dm為undefined才進行-表示為編輯子視窗儲存呼叫
	if(argdm==undefined)
		pSendType = $("#Dept_dlSendType option:selected").val();
	else
		pSendType = pSendTypeText;

	//檢核發文方式是否與受文者發文方式使用
	//1051026	Cloud	增加判斷dm為undefined才進行-表示為編輯子視窗儲存呼叫
	//清單呼叫，不需要重取因為沒有自動切換
	if(argdm==undefined)
		var pSendTypeText = $("#Dept_dlSendType option:selected").text();
	
	var bIsMatchSendType = false;
	//檢核發文細項方式是否與受文者發文方式使用	
	//1051026	Cloud	增加判斷dm為undefined才進行-表示為編輯子視窗儲存呼叫
	//清單呼叫，不需要重取因為沒有自動切換
	if(argdm==undefined)
		var pSendDetailType = $("#Dept_dlSendDetailType option:selected").text();
	var bIsMatchSendDetailType = pSendDetailType=="" ;
	//檢核發文細項方式是否包含電子發文
	var bIsHaveEIssue = false;
	
	var bIsPaper = pSendType == '紙本公文';
	var pErrList1 = '';
	var pErrList2 = '';
	var pErrList3 = '';
	var pErrList4 = '';
	var pErrDupName = '';
	var pErrDupNo = '';
	//1100305 David 1090610 紀錄重複名稱、交換代碼的序號
	var arrDupName = [];
	var arrDupOrgNo = [];

	var ndOrgList = activeDeptObj.find("受文者");

	//1100305 David 1090610 序號重設後重新紀錄
	arrIssueData = [];
	ndOrgList.each(function(o){
		let $o=$(this);
		var pEmpname = ($o.find("姓名").text())?$o.find("姓名").text() : "";
		var pEmail = ($o.find("Email").text())?$o.find("Email").text() : "";
		var pInside = ($o.find("內部").text())?$o.find("內部").text() : "N";
		var pOverSea = ($o.find("海外單位").text())?$o.find("海外單位").text() : "0";

		arrIssueData.push({
			Seq:$o.attr("序")
			,DocType:$o.attr("本別")
			,OrgName:$o.find("正式名稱").text()
			//1140725	Joe		1140383		新增輸入前檢核正副本稱謂
			,OrgNameInEdit:$o.find("全銜").text()
			,EmpName:pEmpname
			,OrgNo:jf_DeptTrim($o.find("機關代碼").text())
			,UnitNo:jf_DeptTrim($o.find("單位代碼").text())
			,IssueType:$o.find("發文方式").text()
			,Email:pEmail
			,Inside:pInside
			,OverSea:pOverSea
			,PostNo:jf_DeptTrim($o.find("郵遞區號").text())
			,Address:jf_DeptTrim($o.find("地址").text())
		});
	});

	//1100305 David 1090610 改用Array物件處理
	//if (ndOrgList && ndOrgList.length > 0)
	if (arrIssueData.length > 0)
	{
		//先檢查全部受文者不為抄本時才可以忽略抄本判斷
		var TransCript_Check = false;
		//1051026	Cloud	增加判斷dm為undefined才進行-表示為編輯子視窗儲存呼叫
		//if(strOdTranScriptCheck=="N")
		if((argdm==undefined && strOdTranScriptCheck=="N") || (argdm!=undefined && theSSO.User.SystemSets.get("strOdTranScriptCheck")=="N"))
		{
			//1100305 David 1090610 改用Array物件處理
			//if(activeDeptObj.find("受文者[本別!='抄本']").length!=0)
				//TransCript_Check = true;
			var HasScript = arrIssueData.filter(function(o){
					return o.DocType == "抄本";
				})
			if(HasScript && HasScript.length > 0)
				TransCript_Check = true;
		}

		//1100305 David 1090610 改用Array物件處理
		//for (var i = 0 ; i < ndOrgList.length ; i++)
		for (var i = 0 ; i < arrIssueData.length ; i++)
		{
			//1100305 David 1090610 改用Array物件處理
			/*var pIssueType = ndOrgList.eq(i).find("發文方式").text();
			var pFullName = ndOrgList.eq(i).find("正式名稱").text();
			var pOrgNo = jf_DeptTrim(ndOrgList.eq(i).find("機關代碼").text());
			var pDeptNo = jf_DeptTrim(ndOrgList.eq(i).find("單位代碼").text());
			var pSeq = ndOrgList.eq(i).attr("序");
			var pDocType = ndOrgList.eq(i).attr("本別");
			var ndDupOrg = null;
			var ndDupOrgNo = null;
			//配合姓名欄位增加 修改檢核機制
			var pEmpname = (ndOrgList.eq(i).find("姓名").text())?ndOrgList.eq(i).find("姓名").text() : "";*/
			var ndDupOrg = null;
			var ndDupOrgNo = null;
			var pIssueType = arrIssueData[i].IssueType;
			var pFullName = arrIssueData[i].OrgName;
			//1140725	Joe		1140383		新增輸入前檢核正副本稱謂
			var pShowOrgName = arrIssueData[i].OrgNameInEdit;
			var pOrgNo = arrIssueData[i].OrgNo;
			var pDeptNo = arrIssueData[i].UnitNo;
			var pSeq = arrIssueData[i].Seq;
			var pDocType = arrIssueData[i].DocType;
			var pEmpname = arrIssueData[i].EmpName;

			//檢查是否有重覆的受文者
			//0:不警告 1:同本別才警告且抄本不檢查(程式預設值) 2:同本別才警告 3:抄本不檢查 4:均檢查 -->
			
			//重複名稱 或是 重複機關/單位代碼 提示字串內無當前受文者序時，才需經過以下檢核
			//1100305 David 1090610 改單純判斷序號，避免完整錯誤訊息內序號1、序號11視為存在造成異常
			//if(pErrDupName.indexOf(pSeq) == -1)
			if(arrDupName.indexOf(pSeq) == -1)
			{
				switch (gCheckDuplicte.charAt(0))
				{
					case "0":
						break;
					case "1":
						if (pDocType == '抄本')
							ndDupOrg = null;
						else
						{
							//1080521 Zen 1080377 修正受文者編輯子視窗之受文者欄位輸入特定字元後無法儲存之問題
							//ndDupOrg = activeDeptObj.find("受文者[本別='"+pDocType+"']").find("正式名稱:contains("+pFullName+")").filter(function() {return $(this).text() == pFullName;}).parent().find("姓名:contains("+pEmpname+")").filter(function() {return $(this).text() == pEmpname;}).parent();
							//1100305 David 1090610 改由Array物件判斷，避免XML物件重複find耗時
							//ndDupOrg = activeDeptObj.find("受文者[本別='"+pDocType+"']").find("正式名稱:contains('"+pFullName+"')").filter(function() {return $(this).text() == pFullName;}).parent().find("姓名:contains("+pEmpname+")").filter(function() {return $(this).text() == pEmpname;}).parent();
							ndDupOrg = arrIssueData.filter(function(o){
								return o.DocType == pDocType && o.OrgName == pFullName && o.EmpName == pEmpname;
							})
						}
						break;
					case "2":
						//1100305 David 1090610 改由Array物件判斷，避免XML物件重複find耗時
						//ndDupOrg = activeDeptObj.find("受文者[本別='"+pDocType+"']").find("正式名稱:contains("+pFullName+")").filter(function() {return $(this).text() == pFullName;}).parent();
						ndDupOrg = arrIssueData.filter(function(o){
							return o.DocType == pDocType && o.OrgName == pFullName && o.EmpName == pEmpname;
						})
						break;
					case "3":
						if (pDocType == '抄本')
							ndDupOrg = null;
						else
						{
							//1100305 David 1090610 改由Array物件判斷，避免XML物件重複find耗時
							//ndDupOrg = activeDeptObj.find("受文者[本別!='抄本']").find("正式名稱:contains("+pFullName+")").filter(function() {return $(this).text() == pFullName;}).parent().find("姓名:contains("+pEmpname+")").filter(function() {return $(this).text() == pEmpname;}).parent();
							ndDupOrg = arrIssueData.filter(function(o){
								return o.DocType != "抄本" && o.OrgName == pFullName && o.EmpName == pEmpname;
							})
						}
						break;
					case "4":
						//1100305 David 1090610 改由Array物件判斷，避免XML物件重複find耗時
						//ndDupOrg = activeDeptObj.find("受文者").find("正式名稱:contains("+pFullName+")").filter(function() {return $(this).text() == pFullName;}).parent().find("姓名:contains("+pEmpname+")").filter(function() {return $(this).text() == pEmpname;}).parent();
						ndDupOrg = arrIssueData.filter(function(o){
							return o.OrgName == pFullName && o.EmpName == pEmpname;
						})
						break;
				}

				//1100305 David 1090610 因改由Array物件判斷，調整錯誤訊息處理邏輯
				/*if (ndDupOrg!=null && ndDupOrg.length > 1)
				{
					var pDupSeq = new Array();
					for (var IdxDupOrg = 0;IdxDupOrg < ndDupOrg.length ; IdxDupOrg++)
					{
						pDupSeq[IdxDupOrg] = ndDupOrg.eq(IdxDupOrg).attr("序");
					}
					pErrDupName += '\n\r 序'+pDupSeq+' '+pFullName+' 名稱重覆';
				}*/
				if (ndDupOrg!=null && ndDupOrg.length > 1)
				{
					var pDupSeq = new Array();
					for (var IdxDupOrg = 0;IdxDupOrg < ndDupOrg.length ; IdxDupOrg++)
					{
						pDupSeq.push(ndDupOrg[IdxDupOrg].Seq);
						arrDupName.push(ndDupOrg[IdxDupOrg].Seq);
					}
					pErrDupName += '\n\r 序'+pDupSeq+' '+pFullName+' 名稱重覆';
				}
			}
			//1100305 David 1090610 改單純判斷序號，避免完整錯誤訊息內序號1、序號11視為存在造成異常
			//if(pErrDupNo.indexOf(pSeq) == -1)
			if(arrDupOrgNo.indexOf(pSeq) == -1)
			{
				//檢查是否有重覆的機關、單位代碼
				if(pOrgNo !='')//現行受文者無機關代碼則不做此項檢核
				{
					switch (gCheckDuplicte.charAt(1))
					{
						case "0":
							break;
						case "1":
							if (pDocType == '抄本')
								ndDupOrgNo = null;
							else
							{
								//1100305 David 1090610 改由Array物件判斷，避免XML物件重複find耗時
								//ndDupOrgNo = activeDeptObj.find("受文者[本別='"+pDocType+"']").find("機關代碼:contains("+pOrgNo+")").filter(function() {return $(this).text() == pOrgNo;}).parent().find("單位代碼:contains("+pDeptNo+")").filter(function() {return $(this).text() == pDeptNo;}).parent().find("姓名:contains("+pEmpname+")").filter(function() {return $(this).text() == pEmpname;}).parent();
								ndDupOrgNo = arrIssueData.filter(function(o){
									return o.DocType == pDocType && o.OrgNo == pOrgNo && o.UnitNo == pDeptNo && o.EmpName == pEmpname;
								})
							}
							break;
						case "2":
							//1100305 David 1090610 改由Array物件判斷，避免XML物件重複find耗時
							//ndDupOrgNo = ndDupOrgNo = activeDeptObj.find("受文者[本別='"+pDocType+"']").find("機關代碼:contains("+pOrgNo+")").filter(function() {return $(this).text() == pOrgNo;}).parent().find("單位代碼:contains("+pDeptNo+")").filter(function() {return $(this).text() == pDeptNo;}).parent().find("姓名:contains("+pEmpname+")").filter(function() {return $(this).text() == pEmpname;}).parent();
							ndDupOrgNo = arrIssueData.filter(function(o){
								return o.DocType == pDocType && o.OrgNo == pOrgNo && o.UnitNo == pDeptNo && o.EmpName == pEmpname;
							})
							break;
						case "3":
							if (pDocType == '抄本')
								ndDupOrgNo = null;
							else
							{
								//1100305 David 1090610 改由Array物件判斷，避免XML物件重複find耗時
								//ndDupOrgNo = activeDeptObj.find("受文者[本別!='抄本']").find("機關代碼:contains("+pOrgNo+")").filter(function() {return $(this).text() == pOrgNo;}).parent().find("單位代碼:contains("+pDeptNo+")").filter(function() {return $(this).text() == pDeptNo;}).parent().find("姓名:contains("+pEmpname+")").filter(function() {return $(this).text() == pEmpname;}).parent();
								ndDupOrgNo = arrIssueData.filter(function(o){
									return o.DocType == pDocType && o.OrgNo == pOrgNo && o.UnitNo == pDeptNo && o.EmpName == pEmpname;
								})
							}
							break;
						case "4":
							//1100305 David 1090610 改由Array物件判斷，避免XML物件重複find耗時
							//ndDupOrgNo = activeDeptObj.find("受文者").find("機關代碼:contains("+pOrgNo+")").filter(function() {return $(this).text() == pOrgNo;}).parent().find("單位代碼:contains("+pDeptNo+")").filter(function() {return $(this).text() == pDeptNo;}).parent().find("姓名:contains("+pEmpname+")").filter(function() {return $(this).text() == pEmpname;}).parent();
							ndDupOrgNo = arrIssueData.filter(function(o){
								return o.OrgNo == pOrgNo && o.UnitNo == pDeptNo && o.EmpName == pEmpname;
							})
							break;
					}
					//1100305 David 1090610 因改由Array物件判斷，調整錯誤訊息處理邏輯
					/*if (ndDupOrgNo != null && ndDupOrgNo.length > 1)
					{
						var pDupSeq = new Array();
						for (var IdxDupOrg = 0;IdxDupOrg < ndDupOrgNo.length ; IdxDupOrg++)
						{
							pDupSeq[IdxDupOrg] = ndDupOrgNo.eq(IdxDupOrg).attr("序");;
						}
						pErrDupNo += '\n\r 序'+pDupSeq+' 電子交換代碼重覆';
					}*/
					if (ndDupOrgNo!=null && ndDupOrgNo.length > 1)
					{
						var pDupSeq = new Array();
						for (var IdxDupOrg = 0;IdxDupOrg < ndDupOrgNo.length ; IdxDupOrg++)
						{
							pDupSeq.push(ndDupOrgNo[IdxDupOrg].Seq);
							arrDupOrgNo.push(ndDupOrgNo[IdxDupOrg].Seq);
						}
						pErrDupNo += '\n\r 序'+pDupSeq+' 電子交換代碼重覆';
					}
				}
			}

			//1100305 David 1090610 改用Array物件處理
			//var Isinside = ndOrgList.eq(i).find("內部").length==1?ndOrgList.eq(i).find("內部").text():"N";
			//取得是否為海外單位
			//var OverSea = ndOrgList.eq(i).find("海外單位").length==1?ndOrgList.eq(i).find("海外單位").text():"0";
			var Isinside = arrIssueData[i].Inside;
			var OverSea = arrIssueData[i].OverSea;

			if (pIssueType == '電子交換')
			{
				var pAllOrgNo = pOrgNo + pDeptNo;//取完整機關代碼(機關代碼+單位代碼)
				
				if(pAllOrgNo.length != 10 && pAllOrgNo.length != 17 && OverSea != "1")
					pErrList1 += '\n\r 序'+pSeq+' '+pFullName+' 無機關代碼 發文方式不可為電子交換';
			}
			else if (pIssueType == '')
				pErrList2 += '\n\r 序'+pSeq+' '+pFullName+' 發文方式不可為空白';
			//檢核是否可Email發文，及檢核電子郵件欄位
			else if (pIssueType == '電子郵件')
			{
				//1100305 David 1090610 改用Array物件處理
				//var strEmail = ndOrgList.eq(i).find("Email").length==1?ndOrgList.eq(i).find("Email").text():"";
				var strEmail = arrIssueData[i].Email;
				var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
				//1051026 Cloud	判斷DM不為null時自行取得系統參數
				//if(strOdSupportEmail == "I" && Isinside == "N")
				if(((argdm==undefined && strOdSupportEmail == "I") || (argdm!=undefined && theSSO.User.SystemSets.get("OD_SUPPORT_EMAIL") == "I") ) && Isinside == "N")
					pErrList2 += '\n\r 目前僅提供內部受文者使用電子郵件發文，序'+pSeq+' '+pFullName+' 發文方式不可為電子郵件';
				//1051026 Cloud	判斷DM不為null時自行取得系統參數
				//else if(strOdSupportEmail == "O" && Isinside == "Y")
				else if(((argdm==undefined && strOdSupportEmail == "O") || (argdm!=undefined && theSSO.User.SystemSets.get("OD_SUPPORT_EMAIL") == "O")) && Isinside == "Y")
					pErrList2 += '\n\r 目前僅提供外部受文者使用電子郵件發文，序'+pSeq+' '+pFullName+' 發文方式不可為電子郵件';
				else if(strEmail == "")
					pErrList2 += '\n\r 序'+pSeq+' '+pFullName+' 發文方式為電郵時，電子郵件欄位不可為空白';
				
				else if(strEmail.indexOf(";") != -1 && strEmail.indexOf("|CHECK") != -1)
					pErrList2 += '\n\r 序'+pSeq+' '+pFullName+' 有取得兩個以上信箱，請進行篩選';
					
				else if(strEmail.split("@").length > 2)
				{
					if(strEmail.indexOf(";")==-1)
						pErrList2 += '\n\r 序'+pSeq+' '+pFullName+' 有取得兩個以上信箱，請以分號切割';
					else
					{
						var strSplitEmail = strEmail.split(";");
						for(var nOfEmail = 0; nOfEmail<strSplitEmail.length;nOfEmail++)
						{
							if(!emailRule.test(strSplitEmail[nOfEmail]))
							{
								pErrList2 += '\n\r 序'+pSeq+' '+pFullName+' 信箱格式不合規定，請檢查是否有特殊字元';
								break;
							}
						}
					}
				}
				else if(!emailRule.test(strEmail))
				{
					pErrList2 += '\n\r 序'+pSeq+' '+pFullName+' 信箱格式不合規定，請檢查是否有特殊字元';
				}
				if (strEmail.indexOf("<") != -1 || strEmail.indexOf(">") != -1)
				{
					pErrList2 += '\n\r 序'+pSeq+' '+pFullName+' Email欄位不可包含<、>等會有資安風險字元';
				}
				
				if(pErrList2=="" && strEmail.indexOf("|CHECK") != -1)
				{
					//1100305 David 1090610 改用Array物件處理
					//ndOrgList.eq(i).find("Email").text(ndOrgList.eq(i).find("Email").text().split("|")[0]);
					ndOrgList.eq(i).find("Email").text(strEmail.split("|")[0]);
				}
				
			}
			//檢核是否可使用內部電子公布欄發文方式
			//1110225 David 1101481 修正支援考試院使用公佈欄發文方式邏輯
			//else if(pIssueType == '內部電子公布欄' && Isinside == "N")
				//pErrList2 += '\n\r 僅提供內部受文者使用內部電子公布欄發文，序'+pSeq+' '+pFullName+' 發文方式不可為「內部」';
			else if(pIssueType == '內部電子公布欄')
			{
				if(strOrgNickName == "EXAM"){}//考試院不需檢核
				else if(Isinside != "Y")
					pErrList2 += '\n\r 僅提供內部受文者使用電子公布欄發文，序'+pSeq+' '+pFullName+' 發文方式不可為「公布欄」';
			}
			//檢核是否可使用海外發文
			//1141110 David 1141112 海外發文支援外貿使用，調整文字
			//else if(pIssueType == '海外發文')
			else if(pIssueType == gOsIssueTypeSort)
			{
				if(OverSea == "0")
				{
					//1141110 David 1141112 海外發文支援外貿使用，調整文字
					//pErrList2 += '\n\r 序'+pSeq+' '+pFullName+' 不為海外單位，不可使用海外發文方式';
					pErrList2 += '\n\r 序'+pSeq+' '+pFullName+' 不為'+gOsIssueBtName+'單位，不可使用'+gOsIssueTypeSort+'方式';
				}
			}
			//1110225 David 1101481 新增個人專區使用檢核
			else if(pIssueType == '個人專區')
			{
				if(Isinside != "Y")
					pErrList2 += '\n\r 序'+pSeq+' '+pFullName+' 不為內部對象，不可使用個人專區發文方式';
			}

			//檢查郵遞區號
			//1100305 David 1090610 改用Array物件處理
			//var pPostNo = ndOrgList.eq(i).find("郵遞區號").text();
			//if (jf_DeptTrim(pPostNo) == '')
			if (arrIssueData[i].PostNo == '')
			{
				//1110225 David 1101481 修正支援考試院使用公佈欄發文方式邏輯
				//if(pIssueType == '人工傳遞' && gCheckPostNo[0])
				if((pIssueType == '人工傳遞' || pIssueType == '機關間人工交換' || pIssueType == '機關內函件傳遞') && gCheckPostNo[0])
					pErrList3 += '\n\r 序'+pSeq+' '+pFullName+' 郵遞區號不可為空白';
				else if(pIssueType == '郵寄' && gCheckPostNo[1])
					pErrList3 += '\n\r 序'+pSeq+' '+pFullName+' 郵遞區號不可為空白';
				else if(pIssueType == '電子交換' && gCheckPostNo[2])
					pErrList3 += '\n\r 序'+pSeq+' '+pFullName+' 郵遞區號不可為空白';
			}
			//檢查地址
			//1100305 David 1090610 改用Array物件處理
			//var pAddress = ndOrgList.eq(i).find("地址").text();
			//if (jf_DeptTrim(pAddress) == '')
			if (arrIssueData[i].Address == '')
			{
				//1110225 David 1101481 修正支援考試院使用公佈欄發文方式邏輯
				//if(pIssueType == '人工傳遞' && gCheckAddress[0])
				if((pIssueType == '人工傳遞' || pIssueType == '機關間人工交換' || pIssueType == '機關內函件傳遞') && gCheckAddress[0])
					pErrList3 += '\n\r 序'+pSeq+' '+pFullName+' 地址不可為空白';
				else if(pIssueType == '郵寄' && gCheckAddress[1])
					pErrList3 += '\n\r 序'+pSeq+' '+pFullName+' 地址不可為空白';
				else if(pIssueType == '電子交換' && gCheckAddress[2])
					pErrList3 += '\n\r 序'+pSeq+' '+pFullName+' 地址不可為空白';
			}
			//如果參數設為N且受文者不全部為抄本時，忽略抄本的發文方式判斷
			if (pDocType == '抄本' && strOdTranScriptCheck=="N" && TransCript_Check)
				continue;
			
			//檢核發文方式
			for(var iType=0;iType<gIssueSendType.length;iType++)
			{
				//取得按鈕對應iType
				if(gIssueTypeSort[iType] == pIssueType)
				{
					if (bIsPaper && gIssueSendType[iType]!='紙本')
						pErrList1 += '\n\r本文預設為紙本發文 序'+pSeq+' '+pFullName+' 發文方式不應為'+pIssueType;
					else if(pSendType =='電子交換' && pIssueType !='內部電子公布欄' && gIssueSendType[iType]=='電子公布欄')
						pErrList1 += '\n\r本文預設為電子交換 序'+pSeq+' '+pFullName+' 發文方式不應為'+pIssueType;
					
					//新增檢核發文細項方式是否包含電子發文
					if (gIssueSendType[iType]!='紙本')
						bIsHaveEIssue = true;
						
					//檢核發文方式是否與受文者發文方式使用
					if(pSendTypeText == gIssueSendType[iType])
						bIsMatchSendType = true;
						
					//檢核發文方式細項是否與受文者發文方式使用
					if(pSendDetailType == pIssueType)
						bIsMatchSendDetailType = true;
					break;
				}
			}
			
			//1140725	Joe		1140383		新增輸入前檢核正副本稱謂
			if(pFullName != pShowOrgName)
				gIssueCheckMessage += (gIssueCheckMessage != "" ? "、" : "") + pSeq;
		}
		//新增檢核發文細項是否選擇
		//1051026 Cloud	判斷DM為null時才進行
		//if(pSendDetailType == "" && $("#Dept_dlSendDetailType").children().length != 1)
		if(argdm==undefined && pSendDetailType == "" && $("#Dept_dlSendDetailType").children().length != 1)
		{
			pErrList1 += '\n\r請選擇發文方式細項。';
		}

		//新增檢核發文方式是否與受文者發文方式使用
		if(!bIsMatchSendDetailType || !bIsMatchSendType)
			pErrList1 += '\n\r本文預設發文方式與實際發文方式無相符之項目，請重新選擇。';
	}
	pErrList1 += pErrDupName+pErrDupNo+pErrList2+pErrList3;
	if(argdm!=undefined)//受文者清單(PAD)做到以下即可
	{
		if(pErrList1!="")
		return '受文者資訊有下列錯誤 請修正'+pErrList1;
		else
		return "";
	}
		
	if (pErrList1 != "")
	{
		gErrorMessage = '受文者資訊有下列錯誤 請修正'+pErrList1;
		RtnBool = false;
	}
	else
	{
		gErrorMessage ="";
		RtnBool = true;
	
	}
	//檢核是否開啟無法電子交換原因
	if($("#Dept_dlSendType option:selected").text() == "紙本" && gDispatchIssue[0])
	{
		$("#Dept_aCantEIssueReason").css("display","");

		if($("#Dept_dlCantEIssueReason option:selected").val() == "")
		{
			gErrorMessage += "\n\r您選擇此份稿件的發文方式為紙本，請輸入無法電子交換原因!!";
			
			//1081008	Joe		1080339		jQuery升級3.4.1
			// $("#Dept_dlCantEIssueReason").focus();
			$("#Dept_dlCantEIssueReason").trigger("focus");
			RtnBool = false;
		}
	}

	//新增公布欄區塊設定檢核
	if(gTBCombine && gTbReSet)
	{
		if($("#Dept_InsideTB").prop("checked") || $("#Dept_OutsideTB").prop("checked"))
		{
			if($("#Dept_pasteday").val() == "")
			{
				gErrorMessage += "\n\r 請輸入張貼期限!";
				RtnBool = false;
			}
			else
			{
				try
				{
					var PastrDay = $("#Dept_pasteday").val();
					var iDay = PastrDay.toString(10);
				}
				catch(e)
				{
					gErrorMessage += "\n\r 公告天數請輸入數字!";
					RtnBool = false;
				}
			}
		}
	}
	return RtnBool;
}
function dlSendTypeOnChange()
{	
	//發文細項連動
	dlSendDetailTypeChange();
				
	bCkeckBeforeSave = true;
	//檢核是否顯示無法電子交換原因
	//由程式切換時不須進行以下檢核-自動切換完畢後，最後會整個進行檢核
	if(gDispatchIssue[0] && !bIsAutoChangeSendType)
	{
		if($("#Dept_dlSendType option:selected").text() == "紙本")
		{
			//紙本發文，則要求輸入電子交換原因
			if($("#Dept_aCantEIssueReason").css("display").toUpperCase()=="NONE")
			{
				alert("本份文發文方式設定為紙本時，請輸入無法電子交換原因!!");
				$("#Dept_aCantEIssueReason").css("display","");
				$("#Dept_dlCantEIssueReason").css("display","");
					bCkeckBeforeSave = false;//未輸入不可交換原因不儲存
			}
		}
		else if($("#Dept_dlSendType option:selected").text() == "電子交換")
		{
			//海外系統不檢核機關代碼
			if(!fnChkIsAnyCanEIssueBatch() && !gHasOs)
			{
				alert("沒有可電子交換機關，本份文發文設定自動改為紙本，並請輸入無法電子交換原因!!");
				$("#Dept_dlSendType option:eq(0)").prop('selected', true);
				dlSendDetailTypeChange();
				$("#Dept_aCantEIssueReason").css("display","");
				bCkeckBeforeSave = false;//檢核未過不儲存
			}
			else
			{
				//清除無法電子交換原因
				$("#Dept_dlSendType option:eq(1)").prop('selected', true);
				$("#Dept_dlCantEIssueReason").css("display","none");
				$("#Dept_aCantEIssueReason").css("display","none");
			}
		}
		else
		{
			//清除無法電子交換原因
			$("#Dept_dlCantEIssueReason").css("display","none");
			$("#Dept_aCantEIssueReason").css("display","none");
		}
	}
	gjf_SetSendType();
}

//電子發文細項連動
function dlSendDetailTypeChange()
{
	var strSendType = $("#Dept_dlSendType option:selected").text();
	var strSendDetailType = $("#Dept_dlSendDetailType option:selected").text();
	
	$("#Dept_dlSendDetailType").children().remove();
	$("#Dept_dlSendDetailType").append("<OPTION value=''></OPTION>");
	
	
	for(var i=0;i<$("#Dept_H_dlSendDetailType").children().length;i++)
	{
		if(strSendType == $("#Dept_H_dlSendDetailType").children().eq(i).val())
		{
			//1100506 David 1100473 弱掃修正Client Potential XSS
			//$("#Dept_dlSendDetailType").append("<OPTION value='"+strSendType+"'>"+$("#Dept_H_dlSendDetailType").children().eq(i).text()+"</OPTION>");
			//1100922 David 1100991 弱掃修正Client Potential XSS
			//$("#Dept_dlSendDetailType").append("<OPTION value='"+HtmlEncode(strSendType)+"'>"+$("#Dept_H_dlSendDetailType").children().eq(i).text()+"</OPTION>");
			var strSendDetailType = $("#Dept_H_dlSendDetailType").children().eq(i).text();
			$("#Dept_dlSendDetailType").append("<OPTION value='"+HtmlEncode(strSendType)+"'>"+HtmlEncode(strSendDetailType)+"</OPTION>");
		}
	}
	if($("#Dept_dlSendDetailType").children().length==1)
		$("#Dept_dlSendDetailType").css("display","none");
	else
	{
		
		$("#Dept_dlSendDetailType").css("display","");
		
		for(var i = 0; i < $("#Dept_dlSendDetailType").children().length; i++)
		{
			if(strSendDetailType == $("#Dept_dlSendDetailType").children().eq(i).text())
			{
				$("#Dept_dlSendDetailType option:eq("+i+")").prop('selected', true);
				break;
			}
		}
	}
}
//整份為電子發文時-檢核是否有任何可以電子交換的公文
function fnChkIsAnyCanEIssueBatch()
{
	var checkObj = activeDept.find("受文者");
	var RtnBool = false;
	for (var i = 0 ; i < checkObj.length ; i++)
	{
		RtnBool = fnChkIsAnyCanEIssue(checkObj.eq(i));
		if(RtnBool)
			break;
	}
	return RtnBool;
}
//逐筆檢核是否可以使用電子發文
function fnChkIsAnyCanEIssue(argOrg)
{
	var RtnBool = false;
	var FepStatus = "";
	//1070926	Cloud	修正，電郵應可視為電子交換卻被阻擋問題參考單號(1030979)
	//-argOrg.find("電子交換現況").text()!="" 為空白則為不存在資料庫故移除檢核
	//var pIssueType = argOrg.find("發文方式");
	//直接判斷XML內電子交換現況，沒有TAG才call ws
	//if(argOrg.find("電子交換現況").text().length!=0 && argOrg.find("電子交換現況").text()!="")
	var pIssueType = argOrg.find("發文方式").text();
	if(argOrg.find("電子交換現況").text().length!=0)
	{
		FepStatus = argOrg.find("電子交換現況").text();
	}
	else
	{
		//1130813 David 1130313 支援離線版invokeJSON改為非同步行為，調整補上交換現況的時機點
		/*var params = new SOAPClientParameters();
		if(argOrg.find("SysId").text()!="")
		{
			params.add('argSYSID', argOrg.find("SysId").text());
			params.add('OrgNo', theUserInfo.OrgID);
			params.add('DeptNo', theUserInfo.DepartID);
			params.add('UserID', theUserInfo.UserID);
			params.add('Artifact', theUserInfo.Artifact);
			SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetOrgbySYSID", params, false,function(r)
			{
				FepStatus = r.value.FepStatus[0];
			});
		}
		else
		{
			params.add('argFullName', argOrg.find("正式名稱").text());
			params.add('OrgNo', theUserInfo.OrgID);
			params.add('DeptNo', theUserInfo.DepartID);
			params.add('UserID', theUserInfo.UserID);
			params.add('Artifact', theUserInfo.Artifact);
			SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetOrgInfo4AD", params, false,function(r)
			{
				if(r.value.FepStatus!=null)
				FepStatus = r.value.FepStatus[0];
			});
		}*/
	}
	
	if(FepStatus == "T")//"電子交換"
		RtnBool = true;
	else
	{
		//1110519 David 1101481 新增個人專區判斷
		//if(pIssueType == "內部電子公布欄"|| pIssueType=="電子郵件" || pIssueType=="電子交換")
		if(pIssueType == "內部電子公布欄"|| pIssueType=="電子郵件" || pIssueType=="電子交換" || pIssueType=="個人專區")
			RtnBool = true;
	}
	return RtnBool;
}
//1051108	Cloud	修正本別、發文方式、附件異動後直接離開不會提醒需儲存bug
function fnSetTextOfDeptElement(objElement,textValue)
{
	for(var i=0,maxIdx = objElement.length;i<maxIdx;i++){
		var u = objElement.get(i);
		if("text" in u)
			u.text = textValue;
		else
			u.textContent = textValue;
	}
	gChangeCnt++;
	return objElement;	//把傳進來的物件再回傳出去，方便再接著呼叫其他JQuery功能
}
//切換發文方式連動發文方式細項，儲存時會自動切換成至少符合一個受文者的發文方式

//1080312 David 1080089 新增異動分繕表資訊記錄物件處理
function setMailMergeModify(argType, argDeptSeqNo, argDeptFullName, argDeptName, argDeptEmpName)
{
	/*
	argType = 1：清除附件分繕資訊
	argType = 2：異動分繕表受文者姓名或全銜
	*/
	var AnotherType = "1";
	if(argType == "1")
		AnotherType = "2";

	//1081003 David 1080869 因IE不支援array.find()，改用for取得處理
	/*var HasTargetObj = gMailMergeModify.find(function(item){
		return (item.Type == argType && item.DeptSeqNo == argDeptSeqNo);
	});*/
	var HasTargetObj = arrayFind(gMailMergeModify, function(item) {
		return (item.Type == argType && item.DeptSeqNo == argDeptSeqNo);
	});

	if(HasTargetObj == undefined)//未紀錄過要清除或異動時，才進行紀錄
	{
		//1081003 David 1080869 因IE不支援array.find()，改用for取得處理
		/*var HasAnotherObj = gMailMergeModify.find(function(item){
			return (item.Type == AnotherType && item.DeptSeqNo == argDeptSeqNo);
		});*/
		var HasAnotherObj = arrayFind(gMailMergeModify, function(item) {
			return (item.Type == AnotherType && item.DeptSeqNo == argDeptSeqNo);
		});

		if(HasAnotherObj != undefined)//另一類型有記錄過時，依該紀錄的分繕INDEX紀錄
		{
			var MailMergeObj ={
				"Type": argType
				,"DeptSeqNo": argDeptSeqNo
				,"MailMergeIndex": HasAnotherObj.MailMergeIndex
			}

			gMailMergeModify.push(MailMergeObj);
		}
		else
		{
			//未記錄過要異動時，至分繕表取得的INDEX紀錄
			var ChangeNameObj ={
				"name": argDeptFullName
				,"fullName": argDeptName
				,"userName": argDeptEmpName
				,"sn": argDeptSeqNo
			}
			var ChangeIndex = g_mailMerge.find2("受文者", ChangeNameObj);
			if(ChangeIndex != -1)
			{
				var MailMergeObj = {
					"Type" : argType
					,"DeptSeqNo" : argDeptSeqNo
					,"MailMergeIndex" : ChangeIndex
				}

				gMailMergeModify.push(MailMergeObj);
			}
		}
	}
}
//1081003 David 1080869 新增For迴圈處理array內取的對應項目
function arrayFind(arr, callback) {
	for (var i = 0; i < arr.length; i++)
	{
		var match = callback(arr[i]);
		if (match)
			return arr[i];
	}
}

//1100525 David 1100495 紀錄刪除的受文者資訊
function setMailMergeDelete(argDeptSeqNo, argDeptFullName, argDeptName, argDeptEmpName)
{
	var DeleteObj ={
		"name": argDeptFullName
		,"fullName": argDeptName
		,"userName": argDeptEmpName
		,"sn": argDeptSeqNo
	}

	//存在於分繕表中再紀錄
	var HasIndex = g_mailMerge.find2("受文者", DeleteObj);
	if(HasIndex != -1)
		gMailMergeDelete.push(DeleteObj);
}

//1110225 David 1101481 新增發文方式選單內容
function fnSetIssueList(argObj,argValueObj,argID,argTagName)
{
	var arrIssueList = new Array();
	for(let i = 0 ; i < argObj.length ; i++)
	{
		let strIssueType = argObj[i];
		if(!arrIssueList.includes(strIssueType))
			arrIssueList.push(strIssueType);
	}

	var argIdx = argID.split("_")[2];
	let strlistAreaId = "#Dept_IssueTypeList_" + argIdx;
	argIdx++;

	var strDisWord = "";
	var value = $("#"+argID).val();

	//取得是否為內部單位or人員
	var IsInside = activeDept.find("受文者[序='"+argIdx+"']").find("內部").text();

	if(strOrgNickName != "EXAM" && (strHasTB != 1 || IsInside != "Y"))
		strDisWord += "公布欄 ";

	//支援電子郵件發文 
	if(strOdSupportEmail=="N" || (strOdSupportEmail == "I" && IsInside == "N") || (strOdSupportEmail == "O" && IsInside == "Y"))
		strDisWord += "電子郵件 ";

	if(pSendType=="紙本公文")
	{
		for(var iType=0;iType<gIssueBt.length;iType++)
		{
			if(gIssueSendType[iType] != "紙本")
				strDisWord += gIssueBt[iType] + " ";
		}
	}

	if(gHasOs!="Y")
	{
		//1141110 David 1141112 海外發文支援外貿使用，調整文字
		//strDisWord += "海外 ";
		strDisWord += gOsIssueBtName + " ";
	}
	else
	{
		var IsOverSea = activeDept.find("受文者[序='"+argIdx+"']").find("海外單位").text();
		if(IsOverSea == "0" || IsOverSea == "")
		{
			//1141110 David 1141112 海外發文支援外貿使用，調整文字
			//strDisWord += "海外 ";
			strDisWord += gOsIssueBtName + " ";
		}
	}
	if(activeDept.find("受文者[序='"+argIdx+"']").find("機關代碼").text()=="")
	{
		strDisWord += "電子交換 ";
	}

	//新增依電子交換現況判斷能否使用電子發文方式
	if(activeDept.find("受文者[序='"+argIdx+"']").find("電子交換現況").length != 0 && activeDept.find("受文者[序='"+argIdx+"']").find("電子交換現況").text() != "T")
		strDisWord += "電子交換 ";

	//依參數及受文者內部單位代碼判斷能否使用個人專區發文方式
	if(!bUsePersonal || activeDept.find("受文者[序='"+argIdx+"']").find("內部單位代碼").text() == "")
		strDisWord += "個人專區 ";
	//1120418 David 新增判斷稿件可否使用電子交換
	if(gNoElecDraftType.includes(gDraftType))
		strDisWord += "電子交換 ";

	//過濾不可用的選項
	for( let i = arrIssueList.length-1; i >= 0; i--){ 
		if (strDisWord.indexOf(arrIssueList[i]) !== -1)
			arrIssueList.splice(i, 1);
	}

	//1110324 David 依目前物件位置判斷動態選單方向
	let iListNeedHeight = arrIssueList.length * 35;//選單需要的高度
	let iScreenHeight = parseInt($('#simplemodal-container')[0].style.height);//目前畫面高度
	let iTargetLocation = $("#"+argID)[0].offsetTop;//目前點選位置
	let cusPosition = {my: 'top', at: 'bottom'};
	if(iScreenHeight - iTargetLocation < iListNeedHeight)//畫面高度減目前點選位置小於選單需要的高度，改變選單方向
	{
		cusPosition.my='bottom';
		cusPosition.at='top';
	}

	//設定動態選單
	$("#" + argID).autocomplete({
		source:arrIssueList
		,minLength: 0
		,appendTo:strlistAreaId
		,select: function(event,ui){
			fnSetTextOfDeptElement(activeDept.find("受文者[序='"+argIdx+"']").find(argTagName),fnChangeIssusTypeShowToXML(ui.item.value));
		}
		,position: cusPosition//1110324 David 設定動態選單屬性

	}).autocomplete( "search", "" );
	
	$(strlistAreaId).find('ul').css("overflow","hidden");
}

//發文按鈕顯示轉換XML紀錄資料
function fnChangeIssusTypeShowToXML(argShowIssusType)
{
	for(var i=0;i<gIssueBt.length;i++)
	{
		if(gIssueBt[i]==argShowIssusType)
		{
			return gIssueTypeSort[i];
			break;
		}
	}
}

//1130813 David 1130313 初始化時檢核及補上受文者交換現況
function fnCheckReceiverFepStatus()
{
	var ReceiverList = activeDept.find("受文者");
	if(ReceiverList.length > 0)
	{
		function fnCheckEachReceiver(iReceiver)
		{
			if(iReceiver < ReceiverList.length)
			{
				var ReceiverObj = ReceiverList.eq(iReceiver);
				if(!ReceiverObj.attr("交換現況"))
				{
					var params = new SOAPClientParameters();
					if(ReceiverObj.find("SYSID").text()!="")
					{
						params.add('argSYSID', ReceiverObj.find("SYSID").text());
						params.add('OrgNo', theUserInfo.OrgID);
						params.add('DeptNo', theUserInfo.DepartID);
						params.add('UserID', theUserInfo.UserID);
						params.add('Artifact', theUserInfo.Artifact);
						SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetOrgbySYSID", params, true,function(r)
						{
							if(r.value.FepStatus!=null)
								ReceiverObj.attr("交換現況",r.value.FepStatus);
							else
								ReceiverObj.attr("交換現況","0");

							fnCheckEachReceiver(iReceiver+1);
						});
					}
					else
					{
						params.add('argFullName', ReceiverObj.find("正式名稱").text());
						params.add('OrgNo', theUserInfo.OrgID);
						params.add('DeptNo', theUserInfo.DepartID);
						params.add('UserID', theUserInfo.UserID);
						params.add('Artifact', theUserInfo.Artifact);
						SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetOrgInfo4AD", params, true,function(r)
						{
							if(r.value.FepStatus!=null)
								ReceiverObj.attr("交換現況",r.value.FepStatus);
							else
								ReceiverObj.attr("交換現況","0");

							fnCheckEachReceiver(iReceiver+1);
						});
					}
				}
			}
		}
		fnCheckEachReceiver(0);
	}
}

/*************************************************各視窗共用函式*******************************************************************/
(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("MS-Dept.js").finish();
})();
