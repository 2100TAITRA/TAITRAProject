// SignFolder class
//   
// DATE		SA		PRG		MGR_NO	DESC
// 1041215	Raymond	Raymond	-------	改用theLogger記錄LOG資訊
// 1060417	Raymond	Raymond	-------	修正因1060414修改RD-SignWork.js讀入頁面影像檔的原始檔名造成儲存再開啟後, 點擊頁面頁籤會跳page物件無fileRef檔案參照問題
// 1060420	Raymond	Raymond	-------	修正儲存後開啟再儲存時, 未檢視的文稿, 其簽核區域資訊未寫入外部簽核記錄檔的問題
// 1060427	Raymond	Raymond	-------	修正若attId是數字時, 會產生Exception, 若先調換附件序再置換附件時會導致暫存檔的附件檔名跟附件名未更新而與未置換附件重複的問題, 航港-序638
// 1060427	Raymond	Raymond	-------	修正調換附件序後暫存檔附件序不一致與重複的問題
// 1060503	Leslie	Leslie	1060225	修正來文附件頁面，物件的父層應為來文文面，多指定一層Parent(目前為windows)，會造成文面選單判定錯誤
// 1060504	Raymond	Raymond	-------	新增saveRuntime及getRuntimeDraft函式供列印時呼叫, 將目前的文稿、簽核區域、簽核物件資訊記錄在另一個變數, 依目前排版結果更新簽核區域資訊, 避免影響本來的外部簽核記錄檔的簽核區域資訊
// 1060517	Raymond	Raymond	1060244	修正異動保留簽核物件旗標時, 未更新Runtime版本的reserveSO屬性, 導致列印時不會依目前設定保留或不保留之前流程點簽核物件問題
// 1060601	Raymond	Raymond	-------	新增判斷是否有不存在頁面的簽核物件, 有則判斷是否為本次新增的頁次, 若是的話則綁定此頁-FDA序4361
// 1060607	Raymond	Raymond	1060283	新增附件頁面影像檔向左或向右旋轉90度
// 1060711	Raymond	Raymond	1060526	分文後創稿傳送失敗, 開啟暫存再開啟時, 會有目前流程點MsgId的版本但ID與封裝檔不一致的情況發生, 須過濾掉不可重複新增版本, 否則會因保留簽署物件又同ID(草稿的'NewDraft1')而演變成無窮迴圈問題
// 1060713	Raymond	Raymond	1060619、1060569	外部簽核物件記錄sa-id為數字, 但sa-type為空值, 預判為"單位", 以免顯示時判定saType不符而不會顯示此物件(doBuildSO@RD-FolioView.js)
// 1060718	Raymond	Raymond	1060610、1060632	修正儲存到外部簽核記錄檔的座標應為頁面解析度
// 1060724	Raymond	Raymond	1060604	新增檢查外部簽核記錄檔的簽核物件座標是否差異太大的函式
// 1060808	Raymond	Raymond	1060579	計算各版本的應保留簽核物件於draftPages層並記錄AOLProccessData.xml中所記錄的簽核區域至各別版本的頁面以供歷史檢視使用, GenPage.ocx須更新至v1.0.1.4後, 傳送匯出的簽核區域才會寫成符合匯出頁面的座標
// 1060904	Raymond	Raymond	1060766	儲存外部簽核記錄檔時檢查文稿是否可編輯, 不可編輯的文稿不應產生新版本
// 1060918	Raymond	Raymond	-------	分會所加之簽核物件ID為"%msgid%-%id%", 且%id%不與主辦之簽核物件ID連續編, lastid記錄值應排除之
// 1060921	Leslie	Leslie	1060880	修正附件頁面因同檔名+瀏覽器Cache住，造成的附件頁面顯示異常
// 1060922	Raymond	Raymond	1060876	若已有來文簽辦文稿, 新增文稿須插於其前
// 1061003	Raymond	Raymond	1060989	修正從暫存檔讀回的附件頁面無法新增簽核物件的問題
// 1061013	Raymond	Raymond	1060962+1060948 異動撤消後刪除附件會發生錯誤, 須復原到傳送前文稿已匯出的附件頁面的狀態
// 1061016	Raymond	Raymond	1060996	修正來文文件夾參照沒有檔案參照, 以致無法顯示問題
// 1061030	Raymond	Raymond	1061043 修正下載SignWork.xml時改用MSXML2.DOMDocument, 以避免需要設定屬性時IE的Element.setAttribute出現Invalid character錯誤
// 1061109	Raymond	Raymond	1060452 設定簽核意見時同步到顯示中的簽辦意見窗格
// 1061113	Raymond	Raymond	1061068 判斷來文附件頁面是否允許實際上旋轉(影像處理)
// 1061117	Raymond	Raymond	1061118	保留附件包含頁面及簽核物件節點, 以提供未重新匯出附件頁面情形下保留顯示不同流程點所加的簽核物件功能, 並修正附件順序對調, 第2筆的序號未更新問題
// 1070110	Raymond	Raymond	NCKU107067 修正計算檔案數量時加上來文附件的頁數
// 1070112	Raymond	Raymond	1060452	讀取環境變數, 判斷目前使用者是否扮演鐵工局的秘書或直屬長官角色, 下載及寫入秘書簽辦意見檔
// 1070118	Raymond	Raymond	1070009	合併分會流程點的簽核物件時判斷不是簽稿會核單才需計算簽核物件在框內相對位置, 以解決分會會畢退回後, 承辦人開啟公文看不到簽稿會核單上合併後的會辦單位簽核物件問題
// 1070119	Raymond	Raymond	-------	合併分會流程點新增於附件頁面上的簽核物件
// 1070313	Raymond	Raymond	1061277	歷史流程中分會的最後一個流程點合併分會流程點新增於附件頁面上的簽核物件
// 1070315	Raymond	Raymond	1061136	修正在新增文稿、附件頁面後於來文頁面上新增簽核物件等動作可能造成ID重複衍生傳送時產生封裝檔異常的問題
// 1070315	Raymond	Raymond	-------	來文簽辦序號固定為9999, 不要列入計算最後序號, 以免出現後續再新增文稿時會編出序號10000以上的問題
// 1070608	Raymond	Raymond	1070197 分會時新增文稿序號要從ODWDCM.THREAD*10000開始編起, 會辦退回第一個流程點要合併分會單位新增的文稿、附件及電子檔案資訊
// 1071019	Raymond	Raymond	-------	修正兩次分會時, 會合併到第1次分會已刪除的文稿, 造成開啟公文時跳出一個"無法取得未定義或Null參考的屬性length"錯誤的問題
// 1071210	Raymond	Raymond	1071159	搜尋所有流程點文稿的附件上的簽核物件, 並從AOLProcessData.xml恢復圖示flag
// 1080426	Raymond	Raymond	1071206	修正置換附件前頁數比置換附件後多的情況下, 只更新了新附件的頁次資訊, 未刪除舊附件的已匯出頁面, 導致儲存後再開啟時頁數異常問題
// 1080805	Raymond	Raymond	1080593	修正檢核簽核物件超出範圍太遠功能, 若簽核框在頁面右側, 雖簽核物件未超出頁面範圍但已超出簽核框範圍造成誤判, 而不能儲存的問題
// 1080822	Raymond	Raymond	1080706	修正鐵道局局長開啟公文沒有顯示秘書的簽辦意見的問題
// 1080927  Kevin       Eric        1080339     jQuery 3.0 upgrade. ($.type => SSOUtil.typeOf)
// 1081024	Raymond	Raymond	1080877	因匯出頁數與簽核當時瀏覽器(IE)呈現頁數不一致(簽核當時的簽核框在第3頁上半部, 匯出頁面後在第2頁下半部), 導致簽核物件蓋的位置出現差異而被判定成框外未隨匯出頁面時的簽核框位置調整, 補由XSignObjs.xml記錄檔判斷是否原本為框內簽核物件, 若是則加上簽核框資訊以調整其位置
// 1081105	Raymond	Raymond	1081000	修正新增/抽換附件暫存關閉後再開啟會回應「封裝檔未記錄第?個文稿的第?個附件電子檔路徑」的問題
// 1081210	Raymond	Raymond	1080785	合併內政部單號1070656, 新增支援"自訂"簽核區域類型
// 1090115	Raymond	Raymond	1081166	取得文稿原始檔名時, 若有fileName則為儲存時可另存DI被更名的, 優先使用
// 1090205	Raymond	Raymond	1090067	修正來文簽辦頁數被重複計入公文基資的檔案數量的問題
// 1090327	Kevin	Joe		1090230	弱掃修正Client Password In Comment，移除會誤判的註解
// 1090424	Raymond	Raymond	1090305	新增文稿頁次時, 若有傳入第2參數為true時, 不要設定文稿狀態為dirty, 以避免儲存時出現錯誤
// 1090504	Raymond	Raymond	1090313	修正中興大學100年度(前半年)有來文的線上簽核公文封裝檔會封入"分辦"流程點且檔案清單無內容, 導致點擊來文及來文附件會轉圈圈無法顯示的問題
// 1090608	Raymond	Raymond	1090103	修正草稿公文併辦創稿子文, 若目前草稿的msgId與創稿子文的第一個流程點msgId相同, 會發生點擊子文時出現「非草稿公文無文稿」錯誤訊息的問題
// 1090707	Raymond	Raymond	1090463	草稿附件影像改用imgtran.ashx加FilePath參數的URL取得
// 1090710	Raymond	Raymond	1090463	修正草稿附件頁面真旋轉後因Cache不會顯示旋轉後結果頁面的問題
// 1090717	Raymond	Raymond	1090477	修正歷史檢視窗格顯示線上簽核公文時可能有簽核框內(類型A)的簽核物件因所在頁次沒有記錄在AOLProcessData.xml, 而未指定簽核區域類型及ID, 導致不會顯示在所屬簽核區域所在頁次, 與簽核頁面不一致問題
// 1090804	Raymond	Raymond	1090409	修改在載入AOLProcessData.xml後判斷版本若"抄本"屬性為"true", 則將XSignObjs.xml中對應的版本的keepSO屬性與封裝檔中文稿的reserveSO屬性設定為"true", 以支援保留轉抄本頁面之前流程點的保留簽核物件
// 1090831	Raymond	Raymond	1090529	調閱公文若強制"顯示"浮水印, 則將附件或來文頁面合併LOGO影像及日期帳號
// 1090916	Raymond	Raymond	1090564	新增支援信保特殊模式公文相關修改
// 1090929	Raymond	Raymond	1090103	修正紙本公文不需載入封裝檔, 導致列印預覽出現錯誤而無法列印紙本公文的問題
// 1091014	Raymond	Raymond	1090564	新增信保特殊模式公文本文頁面可旋轉
// 1100512  Eric    Eric    1100093 merge: 2020.3.9 - 1081168 Eric, 保留封裝檔內容以處理彙併辦子文封裝!
// 1100512	Raymond	Raymond	1090821	支援外呈外會公文的單層式文稿頁面封裝檔
// 1100512	Raymond	Raymond	1090821	修正草稿公文因無簽核流程參照, 造成儲存時發生錯誤的問題
// 1100519	Raymond	Raymond	1100298	新增取代他流程文字意見屬性
// 1100521	Raymond	Raymond	1090821	修正歷史檢視時, 單層式匯出頁面流程點之前的最後本機關流程點也看得到外機關文稿頁籤的問題
// 1100524	Raymond	Raymond	1100499	修正來文及來文附件上若有貼式意見, 簽核時未呈現圖示而是完整顯示的問題
// 1100526	Raymond	Raymond	1090821	修正外會本機關的公文看不到外機關文稿頁籤的問題
// 1100607	Raymond	Raymond	國教院序37	修正簽稿會核單/會辦單文別的更新文稿的保留簽署意見flag設置條件(1080785+1090409衍生問題), 並修正異動文稿再加完簽核物件後, 先列印再儲存, 外部簽核記錄檔儲存的新版本會沒有剛加的簽核物件的問題(自測)
// 1100615	Raymond	Raymond	1100639	新增若載入SignWork.xml不是目前流程點的, 則嘗試下載文號-00-99目錄下的SignWork_msgId.xml, 以解決異動撤消後, 文稿內文若已被異動, 則因未恢復dirty狀態, 而導致傳送時不會匯出文稿頁面的問題
// 1100616	Raymond	Raymond	1100552	新增依GUID查找文稿物件方法, 從讀入草稿SignWork.xml過程中呼叫, 以修正草稿有3稿件, 刪除第2件再調整稿序後, 文件夾識別碼因mapDrafts先自動命名NewDraft1、NewDraft2, 而與載入SignWork.xml中的NewDraft3、NewDraft1不一致, 造成已匯出附件頁面的附件頁籤未顯示的問題
// 1100623	Raymond	Raymond	1100780	新增一般機關也可套用強制浮水印功能
// 1100708	Raymond	Raymond	1100648	新增支援分文稿記錄簽核意見功能並修正分會流程點不會出現在簽辦意見窗格的問題
// 1100715	Raymond	Raymond	1100854	新增[高大客製化]支援封裝檔讀取及寫出SignWork.xml暫存檔的"產生時間"屬性為包含秒的13碼
// 1100901	Raymond	Raymond	1100750	修正子文無msgId, 不需要嘗試下載文號-00-99目錄下的SignWork_msgId.xml
// 1100913	Raymond	Raymond	1100771	修正簽核物件位於封裝檔頁次(問題案例為3頁)中簽核區域範圍內, 但此簽核區域與外部簽核記錄檔(XSignObjs.xml)中記錄該簽核物件的簽核區域所在頁次不同(問題案例為第2頁), 而出現在錯誤的頁次(問題案例為第3頁)的問題
// 1100917	Raymond	Raymond	1101028	修正簽核物件在封裝檔及AOLProcessData.xml中計算判斷為框外物件, 再依XSignObjs.xml記錄修復為框內物件後, 未中斷迴圈導致此物件在歷史檢視頁面相同位置重複出現2次的問題
// 1100929	Raymond	Raymond	航港局序2	若歷史檢視比簽核頁面少一頁時, 某些簽核物件因剛好位於AOLProccessData.xml所記錄的簽核區域內, 而計算出錯誤的offset, 導致顯示在錯誤的位置, 修正為先檢查XSignObjs.xml中記錄的對應的簽核物件, 有則直接使用這個簽核物件的offset及saType, saID
// 1101015	Raymond	Raymond	1101140	新增時間戳記, 提供給getPageImage的回傳影像URL使用, 以避免(真)旋轉後的附件頁面影像, 在關閉公文後再開啟, 由於URL未加上「&rotate=幾度」而顯示成前一次開啟時cache的未旋轉的影像的問題
// 1101124	Raymond	Raymond	1101321	修正鐵道局秘書的直屬長官看不到秘書的簽辦意見檔的問題
// 1101130	Raymond	Raymond	1101208	修正國教院調閱一代公文若有"簡簽", 會因一代的簡簽樣版未設簽核區域代碼而導致不會顯示簽核物件的問題
// 1101207	Raymond	Raymond	1101348	修正當第一、二個簽核點定義是分文後直接來文簽辦而沒有擬文稿時, 來文簽辦文稿、附件頁面、簽核物件ID未計入導致新增文稿、附件頁面、物件等動作可能造成ID重複衍生傳送時產生封裝檔異常的問題
// 1110105	Raymond	Raymond	1101108	修正外部簽核記錄檔(XSignObjs.xml)中有不存在封裝檔但ID卻存在封裝檔(指向文稿或文稿頁面)的簽核物件時, 載入公文後會出現傳送、儲存等工具列按鈕未顯示的問題
// 1110106	Raymond	Raymond	1101423	修正「轉線上」(EDT213)後的公文, 開啟儲存後文稿管理檔仍殘留轉線上之前新增的舊文稿(簽核頁面看不到但發文登錄會列出)的問題
// 1110207	Raymond	Raymond	1110013	修正列印簽核物件頁時, 姓名後不顯示帳號
// 1110301	Raymond	Raymond	1110106	合併1080815, 允許新增不匯出附件頁面的格式附件
// 1110429	Raymond	Raymond	1110447	修正若新增簽核物件後再刪除稿件後傳送, 會造成下個流程點儲存XSignObjs.xml時因為簽核物件(ref)不存在而在這裡發生Error, 不能傳送的問題
// 1110621	Raymond	Raymond	1110579	異動撤消或傳送失敗的流程點留下在封裝檔中的簽核物件另外存放在_forbiddenSignObjs, 以供從文號-00-99子目錄中的SignWork_msgID.xml還原時使用
// 1111017	Raymond	Raymond	1111121	新增判斷是否為內會, 若是的話, 在加簽工作檔中標記"內會公文=1"
// 1111025	Raymond	Raymond	1110864	合併1101464、1101468, 新增XSignObjs.xml記錄簽核點簽核人員, 代理公文時再多記錄被代理人資訊及隱藏簽辦意見資訊(顯示我的最終意見)功能
// 1111117	Raymond	Raymond	1111069	取消從Cache載入簽核工作檔, 以避免不明步驟造成載入不同筆公文的文稿取代目前公文的文稿的問題
// 1120224	Raymond	Raymond	1111225	新增內部意見存取及記錄功能, 儲存於XSignObjs.xml中的<內部意見>新子節點下
// 1120920	Raymond	Raymond	1120750	SignWork.xml的簽核人員節點下新增寫入機關、全銜及機關代碼欄位, 以避免組改後封裝檔中簽核人員的機關代碼仍是舊的的問題(原封裝檔中的機關代碼是在封裝時由元件另外寫入的,元件也應改為從SignWork.xml中讀取)
// 1121005	Raymond	Raymond	1111194	修正順會待核示或分會待核示資料夾下的線上簽核公文, 長官修改受會單位承辦人所新增的文稿內文後傳送, 會設定錯誤子目錄的文稿原始檔路徑, 導致匯出頁面不是長官修改後內容的問題
// 1130125	Raymond	Raymond	1120887	新增支援會辦單位修改簽稿會核單的簽辦意見內容功能及分會合併配合修正項目
// 1130705	Raymond	Raymond	中榮序139	刪除文字意見或選用章戳物件時, 檢核若本流程點已無其它文字意見或選用章戳時, 清空簽辦意見, 尚有其它文字意見或選用章戳時, 則依ID的由小至大順序(即加入順序)合併後重設為目前的簽辦意見
// 1130710	Raymond	Raymond	1130637	檢核若欲刪除的簽核物件無sessionNew屬性, 則表示此簽核物件已儲存上傳過, 需標記為簽核物件已異動狀態
// 1130802	Raymond	Raymond	中榮序164	修正會畢退回後當非最後的其中一個分會流程點未異動簽稿會核單時, 由於文稿檔檔名會沿用主辦單位的"000X.OO", 是沒有"數字_"開頭的檔名, 導致不符原先判定分會單位異動主辦單位的簽稿會核單的條件而誤判為分會單位所新增的文稿, 造成出現兩個簽稿會核單的問題
// 1130826	Raymond	Raymond	中榮序214	修正歷史檢視時, 保留顯示的簽核物件沒有從舊到新排序, 導致需要重疊顯示(ex.貼布)的物件未遮住下面物件的問題
// 1130830	Raymond	Raymond	中榮序218	載入XSignObjs.xml時, 異動過的文稿版本, 改移至暫存而不是直接刪除, 在載入SignWork.xml後, 判斷Updates中有此文稿ID再恢復, 以避免第二筆文稿未點開的情況下自動備份, 不會寫出ID有X的版本, 但SignWork.xml中Updates有此ID的異動文稿, 若不正常關閉系統再用自動備份復原的話, 會導致傳送時發生-731問題
// 1130903	Raymond	Raymond	中榮序181	修正XSignObjs.xml在分會流程點異動簽稿會核單後會畢退回, 分會合併流程點會寫入第一個版本中的簽核區域的pg-index為undefined的問題
// 1130909	Raymond	Raymond	中榮序233	修正創稿時加入文字意見,再刪除,簽辦意見不會清空的問題
// 1130913	Raymond	Raymond	中榮序188	新增判斷簽稿會核單允許保留顯示簽核物件時, 重新計算簽稿會核單的TypeB簽核物件是否位在簽核區域內, 以避免簽稿會核單異動後位於簽核區域內的TypeB簽核物件不會顯示的問題, 修正歷史檢視時, 分會流程點因合併前一個匯出簽稿會核單的版本非同單位時, 簽核區域非前一單位增高後高度, 導致此分會流程點顯示前一單位的簽核物件會顯得異常的問題, 修正為在此分會流程點不要顯示前一版本的分會單位的簽核物件, 只顯示此分會流程點同一分會單位的簽核物件, 由於簽核物件是否顯示的邏輯與既有不同, 新增環境變數「AOL_HISTORYVIEW_NO_MERGE_CON」來啟用這項修正, 有提供允許分會單位異動主辦的簽稿會核單功能(自動增高)的機關, 要設為"Y"
// 1130927	Raymond	Raymond	中榮序237	新增記錄文字意見的原始文字內容(未切字)到外部簽核記錄檔, 以供會辦單位長官「修改」承辦人文字意見時, 修改的是未切字的原始文字內容, 以避免增刪字會出現不正確斷行的問題
// 1131017	Raymond	Raymond	1130940	修正異動撤消回分文後第一個流程點, 職名章會變成別人的職名章的問題
// 1131204	Raymond	Raymond	北榮序412	修正歷史檢視最後一個分會流程點會出現別的分會單位的簽核物件的問題
// 1131211	Raymond	Raymond	1131110	修正某些99年版封裝檔的<簽核點定義>下的<簽核文件夾>的<檔案清單>中沒有<來文文件夾>下的<電子來文>、<頁面>的"原始檔序號"的<電子檔資訊>, 導致點擊來文頁籤時會轉圈圈的問題, 及新增檢核封裝檔是否有不支援的結構、標籤, 有則顯示不支援的錯誤訊息
// 1140206	Raymond	Raymond	1131137	合併CDC1110401, 外部簽核物件記錄檔的簽核物件新增記錄分機屬性
// 1140324	Raymond	Raymond	1131303	主動觸發input事件以同步錯別字校正標示層功能
// 1141015	Raymond	Raymond	1141129	使用currSignComment設定簽核意見時, 同步觸發TEXTAREA的input事件時, 多傳入hideBtn:true物件參數, 以避免顯示「確定」、「取消」鈕
// 1141217	Leslie	Leslie	國合序451	修正因單號[1141255]改動附件匯出頁面的儲存流程，而影響的頁面轉向問題
// 1141218	Raymond	Raymond	北榮序453	當因為自動增高簽核區域而異動內文時, 要能儲存外部簽核記錄檔
// 1141229	Raymond	Raymond	1141693	新增判斷cachedDM.dirty(), 以避免因排版因素導致的簽核畫面頁數與封裝檔不一致時, 誤判為內文有異動, 而需要使用者加簽傳送的問題

function SignFolder() {

	// private members
	var _fm;				// 1070612 Raymond 1070547 新增fm
	var _fileIOUrl;
	var _dirPath;
	var _docObj;			// 2016.8.11 新增docObj
	var _ecaps;
	var _flows = {};
	var _revs = {};
	var _objids = {};
	var _lastid = 0;
	var _lastdraftsn = -1;	// 2016.7.18 文稿序號, 2016.11.25 修正為-1, 因為創稿第1筆的文稿序號必須是0
	var _pages = [];
	var _currRev = "";
	var _signComment = "";  // 2013.9.14 - Raymond, 對應簽核意見
	//var _cachedLastSol;
	var _xSignFolder = new XSignFolder();	// 2017.1.11 新增外部記錄的簽核物件記錄檔
	var _forbiddenSignDef = null;		// 1061012 Raymond 1060962+1060948+1060989 異動撤消後刪除附件會發生錯誤, 須復原到傳送前文稿已匯出的附件頁面的狀態, 故另存在Forbidden簽核點定義
	var _secretaryOwnOUId = "",			// 1070112 Raymond 1060452 鐵工局的秘書單位代碼
		_secretaryOwnRoleId = "",		// 1070112 Raymond 1060452 鐵工局的秘書角色代碼
		_supervisorOwnOUId = "",		// 1070112 Raymond 1060452 鐵工局的秘書的直屬長官單位代碼
		_supervisorOwnRoleId = "";		// 1070112 Raymond 1060452 鐵工局的秘書的直屬長官角色代碼
	var _isSecretary = false,			// 1070112 Raymond 1060452 鐵工局的秘書
		_isSupervisor = false;			// 1070112 Raymond 1060452 鐵工局的秘書的直屬長官
	var _secretarySignCommentDoc = null;// 1070112 Raymond 1060452 鐵工局的秘書外部簽辦意見
	var _hasSingleLayerDraft = false;	// 1100512 Raymond 1090821 封裝檔是否記錄有單層式文稿頁面
	var _t = (new Date()).getTime();	// 1101015 Raymond 1101140 新增時間戳記, 提供給getPageImage的回傳影像URL使用, 以避免(真)旋轉後的附件頁面影像, 在關閉公文後再開啟, 由於URL未加上「&rotate=幾度」而顯示成前一次開啟時cache的未旋轉的影像的問題
	// 1110301 Raymond 1110106 合併1080815, 新增允許新增不匯出附件頁面的附件格式
	var allowRawAttFmt = ("WE_ALLOW_RAW_ATTACH_FMT" in theSSO.User.SystemSets)?theSSO.User.SystemSets["WE_ALLOW_RAW_ATTACH_FMT"]:"";
	var _forbiddenSignObjs = [];		// 1110617 Raymond 1110579 異動撤消後從文號-00-99子目錄中的SignWork_msgID.xml復原的職名章, 有可能會因為撤消的流程點包含別人已加蓋職傳送的流程, 導致NewSignObj0001.png已是別人的職章, 故另新增記錄留在封裝檔內但應刪除的流程點當時傳送的職章圖檔資訊
	var _innerComment = "";				// 1120221 Raymond 1111225 新增內部意見
	
	function _matchSecretaryRole(ou, role) {	// 1070112 Raymond 1060452 判斷是否符合鐵工局的秘書單位角色
		var a = _secretaryOwnOUId.split(","),
			b = _secretaryOwnRoleId.split(",");
		if(a.indexOf(ou) >= 0 && b.indexOf(role) >= 0)
			return true;
		return false;
	}
	function _matchSupervisorRole(ou, role) {	// 1070112 Raymond 1060452 判斷是否符合鐵工局的秘書直屬長官單位角色
		var a = _supervisorOwnOUId.split(","),
			b = _supervisorOwnRoleId.split(",");
		if(a.indexOf(ou) >= 0 && b.indexOf(role) >= 0)
			return true;
		return false;
	}
	function _getSecretarySignComment(flowId) {	// 1070112 Raymond 1060452 從秘書簽辦意見檔中找出指定流程點(其它秘書)的簽辦意見
		if(!!_secretarySignCommentDoc) {
			var $res = $(_secretarySignCommentDoc.documentElement).find("SignComment[id='" + flowId + "']");
			if($res.length > 0)
				return $res.eq(0).text();
		}
		return null;
	}
	
	function _isDupXSignObj(param) {	// 檢核簽核物件是否有重複ID的情形
		return _xSignFolder.isDupXSignObj(param);
	}

	// private methods
	function getElemText(xmlNode, tagName) {
		var nl = xmlNode.getElementsByTagName(tagName);
		if(nl != undefined && nl.length > 0) {
			if(nl[0].childNodes.length > 0)
				return nl[0].childNodes[0].nodeValue;
			return "";
		}
		return undefined;
	}
	
	function getFileInfo(files, sn) {
		for(var i=0; i<files.length; i++) {
			if(files[i].fileSN == sn) {
				return files[i];
			}
		}
		return null;
	}
	
	// 1131211 Raymond 1131110 修正某些99年版封裝檔的<簽核點定義>下的<簽核文件夾>的<檔案清單>中沒有<來文文件夾>下的<電子來文>、<頁面>的"原始檔序號"的<電子檔資訊>, 導致點擊來文頁籤時會轉圈圈的問題
	function getOtherSignDefFileInfo(signDefs, sn) {
		for(var i=0; i<signDefs.length; i++) {
			if(!!signDefs[i].obj.signInfo.files) {
				for(var j=0; j<signDefs[i].obj.signInfo.files.length; j++) {
					if(signDefs[i].obj.signInfo.files[j].fileSN == sn) {
						console.log("在簽核點定義'" + signDefs[i].id + "'下找到原始檔序號'" + sn + "'的電子檔資訊");
						return signDefs[i].obj.signInfo.files[j];
					}
				}
			}
		}
		theLogger.error("在所有簽核點定義中都找不到原始檔序號'" + sn + "'的電子檔資訊");
		return null;
	}
	
	// 產生時間以yyymmddhhmm字串回傳
	function getCreateTime() {
		var t = new Date();
		// 1100715 Raymond 1100854 新增[高大客製化]簽核物件的產生時間顯示到秒功能
		if(theUserInfo.OrgNickName == "NUK")
			return (t.getYear() - 11) + Util.padLeft(t.getMonth() + 1, 2) + Util.padLeft(t.getDate(), 2) + Util.padLeft(t.getHours(), 2) + Util.padLeft(t.getMinutes(), 2) + Util.padLeft(t.getSeconds(), 2);
		return (t.getYear() - 11) + Util.padLeft(t.getMonth() + 1, 2) + Util.padLeft(t.getDate(), 2) + Util.padLeft(t.getHours(), 2) + Util.padLeft(t.getMinutes(), 2);
	}
	
	// 2016.11.24 合併分會流程點簽核物件
	function _mergeDispatchFlow(page, flid) {
		for(var i=0; i<flid.length; i++) {
			theLogger.log("合併分會流程點'" + flid[i] + "'的簽核物件到頁面" + page.id);
			for(var j=0; j<this.capsCntn.eFile.aol.aolInfo.signDefs.length; j++) {
				var signDef = this.capsCntn.eFile.aol.aolInfo.signDefs[j];
				var flowId = signDef.uri.replace(/^#/, '');
				if(flid[i] == flowId) {
					for(var k=0; k<signDef.obj.signInfo.drafts.length; k++) {
						var draft = signDef.obj.signInfo.drafts[k];
						for(var l=0; l<draft.draftPages.pages.length; l++) {
							var pg = draft.draftPages.pages[l];
							if(pg.id == page.id) {
								theLogger.log("合併簽核物件" + pg.signObjs.length);
								for(var x=0; x<pg.signObjs.length; x++) {
									theLogger.log(pg.signObjs[x]);
									if("signObjs" in page) {
										var dup = false;
										for(var y=0; y<page.signObjs.length; y++) {
											if(page.signObjs[y].id == pg.signObjs[x].id) {
												dup = true;
												break;
											}
										}
										if(!dup) {
											theLogger.log("加入簽核物件ID:" + pg.signObjs[x].id);
											page.signObjs.push(pg.signObjs[x]);
										}
										else
											theLogger.log("簽核物件ID:" + pg.signObjs[x].id + "重複!");
									}
								}
							}
						}
					}
				}
			}
		}
	}
	function isDispatchSignDefExists(disp) {
		for(var i=0; i<disp.flows.length; i++) {
			for(var j=0; j<this.capsCntn.eFile.aol.aolInfo.signDefs.length; j++) {
				var flowId = this.capsCntn.eFile.aol.aolInfo.signDefs[j].uri.replace(/^#/, '');
				if(flowId == disp.flows[i].id) {
					theLogger.log("簽核點定義(flowId:" + flowId + ")存在");
					return true;
				}
			}
			theLogger.warn("簽核點定義(flowId:" + disp.flows[i].id + ")不存在!");
		}
		return false;
	}
	
	// 1070119 Raymond 合併分會流程點在新增於附件頁面上的簽核物件
	function _mergeDispatchFlowAtt(page, flid) {
		for(var i=0; i<flid.length; i++) {
			theLogger.log("合併分會流程點'" + flid[i] + "'附件頁面上的簽核物件到頁面" + page.id);
			for(var j=0; j<this.capsCntn.eFile.aol.aolInfo.signDefs.length; j++) {
				var signDef = this.capsCntn.eFile.aol.aolInfo.signDefs[j];
				var flowId = signDef.uri.replace(/^#/, '');
				if(flid[i] == flowId) {
					for(var k=0; k<signDef.obj.signInfo.drafts.length; k++) {
						var draft = signDef.obj.signInfo.drafts[k];
						if("attachs" in draft) {
							for(var l=0; l<draft.attachs.length; l++) {
								var att = draft.attachs[l];
								if("draftPages" in att) {
									for(var m=0; m<att.draftPages.pages.length; m++) {
										var pg = att.draftPages.pages[m];
										if(pg.id == page.id) {
											theLogger.log("合併簽核物件" + pg.signObjs.length);
											for(var x=0; x<pg.signObjs.length; x++) {
												theLogger.log(pg.signObjs[x]);
												if("signObjs" in page) {
													var dup = false;
													for(var y=0; y<page.signObjs.length; y++) {
														if(page.signObjs[y].id == pg.signObjs[x].id) {
															dup = true;
															break;
														}
													}
													if(!dup) {
														theLogger.log("加入簽核物件ID:" + pg.signObjs[x].id);
														page.signObjs.push(pg.signObjs[x]);
													}
													else
														theLogger.log("簽核物件ID:" + pg.signObjs[x].id + "重複!");
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	
	// 1070608 Raymond 1070197 合併分會流程點新增的文稿
	function _mergeDispatchNewDrafts(sd, flid) {
		for(var i=0; i<flid.length; i++) {
			theLogger.log("合併分會流程點'" + flid[i] + "'的新增文稿到流程點" + sd.id);
			for(var j=0; j<this.capsCntn.eFile.aol.aolInfo.signDefs.length; j++) {
				var signDef = this.capsCntn.eFile.aol.aolInfo.signDefs[j];
				var flowId = signDef.uri.replace(/^#/, '');
				if(flid[i] == flowId) {
					// 1071019 Raymond 修正兩次分會時, 會合併到第1次分會已刪除的文稿的問題
					if(signDef.refFlow.dispatchNode.parentFlow != sd.refFlow.dispatchNode.parentFlow) {
						theLogger.warn(flid[i] + "的簽核流程(ID:" + signDef.refFlow.dispatchNode.parentFlow.id + ")與此分會流程點的簽核流程(ID:" + sd.refFlow.dispatchNode.parentFlow.id + ")不一致, 忽略合併其文稿");
						continue;
					}
					for(var k=0; k<signDef.obj.signInfo.drafts.length; k++) {
						var draft = signDef.obj.signInfo.drafts[k];
						
						// 檢查非既有的文稿才新增
						var bExisted = false;
						for(var x=0; x<sd.obj.signInfo.drafts.length; x++) {
							if(sd.obj.signInfo.drafts[x].id == draft.id) {	// duplicated drafts
								bExisted = true;	// 既有的文稿
								break;
							}
						}
						// 1130122 Raymond 1120887 判斷若是分會流程點異動的是主辦子目錄的文稿時, 不要新增
						if(!bExisted) {
							let df = draft.getFileName();
							if(!!df && df.match(/\d{10}\-00\-99\\\d+_\d+\-\d{4}.\w+/)) {
								theLogger.log("分會異動的文稿'" + df + "'位於主辦子目錄下, 不要合併(新增)此文稿\n");
								continue;
							}
							// 1130802 Raymond 中榮序164 修正當非最後的其中一個分會流程點未異動簽稿會核單時, 由於文稿檔檔名會沿用主辦單位的"000X.OO", 是沒有"數字_"開頭的檔名, 導致不符上面條件而誤判為分會單位所新增的文稿, 造成出現兩個簽稿會核單的問題
							else if(!!df && df.match(/\d{10}\-00\-99\\\d{4}.\w+/)) {
								theLogger.log("分會未異動主辦子目錄下的文稿'" + df + "'(" + draft.name + "), 不要合併(新增)此文稿\n");
								continue;
							}
						}
						
						if(!bExisted) {
							theLogger.log("新增分會點新增的文稿(ID:" + draft.id + ")");
							sd.obj.signInfo.drafts.push(draft);
							
							// 1070509 Raymond 1070197 合併電子檔案資訊
							var fils = [draft.fileSN];
							for(var x=0; x<draft.draftPages.pages.length; x++) {
								var fsn = draft.draftPages.pages[x].fileSN;
								fils.push(fsn);
								for(var y=0; y<draft.draftPages.pages[x].signObjs.length; y++) {
									if("fileRef" in draft.draftPages.pages[x].signObjs[y] && "fileSN" in draft.draftPages.pages[x].signObjs[y].fileRef) {
										fsn = draft.draftPages.pages[x].signObjs[y].fileRef.fileSN;
										fils.push(fsn);
									}
								}
							}
							if("attachs" in draft) {
								for(var x=0; x<draft.attachs.length; x++) {
									if("fileSN" in draft.attachs[x]) {
										var fsn = draft.attachs[x].fileSN;
										fils.push(fsn);
									}
									if("draftPages" in draft.attachs[x] && "pages" in draft.attachs[x].draftPages) {
										for(var y=0; y<draft.attachs[x].draftPages.pages.length; y++) {
											var fsn = draft.attachs[x].draftPages.pages[y].fileSN;
											fils.push(fsn);
											for(var z=0; z<draft.attachs[x].draftPages.pages[y].signObjs.length; z++) {
												if("fileRef" in draft.attachs[x].draftPages.pages[y].signObjs[z] && "fileSN" in draft.attachs[x].draftPages.pages[y].signObjs[z].fileRef) {
													fsn = draft.attachs[x].draftPages.pages[y].signObjs[z].fileRef.fileSN;
													fils.push(fsn);
												}
											}
										}
									}
								}
							}
							theLogger.log("應保留以下檔案至合併分會文稿的流程點...");
							theLogger.log(fils);
							for(var x=0; x<fils.length; x++) {
								for(var y=0; y<signDef.obj.signInfo.files.length; y++) {
									if(fils[x] == signDef.obj.signInfo.files[y].fileSN) {
										var dup = false;
										for(var z=0; z<sd.obj.signInfo.files.length; z++) {
											if(sd.obj.signInfo.files[z].fileSN == fils[x]) {
												theLogger.log("原始檔序號" + fils[x] + "已存在");
												dup = true;
												break;
											}
										}
										if(!dup) {
											theLogger.log("加入電子檔案資訊" + fils[x]);
											sd.obj.signInfo.files.push(signDef.obj.signInfo.files[y]);
										}
										break;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	
	function ECaps(xmlDoc) {
		if(xmlDoc.documentElement.nodeName == "電子封裝檔") {
			// 1131211 Raymond 1131110 新增判斷封裝檔是否為不支援的版本
			try {
			this.capsCntn = new CapsContent(xmlDoc.documentElement.getElementsByTagName("封裝檔內容")[0]);
			}
			catch(e) {
				console.error(e.stack || e.message);
				let invalidTags = xmlDoc.evaluate("/*//*[name() = '文稿原始檔清單' or name() = '簽核文件夾異動內容']", xmlDoc, null, 7, null);
				let hasInvalidTags = invalidTags.snapshotLength > 0;
				throw new Error("載入封裝檔(DOCTYPE為'" + xmlDoc.doctype.systemId + "')時檢核到不支援的結構" + ((hasInvalidTags)?"與標籤":"") + "，線上簽核子系統僅支援99年版(含)以後之封裝檔格式。");
			}
			
			$.each(this.capsCntn.eFile.aol.aolFlow.flows, function(i, flow) {
				if(flow.id in _flows)
					theLogger.warn("簽核流程ID'" + flow.id + "'重複!");
				else {
					_flows[flow.id] = flow;
					// 2016.11.24 新增分會流程
					if("dispatch" in flow) {
						$.each(flow.dispatch, function(j, disp) {
							$.each(disp.flows, function(k, childFlow) {
								if(childFlow.id in _flows)
									theLogger.warn("分會流程ID'" + childFlow.id + "'重複!");
								else
									_flows[childFlow.id] = childFlow;
							});
						});
					}
				}
			});
			
			var fromFolders = {};   // 2014.2.18 - Raymond, 暫存來文文件夾供參照路徑反查
			
			// 2016.7.13 創稿公文無任何簽核點定義
			if(this.capsCntn.eFile.aol.aolInfo.signDefs.length == 0) {
				theLogger.log("封裝檔無任何簽核點定義, 新增一個Dummy");
				//_currRev = theAOL.docObj.ICUserId + "_" + theAOL.docObj.msgId;
				_currRev = _docObj.ICUserId + "_" + _docObj.msgId;	// 1090608 Raymond 1090103 對此封裝檔而言當前docObj應為_docObj而非theAOL.docObj
				_revs[_currRev] = {
					id: _currRev,						// 簽核點定義ID
					uri: "",							// 
					signature: "",						// 
					obj: {
						id: "",							// 
						changeInfo: {					// 異動資訊
							charger: {					// 簽核人員
								ou: "",					// 單位
								title: "",				// 職稱
								name: "",				// 姓名
								userId: "",				// 帳號
								role: ""				// 角色
							},
							type: "",					// 異動別
							comment: "",				// 簽核意見
							timeStamp: "",				// 簽章時間
							nextChargers: []			// 次位簽核人員
						},
						signInfo: {						// 簽核資訊(簽核文件夾)
							id: "",						// 
							time: "",					// 產生時間
							drafts: [],					// 簽核文稿清單
							files: []					// 檔案清單
						}
					}
				};
			}
			
			var lastDef = this.capsCntn.eFile.aol.aolInfo.signDefs.length - 1;
			var that = this;	// 2016.11.24 新增that變數, _mergeDispatchFlow要用
			var dd_flid = [];	// 1070608 Raymond 1070197 應合併文稿的分會流程點ID
			$.each(this.capsCntn.eFile.aol.aolInfo.signDefs, function(i, signDef) {
						
				if(signDef.id in _revs)
					theLogger.warn("簽核點定義ID'" + signDef.id + "'重複!");
				else {
					_revs[signDef.id] = signDef;
					
					var flid = [];	// 2016.11.24 應合併簽核物件的分會流程點ID
					
					var flowId = signDef.uri.replace(/^#/, '');
					if(flowId in _flows) {
						signDef.refFlow = _flows[flowId];   // 簽核點定義參照簽核流程
						
						_flows[flowId].refChangeInfo = signDef.obj.changeInfo;  // 簽核流程參照異動資訊
						// 1100708 Raymond 1100648 修正分會流程點不會顯示在簽辦意見窗格的問題
						for(var j=0; j<that.capsCntn.eFile.aol.aolFlow.flows.length; j++) {
							if(that.capsCntn.eFile.aol.aolFlow.flows[j].id == flowId) {
								that.capsCntn.eFile.aol.aolFlow.flows[j].refChangeInfo = signDef.obj.changeInfo;
								break;
							}
						}
						// 1100706 Raymond 1100648 新增簽核流程參照簽核資訊, 以提供分文稿記錄簽核意見功能
						if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
							_flows[flowId].refSignInfo = signDef.obj.signInfo;
							// 1100708 Raymond 1100648 修正分會流程點不會顯示在簽辦意見窗格的問題
							for(var j=0; j<that.capsCntn.eFile.aol.aolFlow.flows.length; j++) {
								if(that.capsCntn.eFile.aol.aolFlow.flows[j].id == flowId) {
									that.capsCntn.eFile.aol.aolFlow.flows[j].refSignInfo = signDef.obj.signInfo;
									break;
								}
							}
						}
						
						// 2016.11.24 此流程是分會流程
						if("dispatchNode" in signDef.refFlow) {
							try {
								if(signDef.refFlow.dispatchNode.flows[signDef.refFlow.dispatchNode.flows.length-1] == signDef.refFlow) {	// 此流程是分會點最後流程
									if(signDef.refFlow.dispatchNode.parentFlow.dispatch[signDef.refFlow.dispatchNode.parentFlow.dispatch.length-1] == signDef.refFlow.dispatchNode) {	// 且此分會點是分會流程的最後一個分會點
										for(var x=0; x<signDef.refFlow.dispatchNode.parentFlow.dispatch.length; x++) {
											var disp = signDef.refFlow.dispatchNode.parentFlow.dispatch[x];
											for(var y=0; y<disp.flows.length; y++) {
												if(disp.flows[y].id != signDef.refFlow.id)
													flid.push(disp.flows[y].id);
											}
										}
										theLogger.log(signDef.refFlow.id + "應合併以下分會流程點的簽核物件...");
										theLogger.log(flid);
									}
									// 2016.11.25 新增分會中途退回, 分辦退回時無流程點定義的情況
									else if(signDef.refFlow.dispatchNode.parentFlow.dispatch.length > 1 &&
										signDef.refFlow.dispatchNode.parentFlow.dispatch[signDef.refFlow.dispatchNode.parentFlow.dispatch.length-2] == signDef.refFlow.dispatchNode &&
										!isDispatchSignDefExists.call(that, signDef.refFlow.dispatchNode.parentFlow.dispatch[signDef.refFlow.dispatchNode.parentFlow.dispatch.length-1])) {
										theLogger.warn("此簽核點屬於分會流程的倒數第2個分會點, 但最後一個分會點沒有簽核點定義, 故此簽核點視為最後一個分會流程點");
										for(var x=0; x<signDef.refFlow.dispatchNode.parentFlow.dispatch.length; x++) {
											var disp = signDef.refFlow.dispatchNode.parentFlow.dispatch[x];
											for(var y=0; y<disp.flows.length; y++) {
												if(disp.flows[y].id != signDef.refFlow.id)
													flid.push(disp.flows[y].id);
											}
										}
										theLogger.log(signDef.refFlow.id + "應合併以下分會流程點的簽核物件...");
										theLogger.log(flid);
									}
									else {	// 1070608 Raymond 1070197 應合併各分會點最後一站新增的文稿
										dd_flid.push(signDef.refFlow.id);
									}
								}
							}
							catch(e) {
								theLogger.error(e.stack);
							}
						}
					}
					else
						theLogger.warn("找不到簽核流程ID'" + flowId + "'");
				
					if(i == lastDef) {  // 最後一個簽核點定義
						
						_currRev = signDef.id;
						
						var d = flowId.search(/\d/);
						//if(d > 0 && flowId.substring(d) == theAOL.docObj.msgId) // 2014.1.16 - Raymond, 最後流程點ID=當前MsgID才是新流程點的簽核意見, 否則應為空
						if(d > 0 && flowId.substring(d) == _docObj.msgId) // 1090608 Raymond 1090103 對此封裝檔而言當前MsgID應為_docObj.msgId而非theAOL.docObj.msgId
							_signComment = signDef.obj.changeInfo.comment;  // 2013.9.14 - Raymond, 讀出簽核意見
						
						$.each(signDef.obj.signInfo.drafts, function(idx, draft) {
							
							draft.fileRef = getFileInfo(signDef.obj.signInfo.files, draft.fileSN);// 文稿參照檔案
							
							// 1100706 Raymond 1100648 新增支援複數筆簽核意見功能
							if(!!signDef.obj.changeInfo.comments && signDef.obj.changeInfo.comments.length > 0) {
								for(var j=0; j<signDef.obj.changeInfo.comments.length; j++) {
									if(signDef.obj.changeInfo.comments[j].uri == draft.fileSN) {	// 比對原始檔序號相符則此簽核意見即為此文稿的
										draft.signComment = signDef.obj.changeInfo.comments[j].content;
										break;
									}
								}
							}
							else if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {	// 啟用分文稿記錄簽核意見功能但封裝檔是舊的沒分, 一律設為第一筆文稿的
								if(idx == 0 && draft.name != "來文簽辦")
									draft.signComment = signDef.obj.changeInfo.comment;
							}
							
							var isFromDraft = false;	// 1101207 Raymond 1101348 新增判斷是否為"來文簽辦"文稿
							if(draft.id in _objids) {
								theLogger.warn("文稿ID'" + draft.id + "'重複!");
								// 1101207 Raymond 1101348 修正當第一、二個簽核點定義是分文後直接來文簽辦而沒有擬文稿時, 來文簽辦文稿、附件頁面、簽核物件ID未計入導致新增文稿、附件頁面、物件等動作可能造成ID重複衍生傳送時產生封裝檔異常的問題
								if(draft.name == "來文簽辦") {
									isFromDraft = true;
									_lastid = Math.max(_lastid, Number(draft.id));
								}
							}
							// 1100512 Raymond 1090821 外會封裝檔的本文可能沒"文件夾識別碼"?
							else if(!draft.id) {
								draft.id = ++_lastid;
								_objids[draft.id] = draft;
							}
							else {
								_objids[draft.id] = draft;
								// 1070608 Raymond 1070197 分會單位新增的文稿ID為%msgid%-%sn%, 比對ID大小要去掉%msgid%部分
								if(typeof draft.id === "string" && draft.id.indexOf("-") > 0)
									_lastid = Math.max(_lastid, Number(draft.id.substr(draft.id.indexOf("-") + 1)));
								else
									_lastid = Math.max(_lastid, Number(draft.id));
							}
	
							// 1100512 Raymond 1090821 外會封裝檔的本文可能沒"文稿頁面檔"或"頁面"
							if(!!draft.draftPages && !!draft.draftPages.pages) {
								// 1100512 Raymond 1090821 先註記為含文稿頁面, 供載入封裝檔完成後判斷流程點是否為外機關流程點
								if(signDef.noDraftPages == true)
									theLogger.error("同一流程點多稿不應部分文稿有頁面, 部分文稿無頁面");
								signDef.noDraftPages = false;
								if(draft.draftPages.method == "單層式") {
									_hasSingleLayerDraft = true;		// 註記本封裝檔有單層式文稿頁面
									signDef.hasSingleLayerDraft = true;	// 註記本簽核點定義有單層式文稿頁面
								}
							$.each(draft.draftPages.pages, function(j, page) {
								
								page.fileRef = getFileInfo(signDef.obj.signInfo.files, page.fileSN);// (文稿)頁面參照檔案
								page.po = j;    // (文稿)頁面頁次
								
								if(page.id in _objids) {
									theLogger.warn("頁面ID'" + page.id + "'重複!");
									// 1101207 Raymond 1101348 修正當第一、二個簽核點定義是分文後直接來文簽辦而沒有擬文稿時, 來文簽辦文稿、附件頁面、簽核物件ID未計入導致新增文稿、附件頁面、物件等動作可能造成ID重複衍生傳送時產生封裝檔異常的問題
									if(isFromDraft)
										_lastid = Math.max(_lastid, Number(page.id));
									
									// 1131204 Raymond 北榮序412 修正歷史檢視最後一個分會流程點會出現別的分會單位的簽核物件的問題
									//if(flid.length) {	// 2016.11.24 合併分會流程點簽核物件
									if(flid.length && !_fm.isRefDoc()) {	// 2016.11.25 合併分會流程點簽核物件
										_mergeDispatchFlow.call(that, page, flid);
									}
								}
								// 1100512 Raymond 1090821 外會封裝檔的本文頁面(單層式)可能沒"文件夾識別碼"?
								else if(!page.id) {
									page.id = ++_lastid;
									_objids[page.id] = page;
								}
								else {
									theLogger.warn("頁面ID'" + page.id + "'新增!");
									_objids[page.id] = page;
									// 1070608 Raymond 1070197 分會單位新增的文稿頁面ID為%msgid%-%sn%, 比對ID大小要去掉%msgid%部分
									if(typeof page.id === "string" && page.id.indexOf("-") > 0)
										_lastid = Math.max(_lastid, Number(page.id.substr(page.id.indexOf("-") + 1)));
									else
										_lastid = Math.max(_lastid, Number(page.id));
									_pages.push(page);
									
									// 1131204 Raymond 北榮序412 修正歷史檢視最後一個分會流程點會出現別的分會單位的簽核物件的問題
									//if(flid.length) {	// 2016.11.25 合併分會流程點簽核物件
									if(flid.length && !_fm.isRefDoc()) {	// 2016.11.25 合併分會流程點簽核物件
										_mergeDispatchFlow.call(that, page, flid);
									}
								}
							});
							}
							else {	// 1100512 Raymond 1090821 不含單層式文稿頁面的可能是外機關流程點
								if(signDef.noDraftPages == false)
									theLogger.error("同一流程點多稿不應部分文稿有頁面, 部分文稿無頁面");
								signDef.noDraftPages = true;	// 先註記為不含文稿頁面, 若有其它流程點含有單層式頁面, 則此不含文稿頁面的流程點應為外機關流程點
							}
							
							if("attachs" in draft) {
								$.each(draft.attachs, function(j, attachment) {
									
									attachment.fileRef = getFileInfo(signDef.obj.signInfo.files, attachment.fileSN);//附件參照檔案
									
									if(attachment.id in _objids) {
										theLogger.warn("附件ID'" + attachment.id + "'重複!");
										// 1101207 Raymond 1101348 修正當第一、二個簽核點定義是分文後直接來文簽辦而沒有擬文稿時, 來文簽辦文稿、附件頁面、簽核物件ID未計入導致新增文稿、附件頁面、物件等動作可能造成ID重複衍生傳送時產生封裝檔異常的問題
										if(isFromDraft && "id" in attachment && attachment.id.length > 0)
											_lastid = Math.max(_lastid, Number(attachment.id));
									}
									// 1100512 Raymond 1090821 外會封裝檔的附件可能沒"文件夾識別碼"?
									else if(!attachment.id) {
										attachment.id = ++_lastid;
										_objids[attachment.id] = attachment;
									}
									else {
										_objids[attachment.id] = attachment;
										// 1070608 Raymond 1070197 分會單位新增的附件ID為%msgid%-%sn%, 比對ID大小要去掉%msgid%部分
										if(typeof attachment.id === "string" && attachment.id.indexOf("-") > 0)
											_lastid = Math.max(_lastid, Number(attachment.id.substr(attachment.id.indexOf("-") + 1)));
										else
											_lastid = Math.max(_lastid, Number(attachment.id));
									}
									
									// 1100512 Raymond 1090821 外會封裝檔的附件可能沒"頁面"
									//if(attachment.draftPages) {
									if(!!attachment.draftPages && !!attachment.draftPages.pages) {
										$.each(attachment.draftPages.pages, function(k, page) {
											
											page.fileRef = getFileInfo(signDef.obj.signInfo.files, page.fileSN);    // (附件)頁面參照檔案
											page.po = k;    // (附件)頁面頁次
											
											if(page.id in _objids) {
												theLogger.warn("頁面ID'" + page.id + "'重複!");
												// 1101207 Raymond 1101348 修正當第一、二個簽核點定義是分文後直接來文簽辦而沒有擬文稿時, 來文簽辦文稿、附件頁面、簽核物件ID未計入導致新增文稿、附件頁面、物件等動作可能造成ID重複衍生傳送時產生封裝檔異常的問題
												if(isFromDraft)
													_lastid = Math.max(_lastid, Number(page.id));
												
												// 1131204 Raymond 北榮序412 修正歷史檢視最後一個分會流程點會出現別的分會單位的簽核物件的問題
												//if(flid.length) {	// 1070119 Raymond 合併分會流程點新增於附件頁面上的簽核物件
												if(flid.length && !_fm.isRefDoc()) {	// 1070119 Raymond 合併分會流程點新增於附件頁面上的簽核物件
													_mergeDispatchFlowAtt.call(that, page, flid);
												}
											}
											else {
												_objids[page.id] = page;
												// 1070608 Raymond 1070197 分會單位新增的附件頁面ID為%msgid%-%sn%, 比對ID大小要去掉%msgid%部分
												if(typeof page.id === "string" && page.id.indexOf("-") > 0)
													_lastid = Math.max(_lastid, Number(page.id.substr(page.id.indexOf("-") + 1)));
												else
													_lastid = Math.max(_lastid, Number(page.id));
												_pages.push(page);
												
												// 1131204 Raymond 北榮序412 修正歷史檢視最後一個分會流程點會出現別的分會單位的簽核物件的問題
												//if(flid.length) {	// 1070119 Raymond 合併分會流程點新增於附件頁面上的簽核物件
												if(flid.length && !_fm.isRefDoc()) {	// 1070119 Raymond 合併分會流程點新增於附件頁面上的簽核物件
													_mergeDispatchFlowAtt.call(that, page, flid);
												}
											}
										});
									}
									else
										theLogger.warn("附件無對應頁面! 可能是附件不匯出頁面的公文");	// 2015.11.20 增加文字描述
								});
							}
							
							// 1100512 Raymond 1090821 外會封裝檔的本文可能沒"文稿頁面檔"或"頁面"
							if(!!draft.draftPages && !!draft.draftPages.signObjs) {
							$.each(draft.draftPages.signObjs, function(j, signObj) {
								if("fileSN" in signObj.content) {
									signObj.fileRef = getFileInfo(signDef.obj.signInfo.files, signObj.content.fileSN);// (文稿)簽核物件參照檔案
								}
								
								if(signObj.id in _objids) {
									theLogger.warn("簽核物件ID'" + signObj.id + "'重複!");
									// 1101207 Raymond 1101348 修正當第一、二個簽核點定義是分文後直接來文簽辦而沒有擬文稿時, 來文簽辦文稿、附件頁面、簽核物件ID未計入導致新增文稿、附件頁面、物件等動作可能造成ID重複衍生傳送時產生封裝檔異常的問題
									if(isFromDraft) {
										if(typeof signObj.id === "string" && signObj.id.indexOf("-") > 0)
											_lastid = Math.max(_lastid, Number(signObj.id.substr(signObj.id.indexOf("-") + 1)));
										else
											_lastid = Math.max(_lastid, Number(signObj.id));
									}
								}
								else {
									_objids[signObj.id] = signObj;
									// 1070608 Raymond 1070197 分會單位新增的附件頁面ID為%msgid%-%sn%, 比對ID大小要去掉%msgid%部分
									// 1060918 Raymond 分會所加之簽核物件ID為"%msgid%-%id%", 且%id%不與主辦之簽核物件ID連續編, 應排除之
									//if(signObj.id.indexOf("-") < 0)
									//	_lastid = Math.max(_lastid, Number(signObj.id));
									if(typeof signObj.id === "string" && signObj.id.indexOf("-") > 0)
										_lastid = Math.max(_lastid, Number(signObj.id.substr(signObj.id.indexOf("-") + 1)));
									else
										_lastid = Math.max(_lastid, Number(signObj.id));
								}
								
								if(signObj.obj in _objids) {
									var page = _objids[signObj.obj];
									//asert page istypeof Page
									if(!("children" in page))
										page.children = [];
									page.children.push(signObj);
								}
								else
									theLogger.warn("Container ID'" + signObj.obj + "'找不到!");
							});
							}
						});
						
						if("fromFolder" in signDef.obj.signInfo) {
							
							if("uri" in signDef.obj.signInfo.fromFolder) {  // 2014.2.18 - Raymond, 傳送後會用參照指向前流程點的來文文件夾
								var fromFolderId = signDef.obj.signInfo.fromFolder.uri.replace(/^#/, '');
								// 搜尋
								if(fromFolderId in fromFolders) {
									$.each(fromFolders[fromFolderId], function(attr, v) {
										if(!(attr in signDef.obj.signInfo.fromFolder))  // 不存在的屬性由所參照的來文文件夾提供
											signDef.obj.signInfo.fromFolder[attr] = v;
									});
								}
								else
									theLogger.warn("其它流程點找不到Id:'" + fromFolderId + "'的來文文件夾");
							}
							// 1061016 Raymond 1060996 修正來文文件夾參照沒有檔案參照, 以致無法顯示問題, 有URI就不是來文文件夾
							//if("fromDoc" in signDef.obj.signInfo.fromFolder) {
							else if("fromDoc" in signDef.obj.signInfo.fromFolder) {
								var fromDoc = signDef.obj.signInfo.fromFolder.fromDoc;
								fromDoc.fileRef = getFileInfo(signDef.obj.signInfo.files, fromDoc.fileSN);// 來文電子檔參照
								if("id" in fromDoc && fromDoc.id.length > 0)	// 1070315 Raymond 1061136 修正來文ID未計入導致新增文稿、頁面、物件等動作可能造成ID重複衍生傳送時產生封裝檔異常的問題
									_lastid = Math.max(_lastid, Number(fromDoc.id));
								
								$.each(fromDoc.pages, function(j, page) {
									page.fileRef = getFileInfo(signDef.obj.signInfo.files, page.fileSN);// 來文頁面檔參照
									_lastid = Math.max(_lastid, Number(page.id));	// 1070315 Raymond 1061136 修正來文頁面ID未計入導致新增文稿、頁面、物件等動作可能造成ID重複衍生傳送時產生封裝檔異常的問題
								});
								
								if("attachs" in fromDoc) {
									$.each(fromDoc.attachs, function(j, attachment) {
										attachment.fileRef = getFileInfo(signDef.obj.signInfo.files, attachment.fileSN);// 附件電子檔參照
										if("id" in attachment && attachment.id.length > 0)	// 1070315 Raymond 1061136 修正來文附件ID未計入導致新增文稿、頁面、物件等動作可能造成ID重複衍生傳送時產生封裝檔異常的問題
											_lastid = Math.max(_lastid, Number(attachment.id));
										
										if(attachment.draftPages) {
											$.each(attachment.draftPages.pages, function(k, page) {
												page.fileRef = getFileInfo(signDef.obj.signInfo.files, page.fileSN);// 附件頁面檔參照
												_lastid = Math.max(_lastid, Number(page.id));	// 1070315 Raymond 1061136 修正來文附件頁面ID未計入導致新增文稿、頁面、物件等動作可能造成ID重複衍生傳送時產生封裝檔異常的問題
											});
										}
										else
											theLogger.warn("附件無對應頁面!");
									});
								}
							}
						}
						// 1130117 Raymond 1120887 參照窗格的歷史檢視模式不要合併新增文稿到分會會畢退回的最後一個流程點
						// 1070608 Raymond 1070197 分會會畢退回後的第一個流程點(尚未寫入封裝檔)要合併不同分會點新增的文稿
						//if ("dispatchNode" in signDef.refFlow &&
						if(!_fm.isRefDoc() && "dispatchNode" in signDef.refFlow &&
							signDef.refFlow.dispatchNode.flows[signDef.refFlow.dispatchNode.flows.length-1] == signDef.refFlow &&	// 此流程是分會點最後流程
							signDef.refFlow.dispatchNode.parentFlow.dispatch[signDef.refFlow.dispatchNode.parentFlow.dispatch.length-1] == signDef.refFlow.dispatchNode &&	// 且此分會點是分會流程的最後一個分會點
							signDef.refFlow.id == that.capsCntn.eFile.aol.aolFlow.flows[that.capsCntn.eFile.aol.aolFlow.flows.length - 1].id) {
							theLogger.log("此為分會會畢退回後第一個流程點, 應合併以下分會點所新增的文稿...");
							theLogger.log(dd_flid);
							_mergeDispatchNewDrafts.call(that, signDef, dd_flid);
						}
					}
					else {  // 2014.2.18 - Raymond, 暫存夾文文件夾供參照路徑反查
						if("fromFolder" in signDef.obj.signInfo) {
							if("id" in signDef.obj.signInfo.fromFolder) {
								var fromFolderId = signDef.obj.signInfo.fromFolder.id;
								if(fromFolderId in fromFolders)
									theLogger.warn("來文文件夾Id:'" + fromFolderId + "'重複");
								else
									fromFolders[fromFolderId] = signDef.obj.signInfo.fromFolder;
							}
						}
						
						// 2016.11.17 fix for 參照窗格歷史檢視改用影像檔顯示, 要取得filRef
						$.each(signDef.obj.signInfo.drafts, function(idx, draft) {
							
							draft.fileRef = getFileInfo(signDef.obj.signInfo.files, draft.fileSN);// 文稿參照檔案
							
							// 1100706 Raymond 1100648 新增支援複數筆簽核意見功能
							if(!!signDef.obj.changeInfo.comments && signDef.obj.changeInfo.comments.length > 0) {
								for(var j=0; j<signDef.obj.changeInfo.comments.length; j++) {
									if(signDef.obj.changeInfo.comments[j].uri == draft.fileSN) {	// 比對原始檔序號相符則此簽核意見即為此文稿的
										draft.signComment = signDef.obj.changeInfo.comments[j].content;
										break;
									}
								}
							}
							else if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {	// 啟用分文稿記錄簽核意見功能但封裝檔是舊的沒分, 一律設為第一筆文稿的
								if(idx == 0 && draft.name != "來文簽辦")
									draft.signComment = signDef.obj.changeInfo.comment;
							}
							
							if(draft.id in _objids)
								theLogger.warn("文稿ID'" + draft.id + "'重複!");
							// 1100512 Raymond 1090821 外會封裝檔的本文可能沒"文件夾識別碼"?
							else if(!draft.id) {
								draft.id = ++_lastid;
								_objids[draft.id] = draft;
							}
							else
								_objids[draft.id] = draft;
							
							// 1100512 Raymond 1090821 外會封裝檔的本文可能沒"文稿頁面檔"或"頁面"
							if(!!draft.draftPages && !!draft.draftPages.pages) {
								// 1100512 Raymond 1090821 先註記為含文稿頁面, 供載入封裝檔完成後判斷流程點是否為外機關流程點
								if(signDef.noDraftPages == true)
									theLogger.error("同一流程點多稿不應部分文稿有頁面, 部分文稿無頁面");
								signDef.noDraftPages = false;
								if(draft.draftPages.method == "單層式") {
									_hasSingleLayerDraft = true;		// 註記本封裝檔有單層式文稿頁面
									signDef.hasSingleLayerDraft = true;	// 註記本簽核點定義有單層式文稿頁面
								}
							$.each(draft.draftPages.pages, function(j, page) {
								
								page.fileRef = getFileInfo(signDef.obj.signInfo.files, page.fileSN);// (文稿)頁面參照檔案
								page.po = j;    // (文稿)頁面頁次
								
								if(page.id in _objids) {
									theLogger.warn("頁面ID'" + page.id + "'重複!");
									
									// 1131204 Raymond 北榮序412 修正歷史檢視最後一個分會流程點會出現別的分會單位的簽核物件的問題
									//if(flid.length) {	// 2016.11.25 合併分會流程點簽核物件
									//	_mergeDispatchFlow.call(that, page, flid);
									//}
								}
								// 1100512 Raymond 1090821 外會封裝檔的本文頁面(單層式)可能沒"文件夾識別碼"?
								else if(!page.id) {
									page.id = ++_lastid;
									_objids[page.id] = page;
								}
								else {
									theLogger.warn("頁面ID'" + page.id + "'新增!");
									_objids[page.id] = page;
									
									// 1131204 Raymond 北榮序412 修正歷史檢視最後一個分會流程點會出現別的分會單位的簽核物件的問題
									//if(flid.length) {	// 2016.11.24 合併分會流程點簽核物件
									//	_mergeDispatchFlow.call(that, page, flid);
									//}
								}
							});
							}
							else {	// 1100512 Raymond 1090821 不含單層式文稿頁面的可能是外機關流程點
								if(signDef.noDraftPages == false)
									theLogger.error("同一流程點多稿不應部分文稿有頁面, 部分文稿無頁面");
								signDef.noDraftPages = true;	// 先註記為不含文稿頁面, 若有其它流程點含有單層式頁面, 則此不含文稿頁面的流程點應為外機關流程點
							}
							
							if("attachs" in draft) {
								$.each(draft.attachs, function(j, attachment) {
									
									attachment.fileRef = getFileInfo(signDef.obj.signInfo.files, attachment.fileSN);//附件參照檔案
									
									if(attachment.id in _objids)
										theLogger.warn("附件ID'" + attachment.id + "'重複!");
									// 1100512 Raymond 1090821 外會封裝檔的附件可能沒"文件夾識別碼"?
									else if(!attachment.id) {
										attachment.id = ++_lastid;
										_objids[attachment.id] = attachment;
									}
									else
										_objids[attachment.id] = attachment;
									
									// 1100512 Raymond 1090821 外會封裝檔的附件可能沒"頁面"
									//if(attachment.draftPages) {
									if(!!attachment.draftPages && !!attachment.draftPages.pages) {
										$.each(attachment.draftPages.pages, function(k, page) {
											
											page.fileRef = getFileInfo(signDef.obj.signInfo.files, page.fileSN);    // (附件)頁面參照檔案
											page.po = k;    // (附件)頁面頁次
											
											if(page.id in _objids) {
												theLogger.warn("頁面ID'" + page.id + "'重複!");
												
												// 1131204 Raymond 北榮序412 修正歷史檢視最後一個分會流程點會出現別的分會單位的簽核物件的問題
												//if(flid.length) {	// 1070313 Raymond 1061277 合併分會流程點新增於附件頁面上的簽核物件
												//	_mergeDispatchFlowAtt.call(that, page, flid);
												//}
											}
											else {
												_objids[page.id] = page;
												
												// 1131204 Raymond 北榮序412 修正歷史檢視最後一個分會流程點會出現別的分會單位的簽核物件的問題
												//if(flid.length) {	// 1070313 Raymond 1061277 合併分會流程點新增於附件頁面上的簽核物件
												//	_mergeDispatchFlowAtt.call(that, page, flid);
												//}
											}
										});
									}
									else
										theLogger.warn("附件無對應頁面! 可能是附件不匯出頁面的公文");	// 2015.11.20 增加文字描述
								});
							}
							
							// 1100512 Raymond 1090821 外會封裝檔的本文可能沒"文稿頁面檔"或"頁面"
							if(!!draft.draftPages && !!draft.draftPages.signObjs) {
							$.each(draft.draftPages.signObjs, function(j, signObj) {
								if("fileSN" in signObj.content) {
									signObj.fileRef = getFileInfo(signDef.obj.signInfo.files, signObj.content.fileSN);// (文稿)簽核物件參照檔案
								}
								
								if(signObj.id in _objids)
									theLogger.warn("簽核物件ID'" + signObj.id + "'重複!");
								else
									_objids[signObj.id] = signObj;
								
								if(signObj.obj in _objids) {
									var page = _objids[signObj.obj];
									//asert page istypeof Page
									if(!("children" in page))
										page.children = [];
									page.children.push(signObj);
								}
								else
									theLogger.warn("Container ID'" + signObj.obj + "'找不到!");
							});
							}
						});
						
						if("fromFolder" in signDef.obj.signInfo) {
							
							if("uri" in signDef.obj.signInfo.fromFolder) {  // 傳送後會用參照指向前流程點的來文文件夾
								var fromFolderId = signDef.obj.signInfo.fromFolder.uri.replace(/^#/, '');
								// 搜尋
								if(fromFolderId in fromFolders) {
									$.each(fromFolders[fromFolderId], function(attr, v) {
										if(!(attr in signDef.obj.signInfo.fromFolder))  // 不存在的屬性由所參照的來文文件夾提供
											signDef.obj.signInfo.fromFolder[attr] = v;
									});
								}
								else
									theLogger.warn("其它流程點找不到Id:'" + fromFolderId + "'的來文文件夾");
							}
							// 1061016 Raymond 1060996 修正來文文件夾參照沒有檔案參照, 以致無法顯示問題, 有URI就不是來文文件夾
							//if("fromDoc" in signDef.obj.signInfo.fromFolder) {
							else if("fromDoc" in signDef.obj.signInfo.fromFolder) {
								// 1090504 Raymond 1090313 修正中興大學100年度(前半年)有來文的線上簽核公文封裝檔會封入"分辦"流程點且檔案清單無內容, 導致點擊來文及來文附件會轉圈圈無法顯示的問題
								if(signDef.obj.signInfo.files.length == 0) {
									theLogger.warn("封裝檔流程點(" + signDef.id + ")之檔案清單記錄個數為(" + signDef.obj.signInfo.files.counts + ")但無任何檔案, 應為錯誤資料, 移除此流程點及此流程點所含之來文文件夾");
									delete _revs[signDef.id];
									delete fromFolders[signDef.obj.signInfo.fromFolder.id];
								}
								else {
								
								var fromDoc = signDef.obj.signInfo.fromFolder.fromDoc;
								fromDoc.fileRef = getFileInfo(signDef.obj.signInfo.files, fromDoc.fileSN);// 來文電子檔參照
								// 1131211 Raymond 1131110 修正某些99年版封裝檔的<簽核點定義>下的<簽核文件夾>的<檔案清單>中沒有<來文文件夾>下的<電子來文>、<頁面>的"原始檔序號"的<電子檔資訊>, 導致點擊來文頁籤時會轉圈圈的問題
								if(!!fromDoc.fileSN && !fromDoc.fileRef)
									fromDoc.fileRef = getOtherSignDefFileInfo(that.capsCntn.eFile.aol.aolInfo.signDefs, fromDoc.fileSN);
								
								$.each(fromDoc.pages, function(j, page) {
									page.fileRef = getFileInfo(signDef.obj.signInfo.files, page.fileSN);// 來文頁面檔參照
									// 1131211 Raymond 1131110 修正某些99年版封裝檔的<簽核點定義>下的<簽核文件夾>的<檔案清單>中沒有<來文文件夾>下的<電子來文>、<頁面>的"原始檔序號"的<電子檔資訊>, 導致點擊來文頁籤時會轉圈圈的問題
									if(!!page.fileSN && !page.fileRef)
										page.fileRef = getOtherSignDefFileInfo(that.capsCntn.eFile.aol.aolInfo.signDefs, page.fileSN);
								});
								
								if("attachs" in fromDoc) {
									$.each(fromDoc.attachs, function(j, attachment) {
										attachment.fileRef = getFileInfo(signDef.obj.signInfo.files, attachment.fileSN);// 附件電子檔參照
										// 1131211 Raymond 1131110 修正某些99年版封裝檔的<簽核點定義>下的<簽核文件夾>的<檔案清單>中沒有<來文文件夾>下的<電子來文>、<頁面>的"原始檔序號"的<電子檔資訊>, 導致點擊來文頁籤時會轉圈圈的問題
										if(!!attachment.fileSN && !attachment.fileRef)
											attachment.fileRef = getOtherSignDefFileInfo(that.capsCntn.eFile.aol.aolInfo.signDefs, attachment.fileSN);
										
										if(attachment.draftPages) {
											$.each(attachment.draftPages.pages, function(k, page) {
												page.fileRef = getFileInfo(signDef.obj.signInfo.files, page.fileSN);// 附件頁面檔參照
												// 1131211 Raymond 1131110 修正某些99年版封裝檔的<簽核點定義>下的<簽核文件夾>的<檔案清單>中沒有<來文文件夾>下的<電子來文>、<頁面>的"原始檔序號"的<電子檔資訊>, 導致點擊來文頁籤時會轉圈圈的問題
												if(!!page.fileSN && !page.fileRef)
													page.fileRef = getOtherSignDefFileInfo(that.capsCntn.eFile.aol.aolInfo.signDefs, page.fileSN);
											});
										}
										else
											theLogger.warn("附件無對應頁面!");
									});
								}
								
								}	// 1090504 Raymond 1090313 end of elseif(signDef.obj.signInfo.files.length == 0)
							}
						}
					}
					flid.length = 0;	// 2016.11.25 清空記錄, 以免第二次分會累加
				}
			});
			theLogger.log(_flows);
			theLogger.log(_revs);
			theLogger.log(_objids);
			theLogger.log("lastId: " + _lastid);
			theLogger.log(_pages);
			theLogger.log(_revs[_currRev]);	// 1070608 Raymond 1070197 新增記錄
		}
		else
			throw new Error("XML文件非'電子封裝檔'");
	}
	
	function CapsContent(xmlNode) {
		if(xmlNode.nodeName == "封裝檔內容") {
			this.id = xmlNode.getAttribute("Id");
			this.capsInfo = getElemText(xmlNode, "封裝檔資訊");
			this.eFile = new EFile(xmlNode.getElementsByTagName("電子檔案")[0]);
		}
		else
			throw new Error("XML節點非'封裝檔內容'");
	}
	
	function EFile(xmlNode) {
		if(xmlNode.nodeName == "電子檔案") {
			this.aol = new Aol(xmlNode.getElementsByTagName("線上簽核")[0]);
		}
		else
			throw new Error("XML節點非'電子檔案'");
	}
	
	function Aol(xmlNode) {
		if(xmlNode.nodeName == "線上簽核") {
			this.id = xmlNode.getAttribute("Id");
			this.aolFlow = new AolFlow(xmlNode.getElementsByTagName("線上簽核流程")[0]);
			this.aolInfo = new AolInfo(xmlNode.getElementsByTagName("線上簽核資訊")[0]);
		}
		else
			throw new Error("XML節點非'線上簽核'");
	}
	
	function AolFlow(xmlNode) {
		if(xmlNode.nodeName == "線上簽核流程") {
			this.id = xmlNode.getAttribute("Id");
			this.flows = [];
			var that = this;
			$.each(xmlNode.getElementsByTagName("簽核流程"), function(i, nd) {
				that.flows.push(new Flow(nd));
			});
		}
		else
			throw new Error("XML節點非'線上簽核流程'");
	}
	
	function Flow(xmlNode, dispatchNode) {	// 2016.11.24 新增分會點參數
		if(xmlNode.nodeName == "簽核流程") {
			this.id = xmlNode.getAttribute("Id");
			this.type = xmlNode.getAttribute("異動別");
			// 2016.11.24 新增分會點
			if(dispatchNode)
				this.dispatchNode = dispatchNode;
			else if(xmlNode.getElementsByTagName("分會點").length > 0) {
				this.dispatch = [];
				var that = this;
				$.each(xmlNode.getElementsByTagName("分會點"), function(i, nd) {
					that.dispatch.push(new Dispatch(nd, that));
				});
			}
		}
		else
			throw new Error("XML節點非'簽核流程'");
	}
	// 2016.11.24 新增分會點
	function Dispatch(xmlNode, parentFlow) {
		if(xmlNode.nodeName == "分會點") {
			this.parentFlow = parentFlow;
			this.flows = [];
			var that = this;
			$.each(xmlNode.getElementsByTagName("簽核流程"), function(i, nd) {
				that.flows.push(new Flow(nd, that));
			});
		}
		else
			throw new Error("XML節點非'分會點'");
	}
	
	function AolInfo(xmlNode) {
		if(xmlNode.nodeName == "線上簽核資訊") {
			this.id = xmlNode.getAttribute("Id");
			this.signDefs = [];
			var that = this;
			$.each(xmlNode.getElementsByTagName("簽核點定義"), function(i, nd) {
				// 2015.12.29 新增檢核簽核點定義是否與目前流程點一樣, 是的話表示此封裝檔已在桌機用AOL異動儲存過
				// 行動版應直接捨棄, 當作全新開啟, 即該流程點在AOL所做的異動不會在行動版呈現
				//that.signDefs.push(new SignDef(nd));
				var sd = new SignDef(nd);
				//if(sd.id == "sign_" + theAOL.docObj.msgId) {
				if(sd.id == "sign_" + _docObj.msgId) { // 1090608 Raymond 1090103 對此封裝檔而言當前MsgID應為_docObj.msgId而非theAOL.docObj.msgId
					//if(that.signDefs.length == 0 && !theAOL.docObj.isDraft) {	// 1060821 Raymond 增加判斷非草稿(來文傳送失敗)才要保留這個簽核點定義
					if(that.signDefs.length == 0 && !_docObj.isDraft) {	// 1090608 Raymond 1090103 對此封裝檔而言當前docObj應為_docObj而非theAOL.docObj
					//if(that.signDefs.length == 0) {	// 2016.11.25 fix for 傳送失敗
						theLogger.warn("封裝檔內已有相同MsgID的簽核點定義, 但僅有一個, 應是傳送失敗的結果");
						that.signDefs.push(sd);
					}
					else if(that.signDefs.length == 1 && that.signDefs[0].id == "sign_0") {	// 2017.3.7 新增支援一代分文後暫存但未傳送的公文
						theLogger.warn("封裝檔內已有相同MsgID的簽核點定義, 但為第二個, 前一個是分文流程點, 應是一代暫存但尚未傳送的結果");
						that.signDefs.push(sd);
					}
					//else {	// 1131017 Raymond 1130940 修正異動撤消回分文後第一個流程點, 職名章會變成別人的職名章的問題
						// 1061012 Raymond 1060962+1060948+1060989 異動撤消後刪除附件會發生錯誤, 須復原到傳送前文稿已匯出的附件頁面的狀態, 故另存在Forbidden簽核點定義
						//theLogger.warn("封裝檔內已有相同MsgID的簽核點定義, 應是AOL暫存資料, 行動版不支援其資料之讀寫, 故捨棄之");
						theLogger.warn("封裝檔內已有相同MsgID的簽核點定義, 應是AOL暫存資料或異動撤消或封裝成功傳送失敗, 另存在Forbidden簽核點定義");
						_forbiddenSignDef = sd;
						_forbiddenSignDef.findDraft = function(id) {
							var snfo = this.obj.signInfo;
							for(var i=0; i<snfo.drafts.length; i++) {
								var draft = snfo.drafts[i];
								if(draft.id == id)
									return draft;
							}
						}
						return false;	// 直接捨棄且不要再解析後續的簽核點定義, 以免僅排除當流程點的簽核點定義, 卻出現之後流程點的簽核點定義的內容
					//}	// 1131017 Raymond 1130940 修正異動撤消回分文後第一個流程點, 職名章會變成別人的職名章的問題
				}
				else
					that.signDefs.push(sd);
			});
		}
		else
			throw new Error("XML節點非'線上簽核資訊'");
	}
	
	function SignDef(xmlNode) {
		if(xmlNode.nodeName == "簽核點定義") {
			this.id = xmlNode.getAttribute("Id");
			this.uri = xmlNode.getAttribute("URI");
			this.signature = new Signature(xmlNode.getElementsByTagName("Signature")[0]);
			this.obj = new Obj(xmlNode.getElementsByTagName("Object")[0]);
			
			// 暫時cache最後一個簽核點定義的obj節點
			//var nd = xmlNode.getElementsByTagName("Object")[0];
			//_cachedLastSol = nd.cloneNode(true);
		}
		else
			throw new Error("XML節點非'簽核點定義'");
	}
	
	function Signature(xmlNode) {
		if(xmlNode.nodeName == "Signature") {
			this.id = xmlNode.getAttribute("Id");
		}
		else
			throw new Error("XML節點非'簽核點定義'");
	}
	
	function Obj(xmlNode) {
		if(xmlNode.nodeName == "Object") {
			this.id = xmlNode.getAttribute("Id");
			this.changeInfo = new ChangeInfo(xmlNode.getElementsByTagName("異動資訊")[0]);
			this.signInfo = new SignInfo(xmlNode.getElementsByTagName("簽核資訊")[0]);
		}
		else
			throw new Error("XML節點非'Object'");
	}
	
	function ChangeInfo(xmlNode) {
		if(xmlNode.nodeName == "異動資訊") {
			if(xmlNode.hasAttribute("退文"))	// 2016.11.11 新增讀取封裝檔的"退文"屬性供保留簽署物件功能使用
				this.returnDoc = xmlNode.getAttribute("退文");
			this.charger = new Charger(xmlNode.getElementsByTagName("簽核人員")[0]);
			this.type = getElemText(xmlNode, "異動別");
			this.comment = getElemText(xmlNode, "簽核意見");
			// 1100706 Raymond 1100648 新增支援複數筆簽核意見功能
			var nl = xmlNode.getElementsByTagName("簽核意見");
			if(!!nl && nl.length > 0 && !!nl[0].getAttribute("URI")) {	// 有"URI"屬性才會新增comments陣列物件
				this.comments = [];
				for(var i=0; i<nl.length; i++)
					this.comments.push({content: ((nl[i].childNodes.length > 0)?nl[i].childNodes[0].nodeValue:""), uri: nl[i].getAttribute("URI")});
			}
			this.timeStamp = getElemText(xmlNode, "簽章時間");
			this.nextChargers = [];
			var that = this;
			$.each(xmlNode.getElementsByTagName("次位簽核人員"), function(i, nd) {
				that.nextChargers.push(new Charger(nd.getElementsByTagName("簽核人員")[0]));
			});
		}
		else
			throw new Error("XML節點非'異動資訊'");
	}
	
	function Charger(xmlNode) {
		if(xmlNode.nodeName == "簽核人員") {
			this.ou = getElemText(xmlNode, "單位");
			this.title = getElemText(xmlNode, "職稱");
			this.name = getElemText(xmlNode, "姓名");
			this.userId = getElemText(xmlNode, "帳號");
			this.role = getElemText(xmlNode, "角色");
		}
		else
			throw new Error("XML節點非'簽核人員'");
	}
	
	function SignInfo(xmlNode) {
		if(xmlNode.nodeName == "簽核資訊") {
			if(xmlNode.getElementsByTagName("來文文件夾").length > 0)
				this.fromFolder = new FromFolder(xmlNode.getElementsByTagName("來文文件夾")[0]);
			else if(xmlNode.getElementsByTagName("來文文件夾參照路徑").length > 0)   // 2014.2.18 - Raymond, 傳送後會用參照指向前流程點的來文文件夾
				this.fromFolder = new FromFolder(xmlNode.getElementsByTagName("來文文件夾參照路徑")[0]);
			if(xmlNode.getElementsByTagName("簽核文件夾").length > 0)	// 2016.12.1 彙併解併沒有簽核文件夾子節點
				signfolder.call(this, xmlNode.getElementsByTagName("簽核文件夾")[0]);    // 分辦的封裝檔是否可能沒有簽核文件夾?
			else if(xmlNode.getElementsByTagName("子文簽核文件夾").length > 0)	// 2017.4.10 子文簽核文件夾
				signfolder.call(this, xmlNode.getElementsByTagName("子文簽核文件夾")[0]);
			else
				theLogger.error("此簽稿點定義的「簽核資訊」下無「簽核文件夾」節點, 無法繼續解析");
		}
		else
			throw new Error("XML節點非'簽核資訊'");
	}
	
	function FromFolder(xmlNode) {
		if(xmlNode.nodeName == "來文文件夾") {
			this.cachedDOM = xmlNode.cloneNode(true);   // 複製整個節點, 以供在寫工作檔時貼上
			this.id = xmlNode.getAttribute("Id");
			this.time = xmlNode.getAttribute("產生時間");
			this.fromDocCount = xmlNode.getElementsByTagName("來文清單")[0].getAttribute("來文數");
			this.fromDoc = new FromDoc(xmlNode.getElementsByTagName("來文清單")[0].getElementsByTagName("來文")[0]);
		}
		else if(xmlNode.nodeName == "來文文件夾參照路徑") {  // 2014.2.18 - Raymond, 傳送後會用參照指向前流程點的來文文件夾
			this.cachedDOM = xmlNode.cloneNode(true);   // 複製整個節點, 以供在寫工作檔時貼上
			this.uri = xmlNode.getAttribute("URI");
			
			/* 1061016 Raymond 1060996 修正來文文件夾參照沒有檔案參照, 以致無法顯示問題
			resolve uri
			var xmlDoc = xmlNode.ownerDocument;
			try {
				if("evaluate" in xmlDoc) {	// for Non-IE
					var foundResult = xmlDoc.evaluate("//來文文件夾[@Id='" + this.uri.replace("#","") + "']", xmlDoc, null, 7, null);
					if(foundResult.snapshotLength > 0) {
						var refNode = foundResult.snapshotItem(0);
						this.id = refNode.getAttribute("Id");
						this.time = refNode.getAttribute("產生時間");
						this.fromDocCount = refNode.getElementsByTagName("來文清單")[0].getAttribute("來文數");
						this.fromDoc = new FromDoc(refNode.getElementsByTagName("來文清單")[0].getElementsByTagName("來文")[0]);
					}
				}
				else if("selectSingleNode" in xmlDoc) {
					var refNode = xmlDoc.selectSingleNode("//來文文件夾[@Id='" + this.uri.replace("#","") + "']");
					if(refNode) {
						this.id = refNode.getAttribute("Id");
						this.time = refNode.getAttribute("產生時間");
						this.fromDocCount = refNode.getElementsByTagName("來文清單")[0].getAttribute("來文數");
						this.fromDoc = new FromDoc(refNode.getElementsByTagName("來文清單")[0].getElementsByTagName("來文")[0]);
					}
				}
				else
					theLogger.error("XML文件不支援evaluate亦不支援selectSingleNode方法");
			}
			catch(e) {
				theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
			}*/
		}
		else
			throw new Error("XML節點既非'來文文件夾'亦非'來文文件夾參照路徑'");
	}
	
	function FromDoc(xmlNode) {
		if(xmlNode.nodeName == "來文") {
			this.fmt = xmlNode.getAttribute("格式");
			this.sn = xmlNode.getAttribute("序號");
			this.time = xmlNode.getAttribute("產生時間");
			this.fromNo = getElemText(xmlNode.getElementsByTagName("來文字號")[0], "文字");   // 來文字號子節點可能是<字>+<文號>
			if(xmlNode.getElementsByTagName("收文字號").length)
				this.receiveNo = getElemText(xmlNode.getElementsByTagName("收文字號")[0], "文字");// 收文字號子節點可能是<字>+<文號>
			this.fromType = getElemText(xmlNode, "來文類型");
			
			function _makeFromDoc(nd) {
				this.pages = [];
				this.signObjs = [];
				var that = this;
				for(var i=0; i<nd.childNodes.length; i++) {
					var nd2 = nd.childNodes[i];
					if(nd2.tagName == "頁面")
						that.pages.push(new DraftPage(nd2, that));  // 2013.12.24 - Raymond, FromDoc為DraftPage的container
					else if(nd2.tagName == "簽核物件")      // dtd沒定義來文頁面上可以有<簽核物件>
						that.signObjs.push(new SignObject(nd2));
					else if(nd2.tagName == "附件清單") {
						that.attachs = [];
						that.attachs.count = nd2.getAttribute("附件數");
						for(var j=0; j<nd2.childNodes.length; j++) {
							if(nd2.childNodes[j].nodeName == "附件")
								that.attachs.push(new Attach(nd2.childNodes[j], that));	// 2016.2.22 新增第2參數指定附件的parent是此FromDoc
						}
					}
				}
			}
			if(xmlNode.getElementsByTagName("電子來文").length) {
				var nd = xmlNode.getElementsByTagName("電子來文")[0];
				this.fileSN = nd.getAttribute("原始檔序號");
				_makeFromDoc.call(this, nd);
			}
			else if(xmlNode.getElementsByTagName("紙本來文").length) {
				var nd = xmlNode.getElementsByTagName("紙本來文")[0];
				this.pageCount = nd.getAttribute("頁面數");
				this.archiveCount = nd.getAttribute("併同歸檔數量");
				_makeFromDoc.call(this, nd);
			}
			else
				throw new Error("不合法的來文類型-" + this.fromType);
		}
		else
			throw new Error("XML節點非'來文'");
	}
	
	function signfolder(xmlNode) {
		if(xmlNode.nodeName == "簽核文件夾") {
			this.id = xmlNode.getAttribute("Id");
			this.time = xmlNode.getAttribute("產生時間");
			this.drafts = [];
			this.files = [];
			var that = this;
			$.each(xmlNode.childNodes, function(i, nd) {
				if(nd.nodeName == "簽核文稿清單") {
					that.drafts.count = nd.getAttribute("文稿數");
					$.each(nd.getElementsByTagName("文稿"), function(j, nd2) {
						try {	// 2017.2.9 new DraftInfo因為過濾來文簽辦文稿會丟Error, 故改用try-catch接
							that.drafts.push(new DraftInfo(nd2));
						}
						catch(e) {
							theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
						}
					});
					// TODO: 也許需要檢核that.drafts.count與that.drafts.length是否一致
				}
				else if(nd.nodeName == "檔案清單") {
					that.files.count = nd.getAttribute("檔案數");
					$.each(nd.getElementsByTagName("電子檔案資訊"), function(j, nd2) {
						that.files.push(new FileInfo(nd2));
					});
					// TODO: 也許需要檢核that.files.count與that.files.length是否一致
				}
				else if(nd.nodeName == "併文清單") {
					theLogger.warn("未實作'" + nd.nodeName + "'");
				}
			});
		}
		else if(xmlNode.nodeName == "子文簽核文件夾") {	// 2017.4.10 新增支援子文簽核文件夾
			this.id = xmlNode.getAttribute("Id");
			this.time = xmlNode.getAttribute("產生時間");
			this.drafts = [];
			this.files = [];
			var that = this;
			$.each(xmlNode.childNodes, function(i, nd) {
				if(nd.nodeName == "簽核文稿清單") {	// 子文不知道有無
					that.drafts.count = nd.getAttribute("文稿數");
					$.each(nd.getElementsByTagName("文稿"), function(j, nd2) {
						try {
							that.drafts.push(new DraftInfo(nd2));
						}
						catch(e) {
							theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
						}
					});
					// TODO: 也許需要檢核that.drafts.count與that.drafts.length是否一致
				}
				else if(nd.nodeName == "檔案清單") {
					that.files.count = nd.getAttribute("檔案數");
					$.each(nd.getElementsByTagName("電子檔案資訊"), function(j, nd2) {
						that.files.push(new FileInfo(nd2));
					});
					// TODO: 也許需要檢核that.files.count與that.files.length是否一致
				}
				else {
					theLogger.warn("未實作'" + nd.nodeName + "'");
				}
			});
		}
		else
			throw new Error("XML節點非'簽核文件夾'");
	}
	
	function DraftInfo() {  // 2013.9.25 - Raymond, 改為動態參數, 因為DraftInfo同時用於新增文稿
		// 內部變數
		var _dirty = false;
		var _removed = false;
		// 動態方法
		this.dirty = function() {   // 內文是否異動
			if(arguments.length > 0)
				_dirty = arguments[0];
			return _dirty;
		}
		this.removed = function() { // 文稿是否標記刪除
			if(arguments.length > 0)
				_removed = arguments[0];
			return _removed;
		}
		
		if(arguments.length == 0)   // 2013.9.25 - Raymond, DraftInfo不可不給參數
			throw new Error("DraftInfo建構式不可無參數");
		if("nodeName" in arguments[0]) {    // 傳入參數若為XMLNode表示封裝檔內的文稿
			var xmlNode = arguments[0];
			if(xmlNode.nodeName == "文稿") {
				this.cachedDOM = xmlNode.cloneNode(true);   // 複製整個節點, 若文稿內容無異動則直接在寫工作檔時使用cached節點貼上
				this.id = xmlNode.getAttribute("文件夾識別碼");
				this.obj = xmlNode.getAttribute("物件識別碼");
				this.type = xmlNode.getAttribute("類型");
				this.flowId = xmlNode.getAttribute("產生點資訊");
				this.fileSN = xmlNode.getAttribute("原始檔序號");
				this.sn = xmlNode.getAttribute("序號");
				this.name = getElemText(xmlNode, "名稱");
				// 2017.2.9 若夾文簽辦文稿產生點為目前流程點, 則不要載入此文稿
				//if(this.flowId == "sign_" + theAOL.docObj.msgId &&	// 2017.2.9 新增過濾同一流程點建立的來文簽辦文稿, 避免傳送失敗或異動撤消
				if(this.flowId == "sign_" + _docObj.msgId &&	 // 1090608 Raymond 1090103 對此封裝檔而言當前MsgID應為_docObj.msgId而非theAOL.docObj.msgId
					(this.name == "來文簽辦" || this.sn == "9999"))
					throw new Error("文稿(ID:" + this.id + ")為目前流程點新增的來文簽辦文稿, 應是傳送失敗或異動撤消留下的記錄, 為避免傳送問題故排除之");
				// 1070608 Raymond 1070197 分會單位新增的文稿, 序號會從10000起跳, 回到主辦後要排除
				if("ODWMSG" in _docObj && "THREAD" in _docObj.ODWMSG) {
					// 1070620 Raymond 1070197 順會時THREAD會是"0", 文稿序號要跟著主辦後面編下去, 不然會重複
					//if((_docObj.ODWMSG.THREAD == "" || _docObj.ODWMSG.THREAD == "0") && this.sn >= 10000)
					if(_docObj.ODWMSG.THREAD == "" || _docObj.ODWMSG.THREAD == "0") {
						if(this.sn >= 10000)
							theLogger.warn("非分會流程點要排除超過10000的文稿序號");
						else if(!(this.name == "來文簽辦" || this.sn == "9999"))	// 順會時一樣要排除主辦單位新增的來文簽辦的固定序號
							_lastdraftsn = Math.max(_lastdraftsn, Number(this.sn));	// 2016.7.18 計算最後的文稿序號
					}
					else if(parseInt(_docObj.ODWMSG.THREAD) > 0 && _docObj.ODWMSG.THREAD == Math.floor(this.sn / 10000)) {
						theLogger.warn("同一分會流程(THREAD=" + _docObj.ODWMSG.THREAD + ")的文稿序號要計入");
						_lastdraftsn = Math.max(_lastdraftsn, Number(this.sn));	// 2016.7.18 計算最後的文稿序號
					}
				}
				else
				// 1070315 Raymond 來文簽辦序號固定為9999, 不要列入計算最後序號
				if(!(this.name == "來文簽辦" || this.sn == "9999"))
					_lastdraftsn = Math.max(_lastdraftsn, Number(this.sn));	// 2016.7.18 計算最後的文稿序號
				this.time = xmlNode.getAttribute("產生時間");
				this.docType = getElemText(xmlNode, "文稿類型");
				if(xmlNode.getElementsByTagName("文稿頁面檔").length > 0)    // <文稿頁面檔>是選項, 是否表示文稿可不匯出頁面?
					this.draftPages = new DraftPages(xmlNode.getElementsByTagName("文稿頁面檔")[0], this);
				if(xmlNode.getElementsByTagName("附件清單").length > 0) {
					var nd = xmlNode.getElementsByTagName("附件清單")[0];
					this.attachs = [];
					this.attachs.count = nd.getAttribute("附件數");
					var that = this;
					$.each(nd.childNodes, function(j, nd2) {
						if(nd2.nodeName == "附件")
							that.attachs.push(new Attach(nd2, that));	// 2016.2.22 新增第2參數指定附件的parent是此DraftInfo
					});
					// TODO: 也許需要檢核that.attachs.count與that.attachs.length是否一致
				}
				// 2013.9.25 - Raymond, 新增取得原始檔名方法
				this.getFileName = function() {
					// 1090115 Raymond 1081166 若有fileName則為儲存時可另存DI被更名的, 優先使用
					if(!!this.fileName && this.fileName.length > 0) {
						return this.fileName;
					}
					else
					if(this.fileSN.match(/[0-9]+/)) {
						var rev = _revs[_currRev];
						if(typeof this.flowId === "string" && this.flowId.length && this.flowId in _revs) {	// 2015.4.14 fileSN指向的檔案資訊在flowId指向的簽核點定義, 非當前流程點
							rev = _revs[this.flowId];
						}
						// 2013.1.2 - Raymond, fileSN不是從0開始, sn也不必然等於檔案清單中的順序
						/*if(Number(this.fileSN) < rev.obj.signInfo.files.length)
							return rev.obj.signInfo.files[this.fileSN].name.replace(/-00-[0-9]{2}\\/, "-00-99\\");
						else
							throw new Error("fileSN'" + so.content.fileSN + "'超出範圍!");*/
						for(var i=0; i<rev.obj.signInfo.files.length; i++) {
							if(rev.obj.signInfo.files[i].fileSN == this.fileSN) {
								// 1121005 Raymond 1111194 修正順會待核示或分會待核示資料夾下的線上簽核公文, 長官修改受會單位承辦人所新增的文稿內文後傳送, 會設定錯誤子目錄的文稿原始檔路徑, 導致匯出頁面不是長官修改後內容的問題
								//return rev.obj.signInfo.files[i].name.replace(/-00-[0-9]{2}\\/, "-00-99\\");
								return rev.obj.signInfo.files[i].name.replace(/-[0-9]{2}\\/, "-99\\");
							}
						}
						throw new Error("檔案清單中找不到原始檔序號(fileSN)為'" + this.fileSN + "'的電子檔案資訊!");
					}
					else
						throw new Error("原始檔序號(fileSN)'" + this.fileSN + "'不是數字!");
				}
			}
			else
				throw new Error("XML節點非'文稿'");
		}
		else if(_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {	// 1090907 Raymond 1090564 信保特殊模式
			var newInfo = arguments[0];
			this.id = newInfo.id;
			//this.id = xmlNode.getAttribute("文件夾識別碼");
			this.obj = newInfo.obj;
			//this.obj = xmlNode.getAttribute("物件識別碼");
			this.guid = newInfo.guid;
			this.type = newInfo.type;				// 類型? 不知道是什麼
			//this.type = xmlNode.getAttribute("類型");
			this.flowId = "sign_" + newInfo.msgId;	// 產生點資訊
			//this.flowId = xmlNode.getAttribute("產生點資訊");
			this.fileSN = "";						// 原始檔名
			//this.fileSN = xmlNode.getAttribute("原始檔序號");
			this.fileName = newInfo.fileName;		// 原始檔名, NEW
			if("sn" in newInfo && typeof newInfo.sn === "string" && newInfo.sn.length > 0) {	// 2017.2.13 從SignWork.xml暫存恢復新增文稿時, 會有sn屬性
				theLogger.warn("新增文稿帶有指定序號'" + newInfo.sn + "'");
				// TODO: 檢查是否跟其它文稿的序號重複
				this.sn = newInfo.sn;
				_lastdraftsn = Math.max(_lastdraftsn, Number(newInfo.sn));
			}
			else
				this.sn = ++_lastdraftsn;				// 序號
			//this.sn = xmlNode.getAttribute("序號");
			if(typeof newInfo.createTime !== "undefined")	// 產生時間
				this.time = (SSOUtil.typeOf(newInfo.createTime) == "date")?_toDateTime(newInfo.createTime):newInfo.createTime;
			else if(typeof newInfo.time !== "undefined")
				this.time = newInfo.time;
			//this.time = xmlNode.getAttribute("產生時間");
			this.name = newInfo.name;				// 名稱(稿序)
			//this.name = getElemText(xmlNode, "名稱");
			this.docType = newInfo.docType;			// 文稿類型
			//this.docType = getElemText(xmlNode, "文稿類型");
			// 1061012 Raymond 1060962 新增從DraftMgmt.xml讀回applyPrintXSL及printXSLType(固定為'稿'), 以免因異動撤消或封裝成功傳送失敗導致忽略讀取SignWork.xml時無法補述這些資料
			//if(typeof newInfo.applyPrintXSL === "string" && newInfo.applyPrintXSL.length > 0)
			//	this.applyPrintXSL = newInfo.applyPrintXSL;
			//if(typeof newInfo.printXSLType === "string" && newInfo.printXSLType.length > 0)
			//	this.printXSLType = newInfo.printXSLType;
			this.draftPages = new DraftPages(newInfo.draftPgs, this, arguments[1]);	// 文稿頁面檔, 多傳入第3參數代表的snfo
			//if(xmlNode.getElementsByTagName("文稿頁面檔").length > 0)    // <文稿頁面檔>是選項, 是否表示文稿可不匯出頁面?
			//	this.draftPages = new DraftPages(xmlNode.getElementsByTagName("文稿頁面檔")[0], this);
			//this.attachs							新增文稿無附件清單
			if("attachs" in newInfo) {
				this.attachs = [];
				this.attachs.count = newInfo.attachs.length;
				for(var i=0; i<newInfo.attachs.length; i++) {
					this.attachs.push(new Attach(newInfo.attachs[i], this, arguments[1]));	// 附件, 多傳入第3參數代表的snfo
				}
			}
			
			this.getFileName = function() {
				return this.fileName;
			}
		}
		else {  // 2013.9.25 - Raymond, 新增文稿
			_dirty = true;
			
			var newInfo = arguments[0];
			this.id = newInfo.id;
			this.obj = newInfo.obj;
			this.guid = newInfo.guid;
			this.type = newInfo.type;				// 類型? 不知道是什麼
			this.flowId = "sign_" + newInfo.msgId;	// 產生點資訊
			this.fileSN = "";						// 原始檔名
			this.fileName = newInfo.fileName;		// 原始檔名, NEW
			if("sn" in newInfo && typeof newInfo.sn === "string" && newInfo.sn.length > 0) {	// 2017.2.13 從SignWork.xml暫存恢復新增文稿時, 會有sn屬性
				theLogger.warn("新增文稿帶有指定序號'" + newInfo.sn + "'");
				// TODO: 檢查是否跟其它文稿的序號重複
				this.sn = newInfo.sn;
				_lastdraftsn = Math.max(_lastdraftsn, Number(newInfo.sn));
			}
			else
				this.sn = ++_lastdraftsn;				// 序號
			if(typeof newInfo.createTime !== "undefined")	// 產生時間
				this.time = (SSOUtil.typeOf(newInfo.createTime) == "date")?_toDateTime(newInfo.createTime):newInfo.createTime;
			else if(typeof newInfo.time !== "undefined")
				this.time = newInfo.time;
			this.name = newInfo.name;				// 名稱(稿序)
			this.docType = newInfo.docType;			// 文稿類型
			// 1061012 Raymond 1060962 新增從DraftMgmt.xml讀回applyPrintXSL及printXSLType(固定為'稿'), 以免因異動撤消或封裝成功傳送失敗導致忽略讀取SignWork.xml時無法補述這些資料
			if(typeof newInfo.applyPrintXSL === "string" && newInfo.applyPrintXSL.length > 0)
				this.applyPrintXSL = newInfo.applyPrintXSL;
			if(typeof newInfo.printXSLType === "string" && newInfo.printXSLType.length > 0)
				this.printXSLType = newInfo.printXSLType;
			this.draftPages = new DraftPages(this);	// 文稿頁面檔
			//this.attachs							新增文稿無附件清單
			if("atts" in newInfo) {					// 2016.8.10 草稿載入會有附件
				this.attachs = [];					// 2016.12.9 fix for 第二次newDraft(從SignWork.xml)時比對更新附件清單時無attachs物件的問題
				this.attachs.count = newInfo.atts.length;
				if(newInfo.atts.length) {
					for(var i=0; i<newInfo.atts.length; i++) {
						var att = newInfo.atts[i];
						if(arguments.length > 1) {	// 有多傳入2nd參數, 會是snfo
							if("ref" in att)
								att = att.ref;
							var attFileName = att.fileName;
							var bs = newInfo.fileName.indexOf("\\");
							if(bs > 0)
								attFileName = newInfo.fileName.substring(0, bs + 1) + att.fileName;
							arguments[1].files.push(new FileInfo({
								fileSN: "",
								sn: "",
								name: attFileName,
								size: att.size,
								format: "",
								time: getCreateTime()
							}));	// 封裝檔加入附件原始檔
						}
						
						this.attachs.push(new Attach(att, this));
						
						if(arguments.length > 1) {	// 有多傳入2nd參數, 會是snfo
							this.attachs[this.attachs.length - 1].fileRef = arguments[1].files[arguments[1].files.length - 1];
						}
					}
				}
			}
			
			this.getFileName = function() {
				return this.fileName;
			}
		}
		
		// TODO: 應有addAttach/delAttach等方法維護附件清單
	}
	
	function DraftPages() {
		
		this.pages = [];
		this.signObjs = [];
		
		if(arguments.length == 0)   // 2013.9.25 - Raymond, DraftPages不可不給參數
			throw new Error("DraftPages建構式必須有參數");
		if("nodeName" in arguments[0]) {
			var xmlNode = arguments[0];     // 第1個參數是xmlNode
			var container = arguments[1];   // 第2個參數是container
			if(xmlNode.nodeName == "文稿頁面檔") {
				this.id = xmlNode.getAttribute("文件夾識別碼");		// DTD定義有, 但實際好像沒有
				this.obj = xmlNode.getAttribute("物件識別碼");		// DTD定義有, 但實際好像沒有
				this.method = xmlNode.getAttribute("記錄方式");		// 堆疊式/單層式
				this.time = xmlNode.getAttribute("產生時間");
				if(xmlNode.getElementsByTagName("文稿頁面清單").length <= 0)
					throw new Error("<文稿頁面清單>必須存在");
				this.pages.count = xmlNode.getElementsByTagName("文稿頁面清單")[0].getAttribute("頁面數");
				var that = this;
				$.each(xmlNode.getElementsByTagName("文稿頁面清單")[0].getElementsByTagName("頁面"), function(i, nd) {
					that.pages.push(new DraftPage(nd, container));  // pass through container to 頁面
				});
				$.each(xmlNode.getElementsByTagName("簽核物件"), function(i, nd) {
					var so = new SignObject(nd);
					//if(so.flowId == "sign_" + theAOL.docObj.msgId)	// 2016.11.25 新增過濾同一流程點建立的簽核物件, 避免傳送失敗或異動撤消
					if(so.flowId == "sign_" + _docObj.msgId) {	// 1090608 Raymond 1090103 對此封裝檔而言當前MsgID應為_docObj.msgId而非theAOL.docObj.msgId
						// 1110617 Raymond 1110579 異動撤消或傳送失敗的流程點留下在封裝檔中的簽核物件另外存放在_forbiddenSignObjs
						//theLogger.warn("簽核物件(ID:" + so.id + ")由相同MsgID的簽核點建立, 應是AOL暫存資料或傳送失敗的公文, 故捨棄之");
						theLogger.warn("簽核物件(ID:" + so.id + ")由相同MsgID的簽核點建立, 應是AOL暫存資料或傳送失敗的公文, 另外存放在_forbiddenSignObjs");
						_forbiddenSignObjs.push(so);
					}
					else
						that.signObjs.push(so);
				});
				// 簽核物件轉入各頁面物件下
				$.each(that.signObjs, function(i, signObj) {
					for(var j=0; j<that.pages.length; j++) {
						if(that.pages[j].id == signObj.obj) {
							that.pages[j].signObjs.push(signObj);
							return true;
						}
					}
					theLogger.error("\"簽核物件\"找不到物件識別碼(" + signObj.obj + ")相符的\"頁面\"");
					throw new Error("\"簽核物件\"找不到物件識別碼(" + signObj.obj + ")相符的\"頁面\"");
				});
			}
			else if(xmlNode.nodeName == "一般頁面檔格式附件") {
				this.pages.count = xmlNode.getAttribute("頁面數");
				var that = this;
				$.each(xmlNode.getElementsByTagName("頁面"), function(i, nd) {
					that.pages.push(new DraftPage(nd, container));
				});
				// TODO: 一般頁面檔格式附件下有"簽核物件"嗎?
			}
			else
				throw new Error("XML節點非'文稿頁面檔'或'一般頁面檔格式附件'");
		}
		else if(_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {	// 1090907 Raymond 1090564 信保特殊模式
			var draftPgs = arguments[0];    // 第1個參數是"文稿頁面檔"
			var container = arguments[1];   // 第2個參數是container
			//this.id = xmlNode.getAttribute("文件夾識別碼");		// DTD定義有, 但實際好像沒有
			//this.obj = xmlNode.getAttribute("物件識別碼");		// DTD定義有, 但實際好像沒有
			this.method = draftPgs.method;
			//this.method = xmlNode.getAttribute("記錄方式");		// 堆疊式/單層式
			this.time = draftPgs.time;
			//this.time = xmlNode.getAttribute("產生時間");
			this.pages.count = draftPgs.count;
			//this.pages.count = xmlNode.getElementsByTagName("文稿頁面清單")[0].getAttribute("頁面數");
			for(var i=0; i<draftPgs.pages.length; i++) {
				this.pages.push(new DraftPage(draftPgs.pages[i], container, i, arguments[2]));	// 第3參數指定頁次, 也就是"序號", 第4參數傳入snfo
				if("newSignObjs" in draftPgs.pages[i]) {
					for(var j=0; j<draftPgs.pages[i].newSignObjs.length; j++) {	// 帶回簽核物件
						var pg = this.pages[this.pages.length - 1];
						pg.newSignObjs.push(draftPgs.pages[i].newSignObjs[j]);
						pg.newSignObjs[pg.newSignObjs.length - 1].boundTo = pg;	// 綁定簽核物件於頁面
						pg.newSignObjs[pg.newSignObjs.length - 1].bounded = true;
					}
				}
			}
			//$.each(xmlNode.getElementsByTagName("文稿頁面清單")[0].getElementsByTagName("頁面"), function(i, nd) {
			//	that.pages.push(new DraftPage(nd, container));  // pass through container to 頁面
			//});
		}
		else {
			//this.id = ++_lastid;				// 文稿頁面檔沒有文件夾識別碼?
			//this.obj = arguments[0].id;		// 文稿頁面檔沒有物件識別碼?
			this.method = "堆疊式";
			this.time = arguments[0].time;
			this.pages.push(new DraftPage(arguments[0], 0));
			this.pages.count = 1;
		}
	}
	
	function DraftPage() {
		this.signObjs = new Array();
		this.newSignObjs = new Array();
		this.addSignObj = function(so, cmt) {	// 2017.1.12 新增第2參數, 給簽核物件記錄檔使用
			this.newSignObjs.push(so);
			
			// 2017.1.12 找出所屬文稿的GUID, 再加入新簽核物件
			var guid = this.container.guid;
			if("attType" in this.container)	// 1061003 Raymond 增加附件頁面的簽核物件不會記錄在外部簽核記錄檔訊息
				theLogger.warn("附件頁面的簽核物件不會加入外部記錄檔");
			else if(typeof guid === "string" && guid.length > 0) {
				var d = _xSignFolder.getDraft(guid);
				if(!!d)
					d.addSignObj(cmt);
				else
					theLogger.error("簽核物件記錄檔中找不到GUID:" + guid + "的文稿, 無法加入新的簽核物件");
			}
			else if(this.container.name == "來文簽辦")
				theLogger.warn("來文簽辦的簽核物件不會加入外部記錄檔");
			else if(!!this.container.fromType)	// 1130704 Raymond 中榮序139 新增來文內容頁面上新增簽核物件不會記錄在外部簽核記錄檔訊息
				theLogger.warn("來文內容的簽核物件不會加入外部記錄檔");
			else
				theLogger.error("此頁面的container物件(文稿)無GUID或是空, 無法加入新的簽核物件到外部簽核物件記錄檔");
		}
		this.delSignObj = function(so) {
			// 1130710 Raymond 1130637 檢核若欲刪除的簽核物件無sessionNew屬性, 則表示此簽核物件已儲存上傳過, 需標記為簽核物件已異動狀態
			if(!so.sessionNew)
				_fm.soModified = true;
			var idx = this.newSignObjs.indexOf(so);
			if(idx >= 0) {
				this.newSignObjs.splice(idx, 1);
				
				// 2017.1.18 找出所屬文稿的GUID, 再刪除新簽核物件
				var guid = this.container.guid;
				if("attType" in this.container)	// 1130704 Raymond 新增附件頁面的簽核物件不會記錄在外部簽核記錄檔, 不需要刪除訊息
					theLogger.warn("附件頁面的簽核物件不會加入外部記錄檔, 不需要刪除");
				else if(typeof guid === "string" && guid.length > 0) {
					var d = _xSignFolder.getDraft(guid);
					if(!!d)
						d.delSignObj(so);
					else
						theLogger.error("簽核物件記錄檔中找不到GUID:" + guid + "的文稿, 無法刪除指定的新簽核物件");
				}
				else if(this.container.name == "來文簽辦")
					theLogger.warn("來文簽辦的簽核物件不會加入外部記錄檔, 不需要刪除");
				else if(!!this.container.fromType)	// 1130704 Raymond 中榮序139 新增來文內容頁面上新增簽核物件不會記錄在外部簽核記錄檔訊息
					theLogger.warn("來文內容的簽核物件不會加入外部記錄檔, 不需要刪除");
				else
					// 1130704 Raymond 中榮序139 修正container無GUID或空時, 無法同步刪除外部簽核記錄檔中的簽核物件的訊息
					//theLogger.error("此頁面的container物件(文稿)無GUID或是空, 無法加入新的簽核物件到外部簽核物件記錄檔");
					theLogger.error("此頁面的container物件(文稿)無GUID或是空, 無法刪除外部簽核物件記錄檔中記錄的對應簽核物件");
				
				// 1130703 Raymond 中榮序139 刪除文字意見或選用章戳物件時, 檢核若本流程點已無其它文字意見或選用章戳時, 清空簽辦意見, 尚有其它文字意見或選用章戳時, 則依ID的由小至大順序(即加入順序)合併後重設為目前的簽辦意見
				var enableStampToSignComment = theSSO.User.EnvSettings.get("AOL_ENABLE_STAMP_TO_SIGNCOMMENT") == "Y";
				function canToSC(o) {
					return o.type == "text" ||							// 文字意見
						(enableStampToSignComment &&					// 加蓋選用章戳時將文字式章戳的文字或影像式章戳的名稱同步到簽辦意見
						((o.type == "stamp.text" && !o.followCmt) ||	// 文字式章戳, 除了職名章右側的「代」字章
						(o.type == "sketch" && !!o.stampName)));		// 影像式章戳
				}
				if(theSSO.User.EnvSettings.get("AOL_MY_SIGNCOMMENT_READONLY") == "Y" && canToSC(so)) {	// 當啟用禁止輸入簽辦意見功能時, 才要有清空簽辦意見的行為
					var rest = [];
					if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
						var d = _fm.getCurrDraftInfo();
						if(!!d.fromType) {
							for(var j=0; j<d.pages.length; j++) {
								var pg = d.pages[j];
								for(var k=0; k<pg.newSignObjs.length; k++) {
									if(canToSC(pg.newSignObjs[k])) {
										rest.push(pg.newSignObjs[k]);
									}
								}
							}
						}
						else {
							for(var j=0; j<d.draftPages.pages.length; j++) {
								var pg = d.draftPages.pages[j];
								for(var k=0; k<pg.newSignObjs.length; k++) {
									if(canToSC(pg.newSignObjs[k])) {
										rest.push(pg.newSignObjs[k]);
									}
								}
							}
						}
						// 1130909 Raymond 中榮序233 修正創稿時加入文字意見,再刪除,簽辦意見不會清空的問題
						if(!!d.attachs)
						for(var j=0; j<d.attachs.length; j++) {
							var a = d.attachs[j];
							if(!!a.draftPages && !!a.draftPages.pages) {
								for(var k=0; k<a.draftPages.pages.length; k++) {
									var pg = a.draftPages.pages[k];
									for(var m=0; m<pg.newSignObjs.length; m++) {
										if(canToSC(pg.newSignObjs[m]))
											rest.push(pg.newSignObjs[m]);
									}
								}
							}
						}
					}
					else {
						var snfo = _revs[_currRev].obj.signInfo;
						for(var i=0; i<snfo.drafts.length; i++) {
							var d = snfo.drafts[i];
							for(var j=0; j<d.draftPages.pages.length; j++) {
								var pg = d.draftPages.pages[j];
								for(var k=0; k<pg.newSignObjs.length; k++) {
									if(canToSC(pg.newSignObjs[k])) {
										rest.push(pg.newSignObjs[k]);
									}
								}
							}
							// 1130909 Raymond 中榮序233 修正創稿時加入文字意見,再刪除,簽辦意見不會清空的問題
							if(!!d.attachs)
							for(var j=0; j<d.attachs.length; j++) {
								var a = d.attachs[j];
								if(!!a.draftPages && !!a.draftPages.pages) {
									for(var k=0; k<a.draftPages.pages.length; k++) {
										var pg = a.draftPages.pages[k];
										for(var m=0; m<pg.newSignObjs.length; m++) {
											if(canToSC(pg.newSignObjs[m]))
												rest.push(pg.newSignObjs[m]);
										}
									}
								}
							}
						}
						if(!!snfo.fromFolder && !!snfo.fromFolder.fromDoc) {
							var d = snfo.fromFolder.fromDoc;
							for(var j=0; j<d.pages.length; j++) {
								var pg = d.pages[j];
								for(var k=0; k<pg.newSignObjs.length; k++) {
									if(canToSC(pg.newSignObjs[k])) {
										rest.push(pg.newSignObjs[k]);
									}
								}
							}
							for(var j=0; j<d.attachs.length; j++) {
								var a = d.attachs[j];
								if(!!a.draftPages && !!a.draftPages.pages) {
									for(var k=0; k<a.draftPages.pages.length; k++) {
										var pg = a.draftPages.pages[k];
										for(var m=0; m<pg.newSignObjs.length; m++) {
											if(canToSC(pg.newSignObjs[m]))
												rest.push(pg.newSignObjs[m]);
										}
									}
								}
							}
						}
					}
					var sc = "";
					// 將其它文字意見或選用章戳依ID的由小至大順序(即加入順序)合併後重設為目前的簽辦意見
					rest.sort(function(a, b) {return a.id.replace("X_","") - b.id.replace("X_","");});
					for(var i=0; i<rest.length; i++) {
						if(rest[i].type == "text")
							sc += rest[i].srcContent;
						else if(rest[i].type == "stamp.text")
							sc += rest[i].content;
						else if(rest[i].type == "sketch")
							sc += rest[i].stampName;
					}
					console.log("重設簽辦意見為'" + sc + "'");
					if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y")
						d.newSignComment = sc;
					else
						_signComment = sc;
					if($("#aol #leftPart #sidePanel").css("display") != "none") {
						if($("#aol #leftPart #sidePanel li").length > 0) {
							$("#aol #leftPart #sidePanel li").eq(0).find("textarea").val(sc);
						}
					}
				}
			}
			else
				throw new Error("SO物件不在newSignObjs陣列中!");
		}
		
		if(arguments.length == 0)   // 2013.9.25 - Raymond, DraftPage不可不給參數
			throw new Error("DraftPage建構式必須有參數");
		if("nodeName" in arguments[0]) {
			var xmlNode = arguments[0];     // 第1個參數是xmlNode
			this.container = arguments[1];  // 第2個參數是container
			if(xmlNode.nodeName == "頁面") {
				this.id = xmlNode.getAttribute("文件夾識別碼");
				this.obj = xmlNode.getAttribute("物件識別碼");
				this.flowId = xmlNode.getAttribute("產生點資訊");
				this.fileSN = xmlNode.getAttribute("原始檔序號");
				this.sn = xmlNode.getAttribute("序號");
				this.time = xmlNode.getAttribute("產生時間");
			}
			else
				throw new Error("XML節點非'頁面'");
		}
		else if(_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {	// 1090907 Raymond 1090564 信保特殊模式
			this.container = arguments[1];  // 第2個參數是container
			this.po = arguments[2];	// 第3個參數是頁次
			if("id" in arguments[0] && typeof arguments[0].id == "string") {	// 附件的頁面有id要取回, 並更新lastId
				this.id = arguments[0].id;
				_lastid = Math.max(this.id, _lastid);
			}
			else	// 文稿的頁面無id, 用遞增的ID
				this.id = "" + (++_lastid);
			this.obj = arguments[1].id;
			this.flowId = arguments[1].flowId;
			this.fileSN = "";
			this.sn = arguments[2];	// 第3個參數是頁次, 也是"序號"
			this.time = arguments[0].time;
			this.fileName = arguments[0].fileRef.name;
			arguments[3].files.push(new FileInfo({	// 第4個參數是snfo
				fileSN: "",
				sn: "",
				name: arguments[0].fileRef.name,
				size: "",
				format: "",
				time: arguments[0].time
			}));	// 封裝檔加入文稿頁面原始檔
			this.fileRef = arguments[3].files[arguments[3].files.length - 1];
		}
		else {
			this.id = "" + (++_lastid);	// 2015.10.1 改用遞增的ID
			this.obj = arguments[0].id;
			this.flowId = arguments[0].flowId;
			this.fileSN = "";
			this.sn = "0";
			this.time = arguments[0].time;
			this.container = arguments[0];	// 第1個參數是container
			if(arguments.length > 1)
				this.po = arguments[1];			// 第2個參數是頁次
		}
	}
	
	function SignObject(xmlNode) {
		if(xmlNode.nodeName == "簽核物件") {
			this.id = xmlNode.getAttribute("文件夾識別碼");
			this.obj = xmlNode.getAttribute("物件識別碼");
			this.flowId = xmlNode.getAttribute("產生點資訊");
			this.disp = xmlNode.getAttribute("頁面顯示");
			this.fileSN = xmlNode.getAttribute("原始檔序號");
			this.time = xmlNode.getAttribute("產生時間");
			var that = this;
			$.each(xmlNode.childNodes, function(i, nd) {
				if(nd.nodeName == "物件類型")
					that.type = nd.textContent;
				else if(nd.nodeName == "章戳")
					that.content = new Stamp(nd);
				else if(nd.nodeName == "文字意見")
					that.content = new Comment(nd);
				else if(nd.nodeName == "圖檔")
					that.content = new Picture(nd);
			});
		}
		else
			throw new Error("XML節點非'簽核物件'");
	}
	
	function Stamp(xmlNode) {
		if(xmlNode.nodeName == "章戳") {
			this.dispTime = xmlNode.getAttribute("顯示時間") == "Y";	// 2016.11.24 fix for 賦予決行章標記不顯示時間卻仍顯示的問題
			this.orient = getElemText(xmlNode, "文字走向") || "";
			this.area = new Area(xmlNode.getElementsByTagName("區域")[0]);
			this.color = new Color(xmlNode.getElementsByTagName("顏色")[0]);
			this.fileSN = getElemText(xmlNode, "檔案序號");
		}
		else
			throw new Error("XML節點非'章戳'");
	}
	
	function Comment(xmlNode) {
		if(xmlNode.nodeName == "文字意見") {
			this.pos = new Pos(xmlNode.getElementsByTagName("位置")[0]);
			this.text = getElemText(xmlNode, "文字內容");
			this.orient = getElemText(xmlNode, "文字走向");
			this.font = new Font(xmlNode.getElementsByTagName("字型")[0]);
		}
		else
			throw new Error("XML節點非'文字意見'");
	}
	
	function Picture(xmlNode) {
		if(xmlNode.nodeName == "圖檔") {
			this.maskBkgnd = xmlNode.getAttribute("去背景");
			this.transparency = xmlNode.getAttribute("透明度");
			this.area = new Area(xmlNode.getElementsByTagName("區域")[0]);
			this.fileSN = getElemText(xmlNode, "檔案序號");
		}
		else
			throw new Error("XML節點非'圖檔'");
	}
	
	function Area(xmlNode) {
		if(xmlNode.nodeName == "區域") {
			this.top = xmlNode.getAttribute("上");
			this.bottom = xmlNode.getAttribute("下");
			this.left = xmlNode.getAttribute("左");
			this.right = xmlNode.getAttribute("右");
		}
		else
			throw new Error("XML節點非'區域'");
	}
	
	function Color(xmlNode) {
		if(xmlNode.nodeName == "顏色") {
			this.r = xmlNode.getAttribute("紅");	// 2015.5.27 改用r,g,b與章戳顏色物件一致
			this.g = xmlNode.getAttribute("綠");
			this.b = xmlNode.getAttribute("藍");
		}
		else
			throw new Error("XML節點非'顏色'");
	}
	
	function Pos(xmlNode) {
		if(xmlNode.nodeName == "位置") {
			this.x = xmlNode.getAttribute("X");
			this.y = xmlNode.getAttribute("Y");
		}
		else
			throw new Error("XML節點非'位置'");
	}
	
	function Font(xmlNode) {
		if(xmlNode.nodeName == "字型") {
			this.name = getElemText(xmlNode, "名稱");
			this.style = getElemText(xmlNode, "樣式");
			this.size = getElemText(xmlNode, "大小");
			this.color = new Color(xmlNode.getElementsByTagName("顏色")[0]);
		}
		else
			throw new Error("XML節點非'字型'");
	}
	
	// 2016.2.22 新增第2參數parent, 用於指定附件隸屬的DraftInfo或FromDoc物件
	function Attach() {
		if(arguments.length == 0)   // 2016.7.15 - Raymond, Attach不可不給參數
			throw new Error("Attach建構式必須有參數");
		if("nodeName" in arguments[0]) {
			var xmlNode = arguments[0];		// 第1個參數是xmlNode
			this.parent = arguments[1];		// 2016.2.22 第2個參數記錄在parent data member中
			if(xmlNode.nodeName == "附件") {
				this.id = xmlNode.getAttribute("文件夾識別碼");
				this.obj = xmlNode.getAttribute("物件識別碼");
				this.fmt = xmlNode.getAttribute("格式");
				this.sn = xmlNode.getAttribute("序號");
				this.time = xmlNode.getAttribute("產生時間");
				this.name = getElemText(xmlNode, "名稱");
				this.attType = getElemText(xmlNode, "附件類型");
				//1060503	Leslie[1060225]	修正來文附件頁面，物件的父層應為來文文面，多指定一層Parent(目前為windows)，會造成文面選單判定錯誤，註解以下這行
				//this.parent = parent;
				if(xmlNode.getElementsByTagName("文稿頁面檔格式附件").length > 0) {
					this.fileSN = xmlNode.getElementsByTagName("文稿頁面檔格式附件")[0].getAttribute("原始檔序號");
					if(xmlNode.getElementsByTagName("文稿頁面檔格式附件")[0].getElementsByTagName("文稿頁面檔").length > 0)
						this.draftPages = new DraftPages(xmlNode.getElementsByTagName("文稿頁面檔格式附件")[0].getElementsByTagName("文稿頁面檔")[0], this);
					else
						throw new Error("'文稿頁面檔格式附件'節點下無子節點!");
				}
				if(xmlNode.getElementsByTagName("一般頁面檔格式附件").length > 0) {
					this.draftPages = new DraftPages(xmlNode.getElementsByTagName("一般頁面檔格式附件")[0], this);
				}
				if(xmlNode.getElementsByTagName("電子檔格式附件").length > 0) {
					// 2015.8.12 電子檔格式附件=附件不匯出頁面?
					this.fileSN = xmlNode.getElementsByTagName("電子檔格式附件")[0].getAttribute("原始檔序號");
				}
				// 1061116 Raymond 1061118 保留附件包含頁面及簽核物件節點, 以提供未重新匯出附件頁面情形下保留顯示不同流程點所加的簽核物件功能
				this.cachedDOM = xmlNode.cloneNode(true);
			}
			else
				throw new Error("XML節點非'附件'");
		}
		else if(_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {	// 1090908 Raymond 1090564 信保特殊模式
			var att = arguments[0];			// 第1個參數是"附件"
			this.parent = arguments[1];		// 第2個參數是DraftInfo
			if("id" in att && typeof att.id == "string") {	// 附件有id要取回, 並更新lastId
				this.id = att.id;
				_lastid = Math.max(this.id, _lastid);
			}
			else	// 附件若無id, 用遞增的ID
				this.id = ++_lastid;
			this.obj = arguments[1].id;
			//this.guid = att.guid;
			this.sn = arguments[1].attachs.length;
			this.time = att.time;
			this.name = att.name;
			this.fmt = att.fmt;
			this.attType = att.attType;
			// 沒有附件原始檔?
			this.draftPages = new DraftPages(att.draftPages, this, arguments[2]);	// 信保特殊模式下傳入第1個參數為"文稿頁面檔", 第2個參數為container, 第3個參數為snfo
		}
		else {	// 新增附件
			var att = arguments[0];
			if("ref" in att)	// 載入草稿時, 封裝檔無文稿及附件資訊, 從文稿管理檔來的附件資訊被放在ref中
				att = att.ref;
			this.parent = arguments[1];
			this.id = ++_lastid;
			this.obj = arguments[1].id;
			this.guid = att.guid;		// 2016.7.20 新增GUID
			this.sn = arguments[1].attachs.length;
			this.time = getCreateTime();
			this.name = att.name;		// TODO: 封裝檔中附件名稱要用name還是desc?
			// 1110301 Raymond 1110106 合併1080815, 若是從SignWork.xml恢復的附件, 直接讀取其屬性
			if("fmt" in att && att.fmt == "電子檔格式") {
				theLogger.log("從SignWork.xml恢復電子檔格式附件'" + this.name + "'");
				this.fmt = att.fmt;
				this.attType = att.attType;
			}
			else
			if(SSO_CONFIG.enableConvertAttPage) {	// 2016.9.7 啟用匯出附件頁面
				// 1110301 Raymond 1110106 合併1080815, 新增判斷是否為不匯出頁面的附件格式, 是則以不匯出頁面方式處理
				var addAsRawAttach = false;
				if(allowRawAttFmt.length > 0 && "fileName" in att && att.fileName.length > 0) {
					var dot = att.fileName.lastIndexOf(".");
					if(dot > 0 && allowRawAttFmt.indexOf(att.fileName.substr(dot + 1).toUpperCase()) >= 0) {
						theLogger.log("加入的附件符合不匯出頁面的格式設定, 以電子檔格式記錄");
						this.fmt = "電子檔格式";
						this.attType = att.fileName.substring(dot + 1).toUpperCase();
						addAsRawAttach = true;
					}
				}
				if(!addAsRawAttach) {	// 不符合不匯出頁面的格式才以匯出頁面的方式處埋
					this.fmt = "文稿頁面檔格式";
					this.attType = "頁面影像檔";
					this.draftPages = new DraftPages(this);
				}
			}
			else {	// 不匯出頁面
				this.fmt = "電子檔格式";
				this.attType = "";
				// 1081105 Raymond 1081000 修正新增/抽換附件暫存關閉後再開啟會回應「封裝檔未記錄第?個文稿的第?個附件電子檔路徑」的問題
				if("fileRef" in att && "name" in att && !("origFileName" in att)) {
					this.fileRef = att.fileRef;
					this.attType = att.attType;
				}
				else
				if("fileName" in att && att.fileName.length > 0) {
					var bs = att.fileName.lastIndexOf(".");
					if(bs > 0)
						this.attType = att.fileName.substring(bs + 1).toUpperCase();
				}
			}
		}
	}
	
	function FileInfo() {
		if(arguments.length == 0)   // 2016.7.15 - Raymond, FileInfo不可不給參數
			throw new Error("FileInfo建構式必須有參數");
		if("nodeName" in arguments[0]) {
			var xmlNode = arguments[0];		// 第1個參數是xmlNode
			if(xmlNode.nodeName == "電子檔案資訊") {
				this.cachedDOM = xmlNode.cloneNode(true);			// 複製整個節點, 以供在寫工作檔時貼上
				this.id = xmlNode.getAttribute("文件夾識別碼");		// DTD定義有, 但實際好像沒有
				this.obj = xmlNode.getAttribute("物件識別碼");		// DTD定義有, 但實際好像沒有
				this.fileSN = xmlNode.getAttribute("原始檔序號");
				this.sn = xmlNode.getAttribute("序號");
				this.time = xmlNode.getAttribute("產生時間");
				this.name = getElemText(xmlNode, "檔案名稱");
				this.size = getElemText(xmlNode, "檔案大小");
				this.format = getElemText(xmlNode, "檔案格式");
			}
			else
				throw new Error("XML節點非'電子檔案資訊'");
		}
		else {	// 新增檔案
			//this.id = ++_lastid;
			//this.obj = arguments[0].id;
			this.fileSN = "";
			this.sn = "";
			this.time = arguments[0].time;
			this.name = arguments[0].name;
			this.size = arguments[0].size;
			this.format = arguments[0].format;
		}
	}
	
	var dumpPlaceHolder;
	
	function doDump(obj, $ph) {
		for(p in obj) {
			if(typeof obj[p] == "string") {
				$ph.append("<li>" + p + ": '" + obj[p] + "'</li>");
			}
			else if(typeof obj[p] == "object") {
				if(obj[p] == null) {
					$("<li><h2>" + p + ": null</h2></li>").appendTo($ph);
				}
				else {
					$ul = $("<li><h2>" + p + ":</h2><ul></ul></li>").appendTo($ph).find("ul");
					doDump(obj[p], $ul);
				}
			}
			else {
				$ph.append("<li>" + p + ": type is '" + typeof obj[p] + "'</li>");
			}
		}
	}
	
	// 找尋所有流程點定義指定ID的文稿, 2017.1.16 改成內部函式, 沒底線的函式名稱改為開放函式
	function _findDraftByIdAllRev(id) {
		var res;
		$.each(_revs, function(idx, rev) {
			var snfo = rev.obj.signInfo;
			for(var i=0; i<snfo.drafts.length; i++) {
				// 1130123 Raymond 1120887 新增判斷是否為分會合併後的文稿, 是則搜尋合併時的舊ID
				//if(snfo.drafts[i].id == id) {
				if(snfo.drafts[i].id == id || (!!snfo.drafts[i].dispatchMergedID && snfo.drafts[i].dispatchMergedID == id)) {
					res = snfo.drafts[i];
					//return false;		// 2015.11.13 改成不中斷each-loop, 因為較新的流程點可能沒有匯出頁面, 會有同版本ID的文稿, 要判斷保留的簽核物件須以較新的流程點為準
				}
			}
		});
		if(!!res)
			return res;
		throw new Error("封裝檔中所有流程點都找不到ID:'" + id + "'的文稿, 可能是異動撤消或傳送失敗");
	}
	
	// 將日期轉為yyymmddhhmm
	function _toDateTime(t) {
		// 1100715 Raymond 1100854 新增[高大客製化]記錄包含秒的日期時間
		if(theUserInfo.OrgNickName == "NUK")
			return Util.padLeft(t.getYear() - 11, 3) + Util.padLeft(t.getMonth() + 1, 2) + Util.padLeft(t.getDate(), 2) + Util.padLeft(t.getHours(), 2) + Util.padLeft(t.getMinutes(), 2) + Util.padLeft(t.getSeconds(), 2);
		return Util.padLeft(t.getYear() - 11, 3) + Util.padLeft(t.getMonth() + 1, 2) + Util.padLeft(t.getDate(), 2) + Util.padLeft(t.getHours(), 2) + Util.padLeft(t.getMinutes(), 2);
	}
	
	// 2017.1.10 外部簽核物件記錄
	function XSignObj(parent, param, so) {
		this.parent = parent;	// parent是XDraftVer
		this.ref = so;
		
		if("nodeName" in param) {	// 從XML產生
			this.id = param.getAttribute("id");
			this.msgId = param.getAttribute("msgid");
			this.time = param.getAttribute("time");
			this.type = param.getAttribute("type");
			this.telExt = param.getAttribute("telext") || "";	// 1140206 Raymond 1131137 合併CDC1110401, 新增分機資訊
			var sfid = param.getAttribute("文件夾識別碼");
			if(!!sfid) {
				theLogger.warn("簽核物件ID由'" + this.id + "'更新為'" + sfid + "'");
				// 1110620 Raymond 1110579 原來的id改為tmpId屬性保存
				this.tmpId = this.id;
				this.id = sfid;
			}
			// 1110620 Raymond 1110579 保留tmpId屬性
			else if(!!param.getAttribute("tmpId"))
				this.tmpId = param.getAttribute("tmpId");
			if(this.type == "A") {	// type A - 簽核框內物件
				this.saType = param.getAttribute("sa-type");
				this.saID = param.getAttribute("sa-id");
				// 1060713 Raymond 1060619 外部簽核物件記錄sa-id為數字, 但sa-type為空值, 預判為"單位", 以免顯示時判定saType不符而不會顯示此物件(doBuildSO@RD-FolioView.js)
				if(this.saType == "" && this.saID.match(/\d+/)) {
					theLogger.warn("外部簽核記錄簽核物件(ID:" + this.id + ")記錄為簽核框內物件, 但未記錄簽核框類型, 簽核框ID為數字, 預判其類型為'單位'");
					this.saType = "單位";
				}
				this.offset = {x: parseInt(param.getAttribute("offset-x")), y: parseInt(param.getAttribute("offset-y"))};
			}
			else if(this.type == "B") {	// type B - 簽核框外物件
				this.pgIdx = param.getAttribute("pg-idx");
				this.pos = {x: parseInt(param.getAttribute("pos-x")), y: parseInt(param.getAttribute("pos-y"))};
				this.width = param.getAttribute("width");
				this.height = param.getAttribute("height");
			}
			if(this.id in _objids) {
				// 1110105 Raymond 1101108 修正外部簽核記錄檔(XSignObjs.xml)中有不存在封裝檔但ID卻存在封裝檔(指向文稿或文稿頁面)的簽核物件時, 載入公文後會出現傳送、儲存等工具列按鈕未顯示的問題
				//this.ref = _objids[this.id];
				if(_objids[this.id] instanceof SignObject)
					this.ref = _objids[this.id];
				else
					throw new Error("載入的簽核物件(ID:" + this.id + ")不存在封裝檔(ID存在封裝檔但指向非簽核物件類型的物件)!");
			}
			else if(this.id.match(/X_\d+/)) {
				theLogger.log("此ID(" + this.id + ")是新增物件, 更新流水號");
				_xSignFolder.newSOID(parseInt(this.id.substr(2)));
			}
			else {
				// 1110620 Raymond 1110579 將不存在封裝檔中的XSignObj改放在_xSignFolder.missingXSignObjs中
				_xSignFolder.missingXSignObjs.push(this);
				//theLogger.error("載入的簽核物件(ID:" + this.id + ")不存在封裝檔!");
				throw new Error("載入的簽核物件(ID:" + this.id + ")不存在封裝檔!");
			}
			// 1100517 Raymond 1100298 新增取代他流程文字意見屬性
			if(!!this.ref && !!param.getAttribute("subst-objid")) {
				if(!!this.ref.substObjId) {
					if(this.ref.substObjId != param.getAttribute("subst-objid"))
						theLogger.error("簽核物件(ID:" + this.id + ")設定的substObjId(" + this.ref.substObjId + ")與外部記錄檔中的subst-objid(" + param.getAttribute("subst-objid") + ")不一致");
				}
				else
					this.ref.substObjId = param.getAttribute("subst-objid");
			}
			// 1130927 Raymond 中榮序237 新增文字意見原始內容
			if(!!this.ref && !!param.getAttribute("srcContent")) {
				if(!!this.ref.srcContent) {
					if(this.ref.srcContent != Utf7.decode(param.getAttribute("srcContent")))
						theLogger.error("簽核物件(ID:" + this.id + ")設定的srcContent(" + this.ref.srcContent + ")與外部記錄檔中的srcContent(" + Utf7.decode(param.getAttribute("srcContent")) + ")不一致");
				}
				else
					this.ref.srcContent = Utf7.decode(param.getAttribute("srcContent"));
			}
		}
		else {	// 從程式新增
			this.id = param.id;
			this.msgId = ("flowId" in param)?param.flowId.substr(5):param.msgId;
			this.time = param.time;
			this.type = param.type;
			this.telExt = theUserInfo.TelExt;	// 1140206 Raymond 1131137 合併CDC1110401, 新增分機資訊
			if(this.type == "A") {	// type A - 簽核框內物件
				this.saType = param.saType;
				this.saID = param.saID;
				this.offset = {x: param.offsetX, y: param.offsetY};
			}
			else if(this.type == "B") {	// type B - 簽核框外物件
				this.pgIdx = param.pgIdx;
				this.pos = {x: param.posX, y: param.posY};
				this.width = param.width;
				this.height = param.height;
			}
		}
	}
	function XSignArea(parent, param) {
		this.parent = parent;	// parent是XDraftVer
		
		if("nodeName" in param) {	// 從XML產生
			this.pgIdx = param.getAttribute("pg-idx");
			this.pgId = param.getAttribute("pg-id");
			this.saType = param.getAttribute("sa-type");
			this.saID = param.getAttribute("sa-id");
			this.left = param.getAttribute("left");
			this.top = param.getAttribute("top");
			this.right = param.getAttribute("right");
			this.bottom = param.getAttribute("bottom");
		}
		else {	// 從程式新增
			this.pgIdx = param.pgIdx;
			this.pgId = param.pgId;
			this.saType = param.saType;
			this.saID = param.saID;
			this.left = param.left;
			this.top = param.top;
			this.right = param.right;
			this.bottom = param.bottom;
		}
	}
	function XDraftVer(parent, param) {
		this.parent = parent;	// parent是XDraft
		this.xSignAreas = [];
		this.xSignObjs = [];
		
		if("nodeName" in param) {	// 從XML產生
			this.id = param.getAttribute("id");					// 封裝檔的ID
			this.filePath = param.getAttribute("file-path");	// 檔名, 參考用
			this.name = param.getAttribute("name");				// 稿序, 參考用
			this.msgId = param.getAttribute("msgid");			// 產生點資訊
			this.keepSO = param.getAttribute("keep-so");		// 保留簽署意見
			var sfid = param.getAttribute("文件夾識別碼");
			if(!!sfid) {
				// 2017.2.7 新增判斷是否同個流程點, 若是的話, 應是傳送失敗但封裝檔已記錄完成後的結果, 此時不應將文件夾識別碼取代原ID
				//if(this.msgId == theAOL.docObj.msgId)
				if(this.msgId == _docObj.msgId)	// 1090608 Raymond 1090103 對此封裝檔而言當前MsgID應為_docObj.msgId而非theAOL.docObj.msgId
					theLogger.warn("文稿版本msgid與目前流程點一致, 會有文件夾識別碼屬性應是傳送失敗的結果, ID由'" + this.id + "'更新為'" + sfid + "'");
				else
					theLogger.warn("文稿版本ID由'" + this.id + "'更新為'" + sfid + "'");
				this.id = sfid;
			}
			theLogger.warn(param.nodeName + ": {id:" + this.id + ", filePath:" + this.filePath + ", name:" + this.name + ", keepSO:" + this.keepSO + "}");
			
			if(param.childNodes.length > 0) {
				for(var i=0; i<param.childNodes.length; i++) {
					if(param.childNodes[i].nodeType == 1) {
						if(param.childNodes[i].nodeName == "簽核區域")
							this.xSignAreas.push(new XSignArea(this, param.childNodes[i]));
						else if(param.childNodes[i].nodeName == "簽核物件") {
							try {
								this.xSignObjs.push(new XSignObj(this, param.childNodes[i]));
							}
							catch(e) {
								theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
							}
						}
						else
							theLogger.error("不支援解讀'" + param.childNodes[i].nodeName + "'");
					}
				}
			}
		}
		else {	// 從程式新增
			this.id = param.id;
			this.filePath = ("fileRef" in param)?param.fileRef.name:param.fileName;
			this.name = param.name;
			this.msgId = param.flowId.substr(5);
			this.keepSO = ("reserveSO" in param)?param.reserveSO:"false";	// 從暫存檔回復的文稿版本應該要有保留簽署意見資訊
		}
		function _toDateTime(t) {
			// 1100715 Raymond 1100854 新增[高大客製化]簽核物件的產生時間顯示到秒功能
			if(theUserInfo.OrgNickName == "NUK")
				return Util.padLeft(t.getYear() - 11, 3) + Util.padLeft(t.getMonth() + 1, 2) + Util.padLeft(t.getDate(), 2) + Util.padLeft(t.getHours(), 2) + Util.padLeft(t.getMinutes(), 2) + Util.padLeft(t.getSeconds(), 2);
			return Util.padLeft(t.getYear() - 11, 3) + Util.padLeft(t.getMonth() + 1, 2) + Util.padLeft(t.getDate(), 2) + Util.padLeft(t.getHours(), 2) + Util.padLeft(t.getMinutes(), 2);
		}
		this.restoreSignObj = function(so) {	// 從SignWork.XML暫存檔回復新增的簽核物件
			theLogger.log("從SignWork.XML暫存檔回復新增的簽核物件 - ");
			if(typeof so.id === "string" && so.id.match(/X_\d+/)) {	// 新增暫時物件ID, 要檢查是否已記錄
				var res = _xSignFolder.findSignObjById(so.id);	// 找所有文稿所有版本
				if(!!res && res.length > 0) {
					theLogger.warn("簽核物件ID:" + so.id + "已存在記錄檔, 忽略新增");
					// TODO: 比對left、top等屬性若有不同的話, 應修正外部記錄
					// 理論上同ID的暫存新增物件只有一個, 若有多個的話, 可能是公文有問題(傳送失敗etc...)
					if(res.length == 1) {
						if(typeof res[0].ref === "undefined")	// 設定實際簽核物件關聯
							res[0].ref = so;
						// 1100517 Raymond 1100298 新增取代他流程文字意見屬性
						else
							console.assert(res[0].ref === so);
					}
					else {
						theLogger.error("暫時簽核物件不應存在2個以上文稿版本(" + res.length + ")");
					}
					return;
				}
			}
			else {	// 舊的暫時物件ID, 要改成新的ID
				var oldId = so.id;
				so.id = _xSignFolder.newSOID();
				theLogger.warn("ID由'" + oldId + "'改為'" + so.id);
			}
			var param = {
				id: so.id,
				msgId: _docObj.msgId,
				time: _toDateTime(so.cTime)
			};
			if("signArea" in so) {	// 簽核框內物件
				param.type = "A";
				param.saType = so.signArea.saType;
				param.saID = so.signArea.id;
				param.offsetX = Math.ceil(so.offset.left * 2480 / 794);
				param.offsetY = Math.ceil(so.offset.top * 3507 / 1123);
			}
			else if("saType" in so && "saID" in so && SSOUtil.typeOf(so.saID) == "string") {	// 2017.3.6 bugfix, 儲存後重新載入時so未bind signArea只能用saType, saID判斷, 航港-序514、507
				param.type = "A";
				param.saType = so.saType;
				param.saID = so.saID;	// 2017.3.7 bugfix
				param.offsetX = Math.ceil(so.offset.left * 2480 / 794);
				param.offsetY = Math.ceil(so.offset.top * 3507 / 1123);
			}
			else {	// 簽核框外物件
				param.type = "B";
				param.pgIdx = so.boundTo.po;
				// 1080802 Raymond 修正簽核框外簽核物件座標儲存後關閉再開啟, 會變成SignWork.xml的數值, 應該為頁面影像(2480X3507)規模的數值
				//param.posX = so.pos.left;
				//param.posY = so.pos.top;
				param.posX = Math.ceil(so.pos.left * 2480 / 794);
				param.posY = Math.ceil(so.pos.top * 3507 / 1123);
				if("size" in so) {
					param.width = so.size.width;
					param.height = so.size.height;
				}
				else {
					if("width" in so)
						param.width = so.width;
					if("height" in so)
						param.height = so.height;
				}
			}
			this.xSignObjs.push(new XSignObj(this, param, so));
		}
		this.addSignObj = function(cmt) {
			theLogger.log("新增簽核物件 - ID:" + cmt.so.id);
			var param = {
				id: cmt.so.id,
				msgId: _docObj.msgId,
				time: _toDateTime(cmt.so.cTime)
			};
			if("signArea" in cmt.so && cmt.so.signArea.id != "") {	// 簽核框內物件, 2017.2.17 簽核區域ID為空表示無效區域
				param.type = "A";
				param.saType = cmt.so.signArea.saType;
				param.saID = cmt.so.signArea.id;
				param.offsetX = Math.ceil(cmt.so.offset.left * 2480 / 794);
				param.offsetY = Math.ceil(cmt.so.offset.top * 3507 / 1123);
			}
			else {	// 簽核框外物件
				param.type = "B";
				param.pgIdx = cmt.so.boundTo.po;
				// 1060718 Raymond 1060610/1060632 修正儲存到外部簽核記錄檔的座標應為頁面解析度
				//param.posX = cmt.so.pos.left;
				//param.posY = cmt.so.pos.top;
				param.posX = Math.ceil(cmt.so.pos.left * 2480 / 794);
				param.posY = Math.ceil(cmt.so.pos.top * 3507 / 1123);
				if("size" in cmt.so) {
					param.width = cmt.so.size.width;
					param.height = cmt.so.size.height;
				}
				else {
					if("width" in cmt.so)
						param.width = cmt.so.width;
					if("height" in cmt.so)
						param.height = cmt.so.height;
				}
			}
			// 檢核簽核物件是否有重複ID的情形
			if(_isDupXSignObj(param)) {
				theLogger.error("簽核物件ID:" + param.id + "重複!");
				alert("簽核物件ID:" + param.id + "重複!");
			}
			else
				this.xSignObjs.push(new XSignObj(this, param, cmt.so));
		}
		this.delSignObj = function(so) {
			theLogger.log("刪除新增的簽核物件 - ID:" + so.id);
			for(var i=0; i<this.xSignObjs.length; i++) {
				if(this.xSignObjs[i].id == so.id) {
					this.xSignObjs.splice(i, 1);
					theLogger.log("成功")
					return;
				}
			}
			theLogger.error("此版本(ID:" + this.id +")找不到指定的新簽核物件, 無法刪除");
		}
		this.getSignObj = function(so) {
			for(var i=0; i<this.xSignObjs.length; i++) {
				if(this.xSignObjs[i].id == so.id)
					return this.xSignObjs[i];
			}
			return null;
		}
		this.findSignObjById = function(id) {
			var res = [];
			for(var i=0; i<this.xSignObjs.length; i++) {
				if(this.xSignObjs[i].id == id)
					res.push(this.xSignObjs[i]);
			}
			return res;
		}
		this.clearUnreferencedSignObjs = function() {	// 清除外部簽核物件記錄檔中未關聯封裝檔或暫存檔的簽核物件
			for(var i=this.xSignObjs.length-1; i>=0; i--) {
				if(!this.xSignObjs[i].ref) {	// 2017.3.6 fix
					theLogger.warn("刪除未關聯實際簽核物件的記錄(ID:" + this.xSignObjs[i].id + ")");
					this.xSignObjs.splice(i, 1);
				}
			}
		}
		this.updateSignObj = function(so) {
			for(var i=0; i<this.xSignObjs.length; i++) {
				if(this.xSignObjs[i].id == so.id) {
					if(this.xSignObjs[i].type == "B" && "signArea" in so) {	// 類型從區域外變區域內物件
						theLogger.warn("簽核物件(ID:" + so.id + ")類型從區域外變區域內");
						this.xSignObjs[i].type = "A";
						this.xSignObjs[i].saType = so.signArea.saType;
						this.xSignObjs[i].saID = so.signArea.id;
						this.xSignObjs[i].offset = {
							x:Math.ceil(so.offset.left * 3507 / 1123),
							y:Math.ceil(so.offset.top * 3507 / 1123)};
					}
					else if(this.xSignObjs[i].type == "A" && !("signArea" in so)) {	// 類型從區域內變區域外物件
						theLogger.warn("簽核物件(ID:" + so.id + ")類型從區域內變區域外");
						this.xSignObjs[i].type = "B";
						this.xSignObjs[i].pgIdx = so.boundTo.po;
						this.xSignObjs[i].pos = {
							x: Math.ceil(so.pos.left * 3507 / 1123),	// 2017.2.6 bugfix
							y: Math.ceil(so.pos.top * 3507 / 1123)};
						if("size" in so) {
							this.xSignObjs[i].width = so.size.width;
							this.xSignObjs[i].height = so.size.height;
						}
						else {
							if("width" in so)
								this.xSignObjs[i].width = so.width;
							if("height" in so)
								this.xSignObjs[i].height = so.height;
						}
					}
					else {	// 位置更新
						if(this.xSignObjs[i].type == "A") {
							if(this.xSignObjs[i].saType == so.signArea.saType && this.xSignObjs[i].saID == so.signArea.id) {
								this.xSignObjs[i].offset.x = Math.ceil(so.offset.left * 2480 / 794);
								this.xSignObjs[i].offset.y = Math.ceil(so.offset.top * 3507 / 1123);
							}
							else {
								theLogger.warn("簽核物件(ID:" + so.id + ")類型從區域(" + this.xSignObjs[i].saType + "|" + this.xSignObjs[i].saID + ")內變另一個區域(" + so.signArea.saType + "|" + so.signArea.id + ")內");
								this.xSignObjs[i].saType = so.signArea.saType;
								this.xSignObjs[i].saID = so.signArea.id;
								this.xSignObjs[i].offset.x = Math.ceil(so.offset.left * 2480 / 794);
								this.xSignObjs[i].offset.y = Math.ceil(so.offset.top * 3507 / 1123);
							}
						}
						else {
							this.xSignObjs[i].pgIdx = so.boundTo.po;
							this.xSignObjs[i].pos.x = Math.ceil(so.pos.left * 2480 / 794);
							this.xSignObjs[i].pos.y = Math.ceil(so.pos.top * 3507 / 1123);
							if("size" in so) {
								this.xSignObjs[i].width = so.size.width;
								this.xSignObjs[i].height = so.size.height;
							}
							else {
								if("width" in so)
									this.xSignObjs[i].width = so.width;
								if("height" in so)
									this.xSignObjs[i].height = so.height;
							}
						}
					}
					return true;
				}
			}
		}
	}
	function XDraft(param) {
		this.xDraftVers = [];
		this.xHideComments = [];	// 1111024 Raymond 1110864 合併1101468, 新增啟用分文稿記錄簽核意見功能時, 各流程點的隱藏簽辦意見設定值
		
		if("nodeName" in param) {	// 從XML產生
			this.guid = param.getAttribute("guid");	// GUID才是KEY, 因為草稿時不會有封裝檔中記錄的ID
			theLogger.warn(param.nodeName + ": {guid:" + this.guid + "}");
			
			if(param.childNodes.length > 0) {
				for(var i=0; i<param.childNodes.length; i++) {
					if(param.childNodes[i].nodeType == 1) {
						if(param.childNodes[i].nodeName == "版本")
							this.xDraftVers.push(new XDraftVer(this, param.childNodes[i]));
						// 1111024 Raymond 1110864 合併1101468, 新增從<文稿>下讀取<隱藏簽辦意見>
						else if(param.childNodes[i].nodeName == "隱藏簽辦意見") {
							// 1111024 Raymond 1110864 合併1101468, 判斷記錄的msgId是否超過目前流程點, 若是則可能是異動撤消, 應忽略
							if(parseInt(param.childNodes[i].getAttribute("msgId")) <= parseInt(_docObj.msgId))
								this.xHideComments.push(new XHideComment(param.childNodes[i]));
							else
								theLogger.warn("此<隱藏簽辦意見>的msgId(" + param.childNodes[i].getAttribute("msgId") + ")超過目前流程點, 應是異動撤消造成, 忽略此筆記錄");
						}
						else
							theLogger.error("不支援解讀'" + param.childNodes[i].nodeName + "'");
					}
				}
			}
		}
		else {	// 從程式新增
			this.guid = param.guid;
			this.xDraftVers.push(new XDraftVer(this, param));
		}
		this.addVer = function(d) {
			if(d.guid != this.guid)
				theLogger.error("addVer()錯誤! 此文稿(" + this.guid + ")不可新增其它文稿(" + d.guid + ")的版本");
			else {
				for(var i=0; i<this.xDraftVers.length; i++) {
					if(this.xDraftVers[i].id == d.id) {
						theLogger.warn("文稿(" + this.guid + ")版本(" + d.id + ")重複");
						// 1090804 Raymond 1090409 修改xDraftVer的keepSO與d.reserveSO設定一致, 以支援保留轉抄本頁面之前流程點的保留簽核物件
						theLogger.log("xDraftVer.keepSO = " + this.xDraftVers[i].keepSO + " -> " + d.reserveSO);
						this.xDraftVers[i].keepSO = d.reserveSO;
						return;
					}
					// 1060711 Raymond 1060526 分文後創稿傳送失敗, 開啟暫存再開啟時, 會有目前流程點MsgId的版本但ID與封裝檔不一致的情況發生, 須過濾掉不可重複新增版本, 以免發生同ID(NewDraft1)須保留簽署物件又搜尋到同ID的前一版本, 又再保留簽署物件, 而形成的無窮迴圈問題
					//else if(this.xDraftVers[i].msgId == theAOL.docObj.msgId) {
					else if(this.xDraftVers[i].msgId == _docObj.msgId) {	// 1090608 Raymond 1090103 對此封裝檔而言當前MsgID應為_docObj.msgId而非theAOL.docObj.msgId
						theLogger.warn("文稿(" + this.guid + ")版本(" + this.xDraftVers[i].id + ")與目前流程點的MsgID重複但ID與封裝檔記錄不一致, 應是傳送失敗儲存再開啟的案例, 修復此版本的ID為'" + d.id + "'");
						this.xDraftVers[i].id = d.id;
						return;
					}
				}
				theLogger.log("新增文稿(" + this.guid + ")版本 - id:" + d.id);
				this.xDraftVers.push(new XDraftVer(this, d));
				return this.xDraftVers[this.xDraftVers.length - 1];
			}
		}
		this.getVer = function(id) {
			for(var i=0; i<this.xDraftVers.length; i++) {
				if(this.xDraftVers[i].id == id)
					return this.xDraftVers[i];
			}
			return null;
		}
		this.getPrevVer = function(id) {	// 取得指定ID的前一個XDraftVer
			for(var i=1; i<this.xDraftVers.length; i++) {
				if(this.xDraftVers[i].id == id)
					return this.xDraftVers[i-1];
			}
			return null;
		}
		this.getLastVer = function() {	// 2017.2.22 新增當前版本
			if(this.xDraftVers.length > 0)
				return this.xDraftVers[this.xDraftVers.length - 1];
			return null;
		}
		this.restoreSignObj = function(so) {	// 從SignWork暫存檔回復新增簽核物件一定是加在最後版本
			this.xDraftVers[this.xDraftVers.length - 1].restoreSignObj(so);
		}
		this.addSignObj = function(so) {	// 新增簽核物件一定是加在最後版本
			this.xDraftVers[this.xDraftVers.length - 1].addSignObj(so);
		}
		this.delSignObj = function(so) {	// 刪除新增的簽核物件一定是位於最後版本
			this.xDraftVers[this.xDraftVers.length - 1].delSignObj(so);
		}
		this.findSignObjById = function(id) {	// 找各版本同ID的簽核物件
			var res = [];
			for(var i=0; i<this.xDraftVers.length; i++) {
				var r = this.xDraftVers[i].findSignObjById(id);
				if(!!r)
					res = res.concat(r);
			}
			return res;
		}
		this.clearUnreferencedSignObjs = function() {	// 清除外部簽核物件記錄檔中未關聯封裝檔或暫存檔的簽核物件
			for(var i=0; i<this.xDraftVers.length; i++) {
				this.xDraftVers[i].clearUnreferencedSignObjs();
			}
		}
		this.updateSignObj = function(so) {
			return this.xDraftVers[this.xDraftVers.length - 1].updateSignObj(so);	// 一定是最後一個版本才有更新簽核物件類型及位置的可能
		}
		this.getHideComment = function(msgId) {	// 1111024 Raymond 1110864 合併1101468, 新增啟用啟用分文稿記錄簽核意見功能時, 依msgId搜尋<隱藏簽辦意見>功能
			for(var i=0; i<this.xHideComments.length; i++) {
				if(this.xHideComments[i].msgId == msgId) {
					return this.xHideComments[i];
				}
			}
			return null;
		}
		this.addHideComment = function(msgId, account, value) {	// 1111024 Raymond 1110864 合併1101468, 新增啟用啟用分文稿記錄簽核意見功能時, 舊XSignObjs.xml無之前msgId的<隱藏簽辦意見>時, 新增
			this.xHideComments.push(new XHideComment(msgId, account, value));
		}
		// 1130125 Raymond 1120887 搜尋前一個分會流程點的最後版本
		this.getPrevDispatchVer = function(id) {
			let thisVer;
			for(var i=0; i<this.xDraftVers.length; i++) {
				if(this.xDraftVers[i].id == id) {
					thisVer = this.xDraftVers[i];
					break;
				}
			}
			// 從封裝檔判斷是否為分會流程點
			let r = _revs["sign_" + thisVer.msgId];
			if(!!r && !!r.refFlow && !!r.refFlow.dispatchNode) {	// 此流程點是分會流程點
				if(!!r.refFlow.dispatchNode.flows) {
					theLogger.log("此流程點(sign_" + thisVer.msgId + ")為分會流程點");
					for(let j=0; j<r.refFlow.dispatchNode.flows.length; j++) {
						if(!!r.refFlow.dispatchNode.flows[j].refChangeInfo) {	// 無對應<異動資訊>的流程點為封裝不加簽的流程點(ex.分辦), 在XSignObjs.xml也不會記錄, 須略過
							theLogger.log("搜尋外部簽核記錄檔中是否有'" + r.refFlow.dispatchNode.flows[j].id + "'的對應版本");
							let msgId = r.refFlow.dispatchNode.flows[j].id.substr(5);	// 去掉前5個字"FLOW_", 即為此流程點的msgId
							for(let k=i; k>=0; k--) {	// 從指定的分會流程點往前搜尋
								if(this.xDraftVers[k].msgId == msgId) {	// 找到分會流程點中的第1個流程點
									if(k > 0) {
										theLogger.log("找到分會流程點中第" + j + "個流程點(" + msgId + ")有存於外部簽核記錄檔的對應版本, 回傳其前一個版本(msgId=" + this.xDraftVers[k - 1].msgId + ")");
										return this.xDraftVers[k - 1];
									}
									else {
										theLogger.error("找到分會流程點中第" + j + "個流程點(" + msgId + ")有存於外部簽核記錄檔的版本, 但已無前一個版本");
										return null;
									}
								}
							}
							theLogger.warn("外部簽核記錄檔中找不到msgId為'" + msgId + "'的版本, 可能是未異動內文?");
						}
						else
							console.log("忽略無對應<異動資訊>的流程點'" + r.refFlow.dispatchNode.flows[j].id + "'");
					}
					theLogger.error("此分會流程點(sign_" + thisVer.msgId + ")下的流程點, 在外部簽核記錄檔中找不到對應的版本!");
				}
				else {
					if(!!r.refFlow.dispatchNode.parentFlow)
						theLogger.error("此流程點(sign_" + thisVer.msgId + ")為分會流程點但分會節點(" + r.refFlow.dispatchNode.parentFlow.id + ")下無任何流程點資訊! 封裝結構有問題!");
					else
						theLogger.error("此流程點(sign_" + thisVer.msgId + ")為分會流程點但分會節點下無任何流程點資訊! 封裝結構有問題!");
				}
			}
			return null;
		}
	}
	// 1110114 Raymond 1101464 新增流程點簽核人員
	function XFlowSigner(param) {
		if("nodeName" in param) {	// 從XML產生
			this.msgId = param.getAttribute("msgId");						// MsgID
			this.ouId = param.getAttribute("ouId");							// 單位代碼
			this.ou = param.getAttribute("ou");								// 單位
			this.roleId = param.getAttribute("roleId");						// 角色代碼
			this.role = param.getAttribute("role");							// 角色
			this.title = param.getAttribute("title");						// 職稱
			if(!!param.getAttribute("proxyUserId"))
				this.proxyUserId = param.getAttribute("proxyUserId");		// 被代理人帳號
			if(!!param.getAttribute("proxyUserName"))
				this.proxyUserName = param.getAttribute("proxyUserName");	// 被代理人姓名
			if(!!param.getAttribute("proxyOUId"))
				this.proxyOUId = param.getAttribute("proxyOUId");			// 被代理人單位代碼
			if(!!param.getAttribute("proxyOU"))
				this.proxyOU = param.getAttribute("proxyOU");				// 被代理人單位
			if(!!param.getAttribute("proxyRoleId"))
				this.proxyRoleId = param.getAttribute("proxyRoleId");		// 被代理人角色代碼
			if(!!param.getAttribute("proxyRole"))
				this.proxyRole = param.getAttribute("proxyRole");			// 被代理人角色
			if(!!param.getAttribute("proxyTitle"))
				this.proxyTitle = param.getAttribute("proxyTitle");			// 被代理人職稱
			this.txName = param.getAttribute("txName");						// 額外記錄異動別
			this.txTime = param.getAttribute("txTime");						// 額外記錄傳送時間
			// 1111024 Raymond 1110864 合併1101468, 新增從<流程點簽核人員>讀入隱藏簽辦意見(僅顯示我的最終意見)設定值
			if(!!param.getAttribute("hideComment"))
				this.hideComment = param.getAttribute("hideComment");		// 隱藏此流程點的簽辦意見
			if(!!param.getAttribute("account"))
				this.account = param.getAttribute("account");				// 此流程點當時儲存的帳號
		}
		else
			throw new Error("XFlowSigner無法從XMLNode以外的來源產生");
	}
	// 1110114 Raymond 1101464 新增隱藏簽辦意見
	function XHideComment(param) {
		if(arguments.length >= 2) {	// 從參數新增
			this.msgId = arguments[0];		// 第1個參數是msgId
			this.account = arguments[1];	// 第2個參數是帳號
			if(!!arguments[2])
				this.value = arguments[2];	// 第3個參數是value
		}
		else if("nodeName" in param) {	// 從XML產生
			this.msgId = param.getAttribute("msgId");						// MsgID
			if(!!param.getAttribute("account"))
				this.account = param.getAttribute("account");				// 此流程點當時儲存的帳號
			if("text" in param && !!param.text && param.text.length > 0)
				this.value = param.text;									// 隱藏此流程點的簽辦意見(IE)
			else if(!!param.textContent && param.textContent.length > 0)
				this.value = param.textContent;								// 隱藏此流程點的簽辦意見(Chrome)
		}
		else
			throw new Error("XHideComment無法從XMLNode以外的來源產生或參數不正確");
	}
	// 1120221 Raymond 1111225 新增內部意見
	function XInnerCmt(parent, param) {
		this.parent = parent;	// parent是XInnerCmtColl
		
		if("nodeName" in param) {	// 從XML產生
			if(!!param.getAttribute("URI"))
				this.uri = param.getAttribute("URI");			// 文稿URI
			this.text = param.text || param.textContent;		// 文字內容
			theLogger.warn(param.nodeName + ": " + (!!this.uri?"{uri:" + this.uri + "}":"") + "'" + this.text + "'");
		}
		else {	// 從程式新增
			if(!!param.uri)
				this.uri = param.uri;
			this.text = param.text;
		}
	}
	function XInnerCmtFlow(parent, param) {
		this.parent = parent;	// parent是XInnerCmtColl
		this.xInnerCmts = [];
		
		if("nodeName" in param) {	// 從XML產生
			this.msgId = param.getAttribute("msgid");			// 產生點資訊
			this.ownOUId = param.getAttribute("ownOUId");		// 封裝檔的ID
			theLogger.warn(param.nodeName + ": {msgid:" + this.msgId + ", ownOUId:" + this.ownOUId + "}");
			
			if(param.childNodes.length > 0) {
				for(var i=0; i<param.childNodes.length; i++) {
					if(param.childNodes[i].nodeType == 1) {
						if(param.childNodes[i].nodeName == "意見文字")
							this.xInnerCmts.push(new XInnerCmt(this, param.childNodes[i]));
						else
							theLogger.error("不支援解讀'" + param.childNodes[i].nodeName + "'");
					}
				}
			}
		}
		else {	// 從程式新增
			this.msgId = param.msgId;
			this.ownOUId = param.ownOUId;
		}
		this.addCmt = function(txt, uri) {
			if(!!uri) {
				for(var i=0; i<this.xInnerCmts.length; i++) {
					if(this.xInnerCmts[i].uri == uri) {
						theLogger.log("重設內部意見 - uri:" + uri + ", txt:'" + txt + "'");
						this.xInnerCmts[i].text = txt;
						return;
					}
				}
				theLogger.log("新增內部意見 - uri:" + uri + ", txt:'" + txt + "'");
				this.xInnerCmts.push(new XInnerCmt(this, {uri: uri, text: txt}));
			}
			else {
				if(this.xInnerCmts.length) {
					theLogger.log("重設內部意見 - txt:'" + txt + "'");
					this.xInnerCmts[0].text = txt;
				}
				else {
					theLogger.log("新增內部意見 - txt:'" + txt + "'");
					this.xInnerCmts.push(new XInnerCmt(this, {text: txt}));
				}
			}
		}
		this.getCmt = function(uri) {
			if(!!uri) {
				for(var i=0; i<this.xInnerCmts.length; i++) {
					if(this.xInnerCmts[i].uri == uri) {
						theLogger.log("取得內部意見(uri:" + uri + "):'" + this.xInnerCmts[i].text + "'");
						return this.xInnerCmts[i].text;
					}
				}
			}
			else {
				if(this.xInnerCmts.length) {
					theLogger.log("取得內部意見:'" + this.xInnerCmts[0].text + "'");
					return this.xInnerCmts[0].text;
				}
				else {
					theLogger.log("此流程點尚未設定過內部意見");
					return "";
				}
			}
			return;
		}
	}
	function XInnerCmtColl(param) {
		this.xInnerCmtFlows = [];
		
		if("nodeName" in param) {	// 從XML產生
			theLogger.log(param.nodeName + ": {}");
			
			if(param.childNodes.length > 0) {
				for(var i=0; i<param.childNodes.length; i++) {
					if(param.childNodes[i].nodeType == 1) {
						if(param.childNodes[i].nodeName == "流程點")
							this.xInnerCmtFlows.push(new XInnerCmtFlow(this, param.childNodes[i]));
						else
							theLogger.error("不支援解讀'" + param.childNodes[i].nodeName + "'");
					}
				}
			}
		}
		//else {	// 從程式新增	空的內部意見不需要至少一筆流程點
		//	this.xInnerCmtFlows.push(new XInnerCmtFlow(this, param));
		//}
		this.addFlow = function(param) {
			for(var i=0; i<this.xInnerCmtFlows.length; i++) {
				if(this.xInnerCmtFlows[i].msgId == param.msgId) {
					theLogger.warn("既有內部意見流程點(" + this.xInnerCmtFlows[i].msgId + ")(ownOUId:" + this.xInnerCmtFlows[i].ownOUId + "與目前流程點的MsgID一致(ownOUId:" + param.ownOUId + ")");
					return this.xInnerCmtFlows[i];
				}
			}
			theLogger.log("新增內部意見流程點 - msgId:" + param.msgId + ", ownOUId:" + param.ownOUId);
			this.xInnerCmtFlows.push(new XInnerCmtFlow(this, param));
			return this.xInnerCmtFlows[this.xInnerCmtFlows.length - 1];
		}
		this.addCmt = function(txt, uri) {
			var flw = this.addFlow({msgId: _docObj.msgId, ownOUId: _docObj.ownOUId});
			flw.addCmt(txt, uri);
		}
		function sameLv1OU(ouA, ouB) {
			if(typeof ouA === "string" && typeof ouB === "string") {
				if(!!sso_const && !!sso_const.FIRSTCLASS_UNITNO_LEN)
					return ouA.substr(0, sso_const.FIRSTCLASS_UNITNO_LEN) == ouB.substr(0, sso_const.FIRSTCLASS_UNITNO_LEN);
				else
					return ouA.substr(0, 2) == ouB.substr(0, 2);
			}
			return false;
		}
		this.findFlows = function(ownOUId) {
			var res = [];
			for(var i=0; i<this.xInnerCmtFlows.length; i++) {
				if(sameLv1OU(this.xInnerCmtFlows[i].ownOUId, ownOUId)) {
					theLogger.warn("流程點(" + this.xInnerCmtFlows[i].msgId + ")ownOUId(" + this.xInnerCmtFlows[i].ownOUId + ")與指定ownOUId(" + ownOUId + ")為同一級單位");
					res.push(this.xInnerCmtFlows[i]);
				}
			}
			return res;
		}
		this.getFlow = function(msgId) {
			for(var i=0; i<this.xInnerCmtFlows.length; i++) {
				if(this.xInnerCmtFlows[i].msgId == msgId) {
					theLogger.log("找到指定流程點的內部意見(msgId:" + this.xInnerCmtFlows[i].msgId + ", ownOUId:" + this.xInnerCmtFlows[i].ownOUId + ")");
					return this.xInnerCmtFlows[i];
				}
			}
			theLogger.log("外部簽核記錄檔中找不到指定的流程點(msgId:" + msgId + ")");
			return null;
		}
		this.getCurrFlow = function() {
			for(var i=0; i<this.xInnerCmtFlows.length; i++) {
				if(this.xInnerCmtFlows[i].msgId == _docObj.msgId) {
					theLogger.log("找到目前流程點的內部意見(msgId:" + this.xInnerCmtFlows[i].msgId + ", ownOUId:" + this.xInnerCmtFlows[i].ownOUId + ")");
					return this.xInnerCmtFlows[i];
				}
			}
			theLogger.log("外部簽核記錄檔中找不到目前流程點(msgId:" + _docObj.msgId + ")");
			return null;
		}
	}
	function XSignFolder() {
		var _xDrafts = [];
		var _newSOSN = 0;
		var _acceptVers = ["1.0"];	// 2017.1.19 允許載入的記錄檔版本
		var _reserveSO = true;		// 2017.2.15 新增保留簽署物件記錄
		var _xRuntimeDrafts = [];	// 1060504 Raymond 新增更新簽核區域用的文稿物件
		var _missingXSignObjs = [];	// 1110620 Raymond 1110579 新增_missingXSignObjs, 異動撤消後記錄在XSignObjs.xml中但在封裝檔中找不到的簽核物件
		var _xFlowSigners = [];		// 1111025 Raymond 1110864 合併1101464, 新增記錄簽核點簽核人員
		var _xInnerCmtColl;			// 1120221 Raymond 1111225 新增內部意見
		if(theSSO.User.EnvSettings.get("AOL_ENABLE_INNERCOMMENT") == "Y")
			_xInnerCmtColl = new XInnerCmtColl({});
		
		return {
			load: function(doc, msgId) {	// 2017.2.17 新增傳入目前流程點的msgId以供判斷是否讀入保留簽署物件設定
				theLogger.warn("匯入外部簽核物件記錄檔...");
				var v = doc.documentElement.getAttribute("version");
				if(typeof v === "string" && _acceptVers.indexOf(v) >= 0) {	// 2017.1.19 判讀version屬性是允許載入的版本才繼續載入
					if(doc.documentElement.getAttribute("最後儲存msgId") != null) {
						if(doc.documentElement.getAttribute("最後儲存msgId") == msgId) {
							theLogger.log("最後儲存msgId為目前流程點一致, 繼續讀入保留簽署物件屬性");
							if(doc.documentElement.getAttribute("保留簽署物件") != null) {	// 2017.2.15 載入前次儲存的保留簽署物件設定
								theLogger.log("前次儲存的保留簽署物件設定為'" + _reserveSO + "'");
								_reserveSO = doc.documentElement.getAttribute("保留簽署物件") == "true";
							}
						}
						else
							theLogger.log("最後儲存msgId為目前流程點不一致, 忽略前次儲存的保留簽署物件屬性");
					}
					for(var i=0; i<doc.documentElement.childNodes.length; i++) {
						if(doc.documentElement.childNodes[i].nodeType == 1) {
							if(doc.documentElement.childNodes[i].nodeName == "文稿") {
								_xDrafts.push(new XDraft(doc.documentElement.childNodes[i]));
							}
							// 1111024 Raymond 1110864 合併1101464, 新增讀取"流程點簽核人員"
							else if(doc.documentElement.childNodes[i].nodeName == "流程點簽核人員") {
								// 1111024 Raymond 1110864 合併1101468, 判斷記錄的msgId是否超過目前流程點, 若是則可能是異動撤消, 應忽略
								if(parseInt(doc.documentElement.childNodes[i].getAttribute("msgId")) <= parseInt(_docObj.msgId))
									_xFlowSigners.push(new XFlowSigner(doc.documentElement.childNodes[i]));
								else
									theLogger.warn("此<流程點簽核人員>的msgId(" + doc.documentElement.childNodes[i].getAttribute("msgId") + ")超過目前流程點, 應是異動撤消造成, 忽略此筆記錄");
							}
							// 1120221 Raymond 1111225 新增支援內部意見記錄功能
							else if(doc.documentElement.childNodes[i].nodeName == "內部意見") {
								_xInnerCmtColl = new XInnerCmtColl(doc.documentElement.childNodes[i]);
							}
							else
								theLogger.error("不支援解讀'" + doc.documentElement.childNodes[i].nodeName + "'");
						}
					}
				}
			},
			
			// 1060724 Raymond 1060604 新增檢查簽核物件座標是否差異太大
			verifySavable: function() {
				var res = {pass: true, msg: ""};
				for(var i=0; i<_xDrafts.length; i++) {
					for(var j=0; j<_xDrafts[i].xDraftVers.length; j++) {
						for(var k=0; k<_xDrafts[i].xDraftVers[j].xSignObjs.length; k++) {	// 第3層簽核物件
							if(_xDrafts[i].xDraftVers[j].xSignObjs[k].type == "A") {
								// 1080805 Raymond 1080593 修正檢核簽核物件超出範圍太遠功能, 若簽核框在頁面右側, 雖簽核物件未超出頁面範圍但已超出簽核框範圍造成誤判, 而不能儲存的問題
								var pos;
								for(var l=0; l<_xDrafts[i].xDraftVers[j].xSignAreas.length; l++) {
									if(_xDrafts[i].xDraftVers[j].xSignAreas[l].saType == _xDrafts[i].xDraftVers[j].xSignObjs[k].saType &&
										_xDrafts[i].xDraftVers[j].xSignAreas[l].saID == _xDrafts[i].xDraftVers[j].xSignObjs[k].saID) {
										pos = { x: parseInt(_xDrafts[i].xDraftVers[j].xSignAreas[l].left) + _xDrafts[i].xDraftVers[j].xSignObjs[k].offset.x,
												y: parseInt(_xDrafts[i].xDraftVers[j].xSignAreas[l].top) + _xDrafts[i].xDraftVers[j].xSignObjs[k].offset.y};
										break;
									}
								}
								if(!pos) {
									theLogger.error("找不到此簽核物件相符的簽核區域(" + _xDrafts[i].xDraftVers[j].xSignObjs[k].saType + ", " + _xDrafts[i].xDraftVers[j].xSignObjs[k].saID + ")無法判斷距離頁面是否超出範圍");
									continue;
								}
								/* 1080805 Raymond 1080593 offset改用計算的pos取代
								if(_xDrafts[i].xDraftVers[j].xSignObjs[k].offset.x < -400) {
									theLogger.error("簽核物件(Type:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].type + ", ID:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].id + ")座標(X:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].offset.x + ")超出範圍太大");
									if("ref" in _xDrafts[i].xDraftVers[j].xSignObjs[k]) {
										var ro = _xDrafts[i].xDraftVers[j].xSignObjs[k].ref;
										res.msg += "\n簽核物件(Type:" + ro.type + ", ID:" + ro.id + ")水平座標(" + _xDrafts[i].xDraftVers[j].xSignObjs[k].offset.x + ")超出頁面範圍太遠,";
									}
									else
										res.msg += "\n簽核物件(ID:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].id + ")水平座標(" + _xDrafts[i].xDraftVers[j].xSignObjs[k].offset.x + ")超出頁面範圍太遠,";
								}
								else if(_xDrafts[i].xDraftVers[j].xSignObjs[k].offset.x < 0 || _xDrafts[i].xDraftVers[j].xSignObjs[k].offset.x > 2480)
									theLogger.warn("簽核物件(Type:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].type + ", ID:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].id + ")座標(X:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].offset.x + ")超出頁面範圍");
								
								if(_xDrafts[i].xDraftVers[j].xSignObjs[k].offset.y < -400) {
									theLogger.error("簽核物件(Type:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].type + ", ID:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].id + ")座標(Y:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].offset.y + ")超出範圍太大");
									if("ref" in _xDrafts[i].xDraftVers[j].xSignObjs[k]) {
										var ro = _xDrafts[i].xDraftVers[j].xSignObjs[k].ref;
										res.msg += "\n簽核物件(Type:" + ro.type + ", ID:" + ro.id + ")垂直座標(" + _xDrafts[i].xDraftVers[j].xSignObjs[k].offset.y + ")超出頁面範圍太遠,";
									}
									else
										res.msg += "\n簽核物件(ID:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].id + ")垂直座標(" + _xDrafts[i].xDraftVers[j].xSignObjs[k].offset.y + ")超出頁面範圍太遠,";
								}
								else if(_xDrafts[i].xDraftVers[j].xSignObjs[k].offset.y < 0 || _xDrafts[i].xDraftVers[j].xSignObjs[k].offset.y > 3570)
									theLogger.warn("簽核物件(Type:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].type + ", ID:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].id + ")座標(Y:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].offset.y + ")超出頁面範圍");*/
								if(pos.x < -400) {
									theLogger.error("簽核物件(Type:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].type + ", ID:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].id + ")座標(X:" + pos.x + ")超出範圍太大");
									if("ref" in _xDrafts[i].xDraftVers[j].xSignObjs[k]) {
										var ro = _xDrafts[i].xDraftVers[j].xSignObjs[k].ref;
										res.msg += "\n簽核物件(Type:" + ro.type + ", ID:" + ro.id + ")水平座標(" + pos.x + ")超出頁面範圍太遠,";
									}
									else
										res.msg += "\n簽核物件(ID:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].id + ")水平座標(" + pos.x + ")超出頁面範圍太遠,";
									res.pass = false;
								}
								else if(pos.x < 0 || pos.x > 2480)
									theLogger.warn("簽核物件(Type:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].type + ", ID:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].id + ")座標(X:" + pos.x + ")超出頁面範圍");
								
								if(pos.y < -400) {
									theLogger.error("簽核物件(Type:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].type + ", ID:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].id + ")座標(Y:" + pos.y + ")超出範圍太大");
									if("ref" in _xDrafts[i].xDraftVers[j].xSignObjs[k]) {
										var ro = _xDrafts[i].xDraftVers[j].xSignObjs[k].ref;
										res.msg += "\n簽核物件(Type:" + ro.type + ", ID:" + ro.id + ")垂直座標(" + pos.y + ")超出頁面範圍太遠,";
									}
									else
										res.msg += "\n簽核物件(ID:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].id + ")垂直座標(" + pos.y + ")超出頁面範圍太遠,";
									res.pass = false;
								}
								else if(pos.y < 0 || pos.y > 3570)
									theLogger.warn("簽核物件(Type:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].type + ", ID:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].id + ")座標(Y:" + pos.y + ")超出頁面範圍");
							}
							else if(_xDrafts[i].xDraftVers[j].xSignObjs[k].type == "B") {
								if(_xDrafts[i].xDraftVers[j].xSignObjs[k].pos.x < -400) {
									theLogger.error("簽核物件(Type:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].type + ", ID:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].id + ")座標(X:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].pos.x + ")超出範圍太大");
									if("ref" in _xDrafts[i].xDraftVers[j].xSignObjs[k]) {
										var ro = _xDrafts[i].xDraftVers[j].xSignObjs[k].ref;
										res.msg += "\n簽核物件(Type:" + ro.type + ", ID:" + ro.id + ")水平座標(" + _xDrafts[i].xDraftVers[j].xSignObjs[k].pos.x + ")超出頁面範圍太遠,";
									}
									else
										res.msg += "\n簽核物件(ID:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].id + ")水平座標(" + _xDrafts[i].xDraftVers[j].xSignObjs[k].pos.x + ")超出頁面範圍太遠,";
									res.pass = false;
								}
								else if(_xDrafts[i].xDraftVers[j].xSignObjs[k].pos.x < 0 || _xDrafts[i].xDraftVers[j].xSignObjs[k].pos.x > 2480)
									theLogger.warn("簽核物件(Type:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].type + ", ID:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].id + ")座標(X:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].pos.x + ")超出頁面範圍");
								
								if(_xDrafts[i].xDraftVers[j].xSignObjs[k].pos.y < -400) {
									theLogger.error("簽核物件(Type:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].type + ", ID:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].id + ")座標(Y:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].pos.y + ")超出範圍太大");
									if("ref" in _xDrafts[i].xDraftVers[j].xSignObjs[k]) {
										var ro = _xDrafts[i].xDraftVers[j].xSignObjs[k].ref;
										res.msg += "\n簽核物件(Type:" + ro.type + ", ID:" + ro.id + ")垂直座標(" + _xDrafts[i].xDraftVers[j].xSignObjs[k].pos.y + ")超出頁面範圍太遠,";
									}
									else
										res.msg += "\n簽核物件(ID:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].id + ")垂直座標(" + _xDrafts[i].xDraftVers[j].xSignObjs[k].pos.y + ")超出頁面範圍太遠,";
									res.pass = false;
								}
								else if(_xDrafts[i].xDraftVers[j].xSignObjs[k].pos.y < 0 || _xDrafts[i].xDraftVers[j].xSignObjs[k].pos.y > 3570)
									theLogger.warn("簽核物件(Type:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].type + ", ID:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].id + ")座標(Y:" + _xDrafts[i].xDraftVers[j].xSignObjs[k].pos.y + ")超出頁面範圍");
							}
						}
					}
				}
				if(!res.pass)
					res.msg += "\n請修正後再儲存。";
				return res;
			},
			
			save: function() {
				theLogger.warn("儲存外部簽核物件記錄檔...");
				//var reserveSO = theAOL.getCurrFolio().getReserveSO();	// 2017.2.15 目前的保留簽署物件設定
				var reserveSO = _fm.getReserveSO();	// 1090608 Raymond 1090103 對此封裝檔而言當前FolioModel應為_fm而非theAOL.getCurrFolio()
				if("ActiveXObject" in window) {	// for IE-compatible
					var doc = new ActiveXObject("MSXML2.DOMDocument");
					//if(!doc.loadXML("<簽核物件記錄檔 version='1.0' 保留簽署物件='" + reserveSO + "' 最後儲存msgId='" + theAOL.docObj.msgId + "'></簽核物件記錄檔>")) {	// 2017.1.19 記錄檔目前最新版本為1.0, 2017.2.15 記錄目前的保留簽署物件設定, 2017.2.17 記錄最後儲存msgId
					if(!doc.loadXML("<簽核物件記錄檔 version='1.0' 保留簽署物件='" + reserveSO + "' 最後儲存msgId='" + _docObj.msgId + "'></簽核物件記錄檔>")) {	// 1090608 Raymond 1090103 對此封裝檔而言當前MsgID應為_docObj.msgId而非theAOL.docObj.msgId
						var pe = doc.parseError;
						throw new Error(pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
					}
				}
				else
					//var doc = (new DOMParser()).parseFromString("<簽核物件記錄檔 version='1.0' 保留簽署物件='" + reserveSO + "' 最後儲存msgId='" + theAOL.docObj.msgId + "'></簽核物件記錄檔>", "text/xml");	// 2017.1.19 記錄檔目前最新版本為1.0, 2017.2.15 記錄目前的保留簽署物件設定, 2017.2.17 記錄最後儲存msgId
					var doc = (new DOMParser()).parseFromString("<簽核物件記錄檔 version='1.0' 保留簽署物件='" + reserveSO + "' 最後儲存msgId='" + _docObj.msgId + "'></簽核物件記錄檔>", "text/xml");	// 1090608 Raymond 1090103 對此封裝檔而言當前MsgID應為_docObj.msgId而非theAOL.docObj.msgId
				
				for(var i=0; i<_xDrafts.length; i++) {
					var ndD = doc.documentElement.appendChild(doc.createElement("文稿"));	// 第1層文稿
					ndD.setAttribute("guid", _xDrafts[i].guid);
					
					// 判斷文稿是否有異動, 若有異動需產生一個新版本, 並將此流程點簽核物件搬到此版本
					function findDraft(id) {
						var snfo = _revs[_currRev].obj.signInfo;
						for(var i=0; i<snfo.drafts.length; i++) {
							var draft = snfo.drafts[i];
							// 1130123 Raymond 1120887 新增判斷是否為分會合併後的文稿, 是則搜尋合併時的舊ID
							//if(draft.id == id)
							if((!!draft.dispatchMergedID && draft.dispatchMergedID == id) || draft.id == id)
								return draft;
						}
					}
					var ov = _xDrafts[i].xDraftVers[_xDrafts[i].xDraftVers.length-1];	// 最後一個版本
					//if(ov.id.indexOf("NewDraft") < 0 && ov.id.indexOf("X") < 0) {	// 只有ID是全數字的封裝後版本才要產生一個新的, 創稿或已儲存都會改成有英文的ID
					//if(ov.msgId != theAOL.docObj.msgId) {	// 2017.2.9 改成判斷此版本的msgId不是目前流程點, 就視為前一流程點, 才要產生新的版本
					if(ov.msgId != _docObj.msgId) {	// 1090608 Raymond 1090103 對此封裝檔而言當前MsgID應為_docObj.msgId而非theAOL.docObj.msgId
						var d = findDraft(ov.id);
						if(!!d) {
							if(d.dirty()) {
								// 1060904 Raymond 1060766 檢查是否可編輯, 不可編輯的文稿不應產生新版本
								//var cdm = theAOL.getCurrFolio().getCachedDM(d);
								var cdm = _fm.getCachedDM(d);	// 1090608 Raymond 1090103 對此封裝檔而言當前FolioModel應為_fm而非theAOL.getCurrFolio()
								if(!!cdm) {
									// 1141229 Raymond 1141693 新增判斷cachedDM.dirty(), 以避免因排版因素導致的簽核畫面頁數與封裝檔不一致時, 誤判為內文有異動, 而需要使用者加簽傳送的問題
									// 1141218 Raymond 北榮序453 當因為自動增高簽核區域而異動內文時, 要能儲存
									//if(cdm.getEditable()) {
									//if(cdm.getEditable() || cdm.changedForSALP()) {
									if(cdm.dirty() && (cdm.getEditable() || cdm.changedForSALP())) {
										theLogger.warn("文稿(ID:" + ov.id + ")已異動內容, 應產生一個新版本");
										var param = {
											guid: d.guid,
											id: d.id + "X",
											name: d.name,
											//flowId: "sign_" + theAOL.docObj.msgId,
											flowId: "sign_" + _docObj.msgId,	// 1090608 Raymond 1090103 對此封裝檔而言當前MsgID應為_docObj.msgId而非theAOL.docObj.msgId
											reserveSO: reserveSO?"true":"false"
										};
										// 1100607 Raymond 國教院序37 修正簽稿會核單/會辦單文別的更新文稿的保留簽署意見flag設置條件(1080785+1090409衍生問題)
										if(reserveSO && (d.docType == "簽稿會核單" || d.docType == "會辦單"))
											param.reserveSO = (theSSO.User.EnvSettings.get("WE_ALLOW_CON_KEEP_SIGNOBJ") == "Y")?"true":"false";
										if("fileRef" in d && !!d.fileRef)
											param.fileRef = d.fileRef;
										else
											param.fileName = d.fileName;
										var nv = _xDrafts[i].addVer(param);
										if(!!nv) {
											theLogger.warn("新增版本成功, ID為'" + param.id + "'");
									//var cdm = theAOL.getCurrFolio().getCachedDM(d);	// 1060904 Raymond 1060766 移至上方以增加可編輯判斷
									//if(!!cdm) {
											if(!!cdm.signAreas) {
												for(var j=0; j<cdm.signAreas.length; j++) {
													var sa = cdm.signAreas[j];
													var param = {
														pgIdx: sa.po,
														pgId: undefined,
														saType: sa.saType,
														saID: sa.id,
														left: Math.floor(Math.floor(sa.left) * 2480 / 794),
														top: Math.floor(Math.floor(sa.top) * 3507 / 1123),
														right: Math.floor(Math.floor(sa.left + sa.width) * 2480 / 794),
														bottom: Math.floor(Math.floor(sa.top + sa.height) * 3507 / 1123)
													};
													if(sa.po < d.draftPages.pages.length) {
														param.pgId = d.draftPages.pages[sa.po].id;
													}
													if(typeof param.pgId === "undefined")
														theLogger.error("找不到簽核區域#" + j + "所在頁次" + param.pgIdx + "的頁面ID");
													nv.xSignAreas.push(new XSignArea(nv, param));
												}
											}
											// 1060420 Raymond 前一次儲存的記錄在draft(封裝檔)物件
											else if(!!d.signAreas) {
												theLogger.log(d.signAreas);
												for(var j=0; j<d.signAreas.length; j++) {
													var sa = d.signAreas[j];
													var param = {
														pgIdx: sa.po,
														pgId: undefined,
														saType: sa.saType,
														saID: sa.id,
														left: Math.floor(Math.floor(sa.left) * 2480 / 794),
														top: Math.floor(Math.floor(sa.top) * 3507 / 1123),
														right: Math.floor(Math.floor(parseInt(sa.left) + parseInt(sa.width)) * 2480 / 794),
														bottom: Math.floor(Math.floor(parseInt(sa.top) + parseInt(sa.height)) * 3507 / 1123)
													};
													if(sa.po < d.draftPages.pages.length) {
														param.pgId = d.draftPages.pages[sa.po].id;
													}
													if(typeof param.pgId === "undefined")
														theLogger.error("找不到簽核區域#" + j + "所在頁次" + param.pgIdx + "的頁面ID");
													nv.xSignAreas.push(new XSignArea(nv, param));
												}
											}
											else
												theLogger.warn("此文稿無簽核區域資訊");
									//}
									//else
									//	theLogger.error("此文稿尚未載入!?");
										
											for(var j=0; j<ov.xSignObjs.length; j++) {
												//if(ov.xSignObjs[j].msgId == theAOL.docObj.msgId) {
												if(ov.xSignObjs[j].msgId == _docObj.msgId) {	// 1090608 Raymond 1090103 對此封裝檔而言當前MsgID應為_docObj.msgId而非theAOL.docObj.msgId
													theLogger.warn("移動本流程點新增的簽核物件(ID:" + ov.xSignObjs[j].id + ")至新增版本");
													nv.xSignObjs.push(ov.xSignObjs[j]);
													ov.xSignObjs.splice(j--, 1);
												}
											}
										}
									}
									// 1141229 Raymond 1141693 新增判斷cachedDM.dirty(), 以避免因排版因素導致的簽核畫面頁數與封裝檔不一致時, 誤判為內文有異動, 而需要使用者加簽傳送的問題
									else if(!cdm.dirty()) {
										theLogger.log("文稿(ID:" + ov.id + ")未異動內容, 應是簽核頁面頁數與封裝檔記錄不一致導致的, 忽略此異動");
									}
									else {
										theLogger.warn("文稿(ID:" + ov.id + ")已異動內容, 但不可編輯");
									}
								}
								else
									theLogger.error("此文稿尚未載入!?");
							}
						}
						else
							theLogger.error("找不到版本ID為'" + ov.id + "的文稿, 無法判斷是否應產生一個新的版本");
					}
					else {	// 2017.1.23 草稿或異動內文要多檢查寫出簽核區域
						var did = ov.id.replace(/X$/, "");
						var d = findDraft(did);
						if(!!d) {
							// 1060517 Raymond 1060244 修正異動保留簽核物件旗標時, 未更新Runtime版本的reserveSO屬性, 導致列印時不會依目前設定保留或不保留之前流程點簽核物件問題
							if(ov.id.match(/X$/)) {
								ov.keepSO = (reserveSO?"true":"false");
								// 1100607 Raymond 國教院序37 修正簽稿會核單/會辦單文別的更新文稿的保留簽署意見flag設置條件(1080785+1090409衍生問題)
								if(reserveSO && (d.docType == "簽稿會核單" || d.docType == "會辦單"))
									ov.keepSO = (theSSO.User.EnvSettings.get("WE_ALLOW_CON_KEEP_SIGNOBJ") == "Y")?"true":"false";
							}
							//var cdm = theAOL.getCurrFolio().getCachedDM(d);
							var cdm = _fm.getCachedDM(d);	// 1090608 Raymond 1090103 對此封裝檔而言當前FolioModel應為_fm而非theAOL.getCurrFolio()
							if(!!cdm) {
								if(!!cdm.signAreas) {
									ov.xSignAreas.length = 0;	// 2017.2.22 更新就重加
									for(var j=0; j<cdm.signAreas.length; j++) {
										var sa = cdm.signAreas[j];
										var param = {
											pgIdx: sa.po,
											pgId: undefined,
											saType: sa.saType,
											saID: sa.id,
											left: Math.floor(Math.floor(sa.left) * 2480 / 794),
											top: Math.floor(Math.floor(sa.top) * 3507 / 1123),
											right: Math.floor(Math.floor(sa.left + sa.width) * 2480 / 794),
											bottom: Math.floor(Math.floor(sa.top + sa.height) * 3507 / 1123)
										};
										if(sa.po < d.draftPages.pages.length) {
											param.pgId = d.draftPages.pages[sa.po].id;
										}
										if(typeof param.pgId === "undefined")
											theLogger.error("找不到簽核區域#" + j + "所在頁次" + param.pgIdx + "的頁面ID");
										
										/* 2017.2.22 不要用saType+saID比對, 因為簽稿會核單會重複
										var found = false;
										for(var k=0; k<ov.xSignAreas.length; k++) {
											if(ov.xSignAreas[k].saType == param.saType && ov.xSignAreas[k].saID == param.saID) {
												found = true;
												theLogger.warn("找到簽核區域(saType:'" + param.saType + "',saID:'" + param.saID + "'), 更新pgIdx:" + ov.xSignAreas[k].pgIdx + "->" + param.pgIdx + ", pgId:" + ov.xSignAreas[k].pgId + "->" + param.pgId + ", left:" + ov.xSignAreas[k].left + "->" + param.left + ", top:" + ov.xSignAreas[k].top + "->" + param.top + ", right:" + ov.xSignAreas[k].right + "->" + param.right + ", bottom:" + ov.xSignAreas[k].bottom + "->" + param.bottom);
												// 更新簽核區域資訊
												ov.xSignAreas[k].pgIdx = param.pgIdx;
												ov.xSignAreas[k].pgId = param.pgId;
												ov.xSignAreas[k].left = param.left;
												ov.xSignAreas[k].top = param.top;
												ov.xSignAreas[k].right = param.right;
												ov.xSignAreas[k].bottom = param.bottom;
											}
										}
										if(!found) {	// 找不到相符的簽核區域則新增
											theLogger.warn("新增簽核區域(saType:'" + param.saType + "',saID:'" + param.saID + "'), pgIdx:" + param.pgIdx + ", pgId:" + param.pgId + ", left:" + param.left + ", top:" + param.top + ", right:" + param.right + ", bottom:" + param.bottom);
											ov.xSignAreas.push(new XSignArea(ov, param));
										}*/
										ov.xSignAreas.push(new XSignArea(ov, param));	// 2017.2.22 更新就重加
									}
								}
								else
									theLogger.warn("此文稿無簽核區域資訊");
							}
							else
								theLogger.error("此文稿尚未載入!?");
						}
						else
							theLogger.error("找不到版本ID為'" + ov.id + "的文稿, 無法判斷是否應產生一個新的版本");
					}
					
					for(var j=0; j<_xDrafts[i].xDraftVers.length; j++) {
						var ndV = ndD.appendChild(doc.createElement("版本"));	// 第2層版本
						ndV.setAttribute("id", _xDrafts[i].xDraftVers[j].id);
						ndV.setAttribute("file-path", _xDrafts[i].xDraftVers[j].filePath);
						ndV.setAttribute("name", _xDrafts[i].xDraftVers[j].name);
						ndV.setAttribute("msgid", _xDrafts[i].xDraftVers[j].msgId);
						if("keepSO" in _xDrafts[i].xDraftVers[j])
							ndV.setAttribute("keep-so", _xDrafts[i].xDraftVers[j].keepSO);
						
						for(var k=0; k<_xDrafts[i].xDraftVers[j].xSignAreas.length; k++) {	// 第3層簽核區域
							var ndSA = ndV.appendChild(doc.createElement("簽核區域"));
							ndSA.setAttribute("pg-idx", _xDrafts[i].xDraftVers[j].xSignAreas[k].pgIdx);
							ndSA.setAttribute("pg-id", _xDrafts[i].xDraftVers[j].xSignAreas[k].pgId);
							ndSA.setAttribute("sa-type", _xDrafts[i].xDraftVers[j].xSignAreas[k].saType);
							ndSA.setAttribute("sa-id", _xDrafts[i].xDraftVers[j].xSignAreas[k].saID);
							ndSA.setAttribute("left", _xDrafts[i].xDraftVers[j].xSignAreas[k].left);
							ndSA.setAttribute("top", _xDrafts[i].xDraftVers[j].xSignAreas[k].top);
							ndSA.setAttribute("right", _xDrafts[i].xDraftVers[j].xSignAreas[k].right);
							ndSA.setAttribute("bottom", _xDrafts[i].xDraftVers[j].xSignAreas[k].bottom);
						}
						
						for(var k=0; k<_xDrafts[i].xDraftVers[j].xSignObjs.length; k++) {	// 第3層簽核物件
							var ndSO = ndV.appendChild(doc.createElement("簽核物件"));
							ndSO.setAttribute("id", _xDrafts[i].xDraftVers[j].xSignObjs[k].id);
							ndSO.setAttribute("msgid", _xDrafts[i].xDraftVers[j].xSignObjs[k].msgId);
							ndSO.setAttribute("time", _xDrafts[i].xDraftVers[j].xSignObjs[k].time);
							ndSO.setAttribute("type", _xDrafts[i].xDraftVers[j].xSignObjs[k].type);
							ndSO.setAttribute("telext", _xDrafts[i].xDraftVers[j].xSignObjs[k].telExt);	// 1140206 Raymond 1131137 合併CDC1110401, 新增分機資訊
							if(_xDrafts[i].xDraftVers[j].xSignObjs[k].type == "A") {
								ndSO.setAttribute("sa-type", _xDrafts[i].xDraftVers[j].xSignObjs[k].saType);
								ndSO.setAttribute("sa-id", _xDrafts[i].xDraftVers[j].xSignObjs[k].saID);
								ndSO.setAttribute("offset-x", _xDrafts[i].xDraftVers[j].xSignObjs[k].offset.x);
								ndSO.setAttribute("offset-y", _xDrafts[i].xDraftVers[j].xSignObjs[k].offset.y);
							}
							else if(_xDrafts[i].xDraftVers[j].xSignObjs[k].type == "B") {
								ndSO.setAttribute("pg-idx", _xDrafts[i].xDraftVers[j].xSignObjs[k].pgIdx);
								ndSO.setAttribute("pos-x", _xDrafts[i].xDraftVers[j].xSignObjs[k].pos.x);
								ndSO.setAttribute("pos-y", _xDrafts[i].xDraftVers[j].xSignObjs[k].pos.y);
								ndSO.setAttribute("width", _xDrafts[i].xDraftVers[j].xSignObjs[k].width);
								ndSO.setAttribute("height", _xDrafts[i].xDraftVers[j].xSignObjs[k].height);
							}
							// 1110429 Raymond 1110447 若新增簽核物件後再刪除稿件後傳送, 會造成下個流程點儲存XSignObjs.xml時因為簽核物件(ref)不存在而在這裡發生Error, 不能傳送的問題, 需要先檢查ref是否有值
							// 1100517 Raymond 1100298 新增取代他流程文字意見屬性
							//if(!!_xDrafts[i].xDraftVers[j].xSignObjs[k].ref.substObjId)
							if(!!_xDrafts[i].xDraftVers[j].xSignObjs[k].ref && !!_xDrafts[i].xDraftVers[j].xSignObjs[k].ref.substObjId)
								ndSO.setAttribute("subst-objid", _xDrafts[i].xDraftVers[j].xSignObjs[k].ref.substObjId);
							// 1110620 Raymond 1110579 若有tmpId則保留記錄
							if(!!_xDrafts[i].xDraftVers[j].xSignObjs[k].tmpId)
								ndSO.setAttribute("tmpId", _xDrafts[i].xDraftVers[j].xSignObjs[k].tmpId);
							// 1130927 Raymond 中榮序237 新增文字意見原始內容
							if(!!_xDrafts[i].xDraftVers[j].xSignObjs[k].srcContent)
								ndSO.setAttribute("srcContent", Utf7.encode(_xDrafts[i].xDraftVers[j].xSignObjs[k].srcContent));
							else if(!!_xDrafts[i].xDraftVers[j].xSignObjs[k].ref && !!_xDrafts[i].xDraftVers[j].xSignObjs[k].ref.srcContent)
								ndSO.setAttribute("srcContent", Utf7.encode(_xDrafts[i].xDraftVers[j].xSignObjs[k].ref.srcContent));
						}
					}
					// 1111024 Raymond 1110864 合併1101468, 啟用啟用分文稿記錄簽核意見功能時, 「僅顯示我的最終意見」的設定值也改儲存在文稿下
					if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
						for(var j=0; j<_xDrafts[i].xHideComments.length; j++) {
							var ndHC = ndD.appendChild(doc.createElement("隱藏簽辦意見"));	// 第2層隱藏簽辦意見
							ndHC.setAttribute("msgId", _xDrafts[i].xHideComments[j].msgId);
							if(_xDrafts[i].xHideComments[j].msgId == _docObj.msgId && j == _xDrafts[i].xHideComments.length-1) {	// 最後一筆流程點簽核人員是本流程點, 則覆寫
								ndHC.setAttribute("account", theSSO.User.account);	// 記錄目前流程點的使用者帳號, 若發生代理人欲使用"意見管理"功能時原流程點使用者已設定過"僅顯示我的最終意見", 則提示警告
							}
							else {
								ndHC.setAttribute("account", _xDrafts[i].xHideComments[j].account);
							}
							if(!!_xDrafts[i].xHideComments[j].value) {
								if("text" in ndHC)
									ndHC.text = _xDrafts[i].xHideComments[j].value;
								else
									ndHC.textContent = _xDrafts[i].xHideComments[j].value;
							}
						}
						if(_xDrafts[i].xHideComments.length == 0 || _xDrafts[i].xHideComments[_xDrafts[i].xHideComments.length-1].msgId != _docObj.msgId) {	// 無流程點簽核人員或最後一筆不是本流程點, 則新增
							var ndHC = ndD.appendChild(doc.createElement("隱藏簽辦意見"));	// 第2層隱藏簽辦意見
							ndHC.setAttribute("msgId", _docObj.msgId);
							ndHC.setAttribute("account", theSSO.User.account);	// 記錄目前流程點的使用者帳號, 若發生代理人欲使用"意見管理"功能時原流程點使用者已設定過"僅顯示我的最終意見", 則提示警告
							if("hideComment" in _xDrafts[i]) {
								if("text" in ndHC)
									ndHC.text = _xDrafts[i].hideComment;
								else
									ndHC.textContent = _xDrafts[i].hideComment;
							}
						}
					}
				}
				// 1110118 Raymond 1101464 新增記錄流程點簽核人員
				if(_docObj.msgId > 0) {
					var activeRole = theSSO.User.PlayRoles[theSSO.User.activeRoleIndex];
					var ownUserName, ownUserTitle;
					var orgNode = SSOUtil.getOrgNode(_docObj.sourceOrgNo);
					if(_docObj.ODWMSG.IS_PROXY_DOC == "1") {	// 代理公文則呼叫WEDEP/GetUserInfo取得"被代理人"資訊
						// 不用現成的theWebServices.getUserInfo, 因為會重設theUserInfo全域物件
						var params = {
							"UserID": _docObj.ownUserId,
							"Artifact": localStorage['Artifact'],
							"DepartID": _docObj.ownOUId};
						try {
							theWebServices.invokeWS(SSO_CONFIG.getWSUrl("checkws"), "GetUserInfo", null, params, false, function(r) {	// 這裡用sync呼叫, 改非同步要連呼叫save的外部改, 幅度太大
								theLogger.log(r);
								ownUserName = r.UserName;
								ownUserTitle = r.Title;
							});
						}
						catch(e) {
							theLogger.error("呼叫GetUserInfo發生錯誤 '" + e.message + "', 無法取得'被代理人'(" + _docObj.ownUserId + ")的使用者資訊");
							//alert(e.stacks || e.message);
						}
					}
					for(var i=0; i<_xFlowSigners.length; i++) {
						var ndFS = doc.documentElement.appendChild(doc.createElement("流程點簽核人員"));	// 第1層流程點簽核人員
						if(_xFlowSigners[i].msgId == _docObj.msgId && i == _xFlowSigners.length-1) {	// 最後一筆流程點簽核人員是本流程點, 則覆寫
							ndFS.setAttribute("msgId", _docObj.msgId);
							if(_docObj.ODWMSG.IS_PROXY_DOC == "1") {	// 代理公文則以activeRole做為代理人資訊
								ndFS.setAttribute("ouId", activeRole.unitNo);
								ndFS.setAttribute("ou", SSOUtil.getOrgUnitName(orgNode, activeRole.unitNo));
								ndFS.setAttribute("roleId", activeRole.id);
								ndFS.setAttribute("role", SSOUtil.getOrgRoleName(orgNode, activeRole.unitNo, activeRole.id));
							}
							else {	// 非代理人則以ownRole做為使用者資訊
								ndFS.setAttribute("ouId", _docObj.ownOUId);
								ndFS.setAttribute("ou", SSOUtil.getOrgUnitName(orgNode, _docObj.ownOUId));
								ndFS.setAttribute("roleId", _docObj.ownRoleId);
								ndFS.setAttribute("role", SSOUtil.getOrgRoleName(orgNode, _docObj.ownOUId, _docObj.ownRoleId));
							}
							ndFS.setAttribute("title", theSSO.User.title);
							if(_docObj.ODWMSG.IS_PROXY_DOC == "1") {	// 代理公文則增加"被代理人"資訊
								ndFS.setAttribute("proxyUserId", _docObj.ownUserId);
								ndFS.setAttribute("proxyUserName", ownUserName);
								ndFS.setAttribute("proxyOUId", _docObj.ownOUId);
								ndFS.setAttribute("proxyOU", SSOUtil.getOrgUnitName(orgNode, _docObj.ownOUId));
								ndFS.setAttribute("proxyRoleId", _docObj.ownRoleId);
								ndFS.setAttribute("proxyRole", SSOUtil.getOrgRoleName(orgNode, _docObj.ownOUId, _docObj.ownRoleId));
								ndFS.setAttribute("proxyTitle", ownUserTitle);
							}
							ndFS.setAttribute("txName", _docObj.txName);	// 額外記錄異動別
							ndFS.setAttribute("txTime", getCreateTime());	// 額外記錄傳送時間
							// 1111024 Raymond 1110864 合併1101468, 未啟用啟用分文稿記錄簽核意見功能時, 「僅顯示我的最終意見」的設定值儲存在流程點簽核人員下
							if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") != "Y") {
								if("hideComment" in _xFlowSigners[i])
									ndFS.setAttribute("hideComment", _xFlowSigners[i].hideComment);	// 記錄"false"時僅顯示此流程點的簽辦意見為最終意見
								ndFS.setAttribute("account", theSSO.User.account);	// 記錄目前流程點的使用者帳號, 若發生代理人欲使用"意見管理"功能時原流程點使用者已設定過"僅顯示我的最終意見", 則提示警告
							}
						}
						else {
							ndFS.setAttribute("msgId", _xFlowSigners[i].msgId);
							ndFS.setAttribute("ouId", _xFlowSigners[i].ouId);
							ndFS.setAttribute("ou", _xFlowSigners[i].ou);
							ndFS.setAttribute("roleId", _xFlowSigners[i].roleId);
							ndFS.setAttribute("role", _xFlowSigners[i].role);
							ndFS.setAttribute("title", _xFlowSigners[i].title);
							if(!!_xFlowSigners[i].proxyUserId)
								ndFS.setAttribute("proxyUserId", _xFlowSigners[i].proxyUserId);
							if(!!_xFlowSigners[i].proxyUserName)
								ndFS.setAttribute("proxyUserName", _xFlowSigners[i].proxyUserName);
							if(!!_xFlowSigners[i].proxyOUId)
								ndFS.setAttribute("proxyOUId", _xFlowSigners[i].proxyOUId);
							if(!!_xFlowSigners[i].proxyOU)
								ndFS.setAttribute("proxyOU", _xFlowSigners[i].proxyOU);
							if(!!_xFlowSigners[i].proxyRoleId)
								ndFS.setAttribute("proxyRoleId", _xFlowSigners[i].proxyRoleId);
							if(!!_xFlowSigners[i].proxyRole)
								ndFS.setAttribute("proxyRole", _xFlowSigners[i].proxyRole);
							if(!!_xFlowSigners[i].proxyTitle)
								ndFS.setAttribute("proxyTitle", _xFlowSigners[i].proxyTitle);
							ndFS.setAttribute("txName", _xFlowSigners[i].txName);
							ndFS.setAttribute("txTime", _xFlowSigners[i].txTime);
							// 1111024 Raymond 1110864 合併1101468, 未啟用啟用分文稿記錄簽核意見功能時, 「僅顯示我的最終意見」的設定值儲存在流程點簽核人員下
							if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") != "Y") {
								if(!!_xFlowSigners[i].hideComment)
									ndFS.setAttribute("hideComment", _xFlowSigners[i].hideComment);
								if(!!_xFlowSigners[i].account)
									ndFS.setAttribute("account", _xFlowSigners[i].account);
							}
						}
					}
					if(_xFlowSigners.length == 0 || _xFlowSigners[_xFlowSigners.length-1].msgId != _docObj.msgId) {	// 無流程點簽核人員或最後一筆不是本流程點, 則新增
						var ndFS = doc.documentElement.appendChild(doc.createElement("流程點簽核人員"));	// 第1層流程點簽核人員
						ndFS.setAttribute("msgId", _docObj.msgId);
						if(_docObj.ODWMSG.IS_PROXY_DOC == "1") {	// 代理公文則以activeRole做為代理人資訊
							ndFS.setAttribute("ouId", activeRole.unitNo);
							ndFS.setAttribute("ou", SSOUtil.getOrgUnitName(orgNode, activeRole.unitNo));
							ndFS.setAttribute("roleId", activeRole.id);
							ndFS.setAttribute("role", SSOUtil.getOrgRoleName(orgNode, activeRole.unitNo, activeRole.id));
						}
						else {	// 非代理人則以ownRole做為使用者資訊
							ndFS.setAttribute("ouId", _docObj.ownOUId);
							ndFS.setAttribute("ou", SSOUtil.getOrgUnitName(orgNode, _docObj.ownOUId));
							ndFS.setAttribute("roleId", _docObj.ownRoleId);
							ndFS.setAttribute("role", SSOUtil.getOrgRoleName(orgNode, _docObj.ownOUId, _docObj.ownRoleId));
						}
						ndFS.setAttribute("title", theSSO.User.title);
						if(_docObj.ODWMSG.IS_PROXY_DOC == "1") {	// 代理公文則增加"被代理人"資訊
							ndFS.setAttribute("proxyUserId", _docObj.ownUserId);
							ndFS.setAttribute("proxyUserName", ownUserName);
							ndFS.setAttribute("proxyOUId", _docObj.ownOUId);
							ndFS.setAttribute("proxyOU", SSOUtil.getOrgUnitName(orgNode, _docObj.ownOUId));
							ndFS.setAttribute("proxyRoleId", _docObj.ownRoleId);
							ndFS.setAttribute("proxyRole", SSOUtil.getOrgRoleName(orgNode, _docObj.ownOUId, _docObj.ownRoleId));
							ndFS.setAttribute("proxyTitle", ownUserTitle);
						}
						ndFS.setAttribute("txName", _docObj.txName);	// 額外記錄異動別
						ndFS.setAttribute("txTime", getCreateTime());	// 額外記錄傳送時間
						// 1111024 Raymond 1110864 合併1101468, 未啟用啟用分文稿記錄簽核意見功能時, 「僅顯示我的最終意見」的設定值儲存在流程點簽核人員下
						if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") != "Y") {
							if("hideComment" in _fm)	// 新增的流程點用_fm.hideComment記錄
								ndFS.setAttribute("hideComment", _fm.hideComment);	// 記錄"false"時僅顯示此流程點的簽辦意見為最終意見
							ndFS.setAttribute("account", theSSO.User.account);	// 記錄目前流程點的使用者帳號, 若發生代理人欲使用"意見管理"功能時原流程點使用者已設定過"僅顯示我的最終意見", 則提示警告
						}
					}
				}
				// 1120221 Raymond 1111225 新增記錄內部意見
				if(!!_xInnerCmtColl) {
					var ndColl = doc.documentElement.appendChild(doc.createElement("內部意見"));
					for(var i=0; i<_xInnerCmtColl.xInnerCmtFlows.length; i++) {
						var ndF = ndColl.appendChild(doc.createElement("流程點"));
						ndF.setAttribute("msgid", _xInnerCmtColl.xInnerCmtFlows[i].msgId);
						ndF.setAttribute("ownOUId", _xInnerCmtColl.xInnerCmtFlows[i].ownOUId);
						for(var j=0; j<_xInnerCmtColl.xInnerCmtFlows[i].xInnerCmts.length; j++) {
							var ndC = ndF.appendChild(doc.createElement("意見文字"));
							if(!!_xInnerCmtColl.xInnerCmtFlows[i].xInnerCmts[j].uri)
								ndC.setAttribute("URI", _xInnerCmtColl.xInnerCmtFlows[i].xInnerCmts[j].uri);
							if("text" in ndC)
								ndC.text = _xInnerCmtColl.xInnerCmtFlows[i].xInnerCmts[j].text;
							else
								ndC.textContent = _xInnerCmtColl.xInnerCmtFlows[i].xInnerCmts[j].text;
						}
					}
				}
				return doc;
			},
			
			syncWithEnvelopeFile: function(apd) {	// 與封裝檔同步, 因為異動撤消可能刪減某些MsgID產生的文稿、簽核物件, 是原本有記錄的, 要跟著刪掉
				theLogger.log("外部簽核物件記錄檔與封裝檔內容同步...");
				// 1120222 Raymond 1111225 新增支援內部意見記錄功能
				if(!!_xInnerCmtColl) {
					var cf = _xInnerCmtColl.getCurrFlow();
					if(!cf) {	// 未記錄本流程點時新增流程點及空的內部意見
						var cr = _revs[_currRev];
						if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
							for(var i=0; i<cr.obj.drafts.length; i++) {
								_xInnerCmtColl.addCmt("", cr.obj.drafts[i].guid);
							}
						}
						else
							_xInnerCmtColl.addCmt("");
						cf = _xInnerCmtColl.getCurrFlow();
					}
					if(!!cf) {
						var cr = _revs[_currRev];
						if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
							for(var i=0; i<cr.obj.drafts.length; i++) {
								cr.obj.drafts[i].innerComment = cf.getCmt(cr.obj.drafts[i].guid);
							}
						}
						else
							_innerComment = cf.getCmt();
					}
				}
				if(!apd)
					return;
				var $apd = $(apd.rawXml);
				
				function detectStampOrImageInArea(so, sa) {	// 章戳或圖檔中心點
					if("area" in so.content) {
						if(so.asIcon) {	// 圖示直接以area.left/top判定
							if(so.content.area.left >= sa.left &&
								so.content.area.top >= sa.top &&
								so.content.area.left <= sa.right &&
								so.content.area.top <= sa.bottom)
								return true;
						}
						else {
							var cp = {x: (parseInt(so.content.area.left) + parseInt(so.content.area.right)) / 2, y: (parseInt(so.content.area.top) + parseInt(so.content.area.bottom)) / 2};
							if(cp.x >= sa.left &&
								cp.y >= sa.top &&
								cp.x <= sa.right &&
								cp.y <= sa.bottom) {
								theLogger.warn("中心點(" + cp.x + "," + cp.y + ")在簽核區域內");
								return true;
							}
							else
								theLogger.warn("中心點(" + cp.x + "," + cp.y + ")不在簽核區域內");
						}
					}
					return false;
				}
				function detectTextSignObjInArea(so, sa) {	// 文字意見中心點因為封裝檔沒有記錄寬高資訊須特別判定
					if("pos" in so.content) {
						if(so.asIcon) {	// 圖示直接以pos.x/y判定
							if(so.content.pos.x >= sa.left &&
								so.content.pos.y >= sa.top &&
								so.content.pos.x <= sa.right &&
								so.content.pos.y <= sa.bottom)
								return true;
						}
						else {
							var $tx = $("<div class='sign-obj so-text'>" +
								"<div writing-mode:" + ((so.content.orient == "直書")?"tb-rl":"lr-tb") +
									";font-family:" + so.content.font.name + ";font-size:" + (so.content.font.size+"pt") +
									"'>" + so.content.text.replace(/\n/g, '<br>') + "</div></div>").appendTo("#aol");
							theLogger.warn("試算文字意見寬高:" + $tx.width() + "," + $tx.height());
							var w = $tx.width() * 2480 / 794;
							var h = $tx.height() * 3507 / 1123;
							$tx.remove();
							var cp = {x: parseInt(so.content.pos.x) + (w / 2), y: parseInt(so.content.pos.y) + (h / 2)};
							if(cp.x >= sa.left &&
								cp.y >= sa.top &&
								cp.x <= sa.right &&
								cp.y <= sa.bottom) {
								theLogger.warn("中心點(" + cp.x + "," + cp.y + ")在簽核區域內");
								return true;
							}
							else
								theLogger.warn("中心點(" + cp.x + "," + cp.y + ")不在簽核區域內");
						}
					}
					return false;
				}
				function _setDraftVer(d) {	// 設定文稿的版本
					for(var i=0; i<_xDrafts.length; i++) {
						if(_xDrafts[i].guid == d.guid) {	// 先找同一GUID的文稿
							_xDrafts[i].addVer(d);	// 新增版本
							return;
						}
					}
					_xDrafts.push(new XDraft(d));	// 若尚未有相同GUID的文稿, 則新增
				}
				function _setSignArea(d, ver, $apd) {
					function findExistSA(sa) {	// 找出已存在簽核物件記錄檔的簽核區域, 以saType+saID做為判斷條件
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
						for(var i=0; i<ver.xSignAreas.length; i++) {
							if (toSAType(ver.xSignAreas[i].saType) == toSAType(sa.saType) &&
								ver.xSignAreas[i].saID == sa.saID) {
								theLogger.warn("簽核區域(saType:" + sa.saType + ", saID:" + sa.saID + ")重複, 忽略新增");
								return ver.xSignAreas[i];
							}
						}
						return null;
					}
					// 1130903 Raymond 中榮序181 修正XSignObjs.xml在分會流程點異動簽稿會核單後會畢退回, 分會合併流程點會寫入第一個版本中的簽核區域的pg-index為undefined的問題
					if(!!d.dispatchMergedID)
						var $nl = $apd.find("版本[文件夾識別碼='" + d.dispatchMergedID + "']");
					else
					var $nl = $apd.find("版本[文件夾識別碼='" + d.id + "']");
					if($nl.length > 0) {
						var $nd = $nl.eq(0);
						var $nl2 = $nd.find("簽署頁面");
						if($nl2.length > 0) {
							for(var i=0; i<$nl2.length; i++) {
								var $nd2 = $nl2.eq(i);
								var $nl3 = $nd2.find("簽核區域");
								if($nl3.length > 0) {	// 此頁有簽核區域, 記錄簽核區域資訊
									for(var j=0; j<$nl3.length; j++) {
										var $nd3 = $nl3.eq(j);
										var param = {
											pgIdx: undefined,
											pgId: $nd2.find("文件夾識別碼").text(),
											saType: $nd3.attr("類型"),
											saID: $nd3.attr("代碼"),
											left: $nd3.attr("left"),
											top: $nd3.attr("top"),
											right: $nd3.attr("right"),
											bottom: $nd3.attr("bottom")
										};
										for(var k=0; k<d.draftPages.pages.length; k++) {
											if(d.draftPages.pages[k].id == param.pgId) {
												param.pgIdx = k;
												break;
											}
										}
										var eSA = findExistSA(param);
										if(!eSA)
											ver.xSignAreas.push(new XSignArea(ver, param));
										else {	// 用AOLProccessData的頁面ID及頁次取代外部記錄
											theLogger.warn("更新簽核區域(saType:" + eSA.saType + ", saID:" + eSA.saID + ")頁面ID:" + eSA.pgId + "->" + param.pgId + ", 頁次pgIdx:" + eSA.pgIdx + "->" + param.pgIdx);
											eSA.pgIdx = param.pgIdx;
											eSA.pgId = param.pgId;
										}
									}
								}
							}
						}
					}
				}
				function _setSignObj(o, pg, d, $apd) {
					function isExistSO(so) {	// 過濾已存在簽核物件記錄檔的簽核物件, 以msgId+time做為判斷條件, 因為前一流程點新增的簽核物件可能會被更名成正式的ID
						// time只到分, 即使加msgId也不夠準確, 只能用ID
						//var msgId = so.flowId.substr(5);
						//var time = so.time;
						for(var i=0; i<d.xSignObjs.length; i++) {
							//if(d.xSignObjs[i].msgId == msgId && d.xSignObjs[i].time == time) {
							//	if(d.xSignObjs[i].id != so.id) {
							//		theLogger.warn("簽核物件記錄檔的簽核物件ID:'" + d.xSignObjs[i].id + "'變更為'" + so.id + "'");
							//	}
							//	return true;
							//}
							if(d.xSignObjs[i].id == so.id)
								return true;
						}
						return false;
					}
					if(!("asIcon" in o)) {
						var $nd = $apd.find("簽核物件[Id='" + o.id + "']");
						if($nd.length > 0)
							o.asIcon = $nd.attr("貼式意見") == "Y";
					}
					// 檢查重複的簽核物件
					//for(var i=0; i<d.xSignObjs.length; i++) {
						if(isExistSO(o)) {
							var xso = undefined;
							for(var i=0; i<d.xSignObjs.length; i++) {
								if(d.xSignObjs[i].id == so.id) {
									xso = d.xSignObjs[i];
									break;
								}
							}
							// 1130913 Raymond 中榮序188 新增判斷簽稿會核單允許保留顯示簽核物件時, 重新計算簽稿會核單的TypeB簽核物件是否位在簽核區域內
							if("container" in pg && (pg.container.docType == "簽稿會核單" || pg.container.docType == "會辦單") && theSSO.User.EnvSettings.get("WE_ALLOW_CON_KEEP_SIGNOBJ") == "Y" && xso.type == "B") {
								theLogger.warn("簽核物件(ID:" + o.id + ")重複, 但類型為B且文別為]" + pg.container.docType + "', 重新偵測是否位於簽核區域內...");
								var $nl = $apd.find("版本[文件夾識別碼='" + d.id + "']");
								if($nl.length > 0) {
									var $nd = $nl.eq(0);
									var $nl2 = $nd.find("簽署頁面");
									if($nl2.length > 0) {
										for(var i=0; i<$nl2.length; i++) {
											var $nd2 = $nl2.eq(i);
											var $nl3 = $nd2.find("簽核區域");
											if($nl3.length > 0) {	// 此頁有簽核區域, 才進行比對簽核物件是否在內的判定
												var pgid = $nd2.find("文件夾識別碼").text();
												if(o.obj == pgid) {	// 若此簽核物件位於此頁面, 才要進行區域內外的檢查
													for(var j=0; j<$nl3.length; j++) {
														var $saNode = $nl3.eq(j);
														var sa = {
															type: $saNode.attr("類型"),
															id: $saNode.attr("代碼"),
															left: Number($saNode.attr("left")),
															top: Number($saNode.attr("top")),
															right: Number($saNode.attr("right")),
															bottom: Number($saNode.attr("bottom"))
														};
														if(!sa.id || sa.id == "") {	// 2017.2.3 航港局簽稿會核單的簽核區域都沒設ID, 應除外, 否則有第2頁也是沒設ID的簽核區域時, 簽核物件會對應錯誤
															theLogger.warn("簽署頁面(ID:" + pgid + ")的簽核區域#" + j + "之代碼未設, 視為無效區域, 不綁定任何簽核物件");
															continue;
														}
														if(("area" in o.content && detectStampOrImageInArea(o, sa)) ||
															("pos" in o.content && detectTextSignObjInArea(o, sa))) {
															theLogger.log("\t" + o.type + "(ID:" + o.id + ")在此簽核框(#" + j + ")範圍內, 計算相對位置...");
															
															// 計算位於簽核框內的相對位置, 2015.5.27 修正章戳圖檔用area, 文字意見用pos
															if("area" in o.content) {
																o.offset = {
																	x: o.content.area.left - sa.left,
																	y: o.content.area.top - sa.top
																};
															}
															else {
																o.offset = {
																	x: o.content.pos.x - sa.left,
																	y: o.content.pos.y - sa.top
																};
															}
															o.saType = sa.type;
															o.saID = sa.id;
															
															//theLogger.log("\toffset:" + o.offset.x + "," + o.offset.y + " saType:" + o.saType + " saID:" + o.saID);
															
															xso.type = "A";	// 簽核框內物件
															xso.saType = o.saType;
															xso.saID = o.saID;
															xso.offset = {x: o.offset.x, y: o.offset.y};
															theLogger.log("\t簽核框類型:" + xso.saType + ", 簽核框ID:" + xso.saID + ", offset:" + xso.offset.x + "," + xso.offset.y);
															
															break;	// break for-loop
														}
														else
															theLogger.log("\t" + o.type + "(ID:" + o.id + ")不在此簽核框(#" + j + ")範圍內");
													}
												}
											}
											else
												theLogger.warn("AOLProccessData.xml中有ID:" + d.id + "版本的文稿簽署頁面但無簽核區域, 只能判定此簽核物件為B類");
										}
									}
									else
										theLogger.error("AOLProccessData.xml中ID:" + d.id + "的文稿版本下無任何簽署頁面, 無法重新偵測此簽核物件是否為簽核區域內物件");
								}
								else
									theLogger.error("AOLProccessData.xml中找不到ID:" + d.id + "的文稿版本, 無法重新偵測此簽核物件是否為簽核區域內物件");
							}
							else
							theLogger.warn("簽核物件(ID:" + o.id + ")重複");
							return;
						}
					//}
					var param = {
						id: o.id,
						msgId: o.flowId.substr(5),
						time: o.time
					};
					// 判斷簽核物件是否在當時版本的簽核區域內
					var $nl = $apd.find("版本[文件夾識別碼='" + d.id + "']");
					if($nl.length > 0) {
						var $nd = $nl.eq(0);
						//d.keepSO = $nd.attr("保留簽署意見");
						var $nl2 = $nd.find("簽署頁面");
						if($nl2.length > 0) {
							for(var i=0; i<$nl2.length; i++) {
								var $nd2 = $nl2.eq(i);
								var $nl3 = $nd2.find("簽核區域");
								if($nl3.length > 0) {	// 此頁有簽核區域, 才進行比對簽核物件是否在內的判定
									var pgid = $nd2.find("文件夾識別碼").text();
									if(o.obj == pgid) {	// 若此簽核物件位於此頁面, 才要進行區域內外的檢查
										for(var j=0; j<$nl3.length; j++) {
											var $saNode = $nl3.eq(j);
											var sa = {
												type: $saNode.attr("類型"),
												id: $saNode.attr("代碼"),
												left: Number($saNode.attr("left")),
												top: Number($saNode.attr("top")),
												right: Number($saNode.attr("right")),
												bottom: Number($saNode.attr("bottom"))
											};
											// 1101130 Raymond 1101208 修正國教院調閱一代公文若有"簡簽", 會因一代的簡簽樣版未設簽核區域代碼而導致不會顯示簽核物件的問題
											if(SSO_CONFIG.OrgNickName == "NAER" && "container" in pg && pg.container.docType == "簡簽" && sa.id == "") {
												sa.id = "承辦單位";
											}
											if(!sa.id || sa.id == "") {	// 2017.2.3 航港局簽稿會核單的簽核區域都沒設ID, 應除外, 否則有第2頁也是沒設ID的簽核區域時, 簽核物件會對應錯誤
												theLogger.warn("簽署頁面(ID:" + pgid + ")的簽核區域#" + j + "之代碼未設, 視為無效區域, 不綁定任何簽核物件");
												continue;
											}
											//if("container" in pg && pg.container.docType != "簽稿會核單" && pg.container.docType != "會辦單" &&	// 1070118 Raymond 1070009 新增判斷不是簽稿會核單才需計算簽核物件在框內相對位置
											if("container" in pg && ((pg.container.docType != "簽稿會核單" && pg.container.docType != "會辦單") || theSSO.User.EnvSettings.get("WE_ALLOW_CON_KEEP_SIGNOBJ") == "Y") &&	// 1130913 Raymond 中榮序188 新增判斷簽稿會核單允許保留顯示簽核物件時, 重新計算簽核物件是否位在簽核區域內
												(("area" in o.content && detectStampOrImageInArea(o, sa)) ||
												("pos" in o.content && detectTextSignObjInArea(o, sa)))) {
												theLogger.log("\t" + o.type + "(ID:" + o.id + ")在此簽核框(#" + j + ")範圍內, 計算相對位置...");
												
												// 計算位於簽核框內的相對位置, 2015.5.27 修正章戳圖檔用area, 文字意見用pos
												if("area" in o.content) {
													o.offset = {
														x: o.content.area.left - sa.left,
														y: o.content.area.top - sa.top
													};
												}
												else {
													o.offset = {
														x: o.content.pos.x - sa.left,
														y: o.content.pos.y - sa.top
													};
												}
												o.saType = sa.type;
												o.saID = sa.id;
												
												//theLogger.log("\toffset:" + o.offset.x + "," + o.offset.y + " saType:" + o.saType + " saID:" + o.saID);
												
												param.type = "A";	// 簽核框內物件
												param.saType = o.saType;
												param.saID = o.saID;
												param.offsetX = o.offset.x;
												param.offsetY = o.offset.y;
												theLogger.log("\t簽核框類型:" + param.saType + ", 簽核框ID:" + param.saID + ", offset:" + param.offsetX + "," + param.offsetY);
												
												break;	// break for-loop
											}
											else
												theLogger.log("\t" + o.type + "(ID:" + o.id + ")不在此簽核框(#" + j + ")範圍內");
										}
									}
								}
								else
									theLogger.warn("AOLProccessData.xml中有ID:" + d.id + "版本的文稿簽署頁面但無簽核區域, 只能判定此簽核物件為B類");
							}
						}
						// 1090916 Raymond 1090564 信保特殊模式公文的AOLProcessData.xml必然無簽署頁面, 故不須記錄錯誤log
						//else
						else if(_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2")
							theLogger.error("AOLProccessData.xml中有ID:" + d.id + "版本的文稿但無簽署頁面, 只能判定此簽核物件為B類");
					}
					else
						theLogger.error("AOLProccessData.xml中找不到ID:" + d.id + "的文稿版本, 只能判定此簽核物件為B類");
					
					if(!("type" in param)) {
						param.type = "B";
						param.pgIdx = pg.po;
						if("area" in o.content) {
							param.posX = parseInt(o.content.area.left);
							param.posY = parseInt(o.content.area.top);
							param.width = o.content.area.right - o.content.area.left;
							param.height = o.content.area.bottom - o.content.area.top;
						}
						else if("pos"in o.content) {
							param.posX = parseInt(o.content.pos.x);
							param.posY = parseInt(o.content.pos.y);
							var $tx = $("<div class='sign-obj so-text'>" +
								"<div writing-mode:" + ((o.content.orient == "直書")?"tb-rl":"lr-tb") +
									";font-family:" + o.content.font.name + ";font-size:" + (o.content.font.size+"pt") +
									"'>" + o.content.text.replace(/\n/g, '<br>') + "</div></div>").appendTo("#aol");
							theLogger.warn("\t試算文字意見寬高:" + $tx.width() + "," + $tx.height());
							param.width = Math.ceil($tx.width() * 2480 / 794);
							param.height = Math.ceil($tx.height() * 3507 / 1123);
							$tx.remove();
						}
						theLogger.log("\t" + o.type + "(ID:" + o.id + ") - pos:" + param.posX + "," + param.posY + ", width:" + param.width + ", height:" + param.height);
					}
					
					d.xSignObjs.push(new XSignObj(d, param, o));
				}
				// 從所有流程點建立文稿清單
				for(rev in _revs) {
					var snfo = _revs[rev].obj.signInfo;
					console.log("%crev:", "background-color:#aaa", rev);	// 1130913 Raymond 新增LOG訊息
					for(var i=0; i<snfo.drafts.length; i++) {
						if(snfo.drafts[i].name == "來文簽辦") {
							theLogger.warn("外部記錄檔不記錄「來文簽辦」的文稿");
							// 1100524 Raymond 1100499 修正來文及來文附件上若有貼式意見, 簽核時未呈現圖示而是完整顯示的問題
							var fd = snfo.drafts[i];
							for(var j=0; j<fd.draftPages.signObjs.length; j++) {
								var so = fd.draftPages.signObjs[j];
								if(!("asIcon" in so)) {
									var $nd = $apd.find("簽核物件[Id='" + so.id + "']");	// 從AOLProcessData.xml恢復圖示flag
									if($nd.length > 0)
										so.asIcon = $nd.attr("貼式意見") == "Y";
								}
							}
							if("attachs" in fd) {
								for(var j=0; j<fd.attachs.length; j++) {
									if("draftPages" in fd.attachs[j] && "signObjs" in fd.attachs[j].draftPages) {
										for(var k=0; k<fd.attachs[j].draftPages.signObjs.length; k++) {
											var so = fd.attachs[j].draftPages.signObjs[k];
											if(!("asIcon" in so)) {
												var $nd = $apd.find("簽核物件[Id='" + so.id + "']");	// 從AOLProcessData.xml恢復圖示flag
												if($nd.length > 0)
													so.asIcon = $nd.attr("貼式意見") == "Y";
											}
										}
									}
								}
							}
						}
						else {
							var d = snfo.drafts[i];
							var found = false;
							// 確定各版本文稿都有GUID
							if(!("guid" in d) || typeof d.guid !== "string" || d.guid.length == 0) {	// 未取得GUID的文稿版本, 從APD反查填入
								for(var j=0; j<apd.length; j++) {
									var apdD = apd[j];
									for(var k=0; k<apdD.versions.length; k++) {
										var ver = apdD.versions[k];
										if(ver.id == d.id) {
											d.guid = apdD.guid;
											theLogger.warn("流程點" + rev + "的版本" + d.id + "的文稿(" + d.name + "), 設定GUID為" + apdD.guid + ", reserveSO為" + ver.reserveSO);
											d.reserveSO = ver.reserveSO;	// 2017.1.24 從APD帶回保留簽署意見設定值
											_setDraftVer(d);	// 新增文稿版本
											found = true;
											break;
										}
									}
									if(found)
										break;
								}
							}
							else {
								theLogger.log("流程點" + rev + "的版本" + d.id + "的文稿(" + d.name + "), 已設定過GUID為" + d.guid);
								if(!("reserveSO" in d)) {	// 2017.1.24 此revision的文稿尚未設定過reserveSO
									for(var j=0; j<apd.length; j++) {
										var apdD = apd[j];
										for(var k=0; k<apdD.versions.length; k++) {
											var ver = apdD.versions[k];
											if(ver.id == d.id) {
												// 1090804 Raymond 1090409 產生抄本頁面的版本改保留簽核物件為true才能保留顯示簽核物件
												if(ver.copy == "true") {
													theLogger.warn("流程點" + rev + "的版本" + d.id + "的文稿(" + d.name + ")為抄本, 修復設定reserveSO為'true'");
													d.reserveSO = "true";
												}
												else {
												theLogger.warn("流程點" + rev + "的版本" + d.id + "的文稿(" + d.name + "), 設定reserveSO為" + ver.reserveSO);
												d.reserveSO = ver.reserveSO;	// 2017.1.24 從APD帶回保留簽署意見設定值
												}
												found = true;
												break;
											}
										}
										if(found)
											break;
									}
								}
								_setDraftVer(d);	// 新增文稿版本
							}
							// 先從封裝檔的當前流程點收集簽核物件
							if(!!d.guid) {
								// 1130903 Raymond 中榮序181 修正XSignObjs.xml在分會流程點異動簽稿會核單後會畢退回, 分會合併流程點會寫入第一個版本中的簽核區域的pg-index為undefined的問題
								if(!!d.dispatchMergedID)
									var ver = this.getDraft(d.guid).getVer(d.dispatchMergedID);
								else
								var ver = this.getDraft(d.guid).getVer(d.id);
								if(!!ver) {
									// 加入簽核區域, 參照公文會用到
									_setSignArea(d, ver, $apd);
									
									for(var j=0; j<d.draftPages.signObjs.length; j++) {
										var so = d.draftPages.signObjs[j];
										var pg = _objids[so.obj];
										_setSignObj(so, pg, ver, $apd);
									}
									
									// 1071210 Raymond 1071159 搜尋所有流程點文稿的附件上的簽核物件, 並從AOLProcessData.xml恢復圖示flag
									if("attachs" in d) {
										for(var j=0; j<d.attachs.length; j++) {
											if("draftPages" in d.attachs[j] && "signObjs" in d.attachs[j].draftPages) {
												for(var k=0; k<d.attachs[j].draftPages.signObjs.length; k++) {
													var so = d.attachs[j].draftPages.signObjs[k];
													if(!("asIcon" in so)) {
														var $nd = $apd.find("簽核物件[Id='" + so.id + "']");
														if($nd.length > 0)
															so.asIcon = $nd.attr("貼式意見") == "Y";
													}
												}
											}
										}
									}
									
									/* 從前一個版本加入應保留的簽核物件
									var idx = ver.parent.xDraftVers.indexOf(ver);
									var keepSO = ver.keepSO == "true";
									while(idx > 0 && keepSO) {
										var pv = ver.parent.xDraftVers[--idx];
										theLogger.warn("保留版本(" + pv.id + ")的簽署意見:");
										for(var j=0; j<pv.xSignObjs.length; j++) {
											if(!ver.getSignObj(pv.xSignObjs[j])) {	// 未新增過才新增
												theLogger.warn("\t" + pv.xSignObjs[j].type + "(" + pv.xSignObjs[j].id + ")");
												ver.xSignObjs.push(pv.xSignObjs[j]);
											}
										}
										keepSO = pv.keepSO == "true";
									}*/
								}
								else
									theLogger.error("找不到文稿" + d.guid + "的版本" + pg.obj + ", 無法新增簽核物件(ID:" + so.id + ")");
							}
							// 1120222 Raymond 1111225 將內部意見同步回歷史流程點的文稿物件
							if(!!_xInnerCmtColl) {
								var hf = _xInnerCmtColl.getFlow(rev.substr(5));
								if(!!hf) {
									d.innerComment = hf.getCmt(d.guid);
								}
							}
						}
					}
					// 1120222 Raymond 1111225 將內部意見同步回歷史流程點的異動資訊物件
					if(!!_xInnerCmtColl) {
						var hf = _xInnerCmtColl.getFlow(rev.substr(5));
						if(!!hf) {
							_revs[rev].obj.changeInfo.ownOUId = hf.ownOUId;
							_revs[rev].obj.changeInfo.innerComment = hf.getCmt();
						}
					}
				}
				// 2017.1.25 檢核是否有異動撤消失不存在的文稿或版本
				for(var i=0; i<_xDrafts.length; i++) {
					for(var j=0; j<_xDrafts[i].xDraftVers.length; j++) {
						var v = _xDrafts[i].xDraftVers[j];
						try {
							var d = _findDraftByIdAllRev(v.id);
							if(!d) {
								theLogger.warn("外部記錄檔中的版本(ID:" + v.id + ")在封裝檔中找不到對應的文稿, 應是已異動撤消的文稿版本, 刪除此版本");
								_xDrafts[i].xDraftVers.splice(j, 1);
								--j;
							}
						}
						catch(e) {
							// 1130830 Raymond 中榮序218 載入XSignObjs.xml時, 異動過的文稿版本, 改移至暫存而不是直接刪除, 在載入SignWork.xml後, 判斷Updates中有此文稿ID再恢復, 以避免第二第文稿未點開的情況下自動備份, 會寫出ID沒有X的版本, 但SignWork.xml中Updates有此ID的異動文稿, 導致傳送時會發生-731問題
							//theLogger.warn(e.message + ", 從外部記錄檔中刪除此文稿版本");
							//_xDrafts[i].xDraftVers.splice(j, 1);
							theLogger.warn(e.message + ", 從外部記錄檔中暫時移除此文稿版本");
							if("tmpVers" in _xDrafts[i]) {
								_xDrafts[i].tmpVers = [_xDrafts[i].tmpVers, ..._xDrafts[i].xDraftVers.splice(j, 1)];
								theLogger.warn("此文稿已暫時移除版本:", _xDrafts[i].tmpVers);
							}
							else
								_xDrafts[i].tmpVers = [..._xDrafts[i].xDraftVers.splice(j, 1)];
							--j;
						}
					}
					if(_xDrafts[i].xDraftVers.length == 0) {
						theLogger.warn("外部記錄檔中的文稿(GUID:" + _xDrafts[i].guid + ")無任何版本, 應是已異動撤消的文稿, 刪除此文稿");
						_xDrafts.splice(i, 1);
						--i;
					}
				}
				// 2017.1.25 檢核簽核物件是否未關聯到實際物件的情形
				for(var i=0; i<_xDrafts.length; i++) {
					for(var j=0; j<_xDrafts[i].xDraftVers.length; j++) {
						var v = _xDrafts[i].xDraftVers[j];
						for(var k=0; k<v.xSignObjs.length; k++) {
							if(!v.xSignObjs[k].ref) {
								theLogger.error("簽核物件(ID:" + v.xSignObjs[k].id + ")未關聯到封裝檔內實際的簽核物件");
								v.xSignObjs.splice(k, 1);	// 2017.2.23 刪掉不合法的記錄
								--k;
							}
						}
					}
				}
				console.warn("同步封裝檔完畢, 外部簽核物件記錄:");
				console.warn(_xDrafts);
			},
			
			// 1130830 Raymond 中榮序218 載入XSignObjs.xml時, 異動過的文稿版本, 改移至暫存而不是直接刪除, 在載入SignWork.xml後, 判斷Updates中有此文稿ID再恢復, 以避免第二第文稿未點開的情況下自動備份, 會寫出ID沒有X的版本, 但SignWork.xml中Updates有此ID的異動文稿, 導致傳送時會發生-731問題
			recoverRemovedDraftVers(vers) {
				theLogger.log("復原已異動的文稿版本:", vers);
				for(var i=0; i<vers.length; i++) {
					for(var j=0; j<_xDrafts.length; j++) {
						if(_xDrafts[j].guid == vers[i].guid) {
							if(!!_xDrafts[j].tmpVers) {
								var found = false;
								for(var k=0; k<_xDrafts[j].tmpVers.length; k++) {
									if(_xDrafts[j].tmpVers[k].id == vers[i].verId) {
										_xDrafts[j].xDraftVers.push(_xDrafts[j].tmpVers.splice(k, 1)[0]);
										found = true;
										break;
									}
								}
								if(!found)
									theLogger.error("外部簽核記錄檔中原本就沒有已異動文稿" + vers[i].guid + "的版本(ID=" + vers[i].verId + ")可供復原!");
							}
							else
								theLogger.error("外部簽核記錄檔中原本就沒有已異動文稿" + vers[i].guid + "的版本可供復原!");
						}
					}
				}
			},
			
			getDraft: function(guid) {
				if(typeof guid === "undefined")
					theLogger.error("要求取得XDraft的GUID參數不可為" + guid);
				for(var i=0; i<_xDrafts.length; i++) {
					if(_xDrafts[i].guid == guid)
						return _xDrafts[i];
				}
				return null;
			},
			
			newDraft: function(draft) {
				for(var i=0; i<_xDrafts.length; i++) {
					if(_xDrafts[i].guid == draft.guid) {
						theLogger.warn("文稿GUID:" + draft.guid + "已存在記錄檔, 忽略新增");	// TODO: 改成更新欄位?
						// 2017.2.7 判斷最新版本是否為目前流程點新增的版本
						var v = _xDrafts[i].xDraftVers[_xDrafts[i].xDraftVers.length - 1];
						//if(v.msgId == theAOL.docObj.msgId) {
						if(v.msgId == _docObj.msgId) {	// 1090608 Raymond 1090103 對此封裝檔而言當前MsgID應為_docObj.msgId而非theAOL.docObj.msgId
							if(v.id != draft.id) {
								theLogger.warn("此文稿最新版本為目前流程點所新增, 但ID與目前ID不同, 應更新'" + v.id + "'->'" + draft.id + "'");
								v.id = draft.id;
							}
						}
						return _xDrafts[i];
					}
				}
				if("guid" in draft && typeof draft.guid === "string" && draft.guid.length > 0) {
					theLogger.warn("簽核物件記錄檔新增GUID:" + draft.guid + "的文稿");
					_xDrafts.push(new XDraft(draft));
					return _xDrafts[_xDrafts.length - 1];
				}
				else {
					theLogger.error("簽核物件記錄檔不可新增無GUID的文稿");
					throw new Error("簽核物件記錄檔不可新增無GUID的文稿");
				}
			},
			
			isDupXSignObj: function(param) {// 檢核簽核物件是否有重複ID的情形
				for(var i=0; i<_xDrafts.length; i++) {
					for(var j=0; j<_xDrafts[i].xDraftVers.length; j++) {
						for(var k=0; k<_xDrafts[i].xDraftVers[j].xSignObjs.length; k++) {
							if(_xDrafts[i].xDraftVers[j].xSignObjs[k].id == param.id)
								return true;
						}
					}
				}
				return false;
			},
			
			newSOID: function() {	// 取得新簽核物件ID或更新流水號
				if(arguments.length > 0) {
					_newSOSN = Math.max(_newSOSN, arguments[0]);
				}
				else
					return "X_" + (++_newSOSN);
			},
			
			findSignObjById: function(id) {	// 找各文稿同ID的簽核物件
				var res = [];
				for(var i=0; i<_xDrafts.length; i++) {
					var r = _xDrafts[i].findSignObjById(id);
					if(!!r)
						res = res.concat(r);
				}
				return res;
			},
			
			clearUnreferencedSignObjs: function() {	// 清除外部簽核物件記錄檔中未關聯封裝檔或暫存檔的簽核物件
				for(var i=0; i<_xDrafts.length; i++) {
					_xDrafts[i].clearUnreferencedSignObjs();
				}
			},
			
			updateSignObj: function(so) {	// 更新簽核物件類型及位置資訊
				for(var i=0; i<_xDrafts.length; i++) {
					if(_xDrafts[i].updateSignObj(so))	// 回傳true表示該物件屬於此文稿, 則不需再執行其它文稿的updateSignObj
						break;
				}
			},
			
			getReserveSO: function() {	// 2017.2.15 新增保留簽署物件設定
				return _reserveSO;
			},
			
			// 1060504 Raymond 新增saveRuntime函式供列印時呼叫, 所新增/更新的文稿、簽核區域、簽核物件資訊會存在另一個變數, 避免影響本來的外部簽核記錄檔
			saveRuntime: function() {
				// 1090929 Raymond 1090103 修正紙本公文不需載入封裝檔, 導致列印預覽出現錯誤而無法列印紙本公文的問題
				if(!_fm) {
					theLogger.warn("未初始化SignFolder, 不需儲存Runtime外部簽核物件資訊...");
					return;
				}
				// 1100607 Raymond 修正異動文稿內容再加完簽核物件後先列印再儲存, XSignObjs.xml儲存新版本會沒有剛加的簽核物件的問題
				theLogger.log("儲存Runtime外部簽核物件資訊前先儲存...");
				this.save();
				theLogger.warn("儲存Runtime外部簽核物件資訊...");
				//var reserveSO = theAOL.getCurrFolio().getReserveSO();	// 目前的保留簽署物件設定
				var reserveSO = _fm.getReserveSO();	// 1090608 Raymond 1090103 對此封裝檔而言當前FolioModel應為_fm而非theAOL.getCurrFolio()
				_xRuntimeDrafts.length = 0;	// 先清空Runtime文稿物件
				for(var i=0; i<_xDrafts.length; i++) {
					_xRuntimeDrafts.push($.extend(true, {}, _xDrafts[i]));	// 複製文稿
					
					// 判斷文稿是否有異動, 若有異動需產生一個新版本, 並將此流程點簽核物件搬到此版本
					function findDraft(id) {
						var snfo = _revs[_currRev].obj.signInfo;
						for(var i=0; i<snfo.drafts.length; i++) {
							var draft = snfo.drafts[i];
							if(draft.id == id)
								return draft;
						}
					}
					var ov = _xRuntimeDrafts[i].xDraftVers[_xRuntimeDrafts[i].xDraftVers.length-1];	// 最後一個版本
					//if(ov.id.indexOf("NewDraft") < 0 && ov.id.indexOf("X") < 0) {	// 只有ID是全數字的封裝後版本才要產生一個新的, 創稿或已儲存都會改成有英文的ID
					//if(ov.msgId != theAOL.docObj.msgId) {	// 2017.2.9 改成判斷此版本的msgId不是目前流程點, 就視為前一流程點, 才要產生新的版本
					if(ov.msgId != _docObj.msgId) {	// 1090608 Raymond 1090103 對此封裝檔而言當前MsgID應為_docObj.msgId而非theAOL.docObj.msgId
						var d = findDraft(ov.id);
						if(!!d) {
							if(d.dirty()) {
								theLogger.warn("文稿(ID:" + ov.id + ")已異動內容, 應產生一個新版本");
								var param = {
									guid: d.guid,
									id: d.id + "X",
									name: d.name,
									//flowId: "sign_" + theAOL.docObj.msgId,
									flowId: "sign_" + _docObj.msgId,	// 1090608 Raymond 1090103 對此封裝檔而言當前MsgID應為_docObj.msgId而非theAOL.docObj.msgId
									reserveSO: reserveSO?"true":"false"
								};
								// 1100607 Raymond 國教院序37 修正簽稿會核單/會辦單文別的更新文稿的保留簽署意見flag設置條件(1080785+1090409衍生問題)
								if(reserveSO && (d.docType == "簽稿會核單" || d.docType == "會辦單"))
									param.reserveSO = (theSSO.User.EnvSettings.get("WE_ALLOW_CON_KEEP_SIGNOBJ") == "Y")?"true":"false";
								if("fileRef" in d && !!d.fileRef)
									param.fileRef = d.fileRef;
								else
									param.fileName = d.fileName;
								var nv = _xRuntimeDrafts[i].addVer(param);
								if(!!nv) {
									theLogger.warn("新增版本成功, ID為'" + param.id + "'");
									//var cdm = theAOL.getCurrFolio().getCachedDM(d);
									var cdm = _fm.getCachedDM(d);	// 1090608 Raymond 1090103 對此封裝檔而言當前FolioModel應為_fm而非theAOL.getCurrFolio()
									if(!!cdm) {
										if(!!cdm.signAreas) {
											for(var j=0; j<cdm.signAreas.length; j++) {
												var sa = cdm.signAreas[j];
												var param = {
													pgIdx: sa.po,
													pgId: undefined,
													saType: sa.saType,
													saID: sa.id,
													left: Math.floor(Math.floor(sa.left) * 2480 / 794),
													top: Math.floor(Math.floor(sa.top) * 3507 / 1123),
													right: Math.floor(Math.floor(sa.left + sa.width) * 2480 / 794),
													bottom: Math.floor(Math.floor(sa.top + sa.height) * 3507 / 1123)
												};
												if(sa.po < d.draftPages.pages.length) {
													param.pgId = d.draftPages.pages[sa.po].id;
												}
												if(typeof param.pgId === "undefined")
													theLogger.error("找不到簽核區域#" + j + "所在頁次" + param.pgIdx + "的頁面ID");
												nv.xSignAreas.push(new XSignArea(nv, param));
											}
										}
										// 1060420 Raymond 前一次儲存的記錄在draft(封裝檔)物件
										else if(!!d.signAreas) {
											theLogger.log(d.signAreas);
											for(var j=0; j<d.signAreas.length; j++) {
												var sa = d.signAreas[j];
												var param = {
													pgIdx: sa.po,
													pgId: undefined,
													saType: sa.saType,
													saID: sa.id,
													left: Math.floor(Math.floor(sa.left) * 2480 / 794),
													top: Math.floor(Math.floor(sa.top) * 3507 / 1123),
													right: Math.floor(Math.floor(parseInt(sa.left) + parseInt(sa.width)) * 2480 / 794),
													bottom: Math.floor(Math.floor(parseInt(sa.top) + parseInt(sa.height)) * 3507 / 1123)
												};
												if(sa.po < d.draftPages.pages.length) {
													param.pgId = d.draftPages.pages[sa.po].id;
												}
												if(typeof param.pgId === "undefined")
													theLogger.error("找不到簽核區域#" + j + "所在頁次" + param.pgIdx + "的頁面ID");
												nv.xSignAreas.push(new XSignArea(nv, param));
											}
										}
										else
											theLogger.warn("此文稿無簽核區域資訊");
									}
									else
										theLogger.error("此文稿尚未載入!?");
										
									for(var j=0; j<ov.xSignObjs.length; j++) {
										//if(ov.xSignObjs[j].msgId == theAOL.docObj.msgId) {
										if(ov.xSignObjs[j].msgId == _docObj.msgId) {	// 1090608 Raymond 1090103 對此封裝檔而言當前MsgID應為_docObj.msgId而非theAOL.docObj.msgId
											theLogger.warn("移動本流程點新增的簽核物件(ID:" + ov.xSignObjs[j].id + ")至新增版本");
											nv.xSignObjs.push(ov.xSignObjs[j]);
											ov.xSignObjs.splice(j--, 1);
										}
									}
								}
							}
							else {
								theLogger.warn("文稿(ID:" + ov.id + ")未異動內容, 但強制更新最後一個版本的簽核區域資訊");
								//var cdm = theAOL.getCurrFolio().getCachedDM(d);
								var cdm = _fm.getCachedDM(d);	// 1090608 Raymond 1090103 對此封裝檔而言當前FolioModel應為_fm而非theAOL.getCurrFolio()
								if(!!cdm) {
									if(!!cdm.signAreas) {
										ov.xSignAreas.length = 0;	// 2017.2.22 更新就重加
										for(var j=0; j<cdm.signAreas.length; j++) {
											var sa = cdm.signAreas[j];
											var param = {
												pgIdx: sa.po,
												pgId: undefined,
												saType: sa.saType,
												saID: sa.id,
												left: Math.floor(Math.floor(sa.left) * 2480 / 794),
												top: Math.floor(Math.floor(sa.top) * 3507 / 1123),
												right: Math.floor(Math.floor(sa.left + sa.width) * 2480 / 794),
												bottom: Math.floor(Math.floor(sa.top + sa.height) * 3507 / 1123)
											};
											if(sa.po < d.draftPages.pages.length) {
												param.pgId = d.draftPages.pages[sa.po].id;
											}
											if(typeof param.pgId === "undefined")
												theLogger.error("找不到簽核區域#" + j + "所在頁次" + param.pgIdx + "的頁面ID");
											ov.xSignAreas.push(new XSignArea(ov, param));	// 更新就重加
										}
									}
									else
										theLogger.warn("此文稿無簽核區域資訊");
								}
								else
									theLogger.error("此文稿尚未載入!?");
							}
						}
						else
							theLogger.error("找不到版本ID為'" + ov.id + "的文稿, 無法判斷是否應產生一個新的版本");
					}
					else {	// 2017.1.23 草稿或異動內文要多檢查寫出簽核區域
						var did = ov.id.replace(/X$/, "");
						var d = findDraft(did);
						if(!!d) {
							//var cdm = theAOL.getCurrFolio().getCachedDM(d);
							var cdm = _fm.getCachedDM(d);	// 1090608 Raymond 1090103 對此封裝檔而言當前FolioModel應為_fm而非theAOL.getCurrFolio()
							if(!!cdm) {
								if(!!cdm.signAreas) {
									ov.xSignAreas.length = 0;	// 2017.2.22 更新就重加
									for(var j=0; j<cdm.signAreas.length; j++) {
										var sa = cdm.signAreas[j];
										var param = {
											pgIdx: sa.po,
											pgId: undefined,
											saType: sa.saType,
											saID: sa.id,
											left: Math.floor(Math.floor(sa.left) * 2480 / 794),
											top: Math.floor(Math.floor(sa.top) * 3507 / 1123),
											right: Math.floor(Math.floor(sa.left + sa.width) * 2480 / 794),
											bottom: Math.floor(Math.floor(sa.top + sa.height) * 3507 / 1123)
										};
										if(sa.po < d.draftPages.pages.length) {
											param.pgId = d.draftPages.pages[sa.po].id;
										}
										if(typeof param.pgId === "undefined")
											theLogger.error("找不到簽核區域#" + j + "所在頁次" + param.pgIdx + "的頁面ID");
										
										/* 2017.2.22 不要用saType+saID比對, 因為簽稿會核單會重複
										var found = false;
										for(var k=0; k<ov.xSignAreas.length; k++) {
											if(ov.xSignAreas[k].saType == param.saType && ov.xSignAreas[k].saID == param.saID) {
												found = true;
												theLogger.warn("找到簽核區域(saType:'" + param.saType + "',saID:'" + param.saID + "'), 更新pgIdx:" + ov.xSignAreas[k].pgIdx + "->" + param.pgIdx + ", pgId:" + ov.xSignAreas[k].pgId + "->" + param.pgId + ", left:" + ov.xSignAreas[k].left + "->" + param.left + ", top:" + ov.xSignAreas[k].top + "->" + param.top + ", right:" + ov.xSignAreas[k].right + "->" + param.right + ", bottom:" + ov.xSignAreas[k].bottom + "->" + param.bottom);
												// 更新簽核區域資訊
												ov.xSignAreas[k].pgIdx = param.pgIdx;
												ov.xSignAreas[k].pgId = param.pgId;
												ov.xSignAreas[k].left = param.left;
												ov.xSignAreas[k].top = param.top;
												ov.xSignAreas[k].right = param.right;
												ov.xSignAreas[k].bottom = param.bottom;
											}
										}
										if(!found) {	// 找不到相符的簽核區域則新增
											theLogger.warn("新增簽核區域(saType:'" + param.saType + "',saID:'" + param.saID + "'), pgIdx:" + param.pgIdx + ", pgId:" + param.pgId + ", left:" + param.left + ", top:" + param.top + ", right:" + param.right + ", bottom:" + param.bottom);
											ov.xSignAreas.push(new XSignArea(ov, param));
										}*/
										ov.xSignAreas.push(new XSignArea(ov, param));	// 2017.2.22 更新就重加
									}
								}
								else
									theLogger.warn("此文稿無簽核區域資訊");
							}
							else
								theLogger.error("此文稿尚未載入!?");
						}
						else
							theLogger.error("找不到版本ID為'" + ov.id + "的文稿, 無法判斷是否應產生一個新的版本");
					}
				}
			},
			
			// 1060504 Raymond 新增getRuntimeDraft函式供列印時呼叫, 存取已依目前排版結果更新簽核區域資訊的暫存文稿物件
			getRuntimeDraft: function(guid) {
				if(typeof guid === "undefined")
					theLogger.error("要求取得XDraft的GUID參數不可為" + guid);
				for(var i=0; i<_xRuntimeDrafts.length; i++) {
					if(_xRuntimeDrafts[i].guid == guid)
						return _xRuntimeDrafts[i];
				}
				return null;
			},
			
			// 1110620 Raymond 1110579 新增missingXSignObjs, 異動撤消後記錄在XSignObjs.xml中但在封裝檔中找不到的簽核物件
			missingXSignObjs: _missingXSignObjs,
			// 1110621 Raymond 1110579 新增搜尋異動撤消後記錄在XSignObjs.xml中但在封裝檔中找不到的簽核物件
			findMissingXSignObj: function(so) {
				for(var i=0; i<_missingXSignObjs.length; i++) {
					if(_missingXSignObjs[i].msgId == so.msgId) {
						if(!!_missingXSignObjs[i].tmpId && _missingXSignObjs[i].tmpId == so.id)
							return _missingXSignObjs[i];
						else if(!_missingXSignObjs[i].tmpId && _missingXSignObjs[i].time == so.time)
							return _missingXSignObjs[i];
					}
				}
			},
			// 1111025 Raymond 1110864 合併1101464, 新增取得指定msgId的流程點簽核人員資訊
			getXFlowSigner: function(msgId) {
				if(typeof msgId === "undefined")
					theLogger.error("要求取得XFlowSigner的MsgId參數不可為" + msgId);
				for(var i=0; i<_xFlowSigners.length; i++) {
					if(_xFlowSigners[i].msgId == msgId)
						return _xFlowSigners[i];
				}
				return null;
			},
			// 1120221 Raymond 1111225 新增內部意見記錄功能
			setInnerCmt: function(txt, uri) {
				_xInnerCmtColl.addCmt(txt, uri);
			},
			getSameLv1OUInnerCmts: function(ownOUId) {
				if(!_xInnerCmtColl)	// 創稿或之前已儲存的XSignObjs.xml無<內部意見>時
					return null;
				return _xInnerCmtColl.findFlows(ownOUId);
			}
		};
	}
	
	return {
		// public methods
		// 1070612 Raymond 1070547 修改SignFolder.init參數, 多傳入fm, 少傳入docObj, docObj改由fm.getDocObj()間接取得
		//init: function(fileIOUrl, dirPath, ecapFileName, docObj) {	// 2016.8.11 新增docObj參數
		init: function(fm, fileIOUrl, dirPath, ecapFileName) {
			var dfd = $.Deferred();
			
			_fileIOUrl = fileIOUrl;
			_dirPath = dirPath;
			// 1070612 Raymond 1070547 修改SignFolder.init參數, 多傳入fm, 少傳入docObj, docObj改由fm.getDocObj()間接取得
			//_docObj = docObj;					// 2016.8.11 新增docObj參數
			_fm = fm;
			_docObj = fm.getDocObj();
			this.ecapFileName = ecapFileName;	// 2016.7.22 新增記錄原下載封裝檔名, 以供要號後更名判斷
			
			// 1070608 Raymond 1070197 分會流程點的文稿序號改從ODWMSG.THREAD*10000+1開始編起
			if("ODWMSG" in _docObj && "THREAD" in _docObj.ODWMSG && _docObj.ODWMSG.THREAD != "" && _docObj.ODWMSG.THREAD != "0") {
				_lastdraftsn = parseInt(_docObj.ODWMSG.THREAD) * 10000;
				theLogger.warn("這是分會流程點, 文稿序號從" + _lastdraftsn + "開始編");
			}
			// 1070112 Raymond 1060452 新增取得環境變數判斷是否為鐵工局的秘書或直屬長官, 多對多
			/* for testing
			theSSO.User.EnvSettings.AOL_SECRETARY_OWN_OU = "241,242,24";
			theSSO.User.EnvSettings.AOL_SECRETARY_OWN_ROLE = "OD99";
			theSSO.User.EnvSettings.AOL_SUPERVISOR_OWN_OU = "241,242,24";
			theSSO.User.EnvSettings.AOL_SUPERVISOR_OWN_ROLE = "OD11,OD21";*/
			_secretaryOwnOUId = theSSO.User.EnvSettings.get("AOL_SECRETARY_OWN_OU");
			_secretaryOwnRoleId = theSSO.User.EnvSettings.get("AOL_SECRETARY_OWN_ROLE");
			_supervisorOwnOUId = theSSO.User.EnvSettings.get("AOL_SUPERVISOR_OWN_OU");
			_supervisorOwnRoleId = theSSO.User.EnvSettings.get("AOL_SUPERVISOR_OWN_ROLE");
			if(_secretaryOwnOUId.length > 0 && _secretaryOwnRoleId.length > 0 &&
				_supervisorOwnOUId.length > 0 && _supervisorOwnRoleId.length > 0) {
				// 用所有扮演角色來判斷
				for(var i=0; i<theSSO.User.PlayRoles.length; i++) {
					var r = theSSO.User.PlayRoles[i];
					if(_matchSecretaryRole(r.unitNo, r.id)) {
						_isSecretary = true;
						theLogger.warn("目前使用者所扮演角色包含鐵工局的秘書角色");
					}
					if(_matchSupervisorRole(r.unitNo, r.id)) {
						if(_isSecretary)	// 長官及秘書角色功能互斥, 不能並存
							alert("秘書與直屬長官的簽辦意見功能互斥,\n帳號所扮演角色不能同時兼具此兩種角色,\n系統優先以秘書角色套用功能");
						else {
							_isSupervisor = true;
							theLogger.warn("目前使用者所扮演角色包含鐵工局的秘書直屬長官角色");
						}
					}
				}
				if(!_isSecretary && !_isSupervisor)
					theLogger.warn("目前使用者所扮演角色非鐵工局的秘書或直屬長官角色");
			}
			else
				theLogger.warn("未設定鐵工局的秘書及直屬長官環境變數, 不須判斷是否為秘書或直屬長官");
			
			var that = this;
			// 使用WebFileIO下載封裝檔
			var wfio = new WebFileIO(fileIOUrl);
			wfio.download(dirPath, ecapFileName, {
				success: function(fil, res) {
					theLogger.log(fil);
					try {	// 2016.5.9 新增try-catch
						_ecaps = new ECaps(fil);
						
						// 1100521 Raymond 1090821 非歷史檢視的參照公文, 不需要將當前流程點從最後一個移至最後一個非單層式的流程點
						// 1100512 Raymond 1090821 判斷是否有單層式文稿頁面, 有的話要將當前流程點從最後一個移至最後一個非單層式的流程點
						//if(_hasSingleLayerDraft == true) {
						if(_hasSingleLayerDraft == true && !_fm.isRefDoc()) {
							var lastMyorgRev = undefined;
							for(rev in _revs) {
								if(_revs[rev].hasSingleLayerDraft == true)	// 有單層式文稿頁面的流程點應為外機關的最後一個流程點, 跳過
									continue;
								else if(_revs[rev].noDraftPages == true)	// 無文稿頁面的流程點應為外機關流程點, 跳過
									continue;
								else	// 非單層式且有文稿頁面應為本機關流程點
									lastMyorgRev = rev;
							}
							if(!!lastMyorgRev) {
								theLogger.log("最後一個本機關流程點為'" + _currRev + "'->'" + lastMyorgRev + "'");
								_currRev = lastMyorgRev;
							}
						}

						// 2021.5 - 1100093 - merge: 1081168 2020.3.9 - 1081168 Eric, 保留封裝檔內容以處理彙併辦子文封裝!
						// 2021.12.28 - Eric, 將預設值改為true (彙併辦母文傳送時一併封裝子文)
						let _checkEnvelopSubDoc = true;
						let sValEnveCOMDoc = theSSO.User.EnvSettings.get('SSO_ENVELOP_COMDOC');
						if (typeof sValEnveCOMDoc=='string' && sValEnveCOMDoc.length && SSOUtil.isValueFalse(sValEnveCOMDoc)) {
							_checkEnvelopSubDoc = false;
						}
						if (_checkEnvelopSubDoc) {
							let nodeSiteContents = fil.getElementsByTagName("簽核點定義");
							if (nodeSiteContents.length) {
								let nodeSiteContent = nodeSiteContents[nodeSiteContents.length-1];
								// 確認MsgId不為目前簽辦公文之MsgId
								let sId = $(nodeSiteContent).attr('Id');
								let sHeader = 'sign_';
								let nodeMsgId = '';
								if (sId.length>sHeader.length) {
									nodeMsgId = sId.substr(sId.indexOf(sHeader)+sHeader.length); // sign_$MsgId$
								}
								if (nodeMsgId.length && _docObj.msgId==nodeMsgId) {
									// 不使用目前流程點之<簽核點定義>
									if (nodeSiteContents.length>1) {
										nodeSiteContent = nodeSiteContents[nodeSiteContents.length-2]; // 取前一個流程點內容
									}
									else {
										nodeSiteContent = null;
									}
								}
			
								if (nodeSiteContent!==null) {
									// <簽核文件夾>/<併文清單>/<子文>
									let nodeCOMNos = nodeSiteContent.getElementsByTagName("子文");
									if (nodeCOMNos.length) {
										_docObj._enveXML = fil;
									}
								}	
							}
						}
					}
					catch(e) {
						dfd.reject(e.message);
						return;
					}
					
					//if(dumpPlaceHolder != undefined)
					//	doDump(_ecaps, dumpPlaceHolder);
					// 2017.1.12 下載外部簽核物件記錄檔
					wfio.download(dirPath, "XSignObjs.xml", {
						success: function(fil, res) {
							// 1070517 Raymond 1070547 修改了SignFolder.init參數, 多傳入fm, 少傳入docObj, docObj要改成_docObj
							//_xSignFolder.load(fil, docObj.msgId);	// 2017.2.17 新增第2參數傳入目前msgId
							_xSignFolder.load(fil, _docObj.msgId);	// 2017.2.17 新增第2參數傳入目前msgId
							dfd.resolve(that);
						},
						error: function(errorText) {
							theLogger.warn(errorText);
							dfd.resolve(that);
						}
					});
					
					/* 2016.7.27 因為草稿特性, SignWork.xml必須移至文稿管理檔都處理完才能解析
					var cachedSignWork = theAOL.docObj.docNo + ".SignWork.xml";
					if(cachedSignWork in sessionStorage) {
						theLogger.log("讀取暫存於連線階段的簽核工作檔'" + cachedSignWork + "'");
						var xml = (new DOMParser()).parseFromString(sessionStorage[cachedSignWork], "text/xml");
						theLogger.log(xml);
						var sw = new SignWorkParser(that);
						sw.load(xml);
						dfd.resolve(that);
					}
					else {
						// 2013.10.16 - Raymond, 下載SignWork.xml
						theLogger.log("下載簽核工作檔'" + dirPath + "\\SignWork.xml'...");
						wfio.download(dirPath, "SignWork.xml", {
							success: function(fil, res) {
								theLogger.log(fil);
								var sw = new SignWorkParser(that);
								sw.load(fil);
								dfd.resolve(that);
							},
							error: function(errorText) {
								theLogger.log(errorText);
								dfd.resolve(that);
							}
						});
					}*/
				},
				error: function(status) {
					dfd.reject(status);
				}
			});
			return dfd.promise();
		},
		// 1110106 Raymond 1101423 修正「轉線上」(EDT213)後的公文, 開啟儲存後文稿管理檔仍殘留轉線上之前新增的舊文稿(簽核頁面看不到但發文登錄會列出)的問題, 新增文稿管理檔物件參數
		//mergeSignWork: function() {	// 2016.7.27 改由FolioModel呼叫解析SignWork.xml
		mergeSignWork: function(currMgmt) {	// 2016.7.27 改由FolioModel呼叫解析SignWork.xml
			var dfd = $.Deferred();
			var that = this;
			/* 1111117 Raymond 1111069 取消從Cache載入簽核工作檔, 以避免不明步驟造成載入不同筆公文的文稿取代目前公文的文稿的問題
			//var cachedSignWork = theAOL.docObj.docNo + ".SignWork.xml";
			var cachedSignWork = _docObj.docNo + ".SignWork.xml";	// 1090608 Raymond 1090103 對此封裝檔而言當前docNo應為_docObj.docNo而非theAOL.docObj.docNo
			if(cachedSignWork in sessionStorage) {
				theLogger.log("讀取暫存於連線階段的簽核工作檔'" + cachedSignWork + "'");
				var xml = (new DOMParser()).parseFromString(sessionStorage[cachedSignWork], "text/xml");
				theLogger.log(xml);
				// 1110106 Raymond 1101423 修正「轉線上」(EDT213)後的公文, 開啟儲存後文稿管理檔仍殘留轉線上之前新增的舊文稿(簽核頁面看不到但發文登錄會列出)的問題, 多傳入文稿管理檔物件參數
				//var sw = new SignWorkParser(that);
				var sw = new SignWorkParser(that, currMgmt);
				sw.load(xml);
				dfd.resolve(sw);	// 2017.2.16 bugfix
			}
			else*/ {
				// 2013.10.16 - Raymond, 下載SignWork.xml
				theLogger.log("下載簽核工作檔'" + _dirPath + "\\SignWork.xml'...");
				var wfio = new WebFileIO(_fileIOUrl);
				wfio.download(_dirPath, "SignWork.xml", {
					allowMSXML: true,	// 1061030 Raymond 1061043 修正下載SignWork.xml時改用MSXML2.DOMDocument, 以避免需要設定屬性時IE的Element.setAttribute出現Invalid character錯誤
					success: function(fil, res) {
						//theLogger.log(fil);	// 1070105 Raymond IE未開F12時, 會卡在這裡
						// 1110106 Raymond 1101423 修正「轉線上」(EDT213)後的公文, 開啟儲存後文稿管理檔仍殘留轉線上之前新增的舊文稿(簽核頁面看不到但發文登錄會列出)的問題, 多傳入文稿管理檔物件參數
						//var sw = new SignWorkParser(that);
						var sw = new SignWorkParser(that, currMgmt);
						// 1101124 Raymond 1101321 修正鐵道局秘書的直屬長官看不到秘書的簽辦意見檔的問題
						// 1100901 Raymond 1100750 修正子文無msgId, 不需要嘗試下載文號-00-99目錄下的SignWork_msgId.xml
						// 1100615 Raymond 1100639 新增若載入SignWork.xml不是目前流程點的, 則嘗試下載文號-00-99目錄下的SignWork_msgId.xml
						//sw.load(fil);
						//if(sw.load(fil) === false) {
						//if(sw.load(fil) === false && !!_docObj.msgId) {
						if(sw.load(fil) === false && !!_docObj.msgId && !_isSecretary && !_isSupervisor) {
							var swfn = _docObj.docNo + "-00-99\\SignWork_" + _docObj.msgId + ".xml";
							theLogger.warn("因本流程點為異動撤消, SignWork.xml非本流程點所產生之暫存檔, 直接搜尋下載'" + swfn + "'...");
							wfio.download(_dirPath, swfn, {
								allowMSXML: true,
								success: function(fil2, res2) {
									theLogger.warn("'" + swfn + "'下載成功, 載入之以恢復成異動撤消後的傳送前狀態");
									// 1110620 Raymond 1110579 新增傳入第2參數isRecover為true, 修正異動撤消後, NewSignObj00X.png為被別的流程點覆蓋的職章, 導致顯示成別人的職章的問題
									//sw.load(fil2);
									sw.load(fil2, true);
									dfd.resolve(sw);	// 因異動撤消而直接讀文號-00-99目錄下的SignWork_msgId.xml, 至於1060452之秘書的簽辦意見檔, 在長官傳送後即已刪除, 也不能再讀到了
								},
								error: function(errorText) {
									theLogger.error(errorText);
									dfd.reject();
								}
							});
						}
						else {
						// 1060111 Raymond 1060452 若是鐵工局的秘書或秘書的直屬長官則要下載秘書的簽辦意見檔
						if(_isSecretary || _isSupervisor) {
							//var wfio = new WebFileIO(_fileIOUrl);
							wfio.download(_dirPath, "SecretarySignComment.xml", {
								allowMSXML: true,
								success: function(fil, res) {
									theLogger.warn("秘書的簽辦意見檔下載成功...");
									_secretarySignCommentDoc = fil;
									for(var i=0; i<_ecaps.capsCntn.eFile.aol.aolFlow.flows.length; i++) {
										var f = _ecaps.capsCntn.eFile.aol.aolFlow.flows[i];
										var sc = _getSecretarySignComment(f.id);
										if(!!sc) {
											// 1101124 Raymond 1101321 修正異動撤消回秘書流程點, 開啟時會發生轉圈圈的問題
											if(!!f.refChangeInfo) {
											theLogger.warn("設定" + f.id + "的簽辦意見(" + f.refChangeInfo.comment + ")為'" + sc + "'");
											f.refChangeInfo.comment = sc;
											}
										}
									}
									if(_isSecretary) {	// 目前簽辦意見即為秘書的簽辦意見
										var sc = _getSecretarySignComment("FLOW_" + _docObj.msgId);
										if(!!sc) {
											theLogger.warn("設定目前流程點的簽辦意見為'" + sc + "'");
											_signComment = sc;
										}
									}
									// 1080822 Raymond 1080706 下載鐵道局秘書意見檔完成時再resolve
									dfd.resolve(sw);
								},
								error: function(errorText) {
									theLogger.warn(errorText);
									// 1080822 Raymond 1080706 下載鐵道局秘書意見檔完成時再resolve
									dfd.resolve(sw);
								}
							});
						}
						else	// 1080822 Raymond 1080706 不需下載鐵道局秘書意見檔時, 才能resolve
						dfd.resolve(sw);	// 2016.12.13 傳入SignWorkParser物件, 有暫存附件產生時間資訊
						}	// end of if(sw.load(fil) === false)	// 1100615 Raymond 1100639
					},
					error: function(errorText) {
						theLogger.log(errorText);
						//dfd.reject(errorText);
						dfd.reject();	// 2017.2.16 bugfix for 開啟一代公文無SignWork.xml時, 後續處理若抓到errorText參數, 會誤判為有SignWork.xml
					}
				});
			}
			return dfd.promise();
		},
		eCaps: function() { // 電子封裝檔根節點
			return _ecaps;
		},
		xSignFolder: function() {	// 2017.1.11 新增額外儲存的簽核物件記錄資訊
			return _xSignFolder;
		},
		/*dump: function($ph) {
			if(_ecaps != undefined)
				doDump(_ecaps, $("<ul></ul>").appendTo($ph));
			else
				dumpPlaceHolder = $("<ul></ul>").appendTo($ph);
		},
		allPages: function() {  // 取得所有頁面檔
			return _pages;
		},*/
		getFullPath: function(so) { // 取得頁面、簽核物件等檔案全路徑(目前以相對路徑處理)
			if(typeof _dirPath !== "string")
				throw new Error("簽核公文夾的遠端子目錄路徑未設定!");
			else if(_dirPath.length <= 0)
				throw new Error("簽核公文夾的遠端子目錄路徑不可為空白!");
			if("fileSN" in so.content) {
				if(so.content.fileSN.match(/[0-9]+/)) {
					var rev = _revs[_currRev];
					if(typeof so.flowId === "string" && so.flowId.length && so.flowId in _revs) {	// 2015.4.14 fileSN指向的檔案資訊在flowId指向的簽核點定義, 非當前流程點
						rev = _revs[so.flowId];
					}
					if(Number(so.content.fileSN) < rev.obj.signInfo.files.length) {
						var fn = rev.obj.signInfo.files[so.content.fileSN].name;
						return _dirPath + ((_dirPath.search("/")>0)?"/":"\\") + fn;
					}
					else
						throw new Error("fileSN'" + so.content.fileSN + "'超出範圍!");
				}
				else
					throw new Error("fileSN'" + so.content.fileSN + "'不是數字!");
			}
			return null;
		},
		// 1110620 Raymond 1110579 新增第2參數signDef, 提供異動撤消後從SignWork_msgId.xml還原職名章, 下載前次傳送時的職名章圖檔路徑
		//getSODataURL: function(so) {    // 取得頁面、簽核物件等檔案URL, 若是第二種初始化方式, 則下載後轉為DataURL回傳
		getSODataURL: function(so, signDef) {    // 取得頁面、簽核物件等檔案URL, 若是第二種初始化方式, 則下載後轉為DataURL回傳
			var dfd = $.Deferred();
			
			if(typeof _dirPath !== "string")
				dfd.reject("簽核公文夾的遠端子目錄路徑未設定!");
			else if(_dirPath.length <= 0)
				dfd.reject("簽核公文夾的遠端子目錄路徑不可為空白!");
			else {
				if("fileSN" in so.content) {
					if(so.content.fileSN.match(/[0-9]+/)) {
						var rev = _revs[_currRev], fn;
						// 1110620 Raymond 1110579 新增判斷若有傳入第2參數signDef, 則改用此簽核點定義物件來搜尋圖檔路徑
						if(!!signDef)
							rev = signDef;
						else
						if(typeof so.flowId === "string" && so.flowId.length && so.flowId in _revs) {	// 2015.4.14 fileSN指向的檔案資訊在flowId指向的簽核點定義, 非當前流程點
							rev = _revs[so.flowId];
						}
						$.each(rev.obj.signInfo.files, function(i, fi) {
							if(fi.fileSN == so.content.fileSN) {
								fn = fi.name;
								return false;
							}
						});
						if(typeof fn === "string" && fn.length > 0) {
							// 2019.12.19 - 1081132 Eric, MacPC support! window.realMac
							// 2019.10.17 - 1080905 Eric, iPadOS 13 quick-fix
							// 2014.5.8 - Raymond, 改用影像處理網頁服務解決解析度問題
							// 2016.11.22 改用改用影像處理網頁服務解決瀏覽器不支援TIF格式問題
							if(fn.match(/\.tif/gi) && navigator.userAgent.search(/Mobile/gi) < 0  && (window.realMac || navigator.userAgent.search(/Macintosh/gi) < 0)) {								
								// 2014.7.14 - Raymond, ImgTrans似乎無法處理章戳檔
								// 2016.11.25 用DocNo無法找到分會子目錄, 改用全路徑
								var imgProcUrl = "/odtools/imgtran.ashx?FileIOWS=" + _docObj.fileIOWS;
								imgProcUrl += ("&FilePath=" + encodeURIComponent(Base64.encode(_dirPath)));
								imgProcUrl += ("&FileName=" + encodeURIComponent(Base64.encode(fn)));
								imgProcUrl += ("&Format=33&SAMLart=" + localStorage['Artifact']);
								dfd.resolve(imgProcUrl);
							}
							else {
								if(_dirPath.indexOf("\\") > 0) {
									if(typeof _fileIOUrl !== "string")
										dfd.reject("下載簽核公文的WebFileIO Service網址未設定!");
									else if(_fileIOUrl.length <= 0)
										dfd.reject("下載簽核公文的WebFileIO Service網址不可為空白!");
									else {
										var wfio = new WebFileIO(_fileIOUrl);
										wfio.download(_dirPath, fn, {
											success: function(fil, res) {
												if(typeof fil === "string" && fil.length > 40)
													theLogger.log(fil.substr(0, 40) + "...(length: " + fil.length + ")");
												else
													theLogger.log(fil);
												dfd.resolve(fil);
											},
											error: function(status) {
												dfd.reject(status);
											}
										});
									}
								}
								else
									dfd.resolve(_dirPath + "/" + fn);
							}
						}
						else
							dfd.reject("fileSN'" + so.content.fileSN + "'找不到!");
					}
					else
						dfd.reject("fileSN'" + so.content.fileSN + "'不是數字!");
				}
				else if("fileName" in so.content || "fileName" in so) {
					var fileName = undefined;
					if(typeof so.content.fileName === "string" && so.content.fileName.length > 0)
						var fileName = so.content.fileName;
					else if(typeof so.fileName === "string" && so.fileName.length > 0)
						var fileName = so.fileName;
					if(typeof fileName !== "undefined") {
						// 2020.2.5 - 1081132 Eric, bug-fix.
						// 2019.12.19 - 1081132 Eric, MacPC support! window.realMac
						// 2019.10.17 - 1080905 Eric, iPadOS 13 quick-fix
						// 2016.11.22 改用改用影像處理網頁服務解決瀏覽器不支援TIF格式問題
						if(fileName.match(/\.tif/gi) && navigator.userAgent.search(/Mobile/gi) < 0 && (window.realMac || navigator.userAgent.search(/Macintosh/gi) < 0)) {
							// 2014.10.20 - Raymond, ImgTrans似乎無法處理章戳檔
							// 2016.11.25 用DocNo無法找到分會子目錄, 改用全路徑
							var imgProcUrl = "/odtools/imgtran.ashx?FileIOWS=" + _docObj.fileIOWS;
							imgProcUrl += ("&FilePath=" + encodeURIComponent(Base64.encode(_dirPath)));
							imgProcUrl += ("&FileName=" + encodeURIComponent(Base64.encode(fileName)));
							imgProcUrl += ("&Format=33&SAMLart=" + localStorage['Artifact']);
							dfd.resolve(imgProcUrl);
						}
						else {
							/* 1111117 Raymond 1111069 取消從Cache載入簽核圖檔, 以避免不明步驟造成載入不同筆公文的文稿取代目前公文的文稿的問題
							// 2015.1.15 - Raymond, 新增從sessionStorage中讀回暫存的簽核圖檔
							//var cachedFile = theAOL.docObj.docNo + "." + fileName;
							var cachedFile = _docObj.docNo + "." + fileName;	// 1090608 Raymond 1090103 對此封裝檔而言當前docNo應為_docObj.docNo而非theAOL.docObj.docNo
							if(cachedFile in sessionStorage) {
								theLogger.log("讀取暫存於連線階段的簽核影像檔'" + cachedFile + "'");
								dfd.resolve(sessionStorage[cachedFile]);
							}
							else*/ {
								// 2014.5.8 - Raymond, 改用影像處理網頁服務解決解析度問題
								if(_dirPath.indexOf("\\") > 0) {
									if(typeof _fileIOUrl !== "string")
										dfd.reject("下載簽核公文的WebFileIO Service網址未設定!");
									else if(_fileIOUrl.length <= 0)
										dfd.reject("下載簽核公文的WebFileIO Service網址不可為空白!");
									else {
										theLogger.log("下載簽核影像檔'" + _dirPath + "\\" + fileName + "'...");
										var wfio = new WebFileIO(_fileIOUrl);
										wfio.download(_dirPath, fileName, {
											success: function(fil, res) {
												if(typeof fil === "string" && fil.length > 40)
													theLogger.log(fil.substr(0, 40) + "...(length: " + fil.length + ")");
												else
													theLogger.log(fil);
												dfd.resolve(fil);
											},
											error: function(status) {
												dfd.reject(status);
											}
										});
									}
								}
								else    // fileName設定為相對路徑?
									dfd.resolve(_dirPath + "/" + fileName);
							}
						}
					}
					else
						dfd.reject("未設定fileName");
				}
				else
					dfd.reject("僅支援fileSN或fileName形式的簽核物件電子檔下載");
			}
			return dfd;
		},
		getAolFlow: function() {    // 取得線上簽核流程, 若參數給"json"則回傳JSON字串
			if(arguments.length > 0) {
				if(arguments[0] == "json") {
					return JSON.stringify(_ecaps.capsCntn.eFile.aol.aolFlow);
				}
			}
			return _ecaps.capsCntn.eFile.aol.aolFlow;
		},
		// 2013.9.4 新增方法
		getDraftCounts: function() {    // 取得文稿數
			// 2016.7.13 創稿無_revs
			if(_currRev == "")
				return 0;
			
			var snfo = _revs[_currRev].obj.signInfo;
			if(snfo.drafts.length > 0) {	// 2016.1.15 若有來文簽辦文稿則忽略來文文件夾
				for(var i=0; i<snfo.drafts.length; i++) {
					if(snfo.drafts[i].name == "來文簽辦")
						return snfo.drafts.length;
				}
			}
			// 1100512 Raymond 1090821 新增外會公文的外機關文稿
			//return snfo.drafts.length + ((snfo.fromFolder !== undefined)?1:0);
			return snfo.drafts.length + ((snfo.fromFolder !== undefined)?1:0) + ((!!snfo.exorgDraft)?1:0);
		},
		getDraft: function(idx) {       // 取得文稿物件
			var snfo = _revs[_currRev].obj.signInfo;
			if(idx >= 0 && idx < snfo.drafts.length)
				return snfo.drafts[idx];
			else if(idx == snfo.drafts.length && snfo.fromFolder !== undefined)
				return snfo.fromFolder.fromDoc;
			// 1100512 Raymond 1090821 外會公文的外機關文稿
			else if(idx >= snfo.drafts.length && !!snfo.exorgDraft)
				return snfo.exorgDraft;
			else
				throw new Error("指定文稿'" + idx + "'超出範圍");
		},
		// 2015.1.22 - Raymond, 新增依Id(文件夾識別碼)查找文稿物件方法
		getDraftById: function(id) {
			var snfo = _revs[_currRev].obj.signInfo;
			for(var i=0; i<snfo.drafts.length; i++) {
				// 1130123 Raymond 1120887 新增判斷是否為分會合併後的文稿, 是則搜尋合併時的舊ID
				//if(snfo.drafts[i].id == id)
				if(snfo.drafts[i].id == id || (!!snfo.drafts[i].dispatchMergedID && snfo.drafts[i].dispatchMergedID == id))
					return snfo.drafts[i];
			}
			if(snfo.fromFolder !== undefined && snfo.fromFolder.id == id)
				return snfo.fromFolder.fromDoc;
			throw new Error("找不到指定Id:'" + id + "'之文稿物件");
		},
		getDraftPageCounts: function(idx) { // 取得文稿頁數
			var snfo = _revs[_currRev].obj.signInfo;
			if(idx >= 0 && idx < snfo.drafts.length)
				return snfo.drafts[idx].draftPages.pages.length;
			else if(idx == snfo.drafts.length && snfo.fromFolder !== undefined)
				return snfo.fromFolder.fromDoc.pages.length;
			// 1100512 Raymond 1090821 外會公文的外機關文稿
			else if(idx >= snfo.drafts.length && !!snfo.exorgDraft)
				return snfo.exorgDraft.draftPages.pages.length;
			else
				throw new Error("指定文稿'" + idx + "'超出範圍");
		},
		getDraftPage: function(idx, po) {  // 指定稿序及頁次取得文稿頁面
			var snfo = _revs[_currRev].obj.signInfo;
			if(idx >= 0 && idx < snfo.drafts.length) {
				var draft = snfo.drafts[idx];
				if(po == undefined) // 若未指定頁次, 則回傳頁面物件集合
					return draft.draftPages.pages;
				if(po >= 0 && po < draft.draftPages.pages.length)
					return draft.draftPages.pages[po];
				else
					throw new Error("指定文稿'" + idx + "'之頁次'" + po + "'超出範圍");
			}
			else if(idx == snfo.drafts.length && snfo.fromFolder !== undefined) {
				var fromDoc = snfo.fromFolder.fromDoc;
				if(po == undefined) // 若未指定頁次, 則回傳頁面物件集合
					return fromDoc.pages;
				if(po >= 0 && po < fromDoc.pages.length)
					return fromDoc.pages[po];
				else
					throw new Error("指定來文之頁次'" + po + "'超出範圍");
			}
			// 1100512 Raymond 1090821 外會公文的外機關文稿
			else if(idx >= snfo.drafts.length && !!snfo.exorgDraft) {
				var exorgDraft = snfo.exorgDraft;
				if(po == undefined) // 若未指定頁次, 則回傳頁面物件集合
					return exorgDraft.draftPages.pages;
				if(po >= 0 && po < exorgDraft.draftPages.pages.length)
					return exorgDraft.draftPages.pages[po];
				else
					throw new Error("指定外機關文稿之頁次'" + po + "'超出範圍");
			}
			else
				throw new Error("指定文稿'" + idx + "'超出範圍");	// 2016.12.29 bugfix
		},
		// 1061113 Raymond 1061068 判斷來文附件頁面是否允許實際上旋轉(影像處理)
		enableRcvAttPageRotate: function(pg) {
			var fromDoc = pg.container.parent;	// 來文文稿
			var n = this.getDraftCounts();
			var res = true;	// 預設允許
			for(var i=0; i<n; i++) {
				var d = this.getDraft(i);
				if(!!d) {
					var isFromDoc = ("fromType" in d)?1:((d.name == "來文簽辦")?2:0);
					if (isFromDoc == 2 ||	// 來文簽辦公文, 須進一步判斷是否為傳送失敗, 否則應禁止來文附件頁面旋轉
						isFromDoc == 0) {	// 一般文稿
						if("flowId" in d) {	// 已存在封裝檔的文稿, 會有此欄位
							if(d.flowId.match(/sign_\d+/)) {
								var msgIdOfDraft = d.flowId.substr(5);
								if(msgIdOfDraft != _docObj.msgId) {
									theLogger.warn("此文稿的流程點資訊(" + msgIdOfDraft + ")顯示與目前流程點(" + _docObj.msgId + ")不一致, 禁止旋轉來文附件頁面");
									res = false;	// 只要有一筆文稿非此流程點新增, 即須禁止來文附件頁面旋轉功能
									//break;
								}
								else
									theLogger.log("此文稿的流程點資訊(" + msgIdOfDraft + ")顯示與目前流程點(" + _docObj.msgId + ")一致, 為本流程點新增的文稿");
							}
							else
								theLogger.error("文稿的流程點資訊(" + d.flowId + ")格式不正確!");
						}
						else {
							// 尚未存在封裝的文稿, 必定是此流程點新增?
							theLogger.warn("尚未存在封裝的文稿, 必定是此流程點新增?");
						}
					}
					else
						theLogger.log("此文稿為來文, 若無其它非本流程點所新增之文稿, 預設允許來文附件旋轉(影像處理)");
				}
				else
					theLogger.error("無文稿物件, 無法判斷是否為本流程點新增");
			}
			return res;
		},
		//getPageImage: function(page, cbdata) {	// 2016.11.1 新增cbdata參數, resolve時直接回傳
		getPageImage: function(page, cbdata, disp) {	// 1090828 Raymond 1090529 新增disp參數, 值為true時檢查是否應套用強制顯示浮水印, 否則檢核是否應套用強制浮水印
			var dfd = $.Deferred();
			// 1091014 Raymond 1090564 新增判斷信保特殊模式的本文頁面允許旋轉
			// 1061113 Raymond 1061068 判斷來文附件頁面是否允許實際上旋轉(影像處理)
			// 1060828 Raymond 1060749 新增判定來文附件允許旋轉
			// 1060607 Raymond 1060283 向左或向右旋轉90度
			//if("rotate" in page && page.rotated != page.rotate && page.fileRef.name.match(/\d{4}\-\d+.\d{4}/)) {
			//if("rotate" in page && page.rotated != page.rotate && (page.fileRef.name.match(/\d{4}\-\d+.\d{4}/) || ("parent" in page.container && "fromType" in page.container.parent))) {
			//if("rotate" in page && page.rotated != page.rotate && (page.fileRef.name.match(/\d{4}\-\d+.\d{4}/) || ("parent" in page.container && "fromType" in page.container.parent && this.enableRcvAttPageRotate(page)))) {
			if("rotate" in page && page.rotated != page.rotate && (page.fileRef.name.match(/\d{4}\-\d+.\d{4}/) || ("parent" in page.container && "fromType" in page.container.parent && this.enableRcvAttPageRotate(page)) || (_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2" && page.fileRef.name.match(/^NewDraft\-P\-/)))) {
				if(typeof SSO_CONFIG.getWSUrl("imgws") !== "string")
					dfd.reject("旋轉附件頁面的WebFileIO Service網址未設定!");
				else if(SSO_CONFIG.getWSUrl("imgws").length <= 0)
					dfd.reject("旋轉附件頁面的WebFileIO Service網址不可為空白!");
				else {
					theLogger.log("旋轉附件頁面 " + page.rotated + " -> " + page.rotate);
					var params = {argArtifact: window.theUserInfo.Artifact,
									Path: _dirPath,
									FileName: [{string: page.fileRef.name}],	// 1060621 Raymond 檔名參數改成陣列以支援複數頁面可一次旋轉功能
									Angle: ("rotated" in page)?(page.rotate - page.rotated):page.rotate};
					if("rotated" in page) {
						if(page.rotated == 270 && page.rotate == 0)
							params.Angle = 90;
						else if(page.rotate == 270 && page.rotated == 0)
							params.Angle = -90;
					}
					// 1141217	Leslie[國合序451]	修正因單號[1141255]改動附件匯出頁面的儲存流程，而影響的頁面轉向問題
					var rotaUrl = SSO_CONFIG.getWSUrl("imgws");
					if('content' in page && page.content.match(/^http[s]?:\/\//i)){
						var sp = page.fileRef.name.lastIndexOf('\\'),
							srcAttPath = page.fileRef.name.substr(0, sp),
							fname = page.fileRef.name.substr(sp + 1),
							rotaUrl = page.content.substr(0, page.content.toLowerCase().indexOf("imgconvert")) + "/WebFileIO/T2100FileIOService.asmx";
						params['Path'] = srcAttPath;
						params['FileName'] = [{string: fname}];
					}

					theLogger.log(params);
					// 1141217	Leslie[國合序451]	修正因單號[1141255]改動附件匯出頁面的儲存流程，而影響的頁面轉向問題
					// theWebServices.invokeWS(SSO_CONFIG.getWSUrl("imgws"), "ImgRotate", "http://2100T.com.tw", params, true, function(r) {
					theWebServices.invokeWS(rotaUrl, "ImgRotate", "http://2100T.com.tw", params, true, function(r) {
						theLogger.log("ImgRotate returns:");
						theLogger.log(r);
						if("m_bSuccess" in r && r.m_bSuccess == "false") {
							theLogger.error("旋轉附件頁面失敗 - " + r.m_strErrMsg);
							dfd.reject(r.m_strErrMsg);
						}
						else {
							page.rotated = page.rotate;
							//1141217	Leslie[國合序451]	修正因單號[1141255]改動附件匯出頁面的儲存流程，而影響的頁面轉向問題
							if("content" in page)
								dfd.resolve(page.content, 300, cbdata);	// 2016.11.1 直接回傳cbdata參數
							else
							doGetPageImage();	// 1060607 Raymond 1060283 呼叫切出的獨立函式取得附件頁面影像的URL
						}
					});
				}
			}
			else if("content" in page) {	// 2016.7.19 新增匯出的附件影像在content
				dfd.resolve(page.content, 300, cbdata);	// 2016.11.1 直接回傳cbdata參數
			}
			else if("fileRef" in page) {
				doGetPageImage();	// 1060607 Raymond 1060283 改呼叫切出的獨立函式
			}
			else
				dfd.reject("page物件無fileRef參照!");
			// 1060607 Raymond 1060283 實際下載影像檔或處理為URL的部分切為獨立函式
			function doGetPageImage() {
				// 2019.12.19 - 1081132 Eric, MacPC support! window.realMac
				// 2019.10.17 - 1080905 Eric, iPadOS 13 quick-fix
				if(((!window.realMac && window.navigator.userAgent.indexOf("Macintosh") > 0)) ||
				   (window.navigator.userAgent.indexOf("Mobile") > 0 &&										// 2016.4.26
					window.navigator.userAgent.match(/iPad; CPU OS (\d+)_/g) && Number(RegExp.$1) > 8)/* ||	// iPad OS 8.0以上, 直接使用原解析度的TIF影像顯示, 降低呼叫ImgTran.ashx的頻率
					_docObj.isDraft*/) {																		// 2016.8.11 新增判定草稿也要直接下載, 因為imgtran找不到草稿附件影像, 1090706 Raymond 1090463 草稿附件影像改用imgtran加FilePath參數取得
					
					if(typeof _fileIOUrl !== "string")
						dfd.reject("下載簽核公文的WebFileIO Service網址未設定!");
					else if(_fileIOUrl.length <= 0)
						dfd.reject("下載簽核公文的WebFileIO Service網址不可為空白!");
					else {
						theLogger.log("下載頁面影像檔'" + _dirPath + "\\" + page.fileRef.name + "'...");
						(new WebFileIO(_fileIOUrl)).download(_dirPath, page.fileRef.name, {
							translateExt: function(fileName) {	// 2016.8.11 新增判斷副檔名是附件影像檔的.nnnn格式則回應是png影像格式給WebFileIO轉為dataurl
								if(fileName.match(/\.\d{4}$/))
									return ".png";
								return null;
							},
							success: function(fil, res) {
								dfd.resolve(fil, 300, cbdata);	// pass 第2個參數表示影像檔是300dpi, 2016.11.1 直接回傳cbdata參數
							},
							error: function(errorText) {
								dfd.reject(errorText);
							}
						});
					}
				}
				// 1090706 Raymond 1090463 草稿附件影像改用imgtran加FilePath參數取得
				else if(_docObj.isDraft) {
					var imgProcUrl = "/odtools/imgtran.ashx?FileIOWS=" + _docObj.fileIOWS;
					imgProcUrl += ("&FilePath=" + encodeURIComponent(Base64.encode(_dirPath)));
					imgProcUrl += ("&FileName=" + encodeURIComponent(Base64.encode(page.fileRef.name)));
					imgProcUrl += ("&Pixel=300dpi&Format=33&SAMLart=" + localStorage['Artifact']);
					//1060921	Leslie[1060880]	修正附件頁面因同檔名+瀏覽器Cache住，造成的附件頁面顯示異常
					var guid = page.container.guid
					imgProcUrl += ("&guid="+guid);
					// 1101015 Raymond 1101140 新增時間戳記, 提供給getPageImage的回傳影像URL使用, 以避免(真)旋轉後的附件頁面影像, 在關閉公文後再開啟, 由於URL未加上「&rotate=幾度」而顯示成前一次開啟時cache的未旋轉的影像的問題
					imgProcUrl += ("&_t=" + _t);
					// 1090710 Raymond 1090463 修正草稿附件頁面真旋轉後因Cache不會顯示旋轉後結果頁面的問題
					if(typeof page.rotated !== "undefined")
						imgProcUrl += ("&rotated=" + page.rotated);
					dfd.resolve(imgProcUrl, 300, cbdata);	// 2016.11.1 直接回傳cbdata參數
				}
				else {
					// 1130111 Raymond 1120887 新增判斷是否為分會流程點, 是則多傳入子目錄路徑
					var m = _dirPath.match(/(\d{1,2})_\d{8}/);
					if(!!m) {
						theLogger.log("公文子目錄是分會中的子目錄, 傳入完整子目錄路徑'" + _dirPath + "'以取得頁面影像");
						var imgProcUrl = "/odtools/imgtran.ashx?FileIOWS=" + _docObj.fileIOWS;
						imgProcUrl += ("&FilePath=" + encodeURIComponent(Base64.encode(_dirPath)));
						imgProcUrl += ("&FileName=" + encodeURIComponent(Base64.encode(page.fileRef.name)));
					}
					else {
					// 2014.5.8 - Raymond, 改用影像處理網頁服務解決解析度問題
					var origFilePath = page.fileRef.name;
					//var imgProcUrl = "/odtools/imgtran.ashx?DocNo=" + theAOL.docObj.docNo;
					var imgProcUrl = "/odtools/imgtran.ashx?DocNo=" + _docObj.docNo;	// 2016.12.5 bugfix for 子文的文號要從_docObj取得
					// 2016.1.22 Base64編碼後可能有+、=等Base64字元, 用URI encoding處理成%HEX的形式, 以避免Server無法解讀
					var b64str = Base64.encode(origFilePath);
					imgProcUrl += ("&FileName=" + encodeURIComponent(b64str));
					}
					imgProcUrl += ("&Pixel=300dpi&Format=33&SAMLart=" + localStorage['Artifact']);	// 2016.8.25 以匯出頁面傳送後的頁面仍是300dpi, 應走上面草稿的附件頁面開啟方式
					//1060921	Leslie[1060880]	修正附件頁面因同檔名+瀏覽器Cache住，造成的附件頁面顯示異常
					var guid = page.container.guid
					imgProcUrl += ("&guid="+guid);
					// 1101015 Raymond 1101140 新增時間戳記, 提供給getPageImage的回傳影像URL使用, 以避免(真)旋轉後的附件頁面影像, 在關閉公文後再開啟, 由於URL未加上「&rotate=幾度」而顯示成前一次開啟時cache的未旋轉的影像的問題
					imgProcUrl += ("&_t=" + _t);
					// 1060606 Raymond 1060283 旋轉附件頁面時, 增加時間參數, 以避免瀏覽器Cache
					if("rotate" in page) {
						// 1061113 Raymond 1061068 若假旋轉則不必給時間參數並恢復rotate為undefined
						if("rotated" in page) {
							var t = new Date();
							imgProcUrl += ("&TimeStamp=" + Util.padLeft(t.getHours(), 2) + Util.padLeft(t.getMinutes(), 2) + Util.padLeft(t.getSeconds(), 2));
						}
						else {
							theLogger.log("假旋轉後翻頁, 恢復成原來未旋轉角度");
							page.rotate = undefined;
						}
					}
					
					// 1090831 Raymond 1090529 若機關暱稱為SMEG(信保基金), 檢查是否為AKI800調閱公文, 若是則檢查應否套用強制浮水印
					var uo = _fm.getUNVObj();
					// 1100623 Raymond 1100780 新增一般機關也可套用強制浮水印功能
					//if(theUserInfo.OrgNickName == "SMEG" && !!uo && disp == true && typeof uo.UnvRoot.ForceDisplayWaterMark === "string" && uo.UnvRoot.ForceDisplayWaterMark.match(/true/i)) {
					if(!!uo && disp == true && typeof uo.UnvRoot.ForceDisplayWaterMark === "string" && uo.UnvRoot.ForceDisplayWaterMark.match(/true/i)) {
						var $imgTmp = $("<img class='WMImage'></img>");
						$imgTmp.on('load', function(event, ui) {
							function _onForceWaterMarkDone(rslt) {
								dfd.resolve(rslt.imgStr, 300, cbdata);
							}
							// 影像套強制式浮水印
							$imgTmp.watermark({position:'middle-center', className:'WMImage', 
												// 1100623 Raymond 1100780 新增UserName欄位, 供一般機關顯示強制浮水印使用
												//userInfo: { OrgNickName: theUserInfo.OrgNickName, OUName:uo.UnvRoot.OU_NAME, UserId:uo.UnvRoot.USER_ID, UserTitle:uo.UnvRoot.USER_TITLE, ClientIP:uo.UnvRoot.CLIENT_IP},	// 信保基金要求顯示的文字浮水印內容
												userInfo: { OrgNickName: theUserInfo.OrgNickName, OUName:uo.UnvRoot.OU_NAME, UserId:uo.UnvRoot.USER_ID, UserName:uo.UnvRoot.USER_NAME, UserTitle:uo.UnvRoot.USER_TITLE, ClientIP:uo.UnvRoot.CLIENT_IP},	// 信保基金要求顯示的文字浮水印內容
												path: _fm.fwmPath, settings: _fm.fwmSettings, 'dpi': 300, 
												'theApp': window.theAOL,
												'forceWaterMark' : true,
												callback: _onForceWaterMarkDone
							});  
						}).on('error', function(event, ui) {
							dfd.reject('載入頁面影像失敗!');
						}).attr("src", imgProcUrl);
					}
					else
					dfd.resolve(imgProcUrl, 300, cbdata);	// 2016.11.1 直接回傳cbdata參數
				}
			}
			return dfd.promise();	// 2016.11.1 改dfd為dfd.promise()
		},
		// 1090424 Raymond 1090305 新增第2參數, 若傳入true則不設定文稿狀態為dirty, 以避免儲存時出現錯誤
		// 2015.10.1 新增文稿頁面
		//newDraftPage: function(idx) {
		newDraftPage: function(idx, noDirty) {
			theLogger.log("newDraftPage(" + idx + ")=");
			var snfo = _revs[_currRev].obj.signInfo;
			if(typeof idx == "number") {
				if(idx >= 0 && idx < snfo.drafts.length) {
					snfo.drafts[idx].draftPages.pages.push(new DraftPage(snfo.drafts[idx], snfo.drafts[idx].draftPages.pages.length));
					theLogger.log(snfo.drafts[idx].draftPages.pages[snfo.drafts[idx].draftPages.pages.length-1]);
					theLogger.log("新增文稿頁面一律重新匯出頁面");
					// 1090424 Raymond 1090305 若第2參數傳入true則不設定dirty, 以避免儲存時出現錯誤
					if(!noDirty || noDirty == false)
					snfo.drafts[idx].dirty(true);	// 2015.12.16 若有新增文稿頁面則一律重新匯出頁面, 不論是否編修內文
					
					// 1060601 Raymond 新增判斷是否有不存在頁面的簽核物件, 有則判斷是否為本次新增的頁次, 若是的話則綁定此頁
					if("missingSOs" in snfo.drafts[idx]) {
						for(var i=0; i<snfo.drafts[idx].missingSOs.length; i++) {
							var so = snfo.drafts[idx].missingSOs[i];
							if("pgIdx" in so && Number(so.pgIdx) == (snfo.drafts[idx].draftPages.pages.length - 1)) {
								theLogger.warn("新增文稿頁面與遺失頁面的簽核物件(ID:" + so.id + ")頁次(" + so.pgIdx + ")相符, 綁定此頁");
								var pg = snfo.drafts[idx].draftPages.pages[snfo.drafts[idx].draftPages.pages.length-1];
								if(!("newSignObjs" in pg))
									pg.newSignObjs = new Array();
								so.boundTo = pg;
								so.bounded = true;
								pg.newSignObjs.push(so);
								
								if("guid" in pg.container && !("attType" in pg.container))	// 來文沒有GUID及附件頁面不需要同步外部簽核物件
									_xSignFolder.getDraft(pg.container.guid).restoreSignObj(so);	// 同步至外部簽核物件記錄檔
								
								snfo.drafts[idx].missingSOs.splice(i--, 1);	// 從暫存陣列中刪除
							}
						}
					}
					return snfo.drafts[idx].draftPages.pages[snfo.drafts[idx].draftPages.pages.length-1];
				}
				else
					throw new Error("指定文稿'" + idx + "'超出範圍");
			}
			else if(typeof idx == "object") {	// SignWork.js會用getDraftById取得的draft當參數
				if("draftPages" in idx) {
					idx.draftPages.pages.push(new DraftPage(idx, idx.draftPages.pages.length));
					theLogger.log(idx.draftPages.pages[idx.draftPages.pages.length-1]);
					theLogger.log("新增文稿頁面一律重新匯出頁面");
					// 1090424 Raymond 1090305 若第2參數傳入true則不設定dirty, 以避免儲存時出現錯誤
					if(!noDirty || noDirty == false)
					idx.dirty(true);	// 2015.12.16 若有新增文稿頁面則一律重新匯出頁面, 不論是否編修內文
					return idx.draftPages.pages[idx.draftPages.pages.length-1];
				}
				else
					throw new Error("傳入參數既非稿序亦非文稿物件!");
			}
			else
				throw new Error("傳入參數僅支援數字或物件型態!");
		},
		// 2016.7.6 新增文稿(線上簽核)
		newDraft: function(info) {
			theLogger.log("newDraft(" + info.guid + ")");
			var snfo = _revs[_currRev].obj.signInfo;
			var fromDocIdx = -1;	// 1060922 Raymond 1060876 若有來文簽辦, 記錄其位置
			for(var i=0; i<snfo.drafts.length; i++) {
				if(snfo.drafts[i].name == "來文簽辦")	// 1060922 Raymond 1060876 記錄來文簽辦的位置, 新增文稿時要插在其前
					fromDocIdx = i;
				// 1090909 Raymond 1090564 信保特殊模式下文稿無GUID
				//else if(snfo.drafts[i].guid == info.guid) {	// 2016.7.22 新增檢查相同GUID則改為更新
				else if(!!info.guid && snfo.drafts[i].guid == info.guid) {	// 2016.7.22 新增檢查相同GUID則改為更新
					theLogger.log("GUID'" + info.guid + "'的文稿已存在封裝檔中, 僅更新欄位...");
					var d = snfo.drafts[i];
					if(d.id != info.id) {
						if(typeof info.id === "string" && info.id.length > 0) {	// 2016.10.4 刪除文稿會導致SignWork記錄的ID與文稿管理檔不同
							theLogger.warn("同GUID文稿設定的ID不一致! old:" + d.id + ", new:" + info.id + ", 應該是前面文稿有刪除的緣故");
							d.id = info.id;
						}
						else
							theLogger.warn("同GUID文稿設定的ID不一致! old:" + d.id + ", new:" + info.id);
					}
					// 2016.8.15 新增從SignWork.xml讀回applyPrintXSL及printXSLType
					if(typeof info.applyPrintXSL === "string" && info.applyPrintXSL.length > 0) {
						if(typeof d.applyPrintXSL === "string" && d.applyPrintXSL.length > 0) {
							theLogger.warn("新文稿的'applyPrintXSL'從'" + d.applyPrintXSL + "'更新為'" + info.applyPrintXSL + "'");
							d.applyPrintXSL = info.applyPrintXSL;
						}
						else {
							theLogger.log("新文稿的'applyPrintXSL'設為'" + info.applyPrintXSL + "'");
							d.applyPrintXSL = info.applyPrintXSL;
						}
					}
					if(typeof info.printXSLType === "string" && info.printXSLType.length > 0) {
						if(typeof d.printXSLType === "string" && d.printXSLType.length > 0) {
							theLogger.warn("新文稿的'printXSLType'從'" + d.printXSLType + "'更新為'" + info.printXSLType + "'");
							d.printXSLType = info.printXSLType;
						}
						else {
							theLogger.log("新文稿的'printXSLType'設為'" + info.printXSLType + "'");
							d.printXSLType = info.printXSLType;
						}
					}
					// 物件識別碼
					if(typeof info.obj === "string" && info.obj.length > 0) {
						if(typeof d.obj === "string" && d.obj.length > 0) {
							theLogger.warn("新文稿的'物件識別碼'從'" + d.obj + "'更新為'" + info.obj + "'");
							d.obj = info.obj;
						}
						else {
							theLogger.log("新文稿的'物件識別碼'設為'" + info.obj + "'");
							d.obj = info.obj;
						}
					}
					// 類型? 不知道是什麼
					if(typeof info.type === "string" && info.type.length > 0) {
						if(typeof d.type === "string" && d.type.length > 0) {
							theLogger.warn("新文稿的'類型'從'" + d.type + "'更新為'" + info.type + "'");
							d.type = info.type;
						}
						else {
							theLogger.log("新文稿的'類型'設為'" + info.type + "'");
							d.type = info.type;
						}
					}
					// 產生點資訊
					if(typeof info.flowId === "string" && info.flowId.length > 0) {
						if(typeof d.flowId === "string" && d.flowId.length > 0) {
							theLogger.warn("新文稿的'產生點資訊'從'" + d.flowId + "'更新為'" + info.flowId + "'");
							d.flowId = info.flowId;
						}
						else {
							theLogger.log("新文稿的'產生點資訊'設為'" + info.flowId + "'");
							d.flowId = info.flowId;
						}
					}
					// 原始檔序號
					if(typeof info.fileSN === "string" && info.fileSN.length > 0) {
						if(typeof d.fileSN === "string" && d.fileSN.length > 0) {
							theLogger.warn("新文稿的'原始檔序號'從'" + d.fileSN + "'更新為'" + info.fileSN + "'");
							d.fileSN = info.fileSN;
						}
						else {
							theLogger.log("新文稿的'原始檔序號'設為'" + info.fileSN + "'");
							d.fileSN = info.fileSN;
						}
					}
					// 原始檔名, 一律更新, 因為開啟草稿公文會呼叫2次newDraft, 第1次是從DraftMgmt來的, 只有檔名沒有子目錄名, 第2次從SignWork來的, 有子目錄名加檔名
					if(typeof d.fileName === "string" && d.fileName.length > 0) {
						theLogger.warn("新文稿的'原始檔名'從'" + d.fileName + "'更新為'" + info.fileName + "'");
						if(info.fileName.indexOf("\\") < 0) {	// 無子目錄時跳錯
							theLogger.error("文稿檔路徑未含子目錄名稱#2");
							alert("文稿檔路徑未含子目錄名稱#2");
						}
						d.fileName = info.fileName;
					}
					else {
						theLogger.log("新文稿的'原始檔名'設為'" + info.fileName + "'");
						if(info.fileName.indexOf("\\") < 0) {	// 無子目錄時跳錯
							theLogger.error("文稿檔路徑未含子目錄名稱#3");
							alert("文稿檔路徑未含子目錄名稱#3");
						}
						d.fileName = info.fileName;
					}
					// 序號
					if(typeof info.sn === "string" && info.sn.length > 0) {
						if(typeof d.sn === "string" || typeof d.sn === "number") {
							theLogger.warn("新文稿的'序號'從'" + d.sn + "'更新為'" + info.sn + "'");
							d.sn = info.sn;
						}
						else {
							theLogger.log("新文稿的'序號'設為'" + info.sn + "'");
							d.sn = info.sn;
						}
						// 2017.2.9 修正更新下個新增文稿序號變數, 以避免刪除序號小的文稿後儲存關閉, 再次開啟新增時, _lastdraftsn停留在跟文稿數一致的連續序號, 導致新增的文稿的序號跟從SignWork.xml恢復的上一次新增文稿的序號重複問題
						_lastdraftsn = Math.max(_lastdraftsn, Number(info.sn));
					}
					// 產生時間
					if(typeof info.createTime !== "undefined") {
						if(typeof d.time !== "undefined") {
							theLogger.warn("新文稿的'產生時間'從'" + d.time + "'更新為'" + info.createTime + "'");
							d.time = (SSOUtil.typeOf(info.createTime) == "date")?_toDateTime(info.createTime):info.createTime;
						}
						else {
							theLogger.log("新文稿的'產生時間'設為'" + info.createTime + "'");
							d.time = (SSOUtil.typeOf(info.createTime) == "date")?_toDateTime(info.createTime):info.createTime;
						}
					}
					else if(typeof info.time !== "undefined") {
						if(typeof d.time !== "undefined") {
							theLogger.warn("新文稿的'產生時間'從'" + d.time + "'更新為'" + info.time + "'");
							d.time = info.time;
						}
						else {
							theLogger.log("新文稿的'產生時間'設為'" + info.time + "'");
							d.time = info.time;
						}
					}
					// 名稱(稿序)
					if(typeof info.name === "string" && info.name.length > 0) {
						if(typeof d.name === "string" && d.name.length > 0) {
							theLogger.warn("新文稿的'名稱(稿序)'從'" + d.name + "'更新為'" + info.name + "'");
							d.name = info.name;
						}
						else {
							theLogger.log("新文稿的'名稱(稿序)'設為'" + info.name + "'");
							d.name = info.name;
						}
					}
					// 文稿類型
					if(typeof info.docType === "string" && info.docType.length > 0) {
						if(typeof d.docType === "string" && d.docType.length > 0) {
							theLogger.warn("新文稿的'文稿類型'從'" + d.docType + "'更新為'" + info.docType + "'");
							d.docType = info.docType;
						}
						else {
							theLogger.log("新文稿的'文稿類型'設為'" + info.docType + "'");
							d.docType = info.docType;
						}
					}
					// 附件
					if("attachs" in info) {
						for(var j=0; j<info.attachs.length; j++) {
							var infoA = info.attachs[j];
							var found = false;	// 2016.12.9 新增找不到時多寫出可能原因
							if("attachs" in d) {	// 2016.12.29 bugfix
								for(var k=0; k<d.attachs.length; k++) {
									var a = d.attachs[k];
									if(a.guid == infoA.guid) {
										found = true;	// 2016.12.9 標記SignWork.xml中記錄的這筆附件已存在封裝檔
										// 產生時間
										if(typeof infoA.time !== "undefined") {
											if(typeof a.time !== "undefined") {
												theLogger.warn("新附件的'產生時間'從'" + a.time + "'更新為'" + infoA.time + "'");
												a.time = infoA.time;
											}
											else {
												theLogger.log("新附件的'產生時間'設為'" + infoA.time + "'");
												a.time = infoA.time;
											}
										}
										// '文稿頁面檔'的產生時間
										if("draftPages" in infoA) {
											if("draftPages" in a) {
												if(typeof infoA.draftPages.time !== "undefined") {
													if(typeof a.draftPages.time !== "undefined") {
														theLogger.warn("新附件的'文稿頁面檔產生時間'從'" + a.draftPages.time + "'更新為'" + infoA.draftPages.time + "'");
														a.draftPages.time = infoA.draftPages.time;
													}
													else {
														theLogger.log("新附件的'文稿頁面檔產生時間'設為'" + infoA.draftPages.time + "'");
														a.draftPages.time = infoA.draftPages.time;
													}
												}
												for(var m=0; m<infoA.draftPages.pages.length; m++) {
													var infoP = infoA.draftPages.pages[m];
													if(m >= a.draftPages.pages.length) {
														a.draftPages.pages.push(new DraftPage(a, a.draftPages.pages.length));
													}
													else {	// 1080426 Raymond 1071206 修正從暫存檔回復已匯出頁面的時間
														a.draftPages.pages[m].time = infoP.time;
													}
													var p = a.draftPages.pages[m];
													if(!!infoP.fileName) {	// 1060417 Raymond infoP.fileName改成!!infoP.fileName
														// TODO: files中是否有可能己有此頁面檔?
														snfo.files.push(new FileInfo({
															fileSN: infoP.fileSN || "",
															sn: infoP.sn || "",
															name: infoP.fileName,
															size: infoP.filSize || "",
															format: infoP.format || "",
															time: infoP.time || "",
														}));
														p.fileRef = snfo.files[snfo.files.length-1];
													}
													else if(!!infoP.fileRef) {	// 1060417 Raymond 修正暫存再開啟時, RD-SignWork.js改為fileRef物件而不是fileName而導致無法開啟附件頁面的錯誤
														snfo.files.push(new FileInfo({
															fileSN: infoP.fileSN || "",
															sn: infoP.sn || "",
															name: infoP.fileRef.name,
															size: infoP.filSize || "",
															format: infoP.format || "",
															time: infoP.time || "",
														}));
														p.fileRef = snfo.files[snfo.files.length - 1];
													}
												}
												// 1080426 Raymond 1071206 修正置換附件前頁數比置換附件後多的情況下, 只更新了新附件的頁次資訊, 未刪除舊附件的已匯出頁面, 導致儲存後再開啟時頁數異常問題
												a.draftPages.pages.splice(m);
											}
											else {	// 2016.9.26 新增錯誤說明
												theLogger.error("資料錯誤：新附件無文稿頁面節點");
												if(a.fmt == "電子檔格式") {
													theLogger.error("因為封裝檔記錄的附件是不匯出頁面的'電子檔格式', 但工作檔記錄的是啟用匯出附件頁面的'文稿頁面檔格式', 造成無法匹配");
												}
											}
										}
										break;
									}
								}
							}
							if(!found)	// 2016.12.9 新增封裝檔找不到相同GUID的這筆附件的可能原因
								theLogger.warn("封裝檔中找不到GUID為'" + infoA.guid + "'的附件檔, 可能是SignWork.xml記錄與文稿管理檔不一致所造成, 封裝檔記錄將以文稿管理檔為準, 不會新增此附件");
						}
					}
					_xSignFolder.newDraft(d);	// 2017.1.12 新增同步新增至簽核物件記錄檔
					return d;	// 2016.9.5 新增回傳值
				}
			}
			// 1090911 Raymond 1090564 信保特殊模式文稿檔直接放在公文目錄, 而非子目錄下
			//if(info.fileName.indexOf("\\") < 0) {	// 無子目錄時跳錯
			if(info.fileName.indexOf("\\") < 0 && _docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2") {	// 無子目錄時跳錯
				theLogger.error("文稿檔路徑未含子目錄名稱#4");
				alert("文稿檔路徑未含子目錄名稱#4");
			}
			// 1060922 Raymond 1060876 若已有來文簽辦文稿, 新增文稿須插於其前
			if(fromDocIdx >= 0) {
				snfo.drafts.splice(fromDocIdx, 0, new DraftInfo(info, snfo));
				if(!("skipX" in info) || !info.skipX)	// 2017.1.16 mapDraft初始化文稿的GUID時的newDraft, 不要同步新增文稿於簽核物件記錄檔
					_xSignFolder.newDraft(snfo.drafts[fromDocIdx]);	// 插入位置的文稿同步新增至簽核物件記錄檔
				return snfo.drafts[fromDocIdx];	// 回傳插入位置的文稿
			}
			snfo.drafts.push(new DraftInfo(info, snfo));	// 2016.9.7 多傳入snfo
			if(!("skipX" in info) || !info.skipX)	// 2017.1.16 mapDraft初始化文稿的GUID時的newDraft, 不要同步新增文稿於簽核物件記錄檔
				_xSignFolder.newDraft(snfo.drafts[snfo.drafts.length - 1]);	// 2017.1.12 新增同步新增至簽核物件記錄檔
			return snfo.drafts[snfo.drafts.length - 1];	// 2016.9.5 新增回傳值
		},
		// 2016.7.14 新增附件(線上簽核)	// 2016.12.7	Leslie	新增參數attId附件序，以直接新增至指定位置
		newAtt: function(draftId, attach, attIdx, callback) {
			theLogger.log("newAtt(" + draftId + ")");
			var snfo = _revs[_currRev].obj.signInfo;
			for(var i=0; i<snfo.drafts.length; i++) {
				if(snfo.drafts[i].id == draftId) {
					var d = snfo.drafts[i];
					
					snfo.files.push(new FileInfo({
						fileSN: "",
						sn: "",
						name: attach.fileName || attach.name,			// 是否要改成檔名?
						size: attach.size,
						format: "",
						time: getCreateTime()
					}));	// 封裝檔加入附件原始檔
					
					if("origFileName" in attach && attach.origFileName.length > 0) {	// 新增附件若不匯出頁面, 需要靠此資訊取出附件原始檔
						snfo.files[snfo.files.length - 1].origFileName = attach.origFileName;
					}
					
					if(!("attachs" in d))
						d.attachs = [];
					d.attachs.push(new Attach(attach, d));
					d.attachs[d.attachs.length-1].fileRef = snfo.files[snfo.files.length-1];	// 連結
					theLogger.debug("在封裝檔中新增了附件(ID:" + d.attachs[d.attachs.length-1].id + ")");
					if(callback && $.isFunction(callback))
						callback(d.attachs[d.attachs.length-1]);
					
					//2016.12.7	Leslie	補上調整新增附件在陣列中的位置
					if(SSOUtil.typeOf(attIdx) == "number") {
						if(attIdx != d.attachs.length-1) {
							d.attachs.splice(attIdx, 0, d.attachs.splice(d.attachs.length-1, 1)[0]);
							// 1060427 Raymond 修正調整附件序後再置換, 會導致序號重複問題
							d.attachs[attIdx].sn = attIdx;
						}
					}
					return;
				}
			}
			theLogger.error("封裝檔中找不到id為'" + draftId + "'的文稿, 無法新增附件");
		},
		// 2016.7.15 更新附件(線上簽核)
		// 2016.11.7 新增attIdx附件序, 用來調整附件順序
		updateAtt: function(attId, attach, attIdx, callBack) {	// 2016.12.8	Leslie	增加callBack函式，以處理附件匯出後，因搬移造成的檔名異動
			theLogger.log("updateAtt(" + attId + ")");
			var snfo = _revs[_currRev].obj.signInfo;
			var isReRndrAtt = false;	//2016.12.8	Leslie	已匯出的附件，若移動則需重新匯出
			for(var i=0; i<snfo.drafts.length; i++) {
				var d = snfo.drafts[i];
				if("attachs" in d) {	// 2016.8.25 新增容錯
					var brk = false;
					for(var j=0; j<d.attachs.length; j++) {
						// 1060425 Raymond 修正因attId傳入數字時造成Exception而未異動附件序及檔名問題
						//if((attId.indexOf("{") == 0 && d.attachs[j].guid == attId) ||	// 2017.3.3 fix for 更新同一流程點新增的附件時, 沒有ID, 要改用GUID比對
						if((typeof attId === "string" && attId.indexOf("{") == 0 && d.attachs[j].guid == attId) ||	// 2017.3.3 fix for 更新同一流程點新增的附件時, 沒有ID, 要改用GUID比對
							d.attachs[j].id == attId) {
							// 1060427 Raymond 修正若attId是數字時, 會產生Exception的問題, 航港-序638
							//if(attId.indexOf("{") == 0)
							if(typeof attId === "string" && attId.indexOf("{") == 0)
								theLogger.debug("異動封裝檔中的附件(GUID:" + attId + ")...");
							else
								theLogger.debug("異動封裝檔中的附件(ID:" + attId + ")...");
							if(d.attachs[j].name != attach.name)	//2016.12.8	Leslie	已匯出的附件，若移動則需重新匯出
								isReRndrAtt = true;	//重新匯出附件頁面
							d.attachs[j].name = attach.name;
							//d.attachs[j].fileRef.name = attach.fileName;	// 2016.9.12 更新附件檔名, 變更順序會改變檔名	// 2016.12.7	Leslie	原fileRef.name，應於reName上傳完成後，才能變更，本行mark
							// 2016.11.29 Leslie	附件置換後，應一併更新origFileName(內容為BLOB URL)
							if(attach.origFileName.match(/^blob:/))	{
								// 2016.12.7	Leslie	新增檔案，需一律回寫fileRef，以正碓回寫SignWork.xml
								d.attachs[j].fileRef.name = attach.fileName;
								d.attachs[j].fileRef.origFileName = attach.origFileName;
							}
							else
								d.attachs[j].fileRef.newName = attach.fileName;	//2016.12.7	Leslie	更新檔名供SignWork回存
							
							//2016.12.8	Leslie	已匯出的附件，若移動則需重新匯出，而且需在移動前先叫用重新匯出頁面
							if(isReRndrAtt){
								if(callBack && $.isFunction(callBack))
									callBack(d.attachs[j]);
							}
							
							// 2016.11.7 照attIdx調整順序
							if(SSOUtil.typeOf(attIdx) == "number") {
								if(attIdx != j) {
									d.attachs.splice(attIdx, 0, d.attachs.splice(j, 1)[0]);
									// 1060427 Raymond 修正調整附件序後再置換, 會導致序號重複問題
									d.attachs[attIdx].sn = attIdx;
								}
								else if(d.attachs[attIdx].sn != attIdx) {	// 1061117 Raymond 1061118順便修正 第1、2筆附件對調順序, 第2筆會因為第1筆已完成對調, 變成attIdx == j的情況, 造成第2筆的sn未修正為attIdx的問題
									d.attachs[attIdx].sn = attIdx;
								}
							}
							// TODO: 判斷有無異動
							
							brk = true;
							break;
						}
					}
					if(brk)
						break;
				}
			}
		},
		// 2016.7.15 移除附件(線上簽核)
		removeAtt: function(attId, attach) {
			theLogger.log("removeAtt(" + attId + ")");
			// 1061013 Raymond 1060962+1060948 異動撤消後刪除附件, 因附件ID會重編與AOLProcessData所記錄的不一致, 會導致刪除封裝記錄的附件失敗, 傳入有GUID的atts參數, 由SignFolder.removeAtt補救
			var found = false;
			var snfo = _revs[_currRev].obj.signInfo;
			for(var i=0; i<snfo.drafts.length; i++) {
				var d = snfo.drafts[i];
				if("attachs" in d) {	// 2016.8.25 新增容錯
					for(var j=0; j<d.attachs.length; j++) {
						if(d.attachs[j].id == attId) {
							// 1061013 Raymond 1060962+1060948 增加檢查GUID是不是一致
							if(d.attachs[j].guid != attach.guid)
								theLogger.error("移除封裝檔中的附件(ID:" + attId + ")...找到但GUID(" + d.attachs[j].guid + ")與AOLProccessData的(" + attach.guid + ")不一致");
							else
								theLogger.log("移除封裝檔中的附件(ID:" + attId + ")...");
							d.attachs.splice(j, 1);
							found = true;	// 1061013 Raymond 1060962+1060948 標記已由attId找到
							break;
						}
					}
				}
			}
			// 1061013 Raymond 1060962+1060948 若attId找不到則改由attach.guid找
			if(!found) {
				theLogger.warn("封裝記錄中找不到ID:" + attId + "的附件, 無法刪除, 改搜尋GUID:" + attach.guid);
				for(var i=0; i<snfo.drafts.length; i++) {
					var d = snfo.drafts[i];
					if("attachs" in d) {
						for(var j=0; j<d.attachs.length; j++) {
							if(d.attachs[j].guid == attach.guid) {
								theLogger.warn("移除封裝檔中的附件(GUID:" + attach.guid + ")...指定應刪除此附件的ID為(" + attId + "), 但實際封裝記錄的ID為(" + d.attachs[j].id + ")");
								d.attachs.splice(j, 1);
								found = true;
								break;
							}
						}
					}
				}
			}
			if(!found) {
				theLogger.error("封裝檔中找不到ID:" + attId + "的附件, 也找不到GUID:" + attach.guid + "的附件, 刪除失敗");
			}
		},
		// 2016.7.15 移除附件的匯出頁面
		removeAttPages: function(att) {
			theLogger.log("removeAttPage(" + att.id + ")");
			var snfo = _revs[_currRev].obj.signInfo;
			for(var i=0; i<snfo.drafts.length; i++) {
				var d = snfo.drafts[i];
				if("attachs" in d) {	// 2016.8.25 新增容錯
					var brk = false;
					for(var j=0; j<d.attachs.length; j++) {
						if(d.attachs[j].id == att.id) {
							theLogger.debug("移除封裝檔中的附件頁面(ID:" + att.id + ")...");
							var a = d.attachs[j];
							// TODO: 應移除snfo.files中既有的檔案
							a.draftPages.dirty = a.draftPages.pages.length > 0;	// 2016.7.20 新增dirty表示附件有重新匯出
							a.draftPages.pages.length = 0;
							brk = true;
							break;
						}
					}
					if(brk)
						break;
				}
			}
		},
		// 2016.7.15 新增附件的匯出頁面
		addAttPage: function(att, fname, imgurl) {
			theLogger.log("addAttPage(" + att.att.id + ")");
			var snfo = _revs[_currRev].obj.signInfo;
			for(var i=0; i<snfo.drafts.length; i++) {
				var d = snfo.drafts[i];
				if("attachs" in d) {	// 2016.8.25 新增容錯
					var brk = false;
					for(var j=0; j<d.attachs.length; j++) {
						if(d.attachs[j].id == att.att.id) {
							theLogger.debug("新增封裝檔中的附件頁面(ID:" + att.att.id + ")...");
							var a = d.attachs[j];
							a.draftPages.dirty = true;	// 2016.7.20 新增dirty表示附件有重新匯出
							a.draftPages.pages.push(new DraftPage(a, a.draftPages.pages.length));
							if(!!imgurl)	// 2016.9.13 後端未配合改好前, 無法不暫存
								a.draftPages.pages[a.draftPages.pages.length-1].content = imgurl;	// 新增content表示是未儲存的匯出頁面影像, 2016.9.12 改成不要下載實體影像檔資料
							
							// 新增檔案參照
							var fi = new FileInfo({
								fileSN: "",
								sn: "",
								name: fname,
								size: "",
								format: "",
								time: getCreateTime()//,
								//content: imgurl		// 2016.9.12 改成不要下載實體影像檔資料
							});
							if(!!imgurl)	// 2016.9.13 後端未配合改好前, 無法不暫存
								fi.content = imgurl;
							snfo.files.push(fi);
							
							// 連結
							a.draftPages.pages[a.draftPages.pages.length-1].fileRef = snfo.files[snfo.files.length-1];
							brk = true;
							break;
						}
					}
					if(brk)
						break;
				}
			}
		},
		getAttCounts: function(idx) {
			var snfo = _revs[_currRev].obj.signInfo;
			if(idx >= 0 && idx < snfo.drafts.length) {
				if("attachs" in snfo.drafts[idx])
					return snfo.drafts[idx].attachs.length;
				else
					return 0;
			}
			else if(idx == snfo.drafts.length && snfo.fromFolder !== undefined) {
				if("attachs" in snfo.fromFolder.fromDoc)
					return snfo.fromFolder.fromDoc.attachs.length;
				else
					return 0;
			}
			// 1100512 Raymond 1090821 外會公文的外機關文稿附件
			else if(idx >= snfo.drafts.length && !!snfo.exorgDraft) {
				if("attachs" in snfo.exorgDraft)
					return snfo.exorgDraft.attachs.length;
				else
					return 0;
			}
			else
				throw new Error("指定文稿'" + idx + "'超出範圍");
		},
		getAttachment: function(idx, i) {
			var snfo = _revs[_currRev].obj.signInfo;
			if(idx >= 0 && idx < snfo.drafts.length) {
				var draft = snfo.drafts[idx];
				if("attachs" in draft && i >= 0 && i < draft.attachs.length)	// 2016.3.25 FIX, 判斷attachs是否存在
					return draft.attachs[i];
				else
					throw new Error("指定文稿'" + idx + "'之附件'" + i + "'超出範圍");
			}
			else if(idx == snfo.drafts.length && snfo.fromFolder !== undefined) {
				var fromDoc = snfo.fromFolder.fromDoc;
				if("attachs" in fromDoc && i >= 0 && i < fromDoc.attachs.length)	// 2016.3.25 FIX, 判斷attachs是否存在
					return fromDoc.attachs[i];
				else
					throw new Error("指定來文稿之附件'" + i + "'超出範圍");
			}
			// 1100512 Raymond 1090821 外會公文的外機關文稿附件
			else if(idx >= snfo.drafts.length && !!snfo.exorgDraft) {
				var exorgDraft = snfo.exorgDraft;
				if("attachs" in exorgDraft && i >= 0 && i < exorgDraft.attachs.length)
					return exorgDraft.attachs[i];
				else
					throw new Error("指定外機關文稿之附件'" + i + "'超出範圍");
			}
			else
				throw new Error("指定文稿'" + idx + "'超出範圍");
		},
		getAttPageCounts: function() {
			if(arguments.length == 1 && typeof arguments[0] === "object") {
				if("draftPages" in arguments[0])
					return arguments[0].draftPages.pages.length;
				else if("pages" in arguments[0])
					return arguments[0].pages.length;
				else
					throw new Error("傳入參數非attach物件");
			}
			else {
				var idx = arguments[0],
					i = arguments[1],
					snfo = _revs[_currRev].obj.signInfo;
				if(idx >= 0 && idx < snfo.drafts.length) {
					var draft = snfo.drafts[idx];
					if("attachs" in draft && i >= 0 && i < draft.attachs.length) {	// 2016.3.25 FIX, 判斷attachs是否存在
						if("draftPages" in draft.attachs[i] && "pages" in draft.attachs[i].draftPages)	// 2016.3.25 FIX, 判斷pages是否存在
							return draft.attachs[i].draftPages.pages.length;
						else
							return 0;   // 無附件頁面
					}
					else
						throw new Error("指定文稿'" + idx + "'之附件'" + i + "'超出範圍");
				}
				else if(idx == snfo.drafts.length && snfo.fromFolder !== undefined) {
					var fromDoc = snfo.fromFolder.fromDoc;
					if("attachs" in fromDoc && i >= 0 && i < fromDoc.attachs.length) {	// 2016.3.25 FIX, 判斷attachs是否存在
						if("draftPages" in fromDoc.attachs[i] && "pages" in fromDoc.attachs[i].draftPages)	// 2016.3.25 FIX, 判斷pages是否存在
							return fromDoc.attachs[i].draftPages.pages.length;
						else
							return 0;   // 無附件頁面
					}
					else
						throw new Error("指文來文之附件'" + i + "'超出範圍");
				}
				// 1100512 Raymond 1090821 外會公文的外機關文稿附件頁面
				else if(idx >= snfo.drafts.length && !!snfo.exorgDraft) {
					var exorgDraft = snfo.exorgDraft;
					if("attachs" in exorgDraft && i >= 0 && i < exorgDraft.attachs.length) {
						if("draftPages" in exorgDraft.attachs[i] && "pages" in exorgDraft.attachs[i].draftPages)
							return exorgDraft.attachs[i].pages.length;
						else
							return 0;
					}
					else
						throw new Error("指定外機關文稿之附件'" + i + "'超出範圍");
				}
				else
					throw new Error("指定文稿'" + idx + "'超出範圍");
			}
		},
		getAttPage: function() {
			if(arguments.length == 2 && typeof arguments[0] === "object") {
				if("draftPages" in arguments[0])
					return arguments[0].draftPages.pages[arguments[1]];
				else if("pages" in arguments[0])
					return arguments[0].pages[arguments[1]];
				else
					throw new Error("傳入參數非attach物件");
			}
			else {
				var idx = arguments[0],
					i = arguments[1],
					po = arguments[2],
					snfo = _revs[_currRev].obj.signInfo;
				if(idx >= 0 && idx < snfo.drafts.length) {
					var draft = snfo.drafts[idx];
					if("attachs" in draft && i >= 0 && i < draft.attachs.length) {	// 2016.3.25 FIX, 判斷attachs是否存在
						if(!("draftPages" in draft.attachs[i] && "pages" in draft.attachs[i].draftPages))	// 2015.3.20 不匯出附件頁面的公文丟回可讀訊息
							throw new Error("指定文稿'" + (idx+1) + "'之附件'" + (i+1) + "'無頁面影像!");
						else if(po >= 0 && po < draft.attachs[i].draftPages.pages.length)
							return draft.attachs[i].draftPages.pages[po];
						else
							throw new Error("指定文稿'" + idx + "'之附件'" + i + "'頁次'" + po + "'超出範圍");
					}
					else
						throw new Error("指定文稿'" + idx + "'之附件'" + i + "'超出範圍");
				}
				else if(idx == snfo.drafts.length && snfo.fromFolder !== undefined) {
					var fromDoc = snfo.fromFolder.fromDoc;
					if("attachs" in fromDoc && i >= 0 && i < fromDoc.attachs.length) {	// 2016.3.25 FIX, 判斷attachs是否存在
						if(!("draftPages" in fromDoc.attachs[i] && "pages" in fromDoc.attachs[i].draftPages))	// 2015.8.12 不匯出附件頁面的公文丟回可讀訊息
							throw new Error("指定來文之附件'" + (i+1) + "'無頁面影像!");
						else if(po >= 0 && po < fromDoc.attachs[i].draftPages.pages.length)
							return fromDoc.attachs[i].draftPages.pages[po];
						else
							throw new Error("指定來文之附件'" + i + "'頁次'" + po + "'超出範圍");
					}
					else
						throw new Error("指定來文之附件'" + i + "'超出範圍");
				}
				// 1100512 Raymond 1090821 外會公文的外機關文稿附件頁面
				else if(idx >= snfo.drafts.length && !!snfo.exorgDraft) {
					var exorgDraft = snfo.exorgDraft;
					if("attachs" in exorgDraft && i >= 0 && i < exorgDraft.attachs.length) {
						if(!("draftPages" in exorgDraft.attachs[i] && "pages" in exorgDraft.attachs[i].draftPages))	// 不匯出附件頁面的公文丟回可讀訊息
							throw new Error("指定外機關文稿之附件'" + (i+1) + "'無頁面影像!");
						else if(po >= 0 && po < exorgDraft.attachs[i].draftPages.pages.length)
							return exorgDraft.attachs[i].draftPages.pages[po];
						else
							throw new Error("指定外機關文稿之附件'" + i + "'頁次'" + po + "'超出範圍");
					}
					else
						throw new Error("指定外機關文稿之附件'" + i + "'超出範圍");
				}
				else
					throw new Error("指定文稿'" + idx + "'超出範圍");
			}
		},
		findPageById: function(id) {  // 搜尋指定ID("文件夾識別碼")的頁面
			if(typeof id !== "string" || id.length == 0)
				throw new Error("查詢頁面未指定ID參數");
			var snfo = _revs[_currRev].obj.signInfo;
			for(var i=0; i<snfo.drafts.length; i++) {
				var draft = snfo.drafts[i];
				for(var j=0; j<draft.draftPages.pages.length; j++) {
					if(draft.draftPages.pages[j].id == id)
						return draft.draftPages.pages[j];    // 文稿頁面
				}
				if("attachs" in draft) {
					for(var j=0; j<draft.attachs.length; j++) {
						var attach = draft.attachs[j];
						if("draftPages" in attach) {    // 2013.12.24 - Raymond, 可能無附件頁面
							for(var k=0; k<attach.draftPages.pages.length; k++) {
								if(attach.draftPages.pages[k].id == id)
									return attach.draftPages.pages[k];  // 附件頁面
							}
						}
					}
				}
			}
			if(snfo.fromFolder !== undefined) {
				var fromDoc = snfo.fromFolder.fromDoc;
				for(var i=0; i<fromDoc.pages.length; i++) {
					if(fromDoc.pages[i].id == id)
						return fromDoc.pages[i];   // 來文本文頁面
				}
				if("attachs" in fromDoc) {
					for(var i=0; i<fromDoc.attachs.length; i++) {
						var attach = fromDoc.attachs[i];
						if("draftPages" in attach) {    // 2013.12.24 - Raymond, 可能無附件頁面
							for(var j=0; j<attach.draftPages.pages.length; j++) {
								if(attach.draftPages.pages[j].id == id)
									return attach.draftPages.pages[j];  // 來文附件頁面
							}
						}
					}
				}
			}
			throw new Error("找不到指定ID(" + id + ")的頁面物件");
		},
		findDraftById: function(id) {   // 搜尋指定ID(文件夾識別碼)的文稿
			if(typeof id !== "string" || id.length == 0)
				throw new Error("查詢文稿未指定ID參數");
			var snfo = _revs[_currRev].obj.signInfo;
			for(var i=0; i<snfo.drafts.length; i++) {
				var draft = snfo.drafts[i];
				if(draft.id == id)
					return draft;
			}
			if(snfo.fromFolder !== undefined) {
				var fromDoc = snfo.fromFolder.fromDoc;
				if(fromDoc.id == id)
					return fromDoc;
			}
			throw new Error("找不到指定ID(" + id + ")的文稿物件");
		},
		enumAllPages: function(callback, data) {
			var snfo = _revs[_currRev].obj.signInfo;
			for(var i=0; i<snfo.drafts.length; i++) {
				for(var j=0; j<snfo.drafts[i].draftPages.pages.length; j++) {
					callback(snfo.drafts[i].draftPages.pages[j], data);
				}
				if("attachs" in snfo.drafts[i]) {
					for(j=0; j<snfo.drafts[i].attachs.length; j++) {
						var att = snfo.drafts[i].attachs[j];
						if("draftPages" in att) {   // 2013.12.24 - Raymond, 可能無附件頁面
							for(var k=0; k<att.draftPages.pages.length; k++)
								callback(att.draftPages.pages[k], data);
						}
					}
				}
			}
			// 來文
			if("fromFolder" in snfo) {
				for(var i=0; i<snfo.fromFolder.fromDoc.pages.length; i++) {
					callback(snfo.fromFolder.fromDoc.pages[i], data);
				}
				if("attachs" in snfo.fromFolder.fromDoc) {
					for(i=0; i<snfo.fromFolder.fromDoc.attachs.length; i++) {
						var att = snfo.fromFolder.fromDoc.attachs[i];
						if("draftPages" in att) {
							for(var j=0; j<att.draftPages.pages.length; j++)
								callback(att.draftPages.pages[j], data);
						}
					}
				}
			}
		},
		prepareSignWork: function(fm, callback, callback2) {	// 準備寫出加簽工作檔, 2016.12.15 新增fm(FolioModel)參數, 由SignWork.js傳入
																// 1070111 Raymond 1060452 新增callback2參數, 若為鐵工局秘書角色, 須上傳簽辦意見為獨立檔案, 不要寫入SignWork.xml
			if("ActiveXObject" in window) {	// for IE-compatible
				var doc = new ActiveXObject("MSXML2.DOMDocument");
				if(!doc.loadXML("<加簽工作檔></加簽工作檔>")) {
					var pe = doc.parseError;
					throw new Error(pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
				}
			}
			else
				var doc = (new DOMParser()).parseFromString("<加簽工作檔></加簽工作檔>", "text/xml");
			
			function setText(nd, txt) {	// for IE-compatible
				if("text" in nd)
					nd.text = txt;
				else
					nd.textContent = txt;
			}
			
			function cloneNode(nd) {	// for IE-compatible
				if("ActiveXObject" in window) {
					var xml = new ActiveXObject("MSXML2.DOMDocument");
					var frag = Util.getXml(nd);
					if(!xml.loadXML(frag)) {
						var pe = xml.parseError;
						throw new Error(pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
					}
					return xml.documentElement;
				}
				return $(nd).clone(true);
			}
			
			//for(var i=0; i<_cachedLastSol.childNodes.length; i++)
			//    doc.documentElement.appendChild(_cachedLastSol.childNodes[i].cloneNode(true));
			
			function newElm(name, parent) {
				try {
				return $(doc.createElement(name)).appendTo(parent);
				}
				catch(e) {
					theLogger.error("newElm('" + name + "') failed! - " + e.message);
					throw e;
				}
			}
			
			// 1111017 Raymond 1111121 新增判斷是否為內會, 若是的話, 在加簽工作檔中標記"內會公文=1"
			function isInnerCoopDoc() {
				// copy from isConsultingDoc@RD-SysUtil.js
				var ownOUId = _docObj.ownOUId;
				var ICOUId = _docObj.ICOUId;
				var lv1ICOU  = (ICOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN) ? ICOUId.substr(0, 2) : ICOUId;
				var lv1OwnOU = (ownOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN) ? ownOUId.substr(0, 2) : ownOUId;
				var atInchargeUnit = false;

				if (lv1ICOU == lv1OwnOU) {
					atInchargeUnit = true;
				}
				
				if (ownOUId.length==sso_const.FIRSTCLASS_UNITNO_LEN && (ownOUId==lv1ICOU)){
					atInchargeUnit = true;
				}
				
				if (atInchargeUnit) {
					// 2017.8.23 - 1060791, 內會依Jerry要求, 新增額外判定
					if (ownOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN) {
						// OWN_OU_DI為3碼, 與INCHARGE_OU不同則視為會辦
						if (ownOUId!=ICOUId) {
							return true;
						}
					}
					else {
						// OWN_OU_DI為2碼, 與INCHARGE_OU前2碼不同則視為會辦
						if (ownOUId!=lv1ICOU) {
							return true;
						}
					}

					// 與承辦單位同一級單位, 檢核是否為內會
					var sCoopFolders = theSSO.User.EnvSettings['OD_INNER_COOP_FOLDER'];

					// 2017.8.21 - Eric, 1060791 - 變數名稱應為"OD_INNER_COOP_FOLDERS" (結尾有'S')
					if ((typeof sCoopFolders =='undefined') || sCoopFolders.length) {
						sCoopFolders = theSSO.User.EnvSettings['OD_INNER_COOP_FOLDERS'];
					}

					if ((typeof sCoopFolders !=='undefined') && sCoopFolders.length) {
						var coopFolders = sCoopFolders.split(';'); // 2017.8.21 - Eric, 1060791-bug-fix
						if (coopFolders.length) {
							var curFolder = _docObj.folder + '-' + _docObj.subfolder;
							if (coopFolders.indexOf(curFolder)!=-1) {
								return true;
							}
						}
					}
				}
				return false;
			}
			if(isInnerCoopDoc())
				doc.documentElement.setAttribute("內會公文", "1");
			
			// 1100715 Raymond 1100854 新增[高大客製化]標記日期時間應含秒
			if(theUserInfo.OrgNickName == "NUK")
				doc.documentElement.setAttribute("時間字串包含秒", "Y");
			
			var $changeInfo = newElm("異動資訊", doc.documentElement);
			var $signPerson = newElm("簽核人員", $changeInfo);
			// 1120920 Raymond 1120750 簽核人員節點下新增寫入機關、全銜及機關代碼欄位, 以避免組改後封裝檔中簽核人員的機關代碼仍是舊的的問題(原封裝檔中的機關代碼是在封裝時由元件另外寫入的,元件也應改為從SignWork.xml中讀取)
			var $org = newElm("機關", $signPerson);						// <簽核人員>下新增<機關>
			var $orgNm = newElm("全銜", $org);							// <機關>下新增<全銜>
			setText($orgNm.get(0), _docObj.get("ODWMSG", "ORGNAME"));	// <全銜>內容以ODWMSG.ORGNAME填入
			var $orgId = newElm("機關代碼", $org);						// <機關>下新增<機關代碼>
			var orgNo = _docObj.get("ODWMSG", "SOURCE_ORGNO");			// <機關代碼>內容預設以ODWMSG.SOURCE_ORGNO填入, 若有組改設定的轉換代碼, 則改以轉換後的新代碼填入
			if(!!theSSO && !!theSSO.OrgMap) {
				if(orgNo in theSSO.OrgMap) {
					theLogger.log("'" + orgNo + "'依OrgMap轉換為新代碼:" + theSSO.OrgMap[orgNo]);
					orgNo = theSSO.OrgMap[orgNo];
				}
				else {
					theLogger.warn("OrgMap中無'" + orgNo + "'對應新機關代碼!");
				}
			}
			setText($orgId.get(0), orgNo);
			var $ouName = newElm("單位", $signPerson);
			// 如果沒有ownOUName要從OrgInfo裡面找
			//if("ownOUName" in theAOL.docObj)
			if("ownOUName" in _docObj)	// 1090608 Raymond 1090103 對此封裝檔而言當前docObj應為_docObj而非theAOL.docObj
				//setText($ouName.get(0), theAOL.docObj.ownOUName);	// for IE-compatible
				setText($ouName.get(0), _docObj.ownOUName);	// 1090608 Raymond 1090103 對此封裝檔而言當前ownOUName應為_docObj.ownOUName而非theAOL.docObj.ownOUName
			else {
				if($orgInfo == undefined) {
					//var orgNode = SSOUtil.getOrgNode(theAOL.docObj.sourceOrgNo);
					var orgNode = SSOUtil.getOrgNode(_docObj.sourceOrgNo);	// 1090608 Raymond 1090103 對此封裝檔而言當前sourceOrgNo應為_docObj.sourceOrgNo而非theAOL.docObj.sourceOrgNo
					if(orgNode)
						var $orgInfo = $(orgNode);
				}
				//var pattern = "Unit[UnitCode='" + theAOL.docObj.ownOUId + "'] > UnitName";
				var pattern = "Unit[UnitCode='" + _docObj.ownOUId + "'] > UnitName";	// 1090608 Raymond 1090103 對此封裝檔而言當前ownOUId應為_docObj.ownOUId而非theAOL.docObj.ownOUId
				var $unitName = $orgInfo.find(pattern);
				if($unitName.length == 1)
					setText($ouName.get(0), $unitName.text());	// for IE-compatible
				else
					theLogger.warn("OrgInfo.xml資料異常! 搜尋條件'" + pattern + "'");
			}
			var $title = newElm("職稱", $signPerson);
			setText($title.get(0), theSSO.User.title);	// for IE-compatible
			var $nm = newElm("姓名", $signPerson);
			setText($nm.get(0), theSSO.User.name);	// for IE-compatible
			var $acc = newElm("帳號", $signPerson);
			setText($acc.get(0), theSSO.User.account);	// for IE-compatible
			var $role = newElm("角色", $signPerson);
			// 如果沒有ownRoleName要從OrgInfo裡面找
			//if("ownRoleName" in theAOL.docObj)
			if("ownRoleName" in _docObj)	// 1090608 Raymond 1090103 對此封裝檔而言當前docObj應為_docObj而非theAOL.docObj
				//setText($role.get(0), theAOL.docObj.ownRoleName);	// for IE-compatible
				setText($role.get(0), _docObj.ownRoleName);	// 1090608 Raymond 1090103 對此封裝檔而言當前ownRoleName應為_docObj.ownRoleName而非theAOL.docObj.ownRoleName
			else {
				if($orgInfo == undefined) {
					//var orgNode = SSOUtil.getOrgNode(theAOL.docObj.sourceOrgNo);
					var orgNode = SSOUtil.getOrgNode(_docObj.sourceOrgNo);	// 1090608 Raymond 1090103 對此封裝檔而言當前sourceOrgNo應為_docObj.sourceOrgNo而非theAOL.docObj.sourceOrgNo
					if(orgNode)
						var $orgInfo = $(orgNode);
				}
				//var pattern = "Unit[UnitCode='" + theAOL.docObj.ownOUId + "'] > Role[RoleNo='" + theAOL.docObj.ODWMSG.OWN_ROLE_ID + "'] > RoleName";
				var pattern = "Unit[UnitCode='" + _docObj.ownOUId + "'] > Role[RoleNo='" + _docObj.ODWMSG.OWN_ROLE_ID + "'] > RoleName";	// 1090608 Raymond 1090103 對此封裝檔而言當前docObj應為_docObj而非theAOL.docObj
				var $roleName = $orgInfo.find(pattern);
				if($roleName.length == 1)
					setText($role.get(0), $roleName.text());	// for IE-compatible
				else
					theLogger.warn("OrgInfo.xml資料異常! 搜尋條件'" + pattern + "'");
			}
			var $tx = newElm("異動別", $changeInfo);
			//setText($tx.get(0), theAOL.docObj.txName);	// for IE-compatible
			setText($tx.get(0), _docObj.txName);	// 1090608 Raymond 1090103 對此封裝檔而言當前docObj應為_docObj而非theAOL.docObj
			var $cmt = newElm("簽核意見", $changeInfo);
			// 1070111 Raymond 1060452 秘書的簽辦意見要另外獨立一個檔案儲存
			if(_isSecretary) {
				if($.isFunction(callback2)) {
					if(!_secretarySignCommentDoc) {	// 尚未產生秘書簽辦意見檔
						if("ActiveXObject" in window) {
							_secretarySignCommentDoc = new ActiveXObject("MSXML2.DOMDocument");
							if(!_secretarySignCommentDoc.loadXML("<SecretarySignComments></SecretarySignComments>")) {
								var pe = doc.parseError;
								throw new Error(pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
							}
						}
						else
							_secretarySignCommentDoc = (new DOMParser()).parseFromString("<SecretarySignComments></SecretarySignComments>", "text/xml");
					}
					if(!!_secretarySignCommentDoc) {
						// 將目前簽辦意見設定到此流程點
						var $res = $(_secretarySignCommentDoc.documentElement).find("SignComment[id='FLOW_" + _docObj.msgId + "']");
						if($res.length > 0) {
							if("text" in $res.get(0))
								$res.get(0).text = _signComment;
							else
								$res.text(_signComment);
						}
						else {
							var sc = _secretarySignCommentDoc.createElement("SignComment");
							sc.setAttribute("id", "FLOW_" + _docObj.msgId);
							if("text" in sc)
								sc.text = _signComment;
							else
								sc.textContent = _signComment;
							_secretarySignCommentDoc.documentElement.appendChild(sc);
						}
						callback2(_secretarySignCommentDoc);	// 呼叫新增的callback2參數(FolioModel.save時傳入)
					}
				}
				else
					alert("未傳入應上傳秘書簽辦意見檔的callback函式");
			}
			// 1100707 Raymond 1100648 新增啟用分文稿記錄簽核意見功能時, 簽核意見依文稿數量寫入並新增"URI"屬性, 設定為文稿的"原始檔序號"(未異動內文)或"#"加文稿的"文件夾識別碼"(新增稿件或異動內文)
			else if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
				var si = _revs[_currRev].obj.signInfo;
				for(var i=0; i<si.drafts.length; i++) {
					// 1090910 Raymond 1090564 信保特殊模式不需要confirmDraftEdtiable
					//if(si.drafts[i].dirty() && fm.confirmDraftEditable(si.drafts[i])) {	// 2016.12.15 新增判斷此文稿可否編輯, 避免分會單位異動到主辦的文導致封裝檔資料錯誤
					if(si.drafts[i].dirty() && (fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2" || fm.confirmDraftEditable(si.drafts[i]))) {	// 2016.12.15 新增判斷此文稿可否編輯, 避免分會單位異動到主辦的文導致封裝檔資料錯誤
						// 2017.1.23 異動文稿內文要用原ID加X表示
						var did = si.drafts[i].id;
						if(did.match(/X$/)) {
							theLogger.error("封裝檔文稿物件的ID不可以是X結尾");
							alert("封裝檔文稿物件的ID不可以是X結尾");
						}
						//else if(!did.match(/^NewDraft/) && si.drafts[i].flowId.substr(5) != theAOL.docObj.msgId) {	// 2017.2.9 不是草稿且此文稿的產生點資訊與目前流桯點msgId不一樣, 才視為不同流程點新增的文稿, 要加X區別
						else if(!did.match(/^NewDraft/) && si.drafts[i].flowId.substr(5) != _docObj.msgId) {	// 1090608 Raymond 1090103 對此封裝檔而言當前docObj應為_docObj而非theAOL.docObj
							did = did + "X";
						}
						if(i > 0)	// 第2個以後文稿新增對應的"簽核意見"
							$cmt = newElm("簽核意見", $changeInfo);
						$cmt.attr("URI", "#" + did);	// 若文稿已異動, URI屬性設成"#"加文稿的文件夾識別碼, ex:"#NewDraft?"(新增文稿)或"#???X"(異動既有文稿)
						setText($cmt.get(0), si.drafts[i].newSignComment);
					}
					else if(si.drafts[i].removed()) {
						// TODO: 文稿已移除
					}
					else {
						if(i > 0)	// 第2個以後文稿新增對應的"簽核意見"
							$cmt = newElm("簽核意見", $changeInfo);
						$cmt.attr("URI", si.drafts[i].fileSN);	// 若文稿未異動, URI屬性設成文稿的原始檔識別碼
						setText($cmt.get(0), si.drafts[i].newSignComment);
					}
				}
			}
			else
				setText($cmt.get(0), _signComment);   // TODO: 帶入某一個文字意見做為簽核意見
			var $signTime = newElm("簽章時間", $changeInfo);
			setText($signTime.get(0), "");    // 工作檔尚未加簽
			var $next = newElm("次位簽核人員", $changeInfo);
			$signPerson = newElm("簽核人員", $next);
			$ouName = newElm("單位", $signPerson);
			//setText($ouName.get(0), theAOL.docObj.toOUName);	// for IE-compatible
			setText($ouName.get(0), _docObj.toOUName);	// 1090608 Raymond 1090103 對此封裝檔而言當前docObj應為_docObj而非theAOL.docObj
			$title = newElm("職稱", $signPerson);
			//setText($title.get(0), theAOL.docObj.toTitle || "");	// for IE-compatible
			setText($title.get(0), _docObj.toTitle || "");	// 1090608 Raymond 1090103 對此封裝檔而言當前docObj應為_docObj而非theAOL.docObj
			$nm = newElm("姓名", $signPerson);
			//setText($nm.get(0), theAOL.docObj.toUserName);	// for IE-compatible
			setText($nm.get(0), _docObj.toUserName);	// 1090608 Raymond 1090103 對此封裝檔而言當前docObj應為_docObj而非theAOL.docObj
			$acc = newElm("帳號", $signPerson);
			//setText($acc.get(0), theAOL.docObj.toUserId);	// for IE-compatible
			setText($acc.get(0), _docObj.toUserId);	// 1090608 Raymond 1090103 對此封裝檔而言當前docObj應為_docObj而非theAOL.docObj
			$role = newElm("角色", $signPerson);
			//setText($role.get(0), theAOL.docObj.toRoleName);	// for IE-compatible
			setText($role.get(0), _docObj.toRoleName);	// 1090608 Raymond 1090103 對此封裝檔而言當前docObj應為_docObj而非theAOL.docObj
			
			var $signInfo = newElm("簽核資訊", doc.documentElement);
			
			var si = _revs[_currRev].obj.signInfo;
			if("fromFolder" in si) {
				$signInfo.append(cloneNode(si.fromFolder.cachedDOM));  // 來文文件夾複製即可, 也不能異動	// for IE-compatible
			}
			
			var now = new Date();
			var $signFolder = newElm("簽核文件夾", $signInfo)
							//.attr("Id", "sDoc_" + theAOL.docObj.msgId)
							.attr("Id", "sDoc_" + _docObj.msgId)	// 1090608 Raymond 1090103 對此封裝檔而言當前docObj應為_docObj而非theAOL.docObj
							.attr("產生時間", getCreateTime());
			var $signDocList = newElm("簽核文稿清單", $signFolder)
							.attr("文稿數", si.drafts.length);
			for(var i=0, idx=0; i<si.drafts.length; i++) {
				// 1141229 Raymond 1141693 新增判斷cachedDM.dirty(), 以避免因排版因素導致的簽核畫面頁數與封裝檔不一致時, 誤判為內文有異動, 而需要使用者加簽傳送的問題
				// 1121226 Raymond 1120887 新增支援會辦單位修改簽稿會核單的簽辦意見內容功能
				// 1090910 Raymond 1090564 信保特殊模式不需要confirmDraftEdtiable
				//if(si.drafts[i].dirty() && fm.confirmDraftEditable(si.drafts[i])) {	// 2016.12.15 新增判斷此文稿可否編輯, 避免分會單位異動到主辦的文導致封裝檔資料錯誤
				//if(si.drafts[i].dirty() && (fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2" || fm.confirmDraftEditable(si.drafts[i]))) {	// 2016.12.15 新增判斷此文稿可否編輯, 避免分會單位異動到主辦的文導致封裝檔資料錯誤
				//if(si.drafts[i].dirty() && (fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2" || fm.confirmDraftEditable(si.drafts[i]) ||	// 2016.12.15 新增判斷此文稿可否編輯, 避免分會單位異動到主辦的文導致封裝檔資料錯誤
				let cdm = fm.getCachedDM(si.drafts[i]);
				if(si.drafts[i].dirty() && !!cdm && !cdm.dirty())
					theLogger.log("文稿標示為已異動, 但內文未標示為已異動, 應是簽核頁面頁數與封裝檔記錄不一致導致的, 忽略此異動");
				if(si.drafts[i].dirty() && (!cdm || cdm.dirty()) && (fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2" || fm.confirmDraftEditable(si.drafts[i]) ||	// 回傳的cdm為null時, 表示未下載, 未下載的DraftModel就標示dirty, 就表示不是因頁數差異造成的, 而是前次儲存就是dirty了
					(si.drafts[i].docType == "簽稿會核單" && _fm.isConUnit()))) {
					// 2017.1.23 異動文稿內文要用原ID加X表示
					var did = si.drafts[i].id;
					if(did.match(/X$/)) {
						theLogger.error("封裝檔文稿物件的ID不可以是X結尾");
						alert("封裝檔文稿物件的ID不可以是X結尾");
					}
					//else if(!did.match(/^NewDraft/) && si.drafts[i].flowId.substr(5) != theAOL.docObj.msgId) {	// 2017.2.9 不是草稿且此文稿的產生點資訊與目前流桯點msgId不一樣, 才視為不同流程點新增的文稿, 要加X區別
					else if(!did.match(/^NewDraft/) && si.drafts[i].flowId.substr(5) != _docObj.msgId) {	// 1090608 Raymond 1090103 對此封裝檔而言當前docObj應為_docObj而非theAOL.docObj
						did = did + "X";
					}
					// 2013.9.25 - Raymond, 文稿已異動, 填入placeholder
					newElm("文稿", $signDocList).attr("update-id", "upd" + (++idx))
												.attr("文件夾識別碼", did);	// 2017.1.23 用處理過的ID
					// 呼叫回呼函式
					callback("upd" + idx, si.drafts[i]);
				}
				else if(si.drafts[i].removed()) {
					// TODO: 文稿已移除
				}
				else {
					if(!!si.drafts[i].cachedDOM)	// 2017.3.20 fix for 前一流程點新增文稿但未寫入封裝檔(送銷號可不寫入)導致此流程點(待銷號)傳送失敗問題
						$signDocList.append(cloneNode(si.drafts[i].cachedDOM));//若無異動則直接複製即可	// for IE-compatible
					else
						theLogger.warn("第" + i + "個文稿無對應的封裝檔節點, 應是前一流程的新增文稿但未經過寫入封裝檔, 可能是系統銷號直接改msgId等行為, 不會過封裝等正式傳送作業");
				}
			}
			
			// 1100512 Raymond 1090821 修正草稿公文因無簽核流程參照, 造成儲存時發生錯誤的問題
			// 1100512 Raymond 1090821 若本流程點為外機關流程點, 則不要將本流程點的<電子檔案資訊>寫入<檔案清單>
			//if(_revs[_currRev].refFlow.isExorgFlow) {
			if(!!_revs[_currRev].refFlow && _revs[_currRev].refFlow.isExorgFlow) {
				newElm("檔案清單", $signFolder).attr("檔案數", "0");
			}
			else {
			var $fileList = newElm("檔案清單", $signFolder)
							.attr("檔案數", si.files.length);
			for(var i=0; i<si.files.length; i++) {
				if("cachedDOM" in si.files[i])  // 舊檔案
					$fileList.append(cloneNode(si.files[i].cachedDOM));	// for IE-compatible
				else {
					// TODO: 新增的檔案
				}
			}
			}
			
			return doc;
		},
		signComment: function() {   // 2013.9.14 - Raymond, 新增簽核意見對應方法
			// 1100708 Raymond 1100648 新增當分文稿記錄簽核意見功能啟用時, 回傳所有文稿的簽核意見相加的結果, 主要可能由MS-WebEditSave.js或RD-Submit.js叫用, 設定按鈕的"簽辦意見"選單按鈕應該已拔掉, 不會從RD-DlgProcessSetting.js叫用才是
			if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
				if(arguments.length > 0) {
					theLogger.error("當分文稿記錄簽核意見功能啟用時, 不可設定全文的簽核意見為'" + arguments[0] + "'");
					alert("當分文稿記錄簽核意見功能啟用時,\n不可設定全文的簽核意見為'" + arguments[0] + "'");
				}
				else {
					var res = "";
					var si = _revs[_currRev].obj.signInfo;
					for(var i=0; i<si.drafts.length; i++) {
						res += si.drafts[i].newSignComment || "";
					}
					return res;
				}
			}
			else {	// 未啟用功能則照舊邏輯
				if(arguments.length > 0) {
					theLogger.log("設定簽核意見為'" + arguments[0] + "'");
					_signComment = arguments[0];
					
					// 1061109 Raymond 1060452 同步到顯示中的簽辦意見窗格
					if($("#aol #leftPart #sidePanel").css("display") != "none") {
						if($("#aol #leftPart #sidePanel li").length > 0) {
							$("#aol #leftPart #sidePanel li").eq(0).find("textarea").val(_signComment);
						}
					}
				}
				else
					return _signComment;
			}
		},
		// 1100708 Raymond 1100648 新增啟用分文稿記錄簽核意見功能時, 取得或設定目前顯示中的文稿的簽核意見, 由theAOL.setupSignComments()叫用
		currSignComment: function() {
			if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
				var d = _fm.getCurrDraftInfo();
				if(arguments.length > 0) {
					theLogger.log("設定'" + d.name + "'(id:" + d.id + ")簽核意見為'" + arguments[0] + "'");
					d.newSignComment = arguments[0];
					
					// 1061109 Raymond 1060452 同步到顯示中的簽辦意見窗格
					if($("#aol #leftPart #sidePanel").css("display") != "none") {
						if($("#aol #leftPart #sidePanel li").length > 0) {
							// 1141015 Raymond 1141129 多傳入hideBtn:true物件參數, 以避免顯示「確定」、「取消」鈕
							// 1140324 Raymond 1131303 主動觸發input事件以同步錯別字校正標示層功能
							//$("#aol #leftPart #sidePanel li").eq(0).find("textarea").val(d.newSignComment);
							//$("#aol #leftPart #sidePanel li").eq(0).find("textarea").val(d.newSignComment).trigger("input");
							$("#aol #leftPart #sidePanel li").eq(0).find("textarea").val(d.newSignComment).trigger("input", {hideBtns:true});
						}
					}
				}
				else
					return d.newSignComment || "";
			}
			else {	// 未啟用功能則照舊邏輯
				if(arguments.length > 0) {
					theLogger.log("設定簽核意見為'" + arguments[0] + "'");
					_signComment = arguments[0];
					
					// 1061109 Raymond 1060452 同步到顯示中的簽辦意見窗格
					if($("#aol #leftPart #sidePanel").css("display") != "none") {
						if($("#aol #leftPart #sidePanel li").length > 0) {
							// 1141015 Raymond 1141129 多傳入hideBtn:true物件參數, 以避免顯示「確定」、「取消」鈕
							// 1140324 Raymond 1131303 主動觸發input事件以同步錯別字校正標示層功能
							//$("#aol #leftPart #sidePanel li").eq(0).find("textarea").val(_signComment);
							//$("#aol #leftPart #sidePanel li").eq(0).find("textarea").val(_signComment).trigger("input");
							$("#aol #leftPart #sidePanel li").eq(0).find("textarea").val(_signComment).trigger("input", {hideBtns:true});
						}
					}
				}
				else
					return _signComment;
			}
		},
		restoreSignComment: function(uri, content) {	// 1100707 Raymond 1100648 新增由SignWork.xml讀回分文稿記錄的簽核意見
			if(!!uri) {
				var si = _revs[_currRev].obj.signInfo;
				for(var i=0; i<si.drafts.length; i++) {
					// 1090910 Raymond 1090564 信保特殊模式不需要confirmDraftEdtiable
					//if(si.drafts[i].dirty() && fm.confirmDraftEditable(si.drafts[i])) {	// 2016.12.15 新增判斷此文稿可否編輯, 避免分會單位異動到主辦的文導致封裝檔資料錯誤
					if(si.drafts[i].dirty() && (_fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2" || _fm.confirmDraftEditable(si.drafts[i]))) {	// 2016.12.15 新增判斷此文稿可否編輯, 避免分會單位異動到主辦的文導致封裝檔資料錯誤
						// 2017.1.23 異動文稿內文要用原ID加X表示
						var did = si.drafts[i].id;
						if(did.match(/X$/)) {
							theLogger.error("封裝檔文稿物件的ID不可以是X結尾");
							alert("封裝檔文稿物件的ID不可以是X結尾");
						}
						//else if(!did.match(/^NewDraft/) && si.drafts[i].flowId.substr(5) != theAOL.docObj.msgId) {	// 2017.2.9 不是草稿且此文稿的產生點資訊與目前流桯點msgId不一樣, 才視為不同流程點新增的文稿, 要加X區別
						else if(!did.match(/^NewDraft/) && si.drafts[i].flowId.substr(5) != _docObj.msgId) {	// 1090608 Raymond 1090103 對此封裝檔而言當前docObj應為_docObj而非theAOL.docObj
							did = did + "X";
						}
						if(uri == "#" + did)	// 若文稿已異動, URI屬性設成"#"加文稿的文件夾識別碼, ex:"#NewDraft?"(新增文稿)或"#???X"(異動既有文稿)
							si.drafts[i].newSignComment = content;
					}
					else if(si.drafts[i].removed()) {
						// TODO: 文稿已移除
					}
					else {
						if(uri == si.drafts[i].fileSN)	// 若文稿未異動, URI屬性設成文稿的原始檔識別碼
							si.drafts[i].newSignComment = content;
					}
				}
			}
			else {
				var si = _revs[_currRev].obj.signInfo;
				if(si.drafts.length > 0 && si.drafts[0].name != "來文簽辦")
					si.drafts[0].newSignComment = content;
			}
		},
		lastSNofSOFileName: 0,
		hasFromDoc: function() {	// 2014.12.9 - Raymond, 判斷是否有來文
			var snfo = _revs[_currRev].obj.signInfo;
			return (snfo.fromFolder !== undefined);
		},
		reserveSOofOtherRev: function(apdDoc) {	// 2015.4.14 - 加入其它流程點的保留簽核物件, 2015.5.7 新增從AOLProcessData.xml中搜尋需保留簽核物件的文稿, 及頁面有簽核區域的資訊
		
			function detectTextSignObjInArea(so, sa) {	// 2017.1.4 文字意見中心點因為封裝檔沒有記錄寬高資訊須另外判定
				if("pos" in so.content) {
					if(so.asIcon) {	// 圖示直接以pos.x/y判定
						if(so.content.pos.x >= sa.left &&
							so.content.pos.y >= sa.top &&
							so.content.pos.x <= sa.right &&
							so.content.pos.y <= sa.bottom)
							return true;
					}
					else {
						var $tx = $("<div class='sign-obj so-text'>" +
"<div writing-mode:" + ((so.content.orient == "直書")?"tb-rl":"lr-tb") +
		";font-family:" + so.content.font.name +
		";font-size:" + (so.content.font.size+"pt") + "'>" + so.content.text.replace(/\n/g, '<br>') + "</div></div>").appendTo("#aol");
						theLogger.log("\t\t試算文字意見寬高:" + $tx.width() + "," + $tx.height());
						var w = $tx.width() * 2480 / 794;
						var h = $tx.height() * 3507 / 1123;
						$tx.remove();
						var cp = {x: parseInt(so.content.pos.x) + (w / 2), y: parseInt(so.content.pos.y) + (h / 2)};
						if(cp.x >= sa.left &&
							cp.y >= sa.top &&
							cp.x <= sa.right &&
							cp.y <= sa.bottom) {
							theLogger.warn("\t\t中心點(" + cp.x + "," + cp.y + ")在簽核區域內");
							return true;
						}
						else
							theLogger.warn("\t\t中心點(" + cp.x + "," + cp.y + ")不在簽核區域內");
					}
				}
				return false;
			}
			// 1081024 Raymond 1080877 for 判斷簽核區域類型是否相同
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

		//try {
			var $apd = $(apdDoc);
			//var si = _revs[_currRev].obj.signInfo;
		for(rev in _revs) {	// 2016.12.29 找全部版本的保留簽署物件, 以供歷史檢視
			// 1100512 Raymond 1090821 參照窗格歷史檢視的偵測保留簽署物件功能要略過外機關流程點
			if(_revs[rev].refFlow.isExorgFlow) {
				theLogger.log("忽略外機關流程點'" + rev + "'");
				continue;
			}
			theLogger.log("***版本'" + rev + "'***");
			var si = _revs[rev].obj.signInfo;
			for(var i=0; i<si.drafts.length; i++) {	// 目前流程點的文稿
				theLogger.log("文稿#" + i + "(ID:" + si.drafts[i].id + ")...");
				var poSA = 0;	// 2015.12.22 當前版本簽核區域的所在頁次
				var $nl = $apd.find("版本[文件夾識別碼='" + si.drafts[i].id + "']");
				if($nl.length > 0) {
					var $nd = $nl.eq(0);
					// 先檢查目前版本文稿頁面中的簽核物件是否位於簽核區域內
					for(var k=0; k<si.drafts[i].draftPages.pages.length; k++) {
						var p = si.drafts[i].draftPages.pages[k];
						var $nl2 = $nd.find("簽署頁面").filter(function(idx, elm) {	// 2016.10.5 FIX
								if($(elm).find("文件夾識別碼").text() == p.id)
									return true;
							});
						if($nl2.length > 0) {
							var $nd2 = $nl2.eq(0);
							var $nl3 = $nd2.find("簽核區域");
							if($nl3.length == 0)
								theLogger.log("\t此簽署頁面(文件夾識別碼:" + p.id + ")不含簽核區域");
							else {
								// 1060803 Raymond 1060579 新增記錄AOLProccessData.xml中所記錄的簽核區域至各別版本的頁面以供歷史檢視使用
								if(!("saInAPD" in p))
									p.saInAPD = new Array();
								for(var y=0; y<$nl3.length; y++) {
									var $saNode = $nl3.eq(y);
									p.saInAPD.push({
											type: $saNode.attr("類型"),
											id: $saNode.attr("代碼"),
											left: Number($saNode.attr("left")),
											top: Number($saNode.attr("top")),
											right: Number($saNode.attr("right")),
											bottom: Number($saNode.attr("bottom"))
										});
								}
								// 1090717 Raymond 1090477 新增LOG訊息
								theLogger.log("此簽署頁面(文件夾識別碼:" + p.id + ")含簽核區域: ");
								theLogger.log(p.saInAPD);
								
								for(var x=0; x<p.signObjs.length; x++) {	// 偵測此頁的簽核物件是否在簽核區域內
									theLogger.log("\t偵測頁面(ID:" + p.id + ")簽核物件(ID:" + p.signObjs[x].id + ")是否在簽核區域內...");
									
									// 1100913 Raymond 1100771 比對XSignObjs.xml中的簽核物件記錄的簽核區域id, 若不同可能是頁次不一致
									var xsos = _xSignFolder.findSignObjById(p.signObjs[x].id);	// findSignObjById回傳的是陣列
									if(xsos.length == 1) {
										var xsosSAfound = false;
										for(var y=0; y<p.saInAPD.length; y++) {
											if(xsos[0].saID == p.saInAPD[y].id) {
												xsosSAfound = true;
												break;
											}
										}
										if(!xsosSAfound) {
											theLogger.warn("\t" + p.signObjs[x].type + "(ID:" + p.signObjs[x].id + ")在XSignObjs.xml中記錄的簽核區域ID(" + xsos[0].saID + ")未在此頁(" + p.id + ")出現, 可能位於其他頁次, 忽略偵測是否在簽核區域內");
											continue;
										}
									}
									
									for(var y=0; y<$nl3.length; y++) {	// 取出同一頁記錄於AOLProcessData.xml的簽核區域資訊, 2017.1.11 修正有複數簽核區域時的判定
										poSA = k;	// 2015.12.22 記錄當前版本簽核區域的所在頁次
										//theLogger.log("當前版本的簽核區域#" + y + "位於第" + (poSA+1) + "頁");
										var $saNode = $nl3.eq(y);
										var sa = {
											type: $saNode.attr("類型"),
											id: $saNode.attr("代碼"),
											left: Number($saNode.attr("left")),
											top: Number($saNode.attr("top")),
											right: Number($saNode.attr("right")),
											bottom: Number($saNode.attr("bottom"))
										};
										
										// 1100929 Raymond 航港局序2 若歷史檢視比簽核頁面少一頁時, 某些簽核物件因剛好位於AOLProccessData.xml所記錄的簽核區域內, 而計算出錯誤的offset, 導致顯示在錯誤的位置, 修正為先檢查XSignObjs.xml中記錄的對應的簽核物件, 有則直接使用這個簽核物件的offset及saType, saID
										if(xsos.length > 0) {
											for(var zi=0; zi<xsos.length; zi++) {
												var xso = xsos[zi];
												if(!!xso && xso.type == "A" && toSAType(xso.saType) == toSAType(sa.type) && xso.saID == sa.id) {	// 外部簽核記錄檔中只要判斷框內(Type:A)的簽核物件, 因為保留簽核物件功能僅能保留框內物件
													theLogger.warn("\t在XSignObjs.xml外部簽核記錄檔中找到(ID:" + p.signObjs[x].id + ")簽核物件, 且記錄為框內物件, 進一步檢核是否為對應正確版本的頁面...");
													if(xso.parent.id == si.drafts[i].id) {	// 文稿版本相符
														var matchPageId = false, xsaPgId = undefined;
														for(var z=0; z<xso.parent.xSignAreas.length; z++) {
															if(xso.parent.xSignAreas[z].saType == xso.saType && xso.parent.xSignAreas[z].saID == xso.saID) {	// 簽核區域相符
																xsaPgId = xso.parent.xSignAreas[z].pgId;
																matchPageId = (xso.parent.xSignAreas[z].pgId == p.id);	// 與封裝檔比對是否為相同頁面
																break;	// 理論上同一筆文稿不應有重複類型及ID的簽核區域, 那會使重新載入時應將簽核物件貼在哪一個區域的行為產生混亂
															}
														}
														if(matchPageId) {
															if("offset" in xso && !!xso.offset) {
																p.signObjs[x].saType = sa.type;
																p.signObjs[x].saID = sa.id;
																p.signObjs[x].offset = xso.offset;
																theLogger.log("\t\t文稿版本及頁面等條件符合, 修復此簽核物件為框內物件 - offset:" + p.signObjs[x].offset.x + "," + p.signObjs[x].offset.y + " saType:" + p.signObjs[x].saType + " saID:" + p.signObjs[x].saID);
																break;	// zi - loop
															}
															else
																theLogger.error("\t\t外部簽核記錄檔未記錄offset-x、offset-y屬性, 無法修復為框內物件");
														}
														else if(!!xsaPgId)
															theLogger.error("\t\t簽核物件所屬頁面(ID:" + p.id + ")與外部簽核記錄檔記錄的頁面(ID:" + xsaPgId + ")不相符, 無法修復為框內物件");
														else
															theLogger.error("\t\t外部簽核記錄檔未記錄相符的簽核區域(sa-type:" + xso.saType + "sa-id:" + xso.saID + "), 無法修復為框內物件");
													}
													else
														theLogger.error("\t\t外部簽核記錄檔記錄文稿版本(" + xso.parent.id + ")與封裝檔的歷史文稿ID(" + prevRevDraftId + ")不相符, 無法修復為框內物件");
												}
											}
										}
										else
										if(("area" in p.signObjs[x].content && p.signObjs[x].content.area.left >= sa.left &&
											p.signObjs[x].content.area.top >= sa.top &&
											p.signObjs[x].content.area.left <= sa.right &&
											p.signObjs[x].content.area.top <= sa.bottom) ||
										   ("pos" in p.signObjs[x].content && detectTextSignObjInArea(p.signObjs[x], sa))	//2017.1.4 文字意見另外偵測
											/*p.signObjs[x].content.pos.x >= sa.left &&
											p.signObjs[x].content.pos.y >= sa.top &&
											p.signObjs[x].content.pos.x <= sa.right &&
											p.signObjs[x].content.pos.y <= sa.bottom)*/) {	// 2015.5.27 修正pos用x,y不是left,top
											
											theLogger.log("\t" + p.signObjs[x].type + "(ID:" + p.signObjs[x].id + ")在此簽核框(#" + y + ")範圍內, 計算相對位置...");
											
											// 計算位於簽核框內的相對位置, 2015.5.27 修正章戳圖檔用area, 文字意見用pos
											if("area" in p.signObjs[x].content) {
												p.signObjs[x].offset = {
													x: p.signObjs[x].content.area.left - sa.left,
													y: p.signObjs[x].content.area.top - sa.top
												};
											}
											else {
												p.signObjs[x].offset = {
													x: p.signObjs[x].content.pos.x - sa.left,
													y: p.signObjs[x].content.pos.y - sa.top
												};
											}
											p.signObjs[x].saType = sa.type;
											p.signObjs[x].saID = sa.id;
											
											theLogger.log("\t\toffset:" + p.signObjs[x].offset.x + "," + p.signObjs[x].offset.y + " saType:" + p.signObjs[x].saType + " saID:" + p.signObjs[x].saID);
											
											/* 2016.2.25 貼式顯示旗標改至最下方獨立檢查, 與是否保留簽核物件的判定無關
											// 2015.5.27 保留簽核物件從AOLProcessData.xml中取回貼式顯示旗標
											var nl4 = apdDoc.evaluate("//簽核物件[@Id='" + p.signObjs[x].id + "']", apdDoc, null, 7, null);
											if(nl4.snapshotLength > 0) {
												var soNode = nl4.snapshotItem(0);
												if($(soNode).attr("貼式意見") == "Y")
													p.signObjs[x].asIcon = true;
											}*/
											break;	// 2017.1.11 找到就break
										}
										else {
											theLogger.log("\t" + p.signObjs[x].type + "(ID:" + p.signObjs[x].id + ")不在此簽核框(#" + y + ")範圍內");
											
											/* 1100929 Raymond 航港局序2 若歷史檢視比簽核頁面少一頁時, 某些簽核物件因剛好位於AOLProccessData.xml所記錄的簽核區域內, 而計算出錯誤的offset, 導致顯示在錯誤的位置
											// 1081024 Raymond 1080877 因匯出頁數與簽核當時瀏覽器(IE)呈現頁數不一致, 導致簽核物件蓋的top位置出現差異而被判定成框外未隨匯出頁面時的簽核框位置調整, 補由XSignObjs.xml記錄檔判斷是否原本為框內簽核物件, 若是則加上簽核框資訊以調整其位置
											var xsos = _xSignFolder.findSignObjById(p.signObjs[x].id);	// findSignObjById回傳的是陣列
											if(xsos.length > 0) {
												for(var zi=0; zi<xsos.length; zi++) {
													var xso = xsos[zi];
													if(!!xso && xso.type == "A" && toSAType(xso.saType) == toSAType(sa.type) && xso.saID == sa.id) {	// 外部簽核記錄檔中只要判斷框內(Type:A)的簽核物件, 因為保留簽核物件功能僅能保留框內物件
														theLogger.warn("\t在XSignObjs.xml外部簽核記錄檔中找到(ID:" + p.signObjs[x].id + ")簽核物件, 且記錄為框內物件, 進一步檢核是否為對應正確版本的頁面...");
														if(xso.parent.id == si.drafts[i].id) {	// 文稿版本相符
															var matchPageId = false, xsaPgId = undefined;
															for(var z=0; z<xso.parent.xSignAreas.length; z++) {
																if(xso.parent.xSignAreas[z].saType == xso.saType && xso.parent.xSignAreas[z].saID == xso.saID) {	// 簽核區域相符
																	xsaPgId = xso.parent.xSignAreas[z].pgId;
																	matchPageId = (xso.parent.xSignAreas[z].pgId == p.id);	// 與封裝檔比對是否為相同頁面
																	break;	// 理論上同一筆文稿不應有重複類型及ID的簽核區域, 那會使重新載入時應將簽核物件貼在哪一個區域的行為產生混亂
																}
															}
															if(matchPageId) {
																if("offset" in xso && !!xso.offset) {
																	p.signObjs[x].saType = sa.type;
																	p.signObjs[x].saID = sa.id;
																	p.signObjs[x].offset = xso.offset;
																	theLogger.log("\t\t文稿版本及頁面等條件符合, 修復此簽核物件為框內物件 - offset:" + p.signObjs[x].offset.x + "," + p.signObjs[x].offset.y + " saType:" + p.signObjs[x].saType + " saID:" + p.signObjs[x].saID);
																	break;	// zi - loop
																}
																else
																	theLogger.error("\t\t外部簽核記錄檔未記錄offset-x、offset-y屬性, 無法修復為框內物件");
															}
															else if(!!xsaPgId)
																theLogger.error("\t\t簽核物件所屬頁面(ID:" + p.id + ")與外部簽核記錄檔記錄的頁面(ID:" + xsaPgId + ")不相符, 無法修復為框內物件");
															else
																theLogger.error("\t\t外部簽核記錄檔未記錄相符的簽核區域(sa-type:" + xso.saType + "sa-id:" + xso.saID + "), 無法修復為框內物件");
														}
														else
															theLogger.error("\t\t外部簽核記錄檔記錄文稿版本(" + xso.parent.id + ")與封裝檔的歷史文稿ID(" + prevRevDraftId + ")不相符, 無法修復為框內物件");
													}
												}
											}
											else
												theLogger.warn("\t\t外部簽核記錄檔中找不到任何ID為(" + p.signObjs[x].id + ")的簽核物件記錄");*/
										}
									}
								}
							}
						}
						else
							theLogger.warn("AOLProcessData.xml中找不到'文件夾識別碼'為" + p.id + "的'簽署頁面'");
					}
					
					// 1090717 Raymond 1090477 修正檢查是否有類型A(框內)的簽核物件因所在頁次沒有記錄在AOLProcessData.xml, 而未指定簽核區域類型及ID, 導致不會顯示在所屬簽核區域所在頁次與簽核頁面不一致問題
					for(var k=0; k<si.drafts[i].draftPages.pages.length; k++) {
						var p = si.drafts[i].draftPages.pages[k];
						for(var x=p.signObjs.length-1; x>=0; x--) {	// 用倒序才能用splice搬移不同頁次的簽核物件
							if(!p.signObjs[x].saType && !p.signObjs[x].saID) {// 偵測此頁未記錄在簽核區域內的簽核物件, 是否為頁次不同因素所導致
								// 用XSignObjs.xml的記錄判斷是否為類型A(框內)物件
								var xsos = _xSignFolder.findSignObjById(p.signObjs[x].id);	// findSignObjById回傳的是陣列
								if(xsos.length > 0) {
									for(var zi=0; zi<xsos.length; zi++) {
										var xso = xsos[zi];
										if(!!xso && xso.type == "A") {	// 外部簽核記錄檔中只要判斷框內(Type:A)的簽核物件, 因為保留簽核物件功能僅能保留框內物件
											theLogger.warn("\t在XSignObjs.xml外部簽核記錄檔中找到(ID:" + p.signObjs[x].id + ")簽核物件, 且記錄為框內物件, 進一步檢核是否為對應正確版本的頁面...");
											if(xso.parent.id == si.drafts[i].id) {	// 文稿版本相符
												var matchPageId = false, xsaPgId = undefined;
												for(var z=0; z<xso.parent.xSignAreas.length; z++) {
													if(xso.parent.xSignAreas[z].saType == xso.saType && xso.parent.xSignAreas[z].saID == xso.saID) {	// 簽核區域相符
														xsaPgId = xso.parent.xSignAreas[z].pgId;
														matchPageId = (xso.parent.xSignAreas[z].pgId == p.id);	// 與封裝檔比對是否為相同頁面
														break;	// 理論上同一筆文稿不應有重複類型及ID的簽核區域, 那會使重新載入時應將簽核物件貼在哪一個區域的行為產生混亂
													}
												}
												if(matchPageId) {
													theLogger.warn("\t同一頁有相同類型及ID的簽核區域, 但前面程序未偵測到?");
													if("offset" in xso && !!xso.offset) {
														p.signObjs[x].saType = xso.saType;	// 直接用外部簽核記錄檔記錄的簽核區域類型
														p.signObjs[x].saID = xso.saID;		// 直接用外部簽核記錄檔記錄的簽核區域ID
														p.signObjs[x].offset = xso.offset;
														theLogger.log("\t\t文稿版本及頁面等條件符合, 修復此簽核物件為框內物件 - offset:" + p.signObjs[x].offset.x + "," + p.signObjs[x].offset.y + " saType:" + p.signObjs[x].saType + " saID:" + p.signObjs[x].saID);
														break;	// zi - loop
													}
													else
														theLogger.error("\t\t外部簽核記錄檔未記錄offset-x、offset-y屬性, 無法修復為框內物件");
												}
												else if(!!xsaPgId) {
													theLogger.warn("\t簽核物件所屬頁面(ID:" + p.id + ")與外部簽核記錄檔記錄的頁面(ID:" + xsaPgId + ")不相符, 搜尋後者是否有簽核區域");
													for(var y=0; y<si.drafts[i].draftPages.pages.length; y++) {
														var pp = si.drafts[i].draftPages.pages[y];
														if(pp.id == xsaPgId) {
															if(!!pp.saInAPD) {
																var xsaPgFound = false;
																for(var z=0; z<pp.saInAPD.length; z++) {
																	if(toSAType(pp.saInAPD[z].type) == toSAType(xso.saType) && pp.saInAPD[z].id == xso.saID) {
																		xsaPgFound = true;
																		break;
																	}
																}
																if(xsaPgFound) {
																	theLogger.warn("\t\t找到外部簽核記錄檔記錄的頁面(ID:" + xsaPgId + ")且有相符的簽核區域, 將簽核物件移至該頁面");
																	p.signObjs[x].saType = xso.saType;
																	p.signObjs[x].saID = xso.saID;
																	p.signObjs[x].offset = xso.offset;
																	pp.signObjs.push(p.signObjs.splice(x, 1)[0]);	// 搬移簽核物件到簽核區域所在頁次
																}
																else
																	theLogger.warn("\t\t找到外部簽核記錄檔記錄的頁面(ID:" + xsaPgId + "), 但此頁面無相符的簽核區域, 無法修復為框內物件");
															}
															else
																theLogger.warn("\t\t找到外部簽核記錄檔記錄的頁面(ID:" + xsaPgId + "), 但此頁面無簽核區域, 無法修復為框內物件");
														}
													}
												}
												else
													theLogger.error("\t\t外部簽核記錄檔未記錄相符的簽核區域(sa-type:" + xso.saType + "sa-id:" + xso.saID + "), 無法修復為框內物件");
											}
											else
												theLogger.error("\t\t外部簽核記錄檔記錄文稿版本(" + xso.parent.id + ")與封裝檔的歷史文稿ID(" + prevRevDraftId + ")不相符, 無法修復為框內物件");
										}
									}
								}
								else
									theLogger.warn("\t\t外部簽核記錄檔中找不到任何ID為(" + p.signObjs[x].id + ")的簽核物件記錄");
							}
						}
					}
					
					// 先檢查當前流程點的文稿是否保留之前的簽核物件
					var preserveSO = $nd.attr("保留簽署意見");
					var copy = $nd.attr("抄本");	// 2017.1.10 新增稿轉函抄本不要保留簽核物件
					if(preserveSO == "true" && copy == "false") {
						theLogger.log("\t檢查之前流程點需保留顯示的簽核物件...");
						// 1060803 Raymond 1060579 reservedSO改到draftPages層, 因為前版本間須保留顯示的簽核物件可能需出現在目前版本的不同頁次
						if(!("reservedSO" in si.drafts[i].draftPages))
							si.drafts[i].draftPages.reservedSO = new Array();
					
						var prevRevNodes = [];	// 記錄在AOLProcessData.xml中的之前版本
						var nd = $nd.get(0);
						while(nd.previousSibling) {
							if(nd.previousSibling.nodeType == 1) {	// 2015.11.20 修正須過濾文字節點
								// 1130913 Raymond 中榮序188 修正歷史檢視時, 分會流程點因合併前一個匯出簽稿會核單的版本非同單位時, 簽核區域非前一單位增高後高度, 導致此分會流程點顯示前一單位的簽核物件會顯得異常的問題, 修正為在此分會流程點不要顯示前一版本的分會單位的簽核物件, 只顯示此分會流程點同一分會單位的簽核物件
								if(theSSO.User.EnvSettings.get("AOL_HISTORYVIEW_NO_MERGE_CON") == "Y") {	// 新增環境變數「AOL_HISTORYVIEW_NO_MERGE_CON」以啟用這項修正, 避免影響未啟用分會單位可修改簽稿會核單功能的機關
									var prevVerMsgId = $(nd.previousSibling).attr("建立流程點");
									if(!!prevVerMsgId) {
										if(!!_revs["sign_" + prevVerMsgId]) {
											if(!_revs["sign_" + prevVerMsgId].refFlow.dispatchNode) {		// 1.前一版本非分會流程點(主辦單位流程點), 應合併前一版本的簽核物件
												theLogger.log("前一版本(sign_" + prevVerMsgId + ")非分會流程點(主辦單位流程點), 應合併前一版本的簽核物件");
												prevRevNodes.push(nd.previousSibling);
											}
											else if(!_revs[rev].refFlow.dispatchNode) {						// 2.此版本非分會流程點(分會合併後的主辦流程點), 應合併所有以前版本的簽核物件
												theLogger.log("此版本(" + rev + ")非分會流程點(分會合併後的主辦流程點), 應合併所有以前版本的簽核物件");
												prevRevNodes.push(nd.previousSibling);
											}
											else if(_revs["sign_" + prevVerMsgId].refFlow.dispatchNode == _revs[rev].refFlow.dispatchNode) {	// 3.前一版本的分會點與此版本的分會點相同, 應合併前一版本的簽核物件
												theLogger.log("前一版本(sign_" + prevVerMsgId + ")的分會點與此版本(" + rev + ")的分會點相同, 應合併前一版本的簽核物件");
												prevRevNodes.push(nd.previousSibling);
											}
											else if(_revs["sign_" + prevVerMsgId].refFlow.dispatchNode.parentFlow.id != _revs[rev].refFlow.dispatchNode.parentFlow.id) {	// 4.前一版本的分會流程點Thread與此版本的分會流程點Thread不同(第二次分會), 應合併前一版本的簽核物件
												theLogger.log("前一版本(sign_" + prevVerMsgId + ")的分會流程點Thread與此版本(" + rev + ")的分會流程點Thread不同(第二次分會), 應合併前一版本的簽核物件");
												prevRevNodes.push(nd.previousSibling);
											}
											else
												theLogger.warn("前一版本(sign_" + prevVerMsgId + ")的分會點與此版本(" + rev + ")的分會點不同, 不合併前一版本的簽核物件");
										}
										else
											theLogger.error("前一個版本的'建立流程點'為'" + prevVerMsgId + "'但封裝檔中找不到與之對應的簽核流程, 無法判斷應否合併該版本的簽核物件");
									}
									else
										theLogger.error("前一個版本無'建立流程點'屬性, 無法判斷應否合併該版本的簽核物件");
								}
								else
								prevRevNodes.push(nd.previousSibling);
							}
							nd = nd.previousSibling;
						};
						theLogger.log("應合併簽核物件的版本", prevRevNodes);	// 1130913 Raymond 中榮序188 修改LOG資訊
						
						//var d = si.drafts[i];
						for(var j=0; j<prevRevNodes.length; j++) {
						
							var prevRevDraftId = $(prevRevNodes[j]).attr("文件夾識別碼");
							//theLogger.log("搜尋所有流程點定義中的文稿ID:" + prevRevDraftId);
							var prevRevDraft = _findDraftByIdAllRev(prevRevDraftId);	// 前版本記錄於封裝檔中的"文稿"
							//theLogger.log(prevRevDraft);
							if(!prevRevDraft) {	// 2015.12.23 修正找不到AOLProcessData.xml中記錄不存在封裝檔的文稿版本時, 中止處理後續
								theLogger.warn("封裝檔中找不到id為'" + prevRevDraftId + "'的前一版文稿節點, 中止搜尋");
								continue;	// 2016.10.5 FIX
							}
							
							for(var k=0; k<prevRevDraft.draftPages.pages.length; k++) {
							
								if(k < si.drafts[i].draftPages.pages.length) {	// 前版本文稿的頁次未超過當前版本文稿的總頁數
								
									var p = prevRevDraft.draftPages.pages[k];
									// 1060803 Raymond 1060579 reservedSO改到draftPages層, 因為前版本間須保留顯示的簽核物件可能需出現在目前版本的不同頁次
									//if(!("reservedSO" in si.drafts[i].draftPages.pages[k]))
									//	si.drafts[i].draftPages.pages[k].reservedSO = new Array();
									
									// 在前版本下找相同page id有無簽核區域資訊
									var $nl2 = $(prevRevNodes[j]).find("簽署頁面").filter(function(idx, elm) {	// 2016.10.5 FIX
										if($(elm).find("文件夾識別碼").text() == p.id)
											return true;
									});
									if($nl2.length > 0) {
										var $nd2 = $nl2.eq(0);
										var $nl3 = $nd2.find("簽核區域");
										if($nl3.length == 0)
											theLogger.log("此簽署頁面(文件夾識別碼:" + p.id + ")不含簽核區域");
										else {
											for(var x=0; x<p.signObjs.length; x++) {	// 偵測此頁的簽核物件是否在簽核區域內
												// 1130913 Raymond 中榮序188 修正歷史檢視時, 分會流程點因合併前一個未異動簽稿會核單內文(ex.自動增高)的版本(主辦單位的版本), 導致此分會流程點顯示前一單位的簽核物件會顯得異常的問題, 修正為在此分會流程點不要顯示不同的分會單位的簽核物件
												if(theSSO.User.EnvSettings.get("AOL_HISTORYVIEW_NO_MERGE_CON") == "Y") {	// 新增環境變數「AOL_HISTORYVIEW_NO_MERGE_CON」以啟用這項修正, 避免影響未啟用分會單位可修改簽稿會核單功能的機關
													if(!!p.signObjs[x].flowId && !!_revs[p.signObjs[x].flowId]) {
														if(!!_revs[rev].refFlow.dispatchNode && !!_revs[p.signObjs[x].flowId].refFlow.dispatchNode &&
															_revs[rev].refFlow.dispatchNode != _revs[p.signObjs[x].flowId].refFlow.dispatchNode) {
															theLogger.warn("簽核物件(ID:" + p.signObjs[x].id + ")為分會流程點(" + p.signObjs[x].flowId + ")新增, 但與目前的分會流桯點(" + rev + ")不同單位, 不要保留顯示");
															continue;
														}
													}
												}
												theLogger.log("偵測簽核物件(ID:" + p.signObjs[x].id + ")是否保留...");
												
												var reserved = false;	// 1060808 Raymond 1060579 簽核物件已保留旗標
												for(var y=0; y<$nl3.length; y++) {	// 取出同一頁記錄於AOLProcessData.xml的簽核區域資訊, 2017.1.11 修正有複數簽核區域時的判定
													var $saNode = $nl3.eq(y);
													var sa = {
														type: $saNode.attr("類型"),
														id: $saNode.attr("代碼"),
														left: Number($saNode.attr("left")),
														top: Number($saNode.attr("top")),
														right: Number($saNode.attr("right")),
														bottom: Number($saNode.attr("bottom"))
													};
													
													// 2016.10.5 FIX, 算中心點在框內
													if(("area" in p.signObjs[x].content &&
														((parseInt(p.signObjs[x].content.area.left) + parseInt(p.signObjs[x].content.area.right)) / 2) >= sa.left &&
														((parseInt(p.signObjs[x].content.area.top) + parseInt(p.signObjs[x].content.area.bottom)) / 2) >= sa.top &&
														((parseInt(p.signObjs[x].content.area.left) + parseInt(p.signObjs[x].content.area.right)) / 2) <= sa.right &&
														((parseInt(p.signObjs[x].content.area.top) + parseInt(p.signObjs[x].content.area.bottom)) / 2) <= sa.bottom) ||
													   ("pos" in p.signObjs[x].content && detectTextSignObjInArea(p.signObjs[x], sa))	//2017.1.4 文字意見另外偵測
														/*p.signObjs[x].content.pos.x >= sa.left &&
														p.signObjs[x].content.pos.y >= sa.top &&
														p.signObjs[x].content.pos.x <= sa.right &&
														p.signObjs[x].content.pos.y <= sa.bottom)*/) {	// 2015.5.28 修正pos用x,y不是left,top
														
														theLogger.log("\t" + p.signObjs[x].type + "(ID:" + p.signObjs[x].id + ")在簽核框(#" + y + ")範圍內, 保留顯示");
														
														// 計算位於簽核框內的相對位置, 2015.5.28 修正章戳圖檔用area, 文字意見用pos
														if("area" in p.signObjs[x].content) {
															p.signObjs[x].offset = {
																x: p.signObjs[x].content.area.left - sa.left,
																y: p.signObjs[x].content.area.top - sa.top
															};
														}
														else {
															p.signObjs[x].offset = {
																x: p.signObjs[x].content.pos.x - sa.left,
																y: p.signObjs[x].content.pos.y - sa.top
															};
														}
														p.signObjs[x].saType = sa.type;
														p.signObjs[x].saID = sa.id;
														
														theLogger.log("\t\toffset:" + p.signObjs[x].offset.x + "," + p.signObjs[x].offset.y + " saType:" + p.signObjs[x].saType + " saID:" + p.signObjs[x].saID);
														
														/* 2016.2.25 貼式顯示旗標改至最下方獨立檢查, 與是否保留簽核物件的判定無關
														// 2015.5.28 保留簽核物件從AOLProcessData.xml中取回貼式顯示旗標
														var nl4 = apdDoc.evaluate("//簽核物件[@Id='" + p.signObjs[x].id + "']", apdDoc, null, 7, null);
														if(nl4.snapshotLength > 0) {
															var soNode = nl4.snapshotItem(0);
															if($(soNode).attr("貼式意見") == "Y")
																p.signObjs[x].asIcon = true;
														}*/
														
														// 1130826 Raymond 中榮序214 修正歷史檢視時, 保留顯示的簽核物件沒有從舊到新排序, 導致需要重疊顯示(ex.貼布)的物件未遮住下面物件的問題
														// 1060803 Raymond 1060579 reservedSO改到draftPages層, 因為前版本間須保留顯示的簽核物件可能需出現在目前版本的不同頁次
														//si.drafts[i].draftPages.pages[k].reservedSO.push(p.signObjs[x]);
														//si.drafts[i].draftPages.reservedSO.push(p.signObjs[x]);
														si.drafts[i].draftPages.reservedSO.splice(0 + x, 0, p.signObjs[x]);	// 從0開始插入這個前版本的簽核物件, 1插入這個前版本的第2個簽核物件, 以此類推
														reserved = true;
														break;	// 2017.1.11 break y-loop
													}
													else {	// 1060808 Raymond 1060579 新增不在區域內的詳細資訊
														//theLogger.log("\t" + p.signObjs[x].type + "(ID:" + p.signObjs[x].id + ")不在簽核框(#" + y + ")範圍內, 不保留");
														if("area" in p.signObjs[x].content) {
															var cp={x: (parseInt(p.signObjs[x].content.area.left) + parseInt(p.signObjs[x].content.area.right)) / 2,
																	y: (parseInt(p.signObjs[x].content.area.top) + parseInt(p.signObjs[x].content.area.bottom)) / 2};
															theLogger.log("\t" + p.signObjs[x].type + "(ID:" + p.signObjs[x].id + ", 中心點:" + cp.x + ", " + cp.y + ")不在簽核框#" + y + "(ID:" + sa.id + ")範圍(" + sa.left + "," + sa.top + "," + sa.right + "," + sa.bottom + ")內");
														}
														else
															theLogger.log("\t" + p.signObjs[x].type + "(ID:" + p.signObjs[x].id + ")不在簽核框#" + y + "(ID:" + sa.id + ")範圍(" + sa.left + "," + sa.top + "," + sa.right + "," + sa.bottom + ")內");

														// 1081023 Raymond 1080877 因匯出頁數與簽核當時瀏覽器(IE)呈現頁數不一致, 導致簽核物件蓋的top位置出現差異而被判定成框外不保留顯示, 補由XSignObjs.xml記錄檔判斷是否原本為框內簽核物件, 若是則加上簽核框資訊並保留顯示
														var xsos = _xSignFolder.findSignObjById(p.signObjs[x].id);	// findSignObjById回傳的是陣列
														if(xsos.length > 0) {
															var recovered = false;	// 1100917 Raymond 1101028 修正從XSignObjs.xml修復為框內物件後, 未break y-loop, 導致此物件在歷史檢視頁面相同位置重複出現2次的問題
															for(var zi=0; zi<xsos.length; zi++) {
																var xso = xsos[zi];
																if(!!xso && xso.type == "A" && toSAType(xso.saType) == toSAType(sa.type) && xso.saID == sa.id) {	// 外部簽核記錄檔中只要判斷框內(Type:A)的簽核物件, 因為保留簽核物件功能僅能保留框內物件
																	theLogger.warn("\t在XSignObjs.xml外部簽核記錄檔中找到(ID:" + p.signObjs[x].id + ")簽核物件, 且記錄為框內物件, 進一步檢核是否為對應正確版本的頁面...");
																	if(xso.parent.id == prevRevDraftId) {	// 文稿版本相符
																		var matchPageId = false, xsaPgId = undefined;
																		for(var z=0; z<xso.parent.xSignAreas.length; z++) {
																			if(xso.parent.xSignAreas[z].saType == xso.saType && xso.parent.xSignAreas[z].saID == xso.saID) {	// 簽核區域相符
																				xsaPgId = xso.parent.xSignAreas[z].pgId;
																				matchPageId = (xso.parent.xSignAreas[z].pgId == p.id);	// 與封裝檔比對是否為相同頁面
																				break;	// 理論上同一筆文稿不應有重複類型及ID的簽核區域, 那會使重新載入時應將簽核物件貼在哪一個區域的行為產生混亂
																			}
																		}
																		if(matchPageId) {
																			if("offset" in xso && !!xso.offset) {
																				p.signObjs[x].saType = sa.type;
																				p.signObjs[x].saID = sa.id;
																				p.signObjs[x].offset = xso.offset;
																				theLogger.log("\t\t文稿版本及頁面等條件符合, 修復此簽核物件為框內物件, 並保留顯示 - offset:" + p.signObjs[x].offset.x + "," + p.signObjs[x].offset.y + " saType:" + p.signObjs[x].saType + " saID:" + p.signObjs[x].saID);
																				// 1130826 Raymond 中榮序214 修正歷史檢視時, 保留顯示的簽核物件沒有從舊到新排序, 導致需要重疊顯示(ex.貼布)的物件未遮住下面物件的問題
																				//si.drafts[i].draftPages.reservedSO.push(p.signObjs[x]);
																				si.drafts[i].draftPages.reservedSO.splice(0 + x, 0, p.signObjs[x]);	// 從0開始插入這個前版本的簽核物件, 1插入這個前版本的第2個簽核物件, 以此類推
																				reserved = true;
																				recovered = true;	// 1100917 Raymond 1101028 修正從XSignObjs.xml修復為框內物件後, 未break y-loop, 導致此物件在歷史檢視頁面相同位置重複出現2次的問題
																				break;	// zi - loop
																			}
																			else
																				theLogger.error("\t\t外部簽核記錄檔未記錄offset-x、offset-y屬性, 無法修復為框內物件");
																		}
																		else if(!!xsaPgId)
																			theLogger.error("\t\t簽核物件所屬頁面(ID:" + p.id + ")與外部簽核記錄檔記錄的頁面(ID:" + xsaPgId + ")不相符, 無法修復為框內物件");
																		else
																			theLogger.error("\t\t外部簽核記錄檔未記錄相符的簽核區域(sa-type:" + xso.saType + "sa-id:" + xso.saID + "), 無法修復為框內物件");
																	}
																	else
																		theLogger.error("\t\t外部簽核記錄檔記錄文稿版本(" + xso.parent.id + ")與封裝檔的歷史文稿ID(" + prevRevDraftId + ")不相符, 無法修復為框內物件");
																}
															}
															// 1100917 Raymond 1101028 修正從XSignObjs.xml修復為框內物件後, 未break y-loop, 導致此物件在歷史檢視頁面相同位置重複出現2次的問題
															if(recovered)
																break;	// y-loop
														}
														else
															theLogger.warn("\t\t外部簽核記錄檔中找不到任何ID為(" + p.signObjs[x].id + ")的簽核物件記錄");
													}
												}
												// 1060808 Raymond 1060579 新增簽核物件不在區域內的資訊
												if(!reserved)
													theLogger.warn("\t" + p.signObjs[x].type + "(ID:" + p.signObjs[x].id + ")不在任何簽核框範圍內, 不保留");
											}
										}
									}
									else
										theLogger.warn("AOLProcessData.xml中找不到'文件夾識別碼'為" + p.id + "的'簽署頁面'");
									// 1060808 Raymond 1060579 reservedSO改到draftPages層, 因為前版本間須保留顯示的簽核物件可能需出現在目前版本的不同頁次
									//theLogger.log("文稿#" + i + "頁#" + k + "(ID:" + si.drafts[i].draftPages.pages[k].id + ")保留簽核物件:", si.drafts[i].draftPages.pages[k].reservedSO);
									theLogger.log("文稿#" + i + "頁#" + k + "(ID:" + si.drafts[i].draftPages.pages[k].id + ")保留簽核物件:", si.drafts[i].draftPages.reservedSO);
								}
								else {	// 2015.12.22 前版本頁次超過當前版本則將偵測到的保留物件移到當前版本的簽核區域的所在頁次
									theLogger.log("前版本文稿(ID:" + prevRevDraft.id + ")頁次(" + (k+1) + ")超過當前版本文稿的總頁數(" + si.drafts[i].draftPages.pages.length + "), 偵測簽核物件若保留顯示則移至簽核區域所在的第" + (poSA+1) + "頁次");
									var p = prevRevDraft.draftPages.pages[k];
									// 1060803 Raymond 1060579 reservedSO改到draftPages層, 因為前版本間須保留顯示的簽核物件可能需出現在目前版本的不同頁次
									//if(!("reservedSO" in si.drafts[i].draftPages.pages[poSA]))	// 當前版本簽核區域的所在頁次若無保留物件則新增
									//	si.drafts[i].draftPages.pages[poSA].reservedSO = new Array();
									
									// 在前版本下找相同page id有無簽核區域資訊
									var $nl2 = $(prevRevNodes[j]).find("簽署頁面").filter(function(idx, elm) {	// 2016.10.5 FIX
											if($(elm).find("文件夾識別碼").text() == p.id)
												return true;
										});
									if($nl2.length > 0) {
										var $nd2 = $nl2.eq(0);
										var $nl3 = $nd2.find("簽核區域");
										if($nl3.length == 0)
											theLogger.log("此簽署頁面(文件夾識別碼:" + p.id + ")不含簽核區域");
										else {
											for(var x=0; x<p.signObjs.length; x++) {	// 偵測此頁的簽核物件是否在簽核區域內
												theLogger.log("偵測簽核物件(ID:" + p.signObjs[x].id + ")是否保留...");
												
												var reserved = false;	// 1060808 Raymond 1060579 簽核物件已保留旗標
												for(var y=0; y<$nl3.length; y++) {	// 取出同一頁記錄於AOLProcessData.xml的簽核區域資訊, 2017.1.11 修正有複數簽核區域時的判定
													var $saNode = $nl3.eq(y);
													var sa = {
														type: $saNode.attr("類型"),
														id: $saNode.attr("代碼"),
														left: Number($saNode.attr("left")),
														top: Number($saNode.attr("top")),
														right: Number($saNode.attr("right")),
														bottom: Number($saNode.attr("bottom"))
													};
													
													// 2016.10.5 FIX, 算中心點在框內
													if(("area" in p.signObjs[x].content &&
														((parseInt(p.signObjs[x].content.area.left) + parseInt(p.signObjs[x].content.area.right)) / 2) >= sa.left &&
														((parseInt(p.signObjs[x].content.area.top) + parseInt(p.signObjs[x].content.area.bottom)) / 2) >= sa.top &&
														((parseInt(p.signObjs[x].content.area.left) + parseInt(p.signObjs[x].content.area.right)) / 2) <= sa.right &&
														((parseInt(p.signObjs[x].content.area.top) + parseInt(p.signObjs[x].content.area.bottom)) / 2) <= sa.bottom) ||
													   ("pos" in p.signObjs[x].content && detectTextSignObjInArea(p.signObjs[x], sa))	//2017.1.4 文字意見另外偵測
														/*p.signObjs[x].content.pos.x >= sa.left &&
														p.signObjs[x].content.pos.y >= sa.top &&
														p.signObjs[x].content.pos.x <= sa.right &&
														p.signObjs[x].content.pos.y <= sa.bottom)*/) {	// 2015.5.28 修正pos用x,y不是left,top
														
														theLogger.log("\t" + p.signObjs[x].type + "(ID:" + p.signObjs[x].id + ")在簽核框(#" + y + ")範圍內, 保留顯示");
														
														// 計算位於簽核框內的相對位置, 2015.5.28 修正章戳圖檔用area, 文字意見用pos
														if("area" in p.signObjs[x].content) {
															p.signObjs[x].offset = {
																x: p.signObjs[x].content.area.left - sa.left,
																y: p.signObjs[x].content.area.top - sa.top
															};
														}
														else {
															p.signObjs[x].offset = {
																x: p.signObjs[x].content.pos.x - sa.left,
																y: p.signObjs[x].content.pos.y - sa.top
															};
														}
														p.signObjs[x].saType = sa.type;
														p.signObjs[x].saID = sa.id;
														
														theLogger.log("\toffset:" + p.signObjs[x].offset.x + "," + p.signObjs[x].offset.y + " saType:" + p.signObjs[x].saType + " saID:" + p.signObjs[x].saID);
														
														/* 2016.2.25 貼式顯示旗標改至最下方獨立檢查, 與是否保留簽核物件的判定無關
														// 2015.5.28 保留簽核物件從AOLProcessData.xml中取回貼式顯示旗標
														var nl4 = apdDoc.evaluate("//簽核物件[@Id='" + p.signObjs[x].id + "']", apdDoc, null, 7, null);
														if(nl4.snapshotLength > 0) {
															var soNode = nl4.snapshotItem(0);
															if($(soNode).attr("貼式意見") == "Y")
																p.signObjs[x].asIcon = true;
														}*/
														
														// 1130826 Raymond 中榮序214 修正歷史檢視時, 保留顯示的簽核物件沒有從舊到新排序, 導致需要重疊顯示(ex.貼布)的物件未遮住下面物件的問題
														// 1060803 Raymond 1060579 reservedSO改到draftPages層, 因為前版本間須保留顯示的簽核物件可能需出現在目前版本的不同頁次
														//si.drafts[i].draftPages.pages[poSA].reservedSO.push(p.signObjs[x]);	// 將保留物件加至當前版本簽核區域所在頁次
														//si.drafts[i].draftPages.reservedSO.push(p.signObjs[x]);	// 將保留物件加至當前版本簽核區域所在頁次
														si.drafts[i].draftPages.reservedSO.splice(0 + x, 0, p.signObjs[x]);	// 從0開始插入這個前版本的簽核物件, 1插入這個前版本的第2個簽核物件, 以此類推
														reserved = true;
														break;	// 2017.1.11 break for-loop
													}
													else {	// 1060808 Raymond 1060579 新增不在區域內的詳細資訊
														//theLogger.log("\t" + p.signObjs[x].type + "(ID:" + p.signObjs[x].id + ")不在簽核框(#" + y + ")範圍內, 不保留");
														if("area" in p.signObjs[x].content) {
															var cp={x: (parseInt(p.signObjs[x].content.area.left) + parseInt(p.signObjs[x].content.area.right)) / 2,
																	y: (parseInt(p.signObjs[x].content.area.top) + parseInt(p.signObjs[x].content.area.bottom)) / 2};
															theLogger.log("\t" + p.signObjs[x].type + "(ID:" + p.signObjs[x].id + ", 中心點:" + cp.x + ", " + cp.y + ")不在簽核框#" + y + "(ID:" + sa.id + ")範圍內, 不保留");
														}
														else
															theLogger.log("\t" + p.signObjs[x].type + "(ID:" + p.signObjs[x].id + ")不在簽核框#" + y + "(ID:" + sa.id + ")範圍內, 不保留");
													}
												}
												// 1060808 Raymond 1060579 新增簽核物件不在區域內的資訊
												if(!reserved)
													theLogger.warn("\t" + p.signObjs[x].type + "(ID:" + p.signObjs[x].id + ")不在任何簽核框範圍內, 不保留");
											}
										}
									}
									else
										theLogger.warn("AOLProcessData.xml中找不到'文件夾識別碼'為" + p.id + "的'簽署頁面'");
									// 1060808 Raymond 1060579 reservedSO改到draftPages層, 因為前版本間須保留顯示的簽核物件可能需出現在目前版本的不同頁次
									//theLogger.log("文稿#" + i + "頁#" + k + "(ID:" + si.drafts[i].draftPages.pages[k].id + ")保留簽核物件:", si.drafts[i].draftPages.pages[k].reservedSO);
									theLogger.log("文稿#" + i + "頁#" + poSA + "(ID:" + si.drafts[i].draftPages.pages[poSA].id + ")保留簽核物件:", si.drafts[i].draftPages.reservedSO);
								}
							}
							
							// 2015.11.18 FIX, 在pages迴圈中判斷是否保留會發生第一頁就break, 若簽核區域在第二頁以後就會判斷不到, 導致不會顯示第二頁的保留章戳
							preserveSO = $(prevRevNodes[j]).attr("保留簽署意見");
							if(preserveSO != "true") {	// 前版本文稿的簽核物件不保留
								theLogger.log("前版本文稿(ID:" + prevRevDraft.id + ")不保留之前流程點的簽核物件");
								break;
							}
						}
					}
					else
						theLogger.log("\t目前版本文稿(ID:" + si.drafts[i].id + ")不保留之前流程點的簽核物件");
				}
				else
					theLogger.warn("AOLProcessData.xml中找不到'文件夾識別碼'為" + si.drafts[i].id + "的'版本', 可能是來文簽辦或行動版新增的文稿!?");
				
				// 2016.2.25 新增從AOLProccessData.xml取回簽核物件是否以圖示顯示的flag
				for(var k=0; k<si.drafts[i].draftPages.pages.length; k++) {
					var p = si.drafts[i].draftPages.pages[k];
					for(var x=0; x<p.signObjs.length; x++) {	// 偵測此頁的簽核物件是否在簽核區域內
						// 簽核物件從AOLProcessData.xml中取回貼式顯示旗標
						var $nl4 = $apd.find("簽核物件[Id='" + p.signObjs[x].id + "']");
						if($nl4.length > 0) {
							var $soNode = $nl4.eq(0);
							if($soNode.attr("貼式意見") == "Y")
								p.signObjs[x].asIcon = true;
						}
					}
				}
				if("attachs" in si.drafts[i]) {	// 2016.3.25 FIX, 判斷attachs是否存在
					for(var m=0; m<si.drafts[i].attachs.length; m++) {	// 新增附件頁面也要巡
						if("draftPages" in si.drafts[i].attachs[m] && "pages" in si.drafts[i].attachs[m].draftPages) {	// 2016.2.26 fix, 附件可能不匯出頁面, 2016.3.25 FIX, 判斷pages是否存在
							for(var n=0; n<si.drafts[i].attachs[m].draftPages.pages.length; n++) {
								var p = si.drafts[i].attachs[m].draftPages.pages[n];
								for(var x=0; x<p.signObjs.length; x++) {	// 偵測此頁的簽核物件是否在簽核區域內
									// 簽核物件從AOLProcessData.xml中取回貼式顯示旗標
									var $nl4 = $apd.find("簽核物件[Id='" + p.signObjs[x].id + "']");
									if($nl4.length > 0) {
										var $soNode = $nl4.eq(0);
										if($soNode.attr("貼式意見") == "Y")
											p.signObjs[x].asIcon = true;
									}
								}
							}
						}
						else
							theLogger.warn("附件#" + m + "無頁面, 應是不匯出附件頁面之公文!");
					}
				}
			}
		}
		theLogger.log("***END OF 偵測保留物件***");
		//}
		//catch(e) {
		//	theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
		//}
		},
		// 2016.8.9 新增支援歷史檢視功能
		getRevisions: function() {		// 取得所有流程點
			return _revs;
		},
		getCurrRevision: function() {	// 取得目前檢視流程點
			return _currRev;
		},
		setCurrRevision: function(rev) {// 設定目前檢視流程點
			var exists = false;
			for(nm in _revs) {
				if(exists = (nm == rev))
					break;
			}
			if(exists)
				_currRev = rev;
			else
				throw new Error("指定流程點'" + rev + "'不存在!");
		},
		getDraftCountsExcludeFromDoc: function() {    // 2016.8.31 取得除了'來文文件夾'及'來文簽辦'的文稿數
			// 2016.7.13 創稿無_revs
			if(_currRev == "")
				return 0;
			var res = 0;
			var snfo = _revs[_currRev].obj.signInfo;
			if(snfo.drafts.length > 0) {
				for(var i=0; i<snfo.drafts.length; i++) {
					if(snfo.drafts[i].name != "來文簽辦")
						res ++;
				}
			}
			return res;
		},
		calcQuantity: function() {	// 2016.9.5 新增計算數量
			// 創稿無_revs
			if(_currRev == "")
				return 0;
			var res = 0;
			var snfo = _revs[_currRev].obj.signInfo;
			for(var i=0; i<snfo.drafts.length; i++) {
				// 1090205 Raymond 1090067 修正來文簽辦頁數重複計入的問題
				if(snfo.drafts[i].name == "來文簽辦")
					continue;
				res += snfo.drafts[i].draftPages.pages.length;
				if("attachs" in snfo.drafts[i]) {
					for(var j=0; j<snfo.drafts[i].attachs.length; j++) {
						if("draftPages" in snfo.drafts[i].attachs[j])
							res += snfo.drafts[i].attachs[j].draftPages.pages.length;
					}
				}
			}
			if("fromFolder" in snfo) {
				res += snfo.fromFolder.fromDoc.pages.length;
				// 1070110 Raymond NCKU107067 修正加上來文附件的頁數
				if("attachs" in snfo.fromFolder.fromDoc) {
					for(var i=0; i<snfo.fromFolder.fromDoc.attachs.length; i++) {
						if("draftPages" in snfo.fromFolder.fromDoc.attachs[i])
							res += snfo.fromFolder.fromDoc.attachs[i].draftPages.pages.length;
					}
				}
			}
			return res;
		},
		// 2016.10.7 FIX, 取流程點使用者資訊
		// 2016.10.12 新增format參數, undefined:簽核物件的tooltip格式, 1:列印簽核物件頁的格式
		// 2017.3.14 新增2:列印貼式文字意見頁的格式
		getFlowUserInfo: function(flowId, format) {
			if(typeof flowId === "string" && flowId.length > 0) {
				if(flowId in _revs) {
					var rev = _revs[flowId];
					if(format == 1) {
						// 1110207 Raymond 1110013 修正列印簽核物件頁時, 姓名後不顯示帳號
						//return rev.obj.changeInfo.charger.ou + " " + rev.obj.changeInfo.charger.title + " " + rev.obj.changeInfo.charger.name + "(" + rev.obj.changeInfo.charger.userId + ")";
						return rev.obj.changeInfo.charger.ou + " " + rev.obj.changeInfo.charger.title + " " + rev.obj.changeInfo.charger.name;
					}
					else if(format == 2) {
						return rev.obj.changeInfo.charger;
					}
					return "職稱：" + rev.obj.changeInfo.charger.title + "\n" +
					"角色：" + rev.obj.changeInfo.charger.role + "\n" +
					"姓名：" + rev.obj.changeInfo.charger.name;
				}
			}
			return "";
		},
		// 2016.10.4 刪除文稿(線上簽核)
		delDraft: function(index) {
			theLogger.log("delDraft(" + index + ")");
			var snfo = _revs[_currRev].obj.signInfo;
			if(index >= 0 && index < snfo.drafts.length) {
				theLogger.warn("刪除封裝檔的文稿(索引值:" + index + ")成功");
				snfo.drafts.splice(index, 1);
			}
			else
				theLogger.error("指定索引值超出範圍, 無法刪除文稿(封裝檔)");
		},
		// 2016.10.21 調整稿序, 2016.11.18 新增cbRename參數以支援更名稿序功能
		adjustOrder: function(param, cbRename) {
			theLogger.log("adjustOrder()");
			theLogger.log(param);
			var snfo = _revs[_currRev].obj.signInfo;
			var tmp = [];
			for(var i=0; i<snfo.drafts.length; i++) {
				tmp[i] = snfo.drafts[i];
			}
			snfo.drafts.length = 0;	// clear current list
			for(var i=0; i<param.length; i++) {
				// 2016.11.18 新增支援更名
				if("rename" in param[i] && typeof param[i].rename === "string") {
					if(param[i].rename.length)
						theLogger.log(i + ": origIdx:" + param[i].origIdx + " '" + param[i].name + "'更名為'" + param[i].rename + "'");
					else
						theLogger.warn(i + ": origIdx:" + param[i].origIdx + " '" + param[i].name + "', 指定更名為空字串, 故不更名");
				}
				else
					theLogger.log(i + ": origIdx:" + param[i].origIdx + " '" + param[i].name + "'");
				
				snfo.drafts.push(tmp[param[i].origIdx]);
				// 1070511 Raymond 1070547 由於會辦主辦允許調稿序的項目不同, param數量小於原本的文稿數, 調完後要再加回來
				tmp[param[i].origIdx] = null;
				
				// 2016.11.18 新增支援更名
				if("rename" in param[i] && typeof param[i].rename === "string" && param[i].rename.length) {
					snfo.drafts[snfo.drafts.length - 1].name = param[i].rename;
					if(cbRename && $.isFunction(cbRename))
						cbRename(snfo.drafts[snfo.drafts.length - 1]);
				}
			}
			// 1070511 Raymond 1070547 由於會辦主辦允許調稿序的項目不同, param數量小於原本的文稿數, 調完後要再加回來, 可取代1060876的修正
			if(param.length < tmp.length) {
				for(var i=0; i<tmp.length; i++) {
					if(tmp[i] != null) {
						if(_fm.isConUnit())	// 會辦公文
							snfo.drafts.splice(i, 0, tmp[i]);	// 用插入的才能在會辦公文時將主辦或先會單位的文稿加回去
						else
							snfo.drafts.push(tmp[i]);
					}
				}
			}
			// 1060922 Raymond 1060876 調整稿序不含來文簽辦, 故最後要再加回來
			//if(param.length < tmp.length && tmp[tmp.length - 1].name == "來文簽辦")
			//	snfo.drafts.push(tmp[tmp.length - 1]);
		},
		// 2016.10.21 載入SignWork.xml時依其記錄的順序恢復稿序
		reorder: function(param) {
			theLogger.log("reorder()");
			theLogger.log(param);
			var snfo = _revs[_currRev].obj.signInfo;
			var tmp = [];
			for(var i=0; i<snfo.drafts.length; i++) {
				tmp[i] = snfo.drafts[i];
			}
			snfo.drafts.length = 0;	// clear current list
			for(var i=0; i<param.length; i++) {
				var d = undefined;
				for(var j=0; j<tmp.length; j++) {
					// 1060922 Raymond 1060876 修復已將來文簽辦暫存為第1個的案例
					//if(tmp[j].id == param[i].id) {
					if(tmp[j].id == param[i].id && tmp[j].name != "來文簽辦") {
						d = tmp[j];
						tmp.splice(j, 1);
						break;
					}
				}
				if(d) {
					theLogger.log(i + ": id:" + d.id + ", name:" + d.name);
					snfo.drafts.push(d);
				}
				else
					theLogger.error(i + ": id:" + param[i].id + ", 找不到!");
			}
			if(tmp.length) {
				theLogger.error("未提供reorder順序的文稿, 最後一併append在後面");
				for(var i=0; i<tmp.length; i++)
					snfo.drafts.push(tmp[i]);
			}
		},
		// 2016.11.11 判斷簽核流程的退文屬性, 若不存在則表示不是退文
		isReturnDoc: function() {
			theLogger.log("isReturnDoc()");
			var cnfo = _revs[_currRev].obj.changeInfo;
			if("returnDoc" in cnfo)
				return cnfo.returnDoc == "Y";
			return false;
		},
		// 2016.12.7	Leslie	附件移動儲存後，應更新指向檔名以避免重覆執行搬移
		reSetAttachRefFileName: function(idx, guid, newFileName){	//2016.12.13	Leslie	改用id去對應，i→id	//2017.2.17	Leslie	改用guid去比對,id → guid
			var snfo = _revs[_currRev].obj.signInfo;
			if(idx >= 0 && idx < snfo.drafts.length) {
				var draft = snfo.drafts[idx];
				//2016.12.13	Leslie	改用id去對應
				var bHasAtt = false;
				for(var i=0,iMax=draft.attachs.length;i<iMax;i++){
					if(draft.attachs[i].guid == guid){	//2017.2.17	Leslie	改用guid去比對,id → guid
						draft.attachs[i].fileRef.name = newFileName;
						bHasAtt = true;
					}
				}
				
				if(!bHasAtt)
					throw new Error("指定文稿'" + idx + "'之附件改用guid'" + 改用guid + "'不存在");	//2017.2.17	Leslie	改用guid
			}
		},
		// 2017.1.16 搜尋所有流程點定義中的文稿ID功能改成開放函式
		findDraftByIdAllRev: function(id) {
			return _findDraftByIdAllRev(id);
		},
		// 2017.3.3 新增更新_lastid方法, 新增附件及匯出附件頁面都是用_lastid編ID, 若從SignWork.xml讀回上次儲存的已新增附件/附件頁面, 再新增附件, _lastid不更新的話, 會導致新增的附件重複使用1開始的ID
		updateLastId: function(id) {
			if(SSOUtil.typeOf(id) == "string") {
				// 1070608 Raymond 1070197 分會單位新增的附件及附件頁面ID為%msgid%-%sn%, 比對ID大小要去掉%msgid%部分
				if(id.indexOf("-") > 0)
					_lastid = Math.max(_lastid, Number(id.substr(id.indexOf("-") + 1)));
				else
					_lastid = Math.max(_lastid, Number(id));
				theLogger.log("_lastid更新為" + _lastid);
			}
			else if(SSOUtil.typeOf(id) == "number") {
				_lastid = Math.max(_lastid, id);
				theLogger.log("_lastid更新為" + _lastid);
			}
			else {
				theLogger.error("updateLastId(" + id + ") 參數不合法");
			}
		},
		// 2017.4.12 新增從SignWork.xml暫存檔載入後, 重新以原始檔序號建立檔案參照的功能
		restoreAttFileRef: function(attachment) {
			var snfo = _revs[_currRev].obj.signInfo;
			if("fileSN" in attachment) {
				theLogger.warn("搜尋原始檔序號為'" + attachment.fileSN + "'的附件檔案參照");
				attachment.fileRef = getFileInfo(snfo.files, attachment.fileSN);//附件參照檔案
				if(!attachment.fileRef)
					theLogger.error("找不到原始檔序號為'" + attachment.fileSN + "'的附件檔案參照");
				else
					theLogger.warn("找到附件檔案參照:'" + attachment.fileRef.name + "'");
				
				if(attachment.id in _objids)
					theLogger.warn("附件ID'" + attachment.id + "'重複!");
				else {
					_objids[attachment.id] = attachment;
					// 1070608 Raymond 1070197 分會單位新增的附件ID為%msgid%-%sn%, 比對ID大小要去掉%msgid%部分
					if(typeof attachment.id === "string" && attachment.id.indexOf("-") > 0)
						_lastid = Math.max(_lastid, Number(attachment.id.substr(attachment.id.indexOf("-") + 1)));
					else
						_lastid = Math.max(_lastid, Number(attachment.id));
				}
			}
			if(attachment.draftPages) {
				$.each(attachment.draftPages.pages, function(k, page) {
					if("fileSN" in page) {
						theLogger.warn("搜尋原始檔序號為'" + page.fileSN + "'的附件(頁面)檔案參照");
						page.fileRef = getFileInfo(snfo.files, page.fileSN);    // (附件)頁面參照檔案
						if(!page.fileRef)
							theLogger.error("找不到原始檔序號為'" + page.fileSN + "'的附件(頁面)檔案參照");
						else
							theLogger.warn("找到附件(頁面)檔案參照:'" + page.fileRef.name + "'");
						page.po = k;    // (附件)頁面頁次
						
						if(page.id in _objids)
							theLogger.warn("頁面ID'" + page.id + "'重複!");
						else {
							_objids[page.id] = page;
							// 1070608 Raymond 1070197 分會單位新增的附件頁面ID為%msgid%-%sn%, 比對ID大小要去掉%msgid%部分
							if(typeof page.id === "string" && page.id.indexOf("-") > 0)
								_lastid = Math.max(_lastid, Number(page.id.substr(page.id.indexOf("-") + 1)));
							else
								_lastid = Math.max(_lastid, Number(page.id));
							_pages.push(page);
						}
					}
				});
			}
			else
				theLogger.warn("附件無對應頁面! 可能是附件不匯出頁面的公文");	// 2015.11.20 增加文字描述
			
		},
		// 1061003 Raymond 1060989 修正從暫存檔讀回的附件頁面無法新增簽核物件的問題
		restoreAtt: function(attInfo, draft) {
			// 1090911 Raymond 1090564 信保特殊模式下異動(抽換)文稿時, 從暫存檔恢復附件要增加第3參數snfo
			if(_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
				return new Attach(attInfo, draft, _revs[_currRev].obj.signInfo);
			return new Attach(attInfo, draft);
		},
		restoreAttPage: function(att, po) {
			// 1090911 Raymond 1090564 信保特殊模式下異動(抽換)文稿時, 從暫存檔恢復附件頁面要增加第1參數page及第4參數snfo
			if(_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
				if(arguments.length < 3)
					throw new Error("[信保特殊模式]restoreAttPage()缺少第3參數");
				return new DraftPage(arguments[2], att, po, _revs[_currRev].obj.signInfo);
			}
			return new DraftPage(att, po);
		},
		// 1061012 Raymond 1060962+1060948+1060989 異動撤消後刪除附件會發生錯誤, 須復原到傳送前文稿已匯出的附件頁面的狀態, 故另存在Forbidden簽核點定義
		getForbiddenSignDef: function() {
			return _forbiddenSignDef;
		},
		// 1061013 Raymond 1060962+1060948+1060989 新增取得新id方法, 從異動撤消回推己異動的附件及附件頁面需要重新指定ID及更新_lastId, 以免後續新增附件之類的操作可能造成ID重複問題
		accquireNewId: function() {
			//console.log(_objids);
			return "" + (++_lastid);
		},
		// 1070111 Raymond 1060452 新增鐵工局秘書
		isSecretary: function() {
			return _isSecretary;
		},
		// 1070111 Raymond 1060452 新增鐵工局秘書直屬長官
		isSupervisor: function() {
			return _isSupervisor;
		},
		// 1100512 Raymond 1090821 指定流程點在封裝檔中是否記錄有單層式文稿頁面
		hasSingleLayerDraft: function(rev) {
			if(!!rev) {
				if(rev in _revs) {
					if(_revs[rev].refFlow.isExorgFlow)
						theLogger.log("指定的外機關流程點'" + rev + "'" + ((_revs[rev].hasSingleLayerDraft == true)?"含有":"不含") + "單層式文稿頁面");
					else
						theLogger.warn("指定的本機關流程點'" + rev + "'" + ((_revs[rev].hasSingleLayerDraft == true)?"含有":"不含") + "單層式文稿頁面(不應檢核本機關流程點是否含單層式文稿頁面!)");
					return _revs[rev].hasSingleLayerDraft == true;
				}
				else
					theLogger.error("指定的簽核點定義id:" + rev + "找不到, 無法判斷是否含有單層式文稿頁面");
			}
			return _hasSingleLayerDraft;
		},
		// 1100512 Raymond 1090821 指定流程點在封裝檔中是否為外呈會機關流程
		isExorgFlow: function(rev) {
			if(!!rev) {
				if(rev in _revs) {
					//theLogger.log("指定的簽核點定義id:'" + rev + "'為" + ((_revs[rev].refFlow.isExorgFlow == true)?"外":"本") + "機關流程點");
					return _revs[rev].refFlow.isExorgFlow == true;
				}
				//else
				//	theLogger.error("指定的簽核點定義id:" + rev + "找不到, 無法判斷是否為外機關流程點");
			}
			return false;
		},
		// 1100512 Raymond 1090821 使用AOLProcessData.xml的額外資訊補充外會公文的文稿頁面, 並從文稿清單中切割出來
		mapExorgPresentData: function(epd) {
			theLogger.log("AOLProccessData.xml記錄的單層式匯出頁面msgId:" + epd.msgId);
			var _exorgDraft = undefined;
			var _lastMyorgRev = undefined, _myorgRev = undefined;	// 1100521 Raymond 1090821 記錄下塞入外機關文稿的外機關流程點之前的最後本機關流程點, 若外機關流程點之後也有本機關流程點, 則此流程點的外機關文稿物件要移除
			for(rev in _revs) {
				if(_revs[rev].uri.toUpperCase() != "#" + epd.msgId) {
					if(!!_exorgDraft) {
						// 判斷是否為外機關流程, 理論上單層式匯出頁面應放在外機關流程的最後一個, 再後面的流程應為本機關流程
						var snfo = _revs[rev].obj.signInfo;
						for(var i=0; i<snfo.drafts.length; i++) {
							if(!snfo.drafts[i].draftPages) {	// 無<文稿頁面檔>的簽核點資訊即為外機關流程
								theLogger.error("流程點" + _revs[rev].uri + "在匯出單層式文稿頁面檔的流程點#" + epd.msgId + "後, 其文稿" + i + "(" + snfo.drafts[i].name + ")無文稿頁面檔, 為外機關流程?");
								_revs[rev].refFlow.isExorgFlow = true;	// 標記此為外機關流程
								_revs[rev].refFlow.refChangeInfo.comOrgNo = epd.comOrgNo;		// 註記外機關代碼於changeInfo異動資訊, 是否有可能有2個以上外機關?
								_revs[rev].refFlow.refChangeInfo.comOrgName = epd.comOrgName;	// 註記外機關名稱於changeInfo異動資訊
								break;
							}
						}
						if(!_revs[rev].refFlow.isExorgFlow) {
							theLogger.log("流程點" + _revs[rev].uri + "為單層式匯出頁面流程點之後的流程點, 直接引用#" + epd.msgId + "的單層式匯出頁面的外機關文稿");
							_revs[rev].obj.signInfo.exorgDraft = _exorgDraft;
							// 1100521 Raymond 1090821 歷史檢視時, 不需要重設目前流程點
							if(!_fm.isRefDoc()) {
								// 1100526 Raymond 1090821 修正外會本機關的公文看不到外機關文稿頁籤的問題
								// 1100521 Raymond 1090821 外機關流程點之後有本機關流程點, 就可以把外機關流程點之前的最後本機關流程點的外機關文稿物件移除
								//if(!!_lastMyorgRev && _lastMyorgRev in _revs) {
								if(!!_lastMyorgRev && _lastMyorgRev in _revs && _lastMyorgRev != rev) {
									if(!!_revs[_lastMyorgRev].obj.signInfo.exorgDraft)
										delete _revs[_lastMyorgRev].obj.signInfo.exorgDraft;
									_lastMyorgRev = undefined;	// 萬一如果有兩輪以上外機關流程
								}
								theLogger.log("將目前流程點(" + _myorgRev + ")重設為" + rev);
								_myorgRev = rev;	// 目前流程改為本機關流程
							}
						}
					}
					else {
						// 判斷是否為外機關流程
						var snfo = _revs[rev].obj.signInfo;
						for(var i=0; i<snfo.drafts.length; i++) {
							if(!snfo.drafts[i].draftPages) {	// 無<文稿頁面檔>的簽核點資訊即為外機關流程
								theLogger.log("流程點" + _revs[rev].uri + "的文稿" + i + "(" + snfo.drafts[i].name + ")無文稿頁面檔, 為外機關流程");
								_revs[rev].refFlow.isExorgFlow = true;	// 標記此為外機關流程
								_revs[rev].refFlow.refChangeInfo.comOrgNo = epd.comOrgNo;		// 註記外機關代碼於changeInfo異動資訊, 是否有可能有2個以上外機關?
								_revs[rev].refFlow.refChangeInfo.comOrgName = epd.comOrgName;	// 註記外機關名稱於changeInfo異動資訊
								break;
							}
						}
						if(!_revs[rev].refFlow.isExorgFlow) {
							// 1100521 Raymond 1090821 歷史檢視時, 不需要重設目前流程點
							if(!_fm.isRefDoc()) {
								theLogger.log("流程點" + _revs[rev].uri + "為本機關流程, 將目前流程點(" + _myorgRev + ")重設為" + rev);
								_myorgRev = rev;	// 目前流程改為本機關流程
							}
						}
					}
				}
				else {
					theLogger.log("流程點" + _revs[rev].uri + "符合單層式匯出頁面msgId, 處理頁面影像檔置換");
					var snfo = _revs[rev].obj.signInfo;
					for(var i=snfo.drafts.length-1; i>=0; i--) {
						if(snfo.drafts[i].draftPages.method == "單層式") {	// <文稿頁面檔>的記錄方式為"單層式"即為外機關流程
							_revs[rev].refFlow.isExorgFlow = true;	// 標記此為外機關流程
							_revs[rev].refFlow.refChangeInfo.comOrgNo = epd.comOrgNo;		// 註記外機關代碼於changeInfo異動資訊, 是否有可能有2個以上外機關?
							_revs[rev].refFlow.refChangeInfo.comOrgName = epd.comOrgName;	// 註記外機關名稱於changeInfo異動資訊
							// 從AOLProcessData.xml的EXORG_PRESENT_DATA中的PAGE_LIST頁面影像檔取出一一置換文稿頁面
							// 目前案例封裝檔只有一稿, 不知多稿時要如何與單一呈現檔如何對應
							for(var j=0; j<epd.pages.length; j++) {
								if(!!snfo.drafts[i].draftPages.pages[j])
									snfo.drafts[i].draftPages.pages[j].fileRef = {name: epd.pages[j].ImgFilename};	// 頁面影像用呈現檔轉出的頁面取代
								else
									snfo.drafts[i].draftPages.pages[j] = {
										flowId: snfo.drafts[i].draftPages.pages[0].flowId,	// 第2頁以後的"產生點資訊",
										fileSN: snfo.drafts[i].draftPages.pages[0].fileSN,	// "原始檔序號",
										sn: snfo.drafts[i].draftPages.pages[0].sn,			// "序號",
										time: snfo.drafts[i].draftPages.pages[0].time,		// "產生時間"從第1頁複製過來
										fileRef: {name: epd.pages[j].ImgFilename}			// 頁面影像才用呈現檔轉出的頁面取代
									};
							}
							if(!!snfo.exorgDraft) {	// 若已有前一筆(因倒序迴圈, 前一筆實為後面的文稿)外機關文稿, 將其附件合併到此筆, 再將外機關文稿重設為此筆
								if(!!snfo.exorgDraft.attachs) {
									theLogger.error("超過一筆外機關文稿, 將" + snfo.exorgDraft.name + "的附件合併至" + snfo.drafts[i].name + "下");
									if(!!snfo.drafts[i].attachs)
										Array.prototype.push.apply(snfo.drafts[i].attachs, snfo.exorgDraft.attachs);
									else
										snfo.drafts[i].attachs = snfo.exorgDraft.attachs;
								}
								else
									theLogger.error("超過一筆外機關文稿, " + snfo.exorgDraft.name + "無附件可合併至" + snfo.drafts[i].name + "下");
							}
							snfo.exorgDraft = snfo.drafts.splice(i, 1)[0];
							snfo.exorgDraft.msgId = epd.msgId;
							snfo.exorgDraft.comDocNo = epd.comDocNo;
							snfo.exorgDraft.comOrgNo = epd.comOrgNo;
							snfo.exorgDraft.comOrgName = epd.comOrgName;
							_exorgDraft = snfo.exorgDraft;	// keep for next all 本機關流程點
						}
						else
							theLogger.error("文稿" + i + "(" + snfo.drafts[i].name + ")的文稿頁面檔記錄方式(" + snfo.drafts[i].draftPages.method + ")非單層式, 無法處理頁面影像檔罝換");
					}
					if(rev == _myorgRev) {	// 若目前流程點為匯出單層式文稿頁面的外機關流程點
						// TODO: 文稿序號理論上已從外機關文稿的次筆編起, 但本機關送外會再退回的情形不知道如何
					}
					else if(!_fm.isRefDoc() && !!_myorgRev) {	// 1100521 Raymond 1090821 若是歷史檢視的參照公文, 不需要在外機關流程點之前的最後本機關流程點提供外機關文稿頁籤
					//else {	// 1100512 Raymond 1090821 若是本機關送外機關再回來的公文, 外機關的單層式文稿頁面額外加在前一個本機關流程點, 以提供顯示外機關單層式文稿頁面的頁籤
						theLogger.log("前一個本機關流程點" + _revs[_myorgRev].uri + "直接引用#" + epd.msgId + "的單層式匯出頁面的外機關文稿");
						_revs[_myorgRev].obj.signInfo.exorgDraft = _exorgDraft;
						// 1100521 Raymond 1090821 記錄下塞入外機關文稿的外機關流程點之前的最後本機關流程點, 若外機關流程點之後也有本機關流程點, 則此流程點的外機關文稿物件要移除
						_lastMyorgRev = _myorgRev;
					}
				}
			}
		},
		// 1100512 Raymond 1090821 判斷是否有外機關文稿
		hasExorgDraft: function() {
			var snfo = _revs[_currRev].obj.signInfo;
			return (snfo.exorgDraft !== undefined);
		},
		// 1100519 Raymond 1100298 新增取得封裝檔內簽核物件所對應的的簽核人員資訊
		getFlowCharger: function(flowId, field) {
			if(typeof flowId === "string" && flowId.length > 0) {
				if(flowId in _revs) {
					var rev = _revs[flowId];
					if(field == 1)	// 單位
						return rev.obj.changeInfo.charger.ou;
					else if(field == 2)	// 職稱
						return rev.obj.changeInfo.charger.title;
					else if(field == 3)	// 姓名
						return rev.obj.changeInfo.charger.name;
					else if(field == 4)	// 帳號
						return rev.obj.changeInfo.charger.userId;
					else if(field == 5)	// 角色
						return rev.obj.changeInfo.charger.role;
					return rev.obj.changeInfo.charger;
				}
			}
		},
		// 1100616 Raymond 1100552 新增依GUID查找文稿物件方法, 從讀入草稿SignWork.xml過程中呼叫, 以修正草稿有3稿件, 刪除第2件再調整稿序後, 文件夾識別碼因mapDrafts先自動命名NewDraft1、NewDraft2, 而與載入SignWork.xml中的NewDraft3、NewDraft1不一致, 造成已匯出附件頁面的附件頁籤未顯示的問題
		getDraftByGUID: function(guid) {
			var snfo = _revs[_currRev].obj.signInfo;
			for(var i=0; i<snfo.drafts.length; i++) {
				if(snfo.drafts[i].guid == guid)
					return snfo.drafts[i];
			}
			throw new Error("找不到指定GUID:'" + guid + "'之文稿物件");
		},
		// 1110617 Raymond 1110579 異動撤消或傳送失敗的流程點留下在封裝檔中的簽核物件另外存放在_forbiddenSignObjs
		getForbiddenSignObjs: function() {
			return _forbiddenSignObjs;
		},
		// 1120221 Raymond 1111225 新增記錄內部意見功能
		currInnerComment: function() {
			if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
				var d = _fm.getCurrDraftInfo();
				if(arguments.length > 0) {
					theLogger.log("設定'" + d.name + "'(guid:" + d.guid + ")內部意見為'" + arguments[0] + "'");
					d.innerComment = arguments[0];
					_xSignFolder.setInnerCmt(arguments[0], d.guid);
				}
				else
					return d.innerComment || "";
			}
			else {	// 未啟用功能則照舊邏輯
				if(arguments.length > 0) {
					theLogger.log("設定內部意見為'" + arguments[0] + "'");
					_innerComment = arguments[0];
					_xSignFolder.setInnerCmt(arguments[0]);
				}
				else
					return _innerComment;
			}
		},
		// 1140206 Raymond 1131137 合併CDC1110401, 新增取得指定簽核物件的分機資訊
		getSOTelExt: function(so) {
			var xsos = _xSignFolder.findSignObjById(so.id);	// 找所有文稿所有版本
			if(!!xsos && xsos.length > 0) {
				if(xsos.length > 1)
					theLogger.warn("外部簽核物件記錄檔中找到指定簽核物件(ID:" + so.id + ")的記錄超過一筆(有" + xsos.length + "筆), 固定以第一筆的記錄回傳分機資訊");
				return xsos[0].telExt;
			}
			else
				theLogger.error("外部簽核物件記錄檔中找不到指定簽核物件(ID:" + so.id + ")的記錄, 無法取得分機資訊");
			return "";
		}
	};
}

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-SignFolder.js").finish();
})();