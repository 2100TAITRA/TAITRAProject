// 列印公文功能模組
//	掛在nsEditor命名空間下
//	
// DATE		SA			PRG			MGR_NO		DESC
// 1060504	Raymond		Raymond		-------		改叫saveRuntime新增/更新目前流程點的簽核區域資訊, 因為不允許編輯內文的情況下, 外部簽核記錄檔不應該新增版本, 若頁數跟最後一版不一致時, 簽核區域資訊也會跟著錯, 但不能直接更新會儲存到XSignObjs.xml的簽核區域欄位, 所以改用另一組Runtime文稿物件記錄當前動態排版出來的簽核區域資訊
// 1060511	Raymond		Raymond		-------		修正預設行高與簽核頁面不一致問題, 航港-序508
// 1060517	Raymond		Raymond		1060244		修正不保留簽核物件列印時, 仍會印出之前流程點的簽核物件問題
// 1060612	Raymond		Raymond		1060414		修正當流程點加蓋圖檔章戳後, 會異常放大的問題
// 1060612	Leslie		Leslie		1060211		增修可儲存使用者列印選項(一代功能)
// 1060614	Raymond		Raymond		1060471		下載img(排版物件)指定的圖檔影像
// 1060626	Raymond		Raymond		-------		新增z-index:-1;position:absolute;以避免在準備預覽頁面資料時顯示在主頁面
// 1060628	Raymond		Raymond		1060505		新增判斷目前使用者是否符合可使用取代章戳(由環境變數「WE_CAN_USE_SUBST_STAMP_ROLES」設定)的角色
// 1060628	Leslie		Leslie		1060539		不紀錄行文單位保寶選項(由稿件內容決定)
// 1060628	Leslie		Leslie		1060502		修正一代暨有功能，列印發文用的「文」時，檢核發文字號、日期是否不為空
// 1060706	Raymond		Raymond		1060539		新增支援會辦單位分繕列印選項的樣版
// 1060801	Raymond		Raymond		1060278		令、公告允許無紙本受文者列印
// 1060809	Raymond		Raymond		-------		開啟列印子視窗時勾選正本或副本行文單位保密選項時將設定值寫回到文稿
// 1060913	Raymond		Raymond		1060735		有原始套用的樣版檔名則預設該樣版為列印格式, 否則依原來第1筆符合文別、函類別的邏輯做預設的列印格式
// 1060918	Raymond		Raymond	1060653/1060679	修正Chrome下列印預覽各頁間會黏在一起(page-break-before無效)導致約第5頁以後的本文分類號等行出現在前一頁的問題
// 1060918	Raymond		Raymond		1060738		若有指定列印範圍, 則依設定值屏蔽頁面, 設定值可設為單一頁次(例:設為2表示列印第2頁), 或設為區間(例:設為1-2表示列印第1至2頁)
// 1061018	Raymond		Raymond		1060930		修正時戳顯示年時年超出職名章高度問題
// 1061023	Raymond		Raymond		-------		修正MacOSX Safari跟IE一樣297滿版高度會多出一頁空白頁的問題
// 1061024	Raymond		Raymond	1060980/1060997	文稿根節點新增套用自訂屬性, 若值為True表示經過設定段落屬性, 套用自訂選項預設勾選
// 1061201	Raymond		Raymond		1061150		新增搜尋受文者功能
// 1061213	Leslie		Leslie		1061148		修正雙面列印插頁邏輯，應僅計算實際印出頁面(有設定列印範圍時)
// 1061215	Raymond		Raymond		1060735		以SSO_CONFIG.js新增的keepPrintFormat參數決定是否記憶printXslName(列印格式)
// 1061218	Raymond		Raymond		1061282		由於多稿轉出功能將Key由正式名稱改成全銜記錄, 故此處套用分繕變數也要改成以全銜為準
// 1061226	Raymond		Raymond		1061146		分繕列印新增"受文者姓名"參數
// 1070212	Raymond		Raymond		NCKU107217	不論指定受文者含不含附件, 都要標記分繕列印已(不)印出附件頁面, 避免因勾選了附件項目但受文者不含附件而單獨印出附件頁面
// 1070605	Raymond		Raymond		1070077		修正支援檢核發文日期是否為當日及發文號應與公文文號一致功能
// 1070606	Raymond		Raymond		1070183		合併內政部功能新增支援分繕附件列印
// 1070808	Raymond		Raymond		1070685		新增判斷有附件下載區資訊並分繕附件的話, 以各別受文者的識別碼取代附件文字預設的識別碼
// 1071226	Raymond		Raymond		1071208		修正在Chrome下附件頁碼會與簽核文件列印的下邊界字串重疊問題
// 1080219	Raymond		Raymond		1080089		改用分繕表物件新增方法, 傳入"全銜", "正式名稱", "姓名", "編號"做為分繕功能的搜尋受文者條件
// 1080321	Raymond		Raymond		1080224		修正貼式文字意見若折行數超過2行, 在列印貼式文字意見及數位墨水簽核物件頁面會呈現只折成2行的問題
// 1080521	Raymond		Raymond		1080370		修正列印貼式簽核物件頁面時, 數位墨水(影像)物件無法顯示問題
// 1080717	Raymond		Raymond		1080538		修正分繕表列印時因後面加入的表格列影響欄位寬度導致之前加入的表格列發生高度增加, 造成表格內容超出頁面範圍的問題
// 1080923  Kevin       Eric        1080339     jQuery 3.0 upgrade
// 1081210	Raymond		Raymond		1080785		合併內政部單號1070656, 新增支援"自訂"簽核區域類型
// 1081218	Raymond		Raymond		-------		修正文字意見的XSS漏洞, 並轉換非圖示化文字意見的<br>為折行字元, 以符合未修正漏洞前的顯示行為
// 1090206	Raymond		Raymond		1070503		合併一代共通版也提供的CDC需求(1000194)的'正副本取代模式'功能
// 1090227	Raymond		Raymond		1080751		合併內政部1070381若公文由AKI800調閱, 列印完後回報列印記錄
// 1090310	Raymond		Raymond		1081103		新增「全選」核取方塊, 勾選可全選文稿清單中的文稿、來文及附件項目
// 1090313	Leslie		Leslie		1090036		新增設定列印頁面Title文字功能，以提供Chrome可另存指定檔名
// 1090826	Raymond		Raymond		1090620		修正來文頁面影像比照附件頁面影像不要套用IE列印邊界反推, 在來文或附件頁面上的簽核物件亦不要套用IE列印邊界反推
// 1090831	Raymond		Raymond		1090529		調閱公文若強制浮水印, 則下載浮水印設定及LOGO影像
// 1090916	Raymond		Raymond		1090564		新增支援信保特殊模式公文相關修改
// 1091123	Raymond		Raymond		1090843		修正稿序錯誤導致PrintXSL在複選受文者列印機密等級變更或註銷建議單時, 因全銜字數不正確導致與承辦單位資訊重疊的問題
// 1091218	Raymond		Raymond		1090921		修正勾選「套用相同文別的選項設定」後, 若切換當前文稿的列印格式為"文"類型時, 在未點開第二筆同文別文稿的設定頁情況下, 直接勾選「全選」, 列印預覽分頁的第二筆同文別文稿仍會呈現"稿"類型格式的問題
// 1091218	Raymond		Raymond		信保序92	新增支援總行代碼、分行代碼分繕列印
// 1100217	Raymond		Raymond		1090610		合併內政部1071265, 新增列印進度子視窗及分批列印相關功能
// 1100303	Raymond		Raymond		1100092		比照點擊文稿頁籤及翻頁限制, 紙本公文不允許編輯內文時, 亦不可列印簽核文件
// 1100309	Raymond		Raymond		1090990		支援排版設定檔新增的「簽核類型」變數, 傳入目前公文的SignType, 僅"稿"類別的排版設定檔適用
// 1100315	Raymond		Raymond		1090991		修改有原始套用排版設定檔的記錄文稿, 列印格式選單只列出該"稿"類別排版設定檔及其它適用之"文"類別排版設定檔, 勾選「套用相同文別的選項設定」時, "稿"類別額外檢核與原始套用排版是否一致, 若不一致則搜尋原始套用的"稿"類別排版設定檔
// 1100319	Raymond		Raymond		1090564		附件屬性頁的「騎縫章」選項預設改為不勾選, 因為修改單號1090564需求之前, 附件屬性頁的騎縫章選項, 勾或不勾都不會在附件頁面套印騎縫章, 5.0.44以後版本, 勾選附件的騎縫章選項會生效, 為維持與修改前行為一致, 故附件的「騎縫章」的選項預設值改回不勾選
// 1100323	Raymond		Raymond		1090857		新增符合機關暱稱為「HAC」且資料夾符合環境變數「WE_SUBJECT_SYNC_DIGEST_FOLDERS」設定時, 檢核若2頁以上文稿的「摘要」欄為空則不允許列印
// 1100416	Raymond		Raymond		1090610		修正共通版無內政部的可紙本發文方式變數判定, 因而使用發文用, 受文機關單選全部列印時會發生Error, 以及用DocView子視窗開啟列印只有來文的公文時, 出現i未定義的Error的問題
// 1100512	Raymond		Raymond		1090821		新增判斷若是具有單層式文稿頁面的封裝檔, 則忽略顯示外機關流程點的簽核物件(因為也沒有簽核物件)
// 1100623	Raymond		Raymond		1100780		新增一般機關也可套用強制浮水印功能
// 1100713	Raymond		Raymond		1100649		列印簽核物件資訊頁功能新增簽核意見, 及新增僅顯示會辦單位長官意見選項[高大客製化選項]
// 1100715	Raymond		Raymond		1100854		簽核物件資訊頁的簽核物件支援[高大客製化]需求顯示年月日時分秒
// 1100723	Leslie		Leslie		1100879		修改紀錄「雙面列印」與顯示邏輯
// 1100728	Raymond		Raymond		1100928		新增搜尋被取代掉的文字意見ID陣列, 以支援「修改」他流程之文字意見功能的列印
// 1101029	Raymond		Raymond		1101199		修正Chrome V94、95版列印預覽時有些標楷體字型會破字的問題, 依環境變數「AOL_PRINT_USE_CNSFONT」決定產生文或稿的列印內容時是否額外新增指定"全字庫正楷體"字型
// 1101110	Raymond		Raymond		1101199		新增依環境變數設定啟用文字意見及簽核物件資訊頁、分繕變數表的標楷體加套"全字庫正楷體"字型功能
// 1101110	Raymond		Raymond		-------		修正草稿公文列印簽核物件資訊頁時, 本流程點才新增的簽核物件會重複出現, 及文稿上的簽核物件的序號會跳號的問題
// 1101213	Raymond		Raymond		1101410		修正函類別"移文單"會與"函"用同一樣版檔, 但以樣版檔名搜尋會對到第一筆"函"用的資源檔資訊, 導致列印格式清單會找不到目前套用的"稿"樣版問題
// 1110207	Raymond		Raymond		1110013		新增列印簽核物件資訊頁時, 在核決流程點的簽核意見姓名後註記「[決行]」
// 1110225	David		David		1101481		考試院客製化人工傳遞處理
// 1110321	Raymond		Raymond		1110216		修正有同名受文者分別為正、副本的情況, 列印發文用複選指定受文者只會列印第一筆同名受文者的問題
// 1110323	Raymond		Raymond		1110249		修改調閱公文列印簽核物件資訊頁時, 不要顯示目前流程點的簽辦意見
// 1110524	Raymond		Raymond		1110528		修正不同本別的同名受文者, 複選介面若其中之一已勾選, 搜尋後結果項目會全勾的問題
// 1110613	Raymond		Raymond		1110271		新增分繕列印時記錄受文者名稱+本別至文稿第1頁, 並記錄是否要套印騎縫章
// 1110617	Raymond		Raymond		1110416		合併一代1030961, 新增密件浮水印套印功能
// 1110627	Raymond		Raymond		1110271		新增航港局邏輯, 若啟用稿間加蓋騎縫章功能且雙面列印時, 奇數頁文稿跟簽核物件資訊頁間補上空白頁
// 1110725	Raymond		Raymond		1110416		新增判斷環境變數「WE_SPECIAL_WATERMARK」為"1"且文稿為密件時，套印密件浮水印，紙本附件則呼叫轉檔工作站的imgConvert2方法轉出附件頁面, 再下載到列印分頁中顯示並套印密件的附件浮水印
// 1110812	Raymond		Raymond		1110749		新增判斷若機關是信保基金, 則產生的列印分頁不要顯示右上角的「文號：」資訊
// 1110818	Raymond		Raymond		考試院序212	修正分繕變數表的儲存格寬度在Chrome的列印預覽介面中顯示的與列印分頁不同(較小), 造成列印預覽介面的部分儲存格寬度太窄變成高度增加, 導致表格下方可能有若干受文者的表格列超出列印頁面範圍的問題
// 1110829	Raymond		Raymond		1101369		找到第一個相符的簽核區域ID(會辦單位代碼)即中斷迴圈, 以避免重複會辦單位時, 列印時第二個重複的會辦單位區域重複出現第一個重複的會辦單位區域的簽核物件
// 1110829	Raymond		Raymond		1110416		列印密件附件的警語圖文框文字改為多個^都取代成換行及書寫方向改為橫式, 因為Chrome的列印預覽功能有直式書寫方向功能+垂直置中會壞掉變成字元向左倒90度的問題, 故改為橫式書寫方向, 直式警語的文字順序要以橫式書寫的方向來重新排列文字及折行
// 1110901	Raymond		Raymond		考試院序238	修正列印分繕變數表時, 有些儲存格在設定較窄col寬度後會折行, 使表格列變高, 造成部分表格列可能超出頁尾邊界範圍的問題
// 1110907	Raymond		Raymond		1101369		修正列印簽稿會核單時若重複的會辦單位分別位於不同頁次, 仍會重複顯示簽核物件的問題
// 1110913	Raymond		Raymond		1101369		修正列印有重複會辦單位的簽稿會核單上的暫存簽核物件時, 蓋在第二個重複會辦單位簽核框中的簽核物件仍會顯示在第二個重複會辦單位的位置, 與簽核頁面是自動移到第一個重複會辦單位簽核框內的行為不一致的問題
// 1110915	Raymond		Raymond		考試院序258	修正列印分繕變數表在插入當頁次最後一筆受文者的變數表格列後, 可能使欄位寬度發生變化, 造成前面本已插入的表格列因而發生折行變高的現象, 導致最後一列之前的幾個表格列也超出頁尾邊界範圍的問題
// 1110916	Raymond		Raymond		陸委會序290	列印密件紙本時, 若需套印密件浮水印, 匯出附件頁面的色彩模式選項預設從彩色改為黑白
// 1110927	Raymond		Raymond		陸委會序297	修正附件的密件浮水印的第一行字跟本文一樣顯示受文者姓名或受文者正式名稱, 而非受文者正副本稱謂
// 1110929	Raymond		Raymond		陸委會序302	修正只勾選附件列印時, 若所屬文稿勾選發文用, 應套用密件浮水印條件下, 即使不列印本文, 也要分繕列印附件, 使密件浮水印顯示指定的分繕受文者的正式名稱
// 1111013	Raymond		Raymond		陸委會序333	修正密件浮水印的文號未顯示支號的問題
// 1111014	Raymond		Raymond		陸委會序335	修正未設定支號時, 列印附件的密件浮水印文號會出現undefined的問題
// 1111027	Raymond		Raymond		1110864		合併1101468, 新增支援隱藏簽辦意見(「僅顯示我的最終意見」設定)及「顯示完整意見」選項功能
// 1111103	Raymond		Raymond		陸委會序370	新增密件浮水印的附件警語文字的半透明度支援獨立設定, 當設定檔未獨立設定附件警語文字的半透明度時, 才會沿用General的半透明度
// 1111208	Raymond		Raymond		1111334		修正列印密件浮水印啟用時, 文稿選「發文用」但不勾文稿, 只勾附件時, 分繕列印的附件會以一一一二二二三三三的順序, 而非比照一代的一二三一二三一二三的順序列印的問題
// 1111228	Raymond		Raymond		1111405		修正列印選用章戳(圖檔)時未去背的問題
// 1120106	Raymond		Raymond		1111361		修改成以一個背景的IFrame內嵌列印分頁的方式執行列印
// 1120210	Raymond		Raymond		1111035		由於貼式文字意見改為未依邊框寬度自動折行的原始輸入文字, 所以列印貼式文字意見的簽核物件資訊頁也要改成會折行, 以免一行太長超出表格範圍的問題
// 1120417	Raymond		Raymond		考試院序17	因列印分頁改為內嵌的IFrame, 瀏覽器預覽列印的"另存PDF"預設檔名變成主頁的分頁視窗標題, 故修改成列印前將分頁視窗標題改為預設另存檔名, 關閉列印子視窗時再將分頁視窗標題改回"電子公文系統"
// 1120425	Raymond		Raymond		1120157		修正有同名受文者時, 排序後勾選2個以上同名受文者只會列印第一次勾選的同名受文者的問題
// 1120608	Raymond		Raymond		1120515		新增判斷環境變數「WE_ALLOW_USE_SEALMARK_ROLES」是否有設定, 若有設定則判斷目前公文的OwnRoleID是否符合設定之一, 若不符合則禁止套用騎縫章, 未設定此環境變數時簽核頁面一律允許套用騎縫章
// 1120620	Raymond		Raymond		標檢局序86	修正職名章高度設定小於7.7mm時, 時戳字型大小計算會得出小於9pt的大小, 但瀏覽器最小只能顯示9pt的字, 將導致時戳文字高於職名章的問題, 故再計算縮小行高來調整時戳文字的高度
// 1120901  Kevin		Leslie		1120709		弱掃修正Client DOM Stored XSS
// 1121027	Raymond		Raymond		1120790		列印子視窗的複選受文者面板的受文者清單新增顯示「序」欄
// 1121222	Raymond		Raymond		領務局序344	修正切換列印格式時, 列印選項未恢復為該列印格式上次記憶的選取/勾選項目的問題
// 1121222	Raymond		Raymond		領務需求序36若環境變數「WE_PRINT_FINISH_CLOSE_SETTING_WINDOW」設為"Y", 則在列印(及分批列印)完畢時關閉列印設定子視窗
// 1130126	Raymond		Raymond		1120887		分會流程點可能不保留前一版本的簽核物件, 需再從搜尋前一個分會流程點的保留簽核物件, 以避免其它分會單位的簽核物件不會顯示的問題
// 1130605	Raymond		Raymond		1130120		修正文稿頁面上的簽核框外物件也可套用外部簽核記錄檔所記錄的座標, 以避免一些較早期線上簽核公文寫了錯誤(超大)座標資訊到封裝檔的簽核物件無法藉由XSignObjs.xml修復, 造成預覽列印時產生超多(數千)空白頁的問題
// 1130722	Raymond		Raymond		1130400		修正先列印過一次公文(包括線上轉紙本、參照窗格公文的列印), 再傳送時輸入PIN CODE畫面左半邊會出現前次列印時的文稿內容及簽核物件的問題
// 1130809	Raymond		Raymond		1130313		合併1111007(1100394), 離線模式不要呼叫GetUserEnvSetting, UpdateUserEnvSet, 及修正目前虛擬目錄名稱不是MS時, 離線模式下列印分頁可能無法顯示的問題
// 1130812	Raymond		Raymond		1130313		離線模式下無法使用轉檔工作站, 不提供密件浮水印啟用時, 能匯出附件頁面再套印浮水印功能
// 1130924	Raymond		Raymond		1130770		合併1080503一代所提供的禁止列印草稿公文功能(環境變數「WE_DISABLE_PRINT_DRAFT_DOC」設為"Y"時)
// 1131021	Raymond		Raymond		勤益序316	修正紙本草稿公文在取號後, msgId會轉為正式公文的超過2000, 須再判斷是否位於「草稿」資料夾, 以避免禁止列印草稿公文功能無效問題
// 1131216	Raymond		Raymond		1131064		新增環境變數「WE_ALLOW_VIEW_READONLY_PAPER_DOC_FOLDER」, 當目前資料夾符合設定值時, 允許禁止編輯內文的紙本公文, 可以列印簽核文件
// 1140115	Raymond		Raymond		1131158		修正未設定分繕變數表內容時, 列印分繕變數表會卡住問題
// 1140124	Raymond		Raymond		1140009		修正有些"文"類型排版設定檔(ex.領務局的「函(抄件)」), 在以「發文用」列印時, 會出現追蹤修訂內容的問題
// 1140311	Raymond		Raymond		1140413		修正列印簽核物件資訊頁的簽核意見若內容過多高度超過剩餘單頁高度, 則分頁顯示
// 1140410	Raymond		Raymond		1140481		修正使用雙面列印時, 偶數頁的裝訂線應顯示在右邊界, 左右騎縫章內縮距離也要對調
// 1140418	Raymond		Raymond		1140481		修正列印文格式使用雙面列印時, 裝訂線未顯示在偶數頁右邊界的問題
// 1140422	Raymond		Leslie		1131223		[退輔會]增修騎縫章顯示邏輯，一律僅於列印時顯示
// 1140708	David		Raymond		1140159		合併1111142, 若文稿檔有取代章戳的署名, 且有記錄取代章戳圖檔路徑及大小, 則優先使用, 無才用原本的RsrcMgmt.xml搜尋對應的圖檔
// 1140910	Raymond		Raymond		1141254		新增比對原本的附件文字與附件下載區資訊相同的字串, 若附件下載區字串前有其它文字的話, 保留在重設識別碼後的附件文字
// 1140924	Raymond		Raymond		1141329		修正列印線上簽核稿時, 可能因為簽辦時的追蹤修訂或完稿模式與列印時選擇不一致, 或列印時選擇非預設(1.5)行高, 導致發生簽核區域所在頁次與簽辦時不同而使簽核物件出現在與簽核區域不同頁次的問題, 新增偵測簽核區域內簽核物件所對應的簽核區域是否真的在原本簽辦時的頁次, 不在的話先往後搜尋對應的簽核區域所在頁次, 找不到再往前搜尋, 找到對應的簽核區域所在頁次時, 將簽核物件移至該頁次顯示, 都找不到時(應該不可能)才顯示在原本簽辦時的頁次
// 1141003	Raymond		Raymond		1141114		新增判斷機關暱稱為「TAITRA」(外貿)時, 「列印字型」下拉選單設為反灰
// 1141014	Raymond		Raymond		1141129		判斷機關暱稱為"TAITRA"(外貿)時, 新增列印簽核物件資訊頁(內部意見)選項, 列印簽核物件資訊頁功能改為僅顯示同一級單位最後一個流程點, 列印簽核物件資訊頁(內部意見)功能則是與目前流程點同一級單位的流程點全部顯示, 其它單位流程點則僅顯示最後一個
// 1141017	Joe			Joe			1141126		增加外貿客製化發文方式
// 1141114	Raymond		Raymond		1141356		修正列印時不會顯示目前流程點加蓋的貼布物件及目前流程點加蓋在簽核區域內的貼布物件會顯示成在別的流程點加蓋的簽核物件之下的問題, 另修正勾選「列印簽核物件資訊頁」後, 列印的目前流程點所新增的簽核物件左上角沒有顯示序號的問題
// 1150211	Raymond		Raymond		1141685		修正文稿無支號欄位(ex.陸委會的便簽), 列印附件的密件浮水印的文號後會出現undefiend字樣的問題
// 1150309	Raymond		Raymond		1150145		新增外貿客製化簽核物件資訊頁格式, 從新到舊排序, 「列印簽核物件」以一級單位為一欄, 顯示單位名稱及最後一個流程點的簽辦意見內容, 再顯示單位內各流程點資訊, 核決流程點在單位名稱後顯示核決者姓名, 內部流程資訊在單位名稱後顯示「(核決)」, 「列印簽核物件資訊頁(內部意見)」則判斷與目前流程點同一級單位時, 各流程點完整顯示其簽核人員、物件類型、時間及簽辦意見內容, 來文項目的選項面板在允許來文簽辦的資料夾(由環境變數「AOL_ENABLE_RCVDOC_EDIT_FOLDER」設定)時新增顯示「列印簽核物件資訊頁」、「列印簽核物件資訊頁(內部意見)」核取方塊及對應功能
// 1150312	Raymond		Raymond		外貿序78	修正同單位流程點合併錯誤的問題

var nsEditor = nsEditor||{};

// 1090227 Raymond 1080751 合併內政部1070381若是調閱公文, 回報列印記錄
nsEditor.ReportPrintLog = function(fm) {
	var uo = fm.getUNVObj();
	if(!!uo && "UnvRoot" in uo) {
		if("WSDLurl" in uo.UnvRoot && uo.UnvRoot.WSDLurl.length > 0) {
			var wsUrl = uo.UnvRoot.WSDLurl;
			var wsFuncName = 'PrintLog';
			var params = new SOAPClientParameters();
			// 1.參數
			params.add("UserId", uo.UnvRoot.USER_ID);
			params.add("UserName", uo.UnvRoot.USER_NAME);
			params.add("DocNo", uo.UnvRoot.Doc.DocNo);
			params.add("OrgNo", uo.UnvRoot.Doc.SourceOrgNo);	// 1070710 Raymond 1070381 配合新增OrgNo參數
			// 2.呼叫WS
			SOAPClient.invoke(wsUrl, wsFuncName, params, true, function (rslt) {
				theLogger.log('-I- AKI500WS.' + wsFuncName + ' returns:', rslt);
				if (typeof rslt === 'boolean') {
					if (rslt === true) {
						// 3.回報成功
					}
					else {
						alert("回報列印記錄失敗!");
					}
				}
				else {
					theLogger.error('Error! AKI500WS[' + wsFuncName + '] 回傳不為boolean');
					alert("回報列印記錄發生錯誤!");
				}
			});
		}
		else
			theLogger.error("此為調閱公文, 但UNV檔物件中未記錄應回報的WSDLurl網址");
	}
}

nsEditor.onPrintFolioVisible = function(fm) {
	// 1131216 Raymond 1131064 新增環境變數「WE_ALLOW_VIEW_READONLY_PAPER_DOC_FOLDER」, 當目前資料夾符合設定值時, 允許禁止編輯內文的紙本公文, 可以列印簽核文件
	// 1100303 Raymond 1100092 比照點擊文稿頁籤及翻頁限制, 紙本公文不允許編輯內文時, 亦不可列印簽核文件
	//if(fm.getDocObj().signType == "P" && !fm.enableEdit()) {	// 卡紙本不允許編輯內文的流程點不可以看文稿
	var allowViewReadOnlyPaperDocFolder = theSSO.User.EnvSettings.get("WE_ALLOW_VIEW_READONLY_PAPER_DOC_FOLDER").split(";");
	var thisFolder = fm.getDocObj().folder + "-" + fm.getDocObj().subfolder;
	var allowViewReadOnlyPaperDoc = allowViewReadOnlyPaperDocFolder.indexOf(thisFolder) >= 0;
	if(fm.getDocObj().signType == "P" && !fm.enableEdit() && !allowViewReadOnlyPaperDoc) {	// 卡紙本不允許編輯內文的流程點不可以看文稿
		theLogger.warn("此流程點不允許編輯紙本公文內文, 禁用列印簽核文件");
		return false;
	}
	return true;
}

nsEditor.onPrintFolio = function(event, folioModel){	// 2016.9.8 新增folioModel參數
	
	var $viewPort = event.data;
	var fm = folioModel;	// 2016.9.8 新增fm參數
	var that = this;
	var w = $viewPort.closest(".ui-pane-a, .ui-pane-b").width(),
		h = $viewPort.closest(".ui-pane-a, .ui-pane-b").height();
	var currItem;	// 屬性頁操作對象
	var dlgAttDefStr = theSSO.User.EnvSettings.get("WE_DLG_ATTACH_DEFAULT_STR");	// 2016.9.13 新增附件下載區字串
	
	// 1131021 Raymond 勤益序316 修正紙本草稿公文在取號後, msgId會轉為正式公文的超過2000, 須再判斷是否位於「草稿」資料夾
	// 1130924 Raymond 1130770 合併1080503一代所提供的禁止列印草稿公文功能
	//if((theSSO.User.EnvSettings.get("WE_DISABLE_PRINT_DRAFT_DOC") == "Y" || theSSO.User.EnvSettings.get("WE_DISABLE_PRINT_DRAFT_DOC") == "1") && fm.getDocObj().isDraft) {
	if((theSSO.User.EnvSettings.get("WE_DISABLE_PRINT_DRAFT_DOC") == "Y" || theSSO.User.EnvSettings.get("WE_DISABLE_PRINT_DRAFT_DOC") == "1") && (fm.getDocObj().isDraft || fm.getDocObj().folder == "草稿")) {
		theLogger.warn("環境變數WE_DISABLE_PRINT_DRAFT_DOC='" + theSSO.User.EnvSettings.get("WE_DISABLE_PRINT_DRAFT_DOC") + "', 禁止列印草稿公文");
		alert("草稿夾不提供列印簽核文件功能，\n請先將公文執行傳送，\n請於【會核中-主辦】開啟本份公文，再執行列印簽核文件。");
		return;
	}
	
	// 110322 Raymond 1090857 新增符合以下條件則檢核「摘要」欄(於次頁顯示)不可為空
	if(SSO_CONFIG.OrgNickName == "HAC") {	// 條件1.機關暱稱為「HAC」(客委會)
		var subjSyncDigestFldrs = theSSO.User.EnvSettings.get("WE_SUBJECT_SYNC_DIGEST_FOLDERS");
		if(subjSyncDigestFldrs.length > 0) {
			var checkFolders = '|' + subjSyncDigestFldrs + '|';
			var docFolder = '|' + fm.getDocObj().folder + "-" + fm.getDocObj().subfolder + '|';
			if(checkFolders.indexOf(docFolder) >= 0) {	// 條件2.目前公文所在資料夾符合環境變數設定
				theLogger.debug("目前資料夾'" + fm.getDocObj().folder + "-" + fm.getDocObj().subfolder + "'符合環境變數「WE_SUBJECT_SYNC_DIGEST_FOLDERS」設定(" + subjSyncDigestFldrs + ")設定");
				var msg3 = "";
				var n = fm.getDraftCounts();
				var draftIdx=0;
				var dfdCheck = $.Deferred();
				function doCheck() {
					if(draftIdx < n) {
						fm.accquireDraftModel(draftIdx).done(function(dm) {
							if(!!dm && dm.getEditable()) {
								var $field = $(dm.accquireXml().documentElement).find("摘要");	// 3.有「摘要」欄才檢核
								if($field.length) {
									var pgs = dm.getLayoutedPages();
									if(!pgs && fm.getDocObj().signType == "E")	// 若DraftMgmt.xml未記錄"分頁後總頁數", 線上簽核改以封裝檔或SignWork.xml的記錄為判斷依據
										pgs = fm.getDraftPageCounts(draftIdx);
									else if(!pgs) {
										// TODO: 紙本未記錄"分頁後總頁數"
									}
									if($field.text() == "" && pgs > 1) {	// 4.稿件頁數2頁以上才檢核
										theLogger.warn("#" + (draftIdx+1) + ":" + dm.getDraftName() + "有" + pgs + "頁但「摘要」欄未設定");
										if(msg3.length > 0)
											msg3 += "、";
										msg3 += dm.getDraftName();
									}
								}
							}
						}).always(function() {
							draftIdx++;
							doCheck();
						});
					}
					else if(msg3.length > 0) {
						msg3 += "未設定「摘要」，請修正後再列印簽核文件。";
						dfdCheck.reject(msg3);
					}
					else
						dfdCheck.resolve();
				}
				dfdCheck.promise()
				.done(proceedPrint)	// 檢核通過，繼續列印作業
				.fail(function(errText) {
					alert(errText);
				});
				doCheck();	// 開始檢核第1筆稿件
			}
			else
				proceedPrint();	// 目前公文所在資料夾不符合環境變數設定不需要檢核, 繼續列印作業
		}
		else
			proceedPrint();	// 環境變數WE_SUBJECT_SYNC_DIGEST_FOLDERS未設定不需要檢核, 繼續列印作業
	}
	else
		proceedPrint();	// 機關暱稱不是「HAC」(客委會)不需要檢核, 繼續列印作業
	function proceedPrint() {	// 將整段列印程式碼切出來一個function, 以供客委會對所有稿件的「摘要」不可為空的非同步檢核機制
	
	//1060612	Leslie[1060211]	增修可紀錄使用者列印選項功能
	var defaultSet = {};	//用於紀錄預設值(減少紀錄多餘屬性)
	// 1061215 Raymond 1060735 以SSO_CONFIG.js新增的keepPrintFormat參數決定是否記憶printXslName(列印格式)
	// 1061024 Raymond 1060980 修正不記錄'套用自訂'選項, 此選項改依文稿根節點記錄的'套用自訂屬性'決定是否套用自訂段落屬性
	// 1060914 Raymond 1060735 修正不記錄"列印格式"選項, 以避免多樣版文別無法依原本套用的樣版名稱預設
	//1060628	Leslie[1060539]	修正不再記錄"受文者行文保密"選項
	//var recordAtt = ['printXslName','printFont','printLineHeight','applyCustom','applyTCMode','printMailMerge','printSingleReceiver','keepSecret','keepSecret2','printSealMark','printSealMarkAtSamePos','printBarcode','printPageNo','BothSide'];
	//var recordAtt = ['printXslName','printFont','printLineHeight','applyCustom','applyTCMode','printMailMerge','printSingleReceiver','printSealMark','printSealMarkAtSamePos','printBarcode','printPageNo','BothSide'];
	//var recordAtt = ['printFont','printLineHeight','applyCustom','applyTCMode','printMailMerge','printSingleReceiver','printSealMark','printSealMarkAtSamePos','printBarcode','printPageNo','BothSide'];
	if(SSO_CONFIG.keepPrintFormat)
		var recordAtt = ['printXslName','printFont','printLineHeight','applyTCMode','printMailMerge','printSingleReceiver','printSealMark','printSealMarkAtSamePos','printBarcode','printPageNo','BothSide'];
	else
		var recordAtt = ['printFont','printLineHeight','applyTCMode','printMailMerge','printSingleReceiver','printSealMark','printSealMarkAtSamePos','printBarcode','printPageNo','BothSide'];
	var strUserPrintSet = theSSO.User.EnvSettings.get("USER_PRINT_SETTING");
	var userPrintSet = {};
	// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式不要呼叫GetUserEnvSetting
	//if(strUserPrintSet == ""){
	if(strUserPrintSet == "" && (!theSSO || theSSO.offlineMode != true)){
		strUserPrintSet = theWebServices.QueryDoc.GetUserEnvSetting(theSSO.Artifact,"USER_PRINT_SETTING").RtnStr;
		theSSO.User.EnvSettings["USER_PRINT_SETTING"] = strUserPrintSet;
	}
	if(strUserPrintSet != ""){
		userPrintSet = JSON.parse(strUserPrintSet);
		theLogger.log("Load EnvSettings[USER_PRINT_SETTING] Done~");
	}
	//1060612	Leslie[1060211]	增修可紀錄使用者列印選項功能	--END--
	
	var isIE = navigator.userAgent.indexOf("Trident") > 0;	// 2016.12.1 新增IE旗標
	// 2016.12.1 新增使用IE列印時邊界反推
	var pm = 0;
	if(isIE && "printMarginForIE" in SSO_CONFIG && SSO_CONFIG.printMarginForIE > 0) {
		pm = 0 - SSO_CONFIG.printMarginForIE;
	}
	
	var bBothSide = false;	// 2017.2.23	Leslie	新增全域雙面列印設定值，預設勾選	//2017.3.8	Leslie	改為預設不勾選
	var bBW = true;	// 1110623 Raymond 1110416 合併一代1030961, 新增指定列印紙本附件時的色彩模式, 預設為彩色	1110916 Raymond 序290 改為預設黑白
	var bShowAllComments = false;	// 1111026 Raymond 1110864 合併1101468, 新增全域的顯示完整意見設定值, 預設不勾選, 啟用分文稿記錄簽核意見功能時, 會改用各文稿選項物件中的showAllComments, 不使用全域的
	var bFilterNUK = false;	// 1111026 Raymond 1110864 合併1101468, 新增全域的僅顯示完整意見設定值, 預設不勾選, 啟用分文稿記錄簽核意見功能時, 會改用各文稿選項物件中的filterNUK, 不使用全域的
	var bFilterTAITRA = false;	// 1141014 Raymond 1141129 新增全域的列印簽核物件資訊頁(內部意見)設定值, 預設不勾選, 啟用分文稿記錄簽核意見功能時, 會改用各文稿選項物件中的filterTAITRA, 不使用全域的
	
	// 1110615 Raymond 1110416 合併一代1030961, 新增環境變數是否啟用密件列印浮水印
	var enableSpecialWaterMark = theSSO.User.EnvSettings.get("WE_SPECIAL_WATERMARK") == "1";
	var specialWaterMarkSetting = undefined;
	var _rndrAtt = undefined;	// 密件只能紙本簽核, 紙本簽核又無匯出的附件頁面影像, 在列印時要提供即時匯出頁面再套用密件浮水印之功能
	if(enableSpecialWaterMark) {
		_rndrAtt = new RndrAtt();
		var foundRsrc = null;
		thePublicRsrc.enumDirs("其他", function(dir) {	// 在'其他'子目錄下
			for(var i=0; i<dir.children.length; i++) {
				if(dir.children[i].type == 1) {	// RsrcFile
					var nm = dir.children[i].name;
					if(nm == "密件公文浮水印設定檔") {
						theLogger.log("找到'密件公文浮水印設定檔'的資源檔'" + dir.children[i].remote.path + "'");
						foundRsrc = dir.children[i];
						return false;
					}
				}
				else {	// RsrcDir
					var res = arguments.callee(dir.children[i]);
					if(typeof res === "boolean" && res == false)
						return false;
				}
			}
		});
		if(!!foundRsrc) {
			theCacheMgr.get({type: "rsrc", rsrc: foundRsrc})
				.done(function(txt) {
					if(txt != undefined) {
						theLogger.log("下載密件公文浮水印設定檔資源檔成功! 建立密件公文浮水印設定");
						theLogger.log(txt);
						specialWaterMarkSetting = JSON.parse(txt);
						theLogger.log(specialWaterMarkSetting);
					}
				})
				.fail(function(errorText) {
					theLogger.error("下載密件公文浮水印設定檔資源檔失敗! " + errorText)
				});
		}
		else
			theLogger.warn("找不到'密件公文浮水印設定檔'的資源檔, 無法建立密件公文浮水印設定");
		
	}
	
	// 1120606 Raymond 1120515 新增判斷環境變數是否有設定, 若有設定則判斷OwnRoleID是否符合設定之一, 若不符合則不允許套用騎縫章, 未設定環境變數時允許套用騎縫章
	var allowUseSealMark = true;
	var sAllowUseSealMarkRoles = theSSO.User.EnvSettings.get("WE_ALLOW_USE_SEALMARK_ROLES");
	if(!!sAllowUseSealMarkRoles) {
		var allowUseSealMarkRoles = sAllowUseSealMarkRoles.split(",");
		// 1140422	Leslie[1131223]	[退輔會]增修騎縫章顯示邏輯，一律僅於列印時顯示
		// if(allowUseSealMarkRoles.indexOf(fm.getDocObj().ownRoleId) < 0) {
		if(allowUseSealMarkRoles.indexOf(fm.getDocObj().ownRoleId) < 0 && allowUseSealMarkRoles.indexOf('ODPRINT') < 0) {
			theLogger.log("公文目前流程點的角色(OwnRoleID:" + fm.getDocObj().ownRoleId + ")不符合環境變數「WE_ALLOW_USE_SEALMARK_ROLES」設定(" + sAllowUseSealMarkRoles + "), 禁止套用騎縫章");
			allowUseSealMark = false;
		}
	}
	
	// 1090831 Raymond 1090529 若機關暱稱為SMEG(信保基金), 檢查是否是AKI800調閱公文, 若是則檢查應否套用強制浮水印
	var uo = fm.getUNVObj();
	// 1100623 Raymond 1100780 新增一般機關也可套用強制浮水印功能
	//if(theUserInfo.OrgNickName == "SMEG" && !!uo && typeof uo.UnvRoot.ForceWaterMark === "string" && uo.UnvRoot.ForceWaterMark.match(/true/i)) {
	if(!!uo && typeof uo.UnvRoot.ForceWaterMark === "string" && uo.UnvRoot.ForceWaterMark.match(/true/i)) {
		theLogger.log("本件公文為AKI800調閱公文且需列印強制浮水印");
		window.tmpApplyFwm = true;
		window.tmpFwmSettings = fm.fwmSettings;
		window.tmpFwmPath = fm.fwmPath;
		window.tmpOUName = uo.UnvRoot.OU_NAME;
		window.tmpUserId = uo.UnvRoot.USER_ID;
		window.tmpUserTitle = uo.UnvRoot.USER_TITLE;
		window.tmpClientIP = uo.UnvRoot.CLIENT_IP;
		// 1100623 Raymond 1100780 新增tmpOrgNickName及tmpUserName供套印強制浮水印時區別信保與一般機關使用
		window.tmpOrgNickName = theUserInfo.OrgNickName;
		window.tmpUserName = uo.UnvRoot.USER_NAME;
		//window.tmpFwmBlank = fm.fwmBlank;	RD-AOLPrint.js自行重新產生一份300dpi的套印影像
		if("tmpFwmText" in window)	// 1080514 Raymond 1080209 刪除套用「發文用」浮水印會設定的tmpFwmText變數, 避免前一筆開啟一般公文列印時殘留此變數的情況
			delete window.tmpFwmText;
	}
	else {
		if(!!uo)
			theLogger.log("本件公文為AKI800調閱公文但不需列印強制浮水印");
		else
			theLogger.log("本件公文非AKI800調閱公文, 不需列印強制浮水印");
		window.tmpApplyFwm = false;
	}
	// 1100217 Raymond 1090610 合併內政部1071265, 列印進度子視窗
	var progbar = function() {	
		var _ttPgs = 0;				// 總頁數
		var _criteria = null;		// 限制超過幾頁就要暫停
		var _progCriteria = null;	// 計算下一次超過基準的頁數
		var _onPause = null;		// 暫停時callback function
		var _progPgs = 0;			// 目前已列印頁數
		var _enableBatch = false;	// 是否批次列印
		return {
			ttPgs: _ttPgs,
			progPgs: _progPgs,
			init: function(totalPages, criteria, enableBatch, onPause) {	// 總頁數, 暫停頁數, 暫停時叫用callback
				_ttPgs = totalPages;
				_criteria = criteria;
				_enableBatch = enableBatch;
				_onPause = onPause;
				_progCriteria = criteria;
				_progPgs = 0;
				var markup = [
					'<div id="confirmOverlay">',
					'<div id="confirmBox">',
					'<h1>列印...</h1>',
					'<div class="confirmItems">',
					'<div id="desc" style="margin: 0px 1em">預估列印' + _ttPgs + '頁</div>',
					'<div id="extraDesc" style="margin: 1em 1em -0.5em"></div>',
					'<input id="progbar" name="progbar" data-role="none" data-corner="false">',
					'<input id="batchPrint" type="checkbox" data-theme="c"' + ((enableBatch)?' checked':'') + '><label for="batchPrint">分批(約　　　　頁)列印</label></div>',
					'<div id="confirmButtons">',
					'<button id="pause" data-corner="false" data-shadow="false" data-theme="b">繼續</button>',
					'<button id="cancel" data-corner="false" data-shadow="false">取消</button>',
					'</div></div></div>'
				].join('');
				$(markup).appendTo("body").trigger("create");
				$("#progbar").attr({'name':'progbar','data-highlight':'true','min':'0','max':_ttPgs,'value':'0','type':'range'}).slider({
					create: function( event, ui ) {
						$(this).parent().find('input').hide();
						$(this).parent().find('input').css('margin-left','-9999px'); // Fix for some FF versions
						$(this).parent().find('.ui-slider-track').css('margin','0 15px 0 15px');
						$(this).parent().find('.ui-slider-handle').hide();
					}
				}).slider("refresh");
				$("<input id='criteria' data-role='none' type='number' min='1' value='" + _criteria + "'>").appendTo($("#batchPrint").closest(".ui-checkbox"))
					.css({position: "absolute", left: "100px", top: "20px", width:"3em", zIndex: "10"})
					.on("change", function() {
						_criteria = parseInt(this.value);
						_progCriteria = _progPgs + _criteria;	// 計算下一次應暫停的頁數
						localStorage["batchPrintCriteria"] = this.value;
					});
				$("#batchPrint").on("click", function() {
					_enableBatch = $(this).prop("checked");
					localStorage["enableBatchPrint"] = _enableBatch;
				});
			},
			pause: function(desc) {
				var dfd = $.Deferred();
				if(!!desc && desc.length)
					$("#progbar").closest("#confirmBox").find("#desc").text(desc);
				$("#confirmBox #pause").one("click", function() {
					dfd.resolve();
				});
				$("#confirmBox #cancel").one("click", function() {
					$("#confirmOverlay").remove();
					dfd.reject("使用者取消列印");
					// 1110722 Raymond 1110416 若啟用密件浮水印則清除工作站上暫存影像檔的子目錄
					if(enableSpecialWaterMark && !!_rndrAtt) {
						theLogger.log("分批列印中取消列印, 清除工作站上暫存影像檔的子目錄");
						_rndrAtt.clearProcData();
					}
				});
				return dfd.promise();
			},
			adv: function(delta, noPause) {
				var dfd = $.Deferred();
				_progPgs += delta;
				$("#progbar").val(_progPgs).slider("refresh");
				if(delta > 0 && _enableBatch && SSOUtil.typeOf(_criteria) == "number" && _progPgs >= _progCriteria) {	// 超過限制頁數要暫停等使用者按"繼續"
					if(noPause) {	// 傳入noPause為true時, 例如附件隨本文一併列印時, 為避免頁次及騎縫章中斷, 不要暫停
						setTimeout(function() {dfd.resolve();}, 100);
					}
					else {
						if($.isFunction(_onPause))
							_onPause();	// 叫用暫停時callback function
						$("#progbar").closest("#confirmBox").find("#desc").text("己列印" + _progPgs + "頁，請檢視列印分頁並列印完畢後再點擊「繼續」鈕，列印後續的頁次。");
						$("#confirmBox #pause").one("click", function() {
							while(_progPgs >= _progCriteria)	// 若一次delta為_criteria的一倍以上或noPause時, 要多次遞增_progCriteria
								_progCriteria += _criteria;		// 計算下一次應暫停的頁數
							dfd.resolve();
						});
						$("#confirmBox #cancel").one("click", function() {
							$("#confirmOverlay").remove();
							dfd.reject("使用者取消列印");
						});
					}
				}
				else
					setTimeout(function() {dfd.resolve();}, 100);
				return dfd.promise();
			},
			text: function(str) {
				$("#progbar").closest("#confirmBox").find("#extraDesc").text(str);
			},
			close: function() {
				$("#confirmOverlay").remove();
			}
		}
	}();
	
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
	// 1141114 Raymond 1141356 修正勾選「列印簽核物件資訊頁」後, 列印的目前流程點所新增的簽核物件左上角沒有顯示序號的問題
	//var noStyles = "position:absolute;left:-0.5em;top:-0.5em;border:1px solid gray;background-color:rgba(245,222,179,0.8)";
	var noStyles = "position:absolute;left:-0.5em;top:-0.5em;border:1px solid gray;background-color:rgba(245,222,179,0.8);font-size:16px";
	// 1101110 Raymond 1101199 新增依環境變數設定啟用文字意見及簽核物件資訊頁、分繕變數表的標楷體加套"全字庫正楷體"字型功能
	var useCNSFontForTxObj = false;
	var dtb = navigator.userAgent.match(/Chrome\/(\d+)/);
	if(!!dtb && dtb[1] >= 94) {	// 判斷是Chrome且94版以上
		var printUseCNSFont = theSSO.User.EnvSettings.get("AOL_PRINT_USE_CNSFONT");	// Y為啟用, N或未設定為不啟用, 環境變數允許設定兩個字, 第一個字代表列印線上簽核文稿的「文」格式的發文用、簽核及繕校用及紙本簽核文稿的「文」或「稿」格式時是否啟用此功能, 第二個字代表列印線上簽核文稿的「稿」格式時是否啟用此功能, 分開設定是怕萬一線上簽核文稿的「稿」格式套用了"全字庫正楷體", 由於字寬等與"標楷體"不一致時, 可能發生列印結果頁面與簽核頁面不一致, 而導致簽核物件位置不正確的問題
		if(printUseCNSFont.length > 1)												// 線上簽核公文的「稿」格式, 若環境變數有設定第二個字
			useCNSFontForTxObj = printUseCNSFont[1] == 'Y';							// 以環境變數設定的第二個字控制是否啟用套用"全字庫正楷體"字型功能
	}
	// 2017.2.8 建立章戳類型簽核物件
	function _createStampSO(so, $parent, offsetLP, dfd, no) {
		var areaLP = DPtoLP(so.content.area, "mm");
		var w = areaLP.right - areaLP.left,
			h = areaLP.bottom - areaLP.top;
		var $img = $("<div class='sign-obj so-stamp' data-id='" + so.id + "'>" + ((!!no)?"<span style='" + noStyles + "'>" + no + "</span>":"") + "<img/></div>").appendTo($parent).css({
				position: "absolute",
				left: (offsetLP.x + pm) + "mm",	// 2017.2.15 配合修正IE列印邊界問題
				top: (offsetLP.y + pm) + "mm"})
			.find("img").css({
				width: w + "mm",
				height: h + "mm"});
		// 1090825 Raymond 1090620 來文及附件頁面上的簽核物件不需要事先套用IE列印時邊界反推
		if(isIE && $parent.find("> img").hasClass("attachment"))
			$img.parent().css({left: offsetLP.x + "mm", top: offsetLP.y + "mm"});
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
		// 2016.3.7 新增不套用職名章顏色
		if(SSO_CONFIG && "applySignetColor" in SSO_CONFIG && SSO_CONFIG.applySignetColor == false) {
			fm.getSignFolder().getSODataURL(so).done(function(dataUrl) {
				so.imgData = dataUrl;
				$img.get(0).src = dataUrl;
				dfd.resolve();	// 非同步完成章戳下載顯示
			})
			.fail(function(errorText) {
				theLogger.error("下載章戳簽核物件(ID:" + so.id + ")失敗! " + errorText);
				dfd.reject(errorText);
			});
		}
		else {
			var canvas = document.createElement("canvas");
			var img = new Image();
			img.onload = function() {
				theLogger.log("image.onload - width: " + this.width + ", height: " + this.height);
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
				dfd.resolve();	// 非同步完成章戳下載及變色顯示
			}
			fm.getSignFolder().getSODataURL(so).done(function(dataUrl) {
				theLogger.warn("章戳ID:'" + so.id + "'鏈結網址:" + dataUrl);	// 2016.11.25 新增Log記錄以追蹤下載網址問題
				//so.imgData = dataUrl;	// 2015.11.18 記錄影像dataUrl, 供檢核職名
				img.src = dataUrl;
			})
			.fail(function(errorText) {
				theLogger.error("下載章戳簽核物件(ID:" + so.id + ")失敗! " + errorText);
				dfd.reject(errorText);
			});
		}
	}
	// 2017.2.8 建立圖檔類型簽核物件
	function _createImageSO(so, $parent, offsetLP, $pg, dfd, no) {
		var areaLP = DPtoLP(so.content.area, "mm");   // 2016.2.25 先將座標值轉成邏輯座標
		var $img = $("<div class='sign-obj so-img' data-id='" + so.id + "'>" + ((!!no)?"<span style='" + noStyles + "'>" + no + "</span>":"") +
			"<img src='image/AOL/sketch_comment.bmp' style='display:" + ((so.asIcon)?"inline":"none") + "'></img>" +
			"<img style='display:" + ((so.asIcon)?"none":"inline") + ";vertical-align:top'></img></div>").appendTo($parent).css({	// 2017.2.15 加上vertical-align以免數位墨水物件徧下
				position: "absolute",
				left: (offsetLP.x - (so.asIcon?4:0) + pm) + "mm",	// 2017.2.15 配合修正IE列印邊界問題
				top: (offsetLP.y - (so.asIcon?4:0) + pm) + "mm"});
		// 1090825 Raymond 1090620 來文及附件頁面上的簽核物件不需要事先套用IE列印時邊界反推
		if(isIE && $parent.find("> img").hasClass("attachment"))
			$img.css({left: (offsetLP.x - (so.asIcon?4:0)) + "mm", top: (offsetLP.y - (so.asIcon?4:0)) + "mm"});
		//if(!so.asIcon)	// 2016.2.25 FIX位於簽核區域內的圖檔沒有寬高問題
			$img.find("img").eq(1).css({width: (areaLP.right - areaLP.left) + "mm", height: (areaLP.bottom - areaLP.top) + "mm"});
		fm.getSignFolder().getSODataURL(so).done(function(dataUrl) {
			if(so.content.maskBkgnd == "Y") {// 去背
				var canvas = document.createElement("canvas");
				var img = new Image();
				img.onload = function() {
					theLogger.log("image.onload - width: " + this.width + ", height: " + this.height);
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
					// 1080521 Raymond 1080370 用imgData記錄網址供列印貼式簽核物件頁面時下載顯示
					//$img.find("img").get(1).src = canvas.toDataURL("image/png");
					$img.find("img").get(1).src = so.imgData = canvas.toDataURL("image/png");
					dfd.resolve();	// 非同步完成圖檔下載及背景透明化顯示
				}
				img.src = dataUrl;	// 用img.onload去背
			}
			else {
				// 1080521 Raymond 1080370 用imgData記錄網址供列印貼式簽核物件頁面時下載顯示
				//$img.find("img").get(1).src = dataUrl;
				$img.find("img").get(1).src = so.imgData = dataUrl;
				dfd.resolve();	// 非同步完成圖檔下載及顯示
			}
		})
		.fail(function(errorText) {
			theLogger.error("下載圖檔簽核物件(ID:" + so.id + ")失敗! " + errorText);
			dfd.reject(errorText);
		});
	}
	// 2017.2.8 建立文字類型簽核物件
	function _createTextSO(so, $parent, offsetLP, $pg, no) {
		// 2016.10.3 新增title資訊
		var $tx = $("<div class='sign-obj so-text' data-id='" + so.id + "'>" + ((!!no)?"<span style='" + noStyles + "'>" + no + "</span>":"") +
			"<img src='image/AOL/txt_comment.bmp' style='display:" + ((so.asIcon)?"inline":"none")+ "'>" +
			"<div style='display:" + ((so.asIcon)?"none":"block") +
				";writing-mode:" + ((so.content.orient == "直書")?"tb-rl":"lr-tb") +
				// 1101110 Raymond 1101199 新增依環境變數設定啟用文字意見的標楷體加套"全字庫正楷體"字型功能
				//";font-family:" + so.content.font.name +
				";font-family:" + ((so.content.font.name == "標楷體" && useCNSFontForTxObj)?"全字庫正楷體,":"") + so.content.font.name +
				";font-size:" + (so.content.font.size+"pt") +
				";line-height:1" +	// 1060511 Raymond 修正預設行高與簽核頁面不一致問題, 航港-序508
				// 1081217 Raymond FIX XSS & 保留折行
				//";color: rgb(" + so.content.font.color.r + "," + so.content.font.color.g + "," + so.content.font.color.b + ")'>" +
				//so.content.text.replace(/\n/g, '<br>') + "</div></div>").appendTo($parent).css({
				";color: rgb(" + so.content.font.color.r + "," + so.content.font.color.g + "," + so.content.font.color.b + ")" +
				";white-space:pre'>" + "</div></div>").appendTo($parent).css({
					position: "absolute",
					left: (offsetLP.x - (so.asIcon?4:0) + pm) + "mm",	// 2017.2.15 配合修正IE列印邊界問題
					top: (offsetLP.y - (so.asIcon?4:0) + pm) + "mm"});
		// 1090825 Raymond 1090620 來文及附件頁面上的簽核物件不需要事先套用IE列印時邊界反推
		if(isIE && $parent.find("> img").hasClass("attachment"))
			$tx.css({left: (offsetLP.x - (so.asIcon?4:0)) + "mm", top: (offsetLP.y - (so.asIcon?4:0)) + "mm"});
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
		
		/* 2015.11.18 位於簽核區域內的文字意見額外設定寬度, 以使其可超出區域顯示
		var $test = $("<div style='position:absolute'></div>").append($tx.find("div").clone(true)).appendTo("body");
		var cx = $test.width();
		$tx.find("div").css("width", (cx + 2) + "px");
		$test.remove();*/
	}
	// 2017.2.8 建立簽核框內物件元素(not used)
	function buildSOTypeA(sod, signArea, $pg) {
		var so = sod.ref;
		if(!so) {
			theLogger.error("簽核物件記錄(ID:" + sod.id + ")無實際對應物件可顯示");
			return;
		}
		if(so.type == "章戳") {
			var offsetLP = DPtoLP(sod.offset, "mm");
			_createStampSO(so, signArea.$area, offsetLP);
		}
		else if(so.type == "圖檔") {
			var offsetLP = DPtoLP(sod.offset, "mm");
			_createImageSO(so, signArea.$area, offsetLP, $pg);
		}
		else if(so.type == "文字意見") {
			var offsetLP = DPtoLP(sod.offset, "mm");
			_createTextSO(so, signArea.$area, offsetLP, $pg);
		}
		else {
			theLogger.warn("未支援的簽核物件(" + so.type + ")!");
		}
	}
	// 2017.2.8 建立參照模式下的簽核框內物件元素
	function _buildSOTypeA2(sod, signArea, $pg, no) {
		var dfd = $.Deferred();
		var so = sod.ref;
		if(!so) {
			theLogger.error("簽核物件記錄(ID:" + sod.id + ")無實際對應物件可顯示");
			dfd.reject("簽核物件記錄(ID:" + sod.id + ")無實際對應物件可顯示");	// 2017.2.18 bugfix
		}
		else if(so.type == "章戳") {
			var offsetLP = DPtoLP({x:parseInt(sod.offset.x) + parseInt(signArea.left), y:parseInt(sod.offset.y) + parseInt(signArea.top)}, "mm");
			_createStampSO(so, $pg, offsetLP, dfd, no);
		}
		else if(so.type == "圖檔") {
			var offsetLP = DPtoLP({x:parseInt(sod.offset.x) + parseInt(signArea.left), y:parseInt(sod.offset.y) + parseInt(signArea.top)}, "mm");
			_createImageSO(so, $pg, offsetLP, $pg, dfd, no);
		}
		else if(so.type == "文字意見") {
			var offsetLP = DPtoLP({x:parseInt(sod.offset.x) + parseInt(signArea.left), y:parseInt(sod.offset.y) + parseInt(signArea.top)}, "mm");
			_createTextSO(so, $pg, offsetLP, $pg, no);
			dfd.resolve();
		}
		else {
			theLogger.warn("未支援的簽核物件(" + so.type + ")!");
			dfd.resolve();
		}
		return dfd.promise();
	}
	// 2017.2.8 建立簽核框外物件元素
	function _buildSOTypeB(sod, $pg, no) {
		var dfd = $.Deferred();
		var so = sod.ref || sod;	// 2017.1.25 來文簽辦的簽核物件是直接用原來的so
		if(so.type == "章戳") {
			// 1130605 Raymond 1130120 修正文稿頁面上的簽核框外物件也可套用外部簽核記錄檔所記錄的座標
			if("pos" in sod) {
				var posLP = DPtoLP(sod.pos, "mm");
				_createStampSO(so, $pg, posLP, dfd, no);
			}
			else {	// so沒有pos表示是原封裝檔記錄的簽核物件, 非外部簽核記錄檔的
				var areaLP = DPtoLP(so.content.area, "mm");
				_createStampSO(so, $pg, {x:areaLP.left, y:areaLP.top}, dfd, no);
			}
		}
		else if(so.type == "圖檔") {
			// 1130605 Raymond 1130120 修正文稿頁面上的簽核框外物件也可套用外部簽核記錄檔所記錄的座標
			if("pos" in sod) {
				var posLP = DPtoLP(sod.pos, "mm");
				_createImageSO(so, $pg, posLP, $pg, dfd, no);
			}
			else {	// so沒有pos表示是原封裝檔記錄的簽核物件, 非外部簽核記錄檔的
				var areaLP = DPtoLP(so.content.area, "mm");
				_createImageSO(so, $pg, {x:areaLP.left, y:areaLP.top}, $pg, dfd, no);
			}
		}
		else if(so.type == "文字意見") {
			// 1130605 Raymond 1130120 修正文稿頁面上的簽核框外物件也可套用外部簽核記錄檔所記錄的座標
			if("pos" in sod)
				var posLP = DPtoLP(sod.pos, "mm");
			else	// so沒有pos表示是原封裝檔記錄的簽核物件, 非外部簽核記錄檔的
				var posLP = DPtoLP(so.content.pos, "mm");
			_createTextSO(so, $pg, posLP, $pg, no);
			dfd.resolve();
		}
		else {
			theLogger.warn("未支援的簽核物件(" + so.type + ")!");
			dfd.resolve();
		}
		return dfd.promise();
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

	function _buildSO(fm, idx, so, pg, $pg) {
		theLogger.log("封裝檔已存在的簽核物件 - #" + (idx+1) + "  $pg.pgIdx=" + $pg.attr("data-pgIdx"));
		theLogger.log(so);
		
		var dfd = $.Deferred();
		if(so.type == "章戳") {
			theLogger.log("章戳位置:(" + so.content.area.left + "," + so.content.area.top + "," + so.content.area.right + "," + so.content.area.bottom + ")");	// 2016.12.1 fix for 還沒顯示過的頁面不會有pageExt的問題
			
			var areaLP = DPtoLP(so.content.area, "mm");   // 先將座標值轉成邏輯座標
			var w = areaLP.right - areaLP.left,
				h = areaLP.bottom - areaLP.top;
			var $img = $("<div class='sign-obj so-stamp' data-id='" + so.id + "'><img/></div>").appendTo($pg).css({
							position: "absolute",
							left: (areaLP.left + pm) + "mm",	// 2016.12.1 新增使用IE列印時邊界反推
							top: (areaLP.top + pm) + "mm"})		// 2016.12.1 新增使用IE列印時邊界反推
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
			}
			// 2016.3.7 新增不套用職名章顏色
			if(SSO_CONFIG && "applySignetColor" in SSO_CONFIG && SSO_CONFIG.applySignetColor == false) {
				fm.getSignFolder().getSODataURL(so).done(function(dataUrl) {
					//so.imgData = dataUrl;
					$img.get(0).src = dataUrl;
					dfd.resolve();
				});
			}
			else {
				var canvas = document.createElement("canvas");
				var img = new Image();
				img.onload = function() {
					theLogger.log("image.onload - width: " + this.width + ", height: " + this.height);
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
					}
					ctx.putImageData(picData, 0, 0);
					$img.get(0).src = canvas.toDataURL("image/png");
					dfd.resolve();
				}
				fm.getSignFolder().getSODataURL(so).done(function(dataUrl) {
					//so.imgData = dataUrl;	// 2015.11.18 記錄影像dataUrl, 供檢核職名
					img.src = dataUrl;
				});
			}
		}
		else if(so.type == "圖檔") {
			var areaLP = DPtoLP(so.content.area, "mm");   // 先將座標值轉成邏輯座標
			var w = areaLP.right - areaLP.left,
				h = areaLP.bottom - areaLP.top;
			var $img = $("<div class='sign-obj so-img' data-id='" + so.id + "' title=''>\
<img src='image/AOL/sketch_comment.bmp' style='display:" + ((so.asIcon)?"inline":"none") + "'></img>\
<img style='display:" + ((so.asIcon)?"none":"inline") + "'></img></div>")
				.appendTo($pg)
				.css({position: "absolute", left: (areaLP.left + pm - (so.asIcon?4:0)) + "mm", top: (areaLP.top + pm - (so.asIcon?4:0)) + "mm"});// 2016.12.1 新增使用IE列印時邊界反推
			fm.getSignFolder().getSODataURL(so).done(function(dataUrl) {
				if(so.content.maskBkgnd == "Y") {// 去背
					var canvas = document.createElement("canvas");
					var img = new Image();
					img.onload = function() {
						theLogger.log("image.onload - width: " + this.width + ", height: " + this.height);
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
						dfd.resolve();
					}
					img.src = dataUrl;	// 用img.onload去背
				}
				else {
					$img.find("img").get(1).src = dataUrl;
					dfd.resolve();
				}
			});
		}
		else if(so.type == "文字意見") {
			var posLP = DPtoLP(so.content.pos, "mm");   // 先將座標值轉成邏輯座標
			var $tx = $("<div class='sign-obj so-text' data-id='" + so.id + "' title=''>\
<img src='image/AOL/txt_comment.bmp' style='display:" + ((so.asIcon)?"inline":"none")+ "'>\
<div style='display:" + ((so.asIcon)?"none":"block") +
			";writing-mode:" + ((so.content.orient == "直書")?"tb-rl":"lr-tb") +
			// 1101110 Raymond 1101199 新增依環境變數設定啟用文字意見的標楷體加套"全字庫正楷體"字型功能
			//";font-family:" + so.content.font.name +
			";font-family:" + ((so.content.font.name == "標楷體" && useCNSFontForTxObj)?"全字庫正楷體,":"") + so.content.font.name +
			";font-size:" + (so.content.font.size+"pt") +
			";line-height:1" +	// 2017.3.21 fix for 預設行高與簽核頁面不一致問題, 航港-序508
			// 1081217 Raymond FIX XSS & 保留折行
			//";color: rgb(" + so.content.font.color.r + "," + so.content.font.color.g + "," + so.content.font.color.b + ")'>" + so.content.text.replace(/\n/g, '<br>') + "</div></div>")
			";color: rgb(" + so.content.font.color.r + "," + so.content.font.color.g + "," + so.content.font.color.b + ")" +
			";white-space:pre'>" + "</div></div>")
				.appendTo($pg)
				.css({position: "absolute", left: (posLP.x + pm - (so.asIcon?4:0)) + "mm", top: (posLP.y + pm - (so.asIcon?4:0)) + "mm"});// 2016.12.1 新增使用IE列印時邊界反推
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
			dfd.resolve();
		}
		else {
			theLogger.error("不支援的簽核物件類型:" + so.type);
			dfd.resolve();
		}
		return dfd.promise();
	}

	function _buildSOX(fm, idx, so, pg, $pg, no) {	// 2017.2.8 新增no參數
		theLogger.log("暫存檔的簽核物件 - #" + (idx+1) + "  $pg.pgIdx=" + $pg.attr("data-pgIdx"));
		theLogger.log(so);
		// 1110913 Raymond 1101369 修正列印有重複會辦單位的簽稿會核單上的暫存簽核物件時, 蓋在第二個重複會辦單位簽核框中的簽核物件仍會顯示在第二個重複會辦單位的位置, 與簽核頁面是自動移到第一個重複會辦單位簽核框內的行為不一致的問題
		function _reparentSO(so, $so) {
			var $sa = $pg.find("div.sign-area").filter(function(idx, elm) {
				if($(elm).attr("data-satype") == so.saType &&
					$(elm).attr("data-id") == so.saID)
					return true;
				return false;
			});
			if($sa.length) {
				$so.appendTo($sa.eq(0));
				$so.css({left: so.offset.left, top: so.offset.top});
			}
		}
		var dfd = $.Deferred();
		if("type" in so) {
			if(so.type.match(/^stamp/)) {	// 章戳有圖檔章戳(stamp)、文字章戳(stamp.text)、職名章(stamp.signet)三種
				var $so = $("<div class='sign-obj so-stamp' data-id='" + so.id + "' title='" + so.info + "'>" + ((!!no)?"<span style='" + noStyles + "'>" + no + "</span>":"") + "<img style='width:1.04in;'/></div>")
					.appendTo($pg)
					.css({position: "absolute", left: so.pos.left + (3.78 * pm), top: so.pos.top + (3.78 * pm)});	// 2016.12.1 新增使用IE列印時邊界反推
				// 1090826 Raymond 1090620 來文及附件頁面上的簽核物件不需要事先套用IE列印時邊界反推
				if(isIE && $pg.find("> img").hasClass("attachment"))
					$so.css({left: so.pos.left, top: so.pos.top});
				// 1110913 Raymond 1101369 修正列印有重複會辦單位的簽稿會核單上的暫存簽核物件時, 蓋在第二個重複會辦單位簽核框中的簽核物件仍會顯示在第二個重複會辦單位的位置, 與簽核頁面是自動移到第一個重複會辦單位簽核框內的行為不一致的問題
				if(!!so.saID)
					_reparentSO(so, $so);
				if(so.type == "stamp" || so.type == "stamp.signet") {
					// 如果so帶size屬性則取代預設寬高
					if(so.size !== undefined)
						$so.find("img").css(so.size);
					// 是否顯示時間戳記
					if(so.dispTime == true) {
						function _reformat(oTime) {    // 格式化日期時間為 XXXX<BR>OOOO格式
							if(theSSO.User.EnvSettings.get('AOL_SIGNET_TIMESTAMP_SHOW_YEAR') == 'Y')
								return Util.padLeft(oTime.getYear() - 11, 3) + "<br>" + Util.padLeft(oTime.getMonth() + 1, 2) + Util.padLeft(oTime.getDate(), 2) + "<br>" + Util.padLeft(oTime.getHours(), 2) + Util.padLeft(oTime.getMinutes(), 2);
							return Util.padLeft(oTime.getMonth() + 1, 2) + Util.padLeft(oTime.getDate(), 2) + "<br>" + Util.padLeft(oTime.getHours(), 2) + Util.padLeft(oTime.getMinutes(), 2);
						}
						var $div = $("<div style='display:inline-block; overflow:hidden; text-align:center; color:black '>" + _reformat(so.cTime) + "</div>").appendTo($so);
						if(so.size !== undefined) {
							if(so.size.height.match(/([0-9.]+)mm/)) {   // 計算合適的時間戳記大小
								var h = Number(RegExp.$1) * 300 / 25.4;
								// 1120620 Raymond 標檢局序86 計算職名章高度實際px
								var pxh = Number(RegExp.$1) * 96 / 25.4;
								if(theSSO.User.EnvSettings.get('AOL_SIGNET_TIMESTAMP_SHOW_YEAR') == 'Y')
									// 1061018 Raymond 1060930 修正時戳顯示年時年超出職名章高度問題
									//$div.css("font-size", Math.floor(h / 12) + "pt");
									$div.css("font-size", Math.floor(h / 12) + "pt").css("line-height", "1");
								else {
									$div.css("font-size", Math.floor(h / 10) + "pt");
									// 1120620 Raymond 標檢局序86 修正職名章高度設定小於7.7mm時, 時戳字型大小計算會得出小於9的大小, 但瀏覽器最小只能顯示9pt的字, 故要再用縮小行高來調整
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
						$so.find("img").get(0).src = so.content;
						dfd.resolve();
					}
					else {
						// 改顏色
						var img = new Image();
						img.onload = function(evt) {
							//theLogger.log("img.onload..." + evt.target);
							// 職名章預設顯示紅色, 如果so帶color屬性則取代紅色
							var clr = $.extend({r:255, g:0, b:0}, so.color);
							// 2015.5.14 如果opts有透明度設定則新增a
							//if("alpha" in opts)
							//	clr.a = opts.alpha;
							$so.find("img").attr("src", Util.modifyImgColor(this, clr));
							dfd.resolve();
						}
						img.src = so.content;
						setTimeout(function() {
							if($so.find("img").get(0).src == "") {
								theLogger.log("0.1秒後背景img載入圖形未觸發onload的話, 主動呼叫img.onload");
								img.onload();
							}
						}, 100);
						//this.$so.find("img").get(0).src = this.so.content;
					}
				}
				else if(so.type == "stamp.text") {
					// 1081217 Raymond FIX XSS & 保留折行
					//$so.html("<p>" + so.content + "</p>");
					$so.html("<p style='white-space:pre'></p>");
					$so.find("p").text(so.content);
					if(so.fontSize !== undefined)
						$so.find("p").css("font-size", so.fontSize);
					if(so.fontName !== undefined)
						$so.find("p").css("font-family", so.fontName);
					if(so.fontWeight)
						$so.find("p").css("font-weight", "bolder");
					if(so.fontStyle)
						$so.find("p").css("font-style", "italic");
					//if(so.style == "底線")
					//    this.$so.find("p").css("text-decoration", "underline");
					if(so.color !== undefined)
						$so.find("p").css("color", Util.toHtmlColor(so.color));
					dfd.resolve();
				}
				else {
					theLogger.warn("未支援的簽核物件! type:'" + so.type + "'");
					dfd.resolve();
				}
			}
			// 1141114 Raymond 1141356 修正列印時不會顯示目前流程點加蓋的貼布物件問題
			//else if(so.type == "sketch") {
			else if(so.type.match(/^sketch/)) {
				var $so = $("<div class='sign-obj so-img' data-id='" + so.id + "' title='" + so.info + "'>" + ((!!no)?"<span style='" + noStyles + "'>" + no + "</span>":"") +
							"<img src='image/AOL/sketch_comment.bmp' style='display:" + ((so.asIcon)?"inline":"none") + "'></img>" +
							"<img style='display:" + ((so.asIcon)?"none":"inline") + ";vertical-align:top'></img></div>")	// 2017.2.15 加上vertical-align以免數位墨水物件徧下
					.appendTo($pg)
					.css({position: "absolute", left: so.pos.left + (3.78 * pm) - ((so.asIcon)?18:0), top: so.pos.top + (3.78 * pm) - ((so.asIcon)?18:0)});	// 2017.3.23 新增使用IE列印時邊界反推
				// 1090825 Raymond 1090620 來文及附件頁面上的簽核物件不需要事先套用IE列印時邊界反推
				if(isIE && $pg.find("> img").hasClass("attachment"))
					$so.css({left: so.pos.left - ((so.asIcon)?18:0), top: so.pos.top - ((so.asIcon)?18:0)});
				// 1110913 Raymond 1101369 修正列印有重複會辦單位的簽稿會核單上的暫存簽核物件時, 蓋在第二個重複會辦單位簽核框中的簽核物件仍會顯示在第二個重複會辦單位的位置, 與簽核頁面是自動移到第一個重複會辦單位簽核框內的行為不一致的問題
				if(!!so.saID) {
					_reparentSO(so, $so);
					// 1141114 Raymond 1141356 修正列印時目前流程點加蓋在簽核區域內的貼布物件會顯示成在別的流程點加蓋的簽核物件之下的問題
					if(so.type == "sketch.tape")
						$so.css("z-index", 1);
				}
				// 1060612 Raymond 1060414 修正當流程點加蓋圖檔章戳後, 會異常放大的問題
				if("size" in so)
					// 1090825 Raymond 1090620 修正newSignObj的數位墨水影像寬高比照signObj的圖檔, 設定在img
					//$so.css(so.size);
					$so.find("img").eq(1).css(so.size);
				// 1111228 Raymond 1111405 修正列印選用章戳(圖檔)時未去背的問題
				//$so.find("img").eq(1).attr("src", so.content);	// 2017.2.8 bugfix 未顯示數位墨水問題
				//dfd.resolve();
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
							$so.find("img").get(1).src = canvas.toDataURL("image/png");
							dfd.resolve();
						}
						img.src = so.content;	// 用img.onload去背
					}
					else {	// 不去背則直接顯示
						$so.find("img").get(1).src = so.content;
						dfd.resolve();
					}
				}
				else {	// 無maskBkgnd表示動態新增的, 尚未轉成白底檔案過, 可以直接顯示
					$so.find("img").get(1).src = so.content;
					dfd.resolve();
				}
			}
			else if(so.type == "text") {
				var $so = $("<div class='sign-obj so-text' data-id='" + so.id + "' title='" + so.info + "'>" + ((!!no)?"<span style='" + noStyles + "'>" + no + "</span>":"") +
							"<img src='image/AOL/txt_comment.bmp' style='display:" + ((so.asIcon)?"inline":"none")+ "'>" +
							"<div style='display:" + ((so.asIcon)?"none":"block") +
								// 1101110 Raymond 1101199 新增依環境變數設定啟用文字意見的標楷體加套"全字庫正楷體"字型功能
								//";font-family:" + ((so.fontName)?so.fontName:"標楷體") +		// 2015.6.25 新增指定字型
								";font-family:" + (((!so.fontName || so.fontName == "標楷體") && useCNSFontForTxObj)?"全字庫正楷體,":"") + ((so.fontName)?so.fontName:"標楷體") +		// 2015.6.25 新增指定字型
								";font-size:" + ((so.fontSize)?so.fontSize:"12pt") +
								";font-weight:" + ((so.fontWeight)?"bolder":"normal") +
								";font-style:" + ((so.fontStyle)?"italic":"normal") +
								";line-height:1" +	// 2017.3.21 fix for 預設行高與簽核頁面不一致問題, 航港-序508
								// 1081217 Raymond FIX XSS & 保留折行
								//";color:" + ((so.color)?Util.toHtmlColor(so.color):"black") + "'>" + so.content.replace(/\n/g, '<br>') + "</div></div>")
								";color:" + ((so.color)?Util.toHtmlColor(so.color):"black") +
								";white-space:pre'>" + "</div></div>")
					.appendTo($pg)
					.css({position: "absolute", left: so.pos.left + (3.78 * pm) - ((so.asIcon)?18:0), top: so.pos.top + (3.78 * pm) - ((so.asIcon)?18:0)});	// 2017.3.23 新增使用IE列印時邊界反推
				// 1090825 Raymond 1090620 來文及附件頁面上的簽核物件不需要事先套用IE列印時邊界反推
				if(isIE && $pg.find("> img").hasClass("attachment"))
					$so.css({left: so.pos.left - ((so.asIcon)?18:0), top: so.pos.top - ((so.asIcon)?18:0)});
				// 1110913 Raymond 1101369 修正列印有重複會辦單位的簽稿會核單上的暫存簽核物件時, 蓋在第二個重複會辦單位簽核框中的簽核物件仍會顯示在第二個重複會辦單位的位置, 與簽核頁面是自動移到第一個重複會辦單位簽核框內的行為不一致的問題
				if(!!so.saID)
					_reparentSO(so, $so);
				// 1081217 Raymond FIX XSS
				$so.find("> div").text(so.content);
				dfd.resolve();
			}
			else {
				theLogger.warn("未支援的簽核物件! type:'" + so.type + "'");
				dfd.resolve();
			}
		}
		else {
			theLogger.warn("簽核物件資訊錯誤, 無type!");
			dfd.resolve();
		}
		return dfd.promise();
	}

	function _printMarginText($pg, docNo, po, sum, type) {
		if(type == "draft")
			$("<div class='appendex1' style='position:absolute; left:" + (4 + pm) + "mm; top:" + ((pm < 0)?0:3) + "mm; font-size:10pt'>文稿頁面</div>").appendTo($pg);	// 2016.12.1 新增使用IE列印時邊界反推
		else if(type == "textSignObj")	// 2017.3.14 新增列印貼式文字意見頁
			$("<div class='appendex1' style='position:absolute; left:" + (4 + pm) + "mm; top:" + ((pm < 0)?0:3) + "mm; font-size:10pt'>頁面文字意見</div>").appendTo($pg);
		else if(type == "imageSignObj")	// 2017.3.14 新增列印貼式數位墨水頁
			$("<div class='appendex1' style='position:absolute; left:" + (4 + pm) + "mm; top:" + ((pm < 0)?0:3) + "mm; font-size:10pt'>頁面圖檔</div>").appendTo($pg);
		if(type == "draft" || type == "signObjs" || type == "textSignObj" || type == "imageSignObj") {	// 2017.3.14 新增貼式文字意見及數位墨水頁
			// 1110812 Raymond 1110749 新增判斷若是信保基金, 則不要顯示「文號：」資訊
			if(!theUserInfo || theUserInfo.OrgNickName != "SMEG")
			$("<div class='appendex2' style='position:absolute; right:" + ((pm < 0)?50:7) + "mm; top:" + ((pm < 0)?0:3) + "mm; font-size:10pt'>文號：" + docNo + "</div>").appendTo($pg);	// 2016.12.1 新增使用IE列印時邊界反推, 2017.3.2 文號向左移(FDA-序1292)
		}
		if(type == "pn")
			$("<div class='appendex3' style='position:absolute; left:calc(50% - " + ((pm < 0)?7:8) + "em); bottom:" + ((pm < 0)?0:3) + "mm; font-size:10pt'>線上簽核文件列印 - 第" + po + "頁/共" + sum + "頁</div>").appendTo($pg);	// 2016.12.1 新增使用IE列印時邊界反推
	}
	
	// 1110615 Raymond 1110416 合併一代1030961, 新增列印密件浮水印功能
	function _printSpecialWaterMark(type, $pg, nm, docNo, sec, decCond) {
		function doPrintDraftSpecialWaterMark() {
			if(!!specialWaterMarkSetting) {
				var autoWrap = false;	// 預設用全銜超過一行時縮小字型方式顯示
				if("General" in specialWaterMarkSetting) {
					if("半透明度" in specialWaterMarkSetting["General"])
						$pg.find(".watermark").css("opacity", specialWaterMarkSetting["General"]["半透明度"]);
					if("全銜字型" in specialWaterMarkSetting["General"])
						$pg.find(".watermark-nm").css("font-family", specialWaterMarkSetting["General"]["全銜字型"]);
					if("全銜字型大小" in specialWaterMarkSetting["General"])
						$pg.find(".watermark-nm").css("font-size", specialWaterMarkSetting["General"]["全銜字型大小"] + "pt");
					if("文號字型" in specialWaterMarkSetting["General"])
						$pg.find(".watermark-docno").css("font-family", specialWaterMarkSetting["General"]["文號字型"]);
					if("文號字型大小" in specialWaterMarkSetting["General"])
						$pg.find(".watermark-docno").css("font-size", specialWaterMarkSetting["General"]["文號字型大小"] + "pt");
					if("密等字型" in specialWaterMarkSetting["General"])
						$pg.find(".watermark-sec").css("font-family", specialWaterMarkSetting["General"]["密等字型"]);
					if("密等字型大小" in specialWaterMarkSetting["General"])
						$pg.find(".watermark-sec").css("font-size", specialWaterMarkSetting["General"]["密等字型大小"] + "pt");
					if("全銜自動折行" in specialWaterMarkSetting["General"])
						autoWrap = specialWaterMarkSetting["General"]["全銜自動折行"] == "Y";
				}
				if(autoWrap) {	// 1110617 Raymond 1110416 合併一代1030961, 自動折行計算
					if("自動折行規則" in specialWaterMarkSetting) {
						var maxLenPerLine = 8, wrapPoints = "";
						if("每行最大字數" in specialWaterMarkSetting["自動折行規則"])
							maxLenPerLine = specialWaterMarkSetting["自動折行規則"]["每行最大字數"];
						if("可折行點" in specialWaterMarkSetting["自動折行規則"])
							wrapPoints = specialWaterMarkSetting["自動折行規則"]["可折行點"];
						var $wnm = $pg.find(".watermark-nm");
						var nm2 = $wnm.text();
						var n = nm2.length, l, i, j;
						var pbp = [], ebp = [];
						for(var ci=0; ci<n; ci++) {
							if(wrapPoints.indexOf(nm2[ci]) >= 0)
								pbp.push(ci + 1);
						}
						if(pbp.length == 0 && n > (maxLenPerLine + 4)) {	// 無任何可折行點且字數大於每行最大字數+可容許度
							for(l=2; l<=8; l++) {	// 最大八行, 超過就截斷
								if(n < ((maxLenPerLine + 4) * l - 1))
									break;
							}
							var strCompTitle = "";
							var q = Math.floor(n / l);
							var r = n % q;
							for(i=0; i<n;) {
								l = q + ((r-- > 0)?1:0);
								var str = nm2.substr(i, l);
								strCompTitle += str;
								strCompTitle += "\n";
								i += l;
							}
							var nm2 = strCompTitle.substr(0, strCompTitle.length - 1);
							$wnm.html(theSSO.Util.htmlEncode(nm2).replace(/\n/g, "<br>"));
						}
						else if(pbp.length > 0) {
							if(pbp[pbp.length - 1] < n)
								pbp.push(n);
							var prevBP = 0, lastBP = 0;
							for(i=0; i<pbp.length; i++) {
								if((pbp[i] - lastBP) > (maxLenPerLine + 4)) {
									if(prevBP > lastBP) {
										ebp.push(prevBP);
										lastBP = prevBP;
									}
									if((pbp[i] - lastBP) > (maxLenPerLine + 4)) {
										var sn = pbp[i] - prevBP;
										for(l=2; l<=8; l++) {	// 最大八行, 超過就截斷
											if(sn < ((maxLenPerLine + 4) * l - 1))
												break;
										}
										var q = Math.floor(sn / l);
										var r = sn % q;
										for(j=0; j<sn;) {
											l = q + ((r-- > 0)?1:0);
											//var str = nm2.substr(prevBP + j, l);
											//console.log(str);
											ebp.push(prevBP + j + l);
											j += l;
										}
										lastBP = pbp[i];
									}
								}
								prevBP = pbp[i];
							}
							console.log("Effect break points: ");
							prevBP = 0;
							var strCompTitle = "";
							for(i=0; i<ebp.length; i++) {
								console.log(ebp[i]);
								var str = nm2.substr(prevBP, ebp[i] - prevBP);
								strCompTitle += str;
								strCompTitle += "\n";
								prevBP = ebp[i];
							}
							if(prevBP < n)	// 補末行
								strCompTitle += nm2.substr(prevBP);
							console.log(strCompTitle);
							$wnm.html(theSSO.Util.htmlEncode(strCompTitle).replace(/\n/g, "<br>"));
						}
					}
					else
						theLogger.error("SpecialWaterMarkSetting.JSON未設定'自動折行規則', 無法計算折行點");
				}
				else {	// 1080917 Raymond 1080688 偵測浮水印第一行文字是否超出一行, 若超過一行則縮小字型
					var availSizes = [72, 56, 48, 40, 36, 32, 28, 26, 26, 24, 22, 20, 18, 16, 14, 12];
					console.log("偵測浮水印第一行文字是否超出一行");
					var $wnm = $pg.find(".watermark-nm");
					var rng = document.createRange(), rcs;
					var ds = 0;
					if("全銜字型大小" in specialWaterMarkSetting["General"]) {
						for(; ds < availSizes.length; ds++) {
							if(specialWaterMarkSetting["General"]["全銜字型大小"] > availSizes[ds])
								break;
						}
					}
					rng.selectNodeContents($wnm.get(0));
					function doTest() {
						rcs = rng.getClientRects();
						console.log(rcs);
						if(rcs.length > 1) {
							if(ds < availSizes.length) {
								var downSize = availSizes[ds++];
								console.log("超出一行, 降為" + downSize + "pt");
								$wnm.css("font-size", downSize + "pt");
								arguments.callee();
							}
							else {
								console.log("仍超出一行");
								// 偵測是否末行只有一個字
								rng.setStart($wnm.get(0).childNodes[0], $wnm.get(0).textContent.length - 1);
								rng.setEnd($wnm.get(0).childNodes[0], $wnm.get(0).textContent.length);
								var rcsLC = rng.getClientRects();
								console.log(rcsLC);
								if(rcsLC[0].left == rcs[rcs.length - 1].left &&
									rcsLC[0].top == rcs[rcs.length - 1].top &&
									rcsLC[0].right == rcs[rcs.length - 1].right &&
									rcsLC[0].bottom == rcs[rcs.length - 1].bottom) {
									console.warn("末行只有一個字, 調回上一級字型大小, 以避免單字成行");
									if(ds > 1)
										$wnm.css("font-size", availSizes[ds-2] + "pt");	// 設回數倒第2大, 避免末行單字
								}
							}
						}
					}
					doTest();
				}
			}
		}
		// 1070417 Raymond 1070381 若公文由AKI800調閱且UNV檔物件的ForceWaterMark為True要多印帳號
		if(!!uo && typeof uo.UnvRoot.ForceWaterMark === "string" && uo.UnvRoot.ForceWaterMark.match(/true/i))
			// 1070905 Raymond 1070820 強制浮水印改用UniView原來的套印LOGO形式
			//$("<div class='watermark'><div><div class='watermark-nm'>" + ((!!nm)?nm:"") + "</div><div class='watermark-docno'>" + ((!!docNo)?docNo:"") + "</div><div class='watermark-sec'>" + ((!!sec)?sec:"") + "</div><div class='watermark-acc'>" + theSSO.User.account + "</div></div></div>").insertBefore($pg.children("DIV").first());	// 1070413 Raymond position absolute的DIV若放在container(pg)的最後一個child在IE預覽列印視窗中100%時不會顯示(小於100%或拉動邊界位置都會顯示), 改成container(pg)的第一個child就可以顯示了, 無法理解...
			;
		else if(type == 1) {	// 文稿頁面
			$("<div class='watermark'><div><div class='watermark-nm'>" + ((!!nm)?nm:"") + "</div><div class='watermark-docno'>" + ((!!docNo)?docNo:"") + "</div><div class='watermark-sec'>" + ((!!sec)?sec:"") + "</div></div></div>").insertBefore($pg.children("DIV").first());
			doPrintDraftSpecialWaterMark();
		}
		else if(type == 2) {	// 附件頁面
			$("<div class='attachwatermark'><div class='attachwatermark-sec-deccond'></div><div class='attachwatermark-warn'></div></div><div class='watermark'><div><div class='watermark-nm'>" + ((!!nm)?nm:"") + "</div><div class='watermark-docno'>" + ((!!docNo)?docNo:"") + "</div><div class='watermark-sec'>" + ((!!sec)?sec:"") + "</div><div class='watermark-warn'><div></div></div></div></div>").insertBefore($pg.children("DIV").first());
			doPrintDraftSpecialWaterMark();
			if(!!specialWaterMarkSetting) {
				if("附件警語圖文框" in specialWaterMarkSetting) {
					if(!!sec && sec in specialWaterMarkSetting["附件警語圖文框"]) {
						var warnTxt = specialWaterMarkSetting["附件警語圖文框"][sec];
						if(warnTxt.length > 0) {	// 有設定才顯示警語圖文框
							var warnSet = warnTxt.split(",");
							// 1110829 Raymond 1110416 改為多個^都取代成換行, 因為Chrome的列印預覽功能有直式書寫方向功能+table-cell會壞掉變成字元向左倒90度的問題, 故改為橫式書寫方向, 直式警語的文字順序要以橫式書寫的方向來設定文字及折行
							//$pg.find(".watermark-warn > div").html(theSSO.Util.htmlEncode(warnSet[0]).replace("^", "<br>"));
							$pg.find(".watermark-warn > div").html(theSSO.Util.htmlEncode(warnSet[0]).replace(/\^/g, "<br>"));
							var ext = warnSet[1].split("X");
							$pg.find(".watermark-warn > div").css({width: ext[0] + "mm", height: ext[1] + "mm"});
							if("字型" in specialWaterMarkSetting["附件警語圖文框"])
								$pg.find(".watermark-warn").css("font-family", specialWaterMarkSetting["附件警語圖文框"]["字型"]);
							if("字型大小" in specialWaterMarkSetting["附件警語圖文框"])
								$pg.find(".watermark-warn").css("font-size", specialWaterMarkSetting["附件警語圖文框"]["字型大小"] + "pt");
							if("邊框寬度" in specialWaterMarkSetting["附件警語圖文框"])
								$pg.find(".watermark-warn").css("border-width", specialWaterMarkSetting["附件警語圖文框"]["邊框寬度"] + "pt");
						}
					}
				}
				if("附件警語文字" in specialWaterMarkSetting) {
					// 1111103 Raymond 陸委會序370 新增支援附件警語文字的半透明度獨立設定, 當設定檔未獨立設定附件警語文字的半透明度時, 才會沿用General的半透明度
					if("半透明度" in specialWaterMarkSetting["附件警語文字"])
						$pg.find(".attachwatermark").css("opacity", specialWaterMarkSetting["附件警語文字"]["半透明度"]);
					else if("General" in specialWaterMarkSetting && "半透明度" in specialWaterMarkSetting["General"])
						$pg.find(".attachwatermark").css("opacity", specialWaterMarkSetting["General"]["半透明度"]);
					if("字型" in specialWaterMarkSetting["附件警語文字"])
						$pg.find(".attachwatermark").css("font-family", specialWaterMarkSetting["附件警語文字"]["字型"]);
					if("字型大小" in specialWaterMarkSetting["附件警語文字"])
						$pg.find(".attachwatermark").css("font-size", specialWaterMarkSetting["附件警語文字"]["字型大小"] + "pt");
					if("字體顏色" in specialWaterMarkSetting["附件警語文字"]) {
						var fontColor = specialWaterMarkSetting["附件警語文字"]["字體顏色"];
						var fontColorSet = fontColor.split(",");
						$pg.find(".attachwatermark").css("font-size", Util.toHtmlColor({r:fontColorSet[0], g:fontColorSet[1], b:fontColorSet[2]}));
					}
					$pg.find(".attachwatermark-sec-deccond").text(sec + decCond);
					if(!!sec && sec in specialWaterMarkSetting["附件警語文字"]) {
						$pg.find(".attachwatermark-warn").text(specialWaterMarkSetting["附件警語文字"][sec]);
					}
				}
			}
		}
	}
	// 1150309 Raymond 1150145 將整理簽辦意見清單的功能獨立成一個function, 以供列印文稿及來文兩功能共用
	function makeSCList(dm, scList, filterNUK, filterTAITRA) {
		// 1100712 Raymond 1100649 新增應顯示的簽核意見 copy from _setupComments@RD-AOL.js
		if(filterNUK)
			scList.filterNUK = filterNUK;	// 勾選僅顯示會辦單位長官意見選項時, 簽核物件資訊頁要顯示「僅顯示會辦單位長官意見」
		// 1111026 Raymond 1110864 合併1101468, 啟用分文稿記錄簽核意見功能時, 改以各文稿選項物件中記錄的filterNUK為準
		if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y")
			scList.filterNUK = opts.filterNUK;
		// 1141014 Raymond 1141129 新增列印簽核物件資訊頁(內部意見)
		if(filterTAITRA)
			scList.filterTAITRA = filterTAITRA;
		
		function _getDocToDoListItem(docToDoList, msgId) {
			for(var i=0; i<docToDoList.length; i++)
			{
				var item = docToDoList[i];
				if (item.msgId==msgId) {
					return item;
				}
			}
			return null;
		}
		// copy from RD-SysUtil.js
		function _getOrgUnitVirtualCode(orgNode, unitNo) {
			if (!!orgNode && !!unitNo && unitNo.length)
			{
				var unitPath = 'Unit[UnitCode="' + unitNo + '"]';
				var $unitNodes, unitNode, virtualCode;
				var i=0;
				if (!!orgNode)
				{
					$unitNodes = $(orgNode).find(unitPath);
					if ($unitNodes.length<=0) {
						return '';
					}
						
					unitNode = $unitNodes[0];
					if (!!unitNode)
					{
						virtualCode = SSOUtil.xml_getChildNodeValue(unitNode, 'Virtual');
						if (typeof virtualCode !== 'undefined' && virtualCode.length) {
							return virtualCode;
						}
					}
				}
			}
			return '';
		}
		var aolFlows = fm.getSignFolder().getAolFlow();
		var docToDoList = SSOUtil.getDocToDoList(fm.getDocNo(), localStorage.Artifact);
		var orgNode = SSOUtil.getOrgNode(fm.getDocObj().sourceOrgNo);
		var nMaxDraftMsgId = 1999;
		//var idx = aolFlows.flows.length - 1;
		var m = aolFlows.flows.length;
		//若最後一個AolFlow項目為目前流程點, 跳過
		//var aolFlow = aolFlows.flows.length ? aolFlows.flows[idx] : null; // 2016.10.12 - bug-fix, 草稿無法開啟簽辦意見子視窗問題
		var aolFlow = aolFlows.flows.length ? aolFlows.flows[m-1] : null; // 2016.10.12 - bug-fix, 草稿無法開啟簽辦意見子視窗問題
		var flowMsgId = (!!aolFlow) ? aolFlow.id.substr(aolFlow.id.lastIndexOf('_') + 1) : '';
		var todoMsgId = '';
		if(!fm.readOnly() && theSSO.MP.todolist.builder.isDraftMsg(fm.getDocObj())) {
			var idxUL = fm.getDocObj().msgId.indexOf('_');
			if (idxUL>0) {
				todoMsgId = fm.getDocObj().msgId.substring(0, idxUL);
			}
		}
		else {
			todoMsgId = fm.getDocObj().msgId;
		}
		if (flowMsgId.length && (flowMsgId===todoMsgId)) {
			//idx--;
			m--;
		}
		var $item, sItem, itemDTDL, nMsgId;
		var comment;
		// 1150309 Raymond 1150145 修正列印來文時無dm的問題
		// 1100706 Raymond 1100648 新增支援分文稿記錄簽核意見功能
		//var currDraftInfo = dm.draftInfo;
		var currDraftInfo = dm?.draftInfo;
		// 1110207 Raymond 1110013 新增判斷核決流程點
		var firstAppFlow = undefined;
		// 最近的流程先加!
		//for (; idx>=0; idx--)
		for (var idx=0; idx<m; idx++)
		{
			aolFlow = aolFlows.flows[idx];
			// 1090430 Raymond 1090261 恢復由docToDoList取得流程點資訊
			// 1070410 Raymond 1070463 直接以封裝裝記錄的流程點資訊顯示單位、角色、姓名, 以避免因OrgInfo找不到該此帳號資訊而當掉
			flowMsgId = aolFlow.id.substr(aolFlow.id.lastIndexOf('_') + 1);
			nMsgId = parseInt(flowMsgId);
			if (nMsgId<nMaxDraftMsgId && !!docToDoList && docToDoList.length) {
				itemDTDL = docToDoList[0];
			}
			else if (!!docToDoList) {
				itemDTDL = _getDocToDoListItem(docToDoList, flowMsgId);
			}
			/* 1090430 Raymond 1090261 單位、角色、姓名仍直接以封裝檔記錄的流程點資訊顯示, docToDoList的Item只用來判定是否為代理流程點
			if (itemDTDL===undefined || itemDTDL===null) {
				continue;
			}
			
			// 2014.2.18 - 若流程點未記錄人員帳號, 則不列入!
			if (!itemDTDL.ownUserId || (itemDTDL.ownUserId.length===0)) {
				// 沒有人員帳號資訊 => 非一般簽核流程!
				continue;
			}
			
			// 2016.11.25 - 目前流程點, 不加入! (後續作業會append上去)
			if (flowMsgId==todoMsgId) {
				continue;
			}
			
			// 2014.2.18 - 總收文/發文/繥印/校對角色流程不列入!
			//OD91 > 收文, OD92 > 繕印, OD93 > 校對, OD94 > 發文, OD95 > 檔管, OD96 > 研考
			if (itemDTDL.ownRoleId==='OD91' || itemDTDL.ownRoleId==='OD92' || itemDTDL.ownRoleId==='OD93' ||
				itemDTDL.ownRoleId==='OD94' || itemDTDL.ownRoleId==='OD95' || itemDTDL.ownRoleId==='OD96') {
				continue;	
			}
			
			thisUserInfo = SSOUtil.getOrgUserInfo(orgNode, itemDTDL.ownOUId, itemDTDL.ownRoleId, itemDTDL.ownUserId, '');*/
			//portraitUrl = SSOUtil.getRoleIconPathname(docObj.sourceOrgNo, itemDTDL.ownOUId, itemDTDL.ownRoleId);
			if("refChangeInfo" in aolFlow) {
//				thisUserInfo = {
//					OUName: aolFlow.refChangeInfo.charger.ou,
//					RoleName: aolFlow.refChangeInfo.charger.role,
//					UserName: aolFlow.refChangeInfo.charger.name
//				}
				// 1090430 Raymond 1090261 檢核docToDoList的Item的proxySend是否為1, 是則表示為代理流程點
//				if(!!itemDTDL && itemDTDL.proxySend == "1") {
//					theLogger.log("MsgID:" + itemDTDL.msgId + "為代理流程點, 流程點人員名稱變更為'" + aolFlow.refChangeInfo.charger.name + "(代)'");
//					thisUserInfo.UserName += "(代)";
//				}
				if(scList.filterNUK) {	// 會辦單位僅顯示單位主官簽核意見
					//var ouName = aolFlow.refChangeInfo.charger.ou;
					//var ouId = SSOUtil.getOrgUnitNoByName(orgNode, ouName);
					//var roleName = aolFlow.refChangeInfo.charger.role;
					//var roleId = SSOUtil.getOrgRoleNoByName(orgNode, ouId, roleName);
					//if(ouId != fm.getDocObj().icOUId && ouId)
					theLogger.warn("過濾會辦單位僅顯示單位主官簽核意見...");
					if(!!itemDTDL && itemDTDL.ownOUId != fm.getDocObj().ICOUId &&	// 條件1.非承辦單位
						_getOrgUnitVirtualCode(orgNode, itemDTDL.ownOUId) != 3) {	// 條件2.非一級決行單位
						if(itemDTDL.ownRoleId != "OD11") {	// 非主管
							theLogger.log("#" + aolFlow.id + "為非承辦非一級決行單位(" + itemDTDL.ownOUId + "), 且非主管角色(" + itemDTDL.ownRoleId + "), 忽略不顯示");
							continue;
						}
					}
				}
				// 1110207 Raymond 1110013 新增判斷核決流程點
				if(!firstAppFlow) {
					if(!!itemDTDL && !!itemDTDL.appUserId && itemDTDL.appUserId.length > 0 && !!itemDTDL.appRoleId && itemDTDL.appRoleId.length > 0) {
						theLogger.log("第1個核決流程點是" + itemDTDL.msgId);
						firstAppFlow = itemDTDL.msgId;
					}
				}
			}
			else	// 無異動資訊的流程點(ex.分文)不需要顯示簽核意見
				continue;
			
			comment = '[無簽核意見]';
			// 1150309 Raymond 1150145 新增判斷無文稿資訊時(來文), 不要提供分文稿記錄的簽核意見
			// 1100706 Raymond 1100648 新增支援分文稿記錄簽核意見功能
			//if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
			if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y" && !!currDraftInfo) {
				var missCurrDraft = true;	// 要顯示的簽核流程是否找得到目前顯示的文稿, 找不到的話表示是此簽核流程之後才新增的文稿, 就不要顯示此簽核流程
				try {
					if(!!aolFlow.refSignInfo && aolFlow.refSignInfo.drafts.length > 0) {
						for(var i=0; i<aolFlow.refSignInfo.drafts.length; i++) {
							if(aolFlow.refSignInfo.drafts[i].guid == currDraftInfo.guid) {	// 用GUID判斷與目前顯示文稿是否同一筆
								if(!currDraftInfo.id.match(/^NewDraft/))	// 排除本流程點所新增的文稿
									missCurrDraft = false;	// 找到目前文稿, 要顯示此簽核流程
								if(aolFlow.refSignInfo.drafts[i].signComment.length > 0) {
									comment = aolFlow.refSignInfo.drafts[i].signComment;
								}
								break;
							}
						}
					}
				}
				catch(e) {
					theLogger.error(e.errorText);
				}
				// 1150309 Raymond 1150145 新增判斷無文稿資訊時(來文), 不要提供分文稿記錄的簽核意見
				// 1111027 Raymond 1110864 合併1101468, 新增當啟用「顯示我的最終意見」功能時支援隱藏簽辦意見(「僅顯示我的最終意見」設定)功能
				//if(theSSO.User.EnvSettings.get("AOL_SHOW_MY_FINAL_COMMENT") == "Y" && opts.showAllComments == false) {
				if(theSSO.User.EnvSettings.get("AOL_SHOW_MY_FINAL_COMMENT") == "Y" && opts.showAllComments == false && !!currDraftInfo) {
					var xD = fm.getSignFolder().xSignFolder().getDraft(currDraftInfo.guid);
					if(!!xD) {
						var xHC = xD.getHideComment(flowMsgId);
						if(!!xHC) {
							if(xHC.value == "true") {
								theLogger.log("隱藏[" + aolFlow.refChangeInfo.charger.ou + "-" + aolFlow.refChangeInfo.charger.role + "-" + aolFlow.refChangeInfo.charger.name + "(" + aolFlow.refChangeInfo.charger.userId + ")]的簽辦意見");
								continue;
							}
							else if(xHC.value == "false") {
								theLogger.log("顯示[" + aolFlow.refChangeInfo.charger.ou + "-" + aolFlow.refChangeInfo.charger.role + "-" + aolFlow.refChangeInfo.charger.name + "(" + aolFlow.refChangeInfo.charger.userId + ")]的簽辦意見為最終意見");
								comment += "(最終意見)";
							}
						}
					}
				}
			}
			else if ((typeof aolFlow.refChangeInfo!=='undefined') && (typeof aolFlow.refChangeInfo.comment!=='undefined') && aolFlow.refChangeInfo.comment.length) {
				comment = aolFlow.refChangeInfo.comment;
				// 1111027 Raymond 1110864 合併1101468, 新增當啟用「顯示我的最終意見」功能時支援隱藏簽辦意見(「僅顯示我的最終意見」設定)功能
				if(theSSO.User.EnvSettings.get("AOL_SHOW_MY_FINAL_COMMENT") == "Y" && bShowAllComments == false) {
					var xFS = fm.getSignFolder().xSignFolder().getXFlowSigner(flowMsgId);
					if(!!xFS) {
						if(xFS.hideComment == "true") {
							theLogger.log("隱藏[" + aolFlow.refChangeInfo.charger.ou + "-" + aolFlow.refChangeInfo.charger.role + "-" + aolFlow.refChangeInfo.charger.name + "(" + aolFlow.refChangeInfo.charger.userId + ")]的簽辦意見");
							continue;
						}
						else if(xFS.hideComment == "false") {
							theLogger.log("顯示[" + aolFlow.refChangeInfo.charger.ou + "-" + aolFlow.refChangeInfo.charger.role + "-" + aolFlow.refChangeInfo.charger.name + "(" + aolFlow.refChangeInfo.charger.userId + ")]的簽辦意見為最終意見");
							comment += "(最終意見)";
						}
					}
				}
			}
			
			// 1100706 Raymond 1100648 新增支援分文稿記錄簽核意見功能, 啟用時要判斷此簽核流程找得到目前顯示文稿
			if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") != "Y" || !missCurrDraft) {
			
//				var timeStr = '';
//				if ((typeof aolFlow.refChangeInfo!=='undefined') && (typeof aolFlow.refChangeInfo.timeStamp==='string') && aolFlow.refChangeInfo.timeStamp.length) {
//					timeStr = getTimeString(aolFlow.refChangeInfo.timeStamp);
//				}
//				else if ((typeof itemDTDL.txTime=='string') && itemDTDL.txTime.length) {
//					timeStr = getTimeString(itemDTDL.txTime);
//				}
				// 1110207 Raymond 1110013 新增註記核決流程點
				if(!!firstAppFlow && firstAppFlow == flowMsgId)
					scList.push({flowId: "sign_" + flowMsgId, time: aolFlow.refChangeInfo.timeStamp, content: comment, appFlow: true});
				else
				scList.push({flowId: "sign_" + flowMsgId, time: aolFlow.refChangeInfo.timeStamp, content: comment});
				
				// 1141014 Raymond 1141129 新增記錄Todolist的OwnOUId到簽核意見清單
				if(SSO_CONFIG.OrgNickName == "TAITRA") {
					if(!!itemDTDL)
						scList[scList.length - 1].ownOUId = itemDTDL.ownOUId;
				}
			}	// end of 1100706 Raymond 1100648 新增支援分文稿記錄簽核意見功能, 啟用時要判斷此簽核流程找得到目前顯示文稿
		}
		// 1110323 Raymond 1110249 調閱公文列印簽核物件資訊頁時, 不要顯示目前流程點的簽辦意見
		if(!uo || !("UnvRoot" in uo)) {
			// 1150306 Raymond 1150145 新增判斷最後流程點與目前流程點同一級單位時, 取出暫存
			var lastSC = undefined;
			if(SSO_CONFIG.OrgNickName == "TAITRA" && !scList.filterTAITRA) {
				if(scList.length > 0) {
					let lastsc = scList[scList.length - 1];
					if(fm.getDocObj().get("ODWMSG", "OWN_OU_ID").substr(0, 2) == lastsc.ownOUId?.substr(0, 2)) {
						theLogger.log("最後一個流程點與目前流程點是同一級單位, 取出暫存");
						lastSC = scList.pop();
					}
					else {
						theLogger.log("最後一個流程點非同一級單位, 不取出");
					}
				}
			}
			// 最後加入自己流程點的簽核意見
			comment = '[無簽核意見]';
			// 1150309 Raymond 1150145 新增判斷無文稿資訊時(來文), 不要提供分文稿記錄的簽核意見
			//if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
			if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y" && !!currDraftInfo) {
				if(!!currDraftInfo.newSignComment && currDraftInfo.newSignComment.length)
					comment = currDraftInfo.newSignComment;
			}
			else {
				comment = fm.getSignFolder().signComment();
			}
			scList.push({cTime: Util.now(), content: comment});
			// 1141014 Raymond 1141129 新增記錄Todolist的OwnOUId到簽核意見清單
			if(SSO_CONFIG.OrgNickName == "TAITRA") {
				// 1150306 Raymond 1150145 修正目前流程點的TodoList項目要用docObj.msgId重新取得, 才會是正確的流程點資訊
				nMsgId = fm.getDocObj().msgId;
				if (nMsgId<nMaxDraftMsgId && !!docToDoList && docToDoList.length) {
					itemDTDL = docToDoList[0];
				}
				else if (!!docToDoList) {
					itemDTDL = _getDocToDoListItem(docToDoList, nMsgId);
				}
				if(!!itemDTDL)
					scList[scList.length - 1].ownOUId = itemDTDL.ownOUId;
			}
		}
		// 1150312 Raymond 外貿序78 修正同單位流程點合併錯誤的問題
		if(SSO_CONFIG.OrgNickName == "TAITRA") {
			let idx0 = undefined, idx1 = undefined;
			for(let idx=0; idx<scList.length; idx++) {
				if(idx < (scList.length-1) && !!scList[idx].ownOUId && !!scList[idx+1].ownOUId && scList[idx].ownOUId.substr(0, 2) == scList[idx+1].ownOUId.substr(0, 2)) {
					console.log(`[${idx}] ${scList[idx].ownOUId} - A`);	// 與下一個流程點同一級單位的流程點應合併
					if(typeof idx0 === "undefined")
						idx0 = idx;
					idx1 = idx;
				}
				else if(scList.filterTAITRA && !!scList[idx].ownOUId && !!theAOL.docObj.ownOUId && scList[idx].ownOUId.substr(0, 2) == theAOL.docObj.ownOUId.substr(0, 2)) {
					console.log(`[${idx}] ${scList[idx].ownOUId} - C`);	// 勾選內部意見時與目前流程點同一級單位的流程點不合併
					idx0 = idx1 = undefined;
				}
				else {
					console.log(`[${idx}] ${scList[idx].ownOUId} - B`);	// 與下一流程點不同一級單位時, 不合併
					if(typeof idx0 !== "undefined") {	// 若前面流程點與此流程點同一級單位時, 將前面idx0~idx1流程點合併到此流程點下
						console.log(`scList[${idx}]=`, scList[idx]);
						console.log(`splice(${idx0}-${idx1})`);
						let s = scList.splice(idx0, idx1-idx0+1);
						console.log(s.length);
						idx -= s.length;
						scList[idx].sameOUFlows = s;
						console.log(`scList[${idx}]=`, scList[idx]);
						idx0 = idx1 = undefined;
					}
				}
			}
		}
	}
	
	// 2016.11.1 新增參數q, 供本文列印完後判斷是否接著列印附件
	// 2017.3.10 新增參數printSOPages, 本文列印完後是否接著列印簽核物件資訊頁
	// 1100712 Raymond 1100649 新增參數filterNUK, 列印簽核物件資訊頁中的簽核意見是否僅顯示會辦單位長官意見
	// 1141014 Raymond 1141129 新增參數filterTAITRA, 列印簽核物件資訊頁(內部意見)
	function printDraftPages(draftIdx, rsrcFile, opts, $pages, q, printSOPages, filterNUK, filterTAITRA) {
		var dfd = $.Deferred();
		var base = $pages.find(".pg").length;	// 啟始頁次
		// 2017.2.8 歷史檢視用目前流程點向前收集歷史流程點的msgId, 顯示簽核物件時以產生點資訊比對是否在允許顯示的msgId集合中才顯示(比照一代邏輯)
		var revs = fm.getSignFolder().getRevisions();
		var cr = fm.getSignFolder().getCurrRevision();
		theLogger.warn("目前列印流程點為'" + cr + "'");
		var coll = [];
		// 1100512 Raymond 1090821 判斷若是具有單層式文稿頁面的封裝檔, 則忽略顯示外機關流程點的簽核物件(因為也沒有簽核物件)
		var sf = fm.getSignFolder();
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
			coll.push(rev.substr(5));
			if(rev == cr)
				break;
			}
		}
		// 1060504 Raymond 改叫saveRuntime新增/更新目前流程點的簽核區域資訊, 因為不允許編輯內文的情況下, 外部簽核記錄檔不應該新增版本, 若頁數跟最後一版不一致時, 簽核區域資訊也會跟著錯,
		// 但不能直接更新會儲存到XSignObjs.xml的簽核區域欄位, 所以改用另一組Runtime文稿物件記錄當前動態排版出來的簽核區域資訊
		//fm.getSignFolder().xSignFolder().save();	// 2017.2.22 更新目前流程點的簽核區域資訊
		fm.getSignFolder().xSignFolder().saveRuntime();
		fm.accquireDraftModel(draftIdx)
			.done(function(dm) {
				if(dm) {
					if(typeof rsrcFile === "string") {	// 2016.9.8 一般文稿若rsrcFile是字串, 則表示錯誤訊息
						dfd.reject(rsrcFile);
					}
					else if(rsrcFile.category == "稿" || opts.printMailMerge == false) {	// 稿樣版或簽核用
						var params = {
								"新系統": false,
								"檢視模式": opts.applyTCMode || "3",
								"編輯階段序號": dm.getEditSN(),
								"稿": rsrcFile.category == "稿",
								"條碼": opts.printBarcode == true,
								"頁碼": opts.printPageNo == true,
								"預設字型": opts.printFont || "標楷體",
								"預設行高": opts.printLineHeight || "1.5",
								"自訂": opts.applyCustom == true,
								"稿序": fm.getDraftName(draftIdx),
								"檔名": opts.printDraftFileName?fm.getDraftFileName(draftIdx):""
							};
						// 1060706 Raymond 1060539 新增支援會辦單位分繕選項
						if(opts.dispatchConUnitsAvail) {
							theLogger.log("樣版支援'會辦單位分繕列印'選項, 設為'" + opts.dispatchConUnits + "'");
							params["會辦單位分繕列印"] = (opts.dispatchConUnits)?"true":"false";
						}
						if(rsrcFile.category == "文") {	// 2016.10.20 FIX for 繕校用
							params["抄本列印"] = true;
							params["正副抄本章"] = true;
							// 1140124 Raymond 1140009 修正若"稿"類型樣版, 最後以追蹤修訂模式(applyTCMode=1)列印過, 同一樣版改為"文"類型後, 再以"繕校及簽核用"用途列印時, 因為記憶列印參數功能而預設成追蹤修訂檢視模式, 而"文"格式的列印選項不會出現檢視模式下拉式選項, 無法切回完稿模式, 導致列印會出現追蹤修訂內容的問題
							params["檢視模式"] = "3";	// 強制完稿模式
						}
						var tcSess = dm.getAllTCSess();
						for(var i=0; i<tcSess.length; i++) {
							params["color" + tcSess[i].index] = tcSess[i].color;
						}
						// 1100309 Raymond 1090990 新增「簽核類型」變數, 傳入目前公文的SignType, 僅"稿"需要
						if(rsrcFile.category == "稿")
							params["簽核類型"] = fm.getDocObj().signType;
						
						// 1110617 Raymond 1110416 合併一代1030961, 將目前列印格式的類型寫入opts物件, 供列印所屬附件時使用
						if(enableSpecialWaterMark)
							opts.printFormat = rsrcFile.category;	// 記錄列印類型在opts參數中, 以便一併列印附件時可參考
						
						// 1100217 Raymond 1090610 合併內政部1071265, 顯示目前列印的稿序於進度子視窗
						progbar.text(params['稿序']);
						
						// 2016.10.27 套用分繕變數, 繕校用或紙本簽核以【變數名稱請分繕】表示
						var mailMergedXml = (rsrcFile.category == "稿" && fm.getSignType() == "E")?dm.accquireXml():dm.accquireMailMergedXml();
						thePublicRsrc.applyPrintXSLT(mailMergedXml, dm.getDocType(), dm.getSubDocType(), rsrcFile.remote.getFullPath(), params)
							.done(function(intermediateXml, printXSLdir, printXSLfileName) {
								theLogger.log([printXSLdir, printXSLfileName]);
								theLogger.log(intermediateXml);
						
								if(intermediateXml != undefined) {
									var internalFO = theLayoutEng.transXmlFragToInternalFO(intermediateXml, dm);
									theLogger.log(internalFO);
									
									// 1101029 Raymond 1101199 修正Chrome V94、95版列印預覽時有些標楷體字型會破字的問題, 依環境變數「AOL_PRINT_USE_CNSFONT」決定產生分繕列印內容時傳入useCNSFont參數是否為true
									//theLayoutEng.instanciateFOPages(internalFO, opts, $pages)
									var useCNSFont = false;
									var dtb = navigator.userAgent.match(/Chrome\/(\d+)/);
									if(!!dtb && dtb[1] >= 94) {	// 判斷是Chrome且94版以上
										var printUseCNSFont = theSSO.User.EnvSettings.get("AOL_PRINT_USE_CNSFONT");	// Y為啟用, N或未設定為不啟用, 環境變數允許設定兩個字, 第一個字代表列印線上簽核文稿的「文」格式的發文用、簽核及繕校用及紙本簽核文稿的「文」或「稿」格式時是否啟用此功能, 第二個字代表列印線上簽核文稿的「稿」格式時是否啟用此功能, 分開設定是怕萬一線上簽核文稿的「稿」格式套用了"全字庫正楷體", 由於字寬等與"標楷體"不一致時, 可能發生列印結果頁面與簽核頁面不一致, 而導致簽核物件位置不正確的問題
										if(printUseCNSFont.length > 0 && (rsrcFile.category != "稿" || fm.getSignType() != "E"))	// 線上簽核公文的「文」格式的「簽核及繕校用」列印用途或紙本簽核公文的「稿」格式
											useCNSFont = printUseCNSFont[0] == 'Y';													// 以環境變數設定的第一個字控制是否啟用套用"全字庫正楷體"字型功能
										else if(printUseCNSFont.length > 1)															// 線上簽核公文的「稿」格式, 若環境變數有設定第二個字
											useCNSFont = printUseCNSFont[1] == 'Y';													// 以環境變數設定的第二個字控制是否啟用套用"全字庫正楷體"字型功能
									}
									theLayoutEng.instanciateFOPages(internalFO, opts, $pages, useCNSFont)
										.done(function(nfo, $pages) {
											theLogger.warn("所有文稿頁面已動態排版完成, 共" + nfo.pages + "頁, base = " + base + ", $pages.find('.pg').length = " + $pages.find(".pg").length);
											
											// 1140410 Raymond 1140481 修正使用雙面列印時, 偶數頁的裝訂線應顯示在右邊界
											if(bBothSide) {
												$pages.children().each((idx, divPg) => {
													if(idx >= base) {
														console.log("第" + idx + "(" + (idx - base) + ")頁是" + (((idx - base) % 2)?"偶":"奇") + "數頁");
														if((idx - base) % 2) {
															var $thisPg = $(divPg),
																$lr = $thisPg.find("div[name='leftRegion']"),
																$rr = $thisPg.find("div[name='rightRegion']");
															$lr.children().filter((stidx, st) => {
																var isBinding = false;
																$(st).find("span").each((spidx, sp) => {
																	if(sp.textContent.match(/\W+裝\W+訂\W+線\W+/))
																		isBinding = true;
																});
																if(isBinding)
																	return true;
															}).appendTo($rr).find(".tb").addClass("even-page");
															if($thisPg.find(".leftSealMark").length) {
																var lsp = $thisPg.find(".leftSealMark").get(0).style["left"];
																if($thisPg.find(".rightSealMark").length) {
																	var rsp = $thisPg.find(".rightSealMark").get(0).style["right"];
																	if(!!rsp)
																		$thisPg.find(".leftSealMark").css("left", rsp);	// 偶數頁的左騎縫章內縮改為右騎縫章原來的內縮距離
																	if(!!lsp)
																		$thisPg.find(".rightSealMark").css("right", lsp);	// 偶數頁的右騎縫章內縮改為左騎縫章原來的內縮距離
																}
																else {
																	if(!!lsp) {
																		var halfSM = 15 - parseInt(lsp);
																		var rsmsp = (window.SSO_CONFIG && "rightSealMarkSpace" in SSO_CONFIG)?SSO_CONFIG.rightSealMarkSpace:0;
																		$thisPg.find(".leftSealMark").css("left", (rsmsp - halfSM + 7) + "mm");	// 若偶數頁沒有右騎縫章(最末頁)時, 偶數頁的左騎縫章內縮改為SSO_CONFIG設定的右騎縫章內縮距離扣掉騎縫章半寬後再加7mm的計算值(比照RD-Layout.js)
																	}
																}
															}
														}
													}
												});
											}
											
											// 1120606 Raymond 1120515 新增列印稿格式的第1頁記錄是否要套印騎縫章, 以修正列印稿格式時取消勾選騎縫章仍會列印(額外)騎縫章的問題
											$pages.find(".pg").eq(base).attr("data-printsealmark", opts.printSealMark);
											
											// 1110615 Raymond 1110416 合併一代1030961 套印密件浮水印
											// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
											// var sec = $(mailMergedXml.documentElement).find("密等及解密條件或保密期限 > 密等").attr("代碼");
											var sec = theSSO.Util.htmlEncode($(mailMergedXml.documentElement).find("密等及解密條件或保密期限 > 密等").attr("代碼"));
											// 1111013 Raymond 陸委會序333 修正密件浮水印的文號未顯示支號的問題
											// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
											// var subno = $(mailMergedXml.documentElement).find("發文字號 > 文號 > 支號").text();
											var subno = theSSO.Util.htmlEncode($(mailMergedXml.documentElement).find("發文字號 > 文號 > 支號").text());
											if(opts.printWaterMark || (enableSpecialWaterMark && !!sec && sec.length > 0 && sec.indexOf("密") >= 0)) {
												var n = $pages.find(".pg").length - base;
												for(var i=0; i<n; i++) {
													var $pg = $pages.find(".pg").eq(base + i);
													if(rsrcFile.category == "稿") {
														var orgNd = SSOUtil.getOrgNode(fm.getDocObj().sourceOrgNo);
														// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
														// var orgNm = (!!orgNd)?$(orgNd).find("OrgName").text():fm.getDocObj().sourceOrgNo;
														var orgNm = (!!orgNd)?theSSO.Util.htmlEncode($(orgNd).find("OrgName").text()):fm.getDocObj().sourceOrgNo;
														// 1111013 Raymond 陸委會序333 修正密件浮水印的文號未顯示支號的問題
														//_printSpecialWaterMark(1, $pg, orgNm, fm.getDocNo(), sec);	// 用稿件自己的密等不是用最高密等
														_printSpecialWaterMark(1, $pg, orgNm, fm.getDocNo() + subno, sec);	// 用稿件自己的密等不是用最高密等
													}
													else {// 文類型簽核用要用什麼名稱?
														var orgNd = SSOUtil.getOrgNode(fm.getDocObj().sourceOrgNo);
														// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
														// var orgNm = (!!orgNd)?$(orgNd).find("OrgName").text():fm.getDocObj().sourceOrgNo;
														var orgNm = (!!orgNd)?theSSO.Util.htmlEncode($(orgNd).find("OrgName").text()):fm.getDocObj().sourceOrgNo;
														// 1111013 Raymond 陸委會序333 修正密件浮水印的文號未顯示支號的問題
														//_printSpecialWaterMark(1, $pg, orgNm, fm.getDocNo(), sec);
														_printSpecialWaterMark(1, $pg, orgNm, fm.getDocNo() + subno, sec);
													}
												}
											}
											
											// 1060918 Raymond 1060738 若有指定列印範圍, 則依設定值屏蔽頁面
											if(opts.printRange != "-1") {
												var dash = opts.printRange.indexOf("-");
												if(dash > 0) {
													var mi = parseInt(opts.printRange.substr(0, dash));
													var ma = parseInt(opts.printRange.substr(dash + 1));
													if(typeof mi == "number" || typeof ma == "number") {
														var b, e;
														if(typeof mi == "number")
															b = Math.max(mi, 1);
														else
															b = 1;
														if(typeof ma == "number")
															e = Math.min(Math.max(ma, 1), nfo.pages);
														else
															e = nfo.pages;
														theLogger.warn("列印範圍:" + b + " - " + e);
														for(var i=1; i<=nfo.pages; i++) {
															if(i < b || i > e)
																$pages.find(".pg").eq(base + i - 1).hide();
														}
													}
													else
														theLogger.error("指定列印範圍'" + opts.printRange + "'不合法!");
												}
												else {
													var po = parseInt(opts.printRange);
													if(typeof po == "number") {
														if(po <= 0)
															theLogger.error("指定列印範圍'" + opts.printRange + "'不合法!");
														else if(po > nfo.pages)
															theLogger.error("指定列印範圍'" + opts.printRange + "'超出總頁數!");
														else
															for(var i=1; i<=nfo.pages; i++) {
																if(i != po)
																	$pages.find(".pg").eq(base + i - 1).hide();
															}
													}
													else
														theLogger.error("指定列印範圍'" + opts.printRange + "'非數字!");
												}
											}
											// 套印簽核物件
											var n = fm.getDraftPageCounts(draftIdx);
											var deferreds = [];
											
											// 1060614 Raymond 1060471 下載圖檔影像
											var $imgs = $pages.find("div.img");
											if($imgs.length > 0) {
												$imgs.each(function(idx, div) {
													var imgFullPath = $(div).attr("data-src");
													if(imgFullPath) {
														var p = imgFullPath.lastIndexOf("\\");
														var dirPath = imgFullPath.substr(0, p);
														var fileName = imgFullPath.substr(p + 1);
														deferreds.push(function(div, dirPath, fileName) {
															var dfd2 = $.Deferred();
															//2017.01.17	Leslie	效能精進，減少無謂的下載行為，改用theCacheMgr.get()
															theCacheMgr.get({type:"rsrc",rsrc:{wfioUrl:rsrcFile.remote.getWFIOURL(),filePath:imgFullPath}})
																.done(function(img){
																	if(img != undefined){
																		$(div).find("img").attr("src", img);
																		$(div).removeAttr("data-src");	//已下載完成，拿掉屬性以避免重覆執行
																		dfd2.resolve();
																	}
																})
																.fail(function(errorText) {
																	theLogger.error("下載'" + dirPath + "\\" + fileName + "'失敗!" + errorText);
																	dfd2.reject("下載'" + dirPath + "\\" + fileName + "'失敗!" + errorText);
																});
															return dfd2.promise();
														}(div, dirPath, fileName));
													}
													else
														theLogger.error("圖檔物件路徑未設定");
												});
											}
											var soList = [];	// 2017.2.8 顯示的簽核物件以此陣列記錄, 列印簽核資訊頁時, 以此陣列包含的簽核物件及順序排列顯示
											var scList = [];	// 1100712 Raymond 1100649 新增應顯示的簽核意見陣列記錄
											if(rsrcFile.category == "稿" && fm.getSignType() == "E") {	// 2016.10.13 FIX, 紙本簽核及繕校用不需要印簽核物件
												for(var i=0; i<n; i++) {
													var pg = fm.getDraftPage(draftIdx, i);
													if(pg) {
														var $pg = $pages.find(".pg").eq(base + i).attr("data-pgIdx", base + i);
														// 1140924 Raymond 1141329 新增當有pg但無對應頁次時, 判斷如果是文稿且非第一頁, 則往前遞減頁次, 找到最後一頁當作目前頁
														if(!$pg.length && !!pg.container.guid && i > 0) {
															let x = i - 1;
															do {
																$pg = $pages.find(".pg").eq(base + x);
																if($pg.length)
																	break;
															}while(--x >= 0);
														}
														if($pg.length) {
															/* 2017.2.8 改從外部記錄檔取以文稿為基礎的簽核物件來顯示
															if("signObjs" in pg) {
																for(var j=0; j<pg.signObjs.length; j++) {
																	var so = pg.signObjs[j];
																	theLogger.log("應buildSO(" + (base + i) + ")");
																	deferreds.push(_buildSO(fm, j, so, pg, $pg));
																}
															}
															if("reservedSO" in pg) {
																for(var j=0; j<pg.reservedSO.length; j++) {
																	var so = pg.reservedSO[j];
																	theLogger.log("應buildSO(" + (base + i) + ")");
																	deferreds.push(_buildSO(fm, j, so, pg, $pg));
																}
															}*/
															// 2017.2.8 從外部記錄檔取以文稿為基礎的簽核物件
															if("guid" in pg.container && !!pg.container.guid) {
																// 1060504 Raymond 列印改取Runtime時期的文稿物件, 因為不可編輯內文的情況下不應該會新增版本, 可能導致實際頁數與目前最後版本的頁數不一致, 簽核區域資訊也不一致
																//var d0 = fm.getSignFolder().xSignFolder().getDraft(pg.container.guid);
																var d0 = fm.getSignFolder().xSignFolder().getRuntimeDraft(pg.container.guid);
																if(!!d0) {
																	// 1060517 Raymond 1060244 修正不保留簽核物件列印時, 仍會印出之前流程點的簽核物件問題
																	var d;
																	if(pg.container.dirty()) {
																		theLogger.log("文稿已異動, 取得Runtime時期的異動版本(ID:" + pg.container.id + "X)");
																		d = d0.getVer(pg.container.id + "X");
																		if(!d) {
																			theLogger.error("無法取得Runtime時期的異動版本, 回復取得目前檢視的文稿版本(ID:" + pg.container.id + ")");
																			d = d0.getVer(pg.container.id);
																		}
																	}
																	else
																		d = d0.getVer(pg.container.id);
																	if(!!d) {
																		// 1100728 Raymond 1100928 新增搜尋被取代掉的文字意見ID陣列
																		var substedSO = [];
																		function doSearchSubstedSO(v, cv, showTypeB) {
																			if(v.keepSO == "true") {
																				var pv = d0.getPrevVer(v.id);
																				if(!!pv)
																					doSearchSubstedSO(pv, cv, false);	// 之前版本不要顯示框外物件
																			}
																			// 1130126 Raymond 1120887 分會流程點可能不保留前一版本的簽核物件, 需再從搜尋前一個分會流程點的保留簽核物件
																			else {
																				var pv = d0.getPrevDispatchVer(v.id);
																				if(!!pv) {
																					theLogger.warn("找到前一分會流程點(" + pv.msgId + "), 搜尋該版本的被取代文字意見簽核物件");
																					doSearchSubstedSO(pv, cv, false);	// 之前版本不要顯示框外物件
																				}
																			}
																			for(var j=0; j<v.xSignObjs.length; j++) {
																				var so = v.xSignObjs[j];
																				if(coll.indexOf(so.msgId) >= 0) {
																					if(!!so.ref.substObjId) {
																						theLogger.log("被取代的他流程文字意見(ID:" + so.ref.substObjId + ")");
																						substedSO.push(so.ref.substObjId);
																					}
																				}
																			}
																		}
																		doSearchSubstedSO(d, d0.getLastVer(), true);	// 目前版本要顯示框外物件, 2017.2.22 第2個參數改用當前版本
																		if("newSignObjs" in pg) {
																			for(var j=0; j<pg.newSignObjs.length; j++) {
																				var so = pg.newSignObjs[j];
																				if(!!so.substObjId) {
																					theLogger.log("被取代的他流程文字意見(ID:" + so.substObjId + ")");
																					substedSO.push(so.substObjId);
																				}
																			}
																		}
																		// end of 1100728 Raymond 1100928 新增搜尋被取代掉的文字意見ID陣列
																		
																		function doBuildSO(v, cv, showTypeB) {	// 參數1為指定版本, 參數2為目前版本, 參數3為是否顯示框外物件
																			if(v.keepSO == "true") {	// 2017.2.23 先顯示前面版本的, 簽核物件加入的順序才會由早至晚
																				theLogger.warn("保留顯示前一版本的簽核物件");
																				// 1060504 Raymond 修正改用變數d0取代重取文稿物件fm.getSignFolder().xSignFolder().getDraft(pg.container.guid)
																				//var pv = fm.getSignFolder().xSignFolder().getDraft(pg.container.guid).getPrevVer(v.id);
																				var pv = d0.getPrevVer(v.id);
																				if(!!pv)
																					doBuildSO(pv, cv, false);	// 之前版本不要顯示框外物件
																			}
																			// 1130125 Raymond 1120887 分會流程點可能不保留前一版本的簽核物件, 需再從搜尋前一個分會流程點的保留簽核物件
																			else {
																				var pv = d0.getPrevDispatchVer(v.id);
																				if(!!pv) {
																					theLogger.warn("找到前一分會流程點(" + pv.msgId + "), 保留該版本的簽核物件");
																					doBuildSO(pv, cv, false);	// 之前版本不要顯示框外物件
																				}
																			}
																			for(var j=0; j<v.xSignObjs.length; j++) {	// 1100728 Raymond fix loop var dup i->j
																				var so = v.xSignObjs[j];				// 1100728 Raymond fix loop var dup i->j
																				// 1110907 Raymond 1101369 修正列印簽稿會核單時若重複的會辦單位分別位於不同頁次, 仍會重複顯示簽核物件的問題
																				// 1100728 Raymond 1100928 新增符合被取代掉的文字意見ID陣列, 則不要顯示
																				//if(coll.indexOf(so.msgId) >= 0) {
																				//if(coll.indexOf(so.msgId) >= 0 && substedSO.indexOf(so.id) < 0) {
																				if(coll.indexOf(so.msgId) >= 0 && substedSO.indexOf(so.id) < 0 && soList.indexOf(so.ref) < 0) {
																					if(so.type == "A") {	// 簽核框內物件, 找此頁有無相同TYPE及ID的簽核區域加蓋
																						/*if("signAreas" in _memPPD[_currPo.draftIdx]) {
																							for(var j=0; j<_memPPD[_currPo.draftIdx].signAreas.length; j++) {
																								var sa = _memPPD[_currPo.draftIdx].signAreas[j];
																								if(toSAType(so.saType) == toSAType(sa.saType) &&
																									so.saID == sa.id && sa.po == pg.po) {
																									theLogger.warn("簽核物件(ID:" + so.id + ")位於此頁(#" + pg.po + ")的簽核區域內(Type:" + sa.saType + ",ID:" + sa.id + ")內(offset:" + so.offset.x + "," + so.offset.y + ")");
																									buildSOTypeA(so, sa, $pg);
																									break;	// break for-j-loop
																								}
																							}
																						}
																						else*/ {// 調閱非動態產生文稿頁面, 無signAreas, 要改從外部簽核物件記錄檔的目前版本記錄中讀取
																							for(var k=0; k<cv.xSignAreas.length; k++) {	// 1100728 Raymond fix loop var dup j->k
																								var sa = cv.xSignAreas[k];				// 1100728 Raymond fix loop var dup j->k
																								if(toSAType(so.saType) == toSAType(sa.saType) &&
																									so.saID == sa.saID && sa.pgIdx == pg.po) {	// 目前版本的簽框區域位於此頁
																									// 1140923 Raymond 1141329 偵測簽核區域是否真的在本頁, 不在本頁的話先往後搜尋對應的簽核區域所在頁次, 找不到再往前搜尋
																									let ptrn = ".sign-area[data-satype='" + sa.saType + "'][data-id='" + sa.saID + "']";
																									if($pg.find(ptrn).length == 0) {	// 對應的簽核區域不在本頁次
																										theLogger.warn("簽核物件(ID:" + so.id + ")預設的頁次(" + pg.po + ")找不到對應的簽核區域(saType:" + sa.saType + ", saID:" + sa.saID + "), 往後搜尋其它頁次");
																										let found = false;
																										let $nxt = $pg.nextUntil("[data-printsealmark]");
																										for(let x=0; x<$nxt.length; x++) {
																											if($nxt.eq(x).find(ptrn).length) {
																												theLogger.warn("簽核物件(ID:" + so.id + ")位於後" + (x+1) + "頁(po:" + $nxt.eq(x).attr("data-po") + ")的簽核區域(saType:" + sa.saType + ", saID:" + sa.saID + ")內");
																												if("ref" in so && !!so.ref) {
																													if(so.ref.type.match(/章戳|文字意見|圖檔/)) {
																														let ofSA = $nxt.eq(x).find(ptrn).eq(0).offset(),
																															ofPg = $nxt.eq(x).offset(),
																															saN = {left: (ofSA.left - ofPg.left) * 2480 / 794, top: (ofSA.top - ofPg.top) * 3507 / 1123};
																														if(printSOPages)
																															deferreds.push(_buildSOTypeA2(so, saN, $nxt.eq(x), soList.length + 1));
																														else
																															deferreds.push(_buildSOTypeA2(so, saN, $nxt.eq(x)));
																														soList.push(so.ref);
																													}
																												}
																												else {
																													theLogger.error("無對應實際簽核物件");
																												}
																												found = true;
																												break;
																											}
																										}
																										if(!found) {
																											if($pg.is("[data-printsealmark]"))
																												theLogger.warn("本頁已是本稿件第一頁, 無法再往前搜尋其它頁次");
																											else {
																												theLogger.warn("往前搜尋其它頁次");
																												let $prv = $pg.prevUntil("[data-printsealmark]");
																												for(var x=0; x<$prv.length; x++) {
																													if($prv.eq(x).find(ptrn).length) {
																														theLogger.warn("簽核物件(ID:" + so.id + ")位於前" + (x+1) + "頁(po:" + $prv.eq(x).attr("data-po") + ")的簽核區域(saType:" + sa.saType + ", saID:" + sa.saID + ")內");
																														if("ref" in so && !!so.ref) {
																															if(so.ref.type.match(/章戳|文字意見|圖檔/)) {
																																let ofSA = $prv.eq(x).find(ptrn).eq(0).offset(),
																																	ofPg = $prv.eq(x).offset(),
																																	saN = {left: (ofSA.left - ofPg.left) * 2480 / 794, top: (ofSA.top - ofPg.top) * 3507 / 1123};
																																if(printSOPages)
																																	deferreds.push(_buildSOTypeA2(so, saN, $prv.eq(x), soList.length + 1));
																																else
																																	deferreds.push(_buildSOTypeA2(so, saN, $prv.eq(x)));
																																soList.push(so.ref);
																															}
																														}
																														else {
																															theLogger.error("無對應實際簽核物件");
																														}
																														found = true;
																														break;
																													}
																												}
																												if(!found) {
																													let $pp = ($prv.length)?$prv.eq(x-1):$pg;	// prevUntil("[data-printsealmark]")回傳的不含[data-printsealmark]那個.pg, 所以這段是用prevUntil的最後一頁的前一頁來偵測
																													if($pp.prev().find(ptrn).length) {
																														theLogger.warn("簽核物件(ID:" + so.id + ")位於前" + x + "頁(po:" + $pp.prev().attr("data-po") + ")的簽核區域(saType:" + sa.saType + ", saID:" + sa.saID + ")內");
																														if("ref" in so && !!so.ref) {
																															if(so.ref.type.match(/章戳|文字意見|圖檔/)) {
																																let ofSA = $pp.prev().find(ptrn).eq(0).offset(),
																																	ofPg = $pp.prev().offset(),
																																	saN = {left: (ofSA.left - ofPg.left) * 2480 / 794, top: (ofSA.top - ofPg.top) * 3507 / 1123};
																																if(printSOPages)
																																	deferreds.push(_buildSOTypeA2(so, saN, $pp.prev(), soList.length + 1));
																																else
																																	deferreds.push(_buildSOTypeA2(so, saN, $pp.prev()));
																																soList.push(so.ref);
																															}
																														}
																														else {
																															theLogger.error("無對應實際簽核物件");
																														}
																														found = true;
																														break;
																													}
																												}
																											}
																											if(!found) {
																												theLogger.error("簽核物件(ID:" + so.id + ")位於此頁(pgId:" + pg.id + ")的的簽核區域(saType:" + sa.saType + ", saID:" + sa.saID + ")內, 但此頁及所有頁次都搜尋不到對應的簽核區域");
																												if("ref" in so && !!so.ref) {
																													if(so.ref.type.match(/章戳|文字意見|圖檔/)) {
																														if(printSOPages)
																															deferreds.push(_buildSOTypeA2(so, sa, $pg, soList.length + 1));
																														else
																															deferreds.push(_buildSOTypeA2(so, sa, $pg));
																														soList.push(so.ref);
																													}
																												}
																												else {
																													theLogger.error("無對應實際簽核物件");
																												}
																											}
																										}
																									}
																									else {	// 對應的簽核區域在本頁次
																										theLogger.warn("簽核物件(ID:" + so.id + ")位於此頁(pgId:" + pg.id + ")的簽核區域(saType:" + sa.saType + ", saID:" + sa.saID + ")內");
																										if("ref" in so && !!so.ref) {	// 2017.2.18 bugfix
																											// 1101110 Raymond 修正草稿公文列印簽核物件資訊頁時, 本流程點才新增的簽核物件會重複出現, 及文稿上的簽核物件的序號會跳號的問題
																											if(so.ref.type.match(/章戳|文字意見|圖檔/)) {
																												// 1140924 Raymond 1141329 修正設定與簽核頁面不同的列印行高時, 簽核區域位置會不同於XSignObjs.xml所記錄的, 需要用列印後的位置取代之
																												let ofSA = $pg.find(ptrn).eq(0).offset(),
																													ofPg = $pg.offset(),
																													saN = {left: (ofSA.left - ofPg.left) * 2480 / 794, top: (ofSA.top - ofPg.top) * 3507 / 1123};
																												if(printSOPages)	// 2017.3.10 新增判斷是否列印簽核資訊頁
																													// 1140924 Raymond 1141329 修正設定與簽核頁面不同的列印行高時, 簽核區域位置會不同於XSignObjs.xml所記錄的, 需要用列印後的位置取代之
																													//deferreds.push(_buildSOTypeA2(so, sa, $pg, soList.length + 1));
																													deferreds.push(_buildSOTypeA2(so, saN, $pg, soList.length + 1));
																												else
																													// 1140924 Raymond 1141329 修正設定與簽核頁面不同的列印行高時, 簽核區域位置會不同於XSignObjs.xml所記錄的, 需要用列印後的位置取代之
																													//deferreds.push(_buildSOTypeA2(so, sa, $pg));
																													deferreds.push(_buildSOTypeA2(so, saN, $pg));
																												soList.push(so.ref);	// 加入此物件到將簽核物件清單以供簽核物件資訊頁顯示
																											}
																										}
																										else {
																											theLogger.error("無對應實際簽核物件");
																										}
																									}
																									break;	// 1110829 Raymond 1101369 找到第一個相符的簽核區域ID(會辦單位代碼)即中斷迴圈, 以避免重複會辦單位時, 列印時第二個重複的會辦單位區域重複出現第一個重複的會辦單位區域的簽核物件
																								}
																							}
																						}
																					}
																					else if(so.type == "B" && showTypeB) {	// 簽核框外物件, 且為當前版本時, 找此簽核物件所在頁次相符即顯示
																						if(pg.po == so.pgIdx) {
																							if(pg.container.dirty())	// 列印要判定dirty不顯示框外物件嗎?
																								theLogger.warn("簽核區域外簽核物件(ID:" + so.id + ")位於此頁(po:" + pg.po + "), 由於文稿內容已異動故不顯示");
																							else {
																								theLogger.warn("簽核物件(ID:" + so.id + ")位於此頁(po:" + pg.po + ")");
																								if(printSOPages)	// 2017.3.10 新增判斷是否列印簽核資訊頁
																									deferreds.push(_buildSOTypeB(so, $pg, soList.length + 1));
																								else
																									deferreds.push(_buildSOTypeB(so, $pg));
																								soList.push(so.ref);	// 加入此物件到將簽核物件清單以供簽核物件資訊頁顯示
																							}
																						}
																					}
																				}
																				else
																					theLogger.warn("目前流程點不需顯示'" + so.msgId + "'產生的簽核物件(ID:" + so.id + ")");
																			}
																		};
																		doBuildSO(d, d0.getLastVer(), true);	// 目前版本要顯示框外物件, 2017.2.22 第2個參數改用當前版本
																	}
																	else {
																		theLogger.error("外部簽核物件記錄檔找不到GUID:" + pg.container.guid + "的文稿記錄");
																	}
																}
																else {
																	if("attType" in pg.container) {	// 2017.1.24 附件頁面不會有簽核區域, 一律以框外物件視之
																		$.each(pg.signObjs, function(i, so) {
																			if(printSOPages)	// 2017.3.10 新增判斷是否列印簽核資訊頁
																				deferreds.push(_buildSOTypeB(so, $pg, soList.length + 1));
																			else
																				deferreds.push(_buildSOTypeB(so, $pg));
																			soList.push(so);	// 加入此物件到將簽核物件清單以供簽核物件資訊頁顯示
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
																		if(printSOPages)	// 2017.3.10 新增判斷是否列印簽核資訊頁
																			deferreds.push(_buildSOTypeB(so, $pg, soList.length + 1));
																		else
																			deferreds.push(_buildSOTypeB(so, $pg));
																		soList.push(so);	// 加入此物件到將簽核物件清單以供簽核物件資訊頁顯示
																	});
																}
																else
																	theLogger.error("文稿無GUID, 無法顯示簽核物件");
															}
															if("newSignObjs" in pg) {
																for(var j=0; j<pg.newSignObjs.length; j++) {
																	var so = pg.newSignObjs[j];
																	theLogger.log("應buildSOX(" + (base + i) + ")");
																	// 1140924 Raymond 1141329 偵測簽核區域內新增的簽核物件是否真的在本頁, 不在本頁的話先往後搜尋對應的簽核區域所在頁次, 找不到再往前搜尋
																	if(!!so.saType && !!so.saID) {	// 簽框區域內物件
																		let ptrn = ".sign-area[data-satype='" + so.saType + "'][data-id='" + so.saID + "']";
																		if($pg.find(ptrn).length == 0) {	// 對應的簽核區域不在本頁次
																			theLogger.warn("簽核物件(ID:" + so.id + ")原本的頁次(" + pg.po + ")找不到對應的簽核區域(saType:" + so.saType + ", saID:" + so.saID + "), 往後搜尋其它頁次");
																			let found = false;
																			let $nxt = $pg.nextUntil("[data-printsealmark]");
																			for(let x=0; x<$nxt.length; x++) {
																				if($nxt.eq(x).find(ptrn).length) {
																					theLogger.warn("簽核物件(ID:" + so.id + ")位於後" + (x+1) + "頁(po:" + $nxt.eq(x).attr("data-po") + ")的簽核區域(saType:" + so.saType + ", saID:" + so.saID + ")內");
																					if(printSOPages)
																						deferreds.push(_buildSOX(fm, j, so, pg, $nxt.eq(x), soList.length + 1));
																					else
																						deferreds.push(_buildSOX(fm, j, so, pg, $nxt.eq(x)));
																					found = true;
																					break;
																				}
																			}
																			if(!found) {
																				if($pg.is("[data-printsealmark]"))
																					theLogger.warn("本頁已是本稿件第一頁, 無法再往前搜尋其它頁次");
																				else {
																					theLogger.warn("往前搜尋其它頁次");
																					let $prv = $pg.prevUntil("[data-printsealmark]");
																					for(var x=0; x<$prv.length; x++) {
																						if($prv.eq(x).find(ptrn).length) {
																							theLogger.warn("簽核物件(ID:" + so.id + ")位於前" + (x+1) + "頁(po:" + $prv.eq(x).attr("data-po") + ")的簽核區域(saType:" + so.saType + ", saID:" + so.saID + ")內");
																							if(printSOPages)
																								deferreds.push(_buildSOX(fm, j, so, pg, $prv.eq(x), soList.length + 1));
																							else
																								deferreds.push(_buildSOX(fm, j, so, pg, $prv.eq(x)));
																							found = true;
																							break;
																						}
																					}
																					if(!found) {
																						let $pp = ($prv.length)?$prv.eq(x-1):$pg;	// prevUntil("[data-printsealmark]")回傳的不含[data-printsealmark]那個.pg, 所以這段是用prevUntil的最後一頁的前一頁來偵測
																						if($pp.prev().find(ptrn).length) {
																							theLogger.warn("簽核物件(ID:" + so.id + ")位於前" + x + "頁(po:" + $pp.prev().attr("data-po") + ")的簽核區域(saType:" + so.saType + ", saID:" + so.saID + ")內");
																							if(printSOPages)
																								deferreds.push(_buildSOX(fm, j, so, pg, $pp.prev(), soList.length + 1));
																							else
																								deferreds.push(_buildSOX(fm, j, so, pg, $pp.prev()));
																							found = true;
																							break;
																						}
																					}
																				}
																				if(!found) {
																					theLogger.error("簽核物件(ID:" + so.id + ")位於此頁(pgId:" + pg.id + ")的的簽核區域(saType:" + so.saType + ", saID:" + so.saID + ")內, 但此頁及所有頁次都搜尋不到對應的簽核區域");
																					if(printSOPages)
																						deferreds.push(_buildSOX(fm, j, so, pg, $pg, soList.length + 1));
																					else
																						deferreds.push(_buildSOX(fm, j, so, pg, $pg));
																				}
																			}
																		}
																		else {	// 對應的簽核區域在本頁次
																			if(printSOPages)
																				deferreds.push(_buildSOX(fm, j, so, pg, $pg, soList.length + 1));
																			else
																				deferreds.push(_buildSOX(fm, j, so, pg, $pg));
																		}
																	}
																	else {	// 簽核區域外物件
																	if(printSOPages)	// 2017.3.10 新增判斷是否列印簽核資訊頁
																		deferreds.push(_buildSOX(fm, j, so, pg, $pg, soList.length + 1));
																	else
																		deferreds.push(_buildSOX(fm, j, so, pg, $pg));
																	}
																	soList.push(so);	// 加入此物件到將簽核物件清單以供簽核物件資訊頁顯示
																}
															}
														}
														else {
															theLogger.error("第" + i + "頁有pg但無$pg");
														}
													}
												}
												
												// 1150309 Raymond 1150145 將整理簽辦意見清單的功能獨立成一個function, 以供列印文稿及來文兩功能共用
												// 1100712 Raymond 1100649 新增應顯示的簽核意見 copy from _setupComments@RD-AOL.js
												/*if(filterNUK)
													scList.filterNUK = filterNUK;	// 勾選僅顯示會辦單位長官意見選項時, 簽核物件資訊頁要顯示「僅顯示會辦單位長官意見」
												// 1111026 Raymond 1110864 合併1101468, 啟用分文稿記錄簽核意見功能時, 改以各文稿選項物件中記錄的filterNUK為準
												if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y")
													scList.filterNUK = opts.filterNUK;
												// 1141014 Raymond 1141129 新增列印簽核物件資訊頁(內部意見)
												if(filterTAITRA)
													scList.filterTAITRA = filterTAITRA;
												
												function _getDocToDoListItem(docToDoList, msgId) {
													for(var i=0; i<docToDoList.length; i++)
													{
														var item = docToDoList[i];
														if (item.msgId==msgId) {
															return item;
														}
													}
													return null;
												}
												// copy from RD-SysUtil.js
												function _getOrgUnitVirtualCode(orgNode, unitNo) {
													if (!!orgNode && !!unitNo && unitNo.length)
													{
														var unitPath = 'Unit[UnitCode="' + unitNo + '"]';
														var $unitNodes, unitNode, virtualCode;
														var i=0;
														if (!!orgNode)
														{
															$unitNodes = $(orgNode).find(unitPath);
															if ($unitNodes.length<=0) {
																return '';
															}
																
															unitNode = $unitNodes[0];
															if (!!unitNode)
															{
																virtualCode = SSOUtil.xml_getChildNodeValue(unitNode, 'Virtual');
																if (typeof virtualCode !== 'undefined' && virtualCode.length) {
																	return virtualCode;
																}
															}
														}
													}
													return '';
												}
												var aolFlows = fm.getSignFolder().getAolFlow();
												var docToDoList = SSOUtil.getDocToDoList(fm.getDocNo(), localStorage.Artifact);
												var orgNode = SSOUtil.getOrgNode(fm.getDocObj().sourceOrgNo);
												var nMaxDraftMsgId = 1999;
												//var idx = aolFlows.flows.length - 1;
												var m = aolFlows.flows.length;
												//若最後一個AolFlow項目為目前流程點, 跳過
												//var aolFlow = aolFlows.flows.length ? aolFlows.flows[idx] : null; // 2016.10.12 - bug-fix, 草稿無法開啟簽辦意見子視窗問題
												var aolFlow = aolFlows.flows.length ? aolFlows.flows[m-1] : null; // 2016.10.12 - bug-fix, 草稿無法開啟簽辦意見子視窗問題
												var flowMsgId = (!!aolFlow) ? aolFlow.id.substr(aolFlow.id.lastIndexOf('_') + 1) : '';
												var todoMsgId = '';
												if(!fm.readOnly() && theSSO.MP.todolist.builder.isDraftMsg(fm.getDocObj())) {
													var idxUL = fm.getDocObj().msgId.indexOf('_');
													if (idxUL>0) {
														todoMsgId = fm.getDocObj().msgId.substring(0, idxUL);
													}
												}
												else {
													todoMsgId = fm.getDocObj().msgId;
												}
												if (flowMsgId.length && (flowMsgId===todoMsgId)) {
													//idx--;
													m--;
												}
												var $item, sItem, itemDTDL, nMsgId;
												var comment;
												// 1100706 Raymond 1100648 新增支援分文稿記錄簽核意見功能
												var currDraftInfo = dm.draftInfo;
												// 1110207 Raymond 1110013 新增判斷核決流程點
												var firstAppFlow = undefined;
												// 1150304 Raymond 1150145 新增暫時Array
												if(SSO_CONFIG.OrgNickName == "TAITRA")
													var tmpSC = [];
												// 最近的流程先加!
												//for (; idx>=0; idx--)
												for (var idx=0; idx<m; idx++)
												{
													aolFlow = aolFlows.flows[idx];
													// 1090430 Raymond 1090261 恢復由docToDoList取得流程點資訊
													// 1070410 Raymond 1070463 直接以封裝裝記錄的流程點資訊顯示單位、角色、姓名, 以避免因OrgInfo找不到該此帳號資訊而當掉
													flowMsgId = aolFlow.id.substr(aolFlow.id.lastIndexOf('_') + 1);
													nMsgId = parseInt(flowMsgId);
													if (nMsgId<nMaxDraftMsgId && !!docToDoList && docToDoList.length) {
														itemDTDL = docToDoList[0];
													}
													else if (!!docToDoList) {
														itemDTDL = _getDocToDoListItem(docToDoList, flowMsgId);
													}*/
													/* 1090430 Raymond 1090261 單位、角色、姓名仍直接以封裝檔記錄的流程點資訊顯示, docToDoList的Item只用來判定是否為代理流程點
													if (itemDTDL===undefined || itemDTDL===null) {
														continue;
													}
													
													// 2014.2.18 - 若流程點未記錄人員帳號, 則不列入!
													if (!itemDTDL.ownUserId || (itemDTDL.ownUserId.length===0)) {
														// 沒有人員帳號資訊 => 非一般簽核流程!
														continue;
													}
													
													// 2016.11.25 - 目前流程點, 不加入! (後續作業會append上去)
													if (flowMsgId==todoMsgId) {
														continue;
													}
													
													// 2014.2.18 - 總收文/發文/繥印/校對角色流程不列入!
													//OD91 > 收文, OD92 > 繕印, OD93 > 校對, OD94 > 發文, OD95 > 檔管, OD96 > 研考
													if (itemDTDL.ownRoleId==='OD91' || itemDTDL.ownRoleId==='OD92' || itemDTDL.ownRoleId==='OD93' ||
														itemDTDL.ownRoleId==='OD94' || itemDTDL.ownRoleId==='OD95' || itemDTDL.ownRoleId==='OD96') {
														continue;	
													}
													
													thisUserInfo = SSOUtil.getOrgUserInfo(orgNode, itemDTDL.ownOUId, itemDTDL.ownRoleId, itemDTDL.ownUserId, '');*/
													/*portraitUrl = SSOUtil.getRoleIconPathname(docObj.sourceOrgNo, itemDTDL.ownOUId, itemDTDL.ownRoleId);
													if("refChangeInfo" in aolFlow) {
//														thisUserInfo = {
//															OUName: aolFlow.refChangeInfo.charger.ou,
//															RoleName: aolFlow.refChangeInfo.charger.role,
//															UserName: aolFlow.refChangeInfo.charger.name
//														}
														// 1090430 Raymond 1090261 檢核docToDoList的Item的proxySend是否為1, 是則表示為代理流程點
//														if(!!itemDTDL && itemDTDL.proxySend == "1") {
//															theLogger.log("MsgID:" + itemDTDL.msgId + "為代理流程點, 流程點人員名稱變更為'" + aolFlow.refChangeInfo.charger.name + "(代)'");
//															thisUserInfo.UserName += "(代)";
//														}
														if(scList.filterNUK) {	// 會辦單位僅顯示單位主官簽核意見
															//var ouName = aolFlow.refChangeInfo.charger.ou;
															//var ouId = SSOUtil.getOrgUnitNoByName(orgNode, ouName);
															//var roleName = aolFlow.refChangeInfo.charger.role;
															//var roleId = SSOUtil.getOrgRoleNoByName(orgNode, ouId, roleName);
															//if(ouId != fm.getDocObj().icOUId && ouId)
															theLogger.warn("過濾會辦單位僅顯示單位主官簽核意見...");
															if(!!itemDTDL && itemDTDL.ownOUId != fm.getDocObj().ICOUId &&	// 條件1.非承辦單位
																_getOrgUnitVirtualCode(orgNode, itemDTDL.ownOUId) != 3) {	// 條件2.非一級決行單位
																if(itemDTDL.ownRoleId != "OD11") {	// 非主管
																	theLogger.log("#" + aolFlow.id + "為非承辦非一級決行單位(" + itemDTDL.ownOUId + "), 且非主管角色(" + itemDTDL.ownRoleId + "), 忽略不顯示");
																	continue;
																}
															}
														}
														// 1110207 Raymond 1110013 新增判斷核決流程點
														if(!firstAppFlow) {
															if(!!itemDTDL && !!itemDTDL.appUserId && itemDTDL.appUserId.length > 0 && !!itemDTDL.appRoleId && itemDTDL.appRoleId.length > 0) {
																theLogger.log("第1個核決流程點是" + itemDTDL.msgId);
																firstAppFlow = itemDTDL.msgId;
															}
														}
														// 1141014 Raymond 1141129 列印簽核物件資訊頁時, 若機關暱稱為"TAITRA"(外貿), 則同一級單位只顯示最後一個流程點
														if(SSO_CONFIG.OrgNickName == "TAITRA") {
															if(scList.length > 0) {
																let lastsc = scList[scList.length - 1];
																if(!!itemDTDL && itemDTDL.ownOUId.substr(0, 2) == lastsc.ownOUId.substr(0, 2)) {
																	if(scList.filterTAITRA == true && fm.getDocObj().get("ODWMSG", "OWN_OU_ID").substr(0, 2) == lastsc.ownOUId.substr(0, 2)) {
																		theLogger.log("前一個流程點與目前流程點是同一級單位, 保留之");
																	}
																	else {
																		// 1150304 Raymond 1150145 刪除的流程改放到暫時Array
																		//theLogger.log("前一個流程點是同一級單位, 刪除之");
																		//scList.pop();
																		theLogger.log("前一個流程點是同一級單位, 改放到暫時Array");
																		tmpSC.push(scList.pop());
																	}
																}
															}
														}
													}
													else	// 無異動資訊的流程點(ex.分文)不需要顯示簽核意見
														continue;
													
													// 1150304 Raymond 1150145 刪除的流程從暫時Array放到此流程下
													if(tmpSC.length > 0) {
														if(scList.length > 0 && !scList[scList.length - 1].sameOUFlows) {
															scList[scList.length - 1].sameOUFlows = [...tmpSC];
															tmpSC = [];
														}
													}
													
													comment = '[無簽核意見]';
													// 1100706 Raymond 1100648 新增支援分文稿記錄簽核意見功能
													if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
														var missCurrDraft = true;	// 要顯示的簽核流程是否找得到目前顯示的文稿, 找不到的話表示是此簽核流程之後才新增的文稿, 就不要顯示此簽核流程
														try {
															if(!!aolFlow.refSignInfo && aolFlow.refSignInfo.drafts.length > 0) {
																for(var i=0; i<aolFlow.refSignInfo.drafts.length; i++) {
																	if(aolFlow.refSignInfo.drafts[i].guid == currDraftInfo.guid) {	// 用GUID判斷與目前顯示文稿是否同一筆
																		if(!currDraftInfo.id.match(/^NewDraft/))	// 排除本流程點所新增的文稿
																			missCurrDraft = false;	// 找到目前文稿, 要顯示此簽核流程
																		if(aolFlow.refSignInfo.drafts[i].signComment.length > 0) {
																			comment = aolFlow.refSignInfo.drafts[i].signComment;
																		}
																		break;
																	}
																}
															}
														}
														catch(e) {
															theLogger.error(e.errorText);
														}
														// 1111027 Raymond 1110864 合併1101468, 新增當啟用「顯示我的最終意見」功能時支援隱藏簽辦意見(「僅顯示我的最終意見」設定)功能
														if(theSSO.User.EnvSettings.get("AOL_SHOW_MY_FINAL_COMMENT") == "Y" && opts.showAllComments == false) {
															var xD = fm.getSignFolder().xSignFolder().getDraft(currDraftInfo.guid);
															if(!!xD) {
																var xHC = xD.getHideComment(flowMsgId);
																if(!!xHC) {
																	if(xHC.value == "true") {
																		theLogger.log("隱藏[" + aolFlow.refChangeInfo.charger.ou + "-" + aolFlow.refChangeInfo.charger.role + "-" + aolFlow.refChangeInfo.charger.name + "(" + aolFlow.refChangeInfo.charger.userId + ")]的簽辦意見");
																		continue;
																	}
																	else if(xHC.value == "false") {
																		theLogger.log("顯示[" + aolFlow.refChangeInfo.charger.ou + "-" + aolFlow.refChangeInfo.charger.role + "-" + aolFlow.refChangeInfo.charger.name + "(" + aolFlow.refChangeInfo.charger.userId + ")]的簽辦意見為最終意見");
																		comment += "(最終意見)";
																	}
																}
															}
														}
													}
													else if ((typeof aolFlow.refChangeInfo!=='undefined') && (typeof aolFlow.refChangeInfo.comment!=='undefined') && aolFlow.refChangeInfo.comment.length) {
														comment = aolFlow.refChangeInfo.comment;
														// 1111027 Raymond 1110864 合併1101468, 新增當啟用「顯示我的最終意見」功能時支援隱藏簽辦意見(「僅顯示我的最終意見」設定)功能
														if(theSSO.User.EnvSettings.get("AOL_SHOW_MY_FINAL_COMMENT") == "Y" && bShowAllComments == false) {
															var xFS = fm.getSignFolder().xSignFolder().getXFlowSigner(flowMsgId);
															if(!!xFS) {
																if(xFS.hideComment == "true") {
																	theLogger.log("隱藏[" + aolFlow.refChangeInfo.charger.ou + "-" + aolFlow.refChangeInfo.charger.role + "-" + aolFlow.refChangeInfo.charger.name + "(" + aolFlow.refChangeInfo.charger.userId + ")]的簽辦意見");
																	continue;
																}
																else if(xFS.hideComment == "false") {
																	theLogger.log("顯示[" + aolFlow.refChangeInfo.charger.ou + "-" + aolFlow.refChangeInfo.charger.role + "-" + aolFlow.refChangeInfo.charger.name + "(" + aolFlow.refChangeInfo.charger.userId + ")]的簽辦意見為最終意見");
																	comment += "(最終意見)";
																}
															}
														}
													}
													
													// 1100706 Raymond 1100648 新增支援分文稿記錄簽核意見功能, 啟用時要判斷此簽核流程找得到目前顯示文稿
													if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") != "Y" || !missCurrDraft) {
													
//														var timeStr = '';
//														if ((typeof aolFlow.refChangeInfo!=='undefined') && (typeof aolFlow.refChangeInfo.timeStamp==='string') && aolFlow.refChangeInfo.timeStamp.length) {
//															timeStr = getTimeString(aolFlow.refChangeInfo.timeStamp);
//														}
//														else if ((typeof itemDTDL.txTime=='string') && itemDTDL.txTime.length) {
//															timeStr = getTimeString(itemDTDL.txTime);
//														}
														// 1110207 Raymond 1110013 新增註記核決流程點
														if(!!firstAppFlow && firstAppFlow == flowMsgId)
															scList.push({flowId: "sign_" + flowMsgId, time: aolFlow.refChangeInfo.timeStamp, content: comment, appFlow: true});
														else
														scList.push({flowId: "sign_" + flowMsgId, time: aolFlow.refChangeInfo.timeStamp, content: comment});
														
														// 1141014 Raymond 1141129 新增記錄Todolist的OwnOUId到簽核意見清單
														if(SSO_CONFIG.OrgNickName == "TAITRA") {
															if(!!itemDTDL)
																scList[scList.length - 1].ownOUId = itemDTDL.ownOUId;
														}
													}	// end of 1100706 Raymond 1100648 新增支援分文稿記錄簽核意見功能, 啟用時要判斷此簽核流程找得到目前顯示文稿
												}
												// 1110323 Raymond 1110249 調閱公文列印簽核物件資訊頁時, 不要顯示目前流程點的簽辦意見
												if(!uo || !("UnvRoot" in uo)) {
													// 1150306 Raymond 1150145 新增判斷最後流程點與目前流程點同一級單位時, 取出暫存
													var lastSC = undefined;
													if(SSO_CONFIG.OrgNickName == "TAITRA" && !scList.filterTAITRA) {
														if(scList.length > 0) {
															let lastsc = scList[scList.length - 1];
															if(fm.getDocObj().get("ODWMSG", "OWN_OU_ID").substr(0, 2) == lastsc.ownOUId.substr(0, 2)) {
																theLogger.log("最後一個流程點與目前流程點是同一級單位, 取出暫存");
																lastSC = scList.pop();
															}
															else {
																theLogger.log("最後一個流程點非同一級單位, 不取出");
															}
														}
													}
													// 最後加入自己流程點的簽核意見
													comment = '[無簽核意見]';
													if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
														if(!!currDraftInfo.newSignComment && currDraftInfo.newSignComment.length)
															comment = currDraftInfo.newSignComment;
													}
													else {
														comment = fm.getSignFolder().signComment();
													}
													scList.push({cTime: Util.now(), content: comment});
													// 1141014 Raymond 1141129 新增記錄Todolist的OwnOUId到簽核意見清單
													if(SSO_CONFIG.OrgNickName == "TAITRA") {
														// 1150306 Raymond 1150145 修正目前流程點的TodoList項目要用docObj.msgId重新取得, 才會是正確的流程點資訊
														nMsgId = fm.getDocObj().msgId;
														if (nMsgId<nMaxDraftMsgId && !!docToDoList && docToDoList.length) {
															itemDTDL = docToDoList[0];
														}
														else if (!!docToDoList) {
															itemDTDL = _getDocToDoListItem(docToDoList, nMsgId);
														}
														if(!!itemDTDL)
															scList[scList.length - 1].ownOUId = itemDTDL.ownOUId;
													}
												}
												// 1150306 Raymond 1150145 新增判斷若tmpSC有內容, 則表示目前流程點還在同一單位內, 將tmpSC加入成目前流程點的sameOUFlows
												if(scList.length > 0 && !scList[scList.length - 1].sameOUFlows) {
													if(tmpSC.length > 0) {
														scList[scList.length - 1].sameOUFlows = [...tmpSC];
														if(!!lastSC)
															scList[scList.length - 1].sameOUFlows.push(lastSC);
														tmpSC = [];
													}
													else if(!!lastSC)
														scList[scList.length - 1].sameOUFlows = [lastSC];
												}*/
												makeSCList(dm, scList, filterNUK, filterTAITRA);
												
												// 套印邊界文字
												n = $pages.find(".pg").length - base;
												for(var i=0; i<n; i++) {
													var $pg = $pages.find(".pg").eq(base + i);
													_printMarginText($pg, fm.getDocNo(), i+1, n, "draft");
												}
												if(deferreds.length) {
													$.when.apply(this, deferreds)
													.done(function() {	// 非同步等待所有簽核物件完成下載顯示
														// 1110627 Raymond 1110271 新增航港局邏輯, 若啟用稿間加蓋騎縫章功能且雙面列印時, 奇數頁文稿跟簽核物件資訊頁間補上空白頁
														if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1) && "printSealMarkBetweenDoc" in SSO_CONFIG && SSO_CONFIG.printSealMarkBetweenDoc == true)
															$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);
														
														// 2017.3.10 是否列印簽核資訊頁改套選項
														if(printSOPages)
															//printSignObjPages(draftIdx, {}, $pages, soList);	// 2017.2.8 傳入第4參數簽核物件清單
															printSignObjPages(draftIdx, {}, $pages, soList, scList);	// 1100712 Raymond 1100649 傳入第5參數簽核意見清單
														else	// 2017.3.14 列印貼式文字意見及數位墨水簽核物件頁面
															printIconizedSOPages(draftIdx, $pages, soList);
														//1061213	Leslie[1061148]	修正雙面列印補頁邏輯，非列印範圍不計入
														//if(bBothSide && ($pages.find(".pg").length % 2 == 1))//2017.2.23	Leslie	新增雙面列印功能
														if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1))//2017.2.23	Leslie	新增雙面列印功能
															$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);	// 補上空白頁
														// 1100217 Raymond 1090610 合併內政部1071265, 更新進度子視窗並於無須暫停或繼續時再resolve
														//dfd.resolve();
														progbar.adv(nfo.pages).done(dfd.resolve).fail(dfd.reject);
													})
													.fail(function(errorText) {
														theLogger.error("套印簽核物件時發生錯誤:" + errorText);
														dfd.reject("套印簽核物件時發生錯誤:" + errorText);
													});
												}
												else{
													// 1110627 Raymond 1110271 新增航港局邏輯, 若啟用稿間加蓋騎縫章功能且雙面列印時, 奇數頁文稿跟簽核物件資訊頁間補上空白頁
													if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1) && "printSealMarkBetweenDoc" in SSO_CONFIG && SSO_CONFIG.printSealMarkBetweenDoc == true)
														$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);
													
													// 1100712 Raymond 1100649 若勾選列印簽核物件資訊頁且有簽核意見清單, 則列印簽核物件資訊頁
													if(printSOPages && scList.length)
														printSignObjPages(draftIdx, {}, $pages, soList, scList);
													//1061213	Leslie[1061148]	補上當頁面無任何簽核物件時，仍應判斷是否需插入最末空白頁
													if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1))
														$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);	// 補上空白頁
													// 1100217 Raymond 1090610 合併內政部1071265, 更新進度子視窗並於無須暫停或繼續時再resolve
													//dfd.resolve();
													progbar.adv(nfo.pages).done(dfd.resolve).fail(dfd.reject);
												}
											}
											else{	// 2016.10.27 繕校用或紙本簽核
												//1061213	Leslie[1061148]	修正雙面列印補頁邏輯，非列印範圍不計入
												//if(bBothSide && ($pages.find(".pg").length % 2 == 1))//2017.2.23	Leslie	新增雙面列印功能
												if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1))//2017.2.23	Leslie	新增雙面列印功能
													$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);	// 補上空白頁
												// 1100217 Raymond 1090610 合併內政部1071265, 更新進度子視窗並於無須暫停或繼續時再resolve
												//dfd.resolve();
												progbar.adv(nfo.pages).done(dfd.resolve).fail(dfd.reject);
											}
										})
										.fail(function(errorText) {
											theLogger.error(errorText);
											dfd.reject(errorText);
										});
								}
								else {
									theLogger.error("套用樣版檔失敗! 無法產生預覽列印頁面");
									dfd.reject("套用樣版檔失敗! 無法產生預覽列印頁面");
								}
							})
							.fail(function(errorText) {
								theLogger.error(errorText);
								dfd.reject(errorText);
							});
					}
					else if(rsrcFile.category == "文" && opts.printMailMerge == true) {	// 分繕用
						// 1070212 Raymond NCKU107217 不論指定受文者含不含附件, 都要標記分繕列印已(不)印出附件頁面, 避免因勾選了附件項目但受文者不含附件而單獨印出附件頁面
						for(var i=0; i<q.length; i++) {
							if(q[i].draftIdx == draftIdx && q[i].type == "attach") {
								theLogger.log("分繕受文者含不含附件都要標記已印出附件[" + q[i].attIdx + "]");
								q[i].printedDuringMailMerge = true;	// 標記附件在分繕列印時已印出
							}
						}
						if(opts.printSingleReceiver) {	// 單選受文者
							if(opts.specifySingleReceiver == "all") {	// 全部受文者
								printMailMergeAllReceivers(dm, fm.getDraftName(draftIdx), fm.getDraftFileName(draftIdx), rsrcFile, opts, $pages, q, draftIdx)	// 2016.11.1 新增參數q及draftIdx
									.done(function() {
										dfd.resolve();
									})
									.fail(function(errorText) {
										theLogger.error(errorText);
										dfd.reject(errorText);
									});
							}
							else {	// 指定受文者
								printMailMergeSingleReceiver(dm, fm.getDraftName(draftIdx), fm.getDraftFileName(draftIdx), rsrcFile, opts, $pages, opts.specifySingleReceiver)
									.done(function(detail) {	// 2016.11.1 列印完本文後, 接著判斷是否含附件, 是則接著列印附件頁面
										if(detail.incAtt == "是") {
											var q2 = [], cursor2 = 0;
											for(var i=0; i<q.length; i++) {
												if(q[i].draftIdx == draftIdx && q[i].type == "attach") {
													// 1070521 Raymond 1070183 新增支援分繕附件列印
													if("dispatchAttachs" in detail) {
														for(var j=0; j<detail.dispatchAttachs.length; j++) {
															if(detail.dispatchAttachs[j].attIdx == q[i].attIdx) {
																theLogger.log("分繕列印'" + detail.name + "'指定分繕附件[" + q[i].attIdx + "]");
																q2.push(q[i]);
																break;
															}
														}
													}
													else {	// 未指定分繕附件時, 列印所有附件
														theLogger.log("分繕列印含附件[" + q[i].attIdx + "]");
														q2.push(q[i]);
													}
													q[i].printedDuringMailMerge = true;	// 標記分繕列印時已印出
												}
											}
											function doSingleAtt() {
												if(cursor2 < q2.length) {
													var item = q2[cursor2++];
													// 1100217 Raymond 1090610 合併內政部1071265, 新增傳入本文detail物件, 供列印附件頁面時判斷是隨本文一併列印的
													//printAttachPages(item.draftIdx, item.attIdx, item, $pages)
													printAttachPages(item.draftIdx, item.attIdx, item, $pages, detail)
														.done(doSingleAtt)
														.fail(function(errorText) {alert(errorText);});
												}
												else
													dfd.resolve();
											}
											if(q2.length > 0)
												doSingleAtt();
											else
												dfd.resolve();
										}
										else
											dfd.resolve();
									})
									.fail(function(errorText) {
										theLogger.error(errorText);
										dfd.reject(errorText);
									});
							}
						}
						else {	// 複選受文者
							if(opts.specifyMultiReceiver.length > 0) {
								var arr = opts.specifyMultiReceiver, cursor = 0;
								var draftFileName = fm.getDraftFileName(draftIdx);	// 2016.10.28 FIX
								var draftName = fm.getDraftName(draftIdx);	// 1091123 Raymond 1090843 修正稿序錯誤導致PrintXSL在複選列印機密等級變更或註銷建議單時全銜字數不正確導致與承辦單位資訊重疊的問題
								function doSingle() {
									if(cursor < arr.length) {
										var detail = arr[cursor++];
										// 1091123 Raymond 1090843 修正稿序錯誤導致PrintXSL在複選列印機密等級變更或註銷建議單時全銜字數不正確導致與承辦單位資訊重疊的問題
										//printMailMergeSingleReceiver(dm, rsrcFile, draftFileName, rsrcFile, opts, $pages, detail)
										printMailMergeSingleReceiver(dm, draftName, draftFileName, rsrcFile, opts, $pages, detail)
											.done(function(detail) {	// 2016.11.1 列印完本文後, 接著判斷是否含附件, 是則接著列印附件頁面
												if(detail.incAtt == "是") {
													var q2 = [], cursor2 = 0;
													for(var i=0; i<q.length; i++) {
														if(q[i].draftIdx == draftIdx && q[i].type == "attach") {
															// 1070521 Raymond 1070183 新增支援分繕附件列印
															if("dispatchAttachs" in detail) {
																for(var j=0; j<detail.dispatchAttachs.length; j++) {
																	if(detail.dispatchAttachs[j].attIdx == q[i].attIdx) {
																		theLogger.log("分繕列印'" + detail.name + "'指定分繕附件[" + q[i].attIdx + "]");
																		q2.push(q[i]);
																		break;
																	}
																}
															}
															else {	// 未指定分繕附件時, 列印所有附件
																theLogger.log("分繕列印含附件[" + q[i].attIdx + "]");
																q2.push(q[i]);
															}
															q[i].printedDuringMailMerge = true;	// 標記分繕列印時已印出
														}
													}
													function doSingleAtt() {
														if(cursor2 < q2.length) {
															var item = q2[cursor2++];
															// 1100217 Raymond 1090610 合併內政部1071265, 新增傳入本文detail物件, 供列印附件頁面時判斷是隨本文一併列印的
															//printAttachPages(item.draftIdx, item.attIdx, item, $pages)
															printAttachPages(item.draftIdx, item.attIdx, item, $pages, detail)
																.done(doSingleAtt)
																.fail(function(errorText) {alert(errorText);});
														}
														else
															doSingle();
													}
													if(q2.length > 0)
														doSingleAtt();
													else
														doSingle();
												}
												else
													doSingle();
											})
											.fail(function(errorText) {alert(errorText);});
									}
									else {	// 轉完了
										dfd.resolve();
									}
								};
								doSingle();
							}
							else {
								theLogger.log("未選取任何複選受文者");
								dfd.reject("未選取任何複選受文者");
							}
						}
					}
					else {	// 組合邏輯錯誤
						theLogger.error("不可指定「" + rsrcFile.category + "」類型樣版套用「分繕列印」功能");
						dfd.reject("不可指定「" + rsrcFile.category + "」類型樣版套用「分繕列印」功能");
					}
				}
				else {	// 來文
					var n = fm.getDraftPageCounts(draftIdx);	// 2016.9.5 FIX
					var deferreds = [];
					for(var i=0; i<n; i++) {
						var pg = fm.getDraftPage(draftIdx, i);	// 2016.9.5 FIX
						if(pg) {
							deferreds.push(fm.getPageImage(pg)
								.done(function(data) {
									$("<div class='pg'><img style='width:210mm; height:297mm'/></div>").appendTo($pages)
										.find("img").attr("src", data);
								}));
						}
					}
					if(deferreds.length > 0) {
						$.when.apply(this, deferreds).done(function() {
							theLogger.warn("所有來文頁面已下載完成, 共" + deferreds.length + "頁");
							dfd.resolve();
						})
						.fail(function(errorText) {
							dfd.reject(errorText);
						});
					}
					else {
						theLogger.warn("來文無頁面!?");
						dfd.resolve();
					}
				}
			})
			.fail(function(errorText) {
				theLogger.error(errorText);
				dfd.reject(errorText);
			});
		return dfd.promise();
	}
	
	// 2016.9.9 新增分繕列印所有受文者, 2016.11.1 新增參數q及draftIdx, 供列印附件判斷
	function printMailMergeAllReceivers(dm, draftName, draftFileName, rsrcFile, opts, $pages, q, draftIdx) {
		var dfd = $.Deferred();
		// 撈出所有受文者至q陣列
		var cursor = 0;
		var arr = getAllReceivers(dm,
			{key: "發文方式", value: function(val) {
				//1110225 David 1101481 考試院客製化人工傳遞處理
				//return (val == "郵寄" || val == "人工傳遞");
				//1141017 Joe	1141126	增加外貿客製化發文方式
				// return (val == "郵寄" || val == "人工傳遞" || val == "機關內函件傳遞" || val == "機關間人工交換");
				return (val == "郵寄" || val == "人工傳遞" || val == "機關內函件傳遞" || val == "機關間人工交換" || val == "公文交換" || val == "傳真");
			}});
		function doSingle() {
			if(cursor < arr.length) {
				var detail = arr[cursor++];
				printMailMergeSingleReceiver(dm, draftName, draftFileName, rsrcFile, opts, $pages, detail)
					.done(function(detail) {	// 2016.11.1 列印完本文後, 接著判斷是否含附件, 是則接著列印附件頁面
						if(detail.incAtt == "是") {
							var q2 = [], cursor2 = 0;
							for(var i=0; i<q.length; i++) {
								if(q[i].draftIdx == draftIdx && q[i].type == "attach") {
									// 1070521 Raymond 1070183 新增支援分繕附件列印
									if("dispatchAttachs" in detail) {
										for(var j=0; j<detail.dispatchAttachs.length; j++) {
											if(detail.dispatchAttachs[j].attIdx == q[i].attIdx) {
												theLogger.log("分繕列印'" + detail.name + "'指定分繕附件[" + q[i].attIdx + "]");
												q2.push(q[i]);
												break;
											}
										}
									}
									else {	// 未指定分繕附件時, 列印所有附件
										theLogger.log("分繕列印含附件[" + q[i].attIdx + "]");
										q2.push(q[i]);
									}
									q[i].printedDuringMailMerge = true;	// 標記分繕列印時已印出
								}
							}
							function doSingleAtt() {
								if(cursor2 < q2.length) {
									var item = q2[cursor2++];
									// 1110615 Raymond 1110416 合併一代1030961 新增傳入detail參數, 供printAttachPages列印受文者及密等
									//printAttachPages(item.draftIdx, item.attIdx, item, $pages)
									printAttachPages(item.draftIdx, item.attIdx, item, $pages, detail)
										.done(doSingleAtt)
										.fail(function(errorText) {alert(errorText);});
								}
								else
									doSingle();
							}
							if(q2.length > 0)
								doSingleAtt();
							else
								doSingle();
						}
						else
							doSingle();
					})
					.fail(function(errorText) {alert(errorText);});
			}
			else {	// 轉完了
				dfd.resolve();
			}
		};
		if(arr.length > 0)
			doSingle();
		else {	// 沒受文者提示錯誤
			dfd.reject("此文稿無任何符合列印條件之受文者");
		}
		
		return dfd.promise();
	}
	
	// 2016.9.9 新增分繕列印指定受文者
	function printMailMergeSingleReceiver(dm, draftName, draftFileName, rsrcFile, opts, $pages, receiver) {
		var dfd = $.Deferred();
		var base = $pages.find(".pg").length;	// 1110613 Raymond 1110271 啟始頁次
		var params = {
				"新系統": false,
				"檢視模式": "3",	// 1140124 Raymond 1140009 新增設定"檢視模式"並強制設為"3"(完稿模式), 以修正有些"文"類型樣版(ex.領務局的「函(抄件)」), 本來是用稿樣版改的, 但預設的"檢視模式"參數設為"1"(追蹤修訂模式), 導致用"文"格式在以「發文用」列印時, 會出現追蹤修訂內容的問題
				"稿": rsrcFile.category == "稿",
				"條碼": opts.printBarcode == true,
				"頁碼": opts.printPageNo == true,
				"預設字型": opts.printFont || "標楷體",
				"預設行高": opts.printLineHeight || "1.5",
				"自訂": opts.applyCustom == true,
				"稿序": draftName,
				"檔名": opts.printDraftFileName?draftFileName:"",
				"分址列印": true,
				"正副抄本章": true,		// 2016.10.20 新增, 分繕發文要蓋正副抄本章
				"受文者全銜": receiver.name,
				"受文者正式名稱": receiver.fullName,
				"受文者姓名": receiver.userName,	// 1061116 Raymond (1061146) 新增姓名欄位
				"受文者本別": receiver.issueType,
				"受文者原始本別": receiver.issueType,		// 2016.9.26 新增, 但不了解本別跟原始本別分開的用途是啥
				"受文者地址": receiver.addr,
				"受文者郵遞區號": receiver.postCode,
				"受文者發文方式": receiver.sendWay,
				"含附件": receiver.incAtt,
				"行文單位保密": opts.keepSecret == true,
				"副本行文單位保密": opts.keepSecret2 == true,
				"有附件下載區資訊": containAttDlInfo(dm),	// 2016.9.13 新增傳入是否有附件下載區資訊及附件下載區字串
				"附件下載區字串": dlgAttDefStr,
				"受文者總行代碼": receiver.headNo,		// 1091218 Raymond 信保序92 新增總行代碼
				"受文者分行代碼": receiver.branchNo		// 1091218 Raymond 信保序92 新增分行代碼
			};
		
		// 1060628 Raymond, 搜尋署名取代章戳資訊
		function recursive(nd, nm) {
			for(var i=0; i<nd.children.length; i++) {
				if(nd.children[i].type == 1){	// RsrcConst.FILE
					if(nd.children[i].name == nm + "(橫)") {
						theLogger.log("找到'" + nm + "'署名取代章戳(" + nd.children[i].remote.path + ", " + nd.children[i].size + ")");
						return nd.children[i];
					}
				}
				else {	// RsrcConst.DIR
					var child = nd.children[i];
					var res = recursive(child, nm);
					if(res)
						return res;
				}
			}
		}
		// 1060628 Raymond 1060505 新增判斷目前使用者是否符合可使用取代章戳的角色
		function matchSubstRoles() {
			var str = theSSO.User.EnvSettings.get("WE_CAN_USE_SUBST_STAMP_ROLES").toUpperCase();
			if(str.length > 0) {
				if(str.indexOf(Common.activeRole.roleId) >= 0) {
					theLogger.warn("目前使用者角色(activeRole):'" + Common.activeRole + "'符合可使用取代章戳角色(" + str + ")");
					return true;
				}
				else {
					theLogger.warn("目前使用者角色(activeRole):'" + Common.activeRole + "'不符合可使用取代章戳角色(" + str + ")");
					return false;
				}
			}
			else {
				theLogger.warn("未設定「WE_CAN_USE_SUBST_STAMP_ROLES」環境變數, 不管制使用取代章戳功能");
				return true;
			}
		}
		try {
			// 1140708 Raymond 1140159 合併1111142, 判斷若署名有對應的取代章戳名稱, 則讀取儲存在文稿的取代章戳圖檔路徑及大小
			var fnSubst = undefined, szSubst = undefined;
			if(navigator.userAgent.match(/Trident/)) {	// 2016.10.24 IE是0-based
				var subst = dm.text("/*/署名[0]/@取代章戳");
				// 1140708 Raymond 1140159 合併1111142, 判斷若署名有對應的取代章戳名稱, 則讀取儲存在文稿的取代章戳圖檔路徑及大小
				if(!!subst) {
					theLogger.log("署名的取代章戳的檔名路徑及大小改由文稿中取得");
					try {
						fnSubst = dm.attr("/*/署名[0]/@檔名路徑");
						szSubst = dm.attr("/*/署名[0]/@size");
						theLogger.log("文稿中記錄署名1的取代章戳的檔名路徑為'" + fnSubst + "', size為'" + szSubst + "'");
					}
					catch(e) {
						theLogger.error(e.message);
					}
				}
			}
			else {
				var subst = dm.text("/*/署名[1]/@取代章戳");
				// 1140708 Raymond 1140159 合併1111142, 判斷若署名有對應的取代章戳名稱, 則讀取儲存在文稿的取代章戳圖檔路徑及大小
				if(!!subst) {
					theLogger.log("署名的取代章戳的檔名路徑及大小改由文稿中取得");
					try {
						fnSubst = dm.attr("/*/署名[1]/@檔名路徑");
						szSubst = dm.attr("/*/署名[1]/@size");
						theLogger.log("文稿中記錄署名1的取代章戳的檔名路徑為'" + fnSubst + "', size為'" + szSubst + "'");
					}
					catch(e) {
						theLogger.error(e.message);
					}
				}
			}
			if(typeof subst === "string" && subst.length > 0) {
				// 1140708 Raymond 1140159 合併1111142, 若文稿檔有記錄取代章戳圖檔路徑及大小, 則優先使用
				if(!!fnSubst && !!szSubst) {
                    if(matchSubstRoles()) {
						params['橫式署名1圖檔路徑'] = thePublicRsrc.rsrcRepo.remote.getFullPath() + "\\" + fnSubst;
						params['橫式署名1長寬大小'] = szSubst;
					}
				}
				else {
				// 1060628 Raymond 移至上面並增加nm參數
				// 搜尋署名取代章戳資訊
				//function recursive(nd) {
				//	for(var i=0; i<nd.children.length; i++) {
				//		if(nd.children[i].type == 1){	// RsrcConst.FILE
				//			if(nd.children[i].name == subst + "(橫)") {
				//				theLogger.log("找到'" + subst + "'署名取代章戳(" + nd.children[i].remote.path + ", " + nd.children[i].size + ")");
				//				return nd.children[i];
				//			}
				//		}
				//		else {	// RsrcConst.DIR
				//			var child = nd.children[i];
				//			var res = recursive(child);
				//			if(res)
				//				return res;
				//		}
				//	}
				//}
				var res = null;
				thePublicRsrc.enumDirs("署名章戳", function(dir) {
					res = recursive(dir, subst);	// 1060628 Raymond 新增subst參數做為比對名稱
					if(res)
						return false;
				});
				if(res) {
					// 1060628 Raymond 1060505 符合取代章戳的使用角色才允許取代章戳
					if(matchSubstRoles()) {
						params['橫式署名1圖檔路徑'] = res.remote.getFullPath();
						params['橫式署名1長寬大小'] = res.size;
					}
					//params['橫式署名1圖檔路徑'] = res.remote.getFullPath();
					//params['橫式署名1長寬大小'] = res.size;
				}
				}	// 1140708 Raymond 1140159 合併1111142, end of if(!!fnSubst && !!szSubst)
			}
			// 1140708 Raymond 1140159 合併1111142, 判斷若署名有對應的取代章戳名稱, 則讀取儲存在文稿的取代章戳圖檔路徑及大小
			fnSubst = szSubst = undefined;
			if(navigator.userAgent.match(/Trident/)) {	// 2016.10.24 IE是0-based
				subst = dm.text("/*/署名[1]/@取代章戳");
				// 1140708 Raymond 1140159 合併1111142, 判斷若署名有對應的取代章戳名稱, 則讀取儲存在文稿的取代章戳圖檔路徑及大小
				if(!!subst) {
					theLogger.log("署名的取代章戳的檔名路徑及大小改由文稿中取得");
					try {
						fnSubst = dm.attr("/*/署名[1]/@檔名路徑");
						szSubst = dm.attr("/*/署名[1]/@size");
						theLogger.log("文稿中記錄署名2的取代章戳的檔名路徑為'" + fnSubst + "', size為'" + szSubst + "'");
					}
					catch(e) {
						theLogger.error(e.message);
					}
				}
			}
			else {
				subst = dm.text("/*/署名[2]/@取代章戳");
				// 1140708 Raymond 1140159 合併1111142, 判斷若署名有對應的取代章戳名稱, 則讀取儲存在文稿的取代章戳圖檔路徑及大小
				if(!!subst) {
					theLogger.log("署名的取代章戳的檔名路徑及大小改由文稿中取得");
					try {
						fnSubst = dm.attr("/*/署名[2]/@檔名路徑");
						szSubst = dm.attr("/*/署名[2]/@size");
						theLogger.log("文稿中記錄署名2的取代章戳的檔名路徑為'" + fnSubst + "', size為'" + szSubst + "'");
					}
					catch(e) {
						theLogger.error(e.message);
					}
				}
			}
			if(typeof subst === "string" && subst.length > 0) {
				// 1140708 Raymond 1140159 合併1111142, 若文稿檔有記錄取代章戳圖檔路徑及大小, 則優先使用
				if(!!fnSubst && !!szSubst) {
                    if(matchSubstRoles()) {
						params['橫式署名2圖檔路徑'] = thePublicRsrc.rsrcRepo.remote.getFullPath() + "\\" + fnSubst;
						params['橫式署名2長寬大小'] = szSubst;
					}
				}
				else {
				// 1060628 Raymond 移至上面並增加nm參數
				// 搜尋署名取代章戳資訊
				//function recursive(nd) {
				//	for(var i=0; i<nd.children.length; i++) {
				//		if(nd.children[i].type == 1){	// RsrcConst.FILE
				//			if(nd.children[i].name == subst + "(橫)") {
				//				theLogger.log("找到'" + subst + "'署名取代章戳(" + nd.children[i].remote.path + ", " + nd.children[i].size + ")");
				//				return nd.children[i];
				//			}
				//		}
				//		else {	// RsrcConst.DIR
				//			var child = nd.children[i];
				//			var res = recursive(child);
				//			if(res)
				//				return res;
				//		}
				//	}
				//}
				var res = null;
				thePublicRsrc.enumDirs("署名章戳", function(dir) {
					res = recursive(dir, subst);	// 1060628 Raymond 新增subst參數做為比對名稱
					if(res)
						return false;
				});
				if(res) {
					// 1060628 Raymond 1060505 符合取代章戳的使用角色才允許取代章戳
					if(matchSubstRoles()) {
						params['橫式署名2圖檔路徑'] = res.remote.getFullPath();
						params['橫式署名2長寬大小'] = res.size;
					}
					//params['橫式署名2圖檔路徑'] = res.remote.getFullPath();
					//params['橫式署名2長寬大小'] = res.size;
				}
				}	// 1140708 Raymond 1140159 合併1111142, end of if(!!fnSubst && !!szSubst)
			}
		}
		catch(e) {
			theLogger.log(e.message + ", 不需尋找取代章戳圖檔");
		}
		
		// 2016.10.27 套用分繕變數
		// 1080219 Raymond 1080089 改用物件傳入"全銜", "正式名稱", "姓名", "編號"
		// 1061218 Raymond 1061282 由於多稿轉出功能將Key由正式名稱改成全銜記錄, 故此處套用分繕變數也要改成以全銜為準
		//var mailMergedXml = dm.accquireMailMergedXml(receiver.fullName);
		//var mailMergedXml = dm.accquireMailMergedXml(receiver.name);
		var mailMergedXml = dm.accquireMailMergedXml(receiver);
		
		// 1070808 Raymond 1070685 新增判斷有附件下載區資訊並分繕附件的話, 以各別受文者的識別碼取代附件文字預設的識別碼
		if(params["有附件下載區資訊"] && "dispatchAttachs" in receiver) {
			if(!!receiver.dlCode && receiver.dlCode.length > 0) {
				if(isIE)
					$(mailMergedXml).find("附件列表 > 文字").get(0).text = dlgAttDefStr + " 識別碼：" + receiver.dlCode;
				else {
					// 1140910 Raymond 1141254 新增比對原本的附件文字與附件下載區資訊相同的字串, 若附件下載區字串前有其它文字的話, 保留在重設識別碼後的附件文字
					let origTxt = $(mailMergedXml).find("附件列表 > 文字").text();
					if(origTxt.indexOf(dlgAttDefStr) > 0) {
						let pre = origTxt.substr(0, origTxt.indexOf(dlgAttDefStr));
						theLogger.log("保留附件文字的下載區字串前的'" + pre + "'在重設識別碼後的附件文字");
						$(mailMergedXml).find("附件列表 > 文字").text(pre + dlgAttDefStr + " 識別碼：" + receiver.dlCode);
					}
					else
					$(mailMergedXml).find("附件列表 > 文字").text(dlgAttDefStr + " 識別碼：" + receiver.dlCode);
				}
			}
		}
		
		// 1100217 Raymond 1090610 合併內政部1071265, 顯示目前列印的稿序及分繕的受文者於進度子視窗
		progbar.text(draftName + "[" + receiver.name + "]");
		
		thePublicRsrc.applyPrintXSLT(mailMergedXml, dm.getDocType(), dm.getSubDocType(), rsrcFile.remote.getFullPath(), params)
			.done(function(intermediateXml, printXSLdir, printXSLfileName) {
				theLogger.log([printXSLdir, printXSLfileName]);
				theLogger.log(intermediateXml);
		
				if(intermediateXml != undefined) {
					var internalFO = theLayoutEng.transXmlFragToInternalFO(intermediateXml, dm);
					theLogger.log(internalFO);
					
					// 1101029 Raymond 1101199 修正Chrome V94、95版列印預覽時有些標楷體字型會破字的問題, 依環境變數「AOL_PRINT_USE_CNSFONT」決定產生分繕列印內容時傳入useCNSFont參數是否為true
					//theLayoutEng.instanciateFOPages(internalFO, opts, $pages)
					var useCNSFont = false;
					var dtb = navigator.userAgent.match(/Chrome\/(\d+)/);
					if(!!dtb && dtb[1] >= 94) {	// 判斷是Chrome且94版以上
						var printUseCNSFont = theSSO.User.EnvSettings.get("AOL_PRINT_USE_CNSFONT");	// Y為啟用, N或未設定為不啟用, 環境變數允許設定兩個字, 第一個字代表列印線上簽核文稿的「文」格式的發文用、簽核及繕校用及紙本簽核文稿的「文」或「稿」格式時是否啟用此功能, 第二個字代表列印線上簽核文稿的「稿」格式時是否啟用此功能, 分開設定是怕萬一線上簽核文稿的「稿」格式套用了"全字庫正楷體", 由於字寬等與"標楷體"不一致時, 可能發生列印結果頁面與簽核頁面不一致, 而導致簽核物件位置不正確的問題
						if(printUseCNSFont.length > 0)												// 線上或紙本簽核公文的「文」格式的「發文用」列印用途
							useCNSFont = printUseCNSFont[0] == 'Y';									// 以環境變數設定的第一個字控制是否啟用套用"全字庫正楷體"字型功能
					}
					theLayoutEng.instanciateFOPages(internalFO, opts, $pages, useCNSFont)
						.done(function(nfo, $pages) {
							theLogger.warn("所有文稿頁面已動態排版完成, 共" + nfo.pages + "頁");
							
							// 1140418 Raymond 1140481 修正使用雙面列印時, 偶數頁的裝訂線應顯示在右邊界
							if(bBothSide) {
								$pages.children().each((idx, divPg) => {
									if(idx >= base) {
										console.log("第" + idx + "(" + (idx - base) + ")頁是" + (((idx - base) % 2)?"偶":"奇") + "數頁");
										if((idx - base) % 2) {
											var $thisPg = $(divPg),
												$lr = $thisPg.find("div[name='leftRegion']"),
												$rr = $thisPg.find("div[name='rightRegion']");
											$lr.children().filter((stidx, st) => {
												var isBinding = false;
												$(st).find("span").each((spidx, sp) => {
													if(sp.textContent.match(/\W+裝\W+訂\W+線\W+/))
														isBinding = true;
												});
												if(isBinding)
													return true;
											}).appendTo($rr).find(".tb").addClass("even-page");
											if($thisPg.find(".leftSealMark").length) {
												var lsp = $thisPg.find(".leftSealMark").get(0).style["left"];
												if($thisPg.find(".rightSealMark").length) {
													var rsp = $thisPg.find(".rightSealMark").get(0).style["right"];
													if(!!rsp)
														$thisPg.find(".leftSealMark").css("left", rsp);	// 偶數頁的左騎縫章內縮改為右騎縫章原來的內縮距離
													if(!!lsp)
														$thisPg.find(".rightSealMark").css("right", lsp);	// 偶數頁的右騎縫章內縮改為左騎縫章原來的內縮距離
												}
												else {
													if(!!lsp) {
														var halfSM = 15 - parseInt(lsp);
														var rsmsp = (window.SSO_CONFIG && "rightSealMarkSpace" in SSO_CONFIG)?SSO_CONFIG.rightSealMarkSpace:0;
														$thisPg.find(".leftSealMark").css("left", (rsmsp - halfSM + 7) + "mm");	// 若偶數頁沒有右騎縫章(最末頁)時, 偶數頁的左騎縫章內縮改為SSO_CONFIG設定的右騎縫章內縮距離扣掉騎縫章半寬後再加7mm的計算值(比照RD-Layout.js)
													}
												}
											}
										}
									}
								});
							}
							
							// 1110613 Raymond 1110271 新增受文者名稱+本別至文稿第1頁, 並記錄是否要套印騎縫章
							$pages.find(".pg").eq(base).attr("data-receiver", receiver.name + "-" + receiver.issueType).attr("data-printsealmark", opts.printSealMark);
							
							// 1110615 Raymond 1110416 合併一代1030961, 套印密件浮水印
							// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
							// var sec = $(mailMergedXml.documentElement).find("密等及解密條件或保密期限 > 密等").attr("代碼");
							var sec = theSSO.Util.htmlEncode($(mailMergedXml.documentElement).find("密等及解密條件或保密期限 > 密等").attr("代碼"));
							// 1071025 Raymond 舊版簽稿會核單無密等及解密條件或保密期限欄位
							if(!!sec)
								receiver.sec = sec;	// 記錄密等在receiver參數中, 以便一併列印附件時可印出密等
							// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
							// var decCond = $(mailMergedXml.documentElement).find("密等及解密條件或保密期限 > 解密條件或保密期限").text();
							var decCond = theSSO.Util.htmlEncode($(mailMergedXml.documentElement).find("密等及解密條件或保密期限 > 解密條件或保密期限").text());
							if(!!decCond)
								receiver.decCond = decCond;	// 記錄解密條件或保密期限在receiver參數中, 以便一併列印附件時可印出警語文字
							// 1111208 Raymond 修正未設定解密條件或保密期限時, 列印附件的密件浮水印警語會出現undefined的問題
							else
								receiver.decCond = "";
							receiver.printFormat = rsrcFile.category;	// 記錄列印類型在receiver參數中, 以便一併列印附件時可參考
							// 1111013 Raymond 陸委會序333 修正密件浮水印的文號未顯示支號的問題
							// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
							// var subno = $(mailMergedXml.documentElement).find("發文字號 > 文號 > 支號").text();
							var subno = theSSO.Util.htmlEncode($(mailMergedXml.documentElement).find("發文字號 > 文號 > 支號").text());
							if(!!subno)
								receiver.subno = subno;
							// 1111014 Raymond 陸委會序335 修正未設定支號時, 列印附件的密件浮水印文號會出現undefined的問題
							else
								receiver.subno = "";
							if(opts.printWaterMark && enableSpecialWaterMark && !!sec && sec.length > 0 && sec.indexOf("密") >= 0) {
								var n = $pages.find(".pg").length - base;
								for(var i=0; i<n; i++) {
									var $pg = $pages.find(".pg").eq(base + i);
									if(rsrcFile.category == "稿") {	// 稿時列印本機關名稱
										var orgNd = SSOUtil.getOrgNode(fm.getDocObj().sourceOrgNo);
										// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
										// var orgNm = (!!orgNd)?$(orgNd).find("OrgName").text():fm.getDocObj().sourceOrgNo;
										var orgNm = (!!orgNd)?theSSO.Util.htmlEncode($(orgNd).find("OrgName").text()):fm.getDocObj().sourceOrgNo;
										// 1111013 Raymond 陸委會序333 修正密件浮水印的文號未顯示支號的問題
										//_printSpecialWaterMark(1, $pg, orgNm, fm.getDocNo(), sec);
										_printSpecialWaterMark(1, $pg, orgNm, fm.getDocNo() + subno, sec);
									}
									else {	// 文時列印受文者全銜
										// 1111013 Raymond 陸委會序333 修正密件浮水印的文號未顯示支號的問題
										// 1080125 Raymond 1071310 修正列印發文用的密件浮水印第一行字為受文者姓名或受文者正式名稱
										//_printWaterMark($pg, receiver.name, fm.getDocNo(), sec);
										//_printSpecialWaterMark(1, $pg, receiver.userName || receiver.fullName, fm.getDocNo(), sec);
										_printSpecialWaterMark(1, $pg, receiver.userName || receiver.fullName, fm.getDocNo() + subno, sec);
									}
								}
							}
							
							// 2016.10.11 下載取代章戳
							var $imgs = $pages.find("div.img");
							if($imgs.length > 0) {
								var wfio = new WebFileIO(rsrcFile.remote.getWFIOURL());
								var dfds = [];
								$imgs.each(function(idx, div) {
									var imgFullPath = $(div).attr("data-src");
									if(imgFullPath) {
										var p = imgFullPath.lastIndexOf("\\");
										var dirPath = imgFullPath.substr(0, p);
										var fileName = imgFullPath.substr(p + 1);
										dfds.push(function(div, dirPath, fileName) {
											var dfd2 = $.Deferred();
											//2017.01.17	Leslie	效能精進，減少無謂的下載行為，改用theCacheMgr.get()
											theCacheMgr.get({type:"rsrc",rsrc:{wfioUrl:rsrcFile.remote.getWFIOURL(),filePath:imgFullPath}})
												.done(function(img){
													if(img != undefined){
														$(div).find("img").attr("src", img);
														$(div).removeAttr("data-src");	//已下載完成，拿掉屬性以避免重覆執行
														dfd2.resolve();
													}
												})
												.fail(function(errorText) {
													theLogger.error("下載'" + dirPath + "\\" + fileName + "'失敗!" + errorText);
													dfd2.reject("下載'" + dirPath + "\\" + fileName + "'失敗!" + errorText);
												});
											/*wfio.download(dirPath, fileName, {
												success: function(fil, res) {
													$(div).find("img").attr("src", fil);
													dfd2.resolve();
												},
												error: function(errorText) {
													theLogger.error("下載'" + dirPath + "\\" + fileName + "'失敗!" + errorText);
													dfd2.reject("下載'" + dirPath + "\\" + fileName + "'失敗!" + errorText);
												}
											});*/
											return dfd2.promise();
										}(div, dirPath, fileName));
									}
									else
										theLogger.error("取代章戳圖檔未設定");
								});
								
								$.when.apply(this, dfds)
								.always(function() {
									//1061213	Leslie[1061148]	修正雙面列印補頁邏輯，非列印範圍不計入
									//if(bBothSide && ($pages.find(".pg").length % 2 == 1))//2017.2.23	Leslie	新增雙面列印功能
									if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1))//2017.2.23	Leslie	新增雙面列印功能
										$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);	// 補上空白頁
									// TODO: 套簽核物件?
									// 1100217 Raymond 1090610 合併內政部1071265, 更新進度子視窗並於無須暫停或繼續時再resolve
									//dfd.resolve(receiver);	// 2016.11.1 回傳受文者明細, 以供判斷是否要列印附件
									progbar.adv(nfo.pages).done(function() {dfd.resolve(receiver);}).fail(dfd.reject);;
								});
							}
							else {
								//1061213	Leslie[1061148]	修正雙面列印補頁邏輯，非列印範圍不計入
								//if(bBothSide && ($pages.find(".pg").length % 2 == 1))//2017.2.23	Leslie	新增雙面列印功能
								if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1))//2017.2.23	Leslie	新增雙面列印功能
									$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);	// 補上空白頁
								// TODO: 套簽核物件?
								// 1100217 Raymond 1090610 合併內政部1071265, 更新進度子視窗並於無須暫停或繼續時再resolve
								//dfd.resolve(receiver);	// 2016.11.1 回傳受文者明細, 以供判斷是否要列印附件
								progbar.adv(nfo.pages).done(function() {dfd.resolve(receiver);}).fail(dfd.reject);;
							}
						})
						.fail(function(errorText) {
							theLogger.error(errorText);
							dfd.reject(errorText);
						});
				}
				else {
					theLogger.error("套用樣版檔失敗! 無法產生預覽列印頁面");
					dfd.reject("套用樣版檔失敗! 無法產生預覽列印頁面");
				}
			})
			.fail(function(errorText) {
				theLogger.error(errorText);
				dfd.reject(errorText);
			});
		return dfd.promise();
	}
	// 1090915 Raymond 1090564 新增套用騎縫章copy from RD-Layout.js
	function doAppendSealMark(fil, size, docNo, n, basePo, $pages, nfo) {
		for(var po = 0; po < n; po++) {
			var $pg = $pages.find(".pg").eq(basePo + po);	// 從啟始頁次計算取出應處理頁面
			if(po > 0) {   // 非首頁加蓋左騎縫章
				// 1110613 Raymond 1110271 新增類別名稱以供識別
				//var $sm = $("<div style='position: absolute'><img/><span style='position:absolute; top:0; left:0;'></span></div>").appendTo($pg);
				var $sm = $("<div class='leftSealMark' style='position: absolute'><img/><span style='position:absolute; top:0; left:0;'></span></div>").appendTo($pg);
				$sm.find("img").attr("src", fil);
				
				// 新增亂數seed
				if(!("seeds" in nfo))
					nfo.seeds = new Array();
				var seed = nfo.seeds[po-1];
				if(!seed)
					seed = Math.random();
				
				if(typeof size === "string") {
					var p = size.split(/x/i);
					var a = Math.ceil(seed * 10) - 5,
						b = a - 90;	// 公文文號的旋轉角度固定多轉-90度成直向的

					if(p[0] > p[1])	// 若章是橫向的, 多轉-90度成直向的
						a -= 90;
					
					$sm.find("img").css({
						width: p[0] + "mm",
						height: p[1] + "mm",
						webkitTransform: "rotate(" + a + "deg)",
						mozTransform: "rotate(" + a + "deg)",
						transform: "rotate(" + a + "deg)"
					});
					if(typeof docNo === "string" && docNo.length > 0) {
						if(p[0] > p[1])
							$sm.find("span").css({
								webkitTransform: "rotate(" + b + "deg)",
								mozTransform: "rotate(" + b + "deg)",
								transform: "rotate(" + b + "deg)",
								webkitTransformOrigin: (p[0] / 2) + "mm " + (p[1] / 2) + "mm",
								mozTransformOrigin: (p[0] / 2) + "mm " + (p[1] / 2) + "mm",
								transformOrigin: (p[0] / 2) + "mm " + (p[1] / 2) + "mm",
								letterSpacing: ((Number(p[0]) - 22) / docNo.length) + "mm"
							}).text(docNo);
						else
							$sm.find("span").css({
								webkitTransform: "rotate(" + b + "deg) translate(-" + p[1] + "mm, " + (p[0] - 5) + "mm)",
								mozTransform: "rotate(" + b + "deg) translate(-" + p[1] + "mm, " + (p[0] - 5) + "mm)",
								transform: "rotate(" + b + "deg) translate(-" + p[1] + "mm, " + (p[0] - 5) + "mm)",
								webkitTransformOrigin: "0 0",
								mozTransformOrigin: "0 0",
								transformOrigin: "0 0",
								letterSpacing: ((Number(p[1]) - 25) / docNo.length) + "mm"
							}).text(docNo);
					}
				}
				$sm.css({
					top: (Math.ceil(seed * 40) + 30) + "%",
					left: (15 - (p[0] / 2)) + "mm",
					clip: "rect(-4mm, " + (Number(p[0]) + 4) + "mm, " + (Number(p[1]) + 4) + "mm, " + (p[0] / 2) + "mm)"
				});
				if(isIE && "printMarginForIE" in SSO_CONFIG && SSO_CONFIG.printMarginForIE > 0) {	// 2016.12.1 fix for IE列印反推邊界功能
					$sm.css({left: (15 - SSO_CONFIG.printMarginForIE - (p[0] / 2)) + "mm"});
				}
				if(p[0] > p[1]) {	// 若章是橫向的, 修正裁切的rect(top, right, bottom, left)
					$sm.css("clip", "rect(-" + (p[0] / 2) + "mm, " + ((Number(p[1]) + Number(p[0])) / 2) + "mm, " + (p[0] / 2 + 10) + "mm, " + (p[0] / 2) + "mm)");
					$sm.find("span").css("left", (p[1] / 2 + 2) + "mm");
				}
			}
			if(po < (n - 1)) {    // 非末頁加蓋右騎縫章
				// 1110613 Raymond 1110271 新增類別名稱以供識別
				//var $sm = $("<div style='position: absolute'><img/><span style='position:absolute; top:0; left:0;'></span></div>").appendTo($pg);
				var $sm = $("<div class='rightSealMark' style='position: absolute'><img/><span style='position:absolute; top:0; left:0;'></span></div>").appendTo($pg);
				$sm.find("img").attr("src", fil);
					
				// 2015.9.11 新增亂數seed
				if(!("seeds" in nfo))
					nfo.seeds = new Array();
				var seed = nfo.seeds[po];
				if(!seed)
					seed = nfo.seeds[po] = Math.random();
				
				if(typeof size === "string") {
					var p = size.split(/x/i);
					var a = Math.ceil(seed * 10) - 5,
						b = a - 90;	// 公文文號的旋轉角度固定多轉-90度成直向的
					
					if(p[0] > p[1])	// 若章是橫向的, 多轉-90度成直向的
						a -= 90;
					
					$sm.find("img").css({
						width: p[0] + "mm",
						height: p[1] + "mm",
						webkitTransform: "rotate(" + a + "deg)",
						mozTransform: "rotate(" + a + "deg)",
						transform: "rotate(" + a + "deg)"
					});
					if(typeof docNo === "string" && docNo.length > 0) {
						if(p[0] > p[1])
							$sm.find("span").css({
								webkitTransform: "rotate(" + b + "deg)",
								mozTransform: "rotate(" + b + "deg)",
								transform: "rotate(" + b + "deg)",
								webkitTransformOrigin: (p[0] / 2) + "mm " + (p[1] / 2) + "mm",
								mozTransformOrigin: (p[0] / 2) + "mm " + (p[1] / 2) + "mm",
								transformOrigin: (p[0] / 2) + "mm " + (p[1] / 2) + "mm",
								letterSpacing: ((Number(p[0]) - 22) / docNo.length) + "mm"
							}).text(docNo);
						else
							$sm.find("span").css({
								webkitTransform: "rotate(" + b + "deg) translate(-" + p[1] + "mm, 0mm)",
								mozTransform: "rotate(" + b + "deg) translate(-" + p[1] + "mm, 0mm)",
								transform: "rotate(" + b + "deg) translate(-" + p[1] + "mm, 0mm)",
								webkitTransformOrigin: "0 0",
								mozTransformOrigin: "0 0",
								transformOrigin: "0 0",
								letterSpacing: ((Number(p[1]) - 25) / docNo.length) + "mm"
							}).text(docNo);
					}
				}
				// 2015.9.11 右騎縫章可內縮一段距離顯示, CDC需求是內縮1.5CM, 所以SSO_CONFIG要設定rightSealMarkSpace為15
				var cx = 0;
				if(window.SSO_CONFIG && "rightSealMarkSpace" in SSO_CONFIG)
					cx = SSO_CONFIG.rightSealMarkSpace;
				$sm.css({
					top: (Math.ceil(seed * 40) + 30) + "%",
					right: (cx - (p[0] / 2) + 7) + "mm",		// 2016.10.13 列印會超出右邊界可列印範圍, 要內縮
					clip: "rect(-4mm, " + (Number(p[0]) / 2) + "mm, " + (Number(p[1]) + 4) + "mm, " + "-4mm)"
				});
				if(isIE && "printMarginForIE" in SSO_CONFIG && SSO_CONFIG.printMarginForIE > 0) {	// 2016.12.1 fix for IE列印反推邊界功能
					// 1090717 CDC序152 修正當騎縫章是橫向時, 轉直向後在IE環境下會因為重設為反推邊界距離, 導致騎縫章靠左跑壓到內文的問題
					if((cx - (p[0] / 2) + 7) > (0 - SSO_CONFIG.printMarginForIE))
					$sm.css({right: (0 - SSO_CONFIG.printMarginForIE) + "mm"});
				}
				if(p[0] > p[1])	// 若章是橫向的, 修正裁切的rect(top, right, bottom, left)
					$sm.css("clip", "rect(-" + (p[0] / 2) + "mm, " + (p[0] / 2) + "mm, " + (p[0] / 2 + 10) + "mm, 0mm)");
			}
		}
	}
	
	// 1100217 Raymond 1090610 合併內政部1070167, 列印附件新增detail參數, 但是for分批列印功能而非列印客製浮水印功能
	//function printAttachPages(draftIdx, attIdx, opts, $pages) {
	var _t = (new Date()).getTime();	// 時間戳記
	function printAttachPages(draftIdx, attIdx, opts, $pages, detail) {
		var dfd = $.Deferred();
		var deferreds = [];	// 等待多頁同時完成
		var n = fm.getAttPageCounts(draftIdx, attIdx);
		var basePo = $pages.find(".pg").length;	// 1090915 Raymond 1090564 記下啟始頁次
		// 1110721 Raymond 1110416 新增變數imgSrcFlag, 若設為2代表是紙本密件轉出的附件影像檔, 暫存在轉檔工作站上而不是FileServer的公文目錄下
		var imgSrcFlag = 1;
		function getPgImgUrl(pgObj, cbData) {
			var $dfd2 = $.Deferred();
			var imgProcUrl = opts.rndrPageUrl;
			imgProcUrl = imgProcUrl.substr(0, imgProcUrl.lastIndexOf("/") + 1) + "IMGTRAN.ASHX";
			imgProcUrl += ("?FileName=" + encodeURIComponent(Base64.encode(opts.rndrPages[pgObj.po])));
			imgProcUrl += ("&Pixel=300dpi&Format=33&SAMLart=" + localStorage['Artifact']);
			imgProcUrl += ("&_t=" + _t);
			$dfd2.resolve(imgProcUrl, 300, cbData);
			return $dfd2.promise();
		}
		// 1100217 Raymond 1090610 合併內政部1071265, 頁面改成一頁一頁印, 為了暫停
		//for(var i=0; i<n; i++) {
		//	var pg = fm.getAttPage(draftIdx, attIdx, i);
		var cursor = 0;
		function doSingle() {
			// 1110721 Raymond 1110416 判斷新增的變數imgSrcFlag, 若設為2則要將pg設為一個物件
			if(imgSrcFlag == 2)
				var pg = (cursor < n)?{po: cursor}:null;
			else
			var pg = (cursor < n)?fm.getAttPage(draftIdx, attIdx, cursor):null;
			if(pg) {
				// 1100416 Raymond 1090610 修正列印只有來文的公文時, i未定義而出現Error的問題
				// 1071226 Raymond 1071208 修正在Chrome下附件頁碼會與簽核文件列印的下邊界字串重疊問題
				// 2016.12.29 修改成先組pg, 把img當回呼參數傳入getPageImage(), 因為getPageImage()是非同步, 雖然只是組出imgtran的網址, 仍不排除會有後頁先resolve的情形
				//var $pg = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><img class='attachment'/><div class='att-po' style='display:" + (opts.printPageNo?"block":"none") + "'>第 " + (i + 1) + " 頁，共 " + n + " 頁</div></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推
				//var $pg = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><img class='attachment'/><div class='att-po' style='display:" + (opts.printPageNo?"block":"none") + "; bottom:calc(1em + " + ((pm < 0)?0:3) + "mm)'>第 " + (i + 1) + " 頁，共 " + n + " 頁</div></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推
				var $pg = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><img class='attachment'/><div class='att-po' style='display:" + (opts.printPageNo?"block":"none") + "; bottom:calc(1em + " + ((pm < 0)?0:3) + "mm)'>第 " + (cursor + 1) + " 頁，共 " + n + " 頁</div></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推
				// 1110613 Raymond 1110271 設定data-printsealmark屬性為opts.printSealMark
				$pg.attr("data-printsealmark", opts.printSealMark);
				//if(pm < 0)	// 2016.12.29 配合IE列印邊界問題, 影像也要反推 2017.3.23 影像檔反推會造成簽核物件下移 航港-序2103
				//	$pg.find("img").css({marginLeft: pm + "mm", marginTop: pm + "mm"});
				// 1110721 Raymond 1110416 判斷新增的變數imgSrcFlag, 若設為2則要將pg設為一個空物件
				//deferreds.push(fm.getPageImage(pg, $pg.find("img"))
				var fnGetPageImage = (imgSrcFlag == 2)?getPgImgUrl:fm.getPageImage;
				deferreds.push(fnGetPageImage(pg, $pg.find("img"))
					.done(function(data, dpi, $img) {	// 2016.12.29 頁碼己在非同步外先組pg時填入, 不用在done()時填入了
						$img.on("load", function(event) {
							console.log("附件頁面影像.on" + event.type + "(" + event.target.naturalWidth + " x " + event.target.naturalHeight + ")");
							if("naturalWidth" in event.target && "naturalHeight" in event.target) {
								var w = event.target.naturalWidth / (dpi || 300),	// 頁面影像為200dpi, 若有傳入dpi參數則以dpi為準
									h = event.target.naturalHeight / (dpi || 300);
								$img.css({width: (w + (pm / 12.7)) + "in", height: (h + (pm / 12.7)) + "in"});	// 2016.12.1 新增使用IE列印時邊界反推
							}
						}).attr("data-src", data);	//2017.01.24	Leslie	修改IE載入IMG問題(叉燒包)，先寫入data-src屬性中，"src" → "data-src"
						
					}));
				
				// 1110615 Raymond 1110416 合併一代1030961 套印密件浮水印
				if(opts.printWaterMark && enableSpecialWaterMark && !!detail && !!detail.sec && detail.sec.indexOf("密") >= 0) {
					//var pgs = $pages.find(".pg").length - base;
					var orgNd = SSOUtil.getOrgNode(fm.getDocObj().sourceOrgNo);
					// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
					// var orgNm = (!!orgNd)?$(orgNd).find("OrgName").text():fm.getDocObj().sourceOrgNo;
					var orgNm = (!!orgNd)?theSSO.Util.htmlEncode($(orgNd).find("OrgName").text()):fm.getDocObj().sourceOrgNo;
					if(!!detail && detail.printFormat == "文") {	// 若分繕列印一併列印附件時會傳入detail參數, 改用detail.name, detail.sec取代本機關名稱及最高密等
						if("name" in detail)
							// 1110927 Raymond 陸委會序297 修正附件的密件浮水印的第一行字跟本文一樣顯示受文者姓名或受文者正式名稱, 而非受文者正副本稱謂
							//orgNm = detail.name;
							orgNm = detail.userName || detail.fullName;
					}
					// 1150211 Raymond 1141685 修正文稿無支號欄位(ex.陸委會的便簽), 列印附件的密件浮水印的文號後會出現undefiend字樣的問題
					// 1111013 Raymond 陸委會序333 修正密件浮水印的文號未顯示支號的問題
					//_printSpecialWaterMark(2, $pg, orgNm, fm.getDocNo(), detail.sec, detail.decCond);
					//_printSpecialWaterMark(2, $pg, orgNm, fm.getDocNo() + detail.subno, detail.sec, detail.decCond);
					_printSpecialWaterMark(2, $pg, orgNm, fm.getDocNo() + (detail.subno || ""), detail.sec, detail.decCond);
				}
				
				// 2017.2.16 補列印附件頁面上的簽核物件
				if("signObjs" in pg) {
					for(var j=0; j<pg.signObjs.length; j++) {
						var so = pg.signObjs[j];
						deferreds.push(_buildSOTypeB(so, $pg));
					}
				}
				if("newSignObjs" in pg) {
					for(var j=0; j<pg.newSignObjs.length; j++) {
						var so = pg.newSignObjs[j];
						theLogger.log("應buildSOX(" + j + ")@附件頁面");
						deferreds.push(_buildSOX(fm, j, so, pg, $pg));
					}
				}
			}
			// 1100217 Raymond 1090610 合併內政部1071265, 列印下一頁
			if(cursor++ < n)
				progbar.adv(1, (!!detail && cursor < n)).done(doSingle).fail(dfd.reject);	// 第2參數若為true則表示附件的頁面隨本文一併列印, 即使超過限制頁數也不需暫停, 附件末頁仍要暫停
			else if(deferreds.length > 0) {	// 列印結束
				// 1100217 Raymond 1090610 搬到doSingle內
				// 1090915 Raymond 1090564 補上列印附件的騎縫章
				if(n > 1 && opts.printSealMark == true) {
					deferreds.push(thePublicRsrc.getSealMarkImage(theUserInfo.OrgID, theUserInfo.DepartID)	//等待完成下載騎縫章工作
						.done(function(fil, size) {
							doAppendSealMark(fil, size, fm.getDocObj().docNo, n, basePo, $pages, opts);
						}));
				}
				$.when.apply(this, deferreds)
					.done(function() {
						theLogger.warn("所有附件頁面已下載完成, 共" + deferreds.length + "頁");
						//1061213	Leslie[1061148]	修正雙面列印補頁邏輯，非列印範圍不計入
						//if(bBothSide && ($pages.find(".pg").length % 2 == 1))//2017.2.23	Leslie	新增雙面列印功能
						if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1))//2017.2.23	Leslie	新增雙面列印功能
							$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);	// 補上空白頁
						dfd.resolve();
					})
					.fail(function(errorText) {
						dfd.reject(errorText);
					});
			}
			else {
				theLogger.error("附件無頁面物件pg!?");
				dfd.resolve();
			}
		}
		/* 1100217 Raymond 1090610 搬到上面doSingle內
		// 1090915 Raymond 1090564 補上列印附件的騎縫章
		if(n > 1 && opts.printSealMark == true) {
			deferreds.push(thePublicRsrc.getSealMarkImage(theUserInfo.OrgID, theUserInfo.DepartID)	//等待完成下載騎縫章工作
				.done(function(fil, size) {
					doAppendSealMark(fil, size, fm.getDocObj().docNo, n, basePo, $pages, opts);
				}));
		}*/
		// 1100217 Raymond 1090610 合併內政部1071265, 列印第一頁
		/*if(deferreds.length > 0) {
			$.when.apply(this, deferreds)
				.done(function() {
					theLogger.warn("所有附件頁面已下載完成, 共" + deferreds.length + "頁");
					//1061213	Leslie[1061148]	修正雙面列印補頁邏輯，非列印範圍不計入
					//if(bBothSide && ($pages.find(".pg").length % 2 == 1))//2017.2.23	Leslie	新增雙面列印功能
					if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1))//2017.2.23	Leslie	新增雙面列印功能
						$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);	// 補上空白頁
					dfd.resolve();
				})
				.fail(function(errorText) {
					dfd.reject(errorText);
				});
		}*/
		if(n > 0)
			doSingle();
		// 1110622 Raymond 1110416 啟用列印密件浮水印時, 若是紙本簽核公文, 改用estimateTotalPages時所轉出的附件頁面
		else if(enableSpecialWaterMark && "draftInfo" in opts && opts.draftInfo.sec.match(/密/g)) {
			if(!!opts.rndrPages && opts.rndrPages.length > 0) {
				imgSrcFlag = 2;	// 變更影像檔來源旗標為2, 代表是暫存在工作站上
				n = opts.rndrPages.length;	// 變更頁數
				doSingle();
			}
			else {
				theLogger.warn("附件未匯出任何頁面, 無法列印");
				dfd.reject("附件未匯出任何頁面, 無法列印");
			}
		}
		else {
			theLogger.warn("附件無頁面!?");
			dfd.resolve();
		}
		return dfd.promise();
	}
	
	// 1150309 Raymond 1150145 新增參數printSOPages及filterTAITRA, 來文列印完後是否接著列印簽核物件資訊頁及列印簽核物件資訊頁(內部意見)
	//function printFromDocPages(draftIdx, opts, $pages) {
	function printFromDocPages(draftIdx, opts, $pages, printSOPages, filterTAITRA) {
		var dfd = $.Deferred();
		var deferreds = [];	// 等待多頁同時完成
		var n = fm.getDraftPageCounts(draftIdx);
		var basePo = $pages.find(".pg").length;	// 1090915 Raymond 1090564 記下啟始頁次
		// 1100217 Raymond 1090610 合併內政部1071265, 頁面改成一頁一頁印, 為了暫停
		//for(var i=0; i<n; i++) {
		//	var pg = fm.getDraftPage(draftIdx, i);
		var cursor = 0;
		// 1150309 Raymond 1150145 新增允許來文簽辦時, 列印來文頁面後接著列印簽核物件資訊頁
		var soList = [];	// 顯示的簽核物件陣列記錄
		var scList = [];	// 顯示的簽核意見陣列記錄
		function doSingle() {
			var pg = (cursor < n)?fm.getDraftPage(draftIdx, cursor):null;
			if(pg) {
				// 1100416 Raymond 1090610 修正列印只有來文的公文時, i未定義而出現Error的問題
				// 2016.12.29 修改成先組pg, 把img當回呼參數傳入getPageImage(), 因為getPageImage()是非同步, 雖然只是組出imgtran的網址, 仍不排除會有後頁先resolve的情形
				//var $pg = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><img class='attachment'/><div class='att-po' style='display:" + (opts.printPageNo?"block":"none") + "'>第 " + (i + 1) + " 頁，共 " + n + " 頁</div></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推
				var $pg = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><img class='attachment'/><div class='att-po' style='display:" + (opts.printPageNo?"block":"none") + "'>第 " + (cursor + 1) + " 頁，共 " + n + " 頁</div></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推
				// 1120606 Raymond 1120515 設定data-printsealmark屬性為false(因為來文頁面選項無opts.printSealMark), 以避免套印到(額外)騎縫章
				$pg.attr("data-printsealmark", "false");
				// 1090825 Raymond 1090620 來文頁面影像比照附件頁面影像不要套用IE列印邊界反推
				//if(pm < 0)	// 2016.12.29 配合IE列印邊界問題, 影像也要反推
				//	$pg.find("img").css({marginLeft: pm + "mm", marginTop: pm + "mm"});
				deferreds.push(fm.getPageImage(pg, $pg.find("img"))
					.done(function(data, dpi, $img) {
						$img.on("load", function(event) {
							console.log("來文頁面影像.on" + event.type + "(" + event.target.naturalWidth + " x " + event.target.naturalHeight + ")");
							if("naturalWidth" in event.target && "naturalHeight" in event.target) {
								var w = event.target.naturalWidth / (dpi || 300),	// 頁面影像為200dpi, 若有傳入dpi參數則以dpi為準
									h = event.target.naturalHeight / (dpi || 300);
								$img.css({width: (w + (pm / 12.7)) + "in", height: (h + (pm / 12.7)) + "in"});	// 2016.12.1 新增使用IE列印時邊界反推
							}
						}).attr("data-src", data);	//2017.01.24	Leslie	修改IE載入IMG問題(叉燒包)，先寫入data-src屬性中，"src" → "data-src"
						
					}));
				// 2017.2.16 補來文頁面上的簽核物件
				if("signObjs" in pg) {
					for(var j=0; j<pg.signObjs.length; j++) {
						var so = pg.signObjs[j];
						// 1150309 Raymond 1150145 新增允許來文簽辦時, 列印來文頁面後接著列印簽核物件資訊頁
						//deferreds.push(_buildSOTypeB(so, $pg));
						if(printSOPages)
							deferreds.push(_buildSOTypeB(so, $pg, soList.length + 1));
						else
							deferreds.push(_buildSOTypeB(so, $pg));
						soList.push(so);
					}
				}
				if("newSignObjs" in pg) {
					for(var j=0; j<pg.newSignObjs.length; j++) {
						var so = pg.newSignObjs[j];
						theLogger.log("應buildSOX(" + j + ")@來文頁面");	// 1140924 Raymond 1141329 fix typo "附件"->"來文"
						// 1150309 Raymond 1150145 新增允許來文簽辦時, 列印來文頁面後接著列印簽核物件資訊頁
						//deferreds.push(_buildSOX(fm, j, so, pg, $pg));
						if(printSOPages)
							deferreds.push(_buildSOX(fm, j, so, pg, $pg, soList.length + 1));
						else
							deferreds.push(_buildSOX(fm, j, so, pg, $pg));
						soList.push(so);
					}
				}
			}
			// 1100217 Raymond 1090610 合併內政部1071265, 列印下一頁
			if(cursor++ < n)
				progbar.adv(1).done(doSingle).fail(dfd.reject);
			else if(deferreds.length > 0) {	// 列印結束
				// 1100217 Raymond 1090610 搬到doSingle內
				// 1090915 Raymond 1090564 補上列印來文的騎縫章
				if(n > 1 && opts.printSealMark == true) {
					deferreds.push(thePublicRsrc.getSealMarkImage(theUserInfo.OrgID, theUserInfo.DepartID)	//等待完成下載騎縫章工作
						.done(function(fil, size) {
							doAppendSealMark(fil, size, fm.getDocObj().docNo, n, basePo, $pages, opts);
						}));
				}
				$.when.apply(this, deferreds)
					.done(function() {
						theLogger.warn("所有來文頁面已下載完成, 共" + deferreds.length + "頁");	// 1080117 Raymond fix"附件"為"來文"
						//1061213	Leslie[1061148]	修正雙面列印補頁邏輯，非列印範圍不計入
						//if(bBothSide && ($pages.find(".pg").length % 2 == 1))//2017.2.23	Leslie	新增雙面列印功能
						if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1))//2017.2.23	Leslie	新增雙面列印功能
							$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);	// 補上空白頁
						// 1150309 Raymond 1150145 新增允許來文簽辦時, 列印來文頁面後接著列印簽核物件資訊頁
						if(printSOPages) {
							// 1150309 Raymond 1150145 將整理簽辦意見清單的功能獨立成一個function, 以供列印文稿及來文兩功能共用
							makeSCList(null, scList, false, filterTAITRA);
							printSignObjPages(draftIdx, {}, $pages, soList, scList);
							if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1))//2017.2.23	Leslie	新增雙面列印功能
								$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);	// 補上空白頁
						}
						dfd.resolve();
					})
					.fail(function(errorText) {
						dfd.reject(errorText);
					});
			}
			else {
				theLogger.error("來文無頁面物件pg!?");	// 1080117 Raymond fix"附件"為"來文"
				dfd.resolve();
			}
		}
		/* 1100217 Raymond 1090610 搬到上面doSingle內
		// 1090915 Raymond 1090564 補上列印來文的騎縫章
		if(n > 1 && opts.printSealMark == true) {
			deferreds.push(thePublicRsrc.getSealMarkImage(theUserInfo.OrgID, theUserInfo.DepartID)	//等待完成下載騎縫章工作
				.done(function(fil, size) {
					doAppendSealMark(fil, size, fm.getDocObj().docNo, n, basePo, $pages, opts);
				}));
		}*/
		// 1100217 Raymond 1090610 合併內政部1071265, 列印第一頁
		/*if(deferreds.length > 0) {
			$.when.apply(this, deferreds)
				.done(function() {
					theLogger.warn("所有附件頁面已下載完成, 共" + deferreds.length + "頁");
					//1061213	Leslie[1061148]	修正雙面列印補頁邏輯，非列印範圍不計入
					//if(bBothSide && ($pages.find(".pg").length % 2 == 1))//2017.2.23	Leslie	新增雙面列印功能
					if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1))//2017.2.23	Leslie	新增雙面列印功能
						$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);	// 補上空白頁
					dfd.resolve();
				})
				.fail(function(errorText) {
					dfd.reject(errorText);
				});
		}*/
		if(n > 0)
			doSingle();
		else {
			theLogger.warn("附件無頁面!?");
			dfd.resolve();
		}
		return dfd.promise();
	}
	
	function printMailMergeTablePages(draftIdx, opts, $pages) {
		var dfd = $.Deferred();
		fm.accquireDraftModel(draftIdx)
			.done(function(dm) {
				if(dm) {
					var mmt = dm.accquireMailMergeTable();
					var hdrs = dm.getMailMergeVars();
					var po = 1;
					// 1101110 Raymond 1101199 新增依環境變數設定啟用分繕變數表的標楷體加套"全字庫正楷體"字型功能
					//var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm;'><div style='width:100%; height:25mm;'/><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h1 style='text-align:center'>分繕對照表</h3></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推
					var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFontForTxObj)?"全字庫正楷體,":"") + "標楷體;'><h1 style='text-align:center'>分繕對照表</h1></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101110 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
					// 1080717 Raymond 1080538 表格可允許行數高度要扣掉標題高度
					//var mh = $container.find(".body").height();
					var mh = $container.find(".body").height() - $container.find("h1").outerHeight();
					// 1110818 Raymond 考試院序212 修正分繕變數表的標題列改到新增的thead下
					//var $tbl = $("<table border='1'><tr><th width='200px'>受文者</th></tr></table>").appendTo($container.find(".body"));
					var $tbl = $("<table border='1'><thead><tr><th width='200px'>受文者</th></tr></thead></table>").appendTo($container.find(".body"));
					for(var i=0; i<hdrs.length; i++) {
						var ky = hdrs[i].key;
						var $th = $("<th>" + ky + "</th>").appendTo($tbl.find("tr"));
					}
					// 1080717 Raymond 1080538 表格高度不用累加的, 所以sum用不到了
					//var n = mmt.count(), sum = ($container.find('.body').offset().top - $container.offset().top) + $tbl.outerHeight();	//2017.01.16	Leslie	調整分繕表高度(要扣掉h1和表格標題列), 2017.3.13 改用outerHeight()
					var n = mmt.count();
					for(var i=0; i<n; i++) {
						var $tr = $("<tr><td>" + mmt.get(i, "受文者") + "</td></tr>").appendTo($tbl);
						for(var j=0; j<hdrs.length; j++) {
							var ky = hdrs[j].key;
							var v = mmt.get(i, ky);
							var $td = $("<td>" + v + "</td>").appendTo($tr);
						}
						// 1080717 Raymond 1080538 目前表格內容所佔的高度直接用outerHeight()即可取得,
						// 若當前加入的表格列因影響欄位寬度導致之前加入的表格列高度發生變化, 用outerHeight()也可以直接反應出來
						//var h = $tr.outerHeight();	// 2017.3.13 fix for 分繕表分頁高度問題
						//sum += h;
						//if(sum > mh) {
						if($tbl.outerHeight() > mh) {
							// 1110818 Raymond 考試院序212 修正分繕變數表的儲存格寬度在Chrome的列印預覽介面中顯示的與列印分頁不同(較小), 造成列印預覽介面的部分儲存格寬度太窄變成高度增加, 導致表格下方可能有若干受文者的表格列超出列印頁面範圍的問題
							theLogger.log("調整col寬度以免Chrome的列印預覽與列印分頁頁面不一致");
							var $colgrp = $("<colgroup></colgroup>").insertBefore($tbl.find("thead"));
							for(var j=0, m=$tr.find("td").length; j<m; j++) {
								theLogger.log("col[" + j + "].width=" + $tr.find("td").eq(j).innerWidth() + ", " + $tr.find("td").eq(j).outerWidth());
								// 1110901 Raymond 考試院序238 修正有些儲存格在設定較窄col寬度後會折行, 使表格列變高, 造成部分表格列可能超出頁尾邊界範圍的問題
								//$("<col width='" + ((j == (m-1))?"*":Math.round($tr.find("td").eq(j).innerWidth())) + "'/>").appendTo($colgrp);
								$("<col width='" + ((j == (m-1))?"*":Math.round($tr.find("td").eq(j).outerWidth())) + "'/>").appendTo($colgrp);
							}
							theLogger.warn("行數量超出頁面, 新增頁面");
							// 1110915 Raymond 考試院序258 修正分繕變數表在插入最後一筆受文者的變數表格列後, 可能使欄位寬度發生變化, 造成前面本已插入的表格列因而發生折行變高的現象, 導致最後一列之前的幾個表格列也超出頁尾邊界範圍的問題
							let $prvTr = $tbl.find("> tr");
							let oh = $tbl.outerHeight();
							let brkTrIdx = undefined;
							if(oh - $tr.outerHeight() > mh) {	// 若表格高扣掉本次加入會超過可容納高度的表格列高, 仍超出的話
								theLogger.log("加入本表格列後, 前面的表格列高度發生變化, 重新計算應分割至次頁的表格列索引");
								brkTrIdx = $prvTr.length-1;
								for(; brkTrIdx>0; brkTrIdx--) {	// 就往前搜尋到不會超出可容納高度的表格列索引
									let trh = $prvTr.eq(brkTrIdx).outerHeight() + 2;	// 2為表格列之間的距離
									if(oh - trh < mh) {
										theLogger.log("預估從#" + brkTrIdx + "表格列分割後, 表格高度將減為" + (oh - trh) + "px");
										break;
									}
									else
										oh -= trh;
								}
							}
							++po;
							// 1101110 Raymond 1101199 新增依環境變數設定啟用分繕變數表的標楷體加套"全字庫正楷體"字型功能
							//$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><div style='width:100%; height:25mm;'/><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h1 style='text-align:center'>分繕對照表</h1></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推
							$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFontForTxObj)?"全字庫正楷體,":"") + "標楷體;'><h1 style='text-align:center'>分繕對照表</h1></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101110 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
							// 1110818 Raymond 考試院序212 修正分繕變數表的標題列改到新增的thead下
							//$tbl = $("<table border='1'><tr><th width='200px'>受文者</th></tr></table>").appendTo($container.find(".body"));
							$tbl = $("<table border='1'><thead><tr><th width='200px'>受文者</th></tr></thead></table>").appendTo($container.find(".body"));
							for(var k=0; k<hdrs.length; k++) {	//2016.01.16	Leslie	改用另一個迴圈參數，以避免無窮迴圈
								var ky = hdrs[k].key;		//2016.01.16	Leslie	改用另一個迴圈參數，以避免無窮迴圈
								var $th = $("<th>" + ky + "</th>").appendTo($tbl.find("tr"));
							}
							// 1110915 Raymond 考試院序258 修正分繕變數表在插入最後一筆受文者的變數表格列後, 可能使欄位寬度發生變化, 造成前面本已插入的表格列因而發生折行變高的現象, 導致最後一列之前的幾個表格列也超出頁尾邊界範圍的問題
							if(!!brkTrIdx) {	// brkTrIdx有值表示本次加入的表格列之前的表格列高度有變化, brkTrIdx索引以下的表格列需要移至次頁
								$prvTr.slice(brkTrIdx).appendTo($tbl);
								theLogger.log("從#" + brkTrIdx + "分割表格列後, 前一表格實際高度減為" + $prvTr.closest("table").outerHeight() + "px");
							}
							else
							// 1080717 Raymond 1080538 表格高度不用累加的, 所以sum用不到了
							//sum = ($container.find('.body').offset().top - $container.offset().top) + $tbl.outerHeight();	// 2017.3.13 fix for 分繕表分頁高度問題(要扣掉h1和表格標題列)
							$tr.appendTo($tbl);
							// 1080717 Raymond 1080538 表格高度不用累加的, 所以sum用不到了
							//sum += h;
						}
					}
					// 1140115 Raymond 1131158 修正未設定分繕變數表內容時, 列印分繕變數表會卡住問題
					// 1110818 Raymond 考試院序212 修正分繕變數表的儲存格寬度在Chrome的列印預覽介面中顯示的與列印分頁不同(較小), 造成列印預覽介面的部分儲存格寬度太窄變成高度增加, 導致表格下方可能有若干受文者的表格列超出列印頁面範圍的問題
					//if($tbl.find("colgroup").length == 0) {
					if($tbl.find("colgroup").length == 0 && !!$tr) {
						theLogger.log("調整col寬度以免Chrome的列印預覽與列印分頁頁面不一致");
						var $colgrp = $("<colgroup></colgroup>").insertBefore($tbl.find("thead"));
						for(var j=0, m=$tr.find("td").length; j<m; j++) {
							theLogger.log("col[" + j + "].width=" + $tr.find("td").eq(j).innerWidth() + ", " + $tr.find("td").eq(j).outerWidth());
							// 1110901 Raymond 考試院序238 修正有些儲存格在設定較窄col寬度後會折行, 使表格列變高, 造成部分表格列可能超出頁尾邊界範圍的問題
							//$("<col width='" + ((j == (m-1))?"*":Math.round($tr.find("td").eq(j).innerWidth())) + "'/>").appendTo($colgrp);
							$("<col width='" + ((j == (m-1))?"*":Math.round($tr.find("td").eq(j).outerWidth())) + "'/>").appendTo($colgrp);
						}
					}
				}
				//1061213	Leslie[1061148]	修正雙面列印補頁邏輯，非列印範圍不計入
				//if(bBothSide && ($pages.find(".pg").length % 2 == 1))//2017.2.23	Leslie	新增雙面列印功能
				if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1))//2017.2.23	Leslie	新增雙面列印功能
					$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);	// 補上空白頁
				dfd.resolve();
			})
			.fail(function(errorText) {
				dfd.reject(errorText);
			});
		return dfd.promise();
	}
	
	function _getSignCharger(flowId) {
		if(flowId != undefined) {
			var userName = fm.getSignFolder().getFlowUserInfo(flowId, 1);
			return userName;
		}
		return theUserInfo.UserName;
	}
	
	function _getTime(time) {
		// 1100715 Raymond 1100854 新增[高大客製化]簽核意見時間顯示年月日時分秒
		if(theUserInfo.OrgNickName == "NUK") {
			if(typeof time === 'string')
				return time.substr(0, 3) + "年" + time.substr(3, 2) + "月" + time.substr(5, 2) + "日 " + time.substr(7, 2) + ":" + time.substr(9, 2) + ":" + ((time.length == 13)?time.substr(11, 2):"00");
			else if("getMonth" in time)
				return (time.getFullYear() - 1911) + "年" + (time.getMonth() + 1) + "月" + time.getDate() + "日 " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
		}
		else
		if(typeof time === "string")
			return time.substr(0, 3) + "年" + time.substr(3, 2) + "月" + time.substr(5, 2) + "日 " + time.substr(7, 2) + ":" + time.substr(9, 2);
		else if("getMonth" in time)
			return (time.getFullYear() - 1911) + "年" + (time.getMonth() + 1) + "月" + time.getDate() + "日 " + time.getHours() + ":" + time.getMinutes();
		return "";
	}
	// 2017.3.14 新增取得簽核資訊供列印貼式文字意見及數位墨水頁使用
	function _getSignChargerInfo(flowId) {
		if(flowId != undefined) {
			return fm.getSignFolder().getFlowUserInfo(flowId, 2);
		}
		// 1150306 Raymond 1150145 修正getDocObj沒加()的錯誤
		// 1120210 Raymond 1111035 修正DocView模組開啟線上簽核公文在列印貼式文字意見頁時, 由於無ownOUId及ownRoleId, 導致發生Error無法列印的問題
		//if(!fm.getDocObj.ownOUId || !fm.getDocObj.ownRoleId)
		if(!fm.getDocObj().ownOUId || !fm.getDocObj().ownRoleId)
			return {name: theUserInfo.UserName,
				userId: theUserInfo.UserID,
				title: theSSO.User.title,
				role: ""};
		return {name: theUserInfo.UserName,
				userId: theUserInfo.UserID,
				title: theSSO.User.title,
				role: SSOUtil.getOrgRoleName(SSOUtil.getOrgNode(fm.getDocObj().sourceOrgNo), fm.getDocObj().ownOUId, fm.getDocObj().ownRoleId),
				ou: SSOUtil.getOrgUnitName(SSOUtil.getOrgNode(fm.getDocObj().sourceOrgNo), fm.getDocObj().ownOUId)};	// 1150306 Raymond 1150145 新增ou單位名稱
	}
	
	// 1100712 Raymond 1100649 新增簽核意見參數
	// 2017.2.8 改用外部簽核物件顯示, 因簽核框內物件出現順序可能與頁次不符, 故改用加入順序顯示
	//function printSignObjPages(draftIdx, opts, $pages, soList) {
	function printSignObjPages(draftIdx, opts, $pages, soList, scList) {
		var po = 1;
		// 1150305 Raymond 1150145 外貿的簽核物件資訊頁不用<hr>
		// 1140311 Raymond 1140413 修正計算分頁時行高預設為1.3與列印結果行高為normal高度不一致, 造成分頁位置有誤差問題
		// 1101110 Raymond 1101199 新增依環境變數設定啟用簽核物件資訊頁的標楷體加套"全字庫正楷體"字型功能
		//var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm;'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
		//var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFontForTxObj)?"全字庫正楷體,":"") + "標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
		//var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFontForTxObj)?"全字庫正楷體,":"") + "標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
		var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFontForTxObj)?"全字庫正楷體,":"") + "標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3>" + ((SSO_CONFIG.OrgNickName == "TAITRA")?"":"<hr/>") + "</div></div>").appendTo($pages);
		// 1100712 Raymond 1100649 勾選僅顯示會辦單位長官意見選項時, 顯示「(會辦單位僅顯示單位主官簽核意見)」
		if(!!scList && scList.length && scList.filterNUK)
			$container.find("h3").append("<div style='float:right'>(會辦單位僅顯示單位主官簽核意見)</div>");
		var mh = $container.find(".body").height();
		/* 2017.2.8 改以加入簽核物件順序的清單來顯示
		for(var i=0; i<n; i++) {
			var pg = fm.getDraftPage(draftIdx, i);
			if(pg) {
				var m = pg.signObjs.length, sum = 0;
				for(var j=0; j<m; j++) {
					var so = pg.signObjs[j], $cmt = undefined;
					if(so.type == "文字意見") {
						$cmt = $("<div>序　　號：　" + (j+1) + "<br/>簽核人員：　" + _getSignCharger(so.flowId) + "<br/>物件類型：　" + so.type + "<br/>時　　間：　" + _getTime(so.time) + "<br/>文字內容：　" + so.content.text + "</div><hr/>").appendTo($container.find(".body"));
					}
					else if(so.type == "章戳") {
						$cmt = $("<div>序　　號：　" + (j+1) + "<br/>簽核人員：　" + _getSignCharger(so.flowId) + "<br/>物件類型：　" + so.type + "<br/>時　　間：　" + _getTime(so.time) + "</div><hr/>").appendTo($container.find(".body"));
					}
					if($cmt) {
						var h = $cmt.height();
						sum += h;
						if(sum > mh) {
							theLogger.warn("簽核物件數量超出頁面, 新增頁面");
							_printMarginText($container, fm.getDocNo(), po, po, "signObjs");
							++po;
							$pages.find(".so-pages").text(po);
							$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><div style='width:100%; height:25mm;'/><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h3>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推
							$cmt.appendTo($container.find(".body"));
							sum = h;
						}
					}
				}
				// 2016.12.29 修正列印保留的簽署物件
				if("reservedSO" in pg) {
					m = pg.reservedSO.length;
					for(var j=0; j<m; j++) {
						var so = pg.reservedSO[j], $cmt = undefined;
						if(so.type == "文字意見") {
							$cmt = $("<div>序　　號：　" + (j+1) + "<br/>簽核人員：　" + _getSignCharger(so.flowId) + "<br/>物件類型：　" + so.type + "<br/>時　　間：　" + _getTime(so.time) + "<br/>文字內容：　" + so.content.text + "</div><hr/>").appendTo($container.find(".body"));
						}
						else if(so.type == "章戳") {
							$cmt = $("<div>序　　號：　" + (j+1) + "<br/>簽核人員：　" + _getSignCharger(so.flowId) + "<br/>物件類型：　" + so.type + "<br/>時　　間：　" + _getTime(so.time) + "</div><hr/>").appendTo($container.find(".body"));
						}
						if($cmt) {
							var h = $cmt.height();
							sum += h;
							if(sum > mh) {
								theLogger.warn("簽核物件數量超出頁面, 新增頁面");
								_printMarginText($container, fm.getDocNo(), po, po, "signObjs");
								++po;
								$pages.find(".so-pages").text(po);
								$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><div style='width:100%; height:25mm;'/><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h3>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推
								$cmt.appendTo($container.find(".body"));
								sum = h;
							}
						}
					}
				}
				var c = pg.newSignObjs.length;
				for(var j=0; j<c; j++) {
					var so = pg.newSignObjs[j], $cmt = undefined;
					if(so.type == "text") {
						$cmt = $("<div>序　　號：　" + (m+j+1) + "<br/>簽核人員：　" + _getSignCharger() + "<br/>物件類型：　文字意見<br/>時　　間：　" + _getTime(so.cTime) + "<br/>文字內容：　" + so.content + "</div><hr/>").appendTo($container.find(".body"));
					}
					else if(so.type.indexOf("stamp") >= 0 || so.type == "signet") {
						$cmt = $("<div>序　　號：　" + (m+j+1) + "<br/>簽核人員：　" + _getSignCharger() + "<br/>物件類型：　章戳<br/>時　　間：　" + _getTime(so.cTime) + "</div><hr/>").appendTo($container.find(".body"));
					}
					if($cmt) {
						var h = $cmt.height();
						sum += h;
						if(sum > mh) {
							theLogger.warn("簽核物件數量超出頁面, 新增頁面");
							_printMarginText($container, fm.getDocNo(), po, po, "signObjs");
							++po;
							$pages.find(".so-pages").text(po);
							$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><div style='width:100%; height:25mm;'/><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h3>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推
							$cmt.appendTo($container.find(".body"));
							sum = h;
						}
					}
				}
				_printMarginText($container, fm.getDocNo(), po, po, "signObjs");
			}
		}*/
		// 2017.2.8 改以加入簽核物件順序的清單來顯示
		var sum = 0;
		$container.find(".body").children().each(function(idx, elm) {
			sum += $(elm).outerHeight(true);
		});
		// 1140311 Raymond 1140413 新增扣掉表頭的剩餘高度
		var mh2 = mh - sum;
		for(var j=0; j<soList.length; j++) {
			var so = soList[j], $cmt = undefined;
			if("flowId" in so) {
				if(so.type == "文字意見") {
					// 1120210 Raymond 1111035 由於貼式文字意見改為未依邊框寬度自動折行的原始輸入文字, 所以列印貼式文字意見也要改成會折行(改用.comment class來設定), 以免一行太長超出表格範圍的問題
					// 1081217 Raymond FIX XSS
					//$cmt = $("<div>序　　號：　" + (j+1) + "<br/>簽核人員：　" + _getSignCharger(so.flowId) + "<br/>物件類型：　" + so.type + "<br/>時　　間：　" + _getTime(so.time) + "<br/>文字內容：　" + so.content.text + "</div><hr/>").appendTo($container.find(".body"));
					//$cmt = $("<div>序　　號：　" + (j+1) + "<br/>簽核人員：　" + _getSignCharger(so.flowId) + "<br/>物件類型：　" + so.type + "<br/>時　　間：　" + _getTime(so.time) + "<br/>文字內容：　<div style='display:inline-block'></div></div><hr/>").appendTo($container.find(".body"));
					$cmt = $("<div>序　　號：　" + (j+1) + "<br/>簽核人員：　" + _getSignCharger(so.flowId) + "<br/>物件類型：　" + so.type + "<br/>時　　間：　" + _getTime(so.time) + "<br/>文字內容：　<div class='comment'></div></div><hr/>").appendTo($container.find(".body"));
					$cmt.find("> div").text(so.content.text.replace(/<br>/g, "\n"));	// 1081218 Raymond 為了顯示已用&lt;br&gt;記錄在封裝檔中的文字意見, 替換成折行字元
					// 1120210 Raymond 1111035 若不是貼式文字意見, 則改回不保留折行, 以免自動折行的寬度太短使表格範圍的右側留太多空白的問題
					if(!so.asIcon)
						$cmt.find("> div").css("white-space", "normal");
				}
				else {
					$cmt = $("<div>序　　號：　" + (j+1) + "<br/>簽核人員：　" + _getSignCharger(so.flowId) + "<br/>物件類型：　" + so.type + "<br/>時　　間：　" + _getTime(so.time) + "</div><hr/>").appendTo($container.find(".body"));
				}
				if($cmt) {
					var h = 0;
					$cmt.each(function(idx, elm) {
						h += $(elm).outerHeight(true);
					});
					sum += h;
					if(sum > mh) {
						theLogger.warn("簽核物件數量超出頁面, 新增頁面");
						_printMarginText($container, fm.getDocNo(), po, po, "signObjs");
						++po;
						$pages.find(".so-pages").text(po);
						// 1140311 Raymond 1140413 修正計算分頁時行高預設為1.3與列印結果行高為normal高度不一致, 造成分頁位置有誤差問題
						// 1101110 Raymond 1101199 新增依環境變數設定啟用簽核物件資訊頁的標楷體加套"全字庫正楷體"字型功能
						//$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h3>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
						//$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFontForTxObj)?"全字庫正楷體,":"") + "標楷體;'><h3>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
						$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFontForTxObj)?"全字庫正楷體,":"") + "標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
						// 1100712 Raymond 1100649 勾選僅顯示會辦單位長官意見選項時, 顯示「(會辦單位僅顯示單位主官簽核意見)」
						if(!!scList && scList.length && scList.filterNUK)
							$container.find("h3").append("<div style='float:right'>(會辦單位僅顯示單位主官簽核意見)</div>");
						$cmt.appendTo($container.find(".body"));
						sum = h;
					}
				}
			}
			else {
				if(so.type == "text") {
					// 1120210 Raymond 1111035 由於貼式文字意見改為未依邊框寬度自動折行的原始輸入文字, 所以列印貼式文字意見也要改成會折行(改用.comment class來設定), 以免一行太長超出表格範圍的問題
					// 1081217 Raymond FIX XSS
					//$cmt = $("<div>序　　號：　" + (j+1) + "<br/>簽核人員：　" + _getSignCharger() + "<br/>物件類型：　文字意見<br/>時　　間：　" + _getTime(so.cTime) + "<br/>文字內容：　" + so.content + "</div><hr/>").appendTo($container.find(".body"));
					//$cmt = $("<div>序　　號：　" + (j+1) + "<br/>簽核人員：　" + _getSignCharger() + "<br/>物件類型：　文字意見<br/>時　　間：　" + _getTime(so.cTime) + "<br/>文字內容：　<div style='display:inline-block'></div></div><hr/>").appendTo($container.find(".body"));
					$cmt = $("<div>序　　號：　" + (j+1) + "<br/>簽核人員：　" + _getSignCharger() + "<br/>物件類型：　文字意見<br/>時　　間：　" + _getTime(so.cTime) + "<br/>文字內容：　<div class='comment'></div></div><hr/>").appendTo($container.find(".body"));
					// 1120210 Raymond 1111035 當流程點的文字意見(不論是否為貼式), 改用原始文字意見顯示, 以免自動折行的寬度太短使表格範圍的右側留太多空白的問題
					if(!!so.srcContent)
						$cmt.find("> div").text(so.srcContent);
					else
					$cmt.find("> div").text(so.content.replace(/<br>/g, "\n"));	// 1081218 Raymond 為了顯示已用&lt;br&gt;記錄在封裝檔中的文字意見, 替換成折行字元
				}
				else if(so.type.indexOf("stamp") >= 0 || so.type == "signet") {
					$cmt = $("<div>序　　號：　" + (j+1) + "<br/>簽核人員：　" + _getSignCharger() + "<br/>物件類型：　章戳<br/>時　　間：　" + _getTime(so.cTime) + "</div><hr/>").appendTo($container.find(".body"));
				}
				else {
					$cmt = $("<div>序　　號：　" + (j+1) + "<br/>簽核人員：　" + _getSignCharger() + "<br/>物件類型：　圖檔<br/>時　　間：　" + _getTime(so.cTime) + "</div><hr/>").appendTo($container.find(".body"));
				}
				if($cmt) {
					var h = 0;
					$cmt.each(function(idx, elm) {
						h += $(elm).outerHeight(true);
					});
					sum += h;
					if(sum > mh) {
						theLogger.warn("簽核物件數量超出頁面, 新增頁面");
						_printMarginText($container, fm.getDocNo(), po, po, "signObjs");
						++po;
						$pages.find(".so-pages").text(po);
						// 1140311 Raymond 1140413 修正計算分頁時行高預設為1.3與列印結果行高為normal高度不一致, 造成分頁位置有誤差問題
						// 1101110 Raymond 1101199 新增依環境變數設定啟用簽核物件資訊頁的標楷體加套"全字庫正楷體"字型功能
						//$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h3>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
						//$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFontForTxObj)?"全字庫正楷體,":"") + "標楷體;'><h3>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
						$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFontForTxObj)?"全字庫正楷體,":"") + "標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
						// 1100712 Raymond 1100649 勾選僅顯示會辦單位長官意見選項時, 顯示「(會辦單位僅顯示單位主官簽核意見)」
						if(!!scList && scList.length && scList.filterNUK)
							$container.find("h3").append("<div style='float:right'>(會辦單位僅顯示單位主官簽核意見)</div>");
						$cmt.appendTo($container.find(".body"));
						sum = h;
					}
				}
			}
		}
		// 1100712 Raymond 1100649 新增列印簽核意見
		if(!!scList) {
			// 1150305 Raymond 1150145 新增_getTime2方法, 格式化外貿客製化的流程點時間呈現方式
			function _getTime2(time) {
				if(typeof time === "string")
					return time.substr(0, 3) + "/" + time.substr(3, 2) + "/" + time.substr(5, 2) + " " + time.substr(7, 2) + ":" + time.substr(9, 2);
				else if("getMonth" in time)
					return (time.getFullYear() - 1911) + "/" + Util.padLeft(time.getMonth() + 1, 2) + "/" + Util.padLeft(time.getDate(), 2) + " " + Util.padLeft(time.getHours(), 2) + ":" + Util.padLeft(time.getMinutes(), 2);
				return "";
			}
			// 1150305 Raymond 1150145 外貿要倒序, 從新到舊
			//for(var j=0, k=soList.length; j<scList.length; j++) {
			var thisOUBlock = undefined, setFirstBlock = false;
			for(var j=(SSO_CONFIG.OrgNickName == "TAITRA")?(scList.length-1):0, k=soList.length; (SSO_CONFIG.OrgNickName == "TAITRA")?(j>=0):(j<scList.length); (SSO_CONFIG.OrgNickName == "TAITRA")?(j--):(j++)) {
				var sc = scList[j], $cmt = undefined;
				// 1150304 Raymond 1150145 新增外貿客製格式
				if(SSO_CONFIG.OrgNickName == "TAITRA") {
					let ci = _getSignChargerInfo(sc.flowId);
					if(scList.filterTAITRA && !!fm.getDocObj().ownOUId && fm.getDocObj().ownOUId.substr(0, 2) == sc.ownOUId?.substr(0, 2)) {
						if(!thisOUBlock) {
							thisOUBlock = $("<div class='ouBlock'></div>").appendTo($container.find(".body"));
							if(!setFirstBlock) {
								thisOUBlock.addClass("firstBlock");
								setFirstBlock = true;
							}
						}
						$cmt = $(`<div${(j==0)?"":" style='padding-bottom:1em'"}>簽核人員：　${ci.ou} ${ci.title} ${ci.name}${(sc.appFlow == true)?'[決行]':''}<br>物件類型：　簽核意見<br>時　　間：　${_getTime(sc.time || sc.cTime)}<br>文字內容：　<div class='comment'></div></div>`).appendTo(thisOUBlock);
						$cmt.find("> div").text(sc.content.replace(/<br>/g, "\n"));
					}
					else {
						thisOUBlock = undefined;	// 不同流程點時重置thisOUBlock變數
						if(sc.appFlow)
							$cmt = $(`<div class='ouBlock'>簽核單位：${ci.ou} 核決者：${ci.title}-${ci.name}<p></p><div></div></div>`).appendTo($container.find(".body"));
						else
							$cmt = $(`<div class='ouBlock'>簽核單位：${ci.ou}<p></p><div></div></div>`).appendTo($container.find(".body"));
						if(!setFirstBlock) {
							$cmt.addClass("firstBlock");
							setFirstBlock = true;
						}
						$cmt.find("> p").text(sc.content.replace(/<br>/g, "\n"));
						if(sc.sameOUFlows?.length > 0) {
							for(let x=0; x<sc.sameOUFlows.length; x++) {
								let ci2 = _getSignChargerInfo(sc.sameOUFlows[x].flowId);
								$cmt.find("> div").append(`<div class='flowBlock'>${ci2.ou}${(sc.sameOUFlows[x].appFlow)?'(決行)':''}<br>${ci2.title}-${ci2.name}<br>${_getTime2(sc.sameOUFlows[x].time)}</div>`);
							}
						}
						$cmt.find("> div").append(`<div class='flowBlock'>${ci.ou}${(sc.appFlow)?'(決行)':''}<br>${ci.title}-${ci.name}<br>${_getTime2(sc.time || sc.cTime)}</div>`);
					}
				}
				else
				if("flowId" in sc) {
					// 1120210 Raymond 1111035 由於貼式文字意見改為未依邊框寬度自動折行的原始輸入文字, 所以列印貼式文字意見也要改成會折行(改用.comment class來設定), 以免一行太長超出表格範圍的問題
					// 1110207 Raymond 1110013 新增註記核決流程點
					//$cmt = $("<div>序　　號：　" + (j+k+1) + "<br/>簽核人員：　" + _getSignCharger(sc.flowId) + "<br/>物件類型：　簽核意見<br/>時　　間：　" + _getTime(sc.time) + "<br/>文字內容：　<div style='display:inline-block'></div></div><hr/>").appendTo($container.find(".body"));
					//$cmt = $("<div>序　　號：　" + (j+k+1) + "<br/>簽核人員：　" + _getSignCharger(sc.flowId) + ((sc.appFlow == true)?"[決行]":"") + "<br/>物件類型：　簽核意見<br/>時　　間：　" + _getTime(sc.time) + "<br/>文字內容：　<div style='display:inline-block'></div></div><hr/>").appendTo($container.find(".body"));
					$cmt = $("<div>序　　號：　" + (j+k+1) + "<br/>簽核人員：　" + _getSignCharger(sc.flowId) + ((sc.appFlow == true)?"[決行]":"") + "<br/>物件類型：　簽核意見<br/>時　　間：　" + _getTime(sc.time) + "<br/>文字內容：　<div class='comment'></div></div><hr/>").appendTo($container.find(".body"));
					$cmt.find("> div").text(sc.content.replace(/<br>/g, "\n"));
				}
				else {
					// 1120210 Raymond 1111035 由於貼式文字意見改為未依邊框寬度自動折行的原始輸入文字, 所以列印貼式文字意見也要改成會折行(改用.comment class來設定), 以免一行太長超出表格範圍的問題
					//$cmt = $("<div>序　　號：　" + (j+k+1) + "<br/>簽核人員：　" + _getSignCharger() + "<br/>物件類型：　簽核意見<br/>時　　間：　" + _getTime(sc.cTime) + "<br/>文字內容：　<div style='display:inline-block'></div></div><hr/>").appendTo($container.find(".body"));
					$cmt = $("<div>序　　號：　" + (j+k+1) + "<br/>簽核人員：　" + _getSignCharger() + "<br/>物件類型：　簽核意見<br/>時　　間：　" + _getTime(sc.cTime) + "<br/>文字內容：　<div class='comment'></div></div><hr/>").appendTo($container.find(".body"));
					$cmt.find("> div").text(sc.content.replace(/<br>/g, "\n"));
				}
				if($cmt) {
					var h = 0;
					$cmt.each(function(idx, elm) {
						h += $(elm).outerHeight(true);
					});
					sum += h;
					if(sum > mh) {
						// 1140311 Raymond 1140413 修正簽核意見若超過剩餘單頁高度, 則分頁顯示
						if(h > mh2) {
							console.log("簽核意見高度(" + h + ")超過剩餘單頁高度(" + mh2 + "), 進行分頁處理");
							var ofs = $container.find(".body").offset();
							console.log("body offset=" + ofs.left + "," + ofs.top);
							var h2 = $cmt.find("> div").outerHeight(true);
							var hh = h - h2;
							if(sum - h + hh + 16 < mh2)	// 若此簽核意見前5行能塞進剩餘空間, 則從文字內容DIV中間開始分頁
								console.log("前5行能塞進本頁剩餘空間");
							else {
								console.log("從新增的次頁開始分頁");
								_printMarginText($container, fm.getDocNo(), po, po, "signObjs");
								++po;
								// 1150305 Raymond 1150145 外貿的簽核物件資訊頁不用<hr>
								// 1101110 Raymond 1101199 新增依環境變數設定啟用簽核物件資訊頁的標楷體加套"全字庫正楷體"字型功能
								//$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFontForTxObj)?"全字庫正楷體,":"") + "標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1100712 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
								$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFontForTxObj)?"全字庫正楷體,":"") + "標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3>" + ((SSO_CONFIG.OrgNickName == "TAITRA")?"":"<hr/>") + "</div></div>").appendTo($pages);
								// 1100712 Raymond 1100649 勾選僅顯示會辦單位長官意見選項時, 顯示「(會辦單位僅顯示單位主官簽核意見)」
								if(!!scList && scList.length && scList.filterNUK)
									$container.find("h3").append("<div style='float:right'>(會辦單位僅顯示單位主官簽核意見)</div>");
								$cmt.appendTo($container.find(".body"));
								ofs = $container.find(".body").offset();	// body的offset更新為新頁面的body的
								sum = 0;
								$container.find(".body").children().each(function(idx, elm) {
									sum += $(elm).outerHeight(true);
								});
								mh2 = mh - sum;
							}
							var ofsThisCmt = $cmt.eq(0).offset();
							console.log("ofsThisCmt.top = " + ofsThisCmt.top);
							var rng = document.createRange();
							rng.selectNode($cmt.find("> div").get(0));
							var rcs = rng.getClientRects();
							//console.log(rcs);
							for(var x=0; x<rcs.length; x++) {
								if(rcs[x].height > 22) {	// 超過1.5倍單行高度, 應是整個DIV高, 忽略
									console.log("DOMRect[" + x + "].height(" + rcs[x].height + ")超過1.5倍單行高度22px, 忽略");
								}
								else {
									var b = rcs[x].bottom - ofs.top;
									console.log("DOMRect[" + x + "] {top:" + (rcs[x].top - ofs.top) + ", bottom:" + (rcs[x].bottom - ofs.top) + "}");
									if(b > mh) {
										console.log("從第" + x + "行(this.bottom:" + (rcs[x].bottom - ofs.top) + ", this.top:" + (rcs[x].top - ofs.top) + ")分頁");
										var bk = (rcs[x-1].bottom + rcs[x].top) / 2 - ofs.top;
										$container.find(".body").css({height: Math.floor(bk) + "px", overflowY: "hidden"});
										
										theLogger.warn("簽核意見高度超出頁面, 新增頁面");
										_printMarginText($container, fm.getDocNo(), po, po, "signObjs");
										++po;
										// 1150305 Raymond 1150145 外貿的簽核物件資訊頁不用<hr>
										// 1101110 Raymond 1101199 新增依環境變數設定啟用簽核物件資訊頁的標楷體加套"全字庫正楷體"字型功能
										//$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFontForTxObj)?"全字庫正楷體,":"") + "標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1100712 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
										$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFontForTxObj)?"全字庫正楷體,":"") + "標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3>" + ((SSO_CONFIG.OrgNickName == "TAITRA")?"":"<hr/>") + "</div></div>").appendTo($pages);
										// 1100712 Raymond 1100649 勾選僅顯示會辦單位長官意見選項時, 顯示「(會辦單位僅顯示單位主官簽核意見)」
										if(!!scList && scList.length && scList.filterNUK)
											$container.find("h3").append("<div style='float:right'>(會辦單位僅顯示單位主官簽核意見)</div>");
										sum = 0;
										$container.find(".body").children().each(function(idx, elm) {
											sum += $(elm).outerHeight(true);
										});
										mh2 = mh - sum;
										var $cmt2 = $cmt.clone(true);
										$cmt2.eq(0).css("margin-top", (ofsThisCmt.top - rcs[x].top) + "px");
										$("<div style='overflow-y:hidden'></div>").append($cmt2).appendTo($container.find(".body"));
										ofs = $container.find(".body").offset();	// body的offset更新為新頁面的body的
										ofsThisCmt = $cmt2.eq(0).offset();	// ofsThisCmt更新為新頁面上的
										rng.selectNode($cmt2.find("> div").get(0));
										rcs = rng.getClientRects();	// rcs也要更新為新頁面上的
										h = 0;
										$cmt2.each(function(idx, elm) {
											h += $(elm).outerHeight(true);
										});
										sum += Math.min(mh2, h + (ofsThisCmt.top - rcs[x].top));
									}
									else {
										console.log("第" + x + "行(this.bottom:" + (rcs[x].bottom - ofs.top) + ")尚未超過頁面範圍");
										sum = rcs[x].bottom - ofs.top;
									}
								}
							}
						}
						else {
						theLogger.warn("簽核意見數量超出頁面, 新增頁面");
						_printMarginText($container, fm.getDocNo(), po, po, "signObjs");
						++po;
						$pages.find(".so-pages").text(po);
						// 1150305 Raymond 1150145 外貿的簽核物件資訊頁不用<hr>
						// 1140311 Raymond 1140413 修正計算分頁時行高預設為1.3與列印結果行高為normal高度不一致, 造成分頁位置有誤差問題
						// 1140311 Raymond 1101199 新增依環境變數設定啟用簽核物件資訊頁的標楷體加套"全字庫正楷體"字型功能
						//$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h3>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1100712 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
						//$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFontForTxObj)?"全字庫正楷體,":"") + "標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1100712 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
						$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFontForTxObj)?"全字庫正楷體,":"") + "標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3>" + ((SSO_CONFIG.OrgNickName == "TAITRA")?"":"<hr/>") + "</div></div>").appendTo($pages);
						// 1100712 Raymond 1100649 勾選僅顯示會辦單位長官意見選項時, 顯示「(會辦單位僅顯示單位主官簽核意見)」
						if(!!scList && scList.length && scList.filterNUK)
							$container.find("h3").append("<div style='float:right'>(會辦單位僅顯示單位主官簽核意見)</div>");
						// 1150306 Raymond 1150145 新增判斷是內部意見且與目前流程點同一級單位時, 新增ouBlock DIV, 再將$cmt改放在新頁的ouBlock DIV中
						if(scList.filterTAITRA && !!fm.getDocObj().ownOUId && fm.getDocObj().ownOUId.substr(0, 2) == sc.ownOUId.substr(0, 2)) {
							thisOUBlock = $("<div class='ouBlock firstBlock'></div>").appendTo($container.find(".body"));
							$cmt.appendTo(thisOUBlock);
						}
						else {
							if(SSO_CONFIG.OrgNickName == "TAITRA")
								$cmt.addClass("firstBlock");
						$cmt.appendTo($container.find(".body"));
						}
						sum = h;
						}
					}
				}
			}
		}
		_printMarginText($container, fm.getDocNo(), po, po, "signObjs");
	}
	// 2017.3.14 列印貼式文字意見及數位墨水簽核物件頁面
	function printIconizedSOPages(draftIdx, $pages, soList) {
		var po = 1;
		for(var j=0; j<soList.length; j++) {
			var so = soList[j];
			if("flowId" in so) {
				var charger = _getSignChargerInfo(so.flowId);
				if(so.type == "文字意見" && so.asIcon == true) {
					// 1101110 Raymond 1101199 新增依環境變數設定啟用簽核物件資訊頁的標楷體加套"全字庫正楷體"字型功能
					//var textStyles = "font-family:" + so.content.font.name + "; font-size:" + so.content.font.size + "pt; ";
					var textStyles = ((so.content.font.name != "標楷體")?"font-family:" + so.content.font.name + "; ":"") + "font-size:" + so.content.font.size + "pt; ";
					if(so.content.font.style == "粗體")
						textStyles += "font-weight:border; ";
					else if(so.content.font.style == "斜體")
						textStyles += "font-style:italic; ";
					// 1101110 Raymond 1101199 新增依環境變數設定啟用簽核物件資訊頁的標楷體加套"全字庫正楷體"字型功能
					//var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm;'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'></div></div>").appendTo($pages);	// 使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
					var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm;'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFontForTxObj)?"全字庫正楷體,":"") + "標楷體;'></div></div>").appendTo($pages);	// 使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
					var $cmt = $("<table><tr><td>人　　員：　" + charger.name + "</td><td>員工編號：　" + charger.userId + "</td></tr>" +
					"<tr><td>角　　色：　" + charger.role + "</td><td>職　　稱：　" + charger.title + "</td></tr>" +
					"<tr><td>時　　間：　" + _getTime(so.time) + "</td></tr></table>" +
					// 1120210 Raymond 1111035 由於貼式文字意見改為未依邊框寬度自動折行的原始輸入文字, 所以列印貼式文字意見也要改成會折行, 以免一行太長超出表格範圍的問題
					// 1081217 Raymond FIX XSS & 保留折行
					// 1080321 Raymond 1080224 修正貼式文字意見若折行數超過2行, 在列印貼式文字意見及數位墨水簽核物件頁面會呈現只折成2行的問題
					//"<div style='border:1px solid black; width:100%; " + textStyles + "'>" + so.content.text.replace("\n", "<br/>") + "</div>").appendTo($container.find(".body"));
					//"<div style='border:1px solid black; width:100%; " + textStyles + "'>" + so.content.text.replace(/\n/g, "<br/>") + "</div>").appendTo($container.find(".body"));
					//"<div style='border:1px solid black; width:100%; white-space:pre; " + textStyles + "'>" + "</div>").appendTo($container.find(".body"));
					"<div style='border:1px solid black; width:100%; white-space:pre-wrap; " + textStyles + "'>" + "</div>").appendTo($container.find(".body"));
					// 1081217 Raymond FIX XSS
					$cmt.eq(1).text(so.content.text);
					$cmt.eq(1).css("height", "calc(100% - " + $cmt.eq(0).outerHeight(true) + "px)");
					
					_printMarginText($container, fm.getDocNo(), po, po, "textSignObj");
					++po;
					$pages.find(".so-pages").text(po);
				}
				else if(so.type == "圖檔" && so.asIcon == true) {
					// 1101110 Raymond 1101199 新增依環境變數設定啟用簽核物件資訊頁的標楷體加套"全字庫正楷體"字型功能
					//var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm;'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'></div></div>").appendTo($pages);	// 使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
					var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm;'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFontForTxObj)?"全字庫正楷體,":"") + "標楷體;'></div></div>").appendTo($pages);	// 使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
					var $cmt = $("<table><tr><td>人　　員：　" + charger.name + "</td><td>員工編號：　" + charger.userId + "</td></tr>" +
					"<tr><td>角　　色：　" + charger.role + "</td><td>職　　稱：　" + charger.title + "</td></tr>" +
					// 1080521 Raymond 1080370 修正貼式數位墨水影像列印時未顯示的問題
					//"<tr><td>時　　間：　" + _getTime(so.time) + "</td></tr></table><div style='border:1px solid black; width:100%; height:100%'><img src='" + so.content + "'></div>").appendTo($container.find(".body"));
					"<tr><td>時　　間：　" + _getTime(so.time) + "</td></tr></table><div style='border:1px solid black; width:100%; height:100%'><img src='" + (so.imgData || so.content) + "'></div>").appendTo($container.find(".body"));
					$cmt.eq(1).css("height", "calc(100% - " + $cmt.eq(0).outerHeight(true) + "px)");
					
					_printMarginText($container, fm.getDocNo(), po, po, "imageSignObj");
					++po;
					$pages.find(".so-pages").text(po);
				}
			}
			else {
				var charger = _getSignChargerInfo();
				if(so.type == "text" && so.asIcon == true) {
					// 1101110 Raymond 1101199 新增依環境變數設定啟用簽核物件資訊頁的標楷體加套"全字庫正楷體"字型功能
					//var textStyles = "font-family:" + so.fontName + "; font-size:" + so.fontSize + "; ";
					var textStyles = ((so.fontName != "標楷體")?"font-family:" + so.fontName + "; ":"") + "font-size:" + so.fontSize + "; ";
					if(so.fontWeight)
						textStyles += "font-weight:border; ";
					if(so.fontStyle)
						textStyles += "font-style:italic; ";
					// 1101110 Raymond 1101199 新增依環境變數設定啟用簽核物件資訊頁的標楷體加套"全字庫正楷體"字型功能
					//var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm;'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'></div></div>").appendTo($pages);	// 使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
					var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm;'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFontForTxObj)?"全字庫正楷體,":"") + "標楷體;'></div></div>").appendTo($pages);	// 使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
					var $cmt = $("<table><tr><td>人　　員：　" + charger.name + "</td><td>員工編號：　" + charger.userId + "</td></tr>" +
					"<tr><td>角　　色：　" + charger.role + "</td><td>職　　稱：　" + charger.title + "</td></tr>" +
					"<tr><td>時　　間：　" + _getTime(so.cTime) + "</td></tr></table>" +
					// 1120210 Raymond 1111035 由於貼式文字意見改為未依邊框寬度自動折行的原始輸入文字, 所以列印貼式文字意見也要改成會折行, 以免一行太長超出表格範圍的問題
					// 1081217 Raymond FIX XSS & 保留折行
					// 1080321 Raymond 1080224 修正貼式文字意見若折行數超過2行, 在列印貼式文字意見及數位墨水簽核物件頁面會呈現只折成2行的問題
					//"<div style='border:1px solid black; width:100%; " + textStyles + "'>" + so.content.replace("\n", "<br/>") + "</div>").appendTo($container.find(".body"));
					//"<div style='border:1px solid black; width:100%; " + textStyles + "'>" + so.content.replace(/\n/g, "<br/>") + "</div>").appendTo($container.find(".body"));
					//"<div style='border:1px solid black; width:100%; white-space:pre; " + textStyles + "'>" + "</div>").appendTo($container.find(".body"));
					"<div style='border:1px solid black; width:100%; white-space:pre-wrap; " + textStyles + "'>" + "</div>").appendTo($container.find(".body"));
					// 1081217 Raymond FIX XSS
					// 1120210 Raymond 1111035 當流程點的文字意見, 改用原始文字意見顯示, 以免自動折行的寬度太短使表格範圍的右側留太多空白的問題
					if(!!so.srcContent)
						$cmt.eq(1).text(so.srcContent);
					else
					$cmt.eq(1).text(so.content);
					$cmt.eq(1).css("height", "calc(100% - " + $cmt.eq(0).outerHeight(true) + "px)");
					
					_printMarginText($container, fm.getDocNo(), po, po, "textSignObj");
					++po;
					$pages.find(".so-pages").text(po);
				}
				else if(so.type == "sketch" && so.asIcon == true) {
					// 1101110 Raymond 1101199 新增依環境變數設定啟用簽核物件資訊頁的標楷體加套"全字庫正楷體"字型功能
					//var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm;'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'></div></div>").appendTo($pages);	// 使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
					var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm;'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFontForTxObj)?"全字庫正楷體,":"") + "標楷體;'></div></div>").appendTo($pages);	// 使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
					var $cmt = $("<table><tr><td>人　　員：　" + charger.name + "</td><td>員工編號：　" + charger.userId + "</td></tr>" +
					"<tr><td>角　　色：　" + charger.role + "</td><td>職　　稱：　" + charger.title + "</td></tr>" +
					// 1080521 Raymond 1080370 修正貼式數位墨水影像列印時未顯示的問題
					//"<tr><td>時　　間：　" + _getTime(so.cTime) + "</td></tr></table><div style='border:1px solid black; width:100%;'><img src='" + so.content + "'></div>").appendTo($container.find(".body"));
					"<tr><td>時　　間：　" + _getTime(so.cTime) + "</td></tr></table><div style='border:1px solid black; width:100%;'><img src='" + (so.imgData || so.content) + "'></div>").appendTo($container.find(".body"));
					$cmt.eq(1).css("height", "calc(100% - " + $cmt.eq(0).outerHeight(true) + "px)");
					if(!!so.size)
						$cmt.eq(1).find("img").css(so.size);
					
					_printMarginText($container, fm.getDocNo(), po, po, "imageSignObj");
					++po;
					$pages.find(".so-pages").text(po);
				}
			}
		}
	}
	
	// 取得所有受文者, filter可指定key-value形式的過濾條件
	function getAllReceivers(dm, filter) {
		var res = [];
		var rawXml = dm.accquireXml();
		var rcvrList = $(rawXml.documentElement).find("> 受文者列表");
		if(rcvrList.length) {
			var rcvrs = rcvrList.eq(0).find("受文者");
			// 1111208 Raymond 1111334 找出分繕表中的分繕附件資訊改成獨立function, 以供與未傳入filter參數時共用
			function makeDispatchAttachInfo(detail) {
				// 1070521 Raymond 1070183 從分繕表物件找分繕附件
				var mmt = dm.accquireMailMergeTable();
				if(!!mmt) {
					// 1080219 Raymond 1080089 改用find2方法
					//var ri = mmt.find("受文者", detail.name);
					var ri = mmt.find2("受文者", detail);
					if(ri >= 0) {
						var n = mmt.countAtt(ri);
						if(n == null)
							// 1080219 Raymond 1080089 記錄受文者完整資訊
							//theLogger.log("分繕表中找不到受文者'" + detail.name + "'的分繕附件資訊, 應是未設定");
							theLogger.log("分繕表中找不到受文者'" + detail.name + "','" + detail.fullName + "','" + detail.userName + "','" + detail.sn + "'的分繕附件資訊, 應是未設定");
						else {
							detail.dispatchAttachs = [];	// 用額外的dispatchAttach代表有設定過分繕附件, 即使是空array, 也是代表這個受文者完全不要有附件
							var c = dm.getAttachFileCounts();
							for(var j=0; j<n; j++) {
								var att = mmt.getAtt(ri, j);
								for(var x=0; x<c; x++) {
									if(att.guid == dm.getAttachGUID(x)) {
										// 1080219 Raymond 1080089 記錄受文者完整資訊
										//theLogger.log("受文者'" + detail.name + "'應分繕列印附件'" + att.name + "'" + att.guid);
										theLogger.log("受文者'" + detail.name + "','" + detail.fullName + "','" + detail.userName + "','" + detail.sn + "'應分繕列印附件'" + att.name + "'" + att.guid);
										detail.dispatchAttachs.push({attIdx: x, guid: att.guid});
									}
								}
							}
						}
					}
					else
						theLogger.error("分繕表中找不到受文者為'" + detail.name + "'的記錄, 無法取得分繕附件資訊");
				}
			}
			for(var i=0; i<rcvrs.length; i++) {
				if(typeof filter !== "undefined") {	// 要過濾受文者, 須給key-value, value若是字串, 會用等於下去比較, 若給function則會回呼, 回呼回傳true才表示符合條件
					var val = "";
					if(filter.key == "本別") {
						val = rcvrs.eq(i).attr("本別");
					}
					else if(filter.key == "全銜") {
						val = rcvrs.eq(i).find("全銜").text();
					}
					else if(filter.key == "正式名稱") {
						val = rcvrs.eq(i).find("正式名稱").text();
					}
					else if(filter.key == "機關代碼") {
						val = rcvrs.eq(i).find("機關代碼").text();
					}
					else if(filter.key == "單位代碼") {
						val = rcvrs.eq(i).find("單位代碼").text();
					}
					else if(filter.key == "地址") {
						val = rcvrs.eq(i).find("地址").text();
					}
					else if(filter.key == "郵遞區號") {
						val = rcvrs.eq(i).find("郵遞區號").text();
					}
					else if(filter.key == "發文方式") {
						val = rcvrs.eq(i).find("發文方式").text();
					}
					else if(filter.key == "含附件") {
						val = rcvrs.eq(i).find("含附件").text();
					}
					if ((typeof filter.value == "string" && filter.value == val) ||
						($.isFunction(filter.value) && filter.value(val) == true)) {
						var detail = {
							issueType: rcvrs.eq(i).attr("本別"),
							name: rcvrs.eq(i).find("全銜").text(),
							fullName: rcvrs.eq(i).find("正式名稱").text(),
							userName: rcvrs.eq(i).find("姓名").text(),	// 1061116 Raymond (1061146) 新增姓名欄位
							sn: rcvrs.eq(i).attr("編號"),				// 1080219 Raymond (1080089) 新增編號欄位
							orgId: rcvrs.eq(i).find("機關代碼").text(),
							ouId: rcvrs.eq(i).find("單位代碼").text(),
							addr: rcvrs.eq(i).find("地址").text(),
							postCode: rcvrs.eq(i).find("郵遞區號").text(),
							sendWay: rcvrs.eq(i).find("發文方式").text(),
							incAtt: rcvrs.eq(i).find("含附件").text(),
							dlCode: rcvrs.eq(i).attr("識別碼"),		// 1070808 Raymond 1070685 新增識別碼欄位
							headNo: rcvrs.eq(i).find("總行代碼").text(),	// 1091218 Raymond 信保序92 新增總行代碼
							branchNo: rcvrs.eq(i).find("分行代碼").text(),	// 1091218 Raymond 信保序92 新增分行代碼
							index: i								// 1121027 Raymond 1120790 新增受文者序
						}
						// 1111208 Raymond 1111334 改到上面獨立function, 以供與未傳入filter參數時共用
						makeDispatchAttachInfo(detail);
						res.push(detail);
					}
				}
				else {
					var detail = {
						issueType: rcvrs.eq(i).attr("本別"),
						name: rcvrs.eq(i).find("全銜").text(),
						fullName: rcvrs.eq(i).find("正式名稱").text(),
						userName: rcvrs.eq(i).find("姓名").text(),	// 1061116 Raymond (1061146) 新增姓名欄位
						sn: rcvrs.eq(i).attr("編號"),				// 1080219 Raymond (1080089) 新增編號欄位
						orgId: rcvrs.eq(i).find("機關代碼").text(),
						ouId: rcvrs.eq(i).find("單位代碼").text(),
						addr: rcvrs.eq(i).find("地址").text(),
						postCode: rcvrs.eq(i).find("郵遞區號").text(),
						sendWay: rcvrs.eq(i).find("發文方式").text(),
						incAtt: rcvrs.eq(i).find("含附件").text(),
						dlCode: rcvrs.eq(i).attr("識別碼"),		// 1070808 Raymond 1070685 新增識別碼欄位
						headNo: rcvrs.eq(i).find("總行代碼").text(),	// 1091218 Raymond 信保序92 新增總行代碼
						branchNo: rcvrs.eq(i).find("分行代碼").text(),	// 1091218 Raymond 信保序92 新增分行代碼
						index: i								// 1121027 Raymond 1120790 新增受文者序
					}
					// 1111208 Raymond 1111334 未傳入filter參數時也要從分繕變數表中找出所有受文者的分繕附件資訊
					makeDispatchAttachInfo(detail);
					res.push(detail);
				}
			}
		}
		// 1060801 Raymond 1060278 令、公告允許無紙本受文者列印
		if(res.length == 0 && (dm.getDocType() == "令" || dm.getDocType() == "公告")) {
			var detail = {
				issueType: "正本",
				name: "",
				fullName: "",
				orgId: "",
				ouId: "",
				addr: "",
				postCode: "",
				sendWay: "人工傳遞",
				incAtt: "是"
			}
			res.push(detail);
		}
		return res;
	}
	
	// 2016.9.13 新增判斷附件文字是否含下載區資訊
	function containAttDlInfo(dm) {
		if(dlgAttDefStr.length > 0) {	// 環境變數有值才能進行判斷
			try {
				var attTxt = dm.text("//附件列表/文字");
				if(attTxt.length > 0 && attTxt.indexOf(dlgAttDefStr) >= 0)
					return true;
			}
			catch(e) {
				theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
			}
		}
		return false;
	}
	
	// 1100217 Raymond 1090610 合併內政部1071265, 估算應列印的總頁數
	function estimateTotalPages(q) {
		// 1080131 Raymond 序1160 統計指定受文者應列印附件份數, by attIdx
		function calcDispatchAttachCopies(detail, draftIdx, a) {
			if(detail.incAtt == "是") {
				theLogger.log("分繕受文者[" + detail.name + "]:");
				for(var k=0; k<q.length; k++) {
					if(q[k].type == "attach" && q[k].draftIdx == draftIdx) {	// 有勾選的附件才算是要接在分繕受文者後一併列印的附件
						if("dispatchAttachs" in detail) {// 分繕附件列印
							for(var m=0; m<detail.dispatchAttachs.length; m++) {
								if(detail.dispatchAttachs[m].attIdx == q[k].attIdx) {
									if(typeof a[q[k].attIdx] !== "number")
										a[q[k].attIdx] = 1;	// 第attIdx附件一份
									else
										a[q[k].attIdx] ++;	// 第attIdx附件加一份
									theLogger.log("分繕附件[" + q[k].attIdx + "]=" + a[q[k].attIdx]);
									break;
								}
							}
						}
						else {	// 未指定分繕附件時, 列印所有附件
							if(typeof a[q[k].attIdx] !== "number")
								a[q[k].attIdx] = 1;	// 第attIdx附件一份
							else
								a[q[k].attIdx] ++;	// 第attIdx附件加一份
							theLogger.log("含附件[" + q[k].attIdx + "]=" + a[q[k].attIdx]);
						}
					}
				}
			}
		}
		var res = 0, dfds = [], dfd = $.Deferred();
		var dfds2 = [];	// 1110622 Raymond 1110416 新增第2個等待陣列, 若啟用密件浮水印, 需要匯出附件頁面時, 使用此陣列等待下載附件原始檔
		for(var i=0; i<q.length; i++) {
			if(q[i].type == "draft") {
				var rsrcFile = q[i].rsrcFile;
				dfds.push(fm.accquireDraftModel(q[i].draftIdx).done(function(dm) {
					if(rsrcFile.category == "文" && q[i].printMailMerge == true) {
						// 1080131 Raymond 序1160 新增分繕受文者數(份數)於新增的dispatchAttachCopies, 以便預估應列印附件總頁數
						q[i].dispatchAttachCopies = [];	// attIdx - copies的陣列
						if(q[i].printSingleReceiver) {
							if(q[i].specifySingleReceiver == "all") {
								var arr = getAllReceivers(dm,
									{key: "發文方式", value: function(val) {
										// 1100416 Raymond 1090610 修正共通版無內政部的可紙本發文方式變數判定, 因而使用發文用, 受文機關單選全部列印時會發生Error問題
										//return (val == "郵寄" || val == "人工傳遞" || (extraPaperIssueTypeValue.length > 0 && val == extraPaperIssueTypeValue));
										//1110225 David 1101481 考試院客製化人工傳遞處理
										//return (val == "郵寄" || val == "人工傳遞");
										//1141017 Joe	1141126	增加外貿客製化發文方式
										// return (val == "郵寄" || val == "人工傳遞" || val == "機關內函件傳遞" || val == "機關間人工交換");
										return (val == "郵寄" || val == "人工傳遞" || val == "機關內函件傳遞" || val == "機關間人工交換" || val == "公文交換" || val == "傳真");
									}});
								res += arr.length * ((!!dm.draftInfo)?dm.draftInfo.draftPages.pages.length:1);	// 紙本無匯出頁面, 在未實際排版前無法預估頁數
								// 1080131 Raymond 序1160 統計所有分繕受文者的應列印附件份數
								for(var j=0; j<arr.length; j++)
									calcDispatchAttachCopies(arr[j], q[i].draftIdx, q[i].dispatchAttachCopies);
							}
							else {
								res += ((!!dm.draftInfo)?dm.draftInfo.draftPages.pages.length:1);	// 紙本無匯出頁面, 在未實際排版前無法預估頁數
								// 1080131 Raymond 序1160 統計指定單一受文者的應列印附件份數
								calcDispatchAttachCopies(q[i].specifySingleReceiver, q[i].draftIdx, q[i].dispatchAttachCopies);
							}
						}
						else {
							res += q[i].specifyMultiReceiver.length * ((!!dm.draftInfo)?dm.draftInfo.draftPages.pages.length:1);	// 紙本無匯出頁面, 在未實際排版前無法預估頁數
							// 1080131 Raymond 序1160 統計指定複數受文者的應列印附件份數
							for(var j=0; j<q[i].specifyMultiReceiver.length; j++)
								calcDispatchAttachCopies(q[i].specifyMultiReceiver[j], q[i].draftIdx, q[i].dispatchAttachCopies);
						}
					}
					else {	// 稿或簽核用
						res += ((!!dm.draftInfo)?dm.draftInfo.draftPages.pages.length:1);	// 紙本無匯出頁面, 在未實際排版前無法預估頁數
					}
				}));
			}
			else if(q[i].type == "attach") {
				// 1080131 Raymond 序1160 判斷是否為分繕列印, 若是則以分繕列印方式計算附件頁數
				//res += fm.getAttPageCounts(q[i].draftIdx, q[i].attIdx);
				var attPgs = fm.getAttPageCounts(q[i].draftIdx, q[i].attIdx);
				// 1110622 Raymond 1110416 啟用列印密件浮水印時, 若無匯出的附件頁面, 要先轉出附件頁面
				if(attPgs > 0) {
					var attTtlPgs = attPgs;	// 指定分繕列印單一受文者或繕校用或列印稿或未勾選本文只勾選附件, 只需列印一份附件
					for(var j=0; j<q.length; j++) {
						if(q[j].type == "draft" && q[j].draftIdx == q[i].draftIdx) {
							if("dispatchAttachCopies" in q[j]) {	// 指定了分繕列印
								if(typeof q[j].dispatchAttachCopies[q[i].attIdx] === "number")	// 應列印本附件的份數
									attTtlPgs = q[j].dispatchAttachCopies[q[i].attIdx] * attPgs;
							}
							break;
						}
					}
					res += attTtlPgs;
				}
				// 1110622 Raymond 1110416 啟用列印密件浮水印時, 若無匯出的附件頁面, 要先轉出附件頁面
				else if(enableSpecialWaterMark && "draftInfo" in q[i] && q[i].draftInfo.sec.match(/密/g)) {
					theLogger.warn("啟用密件浮水印功能, 列印附件須先匯出頁面影像...");
					SSOUtil.loading("show", {text: "產生附件影像...", textVisible:true});
					var draftPath = fm.getDraftDirPath(q[i].draftIdx);
					var attName = fm.getDraftAttName(q[i].draftIdx, q[i].attIdx);
					var attFileName = fm.getDraftAttFileName(q[i].draftIdx, q[i].attIdx);
					if(!q[i].origFileName.match(/^blob:/)){	//非本次加入之新增附件，需先下載再執行匯出
						theLogger.warn("判斷附件(draftIdx:" + q[i].draftIdx + ", attIdx:" + q[i].attIdx + ")非本Session加入之附件'" + q[i].origFileName + "', 須先下載附件原始檔");
						var wfio = new WebFileIO(fm.getDocObj().fileIOWS);
						dfds2.push(wfio.download(draftPath, q[i].origFileName, {
							keepRawData: true,	// 保持原始資料格式(Typed Array)
							async: false,		// 用同步避免下載順序不一致
							success: function(fil, all) {
								var blb = new Blob([fil],{type: "application/octet-binary"});
								var blbNm = URL.createObjectURL(blb);
								q[i].origFileName = blbNm;
								var att = {name: attName},
									attach = {origFileName: blbNm, fileName: attFileName, isBW: bBW};
								if("rndrPages" in q[i])
									q[i].rndrPages.length = 0;	// 第2次列印時重置匯出頁面陣列
								_rndrAtt.addAtt(att, attach, q[i]);	// 加入應匯出頁面的附件清單, 第3參數draftPath改成q[i]物件, 以便在resolve回傳後直接操作
							},
							error: function(errorText) {
								alert(errorText);
							}
						}));
					}
					else{
						theLogger.warn("判斷附件(draftIdx:" + q[i].draftIdx + ", attIdx:" + q[i].attIdx + ")為本Session加入之新附件'" + q[i].origFileName + "', 不須下載");
						var att = {name: attName},
							attach = {origFileName: q[i].origFileName, fileName: attFileName, isBW: bBW};
						if("rndrPages" in q[i])
							q[i].rndrPages.length = 0;	// 第2次列印時重置匯出頁面陣列
						_rndrAtt.addAtt(att, attach, q[i]);	// 加入應匯出頁面的附件清單, 第3參數draftPath改成q[i]物件, 以便在resolve回傳後直接操作
						var $dfd2 = $.Deferred();
						$dfd2.resolve();
						dfds2.push($dfd2.promise());	// 必須加一個deferred到dfds2陣列中, 不然下面不會走到_rndrAtt.start2
					}
				}
			}
			else if(q[i].type == "fromdoc") {
				res += fm.getDraftPageCounts(q[i].draftIdx);
			}
			else if(q[i].type == "mailmerge") {
				//res += 1;	// 分繕表無法預估頁數
			}
		}
		// 1110622 Raymond 1110416 啟用列印密件浮水印時, 若無匯出的附件頁面, 要先轉出附件頁面
		if(dfds2.length) {
			$.when.apply(this, dfds2).always(function() {
				_rndrAtt.start2(function(att, allparts, tSpan) {
					theLogger.log("startRndrAtt2 success!(" + tSpan + "s) ", att);
					theLogger.log(allparts);
					if("FileList" in allparts) {	// 2016.9.13 修改成不直接下載影像資料, 而是檔名清單
						if("string" in allparts.FileList) {
							if(SSOUtil.typeOf(allparts.FileList.string) == "array") {
								for(var i=0; i<allparts.FileList.string.length; i++) {
									console.log(allparts.FileList.string[i]);
									if(!!att.draftPath && typeof att.draftPath === "object") {	// 借用addAtt時加入的draftPath, 存放q[i]物件
										if(!att.draftPath.rndrPages)
											att.draftPath.rndrPages = [];
										att.draftPath.rndrPages.push(allparts.FileList.string[i]);	// 轉出後的暫存影像路徑記錄於q[i]物件
									}
									else
										theLogger.warn("未傳入draftPath物件(q[i]), 無法記錄轉出的暫存影像檔路徑");
								}
								res += allparts.FileList.string.length;
							}
							else if(SSOUtil.typeOf(allparts.FileList.string) == "string") {	// 只有1個檔案
								console.log(allparts.FileList.string);
								if(!!att.draftPath && typeof att.draftPath === "object") {	// 借用addAtt時加入的draftPath, 存放q[i]物件
									if(!att.draftPath.rndrPages)
										att.draftPath.rndrPages = [];
									att.draftPath.rndrPages.push(allparts.FileList.string);	// 轉出後的暫存影像路徑記錄於q[i]物件
								}
								else
									theLogger.warn("未傳入draftPath物件(q[i]), 無法記錄轉出的暫存影像檔路徑");
								res ++;
							}
						}
					}
					else {
						for(p in allparts) {	// 2016.8.22 for IE-compatible, "item"在IE只會是function
							if(!p.match(/^uuid/)) {
								console.log(allparts[p]);
								res ++;
							}
						}
					}
				})
				.done(function() {
					SSOUtil.loading("hide");	// 1110722 Raymond 1110416 轉檔完成後關閉載入中訊息
					if(dfds.length) {
						$.when.apply(this, dfds).always(function() {
							dfd.resolve(res);
						});
					}
					else
						dfd.resolve(res);
				})
				.fail(function(errText) {
					SSOUtil.loading("hide");	// 1110722 Raymond 1110416 轉檔失敗也要關閉載入中訊息
					theLogger.error("轉換附件匯出頁面時發生錯誤!" + errText);
					dfd.reject("轉換附件匯出頁面時發生錯誤!\n" + errText);
				});
			});
		}
		else
		if(dfds.length) {
			$.when.apply(this, dfds).always(function() {
				dfd.resolve(res);
			});
		}
		else
			dfd.resolve(res);
		return dfd.promise();
	}
	
	Util.getDlg("RD-PrintFolio.html").done(function($dlg) {
		$dlg.find("header > h1").unwrap();
		$dlg.find("footer > div").unwrap();        
		$dlg.find("#ok").on('click', function() {
			// TODO: 列印
			// 1060626 Raymond 新增z-index:-1;position:absolute;以避免在準備預覽頁面資料時顯示在主頁面
			//var $pages = $("<div class='pages'></div>").appendTo("body");	// 2016.9.8 FIX, 未appendTo目前DOM的元素, 計算寬高會有問題
			var $pages = $("<div class='pages' style='z-index:-1;position:absolute;'></div>").appendTo("body");	// 2016.9.8 FIX, 未appendTo目前DOM的元素, 計算寬高會有問題
			var q = [], cursor = 0;
			$.each($dlg.find("ul#itemList").find("li"), function(i, li) {
				var $chk = $(li).find("input[type='checkbox']");
				if($chk.length && $chk.prop("checked")) {
					// 1070212 Raymond NCKU107217 清除附件已列印旗標, 避免第2次按確定鈕時因為記憶到前次分繕已印出附件頁面而不會印出
					if("printedDuringMailMerge" in $(li).data("info"))
						delete $(li).data("info").printedDuringMailMerge;
					q.push($(li).data("info"));
				}
			});
			// 1100217 Raymond 1090610 合併內政部1071265, 列印中發生錯誤則關閉進度視窗
			function onErr(errorText) {
				alert(errorText);
				progbar.close();
			}
			
			//1100723	Leslie[1100879]	修改紀錄「雙面列印」與顯示邏輯
			//bBothSide = !q.every(function(item){return item.BothSide == false;})	//檢查是否所有待列印的，都「未」勾選雙面(BothSide都是false)			
			bBothSide = q.some(function(item){return item.BothSide == true;})	//1100809	因為可能會有屬性值為undefine的問題，改為正向判斷，任何一個有勾選雙面(BothSide=true)，即為true
			
			//1090313	Leslie[1090036]	新增設定列印頁面Title文字功能，以提供Chrome可另存指定檔名，紀錄實際列印的文別類型
			var arCate = [];
			var category = "";
			var printSOPages = $dlg.find("#chkPrintSignObjPages").prop("checked");	// 2017.3.10 新增是否列印簽核資訊頁選項
			var filterNUK = $dlg.find("#filterNUK").prop("checked");	// 1100712 Raymond 1100649 新增是否僅顯示會辦單位長官意見
			// 1141014 Raymond 1141129 新增列印簽核物件資訊頁(內部意見)
			if($dlg.find("#filterTAITRA").is(":visible")) {
				var filterTAITRA = $dlg.find("#filterTAITRA").prop("checked");
				if(!printSOPages && filterTAITRA)
					printSOPages = true;
			}
			function doSingle() {
				if(cursor < q.length) {
					var item = q[cursor++];
					if(item.type == "draft") {			// 本文
						var rsrcFile = item.rsrcFile;
						category = rsrcFile.category;
						//1090313	Leslie[1090036]	新增設定列印頁面Title文字功能，以提供Chrome可另存指定檔名
						let currType = (rsrcFile.subDocType == "")?rsrcFile.docType:rsrcFile.subDocType;
						if(arCate.indexOf(currType) == -1)
							arCate.push(currType);
						//1060612	Leslie[1060211]	新增紀錄使用者列印選項
						userPrintSet[item.SettingKey] = item.printXslName;	//紀錄列印格式
						var saveSetting = {};
						for(var iKey = 0;iKey < recordAtt.length;iKey++){
							if(defaultSet[item.SettingKey][recordAtt[iKey]] != item[recordAtt[iKey]])
								saveSetting[recordAtt[iKey]] = item[recordAtt[iKey]];
						}
						//1100723	Leslie[1100879]	修改紀錄「雙面列印」與顯示邏輯
						//saveSetting["BothSide"] = bBothSide;
						userPrintSet[item.printXslName] = saveSetting;				//紀錄列印格式的內容
						//1060612	Leslie[1060211]	新增紀錄使用者列印選項	--END--
						
						printDraftPages(item.draftIdx, rsrcFile, item, $pages, q, printSOPages, filterNUK, filterTAITRA)	// 2016.11.1 新增參數q, 2017.3.10 新增參數printSOPages, 1100712 Raymond 1100649 新增參數filterNUK, 1141014 Raymond 1141129 新增filterTAITRA
							.done(doSingle)
							//.fail(function(errorText) {alert(errorText);});
							.fail(onErr);	// 1100217 Raymond 1090610 合併內政部1071265, 改用onErr, 顯示錯誤訊息並關閉進度子視窗
					}
					else if(item.type == "attach") {	// 附件
						if("printedDuringMailMerge" in item && item.printedDuringMailMerge == true)	// 2016.11.1 若標記分繕列印已印出附件則不要重複再印附件
							doSingle();
						else {	// 1110929 Raymond 陸委會序302 修正只勾選附件列印時, 若所屬文稿勾選發文用, 應套用密件浮水印條件下, 即使不列印本文, 也要分繕列印附件
							let draftInfo = undefined;
							$dlg.find("ul#itemList").find("li").each(function(i, li) {
								draftInfo = $(li).data("info");
								if(draftInfo.type == "draft" && draftInfo.draftIdx == item.draftIdx)
									return false;
							});
							// 1111014 Raymond 陸委會序325 修正只勾選附件列印時, 若所屬文稿將格式從"文"類型切回"稿"類型, 仍會分繕列印出不同受文者的附件浮水印的問題
							//if(!!draftInfo && draftInfo.printMailMerge == true && enableSpecialWaterMark && draftInfo.sec.match(/密/g)) {
							if(!!draftInfo && !!draftInfo.rsrcFile && draftInfo.rsrcFile.category == "文" && draftInfo.printMailMerge == true && enableSpecialWaterMark && draftInfo.sec.match(/密/g)) {
								function _doPrintReceiverAttPages(arr) {
									var q2 = [], cursor2 = 0;
									for(var i=0; i<arr.length; i++) {
										var rcvr = arr[i];
										if(rcvr.incAtt == "是") {
											// 1111208 Raymond 1111334 修正列印密件浮水印啟用時, 文稿選「發文用」但不勾文稿, 只勾附件時, 分繕列印的附件會以一一一二二二三三三的順序, 而非比照一代的一二三一二三一二三的順序列印的問題
											// 1070521 Raymond 1070183 新增支援分繕附件列印
											/*if("dispatchAttachs" in rcvr) {
												for(var j=0; j<rcvr.dispatchAttachs.length; j++) {
													if(rcvr.dispatchAttachs[j].attIdx == item.attIdx) {
														theLogger.log("分繕列印'" + rcvr.name + "'指定分繕附件[" + item.attIdx + "]");
														q2.push(rcvr);
														break;
													}
												}
											}
											else {	// 未指定分繕附件時, 列印所有附件
												theLogger.log("分繕列印'" + rcvr.name + "'含附件[" + item.attIdx + "]");
												q2.push(rcvr);
											}*/
											theLogger.log("分繕列印'" + rcvr.name + "'含附件");
											q2.push(rcvr);
										}
									}
									function doSingleAtt() {
										if(cursor2 < q2.length) {
											var rcvr2 = q2[cursor2++];
											rcvr2.sec = draftInfo.sec;			// 受文者物件寫入所屬文稿的密等
											rcvr2.decCond = draftInfo.decCond;	// 受文者物件寫入所屬文稿的解密條件
											if(!!draftInfo.rsrcFile)
												rcvr2.printFormat = draftInfo.rsrcFile.category;	// 標記這是發用文, 套用密件浮水印時應顯示受文者正式名稱
											// 1111013 Raymond 陸委會序333 受文者物件寫入所屬文稿的發文字號支號
											rcvr2.subno = draftInfo.subno;
											// 1111208 Raymond 1111334 修正列印密件浮水印啟用時, 文稿選「發文用」但不勾文稿, 只勾附件時, 分繕列印的附件會以一一一二二二三三三的順序, 而非比照一代的一二三一二三一二三的順序列印的問題
											// 1100217 Raymond 1090610 合併內政部1071265, 新增傳入本文detail物件, 供列印附件頁面時判斷是隨本文一併列印的
											//printAttachPages(item.draftIdx, item.attIdx, item, $pages)
											//printAttachPages(item.draftIdx, item.attIdx, item, $pages, rcvr2)
											//	.done(doSingleAtt)
											//	.fail(onErr);
											let currAttIdx = item.attIdx;
											function doNextAtt() {
												let nxtAttItem = undefined;
												$dlg.find("ul#itemList").find("li").each(function(i, li) {
													var $chk = $(li).find("input[type='checkbox']");
													if($chk.length && $chk.prop("checked")) {
														let nfo = $(li).data("info");
														if(nfo.type == "attach" && nfo.draftIdx == item.draftIdx && nfo.attIdx > currAttIdx) {
															nfo.printedDuringMailMerge = true;	// 設定下個附件已隨分繕發文列印, 才不會在處理勾選的下個附件時又重複列印下個附件
															if("dispatchAttachs" in rcvr2) {	// 受文者有設定分繕附件時, 檢核包含下個附件才列印
																for(var j=0; j<rcvr2.dispatchAttachs.length; j++) {
																	if(rcvr2.dispatchAttachs[j].attIdx == nfo.attIdx) {
																		theLogger.log("分繕列印'" + rcvr2.name + "'指定分繕附件[" + nfo.attIdx + "]");
																		nxtAttItem = nfo;
																		currAttIdx = nfo.attIdx;
																		return false;	// 中止$.each迴圈
																	}
																}
															}
															else {	// 受文者未指定分繕附件時, 列印下個附件
																nxtAttItem = nfo;
																currAttIdx = nfo.attIdx;
																return false;	// 中止$.each迴圈
															}
														}
													}
												});
												if(!!nxtAttItem)
													printAttachPages(item.draftIdx, nxtAttItem.attIdx, nxtAttItem, $pages, rcvr2)
														.done(doNextAtt)
														.fail(onErr);
												else
													doSingleAtt();
											}
											printAttachPages(item.draftIdx, item.attIdx, item, $pages, rcvr2)
												.done(doNextAtt)
												.fail(onErr);
										}
										else
											doSingle();
									}
									if(q2.length > 0)
										doSingleAtt();
									else
										doSingle();
								}
								if(draftInfo.printSingleReceiver) {	// 單選受文者
									if(draftInfo.specifySingleReceiver == "all") {	// 全部受文者
										fm.accquireDraftModel(draftInfo.draftIdx).done(function(dm) {
											var arr = getAllReceivers(dm,
												{key: "發文方式", value: function(val) {
													//1110225 David 1101481 考試院客製化人工傳遞處理
													//return (val == "郵寄" || val == "人工傳遞");
													//1141017 Joe	1141126	增加外貿客製化發文方式
													// return (val == "郵寄" || val == "人工傳遞" || val == "機關內函件傳遞" || val == "機關間人工交換");
													return (val == "郵寄" || val == "人工傳遞" || val == "機關內函件傳遞" || val == "機關間人工交換" || val == "公文交換" || val == "傳真");
												}});
											_doPrintReceiverAttPages(arr);
										})
										.fail(onErr);
									}
									else {	// 指定受文者
										_doPrintReceiverAttPages([draftInfo.specifySingleReceiver]);
									}
								}
								else {	// 複選受文者
									if(draftInfo.specifyMultiReceiver.length > 0) {
										_doPrintReceiverAttPages(draftInfo.specifyMultiReceiver);
									}
									else {
										theLogger.log("未選取任何複選受文者");
										onErr("未選取任何複選受文者");
									}
								}
							}
							else
							// 1110616 Raymond 1110416 新增傳入附件的所屬文稿的參數物件
							//printAttachPages(item.draftIdx, item.attIdx, item, $pages)
							printAttachPages(item.draftIdx, item.attIdx, item, $pages, item.draftInfo)
								.done(doSingle)
								//.fail(function(errorText) {alert(errorText);});
								.fail(onErr);	// 1100217 Raymond 1090610 合併內政部1071265, 改用onErr, 顯示錯誤訊息並關閉進度子視窗
						}
					}
					else if(item.type == "fromdoc") {	// 來文
						// 1150309 Raymond 1150145 新增參數printSOPages4FromDoc及filterTAITRA4FromDoc, 來文列印完後是否接著列印簽核物件資訊頁及列印簽核物件資訊頁(內部意見)
						//printFromDocPages(item.draftIdx, item, $pages)
						var printSOPages4FromDoc = $dlg.find("#chkPrintSignObjPages4FromDoc").prop("checked");
						if($dlg.find("#filterTAITRA4FromDoc").is(":visible")) {
							var filterTAITRA4FromDoc = $dlg.find("#filterTAITRA4FromDoc").prop("checked");
							if(!printSOPages4FromDoc && filterTAITRA4FromDoc)
								printSOPages4FromDoc = true;
						}
						printFromDocPages(item.draftIdx, item, $pages, printSOPages4FromDoc, filterTAITRA4FromDoc)
							.done(doSingle)
							//.fail(function(errorText) {alert(errorText);});
							.fail(onErr);	// 1100217 Raymond 1090610 合併內政部1071265, 改用onErr, 顯示錯誤訊息並關閉進度子視窗
					}
					else if(item.type == "mailmerge") {	// 分繕表
						printMailMergeTablePages(item.draftIdx, item, $pages)
							.done(doSingle)
							//.fail(function(errorText) {alert(errorText);});
							.fail(onErr);	// 1100217 Raymond 1090610 合併內政部1071265, 改用onErr, 顯示錯誤訊息並關閉進度子視窗
					}
					else if(item.type == "smegdraft") {	// 1090915 Raymond 1090564 信保基金特殊模式文稿比照來文頁面影像列印
						printFromDocPages(item.draftIdx, item, $pages)
							.done(doSingle)
							//.fail(function(errorText) {alert(errorText);});
							.fail(onErr);	// 1100217 Raymond 1090610 合併內政部1071265, 改用onErr, 顯示錯誤訊息並關閉進度子視窗
					}
				}
				else {
					if(fm.getSignType() == "E" && category == "稿") {	// 紙本簽核及文類型不需要印邊界文字
						// 最後套印頁次文字
						var m = $pages.find(".pg").length;
						for(var i=0; i<m; i++) {
							_printMarginText($pages.find(".pg").eq(i), undefined, i+1, m, "pn");
						}
					}
					
					// 2019.10.17 - 1080905 Eric, iPadOS 13
					// [NOTE] iPad列印? 先跳過不修!
					if(pm == 0) {	// 2016.12.8 fix for 0邊界的機關
						if(navigator.userAgent.indexOf("Trident") > 0 ||	// for IE與眾不同的品味
							navigator.userAgent.indexOf("Mac OS X") > 0) {	// 1061023 Raymond fix for MacOSX Safari
							$pages.find(".pg").css("height", "294mm");
							$pages.find(".pg > div").filter(function(idx, div) {
								if($(div).attr("name") == "topRegion") {
									var h = div.style.height;
									var nh = parseInt(h) - 1;
									$(div).css("height", nh + "mm");
								}
								if($(div).attr("name") == "bottomRegion") {
									var h = div.style.height;
									var nh = parseInt(h) - 2;
									$(div).css({"margin-top": "-1mm", "height": nh + "mm"});
								}
							});
							var $nf = $pages.find(".pg:not(:first)");
							$nf.find("> div").filter(function(idx, div) {
								if($(div).hasClass("appendex1"))
									$(div).css("margin-top", "3.1mm");
								if($(div).hasClass("appendex2"))
									$(div).css("margin-top", "3.1mm");
							});
						}
					}
					// 1060918 Raymond 1060653/1060679 修正Chrome下列印預覽各頁間會黏在一起(page-break-before無效)導致約第5頁以後的本文分類號等行出現在前一頁的問題
					$pages.css("position", "");
					
					//1060612	Leslie[1060211]	新增紀錄使用者列印選項，回寫環境變數(只會紀錄最後一個印出的稿件)
					strUserPrintSet = JSON.stringify(userPrintSet);
					theSSO.User.EnvSettings["USER_PRINT_SETTING"] = strUserPrintSet;
					// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式不要呼叫UpdateUserEnvSet
					if(!theSSO || theSSO.offlineMode != true)
					theWebServices.QueryDoc.UpdateUserEnvSet(theSSO.Artifact,"USER_PRINT_SETTING",strUserPrintSet,false);
					
					//1090313	Leslie[1090036]	新增設定列印頁面Title文字功能，以提供Chrome可另存指定檔名
					var printTitle = [];
					printTitle.push((fm.getSignType()=='E'?"線上":"紙本"));
					if(fm.getDocNo() != "")
						printTitle.push(fm.getDocNo());
					printTitle.push(arCate.join('、'));
					window.tmpTitle = printTitle.join('_');
					// 1120417 Raymond 考試院序17 因列印分頁改為內嵌的IFrame, 瀏覽器預覽列印的"另存PDF"預設檔名變成主頁的分頁視窗標題, 列印前將分頁視窗標題改為預設另存檔名
					document.title = window.tmpTitle;
					
					theLogger.warn("本文及附件已等待完成");
					//2017.01.24	Leslie	修改IE載入IMG問題
					var jobId = SSOUtil.getCurrentTimeStr_YYYMMDDhhmm(true);
					// 1120607 Raymond 1120515 列印分頁網址改為相對路徑, 以供掛舊的不同版本的站台測試時, 列印分頁不會跑去用最新版的列印分頁
					//var printUrl = SSO_CONFIG.ServerHost + '/MS/RD-AOLPrint.html?JobId='+jobId;
					var printUrl = 'RD-AOLPrint.html?JobId='+jobId;
					// 1120106 Raymond 1111361 修改成以一個背景的IFrame內嵌列印分頁的方式執行列印
					if(window.dbgPrint)	// 1120607 Raymond 1120515 新增用舊的列印分頁模式顯示控制方式, 用於偵錯
						var newWin = window.open(printUrl,'_blank');
					else {
						var newWin;
						for(ifrm of document.body.getElementsByTagName("iframe")) {	// 1120417 Raymond for...in 修正為 for...of, for...in取到的是索引值, for...of才是取到element
							if(ifrm.id == "embedAOLPrintContainer") {
								newWin = ifrm;
								break;
							}
						}
					}
					if(!newWin) {
						newWin = document.createElement("iframe");	// 用IFRAME內嵌輸出頁面
						newWin.id = "embedAOLPrintContainer";
						// 1130722 Raymond 1130400 修正先列印過一次公文(包括線上轉紙本、參照窗格公文的列印), 再傳送時輸入PIN CODE畫面左半邊會出現前次列印時的文稿內容及簽核物件的問題
						//newWin.style = "position:absolute; left:0px; top:0px; width:600px; height: 1024px; z-index:-100";
						newWin.style = "position:absolute; left:-610px; top:0px; width:600px; height: 1024px; z-index:-100";
						document.body.appendChild(newWin);
					}
					newWin.src = printUrl;
					var _html = "";
					$pages.each(function(){_html+=this.outerHTML});
					window.tmpHtml = _html;
					localStorage[jobId] = "Ready";
					// 1100217 Raymond 1090610 合併內政部1071265, 關閉進度視窗
					progbar.close();
					
					// 1110722 Raymond 1110416 若啟用密件浮水印則清除工作站上暫存影像檔的子目錄
					function onPrintFinish() {
						if(localStorage[jobId] == "Finish"){
							window.clearInterval(_getFinish);
							// 1130812 Raymond 1130313 離線模式下無法使用轉檔工作站, 不提供密件浮水印啟用時, 能匯出附件頁面再套印浮水印功能
							//if(enableSpecialWaterMark && !!_rndrAtt) {
							if(enableSpecialWaterMark && !!_rndrAtt && (!theSSO || theSSO.offlineMode != true)) {
								theLogger.log("產生最後一批列印分頁且影像檔已下載完成後, 清除工作站上暫存影像檔的子目錄");
								_rndrAtt.clearProcData();
							}
							// 1121222 Raymond 領務局需求序36 若環境變數「WE_PRINT_FINISH_CLOSE_SETTING_WINDOW」設為"Y", 則在列印(及分批列印)完畢時關閉列印設定子視窗
							if(theSSO.User.EnvSettings.get("WE_PRINT_FINISH_CLOSE_SETTING_WINDOW") == "Y")
								$.modal.close();
						}
					}
					var _getFinish = setInterval(onPrintFinish, 500);
					/*
					var newWin = window.open();
					newWin.document.write('<!DOCTYPE html><html><head><meta http-equiv="cache-control" content="max-age=0" />\
						<meta http-equiv="cache-control" content="no-cache" />\
						<meta http-equiv="expires" content="0" />\
						<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />\
						<meta http-equiv="pragma" content="no-cache" />\
						<meta http-equiv="Content-Type" content="text/html; charset=utf8" />\
						<title>PRINT</title><link rel="stylesheet" href="CSS/PrintChrome.css?ver=5.0.87"/></head><body style="margin:0mm ' + ((pm < 0)?3:0) + 'mm">');	// 2016.12.1 新增使用IE列印時邊界反推, 2016.12.27 fix for 第1頁會徧下問題
					for(var i=0; i<$pages.length; i++)
						newWin.document.write($pages.get(i).outerHTML);
					newWin.document.write("</body></html>");
					newWin.document.close();
					newWin.focus();
					*/
					$pages.remove();	// 2016.9.8 FIX, 移除暫時appendTo目前DOM的元素
					
					// 1090227 Raymond 1080751 合併內政部1070381回報列印記錄
					nsEditor.ReportPrintLog(fm);
				}
			}
			// 1100217 Raymond 1090610 合併內政部1071265, 估算應列印的總頁數並顯示進度子視窗
			function doConfirmBatchPrint() {
				estimateTotalPages(q).done(function(ttPgs) {
					var batchPrintCriteria = parseInt(localStorage['batchPrintCriteria'] || "100");	// 預設限制頁數為100
					var enableBatchPrint = localStorage['enableBatchPrint'] == "true";				// 預設不要勾選分批列印
					progbar.init(ttPgs,
						batchPrintCriteria,
						enableBatchPrint,// (ttPgs > batchPrintCriteria),	// 總頁數超過限制頁數就預設勾選批次列印
						function() {	// 批次列印暫停callback
							if(fm.getSignType() == "E" && category == "稿") {	// 紙本簽核及文類型不需要印邊界文字
								// 最後套印頁次文字
								var m = $pages.find(".pg").length;
								for(var i=0; i<m; i++) {
									_printMarginText($pages.find(".pg").eq(i), undefined, i+1, m, "pn");
								}
							}
							
							if(pm == 0) {	// 2016.12.8 fix for 0邊界的機關
								if(navigator.userAgent.indexOf("Trident") > 0 ||	// for IE與眾不同的品味
									navigator.userAgent.indexOf("Mac OS X") > 0) {	// 1061023 Raymond fix for MacOSX Safari
									$pages.find(".pg").css("height", "294mm");
									$pages.find(".pg > div").filter(function(idx, div) {
										if($(div).attr("name") == "topRegion") {
											var h = div.style.height;
											var nh = parseInt(h) - 1;
											$(div).css("height", nh + "mm");
										}
										if($(div).attr("name") == "bottomRegion") {
											var h = div.style.height;
											var nh = parseInt(h) - 2;
											$(div).css({"margin-top": "-1mm", "height": nh + "mm"});
										}
									});
									var $nf = $pages.find(".pg:not(:first)");
									$nf.find("> div").filter(function(idx, div) {
										if($(div).hasClass("appendex1"))
											$(div).css("margin-top", "3.1mm");
										if($(div).hasClass("appendex2"))
											$(div).css("margin-top", "3.1mm");
									});
								}
							}
							// 1060918 Raymond 1060653/1060679 修正Chrome下列印預覽各頁間會黏在一起(page-break-before無效)導致約第5頁以後的本文分類號等行出現在前一頁的問題
							$pages.css("position", "");
							
							var jobId = SSOUtil.getCurrentTimeStr_YYYMMDDhhmm(true);
							// 1120607 Raymond 1120515 列印分頁網址改為相對路徑, 以供掛舊的不同版本的站台測試時, 列印分頁不會跑去用最新版的列印分頁
							//var printUrl = SSO_CONFIG.ServerHost + '/MS/RD-AOLPrint.html?JobId='+jobId;
							var printUrl = 'RD-AOLPrint.html?JobId='+jobId;
							// 1120106 Raymond 1111361 修改成以一個背景的IFrame內嵌列印分頁的方式執行列印
							if(window.dbgPrint)	// 1120607 Raymond 1120515 新增用舊的列印分頁模式顯示控制方式, 用於偵錯
								var newWin = window.open(printUrl,'_blank');
							else {
								var newWin;
								for(ifrm of document.body.getElementsByTagName("iframe")) {	// 1120417 Raymond for...in 修正為 for...of, for...in取到的是索引值, for...of才是取到element
									if(ifrm.id == "embedAOLPrintContainer") {
										newWin = ifrm;
										break;
									}
								}
							}
							if(!newWin) {
								newWin = document.createElement("iframe");	// 用IFRAME內嵌輸出頁面
								newWin.id = "embedAOLPrintContainer";
								newWin.style = "position:absolute; left:0px; top:0px; width:600px; height: 1024px; z-index:-100";
								document.body.appendChild(newWin);
							}
							newWin.src = printUrl;
							var _html = "";
							$pages.each(function(){_html+=this.outerHTML});
							$pages.html("");	// 1080117 Raymond 1071265 清空已列印完畢的頁次
							window.tmpHtml = _html;
							localStorage[jobId] = "Ready";
						});
					if(ttPgs > batchPrintCriteria)	// 總頁數超過限制頁數就暫停
						progbar.pause("預估列印總頁數" + ttPgs + "，超過批次頁數設定，建議分批列印，以避免等候過久及電腦資源不足問題。").done(doSingle).fail(function(errorText) {alert(errorText);});
					else
						doSingle();
				});
			}
			
			// 1070605 Raymond 1070077 修正支援檢核發文日期是否為當日及發文號應與公文文號一致功能
			var checkIssueDateNo = theSSO.User.EnvSettings.get("WE_CHECK_ISSUE_DATE_NO");
			if(checkIssueDateNo.length)
				checkIssueDateNo = parseInt(checkIssueDateNo);
			//1060628	Leslie[1060502]	修正一代暨有功能，列印發文用的「文」時，檢核發文字號、日期是否不為空
			var checkCursor = 0;
			var hasNoDate = false,hasNoWord = false;
			var arWormList = [];
			function CheckIssueDate(){
				if(checkCursor < q.length) {
					var item = q[checkCursor++];
					var rsrcFile = item.rsrcFile;
					if(item.type == "draft") {			// 本文
						// 1070605 Raymond 1070077 修正支援檢核發文日期是否為當日及發文號應與公文文號一致功能
						//if(rsrcFile.category == "文" && item.printMailMerge == true){	//發文用的「文」
						if(rsrcFile.category == "文" && (item.printMailMerge == true || checkIssueDateNo > 0)) {	//發文用的「文」或應檢核發文日期為當日, 發文號與文號一致
							fm.accquireDraftModel(item.draftIdx)
								.done(function(dm) {
									if(dm) {
										// 1070605 Raymond 1070077 檢核發文日期是否為當日及發文號應與公文文號一致功能優先
										if(checkIssueDateNo > 0) {
											var msg = "";
											try {
												if(dm.getNodeCounts("/*/發文日期/年月日")) {
													var issueDate = dm.text("/*/發文日期/年月日");
													var today = theWebServices.getServerTime();
													var todayS = (parseInt(today.substr(0, 4)) - 1911) + "年" + parseInt(today.substr(4, 2)) + "月" + parseInt(today.substr(6, 2)) + "日";
													if(issueDate.indexOf(todayS) < 0)
														msg = "「" + dm.getDraftName() + "」之發文日期非今天日期";
												}
											}
											catch(e) {
												theLogger.log(e.message);
											}
											try {
												if(dm.getNodeCounts("/*/發文字號")) {
													var issueNo = dm.text("/*/發文字號/文號/年度") + dm.text("/*/發文字號/文號/流水號");
													var docNo = dm.text("/*/公文文號");
													if(issueNo != docNo) {
														if(msg.length)
															msg += "且發文號與公文文號不一致";
														else
															msg = "「" + dm.getDraftName() + "」之發文號與公文文號不一致";
													}
												}
											}
											catch(e) {
												theLogger.log(e.message);
											}
											if(msg.length)
												arWormList.push(msg);
										}
										else {
											var needAlert = false;
											var xml = dm.accquireXml();
											var $issueDate = $(xml.documentElement).find('發文日期');
											var $issueWord = $(xml.documentElement).find('發文字號');
											if($issueDate.length > 0 && ($issueDate.text().trim() == "" || $issueDate.text().trim() == "請選擇陳核日期")){
												hasNoDate = true;
												needAlert = true;
											}
											if($issueWord.length > 0 && $issueWord.find('文號').text().trim() == ""){
												hasNoWord = true;
												needAlert = true;
											}
											if(needAlert)
												arWormList.push(dm.getDraftName());
										}
									}
									CheckIssueDate();
								})
								.fail(function(errorText) {
									theLogger.error(errorText);
									alert(errorText);
								});
						}
						else
							CheckIssueDate();
					}
					else
						CheckIssueDate();
				}
				else{	//結束後，檢查是否顯示提示訊息，並決定是否列印
					if(arWormList.length > 0){
						// 1070605 Raymond 1070077 檢核發文日期是否為當日及發文號應與公文文號一致功能優先
						if(checkIssueDateNo > 0) {
							if(checkIssueDateNo == 1)	// 發文日期非當日或發文號與公文文號不一致時禁止列印
								alert(arWormList.join("\n") + "\n\n請修正後再列印。");
							else if(checkIssueDateNo == 2) {	// 發文日期非當日或發文號與公文文號不一致時提示警告但仍可列印
								if(confirm(arWormList.join("\n") + "\n\n是否繼續列印？")) {
									// 1100217 Raymond 1090610 合併內政部1071265, 因共通版未比照內政部版區分簽核用、發文用兩個選單功能, 故直接改叫確認分批列印
									//doSingle();	// 使用者選是, 繼續列印
									doConfirmBatchPrint();
								}
							}
						}
						else {
							var msg = ((hasNoDate)?"發文日期":"")+((hasNoWord)?((hasNoDate)?"及字號均":"發文字號"):"")+"未設定，請問仍繼續列印嗎?";
							if(window.confirm("["+arWormList.join()+"]"+msg)){
								// 1100217 Raymond 1090610 合併內政部1071265, 因共通版未比照內政部版區分簽核用、發文用兩個選單功能, 故直接改叫確認分批列印
								//doSingle();	//使用堅持要列印
								doConfirmBatchPrint();
							}
						}
					}
					else {
						// 1100217 Raymond 1090610 合併內政部1071265, 因共通版未比照內政部版區分簽核用、發文用兩個選單功能, 故直接改叫確認分批列印
						//doSingle();	//檢核通過，執行列印
						doConfirmBatchPrint();
					}
				}
			}
			//1060628	Leslie[1060502]	修正一代暨有功能，列印發文用的「文」時，檢核發文字號、日期是否不為空	--END--
			
			if(q.length > 0){
				//1060628	Leslie[1060502]	修正一代暨有功能，列印發文用的「文」時，檢核發文字號、日期是否不為空
				//doSingle();
				CheckIssueDate();
			}
			else {
				$pages.remove();	// 2016.9.8 FIX, 移除暫時appendTo目前DOM的元素
				alert("未勾選任何可列印項目");
			}
			
			/*setTimeout(function() {
				newWin.print();
				newWin.close();
			}, 1000);*/
			
			//$.modal.close();
		});
		$dlg.find("#cancel").on('click', function() {
			$.modal.close();
		});
		
		// 1091214 Raymond 1090921 套用相同文別的選項設定
		function doSyncOpt(optName, optValue) {
			$dlg.find("ul#itemList").children("li").each(function(idx, li) {
				var nfo = $(li).data("info");
				if(!!nfo && nfo.type == "draft" && nfo !== currItem && nfo.SettingKey == currItem.SettingKey) {	// 列舉所有文稿類型的與目前項目同文別的其它清單項目
					// 1100315 Raymond 1090991 檢核若套用相同文別的列印格式, 則判斷指定的「稿」類別的列印格式要不要套用
					if((optName == "rsrcFile" || optName == "printXslName") && currItem.rsrcFile.category == "稿") {
						if(nfo.rsrcFile.category == "稿") {
							theLogger.log("維持此文稿已套用的「稿」類別的列印格式'" + nfo.printXslName + "', 不要套用當前文稿所選的'" + currItem.rsrcFile.name + "'");
						}
						else {	// 此文稿已套用的是「文」類別的列印格式, 改成「稿」類別的, 要檢核是否與origPrintXslName相同
							if(!!nfo.origPrintXslName && nfo.origPrintXslName != currItem.rsrcFile.name) {	// origPrintXslName是原始文稿在產生頁面前就套用的格式, 也就是「稿」類別排版設定檔, 若是一代紙本簽核公文可能沒有記錄
								theLogger.log("此文稿原來的「稿」類別的列印格式名稱'" + nfo.origPrintXslName + "'與指定的列印格式名稱'" + currItem.rsrcFile.name + "'不一致, 搜尋原來的「稿」類別的列印格式");
								thePublicRsrc.enumDirs("排版設定", function(dir) {
									for(var j=0; j<dir.children.length; j++) {
										var nm = dir.children[j].name;
										if(nm == nfo.origPrintXslName) {
											if(optName == "rsrcFile") {
												console.log("printXslName:'" + nfo.printXslName + "'->'" + dir.children[j].name + "'");
												nfo.printXslName = dir.children[j].name;	// printXslName一起套用
												console.log("rsrcFile:'" + nfo.rsrcFile.remote.path + "'->'" + dir.children[j].remote.path + "'");
												nfo[optName] = dir.children[j];
											}
											else {	// 切換格式時先套用rsrcFile, 因上述邏輯會改變rsrcFile為原來的「稿」格式, 再套用printXslName時會因已套用的格式為「稿」而不繼續搜尋, 所以理論上不會走到這段邏輯
												nfo[optName] = dir.children[j].name;
												theLogger.error("printXslName:'" + nfo.printXslName + "'->'" + dir.children[j].name + "'");
											}
											break;
										}
									}
								});
							}
							else
								nfo[optName] = optValue;
						}
					}
					else
					nfo[optName] = optValue;
				}
			});
		}
		// 列印格式
		$dlg.find("#printXsl").on('change', function() {
			var rsrcFile = $(this.options[this.selectedIndex]).data("rsrcFile");
			// 1121222 Raymond 領務局序344 修正切換列印格式時, 列印選項未恢復為該列印格式上次記憶的選取/勾選項目的問題
			//檢核此列印格式的前次列印設定值是否存在
			if(!!userPrintSet[rsrcFile.name]){
				var printTypeSetting = userPrintSet[rsrcFile.name];
				//載入此列印格式的前次列印設定
				for(var iKey = 0;iKey < recordAtt.length;iKey++){
					if(printTypeSetting[recordAtt[iKey]] != undefined) {
						if(recordAtt[iKey] == "printXslName")	// 列印格式名稱不用重設
							continue;
						theLogger.log("從前次記憶的列印選項設定恢復'" + recordAtt[iKey] + "':" + currItem[recordAtt[iKey]] + "->" + printTypeSetting[recordAtt[iKey]]);
						currItem[recordAtt[iKey]] = printTypeSetting[recordAtt[iKey]];
					}
					else if(defaultSet[currItem.SettingKey][recordAtt[iKey]] != undefined) {	// 未記憶的選項恢復為預設值, 以避免預設勾選條碼、頁碼, 但A格式取消勾選並記憶, 可正確恢復, 但B格式未取消勾選未記憶(與預設值相同就不記憶), 不會恢復預設的勾選狀態
						theLogger.log("前次記憶未包含列印選項設定'" + recordAtt[iKey] + "', 改恢復為預設值:" + currItem[recordAtt[iKey]] + "->" + defaultSet[currItem.SettingKey][recordAtt[iKey]]);
						currItem[recordAtt[iKey]] = defaultSet[currItem.SettingKey][recordAtt[iKey]];
					}
				}
			}
			else
				theLogger.log("列印格式'" + rsrcFile.name + "'無前次記憶的列印選項設定");
			// 1120606 Raymond 1120515 新增判斷若為禁止套用騎縫章, 則取消預設勾選騎縫章選項
			if(!allowUseSealMark) {
				currItem.printSealMark = false;
				currItem.printSealMarkAtSamePos = false;
			}
			// 1060706 Raymond 1060539 新增偵測樣版是否支援會辦單位分繕列印選項
			detectDispConOpt(rsrcFile, currItem);
			// update ui
			if(rsrcFile && rsrcFile.category == "文") {
				$dlg.find("#applyTCMode").closest(".ui-field-contain").hide();
				$dlg.find("#chkPrintSignObjPages").closest(".ui-field-contain").hide();	// 2017.3.10 新增列印簽核資訊頁選項
				$dlg.find("#filterNUK").closest(".ui-field-contain").hide();	// 1100712 Raymond 1100649 新增僅顯示會辦單位長官意見選項
				$dlg.find("#showAllComments").closest(".ui-field-contain").hide();	// 1111026 Raymond 1110864 合併1101468, 新增僅顯示完整意見選項
				$dlg.find("#filterTAITRA").closest(".ui-field-contain").hide();	// 1141014 Raymond 1141129 新增列印簽核物件資訊頁(內部意見)選項
				$dlg.find("#printPurpose").closest(".ui-field-contain").show();
				if(currItem.printMailMerge == true)
					$dlg.find("#printForDispatch").trigger('click');
				else
					$dlg.find("#printForCheck").trigger('click');
				
				// 1060706 Raymond 1060539 樣版若支援會辦單位分繕則顯示核取方塊選項
				if(currItem.dispatchConUnitsAvail)
					$dlg.find("#dispatchConUnits").prop("checked", currItem.dispatchConUnits == true).checkboxradio("refresh").closest(".ui-field-contain").css("margin-right", "0px").show();
				else
					$dlg.find("#dispatchConUnits").closest(".ui-field-contain").hide();
			}
			else {
				$dlg.find("#applyTCMode").closest(".ui-field-contain").show();
				if(fm.getSignType() == "E") {	// 2017.3.10 線上簽核才顯示
					$dlg.find("#chkPrintSignObjPages").closest(".ui-field-contain").show();	// 2017.3.10 新增列印簽核資訊頁選項
					// 1100712 Raymond 1100649 新增僅顯示會辦單位長官意見選項[高大客製化選項]
					if(theUserInfo.OrgNickName == "NUK")
						$dlg.find("#filterNUK").closest(".ui-field-contain").show();
					else
						$dlg.find("#filterNUK").closest(".ui-field-contain").hide();
					if(theSSO.User.EnvSettings.get("AOL_SHOW_MY_FINAL_COMMENT") == "Y")	// 1111027 Raymond 1110864 合併1101468, 新增僅顯示完整意見選項, 當啟用「顯示我的最終意見」功能時顯示選項, 否則隱藏
						$dlg.find("#showAllComments").closest(".ui-field-contain").show();
					else
						$dlg.find("#showAllComments").closest(".ui-field-contain").hide();
					// 1150309 Raymond 1150145 修正OrgNickName改用SSO_CONFIG的判斷
					// 1141014 Raymond 1141129 新增列印簽核物件資訊頁(內部意見)選項[外貿客製化選項]
					//if(theUserInfo.OrgNickName == "TAITRA")
					if(SSO_CONFIG.OrgNickName == "TAITRA")
						$dlg.find("#filterTAITRA").closest(".ui-field-contain").show();
					else
						$dlg.find("#filterTAITRA").closest(".ui-field-contain").hide();
				}
				else {	// 1100712 Raymond 1100649 修正紙本不顯示列印簽核資訊頁選項
					$dlg.find("#chkPrintSignObjPages").closest(".ui-field-contain").hide();
					$dlg.find("#filterNUK").closest(".ui-field-contain").hide();	// 1100712 Raymond 1100649 新增僅顯示會辦單位長官意見選項
					$dlg.find("#showAllComments").closest(".ui-field-contain").hide();	// 1111026 Raymond 1110864 合併1101468, 新增僅顯示完整意見選項
					$dlg.find("#filterTAITRA").closest(".ui-field-contain").hide();	// 1141014 Raymond 1141129 新增列印簽核物件資訊頁(內部意見)選項
				}
				$dlg.find("#printPurpose").closest(".ui-field-contain").hide();
				$dlg.find("#receivers").closest(".ui-field-contain").hide();
				$dlg.find("#keepSecret").closest(".ui-field-contain").hide();
				$dlg.find("#keepSecret2").closest(".ui-field-contain").hide();
				
				// 1060706 Raymond 1060539 樣版若支援會辦單位分繕則顯示核取方塊選項
				if(currItem.dispatchConUnitsAvail)
					$dlg.find("#dispatchConUnits").prop("checked", currItem.dispatchConUnits == true).checkboxradio("refresh").closest(".ui-field-contain").css("margin-right", "8%").show();
				else
					$dlg.find("#dispatchConUnits").closest(".ui-field-contain").hide();
			}
			
			currItem.rsrcFile = rsrcFile;
			currItem.printXslName = rsrcFile.name;
			// 1091214 Raymond 1090921 套用相同文別的選項設定
			if($dlg.find("#chkSyncOpts").prop("checked")) {
				doSyncOpt("rsrcFile", currItem.rsrcFile);
				doSyncOpt("printXslName", currItem.printXslName);
			}
			// 1121222 Raymond 領務局序344 更新列印選項的選取/勾選狀態
			if(!!currItem.printFont)
				$dlg.find("#printFont").val(currItem.printFont).selectmenu("refresh");
			if(!!currItem.printLineHeight)
				$dlg.find("#printLineHeight").val(currItem.printLineHeight).selectmenu("refresh");
			if(typeof currItem.applyCustom != "undefined")
				$dlg.find("#applyCustom").prop("checked", currItem.applyCustom == true).checkboxradio("refresh");
			if(typeof currItem.applyTCMode != "undefined")
				$dlg.find("#applyTCMode").val(currItem.applyTCMode).selectmenu("refresh");
			if(currItem.printRange == "-1" || currItem.printRange == undefined) {
				$dlg.find("#printRangeAll").prop("checked", true).checkboxradio("refresh");
				$dlg.find("#printRangeSelect").prop("checked", false).checkboxradio("refresh");
			}
			else {
				$dlg.find("#printRangeAll").prop("checked", false).checkboxradio("refresh");
				$dlg.find("#printRangeSelect").prop("checked", true).checkboxradio("refresh");
				$dlg.find("#printRangeSelection").val(currItem.printRange);
			}
			if(currItem.printMailMerge == true) {
				$dlg.find("#printForDispatch").prop("checked", true).checkboxradio("refresh");
				$dlg.find("#printForCheck").prop("checked", false).checkboxradio("refresh");
			}
			else {	// 未設定printMailMerge時, 預設是繕校用
				$dlg.find("#printForDispatch").prop("checked", false).checkboxradio("refresh");
				$dlg.find("#printForCheck").prop("checked", true).checkboxradio("refresh");
			}
			if(currItem.printSingleReceiver == false) {
				$dlg.find("#receiverSingle").prop("checked", false).checkboxradio("refresh");
				$dlg.find("#receiverMulti").prop("checked", true).checkboxradio("refresh");
			}
			else {	// 未設定printSingleReceiver時, 預設是單選
				$dlg.find("#receiverSingle").prop("checked", true).checkboxradio("refresh");
				$dlg.find("#receiverMulti").prop("checked", false).checkboxradio("refresh");
			}
			if(!!currItem.specifySingleReceiver)
				$dlg.find("#receiverSelect").val(currItem.specifySingleReceiver);
			
			if(typeof currItem.keepSecret != "undefined")
				$dlg.find("#keepSecret").prop("checked", currItem.keepSecret == true).checkboxradio("refresh");
			if(typeof currItem.keepSecret2 != "undefined")
				$dlg.find("#keepSecret2").prop("checked", currItem.keepSecret2 == true).checkboxradio("refresh");
			// 1090206 Raymond 1070503 合併一代共通版也提供的CDC需求(1000194)的'正副本取代模式'功能
			if(currItem.specialMode == true) {
				$dlg.find("#keepSecret").closest(".ui-checkbox").addClass("ui-disabled");
				$dlg.find("#keepSecret2").closest(".ui-checkbox").addClass("ui-disabled");
			}
			else {
				$dlg.find("#keepSecret").closest(".ui-checkbox").removeClass("ui-disabled");
				$dlg.find("#keepSecret2").closest(".ui-checkbox").removeClass("ui-disabled");
			}
			if(typeof currItem.printSealMark != "undefined")
				$dlg.find("#sealMark").prop("checked", currItem.printSealMark == true).checkboxradio("refresh");
			if(typeof currItem.printSealMarkAtSamePos != "undefined")
				$dlg.find("#sealMarkSamePos").prop("checked", currItem.printSealMarkAtSamePos == true).checkboxradio("refresh");
			// 1120606 Raymond 1120515 新增判斷若為禁止套用騎縫章, 則反灰騎縫章核取方塊
			if(!allowUseSealMark) {
				$dlg.find("#sealMark").closest(".ui-checkbox").addClass("ui-disabled");
				$dlg.find("#sealMarkSamePos").closest(".ui-checkbox").addClass("ui-disabled");
			}
			if(typeof currItem.printBarcode != "undefined")
				$dlg.find("#barcode").prop("checked", currItem.printBarcode == true).checkboxradio("refresh");
			if(typeof currItem.printPageNo != "undefined")
				$dlg.find("#pgNo").prop("checked", currItem.printPageNo == true).checkboxradio("refresh");
			if(typeof currItem.printDraftFileName != "undefined")
				$dlg.find("#draftFileName").prop("checked", currItem.printDraftFileName == true).checkboxradio("refresh");
			if(typeof currItem.dispatchConUnits != "undefined")
				$dlg.find("#dispatchConUnits").prop("checked", currItem.dispatchConUnits == true).checkboxradio("refresh");
			if(typeof currItem.BothSide != "undefined")
				$dlg.find("#bothSide").prop("checked", currItem.BothSide == true).checkboxradio("refresh");
		});
		// 列印字型
		$dlg.find("#printFont").on('change', function() {
			currItem.printFont = $(this).val();
			// 1091214 Raymond 1090921 套用相同文別的選項設定
			if($dlg.find("#chkSyncOpts").prop("checked"))
				doSyncOpt("printFont", currItem.printFont);
		});
		// 列印行高
		$dlg.find("#printLineHeight").on('change', function() {
			currItem.printLineHeight = $(this).val();
			// 1091214 Raymond 1090921 套用相同文別的選項設定
			if($dlg.find("#chkSyncOpts").prop("checked"))
				doSyncOpt("printLineHeight", currItem.printLineHeight);
		});
		// 套用自訂
		$dlg.find("#applyCustom").on('click', function() {
			currItem.applyCustom = $(this).prop("checked");
			// 1091214 Raymond 1090921 套用相同文別的選項設定
			if($dlg.find("#chkSyncOpts").prop("checked"))
				doSyncOpt("applyCustom", currItem.applyCustom);
		});
		// 檢視模式
		$dlg.find("#applyTCMode").on('change', function() {
			currItem.applyTCMode = $(this).val();
			// 1091214 Raymond 1090921 套用相同文別的選項設定
			if($dlg.find("#chkSyncOpts").prop("checked"))
				doSyncOpt("applyTCMode", currItem.applyTCMode);
		});
		// 列印範圍
		$dlg.find("#printRangeAll, #printRangeSelect").on('click', function() {
			if($dlg.find("#printRangeAll").prop("checked")) {	// 全部
				currItem.printRange = "-1";
			}
			else {	// 指定頁次
				currItem.printRange = $dlg.find("#printRangeSelection").val();
			}
		});
		// 1060918 Raymond 1060738 列印範圍選擇
		$dlg.find("#printRangeSelection").on('change', function() {
			if($dlg.find("#printRangeSelect").prop("checked")) {	// 選擇
				currItem.printRange = $dlg.find("#printRangeSelection").val();
			}
		});
		// 列印用途
		$dlg.find("#printForCheck, #printForDispatch").on('click', function() {
			if($dlg.find("#printForCheck").prop("checked")) {
				$dlg.find("#receivers").closest(".ui-field-contain").hide();
				$dlg.find("#keepSecret").closest(".ui-field-contain").hide();
				$dlg.find("#keepSecret2").closest(".ui-field-contain").hide();
				currItem.printMailMerge = false;
			}
			else {
				$dlg.find("#receivers").closest(".ui-field-contain").show();
				$dlg.find("#keepSecret").closest(".ui-field-contain").show();
				$dlg.find("#keepSecret2").closest(".ui-field-contain").show();
				currItem.printMailMerge = true;
			}
		});
		// 單選/複選受文者
		$dlg.find("#receiverSingle, #receiverMulti").on('click', function() {
			if($dlg.find("#receiverSingle").prop("checked"))
				currItem.printSingleReceiver = true;
			else
				currItem.printSingleReceiver = false;
		});
		// 單選受文者
		$dlg.find("#receiverSelect").on('change', function() {
			if(this.selectedIndex == 0)
				currItem.specifySingleReceiver = $(this).val();
			else if(this.selectedIndex > 0)
				currItem.specifySingleReceiver = $(this.options[this.selectedIndex]).data("detail");
			else
				theLogger.error("單選取受文者項目不應小於0");
		});
		// 複選受文者
		$dlg.find("#receiverPickup").on('click', function() {
			
			$dlg.find(".ui-slide-pane-left").removeClass("ui-slide-pane-active");
			$dlg.find(".ui-slide-pane-right").addClass("ui-slide-pane-active");
			$dlg.find("#ok").addClass("ui-disabled");
		});
		$dlg.find("#btnBack").on('click', function() {
			$dlg.find(".ui-slide-pane-right").removeClass("ui-slide-pane-active");
			$dlg.find(".ui-slide-pane-left").addClass("ui-slide-pane-active");
			$dlg.find("#ok").removeClass("ui-disabled");
		});
		
		// 正本行文單位保密
		$dlg.find("#keepSecret").on('click', function() {
			currItem.keepSecret = $(this).prop("checked");
			// 1060809 Raymond 寫回行文單位保密設定值到文稿
			fm.accquireDraftModel(currItem.draftIdx)
				.done(function(dm) {
					if(!!dm) {
						//dm.accquireXml().documentElement.setAttribute("行文單位保密", (currItem.keepSecret?"True":"False"));
						dm.attr("/*/@行文單位保密", (currItem.keepSecret?"True":"False"));
					}
					else {	// 來文
						
					}
				})
				.fail(function(errorText) {
					theLogger.error(errorText);
					alert(errorText);
				});
		});
		// 副本行文單位保密
		$dlg.find("#keepSecret2").on('click', function() {
			currItem.keepSecret2 = $(this).prop("checked");
			// 1060809 Raymond 寫回副本行文單位保密設定值到文稿
			fm.accquireDraftModel(currItem.draftIdx)
				.done(function(dm) {
					if(!!dm) {
						//dm.accquireXml().documentElement.setAttribute("副本行文單位保密", (currItem.keepSecret2?"True":"False"));
						dm.attr("/*/@副本行文單位保密", (currItem.keepSecret2?"True":"False"));
					}
					else {	// 來文
						
					}
				})
				.fail(function(errorText) {
					theLogger.error(errorText);
					alert(errorText);
				});
		});
		// 列印騎縫章
		$dlg.find("#sealMark").on('click', function() {
			currItem.printSealMark = $(this).prop("checked");
			// 1091214 Raymond 1090921 套用相同文別的選項設定
			if($dlg.find("#chkSyncOpts").prop("checked"))
				doSyncOpt("printSealMark", currItem.printSealMark);
		});
		// 列印騎縫章在相同位置
		$dlg.find("#sealMarkSamePos").on('click', function() {
			currItem.printSealMarkAtSamePos = $(this).prop("checked");
			// 1091214 Raymond 1090921 套用相同文別的選項設定
			if($dlg.find("#chkSyncOpts").prop("checked"))
				doSyncOpt("printSealMarkAtSamePos", currItem.printSealMarkAtSamePos);
		});
		// 列印條碼
		$dlg.find("#barcode").on('click', function() {
			currItem.printBarcode = $(this).prop("checked");
			// 1091214 Raymond 1090921 套用相同文別的選項設定
			if($dlg.find("#chkSyncOpts").prop("checked"))
				doSyncOpt("printBarcode", currItem.printBarcode);
		});
		// 列印頁碼
		$dlg.find("#pgNo").on('click', function() {
			currItem.printPageNo = $(this).prop("checked");
			// 1091214 Raymond 1090921 套用相同文別的選項設定
			if($dlg.find("#chkSyncOpts").prop("checked"))
				doSyncOpt("printPageNo", currItem.printPageNo);
		});
		// 列印本文檔名
		$dlg.find("#draftFileName").on('click', function() {
			currItem.printDraftFileName = $(this).prop("checked");
			// 1091214 Raymond 1090921 套用相同文別的選項設定
			if($dlg.find("#chkSyncOpts").prop("checked"))
				doSyncOpt("printDraftFileName", currItem.printDraftFileName);
		});
		// 會辦單位分繕列印
		$dlg.find("#dispatchConUnits").on('click', function() {
			currItem.dispatchConUnits = $(this).prop("checked");
		});
		//2017.2.23	Leslie	新增雙面列印
		$dlg.find("#bothSide").on('click', function() {
			//1100723	Leslie[1100879]	修改紀錄「雙面列印」與顯示邏輯
			//bBothSide = $(this).prop("checked");
			currItem.BothSide = $(this).prop("checked");
		});
		// 1110623 Raymond 1110416 合併一代1030961, 新增紙本附件可選擇匯出頁面的色彩模式
		$dlg.find("#asColor, #asMono").on('click', function() {
			if(this.id == "asColor")
				bBW = !$(this).prop("checked");
			else
				bBW = $(this).prop("checked");
		});
		
		// 複選面板的僅顯示紙本受文者
		$dlg.find("#onlyPaper").on('click', function() {
			fm.accquireDraftModel(currItem.draftIdx)
				.done(function(dm) {
					if(dm) {
						updateReceiverList2(dm, $dlg.find(".ui-slide-pane-right table").find("tbody"), $dlg.find("#onlyPaper").prop("checked"));
					}
					else {	// 來文
						
					}
				})
				.fail(function(errorText) {
					theLogger.error(errorText);
					alert(errorText);
				});
		});
		
		// 複選面板的全選
		$dlg.find("#selectAll").on('click', function() {
			if($(this).prop("checked")) {
				$dlg.find(".ui-slide-pane-right table").find("input[type='checkbox']").prop("checked", false).trigger('click');
			}
			else {
				$dlg.find(".ui-slide-pane-right table").find("input[type='checkbox']").prop("checked", true).trigger('click');
			}
		});
		
		// 1091214 Raymond 1090921 套用相同文別的選項設定
		$dlg.find("#chkSyncOpts").on('click', function() {
			if($(this).prop("checked")) {
				var _firstSettingKey = {};
				_firstSettingKey[currItem.SettingKey] = currItem;	// 記憶第一個不同文別的設定值
				$dlg.find("ul#itemList").children("li").each(function(idx, li) {
					var nfo = $(li).data("info");
					if(!!nfo && nfo.type == "draft" && nfo !== currItem) {	// 列舉所有文稿類型的非目前項目的清單項目
						if(nfo.SettingKey in _firstSettingKey) {	// 若為第二個以後出現的相同文別文稿, 則複製第一個相同文別文稿的設定值
							var copyFrom = _firstSettingKey[nfo.SettingKey];
							theLogger.log("複製相同文別的第" + copyFrom.draftIdx + "筆文稿列印選項設定值至第" + nfo.draftIdx + "筆文稿...");
							// 1100315 Raymond 1090991 檢核若套用相同文別的列印格式, 則判斷指定的「稿」類別的列印格式要不要套用
							if(copyFrom.rsrcFile.category == "稿") {
								if(nfo.rsrcFile.category == "稿") {
									console.log("維持此文稿已套用的「稿」類別的列印格式'" + nfo.printXslName + "', 不要套用當前文稿所選的'" + copyFrom.rsrcFile.name + "'");
								}
								else {	// 此文稿已套用的是「文」類別的列印格式, 改成「稿」類別的, 要檢核是否與origPrintXslName相同
									if(!!nfo.origPrintXslName && nfo.origPrintXslName != copyFrom.rsrcFile.name) {
										console.log("此文稿原來的「稿」類別的列印格式名稱'" + nfo.origPrintXslName + "'與指定的列印格式名稱'" + copyFrom.rsrcFile.name + "'不一致, 搜尋原來的「稿」類別的列印格式");
										thePublicRsrc.enumDirs("排版設定", function(dir) {
											for(var j=0; j<dir.children.length; j++) {
												var nm = dir.children[j].name;
												if(nm == nfo.origPrintXslName) {
													console.log("printXslName:'" + nfo.printXslName + "'->'" + dir.children[j].name + "'");
													nfo.printXslName = dir.children[j].name;
													console.log("rsrcFile:'" + nfo.rsrcFile.remote.path + "'->'" + dir.children[j].remote.path + "'");
													nfo.rsrcFile = dir.children[j];
													break;
												}
											}
										});
									}
									else
										nfo[optName] = optValue;
								}
							}
							else {
							console.log("printXslName:'" + nfo.printXslName + "'->'" + copyFrom.printXslName + "'");
							nfo.printXslName = copyFrom.printXslName;						// 套用樣版名
							console.log("rsrcFile:'" + nfo.rsrcFile.remote.path + "'->'" + copyFrom.rsrcFile.remote.path + "'");
							nfo.rsrcFile = copyFrom.rsrcFile;								// 套用樣版檔
							}
							nfo.printFont = copyFrom.printFont;								// 預設字型
							nfo.printLineHeight = copyFrom.printLineHeight;					// 預設行高
							nfo.applyCustom = copyFrom.applyCustom;							// 套用自訂
							nfo.applyTCMode = copyFrom.applyTCMode;							// 檢視模式
							//nfo.printRange = copyFrom.printRange;							// 列印範圍
							//nfo.printMailMerge = copyFrom.printMailMerge;					// 列印用途
							//nfo.printSingleReceiver = copyFrom.printSingleReceiver;		// 單選/複選受文者
							//nfo.specifySingleReceiver = copyFrom.specifySingleReceiver;	// 單選受文者
							//nfo.specifyMultiReceiver = copyFrom.specifyMultiReceiver;		// 複選受文者
							//nfo.keepSecret = copyFrom.keepSecret;							// 正本行文單位保密
							//nfo.keepSecret2 = copyFrom.keepSecret2;						// 副本行文單位保密
							nfo.printSealMark = copyFrom.printSealMark;						// 列印騎縫章
							nfo.printSealMarkAtSamePos = copyFrom.printSealMarkAtSamePos;	// 列印騎縫章在相同位置
							nfo.printBarcode = copyFrom.printBarcode;						// 列印條碼
							nfo.printPageNo = copyFrom.printPageNo;							// 列印頁碼
							nfo.printDraftFileName = copyFrom.printDraftFileName;			// 列印本文檔名
							//nfo.dispatchConUnits = copyFrom.dispatchConUnits;				// 會辦單位分繕列印
							//nfo.specialMode = copyFrom.specialMode;						// 正副本取代模式
						}
						else	// 第一個不同文別文稿, 則記憶此筆文稿的設定值
							_firstSettingKey[nfo.SettingKey] = nfo;
					}
				});
			}
		});
		
		// 1111026 Raymond 1110864 合併1101468, 新增顯示完整意見選項設定
		$dlg.find("#showAllComments").on('click', function() {
			if($(this).prop("checked"))
				$dlg.find("#filterNUK").prop("checked", false).checkboxradio("refresh").closest(".ui-checkbox").addClass("ui-disabled");
			else
				$dlg.find("#filterNUK").closest(".ui-checkbox").removeClass("ui-disabled");
			
			if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {	// 啟用分文稿記錄簽核意見功能時, 顯示完整意見選項記錄在選項物件
				currItem.showAllComments = $(this).prop("checked");
				if(currItem.showAllComments == true)	// 「顯示完整意見」與「僅顯示會辦單位長官意見」互斥, 「顯示完整意見」優先
					currItem.filterNUK = false;
			}
			else {	// 未啟用分文稿記錄簽核意見功能時, 顯示完整意見選項記錄在全域變數
				bShowAllComments = $(this).prop("checked");
				if(bShowAllComments == true)	// 「顯示完整意見」與「僅顯示會辦單位長官意見」互斥, 「顯示完整意見」優先
					bFilterNUK = false;
			}
		});
		// 1111026 Raymond 1110864 合併1101468, 新增僅顯示會辦單位長官意見選項設定, 視啟用分文稿記錄簽核意見功能與否動作
		$dlg.find("#filterNUK").on('click', function() {
			if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y")	// 啟用分文稿記錄簽核意見功能時, 僅顯示會辦單位長官意見選項記錄在選項物件
				currItem.filterNUK = $(this).prop("checked");
			else	// 未啟用分文稿記錄簽核意見功能時, 僅顯示會辦單位長官意見選項記錄在全域變數
				bFilterNUK = $(this).prop("checked");
		});
		// 1141014 Raymond 1141129 新增列印簽核物件資訊頁(內部意見)選項設定
		if(SSO_CONFIG.OrgNickName == "TAITRA") {
			$dlg.find("#filterTAITRA").on('click', function() {
				if($(this).prop("checked"))
					$dlg.find("#chkPrintSignObjPages").prop("checked", false).checkboxradio("refresh");
				
				if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y")	// 啟用分文稿記錄簽核意見功能時, 列印簽核物件資訊頁(內部意見)選項記錄在選項物件
					currItem.filterTAITRA = $(this).prop("checked");
				else	// 未啟用分文稿記錄簽核意見功能時, 列印簽核物件資訊頁(內部意見)選項記錄在全域變數
					bFilterTAITRA = $(this).prop("checked");
			});
			$dlg.find("#chkPrintSignObjPages").on('click', function() {
				if($(this).prop("checked")) {
					$dlg.find("#filterTAITRA").prop("checked", false).checkboxradio("refresh");
					
					if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y")	// 啟用分文稿記錄簽核意見功能時, 列印簽核物件資訊頁(內部意見)選項記錄在選項物件
						currItem.filterTAITRA = false;
					else	// 未啟用分文稿記錄簽核意見功能時, 列印簽核物件資訊頁(內部意見)選項記錄在全域變數
						bFilterTAITRA = false;
				}
			});
			// 1150309 Raymond 1150145 新增來文面板的「列印簽核物件資訊頁」、「列印簽核物件資訊頁(內部意見)」切換邏輯
			$dlg.find("#filterTAITRA4FromDoc").on('click', function() {
				if($(this).prop("checked"))
					$dlg.find("#chkPrintSignObjPages4FromDoc").prop("checked", false).checkboxradio("refresh");
				
				//if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y")	// 啟用分文稿記錄簽核意見功能時, 列印簽核物件資訊頁(內部意見)選項記錄在選項物件
				//	currItem.filterTAITRA = $(this).prop("checked");
				//else	// 未啟用分文稿記錄簽核意見功能時, 列印簽核物件資訊頁(內部意見)選項記錄在全域變數
				//	bFilterTAITRA = $(this).prop("checked");
			});
			$dlg.find("#chkPrintSignObjPages4FromDoc").on('click', function() {
				if($(this).prop("checked")) {
					$dlg.find("#filterTAITRA4FromDoc").prop("checked", false).checkboxradio("refresh");
					
					//if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y")	// 啟用分文稿記錄簽核意見功能時, 列印簽核物件資訊頁(內部意見)選項記錄在選項物件
					//	currItem.filterTAITRA = false;
					//else	// 未啟用分文稿記錄簽核意見功能時, 列印簽核物件資訊頁(內部意見)選項記錄在全域變數
					//	bFilterTAITRA = false;
				}
			});
		}
		
		// 切換文稿/附件面版
		function onChangeItemPane() {
			if(currItem.type == "draft") {
				$dlg.find(".ui-slide-pane-left .ui-field-contain").show();
				//$dlg.find("#printXsl").trigger('change');
				$dlg.find("#printFont").val(currItem.printFont).selectmenu("refresh");	//1060612	Leslie[1060211]	補上更新選項
				$dlg.find("#printLineHeight").val(currItem.printLineHeight).selectmenu("refresh");	//1060612	Leslie[1060211]	補上更新選項
				$dlg.find("#applyCustom").prop("checked", currItem.applyCustom == true).checkboxradio("refresh");
				$dlg.find("#applyTCMode").val(currItem.applyTCMode).selectmenu("refresh");	//1060612	Leslie[1060211]	補上更新選項
				if(currItem.printRange == "-1" || currItem.printRange == undefined) {
					$dlg.find("#printRangeAll").prop("checked", true).checkboxradio("refresh");
					$dlg.find("#printRangeSelect").prop("checked", false).checkboxradio("refresh");
				}
				else {
					$dlg.find("#printRangeAll").prop("checked", false).checkboxradio("refresh");
					$dlg.find("#printRangeSelect").prop("checked", true).checkboxradio("refresh");
					$dlg.find("#printRangeSelection").val(currItem.printRange);
				}
				if(currItem.printMailMerge == true) {
					$dlg.find("#printForDispatch").prop("checked", true).checkboxradio("refresh");
					$dlg.find("#printForCheck").prop("checked", false).checkboxradio("refresh");
				}
				else {	// 未設定printMailMerge時, 預設是繕校用
					$dlg.find("#printForDispatch").prop("checked", false).checkboxradio("refresh");
					$dlg.find("#printForCheck").prop("checked", true).checkboxradio("refresh");
				}
				if(currItem.printSingleReceiver == false) {
					$dlg.find("#receiverSingle").prop("checked", false).checkboxradio("refresh");
					$dlg.find("#receiverMulti").prop("checked", true).checkboxradio("refresh");
				}
				else {	// 未設定printSingleReceiver時, 預設是單選
					$dlg.find("#receiverSingle").prop("checked", true).checkboxradio("refresh");
					$dlg.find("#receiverMulti").prop("checked", false).checkboxradio("refresh");
				}
				$dlg.find("#receiverSelect").val(currItem.specifySingleReceiver);
				
				$dlg.find("#keepSecret").prop("checked", currItem.keepSecret == true).checkboxradio("refresh");
				$dlg.find("#keepSecret2").prop("checked", currItem.keepSecret2 == true).checkboxradio("refresh");
				// 1090206 Raymond 1070503 合併一代共通版也提供的CDC需求(1000194)的'正副本取代模式'功能
				if(currItem.specialMode == true) {
					$dlg.find("#keepSecret").closest(".ui-checkbox").addClass("ui-disabled");
					$dlg.find("#keepSecret2").closest(".ui-checkbox").addClass("ui-disabled");
				}
				else {
					$dlg.find("#keepSecret").closest(".ui-checkbox").removeClass("ui-disabled");
					$dlg.find("#keepSecret2").closest(".ui-checkbox").removeClass("ui-disabled");
				}
				$dlg.find("#sealMark").prop("checked", currItem.printSealMark == true).checkboxradio("refresh");
				$dlg.find("#sealMarkSamePos").prop("checked", currItem.printSealMarkAtSamePos == true).checkboxradio("refresh");
				// 1120606 Raymond 1120515 新增判斷若為禁止套用騎縫章, 則反灰騎縫章核取方塊
				if(!allowUseSealMark) {
					$dlg.find("#sealMark").closest(".ui-checkbox").addClass("ui-disabled");
					$dlg.find("#sealMarkSamePos").closest(".ui-checkbox").addClass("ui-disabled");
				}
				$dlg.find("#barcode").prop("checked", currItem.printBarcode == true).checkboxradio("refresh");
				$dlg.find("#pgNo").prop("checked", currItem.printPageNo == true).checkboxradio("refresh");
				$dlg.find("#draftFileName").prop("checked", currItem.printDraftFileName == true).checkboxradio("refresh");
				$dlg.find("#dispatchConUnits").prop("checked", currItem.dispatchConUnits == true).checkboxradio("refresh");
				//1100723	Leslie[1100879]	修改紀錄「雙面列印」與顯示邏輯
				//$dlg.find("#bothSide").prop("checked", bBothSide == true).checkboxradio("refresh");	//2017.2.23	Leslie	雙面列印
				$dlg.find("#bothSide").prop("checked", currItem.BothSide == true).checkboxradio("refresh");
				// 1110623 Raymond 1110416 合併一代1030961, 新增紙本附件可選擇匯出頁面的色彩模式, 顯示文稿選項面版時隱藏
				$dlg.find("#asColor").closest(".ui-field-contain").hide();
				// 1150309 Raymond 1150145 隱藏來文面板的「列印簽核資訊頁」、「列印簽核資訊頁(內部意見)」核取方塊
				$dlg.find("#chkPrintSignObjPages4FromDoc").closest(".ui-field-contain").hide();
				$dlg.find("#filterTAITRA4FromDoc").closest(".ui-field-contain").hide();
				
				$dlg.find("#msg").text(currItem.msg).closest(".ui-field-contain").hide();	// 2016.9.8 隱藏附件無頁面訊息
			}
			else if(currItem.type == "attach") {
				$dlg.find(".ui-slide-pane-right").removeClass("ui-slide-pane-active");
				$dlg.find(".ui-slide-pane-left").addClass("ui-slide-pane-active");
				
				$dlg.find(".ui-slide-pane-left .ui-field-contain").hide();
				if("msg" in currItem && currItem.msg.length > 0) {	// 2016.9.8 新增附件無頁面時處理
					$dlg.find("#msg").text(currItem.msg).closest(".ui-field-contain").show();
				}
				else {
					$dlg.find("#sealMark").closest(".ui-field-contain").show();
					$dlg.find("#sealMark").prop("checked", currItem.printSealMark == true).checkboxradio("refresh");
					$dlg.find("#sealMarkSamePos").closest(".ui-field-contain").show();
					$dlg.find("#sealMarkSamePos").prop("checked", currItem.printSealMarkAtSamePos == true).checkboxradio("refresh");
					// 1120606 Raymond 1120515 新增判斷若為禁止套用騎縫章, 則反灰騎縫章核取方塊
					if(!allowUseSealMark) {
						$dlg.find("#sealMark").closest(".ui-checkbox").addClass("ui-disabled");
						$dlg.find("#sealMarkSamePos").closest(".ui-checkbox").addClass("ui-disabled");
					}
					$dlg.find("#barcode").closest(".ui-field-contain").show();
					$dlg.find("#barcode").prop("checked", currItem.printBarcode == true).checkboxradio("refresh");
					// 1090915 Raymond 1090564 信保特殊模式公文的附件沒有條碼, 設為反灰
					if(fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
						$dlg.find("#barcode").closest(".ui-field-contain").addClass("ui-disabled");
					else
						$dlg.find("#barcode").closest(".ui-field-contain").removeClass("ui-disabled");
					$dlg.find("#pgNo").closest(".ui-field-contain").show();
					$dlg.find("#pgNo").prop("checked", currItem.printPageNo == true).checkboxradio("refresh");
					// 1090915 Raymond 1090564 補上雙面列印選項
					$dlg.find("#bothSide").closest(".ui-field-contain").show();
					//1100723	Leslie[1100879]	修改紀錄「雙面列印」與顯示邏輯
					//$dlg.find("#bothSide").prop("checked", bBothSide == true).checkboxradio("refresh");
					$dlg.find("#bothSide").prop("checked", currItem.BothSide == true).checkboxradio("refresh");
					// 1110623 Raymond 1110416 合併一代1030961, 新增紙本附件可選擇匯出頁面的色彩模式, 顯示文稿選項面版時隱藏
					if(enableSpecialWaterMark && currItem.printWaterMark) {
						$dlg.find("#asColor").prop("checked", bBW == false).checkboxradio("refresh");
						// 1110916 Raymond 序290 改預設為黑白
						$dlg.find("#asMono").prop("checked", bBW == true).checkboxradio("refresh");
						$dlg.find("#asColor").closest(".ui-field-contain").show();
					}
				}
			}
			else if(currItem.type == "fromdoc") {	// 2016.9.8 新增來文
				$dlg.find(".ui-slide-pane-right").removeClass("ui-slide-pane-active");
				$dlg.find(".ui-slide-pane-left").addClass("ui-slide-pane-active");
				
				$dlg.find(".ui-slide-pane-left .ui-field-contain").hide();
				// 1150309 Raymond 1150145 新增判斷允許來文簽辦時, 且SSO_CONFIG.OrgNickName為"TAITRA"(外貿)時, 顯示「列印簽核資訊頁」、「列印簽核資訊頁(內部意見)」核取方塊
				if(SSO_CONFIG.OrgNickName == "TAITRA" && _enableRcvDocEditing()) {
					$dlg.find("#chkPrintSignObjPages4FromDoc").closest(".ui-field-contain").show();
					$dlg.find("#filterTAITRA4FromDoc").closest(".ui-field-contain").show();
				}
			}
			else if(currItem.type == "mailmerge") {
				$dlg.find(".ui-slide-pane-right").removeClass("ui-slide-pane-active");
				$dlg.find(".ui-slide-pane-left").addClass("ui-slide-pane-active");
				
				$dlg.find(".ui-slide-pane-left .ui-field-contain").hide();
			}
			else if(currItem.type == "smegdraft") {	// 1090915 Raymond 1090564 新增信保基金特殊模式文稿
				$dlg.find(".ui-slide-pane-right").removeClass("ui-slide-pane-active");
				$dlg.find(".ui-slide-pane-left").addClass("ui-slide-pane-active");
				
				$dlg.find(".ui-slide-pane-left .ui-field-contain").hide();
				$dlg.find("#sealMark").closest(".ui-field-contain").show();
				$dlg.find("#sealMark").prop("checked", currItem.printSealMark == true).checkboxradio("refresh");
				$dlg.find("#sealMarkSamePos").closest(".ui-field-contain").show();
				$dlg.find("#sealMarkSamePos").prop("checked", currItem.printSealMarkAtSamePos == true).checkboxradio("refresh");
				// 1120606 Raymond 1120515 新增判斷若為禁止套用騎縫章, 則反灰騎縫章核取方塊
				if(!allowUseSealMark) {
					$dlg.find("#sealMark").closest(".ui-checkbox").addClass("ui-disabled");
					$dlg.find("#sealMarkSamePos").closest(".ui-checkbox").addClass("ui-disabled");
				}
				$dlg.find("#barcode").closest(".ui-field-contain").show();
				$dlg.find("#barcode").prop("checked", currItem.printBarcode == true).checkboxradio("refresh");
				// 1090915 Raymond 1090564 信保特殊模式公文的附件沒有條碼, 設為反灰
				$dlg.find("#barcode").closest(".ui-field-contain").addClass("ui-disabled");
				$dlg.find("#pgNo").closest(".ui-field-contain").show();
				$dlg.find("#pgNo").prop("checked", currItem.printPageNo == true).checkboxradio("refresh");
				$dlg.find("#bothSide").closest(".ui-field-contain").show();
				//1100723	Leslie[1100879]	修改紀錄「雙面列印」與顯示邏輯
				//$dlg.find("#bothSide").prop("checked", bBothSide == true).checkboxradio("refresh");	// 1090915 Raymond 1090564 補上雙面列印選項
				$dlg.find("#bothSide").prop("checked", currItem.BothSide == true).checkboxradio("refresh");
			}
		}
		
		// 1060706 Raymond 1060539 新增偵測樣版是否支援會辦單位分繕列印選項
		function detectDispConOpt(rsrcFile, data) {
			// 1130809 Raymond 1130313 合併1111007(1100394), 都用done接了, 不用sync
			//theCacheMgr.get({type: "rsrc", rsrc: rsrcFile, async: false})
			theCacheMgr.get({type: "rsrc", rsrc: rsrcFile, async: true})
				.done(function(xslDoc) {
					if(xslDoc != undefined) {
						if("evaluate" in xslDoc) {
							// 2015.8.7 FireFox用find會找不到
							function nsResolver(prefix) {
								switch (prefix) {
									case 'xsl':
										return 'http://www.w3.org/1999/XSL/Transform';
									case 'exsl':
										return 'http://exslt.org/common';
									default:
										return 'http://www.w3.org/1999/XSL/Transform';
								}
							}
							var v = xslDoc.evaluate("xsl:variable[@name='會辦單位分繕列印']", xslDoc.documentElement, nsResolver, 7, null);
							if(v != null && v.snapshotLength > 0) {
								var dispCon = v.snapshotItem(0);
								data.dispatchConUnitsAvail = true;
								data.dispatchConUnits = dispCon.textContent == "true";
								theLogger.log("預設的排版參數[會辦單位分繕列印]: " + data.dispatchConUnits);
							}
							else {
								data.dispatchConUnitsAvail = false;
								data.dispatchConUnits = false;
								theLogger.warn("排版設定檔中找不到[會辦單位分繕列印]變數, 應為不支援會辦單位分繕列印的文別");
							}
						}
						else {	// IE
							if(!("selectSingleNode" in xslDoc)) {	// xslDoc不是MSXML2物件的話, 重新轉換為MSXML
								var str = Util.getXml(xslDoc);
								xslDoc = new ActiveXObject("MSXML2.DOMDocument");
								var res = xslDoc.loadXML(str);
								if(!res) {
									var pe = xslDoc.parseError;
									theLogger.error("載入XSL失敗! " + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
								}
							}
							var dispCon = xslDoc.selectSingleNode("/*/xsl:variable[@name='會辦單位分繕列印']");
							if(!!dispCon) {
								data.dispatchConUnitsAvail = true;
								data.dispatchConUnits = dispCon.text == "true";
								theLogger.log("預設的排版參數[會辦單位分繕列印]: " + data.dispatchConUnits);
							}
							else {
								data.dispatchConUnitsAvail = false;
								data.dispatchConUnits = false;
								theLogger.warn("排版設定檔中找不到[會辦單位分繕列印]變數, 應為不支援會辦單位分繕列印的文別");
							}
						}
					}
				})
				.fail(function(errorText) {
					theLogger.error(errorText);
				});
		}
		
		// 更新列印格式
		function updateFormatList(dm, $sel) {
			var docType = dm.getDocType();
			var subDocType = dm.getSubDocType();
			$sel.empty();
			var found = false;	// 2016.9.8 新增搜尋結果旗標
			thePublicRsrc.enumDirs("排版設定", function(dir) {
				for(var i=0; i<dir.children.length; i++) {
					var nm = dir.children[i].name;
					if(dir.children[i].docType == docType && (subDocType.length == 0 || dir.children[i].subDocType == subDocType || dir.children[i].subDocType == "")) {	// 2016.11.1 若RsrcMgmt.xml的函類別為空值, 也算符合可套用格式條件
						//$.assert(currItem.type == "draft");
						if("printXslName" in currItem) {
							if(nm == currItem.printXslName)
								$("<option value='" + nm + "' selected>" + nm + "</option>").appendTo($sel)	// option若無value, jQM會拿第1個當header(placeholder)
									.data("rsrcFile", dir.children[i]);
							// 1100311 Raymond 1090991 有原始套用排版設定檔的記錄者, 列印格式選單只列出該"稿"類別排版設定檔及其它適用之"文"類別排版設定檔
							//else
							else if(dir.children[i].category == "文" || (!!currItem.origPrintXslName && nm == currItem.origPrintXslName))
								$("<option value='" + nm + "'>" + nm + "</option>").appendTo($sel)	// option若無value, jQM會拿第1個當header(placeholder)
									.data("rsrcFile", dir.children[i]);
						}
						else
							$("<option value='" + nm + "'>" + nm + "</option>").appendTo($sel)	// option若無value, jQM會拿第1個當header(placeholder)
								.data("rsrcFile", dir.children[i]);
						found = true;	// 2016.9.8 新增搜尋結果旗標
					}
				}
			});
			// 2016.9.8 新增找不到的錯誤處理
			if(!found) {
				if(subDocType.length > 0)
					alert("找不到符合文別(" + docType + " - " + subDocType + ")的排版設定檔");
				else
					alert("找不到符合文別(" + docType + ")的排版設定檔");
			}
			$sel.selectmenu("refresh").trigger('change');
		}
		
		// 更新單選受文者
		function updateReceiverList(dm, $sel) {
			$sel.empty();
			$sel.append("<option value='all'>(全部)</option>");
			var arr = getAllReceivers(dm,
				{key: "發文方式", value: function(val) {
					//1110225 David 1101481 考試院客製化人工傳遞處理
					//return (val == "郵寄" || val == "人工傳遞");
					//1141017 Joe	1141126	增加外貿客製化發文方式
					// return (val == "郵寄" || val == "人工傳遞" || val == "機關內函件傳遞" || val == "機關間人工交換");
					return (val == "郵寄" || val == "人工傳遞" || val == "機關內函件傳遞" || val == "機關間人工交換" || val == "公文交換" || val == "傳真");
				}});
			for(var i=0; i<arr.length; i++) {
				// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
				// $("<option value='" + arr[i].name + "'>" + arr[i].name + "</option>").data("detail", arr[i]).appendTo($sel);
				$("<option value='" + theSSO.Util.htmlEncode(arr[i].name) + "'>" + theSSO.Util.htmlEncode(arr[i].name) + "</option>").data("detail", arr[i]).appendTo($sel);
			}
			$sel.selectmenu("refresh");
		}
		
		// 更新複選受文者
		function updateReceiverList2(dm, $tbdy, paperOnly) {
			$tbdy.empty();
			if(paperOnly)
				var arr = getAllReceivers(dm,
					{key: "發文方式", value: function(val) {
						//1110225 David 1101481 考試院客製化人工傳遞處理
						//return (val == "郵寄" || val == "人工傳遞");
						//1141017 Joe	1141126	增加外貿客製化發文方式
						// return (val == "郵寄" || val == "人工傳遞" || val == "機關內函件傳遞" || val == "機關間人工交換");
						return (val == "郵寄" || val == "人工傳遞" || val == "機關內函件傳遞" || val == "機關間人工交換" || val == "公文交換" || val == "傳真");
					}});
			else
				var arr = getAllReceivers(dm);
			if(currItem)	// 先清除之前選取的
				currItem.specifyMultiReceiver.length = 0;
			for(var i=0; i<arr.length; i++) {
				// 1121027 Raymond 1120790 新增顯示受文者的「序」
				// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
				// $("<tr><td style='width:170px; padding-left:30px; text-indent:-30px'><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align: middle'>" + arr[i].name + "</td><td style='width:100px'>" + arr[i].sendWay + "</td><td>" + arr[i].issueType + "</td></tr>").data("detail", arr[i]).appendTo($tbdy)
				//$("<tr><td style='width:170px; padding-left:30px; text-indent:-30px'><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align: middle'>" + theSSO.Util.htmlEncode(arr[i].name) + "</td><td style='width:100px'>" + theSSO.Util.htmlEncode(arr[i].sendWay) + "</td><td>" + theSSO.Util.htmlEncode(arr[i].issueType) + "</td></tr>").data("detail", arr[i]).appendTo($tbdy)
				$("<tr><td style='width:28px'>" + (arr[i].index + 1) + "</td><td style='width:170px; padding-left:30px; text-indent:-30px'><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align: middle'>" + theSSO.Util.htmlEncode(arr[i].name) + "</td><td style='width:100px'>" + theSSO.Util.htmlEncode(arr[i].sendWay) + "</td><td>" + theSSO.Util.htmlEncode(arr[i].issueType) + "</td></tr>").data("detail", arr[i]).appendTo($tbdy)
				.find("input[type='checkbox']").on('click', function(evt) {
					if($(this).prop("checked")) {
						if(currItem) {
							var detail = $(this).closest("tr").data("detail");
							var exists = false;
							for(var i=0; i<currItem.specifyMultiReceiver.length; i++) {
								// 1120425 Raymond 1120157 修正有同名受文者時, 勾選2個以上同名受文者只會列印第一次勾選的同名受文者的問題
								// 1110321 Raymond 1110216 修正有同名受文者分別為正、副本的情況, 只會列印第一筆同名受文者的問題
								//if(currItem.specifyMultiReceiver[i].name == detail.name) {
								//if(currItem.specifyMultiReceiver[i].name == detail.name && currItem.specifyMultiReceiver[i].issueType == detail.issueType) {
								if(currItem.specifyMultiReceiver[i].name == detail.name && currItem.specifyMultiReceiver[i].issueType == detail.issueType && currItem.specifyMultiReceiver[i].sn == detail.sn) {
									exists = true;
									break;
								}
							}
							if(!exists)
								currItem.specifyMultiReceiver.push(detail);
						}
					}
					else {
						if(currItem) {
							var detail = $(this).closest("tr").data("detail");
							for(var i=0; i<currItem.specifyMultiReceiver.length; i++) {
								// 1120425 Raymond 1120157 修正有同名受文者時, 取消勾選1個同名受文者會連其它已勾選的同名受文者一起取消選取的問題
								// 1110321 Raymond 1110216 修正有同名受文者分別為正、副本的情況, 只會列印第一筆同名受文者的問題
								//if(currItem.specifyMultiReceiver[i].name == detail.name) {
								//if(currItem.specifyMultiReceiver[i].name == detail.name && currItem.specifyMultiReceiver[i].issueType == detail.issueType) {
								if(currItem.specifyMultiReceiver[i].name == detail.name && currItem.specifyMultiReceiver[i].issueType == detail.issueType && currItem.specifyMultiReceiver[i].sn == detail.sn) {
									currItem.specifyMultiReceiver.splice(i, 1);
									break;
								}
							}
						}
					}
				});
			}
			$tbdy.enhanceWithin();
		}
		
		// 2016.10.28 新增排序功能
		$dlg.find(".ui-slide-pane-right table").find("th").each(function(idx, th) {
			$(th).on("click", {idx:idx}, function(evt) {
				var idx = evt.data.idx;
				var $tbdy = $dlg.find(".ui-slide-pane-right table").find("tbody");
				if(idx == 0) {	// order by 受文者
					sortTheTable(function(a, b) {
						// 1120425 Raymond 1120157 修正排序功能無作用的問題
						//return a.name > b.name;
						if(a.name > b.name)
							return 1;
						else if(b.name == a.name)
							return 0;
						return -1;
					});
				}
				else if(idx == 1) {	// order by 發文方式
					var sw = {
						"郵寄": 1,
						"人工傳遞": 2,
						"電子交換": 3,
						"電子郵件": 4
					};
					sortTheTable(function(a, b) {
						var pa = 5, pb = 5;	// 未在優先序表中的最低優先
						if(a.sendWay in sw)
							pa = sw[a.sendWay];
						if(b.sendWay in sw)
							pb = sw[b.sendWay];
						// 1120425 Raymond 1120157 修正排序功能無作用的問題
						//return pa > pb;
						if(pa > pb)
							return 1;
						else if(pa == pb)
							return 0;
						return -1;
					});
				}
				else if(idx == 2) {	// order by 本別
					var it = {
						"正本": 1,
						"副本": 2,
						"抄本": 3,
						"主持人": 4,
						"出席者": 5,
						"列席者": 6
					};
					sortTheTable(function(a, b) {
						var pa = 7, pb = 7;	// 未在優先序表中的最低優先
						if(a.issueType in it)
							pa = it[a.issueType];
						if(b.issueType in it)
							pb = it[b.issueType];
						// 1120425 Raymond 1120157 修正排序功能無作用的問題
						//return pa > pb;
						if(pa > pb)
							return 1;
						else if(pa == pb)
							return 0;
						return -1;
					});
				}
				function sortTheTable(sortFunc){
					var elems = $tbdy.find("tr");//$.makeArray($tbdy.find("tr"));
					var data = [];
					for(var i=0; i<elems.length; i++) {
						data.push(elems.eq(i).data("detail"));
						theLogger.log("(" + i + ") " + elems.eq(i).data("detail").name + ", " + elems.eq(i).data("detail").sendWay + ", " + elems.eq(i).data("detail").issueType);
					}
					data.sort(sortFunc);
					$tbdy.empty();
					for(var i=0; i<data.length; i++) {
						//elems.eq(i).appendTo($tbdy);
						theLogger.log("(" + i + ") " + data[i].name + ", " + data[i].sendWay + ", " + data[i].issueType);
						// 1120425 Raymond 1120157 修正排序後保持原本勾選狀態
						//$("<tr><td style='width:170px; padding-left:30px; text-indent:-30px'><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align: middle'>" + data[i].name + "</td><td style='width:100px'>" + data[i].sendWay + "</td><td>" + data[i].issueType + "</td></tr>").data("detail", data[i]).appendTo($tbdy)
						var chked = false;
						if(currItem.specifyMultiReceiver.length) {
							for(var j=0; j<currItem.specifyMultiReceiver.length; j++) {
								if(currItem.specifyMultiReceiver[j].name == data[i].name && currItem.specifyMultiReceiver[j].sn == data[i].sn)
									chked = true;
							}
						}
						$("<tr><td style='width:170px; padding-left:30px; text-indent:-30px'><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align: middle'" + (chked?" checked":"") + ">" + data[i].name + "</td><td style='width:100px'>" + data[i].sendWay + "</td><td>" + data[i].issueType + "</td></tr>").data("detail", data[i]).appendTo($tbdy)
						.find("input[type='checkbox']").on('click', function(evt) {
							if($(this).prop("checked")) {
								if(currItem) {
									var detail = $(this).closest("tr").data("detail");
									var exists = false;
									for(var i=0; i<currItem.specifyMultiReceiver.length; i++) {
										// 1120425 Raymond 1120157 修正有同名受文者時, 排序後勾選2個以上同名受文者只會列印第一次勾選的同名受文者的問題
										// 1110321 Raymond 1110216 修正有同名受文者分別為正、副本的情況, 只會列印第一筆同名受文者的問題
										//if(currItem.specifyMultiReceiver[i].name == detail.name) {
										//if(currItem.specifyMultiReceiver[i].name == detail.name && currItem.specifyMultiReceiver[i].issueType == detail.issueType) {
										if(currItem.specifyMultiReceiver[i].name == detail.name && currItem.specifyMultiReceiver[i].issueType == detail.issueType && currItem.specifyMultiReceiver[i].sn == detail.sn) {
											exists = true;
											break;
										}
									}
									if(!exists)
										currItem.specifyMultiReceiver.push(detail);
								}
							}
							else {
								if(currItem) {
									var detail = $(this).closest("tr").data("detail");
									for(var i=0; i<currItem.specifyMultiReceiver.length; i++) {
										// 1120425 Raymond 1120157 修正有同名受文者時, 排序後取消勾選1個同名受文者會連其它已勾選的同名受文者一起取消選取的問題
										// 1110321 Raymond 1110216 修正有同名受文者分別為正、副本的情況, 只會列印第一筆同名受文者的問題
										//if(currItem.specifyMultiReceiver[i].name == detail.name) {
										//if(currItem.specifyMultiReceiver[i].name == detail.name && currItem.specifyMultiReceiver[i].issueType == detail.issueType) {
										if(currItem.specifyMultiReceiver[i].name == detail.name && currItem.specifyMultiReceiver[i].issueType == detail.issueType && currItem.specifyMultiReceiver[i].sn == detail.sn) {
											currItem.specifyMultiReceiver.splice(i, 1);
											break;
										}
									}
								}
							}
						});
					}
				}
			});
		});
		
		// 1061201 Raymond 1061150 新增搜尋受文者功能
		$dlg.find("#btnSearchReceivers").on('click', function() {
			var key = $dlg.find("#searchKey").val();
			if(key.length > 0) {
				var $tbdy = $dlg.find(".ui-slide-pane-right table").find("tbody");
				function populateSearchResult(dm, $rslt, paperOnly) {
					if(paperOnly)
						var arr = getAllReceivers(dm,
							{key: "發文方式", value: function(val) {
								//1110225 David 1101481 考試院客製化人工傳遞處理
								//return (val == "郵寄" || val == "人工傳遞");
								//1141017 Joe	1141126	增加外貿客製化發文方式
								// return (val == "郵寄" || val == "人工傳遞" || val == "機關內函件傳遞" || val == "機關間人工交換");
								return (val == "郵寄" || val == "人工傳遞" || val == "機關內函件傳遞" || val == "機關間人工交換" || val == "公文交換" || val == "傳真");
							}});
					else
						var arr = getAllReceivers(dm);
					if(arr.length > 0) {
						var $ul = $("<ul data-role='listview'></ul>").appendTo($rslt);
						for(var i=0; i<arr.length; i++) {
							arr[i].origIndex = i;
							if(typeof arr[i].name == "string" && arr[i].name.indexOf(key) >= 0) {
								var chked = false;
								if(currItem && currItem.specifyMultiReceiver.length) {
									for(var j=0; j<currItem.specifyMultiReceiver.length; j++) {
										// 1120425 Raymond 1120157 修正有同名受文者時, 勾選1個同名受文者再搜尋此受文者名稱, 搜尋列表的所有同名受文者都會勾選的問題
										// 1110524 Raymond 1110528 修正搜尋到不同本別的同名受文者的情況, 若其中之一已經勾選, 則搜尋結果項目會都勾選的問題
										//if(currItem.specifyMultiReceiver[j].name == arr[i].name)
										//if(currItem.specifyMultiReceiver[j].name == arr[i].name && currItem.specifyMultiReceiver[j].issueType == arr[i].issueType)
										if(currItem.specifyMultiReceiver[j].name == arr[i].name && currItem.specifyMultiReceiver[j].issueType == arr[i].issueType && currItem.specifyMultiReceiver[j].sn == arr[i].sn)
											chked = true;
									}
								}
								$("<li><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align: middle'>" + arr[i].name + "</li>").data("detail", arr[i]).appendTo($ul)
								.find("input[type='checkbox']").on('click', function(evt) {
									if($(this).prop("checked")) {	// 勾選
										if(currItem) {
											var detail = $(this).closest("li").data("detail");
											var exists = false;
											for(var i=0; i<currItem.specifyMultiReceiver.length; i++) {
												// 1120425 Raymond 1120157 修正有同名受文者時, 勾選搜尋列表中2個以上的同名受文者只會列印及同步勾選第一次勾選的同名受文者的問題
												// 1110321 Raymond 1110216 修正有同名受文者分別為正、副本的情況, 只會列印第一筆同名受文者的問題
												//if(currItem.specifyMultiReceiver[i].name == detail.name) {
												//if(currItem.specifyMultiReceiver[i].name == detail.name && currItem.specifyMultiReceiver[i].issueType == detail.issueType) {
												if(currItem.specifyMultiReceiver[i].name == detail.name && currItem.specifyMultiReceiver[i].issueType == detail.issueType && currItem.specifyMultiReceiver[i].sn == detail.sn) {
													exists = true;
													break;
												}
											}
											if(!exists) {
												currItem.specifyMultiReceiver.push(detail);
												// 1120425 Raymond 1120157 修正排序後再搜尋, 勾選搜尋列表中的項目時, 同步勾選複選清單會勾選錯項目的問題
												//$tbdy.find("tr").eq(detail.origIndex).find("input[type='checkbox']").prop("checked", true);	// 同步勾選表格中的受文者
												$tbdy.find("tr").each(function(idx, elm) {
													var dtl = $(elm).data("detail");
													if(dtl.name == detail.name && dtl.sn == detail.sn) {
														$(elm).find("input[type='checkbox']").prop("checked", true);
														return false;	// break each-loop
													}
												});
											}
										}
									}
									else {	// 取消勾選
										if(currItem) {
											var detail = $(this).closest("li").data("detail");
											for(var i=0; i<currItem.specifyMultiReceiver.length; i++) {
												// 1120425 Raymond 1120157 修正有同名受文者時, 取消勾選1個同名受文者會連其它已勾選的同名受文者一起取消選取的問題
												// 1110321 Raymond 1110216 修正有同名受文者分別為正、副本的情況, 只會列印第一筆同名受文者的問題
												//if(currItem.specifyMultiReceiver[i].name == detail.name) {
												//if(currItem.specifyMultiReceiver[i].name == detail.name && currItem.specifyMultiReceiver[i].issueType == detail.issueType) {
												if(currItem.specifyMultiReceiver[i].name == detail.name && currItem.specifyMultiReceiver[i].issueType == detail.issueType && currItem.specifyMultiReceiver[i].sn == detail.sn) {
													currItem.specifyMultiReceiver.splice(i, 1);
													// 1120425 Raymond 1120157 修正排序後再搜尋, 取消勾選搜尋列表中的項目時, 同步取消勾選複選清單會取消勾選錯項目的問題
													//$tbdy.find("tr").eq(detail.origIndex).find("input[type='checkbox']").prop("checked", false);// 同步取消勾選表格中的受文者
													$tbdy.find("tr").each(function(idx, elm) {
														var dtl = $(elm).data("detail");
														if(dtl.name == detail.name && dtl.sn == detail.sn) {
															$(elm).find("input[type='checkbox']").prop("checked", false);
															return false;	// break each-loop
														}
													});
													break;
												}
											}
										}
									}
								}).prop("checked", chked);
							}
						}
						if($ul.find("li").length == 0)
							$rslt.empty().append("<p>找不到相符的受文者</p>");
					}
					else {
						$("<p>無受文者可搜尋</p>").appendTo($rslt);
					}
					$rslt.enhanceWithin();
					$rslt.popup("open", {positionTo: "#searchKey"});
				}
				fm.accquireDraftModel(currItem.draftIdx)
					.done(function(dm) {
						if(!!dm) {
							populateSearchResult(dm, $("#searchReceiversResult").empty(), $dlg.find("#onlyPaper").prop("checked"));
						}
						else {	// 來文
							
						}
					})
					.fail(function(errorText) {
						theLogger.error(errorText);
						alert(errorText);
					});
			}
			else {
				$("#searchReceiversResult").empty().append("<p>未指定搜尋關鍵字</p>").enhanceWithin().popup("open", {positionTo: "#searchKey"});
			}
		});
		
		// 1090310 Raymond 1081103 新增全選文稿功能
		$dlg.find("#chkAllDrafts").on('click', function() {
			var chked = $(this).prop("checked");
			$dlg.find("ul[data-role='listview']").children("li").each(function(idx, li) {	// 選取目前文稿
				var nfo = $(li).data("info");
				if(!!nfo) {
					if(nfo.enable && !chked)	// 取消勾選
						$(li).find("input[type='checkbox']").prop("checked", false);
					else if(!nfo.enable && chked)	// 勾選
						$(li).find("input[type='checkbox']").prop("checked", true);
					nfo.enable = chked;
				}
			});
		});
		
		// 點擊文稿
		function onClickDraft(event) {
			if(!$(this).hasClass("ui-btn-active")) {
				$dlg.find("#itemList").find("li.ui-btn-active").removeClass("ui-btn-active");
				$(this).addClass("ui-btn-active");
				
				currItem = $(this).data("info");
				onChangeItemPane();
			}
			// 1090915 Raymond 1090564 新增信保特殊模式公文不要執行accquireDraftModel
			if(fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2")
			fm.accquireDraftModel(currItem.draftIdx)
				.done(function(dm) {
					if(!!dm) {
						if(!("signAreas" in dm)) {	// 2017.3.15 3頁變2頁時未點擊過的文稿, 簽核區域資訊未更新會導致無法列印記錄位於第3頁的簽核物件, 航港-序499
							alert("此文稿尚未點擊顯示過內容頁面，簽核區域所在頁次可能未更新，\n若發現有簽核物件未顯示在簽核區域內的情況，請關閉列印子視窗，\n點擊此文稿的頁籤顯示內容頁面後，再行列印。");
						}
						updateFormatList(dm, $dlg.find("#printXsl"));
						
						updateReceiverList(dm, $dlg.find("#receiverSelect"));
						
						updateReceiverList2(dm, $dlg.find(".ui-slide-pane-right table").find("tbody"), $dlg.find("#onlyPaper").prop("checked"));
					}
					else {	// 來文
						
					}
				})
				.fail(function(errorText) {
					theLogger.error(errorText);
					alert(errorText);
				});
		}
		// 點擊附件
		function onClickAtt(event) {
			if(!$(this).hasClass("ui-btn-active")) {
				$dlg.find("#itemList").find("li.ui-btn-active").removeClass("ui-btn-active");
				$(this).addClass("ui-btn-active");
				
				currItem = $(this).data("info");
				onChangeItemPane();
			}
		}
		// 點擊分繕表
		function onClickMailMerge(event) {
			if(!$(this).hasClass("ui-btn-active")) {
				$dlg.find("#itemList").find("li.ui-btn-active").removeClass("ui-btn-active");
				$(this).addClass("ui-btn-active");
				
				currItem = $(this).data("info");
				onChangeItemPane();
			}
		}
		
		function prepopulate($ul) {
			var dfd = $.Deferred();	// 2016.9.8 改Deferred模式, 開啟時就要下載每個文稿, 因為使用者不會每筆文稿都點開檢查選項跟套用格式就列印了
			var n = fm.getDraftCounts();
			var currIdx = $viewPort.data("view").currDraftIndex();	// 2016.10.27 新增預設目前文稿為勾選, 其它不要勾選
			function doNext(i) {
				if(i < n) {
					// 1090915 Raymond 1090564 新增信保特殊模式公文
					if(fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
						var idx = i;
						var data = {type: "smegdraft",
									draftIdx: idx,
									enable: idx == currIdx,					// 勾選
									printRange: "-1",						// 列印範圍
									printSealMark: false,					// 列印騎縫章, 預設false
									printSealMarkAtSamePos: false,			// 列印騎縫章在相同位置
									printBarcode: false, 					// 列印條碼, 信保特殊模式公文沒有barcode
									printPageNo: true,						// 列印頁碼, 預設true
									};
						$("<li><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align:middle'" + ((idx == currIdx)?" checked":"") + ">" + fm.getDraftName(idx) + "</li>").appendTo($ul)
							.on('click', onClickDraft)
							.data("info", data);
						var m = fm.getDraftAttCounts(idx);
						for(var k=0; k<m; k++) {
							var l = fm.getAttPageCounts(idx, k);
							if(l > 0) {
								$("<li style='padding-left:30px'><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align:middle'" + ((idx == currIdx)?" checked":"") + ">" + fm.getDraftAttName(idx, k) + "</li>").appendTo($ul)
									.on('click', onClickAtt)
									.data("info", {
										type: "attach",
										draftIdx: idx,
										attIdx: k,
										enable: idx == currIdx,					// 勾選
										printSealMark: false,					// 列印騎縫章, 預設false
										printSealMarkAtSamePos: false,			// 列印騎縫章在相同位置
										printBarcode: false, 					// 列印條碼, 信保特殊模式公文沒有barcode
										printPageNo: true						// 列印頁碼, 預設true
										});
							}
							else {
								theLogger.warn("附件無頁面");
								$("<li style='padding-left:30px'><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align:middle' disabled>" + fm.getDraftAttName(idx, k) + "</li>").appendTo($ul)
									.on('click', onClickAtt)
									.data("info", {
										type: "attach",
										draftIdx: idx,
										attIdx: k,
										enable: false,
										msg: "此附件無頁面影像"});
							}
						}
						doNext(idx + 1);	// 處理下一筆文稿
					}
					else
					fm.accquireDraftModel(i, i)
						.done(function(dm, idx) {
							if(dm) {
								var docType = dm.getDocType();
								var subDocType = dm.getSubDocType();
								var specialMode = dm.accquireXml().documentElement.getAttribute("正副本取代模式") == "True";	// 1090206 Raymond 1070503 合併一代共通版也提供的CDC需求(1000194)的'正副本取代模式'功能
								//var keepSecret = dm.accquireXml().documentElement.getAttribute("行文單位保密") == "True";	// 2016.9.19 套用設定在文稿檔內的行文單位保密設定
								var keepSecret = dm.accquireXml().documentElement.getAttribute("行文單位保密") == "True" && !specialMode;	// 1090206 Raymond 1070503 合併一代共通版也提供的CDC需求(1000194)的'正副本取代模式'功能
								//var keepSecret2 = dm.accquireXml().documentElement.getAttribute("副本行文單位保密") == "True";
								var keepSecret2 = dm.accquireXml().documentElement.getAttribute("副本行文單位保密") == "True" && !specialMode;	// 1090206 Raymond 1070503 合併一代共通版也提供的CDC需求(1000194)的'正副本取代模式'功能
								//var keepSecret3 = dm.accquireXml().documentElement.getAttribute("主持人行文單位保密") == "True";
								var keepSecret3 = dm.accquireXml().documentElement.getAttribute("主持人行文單位保密") == "True" && !specialMode;	// 1090206 Raymond 1070503 合併一代共通版也提供的CDC需求(1000194)的'正副本取代模式'功能
								var applyCustom = dm.accquireXml().documentElement.getAttribute("套用自訂") == "True";	// 1061024 Raymond 1060980 文稿根節點新增套用自訂屬性, 若值為True表示經過設定段落屬性, 需套用自訂
								// 1110615 Raymond 1110416 合併一代1030961, 新增密等浮水印改依當件文稿設定
								var sec = "";
								try {
									sec = dm.attr("/*/密等及解密條件或保密期限/密等/@代碼");
								} catch(e) {
									theLogger.error(e.stack || e.message);
								}
								var found = false;
								// 1060913 Raymond 1060735 取得原始套用的樣版檔名
								var origPrintXSL = dm.getOrigPrintXSL();
								if(typeof origPrintXSL === "string" && origPrintXSL.length > 0) {
									var fn = origPrintXSL.substr(origPrintXSL.lastIndexOf('\\') + 1);
								}
								thePublicRsrc.enumDirs("排版設定", function(dir) {
									for(var j=0; j<dir.children.length; j++) {
										var nm = dir.children[j].name;
										// 1060913 Raymond 1060735 有原始套用的樣版檔名則預設為該樣版, 否則依原來第1筆符合文別、函類別的邏輯
										//if(dir.children[j].docType == docType && (subDocType.length == 0 || dir.children[j].subDocType == subDocType || dir.children[j].subDocType == "")) {	// 2016.11.1 若RsrcMgmt.xml的函類別為空值, 也算符合可套用格式條件
										if((!!fn && fn == dir.children[j].remote.path) ||
											(!fn && dir.children[j].docType == docType && (subDocType.length == 0 || dir.children[j].subDocType == subDocType || dir.children[j].subDocType == ""))) {	// 2016.11.1 若RsrcMgmt.xml的函類別為空值, 也算符合可套用格式條件
											//$.assert(currItem.type == "draft");
											// 1101213 Raymond 1101410 修正函類別"移文單"會與"函"用同一樣版檔, 但這邊以樣版檔名搜尋會對到第一筆"函"用的資源檔資訊, printXslName會設錯成"函", 導致updateFormatList會找不到目前套用的"稿"樣版問題
											if(!!fn && !!subDocType && dir.children[j].subDocType != subDocType) {
												theLogger.log("找到與原始套用的樣版檔名'" + fn + "'相同的資源檔, 但其函類別(" + dir.children[j].subDocType + ")與文稿不同(" + subDocType + "), 再搜尋其他樣版資源...");
												for(var jj=j+1; jj<dir.children.length; jj++) {
													if(fn == dir.children[jj].remote.path && dir.children[jj].subDocType == subDocType) {
														theLogger.log("找到路徑檔名相同的樣版資源檔'" + dir.children[jj].name + "', 其函類別相符, 改用此資源檔");
														j = jj;
														break;
													}
												}
											}
											// 預設套用第1筆符合的PrintXSL
											var data = {type: "draft",
														draftIdx: idx,
														enable: idx == currIdx,					// 勾選, 2016.10.27 目前文稿才勾選
														rsrcFile: dir.children[j],				// 套用樣版檔
														printXslName: dir.children[j].name,		// 套用樣版檔名
														printFont: "標楷體",					// 預設字型		//1060612	Leslie[1060211]	寫入實際預設值"標楷體"
														printLineHeight: "1.5",					// 預設行高		//1060612	Leslie[1060211]	寫入實際預設值"1.5"
														applyCustom: applyCustom,				// 套用自訂, 1061024 Raymond 1060980 預設是否套用自訂改依文稿的設定值決定
														applyTCMode: 3,							// 檢視模式
														printRange: "-1",						// 列印範圍
														printMailMerge: false,					// 列印用途
														printSingleReceiver: true,				// 單選/複選受文者
														specifySingleReceiver: "all",			// 單選受文者
														specifyMultiReceiver: [],				// 複選受文者
														keepSecret: keepSecret,					// 正本行文單位保密
														keepSecret2: keepSecret2,				// 副本行文單位保密
														printSealMark: true,					// 列印騎縫章, 2016.9.26 改成預設true
														printSealMarkAtSamePos: false,			// 列印騎縫章在相同位置
														printBarcode: true, 					// 列印條碼, 2016.9.26 改成預設true
														printPageNo: true,						// 列印頁碼, 2016.9.26 改成預設true
														printDraftFileName: false,				// 列印本文檔名
														dispatchConUnits: false,				// 會辦單位分繕列印
														specialMode: specialMode,				// 正副本取代模式, 1090206 Raymond 1070503 合併一代共通版也提供的CDC需求(1000194)的'正副本取代模式'功能
														printWaterMark: (enableSpecialWaterMark && sec.match(/密/g))?true:false	// 列印浮水印, 1110615 Raymond 1110416 合併一代1030961, 依當件文稿密等設定列印密件浮水印
														};
											// 1100312 Raymond 1090991 新增記錄原本套用的稿PrintXSL檔所對應的資源檔名稱
											if(!!fn && dir.children[j].category != "文")
												data.origPrintXslName = dir.children[j].name;
											// 1060706 Raymond 1060539 新增會辦單位分繕列印選項
											detectDispConOpt(dir.children[j], data);
											//1060612	Leslie[1060211]	新增紀錄預設值
											var SettingKey = dir.children[j].docType+';'+dir.children[j].category+';'+dir.children[j].subDocType;
											defaultSet[SettingKey] = {};
											data["SettingKey"] = SettingKey;	//增加紀錄鍵值，供後續回寫儲存
											for(var iKey = 0;iKey < recordAtt.length;iKey++){
												defaultSet[SettingKey][recordAtt[iKey]] = data[recordAtt[iKey]];
											}
											// 1091218 Raymond 1090921 若前次設定套用格式名稱與預設不一致, 則重新搜尋前次設定的格式名稱所對應的排版設定檔資源
											var bResetRsrcFile = false;
											//檢核使用者前次設定值是否存在
											if(userPrintSet[SettingKey] && userPrintSet[userPrintSet[SettingKey]]){
												var printTypeSetting = userPrintSet[userPrintSet[SettingKey]];
												//載入使用者前次列印設定
												for(var iKey = 0;iKey < recordAtt.length;iKey++){
													if(printTypeSetting[recordAtt[iKey]] != undefined) {
														// 1091218 Raymond 1090921 若前次設定套用格式名稱與預設不一致, 則重新搜尋前次設定的格式名稱所對應的排版設定檔資源
														if(recordAtt[iKey] == "printXslName" && data[recordAtt[iKey]] != printTypeSetting[recordAtt[iKey]])
															bResetRsrcFile = true;
														data[recordAtt[iKey]] = printTypeSetting[recordAtt[iKey]];
													}
												}
											}
											//1100723	Leslie[1100879]	修改紀錄「雙面列印」與顯示邏輯
											//bBothSide = (data.BothSide == true);
											//1060612	Leslie[1060211]	新增紀錄預設值	--END--
											
											// 1120606 Raymond 1120515 新增判斷若為禁止套用騎縫章, 則取消預設勾選騎縫章選項
											if(!allowUseSealMark) {
												data.printSealMark = false;
												data.printSealMarkAtSamePos = false;
											}
											
											// 1091218 Raymond 1090921 若前次設定套用格式名稱與預設不一致, 則重新搜尋前次設定的格式名稱所對應的排版設定檔資源
											if(bResetRsrcFile) {
												thePublicRsrc.enumDirs("排版設定", function(dir2) {
													for(var j2=0; j2<dir2.children.length; j2++) {
														var nm2 = dir2.children[j2].name;
														if(nm2 == data.printXslName) {
															// 1100312 Raymond 1090991 因前次記憶的是"文"類別的列印格式名稱, 所以允許重設
															if(dir2.children[j2].category == "文") {
															theLogger.log("因前次記憶列印格式名稱為'" + data.printXslName + "', 重設排版設定檔為'" + dir2.children[j2].remote.path + "'");
															data.rsrcFile = dir2.children[j2];
															}
															else {	// 若前次記憶的是"稿"類別的列印格式名稱, 則須恢復原來PrintXSL檔對應的列印格式名稱
																data.printXslName = data.origPrintXslName;
															}
															break;
														}
													}
												});
											}
											// 1110617 Raymond 1110416 合併一代1030961, 啟用列印密件浮水印時, 將文稿的密等及解密條件或保密期限寫入data
											if(enableSpecialWaterMark) {
												try {
													data.sec = dm.attr("*/密等及解密條件或保密期限/密等/@代碼");
													data.decCond = dm.text("*/密等及解密條件或保密期限/解密條件或保密期限");
												}
												catch(ex) {
												}
												// 1111013 Raymond 陸委會序333 啟用列印密件浮水印時, 將文稿的發文字號支號寫入data
												try {
													data.subno = dm.text("*/發文字號/文號/支號");
												}
												catch(ex) {
												}
											}
											
											// 1111026 Raymond 1110864 合併1101468, 啟用分文稿記錄簽核意見功能時, 各文稿的選項物件中新增showAllComments參數, 並預設為不顯示完整意見
											if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
												data.showAllComments = false;
												data.filterNUK = false;	// 一併修正「僅顯示會辦單位長官意見」選項設定, 在啟用分文稿記錄簽核意見功能時, 也是文稿選項而不是全域
											}
											
											$("<li><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align:middle'" + ((idx == currIdx)?" checked":"") + ">" + fm.getDraftName(idx) + "</li>").appendTo($ul)
												.on('click', onClickDraft)
												.data("info", data);
											
											if(dm.hasMailMergeVars()) {	// 2016.10.27 有分繕變數時
												$("<li style='padding-left:30px'><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align:middle'" + ((idx == currIdx)?" checked":"") + ">分繕變數表</li>").appendTo($ul)
													.on('click', onClickMailMerge)
													.data("info", {
														type: "mailmerge",
														draftIdx: idx,
														enable: idx == currIdx,
														});
											}
											
											var m = fm.getDraftAttCounts(idx);
											for(var k=0; k<m; k++) {
												var l = fm.getAttPageCounts(idx, k);
												// 1130812 Raymond 1130313 離線模式下無法使用轉檔工作站, 不提供密件浮水印啟用時, 能匯出附件頁面再套印浮水印功能
												// 1110622 Raymond 1110416 合併一代1030961, 當啟用密件浮水印時, 即使無匯出的頁面影像也提供列印功能
												//if(l > 0) {
												//if(l > 0 || (enableSpecialWaterMark && sec.match(/密/g))) {
												if(l > 0 || (enableSpecialWaterMark && sec.match(/密/g) && (!theSSO || theSSO.offlineMode != true))) {
													var attOrigFileName = fm.getDraftAttOrigFileName(idx, k);
													if(attOrigFileName.indexOf("\\") >= 0)
														attOrigFileName = attOrigFileName.substr(attOrigFileName.indexOf("\\") + 1);
													$("<li style='padding-left:30px'><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align:middle'" + ((idx == currIdx)?" checked":"") + ">" + fm.getDraftAttName(idx, k) + "</li>").appendTo($ul)
														.on('click', onClickAtt)
														.data("info", {
															type: "attach",
															draftIdx: idx,
															attIdx: k,
															enable: idx == currIdx,					// 2016.10.27 目前文稿才勾選
															printSealMark: false,					// 列印騎縫章, 2016.9.26 改成預設true, 1100319 改為預設false, 因為改單號1090564之前, 附件屬性頁的騎縫章選項, 勾或不勾都不會在附件頁面套印騎縫章, 5.0.44以後版本, 勾選附件的騎縫章選項會生效, 為維持與修改前行為一致, 故附件騎縫章的預設值改回false
															printSealMarkAtSamePos: false,			// 列印騎縫章在相同位置
															printBarcode: true, 					// 列印條碼, 2016.9.26 改成預設true
															printPageNo: true,						// 列印頁碼, 2016.9.26 改成預設true
															printWaterMark: (enableSpecialWaterMark && sec.match(/密/g))?true:false,	// 列印浮水印, 1110615 Raymond 1110416 合併一代1030961, 依當件文稿密等設定列印密件浮水印
															draftInfo: data,						// 附件所屬文稿, 1110616 Raymond 1110416 新增記錄附件所屬文稿, 供列印密件的附件時可依密等顯示警語文字等浮水印
															origFileName: attOrigFileName			// 附件原始檔檔名, 1110622 Raymond 1110416 新增記錄附件原始檔名
															});
												}
												else {
													// 1130812 Raymond 1130313 離線模式下無法使用轉檔工作站, 不提供密件浮水印啟用時, 能匯出附件頁面再套印浮水印功能
													if(enableSpecialWaterMark && sec.match(/密/g))
														theLogger.warn("附件無頁面, 離線模式下無法使用轉檔工作站, 不提供密件浮水印啟用時, 能匯出附件頁面再套印浮水印功能");
													else
													theLogger.warn("附件無頁面");
													$("<li style='padding-left:30px'><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align:middle' disabled>" + fm.getDraftAttName(idx, k) + "</li>").appendTo($ul)
														.on('click', onClickAtt)
														.data("info", {
															type: "attach",
															draftIdx: idx,
															attIdx: k,
															enable: false,
															// 1130812 Raymond 1130313 離線模式下無法使用轉檔工作站, 不提供密件浮水印啟用時, 能匯出附件頁面再套印浮水印功能
															msg: (enableSpecialWaterMark && sec.match(/密/g))?"此附件無頁面影像, *離線模式下無法使用轉檔工作站, 不提供密件浮水印啟用時可匯出附件頁面再套印浮水印功能":"此附件無頁面影像"});
												}
											}
											found = true;
											break;	// for-loop
										}
									}
								});
								if(!found) {
									var data = {type: "draft", draftIdx: idx, enable: false};
									if(subDocType.length > 0)
										data.rsrcFile = "找不到符合文別(" + docType + " - " + subDocType + ")的排版設定檔";
									else
										data.rsrcFile = "找不到符合文別(" + docType + ")的排版設定檔";
									$("<li><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align:middle' disabled>" + fm.getDraftName(idx) + "</li>").appendTo($ul)
										.on('click', onClickDraft)
										.data("info", data);
									
									if(dm.hasMailMergeVars()) {	// 2016.10.27 有分繕變數時
										$("<li style='padding-left:30px'><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align:middle'" + ((idx == currIdx)?" checked":"") + ">分繕變數表</li>").appendTo($ul)
											.on('click', onClickMailMerge)
											.data("info", {
												type: "mailmerge",
												draftIdx: idx,
												enable: idx == currIdx,
												});
									}
									
									var m = fm.getDraftAttCounts(idx);
									for(var k=0; k<m; k++) {
										var l = fm.getAttPageCounts(idx, k);
										if(l > 0) {
											$("<li style='padding-left:30px'><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align:middle'" + ((idx == currIdx)?" checked":"") + ">" + fm.getDraftAttName(idx, k) + "</li>").appendTo($ul)
												.on('click', onClickAtt)
												.data("info", {
													type: "attach",
													draftIdx: idx,
													attIdx: k,
													enable: idx == currIdx,					// 2016.10.27 目前文稿才勾選
													//printSealMark: true,					// 列印騎縫章, 2016.9.26 改成預設true
													printSealMark: (allowUseSealMark == false)?false:true,	// 列印騎縫章, 1120608 Raymond 1120515 若禁用騎縫章則預設成false
													printSealMarkAtSamePos: false,			// 列印騎縫章在相同位置
													printBarcode: true, 					// 列印條碼, 2016.9.26 改成預設true
													printPageNo: true,						// 列印頁碼, 2016.9.26 改成預設true
													printWaterMark: (enableSpecialWaterMark && sec.match(/密/g))?true:false	// 列印浮水印, 1110615 Raymond 1110416 合併一代1030961, 依當件文稿密等設定列印密件浮水印
													});
										}
										else {
											theLogger.warn("附件無頁面");
											$("<li style='padding-left:30px'><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align:middle' disabled>" + fm.getDraftAttName(idx, k) + "</li>").appendTo($ul)
												.on('click', onClickAtt)
												.data("info", {
													type: "attach",
													draftIdx: idx,
													attIdx: k,
													enable: false,
													msg: "此附件無頁面影像"});
										}
									}
								}
							}
							else {	// 來文
								$("<li><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align:middle'" + ((idx == currIdx)?" checked":"") + ">" + fm.getDraftName(idx) + "</li>").appendTo($ul)
									.on('click', onClickDraft)
									// 1090310 Raymond 1081103 修正有來文及文稿時, 點全選, 來文不會勾選的問題
									//.data("info", {type: "fromdoc", draftIdx: idx, enable: true});
									.data("info", {type: "fromdoc", draftIdx: idx, enable: idx == currIdx});
								
								var m = fm.getDraftAttCounts(idx);
								for(var k=0; k<m; k++) {
									var l = fm.getAttPageCounts(idx, k);
									if(l > 0) {
										$("<li style='padding-left:30px'><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align:middle'" + ((idx == currIdx)?" checked":"") + ">" + fm.getDraftAttName(idx, k) + "</li>").appendTo($ul)
											.on('click', onClickAtt)
											// 1090310 Raymond 1081103 修正有來文及文稿時, 點全選, 來文不會勾選的問題
											//.data("info", {type: "attach", draftIdx: idx, attIdx: k, enable: true});
											.data("info", {type: "attach", draftIdx: idx, attIdx: k, enable: idx == currIdx});
									}
									else {
										theLogger.warn("附件無頁面!");
										$("<li style='padding-left:30px'><input type='checkbox' data-enhanced='true' style='width:22px; height:22px; vertical-align:middle' disabled>" + fm.getDraftAttName(idx, k) + "</li>").appendTo($ul)
											.on('click', onClickAtt)
											.data("info", {type: "attach", draftIdx: idx, attIdx: k, enable: false, msg: "此附件無頁面影像"});
									}
								}
							}
							doNext(idx + 1);	// 處理下一筆文稿
						})
						.fail(function(errorText, idx) {
							theLogger.error(errorText);
							alert(errorText);
							doNext(idx + 1);	// 處理下一筆文稿
						});
				}
				else
					dfd.resolve();
			}
			doNext(0);	// 開始處理第1筆文稿
			return dfd.promise();
		}
		
		$.modal($dlg, {
			appendTo: $viewPort.closest("#home,#viewDoc"),	//2016.10.14	Leslie	add ",#viewDoc" for AKI802&ODT351文稿編輯
			//overlayCss: {width: w, height: h},
			containerCss: {width: "700px", height: "600px"},
			onShow: function() {
				//if(fm.getSignType() == "E")	// 2017.3.10 新增列印簽核資訊頁選項, 線上簽核公文預設打勾
				//	$dlg.find("#chkPrintSignObjPages").prop("checked", true);
				
				// 取出目前公文的文稿及附件等項目, 2016.9.8 改成Deferred模式, 因為要預設列印參數需要先非同步下載文稿
				prepopulate($dlg.find("ul#itemList"))
					.done(function() {
					
					// 1141003 Raymond 1141114 新增判斷機關暱稱為「TAITRA」(外貿)時, 「列印字型」下拉選單設為disabled
					if(SSO_CONFIG.OrgNickName == "TAITRA")
						$dlg.find("#printFont").prop("disabled", true);
					
					$dlg.trigger("create");
					
					/*$dlg.find("ul[data-role='listview']").children("li").on("click", function() {
						if($(this).hasClass("ui-btn-active"))
							return true;
						$(this).closest(".ui-listview").find(".ui-btn-up-e").removeClass("ui-btn-up-e").addClass("ui-btn-up-c");
						$(this).removeClass("ui-btn-up-c").addClass("ui-btn-up-e");
						
						var id = $(this).find("input").attr("id");
						if(typeof id === "string")
							onChangeItemPane(id);
						return false;
					});*/
					$dlg.find("#draft1").closest("li").removeClass("ui-btn-up-c").addClass("ui-btn-up-e");
					
					$dlg.find("#receiverSelect").closest(".ui-select").css("width", "50%");
					//$dlg.find("#printXsl").trigger('change');
					
					$dlg.find("ul[data-role='listview']").children("li").each(function(idx, li) {	// 2016.10.28 選取目前文稿
						var nfo = $(li).data("info");
						// 1090310 Raymond 1081103 修正目前文稿為來文時, 來文項目未反白及右側面板未對應顯示為空白
						//if(nfo && nfo.type == "draft" && nfo.enable) {
						if(!!nfo && nfo.enable) {
							$(li).trigger('click');
							return false;
						}
					});
					
					// 1090310 Raymond 1081103 調整全選按鈕的CSS
					$dlg.find("#chkAllDrafts").closest(".ui-checkbox").css("margin-top", "0px");
					$dlg.find("label[for='chkAllDrafts']").removeClass("ui-corner-all");
				});
			},
			// 1110524 Raymond 1110528 順便修正關閉子視窗時移除搜尋結果popup元素
			onClose: function() {
				$("#searchReceiversResult").popup("destroy");
				$.modal.close(); // must call this!
				// 1110722 Raymond 1110416 關閉子視窗時若匯出附件頁面的載入訊息仍在, 須關閉
				if(enableSpecialWaterMark)
					SSOUtil.loading("hide");
				// 1120417 Raymond 考試院序17 列印前將分頁視窗標題改成了預設另存檔名, 關閉列印子視窗時要將分頁視窗標題改回來
				document.title = "電子公文系統";	// 列印完畢恢復為原來的分頁視窗標題
			}
		});
	});
	}	// end of proceedPrint function
};

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-PrintFolio.js").finish();
})();