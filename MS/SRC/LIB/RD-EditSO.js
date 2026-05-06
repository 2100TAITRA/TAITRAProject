// Sign objects
//   2015.12.15 - Raymond, 改用theLogger記錄LOG資訊
/*
DATE	MGRNO		SA		PG		Desc
1060420 1060156		Raymond	Raymond	修正so.content未載入影像資料時提供function讓載入成功後寫入, 避免出現方框或叉燒包
1060503	1060208		Leslie	Leslie	修正文字意見於圖示模式下編修文字內容，而造成的直式切字結果
1060503	1060225		Leslie	Leslie	修正來文與來文附件頁面，未啟用來文擬辦時，應仍提供影像轉向選單
1060511	-------		Raymond	Raymond	修正新增簽核物件時直接判定文別若是簽稿會核單, 一律視為簽核框外物件, 航港-序632
1060512	1050943		Raymond	Raymond	鐵改局新增簽核物件要自動對齊, SSO_CONFIG.js需設定_alignSignObj = true, 本功能才會生效
1060515	1060264		Raymond	Raymond	修正數位墨水物件會越存越短的問題
1060518	1060269		Raymond	Raymond	檢核目前追蹤修訂模式是否為完稿模式, 若不是的話, 提示訊息後, 切回完稿模式
1060601	1060264		Raymond	Raymond	修正選用章戳-圖檔已有大小資訊, 不要套用計算數位墨水大小的功能
1060609	1060212		Leslie	Leslie	新增鐵工客製化，補陳共用章戳相關邏輯
1060621	1060283		Raymond	Raymond	修改附件頁面旋轉功能及新增判斷是否為當流程點所匯出的附件頁面, 是則允許旋轉頁面
1060629	1060546		Raymond	Raymond	在檢視文字意見子視窗按確定時, 區別簽核物件對象是文字式選用章戳還是一般文字意見, 文字式選用章戳不要切字
1060710	-------		Raymond	Raymond	修正點擊選用章戳項目沒有hilight問題並修正章戳選單邊界為0、圓角改為直角(RD-OrgStampBox.html)
1060718	1060610、1060632	Raymond	1.修正職名章及數位墨水新增時, 抓影像大小計算出中心點後再判斷是否為簽核區域內物件(文字意見仍以左上角座標為判定依據),
									2.並新增是否位於簽核區域內屬性(配合RD-AOL.css提供簽核框內物件顯示綠框線，簽核框外物件顯示灰框線效果),
									3.修正圖示狀態下的數位墨水及文字意見由框外拉至框內或由框內拉至框外時, 相對座標未減去圖示置中的座標差問題
									4.修正貼式數位墨水編輯後未異動影像大小的問題
1060721	1060593		Raymond	Raymond	新增套用手寫筆設定的紅筆及螢光筆顏色、寬度
1060815	1060691		Raymond	Raymond	新增模式C、D模式下限制僅簽核區域內才可顯示指令列
1060824	1060749		Leslie	Leslie	修正來文附件於啟用來文擬辦時，不應被視為"非當流程點匯出的附件頁面"，仍應提供旋轉頁面功能
1060911	1060764		Raymond	Raymond	自動蓋職名章功能支援autoPress屬性設定的預設職名章功能
1061018	1060930		Raymond	Raymond	修正時戳顯示年時年超出職名章高度問題
1061026 1060908		Raymond	Raymond	若有異動文字意見的文字內容,則重新設定簽核意見為此次修改的內容
1061101	1061066		Raymond	Raymond	文別若是簽、便簽(可設定)則先檢查是否已核決, 已核決則一律僅蓋章不要連動核決狀態
1061113	1061068		Raymond	Raymond	來文附件不允許旋轉時, 提供假旋轉功能, 同時限制以假旋轉檢視的頁面不可加簽核物件, 已加簽核物件的頁面不可假旋轉檢視
1061124	1060892		Raymond	Raymond	鋼筆、紅筆等簽核物件點擊拖拉後寬高小於5視為誤點不要產生影像
1061124 1060753		Raymond	Raymond	鋼筆、紅筆、螢光筆在繪製當中時點擊翻頁或會觸發頁面重新整理的動作前, 自動新增簽核物件
1061127	1060691		Raymond	Raymond	修正模式D時, 簽稿會核單/會辦單因無簽核框導致無法顯示指令列問題
1061129	1061149		Raymond	Raymond	新增插入文字於下簽核工具功能
1061204	1060691		Raymond	Raymond	新增只有文稿不可編輯(會辦流程)時的模式D才要限制僅能在簽核框內叫出工具列, 來文內容或來文簽辦draftEditable都是undefined, 不符合此限制條件, 故模式C/D都可以在來文頁面上叫出工具列
1061212	1061197		Leslie	Leslie	先檢核完整顯示的文字意見物件是否有寬度，若否，則以原斷行內容重新計算後，再設定新斷行結果
1061213	1061195		Raymond	Raymond	加入文字式選用章戳時，先計算大小再算出中心點才能判斷是否位於簽核區域內
1061226	1061241		Raymond	Raymond	修正新增簽核物件時tooltip月份少1的問題
1070110	1060452		Raymond	Raymond 若先設定了簽辦意見, 則在蓋職名章時自動於前面新增文字意見圖示
1070327	1070136		Raymond	Raymond 修正支援不設定dir屬性的簽核區域即不自動對齊職名章
1070319	1070413		Raymond	Raymond	檢查環境變數, 設為Y才啟用簽辦意見窗格相關的自動新增文字意見圖示功能
1070504	1070447		Raymond	Raymond	修正在非100%原尺寸縮放率時儲存, 會誤判文字意見及數位墨水的絕對座標值不符並改為錯誤的絕對座標值問題
1071029	-------		Raymond	Raymond	修正分辦人員在分辦流程蓋章會導致蓋的章出現代字的問題
1071219	1071227		Raymond	Raymond	判斷OrgNickName為'NCHU'(中興)時, 代理人職名章的'代'字改成14pt大小
1071224	-------		Raymond	Raymond	修正職名章自動對齊位置隨顯示比例變化上下間距的問題
1080104	-------		Raymond	Raymond	隨選用章戳加蓋的職名章, 直接指定與選用章戳相同的簽核區域, 以免計算職名章中心點位置有可能落在簽核區域外導致章消失的問題
1080122	1080035		Raymond	Raymond	修正複製含刪除標記的主旨或段落條列文字時, 貼上後會出現標記已刪除的文字的問題
1080125	1071281		Raymond	Raymond	增加職名章自動對齊預設離簽核框距離
1080125	1080035		Raymond	Raymond	修正複製來源是同一行字時, 變成複製選取的字首到行尾問題
1080227	1070813		Raymond	Raymond	修正新增文字意見後文字內容長度不長, 但預設寬度很長, 拖拉到簽核框靠右方位置, 可能被判定中心點在框外, 而在傳送後再異動過內文後不會顯示的問題
1080418	1080053		Raymond	Raymond	選用章戳視窗新增加蓋代字選項功能
1080522	1080382		Raymond	Raymond	修正拖拉職名章連動代字在跨簽核區域時, 代字位置會跑到職名章頭, 造成重疊的問題
1080815	1080620		Raymond	Raymond	修正IE下選取範圍是英數與中文交界開始時, 全部過濾掉成空字串導致不會複製的問題
1080920	1080852		Raymond	Raymond	修正IE下編輯草稿或選取範圍不含追蹤修訂標籤時, 右鍵複製或Ctrl+C沒有複製內容的問題
1080923 1080339     Kevin   Eric    jQuery 3.0 upgrade
1081204	1080788		Raymond	Raymond	修正在縮放比小於100%時, 計算文字意見得出的寬度會比100%時計算得出的寬度小, 導致不正確折行的問題
1081213	1080785		Raymond	Raymond	合併內政部單號1070656, 新增判斷環境變數WE_ALLOW_CON_KEEP_SIGNOBJ若為Y則進行簽核區域內外的偵測, 以供在簽稿會核單內容異動後會保留顯示異動前所增簽核區域內的簽核物件
1081218	-------		Raymond	Raymond	修正文字意見的XSS漏洞, 若文字意見輸入<br>, 在傳送後會變折行字元, 因為傳送後文字意見與文字式選用章戳都用Stamp class顯示
1090109	1081145		Raymond	Raymond	修正計算單字寛度時新增識別\n字元來判斷行數, 及文字意見若末行寬度最大時, 仍以非末行最大寬度設定整個文字意見的寬度, 造成末行被折行的問題
1090312	1081105		Raymond	Raymond	新增加蓋職名章或選用章戳時, 判斷若ownRoleId符合環境變數AOL_RESET_SIGNET_POS_BY_ROLES設定, 自動移動職名章或選用章戳至目前點擊簽核區域的相對位置, 並修正點擊連動的職名章或選用章戳一或二次時, 被連動的代字章或職名章跑到簽核區域外的問題
1090424	1090305		Raymond	Raymond	修正數位墨水圖檔未載入影像資料時提供reload function讓(SignWork)下載成功後呼叫重新載入影像, 避免不顯示問題
1090506	1090340		Raymond	Raymond	修正瀏覽器(Chrome)顯示比例為非100%(或25%的倍數)時, 新增數位墨水簽核物件時會發生誤判寬高度, 造成數位墨水簽核物件的寬度變成整頁寬度, 高度下緣達到頁底, 導致其下區域無法加蓋其它簽核物件的問題
1090610	-------		Leslie	Leslie	[Merge_1090106]修正文字意見若是用兩行以上的文字式選用章戳加入的話, 可能有<br>導致計算最大行寬出現Error的問題
1090611	-------		Raymond	Raymond	修正在iPad下非100%縮放比時拖拉有代字的職名章, 代字會向左(縮放比小於100%)或向右(縮放比大於100%)位移的問題
1090715	1081105		Raymond	Raymond	新增判斷環境變數AOL_DISABLE_SIGNET_FOLLOWING_STAMP不是Y或1, 才設定選用章戳連動職名章
1091006	1090611		Raymond	Raymond	新增檢查環境變數AOL_DISABLE_SIGNCOMMENT_TEXTNOTE若設為Y時, 在簽辦意見窗格功能啟用時, 加蓋職名章不會自動產生貼式文字意見
1091014	1090564		Raymond	Raymond	新增判斷信保特殊模式下本文頁面是否為當流程點所匯出的頁面, 是則允許旋轉頁面
1091026	1090735		Raymond	Raymond	修正簽核區域在下邊界區時, 因計算簽核區域相對於頁面的座標錯誤, 導致拖拉簽核物件由外至內或由一簽核區域至另一簽核區域時會發生簽核物件跑到整個頁面之外的問題
1091106	1090777		Raymond	Raymond	新增環境變數AOL_TEXTNOTE_WITH_SIGNET可預設新增文字意見的加蓋職名章、時戳勾選狀態, 及記憶前次勾選狀態功能
1091231	信保序138	Raymond	Raymond	修正代理人蓋章的tooltip應顯示代理人姓名而非被代理人姓名
1100318	-------		Raymond	Raymond	調整簽核工具指令列按鈕名稱「選用章戳」為「章戳選用」, 與章戳選用子視窗(及一代AOL)一致
1100511	1100293		Raymond	Raymond	新增若啟用代為決行章功能(環境變數AOL_ENABLE_GRANT_APPROVE=Y)則在新增選用章戳時顯示「代為決行」選項, 勾選後在職名章下方加蓋系統設定之「代為決行」章
1100512	1090821		Raymond	Raymond	判斷若為外呈外會公文的文稿, 則不提供任何簽核工具功能
1100519	1100298		Raymond	Raymond	新增可「修改」會辦單位的他流程之文字意見功能, 及「放大」、「縮小」、「非粗體」自己新增或修改新增的文字意見或貼式文字意見功能
1100520	1050087		Raymond	Raymond	比照一代記憶選用章戳的職名章對齊方式選項, 改記憶在localStorage
1100621	1100482		Raymond	Raymond	修正保留簽稿會核單的簽核物件功能啟用時, 設定僅於簽核區域內顯示簽核工具列功能對簽稿會核單無效(簽核區域內外都顯示)的問題
1100708	1100648		Raymond	Raymond	配合支援分文稿記錄簽核意見功能修改, signComment->currSignComment
1100715	1100854		Raymond	Raymond	新增[高大客製化]簽核物件tooltip顯示到秒功能
1100917	1101028		Raymond	Raymond	修正新增簽核物件時偵測是否位於簽核區域範圍內的功能, 可能因座標有小數點導致職名章中心點計算成落在兩個相隣簽核區域中間的空白處會被判定成皆不屬於這兩個簽核區域, 而錯誤記錄成框外物件, 若後面流程點有異動內文的話會發生此職名章不會顯示的問題
1101005	聯大序223	Raymond	Raymond	修正新增文字意見時, 若環境變數AOL_TEXTOBJECT_FONT設定的size非字型大小下拉式選單的項目之一, 儲存時會轉圈圈的問題
1101008	-------		Raymond	Raymond	修正iPadOS 14/15加蓋職名章圖檔、文字意見、選用章戳後不會顯示的問題
1101119	1101228		Raymond	Raymond	新增文字式選用章戳也可使用拖拉邊框以調整寬度功能
1101217	1101574		Raymond	Raymond	新增螢光筆(直線)簽核工具
1101222	1101591		Raymond	Raymond	修正本別受文者點選第1次會發生Error, 點選第2次才正常的問題
1110408	1110092		Joe		Joe		增加共用章戳可用文別判斷
1110427	1110502		Raymond	Raymond	新增擴充1081105需求功能, 支援指定簽核框才生效自動移動章戳位置功能, 環境變數AOL_RESET_SIGNET_POS_BY_ROLES設定一組角色參數可設定4個值, 第1個是可選用的簽核框ID, 其次是原來的角色代碼, X相對位置, Y相對位置, 不需要指定簽核框才生效時, 只要設定簽核框ID除外的3個值
1110428	1110502		Raymond	Raymond	新增判斷環境變數AOL_ENABLE_RESET_TEXTNOTE_POS_BY_ROLES是否啟用文字意見也套用自動移動至目前點擊簽核區域的相對位置的功能
1110503	-------		Raymond	Raymond	修正在顯示比例1X0%時開啟公文, 蓋章在簽核框時自動對齊功能(SSO_CONFIG.alignSignObj=true)會把章移到徧右下的問題
1110513	1110538		Raymond	Raymond	新增文字意見子視窗新增「加蓋代字」選項及功能
1110516	考試院序90	Raymond	Raymond	修正在非100%縮放比情形下開啟公文後, 若簽核框位置位於非左上角, 使用選用章戳加蓋的職名章及代為決行章會位移(大於100%往左上移, 小於100%往右下移)的問題
1110613	1110092		Joe		Joe		修正信保特殊模式公文當作函稿，避免無稿件導致可用文別判斷異常
1110705	--			Joe		Joe		增加各機關特殊稿件處理，避免無文稿的情況下無法取得文別
1110907	1110985		Raymond	Raymond	修正在選用章戳子視窗的[職名章]清單中選取的章蓋在文稿上時會變成黑色的問題
1120406	銓敘部序198	Raymond	Raymond	環境變數AOL_ENABLE_STAMP_TO_SIGNCOMMENT啟用(設為'Y')時, 加蓋選用章戳時自動將文字式選用章戳的文字內容或影像檔式選用章戳的章戳名稱帶入簽辦意見, 加蓋選用章戳及文字意見自動帶入簽辦意見之功能再新增檢核若目前簽辦意見已有內容則詢問是否取代或累加
1120602	1120483		Raymond	Raymond	修正在第一行只有一個換行字元, 第二行才輸入其它字的文字意見, 傳送後在下一個流程點再傳送後, 第一個換行字元會消失, 導致歷史檢視中文字意見會上移的問題
1120616	1120283		Raymond	Raymond	修正以檢視文字式選用章戳方式修改文字內容後不會以目前寬度折行, 及翻頁或重新整理頁面後字型會變小的問題
1120620	標檢局序86	Raymond	Raymond	修正職名章高度設定小於7.7mm時, 時戳字型大小計算會得出小於9pt的大小, 但瀏覽器最小只能顯示9pt的字, 將導致時戳文字高於職名章的問題, 故再計算縮小行高來調整時戳文字的高度
1120823	1120562		Raymond	Raymond	新增在文字意見子視窗中按確定鈕時, 檢核文字意見是否有輸入內容, 若無內容則在文字方塊下方顯示警告文字, 文字方塊邊框閃爍, 並中止後續新增簽核物件的處理, 新增在選用章戳子視窗中按確定鈕時, 檢核選用章戳是否選取, 若無則在章戳清單下方顯示警告文字, 章戳清單邊框閃爍
1120901 1120709		Kevin	Leslie	弱掃修正Client DOM Stored XSS
1121030	1120950		Raymond	Raymond	修正文字意見帶入簽辦意見時, 判斷在啟用簽辦意見窗格功能(環境變數AOL_ENABLE_SIGNCOMMENT_PANEL設為'Y')情況下才詢問取代或累加, 否則恢復之前(銓敘部序198修改前)行為直接取代不詢問
1121110	1120881		Raymond	Raymond	新增偵測加蓋章戳的位置是否壓到簽核區域的下邊界, 是則增高簽核區域10mm
1121120	1120887		Raymond	Raymond	新增支援簽稿會核單的簽核區域自動增高功能
1121122	1121000		Raymond	Raymond	當停用代理公文自動加蓋代字功能(環境變數AOL_AUTOSIGN_PROXY_WORD設為"N"或未設定)時, 簽核工具列新增判斷機關暱稱不是"BSMI"(標檢局), 才顯示額外的附加「(代)」字的職名章按鈕(即標檢局不要顯示第三個附加了「(代)」字的職名章)
1130117	1120967		Leslie	Leslie	修改刪畫線高度與抓取行為，以避免用者點擊時無法出現正確的浮動選單
1130315	1130050		Raymond	Raymond	新增判斷環境變數「AOL_ENABLE_ERASER_TAPE」為"1"時, 啟用「貼布」簽核工具功能, 新增使用矩形選取操作UI決定新增貼布物件的大小及位置
1130417	1120881		Raymond	Raymond	新增偵測新增文字意見的位置是否壓到簽核區域的下邊界, 是則自動增高簽核區域, 增高幅度依文字意見高度計算, 以10mm為級距, ex.壓線超出簽核區域高度8mm時自動增高10mm, 超出13mm時自動增高20mm, 依此類推, 移動文字意見或調整文字意見寬度導致高度變化時, 也會判斷是否壓線自動增高, 但自動增高後不會因為移動或調矮到不壓線, 而使系統自動減少簽核區域高度, 這個行為與加蓋職名章時一致
1130424	1120881		Raymond	Raymond	新增啟用自動加蓋職名章或由左至右自動對齊功能時, 偵測加蓋的職名章是否壓線超出下邊框, 是則自動增高簽核區域, 若啟用由上至下自動對齊功能在手動加蓋職名章時, 計算應自動對齊的位置若壓線超出下邊框時, 不要換行, 而是自動增高簽核區域
1130705	中榮序139	Raymond	Raymond	修正在來文或附件上調整文字意見寬度時, 會發生Error的問題, 新增影像章戳的名稱, 以供刪除文字意見時重置簽辦意見時使用
1130710	1130637		Raymond	Raymond	新增檢核本流程點已儲存過的新增簽核物件, 在移動位置、改變字型大小、樣式、寬高及異動內容後設立簽核物件已異動旗標, 以供關閉公文時檢核是否有異動過的簽核物件未儲存的功能使用
1130729	領務局序8	Raymond	Raymond	新增加蓋選用章戳時, 基於文別或令/函類別分別記錄所選的章戳資訊(在來文頁面上蓋時, 比照"簽"), 再次加蓋選用章戳時, 從localStorage中讀取記憶的上次選取的選用章戳記錄, 預設選取為當前文別或令/函類別的上次選取的章戳
1130820	1130853		Raymond	Raymond	新增記憶加蓋代字選項功能, 代理時仍會預設勾選, 不管是否有前次取代勾選的記憶, 新增環境變數「AOL_USE_RED_PROXY_WORD」, 設為"Y"時, 改用紅色顯示代字
1130829	中榮序219	Raymond	Raymond	修正在簽稿會核單新增文字意見, 當文字意見內容很多超出簽核區域下緣時, 簽核區域只自動增高10mm(一個職名章高度), 而不是包含整個文字意見高度的增高幅度的問題
1130909	中榮序233	Raymond	Raymond	新增在修改文字意見後, 判斷機關暱稱是TVGH(中榮)時, 不要詢問取代或累加簽辦意見, 直接取代
1130927	中榮序237	Raymond	Raymond	文字意見放大、縮小或切換粗體、非粗體時, 重新依目前寬度切字, 以避免翻頁或再次載入時斷行位置與操作放大、縮小或切換粗體、非粗體時不同的問題
1131007	1130988		Raymond	Raymond	新增環境變數AOL_SHOW_USER_STAMP_IN_CMD設為Y時, 展開個人選用章戳於簽核工具列第二排以下, 5個章一排, 1個章5個字寬, 新增環境變數AOL_SHOW_ALL_SIGNET_IN_CMD設為Y時, 顯示所有職名章於簽核工具列第一排, 取消原有顯示最多2個加含代字的職名章的功能, 及修正當文稿支援簽核框自動增高功能時, 加蓋的選用章戳若中心點不在簽核區域內, 但因連帶的職名章壓線, 而自動增高簽核區域且翻頁時, 選用章戳還留在前一頁的問題, 所以選用章戳也要改設為簽核區域內物件
1131018	北榮序313	Raymond	Raymond	修正當啟用展開個人選用章戳於簽核工具列功能(環境變數「AOL_SHOW_USER_STAMP_IN_CMD」設為"Y")但SSO_CONFIG.aolModeEx不為"E"時, 將「數位墨水」、「鋼筆簽核意見」、「紅筆」、「螢光筆」、「螢光筆(直線)」、「插入文字於上」、「下」、「刪劃文字」、「復原刪除記號」移至「選用章戳」右邊, 及修正未在選用章戳子視窗中調整過對齊方式, 直接點指令列的個人選用章戳時, 不會帶出職名章及時戳的問題
1131108	1130928		Raymond	Raymond	新增判斷環境變數「AOL_SIGNET_APP_ACTION」指定角色的職名章是否加蓋或移動至指定文別的指定簽核區域的指定範圍內, 是則執行指定的關聯動作功能
1131119	北榮序374	Raymond	Raymond	新增偵測加蓋簽核物件、移動簽核物件、拖拉簽核物件右邊框超出頁面範圍時, 要拉回頁面內
1131122	北榮序374	Raymond	Raymond	合併內政部1131006, 修正拖拉簽核物件從簽核區域內拉出頁面範圍外, 被自動拉回頁面內時, 座標記錄仍是頁面外位置的問題
1131125	1130948		Raymond	Raymond	修正刪劃文字第一筆遵循手寫筆修改後的紅筆顏色, 第二筆後變回紅色的問題
1131128	北榮序403	Raymond	Raymond	修正新增的文字意見, 拉出右邊界被自動拉回後, 再點其它頁面外按鈕重整頁面時, 文字意見會變成以預設寬度再拉回的位置, 儲存後再開啟, 拉到頁面範圍內中間位置, 再點其它頁面外按鈕重整頁面時, 文字意見會變成超出右邊界再拉回的位置的問題, 修正1120379衍生問題, 文字式選用章戳在儲存關閉再開啟後, 拖拉改變寬度時, 內容變空字串的問題
1140207	1131187		Raymond	Raymond	新增判斷環境變數「AOL_SHOW_COMPACT_CMD」設為"Y"且SSO.CONFIG.aolModeEx="E"時, 點擊簽核區域外的文稿頁面空白處, 會顯示僅有「紅筆」、「螢光筆」、「螢光筆(直線)」、「插入文字於上」、「下」、「刪劃文字」、「文字意見」的精簡版簽核工具按鈕的指令列
1140317	1131214		Raymond	Raymond	新增移動簽核物件從簽核區域內至外、外至內或另一個簽核區域時, 先檢查目的簽核區域的簽核物件ID, 決定移入的簽核物件應插入的順序
1140623	1131303		Raymond	Raymond	文字意見新增錯別字校正功能, 改判斷theAOL.enableFixWord4TextComment全域變數啟用
1140815	1141030		Raymond	Raymond	修正Firefox的PointerId是0不是1, 傳入1會發生Error導致無法拖拉物件的問題
1140819	1140818		Raymond	Raymond	新增符合可自訂簽核工具列條件(SSO_CONFIG.OrgNickName="TPVGH", SSO_CONFIG.aolModeEx="E", 環境變數AOL_SHOW_COMPACT_CMD="Y")時, 以自訂工具列設定呈現簽核工具列按鈕, 忽略所有其它行為
1140918	1142348		Raymond	Raymond	執行終止畫面模式時, 新增移除畫布及隱藏指令列
1140923	1140887		Raymond	Raymond	新增在輸入/修改文字意見後或加蓋選用章戳(AOL_ENABLE_STAMP_TO_SIGNCOMMENT=Y時)後, 判斷機關暱稱是TPVGH(北榮)時, 將所有文字意見及選用章戳(文字式章戳是章戳的文字,影像式章戳則用章戳名稱)依時間先後合併(以Enter分隔,時間早的在上)後設為本流程點的簽辦意見功能
1140926	1140818		Raymond	Raymond	V5再變更需求項目7, 判斷SSO_CONFIG.OrgNickName=TPVGH時, 取消提示非完稿模式的警告訊息
1141007	1141129		Raymond	Raymond	新增SSO_CONFIG.aolModeEx模式'F', 簽核工具列只顯示鋼筆、紅筆、螢光筆、螢光筆(直線)、職名章、章戳選用, 且比照模式'E', 點擊簽核區域內才顯示簽核工具列
1141009	北榮序283	Raymond	Raymond	判斷是否改過文字式章戳文字, 若改過則重新設定簽核意見為此次修改的內容, 並修正用點擊符號表輸入文字時, 不會觸發文字意見啟用錯別字校正功能時的同步TEXTAREA內容到標記層的問題
1141106	1141113		Raymond	Raymond	新增「便利貼」簽核工具及功能
1141218	北榮序453	Raymond	Raymond	因1140818禁止出組室過的非可發文文別異動內文, 但要對自動增高簽核區域功能允許異動
1141224	1141652		Raymond	Raymond	修改便利貼項目顯示方式
*/

// 移動外掛
//
$.fn.movable = function(options) {
	var opts = $.extend({
		scale:1.0,
		translateX:0,
		translateY:0,
		baseOffset:{left:0, top:0},
		upperOffset:{x:0, y:0},
		beforeMove:null,
		afterMove:null,
		duringMove:null,
		click:true
	}, options);
	return this.each(function() {
		
		/* 2014.8.19 - Raymond, 為解決taphold問題, 改為vmousedown就拖拉, 故已不需記錄點擊啟始位置
		var origX,
			origY,*/
		var offset,
			innerOffset = {},
			// 1080522 Raymond 1080382 修正pos變數宣告後面用「;」, 導致pos2變數宣告變成全域變數, 造成拖拉職名章連動代字在跨簽核區域時, 代字位置會跑到職名章頭, 因而重疊的問題
			//pos = {};   	// 2013.9.14 - Raymond, 移動中座標記錄在變數, 因為touchend沒有touches[0]
			pos = {},   	// 2013.9.14 - Raymond, 移動中座標記錄在變數, 因為touchend沒有touches[0]
			pos2 = {};		// 2017.2.2 新增第2組回呼的座標, 移動簽核物件時需要回呼參數第1組為簽核框內相對座標, 第2組為頁面座標
			/*baseOffset = Util.getRelativeOffset(this.offsetParent, document.body);
		theLogger.log("baseOffset: " + baseOffset.left + ", " + baseOffset.top);*/
		var $that = $(this);
		$that.children().css({"-webkit-user-select": "none", // 2013.9.10 - Raymond, 要拖拉功能正常運作必須先禁止Browser的長按-選取行為
							"-moz-user-select": "none",
							"-ms-user-select": "none",
							"user-select": "none",
							"-webkit-touch-callout": "none"});   // 2013.9.14 - Raymond, 要加上這個CSS property才能避免出現選單
		$that.children("img").on("dragstart", function() {return false;});  // 2013.9.14 - Raymond, 避免桌機的瀏覽器出現拖拉img的行為
		
		// 因為taphold不帶pageX/pageY, 所以要在touchstart/mousedown先keep點的位置
		/*$(this).on("touchstart mousedown", function(event) {
			if(event.type == "touchstart") {
				origX = event.originalEvent.touches[0].pageX;
				origY = event.originalEvent.touches[0].pageY;
				$that.find("span").text("on" + event.type + "\n" + event.originalEvent.touches[0].pageX + "," + event.originalEvent.touches[0].pageY);
			}
			else {
				origX = event.pageX;
				origY = event.pageY;
				$that.find("span").text("on" + event.type + "\n" + event.pageX + "," + event.pageY);
			}
		});*/
		// 2013.9.14 - Raymond, taphold事件前jqm只會觸發vmousedown而不會觸發mousedown/touchstart
		/* 2014.8.19 - Raymond, 為了修正taphold問題, 改為vmousedown就拖拉, 故已不需要記錄origX/origY變數
		$that.on("vmousedown", function(event) {
			origX = event.pageX;
			origY = event.pageY;
			//$that.find("span").text("on" + event.type + "\n" + event.pageX + "," + event.pageY);
		});*/
		var doMoving = function(evt) {
			if(evt.type == 'touchmove') {
				// 1090611 Raymond 修正在iPad下非100%縮放比時拖拉有代字的職名章, 代字會向左(縮放比小於100%)或向右(縮放比大於100%)位移的問題
				//pos.left = (evt.originalEvent.touches[0].pageX - opts.baseOffset.left) / opts.scale - innerOffset.x;
				//pos.top = (evt.originalEvent.touches[0].pageY - opts.baseOffset.top) / opts.scale - innerOffset.y;
				pos.left = (evt.originalEvent.touches[0].pageX - opts.baseOffset.left - innerOffset.x - opts.upperOffset.x) / opts.scale;
				pos.top = (evt.originalEvent.touches[0].pageY - opts.baseOffset.top - innerOffset.y - opts.upperOffset.y) / opts.scale;
				$that.css(pos);
				/*$that.find("span").text(evt.target.tagName + ".on" + evt.type + "\n" +
										evt.originalEvent.touches[0].pageX + "," + evt.originalEvent.touches[0].pageY + "\n" +
										opts.baseOffset.left + "," + opts.baseOffset.top + "\n" +
										innerOffset.x + "," + innerOffset.y + "\n" +
										opts.upperOffset.x + "," + opts.upperOffset.y + "\n" +
										l + "," + t);*/
				if("baseOffset2" in opts) {	// 2017.2.2 更新第2組回呼的座標, beforeMove回呼時設定baseOffset2才會有效
					// 1090611 Raymond 修正在iPad下非100%縮放比時拖拉有代字的職名章, 代字會向左(縮放比小於100%)或向右(縮放比大於100%)位移的問題
					//pos2.left = (evt.originalEvent.touches[0].pageX - opts.baseOffset2.left) / opts.scale - innerOffset.x;
					//pos2.top = (evt.originalEvent.touches[0].pageY - opts.baseOffset2.top) / opts.scale - innerOffset.y;
					pos2.left = (evt.originalEvent.touches[0].pageX - opts.baseOffset2.left - innerOffset.x - opts.upperOffset.x) / opts.scale;
					pos2.top = (evt.originalEvent.touches[0].pageY - opts.baseOffset2.top - innerOffset.y - opts.upperOffset.y) / opts.scale;
				}
				else {	// 否則等於pos
					pos2.left = pos.left;
					pos2.top = pos.top;
				}
			}
			else {
				pos.left = (evt.pageX - opts.baseOffset.left - innerOffset.x - opts.upperOffset.x) / opts.scale;
				pos.top = (evt.pageY - opts.baseOffset.top - innerOffset.y - opts.upperOffset.y) / opts.scale;
				$that.css(pos);
				/*$that.find("span").text(evt.target.tagName + ".on" + evt.type + "\n" +
										evt.originalEvent.pageX + "," + evt.originalEvent.pageY + "\n" +
										opts.baseOffset.left + "," + opts.baseOffset.top + "\n" +
										innerOffset.x + "," + innerOffset.y + "\n" +
										opts.upperOffset.x + "," + opts.upperOffset.y + "\n" +
										l + "," + t);*/
				if("baseOffset2" in opts) {	// 2017.2.2 更新第2組回呼的座標, beforeMove回呼時設定baseOffset2才會有效
					pos2.left = (evt.pageX - opts.baseOffset2.left - innerOffset.x - opts.upperOffset.x) / opts.scale;
					pos2.top = (evt.pageY - opts.baseOffset2.top - innerOffset.y - opts.upperOffset.y) / opts.scale;
				}
				else {	// 否則等於pos
					pos2.left = pos.left;
					pos2.top = pos.top;
				}
			}
			if(opts.duringMove) {	// 2014.12.30 - Raymond, 新增for placeholder
				if("target" in opts)	// 2017.2.2 新增target參數可指定callback的this
					opts.duringMove.call(opts.target, pos);
				else
					opts.duringMove.call($that.get(0), pos);
			}
			//evt.stopPropagation();
			evt.preventDefault();
			return false;   // 2013.9.14 - Raymond, 回傳false才能禁止move訊息bubble到pg
		}
		var onMoveEnd = function(evt) {
			$that.removeClass("so-dragging");
			$(this).off("touchmove mousemove", doMoving) // unbind moving/movend用this, 因為是parent
				   .off("touchend mouseup", onMoveEnd);
			if(opts.click)
				$that.trigger('click');	// 2014.8.19 - Raymond, 拖拉完立即onclick
			if(opts.afterMove) {
				if("target" in opts)	// 2017.2.2 新增target參數可指定callback的this
					opts.afterMove.call(opts.target, pos, pos2, opts); // 2013.9.14 - Raymond, 回呼傳回pos座標 2017.2.2 新增第2組回呼的座標及opts參數
				else
					opts.afterMove.call($that.get(0), pos, pos2, opts); // 2013.9.14 - Raymond, 回呼傳回pos座標 2017.2.2 新增第2組回呼的座標及opts參數
			}
			evt.preventDefault();
			//return false;
		}
		$that.on("vmousedown", function(event, origEvt) {	// 2014.8.19 - Raymond, 由taphold改成vmousedown, 因為刪除職名章後TextComment的taphold會異常觸發選取別區域的文字(iOS 7)
			if(opts.beforeMove) {
				if("target" in opts)	// 2017.2.2 新增target參數可指定callback的this
					opts.beforeMove.call(opts.target, opts);
				else
					opts.beforeMove.call(this, opts);
				theLogger.log("scale:" + opts.scale + "; translate:" + opts.translateX + "," + opts.translateY);
			}
			offset = $that.offset();
			if("target" in opts)	// 1080522 Raymond 1080382 新增拖拉的簽核物件ID記錄, 以便追蹤問題
				theLogger.log("movable(id:" + opts.target.so.id + ")." + event.type + " - offset:" + offset.left + "," + offset.top + "; page:" + event.pageX + "," + event.pageY + "; baseOffset:" + opts.baseOffset.left + "," + opts.baseOffset.top + "; upperOffset:" + opts.upperOffset.x + "," + opts.upperOffset.y);
			else
			theLogger.log("movable." + event.type + " - offset:" + offset.left + "," + offset.top + "; page:" + event.pageX + "," + event.pageY + "; baseOffset:" + opts.baseOffset.left + "," + opts.baseOffset.top + "; upperOffset:" + opts.upperOffset.x + "," + opts.upperOffset.y);
			//offset = {x: this.offsetLeft, y: this.offsetTop};
			//theLogger.log("movable." + event.type + " - offset:" + offset.x + "," + offset.y + "; orig:" + origX + "," + origY + "; baseOffset:" + opts.baseOffset.x + "," + opts.baseOffset.y + "; upperOffset:" + opts.upperOffset.x + "," + opts.upperOffset.y);
			theLogger.log("  offset':" + ((offset.left - opts.baseOffset.left) * opts.scale) + "," + ((offset.top - opts.baseOffset.top) * opts.scale));
			//offset.x -= opts.baseOffset.x - opts.translateX;
			//offset.y -= opts.baseOffset.y - opts.translateY;
			//innerOffset.x = origX - opts.baseOffset.left - ((offset.left - opts.baseOffset.left) * opts.scale);
			//innerOffset.y = origY - opts.baseOffset.top - ((offset.top - opts.baseOffset.top) * opts.scale);
			if(!!event.pageX) {	// 2014.12.30 - Raymond, 用trigger方法觸發vmousedown會沒有pageX, pageY
				innerOffset.x = (event.pageX - offset.left);// / opts.scale;	// 2014.8.19 - Raymond, 改為vmousedown後可直接使用event.pageX	// 2017.2.6 bugfix for 縮小比例下, 物件會向左上拖拉點擊位置徧移
				innerOffset.y = (event.pageY - offset.top);// / opts.scale;	// 2014.8.19 - Raymond, 改為vmousedown後可直接使用event.pageY
			}
			else if(origEvt && !!origEvt.pageX) {	// 2015.6.12 tokenEdit外掛會二次trigger vmousedown, 會導致沒有pageX, 須另外判斷多傳的origEvt參數
				innerOffset.x = (origEvt.pageX - offset.left);// / opts.scale;	// 2017.2.6 bugfix for 縮小比例下, 物件會向左上拖拉點擊位置徧移
				innerOffset.y = (origEvt.pageY - offset.top);// / opts.scale;
			}
			// 1101222 Raymond 1101591 修正Chrome模擬Mobile裝置時, window.event會沒有pageX、pageY屬性, 而使innerOffset計算錯誤變成NaN, 導致發生無法拖拉受文者的問題
			else if(origEvt && !!origEvt.touches && !!origEvt.touches[0] && !!origEvt.touches[0].pageX) {
				innerOffset.x = (origEvt.touches[0].pageX - offset.left);// / opts.scale;	// 2017.2.6 bugfix for 縮小比例下, 物件會向左上拖拉點擊位置徧移
				innerOffset.y = (origEvt.touches[0].pageY - offset.top);// / opts.scale;
			}
			else {	// 改用window.event.pageX, window.event.pageY計算
				innerOffset.x = (window.event.pageX - offset.left);// / opts.scale;	// 2017.2.6 bugfix for 縮小比例下, 物件會向左上拖拉點擊位置徧移
				innerOffset.y = (window.event.pageY - offset.top);// / opts.scale;
			}
			theLogger.log("  innerOffset:" + innerOffset.x + "," + innerOffset.y);
			
			// 2019.10.2 - 1080339 Eric, jQuery 升級至3.4後, event.originalEvent.touches屬性存在, 但值為undefined!
			// 2015.5.29 抓初始位置, 以免只點擊不移動時pos為undefined
			// 2015.6.12 tokenEdit外掛會二次trigger vmousedown, 會導致沒有originalEvent, 須另外判斷多傳的origEvt參數
			//if("originalEvent" in event && "touches" in event.originalEvent) {
			if("originalEvent" in event && "touches" in event.originalEvent && typeof event.originalEvent.touches!=='undefined') {
				// 1090611 Raymond 修正在iPad下非100%縮放比時拖拉有代字的職名章, 代字會向左(縮放比小於100%)或向右(縮放比大於100%)位移的問題
				//pos.left = (event.originalEvent.touches[0].pageX - opts.baseOffset.left) / opts.scale - innerOffset.x;
				//pos.top = (event.originalEvent.touches[0].pageY - opts.baseOffset.top) / opts.scale - innerOffset.y;
				pos.left = (event.originalEvent.touches[0].pageX - opts.baseOffset.left - innerOffset.x - opts.upperOffset.x) / opts.scale;
				pos.top = (event.originalEvent.touches[0].pageY - opts.baseOffset.top - innerOffset.y - opts.upperOffset.y) / opts.scale;
				if("baseOffset2" in opts) {	// 2017.2.2 更新第2組回呼的座標, beforeMove回呼時設定baseOffset2才會有效
					// 1090611 Raymond 修正在iPad下非100%縮放比時拖拉有代字的職名章, 代字會向左(縮放比小於100%)或向右(縮放比大於100%)位移的問題
					//pos2.left = (event.originalEvent.touches[0].pageX - opts.baseOffset2.left) / opts.scale - innerOffset.x;
					//pos2.top = (event.originalEvent.touches[0].pageY - opts.baseOffset2.top) / opts.scale - innerOffset.y;
					pos2.left = (event.originalEvent.touches[0].pageX - opts.baseOffset2.left - innerOffset.x - opts.upperOffset.x) / opts.scale;
					pos2.top = (event.originalEvent.touches[0].pageY - opts.baseOffset2.top - innerOffset.y - opts.upperOffset.y) / opts.scale;
				}
				else {	// 否則等於pos
					pos2.left = pos.left;
					pos2.top = pos.top;
				}
			}
			// 1090312 Raymond 1081105 修正點擊連動的職名章或選用章戳一或二次時, 被連動的代字章或職名章跑到簽核區域外的問題
			//else if("pageX" in event) {
			else if(!!event.pageX) {
				pos.left = (event.pageX - opts.baseOffset.left - innerOffset.x - opts.upperOffset.x) / opts.scale;
				pos.top = (event.pageY - opts.baseOffset.top - innerOffset.y - opts.upperOffset.y) / opts.scale;
				if("baseOffset2" in opts) {	// 2017.2.2 更新第2組回呼的座標, beforeMove回呼時設定baseOffset2才會有效
					pos2.left = (event.pageX - opts.baseOffset2.left - innerOffset.x - opts.upperOffset.x) / opts.scale;
					pos2.top = (event.pageY - opts.baseOffset2.top - innerOffset.y - opts.upperOffset.y) / opts.scale;
				}
				else {	// 否則等於pos
					pos2.left = pos.left;
					pos2.top = pos.top;
				}
			}
			else if(origEvt) {
				// 1101222 Raymond 1101591 修正桌機的origEvt(jQuery.Event)都會有touches屬性但值為undefined, 導致取得.touches[0]會發生Error的問題
				//if("touches" in origEvt) {
				if("touches" in origEvt && !!origEvt.touches) {
					// 1090611 Raymond 修正在iPad下非100%縮放比時拖拉有代字的職名章, 代字會向左(縮放比小於100%)或向右(縮放比大於100%)位移的問題
					//pos.left = (origEvt.originalEvent.touches[0].pageX - opts.baseOffset.left) / opts.scale - innerOffset.x;
					//pos.top = (origEvt.originalEvent.touches[0].pageY - opts.baseOffset.top) / opts.scale - innerOffset.y;
					pos.left = (origEvt.originalEvent.touches[0].pageX - opts.baseOffset.left - innerOffset.x - opts.upperOffset.x) / opts.scale;
					pos.top = (origEvt.originalEvent.touches[0].pageY - opts.baseOffset.top - innerOffset.y - opts.upperOffset.y) / opts.scale;
					if("baseOffset2" in opts) {	// 2017.2.2 更新第2組回呼的座標, beforeMove回呼時設定baseOffset2才會有效
						// 1090611 Raymond 修正在iPad下非100%縮放比時拖拉有代字的職名章, 代字會向左(縮放比小於100%)或向右(縮放比大於100%)位移的問題
						//pos2.left = (origEvt.originalEvent.touches[0].pageX - opts.baseOffset2.left) / opts.scale - innerOffset.x;
						//pos2.top = (origEvt.originalEvent.touches[0].pageY - opts.baseOffset2.top) / opts.scale - innerOffset.y;
						pos2.left = (origEvt.originalEvent.touches[0].pageX - opts.baseOffset2.left - innerOffset.x - opts.upperOffset.x) / opts.scale;
						pos2.top = (origEvt.originalEvent.touches[0].pageY - opts.baseOffset2.top - innerOffset.y - opts.upperOffset.y) / opts.scale;
					}
					else {	// 否則等於pos
						pos2.left = pos.left;
						pos2.top = pos.top;
					}
				}
				else {
					pos.left = (origEvt.pageX - opts.baseOffset.left - innerOffset.x - opts.upperOffset.x) / opts.scale;
					pos.top = (origEvt.pageY - opts.baseOffset.top - innerOffset.y - opts.upperOffset.y) / opts.scale;
					if("baseOffset2" in opts) {	// 2017.2.2 更新第2組回呼的座標, beforeMove回呼時設定baseOffset2才會有效
						pos2.left = (origEvt.pageX - opts.baseOffset2.left - innerOffset.x - opts.upperOffset.x) / opts.scale;
						pos2.top = (origEvt.pageY - opts.baseOffset2.top - innerOffset.y - opts.upperOffset.y) / opts.scale;
					}
					else {	// 否則等於pos
						pos2.left = pos.left;
						pos2.top = pos.top;
					}
				}
			}
			// 1080522 Raymond 1080382 Trigger的event沒有pageX、pageY, 改用window.event.pageX、pageY計算初始pos、pos2值
			else {
				pos.left = (window.event.pageX - opts.baseOffset.left - innerOffset.x - opts.upperOffset.x) / opts.scale;
				pos.top = (window.event.pageY - opts.baseOffset.top - innerOffset.y - opts.upperOffset.y) / opts.scale;
				if("baseOffset2" in opts) {	// 2017.2.2 更新第2組回呼的座標, beforeMove回呼時設定baseOffset2才會有效
					pos2.left = (window.event.pageX - opts.baseOffset2.left - innerOffset.x - opts.upperOffset.x) / opts.scale;
					pos2.top = (window.event.pageY - opts.baseOffset2.top - innerOffset.y - opts.upperOffset.y) / opts.scale;
				}
				else {	// 否則等於pos
					pos2.left = pos.left;
					pos2.top = pos.top;
				}
			}
			// 1080522 Raymond 1080382 記錄計算得到的pos及pos2
			theLogger.log("  pos:" + pos.left + "," + pos.top + "; pos2:" + pos2.left + "," + pos2.top);
			/*if("originalEvent" in event) {
				if("touches" in event.originalEvent)
					$that.find("span").text(event.originalEvent.touches[0].pageX + "," + event.originalEvent.touches[0].pageY);
				else
					$that.find("span").text("mouse:" + event.originalEvent.pageX + "," + event.originalEvent.pageY);
			}
			else
				$that.find("span").text(event.target.tagName + ".on" + event.type + "\n" +
										  "orig:" + origX + "," + origY + "\n" +
										  "base:" + opts.baseOffset.left + "," + opts.baseOffset.top + "\n" +
										  "offset:" + offset.left + "," + offset.top + "\n" +
										  innerOffset.x + "," + innerOffset.y);*/
			/* 2017.2.3 改用.pg當move目標, 因為簽核框內物件在拖拉時不小心拖出框外常會不觸發move事件, 而導致沒有afterMove異常
			$that.addClass("so-dragging")
					.parent().on("touchmove mousemove", doMoving) // moving/movend處理parent的
							 .on("touchend mouseup", onMoveEnd);*/
			$that.addClass("so-dragging")
					.closest(".pg").on("touchmove mousemove", doMoving) // moving/movend處理parent的
							 .on("touchend mouseup", onMoveEnd);
			return false;
		})
		//.append("<span style='position:absolute; background-color:yellow; color:blue; font-size:12pt; font-family:Courier New'></span>");
	});
}

// 數位墨水(塗鴉)外掛
//
$.fn.sketch = function(options) {
	var opts = $.extend({
		beforeStart: null,
		afterStart: null,
		beforeSketching: null,
		afterSketching: null,
		beforeEnd: null,
		afterEnd: null,
		defaultColor: "blue",
		defaultWidth: 2,
		segmentedLine: false,
		rightAngle: false,		// 2015.10.13 直角線
		lineShape: "solid",		// 2015.10.13 線條形狀, solid:實線, triangle:三角形(復原刪除記號)
		fake: false				// 2015.10.15 移動時不劃線, 起筆時劃插入符號
	}, options);
	return this.each(function() {
		
		var ctx = this.getContext("2d"),
			lineColor = opts.defaultColor,
			lineWidth = opts.defaultWidth,
			segmentedLine = opts.segmentedLine,
			rightAngle = opts.rightAngle,	// 2015.10.13 新增直角線
			lineShape = opts.lineShape,		// 2015.10.13 新增線條形狀
			fake = opts.fake;				// 2015.10.15 新增插入於上符號
		ctx.strokeStyle = lineColor;
		ctx.lineWidth = lineWidth;
		ctx.lineJoin = "round";
		var sketching = false;
		var param = {scale:1, translateX:0, translateY:0};
		var dbox = $("<div id='rightAngleBox' style='position:absolute; left:-100px; top:-100px: z-index:1000'></div>").insertAfter(this);	// 2015.10.13 新增描劃直角線段的方塊
		if(rightAngle) {
			$(this).css({/*backgroundColor: "transparent",*/
						cursor: "crosshair"});
		}
		
		// 2015.10.13 劃三角記號, 2016.1.18 修改大小間距
		function drawTriangle(ctx, x0, y0, cx, cy) {
			if(cy == 0) {	// 橫線
				for(var x=x0; x<(x0+cx); x+=12) {
					ctx.moveTo(x+3, y0);
					ctx.lineTo(x, y0+5);
					ctx.lineTo(x+6, y0+5);
					ctx.lineTo(x+2, y0+1);
				}
			}
			else {	// 縱線
				for(var y=y0; y<(y0+cy); y+=14) {
					ctx.moveTo(x0+3, y);
					ctx.lineTo(x0, y+5);
					ctx.lineTo(x0+6, y+5);
					ctx.lineTo(x0+3, y+1);
				}
			}
		}
		
		//var offset = Util.getRelativeOffset(this, document.body);
		var offset = $(this).offset();  // 2013.9.13 - Raymond, $.offset()已能取得扣掉ScrollLeft、ScrollTop的正確相對座標
		//alert("offset: " + offset.left + "," + offset.top + ", lineWidth:" + lineWidth + ", lineColor:" + lineColor);
		if('ontouchstart' in window) {
			$(this).on("touchstart", function(event) {
				
				param.scale = 1;
				if(opts.beforeStart != null)
					opts.beforeStart.call(this, param);
				
				offset = $(this).offset();  // 2013.9.13 - Raymond, 開始點要更新Canvas的相對座標
				
				ctx.beginPath();
				param.x = (event.originalEvent.touches[0].pageX - offset.left/* - param.translateX*/) / param.scale; // 2013.9.13 - Raymond, $.offset()拿到的座標已是扣掉ScrollLeft、ScrollTop的,
				param.y = (event.originalEvent.touches[0].pageY - offset.top/* - param.translateY*/) / param.scale;  //                      所以不再需要translateX、translateY補正
				if(rightAngle) {	// 2015.10.13 劃直角線模式
					param.x0 = param.x;	// 額外記錄起點
					param.y0 = param.y;
					dbox.css({left: param.x + "px", top: param.y + "px"});
				}
				else
					ctx.moveTo(param.x, param.y);
				sketching = true;
				event.preventDefault();
				//event.stopPropagation();
				
				if(opts.afterStart != null)
					opts.afterStart.call(this, param);
			})
			.on("touchmove", function(event) {
				if(sketching) {
					if(opts.beforeSketching != null)
						opts.beforeSketching.call(this, param);
					
					param.x = (event.originalEvent.touches[0].pageX - offset.left/* - param.translateX*/) / param.scale; // 2013.9.13 - Raymond, $.offset()拿到的座標已是扣掉ScrollLeft、ScrollTop的,
					param.y = (event.originalEvent.touches[0].pageY - offset.top/* - param.translateY*/) / param.scale;  //                      所以不再需要translateX、translateY補正
					if(rightAngle) {	// 2015.10.13 劃直角線模式
						var cx = Math.abs(param.x - param.x0),
							cy = Math.abs(param.y - param.y0);
						if(cx > cy) {	// 橫線
							if(param.x > param.x0)
								dbox.css({left: param.x0 + "px", top: param.y0 + "px"});
							else
								dbox.css({left: param.x + "px", top: param.y0 + "px"});
							dbox.css({width: cx + "px", height: cy + "px", borderTop: lineWidth + "px solid black", borderLeft: "0px"});
						}
						else {	// 縱線
							if(param.y > param.y0)
								dbox.css({left: param.x0 + "px", top: param.y0 + "px"});
							else
								dbox.css({left: param.x0 + "px", top: param.y + "px"});
							dbox.css({width: cx + "px", height: cy + "px", borderTop: "0px", borderLeft: lineWidth + "px solid black"});
						}
					}
					else if(!fake) {	// 2015.10.15 劃線
						ctx.lineTo(param.x, param.y);
						ctx.stroke();
						if(segmentedLine) {
							ctx.closePath();
							ctx.beginPath();
							ctx.moveTo(param.x, param.y);
						}
					}
				
					if(opts.afterSketching != null)
						opts.afterSketching.call(this, param);
				}
				//event.preventDefault();
				event.stopPropagation();
			})
			.on("touchend", function(event) {
				if(sketching) {
				
					if(opts.beforeEnd != null)
						opts.beforeEnd.call(this, param);
					
					if(rightAngle) {	// 2015.10.13 直角線模式
						var cx = Math.abs(param.x - param.x0),
							cy = Math.abs(param.y - param.y0);
						if(cx > cy) {	// 橫線
							ctx.beginPath();
							if(lineShape == "triangle") {
								if(param.x > param.x0)
									drawTriangle(ctx, param.x0, param.y0, param.x - param.x0, 0);
								else
									drawTriangle(ctx, param.x, param.y0, param.x0 - param.x, 0);
							}
							else {
								ctx.moveTo(param.x0, param.y0);
								ctx.lineTo(param.x, param.y0);
							}
							ctx.stroke();
							ctx.closePath();
						}
						else {	// 縱線
							ctx.beginPath();
							if(lineShape == "triangle") {
								if(param.y > param.y0)
									drawTriangle(ctx, param.x0, param.y0, 0, param.y - param.y0);
								else
									drawTriangle(ctx, param.x0, param.y, 0, param.y0 - param.y);
							}
							else {
								ctx.moveTo(param.x0, param.y0);
								ctx.lineTo(param.x0, param.y);
							}
							ctx.stroke();
							ctx.closePath();
						}
						dbox.css({left: "-100px", top: "-100px", width: "0px", height: "0px"});
					}
					else if(fake) {	// 2015.10.15 起筆時劃插入符號
						if(fake == 2) {	// 1061129 Raymond 1061149 新增插入於下符號
							ctx.moveTo(param.x - 4, param.y + 12);
							ctx.lineTo(param.x, param.y);
							ctx.lineTo(param.x + 6, param.y + 12);
						}
						else {
							ctx.moveTo(param.x - 4, param.y - 12);
							ctx.lineTo(param.x, param.y);
							ctx.lineTo(param.x + 6, param.y - 12);
						}
						ctx.stroke();
						ctx.closePath();
					}
					else
						ctx.closePath();
					sketching = false;
					event.stopPropagation();
					
					if(opts.afterEnd != null)
						opts.afterEnd.call(this, param);
					
					return false;
				}
			})
		}
		else {
			$(this).on("mousedown", function(event) {
				if("offsetX" in event)
					theLogger.log(event.type + ": offset:" + event.offsetX + "," + event.offsetY + "; lineWidth:" + ctx.lineWidth);
				else
					theLogger.log(event.type + ": page:" + event.pageX + "," + event.pageY + "; offset:" + offset.left + "," + offset.top + "; lineWidth:" + ctx.lineWidth);
				
				param.scale = 1;
				if(opts.beforeStart != null)
					opts.beforeStart.call(this, param);
				
				offset = $(this).offset();  // 2013.9.13 - Raymond, 開始點要更新Canvas的相對座標
				
				ctx.beginPath();
				if("offsetX" in event) {    // 2013.9.13 - Raymond, 改個寫法
					param.x = event.offsetX;
					param.y = event.offsetY;
				}
				else {
					param.x = (event.pageX - offset.left/* - param.translateX*/) / param.scale; // 2013.9.13 - Raymond, $.offset()拿到的座標已是扣掉ScrollLeft、ScrollTop的,
					param.y = (event.pageY - offset.top/* - param.translateY*/) / param.scale;  //                      所以不再需要translateX、translateY補正
				}
				if(rightAngle) {	// 2015.10.13 劃直角線模式
					param.x0 = param.x;	// 額外記錄起點
					param.y0 = param.y;
					dbox.css({left: param.x + "px", top: param.y + "px"});
				}
				else
					ctx.moveTo(param.x, param.y);
				sketching = true;
				event.stopPropagation();    // 避免下層的iscroll抓到mousedown
				
				if(opts.afterStart != null)
					opts.afterStart.call(this, param);
				
				return false;   // 避免游標變成I-Beam
			})
			.on("mousemove", function(event) {
				if(sketching) {
				
					if(opts.beforeSketching != null)
						opts.beforeSketching.call(this, param);
						
					if("offsetX" in event) {    // 2013.9.13 - Raymond, 改個寫法
						theLogger.log(event.type + ": offset:" + event.offsetX + "," + event.offsetY);
						param.x = event.offsetX;
						param.y = event.offsetY;
					}
					else {
						theLogger.log(event.type + ": page:" + event.pageX + "," + event.pageY + "; offset:" + offset.left + "," + offset.top + "; lineWidth:" + ctx.lineWidth + "; translateX:" + param.translateX + ", translateY:" + param.translateY);
						param.x = (event.pageX - offset.left/* - param.translateX*/) / param.scale; // 2013.9.13 - Raymond, $.offset()拿到的座標已是扣掉ScrollLeft、ScrollTop的,
						param.y = (event.pageY - offset.top/* - param.translateY*/) / param.scale;  //                      所以不再需要translateX、translateY補正
					}
					if(rightAngle) {	// 2015.10.13 劃直角線模式
						var cx = Math.abs(param.x - param.x0),
							cy = Math.abs(param.y - param.y0);
						if(cx > cy) {	// 橫線
							if(param.x > param.x0)
								// 1101217 Raymond 1101574 修正筆寬較寬時, 劃線中灰色線段位置較產生物件後實際位置下面的問題
								//dbox.css({left: param.x0 + "px", top: param.y0 + "px"});
								dbox.css({left: param.x0 + "px", top: (param.y0 - lineWidth / 2) + "px"});
							else
								// 1101217 Raymond 1101574 修正筆寬較寬時, 劃線中灰色線段位置較產生物件後實際位置下面的問題
								//dbox.css({left: param.x + "px", top: param.y0 + "px"});
								dbox.css({left: param.x + "px", top: (param.y0 - lineWidth / 2) + "px"});
							dbox.css({width: cx + "px", height: cy + "px", borderTop: lineWidth + "px solid black", borderLeft: "0px"});
						}
						else {	// 縱線
							if(param.y > param.y0)
								// 1101217 Raymond 1101574 修正筆寬較寬時, 劃線中灰色線段位置較產生物件後實際位置右邊的問題
								//dbox.css({left: param.x0 + "px", top: param.y0 + "px"});
								dbox.css({left: (param.x0 - lineWidth / 2) + "px", top: param.y0 + "px"});
							else
								// 1101217 Raymond 1101574 修正筆寬較寬時, 劃線中灰色線段位置較產生物件後實際位置右邊的問題
								//dbox.css({left: param.x0 + "px", top: param.y + "px"});
								dbox.css({left: (param.x0 - lineWidth / 2) + "px", top: param.y + "px"});
							dbox.css({width: cx + "px", height: cy + "px", borderTop: "0px", borderLeft: lineWidth + "px solid black"});
						}
					}
					else if(!fake) {	// 2015.10.15 劃線
						ctx.lineTo(param.x, param.y);
						ctx.stroke();
						if(segmentedLine) {
							ctx.closePath();
							ctx.beginPath();
							ctx.moveTo(param.x, param.y);
						}
					}
					
					if(opts.afterSketching != null)
						opts.afterSketching.call(this, param);	// 1060721 Raymond fix typo
				}
				//event.preventDefault();
				event.stopPropagation();
				//return false;
			})
			.on("mouseup", function(event) {
				if(sketching) {
				
					if(opts.beforeEnd != null)
						opts.beforeEnd.call(this, param);
					
					if(rightAngle) {	// 2015.10.13 直角線模式
						var cx = Math.abs(param.x - param.x0),
							cy = Math.abs(param.y - param.y0);
						if(cx > cy) {	// 橫線
							ctx.beginPath();
							if(lineShape == "triangle") {
								if(param.x > param.x0)
									drawTriangle(ctx, param.x0, param.y0, param.x - param.x0, 0);
								else
									drawTriangle(ctx, param.x, param.y0, param.x0 - param.x, 0);
							}
							else {
								ctx.moveTo(param.x0, param.y0);
								ctx.lineTo(param.x, param.y0);
							}
							ctx.stroke();
							ctx.closePath();
						}
						else {	// 縱線
							ctx.beginPath();
							if(lineShape == "triangle") {
								if(param.y > param.y0)
									drawTriangle(ctx, param.x0, param.y0, 0, param.y - param.y0);
								else
									drawTriangle(ctx, param.x0, param.y, 0, param.y0 - param.y);
							}
							else {
								ctx.moveTo(param.x0, param.y0);
								ctx.lineTo(param.x0, param.y);
							}
							ctx.stroke();
							ctx.closePath();
						}
						dbox.css({left: "-100px", top: "-100px", width: "0px", height: "0px"});
					}
					else if(fake) {	// 2015.10.15 起筆時劃插入符號
						if(fake == 2) {	// 1061129 Raymond 1061149 新增插入於下符號
							ctx.moveTo(param.x - 4, param.y + 12);
							ctx.lineTo(param.x, param.y);
							ctx.lineTo(param.x + 6, param.y + 12);
						}
						else {
							ctx.moveTo(param.x - 4, param.y - 12);
							ctx.lineTo(param.x, param.y);
							ctx.lineTo(param.x + 6, param.y - 12);
						}
						ctx.stroke();
						ctx.closePath();
					}
					else
						ctx.closePath();
					sketching = false;
					event.preventDefault();
					event.stopPropagation();
					
					if(opts.afterEnd != null)
						opts.afterEnd.call(this, param);
					
					return false;
				}
			})
			.on("click", function(event) {
				event.stopPropagation();    // 攔截onclick, 避免下層觸發manipulation
				//return false;
			});
		}
		var that = this;
		$(this).data("sketch", {
			getLineWidth: function() {return ctx.lineWidth;},
			setLineWidth: function(w) {
				lineWidth = parseInt(w);
				if(ctx.globalCompositeOperation !== "destination-out")
					ctx.lineWidth = lineWidth;
			},
			getLineColor: function() {
				if(ctx.globalCompositeOperation == "destination-out")
					return "transparent";
				return ctx.strokeStyle;
			},
			setLineColor: function(c) {
				if(c == "transparent") {
					ctx.globalCompositeOperation = "destination-out";
					//ctx.strokeStyle = "rgba(0,0,0,0)";
					ctx.lineWidth = 16;
				}
				else {
					if(ctx.globalCompositeOperation !== "source-over")
						ctx.globalCompositeOperation = "source-over";
					ctx.strokeStyle = lineColor = c;
					ctx.lineWidth = lineWidth;
				}
			},
			getSegmentedLine: function() {
				return segmentedLine;
			},
			setSegmentedLine: function(val) {
				segmentedLine = val;
			},
			getRightAngle: function() {		// 2015.10.15 new
				return rightAngle;
			},
			setRightAngle: function(ra) {	// 2015.10.15 new
				if(ra)
					$(that).css("cursor", "crosshair");
				else
					$(that).css("cursor", "default");
				rightAngle = ra;
			},
			getLineShape: function() {		// 2015.10.15 new
				return lineShape;
			},
			setLineShape: function(ls) {	// 2015.10.15 new
				lineShape = ls;
			},
			getFake: function() {			// 2015.10.15 new
				return fake;
			},
			setFake: function(f) {			// 2015.10.15 new
				fake = f;
			},
			getBoundedRect: function() {
				var r, g, b, a, i = 0;
				// 1090506 Raymond 1090340 修正瀏覽器顯示比例為非100%(或25%的倍數)時, .width()在Chrome環境下會取到有小數點的寬度, 造成getImageData()取得小於正確寬度的資料陣列, 判斷最末幾行時變成undefined != 0條件成立, 而使回傳寬高度擴大至整頁寬及下邊界達頁底的問題
				//var cx = $(that).width();
				//var cy = $(that).height();
				var cx = that.clientWidth;
				var cy = that.clientHeight;
				var h0 = cx, h1 = -1, v0 = cy, v1 = -1;
				var imgData = ctx.getImageData(0, 0, cx, cy);
				for(var y=0; y<cy; y++) {
					for(var x=0; x<cx; x++) {
						r = imgData.data[i++];
						g = imgData.data[i++];
						b = imgData.data[i++];
						a = imgData.data[i++];
						if(a != 0) {
							h0 = Math.min(h0, x);
							h1 = Math.max(h1, x);
							v0 = Math.min(v0, y);
							v1 = Math.max(v1, y);
						}
					}
				}
				theLogger.log("calc: left=" + h0 + ",top=" + v0 + ",width=" + (h1 - h0 + 1) + ",height=" + (v1 - v0 + 1));
				return {left:h0, top:v0, width:(h1<0)?0:h1-h0+1, height:(v1<0)?0:v1-v0+1};	// 2016.2.24 修正無畫素時回傳0寬0高
			},
			getFitImgDataURL: function(coord) {
				var rect = this.getBoundedRect();
				if(rect.width == 0 || rect.height == 0) {	// 2016.2.24 修正無寬高時不要產生影像
					theLogger.log("偵測到繪圖範圍寬高為0, 不產生影像");
					return "";
				}
				else if(rect.width < 5 && rect.height < 5) {	// 1061124 Raymond 1060892 點擊寬高小於5視為誤點不要產生影像
					theLogger.warn("偵測到繪圖範圍寬(" + rect.width + ")高(" + rect.height + ")皆小於5, 視為誤點, 不產生影像");
					return "";
				}
				try {
					var can = $("<canvas width='" + rect.width + "' height='" + rect.height + "'></canvas>");
					var ctx2 = can.get(0).getContext("2d");
					ctx2.drawImage(that, rect.left, rect.top, rect.width, rect.height, 0, 0, rect.width, rect.height);
					if(coord !== undefined) {
						coord.x = rect.left;
						coord.y = rect.top;
						// 1060718 Raymond 1060610/1060632 新增回傳數位墨水的寬高資訊
						coord.cx = rect.width;
						coord.cy = rect.height;
					}
					return can.get(0).toDataURL();
				}
				catch(e) {
					alert("sketch plugin: getFitImgDataURL()\n" + e.message);
				}
				return that.toDataURL();
			},
			// 1061124 Raymond 1060753 新增終止畫布模式函式
			termSketchMode: opts.termSketchMode
		});
	});
}

// tipAlert外掛
// 1120823 Raymond 1120562 新增可在指定元素上面覆蓋一層DIV, 邊框閃爍, 下方顯示指定警告文字的外掛Widget, 點擊指定元素時消除
$.fn.tipAlert = function(tipText) {
	function htmlEncode(s){
		var div = document.createElement('div');
		div.appendChild(document.createTextNode(s));
		return div.innerHTML;
	}
	return this.each(function() {
		var $that = $(this);
		if($that.next().length && $that.next().is("div.tipAlert")) {
		}
		else {
			let h = $that.outerHeight();
			let l = $that.offset().left - $that.parent().offset().left,
				t = $that.offset().top - $that.parent().offset().top;
			let $tipAlert = $("<div class='tipAlert' style='height:" + h + "px; left:" + l + "px; top:" + t + "px'><div><a id='tip' class='ui-btn ui-icon-alert ui-btn-icon-left'>" + htmlEncode(tipText) + "</a></div></div>").insertAfter($that);
			$that.one("pointerdown", function(e) {
				$tipAlert.remove();
			});
		}
	});
}

// 矩形選取外掛
// 1130315 Raymond 1130050 新增使用矩形選取操作UI決定新增貼布物件的大小及位置
$.fn.drawRect = function(options) {
	var opts = $.extend({
		beforeStart: null,
		afterStart: null,
		change: null,
		beforeEnd: null,
		afterEnd: null,
		lineColor: "green",
		lineWidth: 1,
		lineShape: "solid"
	}, options);
	return this.each(function() {
		
		var drawing = false;
		var param = {scale:1, translateX:0, translateY:0};
		var dbox = $("<div id='rectBox' style='position:absolute; left:-100px; top:-100px; z-index:1000; pointer-events:none'></div>").appendTo(this);
		$(this).css({cursor: "crosshair"});
		
		var offset = $(this).offset();
		if('ontouchstart' in window) {
			$(this).on("touchstart", function(evt) {
				
				if(!drawing) {	// 避免拖拉出Overlay範圍後放掉滑鼠左鍵, 再回Overlay範圍點擊滑鼠左鍵, 使param.left、param.top跑掉的問題
					param.scale = 1;
					if(opts.beforeStart != null)
						opts.beforeStart.call(this, param);
					
					offset = $(this).offset();	// 一開始點要更新Overlay層的相對座標
					
					param.left = (evt.originalEvent.touches[0].pageX - offset.left/* - param.translateX*/) / param.scale; // 2013.9.13 - Raymond, $.offset()拿到的座標已是扣掉ScrollLeft、ScrollTop的,
					param.top = (evt.originalEvent.touches[0].pageY - offset.top/* - param.translateY*/) / param.scale;  //                      所以不再需要translateX、translateY補正
					param.width = param.dx = 0;
					param.height = param.dy = 0;
					dbox.css({borderColor: opts.lineColor, borderWidth: opts.lineWidth + "px", borderStyle: opts.lineShape, left: param.x + "px", top: param.y + "px"});
					drawing = true;
					evt.preventDefault();
					
					if(opts.afterStart != null)
						opts.afterStart.call(this, param);
				}
			})
			.on("touchmove", function(evt) {
				if(drawing) {
					var x = (evt.originalEvent.touches[0].pageX - offset.left/* - param.translateX*/) / param.scale; // 2013.9.13 - Raymond, $.offset()拿到的座標已是扣掉ScrollLeft、ScrollTop的,
					var y = (evt.originalEvent.touches[0].pageY - offset.top/* - param.translateY*/) / param.scale;  //                      所以不再需要translateX、translateY補正
					param.dx = x - param.left;
					param.dy = y - param.top;
					if(param.dx > 0)
						dbox.css("width", param.dx + "px");
					else if(param.dx < 0)
						dbox.css({left: x + "px", width: (0 - param.dx) + "px"});
					if(param.dy > 0)
						dbox.css("height", param.dy + "px");
					else if(param.dy < 0)
						dbox.css({top: y + "px", height: (0 - param.dy) + "px"});
					
					if(opts.change != null)
						opts.change.call(this, param);
				}
				evt.stopPropagation();
			})
			.on("touchend", function(evt) {
				if(drawing) {
				
					if(opts.beforeEnd != null)
						opts.beforeEnd.call(this, param);
					
					if(param.dx < 0) {
						param.left = param.left + param.dx;
						param.width = (0 - param.dx);
					}
					else
						param.width = param.dx;
					if(param.dy < 0) {
						param.top = param.top + param.dy;
						param.height = (0 - param.dy);
					}
					else
						param.height = param.dy;
					dbox.css({left: "-100px", top: "-100px", width: "0px", height: "0px"});
					drawing = false;
					evt.stopPropagation();
					
					if(opts.afterEnd != null)
						opts.afterEnd.call(this, param);
					
					return false;
				}
			})
		}
		else {
			$(this).on("mousedown", function(evt) {
				if("offsetX" in evt)
					console.log(this.nodeName + "#" + this.id + "." + evt.type + ": offset:" + evt.offsetX + "," + evt.offsetY + " drawing:" + drawing);
				else
					console.log(this.nodeName + "#" + this.id + "." + evt.type + ": page:" + evt.pageX + "," + evt.pageY + "; offset:" + offset.left + "," + offset.top);
				
				if(!drawing) {	// 避免拖拉出Overlay範圍後放掉滑鼠左鍵, 再回Overlay範圍點擊滑鼠左鍵, 使param.left、param.top跑掉的問題
					param.scale = 1;
					if(opts.beforeStart != null)
						opts.beforeStart.call(this, param);
					
					offset = $(this).offset();	// 一開始點要更新Overlay層的相對座標
					
					if("offsetX" in evt) {
						param.left = evt.offsetX;
						param.top = evt.offsetY;
					}
					else {
						param.left = (evt.pageX - offset.left/* - param.translateX*/) / param.scale; // 2013.9.13 - Raymond, $.offset()拿到的座標已是扣掉ScrollLeft、ScrollTop的,
						param.top = (evt.pageY - offset.top/* - param.translateY*/) / param.scale;  //                      所以不再需要translateX、translateY補正
					}
					param.width = param.dx = 0;
					param.height = param.dy = 0;
					dbox.css({borderColor: opts.lineColor, borderWidth: opts.lineWidth + "px", borderStyle: opts.lineShape, left: param.left + "px", top: param.top + "px"});
					drawing = true;
					evt.stopPropagation();	// 避免下層的iscroll抓到mousedown
					
					if(opts.afterStart != null)
						opts.afterStart.call(this, param);
				}
				return false;   // 避免游標變成I-Beam
			})
			.on("mousemove", function(evt) {
				if(drawing) {
				
					if("offsetX" in evt) {
						console.log(this.nodeName + "#" + this.id + "." + evt.type + ": offset:" + evt.offsetX + "," + evt.offsetY);
						var x = evt.offsetX;
						var y = evt.offsetY;
					}
					else {
						console.log(this.nodeName + "#" + this.id + "." + evt.type + ": page:" + evt.pageX + "," + evt.pageY + "; offset:" + offset.left + "," + offset.top);
						var x = (evt.pageX - offset.left/* - param.translateX*/) / param.scale; // 2013.9.13 - Raymond, $.offset()拿到的座標已是扣掉ScrollLeft、ScrollTop的,
						var y = (evt.pageY - offset.top/* - param.translateY*/) / param.scale;  //                      所以不再需要translateX、translateY補正
					}
					param.dx = x - param.left;
					param.dy = y - param.top;
					if(param.dx > 0)
						dbox.css({left: param.left + "px", width: param.dx + "px"});
					else if(param.dx < 0)
						dbox.css({left: x + "px", width: (0 - param.dx) + "px"});
					if(param.dy > 0)
						dbox.css({top: param.top + "px", height: param.dy + "px"});
					else if(param.dy < 0)
						dbox.css({top: y + "px", height: (0 - param.dy) + "px"});
					
					if(opts.change != null)
						opts.change.call(this, param);
				}
				evt.stopPropagation();
			})
			.on("mouseup", function(evt) {
				if(drawing) {
				
					if(opts.beforeEnd != null)
						opts.beforeEnd.call(this, param);
					
					if("offsetX" in evt) {
						console.log(this.nodeName + "#" + this.id + "." + evt.type + ": offset:" + evt.offsetX + "," + evt.offsetY);
						var x = evt.offsetX;
						var y = evt.offsetY;
					}
					else {
						console.log(this.nodeName + "#" + this.id + "." + evt.type + ": page:" + evt.pageX + "," + evt.pageY + "; offset:" + offset.left + "," + offset.top);
						var x = (evt.pageX - offset.left/* - param.translateX*/) / param.scale; // 2013.9.13 - Raymond, $.offset()拿到的座標已是扣掉ScrollLeft、ScrollTop的,
						var y = (evt.pageY - offset.top/* - param.translateY*/) / param.scale;  //                      所以不再需要translateX、translateY補正
					}
					if(param.dx < 0) {
						param.left = param.left + param.dx;
						param.width = (0 - param.dx);
					}
					else
						param.width = param.dx;
					if(param.dy < 0) {
						param.top = param.top + param.dy;
						param.height = (0 - param.dy);
					}
					else
						param.height = param.dy;
					drawing = false;
					evt.preventDefault();
					evt.stopPropagation();
					
					if(opts.afterEnd != null)
						opts.afterEnd.call(this, param);
					
					return false;
				}
			})
			.on("click", function(evt) {
				evt.stopPropagation();    // 攔截onclick, 避免下層觸發manipulation
				//return false;
			});
		}
		$(this).data("drawRect", {
			// 終止畫布模式函式
			termDrawingMode: opts.termDrawingMode
		});
	});
}

// 1140923 Raymond 1140887 新增將所有文字意見及文字章戳(AOL_ENABLE_STAMP_TO_SIGNCOMMENT=Y時)依時間合併後加入簽辦意見功能
function setMergedTextCommentToSignComment() {
	let a = [];
	if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
		let d = theAOL.getCurrFolio().getCurrDraftInfo();
		console.log(d);
		if(!!d.fromType) {	// 來文
			let m = d.pages.length;
			for(let j=0; j<m; j++) {
				let l = d.pages[j].newSignObjs.length;
				for(let k=0; k<l; k++) {
					let o = d.pages[j].newSignObjs[k];
					if(o.type == "text")
						a.push(o);
					else if(theSSO.User.EnvSettings.get("AOL_ENABLE_STAMP_TO_SIGNCOMMENT") == "Y" && (o.type == "stamp.text" || (o.type == "sketch" && !!o.stampName)))
						a.push(o);
				}
			}
		}
		else {	// 本文
			let m = d.draftPages.pages.length;
			for(let j=0; j<m; j++) {
				let l = d.draftPages.pages[j].newSignObjs.length;
				for(let k=0; k<l; k++) {
					let o = d.draftPages.pages[j].newSignObjs[k];
					if(o.type == "text")
						a.push(o);
					else if(theSSO.User.EnvSettings.get("AOL_ENABLE_STAMP_TO_SIGNCOMMENT") == "Y" && (o.type == "stamp.text" || (o.type == "sketch" && !!o.stampName)))
						a.push(o);
				}
			}
		}
		if(!!d.attachs) {	// 附件
			for(let b=0; b<d.attachs.length; b++) {
				let att = d.attachs[b];
				console.log(att);
				let m = att.draftPages?.pages?.length || 0;
				for(let j=0; j<m; j++) {
					let l = att.draftPages.pages[j].newSignObjs.length;
					for(let k=0; k<l; k++) {
						let o = att.draftPages.pages[j].newSignObjs[k];
						if(o.type == "text")
							a.push(o);
						else if(theSSO.User.EnvSettings.get("AOL_ENABLE_STAMP_TO_SIGNCOMMENT") == "Y" && (o.type == "stamp.text" || (o.type == "sketch" && !!o.stampName)))
							a.push(o);
					}
				}
			}
		}
	}
	else {
		let fm = theAOL.getCurrFolio();
		let n = fm.getDraftCounts();
		for(let i=0; i<n; i++) {
			let d = fm.getEDraft(i);
			console.log(d);
			if(!!d.fromType) {	// 來文
				let m = d.pages.length;
				for(let j=0; j<m; j++) {
					let l = d.pages[j].newSignObjs.length;
					for(let k=0; k<l; k++) {
						let o = d.pages[j].newSignObjs[k];
						if(o.type == "text")
							a.push(o);
						else if(theSSO.User.EnvSettings.get("AOL_ENABLE_STAMP_TO_SIGNCOMMENT") == "Y" && (o.type == "stamp.text" || (o.type == "sketch" && !!o.stampName)))
							a.push(o);
					}
				}
			}
			else {	// 本文
				let m = d.draftPages.pages.length;
				for(let j=0; j<m; j++) {
					let l = d.draftPages.pages[j].newSignObjs.length;
					for(let k=0; k<l; k++) {
						let o = d.draftPages.pages[j].newSignObjs[k];
						if(o.type == "text")
							a.push(o);
						else if(theSSO.User.EnvSettings.get("AOL_ENABLE_STAMP_TO_SIGNCOMMENT") == "Y" && (o.type == "stamp.text" || (o.type == "sketch" && !!o.stampName)))
							a.push(o);
					}
				}
			}
			if(!!d.attachs) {	// 附件
				for(let b=0; b<d.attachs.length; b++) {
					let att = d.attachs[b];
					console.log(att);
					let m = att.draftPages?.pages?.length || 0;
					for(let j=0; j<m; j++) {
						let l = att.draftPages.pages[j].newSignObjs.length;
						for(let k=0; k<l; k++) {
							let o = att.draftPages.pages[j].newSignObjs[k];
							if(o.type == "text")
								a.push(o);
							else if(theSSO.User.EnvSettings.get("AOL_ENABLE_STAMP_TO_SIGNCOMMENT") == "Y" && (o.type == "stamp.text" || (o.type == "sketch" && !!o.stampName)))
								a.push(o);
						}
					}
				}
			}
		}
	}
	console.log(a);
	a.sort((x, y) => {return x.cTime - y.cTime;});	// 排序:時間早的在上
	console.log("sorted:", a);
	let str = "";
	for(let i=0; i<a.length; i++) {
		if(str.length > 0)
			str += "\r\n";
		if(a[i].type == "text" || a[i].type == "stamp.text")
			str += a[i].srcContent || a[i].content;
		else if(a[i].type == "sketch")
			str += a[i].stampName;
	}
	console.log(str);
	theAOL.currSignComment(str);
}

// 顯示文字意見子視窗
// 文字意見與選用章戳共用
function showTextModal() {
		
	var that = this;
	Util.getDlg("RD-TextComment.html").done(function($dlg) {
		
		// 2016.8.31 因應jQM4.5調整
		$dlg.find("header > h1").unwrap();
		$dlg.find("footer > div").unwrap();
		
		// 2015.4.1 - Raymond, 修正iOS8.1軟體鍵盤浮上來時會把游標推到太上面超出畫面的問題
		$dlg.find("textarea").on("vclick", function(event) {
			setTimeout(function() {
				if(document.body.scrollTop > 190)
					document.body.scrollTop = 190;
			}, 1000);
		});
		
		// init dlg, 2014.7.16 - Raymond, 多處修正
		$dlg.find("select").val(that.so.fontSize);
		if(that.so.fontWeight || that.so.fontStyle)
			$dlg.find("#normal").prop("checked", false);
		$dlg.find("#bold").prop("checked", that.so.fontWeight);
		$dlg.find("#italic").prop("checked", that.so.fontStyle);
		$dlg.find("textarea").css({
								"font-size": that.so.fontSize,
								"font-weight": (that.so.fontWeight)?"bolder":"normal",
								"font-style": (that.so.fontStyle)?"italic":"normal"})
							.attr("data-autogrow", "false")	// 2016.8.31 不要自動縮放textarea
							.val(('srcContent' in that.so)?that.so.srcContent:that.so.content);	//2016.12.27	Leslie	改為優先取得srcContent，第二順位為content
		
		$dlg.find("a#ok").on('click', function(event) {
			
			// 1120823 Raymond 1120562 新增檢核文字意見是否有輸入內容, 若無內容則顯示警告, 並中止後續新增簽核物件的處理
			if(!$dlg.find("textarea").val().length) {
				$dlg.find("textarea").tipAlert("請輸入文字意見");
				return;
			}
			// 1120602 Raymond 1120483 修正在第一行只有一個換行字元, 第二行才輸入其它字的文字意見, 傳送後在下一個流程點再傳送後, 第一個換行字元會消失, 導致歷史檢視中文字意見會上移的問題
			//2016.12.27	Leslie	修改後，一併異動srcContent，並依目前物件大小重新斷行
			//that.so.srcContent = $dlg.find("textarea").val();
			that.so.srcContent = $dlg.find("textarea").val().replace(/^ /, "\xA0").replace(/^[\r\n\t]+|[\r\n\t]+$/, "").replace(/^ /, "\xA0");	// 改為新增文字意見時, 立即排除首末行只有一個換行字元或數個TAB字元加一個換行字元的情況, 首行第一個字若是半形空白則替換為&nbsp;(\xA0), 以保留首行縮排的需要
			//that.so.content = $dlg.find("textarea").val();
			// 1120616 Raymond 1120283 修正文字意見的字型大小預設值非子視窗的字型大小選單項目之一時(例:文字式選用章戳), 會變成無字型大小而顯示成10pt小字型(繼承自父層元素)的問題
			//that.so.fontSize = $dlg.find("select").val();
			that.so.fontSize = $dlg.find("select").val() || that.so.fontSize;
			that.so.fontWeight = $dlg.find("#bold").prop("checked");
			that.so.fontStyle = $dlg.find("#italic").prop("checked");
			// 2015.1.22 - Raymond, 修正異動樣式與內容的是$so > div
			var $so = that.$so.find("> div:not(.ui-resizable-handle), > p").css({	//2016.12.27	Leslie	增加條件以避免抓到Resize的DIV物件,add ":not(.ui-resizable-handle)"
						"font-size": that.so.fontSize,
						"font-weight": (that.so.fontWeight)?"bolder":"normal",
						"font-style": (that.so.fontStyle)?"italic":"normal",
						"color": (that.so.color)?Util.toHtmlColor(that.so.color):"black",
						"word-break": "break-all",	//2016.12.27	Leslie	增加宣告為break-all以減少視覺上文字切字與最終結果的差異
						"-webkit-user-select": "none",
						"-moz-user-select": "none",
						"-ms-user-select": "none",
						"user-select": "none",
						"-webkit-touch-callout": "none"});
					//.html(that.so.content.replace(/\n/g, '<br>'));	//2016.12.27	Leslie	改為重新計算後再設至畫面
			// 1060629 Raymond 1060546 區別文字式選用章戳與一般文字意見, 文字式選用章戳不要切字
			//1060503	Leslie[1060208]	圖示模式下，應使用完整模式時所紀錄的寬度計算切字
			//var strCut = breakLineForTextComment(that.so.srcContent,that.$so.find("> div:not(.ui-resizable-handle), > p").css('font-size').replace('px',''),that.so.fontWeight,that.$so.width());
			//var strCut = breakLineForTextComment(that.so.srcContent,that.$so.find("> div:not(.ui-resizable-handle), > p").css('font-size').replace('px',''),that.so.fontWeight,that.so.width);
			if(that.so.type == "text") {
				//1090619	Leslie	公文開啟時，圖示模式的文字意見無寬度值，應先顯示以計算正確寬度
				let needHide = false;
				if(!$so.is(":visible")){
					needHide = true;
					$so.show();
				}
				//1061212	Leslie[1061197]	先檢核完整顯示物件是否有寬度，若否，則以原斷行內容重新計算後，再設定新斷行結果
				if(!('width' in that.so))
					//1080918	Leslie[1080788]	因應Chrome在在特定環境上會出現字型間距比其他電腦寬(CSS資訊無法取得)，修正計算方式
					//that.so.width = getMaxLenghtFromTextComment(that.so.content,that.so.fontSize.replace(/[a-z]*/ig,''),that.so.fontWeight);
					// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
					// that.so.width = getMaxLenghtFromTextComment(that.so.content,$so.get(0));
					that.so.width = getMaxLenghtFromTextComment(that.so.content,$so.eq(0));
				var strCut = breakLineForTextComment(that.so.srcContent,that.$so.find("> div:not(.ui-resizable-handle), > p").css('font-size').replace('px',''),that.so.fontWeight,that.so.width);
				// 1061026 Raymond 1060908 判斷是否改過文字意見文字, 若改過則重新設定簽核意見為此次修改的內容
				if(strCut != that.so.content) {
					// 1140922 Raymond 1140887 新增判斷機關暱稱是TPVGH(北榮)時, 改叫用setMergedTextCommentToSignComment()
					if(SSO_CONFIG.OrgNickName == "TPVGH") {
						setMergedTextCommentToSignComment();
					}
					else {
					theLogger.log("文字意見(ID:" + that.so.id + ")內容已異動, 重設簽核意見為此文字意見內容");
					// 1120406 Raymond 銓敘部序198 檢核若目前簽辦意見有內容時, 詢問取代或累加
					//theAOL.currSignComment(that.so.srcContent);	// 1100708 Raymond 1100648 配合支援分文稿記錄簽核意見功能修改, signComment->currSignComment
					var csc = theAOL.currSignComment();
					// 1121030 Raymond 1120950 啟用簽辦意見窗格功能時才詢問取代或累加, 否則恢復之前行為直接取代不詢問
					//if(typeof csc == "string" && csc.length > 0) {
					if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_PANEL") == "Y" && typeof csc == "string" && csc.length > 0) {
						// 1130909 Raymond 中榮序233 新增判斷機關暱稱是TVGH(中榮)時, 直接取代不詢問
						//if(confirm("目前簽辦意見已有內容，是否以文字意見取代？\r\n\r\n點擊「確定」取代目前簽辦意見內容\r\n點擊「取消」則累加在目前簽辦意見內容後"))
						if(SSO_CONFIG.OrgNickName == "TVGH" || confirm("目前簽辦意見已有內容，是否以文字意見取代？\r\n\r\n點擊「確定」取代目前簽辦意見內容\r\n點擊「取消」則累加在目前簽辦意見內容後"))
							theAOL.currSignComment(that.so.srcContent);
						else
							theAOL.currSignComment(csc + that.so.srcContent);
					}
					else
						theAOL.currSignComment(that.so.srcContent);
					}
				}
				//1090619	Leslie	公文開啟時，圖示模式的文字意見無寬度值，應先顯示以計算正確寬度
				if(needHide)
					$so.hide();
			}
			else {	// 1120616 Raymond 1120283 修正因文字式選用章戳也支援拖拉邊框改變寬度功能, 所以改過文字內容後也要切字
				//var strCut = that.so.srcContent;
				if(!('width' in that.so))
					//1080918	Leslie[1080788]	因應Chrome在在特定環境上會出現字型間距比其他電腦寬(CSS資訊無法取得)，修正計算方式
					//that.so.width = getMaxLenghtFromTextComment(that.so.content,that.so.fontSize.replace(/[a-z]*/ig,''),that.so.fontWeight);
					// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
					// that.so.width = getMaxLenghtFromTextComment(that.so.content,$so.get(0));
					that.so.width = getMaxLenghtFromTextComment(that.so.content,$so.eq(0));
				var strCut = breakLineForTextComment(that.so.srcContent,that.$so.find("> div:not(.ui-resizable-handle), > p").css('font-size').replace('px',''),that.so.fontWeight,that.so.width);
				// 1141009 Raymond 北榮序283 判斷是否改過文字式章戳文字, 若改過則重新設定簽核意見為此次修改的內容
				if(strCut != that.so.content) {
					if(SSO_CONFIG.OrgNickName == "TPVGH") {
						setMergedTextCommentToSignComment();
					}
					else {
						theLogger.log("文字意見(ID:" + that.so.id + ")內容已異動, 重設簽核意見為此文字意見內容");
						var csc = theAOL.currSignComment();
						if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_PANEL") == "Y" && typeof csc == "string" && csc.length > 0) {
							if(SSO_CONFIG.OrgNickName == "TVGH" || confirm("目前簽辦意見已有內容，是否以文字意見取代？\r\n\r\n點擊「確定」取代目前簽辦意見內容\r\n點擊「取消」則累加在目前簽辦意見內容後"))
								theAOL.currSignComment(that.so.srcContent);
							else
								theAOL.currSignComment(csc + that.so.srcContent);
						}
						else
							theAOL.currSignComment(that.so.srcContent);
					}
				}
			}
			that.so.content = strCut;
			// 1081217 Raymond FIX XSS
			//$so.html(strCut.replace(/\n/g, '<br>'));
			$so.text(strCut);
			
			$.modal.close();
			
			// 1130710 Raymond 1130637 已儲存過的文字意見異動後設立簽核物件已異動旗標
			if(!that.so.sessionNew)
				theAOL.getCurrFolio().soModified = true;
			
			window.scrollTo(0, 0);	// 2014.8.19 - iOS7會往上飄, 要往下拉...
		});
		$dlg.find("a#cancel").on('click', function(event) {
			$.modal.close();
			
			window.scrollTo(0, 0);	// 2014.8.19 - iOS7會往上飄, 要往下拉...
		});
		$dlg.find("select").on('change', function(event) {
			$dlg.find("textarea").css("font-size", $(this).val());
		});

		// 2019.11.18 - 1080339 Eric, attr("checked", ...) => prop("checked", ...)
		$dlg.find("#normal").on("change", function() {
			//$dlg.find("textarea").css("font-weight", "normal");
			$dlg.find("textarea").css("font-weight", "normal").css("font-style", "");
			$dlg.find("#bold").prop("checked", false).checkboxradio("refresh");
			$dlg.find("#italic").prop("checked", false).checkboxradio("refresh");
		});
		$dlg.find("#bold").on("change", function() {
			//$dlg.find("textarea").css("font-weight", "bolder");
			if($(this).prop("checked")) {
				$dlg.find("textarea").css("font-weight", "bolder");
				$dlg.find("#normal").prop("checked", false).checkboxradio("refresh");
			}
			else {
				$dlg.find("textarea").css("font-weight", "normal");
				if(!$dlg.find("#italic").prop("checked"))
					$dlg.find("#normal").prop("checked", true).checkboxradio("refresh");
			}
		});
		$dlg.find("#italic").on("change", function() {
			//$dlg.find("textarea").css("font-style", "italic");
			if($(this).prop("checked")) {
				$dlg.find("textarea").css("font-style", "italic");
				$dlg.find("#normal").prop("checked", false).checkboxradio("refresh");
			}
			else {
				$dlg.find("textarea").css("font-style", "");
				if(!$dlg.find("#bold").prop("checked"))
					$dlg.find("#normal").prop("checked", true).checkboxradio("refresh");
			}
		});
		
		/*$.get("Other/Symbol.txt", function(data, statusText, jqXHR) {
			//alert("data:" + typeof data);
			var $bar = $dlg.find(".symbolBar");
			var a = data.split("\n");
			$.each(a, function(idx, val) {
				var kv = val.trim("\r").split(",");
				var $btn = $("<a title='" + kv[1] + "' data-role='button'>" + kv[0] + "</a>").appendTo($bar);
				$btn.on("click", function(event) {
					var val = $dlg.find("textarea").eq(0).val();
					$dlg.find("textarea").eq(0).val(val + kv[0]);
				}).buttonMarkup({theme:"c"});
			});
			theLogger.log(a.length + "個符號表符號已載入!");
		});*/
		var $bar = $dlg.find(".symbolBar");
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
						var ta = $dlg.find("textarea").get(0);
						if(ta.selectionStart || ta.selectionStart == '0') {
							var startPos = ta.selectionStart;
							var endPos = ta.selectionEnd;
							ta.value = ta.value.substring(0, startPos)
								+ this.textContent
								+ ta.value.substring(endPos, ta.value.length);
							ta.selectionStart = ta.selectionEnd = startPos + 1;
						} else {
							ta.value += this.textContent;
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
		
		var w = that.$so.closest("#iso").width(),
			h = that.$so.closest("#iso").height();
		theLogger.log("檢視文字意見對話方塊, w:" + w + ",h:" + h);
		$.modal($dlg, {
			appendTo:that.$pg.closest("#iso"),
			overlayCss:{height:h, width:w},
			maxHeight:470,	// 1110513 Raymond 1110538 因新增「加蓋代字」選項而增加高度400->470
			minHeight:430,	// 1110513 Raymond 1110538 因新增「加蓋代字」選項而增加高度320->430
			autoResize:true,	// 2015.8.17 縮小文字意見輸入大小
			onShow: function() {
				// 2015.11.4 子視窗出現後隱藏指令列
				that.$pg.closest(".viewPort").data("editCursor").cmdFloat.hide();
			}
		});
		$dlg.trigger("create");
		
		$dlg.find("#signet").closest(".ui-select").hide();
		$dlg.find("#withStamp").closest(".ui-controlgroup").hide();
		$dlg.find("#dispTime").closest(".ui-controlgroup").hide();
		$dlg.find("#addProxyWord").closest(".ui-controlgroup").hide();	// 1110513 Raymond 1110538 隱藏新增的「加蓋代字」選項
		
		// 1140324 Raymond 1131303 文字意見新增錯別字校正功能
		if(theAOL.enableFixWord4TextComment == true) {
			theLogger.log("文字意見啟用錯別字校正功能");
			var guid4TSO = that.so.guid;
			$dlg.find("textarea").attr("guid", guid4TSO).errCorr({fwd: theAOL.getCurrFolio().getFixWordData(), draftGUID: theAOL.getCurrFolio().getCurrDraftInfo().guid, paraGUID: guid4TSO, srcNm: "文字意見"});
		}
	});
}

// 2016.12.27	Leslie	新增文字意見"切字"函式
function breakLineForTextComment(str,fontSize,withWeight,width){
	var rtnStr = "";
	//var weight = (withWeight)?1.009:1;	//2017.3.14	Leslie	改用新的算式，重新計算寬度
	//fontSize *= weight;
	function getWordWidth(w){
		if(w == "\r" || w == "\n") return 0;
		else if(w.match(/[\x00-\xff]/)) return 0.5 * ((withWeight)?1.04:1);	//2017.3.14	Leslie	判斷全形半形，其正、粗體字的差異量不同，需分別計算
		return 1 * ((withWeight)?1.02:1);
	}
	var line = 0;
	for(var i=0,iWord;iWord=str[i];i++){
		if(iWord == "\r" || iWord == "\n"){
			rtnStr += iWord;
			line = 0;
		}
		else if((line+=getWordWidth(iWord)*fontSize) < width ){	//2017.3.14	Leslie	不再統一"-6"
			rtnStr += iWord;
		}
		else{
			line = getWordWidth(iWord)*fontSize;
			rtnStr += "\n"+iWord;
		}
	}
	return rtnStr;
}

//2017.3.2	Leslie	新增由文字意見的結果，回算簽核物件應該長多大
//1080918	Leslie[1080788]	因應Chrome在在特定環境上會出現字型間距比其他電腦寬(CSS資訊無法取得)，修正計算方式
/*
function getMaxLenghtFromTextComment(str,fontSize,withWeight){
	//var weight = (withWeight)?1.009:1;	//2017.3.14	Leslie	改用新的算式，重新計算寬度
	//fontSize *= weight;
	var maxWidth = 0;
	function getWordWidth(w){
		if(w == "\r" || w == "\n") return 0;
		else if(w.match(/[\x00-\xff]/)) return 0.5 * ((withWeight)?1.04:1);	//2017.3.14	Leslie	判斷全形半形，其正、粗體字的差異量不同，需分別計算
		return 1 * ((withWeight)?1.02:1);
	}
	var line=0;
	for(var i=0,iWord;iWord=str[i];i++){
		line+=getWordWidth(iWord)*fontSize;
		if(iWord == "\r" || iWord == "\n"){
			if(maxWidth < line)
				maxWidth = line;
			line = 0;
		}
	}
	if(maxWidth < line)	//2017.3.6	Leslie	bugfix 最末行(單一行)寬度未正確計算的錯誤
		maxWidth = line;
	return maxWidth+1;	//2017.3.14	Leslie	精確計算寬度後，應該+1即可(避免小數點計算後無條件捨去，造成寬度小於計算切字時的計算寬度)
}*/

function getWordWidth(elm,L,W){	//以DOM標準的選取功能，來取得真實字寬，L：第幾行，W：第幾個字
	var nCnt = elm.childNodes.length;	//有多少個子節點
	var rng = document.createRange(); // Range物件, 用來選取範圍
	var iL = 0;
	var lnOffset = 0;	// 1090108 Raymond 1081145 折行字元後的位置, 次行的起點
	for(let iNode=0;iNode < nCnt;iNode++){
		if(iL == L){
			// 1090108 Raymond 1081145 同一文字節點的L行W字要從lnOffset起算
			//if(elm.childNodes[iNode].length > W){
			//	rng.setStart(elm.childNodes[iNode], W);	//選目前這行的字
			//	rng.setEnd(elm.childNodes[iNode], W+1);
			if(elm.childNodes[iNode].length > (lnOffset + W)){
				rng.setStart(elm.childNodes[iNode], lnOffset + W);	//選目前這行的字
				rng.setEnd(elm.childNodes[iNode], lnOffset + W + 1);
			}
			else{	//目前的字，在畫面要到下一個斷行去找
				let nW = W - elm.childNodes[iNode].length;
				rng.setStart(elm.childNodes[iNode+1], nW);	//選下一行的字
				rng.setEnd(elm.childNodes[iNode+1], nW + 1);
			}
			var rcs = rng.getClientRects();
			if(rcs.length)
				return rcs[0].width;
			else
				return 0;
		}
		// 1090108 Raymond 1081145 修正XSS漏洞後, 不會有BR的情況下, 判斷行數須搜尋\n
		if(elm.childNodes[iNode].textContent.substr(lnOffset).indexOf("\n") >= 0) {
			lnOffset = elm.childNodes[iNode].textContent.substr(lnOffset).indexOf("\n") + 1;
			iL++;
			iNode--;
			continue;
		}
		lnOffset = 0;	// 此文字節點中已無\n, 重設起點
		
		if(elm.childNodes[iNode].nodeName == "BR")
			iL++;	//下一行
	}
}

// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
// function getMaxLenghtFromTextComment(str,elm){
function getMaxLenghtFromTextComment(str,$elm){
	var maxWidth = 0;
	var idxLine = 0,idxWord = 0,lenLine=0;
	var wCH = 0,wEN = 0;	//紀錄全形字與半形字寬(半形字只能大約，因為有極小的差異)
	for(let i=0,iWord;iWord=str[i];i++){
		// 1090106 Raymond QuickFix for <br>
		//if(!(iWord == "\r" || iWord == "\n")){
		if(!(iWord == "\r" || iWord == "\n" || (iWord == "<" && str.substr(i, 4).match(/<br>/i)))){
			if(iWord.match(/[\x00-\xff]/)){	//半形
				if(wEN == 0)
					// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
					// wEN = getWordWidth(elm,idxLine,idxWord);
					wEN = getWordWidth($elm.get(0),idxLine,idxWord);
				lenLine += wEN;
			}
			else{	//全形
				if(wCH == 0)
					// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
					// wCH = getWordWidth(elm,idxLine,idxWord);
					wCH = getWordWidth($elm.get(0),idxLine,idxWord);
				lenLine += wCH;
			}
			idxWord++;
		}
		else{
			if(maxWidth < lenLine)
				maxWidth = lenLine;
			lenLine = 0;
			idxLine++;
			idxWord = 0;
			// 1090106 Raymond QuickFix for <br>
			if(iWord == "<" && str.substr(i, 4).match(/<br>/i))
				i+=3;
		}
	}
	// 1080109 Raymond 1081145 末行最寬時, maxWidth仍是最寬非末行的值, 導致下面的maxWidth||lenLine永遠回傳較小的maxWidth, 造成文字意見被折行
	if(maxWidth < lenLine)
		maxWidth = lenLine;
	// 1081204 Raymond 1080788 修正因縮放比小於100%時, 算出的寬度比100%小, 導致不正確折行的問題
	// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
	// if($(elm).closest(".viewPort").length > 0) {
		// var z = $(elm).closest(".viewPort").data("zoomController");
	if($elm.closest(".viewPort").length > 0) {
		var z = $elm.closest(".viewPort").data("zoomController");
		return ((maxWidth||lenLine) * 100 / z.currScale)+1;
	}
	return (maxWidth||lenLine)+1;	//1081022	Leslie	只有一行時，直接以該行長度回傳
}
//1080918	Leslie[1080788]	因應Chrome在在特定環境上會出現字型間距比其他電腦寬(CSS資訊無法取得)，修正計算方式	--END--


// 1121103 Raymond 1120881 新增第3參數, 傳入章戳rect, 判斷是否壓到簽核區域的下邊界, 除了原本的回傳值外多回傳一個壓到下邊界的簽核區域資訊
// 2017.1.18 判斷新增的簽核物件是否位於簽核區域內
//function detectSOInSignArea(pos, $pg) {
function detectSOInSignArea(pos, $pg, rcSO) {
	var incAmnt = 10;	// 1130417 Raymond 1120881 新增增高幅度預設為10mm
	function PtInArea(pos, rc) {
		var b = pos.left > rc.left && pos.left < (rc.left + rc.width) &&
				pos.top > rc.top && pos.top < (rc.top + rc.height);
		theLogger.warn("pos(" + pos.left + "," + pos.top + ") in rc(" + rc.left + "," + rc.top + "," + rc.width + "," + rc.height + ") = " + b);
		return b;
	}
	// 1121103 Raymond 1120881 新增判斷章戳rect是否壓到簽核區域的下邊界
	function RectOnLowerArea(rcSO, rc, $sa, currScale) {
		if(((rcSO.left >= rc.left && rcSO.left <= (rc.left + rc.width)) || ((rcSO.left + rcSO.width) >= rc.left && (rcSO.left + rcSO.width) <= (rc.left + rc.width))) &&
			(rcSO.top <= (rc.top + rc.height) && (rcSO.top + rcSO.height) >= (rc.top + rc.height))) {
			// 檢查簽核區域最上層表格增高10mm後會不會超出本文高度
			let $topTbl = $sa.parents("table.table").last();
			// 1130417 Raymond 1120881 以傳入的簽核物件bottom位置超出簽核區域的高度來計算應自動增高的幅度, 以10mm為一個級距
			//let pred = $topTbl.outerHeight() + (11230 / 297);
			let delta = (rcSO.top + rcSO.height) - (rc.top + rc.height);
			let deltaR = delta * 297 / 1123;
			incAmnt = Math.ceil(deltaR / 10) * 10;
			theLogger.log("簽核物件大小超出簽核區域的高度為" + delta + "px(" + deltaR + "mm), 計算後自動增高的幅度應為" + incAmnt + "mm");
			let pred = $topTbl.outerHeight() + (incAmnt * 1123 / 297);
			let maxH = $pg.find("div[name='bodyRegion']").height();
			if(pred <= maxH)
				return true;
			theLogger.warn("簽核物件壓在簽核區域(sa:" + saType + "|" + saID + ")的下邊界, 但簽核區域自動增高10mm會使外層表格高度超出本文容許高度");
		}
		return false;
	}
	// 1060511 Raymond 直接排除簽稿會核單, 簽稿會核單上加簽核物件一律視為簽核框外物件, 航港-序632
	var d = $pg.data("pg").container;
	// 1121106 Raymond 1120881 新增檢核文稿若支援簽核區域自訂高度, 且有傳入rcSO參數, 則須判斷是否壓到簽核區域的下邊界
	var detectOverlapped = false;
	if(!!rcSO) {
		var cdm = theAOL.getCurrFolio().getCachedDM(d);
		// 1141218 Raymond 北榮序453 因1140818禁止出組室過的非可發文文別異動內文, 但要對自動增高簽核區域允許異動
		//if(!!cdm && cdm.getEditable() && cdm.supportSALP()) {	// 可編輯狀態下才可自動增高
		if(!!cdm && cdm.getEditable("forSALP") && cdm.supportSALP()) {	// 可編輯狀態下才可自動增高
			detectOverlapped = true;
		}
	}
	// 1121120 Raymond 1120887 新增支援簽稿會核單的簽核區域自動增高功能
	// 1081213 Raymond 1080785 合併內政部單號1070656, 允許偵測簽稿會核單上的簽核區域, 新增環境變數WE_ALLOW_CON_KEEP_SIGNOBJ判斷是否啟用
	//if(d.docType == "簽稿會核單") {
	//if(d.docType == "簽稿會核單" && !(theSSO.User.EnvSettings.get("WE_ALLOW_CON_KEEP_SIGNOBJ") == "Y")) {
	if(d.docType == "簽稿會核單" && !(theSSO.User.EnvSettings.get("WE_ALLOW_CON_KEEP_SIGNOBJ") == "Y") && !detectOverlapped) {
		theLogger.warn("簽稿會核單上新增簽核物件一律視為簽核框外物件");
		return;
	}
	var $sa = $pg.find(".sign-area:visible");	// 2017.2.14 簽稿會核單2頁以上會有被隱藏的簽核框, 須排除之才能避免誤判為該簽核區域內, 而一起被隱藏
	if($sa.length > 0) {
		var z = $pg.closest(".viewPort").data("zoomController");
		for(var i=0; i<$sa.length; i++) {
			var saType = $sa.eq(i).attr("data-satype");
			var saID = $sa.eq(i).attr("data-id");
			var ofSA = $sa.eq(i).offset();
			var ofPg = $pg.offset();
			// 1100917 Raymond 1101028 修正偵測簽核區域範圍可能因小數點導致兩個相隣簽核區域中間有空間會被判定皆不屬性兩個簽核區域, 而記錄成框外物件的問題
			//var rc = {left: (ofSA.left - ofPg.left) * 100 / z.currScale, top: (ofSA.top - ofPg.top) * 100 / z.currScale, width: $sa.eq(i).width(), height: $sa.eq(i).height()};	// 2017.2.6 bugfix
			var rc = {left: Math.floor((ofSA.left - ofPg.left) * 100 / z.currScale), top: Math.floor((ofSA.top - ofPg.top) * 100 / z.currScale), width: Math.ceil($sa.eq(i).width()), height: Math.ceil($sa.eq(i).height())};	// 2017.2.6 bugfix
			// 1121106 Raymond 1120881 新增檢核文稿若支援簽核區域自訂高度, 且有傳入rcSO參數, 則須判斷是否壓到簽核區域的下邊界
			if(saID != "" && detectOverlapped == true && RectOnLowerArea(rcSO, rc, $sa.eq(i), z.currScale)) {
				var cdm = theAOL.getCurrFolio().getCachedDM(d);
				try {
					if(cdm.getDocType() == "簽稿會核單") {
						// 1121120 Raymond 1120887 新增支援簽稿會核單的簽核區域自動增高功能
						let ch = cdm.text("/*/會辦意見列表/會辦意見[@代碼='" + saID + "']/@簽核區域排版高度");
						if(parseInt(ch)) {
							// 1130829 Raymond 中榮序219 修正在簽稿會核單新增文字意見, 當文字意見內容很多超出簽核區域下緣時, 簽核區域只自動增高10mm(一個職名章高度), 而不是包含整個文字意見高度的增高幅度的問題
							//cdm.attr("/*/會辦意見列表/會辦意見[@代碼='" + saID + "']/@簽核區域排版高度", parseInt(ch) + 10);
							cdm.attr("/*/會辦意見列表/會辦意見[@代碼='" + saID + "']/@簽核區域排版高度", parseInt(ch) + incAmnt);
							// 1130124 Raymond 1120887 新增記錄蓋職增高的高度
							if(!cdm.salpBySignObj)
								cdm.salpBySignObj = {};
							// 1130417 Raymond 1120881 判斷增高後的高度改用可變動的數值計算
							//cdm.salpBySignObj[saID] = parseInt(ch) + 10;
							cdm.salpBySignObj[saID] = parseInt(ch) + incAmnt;
						}
					}
					else {
						let ch = cdm.text("/*/簽核區域排版屬性/高度[@ID='" + saID + "']");
						if(parseInt(ch)) {
							// 1130417 Raymond 1120881 判斷增高後的高度改用可變動的數值計算
							//cdm.text("/*/簽核區域排版屬性/高度[@ID='" + saID + "']", parseInt(ch) + 10);
							cdm.text("/*/簽核區域排版屬性/高度[@ID='" + saID + "']", parseInt(ch) + incAmnt);
						}
						// 不保留簽署物件時, 簽核區域會恢復預設高度, 故不再同步群組的高度, 以免預設高度被改成增高後的高度
						if(cdm.getReserveSO()) {
							// 檢查是否有群組設定, 有的話要同步
							try {
								let grpNm = cdm.attr("/*/簽核區域排版屬性/高度[@ID='" + saID + "']/@同步群組");
								if(!!grpNm) {
									theLogger.log("同步至群組名稱'" + grpNm + "'的高度欄位");
									let nds = cdm.nodes("/*/簽核區域排版屬性/高度[@同步群組='" + grpNm + "']");
									// 1130417 Raymond 1120881 判斷增高後的高度改用可變動的數值計算
									//$(nds).text(parseInt(ch) + 10);
									$(nds).text(parseInt(ch) + incAmnt);
								}
							}
							catch(e) {}
						}
					}
				}
				catch(e) {
					console.error(e.stack || e.message);
				}
				var res = {
					offset: {
						left: pos.left - ((ofSA.left - ofPg.left) * 100 / z.currScale),	// 2017.2.6 bugfix
						top: pos.top - ((ofSA.top - ofPg.top) * 100 / z.currScale)
					},
					refresh: true	// 強制重新整理
				}
				for(var j=0; j<cdm.signAreas.length; j++) {
					if(cdm.signAreas[j].saType == saType && cdm.signAreas[j].id == saID) {
						res.sa = cdm.signAreas[j];
						break;
					}
				}
				if("sa" in res) {
					theLogger.warn("簽核物件位於自動增高後的簽核區域內(" + pos.left + "," + pos.top + ") ->offset:(" + res.offset.left + "," + res.offset.top + ") sa:" + res.sa.saType + "|" + res.sa.id);
					// 檢查簽核區域最上層表格增高10mm後會不會超出目前頁次下邊界
					let $topTbl = $sa.eq(i).parents("table.table").last();
					// 1130417 Raymond 1120881 判斷增高後的高度改用可變動的數值計算
					//let pred = (($topTbl.offset().top - $pg.find("div[name='bodyRegion']").offset().top) * 100 / z.currScale) + $topTbl.outerHeight() + (11230 / 297);
					let pred = (($topTbl.offset().top - $pg.find("div[name='bodyRegion']").offset().top) * 100 / z.currScale) + $topTbl.outerHeight() + (incAmnt * 1123 / 297);
					let maxH = $pg.find("div[name='bodyRegion']").height();
					if(pred > maxH) {
						theLogger.warn("自動增高後的簽核框發生斷頁, 應自動翻至次頁顯示");
						res.goNextPage = true;	// 應自動翻至次頁
					}
				}
				else
					theLogger.warn("簽核物件位於自動增高後的簽核區域內(" + pos.left + "," + pos.top + ") ->offset:(" + res.offset.left + "," + res.offset.top + ") 但目前文稿物件卻找不到對應的簽核區域(saID:" + saID + ")!");
				return res;
			}
			else
			if(saID != "" && PtInArea(pos, rc)) {	// 2017.2.17 簽核區域ID若為空字串, 則為無效區域
				
				var res = {
					offset: {
						left: pos.left - ((ofSA.left - ofPg.left) * 100 / z.currScale),	// 2017.2.6 bugfix
						top: pos.top - ((ofSA.top - ofPg.top) * 100 / z.currScale)
					}
				}
				// 1060511 Raymond 移到上面先判斷文別
				//var d = $pg.data("pg").container;
				var cdm = theAOL.getCurrFolio().getCachedDM(d);
				if(!!cdm) {	// 找出對應saType及saID的簽核區域物件
					for(var j=0; j<cdm.signAreas.length; j++) {
						if(cdm.signAreas[j].saType == saType && cdm.signAreas[j].id == saID) {
							res.sa = cdm.signAreas[j];
							break;
						}
					}
				}
				if("sa" in res)
					theLogger.warn("簽核物件位於簽核區域內(" + pos.left + "," + pos.top + ") ->offset:(" + res.offset.left + "," + res.offset.top + ") sa:" + res.sa.saType + "|" + res.sa.id);
				else
					theLogger.warn("簽核物件位於簽核區域內(" + pos.left + "," + pos.top + ") ->offset:(" + res.offset.left + "," + res.offset.top + ") 找不到對應的簽核區域!");
				return res;
			}
		}
	}
}

// 1131118 Raymond 北榮序374 新增加入或移動簽核物件時座標若超出頁面時, 要拉回頁面內
function reposSO(soId, pos, posOfs, soWid, soHei, pgWid, pgHei, so) {
	var reposLeft = false, reposTop = false;
	if(pos.left < 0) {	// 初始左座標位置就在頁面外, 不太可能
		console.log("簽核物件#" + soId + "左座標(" + pos.left + ")超出頁面範圍, 拉回至0");
		let delta = 0 - pos.left;
		pos.left = 0;
		reposLeft = true;
		if(!!posOfs)	// 1131122 Raymond 北榮序374 合併內政部1131006, 修正拖拉到左邊界之外時, 回報的相對座標未更新的問題
			posOfs.left += delta;
		if(!!so && !!so.signArea) {
			console.log("簽核物件#" + so.id + "指定簽核區域(#" + so.signArea.id + "), 因拉回頁面內座標異動, 需重新偵測簽核區域");
			delete so.signArea;
		}
	}
	if(pos.top < 0) {	// 初始上座標位置就在頁面外, 不太可能
		console.log("簽核物件#" + soId + "上座標(" + pos.top + ")超出頁面範圍, 拉回至0");
		let delta = 0 - pos.top;
		pos.top = 0;
		reposTop = true;
		if(!!posOfs)	// 1131122 Raymond 北榮序374 合併內政部1131006, 修正拖拉到上邊界之外時, 回報的相對座標未更新的問題
			posOfs.top += delta;
		if(!!so && !!so.signArea) {
			console.log("簽核物件#" + so.id + "指定簽核區域(#" + so.signArea.id + "), 因拉回頁面內座標異動, 需重新偵測簽核區域");
			delete so.signArea;
		}
	}
	if(pos.left + soWid > pgWid) {
		console.log("簽核物件#" + soId + "右座標(" + pos.left + "+" + soWid + "=" + (pos.left + soWid) + ")超出頁面範圍, 拉回至" + pgWid);
		let delta = pgWid - soWid - pos.left;
		pos.left = pgWid - soWid;
		reposLeft = true;
		if(!!posOfs)
			posOfs.left += delta;
		if(!!so && !!so.signArea) {
			console.log("簽核物件#" + so.id + "指定簽核區域(#" + so.signArea.id + "), 因拉回頁面內座標異動, 需重新偵測簽核區域");
			delete so.signArea;
		}
	}
	if(pos.top + soHei > pgHei) {
		console.log("簽核物件#" + soId + "下座標(" + pos.top + "+" + soHei + "=" + (pos.top + soHei) + ")超出頁面範圍, 拉回至" + pgHei);
		let delta = pgHei - soHei - pos.top;
		pos.top = pgHei - soHei;
		reposTop = true;
		if(!!posOfs)
			posOfs.top += delta;
		if(!!so && !!so.signArea) {
			console.log("簽核物件#" + so.id + "指定簽核區域(#" + so.signArea.id + "), 因拉回頁面內座標異動, 需重新偵測簽核區域");
			delete so.signArea;
		}
	}
	return [reposLeft, reposTop];
}

// 1140317 Raymond 1131214 新增移動簽核物件從簽核區域內至外、外至內或另一個簽核區域時, 先檢查目的簽核區域的簽核物件ID, 決定移入的簽核物件應插入的順序
function MoveInSO($so, $sa) {
	var soId = $so.attr("data-id");
	if(!soId) {
		theLogger.error("移動的簽核物件無data-id屬性?");
	}
	else if(!soId.match(/X_(\d+)/)) {
		theLogger.error("移動的簽核物件data-id屬性(" + soId + ")非X_nn格式?");
	}
	else if($sa.find("> .sign-obj").length > 0) {
		var idno = soId.match(/X_(\d+)/)[1];
		var trgSO = undefined;
		$sa.find("> .sign-obj").each((idx, elm) => {
			var id = elm.getAttribute("data-id");
			if(!!id && !!id.match(/X_(\d+)/) && id.match(/X_(\d+)/)[1] > idno) {
				theLogger.log("移動的簽核物件(" + soId + ")應插入在" + id + "簽核物件前");
				trgSO = elm;
				return false;
			}
		});
		if(!!trgSO)
			return $so.insertBefore(trgSO);
	}
	return $so.appendTo($sa);
}

// 文字意見
//
function TextComment(so) {
	
	this.so = so;
	
	this.initiateSO = function($pg, options) {
		
		this.$pg = $pg;
		
		var opts = $.extend({bound: true, movable: true}, options);
		
		var upperOffset = {
			x: $pg.get(0).offsetLeft,
			y: $pg.get(0).offsetTop
		}
		var that = this;
		this.$so = $("<div class='sign-obj so-text' data-id='" + this.so.id + "' title='" + this.so.info + "'>\
<img src='image/AOL/txt_comment.bmp' style='display:" + ((this.so.asIcon)?"inline":"none")+ "'>\
<div style='display:" + ((this.so.asIcon)?"none":"block") +
		";font-family:" + ((this.so.fontName)?this.so.fontName:"標楷體") +		// 2015.6.25 新增指定字型
		";font-size:" + ((this.so.fontSize)?this.so.fontSize:"12pt") +
		";font-weight:" + ((this.so.fontWeight)?"bolder":"normal") +
		";font-style:" + ((this.so.fontStyle)?"italic":"normal") +
		";word-break:break-all" +	//2016.12.27	Leslie	增加宣告為break-all以減少視覺上文字切字與最終結果的差異
		// 1081217 Raymond FIX XSS
		//";color:" + ((this.so.color)?Util.toHtmlColor(this.so.color):"black") + "'>" + this.so.content.replace(/\n/g, '<br>') + "</div></div>")
		";color:" + ((this.so.color)?Util.toHtmlColor(this.so.color):"black") + "'></div></div>")
			//.appendTo($pg)
			//.css({left:this.so.pos.left, top:this.so.pos.top})
			.on('click', function(event) {
				that.$pg.find(".sign-obj").removeClass("so-active");
				var $this = $(this).addClass("so-active");
				var c = that.$so.closest(".viewPort").data("editCursor");
				
				var cmds = new Array();
				cmds.special = true;
				if($this.find("img").css("display") == "none") {
					cmds.push({name:"圖示顯示", func: function() {
						$this.find("div").hide();
						$this.find("img").show();
						/*for(var i=0; i<that.signObjects.length; i++) {
							if(that.signObjects[i].id == so.id) {
								that.signObjects[i].asIcon = true;
								that.signObjects.save();
								break;
							}
						}*/
						if(that.so.signArea && "offset" in that.so)	// 2017.2.15 fix for 簽核框內物件要改用offset設定位置
							that.$so.css({left:that.so.offset.left - 18, top:that.so.offset.top - 18});
						else
							that.$so.css({left:that.so.pos.left - 18, top:that.so.pos.top - 18});	// 2016.10.3 比照一代座標值是圖示中心點
						that.so.asIcon = true;
						
						// 1130710 Raymond 1130637 已儲存過的文字意見異動顯示方式後設立簽核物件已異動旗標
						if(!that.so.sessionNew)
							theAOL.getCurrFolio().soModified = true;
						
						$this.css('width','');	//2017.3.2	Leslie	切換圖示模式時，拿掉物件寬度(才不會一個小圖，後面帶一長條物件框)
						
						// 2015.11.4 - 切換顯示方式後再點選一次, 以觸發指令列正確顯示
						$this.trigger("click");
					}});
				}
				else {
					cmds.push({name:"完整顯示", func: function() {
						$this.find("img").hide();
						$this.find("div").show();
						/*for(var i=0; i<that.signObjects.length; i++) {
							if(that.signObjects[i].id == so.id) {
								that.signObjects[i].asIcon = false;
								that.signObjects.save();
								break;
							}
						}*/
						if(that.so.signArea && "offset" in that.so)	// 2017.2.15 fix for 簽核框內物件要改用offset設定位置
							that.$so.css({left:that.so.offset.left, top:that.so.offset.top});
						else
							that.$so.css({left:that.so.pos.left, top:that.so.pos.top});	// 2016.10.3 比照一代座標值是圖示中心點
						that.so.asIcon = false;
						
						// 1130710 Raymond 1130637 已儲存過的文字意見異動顯示方式後設立簽核物件已異動旗標
						if(!that.so.sessionNew)
							theAOL.getCurrFolio().soModified = true;
						
						//1080918	Leslie[1080788]	因應Chrome在在特定環境上會出現字型間距比其他電腦寬(CSS資訊無法取得)，修正計算方式
						//$this.width(getMaxLenghtFromTextComment(that.so.content,$this.find("> div:not(.ui-resizable-handle), > p").css('font-size').replace('px',''),that.so.fontWeight));	//2017.3.2	Leslie	切換完整模式時，重新設定物件寬度
						// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
						// $this.width(getMaxLenghtFromTextComment(that.so.content,$this.find('div').get(0)));	//2017.3.2	Leslie	切換完整模式時，重新設定物件寬度
						$this.width(getMaxLenghtFromTextComment(that.so.content,$this.find('div').eq(0)));	//2017.3.2	Leslie	切換完整模式時，重新設定物件寬度
						
						// 1131119 Raymond 北榮序374 新增完整顯示簽核物件超出頁面時, 要拉回頁面內
						[reposLeft, reposTop] = reposSO(that.so.id, that.so.pos, that.so.offset, that.$so.width(), that.$so.height(), that.$pg.width(), that.$pg.height());
						if(reposLeft) {
							if(that.so.signArea && "offset" in that.so)	// 2017.2.15 fix for 簽核框內物件要改用offset設定位置
								that.$so.css("left", that.so.offset.left);
							else
								that.$so.css("left", that.so.pos.left);
						}
						if(reposTop) {
							if(that.so.signArea && "offset" in that.so)	// 2017.2.15 fix for 簽核框內物件要改用offset設定位置
								that.$so.css("top", that.so.offset.top);
							else
								that.$so.css("top", that.so.pos.top);
						}
						
						// 2015.11.4 - 切換顯示方式後再點選一次, 以觸發指令列正確顯示
						$this.trigger("click");
					}});
				}
				cmds.push({name:"檢視", func: function() {
					that.showModal();
				}});
				// 1100519 Raymond 1100298 新增放大字型大小指令功能
				var availFontSizes = [8,9,10,11,12,14,16,18,20,22,24,26,28];	// 與RD-TextComment.html的字型大小選項一致
				var fs = parseInt(that.so.fontSize);
				console.assert(fs !== NaN);
				var toSmaller, toBigger;
				for(var i=0; i<availFontSizes.length; i++) {	// 正序找出小一級的字型大小選項
					if(fs > availFontSizes[i])
						toSmaller = availFontSizes[i];
				}
				for(var i=availFontSizes.length-1; i>=0; i--) {	// 倒序找出大一級的字型大小選項
					if(fs < availFontSizes[i])
						toBigger = availFontSizes[i];
				}
				if(!!toBigger) {
					cmds.push({name:"放大", func: function() {
						theLogger.log("放大字型" + that.so.fontSize + "至" + toBigger + "pt");
						that.so.fontSize = toBigger + "pt";
						that.$so.find("> div").css("font-size", that.so.fontSize);
						
						// 1130927 Raymond 中榮序237 放大、縮小或切換粗體、非粗體時, 重新依目前寬度切字, 以避免翻頁或再次載入時斷行位置與操作放大、縮小或切換粗體、非粗體時不同的問題
						var strCut = breakLineForTextComment(that.so.srcContent,that.$so.find("> div:not(.ui-resizable-handle), > p").css('font-size').replace('px',''),that.so.fontWeight,that.so.width);
						that.$so.find("> div:not(.ui-resizable-handle), > p").text(strCut);
						that.so.content = strCut;
						
						// 1130710 Raymond 1130637 已儲存過的文字意見異動字型大小後設立簽核物件已異動旗標
						if(!that.so.sessionNew)
							theAOL.getCurrFolio().soModified = true;
						
						$this.trigger("click");	// 切換顯示方式後再點選一次, 以觸發指令列正確顯示
					}});
				}
				if(!!toSmaller) {
					cmds.push({name:"縮小", func: function() {
						theLogger.log("縮小字型" + that.so.fontSize + "至" + toSmaller + "pt");
						that.so.fontSize = toSmaller + "pt";
						that.$so.find("> div").css("font-size", that.so.fontSize);
						
						// 1130927 Raymond 中榮序237 放大、縮小或切換粗體、非粗體時, 重新依目前寬度切字, 以避免翻頁或再次載入時斷行位置與操作放大、縮小或切換粗體、非粗體時不同的問題
						var strCut = breakLineForTextComment(that.so.srcContent,that.$so.find("> div:not(.ui-resizable-handle), > p").css('font-size').replace('px',''),that.so.fontWeight,that.so.width);
						that.$so.find("> div:not(.ui-resizable-handle), > p").text(strCut);
						that.so.content = strCut;
						
						// 1130710 Raymond 1130637 已儲存過的文字意見異動字型大小後設立簽核物件已異動旗標
						if(!that.so.sessionNew)
							theAOL.getCurrFolio().soModified = true;
						
						$this.trigger("click");	// 切換顯示方式後再點選一次, 以觸發指令列正確顯示
					}});
				}
				if(that.so.fontWeight) {
					cmds.push({name:"非粗體", func: function() {
						theLogger.log("取消粗體");
						that.so.fontWeight = false;
						that.$so.find("> div").css("font-weight", "normal");
						
						// 1130927 Raymond 中榮序237 放大、縮小或切換粗體、非粗體時, 重新依目前寬度切字, 以避免翻頁或再次載入時斷行位置與操作放大、縮小或切換粗體、非粗體時不同的問題
						var strCut = breakLineForTextComment(that.so.srcContent,that.$so.find("> div:not(.ui-resizable-handle), > p").css('font-size').replace('px',''),that.so.fontWeight,that.so.width);
						that.$so.find("> div:not(.ui-resizable-handle), > p").text(strCut);
						that.so.content = strCut;
						
						// 1130710 Raymond 1130637 已儲存過的文字意見異動粗體樣式後設立簽核物件已異動旗標
						if(!that.so.sessionNew)
							theAOL.getCurrFolio().soModified = true;
						
						$this.trigger("click");	// 切換顯示方式後再點選一次, 以觸發指令列正確顯示
					}});
				}
				else {
					cmds.push({name:"粗體", func: function() {
						theLogger.log("設為粗體");
						that.so.fontWeight = true;
						that.$so.find("> div").css("font-weight", "bolder");
						
						// 1130927 Raymond 中榮序237 放大、縮小或切換粗體、非粗體時, 重新依目前寬度切字, 以避免翻頁或再次載入時斷行位置與操作放大、縮小或切換粗體、非粗體時不同的問題
						var strCut = breakLineForTextComment(that.so.srcContent,that.$so.find("> div:not(.ui-resizable-handle), > p").css('font-size').replace('px',''),that.so.fontWeight,that.so.width);
						that.$so.find("> div:not(.ui-resizable-handle), > p").text(strCut);
						that.so.content = strCut;
						
						// 1130710 Raymond 1130637 已儲存過的文字意見異動粗體樣式後設立簽核物件已異動旗標
						if(!that.so.sessionNew)
							theAOL.getCurrFolio().soModified = true;
						
						$this.trigger("click");	// 切換顯示方式後再點選一次, 以觸發指令列正確顯示
					}});
				}
				cmds.push({name:"刪除", func: function() {
					/*theLogger.log("刪除SO:'" + so.id + "' of " + that.signObjects.length);
					for(var i=0; i<that.signObjects.length; i++) {
						theLogger.log("[" + i + "]:" + that.signObjects[i].id + "(" + (that.signObjects[i].id == so.id) + ")");
						if(that.signObjects[i].id == so.id) {
							that.signObjects.remove(i, 1);
							break;
						}
					}
					theLogger.log("SO:" + that.signObjects.length);*/
					$this.remove();
					if(that.so.boundTo !== undefined && that.so.bounded) {
						that.so.boundTo.delSignObj(that.so);
					}
					// 1100514 Raymond 1100298 若文字意見有記錄被取代之他流程文字意見, 則在刪除時, 恢復他流程文字意見顯示
					if(!!that.so.substObjId) {
						if($("div.so-text[data-id='" + that.so.substObjId + "']").length)
							$("div.so-text[data-id='" + that.so.substObjId + "']").show();
					}
					// 2015.11.4 - 刪除後無對象, 隱藏指令列
					c.cmdFloat.hide();
			   }});
				
				c.cmdFloat.setCmds(cmds);
				c.cmdFloat.setElem(this);
				return false;
			}).resizable({	//2016.12.27	Leslie	加上jQueryUI.Resize()，增加可控制寬度
				handles: "e",
				start: function(event,ui){
					var srcContent = that.so.content;
					if('srcContent' in that.so)
						srcContent = that.so.srcContent;
					else
						that.so.srcContent = srcContent;
					// 1081217 Raymond FIX XSS
					//that.$so.find("> div:not(.ui-resizable-handle), > p").html(srcContent.replace(/\n/g, '<br>'));
					that.$so.find("> div:not(.ui-resizable-handle), > p").text(srcContent);
				},
				stop: function(event,ui){
					theLogger.log("文字意見新寬度："+ui.size.width);
					// 1131119 Raymond 北榮序374 新增拖拉簽核物件右邊框超出頁面時, 要拉回頁面內
					let cw;
					if(that.so.pos.left + ui.size.width > that.$pg.width()) {
						cw = that.$pg.width() - that.so.pos.left;
						console.log("寬度超出頁面範圍, 縮回為" + cw);
						ui.size.width = cw;
						that.$so.css("width", cw);
					}
					var srcContent = that.so.content;
					if('srcContent' in that.so)
						srcContent = that.so.srcContent;
					else
						that.so.srcContent = srcContent;
					var strCut = breakLineForTextComment(srcContent,that.$so.find("> div:not(.ui-resizable-handle), > p").css('font-size').replace('px',''),that.so.fontWeight,ui.size.width);
					// 1081217 Raymond FIX XSS
					//that.$so.find("> div:not(.ui-resizable-handle), > p").html(strCut.replace(/\n/g, '<br>'));
					that.$so.find("> div:not(.ui-resizable-handle), > p").text(strCut);
					that.so.content = strCut;
					that.so.width = ui.size.width;	//2016.12.29	Leslie	記錄目前寬度
					
					// 1130710 Raymond 1130637 已儲存過的文字意見異動寬度後設立簽核物件已異動旗標
					if(!that.so.sessionNew)
						theAOL.getCurrFolio().soModified = true;
					
					// 1130417 Raymond 1120881 調整文字意見寬度時導致文字意見高度變化, 重新偵測文字意見所在簽核區域並傳入文字意見大小, 若文稿支援簽核區域排版屬性時, 文字意見大小壓到目前所在簽核區域下邊界時將自動增高
					var _w = that.$so.find("div").eq(0).width(),
						_h = that.$so.find("div").eq(0).height();
					var res = detectSOInSignArea(that.so.pos, that.$pg, {left: that.so.pos.left, top: that.so.pos.top, width: _w, height: _h});
					// 1130704 Raymond 序139 修正在來文或附件上調整文字意見寬度時, 會發生Error的問題
					// 1130417 Raymond 1120881 若回傳值指定須refresh, 則refresh並返回
					//if(res.refresh == true) {
					if(!!res && res.refresh == true) {
						if(res.goNextPage == true) {
							let fv = that.$pg.closest(".viewPort").data("view");
							fv.goToPage(fv.currPo() + 1);
						}
						else
							that.$pg.closest(".pages").flip("refresh");
					}
				}
			});
		// 1131119 Raymond 北榮序374 新增加入簽核物件時座標若超出頁面時, 要拉回頁面內
		var soW, soH;
		if(this.so.asIcon) {
			soW = 36;
			soH = 36;
		}
		else {
			var fh = this.so.fontSize.replace("pt", "") * 4 / 3,	// 1個字的高度
				th = fh, tw = 0, lw = 0;
			if("width" in this.so) {
				// 1131128 Raymond 北榮序403 修正新增的文字意見儲存後再開啟, 拉到頁面範圍內中間位置, 再點其它頁面外按鈕重整頁面時, 文字意見會變成超出右邊界再拉回的位置的問題
				//soW = this.so.width;
				soW = Number(this.so.width);
				this.$so.width(soW);
				let strCut = breakLineForTextComment(this.so.srcContent, this.$so.find("> div:not(.ui-resizable-handle), > p").css("font-size").replace("pt", "") * 4 / 3, this.so.fontWeight, this.so.width);	// 未加入DOM前, $.css("font-size")不會回傳px
				// 計算選用章戳文字的寬度及高度
				for(var i=0; i<strCut.length; i++) {
					if(strCut[i].match(/[\x0-\xff]/))	// 半形
						lw += (fh / 2);
					else if(strCut[i].match(/[\r\n]/)) {	// 折行
						if(i > 0 && strCut[i] == "\n" && strCut[i-1] == "\n")
							console.log("skip \\n\\n");
						else {
							th += fh;
							tw = Math.max(tw, lw);
							lw = 0;
						}
					}
					else
						lw += fh;
				}
				// 1131128 Raymond 北榮序403 修正新增字長不滿一行預設寬度的文字意見時, 拉出右邊界被自動拉回後, 再點其它頁面外按鈕重整頁面時, 文字意見會變成以預設寬度再拉回的位置的問題
				if(tw == 0)	// tw為0表示只有一行字
					soW = lw;
				else if((tw + 1) < soW)	// 2行以上的文字意見計算出文字寬度+誤差1px小於預設寬度時, 以文字寬度為判斷超出頁面的基準
					soW = tw;
				/* TODO:如果計算斷行後的寬度小於預設寬度, 將width改設為計算斷行後的寬度
				let tolerance = 3;
				if(this.so.width > (tw + tolerance)) {
					console.log("初始化文字意見的寬度(" + this.so.width + ")大於實際內容所佔寬度(" + tw + ")" + tolerance + "px以上, 縮小文字意見寬度至" + (tw + tolerance) + "px");
					this.so.width = tw + tolerance;
					this.$so.width(tw + tolerance);
				}*/
			}
			else {
				soW = getMaxLenghtFromTextComment(this.so.content, this.$so.find("div").eq(0));
				this.$so.width(soW);
				this.$so.find("> div:not(.ui-resizable-handle), > p").text(this.so.content);
				soH = this.$so.height();
				// 計算選用章戳文字的寬度及高度
				for(var i=0; i<this.so.content.length; i++) {
					if(this.so.content[i].match(/[\x0-\xff]/))	// 半形
						lw += (fh / 2);
					else if(this.so.content[i].match(/[\r\n]/)) {	// 折行
						if(i > 0 && this.so.content[i] == "\n" && this.so.content[i-1] == "\n")
							console.log("skip \\n\\n");
						else {
							th += fh;
							tw = Math.max(tw, lw);
							lw = 0;
						}
					}
					else
						lw += fh;
				}
			}
			//soW = Math.max(tw, lw);
			soH = th;
		}
		reposSO(this.so.id, this.so.pos, undefined, soW, soH, this.$pg.width(), this.$pg.height(), this.so);
		// 2015.5.27 指定容器元素
		if(this.so.signArea) {
			theLogger.log("簽核物件屬於簽核區域");
			if("offset" in this.so) {	// 2015.6.16 新增判斷offset, 此數值已是相對於簽核區域的座標值
				//if(this.so.asIcon == true)	// 2016.10.13 修正圖示模式時pos要視為中心點問題
				//	this.$so.appendTo(this.so.signArea.$area).css({left: this.so.offset.left - 18, top: this.so.offset.top - 18});
				//else
				//	this.$so.appendTo(this.so.signArea.$area).css({left: this.so.offset.left, top: this.so.offset.top});
				// 2017.1.18 改從$pg找相符的signArea
				//this.$so.appendTo(this.so.signArea.$area).css({left: this.so.offset.left, top: this.so.offset.top});
				var $sa = $pg.find(".sign-area").filter(function(idx, elm) {
					if($(elm).attr("data-satype") == that.so.signArea.saType &&
						$(elm).attr("data-id") == that.so.signArea.id &&
						$(elm).attr("id") == that.so.signArea.psudoId)	// 2017.2.17 為了修正簽稿會核單有2個以上空ID問題而額外判斷
						return true;
					return false;
				});
				// 1060718 Raymond 1060610/1060632 新增是否位於簽核區域內屬性
				//this.$so.appendTo($sa).css({left: this.so.offset.left - (this.so.asIcon == true?18:0), top: this.so.offset.top - (this.so.asIcon == true?18:0)});
				this.$so.appendTo($sa).css({left: this.so.offset.left - ((this.so.asIcon)?18:0), top: this.so.offset.top - ((this.so.asIcon)?18:0)}).attr("data-oor", "false");
				// 2015.10.22 修正絕對座標
				var saOff = $sa.offset(),	// 2017.1.18 改用$sa
					pgOff = $pg.offset();
				// 2015.10.28 如果有縮放控制的話要套用
				var $viewPort = $pg.closest(".viewPort"),	// 2017.1.18 改用$pg
					z = $viewPort.data("zoomController");
				// 1070504 Raymond 1070447 修正在非100%原尺寸縮放率時儲存, 會誤判文字意見的絕對座標值不符並改為錯誤的絕對座標值問題
				//if((Math.ceil(this.so.offset.top + saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100)) != Math.ceil(this.so.pos.top)) {
				//	theLogger.warn("依相對簽核區域位移修正絕對座標: top:" + this.so.pos.top + " -> " + (Math.ceil(this.so.offset.top + saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100)));
				//	this.so.pos.top = (Math.ceil(this.so.offset.top + saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100));
				//}
				if(Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))) != Math.ceil(this.so.pos.top)) {
					theLogger.warn("依相對簽核區域位移修正絕對座標: top:" + this.so.pos.top + " -> " + Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))));
					this.so.pos.top = Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100)));
					this.so.pos.left = Math.ceil(this.so.offset.left + ((saOff.left - pgOff.left) * 100 / ((z !== undefined)?z.currScale:100)));
				}
			}
			else {
				theLogger.error("簽核物件(ID:" + this.so.id + ")屬於簽核區域內物件, 卻無相對位置資訊");	// 2017.1.18 增加例外說明
				var ctnrPos = this.so.signArea.$area.position();
				// 1060718 Raymond 1060610/1060632 新增是否位於簽核區域內屬性
				//if(this.so.asIcon == true)	// 2016.10.13 修正圖示模式時pos要視為中心點問題
				//	this.$so.appendTo(this.so.signArea.$area).css({left: this.so.pos.left - ctnrPos.left - 18, top: this.so.pos.top - ctnrPos.top - 18});
				//else
				//	this.$so.appendTo(this.so.signArea.$area).css({left: this.so.pos.left - ctnrPos.left, top: this.so.pos.top - ctnrPos.top});
				this.$so.appendTo(this.so.signArea.$area).css({left: this.so.pos.left - ctnrPos.left - ((this.so.asIcon)?18:0), top: this.so.pos.top - ctnrPos.top - ((this.so.asIcon)?18:0)}).attr("data-oor", "false");
			}
		}
		else {
			var res = detectSOInSignArea(this.so.pos, $pg);	// 2017.1.18 判定起始點是否位於簽核區域內, 是則以簽核區域內物件視之
			if(!!res) {
				this.so.signArea = res.sa;
				this.so.offset = res.offset;
				this.so.saType = res.sa.saType;	// 2017.2.6 bugfix
				this.so.saID = res.sa.id;
				// 從$pg找相符的signArea
				var $sa = $pg.find(".sign-area").filter(function(idx, elm) {
					if($(elm).attr("data-satype") == res.sa.saType &&
						$(elm).attr("data-id") == res.sa.id &&
						$(elm).attr("id") == res.sa.psudoId)	// 2017.2.17 為了修正簽稿會核單有2個以上空ID問題而額外判斷
						return true;
					return false;
				});
				// 1060718 Raymond 1060610/1060632 新增是否位於簽核區域內屬性
				//this.$so.appendTo($sa).css({left: this.so.offset.left - (this.so.asIcon == true?18:0), top: this.so.offset.top - (this.so.asIcon == true?18:0)});
				this.$so.appendTo($sa).css({left: this.so.offset.left - ((this.so.asIcon)?18:0), top: this.so.offset.top - ((this.so.asIcon)?18:0)}).attr("data-oor", "false");
				// 更新此簽核物件的類型為簽核區域內物件
				theAOL.getCurrFolio().getSignFolder().xSignFolder().updateSignObj(this.so);
				/* 2015.10.22 修正絕對座標
				var saOff = this.so.signArea.$area.offset(),
					pgOff = $pg.offset();
				// 2015.10.28 如果有縮放控制的話要套用
				var $viewPort = this.so.signArea.$area.closest(".viewPort"),
					z = $viewPort.data("zoomController");
				if(Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))) != Math.ceil(this.so.pos.top)) {
					theLogger.warn("依相對簽核區域位移修正絕對座標: top:" + this.so.pos.top + " -> " + Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))));
					this.so.pos.top = Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100)));
					this.so.pos.left = Math.ceil(this.so.offset.left + ((saOff.left - pgOff.left) * 100 / ((z !== undefined)?z.currScale:100)));
				}*/
			}
			else {
				// 1060718 Raymond 1060610/1060632 新增是否位於簽核區域內屬性
				//if(this.so.asIcon == true)	// 2016.10.13 修正圖示模式時pos要視為中心點問題
				//	this.$so.appendTo($pg).css({left:this.so.pos.left - 18, top:this.so.pos.top - 18});
				//else
				//	this.$so.appendTo($pg).css({left:this.so.pos.left, top:this.so.pos.top});
				this.$so.appendTo($pg).css({left: this.so.pos.left - ((this.so.asIcon)?18:0), top: this.so.pos.top - ((this.so.asIcon)?18:0)}).attr("data-oor", "true");
			}
			/* 2013.10.8 - Raymond, tooltip沒用
			.on("touchstart", function(event) {
				if(this.hasAttribute("title")) {
					if(that.$tooltip !== undefined)
						that.$tooltip.remove();
					var $this = $(this);
					var pos = Util.getRelativeOffset(this, $this.closest(".viewPort").get(0));
					that.$tooltip = $("<div class='ui-bar-e tooltip'>" + this.title.replace("\n", "<br>") + "</div>")
									.appendTo($this.closest(".viewPort"))
									.css({left:pos.left, top:pos.top})
									.fadeIn();
					if(that.toolTipTimerId != null)
						clearTimeout(that.toolTipTimerId);
					that.toolTipTimerId = setTimeout(function() {
						that.toolTipTimerId = null;
						that.$tooltip.fadeOut();
					}, 5000);
				}
			});*/
		}
		if(opts.movable) {
			this.$so.movable({
				target: this,	// 2017.2.2 新增指定callback的目標為此物件
				//baseOffset: getRealPosition(that.$page.get(0)),
				//upperOffset: upperOffset,
				beforeMove: function(param) {
					param.scale = this.$pg.closest(".viewPort").data("zoomController").currScale / 100;
					this.$pg.closest(".viewPort").data("editCursor").cmdFloat.hide();
					//$(this).addClass("so-active");
					if(this.so.signArea) {	// 2015.5.29 新增判斷是否屬於簽核區域
						// 2017.1.18 改從$pg找相符的signArea
						var saType = this.so.signArea.saType;
						var saID = this.so.signArea.id;
						var $sa = this.$pg.find(".sign-area").filter(function(idx, elm) {
							if($(elm).attr("data-satype") == saType &&
								$(elm).attr("data-id") == saID)
								return true;
							return false;
						});
						param.baseOffset = $sa.offset();
					}
					else
						param.baseOffset = this.$pg.offset();    // 2013.9.13 - Raymond, 移動前重取$pg的相對座標
					param.baseOffset2 = this.$pg.offset();	// 2017.2.2 設定第2組baseOffset, 使afterMove回呼函式被呼叫時, 多傳入有效的第2組頁座標值
					// 1140815 Raymond 1141030 修正Firefox的PointerId是0不是1, 傳入1會發生Error導致無法拖拉物件的問題
					if(navigator.userAgent.indexOf("Firefox") >= 0)
						this.$so.get(0).setPointerCapture(0);
					else
					// 1131119 Raymond 北榮序374 新增鎖定滑鼠, 以免拖拉簽核物件超出頁面時, 偵測不到mousemove、vmouseup等事件
					this.$so.get(0).setPointerCapture(1);
				},
				afterMove: function(pos, pos2, param) {	// 2017.2.2 新增pos2及param參數
					/*for(var i=0; i<that.signObjects.length; i++) {
						if(that.signObjects[i].id == so.id) {
							that.signObjects[i].pos.x = parseInt($(this).css("left"));
							that.signObjects[i].pos.y = parseInt($(this).css("top"));
							that.signObjects.save();
							break;
						}
					}*/
					/*if(that.so.signArea) {	// 2015.5.29 新增判斷是否屬於簽核區域
						// 2017.1.18 改從$pg找相符的signArea
						var $sa = that.$pg.find(".sign-area").filter(function(idx, elm) {
							if($(elm).attr("data-satype") == that.so.signArea.saType &&
								$(elm).attr("data-id") == that.so.signArea.id)
								return true;
							return false;
						});
						var ctnrPos = $sa.position();	// 2017.1.18 改用$sa
						theLogger.log("\t$area.position()=" + ctnrPos.left + "," + ctnrPos.top);
						that.so.offset = pos;	// movable外掛回傳的是相對於container的座標, 要寫在offset
						that.so.pos.left = Math.ceil(pos.left + ctnrPos.left);	// pos記錄的是相對於page的座標
						that.so.pos.top = Math.ceil(pos.top + ctnrPos.top);
						// 2015.11.24 修正絕對座標
						var saOff = $sa.offset(),	// 2017.1.18 改用$sa
							pgOff = that.$pg.offset();
						// 要套用縮放控制
						var $viewPort = that.$pg.closest(".viewPort"),	// 2017.1.18 改用$pg
							z = $viewPort.data("zoomController");
						if(Math.ceil(that.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))) != Math.ceil(that.so.pos.top)) {
							theLogger.warn("依相對簽核區域位移修正絕對座標: top:" + that.so.pos.top + " -> " + Math.ceil(that.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))));
							that.so.pos.top = Math.ceil(that.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100)));
							that.so.pos.left = Math.ceil(that.so.offset.left + ((saOff.left - pgOff.left) * 100 / ((z !== undefined)?z.currScale:100)));
						}
						if(that.so.asIcon == true) {	// 2016.10.13 修正移動時pos變成左上角問題
							that.so.pos.left += 18;
							that.so.pos.top += 18;
						}
					}
					else {
						if(that.so.asIcon == true)	// 2016.10.13 修正移動時pos變成左上角問題
							that.so.pos = {left: pos.left + 18, top: pos.top + 18};
						else
							that.so.pos = pos;
					}*/
					// 1140815 Raymond 1141030 修正Firefox的PointerId是0不是1, 傳入1會發生Error導致無法拖拉物件的問題
					if(navigator.userAgent.indexOf("Firefox") >= 0)
						this.$so.get(0).releasePointerCapture(0);
					else
					// 1131119 Raymond 北榮序374 新增解除鎖定滑鼠
					this.$so.get(0).releasePointerCapture(1);
					// 1080227 Raymond 1070813 修正新增文字意見後文字內容長度不長, 但預設寬度很長, 拖拉到簽核框靠右方位置, 可能被判定中心點在框外, 而在傳送後再異動過內文後不會顯示的問題
					// 2017.2.2 判定拖拉結束點是否位於簽核區域內, 是則以簽核區域內物件視之
					// 1060718 Raymond 1060610/1060632 新增判斷是否為貼式數位墨水物件, 是則加回圖示置中所減掉的位移量, 否則加影像大小除以2做為中心點座標
					//var posCt = {left: pos2.left + (this.$so.width() / 2), top: pos2.top + (this.$so.height() / 2)};	// 用中心點當判定標的
					//var posCt = {left: pos2.left + ((this.so.asIcon)?18:(this.$so.width() / 2)), top: pos2.top + ((this.so.asIcon)?18:(this.$so.height() / 2))};	// 用中心點當判定標的
					var ctxWidth = 0;
					if(!this.so.asIcon) {
						ctxWidth = this.$so.find("div").eq(0).css("display", "inline-block").width();	// 先調成inline-block, 讓文字長度短於SO寬度的部分可以讀出真實的所佔寬度
						this.$so.find("div").eq(0).css("display", "block");	// 再恢復成block, 佔全寬
						//theLogger.warn("移動文字意見 -- ctxWidth:" + ctxWidth + ", soWidth:" + this.$so.width());
					}
					// 1131119 Raymond 北榮序374 新增拖拉簽核物件超出頁面時, 要拉回頁面內
					[reposLeft, reposTop] = reposSO(this.so.id, pos2, pos, ((!this.so.asIcon)?ctxWidth:this.$so.width()), this.$so.height(), this.$pg.width(), this.$pg.height());
					if(reposLeft)
						this.$so.css("left", pos2.left + "px");
					if(reposTop)
						this.$so.css("top", pos2.top + "px");
					var posCt = {left: pos2.left + ((this.so.asIcon)?18:(ctxWidth / 2)), top: pos2.top + ((this.so.asIcon)?18:(this.$so.height() / 2))};	// 用中心點當判定標的
					// 1130417 Raymond 1120881 新增文字意見物件時, 多傳入文字意見大小, 若文稿支援簽核區域排版屬性時, 文字意見大小壓到目前點擊的簽核區域下邊界時將自動增高
					//var res = detectSOInSignArea(posCt, this.$pg);
					var _w = (this.so.asIcon)?36:ctxWidth,
						_h = (this.so.asIcon)?36:this.$so.find("div").eq(0).height();
					var res = detectSOInSignArea(posCt, $pg, {left: pos2.left, top: pos2.top, width: _w, height: _h});
					if(!!res) {
						var z = this.$pg.closest(".viewPort").data("zoomController");	// 2017.2.6 移到上面
						if("signArea" in this.so &&
							this.so.saType == res.sa.saType && this.so.saID == res.sa.id) {
							theLogger.warn("簽核物件拖拉簽核框內->內(同區域)");
							// 從$pg找相符的signArea
							var $sa = this.$pg.find(".sign-area").filter(function(idx, elm) {
								if($(elm).attr("data-satype") == res.sa.saType &&
									$(elm).attr("data-id") == res.sa.id)
									return true;
								return false;
							});
							// 1091026 Raymond 1090735 修正簽核區域在下邊界區時, 因計算簽核區域相對於頁面的座標錯誤, 導致拖拉簽核物件由外至內會發生簽核物件跑到整個頁面之外的問題
							//var ctnrPos = $sa.position();	// 2017.1.18 改用$sa
							var pgOffset = $sa.closest(".pg").offset();
							var ctnrPos = {left: param.baseOffset.left - pgOffset.left, top: param.baseOffset.top - pgOffset.top};
							theLogger.log("\t$area.position()=" + ctnrPos.left + "," + ctnrPos.top);
							theLogger.log("\tso.offset=" + this.so.offset.left + "," + this.so.offset.top + "  ->" + (pos.left) + "," + (pos.top));
							// 1060718 Raymond 1060610/1060632 新增判斷是否為貼式數位墨水物件, 是則加回圖示置中所減掉的位移量
							//this.so.offset = {left: pos.left, top: pos.top};	// movable外掛回傳的pos是相對於container的座標, 要寫在offset
							this.so.offset = {left: pos.left + ((this.so.asIcon)?18:0), top: pos.top + ((this.so.asIcon)?18:0)};	// movable外掛回傳的pos是相對於container的座標, 要寫在offset
							// 1131119 Raymond 北榮序374 本來在同一簽核區域內的簽核物件拖拉超出頁面時, 被拉回頁面內後, 偵測仍位於同一簽核區域時, 要重設為簽核區域內的相對座標
							if(reposLeft)
								this.$so.css("left", (res.offset.left - (((!this.so.asIcon)?ctxWidth:this.$so.width()) / 2)) + "px");
							if(reposTop)
								this.$so.css("top", (res.offset.top - (this.$so.height() / 2)) + "px");
							theLogger.log("\tso.pos=" + this.so.pos.left + "," + this.so.pos.top + "  ->" + (pos.left + ctnrPos.left) + "," + (pos.top + ctnrPos.top) + " pos2=" + pos2.left + "," + pos2.top);
							this.so.pos.left = Math.ceil(pos.left + ctnrPos.left);	// pos記錄的是相對於page的座標
							this.so.pos.top = Math.ceil(pos.top + ctnrPos.top);
							// 1131122 Raymond 北榮序374 合併內政部1131006, 修正從簽核區域內向左拖拉出頁面範圍外時, 拉回的頁面絕對座標位置會是-1的問題
							if(this.so.pos.left < 0) {
								this.so.offset.left -= this.so.pos.left;
								this.so.pos.left = 0;
								theLogger.log("因拉回後的水平絕對座標小於0, 再拉回超出頁面部分的距離: so.pos.left=" + this.so.pos.left + ", so.offset.left=" + so.offset.left);
							}
							if(this.so.pos.top < 0) {
								this.so.offset.top -= this.so.pos.top;
								this.so.pos.top = 0;
								theLogger.log("因拉回後的垂直絕對座標小於0, 再拉回超出頁面部分的距離: so.pos.top=" + this.so.pos.top + ", so.offset.top=" + so.offset.top);
							}
							// 2015.11.24 修正絕對座標
							var saOff = $sa.offset(),	// 2017.1.18 改用$sa
								pgOff = this.$pg.offset();
							// 要套用縮放控制
							//var $viewPort = this.$pg.closest(".viewPort"),	// 2017.1.18 改用$pg
							//	z = $viewPort.data("zoomController");
							if(Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))) != Math.ceil(this.so.pos.top)) {
								theLogger.warn("依相對簽核區域位移修正絕對座標: top:" + this.so.pos.top + " -> " + Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))));
								this.so.pos.top = Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100)));
								this.so.pos.left = Math.ceil(this.so.offset.left + ((saOff.left - pgOff.left) * 100 / ((z !== undefined)?z.currScale:100)));
							}
						}
						else {
							if("signArea" in this.so)
								theLogger.warn("簽核物件拖拉簽核框內->內(不同區域)");
							else
								theLogger.warn("簽核物件拖拉簽核框外->內");
							this.so.signArea = res.sa;
							this.so.offset = {left: res.offset.left, top: res.offset.top};
							this.so.saType = res.sa.saType;
							this.so.saID = res.sa.id;
							var $sa = this.$pg.find(".sign-area").filter(function(idx, elm) {
								if($(elm).attr("data-satype") == res.sa.saType &&
									$(elm).attr("data-id") == res.sa.id)
									return true;
								return false;
							});
							param.baseOffset = $sa.offset();	// 重設baseOffset
							
							// 1091023 Raymond 1090735 修正簽核區域在下邊界區時, 因計算簽核區域相對於頁面的座標錯誤, 導致拖拉簽核物件由外至內會發生簽核物件跑到整個頁面之外的問題
							//var ctnrPos = $sa.position();	// 2017.1.18 改用$sa
							var pgOffset = $sa.closest(".pg").offset();
							var ctnrPos = {left: param.baseOffset.left - pgOffset.left, top: param.baseOffset.top - pgOffset.top};
							this.so.pos = {left: pos2.left, top: pos2.top};	// 頁座標用回呼的pos2
							this.so.offset = {
								left: Math.ceil(pos2.left - (ctnrPos.left * 100 / z.currScale)),	// 2017.2.6 套用縮放比例
								top: Math.ceil(pos2.top - (ctnrPos.top * 100 / z.currScale))
							};
							// 1140317 Raymond 1131214 新增移動簽核物件從簽核區域內至外、外至內或另一個簽核區域時, 先檢查目的簽核區域的簽核物件ID, 決定移入的簽核物件應插入的順序
							// 1060718 Raymond 1060610/1060632 修正圖示狀態下由框外拉至框內時, 相對座標未減去圖示置中的座標差問題並新增是否位於簽核區域內屬性
							//this.$so.appendTo($sa).css(this.so.offset);	// 重設parent及相對位置
							//this.$so.appendTo($sa).css({left: this.so.offset.left - (this.so.asIcon?18:0), top: this.so.offset.top - (this.so.asIcon?18:0)}).attr("data-oor", "false");	// 重設parent、相對位置及是否位於簽核區域內屬性
							MoveInSO(this.$so, $sa).css({left: this.so.offset.left - (this.so.asIcon?18:0), top: this.so.offset.top - (this.so.asIcon?18:0)}).attr("data-oor", "false");	// 重設parent、相對位置及是否位於簽核區域內屬性
							// 1131122 Raymond 北榮序374 合併內政部1131006, 修正從簽核區域內拖拉到頁面範圍外時, 指令列停留在頁面範圍外的問題
							if(reposLeft || reposTop)
								this.$so.trigger("click");
						}
						if(this.so.asIcon == true) {	// 2016.10.13 修正移動時pos變成左上角問題
							this.so.pos.left += 18;
							this.so.pos.top += 18;
						}
					}
					else {
						if("signArea" in this.so) {
							theLogger.warn("簽核物件拖拉簽核框內->外");
							if(this.so.asIcon == true)	// 2016.10.13 修正移動時pos變成左上角問題
								this.so.pos = {left: pos2.left + 18, top: pos2.top + 18};
							else
								this.so.pos = {left: pos2.left, top: pos2.top};
							// 1140317 Raymond 1131214 新增移動簽核物件從簽核區域內至外、外至內或另一個簽核區域時, 先檢查目的簽核區域的簽核物件ID, 決定移入的簽核物件應插入的順序
							// parent改成$pg
							// 1060718 Raymond 1060610/1060632 新增是否位於簽核區域內屬性
							//this.$so.appendTo(this.$pg).css(this.so.pos);	// 重設parent及相對位置
							//this.$so.appendTo(this.$pg).css({left: this.so.pos.left - ((this.so.asIcon)?18:0), top: this.so.pos.top - ((this.so.asIcon)?18:0)}).attr("data-oor", "true");	// 重設parent、相對位置及是否位於簽核區域內屬性, 修正圖示在移動後未置中問題
							MoveInSO(this.$so, this.$pg).css({left: this.so.pos.left - ((this.so.asIcon)?18:0), top: this.so.pos.top - ((this.so.asIcon)?18:0)}).attr("data-oor", "true");	// 重設parent、相對位置及是否位於簽核區域內屬性, 修正圖示在移動後未置中問題
							// 刪除signArea及offset
							delete this.so.saType;
							delete this.so.saID;
							delete this.so.signArea;
							delete this.so.offset;
							// 1131122 Raymond 北榮序374 合併內政部1131006, 修正從簽核區域內拖拉到頁面範圍外時, 指令列停留在頁面範圍外的問題
							if(reposLeft || reposTop)
								this.$so.trigger("click");
						}
						else {
							theLogger.warn("簽核物件拖拉簽核框外->外");
							if(this.so.asIcon == true)	// 2016.10.13 修正移動時pos變成左上角問題
								// 1131122 Raymond 北榮序374 合併內政部1131006, 修正從簽核區域外拖拉到頁面範圍外時, SignWork.xml及XSignObjs.xml記錄座標是負值的問題
								//this.so.pos = {left: pos.left + 18, top: pos.top + 18};
								this.so.pos = {left: pos2.left + 18, top: pos2.top + 18};
							else
								// 1131122 Raymond 北榮序374 合併內政部1131006, 修正從簽核區域外拖拉到頁面範圍外時, SignWork.xml及XSignObjs.xml記錄座標是負值的問題
								//this.so.pos = {left: pos.left, top: pos.top};
								this.so.pos = {left: pos2.left, top: pos2.top};
						}
					}
					// 更新此簽核物件的類型為簽核區域內物件
					theAOL.getCurrFolio().getSignFolder().xSignFolder().updateSignObj(this.so);
					
					// 1130710 Raymond 1130637 已儲存過的文字意見異動位置後設立簽核物件已異動旗標
					if(!that.so.sessionNew)
						theAOL.getCurrFolio().soModified = true;
					
					// 1130417 Raymond 1120881 若回傳值指定須refresh, 則refresh
					if(!!res && res.refresh == true) {
						if(res.goNextPage == true) {
							let fv = this.$pg.closest(".viewPort").data("view");
							fv.goToPage(fv.currPo() + 1);
						}
						else
							this.$pg.closest(".pages").flip("refresh");
					}
				}
			});
		}

		if(!that.so.asIcon)	//2017.3.2	Leslie	圖示顯示時，其應為儲存過的簽核物件，不設定寬度(此時為"0")，改在切換模式時，再設定寬度
			//1080918	Leslie[1080788]	因應Chrome在在特定環境上會出現字型間距比其他電腦寬(CSS資訊無法取得)，修正計算方式
			//this.$so.width(('width' in that.so)?that.so.width:getMaxLenghtFromTextComment(that.so.content,this.$so.find("> div:not(.ui-resizable-handle), > p").css('font-size').replace('px',''),that.so.fontWeight));	//2016.12.27	Leslie	設定寬度預設值	//2017.3.2	Leslie	完整模式載入時，計算出正確寬度
			// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
			// this.$so.width(('width' in that.so)?that.so.width:getMaxLenghtFromTextComment(that.so.content,this.$so.find("div").get(0)));	//2016.12.27	Leslie	設定寬度預設值	//2017.3.2	Leslie	完整模式載入時，計算出正確寬度
			this.$so.width(('width' in that.so)?that.so.width:getMaxLenghtFromTextComment(that.so.content,this.$so.find("div").eq(0)));	//2016.12.27	Leslie	設定寬度預設值	//2017.3.2	Leslie	完整模式載入時，計算出正確寬度
		
		//2017.2.8	Leslie	新增的文字意見，設定第一次的切字(用預設寬度)
		if('width' in that.so){	//2017.2.17	Leslie	新增文字意見時，才做第一次的切字
			var strCut = breakLineForTextComment(this.so.srcContent,this.$so.find("> div:not(.ui-resizable-handle), > p").css('font-size').replace('px',''),this.so.fontWeight,that.so.width);	//2017.3.14	Leslie	改為取用物件內設定之寬度值(避免圖示模式計算錯誤)
			this.so.content = strCut;
		}
		// 1081217 Raymond FIX XSS
		this.$so.find("> div:not(.ui-resizable-handle), > p").text(this.so.content);

		// 圖示去背, 需要Cache?
		var img = new Image();
		img.onload = function(evt) {
			//theLogger.log("img.onload..." + evt.target);
			var w = evt.target.width;
			var h = evt.target.height;
			var can = $("<canvas width='" + w + "px' height='" + h + "px'></canvas>");  // 未append到DOM中的Canvas在FF下可能無法使用
			var ctx = can.get(0).getContext("2d");
			ctx.drawImage(evt.target, 0, 0);
			var imgData = ctx.getImageData(0, 0, w, h);
			var r, g, b, a, i = 0, j = 0;
			for(var y=0; y<h; y++) {
				for(var x=0; x<w; x++, j+=4) {
					r = imgData.data[i++];
					g = imgData.data[i++];
					b = imgData.data[i++];
					a = imgData.data[i++];
					if(r == 255 && g == 255 && b == 255) {    // 白色的背景改成透明
						imgData.data[j+3] = 0;
					}
				}
			}
			ctx.putImageData(imgData, 0, 0);
			that.$so.find("img").get(0).src = can.get(0).toDataURL();
		}
		img.src = this.$so.find("img").get(0).src;
		
		theLogger.log("文字意見寬高:" + this.$so.width() + " x " + this.$so.height());
		
		if(this.so.boundTo != undefined && opts.bound == true) {
			this.so.boundTo.addSignObj(this.so, this);	// 2017.1.12 新增第2參數, 給簽核物件記錄檔使用
			this.so.bounded = true;
		}
		// 1130417 Raymond 1120881 新增文字意見物件時, 多傳入文字意見大小, 若文稿支援簽核區域排版屬性時, 文字意見大小壓到目前點擊的簽核區域下邊界時將自動增高
		if(!opts.suspendSALP && !!res) {	// 1130419 Raymond 1120881 若傳入參數suspendSALP, 則不要判斷是否壓線
			var _w = (this.so.asIcon)?36:this.$so.find("div").eq(0).width(),
				_h = (this.so.asIcon)?36:this.$so.find("div").eq(0).height();
			res = detectSOInSignArea(this.so.pos, $pg, {left: this.so.pos.left, top: this.so.pos.top, width: _w, height: _h});
			// 1130417 Raymond 1120881 若回傳值指定須refresh, 則refresh並返回
			if(res.refresh == true) {
				if(res.goNextPage == true) {
					let fv = that.$pg.closest(".viewPort").data("view");
					fv.goToPage(fv.currPo() + 1);
				}
				else
					that.$pg.closest(".pages").flip("refresh");
			}
		}
	}
	
	this.showModal = showTextModal;	// 2015.8.24 改到外部獨立函式
}

// 數位墨水意見
//
function SketchComment(so) {
	
	this.so = so;
	
	this.initiateSO = function($pg, options) {
		
		this.$pg = $pg;
		
		var opts = $.extend({bound: true, movable: true}, options);
		
		//1130117	Leslie[1120967]	修正數位墨水物件太小，造成無法點擊出正確選單的問題
		var bExtentLineSize = false;
		try{
			bExtentLineSize = ('size' in so)&&(parseFloat(so.size.width) < 1 || parseFloat(so.size.height) < 1)			
		}catch{}
		
		var upperOffset = {
			x: $pg.get(0).offsetLeft,
			y: $pg.get(0).offsetTop
		}
		var that = this;
		this.$so = $("<div class='sign-obj so-img' data-id='" + so.id + "' title='" + so.info + "'>\
<img src='image/AOL/sketch_comment.bmp' style='display:" + ((so.asIcon)?"inline":"none") + "'></img>\
<img style='display:" + ((so.asIcon)?"none":"inline") + (('size' in so)?"; width:"+so.size.width+"; height:"+so.size.height:"") +"'></img></div>")	//2017.2.21	Leslie	直接設定其大小	//2017.3.2	Leslie	bugfix 手寫簽核物件初始無size，補上判斷
			//.appendTo($pg)
			//.css({left:that.so.pos.left, top:that.so.pos.top})
			.on('click', function(event) {
				that.$pg.find(".sign-obj").removeClass("so-active");
				var $this = $(this).addClass("so-active");
				var c = that.$pg.closest(".viewPort").data("editCursor");
				
				var cmds = new Array();
				cmds.special = true;
				if($this.find("img").eq(1).css("display") == "none") {
					cmds.push({name:"完整顯示", func: function() {
						$this.find("img").eq(0).hide();
						$this.find("img").eq(1).show();
						/*for(var i=0; i<that.signObjects.length; i++) {
							if(that.signObjects[i].id == so.id) {
								that.signObjects[i].asIcon = false;
								that.signObjects.save();
								break;
							}
						}*/
						if(that.so.signArea && "offset" in that.so)	// 2017.2.15 fix for 簽核框內物件要改用offset設定位置
							that.$so.css({left:that.so.offset.left, top:that.so.offset.top});
						else
							that.$so.css({left:that.so.pos.left, top:that.so.pos.top});	// 2016.10.3 比照一代座標值是圖示中心點 2016.12.6 bugfix
						that.so.asIcon = false;
						
						// 1130710 Raymond 1130637 已儲存上傳過的數位墨水異動顯示方式後設立簽核物件已異動旗標
						if(!that.so.sessionNew)
							theAOL.getCurrFolio().soModified = true;
						
						//1130117	Leslie[1120967]	修正數位墨水物件太小，造成無法點擊出正確選單的問題
						if(bExtentLineSize)
							try{that.$so.css((parseFloat(so.size.height) < 1?'height':'width'),5)}catch{}
						
						// 1131119 Raymond 北榮序374 新增完整顯示簽核物件超出頁面時, 要拉回頁面內
						[reposLeft, reposTop] = reposSO(that.so.id, that.so.pos, that.so.offset, that.$so.width(), that.$so.height(), that.$pg.width(), that.$pg.height());
						if(reposLeft) {
							if(that.so.signArea && "offset" in that.so)	// 2017.2.15 fix for 簽核框內物件要改用offset設定位置
								that.$so.css("left", that.so.offset.left);
							else
								that.$so.css("left", that.so.pos.left);
						}
						if(reposTop) {
							if(that.so.signArea && "offset" in that.so)	// 2017.2.15 fix for 簽核框內物件要改用offset設定位置
								that.$so.css("top", that.so.offset.top);
							else
								that.$so.css("top", that.so.pos.top);
						}
						
						// 2015.11.4 - 切換顯示方式後再點選一次, 以觸發指令列正確顯示
						$this.trigger("click");
					}});
					cmds.push({name:"檢視", func: function() {
						that.showModal();
					}});
				}
				else {
					cmds.push({name:"圖示顯示", func: function() {
						$this.find("img").eq(1).hide();
						$this.find("img").eq(0).show();
						/*for(var i=0; i<that.signObjects.length; i++) {
							if(that.signObjects[i].id == so.id) {
								that.signObjects[i].asIcon = true;
								that.signObjects.save();
								break;
							}
						}*/
						if(that.so.signArea && "offset" in that.so)	// 2017.2.15 fix for 簽核框內物件要改用offset設定位置
							that.$so.css({left:that.so.offset.left - 18, top:that.so.offset.top - 18});
						else
							that.$so.css({left:that.so.pos.left - 18, top:that.so.pos.top - 18});	// 2016.10.3 比照一代座標值是圖示中心點 2016.12.6 bugfix
						that.so.asIcon = true;
						
						// 1130710 Raymond 1130637 已儲存上傳過的數位墨水異動顯示方式後設立簽核物件已異動旗標
						if(!that.so.sessionNew)
							theAOL.getCurrFolio().soModified = true;
						
						//1130117	Leslie[1120967]	修正數位墨水物件太小，造成無法點擊出正確選單的問題
						if(bExtentLineSize)
							try{that.$so.css((parseFloat(so.size.height) < 1?'height':'width'),'')}catch{}
						
						// 2015.11.4 - 切換顯示方式後再點選一次, 以觸發指令列正確顯示
						$this.trigger("click");
					}});
				}
				cmds.push({name:"刪除", func: function() {
					/*theLogger.log("刪除SO:'" + so.id + "' of " + that.signObjects.length);
					for(var i=0; i<that.signObjects.length; i++) {
						theLogger.log("[" + i + "]:" + that.signObjects[i].id + "(" + (that.signObjects[i].id == so.id) + ")");
						if(that.signObjects[i].id == so.id) {
							that.signObjects.remove(i, 1);
							break;
						}
					}
					theLogger.log("SO:" + that.signObjects.length);*/
					$this.remove();
					if(that.so.boundTo !== undefined && that.so.bounded) {
						that.so.boundTo.delSignObj(that.so);
					}
					// 2015.11.4 - 刪除後無對象, 隱藏指令列
					c.cmdFloat.hide();
				}});

				c.cmdFloat.setCmds(cmds);
				c.cmdFloat.setElem(this);
				return false;
			});
		// 2015.5.27 指定容器元素
		if(this.so.signArea) {
			theLogger.log("簽核物件屬於簽核區域");
			if("offset" in that.so) {	// 2015.6.16 新增判斷offset, 此數值已是相對於簽核區域的座標值
				// 2017.1.18 改從$pg找相符的signArea
				//this.$so.appendTo(this.so.signArea.$area).css({left: this.so.offset.left, top: this.so.offset.top});
				var $sa = $pg.find(".sign-area").filter(function(idx, elm) {
					if($(elm).attr("data-satype") == that.so.signArea.saType &&
						$(elm).attr("data-id") == that.so.signArea.id &&
						$(elm).attr("id") == that.so.signArea.psudoId)	// 2017.2.17 為了修正簽稿會核單有2個以上空ID問題而額外判斷
						return true;
					return false;
				});
				// 2017.2.7 圖示顯示時以offset為圖示的中心點
				//this.$so.appendTo($sa).css({left: this.so.offset.left, top: this.so.offset.top});
				// 1060718 Raymond 1060610/1060632 新增是否位於簽核區域內屬性
				//this.$so.appendTo($sa).css({left: this.so.offset.left - (this.so.asIcon == true?18:0), top: this.so.offset.top - (this.so.asIcon == true?18:0)});
				this.$so.appendTo($sa).css({left: this.so.offset.left - ((this.so.asIcon)?18:0), top: this.so.offset.top - ((this.so.asIcon)?18:0)}).attr("data-oor", "false");
				// 2015.10.22 修正絕對座標
				var saOff = $sa.offset(),	// 2017.1.18 改用$sa
					pgOff = $pg.offset();
				// 2015.10.28 如果有縮放控制的話要套用
				var $viewPort = $pg.closest(".viewPort"),	// 2017.1.18 改用$pg
					z = $viewPort.data("zoomController");
				// 1070504 Raymond 1070447 修正在非100%原尺寸縮放率時儲存, 會誤判數位墨水的絕對座標值不符並改為錯誤的絕對座標值問題
				//if((Math.ceil(this.so.offset.top + saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100)) != Math.ceil(this.so.pos.top)) {
				//	theLogger.warn("依相對簽核區域位移修正絕對座標: top:" + this.so.pos.top + " -> " + (Math.ceil(this.so.offset.top + saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100)));
				//	this.so.pos.top = (Math.ceil(this.so.offset.top + saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100));
				//}
				if(Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))) != Math.ceil(this.so.pos.top)) {
					theLogger.warn("依相對簽核區域位移修正絕對座標: top:" + this.so.pos.top + " -> " + Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))));
					this.so.pos.top = Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100)));
					this.so.pos.left = Math.ceil(this.so.offset.left + ((saOff.left - pgOff.left) * 100 / ((z !== undefined)?z.currScale:100)));
				}
			}
			else {
				theLogger.error("簽核物件(ID:" + this.so.id + ")屬於簽核區域內物件, 卻無相對位置資訊");	// 2017.1.18 增加例外說明
				var ctnrPos = this.so.signArea.$area.position();
				// 1060718 Raymond 1060610/1060632 新增是否位於簽核區域內屬性
				//if(this.so.asIcon == true)	// 2017.2.7 修正圖示模式時pos要視為中心點問題
				//	this.$so.appendTo(this.so.signArea.$area).css({left: this.so.pos.left - ctnrPos.left - 18, top: this.so.pos.top - ctnrPos.top - 18});
				//else
				//	this.$so.appendTo(this.so.signArea.$area).css({left: this.so.pos.left - ctnrPos.left, top: this.so.pos.top - ctnrPos.top});
				this.$so.appendTo(this.so.signArea.$area).css({left: this.so.pos.left - ctnrPos.left - ((this.so.asIcon)?18:0), top: this.so.pos.top - ctnrPos.top - ((this.so.asIcon)?18:0)}).attr("data-oor", "false");
			}
		}
		else {
			// 1060718 Raymond 1060610/1060632 修正判斷是否位於簽核框內時, 與移動一樣要先算出中心點再判斷
			//var res = detectSOInSignArea(this.so.pos, $pg);	// 2017.1.18 判定起始點是否位於簽核區域內, 是則以簽核區域內物件視之
			var delta = {x: (this.so.asIcon)?0:(parseFloat(this.so.size.width) / 420 * 794), y: (this.so.asIcon)?0:(parseFloat(this.so.size.height) / 594 * 1123)};	// 左上角與中心點的座標差, 若為貼式數位墨水物件則為0
			var posCt = {left: this.so.pos.left + delta.x, top: this.so.pos.top + delta.y};	// 用中心點當判定標的
			var res = detectSOInSignArea(posCt, $pg);	// 2017.1.18 判定起始點是否位於簽核區域內, 是則以簽核區域內物件視之
			if(!!res) {
				this.so.signArea = res.sa;
				// 1060718 Raymond 1060610/1060632 用中心點判斷得到的相對座標要再減去與左上角的座標差才能還原為左上角的相對座標
				//this.so.offset = res.offset;
				this.so.offset = {left: res.offset.left - delta.x, top: res.offset.top - delta.y};
				this.so.saType = res.sa.saType;	// 2017.2.6 bugfix
				this.so.saID = res.sa.id;
				// 從$pg找相符的signArea
				var $sa = $pg.find(".sign-area").filter(function(idx, elm) {
					if($(elm).attr("data-satype") == res.sa.saType &&
						$(elm).attr("data-id") == res.sa.id &&
						$(elm).attr("id") == res.sa.psudoId)	// 2017.2.17 為了修正簽稿會核單有2個以上空ID問題而額外判斷
						return true;
					return false;
				});
				// 2017.2.7 圖示顯示時以offset為圖示的中心點
				//this.$so.appendTo($sa).css({left: this.so.offset.left, top: this.so.offset.top});
				// 1060718 Raymond 1060610/1060632 新增是否位於簽核區域內屬性
				//this.$so.appendTo($sa).css({left: this.so.offset.left - (this.so.asIcon == true?18:0), top: this.so.offset.top - (this.so.asIcon == true?18:0)});
				this.$so.appendTo($sa).css({left: this.so.offset.left - ((this.so.asIcon)?18:0), top: this.so.offset.top - ((this.so.asIcon)?18:0)}).attr("data-oor", "false");
				// 更新此簽核物件的類型為簽核區域內物件
				theAOL.getCurrFolio().getSignFolder().xSignFolder().updateSignObj(this.so);
				/* 2015.10.22 修正絕對座標
				var saOff = this.so.signArea.$area.offset(),
					pgOff = $pg.offset();
				// 2015.10.28 如果有縮放控制的話要套用
				var $viewPort = this.so.signArea.$area.closest(".viewPort"),
					z = $viewPort.data("zoomController");
				if(Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))) != Math.ceil(this.so.pos.top)) {
					theLogger.warn("依相對簽核區域位移修正絕對座標: top:" + this.so.pos.top + " -> " + Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))));
					this.so.pos.top = Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100)));
					this.so.pos.left = Math.ceil(this.so.offset.left + ((saOff.left - pgOff.left) * 100 / ((z !== undefined)?z.currScale:100)));
				}*/
			}
			else {
				// 1060718 Raymond 1060610/1060632 新增是否位於簽核區域內屬性
				//if(this.so.asIcon == true)	// 2017.2.7 修正圖示模式時pos要視為中心點問題
				//	this.$so.appendTo($pg).css({left:this.so.pos.left - 18, top:this.so.pos.top - 18});
				//else
				//	this.$so.appendTo($pg).css({left:this.so.pos.left, top:this.so.pos.top});
				this.$so.appendTo($pg).css({left: this.so.pos.left - ((this.so.asIcon)?18:0), top: this.so.pos.top - ((this.so.asIcon)?18:0)}).attr("data-oor", "true");
			}
			/* 2013.10.8 - Raymond, tooltip沒用
			.on("touchstart", function(event) {
				if(this.hasAttribute("title")) {
					if(that.$tooltip !== undefined)
						that.$tooltip.remove();
					var $this = $(this);
					var pos = Util.getRelativeOffset(this, $this.closest(".viewPort").get(0));
					that.$tooltip = $("<div class='ui-bar-e tooltip'>" + this.title.replace("\n", "<br>") + "</div>")
									.appendTo($this.closest(".viewPort"))
									.css({left:pos.left, top:pos.top})
									.fadeIn();
					if(that.toolTipTimerId != null)
						clearTimeout(that.toolTipTimerId);
					that.toolTipTimerId = setTimeout(function() {
						that.toolTipTimerId = null;
						that.$tooltip.fadeOut();
					}, 5000);
				}
			});*/
		}
		
		//1130117	Leslie[1120967]	修正數位墨水物件太小，造成無法點擊出正確選單的問題
		if(bExtentLineSize){
			try{
				that.$so.css('margin',0);
				if(!so.asIcon){
					that.$so.css((parseFloat(so.size.height) < 1?'height':'width'),5)
				}
			}catch{}
		}
		
		if(opts.movable) {
			this.$so.movable({
				target: this,	// 2017.2.2 新增指定callback的目標為此物件
				//baseOffset: getRealPosition(that.$page.get(0)),
				//upperOffset: upperOffset,
				beforeMove: function(param) {
					param.scale = this.$pg.closest(".viewPort").data("zoomController").currScale / 100;
					this.$pg.closest(".viewPort").data("editCursor").cmdFloat.hide();
					//$(this).addClass("so-active");
					if(this.so.signArea) {	// 2015.5.29 新增判斷是否屬於簽核區域
						// 2017.1.18 改從$pg找相符的signArea
						var saType = this.so.signArea.saType;
						var saID = this.so.signArea.id;
						var $sa = this.$pg.find(".sign-area").filter(function(idx, elm) {
							if($(elm).attr("data-satype") == saType &&
								$(elm).attr("data-id") == saID)
								return true;
							return false;
						});
						param.baseOffset = $sa.offset();
					}
					else
						param.baseOffset = this.$pg.offset();    // 2013.9.13 - Raymond, 移動前重取$pg的相對座標
					param.baseOffset2 = this.$pg.offset();	// 2017.2.2 設定第2組baseOffset, 使afterMove回呼函式被呼叫時, 多傳入有效的第2組頁座標值
					// 1140815 Raymond 1141030 修正Firefox的PointerId是0不是1, 傳入1會發生Error導致無法拖拉物件的問題
					if(navigator.userAgent.indexOf("Firefox") >= 0)
						this.$so.get(0).setPointerCapture(0);
					else
					// 1131119 Raymond 北榮序374 新增鎖定滑鼠, 以免拖拉簽核物件超出頁面時, 偵測不到mousemove、vmouseup等事件
					this.$so.get(0).setPointerCapture(1);
				},
				afterMove: function(pos, pos2, param) {	// 2017.2.2 新增pos2及param參數
					/*for(var i=0; i<that.signObjects.length; i++) {
						if(that.signObjects[i].id == so.id) {
							that.signObjects[i].pos.x = parseInt($(this).css("left"));
							that.signObjects[i].pos.y = parseInt($(this).css("top"));
							that.signObjects.save();
							break;
						}
					}*/
					/*if(that.so.signArea) {	// 2015.5.29 新增判斷是否屬於簽核區域
						// 2017.1.18 改從$pg找相符的signArea
						var $sa = that.$pg.find(".sign-area").filter(function(idx, elm) {
							if($(elm).attr("data-satype") == that.so.signArea.saType &&
								$(elm).attr("data-id") == that.so.signArea.id)
								return true;
							return false;
						});
						var ctnrPos = $sa.position();	// 2017.1.18 改用$sa
						theLogger.log("\t$area.position()=" + ctnrPos.left + "," + ctnrPos.top);
						that.so.offset = pos;	// movable外掛回傳的是相對於container的座標, 要寫在offset
						that.so.pos.left = Math.ceil(pos.left + ctnrPos.left);	// pos記錄的是相對於page的座標
						that.so.pos.top = Math.ceil(pos.top + ctnrPos.top);
						// 2015.11.24 修正絕對座標
						var saOff = $sa.offset(),	// 2017.1.18 改用$sa
							pgOff = that.$pg.offset();
						// 要套用縮放控制
						var $viewPort = that.$pg.closest(".viewPort"),	// 2017.1.18 改用$pg
							z = $viewPort.data("zoomController");
						if(Math.ceil(that.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))) != Math.ceil(that.so.pos.top)) {
							theLogger.warn("依相對簽核區域位移修正絕對座標: top:" + that.so.pos.top + " -> " + Math.ceil(that.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))));
							that.so.pos.top = Math.ceil(that.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100)));
							that.so.pos.left = Math.ceil(that.so.offset.left + ((saOff.left - pgOff.left) * 100 / ((z !== undefined)?z.currScale:100)));
						}
						// TODO: 更新外部簽核物件記錄檔的簽核物件位置
					}
					else
						that.so.pos = pos;*/
					// 1140815 Raymond 1141030 修正Firefox的PointerId是0不是1, 傳入1會發生Error導致無法拖拉物件的問題
					if(navigator.userAgent.indexOf("Firefox") >= 0)
						this.$so.get(0).releasePointerCapture(0);
					else
					// 1131119 Raymond 北榮序374 新增解除鎖定滑鼠
					this.$so.get(0).releasePointerCapture(1);
					// 1131119 Raymond 北榮序374 新增拖拉簽核物件超出頁面時, 要拉回頁面內
					[reposLeft, reposTop] = reposSO(this.so.id, pos2, pos, this.$so.width(), this.$so.height(), this.$pg.width(), this.$pg.height());
					if(reposLeft)
						this.$so.css("left", pos2.left + "px");
					if(reposTop)
						this.$so.css("top", pos2.top + "px");
					// 2017.2.2 判定拖拉結束點是否位於簽核區域內, 是則以簽核區域內物件視之
					// 1060718 Raymond 1060610/1060632 新增判斷是否為貼式數位墨水物件, 是則加回圖示置中所減掉的位移量, 否則加影像大小除以2做為中心點座標
					//var posCt = {left: pos2.left + (this.$so.width() / 2), top: pos2.top + (this.$so.height() / 2)};	// 用中心點當判定標的
					var posCt = {left: pos2.left + ((this.so.asIcon)?18:(this.$so.width() / 2)), top: pos2.top + ((this.so.asIcon)?18:(this.$so.height() / 2))};	// 用中心點當判定標的
					var res = detectSOInSignArea(posCt, this.$pg);
					if(!!res) {
						var z = this.$pg.closest(".viewPort").data("zoomController");	// 2017.2.6 移到上面
						if("signArea" in this.so &&
							this.so.saType == res.sa.saType && this.so.saID == res.sa.id) {
							theLogger.warn("簽核物件拖拉簽核框內->內(同區域)");
							// 從$pg找相符的signArea
							var $sa = this.$pg.find(".sign-area").filter(function(idx, elm) {
								if($(elm).attr("data-satype") == res.sa.saType &&
									$(elm).attr("data-id") == res.sa.id)
									return true;
								return false;
							});
							// 1091026 Raymond 1090735 修正簽核區域在下邊界區時, 因計算簽核區域相對於頁面的座標錯誤, 導致拖拉簽核物件由外至內會發生簽核物件跑到整個頁面之外的問題
							//var ctnrPos = $sa.position();	// 2017.1.18 改用$sa
							var pgOffset = $sa.closest(".pg").offset();
							var ctnrPos = {left: param.baseOffset.left - pgOffset.left, top: param.baseOffset.top - pgOffset.top};
							theLogger.log("\t$area.position()=" + ctnrPos.left + "," + ctnrPos.top);
							theLogger.log("\tso.offset=" + this.so.offset.left + "," + this.so.offset.top + "  ->" + (pos.left) + "," + (pos.top));
							// 1060718 Raymond 1060610/1060632 新增判斷是否為貼式數位墨水物件, 是則加回圖示置中所減掉的位移量
							//this.so.offset = {left: pos.left, top: pos.top};	// movable外掛回傳的pos是相對於container的座標, 要寫在offset
							this.so.offset = {left: pos.left + ((this.so.asIcon)?18:0), top: pos.top + ((this.so.asIcon)?18:0)};	// movable外掛回傳的pos是相對於container的座標, 要寫在offset
							// 1131119 Raymond 北榮序374 本來在同一簽核區域內的簽核物件拖拉超出頁面時, 被拉回頁面內後, 偵測仍位於同一簽核區域時, 要重設為簽核區域內的相對座標
							if(reposLeft)
								this.$so.css("left", (res.offset.left - (this.$so.width() / 2)) + "px");
							if(reposTop)
								this.$so.css("top", (res.offset.top - (this.$so.height() / 2)) + "px");
							theLogger.log("\tso.pos=" + this.so.pos.left + "," + this.so.pos.top + "  ->" + (pos.left + ctnrPos.left) + "," + (pos.top + ctnrPos.top) + " pos2=" + pos2.left + "," + pos2.top);
							this.so.pos.left = Math.ceil(pos.left + ctnrPos.left);	// pos記錄的是相對於page的座標
							this.so.pos.top = Math.ceil(pos.top + ctnrPos.top);
							// 1131122 Raymond 北榮序374 合併內政部1131006, 修正從簽核區域內向左拖拉出頁面範圍外時, 拉回的頁面絕對座標位置會是-1的問題
							if(this.so.pos.left < 0) {
								this.so.offset.left -= this.so.pos.left;
								this.so.pos.left = 0;
								theLogger.log("因拉回後的水平絕對座標小於0, 再拉回超出頁面部分的距離: so.pos.left=" + this.so.pos.left + ", so.offset.left=" + so.offset.left);
							}
							if(this.so.pos.top < 0) {
								this.so.offset.top -= this.so.pos.top;
								this.so.pos.top = 0;
								theLogger.log("因拉回後的垂直絕對座標小於0, 再拉回超出頁面部分的距離: so.pos.top=" + this.so.pos.top + ", so.offset.top=" + so.offset.top);
							}
							// 2015.11.24 修正絕對座標
							var saOff = $sa.offset(),	// 2017.1.18 改用$sa
								pgOff = this.$pg.offset();
							// 要套用縮放控制
							//var $viewPort = this.$pg.closest(".viewPort"),	// 2017.1.18 改用$pg
							//	z = $viewPort.data("zoomController");
							if(Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))) != Math.ceil(this.so.pos.top)) {
								theLogger.warn("依相對簽核區域位移修正絕對座標: top:" + this.so.pos.top + " -> " + Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))));
								this.so.pos.top = Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100)));
								this.so.pos.left = Math.ceil(this.so.offset.left + ((saOff.left - pgOff.left) * 100 / ((z !== undefined)?z.currScale:100)));
							}
						}
						else {
							if("signArea" in this.so)
								theLogger.warn("簽核物件拖拉簽核框內->內(不同區域)");
							else
								theLogger.warn("簽核物件拖拉簽核框外->內");
							this.so.signArea = res.sa;
							this.so.offset = {left: res.offset.left, top: res.offset.top};
							this.so.saType = res.sa.saType;
							this.so.saID = res.sa.id;
							var $sa = this.$pg.find(".sign-area").filter(function(idx, elm) {
								if($(elm).attr("data-satype") == res.sa.saType &&
									$(elm).attr("data-id") == res.sa.id)
									return true;
								return false;
							});
							param.baseOffset = $sa.offset();	// 重設baseOffset
							
							// 1091026 Raymond 1090735 修正簽核區域在下邊界區時, 因計算簽核區域相對於頁面的座標錯誤, 導致拖拉簽核物件由外至內會發生簽核物件跑到整個頁面之外的問題
							//var ctnrPos = $sa.position();	// 2017.1.18 改用$sa
							var pgOffset = $sa.closest(".pg").offset();
							var ctnrPos = {left: param.baseOffset.left - pgOffset.left, top: param.baseOffset.top - pgOffset.top};
							this.so.pos = {left: pos2.left, top: pos2.top};	// 頁座標用回呼的pos2
							this.so.offset = {
								left: Math.ceil(pos2.left - (ctnrPos.left * 100 / z.currScale)),	// 2017.2.6 套用縮放比例
								top: Math.ceil(pos2.top - (ctnrPos.top * 100 / z.currScale))
							};
							// 1140317 Raymond 1131214 新增移動簽核物件從簽核區域內至外、外至內或另一個簽核區域時, 先檢查目的簽核區域的簽核物件ID, 決定移入的簽核物件應插入的順序
							// 1060718 Raymond 1060610/1060632 修正圖示狀態下由框外拉至框內時, 相對座標未減去圖示置中的座標差問題並新增是否位於簽核區域內屬性
							//this.$so.appendTo($sa).css(this.so.offset);	// 重設parent及相對位置
							//this.$so.appendTo($sa).css({left: this.so.offset.left - (this.so.asIcon?18:0), top: this.so.offset.top - (this.so.asIcon?18:0)}).attr("data-oor", "false");	// 重設parent、相對位置及是否位於簽核區域內屬性
							MoveInSO(this.$so, $sa).css({left: this.so.offset.left - (this.so.asIcon?18:0), top: this.so.offset.top - (this.so.asIcon?18:0)}).attr("data-oor", "false");	// 重設parent、相對位置及是否位於簽核區域內屬性
							// 1131122 Raymond 北榮序374 合併內政部1131006, 修正從簽核區域內拖拉到頁面範圍外時, 指令列停留在頁面範圍外的問題
							if(reposLeft || reposTop)
								this.$so.trigger("click");
						}
						if(this.so.asIcon == true) {	// 2016.10.13 修正移動時pos變成左上角問題
							this.so.pos.left += 18;
							this.so.pos.top += 18;
						}
					}
					else {
						if("signArea" in this.so) {
							theLogger.warn("簽核物件拖拉簽核框內->外");
							if(this.so.asIcon == true)	// 2016.10.13 修正移動時pos變成左上角問題
								this.so.pos = {left: pos2.left + 18, top: pos2.top + 18};
							else
								this.so.pos = {left: pos2.left, top: pos2.top};
							// 1140317 Raymond 1131214 新增移動簽核物件從簽核區域內至外、外至內或另一個簽核區域時, 先檢查目的簽核區域的簽核物件ID, 決定移入的簽核物件應插入的順序
							// parent改成$pg
							// 1060718 Raymond 1060610/1060632 新增是否位於簽核區域內屬性
							//this.$so.appendTo(this.$pg).css(this.so.pos);	// 重設parent及相對位置
							//this.$so.appendTo(this.$pg).css({left: this.so.pos.left - ((this.so.asIcon)?18:0), top: this.so.pos.top - ((this.so.asIcon)?18:0)}).attr("data-oor", "true");	// 重設parent、相對位置及是否位於簽核區域內屬性, 修正圖示在移動後未置中問題
							MoveInSO(this.$so, this.$pg).css({left: this.so.pos.left - ((this.so.asIcon)?18:0), top: this.so.pos.top - ((this.so.asIcon)?18:0)}).attr("data-oor", "true");	// 重設parent、相對位置及是否位於簽核區域內屬性, 修正圖示在移動後未置中問題
							// 刪除signArea及offset
							delete this.so.saType;
							delete this.so.saID;
							delete this.so.signArea;
							delete this.so.offset;
							// 1131122 Raymond 北榮序374 合併內政部1131006, 修正從簽核區域內拖拉到頁面範圍外時, 指令列停留在頁面範圍外的問題
							if(reposLeft || reposTop)
								this.$so.trigger("click");
						}
						else {
							theLogger.warn("簽核物件拖拉簽核框外->外");
							if(this.so.asIcon == true)	// 2016.10.13 修正移動時pos變成左上角問題
								// 1131122 Raymond 北榮序374 合併內政部1131006, 修正從簽核區域外拖拉到頁面範圍外時, SignWork.xml及XSignObjs.xml記錄座標是負值的問題
								//this.so.pos = {left: pos.left + 18, top: pos.top + 18};
								this.so.pos = {left: pos2.left + 18, top: pos2.top + 18};
							else
								// 1131122 Raymond 北榮序374 合併內政部1131006, 修正從簽核區域外拖拉到頁面範圍外時, SignWork.xml及XSignObjs.xml記錄座標是負值的問題
								//this.so.pos = {left: pos.left, top: pos.top};
								this.so.pos = {left: pos2.left, top: pos2.top};
						}
					}
					// 更新此簽核物件的類型為簽核區域內物件
					theAOL.getCurrFolio().getSignFolder().xSignFolder().updateSignObj(this.so);
					
					// 1130710 Raymond 1130637 已儲存上傳過的數位墨水數位墨水異動位置後設立簽核物件已異動旗標
					if(!that.so.sessionNew)
						theAOL.getCurrFolio().soModified = true;
				}
			});
		}
		// 2013.9.12 - Raymond, 新增SO時未指定寬高, 載入圖檔後取得寬高填入SO
		this.$so.find("img").get(1).onload = function(evt) {
			// 1060601 Raymond 1060264 修正選用章戳-圖檔已有大小資訊, 不要套用計算數位墨水大小的功能
			if(!that.so.size) {
				var cxPg = $(evt.target).closest(".pg").width();
				var cyPg = $(evt.target).closest(".pg").height();
				// 1060515 Raymond 1060264 修正數位墨水物件會越存越短的問題
				//var w = evt.target.width * 209 / cxPg;  // 2014.1.2 - Raymond, 頁寬209 "mm"
				//var h = evt.target.height * 297 / cyPg; // 2014.1.2 - Raymond, 頁高297 "mm"
				var w = evt.target.naturalWidth * 210 / cxPg;  // 2014.1.2 - Raymond, 頁寬209 "mm"
				var h = evt.target.naturalHeight * 297 / cyPg; // 2014.1.2 - Raymond, 頁高297 "mm"
				that.so.size = {width: w + "mm", height: h + "mm"};
			}
		}
		// 1090424 Raymond 1090305 修正so.content未載入影像資料時提供function讓載入成功後寫入
		if(typeof so.content === "object") {
			so.reload = function() {
				theLogger.warn("重新載入數位墨水(ID:" + so.id + ")影像檔...");
				if("maskBkgnd" in so) {	// 有設定maskBkgnd表示已轉成白底檔案過, 要去背
					if(so.maskBkgnd == "Y") {
						var canvas = document.createElement("canvas");
						var img = new Image();
						img.onload = function() {
							theLogger.log("width: " + this.width + ", height: " + this.height);
							canvas.width = this.width;
							canvas.height = this.height;
							var ctx = canvas.getContext("2d");
							ctx.beginPath();
							ctx.drawImage(this, 0, 0);
							ctx.closePath();
							var picData = ctx.getImageData(0, 0, this.width, this.height);
							var picLength = this.width * this.height;
							var transparency = Number(so.transparency);// transparency 0~255, 0是不透明, 255是全透明
							// 2015.7.7 新增Alpha
							if(so.transparency)
								var alpha = 255 - transparency;
							// 2015.4.14 去背功能似乎無效(可能是JPG衍生問題)
							for(var i=0; i<picLength * 4; i+=4) {
								if(picData.data[i] == 255 &&
								   picData.data[i + 1] == 255 &&
								   picData.data[i + 2] == 255) {// 白色為背景色
									picData.data[i + 3] = 0;    // Alpha 0為透明
								}
								else if(transparency > 0) {	// 半透明
									// 2015.7.7 新增直接設常數, picData似乎不能以var設定
									if(alpha < 250)
										picData.data[i + 3] = 95;
								}
							}
							ctx.putImageData(picData, 0, 0);
							that.$so.find("img").get(1).src = canvas.toDataURL("image/png");
						}
						img.src = so.content;	// 用img.onload去背
					}
					else	// 不去背則直接顯示
						that.$so.find("img").get(1).src = so.content;	// reload()內this要改成that
				}
				else	// 無maskBkgnd表示動態新增的, 尚未轉成白底檔案過, 可以直接顯示
					that.$so.find("img").get(1).src = so.content;	// reload()內this要改成that
			}
		}
		else {

		// 2015.5.18 - 判斷有無maskBkgnd來決定應不應去背
		if("maskBkgnd" in so) {	// 有設定maskBkgnd表示已轉成白底檔案過, 要去背
			if(so.maskBkgnd == "Y") {
				var canvas = document.createElement("canvas");
				var img = new Image();
				img.onload = function() {
					theLogger.log("width: " + this.width + ", height: " + this.height);
					canvas.width = this.width;
					canvas.height = this.height;
					var ctx = canvas.getContext("2d");
					ctx.beginPath();
					ctx.drawImage(this, 0, 0);
					ctx.closePath();
					var picData = ctx.getImageData(0, 0, this.width, this.height);
					var picLength = this.width * this.height;
					var transparency = Number(so.transparency);// transparency 0~255, 0是不透明, 255是全透明
					// 2015.7.7 新增Alpha
					if(so.transparency)
						var alpha = 255 - transparency;
					// 2015.4.14 去背功能似乎無效(可能是JPG衍生問題)
					for(var i=0; i<picLength * 4; i+=4) {
						if(picData.data[i] == 255 &&
						   picData.data[i + 1] == 255 &&
						   picData.data[i + 2] == 255) {// 白色為背景色
							picData.data[i + 3] = 0;    // Alpha 0為透明
						}
						else if(transparency > 0) {	// 半透明
							// 2015.7.7 新增直接設常數, picData似乎不能以var設定
							if(alpha < 250)
								picData.data[i + 3] = 95;
						}
					}
					ctx.putImageData(picData, 0, 0);
					that.$so.find("img").get(1).src = canvas.toDataURL("image/png");
				}
				img.src = so.content;	// 用img.onload去背
			}
			else	// 不去背則直接顯示
				this.$so.find("img").get(1).src = so.content;
		}
		else	// 無maskBkgnd表示動態新增的, 尚未轉成白底檔案過, 可以直接顯示
			this.$so.find("img").get(1).src = so.content;
		
		}	// 1090424 Raymond 1090305 修正so.content未載入影像資料時提供function讓載入成功後寫入
		
		// 圖示去背, 需要Cache?
		var img = new Image();
		img.onload = function(evt) {
			//theLogger.log("img.onload..." + evt.target);
			var w = evt.target.width;
			var h = evt.target.height;
			var can = $("<canvas width='" + w + "px' height='" + h + "px'></canvas>");  // 未append到DOM中的Canvas在FF下可能無法使用
			var ctx = can.get(0).getContext("2d");
			ctx.drawImage(evt.target, 0, 0);
			var imgData = ctx.getImageData(0, 0, w, h);
			var r, g, b, a, i = 0, j = 0;
			for(var y=0; y<h; y++) {
				for(var x=0; x<w; x++, j+=4) {
					r = imgData.data[i++];
					g = imgData.data[i++];
					b = imgData.data[i++];
					a = imgData.data[i++];
					if(r == 255 && g == 255 && b == 255) {    // 白色的背景改成透明
						imgData.data[j+3] = 0;
					}
				}
			}
			ctx.putImageData(imgData, 0, 0);
			that.$so.find("img").get(0).src = can.get(0).toDataURL("image/png");
		}
		img.src = this.$so.find("img").get(0).src;
		
		theLogger.log("數位墨水意見寬高:" + this.$so.width() + " x " + this.$so.height());
		
		if(this.so.boundTo != undefined && opts.bound) {
			this.so.boundTo.addSignObj(this.so, this);	// 2017.1.12 新增第2參數, 給簽核物件記錄檔使用
			this.so.bounded = true;
		}
	}
	
	this.showModal = function() {
		// 2013.9.13 - Raymond, 修復檢視子視窗
		//var $dlg = $(document.body).find("> #sketchComment").clone(true);
		//$dlg.find("h1").text("貼式數位墨水意見");
		var that = this;
		Util.getDlg("RD-SketchComment.html").done(function($dlg) {
		
			$dlg.find("header > h1").unwrap();
			$dlg.find("footer > div").unwrap();
			
			// init dlg
			var w = that.$so.find("img").eq(1).width(),
				h = that.$so.find("img").eq(1).height(),
				ctx = $dlg.find("canvas").get(0).getContext("2d");
			ctx.drawImage(that.$so.find("img").get(1), 0, 0, w, h);
			
			//var that = this;
			$dlg.find("a#ok").on('click', function(event) {
				
				// 讀入成為影像意見
				// 1060718 Raymond 1060610/1060632 修正編輯後未異動影像大小的問題
				//var str = $dlg.find("canvas").data("sketch").getFitImgDataURL();
				//theLogger.log(str);
				var coord2 = {},
					str = $dlg.find("canvas").data("sketch").getFitImgDataURL(coord2);
				theLogger.log("編輯影像簽核物件 - width:" + coord2.cx + ", height:" + coord2.cy);	// 編輯異動後的寬高資訊
				that.so.size = {width: (coord2.cx * 210 / 794) + "mm", height: (coord2.cy * 297 / 1123) + "mm"};	// 修改簽核物件的大小資訊
				that.$so.find("img").eq(1).css(that.so.size);	// 套用編輯異動後的大小
				
				that.$so.find("img").get(1).src = str;
				// 2015.5.12 異動後圖檔資料寫回so
				that.so.content = str;
				
				$.modal.close();
				
				// 1130710 Raymond 1130637 已儲存上傳過的數位墨水異動後設立簽核物件已異動旗標
				if(!that.so.sessionNew)
					theAOL.getCurrFolio().soModified = true;
			});
			$dlg.find("a#cancel").on('click', function(event) {
				$.modal.close();
			});
			$dlg.find("#penSelector").find("li").on('click', function(evt) {
				$dlg.find("#penSelector").find("li").removeClass("ui-btn-active");
				$(this).addClass("ui-btn-active");
			});
			// 鋼筆
			$dlg.find("#penSelector li").eq(0).on('click', function(event) {
				var api = $dlg.find("canvas").data("sketch");
				// 1060721 Raymond 1060593 修正數位墨水編輯子視窗中鋼筆工具沒有套用使用者顏色的問題
				//api.setLineColor("blue");
				var usrColor = Util.toHtmlColor(theAOL.getCurrFolio().getUserColor());	// 2015.10.15 鋼筆數位墨水套用使用者顏色
				api.setLineColor(usrColor);
				api.setLineWidth(2);
				api.setSegmentedLine(false);
				//$(this).siblings().removeClass("ui-btn-up-e").addClass("ui-btn-up-c").attr("data-theme", "c");
				//$(this).removeClass("ui-btn-up-c").addClass("ui-btn-up-e").attr("data-theme", "e");
			});
			// 紅筆
			$dlg.find("#penSelector li").eq(1).on('click', function(event) {
				var api = $dlg.find("canvas").data("sketch");
				// 1060721 Raymond 1060593 新增套用手寫筆設定的紅筆顏色、寬度
				//api.setLineColor("red");
				//api.setLineWidth(1);
				var redPenColor = "red", redPenWidth = 1;
				if("pen_setting_1" in localStorage && localStorage['pen_setting_1'].length > 0) {
					var a = localStorage['pen_setting_1'].split('|');
					if(a.length > 1) {
						theLogger.log("套用紅筆的手寫筆設定 - 顏色:" + a[0] + ", 寬度:" + a[1]);
						redPenColor = a[0];
						redPenWidth = a[1];
					}
					else
						theLogger.warn("紅筆的手寫筆設定(pen_setting_1)格式不正確:'" + localStorage['pen_setting_1'] + "', 無法套用");
				}
				api.setLineColor(redPenColor);
				api.setLineWidth(redPenWidth);
				api.setSegmentedLine(false);
				//$(this).siblings().removeClass("ui-btn-up-e").addClass("ui-btn-up-c").attr("data-theme", "c");
				//$(this).removeClass("ui-btn-up-c").addClass("ui-btn-up-e").attr("data-theme", "e");
			});
			// 螢光筆
			$dlg.find("#penSelector li").eq(2).on('click', function(event) {
				var api = $dlg.find("canvas").data("sketch");
				// 1060721 Raymond 1060593 新增套用手寫筆設定的紅筆及螢光筆顏色、寬度
				//api.setLineColor("rgba(255,255,0,0.3)");
				//api.setLineWidth(16);
				var hilitPenColor = "rgba(255,255,0,0.3)", hilitPenWidth = 12;
				if("pen_setting_2" in localStorage && localStorage['pen_setting_2'].length > 0) {
					var a = localStorage['pen_setting_2'].split('|');
					if(a.length > 1) {
						theLogger.log("套用螢光筆的手寫筆設定 - 顏色:" + a[0] + ", 寬度:" + a[1]);
						hilitPenColor = a[0];
						hilitPenWidth = a[1];
					}
					else
						theLogger.warn("螢光筆的手寫筆設定(pen_setting_2)格式不正確:'" + localStorage['pen_setting_2'] + "', 無法套用");
				}
				api.setLineColor(hilitPenColor);
				api.setLineWidth(hilitPenWidth);
				api.setSegmentedLine(true);
				//$(this).siblings().removeClass("ui-btn-up-e").addClass("ui-btn-up-c").attr("data-theme", "c");
				//$(this).removeClass("ui-btn-up-c").addClass("ui-btn-up-e").attr("data-theme", "e");
			});
			// 橡皮擦
			$dlg.find("#penSelector li").eq(3).on('click', function(event) {
				var api = $dlg.find("canvas").data("sketch");
				api.setLineColor("transparent");
				api.setSegmentedLine(false);
				//$(this).siblings().removeClass("ui-btn-up-e").addClass("ui-btn-up-c").attr("data-theme", "c");
				//$(this).removeClass("ui-btn-up-c").addClass("ui-btn-up-e").attr("data-theme", "e");
			});
			
			var w = that.$so.closest("#iso").width(),
				h = that.$so.closest("#iso").height();
			theLogger.log("檢視數位墨水意見對話方塊, w:" + w + ",h:" + h);
			$.modal($dlg, {appendTo:that.$so.closest("#iso"), overlayCss:{height:h, width:w}});
			$dlg.trigger("create");
			
			// 1060721 Raymond 1060593 修正數位墨水編輯子視窗中鋼筆工具沒有套用使用者顏色的問題
			// 最後再啟用sketch, 否則position等方法會失敗
			//$dlg.find("canvas").sketch();
			var usrColor = Util.toHtmlColor(theAOL.getCurrFolio().getUserColor());	// 預設的鋼筆套用使用者顏色
			$dlg.find("canvas").sketch({defaultColor: usrColor});
		});
	}
}

// 職名章/選用章戳
//
function Stamp(so) {

	this.so = so;
	
	function _reformat(oTime) {    // 格式化日期時間為 XXXX<BR>OOOO格式
		if(theSSO.User.EnvSettings.get('AOL_SIGNET_TIMESTAMP_SHOW_YEAR') == 'Y')
			return Util.padLeft(oTime.getYear() - 11, 3) + "<br>" + Util.padLeft(oTime.getMonth() + 1, 2) + Util.padLeft(oTime.getDate(), 2) + "<br>" + Util.padLeft(oTime.getHours(), 2) + Util.padLeft(oTime.getMinutes(), 2);
		return Util.padLeft(oTime.getMonth() + 1, 2) + Util.padLeft(oTime.getDate(), 2) + "<br>" + Util.padLeft(oTime.getHours(), 2) + Util.padLeft(oTime.getMinutes(), 2);
	}
	
	this.initiateSO = function($pg, options) {
		
		this.$pg = $pg;
		
		var opts = $.extend({bound: true, movable: true, readonly: false}, options);
		
		var upperOffset = {
			x: $pg.get(0).offsetLeft,
			y: $pg.get(0).offsetTop
		}
		theLogger.log("makeStampSO: arguments.length = " + arguments.length);
		if(arguments.length > 3) {
			var extra = arguments[3];
			theLogger.log(extra);
		}
		if("offset" in this.so)
			theLogger.log("so.pos: " + this.so.pos.left + ", " + this.so.pos.top + " so.offset: " + this.so.offset.left + ", " + this.so.offset.top);
		else
			theLogger.log("so.pos: " + this.so.pos.left + ", " + this.so.pos.top);
		var that = this;
		this.$so = $("<div class='sign-obj so-stamp' data-id='" + so.id + "' title='" + so.info + "'><img style='width:1.04in;'/></div>")
			//.appendTo($pg)
			//.css({left:that.so.pos.left, top:that.so.pos.top})
			.on('click', function(event) {
				that.$pg.find(".sign-obj").removeClass("so-active");
				var $this = $(this).addClass("so-active");
				var c = that.$pg.closest(".viewPort").data("editCursor");
				
				if(!opts.readonly) {
					var cmds = new Array();
					cmds.special = true;
					if(that.so.type == "stamp.text")	// 2015.8.24 文字式選用章戳新增檢視
						cmds.push({name:"檢視", func: function() {
							showTextModal.call(that);
						}});
					cmds.push({name:"刪除", func: function() {
						$this.remove();
						// 2017.3.30 新增連動代字時, 一併刪除代字章
						if(!!that.so.linkCmt) {
							// 1090311 Raymond 1081105 選用章戳連動職名章時, 一併刪除職名章及代字章
							//theLogger.warn("連動刪除代字章(ID:" + that.so.linkCmt.so.id + ")");
							if(!!that.so.linkCmt.so.linkCmt) {
								theLogger.warn("連動刪除代字章(ID:" + that.so.linkCmt.so.linkCmt.so.id + ")");
								that.so.linkCmt.so.linkCmt.$so.remove();
								if(that.so.linkCmt.so.linkCmt.so.boundTo != undefined && that.so.linkCmt.so.linkCmt.so.bounded) {
									that.so.linkCmt.so.linkCmt.so.boundTo.delSignObj(that.so.linkCmt.so.linkCmt.so);
								}
								theLogger.warn("連動刪除職名章(ID:" + that.so.linkCmt.so.id + ")");
							}
							else
								theLogger.warn("連動刪除職名章或代字章(ID:" + that.so.linkCmt.so.id + ")");
							that.so.linkCmt.$so.remove();
							if(that.so.linkCmt.so.boundTo != undefined && that.so.linkCmt.so.bounded) {
								that.so.linkCmt.so.boundTo.delSignObj(that.so.linkCmt.so);
							}
						}
						if(that.so.boundTo != undefined && that.so.bounded) {    // 刪除SO物件
							that.so.boundTo.delSignObj(that.so);
							// 1090312 Raymond 1081105 新增刪除簽核物件後移除連動來源物件的連動資訊, 以免刪除連動來源物件時, 重複刪除被連動物件時發生Error的問題
							if(!!that.so.followCmt && !!that.so.followCmt.so.linkCmt)
								delete that.so.followCmt.so.linkCmt;
						}
						// 2015.11.4 - 刪除後無對象, 隱藏指令列
						c.cmdFloat.hide();
					}});
					if(typeof extra !== "undefined")
						cmds.push(extra);
					
					c.cmdFloat.setCmds(cmds);
					c.cmdFloat.setElem(this);
				}
				return false;
			});
		// 1131118 Raymond 北榮序374 新增加入簽核物件時座標若超出頁面時, 要拉回頁面內
		var soW, soH;
		if("size" in this.so) {
			soW = parseFloat(this.so.size.width) * 794 / 210;
			soH = parseFloat(this.so.size.height) * 1123 / 297;
			if(this.so.dispTime)
				soW += soH;
		}
		else {
			var fh = this.so.fontSize.replace("pt", "") * 4 / 3,	// 1個字的高度
				th = fh, tw = 0, lw = 0;
			// 計算選用章戳文字的寬度及高度
			for(var i=0; i<this.so.content.length; i++) {
				if(this.so.content[i].match(/[\x0-\xff]/))	// 半形
					lw += (fh / 2);
				else if(this.so.content[i].match(/[\r\n]/)) {	// 折行
					th += fh;
					tw = Math.max(tw, lw);
					lw = 0;
				}
				else
					lw += fh;
			}
			soW = Math.max(tw, lw);
			soH = th;
		}
		reposSO(this.so.id, this.so.pos, undefined, soW, soH, this.$pg.width(), this.$pg.height(), this.so);
		// 2015.5.7 指定容器元素
		if(this.so.signArea) {
			theLogger.log("簽核物件屬於簽核區域");
			if("offset" in that.so) {	// 2015.6.16 新增判斷offset, 此數值已是相對於簽核區域的座標值
				// 2017.1.18 改從$pg找相符的signArea
				//this.$so.appendTo(this.so.signArea.$area).css({left: this.so.offset.left, top: this.so.offset.top});
				var $sa = $pg.find(".sign-area").filter(function(idx, elm) {
					if($(elm).attr("data-satype") == that.so.signArea.saType &&
						$(elm).attr("data-id") == that.so.signArea.id &&
						$(elm).attr("id") == that.so.signArea.psudoId)	// 2017.2.17 為了修正簽稿會核單有2個以上空ID問題而額外判斷
						return true;
					return false;
				});
				// 1060718 Raymond 1060610/1060632 新增是否位於簽核區域內屬性
				//this.$so.appendTo($sa).css({left: this.so.offset.left, top: this.so.offset.top});
				this.$so.appendTo($sa).css({left: this.so.offset.left, top: this.so.offset.top}).attr("data-oor", "false");
				// 2015.10.22 修正絕對座標
				var saOff = $sa.offset(),	// 2017.1.18 改用$sa
					pgOff = $pg.offset();
				// 2015.10.28 如果有縮放控制的話要套用
				var $viewPort = $pg.closest(".viewPort"),	// 2017.1.18 改用$pg
					z = $viewPort.data("zoomController");
				if(Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))) != Math.ceil(this.so.pos.top)) {
					theLogger.warn("依相對簽核區域位移修正絕對座標: top:" + this.so.pos.top + " -> " + Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))));
					this.so.pos.top = Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100)));
					this.so.pos.left = Math.ceil(this.so.offset.left + ((saOff.left - pgOff.left) * 100 / ((z !== undefined)?z.currScale:100)));
				}
				/* for test
				if($pg.find("#testafter").length)
					$pg.find("#testafter").text("(" + this.so.pos.left + "," + this.so.pos.top + ")").css({left:this.so.pos.left, top:this.so.pos.top});
				else
					$("<div id='testafter' style='position:absolute; border:1px solid blue'>(" + this.so.pos.left + "," + this.so.pos.top + ")</div>").appendTo($pg).css({left:this.so.pos.left, top:this.so.pos.top});*/
				// 1130418 Raymond 1120881 新增自動加蓋職名章時, 偵測是否壓線超出下邊框, 是則自動增高簽核區域
				if(this.so.auto == true) {
					if("size" in this.so) {	// 職名章或影像章戳計算中心點
						var delta = {x: (parseFloat(this.so.size.width) / 420 * 794), y: (parseFloat(this.so.size.height) / 594 * 1123)};	// 左上角與中心點的座標差
						var posCt = {left: this.so.pos.left + delta.x, top: this.so.pos.top + delta.y};	// 用中心點當判定標的
						var res = detectSOInSignArea(posCt, $pg, {left: this.so.pos.left, top: this.so.pos.top, width: parseFloat(this.so.size.width) / 210 * 794, height: parseFloat(this.so.size.height) / 297 * 1123});
						if(!!res && res.refresh == true) {
							if(this.so.boundTo != undefined && opts.bound) {
								this.so.boundTo.addSignObj(this.so, this);	// 2017.1.12 新增第2參數, 給簽核物件記錄檔使用
								this.so.bounded = true;
							}
							if(res.goNextPage == true) {
								setTimeout(function() {
									let fv = that.$pg.closest(".viewPort").data("view");
									fv.goToPage(fv.currPo() + 1);
								}, 50);
							}
							else {
								setTimeout(function() {
									that.$pg.closest(".pages").flip("refresh");
								}, 50);
							}
							return;
						}
					}
				}
				// 1130423 Raymond 1120881 新增核示語詞加蓋職名章時, 偵測是否壓線超出下邊框, 是則自動增高簽核區域
				else if(opts.retNeedRefresh == true) {
					if("size" in this.so) {	// 職名章或影像章戳計算中心點
						var delta = {x: (parseFloat(this.so.size.width) / 420 * 794), y: (parseFloat(this.so.size.height) / 594 * 1123)};	// 左上角與中心點的座標差
						var posCt = {left: this.so.pos.left + delta.x, top: this.so.pos.top + delta.y};	// 用中心點當判定標的
						var res = detectSOInSignArea(posCt, $pg, {left: this.so.pos.left, top: (!!opts.overallTop)?opts.overallTop:this.so.pos.top, width: parseFloat(this.so.size.width) / 210 * 794, height: ((!!opts.overallTop)?(this.so.pos.top - opts.overallTop):0) + (parseFloat(this.so.size.height) / 297 * 1123)});
					}
				}
			}
			else {
				theLogger.error("簽核物件(ID:" + this.so.id + ")屬於簽核區域內物件, 卻無相對位置資訊");	// 2017.1.18 增加例外說明
				var ctnrPos = this.so.signArea.$area.position();
				// 1060718 Raymond 1060610/1060632 新增是否位於簽核區域內屬性
				//this.$so.appendTo(this.so.signArea.$area).css({left: this.so.pos.left - ctnrPos.left, top: this.so.pos.top - ctnrPos.top});
				this.$so.appendTo(this.so.signArea.$area).css({left: this.so.pos.left - ctnrPos.left, top: this.so.pos.top - ctnrPos.top}).attr("data-oor", "false");
			}
		}
		else {
			// 1060718 Raymond 1060610/1060632 修正判斷是否位於簽核框內時, 與移動一樣要先算出中心點再判斷
			//var res = detectSOInSignArea(this.so.pos, $pg);	// 2017.1.18 判定起始點是否位於簽核區域內, 是則以簽核區域內物件視之
			if("size" in this.so) {	// 職名章或影像章戳計算中心點
				var delta = {x: (parseFloat(this.so.size.width) / 420 * 794), y: (parseFloat(this.so.size.height) / 594 * 1123)};	// 左上角與中心點的座標差
				var posCt = {left: this.so.pos.left + delta.x, top: this.so.pos.top + delta.y};	// 用中心點當判定標的
				// 1121106 Raymond 1120881 新增章戳物件時, 多傳入章戳大小, 若文稿支援簽核區域排版屬性時, 章戳大小壓到目前點擊的簽核區域下邊界時將自動增高
				//var res = detectSOInSignArea(posCt, $pg);	// 2017.1.18 判定起始點是否位於簽核區域內, 是則以簽核區域內物件視之
				// 1130419 Raymond 1120881 若傳入參數suspendSALP, 則不要判斷是否壓線
				//var res = detectSOInSignArea(posCt, $pg, {left: this.so.pos.left, top: this.so.pos.top, width: parseFloat(this.so.size.width) / 210 * 794, height: parseFloat(this.so.size.height) / 297 * 1123});
				if(opts.suspendSALP == true)
					var res = detectSOInSignArea(posCt, $pg);
				else	// 1130419 Raymond 1120881 若傳入參數overallTop, 則計算壓線rcSO的top以overallTop取代, height以加上overallTop的距離重新計算
					var res = detectSOInSignArea(posCt, $pg, {left: this.so.pos.left, top: (!!opts.overallTop)?opts.overallTop:this.so.pos.top, width: parseFloat(this.so.size.width) / 210 * 794, height: ((!!opts.overallTop)?(this.so.pos.top - opts.overallTop):0) + (parseFloat(this.so.size.height) / 297 * 1123)});
			}
			else {	// 文字章戳直接以左上角判斷框外還是內
				// 1061212 Raymond 1061195 先算出文字式選用章戳的大小再算出中心點才能判斷是否位於簽核區域內
				//var res = detectSOInSignArea(this.so.pos, $pg);	// 2017.1.18 判定起始點是否位於簽核區域內, 是則以簽核區域內物件視之
				var fh = this.so.fontSize.replace("pt", "") * 4 / 3,	// 1個字的高度
					th = fh, tw = 0, lw = 0;
				// 計算選用章戳文字的寬度及高度
				for(var i=0; i<this.so.content.length; i++) {
					if(this.so.content[i].match(/[\x0-\xff]/))	// 半形
						lw += (fh / 2);
					else if(this.so.content[i].match(/[\r\n]/)) {	// 折行
						th += fh;
						tw = Math.max(tw, lw);
						lw = 0;
					}
					else
						lw += fh;
				}
				tw = Math.max(tw, lw);
				var res = detectSOInSignArea({left: this.so.pos.left + (tw / 2), top: this.so.pos.top + (th / 2)}, $pg);
			}
			if(!!res) {
				this.so.signArea = res.sa;
				// 1060718 Raymond 1060610/1060632 用中心點判斷得到的相對座標要再減去與左上角的座標差才能還原為左上角的相對座標
				//this.so.offset = res.offset;
				if(!!delta)	// 職名章或影像章戳用中心點的座標差計算左上角位移
					this.so.offset = {left: res.offset.left - delta.x, top: res.offset.top - delta.y};
				else	// 文字章戳不用計算
					//this.so.offset = res.offset;
					this.so.offset = {left: res.offset.left - (tw / 2), top: res.offset.top - (th / 2)};	// 1061213 Raymond 1061195 要扣掉中心點的位移量才是左上角座標
				this.so.saType = res.sa.saType;	// 2017.2.6 bugfix
				this.so.saID = res.sa.id;
				// 從$pg找相符的signArea
				var $sa = $pg.find(".sign-area").filter(function(idx, elm) {
					if($(elm).attr("data-satype") == res.sa.saType &&
						$(elm).attr("data-id") == res.sa.id &&
						$(elm).attr("id") == res.sa.psudoId)	// 2017.2.17 為了修正簽稿會核單有2個以上空ID問題而額外判斷
						return true;
					return false;
				});
				// 1060718 Raymond 1060610/1060632 新增是否位於簽核區域內屬性
				//this.$so.appendTo($sa).css({left: this.so.offset.left, top: this.so.offset.top});
				this.$so.appendTo($sa).css({left: this.so.offset.left, top: this.so.offset.top}).attr("data-oor", "false");
				// 更新此簽核物件的類型為簽核區域內物件
				theAOL.getCurrFolio().getSignFolder().xSignFolder().updateSignObj(this.so);
				/* 2015.10.22 修正絕對座標
				var saOff = this.so.signArea.$area.offset(),
					pgOff = $pg.offset();
				// 2015.10.28 如果有縮放控制的話要套用
				var $viewPort = this.so.signArea.$area.closest(".viewPort"),
					z = $viewPort.data("zoomController");
				if(Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))) != Math.ceil(this.so.pos.top)) {
					theLogger.warn("依相對簽核區域位移修正絕對座標: top:" + this.so.pos.top + " -> " + Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))));
					this.so.pos.top = Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100)));
					this.so.pos.left = Math.ceil(this.so.offset.left + ((saOff.left - pgOff.left) * 100 / ((z !== undefined)?z.currScale:100)));
				}*/
			}
			else {
				// 1060718 Raymond 1060610/1060632 新增是否位於簽核區域內屬性
				//this.$so.appendTo($pg).css({left:this.so.pos.left, top:this.so.pos.top});
				this.$so.appendTo($pg).css({left:this.so.pos.left, top:this.so.pos.top}).attr("data-oor", "true");
			}
			/* 2013.10.8 - Raymond, tooltip沒用
			.on("touchstart", function(event) {
				if(this.hasAttribute("title")) {
					if(that.$tooltip !== undefined)
						that.$tooltip.remove();
					var $this = $(this);
					var pos = Util.getRelativeOffset(this, $this.closest(".viewPort").get(0));
					that.$tooltip = $("<div class='ui-bar-e tooltip'>" + this.title.replace("\n", "<br>") + "</div>")
									.appendTo($this.closest(".viewPort"))
									.css({left:pos.left, top:pos.top})
									.fadeIn();
					if(that.toolTipTimerId != null)
						clearTimeout(that.toolTipTimerId);
					that.toolTipTimerId = setTimeout(function() {
						that.toolTipTimerId = null;
						that.$tooltip.fadeOut();
					}, 5000);
				}
			});*/
		}
		if(!opts.readonly && opts.movable) {
			this.$so.movable({
				target: this,	// 2017.2.2 新增指定callback的目標為此物件
				//baseOffset: getRealPosition(that.$page.get(0)),
				//upperOffset: upperOffset,
				beforeMove: function(param) {
					param.scale = this.$pg.closest(".viewPort").data("zoomController").currScale / 100;
					//param.translateX = iscroll.x/* + (16 * opts.scale)*/;
					//param.translateY = iscroll.y/* + (20 * opts.scale)*/;
					this.$pg.closest(".viewPort").data("editCursor").cmdFloat.hide();
					if(this.so.signArea) {	// 2015.5.8 新增判斷是否屬於簽核區域
						// 2017.1.18 改從$pg找相符的signArea
						var saType = this.so.signArea.saType;
						var saID = this.so.signArea.id;
						var $sa = this.$pg.find(".sign-area").filter(function(idx, elm) {
							if($(elm).attr("data-satype") == saType &&
								$(elm).attr("data-id") == saID)
								return true;
							return false;
						});
						param.baseOffset = $sa.offset();
					}
					else
						param.baseOffset = this.$pg.offset();    // 2013.9.13 - Raymond, 移動前重取$pg的相對座標
					param.baseOffset2 = this.$pg.offset();	// 2017.2.2 設定第2組baseOffset, 使afterMove回呼函式被呼叫時, 多傳入有效的第2組頁座標值
					
					// 2017.3.29 若有連動代字設定, 則觸發點擊代字動作
					if("linkCmt" in this.so) {
						theLogger.warn("連動代字點擊");
						this.so.linkCmt.$so.trigger("vmousedown");
					}
					// 1140815 Raymond 1141030 修正Firefox的PointerId是0不是1, 傳入1會發生Error導致無法拖拉物件的問題
					if(navigator.userAgent.indexOf("Firefox") >= 0)
						this.$so.get(0).setPointerCapture(0);
					else
					// 1131115 Raymond 北榮序374 新增鎖定滑鼠, 以免拖拉簽核物件超出頁面時, 偵測不到mousemove、vmouseup等事件
					this.$so.get(0).setPointerCapture(1);
				},
				afterMove: function(pos, pos2, param) {	// 2017.2.2 新增pos2及param參數
					// 1131115 Raymond 北榮序374 新增$so.offset()資訊
					//theLogger.log("afterMove(id:" + this.so.id + ") - pos:" + pos.left + "," + pos.top + " pos2:" + pos2.left + "," + pos2.top + " $so.position()=" + this.$so.position().left + "," + this.$so.position().top);	// 1080522 Raymond 1080382 新增拖拉的簽核物件ID記錄, 以便追蹤問題
					theLogger.log("afterMove(id:" + this.so.id + ") - pos:" + pos.left + "," + pos.top + " pos2:" + pos2.left + "," + pos2.top + " $so.position()=", this.$so.position(), " $so.offset()=", this.$so.offset(), " $pg.offset()=", this.$pg.offset(), " $so.offset()-$pg.offset()=", {left:this.$so.offset().left - this.$pg.offset().left, top:this.$so.offset().top - this.$pg.offset().top});
					if(isNaN(pos.left)) {
						theLogger.error("pos.left is NaN");
					}
					/* 2017.2.2 修改成在afterMove時才判斷在框外內
					if(that.so.signArea) {	// 2015.5.8 新增判斷是否屬於簽核區域
						// 2017.1.18 改從$pg找相符的signArea
						var $sa = that.$pg.find(".sign-area").filter(function(idx, elm) {
							if($(elm).attr("data-satype") == that.so.signArea.saType &&
								$(elm).attr("data-id") == that.so.signArea.id)
								return true;
							return false;
						});
						var ctnrPos = $sa.position();	// 2017.1.18 改用$sa
						theLogger.log("\t$area.position()=" + ctnrPos.left + "," + ctnrPos.top);
						that.so.offset = pos;	// movable外掛回傳的是相對於container的座標, 要寫在offset
						that.so.pos.left = Math.ceil(pos.left + ctnrPos.left);	// pos記錄的是相對於page的座標
						that.so.pos.top = Math.ceil(pos.top + ctnrPos.top);
						// 2015.11.24 修正絕對座標
						var saOff = $sa.offset(),	// 2017.1.18 改用$sa
							pgOff = that.$pg.offset();
						// 要套用縮放控制
						var $viewPort = that.$pg.closest(".viewPort"),	// 2017.1.18 改用$pg
							z = $viewPort.data("zoomController");
						if(Math.ceil(that.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))) != Math.ceil(that.so.pos.top)) {
							theLogger.warn("依相對簽核區域位移修正絕對座標: top:" + that.so.pos.top + " -> " + Math.ceil(that.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))));
							that.so.pos.top = Math.ceil(that.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100)));
							that.so.pos.left = Math.ceil(that.so.offset.left + ((saOff.left - pgOff.left) * 100 / ((z !== undefined)?z.currScale:100)));
						}
					}
					else
						that.so.pos = pos;*/
					// 1140815 Raymond 1141030 修正Firefox的PointerId是0不是1, 傳入1會發生Error導致無法拖拉物件的問題
					if(navigator.userAgent.indexOf("Firefox") >= 0)
						this.$so.get(0).releasePointerCapture(0);
					else
					// 1131115 Raymond 北榮序374 新增解除鎖定滑鼠
					this.$so.get(0).releasePointerCapture(1);
					// 1131118 Raymond 北榮序374 新增拖拉簽核物件超出頁面時, 要拉回頁面內
					[reposLeft, reposTop] = reposSO(this.so.id, pos2, pos, this.$so.width(), this.$so.height(), this.$pg.width(), this.$pg.height());
					if(reposLeft)
						this.$so.css("left", pos2.left + "px");
					if(reposTop)
						this.$so.css("top", pos2.top + "px");
					// 2017.2.2 判定拖拉結束點是否位於簽核區域內, 是則以簽核區域內物件視之
					var posCt = {left: pos2.left + (this.$so.width() / 2), top: pos2.top + (this.$so.height() / 2)};	// 用中心點當判定標的
					// 1121106 Raymond 1120881 新增章戳物件時, 多傳入章戳大小, 若文稿支援簽核區域排版屬性時, 章戳大小壓到目前點擊的簽核區域下邊界時將自動增高
					//var res = detectSOInSignArea(posCt, this.$pg);
					var res = ("size" in this.so)?detectSOInSignArea(posCt, $pg, {left: pos2.left, top: pos2.top, width: parseFloat(this.so.size.width) / 210 * 794, height: parseFloat(this.so.size.height) / 297 * 1123}):detectSOInSignArea(posCt, this.$pg);
					if(!!res) {
						// 要套用縮放控制
						var z = this.$pg.closest(".viewPort").data("zoomController");	// 2017.2.6 移到上面
						if("signArea" in this.so &&
							this.so.saType == res.sa.saType && this.so.saID == res.sa.id) {
							theLogger.warn("簽核物件拖拉簽核框內->內(同區域)");
							// 從$pg找相符的signArea
							var $sa = this.$pg.find(".sign-area").filter(function(idx, elm) {
								if($(elm).attr("data-satype") == res.sa.saType &&
									$(elm).attr("data-id") == res.sa.id)
									return true;
								return false;
							});
							// 1091026 Raymond 1090735 修正簽核區域在下邊界區時, 因計算簽核區域相對於頁面的座標錯誤, 導致拖拉簽核物件由外至內會發生簽核物件跑到整個頁面之外的問題
							//var ctnrPos = $sa.position();	// 2017.1.18 改用$sa
							var pgOffset = $sa.closest(".pg").offset();
							var ctnrPos = {left: param.baseOffset.left - pgOffset.left, top: param.baseOffset.top - pgOffset.top};
							theLogger.log("\t$area.position()=" + ctnrPos.left + "," + ctnrPos.top);
							theLogger.log("\tso.offset=" + this.so.offset.left + "," + this.so.offset.top + "  ->" + (pos.left) + "," + (pos.top));
							this.so.offset = {left: pos.left, top: pos.top};	// movable外掛回傳的pos是相對於container的座標, 要寫在offset
							// 1131115 Raymond 北榮序374 本來在同一簽核區域內的簽核物件拖拉超出頁面時, 被拉回頁面內後, 偵測仍位於同一簽核區域時, 要重設為簽核區域內的相對座標
							if(reposLeft)
								this.$so.css("left", (res.offset.left - (this.$so.width() / 2)) + "px");
							if(reposTop)
								this.$so.css("top", (res.offset.top - (this.$so.height() / 2)) + "px");
							theLogger.log("\tso.pos=" + this.so.pos.left + "," + this.so.pos.top + "  ->" + (pos.left + ctnrPos.left) + "," + (pos.top + ctnrPos.top) + " pos2=" + pos2.left + "," + pos2.top);
							this.so.pos.left = Math.ceil(pos.left + ctnrPos.left);	// pos記錄的是相對於page的座標
							this.so.pos.top = Math.ceil(pos.top + ctnrPos.top);
							// 1131122 Raymond 北榮序374 合併內政部1131006, 修正從簽核區域內向左拖拉出頁面範圍外時, 拉回的頁面絕對座標位置會是-1的問題
							if(this.so.pos.left < 0) {
								this.so.offset.left -= this.so.pos.left;
								this.so.pos.left = 0;
								theLogger.log("因拉回後的水平絕對座標小於0, 再拉回超出頁面部分的距離: so.pos.left=" + this.so.pos.left + ", so.offset.left=" + so.offset.left);
							}
							if(this.so.pos.top < 0) {
								this.so.offset.top -= this.so.pos.top;
								this.so.pos.top = 0;
								theLogger.log("因拉回後的垂直絕對座標小於0, 再拉回超出頁面部分的距離: so.pos.top=" + this.so.pos.top + ", so.offset.top=" + so.offset.top);
							}
							// 2015.11.24 修正絕對座標
							var saOff = $sa.offset(),	// 2017.1.18 改用$sa
								pgOff = this.$pg.offset();
							// 要套用縮放控制
							//var $viewPort = this.$pg.closest(".viewPort"),	// 2017.1.18 改用$pg
							//	z = $viewPort.data("zoomController");
							if(Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))) != Math.ceil(this.so.pos.top)) {
								theLogger.warn("依相對簽核區域位移修正絕對座標: top:" + this.so.pos.top + " -> " + Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))));
								this.so.pos.top = Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100)));
								this.so.pos.left = Math.ceil(this.so.offset.left + ((saOff.left - pgOff.left) * 100 / ((z !== undefined)?z.currScale:100)));
							}
						}
						else {
							if("signArea" in this.so)
								theLogger.warn("簽核物件拖拉簽核框內->內(不同區域)");
							else
								theLogger.warn("簽核物件拖拉簽核框外->內");
							this.so.signArea = res.sa;
							this.so.offset = {left: res.offset.left, top: res.offset.top};
							this.so.saType = res.sa.saType;
							this.so.saID = res.sa.id;
							var $sa = this.$pg.find(".sign-area").filter(function(idx, elm) {
								if($(elm).attr("data-satype") == res.sa.saType &&
									$(elm).attr("data-id") == res.sa.id)
									return true;
								return false;
							});
							param.baseOffset = $sa.offset();	// 重設baseOffset
							
							// 1091023 Raymond 1090735 修正簽核區域在下邊界區時, 因計算簽核區域相對於頁面的座標錯誤, 導致拖拉簽核物件由外至內會發生簽核物件跑到整個頁面之外的問題
							//var ctnrPos = $sa.position();	// 2017.1.18 改用$sa
							var pgOffset = $sa.closest(".pg").offset();
							var ctnrPos = {left: param.baseOffset.left - pgOffset.left, top: param.baseOffset.top - pgOffset.top};
							this.so.pos = {left: pos2.left, top: pos2.top};	// 頁座標用回呼的pos2
							this.so.offset = {
								left: Math.ceil(pos2.left - (ctnrPos.left * 100 / z.currScale)),	// 2017.2.6 套用縮放比例
								top: Math.ceil(pos2.top - (ctnrPos.top * 100 / z.currScale))
							};
							// 1140317 Raymond 1131214 新增移動簽核物件從簽核區域內至外、外至內或另一個簽核區域時, 先檢查目的簽核區域的簽核物件ID, 決定移入的簽核物件應插入的順序
							// 1060718 Raymond 1060610/1060632 新增是否位於簽核區域內屬性
							//this.$so.appendTo($sa).css(this.so.offset);	// 重設parent及相對位置
							//this.$so.appendTo($sa).css(this.so.offset).attr("data-oor", "false");	// 重設parent、相對位置及是否位於簽核區域內屬性
							MoveInSO(this.$so, $sa).css(this.so.offset).attr("data-oor", "false");	// 重設parent、相對位置及是否位於簽核區域內屬性
							// 1131122 Raymond 北榮序374 合併內政部1131006, 修正從簽核區域內拖拉到頁面範圍外時, 指令列停留在頁面範圍外的問題
							if(reposLeft || reposTop)
								this.$so.trigger("click");
						}
					}
					else {
						if("signArea" in this.so) {
							theLogger.warn("簽核物件拖拉簽核框內->外");
							this.so.pos = {left: pos2.left, top: pos2.top};
							// 1140317 Raymond 1131214 新增移動簽核物件從簽核區域內至外、外至內或另一個簽核區域時, 先檢查目的簽核區域的簽核物件ID, 決定移入的簽核物件應插入的順序
							// parent改成$pg
							// 1060718 Raymond 1060610/1060632 新增是否位於簽核區域內屬性
							//this.$so.appendTo(this.$pg).css(this.so.pos);	// 重設parent及相對位置
							//this.$so.appendTo(this.$pg).css(this.so.pos).attr("data-oor", "true");	// 重設parent、相對位置及是否位於簽核區域內屬性
							MoveInSO(this.$so, this.$pg).css(this.so.pos).attr("data-oor", "true");	// 重設parent、相對位置及是否位於簽核區域內屬性
							// 刪除signArea及offset
							delete this.so.saType;
							delete this.so.saID;
							delete this.so.signArea;
							delete this.so.offset;
							// 1131122 Raymond 北榮序374 合併內政部1131006, 修正從簽核區域內拖拉到頁面範圍外時, 指令列停留在頁面範圍外的問題
							if(reposLeft || reposTop)
								this.$so.trigger("click");
						}
						else {
							theLogger.warn("簽核物件拖拉簽核框外->外");
							// 1131122 Raymond 北榮序374 合併內政部1131006, 修正從簽核區域外拖拉到頁面範圍外時, SignWork.xml及XSignObjs.xml記錄座標是負值的問題
							//this.so.pos = {left: pos.left, top: pos.top};
							this.so.pos = {left: pos2.left, top: pos2.top};
						}
					}
					// 更新此簽核物件的類型為簽核區域內物件
					theAOL.getCurrFolio().getSignFolder().xSignFolder().updateSignObj(this.so);
					
					// 1130710 Raymond 1130637 已儲存上傳過的章戳異動位置後設立簽核物件已異動旗標
					if(!that.so.sessionNew)
						theAOL.getCurrFolio().soModified = true;
					
					// 1131107 Raymond 1130928 新增判斷指定角色的職名章是否移動至指定簽核區域的指定範圍內功能
					if(!!res && that.so.type == "stamp.signet" && !!nsEditor.doSignetAppAction) {
						var d = that.$pg.data("pg").container;
						if(!!d) {
							nsEditor.doSignetAppAction(d, res.sa, that.so.offset, that.so.size);
						}
					}
					
					// 1121106 Raymond 1120881 若回傳值指定須refresh, 則refresh
					if(!!res && res.refresh == true) {
						if(res.goNextPage == true) {
							let fv = this.$pg.closest(".viewPort").data("view");
							fv.goToPage(fv.currPo() + 1);
						}
						else
							this.$pg.closest(".pages").flip("refresh");
					}
				}
			});
		}
		if(so.type == "stamp" || so.type == "stamp.signet") {
			// 如果so帶size屬性則取代預設寬高
			if(so.size !== undefined)
				this.$so.find("img").css(so.size);
			// 是否顯示時間戳記
			if(so.dispTime == true) {
				var $div = $("<div style='display:inline-block; overflow:hidden; text-align:center; color:black '>" + _reformat(so.cTime) + "</div>").appendTo(this.$so);
				if(so.size !== undefined) {
					if(so.size.height.match(/([0-9.]+)mm/)) {   // 計算合適的時間戳記大小
						var h = Number(RegExp.$1) * 300 / 25.4;
						// 1120620 Raymond 標檢局序86 計算職名章高度實際px
						var pxh = Number(RegExp.$1) * 96 / 25.4;
						if(theSSO.User.EnvSettings.get('AOL_SIGNET_TIMESTAMP_SHOW_YEAR') == 'Y')
							$div.css("font-size", Math.floor(h / 12) + "pt");
						else
							$div.css("font-size", Math.floor(h / 10) + "pt");
						// 1061018 Raymond 1060930 修正時戳顯示年時年超出職名章高度問題
						if(theSSO.User.EnvSettings.get('AOL_SIGNET_TIMESTAMP_SHOW_YEAR') == 'Y')
							$div.css("line-height", "1");
						// 1120620 Raymond 標檢局序86 修正職名章高度設定小於7.7mm時, 時戳字型大小計算會得出小於9的大小, 但瀏覽器最小只能顯示9pt的字, 故要再用縮小行高來調整
						else {
							if(h < 90) {	// 職名章高度小於90, 則字型會計算出小於9pt
								var lh = (pxh + 2) / 24;	// 9pt單行高度12px, 2行24px, 職章高度若小於24px, 會使計算行高小於1, 但時戳第2行下方其實還有一點空間, 故再加2px計算行高
								lh = Math.floor(lh * 100) / 100;
								$div.css({"vertical-align": "top", "line-height": Math.max(lh, 0.84)});	// 行高小於0.84會切到第一行字的上面, 故限制最小行高不小於0.84
							}
						}
					}
				}
			}
			// 2016.3.7 新增不套用職名章顏色
			if(SSO_CONFIG && "applySignetColor" in SSO_CONFIG && SSO_CONFIG.applySignetColor == false) {
				that.$so.find("img").get(0).src = so.content;
			}
			else {
				// 改顏色
				// 1060420 Raymond 1060156 修正so.content未載入影像資料時提供function讓載入成功後寫入
				if(typeof so.content === "object") {
					so.reload = function() {
						theLogger.warn("重新載入章戳(ID:" + so.id + ")影像檔...");
						var img = new Image();
						img.onload = function(evt) {
							// 職名章預設顯示紅色, 如果so帶color屬性則取代紅色
							var clr = $.extend({r:255, g:0, b:0}, that.so.color);
							// 2015.5.14 如果opts有透明度設定則新增a
							if("alpha" in opts)
								clr.a = opts.alpha;
							that.$so.find("img").attr("src", Util.modifyImgColor(this, clr));
						}
						img.src = so.content;	// 2017.1.24 TODO: 從SignWork.xml重新載入的可能會比顯示還晚導致img顯示[object%20Object], 對應RD-SignWork.js 694行
					}
				}
				else {
					var img = new Image();
					img.onload = function(evt) {
						//theLogger.log("img.onload..." + evt.target);
						// 職名章預設顯示紅色, 如果so帶color屬性則取代紅色
						var clr = $.extend({r:255, g:0, b:0}, that.so.color);
						// 2015.5.14 如果opts有透明度設定則新增a
						if("alpha" in opts)
							clr.a = opts.alpha;
						that.$so.find("img").attr("src", Util.modifyImgColor(this, clr));
					}
					img.src = so.content;	// 2017.1.24 TODO: 從SignWork.xml重新載入的可能會比顯示還晚導致img顯示[object%20Object], 對應RD-SignWork.js 694行
				}
				// 1060420 Raymond 1060156 修正不要計時主動onload
				//setTimeout(function() {
					//if(that.$so.find("img").get(0).src == "") {
				//		theLogger.log("0.1秒後背景img載入圖形未觸發onload的話, 主動呼叫img.onload");
				//		img.onload();
					//}
				//}, 0);
				//this.$so.find("img").get(0).src = this.so.content;
			}
		}
		else if(so.type == "stamp.text") {
			// 1081218 Raymond FIX XSS & 保留折行
			//this.$so.html("<p>" + so.content + "</p>");
			this.$so.html("<p style='white-space:pre'></p>");
			this.$so.find("p").text(so.content.replace("<br>", "\n"));	// 為了顯示已用&lt;br&gt;記錄在封裝檔中的文字意見, 替換成折行字元
			if(so.fontSize !== undefined)
				this.$so.find("p").css("font-size", so.fontSize);
			if(so.fontName !== undefined)
				this.$so.find("p").css("font-family", so.fontName);
			if(so.fontWeight)
				this.$so.find("p").css("font-weight", "bolder");
			if(so.fontStyle)
				this.$so.find("p").css("font-style", "italic");
			//if(so.style == "底線")
			//    this.$so.find("p").css("text-decoration", "underline");
			if(so.color !== undefined)
				this.$so.find("p").css("color", Util.toHtmlColor(so.color));
			// 1101119 Raymond 1101228 新增文字式選用章戳也可使用拖拉邊框以調整寬度功能
			this.$so.resizable({	//2016.12.27	Leslie	加上jQueryUI.Resize()，增加可控制寬度
				handles: "e",
				start: function(event,ui){
					var srcContent = that.so.content;
					// 1131128 Raymond 修正1120379衍生問題, 文字式選用章戳在儲存關閉再開啟後, 拖拉改變寬度時, 內容變空字串的問題
					//if('srcContent' in that.so)
					if('srcContent' in that.so && !!that.so.srcContent)
						srcContent = that.so.srcContent;
					else
						that.so.srcContent = srcContent;
					// 1081217 Raymond FIX XSS
					//that.$so.find("> div:not(.ui-resizable-handle), > p").html(srcContent.replace(/\n/g, '<br>'));
					that.$so.find("> div:not(.ui-resizable-handle), > p").text(srcContent);
				},
				stop: function(event,ui){
					theLogger.log("文字意見新寬度："+ui.size.width);
					// 1131119 Raymond 北榮序374 新增拖拉簽核物件右邊框超出頁面時, 要拉回頁面內
					let cw;
					if(that.so.pos.left + ui.size.width > that.$pg.width()) {
						cw = that.$pg.width() - that.so.pos.left;
						console.log("寬度超出頁面範圍, 縮回為" + cw);
						ui.size.width = cw;
						that.$so.css("width", cw);
					}
					var srcContent = that.so.content;
					if('srcContent' in that.so)
						srcContent = that.so.srcContent;
					else
						that.so.srcContent = srcContent;
					var strCut = breakLineForTextComment(srcContent,that.$so.find("> div:not(.ui-resizable-handle), > p").css('font-size').replace('px',''),that.so.fontWeight,ui.size.width);
					// 1081217 Raymond FIX XSS
					//that.$so.find("> div:not(.ui-resizable-handle), > p").html(strCut.replace(/\n/g, '<br>'));
					that.$so.find("> div:not(.ui-resizable-handle), > p").text(strCut);
					that.so.content = strCut;
					that.so.width = ui.size.width;	//2016.12.29	Leslie	記錄目前寬度
					
					// 1130710 Raymond 1130637 已儲存過的文字式章戳異動寬度後設立簽核物件已異動旗標
					if(!that.so.sessionNew)
						theAOL.getCurrFolio().soModified = true;
				}
			});
		}
		
		if(this.so.boundTo != undefined && opts.bound) {
			this.so.boundTo.addSignObj(this.so, this);	// 2017.1.12 新增第2參數, 給簽核物件記錄檔使用
			this.so.bounded = true;
		}
		
		// 1131106 Raymond 1130928 新增判斷指定角色的職名章是否加蓋於指定簽核區域的指定範圍內功能
		if(!!res && so.type == "stamp.signet" && !!nsEditor.doSignetAppAction) {
			var d = that.$pg.data("pg").container;
			if(!!d) {
				nsEditor.doSignetAppAction(d, res.sa, that.so.offset, that.so.size);
			}
		}
		
		// 1130423 Raymond 1120881 若回傳值指定須refresh, 搬至最後執行, 以免代字位置跑掉
		if(!!res && res.refresh == true) {
			if(opts.retNeedRefresh)	// 1130422 Raymond 1120881 判斷若需重新整理時應回傳, 則回傳res, 不要直接refresh/goToPage
				return res;
			if(res.goNextPage == true) {
				let fv = this.$pg.closest(".viewPort").data("view");
				fv.goToPage(fv.currPo() + 1);
			}
			else
				$pg.closest(".pages").flip("refresh");
		}
	}
}

// 貼布
// 1130312 Raymond 1130050 新增「貼布」簽核物件
function EraserTape(so) {
	
	this.so = so;
	
	// 「貼布」簽核物件比照一代是用「影像」類型記錄在封裝檔, 但在簽核時新增的「貼布」簽核物件, 因為需隨時可調整size, 故是採用div加底色呈現, 在新增簽核物件及調整size後呼叫makeContentImage來動態產生指定size的影像
	this.makeContentImage = function() {
		var w = this.$so.find("> div:not(.ui-resizable-handle)").width(),
			h = this.$so.find("> div:not(.ui-resizable-handle)").height();
		if(w > 0 && h > 0) {
			w = Math.ceil(w);
			h = Math.ceil(h);
			theLogger.log("生成貼布影像...寬高:" + w + " x " + h);
			var can = document.createElement("canvas");
			can.width = w;
			can.height = h;
			var ctx = can.getContext("2d");
			ctx.fillStyle = this.so.color;
			ctx.fillRect(0, 0, w, h);
			this.so.content = can.toDataURL("image/png");
		}
		else if(h > 0)
			theLogger.error("貼布簽核物件的寬度(" + w + " x " + h + ")未大於0, 無法產生有效的影像");
		else
			theLogger.error("貼布簽核物件的高度(" + w + " x " + h + ")未大於0, 無法產生有效的影像");
	}
	this.initiateSO = function($pg, options) {
		
		this.$pg = $pg;
		
		var opts = $.extend({bound: true, movable: true}, options);
		
		//1130117	Leslie[1120967]	修正數位墨水物件太小，造成無法點擊出正確選單的問題
		var bExtentLineSize = false;
		try{
			bExtentLineSize = ('size' in so)&&(parseFloat(so.size.width) < 1 || parseFloat(so.size.height) < 1)			
		}catch{}
		
		var upperOffset = {
			x: $pg.get(0).offsetLeft,
			y: $pg.get(0).offsetTop
		}
		var that = this;
		this.$so = $("<div class='sign-obj so-img' data-id='" + so.id + "' title='" + so.info + "'>\
<div style='display:block; background-color:" + so.color + (('size' in so)?"; width:"+so.size.width+"; height:"+so.size.height:"") +"'></div></div>")	//2017.2.21	Leslie	直接設定其大小	//2017.3.2	Leslie	bugfix 手寫簽核物件初始無size，補上判斷
			//.appendTo($pg)
			//.css({left:that.so.pos.left, top:that.so.pos.top})
			.on('click', function(event) {
				that.$pg.find(".sign-obj").removeClass("so-active");
				var $this = $(this).addClass("so-active");
				var c = that.$pg.closest(".viewPort").data("editCursor");
				
				var cmds = new Array();
				//cmds.special = true;
				cmds.push({name:"刪除", func: function() {
					$this.remove();
					if(that.so.boundTo !== undefined && that.so.bounded) {
						that.so.boundTo.delSignObj(that.so);
					}
					// 2015.11.4 - 刪除後無對象, 隱藏指令列
					c.cmdFloat.hide();
				}});

				c.cmdFloat.setCmds(cmds);
				c.cmdFloat.setElem(this);
				return false;
			}).resizable({	//2016.12.27	Leslie	加上jQueryUI.Resize()，增加可控制寬度
				//handles: "se",
				start: function(event,ui){
					var origSize = that.so.size;
					theLogger.log("貼布原寬高：" + origSize.width + "X" + origSize.height);
					that.$so.addClass("so-active");
					//this.setPointerCapture(1);
				},
				stop: function(event,ui){
					theLogger.log("貼布新寬高：" + ui.size.width + "X" + ui.size.height);
					that.$so.find("> div:not(.ui-resizable-handle)").css({width: ui.size.width, height: ui.size.height});
					that.so.size.width = (ui.size.width * 210 / 794) + "mm";
					that.so.size.height = (ui.size.height * 297 / 1123) + "mm";
					theLogger.log("貼布新寬高：" + that.so.size.width + "X" + that.so.size.height);
					// 1131119 Raymond 北榮序374 新增拖拉簽核物件右邊框超出頁面時, 要拉回頁面內
					let cw, ch;
					if(that.so.pos.left + ui.size.width > that.$pg.width()) {
						cw = that.$pg.width() - that.so.pos.left;
						console.log("寬度超出頁面範圍, 縮回為" + cw);
						that.so.size.width = (cw * 210 / 794) + "mm";
						that.$so.find("> div:not(.ui-resizable-handle)").css("width", cw);
						that.$so.css("width", cw);
					}
					if(that.so.pos.top + ui.size.height > that.$pg.height()) {
						ch = that.$pg.height() - that.so.pos.top;
						console.log("高度超出頁面範圍, 縮回為" + ch);
						that.so.size.height = (cw * 297 / 1123) + "mm";
						that.$so.find("> div:not(.ui-resizable-handle)").css("height", ch);
						that.$so.css("height", ch);
					}
					//this.releasePointerCapture(1);
					that.makeContentImage();
					
					// 1130710 Raymond 1130637 已儲存上傳過的貼布異動寬高後設立簽核物件已異動旗標
					if(!that.so.sessionNew)
						theAOL.getCurrFolio().soModified = true;
				}
			});
		// 2015.5.27 指定容器元素
		if(this.so.signArea) {
			theLogger.log("簽核物件屬於簽核區域");
			if("offset" in that.so) {	// 2015.6.16 新增判斷offset, 此數值已是相對於簽核區域的座標值
				// 2017.1.18 改從$pg找相符的signArea
				//this.$so.appendTo(this.so.signArea.$area).css({left: this.so.offset.left, top: this.so.offset.top});
				var $sa = $pg.find(".sign-area").filter(function(idx, elm) {
					if($(elm).attr("data-satype") == that.so.signArea.saType &&
						$(elm).attr("data-id") == that.so.signArea.id &&
						$(elm).attr("id") == that.so.signArea.psudoId)	// 2017.2.17 為了修正簽稿會核單有2個以上空ID問題而額外判斷
						return true;
					return false;
				});
				// 2017.2.7 圖示顯示時以offset為圖示的中心點
				//this.$so.appendTo($sa).css({left: this.so.offset.left, top: this.so.offset.top});
				// 1060718 Raymond 1060610/1060632 新增是否位於簽核區域內屬性
				//this.$so.appendTo($sa).css({left: this.so.offset.left - (this.so.asIcon == true?18:0), top: this.so.offset.top - (this.so.asIcon == true?18:0)});
				this.$so.appendTo($sa).css({left: this.so.offset.left - ((this.so.asIcon)?18:0), top: this.so.offset.top - ((this.so.asIcon)?18:0)}).attr("data-oor", "false");
				// 2015.10.22 修正絕對座標
				var saOff = $sa.offset(),	// 2017.1.18 改用$sa
					pgOff = $pg.offset();
				// 2015.10.28 如果有縮放控制的話要套用
				var $viewPort = $pg.closest(".viewPort"),	// 2017.1.18 改用$pg
					z = $viewPort.data("zoomController");
				// 1070504 Raymond 1070447 修正在非100%原尺寸縮放率時儲存, 會誤判數位墨水的絕對座標值不符並改為錯誤的絕對座標值問題
				if(Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))) != Math.ceil(this.so.pos.top)) {
					theLogger.warn("依相對簽核區域位移修正絕對座標: top:" + this.so.pos.top + " -> " + Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))));
					this.so.pos.top = Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100)));
					this.so.pos.left = Math.ceil(this.so.offset.left + ((saOff.left - pgOff.left) * 100 / ((z !== undefined)?z.currScale:100)));
				}
			}
			else {
				theLogger.error("簽核物件(ID:" + this.so.id + ")屬於簽核區域內物件, 卻無相對位置資訊");	// 2017.1.18 增加例外說明
				var ctnrPos = this.so.signArea.$area.position();
				// 1060718 Raymond 1060610/1060632 新增是否位於簽核區域內屬性
				this.$so.appendTo(this.so.signArea.$area).css({left: this.so.pos.left - ctnrPos.left - ((this.so.asIcon)?18:0), top: this.so.pos.top - ctnrPos.top - ((this.so.asIcon)?18:0)}).attr("data-oor", "false");
			}
		}
		else {
			// 1060718 Raymond 1060610/1060632 修正判斷是否位於簽核框內時, 與移動一樣要先算出中心點再判斷
			//var res = detectSOInSignArea(this.so.pos, $pg);	// 2017.1.18 判定起始點是否位於簽核區域內, 是則以簽核區域內物件視之
			var delta = {x: (this.so.asIcon)?0:(parseFloat(this.so.size.width) / 420 * 794), y: (this.so.asIcon)?0:(parseFloat(this.so.size.height) / 594 * 1123)};	// 左上角與中心點的座標差, 若為貼式數位墨水物件則為0
			var posCt = {left: this.so.pos.left + delta.x, top: this.so.pos.top + delta.y};	// 用中心點當判定標的
			var res = detectSOInSignArea(posCt, $pg);	// 2017.1.18 判定起始點是否位於簽核區域內, 是則以簽核區域內物件視之
			if(!!res) {
				this.so.signArea = res.sa;
				// 1060718 Raymond 1060610/1060632 用中心點判斷得到的相對座標要再減去與左上角的座標差才能還原為左上角的相對座標
				//this.so.offset = res.offset;
				this.so.offset = {left: res.offset.left - delta.x, top: res.offset.top - delta.y};
				this.so.saType = res.sa.saType;	// 2017.2.6 bugfix
				this.so.saID = res.sa.id;
				// 從$pg找相符的signArea
				var $sa = $pg.find(".sign-area").filter(function(idx, elm) {
					if($(elm).attr("data-satype") == res.sa.saType &&
						$(elm).attr("data-id") == res.sa.id &&
						$(elm).attr("id") == res.sa.psudoId)	// 2017.2.17 為了修正簽稿會核單有2個以上空ID問題而額外判斷
						return true;
					return false;
				});
				// 2017.2.7 圖示顯示時以offset為圖示的中心點
				this.$so.appendTo($sa).css({left: this.so.offset.left - ((this.so.asIcon)?18:0), top: this.so.offset.top - ((this.so.asIcon)?18:0)}).attr("data-oor", "false");
				// 更新此簽核物件的類型為簽核區域內物件
				theAOL.getCurrFolio().getSignFolder().xSignFolder().updateSignObj(this.so);
			}
			else {
				// 1060718 Raymond 1060610/1060632 新增是否位於簽核區域內屬性
				this.$so.appendTo($pg).css({left: this.so.pos.left - ((this.so.asIcon)?18:0), top: this.so.pos.top - ((this.so.asIcon)?18:0)}).attr("data-oor", "true");
			}
		}
		
		//1130117	Leslie[1120967]	修正數位墨水物件太小，造成無法點擊出正確選單的問題
		if(bExtentLineSize){
			try{
				that.$so.css('margin',0);
				if(!so.asIcon){
					that.$so.css((parseFloat(so.size.height) < 1?'height':'width'),5)
				}
			}catch{}
		}
		
		if(opts.movable) {
			this.$so.movable({
				target: this,	// 2017.2.2 新增指定callback的目標為此物件
				//baseOffset: getRealPosition(that.$page.get(0)),
				//upperOffset: upperOffset,
				beforeMove: function(param) {
					param.scale = this.$pg.closest(".viewPort").data("zoomController").currScale / 100;
					this.$pg.closest(".viewPort").data("editCursor").cmdFloat.hide();
					//$(this).addClass("so-active");
					if(this.so.signArea) {	// 2015.5.29 新增判斷是否屬於簽核區域
						// 2017.1.18 改從$pg找相符的signArea
						var saType = this.so.signArea.saType;
						var saID = this.so.signArea.id;
						var $sa = this.$pg.find(".sign-area").filter(function(idx, elm) {
							if($(elm).attr("data-satype") == saType &&
								$(elm).attr("data-id") == saID)
								return true;
							return false;
						});
						param.baseOffset = $sa.offset();
					}
					else
						param.baseOffset = this.$pg.offset();    // 2013.9.13 - Raymond, 移動前重取$pg的相對座標
					param.baseOffset2 = this.$pg.offset();	// 2017.2.2 設定第2組baseOffset, 使afterMove回呼函式被呼叫時, 多傳入有效的第2組頁座標值
					// 1140815 Raymond 1141030 修正Firefox的PointerId是0不是1, 傳入1會發生Error導致無法拖拉物件的問題
					if(navigator.userAgent.indexOf("Firefox") >= 0)
						this.$so.get(0).setPointerCapture(0);
					else
					// 1131119 Raymond 北榮序374 新增鎖定滑鼠, 以免拖拉簽核物件超出頁面時, 偵測不到mousemove、vmouseup等事件
					this.$so.get(0).setPointerCapture(1);
				},
				afterMove: function(pos, pos2, param) {	// 2017.2.2 新增pos2及param參數
					// 1140815 Raymond 1141030 修正Firefox的PointerId是0不是1, 傳入1會發生Error導致無法拖拉物件的問題
					if(navigator.userAgent.indexOf("Firefox") >= 0)
						this.$so.get(0).releasePointerCapture(0);
					else
					// 1131119 Raymond 北榮序374 新增解除鎖定滑鼠
					this.$so.get(0).releasePointerCapture(1);
					// 1131119 Raymond 北榮序374 新增拖拉簽核物件超出頁面時, 要拉回頁面內
					[reposLeft, reposTop] = reposSO(this.so.id, pos2, pos, this.$so.width(), this.$so.height(), this.$pg.width(), this.$pg.height());
					if(reposLeft)
						this.$so.css("left", pos2.left + "px");
					if(reposTop)
						this.$so.css("top", pos2.top + "px");
					// 2017.2.2 判定拖拉結束點是否位於簽核區域內, 是則以簽核區域內物件視之
					// 1060718 Raymond 1060610/1060632 新增判斷是否為貼式數位墨水物件, 是則加回圖示置中所減掉的位移量, 否則加影像大小除以2做為中心點座標
					//var posCt = {left: pos2.left + (this.$so.width() / 2), top: pos2.top + (this.$so.height() / 2)};	// 用中心點當判定標的
					var posCt = {left: pos2.left + ((this.so.asIcon)?18:(this.$so.width() / 2)), top: pos2.top + ((this.so.asIcon)?18:(this.$so.height() / 2))};	// 用中心點當判定標的
					var res = detectSOInSignArea(posCt, this.$pg);
					if(!!res) {
						var z = this.$pg.closest(".viewPort").data("zoomController");	// 2017.2.6 移到上面
						if("signArea" in this.so &&
							this.so.saType == res.sa.saType && this.so.saID == res.sa.id) {
							theLogger.warn("簽核物件拖拉簽核框內->內(同區域)");
							// 從$pg找相符的signArea
							var $sa = this.$pg.find(".sign-area").filter(function(idx, elm) {
								if($(elm).attr("data-satype") == res.sa.saType &&
									$(elm).attr("data-id") == res.sa.id)
									return true;
								return false;
							});
							// 1091026 Raymond 1090735 修正簽核區域在下邊界區時, 因計算簽核區域相對於頁面的座標錯誤, 導致拖拉簽核物件由外至內會發生簽核物件跑到整個頁面之外的問題
							//var ctnrPos = $sa.position();	// 2017.1.18 改用$sa
							var pgOffset = $sa.closest(".pg").offset();
							var ctnrPos = {left: param.baseOffset.left - pgOffset.left, top: param.baseOffset.top - pgOffset.top};
							theLogger.log("\t$area.position()=" + ctnrPos.left + "," + ctnrPos.top);
							theLogger.log("\tso.offset=" + this.so.offset.left + "," + this.so.offset.top + "  ->" + (pos.left) + "," + (pos.top));
							// 1060718 Raymond 1060610/1060632 新增判斷是否為貼式數位墨水物件, 是則加回圖示置中所減掉的位移量
							//this.so.offset = {left: pos.left, top: pos.top};	// movable外掛回傳的pos是相對於container的座標, 要寫在offset
							this.so.offset = {left: pos.left + ((this.so.asIcon)?18:0), top: pos.top + ((this.so.asIcon)?18:0)};	// movable外掛回傳的pos是相對於container的座標, 要寫在offset
							// 1131119 Raymond 北榮序374 本來在同一簽核區域內的簽核物件拖拉超出頁面時, 被拉回頁面內後, 偵測仍位於同一簽核區域時, 要重設為簽核區域內的相對座標
							if(reposLeft)
								this.$so.css("left", (res.offset.left - (this.$so.width() / 2)) + "px");
							if(reposTop)
								this.$so.css("top", (res.offset.top - (this.$so.height() / 2)) + "px");
							theLogger.log("\tso.pos=" + this.so.pos.left + "," + this.so.pos.top + "  ->" + (pos.left + ctnrPos.left) + "," + (pos.top + ctnrPos.top) + " pos2=" + pos2.left + "," + pos2.top);
							this.so.pos.left = Math.ceil(pos.left + ctnrPos.left);	// pos記錄的是相對於page的座標
							this.so.pos.top = Math.ceil(pos.top + ctnrPos.top);
							// 1131122 Raymond 北榮序374 合併內政部1131006, 修正從簽核區域內向左拖拉出頁面範圍外時, 拉回的頁面絕對座標位置會是-1的問題
							if(this.so.pos.left < 0) {
								this.so.offset.left -= this.so.pos.left;
								this.so.pos.left = 0;
								theLogger.log("因拉回後的水平絕對座標小於0, 再拉回超出頁面部分的距離: so.pos.left=" + this.so.pos.left + ", so.offset.left=" + so.offset.left);
							}
							if(this.so.pos.top < 0) {
								this.so.offset.top -= this.so.pos.top;
								this.so.pos.top = 0;
								theLogger.log("因拉回後的垂直絕對座標小於0, 再拉回超出頁面部分的距離: so.pos.top=" + this.so.pos.top + ", so.offset.top=" + so.offset.top);
							}
							// 2015.11.24 修正絕對座標
							var saOff = $sa.offset(),	// 2017.1.18 改用$sa
								pgOff = this.$pg.offset();
							// 要套用縮放控制
							//var $viewPort = this.$pg.closest(".viewPort"),	// 2017.1.18 改用$pg
							//	z = $viewPort.data("zoomController");
							if(Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))) != Math.ceil(this.so.pos.top)) {
								theLogger.warn("依相對簽核區域位移修正絕對座標: top:" + this.so.pos.top + " -> " + Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100))));
								this.so.pos.top = Math.ceil(this.so.offset.top + ((saOff.top - pgOff.top) * 100 / ((z !== undefined)?z.currScale:100)));
								this.so.pos.left = Math.ceil(this.so.offset.left + ((saOff.left - pgOff.left) * 100 / ((z !== undefined)?z.currScale:100)));
							}
						}
						else {
							if("signArea" in this.so)
								theLogger.warn("簽核物件拖拉簽核框內->內(不同區域)");
							else
								theLogger.warn("簽核物件拖拉簽核框外->內");
							this.so.signArea = res.sa;
							this.so.offset = {left: res.offset.left, top: res.offset.top};
							this.so.saType = res.sa.saType;
							this.so.saID = res.sa.id;
							var $sa = this.$pg.find(".sign-area").filter(function(idx, elm) {
								if($(elm).attr("data-satype") == res.sa.saType &&
									$(elm).attr("data-id") == res.sa.id)
									return true;
								return false;
							});
							param.baseOffset = $sa.offset();	// 重設baseOffset
							
							// 1091026 Raymond 1090735 修正簽核區域在下邊界區時, 因計算簽核區域相對於頁面的座標錯誤, 導致拖拉簽核物件由外至內會發生簽核物件跑到整個頁面之外的問題
							//var ctnrPos = $sa.position();	// 2017.1.18 改用$sa
							var pgOffset = $sa.closest(".pg").offset();
							var ctnrPos = {left: param.baseOffset.left - pgOffset.left, top: param.baseOffset.top - pgOffset.top};
							this.so.pos = {left: pos2.left, top: pos2.top};	// 頁座標用回呼的pos2
							this.so.offset = {
								left: Math.ceil(pos2.left - (ctnrPos.left * 100 / z.currScale)),	// 2017.2.6 套用縮放比例
								top: Math.ceil(pos2.top - (ctnrPos.top * 100 / z.currScale))
							};
							// 1140317 Raymond 1131214 新增移動簽核物件從簽核區域內至外、外至內或另一個簽核區域時, 先檢查目的簽核區域的簽核物件ID, 決定移入的簽核物件應插入的順序
							// 1060718 Raymond 1060610/1060632 修正圖示狀態下由框外拉至框內時, 相對座標未減去圖示置中的座標差問題並新增是否位於簽核區域內屬性
							//this.$so.appendTo($sa).css(this.so.offset);	// 重設parent及相對位置
							//this.$so.appendTo($sa).css({left: this.so.offset.left - (this.so.asIcon?18:0), top: this.so.offset.top - (this.so.asIcon?18:0)}).attr("data-oor", "false");	// 重設parent、相對位置及是否位於簽核區域內屬性
							MoveInSO(this.$so, $sa).css({left: this.so.offset.left - (this.so.asIcon?18:0), top: this.so.offset.top - (this.so.asIcon?18:0)}).attr("data-oor", "false");	// 重設parent、相對位置及是否位於簽核區域內屬性
							// 1131122 Raymond 北榮序374 合併內政部1131006, 修正從簽核區域內拖拉到頁面範圍外時, 指令列停留在頁面範圍外的問題
							if(reposLeft || reposTop)
								this.$so.trigger("click");
						}
						if(this.so.asIcon == true) {	// 2016.10.13 修正移動時pos變成左上角問題
							this.so.pos.left += 18;
							this.so.pos.top += 18;
						}
					}
					else {
						if("signArea" in this.so) {
							theLogger.warn("簽核物件拖拉簽核框內->外");
							if(this.so.asIcon == true)	// 2016.10.13 修正移動時pos變成左上角問題
								this.so.pos = {left: pos2.left + 18, top: pos2.top + 18};
							else
								this.so.pos = {left: pos2.left, top: pos2.top};
							// 1140317 Raymond 1131214 新增移動簽核物件從簽核區域內至外、外至內或另一個簽核區域時, 先檢查目的簽核區域的簽核物件ID, 決定移入的簽核物件應插入的順序
							// parent改成$pg
							// 1060718 Raymond 1060610/1060632 新增是否位於簽核區域內屬性
							//this.$so.appendTo(this.$pg).css(this.so.pos);	// 重設parent及相對位置
							//this.$so.appendTo(this.$pg).css({left: this.so.pos.left - ((this.so.asIcon)?18:0), top: this.so.pos.top - ((this.so.asIcon)?18:0)}).attr("data-oor", "true");	// 重設parent、相對位置及是否位於簽核區域內屬性, 修正圖示在移動後未置中問題
							MoveInSO(this.$so, this.$pg).css({left: this.so.pos.left - ((this.so.asIcon)?18:0), top: this.so.pos.top - ((this.so.asIcon)?18:0)}).attr("data-oor", "true");	// 重設parent、相對位置及是否位於簽核區域內屬性, 修正圖示在移動後未置中問題
							// 刪除signArea及offset
							delete this.so.saType;
							delete this.so.saID;
							delete this.so.signArea;
							delete this.so.offset;
							// 1131122 Raymond 北榮序374 合併內政部1131006, 修正從簽核區域內拖拉到頁面範圍外時, 指令列停留在頁面範圍外的問題
							if(reposLeft || reposTop)
								this.$so.trigger("click");
						}
						else {
							theLogger.warn("簽核物件拖拉簽核框外->外");
							if(this.so.asIcon == true)	// 2016.10.13 修正移動時pos變成左上角問題
								// 1131122 Raymond 北榮序374 合併內政部1131006, 修正從簽核區域外拖拉到頁面範圍外時, SignWork.xml及XSignObjs.xml記錄座標是負值的問題
								//this.so.pos = {left: pos.left + 18, top: pos.top + 18};
								this.so.pos = {left: pos2.left + 18, top: pos2.top + 18};
							else
								// 1131122 Raymond 北榮序374 合併內政部1131006, 修正從簽核區域外拖拉到頁面範圍外時, SignWork.xml及XSignObjs.xml記錄座標是負值的問題
								//this.so.pos = {left: pos.left, top: pos.top};
								this.so.pos = {left: pos2.left, top: pos2.top};
						}
					}
					// 更新此簽核物件的類型為簽核區域內物件
					theAOL.getCurrFolio().getSignFolder().xSignFolder().updateSignObj(this.so);
					
					// 1130710 Raymond 1130637 已儲存上傳過的貼布異動位置後設立簽核物件已異動旗標
					if(!that.so.sessionNew)
						theAOL.getCurrFolio().soModified = true;
				}
			});
		}
		
		theLogger.log("貼布初始寬高:" + this.$so.find("> div:not(.ui-resizable-handle)").get(0).style.width + " x " + this.$so.find("> div:not(.ui-resizable-handle)").get(0).style.height);
		if(!this.so.content)
			this.makeContentImage();
		
		if(this.so.boundTo != undefined && opts.bound) {
			this.so.boundTo.addSignObj(this.so, this);	// 2017.1.12 新增第2參數, 給簽核物件記錄檔使用
			this.so.bounded = true;
		}
	}
}

// 2015.6.23 新增基底函式, 格式化時戳文字
Stamp.prototype.formatTime = function(oTime) {
	if(theSSO.User.EnvSettings.get('AOL_SIGNET_TIMESTAMP_SHOW_YEAR') == 'Y')
		return Util.padLeft(oTime.getYear() - 11, 3) + "<br>" + Util.padLeft(oTime.getMonth() + 1, 2) + Util.padLeft(oTime.getDate(), 2) + "<br>" + Util.padLeft(oTime.getHours(), 2) + Util.padLeft(oTime.getMinutes(), 2);
	return Util.padLeft(oTime.getMonth() + 1, 2) + Util.padLeft(oTime.getDate(), 2) + "<br>" + Util.padLeft(oTime.getHours(), 2) + Util.padLeft(oTime.getMinutes(), 2);
}

function SignObjBuilder($pg, readOnly, draftEditable) {	// 2016.8.10 新增唯讀參數, 2016.9.23 新增內文可否編輯參數
	
	this.$pg = $pg;
	
	this.getCurrScale = function() {
		return 100;
	}
	this.getNewID = function() {
		//return Math.ceil(Math.random() * 1000);
		return this.$pg.closest(".viewPort").data("view").newSOID();	// 2017.1.18 改成由公文控制新增簽核物件的ID
	}
	this.makeSOInfo = function(id, time, user) {
		if(typeof time == "object") {
			// 1100715 Raymond 1100854 新增[高大客製化]簽核物件tooltip顯示到秒功能
			if(theUserInfo.OrgNickName == "NUK")
				return (time.getYear() - 11) + "年" + (time.getMonth() + 1) + "月" + time.getDate() + "日 " + Util.padLeft(time.getHours(), 2) + ":" + Util.padLeft(time.getMinutes(), 2) + ":" + Util.padLeft(time.getSeconds(), 2) + "\n" + ((!!theSSO && !!theSSO.User && !!theSSO.User.name && theSSO.User.name.length > 0)?theSSO.User.name:user);
			// 1091231 Raymond 信保序138 代理人蓋章的tooltip應顯示代理人姓名而非被代理人姓名
			// 1061226 Raymond 1061241 修正月份少1的問題
			// JS回傳的年是減去了1900的值
			//return (time.getYear() - 11) + "年" + time.getMonth() + "月" + time.getDate() + "日 " + Util.padLeft(time.getHours(), 2) + ":" + Util.padLeft(time.getMinutes(), 2) + "\n" + user;
			//return (time.getYear() - 11) + "年" + (time.getMonth() + 1) + "月" + time.getDate() + "日 " + Util.padLeft(time.getHours(), 2) + ":" + Util.padLeft(time.getMinutes(), 2) + "\n" + user;
			return (time.getYear() - 11) + "年" + (time.getMonth() + 1) + "月" + time.getDate() + "日 " + Util.padLeft(time.getHours(), 2) + ":" + Util.padLeft(time.getMinutes(), 2) + "\n" + ((!!theSSO && !!theSSO.User && !!theSSO.User.name && theSSO.User.name.length > 0)?theSSO.User.name:user);
		}
		// 1091231 Raymond 信保序138 代理人蓋章的tooltip應顯示代理人姓名而非被代理人姓名
		//return time + "\n" + user;
		return time + "\n" + ((!!theSSO && !!theSSO.User && !!theSSO.User.name && theSSO.User.name.length > 0)?theSSO.User.name:user);
	}
	
	// 1090312 Raymond 1081105 新增判斷符合條件時, 自動移動職名章至目前點擊簽核區域的相對位置
	var aolResetSignetPosByRoles = theSSO.User.EnvSettings.get("AOL_RESET_SIGNET_POS_BY_ROLES");
	var resetSignetPos = [];
	if(aolResetSignetPosByRoles.length > 0) {
		var sets = aolResetSignetPosByRoles.split("|");
		for(var i=0, n=sets.length; i<n; i++) {
			if(sets[i].length > 0) {
				var params = sets[i].split(",");
				// 1110427 Raymond 1110502 新增擴充參數定義4個數值, 第1個是簽核框ID, 其次是原來的角色代碼, X相對位置, Y相對位置
				//if(params.length >= 3) {	// 一組設定至少要3個數值
				if(params.length > 3) {
					resetSignetPos.push({saId: params[0],
										roleId: params[1],
										offsetX: params[2],
										offsetY: params[3]});
				}
				else if(params.length == 3) {
					resetSignetPos.push({roleId: params[0],
										offsetX: params[1],
										offsetY: params[2]});
				}
				else
					theLogger.warn("第" + i + "組設定格式有誤, 至少要有3個數值");
			}
		}
	}
	function getResetSignetPos(pos, $pg) {
		if(aolResetSignetPosByRoles.length > 0) {	// 有設定環境變數才啟用
			var res = detectSOInSignArea(pos, $pg);
			if(!!res) {
				theLogger.log("點擊位置位於簽核框 - " + res.sa.saType + "," + res.sa.id);
				for(var i=0, n=resetSignetPos.length; i<n; i++) {
					// 1110427 Raymond 1110502 新增判斷若參數設定4參數, 則比對第1個ID參數是否符合簽核框ID
					if("saId" in resetSignetPos[i]) {
						if(res.sa.id == resetSignetPos[i].saId && theAOL.docObj.ownRoleId == resetSignetPos[i].roleId) {
							theLogger.log("符合簽核框ID及角色 - " + res.sa.id + ", " + theAOL.docObj.ownRoleId);
							return {signArea: res.sa,
									offsetX: resetSignetPos[i].offsetX *  794 / 210,
									offsetY: resetSignetPos[i].offsetY * 1123 / 297};
						}
					}
					else if(theAOL.docObj.ownRoleId == resetSignetPos[i].roleId) {
						theLogger.log("符合角色 - " + theAOL.docObj.ownRoleId);
						return {signArea: res.sa,
								offsetX: resetSignetPos[i].offsetX *  794 / 210,
								offsetY: resetSignetPos[i].offsetY * 1123 / 297};
					}
				}
				theLogger.log("不符合環境變數'AOL_RESET_SIGNET_POS_BY_ROLES'所設定角色, 不需自動移動");
			}
			else
				theLogger.error("點擊位置位於簽核區域外, 無法自動移至角色指定相對位置");
		}
	}
	
	// 1131108 Raymond 1130928 新增判斷環境變數「AOL_SIGNET_APP_ACTION」指定角色的職名章是否加蓋或移動至指定文別的指定簽核區域的指定範圍內, 是則執行指定的關聯動作功能
	if(!!nsEditor && !nsEditor.doSignetAppAction) {
		var aolSignetAppAction = theSSO.User.EnvSettings.get("AOL_SIGNET_APP_ACTION");
		var signetAppAction = [];
		if(aolSignetAppAction.length > 0) {
			theLogger.log("環境變數AOL_SIGNET_APP_ACTION為'" + aolSignetAppAction + "'");
			let sets = aolSignetAppAction.split("|");	// 支援多組設定
			for(var i=0, n=sets.length; i<n; i++) {
				if(sets[i].length > 0) {
					let params = sets[i].split(";");	// 每一組設定有四個參數, 1.文別, 2.角色代碼, 3.簽核區域ID, 4.關聯動作名稱
					if(params.length == 4) {
						let docType = params[0];
						if(params[0].indexOf(",") > 0)
							docType = params[0].split(",");
						let roleId = params[1];
						if(params[1].indexOf(",") > 0)
							roleId = params[1].split(",");
						let signArea = {id: params[2], subArea: undefined};
						if(params[2].indexOf("(") > 0 && params[2].indexOf(")") > 0) {
							signArea.id = params[2].substr(0, params[2].indexOf("("));
							let subAreaStr = params[2].substring(params[2].indexOf("(") + 1, params[2].indexOf(")"));
							let subArea = subAreaStr.split(",");
							signArea.subArea = {left: Number(subArea[0]),
												top: Number(subArea[1]),
												width: Number(subArea[2]),
												height: Number(subArea[3])};
						}
						signetAppAction.push({docType: docType,
											roleId: roleId,
											signArea: signArea,
											action: params[3]});
						theLogger.log("第" + i + "組設定:", signetAppAction[signetAppAction.length - 1]);
					}
					else
						theLogger.warn("第" + i + "組設定格式有誤, 要有4個數值");
				}
			}
			function matchDocType(setting, docType) {
				if((Array.isArray(setting) && setting.indexOf(docType) >= 0) || setting == docType) {
					theLogger.log("'" + docType + "'符合設定的文別");
					return true;
				}
				theLogger.log("'" + docType + "'不符合設定的文別");
				return false;
			}
			function matchRole(setting, roleId) {
				if((Array.isArray(setting) && setting.indexOf(roleId) >= 0) || setting == roleId) {
					theLogger.log("'" + roleId + "'符合設定的角色");
					return true;
				}
				theLogger.log("'" + roleId + "'不符合設定的角色");
				return false;
			}
			function PtInArea(pos, rc) {
				var b = pos.left > rc.left && pos.left < (rc.left + rc.width) &&
						pos.top > rc.top && pos.top < (rc.top + rc.height);
				theLogger.warn("pos(" + pos.left + "," + pos.top + ") in rc(" + rc.left + "," + rc.top + "," + rc.width + "," + rc.height + ") = " + b);
				return b;
			}
			function matchSignArea(setting, sa, pos, size) {
				if(setting.id == sa.id) {
					theLogger.log("'" + sa.id + "'符合設定的簽核區域ID");
					if(!setting.subArea)
						return true;
					var delta = {x: (parseFloat(size.width) / 420 * 794), y: (parseFloat(size.height) / 594 * 1123)};	// 左上角與中心點的座標差
					var posCt = {left: pos.left + delta.x, top: pos.top + delta.y};	// 用中心點當判定標的
					var rcSubArea = {left: setting.subArea.left * 794 / 210, top: setting.subArea.top * 1123 / 297,
									width: setting.subArea.width * 794 / 210, height: setting.subArea.height * 1123 / 297};
					if(PtInArea(posCt, rcSubArea)) {
						theLogger.log("職名章中心點'" + posCt.left + "," + posCt.top + "'在設定的簽核區域內的特定範圍內");
						/* for 檢查設定的簽核區域內範圍在哪裡
						if(!!sa.$area) {
							$("<div style='border:1px dashed blue;position:absolute;left:" + rcSubArea.left + "px;top:" + rcSubArea.top + "px;width:" + rcSubArea.width + "px;height:" + rcSubArea.height + "px'></div>").appendTo(sa.$area);
						}*/
						return true;
					}
					theLogger.log("職名章中心點'" + posCt.left + "," + posCt.top + "'不在設定的簽核區域內的特定範圍內");
					return false;
				}
				theLogger.log("'" + sa.id + "'不符合設定的簽核區域ID");
				return false;
			}
			function doAction(actionName) {
				theLogger.log("執行關聯動作'" + actionName + "'");
				var sah = new StampActionHandler();
				
				function doDispatchAction(opt) {
					if(opt.doAction) {	// 需要連動
						sah.dispatchAct_new(actionName)
							.done(function(rslt) {
								if("success" in rslt) {
									if(!rslt.success) {
										theLogger.error(rslt.errMsg);
										alert(rslt.errMsg);
									}
								}
							})
							.fail(function(rslt) {
								if("success" in rslt) {
									if(!rslt.success) {
										theLogger.error(rslt.errMsg);
										alert(rslt.errMsg);
									}
								}
								else {
									theLogger.error(rslt);
									alert(rslt);
								}
							});
					}
				}
				
				sah.actionConfirm(actionName)
					.done(function(res) {
						if(res.showMsg) {
							for(var i=0; i<res.options.length; i++) {
								if(res.options[i].doAction) {	// 若本來提示選項中有允許執行關聯動作的選項, 則直接執行關聯動作, 不要提示詢問視窗
									doDispatchAction(res.options[i]);
									return;
								}
							}
							// 若本來提示選項中都沒有允許執行關聯動作的選項, 則不要執行關聯動作也不要提示詢問視窗
							theLogger.warn("提示選項中沒有任何一個允許執行關聯動作, 不執行此關聯動作");
						}
						else if(res.options.length == 1) {
							doDispatchAction(res.options[0]);
						}
					})
					.fail(function(errorText) {
						theLogger.error(errorText);
						alert(errorText);
					});
			}
			nsEditor.doSignetAppAction = function(draft, sa, pos, size) {
				theLogger.log("檢核加蓋職名章是否符合環境變數「AOL_SIGNET_APP_ACTION」設定條件");
				for(var i=0; i<signetAppAction.length; i++) {
					let set = signetAppAction[i];
					if (matchDocType(set.docType, draft.docType) &&
						matchRole(set.roleId, theAOL.docObj.ownRoleId) &&
						matchSignArea(set.signArea, sa, pos, size)) {
						// 加蓋核示語詞一併加蓋職名章時, 若職名章符合條件, 須覆蓋核示語詞的關聯動作
						if(!$("#chkApprove").is(":hidden")) {	// 桌機介面的核決方塊
							let $chk = $("#chkApprove");
							if(!$chk.is(":disabled") && $chk.prop("checked"))	// 未反灰且已勾選
								$chk.prop("checked", false).trigger("change");	// 取消勾選後觸發異動, 使公文基資的核決狀態變成未核決, 這樣才會有強制執行職名章關聯動作的行為
						}
						else if(!$("#moChkApprove").is(":hidden")) {	// 手機平板介面的核決方塊
							let $chk = $("#moChkApprove");
							if(!$chk.is(":disabled") && $chk.prop("checked"))	// 未反灰且已勾選
								$chk.prop("checked", false).trigger("change");	// 取消勾選後觸發異動, 使公文基資的核決狀態變成未核決, 這樣才會有強制執行職名章關聯動作的行為
						}
						doAction(set.action);
					}
				}
			}
		}
	}
	
	// 新增數位墨水意見(對話盒)
	function addSketchComment() {
	
		// 1140930 Raymond 1140818 V5再變更需求項目7, 判斷SSO_CONFIG.OrgNickName=TPVGH時, 取消提示非完稿模式的警告訊息及切回完稿模式
		// 1060518 Raymond 1060269 檢核目前追蹤修訂模式是否為完稿模式, 若不是的話, 提示訊息後, 切回完稿模式
		//if(TCControl.currMode != 1) {
		if(TCControl.currMode != 1 && SSO_CONFIG.OrgNickName != "TPVGH") {
			alert("目前追蹤修訂模式非完稿模式，為避免簽核物件在非完稿模式下可能發生位置異常問題，系統將切回完稿模式顯示。");
			$("#aol #tcControl1 select").val(1).trigger("change");
			return;	// 重新排版會使that.$pg無效, 須重新再選用一次簽核工具
		}
		var that = this;
		Util.getDlg("RD-SketchComment.html").done(function($dlg) {
			
			$dlg.find("header > h1").unwrap();
			$dlg.find("footer > div").unwrap();
			
			$dlg.find("a#ok").on('click', function(event) {
				
				var scale = that.getCurrScale() / 100;
				// 讀入成為影像意見
				// 1060718 Raymond 1060610/1060632 修正編輯後未異動影像大小的問題
				//var str = $dlg.find("canvas").data("sketch").getFitImgDataURL();
				//theLogger.log(str);
				var coord2 = {},
					str = $dlg.find("canvas").data("sketch").getFitImgDataURL(coord2);
				theLogger.log("新增簽核物件 - width:" + coord2.cx + ", height:" + coord2.cy);	// 寬高資訊
			
				var now = Util.now();
				var so = {
					id: that.getNewID(),
					type: "sketch",
					cTime: now,
					//pos: that.anchorPt,   // anchorPt是相對於viewPort的座標
					content: str,
					asIcon: true,
					boundTo: that.$pg.data("pg"),
					sessionNew: true,		// 2015.8.21 新增標記此簽核物件為本階段新增
					size: {width: (coord2.cx * 210 / 794) + "mm", height: (coord2.cy * 297 / 1123) + "mm"}	// 1060718 Raymond 1060610/1060632 新增數位墨水簽核物件的大小資訊
				};
				so.info = that.makeSOInfo(so.id, so.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
				// 要減掉Pg到viewPort之間的差距, 才是真正對應Pg上的點擊座標
				var $viewPort = that.$pg.closest(".viewPort"),
					z = $viewPort.data("zoomController");   // 如果有縮放控制的話要套用
				so.pos = {
					left: that.anchorPt.left - ((that.$pg.offset().left - $viewPort.offset().left) * 100 / ((z !== undefined)?z.currScale:100)),
					top: that.anchorPt.top - ((that.$pg.offset().top - $viewPort.offset().top) * 100 / ((z !== undefined)?z.currScale:100))
				}

				var cmt = new SketchComment(so);
				cmt.initiateSO(that.$pg);
				//that.signObjects.push(so);
				
				$.modal.close();
			});
			$dlg.find("a#cancel").on('click', function(event) {
				$.modal.close();
			});
			$dlg.find("#penSelector").find("li").on('click', function(evt) {
				$dlg.find("#penSelector").find("li").removeClass("ui-btn-active");
				$(this).addClass("ui-btn-active");
			});
			// 鋼筆
			$dlg.find("#penSelector li").eq(0).on('click', function(event) {
				var api = $dlg.find("canvas").data("sketch");
				// 1060721 Raymond 1060593 修正數位墨水編輯子視窗中鋼筆工具沒有套用使用者顏色的問題
				//api.setLineColor("blue");
				var usrColor = Util.toHtmlColor(theAOL.getCurrFolio().getUserColor());	// 2015.10.15 鋼筆數位墨水套用使用者顏色
				api.setLineColor(usrColor);
				api.setLineWidth(2);
				api.setSegmentedLine(false);
				//$(this).siblings().removeClass("ui-btn-up-e").addClass("ui-btn-up-c").attr("data-theme", "c");
				//$(this).removeClass("ui-btn-up-c").addClass("ui-btn-up-e").attr("data-theme", "e");
			});
			// 紅筆
			$dlg.find("#penSelector li").eq(1).on('click', function(event) {
				var api = $dlg.find("canvas").data("sketch");
				// 1060721 Raymond 1060593 新增套用手寫筆設定的紅筆顏色、寬度
				//api.setLineColor("red");
				//api.setLineWidth(1);
				var redPenColor = "red", redPenWidth = 1;
				if("pen_setting_1" in localStorage && localStorage['pen_setting_1'].length > 0) {
					var a = localStorage['pen_setting_1'].split('|');
					if(a.length > 1) {
						theLogger.log("套用紅筆的手寫筆設定 - 顏色:" + a[0] + ", 寬度:" + a[1]);
						redPenColor = a[0];
						redPenWidth = a[1];
					}
					else
						theLogger.warn("紅筆的手寫筆設定(pen_setting_1)格式不正確:'" + localStorage['pen_setting_1'] + "', 無法套用");
				}
				api.setLineColor(redPenColor);
				api.setLineWidth(redPenWidth);
				api.setSegmentedLine(false);
				//$(this).siblings().removeClass("ui-btn-up-e").addClass("ui-btn-up-c").attr("data-theme", "c");
				//$(this).removeClass("ui-btn-up-c").addClass("ui-btn-up-e").attr("data-theme", "e");
			});
			// 螢光筆
			$dlg.find("#penSelector li").eq(2).on('click', function(event) {
				var api = $dlg.find("canvas").data("sketch");
				// 1060721 Raymond 1060593 新增套用手寫筆設定的紅筆及螢光筆顏色、寬度
				//api.setLineColor("rgba(255,255,0,0.3)");
				//api.setLineWidth(16);
				var hilitPenColor = "rgba(255,255,0,0.3)", hilitPenWidth = 12;
				if("pen_setting_2" in localStorage && localStorage['pen_setting_2'].length > 0) {
					var a = localStorage['pen_setting_2'].split('|');
					if(a.length > 1) {
						theLogger.log("套用螢光筆的手寫筆設定 - 顏色:" + a[0] + ", 寬度:" + a[1]);
						hilitPenColor = a[0];
						hilitPenWidth = a[1];
					}
					else
						theLogger.warn("螢光筆的手寫筆設定(pen_setting_2)格式不正確:'" + localStorage['pen_setting_2'] + "', 無法套用");
				}
				api.setLineColor(hilitPenColor);
				api.setLineWidth(hilitPenWidth);
				api.setSegmentedLine(true);
				//$(this).siblings().removeClass("ui-btn-up-e").addClass("ui-btn-up-c").attr("data-theme", "c");
				//$(this).removeClass("ui-btn-up-c").addClass("ui-btn-up-e").attr("data-theme", "e");
			});
			// 橡皮擦
			$dlg.find("#penSelector li").eq(3).on('click', function(event) {
				var api = $dlg.find("canvas").data("sketch");
				api.setLineColor("transparent");
				api.setSegmentedLine(false);
				//$(this).siblings().removeClass("ui-btn-up-e").addClass("ui-btn-up-c").attr("data-theme", "c");
				//$(this).removeClass("ui-btn-up-c").addClass("ui-btn-up-e").attr("data-theme", "e");
			});
			
			var w = that.$pg.closest("#iso").width(),
				h = that.$pg.closest("#iso").height();
			theLogger.log("新增數位墨水意見對話方塊, w:" + w + ",h:" + h);
			$.modal($dlg, {
				appendTo:that.$pg.closest("#iso"),
				overlayCss:{height:h, width:w},
				onShow: function() {
					// 2015.11.4 子視窗出現後隱藏指令列
					that.$pg.closest(".viewPort").data("editCursor").cmdFloat.hide();
				}
			});
			$dlg.trigger("create");
			
			// 1060721 Raymond 1060593 修正數位墨水編輯子視窗中鋼筆工具沒有套用使用者顏色的問題
			// 最後再啟用sketch, 否則position等方法會失敗
			//$dlg.find("canvas").sketch();
			var usrColor = Util.toHtmlColor(theAOL.getCurrFolio().getUserColor());	// 預設的鋼筆套用使用者顏色
			$dlg.find("canvas").sketch({defaultColor: usrColor});
		});
	}
	// 1100514 Raymond 1100298 新增第2參數為他流程之文字意見物件, 有值時表示為執行「修改」他流程之文字意見功能
	// 新增貼式文字意見, 1060911 Raymond 1060764 新增signetMoveUp參數, 若為true則表示插入於上功能所新增的文字意見, 原座標須向上移動以免職名章蓋到箭頭圖檔
	// 1061129 Raymond 1061149 修改signetMoveUp參數, 若為1表示插入於上, 若為2表示插入於下
	//function addTextComment() {
	//function addTextComment(signetMoveUp) {
	function addTextComment(signetMoveUp, otherSO) {
		
		// 1140930 Raymond 1140818 V5再變更需求項目7, 判斷SSO_CONFIG.OrgNickName=TPVGH時, 取消提示非完稿模式的警告訊息及切回完稿模式
		// 1060518 Raymond 1060269 檢核目前追蹤修訂模式是否為完稿模式, 若不是的話, 提示訊息後, 切回完稿模式
		//if(TCControl.currMode != 1) {
		if(TCControl.currMode != 1 && SSO_CONFIG.OrgNickName != "TPVGH") {
			alert("目前追蹤修訂模式非完稿模式，為避免簽核物件在非完稿模式下可能發生位置異常問題，系統將切回完稿模式顯示。");
			$("#aol #tcControl1 select").val(1).trigger("change");
			return;	// 重新排版會使that.$pg無效, 須重新再選用一次簽核工具
		}
		// 1100514 Raymond 1100298 新增dfd, 在otherSO有值時, 以非同步執行新增文字意見功能
		if(!!otherSO)
			var _dfd = $.Deferred();
		var that = this;
		Util.getDlg("RD-TextComment.html").done(function($dlg) {
			
			$dlg.find("header > h1").unwrap();
			$dlg.find("footer > div").unwrap();
			
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

			// 2015.4.30 - Raymond, 修正iOS8.1軟體鍵盤浮上來時會把游標推到太上面超出畫面的問題
			$dlg.find("textarea").on("vclick", function(event) {
				setTimeout(function() {
					if(document.body.scrollTop > 190)
						document.body.scrollTop = 190;
				}, 1000);
			});
			
			// 1091106 Raymond 1090777 記憶這次勾選加蓋職名章、時戳的狀態
			var withSignetChanged, withTimeChanged;
			$dlg.find("#withStamp").on("change", function() {
				withSignetChanged = true;	// 只標記有點擊過, 後面要有確定新增文字意見後, 才會記憶此次勾選狀態
			});
			$dlg.find("#dispTime").on("change", function() {
				withTimeChanged = true;	// 只標記有點擊過, 後面要有確定新增文字意見後, 才會記憶此次勾選狀態
			});
			$dlg.find("a#ok").on('click', function(event) {
				
				// 1120823 Raymond 1120562 新增檢核文字意見是否有輸入內容, 若無內容則顯示警告, 並中止後續新增簽核物件的處理
				if(!$dlg.find("textarea").val().length) {
					$dlg.find("textarea").tipAlert("請輸入文字意見");
					return;
				}
				//alert("id:" + that.attr("id") + "\nanchorPt:" + anchorPt.x + "," + anchorPt.y + "\ncurrScale:" + self.touchHandler.currScale);
				
				// 文字意見
				var now = Util.now();
				// 1120602 Raymond 1120483 修正在第一行只有一個換行字元, 第二行才輸入其它字的文字意見, 傳送後在下一個流程點再傳送後, 第一個換行字元會消失, 導致歷史檢視中文字意見會上移的問題
				//var str = $dlg.find("textarea").val();
				var str = $dlg.find("textarea").val().replace(/^ /, "\xA0").replace(/^[\r\n\t]+|[\r\n\t]+$/, "").replace(/^ /, "\xA0");	// 改為新增文字意見時, 立即排除首末行只有一個換行字元或數個TAB字元加一個換行字元的情況, 首行第一個字若是半形空白則替換為&nbsp;(\xA0), 以保留首行縮排的需要
				var defaultWidth = $dlg.find("textarea").width();//2016.12.27	Leslie	先引用輸入欄的寬度，當成預設寬度，並加入so物件中，供後續"切字"之用
				var so = {
					id: that.getNewID(),
					type: "text",
					orient: "橫書",
					cTime: now,
					//pos: that.anchorPt,   // anchorPt是相對於viewPort的座標
					content: str,
					fontName: defFont,		// 2015.6.25 改為預設標楷體, 2016.3.16 改為AOL_TEXTOBJECT_FONT環境變數設定的預設字型
					fontSize: $dlg.find("select").val() || (defSize + "pt"),	// 1101005 Raymond 聯大序223 修正當環境變數AOL_TEXTOBJECT_FONT設定的size非字型大小下拉式選單的項目之一時, 儲存會轉圈圈的問題
					fontWeight: $dlg.find("#bold").prop("checked"),
					fontStyle: $dlg.find("#italic").prop("checked"),
					color: theAOL.getCurrFolio().getUserColor(),
					asIcon: false,
					boundTo: that.$pg.data("pg"),
					sessionNew: true,		// 2015.8.21 新增標記此簽核物件為本階段新增
					width: defaultWidth,	//2016.12.27	Leslie	先引用輸入欄的寬度，當成預設寬度，並加入so物件中，供後續"切字"之用
					srcContent:str			//2016.12.27	Leslie	增加寫入原始文字內容
				};
				so.info = that.makeSOInfo(so.id, so.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
				// 要減掉Pg到viewPort之間的差距, 才是真正對應Pg上的點擊座標
				var $viewPort = that.$pg.closest(".viewPort"),
					z = $viewPort.data("zoomController");   // 如果有縮放控制的話要套用
				// 1100518 Raymond 1100298 在otherSO有值時, 文字意見起始位置預設為從他流程之文字意見起始位置, 以及是否圖示化與他流程之文字意見一致
				if(!!otherSO) {
					so.pos = {
						left: otherSO.content.pos.x * 794 / 2480,
						top: otherSO.content.pos.y * 1123 / 3507
					}
					so.asIcon = otherSO.asIcon;
				}
				else {
				so.pos = {
					left: that.anchorPt.left - ((that.$pg.offset().left - $viewPort.offset().left) * 100 / ((z !== undefined)?z.currScale:100)),
					top: that.anchorPt.top - ((that.$pg.offset().top - $viewPort.offset().top) * 100 / ((z !== undefined)?z.currScale:100))
				}
				}
				// 1110428 Raymond 1110502 新增判斷環境變數AOL_ENABLE_RESET_TEXTNOTE_POS_BY_ROLES是否啟用文字意見也套用自動移動至目前點擊簽核區域的相對位置的功能
				if(theSSO.User.EnvSettings.get("AOL_ENABLE_RESET_TEXTNOTE_POS_BY_ROLES") == "Y") {
					var res = getResetSignetPos(so.pos, that.$pg);
					if(!!res) {
						theLogger.warn("重設文字意見位於簽核框(" + res.signArea.saType + "," + res.signArea.id + ")內的相對位置 - " + res.offsetX + "," + res.offsetY);
						so.signArea = res.signArea;
						so.saType = res.signArea.saType;
						so.saID = res.signArea.id;
						so.offset = {left: res.offsetX, top: res.offsetY};
					}
				}
				// 1140324 Raymond 1131303 文字意見新增錯別字校正需要的GUID屬性
				if(theAOL.enableFixWord4TextComment == true) {
					so.guid = $dlg.find("textarea").attr("guid");
				}
				var cmt = new TextComment(so);
				// 1130419 Raymond 1120881 若勾選同時加蓋職名章, 則產生文字意見物件時先不要自動增高簽核區域
				if($dlg.find("#withStamp").prop("checked"))
					cmt.initiateSO(that.$pg, {suspendSALP: true});
				else
				cmt.initiateSO(that.$pg);
				
				if($dlg.find("#withStamp").prop("checked")) {
					// 職名章
					var idx = $dlg.find("#signet").val();
					var stamp = theAOL.signetBox[Number(idx)];    // 預設第1個
					var so2 = {
						id: that.getNewID(),
						type: "stamp.signet",	// 2015.5.25 FIX
						orient: "橫書",
						cTime: now,
						pos: {left:so.pos.left, top:so.pos.top + cmt.$so.height()}, // 附加的職名章在文字意見下方
						boundTo: that.$pg.data("pg"),
						sessionNew: true		// 2015.8.21 新增標記此簽核物件為本階段新增
					};
					so2.info = that.makeSOInfo(so2.id, so2.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
					//回傳是否加蓋時戳
					if ($dlg.find("#dispTime").prop("checked"))
						so2.dispTime = true;
					if(typeof stamp.fileInfo !== "undefined") { // 影像檔章戳
						so2.content = stamp.data;
						so2.size = {width: (stamp.size.w / 10) + "mm", height: (stamp.size.h / 10) + "mm"};
						so2.color = {r: stamp.color.r, g: stamp.color.g, b: stamp.color.b};	// 2015.5.26 FIX 職名章顏色變黑色問題
					}
					else {  // 文字章戳
						throw new Error("職名章有文字式的嗎?");
					}
					var cmt2 = new Stamp(so2);
					// 1130422 Raymond 1120881 傳入文字意見的top位置, 供計算包含文字意見的高度範圍內是否壓線, 需重新整理時不要直接refresh/goToPage, 等代字加蓋後再refresh/goToPage
					//cmt2.initiateSO(that.$pg);
					var needRefresh = cmt2.initiateSO(that.$pg, {overallTop: so.pos.top, retNeedRefresh: true});
					
					// 1110513 Raymond 1110538 新增加蓋代字功能
					if($dlg.find("#addProxyWord").prop("checked")) {
						var stampExt2 = {w: cmt2.$so.width(), h: cmt2.$so.height()};
						// 代字是固定樣式
						var so3 = {
							id: that.getNewID(),
							type: "stamp.text",			// stamp:選用章戳(圖檔), stamp.text:選用章戳(文字)
							orient: "橫書",
							cTime: now,
							//pos: that.anchorPt,   // anchorPt是相對於viewPort的座標
							boundTo: that.$pg.data("pg"),
							sessionNew: true,		// 2015.8.21 新增標記此簽核物件為本階段新增
							content: "代",
							fontName: "標楷體",
							fontSize: "18pt",
							color: {r: 0, g: 0, b: 0}	// 2016.11.17 FDA要求代字用黑色
						};
						// 1130820 Raymond 1130853 新增判斷環境變數「AOL_USE_RED_PROXY_WORD」設為"Y"時, 改用紅色顯示代字
						if(theSSO.User.EnvSettings.get("AOL_USE_RED_PROXY_WORD") == "Y")
							so3.color.r = 255;
						if(theUserInfo.OrgNickName == "NCHU")	// 1071219 Raymond 1071227 中興要求代字要用14pt大小
							so3.fontSize = "14pt";
						so3.info = that.makeSOInfo(so3.id, so3.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
						so3.pos = {
							left: so2.pos.left + stampExt2.w,		// 1100511 Raymond 1100293 變數更名stampExt -> stampExt2, 避免影像代為決行章的位置計算
							top: so2.pos.top + stampExt2.h - 30};	// 1100511 Raymond 1100293 變數更名stampExt -> stampExt2, 避免影像代為決行章的位置計算
						var cmt3 = new Stamp(so3);
						cmt3.initiateSO(that.$pg);
						
						// 2017.3.29 職名章移動連帶移動代字
						so2.linkSOID = so3.id;
						so2.linkCmt = cmt3;
						// 1090312 Raymond 1081105 新增followCmt屬性在被連動的簽核物件, 當刪除被連動的簽核物件, 而不是連動來源的簽核物件時, 移除來源物件中的linkCmt屬性, 以免再刪除來源物件時發生移除linkCmt所指的簽核物件發生Error
						so3.followCmt = cmt2;
					}
					
					// 1060911 Raymond 1060764 修正避免由插入於上的新增文字意見須向上位移需求而導致一般加入的文字意見也因加蓋職名章而被向上位移問題
					//if(signetMoveUp === true) {
					if(signetMoveUp == 1) {	// 1061129 Raymond 1061149 修改插入於上時signetMoveUp參數為1
						// 2016.9.14 修正有加蓋職名章時, 文字意見的位置(變更單1050931)
						var sh = Math.ceil(cmt2.$so.height());
						if("offset" in cmt.so) {	// 2017.2.6 fix for 點擊在簽核區域內新增文字意見且勾選職名章時, 會向下位移問題
							cmt.so.pos.top -= sh;
							cmt.so.offset.top -= sh;
							cmt.$so.css("top", cmt.so.offset.top);
						}
						else {
							cmt.so.pos.top -= sh;
							cmt.$so.css("top", cmt.so.pos.top);
						}
						if("offset" in so2) {	// 2017.2.6 fix for 點擊在簽核區域內新增文字意見且勾選職名章時, 會向下位移問題
							cmt2.so.pos.top -= sh;
							cmt2.so.offset.top -= sh;
							cmt2.$so.css("top", cmt2.so.offset.top);
						}
						else {
							cmt2.so.pos.top -= sh;
							cmt2.$so.css("top", cmt2.so.pos.top);
						}
					}
					// 2017.2.10 更新文字意見及職名章簽核物件的外部記錄檔座標, 否則會衍生傳送後簽核物件仍是被顯示在原來未被往上提的位置
					theAOL.getCurrFolio().getSignFolder().xSignFolder().updateSignObj(cmt.so);
					theAOL.getCurrFolio().getSignFolder().xSignFolder().updateSignObj(cmt2.so);
				}
				// 1091106 Raymond 1090777 記憶這次勾選加蓋職名章、時戳的狀態
				if(withSignetChanged)	// 有點擊過再記憶
					localStorage['aolTextNoteWithSignet'] = $dlg.find("#withStamp").prop("checked");
				if(withTimeChanged)	// 有點擊過再記憶
					localStorage['aolTextNoteWithTime'] = $dlg.find("#dispTime").prop("checked");
				
				$.modal.close();
				
				// 1140922 Raymond 1140887 新增判斷機關暱稱是TPVGH(北榮)時, 改叫用setMergedTextCommentToSignComment()
				if(SSO_CONFIG.OrgNickName == "TPVGH") {
					setMergedTextCommentToSignComment();
				}
				else {
				// 1120406 Raymond 銓敘部序198 檢核若目前簽辦意見有內容時, 詢問取代或累加
				//theAOL.currSignComment(str);	// 2014.9.2 - 新增文字意見同時設為簽核意見	// 1100708 Raymond 1100648 配合支援分文稿記錄簽核意見功能修改, signComment->currSignComment
				var csc = theAOL.currSignComment();
				// 1121030 Raymond 1120950 啟用簽辦意見窗格功能時才詢問取代或累加, 否則恢復之前行為直接取代不詢問
				//if(typeof csc == "string" && csc.length > 0) {
				if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_PANEL") == "Y" && typeof csc == "string" && csc.length > 0) {
					if(confirm("目前簽辦意見已有內容，是否以文字意見取代？\r\n\r\n點擊「確定」取代目前簽辦意見內容\r\n點擊「取消」則累加在目前簽辦意見內容後"))
						theAOL.currSignComment(str);
					else
						theAOL.currSignComment(csc + str);
				}
				else
					theAOL.currSignComment(str);
				}
				
				window.scrollTo(0, 0);	// 2014.8.19 - iOS7會往上飄, 要往下拉...
				
				// 1101008 Raymond 修正iPadOS 14/15加蓋文字意見後不會顯示的問題
				if(navigator.userAgent.match(/Mac OS/gi) && !window.realMac) {
					var $tmpDiv = $("<div></div>").appendTo(that.$pg);
					setTimeout(function() {
						$tmpDiv.remove();
					}, 0);
				}
				
				// 1100514 Raymond 1100298 在otherSO有值時, 以非同步執行新增文字意見功能
				if(!!otherSO)
					_dfd.resolve(so);	// 回傳所新增的文字意見
				
				// 1130423 Raymond 1120881 判斷需重新整理時, 在蓋完代字章後再重新整理
				if(!!needRefresh && needRefresh.refresh == true) {
					if(needRefresh.goNextPage == true) {
						let fv = that.$pg.closest(".viewPort").data("view");
						fv.goToPage(fv.currPo() + 1);
					}
					else
						that.$pg.closest(".pages").flip("refresh");
				}
			});
			$dlg.find("a#cancel").on('click', function(event) {
				$.modal.close();
				
				window.scrollTo(0, 0);	// 2014.8.19 - iOS7會往上飄, 要往下拉...
				
				// 1140324 Raymond 1131303 取消新增文字意見時, 要通知錯別字校正模組刪除此文字意見的paraFixData物件
				$dlg.find("textarea").errCorr({fwd: theAOL.getCurrFolio().getFixWordData(), draftGUID: theAOL.getCurrFolio().getCurrDraftInfo().guid, paraGUID: $dlg.find("textarea").attr("guid")}, "delPara");
				
				// 1100514 Raymond 1100298 在otherSO有值時, 以非同步執行新增文字意見功能
				if(!!otherSO)
					_dfd.resolve();	// 取消時無新增的文字意見可回傳
			});
			$dlg.find("#fontSize").on('change', function(event) {
				$dlg.find("textarea").css("font-size", $(this).val());
			});
			// 2019.11.18 - 1080339 Eric, attr("checked", ...) => prop("checked", ...)
			$dlg.find("#normal").on("change", function() {
				$dlg.find("textarea").css("font-weight", "normal").css("font-style", "");
				$dlg.find("#bold").prop("checked", false).checkboxradio("refresh");
				$dlg.find("#italic").prop("checked", false).checkboxradio("refresh");
			});
			$dlg.find("#bold").on("change", function() {
				if($(this).prop("checked")) {
					$dlg.find("textarea").css("font-weight", "bolder");
					$dlg.find("#normal").prop("checked", false).checkboxradio("refresh");
				}
				else {
					$dlg.find("textarea").css("font-weight", "normal");
					if(!$dlg.find("#italic").prop("checked"))
						$dlg.find("#normal").prop("checked", true).checkboxradio("refresh");
				}
			});
			$dlg.find("#italic").on("change", function() {
				if($(this).prop("checked")) {
					$dlg.find("textarea").css("font-style", "italic");
					$dlg.find("#normal").prop("checked", false).checkboxradio("refresh");
				}
				else {
					$dlg.find("textarea").css("font-style", "");
					if(!$dlg.find("#bold").prop("checked"))
						$dlg.find("#normal").prop("checked", true).checkboxradio("refresh");
				}
			});
			
			var $signet = $dlg.find("#signet");
			// 1060911 Raymond 1060764 職名章設定中是否有預設屬性設定
			var hasAutoPress = false,
				autoPressed = false;
			for(var i=0; i<theAOL.signetBox.length; i++) {
				if("autoPress" in theAOL.signetBox[i] && theAOL.signetBox[i].autoPress == "true") {
					hasAutoPress = true;
					break;
				}
			}
			for(var i=0; i<theAOL.signetBox.length; i++) {
				// 1060911 Raymond 1060764 判斷若有預設屬性設定才設為selected, 無則以第1個為預設
				//$signet.append("<option value='" + i + "'" + ((i==0)?" selected":"") + ">" + theAOL.signetBox[i].title + "</option>");
				if(!hasAutoPress)
					$signet.append("<option value='" + i + "'" + ((i==0)?" selected":"") + ">" + theAOL.signetBox[i].title + "</option>");
				else if("autoPress" in theAOL.signetBox[i] && theAOL.signetBox[i].autoPress == "true" && !autoPressed) {	// 若有複數預設設定, 以第1個預設為準
					$signet.append("<option value='" + i + "' selected>" + theAOL.signetBox[i].title + "</option>");
					autoPressed = true;
				}
				else
					$signet.append("<option value='" + i + "'>" + theAOL.signetBox[i].title + "</option>");
			}
			
			/*$.get("Other/Symbol.txt", function(data, statusText, jqXHR) {
				//alert("data:" + typeof data);
				var $bar = $dlg.find(".symbolBar");
				var a = data.split("\n");
				$.each(a, function(idx, val) {
					var kv = val.trim("\r").split(",");
					var $btn = $("<a title='" + kv[1] + "' data-role='button'>" + kv[0] + "</a>").appendTo($bar);
					$btn.on("click", function(event) {
						var val = $dlg.find("textarea").eq(0).val();
						$dlg.find("textarea").eq(0).val(val + kv[0]);
					}).buttonMarkup({theme:"c"});
				});
				theLogger.log(a.length + "個符號表符號已載入!");
			});*/
			var $bar = $dlg.find(".symbolBar");
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
							var ta = $dlg.find("textarea").get(0);
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
			$dlg.find("#fontSize").val(defSize + "pt");
			$dlg.find("#bold").prop("checked", defBold);
			// 2019.11.21 - Eric , bug-fix
			if (defBold) {
				$dlg.find("#normal").prop("checked", false);
			}
			$dlg.find("textarea").css({fontFamily: defFont, fontSize: defSize + "pt", fontWeight: (defBold)?"bolder":"normal"})
				.attr("data-autogrow", "false");	// 2016.8.31 不要自動縮放textarea
			
			var w = that.$pg.closest("#iso").width(),
				h = that.$pg.closest("#iso").height();
			theLogger.log("新增文字意見對話方塊, w:" + w + ",h:" + h);
			$.modal($dlg, {
				appendTo:that.$pg.closest("#iso"),
				overlayCss:{height:h, width:w},
				maxHeight:470,	// 1110513 Raymond 1110538 因新增「加蓋代字」選項而增加高度400->470
				minHeight:430,	// 1110513 Raymond 1110538 因新增「加蓋代字」選項而增加高度320->430
				autoResize:false,	// 2015.8.17 縮小文字意見輸入大小
				onShow: function() {
					// 1091106 Raymond 1090777 新增環境變數預設勾選加蓋職名章、時戳, 及記憶前次勾選狀態功能
					if(localStorage['aolTextNoteWithSignet'] == "true" || (!("aolTextNoteWithSignet" in localStorage) && theSSO.User.EnvSettings.get("AOL_TEXTNOTE_WITH_SIGNET") == "Y"))
						$dlg.find("#withStamp").prop("checked", "checked");
					if(localStorage['aolTextNoteWithTime'] == "true" || (!("aolTextNoteWithTime" in localStorage) && theSSO.User.EnvSettings.get("AOL_TEXTNOTE_WITH_SIGNET") == "Y"))
						$dlg.find("#dispTime").prop("checked", "checked");
					// 1110513 Raymond 1110538 新增比照1080053若為代理公文預設勾選加蓋代字選項
					if(theAOL.docObj.get('ODWMSG', 'IS_PROXY_DOC') == "1" && theSSO.User.EnvSettings.get('AOL_AUTOSIGN_PROXY_WORD') == 'Y')
						$dlg.find("#addProxyWord").prop("checked", "checked");
					
					// 1100514 Raymond 1100298 在otherSO有值時, 文字意見內容預設為從他流程之文字意見內容
					if(!!otherSO)
						// 1130927 Raymond 中榮序237 新增文字意見原始內容
						//$dlg.find("textarea").val(otherSO.content.text);
						$dlg.find("textarea").val(otherSO.srcContent || otherSO.content.text);
					
					// 2015.11.4 子視窗出現後隱藏指令列
					that.$pg.closest(".viewPort").data("editCursor").cmdFloat.hide();
					
					// 2016.10.25 禁止文稿頁面捲動
					$(".contentPane").css("overflow", "hidden");
				},
				onClose: function() {
					// 2016.10.25 恢復文稿頁面捲動
					$(".contentPane").css("overflow", "");
					
					$.modal.close(); // 2016.11.8 must call this!
				}
			});
			$dlg.trigger("create");
			
			// 1140321 Raymond 1131303 文字意見新增錯別字校正功能
			if(theAOL.enableFixWord4TextComment == true) {
				theLogger.log("文字意見啟用錯別字校正功能");
				var guid4TSO = Util.genGUID();
				$dlg.find("textarea").attr("guid", guid4TSO).errCorr({fwd: theAOL.getCurrFolio().getFixWordData(), draftGUID: theAOL.getCurrFolio().getCurrDraftInfo().guid, paraGUID: guid4TSO, srcNm: "文字意見"});
			}
		// 1100514 Raymond 1100298 在otherSO有值時, 以非同步執行新增文字意見功能
		//});
		}).fail(function(errorText) {
			if(!!otherSO)
				_dfd.reject(errorText);
		});
		// 1100514 Raymond 1100298 在otherSO有值時, 以非同步執行新增文字意見功能
		if(!!otherSO)
			return _dfd.promise();
	}
	// 1100514 Raymond 1100298 將addTextComment公開, 以支援「修改」他流程之文字意見功能
	this.coverOtherTextObj = function(otherSO) {
		return addTextComment.call(this, undefined, otherSO);	// 傳入第2參數為他流程的文字意見
	};
	// 啟用全頁數位墨水模式
	function beginSketchMode(pen) {
	
		// 1140930 Raymond 1140818 V5再變更需求項目7, 判斷SSO_CONFIG.OrgNickName=TPVGH時, 取消提示非完稿模式的警告訊息及切回完稿模式
		// 1060518 Raymond 1060269 檢核目前追蹤修訂模式是否為完稿模式, 若不是的話, 提示訊息後, 切回完稿模式
		//if(TCControl.currMode != 1) {
		if(TCControl.currMode != 1 && SSO_CONFIG.OrgNickName != "TPVGH") {
			alert("目前追蹤修訂模式非完稿模式，為避免簽核物件在非完稿模式下可能發生位置異常問題，系統將切回完稿模式顯示。");
			$("#aol #tcControl1 select").val(1).trigger("change");
			return;	// 重新排版會使that.$pg無效, 須重新再選用一次簽核工具
		}
		var that = this;
		var w = this.$pg.width();
		var h = this.$pg.height();
		var z = this.$pg.closest(".viewPort").data("zoomController");
		var c = this.$pg.closest(".viewPort").data("editCursor");
		var currentTransparency = (pen == 2 || pen == 8)?160:0;	// 2015.7.16 FIX, 1101217 Raymond 1101574 新增pen=8.螢光筆(直線)工具
		var currentPen = pen;	// 2015.10.15 改用currentPen來判斷哪種簽核工具, 0:鋼筆, 1:紅筆, 2:螢光筆, 4:刪劃文字, 5:復原刪除記號, 6:插入文字於上, 7:插入文字於下, 8:螢光筆(直線)
		// 2015.10.15 減少code
		function genSO(api) {
			var coord2 = {},
				str = api.getFitImgDataURL(coord2);
			if(str.length > 0) {
				theLogger.log("新增簽核物件 - coord2:" + coord2.x + "," + coord2.y + ", width:" + coord2.cx + ", height:" + coord2.cy);	// 1060718 Raymond 1060610/1060632 新增回傳的寬高資訊
				var now = Util.now();
				var so = {
					id: that.getNewID(),
					type: "sketch",
					cTime: now,
					pos: {left:coord2.x, top:coord2.y},
					content: str,
					transparency: currentTransparency,	// 2015.7.14 FIX
					asIcon: false,
					boundTo: that.$pg.data("pg"),
					sessionNew: true,		// 2015.8.21 新增標記此簽核物件為本階段新增
					size: {width: (coord2.cx * 210 / 794) + "mm", height: (coord2.cy * 297 / 1123) + "mm"}	// 1060718 Raymond 1060610/1060632 新增數位墨水簽核物件的大小資訊
				};
				so.info = that.makeSOInfo(so.id, so.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
				var cmt = new SketchComment(so);
				cmt.initiateSO(that.$pg);
				//that.signObjects.push(so);
				$can.get(0).width = $can.width();	// clear
				//$can.get(0).height = $can.height();
				return cmt;
			}
		}
		var usrColor = Util.toHtmlColor(theAOL.getCurrFolio().getUserColor());	// 2015.10.15 鋼筆數位墨水套用使用者顏色
		// 1060721 Raymond 1060593 新增套用手寫筆設定的紅筆及螢光筆顏色、寬度
		var redPenColor = "red", hilitPenColor = "rgba(255,255,0,0.3)",
			redPenWidth = 1, hilitPenWidth = 12;
		if("pen_setting_1" in localStorage && localStorage['pen_setting_1'].length > 0) {
			var a = localStorage['pen_setting_1'].split('|');
			if(a.length > 1) {
				theLogger.log("套用紅筆的手寫筆設定 - 顏色:" + a[0] + ", 寬度:" + a[1]);
				redPenColor = a[0];
				redPenWidth = a[1];
			}
			else
				theLogger.warn("紅筆的手寫筆設定(pen_setting_1)格式不正確:'" + localStorage['pen_setting_1'] + "', 無法套用");
		}
		if("pen_setting_2" in localStorage && localStorage['pen_setting_2'].length > 0) {
			var a = localStorage['pen_setting_2'].split('|');
			if(a.length > 1) {
				theLogger.log("套用螢光筆的手寫筆設定 - 顏色:" + a[0] + ", 寬度:" + a[1]);
				hilitPenColor = a[0];
				hilitPenWidth = a[1];
			}
			else
				theLogger.warn("螢光筆的手寫筆設定(pen_setting_2)格式不正確:'" + localStorage['pen_setting_2'] + "', 無法套用");
		}
		var $can = $("<canvas id='sketchOverlay' width='" + w + "px' height='" + h + "px' style='z-index:999'></canvas>").appendTo($pg).sketch({
				// 1060721 Raymond 1060593 紅筆及螢光筆改成套用過手寫筆設定的顏色及寬度
				//defaultColor: (pen == 1 || pen == 4)?"red":((pen == 2)?"rgba(255,255,0,0.3)":((pen == 5)?"rgba(0,0,255,0.5)":usrColor)),	// 2015.10.13 新增pen=4, 2015.10.15 套用user color, 2016.1.18 刪除復原記號固定淺藍
				//defaultWidth: (pen == 1 /*|| pen == 4*/ || pen == 5 || pen == 6)?1:((pen == 2)?12:2),		// 2015.10.13 新增pen=4,5,6		2016.1.18 刪劃紅線改為2px寬
				defaultColor: (pen == 1 || pen == 4)?redPenColor:((pen == 2 || pen == 8)?hilitPenColor:((pen == 5)?"rgba(0,0,255,0.5)":usrColor)),	// 2015.10.13 新增pen=4, 2015.10.15 套用user color, 2016.1.18 刪除復原記號固定淺藍, 1101217 Raymond 1101574 新增pen=8
				//defaultWidth: (pen == 1)?redPenWidth:((pen == 5 || pen == 6)?1:((pen == 2)?hilitPenWidth:2)),		// 2015.10.13 新增pen=4,5,6		2016.1.18 刪劃紅線改為2px寬
				defaultWidth: (pen == 1)?redPenWidth:((pen == 5 || pen == 6 || pen == 7)?1:((pen == 2 || pen == 8)?hilitPenWidth:2)),		// 2015.10.13 新增pen=4,5,6		2016.1.18 刪劃紅線改為2px寬	1061129 Raymond 1061149 新增pen=7, 1101217 Raymond 1101574 新增pen=8
				segmentedLine: (pen == 2 || pen == 8),													// 1101217 Raymond 1101574 新增pen=8
				rightAngle: (pen == 4 || pen == 5 || pen == 8),											// 2015.10.13 新增pen=4,5, 1101217 Raymond 1101574 新增pen=8
				lineShape: (pen == 5)?"triangle":"solid",												// 2015.10.13 新增pen=5
				//fake: (pen == 6)?true:false,															// 2015.10.15 新增pen=6
				fake: (pen == 6)?1:((pen == 7)?2:false),												// 1061129 Raymond 1061149 新增pen=7
				beforeStart: function(param) {
					param.scale = z.currScale / 100;
					// 2013.9.13 - Raymond, sketch外掛改用$.offset()取得正確的相對座標, 故不再需要提供translateX、translateY補正數值
					//param.translateX = that.$pg.closest(".contentPane").scrollLeft();
					//param.translateY = that.$pg.closest(".contentPane").scrollTop();
				},
				afterStart: function() {
					c.cmdFloat.blockShow(true);  // 2015.6.5 - 開始畫時阻擋顯示指令列
					c.cmdFloat.hide();
				},
				afterEnd: function(coord) {
					// 鋼筆簽核功能選單
					var sketchCmds = new Array();
					sketchCmds.special = true;
					var api = $(this).data("sketch");
					var rect = api.getBoundedRect();
					var _delayHide = 500;	// 2016.3.25 切換工具後, 指定時間後隱藏指令列
					//if(pen == 6) {	// 2015.10.15 插入文字於上
					if(pen == 6 || pen == 7) {	// 2015.10.15 插入文字於上	1061129 Raymond 1061149 新增插入文字於下
						var cmt = genSO(api);
						if(!cmt) {
							theLogger.error("插入文字於上工具未產生(箭頭圖樣)簽核物件!");
							return;
						}
						
						$can.remove();
						
						setTimeout(function() {
						
							that.anchorPt.left = Math.ceil((cmt.$so.offset().left - that.$pg.offset().left + 14) * 100 / ((z != undefined)?z.currScale:100));	// 2016.9.14 修正非100%縮放比時文字意見位置與箭頭不一致問題
							if(pen == 7)	// 1061129 Raymond 1061149 新增插入於下工具, 文字意見座標要往下調整
								that.anchorPt.top = Math.ceil((cmt.$so.offset().top - that.$pg.offset().top + 50) * 100 / ((z != undefined)?z.currScale:100));		// 1061129 Raymond 1061149 新增插入於下
							else
								that.anchorPt.top = Math.ceil((cmt.$so.offset().top - that.$pg.offset().top + 12) * 100 / ((z != undefined)?z.currScale:100));		// 並調整文字意見位置(變更單1050931)
							// 1060911 Raymond 1060764 新增傳入signetMoveUp參數, 設為true表示文字意見應向上位移職名章高度, 以免職名章蓋到箭頭圖檔
							//addTextComment.call(that);
							//addTextComment.call(that, true);
							addTextComment.call(that, (pen == 7)?2:1);	// 1061129 Raymond 1061149 修改插入於上(pen=6)時傳入參數1, 新增插入於下(pen=7)時傳入參數2
							c.cmdFloat.blockShow(false);  // 結束時恢復顯示指令列
							
						}, 500);
						return;
					}
					else if(api.getLineColor() == "transparent") {
						// 1.鋼筆工具
						sketchCmds.push({name:"鋼筆", func: function() {
							if(currentPen != 3)			// 2015.10.15 目前工具非鋼筆
								genSO(api);
							api.setLineColor(usrColor);	// 2015.10.15 套用user color
							api.setLineWidth(2);
							api.setSegmentedLine(false);
							api.setRightAngle(false);	// 2015.10.15 非直角
							api.setLineShape("solid");	// 2015.10.15 實心線
							currentTransparency = 0;	// 2015.7.16 FIX
							currentPen = 3;				// 2015.10.15 FIX
							
							setTimeout(function() {	// 2016.3.25 隱藏指令列
								c.cmdFloat.hide();
							}, _delayHide);
						}, target: that});
						// 2.紅筆工具
						sketchCmds.push({name:"紅筆", func: function() {
							if(currentPen != 1)			// 2015.10.15 目前工具非紅筆
								genSO(api);
							// 1060721 Raymond 1060593 新增套用手寫筆設定的紅筆顏色、寬度
							//api.setLineColor("red");
							//api.setLineWidth(1);
							api.setLineColor(redPenColor);
							api.setLineWidth(redPenWidth);
							api.setSegmentedLine(false);
							api.setRightAngle(false);	// 2015.10.15 非直角
							api.setLineShape("solid");	// 2015.10.15 實心線
							currentTransparency = 0;	// 2015.7.16 FIX
							currentPen = 1;				// 2015.10.15 FIX
							
							setTimeout(function() {	// 2016.3.25 隱藏指令列
								c.cmdFloat.hide();
							}, _delayHide);
						}, target: that});
						// 3.螢光筆工具
						sketchCmds.push({name:"螢光筆", func: function() {
							if(currentPen != 2)			// 2015.10.15 目前工具非螢光筆
								genSO(api);
							// 1060721 Raymond 1060593 新增套用手寫筆設定的紅筆及螢光筆顏色、寬度
							//api.setLineColor("rgba(255,255,0,0.3)");
							//api.setLineWidth(12);
							api.setLineColor(hilitPenColor);
							api.setLineWidth(hilitPenWidth);
							api.setSegmentedLine(true);
							api.setRightAngle(false);	// 2015.10.15 非直角
							api.setLineShape("solid");	// 2015.10.15 實心線
							currentTransparency = 160;	// 2015.7.14 FIX
							currentPen = 2;				// 2015.10.15 FIX
							
							setTimeout(function() {	// 2016.3.25 隱藏指令列
								c.cmdFloat.hide();
							}, _delayHide);
						}, target: that});
						// 1101217 Raymond 1101574 新增8.螢光筆(直線)工具
						sketchCmds.push({name:"螢光筆(直線)", func: function() {
							if(currentPen != 8)			// 目前工具非螢光筆(直線)的話, 先新增簽核物件
								genSO(api);
							api.setLineColor(hilitPenColor);	// 套用手寫筆設定的螢光筆顏色
							api.setLineWidth(hilitPenWidth);	// 套用手寫筆設定的螢光筆寬度
							api.setSegmentedLine(true);
							api.setRightAngle(true);	// 直角
							api.setLineShape("solid");	// 實心線
							currentTransparency = 160;	// 半透明度固定為160
							currentPen = 8;				// 設定目前工具為螢光筆(直線)
							
							setTimeout(function() {	// 2016.3.25 隱藏指令列
								c.cmdFloat.hide();
							}, _delayHide);
						}, target: that});
						
						// 2015.10.15 舊版套件模式
						if((SSO_CONFIG && SSO_CONFIG.aolMode) ||	// 2016.1.18 附件亦提供3工具
							$pg.find("img.attachment").length) {
							// 目前是刪劃文字或復原刪除記號工具, 起筆即斷
							if(currentPen == 4) {
								genSO(api);
								// 1131125 Raymond 1130948 修正刪劃文字第一筆遵循手寫筆修改後的紅筆顏色, 第二筆後變回紅色的問題
								//api.setLineColor("red");
								api.setLineColor(redPenColor);
								api.setLineWidth(2);	// 2016.1.18 刪劃文字改為2px寬
							}
							else if(currentPen == 5) {
								genSO(api);
								api.setLineColor("rgba(0,0,255,0.5)");	// 2016.1.18 復原刪除記號改為50%藍
								api.setLineWidth(1);
							}
							// 4.刪劃文字工具
							sketchCmds.push({name:"刪劃文字", func: function() {
								//if(currentPen != 4 && currentPen != 5 && currentPen != 6)	// 目前工具非刪劃文字、復原刪除記號或插入於上
								if(currentPen != 4 && currentPen != 5 && currentPen != 6 && currentPen != 7)	// 目前工具非刪劃文字、復原刪除記號或插入於上	1061129 Raymond 1061149 新增插入於下
									genSO(api);
								// 1131125 Raymond 1130948 修正刪劃文字第一筆遵循手寫筆修改後的紅筆顏色, 第二筆後變回紅色的問題
								//api.setLineColor("red");
								api.setLineColor(redPenColor);
								api.setLineWidth(2);		// 2016.1.18 刪劃文字改為2px寬
								api.setSegmentedLine(false);
								api.setRightAngle(true);	// 2015.10.15 直角
								api.setLineShape("solid");	// 2015.10.15 實心線
								currentTransparency = 0;
								currentPen = 4;
									
								setTimeout(function() {	// 2016.3.25 隱藏指令列
									c.cmdFloat.hide();
								}, _delayHide);
							}, target: that});
							// 5.復原刪除記號工具
							sketchCmds.push({name:"復原刪除記號", func: function() {
								//if(currentPen != 4 && currentPen != 5 && currentPen != 6)	// 目前工具非刪劃文字、復原刪除記號或插入於上
								if(currentPen != 4 && currentPen != 5 && currentPen != 6 && currentPen != 7)	// 目前工具非刪劃文字、復原刪除記號或插入於上	1061129 Raymond 1061149 新增插入於下
									genSO(api);
								api.setLineColor("rgba(0,0,255,0.5)");	// 2016.1.18 復原刪除記號改為50%藍
								api.setLineWidth(1);
								api.setSegmentedLine(false);
								api.setRightAngle(true);		// 2015.10.15 直角
								api.setLineShape("triangle");	// 2015.10.15 三角形
								currentTransparency = 0;
								currentPen = 5;
									
								setTimeout(function() {	// 2016.3.25 隱藏指令列
									c.cmdFloat.hide();
								}, _delayHide);
							}, target: that});
						}
					}
					else {
						// 1.橡皮擦工具
						sketchCmds.push({name:"橡皮擦", func: function() {
							api.setLineColor("transparent");
							api.setSegmentedLine(false);
							api.setRightAngle(false);	// 2015.10.15 非直角
							api.setLineShape("solid");	// 2015.10.15 實心線
							
							setTimeout(function() {	// 2016.3.25 隱藏指令列
								c.cmdFloat.hide();
							}, _delayHide);
						}, target: that});
						// 2.鋼筆工具
						if(currentPen != 3) {	// 2015.10.15 改成工具代碼
							sketchCmds.push({name:"鋼筆", func: function() {
								genSO(api);
								api.setLineColor(usrColor);	// 2015.10.15 套用user color
								api.setLineWidth(2);
								api.setSegmentedLine(false);
								api.setRightAngle(false);	// 2015.10.15 非直角
								api.setLineShape("solid");	// 2015.10.15 實心線
								currentTransparency = 0;	// 2015.7.16 FIX
								currentPen = 3;				// 2015.10.15 FIX
								
								setTimeout(function() {	// 2016.3.25 隱藏指令列
									c.cmdFloat.hide();
								}, _delayHide);
							}, target: that});
						}
						// 3.紅筆工具
						if(currentPen != 1) {	// 2015.10.15 改成工具代碼
							sketchCmds.push({name:"紅筆", func: function() {
								genSO(api);
								// 1060721 Raymond 1060593 新增套用手寫筆設定的紅筆顏色、寬度
								//api.setLineColor("red");
								//api.setLineWidth(1);
								api.setLineColor(redPenColor);
								api.setLineWidth(redPenWidth);
								api.setSegmentedLine(false);
								api.setRightAngle(false);	// 2015.10.15 非直角
								api.setLineShape("solid");	// 2015.10.15 實心線
								currentTransparency = 0;	// 2015.7.16 FIX
								currentPen = 1;				// 2015.10.15 FIX
								
								setTimeout(function() {	// 2016.3.25 隱藏指令列
									c.cmdFloat.hide();
								}, _delayHide);
							}, target: that});
						}
						// 4.螢光筆工具
						if(currentPen != 2) {	// 2015.10.15 改成工具代碼
							sketchCmds.push({name:"螢光筆", func: function() {
								genSO(api);
								// 1060721 Raymond 1060593 新增套用手寫筆設定的紅筆及螢光筆顏色、寬度
								//api.setLineColor("rgba(255,255,0,0.3)");
								//api.setLineWidth(16);
								api.setLineColor(hilitPenColor);
								api.setLineWidth(hilitPenWidth);
								api.setSegmentedLine(true);
								api.setRightAngle(false);	// 2015.10.15 非直角
								api.setLineShape("solid");	// 2015.10.15 實心線
								currentTransparency = 160;	// 2015.7.14 FIX
								currentPen = 2;				// 2015.10.15 FIX
								
								setTimeout(function() {	// 2016.3.25 隱藏指令列
									c.cmdFloat.hide();
								}, _delayHide);
							}, target: that});
						}
						// 1101217 Raymond 1101574 新增8.螢光筆(直線)工具
						if(currentPen != 8) {
							sketchCmds.push({name:"螢光筆(直線)", func: function() {
								genSO(api);
								api.setLineColor(hilitPenColor);// 套用手寫筆設定的螢光筆顏色
								api.setLineWidth(hilitPenWidth);// 套用手寫筆設定的螢光筆寬度
								api.setSegmentedLine(true);
								api.setRightAngle(true);		// 直角
								api.setLineShape("solid");		// 實心線
								currentTransparency = 160;		// 半透明度固定為160
								currentPen = 8;					// 設定目前工具為螢光筆(直線)
								
								setTimeout(function() {	// 隱藏指令列
									c.cmdFloat.hide();
								}, _delayHide);
							}, target: that});
						}
						// 2015.10.15 舊版套件模式
						if((SSO_CONFIG && SSO_CONFIG.aolMode) ||	// 2016.1.18 附件亦提供3工具
							$pg.find("img.attachment").length) {
							// 目前是刪劃文字或復原刪除記號工具, 起筆即斷
							if(currentPen == 4) {
								genSO(api);
								// 1131125 Raymond 1130948 修正刪劃文字第一筆遵循手寫筆修改後的紅筆顏色, 第二筆後變回紅色的問題
								//api.setLineColor("red");
								api.setLineColor(redPenColor);
								api.setLineWidth(2);	// 2016.1.18 刪劃文字改為2px寬
							}
							else if(currentPen == 5) {
								genSO(api);
								api.setLineColor("rgba(0,0,255,0.5)");	// 2016.1.18 復原刪除記號改為50%藍
								api.setLineWidth(1);
							}
							// 5.刪劃文字工具
							if(currentPen != 4) {
								sketchCmds.push({name:"刪劃文字", func: function() {
									//if(currentPen != 4 && currentPen != 5 && currentPen != 6)	// 目前工具非刪劃文字、復原刪除記號或插入於上
									if(currentPen != 4 && currentPen != 5 && currentPen != 6 && currentPen != 7)	// 目前工具非刪劃文字、復原刪除記號或插入於上	1061129 Raymond 1061149 新增插入於下
										genSO(api);
									// 1131125 Raymond 1130948 修正刪劃文字第一筆遵循手寫筆修改後的紅筆顏色, 第二筆後變回紅色的問題
									//api.setLineColor("red");
									api.setLineColor(redPenColor);
									api.setLineWidth(2);		// 2016.1.18	刪劃文字改為2px寬
									api.setSegmentedLine(false);
									api.setRightAngle(true);	// 2015.10.15 直角
									api.setLineShape("solid");	// 2015.10.15 實心線
									currentTransparency = 0;
									currentPen = 4;
									
									setTimeout(function() {	// 2016.3.25 隱藏指令列
										c.cmdFloat.hide();
									}, _delayHide);
								}, target: that});
							}
							// 6.復原刪除記號工具
							if(currentPen != 5) {
								sketchCmds.push({name:"復原刪除記號", func: function() {
									//if(currentPen != 4 && currentPen != 5 && currentPen != 6)	// 目前工具非刪劃文字、復原刪除記號或插入於上
									if(currentPen != 4 && currentPen != 5 && currentPen != 6 && currentPen != 7)	// 目前工具非刪劃文字、復原刪除記號或插入於上	1061129 Raymond 1061149 新增插入於下
										genSO(api);
									api.setLineColor("rgba(0,0,255,0.5)");	// 2016.1.18 復原刪除記號改為50%藍
									api.setLineWidth(1);
									api.setSegmentedLine(false);
									api.setRightAngle(true);		// 2015.10.15 直角
									api.setLineShape("triangle");	// 2015.10.15 三角形
									currentTransparency = 0;
									currentPen = 5;
									
									setTimeout(function() {	// 2016.3.25 隱藏指令列
										c.cmdFloat.hide();
									}, _delayHide);
								}, target: that});
							}
						}
					}
					// 2.新增簽核物件(結束全頁塗鴉模式)
					sketchCmds.push({name:"新增簽核物件", func: function() {
						var cmt = genSO(api);
						
						$can.remove();
						
						if(cmt) {	// 2016.2.24 修正無繪圖範圍時不產簽核物件, 也就不需要點擊選取新增的簽核物件
							setTimeout(function() {
								cmt.$so.trigger("click");	// 2015.10.15 觸發選取剛新增的簽核物件
							}, 500);
						}
						c.cmdFloat.hide();	// 2016.3.25 新增完隱藏
					}, target: that});
					c.cmdFloat.setCmds(sketchCmds);
					/*c.cmdFloat.setPos({
						x:(rect.left + 16 + that.$pg.closest(".contentPane").scrollLeft() + (rect.width / 2)) * z.currScale / 100,
						y:(rect.top + 20 + that.$pg.closest(".contentPane").scrollTop() + rect.height) * z.currScale / 100
					}, true);*/
					c.cmdFloat.blockShow(false);  // 2015.6.5 - 結束畫時恢復顯示指令列
					c.cmdFloat.setPos({x: coord.x, y: coord.y + 16}, 1000); // 2014.8.25 - Raymond, 立即顯示改為延後1秒再顯示, 2015.10.15 顯示manipulation略下面一點
				},
				// 1061124 Raymond 1060753 新增終止畫布模式函式(於FolioView叫用)
				termSketchMode: function(api) {
					theLogger.log("終止畫布模式");
					genSO(api);
					// 1140918 Raymond 1142348 執行終止畫面模式時, 新增移除畫布及隱藏指令列
					$can.remove();
					c.cmdFloat.hide();
				}
			});
		// 2015.11.4 子視窗出現後隱藏指令列
		c.cmdFloat.hide();
	}
	// 2013.5.21 - Raymond, 整合Erin的Code, 新增職名章
	function addSignet() {
		
		// 1140930 Raymond 1140818 V5再變更需求項目7, 判斷SSO_CONFIG.OrgNickName=TPVGH時, 取消提示非完稿模式的警告訊息及切回完稿模式
		// 1060518 Raymond 1060269 檢核目前追蹤修訂模式是否為完稿模式, 若不是的話, 提示訊息後, 切回完稿模式
		//if(TCControl.currMode != 1) {
		if(TCControl.currMode != 1 && SSO_CONFIG.OrgNickName != "TPVGH") {
			alert("目前追蹤修訂模式非完稿模式，為避免簽核物件在非完稿模式下可能發生位置異常問題，系統將切回完稿模式顯示。");
			$("#aol #tcControl1 select").val(1).trigger("change");
			return;	// 重新排版會使that.$pg無效, 須重新再選用一次簽核工具
		}
		var that = this;
		var pickup;
		Util.getDlg("RD-UserStampBox.html").done(function($dlg) {
			
			$dlg.find("header > h1").unwrap();
			$dlg.find("footer > div").unwrap();
			
			$dlg.find("a#ok").on('click', function(event) {
				
				var now = Util.now();
				var stamp = theAOL.signetBox[pickup];
				var so = {
					id: that.getNewID(),
					type: "stamp.signet",	// stamp:選用章戳, stamp.signet:職名章
					orient: "橫書",
					cTime: now,
					//pos: that.anchorPt,   // anchorPt是相對於viewPort的座標
					boundTo: that.$pg.data("pg"),
					sessionNew: true		// 2015.8.21 新增標記此簽核物件為本階段新增
				};
				so.info = that.makeSOInfo(so.id, so.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
				// 要減掉Pg到viewPort之間的差距, 才是真正對應Pg上的點擊座標
				var $viewPort = that.$pg.closest(".viewPort"),
					z = $viewPort.data("zoomController");   // 如果有縮放控制的話要套用
				so.pos = {
					left: that.anchorPt.left - ((that.$pg.offset().left - $viewPort.offset().left) * 100 / ((z !== undefined)?z.currScale:100)),
					top: that.anchorPt.top - ((that.$pg.offset().top - $viewPort.offset().top) * 100 / ((z !== undefined)?z.currScale:100))
				}
				// 1090312 Raymond 1081105 新增判斷符合條件時, 自動移動職名章至目前點擊簽核區域的相對位置
				var res = getResetSignetPos(so.pos, that.$pg);
				if(!!res) {
					theLogger.warn("重設職名章位於簽核框(" + res.signArea.saType + "," + res.signArea.id + ")內的相對位置 - " + res.offsetX + "," + res.offsetY);
					so.signArea = res.signArea;
					so.saType = res.signArea.saType;
					so.saID = res.signArea.id;
					so.offset = {left: res.offsetX, top: res.offsetY};
				}
				
				//回傳是否加蓋時戳
				//if ($dlg.find("lable").attr("data-icon")=="checkbox-off")
				if($dlg.find("label").hasClass("ui-checkbox-on"))
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
				cmt.initiateSO(that.$pg);
				
				$.modal.close();
			});
			$dlg.find("a#cancel").on('click', function(event) {
				$.modal.close();
			});
			
			var w = that.$pg.closest("#iso").width(),
				h = that.$pg.closest("#iso").height();
			theLogger.log("新增職名章對話方塊, w:" + w + ",h:" + h);
			$.modal($dlg, {
				appendTo:that.$pg.closest("#iso"),
				overlayCss:{height:h, width:w},
				minHeight:440,
				autoResize:true,
				onShow:function() {
					var defIdx = -1;	// 1060911 Raymond 1060764 支援預設職名章
					for (var i=0;i<theAOL.signetBox.length;i++) {  
						$("<li><a>" + theAOL.signetBox[i].title + "</a></li>").appendTo($dlg.find("#stampUl"))
							.find("a")
							.on("click", i, function(event){ 
								event.preventDefault();
								if(pickup == undefined || pickup != event.data) {
									pickup = event.data;
									//$dlg.find("#stampView p").hide();
									$dlg.find("#stampView img").hide()
										.on('load', function() { // 2016.5 - jQuery upgrade, .load(function() {
											$(this).fadeIn("fast");
										})
										.css({width: (theAOL.signetBox[pickup].size.w / 10) + "mm",
											  height: (theAOL.signetBox[pickup].size.h / 10) + "mm"});
									var img = new Image();
									img.onload = function() {
										$dlg.find("#stampView img").attr("src", Util.modifyImgColor(this, theAOL.signetBox[pickup].color, false));
									}
									img.src = theAOL.signetBox[pickup].data;
									
									$dlg.find("#stampUl").find("li").attr("data-theme", "c").removeClass("ui-btn-up-e");
									$(this).closest("li").attr("data-theme", "e").trigger("mouseover");
								}
							});
						if(defIdx < 0 && "autoPress" in theAOL.signetBox[i] && theAOL.signetBox[i].autoPress == "true")	// 1060911 Raymond 1060764 預設職名章的索引值
							defIdx = i;
					}
					// 2015.6.22 預設選取第一筆職名章
					if(theAOL.signetBox.length > 0) {
						if(defIdx < 0)	// 1060911 Raymond 1060764 無預設職名章時, 預設選取第1個
							$dlg.find("#stampUl").find("li").eq(0).find("a").trigger('click');
						else	// 1060911 Raymond 1060764 否則選取預設的
							$dlg.find("#stampUl").find("li").eq(defIdx).find("a").trigger('click');
					}
					// 2015.11.4 子視窗出現後隱藏指令列
					that.$pg.closest(".viewPort").data("editCursor").cmdFloat.hide();
				}
			});
			
			$dlg.trigger("create");
		});
	}
	// 2016.8.12 - 多組職名章以次選單提供選取
	function addSignetEx() {
		// 1140930 Raymond 1140818 V5再變更需求項目7, 判斷SSO_CONFIG.OrgNickName=TPVGH時, 取消提示非完稿模式的警告訊息及切回完稿模式
		// 1060518 Raymond 1060269 檢核目前追蹤修訂模式是否為完稿模式, 若不是的話, 提示訊息後, 切回完稿模式
		//if(TCControl.currMode != 1) {
		if(TCControl.currMode != 1 && SSO_CONFIG.OrgNickName != "TPVGH") {
			alert("目前追蹤修訂模式非完稿模式，為避免簽核物件在非完稿模式下可能發生位置異常問題，系統將切回完稿模式顯示。");
			$("#aol #tcControl1 select").val(1).trigger("change");
			return;	// 重新排版會使that.$pg無效, 須重新再選用一次簽核工具
		}
		if(theAOL.signetBox.length < 1)
			throw new Error("無職名章可加蓋!");
		else {
			var that = this;
			var cmds = [];
			for(var i=0; i<theAOL.signetBox.length; i++) {
				cmds.push({name: theAOL.signetBox[i].title, func: addSignet1, target: that, cbdata: i});
			}
			var c = that.$pg.closest(".viewPort").data("editCursor");
			c.cmdFloat.setCmds(cmds);
			c.cmdFloat.setPos({x: that.anchorPt.left, y: that.anchorPt.top}, true);
		}
	}
	// 2016.8.12 - 直接新增一個職名章
	function addSignet1(cbdata) {
		
		// 1140930 Raymond 1140818 V5再變更需求項目7, 判斷SSO_CONFIG.OrgNickName=TPVGH時, 取消提示非完稿模式的警告訊息及切回完稿模式
		// 1060518 Raymond 1060269 檢核目前追蹤修訂模式是否為完稿模式, 若不是的話, 提示訊息後, 切回完稿模式
		//if(TCControl.currMode != 1) {
		if(TCControl.currMode != 1 && SSO_CONFIG.OrgNickName != "TPVGH") {
			alert("目前追蹤修訂模式非完稿模式，為避免簽核物件在非完稿模式下可能發生位置異常問題，系統將切回完稿模式顯示。");
			$("#aol #tcControl1 select").val(1).trigger("change");
			return;	// 重新排版會使that.$pg無效, 須重新再選用一次簽核工具
		}
		if(theAOL.signetBox.length < 1)
			throw new Error("無職名章可加蓋!");
		else {
			var idx = 0;
			if(SSOUtil.typeOf(cbdata) == "number")
				idx = cbdata;
			if(idx >= 0 && idx < theAOL.signetBox.length) {
				var that = this;
				var now = Util.now();
				var stamp = theAOL.signetBox[idx];
				var so = {
					id: that.getNewID(),
					type: "stamp.signet",	// stamp:選用章戳, stamp.signet:職名章
					orient: "橫書",
					cTime: now,
					//pos: that.anchorPt,   // anchorPt是相對於viewPort的座標
					boundTo: that.$pg.data("pg"),
					sessionNew: true		// 2015.8.21 新增標記此簽核物件為本階段新增
				};
				so.info = that.makeSOInfo(so.id, so.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
				// 要減掉Pg到viewPort之間的差距, 才是真正對應Pg上的點擊座標
				var $viewPort = that.$pg.closest(".viewPort"),
					z = $viewPort.data("zoomController"),   // 如果有縮放控制的話要套用
					c = $viewPort.data("editCursor");		// 控制指令列
				so.pos = {
					left: that.anchorPt.left - ((that.$pg.offset().left - $viewPort.offset().left) * 100 / ((z !== undefined)?z.currScale:100)),
					top: that.anchorPt.top - ((that.$pg.offset().top - $viewPort.offset().top) * 100 / ((z !== undefined)?z.currScale:100))
				}
				// 1090312 Raymond 1081105 新增判斷符合條件時, 自動移動職名章至目前點擊簽核區域的相對位置
				var res = getResetSignetPos(so.pos, that.$pg);
				if(!!res) {
					theLogger.warn("重設職名章位於簽核框(" + res.signArea.saType + "," + res.signArea.id + ")內的相對位置 - " + res.offsetX + "," + res.offsetY);
					so.signArea = res.signArea;
					so.saType = res.signArea.saType;
					so.saID = res.signArea.id;
					so.offset = {left: res.offsetX, top: res.offsetY};
				}
				
				//直接蓋職名章一律顯示時戳
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
				//cmt.initiateSO(that.$pg);
				var needRefresh = cmt.initiateSO(that.$pg, {retNeedRefresh: true});
				
				// 1071029 Raymond DVD說代理公文要用ODWMSG.IS_PROXY_DOC=1判定, 因為分辦時ownUserId為空, 有機關的分辦人員會蓋章導致蓋的章出現代字的問題
				//2017.2.23	Leslie	代理簽辦公文時，自動加上"代"字
				//if(theAOL.docObj.ownUserId != theSSO.User.account && theSSO.User.EnvSettings.get('AOL_AUTOSIGN_PROXY_WORD') == 'Y'){	//2017.3.3	Leslie	配合FDA特殊簽辦行為(決行層級)，增加依環境變數值決定是否自動加上"代"字
				if(theAOL.docObj.get('ODWMSG', 'IS_PROXY_DOC') == "1" && theSSO.User.EnvSettings.get('AOL_AUTOSIGN_PROXY_WORD') == 'Y'){	//2017.3.3	Leslie	配合FDA特殊簽辦行為(決行層級)，增加依環境變數值決定是否自動加上"代"字
					var stampExt = {
						w: cmt.$so.width(),
						h: cmt.$so.height()
					}
					// 代字是固定樣式
					var so2 = {
						id: that.getNewID(),
						type: "stamp.text",			// stamp:選用章戳(圖檔), stamp.text:選用章戳(文字)
						orient: "橫書",
						cTime: now,
						//pos: that.anchorPt,   // anchorPt是相對於viewPort的座標
						boundTo: that.$pg.data("pg"),
						sessionNew: true,		// 2015.8.21 新增標記此簽核物件為本階段新增
						content: "代",
						fontName: "標楷體",
						fontSize: "18pt",
						color: {r: 0, g: 0, b: 0}	// 2016.11.17 FDA要求代字用黑色
					};
					// 1130820 Raymond 1130853 新增判斷環境變數「AOL_USE_RED_PROXY_WORD」設為"Y"時, 改用紅色顯示代字
					if(theSSO.User.EnvSettings.get("AOL_USE_RED_PROXY_WORD") == "Y")
						so2.color.r = 255;
					if(theUserInfo.OrgNickName == "NCHU")	// 1071219 Raymond 1071227 中興要求代字要用14pt大小
						so2.fontSize = "14pt";
					so2.info = that.makeSOInfo(so2.id, so2.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
					so2.pos = {
						left: so.pos.left + stampExt.w,
						top: so.pos.top + stampExt.h - 30};
					// 1090312 Raymond 1081105 新增followCmt屬性在被連動的簽核物件, 當刪除被連動的簽核物件, 而不是連動來源的簽核物件時, 移除來源物件中的linkCmt屬性, 以免再刪除來源物件時發生移除linkCmt所指的簽核物件發生Error
					//var cmt = new Stamp(so2);
					//cmt.initiateSO(that.$pg);
					var cmt2 = new Stamp(so2);
					cmt2.initiateSO(that.$pg);
					so.linkSOID = so2.id;
					so.linkCmt = cmt2;
					so2.followCmt = cmt;
				}
				
				// 1091006 Raymond 1090611 新增檢查AOL_DISABLE_SIGNCOMMENT_TEXTNOTE環境變數, 設為Y時, 不會自動產生貼式文字意見
				// 1070319 Raymond 1070413 檢查環境變數, 設為Y才啟用簽辦意見窗格相關的自動新增文字意見圖示功能
				//if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_PANEL") == "Y") {
				if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_PANEL") == "Y" && theSSO.User.EnvSettings.get("AOL_DISABLE_SIGNCOMMENT_TEXTNOTE") != "Y") {
				// 1070110 Raymond 1060452 若先設定了簽辦意見, 則在蓋職名章時自動於前面新增文字意見圖示
				if(theAOL.currSignComment().length > 0) {	// 1100708 Raymond 1100648 配合支援分文稿記錄簽核意見功能修改, signComment->currSignComment
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
					// 文字意見
					var str = "";
					var defaultWidth = 20;//2016.12.27	Leslie	先引用輸入欄的寬度，當成預設寬度，並加入so物件中，供後續"切字"之用
					var so3 = {
						id: that.getNewID(),
						type: "text",
						orient: "橫書",
						cTime: now,
						//pos: that.anchorPt,   // anchorPt是相對於viewPort的座標
						content: str,
						fontName: defFont,		// 2015.6.25 改為預設標楷體, 2016.3.16 改為AOL_TEXTOBJECT_FONT環境變數設定的預設字型
						fontSize: defSize + "pt",
						fontWeight: defBold,
						fontStyle: false,
						color: theAOL.getCurrFolio().getUserColor(),
						asIcon: true,
						boundTo: that.$pg.data("pg"),
						sessionNew: true,		// 2015.8.21 新增標記此簽核物件為本階段新增
						width: defaultWidth,	//2016.12.27	Leslie	先引用輸入欄的寬度，當成預設寬度，並加入so物件中，供後續"切字"之用
						srcContent:str			//2016.12.27	Leslie	增加寫入原始文字內容
					};
					so3.info = that.makeSOInfo(so3.id, so3.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
					// 要減掉Pg到viewPort之間的差距, 才是真正對應Pg上的點擊座標
					so3.pos = {
						left: that.anchorPt.left - 18 - ((that.$pg.offset().left - $viewPort.offset().left) * 100 / ((z !== undefined)?z.currScale:100)),
						top: that.anchorPt.top + 18 - ((that.$pg.offset().top - $viewPort.offset().top) * 100 / ((z !== undefined)?z.currScale:100))
					}
					var cmt = new TextComment(so3);
					cmt.initiateSO(that.$pg);
				}
				}

				c.cmdFloat.hide();
				
				// 1130423 Raymond 1120881 判斷需重新整理時, 在蓋完代字章後再重新整理
				if(!!needRefresh && needRefresh.refresh == true) {
					if(needRefresh.goNextPage == true) {
						let fv = that.$pg.closest(".viewPort").data("view");
						fv.goToPage(fv.currPo() + 1);
					}
					else
						that.$pg.closest(".pages").flip("refresh");
				}
				
				// 1101008 Raymond 修正iPadOS 14/15加蓋職名章圖檔後不會顯示的問題
				if(navigator.userAgent.match(/Mac OS/gi) && !window.realMac) {
					var $tmpDiv = $("<div></div>").appendTo(that.$pg);
					setTimeout(function() {
						$tmpDiv.remove();
					}, 0);
				}
			}
			else
				throw new Error("指定職名章(" + idx + ")超過範圍!");
		}
	}
	// 2016.9.23 - 新增一個有代字的職名章
	function addSignetSubst(cbdata) {
		
		// 1140930 Raymond 1140818 V5再變更需求項目7, 判斷SSO_CONFIG.OrgNickName=TPVGH時, 取消提示非完稿模式的警告訊息及切回完稿模式
		// 1060518 Raymond 1060269 檢核目前追蹤修訂模式是否為完稿模式, 若不是的話, 提示訊息後, 切回完稿模式
		//if(TCControl.currMode != 1) {
		if(TCControl.currMode != 1 && SSO_CONFIG.OrgNickName != "TPVGH") {
			alert("目前追蹤修訂模式非完稿模式，為避免簽核物件在非完稿模式下可能發生位置異常問題，系統將切回完稿模式顯示。");
			$("#aol #tcControl1 select").val(1).trigger("change");
			return;	// 重新排版會使that.$pg無效, 須重新再選用一次簽核工具
		}
		if(theAOL.signetBox.length < 1)
			throw new Error("無職名章可加蓋!");
		else {
			var idx = 0;
			if(SSOUtil.typeOf(cbdata) == "number")
				idx = cbdata;
			if(idx >= 0 && idx < theAOL.signetBox.length) {
				var that = this;
				var now = Util.now();
				var stamp = theAOL.signetBox[idx];
				var so = {
					id: that.getNewID(),
					type: "stamp.signet",	// stamp:選用章戳, stamp.signet:職名章
					orient: "橫書",
					cTime: now,
					//pos: that.anchorPt,   // anchorPt是相對於viewPort的座標
					boundTo: that.$pg.data("pg"),
					sessionNew: true		// 2015.8.21 新增標記此簽核物件為本階段新增
				};
				so.info = that.makeSOInfo(so.id, so.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
				// 要減掉Pg到viewPort之間的差距, 才是真正對應Pg上的點擊座標
				var $viewPort = that.$pg.closest(".viewPort"),
					z = $viewPort.data("zoomController"),   // 如果有縮放控制的話要套用
					c = $viewPort.data("editCursor");		// 控制指令列
				so.pos = {
					left: that.anchorPt.left - ((that.$pg.offset().left - $viewPort.offset().left) * 100 / ((z !== undefined)?z.currScale:100)),
					top: that.anchorPt.top - ((that.$pg.offset().top - $viewPort.offset().top) * 100 / ((z !== undefined)?z.currScale:100))
				}
				// 1090312 Raymond 1081105 新增判斷符合條件時, 自動移動職名章至目前點擊簽核區域的相對位置
				var res = getResetSignetPos(so.pos, that.$pg);
				if(!!res) {
					theLogger.warn("重設職名章位於簽核框(" + res.signArea.saType + "," + res.signArea.id + ")內的相對位置 - " + res.offsetX + "," + res.offsetY);
					so.signArea = res.signArea;
					so.saType = res.signArea.saType;
					so.saID = res.signArea.id;
					so.offset = {left: res.offsetX, top: res.offsetY};
				}
				
				//直接蓋職名章一律顯示時戳
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
				// 1130423 Raymond 1120881 需重新整理時不要直接refresh/goToPage, 等代字加蓋後再refresh/goToPage
				//cmt.initiateSO(that.$pg);
				var needRefresh = cmt.initiateSO(that.$pg, {retNeedRefresh: true});
				var stampExt = {
					w: cmt.$so.width(),
					h: cmt.$so.height()
				}
				
				// 代字是固定樣式
				var so2 = {
					id: that.getNewID(),
					type: "stamp.text",			// stamp:選用章戳(圖檔), stamp.text:選用章戳(文字)
					orient: "橫書",
					cTime: now,
					//pos: that.anchorPt,   // anchorPt是相對於viewPort的座標
					boundTo: that.$pg.data("pg"),
					sessionNew: true,		// 2015.8.21 新增標記此簽核物件為本階段新增
					content: "代",
					fontName: "標楷體",
					fontSize: "18pt",
					color: {r: 0, g: 0, b: 0}	// 2016.11.17 FDA要求代字用黑色
				};
				// 1130820 Raymond 1130853 新增判斷環境變數「AOL_USE_RED_PROXY_WORD」設為"Y"時, 改用紅色顯示代字
				if(theSSO.User.EnvSettings.get("AOL_USE_RED_PROXY_WORD") == "Y")
					so2.color.r = 255;
				if(theUserInfo.OrgNickName == "NCHU")	// 1071219 Raymond 1071227 中興要求代字要用14pt大小
					so2.fontSize = "14pt";
				so2.info = that.makeSOInfo(so2.id, so2.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
				so2.pos = {
					left: so.pos.left + stampExt.w,
					top: so.pos.top + stampExt.h - 30};
				// 1090312 Raymond 1081105 新增followCmt屬性在被連動的簽核物件, 當刪除被連動的簽核物件, 而不是連動來源的簽核物件時, 移除來源物件中的linkCmt屬性, 以免再刪除來源物件時發生移除linkCmt所指的簽核物件發生Error
				//var cmt = new Stamp(so2);
				//cmt.initiateSO(that.$pg);
				var cmt2 = new Stamp(so2);
				cmt2.initiateSO(that.$pg);
				
				// 2017.3.29 職名章移動連帶移動代字
				so.linkSOID = so2.id;
				// 1090312 Raymond 1081105 新增followCmt屬性在被連動的簽核物件, 當刪除被連動的簽核物件, 而不是連動來源的簽核物件時, 移除來源物件中的linkCmt屬性, 以免再刪除來源物件時發生移除linkCmt所指的簽核物件發生Error
				//so.linkCmt = cmt;
				so.linkCmt = cmt2;
				so2.followCmt = cmt;
				
				c.cmdFloat.hide();
				
				// 1130423 Raymond 1120881 判斷需重新整理時, 在蓋完代字章後再重新整理
				if(!!needRefresh && needRefresh.refresh == true) {
					if(needRefresh.goNextPage == true) {
						let fv = that.$pg.closest(".viewPort").data("view");
						fv.goToPage(fv.currPo() + 1);
					}
					else
						that.$pg.closest(".pages").flip("refresh");
				}
				
				// 1101008 Raymond 修正iPadOS 14/15加蓋職名章圖檔後不會顯示的問題
				if(navigator.userAgent.match(/Mac OS/gi) && !window.realMac) {
					var $tmpDiv = $("<div></div>").appendTo(that.$pg);
					setTimeout(function() {
						$tmpDiv.remove();
					}, 0);
				}
			}
			else
				throw new Error("指定職名章(" + idx + ")超過範圍!");
		}
	}
	// 2013.5.21 - Raymond, 整合Erin的Code, 新增選用章戳
	function addStamp() {
		
		// 1140930 Raymond 1140818 V5再變更需求項目7, 判斷SSO_CONFIG.OrgNickName=TPVGH時, 取消提示非完稿模式的警告訊息及切回完稿模式
		// 1060518 Raymond 1060269 檢核目前追蹤修訂模式是否為完稿模式, 若不是的話, 提示訊息後, 切回完稿模式
		//if(TCControl.currMode != 1) {
		if(TCControl.currMode != 1 && SSO_CONFIG.OrgNickName != "TPVGH") {
			alert("目前追蹤修訂模式非完稿模式，為避免簽核物件在非完稿模式下可能發生位置異常問題，系統將切回完稿模式顯示。");
			$("#aol #tcControl1 select").val(1).trigger("change");
			return;	// 重新排版會使that.$pg無效, 須重新再選用一次簽核工具
		}
		var that = this;
		var category, pickup;
		var grantApprStamp = undefined;	// 1100510 Raymond 1100293 「代為決行」章戳(copy from CDC 1080436)
		// 1130729 Raymond 領務局卡驗收需求序8 從localStorage中讀取記憶的上次選取的選用章戳記錄
		var remSet = {};
		var lastSelectedStamp = localStorage['last_selected_stamp'];
		if(typeof lastSelectedStamp == "string" && lastSelectedStamp.length > 0) {
			remSet = JSON.parse(lastSelectedStamp);
		}
		var cdm = theAOL.getCurrFolio().getCurrDraftModel();
		if(!!cdm) {
			category = cdm.getDocType();	// 上面的category沒用到, 這裡拿來用
			if(category == "令" || category == "函")
				category = cdm.getSubDocType();
		}
		else {	// 沒有DraftModel是來文
			category = "簽";	// 來文的選用章戳記憶規則比照"簽"
		}
		var rem = remSet[category];	// 選用章戳記錄以文別或令/函類別為Key, 分開記錄
		Util.getDlg("RD-OrgStampBox.html").done(function($dlg) {
			
			$dlg.find("header > h1").unwrap();
			$dlg.find("footer > div").unwrap();
			
			$dlg.find("a#ok").on('click', function(event) {
				
				if(pickup == undefined) {
					$dlg.find("#stampList > div").eq(0).tipAlert("請選取章戳");	// 1120823 Raymond 1120562 新增檢核若未選取任何選用章戳時, 顯示警告
					return false;
				}
				
				var now = Util.now(), stamp;
				if(pickup.group == theAOL.toolStampBox.length)	// 職名章group在toolStampBox之後
					stamp = theAOL.signetBox[pickup.index];
				else {
					stamp = theAOL.toolStampBox[pickup.group].stamps[pickup.index];
					// 1130729 Raymond 領務局卡驗收需求序8 點了「確定」鈕才記憶目前文別/令函類別所選取的選用章戳資訊
					if(!!rem) {
						rem.userOrOrg = theAOL.toolStampBox[pickup.group].userOrOrg;	// 個人或共用章戳匣("user"|"org")
						rem.groupName = theAOL.toolStampBox[pickup.group].groupName;	// 章戳匣名稱
						rem.stampName = stamp.stampName;								// 章戳名稱
					}
					else {
						remSet[category] = {
							userOrOrg: theAOL.toolStampBox[pickup.group].userOrOrg,		// 個人或共用章戳匣("user"|"org")
							groupName: theAOL.toolStampBox[pickup.group].groupName,		// 章戳匣名稱
							stampName: stamp.stampName};								// 章戳名稱
					}
					localStorage['last_selected_stamp'] = JSON.stringify(remSet);		// 記憶在localStorage
				}

				// 2016.3.4 新增, #stampView的img跟div的寬高在confirm時因為modal視窗隱藏後會變0, 故須先提早抓取
				if($dlg.find("#stampView img#stampImg").css("display") != "none")
					var stampExt = {
						w: $dlg.find("#stampView img#stampImg").width(),
						h: $dlg.find("#stampView img#stampImg").height()};
				else
					var stampExt = {
						w: $dlg.find("#stampView span#stampTx").width(),
						h: $dlg.find("#stampView span#stampTx").height()};
				var divExt = {
					w: $dlg.find("#stampView div#signetDiv").width(),
					h: $dlg.find("#stampView div#signetDiv").height()
				};
				
				// 2015.11.3 - 改成先詢問是否可連動及加蓋, 故切成function
				function doAddStamp() {
					var so = {
						id: that.getNewID(),
						type: "stamp",			// stamp:選用章戳(圖檔), stamp.text:選用章戳(文字)
						orient: "橫書",
						cTime: now,
						//pos: that.anchorPt,   // anchorPt是相對於viewPort的座標
						boundTo: that.$pg.data("pg"),
						sessionNew: true,		// 2015.8.21 新增標記此簽核物件為本階段新增
						actionName: stamp.actionName	// 2016.6.1 新增章戳連動名稱(1050095)
					};
					so.info = that.makeSOInfo(so.id, so.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
					if(pickup.group == theAOL.toolStampBox.length) {	// 職名章group在toolStampBox之後
						so.type = "stamp.signet";	// 2015.6.23 改為表示職名章的type
						// 1110907 Raymond 1110985 修改[職名章]清單中選取的章不要加蓋時戳, 因為本單修正前, 是用數位墨水方式顯示此清單的項目章戳, 故維持版更前的行為不顯示時戳
						// 2015.6.23 是否加蓋時戳借用上方新增的勾選選項來決定
						//if($dlg.find("#dispTime").prop("checked"))
						//	so.dispTime = true;
					}
					// 要減掉Pg到viewPort之間的差距, 才是真正對應Pg上的點擊座標
					var $viewPort = that.$pg.closest(".viewPort"),
						z = $viewPort.data("zoomController");   // 如果有縮放控制的話要套用
					so.pos = {
						left: that.anchorPt.left - ((that.$pg.offset().left - $viewPort.offset().left) * 100 / ((z !== undefined)?z.currScale:100)),
						top: that.anchorPt.top - ((that.$pg.offset().top - $viewPort.offset().top) * 100 / ((z !== undefined)?z.currScale:100))
					}
					// 1090312 Raymond 1081105 新增判斷符合條件時, 自動移動職名章至目前點擊簽核區域的相對位置
					var res = getResetSignetPos(so.pos, that.$pg);
					if(!!res) {
						theLogger.warn("重設職名章位於簽核框(" + res.signArea.saType + "," + res.signArea.id + ")內的相對位置 - " + res.offsetX + "," + res.offsetY);
						so.signArea = res.signArea;
						so.saType = res.signArea.saType;
						so.saID = res.signArea.id;
						so.offset = {left: res.offsetX, top: res.offsetY};
						if ($dlg.find("#withStamp").prop("checked") &&	// 一併加蓋職名章時, 計算職名章對齊方式後的位移位置
							$dlg.find("#signet").get(0).selectedIndex >= 0) {
							var amode = $dlg.find("#alignMode").get(0).selectedIndex;
							if(amode == 0) {	// 右邊界對齊行尾
								so.offset.left = res.offsetX + Math.max(divExt.w - stampExt.w, 0);
							}
							else if(amode == 1) {	// 左邊界對齊行尾
							}
							else if(amode == 2) {	// 左邊界對齊行首
							}
							else if(amode == 3) {	// 齊中(職名章在下)
								so.offset.left = res.offsetX + Math.max((divExt.w - stampExt.w) / 2, 0);
							}
							else if(amode == 4) {	// 齊中(職名章在上)
								so.offset.left = res.offsetX + Math.max((divExt.w - stampExt.w) / 2, 0);
								so.offset.top = res.offsetY + divExt.h;
							}
						}
					}
					
					if(typeof stamp.fileInfo !== "undefined") { // 影像檔章戳
						so.content = stamp.data;
						so.size = {width: (stamp.size.w / 10) + "mm", height: (stamp.size.h / 10) + "mm"};
						// 1110907 Raymond 1110985 修正在選用章戳子視窗的[職名章]清單中選取的章蓋在文稿上時會變成黑色的問題
						if(so.type == "stamp.signet") {
							so.color = {r: stamp.color.r, g: stamp.color.g, b: stamp.color.b};
							var cmt = new Stamp(so);
							// 1130423 Raymond 1120881 若選取核示語詞是職名章, 則先不要自動增高簽核區域
							//cmt.initiateSO(that.$pg);
							cmt.initiateSO(that.$pg, {suspendSALP: true});
						}
						else {
							//so.color = {r: stamp.color.r, g: stamp.color.g, b: stamp.color.b};	//2017.2.21	Leslie	修改圖檔類型的選用章戳，改為"圖檔"類型的簽核物件
							so.type = "sketch";
							so.transparency = "0";	//透明度設為0
							so.asIcon = false;
							so.maskBkgnd = 'Y';
							so.stampName = stamp.stampName;	// 1130705 Raymond 中榮序139 新增影像章戳的名稱, 以供刪除文字意見時重置簽辦意見時使用
							var cmt = new SketchComment(so);	//2017.2.21	Leslie	改用數位墨水的物件(圖檔)來建立
							cmt.initiateSO(that.$pg);
							
							// 1140922 Raymond 1140887 新增判斷機關暱稱是TPVGH(北榮)時, 改叫用setMergedTextCommentToSignComment()
							if(SSO_CONFIG.OrgNickName == "TPVGH") {
								setMergedTextCommentToSignComment();
							}
							else {
							// 1120406 Raymond 銓敘部序198 加蓋選用章戳時自動將影像檔式選用章戳的章戳名稱帶入簽辦意見
							if(theSSO.User.EnvSettings.get("AOL_ENABLE_STAMP_TO_SIGNCOMMENT") == "Y") {
								var csc = theAOL.currSignComment();
								if(typeof csc == "string" && csc.length > 0) {
									if(confirm("目前簽辦意見已有內容，是否以章戳名稱取代？\r\n\r\n點擊「確定」取代目前簽辦意見內容\r\n點擊「取消」則累加在目前簽辦意見內容後"))
										theAOL.currSignComment(stamp.stampName);
									else
										theAOL.currSignComment(csc + stamp.stampName);
								}
								else
									theAOL.currSignComment(stamp.stampName);
							}
							}
						}
					}
					else {  // 文字章戳
						so.type = "stamp.text";	// 變更為stamp.text表示文字式選用章戳
						so.content = stamp.textContent;
						so.fontName = stamp.font.name;
						so.fontSize = stamp.font.size + "pt";
						so.color = {r: stamp.font.color.r, g: stamp.font.color.g, b: stamp.font.color.b};
						if(stamp.font.style.search("粗") >= 0)
							so.fontWeight = true;
						if(stamp.font.style.search("斜") >= 0)
							so.fontStyle = true;
						var cmt = new Stamp(so);	//2017.2.21	Leslie	僅文字章戳用Stamp物件
						cmt.initiateSO(that.$pg);
						
						// 1140922 Raymond 1140887 新增判斷機關暱稱是TPVGH(北榮)時, 改叫用setMergedTextCommentToSignComment()
						if(SSO_CONFIG.OrgNickName == "TPVGH") {
							setMergedTextCommentToSignComment();
						}
						else {
						// 1120406 Raymond 銓敘部序198 加蓋選用章戳時自動將文字式選用章戳的文字內容帶入簽辦意見
						if(theSSO.User.EnvSettings.get("AOL_ENABLE_STAMP_TO_SIGNCOMMENT") == "Y") {
							var csc = theAOL.currSignComment();
							if(typeof csc == "string" && csc.length > 0) {
								if(confirm("目前簽辦意見已有內容，是否以章戳內容取代？\r\n\r\n點擊「確定」取代目前簽辦意見內容\r\n點擊「取消」則累加在目前簽辦意見內容後"))
									theAOL.currSignComment(stamp.textContent);
								else
									theAOL.currSignComment(csc + stamp.textContent);
							}
							else
								theAOL.currSignComment(stamp.textContent);
						}
						}
					}
					
					var withStamp = false;	// 1100510 Raymond 1100293 是否已加蓋職名章(copy from CDC 1080436)
					// 2015.6.24 新增加蓋職名章、時戳功能
					if($dlg.find("#withStamp").prop("checked")) {	// 加蓋職名章
						var signetIndex = $dlg.find("#signet").get(0).selectedIndex;
						if(signetIndex >= 0) {
							var box = theAOL.signetBox[signetIndex];
							theLogger.log("加蓋職名章'" + box.title + "'...");
							var so2 = {
								id: that.getNewID(),
								type: "stamp.signet",
								orient: "橫書",
								cTime: now,
								boundTo: that.$pg.data("pg"),
								sessionNew: true		// 2015.8.21 新增標記此簽核物件為本階段新增
							};
							so2.info = that.makeSOInfo(so2.id, so2.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
							if($dlg.find("#dispTime").prop("checked"))
								so2.dispTime = true;
							
							if(typeof box.fileInfo !== "undefined") { // 影像檔章戳
								so2.content = box.data;
								so2.size = {width: (box.size.w / 10) + "mm", height: (box.size.h / 10) + "mm"};
								so2.color = {r: box.color.r, g: box.color.g, b: box.color.b};
							}
							else {  // 文字章戳
								throw new Error("職名章有文字式的嗎?");
							}
							
							/* 2016.3.4 FIX, confirm時因為modal視窗隱藏, 此時再抓#stampView img及div的寬高都會是0
							if($dlg.find("#stampView img#stampImg").css("display") != "none")
								var stampExt = {
									w: $dlg.find("#stampView img#stampImg").width(),
									h: $dlg.find("#stampView img#stampImg").height()};
							else
								var stampExt = {
									w: $dlg.find("#stampView span#stampTx").width(),
									h: $dlg.find("#stampView span#stampTx").height()};*/
							// 對齊模式
							var amode = $dlg.find("#alignMode").get(0).selectedIndex;
							if(amode == 0) {	// 右邊界對齊行尾
								so2.pos = {
									left: so.pos.left + stampExt.w - divExt.w,//$dlg.find("#stampView div#signetDiv").width(),	2016.3.4 FIX
									top: so.pos.top + stampExt.h};
							}
							else if(amode == 1) {	// 左邊界對齊行尾
								so2.pos = {
									left: so.pos.left + stampExt.w,
									top: so.pos.top + stampExt.h};
							}
							else if(amode == 2) {	// 左邊界對齊行首
								so2.pos = {
									left: so.pos.left,
									top: so.pos.top + stampExt.h};
							}
							else if(amode == 3) {	// 齊中(職名章在下)
								so2.pos = {
									left: so.pos.left + ((stampExt.w - divExt.w/*$dlg.find("#stampView div#signetDiv").width()*/) / 2),	// 2016.3.4 FIX
									top: so.pos.top + stampExt.h};
							}
							else if(amode == 4) {	// 齊中(職名章在上)
								so2.pos = {
									left: so.pos.left + ((stampExt.w - divExt.w/*$dlg.find("#stampView div#signetDiv").width()*/) / 2),	// 2016.3.4 FIX
									top: so.pos.top - divExt.h/*$dlg.find("#stampView div#signetDiv").height()*/};						// 2016.3.4 FIX
							}
							// 1080104 Raymond 隨選用章戳加蓋的職名章, 直接指定與選用章戳相同的簽核區域, 以免計算職名章中心點位置有可能落在簽核區域外導致章消失的問題
							if(!!so.signArea) {
								so2.signArea = so.signArea;
								so2.offset = {
									// 1110516 Raymond 考試院序90 修正在非100%縮放比情形下開啟公文後, 若簽核框位置位於非左上角, 使用選用章戳加蓋的職名章會位移(大於100%往左上移, 小於100%往右下移)的問題
									//left: so2.pos.left - so.signArea.left,
									//top: so2.pos.top - so.signArea.top};
									left: so2.pos.left - ((so.signArea.$area.offset().left - that.$pg.offset().left) * 100 / ((z !== undefined)?z.currScale:100)),
									top: so2.pos.top - ((so.signArea.$area.offset().top - that.$pg.offset().top) * 100 / ((z !== undefined)?z.currScale:100))};
								so2.saType = so.saType;
								so2.saID = so.saID;
							}
							
							// 1090311 Raymond 1081105 選用章戳移動連帶移動職名章
							//var cmt = new Stamp(so2);
							//cmt.initiateSO(that.$pg);
							var cmt2 = new Stamp(so2);
							// 1130423 Raymond 1120881 傳入核示語詞的top位置, 供計算包含核示語詞的高度範圍內是否壓線, 需重新整理時不要直接refresh/goToPage, 等代字加蓋後再refresh/goToPage
							//cmt2.initiateSO(that.$pg);
							var needRefresh = cmt2.initiateSO(that.$pg, {overallTop: so.pos.top, retNeedRefresh: true});
							withStamp = true;	// 1100510 Raymond 1100293 已加蓋職名章(copy from CDC 1080436)
							// 1090715 Raymond 1081105 新增判斷環境變數AOL_DISABLE_SIGNET_FOLLOWING_STAMP不是Y或1, 才設定選用章戳連動職名章
							var disableSignetFollowingStamp = theSSO.User.EnvSettings.get("AOL_DISABLE_SIGNET_FOLLOWING_STAMP");
							if(disableSignetFollowingStamp != "Y" && disableSignetFollowingStamp != "1") {
							so.linkSOID = so2.id;
							so.linkCmt = cmt2;
							so2.followCmt = cmt;
							}
							
							// 1131007 Raymond 1130988 新增加蓋的選用章戳若中心點不在簽核區域內, 但因連帶的職名章壓線, 自動增高簽核區域, 所以選用章戳也要改設為簽核區域內物件
							if(!so.signArea && !!so2.signArea) {
								so.signArea = so2.signArea;
								so.offset = {
									// 1110516 Raymond 考試院序90 修正在非100%縮放比情形下開啟公文後, 若簽核框位置位於非左上角, 使用選用章戳加蓋的職名章會位移(大於100%往左上移, 小於100%往右下移)的問題
									//left: so2.pos.left - so.signArea.left,
									//top: so2.pos.top - so.signArea.top};
									left: so.pos.left - ((so.signArea.$area.offset().left - that.$pg.offset().left) * 100 / ((z !== undefined)?z.currScale:100)),
									top: so.pos.top - ((so.signArea.$area.offset().top - that.$pg.offset().top) * 100 / ((z !== undefined)?z.currScale:100))};
								so.saType = so2.saType;
								so.saID = so2.saID;
								// 更新此簽核物件的類型為簽核區域內物件
								theAOL.getCurrFolio().getSignFolder().xSignFolder().updateSignObj(so);
							}
							
							// 1080417 Raymond 1080053 新增加蓋代字功能
							if($dlg.find("#addProxyWord").prop("checked")) {
								// 1090311 Raymond 1081105 選用章戳移動連帶移動職名章
								//stampExt = {w: cmt.$so.width(), h: cmt.$so.height()};
								var stampExt2 = {w: cmt2.$so.width(), h: cmt2.$so.height()};	// 1100511 Raymond 1100293 變數更名stampExt -> stampExt2, 避免影像代為決行章的位置計算, 1110513 Raymond 1110538 補var宣告
								// 代字是固定樣式
								var so3 = {
									id: that.getNewID(),
									type: "stamp.text",			// stamp:選用章戳(圖檔), stamp.text:選用章戳(文字)
									orient: "橫書",
									cTime: now,
									//pos: that.anchorPt,   // anchorPt是相對於viewPort的座標
									boundTo: that.$pg.data("pg"),
									sessionNew: true,		// 2015.8.21 新增標記此簽核物件為本階段新增
									content: "代",
									fontName: "標楷體",
									fontSize: "18pt",
									color: {r: 0, g: 0, b: 0}	// 2016.11.17 FDA要求代字用黑色
								};
								// 1130820 Raymond 1130853 新增判斷環境變數「AOL_USE_RED_PROXY_WORD」設為"Y"時, 改用紅色顯示代字
								if(theSSO.User.EnvSettings.get("AOL_USE_RED_PROXY_WORD") == "Y")
									so3.color.r = 255;
								if(theUserInfo.OrgNickName == "NCHU")	// 1071219 Raymond 1071227 中興要求代字要用14pt大小
									so3.fontSize = "14pt";
								so3.info = that.makeSOInfo(so3.id, so3.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
								so3.pos = {
									left: so2.pos.left + stampExt2.w,		// 1100511 Raymond 1100293 變數更名stampExt -> stampExt2, 避免影像代為決行章的位置計算
									top: so2.pos.top + stampExt2.h - 30};	// 1100511 Raymond 1100293 變數更名stampExt -> stampExt2, 避免影像代為決行章的位置計算
								var cmt3 = new Stamp(so3);
								cmt3.initiateSO(that.$pg);
								
								// 2017.3.29 職名章移動連帶移動代字
								so2.linkSOID = so3.id;
								so2.linkCmt = cmt3;
								// 1090312 Raymond 1081105 新增followCmt屬性在被連動的簽核物件, 當刪除被連動的簽核物件, 而不是連動來源的簽核物件時, 移除來源物件中的linkCmt屬性, 以免再刪除來源物件時發生移除linkCmt所指的簽核物件發生Error
								so3.followCmt = cmt2;
							}
						}
						else
							theLogger.warn("勾選加蓋職名章但未選取職名章!");
					}
					
					// 1100510 Raymond 1100293 新增代為決行章(copy from CDC 1080436)
					if(theSSO.User.EnvSettings.get("AOL_ENABLE_GRANT_APPROVE") == "Y") {
						if($dlg.find("#grantAppr").prop("checked")) {	// 加蓋代為決行章
							if(!!grantApprStamp) {
								theLogger.log("加蓋代為決行章...");
								var so4 = {
									id: that.getNewID(),
									type: "stamp",			// stamp:選用章戳(圖檔), stamp.text:選用章戳(文字)
									orient: "橫書",
									cTime: now,
									boundTo: that.$pg.data("pg"),
									sessionNew: true,		// 新增標記此簽核物件為本階段新增
									/*stampName: "代為決行"	// Raymond 新增stampName用於核章時辨識是否有加蓋代為決行章戳, 航港局1100293此單未提要不要檢核是否有加蓋"代為決行"章 */
								};
								so4.info = that.makeSOInfo(so4.id, so4.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
								
								if(withStamp)
									so4.pos = {
										left: so2.pos.left,
										top: Math.max(so2.pos.top + divExt.h, so.pos.top + stampExt.h)};
								else
									so4.pos = {
										left: so.pos.left,
										top: so.pos.top + stampExt.h};
								// 直接指定與選用章戳相同的簽核區域, 以免計算章中心點位置有可能落在簽核區域外導致章消失的問題
								if(!!so.signArea) {
									so4.signArea = so.signArea;
									so4.offset = {
										// 1110516 Raymond 考試院序90 修正在非100%縮放比情形下開啟公文後, 若簽核框位置位於非左上角, 使用選用章戳加蓋的代為決行章會位移(大於100%往左上移, 小於100%往右下移)的問題
										//left: so4.pos.left - so.signArea.left,
										//top: so4.pos.top - so.signArea.top};
										left: so4.pos.left - ((so.signArea.$area.offset().left - that.$pg.offset().left) * 100 / ((z !== undefined)?z.currScale:100)),
										top: so4.pos.top - ((so.signArea.$area.offset().top - that.$pg.offset().top) * 100 / ((z !== undefined)?z.currScale:100))};
									so4.saType = so.saType;
									so4.saID = so.saID;
								}
								
								if(typeof grantApprStamp.fileInfo !== "undefined") { // 影像檔章戳
									so4.content = grantApprStamp.data;
									so4.size = {width: (grantApprStamp.size.w / 10) + "mm", height: (grantApprStamp.size.h / 10) + "mm"};
									//so4.color = {r: grantApprStamp.color.r, g: grantApprStamp.color.g, b: grantApprStamp.color.b};	//2017.2.21	Leslie	修改圖檔類型的選用章戳，改為"圖檔"類型的簽核物件
									so4.type = "sketch";
									so4.transparency = "0";	//透明度設為0
									so4.asIcon = false;
									so4.maskBkgnd = 'Y';
									var cmt = new SketchComment(so4);	//2017.2.21	Leslie	改用數位墨水的物件(圖檔)來建立
									cmt.initiateSO(that.$pg);
								}
								else {  // 文字章戳
									so4.type = "stamp.text";	// 變更為stamp.text表示文字式選用章戳
									so4.content = grantApprStamp.textContent;
									so4.fontName = grantApprStamp.font.name;
									so4.fontSize = grantApprStamp.font.size + "pt";
									so4.color = {r: grantApprStamp.font.color.r, g: grantApprStamp.font.color.g, b: grantApprStamp.font.color.b};
									if(grantApprStamp.font.style.search("粗") >= 0)
										so4.fontWeight = true;
									if(grantApprStamp.font.style.search("斜") >= 0)
										so4.fontStyle = true;
									var cmt = new Stamp(so4);	//2017.2.21	Leslie	僅文字章戳用Stamp物件
									cmt.initiateSO(that.$pg);
								}
							}
							else
								theLogger.warn("找不到代為決行章, 但勾選了「代為決行」選項");
						}
					}
					
					// 1130423 Raymond 1120881 判斷需重新整理時, 在蓋完代字章/決行章及執行連動後再重新整理
					if(!!needRefresh && needRefresh.refresh == true) {
						if(needRefresh.goNextPage == true) {
							let fv = that.$pg.closest(".viewPort").data("view");
							fv.goToPage(fv.currPo() + 1);
						}
						else
							that.$pg.closest(".pages").flip("refresh");
					}
					
					// 1101008 Raymond 修正iPadOS 14/15加蓋選用章戳圖檔後不會顯示的問題
					if(navigator.userAgent.match(/Mac OS/gi) && !window.realMac) {
						var $tmpDiv = $("<div></div>").appendTo(that.$pg);
						setTimeout(function() {
							$tmpDiv.remove();
						}, 0);
					}
				}
				
				/* 向page觸發Custom Event
				   2015.11.3 - Raymond, 改成呼叫confirmAction來判斷是否可加蓋及連動
				if(typeof stamp.actionName !== "undefined" && stamp.actionName !== null) {
					var e = new $.Event("stampAction");;
					e.name = stamp.actionName;
					that.$pg.trigger(e);
				}*/
				// 2015.11.3 - Raymond, 新增查詢可否連動
				if(typeof stamp.actionName !== "undefined" && stamp.actionName !== null) {
					// 1061101 Raymond 1061066 文別若是簽、便簽(可設定)則先檢查是否已核決, 已核決則一律僅蓋章不要連動核決狀態,
					// 連confirm都不要有, 因為長官只會按是, 造成結案類型從發文變成存查, 直接歸檔沒有發文
					var skipStampAct = false;	// 預設要連動核決狀態
					if(SSO_CONFIG.disableAppActOfSpecialDraft) {	// SSO_CONFIG.js定義disableAppActOfSpecialDraft為true時才要過濾文別
						var docApproved =(theAOL.docObj.get('ODWMSG', 'APP_USER_ID').length || theAOL.docObj.get('ODWMSG', 'APP_ROLE_ID').length) ? true : false;
						if(docApproved) {
							theLogger.warn("本件公文已核決, 檢查此文稿的文別是否屬於應不套用連動核決狀態的文別");
							var pg = that.$pg.data("pg");
							if(!!pg.container) {
								var docType;
								if("attType" in pg.container) {
									if("fromType" in pg.container.parent) {
										theLogger.log("在來文的附件頁面上蓋章視為'簽'");
										docType = "簽";
									}
									else if(pg.container.parent.name == "來文簽辦") {
										theLogger.log("在來文簽辦的附件頁面上蓋章視為'簽'");
										docType = "簽";
									}
									else {
										docType = pg.container.parent.docType;
										theLogger.log("在'" + docType + "'的附件頁面上蓋章");
									}
								}
								else if("fromType" in pg.container) {
									theLogger.log("來文頁面上蓋章視為'簽'");
									docType = "簽";
								}
								else if("docType" in pg.container) {
									if(pg.container.name == "來文簽辦") {
										theLogger.log("在來文簽辦的頁面上蓋章視為'簽'");
										docType = "簽";
									}
									else {
										docType = pg.container.docType;
										theLogger.log("在'" + docType + "'的文稿頁面上蓋章");
									}
								}
								else {
									theLogger.error("頁面非文稿或附件(" + pg.container.name + ")")
								}
								if(!!docType) {
									if("disableAppActDocTypes" in SSO_CONFIG) {	// 以SSO_CONFIG.js定義的"應不套用章戳連動核決狀態的文別"決定應否不連動
										var disDocTypes = SSO_CONFIG.disableAppActDocTypes.split(",");
										if(disDocTypes.indexOf(docType) >= 0) {
											theLogger.warn("此文稿屬於應不套用章戳連動核決狀態之文別(" + SSO_CONFIG.disableAppActDocTypes + ")之一, 僅蓋章不連動核決狀態");
											skipStampAct = true;
										}
										else {
											theLogger.log("此文稿非應不套用章戳連動核決狀態之文別(" + SSO_CONFIG.disableAppActDocTypes + ")之一, 連動核決狀態");
										}
									}
									else {
										theLogger.error("SSO_CONFIG.js未定義'disableAppActDocTypes'參數, 無法檢核此文別是否應不要套用連動功能, 連動核決狀態");
									}
								}
							}
						}
					}
					if(skipStampAct)
						doAddStamp();
					else {

					var sah = new StampActionHandler();
					
					function doDispatchAction(opt) {
						if(opt.doAction) {	// 需要連動
							sah.dispatchAct_new(stamp.actionName)
								.done(function(rslt) {
									if("success" in rslt) {
										if(!rslt.success) {
											theLogger.error(rslt.errMsg);
											alert(rslt.errMsg);
										}
										else if(opt.addStamp)	// 連動成功後需要蓋章
											doAddStamp();
									}
									else if(opt.addStamp)	// 連動未標示成功, 需要蓋章
										doAddStamp();
								})
								.fail(function(rslt) {
									if("success" in rslt) {
										if(!rslt.success) {
											theLogger.error(rslt.errMsg);
											alert(rslt.errMsg);
										}
									}
									else {
										theLogger.error(rslt);
										alert(rslt);
									}
								});
						}
						else if(opt.addStamp)	// 不需連動但需蓋章
							doAddStamp();
					}
					
					sah.actionConfirm(stamp.actionName)
						.done(function(res) {
							if(res.showMsg) {
								// 1100318 Raymond 調整視窗標題名稱, 與章戳選用子視窗(及一代AOL)一致
								//var param = {title: "選用章戳訊息",
								var param = {title: "章戳選用訊息",
									message: res.msg.replace(/(\r\n)+/g, '<br>'),
									buttons: []
								};
								for(var i=0; i<res.options.length; i++) {
									param.buttons.push({
										name: res.options[i].btnText,
										action: doDispatchAction,
										data: res.options[i]
									});
								}
								$.confirm(param);
							}
							else if(res.options.length == 1) {
								doDispatchAction(res.options[0]);
							}
						})
						.fail(function(errorText) {
							theLogger.error(errorText);
							alert(errorText);
						});
					}
				}
				else
					doAddStamp();
				
				$.modal.close();
			});
			$dlg.find("a#cancel").on('click', function(event) {
				$.modal.close();
			});
			
			// 1100510 Raymond 1100293 若啟用環境變數則搜尋「代為決行」章戳(copy from CDC 1080436)
			if(theSSO.User.EnvSettings.get("AOL_ENABLE_GRANT_APPROVE") == "Y") {
				for(var i=0; i<theAOL.systemStampBox.length; i++) {	// 先搜尋systemStampBox
					if(theAOL.systemStampBox[i].stampId == "grantApprStamp") {
						grantApprStamp = theAOL.systemStampBox[i];
						theLogger.log("找到代為決行系統章戳'" + grantApprStamp.stampName + "'");
						break;
					}
				}
				if(!grantApprStamp) {
					for(var i=0; i<theAOL.toolStampBox.length; i++) {	// 再搜尋toolStampBox
						if(theAOL.toolStampBox[i].userOrOrg == "org") {	// 只找「共用」
							for(var j=0; j<theAOL.toolStampBox[i].stamps.length; j++) {
								if(theAOL.toolStampBox[i].stamps[j].stampName == "代為決行") {
									grantApprStamp = theAOL.toolStampBox[i].stamps[j];
									theLogger.log("找到代為決行選用章戳[共用]" + theAOL.toolStampBox[i].groupName + "#" + grantApprStamp.stampId);
									break;
								}
							}
						}
					}
				}
			}
			
			var w = that.$pg.closest("#iso").width(),
				h = that.$pg.closest("#iso").height();
			theLogger.log("新增選用章戳對話方塊, w:" + w + ",h:" + h);
			$.modal($dlg, {
				appendTo:that.$pg.closest("#iso"),
				overlayCss:{height:h, width:w},
				minHeight:440,
				minWidth:(theSSO.User.EnvSettings.get("AOL_ENABLE_GRANT_APPROVE") == "Y")?900:800,	// 2015.6.23 增加寬度以容納新增的選項	1080417 Raymond 1080053 再增加寬度以容納新的「加蓋代字」選項	// 1081022 Raymond fix 790px -> 800px	// 1100510 Raymond 1100293 啟用"代為決行"功能時再增加寬度以容納新的「代為決行」選項
				autoResize:true,
				onShow:function() {
					// 2015.6.23 新增職名章選單
					var $signet = $dlg.find("#signet");
					// 1060911 Raymond 1060764 職名章設定中是否有預設屬性設定
					var hasAutoPress = false,
						autoPressed = false;
					for(var i=0; i<theAOL.signetBox.length; i++) {
						if("autoPress" in theAOL.signetBox[i] && theAOL.signetBox[i].autoPress == "true") {
							hasAutoPress = true;
							break;
						}
					}
					for(var i=0; i<theAOL.signetBox.length; i++) {
						// 1060911 Raymond 1060764 判斷若有預設屬性設定才設為selected, 無則以第1個為預設
						//$signet.append("<option value='" + i + "'" + ((i==0)?" selected":"") + ">" + theAOL.signetBox[i].title + "</option>");
						if(!hasAutoPress)
							$signet.append("<option value='" + i + "'" + ((i==0)?" selected":"") + ">" + theAOL.signetBox[i].title + "</option>");
						else if("autoPress" in theAOL.signetBox[i] && theAOL.signetBox[i].autoPress == "true" && !autoPressed) {	// 若有複數預設設定, 以第1個預設為準
							$signet.append("<option value='" + i + "' selected>" + theAOL.signetBox[i].title + "</option>");
							autoPressed = true;
						}
						else
							$signet.append("<option value='" + i + "'>" + theAOL.signetBox[i].title + "</option>");
					}
					// 1130820 Raymond 1130853 新增判斷環境變數「AOL_USE_RED_PROXY_WORD」設為"Y"時, 改用紅色顯示代字
					if(theSSO.User.EnvSettings.get("AOL_USE_RED_PROXY_WORD") == "Y")
						$dlg.find("#stampView div#proxyWord").css("color", "rgb(255,0,0)");
					
					// 2015.6.23 更新預覽結果
					function updateView(data) {
						if(typeof data !== "undefined") {
							var stampIsImg = false;	// 1100510 Raymond 1100293 選用章戳是否為圖檔(copy from CDC 1080436)
							if(data.group == theAOL.toolStampBox.length) {	// 若群組序為共用章戳群組數量之外, 表示是新增的職名章群組
								pickup = data;
								$dlg.find("#stampView span#stampTx").hide();
								$dlg.find("#stampView img#stampImg").hide()
									.on('load', function() { // 2016.5 - jQuery upgrade, .load(function() {
										$(this).fadeIn("fast");
									})
									.css({width: (theAOL.signetBox[pickup.index].size.w / 10) + "mm",
										  height: (theAOL.signetBox[pickup.index].size.h / 10) + "mm"});
								var img = new Image();
								img.onload = function() {
									// 2015.11.13 若src與切換顯示的一致會導致不會觸發onload, 須直接show
									var dataurl = Util.modifyImgColor(this, theAOL.signetBox[pickup.index].color, false);
									var $img = $dlg.find("#stampView img#stampImg");
									if($img.attr("src") == dataurl)
										$img.show();
									else
										$img.attr("src", dataurl);
								}
								img.src = theAOL.signetBox[pickup.index].data;
								stampIsImg = true;	// 1100510 Raymond 1100293 選用章戳為職名章圖檔(copy from CDC 1080436)
							}
							else {	// 共用章戳群組
								if("styles" in data) {	// 若有styles表示是文字式章戳
									pickup = {group: data.group, index: data.index};
									$dlg.find("#stampView img#stampImg").hide();
										//.attr("src", "");
									$dlg.find("#stampView span#stampTx").hide()
										.css(data.styles)
										// 1081218 Raymond FIX XSS, 折行問題改在RD-AOL.css及讀取章戳
										//.html(theAOL.toolStampBox[pickup.group].stamps[pickup.index].textContent)	// 2016.11.22 fix for 折行
										.text(theAOL.toolStampBox[pickup.group].stamps[pickup.index].textContent)	// 2016.11.22 fix for 折行
										.fadeIn("fast");
								}
								else {	// 無styles表示是圖檔式章戳
									pickup = data;
									$dlg.find("#stampView span#stampTx").hide();
									$dlg.find("#stampView img#stampImg").hide()
										.on('load', function() { // 2016.5 - jQuery upgrade, .load(function() {
											$(this).fadeIn("fast");
										})
										.css({width: (theAOL.toolStampBox[pickup.group].stamps[pickup.index].size.w / 10) + "mm",
											  height: (theAOL.toolStampBox[pickup.group].stamps[pickup.index].size.h / 10) + "mm"});
									var img = new Image();
									// 2017.08.08	Leslie	修正圖檔式章戳，應以原圖顯示
									/*img.onload = function() {
										// 2015.11.13 若src與切換顯示的一致會導致不會觸發onload, 須直接show
										var dataurl = Util.modifyImgColor(this, theAOL.toolStampBox[pickup.group].stamps[pickup.index].color, false);
										var $img = $dlg.find("#stampView img#stampImg");
										if($img.attr("src") == dataurl)
											$img.show();
										else
											$img.attr("src", dataurl);
									}*/
									//img.src = theAOL.toolStampBox[pickup.group].stamps[pickup.index].data;
									var $img = $dlg.find("#stampView img#stampImg");
									$img.attr('src',theAOL.toolStampBox[pickup.group].stamps[pickup.index].data);
									stampIsImg = true;	// 1100510 Raymond 1100293 選用章戳為圖檔(copy from CDC 1080436)
								}
							}
						}
						var withStamp = false, amode;	// 1100510 Raymond 1100293 是否加蓋職名章, 及對齊模式(copy from CDC 1080436)
						if($dlg.find("#withStamp").prop("checked")) {	// 加蓋職名章
							var $signetDiv = $dlg.find("#stampView div#signetDiv").css("display", "inline-block");
							var signetIndex = $dlg.find("#signet").get(0).selectedIndex;
							if(signetIndex >= 0) {
								var box = theAOL.signetBox[signetIndex];
								$dlg.find("#stampView div#signetDiv img").css({ width: (box.size.w / 10) + "mm",
																				height:(box.size.h / 10) + "mm"});
								var imgAddon = new Image();
								imgAddon.onload = function() {
									$dlg.find("#stampView div#signetDiv img").attr("src", Util.modifyImgColor(this, box.color, false));
								}
								imgAddon.src = box.data;
								
								if($dlg.find("#dispTime").prop("checked")) {	// 顯示時戳
									var tx = Stamp.prototype.formatTime(Util.now());
									// 計算合適的時間戳記大小
									var h = box.size.h * 300 / 254;
									// 1120620 Raymond 標檢局序86 計算職名章高度實際px
									var pxh = box.size.h * 96 / 254;
									if(theSSO.User.EnvSettings.get('AOL_SIGNET_TIMESTAMP_SHOW_YEAR') == 'Y')
										// 1061018 Raymond 1060930 修正時戳顯示年時年超出職名章高度問題
										//$dlg.find("#stampView div#signetDiv div").css("font-size", Math.floor(h / 12) + "pt").html(tx).show();
										$dlg.find("#stampView div#signetDiv div").css("font-size", Math.floor(h / 12) + "pt").css("line-height", "1").html(tx).show();
									else {
										// 1120620 Raymond 標檢局序86 調整時戳垂直對齊為top
										//$dlg.find("#stampView div#signetDiv div").css("font-size", Math.floor(h / 10) + "pt").html(tx).show();
										$dlg.find("#stampView div#signetDiv div").css({"font-size": Math.floor(h / 10) + "pt", "vertical-align": "top"}).html(tx).show();
										// 1120620 Raymond 標檢局序86 修正職名章高度設定小於7.7mm時, 時戳字型大小計算會得出小於9的大小, 但瀏覽器最小只能顯示9pt的字, 故要再用縮小行高來調整
										if(h < 90) {	// 職名章高度小於90, 則字型會計算出小於9pt
											var lh = (pxh + 2) / 24;	// 9pt單行高度12px, 2行24px, 職章高度若小於24px, 會使計算行高小於1, 但時戳第2行下方其實還有一點空間, 故再加2px計算行高
											lh = Math.floor(lh * 100) / 100;
											$dlg.find("#stampView div#signetDiv div").css("line-height", Math.max(lh, 0.84));	// 行高小於0.84會切到第一行字的上面, 故限制最小行高不小於0.84
										}
									}
								}
								else
									$dlg.find("#stampView div#signetDiv div").hide();
									
								// 對齊模式
								//var amode = $dlg.find("#alignMode").get(0).selectedIndex;
								amode = $dlg.find("#alignMode").get(0).selectedIndex;	// 1100510 Raymond 1100293 對齊模式變數改在上面宣告(copy from CDC 1080436)
								withStamp = true;	// 1100510 Raymond 1100293 記錄有加蓋職名章(copy from CDC 1080436)
								if(amode == 0) {	// 右邊界對齊行尾
									$signetDiv.parent().css("text-align", "right");
									$signetDiv.css("margin-left", "0px").insertAfter($dlg.find("#stampView > div > div > br").eq(1));
								}
								else if(amode == 1) {	// 左邊界對齊行尾
									$signetDiv.parent().css("text-align", "left");
									if($dlg.find("#stampView img#stampImg").css("display") != "none")
										var w = $dlg.find("#stampView img#stampImg").width();
									else
										var w = $dlg.find("#stampView span#stampTx").width();
									$signetDiv.css("margin-left", w + "px").insertAfter($dlg.find("#stampView > div > div > br").eq(1));
								}
								else if(amode == 2) {	// 左邊界對齊行首
									$signetDiv.parent().css("text-align", "left");
									$signetDiv.css("margin-left", "0px").insertAfter($dlg.find("#stampView > div > div > br").eq(1));
								}
								else if(amode == 3) {	// 齊中(職名章在下)
									$signetDiv.parent().css("text-align", "center");
									$signetDiv.css("margin-left", "0px").insertAfter($dlg.find("#stampView > div > div > br").eq(1));
								}
								else if(amode == 4) {	// 齊中(職名章在上)
									$signetDiv.parent().css("text-align", "center");
									$signetDiv.css("margin-left", "0px").insertBefore($dlg.find("#stampView > div > div > br").eq(0));
								}
								
								// 1080417 Raymond 1080053 新增加蓋代字功能
								if($dlg.find("#addProxyWord").prop("checked")) {
									$dlg.find("#stampView div#proxyWord").css("display", "inline-block");
									if(amode == 4)
										$dlg.find("#stampView div#proxyWord").css("vertical-align", "top");
									else
										$dlg.find("#stampView div#proxyWord").css("vertical-align", "bottom");
								}
								else
									$dlg.find("#stampView div#proxyWord").hide();
							}
						}
						else {
							$dlg.find("#stampView div#signetDiv").hide();
							// 1080418 Raymond 1080053 新增加蓋代字功能
							$dlg.find("#stampView div#proxyWord").hide();
						}
						// 1100510 Raymond 1100293 新增代為決行章(copy from CDC 1080436)
						if($dlg.find("#grantAppr").prop("checked")) {	// 加蓋代為決行章
							var $grantApprDiv = $dlg.find("#stampView div#grantApprDiv").css({display: "inline-block", marginLeft: "0px"});
							if(withStamp) {	// 加蓋職名章時, 對齊職名章左緣
								if(amode == 0) {	// 右邊界對齊行尾
									var mr = $signetDiv.width() - $grantApprDiv.width();
									if(typeof mr == "number")
										$grantApprDiv.css("margin-right", mr + "px");
								}
								else if(amode == 1)// 左邊界對齊行尾
									$grantApprDiv.css("margin-left", $signetDiv.get(0).style.marginLeft);
								else if(amode == 3 || amode == 4)	// 齊中(職名章在下) or 齊中(職名章在上)
									$grantApprDiv.css({marginLeft: ($grantApprDiv.width() - $signetDiv.width()) + "px", marginRight: "0px"});
								// 1100511 Raymond 1100293 加蓋的代字要往上移對齊職名章
								if($dlg.find("#addProxyWord").prop("checked"))
									$dlg.find("#stampView div#proxyWord").css("margin-bottom", $grantApprDiv.height());
							}
							else {	// 不加蓋職名章時, 對齊選用章戳
								amode = $dlg.find("#alignMode").get(0).selectedIndex;
								if(amode == 0) {	// 右邊界對齊行尾
									$grantApprDiv.parent().css("text-align", "left");
								}
							}
						}
						else {
							$dlg.find("#stampView div#grantApprDiv").hide();
						}
					}
					// 新增的選項異動直接呼叫updateView
					$signet.on('change', function() {updateView();});
					$dlg.find("#withStamp").prop("checked", "checked").on('click', function() {updateView();});	// 2016.2.19 國合會要求預設勾選加蓋職名章
					$dlg.find("#dispTime").prop("checked", "checked").on('click', function() {updateView();});	// 2016.2.19 國合會要求預設勾選加蓋時戳
					// 1100520 Raymond 1050087 比照一代記憶選用章戳的職名章對齊方式選項, 改記憶在localStorage
					//$dlg.find("#alignMode")/*.prop("selectedIndex", 2)*/.on('change', function() {updateView();});// 2016.2.19 國合會要求預設職名章左邊界對齊行首(暫緩)
					var restoredAlignMode = localStorage['signet_with_stamp_align_mode'];
					if(typeof restoredAlignMode === "string" && (restoredAlignMode >= 0 && restoredAlignMode <= 4))	// 目前有0~4, 5種對齊方式
						$dlg.find("#alignMode").prop("selectedIndex", parseInt(restoredAlignMode));
					$dlg.find("#alignMode").on('change', function() {
						localStorage['signet_with_stamp_align_mode'] = this.selectedIndex;
						updateView();
					});
					// 1130820 Raymond 1130853 新增記憶加蓋代字選項功能, 代理時仍會預設勾選, 不管是否有前次取代勾選的記憶
					// 1080417 Raymond 1080053 新增若為代理公文預設勾選加蓋代字選項
					//$dlg.find("#addProxyWord").prop("checked", (theAOL.docObj.get('ODWMSG', 'IS_PROXY_DOC') == "1" && theSSO.User.EnvSettings.get('AOL_AUTOSIGN_PROXY_WORD') == 'Y')?"checked":"").on('click', function() {updateView();});
					var restoredAddProxyWord = localStorage['add_proxy_word'];
					$dlg.find("#addProxyWord").prop("checked", ((theAOL.docObj.get('ODWMSG', 'IS_PROXY_DOC') == "1" && theSSO.User.EnvSettings.get('AOL_AUTOSIGN_PROXY_WORD') == 'Y') ||
						(typeof restoredAddProxyWord === "string" && restoredAddProxyWord == "true"))?"checked":"").on('click', function() {
						localStorage['add_proxy_word'] = this.checked;
						updateView();
					});
					// 1080417 Raymond 1080053 若有需要, 改變代字樣式
					if(theUserInfo.OrgNickName == "NCHU")	// 1071219 Raymond 1071227 中興要求代字要用14pt大小
						$dlg.find("#stampView div#proxyWord").css("font-size", "14pt");
					// 1100510 Raymond 1100293 若啟用環境變數並設定好「代為決行」系統或共用章戳, 則設定至預覽中(copy from CDC 1080436)
					if(theSSO.User.EnvSettings.get("AOL_ENABLE_GRANT_APPROVE") == "Y") {
						if(!!grantApprStamp) {
							if(typeof grantApprStamp.fileInfo !== "undefined") {	// 是圖檔式章戳
								$dlg.find("#stampView span#grantApprStampTx").hide();
								$dlg.find("#stampView img#grantApprStampImg").hide()
									.on('load', function() { // 2016.5 - jQuery upgrade, .load(function() {
										$(this).fadeIn("fast");
									})
									.css({width: (grantApprStamp.size.w / 10) + "mm",
										  height: (grantApprStamp.size.h / 10) + "mm"})
									.attr('src', grantApprStamp.data);
							}
							else {	// 是文字式章戳
								$dlg.find("#stampView img#grantApprStampImg").hide();
								$dlg.find("#stampView span#grantApprStampTx").hide()
									.css({color: "rgb(" + grantApprStamp.font.color.r + "," + grantApprStamp.font.color.g + "," + grantApprStamp.font.color.b + ")",
											fontSize: grantApprStamp.font.size + "pt",
											backgroundColor: "white"})
									.html(grantApprStamp.textContent)	// 2016.11.22 fix for 折行
									.fadeIn("fast");
							}
							$dlg.find("#grantAppr").on('click', function() {updateView();});
							// 當文稿的決行層級為2(含)以下時, 預設勾選「代為決行」選項
							var d = that.$pg.data("pg").container;
							if(!!d) {
								var cdm = theAOL.getCurrFolio().getCachedDM(d);
								if(!!cdm) {
									try {
										var dLvl = cdm.attr("/*/決行層次/@決行層級");
									}
									catch(e) {}
									if(typeof dLvl === "string" && dLvl.length > 0) {
										theLogger.log("文稿之決行層級為'" + dLvl + "'");
										if(parseInt(dLvl) > 1) {
											theLogger.log("預設勾選「代為決行」選項");
											$dlg.find("#grantAppr").prop("checked", "checked");
										}
									}
								}
							}
						}
						//else	// 找不到則disable代為決行選項, 移至trigger("create")後
						//	$dlg.find("#grantAppr").closest(".ui-checkbox").addClass("ui-disabled");
					}
					else	// 未啟用時則隱藏"代為決行"選項
						$dlg.find("#grantAppr").closest("td").hide();
					
					var $set = $dlg.find("div#stampSet");

					// 2014.12.2 - Raymond, 新增若有多個職名章且環境變數有設定, 則顯示職名章在章戳選用介面中
					if (theSSO.User.EnvSettings.get('AOL_ENABLE_SIGNET_BOX').match(/[y1(true)]/gi) &&	// 當環境變數有設
						theAOL.signetBox.length > 1) {	// 且多個職名章才新增
						var $ul = $("<div data-role='collapsible'><h3>[職名章]</h3><div style='margin:-0.5em -1em -0.5em 0px;'><ul data-role='listview' data-inset='false'></ul></div></div>").appendTo($set).find("ul");	// 1060710 Raymond 修正多餘邊界問題
						
						var signetGroup = theAOL.toolStampBox.length;
						for (var i=0;i<theAOL.signetBox.length;i++) {  
							$("<li><a>" + theAOL.signetBox[i].title + "</a></li>").appendTo($ul)
								.find("a")
								.on("click", {group: signetGroup, index: i}, function(event){ 
									event.preventDefault();
									if(pickup == undefined || pickup.group != event.data.group || pickup.index != event.data.index) {
										// 2015.6.23 改成呼叫updateView函式
										updateView(event.data);
										
										// 1060710 Raymond 修正點擊選用章戳項目沒有hilight問題
										//$set.find("li").attr("data-theme", "c").removeClass("ui-btn-up-e");
										//$(this).closest("li").attr("data-theme", "e").trigger("mouseover");
										$set.find("a").removeClass("ui-btn-active");
										$(this).addClass("ui-btn-active");
									}
									return false;
								});
						}
					}
					//else	2015.6.23 FIX
					//	$dlg.find("label").hide();
					
					if(theAOL.toolStampBox.length > 0) {
						//$dlg.find("#stampUl").append("<div data-role='collapsible' data-inset='false' data-theme='b' style='margin: 0px 10px;'><h2 style='margin: 0em -10px;'>共用章戳</h2><ul id='stampLiUl1' data-role='listview' data-theme='c'></ul></div>");
						//$ul.append("<li data-role='divider' data-theme='b'><h3>共用章戳</h3></li>");
						$.each(theAOL.toolStampBox, function(i, box) {
							//1060608	Leslie[1060212]	鐵工局需求，於群組為"補陳"時，僅鐵工局一層決行長官可使用
							if(SSO_CONFIG.OrgNickName == "RRB" && box.groupName == "補陳") {
								var ownOuID = Number(theAOL.docObj.get("ODWMSG", "OWN_OU_ID").substr(0, 2));
								if(ownOuID < 95 || ownOuID > 99) {
									return;	//非一層決行的次級長官(99以下)，不可使用"補陳"選用章戳
								}
							}
							// 1130729 Raymond 領務局卡驗收需求序8 此稿件文別/令函類別有上次記憶的選取章戳時, 預設展開此章戳的章戳匣
							//var $ul = $("<div data-role='collapsible'><h3>" + ((box.userOrOrg == "user")?"[個人]":"[共用]") + box.groupName + "</h3><div style='margin:-0.5em -1em -0.5em 0px;'><ul data-role='listview' data-inset='false'></ul></div></div>").appendTo($set).find("ul");	// 2015.10.12 區分個人或共用, 1060710 Raymond 修正多餘邊界問題
							var $ul = $("<div data-role='collapsible'" + ((!!rem && rem.userOrOrg == box.userOrOrg && rem.groupName == box.groupName)?" data-collapsed='false'":"") + "><h3>" + ((box.userOrOrg == "user")?"[個人]":"[共用]") + box.groupName + "</h3><div style='margin:-0.5em -1em -0.5em 0px;'><ul data-role='listview' data-inset='false'></ul></div></div>").appendTo($set).find("ul");	// 2015.10.12 區分個人或共用, 1060710 Raymond 修正多餘邊界問題
							
							// 1110613 Joe 1110092 修正信保特殊模式公文當作函稿
							var currCate = "";
							if(theAOL.docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2") {
							//1110408	Joe	1110092	增加取得當前文別，以篩選共用章戳是否顯示
							// var currCate = theAOL.getCurrFolio().getCurrDraftModel().getDocType();
							//1110705	Joe		--		增加各機關特殊稿件處理，避免無文稿的情況下無法取得文別
							// currCate = theAOL.getCurrFolio().getCurrDraftModel().getDocType();
							if(theAOL.getCurrFolio().getCurrDraftModel() != null)
							{
								currCate = theAOL.getCurrFolio().getCurrDraftModel().getDocType();
								if(currCate == "函" || currCate == "令")
									currCate = theAOL.getCurrFolio().getCurrDraftModel().getSubDocType() || currCate;	//有函(令)類別時，則改用函(令)類別
								}
								// 1110613 Joe 1110092 修正信保特殊模式公文當作函稿
								else
									currCate = "函";
							}
							//1110705	Joe		--		增加各機關特殊稿件處理，避免無文稿的情況下無法取得文別
							else
								currCate = "函";
							
							$.each(box.stamps, function(j, stamp) {
								//1110408	Joe	1110092	增加取得當前文別，以篩選共用章戳是否顯示
								if(typeof stamp.cateList !== "undefined"){
									if(stamp.cateList != ""){	//空字串時，即為全部文別
										let cateList = stamp.cateList.split(';');
										if(cateList.indexOf(currCate) == -1)
											return;
									}
								}
								if(typeof stamp.fileInfo !== "undefined") {
									// 1130729 Raymond 領務局卡驗收需求序8 此稿件文別/令函類別有上次記憶的選取章戳時, 預設選取此章戳
									//$("<li><a>" + stamp.stampName + "</a></li>").appendTo($ul)
									$("<li><a" + ((!!rem && rem.stampName == stamp.stampName)?" class='ui-btn ui-btn-icon-right ui-icon-carat-r ui-btn-active'":"") + ">" + stamp.stampName + "</a></li>").appendTo($ul)
										.find("a")
										.on("click", {group: i, index: j}, function(event){ 
											event.preventDefault();
											if(pickup == undefined || pickup.group != event.data.group || pickup.index != event.data.index) {
												// 2015.9.14 新增檢核是否點擊"賦予決行"
												if(event.data.group < theAOL.toolStampBox.length) {
													var s = theAOL.toolStampBox[event.data.group].stamps[event.data.index];
													//if(s && s.stampName.match(/賦予決行/g))	// 2015.9.16 FIX, 章戳名稱"賦予決行"後可能多括號註記的文字
													//	$dlg.find("#alignMode").prop("selectedIndex", 4).selectmenu("refresh");	// 2016.9.23 FDA說職名章在核示語詞上面不對
												}
												// 2015.6.23 改成呼叫updateView函式
												updateView(event.data);
												
												// 1060710 Raymond 修正點擊選用章戳項目沒有hilight問題
												//$set.find("li").attr("data-theme", "c").removeClass("ui-btn-up-e");
												//$(this).closest("li").attr("data-theme", "e").trigger("mouseover");
												$set.find("a").removeClass("ui-btn-active");
												$(this).addClass("ui-btn-active");
											}
											return false;
										});
								}
								else {  // 文字式
									var sty = {
										color: "rgb(" + stamp.font.color.r + "," +
														stamp.font.color.g + "," +
														stamp.font.color.b + ")",
										fontSize: stamp.font.size + "pt",
										backgroundColor: "white"
									};
									if (stamp.font.style == "粗體")
										sty.fontWeight = "bolder";
									if (stamp.font.style == "斜體")
										sty.fontStyle = "italic";
									// 1130729 Raymond 領務局卡驗收需求序8 此稿件文別/令函類別有上次記憶的選取章戳時, 預設選取此章戳
									//$("<li><a>" + stamp.stampName + "</a></li>").appendTo($ul)
									$("<li><a" + ((!!rem && rem.stampName == stamp.stampName)?" class='ui-btn ui-btn-icon-right ui-icon-carat-r ui-btn-active'":"") + ">" + stamp.stampName + "</a></li>").appendTo($ul)
										.find("a")
										.on("click", {group: i, index: j, styles: sty}, function(event) {
											event.preventDefault();
											if(pickup == undefined || pickup.group != event.data.group || pickup.index != event.data.index) {
												// 2015.9.14 新增檢核是否點擊"賦予決行"
												if(event.data.group < theAOL.toolStampBox.length) {
													var s = theAOL.toolStampBox[event.data.group].stamps[event.data.index];
													//if(s && s.stampName.match(/賦予決行/g))
													//	$dlg.find("#alignMode").prop("selectedIndex", 4).selectmenu("refresh");	// 2016.9.23 FDA說職名章在核示語詞上面不對
												}
												// 2015.6.23 改成呼叫updateView函式
												updateView(event.data);
												
												// 1060710 Raymond 修正點擊選用章戳項目沒有hilight問題
												//$set.find("li").attr("data-theme", "c").removeClass("ui-btn-up-e");
												//$(this).closest("li").attr("data-theme", "e").trigger("mouseover");
												$set.find("a").removeClass("ui-btn-active");
												$(this).addClass("ui-btn-active");
											}
											return false;
										});
								}
							});
						});
					}
					//$dlg.find("div[data-role='content']").trigger("create");
					// 2015.11.4 子視窗出現後隱藏指令列
					that.$pg.closest(".viewPort").data("editCursor").cmdFloat.hide();
				}
			});
			$dlg.trigger("create");
			// 1100510 Raymond 1100293 若啟用環境變數但未設定「代為決行」系統或共用章戳, 則「代為決行」選項設為將反灰
			if(theSSO.User.EnvSettings.get("AOL_ENABLE_GRANT_APPROVE") == "Y" && !grantApprStamp)
				$dlg.find("#grantAppr").closest(".ui-checkbox").addClass("ui-disabled").closest("td").attr("title", "系統已啟用本功能但尚未設定\n任何「代為決行」系統或共用章戳");
			// 1130729 Raymond 領務局卡驗收需求序8 此稿件文別/令函類別有上次記憶的選取章戳時, 預設選取此章戳, 若在清單外, 調整清單捲動位置以顯示該章戳, 並觸發章戳預覽行為
			if($dlg.find("div#stampSet").find("a.ui-btn-active").length) {
				var $set = $dlg.find("div#stampSet");
				var $selItem = $set.find("a.ui-btn-active").eq(0);
				var ofs = $selItem.offset().top - $set.offset().top;
				if(ofs + $selItem.outerHeight() > $set.parent().height())
					$set.parent().prop("scrollTop", ofs + $selItem.outerHeight() - $set.parent().height());
				$selItem.trigger("click");
			}
		});
	}
	
	// 1061113 Raymond 1061068 提供僅視覺上旋轉附件頁面而不是實際改影像內容的旋轉功能
	function rotateRightTemp() {
		var $img = $pg.find("img.attachment");
		var pgo = $img.data("pgo");
		var origWid = $img.attr("data-width");
		if(!origWid) {
			origWid = $img.css("width");
			$img.attr("data-width", origWid);
		}
		var origHei = $img.attr("data-height");
		if(!origHei) {
			origHei = $img.css("height");
			$img.attr("data-height", origHei);
		}
		function adjTagPos(w, h) {
			$img.closest(".pages").css({width: "calc(" + w + " + 153px)"/*, height: "calc(" + h + "in + 20mm)"*/});	// 2016.3.15 FIX切換附件時出現捲動條問題
									
			// 1060428 Raymond 1060271 附件頁面影像載入完成比pageFlipped回呼函式執行還慢時, 要重設頁籤位置, 否則頁籤不會移動
			var prePos = $img.closest(".viewPort").find(".tags").css("left");
			$img.closest(".viewPort").find(".tags").css("left", "calc(" + w + " + 12px)");
			$img.closest(".pages").find("#pgFlippedIn").css({width: w, height: h});
			var postPos = $img.closest(".viewPort").find(".tags").css("left");
			theLogger.log("頁籤調整前位置:" + prePos + "(" + parseFloat(prePos) + "), 調整後位置:" + postPos + "(" + parseFloat(postPos) + ")");
			if(Math.abs(parseFloat(prePos) - parseFloat(postPos)) > 10) {	// 若頁籤位置在因應附件頁面寬度調整後差距超過10px, 則隱藏指令列, 以免以按頁籤方式換頁時會殘留指令列在舊的頁籤位置
				theLogger.warn("頁籤位置變動距離超過一定範圍, 隱藏指令列");
				var c = $img.closest(".viewPort").data("editCursor");
				if(!!c)
					c.cmdFloat.hide();
			}
		}
		//var pgo = $pg.find("img.attachment").data("pgo");
		var cx = $img.width();
		var cy = $img.height();
		//var cxx = $pg.width();
		if(pgo && "rotate" in pgo) {
			pgo.rotate += 90;
			if(pgo.rotate == 90) {
				$img.css({"-webkit-transform-origin": "left top",
						  "-webkit-transform": "rotate(" + pgo.rotate + "deg) translate(0px,-" + cy + "px)",
						  "-moz-transform-origin": "left top",	// 2016.2.16 新增FireFox等其它瀏覽器CSS語法
						  "-moz-transform": "rotate(" + pgo.rotate + "deg) translate(0px,-" + cy + "px)",
						  "-ms-transform-origin": "left top",
						  "-ms-transform": "rotate(" + pgo.rotate + "deg) translate(0px,-" + cy + "px)",
						  "transform-origin": "left top",
						  "transform": "rotate(" + pgo.rotate + "deg) translate(0px,-" + cy + "px)"})
				.parent().css({"width": origHei, "height": origWid});
				adjTagPos(origHei, origWid);
			}
			else if(pgo.rotate == 180) {
				$img.css({"-webkit-transform-origin": "left top",
						  "-webkit-transform": "rotate(" + pgo.rotate + "deg) translate(-" + cx + "px,-" + cy + "px)",
						  "-moz-transform-origin": "left top",	// 2016.2.16 新增FireFox等其它瀏覽器CSS語法
						  "-moz-transform": "rotate(" + pgo.rotate + "deg) translate(-" + cx + "px,-" + cy + "px)",
						  "-ms-transform-origin": "left top",
						  "-ms-transform": "rotate(" + pgo.rotate + "deg) translate(-" + cx + "px,-" + cy + "px)",
						  "transform-origin": "left top",
						  "transform": "rotate(" + pgo.rotate + "deg) translate(-" + cx + "px,-" + cy + "px)"})
				.parent().css({"width": origWid, "height": origHei});
				adjTagPos(origWid, origHei);
			}
			else if(pgo.rotate == 270) {
				$img.css({"-webkit-transform-origin": "left top",
						  "-webkit-transform": "rotate(" + pgo.rotate + "deg) translate(-" + cx + "px,0px)",
						  "-moz-transform-origin": "left top",	// 2016.2.16 新增FireFox等其它瀏覽器CSS語法
						  "-moz-transform": "rotate(" + pgo.rotate + "deg) translate(-" + cx + "px,0px)",
						  "-ms-transform-origin": "left top",
						  "-ms-transform": "rotate(" + pgo.rotate + "deg) translate(-" + cx + "px,0px)",
						  "transform-origin": "left top",
						  "transform": "rotate(" + pgo.rotate + "deg) translate(-" + cx + "px,0px)"})
				.parent().css({"width": origHei, "height": origWid});
				adjTagPos(origHei, origWid);
			}
			else {
				pgo.rotate = 0;
				$img.css({"-webkit-transform-origin": "",
						  "-webkit-transform": "",
						  "-moz-transform-origin": "",	// 2016.2.16 新增FireFox等其它瀏覽器CSS語法
						  "-moz-transform": "",
						  "-ms-transform-origin": "",
						  "-ms-transform": "",
						  "transform-origin": "",
						  "transform": ""})
				.parent().css({"width": origWid, "height": origHei});
				adjTagPos(origWid, origHei);
			}
		}
		else {
			$img.css({"-webkit-transform-origin": "left top",
					  "-webkit-transform": "rotate(90deg) translate(0px,-" + cy + "px)",
					  "-moz-transform-origin": "left top",	// 2016.2.16 新增FireFox等其它瀏覽器CSS語法
					  "-moz-transform": "rotate(90deg) translate(0px,-" + cy + "px)",
					  "-ms-transform-origin": "left top",
					  "-ms-transform": "rotate(90deg) translate(0px,-" + cy + "px)",
					  "transform-origin": "left top",
					  "transform": "rotate(90deg) translate(0px,-" + cy + "px)"})
			.parent().css({"width": origHei, "height": origWid});
			if(pgo)
				pgo.rotate = 90;
			adjTagPos(origHei, origWid);
		}
	}
	// 1060606 Raymond 1060283 修正旋轉附件頁面功能改為呼叫WS直接影像處理
	function rotateRight() {
		var pgo = $pg.find("img.attachment").data("pgo");
		if(!!pgo) {
			if("rotate" in pgo) {
				pgo.rotate += 90;
				if(pgo.rotate == 360)
					pgo.rotate = 0;
			}
			else
				pgo.rotate = 90;
			theLogger.log("旋轉" + pgo.rotate + "°");
			$pg.closest(".pages").flip("refresh");
		}
	}
	// 1061113 Raymond 1061068 提供僅視覺上旋轉附件頁面而不是實際改影像內容的旋轉功能
	function rotateLeftTemp() {
		var $img = $pg.find("img.attachment");
		var pgo = $img.data("pgo");
		var origWid = $img.attr("data-width");
		if(!origWid) {
			origWid = $img.css("width");
			$img.attr("data-width", origWid);
		}
		var origHei = $img.attr("data-height");
		if(!origHei) {
			origHei = $img.css("height");
			$img.attr("data-height", origHei);
		}
		function adjTagPos(w, h) {
			$img.closest(".pages").css({width: "calc(" + w + " + 153px)"/*, height: "calc(" + h + "in + 20mm)"*/});	// 2016.3.15 FIX切換附件時出現捲動條問題
									
			// 1060428 Raymond 1060271 附件頁面影像載入完成比pageFlipped回呼函式執行還慢時, 要重設頁籤位置, 否則頁籤不會移動
			var prePos = $img.closest(".viewPort").find(".tags").css("left");
			$img.closest(".viewPort").find(".tags").css("left", "calc(" + w + " + 12px)");
			$img.closest(".pages").find("#pgFlippedIn").css({width: w, height: h});
			var postPos = $img.closest(".viewPort").find(".tags").css("left");
			theLogger.log("頁籤調整前位置:" + prePos + "(" + parseFloat(prePos) + "), 調整後位置:" + postPos + "(" + parseFloat(postPos) + ")");
			if(Math.abs(parseFloat(prePos) - parseFloat(postPos)) > 10) {	// 若頁籤位置在因應附件頁面寬度調整後差距超過10px, 則隱藏指令列, 以免以按頁籤方式換頁時會殘留指令列在舊的頁籤位置
				theLogger.warn("頁籤位置變動距離超過一定範圍, 隱藏指令列");
				var c = $img.closest(".viewPort").data("editCursor");
				if(!!c)
					c.cmdFloat.hide();
			}
		}
		//var pgo = $pg.find("img.attachment").data("pgo");
		var cx = $img.width();
		var cy = $img.height();
		//var cxx = $pg.width();
		//var sca = cxx / cy;
		if(pgo && "rotate" in pgo) {
			pgo.rotate -= 90;
			if(pgo.rotate == 0) {
				$img.css({"-webkit-transform-origin": "",
						  "-webkit-transform": "",
						  "-moz-transform-origin": "",	// 2016.2.16 新增FireFox等其它瀏覽器CSS語法
						  "-moz-transform": "",
						  "-ms-transform-origin": "",
						  "-ms-transform": "",
						  "transform-origin": "",
						  "transform": ""})
				.parent().css({"width": origWid, "height": origHei});
				adjTagPos(origWid, origHei);
			}
			else if(pgo.rotate == 90) {
				$img.css({"-webkit-transform-origin": "left top",
						  "-webkit-transform": "rotate(" + pgo.rotate + "deg) translate(0px,-" + cy + "px)",
						  "-moz-transform-origin": "left top",	// 2016.2.16 新增FireFox等其它瀏覽器CSS語法
						  "-moz-transform": "rotate(" + pgo.rotate + "deg) translate(0px,-" + cy + "px)",
						  "-ms-transform-origin": "left top",
						  "-ms-transform": "rotate(" + pgo.rotate + "deg) translate(0px,-" + cy + "px)",
						  "transform-origin": "left top",
						  "transform": "rotate(" + pgo.rotate + "deg) translate(0px,-" + cy + "px)"})
				.parent().css({"width": origHei, "height": origWid});
				adjTagPos(origHei, origWid);
			}
			else if(pgo.rotate == 180) {
				$img.css({"-webkit-transform-origin": "left top",
						  "-webkit-transform": "rotate(" + pgo.rotate + "deg) translate(-" + cx + "px,-" + cy + "px)",
						  "-moz-transform-origin": "left top",	// 2016.2.16 新增FireFox等其它瀏覽器CSS語法
						  "-moz-transform": "rotate(" + pgo.rotate + "deg) translate(-" + cx + "px,-" + cy + "px)",
						  "-ms-transform-origin": "left top",
						  "-ms-transform": "rotate(" + pgo.rotate + "deg) translate(-" + cx + "px,-" + cy + "px)",
						  "transform-origin": "left top",
						  "transform": "rotate(" + pgo.rotate + "deg) translate(-" + cx + "px,-" + cy + "px)"})
				.parent().css({"width": origWid, "height": origHei});
				adjTagPos(origWid, origHei);
			}
			else {
				pgo.rotate = 270;
				$img.css({"-webkit-transform-origin": "left top",
						  "-webkit-transform": "rotate(" + pgo.rotate + "deg) translate(-" + cx + "px,0px)",
						  "-moz-transform-origin": "left top",	// 2016.2.16 新增FireFox等其它瀏覽器CSS語法
						  "-moz-transform": "rotate(" + pgo.rotate + "deg) translate(-" + cx + "px,0px)",
						  "-ms-transform-origin": "left top",
						  "-ms-transform": "rotate(" + pgo.rotate + "deg) translate(-" + cx + "px,0px)",
						  "transform-origin": "left top",
						  "transform": "rotate(" + pgo.rotate + "deg) translate(-" + cx + "px,0px)"})
				.parent().css({"width": origHei, "height": origWid});
				adjTagPos(origHei, origWid);
			}
		}
		else {
			$img.css({"-webkit-transform-origin": "left top",
					  "-webkit-transform": "rotate(270deg) translate(-" + cx + "px,0px)",
					  "-moz-transform-origin": "left top",	// 2016.2.16 新增FireFox等其它瀏覽器CSS語法
					  "-moz-transform": "rotate(270deg) translate(-" + cx + "px,0px)",
					  "-ms-transform-origin": "left top",
					  "-ms-transform": "rotate(270deg) translate(-" + cx + "px,0px)",
					  "transform-origin": "left top",
					  "transform": "rotate(270deg) translate(-" + cx + "px,0px)"})
			.parent().css({"width": origHei, "height": origWid});
			if(pgo)
				pgo.rotate = 270;
			adjTagPos(origHei, origWid);
		}
	}
	// 1060606 Raymond 1060283 修正旋轉附件頁面功能改為呼叫WS直接影像處理
	function rotateLeft() {
		var pgo = $pg.find("img.attachment").data("pgo");
		if(!!pgo) {
			if("rotate" in pgo) {
				pgo.rotate -= 90;
				if(pgo.rotate == -90)
					pgo.rotate = 270;
			}
			else
				pgo.rotate = 270;
			theLogger.log("旋轉" + pgo.rotate + "°");
			$pg.closest(".pages").flip("refresh");
		}
	}
	// 1060828 Raymond 1060749 判斷來文附件頁面是否允許旋轉
	function enableRcvAttPageRotate(pg) {
		/* 1061114 Raymond 1061068 改用FolioModel.enableRcvAttPageRotate
		var fromDoc = pg.container.parent;	// 來文文稿
		var n = theAOL.getCurrFolio().getDraftCounts();
		var res = true;	// 預設允許
		for(var i=0; i<n; i++) {
			var isFromDoc = theAOL.getCurrFolio().isFromDoc(i);
			if (isFromDoc == 2 ||	// 來文簽辦公文, 須進一步判斷是否為傳送失敗, 否則應禁止來文附件頁面旋轉
				isFromDoc == 0) {	// 一般文稿
				var d = theAOL.getCurrFolio().getEDraft(i);
				if(!!d) {
					if("flowId" in d) {	// 已存在封裝檔的文稿, 會有此欄位
						if(d.flowId.match(/sign_\d+/)) {
							var msgIdOfDraft = d.flowId.substr(5);
							if(msgIdOfDraft != theAOL.getCurrFolio().getMsgId()) {
								theLogger.warn("此文稿的流程點資訊(" + msgIdOfDraft + ")顯示與目前流程點(" + theAOL.getCurrFolio().getMsgId() + ")不一致, 禁止旋轉來文附件頁面");
								res = false;	// 只要有一筆文稿非此流程點新增, 即須禁止來文附件頁面旋轉功能
								//break;
							}
							else
								theLogger.log("此文稿的流程點資訊(" + msgIdOfDraft + ")顯示與目前流程點(" + theAOL.getCurrFolio().getMsgId() + ")一致, 為本流程點新增的文稿");
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
					theLogger.error("無文稿物件, 無法判斷是否為本流程點新增");
			}
		}
		return res;*/
		return theAOL.getCurrFolio().enableRcvAttPageRotate(pg);
	}
	// 1130312 Raymond 1130050 新增「貼布」功能
	function addTape(cbdata) {
		
		// 1140930 Raymond 1140818 V5再變更需求項目7, 判斷SSO_CONFIG.OrgNickName=TPVGH時, 取消提示非完稿模式的警告訊息及切回完稿模式
		// 1060518 Raymond 1060269 檢核目前追蹤修訂模式是否為完稿模式, 若不是的話, 提示訊息後, 切回完稿模式
		//if(TCControl.currMode != 1) {
		if(TCControl.currMode != 1 && SSO_CONFIG.OrgNickName != "TPVGH") {
			alert("目前追蹤修訂模式非完稿模式，為避免簽核物件在非完稿模式下可能發生位置異常問題，系統將切回完稿模式顯示。");
			$("#aol #tcControl1 select").val(1).trigger("change");
			return;	// 重新排版會使that.$pg無效, 須重新再選用一次簽核工具
		}
		var enableEraserTape = theSSO.User.EnvSettings.get("AOL_ENABLE_ERASER_TAPE"),
			clrEraserTape = theSSO.User.EnvSettings.get("AOL_ERASER_TAPE_COLOR");
		if(enableEraserTape != '1')
			throw new Error("未啟用貼布功能!(環境變數「AOL_ENABLE_ERASER_TAPE」為'" + enableEraserTape + "')");
		else {
			theLogger.log("貼布底色:環境變數「AOL_ERASER_TAPE_COLOR」為'" + clrEraserTape + "'");
			var that = this;
			var w = this.$pg.width();
			var h = this.$pg.height();
			var z = this.$pg.closest(".viewPort").data("zoomController");
			var c = this.$pg.closest(".viewPort").data("editCursor");
			var clr = "rgb(" + clrEraserTape + ")";
			// 2015.10.15 減少code
			function genSO(rect, $trgSO) {
				var now = Util.now();
				var so = {
					id: that.getNewID(),
					type: "sketch.tape",	// sketch:數位墨水, sketch.tape:貼布
					cTime: now,
					//pos: that.anchorPt,   // anchorPt是相對於viewPort的座標
					boundTo: that.$pg.data("pg"),
					sessionNew: true		// 2015.8.21 新增標記此簽核物件為本階段新增
				};
				so.info = that.makeSOInfo(so.id, so.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
				// 要減掉Pg到viewPort之間的差距, 才是真正對應Pg上的點擊座標
				//var $viewPort = that.$pg.closest(".viewPort");
				if(!!$trgSO)
					so.pos = {
						left: ($trgSO.offset().left - that.$pg.offset().left) * 100 / ((z !== undefined)?z.currScale:100) - 1,
						top: ($trgSO.offset().top - that.$pg.offset().top) * 100 / ((z !== undefined)?z.currScale:100) - 1
					}
				else
					so.pos = {
						left: rect.left,// - ((that.$pg.offset().left - $viewPort.offset().left) * 100 / ((z !== undefined)?z.currScale:100)),
						top: rect.top// - ((that.$pg.offset().top - $viewPort.offset().top) * 100 / ((z !== undefined)?z.currScale:100))
					}
				// 1090312 Raymond 1081105 新增判斷符合條件時, 自動移動職名章至目前點擊簽核區域的相對位置
				var res = getResetSignetPos(so.pos, that.$pg);
				if(!!res) {
					theLogger.warn("重設職名章位於簽核框(" + res.signArea.saType + "," + res.signArea.id + ")內的相對位置 - " + res.offsetX + "," + res.offsetY);
					so.signArea = res.signArea;
					so.saType = res.signArea.saType;
					so.saID = res.signArea.id;
					so.offset = {left: res.offsetX, top: res.offsetY};
				}
				
				//so.content = stamp.data;
				if(!!$trgSO)
					so.size = {width: (Math.max(10, $trgSO.width() + 1) * 210 / 794) + "mm", height: (Math.max(10, $trgSO.height() + 1) * 297 / 1123) + "mm"};
				else
					so.size = {width: (Math.max(10, rect.width) * 210 / 794) + "mm", height: (Math.max(10, rect.height) * 297 / 1123) + "mm"};	// 貼布最小尺寸為10X10px
				so.color = clr;
				var cmt = new EraserTape(so);
				cmt.initiateSO(that.$pg);
				
				return cmt;
			}
			if(!!cbdata && "is" in cbdata && cbdata.is(".sign-obj")) {
				var cmt = genSO(null, cbdata);
				if(cmt) {
					setTimeout(function() {
						cmt.$so.trigger("click");	// 觸發選取剛新增的簽核物件
					}, 100);
				}
			}
			else {
				var $ovr = $("<div id='drawRectOverlay' style='width:" + w + "px; height:" + h + "px; z-index:999'></div>").appendTo($pg).drawRect({
					//lineColor: "green",
					//lineWidth: 2,
					//lineShape: "dashed",
					beforeStart: function(param) {
						param.scale = z.currScale / 100;
					},
					afterStart: function(param) {
						//c.cmdFloat.blockShow(true);	// 開始畫時阻擋顯示指令列
						c.cmdFloat.hide();
					},
					afterEnd: function(param) {
						//c.cmdFloat.blockShow(false);	// 結束畫時恢復顯示指令列
						var cmt = genSO(param);
						
						$ovr.remove();
						
						if(cmt) {	// 無矩形範圍時不產簽核物件, 也就不需要點擊選取新增的簽核物件
							setTimeout(function() {
								cmt.$so.trigger("click");	// 觸發選取剛新增的簽核物件
							}, 100);
						}
					},
					/* 終止Overlay模式函式(於FolioView叫用)
					termDrawMode: function(api) {
						theLogger.log("終止Overlay模式");
						//genSO(api);
					}*/
				});
			}
			c.cmdFloat.hide();
			
			// 1101008 Raymond 修正iPadOS 14/15加蓋職名章圖檔後不會顯示的問題
			if(navigator.userAgent.match(/Mac OS/gi) && !window.realMac) {
				var $tmpDiv = $("<div></div>").appendTo(that.$pg);
				setTimeout(function() {
					$tmpDiv.remove();
				}, 0);
			}
		}
	}
	// 1141106 Raymond 1141113 新增「便利貼」簽核工具
	function addNote(cbdata) {
		var that = this;
		Util.getDlg("RD-TextComment.html").done(function($dlg) {
			
			$dlg.find("header > h1").unwrap();
			$dlg.find("footer > div").unwrap();
			
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

			// 2015.4.30 - Raymond, 修正iOS8.1軟體鍵盤浮上來時會把游標推到太上面超出畫面的問題
			$dlg.find("textarea").on("vclick", function(event) {
				setTimeout(function() {
					if(document.body.scrollTop > 190)
						document.body.scrollTop = 190;
				}, 1000);
			});
			
			$dlg.find("a#ok").on('click', function(event) {
				
				// 1120823 Raymond 1120562 新增檢核文字意見是否有輸入內容, 若無內容則顯示警告, 並中止後續新增簽核物件的處理
				if(!$dlg.find("textarea").val().length) {
					$dlg.find("textarea").tipAlert("請輸入文字");
					return;
				}
				//alert("id:" + that.attr("id") + "\nanchorPt:" + anchorPt.x + "," + anchorPt.y + "\ncurrScale:" + self.touchHandler.currScale);
				
				let $noteArea = that.$pg.find("#noteArea");
				if(!$noteArea.length) {
					$noteArea = $("<div id='noteArea'><ul/></div>").appendTo(that.$pg);
				}
				let $slot = $noteArea.find("ul");
				
				// 文字意見
				var now = Util.now();
				now = Util.padLeft(now.getYear() - 11, 3) + "/" + Util.padLeft(now.getMonth() + 1, 2) + "/" + Util.padLeft(now.getDay(), 2) + " " + Util.padLeft(now.getHours(), 2) + ":" + Util.padLeft(now.getMinutes(), 2) + ":" + Util.padLeft(now.getSeconds(), 2);
				// 1120602 Raymond 1120483 修正在第一行只有一個換行字元, 第二行才輸入其它字的文字意見, 傳送後在下一個流程點再傳送後, 第一個換行字元會消失, 導致歷史檢視中文字意見會上移的問題
				//var str = $dlg.find("textarea").val();
				var str = $dlg.find("textarea").val().replace(/^ /, "\xA0").replace(/^[\r\n\t]+|[\r\n\t]+$/, "").replace(/^ /, "\xA0");	// 改為新增文字意見時, 立即排除首末行只有一個換行字元或數個TAB字元加一個換行字元的情況, 首行第一個字若是半形空白則替換為&nbsp;(\xA0), 以保留首行縮排的需要
				var note = {
					sn: theAOL.getCurrFolio().newNoteSN(),
					msgId: theAOL.docObj.msgId,
					userId: theUserInfo.UserID,
					userName: theUserInfo.UserName,
					departID: theUserInfo.DepartID,
					departName: theUserInfo.DepartName,
					dateTime: now,
					content: str
				};
				theAOL.getCurrFolio().addNote(note);
				// 1141224 Raymond 1141652 修改便利貼項目顯示方式
				//$("<li><div>" + theUserInfo.UserName.substr(0, 5) + "</div></li>").on("dblclick", note, function(evt) {
				$("<li><div>" + theUserInfo.UserName.substr(0, 5) + "<br>" + note.content.substr(0, 5) + ((note.content.length > 5)?"<br>" + note.content.substr(5, 3) + ((note.content.length > 8)?"...":""):"") + "</div></li>").on("dblclick", note, function(evt) {
					let note = evt.data,
						thisLi = this;
					Util.getDlg("RD-TextComment.html").done(function($dlg2) {
						
						$dlg2.find("header > h1").unwrap();
						$dlg2.find("footer > div").unwrap();
						
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

						// 2015.4.30 - Raymond, 修正iOS8.1軟體鍵盤浮上來時會把游標推到太上面超出畫面的問題
						$dlg2.find("textarea").on("vclick", function(event) {
							setTimeout(function() {
								if(document.body.scrollTop > 190)
									document.body.scrollTop = 190;
							}, 1000);
						});
						
						$dlg2.find("a#ok").on('click', function(event) {
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
								var $tmpDiv = $("<div></div>").appendTo(that.$pg);
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
						
						var w = that.$pg.closest("#iso").width(),
							h = that.$pg.closest("#iso").height();
						theLogger.log("修改便利貼意見對話方塊, w:" + w + ",h:" + h);
						$.modal($dlg2, {
							appendTo:that.$pg.closest("#iso"),
							overlayCss:{height:h, width:w},
							minHeight:470,
							maxWidth:400,
							autoResize:true,
							onShow: function() {
								
								// 2015.11.4 子視窗出現後隱藏指令列
								that.$pg.closest(".viewPort").data("editCursor").cmdFloat.hide();
								
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
				}).appendTo($slot);
				
				$.modal.close();
				
				window.scrollTo(0, 0);	// 2014.8.19 - iOS7會往上飄, 要往下拉...
				
				// 1101008 Raymond 修正iPadOS 14/15加蓋文字意見後不會顯示的問題
				if(navigator.userAgent.match(/Mac OS/gi) && !window.realMac) {
					var $tmpDiv = $("<div></div>").appendTo(that.$pg);
					setTimeout(function() {
						$tmpDiv.remove();
					}, 0);
				}
			});
			$dlg.find("a#cancel").on('click', function(event) {
				$.modal.close();
				
				window.scrollTo(0, 0);	// 2014.8.19 - iOS7會往上飄, 要往下拉...
			});
			var $bar = $dlg.find(".symbolBar");
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
							var ta = $dlg.find("textarea").get(0);
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
			$dlg.find("textarea").css({fontFamily: defFont, fontSize: defSize + "pt", fontWeight: (defBold)?"bolder":"normal"})
				.attr("data-autogrow", "false");	// 2016.8.31 不要自動縮放textarea
			
			$dlg.find("form").remove();
			$dlg.find(".ui-grid-a").removeClass("ui-grid-a").addClass("ui-grid-solo");
			$dlg.find(".ui-block-a").css("width", "");
			$dlg.find("h1").text("新增便利貼意見");
			
			var w = that.$pg.closest("#iso").width(),
				h = that.$pg.closest("#iso").height();
			theLogger.log("新增便利貼意見對話方塊, w:" + w + ",h:" + h);
			$.modal($dlg, {
				appendTo:that.$pg.closest("#iso"),
				overlayCss:{height:h, width:w},
				minHeight:470,
				maxWidth:400,
				autoResize:true,
				onShow: function() {
					
					// 2015.11.4 子視窗出現後隱藏指令列
					that.$pg.closest(".viewPort").data("editCursor").cmdFloat.hide();
					
					// 2016.10.25 禁止文稿頁面捲動
					$(".contentPane").css("overflow", "hidden");
				},
				onClose: function() {
					// 2016.10.25 恢復文稿頁面捲動
					$(".contentPane").css("overflow", "");
					
					$.modal.close(); // 2016.11.8 must call this!
				}
			});
			$dlg.trigger("create");
		});
	}
	
	var that = this;
	$pg.on("click", function(event) {
		theLogger.log("$pg.on" + event.type + " - target:" + event.target.nodeName + "," + event.target.type);
		var $f = $(":focus");
		if(event.target && event.target.nodeName == "A" && $(event.target).attr("rel") == "external") {	// 2015.11.20 增加判斷點擊附件超鏈結不要攔截
			theLogger.warn("點擊附件超鏈結...");
			// 2016.6.21 隱藏指令列
			that.$pg.closest(".viewPort").data("editCursor").cmdFloat.hide();
		}
		else if(event.target && event.target.nodeName == "INPUT" && (event.target.type == "date" || event.target.type == "time" || $(event.target).hasClass("hasDatepicker"))) {	// 2016.6.21 新增點擊小日曆UI不要攔截, FF不支援type=date, 會轉成type=text, 增加判斷class
			theLogger.warn("點擊日期選項控制鈕");
			// 2016.6.21 小日曆UI出現後隱藏指令列
			that.$pg.closest(".viewPort").data("editCursor").cmdFloat.hide();
		}
		else if((event.target && "editCtlr" in event.target) ||	// 2016.8.12 新增過濾點在可編輯欄位
			$(event.target).data("editCtlr")) {
			theLogger.warn("點擊在可編輯欄位上");
			// 1061012 Raymond 測試點擊空行時focus跑哪去了的問題
			theLogger.warn(":focus = ", ($(":focus").length > 0)?$(":focus").get(0):"null");
			//return false;
		}
		else if(event.target && $(event.target).prop("contentEditable") == "true") {	// 2016.10.17 Fix for iPad, 新增過濾點在可編輯欄位
			theLogger.warn("點擊在可編輯欄位上(" + $(event.target).prop("contentEditable") + ")");
			//return false;
		}
		else {
			// 2015.10.7 FIX唯讀模式不該出現manipulation選單
			var _readOnly = readOnly || _isReadOnlyFolder();
			if(_readOnly)
				return false;
			$(this).find(".so-active").removeClass("so-active");
			window.tokenSelector.selectNan();	// 2015.10.22 新增
			var $viewPort = $(this).closest(".viewPort"),
				c = $viewPort.data("editCursor"),
				_pg = $(this).data("pg");	// 2015.6.18 新增從DraftPage物件判斷是否為來文的文稿頁面
			
			// 1131231 Raymond 1131303 偵測錯別字校正子視窗是否正顯示在頁面中, 是則隱藏(移至頁面外)
			if($viewPort.find("#errorCorrectionFloat").length > 0 &&
				parseInt($viewPort.find("#errorCorrectionFloat").css("left")) > 0 && parseInt($viewPort.find("#errorCorrectionFloat").css("top")) > 0) {
				$viewPort.find("#errorCorrectionFloat").css({"left": "", "top": ""});
				$viewPort.find(".checkedError.focused").removeClass("focused");	// 移除目前選中的錯別字標示的focused
			}
			
			if(c !== undefined) {	// 2014.8.26 - Raymond, 參照檢視窗格的viewPort不可編輯, 所以無editCursor物件
				if(c.blockCmd) {    // blockCmd once
					c.blockCmd = false;
				}
				else if(_pg) {	// 2015.6.18 對應DraftPage物件才能有簽核功能?
					var b = true;	// 非來文頁面可簽核
					if("fromType" in _pg.container) {	// 來文
						theLogger.log("點擊在來文頁面上");	// 2016.2.22 新增LOG, 區別是點在來文頁面上還是來文的附件頁面上
						b = _enableRcvDocEditing();	// 呼叫RD-AOL.js的全域函式判斷可否直接於來文頁面上簽核
					}
					else if("parent" in _pg.container && "fromType" in _pg.container.parent) {	// 2016.2.22 新增判是若是來文的附件, 也須套用是否允許來文簽註意見設定
						theLogger.log("點擊在來文的附件頁面上");
						b = _enableRcvDocEditing();	// 呼叫RD-AOL.js的全域函式判斷可否直接於來文頁面上簽核
					}
					// 1100512 Raymond 1090821 外會公文文稿不提供任何簽核工具功能
					else if("comOrgNo" in _pg.container) {
						theLogger.log("點擊在外會公文單層式文稿頁面上");
						b = false;
					}
					if(b) {
						var showCmdsInSignAreaOnly = false;	// 1060815 Raymond 1060691 新增判定是否僅於簽核區域內顯示簽核工具列
						if($viewPort.find(".pages .pg img.attachment").length) {
							// 1061113 Raymond 1061068 若來文附件頁面不允許實質旋轉但已用假旋轉過則不允許加簽核物件
							if("parent" in _pg.container && "fromType" in _pg.container.parent &&
								!enableRcvAttPageRotate(_pg) && "rotate" in _pg && !!_pg.rotate) {
								var cmds = [];
							}
							else if("fileRef" in _pg && "rotate" in _pg && !("rotated" in _pg) && !!_pg.rotate) {	// 本文附件假旋轉
								var cmds = [];
							}
							else {
								// 1141007 Raymond 1141129 新增模式'F', 只顯示鋼筆、紅筆、螢光筆、螢光筆(直線)、職名章、章戳選用
								if(SSO_CONFIG?.aolModeEx?.match(/f/i)) {
									var cmds = [
										{name: "鋼筆", func: beginSketchMode, target: that, cbdata: 3},			// 模式'F'時, "鋼筆簽核意見"更名為"鋼筆"
										{name: "紅筆", func: beginSketchMode, target: that, cbdata: 1},
										{name: "螢光筆", func: beginSketchMode, target: that, cbdata: 2},
										{name: "螢光筆(直線)", func: beginSketchMode, target: that, cbdata: 8}]
								}
								else
							// 2015.12.15 附件頁面提供"刪劃文字"、"復原刪除"、"插入文字於上"工具, 不管是否啟用舊版套件模式
							//if(SSO_CONFIG && SSO_CONFIG.aolMode)	// 2015.10.15 舊版套件模式(國合會), 取消"數位墨水", 新增"刪劃文字"、"復原刪除"、"插入文字於上"工具
								var cmds = [
									{name: "鋼筆簽核意見", func: beginSketchMode, target: that, cbdata: 3},
									{name: "紅筆", func: beginSketchMode, target: that, cbdata: 1},
									{name: "螢光筆", func: beginSketchMode, target: that, cbdata: 2},
									{name: "螢光筆(直線)", func: beginSketchMode, target: that, cbdata: 8},		// 1101217 Raymond 1101574 新增螢光筆(直線)工具
									{name: "插入文字於上", func: beginSketchMode, target: that, cbdata: 6},		// 2015.10.15 新增插入文字於上工具
									{name: "下", func: beginSketchMode, target: that, cbdata: 7},				// 1061129 Raymond 1061149 新增插入文字於下工具
									{name: "刪劃文字", func: beginSketchMode, target: that, cbdata: 4},			// 2015.10.13 新增刪劃文字工具
									{name: "復原刪除記號", func: beginSketchMode, target: that, cbdata: 5},		// 2015.10.13 新增復原刪除記號工具
									{name: "文字意見", func: addTextComment, target: that}];
								// 1130312 Raymond 1130050 新增依環境變數「AOL_ENABLE_ERASER_TAPE」設為"1"時啟用「貼布」功能
								if(theSSO.User.EnvSettings.get('AOL_ENABLE_ERASER_TAPE') == '1') {
									cmds.push({name: "貼布", func: addTape, target: that});
								}
								// 1131007 Raymond 1130988 新增環境變數「AOL_SHOW_ALL_SIGNET_IN_CMD」設為"Y"時, 顯示所有職名章, 取消原本只顯示最多2個職名章及含代字職名章的功能
								if(theSSO.User.EnvSettings.get("AOL_SHOW_ALL_SIGNET_IN_CMD") == "Y") {
									theLogger.log("環境變數「AOL_SHOW_ALL_SIGNET_IN_CMD」=Y, 顯示所有職名章");
									for(var i=0; i<theAOL.signetBox.length; i++) {
										cmds.push({name: theAOL.signetBox[i].title, func: addSignet1, target: that, cbdata: i});	// 新增addSignet1直接加蓋職名章, cbdata為index
									}
								}
								else {
								// 1060911 Raymond 1060764 判斷是否有預設的職名章
								var defIdx = [];
								for(var i=0; i<theAOL.signetBox.length; i++) {
									if("autoPress" in theAOL.signetBox[i] && theAOL.signetBox[i].autoPress == "true")
										defIdx.push(i);
								}
								if(defIdx.length > 1) {	// 有2個以上預設
									cmds.push({name: theAOL.signetBox[defIdx[0]].title, func: addSignet1, target: that, cbdata: defIdx[0]});
									cmds.push({name: theAOL.signetBox[defIdx[1]].title, func: addSignet1, target: that, cbdata: defIdx[1]});
								}
								else if(defIdx.length > 0 && defIdx[0] > 0) {	// 有1個預設職名章, 且非原始排序的第1個
									cmds.push({name: theAOL.signetBox[defIdx[0]].title, func: addSignet1, target: that, cbdata: defIdx[0]});
									cmds.push({name: theAOL.signetBox[0].title, func: addSignet1, target: that, cbdata: 0});	// 第2個職名章以原始排序第1個代入
								}
								else {	// 無預設職名章或預設職名章亦為第1個
									for(var i=0; i<Math.min(theAOL.signetBox.length, 2); i++) {	// 2016.8.12 最多顯示2個職名章在指令列
										cmds.push({name: theAOL.signetBox[i].title, func: addSignet1, target: that, cbdata: i});	// 新增addSignet1直接加蓋職名章, cbdata為index
									}
								}
								// 1121122 Raymond 1121000 新增判斷機關暱稱不是"BSMI"(標檢局), 才顯示額外的附加「(代)」字的職名章按鈕
								//if(theSSO.User.EnvSettings.get('AOL_AUTOSIGN_PROXY_WORD') != 'Y'){	//2017.3.3	Leslie	配合FDA特殊簽辦行為(決行層級)，增加依環境變數值決定是否自動加上"代"字
								if(theSSO.User.EnvSettings.get('AOL_AUTOSIGN_PROXY_WORD') != 'Y' && theUserInfo.OrgNickName != "BSMI") {
									if(theAOL.signetBox.length > 0) {	// 2016.9.23 新增職名章(代)	//2017.2.23	Leslie	代理簽辦公文時，自動加上"代"字
										cmds.push({name: theAOL.signetBox[0].title + "(代)", func: addSignetSubst, target: that});
									}
								}
								if(theAOL.signetBox.length > 2) {	// 2016.8.12 超過2個職名章時用...顯示
									cmds.push({name: "職名章...", func: addSignetEx, target: that});
								}
								}	// end of 1131007 Raymond 1130988 新增環境變數「AOL_SHOW_ALL_SIGNET_IN_CMD」設為"Y"時, 顯示所有職名章, 取消原本只顯示最多2個職名章及含代字職名章的功能
								// 1100318 Raymond 調整指令列按鈕名稱, 與章戳選用子視窗(及一代AOL)一致
								//cmds.push({name: "選用章戳", func: addStamp, target: that});
								cmds.push({name: "章戳選用", func: addStamp, target: that});
							}
								// 1060621 Raymond 1060283 新增判斷是否為當流程點所匯出的附件頁面, 是則允許旋轉頁面
								if("fileRef" in _pg && _pg.fileRef.name.match(/\d{4}\-\d+.\d{4}/)) {
									theLogger.log("附件頁面檔名符合當流程點所匯出頁面的命名規則, 允許旋轉頁面");
									cmds.push({name: "向右旋轉90度", func: rotateRight, target: that});
									cmds.push({name: "向左旋轉90度", func: rotateLeft, target: that});
								}
								// 1091014 Raymond 1090564 新增判斷信保特殊模式下本文頁面是否為當流程點所匯出的頁面, 是則允許旋轉頁面
								else if(theAOL.docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2" && "fileRef" in _pg && _pg.fileRef.name.match(/^NewDraft\-P\-/)) {
									theLogger.log("[信保特殊模式]本文頁面檔名符合當流程點所匯出頁面的命名規則, 允許旋轉頁面");
									cmds.push({name: "向右旋轉90度", func: rotateRight, target: that});
									cmds.push({name: "向左旋轉90度", func: rotateLeft, target: that});
								}
								else {
									// 1061113 Raymond 1061068 來文附件不允許旋轉時, 提供假旋轉功能
									// 1060828 Raymond 1060749 判斷來文附件頁面是否允許旋轉
									//1060824	Leslie[1060749]	修正來文附件於啟用來文擬辦時，不應被視為"非當流程點匯出的附件頁面"，仍應提供旋轉頁面功能
									//if("parent" in _pg.container && "fromType" in _pg.container.parent){
									//if("parent" in _pg.container && "fromType" in _pg.container.parent && enableRcvAttPageRotate(_pg)){
									if("parent" in _pg.container && "fromType" in _pg.container.parent) {
										if(enableRcvAttPageRotate(_pg)) {
											theLogger.log("來文附件頁面, 允許旋轉頁面");
											cmds.push({name: "向右旋轉90度", func: rotateRight, target: that});
											cmds.push({name: "向左旋轉90度", func: rotateLeft, target: that});
										}
										else if(_pg.newSignObjs.length == 0 && _pg.signObjs.length == 0) {	// 已加入簽核物件則禁止假旋轉
											theLogger.log("來文附件頁面, 不允許旋轉頁面, 僅提供假的旋轉功能");
											cmds.push({name: "向右旋轉90度", func: rotateRightTemp, target: that});
											cmds.push({name: "向左旋轉90度", func: rotateLeftTemp, target: that});
										}
										else
											theLogger.warn("來文附件頁面不允許真旋轉, 且頁面已有簽核物件, 亦禁止假旋轉");
									}
									//if("fileRef" in _pg)
									else if("fileRef" in _pg) {
										if(_pg.newSignObjs.length == 0 && _pg.signObjs.length == 0) {	// 已加入簽核物件則禁止假旋轉
											theLogger.warn("附件頁面檔名因不符當前流程點所匯出頁面的命名規則, 不允許旋轉頁面, 僅提供假的旋轉功能");
											cmds.push({name: "向右旋轉90度", func: rotateRightTemp, target: that});
											cmds.push({name: "向左旋轉90度", func: rotateLeftTemp, target: that});
										}
										else
											theLogger.warn("附件頁面檔名不符當前流程點所匯出頁面的命名規則, 不允許旋轉頁面, 且已有簽核物件在頁面上, 亦不提供假的旋轉功能");
									}
									else
										theLogger.warn("附件頁面無檔名參照, 無法判斷是否為當流程點所匯出頁面");
								}
								//cmds.push({name: "向右旋轉90度", func: rotateRight, target: that});
								//cmds.push({name: "向左旋轉90度", func: rotateLeft, target: that});
								// 1131001 Raymond 1130988 展開個人選用章戳於簽核工具列
								expandStampCmds(cmds);
								c.cmdFloat.setCmds(cmds);
							/*else
								c.cmdFloat.setCmds([
									{name: "數位墨水", func: addSketchComment, target: that},
									{name: "鋼筆簽核意見", func: beginSketchMode, target: that, cbdata: 3},
									{name: "紅筆", func: beginSketchMode, target: that, cbdata: 1},
									{name: "螢光筆", func: beginSketchMode, target: that, cbdata: 2},
									{name: "文字意見", func: addTextComment, target: that},
									{name: "職名章", func: addSignet, target: that},
									{name: "選用章戳", func: addStamp, target: that},
									{name: "向右旋轉90度", func: rotateRight, target: that},
									{name: "向左旋轉90度", func: rotateLeft, target: that}
								]);*/
						}
						else {
							// 1141001 Raymond 1140818 V5再變更需求項目8, 環境變數「AOL_SHOW_COMPACT_CMD」改成僅控制簽核區域外設定, 故設定不顯示時, 簽核區域內簽核工具列仍要顯示
							// 1140819 Raymond 1140818 新增符合可自訂簽核工具列條件時, 以自訂工具列設定呈現簽核工具列按鈕, 忽略所有其它行為
							//if(SSO_CONFIG.OrgNickName == "TPVGH" && SSO_CONFIG.aolModeEx.match(/e/i) && theSSO.User.EnvSettings.get("AOL_SHOW_COMPACT_CMD") == "Y") {
							if(SSO_CONFIG.OrgNickName == "TPVGH" && SSO_CONFIG.aolModeEx.match(/e/i)) {
								var cmds = [{name: "文字意見", func: addTextComment, target: that}];
								// 1131007 Raymond 1130988 新增環境變數「AOL_SHOW_ALL_SIGNET_IN_CMD」設為"Y"時, 顯示所有職名章, 取消原本只顯示最多2個職名章及含代字職名章的功能
								if(theSSO.User.EnvSettings.get("AOL_SHOW_ALL_SIGNET_IN_CMD") == "Y") {
									theLogger.log("環境變數「AOL_SHOW_ALL_SIGNET_IN_CMD」=Y, 顯示所有職名章");
									for(var i=0; i<theAOL.signetBox.length; i++) {
										cmds.push({name: theAOL.signetBox[i].title, className: "signetCmd", func: addSignet1, target: that, cbdata: i});	// 新增addSignet1直接加蓋職名章, cbdata為index, 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
									}
								}
								else {
									// 1060911 Raymond 1060764 判斷是否有預設的職名章
									var defIdx = [];
									for(var i=0; i<theAOL.signetBox.length; i++) {
										if("autoPress" in theAOL.signetBox[i] && theAOL.signetBox[i].autoPress == "true")
											defIdx.push(i);
									}
									if(defIdx.length > 1) {	// 有2個以上預設
										cmds.push({name: theAOL.signetBox[defIdx[0]].title, className: "signetCmd", func: addSignet1, target: that, cbdata: defIdx[0]});	// 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
										cmds.push({name: theAOL.signetBox[defIdx[1]].title, className: "signetCmd", func: addSignet1, target: that, cbdata: defIdx[1]});	// 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
									}
									else if(defIdx.length > 0 && defIdx[0] > 0) {	// 有1個預設職名章, 且非原始排序的第1個
										cmds.push({name: theAOL.signetBox[defIdx[0]].title, className: "signetCmd", func: addSignet1, target: that, cbdata: defIdx[0]});	// 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
										cmds.push({name: theAOL.signetBox[0].title, className: "signetCmd", func: addSignet1, target: that, cbdata: 0});	// 第2個職名章以原始排序第1個代入, 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
									}
									else {	// 無預設職名章或預設職名章亦為第1個
										for(var i=0; i<Math.min(theAOL.signetBox.length, 2); i++) {	// 2016.8.12 最多顯示2個職名章在指令列
											cmds.push({name: theAOL.signetBox[i].title, className: "signetCmd", func: addSignet1, target: that, cbdata: i});	// 新增addSignet1直接加蓋職名章, cbdata為index, 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
										}
									}
									// 1121122 Raymond 1121000 新增判斷機關暱稱不是"BSMI"(標檢局), 才顯示額外的附加「(代)」字的職名章按鈕
									//if(theSSO.User.EnvSettings.get('AOL_AUTOSIGN_PROXY_WORD') != 'Y'){	//2017.3.3	Leslie	配合FDA特殊簽辦行為(決行層級)，增加依環境變數值決定是否自動加上"代"字
									if(theSSO.User.EnvSettings.get('AOL_AUTOSIGN_PROXY_WORD') != 'Y' && theUserInfo.OrgNickName != "BSMI") {
										if(theAOL.signetBox.length > 0) {	// 2016.9.23 新增職名章(代)		//2017.2.23	Leslie	代理簽辦公文時，自動加上"代"字
											cmds.push({name: theAOL.signetBox[0].title + "(代)", className: "signetCmd", func: addSignetSubst, target: that});	// 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
										}
									}
									if(theAOL.signetBox.length > 2) {	// 2016.8.12 超過2個職名章時用...顯示
										cmds.push({name: "職名章...", className: "signetCmd", func: addSignetEx, target: that});	// 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
									}
								}	// end of 1131007 Raymond 1130988 新增環境變數「AOL_SHOW_ALL_SIGNET_IN_CMD」設為"Y"時, 顯示所有職名章, 取消原本只顯示最多2個職名章及含代字職名章的功能
								// 1100318 Raymond 調整指令列按鈕名稱, 與章戳選用子視窗(及一代AOL)一致
								//cmds.push({name: "選用章戳", func: addStamp, target: that});
								cmds.push({name: "章戳選用", func: addStamp, target: that});
								// 1140819 Raymond 1140818 取消北榮衝突的前單規則
								// 1131018 Raymond 北榮序313 修正當啟用展開個人選用章戳於簽核工具列功能(環境變數「AOL_SHOW_USER_STAMP_IN_CMD」設為"Y")但SSO_CONFIG.aolModeEx不為"E"時, 將「鋼筆簽核意見」、「紅筆」、「螢光筆」、「螢光筆(直線)」、「插入文字於上」、「下」、「刪劃文字」、「復原刪除記號」移至「選用章戳」右邊
								//if(SSO_CONFIG && "aolModeEx" in SSO_CONFIG && !SSO_CONFIG.aolModeEx.match(/e/i) &&
								//	theSSO.User.EnvSettings.get("AOL_SHOW_USER_STAMP_IN_CMD") == "Y") {
									cmds.push({name: "鋼筆簽核意見", func: beginSketchMode, target: that, cbdata: 3});
									cmds.push({name: "紅筆", func: beginSketchMode, target: that, cbdata: 1});
									cmds.push({name: "螢光筆", func: beginSketchMode, target: that, cbdata: 2});
									cmds.push({name: "螢光筆(直線)", func: beginSketchMode, target: that, cbdata: 8});		// 1101217 Raymond 1101574 新增螢光筆(直線)工具
									cmds.push({name: "插入文字於上", func: beginSketchMode, target: that, cbdata: 6});		// 插入文字於上工具
									cmds.push({name: "下", func: beginSketchMode, target: that, cbdata: 7});				// 1061129 Raymond 1061149 新增插入文字於下工具
									cmds.push({name: "刪劃文字", func: beginSketchMode, target: that, cbdata: 4});			// 刪劃文字工具
									cmds.push({name: "復原刪除記號", func: beginSketchMode, target: that, cbdata: 5});		// 復原刪除記號工具
								//}
								// 1130312 Raymond 1130050 新增依環境變數「AOL_ENABLE_ERASER_TAPE」設為"1"時啟用「貼布」功能, 1140819 Raymond 1140818 Ying說「貼布」順序在最後
								if(theSSO.User.EnvSettings.get('AOL_ENABLE_ERASER_TAPE') == '1') {
									cmds.push({name: "貼布", func: addTape, target: that});
								}
								// 1131001 Raymond 1130988 展開個人選用章戳於簽核工具列
								expandStampCmds(cmds);
								c.cmdFloat.setCmds(cmds);
                                // 2023.4.26 - 1120066 Eric, 新增模式'E', 在不可編輯內文模式下亦僅允許簽核區域內才能顯示簽核工具列
								// 1060815 Raymond 1060691 擴充參數指定模式D在不可編輯內文模式下仍僅允許簽核區域內才能顯示簽核工具列
								//if(SSO_CONFIG && "aolModeEx" in SSO_CONFIG &&
								//	SSO_CONFIG.aolModeEx.match(/d|e/i) && 
								//	draftEditable == false) {	// 1061204 Raymond 新增只有文稿不可編輯(會辦流程)時的模式D才要限制僅能在簽核框內叫出工具列, 來文內容或來文簽辦draftEditable都是undefined, 不符合此限制條件, 故模式C/D都可以在來文頁面上叫出工具列
									theLogger.log("SSO_CONFIG.aolModeEx = " + SSO_CONFIG.aolModeEx + ", 僅於簽核區域內顯示簽核工具列");
									showCmdsInSignAreaOnly = true;
								//}
							}
							else
							if(SSO_CONFIG && SSO_CONFIG.aolMode) {	// 2015.10.15 舊版套件模式(國合會), 取消"數位墨水", 新增"刪劃文字"、"復原刪除"、"插入文字於上"工具
								// 1131001 Raymond 1130988 展開個人選用章戳於簽核工具列
								//c.cmdFloat.setCmds([
								var cmds = [
									{name: "鋼筆簽核意見", func: beginSketchMode, target: that, cbdata: 3},
									{name: "紅筆", func: beginSketchMode, target: that, cbdata: 1},
									{name: "螢光筆", func: beginSketchMode, target: that, cbdata: 2},
									{name: "螢光筆(直線)", func: beginSketchMode, target: that, cbdata: 8},		// 1101217 Raymond 1101574 新增螢光筆(直線)工具
									{name: "插入文字於上", func: beginSketchMode, target: that, cbdata: 6},		// 2015.10.15 新增插入文字於上工具
									{name: "下", func: beginSketchMode, target: that, cbdata: 7},				// 1061129 Raymond 1061149 新增插入文字於下工具
									{name: "刪劃文字", func: beginSketchMode, target: that, cbdata: 4},			// 2015.10.13 新增刪劃文字工具
									{name: "復原刪除記號", func: beginSketchMode, target: that, cbdata: 5},		// 2015.10.13 新增復原刪除記號工具
									{name: "文字意見", func: addTextComment, target: that},
									{name: "職名章", func: addSignet, target: that},
									// 1100318 Raymond 調整指令列按鈕名稱, 與章戳選用子視窗(及一代AOL)一致
									//{name: "選用章戳", func: addStamp, target: that}
									{name: "章戳選用", func: addStamp, target: that}
								];//);
								// 1131001 Raymond 1130988 展開個人選用章戳於簽核工具列
								expandStampCmds(cmds);
								c.cmdFloat.setCmds(cmds);
							}
							else if(!draftEditable) {	// 2016.9.23 新增當內文不可編輯時, 提供插入於上等簽核工具
                                var cmds;
                                // 2023.4.26 - 1120066 Eric, 模式'E'只保留文字意見,職名章及章戳選用
                                if(SSO_CONFIG && "aolModeEx" in SSO_CONFIG &&
									SSO_CONFIG.aolModeEx.match(/e/i)) {
                                    cmds = [{name: "文字意見", func: addTextComment, target: that}];
                                }
								// 1131018 Raymond 北榮序313 修正當啟用展開個人選用章戳於簽核工具列功能(環境變數「AOL_SHOW_USER_STAMP_IN_CMD」設為"Y")但SSO_CONFIG.aolModeEx不為"E"時, 將「鋼筆簽核意見」、「紅筆」、「螢光筆」、「螢光筆(直線)」、「插入文字於上」、「下」、「刪劃文字」、「復原刪除記號」移至「選用章戳」右邊
								else if(theSSO.User.EnvSettings.get("AOL_SHOW_USER_STAMP_IN_CMD") == "Y") {
									cmds = [{name: "文字意見", func: addTextComment, target: that}];
								}
								// 1141007 Raymond 1141129 新增模式'F', 只顯示鋼筆、紅筆、螢光筆、螢光筆(直線)、職名章、章戳選用
								else if(SSO_CONFIG?.aolModeEx?.match(/f/i)) {
									cmds = [
										{name: "鋼筆", func: beginSketchMode, target: that, cbdata: 3},			// 模式'F'時, "鋼筆簽核意見"更名為"鋼筆"
										{name: "紅筆", func: beginSketchMode, target: that, cbdata: 1},
										{name: "螢光筆", func: beginSketchMode, target: that, cbdata: 2},
										{name: "螢光筆(直線)", func: beginSketchMode, target: that, cbdata: 8}]
								}
                                else {
                                    cmds = [
                                        {name: "鋼筆簽核意見", func: beginSketchMode, target: that, cbdata: 3},
                                        {name: "紅筆", func: beginSketchMode, target: that, cbdata: 1},
                                        {name: "螢光筆", func: beginSketchMode, target: that, cbdata: 2},
                                        {name: "螢光筆(直線)", func: beginSketchMode, target: that, cbdata: 8},		// 1101217 Raymond 1101574 新增螢光筆(直線)工具
                                        {name: "插入文字於上", func: beginSketchMode, target: that, cbdata: 6},		// 插入文字於上工具
                                        {name: "下", func: beginSketchMode, target: that, cbdata: 7},				// 1061129 Raymond 1061149 新增插入文字於下工具
                                        {name: "刪劃文字", func: beginSketchMode, target: that, cbdata: 4},			// 刪劃文字工具
                                        {name: "復原刪除記號", func: beginSketchMode, target: that, cbdata: 5},		// 復原刪除記號工具
                                        {name: "文字意見", func: addTextComment, target: that}];
                                }
								// 1130312 Raymond 1130050 新增依環境變數「AOL_ENABLE_ERASER_TAPE」設為"1"時啟用「貼布」功能
								if(theSSO.User.EnvSettings.get('AOL_ENABLE_ERASER_TAPE') == '1') {
									cmds.push({name: "貼布", func: addTape, target: that});
								}
								// 1131007 Raymond 1130988 新增環境變數「AOL_SHOW_ALL_SIGNET_IN_CMD」設為"Y"時, 顯示所有職名章, 取消原本只顯示最多2個職名章及含代字職名章的功能
								if(theSSO.User.EnvSettings.get("AOL_SHOW_ALL_SIGNET_IN_CMD") == "Y") {
									theLogger.log("環境變數「AOL_SHOW_ALL_SIGNET_IN_CMD」=Y, 顯示所有職名章");
									for(var i=0; i<theAOL.signetBox.length; i++) {
										cmds.push({name: theAOL.signetBox[i].title, className: "signetCmd", func: addSignet1, target: that, cbdata: i});	// 新增addSignet1直接加蓋職名章, cbdata為index, 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
									}
								}
								else {
								// 1060911 Raymond 1060764 判斷是否有預設的職名章
								var defIdx = [];
								for(var i=0; i<theAOL.signetBox.length; i++) {
									if("autoPress" in theAOL.signetBox[i] && theAOL.signetBox[i].autoPress == "true")
										defIdx.push(i);
								}
								if(defIdx.length > 1) {	// 有2個以上預設
									cmds.push({name: theAOL.signetBox[defIdx[0]].title, className: "signetCmd", func: addSignet1, target: that, cbdata: defIdx[0]});	// 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
									cmds.push({name: theAOL.signetBox[defIdx[1]].title, className: "signetCmd", func: addSignet1, target: that, cbdata: defIdx[1]});	// 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
								}
								else if(defIdx.length > 0 && defIdx[0] > 0) {	// 有1個預設職名章, 且非原始排序的第1個
									cmds.push({name: theAOL.signetBox[defIdx[0]].title, className: "signetCmd", func: addSignet1, target: that, cbdata: defIdx[0]});	// 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
									cmds.push({name: theAOL.signetBox[0].title, className: "signetCmd", func: addSignet1, target: that, cbdata: 0});	// 第2個職名章以原始排序第1個代入, 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
								}
								else {	// 無預設職名章或預設職名章亦為第1個
									for(var i=0; i<Math.min(theAOL.signetBox.length, 2); i++) {	// 2016.8.12 最多顯示2個職名章在指令列
										cmds.push({name: theAOL.signetBox[i].title, className: "signetCmd", func: addSignet1, target: that, cbdata: i});	// 新增addSignet1直接加蓋職名章, cbdata為index, 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
									}
								}
								// 1121122 Raymond 1121000 新增判斷機關暱稱不是"BSMI"(標檢局), 才顯示額外的附加「(代)」字的職名章按鈕
								//if(theSSO.User.EnvSettings.get('AOL_AUTOSIGN_PROXY_WORD') != 'Y'){	//2017.3.3	Leslie	配合FDA特殊簽辦行為(決行層級)，增加依環境變數值決定是否自動加上"代"字
								if(theSSO.User.EnvSettings.get('AOL_AUTOSIGN_PROXY_WORD') != 'Y' && theUserInfo.OrgNickName != "BSMI") {
									if(theAOL.signetBox.length > 0) {	// 2016.9.23 新增職名章(代)		//2017.2.23	Leslie	代理簽辦公文時，自動加上"代"字
										cmds.push({name: theAOL.signetBox[0].title + "(代)", className: "signetCmd", func: addSignetSubst, target: that});	// 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
									}
								}
								if(theAOL.signetBox.length > 2) {	// 2016.8.12 超過2個職名章時用...顯示
									cmds.push({name: "職名章...", className: "signetCmd", func: addSignetEx, target: that});	// 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
								}
								}	// end of 1131007 Raymond 1130988 新增環境變數「AOL_SHOW_ALL_SIGNET_IN_CMD」設為"Y"時, 顯示所有職名章, 取消原本只顯示最多2個職名章及含代字職名章的功能
								// 1100318 Raymond 調整指令列按鈕名稱, 與章戳選用子視窗(及一代AOL)一致
								//cmds.push({name: "選用章戳", func: addStamp, target: that});
								cmds.push({name: "章戳選用", func: addStamp, target: that});
								// 1131018 Raymond 北榮序313 修正當啟用展開個人選用章戳於簽核工具列功能(環境變數「AOL_SHOW_USER_STAMP_IN_CMD」設為"Y")但SSO_CONFIG.aolModeEx不為"E"時, 將「鋼筆簽核意見」、「紅筆」、「螢光筆」、「螢光筆(直線)」、「插入文字於上」、「下」、「刪劃文字」、「復原刪除記號」移至「選用章戳」右邊
								if(SSO_CONFIG && "aolModeEx" in SSO_CONFIG && !SSO_CONFIG.aolModeEx.match(/e/i) &&
									theSSO.User.EnvSettings.get("AOL_SHOW_USER_STAMP_IN_CMD") == "Y") {
									cmds.push({name: "鋼筆簽核意見", func: beginSketchMode, target: that, cbdata: 3});
									cmds.push({name: "紅筆", func: beginSketchMode, target: that, cbdata: 1});
									cmds.push({name: "螢光筆", func: beginSketchMode, target: that, cbdata: 2});
									cmds.push({name: "螢光筆(直線)", func: beginSketchMode, target: that, cbdata: 8});		// 1101217 Raymond 1101574 新增螢光筆(直線)工具
									cmds.push({name: "插入文字於上", func: beginSketchMode, target: that, cbdata: 6});		// 插入文字於上工具
									cmds.push({name: "下", func: beginSketchMode, target: that, cbdata: 7});				// 1061129 Raymond 1061149 新增插入文字於下工具
									cmds.push({name: "刪劃文字", func: beginSketchMode, target: that, cbdata: 4});			// 刪劃文字工具
									cmds.push({name: "復原刪除記號", func: beginSketchMode, target: that, cbdata: 5});		// 復原刪除記號工具
								}
								// 1141106 Raymond 1141113 新增「便利貼」簽核工具
								if(SSO_CONFIG.OrgNickName == "TAITRA") {
									cmds.push({name: "便利貼", func: addNote, target: that});		// 便利貼工具
								}
								// 1131001 Raymond 1130988 展開個人選用章戳於簽核工具列
								expandStampCmds(cmds);
								c.cmdFloat.setCmds(cmds);
                                // 2023.4.26 - 1120066 Eric, 新增模式'E', 在不可編輯內文模式下亦僅允許簽核區域內才能顯示簽核工具列
								// 1060815 Raymond 1060691 擴充參數指定模式D在不可編輯內文模式下仍僅允許簽核區域內才能顯示簽核工具列
								if(SSO_CONFIG && "aolModeEx" in SSO_CONFIG &&
									SSO_CONFIG.aolModeEx.match(/d|e|f/i) && 	// 1141007 Raymond 1141129 add'f'
									draftEditable == false) {	// 1061204 Raymond 新增只有文稿不可編輯(會辦流程)時的模式D才要限制僅能在簽核框內叫出工具列, 來文內容或來文簽辦draftEditable都是undefined, 不符合此限制條件, 故模式C/D都可以在來文頁面上叫出工具列
									theLogger.log("SSO_CONFIG.aolModeEx = " + SSO_CONFIG.aolModeEx + ", 僅於簽核區域內顯示簽核工具列");
									showCmdsInSignAreaOnly = true;
								}
							}
							else {
								// 1131018 Raymond 北榮序313 修正當啟用展開個人選用章戳於簽核工具列功能(環境變數「AOL_SHOW_USER_STAMP_IN_CMD」設為"Y")但SSO_CONFIG.aolModeEx不為"E"時, 將「鋼筆簽核意見」、「紅筆」、「螢光筆」、「螢光筆(直線)」、「插入文字於上」、「下」、「刪劃文字」、「復原刪除記號」移至「選用章戳」右邊
								var aolShowUserStampInCmd = theSSO.User.EnvSettings.get("AOL_SHOW_USER_STAMP_IN_CMD");
                                // 2023.4.26 - 1120066 Eric, 模式'E'只保留文字意見,職名章及章戳選用
                                var cmds;
                                var stamp_only_mode = false;
                                if(SSO_CONFIG && "aolModeEx" in SSO_CONFIG &&
									SSO_CONFIG.aolModeEx.match(/e/i)) {
                                    cmds = [{name: "文字意見", func: addTextComment, target: that}];
                                    stamp_only_mode = true;
                                }
								// 1131018 Raymond 北榮序313 修正當啟用展開個人選用章戳於簽核工具列功能(環境變數「AOL_SHOW_USER_STAMP_IN_CMD」設為"Y")但SSO_CONFIG.aolModeEx不為"E"時, 將「鋼筆簽核意見」、「紅筆」、「螢光筆」、「螢光筆(直線)」、「插入文字於上」、「下」、「刪劃文字」、「復原刪除記號」移至「選用章戳」右邊
								else if(aolShowUserStampInCmd == "Y") {
									cmds = [{name: "文字意見", func: addTextComment, target: that}];
								}
								// 1141007 Raymond 1141129 新增模式'F', 只顯示鋼筆、紅筆、螢光筆、螢光筆(直線)、職名章、章戳選用
								else if(SSO_CONFIG?.aolModeEx?.match(/f/i)) {
									cmds = [
										{name: "鋼筆", func: beginSketchMode, target: that, cbdata: 3},			// 模式'F'時, "鋼筆簽核意見"更名為"鋼筆"
										{name: "紅筆", func: beginSketchMode, target: that, cbdata: 1},
										{name: "螢光筆", func: beginSketchMode, target: that, cbdata: 2},
										{name: "螢光筆(直線)", func: beginSketchMode, target: that, cbdata: 8}]
									stamp_only_mode = true;	// 模式'F'時, 比照模式'E', 簽核工具列不要出現插入文字意上、下、刪劃文字、復原刪除記號
								}
                                else {
                                    cmds = [
                                        {name: "數位墨水", func: addSketchComment, target: that},
                                        {name: "鋼筆簽核意見", func: beginSketchMode, target: that, cbdata: 3},
                                        {name: "紅筆", func: beginSketchMode, target: that, cbdata: 1},
                                        {name: "螢光筆", func: beginSketchMode, target: that, cbdata: 2},
                                        {name: "螢光筆(直線)", func: beginSketchMode, target: that, cbdata: 8},		// 1101217 Raymond 1101574 新增螢光筆(直線)工具
                                        {name: "文字意見", func: addTextComment, target: that}];
                                }

								// 1060815 Raymond 1060691 修改模式A可編輯內文模式下提供"簽稿會核單/會辦單"使用插入文字於上、刪劃文字、復原刪除記號功能
								if("docType" in _pg.container &&
									(_pg.container.docType == "簽稿會核單" || _pg.container.docType == "會辦單")) {
									// 1131018 Raymond 北榮序313 修正當啟用展開個人選用章戳於簽核工具列功能(環境變數「AOL_SHOW_USER_STAMP_IN_CMD」設為"Y")但SSO_CONFIG.aolModeEx不為"E"時, 將「鋼筆簽核意見」、「紅筆」、「螢光筆」、「螢光筆(直線)」、「插入文字於上」、「下」、「刪劃文字」、「復原刪除記號」移至「選用章戳」右邊
									//if (!stamp_only_mode) { // 2023.4.26 1120066 Eric, aolModeEx='E'時, 下方工具列項目不加入
									if(!stamp_only_mode && aolShowUserStampInCmd != "Y") { // 2023.4.26 1120066 Eric, aolModeEx='E'時, 下方工具列項目不加入
                                        cmds.splice(3, 0,
                                            {name: "插入文字於上", func: beginSketchMode, target: that, cbdata: 6},		// 插入文字於上工具
                                            {name: "下", func: beginSketchMode, target: that, cbdata: 7},				// 1061129 Raymond 1061149 新增插入文字於下工具
                                            {name: "刪劃文字", func: beginSketchMode, target: that, cbdata: 4},			// 刪劃文字工具
                                            {name: "復原刪除記號", func: beginSketchMode, target: that, cbdata: 5});	// 復原刪除記號工具
                                    }
									// 1100621 Raymond 1100482 修正保留簽稿會核單的簽核物件功能啟用時, 設定僅於簽核區域內顯示簽核工具列功能對簽稿會核單無效(簽核區域內外都顯示)的問題
									if(theSSO.User.EnvSettings.get("WE_ALLOW_CON_KEEP_SIGNOBJ") == "Y" &&
										SSO_CONFIG && "aolModeEx" in SSO_CONFIG && SSO_CONFIG.aolModeEx.match(/c|d|e|f/i)) { // 2023.4.26 - 1120066 Eric, add 'e', 1141007 Raymond 1141129 add'f'
										showCmdsInSignAreaOnly = true;
									}
								}
								else if(SSO_CONFIG && "aolModeEx" in SSO_CONFIG &&	// 1060815 Raymond 1060691 擴充參數
									SSO_CONFIG.aolModeEx.match(/c|d|e|f/i)) {	// 1141007 Raymond 1141129 add'f'
									theLogger.log("SSO_CONFIG.aolModeEx = " + SSO_CONFIG.aolModeEx + ", 僅於簽核區域內顯示簽核工具列");
									// 1131018 Raymond 北榮序313 修正當啟用展開個人選用章戳於簽核工具列功能(環境變數「AOL_SHOW_USER_STAMP_IN_CMD」設為"Y")但SSO_CONFIG.aolModeEx不為"E"時, 將「鋼筆簽核意見」、「紅筆」、「螢光筆」、「螢光筆(直線)」、「插入文字於上」、「下」、「刪劃文字」、「復原刪除記號」移至「選用章戳」右邊
									//if (!stamp_only_mode) { // 2023.4.26 1120066 Eric, aolModeEx='E'時, 下方工具列項目不加入
									if(!stamp_only_mode && aolShowUserStampInCmd != "Y") { // 2023.4.26 1120066 Eric, aolModeEx='E'時, 下方工具列項目不加入
                                        cmds.splice(3, 0,
                                            {name: "插入文字於上", func: beginSketchMode, target: that, cbdata: 6},		// 插入文字於上工具
                                            {name: "下", func: beginSketchMode, target: that, cbdata: 7},				// 1061129 Raymond 1061149 新增插入文字於下工具
                                            {name: "刪劃文字", func: beginSketchMode, target: that, cbdata: 4},			// 刪劃文字工具
                                            {name: "復原刪除記號", func: beginSketchMode, target: that, cbdata: 5});	// 復原刪除記號工具
                                    }
									showCmdsInSignAreaOnly = true;
								}
								// 1130312 Raymond 1130050 新增依環境變數「AOL_ENABLE_ERASER_TAPE」設為"1"時啟用「貼布」功能
								if(theSSO.User.EnvSettings.get('AOL_ENABLE_ERASER_TAPE') == '1') {
									cmds.push({name: "貼布", func: addTape, target: that});
								}
								// 1131007 Raymond 1130988 新增環境變數「AOL_SHOW_ALL_SIGNET_IN_CMD」設為"Y"時, 顯示所有職名章, 取消原本只顯示最多2個職名章及含代字職名章的功能
								if(theSSO.User.EnvSettings.get("AOL_SHOW_ALL_SIGNET_IN_CMD") == "Y") {
									theLogger.log("環境變數「AOL_SHOW_ALL_SIGNET_IN_CMD」=Y, 顯示所有職名章");
									for(var i=0; i<theAOL.signetBox.length; i++) {
										cmds.push({name: theAOL.signetBox[i].title, className: "signetCmd", func: addSignet1, target: that, cbdata: i});	// 新增addSignet1直接加蓋職名章, cbdata為index, 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
									}
								}
								else {
								// 1060911 Raymond 1060764 判斷是否有預設的職名章
								var defIdx = [];
								for(var i=0; i<theAOL.signetBox.length; i++) {
									if("autoPress" in theAOL.signetBox[i] && theAOL.signetBox[i].autoPress == "true")
										defIdx.push(i);
								}
								if(defIdx.length > 1) {	// 有2個以上預設
									cmds.push({name: theAOL.signetBox[defIdx[0]].title, className: "signetCmd", func: addSignet1, target: that, cbdata: defIdx[0]});	// 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
									cmds.push({name: theAOL.signetBox[defIdx[1]].title, className: "signetCmd", func: addSignet1, target: that, cbdata: defIdx[1]});	// 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
								}
								else if(defIdx.length > 0 && defIdx[0] > 0) {	// 有1個預設職名章, 且非原始排序的第1個
									cmds.push({name: theAOL.signetBox[defIdx[0]].title, className: "signetCmd", func: addSignet1, target: that, cbdata: defIdx[0]});	// 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
									cmds.push({name: theAOL.signetBox[0].title, className: "signetCmd", func: addSignet1, target: that, cbdata: 0});	// 第2個職名章以原始排序第1個代入, 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
								}
								else {	// 無預設職名章或預設職名章亦為第1個
									for(var i=0; i<Math.min(theAOL.signetBox.length, 2); i++) {	// 2016.8.12 最多顯示2個職名章在指令列
										cmds.push({name: theAOL.signetBox[i].title, className: "signetCmd", func: addSignet1, target: that, cbdata: i});	// 新增addSignet1直接加蓋職名章, cbdata為index, 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
									}
								}
								// 1121122 Raymond 1121000 新增判斷機關暱稱不是"BSMI"(標檢局), 才顯示額外的附加「(代)」字的職名章按鈕
								//if(theSSO.User.EnvSettings.get('AOL_AUTOSIGN_PROXY_WORD') != 'Y'){	//2017.3.3	Leslie	配合FDA特殊簽辦行為(決行層級)，增加依環境變數值決定是否自動加上"代"字
								if(theSSO.User.EnvSettings.get('AOL_AUTOSIGN_PROXY_WORD') != 'Y' && theUserInfo.OrgNickName != "BSMI") {
									if(theAOL.signetBox.length > 0) {	// 2016.9.23 新增職名章(代)		//2017.2.23	Leslie	代理簽辦公文時，自動加上"代"字
										cmds.push({name: theAOL.signetBox[0].title + "(代)", className: "signetCmd", func: addSignetSubst, target: that});	// 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
									}
								}
								if(theAOL.signetBox.length > 2) {	// 2016.8.12 超過2個職名章時用...顯示
									cmds.push({name: "職名章...", className: "signetCmd", func: addSignetEx, target: that});	// 1140813 Raymond 1140818 新增signetCmd類別名稱, 以供識別此指令鈕為職名章
								}
								}	// end of 1131007 Raymond 1130988 新增環境變數「AOL_SHOW_ALL_SIGNET_IN_CMD」設為"Y"時, 顯示所有職名章, 取消原本只顯示最多2個職名章及含代字職名章的功能
								// 1100318 Raymond 調整指令列按鈕名稱, 與章戳選用子視窗(及一代AOL)一致
								//cmds.push({name: "選用章戳", func: addStamp, target: that});
								cmds.push({name: "章戳選用", func: addStamp, target: that});
								// 1131018 Raymond 北榮序313 修正當啟用展開個人選用章戳於簽核工具列功能(環境變數「AOL_SHOW_USER_STAMP_IN_CMD」設為"Y")但SSO_CONFIG.aolModeEx不為"E"時, 將「數位墨水」、「鋼筆簽核意見」、「紅筆」、「螢光筆」、「螢光筆(直線)」、「插入文字於上」、「下」、「刪劃文字」、「復原刪除記號」移至「選用章戳」右邊
								if(!stamp_only_mode && aolShowUserStampInCmd == "Y") {
									cmds.push({name: "數位墨水", func: addSketchComment, target: that});
									cmds.push({name: "鋼筆簽核意見", func: beginSketchMode, target: that, cbdata: 3});
									cmds.push({name: "紅筆", func: beginSketchMode, target: that, cbdata: 1});
									cmds.push({name: "插入文字於上", func: beginSketchMode, target: that, cbdata: 6});		// 插入文字於上工具
									cmds.push({name: "下", func: beginSketchMode, target: that, cbdata: 7});				// 1061129 Raymond 1061149 新增插入文字於下工具
									cmds.push({name: "刪劃文字", func: beginSketchMode, target: that, cbdata: 4});			// 刪劃文字工具
									cmds.push({name: "復原刪除記號", func: beginSketchMode, target: that, cbdata: 5});		// 復原刪除記號工具
									cmds.push({name: "螢光筆", func: beginSketchMode, target: that, cbdata: 2});
									cmds.push({name: "螢光筆(直線)", func: beginSketchMode, target: that, cbdata: 8});		// 1101217 Raymond 1101574 新增螢光筆(直線)工具
								}
								// 1141106 Raymond 1141113 新增「便利貼」簽核工具
								if(SSO_CONFIG.OrgNickName == "TAITRA") {
									cmds.push({name: "便利貼", func: addNote, target: that});		// 便利貼工具
								}
								// 1131001 Raymond 1130988 展開個人選用章戳於簽核工具列
								expandStampCmds(cmds);
								c.cmdFloat.setCmds(cmds);
							}
						}
						if("originalEvent" in event) {	// 2015.7.17 修正點擊受文者輸入方塊會出現選單的問題
							var z = $viewPort.data("zoomController");
							if(z !== undefined) {
								that.anchorPt = $viewPort.offset();
								theLogger.log("點擊座標: zoom:" + z.currScale + ", offsPg:" + that.anchorPt.left + "," + that.anchorPt.top + ", clientXY:" + event.originalEvent.clientX + "," + event.originalEvent.clientY);
								that.anchorPt.left = (event.originalEvent.clientX - that.anchorPt.left) * 100 / z.currScale;
								that.anchorPt.top = (event.originalEvent.clientY - that.anchorPt.top) * 100 / z.currScale;
								theLogger.log("        = " + that.anchorPt.left + "," + that.anchorPt.top);
							}
							else
								that.anchorPt = Util.getRelativeOffset({type: "client", x: event.originalEvent.clientX, y: event.originalEvent.clientY}, $(this).closest(".viewPort").get(0));
							// 1140813 Raymond 1140818 新增依個人設定過濾簽核工具列顯示項目
							function filterByPersonalSetting(flag) {
								let strSetting = theSSO.User.EnvSettings.get("USER_SIGN_TOOL_SETTING");
								if(strSetting == "" && (!theSSO || theSSO.offlineMode != true)) {// 離線模式不要呼叫GetUserEnvSetting
									strSetting = theWebServices.QueryDoc.GetUserEnvSetting(theSSO.Artifact, "USER_SIGN_TOOL_SETTING").RtnStr;
									theSSO.User.EnvSettings["USER_SIGN_TOOL_SETTING"] = strSetting;
								}
								let setting = (strSetting.length > 0)?JSON.parse(strSetting):{in:{1:false, 2:false, 3:false, 4:false, 5:false, 6:false, 7:false, 8:false, 9:true, 10:true, 11:true}, out:{1:false, 2:true, 3:true, 4:true, 5:true, 6:true, 7:true, 8:false, 9:true, 10:false, 11:false}};
								if(!!setting.in && !!setting.out) {
									let $cmds = $viewPort.find("#cmdFloat").eq(0).find("a.ui-btn"),
										set = (flag == "in")?setting.in:setting.out;
									for(let i=0; i<$cmds.length; i++) {
										switch($cmds.eq(i).text()) {
											case "鋼筆簽核意見":
												if(set[1] == false) {
													theLogger.log("依據個人的簽核區域(" + ((flag == "in")?"內":"外") + ")簽核工具列設定, 移除「鋼筆簽核意見」工具按鈕");
													$cmds.eq(i).remove();
												}
												break;
											case "紅筆":
												if(set[2] == false) {
													theLogger.log("依據個人的簽核區域(" + ((flag == "in")?"內":"外") + ")簽核工具列設定, 移除「紅筆」工具按鈕");
													$cmds.eq(i).remove();
												}
												break;
											case "螢光筆":
												if(set[3] == false) {
													theLogger.log("依據個人的簽核區域(" + ((flag == "in")?"內":"外") + ")簽核工具列設定, 移除「螢光筆」工具按鈕");
													$cmds.eq(i).remove();
												}
												break;
											case "螢光筆(直線)":
												if(set[4] == false) {
													theLogger.log("依據個人的簽核區域(" + ((flag == "in")?"內":"外") + ")簽核工具列設定, 移除「螢光筆(直線)」工具按鈕");
													$cmds.eq(i).remove();
												}
												break;
											case "插入文字於上":
												if(set[5] == false) {
													theLogger.log("依據個人的簽核區域(" + ((flag == "in")?"內":"外") + ")簽核工具列設定, 移除「插入文字於上」工具按鈕");
													$cmds.eq(i).remove();
												}
												break;
											case "下":
												if(set[6] == false) {
													theLogger.log("依據個人的簽核區域(" + ((flag == "in")?"內":"外") + ")簽核工具列設定, 移除「下」工具按鈕");
													$cmds.eq(i).remove();
												}
												else if(set[5] == false) {	// 個人設定勾選「插入文字意見於下」但取消勾選「插入文字意見於上」的話, 只顯示一個「下」按鈕很怪, 故增加在這個設定下時修改按鈕名稱為「插入文字意見於下」
													theLogger.log("依據個人的簽核區域(" + ((flag == "in")?"內":"外") + ")簽核工具列設定, 顯示「下」但移除「插入文字於上」工具按鈕, 將「下」更名為「插入文字於下」");
													$cmds.eq(i).text("插入文字於下");
												}
												break;
											case "刪劃文字":
												if(set[7] == false) {
													theLogger.log("依據個人的簽核區域(" + ((flag == "in")?"內":"外") + ")簽核工具列設定, 移除「刪劃文字」工具按鈕");
													$cmds.eq(i).remove();
												}
												break;
											case "復原刪除記號":
												if(set[8] == false) {
													theLogger.log("依據個人的簽核區域(" + ((flag == "in")?"內":"外") + ")簽核工具列設定, 移除「復原刪除記號」工具按鈕");
													$cmds.eq(i).remove();
												}
												break;
											case "文字意見":
												if(set[9] == false) {
													theLogger.log("依據個人的簽核區域(" + ((flag == "in")?"內":"外") + ")簽核工具列設定, 移除「文字意見」工具按鈕");
													$cmds.eq(i).remove();
												}
												break;
											case "職名章":
												if(set[10] == false) {
													theLogger.log("依據個人的簽核區域(" + ((flag == "in")?"內":"外") + ")簽核工具列設定, 移除「職名章」工具按鈕");
													$cmds.eq(i).remove();
												}
												break;
											case "章戳選用":
												if(set[11] == false) {
													theLogger.log("依據個人的簽核區域(" + ((flag == "in")?"內":"外") + ")簽核工具列設定, 移除「章戳選用」工具按鈕");
													$cmds.eq(i).remove();
												}
												break;
											case "貼布":
												if(!(set[12] == true)) {	// Ying說「貼布」北榮目前未啟用, 即使後面再啟用, 預設不勾選也不顯示
													theLogger.log("依據個人的簽核區域(" + ((flag == "in")?"內":"外") + ")簽核工具列設定, 移除「貼布」工具按鈕");
													$cmds.eq(i).remove();
												}
												break;
											default:
												if($cmds.eq(i).hasClass("signetCmd") && set[10] == false) {
													theLogger.log("依據個人的簽核區域(" + ((flag == "in")?"內":"外") + ")簽核工具列設定, 移除「" + $cmds.eq(i).text() + "」(職名章)工具按鈕");
													$cmds.eq(i).remove();
												}
												else if($cmds.eq(i).hasClass("stampCmd") && set[11] == false) {
													theLogger.log("依據個人的簽核區域(" + ((flag == "in")?"內":"外") + ")簽核工具列設定, 移除「" + $cmds.eq(i).text() + "」(個人章戳)工具按鈕");
													$cmds.eq(i).remove();
												}
										}
									}
								}
							}
							// 1060815 Raymond 1060691 新增模式C、D模式下限制僅簽核區域內才可顯示指令列
							if(showCmdsInSignAreaOnly) {
								var ap = {left: that.anchorPt.left - (that.$pg.offset().left - $viewPort.offset().left),
										top: that.anchorPt.top - (that.$pg.offset().top - $viewPort.offset().top)};
								var res = detectSOInSignArea(ap, that.$pg);
								if(!!res) {
									theLogger.warn("點擊位置位於簽核區域(saType:" + res.sa.saType + ", id:" + res.sa.id + ", dir:" + res.sa.dir + ")內, 顯示簽核工具指令列");
									// 1141001 Raymond 1140818 V5再變更需求項目8, 環境變數「AOL_SHOW_COMPACT_CMD」改成僅控制簽核區域外設定, 故設定不顯示時, 簽核區域內簽核工具列仍要顯示
									// 1140813 Raymond 1140818 新增依個人設定過濾簽核工具列顯示項目
									//if(SSO_CONFIG.OrgNickName == "TPVGH" && SSO_CONFIG.aolModeEx.match(/e/i) && theSSO.User.EnvSettings.get("AOL_SHOW_COMPACT_CMD") == "Y")
									if(SSO_CONFIG.OrgNickName == "TPVGH" && SSO_CONFIG.aolModeEx.match(/e/i))
										filterByPersonalSetting("in");
									c.cmdFloat.setPos({x: that.anchorPt.left, y: that.anchorPt.top}, true);
								}
								// 1140819 Raymond 1140818 新增符合可自訂簽核工具列條件時, 以自訂工具列設定呈現簽核工具列按鈕, 忽略所有其它行為
								else if(SSO_CONFIG.OrgNickName == "TPVGH" && SSO_CONFIG.aolModeEx.match(/e/i) && theSSO.User.EnvSettings.get("AOL_SHOW_COMPACT_CMD") == "Y") {
									filterByPersonalSetting("out");
									c.cmdFloat.setPos({x: that.anchorPt.left, y: that.anchorPt.top}, true);
								}
								// 1100621 Raymond 1100482 修正保留簽稿會核單的簽核物件功能啟用時, 設定僅於簽核區域內顯示簽核工具列功能對簽稿會核單無效(簽核區域內外都顯示)的問題
								// 1061127 Raymond 1060691 修正簽稿會核單因無簽核框導致無法顯示指令列問題
								//else if(SSO_CONFIG.aolModeEx.match(/d/i) &&
								else if(theSSO.User.EnvSettings.get("WE_ALLOW_CON_KEEP_SIGNOBJ") != "Y" && SSO_CONFIG.aolModeEx.match(/d|e/i) &&
									"docType" in _pg.container && (_pg.container.docType == "簽稿會核單" || _pg.container.docType == "會辦單")) {
									theLogger.warn("點擊位置位於簽核區域外, 因文別是'" + _pg.container.docType + "', 故顯示簽核工具指令列");
									c.cmdFloat.setPos({x: that.anchorPt.left, y: that.anchorPt.top}, true);
								}
								// 1140207 Raymond 1131187 新增判斷環境變數「AOL_SHOW_COMPACT_CMD」設為"Y"且SSO.CONFIG.aolModeEx="E"時, 點擊簽核區域外的文稿頁面空白處, 會顯示僅有「紅筆」、「螢光筆」、「螢光筆(直線)」、「插入文字於上」、「下」、「刪劃文字」、「文字意見」的精簡版簽核工具按鈕的指令列
								else if(theSSO.User.EnvSettings.get("AOL_SHOW_COMPACT_CMD") == "Y" && SSO_CONFIG.aolModeEx.match(/e/i) &&
									"docType" in _pg.container && !(_pg.container.docType == "簽稿會核單" || _pg.container.docType == "會辦單")) {
									theLogger.warn("點擊位置位於簽核區域外, 因環境變數「AOL_SHOW_COMPACT_CMD」為'Y'且SSO_CONFIG.aolModeEx為'E', 文別是'" + _pg.container.docType + "', 故顯示簽核工具指令列");
									c.cmdFloat.setCmds([{name: "紅筆", func: beginSketchMode, target: that, cbdata: 1},
														{name: "螢光筆", func: beginSketchMode, target: that, cbdata: 2},
														{name: "螢光筆(直線)", func: beginSketchMode, target: that, cbdata: 8},		// 1101217 Raymond 1101574 新增螢光筆(直線)工具
														{name: "插入文字於上", func: beginSketchMode, target: that, cbdata: 6},		// 插入文字於上工具
														{name: "下", func: beginSketchMode, target: that, cbdata: 7},				// 1061129 Raymond 1061149 新增插入文字於下工具
														{name: "刪劃文字", func: beginSketchMode, target: that, cbdata: 4},			// 刪劃文字工具
														{name: "文字意見", func: addTextComment, target: that}]);
									c.cmdFloat.setPos({x: that.anchorPt.left, y: that.anchorPt.top}, true);
								}
							}
							else
								c.cmdFloat.setPos({x: that.anchorPt.left, y: that.anchorPt.top}, true);
							// 1060512 Raymond 1050943 鐵改局蓋章要自動對齊
							if(SSO_CONFIG && "alignSignObj" in SSO_CONFIG && SSO_CONFIG.alignSignObj) {
								var ap = {left: that.anchorPt.left - (that.$pg.offset().left - $viewPort.offset().left),
										top: that.anchorPt.top - (that.$pg.offset().top - $viewPort.offset().top)};
								var res = detectSOInSignArea(ap, that.$pg);
								// 1070327 Raymond 1070136 修正支援不設定dir屬性的簽核區域即不自動對齊
								//if(!!res) {
								if(!!res && !!res.sa.dir) {
									theLogger.warn("點擊位置位於簽核區域(saType:" + res.sa.saType + ", id:" + res.sa.id + ", dir:" + res.sa.dir + ")內");
									theLogger.warn(res);
									theLogger.warn("計算簽核區域內簽核物件位置");
									var $sos = res.sa.$area.find(".sign-obj");
									// 1080125 Raymond 1071281 新增預設離簽核框距離變數
									//var availPos = {left: 2, top: 2};
									var defPos = 5;
									var availPos = {left: defPos, top: defPos};
									var saOff = res.sa.$area.offset();
									var saExt = {width: res.sa.$area.width(), height: res.sa.$area.height()};
									var mostBottom = 2, mostRight = 2;
									for(var i=0; i<$sos.length; i++) {
										var $so = $sos.eq(i);
										// 1071224 Raymond 修正職名章自動對齊位置隨顯示比例變化上下間距的問題
										//theLogger.warn("(" + $so.offset().left + ", " + $so.offset().top + ", " + $so.width() + ", " + $so.height() + ")");
										//var mb = ($so.offset().top - saOff.top + $so.height() + 2);
										//var mr = ($so.offset().left - saOff.left + $so.width() + 2);
										theLogger.warn("(" + $so.offset().left + ", " + $so.offset().top + ", " + $so.width() + ", " + $so.height() + ") zoomScale:" + z.currScale);
										var mb = ((($so.offset().top - saOff.top) * 100 / z.currScale) + $so.height() + 2);
										var mr = ((($so.offset().left - saOff.left) * 100 / z.currScale) + $so.width() + 2);
										mostBottom = Math.max(mb, mostBottom);
										mostRight = Math.max(mr, mostRight);
										if(res.sa.dir == 0) {	// 由上至下
											// 1130424 Raymond 1120881 修正判斷文稿支援簽核區域自動增高時, 職名章由上至下的自動對齊功能不要換行
											var cdm = theAOL.getCurrFolio().getCachedDM(_pg.container);
											if(!!cdm && cdm.getEditable() && cdm.supportSALP()) {	// 可編輯狀態下才可自動增高
												availPos.top = Math.max(mb, availPos.top);
											}
											else
											if(mb + 20 > saExt.height) {	// 壓線換行
												theLogger.warn("壓線換行");
												availPos.left = mostRight;
												// 1080125 Raymond 1071281 改用預設離簽核框距離變數
												//availPos.top = 2;
												availPos.top = defPos;
											}
											else
												availPos.top = Math.max(mb, availPos.top);
										}
										else {	// 由左至右
											if(mr + 70 > saExt.width) {	// 壓線換行
												theLogger.warn("壓線換行");
												availPos.top = mostBottom;
												// 1080125 Raymond 1071281 改用預設離簽核框距離變數
												//availPos.left = 2;
												availPos.left = defPos;
											}
											else
												availPos.left = Math.max(mr, availPos.left);
										}
										theLogger.warn("availPos left:" + availPos.left + ", top:" + availPos.top);
									}
									// 1110503 Raymond 修正在顯示比例1X0%時開啟公文, 蓋章在簽核框時自動對齊功能會把章移到徧右下的問題
									//that.anchorPt.left = availPos.left + res.sa.left + ((that.$pg.offset().left - $viewPort.offset().left) * 100 / z.currScale);
									//that.anchorPt.top = availPos.top + res.sa.top + ((that.$pg.offset().top - $viewPort.offset().top) * 100 / z.currScale);
									that.anchorPt.left = availPos.left + ((saOff.left - $viewPort.offset().left) * 100 / z.currScale);
									that.anchorPt.top = availPos.top + ((saOff.top - $viewPort.offset().top) * 100 / z.currScale);
									theLogger.warn("設定anchorPt left:" + that.anchorPt.left + ", top:" + that.anchorPt.top);
								}
							}
						}
					}
					else{	// 2016.4.12 added
						// 1061113 Raymond 1061068 來文附件不允許旋轉時, 提供假旋轉功能
						// 1060828 Raymond 1060749 判斷來文附件頁面是否允許旋轉
						//1060503	Leslie[1060225]	修正來文附件頁面，未啟用來文擬辦時，應仍提供影像轉向選單						
						//if("parent" in _pg.container && "fromType" in _pg.container.parent) {
						//if("parent" in _pg.container && "fromType" in _pg.container.parent && enableRcvAttPageRotate(_pg)) {
						if("parent" in _pg.container && "fromType" in _pg.container.parent) {
							if(enableRcvAttPageRotate(_pg)) {
								c.cmdFloat.setCmds([
									{name: "向右旋轉90度", func: rotateRight, target: that},
									{name: "向左旋轉90度", func: rotateLeft, target: that}
								]);
							}
							else {
								c.cmdFloat.setCmds([
									{name: "向右旋轉90度", func: rotateRightTemp, target: that},
									{name: "向左旋轉90度", func: rotateLeftTemp, target: that}
								]);
							}
							if("originalEvent" in event) {	// 2015.7.17 修正點擊受文者輸入方塊會出現選單的問題
								var z = $viewPort.data("zoomController");
								if(z !== undefined) {
									that.anchorPt = $viewPort.offset();
									theLogger.log("點擊座標: zoom:" + z.currScale + ", offsPg:" + that.anchorPt.left + "," + that.anchorPt.top + ", clientXY:" + event.originalEvent.clientX + "," + event.originalEvent.clientY);
									that.anchorPt.left = (event.originalEvent.clientX - that.anchorPt.left) * 100 / z.currScale;
									that.anchorPt.top = (event.originalEvent.clientY - that.anchorPt.top) * 100 / z.currScale;
									theLogger.log("        = " + that.anchorPt.left + "," + that.anchorPt.top);
								}
								else
									that.anchorPt = Util.getRelativeOffset({type: "client", x: event.originalEvent.clientX, y: event.originalEvent.clientY}, $(this).closest(".viewPort").get(0));
								c.cmdFloat.setPos({x: that.anchorPt.left, y: that.anchorPt.top}, true);
							}
						}
						else
							c.cmdFloat.hide();
						//1060503	Leslie[1060225]	修正來文附件頁面，未啟用來文擬辦時，應仍提供影像轉向選單	--END--
					}
					return false;
				}
			}
		}
	});
	// 1130314 Raymond 1130050 新增提供給點擊其它流程點的簽核物件的「貼布」指令列功能
	nsEditor.initCmds = function(cmds, cbdata) {
		if(theSSO.User.EnvSettings.get('AOL_ENABLE_ERASER_TAPE') == '1') {
			cmds.push({name: "貼布", func: addTape, target: that, cbdata: cbdata});
		}
	}
	// 1131001 Raymond 1130988 展開個人選用章戳於簽核工具列
	function expandStampCmds(cmds) {
		// copy from line 9263
		if(theAOL.toolStampBox.length > 0 && theSSO.User.EnvSettings.get("AOL_SHOW_USER_STAMP_IN_CMD") == "Y") {
			var cnt = 0;
			$.each(theAOL.toolStampBox, function(i, box) {
				//1060608	Leslie[1060212]	鐵工局需求，於群組為"補陳"時，僅鐵工局一層決行長官可使用
				if(SSO_CONFIG.OrgNickName == "RRB" && box.groupName == "補陳") {
					var ownOuID = Number(theAOL.docObj.get("ODWMSG", "OWN_OU_ID").substr(0, 2));
					if(ownOuID < 95 || ownOuID > 99) {
						return;	//非一層決行的次級長官(99以下)，不可使用"補陳"選用章戳
					}
				}
				if(box.userOrOrg == "user") {
					var currCate = "";
					if(theAOL.docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2") {
						//1110408	Joe	1110092	增加取得當前文別，以篩選共用章戳是否顯示
						if(theAOL.getCurrFolio().getCurrDraftModel() != null) {
							currCate = theAOL.getCurrFolio().getCurrDraftModel().getDocType();
							if(currCate == "函" || currCate == "令")
								currCate = theAOL.getCurrFolio().getCurrDraftModel().getSubDocType() || currCate;	//有函(令)類別時，則改用函(令)類別
						}
						// 1110613 Joe 1110092 修正信保特殊模式公文當作函稿
						else
							currCate = "函";
					}
					//1110705	Joe		--		增加各機關特殊稿件處理，避免無文稿的情況下無法取得文別
					else
						currCate = "函";
					$.each(box.stamps, function(j, stamp) {
						//1110408	Joe	1110092	增加取得當前文別，以篩選共用章戳是否顯示
						if(typeof stamp.cateList !== "undefined"){
							if(stamp.cateList != ""){	//空字串時，即為全部文別
								let cateList = stamp.cateList.split(';');
								if(cateList.indexOf(currCate) == -1)
									return;
							}
						}
						if((cnt++ % 5) == 0)	// 5個按鈕一行
							cmds.push("wrap");
						cmds.push({name: stamp.stampName.substr(0, 5), className: "stampCmd", func: addStampFromCmd, target:that, cbData: {group: i, index: j}});	// 按鈕名稱最多5個字, 按鈕類別固定為stampCmd
					});
				}
			});
		}
		function addStampFromCmd(evt) {
			console.log("addStampFromCmd - ", evt.data.cbData, theAOL.toolStampBox[evt.data.cbData.group].stamps[evt.data.cbData.index]);
			var now = Util.now(),
				stamp = theAOL.toolStampBox[evt.data.cbData.group].stamps[evt.data.cbData.index],
				withStamp = true,			// 國合會要求預設勾選加蓋職名章
				dispTime = true,			// 國合會要求預設勾選加蓋時戳
				signetIndex = -1,			// 職名章index
				// 1131018 Raymond 北榮序313 修正未在選用章戳子視窗中調整過對齊方式, 直接點指令列的個人選用章戳時, 不會帶出職名章及時戳的問題
				//alignMode = -1,				// 職名章對齊方式
				alignMode = 0,				// 職名章對齊方式
				addProxyWord = false,		// 加蓋代字
				grantAppr = false,			// 加蓋代為決行
				grantApprStamp = undefined;	// 代為決行章戳
			
			// 預設職名章index
			for(var i=0; i<theAOL.signetBox.length; i++) {
				if("autoPress" in theAOL.signetBox[i] && theAOL.signetBox[i].autoPress == "true") {
					signetIndex = i;
					break;
				}
			}
			if(signetIndex < 0 && theAOL.signetBox.length > 0)
				signetIndex = 0;	// 職名章未設定預設則加蓋第1個職名章
			// 職名章對齊方式讀回前次記憶
			var restoredAlignMode = localStorage['signet_with_stamp_align_mode'];
			if(typeof restoredAlignMode === "string" && (restoredAlignMode >= 0 && restoredAlignMode <= 4))	// 目前有0~4, 5種對齊方式
				alignMode = parseInt(restoredAlignMode);
			// 加蓋代字讀回前次記憶, 代理時仍會預設加蓋, 不管是否有前次取代勾選的記憶
			var restoredAddProxyWord = localStorage['add_proxy_word'];
			addProxyWord = ((theAOL.docObj.get('ODWMSG', 'IS_PROXY_DOC') == "1" && theSSO.User.EnvSettings.get('AOL_AUTOSIGN_PROXY_WORD') == 'Y') ||
				(typeof restoredAddProxyWord === "string" && restoredAddProxyWord == "true"));
			// 啟用環境變數加蓋「代為決行」系統或共用章戳
			if(theSSO.User.EnvSettings.get("AOL_ENABLE_GRANT_APPROVE") == "Y") {
				// 當文稿的決行層級為2(含)以下時, 預設勾選「代為決行」選項
				var d = that.$pg.data("pg").container;
				if(!!d) {
					var cdm = theAOL.getCurrFolio().getCachedDM(d);
					if(!!cdm) {
						try {
							var dLvl = cdm.attr("/*/決行層次/@決行層級");
						}
						catch(e) {}
						if(typeof dLvl === "string" && dLvl.length > 0) {
							theLogger.log("文稿之決行層級為'" + dLvl + "'");
							if(parseInt(dLvl) > 1) {
								theLogger.log("預設勾選「代為決行」選項");
								grantAppr = true;
								for(var i=0; i<theAOL.systemStampBox.length; i++) {	// 先搜尋systemStampBox
									if(theAOL.systemStampBox[i].stampId == "grantApprStamp") {
										grantApprStamp = theAOL.systemStampBox[i];
										theLogger.log("找到代為決行系統章戳'" + grantApprStamp.stampName + "'");
										break;
									}
								}
								if(!grantApprStamp) {
									for(var i=0; i<theAOL.toolStampBox.length; i++) {	// 再搜尋toolStampBox
										if(theAOL.toolStampBox[i].userOrOrg == "org") {	// 只找「共用」
											for(var j=0; j<theAOL.toolStampBox[i].stamps.length; j++) {
												if(theAOL.toolStampBox[i].stamps[j].stampName == "代為決行") {
													grantApprStamp = theAOL.toolStampBox[i].stamps[j];
													theLogger.log("找到代為決行選用章戳[共用]" + theAOL.toolStampBox[i].groupName + "#" + grantApprStamp.stampId);
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
			}
			
			// 加蓋選用章戳, copy from line 5471
			function doAddStamp() {
				var so = {
					id: that.getNewID(),
					type: "stamp",			// stamp:選用章戳(圖檔), stamp.text:選用章戳(文字)
					orient: "橫書",
					cTime: now,
					//pos: that.anchorPt,   // anchorPt是相對於viewPort的座標
					boundTo: that.$pg.data("pg"),
					sessionNew: true,		// 2015.8.21 新增標記此簽核物件為本階段新增
					actionName: stamp.actionName	// 2016.6.1 新增章戳連動名稱(1050095)
				};
				so.info = that.makeSOInfo(so.id, so.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
				// 要減掉Pg到viewPort之間的差距, 才是真正對應Pg上的點擊座標
				var $viewPort = that.$pg.closest(".viewPort"),
					z = $viewPort.data("zoomController");   // 如果有縮放控制的話要套用
				so.pos = {
					left: that.anchorPt.left - ((that.$pg.offset().left - $viewPort.offset().left) * 100 / ((z !== undefined)?z.currScale:100)),
					top: that.anchorPt.top - ((that.$pg.offset().top - $viewPort.offset().top) * 100 / ((z !== undefined)?z.currScale:100))
				}
			
				// 預估選用章戳及職名章的寬高
				var stampExt, divExt;
				if(typeof stamp.fileInfo !== "undefined") { // 影像檔章戳
					var $test = $("<img></img>").css({width: (stamp.size.w / 10) + "mm", height: (stamp.size.h / 10) + "mm"}).appendTo("#aol");
					stampExt = {w: $test.width(), h: $test.height()};
					$test.remove();
				}
				else {
					var $test = $("<span>" + stamp.textContent + "</span>").css({fontFamily: stamp.font.name, fontSize: stamp.font.size + "pt", fontWeight: (stamp.font.style.search("粗") >= 0)?"bolder":"", fontStyle: (stamp.font.style.search("斜") >= 0)?"italic":""}).appendTo("#aol");
					stampExt = {w: $test.width(), h: $test.height()};
					$test.remove();
				}
				if(signetIndex >= 0) {
					var box = theAOL.signetBox[signetIndex];
					var $test = $("<div style='display: inline-block;'><img></img><div style='display: inline-block; overflow: hidden; text-align: center; color: black; background-color: white; font-size: 8pt; vertical-align: top; line-height: 1.24;'>0000<br/>0000</div><div>").appendTo("#aol");
					$test.find("img").css({width: (box.size.w / 10) + "mm", height: (box.size.h / 10) + "mm"});
					divExt = {w: $test.width(), h: $test.height()};
					$test.remove();
				}
				// 1090312 Raymond 1081105 新增判斷符合條件時, 自動移動職名章至目前點擊簽核區域的相對位置
				var res = getResetSignetPos(so.pos, that.$pg);
				if(!!res) {
					theLogger.warn("重設職名章位於簽核框(" + res.signArea.saType + "," + res.signArea.id + ")內的相對位置 - " + res.offsetX + "," + res.offsetY);
					so.signArea = res.signArea;
					so.saType = res.signArea.saType;
					so.saID = res.signArea.id;
					so.offset = {left: res.offsetX, top: res.offsetY};
					if(withStamp &&	// 一併加蓋職名章時, 計算職名章對齊方式後的位移位置
						signetIndex >= 0) {
						var amode = alignMode;
						if(amode == 0) {	// 右邊界對齊行尾
							so.offset.left = res.offsetX + Math.max(divExt.w - stampExt.w, 0);
						}
						else if(amode == 1) {	// 左邊界對齊行尾
						}
						else if(amode == 2) {	// 左邊界對齊行首
						}
						else if(amode == 3) {	// 齊中(職名章在下)
							so.offset.left = res.offsetX + Math.max((divExt.w - stampExt.w) / 2, 0);
						}
						else if(amode == 4) {	// 齊中(職名章在上)
							so.offset.left = res.offsetX + Math.max((divExt.w - stampExt.w) / 2, 0);
							so.offset.top = res.offsetY + divExt.h;
						}
					}
				}
				
				if(typeof stamp.fileInfo !== "undefined") { // 影像檔章戳
					so.content = stamp.data;
					so.size = {width: (stamp.size.w / 10) + "mm", height: (stamp.size.h / 10) + "mm"};
					//so.color = {r: stamp.color.r, g: stamp.color.g, b: stamp.color.b};	//2017.2.21	Leslie	修改圖檔類型的選用章戳，改為"圖檔"類型的簽核物件
					so.type = "sketch";
					so.transparency = "0";	//透明度設為0
					so.asIcon = false;
					so.maskBkgnd = 'Y';
					so.stampName = stamp.stampName;	// 1130705 Raymond 中榮序139 新增影像章戳的名稱, 以供刪除文字意見時重置簽辦意見時使用
					var cmt = new SketchComment(so);	//2017.2.21	Leslie	改用數位墨水的物件(圖檔)來建立
					cmt.initiateSO(that.$pg);
					
					// 1140922 Raymond 1140887 新增判斷機關暱稱是TPVGH(北榮)時, 改叫用setMergedTextCommentToSignComment()
					if(SSO_CONFIG.OrgNickName == "TPVGH") {
						setMergedTextCommentToSignComment();
					}
					else {
					// 1120406 Raymond 銓敘部序198 加蓋選用章戳時自動將影像檔式選用章戳的章戳名稱帶入簽辦意見
					if(theSSO.User.EnvSettings.get("AOL_ENABLE_STAMP_TO_SIGNCOMMENT") == "Y") {
						var csc = theAOL.currSignComment();
						if(typeof csc == "string" && csc.length > 0) {
							if(confirm("目前簽辦意見已有內容，是否以章戳名稱取代？\r\n\r\n點擊「確定」取代目前簽辦意見內容\r\n點擊「取消」則累加在目前簽辦意見內容後"))
								theAOL.currSignComment(stamp.stampName);
							else
								theAOL.currSignComment(csc + stamp.stampName);
						}
						else
							theAOL.currSignComment(stamp.stampName);
					}
					}
				}
				else {  // 文字章戳
					so.type = "stamp.text";	// 變更為stamp.text表示文字式選用章戳
					so.content = stamp.textContent;
					so.fontName = stamp.font.name;
					so.fontSize = stamp.font.size + "pt";
					so.color = {r: stamp.font.color.r, g: stamp.font.color.g, b: stamp.font.color.b};
					if(stamp.font.style.search("粗") >= 0)
						so.fontWeight = true;
					if(stamp.font.style.search("斜") >= 0)
						so.fontStyle = true;
					var cmt = new Stamp(so);	//2017.2.21	Leslie	僅文字章戳用Stamp物件
					cmt.initiateSO(that.$pg);
					
					// 1140922 Raymond 1140887 新增判斷機關暱稱是TPVGH(北榮)時, 改叫用setMergedTextCommentToSignComment()
					if(SSO_CONFIG.OrgNickName == "TPVGH") {
						setMergedTextCommentToSignComment();
					}
					else {
					// 1120406 Raymond 銓敘部序198 加蓋選用章戳時自動將文字式選用章戳的文字內容帶入簽辦意見
					if(theSSO.User.EnvSettings.get("AOL_ENABLE_STAMP_TO_SIGNCOMMENT") == "Y") {
						var csc = theAOL.currSignComment();
						if(typeof csc == "string" && csc.length > 0) {
							if(confirm("目前簽辦意見已有內容，是否以章戳內容取代？\r\n\r\n點擊「確定」取代目前簽辦意見內容\r\n點擊「取消」則累加在目前簽辦意見內容後"))
								theAOL.currSignComment(stamp.textContent);
							else
								theAOL.currSignComment(csc + stamp.textContent);
						}
						else
							theAOL.currSignComment(stamp.textContent);
					}
					}
				}
				
				// 2015.6.24 新增加蓋職名章、時戳功能
				if(withStamp) {	// 加蓋職名章
					if(signetIndex >= 0) {
						var box = theAOL.signetBox[signetIndex];
						theLogger.log("加蓋職名章'" + box.title + "'...");
						var so2 = {
							id: that.getNewID(),
							type: "stamp.signet",
							orient: "橫書",
							cTime: now,
							boundTo: that.$pg.data("pg"),
							sessionNew: true		// 2015.8.21 新增標記此簽核物件為本階段新增
						};
						so2.info = that.makeSOInfo(so2.id, so2.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
						if(dispTime)
							so2.dispTime = true;
						
						if(typeof box.fileInfo !== "undefined") { // 影像檔章戳
							so2.content = box.data;
							so2.size = {width: (box.size.w / 10) + "mm", height: (box.size.h / 10) + "mm"};
							so2.color = {r: box.color.r, g: box.color.g, b: box.color.b};
						}
						else {  // 文字章戳
							throw new Error("職名章有文字式的嗎?");
						}
						
						/* 2016.3.4 FIX, confirm時因為modal視窗隱藏, 此時再抓#stampView img及div的寬高都會是0
						if($dlg.find("#stampView img#stampImg").css("display") != "none")
							var stampExt = {
								w: $dlg.find("#stampView img#stampImg").width(),
								h: $dlg.find("#stampView img#stampImg").height()};
						else
							var stampExt = {
								w: $dlg.find("#stampView span#stampTx").width(),
								h: $dlg.find("#stampView span#stampTx").height()};*/
						// 對齊模式
						var amode = alignMode;
						if(amode == 0) {	// 右邊界對齊行尾
							so2.pos = {
								left: so.pos.left + stampExt.w - divExt.w,//$dlg.find("#stampView div#signetDiv").width(),	2016.3.4 FIX
								top: so.pos.top + stampExt.h};
						}
						else if(amode == 1) {	// 左邊界對齊行尾
							so2.pos = {
								left: so.pos.left + stampExt.w,
								top: so.pos.top + stampExt.h};
						}
						else if(amode == 2) {	// 左邊界對齊行首
							so2.pos = {
								left: so.pos.left,
								top: so.pos.top + stampExt.h};
						}
						else if(amode == 3) {	// 齊中(職名章在下)
							so2.pos = {
								left: so.pos.left + ((stampExt.w - divExt.w/*$dlg.find("#stampView div#signetDiv").width()*/) / 2),	// 2016.3.4 FIX
								top: so.pos.top + stampExt.h};
						}
						else if(amode == 4) {	// 齊中(職名章在上)
							so2.pos = {
								left: so.pos.left + ((stampExt.w - divExt.w/*$dlg.find("#stampView div#signetDiv").width()*/) / 2),	// 2016.3.4 FIX
								top: so.pos.top - divExt.h/*$dlg.find("#stampView div#signetDiv").height()*/};						// 2016.3.4 FIX
						}
						// 1080104 Raymond 隨選用章戳加蓋的職名章, 直接指定與選用章戳相同的簽核區域, 以免計算職名章中心點位置有可能落在簽核區域外導致章消失的問題
						if(!!so.signArea) {
							so2.signArea = so.signArea;
							so2.offset = {
								// 1110516 Raymond 考試院序90 修正在非100%縮放比情形下開啟公文後, 若簽核框位置位於非左上角, 使用選用章戳加蓋的職名章會位移(大於100%往左上移, 小於100%往右下移)的問題
								//left: so2.pos.left - so.signArea.left,
								//top: so2.pos.top - so.signArea.top};
								left: so2.pos.left - ((so.signArea.$area.offset().left - that.$pg.offset().left) * 100 / ((z !== undefined)?z.currScale:100)),
								top: so2.pos.top - ((so.signArea.$area.offset().top - that.$pg.offset().top) * 100 / ((z !== undefined)?z.currScale:100))};
							so2.saType = so.saType;
							so2.saID = so.saID;
						}
						
						// 1090311 Raymond 1081105 選用章戳移動連帶移動職名章
						//var cmt = new Stamp(so2);
						//cmt.initiateSO(that.$pg);
						var cmt2 = new Stamp(so2);
						// 1130423 Raymond 1120881 傳入核示語詞的top位置, 供計算包含核示語詞的高度範圍內是否壓線, 需重新整理時不要直接refresh/goToPage, 等代字加蓋後再refresh/goToPage
						//cmt2.initiateSO(that.$pg);
						var needRefresh = cmt2.initiateSO(that.$pg, {overallTop: so.pos.top, retNeedRefresh: true});
						// 1090715 Raymond 1081105 新增判斷環境變數AOL_DISABLE_SIGNET_FOLLOWING_STAMP不是Y或1, 才設定選用章戳連動職名章
						var disableSignetFollowingStamp = theSSO.User.EnvSettings.get("AOL_DISABLE_SIGNET_FOLLOWING_STAMP");
						if(disableSignetFollowingStamp != "Y" && disableSignetFollowingStamp != "1") {
							so.linkSOID = so2.id;
							so.linkCmt = cmt2;
							so2.followCmt = cmt;
						}
						
						// 1131007 Raymond 1130988 新增加蓋的選用章戳若中心點不在簽核區域內, 但因連帶的職名章壓線, 自動增高簽核區域, 所以選用章戳也要改設為簽核區域內物件
						if(!so.signArea && !!so2.signArea) {
							so.signArea = so2.signArea;
							so.offset = {
								// 1110516 Raymond 考試院序90 修正在非100%縮放比情形下開啟公文後, 若簽核框位置位於非左上角, 使用選用章戳加蓋的職名章會位移(大於100%往左上移, 小於100%往右下移)的問題
								//left: so2.pos.left - so.signArea.left,
								//top: so2.pos.top - so.signArea.top};
								left: so.pos.left - ((so.signArea.$area.offset().left - that.$pg.offset().left) * 100 / ((z !== undefined)?z.currScale:100)),
								top: so.pos.top - ((so.signArea.$area.offset().top - that.$pg.offset().top) * 100 / ((z !== undefined)?z.currScale:100))};
							so.saType = so2.saType;
							so.saID = so2.saID;
							// 更新此簽核物件的類型為簽核區域內物件
							theAOL.getCurrFolio().getSignFolder().xSignFolder().updateSignObj(so);
						}
						
						// 1080417 Raymond 1080053 新增加蓋代字功能
						if(addProxyWord) {
							// 1090311 Raymond 1081105 選用章戳移動連帶移動職名章
							//stampExt = {w: cmt.$so.width(), h: cmt.$so.height()};
							var stampExt2 = {w: cmt2.$so.width(), h: cmt2.$so.height()};	// 1100511 Raymond 1100293 變數更名stampExt -> stampExt2, 避免影像代為決行章的位置計算, 1110513 Raymond 1110538 補var宣告
							// 代字是固定樣式
							var so3 = {
								id: that.getNewID(),
								type: "stamp.text",			// stamp:選用章戳(圖檔), stamp.text:選用章戳(文字)
								orient: "橫書",
								cTime: now,
								//pos: that.anchorPt,   // anchorPt是相對於viewPort的座標
								boundTo: that.$pg.data("pg"),
								sessionNew: true,		// 2015.8.21 新增標記此簽核物件為本階段新增
								content: "代",
								fontName: "標楷體",
								fontSize: "18pt",
								color: {r: 0, g: 0, b: 0}	// 2016.11.17 FDA要求代字用黑色
							};
							// 1130820 Raymond 1130853 新增判斷環境變數「AOL_USE_RED_PROXY_WORD」設為"Y"時, 改用紅色顯示代字
							if(theSSO.User.EnvSettings.get("AOL_USE_RED_PROXY_WORD") == "Y")
								so3.color.r = 255;
							if(theUserInfo.OrgNickName == "NCHU")	// 1071219 Raymond 1071227 中興要求代字要用14pt大小
								so3.fontSize = "14pt";
							so3.info = that.makeSOInfo(so3.id, so3.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
							so3.pos = {
								left: so2.pos.left + stampExt2.w,		// 1100511 Raymond 1100293 變數更名stampExt -> stampExt2, 避免影像代為決行章的位置計算
								top: so2.pos.top + stampExt2.h - 30};	// 1100511 Raymond 1100293 變數更名stampExt -> stampExt2, 避免影像代為決行章的位置計算
							var cmt3 = new Stamp(so3);
							cmt3.initiateSO(that.$pg);
							
							// 2017.3.29 職名章移動連帶移動代字
							so2.linkSOID = so3.id;
							so2.linkCmt = cmt3;
							// 1090312 Raymond 1081105 新增followCmt屬性在被連動的簽核物件, 當刪除被連動的簽核物件, 而不是連動來源的簽核物件時, 移除來源物件中的linkCmt屬性, 以免再刪除來源物件時發生移除linkCmt所指的簽核物件發生Error
							so3.followCmt = cmt2;
						}
					}
					else
						theLogger.warn("勾選加蓋職名章但未選取職名章!");
				}
				
				// 1100510 Raymond 1100293 新增代為決行章(copy from CDC 1080436)
				if(theSSO.User.EnvSettings.get("AOL_ENABLE_GRANT_APPROVE") == "Y") {
					if(grantAppr) {	// 加蓋代為決行章
						if(!!grantApprStamp) {
							theLogger.log("加蓋代為決行章...");
							var so4 = {
								id: that.getNewID(),
								type: "stamp",			// stamp:選用章戳(圖檔), stamp.text:選用章戳(文字)
								orient: "橫書",
								cTime: now,
								boundTo: that.$pg.data("pg"),
								sessionNew: true,		// 新增標記此簽核物件為本階段新增
								/*stampName: "代為決行"	// Raymond 新增stampName用於核章時辨識是否有加蓋代為決行章戳, 航港局1100293此單未提要不要檢核是否有加蓋"代為決行"章 */
							};
							so4.info = that.makeSOInfo(so4.id, so4.cTime, theUserInfo.UserName);	// 2017.2.17 新增id
							
							if(withStamp)
								so4.pos = {
									left: so2.pos.left,
									top: Math.max(so2.pos.top + divExt.h, so.pos.top + stampExt.h)};
							else
								so4.pos = {
									left: so.pos.left,
									top: so.pos.top + stampExt.h};
							// 直接指定與選用章戳相同的簽核區域, 以免計算章中心點位置有可能落在簽核區域外導致章消失的問題
							if(!!so.signArea) {
								so4.signArea = so.signArea;
								so4.offset = {
									// 1110516 Raymond 考試院序90 修正在非100%縮放比情形下開啟公文後, 若簽核框位置位於非左上角, 使用選用章戳加蓋的代為決行章會位移(大於100%往左上移, 小於100%往右下移)的問題
									//left: so4.pos.left - so.signArea.left,
									//top: so4.pos.top - so.signArea.top};
									left: so4.pos.left - ((so.signArea.$area.offset().left - that.$pg.offset().left) * 100 / ((z !== undefined)?z.currScale:100)),
									top: so4.pos.top - ((so.signArea.$area.offset().top - that.$pg.offset().top) * 100 / ((z !== undefined)?z.currScale:100))};
								so4.saType = so.saType;
								so4.saID = so.saID;
							}
							
							if(typeof grantApprStamp.fileInfo !== "undefined") { // 影像檔章戳
								so4.content = grantApprStamp.data;
								so4.size = {width: (grantApprStamp.size.w / 10) + "mm", height: (grantApprStamp.size.h / 10) + "mm"};
								//so4.color = {r: grantApprStamp.color.r, g: grantApprStamp.color.g, b: grantApprStamp.color.b};	//2017.2.21	Leslie	修改圖檔類型的選用章戳，改為"圖檔"類型的簽核物件
								so4.type = "sketch";
								so4.transparency = "0";	//透明度設為0
								so4.asIcon = false;
								so4.maskBkgnd = 'Y';
								var cmt = new SketchComment(so4);	//2017.2.21	Leslie	改用數位墨水的物件(圖檔)來建立
								cmt.initiateSO(that.$pg);
							}
							else {  // 文字章戳
								so4.type = "stamp.text";	// 變更為stamp.text表示文字式選用章戳
								so4.content = grantApprStamp.textContent;
								so4.fontName = grantApprStamp.font.name;
								so4.fontSize = grantApprStamp.font.size + "pt";
								so4.color = {r: grantApprStamp.font.color.r, g: grantApprStamp.font.color.g, b: grantApprStamp.font.color.b};
								if(grantApprStamp.font.style.search("粗") >= 0)
									so4.fontWeight = true;
								if(grantApprStamp.font.style.search("斜") >= 0)
									so4.fontStyle = true;
								var cmt = new Stamp(so4);	//2017.2.21	Leslie	僅文字章戳用Stamp物件
								cmt.initiateSO(that.$pg);
							}
						}
						else
							theLogger.warn("找不到代為決行章, 但勾選了「代為決行」選項");
					}
				}
				
				// 1130423 Raymond 1120881 判斷需重新整理時, 在蓋完代字章/決行章及執行連動後再重新整理
				if(!!needRefresh && needRefresh.refresh == true) {
					if(needRefresh.goNextPage == true) {
						let fv = that.$pg.closest(".viewPort").data("view");
						fv.goToPage(fv.currPo() + 1);
					}
					else
						that.$pg.closest(".pages").flip("refresh");
				}
				
				// 1101008 Raymond 修正iPadOS 14/15加蓋選用章戳圖檔後不會顯示的問題
				if(navigator.userAgent.match(/Mac OS/gi) && !window.realMac) {
					var $tmpDiv = $("<div></div>").appendTo(that.$pg);
					setTimeout(function() {
						$tmpDiv.remove();
					}, 0);
				}
				
				that.$pg.closest(".viewPort").data("editCursor").cmdFloat.hide();
			}
			
			// 2015.11.3 - Raymond, 新增查詢可否連動
			if(typeof stamp.actionName !== "undefined" && stamp.actionName !== null) {
				// 1061101 Raymond 1061066 文別若是簽、便簽(可設定)則先檢查是否已核決, 已核決則一律僅蓋章不要連動核決狀態,
				// 連confirm都不要有, 因為長官只會按是, 造成結案類型從發文變成存查, 直接歸檔沒有發文
				var skipStampAct = false;	// 預設要連動核決狀態
				if(SSO_CONFIG.disableAppActOfSpecialDraft) {	// SSO_CONFIG.js定義disableAppActOfSpecialDraft為true時才要過濾文別
					var docApproved =(theAOL.docObj.get('ODWMSG', 'APP_USER_ID').length || theAOL.docObj.get('ODWMSG', 'APP_ROLE_ID').length) ? true : false;
					if(docApproved) {
						theLogger.warn("本件公文已核決, 檢查此文稿的文別是否屬於應不套用連動核決狀態的文別");
						var pg = that.$pg.data("pg");
						if(!!pg.container) {
							var docType;
							if("attType" in pg.container) {
								if("fromType" in pg.container.parent) {
									theLogger.log("在來文的附件頁面上蓋章視為'簽'");
									docType = "簽";
								}
								else if(pg.container.parent.name == "來文簽辦") {
									theLogger.log("在來文簽辦的附件頁面上蓋章視為'簽'");
									docType = "簽";
								}
								else {
									docType = pg.container.parent.docType;
									theLogger.log("在'" + docType + "'的附件頁面上蓋章");
								}
							}
							else if("fromType" in pg.container) {
								theLogger.log("來文頁面上蓋章視為'簽'");
								docType = "簽";
							}
							else if("docType" in pg.container) {
								if(pg.container.name == "來文簽辦") {
									theLogger.log("在來文簽辦的頁面上蓋章視為'簽'");
									docType = "簽";
								}
								else {
									docType = pg.container.docType;
									theLogger.log("在'" + docType + "'的文稿頁面上蓋章");
								}
							}
							else {
								theLogger.error("頁面非文稿或附件(" + pg.container.name + ")")
							}
							if(!!docType) {
								if("disableAppActDocTypes" in SSO_CONFIG) {	// 以SSO_CONFIG.js定義的"應不套用章戳連動核決狀態的文別"決定應否不連動
									var disDocTypes = SSO_CONFIG.disableAppActDocTypes.split(",");
									if(disDocTypes.indexOf(docType) >= 0) {
										theLogger.warn("此文稿屬於應不套用章戳連動核決狀態之文別(" + SSO_CONFIG.disableAppActDocTypes + ")之一, 僅蓋章不連動核決狀態");
										skipStampAct = true;
									}
									else {
										theLogger.log("此文稿非應不套用章戳連動核決狀態之文別(" + SSO_CONFIG.disableAppActDocTypes + ")之一, 連動核決狀態");
									}
								}
								else {
									theLogger.error("SSO_CONFIG.js未定義'disableAppActDocTypes'參數, 無法檢核此文別是否應不要套用連動功能, 連動核決狀態");
								}
							}
						}
					}
				}
				if(skipStampAct)
					doAddStamp();
				else {
					var sah = new StampActionHandler();
					
					function doDispatchAction(opt) {
						if(opt.doAction) {	// 需要連動
							sah.dispatchAct_new(stamp.actionName)
								.done(function(rslt) {
									if("success" in rslt) {
										if(!rslt.success) {
											theLogger.error(rslt.errMsg);
											alert(rslt.errMsg);
										}
										else if(opt.addStamp)	// 連動成功後需要蓋章
											doAddStamp();
									}
									else if(opt.addStamp)	// 連動未標示成功, 需要蓋章
										doAddStamp();
								})
								.fail(function(rslt) {
									if("success" in rslt) {
										if(!rslt.success) {
											theLogger.error(rslt.errMsg);
											alert(rslt.errMsg);
										}
									}
									else {
										theLogger.error(rslt);
										alert(rslt);
									}
								});
						}
						else if(opt.addStamp)	// 不需連動但需蓋章
							doAddStamp();
					}
					
					sah.actionConfirm(stamp.actionName)
						.done(function(res) {
							if(res.showMsg) {
								// 1100318 Raymond 調整視窗標題名稱, 與章戳選用子視窗(及一代AOL)一致
								//var param = {title: "選用章戳訊息",
								var param = {title: "章戳選用訊息",
									message: res.msg.replace(/(\r\n)+/g, '<br>'),
									buttons: []
								};
								for(var i=0; i<res.options.length; i++) {
									param.buttons.push({
										name: res.options[i].btnText,
										action: doDispatchAction,
										data: res.options[i]
									});
								}
								$.confirm(param);
							}
							else if(res.options.length == 1) {
								doDispatchAction(res.options[0]);
							}
						})
						.fail(function(errorText) {
							theLogger.error(errorText);
							alert(errorText);
						});
				}
			}
			else
				doAddStamp();
		}
	}
	// 1080122 Raymond 1080035 修正複製含刪除標記的主旨或段落條列文字時, 貼上後會出現標記已刪除的文字的問題
	if(navigator.userAgent.indexOf("Trident") >= 0) {	// 只有IE會這樣, Chrome複製會去掉不顯示的文字
		$pg.on("copy", function(event) {
			theLogger.log("$pg.on" + event.type + " - target:" + event.target.nodeName + "." + event.target.className + " '" + event.originalEvent.data + "'");
			var rng = window.getSelection().getRangeAt(0);
			theLogger.log("selection: " + Util.rangeToStr(rng));
			var _iterator = document.createNodeIterator(rng.commonAncestorContainer,
							NodeFilter.SHOW_TEXT,
							function(node) {
								return NodeFilter.FILTER_ACCEPT;
							},
							false);
			var _nodes = [];
			while(true) {
				var node = _iterator.nextNode();
				if(!node)
					break;
				// 1080815 Raymond 1080620 修正IE下選取範圍是英數與中文交界開始時, 因rng.startContainer會變成SPAN.a而全部skip變成全部過濾掉成空字串的問題
				//if(_nodes.length === 0 && node !== rng.startContainer)
				//	continue;
				if(_nodes.length === 0) {
					// 1080918 Raymond 1080852 修正草稿或選取範圍不含追蹤修訂標籤時, 沒有複製內容的問題
					//if(rng.startContainer === rng.commonAncestorContainer) {
					if(rng.startContainer === rng.commonAncestorContainer && rng.commonAncestorContainer.nodeType == 1) {
						if(node !== rng.startContainer.childNodes[rng.startOffset])	// IE的選取範圍當startContainer是父層元素時, startOffset就是子層元素的索引值
							continue;
					}
					else if(node !== rng.startContainer)
						continue;
				}
				// 1080918 Raymond 1080852 修正IE下選取範圍是英數與中文交界結束時, 因rng.endContainer會變成SPAN.a而變成複製到結束位置後的剩下內容的問題
				else if(rng.endContainer === rng.commonAncestorContainer && rng.commonAncestorContainer.nodeType == 1) {
					if(node === rng.endContainer.childNodes[rng.endOffset])	// IE的選取範圍當endContainer是父層元素時, endOffset就是子層元素的索引值
						break;
				}
				//if(node.parentNode.nodeName != "DEL" && node.parentNode.parentNode.nodeName != "DEL") {
				if($(node.parentNode).is(":visible")) {	// 改成判斷是否顯示與Chrome行為一致比較好
					// 1080125 Raymond 修正複製來源是同一行字時, 變成複製選取的字首到行尾問題
					if(_nodes.length === 0 && node === rng.startContainer && node === rng.endContainer)
						_nodes.push(node.nodeValue.substring(rng.startOffset, rng.endOffset));
					else if(_nodes.length === 0 && node === rng.startContainer)
						_nodes.push(node.nodeValue.substr(rng.startOffset));
					else if(node === rng.endContainer)
						_nodes.push(node.nodeValue.substr(0, rng.endOffset));
					else
						_nodes.push(node.nodeValue);
				}
				if(node === rng.endContainer)
					break;
			}
			theLogger.log("過濾複製文字為:'" + _nodes.join("") + "'");
			var $temp = $("<input>");
			$("body").append($temp);
			// 1080923, 1080339 Eric - jQuery 3.0 upgrade
			//$temp.val(_nodes.join("")).select(); 
			$temp.val(_nodes.join("")).trigger('select'); 
			document.execCommand("copy");
			$temp.remove();
		});
	}
}

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-EditSO.js").finish();
})();