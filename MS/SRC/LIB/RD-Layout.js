/* jshint -W100 */
// DATE		SA			PRG			MGR_NO		DESC
// 1060516	Raymond		Raymond		1060286		迴避Chrome 57+列印時邊界區的Table的margin-top不會套用的bug
// 1060603	Raymond		Raymond		1060428		修正跨頁的條列且為頁首欄位時, 列印時後半部不會顯示的問題
// 1060608	Raymond		Raymond		1060474		修正節點文字中有「<」、「>」字元時, 在列印頁面會變成標籤問題
// 1060614	Raymond		Raymond		1060471		修正若Img物件的圖檔路徑為固定寫為C:\2100\公文製作, 則置換為目前資源檔的根路徑
// 1060809	Raymond		Raymond		1060695		發文支號限制長度, 需改用INPUT
// 1060824	Raymond		Raymond		1060780		修復Chrome下TD寬度設定無效的問題
// 1060921	Raymond		Raymond		1060836		修正IE下主旨/段落/條列的文字有長英文會超出可顯示區域的問題
// 1060928	Raymond		Raymond		-------		新增macOS上的楷體對應字型名稱
// 1061002	Raymond		Raymond		1060891		翻頁後捲到頁面最上方
// 1070126	Raymond		Raymond		NCKU107173	修正IE下img沒有src或height屬性的話size會變很大, 導致以下的欄位超出頁面看不到的問題
// 1070202	Raymond		Raymond		1070103		修正先開最速件, 再開速件公文時, 公文夾底色仍保持紅色的問題
// 1070327	Raymond		Raymond		1070136		修正不預設自動加蓋對齊職名章的方向
// 1070329	Raymond		Raymond		1070414		修正Chrome下若段落位於表格中則將table-layout設為fixed即可防止整串段落內容都是追蹤修訂標籤時會撐大表格寬度的問題
// 1070503	Raymond		Raymond		1070555		修正未設定id屬性的欄位, 仍會取到id=null的問題
// 1070529	Raymond		Raymond		1070177		新增Combobox(op=9)要支援list屬性
// 1070914	Raymond		Raymond		1070729		修正IE在特定情況下末行不會顯示的問題, 及Chrome判定斷頁點以文字加上行高造成的空白距離為依據, 儘量接近IE的斷頁點
// 1071018	Raymond		Raymond		1070957		未指定英數字型的段落仍應預設為Times New Roman
// 1071026	Raymond		Raymond		1070620		新增支援樣版設定一般輸入欄位(type=0)的"disableKeyIn"屬性為"true"時, 禁止欄位手輸功能
// 1071129	Raymond		Raymond		-------		修正Chrome下行高1.0時, 條列跨頁的次頁首行仍殘留一點前頁末行的問題
// 1071222	Raymond		Raymond		-------		修正列印預覽時由於無樣式inline會切斷字串, 造成條列文字出現不正常斷行情況
// 1080123	Raymond		Raymond		1080097		修正列印追蹤修訂模式時, 顏色異常問題
// 1080215	Raymond		Raymond		1080169		修正Chrome新版(72.0.3626.109)在WIN10下列印預覽後, 主旨/段落/條列首行凸排超出左邊範圍會被隱藏掉第1個字的問題
// 1080219	Raymond		Raymond		-------		修正獎懲令對齊冒號部分次行縮排不夠(應再靠右縮一點), 不太對齊的問題
// 1080319	Raymond		Raymond		1080195		處理一個追蹤修訂標籤包含2個字以上的情況新增判斷文字包含Surrogate Pair的真正字數是否超過1
// 1080401	Raymond		Raymond		1080262		修正設定justify的Para, 末行或單行未分散對齊的問題
// 1080507	Raymond		Raymond		1080262		修正加半形空白後仍單字成行的問題
// 1080515	Raymond		Raymond		1080353		迴避Chrome 73+列印時邊界區的Para的margin-top不會套用的bug
// 1080716	Raymond		Raymond		1080536		修正斷頁首行有margin-top高度時, 該頁最末行可能會被截一半的問題
// 1080923  Kevin       Eric        1080339     jQuery 3.0 upgrade
// 1081025	Raymond		Raymond		1080945		修正段落跨頁是行底超過有效高度情況時未記錄from、fromPos造成段落在跨頁的第一頁未顯示問題
// 1081216	Raymond		Raymond		-------		修正更新至Chrome 79版後, 設定無邊界列印時會發生文稿頁面後多產生一頁空白頁的問題, 猜測是誤判297mm超過可列印高度
// 1081227	Raymond		Raymond		1081135		修正正副抄本段落誤判斷頁位置造成頁尾會出現截上半部顯示的受文者的問題, 並順便修正IE下若段落設定文字對齊方式為start, 不會靠左對齊的問題
// 1081230	Raymond		Raymond		1081089		修正開啟公文時若縮放比控制項未初始化完成, 會發生錯誤無法翻頁的問題
// 1080107	Raymond		Raymond		1081091		修正列印在1個fmt標籤內有2個以上字元的草稿時, 會變成無樣式的問題
// 1090131	Raymond		Raymond		1090055		修正DocView內嵌AOL時, 排版出現垂直Scrollbar導致次頁多一行前頁的末行的問題
// 1090226	Raymond		Raymond		1090116		人事令函的條列對齊冒號功能新增派兼令、函類別=獎懲建議函、令類別=獎懲令
// 1090317	Raymond		Raymond		1090116		修正IE下人事令函的條列在列印分頁未對齊冒號問題
// 1090317	Raymond		Raymond		-------		修正IE下列印跨頁的條列時, 未排除回報整個DIV大小的矩形資訊, 導致整個條列移到次頁顯示的問題(應屬1070729衍生問題)
// 1090319	Raymond		Raymond		1090164		修正IE下(署請辦單)主旨/段落的文字因textIndent沒有多減1px, 造成向下移一行的問題
// 1090408	Raymond		Raymond		1090254		修正當設有margin-top的TABLE為次頁的第一個元素時, 斷頁點判斷未減掉該TABLE元素的margin-top, 會造成記錄在XSignObjs.xml的簽核區域的top座標值較小, 列印時會發生簽核物件向上位移的問題
// 1090422	Raymond		Raymond		1090252		修正人事令函當冒號為該條列的最末字時不要設定縮排, 以避免冒號靠近右邊界至無法容納下一個字時, 整行會位移至第二行的問題
// 1090428	Raymond		Raymond		1090320		修正列印時條列的對齊父段落設定未套用問題
// 1090714	Raymond		Raymond		1090477		修正Chrome及IE下頁面末行的條列可能誤判超出或正好壓在頁面下緣, 造成該條列提前跨頁與歷史檢視的匯出頁面不一致的問題
// 1090717	Raymond		Raymond		CDC序152	修正當騎縫章是橫向時, 轉直向後在IE環境下會因為重設為反推邊界距離, 導致騎縫章靠左跑壓到內文的問題
// 1090813	Raymond		Raymond		1090467		若是表格TR有限制row-height高度, 須將表格TD內的主旨或段落調整成absolute, 以與歷史檢視的匯出頁面呈現一致
// 1090908	Raymond		Raymond		-------		修正iPad下可能發生動態Render簽核區域時取得的高度為0的情形, 導致重設高度為-2px, 變一直線的問題
// 1090922	Raymond		Raymond		1090694		修正iPad下點擊簽核框, 頁面上第1個可視元素(例:發文機關全銜)若為可編輯狀態, iPad會將focus設在該元素, 導致軟體鍵盤浮上來的問題
// 1090929	Raymond		Raymond		1090467		修正表格中有主旨或段落的儲存格固定高度功能在設定垂直置中時, 主旨或段落內容會從儲存格垂直方向中間往下顯示的問題
// 1090907	Raymond		Raymond		1090564		新增讀取下拉式選單套用list清單時的額外sync-path-*屬性, 以支援DataXML設定選單項目的額外屬性值回寫至額外的欄位
// 1091016	Raymond		Raymond		1090621		合併FDA單號1090507, 修正令段落及條列的凸排計入字距, 及靠左對齊
// 1091026	Raymond		Raymond		1090735		修正樣版設定了首頁下邊界區高度大於一般下邊界區高度時, 分頁邏輯未判斷首頁正確斷頁點及首頁上下邊界區在IE下列印未反推的問題
// 1091218	Raymond		Raymond		1090564		修正樣版未設定下拉選單(op=1)的清單名稱(list)時會發生Error的問題(鐵道局警急叫修)
// 1091223	Raymond		Raymond		1090735		Chrome 87又出現1060286問題了, 修改迴避方式為增加一個DIV取代margin-top的高度
// 1091225	Raymond		Raymond		信保序122	修正段落條列字型小於普通的16級時(信保為14級), 縮小字距以避免簽核頁面的折行處與歷史檢視的頁面呈現不一致問題
// 1091229	Raymond		Raymond		1090602		修正當簽核區域左邊界設定小於0(凸出簽核框)時, 不會顯示為凸出的問題
// 1100112	Raymond		Raymond		1090931		修正Chrome下列印發生跨頁的段落條列跑到次頁問題
// 1100112	Raymond		Raymond		1090735		修正一般下邊界在設有首頁下邊界而內文跨到第2頁, 導致bodyRegion高度縮減, 而發生頁碼等一般下邊界區物件往上跑的問題
// 1100122	Raymond		Raymond		信保序188	修正簽核區域在一般邊界區時, 文稿(收文簽辦單)新增至2頁以上(後面都空白頁)後簽核區域內的簽核物件翻頁再翻回首頁時會不見的問題
// 1100126	Raymond		Raymond		信保序188	修正簽核區域在下邊界區時, 列印時簽核區域內的簽核物件會跑到頁面上方問題
// 1100126	Raymond		Raymond		1090927		修正FireFox下未限制表格高度、條列跨頁時未正確斷頁問題
// 1100226	Raymond		Raymond		1090931		修正Chrome下人事令函的條列對齊冒號功能無效問題, 一併修正一般文別在Chrome下顯示比例為110%時列印, 於列印分頁再點右鍵選單的列印時, 列印子視窗中條列文字會空一行的問題, 一併修正人事令函的條列隱藏標號又無冒號又設定對齊父段落時未對齊父段落的問題
// 1100304	Raymond		Raymond		1090931		修正Chrome下令的條列凸排功能無效問題, 及IE下令條列寬度沒有到flow區右邊界的問題
// 1100308	Raymond		Raymond		1090836		單複選互動模式(op=5/4)新增參數: 1.hide-text設為true時表示隱藏選項文字, 未設定時會顯示選項文字, 2.check-mark為自訂勾選字元, 設定2個字則第1個字代表勾選狀態時的顯示字元, 第2個字代表未勾選狀態的顯示字元, 只設定1個字則該字代表勾選狀態的顯示字元, 未勾選狀態的顯示字元則自動以全形空白代表
// 1100310	Raymond		Raymond		1090602		修正簽核區域的高度計算應扣除下邊界寫錯成右邊界的問題, 以及邊界區的簽核區域若設定space-before或space-start為負值時, 會造成選用章戳連帶加蓋的職名章、代字章位置往上、左徧移的問題
// 1100317	Raymond		Raymond		-------		修正table-cell、sign-area的高、寬度若設定小數點時, 套用後會變整數的問題
// 1100322	Raymond		Raymond		-------		修正表格中的段落在列印時, 可能段名寬度實際上有小數點, 但算出來的整數寬度小於實際寬度(四捨五入?), 若凸排未多-1px的話, 可能導致段落文字被擠到次行變上下2行, 而上一行的段名變分散對齊的問題
// 1100323	Raymond		Raymond		1090857		新增分頁完同時將總頁數記錄在DraftMgmt.xml, 以供客委會檢核2頁以上時「摘要」不可為空需求
// 1100325	Raymond		Raymond		1090804		修正人事令函第二個(含)以後的段落(說明、附註...etc)皆不要對齊全形冒號
// 1100408	Raymond		Raymond		1100308		修正Chrome環境下產生列印分頁的pg的flow的overflow屬性為hidden(原只有overflow-y是hidden), 以避免用右鍵列印功能時, 行末應折行處的字元若是「全形空白」, 預覽分頁沒出現水平scrollbar但瀏覽器的列印預覽子視窗會出現水平scrollbar的問題
// 1100505	Raymond		Raymond		1100498		修正當頁面包括影像放大顯示比例(200%)時, 會變模糊的問題
// 1100514	Raymond		Raymond		1100469		修正在某些電腦的Chrome環境下, 標題字體會比em寬一點點, 只設定凸排幾em的話會導致空間不夠寬而把文字擠到次行, 分散對齊時標題字串會填满整行, 造成後面計算實際凸排寬度時抓成整行寬度, 而發生主旨/段落文字變一個字寬的直行問題
// 1100521	Raymond		Raymond		1100480		修正內文若同一條列出現"裝"、"訂"、"線"3字, 會發生向左旋轉90度問題, 及修正裝訂線未旋轉或旋轉後未分散對齊問題
// 1100602	Raymond		Raymond		1100531		目前版本瀏覽器(Chrome、Firefox、IE)已能對中文標點符號避頭尾, 故不再需要加工避頭尾功能
// 1100604	Raymond		Raymond		1100594		修正在某些電腦的Chrome環境下, 標題字體會比em寬一點點, 只設定凸排幾em的話會導致空間不夠寬而把文字擠到次行, 導致主旨變一直行, 條列標號字串自己成一行的問題
// 1100618	Raymond		Raymond		1100482		BuildEditController()新增回傳值, 回傳false表示此欄位唯讀, 不允許異動, 無回傳值(undefined)則可異動(視整筆文稿是否唯讀而定), 以支援簽稿會核單僅允許異動案情摘要(主旨)欄, 其他欄位禁止異動的需求
// 1100628	Raymond		Raymond		1100692		修正Chrome下段落/條列的段落屬性行高設為1.0或0.9時, 取得的ClientRect的高度都會大於line-height(固定24px!?), 而pad都會是負值, 修正ClientRect範圍, 及避開1081135的正副抄本修正邏輯
// 1100812	Raymond		Raymond		1101017		修正醫策會的簽無簽核框, 若不顯示說明段落時, 解密條件的下拉選單會被遮掉下半部的問題
// 1100827	Raymond		Raymond		1100925		修正Chrome下, 行高可能有小數點, 而計算得到的行距可能略大於行高, 而未能計算出正確的斷頁點, 導致首行若是空行, 頁末的條列可能被遮住一半未顯示的問題
// 1100908	Raymond		Raymond		1100799		修正Chrome下唯讀資料夾的公文不顯示序號的條列, 也會回傳rcs[0]是整個DIV的大小, 導致誤判被移至次頁顯示的問題
// 1101012	Raymond		Raymond		-------		修正IE下若第一個Row的最後一個Cell有設定寬度跟ColSpan(ex.簽稿會核單), 會發生第一個Cell寬度異常的問題
// 1101029	Raymond		Raymond		1101199		修正Chrome V94、95版列印預覽時有些標楷體字型會破字的問題, 依新增的參數useCNSFont決定是否額外新增指定"全字庫正楷體"字型
// 1101101	Raymond		Raymond		1100991		修正弱掃Client Potential XSS
// 1101105	Raymond		Raymond		1101199		修正邊界區文字在Chrome V94、95版列印預覽時有些標楷體字型會破字的問題, 依新增的參數useCNSFont決定是否額外新增指定"全字庫正楷體"字型
// 1101224	Raymond		Raymond		1101541		修正Chrome在目前版本(96版)及以後版本, 在放大縮放比例下取得畫面上元素大小有小數點誤差, 導致斷頁判斷錯誤, 而發生2頁變成3頁的問題
// 1110121	Raymond		Raymond		1101497		新增支援樣版檔設定的儲存格分割線(split-lines), 設定有分割線的儲存格, 顯示一條左上至右下的對角線, 且第一個標題文字(para)調整左邊界成略靠右對齊效果, 第二個標題文字(para)調整右邊界成略靠左對齊效果, 目前只支援一條分割線, 故第三個以後(若有的話)的標題文字(para)不處理其styles
// 1110419	Raymond		Raymond		1110425		新增支援樣版檔的inline元素可設定id, 系統會用此id判斷是否符合特定名稱(ex.主旨、段落)來啟用特定功能(ex.儲存格以TR的指定高度來限制最大高度,使儲存格內容即使超出高度也不會撐高TR,導致表格跨頁問題)
// 1110421	Raymond		Raymond		1110425		新增判斷若儲存格設定了垂直置中, 計算超出上邊框高度, 與匯出頁面呈現一致
// 1110506	Raymond		Raymond		1110475		修正當列印頁首行是設定了上邊界大於0的欄位(ex:正本), 而其內容長度過長需跨頁時, 因斷頁未計入此上邊界距離, 造成次頁的第一行不顯示或只顯示下半部的問題
// 1110523	Raymond		Raymond		-------		修正Chrome下, 次頁首行若是回報ClientRect第1個為Element全高, 而改用第2個ClientRect計算斷頁時, 列印功能因誤判而採用第1個ClientRect當作上一行, 而使計算斷頁位置太大不正確的問題(造成聯大問題案例文稿簽核時應呈現3頁, 列印時呈現2頁)
// 1110627	Raymond		Raymond		1110271		新增判斷若SSO_CONFIG.js啟用稿件間加蓋騎縫章功能, 下載騎縫章並記錄在特定物件供RD-AOLPrint.js使用, 騎縫章使用的文號改以sealMarkDocNo全域變數提供給RD-AOLPrint.js使用
// 1110712	Raymond		Raymond		1110666		修正令稿套用在「主旨：」不隱藏的樣版時, 主旨的文字會跳到下一行顯示的問題
// 1110718	Raymond		Raymond		1110625		修正列印時, 條列的凸排與簽核頁面不一致, 導致可能發生多折行一個字的問題, 及Chrome下回傳的rcs會是各行不含行高的淨大小, 造成斷頁判定與IE或GenPage不一致的問題
// 1110801	Raymond		Raymond		考試院序147	新增令類別=人事令為人事令函(第一段落的條列次行會自動對齊冒號)
// 1110802	Raymond		Raymond		1110796		修正簽PrintXSL若沒有"發文機關"選單欄位, 不會觸發Common.fnInitIssueSoureOrg檢查不存在的發文機關而自動重設為DataXML機關選單的第一筆的問題
// 1110803	Raymond		Raymond		1110796		修正文稿沒有"NewDraft"屬性的問題
// 1110817	Raymond		Raymond		考試院序206	修正主旨在簽核頁面與列印分頁時, 標題寬度不一致造成折行不一致的問題
// 1110823	Raymond		Raymond		1110771		修正行高為1時, 在Chrome環境下計算inline的高度會超出line-height的高度, 導致頁尾出現一行字只顯示上半部問題
// 1110824	Raymond		Raymond		考試院序225	修正簽核頁面主旨/說明/擬辦標題左邊被切到一點點的問題
// 1110829	Raymond		Raymond		1110725		修正若點到子文無任何文稿, 再點回母文loading訊息會一直顯示無任何文稿的訊息的問題
// 1110829	Raymond		Raymond		考試院序206	修正有()層級的條列會提前一個字折行的問題
// 1110902	Raymond		Raymond		1111044		新增依系統參數「AOL_HIDE_SIGNAREA_BORDER」設定是否隱藏簽核區域的紅色虛線框(框線顏色設為透明色), Y:隱藏, N或未設定:顯示
// 1110920	Raymond		Raymond		鐵道局序293	修正鐵道局的代判部稿函(稿)的PrintXSL樣版的發文機關全銜不是a, 補上dummyOrgList後未補上原本文稿檔的發文機關全銜, 導致Common.fnInitIssueSoureOrg檢查不存在的發文機關而自動重設為DataXML機關選單的第一筆的發文機關及地址的問題
// 1110927	Raymond		Raymond		1110990		新增令條列支援對齊父段落功能
// 1110928	Raymond		Raymond		陸委會序298	修正判斷是否為下標字, 若是則取本行首的top為下標字的top, 以避免斷頁斷在下標字的top, 造成同一行的正常字被切成上下一半
// 1111004	Raymond		Raymond		陸委會序319	修正當行首就是下標字時, 斷頁點未往後找正常字的top, 導致此行下標字正確顯示在次頁但正常字的上半部顯示在前頁的問題
// 1111014	Raymond		Raymond		陸委會序334	修正簽核頁面位於頁尾的多行條列在隱藏標號後, 應跳至次頁的行次未跳頁而呈現僅顯示上半部的問題
// 1111026	Raymond		Raymond		陸委會序347	修正Chrome/Edge下某些案例的條列文字在瀏覽器的列印預覽介面中比列印分頁提前一個字斷行的問題(陸委會序332修正後的衍生問題)
// 1111212	Raymond		Raymond		修正裝訂線設為僅首頁顯示(show-in-page="1")時, 翻頁會因發生Error而轉圈圈的問題
// 1120607	Raymond		Raymond		1120515		新增判斷環境變數「WE_ALLOW_USE_SEALMARK_ROLES」是否有設定, 若有設定則判斷目前公文的OwnRoleID是否符合設定之一, 若不符合則簽核頁面不顯示騎縫章, 未設定此環境變數時簽核頁面一律顯示騎縫章
// 1120712	Raymond		Raymond		標檢局序117	阿拉伯數字格式的頁碼由全形數字修正為半形數字
// 1120817	Raymond		Raymond		1120503		支援自訂表格排版
// 1120824	Raymond		Raymond		標檢局序148	修正當樣版的開會事由設為分散對齊時, 若開會事由文字行尾含英數而提前折行, 分散對齊會連「開會事由：」標題文字一起分散, 造成冒號的位置與「開會時間：」等欄位的冒號位置不一致的問題
// 1120830	Raymond		Raymond		標檢局序121	修正列印時, 行高設為1.0, 跨頁的條列在前一頁頁尾會顯示部分次頁首行的上半部, 下一頁的頁首會顯示被截掉部分上半部的跨頁第一行的問題
// 1120920	Raymond		Raymond		1120785		取消主旨欄位重設凸排寬度的處理(考試院111年問題序206), 以修正在簽核頁面的主旨扣掉標題寬度後與列印頁面的主旨扣掉標題寬度後剩下內容的寬度不一致(簽核頁面較窄), 導致折行點不同造成行數不同(簽核頁面多一行), 而使列印頁面少一頁的問題
// 1121005	Raymond		Raymond		北大序254	修正開會事由在列印時與簽核頁面斷行位置不一致的問題
// 1121006	Raymond		Raymond		北大序256	重新整理稿面時, 新增檢核若是文別轉換觸發的, 則需重新整理條列序號
// 1130104	Raymond		Raymond		1121043		修正切換文稿或重新整理稿件頁面時不要依文稿的速別及密等變換公文夾顏色
// 1130124	Raymond		Raymond		1120887		新增支援簽稿會核單會辦單位編輯區及簽核區域可自動增高功能
// 1130304	Raymond		Raymond		1121125		修正某案例函稿在分繕列印時, 某些受文者的正本欄位受文者會少顯示一行半(因為條列行高24px, 受文者行高16px, 誤判一行條列會影響一行半受文者)的問題
// 1130319	Raymond		Raymond		1121074		令的段落及條列取消強制靠左對齊(排版設定檔改回分散對齊就會分散對齊, 不改就會靠左對齊)
// 1130322	Raymond		Raymond		1130204		修正在iPad下, 超過單行高度的行RECT(通常是代表整個條列)未排除, 導致超出頁面下緣的條列整個切到次頁顯示的問題(應該從中間行數才切到次頁顯示)
// 1130702	Raymond		Raymond		1130293		修正列印時若主旨或段落條列中有追蹤修訂的<ins>內有換行字元, 會列印出斷行效果的問題
// 1130711	Raymond		Raymond		1130512		分散對齊偵測到單字成行時會將letter-spacing增加0.01em, 新增重試10次機制, 以解決只加0.01em仍單字成行的問題
// 1130826	Raymond		Raymond		1120887		修正邊界區的表格內有段落寫法時會需要呼叫getSupportSALP方法, 若無的話會轉圈圈的問題(目前只發現成大的簽稿會核單有此用法)
// 1131022	Raymond		Raymond		屏東序1152	桌機時將perspective-origin:bottom加回來, 以免翻頁時scrollbar突然變長翻頁完再縮回去
// 1140312	Raymond		Raymond		1140212		修正判斷前一行不是整個DIV大小的條件為1.5行高度
// 1140522	Raymond		Raymond		1140722		修正iPad在最末頁翻下頁或最前頁翻上頁時, 出現「已無次頁」或「已無前頁」訊息後, 偶而會再顯示轉圈圈圖示的問題
// 1140522	Raymond		Raymond		1131241		新增支援樣版設定一般輸入欄位(type=0)的"show99AsForever"屬性為"true"時, 當欄位內容是'99'時, 改顯示成'永久'
// 1140527	Raymond		Raymond		1140321		新增若頁面已捲至最上端再往下撥要自動翻上一頁, 及頁面已捲至最下端再往上撥要自動翻下一頁功能
// 1140618	Raymond		Raymond		1140166		合併1130291, 新增支援無jQM、zoomController、thePublicRsrc環境(RD-DocCompare網頁), 及電子交換章影像(來文DI)功能
// 1140619	Raymond		Raymond		1140876		全域阻擋翻頁時, 判斷僅行動平台阻擋翻頁, 非行動平台則記錄螢幕支援觸控狀況
// 1140711	Raymond		Raymond		1140958		新增會銜令也要比照令條列凸排方式
// 1140718	Raymond		Raymond		屏東序1449	拖拉滑鼠移動時, 偵測若有選取文字, 不要觸發翻頁
// 1150203	Raymond		Raymond		1150101		新增判斷為署名欄位時, 新增sign class
// 1150515	Raymond		Raymond		1150371		修正重新整理時, 若是因為切換追蹤修訂模式觸發的話, 額外傳入參數, 以避免標記文稿異動, 及縮放比例非100%時取得的邊界區的簽核區域的位置座標與100%時取得的不一致的問題

// flip plugin
// 1150515 Raymond 1150371 新增額外參數exflag, 目前僅定義"tcmode", 代表觸發options="refresh"的原因是切換追蹤修訂模式顯示的關係
//	2015.11.10 - Raymond, 增加對應SSO_CONFIG.logLevel的修改
//  2015.12.15 - Raymond, 改用theLogger記錄LOG資訊
//$.fn.flip = function(options) {
$.fn.flip = function(options, exflag) {
	
	return this.each(function() {
		
		function onFlipLeft(event) {
			theLogger.log("on" + event.type + ": ");
			if(window.blockSwiping) {	// 2015.4.14 - gesture操作期間會把全域變數設為true, 觸控翻頁功能暫時停用
				theLogger.warn("全域變數被設為阻擋翻頁");
				// 1140619 Raymond 1140876 全域阻擋翻頁時, 判斷僅行動平台阻擋翻頁, 非行動平台則記錄螢幕支援觸控狀況
				//return;
				var isMobile = navigator.userAgent.search(/Mobile/gi) > 0;
				if (!isMobile && !window.realMac)
					isMobile = navigator.userAgent.search(/Macintosh/gi) > 0;
				if(isMobile)
					return;
				theLogger.log("螢幕是否支援觸控: maxTouchPoints=" + navigator.maxTouchPoints + ", isMobile=" + isMobile + ", $.mobile.support.touch=" + $.mobile.support.touch);
			}
			var ctx = $(this).data("flipCtx");
			theLogger.log(ctx);
			
			if(ctx.flipping())	// 2015.5.12 - 阻擋短時間反覆翻頁
				return;
			ctx.flipping(true);
			
			var now = new Date();
			theLogger.log(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "." + now.getMilliseconds() + " - Begin reqNextPage");
			SSOUtil.loading("show"); //showPageLoadingMsg();
			ctx.reqNextPage($pages.find("#pgBackBuffer, #uvpgFrontFace"))
				.done(function() {
					$pages.css("perspective", "1900px");	// 1100505 Raymond 1100498 設定這個樣式才有3D翻頁特效, 但在頁面包括影像放大顯示比例時, 會變模糊
					//$.mobile.hidePageLoadingMsg();	// 2015.5.12 - 載入中圖示延後到翻頁動畫結束後再隱藏, 暗示尚在翻頁中
					// swap 1
					now = new Date();
					theLogger.log(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "." + now.getMilliseconds() + " - Finish reqNextPage");
					var pc = $pages.find("#pgFrontFace, #uvpgFrontFace").children()[0];
					//assert(pc);
					$pages.find("#pgFlippedIn, #uvpgFlippedIn").css("z-index", "").append(pc)
						.one("transitionend", function(evt) {
							var $this = $(this);
							//$this.off("webkitTransitionEnd", arguments.callee);
							now = new Date();
							theLogger.log(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "." + now.getMilliseconds() + " - on" + evt.type);
							// swap 2
							$pages.find("#pgFrontFace, #uvpgFrontFace").append($pages.find("#pgBackBuffer, #uvpgBackBuffer").children()[0]);
							// remove invisible content and resume pgFlippedIn
							$this.children().remove();
							$this.css("z-index", "0").removeClass("out");
							$pages.css("perspective", "");	// 1100505 Raymond 1100498 翻頁完畢後取消這個樣式, 在頁面包括影像放大顯示比例時, 才會恢復清晰
							if(ctx.hasPrevPage())
								$pages.find("#pgFlippedOut, #uvpgFlippedOut").css("display", "");
							else
								$pages.find("#pgFlippedOut, #uvpgFlippedOut").css("display", "none");
							
							// 1061002 Raymond 1060891 新增翻頁須捲至上半頁
							if($pages.closest(".contentPane").length > 0)
								$pages.closest(".contentPane").prop("scrollTop", 0);
							
							// 通知頁面已翻
							ctx.pageFlipped($pages.find(".pg"), $pages);	// 2016.1.27 新增$pages參數, 公文基資頁面不會有.pg類別
							
							SSOUtil.loading("hide"); //hidePageLoadingMsg();	// 2015.5.12 - 載入中圖示延後到翻頁動畫結束後再隱藏, 暗示尚在翻頁中
							ctx.flipping(false);	// 2015.5.12 - 恢復翻頁
						})
					setTimeout(function() {
						$pages.find("#pgFlippedIn, #uvpgFlippedIn").addClass("out");
					}, 0);
				})
				.fail(function(errorText, fallback) {	// 2015.12.29 新增翻頁失敗時回呼函式參數
					SSOUtil.loading("hide"); //hidePageLoadingMsg();
					// 1140522 Raymond 1140722 修正iPad在最末頁翻下頁時, 出現「已無次頁」訊息後, 偶而會再顯示轉圈圈圖示的問題
					setTimeout(function() {
					alert(errorText);
					}, 50);
					
					// 2015.12.29 新增翻頁失敗時檢查是否有提供第2個fallback參數, 若有則回呼
					if(!!fallback && $.isFunction(fallback))
						fallback();
					
					ctx.flipping(false);	// 2015.5.12 - 恢復翻頁
				})
		}
		function onFlipRight(event) {
			theLogger.log("on" + event.type + ": ");
			if(window.blockSwiping) {	// 2015.4.14 - gesture操作期間會把全域變數設為true, 觸控翻頁功能暫時停用
				theLogger.warn("全域變數被設為阻擋翻頁");
				// 1140619 Raymond 1140876 全域阻擋翻頁時, 判斷僅行動平台阻擋翻頁, 非行動平台則記錄螢幕支援觸控狀況
				//return;
				var isMobile = navigator.userAgent.search(/Mobile/gi) > 0;
				if (!isMobile && !window.realMac)
					isMobile = navigator.userAgent.search(/Macintosh/gi) > 0;
				if(isMobile)
					return;
				theLogger.log("螢幕是否支援觸控: maxTouchPoints=" + navigator.maxTouchPoints + ", isMobile=" + isMobile + ", $.mobile.support.touch=" + $.mobile.support.touch);
			}
			var ctx = $(this).data("flipCtx");
			theLogger.log(ctx);
			
			if(ctx.flipping())	// 2015.5.12 - 阻擋短時間反覆翻頁
				return;
			ctx.flipping(true);

			var now = new Date();
			theLogger.log(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "." + now.getMilliseconds() + " - Begin reqPrevPage");
			SSOUtil.loading("show"); //showPageLoadingMsg();
			ctx.reqPrevPage($pages.find("#pgBackBuffer, #uvpgBackBuffer"))
				.done(function() {
					$pages.css("perspective", "1900px");	// 1100505 Raymond 1100498 設定這個樣式才有3D翻頁特效, 但在頁面包括影像放大顯示比例時, 會變模糊
					//$.mobile.hidePageLoadingMsg();	// 2015.5.12 - 載入中圖示延後到翻頁動畫結束後再隱藏, 暗示尚在翻頁中
					now = new Date();
					theLogger.log(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "." + now.getMilliseconds() + " - Finish reqPrevPage");
					// animation
					var pc = $pages.find("#pgBackBuffer, #uvpgBackBuffer").children()[0];
					//assert(pc);
					$pages.find("#pgFlippedOut, #uvpgFlippedOut").append(pc)
						.one("transitionend", function(evt) {
							var $this = $(this);
							//$this.off("webkitTransitionEnd", arguments.callee);
							now = new Date();
							theLogger.log(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "." + now.getMilliseconds() + " - on" + evt.type);
							
							$pages.find("#pgFrontFace, #uvpgFrontFace").children().remove();
							// swap buffer
							$pages.find("#pgFrontFace, #uvpgFrontFace").append($this.children()[0]);
							
							$this.removeClass("in");
							$pages.css("perspective", "");	// 1100505 Raymond 1100498 翻頁完畢後取消這個樣式, 在頁面包括影像放大顯示比例時, 才會恢復清晰
							if(ctx.hasPrevPage())
								$this.css("display", "");
							else
								$this.css("display", "none");
							
							// 1061002 Raymond 1060891 新增翻頁須捲至上半頁
							if($pages.closest(".contentPane").length > 0)
								$pages.closest(".contentPane").prop("scrollTop", 0);
							
							// 通知頁面已翻
							ctx.pageFlipped($pages.find(".pg"), $pages);	// 2016.1.27 新增$pages參數, 公文基資頁面不會有.pg類別
							
							SSOUtil.loading("hide"); //hidePageLoadingMsg();	// 2015.5.12 - 載入中圖示延後到翻頁動畫結束後再隱藏, 暗示尚在翻頁中
							ctx.flipping(false);	// 2015.5.12 - 恢復翻頁
						})
						.addClass("in");
				})
				.fail(function(errorText, fallback) {	// 2015.12.29 新增翻頁失敗時回呼函式參數
					SSOUtil.loading("hide"); //hidePageLoadingMsg();
					// 1140522 Raymond 1140722 修正iPad在最前頁翻上頁時, 出現「已無前頁」訊息後, 偶而會再顯示轉圈圈圖示的問題
					setTimeout(function() {
					alert(errorText);
					}, 50);
					
					// 2015.12.29 新增翻頁失敗時檢查是否有提供第2個fallback參數, 若有則回呼
					if(!!fallback && $.isFunction(fallback))
						fallback();
					
					ctx.flipping(false);	// 2015.5.12 - 恢復翻頁
				})
		}
		
		if(typeof options == "string") {
			var $pages = $(this);
			var ctx = $pages.find("#pgFrontFace, #uvpgFrontFace").data("flipCtx");
			theLogger.log(ctx);
			var now = new Date();
			if(options == "left") {
				//alert("向左翻頁");
				
				if(ctx.flipping()) {	// 2015.5.12 - 阻擋短時間反覆翻頁
					theLogger.warn("阻擋短時間內反覆翻頁");
					return;
				}
				ctx.flipping(true);
				theLogger.log(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "." + now.getMilliseconds() + " - 向左翻頁");
				SSOUtil.loading("show"); //showPageLoadingMsg();
				ctx.reqPage($pages.find("#pgBackBuffer, #uvpgBackBuffer"))
					.done(function() {
						$pages.css("perspective", "1900px");	// 1100505 Raymond 1100498 設定這個樣式才有3D翻頁特效, 但在頁面包括影像放大顯示比例時, 會變模糊
						//$.mobile.hidePageLoadingMsg();	// 2015.5.12 - 載入中圖示延後到翻頁動畫結束後再隱藏, 暗示尚在翻頁中
						now = new Date();
						theLogger.log(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "." + now.getMilliseconds() + " - 目標頁準備完成");
						// wait for animation finish
						$pages.find("#pgFlippedIn, #uvpgFlippedIn").css("z-index", "").append($pages.find("#pgFrontFace, #uvpgFrontFace").children()[0])
							.one("transitionend", function(evt) {
								var $this = $(this);
								//$this.off("webkitTransitionEnd", arguments.callee);
								now = new Date();
								theLogger.log(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "." + now.getMilliseconds() + " - on" + evt.type);
								// swap 2
								$pages.find("#pgFrontFace, #uvpgFrontFace").append($pages.find("#pgBackBuffer, #uvpgBackBuffer").children()[0]);
								// remove invisible content and resume pgFlippedIn
								$this.children().remove();
								$this.css("z-index", "0").removeClass("out");
								$pages.css("perspective", "");	// 1100505 Raymond 1100498 翻頁完畢後取消這個樣式, 在頁面包括影像放大顯示比例時, 才會恢復清晰
								if(ctx.hasPrevPage())
									$pages.find("#pgFlippedOut, #uvpgFlippedOut").css("display", "");
								else
									$pages.find("#pgFlippedOut, #uvpgFlippedOut").css("display", "none");
								
								// 1061002 Raymond 1060891 新增翻頁須捲至上半頁
								if($pages.closest(".contentPane").length > 0)
									$pages.closest(".contentPane").prop("scrollTop", 0);
								
								// 通知頁面已翻
								ctx.pageFlipped($pages.find(".pg"), $pages);	// 2016.1.27 新增$pages參數, 公文基資頁面不會有.pg類別
								
								SSOUtil.loading("hide"); //hidePageLoadingMsg();	// 2015.5.12 - 載入中圖示延後到翻頁動畫結束後再隱藏, 暗示尚在翻頁中
								ctx.flipping(false);	// 2015.5.12 - 恢復翻頁
							})
						setTimeout(function() {
							$pages.find("#pgFlippedIn, #uvpgFlippedIn").addClass("out");
						}, 0);
					})
					.fail(function(errorText) {
						SSOUtil.loading("hide"); //hidePageLoadingMsg();
						alert(errorText);
						
						ctx.flipping(false);	// 2015.5.12 - 恢復翻頁
					})
			}
			else if(options == "right") {
				//alert("向右翻頁");
				
				if(ctx.flipping()) {	// 2015.5.12 - 阻擋短時間反覆翻頁
					theLogger.warn("阻擋短時間內反覆翻頁");
					return;
				}
				ctx.flipping(true);
				theLogger.log(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "." + now.getMilliseconds() + " - 向右翻頁");
				SSOUtil.loading("show"); //showPageLoadingMsg();
				ctx.reqPage($pages.find("#pgBackBuffer, #uvpgBackBuffer"))
					.done(function() {
						$pages.css("perspective", "1900px");	// 1100505 Raymond 1100498 設定這個樣式才有3D翻頁特效, 但在頁面包括影像放大顯示比例時, 會變模糊
						//$.mobile.hidePageLoadingMsg();	// 2015.5.12 - 載入中圖示延後到翻頁動畫結束後再隱藏, 暗示尚在翻頁中
						now = new Date();
						theLogger.log(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "." + now.getMilliseconds() + " - 目標頁準備完成");
						// wait for animation finish
						$pages.find("#pgFlippedOut, #uvpgFlippedOut").append($pages.find("#pgBackBuffer, #uvpgBackBuffer").children()[0])
							.one("transitionend", function(evt) {
								var $this = $(this);
								//$this.off("webkitTransitionEnd", arguments.callee);
								now = new Date();
								theLogger.log(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "." + now.getMilliseconds() + " - on" + evt.type);
								
								$pages.find("#pgFrontFace, #uvpgFrontFace").children().remove();
								// swap buffer
								$pages.find("#pgFrontFace, #uvpgFrontFace").append($this.children()[0]);
								
								$this.removeClass("in");
								$pages.css("perspective", "");	// 1100505 Raymond 1100498 翻頁完畢後取消這個樣式, 在頁面包括影像放大顯示比例時, 才會恢復清晰
								if(ctx.hasPrevPage())
									$this.css("display", "");
								else
									$this.css("display", "none");
								
								// 1061002 Raymond 1060891 新增翻頁須捲至上半頁
								if($pages.closest(".contentPane").length > 0)
									$pages.closest(".contentPane").prop("scrollTop", 0);
								
								// 通知頁面已翻
								ctx.pageFlipped($pages.find(".pg"), $pages);	// 2016.1.27 新增$pages參數, 公文基資頁面不會有.pg類別
								
								SSOUtil.loading("hide"); //hidePageLoadingMsg();	// 2015.5.12 - 載入中圖示延後到翻頁動畫結束後再隱藏, 暗示尚在翻頁中
								ctx.flipping(false);	// 2015.5.12 - 恢復翻頁
							})
							.addClass("in");
					})
					.fail(function(errorText) {
						SSOUtil.loading("hide"); //hidePageLoadingMsg();
						alert(errorText);
						
						ctx.flipping(false);	// 2015.5.12 - 恢復翻頁
					})
			}
			else if(options == "swipeleft") {	// 2016.4.1 新增支援桌機翻頁功能
				onFlipLeft.call($pages.find("#pgFrontFace, #uvpgFrontFace").get(0), $.Event("swipeleft"));
			}
			else if(options == "swiperight") {	// 2016.4.1 新增支援桌機翻頁功能
				onFlipRight.call($pages.find("#pgFrontFace, #uvpgFrontFace").get(0), $.Event("swiperight"));
			}
			else if(options == "refresh") {	// 2016.7.21 新增刷新功能
				if(ctx.flipping()) {	// 2016.9.13 - 阻擋短時間反覆翻頁
					theLogger.warn("阻擋短時間內反覆翻頁");
					return;
				}
				ctx.flipping(true);
				SSOUtil.loading("show"); //showPageLoadingMsg();
				// 1150515 Raymond 1150371 新增傳入額外參數exflag, 目前僅定義"tcmode", 代表觸發options="refresh"的原因是切換追蹤修訂模式顯示的關係
				//ctx.reqPage($pages.find("#pgBackBuffer, #uvpgBackBuffer"))
				ctx.reqPage($pages.find("#pgBackBuffer, #uvpgBackBuffer"), undefined, exflag)
					.done(function() {
						//SSOUtil.loading("hide"); //hidePageLoadingMsg();
						$pages.find("#pgFrontFace, #uvpgFrontFace").children().remove();
						// swap buffer
						$pages.find("#pgFrontFace, #uvpgFrontFace").append($pages.find("#pgBackBuffer, #uvpgBackBuffer").children()[0]);
						// 2014.8.20 - Raymond, 通知頁面已翻
						ctx.pageFlipped($pages.find(".pg"), $pages);	// 2016.1.27 新增$pages參數, 公文基資頁面不會有.pg類別
						
						SSOUtil.loading("hide"); //hidePageLoadingMsg();	// 2016.9.13 - 載入中圖示延後到翻頁動畫結束後再隱藏, 暗示尚在翻頁中
						ctx.flipping(false);	// 2016.9.13 - 恢復翻頁
						window.blockSwiping = false;	// 2016.11.16 恢復全域翻頁, 因IE有可能因為refresh指令沒有觸發可編輯欄位的onblur而導致全域變數未重置
					})
					.fail(function(errorText) {	// 2016.1.28 第一頁即發生錯誤時顯示錯誤原因
						theLogger.error(errorText);
						SSOUtil.loading("show", {text:errorText, textVisible:true, theme:'c' }); //showPageLoadingMsg("e", errorText, true);
					});
			}
		}
		else {
			var o = $.extend({
					className: "pg"
				}, options);
			
			/* 2016.8 - Eric, support UniView module and RD-ViewDoc.html */
			var idFlippedOut = 'pgFlippedOut', idFlippedIn='pgFlippedIn', idBackBuffer='pgBackBuffer', idFrontFace='pgFrontFace';
			if (typeof o.idFlippedOut!=='undefined' && o.idFlippedOut.length) {
				idFlippedOut = o.idFlippedOut;
			}
			if (typeof o.idFlippedIn!=='undefined' && o.idFlippedIn.length) {
				idFlippedIn = o.idFlippedIn;
			}
			if (typeof o.idBackBuffer!=='undefined' && o.idBackBuffer.length) {
				idBackBuffer = o.idBackBuffer;
			}
			if (typeof o.idFrontFace!=='undefined' && o.idFrontFace.length) {
				idFrontFace = o.idFrontFace;
			}
			
			var $pages = $(this).html("<div id='" + idFlippedOut + "'></div><div id='" + idFlippedIn + "' style='z-index:0'></div><div id='" + idBackBuffer + "'></div><div id='" + idFrontFace + "'></div>");
			// 1131022 Raymond 屏東序1152 桌機時將perspective-origin:bottom加回來, 以免翻頁時scrollbar突然變長翻頁完再縮回去
			var isMobile = navigator.userAgent.search(/Mobile/gi) > 0;
			// 2019.12.18 - 1081132 Eric, MacPC support! window.realMac
			// 2019.10.17 - 1080905 Eric, iPadOS 13 quick-fix
			if (!isMobile && !window.realMac)
				isMobile = navigator.userAgent.search(/Macintosh/gi) > 0;
			if(!isMobile)
				$pages.css("perspective-origin", "bottom");
			/*if($.fn.flipOpts == undefined) {
				$.fn.flipOpts = $.extend({
					className: "pg",
					beforeFlipOut: null,
					afterFlipOut: null,
					beforeFlipIn: null,
					flipTop: null
				}, options);
			}*/
			// 2015.6.15 修正加大觸發翻頁的滑動長度
			//$.event.special.swipe.horizontalDistanceThreshold = 100;
			/*$pages.find("#pgFrontFace").on("swipeleft", onFlipLeft)
									   .on("swiperight", onFlipRight);*/
			var scrollSupressionThreshold = 30, 	// 水平拉動距離超過這個數值將會取消捲動
				durationThreshold = 1000, 			// 滑動時間超過這個數值, 將判定不是撥
				horizontalDistanceThreshold = 260,  // 判定撥動作的最小水平位移距離, 增加會降低靈敏度, 2015.6.16 增加到260px, 約5cm
				verticalDistanceThreshold = 75,  	// 判定撥動作的最大垂直位移距離
				// 1140613 Raymond 1140166 合併1130291, 新增支援無jQM環境
				//touchStartEvent = $.mobile.support.touch ? "touchstart" : "mousedown",
				//touchMoveEvent = $.mobile.support.touch ? "touchmove" : "mousemove",
				//touchStopEvent = $.mobile.support.touch ? "touchend" : "mouseup";
				touchStartEvent = !!$.mobile && $.mobile.support.touch ? "touchstart" : "mousedown",
				touchMoveEvent = !!$.mobile && $.mobile.support.touch ? "touchmove" : "mousemove",
				touchStopEvent = !!$.mobile && $.mobile.support.touch ? "touchend" : "mouseup";
			$pages.find("#pgFrontFace, #uvpgFrontFace").on( touchStartEvent, function( event ) {
				var start = {
						time: ( new Date() ).getTime(),
						coords: [
							event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX,
							event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY ],
						origin: $( event.target )},
					stop;

				function moveHandler( event ) {
					if ( !start ) {
						return;
					}

					stop = {
						time: ( new Date() ).getTime(),
						coords: [
							event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX,
							event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY ]
					};

					// prevent scrolling
					if ( Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > scrollSupressionThreshold ) {
						event.preventDefault();
					}
				}

				var $this = $(this);
				$this.on( touchMoveEvent, moveHandler )
					.one( touchStopEvent, function() {
						$this.off( touchMoveEvent, moveHandler );

						if ( start && stop ) {
							if ( stop.time - start.time < durationThreshold &&
								Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > horizontalDistanceThreshold &&
								Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) < verticalDistanceThreshold ) {

								// 1140718 Raymond 屏東彙整表序1449 偵測有選取文字時, 不要觸發翻頁
								var ignoreSwipe = false;
								if(window.getSelection().rangeCount > 0) {
									let rng = window.getSelection().getRangeAt(0);
									if(!rng.collapsed) {
										theLogger.log("使用者拖拉滑鼠移動距離及時間符合條件, 但偵測到有選取文字, 不要觸發翻頁");
										ignoreSwipe = true;
									}
									else if(rng.startContainer.nodeType == 1) {
										let tarNd = rng.startContainer.childNodes[rng.startOffset];
										if(tarNd.nodeName.match(/INPUT|TEXTAREA/) && tarNd.selectionEnd > tarNd.selectionStart) {
											theLogger.log("使用者拖拉滑鼠移動距離及時間符合條件, 但偵測到有選取文字(" + tarNd.nodeName + "), 不要觸發翻頁");
											ignoreSwipe = true;
										}
									}
								}
								if(ignoreSwipe) {}
								else
								if( start.coords[0] > stop.coords[0] )
									onFlipLeft.call(this, $.Event("swipeleft"));
								else
									onFlipRight.call(this, $.Event("swiperight"));
							}
							// 1140527 Raymond 1140321 新增若頁面已捲至最上端再往下撥要自動翻上一頁, 及頁面已捲至最下端再往上撥要自動翻下一頁功能
							else if( stop.time - start.time < durationThreshold &&
									Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) >= verticalDistanceThreshold ) {
								let $cp = $(this).closest(".contentPane");
								if($cp.get(0).scrollTop + $cp.height() >= $cp.get(0).scrollHeight && start.coords[1] > stop.coords[1]) {
									if(o.ctx?.allowTouchFlip("swipeleft") == false) {}
									else
										onFlipLeft.call(this, $.Event("swipeleft"));
								}
								else if($cp.get(0).scrollTop <= 0 && start.coords[1] < stop.coords[1]) {
									if(o.ctx?.allowTouchFlip("swiperight") == false) {}
									else
										onFlipRight.call(this, $.Event("swiperight"));
								}
							}
						}
						start = stop = undefined;
					});
			});
			
			if(o.ctx != undefined) {
				
				$pages.find("#pgFrontFace, #uvpgFrontFace").data("flipCtx", o.ctx);
				
				// 1140618 Raymond 1140166 修正DocCompare.html環境下沒有jQM的問題
				// 1110829 Raymond 1110725 改為直接叫用$.mobile.loading, 因SSOUtil.loading是用setTimer, 若點到子文無任何文稿, 再點回母文loading訊息會一直顯示無任何文稿的訊息
				//SSOUtil.loading("show"); //showPageLoadingMsg();
				if(!!$.mobile)
				$.mobile.loading("show");
				else
					SSOUtil.loading("show");
				o.ctx.reqPage($pages.find("#pgBackBuffer, #uvpgBackBuffer"))
					.done(function() {
						SSOUtil.loading("hide"); //hidePageLoadingMsg();
						$pages.find("#pgFrontFace, #uvpgFrontFace").children().remove();	//2017.2.21	Leslie	bugfix for IE可能會出現第一次顯示時，refresh先跑完的情況，所以一律清掉當前頁面，再加入要顯示的畫面
						// swap buffer
						$pages.find("#pgFrontFace, #uvpgFrontFace").append($pages.find("#pgBackBuffer, #uvpgBackBuffer").children()[0]);
						if(o.ctx.hasPrevPage())
							$pages.find("#pgFlippedOut, #uvpgFlippedOut").css("display", "");
						else
							$pages.find("#pgFlippedOut, #uvpgFlippedOut").css("display", "none");
						// 2014.8.20 - Raymond, 通知頁面已翻
						o.ctx.pageFlipped($pages.find(".pg"), $pages);	// 2016.1.27 新增$pages參數, 公文基資頁面不會有.pg類別

						// 2019.7 - 1080654 Eric, performance log.
                        if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                            theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- FolioView.reqPage(1st) DONE...');
                        }
					})
					.fail(function(errorText) {	// 2016.1.28 第一頁即發生錯誤時顯示錯誤原因
						theLogger.error(errorText);
						SSOUtil.loading("show", {text:errorText, textVisible:true, theme:'e' }); //showPageLoadingMsg("e", errorText, true);
					});
			}
		}
	});
}

// Layout namespace
//
	function Plain(txt, para) {
		
		this.type = "Plain";
		this.para = para;
		this.overwriteStyle = {};
		
		if(typeof txt === "string")
			this.text = txt.replace(/[\t\r\n]+/g,'');
		else {
			// 1130702 Raymond 1130293 修正列印時若主旨或段落條列中有追蹤修訂的<ins>內有換行字元, 會列印出斷行效果的問題
			//this.text = txt.textContent;
			this.text = txt.textContent.replace(/[\t\r\n]+/g,'');
			for(var i=0; i<txt.attributes.length; i++) {
				var a = txt.attributes[i];
				switch(a.nodeName) {
					case "font-size":
						this.overwriteStyle.fontSize = a.nodeValue + "pt";
						break;
					case "font-style":
						if(a.nodeValue & 1)
							this.overwriteStyle.fontWeight = "bolder";
						if(a.nodeValue & 2)		// 2016.12.8 fix 去掉else
							this.overwriteStyle.fontStyle = "italic";
						if(a.nodeValue & 4)		// 2016.12.8 fix 去掉else
							this.overwriteStyle.textDecoration = "underline";
						if(a.nodeValue & 8) {	// 2016.12.8 新增支援上下標樣式
							this.overwriteStyle.verticalAlign = "super";
							this.overwriteStyle.fontSize = "75%";
						}
						else if(a.nodeValue & 16) {
							this.overwriteStyle.verticalAlign = "sub";
							this.overwriteStyle.fontSize = "75%";
						}
						if(a.nodeValue & 32)	// 2016.12.8 fix 去掉else
							this.overwriteStyle.textDecoration = "line-through";
						break;
					case "font-color":
						if(a.nodeValue > 0)
							// 1080123 Raymond 1080097 修正列印追蹤修訂模式時, 顏色異常問題
							//this.overwriteStyle.color = "#" + Number(a.nodeValue).toString(16);
							this.overwriteStyle.color = Util.toHtmlColor(a.nodeValue);
						break;
					case "white-space":
						this.overwriteStyle.whiteSpace = a.nodeValue;
						break;
					// 1110413 Raymond 1110425 新增支援樣版檔的inline元素可設定id, 系統會用此id判斷是否符合特定名稱(ex.主旨、段落)來啟用特定功能(ex.儲存格以TR的指定高度來限制最大高度,使儲存格內容即使超出高度也不會撐高TR,導致表格跨頁問題)
					case "id":
						this.id = a.nodeValue;
						break;
				}
			}
		}
		// 1100602 Raymond 1100531 目前版本瀏覽器(Chrome、Firefox、IE)已能對中文標點符號避頭尾, 故不再需要加工避頭尾功能
		/*var seg = this.text.split(/[，；。]/g);    // 避頭尾
		theLogger.debug(seg);
		if(seg.length > 1) {
			var mt = seg[0],
				p = seg[0].length;
			for(var i=1; i<seg.length; i++) {
				//mt += "<span class='nb'>" + this.text.substr(p++, 1) + "</span><wbr>" + seg[i];	// 2015.8.7 測試折行點
				mt += this.text.substr(p++, 1) + "<wbr>" + seg[i];
				p += seg[i].length;
			}
			theLogger.debug(mt);
			this.text = mt;
		}*/
		if(this.text.match(/正本：|副本：|抄本：|主持人：|出席者：|列席者：/))	//2017.01.23	Leslie	正本、副本...等欄位，因其為<SPAN>+<DIV>，需特別加上vertical-align:top，以符合編輯時的標題靠上顯示
			this.overwriteStyle["vertical-align"] = "top";
		
		//1101026 Raymond 1100991 弱掃XSS修正
		function HtmlEncode(s) {
			var div = document.createElement('div');
			div.appendChild(document.createTextNode(s));
			return div.innerHTML;
		}
		
		// 1071222 Raymond 新增unwrapPlain參數, readOnly參數雖然不會用到但因與Anchor同層會被Para.instanciateSO叫到, 故保留之, unwrapPlain列為第3參數
		//this.instanciateSO = function($pa) {
		this.instanciateSO = function($pa, readOnly, unwrapPlain) {
			var $sp = $("<span class='plain'></span>").appendTo($pa);
			// 1110413 Raymond 1110425 新增支援樣版檔的inline元素可設定id, 系統會用此id判斷是否符合特定名稱(ex.主旨、段落)來啟用特定功能(ex.儲存格以TR的指定高度來限制最大高度,使儲存格內容即使超出高度也不會撐高TR,導致表格跨頁問題)
			if(typeof this.id === "string" && this.id.length > 0) {
				$sp.attr("aid", this.id).addClass("a").removeClass("plain");	// 1110419 Raymond 1110425 class從'plain'改成'a'使letter-spacing與主旨、段落一樣
				if(this.id.match(/主旨|段落/))
					$pa.addClass("segment");	// <inline>的id屬性指定為"主旨"或"段落"時, 比照<a>的主旨段落將Para設定為.segment, 以啟用儲存格限制最大高度
				// 1150203 Raymond 1150101 判斷為署名欄位時, 新增sign class
				if(this.id?.match(/^署名/))
					$pa.addClass("sign");
			}
			
			// 2016.11.2 修正「裝」、「訂」、「線」3個字左轉90度
			var m1 = this.text.match(/裝/),
				m2 = this.text.match(/訂/),
				m3 = this.text.match(/線/);
			// 1100521 Raymond 1100480 修正內文同一條列出現"裝"、"訂"、"線"3字, 造成向左旋轉90度問題
			//if(m1 && m2 && m3) {
			if(m1 && m2 && m3 && (!!this.para && !!this.para.parent && !!this.para.parent.flowName && (this.para.parent.flowName == "xsl-region-start" || this.para.parent.flowName == "xsl-region-start"))) {
				theLogger.log("變更裝訂線(" + m1.index + ", " + m2.index + ", " + m3.index + ")三個字轉正");
				// 1100521 Raymond 1100480 "裝"、"訂"、"線"3字旋轉後加個垂直置中
				//var str = this.text.substring(0, m1.index) + "<span style='transform: rotate(270deg); display: inline-block'>裝</span>";
				//str += this.text.substring(m1.index + 1, m2.index) + "<span style='transform: rotate(270deg); display: inline-block'>訂</span>";
				//str += this.text.substring(m2.index + 1, m3.index) + "<span style='transform: rotate(270deg); display: inline-block'>線</span>";
				var str = HtmlEncode(this.text.substring(0, m1.index)) + "<span style='transform: rotate(270deg); display: inline-block; vertical-align: middle'>裝</span>";	// 1101026 Raymond 1100991 修正弱掃Client Potential XSS
				str += HtmlEncode(this.text.substring(m1.index + 1, m2.index)) + "<span style='transform: rotate(270deg); display: inline-block; vertical-align: middle'>訂</span>";	// 1101026 Raymond 1100991 修正弱掃Client Potential XSS
				str += HtmlEncode(this.text.substring(m2.index + 1, m3.index)) + "<span style='transform: rotate(270deg); display: inline-block; vertical-align: middle'>線</span>";	// 1101026 Raymond 1100991 修正弱掃Client Potential XSS
				str += HtmlEncode(this.text.substring(m3.index + 1));	// 1101026 Raymond 1100991 修正弱掃Client Potential XSS
				$sp.html(str);
			}
			// 1100521 Raymond 1100480 裝訂線用inline(案例是為了調大"裝訂線"字體)切成七段後, 因為不是一行字同時有這3字, 造成不會旋轉問題
			else if((m1 || m2 || m3) && this.text.length == 1 && (!!this.para && !!this.para.parent && !!this.para.parent.flowName && (this.para.parent.flowName == "xsl-region-start" || this.para.parent.flowName == "xsl-region-start"))) {
				theLogger.log("變更裝訂線'" + this.text + "'一個字轉正");
				$sp.css({transform: "rotate(270deg)", display: "inline-block", verticalAlign: "middle"}).text(this.text);
			}
			/* 1101101 Raymond 1100991 修正弱掃Client Potential XSS
			else if(this.text.match(/[<>]/g))
				$sp.html(this.text);*/
			else
				$sp.text(this.text);	// 2015.8.7 FireFox不支援innerText
			$sp.css(this.overwriteStyle);
			if(this.edtCtlr != undefined)	// 2016.8.3 inline物件的EditController優先
				this.editCtlr.attach($sp, this);
			else if(this.para.editCtlr != undefined)
				this.para.editCtlr.attach($sp, this);
			else if(this.para.align == "justify") {	// 2015.11.12 add justify tweak, 2015.11.16 移至refreshDim處理分散對齊問題
				/*var w = this.para.$para.parent().width();
				var d = (w - $sp.width()) / (this.text.length + 1);
				if(d > 0)
					this.para.$para.css("letter-spacing", d + "px");*/
				this.para.$para.css("letter-spacing", "0px");
				
				// 1071222 Raymond 新增unwrapPlain參數若傳入true, 則判斷文字超過1個就unwrap span.plain
				if(unwrapPlain && this.text.length > 1) {
					// 1080315 Raymond 1080195 判斷文字包含Surrogate Pair的真正字數是否超過1
					var realTxLen = 0;
					for(var i=0; i<this.text.length; i++) {
						if(i<(this.text.length-1) && this.text[i].match(/[\uD800-\uDBFF]/) && this.text[i+1].match(/[\uDC00-\uDFFF]/))
							i++;
						realTxLen++;
					}
					if(realTxLen > 1)
						$($sp.get(0).childNodes[0]).unwrap();
				}
			}
			// 1071222 Raymond 新增unwrapPlain參數若傳入true, 則判斷文字超過1個就unwrap span.plain
			else if(unwrapPlain && this.text.length > 1) {
				// 1080315 Raymond 1080195 判斷文字包含Surrogate Pair的真正字數是否超過1
				var realTxLen = 0;
				for(var i=0; i<this.text.length; i++) {
					if(i<(this.text.length-1) && this.text[i].match(/[\uD800-\uDBFF]/) && this.text[i+1].match(/[\uDC00-\uDFFF]/))
						i++;
					realTxLen++;
				}
				if(realTxLen > 1) {
					// 1080107 Raymond 1081091 修正列印在1個fmt標籤內有2個以上字元的草稿時, unwrap()會變成無樣式的問題
					if("fontWeight" in this.overwriteStyle || "fontStyle" in this.overwriteStyle || "textDecoration" in this.overwriteStyle || "verticalAlign" in this.overwriteStyle) {
						// 逐字切成一個個SPAN.inline
						var nl = $sp.get(0).childNodes;
						for(var i=0; i<nl.length; i++) {
							if(nl[i].nodeType == 1) {	// fmt裡不需要包任何元素包括<wbr>
								console.debug("abbandant " + nl[i].outerHTML);
							}
							else {
								var str = nl[i].textContent;
								for(var j=0, n=str.length; j<n; j++) {
									if(j<(n-1) && str[j].match(/[\uD800-\uDBFF]/) && str[j+1].match(/[\uDC00-\uDFFF]/)) {
										// 這是一個Surrogate Paire字元, 要包2個char
										var $exsp = $("<span class='plain'>" + str.substr(j, 2) + "</span>").appendTo($pa);
										j++;
									}
									else {
										var $exsp = $("<span class='plain'>" + str[j] + "</span>").appendTo($pa);
									}
									$exsp.css(this.overwriteStyle);	// 套用fmt的樣式
								}
							}
						}
						$sp.remove();	// 最後再刪掉原本有2個以上字的SPAN.inline
					}
					else	// 非fmt的SPAN.inline可直接unwrap()
					$($sp.get(0).childNodes[0]).unwrap();
				}
			}
		}
		
		// 2015.11.16 added
		this.refreshDim = function() {
			// 1111212 Raymond 修正裝訂線設為僅首頁顯示(show-in-page="1")時, 翻頁會因發生Error而轉圈圈的問題
			//if(this.para.align == "justify") {	// justify tweak
			if(this.para.align == "justify" && !!this.para.$para) {	// justify tweak
				// 1100521 Raymond 1100480 修正裝訂線分散對齊問題
				// 1080401 Raymond 1080262 修正設定justify的Plain, 末行或單行未分散對齊的問題
				/*if(this.para.$para.children().eq(0).children(":not(wbr)").length > 0) {	// 裝訂線文字會有<span>, 用text-align-last無效
				var w = this.para.$para.parent().width();
				if(this.para.$para.children().length == 1) {
					var origLS = this.para.$para.css("letter-spacing");
					var d = (w - this.para.$para.children().eq(0).width()) / (this.text.length + 1);
					if(d > 0) {
						theLogger.warn("分散對齊: " + origLS + "->" + d + ", parent.width()=" + w + ", firstChild.width()=" + this.para.$para.children().eq(0).width() + "(" + this.para.$para.children().get(0).tagName + ")");
						this.para.$para.css("letter-spacing", d + "px");
					}
				}
				}*/
				if(this.para.$para.text().match(/[裝訂線]/g) && !!this.para.parent && !!this.para.parent.flowName && (this.para.parent.flowName == "xsl-region-start" || this.para.parent.flowName == "xsl-region-end")) {
					var origLS = this.para.$para.css("letter-spacing");
					if(origLS.length > 0 && parseFloat(origLS) > 0.0) {
						// 已經分散過了不要再算第2次, 或字太多字距已設為0
					}
					else {
						var w = this.para.$para.parent().width(), w1 = 0, t = 0;
						for(var i=0; i<this.para.$para.children().length; i++) {
							w1 += this.para.$para.children().eq(i).width();
							t += this.para.$para.children()[i].textContent.length;
						}
						var d = (w - w1) / (t + 1);
						if(d > 0) {
							theLogger.warn("裝訂線分散對齊: " + origLS + "->" + d);
							this.para.$para.css("letter-spacing", d + "px");
						}
					}
				}
				else {
					this.para.$para.css({"text-align-last": "justify", "letter-spacing": "0.03em"});
					var rcs = this.para.$para.children().get(0).getClientRects();
					if(rcs.length > 1 && rcs[rcs.length - 1].width < rcs[0].width) {	// 超過1行且末行所佔寬度小於首行, 應是單字成行
						theLogger.warn(["分散對齊(單字成行)", this.text, rcs]);
						var txt = this.para.$para.children().eq(0).html();
						if(txt.match(/[<>]/g)) {	// 內容有標籤, 計算文字部分在倒數第2個字前插入半形空白
							var n = this.para.$para.children().get(0).childNodes.length;
							var s = 0;
							for(var i=n-1; i>=0; i--) {
								var nd = this.para.$para.children().get(0).childNodes[i];
								if(nd.nodeType == 3) {
									if(nd.nodeValue.length + s >= 2) {
										var spl = nd.nodeValue.length - (2 - s);
										nd.nodeValue = nd.nodeValue.substr(0, spl) + " " + nd.nodeValue.substr(spl);
										break;
									}
									else
										s += nd.nodeValue.length;
								}
								else if(nd.nodeType == 1) {
									if(nd.textContent.length + s >= 2) {
										var spl = nd.textContent.length - (2 - s);
										nd.textContent = nd.textContent.substr(0, spl) + " " + nd.textContent.substr(spl);
										break;
									}
									else
										s += nd.textContent.length;
								}
							}
						}
						else {	// 內容都是文字, 在倒數第2字前插入半形空白
							var n = txt.length;
							this.para.$para.children().eq(0).text(txt.substr(0, n - 2) + " " + txt.substr(n - 2));
						}
					}
					// 1080507 Raymond 1080262 修正加半形空白後仍單字成行的問題
					rcs = this.para.$para.children().get(0).getClientRects();
					// 1130711 Raymond 1130512 新增重試10次機制, 以解決只加0.01em仍單字成行的問題
					//if(rcs.length > 1 && rcs[rcs.length - 1].width < rcs[0].width) {	// 超過1行且末行所佔寬度小於首行, 應是單字成行
					var retries = 0;
					while(retries++ < 10 && rcs.length > 1 && rcs[rcs.length - 1].width < rcs[0].width) {	// 超過1行且末行所佔寬度小於首行, 應是單字成行
						theLogger.warn(["分散對齊(加了半形空白仍單字成行)", this.text, rcs]);
						var ls = parseFloat(this.para.$para.get(0).style.letterSpacing);
						if(typeof ls == "number") {
							theLogger.warn("增加letter-spacing: " + this.para.$para.get(0).style.letterSpacing + "->" + (ls + 0.01) + "em(retry " + retries + ")");	// 1130711 Raymond 1130512 新增重試10次機制, 以解決只加0.01em仍單字成行的問題
							this.para.$para.css("letter-spacing", (ls + 0.01) + "em");
							// 1130711 Raymond 1130512 新增重試10次機制, 以解決只加0.01em仍單字成行的問題
							rcs = this.para.$para.children().get(0).getClientRects();
						}
					}
				}
			}
		}
	}
	
	function ModifyInfo(xmlNode, para) {
		
		this.type = "ModifyInfo";
		this.para = para;
		
		if(xmlNode != null) {
			this.act = xmlNode.getAttribute("act");
			this.sn = xmlNode.getAttribute("sn");
			this.date = xmlNode.getAttribute("date");
			for(var i=0; i<xmlNode.childNodes.length; i++) {
				if(xmlNode.childNodes[i].nodeType == 1){
//                    theLogger.log(xmlNode.childNodes[i]);
					if(this.children == undefined)
						this.children = new Array();
					if(xmlNode.childNodes[i].tagName == "mi") {
						this.children.push(new ModifyInfo(xmlNode.childNodes[i], para));
					}
				}
				else if(xmlNode.childNodes[i].nodeType == 3) {
//                    theLogger.log("\'" + xmlNode.childNodes[i].nodeValue.replace(/^[\t\r\n]+|[\t\r\n]+$/g,'') + "\'");
				}
			}
			this.text = xmlNode.childNodes[0].nodeValue.replace(/^[\t\r\n]+|[\t\r\n]+$/g,'');
		}
		
		this.instanciateSO = function($pa) {
			try {
				var tcSess = this.para.getModel().getTCSess(this.sn);	// 2016.2.2 改向DraftModel取得TCSess
				//var tcSess = theAOL.getCurrFolio().getTCSess(this.sn);
				var clr = tcSess.color;
			}
			catch(e) {
				theLogger.error("getTCSess('" + this.sn + "') failed! " + e.message + " - " + e.sourceURL + ":" + e.line);
			}
			if(this.act == "ins") {
				var $sp = $("<ins style='color:red'>" + this.text + "</ins>").appendTo($pa);
			}
			else if(this.act == "del") {
				var $sp = $("<del style='color:red'>" + this.text + "</del>").appendTo($pa);
			}
			else if(this.act == "fmt") {
				var $sp = $("<span class='fmt'>" + this.text + "</span>").appendTo($pa);
				//$sp.css(this.overwriteStyle);
			}
			if(this.para.editCtlr != undefined)
				this.para.editCtlr.attach($sp, this);
		}
	}
	// 搜尋時判斷排版物件類型
	Plain.prototype.is = ModifyInfo.prototype.is = function(type) {
		return type == this.type;
	}
var Layout = function() {
	
	if(window.theModMgr != undefined)
		var inst = window.theModMgr.install("RD-Layout.js");
	
	// 2015.1.27 新增isMobile旗標
	var isMobile = navigator.userAgent.search(/Mobile/gi) > 0;
	// 2019.12.18 - 1081132 Eric, MacPC support! window.realMac
	// 2019.10.17 - 1080905 Eric, iPadOS 13 quick-fix
	if (!isMobile && !window.realMac) {
		isMobile = navigator.userAgent.search(/Macintosh/gi) > 0;
	}

	// 2016.12.1 新增IE旗標
	var isIE = navigator.userAgent.indexOf("Trident") > 0;
	
	// utility methods
	function transXmlNodeToBlock(xmlNode, prevBlock, parent) {
		if(xmlNode.tagName == "para")
			return new Para(xmlNode, prevBlock, parent);
		else if(xmlNode.tagName == "table")
			return new Table(xmlNode, prevBlock, parent);
		else if(xmlNode.tagName == "sign-area")
			return new SignArea(xmlNode, prevBlock, parent);
		else if(xmlNode.tagName == "page-break")	// 2016.12.6 新增支援斷頁指令
			return new PageBreak(xmlNode, prevBlock, parent);
		return null;
	}
	
	// PageNo class
	function PageNo(xmlNode, para) {
		this.type = "PageNo";
		this.para = para;
		
		if(xmlNode != null) {
			this.digitFormat = xmlNode.getAttribute("digit-format");
		}
		
		this.instanciateSO = function($pa) {
			$("<span class='page-no' data-format='" + this.digitFormat + "'></span>").appendTo($pa);
		}
	}
	// AllPages class
	function AllPages(xmlNode, para) {
		this.type = "AllPages";
		this.para = para;
		
		if(xmlNode != null) {
			this.digitFormat = xmlNode.getAttribute("digit-format");
		}
		
		this.instanciateSO = function($pa) {
			$("<span class='all-pages' data-format='" + this.digitFormat + "'></span>").appendTo($pa);
		}
	}
	
	// Barcode class
	function Barcode(xmlNode, para) {
		this.type = "Barcode";
		this.para = para;
		
		if(xmlNode != null) {
			this.barcodeType = xmlNode.getAttribute("type");	// 條碼格式, 目前僅支援Code39(6)
			this.width = xmlNode.getAttribute("width");
			this.height = xmlNode.getAttribute("height");
			this.hasText = xmlNode.getAttribute("has-text");
			this.content = xmlNode.textContent;
		}
		
		this.instanciateSO = function($pa) {
			var $bc = $("<div class='barcode'></div>").appendTo($pa);
			if(this.width && Number(this.width) > 0)
				$bc.css("width", this.width + this.para.getUnit());
			if(this.height && Number(this.height) > 0)
				$bc.css("height", this.height + this.para.getUnit());
			if(!this.barcodeType || this.barcodeType == "6") {
				// 2016.12.30 - Eric Peng, 改用輸出PNG之Barcode Lib (使用DOM Elements的barcode在IE縮放後會有辨識率不良問題)
				if (typeof $.fn.JsBarcode=='function') { // && typeof _debug=='boolean' && !!_debug) {
					var $bcImg = $('<img style="width:98%; height:100%;">');
					$bcImg.appendTo($bc);
					$bcImg.JsBarcode(this.content, {width:2,height:85,format:'CODE39',margin:5,marginTop:0,marginBottom:0, displayValue:false});
				}
				else if("DrawHTMLBarcode_Code39" in window && $.isFunction(DrawHTMLBarcode_Code39)) {
					$bc.html(DrawHTMLBarcode_Code39(this.content, 0, "no", "cm", 0.03, Number(this.width) / 10, Number(this.height) / 10, 2.7, "bottom", "center", "", "black", "white"))	// 2016.12.9 fix for 條碼辨識困難問題
						.find("div").css("position", "absolute");	
				}
			}
		}
	}
	
	// Anchor class
	function Anchor(xmlNode, para) {
		
		this.type = "Anchor";
		this.para = para;
		/*
		this.prev = prevInline;
		if(prevInline != null)
			prevInline.next = this;
		this.next = null;
		*/
		
		if("getAttribute" in xmlNode) {	// 2015.8.11 改用getAttribute判斷是否為XMLNode
			if(("hasAttribute" in xmlNode && xmlNode.hasAttribute("id")) || !!xmlNode.getAttribute("id"))	// 1070503 Raymond 1070555 修正未設定id屬性的欄位, 仍會取到id=null的問題
				this.id = xmlNode.getAttribute("id");
			this.syncPath = xmlNode.getAttribute("sync-path");
			// for IE-compatible
			// 1091007 Raymond 1090564 proc()移至if上, 以供下拉式選單讀取額外sync-path屬性叫用
			function proc(str) {
				var p = str.indexOf("[");
				if(p < 0)
					return str;
				var pre = str.substr(0, p + 1);
				var e = str.indexOf("]");
				var aft = str.substr(e + 1);
				var d = str.substr(p + 1, e - p - 1);
				var res = pre + (Number(d) - 1) + "]" + arguments.callee(aft);
				return res;
			}
			if(navigator.userAgent.match(/Trident/)) {
				if(this.syncPath && this.syncPath.match(/\[(\d+)\]/)) {
					var old = this.syncPath;
					// 1091007 Raymond 1090564 proc()移至if上, 以供下拉式選單讀取額外sync-path屬性叫用
					this.syncPath = proc(this.syncPath);
					theLogger.warn("修正syncPath(for IE):'" + old + "' -> '" + this.syncPath + "'");
				}
			}
			this.op = xmlNode.getAttribute("op");	// 2016.5.30 新增op互動模式:
													//		0(or null):通用文字方塊互動,
													//		1:下拉式選單互動,
													//		2:小日曆互動,
													//		3:小日曆含時分,
													//		4:複選選項互動,
													//		5:單選選項互動,
													//		6:新增按鈕,
													//		7:刪除按鈕,
													//		8:按鈕,
													//		9:ComboBox,
													//		保留的互動模式:發文機關/主旨/段落/密等/解密條件/會銜字/會辦單位
			// 1070529 Raymond 1070177 新增Combobox op要支援list屬性
			//if(this.op == "1") {
			if(this.op == "1" || this.op == "9") {
				this.list = xmlNode.getAttribute("list");	// 2016.7.29 新增op=1(下拉選單)時, 從%機關代碼%_Data.xml讀取list設定的名稱
				// 1091218 Raymond 修正未設定下拉選單清單名稱時會發生Error的問題(鐵道局警急叫修)
				// 1090907 Raymond 1090564 新增讀取下拉式選單套用list清單的額外屬性應回寫的XPath路徑
				//if(this.list.length > 0) {
				if(!!this.list && this.list.length > 0) {
					for(var i=0, n=xmlNode.attributes.length; i<n; i++) {
						var a = xmlNode.attributes[i];
						if("nodeName" in a && a.nodeName.match(/^sync-path-/)) {
							if(!this.extraSyncPath)	// 若無額外syncPath屬性, 則新增, 使用dictionary以支援超過2組寫入XPath
								this.extraSyncPath = {};
							var k = a.nodeName.substr(10);	// 額外的syncPath屬性, 以截去"sync-path-"後的屬性名稱為鍵值
							if(k.length > 0) {
								if(isIE)
									this.extraSyncPath[k] = proc(a.nodeValue);	// IE下的XPath若有[], 須進行0-based調整
								else
									this.extraSyncPath[k] = a.nodeValue;
							}
							else
								theLogger.error("Anchor[id:" + this.id + "]設定為套用list='" + this.list + "'的下拉式選單, 但額外屬性'sync-path-'設定不正確, 未含額外屬性名稱");;
						}
					}
				}
			}
			if(this.op == "2" || this.op == "3") {
				this.fmt = xmlNode.getAttribute("fmt");		// 2016.7.28 新增op=2/3(小日曆)時, 顯示的日期格式, 0(or null):中華民國 年 月 日, 1: 年 月 日
			}
			if(typeof this.id === "string" && this.id.match(/^複選_/) || this.op == "4") {	// 2016.7.28 新增op=4/5時, 預設勾選狀態及選項的值
				this.checked = xmlNode.getAttribute("checked") == "true";
				this.value = xmlNode.getAttribute("value");
				// 1100308 Raymond 1090836 單複選互動模式新增參數, hide-text為true時表示隱藏選項文字, check-mark為自訂勾選字元
				if(xmlNode.getAttribute("hide-text"))
					this.hideText = xmlNode.getAttribute("hide-text") == "true";
				if(xmlNode.getAttribute("check-mark"))
					this.checkMark = xmlNode.getAttribute("check-mark");
			}
			if(typeof this.id === "string" && this.id.match(/^單選_/) || this.op == "5") {
				this.checked = xmlNode.getAttribute("checked") == "true";
				this.value = xmlNode.getAttribute("value");
				this.name = xmlNode.getAttribute("name");			// 單選多一個name屬性
				// 1100308 Raymond 1090836 單複選互動模式新增參數, hide-text為true時表示隱藏選項文字, check-mark為自訂勾選字元, 設定2個字則第1個字為勾選狀態時顯示字元, 第2個字為未勾選狀態顯示字元, 只設定1個字則該字為勾選狀態時顯示字元, 未勾選狀態顯示字元則自動設為全形空白
				if(xmlNode.getAttribute("hide-text"))
					this.hideText = xmlNode.getAttribute("hide-text") == "true";
				if(xmlNode.getAttribute("check-mark"))
					this.checkMark = xmlNode.getAttribute("check-mark");
			}
			if(typeof this.id === "string" && this.id.match(/^新增_/) || this.op == "6") {	// 2016.7.29 新增op=6時, 新增按鈕可新增XML的節點
				this.tmpl = xmlNode.getAttribute("tmpl");			// 新增的節點樣版
				this.name = xmlNode.getAttribute("name") || "新增";	// 按鈕名稱
			}
			if(typeof this.id === "string" && this.id.match(/^刪除_/) || this.op == "7") {	// 2016.7.29 新增op=7時, 刪除按鈕可刪除XML的節點
				this.index = xmlNode.getAttribute("index");			// 刪除的節點index
				this.name = xmlNode.getAttribute("name") || "刪除";	// 按鈕名稱
			}
			if(typeof this.id === "string" && this.id.match(/^按鈕_/) || this.op == "8") {	// 2016.8.3 新增op=8時, 特定按鈕可開啟特定子視窗
				this.name = xmlNode.getAttribute("name") || "設定";	// 按鈕名稱, 預設為'設定'
			}
			this.hint = xmlNode.getAttribute("hint") == "true";			// 2016.8.3 新增hint屬性, 欄位內容是空值時, 顯示提示樣式
			this.refresh = xmlNode.getAttribute("refresh") == "true";	// 2016.8.3 新增refresh屬性, 欄位內容異動時, 重新排版
			if(xmlNode.hasAttribute("disableKeyIn") || !!xmlNode.getAttribute("disableKeyIn"))	// 1071026 Raymond 1070620 新增disableKeyIn屬性, true時禁止欄位手輸
				this.disableKeyIn = xmlNode.getAttribute("disableKeyIn") == "true";
			this.show99AsForever = xmlNode.getAttribute("show99AsForever") == "true";	// 1140522 Raymond 1131241 新增show99AsForever屬性, 欄位內容是'99'時, 顯示成'永久'
			if(xmlNode.childNodes.length) {
				if(xmlNode.childNodes.length == 1 && xmlNode.childNodes[0].nodeType == 3) {
					// 1060608 Raymond 1060474 修正節點文字中有「<」、「>」字元時, 在列印頁面會變成標籤問題
					//this.text = xmlNode.childNodes[0].nodeValue.replace(/^[\t\r\n]+|[\t\r\n]+$/g,'');
					this.text = xmlNode.childNodes[0].nodeValue.replace(/^[\t\r\n]+|[\t\r\n]+$/g,'').replace(/[<>]/g, function(c) {
						return {
							'<': '&lt;',
							'>': '&gt;'
						}[c];
					});//.replace(/  /g, '&nbsp; ');	// 1060613 Raymond 修正連續半形空白會變成只有1個空白的問題(1060337)

					// 1100602 Raymond 1100531 目前版本瀏覽器(Chrome、Firefox、IE)已能對中文標點符號避頭尾, 故不再需要加工避頭尾功能
					/*var seg = this.text.split(/[，；。]/g);
					theLogger.debug(seg);
					if(seg.length > 1) {
						var mt = seg[0],
							p = seg[0].length;
						for(var i=1; i<seg.length; i++) {
							//mt += "<span class='nb'>" + this.text.substr(p++, 1) + "</span>" + seg[i];	// 2015.8.7 測試折行點
							mt += this.text.substr(p++, 1) + "<wbr>" + seg[i];
							p += seg[i].length;
						}
						theLogger.debug(mt);
						this.text = mt;
					}*/
				}
				else {
					for(var i=0; i<xmlNode.childNodes.length; i++) {
//                        theLogger.log("Anchor#" + this.id + ".childNodes[" + i + "]: nodeType:"  + xmlNode.childNodes[i].nodeType);
						if(this.children == undefined)
							this.children = new Array();
						if(xmlNode.childNodes[i].nodeType == 1) {
//                            theLogger.log(xmlNode.childNodes[i]);
							theLogger.debug(xmlNode.childNodes[i].tagName);
							if(xmlNode.childNodes[i].tagName == "mi") {
								this.children.push(new ModifyInfo(xmlNode.childNodes[i], para));
							}
							else if(xmlNode.childNodes[i].tagName == "inline") {
								this.children.push(new Plain(xmlNode.childNodes[i], para));
							}
							// 1120808 Raymond 1120503 新增自訂表格
							else if(xmlNode.childNodes[i].tagName == "CTBL") {
								let ctblHtml = para.getModel().getCTBLHtml(xmlNode.childNodes[i].getAttribute("ref"));
								if(!!ctblHtml.outerHTML)
									this.text = ctblHtml.outerHTML;
								else
									this.text = ctblHtml;
							}
						}
						else if(xmlNode.childNodes[i].nodeType == 3) {
//                            theLogger.log("\'" + xmlNode.childNodes[i].nodeValue.replace(/^[\t\r\n]+|[\t\r\n]+$/g,'') + "\'");
							var txt = xmlNode.childNodes[i].nodeValue.replace(/^[\t\r\n]+|[\t\r\n]+$/g,'');
							if(txt.length)
								this.children.push(new Plain(txt, para));
						}
					}
				}
			}
			else
				this.text = "";
		}
		else {	// 2015.8.11 修改
		//    throw new Error("無XMLNODE!");
			if("id" in xmlNode)
				this.id = xmlNode.id;
			if("syncPath" in xmlNode)
				this.syncPath = xmlNode.syncPath;
			if("text" in xmlNode)
				this.text = xmlNode.text;
		}
	}
	Anchor.prototype.instanciateSO = function($pa, readOnly) {  // 2014.6.18 新增唯讀模式
		if(typeof this.id === "string" && (this.id.match(/^[複單]選_/) || this.op == "4" || this.op == "5")) {	// 2016.4.20 新增複選核取方塊行為模式, 2016.7.29 新增單選
			var $sp = $("<span class='a-checkbox'></span>").appendTo($pa);
			$sp.attr("aid", this.id)
			   .attr("sync-path", this.syncPath);
			if(this.editCtlr != undefined)
				this.editCtlr.attach($sp, this);
			else
				theLogger.error("指定op的欄位無對應互動模組!");
			/*else if("text" in this) {
				if(this.text.match(/[<>]/g))
					$sp.html(this.text);
				else if(this.checked) {
					if(readOnly == true)
						$sp.html("<input type='checkbox' checked disabled>" + this.text);
					else
						$sp.html("<input type='checkbox' checked>" + this.text);
				}
				else {
					if(readOnly == true)
						$sp.html("<input type='checkbox' disabled>" + this.text);
					else
						$sp.html("<input type='checkbox'>" + this.text);
				}
			}*/
		}
		else {
			if(readOnly == true)
				var $sp = $("<span class='a'>" + (("text" in this)?this.text:"") + "</span>").appendTo($pa);	// 2017.1.25 fix for執行客製碼的欄位初始化功能時, 若需抓目前欄位內容會只抓到空字串的問題
			else if(this.id == "發文號支號")	// 1060809 Raymond 1060695 發文支號限制長度, 需改用INPUT
				var $sp = $("<input maxlength='1' style='width:1em; border:none; margin:-6px 0px -4px;' value='" + (("text" in this)?this.text:"") + "'/>").appendTo($pa);
			else
				var $sp = $("<span class='a' contentEditable='true'>" + (("text" in this)?this.text:"") + "</span>").appendTo($pa);	// 2017.1.25 fix for執行客製碼的欄位初始化功能時, 若需抓目前欄位內容會只抓到空字串的問題
			//var $sp = $("<span class='a'></span>").appendTo($pa);
			$sp.attr("aid", this.id)
			   .attr("sync-path", this.syncPath);
			// 1150203 Raymond 1150101 判斷為署名欄位時, 新增sign class
			if(this.id?.match(/^署名/))
				$pa.addClass("sign");
			// 1121005 Raymond 北大彙整表序254 修正開會事由在列印時與簽核頁面斷行位置不一致的問題
			// 1120824 Raymond 標檢局彙整表序148 修正當樣版的開會事由設為分散對齊時, 若開會事由文字行尾含英數而提前折行, 分散對齊會連「開會事由：」標題文字一起分散, 造成冒號的位置與「開會時間：」等欄位的冒號位置不一致的問題
			//if(readOnly == true && !!this.id && this.id.match(/開會事由/))
			if(readOnly == true && ((!!this.id && this.id.match(/開會事由/)) || (!!this.syncPath && this.syncPath.match(/開會事由/))))
				$pa.addClass("segment");
			if(this.editCtlr != undefined)	// 2014.12.10 增加
				this.editCtlr.attach($sp, this);
			else if(this.para.editCtlr != undefined)
				this.para.editCtlr.attach($sp, this);
			if(this.children != undefined && this.children.length) {
				// 1071222 Raymond 修正無樣式inline會切斷字串, 造成列印預覽的條列文字出現不正常斷行情況
				var unwrapPlain = (!!this.syncPath && this.syncPath.match(/條列|段落|主旨/));
				for(var i=0; i<this.children.length; i++)
					//this.children[i].instanciateSO($sp);
					this.children[i].instanciateSO($sp, readOnly, unwrapPlain);	// 第2參數Para.instanciateSO()會用到, 所以新增為第3參數
			}
			//else if("text" in this && $sp.text() == "") {	// 2017.1.25 fix for若欄位內容是空字串(經過客製碼初始化設定)時, 才用原文稿內容填入
			else if("text" in this && $sp.text() == "" && $sp.find(".custom-table").length == 0) {	// 1120816 Raymond 1120503 修正條列內容為自訂表格但未輸入任何文字時, 不要再用原文稿內容填入, 因為會使EditController的變更(tbody contentEditable)失效
				if(this.text.match(/[<>]/g))
					$sp.html(this.text);
				else if(this.text.length > 0)	// 2016.10.3 FIX for 解密條件若為空字串, 會點不到
					$sp.text(this.text);	// 2015.8.7 FireFox不支援innerText
			}
		}
	}
	
	// 2016.10.11 新增Img class
	function Img(xmlNode, para) {
		this.type = "Img";
		this.para = para;
		
		if(xmlNode != null) {
			this.imgPath = xmlNode.getAttribute("image-path");	// 條碼格式, 目前僅支援Code39(6)
			// 1060614 Raymond 1060471 修正若圖檔路徑為固定寫為C:\2100\公文製作, 則置換為目前資源檔的根路徑
			if(typeof this.imgPath === "string" && this.imgPath.match(/^C:\\2100\\公文製作/)) {
				theLogger.log("原始圖檔路徑為客戶端的'" + this.imgPath + "', 置換根路徑為伺服器上的'" + thePublicRsrc.rsrcRepo.remote.getFullPath() + "'");
				this.imgPath = thePublicRsrc.rsrcRepo.remote.getFullPath() + this.imgPath.substr(12);
			}
			this.size = xmlNode.getAttribute("image-size");
			if(typeof this.size === "string") {	// 1060614 Raymond 1060471 修正圖檔物件可能沒有設好image-size屬性而導致發生Exception的問題
				var s = this.size.split(/[Xx]/);	// 1060614 Raymond 1060471 修正PrintXSL可能有小寫x的情況(直接寫特定圖檔路徑大小)
				this.width = s[0];
				this.height = s[1];
			}
		}
		
		this.instanciateSO = function($pa) {
			var $fo = $("<div class='img'><img></div>").appendTo($pa);
			if(this.width && Number(this.width) > 0)
				$fo.find("img").css("width", this.width + this.para.getUnit());
			if(this.height && Number(this.height) > 0)
				$fo.find("img").css("height", this.height + this.para.getUnit());
			// 1060614 Raymond 1060471 修正圖檔物件可能沒有設好image-size屬性而導致發生Exception的問題
			if(typeof this.imgPath === "string" && this.imgPath.length > 0) {
			//if(this.imgPath.length > 0) {
				$fo.attr("data-src", this.imgPath);
			}
			else if(isIE) {	// 1070126 Raymond NCKU107173 IE下img沒有src或height屬性的話size會變很大, 導致以下的欄位超出頁面看不到
				$fo.find("img").css("max-height", "1em");
			}
		}
	}
	
	// 1140613 Raymond 1140166 合併1130291, 新增ExchStamp class
	function ExchStamp(xmlNode, para) {
		this.type = "ExchStamp";
		this.para = para;
		this.hide = false;
		
		if(xmlNode != null) {
			this.imgPath = xmlNode.getAttribute("stamp-path");
			this.size = xmlNode.getAttribute("stamp-size");
			if(typeof this.size === "string") {
				var s = this.size.split(/[Xx]/);
				this.width = s[0];
				this.height = s[1];
			}
		}
		
		this.instanciateSO = function($pa) {
			if(this.hide == false) {
				var $fo = $("<div class='img'><img></div>").appendTo($pa);
				if(this.width && Number(this.width) > 0)
					$fo.find("img").css("width", this.width + this.para.getUnit());
				if(this.height && Number(this.height) > 0)
					$fo.find("img").css("height", this.height + this.para.getUnit());
				if(typeof this.imgPath === "string" && this.imgPath.length > 0) {
					$fo.attr("data-src", this.imgPath);
				}
				else if(isIE) {	// 1070126 Raymond NCKU107173 IE下img沒有src或height屬性的話size會變很大, 導致以下的欄位超出頁面看不到
					$fo.find("img").css("max-height", "1em");
				}
			}
		}
	}
	
	// Para class
	//
	var cPrnXslAlign = {both: "justify", start: "left", end: "right"};	// 1081227 Raymond 1081135 修正IE下PrintXSL中align-inline設為start或end時不會靠左或靠右對齊的問題, Chrome則會
	function Para(xmlNode, prevBlock, parent) {
		
		this.type = "Para";
		this.parent = parent;
		this.prev = prevBlock;
		if(prevBlock != null)
			prevBlock.next = this;
		this.next = null;
		
		if("getAttribute" in xmlNode) {	// 2015.8.11 改以getAttribute判斷是否為XMLNode
			this.lineHeight = parseFloat(xmlNode.getAttribute("line-height"));
			this.indent = parseInt(xmlNode.getAttribute("indent")) || 0;
			this.padding = {
				before: parseInt(xmlNode.getAttribute("padding-before")) || 0,
				after: parseInt(xmlNode.getAttribute("padding-after")) || 0,
				start: parseInt(xmlNode.getAttribute("padding-start")) || 0,
				end: parseInt(xmlNode.getAttribute("padding-end")) || 0
			};
			this.alignParentContext = xmlNode.getAttribute("align-parent-context") == "1";	// 1090428 Raymond 1090320 修正對齊父段落未套用問題
			this.align = xmlNode.getAttribute("align-inline") || "";	// 1081227 Raymond 1081135 不要預設start文字對齊方式
			this.fontSize = xmlNode.getAttribute("font-size") || "12";
			this.fontFamily = xmlNode.getAttribute("font-family");
			this.altFont = xmlNode.getAttribute("alt-fontname");
			this.space = {
				before: parseFloat(xmlNode.getAttribute("space-before")) || 0,
				after: parseFloat(xmlNode.getAttribute("space-after")) || 0,
				start: parseFloat(xmlNode.getAttribute("space-start")) || 0,
				end: parseFloat(xmlNode.getAttribute("space-end")) || 0
			};
			this.showInPage = parseInt(xmlNode.getAttribute("show-in-page")) || 7;
			this.styles = parseInt(xmlNode.getAttribute("font-style")) || 0;	// 2015.2.24 - 新增styles, 2016.9.2 FIX 屬性名font-style
			
			// 2016.9.1 新增hack用法, 在para設定aid是'正本'、'副本'、'抄本'、'主持人'、'出席者'、'列席者'可對應正常文稿的受文者編輯互動方式
			var aid = xmlNode.getAttribute("aid");
			if(typeof aid === "string")
				this.aid = aid;
			
			//theLogger.log("Para.space.start: " + this.space.start);
		}
		else {	// 2015.8.11 若不是XMLNode則視為從另一個Para複製
			this.lineHeight = xmlNode.lineHeight;
			this.indent = xmlNode.indent;
			this.padding = {
				before: xmlNode.padding.before,
				after: xmlNode.padding.after,
				start: xmlNode.padding.start,
				end: xmlNode.padding.end
			};
			this.align = xmlNode.align;
			this.fontSize = xmlNode.fontSize;
			this.fontFamily = xmlNode.fontFamily;
			this.altFont = xmlNode.altFont;
			this.space = {
				before: xmlNode.space.before,
				after: xmlNode.space.after,
				start: xmlNode.space.start,
				end: xmlNode.space.end
			};
			this.showInPage = xmlNode.showInPage;
			this.styles = xmlNode.styles;
		}
		
		this.inlines = new Array();
		
		if("childNodes" in xmlNode) {
			var nl = xmlNode.childNodes;
			for(var i=0; i<nl.length; i++) {
				
				if(nl[i].nodeType == 1) {       // Element
					if(nl[i].tagName == "a") {
						this.inlines.push(new Anchor(nl[i], this));
					}
					else if(nl[i].tagName == "mi") {
						this.inlines.push(new ModifyInfo(nl[i], this));
					}
					else if(nl[i].tagName == "inline") {
						this.inlines.push(new Plain(nl[i], this));
					}
					else if(nl[i].tagName == "page-no") {   // 2013.10.17 - Raymond, 新增頁碼
						this.inlines.push(new PageNo(nl[i], this));
					}
					else if(nl[i].tagName == "all-pages") { // 2013.10.17 - Raymond, 新增頁數
						this.inlines.push(new AllPages(nl[i], this));
					}
					else if(nl[i].tagName == "barcode") {	// 2015.1.23 - Raymond, 新增條碼
						this.inlines.push(new Barcode(nl[i], this));
					}
					else if(nl[i].tagName == "img") {	// 2016.10.11 - Raymond, 新增影像(取代章戳)
						this.inlines.push(new Img(nl[i], this));
					}
					else if(nl[i].tagName == "exch-stamp") {	// 1140613 Raymond 1140166 合併1130291, 新增電子交換章影像(來文DI)
						this.inlines.push(new ExchStamp(nl[i], this));
					}
					else {
						theLogger.warn("未知的標籤\'" + nl[i].tagName + "\'");
					}
				}
				else if(nl[i].nodeType == 3) {  // Text
					this.inlines.push(new Plain(nl[i].nodeValue, this));
				}
			}
		}
		
		// 2015.8.11 新增插入新Para
		// 2015.11.19 新增可指定序號及syncPath
		this.insertNewPara = function(sn, syncPath) {
			if(sn || syncPath)
				theLogger.warn("Para.insertNewPara(): 指定插入序號'" + sn + "', syncPath'" + syncPath + "'");
			var nx = this.next;	// 先保留next, 因為
			var np = new Para(this, this, this.parent);	// 這裡就會改寫this.next為新增的Para
			np.inlines.push(new Plain(sn, np));	// 2015.12.3 預設序號給RD-Edit.js提供
			var a = {};
			for(var i=0; i<this.inlines.length; i++) {
				if(this.inlines[i].type == "Anchor") {
					a.syncPath = syncPath || this.inlines[i].syncPath;
					break;
				}
			}
			np.inlines.push(new Anchor(a, np));
			np.next = nx;	// 將保留的next設到新增的Para.next
			if(!!nx)		// 2016.12.14 bugfix for 空白公文
				nx.prev = np;	// 保留的next的prev設為新增的para
			var idx = this.parent.blocks.indexOf(this);	// 搜尋ec.para在parent的索引值
			this.parent.blocks.splice(idx, 0, np);	// 插入新增的Para
			return np;
		}
		// 2015.9.3 刪除本Para
		this.delPara = function() {
			this.prev.next = this.next;	// 前後關係重新設定
			if(!!this.next)	// 2016.12.14 bugfix for 空白公文
				this.next.prev = this.prev;
			var idx = this.parent.blocks.indexOf(this);	// 搜尋ec.para在parent的索引值
			this.parent.getModel().dirty(true);	// 2015.12.21 刪除條列直接dirty
			this.parent.blocks.splice(idx, 1);	// 刪除此Para
			delete this.prev;
			delete this.next;
		}
	}
	Para.prototype.instanciateSO = function($flow, readOnly, printMode, insertAfter) {  // 2014.6.18 新增唯讀模式, 2015.8.11 新增insertAfter旗標, 2016.7.25 新增列印模式
		if(insertAfter)	// 2015.8.11 新增
			this.$para = $("<div class='para' data-showinpage='" + this.showInPage + "'></div>").insertAfter($flow);
		else
			this.$para = $("<div class='para' data-showinpage='" + this.showInPage + "'></div>").appendTo($flow);
		//theLogger.log("lineHeight: " + this.lineHeight);
		var styles = {
			marginTop: this.space.before + this.getUnit(),
			marginBottom: this.space.after + this.getUnit(),
			marginLeft: this.space.start + this.getUnit(),
			marginRight: this.space.end + this.getUnit(),
			fontSize: this.fontSize + "pt",
			//textAlign: (this.align == "both")?"justify":this.align,	// 1080401 Raymond 1080262 修正設定both對齊方式的段落不會分散對齊的問題
			textAlign: (this.align in cPrnXslAlign)?cPrnXslAlign[this.align]:this.align,	// 1081227 Raymond 1081135 修正設定start對齊方式的段落在IE下不會靠左對齊的問題
			//width: "100%",
			lineHeight: this.lineHeight + 0,  // 2013.10.7 - Raymond, CSS逆修正, 因為container比content還窄...= =
			//paddingLeft: (this.padding.start + this.indent) + "em"
			paddingLeft: this.padding.start + "em",	// 2016.4.18 恢復para凸排
			textIndent: this.indent + "em"
		};
		// 2016.7.26 printMode下恢復para凸排
		if(printMode) {
			styles.paddingLeft = this.padding.start + "em";
			styles.textIndent = this.indent + "em";
		}
		// 2015.1.27 - Raymond, 新增判斷行動平台, 修正行動平台字型大小不匹配桌機版問題
		if(isMobile) {
			styles.lineHeight = this.lineHeight + ((this.lineHeight - 1) * 0.06);	// 2015.11.16 改用比例?
		}
		else if(navigator.userAgent.indexOf("Trident") >= 0) {
			// 2016.10.31 IE用本來的行高, 不要微調
		}
		else {	// 2015.6.15 新增桌機瀏覽器的微調
			// 1100628 Raymond 1100692 修正微調行高當小於1.0會得到小於原來設定行高的數值的問題
			//styles.lineHeight = this.lineHeight + ((this.lineHeight - 1) * 0.06);
			// 1101224 Raymond 1101541 目前Chrome最新96版看來行高已與IE一致, 故判斷若為此版以後的版本則不需要微調行高
			if((navigator.userAgent.match(/Chrome\/(\d+)\./) || navigator.userAgent.match(/Chromium\/(\d+)\./)) && parseInt(RegExp.$1) < 96)
				styles.lineHeight = this.lineHeight * 1.02;
		}
		if(this.fontFamily && this.altFont)
			// 1101029 Raymond 1101199 修正Chrome V94、95版列印預覽時有些標楷體字型會破字的問題, 改成加入"全字庫正楷體", 並優先於標楷體, 全字庫正楷體字型需另外人工安裝, 非公文系統提供
			//styles.fontFamily = "'" + this.altFont + "','" + this.fontFamily + "','STKaiTi-TC-Regular','STKaiTiTC-Regular',sans-serif";	// 1060930 Raymond 新增macOS上的楷體對應字型名稱
			styles.fontFamily = "'" + this.altFont + "','" + ((this.fontFamily == "標楷體" && printMode === "useCNSFont")?"全字庫正楷體','":"") + this.fontFamily + "','STKaiTi-TC-Regular','STKaiTiTC-Regular',sans-serif";	// 1060930 Raymond 新增macOS上的楷體對應字型名稱
		else if(this.fontFamily)
			// 1101029 Raymond 1101199 修正Chrome V94、95版列印預覽時有些標楷體字型會破字的問題, 改成加入"全字庫正楷體", 並優先於標楷體, 全字庫正楷體字型需另外人工安裝, 非公文系統提供
			// 1071018 Raymond 1070957 未指定英數字型的段落仍應預設為Times New Roman
			//styles.fontFamily = "'" + this.fontFamily + "','STKaiTi-TC-Regular','STKaiTiTC-Regular',sans-serif";	// 1060930 Raymond 新增macOS上的楷體對應字型名稱
			//styles.fontFamily = "'Times New Roman','" + this.fontFamily + "','STKaiTi-TC-Regular','STKaiTiTC-Regular',sans-serif";	// 1060930 Raymond 新增macOS上的楷體對應字型名稱
			styles.fontFamily = "'Times New Roman','" + ((this.fontFamily == "標楷體" && printMode === "useCNSFont")?"全字庫正楷體','":"") + this.fontFamily + "','STKaiTi-TC-Regular','STKaiTiTC-Regular',sans-serif";	// 1060930 Raymond 新增macOS上的楷體對應字型名稱
		else if(this.altFont)
			styles.fontFamily = "'" + this.altFont + "','STKaiTi-TC-Regular','STKaiTiTC-Regular',sans-serif";	// 1060930 Raymond 新增macOS上的楷體對應字型名稱
		if(this.parent.onlyFirstPage) { // 2013.9.24 - Raymond, 支援onlyFirstPage
			if(this.parent.flowName == "xsl-region-before" || this.parent.flowName == "xsl-region-after") {	// 2015.5.20 合併2個if
				styles.marginLeft = this.space.start + this.getPageMargin().left + this.getUnit();
				styles.marginRight = this.space.end + this.getPageMargin().right + this.getUnit();
			}
		}
		if(this.styles != null) {	// 2015.5.19 新增套用styles(粗/斜/底)
			if(this.styles & 1)
				styles.fontWeight = "bolder";
			if(this.styles & 2)
				styles.fontStyle = "italic";
			if(this.styles & 4)
				styles.textDecoration = "underline";
			if(this.styles & 8) {	// 2016.12.8 新增支援上下標樣式
				styles.verticalAlign = "super";
				styles.fontSize = "75%";
			}
			else if(this.styles & 16) {
				styles.verticalAlign = "sub";
				styles.fontSize = "75%";
			}
		}
		var that = this;
		this.$para.css(styles)
				.on("change", function(event) {
					theLogger.log("$para.onchange: target:" + event.target);
					that.parent.getModel().dirty(true);
				})
				.data("para", this);	// 2016.2.2 新增將Para物件保存在data以供TCControl模組取用
		//if(readOnly != true)  // 2014.6.18 新增唯讀模式
		if(!printMode)	// 2016.7.25 列印模式不要套用EditController
			// 1100618 Raymond 1100482 BuildEditController()新增回傳值, 回傳false表示此欄位唯讀, 不允許異動, 無回傳值(undefined)則可異動
			//BuildEditController(this.$para, this, readOnly);	// 2015.10.22 readOnly改成參數傳入Controller, 因為縮排等功能還是必須由Controller先完成
			var fieldEditable = BuildEditController(this.$para, this, readOnly);	// 2015.10.22 readOnly改成參數傳入Controller, 因為縮排等功能還是必須由Controller先完成
		for(var i=0; i<this.inlines.length; i++) {
			//theLogger.log(this.inlines[i]);
			// 1100618 Raymond 1100482 依BuildEditController()回傳值初始化設定欄位是否唯讀, 回傳值false表示此欄位唯讀, 不允許異動
			if(!printMode && fieldEditable == false)
				this.inlines[i].instanciateSO(this.$para, true);  // 2014.6.18 新增唯讀模式
			else
			this.inlines[i].instanciateSO(this.$para, readOnly);  // 2014.6.18 新增唯讀模式
			
			if("syncPath" in this.inlines[i] && typeof this.inlines[i].syncPath === "string" && this.inlines[i].syncPath.length > 0) {
				var a = this.inlines[i].syncPath.match(/條列|主旨|段落/);
				if(a) {
					this.$para.addClass("segment");
					// 1091225 Raymond 信保序122 修正段落條列字型小於普通的16級時(信保為14級), 字距會使簽核頁面的折行處與歷史檢視的頁面呈現不一致
					if(this.fontSize < 16)
						this.$para.addClass("smallerfont");
					// 1091016 Raymond 1090621 合併FDA(1090507)修正令段落及條列的凸排計入字距, 及靠左對齊, 並增加判斷樣版檔是否支援"令條列"凸排功能
					var dt = this.getModel().getDocType();
					var sdt = this.getModel().getSubDocType();
					// 1140711 Raymond 1140958 新增會銜令也要比照令條列凸排方式
					// 1110927 Raymond 1110990 修正簽核頁面的令條列(隱藏標號), 凸排style沒有設到span.a仍在.para, 導致次行不會凸排的問題
					// 1110712 Raymond 1110666 修正令稿套用在「主旨：」不隱藏的樣版時, 主旨的文字會跳到下一行顯示的問題
					//if(dt == "令" && sdt == "令" && this.getModel().support1090621Feature()) {
					//if(dt == "令" && sdt == "令" && this.getModel().support1090621Feature() && (this.$para.find("> span").length < 2 && this.$para.find("> span").eq(0).hasClass("a"))) {
					//if(dt == "令" && sdt == "令" && this.getModel().support1090621Feature() && (!!this.inlines[i].syncPath.match(/條列/) || (this.$para.find("> span").length < 2 && this.$para.find("> span").eq(0).hasClass("a")))) {
					if(((dt == "令" && sdt == "令" && this.getModel().support1090621Feature()) || (((dt == "令" && sdt == "會銜令") || dt == "會銜令") && this.getModel().support1090621Feature() == 2)) && (!!this.inlines[i].syncPath.match(/條列/) || (this.$para.find("> span").length < 2 && this.$para.find("> span").eq(0).hasClass("a")))) {
						var pl = this.$para.get(0).style.paddingLeft;
						var ti = this.$para.get(0).style.textIndent;
						// 1100304 Raymond 1090931 段落的span.a改為inline-block後, Chrome的令條列縮排就跟IE一樣了, 凸排要改在span.a, div.para的凸排要取消或調整
						// 1100226 Raymond 信保序122調整letter-spacing為0.02em, 故凸排距離也應跟著調為1.02X
						//this.$para.css({textIndent: (parseInt(ti) * 1.03) + "em", paddingLeft: (parseInt(pl) * 1.03) + "em", textAlign: "left"});
						//this.$para.css({textIndent: (parseInt(ti) * 1.02) + "em", paddingLeft: (parseInt(pl) * 1.02) + "em", textAlign: "left"});
						if(this.inlines[i].syncPath.match(/條列/)) {	// 條列要調整div.para的縮排字數為該階層應縮排的字數, span.a則少縮排1個字
							// 1130319 Raymond 1121074 令條列取消強制靠左對齊
							//this.$para.css({textIndent: "", paddingLeft: ((parseInt(pl) + parseInt(ti)) * 1.02) + "em", textAlign: "left"});
							this.$para.css({textIndent: "", paddingLeft: ((parseInt(pl) + parseInt(ti)) * 1.02) + "em"});
							this.$para.find("span.a").css({textIndent: (parseInt(ti) * 1.02) + "em", paddingLeft: ((0 - parseInt(ti)) * 1.02) + "em"});
							// 1110926 Raymond 1110990 新增令條列支援對齊父段落功能
							if(this.alignParentContext === true) {	// 對齊父段落
								function alignParentPara() {
									var m = this.inlines[i].syncPath.match(/條列/g);
									var thisLvl = m.length;
									theLogger.log("本段落(lvl = " + thisLvl + ")...");
									var prev = this.prev, parentPara, lvl = 0;
									while(!!prev && prev.type == "Para") {
										var notSeg = false;
										$.each(prev.inlines, function(idx, inl) {
											if(!!inl.syncPath) {
												m = inl.syncPath.match(/條列/g);
												// 修正第1個條列不能對齊段落的問題
												if(!!m)
													lvl = m.length;	// 子條列階層由syncPath的條列數判定
												else {
													m = inl.syncPath.match(/段落/);
													if(!!m)
														lvl = 0;	// 父段落是段落的話, 階層就是0
													else
														notSeg = true;	// 父段落即不是條列也不是段落的話無法判斷對齊對象
												}
												//notSeg = m.length == 0;
											}
										});
										if(notSeg)   // 前一Para非"條列"或"段落"
											break;
										if(lvl < thisLvl) {
											parentPara = prev;
											break;
										}
										prev = prev.prev;
									}
									if(!!parentPara) {// 修正3階層後的子條列未對齊父段落問題
										theLogger.log("對齊父段落(lvl = " + lvl + ", paddingLeft = " + parentPara.$para.get(0).style.paddingLeft + ")");
										this.$para.css({paddingLeft: parentPara.$para.get(0).style.paddingLeft});
										this.$para.find("span.a").css({textIndent: (parseInt(parentPara.indent) * 1.02) + "em", paddingLeft: ((0 - parseInt(parentPara.indent)) * 1.02) + "em"});
									}
									else
										theLogger.error("找不到父段落, 無法對齊");
								}
								alignParentPara.apply(this);
							}
						}
						else {	// 主旨或段落不用調整div.para的縮排字數, 直接把縮排參數改到span.a
							// 1130319 Raymond 1121074 令的段落取消強制靠左對齊
							//this.$para.css({textIndent: "", paddingLeft: "", textAlign: "left"});
							this.$para.css({textIndent: "", paddingLeft: ""});
							this.$para.find("span.a").css({textIndent: (parseInt(ti) * 1.02) + "em", paddingLeft: (parseInt(pl) * 1.02) + "em"});
						}
					}
					else
					if(printMode && this.inlines[i].syncPath.match(/條列/)) {	// 2016.11.4 FIX for 列印條列的序號
						if(this.$para.find("span").eq(0).hasClass("plain")) {
							if(this.inlines[0].text.match(/^\(/) && this.inlines[0].text.match(/\)$/))
								this.$para.find("span").eq(0).addClass("numbering even");
							else
								this.$para.find("span").eq(0).addClass("numbering");
							// 1100604 Raymond 1100594 修正在某些電腦的Chrome環境下, 標題字體會比em寬一點點, 只設定凸排幾em的話會導致空間不夠寬而把文字擠到次行, 導致標號字串自己成一行的問題
							if(this.$para.find("span").length > 1 && this.$para.find("span").eq(1).hasClass("a"))
								this.$para.find("span").eq(1).css("display", "inline");	// 先調成inline, 讓文字部分不要因寬度不夠, 整塊折行
							this.$para.css("text-align", "justify");	// 1090317 Raymond 1090164 暫時先恢復分散對齊, 以免.width()計算寬度不夠準確
							var nw = this.$para.find("span").eq(0).width();
							if(nw) {
								var pl = this.$para.get(0).style.paddingLeft;
								var ti = this.$para.get(0).style.textIndent;
								// 2016.11.17 fix for 人事令函要對齊冒號
								//var dt = this.getModel().getDocType();	// 1091016 Raymond 1090621 合併FDA(1090507)判斷式前已取得
								// 1110801 Raymond 考試院序147 新增令類別=人事令
								// 1090226 Raymond 1090116 新增派兼令、函類別=獎懲建議函、令類別=獎懲令
								//var sdt = this.getModel().getSubDocType();	// 1091016 Raymond 1090621 合併FDA(1090507)判斷式前已取得
								//if(dt == '派免建議函' || dt == '派令' || dt == '派免兼建議函' || dt == '派免令' || dt == '獎懲建議函' || dt == '獎懲令') {
								if(dt == '派免建議函' || dt == '派令' || dt == '派免兼建議函' || dt == '派免令' || dt == '獎懲建議函' || dt == '獎懲令' || dt == '派兼令' ||
									(dt == '令' && sdt == '獎懲令') || (dt == '令' && sdt == '派免令') || (dt == '函' && sdt == '獎懲建議函') || (dt == '函' && sdt == '派免建議函') || (dt == '令' && sdt == '人事令')) {
									var p = this.$para.eq(0).text().indexOf("：");
									// 1100325 Raymond 1090804 修正第二個(含)以後的段落(說明、附註...etc)皆不要對齊全形冒號
									if(this.inlines[i].syncPath.match(/段落\[(\d+)\]/)) {
										if(isIE) {
											if(RegExp.$1 >= 1) {	// IE的XPath是0-based
												theLogger.debug("第" + (RegExp.$1 + 1) + "個段落不須對齊冒號");
												p = -1;
											}
										}
										else {
											if(RegExp.$1 >= 2) {	// Chrome的XPath是1-based
												theLogger.debug("第" + RegExp.$1 + "個段落不須對齊冒號");
												p = -1;
											}
										}
									}
									else
									// 1090422 Raymond 1090252 檢查冒號若是最後一個字則不要設定縮排, 以避免冒號出現在靠右邊界至無剩餘空間容納下一個字時, 整行位移至次行的問題
									if(p >= 0 && p == (this.$para.eq(0).text().length - 1)) {
										theLogger.debug("冒號為本條列最末字, 不要設定縮排");
										p = -1;
									}
									if(p >= 0) {
										var nc = this.$para.find("span").eq(0).text().length;
										var ofs = parseInt(ti) + parseInt(pl);
										if(navigator.userAgent.indexOf("Trident") >= 0) {	// IE
											this.$para.css({textIndent: "-" + (nw + 1) + "px", paddingLeft: "calc(" + ofs + "em + " + nw + "px)"});
											// 1100226 Raymond 信保序122調整letter-spacing為0.02em, 故凸排距離也應跟著調為1.02X
											// 1090317 Raymond 1090116 修正IE下人事令函的條列在列印分頁未對齊冒號問題
											//this.$para.find("span").eq(1).css({textIndent: "-" + (nc * 1.03) + "em", paddingLeft: (nc * 1.03) + "em", display: "inline-block"});
											//this.$para.find("span").eq(1).css({textIndent: "-" + ((p + 1 - nc) * 1.03) + "em", paddingLeft: ((p + 1 - nc) * 1.03) + "em", display: "inline-block"});
											this.$para.find("span").eq(1).css({textIndent: "-" + ((p + 1 - nc) * 1.02) + "em", paddingLeft: ((p + 1 - nc) * 1.02) + "em", display: "inline-block"});
										}
										else {	// Chrome
											// 1100226 Raymond 1090931 段落的span.a改為inline-block後, Chrome的對齊人事令函冒號就跟IE一樣了, 凸排要改在span.a
											//ofs = parseInt(ti) + nc;
											//pl = parseInt(pl) - nc;
											//this.$para.css({textIndent: "calc(" + (ofs * 1.03) + "em - " + nw + "px)", paddingLeft: "calc(" + (pl * 1.03) + "em + " + nw + "px)"});
											this.$para.css({textIndent: "-" + (nw + 1) + "px", paddingLeft: "calc(" + ofs + "em + " + nw + "px)"});
											this.$para.find("span").eq(1).css({textIndent: "-" + ((p + 1 - nc) * 1.02) + "em", paddingLeft: ((p + 1 - nc) * 1.02) + "em", display: "inline-block"});
										}
									}
									else {
										//if(navigator.userAgent.indexOf("Trident") >= 0) {	// IE
											var ofs = parseInt(pl) + parseInt(ti);
											//if(this.$para.eq(0).text().indexOf("(") == 0)	// 有()的條列因為2個字只佔1個字寬, 所以要減1
											//	this.$para.css({textIndent: ((parseInt(ti) + 1) * 1.03) + "em", paddingLeft: ((parseInt(pl) - 1) * 1.03) + "em"});
											//else
											//	this.$para.css({textIndent: (parseInt(ti) * 1.03) + "em", paddingLeft: (parseInt(pl) * 1.03) + "em"});
											// 1100226 Raymond 信保序122調整letter-spacing為0.02em, 故凸排距離也應跟著調為1.02X
											//this.$para.css({textIndent: "-" + (nw + 1) + "px", paddingLeft: "calc(" + (ofs * 1.03) + "em + " + nw + "px)"});
											this.$para.css({textIndent: "-" + (nw + 1) + "px", paddingLeft: "calc(" + (ofs * 1.02) + "em + " + nw + "px)"});
										//}
										//else {	// Chrome
										//	var nc = this.$para.find("span").eq(0).text().length;
											// 1080219 Raymond 修正獎懲令對齊冒號部分次行縮排不夠(應再靠右縮一點), 不太對齊的問題
											//if(this.$para.find("span").eq(0).text().indexOf("(") == 0) {
											//	var ofs = parseInt(ti) + nc;
											//	pl = parseInt(pl) - 1;
											//}
											//else {
											//	var ofs = parseInt(ti) + nc;
											//	pl = parseInt(pl);
											//}
											//this.$para.css({textIndent: "calc(" + (ofs * 1.03) + "em - " + nw + "px)", paddingLeft: (pl * 1.03) + "em"});
										//	var ofs = parseInt(ti) + nc;
										//	pl = parseInt(pl) - nc;
										//	this.$para.css({textIndent: "calc(" + (ofs * 1.03) + "em - " + nw + "px)", paddingLeft: "calc(" + (pl * 1.03) + "em + " + nw + "px)"});
										//}
									}
								}
								else {
									var ofs = parseInt(pl) + parseInt(ti);
									// 1110713 Raymond 1110625 修正列印時, 條列的凸排與簽核頁面不一致, 導致可能發生多折行一個字的問題
									// 1100226 Raymond 修正Chrome下先調瀏覽器顯示比例為110%, 再列印, 於列印分頁點右鍵的列印或再調瀏覽器顯示比例回100%, 會因為Chrome回報nw數值與100%時不一致(較小, 差在小數點第2位)而發生條列文字空第一行的問題
									//this.$para.css({textIndent: "-" + nw + "px", paddingLeft: "calc(" + ofs + "em + " + nw + "px)"});
									//this.$para.css({textIndent: "-" + (nw + 1) + "px", paddingLeft: "calc(" + (ofs * 1.02) + "em + " + nw + "px)"});	// 凸排比照人事令函的條列多扣1px可cover寬度px的小數點第2位誤差所造成的問題
									this.$para.css({textIndent: "-" + (nw + 1) + "px", paddingLeft: "calc(" + ofs + "em + " + nw + "px)"});	// 凸排比照人事令函的條列多扣1px可cover寬度px的小數點第2位誤差所造成的問題
								}
							}
							// 1100604 Raymond 1100594 修正在某些電腦的Chrome環境下, 標題字體會比em寬一點點, 只設定凸排幾em的話會導致空間不夠寬而把文字擠到次行, 導致標號字串自己成一行的問題
							if(this.$para.find("span").length > 1 && this.$para.find("span").eq(1).hasClass("a"))
								this.$para.find("span").eq(1).css("display", "");	// 恢復成CSS rule的inline-block
							this.$para.css("text-align", "");	// 1090317 Raymond 1090164 再移除文字對齊樣式
						}
						// 1090226 Raymond 1090116 新增若人事令函的條列隱藏標號
						else {
							// 1100226 Raymond 對齊父段落的程式碼包成function, 以供一般文別及人事令函隱藏標號且無冒號的條列套用
							function alignParentPara() {
								var m = this.inlines[i].syncPath.match(/條列/g);
								var thisLvl = m.length;
								theLogger.log("本段落(lvl = " + thisLvl + ")...");
								var prev = this.prev, parentPara, lvl = 0;
								while(!!prev && prev.type == "Para") {
									var notSeg = false;
									$.each(prev.inlines, function(idx, inl) {
										if(!!inl.syncPath) {
											m = inl.syncPath.match(/條列/g);
											// 修正第1個條列不能對齊段落的問題
											if(!!m)
												lvl = m.length;	// 子條列階層由syncPath的條列數判定
											else {
												m = inl.syncPath.match(/段落/);
												if(!!m)
													lvl = 0;	// 父段落是段落的話, 階層就是0
												else
													notSeg = true;	// 父段落即不是條列也不是段落的話無法判斷對齊對象
											}
											//notSeg = m.length == 0;
										}
									});
									if(notSeg)   // 前一Para非"條列"或"段落"
										break;
									if(lvl < thisLvl) {
										parentPara = prev;
										break;
									}
									prev = prev.prev;
								}
								if(!!parentPara) {// 修正3階層後的子條列未對齊父段落問題
									theLogger.log("對齊父段落(lvl = " + lvl + ", paddingLeft = " + parentPara.$para.get(0).style.paddingLeft + ")");
									this.$para.css({paddingLeft: parentPara.$para.get(0).style.paddingLeft});
								}
								else
									theLogger.error("找不到父段落, 無法對齊");
							}
							var pl = this.$para.get(0).style.paddingLeft;
							var ti = this.$para.get(0).style.textIndent;
							// 2016.11.17 fix for 人事令函要對齊冒號
							//var dt = this.getModel().getDocType();	// 1091016 Raymond 1090621 合併FDA(1090507)判斷式前已取得
							// 1090226 Raymond 1090116 新增派兼令、函類別=獎懲建議函、令類別=獎懲令
							//var sdt = this.getModel().getSubDocType();	// 1091016 Raymond 1090621 合併FDA(1090507)判斷式前已取得
							if(dt == '派免建議函' || dt == '派令' || dt == '派免兼建議函' || dt == '派免令' || dt == '獎懲建議函' || dt == '獎懲令' || dt == '派兼令' ||
								(dt == '令' && sdt == '獎懲令') || (dt == '令' && sdt == '派免令') || (dt == '函' && sdt == '獎懲建議函') || (dt == '函' && sdt == '派免建議函')) {
								var p = this.$para.eq(0).text().indexOf("：");
								// 1100325 Raymond 1090804 修正第二個(含)以後的段落(說明、附註...etc)皆不要對齊全形冒號
								if(this.inlines[i].syncPath.match(/段落\[(\d+)\]/)) {
									if(isIE) {
										if(RegExp.$1 >= 1) {	// IE的XPath是0-based
											theLogger.debug("第" + (RegExp.$1 + 1) + "個段落不須對齊冒號");
											p = -1;
										}
									}
									else {
										if(RegExp.$1 >= 2) {	// Chrome的XPath是1-based
											theLogger.debug("第" + RegExp.$1 + "個段落不須對齊冒號");
											p = -1;
										}
									}
								}
								else
								// 1090422 Raymond 1090252 檢查冒號若是最後一個字則不要設定縮排, 以避免冒號出現在靠右邊界至無剩餘空間容納下一個字時, 整行位移至次行的問題
								if(p >= 0 && p == (this.$para.eq(0).text().length - 1)) {
									theLogger.debug("冒號為本條列最末字, 不要設定縮排");
									p = -1;
								}
								if(p >= 0) {
									//if(navigator.userAgent.indexOf("Trident") >= 0)	// IE
										// 1100226 Raymond 信保序122調整letter-spacing為0.02em, 故凸排距離也應跟著調為1.02X
										//this.$para.css({textIndent: (parseInt(ti) * 1.03) + "em", paddingLeft: (parseInt(pl) * 1.03) + "em"});
										this.$para.css({textIndent: (parseInt(ti) * 1.02) + "em", paddingLeft: (parseInt(pl) * 1.02) + "em"});
									//else {	// Chrome
									//	ofs = parseInt(ti) + nc;
									//	pl = parseInt(pl) - nc;
									//	this.$para.css({textIndent: "calc(" + (ofs * 1.03) + "em - " + nw + "px)", paddingLeft: "calc(" + (pl * 1.03) + "em + " + nw + "px)"});
									//}
									// 1100226 Raymond 修正人事令函條列隱藏標號時次行未對齊冒號問題
									this.$para.find("span").eq(0).css({textIndent: "-" + ((p + 1) * 1.02) + "em", paddingLeft: ((p + 1) * 1.02) + "em"});
								}
								// 1100226 Raymond 修正人事令函隱藏標號又無冒號時須對齊父段落未對齊問題
								else if(this.alignParentContext === true) {	// 對齊父段落
									alignParentPara.apply(this);
								}
							}
							// 1090428 Raymond 1090320 修正無標號條列須對齊父段落未對齊問題
							else if(this.alignParentContext === true) {	// 對齊父段落
								/* 1100226 Raymond 下列程式碼包成function, 以供一般文別及人事令函隱藏標號且無冒號的條列套用
								var m = this.inlines[i].syncPath.match(/條列/g);
								var thisLvl = m.length;
								theLogger.log("本段落(lvl = " + thisLvl + ")...");
								var prev = this.prev, parentPara, lvl = 0;
								while(!!prev && prev.type == "Para") {
									var notSeg = false;
									$.each(prev.inlines, function(idx, inl) {
										if(!!inl.syncPath) {
											m = inl.syncPath.match(/條列/g);
											// 修正第1個條列不能對齊段落的問題
											if(!!m)
												lvl = m.length;	// 子條列階層由syncPath的條列數判定
											else {
												m = inl.syncPath.match(/段落/);
												if(!!m)
													lvl = 0;	// 父段落是段落的話, 階層就是0
												else
													notSeg = true;	// 父段落即不是條列也不是段落的話無法判斷對齊對象
											}
											//notSeg = m.length == 0;
										}
									});
									if(notSeg)   // 前一Para非"條列"或"段落"
										break;
									if(lvl < thisLvl) {
										parentPara = prev;
										break;
									}
									prev = prev.prev;
								}
								if(!!parentPara) {// 修正3階層後的子條列未對齊父段落問題
									theLogger.log("對齊父段落(lvl = " + lvl + ", paddingLeft = " + parentPara.$para.get(0).style.paddingLeft + ")");
									this.$para.css({paddingLeft: parentPara.$para.get(0).style.paddingLeft});
								}
								else
									theLogger.error("找不到父段落, 無法對齊");*/
								alignParentPara.apply(this);
							}
						}
					}
					else if(printMode) {	// 2017.3.13 修正主旨/段落的文字縮排距離
						if(this.$para.find("span").eq(0).hasClass("plain")) {	// 2017.3.20 修正不顯示標題的主旨仍凸排的問題
							// 1100514 Raymond 與1100469類似, 修正在某些電腦的Chrome環境下, 標題字體會比em寬一點點, 只設定凸排幾em的話會導致空間不夠寬而把文字擠到次行, 分散對齊時標題字串會填满整行, 造成後面計算實際凸排寬度時抓成整行寬度, 而發生主旨/段落文字變一個字寬的直行問題
							this.$para.css({paddingLeft: (this.padding.start * 1.02) + "em",
											textIndent: "calc(" + (this.indent * 1.02) + "em - " + (0 - this.indent) + "px)"});
							// 1100604 Raymond 1100594 修正上述修改仍有部分電腦無法解決問題
							if(this.$para.find("span").length > 1 && this.$para.find("span").eq(1).hasClass("a")) {
								this.$para.find("span").eq(1).css("display", "inline");	// 先調成inline, 讓文字部分不要因寬度不夠, 整塊折行
								// 1110817 Raymond 考試院序206 修正主旨在簽核頁面與列印分頁時, 標題寬度不一致造成折行不一致的問題
								this.$para.find("span").eq(0).css("display", "inline-block");
							}
							this.$para.css({"text-align": "justify"});	// 1080215 Raymond 1080169 暫時先恢復分散對齊, 以免.width()計算寬度不夠準確
							var nw = this.$para.find("span").eq(0).width();
							if(nw) {
								// 1100322 Raymond 修正表格中的段落在列印時, 可能段名寬度實際上有小數點, 但算出來的整數寬度小於實際寬度(四捨五入?), 若凸排未多-1px的話, 可能導致段落文字被擠到次行變上下2行, 而上一行的段名變分散對齊的問題
								//this.$para.css({textIndent: "-" + nw + "px"});	// 不調paddingLeft會剛好, 不知為何
								this.$para.css({textIndent: "-" + (nw + 1) + "px"});	// 不調paddingLeft會剛好, 不知為何
								// 1080215 Raymond 1080169 修正Chrome新版(72.0.3626.109)在WIN10下列印預覽後, textIndent超出flow body範圍會被隱藏掉第1個字的問題
								this.$para.css({paddingLeft: nw + "px", textAlign: ""});	// 再移除文字對齊樣式
								// 1070329 Raymond 1070414 修正Chrome下若段落位於表格中則將table-layout設為fixed即可防止整串段落內容都是追蹤修訂標籤時會撐大表格寬度的問題
								// 1060921 Raymond 1060836 修正IE下主旨/段落/條列的文字有長英文會超出可顯示區域的問題
								//if(navigator.userAgent.indexOf("Trident") >= 0 &&
								//	this.$para.find("span").length > 1 && this.$para.find("span").eq(1).hasClass("a")) {
								if(this.$para.find("span").length > 1 && this.$para.find("span").eq(1).hasClass("a")) {
									if(this.$para.closest("table").length > 0)	// 若段落位於表格中則將table-layout設為fixed即可防止長英文撐大表格寬度
										this.$para.closest("table").css("table-layout", "fixed");
								}
							}
							// 1100604 Raymond 1100594 修正上述修改仍有部分電腦無法解決問題
							if(this.$para.find("span").length > 1 && this.$para.find("span").eq(1).hasClass("a"))
								this.$para.find("span").eq(1).css("display", "");	// 恢復成CSS rule的inline-block
						}
					}
					/* 1090319 Raymond 1090164 修正主旨/段落的文字在IE下因textIndent沒有多減1px, 造成向下移一行的問題
					else if(this.$para.find("span").eq(0).hasClass("plain") && !this.inlines[i].syncPath.match(/條列/)) {	// 1080215 Raymond 1080169 修正簽核頁面首行標題寬度與次行縮排差一點點未對齊的問題
						this.$para.css({"text-align": "justify"});	// 暫時先恢復分散對齊, 以免.width()計算寬度不夠準確
						var nw = this.$para.find("span").eq(0).width();
						if(nw > 0)
							this.$para.css({textIndent: "-" + nw + "px", paddingLeft: nw + "px", textAlign: ""});	// 再移除文字對齊樣式
					}*/
					/* 1120920 Raymond 1120785 取消以下處理, 以修正在簽核頁面的主旨扣掉標題寬度後與列印頁面的主旨扣掉標題寬度後剩下內容的寬度不一致(簽核頁面較窄), 導致折行點不同造成行數不同(簽核頁面多一行), 而使列印頁面少一頁的問題
					// 1110829 Raymond 考試院序206 修正有()層級的條列會提前一個字折行的問題
					// 1110817 Raymond 考試院序206 修正簽核頁面的主旨因標題凸排寬度與列印時不同而與列印頁面折行不一致的問題
					//else if(this.$para.find("span").eq(0).hasClass("plain")) {
					else if(this.$para.find("span").eq(0).hasClass("plain") && !this.inlines[i].syncPath.match(/條列/)) {
						this.$para.css({paddingLeft: (this.padding.start * 1.02) + "em",
										// 1110824 Raymond 考試院序225 修正簽核頁面主旨/說明/擬辦標題左邊被切到一點點的問題
										//textIndent: "calc(" + (this.indent * 1.02) + "em - " + (0 - this.indent) + "px)"});
										textIndent: "calc(" + (this.indent * 1.02) + "em - 1px)"});
					}*/
				}
			}
		}
		// 2013.9.24 - Raymond, fix justify single span
		if(this.inlines.length == 1) {
			if(this.align == "justify") {
				// TODO: 目前單行中文沒辦法分散對齊,
				// 在中文字最後補上一長串&nbsp;強迫變成2行, 可使瀏覽器觸發分散對齊機制
				// 但中文字中間都要補1個半形空白, 不然一串中文字仍是被瀏覽器視為一個Word
				// 若用word-break:"break-all", 雖然可以拆掉這個限制, 但同時也把為了分行目的
				// 而添加的&nbsp;全都拆了, 最後仍是得到沒分散對齊的樣子
				// PS:字中間補半形空白的方法僅適用於Mobile Safari, Windows版Safari沒用
			}
		}
		else if(this.align == "justify") {
			// 1100521 Raymond 1100480 不要預設裝訂線字距
			//this.$para.css("letter-spacing", "0.66px");	// 2015.11.24 FIX, 裝訂線分散對齊
			// 2016.3.1 FIX, Chrome下裝訂線0.66px分隔太大
			var w = this.$para.parent().width(), w1 = 0, t = 0;
			for(var i=0; i<this.$para.children().length; i++) {
				w1 += this.$para.children().eq(i).width();
				t += this.$para.children()[i].textContent.length;
			}
			var d = (w - w1) / (t + 1);
			if(d < 0)
				this.$para.css("letter-spacing", "0px");
		}
		// 1080515 Raymond 1080353 迴避Chrome 73+列印時邊界區的Para的margin-top不會套用的bug
		if(navigator.userAgent.match(/Chrome\/(\d.)/) &&
			(this.parent.flowName == "xsl-region-before")) {
			console.log(RegExp.$1);
			this.$para.css("display", "inline-block");
		}
		
		// 2016.11.10 fix IE併案文號
		if(this.prev && this.prev.type == "Para" && this.prev.inlines.length == 1 && this.prev.inlines[0].text == "併案文號：") {
			theLogger.log("修正併案文號在IE下不會自動折行問題");
			this.$para.css("width", "20mm");
		}
	}
	Para.prototype.find = function(type, a) {
		if(type == this.type)
			a.push(this);
		else {
			for(var i=0; i<this.inlines.length; i++) {
				if(this.inlines[i].is(type))
					a.push(this.inlines[i]);
			}
		}
	}
	// 2015.11.16
	Para.prototype.refreshDim = function() {
		for(var i=0; i<this.inlines.length; i++) {
			if("refreshDim" in this.inlines[i])
				this.inlines[i].refreshDim();
		}
	}
	
	// Table class
	//
	function Table(xmlNode, prevBlock, parent) {
		
		this.type = "Table";
		this.parent = parent;
		this.prev = prevBlock;
		if(prevBlock != null)
			prevBlock.next = this;
		this.next = null;
		
		if(xmlNode != null) {
			this.borderWidth = parseFloat(xmlNode.getAttribute("border-width")) || 0;
			this.padding = {
				before: parseInt(xmlNode.getAttribute("padding-before")) || 0,
				after: parseInt(xmlNode.getAttribute("padding-after")) || 0,
				start: parseInt(xmlNode.getAttribute("padding-start")) || 0,
				end: parseInt(xmlNode.getAttribute("padding-end")) || 0
			};
			this.space = {
				before: parseFloat(xmlNode.getAttribute("space-before")) || 0,
				after: parseFloat(xmlNode.getAttribute("space-after")) || 0,
				start: parseFloat(xmlNode.getAttribute("space-start")) || 0,
				end: parseFloat(xmlNode.getAttribute("space-end")) || 0
			};
			this.showInPage = parseInt(xmlNode.getAttribute("show-in-page")) || 7;
			this.borderCollapse = xmlNode.getAttribute("border-collapse");
			this.keepTogether = xmlNode.getAttribute("keep-together");
		}
		this.rows = new Array();
	
		var nl = xmlNode.childNodes, lastRow = null;
		for(var i=0; i<nl.length; i++) {
			this.rows.push(new TableRow(nl[i], lastRow, this));
			lastRow = this.rows[this.rows.length-1];
		}
		
	}
	Table.prototype.instanciateSO = function($flow, readOnly, printMode) {  // 2015.9.17 新增唯讀模式, 2016.7.25 新增列印模式
		var $tbl = $("<table class='table' cellpadding='0' cellspacing='0' data-showinpage='" + this.showInPage + "'></table>").appendTo($flow);
		var bs = this.borderStyle || "solid";
		if(this.borderStyle == "dot")
			bs = "dotted";
		else if(this.borderStyle == "dash")
			bs = "dashed";
		var bc = "collapse";
		if(this.borderCollapse == "seperate")
			bc = "seperate";
		$tbl.css({
			borderStyle: bs,
			borderWidth: this.borderWidth + "pt",
			borderColor: "black",
			marginTop: this.space.before + this.getUnit(),
			marginBottom: this.space.after + this.getUnit(),
			marginLeft: this.space.start + this.getUnit(),
			marginRight: this.space.end + this.getUnit(),
			//width: "100%",			2015.1.23 - Raymond, 在margin-left、margin-right大於0的情況下, width若設為100%會擴大
			borderCollapse: bc
		})
		.attr("data-keep-together", this.keepTogether);
		if(this.parent.onlyFirstPage && // 2015.5.20 - 支援onlyFirstPage
			(this.parent.flowName == "xsl-region-before" || this.parent.flowName == "xsl-region-after")) {
			$tbl.css({marginLeft: (this.space.start + this.getPageMargin().left) + this.getUnit(),
				marginRight: (this.space.end + this.getPageMargin().right) + this.getUnit()/* 1091026 Raymond 1090735 修正首頁邊界區的表格物件因設定了扣除掉左右邊界寬的寬度, 變成儲存格各自寬度總和不及頁寬時, 會拉寬至頁寬造成與GenPage不一致的問題,
				width: (this.getPageWidth() - this.space.start - this.space.end - this.getPageMargin().left - this.getPageMargin().right) + this.getUnit()*/});
		}
		// 2015.1.23 - Raymond, 在margin-left、margin-right等於0的情況下, width才設為100%
		// 2015.11.12 - FIX, 在所有table-cell都設了width的情況下, table的寬度設為100%會改變td的寬度
		else if(this.space.start == 0 && this.space.end == 0) {
			var hasAuto = false;
			for(var i=0; i<this.rows.length; i++) {
				for(var j=0; j<this.rows[i].cells.length; j++) {
					if(this.rows[i].cells[j].cellWidth == 0 || this.rows[i].cells[j].cellWidth == NaN) {
						hasAuto = true;
					}
				}
			}
			if(hasAuto)
				$tbl.css("width", "100%");
		}
		for(var i=0; i<this.rows.length; i++) {
			this.rows[i].instanciateSO($tbl, readOnly, printMode);  // 2015.9.17 新增唯讀模式, 2016.7.25 新增列印模式
		}
		// 1091223 Raymond 1090735 Chrome 87又出現此問題了, 修改迴避方式為增加一個DIV取代margin-top的高度
		// 1060516 Raymond 1060286 迴避Chrome 57+列印時邊界區的Table的margin-top不會套用的bug
		/*if(navigator.userAgent.match(/Chrome\/(\d.)/) &&
			(this.parent.flowName == "xsl-region-before" || this.parent.flowName == "xsl-region-after")) {
			console.log(RegExp.$1);
			// 1091026 Raymond 1090735 修正上下邊界區的表格因設定了inline-block, 導致SignArea跑出TableCell的問題
			if(RegExp.$1 >= 57 && RegExp.$1 <= 60)	// 目前Chrome版本已到86, 列印時沒有此問題, 因此修正是為了避免57版的bug, 也不知是哪個版修好了, 姑且定個57~60版仍會啟用此修正吧
			$tbl.css("display", "inline-block");
		}*/
		if(navigator.userAgent.indexOf("Chrome") >= 0 && this.parent.flowName == "xsl-region-before" && printMode) {
			if(this.space.before > 0) {
				theLogger.log("修正上邊界區Table的margin-top在(Chrome的)預覽列印子視窗會被忽略的問題");
				$tbl.css("margin-top", "0").before("<div style='height:" + this.space.before + this.getUnit() + "'></div>");
			}
		}
		
		// 2015.11.16 FIX, 格寬在全部排完後才會確定
		for(var i=0; i<this.rows.length; i++)
			this.rows[i].refreshDim();
		
		// 1101012 Raymond 修正IE下若第一個Row的最後一個Cell有設定寬度跟ColSpan, 會寬度異常的問題
		if(isIE && this.rows.length > 1 && this.rows[0].cells.length > 1) {
			var lc = this.rows[0].cells[this.rows[0].cells.length - 1];
			if(lc.colSpan > 1 && lc.cellWidth > 0) {
				theLogger.log("修正IE下第一個Row的最後一個Cell有設定ColSpan的寬度異常問題");
				if(!!lc.$cell)
					lc.$cell.css("width", "");
				else
					theLogger.warn("TableCell無$cell可重設寬度?");
			}
		}
	}
	Table.prototype.find = function(type, a) {
		if(type == this.type)
			a.push(this);
		for(var i=0; i<this.rows.length; i++)
			this.rows[i].find(type, a);
	}

	// TableRow class
	//
	function TableRow(xmlNode, prevRow, parent) {
		
		this.type = "TableRow";
		this.parent = parent;
		this.prev = prevRow;
		if(prevRow != null)
			prevRow.next = this;
		this.next = null;
		
		if(xmlNode != null) {
			this.rowHeight = parseFloat(xmlNode.getAttribute("row-height"));
			var fc = xmlNode.getAttribute("free-cell");		// 2016.4.20 HTML版排版引擎新增的排版屬性
			if(typeof fc === "string")
				this.freeCell = fc == "true";
			// 1121120 Raymond 1120887 新增記錄簽核區域ID
			var saId = xmlNode.getAttribute("sa-id");
			if(typeof saId === "string" && saId.length > 0)
				this.saId = saId;
			// 1130124 Raymond 1120887 新增最小高度設定值
			if(xmlNode.hasAttribute("min-height"))
				this.minHeight = xmlNode.getAttribute("min-height");
		}
		this.cells = new Array();
		
		var nl = xmlNode.childNodes, lastCell = null;
		for(var i=0; i<nl.length; i++) {
			this.cells.push(new TableCell(nl[i], lastCell, this));
			lastCell = this.cells[this.cells.length-1];
		}
		this.isLast = function(cell) {	// 2016.4.20 新增method, 供TableCell詢問
			return cell == lastCell;
		}
		
	}
	TableRow.prototype.instanciateSO = function($tbl, readOnly, printMode) {  // 2015.9.17 新增唯讀模式, 2016.7.25 新增列印模式
		var $row = $("<tr class='table-row'></tr>").appendTo($tbl);
		if(this.rowHeight != null && this.rowHeight > 0)
			$row.css("height", this.rowHeight + this.getUnit());
		// 1121120 Raymond 1120887 新增記錄簽核區域ID
		var ro = readOnly;
		if(!!this.saId) {
			$row.attr("sa-id", this.saId);
			// 1121207 Raymond 1120887 新增區分會辦單位允許編輯的欄位
			let dm = this.getModel();
			if(readOnly == false && this.getSupportSALP()) {
				if(dm.isConUnit()) {
					if(this.saId.length == sso_const.FIRSTCLASS_UNITNO_LEN) {	// saId超過一級單位代碼長度(2)的應為手動輸入的單位, 這些單位的編輯區就不鎖定編輯功能了, 因為不知道如何對應出正確的單位
						let ouid = dm.getDocObj().get("ODWMSG", "OWN_OU_ID");
						let lv1ouid = ouid.substr(0, sso_const.FIRSTCLASS_UNITNO_LEN);
						if(lv1ouid == this.saId) {
							theLogger.log("表格列的簽核區域ID(" + this.saId + ")與目前會辦單位(" + ouid + ")的一級單位代碼(" + lv1ouid + ")一致, 允許編輯");
						}
						else {	// OWN_OU_ID前2碼與這表格列的簽核區域ID不一致則設為唯讀
							theLogger.log("表格列的簽核區域ID(" + this.saId + ")與目前會辦單位(" + ouid + ")的一級單位代碼(" + lv1ouid + ")不一致, 禁止編輯");
							ro = true;
						}
					}
				}
				else {
					theLogger.log("表格列的簽核區域ID(" + this.saId + "), 禁止編輯");
					ro = true;
				}
			}
		}
		if(this.freeCell) {	// 2016.4.20 HTML版排版引擎新增的排版屬性
			var $cell = $("<td class='free-cell'></td>").appendTo($row);
			for(var i=0; i<this.cells.length; i++) {
				// 1121207 Raymond 1120887 新增區分會辦單位允許編輯的欄位
				//this.cells[i].instanciateSO($cell, readOnly, printMode);	// 2016.7.25 新增列印模式
				this.cells[i].instanciateSO($cell, ro, printMode);	// 2016.7.25 新增列印模式
			}
		}
		else {
			for(var i=0; i<this.cells.length; i++) {
				// 1121207 Raymond 1120887 新增區分會辦單位允許編輯的欄位
				//this.cells[i].instanciateSO($row, readOnly, printMode);  // 2015.9.17 新增唯讀模式, 2016.7.25 新增列印模式
				this.cells[i].instanciateSO($row, ro, printMode);  // 2015.9.17 新增唯讀模式, 2016.7.25 新增列印模式
			}
		}
	}
	TableRow.prototype.find = function(type, a) {
		if(type == this.type)
			a.push(this);
		for(var i=0; i<this.cells.length; i++)
			this.cells[i].find(type, a);
	}
	// 2015.11.16 added
	TableRow.prototype.refreshDim = function() {
		for(var i=0; i<this.cells.length; i++)
			this.cells[i].refreshDim();
	}
	
	// TableCell class
	//
	function TableCell(xmlNode, prevCell, parent) {
		
		this.type = "TableCell";
		this.parent = parent;
		this.prev = prevCell;
		if(prevCell != null)
			prevCell.next = this;
		this.next = null;
		
		if(xmlNode != null) {
			try {
				this.cellWidth = parseFloat(xmlNode.getAttribute("cell-width")) || 0;	// 2015.11.12 FIX, 直接parseFloat空字串或null會得到NaN(not a number), 1100317 bug fix, "| 0" -> "|| 0", 小數點|0後會變整數
				this.borderStyle = xmlNode.getAttribute("border-style");
				this.borderWidth = parseFloat(xmlNode.getAttribute("border-width")) || 0;	// 1100317 bug fix, "| 0" -> "|| 0", 小數點|0後會變整數
				this.borderColor = xmlNode.getAttribute("border-color") || "black";	// 2016.10.18 支援框線顏色
				this.alignBlock = xmlNode.getAttribute("align-block");
				var colSpan = xmlNode.getAttribute("col-span");		// HTML版排版引擎新增的排版屬性
				if(typeof colSpan === "string" && colSpan.length > 0)
					this.colSpan = parseInt(colSpan);
				var rowSpan = xmlNode.getAttribute("row-span");		// 2016.4.19 HTML版排版引擎新增的排版屬性
				if(typeof rowSpan === "string" && rowSpan.length > 0)
					this.rowSpan = parseInt(rowSpan);
				// 1110120 Raymond 1101497 新增支援儲存格分割線
				var splitLines = xmlNode.getAttribute("split-lines");
				if(typeof splitLines === "string" && splitLines.length > 0)
					this.splitLines = parseInt(splitLines);
			}
			catch(e) {
				theLogger.error(e.message + " - " + e.sourceURL + "," + e.line);
			}
		}
		this.blocks = new Array();
		
		var nl = xmlNode.childNodes, prevBlock = null;
		for(var i=0; i<nl.length; i++) {
			var blk = transXmlNodeToBlock(nl[i], prevBlock, this);
			if(blk != null)
				this.blocks.push(prevBlock = blk);
		}
		
	}
	TableCell.prototype.instanciateSO = function($row, readOnly, printMode) {  // 2015.9.17 新增唯讀模式, 2016.7.25 新增列印模式
		if(this.parent.freeCell) {	// 2016.4.20 HTML版排版引擎新增的排版屬性
			this.$cell = $("<div class='free-cell' style='display:inline-block;'></div>").appendTo($row);
			var bs = this.borderStyle || "solid";
			if(this.borderStyle == "dot")
				bs = "dotted";
			else if(this.borderStyle == "dash")
				bs = "dashed";
			var u = this.getUnit();
			var w = this.cellWidth + u;
			if(this.cellWidth == 0 || this.cellWidth == NaN)
				w = "auto";
			var va = "top"; // align-block支援
			if(this.alignBlock == "middle" || this.alignBlock == "center")
				va = "middle";
			else if(this.alignBlock == "after")
				va = "bottom";
			this.$cell.css({
				borderStyle: bs,
				borderWidth: this.borderWidth + "pt",
				borderColor: this.borderColor,		// 2016.10.18 FIX for 框線顏色
				verticalAlign: va,
				width: w
			});
			for(var i=0; i<this.blocks.length; i++) {
				this.blocks[i].instanciateSO(this.$cell, readOnly, printMode);  // 傳入唯讀模式, 2016.7.25 新增列印模式
			}
			// 1110121 Raymond 1101497 設定有分割線的儲存格, 第一個para調整左邊界成略靠右對齊效果, 第二個para調整右邊界成略靠左對齊效果, 目前只支援一條分割線, 故第三個para以後不處理
			if(!!this.splitLines) {
				// IE下用100%設定SVG高度, 會比TD的實際高度小(IE似乎是不看TD的height, 而是看content的總高度), 故要改用rowHeight+unit來指定高度, FireFox用100%比用rowHeight+unit還準, Chrome則是2種高度設定都準, 故只針對IE改用rowHeight+unit的設定方式
				var splitLineSVG = (!!this.parent.rowHeight && isIE)?
					'<svg style="width:100%;height:' + ((!!this.borderWidth)?'calc(' + this.parent.rowHeight + u + ' - ' + this.borderWidth + 'pt)':this.parent.rowHeight + u) + ';position:absolute;left:0px;top:0px;"><line x1="0" y1="0" x2="100%" y2="100%" style="stroke:black;stroke-width:1"/></svg>':
					'<svg style="width:100%;height:100%;position:absolute;left:0px;top:0px;"><line x1="0" y1="0" x2="100%" y2="100%" style="stroke:black;stroke-width:1"/></svg>';
				var $paras = this.$cell.find("> div.para");
				if($paras.length > 1)
					$paras.eq(1).css({"margin-right": "25%", "margin-top": (Math.round(this.blocks[1].fontSize * 10 / 3) / 10) + "pt"});
				if($paras.length > 0) {
					$paras.eq(0).css("margin-left", "25%");
					$paras.eq(0).before(splitLineSVG);
				}
				else
					this.$cell.html(splitLineSVG);
				this.$cell.css("position", "relative");
			}
			if(this.cellWidth == 0 || this.cellWidth == NaN) {
				if(this.$cell.get(0).childNodes.length == 0)
					this.$cell.html("&nbsp;");
			}
			if(this.parent.isLast(this)) {	// 最後一個free-cell以計算方式修正不正確的width設定
				var csr = this.prev, pw = 0;
				while(csr) {
					pw += csr.cellWidth;
					csr = csr.prev;
				}
				if(typeof pw === "number")
					this.$cell.css("width", "calc(100% - " + (pw + 0.1) + u + ")"); // 2016.5.20 FireFox必須多-0.1mm才不會折行
				else
					theLogger.warn("計算最後一個FreeCell之前的FreeCell寬度發生錯誤");
			}
		}
		else {
			this.$cell = $("<td class='table-cell' style='position:static; font-size:0px'></td>").appendTo($row);	// 2015.9.30 td新增position:relative, 避免children若有position:absolute元素時(例:sign-area), 不會跟著移動相對位置
																													// 2015.11.17 改為position:static, 使文字意見可以延展出去
			var bs = this.borderStyle || "solid";
			if(this.borderStyle == "dot")
				bs = "dotted";
			else if(this.borderStyle == "dash")
				bs = "dashed";
			var u = this.getUnit();
			/* 2015.5.20 TD的寬度為0時表示剩餘寬度, 要用attr設定width為*, 不能用CSS的width設定
			var w = this.cellWidth + u;
			if(this.cellWidth == 0 || this.cellWidth == NaN)
				w = "auto";*/
			var va = "top"; // 2013.9.24 - Raymond, 補上align-block支援
			if(this.alignBlock == "middle" || this.alignBlock == "center")
				va = "middle";
			else if(this.alignBlock == "after")
				va = "bottom";
			this.$cell.css({
				borderStyle: bs,
				borderWidth: this.borderWidth + "pt",
				borderColor: this.borderColor,		// 2016.10.18 FIX for 框線顏色
				verticalAlign: va,
				//width: w
			});
			if(this.cellWidth == 0 || this.cellWidth == NaN)	// 2015.5.20 TD的寬度為0時表示剩餘寬度, 要用attr設定width為*, 不能用CSS的width設定
				this.$cell.attr("width", "*");
			else
				this.$cell.css("width", this.cellWidth + u);
			if("rowHeight" in this.parent) {    // 2014.7.15 - Raymond, TR無法設高度, 改用TD
				if(this.parent.rowHeight > 0) {
					// 1130124 Raymond 1120887 Chrome目前版本已可設定TR高度且有效, 為配合會辦意見編輯區偵測高度變化, 取消設定TD的高度
					//this.$cell.css("height", this.parent.rowHeight + u);
					if(this.blocks.length == 0) {	// 2016.8.29 判定高度
						theLogger.warn("TABLE-ROW指定高度(" + this.parent.rowHeight + u + "), 但TABLE-CELL無child, 塞一個nbsp");
						this.$cell.html("&nbsp;");
					}
				}
			}
			if(this.colSpan > 0)
				this.$cell.get(0).colSpan = this.colSpan;
			if(this.rowSpan > 0)
				this.$cell.get(0).rowSpan = this.rowSpan;
			for(var i=0; i<this.blocks.length; i++) {
				this.blocks[i].instanciateSO(this.$cell, readOnly, printMode);  // 2015.9.17 新增唯讀模式, 2016.7.25 新增列印模式
			}
			// 1110121 Raymond 1101497 設定有分割線的儲存格, 第一個para調整左邊界成略靠右對齊效果, 第二個para調整右邊界成略靠左對齊效果, 目前只支援一條分割線, 故第三個para以後不處理
			if(!!this.splitLines) {
				// IE下用100%設定SVG高度, 會比TD的實際高度小(IE似乎是不看TD的height, 而是看content的總高度), 故要改用rowHeight+unit來指定高度, FireFox用100%比用rowHeight+unit還準, Chrome則是2種高度設定都準, 故只針對IE改用rowHeight+unit的設定方式
				var splitLineSVG = (!!this.parent.rowHeight && isIE)?
					'<svg style="width:100%;height:' + ((!!this.borderWidth)?'calc(' + this.parent.rowHeight + u + ' - ' + this.borderWidth + 'pt)':this.parent.rowHeight + u) + ';position:absolute;left:0px;top:0px;"><line x1="0" y1="0" x2="100%" y2="100%" style="stroke:black;stroke-width:1"/></svg>':
					'<svg style="width:100%;height:100%;position:absolute;left:0px;top:0px;"><line x1="0" y1="0" x2="100%" y2="100%" style="stroke:black;stroke-width:1"/></svg>';
				var $paras = this.$cell.find("> div.para");
				if($paras.length > 1)
					$paras.eq(1).css({"margin-right": "25%", "margin-top": (Math.round(this.blocks[1].fontSize * 10 / 3) / 10) + "pt"});
				if($paras.length > 0) {
					$paras.eq(0).css("margin-left", "25%");
					$paras.eq(0).before(splitLineSVG);
				}
				else
					this.$cell.html(splitLineSVG);
				this.$cell.css("position", "relative");
			}
			if(this.cellWidth == 0 || this.cellWidth == NaN) {
				if(this.$cell.get(0).childNodes.length == 0) {
					theLogger.warn("TABLE-CELL未指定寬度且無child, 塞一個nbsp");
					this.$cell.html("&nbsp;");
				}
				// 1090929 Raymond 1090467 修正設定表格列高度, 但未設儲存格寬度時, 未套用到含主旨或段落的表格固定高度的功能的問題
				else if(this.$cell.find("DIV.segment").length > 0 && !!this.parent.rowHeight && this.parent.rowHeight > 0) {
					theLogger.warn("父層TABLE-ROW設定了固定高度: " + this.parent.rowHeight + ", 子節點若有主旨或段落, 調整最大高度為" + this.parent.rowHeight + "mm, 以避免表格框自動增高破壞版面");
					// 1121206 Raymond 1120887 新增判斷文稿若支援簽核區域增高功能, 則不要將主旨、段落往上移
					// 1110419 Raymond 1110425 若儲存格設定了垂直置中, 計算超出上邊框高度
					//if(this.alignBlock == "middle" || this.alignBlock == "center")
					if((this.alignBlock == "middle" || this.alignBlock == "center") && !this.getSupportSALP())
						this.$cell.children().first().css("margin-top", "calc(" + this.parent.rowHeight + "mm - " + this.$cell.outerHeight() + "px)");
					
					// 1121206 Raymond 1120887 新增判斷文稿若支援簽核區域增高功能, 將表格框高度改設為最小高度
					if(this.getSupportSALP()) {
						var pm = this.getPageMargin();
						var ph = this.getPageHeight();
						var $div = $("<div style='max-height:calc(" + (ph - pm.top - pm.bottom) + "mm - 2pt)'></div>");
					}
					else
					var $div = $("<div style='max-height:" + this.parent.rowHeight + "mm'></div>");
					$div.append(this.$cell.get(0).childNodes).appendTo(this.$cell.get(0));
				}
			}
			else if(navigator.userAgent.indexOf("Chrome") >= 0) {	// 1060824 Raymond 1060780 修復Chrome下TD寬度設定無效的問題
				if(this.$cell.get(0).childNodes.length > 0) {
					var shouldTwick = false;
					for(var i=0; i<this.$cell.get(0).childNodes.length; i++) {
						var cn = this.$cell.get(0).childNodes[i];
						if(cn.nodeType == 1 && cn.nodeName == "DIV" && $(cn).hasClass("segment")) {
							theLogger.warn("TABLE-CELL包含段落條列, 在Chrome環境下增加一層DIV以限制寬度");
							shouldTwick = true;
							break;
						}
					}
					if(shouldTwick) {
						// 1090813 Raymond 1090467 若是TR有限制row-height高度, 須將TD內的DIV.segment調整成absolute, 以與歷史檢視的匯出頁面呈現一致
						if(!!this.parent.rowHeight && this.parent.rowHeight > 0) {
							// 1090929 Raymond 1090467 修正多條列的段落第一條列的文字會和段落文字重疊、多條列仍會使表格長高, 及表格設垂直置中文字會從表格垂直方向中間位罝開始往下顯示的問題
							//theLogger.warn("父層TABLE-ROW設定了固定高度: " + this.parent.rowHeight + ", 子節點若有主旨或段落, 須調整為absolute");
							//var $div = $("<div style='width:calc(" + this.cellWidth + "mm - 2pt); position:relative'></div>");
							//this.$cell.children("DIV.segment").css({position: "absolute", letterSpacing: "0px"});	// 應該是表格框及-2pt導致可容納寬度少於完整的cell-width, 故將letter-spacing設為0, 使折行結果與歷史檢視一致
							theLogger.warn("父層TABLE-ROW設定了固定高度: " + this.parent.rowHeight + ", 子節點若有主旨或段落, 調整最大高度為" + this.parent.rowHeight + "mm, 以避免表格框自動增高破壞版面");
							// 1121206 Raymond 1120887 新增判斷文稿若支援簽核區域增高功能, 則不要將主旨、段落往上移
							// 1110421 Raymond 1110425 若儲存格設定了垂直置中, 計算超出上邊框高度
							//if(this.alignBlock == "middle" || this.alignBlock == "center")
							if((this.alignBlock == "middle" || this.alignBlock == "center") && !this.getSupportSALP())
								this.$cell.children().first().css("margin-top", "calc(" + this.parent.rowHeight + "mm - " + this.$cell.outerHeight() + "px)");
							
							// 1121206 Raymond 1120887 新增判斷文稿若支援簽核區域增高功能, 將表格框高度改設為最小高度
							if(this.getSupportSALP()) {
								var pm = this.getPageMargin();
								var ph = this.getPageHeight();
								var $div = $("<div style='width:calc(" + this.cellWidth + "mm - 2pt); max-height:calc(" + (ph - pm.top - pm.bottom) + "mm - 2pt)'></div>");
							}
							else
							var $div = $("<div style='width:calc(" + this.cellWidth + "mm - 2pt); max-height:" + this.parent.rowHeight + "mm'></div>");
						}
						else
						var $div = $("<div style='width:calc(" + this.cellWidth + "mm - 2pt)'></div>");
						$div.append(this.$cell.get(0).childNodes).appendTo(this.$cell.get(0));
					}
				}
			}
			// 1100126 Raymond 1090927 修正FireFox也要比照IE限制表格高度功能
			// 1090929 Raymond 1090467 IE環境下多判斷子節點是否含有主旨或段落, 是則判斷是否應套用固定表格高度功能
			// 1090813 Raymond 1090467 若是TR有限制row-height高度, 須將TD內的DIV.segment調整成absolute, 以與歷史檢視的匯出頁面呈現一致
			//else if(isIE) {
			//else if(isIE && this.$cell.find("DIV.segment").length > 0) {
			else if((isIE || navigator.userAgent.indexOf("Firefox") >= 0) && this.$cell.find("DIV.segment").length > 0) {
				if(!!this.parent.rowHeight && this.parent.rowHeight > 0) {
					// 1090929 Raymond 1090467 修正多條列的段落第一條列的文字會和段落文字重疊、多條列仍會使表格長高, 及表格設垂直置中文字會從表格垂直方向中間位罝開始往下顯示的問題
					//theLogger.warn("父層TABLE-ROW設定了固定高度: " + this.parent.rowHeight + ", 子節點若有主旨或段落, 須調整為absolute");
					//this.$cell.css("position", "relative");
					//this.$cell.children("DIV.segment").css({position: "absolute", letterSpacing: "0px"});	// 應該是表格框及-2pt導致可容納寬度少於完整的cell-width, 故將letter-spacing設為0, 使折行結果與歷史檢視一致
					theLogger.warn("父層TABLE-ROW設定了固定高度: " + this.parent.rowHeight + ", 子節點若有主旨或段落, 調整最大高度為" + this.parent.rowHeight + "mm, 以避免表格框自動增高破壞版面");
					// 1110421 Raymond 1110425 若儲存格設定了垂直置中, 計算超出上邊框高度
					if(this.alignBlock == "middle" || this.alignBlock == "center")
						this.$cell.children().first().css("margin-top", "calc(" + this.parent.rowHeight + "mm - " + this.$cell.outerHeight() + "px)");
					
					var $div = $("<div style='width:calc(" + this.cellWidth + "mm - 2pt); max-height:" + this.parent.rowHeight + "mm'></div>");
					$div.append(this.$cell.get(0).childNodes).appendTo(this.$cell.get(0));
				}
			}
		}
	}
	TableCell.prototype.find = function(type, a) {
		if(type == this.type)
			a.push(this);
		for(var i=0; i<this.blocks.length; i++)
			this.blocks[i].find(type, a);
	}
	// 2015.11.16 added
	TableCell.prototype.refreshDim = function() {
		for(var i=0; i<this.blocks.length; i++) {
			if("refreshDim" in this.blocks[i])
				this.blocks[i].refreshDim();
		}
	}
	
	// https://gist.github.com/gordonbrander/2230317
	var genID = function () {
	  // Math.random should be unique because of its seeding algorithm.
	  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
	  // after the decimal.
	  return '_' + Math.random().toString(36).substr(2, 9);
	};
	// SignArea class
	//
	function SignArea(xmlNode, prevArea, parent) {
		this.type = "SignArea";
		this.parent = parent;
		this.prev = prevArea;
		if(prevArea != null)
			prevArea.next = this;
		this.next = null;
		this.psudoId = genID();	// 2017.2.17 
		
		if(xmlNode != null) {
			this.borderStyle = xmlNode.getAttribute("border-style");
			this.borderCollapse = xmlNode.getAttribute("border-collapse");
			this.logicHeight = parseFloat(xmlNode.getAttribute("height")) || 0;	// 1100317 bug fix, "| 0" -> "|| 0", 小數點|0後會變整數
			this.logicWidth = parseFloat(xmlNode.getAttribute("width")) || 0;	// 1100317 bug fix, "| 0" -> "|| 0", 小數點|0後會變整數
			this.saType = xmlNode.getAttribute("type");
			this.id = xmlNode.getAttribute("id");
			this.space = {
				before: parseFloat(xmlNode.getAttribute("space-before")) || 0,
				after: parseFloat(xmlNode.getAttribute("space-after")) || 0,
				start: parseFloat(xmlNode.getAttribute("space-start")) || 0,
				end: parseFloat(xmlNode.getAttribute("space-end")) || 0
			};
			this.showInPage = parseInt(xmlNode.getAttribute("show-in-page")) || 7;
			// 1070327 Raymond 1070136 修正不預設自動加蓋對齊職名章的方向
			//this.dir = parseInt(xmlNode.getAttribute("dir")) || 0;	// 2016.9.30 新增自動蓋職名章的方向屬性, 0:由上至下, 1:由左至右
			this.dir = xmlNode.getAttribute("dir");
		}
	}
	SignArea.prototype.instanciateSO = function($flow) {
		theLogger.log("SignArea.instanciateSO: type='" + this.saType + "' id='" + this.id + "' logicHeight='" + this.logicHeight + "mm'");
		this.$area = $("<div class='sign-area' data-satype='" + this.saType + "' data-id='" + this.id + "' id='" + this.psudoId + "'></div>").appendTo($flow);	// 2016.12.22 新增satype屬性, 2017.2.17 新增id屬性
		//theLogger.log("lineHeight: " + this.lineHeight);
		var styles = {
			height: this.logicHeight + "mm",
			marginTop: this.space.before + this.getUnit(),
			marginBottom: this.space.after + this.getUnit(),
			marginLeft: this.space.start + this.getUnit(),
			marginRight: this.space.end + this.getUnit()
		};
		// 1140618 Raymond 1140166 修正DocCompare.html環境下不會有theSSO.User
		// 1110902 Raymond 1111044 新增依系統參數是否隱藏簽核區域的紅色虛線框(框線顏色設為透明色)
		//if(theSSO.User.SystemSets.get("AOL_HIDE_SIGNAREA_BORDER") == "Y") {
		if(theSSO?.User?.SystemSets.get("AOL_HIDE_SIGNAREA_BORDER") == "Y") {
			theLogger.log("系統參數[AOL_HIDE_SIGNAREA_BORDER]為'Y', 隱藏簽核區域的紅色虛線框(框線顏色設為透明色)");
			styles.outlineColor = "transparent";
		}
		if(this.logicWidth) {
			styles.width = this.logicWidth + "mm";
			this.$area.css(styles);
		}
		else if(this.parent && "cellWidth" in this.parent && this.parent.cellWidth) {
			styles.width = (this.parent.cellWidth - this.space.start - this.space.end) + "mm";
			this.$area.css(styles);
		}
		else if(this.parent && "$cell" in this.parent) {
			this.$area.css(styles);
			this.$area.get(0).style.width = "calc(" + (this.parent.$cell.width() - 1) + "px - " + this.space.start + "mm - " + this.space.end + "mm)";	// 2016.8.29 FIX -webkit-calc為calc
			//this.$area.get(0).style.width = "calc(" + (this.parent.$cell.width() - 1) + "px - " + this.space.start + "mm - " + this.space.end + "mm)";
			if(this.$area.get(0).offsetWidth == 0) {	// 不支援calc的瀏覽器
				theLogger.warn("瀏覽器不支援calc(), 以儲存格寬度為簽核區域寬度");
				this.$area.get(0).style.width = this.parent.$cell.width() + "px";
			}
		}
		else
			this.$area.css(styles);
		// 2015.11.16 FIX, 簽核區域用outline顯示框線可能會被parent大小遮到左及下邊線
		if(this.space.start > 0) {
			this.$area.get(0).style.marginLeft = "calc(" + this.space.start + this.getUnit() + " + 1px)";	// 2016.8.29 FIX -webkit-calc為calc
			if(this.$area.get(0).offsetWidth == 0) {	// 不支援calc的瀏覽器
				theLogger.warn("瀏覽器不支援calc(), 重新計算簽核區域左邊界");
				this.$area.get(0).style.marginLeft = (Number(this.$area.css("margin-left").replace(/px/g, "")) + 1) + "px";
			}
		}
		// 1091229 Raymond 1090602 修正左邊界設定小於0(凸出儲存格)時, 不會顯示為凸出的問題
		//else {
		else if(this.space.start == 0) {
			this.$area.get(0).style.marginLeft = "1px";
		}
		// 1091229 Raymond 1090602 修正下邊界設定為space.after非space.end(右邊界)
		//if(this.space.end > 0) {
		//	this.$area.get(0).style.marginBottom = "calc(" + this.space.end + this.getUnit() + " + 1px)";	// 2016.8.29 FIX -webkit-calc為calc
		if(this.space.after > 0) {
			this.$area.get(0).style.marginBottom = "calc(" + this.space.after + this.getUnit() + " + 1px)";	// 2016.8.29 FIX -webkit-calc為calc
			if(this.$area.get(0).offsetWidth == 0) {	// 不支援calc的瀏覽器
				theLogger.warn("瀏覽器不支援calc(), 重新計算簽核區域下邊界");
				this.$area.get(0).style.marginBottom = (Number(this.$area.css("margin-bottom").replace(/px/g, "")) + 1) + "px";
			}
		}
		// 1091229 Raymond 1090602 修正下邊界設定小於0(凸出儲存格)時, 不會顯示為凸出的問題
		//else {
		else if(this.space.after == 0) {
			this.$area.get(0).style.marginBottom = "1px";
		}
		if(this.logicHeight > 0) {
			// 1100310 Raymond 1090602 修正高度計算應扣除下邊界寫錯成右邊界的問題
			// 1090908 Raymond 修正iPad下可能發生$area.height()=0的情形, 導致重設的高度變-2px的問題
			//this.$area.get(0).style.height = "calc(" + this.$area.height() + "px - " + this.space.before + "mm - " + this.space.end + "mm - 2px)";	// 2016.8.29 FIX -webkit-calc為calc
			//if(this.$area.get(0).offsetWidth == 0) {	// 不支援calc的瀏覽器
			//	theLogger.warn("瀏覽器不支援calc(), 以儲存格高度為簽核區域高度");
			//	this.$area.get(0).style.height = (this.parent.$cell.height() - 2) + "px";
			//}
			//this.$area.get(0).style.height = "calc(" + this.logicHeight + "mm - " + this.space.before + "mm - " + this.space.end + "mm - 2px)";
			this.$area.get(0).style.height = "calc(" + this.logicHeight + "mm - " + this.space.before + "mm - " + this.space.after + "mm - 2px)";
		}
		/* jquery的遞減處理似乎不支援不同單位混用
		if(this.space.start != 0)
			this.$area.css("width", "-=" + this.space.start + "mm");
		if(this.space.end != 0)
			this.$area.css("width", "-=" + this.space.end + "mm");*/
		
		theLogger.debug("SignArea#" + this.id + ": position=" + this.$area.position().left + "," + this.$area.position().top + " size=" + this.$area.width() + "," + this.$area.height());
	}
	SignArea.prototype.find = function(type, a) {
		if(type == this.type)
			a.push(this);
	}
	
	// PageBreak class
	//   2016.12.6 新增
	function PageBreak(xmlNode, prevBlock, parent) {
		this.type = "PageBreak";
		this.parent = parent;
		this.prev = prevBlock;
		if(prevBlock != null)
			prevBlock.next = this;
		this.next = null;
	}
	PageBreak.prototype.instanciateSO = function($flow) {
		theLogger.log("PageBreak.instanciateSO()");
		this.$block = $("<div class='page-break'></div>").appendTo($flow);
		//theLogger.log("lineHeight: " + this.lineHeight);
	}
	PageBreak.prototype.find = function(type, a) {
		if(type == this.type)
			a.push(this);
	}
	
	// 搜尋時判斷排版物件類型
	PageNo.prototype.is = AllPages.prototype.is = Anchor.prototype.is = Para.prototype.is = Table.prototype.is = TableRow.prototype.is = TableCell.prototype.is = SignArea.prototype.is = Barcode.prototype.is = Img.prototype.is = PageBreak.prototype.is = ExchStamp.prototype.is = function(type) {
		return type == this.type;
	}

	// InternalFO class
	//
	function InternalFO(xmlNode, dm) {
		
		var _pageMaster = xmlNode.getElementsByTagName("page-master")[0];
		this.unit = _pageMaster.getAttribute("unit");
		this.pageWidth = parseFloat(_pageMaster.getAttribute("page-width"));
		this.pageHeight = parseFloat(_pageMaster.getAttribute("page-height"));
		this.pageMargin = {
			left: parseFloat(_pageMaster.getAttribute("margin-left")),
			right: parseFloat(_pageMaster.getAttribute("margin-right")),
			top: parseFloat(_pageMaster.getAttribute("margin-top")),
			bottom: parseFloat(_pageMaster.getAttribute("margin-bottom"))
		};
		// 2015.5.20 支援首頁區分邊界大小功能
		if(_pageMaster.getAttribute("first-page-margin-top") != null) {
			this.pageMargin.firstPageTop = parseFloat(_pageMaster.getAttribute("first-page-margin-top"));
		}
		if(_pageMaster.getAttribute("first-page-margin-bottom") != null) {
			this.pageMargin.firstPageBottom = parseFloat(_pageMaster.getAttribute("first-page-margin-bottom"));
		}
		
		var that = this;
		/*var base = {getUnit: function() {return that.unit;},
					getPageWidth: function() {return that.pageWidth;},
					getPageHeight: function() {return that.pageHeight;},
					getPageMargin: function() {return that.pageMargin;}};
		this.region = {
			body: $.extend(base, {writingMode: "lr", alignBlock: "before"}),
			before: $.extend(base, {writingMode: "lr", alignBlock: "before"}),
			after: $.extend(base, {writingMode: "lr", alignBlock: "before"}),
			start: $.extend(base, {writingMode: "tb", alignBlock: "before"}),
			end: $.extend(base, {writingMode: "tb", alignBlock: "before"})
		};
		for(var i=0; i<_pageMaster.childNodes.length; i++) {
			var n = _pageMaster.childNodes[i], rgn = null;
			if(n.tagName == "region-body")
				rgn = this.region.body;
			else if(n.tagName == "region-before")
				rgn = this.region.before;
			else if(n.tagName == "region-after")
				rgn = this.region.after;
			else if(n.tagName == "region-start")
				rgn = this.region.start;
			else if(n.tagName == "region-end")
				rgn = this.region.end;
			if(rgn != null) {
				rgn.writingMode = n.getAttribute("writing-mode");
				rgn.alignBlock = n.getAttribute("align-block");
			}
		}*/
		function _findFOByType(type, a) {
			for(var i=0; i<this.blocks.length; i++)
				this.blocks[i].find(type, a);
		}
		
		var _statics = xmlNode.getElementsByTagName("static");
		this.statics = new Array();
		for(var i=0; i<_statics.length; i++) {
			theLogger.debug("Parsing statics:'" + _statics[i].getAttribute("flow-name") + "'...");
			this.statics.push({
				flowName: _statics[i].getAttribute("flow-name"),
				onlyFirstPage: _statics[i].getAttribute("only-first-page"),     // 2013.9.24 - Raymond, 補上only-first-page支援
				blocks: new Array(),
				getUnit: function() {return that.unit;},
				getTCSess: dm.getTCSess,
				getModel: function() {return dm;},
				getPageWidth: function() {return that.pageWidth;},
				getPageHeight: function() {return that.pageHeight;},
				getPageMargin: function() {return that.pageMargin;},
				find: _findFOByType,
				getSupportSALP: function() {return dm.supportSALP();}	// 1130826 Raymond 1120887 修正邊界區的表格內有段落寫法時會需要呼叫此方法, 若無的話會轉圈圈的問題(目前只發現成大的簽稿會核單有此用法)
			});
			
			var nl = _statics[i].childNodes, prevBlock = null;
			for(var j=0; j<nl.length; j++) {
				var blk = transXmlNodeToBlock(nl[j], prevBlock, this.statics[this.statics.length-1]);
				if(blk != null)
					this.statics[this.statics.length-1].blocks.push(prevBlock = blk);
			}
		}
		
		var _flow = xmlNode.getElementsByTagName("flow")[0];
		this.flow = {
			blocks: new Array(),
			getUnit: function() {return that.unit;},
			getTCSess: dm.getTCSess,
			getModel: function() {return dm;},
			getPageWidth: function() {return that.pageWidth;},
			getPageHeight: function() {return that.pageHeight;},
			getPageMargin: function() {return that.pageMargin;},
			find: _findFOByType,
			guid: Util.genGUID(),	//2017.2.23	Leslie	自帶一個翻頁識別用的guid
			getSupportSALP: function() {return dm.supportSALP();}	// 1121206 Raymond 1120887 新增取得文稿是否支援簽核區域增高功能
		}
		var nl = _flow.childNodes, prevBlock = null;
		for(var i=0; i<nl.length; i++) {
			var blk = transXmlNodeToBlock(nl[i], prevBlock, this.flow);
			if(blk != null)
				this.flow.blocks.push(prevBlock = blk);
		}
		
		this.find = function(type, a) {
			this.flow.find(type, a);
			for(var i=0; i<this.statics.length; i++)
				this.statics[i].find(type, a);
		}
		
		// 1140613 Raymond 1140166 合併1130291, 搜尋所有ExchStamp, 除了最後一個, 其它隱藏
		var es = [];
		this.flow.find("ExchStamp", es);
		for(var i=0; i<(es.length - 1); i++) {
			es[i].hide = true;
		}
	}
	
	// 全域屬性用階層式回呼到InternalFO的function
	// 取得長度單位(unit)
	Para.prototype.getUnit = Table.prototype.getUnit = TableRow.prototype.getUnit = TableCell.prototype.getUnit = SignArea.prototype.getUnit =
		function() {return this.parent.getUnit();};
	// 取得追蹤修訂階段
	Para.prototype.getTCSess = Table.prototype.getTCSess = TableRow.prototype.getTCSess = TableCell.prototype.getTCSess = SignArea.prototype.getTCSess =
		function(sn) {return this.parent.getTCSess(sn);};
	// 取得DraftModel
	Para.prototype.getModel = Table.prototype.getModel = TableRow.prototype.getModel = TableCell.prototype.getModel = SignArea.prototype.getModel =
		function() {return this.parent.getModel();};
	// 2014.11.19 - Raymond, 新增inline物件的getModel捷徑
	Anchor.prototype.getModel = Plain.prototype.getModel = AllPages.prototype.getModel = PageNo.prototype.getModel = Barcode.prototype.getModel = ModifyInfo.prototype.getModel =
		function() {return this.para.getModel();};
	// 2013.9.24 - Raymond, 新增getPageWidth、getPageHeight、getPageMargin
	// 取得pageWidth
	Para.prototype.getPageWidth = Table.prototype.getPageWidth = TableRow.prototype.getPageWidth = TableCell.prototype.getPageWidth = SignArea.prototype.getPageWidth =
		function() {return this.parent.getPageWidth();};
	// 取得pageHeight
	Para.prototype.getPageHeight = Table.prototype.getPageHeight = TableRow.prototype.getPageHeight = TableCell.prototype.getPageHeight = SignArea.prototype.getPageHeight =
		function() {return this.parent.getPageHeight();};
	// 取得pageMargin
	Para.prototype.getPageMargin = Table.prototype.getPageMargin = TableRow.prototype.getPageMargin = TableCell.prototype.getPageMargin = SignArea.prototype.getPageMargin =
		function() {return this.parent.getPageMargin();};
	// 1121206 Raymond 1120887 新增取得文稿是否支援簽核區域增高功能
	Para.prototype.getSupportSALP = Table.prototype.getSupportSALP = TableRow.prototype.getSupportSALP = TableCell.prototype.getSupportSALP = SignArea.prototype.getSupportSALP =
		function() {return this.parent.getSupportSALP();};
	
	ModifyInfo.prototype.instanciateSO = function($pa) {
		/*if($pa.children().length) {
			var $last = $pa.children().eq($pa.children().length - 1);
			theLogger.log($last);
			theLogger.log($last.get(0).tagName + ", " + $last.attr("data-sn") + ", " + ($last.attr("data-sn") == this.sn));
			if($last.get(0).tagName.match(new RegExp(this.act, "i")) && $last.attr("data-sn") == this.sn) {
				$last.html($last.html() + this.text);
				if(this.children != undefined && this.children.length) {
					for(var i=0; i<this.children.length; i++)
						this.children[i].instanciateSO($last);
				}
				return;
			}
		}*/
		var $sp = $("<" + this.act + " data-sn='" + this.sn + "'>" + this.text + "</" + this.act + ">").appendTo($pa);
		var ts = this.para.getTCSess(this.sn);
		// 1080123 Raymond 1080097 修正列印追蹤修訂模式時, 顏色異常問題
		//theLogger.debug("color[" + this.sn + "]: " + ts.color + "(" + Util.num2Hex(ts.color, 6) + ")");
		//$sp.css("color", "#" + Util.num2Hex(ts.color, 6));
		theLogger.debug("color[" + this.sn + "]: " + ts.color + "(" + Util.toHtmlColor(ts.color) + ")");
		$sp.css("color", Util.toHtmlColor(ts.color));
		if(this.para.editCtlr != undefined)
			this.para.editCtlr.attach($sp, this);
		if(this.children != undefined && this.children.length) {
			for(var i=0; i<this.children.length; i++)
				this.children[i].instanciateSO($sp);
		}
	}
	
	// 1091023 Raymond 1090735 新增傳入fo參數, 以修正當樣版設有首頁上下邊界區時, 分頁未正確判斷首頁可容納高度, 導致首頁的下方內文部分與下邊界物件重疊的問題
	//function Paging($page, nfo, po, dm) {	// 2016.12.22 新增DM參數
	function Paging($page, nfo, po, dm, fo) {	// 2016.12.22 新增DM參數
		
		var dfd = $.Deferred();
		nfo.pages = 1;
		nfo.breaks = [0];
		
		// 1091023 Raymond 1090735 當樣版設有首頁上下邊界區時, 正確判斷首頁可容納高度
		function getEffHeight() {
			if(nfo.pages == 1 && ("firstPageTop" in fo.pageMargin || "firstPageBottom" in fo.pageMargin)) {
				var eh = (fo.pageHeight - (fo.pageMargin.firstPageTop || fo.pageMargin.top) - (fo.pageMargin.firstPageBottom || fo.pageMargin.bottom)) + fo.unit;
				return eh;
			}
			var eh = (fo.pageHeight - fo.pageMargin.top - fo.pageMargin.bottom) + fo.unit;
			return eh;
		}
		
		$page.find("> div").eq(2).find("> div").children().each(function(idx, elm) {
			$(elm).show();
		});
		$page.on("flipTop", function(event) {    // 翻頁完再點亮頁籤
			nfo.ti.trigger("select");
		});
		
		//var that = this;
		// 1081220 Raymond 1081089 修正有時開啟公文data("zoomController")還是undefined而丟出Error的問題
		//var scale = $page.closest(".viewPort").data("zoomController").currScale;
		var scale = 100;
		try {
			scale = $page.closest(".viewPort").data("zoomController").currScale;
		} catch(e) {
			// 1081230 Raymond 1081089 從localStorage取得預設縮放比
			if($page.closest("#leftPart").length > 0 &&
				"zoomController_zoomControl1" in localStorage &&
				typeof localStorage["zoomController_zoomControl1"] === "string" &&
				localStorage["zoomController_zoomControl1"].match(/\d+/)) {
				theLogger.warn("縮放比控制項未初始化完成, 從本地暫存區恢復上次記憶的縮放比[" + localStorage["zoomController_zoomControl1"] + "]");
				scale = Math.max(50, Math.min(400, parseInt(localStorage["zoomController_zoomControl1"])));	// 縮放比應該在50~400之間
			}
		}
		// 斷頁點的判斷只能用非同步的定時器來觸發,
		// 因為同步執行時, ELEMENT雖然已insert了但都還沒顯示出來,
		// 這時去取ClientRects時都會是空的
		// 2015.11.3 - Raymond, iOS 9變成0秒Timeout會實時執行, 造成getClientRects異常,
		// 改成判斷iOS版本在9以下, 維持Timeout觸發, 以上或其它瀏覽器則直接執行
		function doPaging() {
		
			theLogger.log("開始分頁...");
			var $body = $page.find("> div").eq(2),
			//var $body = $page.find("> div").eq(2).css("outline", "1px dashed gray"),	for debug
				$flow = $body.find("> div");
			// 1091023 Raymond 1090735 改記錄首頁正確body高度, 及原本指定高度
			//var eh = $body.height() + 1;    // 有效page body高度, 2015.7.22
			var eh = getEffHeight();
			theLogger.log("\t有效page body height: " + eh + ", data-height:" + $body.attr("data-height"));
			var v0 = $page.closest(".viewPort").offset();	// 2016.9.26 FIX, 修正縮放時自動蓋章跟原尺寸比會有差距的問題
			var of0 = $page.offset();
			of0.left = (of0.left - v0.left) * 100 / scale + v0.left;
			of0.top = (of0.top - v0.top) * 100 / scale + v0.top;
			theLogger.log("\tpage offset: " + of0.left + ", " + of0.top);
			var of = $body.offset();
			of.left = (of.left - v0.left) * 100 / scale + v0.left;
			of.top = (of.top - v0.top) * 100 / scale + v0.top;
			theLogger.log("\tbody offset: " + of.left + ", " + of.top);
			
			// 1140613 Raymond 1140166 合併1130291, 修正在RD-DocCompare.html中body的scrollTop是8, 導致計算斷頁錯誤的問題
			if($page.closest(".doc_content").length > 0)
				var sy = 0;
			else
			var sy = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;	// 2016.8.29 FIX, IE11沒有window.scrollY
			theLogger.warn("\tscrollY: " + sy);
			
			// 2015.11.10 改用背景div先算好分頁點, 再回調$flow
			var $testbody = $("body #testbody");
			if($testbody.length == 0)
				// 1111026 Raymond 陸委會序347 修正#testbody的寬改成跟PagingP()一樣從bodyRegion div的實際width取得, 而不是data-width
				// 1091023 Raymond 1090735 修正當樣版設有首頁上下邊界區時, 正確取得首頁有效高度
				//$testbody = $("<div id='testbody' style='z-index:1000; width:" + $body.attr("data-width") + "; height:" + $body.attr("data-height") + "; position:absolute; left:0px; top:0px; transparency:0.1'></div>").appendTo("body");	// 2016.9.12 FIX 從#aol改成body
				//$testbody = $("<div id='testbody' style='z-index:1000; width:" + $body.attr("data-width") + "; height:" + getEffHeight() + "; position:absolute; left:0px; top:0px; transparency:0.1'></div>").appendTo("body");	// 2016.9.12 FIX 從#aol改成body
				$testbody = $("<div id='testbody' style='z-index:1000; width:" + $body.prop("style").width + "; height:" + eh + "; position:absolute; left:0px; top:0px; transparency:0.1'></div>").appendTo("body");	// 2016.9.12 FIX, 從#aol改成body
			// 2015.11.18 套用目前的追蹤修訂模式再分頁
			if($page.closest(".viewPort").hasClass("layout-complete-mode"))
				$testbody.addClass("layout-complete-mode");
			else if($page.closest(".viewPort").hasClass("layout-complete-tc-mode"))
				$testbody.addClass("layout-complete-tc-mode");
			else if($page.closest(".viewPort").hasClass("layout-origin-tc-mode"))
				$testbody.addClass("layout-origin-tc-mode");
			$body.height($body.attr("data-height"));	// 重設$body高度
			eh = $testbody.height() + 0;	// 重抓有效高度, 2015.11.30 原本+1似乎不太準, 2016.1.15 -1似乎也不準
			theLogger.log("P#" + nfo.pages + "有效eh = " + eh);	// 1091023 Raymond 1090735 加註頁數
			// 若是refreshSOPage叫用Paging的話, 有跨頁元素會被調整margin-top, 原始的margin-top會記錄在data-origmgntop屬性, 要先檢查有無此屬性
			// 有的話先調整回去, 再進行分頁判斷, 否則抓到的元素位置會是重疊到前一元素的坐標, 造成分頁判斷不準
			$flow.children().each(function(idx, elm) {
				var omt = elm.getAttribute("data-origmgntop");
				if(omt) {
					theLogger.warn(elm.tagName + ".marginTop先調回" + omt + ", 再進行分頁判斷");
					$(elm).css("margin-top", omt);
				}
				$(elm).show();
			});
			var $sip = $flow.find("[data-showinpage=2]");	// 2016.10.13 修正FDA的案由第一頁不顯示(show-in-page=2)問題
			$sip.hide();
			// 1090131 Raymond 1090055 修正DocView內嵌AOL時, 排版出現垂直Scrollbar導致次頁多一行前頁的末行的問題
			//$testbody.empty().append($flow.clone(true).css("overflow-y", "visible"));
			$testbody.empty().append($flow.clone(true));
			
			var rng = document.createRange(),
				ok = true,		// getBoundingClientRect無效時, 須retry
				offTop = 0,		// 斷頁點
				elmPo = [],		// 記錄每個element的頁次,
				elmFrom = [],	// 記錄每個element的起始頁次,
				elmFromPos = [],// 記錄每個element的起始頁次位置,
				elmBrc = [],
				//lineSpace = [],  2016.1.20 用line-height減font-size再除以2計算得到的行間間距並不準確
				lineHeight = [];// 2016.1.20 line-height比較可靠
			var brcs = [],
				bKeep = false;	// for debug
			// 2017.1.13 改成2-pass, 因為案由第一頁不顯示要先判定完才能
			var bReload = false;	// 改過show()要再重新clone過才有效?
			$testbody.find("> div").children().each(function(idx, elm) {
				rng.selectNodeContents(elm);	// 2015.8.7 FireFox選node只會有一個最外面的ClientRect, 不會有children的ClientRect
				var brc = rng.getBoundingClientRect();
				// 1120829 Raymond 標檢局序121 修正無任何子節點的DIV, 用selectNodeContents()會得到一個大小為0, 位置為0的ClientRect, 改用selectNode取代
				if(!!brc && brc.left == 0 && brc.top == 0 && brc.width == 0 && brc.height == 0 && elm.childNodes.length == 0) {
					theLogger.debug("#" + idx + " - rng.selectNode(" + elm.tagName + ")'");	// 1101224 Raymond 1101541 新增log資訊
					rng.selectNode(elm);
					brc = rng.getBoundingClientRect();
				}
				if(brc == null) {	// 2015.9.10 新增例外排除
					theLogger.error("<" + elm.tagName + ">.boundingClientRect=null('" + elm.outerHTML + "'), 1秒後重試!!");
					ok = false;
					setTimeout(doPaging, 1000);	// 2015.11.10 retry
					return false;	// break each-loop
				}
				var brcBottom = brc.bottom, brcTop = brc.top;
				console.debug("%c#" + idx + "<" + elm.tagName + "> brc:" + brcTop + "-" + brcBottom + ", offset:" + $(elm).offset().top + ", height:" + $(elm).height() + ", outerHeight:" + $(elm).outerHeight(true), "background-color:cyan");	// 1101224 Raymond 1101541 for debug
				if(elm.tagName == "TABLE") {
					// 1090408 Raymond 1090254 修正由於offset()是不包含margin的座標, 而getBoundingClientRect()回的也是不包含margin的座標, 若table設定了margin-top, 會使brcTop較原本認定真實的元素上方座標值大, 若此table為次頁第一個物件將會造成記錄的斷頁點也變大, 但實際上元素顯示在次頁是包含margin-top的, 斷頁點應記錄在減去此table的margin-top的座標
					var mgnTop = parseFloat($(elm).css("margin-top"));
					if(mgnTop > 0) {
						theLogger.warn("此TABLE設定了margin-top('" + elm.style.marginTop + "'=" + $(elm).css("margin-top") + "), 應擴大矩形範圍");
						brcTop -= mgnTop;
						brcBottom = brcTop + $(elm).outerHeight(true);	// outerHeight()傳入參數true會回傳包含margin的高度
					}
					
					if(navigator.userAgent.indexOf("Trident") >= 0) {
						var emptyRowHeight = 0;	// 2016.11.23 統計第一行文字出現前空行的累計高度
						var n = $(elm).find("tr").length;
						for(var i=0; i<n; i++) {
							var txt = $(elm).find("tr").eq(i).text();
							if(txt.length) {	// 即使是用全形空白去撐出Row的高度, IE似乎也不會讀到一個全形空白字串
								theLogger.log("表格第" + i + "列出現第一行文字'" + txt + "'");
								break;
							}
							else {
								emptyRowHeight += $(elm).find("tr").eq(i).height();
								theLogger.log("表格第" + i + "列高度為 " + $(elm).find("tr").eq(i).height() + ", 累計第一行文字前已有空行高度 " + emptyRowHeight);
							}
						}
						// 1090408 Raymond 1090254 height()改為outerHeight(true), 取包含margin的完整高度
						//brcBottom = brcTop + $(elm).height() - emptyRowHeight;	// 2016.10.31 IE計算的brc只有文字的部分, 用$.height()修正回來
																				// 2016.11.23 表格中第一行出現文字可能不在第1個Row, 這會導致表格高度被誤判為較實際大的數值而提前跳頁,
																				// 修改為扣掉前面統計的空行高度
						brcBottom = brcTop + $(elm).outerHeight(true) - emptyRowHeight;
						brcTop = brcTop - emptyRowHeight;						// 2017.2.7 brcTop也需要修正, 因為若此表格為斷頁後第1個物件, 則斷頁點會設成此物件的top, 若斷頁點未修正而徧下的話會導致簽核區域座標小於原本位置而使簽核物件徧下約一行顯示
					}
				}
				else {	// 2015.11.30 行高2.0情況下, getBoundingRect只會抓到去除周圍空白的整體區塊位置資訊, 判斷斷頁點會產生誤差
					// 1101224 Raymond 1101541 IE跟Chrome的offset().top都會有誤差小數點, 改成四捨五入整數
					//brcTop = Math.ceil($(elm).offset().top);
					brcTop = Math.round($(elm).offset().top);
					brcBottom = brcTop + $(elm).height();
					// 1101224 Raymond 1101541 Chrome不知道是不是96版開始, 瀏覽器的縮放比在100%時取高度會出現小數點誤差, 150%時取高度會變整數, 故此處改成取四捨五入的整數
					if((navigator.userAgent.match(/Chrome\/(\d+)\./) || navigator.userAgent.match(/Chromium\/(\d+)\./)) && parseInt(RegExp.$1) >= 96)
						brcBottom = brcTop + Math.round($(elm).height());
					theLogger.debug("brc[" + idx + "]=" + brcTop + "-" + brcBottom);
				}
				// 2016.12.6 新增支援斷頁指令
				if(elm.tagName == "DIV" && $(elm).hasClass("page-break")) {
					theLogger.warn("指令斷頁...brcBottom=" + brcBottom + ", break on " + (brcBottom + sy - offTop));
					var $sip = $flow.children().eq(idx).find("[data-showinpage=2]");	// 修正FDA的案由第一頁不顯示(show-in-page=2)問題
					$sip.show();
					$sip = $flow.children().eq(idx).nextAll().find("[data-showinpage=2]");
					$sip.show();
					bReload = true;
					return false;	// 只要分出第1頁就好
				}
				else if((brcBottom + sy - offTop) > eh) {
					if(elm.tagName == "TABLE" /* && $(elm).data("keep-together")*/) { // 2015.3.16 - 修正表格為不跨頁
						theLogger.log("表格斷頁...brcBottom=" + brcBottom + ", break on " + (brcTop + sy - offTop));
						var $sip = $flow.children().eq(idx).find("[data-showinpage=2]");	// 2016.10.13 修正FDA的案由第一頁不顯示(show-in-page=2)問題
						$sip.show();
						$sip = $flow.children().eq(idx).nextAll().find("[data-showinpage=2]");
						$sip.show();
					}
					else {
						theLogger.log("一般段落跨頁時段落本身不支援show-in-page設定");
						var $sip = $flow.children().eq(idx).nextAll().find("[data-showinpage=2]");
						$sip.show();
					}
					bReload = true;
					return false;	// 只要分出第1頁就好
				}
			});
			if(!ok)
				return;	// 需retry重新執行doPaging(), 故不需以dfd回傳
			if(bReload)
				// 1090131 Raymond 1090055 修正DocView內嵌AOL時, 排版出現垂直Scrollbar導致次頁多一行前頁的末行的問題
				//$testbody.empty().append($flow.clone(true).css("overflow-y", "visible"));
				$testbody.empty().append($flow.clone(true));
			// end of 1st-pass
			$testbody.find("> div").children().each(function(idx, elm) {
				theLogger.debug("#" + idx + " - rng.selectNodeContents(" + elm.tagName + ")'" + (($(elm).text().length > 8)?$(elm).text().substr(0, 8) + "...'":$(elm).text() + "'"));	// 1100825 Raymond 1100925 再修改log資訊
				rng.selectNodeContents(elm);	// 2015.8.7 FireFox選node只會有一個最外面的ClientRect, 不會有children的ClientRect
												// 改為選nodeContents後, Chrome的getClientRects的第0個就不是最外圍的ClientRect了
				//theLogger.debug("rng.selectNode(" + elm.tagName + ")");
				//rng.selectNode(elm);
				var brc = rng.getBoundingClientRect();
				// 1100825 Raymond 1100925 修正無任何子節點的DIV, 用selectNodeContents()會得到一個大小為0, 位置為0的ClientRect, 改用selectNode取代
				if(!!brc && brc.left == 0 && brc.top == 0 && brc.width == 0 && brc.height == 0 && elm.childNodes.length == 0) {
					theLogger.debug("#" + idx + " - rng.selectNode(" + elm.tagName + ")'");	// 1101224 Raymond 1101541 新增log資訊
					rng.selectNode(elm);
					brc = rng.getBoundingClientRect();
				}
				if(brc == null) {	// 2015.9.10 新增例外排除
					theLogger.error("<" + elm.tagName + ">.boundingClientRect=null('" + elm.outerHTML + "'), 1秒後重試!!");
					ok = false;
					setTimeout(doPaging, 1000);	// 2015.11.10 retry
					return false;	// break each-loop
				}
				else {
					elm.removeAttribute("data-from");	// reset
					elm.removeAttribute("data-frompos");
					$(elm).attr("data-boundingcrc", Math.floor(brc.left) + "," + Math.floor(brc.top) + "," + Math.floor(brc.right - brc.left) + "," + Math.floor(brc.bottom - brc.top));
					$(elm).attr("data-offsety", $(elm).offset().top);
					$(elm).attr("data-height", $(elm).height());
					
					/*theLogger.warn("getBoundingClientRect(" + idx + ") = t:" + brc.top + " b:" + brc.bottom + " l:" + brc.left + " r:" + brc.right);
					brcs[idx] = {top: brc.top, bottom: brc.bottom, left: brc.left, right: brc.right};
					if(idx > 0 && brc.top < brcs[idx-1].bottom) {
						theLogger.error("\t與前element重疊!!");
						bKeep = true;
					}*/
				}
				// 1101224 Raymond 1101541 修改Log資訊
				//theLogger.debug("<" + elm.tagName + ">.top~bottom:" + Math.floor(brc.top) + "~" + Math.floor(brc.bottom) + "(" + Math.floor(brc.bottom - brc.top) + ")    of.top=" + Math.floor(of.top) + "    brc.bottom-of.top=" + Math.floor(brc.bottom - of.top));
				theLogger.debug("<" + elm.tagName + ">.top~bottom:" + brc.top + "~" + brc.bottom + "(" + (brc.bottom - brc.top) + ")    of.top=" + of.top + "    brc.bottom-of.top=" + (brc.bottom - of.top));
				// 2015.10.1 TABLE改用getClientRects()的第1個rc作為getBoundingClientRect()的上、下位置資訊
				var brcBottom = brc.bottom, brcTop = brc.top;
				if(elm.tagName == "TABLE") {
					/* 2016.8.29 Chrome跟IE的brc應該是正確的, 雖然2者不一致
					var rcs = rng.getClientRects();
					if(rcs.length == 0) {
						theLogger.error("TABLE.getClientRects = 0, 0.01秒後重試!!");
						ok = false;
						setTimeout(doPaging, 10);	// 2016.4.15 retry
						return false;	// break each-loop
					}
					//else
					//	$(elm).attr("crc", "(1/" + rcs.length + "):" + rcs[0].left + "," + rcs[0].top + "," + (rcs[0].right - rcs[0].left) + "," + (rcs[0].bottom - rcs[0].top));
					for(var i=0; i<rcs.length; i++) {
						if(i == 0) {
							theLogger.debug("\t->[" + i + "]" + Math.floor(rcs[i].left) + ", " + Math.floor(rcs[i].top) + ", " + Math.floor(rcs[i].right) + ", " + Math.floor(rcs[i].bottom) + "(" + Math.floor(rcs[i].bottom - rcs[i].top) + ");    brcBottom-of.top=" + Math.floor(rcs[i].bottom - of.top));
							brcBottom = rcs[i].bottom;
							brcTop = rcs[i].top;
						}
						else {
							theLogger.debug("\t  [" + i + "]" + Math.floor(rcs[i].left) + ", " + Math.floor(rcs[i].top) + ", " + Math.floor(rcs[i].right) + ", " + Math.floor(rcs[i].bottom) + "(" + Math.floor(rcs[i].bottom - rcs[i].top) + ")");
						}
					}*/
					//if(navigator.userAgent.indexOf("Trident") >= 0) {
						theLogger.warn("brcTop=" + brcTop + ",offset().top=" + $(elm).offset().top + ",position().top=" + $(elm).position().top);
						// 1070912 Raymond 1070729 IE的offset().top會是小數點, 用Math.floor()會比較接近Chrome的offset().top
						//brcTop = $(elm).offset().top;
						brcTop = Math.floor($(elm).offset().top);
						// 1090408 Raymond 1090254 修正由於offset()是不包含margin的座標, 而getBoundingClientRect()回的也是不包含margin的座標, 若table設定了margin-top, 會使brcTop較原本認定真實的元素上方座標值大, 若此table為次頁第一個物件將會造成記錄的斷頁點也變大, 但實際上元素顯示在次頁是包含margin-top的, 斷頁點應記錄在減去此table的margin-top的座標
						//brcBottom = brcTop + $(elm).height();
						var mgnTop = parseFloat($(elm).css("margin-top"));
						if(mgnTop > 0) {
							theLogger.warn("此TABLE設定了margin-top('" + elm.style.marginTop + "'=" + $(elm).css("margin-top") + "), 應擴大矩形範圍");
							brcTop -= mgnTop;
							brcBottom = brcTop + $(elm).outerHeight(true);	// outerHeight()傳入參數true會回傳包含margin的高度
							$(elm).attr("data-offsety", brcTop);			// 更新data屬性
							$(elm).attr("data-height", $(elm).outerHeight(true));// 更新data屬性
						}
						else
							brcBottom = brcTop + $(elm).outerHeight(true);	// outerHeight()傳入參數true會回傳包含margin的高度
						
						theLogger.warn("elmBrc[" + idx + "].top由" + brc.top + " -> " + brcTop);
						/*var emptyRowHeight = 0;	// 2016.11.23 統計第一行文字出現前空行的累計高度
						var n = $(elm).find("tr").length;
						for(var i=0; i<n; i++) {
							var txt = $(elm).find("tr").eq(i).text();
							if(txt.length) {	// 即使是用全形空白去撐出Row的高度, IE似乎也不會讀到一個全形空白字串
								theLogger.log("表格第" + i + "列出現第一行文字'" + txt + "'");
								break;
							}
							else {
								emptyRowHeight += $(elm).find("tr").eq(i).height();
								theLogger.log("表格第" + i + "列高度為 " + $(elm).find("tr").eq(i).height() + ", 累計第一行文字前已有空行高度 " + emptyRowHeight);
							}
						}
						brcBottom = brcTop + $(elm).height() - emptyRowHeight;	// 2016.10.31 IE計算的brc只有文字的部分, 用$.height()修正回來
																				// 2016.11.23 表格中第一行出現文字可能不在第1個Row, 這會導致表格高度被誤判為較實際大的數值而提前跳頁,
																				// 修改為扣掉前面統計的空行高度
						brcTop = brcTop - emptyRowHeight;						// 2017.2.7 brcTop也需要修正, 因為若此表格為斷頁後第1個物件, 則斷頁點會設成此物件的top, 若斷頁點未修正而徧下的話會導致簽核區域座標小於原本位置而使簽核物件徧下約一行顯示*/
					//}
					theLogger.warn("elmBrc[" + idx + "].bottom由" + brc.bottom + " -> " + brcBottom);
					elmBrc[idx] = {top: brcTop, bottom: brcBottom};
				}
				else {	// 2015.11.30 行高2.0情況下, getBoundingRect只會抓到去除周圍空白的整體區塊位置資訊, 判斷斷頁點會產生誤差
					// 1101224 Raymond 1101541 IE跟Chrome的offset().top都會有誤差小數點, 改成四捨五入整數
					// 1070912 Raymond 1070729 IE的offset().top會是小數點, 用Math.floor()會比較接近Chrome的offset().top
					//brcTop = Math.ceil($(elm).offset().top);
					//brcTop = Math.floor($(elm).offset().top);
					if((navigator.userAgent.match(/Chrome\/(\d+)\./) || navigator.userAgent.match(/Chromium\/(\d+)\./)) && parseInt(RegExp.$1) >= 96)
						theLogger.warn("brcTop: " + brcTop + "->" + Math.round($(elm).offset().top) + ", brcBottom: " + brcBottom + "->" + (Math.round($(elm).offset().top) + Math.round($(elm).height())));
					else
						theLogger.warn("brcTop: " + brcTop + "->" + Math.round($(elm).offset().top) + ", brcBottom: " + brcBottom + "->" + (Math.round($(elm).offset().top) + $(elm).height()));
					brcTop = Math.round($(elm).offset().top);
					brcBottom = brcTop + $(elm).height();
					// 1101224 Raymond 1101541 Chrome不知道是不是96版開始, 瀏覽器的縮放比在100%時取高度會出現小數點誤差, 150%時取高度會變整數, 故此處改成取四捨五入的整數
					if((navigator.userAgent.match(/Chrome\/(\d+)\./) || navigator.userAgent.match(/Chromium\/(\d+)\./)) && parseInt(RegExp.$1) >= 96)
						brcBottom = brcTop + Math.round($(elm).height());
					theLogger.debug("brc[" + idx + "]=" + brcTop + "-" + brcBottom);
					elmBrc[idx] = {top: brcTop, bottom: brcBottom};
					// 1070913 Raymond 1070729 Chrome回傳brc下邊界與計算修正後的下邊界的距離就是行高造成的空白高度
					if(navigator.userAgent.indexOf("Chrome") >= 0) {
						// 1091023 Raymond 1090735 改用精細計算
						//var pad = brcBottom - brc.bottom;	// 不用上邊界計算是因為content-editable狀態下, Chrome的getBoundingRect()可能回相同的top
						var pad = $(elm).offset().top + $(elm).height() - brc.bottom;
						// 1101224 Raymond 1101541 Chrome不知道是不是96版開始, 修正在放大比例下brc.bottom也會跟著放大, 造成計算出負值pad, 導致斷頁判斷錯誤的問題
						if((navigator.userAgent.match(/Chrome\/(\d+)\./) || navigator.userAgent.match(/Chromium\/(\d+)\./)) && parseInt(RegExp.$1) >= 96)
							pad = 0;
						console.warn("pad=" + pad);
					}
					// 1091023 Raymond 1090735 四捨五入是round不是ceil
					// 1090714 Raymond 1090477 行高用四捨五入取整數
					// 2016.1.20 用line-height減font-size再除以2計算得到的行間間距並不準確, 改用line-height減實際clientrect的高度除以2再計算
					//lineSpace[idx] = ((Number($(elm).css("line-height").replace(/px/,"")) - Number($(elm).css("font-size").replace(/px/,""))) / 2);
					//theLogger.debug("lineSpace[" + idx + "] = (" + $(elm).css("line-height") + "-" + $(elm).css("font-size") + ")/2 = " + lineSpace[idx]);
					//lineHeight[idx] = Number($(elm).css("line-height").replace(/px/,""));
					//lineHeight[idx] = Math.ceil($(elm).css("line-height").replace(/px/,""));
					lineHeight[idx] = Math.round($(elm).css("line-height").replace(/px/,""));
					theLogger.debug("lineHeight[" + idx + "] = " + lineHeight[idx]);
				}
				// 2016.12.6 新增支援斷頁指令
				if(elm.tagName == "DIV" && $(elm).hasClass("page-break")) {
					theLogger.warn("PAGE BREAK(斷頁指令)...brcBottom=" + brcBottom + ", break on " + (brcBottom + sy - offTop));
					nfo.breaks[nfo.pages-1] = brcBottom + sy - offTop;
					nfo.pages++;
					// 1091023 Raymond 1090735 斷頁後重新計算次頁有效高度
					if(nfo.pages == 2) {	// 僅分出第2頁時才有可能與首頁不同高度
						$testbody.css("height", getEffHeight());
						eh = $testbody.height();
						theLogger.log("P#" + nfo.pages + "有效eh = " + eh + "(" + $testbody.get(0).style.height + ")");
					}
					
					offTop = (brcBottom + sy);
					theLogger.warn("offTop = " + offTop);
					
					/* 2017.1.13 移至1st-pass控制顯示第1頁分頁後show-in-page=2的物件顯示問題
					var $sip = $(elm).find("[data-showinpage=2]");	// 修正FDA的案由第一頁不顯示(show-in-page=2)問題
					$sip.show();
					$sip = $(elm).nextAll().find("[data-showinpage=2]");
					$sip.show();*/
				}
				else if((brcBottom + sy - offTop) > eh) {
					if(elm.tagName == "TABLE" /* && $(elm).data("keep-together")*/) { // 2015.3.16 - 修正表格為不跨頁
						theLogger.log("PAGE BREAK(TABLE:keep-together)...brcBottom=" + brcBottom + ", break on " + (brcTop + sy - offTop));
						//$body.css({height: Math.floor((rcs[0].top - of.top) * 100 / scale) + "px", overflowY: "hidden"});
						
						nfo.breaks[nfo.pages-1] = brcTop + sy - offTop;
						nfo.pages++;
						// 1091023 Raymond 1090735 斷頁後重新計算次頁有效高度
						if(nfo.pages == 2) {	// 僅分出第2頁時才有可能與首頁不同高度
							$testbody.css("height", getEffHeight());
							eh = $testbody.height();
							theLogger.log("P#" + nfo.pages + "有效eh = " + eh + "(" + $testbody.get(0).style.height + ")");
						}
						
						offTop = (brcTop + sy);	// 2015.11.10 - 修正斷頁計算錯誤
						theLogger.warn("offTop = " + offTop);
						
						/* 2017.1.13 移至1st-pass控制顯示第1頁分頁後show-in-page=2的物件顯示問題
						var $sip = $(elm).find("[data-showinpage=2]");	// 2016.10.13 修正FDA的案由第一頁不顯示(show-in-page=2)問題
						$sip.show();
						$sip = $(elm).nextAll().find("[data-showinpage=2]");
						$sip.show();*/
					}
					// 1120816 Raymond 1120503 新增自訂表格不可跨頁
					else if($(elm).find(".custom-table").length) {
						theLogger.log("PAGE BREAK(CUSTOM-TABLE:keep-together)...brcBottom=" + brcBottom + ", break on " + (brcTop + sy - offTop));
						//$body.css({height: Math.floor((rcs[0].top - of.top) * 100 / scale) + "px", overflowY: "hidden"});
						
						nfo.breaks[nfo.pages-1] = brcTop + sy - offTop;
						nfo.pages++;
						// 1091023 Raymond 1090735 斷頁後重新計算次頁有效高度
						if(nfo.pages == 2) {	// 僅分出第2頁時才有可能與首頁不同高度
							$testbody.css("height", getEffHeight());
							eh = $testbody.height();
							theLogger.log("P#" + nfo.pages + "有效eh = " + eh + "(" + $testbody.get(0).style.height + ")");
						}
						
						offTop = (brcTop + sy);	// 2015.11.10 - 修正斷頁計算錯誤
						theLogger.warn("offTop = " + offTop);
					}
					else {
						// 1110928 Raymond 陸委會序298 Chrome/Edge環境下若SPAN.a的child全是追蹤修訂或格式, rng.getClientRects可能會跟FireFox一樣只回最外層的Rect
						// 1100120 Raymond 1090927 fix for FireFox的selectNodeContents只會回childNodes的外圍rectangle
						//if(navigator.userAgent.indexOf("Firefox") >= 0) {
						//	if($(elm).children("SPAN.a").length > 0) {
						//		rng.selectNodeContents($(elm).children("SPAN.a")[0]);
						var rngIsSPANOnly = false;
						function _rngLastRectIsMultiLine(rng) {
							let rcs = rng.getClientRects();
							if(rcs.length && rcs[rcs.length - 1].height > (lineHeight[idx] * 1.5)) {	// range的最後一個Rect如果高度超過一行半的高度, 則判定為多行
								console.debug("rng.getClientRects回傳的最後一個Rect的高度超過單行的一行半高度, 應是多行且內容皆是追蹤修訂或格式化標籤");
								return true;
							}
							return false;
						}
						if(navigator.userAgent.indexOf("Firefox") >= 0 || (navigator.userAgent.indexOf("Chrome") >= 0 && _rngLastRectIsMultiLine(rng))) {
							function _getVisibleText(nd) {
								var s = "";
								for(var x=0; x<nd.childNodes.length; x++) {
									if(nd.childNodes[x].nodeType == 1 && $(nd.childNodes[x]).is(":visible"))
										s += nd.childNodes[x].textContent;
									else if(nd.childNodes[x].nodeType == 3)
										s += nd.childNodes[x].textContent;
								}
								return s;
							}
							if($(elm).children("SPAN.a").length > 0 && _getVisibleText($(elm).children("SPAN.a").get(0)).length > 0) {	// 若<文字>有內容選取<文字>的內容
								rng.selectNodeContents($(elm).children("SPAN.a")[0]);
								rngIsSPANOnly = true;
							}
							else if($(elm).children("SPAN.plain").length > 0 && _getVisibleText($(elm).children("SPAN.plain").get(0)).length > 0) {	// 若標題或標號有內容則選取標題或標號
								rng.selectNodeContents($(elm).children("SPAN.plain")[0]);
								rngIsSPANOnly = true;
							}
						}
						var rcs = rng.getClientRects();
						if(rcs.length == 0) {
							theLogger.error(elm.tagName + ".getClientRects = 0");
						}
						/*else {	// 1110504 Raymond for test
							for(var i=0; i<rcs.length; i++)
								console.log(i + "\t" + " - " + rcs[i].left + ", " + rcs[i].top + ", " + rcs[i].bottom + " - " + rcs[i].width + " X " + rcs[i].height);
						}*/
						/*else
							$(elm).attr("crc", "(1/" + rcs.length + "):" + rcs[0].left + "," + rcs[0].top + "," + (rcs[0].right - rcs[0].left) + "," + (rcs[0].bottom - rcs[0].top));*/
						// 2016.11.4 FIX for IE
						var iStart = 0;
						// 1070912 Raymond 1070729 IE的getClientRects()有可能第1個是全部DIV的大小, 也有可能是第1行文字的大小, 一律從第2個rc開始判斷可能造成漏掉第1行高度, 導致後續頁次的斷頁點產生誤差而未顯示末行的問題
						//if(navigator.userAgent.indexOf("Trident") >= 0)
						//	iStart = 1;
						var rca = [];	// rcs是唯讀的, 新增一個rca陣列來取代
						// 1110718 Raymond 1110625 Chrome下, 各行rcs會回報為不含行高的淨大小與IE不同, 第0個rcs若是最外框大小, 則第1個rcs的top與第0個rcs的top差即為上半部差高, 下半部差高則為lineHeight-上半部差高
						var xlu = 0, xll = 0;
						// 1100908 Raymond 1100799 修正Chrome下唯讀資料夾的公文不顯示序號的條列, 也會回傳rcs[0]是整個DIV的大小, 導致誤判被移至次頁顯示的問題
						//if(isIE) {
							// 1110928 Raymond 陸委會序298 若rng改選取SPAN.a後, rcs[0]就不會是DIV或SPAN.a最外層的Rect了, 須改用別的判斷方式
							if(rngIsSPANOnly === true) {
								if(rcs.length > 1 && rcs[0].height > (lineHeight[idx] * 1.5)) {
									theLogger.warn((navigator.userAgent.indexOf("Chrom") >= 0 ? "Chrome":"FireFox") + "回傳DIV內容的框框, 第1個的下邊界超過第2個的上邊界, 判斷是整個DIV的大小, 忽略之");
									iStart = 1;
									rca[0] = {top: rcs[0].top, bottom: rcs[0].bottom, width: rcs[0].width, height: rcs[0].height};	// IE要跳過第1組rc時, 將第1組rc記錄在rca中
									// 1110718 Raymond 1110625 Chrome下, 各行rcs會回報為不含行高的淨大小與IE不同, 第0個rcs若是最外框大小, 則第1個rcs的top與第0個rcs的top差即為上半部差高, 下半部差高則為lineHeight-上半部差高
									xlu = rcs[1].top - rcs[0].top;
									xll = lineHeight[idx] - rcs[1].height - xlu;
									// 1110822 Raymond 1110771 修正行高為1時, 在Chrome環境下計算inline的高度會超出line-height的高度, 導致頁尾出現一行字只顯示上半部問題
									if(!!elm.style && !!elm.style.lineHeight && elm.style.lineHeight < 1.1) {
										xll = rcs[1].bottom - rcs[0].bottom;
										xlu = lineHeight[idx] - rcs[1].height - xll;
									}
								}
								else {
									xlu = rcs[0].top - brc.top;
									xll = lineHeight[idx] - rcs[0].height - xlu;
									// 1110822 Raymond 1110771 修正行高為1時, 在Chrome環境下計算inline的高度會超出line-height的高度, 導致頁尾出現一行字只顯示上半部問題
									//if(!!elm.style && !!elm.style.lineHeight && elm.style.lineHeight < 1.1) {
									//	xll = rcs[1].bottom - rcs[0].bottom;
									//	xlu = lineHeight[idx] - rcs[1].height - xll;
									//}
								}
								theLogger.warn("xlu=" + xlu + ", xll=" + xll);
							}
							// 1111014 Raymond 陸委會序334 修正隱藏標號後, rcs第1個是寬度為0的標號, 第2個才是整個SPAN.a的大小, pagingP()不需要此判斷, 因為列印時, 隱藏標號的para不會產生標號的plain
							else if(rcs.length > 2 && rcs[0].width == 0 && rcs[1].bottom > rcs[2].top) {
								//theLogger.warn("IE回傳DIV內容的框框, 第1個的下邊界超過第2個的上邊界, 判斷是整個DIV的大小, 忽略之");
								theLogger.warn((isIE ? "IE":(navigator.userAgent.indexOf("Chrome") >= 0 ? "Chrome":"Browser")) + "回傳DIV內容的框框, 第2個的下邊界超過第3個的上邊界, 判斷是整個SPAN.a的大小, 忽略之");
								iStart = 2;
								rca[0] = {top: rcs[0].top, bottom: rcs[0].bottom, width: rcs[0].width, height: rcs[0].height};	// 要跳過第1組rc時, 將第1組rc記錄在rca中
								rca[1] = {top: rcs[1].top, bottom: rcs[1].bottom, width: rcs[1].width, height: rcs[1].height};	// 要跳過第2組rc時, 將第2組rc記錄在rca中
								// 1110718 Raymond 1110625 Chrome下, 各行rcs會回報為不含行高的淨大小與IE不同, 第0個rcs若是最外框大小, 則第1個rcs的top與第0個rcs的top差即為上半部差高, 下半部差高則為lineHeight-上半部差高
								xlu = rcs[2].top - rcs[1].top;
								xll = lineHeight[idx] - rcs[2].height - xlu;
								// 1110822 Raymond 1110771 修正行高為1時, 在Chrome環境下計算inline的高度會超出line-height的高度, 導致頁尾出現一行字只顯示上半部問題
								if(!!elm.style && !!elm.style.lineHeight && elm.style.lineHeight < 1.1) {
									xll = rcs[2].bottom - rcs[1].bottom;
									xlu = lineHeight[idx] - rcs[2].height - xll;
								}
								theLogger.warn("xlu=" + xlu + ", xll=" + xll);
							}
							else
							if(rcs.length > 1 && rcs[0].bottom > rcs[1].top) {
								//theLogger.warn("IE回傳DIV內容的框框, 第1個的下邊界超過第2個的上邊界, 判斷是整個DIV的大小, 忽略之");
								theLogger.warn((isIE ? "IE":(navigator.userAgent.indexOf("Chrome") >= 0 ? "Chrome":"Browser")) + "回傳DIV內容的框框, 第1個的下邊界超過第2個的上邊界, 判斷是整個DIV的大小, 忽略之");
								iStart = 1;
								rca[0] = {top: rcs[0].top, bottom: rcs[0].bottom, width: rcs[0].width, height: rcs[0].height};	// IE要跳過第1組rc時, 將第1組rc記錄在rca中
								// 1110718 Raymond 1110625 Chrome下, 各行rcs會回報為不含行高的淨大小與IE不同, 第0個rcs若是最外框大小, 則第1個rcs的top與第0個rcs的top差即為上半部差高, 下半部差高則為lineHeight-上半部差高
								xlu = rcs[1].top - rcs[0].top;
								xll = lineHeight[idx] - rcs[1].height - xlu;
								// 1110822 Raymond 1110771 修正行高為1時, 在Chrome環境下計算inline的高度會超出line-height的高度, 導致頁尾出現一行字只顯示上半部問題
								if(!!elm.style && !!elm.style.lineHeight && elm.style.lineHeight < 1.1) {
									xll = rcs[1].bottom - rcs[0].bottom;
									xlu = lineHeight[idx] - rcs[1].height - xll;
								}
								theLogger.warn("xlu=" + xlu + ", xll=" + xll);
							}
						//}
						// 1110928 Raymond 陸委會序298
						var firstOfThisLine = undefined;
						for(var i=iStart; i<rcs.length; i++) {
							//var ctx = rng.cloneContents();
							//theLogger.log("t:" + rcs[i].top + ", b:" + rcs[i].bottom + ", l:" + rcs[i].left + ", r:" + rcs[i].right + " - '" + ctx.toString().substring(0, 10).replace(/[\r\n]+/g, " ") + "...'(" + elm.tagName + ")");
							if(i == rcs.length - 1) {   // 末行
								theLogger.log("末行寬: " + (rcs[i].right - rcs[i].left) + "px");
							}
							// 1070912 Raymond 1070729 Chrome取得的區域只有文字部分, pad是元素top到文字top的距離, 可當做每行文字上下之間空白的距離
							rca[i] = {top: rcs[i].top, bottom: rcs[i].bottom, width: rcs[i].width, height: rcs[i].height};
							// 1110928 Raymond 陸委會序298 修正FireFox也要套用rca的校正
							//if(navigator.userAgent.indexOf("Chrome") >= 0) {
							if(navigator.userAgent.indexOf("Chrome") >= 0 || navigator.userAgent.indexOf("Firefox") >= 0) {
								// 1081227 Raymond 1081135 正副本段落可能因brcTop是無條件捨棄小數點, brcBottom也變成捨棄小數點, 可能導致比brc.bottom小, 而使pad變成負數
								if(pad < 0) {
									if((rca[i].bottom - rca[i].top) > Math.ceil(lineHeight[idx] + 1)) {
										// 1100625 Raymond 1100692 修正Chrome下段落行高設為1.0或0.9時, 取得的ClientRect的高度都會大於line-height, 而pad都會是負值
										//theLogger.warn("此行高度超過單行高度, 忽略");
										if((rca[i].bottom - rca[i].top + pad + pad) > Math.ceil(lineHeight[idx] + 1))
											theLogger.warn("此行[" + i + "]高度超過單行高度, 忽略");
										else {
											theLogger.warn("rcs[" + i + "].top=" + rcs[i].top + "->" + (rcs[i].top - pad) + ", .bottom=" + rcs[i].bottom + "->" + (rcs[i].bottom + pad));
											rca[i].top = rcs[i].top - pad;	// Chrome環境時, 用pad擴大每行的top, bottom
											rca[i].bottom = rcs[i].bottom + pad;
											rca[i].height = rcs[i].height + (pad * 2);
										}
									}
									// 1100625 Raymond 1100692 修正Chrome下段落行高設為1.0或0.9時, 取得的ClientRect的高度都會大於line-height, 而pad都會是負值, 這裡處理正副本的修正邏輯要避開段落
									//else {
									else if(!$(elm).hasClass("segment")) {
										theLogger.warn("段落(正、副、抄本)可能計算元素bottom得到負數的pad, 重新以單行行高(" + lineHeight[idx] + ")減bottom(" + rcs[i].bottom + ")-top(" + rcs[i].top + ")");
										pad = (lineHeight[idx] - (rcs[i].bottom - rcs[i].top)) / 2;
										theLogger.warn("得出行間距, 再除2計算得pad = " + pad);
										theLogger.warn("rcs[" + i + "].top=" + rcs[i].top + "->" + (rcs[i].top - pad) + ", .bottom=" + rcs[i].bottom + "->" + (rcs[i].bottom + pad));
										rca[i].top = rcs[i].top - pad;	// Chrome環境時, 用pad擴大每行的top, bottom
										rca[i].bottom = rcs[i].bottom + pad;
										rca[i].height = rcs[i].height + (pad * 2);
									}
								}
								// 1110822 Raymond 1110771 修正行高為1時, 在Chrome環境下計算inline的高度會超出line-height的高度, 導致頁尾出現一行字只顯示上半部問題
								// 1090702 Raymond 1090477 修正Chrome下條列第一個ClientRect可能是標號的外圍, 會等於補正後的單行高度, 若再進行補正會大於單行高度, 造成誤判下邊界超出範圍提前跨頁的問題
								//else if(rcs[i].height + (pad * 2) > lineHeight[idx]) {
								else if(rcs[i].height + (pad * 2) > lineHeight[idx] && !!elm.style && !!elm.style.lineHeight && elm.style.lineHeight >= 1.1) {
									theLogger.warn("rcs[" + i + "].height=" + rcs[i].height + ", 不需補正(+" + (pad * 2) + "), 以避免超出單行高度(" + lineHeight[idx] + ")");
								}
								// 1090714 Raymond 1090477 修正Chrome下條列第一個ClientRect可能是隱藏標號的外圍, 會高度為0
								else if(rcs[i].width == 0 && rcs[i].height == 0) {
									theLogger.warn("rcs[" + i + "].width=" + rcs[i].width + " .height=" + rcs[i].height + ", 應是隱藏的標號, 不需補正(+" + (pad * 2) + ")");
									// 1091026 Raymond 1090735 修正Chrome下隱藏標號造成本行第1個ClientRect(i=1)超出有效高度時, 取上一行的下緣取到0高度的標號, 計算錯誤的斷頁點, 造成本行顯示一半的問題
									iStart = i + 1;	// 借用isIE的iStart來跳過無高度的標號
								}
								else {
									// 1110718 Raymond 1110625 修正pad停用後, Chrome下回傳的rcs會是各行不含行高的淨大小, 造成斷頁判定與IE或GenPage不一致的問題
									//theLogger.warn("rcs[" + i + "].top=" + rcs[i].top + "->" + (rcs[i].top - pad) + ", .bottom=" + rcs[i].bottom + "->" + (rcs[i].bottom + pad));
									//rca[i].top = rcs[i].top - pad;	// Chrome環境時, 用pad擴大每行的top, bottom
									//rca[i].bottom = rcs[i].bottom + pad;
									//rca[i].height = rcs[i].height + (pad * 2);
									theLogger.warn("rcs[" + i + "].top=" + rcs[i].top + "->" + (rcs[i].top - xlu) + ", .bottom=" + rcs[i].bottom + "->" + (rcs[i].bottom + xll));
									rca[i].top = rcs[i].top - xlu;
									rca[i].bottom = rcs[i].bottom + xll;
									rca[i].height = rcs[i].height + xlu + xll;
									// 1110928 Raymond 陸委會序298 修正判斷是否為下標字, 若是則取本行首的top為下標字的top, 以避免斷頁斷在下標字的top, 造成同一行的正常字被切成上下一半
									if(i > iStart && firstOfThisLine !== undefined) {
										if(rcs[firstOfThisLine].bottom < rca[i].top) {	// 行首用未調過的rcs.bottom, 比較不會發生次行的top小於前行行首的bottom而誤判成同一行的問題
											console.debug("本行首應為第" + i + "個Rect", rca[i]);
											firstOfThisLine = i;
										}
										else {
											if(rca[firstOfThisLine].top != rca[i].top) {
												if(rca[i].top > rca[firstOfThisLine].top) {
													//let ofst = rca[i].top - rca[firstOfThisLine].top;
													rca[i].top = rca[firstOfThisLine].top;
													rca[i].bottom = rcs[i].bottom;	// 下標字的bottom比單行的bottom要大
													rca[i].height = rca[i].bottom - rca[i].top;
													console.debug("本字的上緣較本行上緣低, 應是下標字, 校正本字的位置為[top:" + rca[i].top + ", bottom:" + rca[i].bottom + "]");
												}
												else {
													console.debug("本字的上緣較本行上緣高, 應是上標字或正常字, 未校正");
												}
											}
										}
									}
									else
										firstOfThisLine = i;
								}
							}
							/* 1070912 Raymond 1070729 rcs用rca取代
							if((rcs[i].top + sy - offTop) > eh) {	// 2015.9.9 本行上部已超過有效page body高度要斷在上一行
								if(i > iStart) {	// 2016.11.4 FIX for IE
									theLogger.debug("this rcs[" + i + "]=" + (rcs[i].top + sy - offTop) + "~" + (rcs[i].bottom + sy - offTop) + ", prev rcs[" + (i-1) + "]=" + (rcs[i-1].top + sy - offTop) + "~" + (rcs[i-1].bottom + sy - offTop));
									theLogger.log("P#" + nfo.pages + ": PAGE BREAK(上一行的下緣)..." + (rcs[i-1].bottom + sy - offTop + ((lineHeight[idx] - rcs[i-1].bottom + rcs[i-1].top) / 2)));	// 2016.1.20 用line-height減font-size計算的lineSpace不準, 改用line-height減實際clientrect的高度
									nfo.breaks[nfo.pages-1] = rcs[i-1].bottom + sy - offTop + ((lineHeight[idx] - rcs[i-1].bottom + rcs[i-1].top) / 2);	// 2016.1.20 用line-height減font-size計算的lineSpace不準, 改用line-height減實際clientrect的高度
									nfo.pages++;
									
									offTop = rcs[i-1].bottom + sy + ((lineHeight[idx] - rcs[i-1].bottom + rcs[i-1].top) / 2);	// 2016.1.20 用line-height減font-size計算的lineSpace不準, 改用line-height減實際clientrect的高度
									theLogger.warn("offTop = " + offTop);
								}
								else {
									theLogger.error("無上一行");
									if(idx > 0) {
										theLogger.warn("斷在上一頁最後一個段落的下緣, " + nfo.breaks[nfo.pages-1] + " -> " + (elmBrc[idx-1].bottom + sy - offTop));
										nfo.breaks[nfo.pages-1] = elmBrc[idx-1].bottom + sy - offTop;
										nfo.pages++;
										
										offTop = elmBrc[idx-1].bottom + sy;
										theLogger.warn("offTop = " + offTop);
									}
								}
							}*/
							if((rca[i].top + sy - offTop) > eh) {
								if(i > iStart) {	// 2016.11.4 FIX for IE
									theLogger.debug("this rcs[" + i + "]=" + (rca[i].top + sy - offTop) + "~" + (rca[i].bottom + sy - offTop) + ", prev rcs[" + (i-1) + "]=" + (rca[i-1].top + sy - offTop) + "~" + (rca[i-1].bottom + sy - offTop));
									theLogger.log("P#" + nfo.pages + ": PAGE BREAK(上一行的下緣)..." + (rca[i-1].bottom + sy - offTop + ((lineHeight[idx] - rca[i-1].bottom + rca[i-1].top) / 2)));	// 2016.1.20 用line-height減font-size計算的lineSpace不準, 改用line-height減實際clientrect的高度
									nfo.breaks[nfo.pages-1] = rca[i-1].bottom + sy - offTop + ((lineHeight[idx] - rca[i-1].bottom + rca[i-1].top) / 2);	// 2016.1.20 用line-height減font-size計算的lineSpace不準, 改用line-height減實際clientrect的高度
									nfo.pages++;
									// 1091023 Raymond 1090735 斷頁後重新計算次頁有效高度
									if(nfo.pages == 2) {	// 僅分出第2頁時才有可能與首頁不同高度
										$testbody.css("height", getEffHeight());
										eh = $testbody.height();
										theLogger.log("P#" + nfo.pages + "有效eh = " + eh + "(" + $testbody.get(0).style.height + ")");
									}
									
									offTop = rca[i-1].bottom + sy + ((lineHeight[idx] - rca[i-1].bottom + rca[i-1].top) / 2);	// 2016.1.20 用line-height減font-size計算的lineSpace不準, 改用line-height減實際clientrect的高度
									theLogger.warn("offTop = " + offTop);
								}
								else {
									theLogger.warn("無上一行");
									if(idx > 0) {
										theLogger.warn("斷在上一頁最後一個段落的下緣, " + nfo.breaks[nfo.pages-1] + " -> " + (elmBrc[idx-1].bottom + sy - offTop));
										nfo.breaks[nfo.pages-1] = elmBrc[idx-1].bottom + sy - offTop;
										nfo.pages++;
										// 1091023 Raymond 1090735 斷頁後重新計算次頁有效高度
										if(nfo.pages == 2) {	// 僅分出第2頁時才有可能與首頁不同高度
											$testbody.css("height", getEffHeight());
											eh = $testbody.height();
											theLogger.log("P#" + nfo.pages + "有效eh = " + eh + "(" + $testbody.get(0).style.height + ")");
										}
										
										offTop = elmBrc[idx-1].bottom + sy;
										theLogger.warn("offTop = " + offTop);
									}
								}
							}
							
							/*if((rcs[i].bottom + sy - offTop + ((lineHeight[idx] - rcs[i].bottom + rcs[i].top) / 2)) > eh) { // 超過有效page body高度要斷頁, 2015.12.2 加上行高多出的一半空間再判斷// 2016.1.20 用line-height減font-size計算的lineSpace不準, 改用line-height減實際clientrect的高度
								theLogger.log("P#" + nfo.pages + ": PAGE BREAK..." + (rcs[i].top + sy - offTop - ((lineHeight[idx] - rcs[i].bottom + rcs[i].top) / 2)));	// 2015.12.2 扣掉行高多出的一半空間才是本行的上緣	// 2016.1.20 用line-height減font-size計算的lineSpace不準, 改用line-height減實際clientrect的高度
								//$body.css({height: Math.floor((rcs[i].top - of.top) * 100 / scale) + "px", overflowY: "hidden"});
								
								nfo.breaks[nfo.pages-1] = rcs[i].top + sy - offTop - ((lineHeight[idx] - rcs[i].bottom + rcs[i].top) / 2);	// 2015.12.2 扣掉行高多出的一半空間才是本行的上緣, 再設為斷頁點	// 2016.1.20 用line-height減font-size計算的lineSpace不準, 改用line-height減實際clientrect的高度
								nfo.pages++;
								
								offTop = rcs[i].top + sy - ((lineHeight[idx] - rcs[i].bottom + rcs[i].top) / 2);	// 2015.3.23 - 修正斷頁計算錯誤, 2015.12.2 - offTop也要扣掉行高多出的一半高度	// 2016.1.20 用line-height減font-size計算的lineSpace不準, 改用line-height減實際clientrect的高度
								theLogger.warn("offTop = " + offTop);
							}*/
							/* 1070912 Raymond 1070729 rcs用rca取代
							if(rcs[i].bottom + sy - offTop > eh) { // 2016.11.4 行底超過有效page body高度就要斷頁
								if(navigator.userAgent.indexOf("Chrome") >= 0 && i > 0 &&
									(rcs[i].bottom - rcs[i].top) > Math.ceil(lineHeight[idx] + 1)) {
									theLogger.warn("Chrome環境下高度回應異常(" + (rcs[i].bottom - rcs[i].top) + "), 超過單行高度(" + Math.ceil(lineHeight[idx] + 1) + "), 排除之");
								}
								else {
									theLogger.warn("P#" + nfo.pages + ": 本行(" + i + ")下部超過有效高度, 斷頁在本行上緣..." + (rcs[i].top + sy - offTop));
									//$body.css({height: Math.floor((rcs[i].top - of.top) * 100 / scale) + "px", overflowY: "hidden"});
									
									nfo.breaks[nfo.pages-1] = rcs[i].top + sy - offTop;
									nfo.pages++;
									// TODO: 首頁斷頁後重算eh
									
									offTop = rcs[i].top + sy;
									theLogger.warn("offTop = " + offTop);
								}
							}
							else if(i == iStart) {	// 2015.7.22	2016.11.4 FIX for IE
								var x = "";
								for(var j=0; j<rcs.length; j++) {
									x += (Math.floor(rcs[j].top) + sy - offTop) + "-" + (Math.floor(rcs[j].bottom) + sy - offTop) + "(" + rcs[j].height + "),";
								}
								theLogger.debug("elmFrom[" + idx + "]=" + (nfo.pages - 1) + ", elmFromPos[" + idx + "]=" + x);
								// 段落跨頁時記下首行的頁次及top位置
								//$(elm).attr("data-from", nfo.pages-1).attr("data-frompos", rcs[i].top + sy - offTop);
								elmFrom[idx] = nfo.pages - 1;
								elmFromPos[idx] = rcs[0].top + sy - offTop;	// 2017.1.10 IE第1組(idx=0)有可能是整體DIV也有可能是第1行, 當是整體DIV時, 第1行座標要從第2組取(idx=1), 但可能因為狀況變成idx=0時是第1行而錯誤, 改成固定抓idx=0的話, 因為只取top, 所以不會跟正確的第1行top不一樣
								theLogger.warn("elmFrom[" + idx + "] = " + elmFrom[idx] + ", elmFromPos[" + idx + "] = " + elmFromPos[idx]);
								//theLogger.warn("elmFromPos[" + idx + "] = " + rcs[i].top + " + " + sy + " - " + offTop + " (" + elmFromPos[idx] + ")");
							}*/
							// 1090702 Raymond 1090477 修正IE取得的ClientRect有小數點而剛好bottom壓在頁面下限時, 產生誤判跨頁, 造成與匯出頁面結果不一致的問題
							//if((rca[i].bottom + sy - offTop) > eh) { // 2016.11.4 行底超過有效page body高度就要斷頁
							if(Math.floor(rca[i].bottom + sy - offTop) > eh) { // 2016.11.4 行底超過有效page body高度就要斷頁
								// 1130322 Raymond 1130204 修正在iPad下, 超過單行高度的Rect未排除, 導致超出頁面下緣的條列整個切到次頁顯示的問題, 因為iPad下的Safari甚至Chrome的userAgent都沒有了"Chrome"字樣
								//if(navigator.userAgent.indexOf("Chrome") >= 0 && i > 0 &&
								if(navigator.userAgent.match(/Edg|Chrome|Safari/) && i > 0 &&
									(rca[i].bottom - rca[i].top) > Math.ceil(lineHeight[idx] + 1)) {
									// 1130322 Raymond 1130204 修正在iPad下, 超過單行高度的Rect未排除, 導致超出頁面下緣的條列整個切到次頁顯示的問題, 因為iPad下的Safari甚至Chrome的userAgent都沒有了"Chrome"字樣
									//theLogger.warn("Chrome環境下高度回應異常(" + (rca[i].bottom - rca[i].top) + "), 超過單行高度(" + Math.ceil(lineHeight[idx] + 1) + "), 排除之");
									theLogger.warn(((navigator.userAgent.match(/Edg/))?"Edge":navigator.userAgent.match(/Chrome|Safari/)[0]) + "環境下高度回應異常(" + (rca[i].bottom - rca[i].top) + "), 超過單行高度(" + Math.ceil(lineHeight[idx] + 1) + "), 排除之");
								}
								else {
									// 1080716 Raymond 1080536 修正斷頁首行有margin-top高度時, 該頁最末行可能會被截一半的問題
									if(i == iStart && parseInt($(elm).css("marginTop")) > 0) {	// 首行margin-top大於0
										rca[i].top = rcs[i].top - parseInt($(elm).css("marginTop"));
										theLogger.warn("P#" + nfo.pages + ": 本行(" + i + ")下部" + (rca[i].bottom + sy - offTop) + "(" + rca[i].bottom + ")超過有效高度, 斷頁在本行上緣(含上邊界距離:" + parseInt($(elm).css("marginTop")) + ")..." + (rca[i].top + sy - offTop) + "(" + rca[i].top + ")");
									}
									// 1140613 Raymond 1140166 合併1130291, 修正本行上緣跟上行下緣有空間時, 斷頁位置有問題
									else if($page.closest(".doc_content").length > 0 && i > iStart && rca[i].top > rca[i-1].bottom) {
										theLogger.warn("P#" + nfo.pages + ": 本行(" + i + ")下部" + (rca[i].bottom + sy - offTop) + "(" + rca[i].bottom + ")超過有效高度, 斷頁在本行上緣(" + rca[i].top + ")與上行下緣(" + rca[i-1].bottom + ")中間..." + (((rca[i].top + rca[i-1].bottom) / 2) + sy - offTop) + "(" + rca[i].top + ")");
										rca[i].top = (rca[i].top + rca[i-1].bottom) / 2;
									}
									else {
									//theLogger.warn("P#" + nfo.pages + ": 本行(" + i + ")下部超過有效高度, 斷頁在本行上緣..." + (rcs[i].top + sy - offTop));
									theLogger.warn("P#" + nfo.pages + ": 本行(" + i + ")下部" + (rca[i].bottom + sy - offTop) + "(" + rca[i].bottom + ")超過有效高度, 斷頁在本行上緣..." + (rca[i].top + sy - offTop) + "(" + rca[i].top + ")");
									//$body.css({height: Math.floor((rcs[i].top - of.top) * 100 / scale) + "px", overflowY: "hidden"});
									}
									// 1100628 Raymond 1100692 無條件進位成整數, 以避免行高0.9時, 次頁出現被切到一點點的上行
									if(navigator.userAgent.indexOf("Chrome") >= 0) {
										if(elm.style.lineHeight <= 1.0 && $(elm).hasClass("segment") &&						// 行高小於1.0且為段落/條列
											i > 0 && (rca[i-1].bottom - rca[i-1].top) <= Math.ceil(lineHeight[idx] + 1)) {	// 前一行不是整個DIV的大小
											var ceiled = Math.ceil(rca[i-1].bottom + sy);									// 改用前一行的下緣做為斷頁點
										}
										// 1110928 Raymond 陸委會序298 修正若斷頁點落在下標字的區域中間, 斷頁點的判斷須往前後字找, 才能避免斷頁點被設在下標字的top, 導致該頁的末行及次頁的首行出現切上下一半的問題
										//else if(i > firstOfThisLine) {
										else if(i >= firstOfThisLine) {	// 1111004 Raymond 陸委會序319 修正當行首就是下標字時, 斷頁點未往後找正常字的top, 導致此行下標字正確顯示在次頁但正常字的上半部顯示在前頁的問題
											var ceiled = Math.ceil(rca[i].top + sy);
											var bkFound = false;
											for(var j=i-1; j>firstOfThisLine; j--) {	// rcs可能會因為格式及追蹤修訂而變成一個字一個, 往前推算斷頁點, 因為下標字的top比正常字低, 會導致斷頁點斷在下標字的top, 而使同一行的正常字被切到
												if(rca[j].top < rca[i].top && rca[j].bottom < rca[i].top)
													break;
												else {
													console.warn("往前推算以第" + j + "個字的上緣(" + rca[j].top + ")為斷頁點");
													ceiled = Math.ceil(rca[j].top + sy);
													bpFound = true;
												}
											}
											if(!bkFound) {	// 往前找找不到的話, 改往後找
												if(i < (rcs.length - 1)) {
													for(var j=i+1; j<rcs.length; j++) {	// 後面的rca還沒建立, 所以用rcs判斷
														if(rcs[j].top > rca[i].bottom)
															break;
														else if(rcs[j].top < rca[i].top && rcs[j].bottom > rca[i].top) {
															console.warn("往後推算以第" + j + "個字的上緣(" + (rcs[j].top - xlu) + ")為斷頁點");
															ceiled = Math.ceil(rcs[j].top - xlu + sy);
															bpFound = true;
														}
													}
												}
											}
										}
										else {
											var ceiled = Math.ceil(rca[i].top + sy);
										}
										nfo.breaks[nfo.pages-1] = ceiled - offTop;
									}
									else
									nfo.breaks[nfo.pages-1] = rca[i].top + sy - offTop;
									nfo.pages++;
									// 1091023 Raymond 1090735 斷頁後重新計算次頁有效高度
									if(nfo.pages == 2) {	// 僅分出第2頁時才有可能與首頁不同高度
										$testbody.css("height", getEffHeight());
										eh = $testbody.height();
										theLogger.log("P#" + nfo.pages + "有效eh = " + eh + "(" + $testbody.get(0).style.height + ")");
									}
									
									// 1100628 Raymond 1100692 無條件進位成整數
									if(navigator.userAgent.indexOf("Chrome") >= 0)
										offTop = ceiled;
									else
									offTop = rca[i].top + sy;
									theLogger.warn("offTop = " + offTop);
								}
							}
							// 1081025 Raymond 1080945 修正段落跨頁是行底超過有效高度情況時未記錄from、fromPos造成段落在跨頁的第一頁未顯示問題
							//else if(i == iStart) {	// 2015.7.22	2016.11.4 FIX for IE
							if(i == iStart) {	// 2015.7.22	2016.11.4 FIX for IE
								var x = "";
								for(var j=0; j<rca.length; j++) {
									x += (Math.floor(rca[j].top) + sy - offTop) + "-" + (Math.floor(rca[j].bottom) + sy - offTop) + "(" + rca[j].height + "),";
								}
								theLogger.debug("elmFrom[" + idx + "]=" + (nfo.pages - 1) + ", elmFromPos[" + idx + "]=" + x);
								// 段落跨頁時記下首行的頁次及top位置
								//$(elm).attr("data-from", nfo.pages-1).attr("data-frompos", rcs[i].top + sy - offTop);
								elmFrom[idx] = nfo.pages - 1;
								elmFromPos[idx] = rca[0].top + sy - offTop;	// 2017.1.10 IE第1組(idx=0)有可能是整體DIV也有可能是第1行, 當是整體DIV時, 第1行座標要從第2組取(idx=1), 但可能因為狀況變成idx=0時是第1行而錯誤, 改成固定抓idx=0的話, 因為只取top, 所以不會跟正確的第1行top不一樣
								theLogger.warn("elmFrom[" + idx + "] = " + elmFrom[idx] + ", elmFromPos[" + idx + "] = " + elmFromPos[idx]);
								//theLogger.warn("elmFromPos[" + idx + "] = " + rcs[i].top + " + " + sy + " - " + offTop + " (" + elmFromPos[idx] + ")");
							}
						}
						if(iStart == 1 && rcs.length == 1) {	// 2017.1.11 fix for IE變成Chrome行為時, 且只有1行, 上面for-loop會跳過問題
							if((rcs[0].top + sy - offTop) > eh) {	// 本行上部已超過有效page body高度要斷在上一行
								if(idx > 0) {
									theLogger.warn("斷在上一頁最後一個段落的下緣, " + nfo.breaks[nfo.pages-1] + " -> " + (elmBrc[idx-1].bottom + sy - offTop));
									nfo.breaks[nfo.pages-1] = elmBrc[idx-1].bottom + sy - offTop;
									nfo.pages++;
									// 1091023 Raymond 1090735 斷頁後重新計算次頁有效高度
									if(nfo.pages == 2) {	// 僅分出第2頁時才有可能與首頁不同高度
										$testbody.css("height", getEffHeight());
										eh = $testbody.height();
										theLogger.log("P#" + nfo.pages + "有效eh = " + eh + "(" + $testbody.get(0).style.height + ")");
									}
									
									offTop = elmBrc[idx-1].bottom + sy;
									theLogger.warn("offTop = " + offTop);
								}
								else {
									theLogger.error("本段落上部已超過有效高度, 但無前一段落");
								}
							}
							
							if(rcs[0].bottom + sy - offTop > eh) { // 2016.11.4 行底超過有效page body高度就要斷頁
								// 1080716 Raymond 1080536 修正斷頁首行有margin-top高度時, 該頁最末行可能會被截一半的問題
								if(parseInt($(elm).css("marginTop")) > 0) {	// 首行margin-top大於0
									var rcsTop = rcs[0].top - parseInt($(elm).css("marginTop"));
									theLogger.warn("P#" + nfo.pages + ": 本段落下部超過有效高度, 斷頁在本段落上緣(含上邊界距離:" + parseInt($(elm).css("marginTop")) + ")..." + (rcsTop + sy - offTop) + "(" + rcsTop + ")");
									nfo.breaks[nfo.pages-1] = rcsTop + sy - offTop;
									nfo.pages++;
									// 1091023 Raymond 1090735 斷頁後重新計算次頁有效高度
									if(nfo.pages == 2) {	// 僅分出第2頁時才有可能與首頁不同高度
										$testbody.css("height", getEffHeight());
										eh = $testbody.height();
										theLogger.log("P#" + nfo.pages + "有效eh = " + eh + "(" + $testbody.get(0).style.height + ")");
									}
									
									offTop = rcsTop + sy;
									theLogger.warn("offTop = " + offTop);
								}
								else {
								theLogger.warn("P#" + nfo.pages + ": 本段落下部超過有效高度, 斷頁在本段落上緣..." + (rcs[0].top + sy - offTop));
								//$body.css({height: Math.floor((rcs[i].top - of.top) * 100 / scale) + "px", overflowY: "hidden"});
								
								nfo.breaks[nfo.pages-1] = rcs[0].top + sy - offTop;
								nfo.pages++;
								// 1091023 Raymond 1090735 斷頁後重新計算次頁有效高度
								if(nfo.pages == 2) {	// 僅分出第2頁時才有可能與首頁不同高度
									$testbody.css("height", getEffHeight());
									eh = $testbody.height();
									theLogger.log("P#" + nfo.pages + "有效eh = " + eh + "(" + $testbody.get(0).style.height + ")");
								}
								
								offTop = rcs[0].top + sy;
								theLogger.warn("offTop = " + offTop);
								}
							}
						}
					}
				}
				else {	// for debug
					var rcs = rng.getClientRects();
					if(rcs.length == 0) {
						theLogger.error(elm.tagName + ".getClientRects = 0");
					}
					else {
						var x = "";
						for(var j=0; j<rcs.length; j++) {
							// 1070913 Raymond 1070729 Chrome下每行高度要計入行高產生的空白高度
							if(navigator.userAgent.indexOf("Chrome") >= 0 && elm.tagName != "TABLE")
								x += (Math.floor(rcs[j].top) + sy - offTop - pad) + "-" + (Math.floor(rcs[j].bottom) + sy - offTop + pad) + "(" + (rcs[j].height + pad + pad) + "),";
							else
								x += (Math.floor(rcs[j].top) + sy - offTop) + "-" + (Math.floor(rcs[j].bottom) + sy - offTop) + "(" + rcs[j].height + "),";
						}
						theLogger.debug("elmFrom[" + idx + "]=" + (nfo.pages - 1) + ", elmFromPos[" + idx + "]=" + x);
					}
				}
				//$(elm).attr("data-po", nfo.pages-1);
				elmPo[idx] = nfo.pages - 1;
				//theLogger.warn("elmPo[" + idx + "] = " + nfo.pages + " - 1 (" + elmPo[idx] + ")");
				
				if($(elm).find(".sign-area").length) {
					$(elm).find(".sign-area").each(function(idx, sa) {
						theLogger.debug(".sign-area: " + $(sa).attr("data-id") + "," + $(sa).offset().left + "," + $(sa).offset().top);
						//var m = $flow.find("[data-po='" + (nfo.pages - 1) + "']");
						//if(m.length) {
						//	if(SSO_CONFIG.logLevel >= 3)
						//		theLogger.log("1st elm: " + m.eq(0).offset().left + "," + m.eq(0).offset().top + ", mtop:" + m.eq(0).css("margin-top"));
						//    var bd = {left: $body.offset().left - $page.offset().left, top: $body.offset().top - $page.offset().top};
						//	if(SSO_CONFIG.logLevel >= 3)
						//		theLogger.log("   rc:" + ($(sa).offset().left - m.eq(0).offset().left + bd.left) + "," + ($(sa).offset().top - m.eq(0).offset().top + bd.top) + "," + $(sa).width() + "," + $(sa).height());
							if(!("signAreas" in nfo))
								nfo.signAreas = new Array();
							// 2016.12.28 fix for 第3頁後簽核框位置座標錯誤問題
							function calcBreaks(po) {
								var res = 0;
								while(po >= 0)
									res += nfo.breaks[po--];
								return res;
							}
							
							var found = false;
							$.each(nfo.signAreas, function(i, signArea) {
								//if(signArea.id == $(sa).attr("data-id")) {	// 2017.2.17 不得已改用一隨機的ID屬性, 因為簽稿會核單的多個簽核區域data-id固定都是空字串
								if(signArea.psudoId == $(sa).attr("id")) {		// 會讓指定po跟上下寬高的程序錯亂
									signArea.po = nfo.pages - 1;
									signArea.left = $(sa).offset().left + of.left - of0.left;// - m.eq(0).offset().left + bd.left;
									//signArea.left = $(sa).position().left - $page.position().left;
									if(signArea.po > 0) {	// 2016.9.26 FIX, 第2頁以後的簽核框要把從斷頁的位置起算
										if(signArea.po < nfo.pages) {
											//signArea.top = $(sa).offset().top - nfo.breaks[signArea.po - 1] + of.top - of0.top;
											signArea.top = $(sa).offset().top - calcBreaks(signArea.po - 1) + of.top - of0.top;// 2016.12.28 fix for 第3頁後簽核框位置座標錯誤問題
										}
										else {
											theLogger.error("簽核框所在頁次超過分頁數量!?");
											signArea.top = $(sa).offset().top + of.top - of0.top;
										}
									}
									else
										signArea.top = $(sa).offset().top + of.top - of0.top;// - m.eq(0).offset().top + bd.top;	// 2016.9.13 FIX, 自動職名章加蓋位置徧下問題
									//signArea.top = $(sa).position().top - $page.position().top;
									signArea.width = $(sa).width();
									signArea.height = $(sa).height();
									found = true;
									return false;
								}
							});
							if(!found) {
								var signArea = {
									id: $(sa).attr("data-id"),
									po: nfo.pages - 1,
									left: $(sa).offset().left + of.left - of0.left,// - m.eq(0).offset().left + bd.left,	// 2016.9.13 FIX, 自動職名章加蓋位置徧下問題
									top: $(sa).offset().top + of.top - of0.top,// - m.eq(0).offset().top + bd.top,			// 2016.9.13 FIX, 自動職名章加蓋位置徧下問題
									width: $(sa).width(),
									height: $(sa).height()
								};
								if(signArea.po > 0) {	// 2016.9.26 FIX, 第2頁以後的簽核框要把從斷頁的位置起算
									if(signArea.po < nfo.pages) {
										//signArea.top = $(sa).offset().top - nfo.breaks[signArea.po - 1] + of.top - of0.top;
										signArea.top = $(sa).offset().top - calcBreaks(signArea.po - 1) + of.top - of0.top;// 2016.12.28 fix for 第3頁後簽核框位置座標錯誤問題
									}
									else
										theLogger.error("簽核框所在頁次超過分頁數量!?");
								}
								nfo.signAreas.push(signArea);
							}
							
							// 2016.12.22 新增記錄簽核區域座標在DraftModel
							if(!("signAreas" in dm))
								dm.signAreas = new Array();
							found = false;
							$.each(dm.signAreas, function(i, signArea) {
								//if(signArea.id == $(sa).attr("data-id")) {	// 2017.2.17 不得已改用一隨機的ID屬性, 因為簽稿會核單的多個簽核區域data-id固定都是空字串
								if(signArea.psudoId == $(sa).attr("id")) {		// 會讓指定po跟上下寬高的程序錯亂
									signArea.po = nfo.pages - 1;
									signArea.left = $(sa).offset().left + of.left - of0.left;// - m.eq(0).offset().left + bd.left;
									//signArea.left = $(sa).position().left - $page.position().left;
									if(signArea.po > 0) {	// 2016.9.26 FIX, 第2頁以後的簽核框要把從斷頁的位置起算
										if(signArea.po < nfo.pages) {
											//signArea.top = $(sa).offset().top - nfo.breaks[signArea.po - 1] + of.top - of0.top;
											signArea.top = $(sa).offset().top - calcBreaks(signArea.po - 1) + of.top - of0.top;// 2017.1.13 fix for 第3頁後簽核框位置座標錯誤問題
											theLogger.warn("簽核區域(@Page" + signArea.po + ")top: sa.top(" + $(sa).offset().top + ") - break[" + (signArea.po - 1) + "](" + calcBreaks(signArea.po - 1) + ") + body.top(" + of.top + ") - pg.top(" + of0.top + ") = " + signArea.top);
										}
										else {
											theLogger.error("簽核框所在頁次超過分頁數量!?");
											signArea.top = $(sa).offset().top + of.top - of0.top;
										}
									}
									else {
										signArea.top = $(sa).offset().top + of.top - of0.top;// - m.eq(0).offset().top + bd.top;	// 2016.9.13 FIX, 自動職名章加蓋位置徧下問題
										theLogger.warn("簽核區域(@Page" + signArea.po + ")top: sa.top(" + $(sa).offset().top + ") + body.top(" + of.top + ") - pg.top(" + of0.top + ") = " + signArea.top);
									}
									//signArea.top = $(sa).position().top - $page.position().top;
									signArea.width = $(sa).width();
									signArea.height = $(sa).height();
									found = true;
									return false;
								}
							});
							if(!found) {
								var signArea = {
									saType: $(sa).attr("data-satype"),	// 2016.12.22 新增saType
									id: $(sa).attr("data-id"),
									psudoId: $(sa).attr("id"),			// 2017.2.17 新增psudoId
									po: nfo.pages - 1,
									left: $(sa).offset().left + of.left - of0.left,// - m.eq(0).offset().left + bd.left,	// 2016.9.13 FIX, 自動職名章加蓋位置徧下問題
									top: $(sa).offset().top + of.top - of0.top,// - m.eq(0).offset().top + bd.top,			// 2016.9.13 FIX, 自動職名章加蓋位置徧下問題
									width: $(sa).width(),
									height: $(sa).height()
								};
								if(signArea.po > 0) {	// 2016.9.26 FIX, 第2頁以後的簽核框要把從斷頁的位置起算
									if(signArea.po < nfo.pages) {
										//signArea.top = $(sa).offset().top - nfo.breaks[signArea.po - 1] + of.top - of0.top;
										signArea.top = $(sa).offset().top - calcBreaks(signArea.po - 1) + of.top - of0.top;// 2017.1.13 fix for 第3頁後簽核框位置座標錯誤問題
										theLogger.warn("簽核區域(@Page" + signArea.po + ")top: sa.top(" + $(sa).offset().top + ") - break[" + (signArea.po - 1) + "](" + calcBreaks(signArea.po - 1) + ") + body.top(" + of.top + ") - pg.top(" + of0.top + ") = " + signArea.top);
									}
									else {
										theLogger.error("簽核框所在頁次超過分頁數量!?");
									}
								}
								else
									theLogger.warn("簽核區域(@Page" + signArea.po + ")top: sa.top(" + $(sa).offset().top + ") + body.top(" + of.top + ") - pg.top(" + of0.top + ") = " + signArea.top);
								dm.signAreas.push(signArea);
							}
						//}
					});
				}
			});
			if(!ok)
				return;	// 需retry重新執行doPaging(), 故不需以dfd回傳
			// 1130123 Raymond 1120887 新增判斷ti是否存在
			if(!!nfo.ti)
			nfo.ti.find(".ui-li-count").text(nfo.pages);    // 更新頁籤的頁數資訊
			
			// 1140618 Raymond 1140166 修正DocCompare.html環境下不會有dm
			// 1100323 Raymond 1090857 新增分頁完同時將總頁數記錄在DraftMgmt.xml
			//dm.setLayoutedPages(nfo.pages);
			dm?.setLayoutedPages(nfo.pages);
			
			// 1120816 Raymond 1120503 新增判斷自訂表格是否超出單頁高度
			var warnOverflowElem = undefined;
			if(po >= 0 && po < nfo.pages) {
			//    $body.find("> div").css({marginTop: "-" + nfo.breaks[po] + "px"});
				var firstOfThisPage = true, firstOfNextPage = true;
				$flow.children().each(function(idx, elm) {
					//var fromPo = $(elm).attr("data-from");	// 2015.7.22
					//var fromPos = $(elm).attr("data-frompos");
					$(elm).attr("data-po", elmPo[idx])	// for debug
						.attr("data-from", elmFrom[idx])
						.attr("data-frompos", elmFromPos[idx]);
					if(elmPo[idx] != po) {    // 隱藏非指定頁次的物件
						if(elmFrom[idx] != undefined && elmFrom[idx] == po) {	// 上半部顯示
							var brkPos = nfo.breaks[po];
							theLogger.debug("break pos: " + brkPos);
							//alert("po:" + po + ",brk:" + brkPos);
							$(elm).show();	// 2015.11.12 backspace時原本是hide, 要改回show
							//$body.css({height: Math.floor(nfo.breaks[po] - 4) + "px", overflowY: "hidden"});	// 調整$body高度來遮住下半部
							$body.css({height: Math.floor(nfo.breaks[po]) + "px", overflowY: "hidden"});	// 調整$body高度來遮住下半部
							$body.get(0).scrollTop = 0;
						}
						else if(elmFrom[idx] != undefined && elmFrom[idx] < po && elmPo[idx] > po) {	// 2016.12.7 跨2頁以上的條列
							var cpOffset = elmFromPos[idx];
							for(var cp=elmFrom[idx]; cp<po; cp++) {
								cpOffset -= nfo.breaks[cp];
							}
							theLogger.warn("調整" + elm.tagName + "之marginTop為" + Math.floor(cpOffset) + "px");
							$(elm).attr("data-origmgntop", $(elm).css("margin-top"));	// 記錄調整前的margin-top
							$(elm).css("margin-top", Math.floor(cpOffset) + "px");
							// 1060608 Raymond 1060474 跨2頁以上的條列高度要設, 不然應該顯示在次頁的行會顯示成切一半
							$body.css({height: Math.floor(nfo.breaks[po]) + "px", overflowY: "hidden"});
						}
						else {
							$(elm).hide();
							if(elmPo[idx] == (po + 1) && firstOfNextPage) {
								//$body.css({height: Math.floor(nfo.breaks[po]) + "px", overflowY: "hidden"});	// 調整$body高度回原值?
								firstOfNextPage = false;
							}
						}
					}
					else {
						$(elm).show();	// 2015.11.12 頁次相同即show
						// 1120816 Raymond 1120503 新增判斷自訂表格是否超出單頁高度
						if($(elm).find(".custom-table").length && $(elm).find(".custom-table").height() > $testbody.height()) {
							theLogger.warn("自訂表格(ID:" + $(elm).find(".custom-table").attr("id") + ")高度超過單頁內文容許高度, 請減少此表格高度或拆成兩個表格");
							warnOverflowElem = elm;
						}
						if(firstOfThisPage) {
							$body.height($body.attr("data-height"));	// 2015.11.30 每頁第1個欄位重設$body高度
							if(elmFrom[idx] != undefined && elmFrom[idx] != po) {
								if(po > 0) {
									if(elmFrom[idx] == po - 1) {
										//alert("po:" + po + ",fromPos:" + fromPos + ",brk:" + nfo.breaks[po-1]);
										theLogger.warn("調整" + elm.tagName + "之marginTop為" + Math.floor(elmFromPos[idx] - nfo.breaks[po-1]) + "px");
										$(elm).attr("data-origmgntop", $(elm).css("margin-top"));	// 記錄調整前的margin-top
										//$(elm).css("margin-top", Math.floor(elmFromPos[idx] - nfo.breaks[po-1]) + "px");
										// 2015.11.30 次頁調整marginTop要抱括PC會把首行畫在去除行高的高度差的位置, 固定在次頁啟始Y位置, 故行動版要再扣去行高的高度差的一半
										// iPad上的$.css("line-height")及$.css("font-size")會回傳px高度資訊, 不是原本的倍數及pt
										$(elm).css("margin-top", Math.floor(elmFromPos[idx] - nfo.breaks[po-1]) + "px");
									}
									else if(elmFrom[idx] < po - 1) {	// 2016.12.7 條列頭在前2頁以上
										var cpOffset = elmFromPos[idx];
										for(var cp=elmFrom[idx]; cp<po; cp++) {
											cpOffset -= nfo.breaks[cp];
										}
										theLogger.warn("調整" + elm.tagName + "之marginTop為" + Math.floor(cpOffset) + "px");
										$(elm).attr("data-origmgntop", $(elm).css("margin-top"));	// 記錄調整前的margin-top
										$(elm).css("margin-top", Math.floor(cpOffset) + "px");
									}
									else
										theLogger.error("elmFromPos[" + idx + "]類型有問題!");
								}
							}
//							else
//								$(elm).css("margin-top", "-3px");
							firstOfThisPage = false;
						}
						
						/* 2017.1.13 移至1st-pass控制顯示第1頁分頁後show-in-page=2的物件顯示問題
						// 2016.10.13 修正FDA的案由第一頁不顯示(show-in-page=2)問題
						var $sip = $(elm).find("[data-showinpage=2]");
						if($sip.length > 0 && po > 0)
							$sip.show();*/
					}
				});
				
				$page.find(".all-pages").each(function(idx, elm) {   // 帶入總頁數
					// 1120712 Raymond 標檢局序117 阿拉伯數字格式的頁碼由全形數字修正為半形數字
					//$(elm).text(Util.translateNumber(nfo.pages, $(elm).attr("data-format") == "arabic"));
					if($(elm).attr("data-format") == "arabic")
						$(elm).text(nfo.pages);
					else
						$(elm).text(Util.translateNumber(nfo.pages, false));
				});
				$page.find(".page-no").each(function(idx, elm) {     // 帶入頁次
					// 1120712 Raymond 標檢局序117 阿拉伯數字格式的頁碼由全形數字修正為半形數字
					//$(elm).text(Util.translateNumber(po + 1, $(elm).attr("data-format") == "arabic"));
					if($(elm).attr("data-format") == "arabic")
						$(elm).text(po + 1);
					else
						$(elm).text(Util.translateNumber(po + 1, false));
				});
			
				if(!bKeep)
					$testbody.remove();
				
				// 1100326 Raymond 1090927 修正iPad下開啟附件子視窗, 關閉後重新整理頁面會重複累積增加這個dummyElem導致發文機關全銜往下位移的問題
				// 1090922 Raymond 1090694 修正iPad下點擊簽核框, 頁面上第1個可視元素若為可編輯狀態, iPad會將focus設在該元素, 導致軟體鍵盤浮上來的問題
				// 猜測此行為是iPad為了解決大手指點不準的問題而設計的, 可能因為簽核框是absolute position的關係, 但又不會focus到上邊界div下的年度號等可編輯欄位, 誤判成flow下第一個元素是最接近的元素的邏輯無法理解
				//if(isMobile)
				//	$("<span style='display:block;margin-top:-1em;'>&#8203;</span>").insertBefore($flow.children().eq(0));	// 因iPad會誤判flow下第1個可視元素為最接近簽核框內點擊位置的元素, 故插入一個可視的無寬度空白span, 且因此span為不可編輯, 故不會浮上軟體鍵盤
				if(isMobile && $flow.children().length > 0 && ($flow.children().get(0).tagName != "SPAN" || !$flow.children().eq(0).hasClass("dummyElem")))
					$("<span class='dummyElem' style='display:block;margin-top:-1.3em;'>&#8203;</span>").insertBefore($flow.children().eq(0));	// 因iPad會誤判flow下第1個可視元素為最接近簽核框內點擊位置的元素, 故插入一個可視的無寬度空白span, 且因此span為不可編輯, 故不會浮上軟體鍵盤
				
				theLogger.debug("nfo=");
				theLogger.debug(nfo);
				// 1120816 Raymond 1120503 新增超出單頁高度的自訂表格
				//dfd.resolve();
				dfd.resolve(warnOverflowElem);
			}
			else {
				// 2015.11.18 else也要remove $testbody
				if(!bKeep)
					$testbody.remove();
				dfd.reject("指定頁次(" + po + ")超出範圍(總頁數:" + nfo.pages + ")");
			}
		};	// end of doPaging()
		
		// 2015.11.3 - Raymond, 新增判斷iOS 9以上不用timeout
		if(navigator.userAgent.search(/([0-9.]+) Mobile/gi) >= 0 && Number(RegExp.$1) < 9.0)	// 2016.11.15 bugfix
			setTimeout(doPaging, 0);
		else
			doPaging();
		
		return dfd.promise();   // 2013.10.17 - Raymond, 因翻頁問題改用Deferred延遲方式
	}
	
	// 1101105 Raymond 1101199 修正Chrome V94、95版列印預覽時有些標楷體字型會破字的問題, 產生列印內容時傳入useCNSFont參數若為true, 則在Para.instanciateSO時在font-family CSS style加入"全字庫正楷體"
	// 2016.7.26 列印分頁
	//function PagingP($ctx, fo, opts, $pages) {
	function PagingP($ctx, fo, opts, $pages, useCNSFont) {
		var dfd = $.Deferred();
		var nfo = {pages: 1, breaks: [0]};
		
		function getEffHeight() {
			if(nfo.pages == 1 && ("firstPageTop" in fo.pageMargin || "firstPageBottom" in fo.pageMargin)) {
				var eh = (fo.pageHeight - (fo.pageMargin.firstPageTop || fo.pageMargin.top) - (fo.pageMargin.firstPageBottom || fo.pageMargin.bottom)) + fo.unit;
				return eh;
			}
			var eh = (fo.pageHeight - fo.pageMargin.top - fo.pageMargin.bottom) + fo.unit;
			return eh;
		}
		
		function addNewPage(po, deferreds) {
			// 1100408 Raymond 1100308 Chrome也改成與IE一樣overflow:hidden, 以避免用右鍵列印功能時, 行末應折行處的字元若是「全形空白」, 預覽分頁沒出現水平scrollbar但瀏覽器的列印預覽子視窗會出現水平scrollbar的問題
			//if(navigator.userAgent.indexOf("Trident") >= 0)	// 1060920 Raymond 1060836 IE修正flow的overflow-y改成overflow, 以免跑出水平scrollbar
				var $pg = $("<div class='pg'><div name='topRegion'></div><div name='leftRegion'></div><div name='bodyRegion'><div name='flow' style='overflow:hidden'></div></div><div name='rightRegion'></div><div name='bottomRegion'></div><div name='topRegion1stP' style='position:absolute'></div><div name='bottomRegion1stP' style='position:absolute'></div></div>").appendTo($pages);
			//else
			//	var $pg = $("<div class='pg'><div name='topRegion'></div><div name='leftRegion'></div><div name='bodyRegion'><div name='flow' style='overflow-y:hidden'></div></div><div name='rightRegion'></div><div name='bottomRegion'></div><div name='topRegion1stP' style='position:absolute'></div><div name='bottomRegion1stP' style='position:absolute'></div></div>").appendTo($pages);
			$pg.css({
				width: fo.pageWidth + fo.unit,
				height: fo.pageHeight + fo.unit
			});
			var $regions = $pg.find("> div");
			// 上邊界
			$regions.eq(0).css({
				display: "block",
				width: "100%",
				height: fo.pageMargin.top + fo.unit,
				position: "relative"		// 2016.12.27 fix for static物件是absolute, 次頁以後位置會不正確
			});
			// 左邊界
			$regions.eq(1).css({
				position: "absolute",
				top: fo.pageMargin.top + fo.unit,
				width: fo.pageMargin.left + fo.unit,
				height: (fo.pageHeight - fo.pageMargin.top - fo.pageMargin.bottom) + fo.unit
			});
			// 中間
			$regions.eq(2).css({
				display: "inline-block",
				marginLeft: fo.pageMargin.left + fo.unit,
				width: (fo.pageWidth - fo.pageMargin.left - fo.pageMargin.right) + fo.unit,
				height: (fo.pageHeight - fo.pageMargin.top - fo.pageMargin.bottom) + fo.unit,
				overflowY: "hidden"		// 2015.9.30 恢復新增
			})
			.attr("data-width", (fo.pageWidth - fo.pageMargin.left - fo.pageMargin.right) + fo.unit)	// 2015.11.12 add exta attributes
			.attr("data-height", (fo.pageHeight - fo.pageMargin.top - fo.pageMargin.bottom) + fo.unit);
			// 1111026 Raymond 陸委會序347 修正Chrome/Edge下某些案例的條列文字在瀏覽器的列印預覽介面中比列印分頁提前一個字斷行的問題(陸委會序332修正後的衍生問題)
			if(navigator.userAgent.indexOf("Chrome") >= 0)
				$regions.eq(2).css("width", "calc(" + (fo.pageWidth - fo.pageMargin.left - fo.pageMargin.right) + fo.unit + " + 1px)");
			// 右邊界
			$regions.eq(3).css({
				position: "absolute",
				top: fo.pageMargin.top + fo.unit,
				right: 0,
				/*backgroundColor: "#eef",*/
				width: (fo.pageMargin.right - 1) + fo.unit,
				height: (fo.pageHeight - fo.pageMargin.top - fo.pageMargin.bottom) + fo.unit
			});
			// 下邊界
			$regions.eq(4).css({
				display: "block",
				width: "100%",
				height: fo.pageMargin.bottom + fo.unit,
				// 1100112 Raymond 1090735 修正一般下邊界在設有首頁下邊界而內文跨到第2頁, 導致bodyRegion高度縮減, 而發生頁碼等一般下邊界區物件往上跑的問題
				//position: "relative"		// 2016.12.27 fix for static物件是absolute, 次頁以後位置會不正確
				position: "absolute",
				top: (fo.pageHeight - fo.pageMargin.bottom) + fo.unit
			});
			
			// 2016.21.1 新增使用IE列印時邊界反推功能
			if(isIE && "printMarginForIE" in SSO_CONFIG && SSO_CONFIG.printMarginForIE > 0) {
				var pm = SSO_CONFIG.printMarginForIE;
				// 1091026 Raymond 1090735 修正使用IE列印反推時上邊界寬度加寬
				//$regions.eq(0).css({marginLeft: "-" + pm + "mm", marginTop: "-" + pm + "mm"});
				$regions.eq(0).css({marginLeft: "-" + pm + "mm", marginTop: "-" + pm + "mm", width: "calc(100% + " + pm + "mm)"});
				$regions.eq(1).css({marginLeft: "-" + pm + "mm", top: (Number(fo.pageMargin.top) - pm) + "mm"});
				$regions.eq(2).css({marginLeft: (Number(fo.pageMargin.left) - pm) + "mm"});
				$regions.eq(3).css({top: (Number(fo.pageMargin.top) - pm) + "mm", width: (Number(fo.pageMargin.right) - pm - 1) + "mm"});
				// 1091026 Raymond 1090735 修正使用IE列印反推時下邊界寬度加寬
				//$regions.eq(4).css({marginLeft: "-" + pm + "mm", height: (Number(fo.pageMargin.bottom) - pm) + "mm", marginTop: "-0.5mm"});	// 2016.12.30 恢復不要提高下邊界位置, 以免壓到內文最後一行字
				$regions.eq(4).css({marginLeft: "-" + pm + "mm", height: (Number(fo.pageMargin.bottom) - pm) + "mm", marginTop: "-0.5mm", width: "calc(100% + " + pm + "mm)"});	// 2016.12.30 恢復不要提高下邊界位置, 以免壓到內文最後一行字
				// 1100112 Raymond 1090735 修正使用IE列印反推時改為absolute的下邊界往上移
				$regions.eq(4).css({top: (fo.pageHeight - fo.pageMargin.bottom - pm) + fo.unit});
				
				$pg.css({width: (Number(fo.pageWidth) - (pm * 2)) + "mm", height: (Number(fo.pageHeight) - 3 - (pm * 2)) + "mm"});
			}
			
			// 1081216 Raymond 修正更新至Chrome 79版後, 設定無邊界列印時會發生文稿頁面後多產生一頁空白頁的問題, 猜測是誤判297mm超過可列印高度
			if((navigator.userAgent.match(/Chrome\/(\d+)\./) || navigator.userAgent.match(/Chromium\/(\d+)\./)) && parseInt(RegExp.$1) >= 79) {	// 判斷是否為Chrome/Chromium 79版以後(預期Google不會很快修)
				$pg.css("height", (Number(fo.pageHeight) - 1) + fo.unit);	// 頁面高度-1成296mm
				$regions.eq(4).css("height", (Number(fo.pageMargin.bottom) - 1) + fo.unit);	// 下邊界高度跟著-1mm
			}
			
			// 2015.5.20 支援首頁區分不同的邊界大小
			if(po == 0 && ("firstPageTop" in fo.pageMargin || "firstPageBottom" in fo.pageMargin)) {
				if("firstPageTop" in fo.pageMargin) {
					// 上邊界(1stP)
					// 1091026 Raymond 1090735 修正使用IE列印時首頁下邊界未反推問題
					if(isIE && "printMarginForIE" in SSO_CONFIG && SSO_CONFIG.printMarginForIE > 0) {
						var pm = SSO_CONFIG.printMarginForIE;
						$regions.eq(5).css({width: "calc(100% + " + pm + "mm)",
											top: "0px",
											height: fo.pageMargin.firstPageTop + fo.unit,
											marginLeft: "-" + pm + "mm",
											marginTop: "-" + pm + "mm"});
					}
					else
					$regions.eq(5).css({width: "100%",
										top: "0px",	// 2015.6.12 修正1邊界(1stP)位置錯誤問題
										height: fo.pageMargin.firstPageTop + fo.unit});
					// 2015.9.30 新增調整body上方空間
					if(fo.pageMargin.firstPageTop > fo.pageMargin.top) {
						theLogger.log("因樣版指定了首頁上邊界較大, 調整flow.body上方空間為" + (fo.pageMargin.firstPageTop - fo.pageMargin.top) + fo.unit + "及高度為" + (fo.pageHeight - fo.pageMargin.firstPageTop - fo.pageMargin.bottom) + fo.unit);
						$regions.eq(2).css({marginTop: (fo.pageMargin.firstPageTop - fo.pageMargin.top) + fo.unit,
											height: (fo.pageHeight - fo.pageMargin.firstPageTop - fo.pageMargin.bottom) + fo.unit});
					}
				}
				if("firstPageBottom" in fo.pageMargin) {
					// 下邊界(1stP)
					// 1091026 Raymond 1090735 修正使用IE列印時首頁下邊界未反推問題
					if(isIE && "printMarginForIE" in SSO_CONFIG && SSO_CONFIG.printMarginForIE > 0) {
						var pm = SSO_CONFIG.printMarginForIE;
						$regions.eq(6).css({width: "calc(100% + " + pm + "mm)",
											top: (fo.pageHeight - fo.pageMargin.firstPageBottom - pm) + fo.unit,
											height: (fo.pageMargin.firstPageBottom - pm) + fo.unit,
											marginLeft: "-" + pm + "mm"});
					}
					else
					$regions.eq(6).css({width: "100%",
										top: (fo.pageHeight - fo.pageMargin.firstPageBottom) + fo.unit,
										height: fo.pageMargin.firstPageBottom + fo.unit});
					/* 1091023 Raymond 1090735 修正樣版設了首頁下邊界後, 不要調整body高度, 以免一般下邊界的物件(ex.條碼)會跑上來的問題
					// 2015.9.30 新增調整body高度
					if(fo.pageMargin.firstPageBottom > fo.pageMargin.bottom) {
						if("firstPageTop" in fo.pageMargin && fo.pageMarin.firstPageTop > fo.pageMargin.top) {
							theLogger.log("因樣版指定了首頁上及下邊界較大, 調整flow.body高度為" + (fo.pageHeight - fo.pageMargin.firstPageTop - fo.pageMargin.firstPageBottom) + fo.unit);
							$regions.eq(2).css("height", (fo.pageHeight - fo.pageMargin.firstPageTop - fo.pageMargin.firstPageBottom) + fo.unit);
						}
						else {
							theLogger.log("因樣版指定了首頁下邊界較大, 調整flow.body高度為" + (fo.pageHeight - fo.pageMargin.firstPageBottom) + fo.unit);
							$regions.eq(2).css("height", (fo.pageHeight - fo.pageMargin.firstPageBottom) + fo.unit);
						}
					}*/
				}
			}
			// 新增頁面加入靜態物件
			for(var i=0; i<fo.statics.length; i++) {
				var rgn;
				switch(fo.statics[i].flowName) {
					case "xsl-region-before":
						if(fo.statics[i].onlyFirstPage)	// 2015.5.20 用新增的region5作為首頁獨立上邊界區域
							rgn = $("<div class='static' style='position: absolute; width: 100%'></div>").appendTo($regions.eq(5));
						else
							rgn = $("<div class='static' style='position: absolute; width: 100%'></div>").appendTo($regions.eq(0));
						break;
					case "xsl-region-after":
						if(fo.statics[i].onlyFirstPage)	// 2015.5.20 用新增的region6作為首頁獨立下邊界區域
							rgn = $("<div class='static' style='position: absolute; width: 100%'></div>").appendTo($regions.eq(6));
						else {
							if(isIE && "printMarginForIE" in SSO_CONFIG && SSO_CONFIG.printMarginForIE > 0)	// 2016.12.1 fix for IE列印反推邊界功能
								rgn = $("<div class='static' style='position: absolute; width: 210mm'></div>").appendTo($regions.eq(4));
							else
								rgn = $("<div class='static' style='position: absolute; width: 100%'></div>").appendTo($regions.eq(4));
						}
						break;
					case "xsl-region-start":
						rgn = $("<div class='static' style='position: relative'><div style='position: absolute; width: " + $regions.eq(1).css("height") + "' class='tb'></div></div>").appendTo($regions.eq(1)).children().eq(0);
						break;
					case "xsl-region-end":
						rgn = $("<div class='static' style='position: relative'><div style='position: absolute; width: " + $regions.eq(3).css("height") + "' class='tb'></div></div>").appendTo($regions.eq(3)).children().eq(0);
						break;
					default:
						theLogger.warn("邊界區static物件未設定正確的flowName: '" + fo.statics[i].flowName + "'");
						break;
				}
				for(var j=0; j<fo.statics[i].blocks.length; j++) {
					if((po == 0 && (Number(fo.statics[i].blocks[j].showInPage) & 1)) ||
					   (po > 0 && (Number(fo.statics[i].blocks[j].showInPage) & 6))) {
						// 1101105 Raymond 1101199 修正Chrome V94、95版列印預覽時有些標楷體字型會破字的問題, 產生列印內容時傳入useCNSFont參數若為true, 則在Para.instanciateSO時在font-family CSS style加入"全字庫正楷體"
						if(useCNSFont === true)
							fo.statics[i].blocks[j].instanciateSO(rgn, true, "useCNSFont");  // printMode參數改成"useCNSFont", 不必動目前巢狀傳遞參數, 也可維持目前if(printMode)或if(!printMode)的判斷方式可以繼續生效
						else
						fo.statics[i].blocks[j].instanciateSO(rgn, true, true);  // 2014.6.18 新增唯讀模式
						if("refreshDim" in fo.statics[i].blocks[j])	// 2016.4.19 新增重算分散對齊
							fo.statics[i].blocks[j].refreshDim();
					}
				}
				/* 2015.5.21 新增邊界區也有簽核區域
				if(rgn && rgn.find(".sign-area").length) {	// 2016.7.19 樣版可能未設好邊界區static的flowName, 導致無rgn
					var bd = $pg.position();
					rgn.find(".sign-area").each(function(idx, sa) {
						theLogger.debug(".sign-area: " + $(sa).attr("data-id") + "," + $(sa).position().left + "," + $(sa).position().top);
						if(!("signAreas" in nfo))
							nfo.signAreas = new Array();
						
						var found = false;
						$.each(nfo.signAreas, function(i, signArea) {
							if(signArea.id == $(sa).attr("data-id")) {
								signArea.po = nfo.pages - 1;
								signArea.left = $(sa).position().left - bd.left;
								signArea.top = $(sa).position().top - bd.top;
								signArea.width = $(sa).width();
								signArea.height = $(sa).height();
								found = true;
								return false;
							}
						});
						if(!found) {
							nfo.signAreas.push({
								id: $(sa).attr("data-id"),
								po: nfo.pages - 1,
								left: $(sa).position().left - bd.left,
								top: $(sa).position().top - bd.top,
								width: $(sa).width(),
								height: $(sa).height()
							});
						}
					});
				}*/
			}
			$pg.find(".all-pages").each(function(idx, elm) {   // 帶入總頁數
				// 1120712 Raymond 標檢局序117 阿拉伯數字格式的頁碼由全形數字修正為半形數字
				//$(elm).text(Util.translateNumber(nfo.pages, $(elm).attr("data-format") == "arabic"));
				if($(elm).attr("data-format") == "arabic")
					$(elm).text(nfo.pages);
				else
					$(elm).text(Util.translateNumber(nfo.pages, false));
			});
			$pg.find(".page-no").each(function(idx, elm) {     // 帶入頁次
				// 1120712 Raymond 標檢局序117 阿拉伯數字格式的頁碼由全形數字修正為半形數字
				//$(elm).text(Util.translateNumber(po + 1, $(elm).attr("data-format") == "arabic"));
				if($(elm).attr("data-format") == "arabic")
					$(elm).text(po + 1);
				else
					$(elm).text(Util.translateNumber(po + 1, false));
			});
			// 多頁須加蓋騎縫章
			if(nfo.pages > 1 && opts.printSealMark == true) {
				deferreds.push(thePublicRsrc.getSealMarkImage(theUserInfo.OrgID, theUserInfo.DepartID)	// 2016.7.27 新增deferreds記錄需等待完成工作
					.done(function(fil, size) {
						
						var docNo = theAOL.docObj.docNo;// nfo.docNo
						
						if(po > 0) {   // 非首頁加蓋左騎縫章
							// 1110613 Raymond 1110271 新增類別名稱以供識別
							//var $sm = $("<div style='position: absolute'><img/><span style='position:absolute; top:0; left:0;'></span></div>").appendTo($pg);
							var $sm = $("<div class='leftSealMark' style='position: absolute'><img/><span style='position:absolute; top:0; left:0;'></span></div>").appendTo($pg);
							$sm.find("img").attr("src", fil);
							
							// 2015.9.11 新增亂數seed
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
						if(po < (nfo.pages - 1)) {    // 非末頁加蓋右騎縫章
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
					}));
			}
			return $pg;
		}
		
		function doPaging() {
			
			theLogger.log("開始分頁...");
			var eh = getEffHeight();    // 有效page body高度, 2015.7.22
			theLogger.log("\t有效page body height: " + eh);
			var of = $ctx.offset();
			theLogger.log("\tbody offset: " + of.left + ", " + of.top);
			var sy = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;	// 2016.8.29 FIX, IE11沒有window.scrollY
			theLogger.warn("\tscrollY: " + sy);
			
			var rng = document.createRange(),
				ok = true,		// getBoundingClientRect無效時, 須retry
				offTop = 0,		// 斷頁點
				elmPo = [],		// 記錄每個element的頁次,
				elmFrom = [],	// 記錄每個element的起始頁次,
				elmFromPos = [],// 記錄每個element的起始頁次位置,
				elmBrc = [],
				//lineSpace = [],  2016.1.20 用line-height減font-size再除以2計算得到的行間間距並不準確
				lineHeight = [];// 2016.1.20 line-height比較可靠
			var brcs = [],
				bKeep = false;	// for debug
			// 2015.11.10 改用背景div先算好分頁點, 再回調$flow
			var $testbody = $("body #testbody");	// 2017.3.8 bugfix
			if($testbody.length == 0)
				$testbody = $("<div id='testbody' style='z-index:1000; width:" + $ctx.prop("style").width + "; height:" + eh + "; position:absolute; left:0px; top:0px; transparency:0.1'></div>").appendTo("body");	// 2016.9.12 FIX, 從#aol改成body
			eh = $testbody.height();
			theLogger.log("P#" + nfo.pages + "有效eh = " + eh);	// 1091023 Raymond 1090735 加註頁數
			var $sip = $ctx.find("[data-showinpage=2]");	// 2016.10.13 修正FDA的案由第一頁不顯示(show-in-page=2)問題
			$sip.hide();
			$testbody.append($ctx.clone(true));	// 1st-pass用clone的
			// 2017.1.13 改成2-pass, 因為案由第一頁不顯示要先判定完才能
			var bReload = false;	// 改過show()要再重新clone過才有效?
			$testbody.find("> div").children().each(function(idx, elm) {
				rng.selectNodeContents(elm);	// 2015.8.7 FireFox選node只會有一個最外面的ClientRect, 不會有children的ClientRect
				var brc = rng.getBoundingClientRect();
				// 1120829 Raymond 標檢局序121 修正無任何子節點的DIV, 用selectNodeContents()會得到一個大小為0, 位置為0的ClientRect, 改用selectNode取代
				if(!!brc && brc.left == 0 && brc.top == 0 && brc.width == 0 && brc.height == 0 && elm.childNodes.length == 0) {
					rng.selectNode(elm);
					brc = rng.getBoundingClientRect();
				}
				if(brc == null) {	// 2015.9.10 新增例外排除
					theLogger.error("<" + elm.tagName + ">.boundingClientRect=null('" + elm.outerHTML + "'), 1秒後重試!!");
					ok = false;
					setTimeout(doPaging, 1000);	// 2015.11.10 retry
					return false;	// break each-loop
				}
				var brcBottom = brc.bottom, brcTop = brc.top;
				console.debug("%c#" + idx + "<" + elm.tagName + "> brc:" + brcTop + "-" + brcBottom + ", offset:" + $(elm).offset().top + ", height:" + $(elm).height() + ", outerHeight:" + $(elm).outerHeight(true), "background-color:cyan");	// 1101224 Raymond 1101541 for debug
				if(elm.tagName == "TABLE") {
					// 1090408 Raymond 1090254 修正由於offset()是不包含margin的座標, 而getBoundingClientRect()回的也是不包含margin的座標, 若table設定了margin-top, 會使brcTop較原本認定真實的元素上方座標值大, 若此table為次頁第一個物件將會造成記錄的斷頁點也變大, 但實際上元素顯示在次頁是包含margin-top的, 斷頁點應記錄在減去此table的margin-top的座標
					var mgnTop = parseFloat($(elm).css("margin-top"));
					if(mgnTop > 0) {
						theLogger.warn("此TABLE設定了margin-top('" + elm.style.marginTop + "'=" + $(elm).css("margin-top") + "), 應擴大矩形範圍");
						brcTop -= mgnTop;
						brcBottom = brcTop + $(elm).outerHeight(true);	// outerHeight()傳入參數true會回傳包含margin的高度
					}
					
					if(navigator.userAgent.indexOf("Trident") >= 0) {
						var emptyRowHeight = 0;	// 2016.11.23 統計第一行文字出現前空行的累計高度
						var n = $(elm).find("tr").length;
						for(var i=0; i<n; i++) {
							var txt = $(elm).find("tr").eq(i).text();
							if(txt.length) {	// 即使是用全形空白去撐出Row的高度, IE似乎也不會讀到一個全形空白字串
								theLogger.log("表格第" + i + "列出現第一行文字'" + txt + "'");
								break;
							}
							else {
								emptyRowHeight += $(elm).find("tr").eq(i).height();
								theLogger.log("表格第" + i + "列高度為 " + $(elm).find("tr").eq(i).height() + ", 累計第一行文字前已有空行高度 " + emptyRowHeight);
							}
						}
						// 1090408 Raymond 1090254 height()改為outerHeight(true), 取包含margin的完整高度
						//theLogger.warn("brcBottom: " + brcBottom + "->" + (brcTop + $(elm).height() - emptyRowHeight));
						//brcBottom = brcTop + $(elm).height() - emptyRowHeight;	// 2016.10.31 IE計算的brc只有文字的部分, 用$.height()修正回來
																				// 2016.11.23 表格中第一行出現文字可能不在第1個Row, 這會導致表格高度被誤判為較實際大的數值而提前跳頁,
																				// 修改為扣掉前面統計的空行高度
						theLogger.warn("brcBottom: " + brcBottom + "->" + (brcTop + $(elm).outerHeight(true) - emptyRowHeight));
						brcBottom = brcTop + $(elm).outerHeight(true) - emptyRowHeight;
						theLogger.warn("brcTop: " + brcTop + "->" + (brcTop - emptyRowHeight));
						brcTop = brcTop - emptyRowHeight;						// 2017.2.7 brcTop也需要修正, 因為若此表格為斷頁後第1個物件, 則斷頁點會設成此物件的top, 若斷頁點未修正而徧下的話會導致簽核區域座標小於原本位置而使簽核物件徧下約一行顯示
					}
				}
				else {	// 2015.11.30 行高2.0情況下, getBoundingRect只會抓到去除周圍空白的整體區塊位置資訊, 判斷斷頁點會產生誤差
					// 1101224 Raymond 1101541 IE跟Chrome的offset().top都會有誤差小數點, 改成四捨五入整數
					//theLogger.warn("brcTop: " + brcTop + "->" + Math.ceil($(elm).offset().top));
					//brcTop = Math.ceil($(elm).offset().top);
					//theLogger.warn("brcBottom: " + brcBottom + "->" + (brcTop + $(elm).height()));
					brcTop = Math.round($(elm).offset().top);
					brcBottom = brcTop + $(elm).height();
					if((navigator.userAgent.match(/Chrome\/(\d+)\./) || navigator.userAgent.match(/Chromium\/(\d+)\./)) && parseInt(RegExp.$1) >= 96)
						brcBottom = brcTop + Math.round($(elm).height());
					theLogger.debug("brc[" + idx + "]=" + brcTop + "-" + brcBottom);
				}
				// 2016.12.6 新增支援斷頁指令
				if(elm.tagName == "DIV" && $(elm).hasClass("page-break")) {
					theLogger.warn("指令斷頁...brcBottom=" + brcBottom + ", break on " + (brcBottom + sy - offTop));
					var $sip = $ctx.children().eq(idx).find("[data-showinpage=2]");	// 修正FDA的案由第一頁不顯示(show-in-page=2)問題
					$sip.show();
					$sip = $ctx.children().eq(idx).nextAll().find("[data-showinpage=2]");
					$sip.show();
					bReload = true;
					return false;	// 只要分出第1頁就好
				}
				else if((brcBottom + sy - offTop) > eh) {
					if(elm.tagName == "TABLE" /* && $(elm).data("keep-together")*/) { // 2015.3.16 - 修正表格為不跨頁
						theLogger.log("表格斷頁...brcBottom=" + brcBottom + ", break on " + (brcTop + sy - offTop));
						var $sip = $ctx.children().eq(idx).find("[data-showinpage=2]");	// 2016.10.13 修正FDA的案由第一頁不顯示(show-in-page=2)問題
						$sip.show();
						$sip = $ctx.children().eq(idx).nextAll().find("[data-showinpage=2]");
						$sip.show();
					}
					else {
						theLogger.log("一般段落跨頁時段落本身不支援show-in-page設定");
						var $sip = $ctx.children().eq(idx).nextAll().find("[data-showinpage=2]");
						$sip.show();
					}
					bReload = true;
					return false;	// 只要分出第1頁就好
				}
			});
			if(!ok)
				return;	// 需retry重新執行doPaging(), 故不需以dfd回傳
			if(bReload)
				$testbody.empty().append($ctx);
			else	// 2017.2.8 不需重載的話, 要刪掉暫時的flow物件, 以免留在畫面上影響點擊功能
				$ctx.remove();
			// end of 1st-pass
			$testbody.find("> div").children().each(function(idx, elm) {
				theLogger.debug("#" + idx + " - rng.selectNodeContents(" + elm.tagName + ")'" + (($(elm).text().length > 8)?$(elm).text().substr(0, 8) + "...'":$(elm).text() + "'"));	// 1100825 Raymond 1100925 再修改log資訊
				rng.selectNodeContents(elm);	// 2015.8.7 FireFox選node只會有一個最外面的ClientRect, 不會有children的ClientRect
												// 改為選nodeContents後, Chrome的getClientRects的第0個就不是最外圍的ClientRect了
				var brc = rng.getBoundingClientRect();
				// 1100827 Raymond 1100925 修正無任何子節點的DIV, 用selectNodeContents()會得到一個大小為0, 位置為0的ClientRect, 改用selectNode取代
				if(!!brc && brc.left == 0 && brc.top == 0 && brc.width == 0 && brc.height == 0 && elm.childNodes.length == 0) {
					rng.selectNode(elm);
					brc = rng.getBoundingClientRect();
				}
				if(brc == null) {	// 2015.9.10 新增例外排除
					theLogger.error("<" + elm.tagName + ">.boundingClientRect=null('" + elm.outerHTML + "'), 1秒後重試!!");
					ok = false;
					setTimeout(doPaging, 1000);	// 2015.11.10 retry
					return false;	// break each-loop
				}
				else {
					elm.removeAttribute("data-from");	// reset
					elm.removeAttribute("data-frompos");
					$(elm).attr("data-boundingcrc", Math.floor(brc.left) + "," + Math.floor(brc.top) + "," + Math.floor(brc.right - brc.left) + "," + Math.floor(brc.bottom - brc.top));
					$(elm).attr("data-offsety", $(elm).offset().top);
					$(elm).attr("data-height", $(elm).height());
					
					/*theLogger.warn("getBoundingClientRect(" + idx + ") = t:" + brc.top + " b:" + brc.bottom + " l:" + brc.left + " r:" + brc.right);
					brcs[idx] = {top: brc.top, bottom: brc.bottom, left: brc.left, right: brc.right};
					if(idx > 0 && brc.top < brcs[idx-1].bottom) {
						theLogger.error("\t與前element重疊!!");
						bKeep = true;
					}*/
				}
				// 1101224 Raymond 1101541 修改Log資訊
				//theLogger.debug("<" + elm.tagName + ">.top~bottom:" + Math.floor(brc.top) + "~" + Math.floor(brc.bottom) + "(" + Math.floor(brc.bottom - brc.top) + ")    of.top=" + Math.floor(of.top) + "    brc.bottom-of.top=" + Math.floor(brc.bottom - of.top));
				theLogger.debug("<" + elm.tagName + ">.top~bottom:" + brc.top + "~" + brc.bottom + "(" + (brc.bottom - brc.top) + ")    of.top=" + of.top + "    brc.bottom-of.top=" + (brc.bottom - of.top));
				// 2015.10.1 TABLE改用getClientRects()的第1個rc作為getBoundingClientRect()的上、下位置資訊
				var brcBottom = brc.bottom, brcTop = brc.top;
				if(elm.tagName == "TABLE") {
					/* 2016.8.29 Chrome跟IE的brc應該是正確的, 雖然2者不一致
					var rcs = rng.getClientRects();
					if(rcs.length == 0) {
						// 判斷表格內有無文字
						var tx = $(elm).text();
						if(tx.length > 0) {
							theLogger.error("TABLE.getClientRects = 0, 0.01秒後重試!!");
							ok = false;
							setTimeout(doPaging, 10);	// 2016.4.15 retry
							return false;	// break each-loop
						}
					}
					//else
					//	$(elm).attr("crc", "(1/" + rcs.length + "):" + rcs[0].left + "," + rcs[0].top + "," + (rcs[0].right - rcs[0].left) + "," + (rcs[0].bottom - rcs[0].top));
					for(var i=0; i<rcs.length; i++) {
						if(i == 0) {
							theLogger.debug("\t->" + rcs[i].left + "," + rcs[i].top + "," + rcs[i].right + "," + rcs[i].bottom + "(" + (rcs[i].bottom - rcs[i].top) + ")    brcBottom-of.top=" + Math.floor(rcs[i].bottom - of.top));
							brcBottom = rcs[i].bottom;
							brcTop = rcs[i].top;
						}
						else {
							theLogger.debug("\t  " + rcs[i].left + "," + rcs[i].top + "," + rcs[i].right + "," + rcs[i].bottom);
						}
					}*/
					// 1090408 Raymond 1090254 修正由於offset()是不包含margin的座標, 而getBoundingClientRect()回的也是不包含margin的座標, 若table設定了margin-top, 會使brcTop較原本認定真實的元素上方座標值大, 若此table為次頁第一個物件將會造成記錄的斷頁點也變大, 但實際上元素顯示在次頁是包含margin-top的, 斷頁點應記錄在減去此table的margin-top的座標
					var mgnTop = parseFloat($(elm).css("margin-top"));
					if(mgnTop > 0) {
						theLogger.warn("此TABLE設定了margin-top('" + elm.style.marginTop + "'=" + $(elm).css("margin-top") + "), 應擴大矩形範圍");
						brcTop -= mgnTop;
						brcBottom = brcTop + $(elm).outerHeight(true);	// outerHeight()傳入參數true會回傳包含margin的高度
						$(elm).attr("data-offsety", brcTop);			// 更新data屬性
						$(elm).attr("data-height", $(elm).outerHeight(true));// 更新data屬性
					}
					
					if(navigator.userAgent.indexOf("Trident") >= 0) {
						var emptyRowHeight = 0;	// 2016.11.23 統計第一行文字出現前空行的累計高度
						var n = $(elm).find("tr").length;
						for(var i=0; i<n; i++) {
							var txt = $(elm).find("tr").eq(i).text();
							if(txt.length) {	// 即使是用全形空白去撐出Row的高度, IE似乎也不會讀到一個全形空白字串
								theLogger.log("表格第" + i + "列出現第一行文字'" + txt + "'");
								break;
							}
							else {
								emptyRowHeight += $(elm).find("tr").eq(i).height();
								theLogger.log("表格第" + i + "列高度為 " + $(elm).find("tr").eq(i).height() + ", 累計第一行文字前已有空行高度 " + emptyRowHeight);
							}
						}
						// 1090408 Raymond 1090254 height()改為outerHeight(true), 取包含margin的完整高度
						//theLogger.warn("brcBottom: " + brcBottom + "->" + (brcTop + $(elm).height() - emptyRowHeight));
						//brcBottom = brcTop + $(elm).height() - emptyRowHeight;	// 2016.10.31 IE計算的brc只有文字的部分, 用$.height()修正回來
																				// 2016.11.23 表格中第一行出現文字可能不在第1個Row, 這會導致表格高度被誤判為較實際大的數值而提前跳頁,
																				// 修改為扣掉前面統計的空行高度
						theLogger.warn("brcBottom: " + brcBottom + "->" + (brcTop + $(elm).outerHeight(true) - emptyRowHeight));
						brcBottom = brcTop + $(elm).outerHeight(true) - emptyRowHeight;
						theLogger.warn("brcTop: " + brcTop + "->" + (brcTop - emptyRowHeight));
						brcTop = brcTop - emptyRowHeight;						// 2017.2.7 brcTop也需要修正, 因為若此表格為斷頁後第1個物件, 則斷頁點會設成此物件的top, 若斷頁點未修正而徧下的話會導致簽核區域座標小於原本位置而使簽核物件徧下約一行顯示
					}
					elmBrc[idx] = {top: brcTop, bottom: brcBottom};
				}
				else {	// 2015.11.30 行高2.0情況下, getBoundingRect只會抓到去除周圍空白的整體區塊位置資訊, 判斷斷頁點會產生誤差
					// 1101224 Raymond 1101541 IE跟Chrome的offset().top都會有誤差小數點, 改成四捨五入整數
					// 1100825 Raymond 1100925 目前版本的Chrome(91)的offset()也回傳小數點了
					// 1070914 Raymond 1070729 IE的offset().top會是小數點, 用Math.floor()會比較接近Chrome的offset().top
					//theLogger.warn("brcTop: " + brcTop + "->" + Math.ceil($(elm).offset().top));
					//brcTop = Math.ceil($(elm).offset().top);
					//theLogger.warn("brcBottom: " + brcBottom + "->" + (brcTop + $(elm).height()));
					//brcTop = Math.floor($(elm).offset().top);
					//brcTop = $(elm).offset().top;
					if((navigator.userAgent.match(/Chrome\/(\d+)\./) || navigator.userAgent.match(/Chromium\/(\d+)\./)) && parseInt(RegExp.$1) >= 96)
						theLogger.warn("brcTop: " + brcTop + "->" + Math.round($(elm).offset().top) + ", brcBottom: " + brcBottom + "->" + (Math.round($(elm).offset().top) + Math.round($(elm).height())));
					else
						theLogger.warn("brcTop: " + brcTop + "->" + Math.round($(elm).offset().top) + ", brcBottom: " + brcBottom + "->" + (Math.round($(elm).offset().top) + $(elm).height()));
					brcTop = Math.round($(elm).offset().top);
					brcBottom = brcTop + $(elm).height();
					theLogger.debug("brc[" + idx + "]=" + brcTop + "-" + brcBottom);
					elmBrc[idx] = {top: brcTop, bottom: brcBottom};
					// 1070914 Raymond 1070729 Chrome回傳brc下邊界與計算修正後的下邊界的距離就是行高造成的空白高度
					if(navigator.userAgent.indexOf("Chrome") >= 0) {
						// 1100825 Raymond 1100925 修正Chrome下, 行高若為奇數, brc.top距離offset().top會比brc.bottom距離offset().top+height()來得小, 取較小的距離為pad, 以免修正到rca.bottom超出下個條列的rca.top, 又若是空條列, brc.height會是0, brc.top會等於offset().top, 但height()有高度, 改用brc.bottom與offset().top+height()的距離來恢復brc高度
						//var pad = brcBottom - brc.bottom;	// 不用上邊界計算是因為content-editable狀態下, Chrome的getBoundingRect()可能回相同的top
						var pad = (brc.height == 0)?brcBottom - brc.bottom:brc.top - brcTop;
						// 1101224 Raymond 1101541 Chrome不知道是不是96版開始, 修正在放大比例下brc.bottom也會跟著放大, 造成計算出負值pad, 導致斷頁判斷錯誤的問題
						if((navigator.userAgent.match(/Chrome\/(\d+)\./) || navigator.userAgent.match(/Chromium\/(\d+)\./)) && parseInt(RegExp.$1) >= 96)
							pad = 0;
						console.warn("pad=" + pad);
					}
					// 1091023 Raymond 1090735 四捨五入是round不是ceil
					// 1090714 Raymond 1090477 行高用四捨五入取整數
					// 2016.1.20 用line-height減font-size再除以2計算得到的行間間距並不準確, 改用line-height減實際clientrect的高度除以2再計算
					//lineSpace[idx] = ((Number($(elm).css("line-height").replace(/px/,"")) - Number($(elm).css("font-size").replace(/px/,""))) / 2);
					//theLogger.debug("lineSpace[" + idx + "] = (" + $(elm).css("line-height") + "-" + $(elm).css("font-size") + ")/2 = " + lineSpace[idx]);
					lineHeight[idx] = Number($(elm).css("line-height").replace(/px/,""));	// 1120830 Raymond 標檢局序121 改回有小數點的行高值
					//lineHeight[idx] = Math.ceil($(elm).css("line-height").replace(/px/,""));
					//lineHeight[idx] = Math.round($(elm).css("line-height").replace(/px/,""));
					theLogger.debug("lineHeight[" + idx + "] = " + lineHeight[idx]);
				}
				// 2016.12.6 新增支援斷頁指令
				if(elm.tagName == "DIV" && $(elm).hasClass("page-break")) {
					theLogger.warn("PAGE BREAK(斷頁指令)...brcBottom=" + brcBottom + ", break on " + (brcBottom + sy - offTop));
					nfo.breaks[nfo.pages-1] = brcBottom + sy - offTop;
					nfo.pages++;
					// 1091023 Raymond 1090735 斷頁後重新計算次頁有效高度
					if(nfo.pages == 2) {	// 僅分出第2頁時才有可能與首頁不同高度
						$testbody.css("height", getEffHeight());
						eh = $testbody.height();
						theLogger.log("P#" + nfo.pages + "有效eh = " + eh + "(" + $testbody.get(0).style.height + ")");
					}
					
					offTop = (brcBottom + sy);
					theLogger.warn("offTop = " + offTop);
					
					/* 2017.2.7 移至1st-pass控制顯示第1頁分頁後show-in-page=2的物件顯示問題
					var $sip = $(elm).find("[data-showinpage=2]");	// 修正FDA的案由第一頁不顯示(show-in-page=2)問題
					$sip.show();
					$sip = $(elm).nextAll().find("[data-showinpage=2]");
					$sip.show();*/
				}
				else if((brcBottom + sy - offTop) > eh) {
					if(elm.tagName == "TABLE" /* && $(elm).data("keep-together")*/) { // 2015.3.16 - 修正表格為不跨頁
						theLogger.warn("P#" + nfo.pages + ": 斷頁(TABLE:keep-together)...brcBottom=" + brcBottom + ", break on " + (brcTop + sy - offTop));
						//$body.css({height: Math.floor((rcs[0].top - of.top) * 100 / scale) + "px", overflowY: "hidden"});
						
						nfo.breaks[nfo.pages-1] = brcTop + sy - offTop;
						nfo.pages++;
						// 1091023 Raymond 1090735 斷頁後重新計算次頁有效高度
						if(nfo.pages == 2) {	// 僅分出第2頁時才有可能與首頁不同高度
							$testbody.css("height", getEffHeight());
							eh = $testbody.height();
							theLogger.log("P#" + nfo.pages + "有效eh = " + eh + "(" + $testbody.get(0).style.height + ")");
						}
						
						offTop = (brcTop + sy);	// 2015.11.10 - 修正斷頁計算錯誤
						theLogger.warn("offTop = " + offTop);
						
						/* 2017.2.7 移至1st-pass控制顯示第1頁分頁後show-in-page=2的物件顯示問題
						var $sip = $(elm).find("[data-showinpage=2]");	// 2016.10.13 修正FDA的案由第一頁不顯示(show-in-page=2)問題
						$sip.show();
						$sip = $(elm).nextAll().find("[data-showinpage=2]");
						$sip.show();*/
					}
					// 1120816 Raymond 1120503 新增自訂表格不可跨頁
					else if($(elm).find(".custom-table").length) {
						theLogger.log("PAGE BREAK(CUSTOM-TABLE:keep-together)...brcBottom=" + brcBottom + ", break on " + (brcTop + sy - offTop));
						//$body.css({height: Math.floor((rcs[0].top - of.top) * 100 / scale) + "px", overflowY: "hidden"});
						
						nfo.breaks[nfo.pages-1] = brcTop + sy - offTop;
						nfo.pages++;
						// 1091023 Raymond 1090735 斷頁後重新計算次頁有效高度
						if(nfo.pages == 2) {	// 僅分出第2頁時才有可能與首頁不同高度
							$testbody.css("height", getEffHeight());
							eh = $testbody.height();
							theLogger.log("P#" + nfo.pages + "有效eh = " + eh + "(" + $testbody.get(0).style.height + ")");
						}
						
						offTop = (brcTop + sy);	// 2015.11.10 - 修正斷頁計算錯誤
						theLogger.warn("offTop = " + offTop);
					}
					else {
						// 1110928 Raymond 陸委會序298 Chrome/Edge環境下若SPAN.a的child全是追蹤修訂或格式, rng.getClientRects可能會跟FireFox一樣只回最外層的Rect
						// 1100121 Raymond 1090927 fix for FireFox的selectNodeContents只會回childNodes的外圍rectangle
						//if(navigator.userAgent.indexOf("Firefox") >= 0) {
						//	if($(elm).children("SPAN.a").length > 0) {
						//		rng.selectNodeContents($(elm).children("SPAN.a")[0]);
						var rngIsSPANOnly = false;
						function _rngLastRectIsMultiLine(rng) {
							let rcs = rng.getClientRects();
							if(rcs.length && rcs[rcs.length - 1].height > (lineHeight[idx] * 1.5)) {	// range的最後一個Rect如果高度超過一行半的高度, 則判定為多行
								console.debug("rng.getClientRects回傳的最後一個Rect的高度超過單行的一行半高度, 應是多行且內容皆是追蹤修訂或格式化標籤");
								return true;
							}
							return false;
						}
						if(navigator.userAgent.indexOf("Firefox") >= 0 || (navigator.userAgent.indexOf("Chrome") >= 0 && _rngLastRectIsMultiLine(rng))) {
							function _getVisibleText(nd) {
								var s = "";
								for(var x=0; x<nd.childNodes.length; x++) {
									if(nd.childNodes[x].nodeType == 1 && $(nd.childNodes[x]).is(":visible"))
										s += nd.childNodes[x].textContent;
									else if(nd.childNodes[x].nodeType == 3)
										s += nd.childNodes[x].textContent;
								}
								return s;
							}
							if($(elm).children("SPAN.a").length > 0 && _getVisibleText($(elm).children("SPAN.a").get(0)).length > 0) {	// 若<文字>有內容選取<文字>的內容
								rng.selectNodeContents($(elm).children("SPAN.a")[0]);
								rngIsSPANOnly = true;
							}
							else if($(elm).children("SPAN.plain").length > 0 && _getVisibleText($(elm).children("SPAN.plain").get(0)).length > 0) {	// 若標題或標號有內容則選取標題或標號
								rng.selectNodeContents($(elm).children("SPAN.plain")[0]);
								rngIsSPANOnly = true;
							}
						}
						var rcs = rng.getClientRects();
						if(rcs.length == 0) {
							theLogger.error(elm.tagName + ".getClientRects = 0");
						}
						/*else {	// 1110504 Raymond for test
							for(var i=0; i<rcs.length; i++)
								console.log(i + "\t" + " - " + rcs[i].left + ", " + rcs[i].top + ", " + rcs[i].bottom + " - " + rcs[i].width + " X " + rcs[i].height);
						}*/
						/*else
							$(elm).attr("crc", "(1/" + rcs.length + "):" + rcs[0].left + "," + rcs[0].top + "," + (rcs[0].right - rcs[0].left) + "," + (rcs[0].bottom - rcs[0].top));*/
						var rca = [];	// 1070914 Raymond 1070729 rcs是唯讀的, 新增一個rca陣列來取代
						// 1090317 Raymond 修正IE下列印跨頁的條列時, 因回報的rcs[0]是整個DIV的大小, 導致誤判被移至次頁顯示的問題
						//for(var i=0; i<rcs.length; i++) {
						var iStart = 0;
						// 1110718 Raymond 1110625 Chrome下, 各行rcs會回報為不含行高的淨大小與IE不同, 第0個rcs若是最外框大小, 則第1個rcs的top與第0個rcs的top差即為上半部差高, 下半部差高則為lineHeight-上半部差高
						var xlu = 0, xll = 0;
						// 1100827 Raymond 1100925 修正Chrome下列印時不顯示序號的條列, 也會回傳rcs[0]是整個DIV的大小, 導致誤判被移至次頁顯示的問題
						//if(isIE) {
							// 1110928 Raymond 陸委會序298 rng改選取SPAN.a後, rcs[0]就不會是DIV或SPAN.a最外層的Rect了, 須改用別的判斷方式
							if(rngIsSPANOnly === true) {
								if(rcs.length > 1 && rcs[0].height > (lineHeight[idx] * 1.5)) {
									theLogger.warn((navigator.userAgent.indexOf("Chrom") >= 0 ? "Chrome":"FireFox") + "回傳DIV內容的框框, 第1個的下邊界超過第2個的上邊界, 判斷是整個DIV的大小, 忽略之");
									iStart = 1;
									rca[0] = {top: rcs[0].top, bottom: rcs[0].bottom, width: rcs[0].width, height: rcs[0].height};	// IE要跳過第1組rc時, 將第1組rc記錄在rca中
									// 1110718 Raymond 1110625 Chrome下, 各行rcs會回報為不含行高的淨大小與IE不同, 第0個rcs若是最外框大小, 則第1個rcs的top與第0個rcs的top差即為上半部差高, 下半部差高則為lineHeight-上半部差高
									xlu = rcs[1].top - rcs[0].top;
									xll = lineHeight[idx] - rcs[1].height - xlu;
									// 1110822 Raymond 1110771 修正行高為1時, 在Chrome環境下計算inline的高度會超出line-height的高度, 導致頁尾出現一行字只顯示上半部問題
									if(!!elm.style && !!elm.style.lineHeight && elm.style.lineHeight < 1.1) {
										// 1120830 Raymond 標檢局序121 修正行高為1時, 隱藏標號的多行SPAN.a, 會計算出不正常的差高問題
										//xll = rcs[1].bottom - rcs[0].bottom;
										//xlu = lineHeight[idx] - rcs[1].height - xll;
										xlu = xll = 0;
									}
								}
								else {
									xlu = rcs[0].top - brc.top;
									xll = lineHeight[idx] - rcs[0].height - xlu;
									// 1110822 Raymond 1110771 修正行高為1時, 在Chrome環境下計算inline的高度會超出line-height的高度, 導致頁尾出現一行字只顯示上半部問題
									if(!!elm.style && !!elm.style.lineHeight && elm.style.lineHeight < 1.1) {
										// 1120830 Raymond 標檢局序121 修正行高為1時, 隱藏標號的多行SPAN.a, 會計算出不正常的差高問題
										//xll = rcs[1].bottom - rcs[0].bottom;
										//xlu = lineHeight[idx] - rcs[1].height - xll;
										xlu = xll = 0;
									}
								}
								theLogger.warn("xlu=" + xlu + ", xll=" + xll);
							}
							else
							if(rcs.length > 1 && rcs[0].bottom > rcs[1].top) {
								//theLogger.warn("IE回傳DIV內容的框框, 第1個的下邊界超過第2個的上邊界, 判斷是整個DIV的大小, 忽略之");
								theLogger.warn((isIE ? "IE":(navigator.userAgent.indexOf("Chrome") >= 0 ? "Chrome":"Browser")) + "回傳DIV內容的框框, 第1個的下邊界超過第2個的上邊界, 判斷是整個DIV的大小, 忽略之");
								console.debug(rcs);	// 1120829 Raymond 標檢局序121 新增log資訊
								iStart = 1;
								rca[0] = {top: rcs[0].top, bottom: rcs[0].bottom, width: rcs[0].width, height: rcs[0].height};	// IE要跳過第1組rc時, 將第1組rc記錄在rca中
								// 1110718 Raymond 1110625 Chrome下, 各行rcs會回報為不含行高的淨大小與IE不同, 第0個rcs若是最外框大小, 則第1個rcs的top與第0個rcs的top差即為上半部差高, 下半部差高則為lineHeight-上半部差高
								xlu = rcs[1].top - rcs[0].top;
								xll = lineHeight[idx] - rcs[1].height - xlu;
								// 1110823 Raymond 1110771 修正行高為1時, 在Chrome環境下計算inline的高度會超出line-height的高度, 導致頁尾出現一行字只顯示上半部問題
								if(!!elm.style && !!elm.style.lineHeight && elm.style.lineHeight < 1.1) {
									// 1120830 Raymond 標檢局序121 修正行高為1時, 隱藏標號的多行SPAN.a, 會計算出不正常的差高問題
									//xll = rcs[1].bottom - rcs[0].bottom;
									//xlu = lineHeight[idx] - rcs[1].height - xll;
									xlu = xll = 0;
								}
								theLogger.warn("xlu=" + xlu + ", xll=" + xll);
							}
						//}
						// 1110928 Raymond 陸委會序298
						var firstOfThisLine = undefined;
						for(var i=iStart; i<rcs.length; i++) {
							//var ctx = rng.cloneContents();
							//theLogger.log("t:" + rcs[i].top + ", b:" + rcs[i].bottom + ", l:" + rcs[i].left + ", r:" + rcs[i].right + " - '" + ctx.toString().substring(0, 10).replace(/[\r\n]+/g, " ") + "...'(" + elm.tagName + ")");
							if(i == rcs.length - 1) {   // 末行
								theLogger.log("末行寬: " + (rcs[i].right - rcs[i].left) + "px");
							}
							// 1070914 Raymond 1070729 Chrome取得的區域只有文字部分, pad是元素top到文字top的距離, 可當做每行文字上下之間空白的距離
							rca[i] = {top: rcs[i].top, bottom: rcs[i].bottom, width: rcs[i].width, height: rcs[i].height};
							// 1110928 Raymond 陸委會序298 修正FireFox也要套用rca的校正
							//if(navigator.userAgent.indexOf("Chrome") >= 0) {
							if(navigator.userAgent.indexOf("Chrome") >= 0 || navigator.userAgent.indexOf("Firefox") >= 0) {
								// 1090717 Raymond 1081135 修正列印模式與簽核頁面一致, 正副本段落可能因brcTop是無條件捨棄小數點, brcBottom也變成捨棄小數點, 可能導致比brc.bottom小, 而使pad變成負數
								if(pad < 0) {
									if((rca[i].bottom - rca[i].top) > Math.ceil(lineHeight[idx] + 1)) {
										// 1100625 Raymond 1100692 修正Chrome下段落行高設為1.0或0.9時, 取得的ClientRect的高度都會大於line-height, 而pad都會是負值
										//theLogger.warn("此行高度超過單行高度, 忽略");
										if((rca[i].bottom - rca[i].top + pad + pad) > Math.ceil(lineHeight[idx] + 1))
											theLogger.warn("此行[" + i + "]高度超過單行高度, 忽略");
										else {
											theLogger.warn("rcs[" + i + "].top=" + rcs[i].top + "->" + (rcs[i].top - pad) + ", .bottom=" + rcs[i].bottom + "->" + (rcs[i].bottom + pad));
											rca[i].top = rcs[i].top - pad;	// Chrome環境時, 用pad擴大每行的top, bottom
											rca[i].bottom = rcs[i].bottom + pad;
											rca[i].height = rcs[i].height + (pad * 2);
										}
									}
									// 1100625 Raymond 1100692 修正Chrome下段落行高設為1.0或0.9時, 取得的ClientRect的高度都會大於line-height, 而pad都會是負值, 這裡處理正副本的修正邏輯要避開段落
									//else {
									else if(!$(elm).hasClass("segment")) {
										theLogger.warn("段落(正、副、抄本)可能計算元素bottom得到負數的pad, 重新以單行行高(" + lineHeight[idx] + ")減bottom(" + rcs[i].bottom + ")-top(" + rcs[i].top + ")");
										pad = (lineHeight[idx] - (rcs[i].bottom - rcs[i].top)) / 2;
										theLogger.warn("得出行間距, 再除2計算得pad = " + pad);
										theLogger.warn("rcs[" + i + "].top=" + rcs[i].top + "->" + (rcs[i].top - pad) + ", .bottom=" + rcs[i].bottom + "->" + (rcs[i].bottom + pad));
										rca[i].top = rcs[i].top - pad;	// Chrome環境時, 用pad擴大每行的top, bottom
										rca[i].bottom = rcs[i].bottom + pad;
										rca[i].height = rcs[i].height + (pad * 2);
									}
								}
								// 1110823 Raymond 1110771 修正行高為1時, 在Chrome環境下計算inline的高度會超出line-height的高度, 導致頁尾出現一行字只顯示上半部問題
								// 1090717 Raymond 1090477 修正Chrome下條列第一個ClientRect可能是標號的外圍, 會等於補正後的單行高度, 若再進行補正會大於單行高度, 造成誤判下邊界超出範圍提前跨頁的問題
								//else if(rcs[i].height + (pad * 2) > lineHeight[idx]) {
								else if(rcs[i].height + (pad * 2) > lineHeight[idx] && !!elm.style && !!elm.style.lineHeight && elm.style.lineHeight >= 1.1) {
									// 1100825 Raymond 1100925 修正Chrome下列印時不顯示序號的空條列, 只會回傳一個大小為0的ClientRect, 若此空條列為次頁首行會變成沒有顯示出其空行的高度的問題
									if(rcs.length == 1 && rcs[i].width == 0 && rcs[i].height == 0) {
										theLogger.warn("rcs[" + i + "].width=" + rcs[i].width + " .height=" + rcs[i].height + ", 且只有一個, 應是空白條列, 需補正高度, .bottom=" + rcs[i].bottom + "->" + (rcs[i].bottom + pad));
										rca[i].bottom = rcs[i].bottom + pad;
									}
									else
									theLogger.warn("rcs[" + i + "].height=" + rcs[i].height + ", 不需補正(+" + (pad * 2) + "), 以避免超出單行高度(" + lineHeight[idx] + ")");
								}
								// 1090717 Raymond 1090477 修正Chrome下條列第一個ClientRect可能是隱藏標號的外圍, 會高度為0
								else if(rcs[i].width == 0 && rcs[i].height == 0) {
									theLogger.warn("rcs[" + i + "].width=" + rcs[i].width + " .height=" + rcs[i].height + ", 應是隱藏的標號, 不需補正(+" + (pad * 2) + ")");
								}
								// 1120829 Raymond 標檢局序121 排除第3個(i=2)為多行span.a的整體高度
								else if(rcs[i].height >= (lineHeight[idx] * 1.5)) {
									theLogger.warn("rcs[" + i + "].width=" + rcs[i].width + " .height=" + rcs[i].height + ", 應是整個多行SPAN.a的大小, 忽略之");
									continue;
								}
								else {
									// 1110718 Raymond 1110625 修正pad停用後, Chrome下回傳的rcs會是各行不含行高的淨大小, 造成斷頁判定與IE或GenPage不一致的問題
									//theLogger.warn("rcs[" + i + "].top=" + rcs[i].top + "->" + (rcs[i].top - pad) + ", .bottom=" + rcs[i].bottom + "->" + (rcs[i].bottom + pad));
									//rca[i].top = rcs[i].top - pad;	// Chrome環境時, 用pad擴大每行的top, bottom
									//rca[i].bottom = rcs[i].bottom + pad;
									//rca[i].height = rcs[i].height + (pad * 2);
									theLogger.warn("rcs[" + i + "].top=" + rcs[i].top + "->" + (rcs[i].top - xlu) + ", .bottom=" + rcs[i].bottom + "->" + (rcs[i].bottom + xll));
									rca[i].top = rcs[i].top - xlu;
									rca[i].bottom = rcs[i].bottom + xll;
									rca[i].height = rcs[i].height + xlu + xll;
									// 1110928 Raymond 陸委會序298 修正判斷是否為下標字, 若是則取本行首的top為下標字的top, 以避免斷頁斷在下標字的top, 造成同一行的正常字被切成上下一半
									if(i > iStart && firstOfThisLine !== undefined) {
										//if(rcs[firstOfThisLine].bottom < rca[i].top) {	// 行首用未調過的rcs.bottom, 比較不會發生次行的top小於前行行首的bottom而誤判成同一行的問題
										if(rcs[firstOfThisLine].bottom < ((rca[i].top + rca[i].bottom) / 2)) {	// 1120830 Raymond 標檢局序121 行首改與本行中線位置比較, 因行高為1時, 第2行的top會小於第1行的bottom, 導致誤判第2行與第1行同一行
											console.debug("本行首應為第" + i + "個Rect", rca[i]);
											firstOfThisLine = i;
										}
										else {
											if(rca[firstOfThisLine].top != rca[i].top) {
												if(rca[i].top > rca[firstOfThisLine].top) {
													//let ofst = rca[i].top - rca[firstOfThisLine].top;
													rca[i].top = rca[firstOfThisLine].top;
													rca[i].bottom = rcs[i].bottom;	// 下標字的bottom比單行的bottom要大
													rca[i].height = rca[i].bottom - rca[i].top;
													console.debug("本字的上緣較本行上緣低, 應是下標字, 校正本字的位置為[top:" + rca[i].top + ", bottom:" + rca[i].bottom + "]");
												}
												else {
													console.debug("本字的上緣較本行上緣高, 應是上標字或正常字, 未校正");
												}
											}
										}
									}
									else {
										console.debug("本行首為第" + i + "個Rect", rca[i]);	// 1120830 Raymond 標檢局序121 新增log資訊
										firstOfThisLine = i;
									}
								}
							}
							/* 1070914 Raymond 1070729 rcs用rca取代
							if((rcs[i].top + sy - offTop) > eh) {	// 2015.9.9 本行上部已超過有效page body高度要斷在上一行
								if(i > 0) {
									theLogger.debug("rcs[" + i + "]=" + (rcs[i].top + sy - offTop) + "~" + (rcs[i].bottom + sy - offTop) + ", rcs[" + (i-1) + "]=" + (rcs[i-1].top + sy - offTop) + "~" + (rcs[i-1].bottom + sy - offTop));
									theLogger.warn("P#" + nfo.pages + ": 斷頁(上一行的下緣)..." + (rcs[i-1].bottom + sy - offTop + ((lineHeight[idx] - rcs[i-1].bottom + rcs[i-1].top) / 2)));	// 2016.1.20 用line-height減font-size計算的lineSpace不準, 改用line-height減實際clientrect的高度
									nfo.breaks[nfo.pages-1] = rcs[i-1].bottom + sy - offTop + ((lineHeight[idx] - rcs[i-1].bottom + rcs[i-1].top) / 2);	// 2016.1.20 用line-height減font-size計算的lineSpace不準, 改用line-height減實際clientrect的高度
									nfo.pages++;
									// TODO: 首頁斷頁後重算eh
									
									offTop = rcs[i-1].bottom + sy + ((lineHeight[idx] - rcs[i-1].bottom + rcs[i-1].top) / 2);	// 2016.1.20 用line-height減font-size計算的lineSpace不準, 改用line-height減實際clientrect的高度
									theLogger.warn("offTop = " + offTop);
								}
								else {
									theLogger.error("無上一行");
									if(idx > 0) {
										theLogger.warn("P#" + nfo.pages + ": 斷頁在上一頁最後一個段落的下緣, " + nfo.breaks[nfo.pages-1] + " -> " + (elmBrc[idx-1].bottom + sy - offTop));
										nfo.breaks[nfo.pages-1] = elmBrc[idx-1].bottom + sy - offTop;
										nfo.pages++;
										// TODO: 首頁斷頁後重算eh
										
										offTop = elmBrc[idx-1].bottom + sy;
										theLogger.warn("offTop = " + offTop);
									}
								}
							}*/
							if((rca[i].top + sy - offTop) > eh) {	// 2015.9.9 本行上部已超過有效page body高度要斷在上一行
								// 1110523 Raymond 修正Chrome下, 次頁首行若是回報ClientRect第1個為Element全高, 而改用第2個ClientRect計算斷頁時, 列印功能因誤判而採用第1個ClientRect當作上一行, 而使計算斷頁位置太大不正確的問題(造成聯大問題案例文稿簽核時應呈現3頁, 列印時呈現2頁)
								//if(i > 0) {
								if(i > iStart) {
									theLogger.debug("rcs[" + i + "]=" + (rca[i].top + sy - offTop) + "~" + (rca[i].bottom + sy - offTop) + ", rcs[" + (i-1) + "]=" + (rca[i-1].top + sy - offTop) + "~" + (rca[i-1].bottom + sy - offTop));
									theLogger.warn("P#" + nfo.pages + ": 斷頁(上一行的下緣)..." + (rca[i-1].bottom + sy - offTop + ((lineHeight[idx] - rca[i-1].bottom + rca[i-1].top) / 2)));	// 2016.1.20 用line-height減font-size計算的lineSpace不準, 改用line-height減實際clientrect的高度
									nfo.breaks[nfo.pages-1] = rca[i-1].bottom + sy - offTop + ((lineHeight[idx] - rca[i-1].bottom + rca[i-1].top) / 2);	// 2016.1.20 用line-height減font-size計算的lineSpace不準, 改用line-height減實際clientrect的高度
									nfo.pages++;
									// 1091023 Raymond 1090735 斷頁後重新計算次頁有效高度
									if(nfo.pages == 2) {	// 僅分出第2頁時才有可能與首頁不同高度
										$testbody.css("height", getEffHeight());
										eh = $testbody.height();
										theLogger.log("P#" + nfo.pages + "有效eh = " + eh + "(" + $testbody.get(0).style.height + ")");
									}
									
									offTop = rca[i-1].bottom + sy + ((lineHeight[idx] - rca[i-1].bottom + rca[i-1].top) / 2);	// 2016.1.20 用line-height減font-size計算的lineSpace不準, 改用line-height減實際clientrect的高度
									theLogger.warn("offTop = " + offTop);
								}
								else {
									//theLogger.error("無上一行");	// 1110718 Raymond 無上行且是第1個物件才是錯誤
									if(idx > 0) {
										theLogger.warn("P#" + nfo.pages + ": 斷頁在上一頁最後一個段落的下緣, " + nfo.breaks[nfo.pages-1] + " -> " + (elmBrc[idx-1].bottom + sy - offTop));
										nfo.breaks[nfo.pages-1] = elmBrc[idx-1].bottom + sy - offTop;
										nfo.pages++;
										// 1091023 Raymond 1090735 斷頁後重新計算次頁有效高度
										if(nfo.pages == 2) {	// 僅分出第2頁時才有可能與首頁不同高度
											$testbody.css("height", getEffHeight());
											eh = $testbody.height();
											theLogger.log("P#" + nfo.pages + "有效eh = " + eh + "(" + $testbody.get(0).style.height + ")");
										}
										
										offTop = elmBrc[idx-1].bottom + sy;
										theLogger.warn("offTop = " + offTop);
									}
									// 1110718 Raymond 無上行且是第1個物件才是錯誤
									else
										theLogger.error("無上一行");
								}
							}
							
							/*if((rcs[i].bottom + sy - offTop + ((lineHeight[idx] - rcs[i].bottom + rcs[i].top) / 2)) > eh) { // 超過有效page body高度要斷頁, 2015.12.2 加上行高多出的一半空間再判斷// 2016.1.20 用line-height減font-size計算的lineSpace不準, 改用line-height減實際clientrect的高度
								theLogger.warn("P#" + nfo.pages + ": 斷頁..." + (rcs[i].top + sy - offTop - ((lineHeight[idx] - rcs[i].bottom + rcs[i].top) / 2)));	// 2015.12.2 扣掉行高多出的一半空間才是本行的上緣	// 2016.1.20 用line-height減font-size計算的lineSpace不準, 改用line-height減實際clientrect的高度
								//$body.css({height: Math.floor((rcs[i].top - of.top) * 100 / scale) + "px", overflowY: "hidden"});
								
								nfo.breaks[nfo.pages-1] = rcs[i].top + sy - offTop - ((lineHeight[idx] - rcs[i].bottom + rcs[i].top) / 2);	// 2015.12.2 扣掉行高多出的一半空間才是本行的上緣, 再設為斷頁點	// 2016.1.20 用line-height減font-size計算的lineSpace不準, 改用line-height減實際clientrect的高度
								nfo.pages++;
								// TODO: 首頁斷頁後重算eh
								
								offTop = rcs[i].top + sy - ((lineHeight[idx] - rcs[i].bottom + rcs[i].top) / 2);	// 2015.3.23 - 修正斷頁計算錯誤, 2015.12.2 - offTop也要扣掉行高多出的一半高度	// 2016.1.20 用line-height減font-size計算的lineSpace不準, 改用line-height減實際clientrect的高度
								theLogger.warn("offTop = " + offTop);
							}*/
							/* 1070914 Raymond 1070729 rcs用rca取代
							if(rcs[i].bottom + sy - offTop > eh) { // 2016.11.4 行底超過有效page body高度就要斷頁
								theLogger.warn("P#" + nfo.pages + ": 斷頁..." + (rcs[i].top + sy - offTop));
								//$body.css({height: Math.floor((rcs[i].top - of.top) * 100 / scale) + "px", overflowY: "hidden"});
								
								nfo.breaks[nfo.pages-1] = rcs[i].top + sy - offTop;
								nfo.pages++;
								// TODO: 首頁斷頁後重算eh
								
								offTop = rcs[i].top + sy;
								theLogger.warn("offTop = " + offTop);
							}
							else if(i == 0) {	// 2015.7.22
								var x = "";
								for(var j=0; j<rcs.length; j++) {
									x += (rcs[j].top + sy - offTop) + "-" + (rcs[j].bottom + sy - offTop) + ",";
								}
								theLogger.debug("elmFrom[" + idx + "]=" + (nfo.pages - 1) + ", elmFromPos[" + idx + "]=" + x);
								//$(elm).attr("data-from", nfo.pages-1).attr("data-frompos", rcs[i].top + sy - offTop);
								elmFrom[idx] = nfo.pages - 1;
								elmFromPos[idx] = rcs[i].top + sy - offTop;
								//theLogger.warn("elmFrom[" + idx + "] = " + nfo.pages + " - 1 (" + elmFrom[idx] + ")");
								//theLogger.warn("elmFromPos[" + idx + "] = " + rcs[i].top + " + " + sy + " - " + offTop + " (" + elmFromPos[idx] + ")");
							}*/
							// 1090717 Raymond 1090477 修正IE取得的ClientRect有小數點而剛好bottom壓在頁面下限時, 產生誤判跨頁, 造成與匯出頁面結果不一致的問題
							//if((rca[i].bottom + sy - offTop) > eh) { // 2016.11.4 行底超過有效page body高度就要斷頁
							if(Math.floor(rca[i].bottom + sy - offTop) > eh) { // 2016.11.4 行底超過有效page body高度就要斷頁
								// 1130322 Raymond 1130204 修正在iPad下, 超過單行高度的Rect未排除, 導致超出頁面下緣的條列整個切到次頁顯示的問題, 因為iPad下的Safari甚至Chrome的userAgent都沒有了"Chrome"字樣
								// 1100112 Raymond 1090931 修正Chrome下列印發生跨頁的段落條列跑到次頁問題
								//if(navigator.userAgent.indexOf("Chrome") >= 0 &&
								if(navigator.userAgent.match(/Edg|Chrome|Safari/) &&
									// 1120829 Raymond 標檢局序121 排除條件改為1.5行高度, 因為行高為1時, ClientRect的高度會大於lineHeight + 1
									//(rca[i].bottom - rca[i].top) > Math.ceil(lineHeight[idx] + 1)) {
									//theLogger.warn("Chrome環境下高度回應異常(" + (rca[i].bottom - rca[i].top) + "), 超過單行高度(" + Math.ceil(lineHeight[idx] + 1) + "), 排除之");
									(rca[i].bottom - rca[i].top) > (lineHeight[idx] * 1.5)) {
									// 1130322 Raymond 1130204 修正在iPad下, 超過單行高度的Rect未排除, 導致超出頁面下緣的條列整個切到次頁顯示的問題, 因為iPad下的Safari甚至Chrome的userAgent都沒有了"Chrome"字樣
									//theLogger.warn("Chrome環境下高度回應異常(" + (rca[i].bottom - rca[i].top) + "), 超過1.5行高度(" + (lineHeight[idx] * 1.5) + "), 排除之");
									theLogger.warn(((navigator.userAgent.match(/Edg/))?"Edge":navigator.userAgent.match(/Chrome|Safari/)[0]) + "環境下高度回應異常(" + (rca[i].bottom - rca[i].top) + "), 超過1.5行高度(" + (lineHeight[idx] * 1.5) + "), 排除之");
								}
								else {
									// 1101012 Raymond 1090931 修正0->iStart
									// 1080716 Raymond 1080536 修正斷頁首行有margin-top高度時, 該頁最末行可能會被截一半的問題
									//if(i == 0 && parseInt($(elm).css("marginTop")) > 0) {	// 首行margin-top大於0
									if(i == iStart && parseInt($(elm).css("marginTop")) > 0) {	// 首行margin-top大於0
										rca[i].top = rcs[i].top - parseInt($(elm).css("marginTop"));
										theLogger.warn("P#" + nfo.pages + ": 本行(" + i + ")下部" + (rca[i].bottom + sy - offTop) + "(" + rca[i].bottom + ")超過有效高度, 斷頁在本行上緣(含上邊界距離:" + parseInt($(elm).css("marginTop")) + ")..." + (rca[i].top + sy - offTop) + "(" + rca[i].top + ")");
									}
									else {
									//theLogger.warn("P#" + nfo.pages + ": 斷頁..." + (rca[i].top + sy - offTop));
									theLogger.warn("P#" + nfo.pages + ": 本行(" + i + ")下部" + (rca[i].bottom + sy - offTop) + "(" + rca[i].bottom + ")超過有效高度, 斷頁在本行上緣..." + (rca[i].top + sy - offTop) + "(" + rca[i].top + ")");
									//$body.css({height: Math.floor((rcs[i].top - of.top) * 100 / scale) + "px", overflowY: "hidden"});
									}
									// 1100628 Raymond 1100692 無條件進位成整數, 以避免行高0.9時, 次頁出現被切到一點點的上行
									if(navigator.userAgent.indexOf("Chrome") >= 0) {
										if(elm.style.lineHeight <= 1.0 && $(elm).hasClass("segment") &&						// 行高小於1.0且為段落/條列
											// 1140312 Raymond 1140212 修正判斷前一行不是整個DIV大小的條件為1.5行高度
											//i > 0 && (rca[i-1].bottom - rca[i-1].top) <= Math.ceil(lineHeight[idx] + 1)) {	// 前一行不是整個DIV的大小
											i > 0 && (rca[i-1].bottom - rca[i-1].top) <= (lineHeight[idx] * 1.5)) {	// 前一行不是整個DIV的大小
											// 1130304 Raymond 1121125 修正若前一行bottom也超過頁面下限時, 改用本行的上緣做為斷頁點, 以避免某些案例的正本受文者會少顯示一行半(因為條列行高24px, 受文者行高16px, 誤判一行條列會影響一行半受文者)的問題
											if((rca[i-1].bottom + sy - offTop) > eh)
												var ceiled = Math.ceil(rca[i].top + sy);
											else
											var ceiled = Math.ceil(rca[i-1].bottom + sy);									// 改用前一行的下緣做為斷頁點
										}
										// 1110928 Raymond 陸委會序298 修正若斷頁點落在下標字的區域中間, 斷頁點的判斷須往前後字找, 才能避免斷頁點被設在下標字的top, 導致該頁的末行及次頁的首行出現切上下一半的問題
										//else if(i > firstOfThisLine) {
										else if(i >= firstOfThisLine) {	// 1111004 Raymond 陸委會序319 修正當行首就是下標字時, 斷頁點未往後找正常字的top, 導致此行下標字正確顯示在次頁但正常字的上半部顯示在前頁的問題
											var ceiled = Math.ceil(rca[i].top + sy);
											// 1120830 Raymond 標檢局序121 修正行高為1時, top會小於前一行的bottom, 以Rect與lineHeight的行高差的一半, 來修正
											if(!!elm.style && !!elm.style.lineHeight && elm.style.lineHeight < 1.1)
												// 1130304 Raymond 1121125 修正行高為1時, 改用無條件捨去取top加修正高度做為斷頁點, 以避免斷頁行上方一點點出現在前一頁的問題
												//ceiled += ((rca[i].height - lineHeight[idx]) / 2);
												ceiled = Math.floor(rca[i].top + sy + ((rca[i].height - lineHeight[idx]) / 2));
											var bkFound = false;
											for(var j=i-1; j>firstOfThisLine; j--) {	// rcs可能會因為格式及追蹤修訂而變成一個字一個, 往前推算斷頁點, 因為下標字的top比正常字低, 會導致斷頁點斷在下標字的top, 而使同一行的正常字被切到
												if(rca[j].top < rca[i].top && rca[j].bottom < rca[i].top)
													break;
												else {
													console.warn("往前推算以第" + j + "個字的上緣(" + rca[j].top + ")為斷頁點");
													ceiled = Math.ceil(rca[j].top + sy);
													bpFound = true;
												}
											}
											if(!bkFound) {	// 往前找找不到的話, 改往後找
												if(i < (rcs.length - 1)) {
													for(var j=i+1; j<rcs.length; j++) {	// 後面的rca還沒建立, 所以用rcs判斷
														if(rcs[j].top > rca[i].bottom)
															break;
														else if(rcs[j].top < rca[i].top && rcs[j].bottom > rca[i].top) {
															console.warn("往後推算以第" + j + "個字的上緣(" + (rcs[j].top - xlu) + ")為斷頁點");
															ceiled = Math.ceil(rcs[j].top - xlu + sy);
															bpFound = true;
														}
													}
												}
											}
										}
										else {
											var ceiled = Math.ceil(rca[i].top + sy);
										}
										nfo.breaks[nfo.pages-1] = ceiled - offTop;
									}
									// 1120830 Raymond 標檢局序121 修正行高為1時, top會小於前一行的bottom, 以Rect與lineHeight的行高差的一半, 來修正
									else if(!!elm.style && !!elm.style.lineHeight && elm.style.lineHeight < 1.1)
										nfo.breaks[nfo.pages-1] = rca[i].top + sy + ((rca[i].height - lineHeight[idx]) / 2) - offTop;
									else
									nfo.breaks[nfo.pages-1] = rca[i].top + sy - offTop;
									nfo.pages++;
									// 1091023 Raymond 1090735 斷頁後重新計算次頁有效高度
									if(nfo.pages == 2) {	// 僅分出第2頁時才有可能與首頁不同高度
										$testbody.css("height", getEffHeight());
										eh = $testbody.height();
										theLogger.log("P#" + nfo.pages + "有效eh = " + eh + "(" + $testbody.get(0).style.height + ")");
									}
									
									// 1100628 Raymond 1100692 無條件進位成整數
									if(navigator.userAgent.indexOf("Chrome") >= 0)
										offTop = ceiled;
									else
									offTop = rca[i].top + sy;
									theLogger.warn("offTop = " + offTop);
								}
							}
							// 1081025 Raymond 1080945 修正段落跨頁是行底超過有效高度情況時未記錄from、fromPos造成段落在跨頁的第一頁未顯示問題
							//else if(i == 0) {	// 2015.7.22
							//if(i == 0) {	// 2015.7.22
							if(i == iStart) {	// 1090317 Raymond 修正IE下列印跨頁的條列時, 要跳過整個DIV大小的rcs[0], 用rcs[iStart]
								var x = "";
								for(var j=0; j<rca.length; j++) {
									x += (rca[j].top + sy - offTop) + "-" + (rca[j].bottom + sy - offTop) + ",";
								}
								theLogger.debug("elmFrom[" + idx + "]=" + (nfo.pages - 1) + ", elmFromPos[" + idx + "]=" + x);
								//$(elm).attr("data-from", nfo.pages-1).attr("data-frompos", rcs[i].top + sy - offTop);
								elmFrom[idx] = nfo.pages - 1;
								// 1110506 Raymond 1110475 修正當列印頁首行是設定了margin-top大於0的欄位(ex:正本), 而其內容長度過長需跨頁時, 因offTop已計入扣了margin-top而使elmFromPos計算出一直是0上下的結果, 造成次頁的第一行不顯示或只顯示下半部(看該欄位的margin-top高度)的問題, 這裡用rcs[0]而不是rca[0]是因為列印只有一組, 而rca[0]已計入margin-top而非本來的位置
								//elmFromPos[idx] = rca[i].top + sy - offTop;
								elmFromPos[idx] = rcs[0].top + sy - offTop;
								theLogger.warn("elmFrom[" + idx + "] = " + elmFrom[idx] + ", elmFromPos[" + idx + "] = " + elmFromPos[idx]);
								//theLogger.warn("elmFrom[" + idx + "] = " + nfo.pages + " - 1 (" + elmFrom[idx] + ")");
								//theLogger.warn("elmFromPos[" + idx + "] = " + rcs[i].top + " + " + sy + " - " + offTop + " (" + elmFromPos[idx] + ")");
							}
						}
					}
				}
				//$(elm).attr("data-po", nfo.pages-1);
				elmPo[idx] = nfo.pages - 1;
				//theLogger.warn("elmPo[" + idx + "] = " + nfo.pages + " - 1 (" + elmPo[idx] + ")");
				
				/*if($(elm).find(".sign-area").length) {
					$(elm).find(".sign-area").each(function(idx, sa) {
						theLogger.debug(".sign-area: " + $(sa).attr("data-id") + "," + $(sa).offset().left + "," + $(sa).offset().top);
						//var m = $flow.find("[data-po='" + (nfo.pages - 1) + "']");
						//if(m.length) {
						//	if(SSO_CONFIG.logLevel >= 3)
						//		theLogger.log("1st elm: " + m.eq(0).offset().left + "," + m.eq(0).offset().top + ", mtop:" + m.eq(0).css("margin-top"));
						//    var bd = {left: $body.offset().left - $page.offset().left, top: $body.offset().top - $page.offset().top};
						//	if(SSO_CONFIG.logLevel >= 3)
						//		theLogger.log("   rc:" + ($(sa).offset().left - m.eq(0).offset().left + bd.left) + "," + ($(sa).offset().top - m.eq(0).offset().top + bd.top) + "," + $(sa).width() + "," + $(sa).height());
							if(!("signAreas" in nfo))
								nfo.signAreas = new Array();
							
							var found = false;
							$.each(nfo.signAreas, function(i, signArea) {
								if(signArea.id == $(sa).attr("data-id")) {
									signArea.po = nfo.pages - 1;
									signArea.left = $(sa).offset().left + of.left - of0.left;// - m.eq(0).offset().left + bd.left;
									//signArea.left = $(sa).position().left - $page.position().left;
									signArea.top = $(sa).offset().top;// - m.eq(0).offset().top + bd.top;
									//signArea.top = $(sa).position().top - $page.position().top;
									signArea.width = $(sa).width();
									signArea.height = $(sa).height();
									found = true;
									return false;
								}
							});
							if(!found) {
								nfo.signAreas.push({
									id: $(sa).attr("data-id"),
									po: nfo.pages - 1,
									left: $(sa).offset().left,// - m.eq(0).offset().left + bd.left,
									top: $(sa).offset().top,// - m.eq(0).offset().top + bd.top,
									width: $(sa).width(),
									height: $(sa).height()
								});
							}
						//}
					});
				}*/
			});
			if(true) {
				var deferreds = [];	// 2016.7.27 新增記錄新增頁面時需等待完成之工作(下載騎縫章)
				// 1110613 Raymond 1110271 下載騎縫章並記錄在特定物件供RD-AOLPrint.js使用
				if("printSealMarkBetweenDoc" in SSO_CONFIG && SSO_CONFIG.printSealMarkBetweenDoc == true) {
					window.sealMarkDocNo = theAOL.docObj.docNo;	// 1110627 Raymond 1110271 騎縫章上的文號改用全域變數記錄
					if(!window.sealMarkImgData) {
						deferreds.push(thePublicRsrc.getSealMarkImage(theUserInfo.OrgID, theUserInfo.DepartID)
						.done(function(fil, size) {
							window.sealMarkImgData = fil;
							window.sealMarkSize = size;
							if(isIE && "printMarginForIE" in SSO_CONFIG && SSO_CONFIG.printMarginForIE > 0)
								window.printMarginForIE = SSO_CONFIG.printMarginForIE;
							if(!!window.SSO_CONFIG && "rightSealMarkSpace" in SSO_CONFIG)
								window.rightSealMarkSpace = SSO_CONFIG.rightSealMarkSpace;
						}));
					}
				}
				var firstOfThisPage = true, firstOfNextPage = true;
				var $pg, nps = 0;
				$testbody.find("> div").children().each(function(idx, elm) {
					//var fromPo = $(elm).attr("data-from");	// 2015.7.22
					//var fromPos = $(elm).attr("data-frompos");
					$(elm).attr("data-po", elmPo[idx])	// for debug
						.attr("data-from", elmFrom[idx])
						.attr("data-frompos", elmFromPos[idx]);
					
					// 2016.10.13 修正FDA的案由第一頁不顯示(show-in-page=2)問題
					if(elmPo[idx] > 0) {
						var $sip = $(elm).find("[data-showinpage=2]");
						$sip.show();
					}
					
					if(elmPo[idx] >= nps) {
						if(idx == 0 && elmFrom[idx] != undefined && elmFrom[idx] == 0 && elmPo[idx] > nps) {	// 2017.3.13 fix for 第1個para就跨頁
							$pg = addNewPage(nps, deferreds);	// 產生新頁面, deferreds記錄需等待完成工作
							nps ++;
						}
						// 2016.11.4 FIX for 條列跨頁
						if(elmFrom[idx] != undefined && elmFrom[idx] == nps-1) {	// 上半部顯示
							// 1120830 Raymond 標檢局序121 修正若斷頁點有小數點時, 以ceil取得較大範圍, 以避免行高為1時, 頁尾末行文字有可能下半部被截掉一點的問題
							//var brkPos = nfo.breaks[nps-1];
							//theLogger.debug("P#" + (nps-1) + " break pos: " + brkPos);
							var brkPos = Math.ceil(nfo.breaks[nps-1]);
							theLogger.debug("P#" + (nps-1) + " break pos: " + brkPos + "(" + nfo.breaks[nps-1] + ")");
							//alert("po:" + po + ",brk:" + brkPos);
							$pg.find("> div").eq(2).find("> div").append($(elm).clone(true));
							//$body.css({height: Math.floor(nfo.breaks[po] - 4) + "px", overflowY: "hidden"});	// 調整$body高度來遮住下半部
							$pg.find("> div").eq(2).css({height: Math.floor(brkPos) + "px", overflowY: "hidden"});	// 調整$body高度來遮住下半部
						}
						
						//$pg = addNewPage(elmPo[idx], deferreds);	// 產生新頁面, deferreds記錄需等待完成工作
						$pg = addNewPage(nps, deferreds);	// 產生新頁面, deferreds記錄需等待完成工作
						nps ++;
						
						// 2016.11.4 FIX for 條列跨頁
						if(elmPo[idx] == nps-1 && elmFrom[idx] != undefined && elmFrom[idx] == nps-2) {
							// 1071129 Raymond 修正Chrome下行高1.0時, 條列跨頁的次頁首行仍殘留一點前頁末行的問題
							//if(navigator.userAgent.indexOf("Chrome") >= 0)
							if(navigator.userAgent.indexOf("Chrome") >= 0 && !!elm.style && !!elm.style.lineHeight && elm.style.lineHeight < 1.1)	// 1120830 Raymond 標檢局序121 修正跨頁的條列行高大於1時, margin-top仍多減1的問題
								theLogger.warn("調整" + elm.tagName + "之marginTop為" + Math.floor(elmFromPos[idx] - nfo.breaks[nps-2] - 1) + "px");
							else
								theLogger.warn("調整" + elm.tagName + "之marginTop為" + Math.floor(elmFromPos[idx] - nfo.breaks[nps-2]) + "px");
							$(elm).attr("data-origmgntop", $(elm).css("margin-top"));	// 記錄調整前的margin-top
							//$(elm).css("margin-top", Math.floor(elmFromPos[idx] - nfo.breaks[po-1]) + "px");
							// 2015.11.30 次頁調整marginTop要抱括PC會把首行畫在去除行高的高度差的位置, 固定在次頁啟始Y位置, 故行動版要再扣去行高的高度差的一半
							// iPad上的$.css("line-height")及$.css("font-size")會回傳px高度資訊, 不是原本的倍數及pt
							// 1071129 Raymond 修正Chrome下行高1.0時, 條列跨頁的次頁首行仍殘留一點前頁末行的問題
							//if(navigator.userAgent.indexOf("Chrome") >= 0)
							if(navigator.userAgent.indexOf("Chrome") >= 0 && !!elm.style && !!elm.style.lineHeight && elm.style.lineHeight < 1.1)	// 1120830 Raymond 標檢局序121 修正跨頁的條列行高大於1時, margin-top仍多減1的問題
								$(elm).css("margin-top", Math.floor(elmFromPos[idx] - nfo.breaks[nps-2] - 1) + "px");
							else
								$(elm).css("margin-top", Math.floor(elmFromPos[idx] - nfo.breaks[nps-2]) + "px");
						}
						// 1060603 Raymond 1060428 跨2頁以上的條列且首行為頁首
						else if(elmFrom[idx] != undefined && elmFrom[idx] <= nps-1 && elmPo[idx] > nps-1) {
						//else if(elmFrom[idx] != undefined && elmFrom[idx] < nps-1 && elmPo[idx] > nps-1) {	// 2016.12.7 跨2頁以上的條列
							if(elmFrom[idx] == nps-1) {	// 此條列為本頁第1個也是唯一, 下半在次頁
								$pg.find("> div").eq(2).find("> div").append($(elm).clone(true));
								$pg.find("> div").eq(2).css({height: nfo.breaks[elmFrom[idx]] + "px", overflowY: "hidden"});	// 調整$body高度來遮住下半部
								$pg = addNewPage(nps, deferreds);	// 新增次頁
								nps ++;
							}
							var cpOffset = elmFromPos[idx];
							for(var cp=elmFrom[idx]; cp<elmPo[idx]; cp++) {
								cpOffset -= nfo.breaks[cp];
								theLogger.warn("調整" + elm.tagName + "之marginTop為" + Math.floor(cpOffset) + "px");
								$(elm).attr("data-origmgntop", $(elm).css("margin-top"));	// 記錄調整前的margin-top
								$(elm).css("margin-top", Math.floor(cpOffset) + "px");
								
								if(elmPo[idx] > nps-1) {	// 若最後部分仍在次幾頁則clone本條列在本頁, 並新增次頁
									$pg.find("> div").eq(2).find("> div").append($(elm).clone(true));
									$pg.find("> div").eq(2).css({height: nfo.breaks[cp+1] + "px", overflowY: "hidden"});	// 調整$body高度來遮住下半部
								
									$pg = addNewPage(nps, deferreds);	// 新增次頁
									nps ++;
								}
							}
						}
					}
					//else
					//	$pg = $pages.find(".pg").eq(elmPo[idx]);
					$pg.find("> div").eq(2).find("> div").append(elm);
					/*if(elmPo[idx] != po) {    // 隱藏非指定頁次的物件
						if(elmFrom[idx] != undefined && elmFrom[idx] == po) {	// 上半部顯示
							var brkPos = nfo.breaks[po];
							theLogger.debug("break pos: " + brkPos);
							//alert("po:" + po + ",brk:" + brkPos);
							$(elm).show();	// 2015.11.12 backspace時原本是hide, 要改回show
							//$body.css({height: Math.floor(nfo.breaks[po] - 4) + "px", overflowY: "hidden"});	// 調整$body高度來遮住下半部
							$body.css({height: Math.floor(nfo.breaks[po]) + "px", overflowY: "hidden"});	// 調整$body高度來遮住下半部
						}
						else {
							$(elm).hide();
							if(elmPo[idx] == (po + 1) && firstOfNextPage) {
								//$body.css({height: Math.floor(nfo.breaks[po]) + "px", overflowY: "hidden"});	// 調整$body高度回原值?
								firstOfNextPage = false;
							}
						}
					}
					else {
						$(elm).show();	// 2015.11.12 頁次相同即show
						if(firstOfThisPage) {
							$body.height($body.attr("data-height"));	// 2015.11.30 每頁第1個欄位重設$body高度
							if(elmFrom[idx] != undefined && elmFrom[idx] != po) {
								if(po > 0) {
									//alert("po:" + po + ",fromPos:" + fromPos + ",brk:" + nfo.breaks[po-1]);
									theLogger.warn("調整" + elm.tagName + "之marginTop為" + Math.floor(elmFromPos[idx] - nfo.breaks[po-1]) + "px");
									$(elm).attr("data-origmgntop", $(elm).css("margin-top"));	// 記錄調整前的margin-top
									//$(elm).css("margin-top", Math.floor(elmFromPos[idx] - nfo.breaks[po-1]) + "px");
									// 2015.11.30 次頁調整marginTop要抱括PC會把首行畫在去除行高的高度差的位置, 固定在次頁啟始Y位置, 故行動版要再扣去行高的高度差的一半
									// iPad上的$.css("line-height")及$.css("font-size")會回傳px高度資訊, 不是原本的倍數及pt
									$(elm).css("margin-top", Math.floor(elmFromPos[idx] - nfo.breaks[po-1]) + "px");
								}
							}
//							else
//								$(elm).css("margin-top", "-3px");
							firstOfThisPage = false;
						}
					}*/
				});
				//$pages.append($testbody.find("> div"));	// for debug
				$testbody.remove();
				
				theLogger.debug(nfo);
				if(deferreds.length > 0) {
					$.when.apply(this, deferreds).done(function() {
						dfd.resolve(nfo);
					})
					.fail(function(errorText) {
						theLogger.error(errorText);
						dfd.reject(errorText);
					});
				}
				else
					dfd.resolve(nfo);
			}
		}
		// 2015.11.3 - Raymond, 新增判斷iOS 9以上不用timeout
		if(navigator.userAgent.search(/([0-9.]+) Mobile/gi) >= 0 && Number(RegExp.$1) < 9.0)	// 2016.11.15 bugfix
			setTimeout(doPaging, 0);
		else
			doPaging();
		return dfd.promise();
	}

	// static methods
	window.theLayoutEng = {
		
		transXmlFragToInternalFO: function(xmlFrag, dm) {
			// 1110803 Raymond 1110796 航港局的文稿沒有"NewDraft"屬性...
			try {
			// 1110802 Raymond 1110796 簽PrintXSL若沒有"發文機關"選單欄位, 不會觸發Common.fnInitIssueSoureOrg檢查不存在的發文機關而自動重設為DataXML機關選單的第一筆的問題, 在此檢查若無id為"發文機關"的a, 則補一個在xsl-region-before的static下(避免影響排版), 排版後移除
			if(dm.attr("/*/@NewDraft") == "Y") {	// 此文稿為新增
				try {
					var hasIssueOrg = dm.nodes("/*/發文機關列表/發文機關").length > 0;
				}
				catch(ex) {
					// 無發文機關節點, 不需處理
				}
				if(hasIssueOrg) {	// 有發文機關節點
					if("getElementById" in xmlFrag) {	// for Non-IE
						var nd = xmlFrag.getElementById("發文機關");
						if(!nd) {	// 沒有id為"發文機關"的欄位
							var root = xmlFrag.childNodes[0];
							var dn = root.ownerDocument.createElement("static");
							dn.setAttribute("flow-name", "xsl-region-before");
							var pn = root.ownerDocument.createElement("para");
							pn.setAttribute("show-in-page", "1");
							pn.setAttribute("aid", "dummyOrgList");	// 用一個假的ID, 以便稍後搜尋刪除
							var an = root.ownerDocument.createElement("a");
							an.setAttribute("id", "發文機關");
							an.setAttribute("sync-path", "/*/發文機關列表/發文機關/全銜");
							// 1110920 Raymond 序293 修正鐵道局的代判部稿函(稿)的PrintXSL樣版的發文機關全銜不是a, 補上dummyOrgList後未補上原本文稿檔的發文機關全銜, 導致Common.fnInitIssueSoureOrg檢查不存在的發文機關而自動重設為DataXML機關選單的第一筆的發文機關及地址的問題
							try {
								an.textContent = dm.text("/*/發文機關列表/發文機關/全銜");
							}
							catch(ex) {}
							pn.appendChild(an);
							dn.appendChild(pn);
							root.appendChild(dn);
						}
					}
				}
			}
			}
			catch(ex) {
				// 無NewDraft屬性, 不知如何處理
			}
			return new InternalFO(xmlFrag.childNodes[0], dm);
		},
		
		instanciateSOPages: function(fo, $pg, nfo, po, docObj, dm, readOnly, printMode) {  // 2014.6.18 新增唯讀模式, 2016.8.10 新增docObj參數, 2016.12.22 新增dm參數, 1140613 1140166 合併1130291, 新增printMode參數
			var dfd = $.Deferred(); // 2013.10.17 - Raymond, 改用Deferred方式, 因分頁需要
			//$pg.html("<div class='pg'><div name='topRegion'></div><div name='leftRegion'></div><div name='bodyRegion' class='unscrollable'><div name='flow'></div></div><div name='rightRegion'></div><div name='bottomRegion'></div></div>");
			if(navigator.userAgent.indexOf("Trident") >= 0)	// 2017.3.27 IE修正flow的overflow-y改成overflow, 以免跑出水平scrollbar, 航港-序591
				$pg.html("<div class='pg'><div name='topRegion'></div><div name='leftRegion'></div><div name='bodyRegion'><div name='flow' style='overflow:hidden'></div></div><div name='rightRegion'></div><div name='bottomRegion'></div><div name='topRegion1stP' style='position:absolute'></div><div name='bottomRegion1stP' style='position:absolute'></div></div>");
			else
				// 1100812 Raymond 1101017 修正醫策會的簽無簽核框, 若不顯示說明段落時, 解密條件的下拉選單會被遮掉下半部的問題
				//$pg.html("<div class='pg'><div name='topRegion'></div><div name='leftRegion'></div><div name='bodyRegion'><div name='flow' style='overflow-y:hidden'></div></div><div name='rightRegion'></div><div name='bottomRegion'></div><div name='topRegion1stP' style='position:absolute'></div><div name='bottomRegion1stP' style='position:absolute'></div></div>");	// 2015.5.20 新增上下邊界for 1stP
				$pg.html("<div class='pg'><div name='topRegion'></div><div name='leftRegion'></div><div name='bodyRegion'><div name='flow' style='overflow:visible'></div></div><div name='rightRegion'></div><div name='bottomRegion'></div><div name='topRegion1stP' style='position:absolute'></div><div name='bottomRegion1stP' style='position:absolute'></div></div>");
			// TODO: 分頁
			var $content = $pg.find("> div").css({
				width: fo.pageWidth + fo.unit,
				height: fo.pageHeight + fo.unit
			});
			var $regions = $content.find("> div");
			// 上邊界
			$regions.eq(0).css({
				display: "block",
				width: "100%",
				height: fo.pageMargin.top + fo.unit
			});
			// 左邊界
			$regions.eq(1).css({
				position: "absolute",
				top: fo.pageMargin.top + fo.unit,
				width: fo.pageMargin.left + fo.unit,
				height: (fo.pageHeight - fo.pageMargin.top - fo.pageMargin.bottom) + fo.unit
			});
			// 中間
			$regions.eq(2).css({
				display: "inline-block",
				marginLeft: fo.pageMargin.left + fo.unit,
				width: (fo.pageWidth - fo.pageMargin.left - fo.pageMargin.right) + fo.unit,
				height: (fo.pageHeight - fo.pageMargin.top - fo.pageMargin.bottom) + fo.unit,
				overflowY: "hidden"		// 2015.9.30 恢復新增
			})
			.attr("data-width", (fo.pageWidth - fo.pageMargin.left - fo.pageMargin.right) + fo.unit)	// 2015.11.12 add exta attributes
			.attr("data-height", (fo.pageHeight - fo.pageMargin.top - fo.pageMargin.bottom) + fo.unit);
			// 1111026 Raymond 陸委會序347 修正Chrome/Edge下某些案例的條列文字在瀏覽器的列印預覽介面中比列印分頁提前一個字斷行的問題(陸委會序332修正後的衍生問題)
			if(navigator.userAgent.indexOf("Chrome") >= 0)
				$regions.eq(2).css("width", "calc(" + (fo.pageWidth - fo.pageMargin.left - fo.pageMargin.right) + fo.unit + " + 1px)");
			// 2016.10.18 FIX for iPad 地址、聯絡人電話等欄位點不到問題
			$regions.eq(2).css("pointer-events", "none");
			// 右邊界
			$regions.eq(3).css({
				position: "absolute",
				top: fo.pageMargin.top + fo.unit,
				right: 0,
				/*backgroundColor: "#eef",*/
				width: (fo.pageMargin.right - 1) + fo.unit,
				height: (fo.pageHeight - fo.pageMargin.top - fo.pageMargin.bottom) + fo.unit
			});
			// 下邊界
			$regions.eq(4).css({
				display: "block",
				width: "100%",
				height: fo.pageMargin.bottom + fo.unit,
				// 1100112 Raymond 1090735 修正一般下邊界在設有首頁下邊界而內文跨到第2頁, 導致bodyRegion高度縮減, 而發生頁碼等一般下邊界區物件往上跑的問題
				position: "absolute",
				top: (fo.pageHeight - fo.pageMargin.bottom) + fo.unit
			});
			
			// 2015.5.20 支援首頁區分不同的邊界大小
			if(po == 0 && ("firstPageTop" in fo.pageMargin || "firstPageBottom" in fo.pageMargin)) {
				if("firstPageTop" in fo.pageMargin) {
					// 上邊界(1stP)
					$regions.eq(5).css({width: "100%",
										top: "0px",	// 2015.6.12 修正1邊界(1stP)位置錯誤問題
										height: fo.pageMargin.firstPageTop + fo.unit});
					// 2015.9.30 新增調整body上方空間
					if(fo.pageMargin.firstPageTop > fo.pageMargin.top) {
						theLogger.log("因樣版指定了首頁上邊界較大, 調整flow.body上方空間為" + (fo.pageMargin.firstPageTop - fo.pageMargin.top) + fo.unit + "及高度為" + (fo.pageHeight - fo.pageMargin.firstPageTop - fo.pageMargin.bottom) + fo.unit);
						$regions.eq(2).css({marginTop: (fo.pageMargin.firstPageTop - fo.pageMargin.top) + fo.unit,
											height: (fo.pageHeight - fo.pageMargin.firstPageTop - fo.pageMargin.bottom) + fo.unit});
					}
				}
				if("firstPageBottom" in fo.pageMargin) {
					// 下邊界(1stP)
					$regions.eq(6).css({width: "100%",
										top: (fo.pageHeight - fo.pageMargin.firstPageBottom) + fo.unit,
										height: fo.pageMargin.firstPageBottom + fo.unit});
					/* 1091023 Raymond 1090735 修正樣版設了首頁下邊界後, 不要調整body高度, 以免一般下邊界的物件(ex.條碼)會跑上來的問題
					// 2015.9.30 新增調整body高度
					if(fo.pageMargin.firstPageBottom > fo.pageMargin.bottom) {
						if("firstPageTop" in fo.pageMargin && fo.pageMarin.firstPageTop > fo.pageMargin.top) {
							theLogger.log("因樣版指定了首頁上及下邊界較大, 調整flow.body高度為" + (fo.pageHeight - fo.pageMargin.firstPageTop - fo.pageMargin.firstPageBottom) + fo.unit);
							$regions.eq(2).css("height", (fo.pageHeight - fo.pageMargin.firstPageTop - fo.pageMargin.firstPageBottom) + fo.unit);
						}
						else {
							theLogger.log("因樣版指定了首頁下邊界較大, 調整flow.body高度為" + (fo.pageHeight - fo.pageMargin.firstPageBottom) + fo.unit);
							$regions.eq(2).css("height", (fo.pageHeight - fo.pageMargin.firstPageBottom) + fo.unit);
						}
					}*/
				}
			}
			
			// 1130104 Raymond 1121043 修正切換文稿或重新整理稿件頁面時不要依文稿的速別及密等變換公文夾顏色
			// 控制公文夾顏色
			//try {
			//	var spd = fo.flow.getModel().text("/*/速別/@代碼");
			/*}
			catch(e) {
				theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
				var spd = docObj.speed;	// 2016.8.10 改用傳入的docObj參數取速別
			}
			if(spd == "速件" || spd == "2")
				// 1070202 Raymond 1070103 修正先開最速件, 再開速件公文時, 公文夾底色仍保持紅色的問題
				//$pg.closest(".pages").addClass("fast");	// 2016.9.19 FIX, 變色要設定在.pages那一層
				$pg.closest(".pages").removeClass("fastest").addClass("fast");	// 2016.9.19 FIX, 變色要設定在.pages那一層
			else if(spd == "最速件" || spd == "3")
				// 1070202 Raymond 1070103 修正先開最速件, 再開速件公文時, 公文夾底色仍保持紅色的問題
				//$pg.closest(".pages").addClass("fastest");	// 2016.9.19 FIX, 變色要設定在.pages那一層
				$pg.closest(".pages").removeClass("fast").addClass("fastest");	// 2016.9.19 FIX, 變色要設定在.pages那一層
			else
				$pg.closest(".pages").removeClass("fast fastest");	// 2016.9.26 FIX, 普通件要移除前次開啟速件的樣式
			try {*/
			//	var sec = fo.flow.getModel().text("/*/密等及解密條件或保密期限/密等/@代碼");
			/*}
			catch(e) {
				theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
				var sec = docObj.secret;	// 2016.8.10 改用傳入的docObj參數取密等
			}
			if(sec != "" && sec != "1" && sec != "普通" && sec != undefined)	// 2016.12.4 FIX for 文稿密等寫普通		// 2016.12.30	Fix for 讀不到密件相關欄位時，判定為普通件
				$pg.closest(".pages").addClass("secret");	// 2016.9.19 FIX, 變色要設定在.pages那一層
			else
				$pg.closest(".pages").removeClass("secret");	// 2016.9.26 FIX, 普通件要移除前次開啟密件的樣式
			*/
			// 初始化欄位名稱記錄表
			if("customMgr" in theAOL)
				theAOL.customMgr.clearFieldTable();
			
			// 初始化tokenEdit widget記錄
			//window.tokenSelector.clear();	// 清空先前記憶的tokenEdit widget
			window.tokenSelector.clearByChangeGuid(fo.flow.guid);		//2017.2.23	Leslie	效能調校，改用暫移方式處理

			if(fo.flow != undefined) {
				window.blockDetectConEditAreaHeightChange = true;	// 1130206 Raymond 1120887 開始初始化各欄位前先停止偵測簽辦意見編輯區高度變化
				for(var i=0; i<fo.flow.blocks.length; i++) {
					//fo.flow.blocks[i].instanciateSO($regions.eq(2).find("> div"), readOnly);  // 2014.6.18 新增唯讀模式
					fo.flow.blocks[i].instanciateSO($regions.eq(2).find("> div"), readOnly, printMode);  // 1140613 Raymond 1140166 合併1130291, 新增printMode
				}
			}
			// 1140618 Raymond 1140166 修正DocCompare.html環境下不會傳入dm參數
			// 1121006 Raymond 北大彙整表序256 新增檢核若是文別轉換, 則需重新整理條列序號
			//if(dm.refreshSegmentsNum == true) {
			if(dm?.refreshSegmentsNum == true) {
				let $segs = $regions.eq(2).find(".para.segment");
				for(var i=0, n = $segs.length; i<n; i++) {
					let ec = $segs.eq(i).data("editCtlr");
					if(!!ec && "updateSNum" in ec)
						ec.updateSNum();
				}
				delete dm.refreshSegmentsNum;	// 重新整理後取消標記, 避免重複執行重新整理條列序號的行為
			}
			for(var i=0; i<fo.statics.length; i++) {
				var rgn;
				switch(fo.statics[i].flowName) {
					case "xsl-region-before":
						if(fo.statics[i].onlyFirstPage)	// 2015.5.20 用新增的region5作為首頁獨立上邊界區域
							rgn = $("<div class='static' style='position: absolute; width: 100%'></div>").appendTo($regions.eq(5));
						else
							rgn = $("<div class='static' style='position: absolute; width: 100%'></div>").appendTo($regions.eq(0));
						break;
					case "xsl-region-after":
						if(fo.statics[i].onlyFirstPage)	// 2015.5.20 用新增的region6作為首頁獨立下邊界區域
							rgn = $("<div class='static' style='position: absolute; width: 100%'></div>").appendTo($regions.eq(6));
						else
							rgn = $("<div class='static' style='position: absolute; width: 100%'></div>").appendTo($regions.eq(4));
						break;
					case "xsl-region-start":
						rgn = $("<div class='static' style='position: relative'><div style='position: absolute; width: " + $regions.eq(1).css("height") + "' class='tb'></div></div>").appendTo($regions.eq(1)).children().eq(0);
						break;
					case "xsl-region-end":
						rgn = $("<div class='static' style='position: relative'><div style='position: absolute; width: " + $regions.eq(3).css("height") + "' class='tb'></div></div>").appendTo($regions.eq(3)).children().eq(0);
						break;
					default:
						theLogger.warn("邊界區static物件未設定正確的flowName: '" + fo.statics[i].flowName + "'");
						break;
				}
				for(var j=0; j<fo.statics[i].blocks.length; j++) {
					if((po == 0 && (Number(fo.statics[i].blocks[j].showInPage) & 1)) ||
					   (po > 0 && (Number(fo.statics[i].blocks[j].showInPage) & 6)))
						//fo.statics[i].blocks[j].instanciateSO(rgn, readOnly);  // 2014.6.18 新增唯讀模式
						fo.statics[i].blocks[j].instanciateSO(rgn, readOnly, printMode);  // 1140613 Raymond 1140166 合併1130291, 新增printMode
						if("refreshDim" in fo.statics[i].blocks[j])	// 2016.4.19 新增重算分散對齊
							fo.statics[i].blocks[j].refreshDim();
				}
				// 2015.5.21 新增邊界區也有簽核區域
				if(rgn && rgn.find(".sign-area").length) {	// 2016.7.19 樣版可能未設好邊界區static的flowName, 導致無rgn
					var bd = $pg.position();
					// 1150515 Raymond 1150371 修正縮放比例非100%時取得的邊界區的簽核區域的位置座標與100%時取得的不一致的問題
					var scale = 100;
					try {
						scale = $pg.closest(".viewPort").data("zoomController").currScale;
					} catch(e) {
						// zoomContoller尚未初始化時, 改從localStorage取得預設縮放比
						if($pg.closest("#leftPart").length > 0 &&
							"zoomController_zoomControl1" in localStorage &&
							typeof localStorage["zoomController_zoomControl1"] === "string" &&
							localStorage["zoomController_zoomControl1"].match(/\d+/)) {
							theLogger.warn("縮放比控制項未初始化完成, 從本地暫存區恢復上次記憶的縮放比[" + localStorage["zoomController_zoomControl1"] + "]");
							scale = Math.max(50, Math.min(400, parseInt(localStorage["zoomController_zoomControl1"])));	// 縮放比應該在50~400之間
						}
					}
					rgn.find(".sign-area").each(function(idx, sa) {
						theLogger.debug(".sign-area: " + $(sa).attr("data-id") + "," + $(sa).position().left + "," + $(sa).position().top);
						if(!("signAreas" in nfo))
							nfo.signAreas = new Array();
						
						// 1091026 Raymond 1090735 修正簽核區域設定在首頁邊界區時, 文稿新增至2頁以上後簽核區域內的簽核物件翻頁再翻回首頁時會不見的問題
						var rgnNm = rgn.parent().attr("name");
						// 1100122 Raymond 信保序188 修正簽核區域在一般邊界區時, 文稿(收文簽辦單)新增至2頁以上(後面都空白頁)後簽核區域內的簽核物件翻頁再翻回首頁時會不見的問題
						//var thisPo = (rgnNm == "topRegion1stP" || rgnNm == "bottomRegion1stP")?0:(nfo.pages-1);
						var thisPo = (rgnNm == "topRegion1stP" || rgnNm == "bottomRegion1stP")?0:po;
						
						var found = false;
						$.each(nfo.signAreas, function(i, signArea) {
							if(signArea.id == $(sa).attr("data-id")) {
								// 1091026 Raymond 1090735 修正簽核區域設定在首頁邊界區時, 文稿新增至2頁以上後簽核區域內的簽核物件翻頁再翻回首頁時會不見的問題
								//signArea.po = nfo.pages - 1;
								signArea.po = thisPo;
								// 1150515 Raymond 1150371 修正縮放比例非100%時取得的邊界區的簽核區域的位置座標與100%時取得的不一致的問題
								// 1100310 Raymond 1090602 修正邊界區的簽核區域若設定space-before或space-start為負值時, 會造成選用章戳連帶加蓋的職名章、代字章位置往上、左徧移的問題
								// 1100126 Raymond 信保序188 修正簽核區域在下邊界區時, 列印時簽核區域內的簽核物件會跑到頁面上方問題
								//signArea.left = $(sa).position().left - bd.left;
								//signArea.top = $(sa).position().top - bd.top;
								//signArea.left = $(sa).position().left + rgn.parent().position().left - bd.left;
								//signArea.top = $(sa).position().top + rgn.parent().position().top - bd.top;
								//signArea.left = $(sa).position().left + parseFloat($(sa).css("margin-left")) + rgn.parent().position().left - bd.left;
								//signArea.top = $(sa).position().top + parseFloat($(sa).css("margin-top")) + rgn.parent().position().top - bd.top;
								signArea.left = ($(sa).position().left + parseFloat($(sa).css("margin-left")) + rgn.parent().position().left) * 100 / scale;
								signArea.top = ($(sa).position().top + parseFloat($(sa).css("margin-top")) + rgn.parent().position().top) * 100 / scale;
								signArea.width = $(sa).width();
								signArea.height = $(sa).height();
								found = true;
								return false;
							}
						});
						if(!found) {
							nfo.signAreas.push({
								id: $(sa).attr("data-id"),
								// 1091026 Raymond 1090735 修正簽核區域設定在首頁邊界區時, 文稿新增至2頁以上後簽核區域內的簽核物件翻頁再翻回首頁時會不見的問題
								//po: nfo.pages - 1,
								po: thisPo,
								// 1150515 Raymond 1150371 修正縮放比例非100%時取得的邊界區的簽核區域的位置座標與100%時取得的不一致的問題
								// 1100310 Raymond 1090602 修正邊界區的簽核區域若設定space-before或space-start為負值時, 會造成選用章戳連帶加蓋的職名章、代字章位置往上、左徧移的問題
								// 1100126 Raymond 信保序188 修正簽核區域在下邊界區時, 列印時簽核區域內的簽核物件會跑到頁面上方問題
								//left: $(sa).position().left - bd.left,
								//top: $(sa).position().top - bd.top,
								//left: $(sa).position().left + rgn.parent().position().left - bd.left,
								//top: $(sa).position().top + rgn.parent().position().top - bd.top,
								//left: $(sa).position().left + parseFloat($(sa).css("margin-left")) + rgn.parent().position().left - bd.left,
								//top: $(sa).position().top + parseFloat($(sa).css("margin-top")) + rgn.parent().position().top - bd.top,
								left: ($(sa).position().left + parseFloat($(sa).css("margin-left")) + rgn.parent().position().left) * 100 / scale,
								top: ($(sa).position().top + parseFloat($(sa).css("margin-top")) + rgn.parent().position().top) * 100 / scale,
								width: $(sa).width(),
								height: $(sa).height()
							});
						}
					});
				}
			}
			// 1110802 Raymond 1110796 簽PrintXSL若沒有"發文機關"選單欄位, 不會觸發Common.fnInitIssueSoureOrg檢查不存在的發文機關而自動重設為DataXML機關選單的第一筆的問題, 在此檢查若有id為"dummyOrgList"的para, 則移除
			var pl = [];
			fo.find("Para", pl);
			for(var j=0; j<pl.length; j++) {
				if(pl[j].aid == "dummyOrgList") {
					if("$para" in pl[j]) {
						theLogger.warn("移除id為'dummyOrgList'的Para");
						pl[j].$para.remove();
					}
					else
						theLogger.warn("應移除id為'dummyOrgList'的Para, 但尚未生成$para");
					break;
				}
			}
			
			// 1120607 Raymond 1120515 新增判斷環境變數是否有設定, 若有設定則判斷OwnRoleID是否符合設定之一, 若不符合則不允許套用騎縫章, 未設定環境變數時允許套用騎縫章
			var allowUseSealMark = true;
			// 1140618 Raymond 1140166 修正DocCompare.html環境下不會有theSSO.User
			//var sAllowUseSealMarkRoles = theSSO.User.EnvSettings.get("WE_ALLOW_USE_SEALMARK_ROLES");
			var sAllowUseSealMarkRoles = theSSO?.User?.EnvSettings.get("WE_ALLOW_USE_SEALMARK_ROLES");
			if(!!sAllowUseSealMarkRoles) {
				var allowUseSealMarkRoles = sAllowUseSealMarkRoles.split(",");
				if(allowUseSealMarkRoles.indexOf(docObj.ownRoleId) < 0) {
					theLogger.log("公文目前流程點的角色(OwnRoleID:" + docObj.ownRoleId + ")不符合環境變數「WE_ALLOW_USE_SEALMARK_ROLES」設定(" + sAllowUseSealMarkRoles + "), 禁止套用騎縫章");
					allowUseSealMark = false;
				}
			}
			
			// 分頁
			var t0 = new Date();
			console.warn("instanciateSOPages()開始分頁...");
			// 1091023 Raymond 1090735 新增傳入fo參數, 以供分頁時判斷首頁減去上下邊界後的可容納高度
			//Paging($content, nfo, po, dm).done(function() { // 2013.10.17 - Raymond, 改用Deferred方式分頁, 2016.12.22 新增傳入DM參數
			//Paging($content, nfo, po, dm, fo).done(function() { // 2013.10.17 - Raymond, 改用Deferred方式分頁, 2016.12.22 新增傳入DM參數
			Paging($content, nfo, po, dm, fo).done(function(overflowElem) { // 1120816 Raymond 1120503 新增回傳超出單頁範圍的自訂表格條列物件
				console.warn("分頁計算花了 " + (new Date() - t0) + " ms");
				// 1120607 Raymond 1120515 新增判斷允許套用騎縫章時才套用騎縫章
				// 1140613 Raymond 1140166 合併1130291, 無thePublicRsrc情況
				//if(nfo.pages > 1) {
				//if(nfo.pages > 1 && allowUseSealMark) {
				if(nfo.pages > 1 && allowUseSealMark && !!window.thePublicRsrc) {
					t0 = new Date();
					thePublicRsrc.getSealMarkImage(theUserInfo.OrgID, theUserInfo.DepartID)
						.done(function(fil, size) {
							
							var docNo = nfo.docNo;
							
							if(po > 0) {   // 非首頁加蓋左騎縫章
								var $sm = $("<div style='position: absolute'><img/><span style='position:absolute; top:0; left:0;'></span></div>").appendTo($content);
								$sm.find("img").attr("src", fil);
								
								// 2015.9.11 新增亂數seed
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
								if(p[0] > p[1]) {	// 若章是橫向的, 修正裁切的rect(top, right, bottom, left)
									$sm.css("clip", "rect(-" + (p[0] / 2) + "mm, " + ((Number(p[1]) + Number(p[0])) / 2) + "mm, " + (p[0] / 2 + 10) + "mm, " + (p[0] / 2) + "mm)");
									$sm.find("span").css("left", (p[1] / 2 + 2) + "mm");
								}
							}
							if(po < (nfo.pages - 1)) {    // 非末頁加蓋右騎縫章
								var $sm = $("<div style='position: absolute'><img/><span style='position:absolute; top:0; left:0;'></span></div>").appendTo($content);
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
									right: (cx - (p[0] / 2)) + "mm",
									clip: "rect(-4mm, " + (Number(p[0]) / 2) + "mm, " + (Number(p[1]) + 4) + "mm, " + "-4mm)"
								});
								if(p[0] > p[1])	// 若章是橫向的, 修正裁切的rect(top, right, bottom, left)
									$sm.css("clip", "rect(-" + (p[0] / 2) + "mm, " + (p[0] / 2) + "mm, " + (p[0] / 2 + 10) + "mm, 0mm)");
							}
						});
					console.warn("蓋騎縫章花了 " + (new Date() - t0) + " ms");
				}
				dfd.resolve(fo, overflowElem);	//2017.2.23	Leslie	將fo回傳出去，用於後續設定tokenEdit狀態, 1120816 Raymond 1120503 新增回傳超出單頁範圍的自訂表格條列物件
			})
			.fail(function(errorText) {
				dfd.reject(errorText);
			});
			
			return dfd.promise();
		},
		
		// 2015.9.30 新增更新分頁及頁次, 新增段落時會叫用
		refreshSOPages: function($pg, nfo, po, docObj, dm, fo, callback) {	// 2016.12.22 新增dm參數, 1091023 Raymond 1090735 新增fo參數, 1120607 Raymond 1120515 新增docObj參數
			var $content = $pg;
			
			// 1120607 Raymond 1120515 新增判斷環境變數是否有設定, 若有設定則判斷OwnRoleID是否符合設定之一, 若不符合則不允許套用騎縫章, 未設定環境變數時允許套用騎縫章
			var allowUseSealMark = true;
			// 1140618 Raymond 1140166 修正DocCompare.html環境下不會有theSSO.User
			//var sAllowUseSealMarkRoles = theSSO.User.EnvSettings.get("WE_ALLOW_USE_SEALMARK_ROLES");
			var sAllowUseSealMarkRoles = theSSO?.User?.EnvSettings.get("WE_ALLOW_USE_SEALMARK_ROLES");
			if(!!sAllowUseSealMarkRoles) {
				var allowUseSealMarkRoles = sAllowUseSealMarkRoles.split(",");
				if(allowUseSealMarkRoles.indexOf(docObj.ownRoleId) < 0) {
					theLogger.log("公文目前流程點的角色(OwnRoleID:" + docObj.ownRoleId + ")不符合環境變數「WE_ALLOW_USE_SEALMARK_ROLES」設定(" + sAllowUseSealMarkRoles + "), 禁止套用騎縫章");
					allowUseSealMark = false;
				}
			}
			
			// 分頁
			var t0 = new Date();
			console.warn("refreshSOPages()開始分頁...");
			// 1091023 Raymond 1090735 新增傳入fo參數, 以供分頁時判斷首頁減去上下邊界後的可容納高度
			//Paging($content, nfo, po, dm).done(function() { // 2013.10.17 - Raymond, 改用Deferred方式分頁, 2016.12.22 新增dm參數
			Paging($content, nfo, po, dm, fo).done(function() { // 2013.10.17 - Raymond, 改用Deferred方式分頁, 2016.12.22 新增dm參數
				console.warn("分頁計算花了 " + (new Date() - t0) + " ms");
				if(callback && $.isFunction(callback)) {
					t0 = new Date();
					callback();
					console.warn("回呼函式花了 " + (new Date() - t0) + " ms");
				}
				// 1120607 Raymond 1120515 新增判斷允許套用騎縫章時才套用騎縫章
				//if(nfo.pages > 1) {
				if(nfo.pages > 1 && allowUseSealMark) {
					t0 = new Date();
					thePublicRsrc.getSealMarkImage(theUserInfo.OrgID, theUserInfo.DepartID)
						.done(function(fil, size) {
							
							var docNo = nfo.docNo;
							
							if(po > 0) {   // 非首頁加蓋左騎縫章
								var $sm = $("<div style='position: absolute'><img/><span style='position:absolute; top:0; left:0;'></span></div>").appendTo($content);
								$sm.find("img").attr("src", fil);
								
								// 2015.9.11 新增亂數seed
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
								if(p[0] > p[1]) {	// 若章是橫向的, 修正裁切的rect(top, right, bottom, left)
									$sm.css("clip", "rect(-" + (p[0] / 2) + "mm, " + ((Number(p[1]) + Number(p[0])) / 2) + "mm, " + (p[0] / 2 + 10) + "mm, " + (p[0] / 2) + "mm)");
									$sm.find("span").css("left", (p[1] / 2 + 2) + "mm");
								}
							}
							if(po < (nfo.pages - 1)) {    // 非末頁加蓋右騎縫章
								var $sm = $("<div style='position: absolute'><img/><span style='position:absolute; top:0; left:0;'></span></div>").appendTo($content);
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
									right: (cx - (p[0] / 2)) + "mm",
									clip: "rect(-4mm, " + (Number(p[0]) / 2) + "mm, " + (Number(p[1]) + 4) + "mm, " + "-4mm)"
								});
								if(p[0] > p[1])	// 若章是橫向的, 修正裁切的rect(top, right, bottom, left)
									$sm.css("clip", "rect(-" + (p[0] / 2) + "mm, " + (p[0] / 2) + "mm, " + (p[0] / 2 + 10) + "mm, 0mm)");
							}
						});
					console.warn("蓋騎縫章花了 " + (new Date() - t0) + " ms");
				}
			});
		},
		
		// 1101029 Raymond 1101199 修正Chrome V94、95版列印預覽時有些標楷體字型會破字的問題, 產生列印內容時傳入useCNSFont參數若為true, 則在Para.instanciateSO時在font-family CSS style加入"全字庫正楷體"
		// 2016.7.25 新增列印用排版
		//instanciateFOPages: function(fo, opts, $pages) {
		instanciateFOPages: function(fo, opts, $pages, useCNSFont) {
			var dfd = $.Deferred();
			// 內容開始
			var $ctx = $("<div style='width:" + (fo.pageWidth - fo.pageMargin.left - fo.pageMargin.right) + fo.unit + "'></div>").appendTo("body");
			// 1111026 Raymond 陸委會序347 修正Chrome/Edge下某些案例的條列文字在瀏覽器的列印預覽介面中比列印分頁提前一個字斷行的問題(陸委會序332修正後的衍生問題)
			if(navigator.userAgent.indexOf("Chrome") >= 0)
				$ctx.css("width", "calc(" + (fo.pageWidth - fo.pageMargin.left - fo.pageMargin.right) + fo.unit + " + 1px)");
			if(fo.flow != undefined) {
				for(var i=0; i<fo.flow.blocks.length; i++) {
					// 1101029 Raymond 1101199 修正Chrome V94、95版列印預覽時有些標楷體字型會破字的問題, 產生列印內容時傳入useCNSFont參數若為true, 則在Para.instanciateSO時在font-family CSS style加入"全字庫正楷體"
					if(useCNSFont === true)
						fo.flow.blocks[i].instanciateSO($ctx, true, "useCNSFont");  // printMode參數改成"useCNSFont", 不必動目前巢狀傳遞參數, 也可維持目前if(printMode)或if(!printMode)的判斷方式可以繼續生效
					else
					fo.flow.blocks[i].instanciateSO($ctx, true, true);  // 2016.7.25 新增列印模式
				}
			}
			// 1101105 Raymond 1101199 修正Chrome V94、95版列印預覽時有些標楷體字型會破字的問題, 產生列印內容時傳入useCNSFont參數若為true, 則在Para.instanciateSO時在font-family CSS style加入"全字庫正楷體"
			//PagingP($ctx, fo, opts, $pages).done(function(nfo) {
			PagingP($ctx, fo, opts, $pages, useCNSFont).done(function(nfo) {
				
				dfd.resolve(nfo, $pages);
			})
			.fail(function(errorText) {
				dfd.reject(errorText);
			});
			return dfd.promise();
		}
	}
	
	if(inst != undefined)
		inst.finish();
	
}();
