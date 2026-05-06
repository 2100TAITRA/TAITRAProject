/*	
DATE	SA		PRG		MSG_NO			DESC	
950611 	Stella	Jeff	0950706 		修正若輸入之來文機關無來文代碼時，應清空機關代號名稱右方欄位的值
950692	Stella	Jeff	0950719			修正右鍵分辦公文時會發生錯誤訊息(業務列別錯誤造成)
0950902	Caesar	Charles	955011			速別欄位會影響DUE_DATE所以也必須鎖定
0950909	Stella	Jeff	950237			依承辦單位帶出不同之業務類別
0950911	Stella	Stella	950407			提供瀏覽線上簽核公文電子檔功能
0950919	Stella	Charles	955079			二層式登記桌架構修改
0951120 Stella  Jeff	951189			變更檢查來文機關與來文字號之順序至最開始,並且修改檢核線上簽核公文是否設定電子檔部份訊息
0951120 Stella  Jeff    951187			中央需求：二層式登記桌模式希望將部門及二級單位置於同一下拉式選單
0951128	Stella	David	950904			儲存或傳送前針對密以上等及進行必填欄位之檢核
0951221 Stella  Zoey    951351          辦理天數計算單位LT_UOM儲存錯誤之修改(ODT130.aspx, ODT130.aspx.cs, ODT130.js)
0960123 Stella	Stella	013112			來文登錄作業整合公佈欄部份
0960124	Stella	Stella	000170			電子交換之公文帶回ODT130時，會將來文者的機關代碼帶回ODT130來文者欄位，系統並未檢核
0960207 Stella	Jeff	951204			藥檢局-修改業務類別切換帶不出辦理階段的問題
0960402	Caesar	Caesar	無				勞委會-傳送後,時常未送出[改為自ODT130 CS中,呼叫ODT130WS.ExecXmlSql()函式,js中不呼叫
0960404 Stella  Zoey	000457			來文不檢查來文機關，以來文字號為主
0960425	Stella	Charles	000605			(中央)承辦單位下拉選項同時顯示一二級單位時，若所選承辦單位與使用者相同，才需要選承辦人
0960528			Leo     000995			新增檢核物件字串長度的 function
0960607	Stella	Cola	000996			修正開啟之子視窗大小
0960608	--		Charles	--				(中企處)一般公文限期辦畢時，選擇上級機關交辦，則連動選擇業務類別為部收文
0960702 Stella  Matte   000994			上級收文號若不為空白，則公文來源自動帶出上級機關交辦
0970716	--		Cola	001193			(蒙藏委員會)取消呼叫GetsumType()於fnAfterPageLoad(), 避免限辦日期被清空
0960816         Zoey    001442、001461	未在orgmain之重覆來文未檢查，刪除重覆來文警示訊息之[確定]鈕
0960702 Stella  Matte   001666			公文來源選擇上級機關交辦時，業務類別帶出上級交辦
0961120 Stella  Yvonne  001600			拿掉解密別
0961122	Stella	Stella	001205			修正日期格式不正確之訊息
0961129 Stella  Yvonne	0960356			儲存/傳送前檢查來文日期是否大於收文日期
0961222 Stella	Yvonne	000267			提供系統參數OD_ODT130_OPENSUBJECT預設開啟時是否展開並列案由、其他案由
0970214	Stella	Yvonne	0970179			公文文號含有空白時，要去空白
0970213	Stella	Yvonne	0970139			(環保局)以業務類別連動公文性質
0970218	Stella	Yvonne	0970117			(環保局)結合條碼機列印
0970307	Stella	Yvonne	0970259			(環保局)公文來源為上級機關交辦時無法列印條碼
0970325	Stella	Yvonne	951231			增加欄位-郵件號碼，以系統參數ED_MAILRCV_SHOW控制是否顯示
0970528	Stella	Yvonne	0970447			修正限辦日期為灰底卻可輸入的問題
0970530	Stella	Yvonne	0970428			(環保局)修改業務類別連動之邏輯
0970605	Stella	Yvonne	0970450			電子來文帶回時，欲設將公文性質選為一般公文，業務類別為一般公文下的不分類
0970723	Stella	Yvonne	0970762			修正公文來源為上級機關交辦，傳送後FOCUS回上級收文日期的問題
0970814	Stella	Yvonne	0970687			配合RPD21新增單位收文通知修改
0970930	Stella	Yvonne	0970903			修正環保局條碼上的單位與系統紀錄之單位不同之問題
0970930	Stella	Yvonne	0970962			配合OCR機制修改ODT130收文方式(刷入文號就帶出對應公文基資)
0971126	Stella	Yvonne	0970993			(領務局)未實施線上簽核時，線上簽核公文選項不可選；取消自動要號(公文文號)
0980219	Stella	Iris	0980129			增加檢核開啟之公文為人民申請案件併案陳核之子文時鎖定公文性質相關欄位
0980831	Stella	David	0980445			增加各日期欄位於儲存/傳送前，若有值需進行日期格式檢核
0981127	Stella	David	0980597			開啟申請展期或已展期公文時若調整速別、性質、業務類別，儲存時顯示提示視窗
0990127	Stella	David	0990019			傳入WS fnGetFullLeadTime()時，應傳入正確辦理天數
0990301	Stella	David	0990022			修改重複來文提示視窗內容
0990310	Stella	David	0990021			(桃環保)與新的條碼機整合
0990729	------	David	0990318			1.新增日期欄位小日曆，2.新增收文日期連動處理
0990820	------	David	0990438			1.新增收文時間欄位，2.來源別欄位資料來源修改
0990826	------	David	0990312			1.來文機關欄位改為自動完成元件，2.來文字欄位改為ComboBox
0990923	------	David	0990435			新增疾管局條碼列印功能
0991027	------	David	-------			新增附件註記查詢功能
0991102	------	Yvonne	0990556			支援收入立委質詢案件轉入之公文
0991119	Zola	Yvonne	0990695			呼叫GetWorkDate、GetWorkDays時，支援連休3日Mode之處理
0991129	------	David	-------			新增移文原因功能鍵
0991212	------	Yvonne	-------			CDC由選單開啟EDT190做移文註記(因為要輸入移文原因，但目前由本作業開啟EDT190儲存關閉後，本作業移文選項未被連動勾選，導致資料誤存)
0991228	David	Bill	0991055			因應CDC現場要求承辦人的下拉選單依照姓名筆劃排序
1000225 ------	David	-------			依系統參數判斷是否啟用來源別「電子郵件」「人民陳情」選項
1000321 David 	Zola	1000299			於ODT130選取文別為開會通知單時，自動on change 公文性質為一般公文，業務類別為開會通知單。
1000329	------	David	-------			修正時效統計帶出說明
1001128	David	David	1000973			配合FDA線上申辦系統整合，新增功能鍵「線上申辦」，並修改相關程式行為
1000403 David	Zola	1000035 		允許儲存沒有機關代碼的來文機關預設來文字與主旨內容
1000419	David	Zola	1000330			【儲存】或【傳送】時，檢核當密等為密以上，如解密條件為空，彈出提醒訊息：『密件公文未填入解密條件，是否繼續儲存(或傳送)？』。
1000613 David	David	1000393			修正來文字ComboBox欄位初始時，異動業務類別欄位SelectIndex，造成傳送時業務類別錯誤
1001018 David	kevin	1000602			新增來源別註記，以JS連動選擇舊有隱藏來源別
1001215	David	Jeff	1000929			機關名稱欄位址只顯示機關名稱(過濾EMAIL)
1010103 David	kevin	1000976			(標檢局)新增儲存意見信箱案件主檔 
1010301 David	kevin	1000602			因應OD_RCVTYPE_EXTRA參數取消，調整判斷
1010424	Kevin	Kevin	1010253			新增意見信箱自動帶人民陳情案件
1010426	Kevin	Ivory	1010305			修正業務類別起算日期原則為系統計算可以修改時,起算日期應可以修改
1010528	David	Kevin	1010511			立委質詢帶入DOC_TEMP業務類別
1010713	Kevin	Kevin	1010608			限辦日期計算時，補充天數跟原始可辦理天數分開計算
1010813	David	David	1000761,1000762	由ODT134帶回時，如DOC_TEMP.B_TYPE_NO有值，預設帶出對應的公文性質及業務類別
1020322	David	Jagle	1020042			MERGE 改用系統參數FLOW_TYPE_P作為紙本作業流程登記桌架構之設定、修改傳送檢核時增加判斷簽核類型
1020329	David	Kevin 	1011032			修正ODT130傳送後承辦單位為空白問題
1020412	David	Kevin	1020167			修正儲存時未檢核承辦單位問題
1020503	David	Jagle	1011012			增加帶回來源註記
1020520	David	Jagle	1020412			修正自ODT134帶回開會通知單的公文時，開會日期未啟用的問題
1020723	David	David	1000751			配合組改調整，將判斷機關代碼行為改用隱藏欄位提供的OrgNickName判斷
1020826	David	David	1020651			判斷重複收文WS函式新增傳入參數，用來區分總收收文還是單位收文
1021001	Kevin	David	1010980			(Merge)公文轉專案管制清除展期紀錄
1021122	David	David	1020928			修改承辦單位檢核回傳值，避免檢核錯誤
1021122	David	David	1020921			「時效統計」欄顯位示內容來源調整
1030514	David	David	1020724			支援由ODT134帶回ASSIGN_DOC_NO(上級收文號)、ASSIGN_RCV_DATE(上級收文日期)資料
1030703	David	David	1030365			新增紀錄業務類別之限辦日期計算邏輯是否需順延至工作日，如是計算完限辦日期須再呼叫ODLIB.asmx.GetUnHoliday()
1030716	David	David	1030406			當環境變數GET_BTYPENO_BY_OU設定為Y時，不論總收或登記桌，依公文性質及承辦單位篩選出可使用的業務類別
1031002	David	Eric	1030714			修改使用者擁有OD_ODT134_AUTOOPEN權力在開啟、傳送、儲存、取消後自動開啟ODT134
1031024	David	Eric	1030786			修正承辦單位異動時業務類別選單內容取得和判斷
1031028	Leslie	Kenny	1030836			配合SSL修改傳入元件之URL
1031112	Leslie	Kevin_C	1020726	        於__doPostBack前加上IsServerHandling=true,避免重複執行
1031127 David	Eric	1030160			新增功能鍵陳核會稿功能以及增加處理回傳ODT138資訊
1031222 David	Eric	1030893			新增一邏輯判斷來文機關、來文號、來文字、來文日期是否相同，提示重覆訊息
1031226 Cloud   --      --              修正密件子視窗查詢，帶回值不會自動開啟問題
1040119	David	Eric	1040033			支援由ODT134帶回MOIGROUP_CASE_NO(內政部人團系統案號)資料以及新增呼叫人團系統WS
1040226	David	David	1040117			依限辦日期計算辦理天數時，須扣除補充天數(展期+補件+外陳外會天數)
1040304 David   Eric    --              修改使用高榮、中榮、北榮開啟ODT134時顯示全畫面
1040303	David	David	1040033			呼叫人團系統WS改由Server端叫用
1040521	David	David	1040436			修正由ODT134帶回設定業務類別時透過SetCbSelectedByValue處理，避免設定不完全導致記錄錯誤
1040608 David	Eric	1040243			修改實體附件明細欄位，增加下拉選單連動可供拉取選擇附件名稱
1040617	Leslie 	Gabby	1040324			增加WebFileIO錯誤訊息處理
1040624	David	David	1040471			依環境變數設定判斷線上簽核公文是否可為密等公文
1040630	David	David	1040517			因應104法規新增速別代碼，速別處理配合調整
1040728	David	David	1030160			新增註冊隱藏欄位供外陳外會公文傳送顯示訊息
1040827	David	David	1040695			(航港局)新增回覆公文按鈕
1041217	David	David	1040937			修改由ODT138回傳處理邏輯
1041222	David	David	1041030			修正當無可用之業務類別時重複跳出檢核未過訊息
1041223	David	David	1040838			(104年法規)新增重複來文處理
1050202	David	David	1040937			調整ODT138帶回ODT130資料方式
1050219	David	David	1040836			切換公文性質為「一般公文限期辦畢」時，速別自動調整到「4：」
1050301	David	David	1050064			修正HtmlEncode編碼後字串未經處理由ODT134回傳至ODT130導致IIS判斷危險字元問題
1050321	David	David	1040937			調整二次外陳外會新增模式傳送判斷
1050506	David	David	-------			修正帶入外陳外會公文資訊時帶回文別
1050706 David   David   1050087         二代修改
1050817	Leslie	Leslie	1050087			二代升級，變更UNV回傳格式為JSON字串，供後續瀏覽模組使用，修改回傳格式
1050817 Kevin   Zen     1050700         弱掃XSS修正
1050927	David	David	1050087			電子收文明細改開啟EDI011
1051205	David	David	1050087			二代修改，調整setAttribute方式
1051205	David	David	1051175			(鐵公局)新增顯示案號資訊
1051223	David	David	1050087			二代修改，調整背景顏色設定方式
1060118	David	David	1050087			新增二代來文機關選單功能(參考MS-ModeOrg.js)
1060313	David	David	-------			儲存/傳送檢核未過時，需補上Page_BlockSubmit = true
1060313	David	David	-------			二代來文機關選單，如選單組完單畫面FACOS已不在欄位上，不組出選單
1060509	David	David	1060095			(港務公司)二次外陳外會邏輯判斷修正
1061110	Kevin	Kevin_C	1061070			弱掃Client Potential Code Injection修正
1061211	David	David	1060881			(FDA)衛服部移文功能
1061225	David	David	1061270			由DOC_TEMP帶回資料時，如系統參數OD_ODT130_DOC_SOURCE設定為1且有上級收文號資料，公文來源預設為上級機關交辦
1070118	David	David	-------			配合GetDictInfo()新增參數調整，避免無法產生來文機關選單
1070314	David	Kevin_C	1070058			一併修正以案管制之錯字
1070402	David	Kevin_C	1061322			高榮客製化功能，當機關欄不為空白時，來文字或來文號任一欄位不可為空白
1070506	David	Kevin_C	1070242			增加文號檢核及重複收文檢核
1070619	David	David	1070063			由DOC_TEMP帶回資料時，新增紀錄DOCUMENT_ID資料
1070717	David	Kevin_C	1070242			增加檢核受文者名稱
1070824	Kevin	Joe		1070678			弱掃修正Hardcoded Absolute Path
1071001	Leslie	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
1071116	David	David	-------			切換公文性質為非「一般公文限期辦畢」，且速別為「4：」時，將速別調整回普通件
1080122 Kevin   Kevin   1080049         弱掃修正Reflected XSS Specific Clients
1080214	Kevin	Joe		1080179			弱掃修正Hardcoded Absolute Path、Client Potential XSS
1080528	Kevin	Kevin	1080410			鐵道局內部行文新增客製化邏輯
1080905 Kevin	Kevin	1080339			JQuery升級調整寫法
1081115	Kevin	Kevin	1080987			修正編碼不同造成帶回ODT130回亂碼的問題
1090628 Kevin   Kevin   1090407         業務類別時效計算方式不依速別計算時，才預帶速別「4：」
1090814	Kevin   Zen   	1090535         調整來文機關選單支援四十字
1091124 Kevin 	Kevin	1090850			業務類別區分單位新增支援二級單位設定
1100518	David	David	1090821			支援外陳外會驗證功能
1101126	Kevin   Zen   	1101292         修正新增模式多次點擊儲存產生重複待傳送公文之問題
1101126 Kevin   Zen   	1100948         修正限辦日期設為假日時未自動帶為下個工作日之問題
1110103 Kevin   Zen     1101292         修正多次點擊重複PostBack之問題
1110325	David	David	1101534			考試院訴願會預設訴願公文性質
1110331 Kevin   Kevin   1100324         修正公文性質排序變更問題
1110420 Kevin   Kevin   1110021         信保收文新增統一編號介接
1110830 Kecin   Zen     考試院序237     修正公文來源為會銜時速別鎖定最速件之問題
1110913 Kevin   Zen     1110981         GIP系統WS多傳入文號
1111214 Kevin   Kevin   1111398         新增電子來文WebHR介接
1111219	David	David	1111366			調整開會通知檢核邏輯，避免開會日期與收文日期同天，且設定為收文隔天起算時檢核異常
1111219 Kevin	Kevin	序43.44			銓審案預帶主旨、預開啟子視窗、修正134帶回後切換承辦單位未連動承辦人問題
1111229 Kevin	Kevin	1110880			銓敘部變更為任審介接
1120118	Kevin	David	-------			(銓敘部問題彙整表序111)1.來文任審資料有取得報送送別時一律紀錄。2.取來文任審資料發生錯誤時清空報送案別及任審資訊
1120216	Kevin	Kevin	銓敘部145		修正未帶出案件編號問題
1120216	Kevin	Kevin	銓敘部120		新增應解密日期
1120330	David	David	銓敘部190		調整由TA帶回任審資訊後，有個人資料時才需設定目前資料欄位
1120424 Kevin   Kevin   1120214			標檢局Merge[1110981]
1120505 Kevin 	Kevin	1111280			新增儲存前實體附件數量檢核
1120505 Kevin   Kevin   1120350         新增影像匯入功能
1120522 Kevin 	Kevin	銓敘部36.37 	電子文不預設開啟任審子視窗、調整來文機關、字號欄位寬度
1120707 Kevin 	Kevin	屏東87			修正條碼預印未正確檢核問題
1120720 Kevin   Kevin   問題112         修正開啟公文時業務類別不正確問題
1120720 Kevin   Kevin   問題118         參照1000859功能，新增模式下取消改為清除鍵
1120816 Kevin   Kevin   屏東146         修正儲存時未檢核預印條碼問題
1120927 Kevin   Kevin   問題243			修正組改後無法正確判斷內部行文問題
1130118 Kevin   Kevin   1120896			修正業務類別支援二級單位設定異常
1130124 Kevin	Zen 	1120978			調整共用題號區間時儲存前檢核文號邏輯
1130304 Kevin	Zen 	1120978			修正未使用題號區間但啟用列印條碼等同要號時衍生之問題
1130614 Kevin	Zen 	1130386			公文性質為一般公文限期辦畢時鎖定速別為空
1130626 Kevin	Kevin	1130291			支援AI預設承辦單位
1130814 Kevin	Kevin	1130291			可能有信心值沒有預判單位，需可開相似公文
1130830 Kevin	Kevin	1130291			修正從子視窗帶回無法觸發信心顏色變換問題
1130819 Kevin   Kevin   1130651         立委諮詢案件以來文日期進行為起算日期
1140207 Kevin   Zen     1140051         修正未使用題號區間但啟用列印條碼等同要號時與ODT120同時使用衍生文號檢核異常之問題
1140610 Kevin	Kevin	1140382			支援介接分文、影像匯入功能，Merge[1120350]
1140610 Kevin	Kevin	1140166			支援AI分文功能，Merge[1130291]
1140917 Kevin   Zen     1140166         修正由ODT134帶回公文後首次切換一級承辦時二級承辦單位選單未更新之問題
1140917 Kevin   Zen     1140166         修正輔助檢索按鈕因AI推測單位為空時顯示位置異常之問題
1141110 Kevin   Kevin   1141112         新增駐外單位收文
1141118 Kevin	Zen     陸委會序350		修正ODT134帶回來文後多帶回案件編號之問題
1141127	David	David	序384			(1141112衍伸需求)外貿駐外收文，可檢視駐外上傳檔案
1141223 Leslie  Joeko   1141162         修改檔案格式檢核方式，新增檔案大小檢核
1150211 Kevin	Zen     外貿序37        MP開啟駐外收文時支援直接送銷號
*/
var CurrOrgIdObj;
var CurrOrgNameObj;
//0990826 David 0990312 紀錄自動完成元件物件
var CurrAutoObj;
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1071001	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
AjaxPro.Request.prototype.timeout = function ()
{
    try
    {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false)
        {
            this.abort();
        } else
        {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error)
    {

    }
    finally
    {

    }
}
var wsGetWorkDateID;
var wsGetCaseTargetDateID;
var wsCallHandleSendXML;
var iCreateTempUnvFile;
var PEOPLE_CASE_INDEX = 5; //人民陳情案件在公文性質DropDownList中index
//0960124 Stella新增全域變數判斷來文機關資訊是否已觸發onblur事件
var bCheckedFromOrg1 = false;
var bCheckedFromOrg2 = false;
var bCheckedFromOrg3 = false;
var tempSubject = "";//紀錄主旨是否已被異動for業務類別切換判斷用
var tempSubject2 = "";//紀錄主旨是否已被異動for業務類別切換判斷用
var tempDept = "";//紀錄單位是否已被異動for業務類別切換判斷用
var tempDept2 = "";//紀錄單位是否已被異動for業務類別切換判斷用
var bChildWin = false;//由ODT134、136、137帶回公文基資時,切換業務類別不要連動帶

//1111229 Kevin 1110880 變更為任審介接
var strLastFromOrgTaInfo = '';

//95.10.19 950904 David
var IsCheckSec = false;
if (document.all["txSecCheckEnv"].value == "Y")
    IsCheckSec = true;

//1050706 David 1050087 二代公文修改
//document.all.tbTool.onbuttonclick=jf_ToolBarHandle;

function ShowMsg()
{
    //1050706 David 1050087 二代公文修改
    /*if (document.all["ValidationSummary1"].innerText != "")
        alert(document.all["ValidationSummary1"].innerText);*/
    jf_ShowValidator();
}

//1050706 David 1050087 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    if (jf_IsTimeOut())
    {
        close();
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        //1031002 Eric 1030714  新增明細按鈕開啟ATI011
        case "btDetail":
            OpenElec();
            Page_BlockSubmit = true;
            break;
        case "btConfig":
            Browse();
            Page_BlockSubmit = true;
            break;
        case "btOpenElec":
            //OpenElec();
            CreateTempUnvFile();
            Page_BlockSubmit = true;
            break;
        case "btCaseNoPrompt":
            var strUrl = "";
            strUrl = "ODI210.aspx";
            jf_OpenChildWin(strUrl, "ODI210", 760, 520);
            Page_BlockSubmit = true;
            break;
        case "btFromPrompt1":
            //0990826 David 0990312 紀錄自動完成元件物件
            CurrAutoObj = document.all.txAutoOrgName1;
            CurrOrgIdObj = document.all.txFromOrgNo1;
            CurrOrgNameObj = document.all.txFromOrgName1;
            var strUrl = "";
            //1050706 David 1050087 依註冊站台位置開啟WEM010C1
            //strUrl = "WEM010C1.aspx?OrgID="+document.all.h_OrgNo.value+"&K1=Dlg_Dept&Search="+escape(CurrOrgIdObj.value);
            if (document.all.H_Wed010C1Path && document.all.H_Wed010C1Path.value != "")
            {
                strUrl = document.all.H_Wed010C1Path.value + "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + document.all.h_OrgNo.value + "&K1=WEM010&Search=" + escape(CurrOrgIdObj.value);
                jf_OpenChildWin(strUrl, "WEM010C1", 700, 500);
            }
            else
                alert("紀錄WEDEP站台之環境變數WS_WEDEP_SITE未設定或設定錯誤，無法開啟機關查詢，請洽系統管理員");
            Page_BlockSubmit = true;
            break;
        case "btFromPrompt2":
            //0990826 David 0990312 紀錄自動完成元件物件
            CurrAutoObj = document.all.txAutoOrgName2;
            CurrOrgIdObj = document.all.txFromOrgNo2;
            CurrOrgNameObj = document.all.txFromOrgName2;
            var strUrl = "";
            //1050706 David 1050087 依註冊站台位置開啟WEM010C1
            //strUrl = "WEM010C1.aspx?OrgID="+document.all.h_OrgNo.value+"&K1=Dlg_Dept&Search="+escape(CurrOrgIdObj.value);
            if (document.all.H_Wed010C1Path && document.all.H_Wed010C1Path.value != "")
            {
                strUrl = document.all.H_Wed010C1Path.value + "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + document.all.h_OrgNo.value + "&K1=WEM010&Search=" + escape(CurrOrgIdObj.value);
                jf_OpenChildWin(strUrl, "WEM010C1", 700, 500);
            }
            else
                alert("紀錄WEDEP站台之環境變數WS_WEDEP_SITE未設定或設定錯誤，無法開啟機關查詢，請洽系統管理員");
            Page_BlockSubmit = true;
            break;
        case "btFromPrompt3":
            //0990826 David 0990312 紀錄自動完成元件物件
            CurrAutoObj = document.all.txAutoOrgName3;
            CurrOrgIdObj = document.all.txFromOrgNo3;
            CurrOrgNameObj = document.all.txFromOrgName3;
            var strUrl = "";
            //1050706 David 1050087 依註冊站台位置開啟WEM010C1
            //strUrl = "WEM010C1.aspx?OrgID="+document.all.h_OrgNo.value+"&K1=Dlg_Dept&Search="+escape(CurrOrgIdObj.value);
            if (document.all.H_Wed010C1Path && document.all.H_Wed010C1Path.value != "")
            {
                strUrl = document.all.H_Wed010C1Path.value + "WEM010C1.aspx?rtnObj=lbReturnValue&OrgID=" + document.all.h_OrgNo.value + "&K1=WEM010&Search=" + escape(CurrOrgIdObj.value);
                jf_OpenChildWin(strUrl, "WEM010C1", 700, 500);
            }
            else
                alert("紀錄WEDEP站台之環境變數WS_WEDEP_SITE未設定或設定錯誤，無法開啟機關查詢，請洽系統管理員");
            Page_BlockSubmit = true;
            break;
        case "btSubjectDiv":
            //Yvonne 000267 移到CheckOpenSubject()內
            /*
                if(document.all.btSubjectDiv.value == ">>")
                {
                    document.all.divSubject.style.display="";
                    document.all.btSubjectDiv.value = "<<";
                }
                else
                {
                    document.all.divSubject.style.display="none";
                    document.all.btSubjectDiv.value = ">>";
                }
            */
            CheckOpenSubject();
            Page_BlockSubmit = true;
            break;
        case "btSubjectCode":
            var strUrl = "";
            strUrl = "ODT130C1.aspx";
            jf_OpenChildWin(strUrl, "ODT130C1", 700, 500);
            Page_BlockSubmit = true;
            break;
        //1110927 Kevin 1110880 新增任審資訊介接
        case "btTaInfo":
            document.all["lbReturnValue"].length = 7;
            document.all["lbReturnValue"].options[0].value = document.all["H_txPERSON_FULL_NAME"].value;
            document.all["lbReturnValue"].options[1].value = document.all["H_txPERSON_ID"].value;
            document.all["lbReturnValue"].options[2].value = document.all["H_txJOB_ORGNO"].value;
            document.all["lbReturnValue"].options[3].value = document.all["H_txJOB_ORGNAME"].value;
            document.all["lbReturnValue"].options[4].value = document.all["H_txJOB_NO"].value;
            document.all["lbReturnValue"].options[5].value = document.all["H_txJOB_TITLE_NO"].value;
            document.all["lbReturnValue"].options[6].value = document.all["H_txJOB_TITLE"].value;

            var strUrl = "";
            strUrl = "ODT130C2.aspx";
            jf_OpenChildWin(strUrl, "ODT130C2", 600, 400);
            Page_BlockSubmit = true;
            break;
        //1050706 David 1050087 二代公文修改，刪除小日曆處理--START
        //0990728 David 0990318 新增收文日期、來文日期、上級收文日期小日曆
        /*case "btRcvDate":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txRcvDate, event.screenX, event.screenY);
            txRcvDate_onblur();
            break;
        case "btFromDate":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txFromDate, event.screenX, event.screenY);
            break;
        case "btSrcRcvDate":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txSrcRcvDate, event.screenX, event.screenY);
            break;
        case "btStartDate":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txStartDate, event.screenX, event.screenY);
            txStartDate_onblur(true);
            break;
        case "btMeetDate":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txMeetDate, event.screenX, event.screenY);
            txMeetDate_onblur();
            break;
        case "btLimitDate":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txLimitDate, event.screenX, event.screenY);
            txLimitDate_onblur();
            break;
        //0990819 David 0990438*/
        //1050706 David 1050087 二代公文修改，刪除小日曆處理--END
        case "btFromOrgDiv":
            CheckOpenFromOrg("3");
            Page_BlockSubmit = true;
            break;
        //0991027 David 新增附件註記查詢視窗
        case "btRcvAttNo":
            var strUrl = "";
            strUrl = "../../ED/ED0/EDI070.aspx";
            jf_OpenChildWin(strUrl, "EDI070", 700, 500);
            Page_BlockSubmit = true;
            break;
        //0991129 David 新增移文原因功能鍵，點選後開啟EDT190
        case "btCancelVerson":
            var strUrl = "";
            strUrl = "../../ED/ED1/EDT190.aspx?SAMLart=" + document.all.CurrArtifact.value + "&argDocNo=" + document.all.txDocNo.value;
            jf_OpenChildWin(strUrl, "EDT190", 700, 500);
            Page_BlockSubmit = true;
            break;
        //1040827 David 1040695 (航港局)新增回覆公文按鈕
        case "btAuditDoc":
            if (document.all.MPB_ODT130_AUDITDOC_BTYPENO)
            {
                var arrAuditInfo = document.all.MPB_ODT130_AUDITDOC_BTYPENO.value.split("-");
                if (arrAuditInfo.length == 2)
                {
                    var strAuditDocProperty = arrAuditInfo[0];
                    var strAuditBTypeNo = arrAuditInfo[1];

                    //設定公文性質
                    var bModify = false;
                    for (var i = 0; i < document.all.ddlProperty.length; i++)
                    {
                        var ddlValueArray = document.all.ddlProperty.options[i].value.split(",");
                        var strDocPrty = ddlValueArray[0];
                        if (strDocPrty == strAuditDocProperty)
                        {
                            document.all.ddlProperty.selectedIndex = i;
                            bModify = true;
                            break;
                        }
                    }
                    if (bModify)
                        ddlProperty_onchange();

                    //設定業務類別
                    SetCbSelectedByID(document.all["dlWorkType"], strAuditBTypeNo);
                    document.all["dlWorkType_Text"].value = document.all["dlWorkType"].options[document.all["dlWorkType"].selectedIndex].text;
                    dlWorkType_onchange();
                }
            }
            Page_BlockSubmit = true;
            break;
        //1130626 Kevin 1130291 開啟檢索視窗
        case "btSimilarDocDept":
            var strUrl = `ODT130C3.aspx?Docid=${document.all["txDocumentID"].value}`;
            jf_ShowModal(strUrl);
            Page_BlockSubmit = true;
            break;
        case "btSimilarDocAssign":
            var strUrl = `ODT130C3.aspx?Docid=${document.all["txDocumentID"].value}`;
            jf_ShowModal(strUrl);
            Page_BlockSubmit = true;
            break;
    }
}

//1050706 David 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
    {
        //1101126 Zen 1101292 修正新增模式多次點擊儲存產生重複待傳送公文之問題
        Page_BlockSubmit = true;
        return;
    }

    if (jf_IsTimeOut())
    {
        close();
        Page_BlockSubmit = true;
        return;
    }

    //1050706 David 1050087 二代公文修改
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            Page_BlockSubmit = !CheckBeforOpen();
            //1050706 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave": //傳送
            //0971126	0970993	是否取消自動要號
            if (document.all.H_AUTO_DOCNO.value != "Y" && jf_Trim(document.all.txDocNo.value) == "")
            {
                alert("公文文號不可為空白");
                FocusAt(document.all.txDocNo);
                //1060313 David 檢核未過時，需補上Page_BlockSubmit = true
                Page_BlockSubmit = true;
                return;
            }
            //0960124 Stella [000170] 電子交換公文將受文者機關代碼帶回來文者欄位時，系統未檢核
            if (!bCheckedFromOrg1)
            {
                if (jf_Trim(document.all.txFromOrgNo1.value) != "")
                    txFromOrgNo1_onblur();
            }
            //Leo   000995新增檢核物件字串長度的 function
            if (!jfCheckTextLength('document.all.txSubject', 300, '主旨'))
            {
                //1060313 David 檢核未過時，需補上Page_BlockSubmit = true
                Page_BlockSubmit = true;
                return;
            }
            if (!bCheckedFromOrg2)
            {
                if (jf_Trim(document.all.txFromOrgNo2.value) != "")
                    txFromOrgNo2_onblur();
            }
            if (!bCheckedFromOrg3)
            {
                if (jf_Trim(document.all.txFromOrgNo3.value) != "")
                    txFromOrgNo3_onblur();
            }
            //[951189工單]變更檢查來文機關與來文字號之順序至最開始 Jeff 0951120
            if (!ChkDuplicateDoc()) 
            {
                Page_BlockSubmit = true;
                return;
            }
            //1150211 Zen 外貿序37 MP開啟駐外收文時支援直接送銷號
            //if (document.all.cbAssign.checked == true)
            if (document.all.cbAssign.checked == true && document.getElementById('OrgNickName').value != 'TAITRA')
            {
                alert("選擇移文之公文不可傳送，請直接按儲存後結案");
                //1060313 David 檢核未過時，需補上Page_BlockSubmit = true
                Page_BlockSubmit = true;
                return;
            }

            if (document.activeElement.id == "txFromDate" && jf_Trim(document.all.txFromDate.value) != "") //檢核來文日期 #2006.01.03 Andy
            {
                if (!txFromDate_onblur(true))
                {
                    //1060313 David 檢核未過時，需補上Page_BlockSubmit = true
                    Page_BlockSubmit = true;
                    return;
                }
            }
            if (jf_Trim(document.all.txFromDate.value) != "" && jf_Trim(document.all.txRcvDate.value) != "") //Yvonne 0960356
            {
                if (CompareNumber(StringGetInt(document.all.txFromDate.value), StringGetInt(document.all.txRcvDate.value)))
                {
                    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["來文日期不得晚於收文日期，請重新確認"])), "");
                    //1060313 David 檢核未過時，需補上Page_BlockSubmit = true
                    Page_BlockSubmit = true;
                    return;
                }
            }

            if (!checkDeptSectUserDDL(true))	//[955079變更需求單] 檢查承辦資訊下拉式選單 Charles 0950919
            {
                //1060313 David 檢核未過時，需補上Page_BlockSubmit = true
                Page_BlockSubmit = true;
                return;
            }

            //0970139 檢查業務類別不可為空白
            if (document.all["dlWorkType_Text"].style.backgroundColor != "lightgrey" && jf_Trim(document.all["dlWorkType_Text"].value) == "")
            {
                alert("業務類別不可為空白!");
                //1060313 David 檢核未過時，需補上Page_BlockSubmit = true
                Page_BlockSubmit = true;
                return;
            }

            //1050202 David 1040937 陳核會稿公文必須為線上簽核
            if (document.all.cbComeOthers.checked && !document.all.cbIsOnlineDoc.checked)
            {
                alert("陳核會稿公文需走線上簽核!");
                //1060313 David 檢核未過時，需補上Page_BlockSubmit = true
                Page_BlockSubmit = true;
                return;
            }

            if (ConfirmSave())//是否通過儲存前必要檢查
            {
                //檢查是否重覆..已搬至上面JEFF
                /*if(!ChkDuplicateDoc())
                {
                    Page_BlockSubmit = true;
                    return;
                }*/
                //1020329 Kevin 1011032 避免傳送後承辦單位不一致
                //1020528 Kevin 1011032 修正一二級單位同下拉選單檢核不通過問題
                //|| document.all["H_DeptNo_Value"].value.indexOf(document.all["H_Value"].value)== -1 )
                //1150211 Zen 外貿序37 MP開啟駐外收文時支援直接送銷號
                //if (document.all["dlDEPT_Text"].value == "" || document.all["H_Value"].value == "" || document.all["H_DeptNo_Value"].value == "" || document.all["dlDEPT_Text"].value != document.all["H_Value"].value
                if ((document.all["dlDEPT_Text"].value == "" || document.all["H_Value"].value == "" || document.all["H_DeptNo_Value"].value == "" || document.all["dlDEPT_Text"].value != document.all["H_Value"].value) && !(document.getElementById('cbAssign').checked == true && document.getElementById('OrgNickName').value == 'TAITRA')
                )
                {
                    alert("公文傳送時，承辦單位未被設定正確，請洽系統管理人員。 相關參數：$" + document.all["dlDEPT_Text"].value + "$" + document.all["H_Value"].value + "$" + document.all["H_DeptNo_Value"].value + "$");
                    Page_BlockSubmit = true;
                    return;
                }
                if (!CheckDocAttach())
                {
                    Page_BlockSubmit = true;
                    return;
                }
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
            {
                Page_BlockSubmit = true;
                return;
            }
            document.all.ddlSpeed.disabled = false;
            KeepDropDownListValue();
            //1010103 Kevin 1000976 呼叫對方WS-儲存(00)、傳送(01)
            CallSuggestWS("01");
            //1050706 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btOnlySave":
            //0971126	0970993	是否取消自動要號
            if (document.all.H_AUTO_DOCNO.value != "Y" && jf_Trim(document.all.txDocNo.value) == "")
            {
                alert("公文文號不可為空白");
                FocusAt(document.all.txDocNo);
                //1060313 David 檢核未過時，需補上Page_BlockSubmit = true
                Page_BlockSubmit = true;
                return;
            }
            //0960124 Stella [000170] 電子交換公文將受文者機關代碼帶回來文者欄位時，系統未檢核
            if (!bCheckedFromOrg1)
            {
                if (jf_Trim(document.all.txFromOrgNo1.value) != "")
                    txFromOrgNo1_onblur();
            }
            //Leo   000995新增檢核物件字串長度的 function
            if (!jfCheckTextLength('document.all.txSubject', 300, '主旨'))
            {
                //1060313 David 檢核未過時，需補上Page_BlockSubmit = true
                Page_BlockSubmit = true;
                return;
            }
            if (!bCheckedFromOrg2)
            {
                if (jf_Trim(document.all.txFromOrgNo2.value) != "")
                    txFromOrgNo2_onblur();
            }
            if (!bCheckedFromOrg3)
            {
                if (jf_Trim(document.all.txFromOrgNo3.value) != "")
                    txFromOrgNo3_onblur();
            }
            //[951189工單]變更檢查來文機關與來文字號之順序至最開始 Jeff 0951120
            if (!ChkDuplicateDoc()) 
            {
                Page_BlockSubmit = true;
                return;
            }
            if (document.activeElement.id == "txFromDate" && jf_Trim(document.all.txFromDate.value) != "") //檢核來文日期 #2006.01.03 Andy
            {
                if (!txFromDate_onblur(true))
                {
                    //1060313 David 檢核未過時，需補上Page_BlockSubmit = true
                    Page_BlockSubmit = true;
                    return;
                }
            }
            if (jf_Trim(document.all.txFromDate.value) != "" && jf_Trim(document.all.txRcvDate.value) != "") //Yvonne 0960356
            {
                if (CompareNumber(StringGetInt(document.all.txFromDate.value), StringGetInt(document.all.txRcvDate.value)))
                {
                    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["來文日期不得晚於收文日期，請重新確認"])), "");
                    //1060313 David 檢核未過時，需補上Page_BlockSubmit = true
                    Page_BlockSubmit = true;
                    return;
                }
            }

            if (!checkDeptSectUserDDL(true))	//[955079變更需求單] 檢查承辦資訊下拉式選單 Charles 0950919
            {
                //1060313 David 檢核未過時，需補上Page_BlockSubmit = true
                Page_BlockSubmit = true;
                return;
            }

            //0970139 檢查業務類別不可為空白
            if (document.all["dlWorkType_Text"].style.backgroundColor != "lightgrey" && jf_Trim(document.all["dlWorkType_Text"].value) == "")
            {
                alert("業務類別不可為空白!");
                //1060313 David 檢核未過時，需補上Page_BlockSubmit = true
                Page_BlockSubmit = true;
                return;
            }

            //1050202 David 1040937 陳核會稿公文必須為線上簽核
            if (document.all.cbComeOthers.checked && !document.all.cbIsOnlineDoc.checked)
            {
                alert("陳核會稿公文需走線上簽核!");
                //1060313 David 檢核未過時，需補上Page_BlockSubmit = true
                Page_BlockSubmit = true;
                return;
            }

            if (CheckBeforOnlySave())
            {
                Page_BlockSubmit = false;
            }
            else
            {
                Page_BlockSubmit = true;
                return;
            }

            //檢查是否重覆..已搬至上面
            /*if(!ChkDuplicateDoc()) 
            {
                Page_BlockSubmit = true;
                return;
            }*/

            if (!CheckDocAttach())
            {
                Page_BlockSubmit = true;
                return;
            }
            if (jf_Trim(document.all.txLimitDate.value) == "")
                txLeadTime_onblur();

            //1050706 David 1050087 二代修改
            //document.all.dlRmvSec_Cond.disabled = false;
            //document.all.dlRmvSec_Cond_Text.disabled = false;
            //document.all.dlRmvSec_Cond_Text.style.backgroundColor = "FFFFFF";
            $('#dlRmvSec_Cond').combobox('setEnable');

            //0961120 Yvonne 拿掉解密別
            //document.all.dlRmvSecCode.disabled = false;
            document.all.ddlSpeed.disabled = false;
            KeepDropDownListValue();
            //1010103 Kevin 1000976 呼叫對方WS-儲存(00)、傳送(01)
            CallSuggestWS("00");
            //1050706 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            if (!checkDeptSectUserDDL(true))	//[955079變更需求單] 檢查承辦資訊下拉式選單 Charles 0950919
                return;
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1050706 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            if (!checkDeptSectUserDDL(true))	//[955079變更需求單] 檢查承辦資訊下拉式選單 Charles 0950919
                return;
            //1120720 kevin 問題118 參照1000859功能，新增模式下取消改為清除鍵
            //Page_BlockSubmit = !jf_ConfirmCancel();
            if (jf_GetActionMode() == LayoutModeNew)
                Page_BlockSubmit = !window.confirm("確認要清除嗎?")
            else
                Page_BlockSubmit = !jf_ConfirmCancel();
            //1050706 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean();
            //1050706 David 1050087 二代修改，調整focus語法
            //document.all["txDocNo"].focus();
            $('#txDocNo').focus();
            break;
        case "btSearch":
            var strUrl = "";
            strUrl = "ODT135.aspx";
            jf_OpenChildWin(strUrl, "ODT135", 760, 420);
            Page_BlockSubmit = true;
            //1050706 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            //SAMPLE CODE
            /*
            var strUrl = "";
            xOldKey = document.all["txUserName"].value;
            strUrl = "SYM020C1.aspx?rtnObj=lbReturnValue&m=p&kv1="+xOldKey;//[開啟子視窗程式]+[?回傳接值物件(必需)]+[&傳入子視窗預設查詢條件]
            jf_OpenChildWin(strUrl, "子視窗名稱", 700, 500 );
            */
            break;
        case "btPrint":
            if (CheckBeforPrint())
            {
                if (jf_ConfirmPrint())
                {
                    IsServerHandling = true;
                    jf_ShowWaitState();
                    Page_BlockSubmit = false;
                }
                else
                    Page_BlockSubmit = true;
            }
            else
                Page_BlockSubmit = true;
            //1050706 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            if (CheckBeforPrint())
            {
                if (jf_ConfirmPrint())
                {
                    IsServerHandling = true;
                    jf_ShowWaitState();
                    Page_BlockSubmit = false;
                }
                else
                    Page_BlockSubmit = true;
            }
            else
                Page_BlockSubmit = true;
            //1050706 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btElecRcv"://電子來文查詢
            var strUrl = "";
            strUrl = "ODT134.aspx";
            //Cola 000996 修正開啟之子視窗大小
            //1020503	Jagle	[1011012]		新增顯示來文註記，因此連帶調整視窗大小
            //jf_OpenChildWin(strUrl, "ODT134", 940, 470 );
            //1040304 Eric 修改使用高榮、中榮、北榮開啟ODT134時顯示全畫面
            if (document.all.OrgNickName.value == "TVGH" || document.all.OrgNickName.value == "KVGH" || document.all.OrgNickName.value == "TPVGH")
            {
                var strWinStyle = "fullscreen=yes,menubar=no,titlebar=no,toolbar=no,resizable=yes,status=yes";
                window.open(strUrl, "ODT134", strWinStyle);
            }
            else
            {
                //1130626 Kevin 1130291 調整預設大小
                //jf_OpenChildWin(strUrl, "ODT134", 1000, 470);
                jf_OpenChildWin(strUrl, "ODT134");
            }
            Page_BlockSubmit = true;
            //1050706 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSecLogin"://密件待登錄
            var strUrl = "";
            strUrl = "ODT131.aspx";
            jf_OpenChildWin(strUrl, "ODT131", 480, 250);
            Page_BlockSubmit = true;
            //1050706 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btEmail"://Email載入
            var strUrl = "";
            strUrl = "ODT133.aspx";
            jf_OpenChildWin(strUrl, "ODT133", 480, 250);
            Page_BlockSubmit = true;
            //1050706 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btRcvScan"://掃描影像
            var strUrl = "";
            strUrl = "ODT136.aspx";
            jf_OpenChildWin(strUrl, "ODT136", 760, 420);
            Page_BlockSubmit = true;
            //1050706 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1031127 Eric 1030160	新增功能鍵陳核會稿功能
        case "btComeOthers":
            var strUrl = "";
            strUrl = "ODT138.aspx";
            jf_OpenChildWin(strUrl, "ODT138", 760, 420);
            Page_BlockSubmit = true;
            //1050706 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btBulletin":
            var strUrl = "";
            strUrl = "ODT137.aspx";
            jf_OpenChildWin(strUrl, "ODT137", 760, 420);
            Page_BlockSubmit = true;
            //1050706 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1001128 David 1000973 新增「線上申辦」功能鍵
        case "btHyWeb":
            //1010830 David 取消以視窗開啟方式
            /*var strUrl = document.all.H_HyWebUrl.value;
            if(strUrl == "")
            {
                alert("線上申辦網頁URL設定有誤，請洽系統管理員");
            }
            else
            {
                jf_OpenChildWin(strUrl, "HYWEB", 800, 850);
            }*/
            Page_BlockSubmit = false;
            //1050706 David 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1140610 Kevin 1140382 支援介接公文分文功能
        case "btCaseDocTemp":
            jf_OpenChildWin("../../ED/ED1/EDT144.aspx", "EDT144");
            Page_BlockSubmit = true;
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

//###############################################################################
//							Button Click Function
//###############################################################################
//傳送前檢查
function ConfirmSave()
{
    var bRtnbool = false;
    //如果不具密件權且要儲存密件(將公文傳送給密件處理人)
    if ((document.all.IsSecRight.value == "N") && (document.all.ddlSec.options[document.all.ddlSec.selectedIndex].value != "1"))
    {
        //不執行合理性檢查
        return true;
    }
    else
    {
        if (CheckBeforSave())
        {
            return true;
        }
    }
    return bRtnbool;
}

//開啟前檢查
function CheckBeforOpen()
{
    //合理性檢查
    if (jf_Trim(document.all.txDocNo.value) == "")
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["公文文號不可空白"])), "");
        FocusAt(document.all.txDocNo);
        return false;
    }
    return true;
}
//儲存前合理性檢查
//除回傳true false外,並進行訊息處理及Focus處理
function CheckBeforSave()
{
    //合理性檢查
    //收文日期,來文日期,限辦期限,主旨,承辦單位不可空白
    var InValidName = "";
    if (jf_Trim(document.all.txRcvDate.value) == "")
        InValidName += ",收文日期"
    //0990820 David 0990438 檢查收文時間
    if (jf_Trim(document.all.txRcvMin.value) == "")
        InValidName += ",收文時間"
    if (jf_Trim(document.all.txFromDate.value) == "")
        InValidName += ",來文日期";
    if (jf_Trim(document.all.txLimitDate.value) == "")
        InValidName += ",限辦期限";
    if (jf_Trim(document.all.txSubject.value) == "")
        InValidName += ",主旨";
    //1150211 Zen 外貿序37 MP開啟駐外收文時支援直接送銷號
    //if (jf_Trim(document.all.dlDEPT_Text.value) == "")
    if (jf_Trim(document.all.dlDEPT_Text.value) == "" && !(document.getElementById('cbAssign').checked == true && document.getElementById('OrgNickName').value == 'TAITRA'))
        InValidName += ",承辦單位";

    //1120505 Kevin 1111280 新增儲存前實體附件數量檢核
    InValidName += ChkDataGridFileCntAll();

    if (InValidName != "")
    {
        InValidName = InValidName.substr(1, InValidName.length - 1);
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([InValidName + "不可空白"])), "");
        FocusAt(document.all.txLimitDate);
        return false;
    }

    //來文機關欄位群組檢查
    //0990826 David 0990312 來文字欄位改為ComboBox，來文機關欄位改用自動完成元件--Start
    //if(!CheckFromOrg(document.all.txFromOrgNo1,document.all.txFromWord1,document.all.txFromNo1))
    if (!CheckFromOrg(document.all.txAutoOrgName1, document.all.dlFromWord1_Text, document.all.txFromNo1))
        return false;
    if (!CheckFromOrg(document.all.txFromOrgNo2, document.all.dlFromWord2_Text, document.all.txFromNo2))
        return false;
    if (!CheckFromOrg(document.all.txFromOrgNo3, document.all.dlFromWord3_Text, document.all.txFromNo3))
        return false;
    //0990826 David 0990312 來文字欄位改為ComboBox，來文機關欄位改用自動完成元件--End

    //來文者至少要有一筆
    if ((jf_Trim(document.all.txFromOrgNo1.value) == "") &&
        (jf_Trim(document.all.txFromOrgNo2.value) == "") &&
        (jf_Trim(document.all.txFromOrgNo3.value) == ""))
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["來文者不可皆為空白"])), "");
        //0990826 David 0990312 來文機關改用自動完成元件
        //FocusAt(document.all.txFromOrgNo1);
        FocusAt(document.all.txAutoOrgName1);
        return false;
    }

    //單位收文時,承辦人不可為空白
    if (document.all.IsDeptRcver.value == "Y")
    {
        //0951120 Jeff [951187] 中央需求：二層式登記桌模式希望將部門及二級單位置於同一下拉式選單
        //1020322	Jagle	[1020042]	改抓取H_FLOW_TYPE_P
        //if(document.all.H_OD_FLOW_TYPE.value == "1")	//[955079變更需求單] 一層登記桌架構，則單位收文時承辦人不可為空白 Charles 0950917
        if (document.all.H_FLOW_TYPE_P.value == "1")
        {
            //1020322	Jagle	[1020042]	增加判斷簽核類型：紙本簽核公文且一層登記桌架構，則單位收文需指定承辦人
            //if(jf_Trim(document.all.dlUSER_Text.value) == "")
            if (jf_Trim(document.all.dlUSER_Text.value) == "" && document.all.cbIsOnlineDoc.checked == false)
            {
                jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["單位收文必須指定承辦人"])), "");
                FocusAt(document.all.dlUSER_Text);
                return false;
            }
        }
        //1020322	Jagle	[1020042]	改抓取H_FLOW_TYPE_P
        //else if(document.all.H_OD_FLOW_TYPE.value == "2")
        else if (document.all.H_FLOW_TYPE_P.value == "2")
        {
            //[需求單000605] Charles (中央)若將一二級單位合在同一下拉式選單，且分文單位等於承辦單位，則需要選擇承辦人 0960425
            if (document.all.H_OD_DEPTDDL_WITH_SUBUNIT.value == "Y")
            {
                if (jf_Trim(document.all.H_Value.value) != "")
                {
                    var arrH_Value = document.all.H_Value.value.split(":");
                    var strSelectedDeptNo = "";
                    if (arrH_Value.length >= 4)
                        strSelectedDeptNo = arrH_Value[2] != "" ? arrH_Value[2] : arrH_Value[0];
                    else if (arrH_Value.length > 0)
                        strSelectedDeptNo = arrH_Value[0];

                    if (jf_Trim(document.all.h_DeptNo.value) == strSelectedDeptNo && jf_Trim(document.all.dlUSER_Text.value) == "")
                    {
                        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["單位收文必須指定承辦人"])), "");
                        FocusAt(document.all.dlUSER_Text);
                        return false;
                    }
                }
            }
            else
            {
                if (document.all.h_DeptNo.value.length == 2)
                {
                    //[955079變更需求單] 二層登記桌架構，一層單位登記桌時，則承辦科別為空白時，承辦人不可為空白 Charles 0950917
                    if (document.all["dlSECT_Text"].value == "" && jf_Trim(document.all.dlUSER_Text.value) == "")
                    {
                        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["使用者為一級單位登記桌角色，且承辦科別為空白，所以單位收文必須指定承辦人"])), "");
                        FocusAt(document.all.dlUSER_Text);
                        return false;
                    }
                }
                else if (document.all.h_DeptNo.value.length > 2)
                {
                    //[955079變更需求單] 二層登記桌架構，二層單位登記桌時，則承辦人不可為空白 Charles 0950917
                    if (jf_Trim(document.all.dlUSER_Text.value) == "")
                    {
                        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["使用者為二級單位登記桌，單位收文必須指定承辦人"])), "");
                        FocusAt(document.all.dlUSER_Text);
                        return false;
                    }
                }
            }
            //0951120 Jeff [951187] End
        }
    }

    //線上簽核公文必須要檢查是否有設定電子檔位置
    if (document.all.cbIsOnlineDoc.checked)
    {
        //如果是電子來文
        if (GetDDLValue(document.all.ddlSource, 0) == "E" || GetDDLValue(document.all.ddlSource, 0) == "M")
        {
            var Sysid = document.all.h_SYSID.value;
            //1031127 Eric 1030160 增加記錄ComeOtherSYSID 
            var ComeOtherSYSID = document.all.hComeOtherSYSID.value;
            //檢查是否有選取電子來文
            //1031127 Eric 1030160 增加判斷ComeOtherSYSID 
            //if(Sysid == "")
            if (Sysid == "" && ComeOtherSYSID == "")
            {	//[951189工單]變更檢核訊息 Jeff 0951120
                //1001018 kevin [1000602] 新增來源別註記
                //jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["目前公文來源別為電子交換/電子郵件，請使用電子收文子視窗選取電子來文或郵件進行登錄傳送作業"])),"");
                jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["目前公文來源別註記為" + GetDDLText(document.all.dlRcvtypeDesc, 0)
                    + "，請使用電子收文子視窗選取電子來文或郵件進行登錄傳送作業"])), "");
                return false;
            }
        }
        else if (GetDDLValue(document.all.ddlSource, 0) == "P")
        {	//紙本來文掃描
            //檢查是否有設定紙本掃描電子檔位置
            if (document.all.hScanSYSID.value == "")
            {
                if (document.all.h_WorkFilePath.value == "")
                {
                    //1141110 Kevin 1141112 新增駐外單位收文
                    var omSysId = "";
                    if (document.all.OMSYSID && document.all.OMSYSID.value != '')
                        omSysId = document.all.OMSYSID.value;

                    //1120505 Kevin 1120350 新增影像匯入功能
                    //1141110 Kevin 1141112 沒上傳檔案且 omSysId 為空
                    //if ($('#txImgFilePath')[0].files.length == 0)
                    if (!$('#txImgFilePath')[0]?.files?.length && omSysId === "")
                    {
                        //[951189工單]變更檢核訊息 Jeff 0951120
                        //1001018 kevin [1000602] 新增來源別註記
                        //jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["目前公文來源別為紙本來文，且為線上簽核公文，請使用掃描影像子視窗選取掃描影像檔進行登錄傳送作業"])),"");
                        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["目前公文來源別註記為" + GetDDLText(document.all.dlRcvtypeDesc, 0)
                            + "，且為線上簽核公文，請使用掃描影像子視窗選取掃描影像檔進行登錄傳送作業"])), "");
                        FocusAt(document.all.btConfig);
                        return false;
                    }
                }
            }
        }
    }

    //如果使用者有輸入文號之檢查
    if (document.all.txDocNo.value != "")
    {
        //檢查該文號是否存在(新增模式)
        if (jf_GetActionMode() == LayoutModeNew)
        {
            //補上傳送前須檢核公文文號長度(預設長度根據SYTEM_SET設定) #2006.02.09 Andy
            //檢查文號長度
            var nDocNoLen = 10;
            if (document.all["DOCNO_LEN"])
            {
                var len = parseInt(document.all["DOCNO_LEN"].value);
                if (len != NaN && len > 0)
                    nDocNoLen = len;
            }

            if (jf_Trim(document.all.txDocNo.value).length != nDocNoLen)//0970179 Yvonne 公文文號去空白 避免長度算錯
            {
                AlertMsg("公文文號" + jf_Trim(document.all.txDocNo.value) + "長度必須為" + nDocNoLen + "碼");
                FocusAt(document.all.txDocNo);
                return false;
            }
            else//檢查該文號是否存在
            {
                //1050321 David 1040937 調整二次外陳外會新增模式傳送判斷
                if (!document.all.cbSameComeOtherDoc.checked)
                {
                    var arWSParam = new Array(3);
                    arWSParam[0] = "DOC_MAIN";
                    var arFieldName = new Array(2);
                    arFieldName[0] = "DOC_NO";
                    arFieldName[1] = "SOURCE_ORGNO";
                    arWSParam[1] = arFieldName;
                    var arFieldValue = new Array(2);
                    arFieldValue[0] = document.all.txDocNo.value;
                    arFieldValue[1] = document.all.SOURCE_ORGNO.value;
                    arWSParam[2] = arFieldValue;
                    var CheckMDCMDocNo = jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, arWSParam);
                    if (jf_IsWebServiceSuccess(CheckMDCMDocNo))
                    {
                        if (CheckMDCMDocNo.value.RtnBool)
                        {
                            //0970993
                            if (document.all.H_AUTO_DOCNO.value != "Y")
                                AlertMsg("指定之文號" + document.all.txDocNo.value + "\n" + "已被其他公文使用，請重新指定公文文號");
                            else
                                AlertMsg("指定之文號" + document.all.txDocNo.value + "\n" + "已被其他公文使用，請重新指定公文文號或將之清空改由系統自動要號");
                            FocusAt(document.all.txDocNo);
                            return false;
                        }
                    }
                }
                //1070506	Kevin_C	1070242	增加文號檢核
                //1070515	Kevin_C	1070242	電子來文不檢核文號區間及預印條碼
                if (document.all["H_RcvOrgno"].value == "")
                {
                    var strDocNoCheckErrMsg = "";
                    var nDocNo = parseInt(document.all.txDocNo.value);
                    if (nDocNo < parseInt(document.all.H_DocStart.value) || nDocNo > parseInt(document.all.H_DocEnd.value))
                        strDocNoCheckErrMsg = "所輸入之文號不屬於[" + document.all.H_DeptName.value + "]可用之文號區間";

                    //1130124 Zen 1120978 調整共用題號區間時儲存前檢核文號邏輯
                    //if (document.all.OD_UPD_DOC_USED.value == "Y" && nDocNo > parseInt(document.all.txUseNo.value))
                    //1130304 Zen 1120978 修正未使用題號區間但啟用列印條碼等同要號時衍生之問題
                    //if (document.all.OD_UPD_DOC_USED.value == "Y" && nDocNo > GetMaxUseNo())
                    //1140207 Zen 1140051 修正未使用題號區間但啟用列印條碼等同要號時與ODT120同時使用衍生文號檢核異常之問題
                    //if (document.all.OD_UPD_DOC_USED.value == "Y" && ((document.all.DOC_USED_BYCTRL.value == "N" && nDocNo > parseInt(document.all.txUseNo.value)) || (document.all.DOC_USED_BYCTRL.value == "Y" && nDocNo > GetMaxUseNo())))
                    if (document.all.OD_UPD_DOC_USED.value == "Y" && nDocNo > GetMaxUseNo())
                    {
                        if (strDocNoCheckErrMsg != "")
                            strDocNoCheckErrMsg += "，且尚未經過預印條碼要號";
                        else
                            strDocNoCheckErrMsg += "所輸入之文號尚未經過預印條碼要號";
                    }
                    if (strDocNoCheckErrMsg != "")
                    {
                        //1120707 Kevin 屏東87 修正條碼預印未正確檢核問題
                        //AlertMsg(strDocNoCheckErrMsg + "，請重新指定公文文號");
                        if (document.all.H_AUTO_DOCNO.value != "Y")
                            AlertMsg(strDocNoCheckErrMsg + "，請重新指定公文文號");
                        else
                            AlertMsg(strDocNoCheckErrMsg + "，請重新指定公文文號或將之清空改由系統自動要號");

                        return false;
                    }
                }
            }
        }
    }

    //辦理期限 不可為0或空白
    var pLeadTime;
    try
    {
        if (isNaN(document.all.txLeadTime.value))
        {
            alert("辦理期限請輸入數字(不可為0)");
            FocusAt(document.all.txLeadTime);
            return false;
        }
        else
            pLeadTime = parseInt(document.all.txLeadTime.value);
    }
    catch (e)
    {
        alert("辦理期限請輸入數字(不可為0)");
        FocusAt(document.all.txLeadTime);
        return false;
    }

    if (jf_Trim(document.all.txLeadTime.value) == "" || pLeadTime == 0)
    {
        alert("辦理期限請輸入數字(不可為0)");
        FocusAt(document.all.txLeadTime);
        return false;
    }

    //[955079變更需求單] 若系統流程架構為無登記桌模式，則承辦單位及承辦人皆須有值 Charles 0950917
    //1020322	Jagle	[1020042]	改抓取H_FLOW_TYPE_P
    //if(document.all.H_OD_FLOW_TYPE == "0")
    if (document.all.H_FLOW_TYPE_P == "0")
    {
        if (document.all["dlDEPT_Text"].value == "")
        {
            alert('目前系統為無登記桌模式，承辦單位須有值')
            FocusAt(document.all["dlDEPT_Text"]);
            return false;
        }
        //1020322	Jagle	[1020042]	增加判斷簽核類型：紙本簽核公文且無登記桌架構下，需指定承辦人
        //if(document.all["dlUSER_Text"].value == "")
        if (document.all["dlUSER_Text"].value == "" && document.all.cbIsOnlineDoc.checked == false)
        {
            alert('目前系統為無登記桌模式，承辦人須有值')
            FocusAt(document.all["dlUSER_Text"]);
            return false;
        }
    }
    //1020322	Jagle	[1020042]	根據FLOW_TYPE_P的設定檢核承辦單位及承辦人下拉選單
    else if (document.all.H_FLOW_TYPE_P.value == "1" && document.all.cbIsOnlineDoc.checked == false)
    {
        if (document.all["dlSECT_Text"].value != "" && jf_Trim(document.all.dlUSER_Text.value) == "")
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["目前系統為一層式登記桌模式，紙本公文不可分文給二級單位(無二級單位登記桌)，請分文給一級單位或指定承辦人"])), "");
            FocusAt(document.all.dlUSER_Text);
            return false;
        }
    }

    if (document.all.txLtBy.value == "M") //起算日期由開會日期決定
    {
        if (document.all.txMeetDate.value == "")
        {
            alert('開會日期不可空白')
            FocusAt(document.all.txMeetDate);
            return false;
        }

        //1111219 David 1111366 調整檢核邏輯
        /*if (document.all.txMeetDate.value < document.all.txStartDate.value)
        {
            alert('起算日期不可大於開會日期')
            FocusAt(document.all.txStarttDate);
            return;
        }*/
        if (document.all.txStartDate.value > document.all.txLimitDate.value)
        {
            alert("限辦日期不可小於起算日期");
            FocusAt(document.all.txMeetDate);
            return false;
        }
    }

    //950904 95.10.17 David 當選擇為密以上等級時，須檢核解密條件為必填欄位
    //1000419 Zola	1000330　密等與解密條件分開判斷
    //if(ddlSec_Check() && IsCheckSec)
    if (ddlSec_Check())
    {
        //1040624 David 1040471 依環境變數設定判斷線上簽核公文是否可為密等公文
        if (document.all.SEC_CAN_AOL && document.all.SEC_CAN_AOL.value == "N" && document.all.cbIsOnlineDoc.checked)
        {
            alert("密件公文不可走線上簽核，請調整密等。");
            return false;
        }

        //1000419 Zola	1000330 取出解密條件字串
        var dlRmvSec_Cond_Text = document.all["dlRmvSec_Cond_Text"].value;

        if (IsCheckSec)		//1000419 Zola	1000330　密等與解密條件分開判斷
        {
            //0961120 Yvonne
            //var dlRmvSecCodeIndex = document.all["dlRmvSecCode"].selectedIndex;
            //1000419 Zola	1000330 提前取出解密條件字串
            //var dlRmvSec_Cond_Text = document.all["dlRmvSec_Cond_Text"].value;
            var ErrMsg = "";
            var bJudgueRmvSecCond = true;
            var bJudgueSecCode = true;
            //0961120 Yvonne 拿掉解密別
            /*
            if(dlRmvSecCodeIndex == 0 )
            {
                bJudgueSecCode = false;
            }
            */
            if (jf_Trim(dlRmvSec_Cond_Text) == "")
            {
                bJudgueRmvSecCond = false;
            }

            //0961120 Yvonne 
            //if(bJudgueSecCode == false && bJudgueRmvSecCond == false)
            if (bJudgueRmvSecCond == false)
            {
                ErrMsg = "密等為密以上，解密條件不可空白";
                alert(ErrMsg);
                return false;
            }
        }
        else
        {
            //1000419 Zola	1000330 新增密等為密以上且解密條件為空時，彈出提醒訊息：『密件公文未填入解密條件，是否繼續儲存(或傳送)？』 -- START --
            if (jf_Trim(dlRmvSec_Cond_Text) == "")
            {
                ErrMsg = "密件公文未填入解密條件，是否繼續儲存(或傳送)？";
                return confirm(ErrMsg);
            }
            //1000419 Zola	1000330 新增密等為密以上且解密條件為空時，彈出提醒訊息：『密件公文未填入解密條件，是否繼續儲存(或傳送)？』 -- END --
        }
    }
    //0980831	David	0980445 傳送前需檢核日期欄位
    if (document.activeElement.id == "txSrcRcvDate" && jf_Trim(document.all.txSrcRcvDate.value) != "") 
    {
        if (!txSrcRcvDate_onblur(true))
            return false;
    }

    //1111229 Kevin 1110880 變更為任審介接
    if (document.all.OrgNickName.value == "MOCS")
    {
        getLastFromOrgTaInfo();

        var ddlValueArray = document.all.ddlProperty.options[document.all.ddlProperty.selectedIndex].value.split(",");
        var strDocProperty = ddlValueArray[0];

        if (strDocProperty == document.all.MOCS_TA_DOC_PROPERTY.value && document.all["H_txPERSON_ID"].value == '')
        {
            alert("任審資訊(身分證字號)不可為空。");
            return false;
        }
    }

    return true;
}

function CheckBeforOnlySave()
{
    if (jf_GetActionMode() == LayoutModeNew)
    {
        //如果使用者有輸入文號之檢查
        if (document.all.txDocNo.value != "")
        {
            //補上傳送前須檢核公文文號長度(預設長度根據SYTEM_SET設定) #2006.02.09 Andy
            //檢查文號長度
            var nDocNoLen = 10;
            if (document.all["DOCNO_LEN"])
            {
                var len = parseInt(document.all["DOCNO_LEN"].value);
                if (len != NaN && len > 0)
                    nDocNoLen = len;
            }

            if (jf_Trim(document.all.txDocNo.value).length != nDocNoLen)//0970179 Yvonne 公文文號去空白 避免長度算錯
            {
                AlertMsg("公文文號" + jf_Trim(document.all.txDocNo.value) + "長度必須為" + nDocNoLen + "碼");
                FocusAt(document.all.txDocNo);
                return false;
            }
            else//檢查該文號是否存在
            {
                //1050202 David 1040937 二次外陳外會公文不需進行此判斷
                if (!document.all.cbSameComeOtherDoc.checked)
                {
                    var arWSParam = new Array(3);
                    arWSParam[0] = "DOC_MAIN";
                    var arFieldName = new Array(2);
                    arFieldName[0] = "DOC_NO";
                    arFieldName[1] = "SOURCE_ORGNO";
                    arWSParam[1] = arFieldName;
                    var arFieldValue = new Array(2);
                    arFieldValue[0] = document.all.txDocNo.value;
                    arFieldValue[1] = document.all.SOURCE_ORGNO.value;
                    arWSParam[2] = arFieldValue;
                    var CheckMDCMDocNo = jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, arWSParam);
                    if (jf_IsWebServiceSuccess(CheckMDCMDocNo))
                    {
                        if (CheckMDCMDocNo.value.RtnBool)
                        {
                            //0970993
                            if (document.all.H_AUTO_DOCNO.value != "Y")
                                AlertMsg("指定之文號" + document.all.txDocNo.value + "\n" + "已被其他公文使用，請重新指定公文文號");
                            else
                                AlertMsg("指定之文號" + document.all.txDocNo.value + "\n" + "已被其他公文使用，請重新指定公文文號或將之清空改由系統自動要號");
                            FocusAt(document.all.txDocNo);
                            return false;
                        }
                    }
                }
                //1120816 Kevin 屏東146 修正儲存時未檢核預印條碼問題
                //1070506	Kevin_C	1070242	增加文號檢核
                //1070515	Kevin_C	1070242	電子來文不檢核文號區間及預印條碼
                if (document.all["H_RcvOrgno"].value == "")
                {
                    var strDocNoCheckErrMsg = "";
                    var nDocNo = parseInt(document.all.txDocNo.value);
                    if (nDocNo < parseInt(document.all.H_DocStart.value) || nDocNo > parseInt(document.all.H_DocEnd.value))
                        strDocNoCheckErrMsg = "所輸入之文號不屬於[" + document.all.H_DeptName.value + "]可用之文號區間";
                    //1130124 Zen 1120978 調整共用題號區間時儲存前檢核文號邏輯
                    //if (document.all.OD_UPD_DOC_USED.value == "Y" && nDocNo > parseInt(document.all.txUseNo.value))
                    //1130304 Zen 1120978 修正未使用題號區間但啟用列印條碼等同要號時衍生之問題
                    //if (document.all.OD_UPD_DOC_USED.value == "Y" && nDocNo > GetMaxUseNo())
                    //1140207 Zen 1140051 修正未使用題號區間但啟用列印條碼等同要號時與ODT120同時使用衍生文號檢核異常之問題
                    //if (document.all.OD_UPD_DOC_USED.value == "Y" && ((document.all.DOC_USED_BYCTRL.value == "N" && nDocNo > parseInt(document.all.txUseNo.value)) || (document.all.DOC_USED_BYCTRL.value == "Y" && nDocNo > GetMaxUseNo())))
                    if (document.all.OD_UPD_DOC_USED.value == "Y" && nDocNo > GetMaxUseNo())
                    {
                        if (strDocNoCheckErrMsg != "")
                            strDocNoCheckErrMsg += "，且尚未經過預印條碼要號";
                        else
                            strDocNoCheckErrMsg += "所輸入之文號尚未經過預印條碼要號";
                    }
                    if (strDocNoCheckErrMsg != "")
                    {
                        //1120707 Kevin 屏東87 修正條碼預印未正確檢核問題
                        //AlertMsg(strDocNoCheckErrMsg + "，請重新指定公文文號");
                        if (document.all.H_AUTO_DOCNO.value != "Y")
                            AlertMsg(strDocNoCheckErrMsg + "，請重新指定公文文號");
                        else
                            AlertMsg(strDocNoCheckErrMsg + "，請重新指定公文文號或將之清空改由系統自動要號");

                        return false;
                    }
                }
            }
        }
    }

    //[955079變更需求單] 若系統流程架構為無登記桌模式，則承辦單位及承辦人皆須有值 Charles 0950917
    //1020322	Jagle	[1020042]	改抓取H_FLOW_TYPE_P
    //if(document.all.H_OD_FLOW_TYPE == "0")
    if (document.all.H_FLOW_TYPE_P == "0")
    {
        //1020322	Jagle	[1020042]	增加判斷簽核類型：紙本簽核公文且無登記桌架構下，需指定承辦人
        //if(document.all["dlDEPT_Text"].value == "")
        if (document.all["dlDEPT_Text"].value == "" && document.all.cbIsOnlineDoc.checked == false)
        {
            alert('目前系統為無登記桌模式，承辦單位須有值')
            FocusAt(document.all["dlDEPT_Text"]);
            return false;
        }
        //1020322	Jagle	[1020042]	增加判斷簽核類型：紙本簽核公文且無登記桌架構下，需指定承辦人
        //if(document.all["dlUSER_Text"].value == "")
        if (document.all["dlUSER_Text"].value == "" && document.all.cbIsOnlineDoc.checked == false)
        {
            alert('目前系統為無登記桌模式，承辦人須有值')
            FocusAt(document.all["dlUSER_Text"]);
            return false;
        }
    }

    //0980831	David	0980445	儲存時，若日期欄位有值，需檢核--Start
    if (document.activeElement.id == "txLimitDate" && jf_Trim(document.all.txLimitDate.value) != "") 
    {
        if (!txLimitDate_onblur(true))
            return false;
    }

    if (document.activeElement.id == "txSrcRcvDate" && jf_Trim(document.all.txSrcRcvDate.value) != "") 
    {
        if (!txSrcRcvDate_onblur(true))
            return false;
    }

    if (document.activeElement.id == "txStartDate" && jf_Trim(document.all.txStartDate.value) != "") 
    {
        if (!txStartDate_onblur(true))
            return false;
    }
    //End

    if (document.all.txLtBy.value == "M") //起算日期由開會日期決定
    {
        if (document.all.txMeetDate.value == "")
        {
            alert('開會日期不可空白')
            FocusAt(document.all.txMeetDate);
            return false;
        }

        //1111219 David 1111366 調整檢核邏輯
        /*if (document.all.txMeetDate.value < document.all.txStartDate.value)
        {
            alert('起算日期不可大於開會日期')
            FocusAt(document.all.txStarttDate);
            return;
        }*/
        if (document.all.txStartDate.value > document.all.txLimitDate.value)
        {
            alert("限辦日期不可小於起算日期");
            FocusAt(document.all.txMeetDate);
            return false;
        }
    }

    //950904 95.10.17 David 當選擇為密以上等級時，須檢核解密條件為必填欄位

    //1000419 Zola	1000330　密等與解密條件分開判斷
    //if(ddlSec_Check() && IsCheckSec)
    if (ddlSec_Check())
    {
        //1040624 David 1040471 依環境變數設定判斷線上簽核公文是否可為密等公文
        if (document.all.SEC_CAN_AOL && document.all.SEC_CAN_AOL.value == "N" && document.all.cbIsOnlineDoc.checked)
        {
            alert("密件公文不可走線上簽核，請調整密等。");
            return false;
        }

        //1000419 Zola	1000330 取出解密條件字串
        var dlRmvSec_Cond_Text = document.all["dlRmvSec_Cond_Text"].value;

        if (IsCheckSec)		//1000419 Zola	1000330　密等與解密條件分開判斷
        {
            //0961120 Yvonne
            //var dlRmvSecCodeIndex = document.all["dlRmvSecCode"].selectedIndex;
            //1000419 Zola	1000330　提前取出解密條件字串
            //var dlRmvSec_Cond_Text = document.all["dlRmvSec_Cond_Text"].value;
            var ErrMsg = "";
            var bJudgueRmvSecCond = true;
            var bJudgueSecCode = true;
            //0961120 Yvonne 拿掉解密別
            /*
            if(dlRmvSecCodeIndex == 0 )
            {
                bJudgueSecCode = false;
            }
            */
            if (jf_Trim(dlRmvSec_Cond_Text) == "")
            {
                bJudgueRmvSecCond = false;
            }

            //0961120 Yvonne
            //if(bJudgueSecCode == false && bJudgueRmvSecCond == false)
            if (bJudgueRmvSecCond == false)
            {
                ErrMsg = "密等為密以上，解密條件不可空白";
                alert(ErrMsg);
                return false;
            }
        }
        else
        {
            //1000419 Zola	1000330 新增密等為密以上且解密條件為空時，彈出提醒訊息：『密件公文未填入解密條件，是否繼續儲存(或傳送)？』 -- START --
            if (jf_Trim(dlRmvSec_Cond_Text) == "")
            {
                ErrMsg = "密件公文未填入解密條件，是否繼續儲存(或傳送)？";
                return confirm(ErrMsg);
            }
            //1000419 Zola	1000330 新增密等為密以上且解密條件為空時，彈出提醒訊息：『密件公文未填入解密條件，是否繼續儲存(或傳送)？』 -- END --
        }
    }

    //0990127 David 0990019 儲存已傳送公文時，須檢核處理期限
    //辦理期限 不可為0或空白
    if (document.all.H_txDocState.value = "01")
    {
        var pLeadTime;
        try
        {
            if (isNaN(document.all.txLeadTime.value))
            {
                alert("處理期限請輸入數字(不可為0)");
                FocusAt(document.all.txLeadTime);
                return false;
            }
            else
                pLeadTime = parseInt(document.all.txLeadTime.value);
        }
        catch (e)
        {
            alert("處理期限請輸入數字(不可為0)");
            FocusAt(document.all.txLeadTime);
            return false;
        }

        if (jf_Trim(document.all.txLeadTime.value) == "" || pLeadTime == 0)
        {
            alert("處理期限請輸入數字(不可為0)");
            FocusAt(document.all.txLeadTime);
            return false;
        }
    }

    //1120505 Kevin 1111280 新增儲存前實體附件數量檢核
    var InValidName = ChkDataGridFileCntAll();

    if (InValidName != '')
    {
        alert(InValidName);
        return false;
    }

    //0981127 David 0980597 開啟申請展期或已展期公文時若調整速別、性質、業務類別，儲存時顯示提示視窗
    if (jf_GetActionMode() == LayoutModeModify && document.all.H_IsExtent.value != "0")
    {
        var strPropertyNo = "";
        var strSpeedNo = "";
        var strBTypeNo = "";
        //公文性質
        if (document.all.ddlProperty.selectedIndex != -1)
        {
            var ddlValueArray = document.all.ddlProperty.options[document.all.ddlProperty.selectedIndex].value.split(",");
            strPropertyNo = ddlValueArray[0];
        }
        //速別
        if (document.all.ddlSpeed.selectedIndex != -1)
        {
            //1040630 David 1040517 因速別選單VALUE修改為僅記錄代碼，調整取值邏輯
            //var ddlValueArray = document.all.ddlSpeed.options[document.all.ddlSpeed.selectedIndex].value.split(",");
            //strSpeedNo = ddlValueArray[0];
            strSpeedNo = document.all.ddlSpeed.options[document.all.ddlSpeed.selectedIndex].value;
        }
        //業務類別
        strBTypeNo = document.all.dlWorkType.value;

        var strOldPropertyNo = "";
        var strOldSpeedNo = "";
        var strOldBTypeNo = "";
        var strExtentInfo = document.all.H_ExtentInfo.value.split(";");
        if (strExtentInfo[0] != null && strExtentInfo[0] != "")
            strOldPropertyNo = strExtentInfo[0];
        if (strExtentInfo[1] != null && strExtentInfo[1] != "")
            strOldSpeedNo = strExtentInfo[1];
        if (strExtentInfo[2] != null && strExtentInfo[2] != "")
            strOldBTypeNo = strExtentInfo[2];

        //1021001 David 1010980 公文轉專案管制清除展期紀錄
        if (strPropertyNo == "3" && strOldPropertyNo != "3")
        {
            if (document.all.H_IsExtent.value == "1")
            {
                alert("此份公文正在申請展期中，無法調整公文性質為專案管制。");
                return false;
            }
            else//if(document.all.H_IsExtent.value == "2")
            {
                if (window.confirm("此份公文已展期，調整公文性質為專案管制，將會清除展期紀錄，是否繼續？"))
                    return true;
                else
                    return false;
            }
        }

        //判斷速別、性質、業務類別是否修改
        var ExtentChange = false;
        var ShowCkExtent = "";
        if (document.all.H_IsExtent.value == "1")
            ShowCkExtent = "此份公文正在申請展期中，是否調整";
        else if (document.all.H_IsExtent.value == "2")
            ShowCkExtent = "此份公文已展期，是否調整";
        if (strOldSpeedNo != strSpeedNo)
        {
            ShowCkExtent += "[速別]";
            ExtentChange = true;
        }
        if (strOldPropertyNo != strPropertyNo)
        {
            ShowCkExtent += "[公文性質]";
            ExtentChange = true;
        }
        if (strOldBTypeNo != strBTypeNo)
        {
            ShowCkExtent += "[業務類別]";
            ExtentChange = true;
        }
        ShowCkExtent += "？";

        if (ExtentChange)
        {
            if (window.confirm(ShowCkExtent))
                return true;
            else
                return false;
        }
    }

    //1111229 Kevin 1110880 變更為任審介接
    if (document.all.OrgNickName.value == "MOCS")
    {
        getLastFromOrgTaInfo();

        var ddlValueArray = document.all.ddlProperty.options[document.all.ddlProperty.selectedIndex].value.split(",");
        var strDocProperty = ddlValueArray[0];

        if (strDocProperty == document.all.MOCS_TA_DOC_PROPERTY.value && document.all["H_txPERSON_ID"].value == '')
        {
            alert("任審資訊(身分證字號)不可為空。");
            return false;
        }
    }

    return true;
}
//預覽/列印前欄位檢查
function CheckBeforPrint()
{
    var bRtnbool = false;
    return bRtnbool;
}

function CheckBrowse()
{
    //檢核使用者設定之路徑是否有"SFECMD.XML"
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    if (!(fso.FileExists(document.all.h_WorkFilePath.value + "SFECMD.XML")))
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請選擇合法之公文夾"])), "");
        return false;
    }
    return true;
}

//Client端物件OnExit事項檢查範例
/*//範例
var wsGetGrpNameID;//宣告webserver回傳值id
function tbGrp_No_onBlur()
{
    // 如果使用者按下離開鍵或是取消鍵, 不需檢查代碼合法性
    if ( (document.activeElement.id == "btCancel") ) return;

    var arKeyName = new Array(1);
    var arKeyValue = new Array(1);
    var arRtnFldName = new Array(1);
    var arOrdFldName = new Array(1);

    if (!IsServerHandling)
    {
        if (document.all["txGrp_No"].value != "")
        {
            Page_BlockSubmit=true;

            arKeyName[0]    = "GRP_NO";
            arKeyValue[0]   = document.all["txGrp_No"].value;
            arRtnFldName[0] = "GRP_NAME";
            arOrdFldName[0] = "GRP_NO";

            var arWSParam = new Array(5);
            arWSParam[0] = "GRP_HEADER";
            arWSParam[1] = arKeyName;
            arWSParam[2] = arKeyValue;
            arWSParam[3] = arRtnFldName;
            arWSParam[4] = arOrdFldName;
            callObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, arWSParam);
            wsGetGrpNameID = callObj.id;
            OnWSResult(callObj);
        }
    }
}
*/
//設定
function Browse()
{
    //由使用者設定加簽暫存區
    document.all["BF"].Title = "請選擇紙本掃描電子檔路徑";
    if (document.all["BF"].ShowDialog(0) != 0)  //有指定值
    {
        document.all.h_WorkFilePath.value = document.all["BF"].Path + "\\";
        //如果沒有指定
        if (!CheckBrowse())
        {
            //清空設定值
            document.all.h_WorkFilePath.value = "";
        }
    }
    else	//沒指定值
    {
        document.all.h_WorkFilePath.value = "";
        return;
    }

    /*
    document.all.fobj.click();
    if(fobj.value == "") return;
    fullfileobj.value = fobj.value;
    fileobj.value = fobj.value.substr(fobj.value.lastIndexOf("\\")+1);
    var objFSO = new ActiveXObject("Scripting.FileSystemObject");
    var objFile = objFSO.GetFile(document.allfobj.value);
    filesize.innerText = objFile.Size;
    */
}

function TestWs()
{
    callObj = jf_CallWS("lib/OD_LIB.asmx", "HelloWorld", false, null);
    OnWSResult(callObj);

}

//開啟電子檔
function OpenElec()
{
    var SourceType = document.all.ddlSource.options[document.all.ddlSource.selectedIndex].value;

    //1141127 David 序384 支援駐外開啟檢視明細
    if (typeof $('#OM_SYSID')[0] != "undefined")
    {
        let strUrl = window.location.origin + "/OM_I/OM0/OMI003.aspx?nSYSID=" + $('#OM_SYSID').val();
        jf_OpenChildWin(strUrl, "OMI003");
        return;
    }

    //開啟合併後PDF檔
    if (SourceType == "E" || SourceType == "M")
    {//電子收文
        var Sysid = document.all.h_SYSID.value;
        //檢查是否有選取電子來文
        if (Sysid == "")
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請先選取欲登錄之電子來文"])), "");
            return;
        }
        else
        {
            //1050927 David 1050087 電子收文明細改開啟EDI011
            /*var At21ServerName = document.all.AT21Name.value;
            var At21VirtualPath = document.all.AT21VirPath.value
            var strUrl = "";
            strUrl = "http://"+At21ServerName+"/"+At21VirtualPath+"/ATI011.aspx?kv1="+Sysid+"&kv2=od";
            jf_OpenChildWin(strUrl, "ATI011", 760, 520 );*/
            if (document.all.ED_PATH && document.all.ED_PATH.value != "")
            {
                var strUrl = document.all.ED_PATH.value + "/ED0/EDI011.aspx?SAMLart=" + jf_GetArtifact() + "&kv1=" + Sysid + "&kv2=od";
                jf_OpenChildWin(strUrl, "ATI011", 760, 520);
            }
            else
                alert("環境變數WS_ED_SITE設定不正確，無法開啟");
        }
    }
    else if (SourceType == "P")
    {//紙本掃描		不開啟
    }
}

function OpenCasePrompt()
{
}

//###############################################################################
//						所有程式程式都有之 Function
//###############################################################################

function CallBack(argCallerId)
{
    //搜尋帶回文號後開啟
    if (argCallerId == "ODT135")
    {
        //公文文號
        document.all["txDocNo"].value = document.all["lbReturnValue"].options[0].text;
        if (document.all["txDocNo"].value != "")
        {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
    }

    //電子收文帶入新增
    if (argCallerId == "ODT134")
    {
        //0970450	紀錄由ODT134帶回
        bChildWin = true;

        //1111116 Kevin 1110835 新增人民陳情介接
        var DocTempObj = OD.ODT130.GetDocTempInfo(document.all.SOURCE_ORGNO.value, document.all["lbReturnValue"].options[0].text).value;
        if (!DocTempObj.bSuccess)
        {
            //1130626 Kevin 1130291 支援AI預設承辦單位
            //alert("取得公文暫存資訊發生錯誤，錯誤訊息為" + DocTempObj.ErrMsg);
            setTimeout(function (a)
            {
                alert("取得電子暫存資訊發生錯誤:" + DocTempObj.ErrMsg);
            }, 500, this);
        }
        else if (!DocTempObj.bExist)
        {
            setTimeout(function (a)
            {
                alert("無法取得電子暫存資訊，請重新操作。");
            }, 500, this);

            return;
        }
        else if (DocTempObj.bExist)
        {
            if (DocTempObj.sOuName != "")
            {
                document.all["dlDEPT_Text"].value = DocTempObj.sOuName;
                SetCbSelectedByValue(document.all["dlDEPT"], document.all["dlDEPT_Text"].value);
                uDeptChecked = false;
                //1111219 Kevin 序44 修正134帶回後切換承辦單位未連動承辦人問題
                //dlDEPT_Text_onblur(true);
                dlDEPT_Text_onblur(false);
            }
            //1141118 Zen 陸委會序350 修正ODT134帶回來文後多帶回案件編號之問題
            //if (DocTempObj.sSuggestNo != "")
            if (DocTempObj.sSuggestNo != "" && document.all.OrgNickName.value != "MAC")
            {
                document.all.txCaseNo.value = DocTempObj.sSuggestNo;
            }
        }
        //text
        //0:系統流水號
        document.all["h_SYSID"].value = document.all["lbReturnValue"].options[0].text;
        //收文日期
        //document.all["txRcvDate"].value = document.all["lbReturnValue"].options[1].text;
        //來文日期
        document.all["txFromDate"].value = document.all["lbReturnValue"].options[3].text;
        //來文機關全銜
        //1080213 Kevin 修正編碼不同造成帶回ODT130回亂碼的問題
        //document.all["txFromOrgName1"].value = document.all["lbReturnValue"].options[4].text;
        document.all["txFromOrgName1"].value = unescape(document.all["lbReturnValue"].options[4].text);
        //0990826 David 0990312 設定自動完成元件顯示
        //1081115 Kevin 1080987 修正編碼不同造成帶回ODT130回亂碼的問題
        //document.all.txAutoOrgName1.value = document.all["lbReturnValue"].options[4].text;
        document.all.txAutoOrgName1.value = unescape(document.all["lbReturnValue"].options[4].text);
        //1070506	Kevin_C	1070242	增加紀錄受文者代碼
        document.all.H_RcvOrgno.value = document.all["lbReturnValue"].options[5].text;
        //1070717	Kevin_C	1070242			增加檢核受文者名稱
        //1081115 Kevin 1080987 修正編碼不同造成帶回ODT130回亂碼的問題
        //document.all.H_RcvOrg.value = document.all["lbReturnValue"].options[6].text;
        document.all.H_RcvOrg.value = unescape(document.all["lbReturnValue"].options[6].text);
        if (document.all["lbReturnValue"].options[4].text == "")
        {
            //1081115 Kevin 1080987 修正編碼不同造成帶回ODT130回亂碼的問題
            //document.all.txAutoOrgName1.value = document.all["lbReturnValue"].options[16].text;
            //document.all["txFromOrgName1"].value = document.all["lbReturnValue"].options[16].text;
            document.all.txAutoOrgName1.value = unescape(document.all["lbReturnValue"].options[16].text);
            document.all["txFromOrgName1"].value = unescape(document.all["lbReturnValue"].options[16].text);
        }
        //來文字
        //0990826 David 0990312 來文字欄位改為ComboBox
        //document.all["txFromWord1"].value = document.all["lbReturnValue"].options[7].text;
        //1081115 Kevin 1080987 修正編碼不同造成帶回ODT130回亂碼的問題
        //document.all["dlFromWord1_Text"].value = document.all["lbReturnValue"].options[7].text;
        document.all["dlFromWord1_Text"].value = unescape(document.all["lbReturnValue"].options[7].text);
        //來文號
        document.all["txFromNo1"].value = document.all["lbReturnValue"].options[8].text;
        //主旨
        //1050301 David 1050064 修正HtmlEncode編碼後字串未經處理由ODT134回傳至ODT130導致IIS判斷危險字元問題
        //document.all["txSubject"].value = document.all["lbReturnValue"].options[9].text;
        document.all["txSubject"].value = unescape(document.all["lbReturnValue"].options[9].text);
        //Yvonne	0970428 0970530 紀錄主旨
        tempSubject = document.all["txSubject"].value;
        tempSubject2 = document.all["txSubject"].value;
        //密等
        ddlSelect("ddlSec", document.all["lbReturnValue"].options[10].text);
        document.all.ddlSecText.value = document.all["lbReturnValue"].options[10].text;
        //速別
        //1080528 Kevin 1080410 鐵道局內部行文新增客製化邏輯
        //1120927 Kevin 序243 修正組改後無法正確判斷內部行文問題
        //if (document.all.OrgNickName.value == "RRB" && document.all.h_OrgNo.value == document.all["lbReturnValue"].options[16].text.substring(0, 10) && document.all["lbReturnValue"].options[11].text == "")
        if (document.all.OrgNickName.value == "RRB" && document.all.H_NewOrgNo.value == document.all["lbReturnValue"].options[16].text.substring(0, 10) && document.all["lbReturnValue"].options[11].text == "")
            document.all["lbReturnValue"].options[11].text == "1";

        ddlSelectSpd("ddlSpeed", document.all["lbReturnValue"].options[11].text);
        //文別
        var cate = "";
        //if(document.all["lbReturnValue"].options[12].text.length > 1)
        //	cate = document.all["lbReturnValue"].options[12].text.substring(0,1);
        //else
        //	cate = document.all["lbReturnValue"].options[12].text;
        cate = document.all["lbReturnValue"].options[12].text;

        //1080528 Kevin 1080410 鐵道局內部行文新增客製化邏輯
        //1120927 Kevin 序243 修正組改後無法正確判斷內部行文問題
        //if (document.all.OrgNickName.value == "RRB" && document.all.h_OrgNo.value == document.all["lbReturnValue"].options[16].text.substring(0, 10) && (cate == "4" || cate == "B"))
        if (document.all.OrgNickName.value == "RRB" && document.all.H_NewOrgNo.value == document.all["lbReturnValue"].options[16].text.substring(0, 10) && (cate == "4" || cate == "B"))
            cate = "22";

        ddlSelect("ddlCategory", cate);
        //ddlSelect("ddlCategory",document.all["lbReturnValue"].options[12].text);
        //本別
        ddlSelect("ddlType", document.all["lbReturnValue"].options[13].text);
        //封裝檔所在目錄
        document.all["hFolderDir"].value = jf_Trim(document.all["lbReturnValue"].options[14].text);
        if (document.all["hFolderDir"].value == "") //電子來文卻無封裝檔則不允許跑線上簽核 #2006.01.10 Andy
            document.all.cbIsOnlineDoc.disabled = true;
        //來文機關代碼
        //1081115 Kevin 1080987 修正編碼不同造成帶回ODT130回亂碼的問題
        //var FromOrgNo = document.all["lbReturnValue"].options[16].text;
        var FromOrgNo = unescape(document.all["lbReturnValue"].options[16].text);
        document.all["txFromOrgNo1"].value = FromOrgNo;
        if (FromOrgNo != "")
        {
            //1081115 Kevin 1080987 修正編碼不同造成帶回ODT130回亂碼的問題
            //var iStart = document.all["lbReturnValue"].options[16].text.indexOf("(");
            //var iEnd   = document.all["lbReturnValue"].options[16].text.indexOf(")");
            var iStart = FromOrgNo.indexOf("(");
            var iEnd = FromOrgNo.indexOf(")");

            //因應檔管局格式特殊不帶出 #2007.12.19 Andy
            var strEmail = "";
            if (iStart != -1 && iEnd != -1 && iEnd > iStart)
            {
                strEmail = FromOrgNo.substring(iStart + 1, iEnd);

                var iDot = strEmail.indexOf(",");
                if (iDot == -1)
                {
                    var iAt = strEmail.indexOf("@");
                    if (iAt != -1)
                    {
                        document.all["txEmail"].value = strEmail;
                        //1001215	Jeff	1000929		機關名稱欄位址只顯示機關名稱(過濾EMAIL)
                        //1010521	Kevin	1000929		修正bug長度取錯
                        //var OrgName = document.all["lbReturnValue"].options[16].text.substring(0,iStart-1);
                        //1081115 Kevin 1080987 修正編碼不同造成帶回ODT130回亂碼的問題
                        //var OrgName = document.all["lbReturnValue"].options[16].text.substring(0,iStart);
                        var OrgName = FromOrgNo.substring(0, iStart);
                        document.all.txAutoOrgName1.value = OrgName;
                        document.all["txFromOrgName1"].value = OrgName;
                        document.all["txFromOrgNo1"].value = OrgName;
                    }
                }
            }
        }

        //公文文號
        document.all["txDocNo"].value = jf_Trim(document.all["lbReturnValue"].options[17].text);

        //取得限辦期限
        ddlSpeed_onchange();

        //觸發ddlSect onchange事件以取得正確的欄位顯示方式
        ddlSec_onchange();

        //長官交辦設為UnCheck
        //document.all["cbIsOnlineDoc"].checked = false;
        document.all["cbIsChiefDoc"].checked = false;

        //來源別設為電子交換(E)或電子郵件(M)或人民陳情案件(C) #2006.01.10 Andy
        var SourceType = jf_Trim(document.all["lbReturnValue"].options[18].text);
        //原本判斷空白時給預設值E改成不為正確代碼就一律給預設值E #2006.05.17 Andy
        //if(SourceType == "")
        //0990820 David 0990438 由ODT134收進來的文一律為電子交換
        //if(SourceType != "E" && SourceType != "M" && SourceType != "C")
        //1000225 David 依系統參數判斷是否啟用來源別「電子郵件」「人民陳情」選項
        //1010301 Kevin 因單號1010602內，將OD_RCVTYPE_EXTRA此參數取消，此處判斷應調整
        //if(SourceType == "M" && document.all.H_txSourceUseM.value == "Y")
        //	SourceType = "M";
        //else if(SourceType == "C" && document.all.H_txSourceUseC.value == "Y")
        //	strSourceType = "C";
        //else
        //	SourceType = "E";
        if (SourceType != "E" && SourceType != "M" && SourceType != "C")
            SourceType = "E"

        ddlSelect("ddlSource", SourceType);
        document.all.ddlSourceText.value = SourceType;
        document.all["ddlSource"].disabled = true;

        //若為人民陳情案件則公文類別自動帶人民陳情案件 #2006.01.10 Andy
        if (SourceType == "C")
        {
            //1110331 Kevin 1100324 修正公文性質排序變更問題
            //document.all.ddlProperty.selectedIndex = PEOPLE_CASE_INDEX;
            var targetDocPty = "6";
            for (var iDl = 0; iDl < document.all.ddlProperty.length; iDl++)
            {
                var ddlValueArray = document.all.ddlProperty.options[iDl].value.split(",");
                var strDocPrty = ddlValueArray[0];
                if (strDocPrty == targetDocPty)
                {
                    document.all.ddlProperty.selectedIndex = iDl;
                    break;
                }
            }
        }
        else //公文類別給第一筆資料
            document.all.ddlProperty.selectedIndex = 0;
        ddlProperty_onchange();

        //0970993	Yvonne	設定為線上簽核
        if (document.all.txOdElecSignType.value == "E" || document.all.txOdElecSignType.value == "O")
            document.all.cbIsOnlineDoc.checked = true;
        else
            document.all.cbIsOnlineDoc.checked = false;
        //0991102	[0990556]	Yvonne	加上LEGISLATOR_NO(立委質詢案件流水號)、B_TYPE_NO(業務類別)
        var sLGNo = jf_Trim(document.all["lbReturnValue"].options[21].text);
        var sBTypeNo = jf_Trim(document.all["lbReturnValue"].options[22].text);
        document.all["H_LegislatorNo"].value = sLGNo;

        //1010103 Kevin 1000976 新增帶入意見信箱之郵件編號、寄件者EMAIL、原始內容
        var sSuggestNo = jf_Trim(document.all["lbReturnValue"].options[23].text);
        document.all["H_txSuggestNo"].value = sSuggestNo;
        var sSuggestEmail = jf_Trim(document.all["lbReturnValue"].options[24].text);
        document.all["txEmail"].value = sSuggestEmail;
        //1050301 David 1050064 修正HtmlEncode編碼後字串未經處理由ODT134回傳至ODT130導致IIS判斷危險字元問題
        //var sSuggestContent = jf_Trim(document.all["lbReturnValue"].options[25].text);
        var sSuggestContent = jf_Trim(unescape(document.all["lbReturnValue"].options[25].text));
        document.all["H_txSuggestContent"].value = sSuggestContent;

        //1051205 David 1050087 二代修改，調整setAttribute方式
        /*//將電子收文,Email載入,開啟,密件待登錄 Disable
        //電子收文
        var btElecRcvObj = getToolBarItemObjById("btElecRcv");
        if(btElecRcvObj != null)
            btElecRcvObj.setAttribute("disabled",true);
        //Email載入
        var btEmailObj = getToolBarItemObjById("btEmail");
        if(btEmailObj != null)
            btEmailObj.setAttribute("disabled",true);
        //掃描影像
        var btRcvScanObj = getToolBarItemObjById("btRcvScan");
        if(btRcvScanObj != null)
            btRcvScanObj.setAttribute("disabled",true);
        //開啟
        var btOpenObj = getToolBarItemObjById("btOpen");
        if(btOpenObj != null)
            btOpenObj.setAttribute("disabled",true);
        //搜尋
        var btSearchObj = getToolBarItemObjById("btSearch");
        if(btSearchObj != null)
            btSearchObj.setAttribute("disabled",true);
        //密件待登錄
        var btSecLoginObj = getToolBarItemObjById("btSecLogin");
        if(btSecLoginObj != null)
            btSecLoginObj.setAttribute("disabled",true);
        //0960124 Stella 公佈欄收文
        var btBulletinObj = getToolBarItemObjById("btBulletin");
        if(btBulletinObj != null)
            btBulletinObj.setAttribute("disabled",true);
        //1031127 Eric 1030160 增加判斷陳核會稿按鈕
        var btComeOthersObj = getToolBarItemObjById("btComeOthers");
        if(btComeOthersObj != null)
            btComeOthersObj.setAttribute("disabled",true);*/
        //電子收文
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btElecRcv').attr('disabled', true);
        $('#btElecRcv').prop('disabled', true);
        //Email載入
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btEmail').attr('disabled', true);
        $('#btEmail').prop('disabled', true);
        //掃描影像
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btRcvScan').attr('disabled', true);
        $('#btRcvScan').prop('disabled', true);
        //開啟
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btOpen').attr('disabled', true);
        $('#btOpen').prop('disabled', true);
        //搜尋
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btSearch').attr('disabled', true);
        $('#btSearch').prop('disabled', true);
        //密件待登錄
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btSecLogin').attr('disabled', true);
        $('#btSecLogin').prop('disabled', true);
        //公佈欄收文
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btBulletin').attr('disabled', true);
        $('#btBulletin').prop('disabled', true);
        //陳核會稿
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btComeOthers').attr('disabled', true);
        $('#btComeOthers').prop('disabled', true);
        //線上申辦
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btHyWeb').attr('disabled', true);
        $('#btHyWeb').prop('disabled', true);

        /*//將電子檔設定設為Disable
        SetControlDisable("btConfig");*/
        //將電子檔開啟設為Enable
        SetControlEnable("btOpenElec");
        //1031002 Eric 1030714  設定明細按鈕Enable
        SetControlEnable("btDetail");

        ddlSource_onchange();
        //1001018 kevin [1000602] 重新設定來源別註記
        dlRcvtypeDesc_onchange();

        //0991102	[0990556]	Yvonne	不為立委質詢案件時才帶為一般公文-不分類，反之則帶為立委質詢案件-ODP050轉入的業務類別
        if (sLGNo == "")
        {
            //1080528 Kevin 1080410 鐵道局內部行文新增客製化邏輯
            //1120927 Kevin 序243 修正組改後無法正確判斷內部行文問題
            //if (document.all.OrgNickName.value == "RRB" && document.all.h_OrgNo.value == FromOrgNo.substring(0, 10))
            if (document.all.OrgNickName.value == "RRB" && document.all.H_NewOrgNo.value == FromOrgNo.substring(0, 10))
                document.all["lbReturnValue"].options[22].text = "17";

            //1111214 Kevin 1111398 新增電子來文WebHR介接
            if (document.all.OrgNickName.value == "MOCS")
            {
                //1111229 Kevin 1110880 變更為任審介接
                //var WebHrInfoObj = OD.ODT130.GetWebHrInfo(document.all.SOURCE_ORGNO.value, unescape(document.all["lbReturnValue"].options[16].text), document.all["lbReturnValue"].options[8].text).value;
            }

            //1010424 Kevin 1010253 新增意見信箱自動帶人民陳情案件
            if (document.all["H_txSuggestNo"].value != "")
            {
                //1110331 Kevin 1100324 修正公文性質排序變更問題
                //document.all.ddlProperty.selectedIndex = 5;
                var targetDocPty = "6";
                for (var iDl = 0; iDl < document.all.ddlProperty.length; iDl++)
                {
                    var ddlValueArray = document.all.ddlProperty.options[iDl].value.split(",");
                    var strDocPrty = ddlValueArray[0];
                    if (strDocPrty == targetDocPty)
                    {
                        document.all.ddlProperty.selectedIndex = iDl;
                        break;
                    }
                }
                ddlProperty_onchange();
            }
            //1010813 David 1000762 帶回之業務類別不為空時，帶出對應的公文性質及業務類別
            else if (jf_Trim(document.all["lbReturnValue"].options[22].text) != "")
            {
                var wsParam = new Array();
                wsParam[0] = jf_Trim(document.all.h_OrgNo.value);//機關代碼
                wsParam[1] = jf_Trim(document.all["lbReturnValue"].options[22].text);
                var CallWsObj = jf_CallWS("ODT130WS.asmx", "GetDocPty", false, wsParam);
                if (jf_IsWebServiceSuccess(CallWsObj))
                {
                    if (CallWsObj.value.DocPty != "")
                    {
                        var bModify = false;
                        //帶出對應的公文性質
                        for (var i = 0; i < document.all.ddlProperty.length; i++)
                        {
                            var ddlValueArray = document.all.ddlProperty.options[i].value.split(",");
                            var strDocPrty = ddlValueArray[0];
                            if (strDocPrty == CallWsObj.value.DocPty)
                            {
                                document.all.ddlProperty.selectedIndex = i;
                                bModify = true;
                                break;
                            }
                        }
                        if (bModify)
                        {
                            ddlProperty_onchange();

                            //帶出對應的業務性質
                            for (var i = 0; i < document.all["dlWorkType"].options.length; i++)
                            {
                                if (document.all["dlWorkType"].options[i].value == jf_Trim(document.all["lbReturnValue"].options[22].text))
                                {
                                    document.all["dlWorkType_Text"].value = document.all["dlWorkType"].options[i].text;

                                    //1040521 David 1040436 設定業務類別時透過SetCbSelectedByValue處理，避免設定不完全
                                    //document.all["dlWorkType"].SelectedIndex = i;
                                    SetCbSelectedByValue(document.all["dlWorkType"], document.all["dlWorkType_Text"].value);
                                    break;
                                }
                            }
                            dlWorkType_onchange();
                        }
                    }
                }
            }
            else
            {
                //Yvonne	0970450	0970605	帶回公文基資時，預設將公文性質帶為一般公文，業務類別帶為一般公文下的不分類
                var wsParam = new Array();
                wsParam[0] = jf_Trim(document.all.h_OrgNo.value);//機關代碼
                wsParam[1] = 1;//一般公文
                wsParam[2] = "不分類";
                var CallWsObj = jf_CallWS("lib/TIME_LIB.asmx", "GetBns", false, wsParam);
                if (jf_IsWebServiceSuccess(CallWsObj))
                {
                    //若一般公文下無不分類之業務類別，則將業務類別帶為空白
                    if (CallWsObj.value.RtnStr != "")
                    {
                        var strFullBns = CallWsObj.value.RtnStr + " " + wsParam[2];
                        document.all["dlWorkType_Text"].value = strFullBns;
                        SetCbSelectedByValue(document.all["dlWorkType"], document.all["dlWorkType_Text"].value);
                        dlWorkType_onchange();
                    }
                }
            }
        }
        else
        {
            //將公文性質設定成立委質詢案件
            //1110331 Kevin 1100324 修正公文性質排序變更問題
            //document.all.ddlProperty.selectedIndex = 3;
            var targetDocPty = "4";
            for (var iDl = 0; iDl < document.all.ddlProperty.length; iDl++)
            {
                var ddlValueArray = document.all.ddlProperty.options[iDl].value.split(",");
                var strDocPrty = ddlValueArray[0];
                if (strDocPrty == targetDocPty)
                {
                    document.all.ddlProperty.selectedIndex = iDl;
                    break;
                }
            }
            ddlProperty_onchange();

            //將業務類別設定成回傳的業務類別
            //document.all.dlWorkType.value

            for (var i = 0; i < document.all["dlWorkType"].options.length; i++)
            {
                //1010528 Kevin 1010511 立委質詢帶入DOC_TEMP業務類別
                //if(document.all["dlWorkType"].options[i].value == document.all["H_LegislatorNo"].value)
                if (document.all["dlWorkType"].options[i].value == jf_Trim(document.all["lbReturnValue"].options[22].text))
                {
                    document.all["dlWorkType_Text"].value = document.all["dlWorkType"].options[i].text;

                    //1040521 David 1040436 設定業務類別時透過SetCbSelectedByValue處理，避免設定不完全
                    //document.all["dlWorkType"].SelectedIndex = i;
                    SetCbSelectedByValue(document.all["dlWorkType"], document.all["dlWorkType_Text"].value);
                    break;
                }
            }
            dlWorkType_onchange();
        }
        //Yvonne	dlWorkType_onchange()中會呼叫到GetSumType()，所以在此取消呼叫
        //2004-02-11 add
        //GetSumType();

        //1020503 	Jagle	[1011012]			電子收文帶入DOC_TEMP來源別細項
        var sRcvTypeDescValue = SourceType + "," + jf_Trim(document.all["lbReturnValue"].options[26].text);
        document.all.dlRcvtypeDesc.value = sRcvTypeDescValue;

        //1020520	Jagle	[1020412]	修正自ODT134帶回開會通知單的公文時，開會日期未啟用的問題
        ddlCategory_onchange();

        //1030514 David 1020724 支援由ODT134帶回ASSIGN_DOC_NO(上級收文號)、ASSIGN_RCV_DATE(上級收文日期)資料
        var strAssignDocNo = jf_Trim(document.all["lbReturnValue"].options[27].text);
        var strAssignRcvDate = jf_Trim(document.all["lbReturnValue"].options[28].text);
        if (strAssignDocNo != "")
        {
            document.all["txSrcRcvNo"].value = strAssignDocNo;
            document.all["txSrcRcvDate"].value = strAssignRcvDate;
            document.all["txRcvDate"].value = strAssignRcvDate;
            txRcvDate_onblur();

            //1061225 David 1061270 由DOC_TEMP帶回資料時，如系統參數OD_ODT130_DOC_SOURCE設定為1且有上級收文號資料，公文來源預設為上級機關交辦
            if (document.all.ddlSecText && document.all.ddlSecText.value != "0")
                ddlSelectByText("ddlDocSource", "上級機關交辦");
        }
        //1040119 Eric 1040033	支援由ODT134帶回MOIGROUP_CASE_NO(內政部人團系統案號)資料
        var strMoiGroupCaseNo = jf_Trim(document.all["lbReturnValue"].options[29].text);
        document.all["H_txMoiGroupCaseNo"].value = strMoiGroupCaseNo;

        //1041223 David 1040838 紀錄重複來文原因資訊
        var strRcvDmType = jf_Trim(document.all["lbReturnValue"].options[30].text);
        var strRcvDmDesc = jf_Trim(document.all["lbReturnValue"].options[31].text);
        document.all["txRcvDmType"].value = strRcvDmType;
        document.all["txRcvDmDesc"].value = strRcvDmDesc;

        //1070619 David 1070063 由DOC_TEMP帶回資料時，新增紀錄DOCUMENT_ID資料
        var strDocumentID = jf_Trim(document.all["lbReturnValue"].options[32].text);
        document.all["txDocumentID"].value = strDocumentID;

        //1130626 Kevin 1130291 支援AI預設承辦單位
        $('#h_txConfLight').val(DocTempObj.sConflight);
        SetCcbDept(DocTempObj.sInfrdeptno, '', true, DocTempObj.sConflight);

        //1111214 Kevin 1111398 新增電子來文WebHR介接
        if (document.all.OrgNickName.value == "MOCS")
        {
            //等待ODT134關閉
            setTimeout(getLastFromOrgTaInfo, 100);
        }
    }

    //Email載入
    if (argCallerId == "ODT133")
    {
        //0寄件者
        //1050706 David 1050087 二代修改
        //document.all.txFromOrgName1.innerText = document.all["lbReturnValue"].options[0].text;
        document.all.txFromOrgName1.textContent = document.all["lbReturnValue"].options[0].text;

        //1寄件者E-mail
        document.all.txEmail.value = document.all["lbReturnValue"].options[1].text;
        //2主旨
        document.all.txSubject.value = document.all["lbReturnValue"].options[2].text;
        //Yvonne 0970428 0970530 紀錄主旨
        tempSubject = document.all["txSubject"].value;
        tempSubject2 = document.all["txSubject"].value;
        //3日期
        document.all.txFromDate.value = document.all["lbReturnValue"].options[3].text;
        //來源別設為Email
        ddlSelect("ddlSource", "E");
        document.all.ddlSourceText.value = "E";
        SetControlDisable("ddlSource");

        //1001018 kevin [1000602] 重新設定來源別註記
        ddlSource_onchange();
        dlRcvtypeDesc_onchange();
    }
    //案號查詢子視窗
    if (argCallerId == "ODI210")
    {
        //設定案件編號
        document.all.txCaseNo.value = document.all["lbReturnValue"].options[0].text;
        //帶出該編號的預結日期
        txCaseNo_onblur();
    }
    //密件查詢子視窗
    if (argCallerId == "ODT131")
    {
        document.all.txDocNo.value = document.all["lbReturnValue"].options[0].value;
        document.all.txDocNoTextChange.value = document.all.txDocNo.value;
        //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
        IsServerHandling = true;
        //1031226 Cloud   修正子視窗查詢，帶回值不會自動開啟問題
        if (document.all.txDocNo.value != "")
        {
            Page_BlockSubmit = false;
            __doPostBack("", "");
        }
    }

    //來文機關查詢子視窗
    if (argCallerId == "III600")
    {
        CurrOrgIdObj.value = document.all["lbReturnValue"].options[0].value;
        CurrOrgNameObj.value = document.all["lbReturnValue"].options[0].text;
    }

    //
    if (argCallerId == "WEM010C1")
    {
        var DeptInfo = document.all["lbReturnValue"].options[0].value;
        //1050706 David 1050087 調整WEM010C1回傳值處理
        //var DeptArray = DeptInfo.split(',');
        var DeptArray = DeptInfo.split('^');

        CurrOrgNameObj.value = DeptArray[1];
        //0990826 David 0990312 設定自動完成元件顯示
        CurrAutoObj.value = DeptArray[1];
        //CurrOrgIdObj.value = DeptArray[2];
        if (DeptArray[9] == "")
        { CurrOrgIdObj.value = DeptArray[1]; }
        else
        { CurrOrgIdObj.value = DeptArray[9]; }
    }

    //預設主旨查詢子視窗
    if (argCallerId == "ODT130C1")
    {
        document.all["txSubjectNo"].value = document.all["lbReturnValue"].options[0].text;
        document.all["txSubject"].value = document.all["lbReturnValue"].options[0].value;
    }

    //1110927 Kevin 1110880 新增任審資訊介接
    if (argCallerId == "ODT130C2")
    {
        document.all["H_txPERSON_FULL_NAME"].value = document.all["lbReturnValue"].options[0].value;
        document.all["H_txPERSON_ID"].value = document.all["lbReturnValue"].options[1].value;
        document.all["H_txJOB_ORGNO"].value = document.all["lbReturnValue"].options[2].value;
        document.all["H_txJOB_ORGNAME"].value = document.all["lbReturnValue"].options[3].value;
        document.all["H_txJOB_NO"].value = document.all["lbReturnValue"].options[4].value;
        document.all["H_txJOB_TITLE_NO"].value = document.all["lbReturnValue"].options[5].value;
        document.all["H_txJOB_TITLE"].value = document.all["lbReturnValue"].options[6].value;
        document.all["lbReturnValue"].options.length = 0;

        //1111219 Kevin 序43 銓審案預帶主旨
        document.all["txSubject"].value = document.all["H_txPERSON_FULL_NAME"].value + document.all["H_txPERSON_ID"].value + '銓審案';
    }

    if (argCallerId == "ODT136")
    {
        //公文文號
        document.all["hScanSYSID"].value = document.all["lbReturnValue"].options[0].text;
        //950424 Charles 除SYSID外，將DOCNO填入txDocNo中以便帶出公文資料
        document.all["txDocNo"].value = document.all["lbReturnValue"].options[1].text;
        //0970450	紀錄由ODT136帶回
        bChildWin = true;
        //0970962	由ODT136帶回
        document.all["H_FromODT136"].value = "Y";

        //0970993	Yvonne	設定線上簽核選項
        if (document.all.txOdElecSignType.value == "E" || document.all.txOdElecSignType.value == "O")
            document.all.cbIsOnlineDoc.checked = true;
        else
            document.all.cbIsOnlineDoc.checked = false;
        if (document.all["hScanSYSID"].value != "")
        {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
    }
    //1031127 Eric 1030160	處理ODT138回傳資訊
    if (argCallerId == "ODT138")
    {
        //1050202 David 1040937 調整ODT138帶回ODT130資料方式
        /*document.all["hComeOtherSYSID"].value = document.all["lbReturnValue"].options[0].text;
        //1041217 David 1040937 修改由ODT138回傳處理邏輯
        document.all["txDocNo"].value = document.all["lbReturnValue"].options[1].text;

        //紀錄由ODT138帶回
        bChildWin = true;
        document.all["H_FromODT138"].value = "Y";
        if(document.all["hComeOtherSYSID"].value != "")
        {
            Page_BlockSubmit=false;
            jf_OpenButtonSubmit();
        }*/

        //檢核是否可帶回
        //1071101	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
        //var CheckComeOtherObj = ODT130.CheckComeOthers(document.all.SOURCE_ORGNO.value, document.all["lbReturnValue"].options[1].text).value;
        var CheckComeOtherObj = OD.ODT130.CheckComeOthers(document.all.SOURCE_ORGNO.value, document.all["lbReturnValue"].options[1].text).value;
        if (!CheckComeOtherObj.bSuccess)
        {
            alert("判斷外陳外會公文狀態發生錯誤，錯誤訊息為" + CheckComeOtherObj.ErrMsg);
            //清空lbReturnValue物件
            if (document.all["lbReturnValue"].options != null)
                document.all["lbReturnValue"].options.length = 0;
            return;
        }
        else if (CheckComeOtherObj.bExist)
        {
            //1060509 David 1060095 調整判斷狀態
            //if(CheckComeOtherObj.DocState != "02")
            if (CheckComeOtherObj.DocState != "02" && CheckComeOtherObj.DocState != "10" && CheckComeOtherObj.DocState != "13")
            {
                //1060509 David 1060095 調整訊息內容
                //alert("此公文為二次外陳外會公文，目前已辦理的公文狀態不為銷號，無法進行二次外陳外會傳送。");
                var strComeOtherErrMsg = "此公文為二次外陳外會公文，目前已辦理的公文狀態不為銷號、已結案或已歸檔，無法進行二次外陳外會傳送";
                strComeOtherErrMsg += "請先將目前公文送銷號或結案送單位庫房歸檔。";
                alert(strComeOtherErrMsg);

                //清空lbReturnValue物件
                if (document.all["lbReturnValue"].options != null)
                    document.all["lbReturnValue"].options.length = 0;
                return;
            }
            else
            {
                //如由此處進行，一定是同文號進行二次外陳外會
                document.all.cbSameComeOtherDoc.checked = true;
            }
        }

        //系統流水號
        document.all["hComeOtherSYSID"].value = document.all["lbReturnValue"].options[0].text;
        //公文文號
        document.all["txDocNo"].value = document.all["lbReturnValue"].options[1].text;
        //1100518 David 1090821 配合外陳外會驗證，移除不需要的功能
        //document.all["txDocNo"].readOnly = true;
        //document.all["txDocNo"].style["background-color"] = "LightGrey"
        document.all["hComeDocNo"].value = document.all["lbReturnValue"].options[1].text;
        //來文日期
        document.all["txFromDate"].value = document.all["lbReturnValue"].options[2].text;
        //陳會別
        document.all["cbComeOthers"].checked = true;
        document.all["dlComeOthers"].value = document.all["lbReturnValue"].options[3].text;
        document.all["txComeOthers"].value = document.all["lbReturnValue"].options[3].text;
        //來文機關
        document.all["txFromOrgName1"].value = document.all["lbReturnValue"].options[4].text;
        //設定自動完成元件顯示
        document.all.txAutoOrgName1.value = document.all["lbReturnValue"].options[4].text;
        if (document.all["lbReturnValue"].options[4].text == "")
        {
            document.all.txAutoOrgName1.value = document.all["lbReturnValue"].options[5].text;
            document.all["txFromOrgName1"].value = document.all["lbReturnValue"].options[5].text;
        }
        //來文機關代碼
        document.all["txFromOrgNo1"].value = document.all["lbReturnValue"].options[5].text;
        document.all["txOrgNoOthers"].value = document.all["lbReturnValue"].options[5].text;
        //主旨
        document.all["txSubject"].value = document.all["lbReturnValue"].options[6].text;

        //1050506 David 修正帶入外陳外會公文資訊時帶回文別
        //1100518 David 1090821 配合外陳外會驗證，移除不需要的功能
        //var cate = document.all["lbReturnValue"].options[9].text;
        //ddlSelect("ddlCategory", cate);

        //速別
        if (document.all["lbReturnValue"].options[7].text != "")
        {
            ddlSelectSpd("ddlSpeed", document.all["lbReturnValue"].options[7].text);
        }
        //取得限辦期限
        ddlSpeed_onchange();

        //觸發ddlSect onchange事件以取得正確的欄位顯示方式
        ddlSec_onchange();

        //來源別
        ddlSelect("ddlSource", "E");
        document.all.ddlSource.value = "E";
        ddlSource_onchange();
        document.all["ddlSource"].disabled = true;
        //來源別註記
        if (document.all["lbReturnValue"].options[8].text != "")
        {
            var sRcvTypeDescValue = "E" + "," + jf_Trim(document.all["lbReturnValue"].options[8].text);
            document.all.dlRcvtypeDesc.value = sRcvTypeDescValue;
            dlRcvtypeDesc_onchange();
        }
        //線上簽核
        document.all.cbIsOnlineDoc.checked = true;

        //1051205 David 1050087 二代修改，調整setAttribute方式
        /*//將電子收文,Email載入,開啟,密件待登錄 Disable
        //電子收文
        var btElecRcvObj = getToolBarItemObjById("btElecRcv");
        if(btElecRcvObj != null)
            btElecRcvObj.setAttribute("disabled",true);
        //Email載入
        var btEmailObj = getToolBarItemObjById("btEmail");
        if(btEmailObj != null)
            btEmailObj.setAttribute("disabled",true);
        //掃描影像
        var btRcvScanObj = getToolBarItemObjById("btRcvScan");
        if(btRcvScanObj != null)
            btRcvScanObj.setAttribute("disabled",true);
        //開啟
        var btOpenObj = getToolBarItemObjById("btOpen");
        if(btOpenObj != null)
            btOpenObj.setAttribute("disabled",true);
        //搜尋
        var btSearchObj = getToolBarItemObjById("btSearch");
        if(btSearchObj != null)
            btSearchObj.setAttribute("disabled",true);
        //密件待登錄
        var btSecLoginObj = getToolBarItemObjById("btSecLogin");
        if(btSecLoginObj != null)
            btSecLoginObj.setAttribute("disabled",true);
        //公佈欄收文
        var btBulletinObj = getToolBarItemObjById("btBulletin");
        if(btBulletinObj != null)
            btBulletinObj.setAttribute("disabled",true);
        //陳核會稿
        var btComeOthersObj = getToolBarItemObjById("btComeOthers");
        if(btComeOthersObj != null)
            btComeOthersObj.setAttribute("disabled",true);*/
        //電子收文
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btElecRcv').attr('disabled', true);
        $('#btElecRcv').prop('disabled', true);
        //Email載入
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btEmail').attr('disabled', true);
        $('#btEmail').prop('disabled', true);
        //掃描影像
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btRcvScan').attr('disabled', true);
        $('#btRcvScan').prop('disabled', true);
        //開啟
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btOpen').attr('disabled', true);
        $('#btOpen').prop('disabled', true);
        //搜尋
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btSearch').attr('disabled', true);
        $('#btSearch').prop('disabled', true);
        //密件待登錄
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btSecLogin').attr('disabled', true);
        $('#btSecLogin').prop('disabled', true);
        //公佈欄收文
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btBulletin').attr('disabled', true);
        $('#btBulletin').prop('disabled', true);
        //陳核會稿
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btComeOthers').attr('disabled', true);
        $('#btComeOthers').prop('disabled', true);
        //線上申辦
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btHyWeb').attr('disabled', true);
        $('#btHyWeb').prop('disabled', true);
    }

    if (argCallerId == "ODT137")
    {
        //0970450	紀錄由ODT137帶回
        bChildWin = true;
        //document.all["txDocNo"].value = document.all["lbReturnValue"].options[0].text;
        document.all["txSubject"].value = document.all["lbReturnValue"].options[1].text;
        //Yvonne	0970428 0970530 紀錄主旨
        tempSubject = document.all["txSubject"].value;
        tempSubject2 = document.all["txSubject"].value;
        document.all["txFromDate"].value = document.all["lbReturnValue"].options[2].text;
        ddlSelect("ddlCategory", document.all["lbReturnValue"].options[3].text);
        ddlSelectSpd("ddlSpeed", document.all["lbReturnValue"].options[4].text);
        //ddlSelectSpd("ddlProperty",document.all["lbReturnValue"].options[5].text);
        document.all["txFromNo1"].value = document.all["lbReturnValue"].options[6].text;
        //0990826 David 0990312 來文字欄位改為ComboBox
        //document.all["txFromWord1"].value = document.all["lbReturnValue"].options[7].text;
        document.all["dlFromWord1_Text"].value = document.all["lbReturnValue"].options[7].text;
        document.all["txFromOrgNo1"].value = document.all["lbReturnValue"].options[8].text;
        //0990826 David 0990312 設定自動完成元件顯示
        document.all["txAutoOrgName1"].value = document.all["lbReturnValue"].options[8].text;
        document.all["H_txBulletinID"].value = document.all["lbReturnValue"].options[9].text;

        //1051205 David 1050087 二代修改，調整setAttribute方式
        /*//將電子收文,Email載入,開啟,密件待登錄 Disable
        //電子收文
        var btElecRcvObj = getToolBarItemObjById("btElecRcv");
        if(btElecRcvObj != null)
            btElecRcvObj.setAttribute("disabled",true);
        //Email載入
        var btEmailObj = getToolBarItemObjById("btEmail");
        if(btEmailObj != null)
            btEmailObj.setAttribute("disabled",true);
        //掃描影像
        var btRcvScanObj = getToolBarItemObjById("btRcvScan");
        if(btRcvScanObj != null)
            btRcvScanObj.setAttribute("disabled",true);
        //開啟
        var btOpenObj = getToolBarItemObjById("btOpen");
        if(btOpenObj != null)
            btOpenObj.setAttribute("disabled",true);
        //搜尋
        var btSearchObj = getToolBarItemObjById("btSearch");
        if(btSearchObj != null)
            btSearchObj.setAttribute("disabled",true);
        //密件待登錄
        var btSecLoginObj = getToolBarItemObjById("btSecLogin");
        if(btSecLoginObj != null)
            btSecLoginObj.setAttribute("disabled",true);
        //公佈欄收文
        var btBulletinObj = getToolBarItemObjById("btBulletin");
        if(btBulletinObj != null)
            btBulletinObj.setAttribute("disabled",true);*/
        //電子收文
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btElecRcv').attr('disabled', true);
        $('#btElecRcv').prop('disabled', true);
        //Email載入
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btEmail').attr('disabled', true);
        $('#btEmail').prop('disabled', true);
        //掃描影像
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btRcvScan').attr('disabled', true);
        $('#btRcvScan').prop('disabled', true);
        //開啟
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btOpen').attr('disabled', true);
        $('#btOpen').prop('disabled', true);
        //搜尋
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btSearch').attr('disabled', true);
        $('#btSearch').prop('disabled', true);
        //密件待登錄
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btSecLogin').attr('disabled', true);
        $('#btSecLogin').prop('disabled', true);
        //公佈欄收文
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btBulletin').attr('disabled', true);
        $('#btBulletin').prop('disabled', true);
        //陳核會稿
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btComeOthers').attr('disabled', true);
        $('#btComeOthers').prop('disabled', true);
        //線上申辦
        //1080905 Kevin 1080339 JQuery升級調整寫法
        //$('#btHyWeb').attr('disabled', true);
        $('#btHyWeb').prop('disabled', true);

        //將電子檔開啟設為Enable
        SetControlEnable("btOpenElec");
        //1031002 Eric 1030714  設定明細按鈕Enable
        SetControlEnable("btDetail");

        //0990820 David 0990438 來源別為「電子公布欄」
        ddlSelect("ddlSource", "T");
        document.all.ddlSourceText.value = "T";

        ddlSource_onchange();
        //1001018 kevin [1000602] 新增來源別註記
        dlRcvtypeDesc_onchange();
        GetSumType();
    }

    //0991027 David 新增實體附件註記回傳處理
    if (argCallerId == "EDI070")
    {
        document.all["txRcvAttNo"].value = document.all["lbReturnValue"].options[0].value;
        document.all["txAttDesc"].value = document.all["lbReturnValue"].options[1].value;
    }

    //1001128 David 1000973 新增線上申辦網頁回傳處理
    if (argCallerId == "HYWEB")
    {
        //公文文號
        document.all["txDocNo"].value = document.all["lbReturnValue"].options[0].text;
        if (document.all["txDocNo"].value != "")
        {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
    }

    //1140610 Kevin 1140382 支援介接公文分文功能
    if (argCallerId == "EDT144")
    {
        document.all["H_txCaseDocTempGuid"].value = document.all["lbReturnValue"].options[1].value;
        if (document.all["H_txCaseDocTempGuid"].value != "")
        {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
    }

    //1130626 Kevin 1130291 支援AI預設承辦單位
    if ((argCallerId == "ODT130C3" || argCallerId == "RD-DocCompare") && sessionStorage.UserSelectType)
    {
        if (sessionStorage.UserSelectType == '0')
        {
            u_SimilarDocNo = sessionStorage.UserSelectDocNo;
            sessionStorage.clear();

            DlgClose();

            var strUrl = `/MS/RD-DocCompare.html`;
            jf_ShowModal(strUrl);
            Page_BlockSubmit = true;
        }
        else
        {
            let deptNo = sessionStorage.UserSelectDeptNo;
            let deptName = sessionStorage.UserSelectDeptName;

            SetCcbDept(deptNo, deptName);

            //1130830 Kevin 1130291 修正從子視窗帶回無法觸發信心顏色變換問題
            $("#dlDEPT").combobox("setTextCss", "dlDEPT_Text");
        }
    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

function ddlSelectSpd(argSelectId, argSelectValue)
{
    if (argSelectValue == "")
        return;
    for (var i = 0; i < document.all[argSelectId].length; i++)
    {
        //1040630 David 1040517 因速別選單VALUE修改為僅記錄代碼，調整判斷邏輯
        if (argSelectId == "ddlSpeed")
        {
            if (document.all[argSelectId].options[i].value == argSelectValue)
            {
                document.all[argSelectId].selectedIndex = i;
                break;
            }
        }
        else
        {
            if (document.all[argSelectId].options[i].value.substr(0, 1) == argSelectValue)
            {
                document.all[argSelectId].selectedIndex = i;
                break;
            }
        }
    }
}

function ddlSelect(argSelectId, argSelectValue)
{
    if (argSelectValue == "")
        return;
    for (var i = 0; i < document.all[argSelectId].length; i++)
    {
        if (document.all[argSelectId].options[i].value == argSelectValue)
        {
            document.all[argSelectId].selectedIndex = i;
            break;
        }
    }
}

function ClientOnLoad()
{
    ShowMsg();
    //1020329 Kevin 1011032 預先呼叫WS
    //1050706 David 1050087 二代修改
    /*jf_CallWS("lib/TIME_LIB.asmx", "BubbleFun", false, null); //First Call Time_lib
    jf_CallWS("template/lib/sys.asmx", "CheckDataKeyDuplicate", false, null);//共用function jf_CheckDataExist必要
    jf_CallWS("lib/OD_LIB.asmx","HelloWorld",false,null);
    jf_CallWS("lib/AK_LIB.asmx", "GetDeptAllUsers", false, null);
    jf_CallWS("lib/WEOrgInfo.asmx","GetOrgInfo",false,null);
    jf_CallWS("ODT130WS.asmx","ExecSendXml",false,null);*/
    //設定公文類別、速別等欄位處理
    ddlProperty_init();
    //設定電子檔開啟、設定鍵
    ddlSource_onchange();
    //1001018 kevin [1000602] 新增來源別註記
    dlRcvtypeDesc_onchange();
    //設定
    document.all["H_Value"].value = document.all["dlDEPT_Text"].value;
    //Yvonne	0970428 0970530 紀錄單位
    tempDept = document.all["H_Value"].value;
    tempDept2 = document.all["H_Value"].value;
    //[955079變更需求單] 初始時先儲存承辦資訊下拉式選單Text的值 Charles 0950919
    document.all["H_Sect_Value"].value = document.all["dlSECT_Text"].value;
    document.all["H_User_Value"].value = document.all["dlUSER_Text"].value;
    document.all["H_DeptNo_Value"].value = odjf_GetSelectValue(document.all["dlDEPT"], document.all["H_Value"].value);
    document.all["H_SectNo_Value"].value = odjf_GetSelectValue(document.all["dlSECT"], document.all["H_Sect_Value"].value);
    document.all["H_UserNo_Value"].value = odjf_GetSelectValue(document.all["dlUSER"], document.all["H_User_Value"].value);
    //[955079變更需求單] 初始時先儲存承辦資訊下拉式選單所有項目值 Charles 0950919
    document.all.H_dlSect_Value.value = odjf_SaveCurrDL(document.all["dlSECT"]);
    document.all.H_dlUser_Value.value = odjf_SaveCurrDL(document.all["dlUSER"]);
    //Yvonne 000267	H_IsOpenSubject 紀錄系統參數 OD_ODT130_OPENSUBJECT的設定值
    if (document.all.H_IsOpenSubject.value == "Y")
        CheckOpenSubject();
    //進行公文夾處理
    oTimerId = setInterval("fnAfterPageLoad()", 10);
    //2004-06-17 add
    //ddlDocSource_onchange();

    //ddlSec_onchange(); //ddlSec_onchange改成在Server OnLoad時處理 #2005.12.21 Andy
    jf_SetReadOnlyIfLock();
    SetPAQReadOnly();//0980129
    GetSumType();//0980129
    /*****************************************************************************************
    * 0970117 Yvonne 環保局結合條碼機列印
    * ***************************************************************************************/
    if (document.all.FILE_OPEN.value == "N")
        document.getElementById("ck1").style.display = "none";//隱藏DIV

    if (document.all.cbPrBar.checked && document.all.FILE_OPEN.value == "Y")
    {
        document.all["FILE_OPEN"].value = "N";
        //0990310 David 0990021 桃環保新的條碼機整合--START
        if (!document.all.NEW_BARCODE)
        {
            if (document.all.WEB_FILE_PATH != undefined)
                OpenBarWin(document.all.WEB_FILE_PATH.value + document.all.FILE_NAME.value);
        }
        else
        {
            if (document.all.H_BarCode.value != "")
            {
                var strBarCodeInfo = document.all.H_BarCode.value;
                var ArrBarCodeInfo = strBarCodeInfo.split(",");
                //1080214	Joe		1080179			弱掃修正Hardcoded Absolute Path
                // var strPath = "C:\\TEMP";
                var strPath = document.all.BarCodePath.value;
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                //判斷產出目錄是否存在
                if (!fso.FolderExists(strPath))
                    fso.CreateFolder(strPath);
                strPath += "\\PRINTBAR";
                if (!fso.FolderExists(strPath))
                    fso.CreateFolder(strPath);
                var FullPath = "";
                //0990923 David 0990435 新增疾管局條碼列印功能
                //1020723 David 1000751 配合組改調整，將判斷機關代碼行為改用隱藏欄位提供的OrgNickName判斷
                //if(document.all.h_OrgNo.value == "327150000I")
                if (document.all.OrgNickName.value == "CDC")
                {
                    if (ArrBarCodeInfo[1] != null && ArrBarCodeInfo[1] != "")
                        FullPath = strPath + "\\" + ArrBarCodeInfo[1] + ".rcv";
                    else
                        FullPath = strPath + "\\PRINT.rcv";
                    var fin = fso.CreateTextFile(FullPath, true);
                    fin.WriteLine(strBarCodeInfo);
                    fin.Close();
                }
                else
                {
                    //產出檔案
                    if (ArrBarCodeInfo[1] != null && ArrBarCodeInfo[1] != "")
                        FullPath = strPath + "\\" + ArrBarCodeInfo[1] + ".txt";
                    else
                        FullPath = strPath + "\\PRINT.txt";
                    var fin = fso.CreateTextFile(FullPath, true);
                    fin.WriteLine(strBarCodeInfo);
                    fin.Close();
                }
                document.all.H_BarCode.value = "";
            }
        }
        //END
    }
    //0991212	Yvonne	CDC由選單開啟EDT190做移文註記(因為要輸入移文原因，但目前由本作業開啟EDT190儲存關閉後，本作業移文選項未被連動勾選，導致資料誤存)
    if (document.all.h_OrgNo.value == "327150000I")
    {
        /*
        document.getElementById("cbAssign").style.display="none";
        document.getElementById("dlAssignOrg").style.display="none";
        document.getElementById("btCancelVerson").style.display="none";
        */
        document.getElementById("Assign_1").style.display = "none";
        document.getElementById("Assign_2").style.display = "none";
    }
    //0970325	Yvonne 隱藏郵件號碼
    if (document.all.H_MAILRCV_SHOW.value == "N")
    {
        document.getElementById("ck2").style.display = "none";//隱藏DIV
        document.getElementById("ck3").style.display = "none";//隱藏DIV
    }
    //Yvonne	0970428 0970530 紀錄主旨
    tempSubject = document.all.txSubject.value;
    tempSubject2 = document.all.txSubject.value;
    //ODT134、ODT137帶回時不會執行到ClientOnLoad，但在CallBack時將此變數存為true。
    //以hScanSYSID判斷是否由ODT136帶回的
    if (jf_Trim(document.all.hScanSYSID.value) != "")
        bChildWin = true;
    else
        bChildWin = false;
    if (document.all.DeptRcvMsgOpen)
    {
        DeptRcvMsgOpen();
        ddlSpeed_onchange();
        ddlSource_onchange();
        //1001018 kevin [1000602] 新增來源別註記
        dlRcvtypeDesc_onchange();
        dlWorkType_onchange();
        GetStepName();
    }
    if (document.all.H_AutoOpenFolderDir)
    {
        if (document.all["H_AutoOpenFolderDir"].value == "") //電子來文卻無封裝檔則不允許跑線上簽核
            document.all.cbIsOnlineDoc.disabled = true;
    }

    //0990729 David 0990318 紀錄原始收文日期
    document.all.H_txRcvDate.value = document.all.txRcvDate.value;

    //0990826 David 0990312 設定自動完成元件
    document.all.txAutoOrgName1.UserID = document.all.h_UserId.value;
    document.all.txAutoOrgName2.UserID = document.all.h_UserId.value;
    document.all.txAutoOrgName3.UserID = document.all.h_UserId.value;
    document.all.txAutoOrgName1.OrgID = document.all.h_OrgNo.value;
    document.all.txAutoOrgName2.OrgID = document.all.h_OrgNo.value;
    document.all.txAutoOrgName3.OrgID = document.all.h_OrgNo.value;

    //0990826 David 0990312 若txFromOrgNo或txFromOrgName有值時，設定至元件中	
    if (document.all.txFromOrgNo1.value != "" || document.all.txFromOrgName1.value != "")
    {
        document.all.txAutoOrgName1.value = document.all.txFromOrgNo1.value
        if (document.all.txFromOrgName1.value != "")
            document.all.txAutoOrgName1.value = document.all.txFromOrgName1.value
        txFromOrgNo1_onblur();
    }
    if (document.all.txFromOrgNo2.value != "" || document.all.txFromOrgName2.value != "")
    {
        document.all.txAutoOrgName2.value = document.all.txFromOrgNo2.value
        if (document.all.txFromOrgName2.value != "")
            document.all.txAutoOrgName2.value = document.all.txFromOrgName2.value
        txFromOrgNo2_onblur();
    }
    if (document.all.txFromOrgNo3.value != "" || document.all.txFromOrgName3.value != "")
    {
        document.all.txAutoOrgName3.value = document.all.txFromOrgNo3.value
        if (document.all.txFromOrgName3.value != "")
            document.all.txAutoOrgName3.value = document.all.txFromOrgName3.value
        txFromOrgNo3_onblur();
    }

    //0990819 David 0990438	H_IsOpenFromOrg 紀錄系統參數 OD_ODT130_OPENFROMORG的設定值
    if (document.all.H_IsOpenFromOrg.value == "Y" || (document.all.txAutoOrgName3.value != "" || document.all.txAutoOrgName2.value != ""))
        CheckOpenFromOrg("2");
    else
        CheckOpenFromOrg("1");

    //1120522 Kevin 銓敘部36.37 調整來文機關、字號欄位寬度
    if (document.all.OrgNickName.value == "MOCS")
    {
        $('#txAutoOrgName1').css('width', '22em');
        $('#txFromOrgNo1').css('width', '40em');
        $('#txAutoOrgName2').css('width', '22em');
        $('#txFromOrgNo2').css('width', '40em');
        $('#txAutoOrgName3').css('width', '22em');
        $('#txFromOrgNo3').css('width', '40em');
    }

    //1040119 Eric 1040033 新增呼叫人團系統WS
    //1040303 David 1040033 呼叫人團系統WS改由Server端叫用，此處MARK
    /*if(document.all.MOI_GROUP_WSURL && document.all.MOI_GROUP_WSURL.value != "")
    {
        CallMoiWs();
    }*/

    //0990826 David 0990312 初始化詞庫下載元件
    //1050706 David 1050087 二代修改
    /*(document.all.H_WeDictsyncWsdl && document.all.H_WeDictsyncWsdl.value != "")
    {
        var dsync = new ActiveXObject("DictSync.Synchronizer");
        //1031024 Eric 新增傳入機關代碼
        dsync.OrgID = document.all.h_OrgNo.value;
        dsync.INIFile = "C:\\2100\\公文製作\\ED21.ini";
        dsync.WSDL = document.all.H_WeDictsyncWsdl.value;
    }*/

    //0991228	[0991055]	Bill	因應CDC現場要求承辦人的下拉選單依照姓名筆劃排序
    fnUserSort();

    //1020322	Jagle	[1020042]	增加二級單位下拉選單無值不顯示設定
    jf_HandleComboxStatus("dlSECT");
    //1031002 Eric 1030714  新增模式下使用者擁有OD_ODT134_AUTOOPEN權力時開啟、傳送、儲存、取消後自動開啟ODT134
    if (jf_GetActionMode() == LayoutModeNew)
    {
        if (document.all["H_txODT134AutoOpen"].value == "Y")
        {
            var strUrl = "";
            strUrl = "ODT134.aspx";
            jf_OpenChildWin(strUrl, "ODT134", 1000, 470);
        }
    }
    //1080122 Kevin 1080049 弱掃修正Reflected XSS Specific Clients
    //1080214	Joe		1080179		弱掃修正Client Potential XSS--S
    // var div = document.createElement('div');
    // div.innerHTML = document.all["txEmail"].value;
    // document.all["txEmail"].value = div.textContent;.
    document.all["txEmail"].value = document.all["txEmail"].value.replace("&lt;", "<").replace("&gt;", ">").replace("&quot;", "\"");
    //1080214	Joe		1080179		弱掃修正Client Potential XSS--E

    //1110927 Kevin 1110880 新增任審資訊介接
    //1120720 Kevin 問題112 onload不調整公文性質避免其他時效欄位重設
    //ddlProperty_onchange();
    if (document.all.OrgNickName.value == "MOCS") 
    {
        var ddlValue = encodeURI(document.all.ddlProperty.options[document.all.ddlProperty.selectedIndex].value);
        var ddlValueArray = ddlValue.split(",");
        SetMocsBtTaInfo(ddlValueArray[0]);
        OpenMocsTaInfo(ddlValueArray[0]);
    }

    //1130626 Kevin 1130291 支援AI預設承辦單位
    if (document.all.h_Infrdeptno && document.all.h_Infrdeptname && document.all.h_txConfLight)
        InitConfColor(document.all.h_Infrdeptno.value, document.all.h_Infrdeptname.value, document.all.h_txConfLight.value);

    SetBtSimilarDocType();
}

function fnUserSort()
{
    //0991228	[0991055]	Bill	因應CDC現場要求承辦人的下拉選單依照姓名筆劃排序
    //-----start-----
    var dlUser = document.all["dlUSER"];
    arrSorted = new Array();//暫存與排序用的array
    //arrSorted[0] = "";//加一個空白選項//1000107	Bill	修掉多餘的空白
    for (var i = 0; i < dlUser.length; i++)
    {
        //array中index=0的位置已放空白選項，故從1開始存
        arrSorted[i] = dlUser.options[i].text;
        arrSorted[i] += "|";
        arrSorted[i] += dlUser.options[i].value;//將text與value串在一起，確保能一起sort，排完再分開
    }
    arrSorted.sort();
    for (var i = 0; i < dlUser.length; i++)
    {
        //分開text與value並存回comboBox
        dlUser.options[i].text = arrSorted[i].split("|")[0];
        dlUser.options[i].value = arrSorted[i].split("|")[1];

        //1000107	Bill	修掉多餘的空白
        if (dlUser.options[i].text == "")
        {
            var tempText = dlUser.options[0].text;
            var tempValue = dlUser.options[0].value;

            dlUser.options[0].text = dlUser.options[i].text;
            dlUser.options[0].value = dlUser.options[i].value;

            dlUser.options[i].text = tempText;
            dlUser.options[i].value = tempValue;
        }
    }
    //------end------
}

var iCallID_GetBTypeStep = null;
var iCallID_GetSumType = null;
var iCallID_GetBTypeNo = null;
var iCallID_GetWorkDate = null;
var iCallID_GetDocPty = null;//0970139 改以業務類別連動公文性質
function OnWSResult(argResult)
{
    if (argResult.id == wsGetWorkDateID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            document.all.txLimitDate.value = argResult.value.RtnWorkDate;
        }
    }
    else if (argResult.id == wsGetCaseTargetDateID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            document.all.txLimitDate.value = argResult.value.RtnField0[0];
        }
    }
    else if (argResult.id == wsCallHandleSendXML)
    {
    }
    else if (argResult.id == wsCallHandleSendXML)
    {
    }
    //2004-02-11 add*****
    else if (argResult.id == iCallID_GetBTypeStep)
    {
        if (jf_IsWebServiceSuccessNoAlert(argResult))
        {
            //clear 辦理階段 dlStepName
            ClearDL(document.all.dlStepName);

            if (argResult.value.IsErr || argResult.value.RtnStr == "")
            {
                document.all.dlStepName.disabled = true;
                document.all.dlStepName.options.add(new Option("", "")); //第一筆空白
                return false;
            }

            //alert(argResult.value.RtnStr);
            if (argResult.value.RtnStr != "")
            {
                document.all.dlStepName.disabled = false;

                var pTmpAry = argResult.value.RtnStr.split(":");

                //將值塞入 dlStepName
                if (pTmpAry.length >= 1)
                    document.all.dlStepName.options.add(new Option("", "")); //第一筆空白
                for (var i = 0; i < pTmpAry.length; i++)
                {
                    var objOption = new Option(pTmpAry[i], pTmpAry[i]);
                    document.all.dlStepName.options.add(objOption);
                }

                if (pTmpAry.length == 1)
                {
                    document.all.dlStepName.selectedIndex = 0;
                }
            }
            return true;
        }
    }
    else if (argResult.id == iCallID_GetBTypeNo)  //由公文性質取得業務類別
    {
        //0970139 ---start 取得Combobox物件
        var BTypeComboBoxObj = document.all["dlWorkType"];
        var BTypeComboBoxTextObj = document.all["dlWorkType_Text"];

        if (argResult.error)
            alert(argResult.errorDetail.string);
        else
        {
            if (jf_IsWebServiceSuccess(argResult))
                iCallID_GetBTypeNo = argResult.value;
        }
        var BType = BTypeComboBoxTextObj.value;

        //清空選項
        while (BTypeComboBoxObj.length > 0)
            BTypeComboBoxObj.remove(0);
        //0970139---END

        if (jf_IsWebServiceSuccessNoAlert(argResult))
        {
            //clear 辦理階段 dlStepName
            ClearDL(document.all.dlStepName);

            //clear 業務類別 dlWorkType
            ClearDL(document.all.dlWorkType);

            //window.status  ="STEP:"+argResult.value.RtnStr;
            //alert("test RtnStr:"+argResult.value.RtnStr);
            if (argResult.value.IsErr || argResult.value.RtnStr == "")
            {
                document.all.dlStepName.disabled = true;
                document.all.dlStepName.options.add(new Option("", "")); //第一筆空白

                //0970139 改為Combobox
                //document.all.dlWorkType.disabled=true;
                //document.all.dlWorkType.options.add(new Option("","")); //第一筆空白
                document.all.dlWorkType.disabled = true;
                BTypeComboBoxObj.options.add(new Option("", ""));
                BTypeComboBoxTextObj.value = ""; //第一筆空白
                BTypeComboBoxTextObj.disabled = true;
                BTypeComboBoxTextObj.style.backgroundColor = "LightGrey";
                return false;
            }
            if (argResult.value.RtnStr != "")
            {
                document.all.dlWorkType.disabled = false;
                document.all.dlStepName.disabled = false;

                var pTmpAry = argResult.value.RtnStr.split(":");

                //將值塞入 dlWorkType
                if (pTmpAry.length == 0)
                {
                    //document.all.dlWorkType.options.add(new Option("","")); //第一筆空白
                    //document.all.dlWorkType.selectedIndex = 0;
                    //0970139 改為Combobox
                    BTypeComboBoxObj.size = 2;
                    BTypeComboBoxObj.options.add(new Option("", ""));
                    BTypeComboBoxTextObj.value = "";//第一筆空白
                    document.all.dlWorkType.selectedIndex = 0;
                }
                else
                {
                    if (document.all.h_PtyChangeWithBns.value != "N")
                    {
                        BTypeComboBoxObj.options.add(new Option("", ""));
                        BTypeComboBoxTextObj.value = "";//第一筆空白
                    }

                    //2006.08.11 JEFF 單號950237 是否依照單位帶出業務類別
                    var pTmpAry3 = document.all.H_txUserDept.value.split(",");

                    //1030716 David 1030406 紀錄畫面承辦單位是否有資料(紀錄一級單位代碼)
                    var strNowDeptNo = "";
                    if (document.all["H_DeptNo_Value"].value != "")
                    {
                        strNowDeptNo = document.all["H_DeptNo_Value"].value.split(':')[0];
                    }

                    //1091124 Kevin [1090850] 新增二級單位判斷
                    var strNowOuId = "";
                    var arrH_Value;

                    if (document.all.H_OD_DEPTDDL_WITH_SUBUNIT.value == "Y" && document.all.H_Value.value != "")
                        arrH_Value = document.all.H_Value.value.split(":");
                    else
                        arrH_Value = document.all["H_SectNo_Value"].value.split(":");

                    if (arrH_Value.length >= 4)
                        strNowOuId = arrH_Value[2] != "" ? arrH_Value[2] : arrH_Value[0];
                    else if (arrH_Value.length > 0)
                        strNowOuId = arrH_Value[0];

                    for (var i = 0; i < pTmpAry.length; i++)
                    {
                        var pTmpAry2 = pTmpAry[i].split(",");
                        //單位登記桌
                        if ((document.all.H_txGetBType.value == "Y") && (pTmpAry3[0] == "N"))
                        {
                            //1091124 Kevin [1090850] 業務類別區分單位新增支援二級單位設定
                            //if (pTmpAry2[2] == pTmpAry3[1])
                            //1130118 Kevin 1120896 修正業務類別支援二級單位設定異常
                            //if ((pTmpAry2[2].length == 2 && pTmpAry2[2] == pTmpAry3[1].Substring(0, 2)) || (pTmpAry2[2].length != 2 && pTmpAry2[2] == pTmpAry3[1])) //pTmpAry3[1] ActiveRole單位資訊
                            if ((pTmpAry2[2].length == 2 && pTmpAry2[2] == pTmpAry3[1].substring(0, 2)) || (pTmpAry2[2].length != 2 && pTmpAry2[2] == pTmpAry3[1])) //pTmpAry3[1] ActiveRole單位資訊
                            {
                                //0970139 業務類別改為combobox 前面加上業務代碼
                                //var objOption = new Option(pTmpAry2[1], pTmpAry2[0]);
                                //document.all.dlWorkType.options.add(objOption);
                                var objOption = new Option(pTmpAry2[0] + " " + pTmpAry2[1], pTmpAry2[0]);
                                BTypeComboBoxObj.options.add(objOption);
                            }
                            else if (pTmpAry2[2] == document.all.SOURCE_ORGNO.value)
                            {
                                //0970139 業務類別改為combobox 前面加上業務代碼
                                //var objOption = new Option(pTmpAry2[1], pTmpAry2[0]);
                                //document.all.dlWorkType.options.add(objOption);
                                var objOption = new Option(pTmpAry2[0] + " " + pTmpAry2[1], pTmpAry2[0]);
                                BTypeComboBoxObj.options.add(objOption);
                            }
                        }
                        //總收
                        else if ((document.all.H_txGetBType.value == "Y") && (pTmpAry3[0] == "Y"))//1030716 David 1030406 修正行為同Server端GetBTypeNo()行為
                        {
                            if (pTmpAry2[2] == document.all.SOURCE_ORGNO.value)//全機關可用的內容
                            {
                                var objOption = new Option(pTmpAry2[0] + " " + pTmpAry2[1], pTmpAry2[0]);
                                BTypeComboBoxObj.options.add(objOption);
                            }
                            //1031024 Eric 1030786 增加判斷系統參數
                            //else if(strNowDeptNo != "" && pTmpAry2[2] == strNowDeptNo)//如畫面承辦單位有資料，新增設定該承辦單位可用的業務類別
                            //1091124 Kevin [1090850] 業務類別區分單位新增支援二級單位設定
                            //else if(strNowDeptNo != "" && pTmpAry2[2] == strNowDeptNo && document.all.H_GetBTypeNoByOuRule.value=="1")
                            else if (strNowDeptNo != "" && document.all.H_GetBTypeNoByOuRule.value == "1" && ((pTmpAry2[2].length == 2 && pTmpAry2[2] == strNowDeptNo) || (pTmpAry2[2].length != 2 && pTmpAry2[2] == strNowOuId)))
                            {
                                var objOption = new Option(pTmpAry2[0] + " " + pTmpAry2[1], pTmpAry2[0]);
                                BTypeComboBoxObj.options.add(objOption);
                            }
                        }
                        else
                        {
                            //0970139 業務類別改為combobox 前面加上業務代碼
                            //var objOption = new Option(pTmpAry2[1], pTmpAry2[0]);
                            //document.all.dlWorkType.options.add(objOption);
                            var objOption = new Option(pTmpAry2[0] + " " + pTmpAry2[1], pTmpAry2[0]);
                            BTypeComboBoxObj.options.add(objOption);
                        }
                    }
                    //2006.08.11 JEFF ---修改結束---

                    //1041222 David 1041030 修正當篩選後無可用的業務別時對應處理
                    if (document.all["dlWorkType"].options.length == 0)
                    {
                        BTypeComboBoxObj.size = 2;
                        BTypeComboBoxObj.options.add(new Option("", ""));
                        BTypeComboBoxTextObj.value = "";//第一筆空白
                        document.all.dlWorkType.selectedIndex = 0;
                    }
                    else
                    {
                        //0970139 依選項多寡固定下拉式選單可見長度
                        if (document.all["dlWorkType"].options.length > 5)
                            document.all["dlWorkType"].size = 5;
                        else
                            document.all["dlWorkType"].size = document.all["dlWorkType"].options.length;

                        document.all.dlWorkType.selectedIndex = 0;
                        document.all["dlWorkType_Text"].value = document.all["dlWorkType"].options[0].text;//0970139 改為Combobox
                        GetSumType();
                    }
                }
            }
            else
            {
                //0970139 改為Combobox
                //document.all.dlWorkType.options.add(new Option("","")); //第一筆空白
                //document.all.dlWorkType.selectedIndex = 0;
                BTypeComboBoxObj.size = 2;
                BTypeComboBoxObj.options.add(new Option("", ""));
                BTypeComboBoxTextObj.value = "";//第一筆空白
                document.all.dlWorkType.selectedIndex = 0;
            }
            return true;
        }
    }
    //0970139---start 以業務類別帶出公文性質和ODM310的主旨、單位
    /*
    Yvonne	0970530	0970428	修改連動邏輯如下：
    主旨：
        空白------------------------連動帶出
        不為空白---未改過主旨-------連動帶出
                ---改過主旨---------問是否要帶出
        預設主旨為空白--------------不連動帶出
    承辦單位：
        空白----------------------------連動帶出
        不為空白---未改過承辦單位-------連動帶出
                ---改過承辦單位---------問是否要帶出
        慣用承辦單位為空白--------------不連動帶出

    已傳送之公文不提供連動；由ODT134、ODT136、ODT137帶回不提供連動
    */
    else if (argResult.id == iCallID_GetDocPty)
    {
        if (jf_IsWebServiceSuccessNoAlert(argResult))
        {
            var DiffSubject = false;//主旨是否改過
            var DiffDept = false;//單位是否改過

            if (tempSubject != document.all.txSubject.value)
                DiffSubject = true;
            if (tempDept != document.all["dlDEPT_Text"].value)
                DiffDept = true;

            //公文性質
            //1110331 Kevin 1100324 修正公文性質排序變更問題
            //document.all.ddlProperty.selectedIndex = argResult.value.DocPty;
            var targetDocPty = argResult.value.DocPty;
            for (var iDl = 0; iDl < document.all.ddlProperty.length; iDl++)
            {
                var ddlValueArray = document.all.ddlProperty.options[iDl].value.split(",");
                var strDocPrty = ddlValueArray[0];
                if (strDocPrty == targetDocPty)
                {
                    document.all.ddlProperty.selectedIndex = iDl;
                    break;
                }
            }
            //098/04/14 0980129 Iris 業務類別連動公文性質 start
            ddlProperty_init();
            //098/04/14 0980129 end

            if (!bChildWin)//不是由ODT134、ODT136、ODT137帶回的話，要連動
            {
                //主旨
                if ((argResult.value.Subject != "" && document.all.txSubject.value == "" && document.all.dlDEPT.disabled == false) || (argResult.value.Subject != "" && DiffSubject == false && document.all.dlDEPT.disabled == false))
                {
                    if (tempSubject == tempSubject2)
                    {
                        document.all.txSubject.value = argResult.value.Subject;
                        tempSubject = document.all.txSubject.value;
                        tempSubject2 = document.all.txSubject.value;
                    }
                    else//combobox第二次觸發onblur事件時，若第一次選擇取消，不要帶主旨
                    {
                        tempSubject2 = document.all.txSubject.value;
                    }
                }
                else if (argResult.value.Subject != "" && DiffSubject == true)
                {
                    if (confirm("主旨已修改過，是否要使用預設主旨?"))
                    {
                        document.all.txSubject.value = argResult.value.Subject;
                        tempSubject = document.all.txSubject.value;
                        tempSubject2 = document.all.txSubject.value;
                    }
                    else
                    {
                        tempSubject = document.all.txSubject.value;
                        //tempSubject2 = document.all.txSubject.value;//不記主旨,切換業務類別(combobox)會觸發兩次onblur事件
                    }
                }

                //單位
                if ((argResult.value.DeptNo != "" && document.all["dlDEPT_Text"].value == "" && document.all.dlDEPT.disabled == false) || (argResult.value.DeptNo != "" && DiffDept == false && document.all.dlDEPT.disabled == false))
                {
                    if (tempDept == tempDept2)
                    {
                        document.all["dlDEPT_Text"].value = argResult.value.DeptName;
                        SetCbSelectedByValue(document.all["dlDEPT"], document.all["dlDEPT_Text"].value);
                        //0970903	0970930	Yvonne 修正條碼上的單位與系統紀錄單位不同的問題
                        uDeptChecked = false;
                        dlDEPT_Text_onblur(true);
                        tempDept = document.all["dlDEPT_Text"].value;
                        tempDept2 = document.all["dlDEPT_Text"].value;
                    }
                    else//combobox第二次觸發onblur事件時，若第一次選擇取消，不要帶單位
                    {
                        tempDept2 = document.all["dlDEPT_Text"].value;
                    }
                }
                else if (argResult.value.DeptNo != "" && DiffDept == true)
                {
                    if (confirm("承辦單位已修改過，是否要使用慣用承辦單位?"))
                    {
                        document.all["dlDEPT_Text"].value = argResult.value.DeptName;
                        SetCbSelectedByValue(document.all["dlDEPT"], document.all["dlDEPT_Text"].value);
                        //0970903	0970930	Yvonne 修正條碼上的單位與系統紀錄單位不同的問題
                        uDeptChecked = false;
                        dlDEPT_Text_onblur(true);
                        tempDept = document.all["dlDEPT_Text"].value;
                        tempDept2 = document.all["dlDEPT_Text"].value;
                    }
                    else
                    {
                        tempDept = document.all["dlDEPT_Text"].value;
                        //tempDept2 = document.all["dlDEPT_Text"].value;//不記單位,切換業務類別(combobox)會觸發兩次onblur事件
                    }
                }
            }
            return true;
        }
        else
            return false;
    }
    //0970139---end
    else if (argResult.id == iCallID_GetSumType) //業務類別離開改變時呼叫
    {
        if (jf_IsWebServiceSuccessNoAlert(argResult))
        {/*
			//Clear 辦理階段 (還不確定需不需要)
			for(var i=0 ; i<document.all.dlStepName.length;i++ )
				document.all.dlStepName.remove(0);
		*/
            if (argResult.value.IsErr)
            {
                document.all.dlStepName.disabled = true;
                document.all.dlStepName.options.add(new Option("", "")); //第一筆空白
                return false;
            }
            //1050706 David 1050087 二代修改
            document.all.dlWorkType_Text.value = document.all["dlWorkType"].options[document.all["dlWorkType"].selectedIndex].text;

            document.all.txSumTypeShow.value = GetSumTypeDesc(argResult.value.SumType);
            document.all.txSumType.value = argResult.value.SumType;
            document.all.txLtIncHd.value = argResult.value.LtIncHd;
            document.all.txLtBy.value = argResult.value.LtBy;
            document.all.txStartRule.value = argResult.value.StartRule; //起算日期處理原則
            document.all.txStartDateRule.value = argResult.value.StartDate; //起算日期計算原則
            document.all.txLeadTimeDB.value = argResult.value.LeadTimeDB;
            //1030703 David 1030365 新增紀錄業務類別之限辦日期計算邏輯是否需順延至工作日
            document.all.txDueRule.value = argResult.value.DueRule;

            //處理期限
            var strLeadTimeOpen = document.all.txLeadTimeOpen.value;
            var strStartDateOpen = document.all.txStartDateOpen.value;
            if (document.all.txLeadTimeOpen.value != "")
            {
                document.all.txLeadTime.value = strLeadTimeOpen;
                document.all.txLeadTimeOpen.value = "";
            }
            else
            {
                document.all.txLeadTime.value = argResult.value.LeadTimeDB;

                //計算單位 ("日","月")
                SetDlItemByText(document.all.dlLtUom, argResult.value.LtUom);
                document.all.txLtUom.value = argResult.value.LtUom;  //ZOEY [951311, 95/12/11]
            }

            //alert(argResult.value.LtBy);
            //alert(document.all.txStartDate.value);

            //起算日期
            if (argResult.value.StartRule != "3" && document.all.txLeadTime.value != "") //系統計算
            {
                if (document.all.txStartDateOpen.value != "")
                {
                    document.all.txStartDate.value = document.all.txStartDateOpen.value; //起算日期(系統計算的方式下才會有值)
                    document.all.txStartDateOpen.value = "";
                }
                else
                {
                    document.all.txStartDate.value = argResult.value.StartDateCalcBySys; //起算日期(系統計算的方式下才會有值)
                }
            }

            //if(argResult.value.LtBy == "I" && document.all.txStartDate.value !="") //使用者輸入
            document.all.txLtBy.value = argResult.value.LtBy;
            if (argResult.value.LtBy == "I") //使用者輸入
            {
                document.all.txMeetDate.value = "";
                //document.all.txLeadTime.value = "";
                document.all.dlLtUom.disabled = false;
                //1051223 David 1050087 二代修改，調整背景顏色設定方式
                //document.all.dlLtUom.style.backgroundColor = "FFFFFF";
                document.all.dlLtUom.style.backgroundColor = "#FFFFFF";
                document.all.txLeadTime.readOnly = false;
                //1051223 David 1050087 二代修改，調整背景顏色設定方式
                //document.all.txLeadTime.style.backgroundColor = "FFFFFF";
                document.all.txLeadTime.style.backgroundColor = "#FFFFFF";
                document.all.txMeetDate.readOnly = true;
                document.all.txMeetDate.style.backgroundColor = "LightGrey";
                //1050706 David 1050087 二代修改
                //SetControlDisable("btMeetDate");
                document.all.txLimitDate.readOnly = false;
                //1051223 David 1050087 二代修改，調整背景顏色設定方式
                //document.all.txLimitDate.style.backgroundColor = "FFFFFF";
                document.all.txLimitDate.style.backgroundColor = "#FFFFFF";
                //1050706 David 1050087 二代修改
                //SetControlEnable("btLimitDate");
            }
            else if (argResult.value.LtBy == "M") //enable 開會日期
            {
                if (document.all.TemplateMode.value == "0") //新增
                    document.all.txMeetDate.value = "";
                document.all.txLeadTime.readOnly = true;
                document.all.txLeadTime.style.backgroundColor = "LightGrey";
                document.all.dlLtUom.disabled = false;
                //1051223 David 1050087 二代修改，調整背景顏色設定方式
                //document.all.dlLtUom.style.backgroundColor = "FFFFFF";
                document.all.dlLtUom.style.backgroundColor = "#FFFFFF";
                document.all.txMeetDate.readOnly = false;
                //1051223 David 1050087 二代修改，調整背景顏色設定方式
                //document.all.txMeetDate.style.backgroundColor = "FFFFFF";
                document.all.txMeetDate.style.backgroundColor = "#FFFFFF";
                //1050706 David 1050087 二代修改
                //SetControlEnable("btMeetDate");
                document.all.txLimitDate.readOnly = true;
                document.all.txLimitDate.style.backgroundColor = "LightGrey";
                //1050706 David 1050087 二代修改
                //SetControlDisable("btLimitDate");
            }
            else //由系統計算
            {
                document.all.txMeetDate.value = "";
                document.all.dlLtUom.disabled = true;
                document.all.dlLtUom.style.backgroundColor = "LightGrey";
                document.all.txLeadTime.readOnly = true;
                document.all.txLeadTime.style.backgroundColor = "LightGrey";
                document.all.txMeetDate.readOnly = true;
                document.all.txMeetDate.style.backgroundColor = "LightGrey";
                //1050706 David 1050087 二代修改
                //SetControlDisable("btMeetDate");
                document.all.txLimitDate.readOnly = true;
                document.all.txLimitDate.style.backgroundColor = "LightGrey";
                //1050706 David 1050087 二代修改
                //SetControlDisable("btLimitDate");
            }

            //if(argResult.value.StartRule =="3" && document.all.txStartDate.value !="")  //人工輸入
            //1010426	Ivory	1010305	修正業務類別起算日期原則為系統計算可以修改時,起算日期應可以修改
            //if(argResult.value.StartRule =="3")  //人工輸入
            if (argResult.value.StartRule == "3" || argResult.value.StartRule == "2")  //人工輸入或由系統計算可以修改
            {
                //document.all.txStartDate.value = "";
                document.all.txStartDate.readOnly = false;
                //1051223 David 1050087 二代修改，調整背景顏色設定方式
                //document.all.txStartDate.style.backgroundColor = "FFFFFF";
                document.all.txStartDate.style.backgroundColor = "#FFFFFF";
                //1050706 David 1050087 二代修改
                //SetControlEnable("btStartDate");
            }
            else //系統計算
            {
                document.all.txStartDate.readOnly = true;
                document.all.txStartDate.style.backgroundColor = "LightGrey";
                //1050706 David 1050087 二代修改
                //SetControlDisable("btStartDate");
            }

            //1090628 Kevin 1090407 業務類別時效計算方式不依速別計算時，才預帶速別「4：」
            //1050219 David 1040836 切換公文性質為「一般公文限期辦畢」時，速別自動調整到「4：」
            var strDocPty = encodeURI(document.all.ddlProperty.options[document.all.ddlProperty.selectedIndex].value).split(",")[0];
            if (strDocPty == "2" && document.all.txLtBy.value != "S")
            {
                SetDlItemByValue(document.all.ddlSpeed, "4");
                //1130614 Zen 1130386 公文性質為一般公文限期辦畢時鎖定速別為空
                document.all.ddlSpeed.disabled = true;
            }
            //1071116 David 切換公文性質為非「一般公文限期辦畢」，且速別為「4：」時，將速別調整回普通件
            else if ((strDocPty != "2" || document.all.txLtBy.value == "S") && document.all.ddlSpeed.options[document.all.ddlSpeed.selectedIndex].value == "4")
            {
                SetDlItemByValue(document.all.ddlSpeed, "1");
            }

            //限辦日期
            //alert(argResult.value.DueDate);
            if (document.all.txStartDate.value != "")
            {
                if (strLeadTimeOpen == "" && strStartDateOpen == "")
                {
                    document.all.txLimitDate.value = argResult.value.DueDate;
                    txLeadTime_onblur();//0980129
                }
                else
                    txLeadTime_onblur();
            }

            //取得辦理階段
            if (!gOnLoad)
                GetStepName();

            return true;
        }
    }
    else if (argResult.id == iCallID_GetWorkDate) //帶出辦理期限
    {
        if (jf_IsWebServiceSuccessNoAlert(argResult))
        {
            if (argResult.value.IsErr)
            {
                return false;
            }

            document.all.txLimitDate.value = argResult.value.WorkDate;
            if (document.all.txLtBy.value == "S")
            {
                //0990127 David 0990019 依速別時，處理期限欄位應為速別天數
                if (jf_GetActionMode() == LayoutModeNew)
                    document.all.txLeadTime.value = argResult.value.LeadTime;
                else
                {
                    if (SpeedDay == "")
                        document.all.txLeadTime.value = argResult.value.LeadTime;
                    else
                        document.all.txLeadTime.value = SpeedDay;
                }
            }
            return true;
        }
    }
    else if (argResult.id == iCallID_ChkDuplicateDoc) //檢查來文機關+來文字+來文號 是否重覆
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            //0990301 David 0990022 修改重複收文判斷
            //if(argResult.value.RtnStr != "") 
            if (argResult.value.Repet) //是否重覆
            {
                var vMsg = "";
                //Zoey [000457, 96/04/04]職訓局不以來文機關為條件
                if (document.all.h_DeliveOrg.value == "N")
                    vMsg = "收文資料重覆!!\n\r\n\r您所輸入的來文字、來文號與公文文號 " + argResult.value.DocNo + " 相同";
                else
                    vMsg = "收文資料重覆!!\n\r\n\r您所輸入的來文機關、來文字、來文號與公文文號 " + argResult.value.DocNo + " 相同";

                //0990301 David 0990022 修改重複收文提示視窗內容--START
                vMsg += "\n\r\n\r公文詳細內容：";
                vMsg += "\n\r\n\r來文機關：" + argResult.value.OrgName;
                vMsg += "\n\r來文日期：" + argResult.value.FromDate;
                vMsg += "\n\r來  文  字：" + argResult.value.FromWord;
                vMsg += "\n\r來  文  號：" + argResult.value.FromNo;
                var Subject = argResult.value.Subject;
                if (Subject.length > 40)
                {
                    vMsg += "\n\r主        旨：" + Subject.substr(0, 20);
                    vMsg += "\n\r　        　　" + Subject.substr(20, 20) + "...";
                }
                else if (Subject.length > 20 && Subject.length <= 40)
                    vMsg += "\n\r主        旨：" + Subject.substr(0, 20) + "...";
                else
                    vMsg += "\n\r主        旨：" + Subject;

                var RcvType = "";
                var RcvTypeGet = false;
                if (argResult.value.RcvType != "")
                {
                    for (var i = 0; i < document.all.ddlSource.length; i++)
                    {
                        if (document.all.ddlSource.options[i].value == argResult.value.RcvType)
                        {
                            RcvType = document.all.ddlSource.options[i].text;
                            RcvTypeGet = true;
                        }
                        if (RcvTypeGet)
                            break;
                    }
                }
                vMsg += "\n\r來  源  別：" + RcvType;
                //END
                //Zoey [96/08/17, 001442]依SYSTEM_SET決定重覆收文是否可點選確認儲存傳送
                if (document.all.h_CanDuplicateRcv.value != "N")
                {
                    if (confirm(vMsg + "\n\r\n\r是否繼續儲存?"))
                    {
                        //1041223 David 1040838 繼續傳送時記錄重複來文資訊--START
                        document.all.txDmDocNo.value = argResult.value.DocNo;//公文文號
                        document.all.txDmOuName.value = argResult.value.OuName;//承辦單位
                        document.all.txDmEmpName.value = argResult.value.EmpName;//承辦人
                        document.all.txDmOrgName.value = argResult.value.OrgName;//來文機關
                        document.all.txDmFromWordNo.value = argResult.value.FromWord + "字第" + argResult.value.FromNo + "號";//來文字號
                        document.all.txDmSubject.value = argResult.value.Subject;//主旨
                        //1041223 David 1040838 繼續傳送時記錄重複來文資訊--END

                        return true;
                    }
                    else
                        return false;
                }
                else
                {
                    alert(vMsg);
                    return false;
                }
            }

            return true;
        }
        else
        {
            return false;
        }
    }
    //*****
    //2004-06-17 added *****
    else if (argResult.id == iCallID_GetDefaultSubject)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (argResult.value.RtnStr != "")
            {
                document.all.txSubject.value = argResult.value.RtnStr;
                return true;
            }
        }
        return false;
    }
    //***** 2004-07-07 add
    else if (argResult.id == iCallID_GetWorkDays) //帶出辦理天數
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (argResult.value.RtnStr == "0")
            {
                alert("限辦日期不可小於起算日期，請重新輸入");
                return false;
            }

            //1040226 David 1040117 取得補充天數
            var iFullAddTime = 0;
            if (document.all.hcom_no)//修改模式才會有此欄位，才須扣除補充天數
            {
                var paramFullAddTime = new Array(6);
                paramFullAddTime[0] = document.all.SOURCE_ORGNO.value;
                paramFullAddTime[1] = document.all.txDocNo.value;
                paramFullAddTime[2] = "";
                paramFullAddTime[3] = document.all.hcom_no.value;
                paramFullAddTime[4] = document.all.txSumType.value;
                paramFullAddTime[5] = document.all.OD_DOC_PTY_5_MODE.value;
                callObj = jf_CallWS("lib/OD_LIB.asmx", "fnGetFullLeadTime", false, paramFullAddTime);
                if (!callObj.error)
                {
                    if (parseInt(callObj.value) != "NaN")
                        iFullAddTime = parseInt(callObj.value);
                }
            }

            //1040226 David 1040117 依限辦日期計算辦理天數時，須扣除補充天數(展期+補件+外陳外會天數)
            //document.all.txLeadTime.value = argResult.value.RtnStr;
            var iFullLeadTime = parseInt(argResult.value.RtnStr) - iFullAddTime;
            document.all.txLeadTime.value = iFullLeadTime;
            document.all.dlLtUom.selectedIndex = 0;//設定單位為天

            return true;
        }
    }
    //*****2005-04-15 add by CAESAR
    else if (argResult.id == iCallID_GetRcvAttDesc) //帶出附件註記
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            if (argResult.value.RtnStr != "")
            {
                document.all.txAttDesc.value = argResult.value.RtnStr;
                return true;
            }
            else
            {
                document.all.txAttDesc.value = "";
                return false;
            }
        }
        return false;
    }
    else if (argResult.id == iCreateTempUnvFile) // 0950912 Stella 呼叫ODT130WS產生UNV檔部分
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            //1050817		Leslie[1050087]		二代升級，變更UNV回傳格式為JSON字串，並取消ActiveX元件之使用
            /*
            if(argResult.value.FilePath != "" && argResult.value.FileName != "")
            {
                var serviceURL = jf_Trim(document.all.H_txAPWebFileIO.value);
                if(serviceURL == "")
                    return false;
                var TempUnvFilePath = new ActiveXObject("WSWrapper.WebFileIO");
                //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
                if ( document.all.II_USE_SSL != null )
                {
                    if ( document.all.II_USE_SSL.value == "Y" )
                        serviceURL = serviceURL.replace("http://", "https://") ;
                }
                //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
                try
                {	
                    TempUnvFilePath.Init(serviceURL);
                    var TempPath = "C:\\temp";
                    var fso = new ActiveXObject("Scripting.FileSystemObject");
                    if(!fso.FolderExists(TempPath))
                        fso.CreateFolder(TempPath);
                    TempPath += "\\";
                    TempUnvFilePath.AddFile(argResult.value.FilePath, argResult.value.FileName);
                    TempUnvFilePath.Download(document.all.CurrArtifact.value, false, TempPath);
                    var oShell = new ActiveXObject("Shell.Application");
                    var commandtoRun = TempPath + argResult.value.FileName;
                    oShell.ShellExecute(commandtoRun, "", "", "", "0");
                //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
                }
                catch(e)
                {
                    var strErrMsg = e.message;		
                    if (TempUnvFilePath.hasError)
                        strErrMsg += TempUnvFilePath.ErrorMessage;
                    alert("連接伺服器"+serviceURL+"下載檔案發生錯誤，錯誤訊息為:"+strErrMsg);
                }
                //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
            }*/
            if (argResult.value.UnvJSON != "")
            {
                var UnvObj = JSON.parse(argResult.value.UnvJSON);
                var objViewDoc = {
                    UNVObj: UnvObj,
                    docInfoPage: "AKI802",
                    openDocModule: 'UniView',
                    signType: "P",
                    readOnlyMode: true
                }
                var $docId = jf_GetSessionID() + "_" + (+new Date());
                localStorage['viewDoc_out_' + $docId] = JSON.stringify(objViewDoc);
                var unvUrl = location.origin + "/MS/RD-ViewDoc.html?Artifact=" + jf_GetArtifact() + "&DocId=" + $docId;
                jf_OpenChildWin(unvUrl, "ODT130ViewDoc");
            }
            //1050817		Leslie[1050087]		二代升級，變更UNV回傳格式為JSON字串，並取消ActiveX元件之使用	--END--
            else
                alert("無符合格式之影像檔可供瀏覽");
        }
        return false;
    }
}

function jf_DropDownListOnClick(argTextBoxId, argDDLId, argLabelId)
{
    var index = document.all[argDDLId].selectedIndex;
    var obj = document.all[argDDLId].options[index];

    document.all[argTextBoxId].value = obj.text;
    //1050706 David 1050087 二代修改
    //document.all[argLabelId].innerText = obj.value;
    document.all[argLabelId].textContent = obj.value;
}

//###############################################################################
//						Server端Register之Function
//###############################################################################
function setComboxState(State, argObj)
{

}


function ddlSec_onchange()
{
    //設定隱藏欄位的值
    document.all.ddlSecText.value = GetDDLValue(document.all.ddlSec, 0);
    //密等設定為非普通件
    if (document.all.ddlSec.options[document.all.ddlSec.selectedIndex].value != "1")
    {
        if (jf_Trim(document.all.txSubject.value) == "" && document.all.SEC_AUTO_SUBJECT.value == "Y")
            document.all.txSubject.value = "密不錄由";
        //1050706 David 1050087 二代修改
        //document.all.dlRmvSec_Cond.disabled = false;
        //document.all.dlRmvSec_Cond_Text.disabled = false;
        //document.all.dlRmvSec_Cond_Text.style.backgroundColor = "FFFFFF";
        $('#dlRmvSec_Cond').combobox('setEnable');

        //0961120 Yvonne 拿掉解密別
        //document.all.dlRmvSecCode.disabled = false;
        //document.all.dlRmvSecCode.style.backgroundColor = "FFFFFF";

        //document.all["dlRmvSec_Cond_Container"].className = "custom-combobox";

        //950904 95.10.17 David 當選擇為密以上條件時，檢核解密條件為必填欄位
        //此時className改為RequireField
        if (IsCheckSec)
            document.all["Label39"].className = "RequireField";

        //1120216 Kevin 銓敘部120 新增應解密日期
        SetControlEnable("txExtRmvSecDate");

        //不具有密件權
        if (document.all.IsSecRight.value == "N")
        {
            //收文日期
            SetControlDisable("txRcvDate");
            //公文類別
            SetControlDisable("ddlProperty");
            //來文日期
            SetControlDisable("txFromDate");
            //本別
            SetControlDisable("ddlType");
            //文別
            SetControlDisable("ddlCategory");
            //速別
            SetControlDisable("ddlSpeed");
            //來文者1	機關代號
            SetControlDisable("txFromOrgNo1");
            //來文者1	機關提示按鈕
            SetControlDisable("btFromPrompt1");
            //來文者1	來文字
            //0990826 David 0990312 來文字欄位改為ComboBox
            //SetControlDisable("txFromWord1");
            SetControlDisable("dlFromWord1");
            //來文者1	來文號
            SetControlDisable("txFromNo1");
            //來文者2	機關代號
            SetControlDisable("txFromOrgNo2");
            //來文者2	機關提示按鈕
            SetControlDisable("btFromPrompt2");
            //來文者2	來文字
            //0990826 David 0990312 來文字欄位改為ComboBox
            //SetControlDisable("txFromWord2");
            SetControlDisable("dlFromWord2");
            //來文者2	來文號
            SetControlDisable("txFromNo2");
            //來文者3	機關代號
            SetControlDisable("txFromOrgNo3");
            //來文者3	機關提示按鈕
            SetControlDisable("btFromPrompt3");
            //來文者3	來文字
            //0990826 David 0990312 來文字欄位改為ComboBox
            //SetControlDisable("txFromWord3");
            SetControlDisable("dlFromWord3");
            //來文者3	來文號
            SetControlDisable("txFromNo3");
            //主旨
            SetControlDisable("txSubject");
            //承辦單位
            SetCombBoxDisable("dlDEPT");
            //承辦人
            SetCombBoxDisable("dlUSER");
            //長官交辦公文
            SetControlDisable("cbIsChiefDoc");
            //線上簽核公文
            SetControlDisable("cbIsOnlineDoc");
            //來源別
            SetControlDisable("ddlSource");
            //1001018 kevin [1000602] 新增來源別註記
            SetControlDisable("dlRcvtypeDesc");
            //郵件Email
            SetControlDisable("txEmail");
            //開啟電子檔
            SetControlDisable("btOpenElec");
            //1031002 Eric 1030714  設定明細按鈕Enable
            SetControlDisable("btDetail");
            //設定電子檔
            //SetControlDisable("btConfig");
            //案件編號
            SetControlDisable("txCaseNo");
            //案件編號提示
            SetControlDisable("btCaseNoPrompt");
            //公文來源
            SetControlDisable("ddlDocSource");

            //設定ToolBar DropDownList Disable 
            //document.all.tbTool.getItem(9).setAttribute("disabled",true);
            //document.all.tbTool.getItem(10).setAttribute("disabled",true);
            //設定傳送Button Disable
            //1051205 David 1050087 二代修改，調整setAttribute方式
            /*var btSaveObj = getToolBarItemObjById("btSave");
            if(btSaveObj != null)
                btSaveObj.setAttribute("disabled",true);*/
            //1080905 Kevin 1080339 JQuery升級調整寫法
            //$('#btSave').attr('disabled', true);
            $('#btSave').prop('disabled', true);
        }
    }
    else
    {
        document.all.dlRmvSec_Cond_Text.value = "";
        document.all.dlRmvSec_Cond.selectedIndex = 0;

        //1050706 David 1050087 二代修改
        //document.all.dlRmvSec_Cond.disabled = true;
        //document.all.dlRmvSec_Cond_Text.disabled = true;
        //document.all.dlRmvSec_Cond_Text.style.backgroundColor = "LightGrey";
        $('#dlRmvSec_Cond').combobox('setDisable');

        //0961120 Yvonne 拿掉解密別
        //document.all.dlRmvSecCode.selectedIndex = 0;
        //document.all.dlRmvSecCode.disabled = true;
        //document.all.dlRmvSecCode.style.backgroundColor = "LightGrey";

        //950904 95.10.17 David 當選擇為密以上條件時，檢核解密條件為必填欄位
        //此時className改為InputFieldText
        if (IsCheckSec)
            document.all["Label39"].className = "InputFieldText";

        //1120216 Kevin 銓敘部120 新增應解密日期
        SetControlDisable("txExtRmvSecDate");

        //不具有密件權
        if (document.all.IsSecRight.value == "N")
        {
            //收文日期
            SetControlEnable("txRcvDate");
            //公文類別
            SetControlEnable("ddlProperty");
            //來文日期
            SetControlEnable("txFromDate");
            //本別
            SetControlEnable("ddlType");
            //文別
            SetControlEnable("ddlCategory");
            //速別
            SetControlEnable("ddlSpeed");
            //來文者1	機關代號
            SetControlEnable("txFromOrgNo1");
            SetControlEnable("txFromOrgName1");
            //來文者1	機關提示按鈕
            SetControlEnable("btFromPrompt1");
            //來文者1	來文字
            //0990826 David 0990312 來文字欄位改為ComboBox
            //SetControlEnable("txFromWord1");
            SetControlEnable("dlFromWord1");
            //來文者1	來文號
            SetControlEnable("txFromNo1");
            //來文者2	機關代號
            SetControlEnable("txFromOrgNo2");
            SetControlEnable("txFromOrgName2");
            //來文者2	機關提示按鈕
            SetControlEnable("btFromPrompt2");
            //來文者2	來文字
            //0990826 David 0990312 來文字欄位改為ComboBox
            //SetControlEnable("txFromWord2");
            SetControlEnable("dlFromWord2");
            //來文者2	來文號
            SetControlEnable("txFromNo2");
            //來文者3	機關代號
            SetControlEnable("txFromOrgNo3");
            SetControlEnable("txFromOrgName3");
            //來文者3	機關提示按鈕
            SetControlEnable("btFromPrompt3");
            //來文者3	來文字
            //0990826 David 0990312 來文字欄位改為ComboBox
            //SetControlEnable("txFromWord3");
            SetControlEnable("dlFromWord3");
            //來文者3	來文號
            SetControlEnable("txFromNo3");
            //主旨
            SetControlEnable("txSubject");
            //承辦單位
            if (!document.all["dlDEPT"].disabled)
                SetCombBoxEnable("dlDEPT");
            //承辦人
            SetCombBoxEnable("dlUSER");
            //長官交辦公文
            SetControlEnable("cbIsChiefDoc");
            //線上簽核公文
            SetControlEnable("cbIsOnlineDoc");
            //來源別
            SetControlEnable("ddlSource");
            //1001018 kevin [1000602] 新增來源別註記
            SetControlEnable("dlRcvtypeDesc");
            //郵件Email
            SetControlEnable("txEmail");
            //開啟電子檔
            SetControlEnable("btOpenElec");
            //1031002 Eric 1030714  設定明細按鈕Enable
            SetControlEnable("btDetail");
            //設定電子檔
            //SetControlEnable("btConfig");
            //案件編號
            SetControlEnable("txCaseNo");
            //案件編號提示
            SetControlEnable("btCaseNoPrompt");
            //公文來源
            SetControlEnable("ddlDocSource");

            //document.all.tbTool.getItem(9).setAttribute("disabled",false);
            //document.all.tbTool.getItem(10).setAttribute("disabled",false);
            //1051205 David 1050087 二代修改，調整setAttribute方式
            /*var btSaveObj = getToolBarItemObjById("btSave");
            if(btSaveObj != null)
                btSaveObj.setAttribute("disabled",false);*/
            //1080905 Kevin 1080339 JQuery升級調整寫法
            //$('#btSave').attr('disabled', false);
            $('#btSave').prop('disabled', false);
        }
    }
}

var uFromDateChecked = false;
function txFromDate_onblur(argIsCheckDone)
{
    if (uFromDateChecked)
    {
        uFromDateChecked = false;
        return true;
    }
    if (argIsCheckDone)
        uFromDateChecked = true;

    //來文日期
    if (document.all.txFromDate.value != "")
    {
        if (!CheckDate(document.all.txFromDate, "來文日期"))
        {
            FocusAt(document.all.txFromDate);
            return false;
        }
        //收文日期
        if (document.all.txRcvDate.value != "")
        {
            //如果來文日期大於收文日期(來文日期比較近)
            if (CompareNumber(StringGetInt(document.all.txFromDate.value), StringGetInt(document.all.txRcvDate.value)))
            {
                jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["來文日期不得晚於收文日期"])), "");
                FocusAt(document.all.txFromDate);
                return false;
            }
        }
    }
    //1130819 Kevin 1130651 立委諮詢案件以來文日期進行為起算日期
    GetSumType();
    return true;
}

function txRcvDate_onblur()
{
    if (!CheckDate(document.all.txRcvDate, "收文日期"))
        FocusAt(document.all.txRcvDate);
    else
    {
        //0990729 David 0990318 因新增連動，取消呼叫
        //ddlSpeed_onchange();

        //0990729 David 0990318 新增收文日期連動--Start
        var bUpdate = false;
        if (document.all.txRcvDate.value != document.all.H_txRcvDate.value)
        {
            if (jf_GetActionMode() == LayoutModeNew)
                bUpdate = true;
            else if (document.all.txLtBy.value != "M")//限辦日期不依開會日期計算時再處理
            {
                if (window.confirm("您是否要修改收文日期？確定後將一併調整起算、限辦日期"))//修改模式才跳訊息
                    bUpdate = true;
                else
                    //1050817 Zen 1050700 弱掃XSS修正
                    //document.all.txRcvDate.value = document.all.H_txRcvDate.value;
                    document.all.txRcvDate.value = encodeURI(document.all.H_txRcvDate.value);
            }
        }
        if (bUpdate)
        {
            document.all.H_txRcvDate.value = document.all.txRcvDate.value;

            //限辦日期不依開會日期計算且不為人工輸入再處理
            if (document.all.txLtBy.value != "M" && document.all.txStartRule.value != "3")
            {
                if (document.all.txStartDateRule.value == "2")//起算日期為收文當日
                    document.all.txStartDate.value = document.all.txRcvDate.value;
                else
                {
                    //依業務類別取得起算日期
                    //1130819 Kevin 1130651 立委諮詢案件以來文日期進行為起算日期
                    //var param = new Array(5);
                    var param = new Array(6);
                    var ddlValueArray = document.all.ddlProperty.options[document.all.ddlProperty.selectedIndex].value.split(",");
                    var strDocProperty = ddlValueArray[0];
                    param[0] = ""; 			//機關代碼
                    //1061110	Kevin_C	1061070	弱掃Client Potential Code Injection修正
                    //param[1] = strDocProperty; //公文性質
                    param[1] = encodeURI(strDocProperty); //公文性質

                    var strSpdNo = "";
                    if (document.all.ddlSpeed.selectedIndex != -1)
                    {
                        //1040630 David 1040517 因速別選單VALUE修改為僅記錄代碼，調整取值邏輯
                        //ddlValueArray = document.all.ddlSpeed.options[document.all.ddlSpeed.selectedIndex].value.split(",");
                        //strSpdNo = ddlValueArray[0];
                        //1050817 Zen 1050700 弱掃XSS修正
                        //strSpdNo = document.all.ddlSpeed.options[document.all.ddlSpeed.selectedIndex].value;
                        strSpdNo = encodeURI(document.all.ddlSpeed.options[document.all.ddlSpeed.selectedIndex].value);
                    }

                    param[2] = strSpdNo; //速別

                    //1050817 Zen 1050700 弱掃XSS修正--begin
                    //param[3] = document.all.dlWorkType.options[document.all.dlWorkType.selectedIndex].value; //業務類別
                    //param[4] = document.all.txRcvDate.value; //收創文日期
                    param[3] = encodeURI(document.all.dlWorkType.options[document.all.dlWorkType.selectedIndex].value); //業務類別
                    param[4] = encodeURI(document.all.txRcvDate.value); //收創文日期
                    //1130819 Kevin 1130651 立委諮詢案件以來文日期進行為起算日期
                    param[5] = encodeURI(document.all.txFromDate.value);
                    //1050817 Zen 1050700 弱掃XSS修正--end

                    //1130819 Kevin 1130651 立委諮詢案件以來文日期進行為起算日期
                    //callObj = jf_CallWS("lib/TIME_LIB.asmx", "GetSumType", false, param);
                    callObj = jf_CallWS("lib/TIME_LIB.asmx", "GetSumTypeForRcv", false, param);
                    if (jf_IsWebServiceSuccessNoAlert(callObj))
                        document.all.txStartDate.value = callObj.value.StartDateCalcBySys;
                }
                GetWorkDate();
            }
        }
        //0990729 David 0990318 新增收文日期連動--End

        //0990820 David 0990438 新增收文時間欄位
        if (document.all.txRcvDate.value == document.all.H_txDateNow.value)
        {
            var Now = new Date();
            var strHour = Now.getHours() + "";
            var strMin = Now.getMinutes() + "";
            if (strHour.length == "1")
                strHour = "0" + strHour;
            if (strMin.length == "1")
                strMin = "0" + strMin;
            document.all.txRcvMin.value = strHour + strMin;
            document.all.H_txRcvSec.value = Now.getSeconds();
            if (document.all.H_txRcvSec.value.length == 1)
                document.all.H_txRcvSec.value = "0" + document.all.H_txRcvSec.value;
        }
    }
}

function ddlSpeed_onchange()
{
    GetWorkDate();
    /* 2004-02-11 marked
    //先檢查收文日期是否為空白
    if(jf_Trim(document.all.txRcvDate.value) == "")
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["收文日期不可為空白"])),"");
        return;
    }

    //取得可辦理之天數
    var HandleDays = "6";
    var ddlValue = document.all.ddlSpeed.options[document.all.ddlSpeed.selectedIndex].value;
    var ddlValueArray = ddlValue.split(",");
    if(ddlValueArray.length > 1)
    {
        HandleDays = ddlValueArray[1];
    }
    else
    {
        if(ddlValueArray[0] == "1")
            HandleDays = "6";
        else if (ddlValueArray[0] == "2")
            HandleDays = "3";
        else if (ddlValueArray[0] == "3")
            HandleDays = "1";	
    }
    //透過WebService取得所算之日期
    var wsParam = new Array();
    wsParam[0] = document.all.txRcvDate.value;
    wsParam[1] = HandleDays;
    wsParam[2] = "2";//不含假日
    var CallWsObj = jf_CallWS("lib/OD_LIB.asmx","GetWorkDate",false,wsParam);
    wsGetWorkDateID =  CallWsObj.id;
    OnWSResult(CallWsObj);
    */
}

function ddlSpeed_onblur()
{
    ddlSpeed_onchange();
}

function ddlProperty_onblur()
{
    //ddlProperty_onchange();
}

var gCaseNoBeforeChange = "";
function ddlProperty_onchange()
{
    //1050818 Zen 1050700 弱掃XSS修正
    //var ddlValue = document.all.ddlProperty.options[document.all.ddlProperty.selectedIndex].value;
    var ddlValue = encodeURI(document.all.ddlProperty.options[document.all.ddlProperty.selectedIndex].value);
    //VALUE:公文性質代碼,是否開放輸入限辦期限,是否開放選擇速別,是否以案管制
    var ddlValueArray = ddlValue.split(",");
    //是否開放輸入限辦期限
    /* 2004-02-11 marked
    if(ddlValueArray[1] == "1")
        SetControlEnable("txLimitDate");
    else
        SetControlDisable("txLimitDate");
    */
    //是否開放選擇速別
    if (ddlValueArray[2] == "1")
        SetControlEnable("ddlSpeed");
    else
        SetControlDisable("ddlSpeed");

    ddlDocSource_onchange();

    /*if(ddlValueArray[0]=="8")
        document.all.btOpenEForm.disabled=false;
    else
        document.all.btOpenEForm.disabled=true;*/
    //是否開放輸入案件編號
    if (ddlValueArray[3] == "1")
    {
        SetControlEnable("txCaseNo");
        SetControlEnable("btCaseNoPrompt");
        //1120216 Kevin 銓敘部145 修正未帶出案件編號問題
        if (gCaseNoBeforeChange != "")
            document.all.txCaseNo.value = gCaseNoBeforeChange;
    }
    else
    {
        if (document.all.txCaseNo.value != "")
        {
            gCaseNoBeforeChange = document.all.txCaseNo.value;
            document.all.txCaseNo.value = "";
        }
        SetControlDisable("txCaseNo");
        SetControlDisable("btCaseNoPrompt");
        ddlSpeed_onchange();
    }

    //1110927 Kevin 1110880 新增任審資訊介接
    if (document.all.OrgNickName.value == "MOCS")
    {
        //1120720 Kevin 問題112 改為函式提供Onload呼叫
        SetMocsBtTaInfo(ddlValueArray[0]);
    }

    //1090628 Kevin 1090407 改為決定業務類別後再處理連動
    ////1050219 David 1040836 切換公文性質為「一般公文限期辦畢」時，速別自動調整到「4：」
    //if(ddlValueArray[0] == "2")
    //{
    //	//1071116 David 調整寫法，避免客戶設定速別4對應文字不為空
    //	//SetDDLByTextArray("ddlSpeed", "", 1, ".");
    //	SetDlItemByValue(document.all.ddlSpeed, "4");
    //	ddlSpeed_onchange();
    //}
    ////1071116 David 切換公文性質為非「一般公文限期辦畢」，且速別為「4：」時，將速別調整回普通件
    //else if(ddlValueArray[0] != "2" && document.all.ddlSpeed.options[document.all.ddlSpeed.selectedIndex].value == "4")
    //{
    //	SetDlItemByValue(document.all.ddlSpeed, "1");
    //	ddlSpeed_onchange();
    //}

    //Call Web Service 取得業務類別...
    GetBTypeNo();

    //1111219 Kevin 序43 銓審案預開啟子視窗
    if (document.all.OrgNickName.value == "MOCS") 
    {
        //1120720 Kevin 問題112 改為函式提供Onload呼叫
        OpenMocsTaInfo(ddlValueArray[0]);
    }
}

//1120720 Kevin 問題112 改為函式提供Onload呼叫
function SetMocsBtTaInfo(nowPtyNo)
{
    if (nowPtyNo == document.all.MOCS_TA_DOC_PROPERTY.value)
    {
        SetControlEnable("btTaInfo");
    }
    else
    {
        SetControlDisable("btTaInfo");

        //1111229 Kevin 1110880 清空資訊
        document.all["H_txPERSON_FULL_NAME"].value = '';
        document.all["H_txPERSON_ID"].value = '';
        document.all["H_txJOB_ORGNO"].value = '';
        document.all["H_txJOB_ORGNAME"].value = '';
        document.all["H_txJOB_NO"].value = '';
        document.all["H_txJOB_TITLE_NO"].value = '';
        document.all["H_txJOB_TITLE"].value = '';
        //1120118 David 非個人案時也會有報送案別，不需清空
        //document.all["H_txTA_TYPE"].value = '';
    }
}

//1120720 Kevin 問題112 改為函式提供Onload呼叫
function OpenMocsTaInfo(nowPtyNo)
{
    if (nowPtyNo == document.all.MOCS_TA_DOC_PROPERTY.value)
    {
        document.all["lbReturnValue"].length = 7;
        document.all["lbReturnValue"].options[0].value = document.all["H_txPERSON_FULL_NAME"].value;
        document.all["lbReturnValue"].options[1].value = document.all["H_txPERSON_ID"].value;
        document.all["lbReturnValue"].options[2].value = document.all["H_txJOB_ORGNO"].value;
        document.all["lbReturnValue"].options[3].value = document.all["H_txJOB_ORGNAME"].value;
        document.all["lbReturnValue"].options[4].value = document.all["H_txJOB_NO"].value;
        document.all["lbReturnValue"].options[5].value = document.all["H_txJOB_TITLE_NO"].value;
        document.all["lbReturnValue"].options[6].value = document.all["H_txJOB_TITLE"].value;

        //1120522 Kevin 銓敘部36.37 電子文不預設開啟任審子視窗
        if (document.all["h_SYSID"].value == '')
            jf_OpenChildWin('ODT130C2.aspx', 'ODT130C2', 600, 400);
    }
}

function ddlProperty_init()
{
    var ddlValue = document.all.ddlProperty.options[document.all.ddlProperty.selectedIndex].value;
    //VALUE:公文性質代碼,是否開放輸入限辦期限,是否開放選擇速別,是否以案管制
    var ddlValueArray = ddlValue.split(",");
    //是否開放輸入限辦期限
    if (ddlValueArray[1] == "1")
    {
        SetControlEnable("txLimitDate");
        //1050706 David 1050087 二代修改
        //SetControlEnable("btLimitDate");
    }
    else
    {
        SetControlDisable("txLimitDate");
        //1050706 David 1050087 二代修改
        //SetControlDisable("btLimitDate");
    }
    //是否開放選擇速別
    if (ddlValueArray[2] == "1")
        SetControlEnable("ddlSpeed");
    else
        SetControlDisable("ddlSpeed");

    ddlDocSource_onchange();

    //是否開放輸入案件編號
    if (ddlValueArray[3] == "1")
    {
        SetControlEnable("txCaseNo");
        SetControlEnable("btCaseNoPrompt");
    }
    else
    {
        SetControlDisable("txCaseNo");
        SetControlDisable("btCaseNoPrompt");
    }
}

function txCaseNo_onblur()
{
    if (document.all.txCaseNo.value == "")
    {
        //Clear 辦理階段
        ClearDL(document.all.dlStepName);
        return;
    }

    //檢查案件編號是否存在
    //098/04/14 0980129 Iris 依系統參數判斷是否檢核 START
    if (document.all.h_PtyCaseNoCheck != null)
    {
        if (document.all.h_PtyCaseNoCheck.value == "N")
            return;
    }
    //098/04/14 0980129 END
    var wsParam = new Array(3);
    wsParam[0] = "DOC_CASE";
    var FieldName = new Array(2);
    FieldName[0] = "SOURCE_ORGNO";
    FieldName[1] = "CASE_NO";
    wsParam[1] = FieldName;
    var FieldValue = new Array(2);
    FieldValue[0] = document.all.SOURCE_ORGNO.value;
    FieldValue[1] = document.all.txCaseNo.value;
    wsParam[2] = FieldValue;
    var CallObj = jf_CallWS("template/lib/SYS.asmx", "CheckDataKeyDuplicate", false, wsParam);
    if (jf_IsWebServiceSuccess(CallObj))
    {
        if (!CallObj.value.RtnBool)
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入之案件編號不存在"])), "");
            return;
        }
    }

    //若存在則帶出該案件之預結日期
    /* 2004-02-12 marked
    var wsParam = new Array(5);
    wsParam[0] = "DOC_CASE";
    var KeyName = new Array(2);
    KeyName[0] = "SOURCE_ORGNO";
    KeyName[1] = "CASE_NO";
    wsParam[1] = KeyName;
    var KeyValue = new Array(2);
    KeyValue[0] = document.all.SOURCE_ORGNO.value;
    KeyValue[1] = document.all.txCaseNo.value;
    wsParam[2] = KeyValue;
    var RtnFldName = new Array(1);
    RtnFldName[0] = "TARGET_DATE";
    wsParam[3] = RtnFldName;
    var OrdFldName = new Array(1);
    OrdFldName[0] = "";
    wsParam[4] = OrdFldName;
    var CallObj = jf_CallWS("lib/AK_LIB.asmx", "GetFieldValue", false, wsParam);
    wsGetCaseTargetDateID = CallObj.id;
    OnWSResult(CallObj);
    */

    //取得辦理階段
    GetStepName();
}

function ddlSource_onchange()
{
    //設定隱藏欄位的值
    document.all.ddlSourceText.value = GetDDLValue(document.all.ddlSource, 0);
    //設定是否Disable 開啟鍵
    if (GetDDLValue(document.all.ddlSource, 0) != "E")
    {
        SetControlDisable("btOpenElec");
        //1031002 Eric 1030714  設定明細按鈕Enable
        SetControlDisable("btDetail");
    }
    else
    {
        SetControlEnable("btOpenElec");
        //1031002 Eric 1030714  設定明細按鈕Enable
        SetControlEnable("btDetail");
    }
    //設定是否Disable 設定鍵
    /*if(GetDDLValue(document.all.ddlSource,0) == "M" )
        SetControlDisable("btConfig");
    else
        SetControlEnable("btConfig");
    */
    //修正判斷邏輯 #2006.01.10 Andy
    var SourceType = GetDDLValue(document.all.ddlSource, 0);
    //設定是否Disable 開啟鍵
    if (SourceType == "E" || SourceType == "M")
    {
        if (document.all.h_SYSID.value != "")
        {
            SetControlEnable("btOpenElec");
            //1031002 Eric 1030714  設定明細按鈕Enable
            SetControlEnable("btDetail");
        }
        else
        {
            SetControlDisable("btOpenElec");
            //1031002 Eric 1030714  設定明細按鈕Enable
            SetControlDisable("btDetail");
        }
    }
    else if (SourceType == "P")
    {
        if (jf_Trim(document.all.hScanSYSID.value) != "")
        {
            SetControlEnable("btOpenElec");
            //1031002 Eric 1030714  設定明細按鈕Enable
            //1120505 Kevin 1120350 新增影像匯入功能
            //SetControlEnable("btDetail");
            SetControlDisable("btDetail");
        }
        else
        {
            SetControlDisable("btOpenElec");
            //1031002 Eric 1030714  設定明細按鈕Enable
            SetControlDisable("btDetail");
        }
    }
    else
    {
        SetControlDisable("btOpenElec");
        //1031002 Eric 1030714  設定明細按鈕Enable
        SetControlDisable("btDetail");
    }

    //設定是否Disable 設定鍵
    /*if(SourceType == "C" )
        SetControlDisable("btConfig");
    else
        SetControlEnable("btConfig");*/

    //1141127 David 序384 判斷為駐外開啟時，設定明細按鈕Enable
    if (typeof $('#OM_SYSID')[0] != "undefined")
        SetControlEnable("btDetail");
}
function ddlSource_onblur()
{
    ddlSource_onchange();
}

//1001018 kevin [1000602] 新增來源別註記
function dlRcvtypeDesc_onchange()
{
    var strRcvtypeDesc = GetDDLValue(document.all.dlRcvtypeDesc, 0);
    var strRcvtypeDescName = GetDDLValue(document.all.dlRcvtypeDesc, 1);
    //設定來源別
    if (document.all.ddlSource.disabled == false)
    {
        ddlSelect("ddlSource", strRcvtypeDesc);
        ddlSource_onchange();
    }
    else
    {
        //重新設定來源別註記
        document.all["dlRcvtypeDesc"].options.length = 0;
        for (var i = 0; i < document.all["H_dlRcvtypeDesc"].length; i++)
        {
            if (GetValueFromValueArray(document.all["H_dlRcvtypeDesc"].options[i].value, 0) == document.all.ddlSourceText.value)
            {
                var opt = document.createElement("option");
                opt.text = document.all["H_dlRcvtypeDesc"].options[i].text;
                opt.value = document.all["H_dlRcvtypeDesc"].options[i].value;
                document.all["dlRcvtypeDesc"].options.add(opt);
            }
        }
        //若為選擇來源別在可選範圍內，帶回使用者選擇，若非則帶回預設。
        for (var i = 0; i < document.all["dlRcvtypeDesc"].length; i++)
        {
            if (GetValueFromValueArray(document.all["dlRcvtypeDesc"].options[i].value, 1) == strRcvtypeDescName)
            {
                document.all["dlRcvtypeDesc"].selectedIndex = i;
                return;
            }
        }
        ddlSelectSpd("dlRcvtypeDesc", document.all.ddlSourceText.value);
    }
}

//1001018 kevin [1000602] 新增來源別註記
function dlRcvtypeDesc_onblur()
{
    dlRcvtypeDesc_onchange();
}

function ddlSec_onblur()
{
    ddlSec_onchange();
}

function txFromOrgNo1_onblur()
{
    //0990826 David 0990312 來文機關欄位改為自動完成元件
    document.all.txFromOrgNo1.value = document.all.txAutoOrgName1.value;
    if (document.all.txFromOrgNo1.value == "")
    {
        //清除掉label中的值
        document.all.txFromOrgName1.value = "";
        //0990826 David 0990312 清空來文字選單值
        ClearDL(document.all.dlFromWord1);
    }
    else
    {
        //0990826 David 0990312 來文字欄位改為ComboBox，傳入物件修改
        //GetOrgInfo(document.all.txFromOrgNo1,document.all.txFromOrgName1,document.all.txFromWord1,document.all.txFromNo1);

        //1000403 Zola 1000035 傳入原始識別碼
        //GetOrgInfo(document.all.txFromOrgNo1,document.all.txFromOrgName1,document.all.dlFromWord1,document.all.txFromNo1);
        //1050706 David 1050087 二代修改
        //GetOrgInfo(document.all.txFromOrgNo1,document.all.txFromOrgName1,document.all.dlFromWord1,document.all.txFromNo1,document.all.h_OrgID);
        GetOrgInfo(document.all.txFromOrgNo1, document.all.txFromOrgName1, document.all.dlFromWord1, document.all.txFromNo1, document.all.h_OrgID, document.all.txAutoOrgName1);
        bCheckedFromOrg1 = true;
    }

    //1111229 Kevin 1110880 變更為任審介接
    if (document.all.OrgNickName.value == "MOCS")
        getLastFromOrgTaInfo();
}

function txFromOrgNo2_onblur()
{
    //0990826 David 0990312 來文機關欄位改為自動完成元件
    document.all.txFromOrgNo2.value = document.all.txAutoOrgName2.value;
    if (document.all.txFromOrgNo2.value == "")
    {
        //清除掉label中的值
        document.all.txFromOrgName2.value = "";
        //0990826 David 0990312 清空來文字選單值
        ClearDL(document.all.dlFromWord2);
    }
    else
    {
        //0990826 David 0990312 來文字欄位改為ComboBox，傳入物件修改
        //GetOrgInfo(document.all.txFromOrgNo2,document.all.txFromOrgName2,document.all.txFromWord2,document.all.txFromNo2);

        //1000403 Zola 1000035 傳入原始識別碼
        //GetOrgInfo(document.all.txFromOrgNo2,document.all.txFromOrgName2,document.all.dlFromWord2,document.all.txFromNo2);
        //1050706 David 1050087 二代修改
        //GetOrgInfo(document.all.txFromOrgNo2,document.all.txFromOrgName2,document.all.dlFromWord2,document.all.txFromNo2,document.all.h_OrgID2);
        GetOrgInfo(document.all.txFromOrgNo2, document.all.txFromOrgName2, document.all.dlFromWord2, document.all.txFromNo2, document.all.h_OrgID2, document.all.txAutoOrgName2);
        bCheckedFromOrg2 = true;
    }
}
function txFromOrgNo3_onblur()
{
    //0990826 David 0990312 來文機關欄位改為自動完成元件
    document.all.txFromOrgNo3.value = document.all.txAutoOrgName3.value;
    if (document.all.txFromOrgNo3.value == "")
    {
        //清除掉label中的值
        document.all.txFromOrgName3.value = "";
        //0990826 David 0990312 清空來文字選單值
        ClearDL(document.all.dlFromWord3);
    }
    else
    {
        //0990826 David 0990312 來文字欄位改為ComboBox，傳入物件修改
        //GetOrgInfo(document.all.txFromOrgNo3,document.all.txFromOrgName3,document.all.txFromWord3,document.all.txFromNo3);

        //1000403 Zola 1000035 傳入原始識別碼
        //GetOrgInfo(document.all.txFromOrgNo3,document.all.txFromOrgName3,document.all.dlFromWord3,document.all.txFromNo3);
        //1050706 David 1050087 二代修改
        //GetOrgInfo(document.all.txFromOrgNo3,document.all.txFromOrgName3,document.all.dlFromWord3,document.all.txFromNo3,document.all.h_OrgID3);
        GetOrgInfo(document.all.txFromOrgNo3, document.all.txFromOrgName3, document.all.dlFromWord3, document.all.txFromNo3, document.all.h_OrgID3, document.all.txAutoOrgName3);
        bCheckedFromOrg3 = true;
    }
}

function checkDeptSectUserDDL(argIsCheckDone)
{
    //1020412 Kevin 1020167 修正儲存時未檢核承辦單位問題
    if (jf_Trim(document.all.dlDEPT_Text.value) != "")
    //if(document.activeElement.id == "dlDEPT_Text" && jf_Trim(document.all.dlDEPT_Text.value) != "") //檢核承辦單位 #2006.01.05 Andy
    {
        if (!dlDEPT_Text_onblur(argIsCheckDone))
            return false;
    }
    //1020412 Kevin 1020167 修正儲存時未檢核承辦單位問題 
    if (jf_Trim(document.all.dlSECT_Text.value) != "")
    //if(document.activeElement.id == "dlSECT_Text" && jf_Trim(document.all.dlSECT_Text.value) != "") //檢核承辦科別
    {
        if (!dlSECT_Text_onblur(argIsCheckDone))
            return false;
    }
    //1020412 Kevin 1020167 修正儲存時未檢核承辦單位問題
    if (jf_Trim(document.all.dlUSER_Text.value) != "")
    //if(document.activeElement.id == "dlUSER_Text" && jf_Trim(document.all.dlUSER_Text.value) != "") //檢核承辦人
    {
        if (!dlUSER_Text_onblur(argIsCheckDone))
            return false;
    }
    return true;
}

//[955079變更需求單] 承辦資訊下拉選單onblur時的檢查 Charles 0950919 Start↓
var uDeptChecked = false;
function dlDEPT_Text_onblur(argIsCheckDone)
{
    if (uDeptChecked)
    {
        uDeptChecked = false;
        //1021122 David 1020928 不需檢核時應回傳true
        //return;
        return true;
    }
    if (argIsCheckDone)
        uDeptChecked = true;

    var bCheckOK = true;
    if (document.all["dlDEPT_Text"].value != document.all["H_Value"].value)
    {
        //呼叫OD_LIB.js，檢查dlDEPT_Text所輸入的值是否存在於下拉式選單
        if (odjf_ComboBoxCheck("dlDEPT", "承辦單位"))
        {
            var strSubTree = false;
            //0951120 JEFF [951187] 一級單位與二級單位置於同一下拉選單
            if (document.all["H_OD_FLOW_TYPE"].value == "2")
            {
                if (document.all["H_OD_DEPTDDL_WITH_SUBUNIT"].value != "Y")
                {
                    /*if(document.all.h_RoleNo.value == "OD17")
                    {
                        if(document.all.h_DeptNo.length == 2)
                            strSubTree = true;
                        else
                            strSubTree = false;
                    }*/
                }
                else
                {
                    strSubTree = false;
                }
            }
            else
            {
                strSubTree = true;
            }

            if (document.all["H_OD_DEPTDDL_WITH_SUBUNIT"].value != "Y")
            {
                odjf_SetdlDept("dlDEPT", "dlSECT", "dlUSER", document.all["H_OD_ODT130_ROLES"].value, strSubTree);
            }
            else
            {
                if (odjf_GetSelectValue(document.all["dlDEPT"], document.all["dlDEPT_Text"].value).split(':')[2] == "")
                    odjf_SetdlDept("dlDEPT", "dlSECT", "dlUSER", document.all["H_OD_ODT130_ROLES"].value, strSubTree);
                else
                    odjf_SetdlUserByUnitCode(odjf_GetSelectValue(document.all["dlDEPT"], document.all["dlDEPT_Text"].value).split(':')[2], "dlUSER", document.all["H_OD_ODT130_ROLES"].value, strSubTree);
            }
            //jeff end

            //存ComboBox_Text的value
            document.all["H_Value"].value = document.all["dlDEPT_Text"].value;
            document.all["H_Sect_Value"].value = document.all["dlSECT_Text"].value;
            document.all["H_User_Value"].value = document.all["dlUSER_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_DeptNo_Value"].value = odjf_GetSelectValue(document.all["dlDEPT"], document.all["H_Value"].value);
            document.all["H_SectNo_Value"].value = odjf_GetSelectValue(document.all["dlSECT"], document.all["H_Sect_Value"].value);
            document.all["H_UserNo_Value"].value = odjf_GetSelectValue(document.all["dlUSER"], document.all["H_User_Value"].value);
            //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
            document.all.H_dlSect_Value.value = odjf_SaveCurrDL(document.all["dlSECT"]);
            document.all.H_dlUser_Value.value = odjf_SaveCurrDL(document.all["dlUSER"]);
            //依選項多寡固定下拉式選單可見長度
            if (document.all["dlSECT"].options.length > 10)
                document.all["dlSECT"].size = 10;
            else if (document.all["dlSECT"].options.length == 1)
            {
                document.all["dlSECT"].size = 2;
            }
            else
                document.all["dlSECT"].size = document.all["dlSECT"].options.length;

            if (document.all["dlUSER"].options.length > 10)
                document.all["dlUSER"].size = 10;
            else if (document.all["dlUSER"].options.length == 1)
                document.all["dlUSER"].size = 2;
            else
                document.all["dlUSER"].size = document.all["dlUSER"].options.length;

            //1020322	Jagle	[1020042]	增加二級單位下拉選單無值不顯示設定
            jf_HandleComboxStatus("dlSECT");

            //1110325 David 1101534 考試院訴願會預設訴願公文性質
            if (document.all.OrgNickName.value == "EXAM" && document.all.IsAllRcv.value == "Y"
                && document.all["H_DeptNo_Value"].value != "" && document.all.H_txWISH_DEPT_NO.value == document.all["H_DeptNo_Value"].value.split(':')[0])
            {
                document.all["dlWorkType_Text"].value = '';
                //1110331 Kevin 1100324 修正公文性質排序變更問題
                //document.all.ddlProperty.selectedIndex = 6;
                var targetDocPty = "7";
                for (var iDl = 0; iDl < document.all.ddlProperty.length; iDl++)
                {
                    var ddlValueArray = document.all.ddlProperty.options[iDl].value.split(",");
                    var strDocPrty = ddlValueArray[0];
                    if (strDocPrty == targetDocPty)
                    {
                        document.all.ddlProperty.selectedIndex = iDl;
                        break;
                    }
                }
                ddlProperty_onchange();
            }

            //1030716 David 1030406 承辦單位異動時，業務類別內容帶出對應的內容，呼叫ddlProperty_onchange();
            //1031024 Eric 1030786 增加判斷環境參數和系統參數
            if ((document.all.H_txGetBType.value == "Y") && (document.all.H_GetBTypeNoByOuRule.value == "1"))
                //1091124 Kevin [1090850] 業務類別區分單位新增支援二級單位設定
                //ddlProperty_onchange();
                GetBTypeNo();
        }
        else
            bCheckOK = false;
    }
    //0991228	[0991055]	Bill	因應CDC現場要求承辦人的下拉選單依照姓名筆劃排序
    //-----start-----
    var dlUser = document.all["dlUSER"];
    arrSorted = new Array();
    for (var i = 0; i < dlUser.length; i++)
    {
        arrSorted[i] = dlUser.options[i].text;
        arrSorted[i] += "|";
        arrSorted[i] += dlUser.options[i].value;
    }
    arrSorted.sort();
    for (var i = 0; i < dlUser.length; i++)
    {
        dlUser.options[i].text = arrSorted[i].split("|")[0];
        dlUser.options[i].value = arrSorted[i].split("|")[1];
    }
    //------end------
    return bCheckOK;
}

var uSectChecked = false;
function dlSECT_Text_onblur(argIsCheckDone)
{
    if (uSectChecked)
    {
        uSectChecked = false;
        //1021122 David 1020928 不需檢核時應回傳true
        //return;
        return true;
    }
    if (argIsCheckDone)
        uSectChecked = true;

    var bCheckOK = true;
    //值若變更時作處理
    if (document.all["dlSECT_Text"].value != document.all["H_Sect_Value"].value)
    {
        //呼叫OD_LIB.js，檢查dlSECT_Text所輸入的值是否存在於下拉式選單
        if (odjf_ComboBoxCheck("dlSECT", "承辦科別"))
        {
            var strSubTree = false;
            //0951120 JEFF [951187] 一級單位與二級單位置於同一下拉選單
            if (document.all["H_OD_FLOW_TYPE"].value == "2" && document.all["H_OD_DEPTDDL_WITH_SUBUNIT"].value != "Y")
            {//jeff end
                if (document.all.h_RoleNo.value == "OD17")
                {
                    if (document.all.h_DeptNo.length == 2)
                        strSubTree = true;
                    else
                        strSubTree = false;
                }
            }
            else
            {
                strSubTree = true;
            }

            //呼叫OD_LIB.js，初始dlUser的處理
            odjf_SetdlSect("dlDEPT", "dlSECT", "dlUSER", document.all["H_OD_ODT130_ROLES"].value, strSubTree);

            //存ComboBox_Text的value
            document.all["H_Sect_Value"].value = document.all["dlSECT_Text"].value;
            document.all["H_User_Value"].value = document.all["dlUSER_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_SectNo_Value"].value = odjf_GetSelectValue(document.all["dlSECT"], document.all["H_Sect_Value"].value);
            document.all["H_UserNo_Value"].value = odjf_GetSelectValue(document.all["dlUSER"], document.all["H_User_Value"].value);
            //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlUser的處理
            document.all.H_dlUser_Value.value = odjf_SaveCurrDL(document.all["dlUSER"]);
            //依選項多寡固定下拉式選單可見長度
            if (document.all["dlUSER"].options.length > 10)
                document.all["dlUSER"].size = 10;
            else if (document.all["dlUSER"].options.length == 1)
                document.all["dlUSER"].size = 2;
            else
                document.all["dlUSER"].size = document.all["dlUSER"].options.length;
            //1091124 Kevin [1090850] 業務類別區分單位新增支援二級單位設定
            if ((document.all.H_txGetBType.value == "Y") && (document.all.H_GetBTypeNoByOuRule.value == "1"))
                GetBTypeNo();
        }
        else
            bCheckOK = false;
    }
    //0991228	[0991055]	Bill	因應CDC現場要求承辦人的下拉選單依照姓名筆劃排序
    //-----start-----
    var dlUser = document.all["dlUSER"];
    arrSorted = new Array();
    for (var i = 0; i < dlUser.length; i++)
    {
        arrSorted[i] = dlUser.options[i].text;
        arrSorted[i] += "|";
        arrSorted[i] += dlUser.options[i].value;
    }
    arrSorted.sort();
    for (var i = 0; i < dlUser.length; i++)
    {
        dlUser.options[i].text = arrSorted[i].split("|")[0];
        dlUser.options[i].value = arrSorted[i].split("|")[1];
    }
    //------end------
    return bCheckOK;
}

var uUserChecked = false;
function dlUSER_Text_onblur(argIsCheckDone)
{
    if (uUserChecked)
    {
        uUserChecked = false;
        //1021122 David 1020928 不需檢核時應回傳true
        //return;
        return true;
    }
    if (argIsCheckDone)
        uUserChecked = true;

    var bCheckOK = true;
    //值若變更時作處理
    if (document.all["dlUSER_Text"].value != document.all["H_User_Value"].value)
    {
        //呼叫OD_LIB.js，檢查dlUSER_Text所輸入的值是否存在於下拉式選單
        if (odjf_ComboBoxCheck("dlUSER", "承辦人"))
        {
            document.all["H_User_Value"].value = document.all["dlUSER_Text"].value;

            document.all["H_UserNo_Value"].value = odjf_GetSelectValue(document.all["dlUSER"], document.all["H_User_Value"].value);
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}

//2007-07-02 add Matte
function txSrcRcvNo_onblur()
{
    if (jf_Trim(document.all.txSrcRcvNo.value) != "")
    {
        ddlSelectByText("ddlDocSource", "上級機關交辦");
        if (jf_Trim(document.all.h_worktype.value) != "")//Matte 0960927 001666
        {
            //0970259	拿掉jf_Trim()
            SetCbItemByText(document.all.dlWorkType, jf_Trim(document.all.h_worktype.value));	//連動選擇業務類別為部收文

            dlWorkType_onchange();	//業務類別變動後連動其他欄位

            //1050706 David 1050087 二代修改，調整focus語法
            //document.all.txSrcRcvDate.focus();	//最後停在上級收文字號
            $('#txSrcRcvDate').focus();
        }

        //1061211 David 1060881 (FDA)新增衛服部移文功能
        if (document.all.OrgNickName.value == "FDA")
        {
            //1071101	Kevin_C	1070678			因弱掃調整站台設定，無法使用AJAX，所以將AJAX改成AJAXPRO
            //var AssignDocObj = ODT130.GetDohAssignDocInfo(document.all.SOURCE_ORGNO.value, jf_Trim(document.all.txSrcRcvNo.value)).value;
            var AssignDocObj = OD.ODT130.GetDohAssignDocInfo(document.all.SOURCE_ORGNO.value, jf_Trim(document.all.txSrcRcvNo.value)).value;
            if (!AssignDocObj.bSuccess)
            {
                alert("取得上級移文資訊發生錯誤，錯誤訊息為" + AssignDocObj.ErrMsg);
            }
            else if (AssignDocObj.bExist)
            {
                //主旨
                if (AssignDocObj.sFromSuject != "")
                    document.all.txSubject.value = AssignDocObj.sFromSuject;
                //來文機關
                if (AssignDocObj.sFromOrg != "")
                {
                    document.all.txAutoOrgName1.value = AssignDocObj.sFromOrg;
                    txFromOrgNo1_onblur();
                }
                //來文字
                if (AssignDocObj.sFromWord != "")
                    document.all["dlFromWord1_Text"].value = AssignDocObj.sFromWord;
                //來文號
                if (AssignDocObj.sFromNo != "")
                    document.all.txFromNo1.value = AssignDocObj.sFromNo;
                //上級收文日期
                if (AssignDocObj.sAssignRcvDate != "")
                    document.all.txSrcRcvDate.value = AssignDocObj.sAssignRcvDate;
                //本別
                ddlSelect("ddlType", AssignDocObj.sDocType);
            }
        }
    }
}

//[955079變更需求單] 承辦資訊下拉選單onblur時的檢查 Charles 0950919 Start↑
//###############################################################################
//						private Function
//###############################################################################


function SetControlDisable(argControlName)
{
    if (document.all[argControlName].type == "text")
    {
        document.all[argControlName].style.backgroundColor = "LightGrey";
        document.all[argControlName].readOnly = true;
    }
    else
    {
        document.all[argControlName].disabled = true;
    }
}

function SetControlEnable(argControlName)
{
    if (document.all[argControlName].type == "text")
    {
        document.all[argControlName].style.backgroundColor = "";
        document.all[argControlName].readOnly = false;
    }
    else
    {
        document.all[argControlName].disabled = false;
    }
}

function SetCombBoxDisable(argControlName)
{
    SetControlDisable(argControlName + "_Text");
    SetControlDisable(argControlName);
}

function SetCombBoxEnable(argControlName)
{
    SetControlEnable(argControlName + "_Text");
    SetControlEnable(argControlName);
}
//如果argNum1 > argNum2則回傳true
function CompareNumber(argNum1, argNum2)
{
    if (argNum1 == Math.min(argNum1, argNum2))
        return false;
    else
        return true;
}
//去除0取得真正的數字
function StringGetInt(argNumStr)
{
    var num = argNumStr;

    if (num.length > 0)
    {
        if (argNumStr.charAt(0) == "0")
            num = argNumStr.substr(1, argNumStr.length - 1);
        if (num.charAt(0) == "0")
            num = StringGetInt(num)
    }
    return num;
}

function FocusAt(argObj)
{
    try
    {
        if (!argObj.disabled)
        {
            //1050706 David 1050087 二代修改，調整focus語法
            //argObj.focus();
            $('#' + argObj.id + '').focus();
        }
    }
    catch (e)
    { }
}

function CheckDate(argObj, argObjName)
{
    if (argObj.value != "")
    {
        jf_PADCHAR(argObj, 7, '0');
        if (!jf_CheckCDATE(argObj.value))
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName + "格式不正確"])), "");
            //FocusAt(argObj);
            return false;
        }
    }
    return true;

}
//檢查來文者相關欄位
function CheckFromOrg(argOrg, argWord, argNo)
{
    //1070402	Kevin_C	1061322	高榮客製化功能，當機關欄不為空白時，來文字或來文號任一欄位不可為空白
    if (document.all.OrgNickName.value == "KVGH")
    {
        if (jf_Trim(argOrg.value) != "" && (argWord.value == "" || argNo.value == ""))
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["來文機關" + argOrg.value + "之來文字號不可為空"])), "");
            if (argWord.value == "")
                FocusAt(argWord);
            else
                FocusAt(argNo);
            return false
        }
    }
    //當來文字或來文號任一欄位不為空白時,機關欄不允許為空白
    else if (argWord.value != "" || argNo.value != "")
    {
        if (jf_Trim(argOrg.value) == "")
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["機關代碼名稱不允許為空白"])), "");
            FocusAt(argOrg);
            return false
        }
    }
    return true;
}

function getToolBarItemObjById(argId)
{
    //1050706 David 1050087 二代修改
    /*for(var i=0;i<document.all.tbTool.numItems;i++)
    {
        if(document.all.tbTool.getItem(i).getAttribute("ID") == argId)
            return document.all.tbTool.getItem(i);
    }*/
    if (document.all[argId])
        return document.all[argId];
    else
        return null;
}

var gOnLoad = true;
function fnAfterPageLoad()
{
    clearInterval(oTimerId); //clear
    if (document.all.ClientSign != null)
    {
        if (SealAndMove())
        {
            //0960402	Caesar 勞委會-傳送後,時常未送出[改為自ODT130 CS中,呼叫ODT130WS.ExecXmlSql()函式,js中不呼叫
            /*
            var wsParam = new Array();
            wsParam[0] = document.all.SendXmlPathFileName.value;
            wsParam[1] = document.all.SOURCE_ORGNO.value;
            var CallWsObj = jf_CallWS("ODT130WS.asmx","ExecSendXml",false,wsParam);
            wsCallHandleSendXML =  CallWsObj.id;
            OnWSResult(CallWsObj);
            */
        }
        else
        {
            //0960402	Caesar 勞委會-傳送後,時常未送出[改為自ODT130 CS中,呼叫ODT130WS.ExecXmlSql()函式,js中不呼叫
            /*
            var wsParam = new Array();
            wsParam[0] = document.all.SendXmlPathFileName.value;
            var CallWsObj = jf_CallWS("ODT130WS.asmx","DeleteSendXml",false,wsParam);
            wsCallHandleSendXML =  CallWsObj.id;
            OnWSResult(CallWsObj);
            */
        }
    }
    else
    {
        if (document.all.txSealAndMoveOk.value == "Y")
        {
            if (document.all.SubstituteDocMsg != null)
            {
                if (document.all.IsPopUpMsg.value == "Y")
                    AlertMsg(document.all.SubstituteDocMsg.value);
                else
                    jf_SetStatusMsg(document.all.SubstituteDocMsg.value);
            }
            else
            {
                if (document.all.IsPopUpMsg.value == "N")
                {
                    jf_SetStatusMsg("公文文號：" + document.all.CurrDocNo.value + " 傳送成功");
                }
                else
                {
                    if (document.all.II_SUBMIT_SIGN != null)
                    {
                        if (document.all.II_SUBMIT_SIGN.value == "Y")
                            AlertMsg("取得公文文號：" + document.all.CurrDocNo.value + "，本文加簽完成");
                        else
                            AlertMsg("取得公文文號：" + document.all.CurrDocNo.value);
                    }
                }
            }

            //0960402	Caesar 勞委會-傳送後,時常未送出[改為自ODT130 CS中,呼叫ODT130WS.ExecXmlSql()函式,js中不呼叫
            /*
            var wsParam = new Array();
            wsParam[0] = document.all.SendXmlPathFileName.value;
            wsParam[1] = document.all.SOURCE_ORGNO.value;
            var CallWsObj = jf_CallWS("ODT130WS.asmx","ExecSendXml",false,wsParam);
            wsCallHandleSendXML =  CallWsObj.id;
            OnWSResult(CallWsObj);
            */
        }
        else if (document.all.txSealAndMoveOk.value == "N")
        {
            //0960402	Caesar 勞委會-傳送後,時常未送出[改為自ODT130 CS中,呼叫ODT130WS.ExecXmlSql()函式,js中不呼叫
            /*
            var wsParam = new Array();
            wsParam[0] = document.all.SendXmlPathFileName.value;
            var CallWsObj = jf_CallWS("ODT130WS.asmx","DeleteSendXml",false,wsParam);
            wsCallHandleSendXML =  CallWsObj.id;
            OnWSResult(CallWsObj);
            */
        }
        document.all.txSealAndMoveOk.value = "";
    }

    //1040728 David 1030160 新增隱藏欄位供外陳外會公文傳送顯示訊息
    if (document.all.SubmitComeOther)
    {
        if (document.all.SubstituteDocMsg != null)
        {
            if (document.all.IsPopUpMsg.value == "Y")
                AlertMsg(document.all.SubstituteDocMsg.value);
            else
                jf_SetStatusMsg(document.all.SubstituteDocMsg.value);
        }
    }

    //1051205 David 1051175 新增顯示案件編號
    if (document.all.ShowCaseNo)
        //1070314	Kevin_C	1070058	一併修正錯字
        //AlertMsg("已取得已案管制編號：" + document.all.ShowCaseNo.value);
        AlertMsg("已取得以案管制編號：" + document.all.ShowCaseNo.value);

    //GetSumType(); //GetSumType改成在Server OnLoad時處理 #2005.12.21 Andy
    gOnLoad = false;
    //設定初值
    jf_SaveInitValue();
    //Cola 001193 取消呼叫此函數
    //GetSumType();

    //0970723	0970762	Yvonne修正公文來源為上級機關交辦，傳送後FOCUS回上級收文日期的問題
    if (!(document.all["txDocNo"].disabled))
    {
        //1050706 David 1050087 二代修改，調整focus語法
        //document.all["txDocNo"].focus();
        $('#txDocNo').focus();

    }
}

function SealAndMove()
{
    //1070824	Joe		1070678		弱掃修正Hardcoded Absolute Path--S
    /*
    //加簽封裝工作區
    var SealTempZone = "C:\\Temp\\ElecRcv\\";
    if(document.all.CurrDocNo != null)
        SealTempZone += document.all.CurrDocNo.value+"\\";
    //正式儲存區Server上的存取WebService
    var StrgFileIoWS = document.all.StorageFileIoWS.value;
    //正式儲存區路徑
    var StrgFilePath = document.all.StroageFilePath.value;

    //電子收文
    if(document.all.ClientSign.value == "E")
    {
        //設定封裝工作區(用來放置電子收文集中儲存區中所有檔案)
        SealTempZone = "C:\\Temp\\ElecRcv\\";
        if(document.all.CurrDocNo != null)
            SealTempZone += document.all.CurrDocNo.value+"\\";
        var CreateSealZone = new ActiveXObject("Scripting.FileSystemObject");
        //建立目錄
        if(!CreateSealZone.FolderExists("C:\\Temp"))
            CreateSealZone.CreateFolder("C:\\Temp");
        if(!CreateSealZone.FolderExists("C:\\Temp\\ElecRcv\\"))
            CreateSealZone.CreateFolder("C:\\Temp\\ElecRcv\\");
        if(!CreateSealZone.FolderExists(SealTempZone))
            CreateSealZone.CreateFolder(SealTempZone);

        //將電子收文儲存區中檔案Download下來
        //	電子收文儲存區的檔案存取WebService
        var ElecRcvServerWs = document.all.ElecRcvIOWs.value;
        //	電子收文儲存區的目錄
        var ElecRcvServerPath = document.all.ElecRcvPath.value;

        //透過存取COM元件取得電子收文儲存區的檔案
        var GetElecRcvFile = new ActiveXObject("WSWrapper.WebFileIO");
        //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
        if ( document.all.II_USE_SSL != null )
        {
            if ( document.all.II_USE_SSL.value == "Y" )
                ElecRcvServerWs = ElecRcvServerWs.replace("http://", "https://") ;
        }
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
        try
        {		
            GetElecRcvFile.Init(ElecRcvServerWs);
            GetElecRcvFile.AddFile(ElecRcvServerPath,"");
            GetElecRcvFile.Download(document.all.CurrArtifact.value,false,SealTempZone);
            //如果發生錯誤
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
        //if(GetElecRcvFile.hasError)
        //{
        //	jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([GetElecRcvFile.ErrorMessage])),"");
        //	return false;
        //}
        }
        catch(e)
        {
            var strErrMsg = e.message;		
            if (GetElecRcvFile.hasError)
                strErrMsg += GetElecRcvFile.ErrorMessage;
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["連接伺服器"+ElecRcvServerWs+"下載檔案發生錯誤，錯誤訊息為:"+strErrMsg])),"");
            return false;
        }
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
    	
        var WorkDoc=new ActiveXObject("MSXML2.DOMDocument");
        WorkDoc.async=false;
        WorkDoc.load(SealTempZone+"SFECMD.XML");

        var EncryptInfo = WorkDoc.getElementsByTagName("ENCRYPT_INFO");
        if(EncryptInfo.length > 0)
        {
            for(var i=0;i<EncryptInfo.item(0).childNodes.length;i++)
            {
                if(EncryptInfo.item(0).childNodes.item(i).tagName == "Where")
                    EncryptInfo.item(0).childNodes.item(i).nodeTypedValue = "0";
                if(EncryptInfo.item(0).childNodes.item(i).tagName == "Method")
                    EncryptInfo.item(0).childNodes.item(i).nodeTypedValue = "1";
            }
        }
        WorkDoc.save(SealTempZone+"SFECMD.XML");
    }
    else if(document.all.ClientSign.value == "S")//0950405 Stella
    {
        //設定封裝工作區(用來放置紙本收文集中儲存區中所有檔案)
        SealTempZone = "C:\\Temp\\PaperRcv\\";
        if(document.all.CurrDocNo != null)
            SealTempZone += document.all.CurrDocNo.value+"\\";
        var CreateSealZone = new ActiveXObject("Scripting.FileSystemObject");
        //建立目錄
        if(!CreateSealZone.FolderExists("C:\\Temp"))
            CreateSealZone.CreateFolder("C:\\Temp");
        if(!CreateSealZone.FolderExists("C:\\Temp\\PaperRcv\\"))
            CreateSealZone.CreateFolder("C:\\Temp\\PaperRcv\\");
        if(!CreateSealZone.FolderExists(SealTempZone))
            CreateSealZone.CreateFolder(SealTempZone);
    	
        //將紙本收文儲存區中檔案Download下來
        //	紙本收文儲存區的檔案存取WebService
        var PaperRcvServerWs = document.all.PaperRcvIOWs.value;
        //	紙本收文儲存區的目錄
        var PaperRcvServerPath = document.all.PaperScanWorkPath.value;
    	
        //透過存取COM元件取得紙本收文儲存區的檔案
        var GetPaperRcvFile = new ActiveXObject("WSWrapper.WebFileIO");
        //1031028	Kenny	[1030836]	配合SSL修改傳入元件之URL
        if ( document.all.II_USE_SSL != null )
        {
            if ( document.all.II_USE_SSL.value == "Y" )
                PaperRcvServerWs = PaperRcvServerWs.replace("http://", "https://") ;
        }
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理
        try
        {		
            GetPaperRcvFile.Init(PaperRcvServerWs);
            GetPaperRcvFile.AddFile(PaperRcvServerPath,"");
            GetPaperRcvFile.Download(document.all.CurrArtifact.value,false,SealTempZone);
        //如果發生錯誤
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--START
        //if(GetPaperRcvFile.hasError)
        //{
        //	jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([GetPaperRcvFile.ErrorMessage])),"");
        //	return false;
        //}
        }
        catch(e)
        {
            var strErrMsg = e.message;		
            if (GetPaperRcvFile.hasError)
                strErrMsg += GetPaperRcvFile.ErrorMessage;
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["連接伺服器"+PaperRcvServerWs+"下載檔案發生錯誤，錯誤訊息為:"+strErrMsg])),"");
            return false;
        }
        //1040617 Gabby[1040324]增加WebFileIO錯誤訊息處理--END
    	
        var WorkDoc=new ActiveXObject("MSXML2.DOMDocument");
        WorkDoc.async=false;
        WorkDoc.load(SealTempZone+"SFECMD.XML");

        var EncryptInfo = WorkDoc.getElementsByTagName("ENCRYPT_INFO");
        if(EncryptInfo.length > 0)
        {
            for(var i=0;i<EncryptInfo.item(0).childNodes.length;i++)
            {
                if(EncryptInfo.item(0).childNodes.item(i).tagName == "Where")
                    EncryptInfo.item(0).childNodes.item(i).nodeTypedValue = "0";
                if(EncryptInfo.item(0).childNodes.item(i).tagName == "Method")
                    EncryptInfo.item(0).childNodes.item(i).nodeTypedValue = "1";
            }
        }
        WorkDoc.save(SealTempZone+"SFECMD.XML");
    }
	
    if(document.all.ClientSign.value == "PP")//紙本來文非線上簽核-建立工作檔
    {
        SealTempZone = document.all.PaperScanWorkPath.value;
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        //建立工作目錄
        if(!fso.FolderExists("C:\\Temp"))
            fso.CreateFolder("C:\\Temp");
        if(!fso.FolderExists("C:\\Temp\\PaperRcvNoOnline\\"))
            fso.CreateFolder("C:\\Temp\\PaperRcvNoOnline\\");
        if(!fso.FolderExists(SealTempZone))
            fso.CreateFolder(SealTempZone);
        //建立工作檔
        var CreateWorkFile = fso.CreateTextFile(SealTempZone+"SFECMD.XML",true);
        CreateWorkFile.WriteLine("<?xml version=\"1.0\" encoding=\"Big5\"?>");
        CreateWorkFile.WriteLine("<CMD_CREATE_SIGNFOLDER>");
        CreateWorkFile.WriteLine("<SIGNER_INFO>");
        CreateWorkFile.WriteLine("<OU></OU>");
        CreateWorkFile.WriteLine("<Role></Role>");
        CreateWorkFile.WriteLine("<EmpNo></EmpNo>");
        CreateWorkFile.WriteLine("<Name></Name>");
        CreateWorkFile.WriteLine("</SIGNER_INFO>");
        CreateWorkFile.WriteLine("<OUTPUT_SETTING>");
        CreateWorkFile.WriteLine("<EndPointUrl></EndPointUrl>");
        CreateWorkFile.WriteLine("<Namespace></Namespace>");
        CreateWorkFile.WriteLine("<FilePath></FilePath>");
        CreateWorkFile.WriteLine("<FileName></FileName>");
        CreateWorkFile.WriteLine("</OUTPUT_SETTING>");
        CreateWorkFile.WriteLine("<ENVELOP_INFO>");
        CreateWorkFile.WriteLine("<ENCRYPT_INFO>");
        CreateWorkFile.WriteLine("<Where></Where>");
        CreateWorkFile.WriteLine("<Method></Method>");
        CreateWorkFile.WriteLine("</ENCRYPT_INFO>");
        CreateWorkFile.WriteLine("<SIGNATURE_INFO>");
        CreateWorkFile.WriteLine("<Where></Where>");
        CreateWorkFile.WriteLine("<Method></Method>");
        CreateWorkFile.WriteLine("</SIGNATURE_INFO>");
        CreateWorkFile.WriteLine("</ENVELOP_INFO>");
        CreateWorkFile.WriteLine("<RCV_DOC_INFO docNo=\"\" containOrgFileInfo=\"false\">");
        CreateWorkFile.WriteLine("</RCV_DOC_INFO>");
        CreateWorkFile.WriteLine("</CMD_CREATE_SIGNFOLDER>");
        CreateWorkFile.Close();
    }
    if (document.all.ClientSign.value == "PS" ||
        document.all.ClientSign.value == "PP")//紙本掃描與紙本來文非線上簽核
    {
        SealTempZone = document.all.PaperScanWorkPath.value;
        //更新資訊
        var WorkDoc=new ActiveXObject("MSXML2.DOMDocument");
        WorkDoc.async=false;
        WorkDoc.load(SealTempZone+"SFECMD.XML");
        var OutputSetting = WorkDoc.getElementsByTagName("OUTPUT_SETTING");
        if(OutputSetting.length > 0)
        {
            for(var i=0;i<OutputSetting.item(0).childNodes.length;i++)
            {
                if(OutputSetting.item(0).childNodes.item(i).tagName == "EndPointUrl")
                    OutputSetting.item(0).childNodes.item(i).nodeTypedValue = StrgFileIoWS;
                if(OutputSetting.item(0).childNodes.item(i).tagName == "Namespace")
                    OutputSetting.item(0).childNodes.item(i).nodeTypedValue = "http://2100T.com.tw";
                if(OutputSetting.item(0).childNodes.item(i).tagName == "FilePath")
                    OutputSetting.item(0).childNodes.item(i).nodeTypedValue = StrgFilePath;
                if(OutputSetting.item(0).childNodes.item(i).tagName == "FileName")
                    OutputSetting.item(0).childNodes.item(i).nodeTypedValue = document.all.CurrDocNo.value+ "-X.XML";
            }
        }

        var SignerInfo = WorkDoc.getElementsByTagName("SIGNER_INFO");
        if(SignerInfo.length > 0)
        {
            for(var i=0;i<SignerInfo.item(0).childNodes.length;i++)
            {
                if(SignerInfo.item(0).childNodes.item(i).tagName == "OU")
                    SignerInfo.item(0).childNodes.item(i).nodeTypedValue = document.all.CurrOU.value;
                if(SignerInfo.item(0).childNodes.item(i).tagName == "Role")
                    SignerInfo.item(0).childNodes.item(i).nodeTypedValue = document.all.CurrRoleName.value;
                if(SignerInfo.item(0).childNodes.item(i).tagName == "EmpNo")
                    SignerInfo.item(0).childNodes.item(i).nodeTypedValue = document.all.CurrEmpNo.value;
                if(SignerInfo.item(0).childNodes.item(i).tagName == "Name")
                    SignerInfo.item(0).childNodes.item(i).nodeTypedValue = document.all.CurrEmpName.value;
            }
        }
    	
        var EncryptInfo = WorkDoc.getElementsByTagName("ENCRYPT_INFO");
        if(EncryptInfo.length > 0)
        {
            for(var i=0;i<EncryptInfo.item(0).childNodes.length;i++)
            {
                if(EncryptInfo.item(0).childNodes.item(i).tagName == "Where")
                    EncryptInfo.item(0).childNodes.item(i).nodeTypedValue = "0";
                if(EncryptInfo.item(0).childNodes.item(i).tagName == "Method")
                    EncryptInfo.item(0).childNodes.item(i).nodeTypedValue = "1";
            	
            }
        }

        var SignatureInfo = WorkDoc.getElementsByTagName("SIGNATURE_INFO");
        if(SignatureInfo.length > 0)
        {
            for(var i=0;i<SignatureInfo.item(0).childNodes.length;i++)
            {
                if(SignatureInfo.item(0).childNodes.item(i).tagName == "Where")
                    SignatureInfo.item(0).childNodes.item(i).nodeTypedValue = "0";
                if(SignatureInfo.item(0).childNodes.item(i).tagName == "Method")
                    SignatureInfo.item(0).childNodes.item(i).nodeTypedValue = "1";
            }
        }

        var EnvelopInfo = WorkDoc.getElementsByTagName("ENVELOP_INFO");
        if(EnvelopInfo.length > 0)
        {
            for(var i=0;i<EnvelopInfo.item(0).childNodes.length;i++)
            {
                if(EnvelopInfo.item(0).childNodes.item(i).tagName == "FILEACCESS_WS_INFO")
                    EnvelopInfo.item(0).removeChild(EnvelopInfo.item(0).childNodes.item(i));
                if(EnvelopInfo.item(0).childNodes.item(i).tagName == "ENVELOP_WS_INFO")
                    EnvelopInfo.item(0).removeChild(EnvelopInfo.item(0).childNodes.item(i));
            }
        }

        var RcvDocInfo = WorkDoc.getElementsByTagName("RCV_DOC_INFO");
        if(RcvDocInfo.length >0)
            RcvDocInfo.item(0).setAttribute('docNo',document.all.CurrDocNo.value);

        WorkDoc.save(SealTempZone+"SFECMD.XML");
    }
	
    //呼叫Eric的元件進行加簽、加密、上傳
    var SignFolderUtilClass = new ActiveXObject("SFolderUtil.SignFolderUtil.1");
    SignFolderUtilClass.CanShowDialog = 1;
	
    //檢查SFECMD.XML是否存在
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    if(!(fso.FileExists(SealTempZone+"SFECMD.xml")))
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["無法取得公文夾工作檔"])),"");
        return false;
    }

    //不加簽處理
    if(document.all.II_SUBMIT_SIGN.value == "N")
    {
        //拿掉SIGNATURE_INFO Tag
        var WorkDoc=new ActiveXObject("MSXML2.DOMDocument");
        WorkDoc.async=false;
        WorkDoc.load(SealTempZone+"SFECMD.XML");
        var EnvelopInfo = WorkDoc.getElementsByTagName("ENVELOP_INFO");
        if(EnvelopInfo.length > 0)
        {
            for(var i=0;i<EnvelopInfo.item(0).childNodes.length;i++)
            {
                if(EnvelopInfo.item(0).childNodes.item(i).tagName == "SIGNATURE_INFO")
                    EnvelopInfo.item(0).removeChild(EnvelopInfo.item(0).childNodes.item(i));
            }
        }
    	
        //---------TRY
        var EncryptInfo = WorkDoc.getElementsByTagName("ENCRYPT_INFO");
        if(EncryptInfo.length > 0)
        {
            for(var i=0;i<EncryptInfo.item(0).childNodes.length;i++)
            {
                if(EncryptInfo.item(0).childNodes.item(i).tagName == "Where")
                    EncryptInfo.item(0).childNodes.item(i).nodeTypedValue = "0";
                if(EncryptInfo.item(0).childNodes.item(i).tagName == "Method")
                    EncryptInfo.item(0).childNodes.item(i).nodeTypedValue = "2";
            }
        }
    	
        WorkDoc.save(SealTempZone+"SFECMD.XML");
    }
    //Eric的元件	
    SignFolderUtilClass.buildSignFolder(document.all.CurrArtifact.value,"",SealTempZone+"SFECMD.XML");	

    //紙本收文非線上簽核需要多處理的工作--據說可以拿掉
    /*
    if(document.all.PaperNotOnline != null)
    {
        //透過存取COM元件上傳封裝檔
        var CopySeal = new ActiveXObject("Scripting.FileSystemObject");
        CopySeal.CopyFile(SealTempZone+"ENVE.XML",SealTempZone+document.all.CurrDocNo.value+"-X.XML",true);
        var UploadSealFile = new ActiveXObject("WSWrapper.WebFileIO");
        UploadSealFile.Init(StrgFileIoWS);
        UploadSealFile.AddFile(StrgFilePath,document.all.CurrDocNo.value+"-X.XML",SealTempZone);
        UploadSealFile.Upload(document.all.CurrArtifact.value,true);
        //刪除Client端檔案
        CopySeal.DeleteFile(SealTempZone+document.all.CurrDocNo.value+"-X.XML");
    }
    */
    /*
    if(SignFolderUtilClass.ErrDescription != "")
    {
        //AlertMsg("已取得公文文號："+document.all.CurrDocNo.value+"\n"+"，但公文加簽過程發生錯誤故尚未傳送"+"\n"+"錯誤原因："+SignFolderUtilClass.ErrDescription);
        AlertMsg("已取得公文文號："+document.all.CurrDocNo.value+"\n"+"，但公文加簽過程發生錯誤故尚未傳送");
        return false;
    }

    //訊息顯示	
    //caesar 0940217
    // 檢核環境變數是否顯示訊息
    if(document.all.SubstituteDocMsg != null)
    {
        if(document.all.IsPopUpMsg.value=="Y")
            AlertMsg(document.all.SubstituteDocMsg.value);
        else
            jf_SetStatusMsg(document.all.SubstituteDocMsg.value);
    }
    else
    {
        if(document.all.IsPopUpMsg.value=="N")
        {
            jf_SetStatusMsg("公文文號："+document.all.CurrDocNo.value+" 傳送成功");
        }
        else
        {
            if(document.all.II_SUBMIT_SIGN.value == "Y")
                AlertMsg("取得公文文號："+document.all.CurrDocNo.value+"，本文加簽完成");
            else
                AlertMsg("取得公文文號："+document.all.CurrDocNo.value);
        }
    }
    return true;

    //刪除工作檔及電子檔
    /*
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    if(SealTempZone != "")
    {	
        fso.DeleteFolder(SealTempZone.substr(0,(SealTempZone.length-1)));
    }
    */
    return true;
    //1070824	Joe		1070678		弱掃修正Hardcoded Absolute Path--E
}

//會取得 "t1,t2,t3"結構中的第argIndex個值
function GetValueFromValueArray(argValueArray, argIndex)
{
    var RtnValueArray = argValueArray.split(",");
    return RtnValueArray[argIndex];
}

//取得DropDownList中的Value
function GetDDLValue(argObj, argIndex)
{
    return GetValueFromValueArray(argObj.options[argObj.selectedIndex].value, argIndex);
}
function GetDDLText(argObj, argIndex)
{
    return argObj.options[argObj.selectedIndex].text;
}

//1000403 Zola 1000035 新增機關識別碼傳回參數
//function GetOrgInfo(argTxObj,argLbObj,argWordObj,argNoObj)
//1050706 David 1050087 二代修改
//function GetOrgInfo(argTxObj,argLbObj,argWordObj,argNoObj,arg_OrgID)
function GetOrgInfo(argTxObj, argLbObj, argWordObj, argNoObj, arg_OrgID, argAutoOrgName)
{
    if (argTxObj.value == "")
        return;

    var wsParam = new Array();
    //1000403 Zola 1000035 宣告一個存放機關代碼或是機關識別碼的物件
    var txtObject;
    wsParam[0] = argTxObj.value;
    wsParam[1] = document.all.h_OrgNo.value;
    wsParam[2] = document.all.h_DeptNo.value;
    wsParam[3] = document.all.h_UserId.value;
    var CallWsObj = jf_CallWS("lib/WEOrgInfo.asmx", "GetOrgInfo", false, wsParam);

    //檢查執行是否成功
    if (jf_IsWebServiceSuccess(CallWsObj))
    {
        if (!CallWsObj.value.ErrorClass.IsErr)
        {
            if (CallWsObj.value.Count > 0)
            {
                //1000403 Zola 1000035 註記掉--START
                //if(jf_Trim(CallWsObj.value.OrgID[0])!="")
                //	argTxObj.value = jf_Trim(CallWsObj.value.OrgID[0]);
                //argLbObj.value = jf_Trim(CallWsObj.value.OrgName[0]);
                //檢查成功呼叫檔字
                //GetFromNo(argTxObj,argWordObj,argNoObj);
                //1000403 Zola 1000035 註記掉--END

                //1000403 Zola 1000035 如果機關代碼為空字串則以識別碼取預設字與主旨 - START
                if (jf_Trim(CallWsObj.value.OrgID[0]) != "")
                {
                    argTxObj.value = jf_Trim(CallWsObj.value.OrgID[0]);
                    txtObject = argTxObj;		//存放機關代碼
                    arg_OrgID.value = "";
                }
                else
                {
                    arg_OrgID.value = jf_Trim(CallWsObj.value._OrgID[0]);
                    txtObject = arg_OrgID;			//存放機關識別碼
                }
                argLbObj.value = jf_Trim(CallWsObj.value.OrgName[0]);
                //1050706 David 1050087 二代修改
                argAutoOrgName.value = argLbObj.value;
                //檢查成功呼叫檔字
                GetFromNo(txtObject, argWordObj, argNoObj);
                //1000403 Zola 1000035 如果機關代碼為空字串則以識別碼取預設字與主旨 - END
            }
            else
            {
                //caesar 0940608 因並藥檢局需求.
                // 透過環境變數OD_ODT130_CHECK_FROMORG設定是否需檢核來文機關需於orgmain中
                if (document.all.IsCheckFromOrg.value == "Y")
                {
                    var orgName = argTxObj.value;
                    alert('您所輸入之來文機關[' + orgName + ']尚未建立於資料庫中,請先透過[WEM010發文機關維護作業]建立後,再行登錄.');
                    argTxObj.value = '';
                    //1050706 David 1050087 二代修改，調整focus語法
                    //argTxObj.focus();
                    $('#' + argAutoOrgName.id + '').focus();
                }
                //2006.07.06 JEFF 搜尋機關名稱失敗則清空txFromOrgName1
                argLbObj.value = '';

                //0990826 David 0990312 清空來文字選單值
                ClearDL(argWordObj);
            }
        }
        else
        {
            alert(CallWsObj.value.ErrorClass.ErrMessage[0]);
            //0990826 David 0990312 清空來文字選單值
            ClearDL(argWordObj);
        }
    }
    else
    {
        //0990826 David 0990312 清空來文字選單值
        ClearDL(argWordObj);
    }
}

function GetFromNo(argTxObj, argWordObj, argNoObj)
{
    //0990826 David 0990312 來文字欄位改為ComboBox--Start
    if (argTxObj.value == "")
        return;

    var wsParam = new Array();
    wsParam[0] = argTxObj.value;
    //檔字空白才會繼續呼叫WS
    //0990826 David 0990312 取消此行為
    /*if (argWordObj.value != "")
        return;*/
    var CallWsObj = jf_CallWS("ODT130WS.asmx", "GetDefaultFromNoWord", false, wsParam);

    //檢查執行是否成功
    if (jf_IsWebServiceSuccess(CallWsObj))
    {
        if (!CallWsObj.value.ErrorClass.IsErr)
        {
            //0990826 David 0990312 清空選單值
            ClearDL(argWordObj);

            var BTypeComboBoxObj = argWordObj;
            var BTypeComboBoxTextObj = document.all[argWordObj.id + "_Text"];

            //回傳有值才秀出
            if (argWordObj.value == "" && CallWsObj.value.RtnStr != "")
            {
                //argWordObj.value = CallWsObj.value.RtnStr;
                //argNoObj.focus();

                var pTmpAry = CallWsObj.value.RtnStr.split("|");

                //將值塞入 dlFromWord
                if (pTmpAry.length == 0)
                {
                    BTypeComboBoxObj.size = 2;
                    BTypeComboBoxObj.options.add(new Option("", ""));
                    BTypeComboBoxTextObj.value = "";//第一筆空白
                    //1000613 David 1000393 修正來文字ComboBox欄位初始時，不需異動業務類別欄位SelectIndex
                    //document.all.dlWorkType.selectedIndex = 0;
                    argWordObj.selectedIndex = 0;
                }
                else
                {
                    if (pTmpAry.length < 5)
                        BTypeComboBoxObj.size = pTmpAry.length;
                    else
                        BTypeComboBoxObj.size = 5;

                    for (var i = 0; i < pTmpAry.length; i++)
                    {
                        var objOption = new Option(pTmpAry[i], pTmpAry[i]);
                        BTypeComboBoxObj.options.add(objOption);
                    }
                    if (BTypeComboBoxTextObj.value == "")
                        BTypeComboBoxTextObj.value = pTmpAry[0];
                }
            }
            else
            {
                BTypeComboBoxObj.size = 2;
                BTypeComboBoxObj.options.add(new Option("", ""));
                //1000613 David 1000393 修正來文字ComboBox欄位初始時，不需異動業務類別欄位SelectIndex
                //document.all.dlWorkType.selectedIndex = 0;
                argWordObj.selectedIndex = 0;
            }
        }
        else
        {
            alert(CallWsObj.value.ErrorClass.ErrMessage[0]);
        }
    }
    //0990826 David 0990312 來文字欄位改為ComboBox--End
}
//------------------------------------
//Function Type		:D
//Description		:依傳入之檔名呼叫繫結之程式並開啟該檔案
//Parameter
//	‧argFileName	:包含路徑之檔名
//------------------------------------
function OpenFile(argFileName)
{
    var oShell = new ActiveXObject("Shell.Application");
    var commandtoRun = argFileName;
    var param = "";
    oShell.ShellExecute(commandtoRun, param, "", "", 1);
}

function AlertMsg(argMsg)
{
    jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argMsg])), "");
}

//2004-02-11 add******
//業務類別改變時 帶出 相關時效統計變數 及 辦理階段
function dlWorkType_onchange()
{
    if (document.all.h_PtyChangeWithBns.value != "N")//0970139 取得由ODM310設定公文性質、主旨、承辦單位
        GetDocPty();
    GetSumType();
    odjf_ComboBoxCheck("dlWorkType", "業務類別");
}

//取得辦理階段
function GetStepName()
{
    if (document.all.dlWorkType.selectedIndex == -1)
        return;
    //0960207 	Jeff	951204			藥檢局-修改業務類別切換帶不出辦理階段的問題
    //if(document.all.txCaseNo.value == "" 
    // || document.all.dlWorkType.options[document.all.dlWorkType.selectedIndex].value == "")
    if (document.all.dlWorkType.options[document.all.dlWorkType.selectedIndex].value == "")
        return;

    //呼叫CASE_WS取得該業務類別下，所有辦理階段
    var param = new Array(3);
    param[0] = "";

    //1050817 Zen 1050700 弱掃XSS修正--begin
    //param[1] = document.all.txCaseNo.value;
    //param[2] = document.all.dlWorkType.options[document.all.dlWorkType.selectedIndex].value;
    param[1] = encodeURI(document.all.txCaseNo.value);
    param[2] = encodeURI(document.all.dlWorkType.options[document.all.dlWorkType.selectedIndex].value);
    //1050817 Zen 1050700 弱掃XSS修正--end

    callObj = jf_CallWS("lib/OD_LIB.asmx", "GetBTypeStep", false, param);
    iCallID_GetBTypeStep = callObj.id;
    OnWSResult(callObj);
}

//取得時效統計類別 - 相關變數
function GetSumType()
{
    if (document.all.dlWorkType.selectedIndex == -1)
        return;

    if (document.all.dlWorkType.options[document.all.dlWorkType.selectedIndex].value == "")
    {
        InitTimeContrlFields();
        return;
    }

    //呼叫 WS 取得該業務類別下之時效統計類別及處理期限是否可人工輸入
    //1130819 Kevin 1130651 立委諮詢案件以來文日期進行為起算日期
    //var param = new Array(5);
    var param = new Array(6);
    var ddlValueArray = document.all.ddlProperty.options[document.all.ddlProperty.selectedIndex].value.split(",");
    var strDocProperty = ddlValueArray[0];
    param[0] = ""; 			//機關代碼
    //1061110	Kevin_C	1061070	弱掃Client Potential Code Injection修正
    //param[1] = strDocProperty; //公文性質
    param[1] = encodeURI(strDocProperty); //公文性質

    var strSpdNo = "";
    if (document.all.ddlSpeed.selectedIndex != -1)
    {
        //1040630 David 1040517 因速別選單VALUE修改為僅記錄代碼，調整取值邏輯
        //ddlValueArray = document.all.ddlSpeed.options[document.all.ddlSpeed.selectedIndex].value.split(",");
        //strSpdNo = ddlValueArray[0];
        //1050817 Zen 1050700 弱掃XSS修正
        //strSpdNo = document.all.ddlSpeed.options[document.all.ddlSpeed.selectedIndex].value;
        strSpdNo = encodeURI(document.all.ddlSpeed.options[document.all.ddlSpeed.selectedIndex].value);
    }

    param[2] = strSpdNo; //速別

    //1050817 Zen 1050700 弱掃XSS修正--begin
    //param[3] = document.all.dlWorkType.options[document.all.dlWorkType.selectedIndex].value; //業務類別
    //param[4] = document.all.txRcvDate.value; //收創文日期
    param[3] = encodeURI(document.all.dlWorkType.options[document.all.dlWorkType.selectedIndex].value); //業務類別
    param[4] = encodeURI(document.all.txRcvDate.value); //收創文日期
    //1130819 Kevin 1130651 立委諮詢案件以來文日期進行為起算日期
    param[5] = encodeURI(document.all.txFromDate.value);
    //1050817 Zen 1050700 弱掃XSS修正--end

    //1130819 Kevin 1130651 立委諮詢案件以來文日期進行為起算日期
    //callObj = jf_CallWS("lib/TIME_LIB.asmx", "GetSumType", false, param);
    callObj = jf_CallWS("lib/TIME_LIB.asmx", "GetSumTypeForRcv", false, param);
    iCallID_GetSumType = callObj.id;
    OnWSResult(callObj);
}
//0970139 取得公文性質、預設主旨(ODM310設定)、單位
function GetDocPty()
{
    //呼叫 WS 取得該業務類別的公文性質、預設主旨(ODM310設定)、單位
    var param = new Array(3);

    //1050817 Zen 1050700 弱掃XSS修正--begin
    //param[0] = jf_Trim(document.all.h_OrgNo.value);//機關代碼
    //param[1] = jf_Trim(document.all["dlWorkType"].value); //業務類別代碼
    param[0] = encodeURI(jf_Trim(document.all.h_OrgNo.value));//機關代碼
    param[1] = encodeURI(jf_Trim(document.all["dlWorkType"].value)); //業務類別代碼
    //1050817 Zen 1050700 弱掃XSS修正--end

    callObj = jf_CallWS("ODT130WS.asmx", "GetDocPty", false, param);
    iCallID_GetDocPty = callObj.id;
    OnWSResult(callObj);
}

function SetDlItemByValue(argDlObj, argText)
{
    for (var i = 0; i < argDlObj.length; i++)
    {
        if (argDlObj.options[i].value == argText)
        {
            argDlObj.selectedIndex = i;
            break;
        }
    }
}

function SetDlItemByText(argDlObj, argText)
{
    for (var i = 0; i < argDlObj.length; i++)
    {
        if (argDlObj.options[i].text == argText)
        {
            argDlObj.selectedIndex = i;
            break;
        }
    }
}

//0970139---start 取得Combobox的值
function SetCbItemByText(argDlObj, argText)
{
    for (var i = 0; i < argDlObj.length; i++)
    {
        var strObjText = argDlObj.options[i].text.split(" ")[1];
        if (strObjText == argText)
        {
            argDlObj.selectedIndex = i;
            document.all[argDlObj.id + "_Text"].value = argDlObj.options[i].text;
            break;
        }
    }
}
//0970139---end

//將DropDownList裡的item清除
function ClearDL(argObj)
{
    for (var i = 0; i < argObj.length; i++)
        argObj.remove(0);

    argObj.length = 0;
    return;
}

function GetSumTypeDesc(argSumType)
{
    //1021122 David 1020921 「時效統計」欄位顯示內容來源調整，此段不需要
    /*switch (argSumType)
    {
        case "1": return "一般公文";
        case "2": return "不納入統計";
        case "3": return "專案管制";
        case "4": return "立委質詢";
        case "5": return "人民申請案件";
        case "6": return "人民陳情案件";
        case "7": return "訴願案件";
        //1000329 David 新增時效統計說明
        case "8": return "加會本局";
        case "9": return "特殊案件";
        case "A": return "監察案件";
        default: return "";
            break;
    }*/

    //1021122 David 1020921 「時效統計」欄位顯示內容來源調整，改依符合的公文性質名稱顯示
    for (i = 0; i < document.all.ddlProperty.options.length; i++)
    {
        var ddlValueArray = document.all.ddlProperty.options[i].value.split(",");
        var strDocPrty = ddlValueArray[0];
        if (strDocPrty == argSumType)
        {
            return document.all.ddlProperty.options[i].text;
        }
    }
    return "";
}

function jf_IsWebServiceSuccessNoAlert(argResult)
{
    var L_NotReady_Text = "Service unavailable";

    if (argResult.error)
    {
        if (argResult.errorDetail.string == L_NotReady_Text)
        {
            //
        }
        else
        {
            alert(argResult.errorDetail.string);
        }
        return false;
    }
    else
    {
        obj = argResult.value;
        if (obj.ErrorClass.IsErr)
        {
            if (obj.ErrorClass.IsRedirect)
            {
                jf_RedirectToCustomErrPage();
                return false;
            }
            else
                return true;
        }
    }
    return true;
}

//取得辦理期限 call Time_lib.asmx
var SpeedDay = "";
function GetWorkDate()
{
    var GetAlready = false;
    var ddlValueArray;
    var strSpdNo = "";
    if (document.all.ddlSpeed.selectedIndex != -1)
    {
        //1040630 David 1040517 因速別選單VALUE修改為僅記錄代碼，調整取值邏輯
        //ddlValueArray = document.all.ddlSpeed.options[document.all.ddlSpeed.selectedIndex].value.split(",");
        //strSpdNo = ddlValueArray[0];
        //1050817 Zen 1050700 弱掃XSS修正
        //strSpdNo = document.all.ddlSpeed.options[document.all.ddlSpeed.selectedIndex].value;
        strSpdNo = encodeURI(document.all.ddlSpeed.options[document.all.ddlSpeed.selectedIndex].value);
    }

    var param = new Array(5);

    //1010713 Kevin 1010608 限辦日期計算時，補充天數跟原始可辦理天數分開計算
    var paramFullLeadTime = new Array(5);
    paramFullLeadTime[1] = "1";

    if (document.all.txLtBy.value == "M") //依開會日期計算
        //1050817 Zen 1050700 弱掃XSS修正
        //param[0] = document.all.txMeetDate.value;
        param[0] = encodeURI(document.all.txMeetDate.value);
    else
        //1050817 Zen 1050700 弱掃XSS修正
        //param[0] = document.all.txStartDate.value;
        param[0] = encodeURI(document.all.txStartDate.value);

    //計算限辦日期
    if (document.all.txLtBy.value == "S") //依速別計算
    {
        if (strSpdNo == "") return;
        //1040630 David 1040517 如依速別計算時，速別代碼不可為4
        if (strSpdNo == "4")
        {
            document.all.txLimitDate.value = "";
            document.all.txLeadTime.value = "";
            return;
        }

        param[1] = strSpdNo; //速別

    }
    else if (document.all.txLtBy.value == "M") //依開會日期計算
    {
        //1050817 Zen 1050700 弱掃XSS修正
        //param[1] = document.all.txLeadTime.value; //使用者輸入的Lead_time
        param[1] = encodeURI(document.all.txLeadTime.value); //使用者輸入的Lead_time
    }
    else if (document.all.txLtBy.value == "I") //使用者輸入 -> read txLeadTime
    {
        //1050817 Zen 1050700 弱掃XSS修正
        //param[1] = document.all.txLeadTime.value; //使用者輸入的Lead_time
        param[1] = encodeURI(document.all.txLeadTime.value); //使用者輸入的Lead_time
    }
    else if (document.all.txLtBy.value == "B") //依資料庫Lead_time -> read txLeadTimeDB
    {
        //1050817 Zen 1050700 弱掃XSS修正
        //param[1] = document.all.txLeadTimeDB.value; //本筆資料的Lead_time
        param[1] = encodeURI(document.all.txLeadTimeDB.value); //本筆資料的Lead_time
    }
    else
    {
        //unknown method -> 不處理
        return;
    }
    //0980129 start LeadTime再加上依公文性質及環境變數OD_DOC_PTY_5_MODE
    if (document.all.hcom_no != null && document.all.OD_DOC_PTY_5_MODE != null)
    {
        var param2 = new Array(6);
        //1050817 Zen 1050700 弱掃XSS修正
        //param2[0] = document.all.SOURCE_ORGNO.value;
        param2[0] = encodeURI(document.all.SOURCE_ORGNO.value);
        param2[1] = document.all.txDocNo.value;

        //1010713 Kevin 1010608 算補充天數時起算日(第一次算出之限辦日)不算一天補一天回去
        param2[2] = "1";
        //0990127 David 0990019 如計算邏輯為依速別時，應取得對應的辦理天數再傳入fnGetFullLeadTime()--START
        if (document.all.txLtBy.value == "S")
        {
            var param3 = new Array(2);
            param3[0] = param2[0];//機關代碼
            param3[1] = param[1];//此時為速別代碼
            var CallWsObj = jf_CallWS("ODT130WS.asmx", "GetSpeedDay", false, param3);
            if (!CallWsObj.error)
            {
                //1010713 Kevin 1010608 限辦日期計算時，補充天數跟原始可辦理天數分開計算
                //param2[2] = CallWsObj.value;
                SpeedDay = CallWsObj.value;
                //1010713 Kevin 1010608 限辦日期計算時，補充天數跟原始可辦理天數分開計算
                //GetAlready = true;
            }
        }//END
        //1010713 Kevin 1010608 限辦日期計算時，補充天數跟原始可辦理天數分開計算
        //else
        //	param2[2] = param[1];

        param2[3] = document.all.hcom_no.value;
        param2[4] = document.all.txSumType.value;
        param2[5] = document.all.OD_DOC_PTY_5_MODE.value;
        //取得環境變數OD_DOC_PTY_5_MODE (1:(環保局模式)重新計算扣除補件天數(預設) 0:(藥檢局模式)不重新計算,即為現行系統處理模式)
        callObj = jf_CallWS("lib/OD_LIB.asmx", "fnGetFullLeadTime", false, param2);
        if (!callObj.error)
        {
            //1010713 Kevin 1010608 限辦日期計算時，補充天數跟原始可辦理天數分開計算
            //param[1] = callObj.value;
            paramFullLeadTime[1] = callObj.value;
        }
    }
    //0980129 end

    //0990127 David 0990019 如已取過完整辦理天數，直接將完整天數傳入GetWorkDate()
    if (GetAlready)
        param[2] = "I";
    else
        //1050817 Zen 1050700 弱掃XSS修正
        //param[2] = document.all.txLtBy.value;
        param[2] = encodeURI(document.all.txLtBy.value);
    if (document.all.txLtIncHd.value == "Y") //含假日
        param[3] = "1";
    //0991119	[0990695]	Yvonne	呼叫GetWorkDate時，支援連休3日Mode之處理
    else if (document.all.txLtIncHd.value == "H")//連續假日(連休3日Mode)
        param[3] = "3";
    else //不含假日
        param[3] = "2";

    //1050817 Zen 1050700 弱掃XSS修正
    //param[4] = document.all.dlLtUom.options[document.all.dlLtUom.selectedIndex].value;
    param[4] = encodeURI(document.all.dlLtUom.options[document.all.dlLtUom.selectedIndex].value);

    callObj = jf_CallWS("lib/TIME_LIB.asmx", "GetWorkDate", false, param);
    iCallID_GetWorkDate = callObj.id;
    if (!OnWSResult(callObj))
    {
        return false;
    }

    //1010713 Kevin 1010608 限辦日期計算時，補充天數跟原始可辦理天數分開計算
    paramFullLeadTime[0] = document.all.txLimitDate.value;
    paramFullLeadTime[2] = "I";
    paramFullLeadTime[3] = param[3];
    paramFullLeadTime[4] = "天";

    //1010713 Kevin 1010608 計算補充天數
    callObj = jf_CallWS("lib/TIME_LIB.asmx", "GetWorkDate", false, paramFullLeadTime);
    if (!callObj.error)
    {
        document.all.txLimitDate.value = callObj.value.WorkDate;
    }

    //1030703 David 1030365 如業務類別限辦日期計算邏輯需順延至工作日，呼叫GetUnHoliday()取得限辦日期
    if (document.all.txDueRule.value == "Y")
    {
        var paramGetUnHoliday = new Array(3);
        paramGetUnHoliday[0] = document.all.txLimitDate.value;
        paramGetUnHoliday[1] = 0;
        paramGetUnHoliday[2] = "1";
        callObj = jf_CallWS("lib/OD_LIB.asmx", "GetUnHoliday", false, paramGetUnHoliday);
        if (!callObj.error)
        {
            document.all.txLimitDate.value = callObj.value.RtnWorkDate;
        }
    }
}

function txLeadTime_onchange()
{
    GetWorkDate();
}

function txLeadTime_onblur()
{
    GetWorkDate();
}

//0980831	David	0980445	修改起算日期檢查函式
var utxStartDateChecked = false;
function txStartDate_onblur(argIsCheckDone)
{
    if (utxStartDateChecked)
    {
        utxStartDateChecked = false;
        return true;
    }
    if (argIsCheckDone)
        utxStartDateChecked = true;

    if (document.all.txStartDate.value == "")
        return;

    if (!CheckDate(document.all.txStartDate, "起算日期"))
    {
        FocusAt(document.all.txStartDate);
        return false;
    }
    /*if(!jf_CheckCDATE(document.all.txStartDate.value))
    {
        //0961122 Stella修正日期格式不正確之訊息
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["起算日期格式不正確"])),"");
        FocusAt(document.all.txStartDate);
        return false;
    }*/

    GetWorkDate();
    return true;
}

function txStartDate_onchange()
{
    if (document.all.txStartDate.value == "")
        return;

    if (!jf_CheckCDATE(document.all.txStartDate.value))
        return;

    GetWorkDate();
}

function dlLtUom_onchange()
{
    document.all.txLtUom.value = document.all.dlLtUom.options[document.all.dlLtUom.selectedIndex].value;//Zoey [951311, 95/12/22]
    GetWorkDate();
}

//由公文性質取得業務類別
function GetBTypeNo()
{
    InitTimeContrlFields();

    if (document.all.ddlProperty.selectedIndex == -1) return;
    //1050817 Zen 1050700 弱掃XSS修正
    //var ddlValue = document.all.ddlProperty.options[document.all.ddlProperty.selectedIndex].value;
    var ddlValue = encodeURI(document.all.ddlProperty.options[document.all.ddlProperty.selectedIndex].value);
    //VALUE:公文性質代碼,是否開放輸入限辦期限,是否開放選擇速別,是否以案管制
    var ddlValueArray = ddlValue.split(",");
    //是否開放輸入限辦期限
    strDocProperty = ddlValueArray[0];

    //1031024 Eric 1030786 增加傳入系統參數GET_BTYPENO_BY_OU_RULE
    //var param = new Array(4);
    var param = new Array(5);
    var pTmpAry = document.all.H_txUserDept.value.split(",");
    param[0] = ""; //機關代碼
    //1050817 Zen 1050700 弱掃XSS修正
    //param[1] = document.all.H_txGetBType.value;
    param[1] = encodeURI(document.all.H_txGetBType.value);
    param[2] = pTmpAry[0];
    if (document.all.h_PtyChangeWithBns.value == "N")//0970139 以公文性質帶出業務類別才將公文性質傳入，否則傳入空白
        param[3] = strDocProperty; //本筆資料的Lead_time
    else
        param[3] = "";
    //1031024 Eric 1030786 增加傳入系統參數GET_BTYPENO_BY_OU_RULE
    //1050817 Zen 1050700 弱掃XSS修正
    //param[4] = document.all.H_GetBTypeNoByOuRule.value;
    param[4] = encodeURI(document.all.H_GetBTypeNoByOuRule.value);

    //1031024 Eric 1030786 修改傳入WS函式(改為傳入6個參數)
    callObj = jf_CallWS("lib/TIME_LIB.asmx", "GetBTypeNoByDeptNoAndSysBTypeNo", false, param);
    iCallID_GetBTypeNo = callObj.id;
    OnWSResult(callObj);
}

//初始化 時效管制 欄位
function InitTimeContrlFields()
{
    document.all.txSumTypeShow.value = "";
    document.all.txSumType.value = "";
    document.all.txLeadTime.value = "0";
    document.all.dlLtUom.selectedIndex = 0;
    document.all.txStartDate.value = "";
    document.all.txLimitDate.value = "";
}

//*****

//將client端改變的DropDownList的值存入textbox送回server
function KeepDropDownListValue()
{
    document.all.txWorkType.value = "";
    document.all.txStepName.value = "";
    if (document.all.dlWorkType.selectedIndex != -1)
    {
        document.all.txWorkType.value = document.all.dlWorkType.options[document.all.dlWorkType.selectedIndex].value;
        //JEFF 單號 950692 紀錄使用者POST BACK前選擇業務類別為第幾項
        document.all.txWorkTypeIdx.value = document.all.dlWorkType.selectedIndex;
    }
    if (document.all.dlStepName.selectedIndex != -1)
    {
        document.all.txStepName.value = document.all.dlStepName.options[document.all.dlStepName.selectedIndex].value;
        //JEFF 單號 950692 紀錄使用者POST BACK前選擇業務類別為第幾項
        document.all.txWorkTypeIdx.value = document.all.dlWorkType.selectedIndex;
    }
}

//檢查登錄的公文是否重覆
//1.檢查欄位：來文機關 fromorg_name, from_no_no, from_no_word
//2.只有在新增模式下才檢查
var iCallID_ChkDuplicateDoc = null;
function ChkDuplicateDoc()
{
    if (jf_GetActionMode() != LayoutModeNew) return true;

    //1020826 David 1020651 判斷重複收文WS函式新增傳入參數，宣告改為不限定長度
    //var param = new Array(1);
    var param = new Array();

    //Zoey [000457, 96/04/04]
    if (document.all.h_DeliveOrg.value == "N")
    {
        vFromOrgName1 = "NONE";
        vFromOrgName2 = "NONE";
        vFromOrgName3 = "NONE";
    }
    else
    {
        //1050817 Zen 1050700 弱掃XSS修正--begin
        //vFromOrgName1=document.all["txFromOrgName1"].value;
        //vFromOrgName2=document.all["txFromOrgName2"].value;
        //vFromOrgName3=document.all["txFromOrgName3"].value;
        vFromOrgName1 = encodeURI(document.all["txFromOrgName1"].value);
        vFromOrgName2 = encodeURI(document.all["txFromOrgName2"].value);
        vFromOrgName3 = encodeURI(document.all["txFromOrgName3"].value);
        //1050817 Zen 1050700 弱掃XSS修正--end

        //Zoey [96/08/17,001461]避免ORGMAIN無資料之機關，無法檢核是否有重覆來文
        //1050817 Zen 1050700 弱掃XSS修正--begin
        //if (jf_Trim(vFromOrgName1) == "")
        //	vFromOrgName1 = jf_Trim(document.all["txFromOrgNo1"].value);
        //if(jf_Trim(vFromOrgName2)=="")
        //	vFromOrgName2 = jf_Trim(document.all["txFromOrgNo2"].value);
        //if(jf_Trim(vFromOrgName3)=="")
        //	vFromOrgName3 = jf_Trim(document.all["txFromOrgNo3"].value);
        if (jf_Trim(vFromOrgName1) == "")
            vFromOrgName1 = encodeURI(jf_Trim(document.all["txFromOrgNo1"].value));
        if (jf_Trim(vFromOrgName2) == "")
            vFromOrgName2 = encodeURI(jf_Trim(document.all["txFromOrgNo2"].value));
        if (jf_Trim(vFromOrgName3) == "")
            vFromOrgName3 = encodeURI(jf_Trim(document.all["txFromOrgNo3"].value));
        //1050817 Zen 1050700 弱掃XSS修正--end
    }
    //0990826 David 0990312 來文字欄位改為ComboBox
    /*param[0] = vFromOrgName1+","+document.all["txFromWord1"].value+","+document.all["txFromNo1"].value+","
                  +vFromOrgName2+","+document.all["txFromWord2"].value+","+document.all["txFromNo2"].value+","
                  +vFromOrgName3+","+document.all["txFromWord3"].value+","+document.all["txFromNo3"].value;*/
    //1050817 Zen 1050700 弱掃XSS修正--begin
    //param[0] = vFromOrgName1 + "," + document.all["dlFromWord1_Text"].value + "," + document.all["txFromNo1"].value + ","
    //		  +vFromOrgName2+","+document.all["dlFromWord2_Text"].value+","+document.all["txFromNo2"].value+","
    //		  +vFromOrgName3+","+document.all["dlFromWord3_Text"].value+","+document.all["txFromNo3"].value;
    param[0] = vFromOrgName1 + "," + encodeURI(document.all["dlFromWord1_Text"].value) + "," + encodeURI(document.all["txFromNo1"].value) + ","
        + vFromOrgName2 + "," + encodeURI(document.all["dlFromWord2_Text"].value) + "," + encodeURI(document.all["txFromNo2"].value) + ","
        + vFromOrgName3 + "," + encodeURI(document.all["dlFromWord3_Text"].value) + "," + encodeURI(document.all["txFromNo3"].value);
    //1050817 Zen 1050700 弱掃XSS修正--end

    //1020826 David 1020651 判斷重複收文WS函式新增傳入參數，用來區分總收收文還是單位收文
    //1050817 Zen 1050700 弱掃XSS修正
    //param[1] = document.all.h_DeptNo.value;
    param[1] = encodeURI(document.all.h_DeptNo.value);
    //1031222 Eric 1030893 增加判斷OD_ODT130_CHECK_DELIVORG系統參數是否為C，若是串入來文日期
    if (document.all.h_DeliveOrg.value == "C")
    {
        //1050817 Zen 1050700 弱掃XSS修正
        //param[0] += "," + document.all.txFromDate.value;
        param[0] += "," + encodeURI(document.all.txFromDate.value);
    }
    //1070506	Kevin_C	1070242	增加傳入受文者代碼
    param[2] = encodeURI(document.all.H_RcvOrgno.value);
    //1070717	Kevin_C	1070242	增加檢核受文者名稱
    param[3] = encodeURI(document.all.H_RcvOrg.value);

    callObj = jf_CallWS("lib/OD_LIB.asmx", "ChkDuplicateDoc", false, param);
    iCallID_ChkDuplicateDoc = callObj.id;
    var pResult = OnWSResult(callObj);
    return pResult;
}

//取得辦理期限 call Time_lib.asmx
var iCallID_GetWorkDays = null;
function GetWorkDays()
{
    if (document.all.txLimitDate.readOnly)
        return;

    //1050817 Zen 1050700 弱掃XSS修正--begin
    //document.all.txStartDate.value = jf_Trim(document.all.txStartDate.value);
    //document.all.txLimitDate.value = jf_Trim(document.all.txLimitDate.value);
    document.all.txStartDate.value = encodeURI(jf_Trim(document.all.txStartDate.value));
    document.all.txLimitDate.value = encodeURI(jf_Trim(document.all.txLimitDate.value));
    //1050817 Zen 1050700 弱掃XSS修正--end

    //起算日期不可空白
    if (document.all.txStartDate.value == "")
        return;

    //限辦日期不可空白
    if (document.all.txLimitDate.value == "")
        return;

    //限辦日期不可小於起算日期
    if (document.all.txLimitDate.value < document.all.txStartDate.value)
    {
        alert("限辦日期不可小於起算日期");
        //1050706 David 1050087 二代修改，調整focus語法
        //document.all.txLimitDate.focus();
        $('#txLimitDate').focus();
        return;
    }

    var param = new Array(3);
    //1050817 Zen 1050700 弱掃XSS修正
    //param[0] = document.all.txStartDate.value;
    param[0] = encodeURI(document.all.txStartDate.value);

    if (document.all.txLtBy.value == "I") //使用者輸入 -> read txLeadTime
    {
        //1050817 Zen 1050700 弱掃XSS修正
        //param[1] = document.all.txLimitDate.value; //使用者輸入的限辦日期
        param[1] = encodeURI(document.all.txLimitDate.value); //使用者輸入的限辦日期
    }
    else
    {
        //unallow method -> 不處理
        return;
    }

    if (document.all.txLtIncHd.value == "Y") //含假日
        param[2] = "1";
    //0991119	[0990695]	Yvonne	呼叫GetWorkDays時，支援連休3日Mode之處理
    else if (document.all.txLtIncHd.value == "H") //連續假日(連休3日Mode)
        //1010713 Kevin 1010608 修正Bug
        //strLtIncHd = "3";
        param[2] = "3";
    else //不含假日
        param[2] = "2";

    callObj = jf_CallWS("lib/TIME_LIB.asmx", "GetWorkDays", false, param);
    iCallID_GetWorkDays = callObj.id;
    if (!OnWSResult(callObj))
    {
        return false;
    }

}
//0980831	David	0980445	修改限辦日期檢查函式
var uLimitDateChecked = false;
function txLimitDate_onblur(argIsCheckDone)
{
    if (uLimitDateChecked)
    {
        uLimitDateChecked = false;
        return true;
    }
    if (argIsCheckDone)
        uLimitDateChecked = true;

    //限辦日期
    if (document.all.txLimitDate.value != "")
    {
        if (!CheckDate(document.all.txLimitDate, "限辦日期"))
        {
            FocusAt(document.all.txLimitDate);
            return false;
        }
        if (document.all.txLimitDate.value < document.all.txStartDate.value)
        {
            alert("限辦日期不可小於起算日期");
            return false;
        }
    }

    GetWorkDays();

    //1101126 Zen 1100948 修正限辦日期設為假日時未自動帶為下個工作日之問題
    let strLastLimitDate = document.all['txLimitDate'].value;
    GetWorkDate();
    if (strLastLimitDate != document.all['txLimitDate'].value)
        alert('依照文書流程作業規範第五十四點說明，自動將限辦日期調整為上班日' + document.all['txLimitDate'].value);

    return true;
}

//2004-06-17 add ***
//0980831	David	0980445	修改上級收文日期檢查函式
var uSrcRcvDateChecked = false;
function txSrcRcvDate_onblur(argIsCheckDone)
{
    if (uSrcRcvDateChecked)
    {
        uSrcRcvDateChecked = false;
        return true;
    }
    if (argIsCheckDone)
        uSrcRcvDateChecked = true;

    //0961122 Stella修正日期格式不正確之訊息
    if (!CheckDate(document.all.txSrcRcvDate, "上級收文日期"))
    {
        FocusAt(document.all.txSrcRcvDate);
        return false;
    }
}

function ddlDocSource_onchange()
{
    //1110830 Zen 考試院序237 修正公文來源為會銜時速別鎖定最速件之問題
    //if (document.all.ddlDocSource.options[document.all.ddlDocSource.selectedIndex].text == "會銜")
    //{
    //    //速別固定為最速件
    //    //1040630 David 1040517 因速別選單Text修改為「代碼.名稱」，調整取值邏輯
    //    /*if(document.all.ddlSpeed.options[document.all.ddlSpeed.selectedIndex].text != "最速件")
    //    {
    //        ddlSelectByText("ddlSpeed","最速件");
    //        ddlSpeed_onchange();
    //    }*/
    //    if (GetValueFromTextArray(document.all.ddlSpeed.options[document.all.ddlSpeed.selectedIndex].text, 1, ".") != "最速件")
    //    {
    //        SetDDLByTextArray("ddlSpeed", "最速件", 1, ".");
    //        ddlSpeed_onchange();
    //    }
    //    //設定速別為disable
    //    document.all.ddlSpeed.disabled = true;
    //}
    //else
    //{
    //    //設定速別為enable
    //    document.all.ddlSpeed.disabled = false;
    //}

    /*/Charles (中企處)一般公文限期辦畢時，選擇上級機關交辦，則連動選擇業務類別為部收文 0960608
    if( (document.all.SOURCE_ORGNO.value == "313050000G" || document.all.SOURCE_ORGNO.value == "313050000GU200000" || document.all.SOURCE_ORGNO.value == "313050000GU300000" ) &&
        document.all.ddlProperty.options[document.all.ddlProperty.selectedIndex].text == "一般公文限期辦畢" && 
        document.all.ddlDocSource.options[document.all.ddlDocSource.selectedIndex].text == "上級機關交辦")
    {
        SetDlItemByText(document.all.dlWorkType, "部收文");	//連動選擇業務類別為部收文
    	
        //alert(document.all.dlWorkType.options[document.all.dlWorkType.selectedIndex].text);
        //alert(document.all.dlWorkType.options[document.all.dlWorkType.selectedIndex].value);
    	
        dlWorkType_onchange();	//業務類別變動後連動其他欄位
    	
        document.all.txSrcRcvNo.focus();	//最後停在上級收文字號
    }*/

    //Matte 0960927 001666
    if (jf_Trim(document.all.h_worktype.value) != "" && document.all.ddlDocSource.options[document.all.ddlDocSource.selectedIndex].text == "上級機關交辦")
    {
        //0970259	拿掉jf_Trim()
        SetCbItemByText(document.all.dlWorkType, jf_Trim(document.all.h_worktype.value));	//連動選擇業務類別為部收文

        dlWorkType_onchange();	//業務類別變動後連動其他欄位

        //1050706 David 1050087 二代修改，調整focus語法
        //document.all.txSrcRcvNo.focus();	//最後停在上級收文字號
        $('#txSrcRcvNo').focus();
    }
}

var iCallID_GetDefaultSubject = null;
function txSubjectNo_onblur()
{
    //1050817 Zen 1050700 弱掃XSS修正
    //document.all.txSubjectNo.value = jf_Trim(document.all.txSubjectNo.value);
    document.all.txSubjectNo.value = encodeURI(jf_Trim(document.all.txSubjectNo.value));
    document.all.txSubject.value = document.all.txSubject.value;
    if (document.all.txSubjectNo.value != "" && document.all.txSubject.value == "")
    {
        //取得常用主旨，並代入主旨欄位
        var param = new Array(1);

        //1000403 Zola 1000035  判斷使用機關識別碼或是機關代碼 START
        if (document.all.h_OrgID.value == "")
            //1050817 Zen 1050700 弱掃XSS修正
            //param[0] = document.all.txFromOrgNo1.value;
            param[0] = encodeURI(document.all.txFromOrgNo1.value);
        else
            //1050817 Zen 1050700 弱掃XSS修正
            //param[0] = document.all.h_OrgID.value;
            param[0] = encodeURI(document.all.h_OrgID.value);
        //1000403 Zola 1000035  判斷使用機關識別碼或是機關代碼 END	

        //1050817 Zen 1050700 弱掃XSS修正
        //param[1] = document.all.txSubjectNo.value;
        param[1] = encodeURI(document.all.txSubjectNo.value);

        callObj = jf_CallWS("ODT130WS.asmx", "GetDefaultSubject", false, param);
        iCallID_GetDefaultSubject = callObj.id;
        if (!OnWSResult(callObj))
        {
            alert("無此主旨代碼");
            FocusAt(document.all.txSubjectNo);
        }
    }
}

function ddlSelectByText(argSelectId, argSelectTextValue)
{
    if (argSelectTextValue == "")
        return;
    for (var i = 0; i < document.all[argSelectId].length; i++)
    {
        if (document.all[argSelectId].options[i].text == argSelectTextValue)
        {
            document.all[argSelectId].selectedIndex = i;
            break;
        }
    }
}

//***
//檢核附件明細的合理性
function CheckDocAttach()
{
    var ptbNO = "";
    var pdlType = "";
    var ptbName = "";
    var pMsg = "";
    var IsFocus = true;

    for (var i = 2; i <= document.all["dg1"].rows.length; i++)
    {
        var strlbSeqNo = "dg1__ctl" + i + "_lbSEQ_NO";
        var strtbFileDesc = "dg1__ctl" + i + "_tbDESC";
        var strdlUnit = "dg1__ctl" + i + "_dlUNIT";
        var strdlMedia = "dg1__ctl" + i + "_dlREM";
        var strtbFileCnt = "dg1__ctl" + i + "_tbCNT";

        if (jf_Trim(document.all[strtbFileDesc].value) != "")
        {
            if (document.all[strtbFileCnt].value == "0")
            {
                //1050706 David 1050087 二代修改
                //pMsg+="序 "+ document.all[strlbSeqNo].innerText + " 的數量不可為 0\n";
                pMsg += "序 " + document.all[strlbSeqNo].textContent + " 的數量不可為 0\n";

                if (IsFocus)
                {
                    //1050706 David 1050087 二代修改，調整focus語法
                    //document.all[strtbFileCnt].focus();
                    $('#' + strtbFileCnt + '').focus();
                }
                IsFocus = false;
            }

            if (document.all[strdlMedia].options[document.all[strdlMedia].selectedIndex].value == "")
            {
                //1050706 David 1050087 二代修改
                //pMsg+="序 "+ document.all[strlbSeqNo].innerText + " 媒體型式的不可為空白\n";
                pMsg += "序 " + document.all[strlbSeqNo].textContent + " 媒體型式的不可為空白\n";

                if (IsFocus)
                {
                    //1050706 David 1050087 二代修改，調整focus語法
                    //document.all[strdlMedia].focus();
                    $('#' + strdlMedia + '').focus();
                }
                IsFocus = false;
            }

            if (document.all[strdlUnit].options[document.all[strdlUnit].selectedIndex].value == "")
            {
                //1050706 David 1050087 二代修改
                //pMsg+="序 "+ document.all[strlbSeqNo].innerText + " 計量單位的不可為空白\n";
                pMsg += "序 " + document.all[strlbSeqNo].textContent + " 計量單位的不可為空白\n";

                if (IsFocus)
                {
                    //1050706 David 1050087 二代修改，調整focus語法
                    //document.all[strdlUnit].focus();
                    $('#' + strdlUnit + '').focus();
                }
                IsFocus = false;
            }
        }
    }

    if (pMsg != "")
    {
        alert("附件資訊檢核有誤，明細如下：\n" + pMsg);
        return false;
    }
    return true;
}

function ChkDataGridFileCnt(argFileDescColName, argFileCntColName)
{
    if (document.all[argFileDescColName].value != "")
    {
        if (jf_Trim(document.all[argFileCntColName].value) == "")
            document.all[argFileCntColName].value = "0";

        if (isNaN(document.all[argFileCntColName].value))
        {
            alert('請輸入數字');
            //1050706 David 1050087 二代修改，調整focus語法
            //document.all[argFileCntColName].focus();
            $('#' + argFileCntColName + '').focus();
            return;
        }
        else
        {
            document.all[argFileCntColName].value = parseInt(document.all[argFileCntColName].value, 0);
            if (document.all[argFileCntColName].value == "0")
            {
                alert('請輸入大於0的數字');
                //1050706 David 1050087 二代修改，調整focus語法
                //document.all[argFileCntColName].focus();
                $('#' + argFileCntColName + '').focus();
                return;
            }
        }
    }
}

//1120505 Kevin 1111280 新增儲存前實體附件數量檢核
function ChkDataGridFileCntAll()
{
    var sCheckVal = '';
    var len = document.all.dg1.rows.length;
    for (var i = 1; i < len; i++)
    {
        if (document.all["dg1__ctl" + (i + 1) + "_tbDESC"].value == "")
            continue;

        var tbCnt = document.all["dg1__ctl" + (i + 1) + "_tbCNT"];

        if (tbCnt.value == '' || isNaN(tbCnt.value))
        {
            sCheckVal += '\n\r序' + i + '請輸入數字。';
        }
        else
        {
            tbCnt.value = parseInt(tbCnt.value, 0);

            if (tbCnt.value == "0")
            {
                sCheckVal += '\n\r序' + i + '請輸入大於0的數字。';
            }
        }
    }

    if (sCheckVal != '')
        return '\n\r實體附件明細' + sCheckVal;
    else
        return '';
}

//2004-06-17 add ***
function txMeetDate_onblur()
{
    if (document.all.txLtBy.value != "M")
        return;

    document.all.txMeetDate.value = jf_Trim(document.all.txMeetDate.value);

    if (document.all.txMeetDate.value == "")
    {
        document.all.txLimitDate.value = "";
        return;
    }

    if (!CheckDate(document.all.txMeetDate, "開會日期"))
    {
        FocusAt(document.all.txMeetDate);
        return;
    }

    GetWorkDate();
}

//2005-04-05 Caesar Add
var iCallID_GetRcvAttDesc = null;
function txRcvAttNo_onblur()
{
    //1050817 Zen 1050700 弱掃XSS修正
    //var sAttNo = jf_Trim(document.all.txRcvAttNo.value);
    var sAttNo = encodeURI(jf_Trim(document.all.txRcvAttNo.value));
    if (sAttNo != "")
    {
        var param = new Array(1);
        param[0] = sAttNo;

        callObj = jf_CallWS("ODT130WS.asmx", "GetRcvAttDesc", false, param);
        iCallID_GetRcvAttDesc = callObj.id;
        if (!OnWSResult(callObj))
        {
            alert("無此來文附件註記代碼");
            FocusAt(document.all.txRcvAttNo);
        }
    }
}

//0950612 Charles 檢查該份公文是否應進行時效鎖定，根據hPrescripLock欄位值決定
function jf_SetReadOnlyIfLock()
{
    if (document.all.hPrescripLock == null)
        return;
    if (document.all.hPrescripLockTooltip == null)
        return;
    if (document.all.hPrescripLock.value == "" || document.all.hPrescripLock.value == null)
        return;
    if (document.all.hPrescripLockTooltip.value == "" || document.all.hPrescripLockTooltip.value == null)
        return;

    var strLock = document.all.hPrescripLock.value;
    var strTooltip = document.all.hPrescripLockTooltip.value;

    //無進行時效鎖定
    if (strLock == "000")
    {
        //Yvonne	0970447	0970528	修正公文開啟後，限辦日期為灰底卻可修改的問題
        /*
        document.all.txRcvDate.readOnly		= false;
        document.all.txRcvDate.style.backgroundColor = "";
        document.all.txRcvDate.title		= "";
        document.all.ddlCategory.disabled	= false;
        document.all.ddlCategory.title		= "";
        document.all.ddlProperty.disabled	= false;
        document.all.ddlProperty.title		= "";
        document.all.txSumTypeShow.readOnly = false;
        document.all.txSumTypeShow.title	= "";
        document.all.dlWorkType.disabled	= false;
        document.all.dlWorkType.title		= "";
        document.all.txStartDate.readOnly	= false;
        document.all.txStartDate.title		= "";
        document.all.txLimitDate.readOnly	= false;
        document.all.txLimitDate.title		= "";
        //0950927 Stella 修正會將原本disable改為enable的問題
        if(!document.all.dlDEPT.disabled)
        {
            document.all.dlDEPT_Text.disabled	= false;
            document.all.dlDEPT_Text.title		= "";
            document.all.dlDEPT.disabled		= false;
        }
        */
        return;
    }
    //Yvonne	0970447	0970528	要進行時效鎖定，則鎖定下列欄位
    if (strLock.substr(0, 1) == "1" || strLock.substr(1, 1) == "1" || strLock.substr(2, 1) == "1")
    {
        //文別
        document.all.ddlCategory.disabled = true;
        document.all.ddlCategory.title = strTooltip;
        //公文性質
        document.all.ddlProperty.disabled = true;
        document.all.ddlProperty.title = strTooltip;
        //時效統計
        document.all.txSumTypeShow.readOnly = true;
        document.all.txSumTypeShow.title = strTooltip;
        //業務類別
        document.all.dlWorkType_Text.disabled = true;
        document.all.dlWorkType_Text.title = strTooltip;
        document.all.dlWorkType.disabled = true;
        //起算日期
        document.all.txStartDate.readOnly = true;
        document.all.txStartDate.title = strTooltip;
        //1050706 David 1050087 二代修改
        //SetControlDisable("btStartDate");
        //限辦日期
        document.all.txLimitDate.readOnly = true;
        document.all.txLimitDate.title = strTooltip;
        //1050706 David 1050087 二代修改
        //SetControlDisable("btLimitDate");
        //承辦單位
        document.all.dlDEPT_Text.disabled = true;
        document.all.dlDEPT_Text.title = strTooltip;
        document.all.dlDEPT.disabled = true;
        //收文日期
        document.all.txRcvDate.readOnly = true;
        document.all.txRcvDate.style.backgroundColor = "LightGrey";
        document.all.txRcvDate.title = strTooltip;
        //移文(避免產生銷號公文)
        document.all.cbAssign.title = strTooltip;
        document.all.cbAssign.disabled = true;
        //公文來源
        document.all.ddlDocSource.title = strTooltip;
        document.all.ddlDocSource.disabled = true;
        //速別
        document.all.ddlSpeed.title = strTooltip;
        document.all.ddlSpeed.disabled = true;
        //開會日期
        document.all.txMeetDate.readOnly = true;
        document.all.txMeetDate.title = strTooltip;
        //1050706 David 1050087 二代修改
        //SetControlDisable("btMeetDate");
        //處理期限
        document.all.txLeadTime.readOnly = true;
        document.all.txLeadTime.title = strTooltip;
    }
    /*
    if(strLock.substr(0,1) == "1")
    {
        document.all.txRcvDate.readOnly		= true;
        document.all.txRcvDate.style.backgroundColor = "LightGrey";
        document.all.txRcvDate.title		= strTooltip;
        document.all.ddlCategory.disabled	= true;
        document.all.ddlCategory.title		= strTooltip;
        document.all.ddlProperty.disabled	= true;
        document.all.ddlProperty.title		= strTooltip;
        document.all.txSumTypeShow.readOnly = true;
        document.all.txSumTypeShow.title		= strTooltip;
        document.all.dlWorkType.disabled	= true;
        document.all.dlWorkType.title		= strTooltip;
        document.all.txStartDate.readOnly	= true;
        document.all.txStartDate.title		= strTooltip;
        document.all.dlDEPT_Text.disabled	= true;
        document.all.dlDEPT_Text.title		= strTooltip;
        document.all.dlDEPT.disabled		= true;
    }
    if(strLock.substr(1,1) == "1")
    {
        document.all.txRcvDate.readOnly		= true;
        document.all.txRcvDate.style.backgroundColor = "LightGrey";
        document.all.txRcvDate.title		= strTooltip;
        document.all.ddlCategory.disabled	= true;
        document.all.ddlCategory.title		= strTooltip;
        document.all.ddlProperty.disabled	= true;
        document.all.ddlProperty.title		= strTooltip;
        document.all.txSumTypeShow.readOnly = true;
        document.all.txSumTypeShow.title	= strTooltip;
        document.all.dlWorkType.disabled	= true;
        document.all.dlWorkType.title		= strTooltip;
        document.all.txStartDate.readOnly	= true;
        document.all.txStartDate.title		= strTooltip;
        document.all.txLimitDate.readOnly	= true;
        document.all.txLimitDate.title		= strTooltip;
        document.all.dlDEPT_Text.disabled	= true;
        document.all.dlDEPT_Text.title		= strTooltip;
        document.all.dlDEPT.disabled		= true;
        //[問題單955011] Charles 速別欄位會影響DUE_DATE所以也必須鎖定 0905818
        document.all.ddlSpeed.title			= strTooltip;
        document.all.ddlSpeed.disabled		= true;
    }
    if(strLock.substr(2,1) == "1")
    {
        document.all.ddlCategory.disabled	= true;
        document.all.ddlCategory.title		= strTooltip;
        document.all.ddlProperty.disabled	= true;
        document.all.ddlProperty.title		= strTooltip;
        document.all.txSumTypeShow.readOnly = true;
        document.all.txSumTypeShow.title	= strTooltip;
        document.all.dlWorkType.disabled	= true;
        document.all.dlWorkType.title		= strTooltip;
        document.all.txStartDate.readOnly	= true;
        document.all.txStartDate.title		= strTooltip;
        document.all.txLimitDate.readOnly	= true;
        document.all.txLimitDate.title		= strTooltip;
        document.all.dlDEPT_Text.disabled	= true;
        document.all.dlDEPT_Text.title		= strTooltip;
        document.all.dlDEPT.disabled		= true;
        //[問題單955011] Charles 速別欄位會影響DUE_DATE所以也必須鎖定 0905818
        document.all.ddlSpeed.title			= strTooltip;
        document.all.ddlSpeed.disabled		= true;
    }
    */

    document.all.hPrescripLock.value = "000";
}
function SetPAQReadOnly()
{
    //0980129 Iris新增取得公文性質,併案狀態及併案關係欄位,若開啟之公文為併案陳核子文,且母文公文性質為人民申請
    //則子文不可修改公文性質與業務類別
    if (document.all.hPAQscripLock == null)
        return;
    var PaqTmpAry = document.all.hPAQscripLock.value;
    if (PaqTmpAry == "1")
    {
        strTooltip = "目前公文為人民申請案件併案子文，無法修改公文性質與業務類別，如需修正，請先至ODC010公文基資頁面解併後再行修正";
        //公文性質
        document.all.ddlProperty.disabled = true;
        document.all.ddlProperty.title = strTooltip;
        //時效統計
        document.all.txSumTypeShow.readOnly = true;
        document.all.txSumTypeShow.title = strTooltip;
        //業務類別
        document.all.dlWorkType_Text.disabled = true;
        document.all.dlWorkType_Text.title = strTooltip;
        document.all.dlWorkType.disabled = true;
        //起算日期
        document.all.txStartDate.readOnly = true;
        document.all.txStartDate.title = strTooltip;
        //1050706 David 1050087 二代修改
        //SetControlDisable("btStartDate");
        //限辦日期
        document.all.txLimitDate.readOnly = true;
        document.all.txLimitDate.style.backgroundColor = "LightGrey";
        document.all.txLimitDate.title = strTooltip;
        //1050706 David 1050087 二代修改
        //SetControlDisable("btLimitDate");
        //收文日期
        document.all.txRcvDate.readOnly = true;
        document.all.txRcvDate.style.backgroundColor = "LightGrey";
        document.all.txRcvDate.title = strTooltip;
        //移文(避免產生銷號公文)
        document.all.cbAssign.title = strTooltip;
        document.all.cbAssign.disabled = true;
        //開會日期
        document.all.txMeetDate.readOnly = true;
        document.all.txMeetDate.title = strTooltip;
        //1050706 David 1050087 二代修改
        //SetControlDisable("btMeetDate");
        //處理期限
        document.all.txLeadTime.readOnly = true;
        document.all.txLeadTime.style.backgroundColor = "LightGrey";
        document.all.txLeadTime.title = strTooltip;
    }
}

//0950912 Stella 瀏覽線上簽核公文部份
function CreateTempUnvFile()
{
    var WSParam = new Array();
    //1、機關代碼
    //1050817 Zen 1050700 弱掃XSS修正
    //WSParam[0] = jf_Trim(document.all.h_OrgNo.value);
    WSParam[0] = encodeURI(jf_Trim(document.all.h_OrgNo.value));
    var strSysId = "";
    var strType = "";
    //2、目前欲開啟公文之類別及SYSID(須區分電子收文或掃描影像)
    if (jf_Trim(document.all.h_SYSID.value) != "")
    {
        strType = "1";
        //1050817 Zen 1050700 弱掃XSS修正
        //strSysId = jf_Trim(document.all.h_SYSID.value);
        strSysId = encodeURI(jf_Trim(document.all.h_SYSID.value));
    }
    else if (jf_Trim(document.all.hScanSYSID.value) != "")
    {
        strType = "2";
        //1050817 Zen 1050700 弱掃XSS修正
        //strSysId = jf_Trim(document.all.hScanSYSID.value);
        strSysId = encodeURI(jf_Trim(document.all.hScanSYSID.value));
    }
    WSParam[1] = strType;
    WSParam[2] = strSysId;
    //3、主旨
    //1050817 Zen 1050700 弱掃XSS修正
    //WSParam[3] = jf_Trim(document.all.txSubject.value);
    WSParam[3] = encodeURI(jf_Trim(document.all.txSubject.value));
    //4、公文文號
    //1050817 Zen 1050700 弱掃XSS修正
    //WSParam[4] = jf_Trim(document.all.txDocNo.value);
    WSParam[4] = encodeURI(jf_Trim(document.all.txDocNo.value));
    //5、電子收文儲存區使用之webfileIO
    //1050817 Zen 1050700 弱掃XSS修正
    //WSParam[5] = jf_Trim(document.all.H_txERvbWebIO.value);
    WSParam[5] = encodeURI(jf_Trim(document.all.H_txERvbWebIO.value));
    var CallWsObj = jf_CallWS("ODT130WS.asmx", "GenTempWorkFileForUnv", false, WSParam);
    iCreateTempUnvFile = CallWsObj.id;
    OnWSResult(CallWsObj);
}
//950904 95.10.17 David 當選擇為密以上等級時，須檢核解密條件為必填欄位
function ddlSec_Check()
{
    var Sec = document.all["ddlSec"].options[document.all["ddlSec"].selectedIndex].value;
    var iSec = parseInt(Sec);
    if (iSec >= 2)
        return true;
    else
        return false;
}
//000995 0960528 Leo 新增檢核物件字串長度的 function
function jfCheckTextLength(argObj, argLength, argObjName)
{
    var obj = eval(argObj);
    if (obj.value.length > argLength)
    {
        event.returnValue = false;
        //obj.value = obj.value.substring(0,argLength);
        alert(argObjName + "欄位長度不可超過" + argLength + "字，請修正後再進行傳送。");
        //1050706 David 1050087 二代修改，調整focus語法
        //obj.focus();
        $('#' + obj.id + '').focus();
        return false;
    }
    return true;
}

//Yvonne 000267 移到CheckOpenSubject()內
function CheckOpenSubject()
{
    if (document.all.btSubjectDiv.value == ">>")
    {
        //1050706 David 1050087 二代修改
        //document.all.divSubject.style.display="";
        document.all.divSubject.className = "";
        document.all.btSubjectDiv.value = "<<";
    }
    else
    {
        //1050706 David 1050087 二代修改
        //document.all.divSubject.style.display="none";
        document.all.divSubject.className = "hide";
        document.all.btSubjectDiv.value = ">>";
    }
}
//0970139 設定ComboBox的選擇的選項值(index和顯示文字)
function SetCbSelectedByValue(argCb, argText)
{
    for (var i = 0; i < argCb.options.length; i++)
    {
        if (argCb.options[i].text == argText)
        {
            argCb.SelectedIndex = i;
            argCb.value = argCb.options[i].value;
            break;
        }
    }
}
//1020520	Jagle	[1020412]	設定ComboBox的選擇的選項值(index和欄位代號)
//1000321 Zola	1000299 設定ComboBox的選擇的選項值(index和欄位代號)
function SetCbSelectedByID(argCb, argValue)
{
    for (var i = 0; i < argCb.options.length; i++)
    {
        if (argCb.options[i].value == argValue)
        {
            argCb.SelectedIndex = i;
            argCb.value = argCb.options[i].value;
            break;
        }
    }
}

//0990820 David 0990438 新增來文機關欄位隱藏
function CheckOpenFromOrg(argMode)
{
    switch (argMode)
    {
        //1050706 David 1050087 二代修改
        /*case "1":
            document.all.divFromOrg.style.display="none";
            document.all.btFromOrgDiv.value = ">>";
            break;
        case "2":
            document.all.divFromOrg.style.display="";
            document.all.btFromOrgDiv.value = "<<";
            break;
        case "3":
            if(document.all.btFromOrgDiv.value == ">>")
            {
                document.all.divFromOrg.style.display="";
                document.all.btFromOrgDiv.value = "<<";
            }
            else
            {
                document.all.divFromOrg.style.display="none";
                document.all.btFromOrgDiv.value = ">>";
            }	
            break;*/
        case "1":
            document.all.divFromOrg.className = "hide";
            document.all.btFromOrgDiv.value = ">>";
            break;
        case "2":
            document.all.divFromOrg.className = "";
            document.all.btFromOrgDiv.value = "<<";
            break;
        case "3":
            if (document.all.btFromOrgDiv.value == ">>")
            {
                document.all.divFromOrg.className = "";
                document.all.btFromOrgDiv.value = "<<";
            }
            else
            {
                document.all.divFromOrg.className = "hide";
                document.all.btFromOrgDiv.value = ">>";
            }
            break;
    }
}

//0990820 David 0990438 新增收文日期檢核
function txRcvMin_onblur()
{
    if (document.all.txRcvMin.value != "")
    {
        if (document.all.txRcvMin.value.length < 4)
            document.all.txRcvMin.value = jf_PADL(document.all.txRcvMin.value, 4, '0');

        var strRcvMin = document.all.txRcvMin.value;
        if (strRcvMin != "")
        {
            if (!jf_CheckTime(strRcvMin))
            {
                jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["收文時間格式不正確!!"])), "");
                FocusAt(document.all.txRcvMin);
            }
            else
            {
                var Now = new Date();
                document.all.H_txRcvSec.value = Now.getSeconds();
                if (document.all.H_txRcvSec.value.length == 1)
                    document.all.H_txRcvSec.value = "0" + document.all.H_txRcvSec.value;
            }
        }
    }
}

//0990820 David 0990438 檢核時間格式
function jf_CheckTime(argStr) 
{
    if (argStr.length < 4)
        argStr = jf_PADL(argStr, 4, '0');
    var pHour, pMinute;
    pHour = parseInt(argStr.substr(0, 2), 10);
    pMinute = parseInt(argStr.substr(2, 2), 10);

    if (pHour > 24 || pMinute > 60)
        return false;
    else
        return true;
}
/*****************************************************************************************
* 0970117 Yvonne 環保局結合條碼機列印
* ***************************************************************************************/
function OpenBarWin(bar_url)
{
    objNewWindow = window.open(bar_url, "BARCODE");
}

function DeptRcvMsgOpen()
{
    //1130118 Kevin 1120896 修正單位收文開啟跳錯誤問題
    //if (document.all["h_DeptRcvFolderDir"].value == "") //電子來文卻無封裝檔則不允許跑線上簽核
    if (!document.all["h_DeptRcvFolderDir"] || document.all["h_DeptRcvFolderDir"].value == "") //電子來文卻無封裝檔則不允許跑線上簽核
        document.all.cbIsOnlineDoc.disabled = true;
}

//0970930	0970962	Yvonne	刷入公文文號後，直接帶出公文基資
function txDocNo_onkeydown()
{
    var btOpenObj = getToolBarItemObjById("btOpen");
    if (btOpenObj != null)
    {
        //開啟功能鍵有顯示且為ENABLE
        if (!btOpenObj.getAttribute("disabled") && btOpenObj.getAttribute("DefaultStyle").lastIndexOf("display:none;") == -1)		
        {
            if (jf_Trim(document.all.txDocNo.value) == "")
                return;
            if (event.keyCode == 13)
            {
                document.all.H_AutoOpen.value = "Y";
                Page_BlockSubmit = !jf_CheckKeyObject();
                jf_OpenButtonSubmit();
            }
        }
    }

}
//1020520	Jagle	[1020412]	修正自ODT134帶回開會通知單的公文時，開會日期未啟用的問題
/*****************************************************************************************
*1000321	1000299	Zola
*1.選取文別時，自動帶出公文文別代碼檔預設業務類別代號的業務類別名稱
*2.選取文別為開會通知單時，還必須自動帶出公文性質為一般公文
*****************************************************************************************/
function ddlCategory_onchange()
{
    var typeNo = document.all["ddlCategory"].options[document.all["ddlCategory"].selectedIndex].value;
    var itypeNo = parseInt(typeNo);

    if (itypeNo == 4)
    {
        ddlSelectByText("ddlProperty", "一般公文");
        ddlProperty_onchange();
    }

    var wsParam = new Array();
    wsParam[0] = document.all.SOURCE_ORGNO.value;
    wsParam[1] = typeNo;

    var CallWsObj = jf_CallWS("lib/OD_LIB.asmx", "GetDocCategoryInfo", false, wsParam);

    //檢查執行是否成功
    if (jf_IsWebServiceSuccess(CallWsObj))
    {
        if (!CallWsObj.value.ErrorClass.IsErr)
        {

            if (jf_Trim(CallWsObj.value.DefBTypeNo) != "")
            {
                SetCbSelectedByID(document.all["dlWorkType"], jf_Trim(CallWsObj.value.DefBTypeNo));
                //將Combobox 已選擇的文字搬給畫面上顯示的文字框
                document.all["dlWorkType_Text"].value = document.all["dlWorkType"].options[document.all["dlWorkType"].selectedIndex].text;
                dlWorkType_onchange();									//業務類別變動後連動其他欄位
            }
        }
    }
}

//1010103 Kevin 1000976 (標檢局)呼叫對方WS
function CallSuggestWS(argType)
{
    var strSuggestNo;

    //1010328	Yvonne	對方狀態代碼為01(收件)、02(辦理中)、03(錄存續辦)、04(結案)
    //if(document.all["regSUGGEST_NO"] && argType=="01")
    if (document.all["regSUGGEST_NO"] && argType == "02")
        strSuggestNo = document.all["regSUGGEST_NO"].value;
    else
        strSuggestNo = document.all["H_txSuggestNo"].value;

    if (document.all["SUGGEST_WS"].value != "" && strSuggestNo != "")
    {
        var RightNow = new Date();
        var time = (RightNow.getFullYear() - 1911).toString()
            + jf_PADL((RightNow.getMonth() + 1).toString(), 2, '0')
            + jf_PADL(RightNow.getDate().toString(), 2, '0')
            + jf_PADL(RightNow.getHours().toString(), 2, '0')
            + jf_PADL(RightNow.getMinutes().toString(), 2, '0');
        //1040206 Eric 1030899	新增呼叫GIP系統WS多傳入單位代碼、名稱
        var strDeptNo = document.all["H_DeptNo_Value"].value.split(':')[0];
        var strDeptName = document.all["H_DeptNo_Value"].value.split(':')[1];

        //1110913 Zen 1110981 GIP系統WS多傳入文號
        var strDocNo = document.all['txDocNo'].value;

        //1010328	Yvonne	改為使用ajax叫用測試	
        /*var arWSParam = new Array(3);
        arWSParam[0] = argType;
        arWSParam[1] = strSuggestNo;
        arWSParam[2] = time;

        jf_CallW(document.all["SUGGEST_WS"].value,"modifyMailBoxStatus",true,arWSParam);
        */
        //1040206 Eric 1030899	新增呼叫GIP系統WS多傳入單位代碼、名稱
        //ODT130.CallLWService(document.all["SUGGEST_WS"].value,argType,strSuggestNo,time);		
        //1110913 Zen 1110981 GIP系統WS多傳入文號
        //ODT130.CallLWService(document.all["SUGGEST_WS"].value,argType,strSuggestNo,time,strDeptNo,strDeptName);
        //1120426 Kevin 1120214 修正更換為AJAXPRO問題
        //ODT130.CallLWService(document.all["SUGGEST_WS"].value, argType, strSuggestNo, time, strDeptNo, strDeptName, strDocNo);
        OD.ODT130.CallLWService(document.all["SUGGEST_WS"].value, argType, strSuggestNo, time, strDeptNo, strDeptName, strDocNo);
    }
}

//1050706 David 1050087 二代修改，改由共用函式處理
//1010103 Kevin 1000976 CopyTemplateV3免權杖呼叫WS
/*function jf_CallW(argService, argFunName, argAsync, argParam)
{
    if(gArServiceName.join(",").indexOf(argService.toUpperCase()) == -1)
    {
        gServiceAvailable = false;
        gArServiceName.push(argService.toUpperCase());
        service.onserviceavailable=function(){gServiceAvailable = true;o.StopWaiting();};
        document.body.onunload=function(){gServiceAvailable = true;o.StopWaiting();};
    }
    else
        gServiceAvailable = true;
    var callObj = new Object();
    callObj.funcName = argFunName;      // Name of the remote function.
    callObj.async = argAsync;         // A Boolean that specifies the type of call
    callObj.timeout = 5;         // Timeout for the method call (seconds)
    // SOAP header information
    callObj.SOAPHeader = "<SOAP-ENV:Header>";
    callObj.SOAPHeader += "<t:Transaction xmlns:t='some-URI' SOAP-ENV:mustUnderstand='1'>";
    callObj.SOAPHeader += 5;
    callObj.SOAPHeader += "</t:Transaction>";
    callObj.SOAPHeader += "</SOAP-ENV:Header>";  

    //in order to avoid the service unavailable problem
    //conver the service to uppercase cause the uppercase service is invoked
    //when this page is onloaded, the 2nd invocation of this web service will success
    argService = argService.toUpperCase();
    if( document.all.service == null)
        return;
    if( document.all.SessionID == null )
        return;
    service.useService(argService+"?WSDL","Serv");
    //無論同步或非同步，皆需等callback function OK之後再callservice
    //if(!gServiceAvailable && !argAsync)
    if(!gServiceAvailable)
    {
            while(!gServiceAvailable)
                jf_Wait(1000);
            return SetgServiceAvailableW(callObj,argAsync,argParam);
    }
    else
        return SetgServiceAvailableW(callObj,argAsync,argParam);
}

//1010103 Kevin 1000976 CopyTemplateV3免權杖呼叫WS
function SetgServiceAvailableW(callObj,argAsync,argParam)
{
    if(!service.Serv) return new ErrCallId();
	
    if (argParam == null)
       callID = service.Serv.callService(callObj);
    else if (argParam.length ==3 )
       callID = service.Serv.callService(callObj , argParam[0] , argParam[1] , argParam[2]);
    return callID;
}*/

//1020322	Jagle	[1020042]	增加二級單位下拉選單無值不顯示設定
function jf_HandleComboxStatus(argComboxID)
{
    if (document.all[argComboxID].options.length <= 1)
        document.all[argComboxID + "_Container"].className = "hide";
    else
    {
        //1050308 David 1050087 二代公文修改
        //document.all[argComboxID + "_Container"].className = "InputFieldText";
        document.all[argComboxID + "_Container"].className = "custom-combobox";
    }
}

//1040119 Eric 1040033 (內政部)人團司呼叫對方系統WS
//1040303 David 1040033 呼叫人團系統WS改由Server端叫用，此處MARK
/*function CallMoiWs()
{
    if(document.all.H_MoiGroupIsOnlineDoc.value == "1")
    {
        if(document.all["H_MoiGroupCaseNo"].value != "")
        {
            var arWSParam = new Array(3);
            arWSParam[0] = document.all.SOURCE_ORGNO.value;
            arWSParam[1] = document.all["H_MoiGroupCaseNo"].value;
            arWSParam[2] = document.all.H_MoiGroupDocNo.value;
            try
            {
                jf_CallW(document.all["MOI_GROUP_WSURL"].value,"SendElectronicDoc",true,arWSParam);
            }
            catch(ex)
            {}
        }
    }
    else
    {
        var arWSParam = new Array(3);
        arWSParam[0] = document.all.SOURCE_ORGNO.value;
        arWSParam[1] = document.all.H_MoiGroupDocNo.value;
        arWSParam[2] = document.all.H_MoiGroupSubject.value;
        try
        {
            jf_CallW(document.all["MOI_GROUP_WSURL"].value,"SendPaperDoc",true,arWSParam);
        }
        catch(ex)
        {
        }
    }
}*/
//1040608 Eric 1040243 設定dlDescOnchange修改tbDESC內值
function dlDesc_onchange(argValue, argCount)
{
    var i = parseInt(argCount) + 2;
    if (document.all["dg1__ctl" + i + "_dlDesc"].selectedIndex == 0)
    {
        document.all["dg1__ctl" + i + "_tbDESC"].value = "";
    }
    else
    {
        document.all["dg1__ctl" + i + "_tbDESC"].value = document.all["dg1__ctl" + i + "_dlDesc"].value;
    }
}

//1040630 David 1040517 新增依Text設定包含分隔字元的Text
function SetDDLByTextArray(argObj, argText, argIndex, argSplit)
{
    for (var i = 0; i < document.all[argObj].length; i++)
    {
        //有些Text可能會有v1,v2,v3的狀況
        if (GetValueFromTextArray(document.all[argObj].options[i].text, argIndex, argSplit) == argText)
        {
            document.all[argObj].selectedIndex = i;
            break;
        }
    }
}

//會取得 "t1,t2"結構中的第argIndex個值
function GetValueFromTextArray(argTextArrayString, argIndex, argSplit)
{
    var RtnTextArray = argTextArrayString.split(argSplit);
    return RtnTextArray[argIndex];
}

//1060118 David 1050087 新增二代來文機關選單功能(參考MS-ModeOrg.js)
SetAutoOrgMenu(document.all.txAutoOrgName1, document.all.DivOrgMenu1);
SetAutoOrgMenu(document.all.txAutoOrgName2, document.all.DivOrgMenu2);
SetAutoOrgMenu(document.all.txAutoOrgName3, document.all.DivOrgMenu3);
function SetAutoOrgMenu(argOrgNameId, argDivMenuId)
{
    var searchTimeout;
    $(argOrgNameId).on("input", function () 
    {
        if ($(this).prop('comStart')) return;	//中文輸入未完成時，不做查詢
        if ($(this).val() == "" || $(this).val().length < 3)
            return;
        clearTimeout(searchTimeout);
        var that = this;
        searchTimeout = setTimeout(function ()
        {
            var params = new SOAPClientParameters();
            params.add('argOrgNo', document.all.h_OrgNo.value);
            params.add('argQueryString', $(argOrgNameId).val());
            //1070118 David 配合GetDictInfo()新增參數調整
            params.add('argOwner', document.all.h_OrgNo.value);
            var GetDicInfoWS = document.all.H_Wed010C1Path.value + "weorginfo.asmx";
            SOAPClient.invokeJSON(GetDicInfoWS, "GetDictInfo", params, true,
                function (r)
                {
                    //1060313 David 二代來文機關選單，如選單組完單畫面FACOS已不在欄位上，不組出選單
                    if (!$(argOrgNameId).is(":focus"))
                        return;

                    var availabelTags = new Array();
                    var strTemp = $(argOrgNameId).val();
                    for (var vl in r.value)
                    {
                        var vlObj = r.value[vl];
                        if ($.type(vlObj) == "array")
                        {
                            for (var i = 0, o; o = vlObj[i]; i++)
                            {
                                if (o.orgno != "")
                                    availabelTags.push(o.v + "（" + o.orgno + "）");
                                else
                                    availabelTags.push(o.v);
                            }
                        }
                    }
                    $(argOrgNameId).autocomplete({
                        source: availabelTags,
                        appendTo: argDivMenuId,
                        select: function (event, ui)
                        {
                            if (ui.item.value.lastIndexOf("（") != -1)
                                ui.item.value = ui.item.value.substr(0, ui.item.value.lastIndexOf("（"));
                            else
                                ui.item.value = ui.item.value;
                        },
                        //1090814 Zen 1090535 調整來文機關選單支援四十字
                        open: function (event, ui)
                        {
                            $(argDivMenuId.firstElementChild).css('width', '40em');
                            $('.ui-menu-item-wrapper').css('overflow', 'hidden');
                        }
                    }).autocomplete("search", strTemp);
                }
            )
        }, 300);	//TimeOut時間
    }).on('compositionstart', function ()
    {
        $(this).prop('comStart', true);
        console.log('中文輸入，start');
    }).on('compositionend', function ()
    {
        $(this).prop('comStart', false);
        console.log('中文輸入，end');
        $(this).trigger("input");
    });
}

//1110420 Kevin 1110021 收文新增統一編號介接
function txCLIENT_CARD_NO_onblur()
{
    //輸入專案卡號時，會帶出對應專案名稱、統一編號及公司名稱，並將列管編號欄位鎖定不可異動。並自動帶入分類號AA、案次號依專案卡號帶入
    if ($('#txCLIENT_CARD_NO')[0].value == "")
    {

        $('#lbCardName')[0].textContent = "";
        document.all.txMANAGE_BANK_NO.disabled = false;
        document.all.txMANAGE_CASE_NO.disabled = false;
        return;
    }

    $('#txCLIENT_CARD_NO')[0].value = jf_PADL($('#txCLIENT_CARD_NO')[0].value, 8, "0");
    var arWSParam = new Array(1);
    arWSParam[0] = $('#txCLIENT_CARD_NO')[0].value;

    var SmegInfoObj = jf_CallW(document.all.SMEGWSUrl.value, "GetCardInfo", false, arWSParam);

    if (SmegInfoObj.value.Msg != "")
    {
        alert(SmegInfoObj.value.Msg);
        $('#txCLIENT_CARD_NO')[0].value = "";
        $('#lbCardName')[0].textContent = "";
        FocusAt(document.all.txCLIENT_CARD_NO);
    }
    else
    {
        $('#lbCardName')[0].textContent = SmegInfoObj.value.ClientName;
        $('#txTAX_ID_NO')[0].value = SmegInfoObj.value.TxIdNo;
        $('#lbTaxName')[0].textContent = SmegInfoObj.value.TxIdName;

        document.all.txMANAGE_BANK_NO.disabled = true;
        document.all.txMANAGE_CASE_NO.disabled = true;
        $('#txMANAGE_BANK_NO')[0].value = "";
        $('#txMANAGE_CASE_NO')[0].value = "";
        $('#lbManageName')[0].textContent = "";
        $('#txBANK_CODE')[0].value = "";
        $('#txBANK_BRANCH_CODE')[0].value = "";
    }
}

//1110420 Kevin 1110021 收文新增統一編號介接
function txTAX_ID_NO_onblur()
{
    //輸入統一編號，取得企業名稱
    if ($('#txTAX_ID_NO')[0].value == "")
    {
        $('#lbTaxName')[0].textContent = "";
        return;
    }

    $('#txTAX_ID_NO')[0].value = jf_PADL($('#txTAX_ID_NO')[0].value, 8, "0");
    var arWSParam = new Array(1);
    arWSParam[0] = $('#txTAX_ID_NO')[0].value;

    var SmegInfoObj = jf_CallW(document.all.SMEGWSUrl.value, "GetTaxIdInfo", false, arWSParam);
    if (SmegInfoObj.value.Msg != "")
    {
        alert(SmegInfoObj.value.Msg);
        $('#txTAX_ID_NO')[0].value = "";
        $('#lbTaxName')[0].textContent = "";
        FocusAt(document.all.txTAX_ID_NO);
    }
    else
    {
        $('#lbTaxName')[0].textContent = SmegInfoObj.value.TxIdName;
    }
}

//1110420 Kevin 1110021 收文新增統一編號介接
function txMANAGE_onblur()
{
    //輸入列管編號，會帶出對應列管名稱、統一編號及公司名稱、銀行資訊，並將專案卡號欄位鎖定不可異動。並自動帶入分類號BB、案次號依列管編號帶入。

    if ($('#txMANAGE_BANK_NO')[0].value == "" || $('#txMANAGE_CASE_NO')[0].value == "")
    {
        $('#lbManageName')[0].textContent = "";
        document.all.txCLIENT_CARD_NO.disabled = false;
        $('#txBANK_CODE')[0].value = "";
        $('#txBANK_BRANCH_CODE')[0].value = "";
        return;
    }

    $('#txMANAGE_BANK_NO')[0].value = jf_PADL($('#txMANAGE_BANK_NO')[0].value, 3, "0");
    $('#txMANAGE_CASE_NO')[0].value = jf_PADL($('#txMANAGE_CASE_NO')[0].value, 6, "0");

    var arWSParam = new Array(2);
    arWSParam[0] = $('#txMANAGE_BANK_NO')[0].value;
    arWSParam[1] = $('#txMANAGE_CASE_NO')[0].value;

    var SmegInfoObj = jf_CallW(document.all.SMEGWSUrl.value, "GetManageInfo", false, arWSParam);
    if (SmegInfoObj.value.Msg != "")
    {
        alert(SmegInfoObj.value.Msg);
        $('#txMANAGE_BANK_NO')[0].value = "";
        $('#txMANAGE_CASE_NO')[0].value = "";
        $('#lbManageName')[0].textContent = "";
        $('#txBANK_CODE')[0].value = "";
        $('#txBANK_BRANCH_CODE')[0].value = "";
        FocusAt(document.all.txMANAGE_BANK_NO);
    }
    else
    {
        $('#lbManageName')[0].textContent = SmegInfoObj.value.ManageName;
        $('#txBANK_CODE')[0].value = SmegInfoObj.value.BankCode;
        $('#txBANK_BRANCH_CODE')[0].value = SmegInfoObj.value.BankBranchCode;

        $('#txTAX_ID_NO')[0].value = SmegInfoObj.value.TxIdNo;
        $('#lbTaxName')[0].textContent = SmegInfoObj.value.TxIdName;

        document.all.txCLIENT_CARD_NO.disabled = true;
        $('#txCLIENT_CARD_NO')[0].value = "";
        $('#lbCardName')[0].textContent = "";
    }
}

//1111229 Kevin 1110880 變更為任審介接
function getLastFromOrgTaInfo()
{
    var strFromOrgTaInfo = '';
    if (jf_Trim(document.all.txFromOrgNo1.value) != "" && jf_Trim(document.all.txFromOrgName1.value) != "" && jf_Trim(document.all.dlFromWord1_Text.value) != "" && jf_Trim(document.all.txFromNo1.value) != "")
        strFromOrgTaInfo = jf_Trim(document.all.txFromOrgNo1.value) + jf_Trim(document.all.txFromOrgName1.value) + jf_Trim(document.all.dlFromWord1_Text.value) + jf_Trim(document.all.txFromNo1.value);

    if (strFromOrgTaInfo != '' && strLastFromOrgTaInfo != strFromOrgTaInfo)
    {
        strLastFromOrgTaInfo = strFromOrgTaInfo;

        var rtnTaInfo = OD.ODT130.GetTAInfo(document.all.SOURCE_ORGNO.value, jf_Trim(document.all.txFromOrgNo1.value), jf_Trim(document.all.txFromOrgName1.value), jf_Trim(document.all.dlFromWord1_Text.value), jf_Trim(document.all.txFromNo1.value)).value;

        if (!rtnTaInfo.bSuccess)
        {
            alert("來文判斷TA系統資料處理發生錯誤：" + rtnTaInfo.ErrMsg);

            //1120118 David 發生錯誤時清空既有資訊
            document.all["H_txTA_TYPE"].value = '';
            document.all["H_txPERSON_FULL_NAME"].value = '';
            document.all["H_txPERSON_ID"].value = '';
            document.all["H_txJOB_ORGNO"].value = '';
            document.all["H_txJOB_ORGNAME"].value = '';
            document.all["H_txJOB_NO"].value = '';
            document.all["H_txJOB_TITLE_NO"].value = '';
            document.all["H_txJOB_TITLE"].value = '';
        }
        else if (rtnTaInfo.IsPersonTA)
        {
            document.all["H_txTA_TYPE"].value = rtnTaInfo.sTaType;

            //1120330 David 有帶回身分證字號時才需設定於欄位中
            if (rtnTaInfo.sId != "")
            {
                document.all["H_txPERSON_FULL_NAME"].value = rtnTaInfo.sName;
                document.all["H_txPERSON_ID"].value = rtnTaInfo.sId;
                document.all["H_txJOB_ORGNO"].value = rtnTaInfo.sJobOrgNo;
                document.all["H_txJOB_ORGNAME"].value = rtnTaInfo.sJobOrgName;
                document.all["H_txJOB_NO"].value = rtnTaInfo.sJobNo;
                document.all["H_txJOB_TITLE_NO"].value = rtnTaInfo.sJobTitleNo;
                document.all["H_txJOB_TITLE"].value = rtnTaInfo.sJobTitle;
            }

            var targetDocPty = document.all.MOCS_TA_DOC_PROPERTY.value;
            var bDocPtyChange = false;
            for (var iDl = 0; iDl < document.all.ddlProperty.length; iDl++)
            {
                var ddlValueArray = document.all.ddlProperty.options[iDl].value.split(",");
                var strDocPrty = ddlValueArray[0];
                if (strDocPrty == targetDocPty)
                {
                    if (document.all.ddlProperty.selectedIndex != iDl)
                    {
                        document.all.ddlProperty.selectedIndex = iDl;
                        bDocPtyChange = true;
                    }
                    break;
                }
            }
            if (bDocPtyChange)
                ddlProperty_onchange();
        }
        else
        {
            //1120118 David 非個人案時也會有報送案別
            //document.all["H_txTA_TYPE"].value = '';
            document.all["H_txTA_TYPE"].value = rtnTaInfo.sTaType;

            //1120330 David 依現場回報說明，改為不需清空
            /*document.all["H_txPERSON_FULL_NAME"].value = '';
            document.all["H_txPERSON_ID"].value = '';
            document.all["H_txJOB_ORGNO"].value = '';
            document.all["H_txJOB_ORGNAME"].value = '';
            document.all["H_txJOB_NO"].value = '';
            document.all["H_txJOB_TITLE_NO"].value = '';
            document.all["H_txJOB_TITLE"].value = '';*/
        }
    }
}

//1120505 Kevin 1120350 新增影像匯入功能
function handleImgFileSelect() 
{
    if ($('#txImgFilePath')[0].files.length == 0)
    {
        document.all.cbIsOnlineDoc.checked = false;

        //1130103 Kevin 屏東302 掃描影像支援紙本併同歸檔選項
        document.all.cbIsRcvfile.disabled = true;
        document.all.cbIsRcvfile.checked = false;
    }
    else
    {
        //1130419	Cloud   1121097		增加檔案上傳前檢核-S
        var strName = $('#txImgFilePath')[0].files[0].name.split(".");
        var extName = strName[strName.length - 1].toUpperCase();
        var accceptName = $('#txImgFilePath')[0].accept.split(",");
        var ShowName = "";
        var bFileCheck = false;
        //1141223   Joeko    1141162     新增檔案大小檢核
        var nFileSize = $('#txImgFilePath')[0].files[0].size;
        var strSizeErr = "";

        for (var iFiletype = 0; iFiletype < accceptName.length; iFiletype++)
        {
            if ("." + extName.toUpperCase() == accceptName[iFiletype].toUpperCase())
            {
                bFileCheck = true;
                break;
            }
        }
        if (!bFileCheck)
        {
            //1141223 Joeko 1141162 修改檔案格式檢核方式
            //alert("僅能上傳：" + $('#txImgFilePath')[0].accept.toUpperCase() + "類型檔案。");
            jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["非准許夾帶上傳的檔案類型。"])), "");
            $('#txImgFilePath').val('');
            return;
        }
        //1141223   Joeko    1141162     新增檔案大小檢核
        if (nFileSize != 0)
            nFileSize = Math.ceil(nFileSize / 1024);
        var nFileSizeLimit = (document.all["TB_FILE_SIZE_LIMIT"].value == "") ? 0 : parseInt(document.all["TB_FILE_SIZE_LIMIT"].value, 10);
        if (nFileSizeLimit < nFileSize)
        {
            strSizeErr += strName + "(檔案大小" + nFileSize + "KB)";
            jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strSizeErr + "，已超過檔案大小上限[" + nFileSizeLimit + "KB]\n故無法選擇此檔。"])), "");
            return;
        }
        //1130419	Cloud   1121097		增加檔案上傳前檢核-E
        document.all.cbIsOnlineDoc.checked = true;

        //1130103 Kevin 屏東302 掃描影像支援紙本併同歸檔選項
        document.all.cbIsRcvfile.disabled = false;
        document.all.cbIsRcvfile.checked = (document.all.H_ODT130_RCVFILE_DEFAULT && document.all.H_ODT130_RCVFILE_DEFAULT.value == "Y");

    }
}


//1130124 Zen 1120978 調整共用題號區間時儲存前檢核文號邏輯
function GetMaxUseNo()
{
    //1140207 Zen 1140051 修正未使用題號區間但啟用列印條碼等同要號時與ODT120同時使用衍生文號檢核異常之問題，轉型為Int避免誤判
    //return OD.ODT130.GetMaxUseNo().value;
    return parseInt(OD.ODT130.GetMaxUseNo().value);
}

//1130626 Kevin 1130291 支援AI預設承辦單位
let sConfGreenLightColor = 'rgb(157 255 157)';
let sConfGreenColor = 'rgb(129 200 102)';
let sConfYellowLightColor = 'rgb(250 236 135)';
let sConfYellowColor = 'rgb(241 189 0)';
let sConfRedLightColor = 'rgb(245 204 204)';
let sConfRedColor = 'rgb(248 61 80)';

function InitConfColor(Infrdeptno, Infrdeptname, argConfLight)
{
    let setColor = sConfGreenColor;
    let setLightColor = sConfGreenLightColor;

    if (argConfLight)
    {
        if (argConfLight == "G")
        {
            setColor = sConfGreenColor;
            setLightColor = sConfGreenLightColor;
        }
        if (argConfLight == "Y")
        {
            setColor = sConfYellowColor;
            setLightColor = sConfYellowLightColor;
        }
        if (argConfLight == "R")
        {
            setColor = sConfRedColor;
            setLightColor = sConfRedLightColor;
        }
    }
    if (Infrdeptno)
    {
        if (Infrdeptno.length == 2)
        {
            $("#dlDEPT").combobox("setkeywords", [
                { id: 'dlDEPT_Text', word: Infrdeptname, cssClass: setColor },
            ]);

            if (document.all['dlDEPT_Text'].value == Infrdeptname)
                $("#dlDEPT_Text").css("background-color", setColor);
        }
        else
        {
            //1130712	Leslie	幫修正設定外觀
            // if ($("#dlAssignOrg option:selected").text() == Infrdeptname)
            if ($("#dlAssignOrg option:selected").val().indexOf(Infrdeptno) > 0)
            {
                $("#dlAssignOrg").css("background-color", setColor);
            }
            else
            {
                $("#dlAssignOrg").css("background-color", '');
            }


            // 选择包含特定文本内容的 <option> 元素
            //$('#dlAssignOrg option:contains("' + Infrdeptname + '")').css("background-color", setColor);

            //1130712	Leslie	幫修正設定外觀
            // $("#dlAssignOrg").on("click", function ()
            $("#dlAssignOrg").on("focus", function ()
            {
                $("#dlAssignOrg").css("background-color", '');

                //1130712	Leslie	幫修正設定外觀
                // $('#dlAssignOrg option:contains("' + Infrdeptname + '")').css("background-color", setColor);
                $(`#dlAssignOrg option[value*="${Infrdeptno}"]`).css("background-color", setColor);
            });

            $("#dlAssignOrg").on("change focusout", function ()
            {
                //1130712	Leslie	幫修正設定外觀
                // if ($("#dlAssignOrg option:selected").text() == Infrdeptname)
                if ($("#dlAssignOrg option:selected").val().indexOf(Infrdeptno) > 0)
                {
                    $("#dlAssignOrg").css("background-color", setColor);
                }
                else
                {
                    $("#dlAssignOrg").css("background-color", '');
                }
            });

        }
    }

    //$("#dlDEPT").combobox("setkeywords", [
    //	{ id: 'dlDEPT_Text', word: '政務次長室', cssClass: 'rgb(89 209 89)' },
    //	{ id: 'dlDEPT_Text', word: '民政司', cssClass: sConfYellowColor },
    //	{ id: 'dlDEPT_Text', word: '地政司', cssClass: sConfRedColor },
    //]);

    $("#btSimilarDocDept").css({
        "background-image": `linear-gradient(to bottom, ${setLightColor}, ${setColor})`, "color": "rgb(0, 0, 128)"
    });

    $("#btSimilarDocAssign").css({
        "background-image": `linear-gradient(to bottom, ${setLightColor}, ${setColor})`, "color": "rgb(0, 0, 128)"
    });
}

//1130626 Kevin 1130291 支援AI預設承辦單位
function SetBtSimilarDocType()
{
    if (document.all.h_txConfLight.value == '')
    {
        $("#btSimilarDocDept").addClass('hide');
        $("#btSimilarDocAssign").addClass('hide');
    }
    //1140917 Zen 1140166 修正輔助檢索按鈕因AI推測單位為空時顯示位置異常之問題，一律顯示至承辦單位旁
    //else if (!$("#cbAssign").prop("checked"))
    else
    {
        $("#btSimilarDocDept").removeClass('hide');
        $("#btSimilarDocAssign").addClass('hide');
    }
    //1140917 Zen 1140166 修正輔助檢索按鈕因AI推測單位為空時顯示位置異常之問題，一律顯示至承辦單位旁
    //else
    //{
    //    $("#btSimilarDocDept").addClass('hide');
    //    $("#btSimilarDocAssign").removeClass('hide');
    //}
}

//1130626 Kevin 1130291 提供參照窗格使用
let u_SimilarDocNo = '';
function GetDocCompareId()
{
    let rtnObject = { 'OrgNo': document.all.SOURCE_ORGNO.value, 'DocId': document.all["txDocumentID"].value, 'defaultDocNo': u_SimilarDocNo };
    return rtnObject;
}

//1130626 Kevin 1130291 新增設定承辦單位下拉選單
function SetCcbDept(argDeptNo, argDeptName, argSetColor, argConflight)
{
    if (argDeptNo && argDeptNo != '')
    {
        if (argDeptNo.length == 2)
        {
            $("#cbSendOu").prop("checked", true);

            let dlDEPT = document.all['dlDEPT'];

            for (let i = 0; i < dlDEPT.length; i++)
            {
                let ddOptions = dlDEPT.options[i];
                let strDeptNo = ddOptions.value.split(":")[0];
                let strDeptName = ddOptions.value.split(":")[1];
                if (strDeptNo == argDeptNo)
                {
                    argDeptName = strDeptName;

                    dlDEPT.selectedIndex = i;
                    document.all['dlDEPT_Text'].value = strDeptName;
                    //1140914 Zen 1140166 修正由ODT134帶回公文後首次切換一級承辦時二級承辦單位選單未更新之問題
                    //dlDEPT_Text_onblur(true);
                    dlDEPT_Text_onblur(false);
                    break;
                }
            }
        }
        else
        {
            $("#cbAssign").prop("checked", true);

            for (let i = 0; i < dlAssignOrg.length; i++)
            {
                let ddOptions = dlAssignOrg.options[i];

                let strAssignNo = ddOptions.value.split("|")[1];
                if (strAssignNo == argDeptNo)
                {
                    argDeptName = ddOptions.text;

                    dlAssignOrg.selectedIndex = i;
                    break;
                }
            }
        }
        //1130814 Kevin 1130291 可能有信心值沒有預判單位，需可開相似公文
        //SetBtSimilarDocType();
    }
    //1130814 Kevin 1130291 可能有信心值沒有預判單位，需可開相似公文
    SetBtSimilarDocType();

    if (argSetColor)
        InitConfColor(argDeptNo, argDeptName, argConflight);
}