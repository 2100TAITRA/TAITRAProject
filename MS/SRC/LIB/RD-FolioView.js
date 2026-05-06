// FolioView class
// DATE		SA			PRG			MGR_NO		DESC
//	2015.12.15 - Raymond, 改用theLogger記錄LOG資訊
//	1051007		Raymond		修改簽核物件tooltip的內容格式
//  1060331		Raymond		新增檢閱指定頁面功能
// DATE		SA			PRG			MGR_NO		DESC
// 1060428	Raymond		Raymond		1060271		附件頁面影像載入完成比pageFlipped回呼函式執行還慢時, 要重設頁籤位置, 否則頁籤不會移動; 頁籤移動後差距超過一定範圍(10px), 則隱藏指令列, 以免以按頁籤方式換頁時會殘留指令列在舊的頁籤位置
// 1060504	Raymond		Raymond		-------		修正排版頁數與封裝檔記錄不一致時再判斷可編輯內文才設定異動旗標
// 1060518	Raymond		Raymond		1060269		檢核目前追蹤修訂模式是否為完稿模式, 若不是的話, 提示訊息後, 切回完稿模式
// 1060614	Raymond		Raymond		1060471		下載img(排版物件)指定的圖檔影像
// 1060621	Raymond		Raymond		1060283		附件頁籤改用掛載於nsEditor命名空間的指令列項目組成指令列按鈕, 並新增附件所有頁面向右及左旋轉90度指令
// 1060623	Raymond		Raymond		1060147		開啟舊檔後直接開啟受文者子視窗
// 1060623	Raymond		Raymond		1060361		新增另存自訂範本功能選單項目
// 1060724	Raymond		Raymond		1060604		修正簽核框外物件亦套用外部簽核記錄檔所記錄的座標
// 1060808	Raymond		Raymond		1060579		歷史檢視改由封裝檔計算取得的保留簽核物件顯示
// 1060822	Raymond		Raymond		1060703		新增切換至特定頁面功能及關閉公文時隱藏簽核物件檢閱窗格
// 1060904	Leslie		Leslie		1060759		修正參考附件頁籤顯示異常
// 1060911	Raymond		Raymond		1060764		自動蓋職名章功能支援autoPress屬性設定的預設職名章功能
// 1060927	Raymond		Raymond		-------		切換保留簽署物件選項後立即重新整理頁面(成大要求)
// 1060927	Raymond		Raymond		1060879		瀏覽器可能無法下載章戳或圖檔影像網址, 應重新下載
// 1061006	Raymond		Raymond					修正刪除或置換、上下移附件後refresh, 無附件頁面而跳出錯誤問題
// 1061018	Raymond		Raymond		1060930		修正時戳顯示年時年超出職名章高度問題
// 1061026	Raymond		Raymond		1060838		設定文字意見寬度避免被簽核框邊框限制折行
// 1061027	Leslie		Leslie		1060973		修正於檢視附件頁面時，執行附件維護後，造成的翻頁異常
// 1061102	Raymond		Raymond		1061078		修正"己"無次頁為"已"
// 1061102	Raymond		Raymond		1060788		來文本文頁面尺寸不是直式A4時, 須因應調整頁面大小及頁籤位置
// 1061103	Raymond		Raymond		1060952		切換流程點時隱藏簽核物件清單
// 1061109	Raymond		Raymond		1060452		關閉套件畫面UI時一併關閉簽辦意見窗格
// 1061113	Raymond		Raymond		1061068		新增附件影像檔原始寬高資訊, 以供假旋轉功能使用
// 1061120	Raymond		Raymond		1060969		圖示文字意見的檢視功能TEXTAREA改為DIV, 文字超出寬度時改成顯示scrollbar提供拖拉功能
// 1061124	Raymond		Raymond		1060753		翻頁或重新整理時偵測是否處於簽核物件的畫布模式, 若是則執行新增簽核物件功能, 使繪製到一半的鋼筆、紅筆、螢光筆新增為簽核物件
// 1061212	Raymond		Raymond		1061117		文字意見為圖示形式時不要設定寬度, 避免文字內容很長時, 因為算出來的寬度太長而蓋到旁邊的文字意見, 造成無法選取的問題
// 1061222	David		David		1061170		呼叫WedEditSave.fnWebEditSave()，新增傳入觸發類型
// 1061222	Raymond		Raymond		1061155		文稿頁籤新增另存DI功能選單項目
// 1070129	Leslie		Leslie		1061274		於附件頁籤加上的title屬性以顯示附件摘要
// 1070202	Raymond		Raymond		1070103		修正先開最速件, 再開速件公文時, 公文夾底色仍保持紅色的問題
// 1070320	Raymond		Raymond		1070363		關閉公文時不要關閉簽辦意見窗格, 只要清空簽辦意見清單
// 1070611	Raymond		Raymond		1070530		文稿頁籤區別主辦/會辦新增的文稿，會辦新增的文稿tooltip增加會辦單位名稱
// 1070620	Raymond		Raymond		1070197		第一頁初始完成後再記憶正確的UI狀態, 避免切換子文/分會文再切回母文/主辦文時部份UI按鈕不會恢復顯示問題
// 1071024	Leslie		Leslie		1070999		於附件不匯出的模式下，針對不可於瀏覽器直接開啟的附件[JPG、PNG、GIF、PDF]，設定Download屬性以觸發下載至正確檔名
// 1080521	Raymond		Raymond		1080370		修正檢視數位墨水時, 數位墨水影像顯示在空的DIV下方導致超出子視窗邊界問題
// 1080527	Raymond		Raymond		1080451		修正在IE下從只有來文的併案文切回主文(第一筆)時, 因Cached的正副抄本DIV的child元素消失(IE才會, 原因未知), 導致由Cache恢復的正副抄本內容變空的問題
// 1080923  Kevin       Eric        1080339     jQuery 3.0 upgrade
// 1081213	Raymond		Raymond		1080785		合併內政部單號1070656, 新增支援"自訂"簽核區域類型及檢核環境變數WE_ALLOW_CON_KEEP_SIGNOBJ若為Y, 則允許簽稿會核單或會辦單保留顯示異動文稿內容前的簽核物件
// 1081218	Raymond		Raymond		-------		修正文字意見的XSS漏洞, 並轉換非圖示化文字意見的<br>為折行字元, 以符合未修正漏洞前的顯示行為
// 1081230	Raymond		Raymond		1081089		修正開啟公文時若縮放比控制項未初始化完成, 會發生錯誤無法翻頁的問題
// 1081230	Raymond		Raymond		1080194		配合fnWebEditSave改為非同步呼叫, 儲存前檢核也改成非同步呼叫, 翻頁則修改呼叫方式
// 1090221	Raymond		Raymond		1081090		第一頁初始完成後theAOL.docObj.uiState移至saveUI後再設為null, 若saveUI發現異常, 可取得uiState及uiParam供追蹤問題原因
// 1090312	Raymond		Raymond		1081105		新增選用章戳(文字意見、圖檔)可連動職名章功能, 修正連結有連動關係簽核物件的邏輯
// 1090318	Raymond		Raymond		1090089		修正紙本公文開啟舊檔時不會自動開啟受文者子視窗的問題
// 1090424	Raymond		Raymond		1090305		點開文稿後初次分頁判斷比封裝檔頁數多時, 傳入第2參數true表示不要設定文稿為dirty狀態, 以避免簽核物件位於簽核框(最末頁)外時, 會出現找不到頁面ID的問題
// 1090513	Raymond		Raymond		1090223		新增遞增目前文稿順序函式及修改更新文稿頁籤邏輯, 配合啟用自動調整簽稿會核單為第一筆功能
// 1090826	Raymond		Raymond		1090620		修正參照窗格的來文頁面大小若非A4, 其上的簽核物件會位移的問題
// 1090831	Raymond		Raymond		1090529		調閱公文若強制"顯示"浮水印, 則將文稿頁面背景設為LOGO影像及日期帳號
// 1090916	Raymond		Raymond		1090564		新增支援信保特殊模式公文相關修改
// 1091014	Raymond		Raymond		1090564		新增信保特殊模式下的本文頁面比照附件頁面標記attachment class並記錄pgo物件, 以提供旋轉頁面功能
// 1091022	Raymond		Raymond		1090107		修正非本頁之簽核區域發生頁次異動情形時, 僅複製了該頁新增的簽核物件至異動後簽核區域所在頁次, 而未刪除該頁的簽核物件, 導致簽核物件重複, 在傳送後出現2個相同的簽核物件並重疊顯示的問題
// 1091023	Raymond		Raymond		1090735		新增更新排版頁面(點擊任何頁面外按鈕)時, 傳入fo參數以供分頁功能判斷首頁若有設定上下邊界區, 計算首頁可容納高度
// 1091124	Raymond		Raymond		1090564		信保特殊模式預設顯示公文基資頁
// 1091127	Raymond		Raymond		1090564		修正信保特殊模式公文開啟參照窗格時, 因無ODCDWM可判定而不會因應頁面非A4大小而改變寬高的問題
// 1091202	Raymond		Raymond		1090908		信保基金特殊模式草稿公文的文稿頁籤提供「所有頁面向右轉90度」、「所有頁面向左轉90度」功能
// 1100317	Raymond		Raymond		1090855		將文稿頁籤的指令列中的「刪除稿件」按鈕移至最右位置
// 1100419	Raymond		Raymond		1080767		合併內政部1070530, 若系統參數CHECK_CLOSEDDRAFT_EDIT為Y, 文稿頁籤區別出已結案文稿
// 1100512	Raymond		Raymond		1090821		支援外呈外會公文的公文呈現檔文稿頁面, 及歷史檢視過濾掉無文稿頁面的外機關流程點
// 1100524	Raymond		Raymond		1100298		新增可「修改」會辦單位的他流程之文字意見功能
// 1100617	Raymond		Raymond		1080761		合併內政部1070298, 新增判斷系統參數USE_REF_DOC啟用時, 顯示參考公文頁籤功能
// 1100623	Raymond		Raymond		1100780		新增一般機關也可套用強制浮水印功能
// 1100706	Raymond		Raymond		1100648		啟用分文稿記錄簽核意見功能時, 切換文稿顯示要重新整理簽核意見窗格
// 1100719	Raymond		Raymond		1100854		新增[高大客製化]歷史檢視流程點的日期顯示年月日時分秒功能
// 1100820	Raymond		Raymond		1100431		文稿頁籤新增查找取代文字功能選單項目
// 1100823	Raymond		Raymond		1100844		新增一代既有功能, 若符合環境變數「WE_NO_OPEN_RECEIVER_DOC_TYPES」所設定的文別, 在開啟舊檔或貼上稿件時不要自動開啟受文者編輯子視窗
// 1100908	Raymond		Raymond		1090863		新增點擊來文頁籤顯示「下載R.PDF」指令功能
// 1100909	Raymond		Raymond		1101135		新增文稿時若文稿內容有異動(機關客製化邏輯改變欄位(發文機關全銜)預設內容), 則立即重新整理, 以避免樣版以稿件欄位為判斷式條件時, 因樣版已套用完才會改變欄位內容, 導致樣版是以欄位改變前的內容來呈現而非改變後內容來呈現排版頁面的問題
// 1100930	Raymond		Raymond		1101137		修正歷史檢視中「被修改」的會辦單位的他流程之文字意見, 未套用隱藏效果問題
// 1101026	Raymond		Raymond		1100991		修正弱掃Client DOM XSS
// 1110301	Raymond		Raymond		1110106		合併1080815, 上一頁、下一頁功能新增偵測若附件無頁面會跳過
// 1110309	Raymond		Raymond		1070363		修正開啟第2筆以後公文的參照窗格時, 因會關閉前1筆參照公文而清空右邊本文的簽辦意見窗格內容的問題
// 1110317	Eric		Raymond		1101578		新增判斷屬於應以附件編輯模組的檔案類型時, 改用附件編輯模組開啟
// 1110328 	Leslie		Leslie		1100287		Merge[1070359]	新增支援載入DI副檔名時, 先執行前置處理再執行後續功能
// 1110331	Raymond		Raymond		1110348		修正啟用會辦單位可新增文稿的機關, 會辦單位使用者可開啟主辦單位的文稿的附件管理子視窗並上傳附件, 導致主辦單位的文稿清稿而使章戳不見的問題
// 1110406	Eric		Leslie		1101578		開啟前前檢核是否有開啟編輯中附件未關閉
// 1110407	Eric		Raymond		1101578		AOL首次載入公文時, 檢查若未啟動編輯模組, 則提示警告一次後, 以舊邏輯下載檔案方式處理附件頁籤點擊行為
// 1110411	Eric		Raymond		1101578		判斷是否啟用附件編輯功能從環境變數改為全域變數
// 1110414	Eric		Raymond		1101578		修正參照公文開啟歷史檢視窗格的附件時, 不論選哪個流程點, 都會下載文號-00-99目錄下的最新版附件電子檔及下載到與公文目前的msgId的(AttEditAux)同一子目錄下的問題
// 1110420	Raymond		Raymond		1110438		修正iPad上點擊參考公文不會出現參考文號選單的問題, 順便修正在非100%縮放比時, 參考文號選單出現位置會與100%縮放比時不同的問題
// 1110802	Raymond		Raymond		考試院序148	修正啟用附件編輯功能時, 點擊來文的附件沒有反應的問題, 來文附件改以模組直接開啟, 可編輯儲存但不會上傳的唯讀方式處理
// 1111012	Leslie		Leslie		1110865		新增可依設定，啟用參考附件顯示子頁籤，新增客製化簽閱附件
// 1111021	Raymond		Raymond		1110885		新增提供給外部(匯入銓敘文稿)叫用更新參考附件頁籤的方法
// 1111024	Raymond		Raymond		1110864		合併1101468, 新增判斷不是參照公文才重新整理簽核意見窗格, 調整第一次顯示簽核意見窗格時的預設寬度為符合container的margin-right的寬度
// 1111201	Raymond		Raymond		1110867		文稿頁籤新增另存TXT檔、另存ODT檔功能選單項目
// 1111207 	Kevin		Leslie		1110832		新增來文頁面的旋轉功能
// 1111221	Raymond		Raymond		銓敘部序74	文稿頁籤指令列要折行成兩行
// 1120210	Raymond		Raymond		1111035		由於貼式文字意見改為未依邊框寬度自動折行的原始輸入文字, 所以檢視子視窗也要改成會折行, 以免一行太長超出檢視子視窗的文字方塊範圍太多的問題
// 1120224	Raymond		Raymond		1111225		關閉公文時也要清空內部意見的流程點項目
// 1120314	Leslie		Raymond		1111133		新增來文附件頁籤指令列的重新命名功能
// 1120321	Leslie		Leslie		考試院序9	修改"R.PDF"為"來文.PDF"
// 1120607	Raymond		Raymond		1120515		呼叫refreshSOPages(@RD-Layout.js)時傳入新增的docObj參數
// 1120620	Raymond		Raymond		標檢局序86	修正職名章高度設定小於7.7mm時, 時戳字型大小計算會得出小於9pt的大小, 但瀏覽器最小只能顯示9pt的字, 將導致時戳文字高於職名章的問題, 故再計算縮小行高來調整時戳文字的高度
// 1120818	Raymond		Raymond		1120503		新增檢查目前顯示文稿為可編輯狀態且文別為簽時, 顯示製表工具列, 依環境變數"WE_ENABLE_CUSTOM_TABLE"設定啟用
// 1121006	Raymond		Raymond		北大序255	修正在可編輯內文時, 因排版設定檔改變等原因, 導致動態排版的頁數大於封裝檔之前流程點匯出的頁數時, 要設定文稿為dirty狀態, 觸發重新匯出頁面, 才能避免在最末頁的簽核框外加蓋簽核物件後儲存時, 發生錯誤的問題
// 1121117	Raymond		Raymond		1120881		新增切換不保留或保留簽署物件時, 簽核區域恢復為預設高度或原始高度, 及重新整理時判斷目前頁次在最末頁但頁數有縮減時, 則變更目前頁序至縮減後的頁數最末頁再重新整理一次
// 1121215	David		David		1120975		(Merge1101638)開啟後判斷ODWDCM.SHOW_ALT_MSG有資料時，顯示提示訊息
// 1121229	Raymond		Raymond		1120974		修正目前正在檢視附件頁面時, 開啟附件管理子視窗刪除目前附件後, 會發生Error轉圈圈的問題
// 1130122	David		Joe			1120952		增加當匯入舊稿件含內部單位時，判斷交換代碼是否正確
// 1130206	Raymond		Raymond		1120887		新增支援會稿單位可編輯簽稿會核單相關功能
// 1130220	Raymond		Raymond		1120234		新增來文DI可直接在DocView新分頁中單獨載入顯示功能
// 1130315	Raymond		Raymond		1130050		新增支援「貼布」功能, 及點選前流程點簽核物件時, 多顯示「貼布」指令按鈕
// 1130422	Raymond		Raymond		1120881		自動加蓋職名章時, 若文稿樣版(Template及PrintXSL都要支援)支援簽核區域自動增高功能, 則簽核區域下方空間不足時不要換行, 而是自動增高簽核區域
// 1130426	Raymond		Raymond		中榮序97	新增檢查若有開雙視窗模式的話, 在開啟公文後立即在DocView子視窗開啟同一筆公文, 以雙視窗模式開啟DocView模組後, 預設要切成第一筆附件的第一頁顯示
// 1130430	Raymond		Raymond		中榮序94	新增支援滑鼠滾輪向下滾到底再向下滾會自動翻至下一頁, 向上滾到頂再向上滾會自動翻至上一頁, 行動裝置往下撥到底再向下撥會自動翻至下一頁, 往上撥到頂到向上撥會自動翻至上一頁
// 1130430	Raymond		Raymond		中榮序95	新增判斷OwnRoleID符合環境變數「AOL_HIDE_DRAFT_CMDS_ROLES」設定的長官角色時, 不要顯示點擊文稿頁籤時的指令列
// 1130502	Raymond		Raymond		中榮序97	若有開雙視窗模式的話, 新增在開啟公文後判斷非草稿才會自動在DocView子視窗開啟同一筆公文
// 1130507	Raymond		Raymond		中榮序95	新增判斷OwnRoleID符合環境變數「AOL_HIDE_DRAFT_CMDS_ROLES」設定的長官角色時, 不要顯示點擊附件頁籤時的指令列
// 1130605	Raymond		Raymond		1130120		修正文稿頁面上的簽核框外物件也可套用外部簽核記錄檔所記錄的座標, 以避免一些較早期線上簽核公文寫了錯誤(超大)座標資訊到封裝檔的簽核物件無法藉由XSignObjs.xml修復, 造成預覽列印時產生超多(數千)空白頁的問題
// 1130730	Raymond		Raymond		中榮序155	修改滑鼠滾輪翻頁功能為不能翻到公文基資頁
// 1130809	Raymond		Raymond		1130313		合併1111007(1100394), 離線模式下不提供同步寫回公文基資功能
// 1130822	Raymond		Raymond		中榮序179	修正由於滑鼠滾輪滾動(onwheel)事件會連續觸發, 所以當已經到頂或底時再往上或下滾時, 不要重複執行對應的翻頁行為, 以避免點擊簽核區域不會出現簽核工具列的問題, 及縮小顯示比例至不會顯示捲動條時, 往上或下滾不會執行對應的翻頁行為的問題
// 1130826	Raymond		Raymond		中榮序214	修正自動增高簽核區域高度或異動內文後, 加蓋貼布物件於前流程點的簽核物件後傳送, 被蓋住的簽核物件仍會顯示及歷史檢視也一樣的問題
// 1130910	Leslie		Leslie		1130694		新增於來文頁籤可開啟EDI021 來文文字子視窗
// 1130912	Raymond		Raymond		中榮序236	修正縮放比縮小自動蓋章變往上位移, 放大變往下位移的問題
// 1130924	Raymond		Raymond		1130834		修改「下戴:來文.PDF」指令按鈕名稱為「下載來文PDF」
// 1131001	Raymond		Raymond		北榮序278	1.新增環境變數「AOL_NO_FLIP_CROSS_DRAFT_ATTACH」, 設為"Y"時滾輪滾到底/頂翻頁, 不要翻至下/上筆文稿/附件, 2.新增滾輪滾到底/頂後等待時間, 可設定環境變數「AOL_WHEEL_FLIP_WAIT_TIME」, 單位為"秒", 未設定時預設為0.5
// 1131007	Raymond		Raymond		1130988		修正翻次頁, 有附件但全部無附件頁面時, _currPo.attIdx會變最末筆, 造成翻頁異常的問題
// 1131008	Raymond		Raymond		北榮序286	修正開啟公文後捲動文稿頁面到底部, 關閉/傳送後再開另一筆公文, 文稿頁面仍會顯示在底部的問題
// 1131022	Raymond		Raymond		1131016		修正快速滾滑鼠滾輪到底或到頂時, 會立即翻頁, 及在附件最後一頁點擊下一頁出現「已無次頁」後再點擊下一頁會變成翻回第一筆附件的第一頁的問題
// 1131029	Raymond		Raymond		勤益序332	修正滾輪滾動幅度大或連續快速點擊下一頁按鈕兩次, 會發生翻到次頁後, 點擊簽核區域出現錯誤導致簽核工具列不會顯示的問題
// 1131122	Raymond		Raymond		北榮序374	頁面重整後, 先檢查頁面是否已有簽核物件, 有的話要先清除, 再顯示該頁面的簽核物件, 以修正滾輪翻頁時會觸發2次pageFlipped, 同頁的簽核物件會重複出現2次的問題
// 1131211	Raymond		Raymond		1131110		修正在歷史檢視時點擊顯示來文的附件頁面後, 切換至其它文稿數少於當前的流程點(ex.分文)時, 會出現"要求取得第X個文稿附件數量, 超出範圍"錯誤的問題
// 1131213	Raymond		Raymond		1131064		新增環境變數「WE_ALLOW_VIEW_READONLY_PAPER_DOC_FOLDER」, 當目前資料夾符合設定值時, 允許禁止編輯內文的紙本公文, 可以檢視文稿
// 1131230	Raymond		Raymond		1131318		修正XSignObjs.xml有不存在SignWork.xml中的簽核物件時, 會發生Error導致無法關閉公文等問題
// 1140206	Raymond		Raymond		1131137		合併CDC1110401, 簽核物件tooltip新增顯示「分機：」欄位
// 1140213	Raymond		Raymond		1131244		新增開啟公文時判斷資料夾若符合環境變數「AOL_TCMODE_FOLDERS」, 切換追蹤修訂模式為預設模式, 點擊其他文稿頁籤時不要跳警告並自動切回完稿模式
// 1140527	Raymond		Raymond		1140321		觸控翻頁功能改到RD-Layout.js處理
// 1140224	Raymond		Raymond		1131303		新增切換文稿顯示時重新整理錯別字校正窗格, 及偵測錯別字校正子視窗是否正顯示在頁面中, 是則隱藏(移至頁面外)
// 1140723	Kevin		Leslie		1141011		弱掃修正[Client DOM Stored XSS](MS-ODC010.html，經查均未使用內置或外部javascript
// 1140801	Kevin		Leslie		1141011		弱掃修正[Client DOM Stored XSS]，試用套件消毒
// 1140821	Raymond		Raymond		1140818		新增機關暱稱為"TPVGH"(北榮)時, 滑鼠移至文稿頁籤一律顯示稿序tooltip, 並增加第二行顯示稿件的產生日期時間, 新增在環境變數「AOL_AUTO_OPEN_REFVIEW_FOLDER」設定的資料夾流程點開啟線上簽核公文時, 檢核到「可發文文別」的稿面有簽核區域外物件或文稿最後匯出頁面版本非原承辦人時, 自動開啟參照窗格
// 1140909	Raymond		Raymond		1140852		新增更新頁次控制項
// 1140910	Raymond		Raymond		退輔會序203	新增判斷是否由MP的開啟舊檔匯入ZIP檔, 是則啟動匯出附件頁面功能
// 1140922	Raymond		Raymond		1140887		新增點擊其它流程點的文字意見時, 自動捲動簽辦意見窗格將該流程點捲到最上面
// 1140926	Raymond		Raymond		1140818		V5再變更需求項目7, 取消自動開啟參照窗格行為, 及判斷SSO_CONFIG.OrgNickName=TPVGH時, 取消提示非完稿模式的警告訊息
// 1141002	Raymond		Raymond		-------		修正從追蹤修訂模式切回完稿模式若發生頁數減少情況時, 新加蓋的簽核物件不會從追蹤修訂模式時的最末頁移至完稿模式時的最末頁顯示的問題
// 1141020	Raymond		Raymond		1141013		新增檢核是否允許便簽也提供自訂表格功能
// 1141027	Raymond		Raymond		北榮序322	修正在邊界區的簽核區域蓋章並儲存後, 翻頁會轉圈圈問題
// 1141110	Raymond		Raymond		1141113		新增顯示便利貼功能
// 1141224	Raymond		Raymond		1141652		取消檢視其他流程點的便利貼條件限制, 開啟其他流程點的便利貼檢視子視窗新增刪除按鈕, 及修改便利貼顯示方式

var nsEditor = nsEditor||{};
function FolioView(model, $viewPort) {
	if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
		theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- new FolioView BEGIN...');
		window.tmBeginFolioView = Date.now();
	}
	
	//1101026 Raymond 1100991 弱掃XSS修正
	function HtmlEncode(s) {
		var div = document.createElement('div');
		div.appendChild(document.createTextNode(s));
		return div.innerHTML;
	}

	theLogger.log("new FolioView(model.readOnly:" + model.readOnly() + ")");
	// 2016.5.5 新增頁籤指令列定義, 頁籤指令改掛在nsEditor命名空間
	var cmdItemsA = [	// 來文用的頁籤指令列
		{id:"viewRcvText",			name:"來文文字",		vis:"onViewRcvTextVisible",			fn:"onViewRcvText"},	// 1130910	Leslie		Leslie		1130694		新增於來文頁籤可開啟EDI021 來文文字子視窗
		{id:"viewFromDoc",			name:"參照來文",		vis:"onViewFromDocVisible",			fn:"onViewFromDoc"},	// 1130220 Raymond 1120234 新增來文DI可直接在DocView新分頁中單獨載入顯示功能
		/*{id:"dlDIorTxt",	name:"公文內容文字檔",	vis:"onDlDIorTxtVisible",	fn:"onDlDIorTxt"},	1100908 Raymond 目前沒有這3個指令的功能
		{id:"dlPDF",		name:"本文PDF檔",		vis:"onDlPDFVisible",		fn:"onDlPDF"},
		{id:"dlAll",		name:"全部檔案",		vis:"onDlAllVisible",		fn:"onDlAll"},*/
		// 1130924 Raymond 1130834 修改「下戴:來文.PDF」指令按鈕名稱為「下載來文PDF」
		// 1120321	Leslie	[考試院序9]修改"R.PDF"為"來文.PDF"
		// {id:"dlRPDF",		name:"下載R.PDF",		vis:"onDlRPDFVisible",		fn:"onDlRPDF"}	// 1100907 Raymond 1090863 新增來文頁籤下載R.PDF功能
		//{id:"dlRPDF",		name:"下載:來文.PDF",		vis:"onDlRPDFVisible",		fn:"onDlRPDF"}	// 1100907 Raymond 1090863 新增來文頁籤下載R.PDF功能
		{id:"dlRPDF",		name:"下載來文PDF",			vis:"onDlRPDFVisible",		fn:"onDlRPDF"}	// 1100907 Raymond 1090863 新增來文頁籤下載R.PDF功能
		,{id:"dlRcvRefAtt",		name:"來文參考檔案",		vis:"onDlRcvRefAttVisible",		fn:"onDlRcvRefAtt"}	// 1110816 Kevin 1110633 新增來文參考檔案功能
		,{id:"rotateRAllPageRight",	name:"所有頁面向右轉90度",	vis:"onRotateRcvAllPageVisible",	fn:"onRotateRcvAllPageRight"}	// 1111207	Leslie[1110832] 新增所有頁面旋轉功能
		,{id:"rotateRAllPageLeft",	name:"所有頁面向左轉90度",	vis:"onRotateRcvAllPageVisible",	fn:"onRotateRcvAllPageLeft"}
	];
	var cmdItemsB = [	// 文稿用的頁籤指令列
		{id:"exportCurrDraft",		name:"另存新檔",		vis:"onExportCurrDraftVisible",		fn:"onExportCurrDraft"},
		{id:"exportDI",				name:"另存DI檔",		vis:"onExportDIVisible",			fn:"onExportDI"},	// 1061222 Raymond 1061155 新增另存DI功能選單項目
		{id:"exportTXT",			name:"另存文字檔",		vis:"onExportTXTVisible",			fn:"onExportTXT"},	// 1111201 Raymond 1110867 新增另存TXT檔功能選單項目
		{id:"exportCurrDraftHTML",	name:"另存HTML檔",		vis:"onExportCurrDraftHTMLVisible",	fn:"onExportCurrDraftHTML"},
		{id:"exportODT",			name:"另存ODT檔",		vis:"onExportODTVisible",			fn:"onExportODT"},	// 1111201 Raymond 1110867 新增另存ODT檔功能選單項目
		{id:"saveAsSample",			name:"另存為自訂範本",	vis:"onSaveAsSampleVisible",		fn:"onSaveAsSample"},	// 1060623 Raymond 1060361 新增另存自訂範本功能選單項目
		{id:"copyCurrDraft",		name:"複製稿件",		vis:"onCopyCurrDraftVisible",		fn:"onCopyCurrDraft"},
		{id:"pasteCurrDraft",		name:"貼上稿件(置換)",	vis:"onPasteCurrDraftVisible",		fn:"onPasteCurrDraft"},
		{id:"transformDocType",		name:"文別轉換",		vis:"onTransformDocTypeVisible",	fn:"onTransformDocType"},
		{id:"genMailMerges",		name:"多稿轉出",		vis:"onGenMailMergesVisible",		fn:"onGenMailMerges"},
		{id:"searchReplace",		name:"查找取代文字",	vis:"onSearchReplaceVisible",		fn:"onSearchReplace"},	// 1100720 Raymond 1100431 新增查找取代文字功能選單項目
		{id:"gotoPage",				name:"檢閱指定頁面",	vis:"onGoToDraftPageVisible",		fn:"onGoToDraftPage"},
		{id:"delCurrDraft",			name:"刪除稿件",		vis:"onDelCurrDraftVisible",		fn:"onDelCurrDraft"},	// 1100317 Raymond 1090855 按鈕從原來位置移至最右
		{id:"rotateDAllPageRight",	name:"所有頁面向右轉90度",	vis:"onRotateDraftAllPageRightVisible",	fn:"onRotateDraftAllPageRight"},	// 1091202 Raymond 1090908 [信保特殊模式]新增文稿所有頁面旋轉功能
		{id:"rotateDAllPageLeft",	name:"所有頁面向左轉90度",	vis:"onRotateDraftAllPageLeftVisible",	fn:"onRotateDraftAllPageLeft"}
	];
	var cmdItemsC = [	// 附件用的頁籤指令列
		{id:"gotoPage",				name:"檢閱指定頁面",		vis:"onGoToAttPageVisible",			fn:"onGoToAttPage"},
		{id:"rotateAllPageRight",	name:"所有頁面向右轉90度",	vis:"onRotateAllPageRightVisible",	fn:"onRotateAllPageRight"},	// 1060621 Raymond 1060283 新增所有頁面旋轉功能
		{id:"rotateAllPageLeft",	name:"所有頁面向左轉90度",	vis:"onRotateAllPageLeftVisible",	fn:"onRotateAllPageLeft"},
		{id:"renameAttName",		name:"重新命名",			vis:"onRenameAttNameVisible",	fn:"onRenameAttName"}	// 1120314 Raymond 1111133 新增來文附件重新命名功能
	];
	
	// private members
	var _model = model;			// 公文夾模型
	_model.registerView(this);	// 向Model註冊View物件
	var _viewPort = $viewPort;	// viewPort元素
	var _currPo = {
		draftIdx: -1,	// 文稿序, 0-based, -1表示公文基資
		attIdx: -1,		// 附件序, 0-based, -1表示本文
		po: 0			// 第0頁
	}
	$viewPort.data("view", this);	// 2016.5.5 新增記錄在.viewPort以便全域物件可以存取目前顯示公文
	theLogger.warn("重設_memPPD");
	var _memPPD = new Array(model.getDraftCounts());	// 記憶每筆文稿的頁數(Pages Per Draft)
	var _memPPA = [];									// 記憶每筆附件的頁數(Pages Per Attachment)
	// TODO: 應事先得知每筆文稿的頁數, 放在頁籤顯示
	
	// 1130430 Raymond 中榮序95 新增判斷OwnRoleID符合環境變數「AOL_HIDE_DRAFT_CMDS_ROLES」設定的長官角色時, 不要顯示點擊文稿頁籤時的指令列
	var hideDraftCmds = false,
		hideDraftCmdsRoles = theSSO.User.EnvSettings.get("AOL_HIDE_DRAFT_CMDS_ROLES");
	if(!!hideDraftCmdsRoles && !!_model.getDocObj().ownRoleId) {
		var roles = hideDraftCmdsRoles.split(",");
		if(roles.indexOf(_model.getDocObj().ownRoleId) >= 0) {
			theLogger.log("本件公文的OwnRoleID(" + _model.getDocObj().ownRoleId + ")符合環境變數「AOL_HIDE_DRAFT_CMDS_ROLES」設定的角色, 不顯示文稿頁籤的指令列");
			hideDraftCmds = true;
		}
	}
	
	var _uploadInitialLog = false;	// 2016.2.24
	
	// 2016.2.26 調整viewPort的container(.contentPane)為視窗高度減2個header高度(for iPad Pro滿版顯示)
	function refreshDimension() {
		var offs = $viewPort.parent().offset();
		$viewPort.parent().css("height", (window.innerHeight - offs.top) + "px");
		$viewPort.closest(".ui-tabs-content").find("#sidebar").css("height", (window.innerHeight - offs.top) + "px");
		
		// 1111024 Raymond 1110864 合併高大序29, 調整以DocView開啟公文, 在放大時簽辦意見窗格的顯示寬度
		$viewPort.closest("#viewDoc").css("overflow", "hidden");
		if($viewPort.closest("#isoContainer").find("#sidePanel").is(":visible")) {
			var cntrW = $viewPort.closest("#isoContainer").css("margin-right");
			var pnlW = $viewPort.closest("#isoContainer").find("#sidePanel").width();
			if(parseFloat(cntrW) > parseFloat(pnlW))
				$viewPort.closest("#isoContainer").find("#sidePanel").width(cntrW);
			else if(parseFloat(pnlW) > parseFloat(cntrW)) {
				// 1111024 Raymond 1110864 合併1100648, 修正關閉顯示簽辦意見窗格時, 只有清單隱藏, 側邊欄未縮回去的問題
				if($viewPort.closest("#isoContainer").hasClass("showSidePanel")) {
					if(parseFloat(cntrW) > parseFloat(pnlW))
						$viewPort.closest("#isoContainer").find("#sidePanel").width(cntrW);
					else if(parseFloat(pnlW) > parseFloat(cntrW)) {
						// 1111024 Raymond 1110864 合併1101468, 調整第一次顯示簽辦意見窗格時的預設寬度為符合container的margin-right的寬度
						pnlW = cntrW;
						if(parseFloat(pnlW) < 200) {
							pnlW = "200px";
							// 1111024 Raymond 1110864 合併1101468, 調整第一次顯示簽辦意見窗格時的預設寬度為符合container的margin-right的寬度
							//$viewPort.closest("#isoContainer").find("#sidePanel").css("min-width", pnlW);
						}
						// 1111024 Raymond 1110864 合併1101468, 調整第一次顯示簽辦意見窗格時的預設寬度為符合container的margin-right的寬度
						$viewPort.closest("#isoContainer").find("#sidePanel").width(pnlW);
					}
					// 1111024 Raymond 合併高大緊急叫修平板要預設顯示簽辦意見窗格, 判斷若是行動版傳送區面板顯示時, 調整簽辦意見窗格寬度, 避免窗格右側多一個空白
					else if(parseInt(cntrW) == 0 && (!!theAOL.docObj.uiState && theAOL.docObj.uiState.mobileDeviceUI) || (!theAOL.docObj.uiState && _getMobileDeviceUI(theAOL.docObj))) {
						pnlW = "200px";
						$viewPort.closest("#isoContainer").find("#sidePanel").css("min-width", pnlW);
					}
					$viewPort.closest("#isoContainer").css("margin-right", pnlW);
				}
				else
					$viewPort.closest("#isoContainer").css("margin-right", "");
			}
		}
	}
	$(window).on("resize", refreshDimension);
	refreshDimension();
	
	// private methods
	// DP轉換成LP, 預設單位為"in"
	function DPtoLP(obj, unit) {
		
		var dpi = 300, res = {};
		
		function dp2lp(v) {
			if(unit == "mm")
				return ((typeof v === "string")?Number(v):v) * 25.4 / dpi;
			return ((typeof v === "string")?Number(v):v) / dpi;
		}
		if("x" in obj)
			res.x = dp2lp(obj.x);
		if("y" in obj)
			res.y = dp2lp(obj.y);
		if("left" in obj)
			res.left = dp2lp(obj.left);
		if("top" in obj)
			res.top = dp2lp(obj.top);
		if("right" in obj)
			res.right = dp2lp(obj.right);
		if("bottom" in obj)
			res.bottom = dp2lp(obj.bottom);
		if("width" in obj)
			res.width = dp2lp(obj.width);
		if("height" in obj)
			res.height = dp2lp(obj.height);
		return res;
	}
	function PtInArea(pt, signArea) {
		return (pt.x > signArea.left && pt.x < (signArea.left + signArea.width) &&
				pt.y > signArea.top && pt.y < (signArea.top + signArea.height));
	}
	// 2016.10.7 FIX, 修正tooltip顯示內容
	function _makeSOInfo(so) {
		var userName = _model.getSignFolder().getFlowUserInfo(so.flowId);
		// 1140206 Raymond 1131137 合併CDC1110401, 簽核物件tooltip新增顯示「分機：」欄位
		var telExt = _model.getSignFolder().getSOTelExt(so);
		// 1100715 Raymond 1100854 新增[高大客製化]簽核物件tooltip顯示到秒功能
		if(theUserInfo.OrgNickName == "NUK")
			// 1140206 Raymond 1131137 合併CDC1110401, 簽核物件tooltip新增顯示「分機：」欄位
			//return userName + "\n時間：" + so.time.substr(0, 3) + "年" + so.time.substr(3, 2) + "月" + so.time.substr(5, 2) + "日 " + so.time.substr(7, 2) + ":" + so.time.substr(9, 2) + ":" + ((so.time.length == 13)?so.time.substr(11, 2):"00");
			return userName + "\n分機：" + telExt + "\n時間：" + so.time.substr(0, 3) + "年" + so.time.substr(3, 2) + "月" + so.time.substr(5, 2) + "日 " + so.time.substr(7, 2) + ":" + so.time.substr(9, 2) + ":" + ((so.time.length == 13)?so.time.substr(11, 2):"00");
		// 1140206 Raymond 1131137 合併CDC1110401, 簽核物件tooltip新增顯示「分機：」欄位
		//return userName + "\n時間：" + so.time.substr(0, 3) + "年" + so.time.substr(3, 2) + "月" + so.time.substr(5, 2) + "日 " + so.time.substr(7, 2) + ":" + so.time.substr(9, 2);
		return userName + "\n分機：" + telExt + "\n時間：" + so.time.substr(0, 3) + "年" + so.time.substr(3, 2) + "月" + so.time.substr(5, 2) + "日 " + so.time.substr(7, 2) + ":" + so.time.substr(9, 2);
	}
	function showTextModal(so) {
		
		var $this = this;
		Util.getDlg("RD-TextCommentR.html").done(function($dlg) {
			
			// 2016.8.31 因應jQM4.5調整
			$dlg.find("header > h1").unwrap();
			$dlg.find("footer > div").unwrap();
			
			$dlg.find("textarea").on("input", function(event) {
				event.preventDefault();
				return false;
			});
			
			$dlg.find("a#ok").on('click', function(event) {
				
				$.modal.close();
				
				window.scrollTo(0, 0);	// 2014.8.19 - iOS7會往上飄, 要往下拉...
			});
			
			var w = $this.closest("#iso").width(),
				h = $this.closest("#iso").height();
			// 2016.11.29 新增支援數位墨水檢視
			if(so.type == "文字意見") {
				// 1061115 Raymond 1060969 改DIV及scrollbar
				// init dlg, 2014.7.16 - Raymond, 多處修正
				//$dlg.find("textarea").css({
				//						"font-family": so.content.font.name,
				//						"font-size": so.content.font.size + "pt",
				//						"font-weight": (so.content.font.style == "粗體" || so.content.font.style == "粗斜體")?"bolder":"normal",
				//						"font-style": (so.content.font.style == "斜體" || so.content.font.style == "粗斜體")?"italic":"normal"})
				//					.attr("data-autogrow", "false")	// 2016.8.31 不要自動縮放textarea
				//					.attr("readOnly", "true")		// 2016.11.29 唯讀
				//					.val(so.content.text);
				// 1081217 Raymond FIX XSS
				//$("<p>" + so.content.text.replace(/\n/g, "<br>") + "</p>").appendTo($dlg.find("[data-role='content'] > div"))
				$("<p></p>").appendTo($dlg.find("[data-role='content'] > div"))
								 .css({ "font-family": so.content.font.name,
										"font-size": so.content.font.size + "pt",
										"font-weight": (so.content.font.style == "粗體" || so.content.font.style == "粗斜體")?"bolder":"normal",
										"font-style": (so.content.font.style == "斜體" || so.content.font.style == "粗斜體")?"italic":"normal",
										// 1120210 Raymond 1111035 由於貼式文字意見改為未依邊框寬度自動折行的原始輸入文字, 所以檢視子視窗也要改成會折行, 以免一行太長超出檢視子視窗的文字方塊範圍太多的問題
										// 1081217 Raymond FIX XSS
										//"white-space": "nowrap"});
										//"white-space": "pre"})
										"white-space": "pre-wrap"})
								.text(so.content.text);	// 1081217 Raymond FIX XSS, 圖示文字意見不會是文字式選用章戳, 不需要將<br>替換成折行字元
				theLogger.log("檢視文字意見對話方塊, w:" + w + ",h:" + h);
				$.modal($dlg, {
					appendTo:$this.closest("#iso"),
					overlayCss:{height:h, width:w},
					maxWidth: 400,	// 1061115 Raymond 1060969 修改280->400
					minHeight: 320,
					autoResize:true,	// 2015.8.17 縮小文字意見輸入大小
					onShow: function() {
						// 2015.11.4 子視窗出現後隱藏指令列
						$this.closest(".viewPort").data("editCursor").cmdFloat.hide();
					}
				});
				$dlg.trigger("create");
			}
			else {
				_model.getSignFolder().getSODataURL(so).done(function(dataUrl) {
					// 1080521 Raymond 1080370 修正數位墨水影像顯示在空的DIV下方導致超出子視窗邊界問題
					//$dlg.find("img").attr("src", dataUrl).show();
					//$dlg.find("textarea").hide();
					$dlg.find("h1").text("數位墨水");
					var wid = so.content.area.right - so.content.area.left,
						hei = so.content.area.bottom - so.content.area.top;
					// 1080521 Raymond 1080370 修正數位墨水影像顯示在空的DIV下方導致超出子視窗邊界問題
					//$dlg.find("img").css({width: wid + "px", height: hei + "px"});
					$dlg.find("img").attr("src", dataUrl).appendTo($dlg.find("[data-role='content'] > div"))
						.css({width: wid + "px", height: hei + "px"}).show();
					
					theLogger.log("檢視數位墨水對話方塊, w:" + w + ",h:" + h);
					$.modal($dlg, {
						appendTo:$this.closest("#iso"),
						overlayCss:{height:h, width:w},
						maxWidth: wid,
						minHeight: 320,//hei + 40,	1080521 Raymond 1080370 修正數位墨水影像顯示在空的DIV下方導致超出子視窗邊界問題
						autoResize:true,
						onShow: function() {
							// 2015.11.4 子視窗出現後隱藏指令列
							$this.closest(".viewPort").data("editCursor").cmdFloat.hide();
						}
					});
					$dlg.trigger("create");
				});
			}
		});
	}
	// 2017.1.17 建立章戳類型簽核物件
	function _createStampSO(so, $parent, offsetLP) {
		var areaLP = DPtoLP(so.content.area, "mm");
		var w = areaLP.right - areaLP.left,
			h = areaLP.bottom - areaLP.top;
		var $img = $("<div class='sign-obj so-stamp' data-id='" + so.id + "' title='" + _makeSOInfo(so) + "'><img/></div>").appendTo($parent).css({
				position: "absolute",
				left: offsetLP.x + "mm",
				top: offsetLP.y + "mm"})
			.find("img").css({
				width: w + "mm",
				height: h + "mm"});
		if(so.content.dispTime) {
			var timeStr = so.time;
			// 1100715 Raymond 1100854 支援[高大客製化]章戳簽核物件的日期包含年月日時分秒功能
			if(so.time.length == 13) {
				if(theSSO.User.EnvSettings.get('AOL_SIGNET_TIMESTAMP_SHOW_YEAR') == 'Y')
					timeStr = so.time.substr(0, 3) + "<br>" + so.time.substr(3, 4) + "<br>" + so.time.substr(7, 4);
				else
					timeStr = so.time.substr(3, 4) + "<br>" + so.time.substr(7, 4);
			}
			else
			if(so.time.length == 11) {    // 11碼是包含年份
				if(theSSO.User.EnvSettings.get('AOL_SIGNET_TIMESTAMP_SHOW_YEAR') == 'Y')
					timeStr = so.time.substr(0, 3) + "<br>" + so.time.substr(3, 4) + "<br>" + so.time.substr(7);
				else
					timeStr = so.time.substr(3, 4) + "<br>" + so.time.substr(7);
			}
			else if(so.time.length == 8)// 8碼不包含年份
				timeStr = so.time.substr(0, 4) + "<br>" + so.time.substr(4);
			var $div = $("<div style='display:inline-block; overflow:hidden; text-align:center; color:black'>" + timeStr + "</div>").insertAfter($img);
			// 封裝檔記錄的章戳寬度是包含顯示時戳的寬度, 時戳寬度固定為章戳高度, 也就是時戳是一個正方形
			$img.css("width", (w - h) + "mm");
			// 計算正方形內可佔滿顯示的適合字型大小
			// 正確算法是 h * 300 / 25.4 / 10(magic number?)
			var fontHeight = h * 30 / 25.4;
			if(theSSO.User.EnvSettings.get('AOL_SIGNET_TIMESTAMP_SHOW_YEAR') == 'Y')
				fontHeight = h * 300 / 25.4 / 12;
			$div.css("font-size", Math.floor(fontHeight) + "pt");
			// 1061018 Raymond 1060930 修正時戳顯示年時年超出職名章高度問題
			if(theSSO.User.EnvSettings.get('AOL_SIGNET_TIMESTAMP_SHOW_YEAR') == 'Y')
				$div.css("line-height", "1");
			// 1120620 Raymond 標檢局序86 修正職名章高度設定小於7.7mm時, 時戳字型大小計算會得出小於9的大小, 但瀏覽器最小只能顯示9pt的字, 故要再用縮小行高來調整
			else {
				if(fontHeight < 9) {	// 字型小於9pt
					var pxh = (so.content.area.bottom - so.content.area.top) * 96 / 300;	// 職名章高度實際px
					var lh = (pxh + 2) / 24;	// 9pt單行高度12px, 2行24px, 職章高度若小於24px, 會使計算行高小於1, 但時戳第2行下方其實還有一點空間, 故再加2px計算行高
					lh = Math.floor(lh * 100) / 100;
					$div.css({"vertical-align": "top", "line-height": Math.max(lh, 0.84)});	// 行高小於0.84會切到第一行字的上面, 故限制最小行高不小於0.84
				}
			}
		}
		// 1130315 Raymond 1130050 新增支援「貼布」功能
		if(theSSO.User.EnvSettings.get('AOL_ENABLE_ERASER_TAPE') == '1') {
			$img.parent().on("click", function(evt) {
				$parent.closest(".pg").find(".sign-obj").removeClass("so-active");
				var $this = $(this).addClass("so-active");
				
				var cmds = new Array();
				cmds.special = true;
				if("initCmds" in nsEditor)
					nsEditor.initCmds(cmds, $this);
				if(cmds.length > 0) {
					var c = $parent.closest(".viewPort").data("editCursor");
					c.cmdFloat.setCmds(cmds);
					c.cmdFloat.setElem(this);
					return false;
				}
			});
		}
		// 2016.3.7 新增不套用職名章顏色
		if(SSO_CONFIG && "applySignetColor" in SSO_CONFIG && SSO_CONFIG.applySignetColor == false) {
			_model.getSignFolder().getSODataURL(so).done(function(dataUrl) {
				so.imgData = dataUrl;
				$img.get(0).src = dataUrl;
			});
		}
		else {
			var canvas = document.createElement("canvas");
			var img = new Image();
			img.onload = function() {
				var t = new Date();
				theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + "." + t.getMilliseconds() + " 章戳Image[ID:" + $img.parent().attr("data-id") + "].onload - width: " + this.width + ", height: " + this.height);
				canvas.width = this.width;
				canvas.height = this.height;
				var ctx = canvas.getContext("2d");
				ctx.beginPath();
				ctx.drawImage(this, 0, 0);
				ctx.closePath();
				var picData = ctx.getImageData(0, 0, this.width, this.height);
				var picLength = this.width * this.height;
				for(var i=0; i<picLength * 4; i+=4) {
					if(picData.data[i] != 255)
						picData.data[i] = so.content.color.r;	// 2015.5.27 改用r,g,b與章戳顏色物件一致
					if(picData.data[i + 1] != 255)
						picData.data[i + 1] = so.content.color.g;
					if(picData.data[i + 2] != 255)
						picData.data[i + 2] = so.content.color.b;
					if(picData.data[i] == 255 && picData.data[i+1] == 255 && picData.data[i+2] == 255) // 2016.12.4 若指定透明則白色改成透明
						picData.data[i+3] = 0;
				}
				ctx.putImageData(picData, 0, 0);
				$img.get(0).src = canvas.toDataURL("image/png");
			}
			// 1060927 Raymond 1060879 瀏覽器可能無法下載章戳影像網址, 需要重新下載
			var c = 0;
			img.onerror = function() {
				var t = new Date();
				theLogger.warn(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + "." + t.getMilliseconds() + " 章戳Image[ID:" + $img.parent().attr("data-id") + "]載入失敗, 重新載入(" + (++c) + ")...");
				//img.src = so.imgData;// 1060928 Raymond 先不要retry, 查明造成下載失敗的環境的問題後再修
			}
			_model.getSignFolder().getSODataURL(so).done(function(dataUrl) {
				theLogger.warn("章戳ID:'" + so.id + "'鏈結網址:" + dataUrl);	// 2016.11.25 新增Log記錄以追蹤下載網址問題
				so.imgData = dataUrl;	// 2015.11.18 記錄影像dataUrl, 供檢核職名
				img.src = dataUrl;
			});
		}
	}
	// 2017.1.17 建立圖檔類型簽核物件
	function _createImageSO(so, $parent, offsetLP, $pg) {
		var areaLP = DPtoLP(so.content.area, "mm");   // 2016.2.25 先將座標值轉成邏輯座標
		var $img = $("<div class='sign-obj so-img' data-id='" + so.id + "' title='" + _makeSOInfo(so) + "'>" +
			"<img src='image/AOL/sketch_comment.bmp' style='display:" + ((so.asIcon)?"inline":"none") + "'></img>" +
			"<img style='display:" + ((so.asIcon)?"none":"inline") + "'></img></div>").appendTo($parent)
				.css({left: (offsetLP.x - (so.asIcon?4:0)) + "mm", top: (offsetLP.y - (so.asIcon?4:0)) + "mm"})
				.on('click', function(event) {	// 2015.7.14 新增切換圖示顯示功能
					$pg.find(".sign-obj").removeClass("so-active");
						var $this = $(this).addClass("so-active");
						
					var cmds = new Array();
					cmds.special = true;
					if($this.find("img").eq(1).css("display") == "none") {
						// 2017.3.17 新增判斷圖檔大小, 超過一定大小改用分頁顯示, 航港-序150
						var wid = so.content.area.right - so.content.area.left,
							hei = so.content.area.bottom - so.content.area.top;
						if(wid > 700 || hei > 600) {
							theLogger.warn("簽核物件圖檔大小(" + wid + "X" + hei + ")超過限制, 改用分頁顯示");
							var fn = _model.subDirPath + "\\" + so.fileRef.name;
							theLogger.log("圖檔路徑:" + fn);
							var url = "/odtools/docatt.ashx?DocNo=" + _model.getDocObj().docNo + "&FileName=" + encodeURIComponent(Base64.encode(fn)) + "&SAMLart=" + localStorage['Artifact'];
							theLogger.log(url);
							cmds.push({name:"檢視", func: function(so) {
								$(this).attr({"data-role": "none",
											"href": url,
											"rel": "external",
											"data-ajax": "false",
											"target": "_blank"
											});
							}, cbdata: so, asLink: true});	// 指定asLink讓指令按鈕像超鏈結方式運作
						}
						else
							cmds.push({name:"檢視", func: function(so) {	// 2016.11.29 補檢視功能
								showTextModal.call($this, so);
							}, cbdata: so});
					// 1130315 Raymond 1130050 新增支援「貼布」功能
					//	var c = $pg.closest(".viewPort").data("editCursor");
					//	c.cmdFloat.setCmds(cmds);
					//	c.cmdFloat.setElem(this);
					}
					if("initCmds" in nsEditor)
						nsEditor.initCmds(cmds, $this);
					if(cmds.length > 0) {
						var c = $pg.closest(".viewPort").data("editCursor");
						c.cmdFloat.setCmds(cmds);
						c.cmdFloat.setElem(this);
					}
					
					return false;
				});
		//if(!so.asIcon)	// 2016.2.25 FIX位於簽核區域內的圖檔沒有寬高問題
			$img.find("img").eq(1).css({width: (areaLP.right - areaLP.left) + "mm", height: (areaLP.bottom - areaLP.top) + "mm"});
		_model.getSignFolder().getSODataURL(so).done(function(dataUrl) {
			theLogger.warn("圖檔ID:'" + so.id + "'鏈結網址:" + dataUrl);	// 1060927 新增Log記錄以追蹤下載網址問題
			if(so.content.maskBkgnd == "Y") {// 去背
				var canvas = document.createElement("canvas");
				var img = new Image();
				img.onload = function() {
					var t = new Date();
					// 1090122 Raymond 修正log記錄圖檔ID錯為簽核區域ID問題
					//theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + "." + t.getMilliseconds() + " 圖檔Image[ID:" + $img.parent().attr("data-id") + "].onload - width: " + this.width + ", height: " + this.height);
					theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + "." + t.getMilliseconds() + " 圖檔Image[ID:" + $img.attr("data-id") + "].onload - width: " + this.width + ", height: " + this.height);
					canvas.width = this.width;
					canvas.height = this.height;
					var ctx = canvas.getContext("2d");
					ctx.beginPath();
					ctx.drawImage(this, 0, 0);
					ctx.closePath();
					var picData = ctx.getImageData(0, 0, this.width, this.height);
					var picLength = this.width * this.height;
					var transparency = Number(so.content.transparency);// transparency 0~255, 0是不透明, 255是全透明
					// 2015.4.14 去背功能似乎無效(可能是JPG衍生問題)
					for(var i=0; i<picLength * 4; i+=4) {
						if (picData.data[i] == 255 &&
							picData.data[i + 1] == 255 &&
							picData.data[i + 2] == 255) {// 白色為背景色
							picData.data[i + 3] = 0;    // Alpha 0為透明
						}
						else if(transparency > 0) {	// 半透明
							picData.data[i + 3] = 255 - transparency;
						}
					}
					ctx.putImageData(picData, 0, 0);
					$img.find("img").get(1).src = canvas.toDataURL("image/png");
				}
				// 1060927 Raymond 1060879 瀏覽器可能無法下載章戳影像網址, 需要重新下載
				var c = 0;
				img.onerror = function() {
					var t = new Date();
					theLogger.warn(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + "." + t.getMilliseconds() + " 章戳Image[ID:" + $img.parent().attr("data-id") + "]載入失敗, 重新載入(" + (++c) + ")...");
					//img.src = so.imgData;// 1060928 Raymond 先不要retry, 查明造成下載失敗的環境的問題後再修
				}
				so.imgData = dataUrl;	// 1060927 Raymond 1060879 瀏覽器可能無法下載圖檔影像網址, 記錄此網址供重新下載
				img.src = dataUrl;	// 用img.onload去背
			}
			else
				$img.find("img").get(1).src = dataUrl;
		});
	}
	// 1100514 Raymond 1100298 新增soBuilder、missSubst參數, 以支援「修改」他流程之文字意見功能
	// 2017.1.17 建立文字類型簽核物件
	//function _createTextSO(so, $parent, offsetLP, $pg) {
	function _createTextSO(so, $parent, offsetLP, $pg, soBuilder, missSubst) {
		// 2016.10.3 新增title資訊
		var $tx = $("<div class='sign-obj so-text' data-id='" + so.id + "' title='" + _makeSOInfo(so) + "'>" +
			"<img src='image/AOL/txt_comment.bmp' style='display:" + ((so.asIcon)?"inline":"none")+ "'>" +
			"<div style='display:" + ((so.asIcon)?"none":"block") +
				";writing-mode:" + ((so.content.orient == "直書")?"tb-rl":"lr-tb") +
				";font-family:" + so.content.font.name +
				";font-size:" + (so.content.font.size+"pt") +
				";color: rgb(" + so.content.font.color.r + "," + so.content.font.color.g + "," + so.content.font.color.b + ")'>" +
				// 1081217 Raymond FIX XSS
				//so.content.text.replace(/\n/g, '<br>') + "</div></div>").appendTo($parent)
				"</div></div>").appendTo($parent)
				.css({left: (offsetLP.x - (so.asIcon?4:0)) + "mm", top: (offsetLP.y - (so.asIcon?4:0)) + "mm"})
				.on('click', function(event) {	// 2015.7.14 新增切換圖示顯示功能
					$pg.find(".sign-obj").removeClass("so-active");
					var $this = $(this).addClass("so-active");
					
					var cmds = new Array();
					cmds.special = true;
					if($this.find("img").css("display") == "none") {
					}
					else {
						cmds.push({name:"檢視", func: function(so) {	// 2016.10.3 補檢視功能
							showTextModal.call($this, so);
						}, cbdata: so});
						// 1100514 Raymond 1100298 他流程的文字意見新增「修改」指令
						//var c = $pg.closest(".viewPort").data("editCursor");
						//c.cmdFloat.setCmds(cmds);
						//c.cmdFloat.setElem(this);
					}
					// 1100514 Raymond 1100298 他流程的文字意見新增「修改」指令
					if(_model.isEnableCoverOtherTextObj(so)) {
						cmds.push({name:"修改", func: function(so) {
							soBuilder.coverOtherTextObj(so).done(function(newSO) {
								if(!!newSO) {
									newSO.substObjId = so.id;	// 記錄被取代的文字意見ID
									$tx.hide();
								}
							});
						}, cbdata: so});
					}
					// 1130315 Raymond 1130050 新增支援「貼布」功能
					if("initCmds" in nsEditor)
						nsEditor.initCmds(cmds, $this);
					if(cmds.length > 0) {
						var c = $pg.closest(".viewPort").data("editCursor");
						c.cmdFloat.setCmds(cmds);
						c.cmdFloat.setElem(this);
					}
					
					// 1140922 Raymond 1140887 新增點擊其它流程點的文字意見時, 自動捲動簽辦意見窗格將該流程點捲到最上面
					if(SSO_CONFIG.OrgNickName == "TPVGH") {
						let $pnl = $("#sidePanel");
						let $div = $("#signCmtList").find("li > div.flowsite_info[data-flowid='" + so.flowId.replace("sign", "FLOW") + "']");
						let ofs = $div.parent().offset();
						let ofsP = $pnl.offset();
						let st = $pnl.prop("scrollTop");
						let st2 = ofs.top - ofsP.top;
						$pnl.prop("scrollTop", st + st2);
					}
					
					return false;
				});
		// 1081217 Raymond FIX XSS
		$tx.find("> div").text(so.content.text.replace(/<br>/g, "\n"));	// 1081218 Raymond 為了顯示已用&lt;br&gt;記錄在封裝檔中的文字意見, 替換成折行字元
		
		switch(so.content.font.style) {
		case "粗斜體":
			$tx.find("div").css({fontWeight: "bolder", fontStyle: "italic"});
			break;
		case "粗體":
			$tx.find("div").css({fontWeight: "bolder"});
			break;
		case "斜體":
			$tx.find("div").css({fontStyle: "italic"});
			break;
		default:
			break;
		}
		// 1061212 Raymond 1061117 圖示形式時不要設定寬度, 避免文字內容很長時, 因為算出來的寬度太長而蓋到旁邊的文字意見, 造成無法選取的問題
		// 1061026 Raymond 1060838 設定文字意見寬度避免被簽核框邊框限制折行, 本來可以設width為CSS3的fit-content, 但IE11不支援
		//if($.isFunction(getMaxLenghtFromTextComment))
		if($.isFunction(getMaxLenghtFromTextComment) && !so.asIcon)
			//1080918	Leslie[1080788]	因應Chrome在在特定環境上會出現字型間距比其他電腦寬(CSS資訊無法取得)，修正計算方式
			//$tx.width(getMaxLenghtFromTextComment(so.content.text,$tx.find("> div").css('font-size').replace('px',''),so.content.font.style.match(/[粗斜]體/)));
			// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
			// $tx.width(getMaxLenghtFromTextComment(so.content.text,$tx.find("> div").get(0)));
			$tx.width(getMaxLenghtFromTextComment(so.content.text,$tx.find("> div").eq(0)));
		
		/* 2015.11.18 位於簽核區域內的文字意見額外設定寬度, 以使其可超出區域顯示
		var $test = $("<div style='position:absolute'></div>").append($tx.find("div").clone(true)).appendTo("body");
		var cx = $test.width();
		$tx.find("div").css("width", (cx + 2) + "px");
		$test.remove();*/
		
		// 1100517 Raymond 1100298 若設定了取代他流程文字意見, 則在同一頁搜尋該文字意見並隱藏
		if(!!so.substObjId) {
			theLogger.log("搜尋被取代的他流程文字意見(ID:" + so.substObjId + ")");
			var $substObj = $parent.closest(".pg").find(".so-text").filter(function() {
				return ($(this).attr("data-id") == so.substObjId);
			});
			if($substObj.length) {
				if($substObj.length == 1)
					$substObj.hide();
				else
					theLogger.error("應被取代的他流程文字意見(ID:" + so.substObjId + ")有" + $substObj.length + "個, 無法確定要隱藏哪一個");
			}
			else {
				theLogger.log("同一頁找不到應被取代的他流程文字意見(ID:" + so.substObjId + "), 記錄起來");
				missSubst.push(so.substObjId);
			}
		}
		// 1100524 Raymond 1100298 修正來文有文字意見會轉圈圈問題
		// 1100518 Raymond 1100298 符合被別的流程文字意見取代時, 隱藏本文字意見並刪去取代ID
		if(!!missSubst && missSubst.indexOf(so.id) >= 0) {
			theLogger.log("本文字意見已設定被其他文字意見取代, 隱藏");
			$tx.hide();
			missSubst.splice(missSubst.indexOf(so.id), 1);
		}
	}
	// 1100514 Raymond 1100298 新增soBuilder、missSubst參數, 以支援「修改」他流程之文字意見功能
	// 2017.1.16 建立簽核框內物件元素
	//function buildSOTypeA(sod, signArea, $pg) {
	function buildSOTypeA(sod, signArea, $pg, soBuilder, missSubst) {
		var so = sod.ref;
		if(!so) {
			theLogger.error("簽核物件記錄(ID:" + sod.id + ")無實際對應物件可顯示");
			return;
		}
		if(so.type == "章戳") {
			var offsetLP = DPtoLP(sod.offset, "mm");
			_createStampSO(so, signArea.$area, offsetLP);
			
			// 2017.1.24 計算下一個可自動蓋章的位置
			if("mostRightTop" in signArea) {
				signArea.mostRightTop.x = Math.max(signArea.mostRightTop.x || 0, (sod.offset.x + (parseInt(so.content.area.width) || parseInt(so.content.area.right) - parseInt(so.content.area.left))) * 794 / 2480);
				signArea.mostRightTop.x2 = Math.max(signArea.mostRightTop.x2 || 0, parseInt(so.content.area.right) * 794 / 2480);
				//signArea.mostRightTop.y = 0;
				//signArea.mostRightTop.y2 = parseInt(signArea.top) * pg.container.pageExt.height / 3507;
				theLogger.log("signArea.mostRightTop: x:" + signArea.mostRightTop.x + ", x2: " + signArea.mostRightTop.x2 + ", y:" + signArea.mostRightTop.y + ", y2:" + signArea.mostRightTop.y2);
			}
			
			if("mostLeftBottom" in signArea) {
				//signArea.mostLeftBottom.x = 0;
				//signArea.mostLeftBottom.x2 = parseInt(signArea.left) * pg.container.pageExt.width / 2480;
				signArea.mostLeftBottom.y = Math.max(signArea.mostLeftBottom.y || 0, (sod.offset.y + (parseInt(so.content.area.height) || parseInt(so.content.area.bottom) - parseInt(so.content.area.top))) * 1123 / 3507);
				signArea.mostLeftBottom.y2 = Math.max(signArea.mostLeftBottom.y2 || 0, parseInt(so.content.area.bottom) * 1123 / 3507);
				theLogger.log("signArea.mostLeftBottom: x:" + signArea.mostLeftBottom.x + ", x2: " + signArea.mostLeftBottom.x2 + ", y:" + signArea.mostLeftBottom.y + ", y2:" + signArea.mostLeftBottom.y2);
			}
			
			if("nextSignPos" in signArea) {
				signArea.nextSignPos.lastStamp = so.id;	// 2016.10.26 標記簽核區域內有職名章
				if(signArea.dir == 1) {	// 由左至右
					if(sod.offset.y > signArea.nextSignPos.bottomLine) {	// 換行
						signArea.nextSignPos.x = (sod.offset.x + (parseInt(so.content.area.width) || parseInt(so.content.area.right) - parseInt(so.content.area.left))) * 794 / 2480;
						signArea.nextSignPos.x2 = parseInt(so.content.area.right) * 794 / 2480;
						signArea.nextSignPos.y = sod.offset.y * 1123 / 3507;
						signArea.nextSignPos.y2 = parseInt(so.content.area.top) * 1123 / 3507;
						signArea.nextSignPos.bottomLine = sod.offset.y + (parseInt(so.content.area.height) || parseInt(so.content.area.bottom) - parseInt(so.content.area.top));
					}
					else {
						signArea.nextSignPos.x = Math.max(signArea.nextSignPos.x || 0, (sod.offset.x + (parseInt(so.content.area.width) || parseInt(so.content.area.right) - parseInt(so.content.area.left))) * 794 / 2480);
						signArea.nextSignPos.x2 = Math.max(signArea.nextSignPos.x2 || 0, parseInt(so.content.area.right) * 794 / 2480);
						//signArea.nextSignPos.y = Math.max(signArea.nextSignPos.y || 0, (sod.offset.y + (parseInt(so.content.area.height) || parseInt(so.content.area.bottom) - parseInt(so.content.area.top))) * pg.container.pageExt.height / 3507);
						//signArea.nextSignPos.y2 = Math.max(signArea.nextSignPos.y2 || 0, parseInt(so.content.area.bottom) * pg.container.pageExt.height / 3507);
						signArea.nextSignPos.bottomLine = Math.max(signArea.nextSignPos.bottomLine, sod.offset.y + (parseInt(so.content.area.height) || parseInt(so.content.area.bottom) - parseInt(so.content.area.top)));
					}
					theLogger.log("signArea.nextSignPos: x:" + signArea.nextSignPos.x + ", x2: " + signArea.nextSignPos.x2 + ", y:" + signArea.nextSignPos.y + ", y2:" + signArea.nextSignPos.y2 + ", bottomLine:" + signArea.nextSignPos.bottomLine);
				}
				else {	// 由上至下
					if(sod.offset.x > signArea.nextSignPos.rightLine) {	// 換行
						signArea.nextSignPos.x = sod.offset.x * 794 / 2480;
						signArea.nextSignPos.x2 = parseInt(so.content.area.left) * 794 / 2480;
						signArea.nextSignPos.y = (sod.offset.y + (parseInt(so.content.area.height) || parseInt(so.content.area.bottom) - parseInt(so.content.area.top))) * 1123 / 3507;
						signArea.nextSignPos.y2 = parseInt(so.content.area.bottom) * 1123 / 3507;
						signArea.nextSignPos.rightLine = sod.offset.x + (parseInt(so.content.area.width) || parseInt(so.content.area.right) - parseInt(so.content.area.left));
					}
					else {
						//signArea.nextSignPos.x = Math.max(signArea.nextSignPos.x || 0, (sod.offset.x + (parseInt(so.content.area.width) || parseInt(so.content.area.right) - parseInt(so.content.area.left))) * pg.container.pageExt.width / 2480);
						//signArea.nextSignPos.x2 = Math.max(signArea.nextSignPos.x2 || 0, parseInt(so.content.area.right) * pg.container.pageExt.width / 2480);
						signArea.nextSignPos.y = Math.max(signArea.nextSignPos.y || 0, (sod.offset.y + (parseInt(so.content.area.height) || parseInt(so.content.area.bottom) - parseInt(so.content.area.top))) * 1123 / 3507);
						signArea.nextSignPos.y2 = Math.max(signArea.nextSignPos.y2 || 0, parseInt(so.content.area.bottom) * 1123 / 3507);
						signArea.nextSignPos.rightLine = Math.max(signArea.nextSignPos.rightLine, sod.offset.x + (parseInt(so.content.area.width) || parseInt(so.content.area.right) - parseInt(so.content.area.left)));
					}
					theLogger.log("signArea.nextSignPos: x:" + signArea.nextSignPos.x + ", x2: " + signArea.nextSignPos.x2 + ", y:" + signArea.nextSignPos.y + ", y2:" + signArea.nextSignPos.y2 + ", rightLine:" + signArea.nextSignPos.rightLine);
				}
			}
		}
		else if(so.type == "圖檔") {
			var offsetLP = DPtoLP(sod.offset, "mm");
			_createImageSO(so, signArea.$area, offsetLP, $pg);
		}
		else if(so.type == "文字意見") {
			var offsetLP = DPtoLP(sod.offset, "mm");
			// 1100514 Raymond 1100298 新增傳入第5、6參數soBuilder、missSubst, 以支援「修改」他流程之文字意見功能
			//_createTextSO(so, signArea.$area, offsetLP, $pg);
			_createTextSO(so, signArea.$area, offsetLP, $pg, soBuilder, missSubst);
			
			// 2017.1.24 計算下一個可自動蓋章的位置
			if("mostRightTop" in signArea) {
				signArea.mostRightTop.x = Math.max(signArea.mostRightTop.x || 0, (sod.offset.x + 48) * 794 / 2480);
				signArea.mostRightTop.x2 = Math.max(signArea.mostRightTop.x2 || 0, (parseInt(so.content.pos.x) + 48) * 794 / 2480);
				//signArea.mostRightTop.y = 0;
				//signArea.mostRightTop.y2 = parseInt(signArea.top) * pg.container.pageExt.height / 3507;
				theLogger.log("signArea.mostRightTop: x:" + signArea.mostRightTop.x + ", x2: " + signArea.mostRightTop.x2 + ", y:" + signArea.mostRightTop.y + ", y2:" + signArea.mostRightTop.y2);
			}
			
			if("mostLeftBottom" in signArea) {
				//signArea.mostLeftBottom.x = 0;
				//signArea.mostLeftBottom.x2 = parseInt(signArea.left) * pg.container.pageExt.width / 2480;
				signArea.mostLeftBottom.y = Math.max(signArea.mostLeftBottom.y || 0, (sod.offset.y + 48) * 1123 / 3507);
				signArea.mostLeftBottom.y2 = Math.max(signArea.mostLeftBottom.y2 || 0, (parseInt(so.content.pos.y) + 48) * 1123 / 3507);
				theLogger.log("signArea.mostLeftBottom: x:" + signArea.mostLeftBottom.x + ", x2: " + signArea.mostLeftBottom.x2 + ", y:" + signArea.mostLeftBottom.y + ", y2:" + signArea.mostLeftBottom.y2);
			}
			
			if("nextSignPos" in signArea) {
				if(signArea.dir == 1) {	// 由左至右
					/*if(so.offset.y > signArea.nextSignPos.bottomLine) {	// 換行
						signArea.nextSignPos.x = (so.offset.x + 48) * pg.container.pageExt.width / 2480;
						signArea.nextSignPos.x2 = (parseInt(so.content.pos.x) + 48) * pg.container.pageExt.width / 2480;
						signArea.nextSignPos.y = so.offset.y * pg.container.pageExt.height / 3507;
						signArea.nextSignPos.y2 = parseInt(so.content.pos.y) * pg.container.pageExt.height / 3507;
						signArea.nextSignPos.bottomLine = so.offset.y + 48;
					}
					else*/ {
						signArea.nextSignPos.x = Math.max(signArea.nextSignPos.x || 0, (sod.offset.x + 48) * 794 / 2480);
						signArea.nextSignPos.x2 = Math.max(signArea.nextSignPos.x2 || 0, (parseInt(so.content.pos.x) + 48) * 794 / 2480);
						//signArea.nextSignPos.y = Math.max(signArea.nextSignPos.y || 0, (so.offset.y + (parseInt(so.content.area.height) || parseInt(so.content.area.bottom) - parseInt(so.content.area.top))) * pg.container.pageExt.height / 3507);
						//signArea.nextSignPos.y2 = Math.max(signArea.nextSignPos.y2 || 0, parseInt(so.content.area.bottom) * pg.container.pageExt.height / 3507);
						signArea.nextSignPos.bottomLine = Math.max(signArea.nextSignPos.bottomLine, sod.offset.y + 48);
					}
					theLogger.log("signArea.nextSignPos: x:" + signArea.nextSignPos.x + ", x2: " + signArea.nextSignPos.x2 + ", y:" + signArea.nextSignPos.y + ", y2:" + signArea.nextSignPos.y2 + ", bottomLine:" + signArea.nextSignPos.bottomLine);
				}
				else {	// 由上至下
					/*if(so.offset.x > signArea.nextSignPos.rightLine) {	// 換行
						signArea.nextSignPos.x = so.offset.x * pg.container.pageExt.width / 2480;
						signArea.nextSignPos.x2 = parseInt(so.content.pos.x) * pg.container.pageExt.width / 2480;
						signArea.nextSignPos.y = (so.offset.y + 48) * pg.container.pageExt.height / 3507;
						signArea.nextSignPos.y2 = (parseInt(so.content.pos.y) + 48) * pg.container.pageExt.height / 3507;
						signArea.nextSignPos.rightLine = so.offset.x + 48;
					}
					else*/ {
						//signArea.nextSignPos.x = Math.max(signArea.nextSignPos.x || 0, (so.offset.x + (parseInt(so.content.area.width) || parseInt(so.content.area.right) - parseInt(so.content.area.left))) * pg.container.pageExt.width / 2480);
						//signArea.nextSignPos.x2 = Math.max(signArea.nextSignPos.x2 || 0, parseInt(so.content.area.right) * pg.container.pageExt.width / 2480);
						signArea.nextSignPos.y = Math.max(signArea.nextSignPos.y || 0, (sod.offset.y + 48) * 1123 / 3507);
						signArea.nextSignPos.y2 = Math.max(signArea.nextSignPos.y2 || 0, (parseInt(so.content.pos.y) + 48) * 1123 / 3507);
						signArea.nextSignPos.rightLine = Math.max(signArea.nextSignPos.rightLine, sod.offset.x + 48);
					}
					theLogger.log("signArea.nextSignPos: x:" + signArea.nextSignPos.x + ", x2: " + signArea.nextSignPos.x2 + ", y:" + signArea.nextSignPos.y + ", y2:" + signArea.nextSignPos.y2 + ", rightLine:" + signArea.nextSignPos.rightLine);
				}
			}
		}
		else {
			theLogger.warn("未支援的簽核物件(" + so.type + ")!");
		}
	}
	// 1100514 Raymond 1100298 新增soBuilder、missSubst參數, 以支援「修改」他流程之文字意見功能
	// 2017.1.24 建立參照模式下的簽核框內物件元素
	//function buildSOTypeA2(sod, signArea, $pg) {
	function buildSOTypeA2(sod, signArea, $pg, soBuilder, missSubst) {
		var so = sod.ref;
		if(!so) {
			theLogger.error("簽核物件記錄(ID:" + sod.id + ")無實際對應物件可顯示");
			return;
		}
		if(so.type == "章戳") {
			var offsetLP = DPtoLP({x:parseInt(sod.offset.x) + parseInt(signArea.left), y:parseInt(sod.offset.y) + parseInt(signArea.top)}, "mm");
			_createStampSO(so, $pg, offsetLP);
		}
		else if(so.type == "圖檔") {
			var offsetLP = DPtoLP({x:parseInt(sod.offset.x) + parseInt(signArea.left), y:parseInt(sod.offset.y) + parseInt(signArea.top)}, "mm");
			_createImageSO(so, $pg, offsetLP, $pg);
		}
		else if(so.type == "文字意見") {
			var offsetLP = DPtoLP({x:parseInt(sod.offset.x) + parseInt(signArea.left), y:parseInt(sod.offset.y) + parseInt(signArea.top)}, "mm");
			// 1100514 Raymond 1100298 新增傳入第5、6參數soBuilder、missSubst, 以支援「修改」他流程之文字意見功能
			//_createTextSO(so, $pg, offsetLP, $pg);
			_createTextSO(so, $pg, offsetLP, $pg, soBuilder, missSubst);
		}
		else {
			theLogger.warn("未支援的簽核物件(" + so.type + ")!");
		}
	}
	// 1100514 Raymond 1100298 新增soBuilder、missSubst參數, 以支援「修改」他流程之文字意見功能
	// 2017.1.17 建立簽核框外物件元素
	//function buildSOTypeB(sod, $pg) {
	function buildSOTypeB(sod, $pg, soBuilder, missSubst) {
		var so = sod.ref || sod;	// 2017.1.25 來文簽辦的簽核物件是直接用原來的so
		if(so.type == "章戳") {
			// 1130605 Raymond 1130120 修正文稿頁面上的簽核框外物件也可套用外部簽核記錄檔所記錄的座標
			// 1060724 Raymond 1060604 修正簽核框外物件亦套用外部簽核記錄檔所記錄的座標
			//if("pos" in so) {
			//	var posLP = DPtoLP(so.pos, "mm");
			if("pos" in sod) {
				var posLP = DPtoLP(sod.pos, "mm");
				_createStampSO(so, $pg, posLP);
			}
			else {	// so沒有pos表示是原封裝檔記錄的簽核物件, 非外部簽核記錄檔的
				var areaLP = DPtoLP(so.content.area, "mm");
				_createStampSO(so, $pg, {x:areaLP.left, y:areaLP.top});
			}
		}
		else if(so.type == "圖檔") {
			// 1130605 Raymond 1130120 修正文稿頁面上的簽核框外物件也可套用外部簽核記錄檔所記錄的座標
			// 1060724 Raymond 1060604 修正簽核框外物件亦套用外部簽核記錄檔所記錄的座標
			//if("pos" in so) {
			//	var posLP = DPtoLP(so.pos, "mm");
			if("pos" in sod) {
				var posLP = DPtoLP(sod.pos, "mm");
				_createImageSO(so, $pg, posLP, $pg);
			}
			else {	// so沒有pos表示是原封裝檔記錄的簽核物件, 非外部簽核記錄檔的
				var areaLP = DPtoLP(so.content.area, "mm");
				_createImageSO(so, $pg, {x:areaLP.left, y:areaLP.top}, $pg);
			}
		}
		else if(so.type == "文字意見") {
			// 1130605 Raymond 1130120 修正文稿頁面上的簽核框外物件也可套用外部簽核記錄檔所記錄的座標
			// 1060724 Raymond 1060604 修正簽核框外物件亦套用外部簽核記錄檔所記錄的座標
			//if("pos" in so)
			//	var posLP = DPtoLP(so.pos, "mm");
			if("pos" in sod)
				var posLP = DPtoLP(sod.pos, "mm");
			else	// so沒有pos表示是原封裝檔記錄的簽核物件, 非外部簽核記錄檔的
				var posLP = DPtoLP(so.content.pos, "mm");
			// 1100514 Raymond 1100298 新增傳入第5、6參數soBuilder、missSubst, 以支援「修改」他流程之文字意見功能
			//_createTextSO(so, $pg, posLP, $pg);
			_createTextSO(so, $pg, posLP, $pg, soBuilder, missSubst);
		}
		else {
			theLogger.warn("未支援的簽核物件(" + so.type + ")!");
		}
	}
	function toSAType(t) {
		var res = t;
		if(t == "群組")
			res = "0";
		else if(t == "角色")
			res = "1";
		else if(t == "單位")
			res = "2";
		else if(t == "覆閱")
			res = "3";
		else if(t == "自訂")	// 1081210 Raymond 1080785 合併內政部單號1070656, 新增"自訂"簽核區域類型
			res = "4";
		return res;
	}
	
	function buildSO($pg, pg, soBuilder, dm) {	// 2017.2.13 新增dm參數
//$("<div style='position:absolute;background-color:yellow;color:blue;left:0mm;top:0mm'>" + pg.container.pageExt.width + "," + pg.container.pageExt.height + "</div>").appendTo($pg);
		theLogger.debug("buildSO($pg: " + $pg.width() + "," + $pg.height() + ")");
		// 2016.9.26 修正, signArea的自動蓋章位置先預設左上角, 以免創稿時無任何簽核物件可計算最左下及最右上位置
		$.each(_memPPD[_currPo.draftIdx].signAreas, function(j, signArea) {
			signArea.mostRightTop = {
				x: 0,
				x2: signArea.left,
				y: 0,
				y2: signArea.top};
			signArea.mostLeftBottom = {
				x: 0,
				x2: signArea.left,
				y: 0,
				y2: signArea.top};
			signArea.nextSignPos = {
				x: 0,
				x2: signArea.left,
				y: 0,
				y2: signArea.top,
				bottomLine: 0,
				rightLine: 0};
		});
		if(!_model.isRefDoc() && (		// 1060803 Raymond 1060579 非歷史檢視
			!dm ||						// 2017.2.13 非文稿
			!dm.dirty() ||				// 2017.2.13 文稿未異動
			(_model.getReserveSO() && 	// 2017.2.13 內容異動時, 依目前保留簽署意見設定值
			//dm.getDocType() != "簽稿會核單" &&	dm.getDocType() != "會辦單"))) {// 2017.2.13 依一代邏輯, 簽稿會核單及會辦單一律不保留
			((dm.getDocType() != "簽稿會核單" && dm.getDocType() != "會辦單") || theSSO.User.EnvSettings.get("WE_ALLOW_CON_KEEP_SIGNOBJ") == "Y")))) {// 1081213 Raymond 1080785 新增的環境變數WE_ALLOW_CON_KEEP_SIGNOBJ可啟用允許簽稿會核單保留異動內容前所新增的簽核物件功能
							
			// 2017.1.7 歷史檢視用目前流程點向前收集歷史流程點的msgId, 顯示簽核物件時以產生點資訊比對是否在允許顯示的msgId集合中才顯示(比照一代邏輯)
			var revs = _model.getSignFolder().getRevisions();
			var cr = _model.getSignFolder().getCurrRevision();
			theLogger.warn("目前檢視流程點為'" + cr + "'");
			var coll = [];
			// 1100512 Raymond 1090821 判斷若是具有單層式文稿頁面的封裝檔, 則忽略顯示外機關流程點的簽核物件(因為也沒有簽核物件)
			var sf = _model.getSignFolder();
			var hasSingleLayerDraft = sf.hasSingleLayerDraft();	// 未傳入指定流程點id參數, 判斷整筆封裝檔是否含有單層式文稿頁面
			for(rev in revs) {	// revs不是陣列, 假設for-loop是照加入順序回傳的名稱
				// 1100512 Raymond 1090821 整筆封裝檔其中有含有單層式文稿頁面的流程點及此流程點為外機關流程點, 忽略之
				if(hasSingleLayerDraft) {
					if(sf.isExorgFlow(rev))
						theLogger.log("忽略顯示外機關流程點'" + rev + "'的簽核物件(應該也不會有)");
					else {
						theLogger.warn("允許本機關流程點'" + rev + "'的簽核物件顯示");
						coll.push(rev.substr(rev.lastIndexOf("_")+1));	// 外呈會公文的本機關流程點Id是sign_機關代碼_msgId而不是sign_msgId, 只切第1個"_"字後會切錯問題
						if(rev == cr)
							break;
					}
				}
				else {
				theLogger.warn("允許'" + rev + "'流程點的簽核物件顯示");
				//coll.push(rev.substr(5));
				coll.push(rev.substr(rev.indexOf("_")+1));	// 2017.3.24 修正草稿時rev是帳號_msgId而不是sign_msgId, 只切第5字後會切錯問題, FDA-序3295
				if(rev == cr)
					break;
				}
			}
			// 1090910 Raymond 1090564 信保特殊模式下的文稿頁面比照附件頁面, 不需要讀取外部簽核記錄檔的座標資訊
			// 2017.1.16 從外部記錄檔取以文稿為基礎的簽核物件
			//if("guid" in pg.container && !!pg.container.guid) {
			if("guid" in pg.container && !!pg.container.guid && _model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2") {
				var d0 = _model.getSignFolder().xSignFolder().getDraft(pg.container.guid);
				if(!!d0) {
					// 1130125 Raymond 1120887 新增若有分會合併的舊文稿ID, 則用舊文稿ID搜尋XSignObjs.xml
					//var d = d0.getVer(pg.container.id);
					var d = d0.getVer(pg.container.dispatchMergedID || pg.container.id);
					if(!!d) {
						var missSubst = [];	// 1100518 Raymond 1100298 新增被取代文字意見尚未隱藏ID陣列
						function doBuildSO(v, cv, showTypeB) {	// 參數1為指定版本, 參數2為目前版本, 參數3為是否顯示框外物件
							// 1130823 Raymond 中榮序214 修正自動增高簽核區域高度或異動內文後, 加蓋貼布物件於前流程點的簽核物件後傳送, 被蓋住的簽核物件會顯示的問題
							if(v.keepSO == "true") {	// 先顯示前面版本的, 簽核物件加入的順序才會由早至晚
								// 1130125 Raymond 1120887 改為重複使用d0
								//theLogger.warn("保留顯示前一版本的簽核物件");
								//var pv = _model.getSignFolder().xSignFolder().getDraft(pg.container.guid).getPrevVer(v.id);
								var pv = d0.getPrevVer(v.id);
								if(!!pv) {
									theLogger.warn("保留顯示前一版本(" + pv.msgId + ")的簽核物件");
									doBuildSO(pv, cv, false);	// 之前版本不要顯示框外物件
								}
							}
							// 1130125 Raymond 1120887 分會流程點可能不保留前一版本的簽核物件, 需再從搜尋前一個分會流程點的保留簽核物件
							else {
								var pv = d0.getPrevDispatchVer(v.id);
								if(!!pv) {
									theLogger.warn("找到前一分會流程點(" + pv.msgId + "), 保留該版本的簽核物件");
									doBuildSO(pv, cv, false);	// 之前版本不要顯示框外物件
								}
							}
							for(var i=0; i<v.xSignObjs.length; i++) {
								var so = v.xSignObjs[i];
								// 1091022 Raymond 1090107 修正比對搬移簽核物件未包括當流程點新增的簽核物件, 導致頁數變化時簽核區域內未顯示之前當流程點加蓋的簽核物件的問題
								//if(coll.indexOf(so.msgId) >= 0) {
								if(coll.indexOf(so.msgId) >= 0 || so.msgId == _model.getMsgId()) {
									if(so.type == "A") {	// 簽核框內物件, 找此頁有無相同TYPE及ID的簽核區域加蓋
										if("signAreas" in _memPPD[_currPo.draftIdx] && _memPPD[_currPo.draftIdx].signAreas.length > 0) {
											for(var j=0; j<_memPPD[_currPo.draftIdx].signAreas.length; j++) {
												var sa = _memPPD[_currPo.draftIdx].signAreas[j];
												if((toSAType(so.saType) == toSAType(sa.saType) || so.saType == "角色") &&	// 2017.2.17 暫時允許之前錯誤設定的'角色'簽核物件可以顯示(航港-序463)
													so.saID == sa.id) {
													if(sa.po == pg.po) {	// 2017.3.24 簽核框位於本頁時, 檢查本流程新增簽核物件是否應由別頁移至此頁, FDA-序3295
														// 2017.2.17 簽稿會核單的簽核區域ID為空, 應為無效區域(記錄外部簽核物件資訊時應記錄成TypeB), 多頁情況下只能改用記錄在封裝檔的簽核物件的物件識別碼來區域是不是同一頁(航港-序461)
														if(so.saID == "") {
															// 1131230 Raymond 1131318 修正XSignObjs.xml有不存在SignWork.xml中的簽核物件時, 會發生Error導致無法關閉公文等問題
															if("ref" in so && !so.ref) {
																theLogger.error("XSignObjs.xml中記錄的'" + so.id + "'簽核物件未記錄在SignWork.xml中, 無法顯示此簽核物件於頁面上");
																if(!!so.id && so.id.match(/X_\d+/)) {
																	theLogger.error("從XSignObjs.xml中移除此ID(" + so.id + ")的簽核物件記錄");
																	v.xSignObjs.splice(i, 1);
																	--i;
																	break;
																}
															}
															else
															if("ref" in so && so.ref.obj == pg.id) {
																theLogger.warn(dm.getDocType() + "例外處理 - 簽核物件(ID:" + so.id + ")位於此頁(#" + pg.po + ")的簽核區域內(Type:" + sa.saType + ",ID:" + sa.id + ")內(offset:" + so.offset.x + "," + so.offset.y + ")");
																// 1100514 Raymond 1100298 新增傳入第4、5參數soBuilder、missSubst, 以支援「修改」他流程之文字意見功能
																//buildSOTypeA(so, sa, $pg);
																buildSOTypeA(so, sa, $pg, soBuilder, missSubst);
															}
														}
														else {	// 2017.3.24 判斷是否為本流程新增簽核物件, 是則檢核是否需跟著簽核區域移動頁次, FDA-序3295
															// 1131230 Raymond 1131318 修正XSignObjs.xml有不存在SignWork.xml中的簽核物件時, 會發生Error導致無法關閉公文等問題
															if("ref" in so && !so.ref) {
																theLogger.error("XSignObjs.xml中記錄的'" + so.id + "'簽核物件未記錄在SignWork.xml中, 無法顯示此簽核物件於頁面上");
																if(!!so.id && so.id.match(/X_\d+/)) {
																	theLogger.error("從XSignObjs.xml中移除此ID(" + so.id + ")的簽核物件記錄");
																	v.xSignObjs.splice(i, 1);
																	--i;
																	break;
																}
															}
															else
															if("ref" in so && (so.ref.sessionNew || so.ref.type.match(/^stamp/) || so.ref.type == "text" || so.ref.type == "sketch")) {
																if(so.ref.boundTo != pg) {	// 此簽核物件原來在別頁
																	theLogger.warn("本流程新增的框內簽核物件(ID:" + so.ref.id + ")從頁#" + so.ref.boundTo.po + "移至此頁(#" + pg.po + ")");
																	var srcPg = so.ref.boundTo;
																	so.ref.boundTo = pg;
																	pg.newSignObjs.push(so.ref);	// 改移至此頁
																	var soInNSOs = srcPg.newSignObjs.indexOf(so.ref);
																	try {
																		srcPg.newSignObjs.splice(soInNSOs, 1);
																	}
																	catch(e) {
																		theLogger.error("應移動的簽核物件位於#" + srcPg.po + "頁的第" + soInNSOs + "個索引位置, 但splice()失敗! " + e.message);
																	}
																}
																else
																	theLogger.warn("本流程新增的框內簽核物件(ID:" + so.ref.id + ")位於此頁");
															}
															else {
																theLogger.warn("簽核物件(ID:" + so.id + ")位於此頁(#" + pg.po + ")的簽核區域內(Type:" + sa.saType + ",ID:" + sa.id + ")內(offset:" + so.offset.x + "," + so.offset.y + ")");
																// 1100514 Raymond 1100298 新增傳入第4、5參數soBuilder、missSubst, 以支援「修改」他流程之文字意見功能
																//buildSOTypeA(so, sa, $pg);
																buildSOTypeA(so, sa, $pg, soBuilder, missSubst);
															}
														}
													}
													else {	// 2017.3.24 簽核區域位於別頁, 檢核本流程新增的簽核物件是否應由此頁移至簽核框所在頁次, FDA-序3295
														// 1131230 Raymond 1131318 修正XSignObjs.xml有不存在SignWork.xml中的簽核物件時, 會發生Error導致無法關閉公文等問題
														if("ref" in so && !so.ref) {
															theLogger.error("XSignObjs.xml中記錄的'" + so.id + "'簽核物件未記錄在SignWork.xml中, 無法顯示此簽核物件於頁面上");
															if(!!so.id && so.id.match(/X_\d+/)) {
																theLogger.error("從XSignObjs.xml中移除此ID(" + so.id + ")的簽核物件記錄");
																v.xSignObjs.splice(i, 1);
																--i;
																break;
															}
														}
														else
														if("ref" in so && (so.ref.sessionNew || so.ref.type.match(/^stamp/) || so.ref.type == "text" || so.ref.type == "sketch")) {
															if(sa.po < pg.container.draftPages.pages.length) {
																var toPg = pg.container.draftPages.pages[sa.po];
																if(so.ref.boundTo != toPg) {
																	theLogger.warn("本流程新增的框內簽核物件(ID:" + so.ref.id + ")從此頁(#" + pg.po + ")移至#" + sa.po);
																	// 1091022 Raymond 1090107 修正非本頁之簽核區域發生頁次異動情形時, 應從非本頁的newSignObjs搬移so.ref至簽核區域所在頁次
																	//so.ref.boundTo = toPg;
																	//toPg.newSignObjs.push(so.ref);
																	//var soInNSOs = pg.newSignObjs.indexOf(so.ref);
																	var soIdxInOrigPg = so.ref.boundTo.newSignObjs.indexOf(so.ref);
																	try {
																		//pg.newSignObjs.splice(soInNSOs, 1);
																		toPg.newSignObjs.push(so.ref.boundTo.newSignObjs.splice(soIdxInOrigPg, 1)[0]);
																		so.ref.boundTo = toPg;
																	}
																	catch(e) {
																		//theLogger.error("應移動的簽核物件位於本頁的第" + soInNSOs + "個索引位置, 但splice()失敗! " + e.message);
																		theLogger.error("應移動的簽核物件位於本頁的第" + soIdxInOrigPg + "個索引位置, 但搬移失敗! " + e.message);
																	}
																}
																else
																	theLogger.warn("本流程新增的框內簽核物件(ID:" + so.ref.id + ")已移至#" + sa.po);
															}
															else {
																theLogger.error("簽核框頁次超過此文稿總頁數, 無法將簽核物件(ID:" + so.ref.id + ")移至簽核框所在頁次#" + sa.po);
															}
														}
													}
													break;	// break for-j-loop
												}
											}
										}
										else {// 調閱非動態產生文稿頁面, 無signAreas, 要改從外部簽核物件記錄檔的目前版本記錄中讀取
											for(var j=0; j<cv.xSignAreas.length; j++) {
												var sa = cv.xSignAreas[j];
												if(toSAType(so.saType) == toSAType(sa.saType) &&
													so.saID == sa.saID && sa.pgIdx == pg.po) {	// 目前版本的簽框區域位於此頁
													theLogger.warn("簽核物件(ID:" + so.id + ")位於此頁(pgId:" + pg.id + ")的簽核區域(saType:" + sa.saType + ", saID:" + sa.saID + ")內");
													// 1100514 Raymond 1100298 新增傳入第4、5參數soBuilder、missSubst, 以支援「修改」他流程之文字意見功能
													//buildSOTypeA2(so, sa, $pg);
													buildSOTypeA2(so, sa, $pg, soBuilder, missSubst);
												}
											}
										}
									}
									else if(so.type == "B" && showTypeB) {	// 簽核框外物件, 且為當前版本時, 找此簽核物件所在頁次相符即顯示
										if(pg.po == so.pgIdx) {
											if(pg.container.dirty())
												theLogger.warn("簽核區域外簽核物件(ID:" + so.id + ")位於此頁(po:" + pg.po + "), 由於文稿內容已異動故不顯示");
											else {
												theLogger.warn("簽核物件(ID:" + so.id + ")位於此頁(po:" + pg.po + ")");
												// 1100514 Raymond 1100298 新增傳入第3、4參數soBuilder、missSubst, 以支援「修改」他流程之文字意見功能
												//buildSOTypeB(so, $pg);
												buildSOTypeB(so, $pg, soBuilder, missSubst);
											}
										}
									}
								}
								else
									theLogger.warn("目前流程點不需顯示'" + so.msgId + "'產生的簽核物件(ID:" + so.id + ")");
							}
						};
						doBuildSO(d, d, true);	// 目前版本要顯示框外物件
						// 1100518 Raymond 1100298 for test
						if(missSubst.length > 0) {
							theLogger.error("尚餘" + missSubst.length + "文字意見設定被取代尚未隱藏: " + missSubst.join("、"));
						}
					}
					else {
						theLogger.error("外部簽核物件記錄檔找不到GUID:" + pg.container.guid + "的文稿記錄");
					}
				}
				else {
					if("attType" in pg.container) {	// 2017.1.24 附件頁面不會有簽核區域, 一律以框外物件視之
						$.each(pg.signObjs, function(i, so) {
							buildSOTypeB(so, $pg);
						});
					}
					// 1090910 Raymond 1090564 信保特殊模式
					else if(_model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
						$.each(pg.signObjs, function(i, so) {
							buildSOTypeB(so, $pg);
						});
					}
					else
						theLogger.error("找不到GUID:" + pg.container.guid + "的文稿, 無法顯示簽核物件");
				}
			}
			else {
				if("fromType" in pg.container ||		// 2017.1.24 來文及來文附件頁面不會有簽核區域, 一律以框外物件視之
					"attType" in pg.container ||
					pg.container.name == "來文簽辦") {	// 2017.1.25 來文簽辦沒有GUID, 且一律以框外物件視之
					$.each(pg.signObjs, function(i, so) {
						buildSOTypeB(so, $pg);
					});
				}
				// 1090910 Raymond 1090564 信保特殊模式
				else if(_model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
					$.each(pg.signObjs, function(i, so) {
						buildSOTypeB(so, $pg);
					});
				}
				else if("comOrgNo" in pg.container) {	// 1100512 Raymond 1090821 外會公文的文稿無簽核物件可顯示
					theLogger.log("外機關(" + pg.container.comOrgNo + ", " + pg.container.comOrgName + ")文稿無簽核物件可顯示");
				}
				else
					theLogger.error("文稿無GUID, 無法顯示簽核物件");
			}
		}
		//if("signObjs" in pg) {
		if(_model.isRefDoc()) {	// 1060803 Raymond 1060579 歷史檢視
			// 先建立已存在封裝檔的簽核物件
			// 2015.4.14 加入新增的保留簽署意見reservedSO
			var existingSO = pg.signObjs;
			// 1060803 Raymond 1050579 reservedSO改到draftPages層, 因為前版本間須保留顯示的簽核物件可能需出現在目前版本的不同頁次
			//if("reservedSO" in pg)
			//	existingSO = pg.signObjs.concat(pg.reservedSO);
			if("draftPages" in pg.container && "reservedSO" in pg.container.draftPages)
				// 1130826 Raymond 中榮序214 修正歷史檢視時, 保留顯示的簽核物件沒有從舊到新排序, 導致需要重疊顯示(ex.貼布)的物件未遮住下面物件的問題
				//existingSO = pg.signObjs.concat(pg.container.draftPages.reservedSO);
				existingSO = [...pg.container.draftPages.reservedSO, ...pg.signObjs];
			var missSubst = [];	// 1100518 Raymond 1100298 新增被取代文字意見尚未隱藏ID陣列
			$.each(existingSO, function(i, so) {
				theLogger.log("封裝檔已存在的簽核物件 - #" + (i+1));
				theLogger.log(so);
				
				// 1100930 Raymond 1101137 搜尋XSignObjs.xml中的記錄的簽核物件的取代物件ID
				var xsos = _model.getSignFolder().xSignFolder().findSignObjById(so.id);	// findSignObjById回傳的是陣列
				if(xsos.length > 0) {
					var xso = xsos[0];
					if(!!xso.ref && !!xso.ref.substObjId && !so.substObjId) {
						theLogger.log("設定簽核物件(ID:" + so.id + ")的取代物件ID為'" + xso.ref.substObjId + "'");
						so.substObjId = xso.ref.substObjId;
					}
				}
				
				var fixedPos = null;	// 1060803 Raymond 1060579 用來修正簽核物件的顯示座標
				if(so.type == "章戳") {
					theLogger.log("章戳位置:" + (so.content.area.left * pg.container.pageExt.width / 2480) + "," + (so.content.area.top * pg.container.pageExt.height / 3507) + "," + (so.content.area.right * pg.container.pageExt.width / 2480) + "," + (so.content.area.bottom * pg.container.pageExt.height / 3507) + "(" + so.content.area.left + "," + so.content.area.top + "," + so.content.area.right + "," + so.content.area.bottom + ")");
					
					var skipAppend = false, $img;
					// 2015.5.7 判斷簽核物件是否屬於簽核區域內
					if("saType" in so) {
						// 1060803 Raymond 1060579 歷史檢視沒有動態計算的signArea, 改用AOLProcessData.xml中所記錄的, 若簽核框內物件在此頁找不到所屬的簽核區域則不顯示
						var saFound = false;
						$.each(pg.saInAPD, function(j, signArea) {
							if(so.saID == signArea.id) {
								theLogger.log("\t框內簽核物件(" + so.type + ", id:" + so.id + ")屬於此頁的簽核區域(ID:" + signArea.id + ")");
								// 用歷史版本的簽核區域的相對位置計算出目前版本的絕對位置來修正簽核物件的顯示座標
								var x = signArea.left + so.offset.x,
									y = signArea.top + so.offset.y;
								fixedPos = DPtoLP({x: x, y: y}, "mm");
								theLogger.log("絕對座標從(" + so.content.area.left + "," + so.content.area.top + ")修正為(" + x + "," + y + ")");
								saFound = true;
								return false;
							}
						});
						if(!saFound) {
							theLogger.log("\t框內簽核物件(" + so.type + ", id:" + so.id + ")在此頁找不到所屬簽核區域, 不顯示");
							skipAppend = true;
						}
						
						// 1060808 Raymond 1060579 歷史檢視不會動態計算signArea, 不需要這段
						/*$.each(_memPPD[_currPo.draftIdx].signAreas, function(j, signArea) {
							// 簽核物件記錄所屬的簽核區域類型, 不應該在不同文稿版本間不同, 例如：101版為群組, 110版改為角色
							if(((so.saType == "群組" || so.saType == "0") && signArea.saType == "0") ||
								((so.saType == "角色" || so.saType == "1") && signArea.saType == "1") ||
								((so.saType == "單位" || so.saType == "2") && signArea.saType == "2") ||
								((so.saType == "覆閱" || so.saType == "3") && signArea.saType == "3")) {	// 2017.1.5 fix 補上type=2及type=3條件
								
								if(so.saID == signArea.id) {
									theLogger.log("\tsignArea['" + signArea.id + "']: 章戳(id:" + so.id + ")位於相對位置=" + so.offset.x + "," + so.offset.y);
									var areaLP = DPtoLP(so.content.area, "mm");
									var w = areaLP.right - areaLP.left,
										h = areaLP.bottom - areaLP.top;
									var offsetLP = DPtoLP(so.offset, "mm");
									$img = $("<div class='sign-obj so-stamp' data-id='" + so.id + "' title='" + _makeSOInfo(so) + "'><img/></div>").appendTo(signArea.$area).css({
											position: "absolute",
											left: offsetLP.x + "mm",
											top: offsetLP.y + "mm"})
										.find("img").css({
											width: w + "mm",
											height: h + "mm"});
									var pgOff = $pg.offset();	// 2015.10.12 改用saOff - pgOff來決定簽核區域絕對位置
									var saOff = signArea.$area.offset();
//									var saPos = signArea.$area.parent().position();	// 因為td改成relative, 影響了$area的position(), 故相對位置改用parent()的td的position()
//									theLogger.log("saOff.top: " + saOff.top + ", saPos.top:" + saPos.top + ", so.offset.y:" + so.offset.y + ", so.height=" + (Number(so.content.area.bottom) - Number(so.content.area.top)) + ", $pg.height=" + $pg.height());
									theLogger.log("saOff.top: " + saOff.top + ", pgOff.top:" + pgOff.top + ", so.offset.y:" + so.offset.y + ", so.height=" + (Number(so.content.area.bottom) - Number(so.content.area.top)) + ", $pg.height=" + $pg.height());
									//signArea.lastSignetBottom = Math.max(signArea.lastSignetBottom || 0, (so.content.area.bottom || so.content.area.top + so.content.area.height) * $pg.height() / 3507);
//									signArea.lastSignetBottom = Math.max(signArea.lastSignetBottom || 0, saPos.top + ((so.offset.y + Number(so.content.area.bottom) - Number(so.content.area.top)) * $pg.height() / 3507));
//									signArea.lastSignetBottomABS = Math.max(signArea.lastSignetBottomABS || 0, so.content.area.bottom * pg.container.pageExt.height / 3507);	// 2015.6.16 新增絕對座標, 因簽核區域與桌機位置有誤差, 只以相對座標回算封裝檔應記錄的全頁座標會不準
									//signArea.lastSignetBottom = Math.max(signArea.lastSignetBottom || 0, (so.offset.y + Number(so.content.area.bottom) - Number(so.content.area.top)) * $pg.height() / 3507);
									//signArea.lastSignetBottomABS = Math.max(signArea.lastSignetBottomABS || 0, (saOff.top - pgOff.top) + ((so.offset.y + Number(so.content.area.bottom) - Number(so.content.area.top)) * $pg.height() / 3507));	// 2015.10.12 FIX
									//theLogger.log("signArea.lastSignetBottom: " + signArea.lastSignetBottom + ", lastSignetBottomABS: " + signArea.lastSignetBottomABS);
									// 2016.9.30 改成抓最右上及最左下座標, 給自動蓋章使用
									if("mostRightTop" in signArea) {
										signArea.mostRightTop.x = Math.max(signArea.mostRightTop.x || 0, (so.offset.x + (parseInt(so.content.area.width) || parseInt(so.content.area.right) - parseInt(so.content.area.left))) * pg.container.pageExt.width / 2480);
										signArea.mostRightTop.x2 = Math.max(signArea.mostRightTop.x2 || 0, parseInt(so.content.area.right) * pg.container.pageExt.width / 2480);
										//signArea.mostRightTop.y = 0;
										//signArea.mostRightTop.y2 = parseInt(signArea.top) * pg.container.pageExt.height / 3507;
										theLogger.log("signArea.mostRightTop: x:" + signArea.mostRightTop.x + ", x2: " + signArea.mostRightTop.x2 + ", y:" + signArea.mostRightTop.y + ", y2:" + signArea.mostRightTop.y2);
									}
									
									if("mostLeftBottom" in signArea) {
										//signArea.mostLeftBottom.x = 0;
										//signArea.mostLeftBottom.x2 = parseInt(signArea.left) * pg.container.pageExt.width / 2480;
										signArea.mostLeftBottom.y = Math.max(signArea.mostLeftBottom.y || 0, (so.offset.y + (parseInt(so.content.area.height) || parseInt(so.content.area.bottom) - parseInt(so.content.area.top))) * pg.container.pageExt.height / 3507);
										signArea.mostLeftBottom.y2 = Math.max(signArea.mostLeftBottom.y2 || 0, parseInt(so.content.area.bottom) * pg.container.pageExt.height / 3507);
										theLogger.log("signArea.mostLeftBottom: x:" + signArea.mostLeftBottom.x + ", x2: " + signArea.mostLeftBottom.x2 + ", y:" + signArea.mostLeftBottom.y + ", y2:" + signArea.mostLeftBottom.y2);
									}
									
									if("nextSignPos" in signArea) {
										signArea.nextSignPos.lastStamp = so.id;	// 2016.10.26 標記簽核區域內有職名章
										if(signArea.dir == 1) {	// 由左至右
											if(so.offset.y > signArea.nextSignPos.bottomLine) {	// 換行
												signArea.nextSignPos.x = (so.offset.x + (parseInt(so.content.area.width) || parseInt(so.content.area.right) - parseInt(so.content.area.left))) * pg.container.pageExt.width / 2480;
												signArea.nextSignPos.x2 = parseInt(so.content.area.right) * pg.container.pageExt.width / 2480;
												signArea.nextSignPos.y = so.offset.y * pg.container.pageExt.height / 3507;
												signArea.nextSignPos.y2 = parseInt(so.content.area.top) * pg.container.pageExt.height / 3507;
												signArea.nextSignPos.bottomLine = so.offset.y + (parseInt(so.content.area.height) || parseInt(so.content.area.bottom) - parseInt(so.content.area.top));
											}
											else {
												signArea.nextSignPos.x = Math.max(signArea.nextSignPos.x || 0, (so.offset.x + (parseInt(so.content.area.width) || parseInt(so.content.area.right) - parseInt(so.content.area.left))) * pg.container.pageExt.width / 2480);
												signArea.nextSignPos.x2 = Math.max(signArea.nextSignPos.x2 || 0, parseInt(so.content.area.right) * pg.container.pageExt.width / 2480);
												//signArea.nextSignPos.y = Math.max(signArea.nextSignPos.y || 0, (so.offset.y + (parseInt(so.content.area.height) || parseInt(so.content.area.bottom) - parseInt(so.content.area.top))) * pg.container.pageExt.height / 3507);
												//signArea.nextSignPos.y2 = Math.max(signArea.nextSignPos.y2 || 0, parseInt(so.content.area.bottom) * pg.container.pageExt.height / 3507);
												signArea.nextSignPos.bottomLine = Math.max(signArea.nextSignPos.bottomLine, so.offset.y + (parseInt(so.content.area.height) || parseInt(so.content.area.bottom) - parseInt(so.content.area.top)));
											}
											theLogger.log("signArea.nextSignPos: x:" + signArea.nextSignPos.x + ", x2: " + signArea.nextSignPos.x2 + ", y:" + signArea.nextSignPos.y + ", y2:" + signArea.nextSignPos.y2 + ", bottomLine:" + signArea.nextSignPos.bottomLine);
										}
										else {	// 由上至下
											if(so.offset.x > signArea.nextSignPos.rightLine) {	// 換行
												signArea.nextSignPos.x = so.offset.x * pg.container.pageExt.width / 2480;
												signArea.nextSignPos.x2 = parseInt(so.content.area.left) * pg.container.pageExt.width / 2480;
												signArea.nextSignPos.y = (so.offset.y + (parseInt(so.content.area.height) || parseInt(so.content.area.bottom) - parseInt(so.content.area.top))) * pg.container.pageExt.height / 3507;
												signArea.nextSignPos.y2 = parseInt(so.content.area.bottom) * pg.container.pageExt.height / 3507;
												signArea.nextSignPos.rightLine = so.offset.x + (parseInt(so.content.area.width) || parseInt(so.content.area.right) - parseInt(so.content.area.left));
											}
											else {
												//signArea.nextSignPos.x = Math.max(signArea.nextSignPos.x || 0, (so.offset.x + (parseInt(so.content.area.width) || parseInt(so.content.area.right) - parseInt(so.content.area.left))) * pg.container.pageExt.width / 2480);
												//signArea.nextSignPos.x2 = Math.max(signArea.nextSignPos.x2 || 0, parseInt(so.content.area.right) * pg.container.pageExt.width / 2480);
												signArea.nextSignPos.y = Math.max(signArea.nextSignPos.y || 0, (so.offset.y + (parseInt(so.content.area.height) || parseInt(so.content.area.bottom) - parseInt(so.content.area.top))) * pg.container.pageExt.height / 3507);
												signArea.nextSignPos.y2 = Math.max(signArea.nextSignPos.y2 || 0, parseInt(so.content.area.bottom) * pg.container.pageExt.height / 3507);
												signArea.nextSignPos.rightLine = Math.max(signArea.nextSignPos.rightLine, so.offset.x + (parseInt(so.content.area.width) || parseInt(so.content.area.right) - parseInt(so.content.area.left)));
											}
											theLogger.log("signArea.nextSignPos: x:" + signArea.nextSignPos.x + ", x2: " + signArea.nextSignPos.x2 + ", y:" + signArea.nextSignPos.y + ", y2:" + signArea.nextSignPos.y2 + ", rightLine:" + signArea.nextSignPos.rightLine);
										}
									}
									skipAppend = true;
									return false;
								}
							}
						});
						if(!skipAppend)
							theLogger.warn(so.type + "(ID:" + so.id + ")找不到符合的簽核區域");*/
					}
					else if(false) {	// 2016.12.2 quickfix, 判斷文字意見是否在簽核框內的邏輯有誤, 未區分頁次! 先不要主動判斷文字意見簽核物件是否位於簽核區域內, 以免與簽核框不同頁次但判斷為屬於框內的的簽核物件顯示不出來
						// 判斷是否在簽核區域中
						if(_memPPD[_currPo.draftIdx] && _memPPD[_currPo.draftIdx].signAreas) {	// 2016.1.15 新增判斷文稿是否有簽核區域
							$.each(_memPPD[_currPo.draftIdx].signAreas, function(j, signArea) {
								theLogger.log("\tsignArea[" + j + "]: pos=" + signArea.$area.position().left + "," + signArea.$area.position().top + " size=" + signArea.$area.width() + "," + signArea.$area.height());
								if("width" in so.content.area)
									var dp = {x:(parseInt(so.content.area.left) + parseInt(so.content.area.width) / 2) * $pg.width() / 2480, y:(parseInt(so.content.area.top) + parseInt(so.content.area.height) / 2) * $pg.height() / 3507};
								else
									var dp = {x:((parseInt(so.content.area.left) + parseInt(so.content.area.right)) / 2) * $pg.width() / 2480, y:((parseInt(so.content.area.top) + parseInt(so.content.area.bottom)) / 2) * $pg.height() / 3507};
								theLogger.log("\t章戳(id:" + so.id + ") x:" + dp.x + ", y:" + dp.y + (PtInArea(dp, signArea)?"  在簽核區域內":""));
								if(PtInArea(dp, signArea)) {
									//signArea.lastSignetBottom = Math.max(signArea.lastSignetBottom || 0, (parseInt(so.content.area.bottom) || parseInt(so.content.area.top) + parseInt(so.content.area.height)) * $pg.height() / 3507 - signArea.top);	// 2016.8.24 signetBottom是相對於簽核區的座標值, 因為so.content.bottom是絕對座標值, 所以要減去signArea.top
									//signArea.lastSignetBottomABS = Math.max(signArea.lastSignetBottomABS || 0, parseInt(so.content.area.bottom) * pg.container.pageExt.height / 3507);	// 2015.6.16 新增絕對座標, 因簽核區域與桌機位置有誤差, 只以相對座標回算封裝檔應記錄的全頁座標會不準
									//theLogger.log("signArea.lastSignetBottom: " + signArea.lastSignetBottom + ", lastSignetBottomABS: " + signArea.lastSignetBottomABS);
									
									so.saType = signArea.saType;
									so.saID = signArea.id;
									so.offset = {x: parseInt(so.content.area.left) - Math.ceil(signArea.left * 2480 / $pg.width()), y: parseInt(so.content.area.top) - Math.ceil(signArea.top * 3507 / $pg.height())};
									var areaLP = DPtoLP(so.content.area, "mm");
									var w = areaLP.right - areaLP.left,
										h = areaLP.bottom - areaLP.top;
									var offsetLP = DPtoLP(so.offset, "mm");
									$img = $("<div class='sign-obj so-stamp' data-id='" + so.id + "' title='" + _makeSOInfo(so) + "'><img/></div>").appendTo(signArea.$area).css({
											position: "absolute",
											left: offsetLP.x + "mm",
											top: offsetLP.y + "mm"})
										.find("img").css({
											width: w + "mm",
											height: h + "mm"});
									skipAppend = true;
									
									// 2016.9.23 改成抓最右上及最左下座標, 給自動蓋章使用
									if("mostRightTop" in signArea) {
										signArea.mostRightTop.x = Math.max(signArea.mostRightTop.x || 0, (parseInt(so.content.area.right) || parseInt(so.content.area.left) + parseInt(so.content.area.width)) * $pg.width() / 2480 - signArea.left);
										signArea.mostRightTop.x2 = Math.max(signArea.mostRightTop.x2 || 0, parseInt(so.content.area.right) * pg.container.pageExt.width / 2480);
										//signArea.mostRightTop.y = 0;
										//signArea.mostRightTop.y2 = parseInt(signArea.top) * pg.container.pageExt.height / 3507;
										theLogger.log("signArea.mostRightTop: x:" + signArea.mostRightTop.x + ", x2: " + signArea.mostRightTop.x2 + ", y:" + signArea.mostRightTop.y + ", y2:" + signArea.mostRightTop.y2);
									}
									
									if("mostLeftBottom" in signArea) {
										//signArea.mostLeftBottom.x = 0;
										//signArea.mostLeftBottom.x2 = parseInt(signArea.left) * pg.container.pageExt.width / 2480;
										signArea.mostLeftBottom.y = Math.max(signArea.mostLeftBottom.y || 0, (parseInt(so.content.area.bottom) || parseInt(so.content.area.top) + parseInt(so.content.area.height)) * $pg.height() / 3507 - signArea.top);
										signArea.mostLeftBottom.y2 = Math.max(signArea.mostLeftBottom.y2 || 0, parseInt(so.content.area.bottom) * pg.container.pageExt.height / 3507);
										theLogger.log("signArea.mostLeftBottom: x:" + signArea.mostLeftBottom.x + ", x2: " + signArea.mostLeftBottom.x2 + ", y:" + signArea.mostLeftBottom.y + ", y2:" + signArea.mostLeftBottom.y2);
									}
									
									if("nextSignPos" in signArea) {
										signArea.nextSignPos.lastStamp = so.id;	// 2016.10.26 標記簽核區域內有職名章
										if(signArea.dir == 1) {	// 由左至右
											if(so.offset.y > signArea.nextSignPos.bottomLine) {	// 換行
												signArea.nextSignPos.x = (so.offset.x + (parseInt(so.content.area.width) || parseInt(so.content.area.right) - parseInt(so.content.area.left))) * pg.container.pageExt.width / 2480;
												signArea.nextSignPos.x2 = parseInt(so.content.area.right) * pg.container.pageExt.width / 2480;
												signArea.nextSignPos.y = so.offset.y * pg.container.pageExt.height / 3507;
												signArea.nextSignPos.y2 = parseInt(so.content.area.top) * pg.container.pageExt.height / 3507;
												signArea.nextSignPos.bottomLine = so.offset.y + (parseInt(so.content.area.height) || parseInt(so.content.area.bottom) - parseInt(so.content.area.top));
											}
											else {
												signArea.nextSignPos.x = Math.max(signArea.nextSignPos.x || 0, (so.offset.x + (parseInt(so.content.area.width) || parseInt(so.content.area.right) - parseInt(so.content.area.left))) * pg.container.pageExt.width / 2480);
												signArea.nextSignPos.x2 = Math.max(signArea.nextSignPos.x2 || 0, parseInt(so.content.area.right) * pg.container.pageExt.width / 2480);
												//signArea.nextSignPos.y = Math.max(signArea.nextSignPos.y || 0, (so.offset.y + (parseInt(so.content.area.height) || parseInt(so.content.area.bottom) - parseInt(so.content.area.top))) * pg.container.pageExt.height / 3507);
												//signArea.nextSignPos.y2 = Math.max(signArea.nextSignPos.y2 || 0, parseInt(so.content.area.bottom) * pg.container.pageExt.height / 3507);
												signArea.nextSignPos.bottomLine = Math.max(signArea.nextSignPos.bottomLine, so.offset.y + (parseInt(so.content.area.height) || parseInt(so.content.area.bottom) - parseInt(so.content.area.top)));
											}
											theLogger.log("signArea.nextSignPos: x:" + signArea.nextSignPos.x + ", x2: " + signArea.nextSignPos.x2 + ", y:" + signArea.nextSignPos.y + ", y2:" + signArea.nextSignPos.y2 + ", bottomLine:" + signArea.nextSignPos.bottomLine);
										}
										else {	// 由上至下
											if(so.offset.x > signArea.nextSignPos.rightLine) {	// 換行
												signArea.nextSignPos.x = so.offset.x * pg.container.pageExt.width / 2480;
												signArea.nextSignPos.x2 = parseInt(so.content.area.left) * pg.container.pageExt.width / 2480;
												signArea.nextSignPos.y = (so.offset.y + (parseInt(so.content.area.height) || parseInt(so.content.area.bottom) - parseInt(so.content.area.top))) * pg.container.pageExt.height / 3507;
												signArea.nextSignPos.y2 = parseInt(so.content.area.bottom) * pg.container.pageExt.height / 3507;
												signArea.nextSignPos.rightLine = so.offset.x + (parseInt(so.content.area.width) || parseInt(so.content.area.right) - parseInt(so.content.area.left));
											}
											else {
												//signArea.nextSignPos.x = Math.max(signArea.nextSignPos.x || 0, (so.offset.x + (parseInt(so.content.area.width) || parseInt(so.content.area.right) - parseInt(so.content.area.left))) * pg.container.pageExt.width / 2480);
												//signArea.nextSignPos.x2 = Math.max(signArea.nextSignPos.x2 || 0, parseInt(so.content.area.right) * pg.container.pageExt.width / 2480);
												signArea.nextSignPos.y = Math.max(signArea.nextSignPos.y || 0, (so.offset.y + (parseInt(so.content.area.height) || parseInt(so.content.area.bottom) - parseInt(so.content.area.top))) * pg.container.pageExt.height / 3507);
												signArea.nextSignPos.y2 = Math.max(signArea.nextSignPos.y2 || 0, parseInt(so.content.area.bottom) * pg.container.pageExt.height / 3507);
												signArea.nextSignPos.rightLine = Math.max(signArea.nextSignPos.rightLine, so.offset.x + (parseInt(so.content.area.width) || parseInt(so.content.area.right) - parseInt(so.content.area.left)));
											}
											theLogger.log("signArea.nextSignPos: x:" + signArea.nextSignPos.x + ", x2: " + signArea.nextSignPos.x2 + ", y:" + signArea.nextSignPos.y + ", y2:" + signArea.nextSignPos.y2 + ", rightLine:" + signArea.nextSignPos.rightLine);
										}
									}
								}
							});
						}
					}
					
					var areaLP = DPtoLP(so.content.area, "mm");   // 先將座標值轉成邏輯座標
					var w = areaLP.right - areaLP.left,
						h = areaLP.bottom - areaLP.top;
					// 1130605 Raymond 1130120 修正文稿頁面上的簽核框外物件也可套用外部簽核記錄檔所記錄的座標
					if(!fixedPos && !!xso && "pos" in xso)
						fixedPos = DPtoLP(xso.pos, "mm");
					if(!skipAppend) {
						$img = $("<div class='sign-obj so-stamp' data-id='" + so.id + "' title='" + _makeSOInfo(so) + "'><img/></div>").appendTo($pg).css({
									position: "absolute",
									//left: areaLP.left + "mm",							// 1060803 Raymond 1060579 用修正後的絕對座標取代簽核物件原來版本中記錄的座標
									left: ((!!fixedPos)?fixedPos.x:areaLP.left) + "mm",	// 1060803 Raymond 1060579 用修正後的絕對座標取代簽核物件原來版本中記錄的座標
									//top: areaLP.top + "mm"})							// 1060803 Raymond 1060579 用修正後的絕對座標取代簽核物件原來版本中記錄的座標
									top: ((!!fixedPos)?fixedPos.y:areaLP.top) + "mm"})	// 1060803 Raymond 1060579 用修正後的絕對座標取代簽核物件原來版本中記錄的座標
								.find("img").css({
									width: w + "mm",
									height: h + "mm"});
//$img.before("<div style='position:absolute;background-color:yellow;color:blue;left:0mm;top:-5mm'>" + so.content.area.left + "," + so.content.area.top + "/" + (so.content.area.left * pg.container.pageExt.width / 2480) + "," + (so.content.area.top * pg.container.pageExt.height / 3507) + "/" + Math.ceil(areaLP.left) + "," + Math.ceil(areaLP.top) + "</div>");
					//}	1060803 Raymond 1060579 保留的簽核物件改至draftPages層, 故目前頁可能有不顯示的簽核物件, 會顯示的一律以skipAppend為false產生, 故後續時戳等處理應包在!skipAppend條件式下
					
					if(so.content.dispTime) {
						var timeStr = so.time;
						// 1100719 Raymond 1100854 支援[高大客製化]章戳簽核物件的日期包含年月日時分秒功能
						if(so.time.length == 13) {
							if(theSSO.User.EnvSettings.get('AOL_SIGNET_TIMESTAMP_SHOW_YEAR') == 'Y')
								timeStr = so.time.substr(0, 3) + "<br>" + so.time.substr(3, 4) + "<br>" + so.time.substr(7, 4);
							else
								timeStr = so.time.substr(3, 4) + "<br>" + so.time.substr(7, 4);
						}
						else
						if(so.time.length == 11) {    // 11碼是包含年份
							if(theSSO.User.EnvSettings.get('AOL_SIGNET_TIMESTAMP_SHOW_YEAR') == 'Y')
								timeStr = so.time.substr(0, 3) + "<br>" + so.time.substr(3, 4) + "<br>" + so.time.substr(7);
							else
								timeStr = so.time.substr(3, 4) + "<br>" + so.time.substr(7);
						}
						else if(so.time.length == 8)// 8碼不包含年份
							timeStr = so.time.substr(0, 4) + "<br>" + so.time.substr(4);
						var $div = $("<div style='display:inline-block; overflow:hidden; text-align:center; color:black'>" + timeStr + "</div>").insertAfter($img);
						// 封裝檔記錄的章戳寬度是包含顯示時戳的寬度, 時戳寬度固定為章戳高度, 也就是時戳是一個正方形
						$img.css("width", (w - h) + "mm");
						// 計算正方形內可佔滿顯示的適合字型大小
						// 正確算法是 h * 300 / 25.4 / 10(magic number?)
						var fontHeight = h * 30 / 25.4;
						if(theSSO.User.EnvSettings.get('AOL_SIGNET_TIMESTAMP_SHOW_YEAR') == 'Y')
							fontHeight = h * 300 / 25.4 / 12;
						$div.css("font-size", Math.floor(fontHeight) + "pt");
						// 1061018 Raymond 1060930 修正時戳顯示年時年超出職名章高度問題
						if(theSSO.User.EnvSettings.get('AOL_SIGNET_TIMESTAMP_SHOW_YEAR') == 'Y')
							$div.css("line-height", "1");
						// 1120620 Raymond 標檢局序86 修正職名章高度設定小於7.7mm時, 時戳字型大小計算會得出小於9的大小, 但瀏覽器最小只能顯示9pt的字, 故要再用縮小行高來調整
						else {
							if(fontHeight < 9) {	// 字型小於9pt
								var pxh = (so.content.area.bottom - so.content.area.top) * 96 / 300;	// 職名章高度實際px
								var lh = (pxh + 2) / 24;	// 9pt單行高度12px, 2行24px, 職章高度若小於24px, 會使計算行高小於1, 但時戳第2行下方其實還有一點空間, 故再加2px計算行高
								lh = Math.floor(lh * 100) / 100;
								$div.css({"vertical-align": "top", "line-height": Math.max(lh, 0.84)});	// 行高小於0.84會切到第一行字的上面, 故限制最小行高不小於0.84
							}
						}
					}
					// 2016.3.7 新增不套用職名章顏色
					if(SSO_CONFIG && "applySignetColor" in SSO_CONFIG && SSO_CONFIG.applySignetColor == false) {
						_model.getSignFolder().getSODataURL(so).done(function(dataUrl) {
							so.imgData = dataUrl;
							$img.get(0).src = dataUrl;
						});
					}
					else {
						var canvas = document.createElement("canvas");
						var img = new Image();
						img.onload = function() {
							var t = new Date();
							theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + "." + t.getMilliseconds() + " 章戳Image[ID:" + $img.parent().attr("data-id") + "].onload - width: " + this.width + ", height: " + this.height);
							canvas.width = this.width;
							canvas.height = this.height;
							var ctx = canvas.getContext("2d");
							ctx.beginPath();
							ctx.drawImage(this, 0, 0);
							ctx.closePath();
							var picData = ctx.getImageData(0, 0, this.width, this.height);
							var picLength = this.width * this.height;
							for(var i=0; i<picLength * 4; i+=4) {
								if(picData.data[i] != 255)
									picData.data[i] = so.content.color.r;	// 2015.5.27 改用r,g,b與章戳顏色物件一致
								if(picData.data[i + 1] != 255)
									picData.data[i + 1] = so.content.color.g;
								if(picData.data[i + 2] != 255)
									picData.data[i + 2] = so.content.color.b;
								if(picData.data[i] == 255 && picData.data[i+1] == 255 && picData.data[i+2] == 255) // 2016.12.4 若指定透明則白色改成透明
									picData.data[i+3] = 0;
							}
							ctx.putImageData(picData, 0, 0);
							$img.get(0).src = canvas.toDataURL("image/png");
						}
						// 1060927 Raymond 1060879 瀏覽器可能無法下載章戳影像網址, 需要重新下載
						var c = 0;
						img.onerror = function() {
							var t = new Date();
							theLogger.warn(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + "." + t.getMilliseconds() + " 章戳Image[ID:" + $img.parent().attr("data-id") + "]載入失敗, 重新載入(" + (++c) + ")...");
							//img.src = so.imgData;// 1060928 Raymond 先不要retry, 查明造成下載失敗的環境的問題後再修
						}
						_model.getSignFolder().getSODataURL(so).done(function(dataUrl) {
							theLogger.warn("章戳(ID:" + so.id + ")的鏈結網址:" + dataUrl);	// 2016.11.25 新增Log記錄以追蹤下載網址問題
							so.imgData = dataUrl;	// 2015.11.18 記錄影像dataUrl, 供檢核職名
							img.src = dataUrl;
						});
					}
					}	// 1060803 Raymond 1060579 保留的簽核物件改至draftPages層, 故目前頁可能有不顯示的簽核物件, 會顯示的一律以skipAppend為false產生, 故後續時戳等處理應包在!skipAppend條件式下
				}
				else if(so.type == "圖檔") {
					// 2015.5.27 判斷簽核物件是否屬於簽核區域內
					var skipAppend = false, $img;
					if("saType" in so) {
						// 1060803 Raymond 1060579 歷史檢視沒有動態計算的signArea, 改用AOLProcessData.xml中所記錄的, 若簽核框內物件在此頁找不到所屬的簽核區域則不顯示
						var saFound = false;
						$.each(pg.saInAPD, function(j, signArea) {
							if(so.saID == signArea.id) {
								theLogger.log("\t框內簽核物件(" + so.type + ", id:" + so.id + ")屬於此頁的簽核區域(ID:" + signArea.id + ")");
								// 用歷史版本的簽核區域的相對位置計算出目前版本的絕對位置來修正簽核物件的顯示座標
								var x = signArea.left + so.offset.x,
									y = signArea.top + so.offset.y;
								fixedPos = DPtoLP({x: x, y: y}, "mm");
								theLogger.log("絕對座標從(" + so.content.area.left + "," + so.content.area.top + ")修正為(" + x + "," + y + ")");
								saFound = true;
								return false;
							}
						});
						if(!saFound) {
							theLogger.log("\t框內簽核物件(" + so.type + ", id:" + so.id + ")在此頁找不到所屬簽核區域, 不顯示");
							skipAppend = true;
						}
						
						// 1060808 Raymond 1060579 歷史檢視不會動態計算signArea, 不需要這段
						/*$.each(_memPPD[_currPo.draftIdx].signAreas, function(j, signArea) {
							// 簽核物件記錄所屬的簽核區域類型, 不應該在不同文稿版本間不同, 例如：101版為群組, 110版改為角色
							if(((so.saType == "群組" || so.saType == "0") && signArea.saType == "0") ||
								((so.saType == "角色" || so.saType == "1") && signArea.saType == "1") ||
								((so.saType == "單位" || so.saType == "2") && signArea.saType == "2") ||
								((so.saType == "覆閱" || so.saType == "3") && signArea.saType == "3")) {	// 2017.1.5 fix 補上type=2及type=3條件
								
								if(so.saID == signArea.id) {
									theLogger.log("\tsignArea['" + signArea.id + "']: 圖檔位於相對位置=" + so.offset.x + "," + so.offset.y);
									var areaLP = DPtoLP(so.content.area, "mm");   // 2016.2.25 先將座標值轉成邏輯座標
									var offsetLP = DPtoLP(so.offset, "mm");
									$img = $("<div class='sign-obj so-img' data-id='" + so.id + "' title='" + _makeSOInfo(so) + "'>\
<img src='image/AOL/sketch_comment.bmp' style='display:" + ((so.asIcon)?"inline":"none") + "'></img>\
<img style='display:" + ((so.asIcon)?"none":"inline") + "'></img></div>")
										.appendTo(signArea.$area)
										.css({left: (offsetLP.x - (so.asIcon?4:0)) + "mm", top: (offsetLP.y - (so.asIcon?4:0)) + "mm"})
										.click(function(event) {	// 2015.7.14 新增切換圖示顯示功能
											$pg.find(".sign-obj").removeClass("so-active");
											var $this = $(this).addClass("so-active");
											
											var cmds = new Array();
											cmds.special = true;
											if($this.find("img").eq(1).css("display") == "none") {
												// 2016.11.29 - Raymond, 比照一代不要提供切換圖示顯示功能
												//cmds.push({name:"完整顯示", func: function() {
												//	$this.find("img").eq(0).hide();
												//	$this.find("img").eq(1).show();
													//that.so.asIcon = false;	不回寫
												//	$this.css({left: offsetLP.x + "mm", top: offsetLP.y + "mm"});
													// 2015.11.12 - 切換顯示方式後再點選一次, 以觸發指令列正確顯示
												//	$this.trigger("click");
												//}});
												cmds.push({name:"檢視", func: function(so) {	// 2016.11.29 補檢視功能
													showTextModal.call($this, so);
												}, cbdata: so});
												var c = $pg.closest(".viewPort").data("editCursor");
												c.cmdFloat.setCmds(cmds);
												c.cmdFloat.setElem(this);
											}
											else {
												// 2016.11.29 - Raymond, 比照一代不要提供切換圖示顯示功能
												//cmds.push({name:"圖示顯示", func: function() {
												//	$this.find("img").eq(1).hide();
												//	$this.find("img").eq(0).show();
													//that.so.asIcon = true;	不回寫
												//	$this.css({left: (offsetLP.x - 4) + "mm", top: (offsetLP.y - 4) + "mm"});
													// 2015.11.12 - 切換顯示方式後再點選一次, 以觸發指令列正確顯示
												//	$this.trigger("click");
												//}});
											}
											
											//var c = $pg.closest(".viewPort").data("editCursor");
											//c.cmdFloat.setCmds(cmds);
											//c.cmdFloat.setElem(this);
											return false;
										});
									
									//if(!so.asIcon)	// 2016.2.25 FIX位於簽核區域內的圖檔沒有寬高問題
										$img.find("img").eq(1).css({width: (areaLP.right - areaLP.left) + "mm", height: (areaLP.bottom - areaLP.top) + "mm"});
									
									// 2015.5.29 自動蓋職名章的下緣只計算現有職名章
									//var saOff = signArea.$area.offset();
									//var saPos = signArea.$area.position();
									//theLogger.log("saOff.top: " + saOff.top + ",saPos.top:" + saPos.top + ", so.offset.y:" + so.offset.y + ", so.height=" + $img.height() + ", $pg.height=" + $pg.height());
									//signArea.lastSignetBottom = Math.max(signArea.lastSignetBottom || 0, (so.content.area.bottom || so.content.area.top + so.content.area.height) * $pg.height() / 3507);
									//signArea.lastSignetBottom = Math.max(signArea.lastSignetBottom || 0, saPos.top + ((so.offset.y + $img.height()) * $pg.height() / 3507));
									//theLogger.log("signArea.lastSignetBottom: " + signArea.lastSignetBottom);
									skipAppend = true;
									return false;
								}
							}
						});
						if(!skipAppend)
							theLogger.warn(so.type + "(ID:" + so.id + ")找不到符合的簽核區域");*/
					}
					/* 2015.5.29 自動蓋職名章的下緣只計算現有職名章
					else {
						// 判斷是否在簽核區域中
						$.each(_memPPD[_currPo.draftIdx].signAreas, function(j, signArea) {
							theLogger.log("\tsignArea[" + j + "]: pos=" + signArea.$area.position().left + "," + signArea.$area.position().top + " size=" + signArea.$area.width() + "," + signArea.$area.height());
							var dp = {x:so.content.area.left * $pg.width() / 2480, y:so.content.area.top * $pg.height() / 3507};
							theLogger.log("\tx:" + dp.x + ", y:" + dp.y + (PtInArea(dp, signArea)?"  在簽核區域內":""));
							if(PtInArea(dp, signArea)) {
								signArea.lastSignetBottom = Math.max(signArea.lastSignetBottom || 0, (so.content.area.top + 48) * $pg.height() / 3507);
								theLogger.log("signArea.lastSignetBottom: " + signArea.lastSignetBottom);
							}
						});
					}*/
					
					var areaLP = DPtoLP(so.content.area, "mm");   // 先將座標值轉成邏輯座標
					// 2019.12.19 - 1081132 Eric, MacPC support!
					// 2015.7.14 修正iPad字體不同造成的視覺差異
					// 2019.10.17 - 1080905 Eric, iPadOS 13 quick-fix (add "Macintosh" string check)
					if(navigator.userAgent.indexOf("Chrome") >= 0 || 
					   navigator.userAgent.indexOf("Mobile") >= 0 || 
					   (!window.realMac && navigator.userAgent.indexOf('Macintosh') >= 0)) {
// 2015.11.12 CDC暫不補正看簽核物件位置徧移狀況
//						areaLP.left -= ((areaLP.left - 42) * 0.03);	// 2015.7.24 水平方向由於iPad字體窄於AOL呈現, 且CSS無法
//						areaLP.right -= ((areaLP.right - 42) * 0.03);
						//areaLP.top += 1.5;	2015.7.22 垂直方向不微調, 用lineHeight校正
						//areaLP.bottom += 1.5;
					}
					var w = areaLP.right - areaLP.left,
						h = areaLP.bottom - areaLP.top;
					// 1130605 Raymond 1130120 修正文稿頁面上的簽核框外物件也可套用外部簽核記錄檔所記錄的座標
					if(!fixedPos && !!xso && "pos" in xso)
						fixedPos = DPtoLP(xso.pos, "mm");
					// 2015.5.29 修正可圖示顯示
					if(!skipAppend) {
						$img = $("<div class='sign-obj so-img' data-id='" + so.id + "' title='" + _makeSOInfo(so) + "'>\
<img src='image/AOL/sketch_comment.bmp' style='display:" + ((so.asIcon)?"inline":"none") + "'></img>\
<img style='display:" + ((so.asIcon)?"none":"inline") + "'></img></div>")
							.appendTo($pg)
							//.css({left: (areaLP.left - (so.asIcon?4:0)) + "mm", top: (areaLP.top - (so.asIcon?4:0)) + "mm"})	// 1060803 Raymond 1060579 用修正後的絕對座標取代簽核物件原來版本中記錄的座標
							.css({left: (((!!fixedPos)?fixedPos.x:areaLP.left) - (so.asIcon?4:0)) + "mm",	// 1060803 Raymond 1060579 用修正後的絕對座標取代簽核物件原來版本中記錄的座標
									top: (((!!fixedPos)?fixedPos.y:areaLP.top) - (so.asIcon?4:0)) + "mm"})	// 1060803 Raymond 1060579 用修正後的絕對座標取代簽核物件原來版本中記錄的座標
							.on('click', function(event) {	// 2015.7.14 新增切換圖示顯示功能
								$pg.find(".sign-obj").removeClass("so-active");
								var $this = $(this).addClass("so-active");
								
								var cmds = new Array();
								cmds.special = true;
								if($this.find("img").eq(1).css("display") == "none") {
									/* 2016.11.29 - Raymond, 比照一代不要提供切換圖示顯示功能
									cmds.push({name:"完整顯示", func: function() {
										$this.find("img").eq(0).hide();
										$this.find("img").eq(1).show();
										//that.so.asIcon = false;	不回寫
										$this.css({left: areaLP.left + "mm", top: areaLP.top + "mm"});
										// 2015.11.12 - 切換顯示方式後再點選一次, 以觸發指令列正確顯示
										$this.trigger("click");
									}});*/
									cmds.push({name:"檢視", func: function(so) {	// 2016.11.29 補檢視功能
										showTextModal.call($this, so);
									}, cbdata: so});
									var c = $pg.closest(".viewPort").data("editCursor");
									c.cmdFloat.setCmds(cmds);
									c.cmdFloat.setElem(this);
								}
								else {
									/* 2016.11.29 - Raymond, 比照一代不要提供切換圖示顯示功能
									cmds.push({name:"圖示顯示", func: function() {
										$this.find("img").eq(1).hide();
										$this.find("img").eq(0).show();
										//that.so.asIcon = true;	不回寫
										$this.css({left: (areaLP.left - 4) + "mm", top: (areaLP.top - 4) + "mm"});
										// 2015.11.12 - 切換顯示方式後再點選一次, 以觸發指令列正確顯示
										$this.trigger("click");
									}});*/
								}
								
								/*var c = $pg.closest(".viewPort").data("editCursor");
								c.cmdFloat.setCmds(cmds);
								c.cmdFloat.setElem(this);*/
								return false;
							});
							
						//if(!so.asIcon)	// 2016.2.25 圖檔大小應一律設定
							$img.find("img").eq(1).css({width: w + "mm", height: h + "mm"});
					//}	1060803 Raymond 1060579 保留的簽核物件改至draftPages層, 故目前頁可能有不顯示的簽核物件, 會顯示的一律以skipAppend為false產生, 故後續時戳等處理應包在!skipAppend條件式下
					
					_model.getSignFolder().getSODataURL(so).done(function(dataUrl) {
						theLogger.warn(so.type + "(ID:" + so.id + ")的鏈結網址:" + dataUrl);	// 1060808 新增Log記錄以追蹤下載網址問題
						if(so.content.maskBkgnd == "Y") {// 去背
							var canvas = document.createElement("canvas");
							var img = new Image();
							img.onload = function() {
								var t = new Date();
								theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + "." + t.getMilliseconds() + " 圖檔Image[ID:" + $img.parent().attr("data-id") + "].onload - width: " + this.width + ", height: " + this.height);
								canvas.width = this.width;
								canvas.height = this.height;
								var ctx = canvas.getContext("2d");
								ctx.beginPath();
								ctx.drawImage(this, 0, 0);
								ctx.closePath();
								var picData = ctx.getImageData(0, 0, this.width, this.height);
								var picLength = this.width * this.height;
								var transparency = Number(so.content.transparency);// transparency 0~255, 0是不透明, 255是全透明
								// 2015.4.14 去背功能似乎無效(可能是JPG衍生問題)
								for(var i=0; i<picLength * 4; i+=4) {
									if(picData.data[i] == 255 &&
									   picData.data[i + 1] == 255 &&
									   picData.data[i + 2] == 255) {// 白色為背景色
										picData.data[i + 3] = 0;    // Alpha 0為透明
									}
									else if(transparency > 0) {	// 半透明
										picData.data[i + 3] = 255 - transparency;	
									}
								}
								ctx.putImageData(picData, 0, 0);
								$img.find("img").get(1).src = canvas.toDataURL("image/png");
							}
							// 1060927 Raymond 1060879 瀏覽器可能無法下載章戳影像網址, 需要重新下載
							var c = 0;
							img.onerror = function() {
								var t = new Date();
								theLogger.warn(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + "." + t.getMilliseconds() + " 章戳Image[ID:" + $img.parent().attr("data-id") + "]載入失敗, 重新載入(" + (++c) + ")...");
								//img.src = so.imgData;// 1060928 Raymond 先不要retry, 查明造成下載失敗的環境的問題後再修
							}
							so.imgData = dataUrl;	// 1060927 Raymond 1060879 瀏覽器可能無法下載圖檔影像網址, 記錄此網址供重新下載
							img.src = dataUrl;	// 用img.onload去背
						}
						else
							$img.find("img").get(1).src = dataUrl;
					});
					}	// 1060803 Raymond 1060579 保留的簽核物件改至draftPages層, 故目前頁可能有不顯示的簽核物件, 會顯示的一律以skipAppend為false產生, 故後續時戳等處理應包在!skipAppend條件式下
				}
				else if(so.type == "文字意見") {
					// 2015.5.27 判斷簽核物件是否屬於簽核區域內
					var skipAppend = false, $tx;
					if("saType" in so) {
						// 1060803 Raymond 1060579 歷史檢視沒有動態計算的signArea, 改用AOLProcessData.xml中所記錄的, 若簽核框內物件在此頁找不到所屬的簽核區域則不顯示
						var saFound = false;
						$.each(pg.saInAPD, function(j, signArea) {
							if(so.saID == signArea.id) {
								theLogger.log("\t框內簽核物件(" + so.type + ", id:" + so.id + ")屬於此頁的簽核區域(ID:" + signArea.id + ")");
								// 用歷史版本的簽核區域的相對位置計算出目前版本的絕對位置來修正簽核物件的顯示座標
								var x = signArea.left + so.offset.x,
									y = signArea.top + so.offset.y;
								fixedPos = DPtoLP({x: x, y: y}, "mm");
								theLogger.log("絕對座標從(" + so.content.pos.x + "," + so.content.pos.y + ")修正為(" + x + "," + y + ")");
								saFound = true;
								return false;
							}
						});
						if(!saFound) {
							theLogger.log("\t框內簽核物件(" + so.type + ", id:" + so.id + ")在此頁找不到所屬簽核區域, 不顯示");
							skipAppend = true;
						}
						
						// 1060808 Raymond 1060579 歷史檢視不會動態計算signArea, 不需要這段
						/*$.each(_memPPD[_currPo.draftIdx].signAreas, function(j, signArea) {
							// 簽核物件記錄所屬的簽核區域類型, 不應該在不同文稿版本間不同, 例如：101版為群組, 110版改為角色
							if(((so.saType == "群組" || so.saType == "0") && signArea.saType == "0") ||
								((so.saType == "角色" || so.saType == "1") && signArea.saType == "1") ||
								((so.saType == "單位" || so.saType == "2") && signArea.saType == "2") ||
								((so.saType == "覆閱" || so.saType == "3") && signArea.saType == "3")) {	// 2017.1.5 fix 補上type=2及type=3條件
								
								if(so.saID == signArea.id) {
									theLogger.log("\tsignArea['" + signArea.id + "']: 文字意見位於相對位置=" + so.offset.x + "," + so.offset.y);
									var offsetLP = DPtoLP(so.offset, "mm");
									// 2016.10.3 新增title資訊
									$tx = $("<div class='sign-obj so-text' data-id='" + so.id + "' title='" + _makeSOInfo(so) + "'>\
<img src='image/AOL/txt_comment.bmp' style='display:" + ((so.asIcon)?"inline":"none")+ "'>\
<div style='display:" + ((so.asIcon)?"none":"block") +
		";writing-mode:" + ((so.content.orient == "直書")?"tb-rl":"lr-tb") +
		";font-family:" + so.content.font.name +
		";font-size:" + (so.content.font.size+"pt") +
		";color: rgb(" + so.content.font.color.r + "," + so.content.font.color.g + "," + so.content.font.color.b + ")'>" + so.content.text.replace(/\n/g, '<br>') + "</div></div>")
										.appendTo(signArea.$area)
										.css({left: (offsetLP.x - (so.asIcon?4:0)) + "mm", top: (offsetLP.y - (so.asIcon?4:0)) + "mm"})
										.click(function(event) {	// 2015.7.14 新增切換圖示顯示功能
											$pg.find(".sign-obj").removeClass("so-active");
											var $this = $(this).addClass("so-active");
											
											var cmds = new Array();
											cmds.special = true;
											if($this.find("img").css("display") == "none") {
												// 2016.10.7 - Raymond, 比照一代不要提供切換圖示顯示功能
												//cmds.push({name:"圖示顯示", func: function() {
												//	$this.find("div").hide();
												//	$this.find("img").show();
													//that.so.asIcon = true;	不回寫
												//	$this.css({left: (offsetLP.x - 4) + "mm", top: (offsetLP.y - 4) + "mm"});	// 2015.7.16 FIX
													// 2015.11.12 - 切換顯示方式後再點選一次, 以觸發指令列正確顯示
												//	$this.trigger("click");
												//}});
											}
											else {
												// 2016.10.7 - Raymond, 比照一代不要提供切換圖示顯示功能
												//cmds.push({name:"完整顯示", func: function() {
												//	$this.find("img").hide();
												//	$this.find("div").show();
													//that.so.asIcon = false;	不回寫
												//	$this.css({left: offsetLP.x + "mm", top: offsetLP.y + "mm"});	// 2015.7.16 FIX
													// 2015.11.12 - 切換顯示方式後再點選一次, 以觸發指令列正確顯示
												//	$this.trigger("click");
												//}});
												cmds.push({name:"檢視", func: function(so) {	// 2016.10.3 補檢視功能
													showTextModal.call($this, so);
												}, cbdata: so});
												var c = $pg.closest(".viewPort").data("editCursor");
												c.cmdFloat.setCmds(cmds);
												c.cmdFloat.setElem(this);
											}
											
											return false;
										});
									
									switch(so.content.font.style) {
									case "粗斜體":
										$tx.find("div").css({fontWeight: "bolder", fontStyle: "italic"});
										break;
									case "粗體":
										$tx.find("div").css({fontWeight: "bolder"});
										break;
									case "斜體":
										$tx.find("div").css({fontStyle: "italic"});
										break;
									default:
										break;
									}
									
									// 2015.11.18 位於簽核區域內的文字意見額外設定寬度, 以使其可超出區域顯示
									//$tx.find("div").css("width", "-webkit-calc(" + signArea.getPageWidth() + signArea.getUnit() + " - " + (so.content.pos.x / 300) + "in)");
									var $test = $("<div style='position:absolute'></div>").append($tx.find("div").clone(true)).appendTo("body");
									var cx = $test.width();
									$tx.find("div").css("width", (cx + 2) + "px");
									$test.remove();
									
									// 2015.5.29 自動蓋職名章的下緣只計算現有職名章
									//var saOff = signArea.$area.offset();
									//var saPos = signArea.$area.position();
									//theLogger.log("saOff.top: " + saOff.top + ",saPos.top:" + saPos.top + ", so.offset.y:" + so.offset.y + ", so.height=" + $tx.height() + ", $pg.height=" + $pg.height());
									//signArea.lastSignetBottom = Math.max(signArea.lastSignetBottom || 0, (so.content.area.bottom || so.content.area.top + so.content.area.height) * $pg.height() / 3507);
									//signArea.lastSignetBottom = Math.max(signArea.lastSignetBottom || 0, saPos.top + ((so.offset.y + $tx.height()) * $pg.height() / 3507));
									//theLogger.log("signArea.lastSignetBottom: " + signArea.lastSignetBottom);
									// 2016.10.14 改成抓最右上及最左下座標, 給自動蓋章使用
									if("mostRightTop" in signArea) {
										signArea.mostRightTop.x = Math.max(signArea.mostRightTop.x || 0, (so.offset.x + 48) * $pg.width() / 2480);
										signArea.mostRightTop.x2 = Math.max(signArea.mostRightTop.x2 || 0, (parseInt(so.content.pos.x) + 48) * pg.container.pageExt.width / 2480);
										//signArea.mostRightTop.y = 0;
										//signArea.mostRightTop.y2 = parseInt(signArea.top) * pg.container.pageExt.height / 3507;
										theLogger.log("signArea.mostRightTop: x:" + signArea.mostRightTop.x + ", x2: " + signArea.mostRightTop.x2 + ", y:" + signArea.mostRightTop.y + ", y2:" + signArea.mostRightTop.y2);
									}
									
									if("mostLeftBottom" in signArea) {
										//signArea.mostLeftBottom.x = 0;
										//signArea.mostLeftBottom.x2 = parseInt(signArea.left) * pg.container.pageExt.width / 2480;
										signArea.mostLeftBottom.y = Math.max(signArea.mostLeftBottom.y || 0, (so.offset.y + 48) * $pg.height() / 3507);
										signArea.mostLeftBottom.y2 = Math.max(signArea.mostLeftBottom.y2 || 0, (parseInt(so.content.pos.y) + 48) * pg.container.pageExt.height / 3507);
										theLogger.log("signArea.mostLeftBottom: x:" + signArea.mostLeftBottom.x + ", x2: " + signArea.mostLeftBottom.x2 + ", y:" + signArea.mostLeftBottom.y + ", y2:" + signArea.mostLeftBottom.y2);
									}
									
									if("nextSignPos" in signArea) {
										if(signArea.dir == 1) {	// 由左至右
											//if(so.offset.y > signArea.nextSignPos.bottomLine) {	// 換行
											//	signArea.nextSignPos.x = (so.offset.x + 48) * pg.container.pageExt.width / 2480;
											//	signArea.nextSignPos.x2 = (parseInt(so.content.pos.x) + 48) * pg.container.pageExt.width / 2480;
											//	signArea.nextSignPos.y = so.offset.y * pg.container.pageExt.height / 3507;
											//	signArea.nextSignPos.y2 = parseInt(so.content.pos.y) * pg.container.pageExt.height / 3507;
											//	signArea.nextSignPos.bottomLine = so.offset.y + 48;
											//}
											//else {
												signArea.nextSignPos.x = Math.max(signArea.nextSignPos.x || 0, (so.offset.x + 48) * pg.container.pageExt.width / 2480);
												signArea.nextSignPos.x2 = Math.max(signArea.nextSignPos.x2 || 0, (parseInt(so.content.pos.x) + 48) * pg.container.pageExt.width / 2480);
												//signArea.nextSignPos.y = Math.max(signArea.nextSignPos.y || 0, (so.offset.y + (parseInt(so.content.area.height) || parseInt(so.content.area.bottom) - parseInt(so.content.area.top))) * pg.container.pageExt.height / 3507);
												//signArea.nextSignPos.y2 = Math.max(signArea.nextSignPos.y2 || 0, parseInt(so.content.area.bottom) * pg.container.pageExt.height / 3507);
												signArea.nextSignPos.bottomLine = Math.max(signArea.nextSignPos.bottomLine, so.offset.y + 48);
											//}
											theLogger.log("signArea.nextSignPos: x:" + signArea.nextSignPos.x + ", x2: " + signArea.nextSignPos.x2 + ", y:" + signArea.nextSignPos.y + ", y2:" + signArea.nextSignPos.y2 + ", bottomLine:" + signArea.nextSignPos.bottomLine);
										}
										else {	// 由上至下
											//if(so.offset.x > signArea.nextSignPos.rightLine) {	// 換行
											//	signArea.nextSignPos.x = so.offset.x * pg.container.pageExt.width / 2480;
											//	signArea.nextSignPos.x2 = parseInt(so.content.pos.x) * pg.container.pageExt.width / 2480;
											//	signArea.nextSignPos.y = (so.offset.y + 48) * pg.container.pageExt.height / 3507;
											//	signArea.nextSignPos.y2 = (parseInt(so.content.pos.y) + 48) * pg.container.pageExt.height / 3507;
											//	signArea.nextSignPos.rightLine = so.offset.x + 48;
											//}
											//else {
												//signArea.nextSignPos.x = Math.max(signArea.nextSignPos.x || 0, (so.offset.x + (parseInt(so.content.area.width) || parseInt(so.content.area.right) - parseInt(so.content.area.left))) * pg.container.pageExt.width / 2480);
												//signArea.nextSignPos.x2 = Math.max(signArea.nextSignPos.x2 || 0, parseInt(so.content.area.right) * pg.container.pageExt.width / 2480);
												signArea.nextSignPos.y = Math.max(signArea.nextSignPos.y || 0, (so.offset.y + 48) * pg.container.pageExt.height / 3507);
												signArea.nextSignPos.y2 = Math.max(signArea.nextSignPos.y2 || 0, (parseInt(so.content.pos.y) + 48) * pg.container.pageExt.height / 3507);
												signArea.nextSignPos.rightLine = Math.max(signArea.nextSignPos.rightLine, so.offset.x + 48);
											//}
											theLogger.log("signArea.nextSignPos: x:" + signArea.nextSignPos.x + ", x2: " + signArea.nextSignPos.x2 + ", y:" + signArea.nextSignPos.y + ", y2:" + signArea.nextSignPos.y2 + ", rightLine:" + signArea.nextSignPos.rightLine);
										}
									}
									skipAppend = true;
									return false;
								}
							}
						});
						if(!skipAppend)
							theLogger.warn(so.type + "(ID:" + so.id + ")找不到符合的簽核區域");*/
					}
					/* 2015.5.29 自動蓋職名章的下緣只計算現有職名章
					else {
						// 判斷是否在簽核區域中
						$.each(_memPPD[_currPo.draftIdx].signAreas, function(j, signArea) {
							theLogger.log("\tsignArea[" + j + "]: pos=" + signArea.$area.position().left + "," + signArea.$area.position().top + " size=" + signArea.$area.width() + "," + signArea.$area.height());
							var dp = {x:so.content.pos.x * $pg.width() / 2480, y:so.content.pos.y * $pg.height() / 3507};
							theLogger.log("\tx:" + dp.x + ", y:" + dp.y + (PtInArea(dp, signArea)?"  在簽核區域內":""));
							if(PtInArea(dp, signArea)) {
								signArea.lastSignetBottom = Math.max(signArea.lastSignetBottom || 0, (so.content.pos.y + 48) * $pg.height() / 3507);
								theLogger.log("signArea.lastSignetBottom: " + signArea.lastSignetBottom);
							}
						});
					}*/
					else if(false) {	// 2016.12.2 quickfix, 判斷文字意見是否在簽核框內的邏輯有誤, 未區分頁次! 先不要主動判斷文字意見簽核物件是否位於簽核區域內, 以免與簽核框不同頁次但判斷為屬於框內的的簽核物件顯示不出來
						if(_memPPD[_currPo.draftIdx] && _memPPD[_currPo.draftIdx].signAreas) {	// 2016.1.15 新增判斷文稿是否有簽核區域
							$.each(_memPPD[_currPo.draftIdx].signAreas, function(j, signArea) {
								theLogger.log("\tsignArea[" + j + "]: pos=" + signArea.$area.position().left + "," + signArea.$area.position().top + " size=" + signArea.$area.width() + "," + signArea.$area.height());
								if("width" in so.content.pos)
									var dp = {x:(parseInt(so.content.pos.x) + parseInt(so.content.pos.width) / 2) * $pg.width() / 2480, y:(parseInt(so.content.pos.y) + parseInt(so.content.pos.height) / 2) * $pg.height() / 3507};
								else
									var dp = {x:parseInt(so.content.pos.x) * $pg.width() / 2480, y:parseInt(so.content.pos.y) * $pg.height() / 3507};
								theLogger.log("\tx:" + dp.x + ", y:" + dp.y + (PtInArea(dp, signArea)?"  在簽核區域內":""));
								if(PtInArea(dp, signArea)) {
									so.saType = signArea.saType;
									so.saID = signArea.id;
									so.offset = {x: parseInt(so.content.pos.x) - Math.ceil(signArea.left * 2480 / $pg.width()), y: parseInt(so.content.pos.y) - Math.ceil(signArea.top * 3507 / $pg.height())};
									var offsetLP = DPtoLP(so.offset, "mm");
									$tx = $("<div class='sign-obj so-text' data-id='" + so.id + "' title='" + _makeSOInfo(so) + "'>\
<img src='image/AOL/txt_comment.bmp' style='display:" + ((so.asIcon)?"inline":"none")+ "'>\
<div style='display:" + ((so.asIcon)?"none":"block") +
		";writing-mode:" + ((so.content.orient == "直書")?"tb-rl":"lr-tb") +
		";font-family:" + so.content.font.name +
		";font-size:" + (so.content.font.size+"pt") +
		";color: rgb(" + so.content.font.color.r + "," + so.content.font.color.g + "," + so.content.font.color.b + ")'>" + so.content.text.replace(/\n/g, '<br>') + "</div></div>")
										.appendTo(signArea.$area)
										.css({left: (offsetLP.x - (so.asIcon?4:0)) + "mm", top: (offsetLP.y - (so.asIcon?4:0)) + "mm"})
										.on('click', function(event) {	// 2015.7.14 新增切換圖示顯示功能
											$pg.find(".sign-obj").removeClass("so-active");
											var $this = $(this).addClass("so-active");
											
											var cmds = new Array();
											cmds.special = true;
											if($this.find("img").css("display") == "none") {
												/* 2016.10.7 - Raymond, 比照一代不要提供切換圖示顯示功能
												cmds.push({name:"圖示顯示", func: function() {
													$this.find("div").hide();
													$this.find("img").show();
													//that.so.asIcon = true;	不回寫
													$this.css({left: (offsetLP.x - 4) + "mm", top: (offsetLP.y - 4) + "mm"});	// 2015.7.16 FIX
													// 2015.11.12 - 切換顯示方式後再點選一次, 以觸發指令列正確顯示
													$this.trigger("click");
												}});*/
											}
											else {
												/* 2016.10.7 - Raymond, 比照一代不要提供切換圖示顯示功能
												cmds.push({name:"完整顯示", func: function() {
													$this.find("img").hide();
													$this.find("div").show();
													//that.so.asIcon = false;	不回寫
													$this.css({left: offsetLP.x + "mm", top: offsetLP.y + "mm"});	// 2015.7.16 FIX
													// 2015.11.12 - 切換顯示方式後再點選一次, 以觸發指令列正確顯示
													$this.trigger("click");
												}});*/
												cmds.push({name:"檢視", func: function(so) {	// 2016.10.3 補檢視功能
													showTextModal.call($this, so);
												}, cbdata: so});
												var c = $pg.closest(".viewPort").data("editCursor");
												c.cmdFloat.setCmds(cmds);
												c.cmdFloat.setElem(this);
											}
											
											return false;
										});
									
									switch(so.content.font.style) {
									case "粗斜體":
										$tx.find("div").css({fontWeight: "bolder", fontStyle: "italic"});
										break;
									case "粗體":
										$tx.find("div").css({fontWeight: "bolder"});
										break;
									case "斜體":
										$tx.find("div").css({fontStyle: "italic"});
										break;
									default:
										break;
									}
									skipAppend = true;
									
									// 2016.10.14 改成抓最右上及最左下座標, 給自動蓋章使用
									if("mostRightTop" in signArea) {
										signArea.mostRightTop.x = Math.max(signArea.mostRightTop.x || 0, (parseInt(so.content.pos.x) + 48) * $pg.width() / 2480 - signArea.left);
										signArea.mostRightTop.x2 = Math.max(signArea.mostRightTop.x2 || 0, (parseInt(so.content.pos.x) + 48) * pg.container.pageExt.width / 2480);
										//signArea.mostRightTop.y = 0;
										//signArea.mostRightTop.y2 = parseInt(signArea.top) * pg.container.pageExt.height / 3507;
										theLogger.log("signArea.mostRightTop: x:" + signArea.mostRightTop.x + ", x2: " + signArea.mostRightTop.x2 + ", y:" + signArea.mostRightTop.y + ", y2:" + signArea.mostRightTop.y2);
									}
									
									if("mostLeftBottom" in signArea) {
										//signArea.mostLeftBottom.x = 0;
										//signArea.mostLeftBottom.x2 = parseInt(signArea.left) * pg.container.pageExt.width / 2480;
										signArea.mostLeftBottom.y = Math.max(signArea.mostLeftBottom.y || 0, (parseInt(so.content.pos.y) + 18) * $pg.height() / 3507 - signArea.top);
										signArea.mostLeftBottom.y2 = Math.max(signArea.mostLeftBottom.y2 || 0, (parseInt(so.content.pos.y) + 18) * pg.container.pageExt.height / 3507);
										theLogger.log("signArea.mostLeftBottom: x:" + signArea.mostLeftBottom.x + ", x2: " + signArea.mostLeftBottom.x2 + ", y:" + signArea.mostLeftBottom.y + ", y2:" + signArea.mostLeftBottom.y2);
									}
									
									if("nextSignPos" in signArea) {
										if(signArea.dir == 1) {	// 由左至右
											/*if(so.offset.y > signArea.nextSignPos.bottomLine) {	// 換行
												signArea.nextSignPos.x = (so.offset.x + 48) * pg.container.pageExt.width / 2480;
												signArea.nextSignPos.x2 = (parseInt(so.content.pos.x) + 48) * pg.container.pageExt.width / 2480;
												signArea.nextSignPos.y = so.offset.y * pg.container.pageExt.height / 3507;
												signArea.nextSignPos.y2 = parseInt(so.content.pos.y) * pg.container.pageExt.height / 3507;
												signArea.nextSignPos.bottomLine = so.offset.y + 48;
											}
											else*/ {
												signArea.nextSignPos.x = Math.max(signArea.nextSignPos.x || 0, (so.offset.x + 48) * pg.container.pageExt.width / 2480);
												signArea.nextSignPos.x2 = Math.max(signArea.nextSignPos.x2 || 0, (parseInt(so.content.pos.x) + 48) * pg.container.pageExt.width / 2480);
												//signArea.nextSignPos.y = Math.max(signArea.nextSignPos.y || 0, (so.offset.y + (parseInt(so.content.area.height) || parseInt(so.content.area.bottom) - parseInt(so.content.area.top))) * pg.container.pageExt.height / 3507);
												//signArea.nextSignPos.y2 = Math.max(signArea.nextSignPos.y2 || 0, parseInt(so.content.area.bottom) * pg.container.pageExt.height / 3507);
												signArea.nextSignPos.bottomLine = Math.max(signArea.nextSignPos.bottomLine, so.offset.y + 48);
											}
											theLogger.log("signArea.nextSignPos: x:" + signArea.nextSignPos.x + ", x2: " + signArea.nextSignPos.x2 + ", y:" + signArea.nextSignPos.y + ", y2:" + signArea.nextSignPos.y2 + ", bottomLine:" + signArea.nextSignPos.bottomLine);
										}
										else {	// 由上至下
											/*if(so.offset.x > signArea.nextSignPos.rightLine) {	// 換行
												signArea.nextSignPos.x = so.offset.x * pg.container.pageExt.width / 2480;
												signArea.nextSignPos.x2 = parseInt(so.content.pos.x) * pg.container.pageExt.width / 2480;
												signArea.nextSignPos.y = (so.offset.y + 48) * pg.container.pageExt.height / 3507;
												signArea.nextSignPos.y2 = (parseInt(so.content.pos.y) + 48) * pg.container.pageExt.height / 3507;
												signArea.nextSignPos.rightLine = so.offset.x + 48;
											}
											else*/ {
												//signArea.nextSignPos.x = Math.max(signArea.nextSignPos.x || 0, (so.offset.x + (parseInt(so.content.area.width) || parseInt(so.content.area.right) - parseInt(so.content.area.left))) * pg.container.pageExt.width / 2480);
												//signArea.nextSignPos.x2 = Math.max(signArea.nextSignPos.x2 || 0, parseInt(so.content.area.right) * pg.container.pageExt.width / 2480);
												signArea.nextSignPos.y = Math.max(signArea.nextSignPos.y || 0, (so.offset.y + 48) * pg.container.pageExt.height / 3507);
												signArea.nextSignPos.y2 = Math.max(signArea.nextSignPos.y2 || 0, (parseInt(so.content.pos.y) + 48) * pg.container.pageExt.height / 3507);
												signArea.nextSignPos.rightLine = Math.max(signArea.nextSignPos.rightLine, so.offset.x + 48);
											}
											theLogger.log("signArea.nextSignPos: x:" + signArea.nextSignPos.x + ", x2: " + signArea.nextSignPos.x2 + ", y:" + signArea.nextSignPos.y + ", y2:" + signArea.nextSignPos.y2 + ", rightLine:" + signArea.nextSignPos.rightLine);
										}
									}
								}
							});
						}
					}
					
					if(!skipAppend) {
						var posLP = DPtoLP(so.content.pos, "mm");   // 先將座標值轉成邏輯座標
						// 1130605 Raymond 1130120 修正文稿頁面上的簽核框外物件也可套用外部簽核記錄檔所記錄的座標
						if(!fixedPos && !!xso && "pos" in xso)
							fixedPos = DPtoLP(xso.pos, "mm");
						// 2019.12.18 - 1081132 Eric, MacPC support!
						// 2015.9.4 修正iPad字體不同造成的視覺差異
						// 2019.10.17 - 1080905 Eric, iPadOS 13 quick-fix (add "Macintosh")
						if(navigator.userAgent.indexOf("Chrome") >= 0 || 
						   navigator.userAgent.indexOf("Mobile") >= 0 || 
						   (!window.realMac && navigator.userAgent.indexOf('Macintosh') >= 0)) {
							// 2015.12.15 disable
							//posLP.x -= ((posLP.x - 42) * 0.03);	// 2015.9.4 水平方向由於iPad字體窄於AOL呈現, 且CSS無法
						}
						// 2015.5.29 修正可圖示顯示, 2016.10.3 新增title資訊
						$tx = $("<div class='sign-obj so-text' data-id='" + so.id + "' title='" + _makeSOInfo(so) + "'>\
<img src='image/AOL/txt_comment.bmp' style='display:" + ((so.asIcon)?"inline":"none")+ "'>\
<div style='display:" + ((so.asIcon)?"none":"block") +
		";writing-mode:" + ((so.content.orient == "直書")?"tb-rl":"lr-tb") +
		";font-family:" + so.content.font.name +
		";font-size:" + (so.content.font.size+"pt") +
		// 1081217 Raymond FIX XSS
		//";color: rgb(" + so.content.font.color.r + "," + so.content.font.color.g + "," + so.content.font.color.b + ")'>" + so.content.text.replace(/\n/g, '<br>') + "</div></div>")
		";color: rgb(" + so.content.font.color.r + "," + so.content.font.color.g + "," + so.content.font.color.b + ")'></div></div>")
							.appendTo($pg)
							//.css({left: (posLP.x - (so.asIcon?4:0)) + "mm", top: (posLP.y - (so.asIcon?4:0)) + "mm"})	// 1060803 Raymond 1060579 用修正後的絕對座標取代簽核物件原來版本中記錄的座標
							.css({ left: (((!!fixedPos)?fixedPos.x:posLP.x) - (so.asIcon?4:0)) + "mm",	// 1060803 Raymond 1060579 用修正後的絕對座標取代簽核物件原來版本中記錄的座標
									top: (((!!fixedPos)?fixedPos.y:posLP.y) - (so.asIcon?4:0)) + "mm"})	// 1060803 Raymond 1060579 用修正後的絕對座標取代簽核物件原來版本中記錄的座標
							//.html(so.content.text.replace(/\n/g, "<br>"));	// 2014.8.21 - 將text()改成html(), 否則不會折行
							.on('click', function(event) {	// 2015.7.14 新增切換圖示顯示功能
								$pg.find(".sign-obj").removeClass("so-active");
								var $this = $(this).addClass("so-active");
								
								var cmds = new Array();
								cmds.special = true;
								if($this.find("img").css("display") == "none") {
									/* 2016.10.7 - Raymond, 比照一代不要提供切換圖示顯示功能
									cmds.push({name:"圖示顯示", func: function() {
										$this.find("div").hide();
										$this.find("img").show();
										//that.so.asIcon = true;	不回寫
										$this.css({left: (posLP.x - 4) + "mm", top: (posLP.y - 4) + "mm"});	// 2015.7.16 FIX
										// 2015.11.12 - 切換顯示方式後再點選一次, 以觸發指令列正確顯示
										$this.trigger("click");
									}});*/
								}
								else {
									/* 2016.10.7 - Raymond, 比照一代不要提供切換圖示顯示功能
									cmds.push({name:"完整顯示", func: function() {
										$this.find("img").hide();
										$this.find("div").show();
										//that.so.asIcon = false;	不回寫
										$this.css({left: posLP.x + "mm", top: posLP.y + "mm"});	// 2015.7.16 FIX
										// 2015.11.12 - 切換顯示方式後再點選一次, 以觸發指令列正確顯示
										$this.trigger("click");
									}});*/
									cmds.push({name:"檢視", func: function(so) {	// 2016.10.3 補檢視功能
										showTextModal.call($this, so);
									}, cbdata: so});
									var c = $pg.closest(".viewPort").data("editCursor");
									c.cmdFloat.setCmds(cmds);
									c.cmdFloat.setElem(this);
								}
								
								return false;
							});
						// 1081217 Raymond FIX XSS
						$tx.find("> div").text(so.content.text.replace(/<br>/g, "\n"));	// 1081218 Raymond 為了顯示已用&lt;br&gt;記錄在封裝檔中的文字意見, 替換成折行字元
						
						switch(so.content.font.style) {
						case "粗斜體":
							$tx.find("div").css({fontWeight: "bolder", fontStyle: "italic"});
							break;
						case "粗體":
							$tx.find("div").css({fontWeight: "bolder"});
							break;
						case "斜體":
							$tx.find("div").css({fontStyle: "italic"});
							break;
						default:
							break;
						}
						
						// 1100517 Raymond 1100298 新增取代他流程文字意見功能
						if(!!so.substObjId) {
							theLogger.log("搜尋被取代的他流程文字意見(ID:" + so.substObjId + ")");
							var $substObj = $pg.find(".so-text").filter(function() {
								return ($(this).attr("data-id") == so.substObjId);
							});
							if($substObj.length) {
								if($substObj.length == 1)
									$substObj.hide();
								else
									theLogger.error("應被取代的他流程文字意見(ID:" + so.substObjId + ")有" + $substObj.length + "個, 無法確定要隱藏哪一個");
							}
							else {
								var substedSOexisting = false;	// 應被取代的他流程文字意見是否存在於本頁
								for(var i=0; i<existingSO.length; i++) {
									if(existingSO[i].id == so.substObjId) {
										substedSOexisting = true;	// 同一頁中存在應被取代的他流程文字意見, 只是還沒顯示
										break;
									}
								}
								if(substedSOexisting) {
									theLogger.log("同一頁找不到應被取代的他流程文字意見(ID:" + so.substObjId + "), 記錄起來");
									missSubst.push(so.substObjId);
								}
							}
							// 同一頁中應被取代的他流程文字意見也有要取代的對象, 則需要再從XSignObj.xml中搜尋出來, 加到missSubst陣列中, 在顯示出來時隱藏掉
							function doSearchSubstedSO(thisSO) {
								var res = _model.getSignFolder().xSignFolder().findSignObjById(thisSO.substObjId);
								if(res.length == 1) {
									if(!!res[0].ref && !!res[0].ref.substObjId && missSubst.indexOf(res[0].ref.substObjId) < 0) {
										theLogger.log("設定應被取代的他流程文字意見(ID:" + thisSO.substObjId + "), 在XSignObj.xml中也記錄了其取代對象(ID: " + res[0].ref.substObjId + "), 記錄起來");
										missSubst.push(res[0].ref.substObjId);
										theLogger.log("再遞迴檢查該應被取代的文字意見是否也設定了取代別的文字意見...");
										arguments.callee.call(this, res[0].ref);
									}
								}
								else if(res.length > 0)
									theLogger.error("設定應被取代的他流程文字意見(ID:" + so.substObjId + "), 在XSignObj.xml中多處出現");
								else
									theLogger.error("設定應被取代的他流程文字意見(ID:" + so.substObjId + "), 不存在XSignObj.xml中");
							}
							doSearchSubstedSO(so);
						}
						// 1100518 Raymond 1100298 符合被別的流程文字意見取代時, 隱藏本文字意見並刪去取代ID
						if(missSubst.indexOf(so.id) >= 0) {
							theLogger.log("本文字意見已設定被其他文字意見取代, 隱藏");
							$tx.hide();
							missSubst.splice(missSubst.indexOf(so.id), 1);
						}
					}
				}
				else {
					theLogger.warn("未支援的簽核物件!");
				}
			});
			// 1100518 Raymond 1100298 for test
			if(missSubst.length > 0) {
				theLogger.warn("尚餘" + missSubst.length + "文字意見設定被取代尚未隱藏: " + missSubst.join("、"));
			}
		}
		// 1121116 Raymond 1120881 修正支援簽核區域增高功能時, 取消保留簽署物件可能使簽核區域跳到前一頁, 導致本流程點加蓋的簽核物件未跟著移到目前簽核區域所在頁次, 且儲存時會將簽核物件的頁次記錄錯誤的問題
		if(!_model.isRefDoc() && !!dm && dm.supportSALP() && dm.dirty() && !dm.getReserveSO()) {
			if("guid" in pg.container && !!pg.container.guid && _model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2") {
				var d0 = _model.getSignFolder().xSignFolder().getDraft(pg.container.guid);
				if(!!d0) {
					var v = d0.getVer(pg.container.id + "X");	// 儲存過後, XSignObjs.xml會新增一個文稿ID+"X"版本, 本流程點新增的簽核物件會從文稿ID的版本搬到新增的X版本, 所以要先讀取X版本, 沒有才用文稿ID版本
					if(!v)
						v = d0.getVer(pg.container.id);
					if(!!v) {
						var soOOR = false;	// 1121117 Raymond 1120881 執行"取消勾選"保留簽署物件後時, 若觸發簽核區域高度恢復為預設值, 須判斷是否有目前流程點加蓋的簽核物件因簽核區域高度變小而變成在簽核區域外
						for(var i=0; i<v.xSignObjs.length; i++) {
							var so = v.xSignObjs[i];
							// 1091022 Raymond 1090107 修正比對搬移簽核物件未包括當流程點新增的簽核物件, 導致頁數變化時簽核區域內未顯示之前當流程點加蓋的簽核物件的問題
							//if(coll.indexOf(so.msgId) >= 0) {
							if(so.msgId == _model.getMsgId()) {
								if(so.type == "A") {	// 簽核框內物件, 找此頁有無相同TYPE及ID的簽核區域加蓋
									if("signAreas" in _memPPD[_currPo.draftIdx] && _memPPD[_currPo.draftIdx].signAreas.length > 0) {
										for(var j=0; j<_memPPD[_currPo.draftIdx].signAreas.length; j++) {
											var sa = _memPPD[_currPo.draftIdx].signAreas[j];
											if((toSAType(so.saType) == toSAType(sa.saType) || so.saType == "角色") &&	// 2017.2.17 暫時允許之前錯誤設定的'角色'簽核物件可以顯示(航港-序463)
												so.saID == sa.id) {
												if(sa.po == pg.po) {	// 2017.3.24 簽核框位於本頁時, 檢查本流程新增簽核物件是否應由別頁移至此頁, FDA-序3295
													// 2017.2.17 簽稿會核單的簽核區域ID為空, 應為無效區域(記錄外部簽核物件資訊時應記錄成TypeB), 多頁情況下只能改用記錄在封裝檔的簽核物件的物件識別碼來區域是不是同一頁(航港-序461)
													if(so.saID == "") {
														// 1131230 Raymond 1131318 修正XSignObjs.xml有不存在SignWork.xml中的簽核物件時, 會發生Error導致無法關閉公文等問題
														if("ref" in so && !so.ref) {
															theLogger.error("XSignObjs.xml中記錄的'" + so.id + "'簽核物件未記錄在SignWork.xml中, 無法顯示此簽核物件於頁面上");
															if(!!so.id && so.id.match(/X_\d+/)) {
																theLogger.error("從XSignObjs.xml中移除此ID(" + so.id + ")的簽核物件記錄");
																v.xSignObjs.splice(i, 1);
																--i;
																break;
															}
														}
														else
														if("ref" in so && so.ref.obj == pg.id) {
															theLogger.warn(dm.getDocType() + "例外 - 簽核物件(ID:" + so.id + ")位於此頁(#" + pg.po + ")的簽核區域內(Type:" + sa.saType + ",ID:" + sa.id + ")內(offset:" + so.offset.x + "," + so.offset.y + ")");
														}
													}
													else {	// 2017.3.24 判斷是否為本流程新增簽核物件, 是則檢核是否需跟著簽核區域移動頁次, FDA-序3295
														// 1131230 Raymond 1131318 修正XSignObjs.xml有不存在SignWork.xml中的簽核物件時, 會發生Error導致無法關閉公文等問題
														if("ref" in so && !so.ref) {
															theLogger.error("XSignObjs.xml中記錄的'" + so.id + "'簽核物件未記錄在SignWork.xml中, 無法顯示此簽核物件於頁面上");
															if(!!so.id && so.id.match(/X_\d+/)) {
																theLogger.error("從XSignObjs.xml中移除此ID(" + so.id + ")的簽核物件記錄");
																v.xSignObjs.splice(i, 1);
																--i;
																break;
															}
														}
														else
														if("ref" in so && (so.ref.sessionNew || so.ref.type.match(/^stamp/) || so.ref.type == "text" || so.ref.type == "sketch")) {
															if(so.ref.boundTo != pg) {	// 此簽核物件原來在別頁
																theLogger.warn("本流程新增的框內簽核物件(ID:" + so.ref.id + ")從頁#" + so.ref.boundTo.po + "移至此頁(#" + pg.po + ")");
																var srcPg = so.ref.boundTo;
																so.ref.boundTo = pg;
																pg.newSignObjs.push(so.ref);	// 改移至此頁
																var soInNSOs = srcPg.newSignObjs.indexOf(so.ref);
																try {
																	srcPg.newSignObjs.splice(soInNSOs, 1);
																}
																catch(e) {
																	theLogger.error("應移動的簽核物件位於#" + srcPg.po + "頁的第" + soInNSOs + "個索引位置, 但splice()失敗! " + e.message);
																}
															}
															else
																theLogger.warn("本流程新增的框內簽核物件(ID:" + so.ref.id + ")位於此頁");
															// 1121117 Raymond 1120881 執行"取消勾選"保留簽署物件後時, 若觸發簽核區域高度恢復為預設值, 則判斷是否有目前流程點加蓋的簽核物件因簽核區域高度變小而變成在簽核區域外, 有則提示警告訊息
															if(dm.isSALPresumed()) {
																if(so.ref.offset.top > sa.height)
																	soOOR = true;
															}
														}
														else {
															theLogger.warn("簽核物件(ID:" + so.id + ")位於此頁(#" + pg.po + ")的簽核區域內(Type:" + sa.saType + ",ID:" + sa.id + ")內(offset:" + so.offset.x + "," + so.offset.y + ")");
														}
													}
												}
												else {	// 2017.3.24 簽核區域位於別頁, 檢核本流程新增的簽核物件是否應由此頁移至簽核框所在頁次, FDA-序3295
													// 1131230 Raymond 1131318 修正XSignObjs.xml有不存在SignWork.xml中的簽核物件時, 會發生Error導致無法關閉公文等問題
													if("ref" in so && !so.ref) {
														theLogger.error("XSignObjs.xml中記錄的'" + so.id + "'簽核物件未記錄在SignWork.xml中, 無法顯示此簽核物件於頁面上");
														if(!!so.id && so.id.match(/X_\d+/)) {
															theLogger.error("從XSignObjs.xml中移除此ID(" + so.id + ")的簽核物件記錄");
															v.xSignObjs.splice(i, 1);
															--i;
															break;
														}
													}
													else
													if("ref" in so && (so.ref.sessionNew || so.ref.type.match(/^stamp/) || so.ref.type == "text" || so.ref.type == "sketch")) {
														if(sa.po < pg.container.draftPages.pages.length) {
															var toPg = pg.container.draftPages.pages[sa.po];
															if(so.ref.boundTo != toPg) {
																theLogger.warn("本流程新增的框內簽核物件(ID:" + so.ref.id + ")從此頁(#" + pg.po + ")移至#" + sa.po);
																var srcPg = so.ref.boundTo;
																so.ref.boundTo = toPg;
																toPg.newSignObjs.push(so.ref);	// 改移至此頁
																so.ref.signArea = sa;	// 簽核區域改為頁次異動後的
																var soInNSOs = srcPg.newSignObjs.indexOf(so.ref);
																try {
																	srcPg.newSignObjs.splice(soInNSOs, 1);
																}
																catch(e) {
																	theLogger.error("應移動的簽核物件位於#" + srcPg.po + "頁的第" + soInNSOs + "個索引位置, 但splice()失敗! " + e.message);
																}
															}
															else
																theLogger.warn("本流程新增的框內簽核物件(ID:" + so.ref.id + ")已移至#" + sa.po);
															// 1121117 Raymond 1120881 執行"取消勾選"保留簽署物件後時, 若觸發簽核區域高度恢復為預設值, 則判斷是否有目前流程點加蓋的簽核物件因簽核區域高度變小而變成在簽核區域外, 有則提示警告訊息
															if(dm.isSALPresumed()) {
																if(so.ref.offset.top > sa.height)
																	soOOR = true;
															}
														}
														else {
															theLogger.error("簽核框頁次超過此文稿總頁數, 無法將簽核物件(ID:" + so.ref.id + ")移至簽核框所在頁次#" + sa.po);
														}
													}
												}
												break;	// break for-j-loop
											}
										}
									}
									else {// 調閱非動態產生文稿頁面, 無signAreas, 要改從外部簽核物件記錄檔的目前版本記錄中讀取
										for(var j=0; j<v.xSignAreas.length; j++) {
											var sa = v.xSignAreas[j];
											if(toSAType(so.saType) == toSAType(sa.saType) &&
												so.saID == sa.saID && sa.pgIdx == pg.po) {	// 目前版本的簽框區域位於此頁
												theLogger.warn("簽核物件(ID:" + so.id + ")位於此頁(pgId:" + pg.id + ")的簽核區域(saType:" + sa.saType + ", saID:" + sa.saID + ")內");
											}
										}
									}
								}
								else if(so.type == "B") {	// 簽核框外物件, 且為當前版本時, 找此簽核物件所在頁次相符即顯示
									if(pg.po == so.pgIdx) {
										if(pg.container.dirty())
											theLogger.warn("簽核區域外簽核物件(ID:" + so.id + ")位於此頁(po:" + pg.po + "), 由於文稿內容已異動故不顯示");
										else {
											theLogger.warn("簽核物件(ID:" + so.id + ")位於此頁(po:" + pg.po + ")");
										}
									}
								}
							}
						}
						// 1121117 Raymond 1120881 執行"取消勾選"保留簽署物件後時, 若觸發簽核區域高度恢復為預設值, 則判斷是否有目前流程點加蓋的簽核物件因簽核區域高度變小而變成在簽核區域外, 有則提示警告訊息
						if(soOOR) {
							setTimeout(function() {
								alert("因不保留簽署物件，簽核區域恢復為預設高度，使本流程稍早已加蓋於簽核區域內的簽核物件位置變為簽核區域外，\n請重新調整這些簽核物件的位置。");
							}, 100);
							dm.clearSALPresumed();
						}
					}
				}
			}
		}
		if("newSignObjs" in pg)
		{
			var autoStampExists = false, autoTxNoteExists = false;
			var lateLinkCmts = [], candiCmts = [];	// 2017.3.29 新增延後連結連動代字的職名章, 2017.3.30 新增未連結的代字章
			// 重建(暫存)新增的簽核物件
			$.each(pg.newSignObjs, function(i, so) {
				theLogger.log("暫存檔的簽核物件 - " + (i+1));
				theLogger.log(so);
				if("type" in so) {
					if(so.type.match(/^stamp/)) {	// 章戳有圖檔章戳(stamp)、文字章戳(stamp.text)、職名章(stamp.signet)三種
						// 2015.5.8 新增, 若指定簽核區域, 則尋找符合的SignArea設定到so
						if("saType" in so && so.saType != "") {
							/*$.each(_memPPD[_currPo.draftIdx].signAreas, function(i, signArea) {
								if(signArea.saType == so.saType && signArea.id == so.saID && signArea.po == _currPo.po) {
									so.signArea = signArea;
									return false;
								}
							});*/
							// 2017.2.20 bugfix for 編輯內文致簽核框跳頁, 簽核物件會因頁次不一致而未關聯到新signArea導致轉圈圈的問題
							for(var j=0; j<dm.signAreas.length; j++) {
								if(dm.signAreas[j].saType == so.saType && dm.signAreas[j].id == so.saID) {
									if(dm.dirty() || !so.signArea ||
										dm.getDocType() != "簽稿會核單" || so.signArea.po == dm.signAreas[j].po) {	// 未異動時才能用頁次區別同類型同ID的簽核區域(為了迴避簽稿會核單的異常)
										so.signArea = dm.signAreas[j];
										break;
									}
								}
							}
						}
						var cmt = new Stamp(so);
						if(so.auto)
							cmt.initiateSO($pg, {bound: false, alpha: 150});	// 2015.8.21 自動加蓋的職名章以半透明顯示
						else
							cmt.initiateSO($pg, {bound: false});
						//if(so.auto == true)	// 自動加蓋的職名章, 2015.5.27 只要有職名章就不需自動加蓋
						if(so.type == "stamp.signet")
							autoStampExists = true;
						/* 1090312 Raymond 1081105 新增選用章戳(文字意見、圖檔)可連動職名章功能, 移至全部簽核物件都新增完再連結
						// 2017.3.29 職名章連動代字
						if("linkSOID" in so) {
							var linked = false;	// 2017.3.30 若代字章先inital完, 再輪到職名章時, 巡candiCmts找出應連動的代字章連結
							for(var j=0; j<candiCmts.length; j++) {
								if(candiCmts[j].so.id == so.linkSOID) {
									theLogger.warn("連結代字(ID:" + candiCmts[j].so.id + ")到職名章(ID:" + so.id + ")");
									so.linkCmt = candiCmts[j];
									linked = true;
								}
							}
							if(!linked)	// 代字章未initial的話, 則將先inital完的職名章放進lateLinkCmts
								lateLinkCmts.push(cmt);
						}
						else {
							var linked = false;
							for(var j=0; j<lateLinkCmts.length; j++) {	// 代字章在職名章initial後, 則巡lateLinkCmts找出應連動的職名章連結
								if(lateLinkCmts[j].so.linkSOID == so.id) {
									theLogger.warn("連結代字(ID:" + so.id + ")到職名章(ID:" + lateLinkCmts[j].so.id + ")");
									lateLinkCmts[j].so.linkCmt = cmt;
									linked = true;
								}
							}
							if(!linked && so.type == "stamp.text" && so.content == "代") {	// 2017.3.30 未連結的代字章戳放進candiCmts, 等下一個職名章有設定連動物件ID時, 巡candiCmts找出已initial的代字章物件來連結
								candiCmts.push(cmt);
							}
						}*/
					}
					// 1130314 Raymond 1130050 新增支援貼布物件
					//else if(so.type == "sketch") {
					else if(so.type.match(/^sketch/)) {
						// 2015.5.29 新增, 若指定簽核區域, 則尋找符合的SignArea設定到so
						if("saType" in so && so.saType != "") {
							/*$.each(_memPPD[_currPo.draftIdx].signAreas, function(i, signArea) {
								if(signArea.saType == so.saType && signArea.id == so.saID && signArea.po == _currPo.po) {
									so.signArea = signArea;
									return false;
								}
							});*/
							// 2017.2.20 bugfix for 編輯內文致簽核框跳頁, 簽核物件會因頁次不一致而未關聯到新signArea導致轉圈圈的問題
							for(var j=0; j<dm.signAreas.length; j++) {
								if(dm.signAreas[j].saType == so.saType && dm.signAreas[j].id == so.saID) {
									if(dm.dirty() || !so.signArea ||
										dm.getDocType() != "簽稿會核單" || so.signArea.po == dm.signAreas[j].po) {	// 未異動時才能用頁次區別同類型同ID的簽核區域(為了迴避簽稿會核單的異常)
										so.signArea = dm.signAreas[j];
										break;
									}
								}
							}
						}
						// 1130314 Raymond 1130050 新增支援貼布物件
						if(so.type == "sketch.tape") {
							var cmt = new EraserTape(so);
							cmt.initiateSO($pg, {bound: false});
						}
						else {
						var cmt = new SketchComment(so);
						cmt.initiateSO($pg, {bound: false});
						}
					}
					else if(so.type == "text") {
						// 2015.5.27 新增, 若指定簽核區域, 則尋找符合的SignArea設定到so
						if("saType" in so && so.saType != "") {
							/*$.each(_memPPD[_currPo.draftIdx].signAreas, function(i, signArea) {
								if(signArea.saType == so.saType && signArea.id == so.saID && signArea.po == _currPo.po) {
									so.signArea = signArea;
									return false;
								}
							});*/
							// 2017.2.20 bugfix for 編輯內文致簽核框跳頁, 簽核物件會因頁次不一致而未關聯到新signArea導致轉圈圈的問題
							for(var j=0; j<dm.signAreas.length; j++) {
								if(dm.signAreas[j].saType == so.saType && dm.signAreas[j].id == so.saID) {
									if(dm.dirty() || !so.signArea ||
										dm.getDocType() != "簽稿會核單" || so.signArea.po == dm.signAreas[j].po) {	// 未異動時才能用頁次區別同類型同ID的簽核區域(為了迴避簽稿會核單的異常)
										so.signArea = dm.signAreas[j];
										break;
									}
								}
							}
						}
						var cmt = new TextComment(so);
						cmt.initiateSO($pg, {bound: false});
						if(so.auto == true)	// 自動加蓋的文字意見
							autoTxNoteExists = true;
						
						// 1100517 Raymond 1100298 新增取代他流程文字意見功能
						if(!!so.substObjId) {
							theLogger.log("搜尋被取代的他流程文字意見(ID:" + so.substObjId + ")");
							var $substObj = $pg.find(".so-text").filter(function() {
								return ($(this).attr("data-id") == so.substObjId);
							});
							if($substObj.length) {
								if($substObj.length == 1)
									$substObj.hide();
								else
									theLogger.error("應被取代的他流程文字意見(ID:" + so.substObjId + ")有" + $substObj.length + "個, 無法確定要隱藏哪一個");
							}
							else
								theLogger.error("同一頁找不到應被取代的他流程文字意見(ID:" + so.substObjId + ")");
						}
					}
					else {
						theLogger.warn("未支援的簽核物件! type:'" + so.type + "'");
					}
					// 1090312 Raymond 1081105 新增選用章戳可連動職名章功能, 所有新增的簽核物件Cmt記錄下來, $.each()完再連結
					if(!!cmt)
						candiCmts.push(cmt);
				}
				else
					theLogger.warn("簽核物件資訊錯誤, 無type!");
			});
			// 1090312 Raymond 1081105 新增選用章戳可連動職名章功能
			for(var i=0, n=candiCmts.length; i<n; i++) {
				var so = candiCmts[i].so;
				if(!!so.linkSOID) {
					for(var j=0; j<n; j++) {
						if(candiCmts[j].so.id == so.linkSOID) {
							if(j == i)
								theLogger.error("連結自己?這不可能吧");
							else {
								theLogger.warn("連結代字(ID:" + candiCmts[j].so.id + ")到職名章(ID:" + so.id + ")");
								so.linkCmt = candiCmts[j];
								candiCmts[j].so.followCmt = candiCmts[i];
								break;
							}
						}
					}
				}
			}
			
			//2016.9.19	Leslie	新增disableSave模式，亦不可自動加蓋職名章
			//if(!_model.readOnly() &&												// 2015.9.17 新增唯讀模式不要自動加蓋職名章, 2015.10.15 改依FolioModel.readOnly()判定
			if(!_model.readOnly() && !_model.disableSave() && 
				_shouldAutoInsertSignet() && !autoStampExists &&					// 2015.5.27 文字意見與自動職名章一起加蓋
				_currPo.attIdx < 0 && "signAreas" in _memPPD[_currPo.draftIdx]) {	// 本文才能自動加蓋文字意見與職名章
				
				// 自動加蓋職名章, 2015.5.27 提前判斷是否自動加蓋職名章
				//if(_shouldAutoInsertSignet() && !autoStampExists) {
					
				// 尋找合適的SignArea
				// 2016.9.30 依AOL實作修正搜尋合適簽核區域的邏輯
				var signAreaInPage = undefined;
				$.each(_memPPD[_currPo.draftIdx].signAreas, function(i, signArea) {
					if(signArea.saType == "2") {	// 單位, 2016.10.26 FIX for 鐵工局複雜簽核框要單位優先於決行
						if(_model.getDocObj().ownOUId == signArea.id && signArea.po == _currPo.po) {
							theLogger.log("此頁有'" + signArea.id + "'單位的簽核區域可自動加蓋職名章");
							signAreaInPage = signArea;
							return false;
						}
					}
					else if(signArea.saType == "0") {	// 群組
						if(_model.getDocObj().ownOUId.substr(0, 2) >= 95) {	// 決行
							if(signArea.id == "決行" && signArea.po == _currPo.po) {
								theLogger.log("此頁有'決行'群組的簽核區域可自動加蓋職名章");
								signAreaInPage = signArea;
								//return false;	// 2016.10.26 FIX for 鐵工局複雜簽核框要單位優先於決行
							}
						}
						else if(_model.getDocObj().ownOUId.substr(0, 2) == _model.getDocObj().ICOUId.substr(0, 2)) {	// 承辦單位
							if(signArea.id == "承辦單位" && signArea.po == _currPo.po) {
								theLogger.log("此頁有'承辦單位'群組的簽核區域可自動加蓋職名章");
								signAreaInPage = signArea;
								return false;
							}
						}
						else if(_model.getDocObj().ownOUId.substr(0, 2) < 90) {	// 非虛擬單位(總收、總發...)的非承辦單位即為會辦單位
							if(signArea.id == "會辦單位" && signArea.po == _currPo.po) {
								theLogger.log("此頁有'會辦單位'群組的簽核區域可自動加蓋職名章");
								signAreaInPage = signArea;
								return false;
							}
						}
					}
					else if(signArea.saType == "1") {	// 角色
						if(_model.getDocObj().ownRoleId == signArea.id && signArea.po == _currPo.po) {
							theLogger.log("此頁有'" + signArea.id + "'角色的簽核區域可自動加蓋職名章");
							signAreaInPage = signArea;
							return false;
						}
					}
					else if(signArea.saType == "3") {	// 覆閱(補呈), 二代新增for鐵工局需求
						if(_model.getDocObj().folder == "待處理" &&
							(_model.getDocObj().subfolder == "待複閱" || _model.getDocObj().subfolder == "待補呈")
							&& signArea.po == _currPo.po) {
							theLogger.log("此頁有'" + _model.getDocObj().subfolder + "'的簽核區域可自動加蓋職名章");
							signAreaInPage = signArea;
							return false;
						}
					}
				});
				if(signAreaInPage) {
					
					if(theAOL.signetBox.length == 0) {	// 2016.10.26 FIX
						theLogger.warn("應自動加蓋職名章但使用者無職名章設定!");
					}
					else {
						var now = Util.now();
						var stamp = theAOL.signetBox[0];	// 預設加蓋第1個職名章, 2016.10.26 移至自動加蓋文字意見前, 因自動加蓋文字意見需要判斷剩餘空間夠不夠蓋職名章
						// 1060911 Raymond 1060764 支援職名章的autoPress屬性設定
						for(var i=0; i<theAOL.signetBox.length; i++) {
							if("autoPress" in theAOL.signetBox[i] && theAOL.signetBox[i].autoPress == "true") {
								theLogger.warn("預設職名章為#" + i + ":'" + theAOL.signetBox[i].title + "'");
								stamp = theAOL.signetBox[i];
								break;
							}
						}
						var $viewPort = $pg.closest(".viewPort"),
							// 1130912 Raymond 中榮序236 縮放比縮小自動蓋章變往上位移, 放大變往下位移, 改成固定100%, 不要用實際的縮放比
							//z = $viewPort.data("zoomController");   // 如果有縮放控制的話要套用
							z = {currScale: 100};
						// 1081230 Raymond 1081089 若縮放比控制項未初始化完成, 則改抓localStorage記憶的前次設定的縮放比為預設值
						if(!z) {
							z = {currScale: 100};
							if($viewPort.closest("#leftPart").length > 0) {
								if("zoomController_zoomControl1" in localStorage &&
									typeof localStorage["zoomController_zoomControl1"] === "string" &&
									localStorage["zoomController_zoomControl1"].match(/\d+/)) {
									theLogger.warn("縮放比控制項未初始化完成, 從本地暫存區恢復上次記憶的縮放比[" + localStorage["zoomController_zoomControl1"] + "]");
									z.currScale = Math.max(50, Math.min(400, parseInt(localStorage["zoomController_zoomControl1"])));	// 縮放比應該在50~400之間
								}
							}
							else if($viewPort.closest("#rightPart").length > 0) {
								if("zoomController_zoomControl2" in localStorage &&
									typeof localStorage["zoomController_zoomControl2"] === "string" &&
									localStorage["zoomController_zoomControl2"].match(/\d+/)) {
									theLogger.warn("縮放比控制項未初始化完成, 從本地暫存區恢復上次記憶的縮放比[" + localStorage["zoomController_zoomControl2"] + "]");
									z.currScale = Math.max(50, Math.min(400, parseInt(localStorage["zoomController_zoomControl2"])));	// 縮放比應該在50~400之間
								}
							}
						}
						
						// 自動加蓋文字意見
						var envAutoTxNote = theSSO.User.EnvSettings.get('OD_AOL_AUTO_TEXTNOTE');	// 2015.6.16 環境變數以變數表示
						var autoTxNoteAdded = false;
						if(envAutoTxNote != "N" && !autoTxNoteExists) {
							
							if("dir" in signAreaInPage && signAreaInPage.dir == 1)// 2016.9.30 改成由樣版指定個別簽核框的自動蓋章方向
								theLogger.log("自動加蓋文字意見(由左至右)於 " + signAreaInPage.mostRightTop.x2 + "," + signAreaInPage.mostRightTop.y2 + "(相對簽核區域座標:" + signAreaInPage.mostRightTop.x + "," + signAreaInPage.mostRightTop.y + ")...");
							else
								theLogger.log("自動加蓋文字意見(由上至下)於 " + signAreaInPage.mostLeftBottom.x2 + "," + signAreaInPage.mostLeftBottom.y2 + "(相對簽核區域座標:" + signAreaInPage.mostLeftBottom.x + "," + signAreaInPage.mostLeftBottom.y + ")...");
							//var now = Util.now();
							var str = "";	// 預設文字意見字串
							var soTx = {
								id: soBuilder.getNewID(),
								type: "text",
								orient: "橫書",
								cTime: now,
								pos: {//left: Math.ceil(txNoteLeft),// - (($pg.offset().left - $viewPort.offset().left) * 100 / ((z !== undefined)?z.currScale:100)),
									  //top: Math.ceil(lastTxNoteBottomABS)// - (($pg.offset().top - $viewPort.offset().top) * 100 / ((z !== undefined)?z.currScale:100))	2015.6.16 改用lastTxNoteBottomABS當作全頁座標, lastTxNoteBottom是相對於簽核框的座標
									 },
								content: str,
								fontName: "細明體",
								fontSize: "12pt",		// 應用記憶的值
								fontWeight: false,		// 應用記憶的值
								fontStyle: false,		// 應用記憶的值
								color: _model.getUserColor(),
								asIcon: true,			// 以圖示顯示
								boundTo: $pg.data("pg"),
								saType: signAreaInPage.saType,		// 2015.5.7 新增, 指定簽核區域類型為0-"群組", 2016.9.30 改讀簽核框的類型
								saID: signAreaInPage.id,			// 2015.5.7 新增, 指定簽核區域ID為"承辦單位", 2016.9.30 改讀簽核框的id
								offset: {					// 2015.5.27 新增, 指定位於簽核區域內的相對座標
									//left: txNoteLeft - (signAreaInPage.$area.offset().left - $pg.offset().left),		// 2015.10.12 從position()改成offset()差距
									//top: lastTxNoteBottom/* - signAreaInPage.$area.parent().position().top*/	// 2015.10.2 lastTxNoteBottom改為相對位置, 不需要扣除簽核區域的position()
									},
								signArea: signAreaInPage,	// 2015.5.27 新增, 指定簽核區域, initiateSO()時會insert到此區域的$area元素內
								auto: true				// 自動加蓋的
							};
							soTx.info = soBuilder.makeSOInfo(soTx.id, soTx.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
							// 2016.9.23 新增由左至右自動加蓋職名章
							// 2016.9.30 改成由樣版指定個別簽核框的自動蓋章方向
							if("dir" in signAreaInPage && signAreaInPage.dir == 1) {
								if(signAreaInPage.nextSignPos.lastStamp) {	// 2016.10.26 有職名章, 要在前一個職名章的左邊
									soTx.pos.left = Math.ceil((signAreaInPage.nextSignPos.x2 - 13.5) * z.currScale / 100);
									soTx.offset.left = Math.ceil((signAreaInPage.nextSignPos.x - 13.5) * z.currScale / 100);
								}
								else {
									soTx.pos.left = Math.ceil((signAreaInPage.nextSignPos.x2 + 18.5) * z.currScale / 100);
									soTx.offset.left = Math.ceil((signAreaInPage.nextSignPos.x + 18.5) * z.currScale / 100);
								}
								soTx.pos.top = Math.ceil((signAreaInPage.nextSignPos.y2 + 18.5) * z.currScale / 100);
								soTx.offset.top = Math.ceil((signAreaInPage.nextSignPos.y + 18.5) * z.currScale / 100);
								if(soTx.pos.left + (stamp.size.w * pg.container.pageExt.width / 2480) > signAreaInPage.left + signAreaInPage.width) {	// 換行
									theLogger.log("簽核區域右方空間不足, 換行至左側下方加蓋文字意見");
									soTx.pos.left = Math.ceil((signAreaInPage.mostLeftBottom.x2 + 18.5) * z.currScale / 100);
									soTx.pos.top = Math.ceil((signAreaInPage.mostLeftBottom.y2 + 18.5) * z.currScale / 100);
									soTx.offset.left = Math.ceil((signAreaInPage.mostLeftBottom.x + 18.5) * z.currScale / 100);
									soTx.offset.top = Math.ceil((signAreaInPage.mostLeftBottom.y + 18.5) * z.currScale / 100);
								}
							}
							else {	// 否則由上至下自動加蓋文字意見
								if(signAreaInPage.nextSignPos.lastStamp) {	// 2016.10.26 有職名章, 要蓋在前一個職名章位置的左邊
									soTx.pos.left = Math.ceil((signAreaInPage.nextSignPos.x2 - 13.5) * z.currScale / 100);
									soTx.offset.left = Math.ceil((signAreaInPage.nextSignPos.x - 13.5) * z.currScale / 100);
								}
								else {
									soTx.pos.left = Math.ceil((signAreaInPage.nextSignPos.x2 + 18.5) * z.currScale / 100);
									soTx.offset.left = Math.ceil((signAreaInPage.nextSignPos.x + 18.5) * z.currScale / 100);
								}
								soTx.pos.top = Math.ceil((signAreaInPage.nextSignPos.y2 + 18.5) * z.currScale / 100);
								soTx.offset.top = Math.ceil((signAreaInPage.nextSignPos.y + 18.5) * z.currScale / 100);
								if(soTx.pos.top + (stamp.size.h * pg.container.pageExt.height / 3507) > signAreaInPage.top + signAreaInPage.height) {	// 換行
									// 1130422 Raymond 1120881 自動加蓋貼式文字意見時, 若文稿樣版(Template及PrintXSL都要支援)支援簽核區域自動增高功能, 則簽核區域下方空間不足時不要換行, 而是自動增高簽核區域
									if(!!dm && dm.supportSALP()) {
										theLogger.log("文稿樣版支援簽核區域自動增高, 故自動加蓋貼式文字意見時即使簽核區域下方空間不足, 亦不換行");
									}
									else {
									theLogger.log("簽核區域下方空間不足, 換行至右側上方加蓋文字意見");
									soTx.pos.left = Math.ceil((signAreaInPage.mostRightTop.x2 + 18.5) * z.currScale / 100);
									soTx.pos.top = Math.ceil((signAreaInPage.mostRightTop.y2 + 18.5) * z.currScale / 100);
									soTx.offset.left = Math.ceil((signAreaInPage.mostRightTop.x + 18.5) * z.currScale / 100);
									soTx.offset.top = Math.ceil((signAreaInPage.mostRightTop.y + 18.5) * z.currScale / 100);
									}
								}
							}
							var cmtTx = new TextComment(soTx);
							cmtTx.initiateSO($pg);
							autoTxNoteAdded = true;
						}
						
						//var now = Util.now();
						//var stamp = theAOL.signetBox[0];	// 預設加蓋第1個職名章?
						var so = {
							id: soBuilder.getNewID(),
							type: "stamp.signet",
							orient: "橫書",
							cTime: now,
							pos: {//left: Math.ceil(signetLeft),// - (($pg.offset().left - $viewPort.offset().left) * 100 / ((z !== undefined)?z.currScale:100)),
								  //top: Math.ceil(lastSignetBottomABS)// - (($pg.offset().top - $viewPort.offset().top) * 100 / ((z !== undefined)?z.currScale:100))	2015.6.16 改用lastSignetBottomABS當作全頁座標, lastSignetBottom是相對於簽核框的座標
								 },
							boundTo: $pg.data("pg"),
							saType: signAreaInPage.saType,		// 2015.5.7 新增, 指定簽核區域類型為0-"群組", 2016.9.30 改讀簽核框的類型
							saID: signAreaInPage.id,			// 2015.5.7 新增, 指定簽核區域ID為"承辦單位", 2016.9.30 改讀簽核框的id
							offset: {					// 2015.5.7 新增, 指定位於簽核區域內的相對座標
								//left: signetLeft - (signAreaInPage.$area.offset().left - $pg.offset().left),		// 2015.10.12 從position()改成offset()差距
								//top: lastSignetBottom/* - signAreaInPage.$area.parent().position().top*/	// 2015.10.2 lastSignetBottom改為相對位置, 不需要扣除簽核區域的position()
								},
							signArea: signAreaInPage,	// 2015.5.7 新增, 指定簽核區域, initiateSO()時會insert到此區域的$area元素內
							auto: true				// 自動加蓋的
						};
						so.info = soBuilder.makeSOInfo(so.id, so.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
						// 2016.9.23 新增由左至右自動加蓋職名章
						// 2016.9.30 改成由樣版指定個別簽核框的自動蓋章方向
						if("dir" in signAreaInPage && signAreaInPage.dir == 1) {
							if(signAreaInPage.nextSignPos.lastStamp) {	// 2016.10.26 有職名章, 要在前一個職名章的右邊
								so.pos.left = Math.ceil((signAreaInPage.nextSignPos.x2 + (autoTxNoteAdded?34.5:2.5)) * z.currScale / 100);
								so.offset.left = Math.ceil((signAreaInPage.nextSignPos.x + (autoTxNoteAdded?34.5:2.5)) * z.currScale / 100);
							}
							else {
								so.pos.left = Math.ceil((signAreaInPage.nextSignPos.x2 + (autoTxNoteAdded?34.5:2.5)) * z.currScale / 100);
								so.offset.left = Math.ceil((signAreaInPage.nextSignPos.x + (autoTxNoteAdded?34.5:2.5)) * z.currScale / 100);
							}
							so.pos.top = Math.ceil(signAreaInPage.nextSignPos.y2 * z.currScale / 100);
							so.offset.top = Math.ceil(signAreaInPage.nextSignPos.y * z.currScale / 100);
							if(so.pos.left + (stamp.size.w * pg.container.pageExt.width / 2480) > signAreaInPage.left + signAreaInPage.width) {	// 換行
								theLogger.log("簽核區域右方空間不足, 換行至左側下方加蓋職名章");
								so.pos.left = Math.ceil((signAreaInPage.mostLeftBottom.x2 + (autoTxNoteAdded?34.5:2.5)) * z.currScale / 100);
								so.pos.top = Math.ceil((signAreaInPage.mostLeftBottom.y2 + 2.5) * z.currScale / 100);
								so.offset.left = Math.ceil((signAreaInPage.mostLeftBottom.x + (autoTxNoteAdded?34.5:2.5)) * z.currScale / 100);
								so.offset.top = Math.ceil((signAreaInPage.mostLeftBottom.y + 2.5) * z.currScale / 100);
							}
						}
						else {	// 否則由上至下自動加蓋職名章
							if(signAreaInPage.nextSignPos.lastStamp) {	// 2016.10.26 有職名章, 要在前一個職名章的正下方
								so.pos.left = Math.ceil(signAreaInPage.nextSignPos.x2 * z.currScale / 100);
								so.offset.left = Math.ceil(signAreaInPage.nextSignPos.x * z.currScale / 100);
							}
							else {
								so.pos.left = Math.ceil((signAreaInPage.nextSignPos.x2 + (autoTxNoteAdded?34.5:2.5)) * z.currScale / 100);
								so.offset.left = Math.ceil((signAreaInPage.nextSignPos.x + (autoTxNoteAdded?34.5:2.5)) * z.currScale / 100);
							}
							so.pos.top = Math.ceil((signAreaInPage.nextSignPos.y2 + 2.5) * z.currScale / 100);
							so.offset.top = Math.ceil((signAreaInPage.nextSignPos.y + 2.5) * z.currScale / 100);
							if(so.pos.top + (stamp.size.h * pg.container.pageExt.height / 3507) > signAreaInPage.top + signAreaInPage.height) {	// 換行
								// 1130418 Raymond 1120881 自動加蓋職名章時, 若文稿樣版(Template及PrintXSL都要支援)支援簽核區域自動增高功能, 則簽核區域下方空間不足時不要換行, 而是自動增高簽核區域
								if(!!dm && dm.supportSALP()) {
									theLogger.log("文稿樣版支援簽核區域自動增高, 故自動加蓋職名章時即使簽核區域下方空間不足, 亦不換行");
								}
								else {
								theLogger.log("簽核區域下方空間不足, 換行至右側上方加蓋職名章");
								so.pos.left = Math.ceil((signAreaInPage.mostRightTop.x2 + (autoTxNoteAdded?34.5:2.5)) * z.currScale / 100);
								so.pos.top = Math.ceil((signAreaInPage.mostRightTop.y2 + 2.5) * z.currScale / 100);
								so.offset.left = Math.ceil((signAreaInPage.mostRightTop.x + (autoTxNoteAdded?34.5:2.5)) * z.currScale / 100);
								so.offset.top = Math.ceil((signAreaInPage.mostRightTop.y + 2.5) * z.currScale / 100);
								}
							}
						}
						
						//回傳是否加蓋時戳
						if(true)	// TODO: 應用記憶值
							so.dispTime = true;
						
						if(typeof stamp.fileInfo !== "undefined") { // 影像檔章戳
							so.content = stamp.data;
							so.size = {width: (stamp.size.w / 10) + "mm", height: (stamp.size.h / 10) + "mm"};
							so.color = {r: stamp.color.r, g: stamp.color.g, b: stamp.color.b};
						}
						else {  // 文字章戳
							throw new Error("職名章有文字式的嗎?");
						}
						var cmt = new Stamp(so);
						// 1130422 Raymond 1120881 需重新整理時不要直接refresh/goToPage, 等代字加蓋後再refresh/goToPage
						var needRefresh = undefined;
						if(theAOL.docObj.ownUserId != theSSO.User.account)
							needRefresh = cmt.initiateSO($pg, {alpha: 150, retNeedRefresh: true});
						else
						cmt.initiateSO($pg, {alpha: 150});	// 2015.5.14 自動加蓋職名章以半透明顯示
						
						//2017.2.23	Leslie	代理簽辦公文時，自動加上"代"字
						if(theAOL.docObj.ownUserId != theSSO.User.account){
							var stampExt = {
								w: cmt.$so.width(),
								h: cmt.$so.height()
							}
							// 代字是固定樣式
							var so2 = {
								id: soBuilder.getNewID(),
								type: "stamp.text",			// stamp:選用章戳(圖檔), stamp.text:選用章戳(文字)
								orient: "橫書",
								cTime: now,
								//pos: that.anchorPt,   // anchorPt是相對於viewPort的座標
								boundTo: $pg.data("pg"),
								sessionNew: true,		// 2015.8.21 新增標記此簽核物件為本階段新增
								content: "代",
								fontName: "標楷體",
								fontSize: "18pt",
								color: {r: 0, g: 0, b: 0},	// 2016.11.17 FDA要求代字用黑色
								auto: true				// 自動加蓋的
							};
							so2.info = soBuilder.makeSOInfo(so2.id, so2.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
							so2.pos = {
								left: so.pos.left + stampExt.w,
								top: so.pos.top + stampExt.h - 30};
							var cmt = new Stamp(so2);
							cmt.initiateSO($pg, {alpha: 150});	//自動加蓋以半透明顯示
							
							// 2017.3.29 職名章移動連帶移動代字
							so.linkSOID = so2.id;
							so.linkCmt = cmt;
							
							// 1130422 Raymond 1120881 判斷需重新整理時, 在蓋完代字章後再重新整理
							if(!!needRefresh && needRefresh.refresh == true) {
								if(needRefresh.goNextPage == true) {
									let fv = $pg.closest(".viewPort").data("view");
									fv.goToPage(fv.currPo() + 1);
								}
								else
									$pg.closest(".pages").flip("refresh");
							}
						}
					}
				}
			}
		}
	}
	
	// 1141107 Raymond 1141113 新增顯示便利貼
	function buildNote($pg, pg, dm) {
		function allowShow(note) {
			let ownOUId = _model.getDocObj().get("ODWMSG", "OWN_OU_ID");
			if(ownOUId == "92") {
				theLogger.debug("目前流程點單位為總發, 允許顯示所有便利貼意見");
				return true;
			}
			else if(ownOUId.substr(0, 2) == note.departID.substr(0, 2)) {
				theLogger.debug("目前流程點與此便利貼單位為相同一級單位, 允許顯示");
				return true;
			}
			theLogger.debug("目前流程點既非總發, 亦非此便利貼同個一級單位, 不允許顯示");
			return false;
		}
		function createNote(note, $slot) {
			// 1141224 Raymond 1141652 修改便利貼項目顯示內容
			//$("<li><div>" + note.userName.substr(0, 5) + "</div></li>").on("dblclick", note, function(evt) {
			$("<li><div>" + note.userName.substr(0, 5) + "<br>" + note.content.substr(0, 5) + ((note.content.length > 5)?"<br>" + note.content.substr(5, 3) + ((note.content.length > 8)?"...":""):"") + "</div></li>").on("dblclick", note, function(evt) {
				let note = evt.data,
					thisLi = this;
				
				// 2016.3.16 新增預設字型大小及字型採用環境變數值
				var strFont = theSSO.User.EnvSettings.get('AOL_TEXTOBJECT_FONT'),
					defFont = "標楷體", defSize = 14, defBold = false;
				if(strFont.length > 0) {
					// parse xml
					var domFont = (new DOMParser()).parseFromString(strFont, "text/xml");
					var fontName = domFont.documentElement.attributes['font_name'];
					if(fontName && fontName.nodeValue.length > 0)
						defFont = fontName.nodeValue;
					var fontSize = domFont.documentElement.attributes['size'];
					if(fontSize && fontSize.nodeValue.length > 0 && fontSize.nodeValue.match(/\d+/))
						defSize = fontSize.nodeValue;
					var fontBold = domFont.documentElement.attributes['bold'];
					if(fontBold && fontBold.nodeValue.length > 0)
						defBold = fontBold.nodeValue == "true";
				}
				if(note.msgId == _model.getDocObj().msgId) {	// 本流程新增的便利貼, 要可以編輯
					Util.getDlg("RD-TextComment.html").done(function($dlg2) {
						
						$dlg2.find("header > h1").unwrap();
						$dlg2.find("footer > div").unwrap();
						
						// 2015.4.30 - Raymond, 修正iOS8.1軟體鍵盤浮上來時會把游標推到太上面超出畫面的問題
						$dlg2.find("textarea").on("vclick", function(event) {
							setTimeout(function() {
								if(document.body.scrollTop > 190)
									document.body.scrollTop = 190;
							}, 1000);
						});
						
						$dlg2.find("a#ok").on('click', function(evt2) {
							var now = Util.now();
							now = Util.padLeft(now.getYear() - 11, 3) + "/" + Util.padLeft(now.getMonth() + 1, 2) + "/" + Util.padLeft(now.getDay(), 2) + " " + Util.padLeft(now.getHours(), 2) + ":" + Util.padLeft(now.getMinutes(), 2) + ":" + Util.padLeft(now.getSeconds(), 2);
							var str = $dlg2.find("textarea").val().replace(/^ /, "\xA0").replace(/^[\r\n\t]+|[\r\n\t]+$/, "").replace(/^ /, "\xA0");	// 改為新增文字意見時, 立即排除首末行只有一個換行字元或數個TAB字元加一個換行字元的情況, 首行第一個字若是半形空白則替換為&nbsp;(\xA0), 以保留首行縮排的需要
							note.dateTime = now;
							if(str.length == 0) {
								theLogger.log("使用者清空便利貼內容, 視為刪除");
								theAOL.getCurrFolio().delNote(note);
								$(thisLi).remove();
							}
							else {
								note.content = str;
								theAOL.getCurrFolio().modifyNote(note);
							}
							
							$.modal.close();
							
							window.scrollTo(0, 0);	// 2014.8.19 - iOS7會往上飄, 要往下拉...
							
							// 1101008 Raymond 修正iPadOS 14/15加蓋文字意見後不會顯示的問題
							if(navigator.userAgent.match(/Mac OS/gi) && !window.realMac) {
								var $tmpDiv = $("<div></div>").appendTo($pg);
								setTimeout(function() {
									$tmpDiv.remove();
								}, 0);
							}
						});
						$dlg2.find("a#cancel").on('click', function(event) {
							$.modal.close();
							
							window.scrollTo(0, 0);	// 2014.8.19 - iOS7會往上飄, 要往下拉...
						});
						var $bar = $dlg2.find(".symbolBar");
						thePublicRsrc.getSymbolText()
							.done(function(txt) {
								theLogger.log(txt);
								var a = txt.split("\n");
								$.each(a, function(idx, val) {
									var kv = val.trim("\r").split(",");
									var $b = $("<button title='" + kv[1] + "' class='ui-btn-up-c'>" + kv[0] + "</button>").appendTo($bar);
									$b.on("tap click", function(event) {
										event.stopPropagation();
										//theCursor.input(this.innerText, "SymbolFloat." + event.type);
										var ta = $dlg2.find("textarea").get(0);
										if(ta.selectionStart || ta.selectionStart == '0') {
											var startPos = ta.selectionStart;
											var endPos = ta.selectionEnd;
											ta.value = ta.value.substring(0, startPos)
												+ this.innerText
												+ ta.value.substring(endPos, ta.value.length);
											ta.selectionStart = ta.selectionEnd = startPos + 1;
										} else {
											ta.value += this.innerText;
										}
										// 1141009 Raymond 修正用點擊符號表輸入文字時, 不會觸發文字意見啟用錯別字校正功能時的同步TEXTAREA內容到標記層的問題
										$(ta).trigger("input");
										return false;
									});
									//.buttonMarkup({theme:"c"});
								});
								theLogger.log(a.length + "個符號表符號已載入!");
								
							})
							.fail(function(errorText) {
								theLogger.log(errorText);
							});

						// 2016.3.16 依AOL_TEXTOBJECT_FONT環境變數設定文字意見的字型、大小、粗體
						$dlg2.find("textarea").css({fontFamily: defFont, fontSize: defSize + "pt", fontWeight: (defBold)?"bolder":"normal"})
							.attr("data-autogrow", "false").val(note.content);	// 2016.8.31 不要自動縮放textarea
						
						$dlg2.find("form").remove();
						$dlg2.find(".ui-grid-a").removeClass("ui-grid-a").addClass("ui-grid-solo");
						$dlg2.find(".ui-block-a").css("width", "");
						$dlg2.find("h1").text("修改便利貼意見");
						
						var w = $pg.closest("#iso").width(),
							h = $pg.closest("#iso").height();
						theLogger.log("修改便利貼意見對話方塊, w:" + w + ",h:" + h);
						$.modal($dlg2, {
							appendTo:$pg.closest("#iso"),
							overlayCss:{height:h, width:w},
							minHeight:470,
							maxWidth:400,
							autoResize:true,
							onShow: function() {
								
								// 2015.11.4 子視窗出現後隱藏指令列
								$pg.closest(".viewPort").data("editCursor").cmdFloat.hide();
								
								// 2016.10.25 禁止文稿頁面捲動
								$(".contentPane").css("overflow", "hidden");
							},
							onClose: function() {
								// 2016.10.25 恢復文稿頁面捲動
								$(".contentPane").css("overflow", "");
								
								$.modal.close(); // 2016.11.8 must call this!
							}
						});
						$dlg2.trigger("create");
					});
				}
				else {	// 其它流程點的便利貼
					Util.getDlg("RD-TextCommentR.html").done(function($dlg) {
						
						// 2016.8.31 因應jQM4.5調整
						$dlg.find("header > h1").unwrap();
						$dlg.find("footer > div").unwrap();
						
						//$dlg.find("textarea").on("input", function(event) {
						//	event.preventDefault();
						//	return false;
						//});
						
						// 1141222 Raymond 1141652 因開啟其他流程點的便利貼檢視子視窗需要新增刪除按鈕, 故調整關閉按鈕的樣式
						//$dlg.find("a#ok").on('click', function(event) {
						$dlg.find("a#ok").css({display: "inline-block", width: "41%"}).on('click', function(event) {
							
							$.modal.close();
							
							window.scrollTo(0, 0);	// 2014.8.19 - iOS7會往上飄, 要往下拉...
						});
						
						// 1141222 Raymond 1141652 開啟其他流程點的便利貼檢視子視窗新增刪除按鈕
						if($dlg.find("a#del").length == 0)
							$("<a id='del' data-role='button' data-theme='b' style='display: inline-block; width: 41%'>刪除</a>").appendTo($dlg.find("div[data-role='content']"));
						$dlg.find("a#del").on('click', function(evt) {
							theLogger.log("使用者刪除此便利貼");
							theAOL.getCurrFolio().delNote(note);
							$(thisLi).remove();
							
							$.modal.close();
							
							window.scrollTo(0, 0);	// 2014.8.19 - iOS7會往上飄, 要往下拉...
						});
						
						let strUser = "\r\n\r\n\r\n" + note.departName + "\r\n" + note.userName + "　" + note.dateTime;
						$("<textarea></textarea>").insertBefore($dlg.find("[data-role='content'] > div"))
							.css({fontFamily: defFont, fontSize: defSize + "pt", fontWeight: (defBold)?"bolder":"normal", height: "270px"})
							.attr("data-autogrow", "false").prop("readonly", true).val(note.content + strUser);	// 2016.8.31 不要自動縮放textarea
						$dlg.find("[data-role='content'] > div").remove();
						
						$dlg.find("h1").text("便利貼意見");
						
						var w = $pg.closest("#iso").width(),
							h = $pg.closest("#iso").height();
						theLogger.log("檢視便利貼意見對話方塊, w:" + w + ",h:" + h);
						$.modal($dlg, {
							appendTo:$pg.closest("#iso"),
							overlayCss:{height:h, width:w},
							maxWidth: 400,	// 1061115 Raymond 1060969 修改280->400
							minHeight: 380,	// 1141222 Raymond 1141652 修改320->380
							autoResize:true,	// 2015.8.17 縮小文字意見輸入大小
							onShow: function() {
								// 2015.11.4 子視窗出現後隱藏指令列
								$pg.closest(".viewPort").data("editCursor").cmdFloat.hide();
							}
						});
						$dlg.trigger("create");
					});
				}
			}).appendTo($slot);
		}
		
		let n = _model.getNoteCounts();
		if(n > 0) {
			let $noteArea = $pg.find("#noteArea");
			if(!$noteArea.length) {
				$noteArea = $("<div id='noteArea'><ul/></div>").appendTo($pg);
			}
			let $slot = $noteArea.find("ul");
			$slot.empty();
			for(let i=0; i<n; i++) {
				let note = _model.getNote(i);
				// 1141223 Raymond 1141652 取消原有檢視的限制規則
				//if(pg.po == 0 && allowShow(note))
				if(pg.po == 0)
					createNote(note, $slot);
			}
		}
	}
	
	// 結flip外掛叫用的介面
	var _flipping = false;	// 2015.5.12 新增表示正在翻頁的旗標
	this.flipCtx = {
		flipping: function() {
			if(arguments.length)
				_flipping = arguments[0];
			else
				return _flipping;
		},
		hasPrevPage: function() {
			return (_currPo.draftIdx >= 0);
		},
		reqPage: function($pg, fallback) {	// 2015.12.29 新增翻頁失敗的回呼函式參數
			// 2019.7 - 1080654 Eric, performance log
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- FolioView.reqPage()) BEGIN...');
            }

			// 1061124 Raymond 1060753 偵測是否處於簽核物件的畫布模式
			if(_viewPort.find("canvas#sketchOverlay").length > 0) {
				var api = _viewPort.find("canvas#sketchOverlay").eq(0).data("sketch");
				if("termSketchMode" in api && $.isFunction(api.termSketchMode)) {
					theLogger.log("由於重新整理或翻頁, 執行終止畫布模式新增簽核物件功能");
					api.termSketchMode(api);
				}
			}
			
			// 1131231 Raymond 1131303 偵測錯別字校正子視窗是否正顯示在頁面中, 是則隱藏(移至頁面外)
			if(_viewPort.find("#errorCorrectionFloat").length > 0 &&
				parseInt(_viewPort.find("#errorCorrectionFloat").css("left")) > 0 && parseInt(_viewPort.find("#errorCorrectionFloat").css("top")) > 0) {
				_viewPort.find("#errorCorrectionFloat").css({"left": "", "top": ""});
				_viewPort.find(".checkedError.focused").removeClass("focused");	// 移除目前選中的錯別字標示的focused
			}
			
			// 翻頁時隱藏指令列
			var c = _viewPort.data("editCursor");
			if(c)
				c.cmdFloat.hide();
			var dfd = $.Deferred();
			if(_currPo.draftIdx == -1) {    // 公文基資
				SSOUtil.loading("show"); //showPageLoadingMsg();

                // 2023.4.14 - Eric 考試院彙整表序10, 公文基資立貼標籤移到最下面
                if (SSO_CONFIG.OrgNickName=='EXAM' || ('dev_OrgNickName' in localStorage && localStorage.dev_OrgNickName=='EXAM')) {
                    _viewPort.find(".tags .tags-group:last .tags-item").trigger("selected");
                }
                else {
				    _viewPort.find(".tags .tags-group:first .tags-item").trigger("selected");
                }
				
				// 2016.1.27 因附件頁面會調整pages大小及tags位置, 切回文稿頁面時要調回A4
				$pg.closest(".pages").css("width", "").css("height", "");
				
				// 2016.12.15 FIX for HTML Cache Problem
				var noCacheUrl = "MS-ODC010.html?SAMLart=" + localStorage['Artifact'];
				$.get(noCacheUrl, function(data, statusText, jqXHR) {
					theLogger.log("下載MS-ODC010.html成功:");
					var $wrapper = $("<div class='pg'></div>");
					//1140723	Leslie[1141011]	弱掃修正[Client DOM Stored XSS](MS-ODC010.html，經查均未使用內置或外部javascript
					// $wrapper.get(0).innerHTML = data;
					//1140801	Leslie[1141011]	弱掃修正[Client DOM Stored XSS]，試用套件消毒
					// $wrapper.get(0).innerHTML = data.replace(/javascript/ig,'').replace(/<script/ig,'');
					$wrapper.get(0).innerHTML = DOMPurify.sanitize(data, {WHOLE_DOCUMENT: true, ADD_TAGS: ['iframe'], ADD_ATTR:['accessKey']});
					var $ctx = $wrapper.find("div:jqmData(role='page')");
					theLogger.log($ctx);
					// 1081230 Raymond 1080194 配合fnWebEditSave改為非同步呼叫
					var delayInit = false;
					if($ctx) {
						//$pg.attr("style", $ctx.attr("style")).html("").append($ctx.children()[0]).trigger("create");
						$pg.attr("style", $ctx.attr("style")).html("").append($ctx.children()[0]).enhanceWithin();
						if(typeof fnWebEditSave !== "undefined")	// 2016.8.9 新增呼叫同步基資功能
						{
							// 1081230 Raymond 1080194 配合fnWebEditSave改為非同步呼叫
							//1061222 David 1061170 呼叫fnWebEditSave()，新增傳入觸發類型
							//fnWebEditSave(_model);
							//fnWebEditSave(_model, "1");
							fnWebEditSave(_model, "1").always(function() {
								fnODC010Init();
								dfd.resolve();
							});
							delayInit = true;	// 標記fnODC010Init及resolve在非同步呼叫fnWebEditSave後才會執行
						}
						if(!delayInit)// 1081230 Raymond 1080194 若非同步呼叫了fnWebEditSave則不用立即呼叫fnODC010Init
						fnODC010Init();	// 2014.9.23 - Raymond新增, ODC010初始化開始
					}
					if(!delayInit)// 1081230 Raymond 1080194 若非同步呼叫了fnWebEditSave則不用立即resolve
					dfd.resolve();
					//$.mobile.hidePageLoadingMsg();
				});
			}
			else {
				if(_currPo.attIdx == -1) {  // 本文
					var that = this;
					// 1090907 Raymond 1090564 信保特殊模式
					//if(_model.isRefDoc()) {	// 2016.11.17 參照窗格用影像顯示
					if(_model.isRefDoc() || _model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
						// 1090911 Raymond 1090564 草稿公文無歷史流程可供參照檢視
						if(_model.isRefDoc() && _model.getDocObj().isDraft == true) {
							theLogger.warn("草稿公文無歷史流程可供參照檢視");
							dfd.reject("草稿公文無歷史流程可供參照檢視", fallback);
							return dfd.promise();
						}
						if(_memPPD[_currPo.draftIdx] !== undefined && _memPPD[_currPo.draftIdx].ti !== undefined)
							_memPPD[_currPo.draftIdx].ti.trigger("selected");
						
						// 簽核頁面
						try {
							if(_currPo.draftIdx >= _model.getDraftCounts()) {	// 2016.12.29 從稿數多的流程點切到稿數少的流程點會超出範圍
								_currPo.draftIdx = _model.getDraftCounts() - 1;
								if(_memPPD[_currPo.draftIdx] !== undefined && _memPPD[_currPo.draftIdx].ti !== undefined)
									_memPPD[_currPo.draftIdx].ti.trigger("selected");
							}
							var pg = _model.getDraftPage(_currPo.draftIdx, _currPo.po);
						}
						catch(e) {
							theLogger.error("getDraftPage(" + _currPo.draftIdx + "," + _currPo.po + ") Exception! " + e.message + " - " + e.sourceURL + ":" + e.line);
							if(_currPo.po > 0) {	// 2016.12.29 從頁數多的流程點切到頁數少的流程點會超出範圍
								_currPo.po = 0;
								var pg = _model.getDraftPage(_currPo.draftIdx, 0);
							}
						}
						
						// 2016.1.27 因附件頁面會調整pages大小及tags位置, 切回文稿頁面時要調回A4
						$pg.closest(".pages").css("width", "").css("height", "");
						
						_memPPD[_currPo.draftIdx].pages = _model.getDraftPageCounts(_currPo.draftIdx);
						
						// 更新頁數
						_memPPD[_currPo.draftIdx].ti.find(".ui-li-count").text(_memPPD[_currPo.draftIdx].pages);
						
						// 1090914 Raymond 1090529 若機關暱稱為SMEG(信保基金), 檢查是否為AKI800調閱公文且應套用強制浮水印, 恢復底圖為空白
						var uo = _model.getUNVObj();
						if(theUserInfo.OrgNickName == "SMEG" && !!uo && typeof uo.UnvRoot.ForceDisplayWaterMark === "string" && uo.UnvRoot.ForceDisplayWaterMark.match(/true/i)) {
							if($pg.closest(".pages").find("#pgFrontFace").get(0).style.backgroundImage != "")
								$pg.closest(".pages").find("#pgFrontFace").get(0).style.backgroundImage = "";
						}
						// 1090828 Raymond 1090529 指定第3參數為true, 表示取得影像用於顯示用(若是AKI800調閱公文則判斷是否應套用強制顯示浮水印)
						//_model.getPageImage(pg)
						_model.getPageImage(pg, null, true)
							// 1090826 Raymond 1090620 新增影像檔的dpi參數
							//.done(function(data) {
							//	theLogger.log(data);
							.done(function(data, dpi) {
								if(data.match(/^data:/) && data.length > 100)	// 2016.9.5 減少LOG長度
									theLogger.log(data.substring(0, 100) + "...略(共 " + data.length + " words), dpi:" + dpi);
								else
									theLogger.log(data + ", dpi:" + dpi);
						
								// 1090826 Raymond 1090620 修正參照窗格的來文頁面大小若非A4, 其上的簽核物件會位移的問題
								if(_model.isFromDoc(_currPo.draftIdx)) {
									// 來文本文頁面尺寸不是直式A4時, 須因應調整pages大小及tags位置
									var $img = $("<div class='pg'><img class='fromdoc' style='width:210mm; height:297mm; -webkit-user-select:none'/><div class='cover-layer'/></div>").appendTo($pg)
											.find("img").attr("src", data);
									$img.on("load", function(event) {
										console.log("來文本文頁面影像.on" + event.type + "(" + event.target.naturalWidth + " x " + event.target.naturalHeight + ")");
										if("naturalWidth" in event.target && "naturalHeight" in event.target) {
											var w = event.target.naturalWidth / (dpi || 300),	// 頁面影像為200dpi, 若有傳入dpi參數則以dpi為準
												h = event.target.naturalHeight / (dpi || 300);
											$img.css({width: w + "in", height: h + "in"});
											
											$img.closest(".pages").css({width: "calc(" + w + "in + 153px)"/*, height: "calc(" + h + "in + 20mm)"*/});	// 2016.3.15 FIX切換附件時出現捲動條問題
											
											// 頁面影像載入完成比pageFlipped回呼函式執行還慢時, 要重設頁籤位置, 否則頁籤不會移動
											var prePos = $img.closest(".viewPort").find(".tags").css("left");
											$img.closest(".viewPort").find(".tags").css("left", "calc(" + w + "in + 12px)");
											$img.closest(".pages").find("#pgFlippedIn").css({width: w + "in", height: h + "in"});
											var postPos = $img.closest(".viewPort").find(".tags").css("left");
											theLogger.log("頁籤調整前位置:" + prePos + "(" + parseFloat(prePos) + "), 調整後位置:" + postPos + "(" + parseFloat(postPos) + ")");
											if(Math.abs(parseFloat(prePos) - parseFloat(postPos)) > 10) {	// 若頁籤位置在因應附件頁面寬度調整後差距超過10px, 則隱藏指令列, 以免以按頁籤方式換頁時會殘留指令列在舊的頁籤位置
												theLogger.warn("頁籤位置變動距離超過一定範圍, 隱藏指令列");
												var c = $img.closest(".viewPort").data("editCursor");
												if(!!c)
													c.cmdFloat.hide();
											}
										}
									})
									.on("error", function(event) {
										theLogger.error(event);
									});
								}
								// 1091014 Raymond 1090564 信保特殊模式下的本文頁面比照附件頁面標記attachment class並記錄pgo物件供旋轉功能記錄旋轉狀態
								else if(_model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
									var $img = $("<div class='pg'><img class='attachment' style='width:210mm; height:297mm; -webkit-user-select:none'/><div class='cover-layer'/></div>").appendTo($pg)
											.find("img").attr("src", data).data("pgo", pg);	// 'attachment' class for remark as attachment
																							// 'pgo' data for recording rotation state
									$img.on("load", function(event) {
										console.log("[信保特殊模式公文]本文頁面影像.on" + event.type + "(" + event.target.naturalWidth + " x " + event.target.naturalHeight + ")");
										if("naturalWidth" in event.target && "naturalHeight" in event.target) {
											var w = event.target.naturalWidth / (dpi || 300),	// 頁面影像為200dpi, 若有傳入dpi參數則以dpi為準
												h = event.target.naturalHeight / (dpi || 300);
											$img.css({width: w + "in", height: h + "in"});
											
											$img.closest(".pages").css({width: "calc(" + w + "in + 153px)"/*, height: "calc(" + h + "in + 20mm)"*/});	// 2016.3.15 FIX切換附件時出現捲動條問題
											
											// 頁面影像載入完成比pageFlipped回呼函式執行還慢時, 要重設頁籤位置, 否則頁籤不會移動
											var prePos = $img.closest(".viewPort").find(".tags").css("left");
											$img.closest(".viewPort").find(".tags").css("left", "calc(" + w + "in + 12px)");
											$img.closest(".pages").find("#pgFlippedIn").css({width: w + "in", height: h + "in"});
											var postPos = $img.closest(".viewPort").find(".tags").css("left");
											theLogger.log("頁籤調整前位置:" + prePos + "(" + parseFloat(prePos) + "), 調整後位置:" + postPos + "(" + parseFloat(postPos) + ")");
											if(Math.abs(parseFloat(prePos) - parseFloat(postPos)) > 10) {	// 若頁籤位置在因應附件頁面寬度調整後差距超過10px, 則隱藏指令列, 以免以按頁籤方式換頁時會殘留指令列在舊的頁籤位置
												theLogger.warn("頁籤位置變動距離超過一定範圍, 隱藏指令列");
												var c = $img.closest(".viewPort").data("editCursor");
												if(!!c)
													c.cmdFloat.hide();
											}
										}
									})
									.on("error", function(event) {
										theLogger.error(event);
									});
								}
								else {
								//alert(navigator.userAgent);
								/* 2014.8.25 - Raymond, 改用ImgTran處理高解析度來文影像檔
								if(navigator.userAgent.search(/Mobile/i) >= 0)
									$("<div class='pg' style='width:210mm; height:297mm; overflow:hidden'><iframe style='width:210mm; height:297mm; -webkit-transform:scale(0.32);'></iframe><div class='cover-layer'/></div>").appendTo($pg)
										.find("iframe").attr("src", data);
								else*/
									// 1091127 Raymond 1090564 修正信保特殊模式公文開啟參照窗格時, 因無ODCDWM可判定而不會因應頁面非A4大小而改變寬高的問題
									var $img = $("<div class='pg'><img style='width:210mm; height:297mm; -webkit-user-select:none'/><div class='cover-layer'/></div>").appendTo($pg)
										.find("img").attr("src", data);
									$img.on("load", function(event) {
										console.log("頁面影像.on" + event.type + "(" + event.target.naturalWidth + " x " + event.target.naturalHeight + ")");
										if("naturalWidth" in event.target && "naturalHeight" in event.target) {
											var w = event.target.naturalWidth / (dpi || 300),	// 頁面影像為200dpi, 若有傳入dpi參數則以dpi為準
												h = event.target.naturalHeight / (dpi || 300);
											$img.css({width: w + "in", height: h + "in"});
											
											$img.closest(".pages").css({width: "calc(" + w + "in + 153px)"/*, height: "calc(" + h + "in + 20mm)"*/});	// 2016.3.15 FIX切換附件時出現捲動條問題
											
											// 頁面影像載入完成比pageFlipped回呼函式執行還慢時, 要重設頁籤位置, 否則頁籤不會移動
											var prePos = $img.closest(".viewPort").find(".tags").css("left");
											$img.closest(".viewPort").find(".tags").css("left", "calc(" + w + "in + 12px)");
											$img.closest(".pages").find("#pgFlippedIn").css({width: w + "in", height: h + "in"});
											var postPos = $img.closest(".viewPort").find(".tags").css("left");
											theLogger.log("頁籤調整前位置:" + prePos + "(" + parseFloat(prePos) + "), 調整後位置:" + postPos + "(" + parseFloat(postPos) + ")");
											if(Math.abs(parseFloat(prePos) - parseFloat(postPos)) > 10) {	// 若頁籤位置在因應附件頁面寬度調整後差距超過10px, 則隱藏指令列, 以免以按頁籤方式換頁時會殘留指令列在舊的頁籤位置
												theLogger.warn("頁籤位置變動距離超過一定範圍, 隱藏指令列");
												var c = $img.closest(".viewPort").data("editCursor");
												if(!!c)
													c.cmdFloat.hide();
											}
										}
									})
									.on("error", function(event) {
										theLogger.error(event);
									});
								}
								
								if(c)
									c.cmdFloat.hide();
								
								// 建立簽核物件
								if(pg) {
									_memPPD[_currPo.draftIdx].pg = pg;
									//buildSO(pg);
								}
								
								dfd.resolve();
							})
							.fail(function(errorText) {
								dfd.reject(errorText, fallback);	// 2015.12.29 新增傳入翻頁失敗時回呼函式參數
							});
					}
					else {
						// 2019.7 - Eric, performance log
						if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
							theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- _model.accquireDraftModel() BEGIN...');
							window.tmBeginAcqDM = Date.now();
						}

						_model.accquireDraftModel(_currPo.draftIdx)
						.done(function(dm) {
							// 2019.7 - Eric, performance log
							if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
								SSOUtil.dev_logTimeElapse('_model.accquireDraftModel()',  window.tmBeginAcqDM);
								window.tmBeginAcqDM = 0;
							}

							if(_memPPD[_currPo.draftIdx] !== undefined && _memPPD[_currPo.draftIdx].ti !== undefined)
								_memPPD[_currPo.draftIdx].ti.trigger("selected");
							
							// 簽核頁面
							try {
								var pg = _model.getDraftPage(_currPo.draftIdx, _currPo.po);
							}
							catch(e) {
								theLogger.error("getDraftPage(" + _currPo.draftIdx + "," + _currPo.po + ") Exception! " + e.message + " - " + e.sourceURL + ":" + e.line);
							}
							
							// 2016.1.27 因附件頁面會調整pages大小及tags位置, 切回文稿頁面時要調回A4
							$pg.closest(".pages").css("width", "").css("height", "");
							
							// 動態產生頁面
							if(dm) {
								var t0 = new Date();	// 1100909 Raymond 1101135 偵測initFO耗費時間
								// 2019.7 - Eric, performance log
								if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
									theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 下載樣板作業 BEGIN...');
									window.tmBeginDLTmpl = Date.now();
								}

								dm.getInternalFO()
									// 1100909 Raymond 1101135 初始化FO的函式新增名稱, 以供須重新整理文稿頁面時recursive呼叫
									//.done(function(fo) {
									.done(function initFO(fo) {
										// 2019.7 - Eric, performance log
										if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
											SSOUtil.dev_logTimeElapse('下載樣板作業', window.tmBeginDLTmpl);
											window.tmBeginDLTmpl = 0;
										}

										// 搜尋簽核區域
										if("signAreas" in _memPPD[_currPo.draftIdx])
											_memPPD[_currPo.draftIdx].signAreas.length = 0;
										else
											_memPPD[_currPo.draftIdx].signAreas = [];
										fo.find("SignArea", _memPPD[_currPo.draftIdx].signAreas);
										// 2017.2.20 搜尋簽核區域(文稿) 航港-序477
										if("signAreas" in dm)
											dm.signAreas.length = 0;
										else
											dm.signAreas = [];
										fo.find("SignArea", dm.signAreas);
										
										try {
											_memPPD[_currPo.draftIdx].docNo = dm.text("/*/公文文號");	// 2015.9.16 新增公文文號給騎縫章取用
										}
										catch(e) {
											theLogger.error(e.message);
										}

										// 2019.7 - Eric, performance log
										if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
											theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- Render頁面作業 BEGIN...');
											window.tmBeginPageRender = Date.now();
										}

										theLayoutEng.instanciateSOPages(fo, $pg, _memPPD[_currPo.draftIdx], _currPo.po, _model.getDocObj(), dm,	// 2016.8.10 新增傳入docObj, 2016.12.22 新增傳入dm參數
											//_model.readOnly() || _model.isRefDoc() || !dm.getEditable() || (SSO_CONFIG && SSO_CONFIG.aolMode))   // 2014.6.18 新增唯讀模式, 2015.10.15 改依FolioModel.readOnly()及SSO_CONFIG.aolMode決定是否不允許編輯內文, 2016.2.2 改依DraftModel的Editable決定, 2016.8.8 若是參照公文一律唯讀, 2016.8.10 整份公文唯讀
											_model.readOnly() || _model.isRefDoc() || !dm.getEditable() || dm.canEditCon() || (SSO_CONFIG && SSO_CONFIG.aolMode))	// 1130105 Raymond 1120887 新增判斷簽稿會核單為會辦單位可編輯會辦意見區的條件
											.done(function() {  // 2013.10.17 - Raymond, 改用Deferred方式, 因分頁非同步
												// 2019.7 - Eric, performance log
												if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
													SSOUtil.dev_logTimeElapse('Render頁面作業', window.tmBeginPageRender);
													window.tmBeginPageRender = 0;
												}
												// 1090831 Raymond 1090529 若機關暱稱為SMEG(信保基金), 檢查是否為AKI800調閱公文, 若是則檢查應否套用強制浮水印
												var uo = _model.getUNVObj();
												// 1100623 Raymond 1100780 新增一般機關也可套用強制浮水印功能
												//if(theUserInfo.OrgNickName == "SMEG" && !!uo && typeof uo.UnvRoot.ForceDisplayWaterMark === "string" && uo.UnvRoot.ForceDisplayWaterMark.match(/true/i)) {
												if(!!uo && typeof uo.UnvRoot.ForceDisplayWaterMark === "string" && uo.UnvRoot.ForceDisplayWaterMark.match(/true/i)) {
													if(!!_model.fwmBlank && _model.fwmBlank.length) {	// 已套用強制浮水印的白底影像
														if($pg.closest(".pages").find("#pgFrontFace").get(0).style.backgroundImage == "")
															$pg.closest(".pages").find("#pgFrontFace").css("background-image", "url('" + _model.fwmBlank + "')");
													}
													else {
														var $imgTmp = $("<img class='WMImage'></img>");
														$imgTmp.get(0).width = 794;
														$imgTmp.get(0).height = 1123;
														function _onForceWaterMarkDone(rslt) {
															_model.fwmBlank = rslt.imgStr;	// 暫存已套用好強制浮水印的白底影像, TODO:可能改在theAOL比較好?
															$pg.closest(".pages").find("#pgFrontFace").css("background-image", "url('" + _model.fwmBlank + "')");
														}
														// 影像套強制式浮水印
														$imgTmp.watermark({position:'middle-center', className:'WMImage', 
																			// 1100623 Raymond 1100780 新增UserName欄位, 供一般機關顯示強制浮水印使用
																			//userInfo: { OrgNickName: theUserInfo.OrgNickName, OUName:uo.UnvRoot.OU_NAME, UserId:uo.UnvRoot.USER_ID, UserTitle:uo.UnvRoot.USER_TITLE, ClientIP:uo.UnvRoot.CLIENT_IP},	// 信保基金要求顯示的文字浮水印內容
																			userInfo: { OrgNickName: theUserInfo.OrgNickName, OUName:uo.UnvRoot.OU_NAME, UserId:uo.UnvRoot.USER_ID, UserName:uo.UnvRoot.USER_NAME, UserTitle:uo.UnvRoot.USER_TITLE, ClientIP:uo.UnvRoot.CLIENT_IP},	// 信保基金要求顯示的文字浮水印內容
																			path: _model.fwmPath, settings: _model.fwmSettings, 'dpi': 96, 
																			'theApp': window.theAOL,
																			'forceWaterMark' : true,
																			callback: _onForceWaterMarkDone
														});
													}
												}

												// 1060614 Raymond 1060471 下載圖檔影像
												var $imgs = $pg.find("div.img");
												if($imgs.length > 0) {
													$imgs.each(function(idx, div) {
														var imgFullPath = $(div).attr("data-src");
														if(imgFullPath) {
															var p = imgFullPath.lastIndexOf("\\");
															var dirPath = imgFullPath.substr(0, p);
															var fileName = imgFullPath.substr(p + 1);
															(function(div, dirPath, fileName) {
																//var dfd2 = $.Deferred();
																//2017.01.17	Leslie	效能精進，減少無謂的下載行為，改用theCacheMgr.get()
																theCacheMgr.get({type:"rsrc",rsrc:{wfioUrl:thePublicRsrc.rsrcRepo.remote.getWFIOURL(),filePath:imgFullPath}})
																	.done(function(img){
																		if(img != undefined){
																			theLogger.log("圖檔物件'" + fileName + "'下載成功!");
																			$(div).find("img").attr("src", img);
																			$(div).removeAttr("data-src");	//已下載完成，拿掉屬性以避免重覆執行
																			//dfd2.resolve();
																		}
																	})
																	.fail(function(errorText) {
																		theLogger.error("下載'" + dirPath + "\\" + fileName + "'失敗!" + errorText);
																		//dfd2.reject("下載'" + dirPath + "\\" + fileName + "'失敗!" + errorText);
																	});
																//return dfd2.promise();
															})(div, dirPath, fileName);
														}
														else
															theLogger.error("圖檔物件路徑未設定");
													});
												}
												
												// 2016.6.22 新增只有線上簽核要新增本文頁及記錄
												if(_model.getSignType() == "E") {
													// 2015.11.18 首次分頁可能因為排版差異造成行動版多一頁出來, 造成翻頁時會轉圈圈因為抓不到封裝檔中對應的簽核頁面, 修改為比照Enter自動新增簽核頁面
													theLogger.log("\tpages=" + _memPPD[_currPo.draftIdx].pages + ", draftPageCounts=" + _model.getDraftPageCounts(_currPo.draftIdx));
													while(_memPPD[_currPo.draftIdx].pages > _model.getDraftPageCounts(_currPo.draftIdx)) {
														theLogger.warn("首次分頁(" + _memPPD[_currPo.draftIdx].pages + ")產生了比封裝檔記錄多的頁次(" + _model.getDraftPageCounts(_currPo.draftIdx) + ")!");
														// 1121006 Raymond 北大彙整表序255 修正在可編輯內文時, 因排版設定檔改變等原因, 導致動態排版的頁數大於封裝檔之前流程點匯出的頁數時, 要設定文稿為dirty狀態, 觸發重新匯出頁面, 才能避免在最末頁的簽核框外加蓋簽核物件後儲存時, 發生錯誤的問題
														// 1090424 Raymond 1090305 初次分頁判斷比封裝檔頁數多時, 傳入第2參數true表示不要設定文稿為dirty狀態
														if(dm.getEditable())
															_model.newDraftPage(_currPo.draftIdx);
														else
															_model.newDraftPage(_currPo.draftIdx, true);
													}
													// 2017.3.14 當動態排版出來的頁數比封裝檔少時, 要設為已異動狀態, 列印時才會重新整理目前顯示的簽核區域所在頁次, 航港序-499
													if(_memPPD[_currPo.draftIdx].pages < _model.getDraftPageCounts(_currPo.draftIdx)) {
														theLogger.warn("首次分頁(" + _memPPD[_currPo.draftIdx].pages + ")產生了比封裝檔記錄還少的頁數(" + _model.getDraftPageCounts(_currPo.draftIdx) + ")! 設定此文稿有異動以更新簽核區域資訊");
														if(pg) {	// 1060504 Raymond 修正簽核時若2頁變1頁, 但流程點不允許編輯內文時, 不要改到外部簽核記錄新增一個版本, 會導致跟暫存檔對不起來的問題
															if(dm.getEditable())
																pg.container.dirty(true);
															// 1121113 Raymond 1120881 修正簽核區域及新增的簽核物件在第2頁時, 因執行文別轉換或貼上稿件(置換), 導致頁數變少, pg物件未更新為自動切換的前一頁, 進而發生簽核物件無法初始化的問題
															if(pg && pg.po != _currPo.po)
																pg = _model.getDraftPage(_currPo.draftIdx, _currPo.po);
														}
														else
															theLogger.error("無pg物件可設定文稿為已異動狀態");
													}
													// 建立簽核物件
													if(pg) {
														_memPPD[_currPo.draftIdx].pg = pg;
														//buildSO($pg, pg);
													}
													else {	// 2015.10.1 因Enter而新增出來的頁次, 沒有對應的封裝檔<頁面>節點
														//_memPPD[_currPo.draftIdx].pg = undefined;
														// 2015.11.18 若pg未取得, 在newDraftPage()後, 重新取得, 應能成功
														try {
															_memPPD[_currPo.draftIdx].pg = pg = _model.getDraftPage(_currPo.draftIdx, _currPo.po);
														}
														catch(e) {
															theLogger.error("Exception! " + e.message + " - " + e.sourceURL + ":" + e.line);
														}
													}
												}
												
												// 2015.9.30 新增更新分頁及頁次等的callback, 新增段落時會叫用
												dm.updateView = function() {
													theLogger.log("dm.updateView()...curr draftIdx:" + _currPo.draftIdx + ", attIdx:" + _currPo.attIdx + ", po:" + _currPo.po);
													if(_currPo.attIdx >= 0)	// 2017.1.5 updateView()改在許多按鈕點擊時呼叫, 有可能當目前頁面停在附件頁時refreshSOPages會找不到繪製的本文內容而出錯, 所以要過濾
														return;
													
													// 1131231 Raymond 1131303 偵測錯別字校正子視窗是否正顯示在頁面中, 是則隱藏(移至頁面外)
													if(_viewPort.find("#errorCorrectionFloat").length > 0 &&
														parseInt(_viewPort.find("#errorCorrectionFloat").css("left")) > 0 && parseInt(_viewPort.find("#errorCorrectionFloat").css("top")) > 0) {
														_viewPort.find("#errorCorrectionFloat").css({"left": "", "top": ""});
														_viewPort.find(".checkedError.focused").removeClass("focused");	// 移除目前選中的錯別字標示的focused
													}
													// 1131029 Raymond 勤益序332 修正滾輪滾動幅度大或連續快速點擊下一頁按鈕兩次, 會發生翻到次頁後, 點擊簽核區域出現錯誤導致簽核工具列不會顯示的問題
													// 1120607 Raymond 1120515 新增傳入docObj參數
													// 1091023 Raymond 1090735 新增傳入fo參數
													// 2016.12.23 多傳入dm參數
													//theLayoutEng.refreshSOPages($pg.parent().find(".pg"), _memPPD[_currPo.draftIdx], _currPo.po, dm, function() {
													//theLayoutEng.refreshSOPages($pg.parent().find(".pg"), _memPPD[_currPo.draftIdx], _currPo.po, _model.getDocObj(), dm, fo, function() {
													var $rightPg = $pg.parent().find(".pg");
													if($rightPg.length > 1)
														$rightPg = $rightPg.filter(function(idx, divPg) {
															console.warn(idx, divPg, divPg.parentNode.id);
															// 1131119 Raymond 北榮序374 發現往上滾翻上頁也會
															//if(divPg.parentNode.id == "pgFlippedIn") {	// 目前只排除#pgFlippedIn, 翻上一頁未發現有此問題
															if(divPg.parentNode.id == "pgFlippedIn" || divPg.parentNode.id == "pgFlippedOut") {	// 目前只排除#pgFlippedIn, 翻上一頁未發現有此問題
																console.warn("滾輪滾動幅度大或連續點擊下一頁按鈕兩次, 排除正在翻頁中尚未結束清除的頁面(#" + divPg.parentNode.id + ")內容");
																return false;
															}
															return true;
														});
													theLayoutEng.refreshSOPages($rightPg, _memPPD[_currPo.draftIdx], _currPo.po, _model.getDocObj(), dm, fo, function() {
														
														// 2016.6.22 新增只有線上簽核要新增本文頁及記錄
														if(_model.getSignType() == "E") {
															theLogger.log("\tpages=" + _memPPD[_currPo.draftIdx].pages + ", draftPageCounts=" + _model.getDraftPageCounts(_currPo.draftIdx));
															while(_memPPD[_currPo.draftIdx].pages > _model.getDraftPageCounts(_currPo.draftIdx)) {
																theLogger.warn("更新分頁(" + _memPPD[_currPo.draftIdx].pages + ")產生了比封裝檔記錄多的頁次(" + _model.getDraftPageCounts(_currPo.draftIdx) + ")!");
																_model.newDraftPage(_currPo.draftIdx);
															}
															// 將位於簽核框內的既有sign-obj移至保留顯示, 因重新匯出頁面邏輯
															/* 2016.10.5 編輯內文後預設不保留簽核物件
															for(var i=0; i<pg.signObjs.length; i++) {
																if("saType" in pg.signObjs[i]) {
																	if(!("reservedSO" in pg))
																		pg.reservedSO = [];
																	pg.reservedSO.push(pg.signObjs[i]);
																}
																//else	TODO: 未定義簽核框內但位於簽核框內?
															}*/
															var n = _model.getDraftPageCounts(_currPo.draftIdx);
															for(var i=0; i<n; i++) {
																try {
																	var p = _model.getDraftPage(_currPo.draftIdx, i);
																	if(p) {
																		if(_model.getReserveSO() &&				// 2016.11.10 改依FolioModel的變數決定是否保留簽署物件
																			//dm.getDocType() != "簽稿會核單" &&	// 2016.11.11 依一代邏輯, 簽稿會核單及會辦單不保留
																			//dm.getDocType() != "會辦單") {
																			((dm.getDocType() != "簽稿會核單" &&	// 2016.11.11 依一代邏輯, 簽稿會核單及會辦單不保留
																			dm.getDocType() != "會辦單") || theSSO.User.EnvSettings.get("WE_ALLOW_CON_KEEP_SIGNOBJ") == "Y")) {// 1081213 Raymond 1080785 新增的環境變數WE_ALLOW_CON_KEEP_SIGNOBJ可啟用允許簽稿會核單保留異動內容前所新增的簽核物件功能
																			theLogger.log("保留簽署物件");
																			for(var j=0; j<p.signObjs.length; j++) {
																				if("saType" in p.signObjs[j]) {
																					theLogger.log("保留位於簽核區域內的簽核物件(id:" + p.signObjs[j].id + ")");
																					if(!("reservedSO" in p))
																						p.reservedSO = [];
																					p.reservedSO.push(p.signObjs[j]);
																				}
																				//else	TODO: 未定義簽核框內但位於簽核框內?
																			}
																			p.signObjs.length = 0;
																		}
																		else {
																			theLogger.log("不保留簽核物件");
																			if("signObjs" in p)
																				p.signObjs.length = 0;
																			if("reservedSO" in p)
																				p.reservedSO.length = 0;
																		}
																	}
																}
																catch(e) {
																	theLogger.error("找不到文稿" + _currPo.draftIdx + ", 第" + i + "頁");
																}
															}
															
															//pg.signObjs.length = 0;
															// 2015.10.14 只有自動加蓋的要清除
															for(var i=0; i<pg.newSignObjs.length; i++) {
																if(pg.newSignObjs[i].auto) {
																	theLogger.warn("移除自動加蓋的簽核物件[" + i + "]:" + pg.newSignObjs[i].type);
																	//pg.newSignObjs.splice(i, 1);
																	pg.delSignObj(pg.newSignObjs[i]);	// 2017.1.19 改成delSignObj才會連帶更新外部記錄檔
																	--i;
																}
																else {	// 2017.1.23 非自動加蓋的要判斷若是簽核區域內物件, 且簽核區域因編輯內文而跳到不同頁次, 則物件要跟著搬家
																	if(pg.newSignObjs[i].signArea) {
																		if(pg.newSignObjs[i].signArea.po != pg.newSignObjs[i].boundTo.po) {
																			theLogger.warn("簽核區域內簽核物件位於P#" + pg.newSignObjs[i].boundTo.po + ", 因異動內文導致簽核區域跑到P#" + pg.newSignObjs[i].signArea.po + ", 搬移簽核物件綁定頁面");
																			var p = _model.getDraftPage(_currPo.draftIdx, pg.newSignObjs[i].signArea.po);
																			if(!!p) {
																				var so = pg.newSignObjs.splice(i, 1)[0];
																				so.boundTo = p;
																				p.newSignObjs.push(so);
																				--i;
																			}
																		}
																	}
																}
															}
															//pg.newSignObjs.length = 0;
															$pg.parent().find(".pg .sign-obj").remove();	// 清除簽核物件元素
															for(var i=0; i<_memPPD[_currPo.draftIdx].signAreas.length; i++) {
																_memPPD[_currPo.draftIdx].signAreas[i].lastSignetBottom = undefined;	// 職名章最下位置重設
																_memPPD[_currPo.draftIdx].signAreas[i].lastSignetBottomABS = undefined;
															}
															var rmvLst = [];
															if("reservedSO" in pg) {	// 2015.11.20 FIX, 無任何簽核物件時不會有reservedSO
																for(var i=0; i<pg.reservedSO.length; i++) {
																	var so = pg.reservedSO[i];
																	if("saType" in so) {
																		$.each(_memPPD[_currPo.draftIdx].signAreas, function(j, signArea) {
																			if(((so.saType == "群組" || so.saType == "0") && signArea.saType == "0") ||
																				((so.saType == "角色" || so.saType == "1") && signArea.saType == "1")) {
																				
																				if(so.saID == signArea.id && signArea.po != pg.po) {	// 因簽核框跳頁了, 簽核框內物件亦需隨簽核框跳頁
																					theLogger.log("因簽核框跳至#" + (signArea.po+1) + "頁, 指定簽核區域Type(" + so.saType + ")ID(" + so.saID + ")的簽核物件隨之換頁!");
																					try {
																						var newPg = _model.getDraftPage(_currPo.draftIdx, signArea.po);
																						if(!("reservedSO" in newPg))
																							newPg.reservedSO = [];
																						so.po = signArea.po;	// 2015.11.11 更新頁次
																						newPg.reservedSO.push(so);
																						rmvLst.push(i);
																					}
																					catch(e) {
																						theLogger.error("Exception2! " + e.message + " - " + e.sourceURL + ":" + e.line);
																					}
																				}
																			}
																		});
																	}
																	//else	TODO: 未定義跟著簽核框走的簽核物件要移嗎?
																}
															}
															for(var i=rmvLst.length-1; i>=0; i--) {
																theLogger.log("移除本頁的保留物件(" + rmvLst[i] + ")");
																pg.reservedSO.splice(rmvLst[i], 1);
															}
															
															// 2015.11.11 檢查簽核框是否移頁, 綁定在之前頁次的reservedSO要再改分
															for(var i=0; i<_model.getDraftPageCounts(_currPo.draftIdx); i++) {
																var origPg = _model.getDraftPage(_currPo.draftIdx, i);
																// 2015.12.18 其它頁的自動加蓋的要清除
																if("newSignObjs" in origPg) {
																	for(var j=0; j<origPg.newSignObjs.length; j++) {
																		if(origPg.newSignObjs[j].auto) {
																			theLogger.warn("移除自動加蓋的簽核物件[" + j + "]:" + origPg.newSignObjs[j].type);	// 2015.12.22 FIX
																			//origPg.newSignObjs.splice(j, 1);
																			origPg.delSignObj(origPg.newSignObjs[j]);	// 2017.1.19 改成delSignObj才會連帶更新外部記錄檔
																			--j;
																		}
																		else {	// 2017.1.23 非自動加蓋的要判斷若是簽核區域內物件, 且簽核區域因編輯內文而跳到不同頁次, 則物件要跟著搬家
																			if(origPg.newSignObjs[j].signArea) {
																				if(origPg.newSignObjs[j].signArea.po != origPg.newSignObjs[j].boundTo.po) {
																					theLogger.warn("簽核區域內簽核物件位於P#" + origPg.newSignObjs[j].boundTo.po + ", 因異動內文導致簽核區域跑到P#" + origPg.newSignObjs[j].signArea.po + ", 搬移簽核物件綁定頁面");
																					var p = _model.getDraftPage(_currPo.draftIdx, origPg.newSignObjs[j].signArea.po);
																					if(!!p) {
																						var so = origPg.newSignObjs.splice(j, 1)[0];
																						so.boundTo = p;
																						p.newSignObjs.push(so);
																						--j;
																					}
																				}
																			}
																		}
																	}
																}
																// 2015.12.17 原本在不同頁次的簽核物件未被移至保留也要檢查是否與簽核區域不同頁
																if("signObjs" in origPg) {
																	var rmvLst = [];
																	for(var j=0; j<origPg.signObjs.length; j++) {
																		var otherSO = origPg.signObjs[j];
																		if("saType" in otherSO) {	// 原本位於簽核框中的簽核物件
																			for(var k=0; k<_memPPD[_currPo.draftIdx].signAreas.length; k++) {	// 找出對應的簽核區域所在頁次
																				var sa = _memPPD[_currPo.draftIdx].signAreas[k];
																				if (((otherSO.saType == "群組" || otherSO.saType == "0") && sa.saType == "0") ||
																					((otherSO.saType == "角色" || otherSO.saType == "1") && sa.saType == "1")) {
																					if(otherSO.po != sa.po) {
																						theLogger.warn("原始的簽核物件(ID:" + otherSO.id + ")頁次(" + otherSO.po + ")與簽核區域所在頁次(" + sa.po + ")不一致, 應移動");
																						var destPg = _model.getDraftPage(_currPo.draftIdx, sa.po);
																						if(!("reservedSO" in destPg))
																							destPg.reservedSO = [];
																						otherSO.po = sa.po;
																						destPg.reservedSO.push(otherSO);
																						rmvLst.push(j);
																					}
																					break;
																				}
																			}
																		}
																	}
																	for(var j=rmvLst.length-1; j>=0; j--) {
																		theLogger.log("移除#(" + origPg.po + ")頁的原始簽核物件(" + rmvLst[j] + ")");
																		origPg.signObjs.splice(rmvLst[j], 1);
																	}
																}
																if("reservedSO" in origPg) {
																	var rmvLst = [];
																	for(var j=0; j<origPg.reservedSO.length; j++) {
																		var otherSO = origPg.reservedSO[j];
																		if("saType" in otherSO) {	// 原本位於簽核框中的簽核物件
																			for(var k=0; k<_memPPD[_currPo.draftIdx].signAreas.length; k++) {	// 找出對應的簽核區域所在頁次
																				var sa = _memPPD[_currPo.draftIdx].signAreas[k];
																				if (((otherSO.saType == "群組" || otherSO.saType == "0") && sa.saType == "0") ||
																					((otherSO.saType == "角色" || otherSO.saType == "1") && sa.saType == "1")) {
																					if(otherSO.po != sa.po) {
																						theLogger.warn("保留的簽核物件(ID:" + otherSO.id + ")頁次(" + otherSO.po + ")與簽核區域所在頁次(" + sa.po + ")不一致, 應移動");
																						var destPg = _model.getDraftPage(_currPo.draftIdx, sa.po);
																						if(!("reservedSO" in destPg))
																							destPg.reservedSO = [];
																						otherSO.po = sa.po;
																						destPg.reservedSO.push(otherSO);
																						rmvLst.push(j);
																					}
																					break;
																				}
																			}
																		}
																	}
																	for(var j=rmvLst.length-1; j>=0; j--) {
																		theLogger.log("移除#(" + origPg.po + ")頁的保留物件(" + rmvLst[j] + ")");
																		origPg.reservedSO.splice(rmvLst[j], 1);
																	}
																}
															}
														}
														// 1131029 Raymond 勤益序332 修正滾輪滾動幅度大或連續快速點擊下一頁按鈕兩次, 會發生翻到次頁後, 點擊簽核區域出現錯誤導致簽核工具列不會顯示的問題
														//that.pageFlipped($pg.parent().find(".pg"), $pg.closest(".pages"));	// 再呼叫一次pageFlipped重新產生簽核物件元素, 2016.1.27 新增$pages參數
														that.pageFlipped($rightPg, $rightPg.closest(".pages"));	// 再呼叫一次pageFlipped重新產生簽核物件元素, 2016.1.27 新增$pages參數
													});
												}
												// 2016.6.22 新增只有線上簽核要新增本文頁及記錄
												if(_model.getSignType() == "E") {
													if(dm.dirty()) {	// 2016.11.11 新增內容異動時, 依條件保留簽核物件
														var n = _model.getDraftPageCounts(_currPo.draftIdx);
														for(var i=0; i<n; i++) {
															try {
																var p = _model.getDraftPage(_currPo.draftIdx, i);
																if(p) {
																	if(_model.getReserveSO() &&				// 2016.11.10 改依FolioModel的變數決定是否保留簽署物件
																		//dm.getDocType() != "簽稿會核單" &&	// 2016.11.11 依一代邏輯, 簽稿會核單及會辦單不保留
																		//dm.getDocType() != "會辦單") {
																		((dm.getDocType() != "簽稿會核單" &&	// 2016.11.11 依一代邏輯, 簽稿會核單及會辦單不保留
																		dm.getDocType() != "會辦單") || theSSO.User.EnvSettings.get("WE_ALLOW_CON_KEEP_SIGNOBJ") == "Y")) {// 1081213 Raymond 1080785 新增的環境變數WE_ALLOW_CON_KEEP_SIGNOBJ可啟用允許簽稿會核單保留異動內容前所新增的簽核物件功能
																		theLogger.log("保留簽署物件");
																		for(var j=0; j<p.signObjs.length; j++) {
																			if("saType" in p.signObjs[j]) {
																				theLogger.log("保留位於簽核區域內的簽核物件(id:" + p.signObjs[j].id + ")");
																				if(!("reservedSO" in p))
																					p.reservedSO = [];
																				p.reservedSO.push(p.signObjs[j]);
																			}
																			//else	TODO: 未定義簽核框內但位於簽核框內?
																		}
																		p.signObjs.length = 0;
																	}
																	else {
																		theLogger.log("不保留簽核物件");
																		if("signObjs" in p)
																			p.signObjs.length = 0;
																		if("reservedSO" in p)
																			p.reservedSO.length = 0;
																	}
																}
															}
															catch(e) {
																theLogger.error("找不到文稿" + _currPo.draftIdx + ", 第" + i + "頁");
															}
														}
													}
													// 2015.10.2 修正前版保留物件位於不同頁次上, 需要搬移到簽核區域所在頁次的問題
													if("reservedSO" in pg) {
														theLogger.log(pg.reservedSO);
														theLogger.log(_memPPD[_currPo.draftIdx].signAreas);
														var rmvLst = [];
														for(var i=0; i<pg.reservedSO.length; i++) {
															for(var j=0; j<_memPPD[_currPo.draftIdx].signAreas.length; j++) {
																var sa = _memPPD[_currPo.draftIdx].signAreas[j];
																if(((pg.reservedSO[i].saType == "群組" || pg.reservedSO[i].saType == "0") && sa.saType == "0") ||
																	((pg.reservedSO[i].saType == "角色" || pg.reservedSO[i].saType == "1") && sa.saType == "1")) {
																	if(pg.reservedSO[i].po != sa.po) {
																		theLogger.log("保留的簽核物件(ID:" + pg.reservedSO[i].id + ")頁次(" + pg.reservedSO[i].po + ")與簽核區域所在頁次(" + sa.po + ")不一致, 移動");
																		var otherPg = _model.getDraftPage(_currPo.draftIdx, sa.po);
																		if(!("reservedSO" in otherPg))
																			otherPg.reservedSO = [];
																		pg.reservedSO[i].po = sa.po;	// 更新頁次
																		otherPg.reservedSO.push(pg.reservedSO[i]);
																		rmvLst.push(i);
																	}
																	break;
																}
															}
														}
														for(var i=rmvLst.length-1; i>=0; i--) {
															theLogger.log("移除本頁的保留物件(" + rmvLst[i] + ")");
															pg.reservedSO.splice(rmvLst[i], 1);
														}
													}
													// 2015.12.4 修正此版簽核物件位於不同頁次上, 需要搬移到簽核區域所在頁次的問題
													if("signObjs" in pg) {
														theLogger.log(pg.signObjs);
														theLogger.log(_memPPD[_currPo.draftIdx].signAreas);
														var rmvLst = [];
														for(var i=0; i<pg.signObjs.length; i++) {
															if(!("po" in pg.signObjs[i]))
																pg.signObjs[i].po = pg.po;
															for(var j=0; j<_memPPD[_currPo.draftIdx].signAreas.length; j++) {
																var sa = _memPPD[_currPo.draftIdx].signAreas[j];
																if(((pg.signObjs[i].saType == "群組" || pg.signObjs[i].saType == "0") && sa.saType == "0") ||
																	((pg.signObjs[i].saType == "角色" || pg.signObjs[i].saType == "1") && sa.saType == "1")) {
																	if(pg.signObjs[i].po != sa.po) {
																		theLogger.log("本版本的簽核物件(ID:" + pg.signObjs[i].id + ")頁次(" + pg.signObjs[i].po + ")與簽核區域所在頁次(" + sa.po + ")不一致, 移動");
																		var otherPg = _model.getDraftPage(_currPo.draftIdx, sa.po);
																		if(!("reservedSO" in otherPg))	// 將本版簽核物移至保留物件
																			otherPg.reservedSO = [];
																		pg.signObjs[i].po = sa.po;	// 更新頁次
																		otherPg.reservedSO.push(pg.signObjs[i]);
																		rmvLst.push(i);
																	}
																	break;
																}
															}
														}
														for(var i=rmvLst.length-1; i>=0; i--) {
															theLogger.log("移除本頁的簽核物件(" + rmvLst[i] + ")");
															pg.signObjs.splice(rmvLst[i], 1);
														}
													}
													// 1141002 Raymond 修正從追蹤修訂模式切回完稿模式若發生頁數減少情況時, 新加蓋的簽核物件不會從追蹤修訂模式時的最末頁移至完稿模式時的最末頁顯示的問題
													for(var i=0; i<pg.container.draftPages?.pages?.length; i++) {
														let lookupPg = pg.container.draftPages.pages[i];
														for(let j=0; j<lookupPg.newSignObjs?.length; j++) {	// 本流程新增的簽核物件
															if(!!lookupPg.newSignObjs[j].saType && !!lookupPg.newSignObjs[j].saID) {	// 若是簽核區域內物件
																for(let k=0; k<_memPPD[_currPo.draftIdx].signAreas.length; k++) {
																	// 1141027 Raymond 北榮序322 修正在邊界區的簽核區域蓋章並儲存後, 翻頁會轉圈圈問題
																	//if(_memPPD[_currPo.draftIdx].signAreas[k].saType == lookupPg.newSignObjs[j].saType && _memPPD[_currPo.draftIdx].signAreas[k].id == lookupPg.newSignObjs[j].saID) {
																	if(_memPPD[_currPo.draftIdx].signAreas[k].saType == lookupPg.newSignObjs[j].saType && _memPPD[_currPo.draftIdx].signAreas[k].id == lookupPg.newSignObjs[j].saID && typeof _memPPD[_currPo.draftIdx].signAreas[k].po !== "undefined") {
																		if(lookupPg.po == _memPPD[_currPo.draftIdx].signAreas[k].po) {
																			theLogger.debug("簽核區域內簽核物件位於P#" + lookupPg.po + ", 與簽核區域同頁, 不需搬移");
																		}
																		else {
																			theLogger.warn("簽核區域內簽核物件位於P#" + lookupPg.po + ", 因切換追蹤修訂模式等原因導致簽核區域跑到P#" + _memPPD[_currPo.draftIdx].signAreas[k].po + ", 搬移簽核物件綁定頁面");
																			var p = _model.getDraftPage(_currPo.draftIdx, _memPPD[_currPo.draftIdx].signAreas[k].po);
																			if(!!p) {
																				var so = lookupPg.newSignObjs.splice(j, 1)[0];
																				so.boundTo = p;
																				p.newSignObjs.push(so);
																				--j;
																				break;	// break k-loop
																			}
																			else
																				theLogger.error("找不到頁次P#" + _memPPD[_currPo.draftIdx].signAreas[k].po);
																		}
																	}
																}
															}
															else {	// 若是簽核區域外物件
															}
														}
													}
												}
												window.tokenSelector.setTokenEditCacheReady(fo.flow.guid); //2017.2.23	Leslie	設定tokenEdit已完成
												// 1100909 Raymond 1101135 若文稿內容有異動(機關客製化邏輯改變欄位(發文機關全銜)預設內容), 則立即重新整理
												theLogger.log("initFO花了 " + (new Date() - t0) + " ms");
												if(dm.needRetransInitialFO()) {
													theLogger.warn("文稿內容(發文機關全銜)有異動, 立即重新整理");
													t0 = new Date();
													dm.getInternalFO().done(initFO);
												}
												else {
													// 1120816 Raymond 1120503 新增判斷回傳值是否有超出單頁範圍的自訂表格條列
													if(arguments.length > 1 && !!arguments[1]) {
														var $overflowElem = $(arguments[1]);
														alert("條列「" + $overflowElem.find("span.plain").text() + "」下的自訂表格(ID:" + $overflowElem.find(".custom-table").attr("id") + ")高度超出單頁內文容許的高度,\n請減少自訂表格列數、文字行數或拆分為兩個表格。");
													}
													// 1140224 Raymond 1131303 新增切換文稿顯示時重新整理錯別字校正窗格
													if(!_model.isRefDoc() && !!dm.refreshFixWordList)
														dm.refreshFixWordList();
													dfd.resolve();
												}
											})
											.fail(function(errorText) {
												// 1121108 Raymond 1120881 新增判斷是否為頁數縮減造成的錯誤, 若是則異動目前頁序再重新整理一次
												if(errorText.match(/指定頁次\((\d+)\)超出範圍\(總頁數:(\d+)\)/)) {
													console.log(RegExp.$1, RegExp.$2);
													if(RegExp.$2 > 0) {
														theLogger.warn(errorText + ", 重設頁次為最末頁#" + (RegExp.$2 - 1));
														_currPo.po = RegExp.$2 - 1;
														t0 = new Date();
														dm.getInternalFO().done(initFO);
													}
													else
														dfd.reject(errorText, fallback);
												}
												else
												dfd.reject(errorText, fallback);	// 2015.12.29 新增傳入翻頁失敗時回呼函式參數
											});
									})
									.fail(function(errorText) {
										dfd.reject(errorText, fallback);	// 2015.12.29 新增傳入翻頁失敗時回呼函式參數
									});
							}
							else {  // 來文
								//_memPPD[_currPo.draftIdx].pg = pg;
								_memPPD[_currPo.draftIdx].pages = _model.getDraftPageCounts(_currPo.draftIdx);
								
								// 更新頁數
								_memPPD[_currPo.draftIdx].ti.find(".ui-li-count").text(_memPPD[_currPo.draftIdx].pages);
								
								// 1090914 Raymond 1090529 若機關暱稱為SMEG(信保基金), 檢查是否為AKI800調閱公文且應套用強制浮水印, 恢復底圖為空白
								var uo = _model.getUNVObj();
								// 1100623 Raymond 1100780 新增一般機關也可套用強制浮水印功能
								//if(theUserInfo.OrgNickName == "SMEG" && !!uo && typeof uo.UnvRoot.ForceDisplayWaterMark === "string" && uo.UnvRoot.ForceDisplayWaterMark.match(/true/i)) {
								if(!!uo && typeof uo.UnvRoot.ForceDisplayWaterMark === "string" && uo.UnvRoot.ForceDisplayWaterMark.match(/true/i)) {
									if($pg.closest(".pages").find("#pgFrontFace").get(0).style.backgroundImage != "")
										$pg.closest(".pages").find("#pgFrontFace").get(0).style.backgroundImage = "";
								}
								// 1090828 Raymond 1090529 指定第3參數為true, 表示取得影像用於顯示用(若是AKI800調閱公文則判斷是否應套用強制顯示浮水印)
								//_model.getPageImage(pg)
								_model.getPageImage(pg, null, true)
									//.done(function(data) {
									//	theLogger.log(data);
									.done(function(data, dpi) {	// 1061102 Raymond 1060788 多傳入第2個參數表示影像檔的dpi
										if(data.match(/^data:/) && data.length > 100)	// 減少LOG長度
											theLogger.log(data.substring(0, 100) + "...略(共 " + data.length + " words), dpi:" + dpi);
										else
											theLogger.log(data + ", dpi:" + dpi);
										// 1080527 Raymond 1080451 點開併案公文若第一頁即為來文, 在IE下切回主文(第一筆)時, 因Cached的正副抄本DIV的child元素消失(IE才會, 原因未知), 導致由Cache恢復的正副抄本內容變空, 正確作法應如同點文稿頁籤就呼叫clearByChangeGuid一樣, 在第一頁是來文時即呼叫clearByChangeGuid
										window.tokenSelector.clearByChangeGuid();	// 因為是來文頁面, 故不用給GUID參數
										//alert(navigator.userAgent);
										/* 2014.8.25 - Raymond, 改用ImgTran處理高解析度來文影像檔
										if(navigator.userAgent.search(/Mobile/i) >= 0)
											$("<div class='pg' style='width:210mm; height:297mm; overflow:hidden'><iframe style='width:210mm; height:297mm; -webkit-transform:scale(0.32);'></iframe><div class='cover-layer'/></div>").appendTo($pg)
												.find("iframe").attr("src", data);
										else*/
										// 1061102 Raymond 1060788 來文本文頁面尺寸不是直式A4時, 須因應調整pages大小及tags位置
										//	$("<div class='pg'><img style='width:210mm; height:297mm; -webkit-user-select:none'/><div class='cover-layer'/></div>").appendTo($pg)
										//		.find("img").attr("src", data);
										var $img = $("<div class='pg'><img class='fromdoc' style='width:210mm; height:297mm; -webkit-user-select:none'/><div class='cover-layer'/></div>").appendTo($pg)
												.find("img").attr("src", data);
										$img.on("load", function(event) {
											console.log("來文本文頁面影像.on" + event.type + "(" + event.target.naturalWidth + " x " + event.target.naturalHeight + ")");
											if("naturalWidth" in event.target && "naturalHeight" in event.target) {
												var w = event.target.naturalWidth / (dpi || 300),	// 頁面影像為200dpi, 若有傳入dpi參數則以dpi為準
													h = event.target.naturalHeight / (dpi || 300);	// 2016.8.25 改成預設300dpi
												//setTimeout(function() {	// for debug的延遲
												$img.css({width: w + "in", height: h + "in"});
												
												$img.closest(".pages").css({width: "calc(" + w + "in + 153px)"/*, height: "calc(" + h + "in + 20mm)"*/});	// 2016.3.15 FIX切換附件時出現捲動條問題
												
												// 1060428 Raymond 1060271 附件頁面影像載入完成比pageFlipped回呼函式執行還慢時, 要重設頁籤位置, 否則頁籤不會移動
												var prePos = $img.closest(".viewPort").find(".tags").css("left");
												$img.closest(".viewPort").find(".tags").css("left", "calc(" + w + "in + 12px)");
												$img.closest(".pages").find("#pgFlippedIn").css({width: w + "in", height: h + "in"});
												var postPos = $img.closest(".viewPort").find(".tags").css("left");
												theLogger.log("頁籤調整前位置:" + prePos + "(" + parseFloat(prePos) + "), 調整後位置:" + postPos + "(" + parseFloat(postPos) + ")");
												if(Math.abs(parseFloat(prePos) - parseFloat(postPos)) > 10) {	// 若頁籤位置在因應附件頁面寬度調整後差距超過10px, 則隱藏指令列, 以免以按頁籤方式換頁時會殘留指令列在舊的頁籤位置
													theLogger.warn("頁籤位置變動距離超過一定範圍, 隱藏指令列");
													var c = $img.closest(".viewPort").data("editCursor");
													if(!!c)
														c.cmdFloat.hide();
												}
												//}, 1000);
											}
										})
										.on("error", function(event) {
											theLogger.error(event);
										});
										
										if(c)
											c.cmdFloat.hide();
										
										// 建立簽核物件
										if(pg) {
											_memPPD[_currPo.draftIdx].pg = pg;
											//buildSO(pg);
										}
										
										dfd.resolve();
									})
									.fail(function(errorText) {
										dfd.reject(errorText, fallback);	// 2015.12.29 新增傳入翻頁失敗時回呼函式參數
									});
							}
						})
						.fail(function(errorText) {
							dfd.reject(errorText, fallback);	// 2015.12.29 新增傳入翻頁失敗時回呼函式參數
						});
					}
				}
				else {  // 附件
					if(_memPPA[_currPo.attIdx] != undefined && _memPPA[_currPo.attIdx].ti != undefined)
						_memPPA[_currPo.attIdx].ti.trigger("selected");
					
					// 1121229 Raymond 1120974 修正目前正在檢視附件頁面時, 開啟附件管理子視窗刪除目前附件後, 會發生Error轉圈圈的問題
					// 2016.8.5 判斷是否匯出頁面中
					//if(_memPPA[_currPo.attIdx].padding) {
					if(_memPPA[_currPo.attIdx] != undefined && _memPPA[_currPo.attIdx].padding) {
						var $prog = $("<div class='pg'><p>匯出頁面中</p></div>").appendTo($pg);
						dfd.resolve();
						return dfd.promise();
					}
					
					// 簽核頁面
					try {
						// 1131211 Raymond 1131110 修正在歷史檢視時點擊顯示來文的附件頁面後, 切換至其它文稿數少於當前的流程點(ex.分文)時, 會出現"要求取得第X個文稿附件數量, 超出範圍"錯誤的問題
						// 1061006 Raymond 修正刪除或置換、上下移附件後refresh, 無附件頁面而跳出錯誤問題
						//var cAtt = _model.getDraftAttCounts(_currPo.draftIdx);
						var cAtt;
						try {
							cAtt = _model.getDraftAttCounts(_currPo.draftIdx);
						}
						catch(ex) {
							cAtt = 0;
						}
						if(_currPo.attIdx >= cAtt) {
							theLogger.warn("指定附件 " + _currPo.attIdx + "超過稿件#" + _currPo.draftIdx + "的附件數(" + cAtt + ")");
							if(cAtt == 0) {
								theLogger.warn("重設為顯示文稿本文第一頁");
								_currPo.attIdx = -1;
								_currPo.po = 0;
							}
							else {
								theLogger.warn("重設為顯示最末筆附件的第一頁");
								_currPo.attIdx = cAtt - 1;
								// 1061027	Leslie[1060973]	修正於檢視附件頁面時，執行附件維護後，造成的翻頁異常
								//_currPo = 0;
								_currPo.po = 0;
							}
							return arguments.callee.apply(this, arguments);	// call self again;
						}
						else {
							var cAP = _model.getAttPageCounts(_currPo.draftIdx, _currPo.attIdx);
							if(_currPo.po >= cAP) {
								theLogger.warn("指定頁次 " + _currPo.po + "超過附件#" + _currPo.attIdx + "頁數(" + cAP + ")");
								// 1061027	Leslie[1060973]	修正於檢視附件頁面時，執行附件維護後，造成的翻頁異常
								//if(c == 0) {
								if(cAP == 0) {
									theLogger.warn("重設為顯示文稿本文第一頁");
									_currPo.attIdx = -1;
									_currPo.po = 0;
								}
								else {
									theLogger.warn("重設為顯示附件的最末頁");
									// 1061027	Leslie[1060973]	修正於檢視附件頁面時，執行附件維護後，造成的翻頁異常
									//_currPo = cAP - 1;
									_currPo.po = cAP - 1;
								}
								return arguments.callee.apply(this, arguments);	// call self again;
							}
						}
						var pg = _model.getAttPage(_currPo.draftIdx, _currPo.attIdx, _currPo.po);
					}
					catch(e) {
						theLogger.error("Exception! " + e.message + " - " + e.sourceURL + ":" + e.line);
						dfd.reject(e.message, fallback);	// 2015.3.20 對應附件不匯出頁面的錯誤處理	2015.12.29 新增傳入翻頁失敗時回呼函式參數
						return dfd.promise();
					}
					
					//_memPPA[_currPo.attIdx].pg = pg;
					_memPPA[_currPo.attIdx].pages = _model.getAttPageCounts(_currPo.draftIdx, _currPo.attIdx);
					
					// 1090914 Raymond 1090529 若機關暱稱為SMEG(信保基金), 檢查是否為AKI800調閱公文且應套用強制浮水印, 恢復底圖為空白
					var uo = _model.getUNVObj();
					// 1100623 Raymond 1100780 新增一般機關也可套用強制浮水印功能
					//if(theUserInfo.OrgNickName == "SMEG" && !!uo && typeof uo.UnvRoot.ForceDisplayWaterMark === "string" && uo.UnvRoot.ForceDisplayWaterMark.match(/true/i)) {
					if(!!uo && typeof uo.UnvRoot.ForceDisplayWaterMark === "string" && uo.UnvRoot.ForceDisplayWaterMark.match(/true/i)) {
						if($pg.closest(".pages").find("#pgFrontFace").get(0).style.backgroundImage != "")
							$pg.closest(".pages").find("#pgFrontFace").get(0).style.backgroundImage = "";
					}
					// 1090828 Raymond 1090529 指定第3參數為true, 表示取得影像用於顯示用(若是AKI800調閱公文則判斷是否應套用強制顯示浮水印)
					// 產生頁面
					//_model.getPageImage(pg)
					_model.getPageImage(pg, null, true)
						.done(function(data, dpi) {	// 2016.4.27 多傳入第2個參數表示影像檔的dpi
							if(data.match(/^data:/) && data.length > 100)	// 2016.9.5 減少LOG長度
								theLogger.log(data.substring(0, 100) + "...略(共 " + data.length + " words), dpi:" + dpi);
							else
								theLogger.log(data + ", dpi:" + dpi);
							/* 2014.5.8 - Raymond, 採imgtran轉降解析度不需要用iframe了
							if(navigator.userAgent.search(/Mobile/i) >= 0)
								$("<div class='pg' style='width:210mm; height:297mm; overflow:hidden'><iframe style='width:210mm; height:297mm; -webkit-transform:scale(0.32);'></iframe><div class='cover-layer'/></div>").appendTo($pg)
									.find("iframe").attr("src", data);
							else*/
							// 2015.7.14 新增頁碼顯示
							var $img = $("<div class='pg'><img class='attachment' style='width:210mm; height:297mm; -webkit-user-select:none'/><div class='cover-layer'><div class='page-no'>第 " + (_currPo.po + 1) + " 頁，共 " + _memPPA[_currPo.attIdx].pages + " 頁</div></div></div>").appendTo($pg)
									.find("img").attr("src", data).data("pgo", pg);	// 2015.2.3 added, 'attachment' class for remark as attachment
																					// 'pgo' data for recording rotation state
							
							// 2016.1.27 附件頁面尺寸不一定是A4, 須因應調整pages大小及tags位置
							$img.on("load", function(event) {
								console.log("附件頁面影像.on" + event.type + "(" + event.target.naturalWidth + " x " + event.target.naturalHeight + ")");
								if("naturalWidth" in event.target && "naturalHeight" in event.target) {
									var w = event.target.naturalWidth / (dpi || 300),	// 頁面影像為200dpi, 若有傳入dpi參數則以dpi為準
										h = event.target.naturalHeight / (dpi || 300);	// 2016.8.25 改成預設300dpi
									//setTimeout(function() {	// for debug的延遲
									$img.css({width: w + "in", height: h + "in"}).attr("data-width", w + "in").attr("data-height", h + "in");	// 1061113 Raymond 1061068 新增影像檔原始寬高資訊
									
									$img.closest(".pages").css({width: "calc(" + w + "in + 153px)"/*, height: "calc(" + h + "in + 20mm)"*/});	// 2016.3.15 FIX切換附件時出現捲動條問題
									
									// 1060428 Raymond 1060271 附件頁面影像載入完成比pageFlipped回呼函式執行還慢時, 要重設頁籤位置, 否則頁籤不會移動
									var prePos = $img.closest(".viewPort").find(".tags").css("left");
									$img.closest(".viewPort").find(".tags").css("left", "calc(" + w + "in + 12px)");
									$img.closest(".pages").find("#pgFlippedIn").css({width: w + "in", height: h + "in"});
									var postPos = $img.closest(".viewPort").find(".tags").css("left");
									theLogger.log("頁籤調整前位置:" + prePos + "(" + parseFloat(prePos) + "), 調整後位置:" + postPos + "(" + parseFloat(postPos) + ")");
									if(Math.abs(parseFloat(prePos) - parseFloat(postPos)) > 10) {	// 若頁籤位置在因應附件頁面寬度調整後差距超過10px, 則隱藏指令列, 以免以按頁籤方式換頁時會殘留指令列在舊的頁籤位置
										theLogger.warn("頁籤位置變動距離超過一定範圍, 隱藏指令列");
										var c = $img.closest(".viewPort").data("editCursor");
										if(!!c)
											c.cmdFloat.hide();
									}
									//}, 1000);
								}
							});
							
							// 1060606 Raymond 1060283 修正旋轉附件頁面功能改為呼叫WS直接影像處理
							// 2015.2.3 added, for restoring rotation state
							/*if(pg && "rotate" in pg) {
								var cx = $img.width();
								var cy = $img.height();
								var cxx = $img.parent().width();
								if(pg.rotate == 90)
									$img.css({"-webkit-transform-origin": "left top",
											"-webkit-transform": "rotate(" + pg.rotate + "deg) scale(" + (cxx / cy) + ") translate(0px,-" + cy + "px)",
											"-moz-transform-origin": "left top",	// 2016.2.16 新增FireFox等其它瀏覽器CSS語法
											"-moz-transform": "rotate(" + pg.rotate + "deg) scale(" + (cxx / cy) + ") translate(0px,-" + cy + "px)",
											"-ms-transform-origin": "left top",
											"-ms-transform": "rotate(" + pg.rotate + "deg) scale(" + (cxx / cy) + ") translate(0px,-" + cy + "px)",
											"transform-origin": "left top",
											"transform": "rotate(" + pg.rotate + "deg) scale(" + (cxx / cy) + ") translate(0px,-" + cy + "px)"});
								else if(pg.rotate == 180)
									$img.css({"-webkit-transform-origin": "left top",
											"-webkit-transform": "rotate(" + pg.rotate + "deg) scale(1.0) translate(-" + cx + "px,-" + cy + "px)",
											"-moz-transform-origin": "left top",	// 2016.2.16 新增FireFox等其它瀏覽器CSS語法
											"-moz-transform": "rotate(" + pg.rotate + "deg) scale(1.0) translate(-" + cx + "px,-" + cy + "px)",
											"-ms-transform-origin": "left top",
											"-ms-transform": "rotate(" + pg.rotate + "deg) scale(1.0) translate(-" + cx + "px,-" + cy + "px)",
											"transform-origin": "left top",
											"transform": "rotate(" + pg.rotate + "deg) scale(1.0) translate(-" + cx + "px,-" + cy + "px)"});
								else if(pg.rotate == 270)
									$img.css({"-webkit-transform-origin": "left top",
											"-webkit-transform": "rotate(" + pg.rotate + "deg) scale(" + (cxx / cy) + ") translate(-" + cx + "px,0px)",
											"-moz-transform-origin": "left top",	// 2016.2.16 新增FireFox等其它瀏覽器CSS語法
											"-moz-transform": "rotate(" + pg.rotate + "deg) scale(" + (cxx / cy) + ") translate(-" + cx + "px,0px)",
											"-ms-transform-origin": "left top",
											"-ms-transform": "rotate(" + pg.rotate + "deg) scale(" + (cxx / cy) + ") translate(-" + cx + "px,0px)",
											"transform-origin": "left top",
											"transform": "rotate(" + pg.rotate + "deg) scale(" + (cxx / cy) + ") translate(-" + cx + "px,0px)"});
							}*/
							
							// 建立簽核物件
							if(pg) {
								_memPPA[_currPo.attIdx].pg = pg;
								//buildSO(pg);
							}
							
							dfd.resolve();
						})
						.fail(function(errorText) {
							dfd.reject(errorText, fallback);	// 2015.12.29 新增傳入翻頁失敗時回呼函式參數
						});
				}
			}
			return dfd.promise();
		},
		reqNextPage: function($pg) {
			// 1131213 Raymond 1131064 新增環境變數「WE_ALLOW_VIEW_READONLY_PAPER_DOC_FOLDER」, 當目前資料夾符合設定值時, 允許禁止編輯內文的紙本公文, 可以檢視文稿
			// 1110328 Leslie[1100287]	Merge[1070359]	將preprocessXML函式expose到nsEditor, 供調閱DI檔時叫用
			//if(_model.getDocObj().signType == "P" && !_model.enableEdit()) {	// 2016.12.30 卡紙本不允許編輯內文的流程點不可以看文稿
			//if(_model.getDocObj().signType == "P" && !_model.enableEdit() && !("aol_disable_odc010" in _model.getDocObj().uiParam)) {
			var allowViewReadOnlyPaperDocFolder = theSSO.User.EnvSettings.get("WE_ALLOW_VIEW_READONLY_PAPER_DOC_FOLDER").split(";");
			var thisFolder = _model.getDocObj().folder + "-" + _model.getDocObj().subfolder;
			var allowViewReadOnlyPaperDoc = allowViewReadOnlyPaperDocFolder.indexOf(thisFolder) >= 0;
			if(_model.getDocObj().signType == "P" && !_model.enableEdit() && !("aol_disable_odc010" in _model.getDocObj().uiParam) && !allowViewReadOnlyPaperDoc) {
				theLogger.warn("此流程點不允許編輯紙本公文內文, 禁止翻頁");
				return $.Deferred().reject("本流程點不允許編輯紙本公文內文");
			}
			// 1110301 Raymond 1110106 合併1080815, 偵測有頁面的次筆附件
			var oldAttIdx = _currPo.attIdx;	// 記憶目前的附件Index及頁碼
			var oldPo = _currPo.po;
			function hasNextAttPage() {
				var n = _model.getDraftAttCounts(_currPo.draftIdx);
				// 1131022 Raymond 1131016 修正在附件最後一頁點擊下一頁出現「已無次頁」後再點擊下一頁會變成翻回第一筆附件的第一頁的問題
				var oldAttIdx = _currPo.attIdx;
				while((_currPo.attIdx + 1) < n) {
					if(_memPPA[++_currPo.attIdx].pages > 0)
						return true;
				}
				// 1131022 Raymond 1131016 修正在附件最後一頁點擊下一頁出現「已無次頁」後再點擊下一頁會變成翻回第一筆附件的第一頁的問題
				// 1131007 Raymond 1130988 修正翻次頁, 有附件但全部無附件頁面時, _currPo.attIdx會變最末筆, 造成翻頁異常的問題
				//_currPo.attIdx = -1;
				_currPo.attIdx = oldAttIdx;
				return false;
			}
			if ((_currPo.draftIdx >= 0 && _currPo.attIdx < 0 && (_currPo.po + 1) < _memPPD[_currPo.draftIdx].pages) ||
				(_currPo.attIdx >= 0 && (_currPo.po + 1) < _memPPA[_currPo.attIdx].pages)) {
				++_currPo.po;   // 本文 or 附件的次頁
				return this.reqPage($pg, function() {	// 2015.12.29 新增翻頁失敗時恢復頁碼的函式
					theLogger.warn("翻次頁失敗, 頁碼-1");
					--_currPo.po;
				});
			}
			// 1110301 Raymond 1110106 合併1080815, 改用hasNextAttPage偵測是否下筆附件有頁面, 會跳過無匯出頁面的附件
			//else if(_currPo.draftIdx >= 0 && (_currPo.attIdx + 1) < _model.getDraftAttCounts(_currPo.draftIdx) && _memPPA[_currPo.attIdx + 1].pages > 0) {	// 2015.12.18 修正附件無頁面時跳至次文稿顯示, (不知是否有單筆附件無頁面情形?)
			//	var oldPo = _currPo.po;	// 2015.12.29 暫時記憶翻次筆附件前的頁碼
			//	++_currPo.attIdx;   // 次筆附件
			//	_currPo.po = 0;
			//	return this.reqPage($pg, function() {	// 2015.12.29 新增翻頁失敗時恢復頁碼的函式
			//		theLogger.warn("翻次頁失敗, 附件序-1, 頁碼復原");
			//		--_currPo.attIdx;
			//		_currPo.po = oldPo;
			//	});
			//}
			else if(_currPo.draftIdx >= 0 && hasNextAttPage()) {	// 2015.12.18 修正附件無頁面時跳至次文稿顯示, (不知是否有單筆附件無頁面情形?)
				_currPo.po = 0;
				return this.reqPage($pg, function() {	// 2015.12.29 新增翻頁失敗時恢復頁碼的函式
					theLogger.warn("翻次頁失敗, 附件序-1, 頁碼復原");
					_currPo.attIdx = oldAttIdx;
					_currPo.po = oldPo;
				});
			}
			else if((_currPo.draftIdx + 1) < _model.getDraftCounts()) {
				if(!_model.readOnly()) {
					if(_currPo.draftIdx < 0 && typeof fnODC010Save !== "undefined")	{// 2014.10.21 - Raymond, 若當前頁是公文基資, 則呼叫fnODC010Save儲存功能
						var res = fnODC010Save();						// 2016.7.19 新增判斷fnODC010Save的回傳值, 若是false表示有欄位未填之類的錯誤, 不允許翻頁
						if(typeof res === "boolean" && res == false)
							return $.Deferred().reject("請修正後再翻頁");
					}
				}
				else
					theLogger.log("唯讀模式不呼叫fnODC010Save");
				// 1110301 Raymond 1110106 合併1080815, 暫時記憶附件Index及頁碼移至上方
				//var oldAttIdx = _currPo.attIdx,	// 2015.12.29 暫時記憶翻次筆文稿前的附件Index及頁碼
				//	oldPo = _currPo.po;
				++_currPo.draftIdx; // 次筆文稿
				_currPo.attIdx = -1;
				_currPo.po = 0;
				return this.reqPage($pg, function() {	// 2015.12.29 新增翻頁失敗時恢復頁碼的函式
					theLogger.warn("翻次頁失敗, 文稿序-1, 附件序復原, 頁碼復原");
					--_currPo.draftIdx;
					_currPo.attIdx = oldAttIdx;
					_currPo.po = oldPo;
				});
			}
			return $.Deferred().reject("已無次頁");	// 1061102 Raymond 1061078 typo
		},
		reqPrevPage: function($pg) {
			// 1110301 Raymond 1110106 合併1080815, 偵測有頁面的前筆附件
			var oldAttIdx = _currPo.attIdx;	// 記憶目前的附件Index及頁碼
			var oldPo = _currPo.po;
			function hasPrevAttPage() {
				while(--_currPo.attIdx >= 0) {
					if(_memPPA[_currPo.attIdx].pages > 0)
						return true;
				}
				return true;	// _currPo.attIdx減到-1時代表文稿, 應有頁面
			}
			if(_currPo.po > 0) {
				--_currPo.po;
				return this.reqPage($pg, function() {	// 2015.12.29 新增翻頁失敗時恢復頁碼的函式
					theLogger.warn("翻前頁失敗, 頁碼+1");
					++_currPo.po;
				});
			}
			// 1110301 Raymond 1110106 合併1080815, 改用hasPrevAttPage偵測是否前筆附件有頁面, 會跳過無匯出頁面的附件
			//else if(_currPo.attIdx >= 0) {
			//	var oldPo = _currPo.po;	// 2015.12.29 暫時記憶翻前筆附件前的頁碼
			//	--_currPo.attIdx;
			//	if(_currPo.attIdx >= 0)
			//		_currPo.po = _memPPA[_currPo.attIdx].pages - 1;
			//	else
			//		_currPo.po = 0;
			//	return this.reqPage($pg, function() {	// 2015.12.29 新增翻頁失敗時恢復頁碼的函式
			//		theLogger.warn("翻前頁失敗, 附件序+1, 頁碼復原");
			//		++_currPo.attIdx;
			//		_currPo.po = oldPo;
			//	});
			//}
			else if(_currPo.attIdx >= 0 && hasPrevAttPage()) {
				if(_currPo.attIdx >= 0)
					_currPo.po = _memPPA[_currPo.attIdx].pages - 1;
				else
					_currPo.po = _memPPD[_currPo.draftIdx].pages - 1;
				return this.reqPage($pg, function() {	// 2015.12.29 新增翻頁失敗時恢復頁碼的函式
					theLogger.warn("翻前頁失敗, 附件序+1, 頁碼復原");
					_currPo.attIdx = oldAttIdx;
					_currPo.po = oldPo;
				});
			}
			else if(_currPo.draftIdx >= 0) {
				// 1110301 Raymond 1110106 合併1080815, 暫時記憶附件Index及頁碼移至上方
				//var oldAttIdx = _currPo.attIdx,	// 2015.12.29 暫時記憶翻前筆文稿前的附件Index及頁碼
				//	oldPo = _currPo.po;
				--_currPo.draftIdx;
				if(_currPo.draftIdx >= 0) {
					// 1110301 Raymond 1110106 合併1080815, 修正向前翻頁跨至前一文稿時, 應更新附件頁籤
					//_currPo.attIdx = _model.getDraftAttCounts(_currPo.draftIdx) - 1;
					//if(_currPo.attIdx >= 0 && !(_currPo.attIdx in _memPPA))	// 2016.1.28 向前翻應先重整附件頁籤, 2016.11.1 bugfix, 無附件時attIdx為-1
					//	_memPPA[_currPo.attIdx] = {ti: undefined, pages: _model.getAttPageCounts(_currPo.draftIdx, _currPo.attIdx)};
					//if(_currPo.attIdx >= 0 && _memPPA[_currPo.attIdx].pages > 0)	// 2015.12.18 修正附件無頁面時跳至前文稿顯示, (不知是否有單筆附件無頁面情形?)
					//	_currPo.po = _memPPA[_currPo.attIdx].pages - 1;
					//else {
					//	_currPo.attIdx = -1;	// 2015.12.18 修正附件無頁面時跳至前文稿顯示, (不知是否有單筆附件無頁面情形?)
					//	_currPo.po = _memPPD[_currPo.draftIdx].pages - 1;
					//}
					_updateAttTags(_currPo.draftIdx);
					_currPo.attIdx = _model.getDraftAttCounts(_currPo.draftIdx);
					if(hasPrevAttPage()) {
						if(_currPo.attIdx >= 0)
							_currPo.po = _memPPA[_currPo.attIdx].pages - 1;
						else
							_currPo.po = _memPPD[_currPo.draftIdx].pages - 1;
					}
				}
				else {
					if(_model.hideODC010())	{	// 2016.8.12 新增支援隱藏基資頁籤功能
						++_currPo.draftIdx;	// 還原文稿序
						return $.Deferred().reject("已無前頁");	// 1061102 Raymond 1061078 typo
					}
					_currPo.attIdx = -1;
					_currPo.po = 0;
				}
				return this.reqPage($pg, function() {	// 2015.12.29 新增翻頁失敗時恢復頁碼的函式
					theLogger.warn("翻前頁失敗, 文稿序+1, 附件序復原, 頁碼復原");
					++_currPo.draftIdx;
					_currPo.attIdx = oldAttIdx;
					_currPo.po = oldPo;
				});
			}
			return $.Deferred().reject("已無前頁");	// 1061102 Raymond 1061078 typo
		},
		pageFlipped: function($pg, $pages) {   // flip外掛會呼叫這個callback function通知頁面已翻, 2016.1.27 新增$pages參數, 因公文基資會找不到.pg類型元素
			// 1130822 Raymond 中榮序179 捲動翻頁成功時exceedMargin為1, 若縮小顯示比例至無捲動條時則為3
			setTimeout(function() {	// 用setTimeout()以解決onwheel連續觸發的問題
				if($pg.length) {	// 1141110 Raymond 順便修正開啟紙本簽核公文或翻到公文基資頁時, 因為沒有.pg導致發生Error的問題
				let st = $pg.closest(".contentPane").get(0).scrollTop,
					sh = $pg.closest(".contentPane").get(0).scrollHeight,
					ih = $pg.closest(".contentPane").innerHeight();
				console.debug("%c翻頁成功:", "background-color:cyan", st, sh, ih);
				if(sh <= ih)
					exceedMargin = 3;
				else if(st > 0) {
					if(st + ih >= sh)
						exceedMargin = 2;
					else
						exceedMargin = 0;
				}
				else
					exceedMargin = 1;
				console.debug("%cexceedMargin:", "background-color:cyan", exceedMargin);
				}
			}, 0);
			if(_currPo.attIdx < 0) {
				theLogger.log("currPo - draftIdx: " + _currPo.draftIdx + ", po: " + _currPo.po);
				if(_currPo.draftIdx >= 0) { // 公文基資(draftIdx=-1)無pg物件
					theLogger.log(_memPPD[_currPo.draftIdx].pg);
					var pg = _memPPD[_currPo.draftIdx].pg;
				}
			}
			else {
				theLogger.log("currPo - attIdx: " + _currPo.attIdx + ", po: " + _currPo.po);
				theLogger.log(_memPPA[_currPo.attIdx].pg);
				var pg = _memPPA[_currPo.attIdx].pg;
			}
			if(typeof pg !== "undefined") {
				// 2015.4.30 觸發#tcMode的change事件, 重新以目前選取的追蹤修訂模式排列
				//$("#aol #tcMode").trigger("change");	// 2016.12.23 取消change以免二次refresh套用簽核物件
				
				// 2016.9.23 - Raymond, 新增取得DraftModel, 並判讀可否編輯狀態, Pass給SignObjBuilder()
				var cachedDM = _model.getCachedDM(pg.container);
				if(cachedDM)
					var draftEditable = cachedDM.getEditable();
				
				//2016.9.19	Leslie	新增disableSave模式，亦不可自動加蓋職名章
				//var soBuilder = new SignObjBuilder($pg, _model.readOnly());	// 2016.8.10 新增傳入整份公文唯讀flag
				var soBuilder = new SignObjBuilder($pg, _model.readOnly()||_model.disableSave(), draftEditable);	// 2016.9.23 - Raymond, 新增第3參數, 內文可否編輯
				$pg.data("pg", pg);
				// 登記當前裝置的Page寬高的DP, 以供GenPage反推算LP
				theLogger.log("$pg.width()=" + $pg.width() + ",height()=" + $pg.height());
				if("pageExt" in pg.container) {
					// 1060428 Raymond 固定794X1123
					// 2016.12.23 固定974X1123
					//if(pg.container.pageExt.width != 974)//$pg.width())
					//	pg.container.pageExt.width = 974;//$pg.width();
					if(pg.container.pageExt.width != 794)//$pg.width())
						pg.container.pageExt.width = 794;//$pg.width();
					if(pg.container.pageExt.height != 1123)//$pg.height())
						pg.container.pageExt.height = 1123;//$pg.height();
				}
				else {
					// 1060428 Raymond 固定794X1123
					// 2016.12.23 固定974X1123
					//pg.container.pageExt = {
					//	width: 974,//$pg.width(),
					//	height: 1123};//$pg.height()}
					pg.container.pageExt = {
						width: 794,//$pg.width(),
						height: 1123};//$pg.height()}
				}
				// 1131122 Raymond 北榮374 頁面重整後, 先檢查頁面是否已有簽核物件, 有的話要先清除, 再顯示該頁面的簽核物件, 以修正滾輪翻頁時會觸發2次pageFlipped, 同頁的簽核物件會重複出現2次的問題
				if($pg.find(".sign-obj").length) {
					console.log("pageFlipped: 頁面上已有" + $pg.find(".sign-obj").length + "個簽核物件, 重新顯示前先清除");
					$pg.find(".sign-obj").remove();
				}
				buildSO($pg, pg, soBuilder, cachedDM);	// 2017.2.13 新增cachedDM參數
				// 1130206 Raymond 1120887 簽核物件保留顯示後才允許會辦意見編輯區偵測高度變化
				window.blockDetectConEditAreaHeightChange = false;
				// 1141107 Raymond 1141113 新增顯示便利貼, 線上瀏覽調閱要顯示, AKI801、802(DocView模組)的檢視/文稿編輯不顯示
				if(SSO_CONFIG.OrgNickName == "TAITRA" && $pg.closest("#viewDoc").length == 0)
					buildNote($pg, pg, cachedDM);
			// 1090318 Raymond 1090089 修正紙本公文開啟舊檔時不會自動開啟受文者子視窗的問題
			}
			else if(_model.getSignType() == "P") {	// 紙本
				var cachedDM = _model.getCachedDM(_currPo.draftIdx);
				if(cachedDM)
					var draftEditable = cachedDM.getEditable();
			}
				
				// 1060620 Raymond 1060147 開啟舊檔後直接開啟受文者子視窗
				var isMobile = navigator.userAgent.search(/Mobile/gi) > 0;
				// 2019.12.19 - 1081132 Eric, MacPC support! window.realMac
				// 2019.10.17 - 1080905 Eric, iPadOS 13 quick-fix
				if (!isMobile && !window.realMac) {
					isMobile = navigator.userAgent.search(/Macintosh/gi) > 0;
				}
				// 1100823 Raymond 1100844 新增一代既有功能, 若符合環境變數「WE_NO_OPEN_RECEIVER_DOC_TYPES」所設定的文別, 在開啟舊檔或貼上稿件時不要自動開啟受文者編輯子視窗
				//if(draftEditable && !isMobile && cachedDM.isImported()) {
				var envNoOpenReceiverDocTypes = theSSO.User.EnvSettings.get("WE_NO_OPEN_RECEIVER_DOC_TYPES");
				var noOpenReceiverDocTypes = envNoOpenReceiverDocTypes.split(",");	// 以逗號區隔
				if(draftEditable && !isMobile && cachedDM.isImported() && (envNoOpenReceiverDocTypes.length == 0 || noOpenReceiverDocTypes.indexOf(cachedDM.getDocType()) < 0)) {
					var rl = cachedDM.nodes("/*/受文者列表");
					if(rl.length > 0) {
						var ns = $(rl[0]).find("> 受文者, > 受文者列表");
						if(ns.length > 0) {	// 1060623 Raymond 有受文者時才開啟
							//1130122	Joe		1120952		增加當匯入舊稿件含內部單位時，判斷交換代碼是否正確
							var bCheckInsideDept = true;
							if(rl[0].getElementsByTagName('受文者').length > 0)
							{
								//1130618	Joe		屏東序761	修正如果受文者沒識別碼，則補上
								var bIssuerCheck = true; 
								for(var iDept = 0; iDept < rl[0].getElementsByTagName('受文者').length; iDept++)
								{
									//1130618	Joe		屏東序761	修正如果受文者沒識別碼，則補上--S
									var Issuerguid = rl[0].getElementsByTagName('受文者')[iDept].getAttribute('識別碼');
									if(Issuerguid == null || Issuerguid=="")
									{
										theWebServices.getDocHash(theUserInfo.OrgID, theAOL.docObj.docNo+iDept.toString())
											.done(function(rtnValue) {
												rl[0].getElementsByTagName('受文者')[iDept].setAttribute('識別碼',rtnValue);
										})
										.fail(function(errorText) {
											bIssuerCheck = false;
										});
									}
									//1130618	Joe		屏東序761	修正如果受文者沒識別碼，則補上--E
									var Issuer = rl[0].getElementsByTagName('受文者')[iDept];
									if(Issuer.getElementsByTagName('內部').length > 0)
										if(Issuer.getElementsByTagName('內部')[0].textContent == "Y")
										{
											var OrgName = "",OrgNo= "", DeptNo ="";
											if(Issuer.getElementsByTagName('正式名稱').length > 0)
												OrgName = Issuer.getElementsByTagName('正式名稱')[0].textContent;
											if(Issuer.getElementsByTagName('機關代碼').length > 0)
												OrgNo = Issuer.getElementsByTagName('機關代碼')[0].textContent;
											if(Issuer.getElementsByTagName('單位代碼').length > 0)
												DeptNo = Issuer.getElementsByTagName('單位代碼')[0].textContent;
											
											if(OrgName != "" && OrgNo != "" && DeptNo != "")
											{
												var params = new SOAPClientParameters();
												params.add('argFullName', OrgName);
												params.add('OrgNo', theUserInfo.OrgID);
												params.add('DeptNo', theUserInfo.DepartID);
												params.add('UserID', theUserInfo.UserID);
												params.add('Artifact', theUserInfo.Artifact);
												
												SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("weorginfows"), "GetOrgInfo4AD", params, false, function(r)
												{
													if(r.value.Count == "0")
														bCheckInsideDept = false;
													else if(r.value.OrgID != OrgNo || r.value.DeptNo != DeptNo)
														bCheckInsideDept = false;
												});
												
											}
										}
										
									//1130618	Joe		屏東序761	修正如果受文者沒識別碼，則補上
									if(bCheckInsideDept == false)
										break;
								}
								
								if(!bIssuerCheck)
									alert("呼叫取得識別碼函式發生錯誤，請聯絡系統管理人。");
							}
							if(!bCheckInsideDept)
								alert('內部單位受文者與資料庫不一致，請修正匯入之稿件與受文者。');
							//1130122	Joe		1120952		增加當匯入舊稿件含內部單位時，判斷交換代碼是否正確--S
							theLogger.warn("開啟舊檔後直接開啟受文者子視窗");
							nsEditor.showReceiverSetting(cachedDM, function() {
									theLogger.warn("異動受文者列表, 重新整理");
									cachedDM.needRetransFO(true);// 因為是直接改rawXml, 所以要主動通知DraftModel重新套用PrintXSL, 否則排版不會變
									$pg.closest(".pages").flip("refresh");
								//1130122	Joe		1120952		增加當匯入舊稿件含內部單位時，判斷交換代碼是否正確
								// }, true);
								}, bCheckInsideDept);
						}
					}
					cachedDM.isImported(false);	// 設定非匯入, 以免翻頁或重新整理會一直出現子視窗
				}
			// 1090318 Raymond 1090089 修正紙本公文開啟舊檔時不會自動開啟受文者子視窗的問題
			//}
			
			// 1100512 Raymond 1090821 外會公文的外機關文稿的呈現檔匯出頁面後不一定是A4須調整tags位置
			// 1091014 Raymond 1090564 信保特殊模式公文本文頁面可能是橫式須調整tags位置
			// 1061102 Raymond 1060788 來文頁面不一定是A4須調整tags位置
			// 2016.1.27 附件頁面不一定是A4須調整tags位置
			//if(_currPo.attIdx < 0) {
			//if(_currPo.attIdx < 0 && (_currPo.draftIdx < 0 || !_model.isFromDoc(_currPo.draftIdx))) {
			//if(_currPo.attIdx < 0 && (_currPo.draftIdx < 0 || !(_model.isFromDoc(_currPo.draftIdx) || _model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2"))) {
			if(_currPo.attIdx < 0 && (_currPo.draftIdx < 0 || !(_model.isFromDoc(_currPo.draftIdx) || _model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2" || _model.isExorgDraft(_currPo.draftIdx)))) {
				// 1060428 Raymond 1060271 從附件頁面切回文稿頁面時, 偵測重設的頁籤位置
				//$pages.closest(".viewPort").find(".tags").css("left", "");	// 公文基資頁面$pg會是空的, 改用新增的$pages參數
				//$pages.find("#pgFlippedIn").css("width", "").css("height", "");
				var prePos = $pages.closest(".viewPort").find(".tags").css("left");
				$pages.closest(".viewPort").find(".tags").css("left", "");	// 公文基資頁面$pg會是空的, 改用新增的$pages參數
				$pages.find("#pgFlippedIn").css("width", "").css("height", "");
				var postPos = $pages.closest(".viewPort").find(".tags").css("left");
				theLogger.log("頁籤調整前位置:" + prePos + "(" + parseFloat(prePos) + "), 調整後位置:" + postPos + "(" + parseFloat(postPos) + ")");
				if(Math.abs(parseFloat(prePos) - parseFloat(postPos)) > 10) {	// 若頁籤位置在因應本文頁面寬度調整後差距超過10px, 則隱藏指令列, 以免以按頁籤方式換頁時會殘留指令列在舊的頁籤位置
					theLogger.warn("頁籤位置變動距離超過一定範圍, 隱藏指令列");
					var c = $pages.closest(".viewPort").data("editCursor");
					if(!!c)
						c.cmdFloat.hide();
				}
			}
			else {
				// 1061102 Raymond 1060788 增加判斷來文頁面的大小決定頁籤位置
				//var pgo = $pg.data("pg");
				//var w = $pg.find("img.attachment").width(),
				//	h = $pg.find("img.attachment").height();
				var w = $pg.find("img.attachment, img.fromdoc").width(),
					h = $pg.find("img.attachment, img.fromdoc").height();
				$pg.closest(".viewPort").find(".tags").css("left", "calc(" + w + "px + 12px)");
				$pg.closest(".pages").find("#pgFlippedIn").css({width: w + "px", height: h + "px"});
			}
			
			// 1140905 Raymond 1140852 新增更新頁次控制項
			if(_currPo.attIdx < 0) {
				if(_currPo.draftIdx < 0) {
					$pages.closest(".viewPort").find("#pnControl1 #totalPgs").text("1");
					$pages.closest(".viewPort").find("#pnControl1 #currPgNo").attr("max", 1).val(1);
				}
				else {
					let ttl = _model.getDraftPageCounts(_currPo.draftIdx);
					$pages.closest(".viewPort").find("#pnControl1 #totalPgs").text(ttl);
					$pages.closest(".viewPort").find("#pnControl1 #currPgNo").attr("max", ttl).val(_currPo.po + 1);
				}
			}
			else {
				let ttl = _model.getAttPageCounts(_currPo.draftIdx, _currPo.attIdx);
				$pages.closest(".viewPort").find("#pnControl1 #totalPgs").text(ttl);
				$pages.closest(".viewPort").find("#pnControl1 #currPgNo").attr("max", ttl).val(_currPo.po + 1);
			}
			$pages.closest(".viewPort").find("#pnControl1").css("left", "calc(50% - " + Math.round($pages.closest(".viewPort").find("#pnControl1").width() / 2) + "px)");
			
			// 2016.2.24
			if(_uploadInitialLog) {
				// 2019.7 - 1080654 Eric, 收集公文傳送效能時, 不在此時上傳log檔
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					theLogger.log(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 文稿初始化完畢 (FolioView.pageFlipped)...');
				}
				else {
					theLogger.log('Before Logger upload[文稿初始化完畢上傳]');
					AlternativeLogger.upload("文稿初始化完畢上傳");
				}
				_uploadInitialLog = false;
				// 1131008 Raymond 北榮序286 修正開啟公文後捲動文稿頁面到底部, 關閉/傳送後再開另一筆公文, 文稿頁面仍會顯示在底部的問題
				if($pages.closest(".viewPort").length > 0 && $pages.closest(".viewPort").parent().get(0).scrollTop > 0) {
					theLogger.log("目前簽核頁面非捲動在最上方位置(" + $pages.closest(".viewPort").parent().get(0).scrollTop + "), 重設為最上方的位置");
					$pages.closest(".viewPort").parent().get(0).scrollTop = 0;
				}

				// 2018.4.12 - NCKU107284, Eric Peng - 載入公文內容作業完成後再enable上方工具列按鈕!
				// NOTE: 公文左側參考視窗開啟時也會觸發, 應排除. [使用_model.isRefDoc()判定.]
				if (!_model.isRefDoc() && typeof SSOUtil.updateAOLTopToolbar=='function' && typeof theAOL.docObj=='object' && typeof theAOL.docObj.uiState=='object') {
					// 2018.7.27 - Eric 1070719, 只有本份公文第一次初始化完成才執行
					if (typeof theAOL.docObj.uiState=='object' && theAOL.docObj.uiState!==null) {
						theLogger.log('-I- gonna invoke SSOUtil.updateAOLTopToolbar() @RD-FolioView');
						SSOUtil.updateAOLTopToolbar(theAOL.docObj.uiState, theAOL.docObj.uiParam);	
						//theAOL.docObj.uiState = null;	// 1090221 Raymond 1081090 移至saveUI後再設為null, 若saveUI發現異常, 可取得uiState及uiParam供追蹤問題原因
						// theAOL.docObj.uiParam = null; // docObj.uiParam不可清空, 有其它地方使用!
						
						// 1070620 Raymond 第一頁初始完成後再記憶正確的UI狀態, 否則切換子文再切回母文時部份UI按鈕不會恢復顯示
						if("saveUI" in _model)
							_model.saveUI();
						theAOL.docObj.uiState = null;	// 1090221 Raymond 1081090 移至saveUI後再設為null, 若saveUI發現異常, 可取得uiState及uiParam供追蹤問題原因

						// 2019.7 - 1080654 Eric, 公文開啟效能
						var _currDocNo = theAOL.docObj.docNo;
                        if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
							_currMsgId = theAOL.docObj.msgId;
							var sDocInfo = '[DocNo=' + _currDocNo + ', MsgId=' + _currMsgId +']';
							SSOUtil.dev_logTimeElapse('FolioView.init作業', window.tmBeginFolioView);
							SSOUtil.dev_logTimeElapse('開啟公文作業(Path-1 @FolioView.pageFipped)' + sDocInfo, window.tmBeginOpenDoc);
							SSOUtil.dev_logTimeElapse('公文傳送後立即開次筆(傳送+開公文 Path-1 @FolioView.pageFipped)', window.tmBeginSubmitAndOpenNext);
							if (window.tmBeginSubmitAndOpenNext==0) {
								console.log('stop here...');
							}
							window.tmBeginOpenDoc = 0; window.tmBeginFolioView = 0; window.tmBeginSubmitAndOpenNext = 0;

							if (window.tmBeginIconOpenDoc>0) {
								SSOUtil.dev_logTimeElapse('開啟公文作業(含預覽顯示)', window.tmBeginIconOpenDoc);
								window.tmBeginIconOpenDoc = 0;
							}
						}
					}
				}
				// 1140213 Raymond 1131244 新增判斷資料夾符合環境變數「AOL_TCMODE_FOLDERS」, 切換追蹤修訂模式為預設模式
				var aolTCModeFolders = theSSO.User.EnvSettings.get("AOL_TCMODE_FOLDERS");
				if(!!aolTCModeFolders && !_model.isRefDoc()) {
					aolTCModeFolders = aolTCModeFolders.split(";");
					var fldr = _model.getDocObj().folder + "-" + _model.getDocObj().subfolder;
					if(aolTCModeFolders.indexOf(fldr) >= 0) {
						theLogger.log("資料夾'" + fldr + "'符合環境變數「AOL_TCMODE_FOLDERS」設定的資料夾, 切換追蹤修訂模式為預設模式");
						$("#aol #tcControl1 select").val(0).trigger("change");
					}
					else if(TCControl.currMode != 1) {
						console.log("目前非完稿模式, 切換回完稿模式");
						$("#aol #tcControl1 select").val(1).trigger("change");
					}
				}

				//1121215 David 1120975 判斷ODWDCM.SHOW_ALT_MSG有資料時，顯示提示訊息
				if(typeof theAOL.docObj=='object' && !!theAOL.docObj.ODWDCM && typeof theAOL.docObj.ODWDCM.SHOW_ALT_MSG !== "undefined" && theAOL.docObj.ODWDCM.SHOW_ALT_MSG != "")
					alert(theAOL.docObj.ODWDCM.SHOW_ALT_MSG);
				
				// 1130425 Raymond 中榮序97 新增檢查若有開雙視窗模式的話, 在開啟公文後立即在DocView子視窗開啟同一筆公文
				if(!_model.isRefDoc() && !!window.wndMirror && window.wndMirror.closed == false) {
					//if(!_model.readOnly() && _model.getSignType() == "E")	// 1130426 Raymond 中榮序97 目前公文非唯讀且為線上簽核才要開
					if(!_model.readOnly() && _model.getSignType() == "E" && !_model.getDocObj().isDraft)	// 1130502 Raymond 中榮序97 目前公文非草稿才要開
						nsEditor.onOpenMirror.call(this, null, _model);
				}
				// 1130425 Raymond 中榮序97 以雙視窗模式開啟DocView模組後, 預設要切成第一筆附件的第一頁顯示
				else if($("#viewDoc").length > 0 && _model.readOnly() == true) {
					let _docObj = _model.getDocObj();
					if(!!_docObj.uiParam && !!_docObj.uiParam && !!_docObj.uiParam.unv_obj && _docObj.uiParam.unv_obj.viewType == "ShowFirstAttPage") {
						var n = _model.getDraftCounts(), idx, found = false;
						for(idx = 0; idx < 1; idx++) {
							var ca = _model.getDraftAttCounts(idx);
							if(ca > 0) {
								theLogger.log("文稿#" + idx + "有附件, 雙視窗模式下預設顯示此文稿的第一筆附件的第一頁頁面");
								if(idx > 0)	// 目前頁面非第一筆文稿
									_updateAttTags(idx);
								//setTimeout(function() {
									that.goToAnyPage(idx, 0, 0);
								//}, 1000);
								found = true;
								break;
							}
						}
						if(!found)
							theLogger.warn("本件公文所有文稿皆無附件, 雙視窗模式下無法顯示第一筆附件的第一頁頁面");
					}
				}
				/* 1140926 Raymond 1140818 V5再變更需求項目7, 取消自動開啟參照窗格行為
				// 1140821 Raymond 1140818 新增在環境變數「AOL_AUTO_OPEN_REFVIEW_FOLDER」設定的資料夾流程點開啟線上簽核公文時, 檢核到「可發文文別」的稿面有簽核區域外物件或文稿最後匯出頁面版本非原承辦人時, 自動開啟參照窗格
				else if(!_model.isRefDoc() && _model.getSignType() == "E" && !_model.readOnly() && theSSO.User.EnvSettings.get("AOL_AUTO_OPEN_REFVIEW_FOLDER").length > 0) {
					let autoOpenRefViewFolder = theSSO.User.EnvSettings.get("AOL_AUTO_OPEN_REFVIEW_FOLDER").split("|"),
						docObj = _model.getDocObj(),
						thisFolder = docObj.get("ODWMSG", "FOLDER") + "-" + docObj.get("ODWMSG", "SUBFOLDER"),
						closeTypeSendDraftTypes = theSSO.User.EnvSettings.get("SSO_CLOSE_TYPE_SEND_DRAFTTYPE").split(";");
					if(autoOpenRefViewFolder.indexOf(thisFolder) >= 0) {
						theLogger.log("目前流程點的資料夾(" + thisFolder + ")符合環境變數「AOL_AUTO_OPEN_REFVIEW_FOLDER」設定(" + theSSO.User.EnvSettings.get("AOL_AUTO_OPEN_REFVIEW_FOLDER") + "), 檢核是否有簽核區域外簽核物件或異動內文");
						let n = _model.getDraftCounts() - (_model.hasFromDoc()?1:0),
							hasTypeBSignObjs = false;
						for(let i=0; i<n; i++) {
							let d = _model.getEDraft(i);
							if(closeTypeSendDraftTypes.indexOf(d.docType) >= 0) {
								let xsf = _model.getSignFolder().xSignFolder();
								if(!!xsf) {
									for(let j=0, m=d.draftPages.signObjs?.length; j<m; j++) {
										let xso = xsf.findSignObjById(d.draftPages.signObjs[j].id);
										if(!!xso) {
											for(let k=0; k<xso.length; k++) {
												if(xso[k].type == "B") {
													theLogger.log("'" + d.name + "'有簽核區域外物件(ID:" + d.draftPages.signObjs[j].id + ")");
													hasTypeBSignObjs = true;
													break;	// break k-loop
												}
											}
										}
									}
								}
							}
						}
						if(hasTypeBSignObjs) {
							theLogger.log("自動開啟參照窗格");
							$("#refView").trigger("click");
						}
						else {	// 無簽核區域外物件則再檢查是否有異動內文
							for(let i=0; i<n; i++) {
								let d = _model.getEDraft(i);
								if(closeTypeSendDraftTypes.indexOf(d.docType) >= 0) {
									let ver = _model.getDraftLastVerAPD(d);
									if(!!ver) {
										let docToDoList = SSOUtil.getDocToDoList(_model.getDocNo(), htmlencode(localStorage.Artifact));
										for(let j=0; j<docToDoList.length; j++) {
											if(docToDoList[j].msgId == ver.cMsgId) {
												if(!(docToDoList[j].ownOUId == docObj.get("ODWMSG", "INCHARGE_OU") && docToDoList[j].ownUserId == docObj.get("ODWMSG", "IC_USER_ID"))) {
													theLogger.log("'" + d.name + "'最後版本匯出頁面者(MsgID:" + ver.cMsgId + ", ownOUId:" + docToDoList[j].ownOUId + ", OwnUserId:" + docToDoList[j].ownUserId + ")非承辦人(INCHARGE_OU:" + docObj.get("ODWMSG", "INCHARGE_OU") + ", IC_USER_ID:" + docObj.get("ODWMSG", "IC_USER_ID") + ")");
													theLogger.log("自動開啟參照窗格");
													$("#refView").trigger("click");
												}
												break;
											}
										}
									}
								}
							}
						}
					}
				}*/
				// 1140910 Raymond 退輔會序203 新增判斷是否由MP的開啟舊檔匯入ZIP檔, 是則啟動匯出附件頁面功能
				if(!_model.isRefDoc() && SSO_CONFIG.enableConvertAttPage == true && _model.paddingProceedRndrAtt == true) {
					theLogger.log("經由MP的開啟舊檔匯入的ZIP檔, 延後至公文開啟後再執行匯出附件頁面功能");
					that.proceedRndrAtt();
				}
				
				// 1140909 Raymond 1140852 新增更新頁次控制項
				$pages.closest(".viewPort").find("#pnControl1 #currPgNo").off("change").on("change", function(evt) {
					let pn = this.value;
					if(_currPo.attIdx < 0) {
						if(_currPo.draftIdx < 0) {
							if(pn == 1 && _currPo.po != 0) {
								_currPo.po = 0;
								_viewPort.find(".pages").flip("right");
							}
							else if(pn != _currPo.po + 1)
								this.value = _currPo.po + 1;
						}
						else {
							let n = _model.getDraftPageCounts(_currPo.draftIdx);
							if(pn >= 1 && pn <= n) {	// 輸入頁數範圍內的頁次
								if(_currPo.po != (pn - 1)) {
									let ff = _currPo.po < (pn - 1);
									_currPo.po = pn - 1;
									_viewPort.find(".pages").flip(ff?"left":"right");
								}
							}
							else {	// 輸入頁數範圍外的頁次
								if(pn < 1)
									this.value = 1;
								else
									this.value = n;
								if(_currPo.po != (this.value - 1)) {
									let ff = _currPo.po < (this.value - 1);
									_currPo.po = this.value - 1;
									_viewPort.find(".pages").flip(ff?"left":"right");
								}
							}
						}
					}
					else {
						let n = _model.getAttPageCounts(_currPo.draftIdx, _currPo.attIdx);
						if(pn >= 1 && pn <= n) {	// 輸入頁數範圍內的頁次
							if(_currPo.po != (pn - 1)) {
								let ff = _currPo.po < (pn - 1);
								_currPo.po = pn - 1;
								_viewPort.find(".pages").flip(ff?"left":"right");
							}
						}
						else {	// 輸入頁數範圍外的頁次
							if(pn < 1)
								this.value = 1;
							else
								this.value = n;
							if(_currPo.po != (this.value - 1)) {
								let ff = _currPo.po < (this.value - 1);
								_currPo.po = this.value - 1;
								_viewPort.find(".pages").flip(ff?"left":"right");
							}
						}
					}
				});
				$pages.closest(".viewPort").find("#pnControl1 #currPgNo").off("keydown").on("keydown", function(evt) {
					console.log("#" + this.id + ".on" + evt.type + ":" + evt.key + "(" + evt.keyCode + ") value=" + this.value + " selectionStart=" + this.selectionStart);
					if(typeof evt.key === "string") {
						if(evt.key.match(/\d/)) {
							let pn, n;
							if(_currPo.attIdx < 0) {
								if(_currPo.draftIdx < 0)
									n = 1;
								else
									n = _model.getDraftPageCounts(_currPo.draftIdx);
							}
							else
								n = _model.getAttPageCounts(_currPo.draftIdx, _currPo.attIdx);
							if(this.selectionStart == 0 && evt.key == "0") {
								console.log("\tdisable start 0 keydown");
								evt.preventDefault();
							}
							else {
								if(this.selectionStart < this.value.length) {
									pn = this.value.substr(0, this.selectionStart);
									pn += evt.key;
									if(this.selectionEnd < this.value.length)
										pn += this.value.substr(this.selectionEnd);
								}
								else
									pn = this.value + evt.key;
								if(pn < 1 || pn > n) {
									console.log("\tdisable oor(1~" + n + ") keydown");
									evt.preventDefault();
								}
							}
						}
						else if(evt.key.length == 1 && evt.key.match(/[a-zA-Z]/)) {
							console.log("\tdisable alpha keydown");
							evt.preventDefault();
						}
						else if(evt.keyCode == 229) {
							console.log("\tdisable IME keydown");
							evt.preventDefault();
						}
					}
				});
				var _prevValue = "";
				$pages.closest(".viewPort").find("#pnControl1 #currPgNo").off("input").on("input", function(evt) {
					console.log("#" + this.id + ".on" + evt.type + ":" + evt.key + "(" + evt.keyCode + ") value=" + this.value + " selectionStart=" + this.selectionStart, evt.originalEvent);
					if(this.value.match(/\W/g)) {
						theLogger.log("\t含中文,剔去中文後重設value -> '" + this.value.replace(/[\W]/g,'') + "'");
						this.value = this.value.replace(/[\W]/g,'');
						if(evt.originalEvent.isComposing) {
							if(!this.value && !!_prevValue) {
								console.debug("\t因為中文輸入組字中, 重設回前次記憶的數字'" + _prevValue + "'");
								this.value = _prevValue;
							}
							else {
								console.debug("\t因為中文輸入組字中, 記憶目前數字'" + this.value + "'");
								_prevValue = this.value;
							}
						}
						else if(evt.originalEvent.inputType == "deleteContentBackward" && !this.value && !!_prevValue) {
							console.debug("\t因為中文輸入deleteContentBackward, 重設回前次記憶的數字'" + _prevValue + "'");
							this.value = _prevValue;
						}
						else if(evt.originalEvent.inputType == "insertText" && !this.value && !!_prevValue) {
							console.debug("\t因為中文輸入insertText, 重設回前次記憶的數字'" + _prevValue + "'");
							this.value = _prevValue;
						}
					}
				});
			}
			
			/*$pg.on("tap", function(event) {
				theLogger.log("$pg.on" + event.type + ":" + event.originalEvent.pageX + "," + event.originalEvent.pageY);
				var m = {
					addTextComment: function() {},
					addSketchComment: function() {},
					beginSketchMode: function(flag) {},
					addUserStamp: function() {},
					addPickupStamp: function() {}
				}
				var cmds = [
							{name:"文字意見", func:m.addTextComment, target:$pg},
							{name:"數位墨水", func:m.addSketchComment, target:$pg},
							{name:"鋼筆簽核意見", func:m.beginSketchMode, target:$pg, data:1},
							{name:"紅筆", func:m.beginSketchMode, target:$pg, data:2},
							{name:"螢光筆", func:m.beginSketchMode, target:$pg, data:3},
							{name:"職名章", func:m.addUserStamp, target:$pg},
							{name:"選用章戳", func:m.addPickupStamp, target:$pg}
							];
				var innerScrollTop = $pg.closest(".contentPane").scrollTop(),
					innerScrollLeft = $pg.closest(".contentPane").scrollLeft(),
					z = $pg.closest(".viewPort").data("zoomController"),
					c = $pg.closest(".viewPort").data("editCursor");
				
				c.cmdFloat.setCmds(cmds);
				
				if(z != undefined)
					c.cmdFloat.setPos({x: (event.originalEvent.pageX + innerScrollLeft) * 100 / z.currScale - 50, y: (event.originalEvent.pageY + innerScrollTop) * 100 / z.currScale + window.scrollY - 160}, true, true);
				else
					c.cmdFloat.setPos({x: event.originalEvent.pageX + innerScrollLeft - 50, y: event.originalEvent.pageY + window.scrollY + innerScrollTop - 160}, true);
			});*/
			// 1100819 Raymond 1100431 通知已翻頁
			if("notifyPageFlipped" in nsEditor) {
				setTimeout(function() {
					nsEditor.notifyPageFlipped(_currPo);
				}, 0);
			}
		},
		// 1140523 Raymond 1140321 新增判斷是否允許觸控翻頁
		allowTouchFlip: function(dir) {
			var noFlipCrossDraftOrAttach = theSSO.User.EnvSettings.get("AOL_NO_FLIP_CROSS_DRAFT_ATTACH") == "Y";
			if(dir == "swiperight") {
				if(_currPo.po == 0 && _currPo.draftIdx == 0 && _currPo.attIdx == -1) {
					console.debug("已捲至最上端, 但已是第一筆文稿的第一頁, 依中榮要求不再觸發往上滾翻至公文基資頁行為");
					return false;
				}
				else if(noFlipCrossDraftOrAttach == true) {
					if(_currPo.po == 0) {
						console.log("已翻至本文稿/附件的第一頁, 滾輪翻頁限制不要再往前翻頁");
						return false;
					}
				}
			}
			else if(dir == "swipeleft") {
				if(noFlipCrossDraftOrAttach == true) {
					if((_currPo.attIdx >= 0 && _currPo.po >= (_memPPA[_currPo.attIdx].pages - 1)) ||
						(_currPo.attIdx < 0 && _currPo.po >= (_memPPD[_currPo.draftIdx]?.pages - 1))) {
						console.log("已翻至本文稿/附件的最末頁, 滾輪翻頁功能限制不要再往後翻頁");
						return false;
					}
				}
			}
		}
	}
	// 1091124 Raymond 信保特殊模式預設顯示公文基資頁
	// 2014.8.20 - Raymond, 若文稿數大於0, 則預設顯示第1筆文稿的本文頁面
	// 2016.8.16 - 只有線上簽核要預設顯示文稿
	// 2016.8.23 - 增加隱藏基資
	// 2016.8.31 - 只要是草稿就預設顯示文稿
	// 1091201	Leslie	修正PDF匯入時，預設顯示公文基資，但若是瀏覽模式(無基資頁)，會出現頁面錯亂的問題
	//if(((_model.getDraftCounts() > 0 && (_model.getDocObj().signType == "E" || _model.getDocObj().isDraft)) || _model.hideODC010()) && _model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2")
	if((_model.getDraftCounts() > 0 && (_model.getDocObj().signType == "E" || _model.getDocObj().isDraft) && _model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2" ) || _model.hideODC010())
		_currPo.draftIdx = 0;
	// 連結flip外掛, 2014.8.25 - Raymond, 移至文稿頁籤處理完再套用, 否則參照檢視會出錯
	//_viewPort.find(".pages").flip({ctx: this.flipCtx});
	
	// 公文基資頁籤
	/*_viewPort.find(".tags ul:first li")
		.on("selected", function(event) {  // 選取事件(於flipCtx.reqPage觸發)則改變頁籤顏色
			theLogger.log("on" + event.type + ", " + $(this).find(".ui-btn-text").text());
			$(this).closest("ul").next().find("li[data-theme='e']").attr("data-theme", "c").removeClass("ui-btn-up-e").removeClass("ui-btn-hover-e").addClass("ui-btn-up-c");
			$(this).attr("data-theme", "e").removeClass("ui-btn-up-c").removeClass("ui-btn-hover-c").addClass("ui-btn-up-e");
			$(this).closest("ul").next().trigger("refresh");
			
			_viewPort.find(".tags ul").eq(2).empty();
		})
		.on("tap", function(event) {  // 點擊頁籤時設定當前頁(_currPo)的稿序(draftIdx)為-1及頁次(po)為0來表示公文基資頁
			if(_currPo.draftIdx >= 0) {
				_currPo.draftIdx = -1;
				_currPo.attIdx = -1;
				_currPo.po = 0;
				_viewPort.find(".pages").flip("right"); // 向右翻頁, 公文基資一律在最左邊, 故向右翻頁
			}
		}).closest("ul").listview("refresh");*/
	// 2016.4.15 selected及點擊事件處理函式切為named function, 供closeView時unbind用, 避免關閉後再開會重複bind, 導致執行數次的問題
	function onSelectedDocMain(event) {
		theLogger.log("on" + event.type + ", " + $(this).find(".ui-link").text());
		
		_viewPort.find(".tags .tags-group .tags-item-active").removeClass("tags-item-active");
		$(this).addClass("tags-item-active");

        // 2023.4.14 - Eric 考試院彙整表序10, 公文基資立貼標籤移到最下面
		// => 找出附件及管理立貼的正確index再取消其選取!
        let _idxAttMgmt = 2;
        if (SSO_CONFIG.OrgNickName=='EXAM' || ('dev_OrgNickName' in localStorage && localStorage.dev_OrgNickName=='EXAM')) {
            _idxAttMgmt = 1;
        }
		_viewPort.find(".tags .tags-group").eq(_idxAttMgmt).filter(function() {	// 2016.4.15 點公文基資時清除附件頁籤但保留"新增附件"頁籤並隱藏
			$(this).children().not(".tags-item-special").remove();
			$(this).children(".tags-item-special").hide();
		});
	}
	function onClickDocMain(event) {
		if(_model.enableEdit()) {	// 2017.1.5 新增翻頁前先重新排版
			var dm = _model.getCurrDraftModel();
			if(!!dm && dm.dirty() && "updateView" in dm) {
				dm.updateView();
			}
		}
		if(_currPo.draftIdx >= 0 && !_flipping) {	// 2015.5.12 翻頁中避免重複
			_currPo.draftIdx = -1;
			_currPo.attIdx = -1;
			_currPo.po = 0;
			_viewPort.find(".pages").flip("right"); // 向右翻頁, 公文基資一律在最左邊, 故向右翻頁
		}
	}

    // 2023.4.14 - Eric 考試院彙整表序10, 公文基資立貼標籤移到最下面
    let _idxDocInfo = 0;
    let _tagDocInfo_selector = '.tags .tags-group:first .tags-item';
    if (SSO_CONFIG.OrgNickName=='EXAM' || ('dev_OrgNickName' in localStorage && localStorage.dev_OrgNickName=='EXAM')) {
        _tagDocInfo_selector = '.tags .tags-group:last .tags-item';
        let cntTagsGroup = _viewPort.find(".tags .tags-group").length;
        _idxDocInfo = cntTagsGroup - 1;
    }
	_viewPort.find(_tagDocInfo_selector)
		.on("selected", onSelectedDocMain)
		.on("click", onClickDocMain);

	if(_model.hideODC010())	// 2016.8.12 新增支援隱藏基資頁籤功能
		_viewPort.find(".tags .tags-group").eq(_idxDocInfo).hide();
	else
		_viewPort.find(".tags .tags-group").eq(_idxDocInfo).show();	// 2016.8.16 修正隱藏後再開另一筆未顯示問題
	
	// 2016.7.7 更新附件頁籤
	// 2016.7.19 新增匯出附件頁面中狀態padding參數, 未提供則依一般邏輯
	// 2016.9.7 改名為_updateAttTags, 另新增this.updateAttTags()函式給外部呼叫, 以更新附件頁籤
	function _updateAttTags(idx, padding) {
        // 2023.4.14 - Eric 考試院彙整表序10, 公文基資立貼標籤移到最下面
		// => 找出附件及管理立貼的正確index再執行後續作業!
        let _idxAttMgmt = 2;
        if (SSO_CONFIG.OrgNickName=='EXAM' || ('dev_OrgNickName' in localStorage && localStorage.dev_OrgNickName=='EXAM')) {
            _idxAttMgmt = 1;
        }

		// 附件頁籤
		var $tag2 = _viewPort.find(".tags .tags-group").eq(_idxAttMgmt);
		$tag2.children().not(".tags-item-special").remove();
		//$tag2.empty();
		var $newAtt = $tag2.find(".tags-item-special");
		var n = _model.getDraftAttCounts(idx);
		//1140804	Leslie[1141011]	修正弱掃[Unchecked Input For Loop Condition]
		n = (n > 50? 50: n);
		
		// 1110301 Raymond 1110106 合併1080815, Fix typo
		//_memPPA.lenght = 0;	// reset array
		_memPPA.length = 0;	// reset array
		for(var j=0; j<n; j++) {
			// 2015.11.20 FIX, 先檢查附件有無匯出頁面, 若有顯示標籤頁數
			_memPPA[j] = {ti: undefined, pages: _model.getAttPageCounts(idx, j)};
			
			//1050921	Leslie	改為判斷該附件是否仍未完成匯出
			//if(padding) {	// 匯出附件頁面中
			if(_model.isAttConvertFinish(idx, j) === false){	//2016.12.19 Leslie	修正函式語意，應反向判斷"附件已完成匯出頁面，加上"!"	//2016.12.21	Leslie	因部分回傳值為null，改為嚴格判斷false
				if($newAtt.length)
					//1070129	Leslie[1061274]	於title加上附件摘要
					//var $attItem = $("<div class='tags-item'><div class='ui-btn-text'>" + _model.getDraftAttName(idx, j) + "</div><span class='ui-icon-clock'></span></div>").insertBefore($newAtt);
					var $attItem = $("<div class='tags-item' title='"+_model.getDraftAttDesc(idx,j)+"'><div class='ui-btn-text'>" + _model.getDraftAttName(idx, j) + "</div><span class='ui-icon-clock'></span></div>").insertBefore($newAtt);
				else
					//1070129	Leslie[1061274]	於title加上附件摘要
					//var $attItem = $("<div class='tags-item'><div class='ui-btn-text'>" + _model.getDraftAttName(idx, j) + "</div><span class='ui-icon-clock'></span></div>").appendTo($tag2);
					var $attItem = $("<div class='tags-item' title='"+_model.getDraftAttDesc(idx,j)+"'><div class='ui-btn-text'>" + _model.getDraftAttName(idx, j) + "</div><span class='ui-icon-clock'></span></div>").appendTo($tag2);
				
				$attItem.on("selected", j, function(event) {// 選取事件(於flipCtx.reqPage觸發)則改變頁籤顏色
						var idx2 = event.data;
						theLogger.log("on" + event.type + ": draft[" + idx + "].att[" + idx2 + "]-'" + $(this).find(".ui-btn-text").text() + "'...");
						
						_viewPort.find(".tags .tags-group .tags-item-active").removeClass("tags-item-active");
						$(this).addClass("tags-item-active");
					})
					.on("click", j, function(event) {
						var idx2 = event.data;
						if(_model.enableEdit()) {	// 2017.1.5 新增翻頁前先重新排版
							var dm = _model.getCurrDraftModel();
							if(!!dm && dm.dirty() && "updateView" in dm) {
								dm.updateView();
							}
						}
						//1050921	Leslie	改為只顯示"轉出中"訊息
						/*
						theLogger.log("點附件: on" + event.type + ": draft[" + idx + "].att[" + idx2 + "]...");
						if(!_flipping) {	// 2015.5.12 翻頁中避免重複
							if(_currPo.attIdx > idx2) {     // 當前頁的稿序大於點擊稿序表示要向"前"
								_currPo.attIdx = idx2;
								_currPo.po = 0;
								_viewPort.find(".pages").flip("right");
							}
							else if(_currPo.attIdx < idx2) {// 當前頁的稿序小於點擊稿序表示要向"後"
								_currPo.attIdx = idx2;
								_currPo.po = 0;
								_viewPort.find(".pages").flip("left");
							}
						}*/
						var sMsg = _model.getConvertMsg(idx, idx2);
						if(sMsg != ""){
							// 詢問使用者是否執行重轉，或是，回到附件維護子視窗刪掉它
							var param = {title: "附件匯出異常",
								//1071218	Leslie	改錯字
								//message: sMsg.replace(/\n/g,'<br><br>')+"<br><br>是否重新嚐試匯出頁面？",		//1050930	Leslie	配合增加處理顯示異常的主機資訊
								message: sMsg.replace(/\n/g,'<br><br>')+"<br><br>是否重新嘗試匯出頁面？",
								buttons: [
									{	name: "是",
										action: function() {
											theLogger.log("使用者選擇重新執行匯出!");
											that.proceedRndrAtt();
										}
									},
									{	name: "否，附件維護",
										action: function() {
											theLogger.log("選擇進入附件維護子視窗!");
											_model.accquireDraftModel(idx)
											.done(function(dm) {
												nsEditor.onAttachMgmt.call(dm, event, function() {
													if(SSO_CONFIG.enableConvertAttPage) {
														that.proceedRndrAtt();	// proceedRndrAtt()會在附件匯出頁面後更新頁籤
													}
													else {
														that.updateAttTags();	// 不匯出附件頁面則更新附件頁籤
													}
												});
											})
											.fail(function(errorText) {
												alert(errorText);
											});
										}
									},
									{	name: "取消",
										action: function() {
											theLogger.log("不做任何處理!");
											
										}
									}
								]
							};
							$.confirm(param);
						}
						// TODO: 顯示匯出進度頁面
					});
				_memPPA[j].ti = $attItem;
				// 更新頁數
				if(_memPPA[j].pages > 0) {
					theLogger.debug("附件" + j + "已有頁數");
					$attItem.find(".ui-icon-clock").addClass("ui-li-count").removeClass("ui-icon-clock").text(_memPPA[j].pages);
				}
			}
			else if(_memPPA[j].pages > 0) {
				if($newAtt.length)
					//1070129	Leslie[1061274]	於title加上附件摘要
					//var $attItem = $("<div class='tags-item'><div class='ui-btn-text'>" + _model.getDraftAttName(idx, j) + "</div><span class='ui-li-count'></span></div>").insertBefore($newAtt);
					var $attItem = $("<div class='tags-item' title='"+_model.getDraftAttDesc(idx,j)+"'><div class='ui-btn-text'>" + _model.getDraftAttName(idx, j) + "</div><span class='ui-li-count'></span></div>").insertBefore($newAtt);
				else
					//1070129	Leslie[1061274]	於title加上附件摘要
					//var $attItem = $("<div class='tags-item'><div class='ui-btn-text'>" + _model.getDraftAttName(idx, j) + "</div><span class='ui-li-count'></span></div>").appendTo($tag2);
					var $attItem = $("<div class='tags-item' title='"+_model.getDraftAttDesc(idx,j)+"'><div class='ui-btn-text'>" + _model.getDraftAttName(idx, j) + "</div><span class='ui-li-count'></span></div>").appendTo($tag2);
				
				$attItem.on("selected", j, function(event) {// 選取事件(於flipCtx.reqPage觸發)則改變頁籤顏色
						var idx2 = event.data;
						theLogger.log("on" + event.type + ": draft[" + idx + "].att[" + idx2 + "]-'" + $(this).find(".ui-btn-text").text() + "'...");
						
						_viewPort.find(".tags .tags-group .tags-item-active").removeClass("tags-item-active");
						$(this).addClass("tags-item-active");
					})
					.on("click", j, function(event) {
						var idx2 = event.data;
						theLogger.log("點附件: on" + event.type + ": draft[" + idx + "].att[" + idx2 + "]...");
						if(_model.enableEdit()) {	// 2017.1.5 新增翻頁前先重新排版
							var dm = _model.getCurrDraftModel();
							if(!!dm && dm.dirty() && "updateView" in dm) {
								dm.updateView();
							}
							window.tokenSelector.clearByChangeGuid();	//2017.3.23	Leslie	翻頁至附件頁面，應主動清空為求效能而建立的Cache tokenSelector
						}
						if(!_flipping) {	// 2015.5.12 翻頁中避免重複
							if(_currPo.attIdx > idx2) {     // 當前頁的稿序大於點擊稿序表示要向"前"
								_currPo.attIdx = idx2;
								_currPo.po = 0;
								_viewPort.find(".pages").flip("right");
							}
							else if(_currPo.attIdx < idx2) {// 當前頁的稿序小於點擊稿序表示要向"後"
								_currPo.attIdx = idx2;
								_currPo.po = 0;
								_viewPort.find(".pages").flip("left");
							}
						}
						// 1130507 Raymond 中榮序95 新增判斷OwnRoleID符合環境變數「AOL_HIDE_DRAFT_CMDS_ROLES」設定的長官角色時, 不要顯示點擊附件頁籤時的指令列
						if(hideDraftCmds == false) {
						// 2016.4.18 新增附件跳至指定頁功能
						var c = _viewPort.data("editCursor");
						var cmds = new Array();
						//cmds.special = true;
						// 1060621 Raymond 1060283 改用掛載於nsEditor命名空間的指令列項目組成指令列按鈕
						//cmds.push({name:"檢閱指定頁面", func: function(event) {
						//	if(nsEditor && "onGoToAttPage" in nsEditor) {	// 2017.3.31 實作附件跳至指定頁功能
						//		try {
						//			nsEditor["onGoToAttPage"].call(this, that, _model, _currPo.draftIdx, _currPo.attIdx);
						//		}
						//		catch(e) {
						//			theLogger.error(e.message);
						//		}
						//	}
						//	else
						//		theLogger.error("未掛載'onGoToAttPage'在nsEditor命名空間下, 無法執行指令列功能");
						//}});
						for(var i=0; i<cmdItemsC.length; i++) {
							if(typeof cmdItemsC[i].vis === "string" && cmdItemsC[i].vis.length > 0) {
								if(nsEditor && cmdItemsC[i].vis in nsEditor) {
									var vis = false;
									try {
										vis = nsEditor[cmdItemsC[i].vis].call(this, that, _model, _currPo.draftIdx, _currPo.attIdx);
									}
									catch(e) {
										theLogger.error(e.message);
									}
									if(vis) {
										cmds.push({name:cmdItemsC[i].name, func:function(data) {
											if(data && "fn" in data && typeof data.fn === "string" && data.fn.length > 0) {
												if(nsEditor && data.fn in nsEditor) {
													try {
														nsEditor[data.fn].call(this, that, _model, _currPo.draftIdx, _currPo.attIdx);
													}
													catch(e) {
														theLogger.error(e.message);
													}
												}
											}
										}, cbdata:cmdItemsC[i]});
									}
									else {
										theLogger.log("指令列按鈕(id:" + cmdItemsC[i].id + ")的vis callback function回傳false, 不顯示該按鈕");
									}
								}
								else {	// 未掛載onXXXVisible callback function在nsEditor
									theLogger.error("未掛載'" + cmdItemsC[i].vis + "'在nsEditor命名空間下, 無法建立指令列按鈕");
								}
							}
							else {	// 未定義vis callback function name?
								theLogger.error("未定義指令列按鈕(id:" + cmdItemsC[i].id + ")的vis callback function name");
							}
						}
						if(cmds.length > 0) {
							c.cmdFloat.setCmds(cmds);
							c.cmdFloat.setElem(this);
						}
						//c.cmdFloat.setCmds(cmds);
						//c.cmdFloat.setElem(this);
						}	// end of 1130507 Raymond 中榮序95 新增判斷OwnRoleID符合環境變數「AOL_HIDE_DRAFT_CMDS」設定的長官角色時, 不要顯示點擊附件頁籤時的指令列
						return false;	// 2017.3.31 不要bubble
					})
					/* 刪除附件頁面
					.on("swipeleft", j, function(event) {
						var idx2 = event.data;
						theLogger.log("on" + event.type + ": draft[" + idx + "].att[" + idx2 + "]...");
						if($(this).find(".tags-item-delete-btn").length == 0) {
							_viewPort.find(".tags .tags-group .tags-item-delete-btn").remove();
							$("<div class='tags-item-delete-btn'><span class='ui-icon ui-icon-delete'>&nbsp;</div>").appendTo(this);
						}
					})*/;
				_memPPA[j].ti = $attItem;
				// 更新頁數
				$attItem.find(".ui-li-count").text(_memPPA[j].pages);	// 更新頁數
			}
			else {	// 2015.12.10 附件超鏈結
				// 1110324 Raymond 1101578 取得附件是否曾異動, 若是要變更附件頁面的樣式
				var attModified = _model.getDraftAttModified(idx, j);
				// 1110411 Raymond 1101578 判斷環境變數改為全域變數
				//if(theSSO.User.EnvSettings.get("AOL_ENABLE_ATTACH_DIRECT_EDIT") == "Y" && attModified == true) {
				if(window.enableAttachDirectEdit == true && attModified == true) {
					if($newAtt.length)
						var $attItem = $("<div class='tags-item' title='"+_model.getDraftAttDesc(idx,j)+"'><a rel='external' target='new'><div class='ui-btn-text ui-btn-text-modified'>" + _model.getDraftAttName(idx, j) + "</div><span class='ui-icon ui-icon-search'>&nbsp;</span></a></div>").insertBefore($newAtt);
					else
						var $attItem = $("<div class='tags-item' title='"+_model.getDraftAttDesc(idx,j)+"'><a rel='external' target='new'><div class='ui-btn-text ui-btn-text-modified'>" + _model.getDraftAttName(idx, j) + "</div><span class='ui-icon ui-icon-search'>&nbsp;</span></a></div>").appendTo($tag2);
				}
				else
				if($newAtt.length)
					//1070129	Leslie[1061274]	於title加上附件摘要
					//var $attItem = $("<div class='tags-item'><a rel='external' target='new'><div class='ui-btn-text'>" + _model.getDraftAttName(idx, j) + "</div><span class='ui-icon ui-icon-search'>&nbsp;</span></a></div>").insertBefore($newAtt);
					var $attItem = $("<div class='tags-item' title='"+_model.getDraftAttDesc(idx,j)+"'><a rel='external' target='new'><div class='ui-btn-text'>" + _model.getDraftAttName(idx, j) + "</div><span class='ui-icon ui-icon-search'>&nbsp;</span></a></div>").insertBefore($newAtt);
				else
					//1070129	Leslie[1061274]	於title加上附件摘要
					//var $attItem = $("<div class='tags-item'><a rel='external' target='new'><div class='ui-btn-text'>" + _model.getDraftAttName(idx, j) + "</div><span class='ui-icon ui-icon-search'>&nbsp;</span></a></div>").appendTo($tag2);
					var $attItem = $("<div class='tags-item' title='"+_model.getDraftAttDesc(idx,j)+"'><a rel='external' target='new'><div class='ui-btn-text'>" + _model.getDraftAttName(idx, j) + "</div><span class='ui-icon ui-icon-search'>&nbsp;</span></a></div>").appendTo($tag2);
				
				$attItem.on("selected", j, function(event) {
						var idx2 = event.data;
						theLogger.log("on" + event.type + ": draft[" + idx + "].att[" + idx2 + "]-'" + $(this).find(".ui-btn-text").text() + "'...");
					})
					.find("a").on("click", j, function(event) {
						var idx2 = event.data;
						theLogger.log("點附件: on" + event.type + ": draft[" + idx + "].att[" + idx2 + "]...");
						if(_model.enableEdit()) {	// 2017.1.5 新增翻頁前先重新排版
							var dm = _model.getCurrDraftModel();
							if(!!dm && dm.dirty() && "updateView" in dm) {
								dm.updateView();
							}
						}
						try {
							var attFileName = _model.getDraftAttOrigFileName(idx, idx2);	// 2016.7.12 改取原始檔名, 因調整順序會影響FileName
							if(attFileName.match(/^blob:/)) {	// 新增的附件
								// 1110315 Raymond 1101578 新增判斷屬於應以附件編輯模組的檔案類型時, 改用附件編輯模組開啟
								if(shouldOpenByAttEdit(idx, idx2) && !theAOL.disableUseAttEdit && !SSOUtil.isValueTrue(localStorage['dev_nodejs'])) {	// 1110318 Raymond 1101578 新增未安裝/啟動模組時停用附件直接編輯功能
									var thisElem = this;				// 1110318 Raymond 1101578 新增fallback用this
									if(attFileName.match(/^blob:/)) {	// 1110330 Raymond 1101578 新增/置換的附件, 要先讀取
										console.log("讀取" + idx + "-" + idx2 + "附件[" + attFileName + "]...");
										var xhr = new XMLHttpRequest();
										xhr.open('GET', attFileName, true);
										xhr.responseType = 'blob';
										xhr.onload = function(e) {
											if (this.status == 200) {
												console.log("讀取結果:", this.response);
												openAttByEditMgr(idx, idx2, this.response, function(blob, param, err) {
													console.log("onAttEditUpdate", blob, param, err);
													if(!!blob) {
														console.log("attIdx = " + idx2);
														this.replaceAttachFile(idx2, blob, param);
														// 1110329 Raymond 1101578 新增異動後設定頁籤為已異動樣式
														if(this.getAttachModified(idx2)) {
															$(thisElem).find(".ui-btn-text").addClass("ui-btn-text-modified");
															// 1110331 Raymond 1101578 異動附件後直接儲存
															$("#btnSave").trigger("click");
														}
													}
													else {
														console.error(err);
													}
												},
												function() {	// 1110318 Raymond 1101578 新增fallback function
													thisElem.click();	// 再觸發onclick一次
												});
											}
										};
										xhr.send();
									}
									return false;
								}
								else {
								// 2016.11.7 for IE-compatible
								if("msSaveOrOpenBlob" in navigator) {		//2017.3.16	Leslie	IE改為多"開啟"選項，"msSaveBlob"→"msSaveOrOpenBlob"
									var xhr = new XMLHttpRequest();
									xhr.open('GET', attFileName, true);
									xhr.responseType = 'blob';
									xhr.onload = function(e) {
										if (this.status == 200) {
											//var myBlob = this.response;
											navigator.msSaveOrOpenBlob(this.response, _model.getDraftAttFileName(idx, idx2));		//2017.3.16	Leslie	IE改為多"開啟"選項，"msSaveBlob"→"msSaveOrOpenBlob"
										}
									};
									xhr.send();
								}
								else{
									// 1071024	Leslie		Leslie		1070999		於附件不匯出的模式下，針對不可於瀏覽器直接開啟的附件[JPG、PNG、GIF、PDF]，設定Download屬性以觸發下載至正確檔名
									let fileName =  _model.getDraftAttFileName(idx, idx2);	//取得檔名，因為此時OrigFileName可能為BlobURL
									let viewType = 'PDF|JPG|PNG|GIF';
									let sType = fileName.substring(fileName.lastIndexOf('.')+1).toUpperCase();
									if(viewType.indexOf(sType) == -1)
										this.download = fileName;
								//if(_model.getSignType() == "P") {	// 紙本簽核
									//this.download = _model.getDraftAttFileName(idx, idx2);	// 預設下載檔名用重編後的附件檔名		//2017.3.16	Leslie	統一直接開啟附件的行為，不再設定檔名
									this.target = "_blank";	//2017.3.16	Leslie	統一直接開啟附件的行為，改為設定target = "_blank"
									this.href = attFileName;
									// 1130809 Raymond 1130313 合併1111007(1100394), 新增對應Chrome的下載檔名功能的download屬性
									this.download = _model.getDraftAttFileName(idx, idx2);
								}
								return true;
								}
								//}
								//else {	// 線上簽核
								//	
								//}
							}
							// 2015.1.15 來文簽辦的附件可能不在文稿子目錄下, 所以改用上一層子目錄直接組封裝檔內的檔名
							/*var split = attFileName.indexOf('\\');
							if(split >= 0)
								attFileName = attFileName.substring(split+1);
							var origFilePath = _model.draftDirPath + "\\" + attFileName;*/
							// 1110331 Raymond 1101578 attFileName是從封裝檔取得的, 可能不是-99目錄的路徑, 要改成-99目錄的路徑, 以免總是下載到未修改的版本
							var attFileName99 = attFileName.replace(/\-\d{2}\\/, "-99\\");
							var origFilePath;
							// 1110414 Raymond 1101578 修正參照公文開啟歷史檢視窗格的附件時, 不論選哪個流程點, 都會下載文號-00-99目錄下的最新版附件的問題
							var revisionMsgId = undefined;
							if(_model.isRefDoc()) {
								var rev = _model.getSignFolder().getCurrRevision();
								revisionMsgId = rev.substr(rev.lastIndexOf("_") + 1);
								console.log("參照公文目前流程點的MsgId:" + revisionMsgId);
								if(_model.subDirPath.length && _model.subDirPath[_model.subDirPath.length-1] == '\\')
									origFilePath = _model.subDirPath + attFileName;
								else
									origFilePath = _model.subDirPath + "\\" + attFileName;
							}
							else
							if(_model.subDirPath.length && _model.subDirPath[_model.subDirPath.length-1] == '\\')
								origFilePath = _model.subDirPath + attFileName99;
							else
								origFilePath = _model.subDirPath + "\\" + attFileName99;
							var docAttUrl = "/odtools/docatt.ashx?DocNo=" + _model.getDocNo();
							if(_model.getDocObj().isDraft)	// 2016.9.7 新增支援草稿的附件電子檔下載, 固定文號字串
								docAttUrl = "/odtools/docatt.ashx?DocNo=DRAFTDOC";
							// 2016.1.22 來文附件可能有中文檔名, Base64.js已修改成會先編碼成UTF-8再編碼成Base64, 因可能出現+、=等Base64字元, 再以URI encoding處理成%HEX的形式, 以避免Server無法解讀
							//docAttUrl += ("&FileName=" + origFilePath);
							var b64str = Base64.encode(origFilePath);
							var uriEnc = encodeURIComponent(b64str);
							docAttUrl += ("&FileName=" + uriEnc);
							
							docAttUrl += ("&SAMLart=" + localStorage['Artifact']);
							theLogger.warn("開啟附件電子檔 - '" + docAttUrl + "'");
							// 1110315 Raymond 1101578 新增判斷屬於應以附件編輯模組的檔案類型時, 改用附件編輯模組開啟
							if(shouldOpenByAttEdit(idx, idx2) && !theAOL.disableUseAttEdit && !SSOUtil.isValueTrue(localStorage['dev_nodejs'])) {	// 1110318 Raymond 1101578 新增未安裝/啟動模組時停用附件直接編輯功能
								var thisElem = this;				// 1110318 Raymond 1101578 新增fallback用this
								openAttByEditMgr(idx, idx2, docAttUrl, function(blob, param, err) {
									console.log("onAttEditUpdate", blob, param, err);
									if(!!blob) {
										console.log("attIdx = " + idx2);
										this.replaceAttachFile(idx2, blob, param);
										// 1110329 Raymond 1101578 新增異動後設定頁籤為已異動樣式
										if(this.getAttachModified(idx2)) {
											$(thisElem).find(".ui-btn-text").addClass("ui-btn-text-modified");
											// 1110331 Raymond 1101578 異動附件後直接儲存
											$("#btnSave").trigger("click");
										}
									}
									else {
										console.error(err);
									}
								},
								function() {	// 1110318 Raymond 1101578 新增fallback function
									thisElem.click();	// 再觸發onclick一次
								},
								revisionMsgId);// 1110414 Raymond 1101578 新增傳入參照公文目前流程點的MsgId, 非參照公文時為undefined, 會自動使用公文目前的MsgId
							}
							else {
							this.href = docAttUrl;
							this.target = "_blank";	//2017.3.1	Leslie	附件開啟一律以新頁籤開啟
							}
							return true;
						}
						catch(e) {
							theLogger.error("Exception! " + e.message + " - " + e.sourceURL + ":" + e.line);
							alert(e.message);
						}
						return false;
					});
				_memPPA[j].ti = $attItem;
			}
		}
		//$tag2.listview("refresh");
	}
	// 2016.9.7 新增updateAttTags()函式給外部呼叫, 以目前選取的文稿更新附件頁籤
	this.updateAttTags = function() {
		if(_currPo.draftIdx >= 0) {	// 目前頁面非基資
			_updateAttTags(_currPo.draftIdx);
			_viewPort.find(".pages").flip("refresh");	// 2016.12.11 異動附件並儲存後重新整理頁面
		}
		else
			theLogger.warn("目前頁面為公文基資, 不應執行更新附件頁籤功能");
	}
	
	// 2016.6.17 選取文稿頁籤的event handler搬至外面並命名, 為同時提供給新文稿使用
	function onDraftTagSelected(event) {  // 選取事件(於flipCtx.reqPage觸發)則改變頁籤顏色
		var idx = event.data;
		theLogger.log("on" + event.type + ": draft[" + idx + "]-'" + $(this).find(".ui-link").text() + "'...");
		
		// 1120818 Raymond 1120503 新增檢查目前顯示文稿為可編輯狀態且文別為簽時, 顯示製表工具列, 依環境變數"WE_ENABLE_CUSTOM_TABLE"設定啟用
		if(theSSO.User.EnvSettings.get("WE_ENABLE_CUSTOM_TABLE") == "Y") {
			// 1141020 Raymond 1141013 新增檢核是否允許便簽也提供自訂表格功能
			//if(_model.enableEdit() && _model.getDraftDocType(idx) == "簽") {
			var allowDocTypes = (theSSO.User.EnvSettings.get("WE_ENABLE_CUSTOM_TABLE_FOR_便簽") == "Y")?["簽","便簽"]:["簽"];
			if(_model.enableEdit() && allowDocTypes.indexOf(_model.getDraftDocType(idx)) >= 0) {
				_model.accquireDraftModel(idx).done(function(dm) {
					if(!!dm && dm.getEditable())
						$("#tabularPanel").show();
					else
						$("#tabularPanel").hide();
				});
			}
			else
				$("#tabularPanel").hide();
		}
		
		_viewPort.find(".tags .tags-group .tags-item-active").removeClass("tags-item-active");
		$(this).addClass("tags-item-active");
		
		// 更新附件頁籤
		_updateAttTags(HtmlEncode(idx));	// 1101026 Raymond 1100991 修正弱掃Client DOM XSS
		
		// 2016.4.15 加上"新增附件"頁籤項目
		if($newAtt.length) {
			if (_currPo.draftIdx < 0 ||					// 公文基資
				_model.readOnly() ||					// 唯讀, 2016.7.4 唯讀模式亦可編輯內文包括新增附件, 2016.8.16 唯讀不可新增附件, 可編不可存的模式須設disable_save=true及read_only=false
				_model.isFromDoc(_currPo.draftIdx) ||	// 來文
				_model.isExorgDraft(_currPo.draftIdx) ||// 1100512 Raymond 1090821 外會公文文稿
				!_model.enableEdit() ||					// 2016.8.30 buttonF沒有R表示不可編輯
				_model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2" ||	// 1090916 Raymond 1090564 新增信保特殊模式公文不提供附件管理功能
				_model.getDraftEditable(_currPo.draftIdx) != true) {	// 1110331 Raymond 1110348 修正啟用會辦單位可新增文稿的機關, 會辦單位使用者可開啟主辦單位的文稿的附件管理子視窗並上傳附件, 導致主辦單位的文稿清稿而使章戳不見的問題
				$newAtt.hide();
			}
			else {
				$newAtt.show();
			}
		}
		
		// 1111024 Raymond 1110864 合併1101468, 新增判斷不是參照公文才重新整理簽核意見窗格
		// 1100706 Raymond 1100648 啟用分文稿記錄簽核意見功能時, 切換文稿顯示要重新整理簽核意見窗格
		//if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_PANEL") == "Y" && theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y")
		if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_PANEL") == "Y" && theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y" && !_model.isRefDoc())
			theAOL.setupComments($("#leftPart #sidePanel #signCmtList"));
		
		// 1140224 Raymond 1131303 新增切換文稿顯示時重新整理錯別字校正窗格
		if(!_model.isRefDoc())
			theAOL.setupFixWords($("#leftPart #sidePanel #fixWordList"));
	}
	// 2016.6.17 點擊文稿頁籤的event handler搬至外面並命名, 為同時提供給新文稿使用
	var that = this;
	function onClickDraftTag(event) {  // 綁定點擊事件時多傳入一個稿序i, 觸發時event.data即為該頁籤所代表的稿序draftIdx
		var idx = event.data;
		theLogger.log("on" + event.type + ": draft[" + idx + "]...");
		// 1131213 Raymond 1131064 新增環境變數「WE_ALLOW_VIEW_READONLY_PAPER_DOC_FOLDER」, 當目前資料夾符合設定值時, 允許禁止編輯內文的紙本公文, 可以檢視文稿
		// 1110328 Leslie[1100287]	Merge[1070359]	將preprocessXML函式expose到nsEditor, 供調閱DI檔時叫用
		//if(_model.getDocObj().signType == "P" && !_model.enableEdit()) {	// 2016.12.30 卡紙本不允許編輯內文的流程點不可以看文稿
		//if(_model.getDocObj().signType == "P" && !_model.enableEdit() && !("aol_disable_odc010" in _model.getDocObj().uiParam)) {
		var allowViewReadOnlyPaperDocFolder = theSSO.User.EnvSettings.get("WE_ALLOW_VIEW_READONLY_PAPER_DOC_FOLDER").split(";");
		var thisFolder = _model.getDocObj().folder + "-" + _model.getDocObj().subfolder;
		var allowViewReadOnlyPaperDoc = allowViewReadOnlyPaperDocFolder.indexOf(thisFolder) >= 0;
		if(_model.getDocObj().signType == "P" && !_model.enableEdit() && !("aol_disable_odc010" in _model.getDocObj().uiParam) && !allowViewReadOnlyPaperDoc) {
			theLogger.warn("此流程點不允許編輯紙本公文內文, 禁止翻頁");
			alert("本流程點不允許編輯紙本公文內文");
			return false;
		}
		// 1140213 Raymond 1131244 新增判斷資料夾符合環境變數「AOL_TCMODE_FOLDERS」時, 若目前為追蹤修訂模式則在點擊文稿頁籤時不需要自動切回完稿模式
		if(!_model.isRefDoc()) {	// 參照窗格的公文不要切換
		var aolTCModeFolders = theSSO.User.EnvSettings.get("AOL_TCMODE_FOLDERS");
		if(!!aolTCModeFolders)
			aolTCModeFolders = aolTCModeFolders.split(";");
		if(!!aolTCModeFolders && aolTCModeFolders.indexOf(thisFolder) >= 0) {
		}
		else
		// 1060518 Raymond 1060269 檢核目前追蹤修訂模式是否為完稿模式, 若不是的話, 提示訊息後, 切回完稿模式
		if(TCControl.currMode != 1) {
			// 1140926 Raymond 1140818 V5再變更需求項目7, 判斷SSO_CONFIG.OrgNickName=TPVGH時, 取消提示非完稿模式的警告訊息
			if(SSO_CONFIG.OrgNickName != "TPVGH")
			alert("目前追蹤修訂模式非完稿模式，為避免簽核物件在非完稿模式下可能發生位置異常問題，系統將切回完稿模式顯示。");
			$("#aol #tcControl1 select").val(1).trigger("change");
		}
		}	// end of if(!_model.isRefDoc()) 參照窗格的公文不要切換
		if(_model.enableEdit()) {	// 2017.1.5 新增翻頁前先重新排版
			var dm = _model.getCurrDraftModel();
			if(!!dm && dm.dirty() && "updateView" in dm) {
				dm.updateView();
			}
			else	//2017.3.23	Leslie	當翻頁至來文或基資頁時，回到稿件頁面則無dm，藉此判斷應確實更新View的內容
				window.tokenSelector.clearByChangeGuid();	//2017.3.23	Leslie	應主動清空為求效能而建立的Cache tokenSelector
		}
		if(!_flipping) {	// 2015.5.12 翻頁中避免重複
			if(_currPo.draftIdx > idx ||    // 當前頁的稿序大於點擊稿序表示要向"前"
			   _currPo.attIdx >= 0) {       // 當前頁是附件
				_currPo.draftIdx = idx;
				_currPo.attIdx = -1;
				_currPo.po = 0;
				_viewPort.find(".pages").flip("right");
			}
			else if(_currPo.draftIdx < idx) {// 當前頁的稿序小於點擊稿序表示要向"後"
				if(!_model.readOnly()) {
					if(_currPo.draftIdx < 0 && typeof fnODC010Save !== "undefined") {	// 2014.10.21 - Raymond, 若當前頁是公文基資, 則呼叫fnODC010Save儲存功能
						var res = fnODC010Save();						// 2016.7.19 新增判斷fnODC010Save的回傳值, 若是false表示有欄位未填之類的錯誤, 不允許翻頁
						if(typeof res === "boolean" && res == false) {
							theLogger.warn("fnODC010Save()回傳false, 可能有欄位必填而未填, 禁止翻頁!");
							return false;
						}
					}
				}
				else
					theLogger.log("唯讀模式不呼叫fnODC010Save");
				_currPo.draftIdx = idx;
				_currPo.attIdx = -1;
				_currPo.po = 0;
				_viewPort.find(".pages").flip("left");
			}
		}
		// 1130430 Raymond 中榮序95 新增判斷OwnRoleID符合環境變數「AOL_HIDE_DRAFT_CMDS_ROLES」設定的長官角色時, 不要顯示點擊文稿頁籤時的指令列
		if(hideDraftCmds == false) {
		// 2016.4.14 判斷是不是來文
		var c = _viewPort.data("editCursor");
		if(_model.isFromDoc(_currPo.draftIdx)) {	// 是來文簽辦或電子來文
			var cmds = new Array();
			//cmds.special = true;
			// 2016.5.5 改用掛載於nsEditor命名空間的指令列項目組成指令列按鈕
			for(var i=0; i<cmdItemsA.length; i++) {
				if(typeof cmdItemsA[i].vis === "string" && cmdItemsA[i].vis.length > 0) {
					if(nsEditor && cmdItemsA[i].vis in nsEditor) {
						var vis = false;
						try {
							// 1100907 Raymond 1090863 新增參數
							//vis = nsEditor[cmdItemsA[i].vis].call(that);
							// 1111207	Leslie	1110832	新增參數
							// vis = nsEditor[cmdItemsA[i].vis].call(this, that, _model);
							vis = nsEditor[cmdItemsA[i].vis].call(this, that, _model, _currPo.draftIdx);
						}
						catch(e) {
							theLogger.error(e.message);
						}
						if(vis) {
							cmds.push({name:cmdItemsA[i].name, func:function(data) {
								if(data && "fn" in data && typeof data.fn === "string" && data.fn.length > 0) {
									if(nsEditor && data.fn in nsEditor) {
										// 1100907 Raymond 1090863 不用evt了
										//var evt = $.Event("click", {target: this});
										//evt.data = _viewPort;
										//c.cmdFloat.hide();	// 關閉指令列
										try {
											// 1100907 Raymond 1090863 新增參數
											//nsEditor[data.fn].call(that, evt);
											// 1111207	Leslie	1110832	新增參數
											// nsEditor[data.fn].call(this, that, _model);
											nsEditor[data.fn].call(this, that, _model, _currPo.draftIdx);
										}
										catch(e) {
											theLogger.error(e.message);
										}
									}
								}
							}, cbdata:cmdItemsA[i]});
						}
						else {
							theLogger.log("指令列按鈕(id:" + cmdItemsA[i].id + ")的vis callback function回傳false, 不顯示該按鈕");
						}
					}
					else {	// 未掛載onXXXVisible callback function在nsEditor
						theLogger.error("未掛載'" + cmdItemsA[i].vis + "'在nsEditor命名空間下, 無法建立指令列按鈕");
					}
				}
				else {	// 未定義vis callback function name?
					theLogger.error("未定義指令列按鈕(id:" + cmdItemsA[i].id + ")的vis callback function name");
				}
			}
			if(cmds.length > 0) {
				c.cmdFloat.setCmds(cmds);
				c.cmdFloat.setElem(this);
			}
		}
		// 1100512 Raymond 1090821 判斷是否為外會公文的外機關文稿
		else if(_model.isExorgDraft(_currPo.draftIdx)) {
		}
		else {	// 是文稿
			// 2016.4.1 文稿頁籤新增指令列
			var cmds = new Array();
			//cmds.special = true;
			// 2016.5.5 改用掛載於nsEditor命名空間的指令列項目組成指令列按鈕
			for(var i=0; i<cmdItemsB.length; i++) {
				if(typeof cmdItemsB[i].vis === "string" && cmdItemsB[i].vis.length > 0) {
					if(nsEditor && cmdItemsB[i].vis in nsEditor) {
						var vis = false;
						try {
							vis = nsEditor[cmdItemsB[i].vis].call(this, that, _model, idx);	// 2016.10.4 新增參數, 2016.10.5 FIX
						}
						catch(e) {
							theLogger.error(e.message);
						}
						if(vis) {
							cmds.push({name:cmdItemsB[i].name, func:function(data) {
								if(data && "fn" in data && typeof data.fn === "string" && data.fn.length > 0) {
									if(nsEditor && data.fn in nsEditor) {
										//var evt = $.Event("click", {target: this});
										//evt.data = {
										//	viewPort: $(that).closest(".viewPort"),
										//	draftIdx: idx
										//};
										//c.cmdFloat.hide();	// 關閉指令列
										try {
											nsEditor[data.fn].call(this, that, _model, idx);	// 2016.10.4 新增參數, 2016.10.5 FIX
										}
										catch(e) {
											theLogger.error(e.message);
										}
									}
								}
							}, cbdata:cmdItemsB[i], asLink: true});	// 要利用按鈕的A來下載檔案, 須設asLink
						}
						else {
							theLogger.log("指令列按鈕(id:" + cmdItemsB[i].id + ")的vis callback function回傳false, 不顯示該按鈕");
						}
					}
					else {	// 未掛載onXXXVisible callback function在nsEditor
						theLogger.error("未掛載'" + cmdItemsB[i].vis + "'在nsEditor命名空間下, 無法建立指令列按鈕");
					}
				}
				else {	// 未定義vis callback function name?
					theLogger.error("未定義指令列按鈕(id:" + cmdItemsB[i].id + ")的vis callback function name");
				}
			}
			if(cmds.length > 0) {
				// 1111221 Raymond 銓敘部序74 文稿頁籤指令列要折行成兩行
				//c.cmdFloat.setElem(this);
				c.cmdFloat.setCmds(cmds, true);
				c.cmdFloat.setElem(this);
			}
		}
		}	// end of 1130430 Raymond 中榮序95 新增判斷OwnRoleID符合環境變數「AOL_HIDE_DRAFT_CMDS」設定的長官角色時, 不要顯示點擊文稿頁籤時的指令列
		return false;	// 不要bubble
	}
	
	// 2017.2.9 新增刪除文稿時, 由DraftCmds.js呼叫同步刪除_memPPD中的記錄, 以免修正刪除來文上面的最後一個文稿時, 會轉圈圈問題
	this.delPPD = function(idx) {
		if(idx >= 0 && idx < _memPPD.length) {
			_memPPD.splice(idx, 1);
		}
	}
	
	// 文稿頁籤
    // 2023.4.14 - Eric 考試院彙整表序10, 公文基資立貼標籤移到最下面
    let _idxDraft = 1;
    if (SSO_CONFIG.OrgNickName=='EXAM' || ('dev_OrgNickName' in localStorage && localStorage.dev_OrgNickName=='EXAM')) {
        _idxDraft = 0;
    }
	var $tag = _viewPort.find(".tags .tags-group").eq(_idxDraft);
	var $newDraft = $tag.find(".tags-item-special");
	this.updateDraftTags = function(flipTo, adjustOrderParam) {	// 2016.8.17 新增flipTo參數, 可指定更新完文稿頁籤後翻頁至哪一筆文稿或附件頁次, 2016.12.11 新增adjustOrderParam參數
		$tag.find(".tags-item:not(.tags-item-special)").remove();
		var n = _model.getDraftCounts();
		// 1090513 Raymond 1090223 新增needResetPages變數, 當啟用自動調整簽稿會核單至第一筆功能及文稿數量大於記憶的文稿數時, 重設每文稿頁數記憶, 重設頁數解法尚有紙本公文頁數歸1問題, 可能要連所有呼叫到newDraft的地方都得改成接adjustOrderParam再pass給updateDraftTags
		if(!adjustOrderParam && theSSO.User.EnvSettings.get("AOL_AUTO_ADJ_CON_FIRST") == "Y" && n > _memPPD.length)
			var needResetPages = true;
		if(!!adjustOrderParam) {	// 2016.12.11 重新整理文稿頁籤時, 若是調整稿序的情況, 要同步調換_memPPD.pages
			var oldPages = [];
			for(var i=0; i<_memPPD.length; i++) {
				if(!!_memPPD[i])
					oldPages[i] = _memPPD[i].pages;
			}
			for(var i=0; i<adjustOrderParam.length; i++) {
				var oldIdx = adjustOrderParam[i].origIdx;
				// 1090513 Raymond 109223 因自動新增簽稿會核單後自動調整文稿順序, _memPPD會少於稿件數
				//if(oldIdx < n && !!_memPPD[oldIdx]) {
				//	_memPPD[i].pages = oldPages[oldIdx];
				//}
				if(oldIdx < n) {
					if(!!oldPages[oldIdx]) {
						if(!!_memPPD[i])
							_memPPD[i].pages = oldPages[oldIdx];
						else
							_memPPD[i] = {ti: undefined, pages: oldPages[oldIdx]};
					}
					else if(!!_memPPD[i])
						delete _memPPD[i];
				}
			}
		}
		for(var i=0; i<n; i++) {
			try {	// 2015.12.29 加try-catch
				var draftName = _model.getDraftName(i);	// 2016.11.3 稿序名稱太長則加上title屬性
				// 1070611 Raymond 1070530 區別主辦或會辦新增的文稿
				var tagClass = "", tip = draftName;
				var isFromDoc = _model.isFromDoc(i);
				// 1100512 Raymond 1090821 區別外會公文外機關的文稿
				var isExorgDraft = _model.isExorgDraft(i);
				if(isExorgDraft) {
					tagClass = "tags-item-exorgdraft";	// 外機關文稿
					draftName = "公文呈現檔";	// 外機關文稿的頁籤名稱固定為"公文呈現檔"
				}
				else
				if(isFromDoc > 0)
					tagClass = "tags-item-fromdoc";	// 來文
				else {
					var draftOU = _model.getConDraftUnitNo(i);
					// 1100419 Raymond 1080767 合併內政部1070530並新增判斷系統參數"CHECK_CLOSEDDRAFT_EDIT"為"Y"時, 區分出已結案的文稿
					var isClosed = _model.isClosedDraft(i);
					if(theSSO.User.SystemSets.get("CHECK_CLOSEDDRAFT_EDIT") == "Y" && isClosed)
						tagClass = "tags-item-closeddraft";	// 已結案
					else {
						if(draftOU == "00")
							tagClass = "tags-item-icou";	// 主辦
						else {
							if(draftOU == _model.getOwnOUId())
								tagClass = "tags-item-conou-own";	// 會辦, 目前公文在自己單位
							else
								tagClass = "tags-item-conou";	// 會辦, 其它會辦單位
						}
					}
					if(draftOU != "00") {
						// 查會辦單位名稱, 接在tooltip顯示
						var ouNm = SSOUtil.getUnitName(_model.getDocObj().sourceOrgNo, draftOU);
						tip += " - " + ouNm;
					}
					// 1140723 Raymond 1140818 北榮新增顯示文稿的產生時間於tooltip
					if(SSO_CONFIG?.OrgNickName == "TPVGH") {
						let ct = _model.getDraftCreateTime(i);
						if(!!ct) {
							ct = ct.substr(3, 2) + "/" + ct.substr(5, 2) + " " + ct.substr(7, 2) + ":" + ct.substr(9, 2);
							tip += "\n產生時間：" + ct;
						}
					}
				}
				
				if($newDraft.length)
					// 1140723 Raymond 1140818 北榮固定顯示文稿的tooltip
					// 1070511 Raymond 1070530 title改用tip, tip會加上會辦單位名稱一起顯示
					//var $draftItem = $("<div class='tags-item'><div class='ui-btn-text'" + ((draftName.length > 4)?" title='" + draftName + "'":"") + ">" + draftName + "</div><span class='ui-li-count'></span></div>").insertBefore($newDraft);
					//var $draftItem = $("<div class='tags-item " + tagClass + "'><div class='ui-btn-text'" + ((tip.length > 4)?" title='" + tip + "'":"") + ">" + draftName + "</div><span class='ui-li-count'></span></div>").insertBefore($newDraft);
					var $draftItem = $("<div class='tags-item " + tagClass + "'><div class='ui-btn-text'" + ((tip.length > 4 || SSO_CONFIG?.OrgNickName == "TPVGH")?" title='" + tip + "'":"") + ">" + draftName + "</div><span class='ui-li-count'></span></div>").insertBefore($newDraft);
				else
					// 1140723 Raymond 1140818 北榮固定顯示文稿的tooltip
					// 1070511 Raymond 1070530 title改用tip, tip會加上會辦單位名稱一起顯示
					//var $draftItem = $("<div class='tags-item'><div class='ui-btn-text'" + ((draftName.length > 4)?" title='" + draftName + "'":"") + ">" + draftName + "</div><span class='ui-li-count'></span></div>").appendTo($tag);
					//var $draftItem = $("<div class='tags-item " + tagClass + "'><div class='ui-btn-text'" + ((tip.length > 4)?" title='" + tip + "'":"") + ">" + draftName + "</div><span class='ui-li-count'></span></div>").appendTo($tag);
					var $draftItem = $("<div class='tags-item " + tagClass + "'><div class='ui-btn-text'" + ((tip.length > 4 || SSO_CONFIG?.OrgNickName == "TPVGH")?" title='" + tip + "'":"") + ">" + draftName + "</div><span class='ui-li-count'></span></div>").appendTo($tag);
				
				if(_currPo.draftIdx == i)
					$draftItem.addClass("tags-item-active");
				
				$draftItem.on("selected", i, onDraftTagSelected)
				.on("click", i, onClickDraftTag)
				/* 刪除文稿
				.on("swipeleft", i, function(event) {
					var idx = event.data;
					theLogger.log("on" + event.type + ": draft[" + idx + "]...");
					if($(this).find(".tags-item-delete-btn").length == 0) {
						_viewPort.find(".tags .tags-group .tags-item-delete-btn").remove();
						$("<div class='tags-item-delete-btn'><span class='ui-icon ui-icon-delete'>&nbsp;</div>").appendTo(this);
					}
				})*/;
				
				// 1090513 Raymond 1090223 重新整理文稿頁籤時, 若手動新增簽稿會核單可能會自動調整為第一筆, 故頁數都全部重取
				//if(!!_memPPD[i])	// 2016.12.11 重新整理文稿頁籤時, 若已更新過pages則不需要歸0(顯示1)
				if(!!_memPPD[i] && !needResetPages)
					_memPPD[i].ti = $draftItem;
				else
					_memPPD[i] = {ti: $draftItem, pages: _model.getDraftPageCounts(i) || 1};	// 2016.10.31 頁數最少顯示1
				$draftItem.find(".ui-li-count").text(_memPPD[i].pages);
			}
			catch(e) {
				//theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
				theLogger.error(e.stack);
				alert(e.message);
			}
		}
		// 翻頁至指定的文稿idx
		if(SSOUtil.typeOf(flipTo) == "number") {
			if(flipTo >= 0 && flipTo < $tag.find(".tags-item:not(.tags-item-special)").length) {
				//_currPo.draftIdx = -1;// 2016.11.11 bugfix
				_currPo.attIdx = -1;	// 2016.11.11 bugfix
				_currPo.po = 0;
				if(flipTo == _currPo.draftIdx)	// 2016.11.23 只更名沒調整順序, 則刷新頁面
					_viewPort.find(".pages").flip("refresh");
				else {	// 2017.3.29 fix for 從側屜新增文稿時, 翻頁會連帶出現指令列問題
					//$tag.find(".tags-item:not(.tags-item-special)").eq(flipTo).click();
					var dir = "left";
					if(flipTo < _currPo.draftIdx)
						dir = "right";
					_currPo.draftIdx = flipTo;
					_viewPort.find(".pages").flip(dir);
				}
			}
			else {
				theLogger.error("指定翻至文稿(" + flipTo + ")超出範圍!");
				if(flipTo > 0) {
					$tag.find(".tags-item:not(.tags-item-special)").eq(flipTo - 1).trigger('click');	// show前一筆文稿
                }
				else {
                    // 2023.4.14 - Eric 考試院彙整表序10, 公文基資立貼標籤移到最下面
                    let _idxDocInfo = 0;
                    if (SSO_CONFIG.OrgNickName=='EXAM' || ('dev_OrgNickName' in localStorage && localStorage.dev_OrgNickName=='EXAM')) {
                        let cntTagsGroup = _viewPort.find(".tags .tags-group").length;
                        _idxDocInfo = cntTagsGroup - 1;
                    }
					_viewPort.find(".tags .tags-group").eq(_idxDocInfo).find(".tags-item").trigger('click');	// 改show基資
                }
			}
		}
	}
	this.updateDraftTags();
	// 2016.8.16 新增唯讀模式不顯示新增文稿
	if($newDraft.length) {
		// 1090916 Raymond 1090564 新增信保特殊模式公文不提供新增文稿功能
		//if(_model.readOnly() || !_model.enableEdit())	// 唯讀, 2016.8.16 唯讀不可新增文稿, 可編不可存的模式須設disable_save=true及read_only=false, 2016.8.26 新增!enableEdit判定
		if(_model.readOnly() || !_model.enableEdit() || _model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")	// 唯讀, 2016.8.16 唯讀不可新增文稿, 可編不可存的模式須設disable_save=true及read_only=false, 2016.8.26 新增!enableEdit判定
			$newDraft.hide();
		else
			$newDraft.show();
	}
	
	// 2016.4.15 點擊事件處理函式切為named function, 供closeView時unbind用
	var that = this;
	function onClickNewDraft(event) {
		_viewPort.data("editCursor").cmdFloat.hide();
		if(_model.enableEdit()) {	// 2017.1.5 新增翻頁前先重新排版
			var dm = _model.getCurrDraftModel();
			if(!!dm && dm.dirty() && "updateView" in dm) {
				dm.updateView();
			}
		}
		if(nsEditor != undefined && "onNewDraft" in nsEditor) {
			event.data = _viewPort;
			nsEditor.onNewDraft.call(_model, event, function(idx) {
				that.updateDraftTags();
				/*try {	// 2015.12.29 加try-catch
					if($newDraft.length)
						var $draftItem = $("<div class='tags-item'><div class='ui-btn-text'>" + _model.getDraftName(idx) + "</div><span class='ui-li-count'></span></div>").insertBefore($newDraft);
					else
						var $draftItem = $("<div class='tags-item'><div class='ui-btn-text'>" + _model.getDraftName(idx) + "</div><span class='ui-li-count'></span></div>").appendTo($tag);
					
					$draftItem.on("selected", idx, onDraftTagSelected)
						.on("click", idx, onClickDraftTag);
					
					_memPPD[idx] = {ti: $draftItem, pages: _model.getDraftPageCounts(idx)};
					$draftItem.find(".ui-li-count").text(_memPPD[idx].pages);*/
					
					// 2017.2.24 - Raymond, 若當前頁是公文基資, 則呼叫fnODC010Save儲存功能, 判斷回傳值, 若是false表示有欄位未填之類的錯誤, 不允許翻頁
					if(_currPo.draftIdx < 0 && typeof fnODC010Save !== "undefined") {
						var res = fnODC010Save();
						if(typeof res === "boolean" && res == false) {
							theLogger.warn("fnODC010Save()回傳false, 可能有欄位必填而未填, 禁止翻頁!");
							return false;
						}
					}
					// 翻頁至新增的文稿
					_currPo.draftIdx = idx;
					_currPo.attIdx = -1;
					_currPo.po = 0;
					_viewPort.find(".pages").flip("left");
				/*}
				catch(e) {
					theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
					alert(e.message);
				}*/
			});
		}
		else
			alert('未定義"新增文稿"功能模組!');
		return false;
	}
	// 2016.8.24 開啟function讓RD-Edit.js的附件設定按鈕可以叫用匯出附件頁面及更新附件頁籤功能
	this.proceedRndrAtt = function() {
		_updateAttTags(_currPo.draftIdx, true);	// 2016.7.19 新增padding參數設為true, 表示正在匯出頁面
		// 開始匯出頁面
		_model.startRndrAtt(function() {		// 匯出頁面結束
			_updateAttTags(_currPo.draftIdx);	// 再更新附件頁籤
		}, function(addIdx, progress) {			// 匯出進度通知
			if(progress == 100) {
				if(_memPPA[attIdx].ti) {			// 更新頁次
					theLogger.debug("更新attIdx=" + attIdx + "的頁次");
					_memPPA[attIdx].ti.find(".ui-icon-clock").addClass("ui-li-count").removeClass("ui-icon-clock").text(_model.getAttPageCounts(_currPo.draftIdx, attIdx));
				}
				if("padding" in _memPPA[attIdx])
					delete _memPPA[attIdx].padding;	// 刪除匯出頁面旗標
			}
			_memPPA[attIdx].progress = progress;
			
			if(_currPo.attIdx == attIdx) {		// 目前正在檢視此附件頁面
				_viewPort.find(".pages").flip("refresh");	// 則刷新頁面
			}
		});
		//_viewPort.find(".pages").flip("refresh");	// 2016.8.30 FIX, 刷新本文頁面
	}
	function onClickNewAtt(event) {
		_viewPort.data("editCursor").cmdFloat.hide();
		if(_model.enableEdit()) {	// 2017.1.5 新增翻頁前先重新排版
			var dm = _model.getCurrDraftModel();
			if(!!dm && dm.dirty() && "updateView" in dm) {
				dm.updateView();
			}
		}
		
		//1110406	Leslie[1101578]	開啟前前檢核是否有開啟編輯中附件未關閉
		if(!!window.theAttEditMgr && !!theAOL.getCurrFolio()) {
			theAttEditMgr.query()
			.done(function(res) {
				if(res >= "1.0") {	// query成功會回傳版號, 目前只發布了1.0版
					var docNo = theAOL.getCurrFolio().getDocNo() || (theAOL.getCurrFolio().getDocObj().isDraft?theAOL.getCurrFolio().getOwnUserId():"USER");	// 未取文號的草稿以OWN_USER_ID為文號
					theAttEditMgr.queryAttStat(docNo, theAOL.getCurrFolio().getMsgId(), theAOL.sessionId, "*", "*")	// 查詢是否有附件仍在編輯開啟中
					.done(function(stat) {
						if(stat.attCount == 1 && (stat.attInfo.status == 1 || stat.attInfo.status == 3)) {	// 1110415 Raymond 1101578 編輯或唯讀附件開啟中
							alert("尚有編輯中附件, 請關閉編輯程式再繼續!");
						}
						else if(stat.attCount > 1 && Array.isArray(stat.attInfo)) {
							var hasOpenedAtt = false;
							for(var i=0; i<stat.attInfo.length; i++) {	// 1110323 Raymond fix IE不支援 for(ai of stat.attInfo) 語法
								var ai = stat.attInfo[i];
								if(ai.status == 1 || ai.status == 3) {	// 1110415 Raymond 1101578 編輯或唯讀附件開啟中
									hasOpenedAtt = true;
									alert("尚有編輯中附件, 請關閉編輯程式再繼續!");
									break;
								}
							}
							if(!hasOpenedAtt)
								proceedLast();
						}
						else
							proceedLast();
					})
					.fail(function() {
						proceedLast();
					});
				}
				else
					proceedLast();
			})
			.fail(function() {
				proceedLast();
			});
		}
		else
			proceedLast();
		
		function proceedLast() {	//1110406	Leslie[1101578]	開啟前前檢核是否有開啟編輯中附件未關閉，若沒有開啟編輯中附件時繼續處理後續作業
		if(nsEditor != undefined && "onAttachMgmt" in nsEditor) {	// 2016.11.21 改成附件管理
			event.data = _viewPort;
			_model.accquireDraftModel(_currPo.draftIdx)
				.done(function(dm) {
					if(SSO_CONFIG.enableConvertAttPage) {	// 2016.9.7 新增判斷是否啟用附件匯出頁面設定
						nsEditor.onAttachMgmt.call(dm, event, that.proceedRndrAtt);	// 2016.8.24 處理附件匯出頁面及更新頁籤功能改成named function
					}
					else {
						nsEditor.onAttachMgmt.call(dm, event, that.updateAttTags);	// 2016.9.7 不匯出附件頁面則直接更新附件頁籤
					}
				})
				.fail(function(errorText) {
					alert(errorText);
				});
		}
		else
			alert('未定義"附件管理"功能模組!');	// 2016.11.21 改成附件管理
		return false;
		}
		//1110406	Leslie[1101578]	//1110406	Leslie[1101578]	開啟前前檢核是否有開啟編輯中附件未關閉，若沒有開啟編輯中附件時繼續處理後續作業	==END==
	}
	if($newDraft.length) {	// 2016.4.15 唯讀模式時隱藏新增文稿頁籤
		/*if(_model.readOnly()) {	2016.7.4 唯讀模式亦可編輯內文包括新增文稿
			$newDraft.hide();
		}
		else {*/
			// 加上"新增文稿"頁籤項目, 2014.6.18 新增唯讀模式, 2015.10.15 改依FolioModel.readOnly()判定
			theLogger.log("可新增文稿");
			$newDraft.on('click', onClickNewDraft);//綁定新增文稿頁籤點擊事件, 觸發新增文稿功能(外部JS實作)
		//}
	}
	// 2016.4.15 綁定新增附件頁籤點擊事件, 觸發新增附件功能(外部JS實作)

    // 2023.4.14 - Eric 考試院彙整表序10, 公文基資立貼標籤移到最下面
	// => 找出附件及管理立貼的正確index再執行後續作業!
    let _idxAttMgmt = 2;
    if (SSO_CONFIG.OrgNickName=='EXAM' || ('dev_OrgNickName' in localStorage && localStorage.dev_OrgNickName=='EXAM')) {
        _idxAttMgmt = 1;
    }
	var $newAtt = _viewPort.find(".tags .tags-group").eq(_idxAttMgmt).find(".tags-item-special");
	if($newAtt.length) {
		theLogger.log("可新增附件");
		$newAtt.on('click', onClickNewAtt);
	}
	
	// 1100617 Raymond 1080761 合併內政部1070298, 新增參考公文功能
	var screen = $("<div>", {"class": "ui-popup-screen ui-screen-hidden"} ).appendTo( _viewPort ),
		listbox = $("<div class='ui-popup-container ui-selectmenu-hidden'><div class='ui-selectmenu ui-popup ui-overlay-shadow ui-corner-all ui-body-a'/></div>").insertAfter(screen),
		list = $( "<ul>", {
			"class": "ui-selectmenu-list",
			"id": "menuRefDoc",
			"role": "listbox",
			"aria-labelledby": "btnRefDoc",
			"data-divider-theme": "e"
		// 1110420 Raymond 1110438 順便加個陰影
		//}).attr( "data-theme", "c" ).appendTo( listbox.children().eq(0) ),
		}).attr( "data-theme", "c" ).css("box-shadow", "3px 3px 5px gray").appendTo( listbox.children().eq(0) ),
		holding = false;
	function closeMenu() {
		screen.removeClass("in").addClass("ui-screen-hidden");
		listbox.removeClass("ui-popup-active").addClass("ui-selectmenu-hidden").removeAttr( "style" );
	}
	screen.on("tap", function() {
		closeMenu();
	});

    // 2023.4.14 - Eric 考試院彙整表序10, 公文基資立貼標籤移到最下面
	let _idxRefDoc = 3;
    if (SSO_CONFIG.OrgNickName=='EXAM' || ('dev_OrgNickName' in localStorage && localStorage.dev_OrgNickName=='EXAM')) {
        _idxRefDoc = 2;
    }
	var $refDoc = _viewPort.find(".tags .tags-group").eq(_idxRefDoc).find(".tags-item-special");
	// 1070730 Raymond 修正參考公文頁籤點擊在開啟不同公文後會重複執行前一筆公文的參考公文功能問題
	//if($refDoc.length) {
	//	$refDoc.on('click', function() {
	function onClickViewRefDoc() {
			var docObj = _model.getDocObj();
			if("ODWDCM" in docObj && "REF_DOC" in docObj.ODWDCM && SSOUtil.typeOf(docObj.ODWDCM.REF_DOC) == "array" && docObj.ODWDCM.REF_DOC.length > 0) {
				theLogger.log("本文有" + docObj.ODWDCM.REF_DOC.length + "個參考公文");
				
				screen.width(_viewPort.parent().width()).height(_viewPort.height()).removeClass( "ui-screen-hidden" );
				list.empty().filter( ".ui-listview" ).listview( "destroy" );
			
				for(var i=0; i<docObj.ODWDCM.REF_DOC.length; i++) {
					var $li = $("<li tabindex='" + i + "'></li>");
					var mi = docObj.ODWDCM.REF_DOC[i];
					$li.attr("sign-type", mi.SIGN_TYPE).attr("data-icon", "arrow-r").append("<a>" + mi.DOC_NO + "</a>").appendTo(list);
					$li.find("a").on("click", mi, function(event) {
						var param = event.data;
						closeMenu();	// 關閉選單
						theLogger.log("開啟參考公文[" + param.DOC_NO + "], " + param.SIGN_TYPE);
						SSOUtil.viewRefDoc(localStorage.Artifact, param.DOC_NO, docObj.sourceOrgNo, param.SIGN_TYPE);
					});
				}
				list.listview();	// 套用選單樣式
				var t = $(this).offset().top,
					l = $(this).offset().left,
					ot = _viewPort.parent().scrollTop();
				// 1110420 Raymond 1110438 修正iPad上點擊參考公文不會出現參考文號選單的問題, 順便修正在非100%縮放比時, 參考文號選單出現位置會與100%縮放比時不同的問題
				//listbox.removeClass("ui-selectmenu-hidden").css({left: (l-300)+"px", top: (t+ot-67-(22*docObj.ODWDCM.REF_DOC.length))+"px", maxWidth: "200px"});
				var z = _viewPort.data("zoomController"),
					b = _viewPort.offset();
				if(!!z) {
					var l2 = (l - b.left) * 100 / z.currScale;
					var t2 = (t - b.top) * 100 / z.currScale;
					listbox.removeClass("ui-selectmenu-hidden").css({left: (l2-190)+"px", top: (t2-(22*(docObj.ODWDCM.REF_DOC.length-1)))+"px", maxWidth: "200px", transform: "translateZ(2px)"});
				}
				else
					listbox.removeClass("ui-selectmenu-hidden").css({left: (l-300)+"px", top: (t-67-(22*docObj.ODWDCM.REF_DOC.length))+"px", maxWidth: "200px", transform: "translateZ(2px)"});
				holding = true;
			}
	//	});
	}
		// 1100617 Raymond 1080761 合併內政部1070298並新增判斷系統參數啟用時才顯示"參考公文"頁籤
		// 1071122 Raymond 參考公文增加判斷是否有ODWDCM, 提供AKI800檢索不要顯示參考公文功能
		//if(_model.getSignType() == "E") {
		//if(_model.getSignType() == "E" && !!_model.getDocObj().ODWDCM) {
		if(_model.getSignType() == "E" && !!_model.getDocObj().ODWDCM && theSSO.User.SystemSets.USE_REF_DOC == "Y") {
			$refDoc.on('click', onClickViewRefDoc);
			$refDoc.show();	// 線上簽核則恢復參考公文功能
			//1080821	Leslie[1080640]	新增更新參考公文頁籤
			var docObj = _model.getDocObj();
			if("ODWDCM" in docObj && "REF_DOC" in docObj.ODWDCM && SSOUtil.typeOf(docObj.ODWDCM.REF_DOC) == "array" && docObj.ODWDCM.REF_DOC.length > 0)
				_updateRefDocTag($refDoc);
			else
				$refDoc.find("span").remove();
		}
		else
			$refDoc.hide();	// 紙本簽核不提供參考公文功能
	//}
	
	//1080821	Leslie[1080640]	新增更新參考公文頁籤
	function _updateRefDocTag($tagRefDoc){
		$($tagRefDoc).find("span").remove();
		$("<span class='ui-li-count'></span>").appendTo($($tagRefDoc)).css("color","black").text(docObj.ODWDCM.REF_DOC.length);
	}
	this.updateRefDocTag = function(){
		if("ODWDCM" in docObj && "REF_DOC" in docObj.ODWDCM && SSOUtil.typeOf(docObj.ODWDCM.REF_DOC) == "array" && docObj.ODWDCM.REF_DOC.length > 0)
			_updateRefDocTag($refDoc);
		else
			$refDoc.find("span").remove();
	}
	// -- end of 1100617 Raymond 1080761 合併內政部, 新增參考公文功能
	
	// 2016.11.3	Leslie	新增參考附件頁籤處理
	function _updateRefAttTag($tag3){
		$($tag3).find("span").remove();
		$("<span class='ui-li-count'></span>").appendTo($($tag3)).css("color","black").text(_model.getRefAttachsFileCnt());
		
		//1111012	Leslie[1110865]	新增可依設定，啟用顯示子頁籤
		if(theCustom.getCustomSet('ExtentRefAttTag') == 'Y'){
			_updateRefTmpAttSubTag($($tag3),_model.getRefAttachsFileCnt(),_model.getRefAttachNameInfo);
		}
	}
	
	function onClickViewRefAtt(event){
		if(_model.enableEdit()) {	// 2017.1.5 新增翻頁前先重新排版
			var dm = _model.getCurrDraftModel();
			if(!!dm && dm.dirty() && "updateView" in dm) {
				dm.updateView();
			}
		}
		if(nsEditor != undefined && "onViewRefAtt" in nsEditor) {
			event.data = _viewPort;
			try {
				nsEditor["onViewRefAtt"].call(this, event, _model, _updateRefAttTag);
			}
			catch(e){
				theLogger.error(e.message);
			}
		}
		else
			alert('未定義"參考附件"功能模組!');
		return false;
	}
	
	// 1100617 Raymond 1080761 合併內政部1070298, 原本位置被參考公文佔去
	//var $refAtt = _viewPort.find(".tags .tags-group").eq(3).find(".tags-item-special");
    // 2023.4.14 - Eric 考試院彙整表序10, 公文基資立貼標籤移到最下面
	let _idxRefAtt = 4;
    if (SSO_CONFIG.OrgNickName=='EXAM' || ('dev_OrgNickName' in localStorage && localStorage.dev_OrgNickName=='EXAM')) {
        _idxRefAtt = 3;
    }
	var $refAtt = _viewPort.find(".tags .tags-group").eq(_idxRefAtt).find(".tags-item-special");
	if(_model.getSignType() == "E"){
		$refAtt.on('click', onClickViewRefAtt);
		if(_model.getRefAttachsFileCnt() > 0){
			//1060904	Leslie[1060759]	修正頁籤顯示異常
			//$refAtt.find("span").removeClass("ui-icon ui-icon-arrow-r").addClass("ui-li-count").css("color","black").text(_model.getRefAttachsFileCnt());
			_updateRefAttTag($refAtt);
		}
		//1111012	Leslie[1110865]	加上機關客製ClassName，例：MocsUI、ExamUI....
		// $refAtt.show();	//2016.11.14	Leslie	BugFix 開過紙本後，頁籤即消失不見的問題
		$refAtt.show().addClass(SSOUtil.CustomUIClass);	//2016.11.14	Leslie	BugFix 開過紙本後，頁籤即消失不見的問題
	}
	else{
		$refAtt.hide();	//紙本簽核不提供參考附件功能
	}
	// 2016.11.3	Leslie	新增參考附件頁籤處理	--END--
	
	// 1111021 Raymond 1110885 新增提供給外部叫用更新參考附件頁籤的方法
	this.updateRefAttTags = function() {
		if(_model.getSignType() == "E")
			_updateRefAttTag($refAtt);
	}
	
	//1111012	Leslie[1110865]	新增簽閱附件，一律展開附件子項目
	function _updateRefTmpAttSubTag($attTag,attCnt,fnGetNameInfo){
		var $tagGroup = $attTag.parent();
		$tagGroup.children().not(".tags-item-special").remove();
		var n = attCnt;
		
		for(var j=0; j<n; j++){
			let objNameInfo = fnGetNameInfo(j);//_model.getTmpAttachNameInfo(j);
			
			if(objNameInfo == undefined)
				continue;
			
			if($attTag.length)
				var $attItem = $("<div class='tags-item' title='"+objNameInfo.Title+"'><a rel='external' target='new'><div class='ui-btn-text'>" + objNameInfo.Title + "</div><span class='ui-icon ui-icon-search'>&nbsp;</span></a></div>").insertBefore($attTag);
			else
				var $attItem = $("<div class='tags-item' title='"+objNameInfo.Title+"'><a rel='external' target='new'><div class='ui-btn-text'>" + objNameInfo.Title + "</div><span class='ui-icon ui-icon-search'>&nbsp;</span></a></div>").appendTo($tagGroup);
			
			$attItem.on("selected", j, function(event) {
				var idx2 = event.data;
				theLogger.log("on" + event.type + ": att[" + idx2 + "]-'" + $(this).find(".ui-btn-text").text() + "'...");
			})
			.find("a").on("click", j, function(event) {
				var idx2 = event.data;
				theLogger.log("點簽閱附件: on" + event.type + ": tmpAtt[" + idx2 + "]...");
				if(_model.enableEdit()) {	// 2017.1.5 新增翻頁前先重新排版
					var dm = _model.getCurrDraftModel();
					if(!!dm && dm.dirty() && "updateView" in dm) {
						dm.updateView();
					}
				}
				try {
					var attNameInfo = fnGetNameInfo(idx2)//_model.getTmpAttachNameInfo(idx2);
					var attFileName = attNameInfo.blbName;
					
					if(attFileName.match(/^blob:/)) {	// 新增的附件
						// 2016.11.7 for IE-compatible
						if("msSaveOrOpenBlob" in navigator) {
							var xhr = new XMLHttpRequest();
							xhr.open('GET', attFileName, true);
							xhr.responseType = 'blob';
							xhr.onload = function(e) {
								if (this.status == 200) {
									navigator.msSaveOrOpenBlob(this.response, attNameInfo.FileName);
								}
							};
							xhr.send();
						}
						else{
							let fileName =  attNameInfo.FileName;	//取得檔名，因為此時OrigFileName可能為BlobURL
							let viewType = 'PDF|JPG|PNG|GIF';
							let sType = fileName.substring(fileName.lastIndexOf('.')+1).toUpperCase();
							if(viewType.indexOf(sType) == -1)
								this.download = fileName;
							this.target = "_blank";	
							this.href = attFileName;
						}
						return true;
					}
					var origFilePath = _model.subDirPath +attNameInfo.attPath;

					var docAttUrl = "/odtools/docatt.ashx?DocNo=" + _model.getDocNo();
					if(_model.getDocObj().isDraft)
						docAttUrl = "/odtools/docatt.ashx?DocNo=DRAFTDOC";
					var b64str = Base64.encode(origFilePath);
					var uriEnc = encodeURIComponent(b64str);
					docAttUrl += ("&FileName=" + uriEnc);
					docAttUrl += ("&SAMLart=" + localStorage['Artifact']);
					theLogger.warn("開啟簽閱附件電子檔 - '" + docAttUrl + "'");
					this.href = docAttUrl;
					this.target = "_blank";	//2017.3.1	Leslie	附件開啟一律以新頁籤開啟
					return true;
				}
				catch(e) {
					theLogger.error("Exception! " + e.message + " - " + e.sourceURL + ":" + e.line);
					alert(e.message);
				}
				return false;
			});
		}
	}
	
	function _updateTmpAttTag($tag3){
		$($tag3).find("span").remove();
		$("<span class='ui-li-count'></span>").appendTo($($tag3)).css("color","black").text(_model.getTmpAttachsFileCnt());
		
		_updateRefTmpAttSubTag($($tag3),_model.getTmpAttachsFileCnt(),_model.getTmpAttachNameInfo);
	}
	
	function onClickViewTmpAtt(event){
		if(_model.enableEdit()) {	// 2017.1.5 新增翻頁前先重新排版
			var dm = _model.getCurrDraftModel();
			if(!!dm && dm.dirty() && "updateView" in dm) {
				dm.updateView();
			}
		}
		if(nsEditor != undefined && "onViewTmpAtt" in nsEditor) {
			event.data = _viewPort;
			try {
				nsEditor["onViewTmpAtt"].call(this, event, _model, _updateTmpAttTag);
			}
			catch(e){
				theLogger.error(e.message);
			}
		}
		else
			alert('未定義"簽閱附件"功能模組!');
		return false;
	}
	
	var $tmpAtt = _viewPort.find('#TmpAtt.tags-item-special');
	if(_model.getSignType() == "E" && SSO_CONFIG.OrgNickName == "MOCS"){
		$tmpAtt.on('click', onClickViewTmpAtt);
		if(_model.getTmpAttachsFileCnt() > 0){
			_updateTmpAttTag($tmpAtt);
		}
		$tmpAtt.show().addClass(SSOUtil.CustomUIClass);	//加上機關客製ClassName，例：MocsUI、ExamUI....
	}else{
		$tmpAtt.hide();
	}
	//1111012	Leslie[1110865]	新增簽閱附件 --END--
	
	// 2017.01.05	Leslie	新增預設頁面外觀底色設定
	var docObj = _model.getDocObj();
	if('speed' in docObj){	//基本判斷，是否由辦理中的公文開啟
		if(docObj.speed == '2')
			// 1070202 Raymond 1070103 修正先開最速件, 再開速件公文時, 公文夾底色仍保持紅色的問題
			//_viewPort.find(".pages").addClass('fast');
			_viewPort.find(".pages").removeClass("fastest").addClass('fast');
		else if(docObj.speed == '3')
			// 1070202 Raymond 1070103 修正先開最速件, 再開速件公文時, 公文夾底色仍保持紅色的問題
			//_viewPort.find(".pages").addClass('fastest');
			_viewPort.find(".pages").removeClass("fast").addClass('fastest');
		else
			_viewPort.find(".pages").removeClass('fast fastest');
		
		if('secret' in docObj){
			if(docObj.secret != '1')
				_viewPort.find(".pages").addClass('secret');
			else
				_viewPort.find(".pages").removeClass('secret');
		}
	}
	else{
		_viewPort.find(".pages").removeClass("fast fastest secret");	//外觀預設為白底(後續再依稿件各別設定)
	}
	
	_uploadInitialLog = true;	// 2016.2.24
	
	// 2014.8.25 - Raymond, 外掛移至頁籤處理完再套用, 否則參照檢視功能會出錯
	//_viewPort.find(".pages").flip({ctx: this.flipCtx});
	
	// 2016.4.1 - 支援桌機新增的<>翻頁按鈕
	// 1131001 Raymond 北榮序278 新增noFlipCrossDraftOrAttach參數, 傳入true, 表示不要翻到上一筆文稿/附件
	//function onClickFlipLeft() {
	function onClickFlipLeft(noFlipCrossDraftOrAttach) {
		// 1131213 Raymond 1131064 新增環境變數「WE_ALLOW_VIEW_READONLY_PAPER_DOC_FOLDER」, 當目前資料夾符合設定值時, 允許禁止編輯內文的紙本公文, 可以檢視文稿
		// 1110328 Leslie[1100287]	Merge[1070359]	將preprocessXML函式expose到nsEditor, 供調閱DI檔時叫用
		//if(_model.getDocObj().signType == "P" && !_model.enableEdit()) {	// 2016.12.30 卡紙本不允許編輯內文的流程點不可以看文稿
		//if(_model.getDocObj().signType == "P" && !_model.enableEdit() && !("aol_disable_odc010" in _model.getDocObj().uiParam)) {
		var allowViewReadOnlyPaperDocFolder = theSSO.User.EnvSettings.get("WE_ALLOW_VIEW_READONLY_PAPER_DOC_FOLDER").split(";");
		var thisFolder = _model.getDocObj().folder + "-" + _model.getDocObj().subfolder;
		var allowViewReadOnlyPaperDoc = allowViewReadOnlyPaperDocFolder.indexOf(thisFolder) >= 0;
		if(_model.getDocObj().signType == "P" && !_model.enableEdit() && !("aol_disable_odc010" in _model.getDocObj().uiParam) && !allowViewReadOnlyPaperDoc) {
			theLogger.warn("此流程點不允許編輯紙本公文內文, 禁止翻頁");
			alert("本流程點不允許編輯紙本公文內文");
			return false;
		}
		// 1131001 Raymond 北榮序278 新增滾輪到底/頂翻頁功能, 不要翻至下/上筆文稿/附件
		if(noFlipCrossDraftOrAttach == true) {
			if(_currPo.po == 0) {
				console.log("已翻至本文稿/附件的第一頁, 滾輪翻頁限制不要再往前翻頁");
				return;
			}
		}
		if(_model.enableEdit()) {	// 2017.1.5 新增翻頁前先重新排版
			var dm = _model.getCurrDraftModel();
			if(!!dm && dm.dirty() && "updateView" in dm) {
				if(_currPo.attIdx < 0)
					dm.updateView();
			}
		}
		_viewPort.find(".pages").flip("swiperight");
	}
	// 1131001 Raymond 北榮序278 新增noFlipCrossDraftOrAttach參數, 傳入true, 表示不要翻到下一筆文稿/附件
	//function onClickFlipRight() {
	function onClickFlipRight(noFlipCrossDraftOrAttach) {
		// 1131213 Raymond 1131064 新增環境變數「WE_ALLOW_VIEW_READONLY_PAPER_DOC_FOLDER」, 當目前資料夾符合設定值時, 允許禁止編輯內文的紙本公文, 可以檢視文稿
		// 1110328 Leslie[1100287]	Merge[1070359]	將preprocessXML函式expose到nsEditor, 供調閱DI檔時叫用
		//if(_model.getDocObj().signType == "P" && !_model.enableEdit()) {	// 2016.12.30 卡紙本不允許編輯內文的流程點不可以看文稿
		//if(_model.getDocObj().signType == "P" && !_model.enableEdit() && !("aol_disable_odc010" in _model.getDocObj().uiParam)) {
		var allowViewReadOnlyPaperDocFolder = theSSO.User.EnvSettings.get("WE_ALLOW_VIEW_READONLY_PAPER_DOC_FOLDER").split(";");
		var thisFolder = _model.getDocObj().folder + "-" + _model.getDocObj().subfolder;
		var allowViewReadOnlyPaperDoc = allowViewReadOnlyPaperDocFolder.indexOf(thisFolder) >= 0;
		if(_model.getDocObj().signType == "P" && !_model.enableEdit() && !("aol_disable_odc010" in _model.getDocObj().uiParam) && !allowViewReadOnlyPaperDoc) {
			theLogger.warn("此流程點不允許編輯紙本公文內文, 禁止翻頁");
			alert("本流程點不允許編輯紙本公文內文");
			return false;
		}
		// 1131001 Raymond 北榮序278 新增滾輪到底/頂翻頁功能, 不要翻至下/上筆文稿/附件
		if(noFlipCrossDraftOrAttach == true) {
			if((_currPo.attIdx >= 0 && _currPo.po >= (_memPPA[_currPo.attIdx].pages - 1)) ||
				(_currPo.attIdx < 0 && _currPo.po >= (_memPPD[_currPo.draftIdx].pages - 1))) {
				console.log("已翻至本文稿/附件的最末頁, 滾輪翻頁功能限制不要再往後翻頁");
				return;
			}
		}
		if(_model.enableEdit()) {	// 2017.1.5 新增翻頁前先重新排版
			var dm = _model.getCurrDraftModel();
			if(!!dm && dm.dirty() && "updateView" in dm) {
				if(_currPo.attIdx < 0)
					dm.updateView();
			}
		}
		_viewPort.find(".pages").flip("swipeleft");
	}
	var _isMobile = navigator.userAgent.search(/Mobile/gi) > 0;
	// 2019.12.19 - 1081132 Eric, MacPC support! window.realMac
	// 2019.10.17 - 1080905 Eric, iPadOS 13 quick-fix
	if (!_isMobile && !window.realMac) {
		_isMobile = navigator.userAgent.search(/Macintosh/gi) > 0;
	}

	if(!_isMobile) {
		_viewPort.closest("#iso").find("a.btnFlipLeft").on('click', onClickFlipLeft).show();
		_viewPort.closest("#iso").find("a.btnFlipRight").on('click', onClickFlipRight).show();
	}
	// 1130430 Raymond 中榮序94 新增支援滑鼠滾輪向下滾到底再向下滾會自動翻至下一頁, 向上滾到頂再向上滾會自動翻至上一頁, 行動裝置往下撥到底再向下撥會自動翻至下一頁, 往上撥到頂到向上撥會自動翻至上一頁
	var exceedMargin = 0,	// 0:最上, 1:最下, 2:中間 1130821 中榮序179 修正定義 => 0:中間, 1:最上, 2:最下, 以解決縮小顯示比例至無捲動條時, 上下滾動都應該觸發翻頁功能
		touchStartY = 0,	// 觸控點擊時垂直方向位置
		touchDeltaY = 0;	// 觸控移動後位移量, 正值表示向下移動, 負值表示向上移動
	// 1131001 Raymond 北榮序278 1.新增環境變數「AOL_NO_FLIP_CROSS_DRAFT_ATTACH」, 設為"Y"時滾輪到底/頂翻頁, 不要翻至下/上筆文稿/附件, 2.新增滾輪滾到底/頂後等待時間, 可設定環境變數「AOL_WHEEL_FLIP_WAIT_TIME」, 單位為"秒", 未設定時預設為0.5
	var ignoreWheel = false,
		waitWheelTimerId = undefined,
		waitWheelTime = 1000 * (theSSO.User.EnvSettings.get("AOL_WHEEL_FLIP_WAIT_TIME") || 0.5),
		noFlipCrossDraftOrAttach = theSSO.User.EnvSettings.get("AOL_NO_FLIP_CROSS_DRAFT_ATTACH") == "Y",
		// 1131022 Raymond 1131016 修正快速滾滑鼠滾輪到底或到頂時, 會立即翻頁的問題
		duringScrolling = false;
	function onScrollHandler(evt) {
		if(evt.type == "scrollend") {
			if(evt.target.scrollTop <= 0) {
				console.debug("%con" + evt.type, "background-color:cyan", {scrollTop: evt.target.scrollTop, scrollHeight: evt.target.scrollHeight, hight: $(evt.target).height()}, "exceed top");
				exceedMargin = 1;	// 1130821 中榮序179 修正定義 => 0:中間, 1:最上, 2:最下, 以解決縮小顯示比例至無捲動條時, 上下滾動都應該觸發翻頁功能
				console.debug("往上捲觸頂, 暫停處理滾輸事件" + waitWheelTime + "ms");
				ignoreWheel = true;			// 暫停處理滾輸事件
				if(!!waitWheelTimerId)
					clearTimeout(waitWheelTimerId);
				waitWheelTimerId = setTimeout(function() {
					ignoreWheel = false;	// 時間到後恢復處理滾輸事件
					waitWheelTimerId = undefined;
				}, waitWheelTime);
			}
			else if(evt.target.scrollTop + $(evt.target).height() >= evt.target.scrollHeight) {
				console.debug("%con" + evt.type, "background-color:cyan", {scrollTop: evt.target.scrollTop, scrollHeight: evt.target.scrollHeight, hight: $(evt.target).height()}, "exceed bottom");
				exceedMargin = 2;	// 1130821 中榮序179 修正定義 => 0:中間, 1:最上, 2:最下, 以解決縮小顯示比例至無捲動條時, 上下滾動都應該觸發翻頁功能
				console.debug("往下捲觸底, 暫停處理滾輸事件" + waitWheelTime + "ms");
				ignoreWheel = true;			// 暫停處理滾輸事件
				if(!!waitWheelTimerId)
					clearTimeout(waitWheelTimerId);
				waitWheelTimerId = setTimeout(function() {
					ignoreWheel = false;	// 時間到後恢復處理滾輸事件
					waitWheelTimerId = undefined;
				}, waitWheelTime);
			}
			else {
				console.debug("%con" + evt.type, "background-color:cyan", {scrollTop: evt.target.scrollTop, scrollHeight: evt.target.scrollHeight, hight: $(evt.target).height()});
				exceedMargin = 0;	// 1130821 中榮序179 修正定義 => 0:中間, 1:最上, 2:最下, 以解決縮小顯示比例至無捲動條時, 上下滾動都應該觸發翻頁功能
			}
			// 1131022 Raymond 1131016 修正快速滾滑鼠滾輪到底或到頂時, 會立即翻頁的問題
			duringScrolling = false;
		}
		else if(evt.type == "wheel") {
			// 1131001 Raymond 北榮序278 滾輪事件的.target可能是目前focus的元素,不是.contentPane,需要取得.contentPane元素才能正確判斷觸底/頂
			var ta = evt.target;
			if(!$(ta).is(".contentPane")) {
				ta = $(evt.target).closest(".contentPane").get(0);
				if(!ta) {
					console.error("找不到.contentPane元素, 無法處理滑鼠滾輸翻頁功能");
					return;
				}
			}
			console.debug("%con" + evt.type, "background-color:cyan", {scrollTop: ta.scrollTop, scrollHeight: ta.scrollHeight, height: $(ta).height(), deltaY: evt.originalEvent.deltaY, flipping: _flipping});
			// 1130821 中榮序179 修正定義 => 0:中間, 1:最上, 2:最下, 以解決縮小顯示比例至無捲動條時, 上下滾動都應該觸發翻頁功能
			//if((evt.originalEvent.deltaY + evt.target.scrollTop) < 0 && exceedMargin == 0) {
			//if((evt.originalEvent.deltaY + evt.target.scrollTop) < 0 && (exceedMargin & 1)) {
			if(ignoreWheel == true) {
				console.debug("忽略");
			}
			else if((evt.originalEvent.deltaY < 0 && ta.scrollTop > 0 && (evt.originalEvent.deltaY + ta.scrollTop) <= 0) ||		// 第一次往上捲觸頂
					(evt.originalEvent.deltaY > 0 && (ta.scrollTop + $(ta).height()) < ta.scrollHeight && (ta.scrollTop + $(ta).height() + evt.originalEvent.deltaY) >= ta.scrollHeight)) {	// 第一次往下捲觸底
				if(evt.originalEvent.deltaY < 0)
					console.debug("第一次往上捲觸頂, 暫停處理滾輸事件");
				else
					console.debug("第一次往下捲觸底, 暫停處理滾輸事件");
				ignoreWheel = true;			// 暫停處理滾輸事件
			}
			else if(evt.originalEvent.deltaY < 0 && ta.scrollTop == 0) {
				// 1130822 Raymond 中榮序179 修正滾到底後用力往上滾, 有時會觸發deltaY為正值, 但scrollTop未到底的onwheel事件, 須排除這類假的往下滾行為
				if(ta.scrollTop > 0) {
					console.debug("已捲至最上端, 再往上滾(deltaY=" + evt.originalEvent.deltaY + "), 但scrollTop未到頂, 應為假的往上滾事件, 忽略之");
				}
				// 1130730 Raymond 中榮序155 修改滑鼠滾輪翻頁功能為不能翻到公文基資頁
				else if(_currPo.po == 0 && _currPo.draftIdx == 0 && _currPo.attIdx == -1) {
					console.debug("已捲至最上端, 但已是第一筆文稿的第一頁, 依中榮要求不再觸發往上滾翻至公文基資頁行為");
				}
				// 1131022 Raymond 1131016 修正快速滾滑鼠滾輪到底或到頂時, 會立即翻頁的問題
				else if(duringScrolling == true) {
					console.debug("快速滾動至最上端, 暫停處理滾輸事件");
					ignoreWheel = true;			// 暫停處理滾輸事件
				}
				else {
					//console.log("已捲至最上端, 再往上滾觸發前一頁翻頁行為");
					//onClickFlipLeft();
					console.debug("已捲至最上端, 再往上滾觸發前一頁翻頁行為(deltaY=" + evt.originalEvent.deltaY + ", scrollTop=" + ta.scrollTop + ", deltaY+scrollTop=" + (evt.originalEvent.deltaY + ta.scrollTop) + ")");
					exceedMargin = 0;	// 1130821 中榮序179 修正定義 => 0:中間, 1:最上, 2:最下, 設為0以避免連續觸發onwheel事件重複執行翻頁功能, 最後翻頁成功/失敗再恢復成正確的flag
					// 1131001 Raymond 北榮序278 新增noFlipCrossDraftOrAttach參數, 傳入true, 表示不要翻到上一筆文稿/附件
					//onClickFlipLeft();
					onClickFlipLeft(noFlipCrossDraftOrAttach);
				}
			}
			// 1130821 中榮序179 修正定義 => 0:中間, 1:最上, 2:最下, 以解決縮小顯示比例至無捲動條時, 上下滾動都應該觸發翻頁功能
			//else if(evt.originalEvent.deltaY > 0 && exceedMargin == 1) {
			//else if(evt.originalEvent.deltaY > 0 && (exceedMargin & 2)) {
			else if(evt.originalEvent.deltaY > 0 && (ta.scrollTop + $(ta).height()) >= ta.scrollHeight) {
				// 1130822 Raymond 中榮序179 修正滾到底後用力往上滾, 有時會觸發deltaY為正值, 但scrollTop未到底的onwheel事件, 須排除這類假的往下滾行為
				if(ta.scrollTop + $(ta).innerHeight() < ta.scrollHeight) {
					console.debug("已捲至最下端, 再往下滾(deltaY=" + evt.originalEvent.deltaY + "), 但scrollTop未到底, 應為假的往下滾事件, 忽略之");
				}
				// 1131022 Raymond 1131016 修正快速滾滑鼠滾輪到底或到頂時, 會立即翻頁的問題
				else if(duringScrolling == true) {
					console.debug("快速滾動至最下端, 暫停處理滾輸事件");
					ignoreWheel = true;			// 暫停處理滾輸事件
				}
				else {
					// 1130808 Raymond 中榮序179 修正向下滾用力一點會觸發多次翻下一頁行為, 導致點擊次頁的簽核區域時不會顯示簽核工具列問題
					//console.log("已捲至最下端, 再往下滾觸發下一頁翻頁行為");
					//onClickFlipRight();
					console.debug("已捲至最下端, 再往下滾觸發下一頁翻頁行為(deltaY=" + evt.originalEvent.deltaY + ")");
					exceedMargin = 0;	// 1130821 中榮序179 修正定義 => 0:中間, 1:最上, 2:最下, 設為0以避免連續觸發onwheel事件重複執行翻頁功能, 最後翻頁成功/失敗再恢復成正確的flag
					// 1131001 Raymond 北榮序278 新增noFlipCrossDraftOrAttach參數, 傳入true, 表示不要翻到下一筆文稿/附件
					//onClickFlipRight();
					onClickFlipRight(noFlipCrossDraftOrAttach);
				}
			}
			// 1131022 Raymond 1131016 修正快速滾滑鼠滾輪到底或到頂時, 會立即翻頁的問題
			else
				duringScrolling = true;
		}
		/* 1140527 Raymond 1140321 觸控翻頁功能改到RD-Layout.js處理
		else if(evt.type == "touchstart") {
			console.log("on" + evt.type, evt.originalEvent.touches);
			if(!!evt.originalEvent.touches && evt.originalEvent.touches.length > 0 && !!evt.originalEvent.touches[0]) {
				touchStartY = evt.originalEvent.touches[0].pageY;
				touchDeltaY = 0;	// 1140523 Raymond 1140321 修正平板模式翻到公文基資頁後, 再點擊其它文稿頁籤, 會出現「已無前頁」訊息的問題
			}
		}
		else if(evt.type == "touchmove") {
			console.log("on" + evt.type, evt.originalEvent.touches, touchStartY);
			if(!!evt.originalEvent.touches && evt.originalEvent.touches.length > 0 && !!evt.originalEvent.touches[0])
				touchDeltaY = touchStartY - evt.originalEvent.touches[0].pageY;	// 往下拖拉是頁面往上捲, 往上拖拉是頁面往下捲
		}
		else if(evt.type == "touchend") {
			console.log("on" + evt.type, evt.originalEvent.touches, touchDeltaY);
			let $cp = $(evt.target).closest(".contentPane");
			if($cp.get(0).scrollTop + $cp.height() >= $cp.get(0).scrollHeight && touchDeltaY > 0) {
				console.log("已捲至最下端, 再往下撥觸發下一頁翻頁行為");
				onClickFlipRight();
			}
			else if($cp.get(0).scrollTop <= 0 && touchDeltaY < 0) {
				console.log("已捲至最上端, 再往上撥觸發前一頁翻頁行為");
				// 1140523 Raymond 1140321 平板觸控翻頁規則比照中榮序155, 修改觸控翻頁功能為不能翻到公文基資頁
				if(_currPo.po == 0 && _currPo.draftIdx == 0 && _currPo.attIdx == -1) {
					console.debug("已捲至最上端, 但已是第一筆文稿的第一頁, 依中榮要求不再觸發往上滾翻至公文基資頁行為");
				}
				else
				// 1140523 Raymond 1140321 平板觸控翻頁規則比照北榮序278, 新增noFlipCrossDraftOrAttach參數, 傳入true, 表示不要翻到下一筆文稿/附件
				//onClickFlipLeft();
					onClickFlipLeft(noFlipCrossDraftOrAttach);
			}
		}*/
	}
	if(_viewPort.closest(".contentPane").length) {
		// 1140523 Raymond 1140321 觸控翻頁功能改到RD-Layout.js處理
		//_viewPort.closest(".contentPane").css("overscroll-behavior-y", "none").on("wheel touchstart touchmove touchend scrollend", onScrollHandler);
		_viewPort.closest(".contentPane").css("overscroll-behavior-y", "none").on("wheel scrollend", onScrollHandler);
	}
	// 1130821 Raymond 中榮序179 監視viewPort大小, 若高度小於contentPane, 則exceed最上最下皆符合
	var _vpResizeObserver = new ResizeObserver((entries) => {
		for(let i=0, n=entries.length; i<n; i++) {
			console.debug("%cvpResizeObserver:", "background-color:cyan", entries[i]);
			if(entries[i].borderBoxSize) {
				console.debug("cr(" + i + "/" + n + "):" + Math.ceil(entries[i].borderBoxSize[0].inlineSize) + "," + Math.ceil(entries[i].borderBoxSize[0].blockSize));
			} else {
				console.debug("cr(" + i + "/" + n + "):" + Math.ceil(entries[i].contentRect.width) + "," + Math.ceil(entries[i].contentRect.height));
			}
		}
		if(entries.length == 1) {
			console.debug("%c" + entries[0].target.tagName + "." + entries[0].target.className, "background-color:cyan", entries[0].target.style.height, $(entries[0].target).innerHeight(), $(entries[0].target).outerHeight());
			//var oh = $(entries[0].target).outerHeight();
			console.debug("%c" + entries[0].target.parentNode.tagName + "." + entries[0].target.parentNode.className, "background-color:cyan", entries[0].target.parentNode.scrollTop, entries[0].target.parentNode.scrollHeight, entries[0].target.parentNode.style.height, $(entries[0].target).parent().innerHeight());
			if(entries[0].target.parentNode.scrollHeight <= $(entries[0].target).parent().innerHeight()) {
				console.debug("%c" + entries[0].target.parentNode.tagName + "." + entries[0].target.parentNode.className, "background-color:cyan", "未顯示捲動條, 設定exceedMargin=3");
				exceedMargin = 3;
			}
		}
	});
	_vpResizeObserver.observe(_viewPort.get(0));
	
	//$tag.listview("refresh");
	//if(_model.readOnly() != true)    // 2014.6.18 新增唯讀模式, 2015.10.15 改依FolioModel.readOnly()判定, 2016.7.4 唯讀模式亦可編輯內文
	if(!_viewPort.data("editCursor"))	// 2016.7.14 未初始化時無此data
		new EditCursor(_viewPort);
	//this.zoomCtlr = new ZoomController();
	//this.zoomCtlr.attach(_viewPort.get(0), $("#leftPart #fitMode-button .ui-btn-text").get(0));
	
	// 2016.8.9 新增參照公文歷史檢視
	if(_model.isRefDoc() && _model.getSignType() == "E") {
		var $hist = _viewPort.closest("#rightPart").find("#historyList");
		if($hist.length) {
			$hist.find("option:not(:first)").remove();
			
			function formatTime(str) {
				// 1100715 Raymond 1100854 新增[高大客製化]歷史檢視流程點的日期顯示年月日時分秒功能
				if(theUserInfo.OrgNickName == "NUK")
					return str.substr(0, 3) + "/" + str.substr(3, 2) + "/" + str.substr(5, 2) + " " + str.substr(7, 2) + ":" + str.substr(9, 2) + ":" + ((str.length == 13)?str.substr(11, 2):"00");
				return str.substr(3, 2) + "/" + str.substr(5, 2) + " " + str.substr(7, 2) + ":" + str.substr(9, 2);
			}
			function formatFlowName(no, flowNode) {
				var res = "#" + no;
				if(flowNode.refFlow && flowNode.refFlow.refChangeInfo && flowNode.refFlow.refChangeInfo.charger) {
					res += " " + flowNode.refFlow.refChangeInfo.charger.role + " - " + flowNode.refFlow.refChangeInfo.charger.name;
					res += ", " + formatTime(flowNode.refFlow.refChangeInfo.timeStamp);
				}
				return res;
			}
			
			var sf = _model.getSignFolder();
			var revs = sf.getRevisions();
			var currSel = sf.getCurrRevision();
			var i = 0;
			// 1100512 Raymond 1090821 判斷若是具有單層式文稿頁面的封裝檔, 則不顯示不含單層式文稿頁面的「外會」流程點
			var hasSingleLayerDraft = sf.hasSingleLayerDraft();	// 未傳入指定流程點id參數, 判斷整筆封裝檔是否含有單層式文稿頁面
			for(nm in revs) {
				if(hasSingleLayerDraft && sf.isExorgFlow(nm)) {	// 整筆封裝檔其中有含有單層式文稿頁面的流程點及此流程點為外機關流程點
					if(sf.hasSingleLayerDraft(nm)) {	// 含有單層式文稿頁面的流程點才顯示
						if(nm == currSel)
							$("<option value='" + nm + "' selected>" + formatFlowName(++i, revs[nm]) + "</option>").insertAfter($hist.find("option").get(0));
						else
							$("<option value='" + nm + "'>" + formatFlowName(++i, revs[nm]) + "</option>").insertAfter($hist.find("option").get(0));
					}
					else {	// 無單層式文稿頁面的流程點不顯示
						theLogger.log("不顯示無單層式文稿頁面的流程點'" + nm + "'");
					}
				}
				else
				if(nm == currSel)
					$("<option value='" + nm + "' selected>" + formatFlowName(++i, revs[nm]) + "</option>").insertAfter($hist.find("option").get(0));
				else
					$("<option value='" + nm + "'>" + formatFlowName(++i, revs[nm]) + "</option>").insertAfter($hist.find("option").get(0));
			}
			var that = this;
			$hist.on('change', function(event) {
				var val = $(this).val();
				if(val in revs) {
					sf.setCurrRevision(val);	// 設定流程點
					that.updateDraftTags();		// 更新文稿頁籤
					_viewPort.find(".pages").flip("refresh");	// 重新整理頁面
					_viewPort.closest("#iso").find("#signObjDocked").hide();	// 1061103 Raymond 1060952 切換流程點時隱藏簽核物件清單
				}
					
			}).selectmenu("refresh");
		}
		else
			theLogger.error("參照窗格無歷史檢視選單可用");
	}
	
	/*this.public = {
		// public methods
		initUpdate: function($viewPort) {
			theLogger.log("FolioModal.initUpdate(drafts: " + _folioInfo.drafts.length + ", " + _drafts.length + ")");
			for(var i=0; i<_drafts.length; i++) {
				theLogger.log(_drafts[i].getDocType());
			}
			$viewPort.find(".pg#pgInfo").on("flipTop", function(event) {
				$viewPort.find(".tags ul:first li").trigger("select");
			});
			$viewPort.find(".tags ul:first li").on("select", function(event) {
				theLogger.log("on" + event.type + ", " + $(this).find(".ui-btn-text").text());
				$(this).closest("ul").next().find("li[data-theme='e']").attr("data-theme", "c").removeClass("ui-btn-up-e").removeClass("ui-btn-hover-e").addClass("ui-btn-up-c");
				$(this).attr("data-theme", "e").removeClass("ui-btn-up-c").removeClass("ui-btn-hover-c").addClass("ui-btn-up-e");
				$(this).closest("ul").next().trigger("refresh");
			});
			var $tag = $viewPort.find(".tags ul").eq(1);
			for(var i=0; i<_folioInfo.drafts.length; i++) {
				var $ti = $("<li data-icon='false' data-theme='c' class='draft'><a>" + _folioInfo.drafts[i].name + "</a><span class='ui-li-count'></span></li>").insertBefore($tag.find("li:last"));
				
				$ti.on("select", function(event) {
					theLogger.log("on" + event.type + ", " + $(this).find(".ui-btn-text").text());
					if($viewPort.find(".tags ul:first li").attr("data-theme") == "e") {
						$viewPort.find(".tags ul:first li").attr("data-theme", "c").removeClass("ui-btn-up-e").removeClass("ui-btn-hover-e").addClass("ui-btn-up-c");
					}
					$(this).closest("ul").find("li[data-theme='e']").attr("data-theme", "c").removeClass("ui-btn-up-e").removeClass("ui-btn-hover-e").addClass("ui-btn-up-c");
					$(this).attr("data-theme", "e").removeClass("ui-btn-up-c").removeClass("ui-btn-hover-c").addClass("ui-btn-up-e");
					$(this).closest("ul").trigger("refresh");
				});
				
				_drafts[i].initUpdate($viewPort.find(".pages"), $ti, {name:_folioInfo.drafts[i].name, file:_folioInfo.drafts[i].tcFileName});
			}
			$tag.listview("refresh");
			
			new EditCursor($viewPort);
			
			$viewPort.find(".pages .pg").flip({
				flipTop: function() {
					$(this).trigger("flipTop");
				}
			});
			$viewPort.find(".pages .pg:not(.flip-left):first").addClass("top").trigger("flipTop");
		}
	};*/
	this.closeView = function() {
        // 2023.4.14 - Eric 考試院彙整表序10, 公文基資立貼標籤移到最下面
		let _target = ':first';
        if (SSO_CONFIG.OrgNickName=='EXAM' || ('dev_OrgNickName' in localStorage && localStorage.dev_OrgNickName=='EXAM')) {
		    _target = ':last';
        }
		_viewPort.find(".tags .tags-group").not(_target).filter(function() {
			$(this).children().not(".tags-item-special").remove();
		}); // 清空除了基資以外所有頁籤

		_viewPort.find(".pg").html("");
		// 1060823 Raymond 1060703 關閉簽核物件檢閱窗格
		$("#signObjDocked").hide();
		// 1070320 Raymond 1070363 關閉公文時不要關閉簽辦意見窗格, 只要清空簽辦意見清單
		// 1061109 Raymond 1060452 關閉簽辦意見窗格
		//$("#aol #leftPart #isoContainer").removeClass("showSidePanel");
		// 1110309 Raymond 1070363 修正開啟第2筆以後公文的參照窗格時, 因會關閉前1筆參照公文而清空右邊本文的簽辦意見窗格內容的問題
		// 1110317 Raymond 1070363 修正開啟第2筆以後公文的參照窗格時, 因會關閉前1筆參照公文而取消勾選右邊本文的設定選項的簽辦意見窗格核取方塊的問題
		if(!_model.isRefDoc()) {
			// 1120224 Raymond 1111225 關閉公文時清空包含內部意見的流程點項目
			//$("#aol #leftPart #sidePanel #signCmtList").find('li').remove();
			$("#aol #leftPart #sidePanel").find('li').remove();
		
			$("#btnSignCmtPanel").addClass("ui-checkbox-off").removeClass("ui-checkbox-on");
			// 1110317 Raymond 1101578 關閉公文時刪除所有開啟中的附件
			clearOpenedAttByEditMgr();
		}
		// 1110414 Raymond 1101578 關閉參照公文時刪除所有開啟中的附件
		else
			clearOpenedAttByEditMgr();
		//this.zoomCtlr.detach();
		//this.zoomCtlr = null;
        
        // 2023.4.14 - Eric 考試院彙整表序10, 公文基資立貼標籤移到最下面
		// => 找出正確tag-group index再執行後續作業!
        let _idxDraft = 1, _idxAttMgmt = 2, _idxRefDoc = 3, _idxRefAtt = 4;
        if (SSO_CONFIG.OrgNickName=='EXAM' || ('dev_OrgNickName' in localStorage && localStorage.dev_OrgNickName=='EXAM')) {
            _idxDraft = 0; _idxAttMgmt = 1; _idxRefDoc = 2; _idxRefAtt = 3;
            _viewPort.find(".tags .tags-group:last .tags-item")
                .off("selected", onSelectedDocMain)
                .off("click", onClickDocMain);
        }
        else {
            _viewPort.find(".tags .tags-group:first .tags-item")
                .off("selected", onSelectedDocMain)
                .off("click", onClickDocMain);
        }

		_viewPort.find(".tags .tags-group").eq(_idxDraft).find(".tags-item-special")
			.off("click", onClickNewDraft);
		_viewPort.find(".tags .tags-group").eq(_idxAttMgmt).find(".tags-item-special")
			.off("click", onClickNewAtt);
		// 1100617 Raymond 1080761 合併內政部1070298, 修正參考公文頁籤點擊在開啟不同公文後會重複執行前一筆公文的參考公文功能問題
		_viewPort.find(".tags .tags-group").eq(_idxRefDoc).find(".tags-item-special")
			.off("click", onClickViewRefDoc);
		//2016.11.14	Leslie	參考附件，在文稿關閉時，應比照處理
		// 1100617 Raymond 1080761 合併內政部1070298, Leslie	位子被參考公文佔去，順移一位
		//_viewPort.find(".tags .tags-group").eq(_idxRefDoc).find(".tags-item-special")
		_viewPort.find(".tags .tags-group").eq(_idxRefAtt).find(".tags-item-special")
			.off("click", onClickViewRefAtt).find('span').removeClass("ui-li-count").text("");
		//1111012	Leslie[1110865]	新增簽閱附件
		_viewPort.find("#TmpAtt.tags-item-special")
			.off("click", onClickViewTmpAtt).find('span').removeClass("ui-li-count").text("");
		
		if(!_isMobile) {
			_viewPort.closest("#iso").find("a.btnFlipLeft").off("click", onClickFlipLeft);
			_viewPort.closest("#iso").find("a.btnFlipRight").off("click", onClickFlipRight);
		}
		// 1130426 Raymond 中榮序94 新增支援滑鼠滾輪向下滾到底再向下滾會自動翻至下一頁, 向上滾到頂再向上滾會自動翻至上一頁
		if(_viewPort.closest(".contentPane").length) {
			// 1140523 Raymond 1140321 觸控翻頁功能改到RD-Layout.js處理
			//_viewPort.closest(".contentPane").off("wheel touchstart touchmove touchend scrollend", onScrollHandler);
			_viewPort.closest(".contentPane").off("wheel scrollend", onScrollHandler);
		}
	}
	
	this.save = function() {	// 2014.10.21 - Raymond, 儲存當前頁面資料
		// 1081230 Raymond 1080194 配合fnWebEditSave改為非同步呼叫
		var dfd = $.Deferred();
		if(_currPo.draftIdx < 0 && typeof fnODC010Save !== "undefined")	{// 當前頁是公文基資
			var res = fnODC010Save();
			if(typeof res === "boolean" && res == false) {	// 2016.7.19 新增判斷fnODC010Save的回傳值
				theLogger.warn("fnODC010Save()回傳false, 可能有欄位必填而未填, 禁止儲存!");
				// 1081230 Raymond 1080194 配合fnWebEditSave改為非同步呼叫
				//return false;
				dfd.resolve(false);
			}
			else {// 1081230 Raymond 1080194 若是在基資頁面按儲存不用呼叫fnWebEditSave但仍要以非同步方式resolve
				theLogger.warn("fnODC010Save()回傳" + res + ", 繼續儲存!");
				dfd.resolve(nextCheck());	// 後面還有一個檢核
			}
		}
		// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式下不提供同步寫回公文基資功能
		else if(!!theSSO && theSSO.offlineMode == true) {
			dfd.resolve(true);	// 離線模式儲存前檢核也不要RRBCheck
		}
		else if(typeof fnWebEditSave !== "undefined") {	// 2016.8.9 當前頁不是基資, 但需同步
			// 1081230 Raymond 1080194 配合fnWebEditSave改為非同步呼叫
			//1061222 David 1061170 呼叫fnWebEditSave()，新增傳入觸發類型
			//var res = fnWebEditSave(_model);
			//var res = fnWebEditSave(_model, "2");
			//if(typeof res === "boolean" && res == false) {	// 2016.12.6 新增判斷fnWebEditSave的回傳值
			//	theLogger.warn("fnWebEditSave()回傳false, 可能有欄位必填而未填, 禁止儲存!");
			//	return false;
			//}
			fnWebEditSave(_model, "2").done(function(res) {
				if(typeof res === "boolean" && res == false) {
					theLogger.warn("fnWebEditSave()回傳false, 可能有欄位必填而未填, 禁止儲存!");
					dfd.resolve(res);
				}
				else
					dfd.resolve(nextCheck());	// 後面還有一個檢核
			})
			.fail(function(errorText) {
				if(!!errorText && SSOUtil.typeOf(errorText) == "string") {
					theLogger.error("執行fnWebEditSave()發生錯誤 - " + errorText);
					alert(errorText);
				}
				else
					theLogger.error("執行fnWebEditSave()發生錯誤!");
				dfd.reject(errorText);
			});
		}
		// 1081230 Raymond 1080194 最後一個檢核用function包住, 在非同步執行完fnWebEditSave後再執行
		function nextCheck() {
		// 2016.12.9 新增呼叫鐵工局客製的檢核功能
		if(typeof RRBCheckIssue !== "undefined") {
			var res = RRBCheckIssue();
			if(typeof res === "boolean" && res == false) {
				theLogger.warn("RRBCheckIssue()回傳false, 禁止儲存!");
				return false;
			}
		}
		return true;	// 2016.7.19 若當前頁不是基資或fnODC010Save未改前無回傳值則回傳true
		}
		// 1081230 Raymond 1080194 配合fnWebEditSave改為非同步呼叫, 回傳promise
		return dfd.promise();
	}
	
	this.accquireCurrDraftModel = function() {	// 2016.5.5 - Raymond, 取得目前文稿的Model物件
		var dfd = $.Deferred();
		if(_currPo.draftIdx >= 0 && _currPo.attIdx == -1) {  // 本文
			_model.accquireDraftModel(_currPo.draftIdx)
				.done(function(dm) {
					dfd.resolve(dm);
				})
				.fail(function(errorText) {
					dfd.reject(errorText);
				});
		}
		else
			dfd.reject("目前檢視頁面非文稿");
		return dfd.promise();
	}
	this.currDraftIndex = function() {	// 2016.8.15 新增取得目前文稿序, -1表示基資
		return _currPo.draftIdx;
	}
	// 1090512 Raymond 1090223 新增遞增目前文稿順序
	this.shiftCurrDraftIndex = function() {
		_currPo.draftIdx ++;
	}
	this.currPo = function() {		// 2017.3.31 新增取得目前頁次
		return _currPo.po;
	}
	this.goToPage = function(po) {	// 2017.3.31 新增翻頁
		if(_currPo.po > po) {
			theLogger.log("向右翻頁至第" + po + "頁");
			_currPo.po = po;
			_viewPort.find(".pages").flip("right");
		}
		else if(_currPo.po < po) {
			theLogger.log("向左翻頁至第" + po + "頁");
			_currPo.po = po;
			_viewPort.find(".pages").flip("left");
		}
	}
	this.goToAnyPage = function(draftIdx, attIdx, po) {	// 1060822 Raymond 1060703 新增切換至特定頁面功能
		var dir;
		if(_currPo.draftIdx > draftIdx) {
			theLogger.log("向右翻頁至文稿#" + draftIdx);
			dir = "right";
		}
		else if(_currPo.draftIdx < draftIdx) {
			theLogger.log("向左翻頁至文稿#" + draftIdx);
			dir = "left";
		}
		if(_currPo.attIdx > attIdx) {
			theLogger.log("向右翻頁至文稿#" + draftIdx + "之附件#" + attIdx + "第" + po + "頁");
			_currPo.draftIdx = draftIdx;
			_currPo.attIdx = attIdx;
			_currPo.po = po;
			_viewPort.find(".pages").flip(dir || "right");
		}
		else if(_currPo.attIdx < attIdx) {
			theLogger.log("向左翻頁至文稿#" + draftIdx + "之附件#" + attIdx + "第" + po + "頁");
			_currPo.draftIdx = draftIdx;
			_currPo.attIdx = attIdx;
			_currPo.po = po;
			_viewPort.find(".pages").flip(dir || "left");
		}
		else {
			if(_currPo.po > po) {
				theLogger.log("向右翻頁至第" + po + "頁");
				_currPo.draftIdx = draftIdx;
				_currPo.attIdx = attIdx;
				_currPo.po = po;
				_viewPort.find(".pages").flip(dir || "right");
			}
			else if(_currPo.po < po) {
				theLogger.log("向左翻頁至第" + po + "頁");
				_currPo.draftIdx = draftIdx;
				_currPo.attIdx = attIdx;
				_currPo.po = po;
				_viewPort.find(".pages").flip(dir || "left");
			}
			else if(_currPo.draftIdx != draftIdx) {	// 1100820 Raymond 1100431 指定翻頁至不同筆文稿的同頁次
				_currPo.draftIdx = draftIdx;
				_currPo.attIdx = attIdx;
				_currPo.po = po;
				_viewPort.find(".pages").flip(dir);
			}
			else
				theLogger.log("指定翻頁至目前頁");
		}
	}
	this.newSOID = function() {	// 2017.1.18 由外部簽核物件記錄檔控制新增簽核物件的ID規則
		return _model.getSignFolder().xSignFolder().newSOID();
	}
	// 1130206 Raymond 1120887 新增遞增目前文稿的頁數
	this.incCurrDraftPages = function() {
		if(_currPo.draftIdx >= 0 && _currPo.attIdx == -1 && !!_memPPD[_currPo.draftIdx])	// 本文才處理
			_memPPD[_currPo.draftIdx].pages++;
	}
	
	// 2016.11.10 新增掛在nsEditor下的保留簽署物件相關函式
	nsEditor.onReserveSOVisible = function(fm) {
		// 1130117 Raymond 1120887 新增判斷簽稿會核單為會辦單位可編輯會辦意見區時, 允許變更保留簽署物件功能
		if(!fm.enableEdit() && fm.getSignType() == "E" && !fm.getDocObj().isDraft) {
			let dm = fm.getCurrDraftModel();
			return !!dm && dm.canEditCon();
		}
		return fm.enableEdit() && fm.getSignType() == "E" && !fm.getDocObj().isDraft;	// 線上簽核且非可編輯內文才能切換保留簽署物件
	}
	nsEditor.onReserveSOState = function(fm) {
		return fm.getReserveSO();
	}
	nsEditor.onReserveSO = function(event, fm, checked) {
		fm.setReserveSO(checked);
		// 1121109 Raymond 1120881 新增切換不保留或保留簽署物件時, 簽核區域恢復為預設高度或原始高度
		let dm = fm.getCurrDraftModel();
		if(!!dm && dm.dirty())
			dm.resumeSALP(checked);
		// 1060927 Raymond 切換後立即重新整理頁面(成大要求)
		_viewPort.find(".pages").flip("refresh");
	}
	
	// 1110315 Raymond 1101578 新增判斷是否應以附件編輯模組開啟附件
	function shouldOpenByAttEdit(draftIdx, attIdx) {
		if(!!window.theAttEditMgr) {
			var str = theSSO.User.EnvSettings.get("AOL_ATTACH_DIRECT_EDIT_TYPE");
			var allowTypes = (str.length > 0)?str.split(";"):["doc","docx","xls","xlsx","ppt","pptx","odt","ods","odp","odg"];
			var filename = _model.getDraftAttFileName(draftIdx, attIdx);
			var fn = filename.toLowerCase();
			for(var i=0; i<allowTypes.length; i++) {	// 1110323 Raymond fix IE不支援 for(at of allowTypes) 語法
				var at = allowTypes[i];
				if(at.length > 0) {
					var ext = "." + at.toLowerCase();
					if(fn.indexOf(ext) != -1) {
						console.log("附件副檔名符合支援的類型, 附件原始檔可直接開啟編輯");
						return true;
					}
				}
			}
			console.log("附件副檔名不符合支援的類型, 附件原始檔依原來的下載開啟邏輯執行");
		}
		else
			console.log("附件編輯監測服務模組控制介面不存在");
		return false;
	}
	// convert Blob to a file object
	function blobToFile(theBlob, fileName){
		//A Blob() is almost a File() - it's just missing the two properties below which we will add
		theBlob.lastModifiedDate = new Date();
		theBlob.name = fileName;
		return theBlob;
	}
	// 1110414 Raymond 1101578 新增指定msgId, 未傳入時用公文目前的msgId, 以修正參照公文開啟歷史檢視窗格的附件時都會下載到公文目前的msgId的同一目錄下的問題
	//function openAttByEditMgr(draftIdx, attIdx, blobOrUrl, updateCallback, fallback) {
	function openAttByEditMgr(draftIdx, attIdx, blobOrUrl, updateCallback, fallback, msgId) {
		theAttEditMgr.query()
		.done(function(res) {
			if(res >= "1.0") {	// query成功會回傳版號, 目前只發布了1.0版
				_model.accquireDraftModel(draftIdx).done(function(dm) {
					// 1110802 Raymond 考試院序148 新增判斷是否有dm, 無dm表示是來文
					if(!!dm) {	// 一般文稿
						var draftGUID = dm.getDraftGUID();
						var attGUID = dm.getAttachGUID(attIdx);
					}
					else {	// 來文
						var draftGUID = "FromDoc";		// 來文無GUID, 改用固定名稱取代(中文的稿名"來文內容"會有比對不到的問題, 故用固定英文)
						var attGUID = "FromAtt-" + attIdx;	// 來文附件無GUID, 改用固定名稱取代(中文的附件名"第1件"會有比對不到的問題, 故用固定英數組合)
					}
					var filename = _model.getDraftAttFileName(draftIdx, attIdx);
					if(filename.indexOf("\\") >= 0)
						filename = filename.substr(filename.lastIndexOf("\\") + 1);
					// 1110802 Raymond 考試院序148 新增判斷是否有dm, 無dm表示是來文
					//var draftEditable = dm.getEditable();
					var draftEditable = (!!dm)?dm.getEditable():false;
					var docNo = _model.getDocNo() || (_model.getDocObj().isDraft?_model.getOwnUserId():"USER");	// 未取文號的草稿以OWN_USER_ID為文號
					
					// 1110414 Raymond 1101578 若指定msgId則使用, 未指定時則用公文目前的msgId, 以修正參照公文開啟歷史檢視窗格的附件時都會下載到公文目前的msgId的同一目錄下的問題
					//theAttEditMgr.queryAttStat(docNo, _model.getMsgId(), theAOL.sessionId, draftGUID, attGUID)
					theAttEditMgr.queryAttStat(docNo, (!!msgId)?msgId:_model.getMsgId(), theAOL.sessionId, draftGUID, attGUID)
					.done(function(stat) {
						if(stat.attCount == 1 && (stat.attInfo.status == 1 || stat.attInfo.status == 3)) {	// 1110415 Raymond 1101578 編輯或唯讀附件開啟中
							console.log("編輯附件正在開啟中, 提示使用者");
							alert("此附件正在開啟中, 請在工作列中切換應用程式顯示該附件");
						}
						else if(stat.attCount == 1 && stat.attInfo.status == 2) {	// 編輯附件仍暫存中
							console.log("編輯附件仍在暫存目錄中, 不需下載直接開啟");
							// 1110414 Raymond 1101578 若指定msgId則使用, 未指定時則用公文目前的msgId, 以修正參照公文開啟歷史檢視窗格的附件時都會下載到公文目前的msgId的同一目錄下的問題
							//theAttEditMgr.openAttach(docNo, _model.getMsgId(), theAOL.sessionId, draftGUID, attGUID, filename, !draftEditable, undefined, updateCallback, dm);
							theAttEditMgr.openAttach(docNo, (!!msgId)?msgId:_model.getMsgId(), theAOL.sessionId, draftGUID, attGUID, filename, !draftEditable, undefined, updateCallback, dm);
						}
						else if(stat.attCount == 1 && stat.attInfo.status == 4) {	// 1110415 Raymond 1101578 唯讀附件已下載未開啟
							console.log("編輯附件仍在暫存目錄中(唯讀), 不需下載直接開啟");
							// 1110414 Raymond 1101578 若指定msgId則使用, 未指定時則用公文目前的msgId, 以修正參照公文開啟歷史檢視窗格的附件時都會下載到公文目前的msgId的同一目錄下的問題
							//theAttEditMgr.openAttach(docNo, _model.getMsgId(), theAOL.sessionId, draftGUID, attGUID, filename, !draftEditable, undefined, updateCallback, dm);
							theAttEditMgr.openAttach(docNo, (!!msgId)?msgId:_model.getMsgId(), theAOL.sessionId, draftGUID, attGUID, filename, !draftEditable, undefined, updateCallback, dm);
						}
						else {
							if(typeof blobOrUrl == "string") {
								console.log("下載" + draftIdx + "-" + attIdx + "附件[" + blobOrUrl + "]...");
								fetch(blobOrUrl + "&t=" + (new Date()).getTime())	// 下載超鏈結附件電子檔額外加上時間變數, 避免同一次登入不同次開啟公文附件, 因Cache而未下載到前一次儲存上傳的附件電子檔
								.then(function(resp) {
									console.log("下載結果:" + resp.statusText);
									return resp.blob();
								})
								.then(function(blob) {
									console.log("下載檔案:", blob);
									var file = blobToFile(blob, filename);
									console.log("開啟附件編輯:", filename);
									// 1110414 Raymond 1101578 若指定msgId則使用, 未指定時則用公文目前的msgId, 以修正參照公文開啟歷史檢視窗格的附件時都會下載到公文目前的msgId的同一目錄下的問題
									//theAttEditMgr.openAttach(docNo, _model.getMsgId(), theAOL.sessionId, draftGUID, attGUID, filename, !draftEditable, file, updateCallback, dm);
									theAttEditMgr.openAttach(docNo, (!!msgId)?msgId:_model.getMsgId(), theAOL.sessionId, draftGUID, attGUID, filename, !draftEditable, file, updateCallback, dm);
								});
							}
							else if(blobOrUrl instanceof Blob) {	// 1110330 Raymond 1101578 fix for Blob object
								var file = blobToFile(blobOrUrl, filename);
								console.log("開啟附件編輯:", filename);
								// 1110414 Raymond 1101578 若指定msgId則使用, 未指定時則用公文目前的msgId, 以修正參照公文開啟歷史檢視窗格的附件時都會下載到公文目前的msgId的同一目錄下的問題
								//theAttEditMgr.openAttach(docNo, _model.getMsgId(), theAOL.sessionId, draftGUID, attGUID, filename, !draftEditable, file, updateCallback, dm);
								theAttEditMgr.openAttach(docNo, (!!msgId)?msgId:_model.getMsgId(), theAOL.sessionId, draftGUID, attGUID, filename, !draftEditable, file, updateCallback, dm);
							}
							else
								theLogger.error("指定開啟" + draftIdx + "-" + attIdx + "附件非字串亦非Blob, 無法開啟", blobOrUrl);
						}
					})
					.fail(function(errorText) {
						alert(errorText);
					});
				});
			}
			else {
				alert("theAttEditMgr.query()回傳" + res);
			}
		})
		.fail(function(errorText, errorCode) {
			if(errorCode == 1 || errorCode == 2) {
				if(!!fallback/* && confirm(errorText + "\r\n\r\n未啟動[附件編輯監測服務模組], 請問是否以舊有方式下載/開啟附件?")*/) {	// 1110407 Raymond 1101578 點擊附件頁籤改為不要詢問
					//theAOL.disableUseAttEdit = true;	// 設定停用旗標
					fallback();
				}
				else if(!fallback) {
					/* 1110407 Raymond 1101578 AOL首次載入公文時, 檢查若未啟動編輯模組, 則提示警告一次後, 以舊邏輯下載檔案方式處理附件頁籤點擊行為
					if(errorCode == 1)
						alert(errorText + "\r\n\r\n請安裝或啟動[附件編輯監測服務模組]");
					else if(errorCode == 2)
						alert(errorText + "\r\n\r\n請重新安裝或重新啟動[附件編輯監測服務模組]");*/
					alert(errorText + "\r\n\r\n未啟動[附件編輯監測服務模組], 系統將以舊有方式下載/開啟附件!");
					theAOL.disableUseAttEdit = true;	// 設定停用旗標
				}
			}
			else
				alert(errorText);
		});
	}
	function clearOpenedAttByEditMgr() {
		if(!!window.theAttEditMgr) {
			theAttEditMgr.query()
			.then(function(res) {
				if(res >= "1.0") {	// query成功會回傳版號, 目前只發布了1.0版
					console.log("清除曾開啟過的(暫存的)附件");
					var docNo = _model.getDocNo() || (_model.getDocObj().isDraft?_model.getOwnUserId():"USER");	// 未取文號的草稿以OWN_USER_ID為文號
					// 1110414 Raymond 1101578 參照公文關閉時列舉出所有msgId來刪除
					if(_model.isRefDoc()) {
						for(rev in _model.getSignFolder().getRevisions()) {
							var msgid = rev.substr(rev.lastIndexOf("_") + 1);
							console.log("del attach files of rev:" + msgid);
							theAttEditMgr.delAttachFile(docNo, msgid, theAOL.sessionId, "*", "*");
						}
					}
					else
					theAttEditMgr.delAttachFile(docNo, _model.getMsgId(), theAOL.sessionId, "*", "*");
				}
			});
		}
		else
			console.log("附件編輯監測服務模組控制介面不存在");
	}
	// 2017.1.18 - Raymond, 外掛移至最後再套用, 否則newSOID()會叫不到
	_viewPort.find(".pages").flip({ctx: this.flipCtx});
}

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-FolioView.js").finish();
})();