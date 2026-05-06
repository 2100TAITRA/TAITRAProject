/* jshint -W100 */

/*
DATE	MGRNO		SA		PG		Desc
1070115 1061276		David 	Eric	傳送/儲存公文提示錯誤訊息內容改善.
1061024 1060975		David 	Eric	[預排流程]功能使用, 不排除會辦公文.
1061018 1060748		David	Eric	修改[預排流程]設定UI
1050914 			Eric    Eric    若docObj.msgId未定義或為空字串, 則判定為檢閱開啟(上方工具列UI/儲存作業)
1050906 			Eric    Eric    公文是否核決, 新增APP_ROLE_ID判定.
1050827 			Eric    Eric    關閉公文時, 非唯讀開啟(沒有uiParam或uiParam.aol_readonly_mode不為true)時才更新todolist項目
1050825 			Eric    Eric    儲存公文時, 若ODWWKF有異動, 一併上傳ODWWKF-XX.XML檔
1050824 			Eric    Eric    顯示傳送設定子視窗前先關閉[設定]popup-menu
1050823	   		    Eric	Eric	todolist唯讀公文關閉時, 自動開啟公文檢索側屜問題. (在theAOL.docObj記錄開啟公文時的uiParam, 關閉時判定)
1050818	   		    Eric	Eric	開啟公文時, 依公文為簽辦或唯讀等開啟模式顯示/隱藏右上方選單項目
1051007				Raymond	Raymond	修正getUserInfo之前, 先讀取working_doc_obj, 以免傳入錯誤的ownOUId參數到getUserInfo
1060425 1060285		Raymond	Raymond	修正comNo->comDoc, 併案->併陳
1060425 1060276		Raymond	Raymond	修正切換到子文時, 傳送、儲存等UI全隱藏, 切回母文時再顯示, 以避免本來母文因部分檢核不通過不能傳送, 切到子文時卻可以通過某些檢核而傳送成功的問題
1060425				Raymond	Raymond	修正子文切換回母文時, 因106/1/5的修改項目導致出現Exception而無法切回母文顯示的問題
1060510 1060307		Raymond	Raymond	新增港務公司、標檢局的核章邏輯(AOL_ENHANCED_SIGNET_CHECK_MODE = 'P')
1060511 1060307		Raymond Raymond	依Jerry要求, 新增判斷"綜簽"為簽類文別
1060518	1060269		Raymond	Raymond	檢核目前追蹤修訂模式是否為完稿模式, 若不是的話, 提示訊息後, 切回完稿模式
1060712	1060576		Eric	Eric	由公文檢索開啟線上簽核公文, 於檢索側屜半開時關閉會造成系統異常問題修正
1060721	1060593		Raymond	Raymond	實作手寫筆設定功能
1060821	1060703		Raymond	Raymond	新增簽核物件檢閱窗格功能
1060825	1060515		Leslie	Leslie	配合高港警客製化訊息，於呼叫儲存前檢核時，增加傳入當前作業別"列印"字樣
1060907	1060453		Leslie	Leslie	新增鐵工局客製化密件邏輯
1060911	1060739		Raymond	Raymond	修正紙本簽核公文為不可顯示於參照窗格做歷史檢視、多次參照檢視不同公文後已無前後頁會重複出現問題
1061006				Raymond	Raymond	修正當參照公文與簽辦公文同文號時, 進一步檢查MsgId是否一致, 不一致則重新下載參照公文
1061018	1060453		Leslie	Leslie	[退單補修]鐵工局密件邏輯
1061023 1060282		Raymond	Raymond	新增點擊子文頁籤時顯示列印選單
1061023 1060952		Raymond	Raymond	新增選單核取函式(chkStat)多傳入evt參數, 供參照窗格區別不同窗格, for 參照窗格也提供檢視簽核物件清單功能
1061109	1060452		Raymond	Raymond	新增簽辦意見窗格功能
1061120	1061055		Leslie	Leslie	新增於線上簽核公文要號前，先檢核附件是否均已完成匯出頁面
1070112	1060452		Raymond	Raymond	修正簽辦意見窗格的樣式避免IE下字串太長不會自動折行
1070124	1061273		Raymond	Raymond	新增檢查環境變數「AOL_ENABLE_SIGNCOMMENT_PANEL」, 設為Y才啟用簽辦意見窗格功能
1070130	1061332		Leslie	Leslie	[鐵工局密件邏輯]增加處理開會通知單類型主旨
1070320	1070363		Raymond	Raymond	重設簽辦意見窗格項目從#btnSignCmtPanel的click移出, 供公文載入或reload後呼叫重設
1070323	1070363		Raymond	Raymond	檢查環境變數, 設為Y是啟用簽辦意見窗格功能, 才需要初始化簽辦意見
1070331	-------		Raymond	Raymond	初始化簽辦意見時, 檢查是否為紙本簽核, 若是則不繼續取封裝檔內容, 因為紙本簽核不會載入封裝檔
1070331	-------		Raymond	Raymond	修正公文檢索或DocView開啟時的docObj, 連ownUserId都沒有, _setupSignComment時發生Exception問題
1070331	-------		Raymond	Raymond	修正在AKS116開啟DocView時, 取得UI狀態時沒有傳入uiParam導致aol_readonly_mode及aol_disable_save模式判斷錯誤造成Exception問題
1070411	1070463		Raymond	Raymond	初始化簽辦意見清單時以公文的ownOU、ownRole及目前使用者的姓名資訊, 顯示單位、角色、姓名, 歷史流程點的單位、角色、姓名直接使用封裝檔所記錄的名稱, 不用OrgInfo反查, 以避免因調離單位等原因找不到對應資訊而當掉
1070416	-------		Raymond	Raymond	修正調閱時docObj沒有完整使用者的ownOUId、ownRoleId等資訊, 會跳Exception問題
1070607	1060862		Raymond	Raymond	IE不支援radio button的CSS customize須改用label做, 這裡配合調整對象改為label
1070620	1070197		Raymond	Raymond	非會辦時會辦單位新增的文稿不核章, 記憶UI按鈕狀態需延後至第一頁初始完成後, 避免切換子文/分會文再切回母文/主辦文時部份UI按鈕不會恢復顯示問題
1070830	1070936		Raymond	Raymond	修正允許來文簽辦時仍會略過檢核職名章的問題
1070921	-------		Raymond	Raymond	修正母文(or併陳子文)只有來文頁面時, 主文第1頁初始化後未記憶到UI按鈕狀態導致切換子文再切回母文仍出現UI按鈕不會顯示的相同問題
1071008	1070937		Raymond	Raymond	登出再登入後因為沒有重新整理AOL畫面, 若簽辦意見窗格已展開要更新選單勾選狀態
1071023	-------		Raymond	Raymond	RRB_ENABLE_SCRECT_DOC_LOGIC=Y(鐵工局客製需求)避免因簽稿會核單禁止非承辦人異動文稿等特殊限制, 造成儲存時轉圈圈問題
1080125	1070200		Leslie	Leslie	中興大學傳送前檢核是否已看過參考附件
1080130	1080014		Raymond	Raymond	新增開啟線上簽核公文時先判斷整個封裝檔有任何流程點加過簽署意見或前一次手動勾選要顯示簽辦意見窗格的話, 就顯示簽辦意見窗格
1080319	1080210		Raymond	Raymond	修正P模式(AOL_ENHANCED_SIGNET_CHECK_MODE='P')核章功能的比對新舊簽類文稿邏輯, 在調換新舊簽類文稿順序後會導致舊的簽類文稿也要求核章的問題
1080923 1080339     Kevin   Eric    jQuery 3.0 upgrade
1081114	1080962		Raymond	Raymond	新增AOL_ENABLE_PASS_CHECK_SIGNET_NG環境變數設為Y時, 核章未過僅提示警告, 仍允許傳送(合併成大1070537功能)
1081218	-------		Raymond	Raymond	修正文字意見的XSS漏洞, 並轉換文字意見的<br>為折行字元, 以符合未修正漏洞前的顯示行為
1081227	1081160		Raymond	Raymond	應鐵道局主任要求修改核章未通過且環境變數AOL_ENABLE_PASS_CHECK_SIGNET_NG設為Y時提示是否繼續的訊息文字
1081230	1080194		Raymond	Raymond	配合fnWebEditSave改為非同步呼叫, saveView也改為非同步
1090106	1081179		Raymond	Raymond	新增核章時判斷機關暱稱是否為MPB(航港局), 若是則修改未通過時的訊息格式及改為confirm允許不蓋章傳送
1090115	1081179		Raymond	Raymond	P核章模式(原為港務公司邏輯, 可能是航港局沿用)時判斷機關暱稱是否為MPB(航港局), 若是則修改未通過時的訊息格式及改為confirm允許不蓋章傳送
1090224	1081090		Raymond	Raymond	從子文點回母文時, 增加檢查第一次是否有儲存UI狀態記錄, 若無或UI狀態記錄異常(全都隱藏), 則重新執行更新工具列updateAOLTopToolbar
1090430	1090261		Raymond	Raymond	修正簽辦意見窗格的各流程點人員名稱, 若是代理公文或代理流程點, 在人名後加「(代)」字
1090601	1081179		Raymond	Raymond	航港局客製的核章邏輯仍有意見先取消, 機關暱稱先改掉
1090804	1090409		Raymond	Raymond	新增判斷資料夾及異動別是否符合應產生抄本頁面的設定, 是則檢查可發文文稿上是否有簽核物件, 若有則提示警告直接刪除簽核物件後通過或取消傳送
1090818	1090409		Raymond	Raymond	南護要求繕校總發等角色開啟參照窗格時, 若參照窗格中已有別筆參照公文則不要詢問, 直接替換成本文的歷史檢視
1090928	1090559		David	David	新增信保客製化欄位傳送前檢核
1091013	1090564		Raymond	Raymond	修正調閱信保特殊模式的公文會發生ODWDCM為null, 而誤判為正常線上簽核公文的問題
1091015	1090719		Leslie	Leslie	配合客製化功能可增修於客製化JS中，調整載入客製化模組行
1091021	1090564		Raymond	Raymond	修正分會會畢單位公文支援信保特殊模式, 新增記錄及傳入initConFolio(呼叫ODMSSP的GetTreadFlowInfo)回傳的strDraftSourceType參數
1091116	1090801		David	Leslie	信保基金提供開啟EDT232匯入功能
1091124	1090564		Raymond	Raymond	信保特殊模式檢查任一文稿有章即可
1091127	1090564		Raymond	Raymond	修正信保特殊模式公文依MenuRule決定是否檢核職名章
1091127 1090786		Eric	Eric	新增log以追查公文傳送/關閉後待辦清單頁未拉出問題.
1091229	信保序131	Raymond	Raymond	修正信保特殊模式公文在參照窗格開啟歷史檢視模式時因無ODWDCM可判斷為特殊模式而在翻頁時有文稿頁籤未正確定位的問題
1100303	1100092		Raymond Raymond	比照點擊文稿頁籤及翻頁限制, 紙本公文不允許編輯內文時, 亦不可用快捷鍵執行列印簽核文件
1100317	1100197		Raymond Raymond	修改信保特殊模式(ODWDCM.DRAFT_SOURCE_TYPE=2)公文核章邏輯為所有文稿皆須有職名章
1100319	1090853		Raymond Raymond	所有稿件皆需蓋職名章的設定下, 受會時若有2筆以上簽稿會核單, 僅檢核一筆簽稿會核單有章即通過
1100329	1090927		Raymond Raymond	應對小螢幕裝置, 調整選單及其他UI高度, 及開啟或關閉參照窗格時, 判斷若是小螢幕裝置則隱藏或恢復顯示儲存傳送區及傳送對象區
1100512	1090821		Raymond Raymond	新增判斷外呈會公文的本機關流程點Id中間會多機關代碼, 要取最末個"_"後的真msgId, 才能顯示本機關各流程點的簽署意見在簽辦意見窗格
1100519 1100093 	Eric	Eric 	彙併辦母文傳送時一併封裝子文功能實作.
1100531	1100296		Raymond Raymond	自動新增文稿批示單功能啟用時, 傳送及核章前檢核公文內必須有存查批示單或文稿批示單才可傳送
1100610	1100659		Raymond Raymond	全域物件gCustomMgr改在RD-CustomMgr.js一載入就產生, 避免重複new, 造成客製化註冊的callback不見, 發文機關選單未初始化(出現"測試機關"選項)的問題
1100615	1100296		Raymond Raymond	修正分文、分辦等資料夾不允許編輯內文時, 不需要檢核公文內必須有存查批示單或文稿批示單即可傳送
1100708	1100648		Raymond Raymond	簽辦意見窗格新增"辭庫"按鈕, 新增支援分文稿記錄簽核意見功能, 支援高大客製化傳送前檢核核決長官是否有在每個可發文文稿加註簽核意見
1100715	1100648		Raymond Raymond	判斷若是行動版傳送區面板顯示時, 調整簽辦意見窗格上邊界, 避免被面板遮到及修正iPad下(非SDLMode)隱藏傳送對象區後不會恢復的問題
1100715	1100854		Raymond Raymond	新增[高大客製化]簽核意見時間顯示年月日時分秒
1100819	1100431		Raymond Raymond	載入及關閉公文時控制搜尋面板重置與關閉
1100831	1100648		Raymond Raymond	修正調整寬度會使簽辦意見窗格右側出現一小段空區域及自動顯示簽辦意見窗格後, 再開啟無簽辦意見公文, 會顯示無清單項目的簽辦意見窗格區域問題
1100901	1100750		Raymond Raymond	取得原本記錄在COM_NO中的子文COMBINE_TYPE傳入子文公文物件, 若COMBINE_TYPE不是"3"(代表"併辦")則不要載入文稿管理檔, 僅顯示來文內容及其附件
1100906	1090860		Raymond Raymond	開啟紙本公文時, 新增判斷RULE的metaDataM第3碼, 若為'R'則以唯讀模式開啟紙本公文
1100923	1100296		Raymond Raymond	修正待處理-主辦資料夾TX_NAME為(線上簽核)"退回分辦人員"及(紙本簽核)"退回"時, 不需要檢核公文內必須有存查批示單或文稿批示單即可傳送
1100927	1100296		Raymond Raymond	修正TX_NAME為"歸檔"時, 不需要檢核公文內必須有存查批示單或文稿批示單即可傳送
1100928	1100648		Raymond Raymond	修正在啟用分文稿記錄簽核意見功能時, 點彙併辦子文再點母文會發生轉圈圈的問題
1101025	1101259		Raymond Raymond	修正檢索側屜公文的第2次開啟參照窗格的歷史檢視時, 前一筆歷史檢視公文不會換掉的問題
1101108	1090860		Raymond Raymond	新增另一個紙本公文唯讀模式專用Flag, 與uiStatus.readOnly分開, 以修正唯讀紙本公文的工具列不會顯示傳送對象、傳送及儲存鈕的問題
1101122	高大序35	Raymond Raymond	修正簽辦意見窗格的簽核意見文字方塊在IE下輸入Enter會變空白而非折行的問題及簽核意見有換行字元時不會折行的問題
1101208	1101381		Raymond Raymond	修正第一次開啟有簽核意見公文時, 在螢幕寬度1280以下可能發生簽辦意見窗格顯示的寬度大於開關簽辦意見窗格時的寬度的問題
1110119 1101562     Eric    Eric    @PC參閱窗格開啟時原解析度<1200, 使用者異動browser解析度>1200後再關閉參閱窗格, AOL上方UI未回復問題修正.
1110316	1101388		David	David	紙本簽核依參數判斷是否顯示流程設定按鈕
1110317	1101578		Eric 	Raymond	新增附件編輯監測服務模組控制介面
1110321	1101416		David	Joe		依系統參數調整回閱顯示
1110407	1101578		Eric 	Raymond	AOL首次載入公文時, 檢查若未啟動附件編輯模組, 則提示警告一次後, 以舊邏輯下載檔案方式處理附件頁籤點擊行為
1110411	1101578		Eric 	Raymond	判斷是否啟用附件編輯功能從環境變數改為全域變數
1110415	1101578		Eric 	Raymond	關閉參照窗格公文前檢核是否有開啟編輯中附件未關閉
1110422	1110318		Raymond Raymond	修正先在主頁開啟一筆線上簽核公文, 再由AKI800查詢開啟另一筆線上簽核公文並用DocView開啟後, 再於主頁開啟參照窗格但載入的卻是用DocView開啟的那一筆公文的問題
1110503	考試院序66	Raymond Raymond	修正草稿公文開啟參照窗格顯示無歷史流程可檢視訊息後無法關閉參照窗格的問題, fix typo getRefolio ->getRefFolio
1110629	1110629		Leslie	Leslie	配合考試院UI/UX需求，修改傳送選單與相關行為
1110711	1110728		Raymond	Raymond	「參考公文設定」鈕從「設定」鈕選單搬到「齒輪」鈕選單下
1110810	考試院序187	Raymond Raymond	修正P核章模式下啟用來文簽辦時, 不會檢查來文頁面上的職名章, 導致跳出空字串訊息, 中止傳送問題
1110829	1110725		Raymond	Raymond	修改子文COM_COMBINE_TYPE為"1"為"併辦", 非"1"為"併陳", 以修正COM_COMBINE_TYPE為空值時子文文號頁籤顯示為"併辦"的問題
1110831	1110762		Raymond	Raymond	修正文稿編輯新增稿件編輯並儲存後, 不是按「關閉」, 而是按瀏覽器的上一頁或F5, 再重新登入公文系統後, 開啟之前編輯的公文, 原本已儲存的新文稿內容會是未編輯過的樣版本來內容的問題
1111011	1110885		Raymond	Raymond	文號選單新增「匯入銓敘系統文稿」功能選單項目
1111024	1110866		Raymond	Raymond	新增銓敘部客製化簽核意見傳送前檢核有發文文稿須為「發」, 無發文文稿未輸入時, 提示警告訊息
1111027	1110864		Raymond Raymond	合併1101464、1101468, 新增判斷環境變數「AOL_SHOW_MY_FINAL_COMMENT」為'Y'時, 簽辦意見窗格預設為顯示, 判斷為行動版時在齒輪按鈕選單中顯示「簽辦意見窗格」項目, 簽辦意見窗格新增加「意見管理」按鈕
1111117	1111069		Raymond Raymond	取消呼叫FolioModel.saveTemp(), 且目前已無#btn_close_temp按鈕, 以避免不明步驟造成載入不同筆公文的文稿取代目前公文的文稿的問題
1111122	1110863		Leslie	Leslie	新增下載所有附件子視窗
1111124	1110881		David	Raymond	新增校正報送案別功能
1111125	1110920		Leslie	Leslie	新增可設定顯示併案的來文機關
1111129	1101416		David	Raymond	修正在文號選單的「回閱」項目前新增其它選單項目後, 指定將第「9」項目更名會更錯項目的問題
1120217	1110881		David	Leslie	銓敘部-序14，新增支援紙本草稿轉正式公文
1120220 1111363     Eric    Eric    可隱藏文字編輯工具列
1120224	1111225		Raymond	Raymond	新增支援內部意見相關功能
1120313	1120203		Kevin	Cloud	弱掃修正Client DOM Stored XSS
1120503	-------		David	David	(銓敘部問題彙整表序278)紙本草稿轉正式公文支援代理人處理
1120703 -------     Eric    Eric    (各機關問題彙整表 序97)使用背景傳送時,第一份公文會跳undefined並且不會自動關閉.
                                    => merge: 2023.5.2 - 1111455 Eric, 公文開啟完成後立即初始化傳送子視窗
1120818	1120503		Raymond	Raymond	新增插入表格功能, 依環境變數"WE_ENABLE_CUSTOM_TABLE"設定啟用
1121222	-------		Leslie	Leslie	[卡驗收序32]新增客製化可設定功能鍵
1130322	1130204		Raymond	Raymond	修正iPad上因無標楷體且字體Metrics比桌機小, 微調字距以便與桌機的排版斷行結果接近
1130426	中榮序97	Raymond	Raymond	新增類似一代雙螢幕模式的「另開附件視窗」功能, 及關閉公文時檢查若有開雙視窗模式的話, 在開關主視窗的公文後一併關閉DocView子視窗的公文
1130426	中榮序93	Raymond	Raymond	新增判斷環境變數「AOL_REFVIEW_IN_RIGHT」設為"Y"時, 將簽辦及參照窗格左右對調
1130503	中榮序97	Raymond	Raymond	新增判斷機關暱稱為TVGH(中榮)時, 將客製化功能鍵由"B"主題色換成"C"主題色, 及修正客製化功能鍵數量少於3時, 最後一個功能鍵沒套到右邊圓角的style問題
1130503	中榮序96	Raymond	Raymond	新增判斷機關暱稱為TVGH(中榮)時, 啟用「機案功能」按鈕, 原本點擊文號頁籤會出現的選單, 變成點擊「機案功能」按鈕才會出現
1130510	1120888		Raymond	Raymond	新增判斷環境變數「AOL_MY_SIGNCOMMENT_READONLY」設為Y時, 簽核意見唯讀, 且不顯示「辭庫」按鈕, 判斷環境變數「AOL_SIGNCOMMENT_OLDER_FIRST」設為Y時, 簽核意見清單的上至下排序規則改為從舊到新
1130514	中榮序106	Leslie	Leslie	公文製作頁面功能選單，位置調整需求
1130517	1120888		Raymond	Raymond	合併屏東1120943、1121105, 新增判斷環境變數「AOL_SIGNCOMMENT_HIDE_SAME_LV1OU」設為"Y"時, 簽辦意見窗格的非承辦單位且代碼95以下的流程點, 只顯示相同一級單位的最後一個流程點
1130521	1120888		Raymond	Raymond	合併屏東縣序306, 再修正當環境變數「AOL_SIGNCOMMENT_HIDE_SAME_LV1OU」設為"Y"時, 簽辦意見窗格的流程點若無簽核意見, 則改顯示前一個同單位流程點, 流程點若非OWN_OU_ID且非承辧單位時, 顯示為一級單位名稱, 若為OWN_OU_ID或承辦單位的同一級單位流程點時, 顯示角色及姓名
1130708	1130637		Raymond	Raymond	儲存上傳預排流程檔完成後清除wwkfModified屬性
1130805 中榮序171	Raymond	Raymond	修正檢核核示語詞的關聯動作與結案類型不一致時, 顯示的核示語詞關聯動作名稱變成undefined的問題
1130809	1130313		Raymond	Raymond	合併1111007(1100394), 離線模式
1130813	1130313		Raymond	Raymond	新增判斷離線模式下關閉公文時不要updateDocObj
1130814	1130313		Raymond	Raymond	新增判斷若是離線模式, 也不要自動開啟次筆公文
1131007	1130987		Leslie	Leslie	新增可依設定啟用放大版的簽核功能鍵UI
1131112	序256		Leslie	Leslie	修正放大版功能鍵，若公文無文稿時的異常問題
1131204	1131151		Leslie	Leslie	修正因單位代碼含非數字部分，造成判斷一層決行與虛擬單位錯誤的問題
1140321	1131289		David	Leslie	增加可傳送給流程有經過的人員
1140408	1140401		Raymond	Raymond	比照一代, 修正為非會辦單位才能看到分會中公文的已會畢的分會單位頁籤
1140412	1131309		Leslie	Leslie	修正傳送相關功能鍵文字錯誤
1140422	1131282		Raymond	Leslie	[退輔會]增修草稿依設定是否啟用自動要號功能
1140424	問題序79	Leslie	Leslie	[北榮]針對使用者於傳送等候時主動關閉公文，增加顯示警示訊息並取消簽署
1140505	問題序81	Leslie	Leslie	[信保]調閱模式已無需重建ODWDCM，直接用ViewDoc建立的即可
1140515	1140474		Raymond	Raymond	修改記憶簽辦意見窗格是否顯示的變數從localStorage(show_sign_comment_panel)改為UserEnvSetting(USER_SHOW_SIGN_COMMENT_PANEL)
1140623	1131303		Raymond	Raymond	新增錯別字校正窗格及簽辦意見可錯別字校正功能
1140626	1131303		Raymond	Raymond	新增切換至來文內容頁籤或開啟信保特殊模式公文無dm時的錯誤處理
1140701	1140919		Raymond	Raymond	是否啟用自動新增文稿批示單功能, 改用擴充後的「WE_AUTO_GEN_文稿批示單」環境變數的第1變數判定
1140709	1140392		Leslie	Zen		"刪除本件公文"為Disable時，顯示tooltip
1140722	1140808		David	Leslie	新增選單「公文續管」可開啟EDT411
1140723	1141011		Kevin	Leslie	弱掃修正[Client DOM Stored XSS]
1140801	1141011		Kevin	Leslie	弱掃修正[Client DOM Stored XSS]
1140815	1141232		Raymond	Raymond	修正離線模式下即使有設定錯別字校正服務網址也不要啟用錯別字校正功能
1140819	1140818		Raymond	Raymond	新增簽核工具列設定
1140828	1140762		Raymond	Raymond	會辦單位退文時, 若異動別符合環境變數「AOL_CHECK_SENDBACK_COMMENT_TXNAME」設定之一, 則檢核簽稿會核單是否有同一級單位流程點新增的文字意見, 無則提示警告訊息並中止傳送
1140903	1140765		Raymond	Raymond	機關暱稱為TPVGH(北榮)時, 二級單位傳送出組室前或代理公文傳送前, 檢核是否有"代"字章, 無則提示警告訊息並中止傳送
1140912	退輔會序229	Raymond	Raymond	修正若同一流程點有異動舊簽又新增新簽時, 封裝檔會以傳送時間填寫「產生時間」, 造成新舊簽時間相同無法分辨何者較舊而檢核到舊簽有無職名章的問題, 改取文稿管理檔記錄的「原稿新增日期時間」來比對
1140918	1141348		Raymond	Raymond	修正使用數位墨水簽核工具後, 但未點擊「新增簽核物件」指令列按鈕, 即點擊「儲存」或「傳送」, 會造成數位墨水簽核物件未記錄的問題
1140922	1140887		Raymond	Raymond	簽辦意見窗格各流程點資訊標籤新增data-flowid屬性, 以供點擊文字意見時捲動簽辦意見窗格到新增該文字意見的流程點, 檢核當機關暱稱為TPVGH(北榮)時, 禁止簽辦意見輸入
1140923	1140848		David	Leslie	開啟可核決公文時先記錄預排流程的傳送對象，供取消核決時設定之用
1140930	1140818		Raymond	Raymond	V5再變更需求項目7, 點擊「儲存」、「傳送」、「關閉」等按鈕時, 判斷若SSO_CONFIG.OrgNickName=TPVGH, 取消提示非完稿模式的警告訊息, 若環境變數「AOL_SHOW_COMPACT_CMD」不是"Y", 隱藏簽核工具列設定子視窗右半邊簽核區域外工具列的設定
1141003	1141264		Leslie	Leslie	修正載入異常後的錯誤訊息處理
1141015	1141129		Raymond	Raymond	新增當環境變數「AOL_COPY_LAST_SAMEOU_SIGNCOMMENT」為"Y"且ODWMSG.OWN_OU_ID非OD99時, 檢查最後一個流程點的OwnOU若與目前流程點為同個一級單位時，將其簽核意見複製到簽核意見文字方塊, 及機關暱稱為"TAITRA"(外貿)時, 簽辦意見窗格呈現採用外貿邏輯:僅顯示同個一級單位最後一個流程點, 與目前流程點為同一級單位時全部顯示
1141021	1141125		Raymond	Raymond	新增當機關暱稱為"TAITRA"(外貿)時, 新增「匯入調派令CSV(多人)」、「匯入晉升令CSV(多人)」及「匯入獎勵令CSV(多人)」的選單項目於工具及設定(左上角齒輪按鈕)選單中的最下面
1141027	北榮序321	Raymond	Raymond	修正1140765的檢核"代"字章功能要包含一般文字意見只寫"代"一個字的情況
1141027	1141129		Raymond	Raymond	修正彙併辦公文, 點擊子文時執行到要複製前一流程點的簽辦意見功能時, 會因為沒有ODWMSG而發生Error的問題(查北榮序323問題時發現)
1141028	北榮序329	Raymond	Raymond	新增不檢核'代'字章的條件:未設定環境變數「AOL_CHECK_PROXY_WORD_TXNAME」時, 或異動別MenuRule設為不核章時
1141107	1140762		Raymond	Raymond	Ying說不要限制只檢核簽稿會核單, 任一文別有本流程新增的文字意見, 就可傳送
1141117	北榮序375	Raymond	Raymond	修改1140818檢核到簽核區域外有簽核物件時, 禁止傳送的警告訊息內容
1141201	北榮序411	Raymond	Raymond	修正檢核會辦單位有無加註退文意見時, 取到的TodoList中會辦單位流程點後面會出現承辦單位的"通知"流程點, 造成誤判會辦單位內沒有任一流程點有加註文字意見的問題, 順便將getDocToDoList改成getDocToDoList2, 以避免取到多機關架構下其他機關的同文號的TodoList
1141216	北榮序449	Raymond	Raymond	修正會辦單位加註意見呈核至長官, 長官退回原承辦人時, TodoList最後一個流程點是"已送出"資料夾, OwnOU前2碼會異於會辦單位OwnOU前2碼, 造成誤判的問題
1141223	北榮序460	Raymond	Raymond	修正簽稿會核單在異動後, 無法檢核到前同一單位流程點加蓋的文字意見的問題
1150107	1141585		Raymond	Raymond	開啟參照窗格時, 檢核環境變數「AOL_REFVIEW_NO_CONFIRM」若設為"Y", 則取消詢問訊息, 直接替換顯示本件公文的歷史檢視畫面
1150211	外貿序67	Raymond	Raymond	修正在簽辦意見輸入區輸入"<>", 儲存後再開啟會變成"&lt;&gt;"的問題
1150309	1150145		Raymond	Raymond	新增判斷機關暱稱為TAITRA時, 簽辦意見輸入區高度拉高為15行, 及辭庫輸入的字改為append, 取消目前流程點為OD99角色時不預帶前一個流程點為同一級單位時的簽辦意見的條件, 單位名稱後顯示核決者, 若流程點的ownOUId大於等於95且roleId為OD16時, 忽略不顯示該流程點
1150409	1150262		Leslie	Leslie	[外貿]簽辦意見窗格新增主管核決用便捷功能鍵
*/

// 2016.6.22 設定小日曆widget選項
$.datepicker.regional["zh-TW"] = {
	closeText: "關閉", // Display text for close link
	prevText: "上個月", // Display text for previous month link
	nextText: "下個月", // Display text for next month link
	currentText: "今天", // Display text for current month link
	monthNames: ["一月","二月","三月","四月","五月","六月",
		"七月","八月","九月","十月","十一月","十二月"], // Names of months for drop-down and formatting
	monthNamesShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"], // For formatting
	dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], // For formatting
	dayNamesShort: ["週日", "週一", "週二", "週三", "週四", "週五", "週六"], // For formatting
	dayNamesMin: ["日","一","二","三","四","五","六"], // Column headings for days starting at Sunday
	weekHeader: "週", // Column header for week of the year
	dateFormat: "yy-mm-dd", // See format options on parseDate
	firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
	isRTL: false, // True if right-to-left language, false if left-to-right
	showMonthAfterYear: false, // True if the year select precedes month, false for month then year
	yearSuffix: "" // Additional text to append to the year in the month headers
};
$.datepicker.setDefaults($.datepicker.regional["zh-TW"]);

function padStr(i) {
	return (i<10) ? "0" + i : "" + i;
}

function _toggleReadOnlyUI(readOnly) {
    if (readOnly) {
        $('#aol #pencilMode').closest('div.ui-checkbox').hide();
		$('#aol #grpSubmit #btnSave').hide();
		$('#aol #transPanel').hide();
		$('#aol #refView').hide();
    }
	else {
		$('#aol #pencilMode').closest('div.ui-checkbox').show();
		$('#aol #grpSubmit #btnSave').show();
		$('#aol #transPanel').show();
		$('#aol #refView').show();
	}
}

/* 2015.11 - Eric Peng, 將傳送異動別及對象設定相關功能搬移到RD-Submit.js */

// 2014.12.2 - Raymond, 檢核職名章
// 2016.3.24 FIX, 新增_docObj參數, 因判斷會辦公文改用SSOUtil.isConsultingDoc需要此參數
function _checkSignet(_docObj) {
	var i, j, n, m, errMsg = "";
	
	// 1091124 Raymond 1090564 信保特殊模式檢查任一文稿有章即可
	if(_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
		// 1091127 Raymond 1090564 修正依MenuRule決定是否檢核職名章
		try {
			if(!_shouldCheckSignetFolder())
				return true;	// 不需檢核職名章視為通過檢核
		}
		catch(e) {
			alert(e);
			return false;
		}
		// 只要有任一文稿有職名章即可, 1100317 Raymond 1100197 修正為信保特殊模式下檢核所有文稿皆須有章
		//theLogger.log("[信保特殊模式]檢核職名章(只要有任一職名章即可)...");
		theLogger.log("[信保特殊模式]檢核職名章(所有文稿皆要有職名章)...");
		n = theAOL.getCurrFolio().getSignFolder().getDraftCounts();	// 只找文稿頁面
		for(i=0; i<n; i++) {
			theLogger.log("draft#" + i + ":");
			// 1100317 Raymond 1100197 修正為信保特殊模式下檢核所有文稿皆須有章
			var d = theAOL.getCurrFolio().getSignFolder().getDraft(i);
			var found = false;
			m = theAOL.getCurrFolio().getSignFolder().getDraftPageCounts(i);
			for(j=0; j<m; j++) {
				theLogger.log("pg#" + j + ":");
				var pg = theAOL.getCurrFolio().getSignFolder().getDraftPage(i, j);
				theLogger.log(pg);
			
				// 從新增的簽核物件中判斷是否有職名章
				if("newSignObjs" in pg) {
					for(var k=0; k<pg.newSignObjs.length; k++) {
						var newSO = pg.newSignObjs[k];
						theLogger.log(newSO);
						if(newSO.type == "stamp.signet") {
							theLogger.log("\t有職名章");
							// 1100317 Raymond 1100197 修正為信保特殊模式下檢核所有文稿皆須有章
							//return true;
							found = true;
							break;	// break k-loop
						}
					}
				}
				// 2015.11.18 補救異動撤消後封裝內已儲存該流程點之職名章, 檢核不到的問題
				if("signObjs" in pg) {
					for(var k=0; k<pg.signObjs.length; k++) {
						var so = pg.signObjs[k];
						if(so.flowId == "sign_" + theAOL.docObj.msgId) {
							theLogger.warn("封裝檔既有簽核物件(ID:" + so.id + ")之產生點資訊與目前msgId(" + theAOL.docObj.msgId + ")相同, 應是異動撤消公文, 檢查該物件是否為職名章之一...");
							if("imgData" in so) {	// 只有Stamp有記錄imgData
								for(var sb=0; sb<theAOL.signetBox.length; sb++) {
									// 2015.12.10 直接比對base64編碼資料, 因為so.imgData有可能因為下載的副檔名仍保持TIF而被冠上image/tif的content type
									var a = theAOL.signetBox[sb].data.indexOf(";base64,"),
										b = so.imgData.indexOf(";base64,");
									if(a >= 0 && b >= 0 &&
										theAOL.signetBox[sb].data.substring(a) == so.imgData.substring(b)) {
									//if(theAOL.signetBox[sb].data == so.imgData) {
										theLogger.warn("->與職名章資料一致, 此文稿應已加蓋過職名章");
										// 1100317 Raymond 1100197 修正為信保特殊模式下檢核所有文稿皆須有章
										//return true;
										found = true;
										break;	// break sb-loop
									}
								}
								// 1100317 Raymond 1100197 修正為信保特殊模式下檢核所有文稿皆須有章
								if(found)
									break;	// break k-loop
							}
						}
					}
				}
				// 1100317 Raymond 1100197 修正為信保特殊模式下檢核所有文稿皆須有章
				if(found)
					break;	// break j-loop
			}
			// 1100317 Raymond 1100197 修正為信保特殊模式下檢核所有文稿皆須有章
			if(!found) {
				if(errMsg == "")
					errMsg = "下列文稿:\r\n";
				errMsg += "    文稿類型: " + d.docType + ", 標題: " + d.name + "\r\n";
				theLogger.warn("文稿'" + d.id + "'(" + d.name + "), 文稿稿型:'" + d.docType + "'未加蓋職名章!");
			}
		}
		// 1100317 Raymond 1100197 修正為信保特殊模式下檢核所有文稿皆須有章
		//errMsg = "沒有加蓋職名章";
		//theLogger.warn("未在任一文稿加蓋職名章!");
		//alert(errMsg);
		//return false;
		if(errMsg.length > 0) {
			errMsg += "未加蓋職名章!";
			alert(errMsg);
			return false;
		}
		else
			return true;
	}
	
	// 1090803 Raymond 1090409 新增判斷資料夾及異動別是否符合應產生抄本頁面的設定, 是則檢查可發文文稿上是否有簽核物件, 若有則提示警告直接刪除簽核物件後通過或取消傳送
	if(_shouldGenFormalPageFolderTxName(_docObj))
		return _doClearNewSignObjs(_docObj);	// 若可發文文稿頁面上無新簽核物件, 繼續傳送, 有新簽核物件則提示警告訊息, 使用者若選擇直接刪除後則繼續傳送, 取消則中止傳送
	
	// 2015.9.1 修正依MenuRule決定是否檢核職名章
	try {
		if(!_shouldCheckSignetFolder())
			return true;	// 不需檢核職名章視為通過檢核
	}
	catch(e) {
		alert(e);
		return false;
	}
	// 2016.3.21 新增orgNode, SSOUtil.isConsultingDoc會用到
	var orgNode = SSOUtil.getOrgNode(_docObj.sourceOrgNo);
	if (typeof orgNode==='undefined') {
		theLogger.error("找不到'" + _docObj.sourceOrgNo + "'的OrgInfo節點, 無法判斷是否為會辦單位!");
		alert("找不到'" + _docObj.sourceOrgNo + "'的OrgInfo節點, 無法判斷是否為會辦單位!");
		return false;
	}
	
	// 1060504 Raymond 1060307 新增港務公司、標檢局的核章邏輯(變更單1020250)
	if(theSSO.User.EnvSettings.get('AOL_ENHANCED_SIGNET_CHECK_MODE') == "P")
		return _checkSignetP(_docObj, orgNode);
	
	var checkAny = true;
	if(theSSO.User.EnvSettings.get('AOL_CHECKSIGNET_ALL_DRAFT') == "Y")
		checkAny = false;
	var enhancedMode = theSSO.User.EnvSettings.get('AOL_ENHANCED_SIGNET_CHECK_MODE') != "N";	// debug, 這變數莫名原因被設定成"2"
	
	if(!checkAny) {
		// 檢核所有文稿都須有職名章
		var hasCoworkDraftType = false,		// 有簽稿會核單
			isConsultingDoc = SSOUtil.isConsultingDoc(_docObj, theSSO.User.EnvSettings, orgNode);	// 是會辦公文 2016.3.21 改叫用Eric的SSOUtil.isConsultingDoc來判斷是否為會辦公文
			
		n = theAOL.getCurrFolio().getSignFolder().getDraftCounts();
		if(theAOL.getCurrFolio().getSignFolder().hasFromDoc())
			--n;	// 檢核標的不含來文文稿, 來文的index是最後一個
		if(n > 0) {
			for(i=0; i<n; i++) {
				var d = theAOL.getCurrFolio().getSignFolder().getDraft(i);
				if(d.docType == "簽稿會核單")
					hasCoworkDraftType = true;
			}
			
			// 1100319 Raymond 1090853 僅檢核一筆簽稿會核單有章即通過
			var checkCoworkDraftOnce = false;
			for(i=0; i<n; i++) {
				var d = theAOL.getCurrFolio().getSignFolder().getDraft(i);
				if(d.removed()) {
					theLogger.log("已刪除文稿不檢核職名章");
					continue;
				}
				if(!_shouldCheckSignetDraftType(d.docType)) {
					theLogger.warn("DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 不在應檢核文稿類型清單中.[見環境變數'AOL_CHECK_SIGNET_DRAFT_TYPE'設定值]");
					continue;
				}
				if(enhancedMode) {
					// 會辦公文且有簽稿會核單, 只檢核簽稿會核單
					if(isConsultingDoc && hasCoworkDraftType) {
						if(d.docType != "簽稿會核單") {
							theLogger.log("[會辦公文, 有簽稿會核單] DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 不檢核!");
							continue;
						}
						// 1100319 Raymond 1090853 僅檢核一筆簽稿會核單有章即通過
						else {
							theLogger.log("[會辦公文, 有簽稿會核單] DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 僅需檢核一筆有章即可通過!");
							checkCoworkDraftOnce = true;
						}
					}
					// 1070608 Raymond 1070197 會辦公文但無簽稿會核單時, 要在主辦的文稿核章
					else if(isConsultingDoc) {
						if("fileRef" in d) {	// 要查到檔案的子目錄是否符合會辦子目錄規則才能識別
							d.fileRef.name.match(/^\d{10}-(\d{2})-\d{2}\\/);
							if(RegExp.$1 != "00" && RegExp.$1 != _docObj.ownOUId.substring(0, 2)) {
								theLogger.log("[會辦公文, 其它會辦單位(" + RegExp.$1 + ")新增的文稿] DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 不檢核!");
								continue;
							}
						}
					}
					// 1070608 Raymond 1070197 非會辦時, 會辦單位新增的文稿不核章
					else {
						if(hasCoworkDraftType && d.docType == "簽稿會核單") {
					// 有簽稿會核單但不是會辦公文, 毋須檢核簽稿會核單
					//else if(hasCoworkDraftType) {
					//	if(d.docType == "簽稿會核單") {
							theLogger.log("[非會辦公文, 有簽稿會核單] DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 不檢核!");
							continue;
						}
						// 1070608 Raymond 1070197 非會辦時, 會辦單位新增的文稿不核章
						if(d.id.indexOf("-") > 0) {	// 分會用ID可識別
							theLogger.log("[非會辦公文, 分會單位新增的文稿] DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 不檢核!");
							continue;
						}
						else if("fileRef" in d) {	// 順會要查到檔案的子目錄是否符合會辦子目錄規則才能識別
							d.fileRef.name.match(/^\d{10}-(\d{2})-\d{2}\\/);
							if(RegExp.$1 != "00") {
								theLogger.log("[非會辦公文, 順會單位新增的文稿] DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 不檢核!");
								continue;
							}
						}
					}
					theLogger.log("[EnhancedMode] " + (isConsultingDoc?"":"非") + "會辦公文, " + (hasCoworkDraftType?"有":"無") + "簽稿會核單, 檢核 DraftInfo Id='" + d.id + "' 文稿類型: '" + d.docType + "'");
				}
				else {
					// 1070608 Raymond 1070197 非會辦時, 會辦單位新增的文稿不核章
					if(!isConsultingDoc) {
						if(d.id.indexOf("-") > 0) {	// 分會用ID可識別
							theLogger.log("[非會辦公文, 分會單位新增的文稿] DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 不檢核!");
							continue;
						}
						else if("fileRef" in d) {	// 順會要查到檔案的子目錄是否符合會辦子目錄規則才能識別
							d.fileRef.name.match(/^\d{10}-(\d{2})-\d{2}\\/);
							if(RegExp.$1 != "00") {
								theLogger.log("[非會辦公文, 順會單位新增的文稿] DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 不檢核!");
								break;
							}
						}
					}
					theLogger.log("[NormalMode] gonna check all drafts");
				}
				
				var found = false;
				m = theAOL.getCurrFolio().getSignFolder().getDraftPageCounts(i);
				for(j=0; j<m; j++) {
					theLogger.log("pg#" + j + ":");
					var pg = theAOL.getCurrFolio().getSignFolder().getDraftPage(i, j);
					theLogger.log(pg);
				
					// 從新增的簽核物件中判斷是否有職名章
					if("newSignObjs" in pg) {
						for(var k=0; k<pg.newSignObjs.length; k++) {
							var newSO = pg.newSignObjs[k];
							theLogger.log(newSO);
							if(newSO.type == "stamp.signet") {
								theLogger.log("\t有職名章");
								// 1100319 Raymond 1090853 僅檢核一筆簽稿會核單有章即通過
								if(checkCoworkDraftOnce == true)
									return true;
								found = true;
								break;	// break k-loop
							}
						}
					}
					// 2015.11.18 補救異動撤消後封裝內已儲存該流程點之職名章, 檢核不到的問題
					if("signObjs" in pg) {
						for(var k=0; k<pg.signObjs.length; k++) {
							var so = pg.signObjs[k];
							if(so.flowId == "sign_" + theAOL.docObj.msgId) {
								theLogger.warn("封裝檔既有簽核物件(ID:" + so.id + ")之產生點資訊與目前msgId(" + theAOL.docObj.msgId + ")相同, 應是異動撤消公文, 檢查該物件是否為職名章之一...");
								if("imgData" in so) {	// 只有Stamp有記錄imgData
									for(var sb=0; sb<theAOL.signetBox.length; sb++) {
										// 2015.12.10 直接比對base64編碼資料, 因為so.imgData有可能因為下載的副檔名仍保持TIF而被冠上image/tif的content type
										var a = theAOL.signetBox[sb].data.indexOf(";base64,"),
											b = so.imgData.indexOf(";base64,");
										if(a >= 0 && b >= 0 &&
											theAOL.signetBox[sb].data.substring(a) == so.imgData.substring(b)) {
										//if(theAOL.signetBox[sb].data == so.imgData) {
											theLogger.warn("->與職名章資料一致, 此文稿應已加蓋過職名章");
											// 1100319 Raymond 1090853 僅檢核一筆簽稿會核單有章即通過
											if(checkCoworkDraftOnce == true)
												return true;
											found = true;
											break;	// break sb-loop
										}
									}
									if(found)
										break;	// break k-loop
								}
							}
						}
					}
					if(found)
						break;	// break j-loop
				}
				if(!found) {
					// 1090106 Raymond 1081179 新增航港局要求格式的訊息文字
					if(theUserInfo.OrgNickName == "MPBXX") {	// 1090601 Raymond 1081179 核章邏輯仍有意見先取消, 機關暱稱先改掉
						if(errMsg == "")
							errMsg = "您有" + d.name;
						else
							errMsg += "、" + d.name;
					}
					else {
					if(errMsg == "")
						errMsg = "下列文稿:\r\n";
					errMsg += "    文稿類型: " + d.docType + ", 標題: " + d.name + "\r\n";
					}
					theLogger.warn("文稿'" + d.id + "'(" + d.name + "), 文稿稿型:'" + d.docType + "'未加蓋職名章!");
				}
			}
			// 1090106 Raymond 1081179 新增航港局要求格式的訊息文字
			if(theUserInfo.OrgNickName == "MPBXX" && errMsg.length > 0)	// 1090601 Raymond 1081179 核章邏輯仍有意見先取消, 機關暱稱先改掉
				errMsg += "未蓋職名章，";
			else if(errMsg.length > 0)
				errMsg += "未加蓋職名章!";
			else
				return true;
		}
		else if(theAOL.getCurrFolio().getSignFolder().hasFromDoc()) {
			// TODO: 封裝檔版本小於2010才可用?
			// 沒有任何文稿，檢查來文本文頁面
			// 2015.6.18 - Raymond, 新增判斷AOL_ENABLE_RCVDOC_EDIT_FOLDER有值代表啟用來文頁面直接簽核, 應檢核職名章
			if(_enableRcvDocEditing()) {
				m = theAOL.getCurrFolio().getSignFolder().getDraftPageCounts(0);
				for(j=0; j<m; j++) {
					theLogger.log("pg#" + j + ":");
					var pg = theAOL.getCurrFolio().getSignFolder().getDraftPage(0, j);
					theLogger.log(pg);
				
					// 從新增的簽核物件中判斷是否有職名章
					if("newSignObjs" in pg) {
						for(var k=0; k<pg.newSignObjs.length; k++) {
							var newSO = pg.newSignObjs[k];
							theLogger.log(newSO);
							if(newSO.type == "stamp.signet") {
								theLogger.log("\t有職名章");
								return true;
							}
						}
					}
					// 2015.11.18 補救異動撤消後封裝內已儲存該流程點之職名章, 檢核不到的問題
					if("signObjs" in pg) {
						for(var k=0; k<pg.signObjs.length; k++) {
							var so = pg.signObjs[k];
							if(so.flowId == "sign_" + theAOL.docObj.msgId) {
								theLogger.warn("封裝檔既有簽核物件(ID:" + so.id + ")之產生點資訊與目前msgId(" + theAOL.docObj.msgId + ")相同, 應是異動撤消公文, 檢查該物件是否為職名章之一...");
								if("imgData" in so) {	// 只有Stamp有記錄imgData
									for(var sb=0; sb<theAOL.signetBox.length; sb++) {
										// 2015.12.10 直接比對base64編碼資料, 因為so.imgData有可能因為下載的副檔名仍保持TIF而被冠上image/tif的content type
										var a = theAOL.signetBox[sb].data.indexOf(";base64,"),
											b = so.imgData.indexOf(";base64,");
										if(a >= 0 && b >= 0 &&
											theAOL.signetBox[sb].data.substring(a) == so.imgData.substring(b)) {
										//if(theAOL.signetBox[sb].data == so.imgData) {
											theLogger.warn("->與職名章資料一致, 此文稿應已加蓋過職名章");
											return true;
										}
									}
								}
							}
						}
					}
				}
				errMsg = "來文內容未加蓋職名章!";
				theLogger.warn("來文頁面上未加蓋任何職名章!");
			}
			else {
				theLogger.log("不允許來文頁面上直接簽核, 不需檢核職名章");
				return true;
			}
		}
		else {
			errMsg = "沒有文稿!";
			theLogger.warn("無任何文稿無法檢核職名章");
		}
	}
	else {
		if(enhancedMode) {
			// 增強模式
			var hasCoworkDraftType = false,	// 有簽稿會核單
				hasSignDraftType1 = false,	// 有簽
				hasSignDraftType2 = false,	// 有便簽
				isConsultingDoc = SSOUtil.isConsultingDoc(_docObj, theSSO.User.EnvSettings, orgNode);	// 是會辦公文 2016.3.21 改叫用Eric的SSOUtil.isConsultingDoc來判斷是否為會辦公文
			
			n = theAOL.getCurrFolio().getSignFolder().getDraftCounts();
			if(theAOL.getCurrFolio().getSignFolder().hasFromDoc())
				--n;	// 檢核標的不含來文文稿, 來文的index是最後一個
			if(n > 0) {
				for(i=0; i<n; i++) {
					var d = theAOL.getCurrFolio().getSignFolder().getDraft(i);
					if(d.docType == "簽稿會核單")
						hasCoworkDraftType = true;
					else if(d.docType == "簽")
						hasSignDraftType1 = true;
					else if(d.docType == "便簽")
						hasSignDraftType2 = true;
				}
				
				for(i=0; i<n; i++) {
					var d = theAOL.getCurrFolio().getSignFolder().getDraft(i);
					// 會辦公文且有簽稿會核單, 只檢核簽稿會核單
					if(isConsultingDoc && hasCoworkDraftType) {
						if(d.docType != "簽稿會核單") {
							theLogger.log("[會辦公文, 有簽稿會核單] DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 不檢核!");
							continue;
						}
					}
					// 有簽稿會核單但不是會辦公文, 毋須檢核簽稿會核單
					else if(hasCoworkDraftType) {
						if(d.docType == "簽稿會核單") {
							theLogger.log("[非會辦公文, 有簽稿會核單] DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 不檢核!");
							continue;
						}
					}
					
					if(hasSignDraftType1 || hasSignDraftType2) {
						// 簽稿會核單不再判定, 其它稿件則要
						if(d.docType != "簽稿會核單") {
							// 不是會辦公文或沒有簽稿會核單時
							// =>有"簽"或"便簽"時, 只檢查"簽"或"便簽"是否有加蓋簽章...
							if(d.docType != "簽" && d.docType != "便簽") {
								theLogger.log("[" + (isConsultingDoc?"":"非") + "會辦公文, " + (hasCoworkDraftType?"有":"無") + "簽稿會核單, 有簽或便簽] DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 不為簽或便簽, 不檢核!");
								continue;
							}
						}
					}
					
					theLogger.log("[" + (isConsultingDoc?"":"非") + "會辦公文, " + (hasCoworkDraftType?"有":"無") + "簽稿會核單, " + (hasSignDraftType1?"有":"無") + "簽" + (hasSignDraftType2?"有":"無") + "便簽] DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 應檢核!");
					if(_shouldCheckSignetDraftType(d.docType)) {
						m = theAOL.getCurrFolio().getSignFolder().getDraftPageCounts(i);
						for(j=0; j<m; j++) {
							theLogger.log("pg#" + j + ":");
							var pg = theAOL.getCurrFolio().getSignFolder().getDraftPage(i, j);
							theLogger.log(pg);
						
							// 從新增的簽核物件中判斷是否有職名章
							if("newSignObjs" in pg) {
								for(var k=0; k<pg.newSignObjs.length; k++) {
									var newSO = pg.newSignObjs[k];
									theLogger.log(newSO);
									if(newSO.type == "stamp.signet") {
										theLogger.log("\t有職名章");
										return true;
									}
								}
							}
							// 2015.11.18 補救異動撤消後封裝內已儲存該流程點之職名章, 檢核不到的問題
							if("signObjs" in pg) {
								for(var k=0; k<pg.signObjs.length; k++) {
									var so = pg.signObjs[k];
									if(so.flowId == "sign_" + theAOL.docObj.msgId) {
										theLogger.warn("封裝檔既有簽核物件(ID:" + so.id + ")之產生點資訊與目前msgId(" + theAOL.docObj.msgId + ")相同, 應是異動撤消公文, 檢查該物件是否為職名章之一...");
										if("imgData" in so) {	// 只有Stamp有記錄imgData
											for(var sb=0; sb<theAOL.signetBox.length; sb++) {
												// 2015.12.10 直接比對base64編碼資料, 因為so.imgData有可能因為下載的副檔名仍保持TIF而被冠上image/tif的content type
												var a = theAOL.signetBox[sb].data.indexOf(";base64,"),
													b = so.imgData.indexOf(";base64,");
												if(a >= 0 && b >= 0 &&
													theAOL.signetBox[sb].data.substring(a) == so.imgData.substring(b)) {
												//if(theAOL.signetBox[sb].data == so.imgData) {
													theLogger.warn("->與職名章資料一致, 此文稿應已加蓋過職名章");
													return true;
												}
											}
										}
									}
								}
							}
						}
					}
				}
				errMsg = "未在文稿加蓋職名章!";
				theLogger.warn("未在任一文稿加蓋職名章!");
			}
			else if(theAOL.getCurrFolio().getSignFolder().hasFromDoc()) {
				// TODO: 封裝檔版本小於2010才可用?
				// 2015.6.18 - Raymond, 新增判斷若允許來文頁面上直接簽核, 才檢核職名章
				if(_enableRcvDocEditing()) {
					m = theAOL.getCurrFolio().getSignFolder().getDraftPageCounts(0);
					for(j=0; j<m; j++) {
						theLogger.log("pg#" + j + ":");
						var pg = theAOL.getCurrFolio().getSignFolder().getDraftPage(0, j);
						theLogger.log(pg);
				
						// 從新增的簽核物件中判斷是否有職名章
						if("newSignObjs" in pg) {
							for(var k=0; k<pg.newSignObjs.length; k++) {
								var newSO = pg.newSignObjs[k];
								theLogger.log(newSO);
								if(newSO.type == "stamp.signet") {
									theLogger.log("\t有職名章");
									return true;
								}
							}
						}
						// 2015.11.18 補救異動撤消後封裝內已儲存該流程點之職名章, 檢核不到的問題
						if("signObjs" in pg) {
							for(var k=0; k<pg.signObjs.length; k++) {
								var so = pg.signObjs[k];
								if(so.flowId == "sign_" + theAOL.docObj.msgId) {
									theLogger.warn("封裝檔既有簽核物件(ID:" + so.id + ")之產生點資訊與目前msgId(" + theAOL.docObj.msgId + ")相同, 應是異動撤消公文, 檢查該物件是否為職名章之一...");
									if("imgData" in so) {	// 只有Stamp有記錄imgData
										for(var sb=0; sb<theAOL.signetBox.length; sb++) {
											// 2015.12.10 直接比對base64編碼資料, 因為so.imgData有可能因為下載的副檔名仍保持TIF而被冠上image/tif的content type
											var a = theAOL.signetBox[sb].data.indexOf(";base64,"),
												b = so.imgData.indexOf(";base64,");
											if(a >= 0 && b >= 0 &&
												theAOL.signetBox[sb].data.substring(a) == so.imgData.substring(b)) {
											//if(theAOL.signetBox[sb].data == so.imgData) {
												theLogger.warn("->與職名章資料一致, 此文稿應已加蓋過職名章");
												return true;
											}
										}
									}
								}
							}
						}
					}
					errMsg = "來文內容未加蓋職名章!";
					theLogger.warn("來文頁面上未加蓋任何職名章!");
				}
				else {
					theLogger.log("不允許來文頁面上直接簽核, 不需檢核職名章");
					return true;
				}
			}
			//else TODO: 來文簽辦
			else {
				errMsg = "沒有任何文稿, 且無來文內容!";
				theLogger.warn("無任何文稿無法檢核職名章");
			}
		}
		else {
			// 只要有任一文稿有職名章即可
			theLogger.log("檢核職名章(只要有任一職名章即可)...");
			n = theAOL.getCurrFolio().getSignFolder().getDraftCounts();	// 只找文稿頁面
			for(i=0; i<n; i++) {
				theLogger.log("draft#" + i + ":");
				m = theAOL.getCurrFolio().getSignFolder().getDraftPageCounts(i);
				for(j=0; j<m; j++) {
					theLogger.log("pg#" + j + ":");
					var pg = theAOL.getCurrFolio().getSignFolder().getDraftPage(i, j);
					theLogger.log(pg);
				
					// 從新增的簽核物件中判斷是否有職名章
					if("newSignObjs" in pg) {
						for(var k=0; k<pg.newSignObjs.length; k++) {
							var newSO = pg.newSignObjs[k];
							theLogger.log(newSO);
							if(newSO.type == "stamp.signet") {
								theLogger.log("\t有職名章");
								return true;
							}
						}
					}
					// 2015.11.18 補救異動撤消後封裝內已儲存該流程點之職名章, 檢核不到的問題
					if("signObjs" in pg) {
						for(var k=0; k<pg.signObjs.length; k++) {
							var so = pg.signObjs[k];
							if(so.flowId == "sign_" + theAOL.docObj.msgId) {
								theLogger.warn("封裝檔既有簽核物件(ID:" + so.id + ")之產生點資訊與目前msgId(" + theAOL.docObj.msgId + ")相同, 應是異動撤消公文, 檢查該物件是否為職名章之一...");
								if("imgData" in so) {	// 只有Stamp有記錄imgData
									for(var sb=0; sb<theAOL.signetBox.length; sb++) {
										// 2015.12.10 直接比對base64編碼資料, 因為so.imgData有可能因為下載的副檔名仍保持TIF而被冠上image/tif的content type
										var a = theAOL.signetBox[sb].data.indexOf(";base64,"),
											b = so.imgData.indexOf(";base64,");
										if(a >= 0 && b >= 0 &&
											theAOL.signetBox[sb].data.substring(a) == so.imgData.substring(b)) {
										//if(theAOL.signetBox[sb].data == so.imgData) {
											theLogger.warn("->與職名章資料一致, 此文稿應已加蓋過職名章");
											return true;
										}
									}
								}
							}
						}
					}
				}
			}
			// 2015.6.18 - Raymond, 新增判斷AOL_ENABLE_RCVDOC_EDIT_FOLDER有值代表啟用來文頁面直接簽核, 應檢核職名章
			if(theAOL.getCurrFolio().getSignFolder().hasFromDoc() && n == 1) {	// 只有來文
				// 1070830 Raymond 1070936 修正允許來文簽辦會略過檢核職名章的問題
				//if(_enableRcvDocEditing()) {
				if(!_enableRcvDocEditing()) {
					theLogger.log("不允許來文頁面上直接簽核, 忽略檢核職名章");
					return true;
				}
			}
			errMsg = "沒有加蓋職名章";
			theLogger.warn("未在任一文稿加蓋職名章!");
		}
	}
	
	// 1090106 Raymond 1081179 新增航港局要求格式的訊息文字及改為confirm
	// 1081114 Raymond 1080962 核章未過僅提示警告, 仍允許傳送(合併成大1070537功能)
	//if(theSSO.User.EnvSettings.get("AOL_ENABLE_PASS_CHECK_SIGNET_NG").match(/Y/i)) {
	if(theUserInfo.OrgNickName == "MPBXX") {	// 1090601 Raymond 1081179 核章邏輯仍有意見先取消, 機關暱稱先改掉
		if(!confirm(errMsg + "是否加蓋後再傳送？\n【確定（補蓋章）】\n【取消（直接傳送）】")) {	// 1090113 Raymond 依Jammie最終確認再修改
			theLogger.warn("未通過職名章檢核, 使用者仍選擇繼續傳送");
			return true;
		}
	}
	else if(theSSO.User.EnvSettings.get("AOL_ENABLE_PASS_CHECK_SIGNET_NG").match(/Y/i)) {
		// 1081226 Raymond 1081160 應鐵道局主任要求修改提示訊息文字
		//if(confirm(errMsg + "\n\n是否繼續?")) {
		if(confirm(errMsg + "\n\n無需補章，請按「確定」，\n需補章，請按「取消」。")) {
			theLogger.warn("未通過職名章檢核, 使用者仍選擇繼續傳送");
			return true;
		}
	}
	else
	alert(errMsg);
	return false;
}

// 1060504 Raymond 1060307 新增港務公司、標檢局的核章邏輯(AOL_ENHANCED_SIGNET_CHECK_MODE = 'P')
function _checkSignetP(_docObj, orgNode) {
	var i, j, n, m, errMsg = "";
	
	var hasCoworkDraftType = false,		// 有簽稿會核單
		hasChenDraftType = false,		// 有簽類(簽、便簽)
		isConsultingDoc = SSOUtil.isConsultingDoc(_docObj, theSSO.User.EnvSettings, orgNode);	// 是會辦公文
		
	var n = theAOL.getCurrFolio().getSignFolder().getDraftCounts();
	if(theAOL.getCurrFolio().getSignFolder().hasFromDoc())
		--n;	// 檢核標的不含來文文稿, 來文的index是最後一個
	if(n > 0) {
		for(i=0; i<n; i++) {
			var d = theAOL.getCurrFolio().getSignFolder().getDraft(i);
			if(d.docType == "簽稿會核單")
				hasCoworkDraftType = true;
			else if(d.docType == "簽" || d.docType == "便簽" || d.docType == "綜簽")	// 1060511 Raymond 新增"綜簽"
				hasChenDraftType = true;
		}
		
		for(i=0; i<n; i++) {
			var d = theAOL.getCurrFolio().getSignFolder().getDraft(i);
			if(d.removed()) {
				theLogger.log("已刪除文稿不檢核職名章");
				continue;
			}
			//if(!_shouldCheckSignetDraftType(d.docType)) {
			//	theLogger.warn("DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 不在應檢核文稿類型清單中.[見環境變數'AOL_CHECK_SIGNET_DRAFT_TYPE'設定值]");
			//	continue;
			//}
			if(isConsultingDoc) {	// 會辦公文
				// 有簽稿會核單, 只檢核簽稿會核單
				if(hasCoworkDraftType) {
					if(d.docType != "簽稿會核單") {
						theLogger.log("[會辦公文, 有簽稿會核單] DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 不檢核!");
						continue;
					}
					// 1080319 Raymond 1080210 依一代原單(1020250)對P模式的需求描述, 新增會辦公文若有多筆簽稿會核單, 也要只檢核最新的簽稿會核單就好, 不用都核
					else {
						var isOlder = false;
						for(j=0; j<n; j++) {
							if(i==j)
								continue;	// continue j-loop, 同一筆簽稿會核單不用比較
							var nxt = theAOL.getCurrFolio().getSignFolder().getDraft(j);
							if(nxt.removed()) {
								//theLogger.log("已刪除文稿不檢核職名章");
								continue;	// continue j-loop
							}
							else if(nxt.docType == "簽稿會核單") {
								if(nxt.time > d.time) {	// 另一個簽稿會核單比目前的簽稿會核單還要新
									isOlder = true;
									break;	// break j-loop
								}
							}
						}
						if(isOlder) {
							theLogger.log("[會辦公文, 有簽稿會核單] DraftInfo Id='" + d.id + "' 文稿類型:" + d.docType + "' 時間:" + d.time + "(較舊), 不檢核!");
							continue;
						}
					}
				}
				else if(hasChenDraftType) {	// 無簽稿會核單但有簽類文稿, 只檢核簽類
					if(d.docType != "簽" && d.docType != "便簽" && d.docType != "綜簽") {	// 1060511 Raymond 新增"綜簽"
						theLogger.log("[會辦公文, 無簽稿會核單, 有簽類] DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 不檢核!");
						continue;
					}
					// 1080319 Raymond 1080210 依一代原單(1020250)對P模式的需求描述, 新增會辦公文若有多筆簽類文稿, 也要只檢核最新的簽類文稿就好, 不用都核
					else {
						var isOlder = false;
						for(j=0; j<n; j++) {
							if(i==j)
								continue;	// continue j-loop, 同一筆簽類不用比較
							var nxt = theAOL.getCurrFolio().getSignFolder().getDraft(j);
							if(nxt.removed()) {
								//theLogger.log("已刪除文稿不檢核職名章");
								continue;	// continue j-loop
							}
							else if(nxt.docType == "簽" || nxt.docType == "便簽" || nxt.docType == "綜簽") {
								if(nxt.time > d.time) {	// 另一個簽類比目前的簽類還要新
									isOlder = true;
									break;	// break j-loop
								}
							}
						}
						if(isOlder) {
							theLogger.log("[會辦公文, 無簽稿會核單, 有簽類] DraftInfo Id='" + d.id + "' 文稿類型:" + d.docType + "' 時間:" + d.time + "(較舊), 不檢核!");
							continue;
						}
					}
				}
			}
			else {	// 非會辦公文
				// 有簽稿會核單, 毋須檢核簽稿會核單
				if(hasCoworkDraftType) {
					if(d.docType == "簽稿會核單") {
						theLogger.log("[非會辦公文, 有簽稿會核單] DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 不檢核!");
						continue;
					}
				}
				if(hasChenDraftType) {	// 有簽類文稿, 只檢核最新的簽
					if(d.docType == "簽" || d.docType == "便簽" || d.docType == "綜簽") {	// 1060511 Raymond 新增"綜簽"
						var isOlder = false;
						// 1080319 Raymond 1080210 修正比對新舊邏輯, 只比後面的簽類忽略了前面的簽類比較新已檢核過的情況, 導致舊的簽類只是位置在後面也要求核章的問題
						//for(j=i+1; j<n; j++) {
						for(j=0; j<n; j++) {
							if(i==j)
								continue;	// continue j-loop, 同一筆簽類不用比較
							var nxt = theAOL.getCurrFolio().getSignFolder().getDraft(j);
							if(nxt.removed()) {
								//theLogger.log("已刪除文稿不檢核職名章");
								continue;	// continue j-loop
							}
							else if(nxt.docType == "簽" || nxt.docType == "便簽" || nxt.docType == "綜簽") {	// 1060511 Raymond 新增"綜簽"
								if(nxt.time > d.time) {	// 後面的簽類比目前的簽還要新
									isOlder = true;
									break;	// break j-loop
								}
								// 1140912 Raymond 退輔會序229 修正若同一流程點有異動舊簽又新增新簽時, 封裝檔會以傳送時間填寫「產生時間」, 造成新舊簽時間相同無法分辨何者較舊而檢核到舊簽有無職名章的問題
								else if(nxt.time == d.time) {
									let tD = theAOL.getCurrFolio().getDraftCreateTime(i),	// 改取文稿管理檔記錄的「原稿新增日期時間」來比對
										tN = theAOL.getCurrFolio().getDraftCreateTime(j);
									if(tN > tD) {
										isOlder = true;
										break;
									}
								}
							}
						}
						if(isOlder) {
							theLogger.log("[非會辦公文, 無簽稿會核單, 有簽類] DraftInfo Id='" + d.id + "' 文稿類型:" + d.docType + "' 時間:" + d.time + "(較舊), 不檢核!");
							continue;
						}
					}
				}
			}
			theLogger.log("[P Mode] " + (isConsultingDoc?"":"非") + "會辦公文, " + (hasCoworkDraftType?"有":"無") + "簽稿會核單, " + (hasChenDraftType?"有":"無") + "簽類文稿, 檢核 DraftInfo Id='" + d.id + "' 文稿類型: '" + d.docType + "'");
			
			var found = false;
			var m = theAOL.getCurrFolio().getSignFolder().getDraftPageCounts(i);
			for(j=0; j<m; j++) {
				theLogger.log("pg#" + j + ":");
				var pg = theAOL.getCurrFolio().getSignFolder().getDraftPage(i, j);
				theLogger.log(pg);
			
				// 從新增的簽核物件中判斷是否有職名章
				if("newSignObjs" in pg) {
					for(var k=0; k<pg.newSignObjs.length; k++) {
						var newSO = pg.newSignObjs[k];
						theLogger.log(newSO);
						if(newSO.type == "stamp.signet") {
							theLogger.log("\t有職名章");
							if(isConsultingDoc)	// 會辦公文只要檢核優先文別有章即可
								return true;
							found = true;
							break;	// break k-loop
						}
					}
				}
				// 2015.11.18 補救異動撤消後封裝內已儲存該流程點之職名章, 檢核不到的問題
				if("signObjs" in pg) {
					for(var k=0; k<pg.signObjs.length; k++) {
						var so = pg.signObjs[k];
						if(so.flowId == "sign_" + theAOL.docObj.msgId) {
							theLogger.warn("封裝檔既有簽核物件(ID:" + so.id + ")之產生點資訊與目前msgId(" + theAOL.docObj.msgId + ")相同, 應是異動撤消公文, 檢查該物件是否為職名章之一...");
							if("imgData" in so) {	// 只有Stamp有記錄imgData
								for(var sb=0; sb<theAOL.signetBox.length; sb++) {
									// 2015.12.10 直接比對base64編碼資料, 因為so.imgData有可能因為下載的副檔名仍保持TIF而被冠上image/tif的content type
									var a = theAOL.signetBox[sb].data.indexOf(";base64,"),
										b = so.imgData.indexOf(";base64,");
									if(a >= 0 && b >= 0 &&
										theAOL.signetBox[sb].data.substring(a) == so.imgData.substring(b)) {
									//if(theAOL.signetBox[sb].data == so.imgData) {
										theLogger.warn("->與職名章資料一致, 此文稿應已加蓋過職名章");
										if(isConsultingDoc)	// 會辦公文只要檢核優先文別有章即可
											return true;
										found = true;
										break;	// break sb-loop
									}
								}
								if(found)
									break;	// break k-loop
							}
						}
					}
				}
				if(found)
					break;	// break j-loop
			}
			if(!found) {
				// 1090115 Raymond 1081179 新增航港局要求格式的訊息文字
				if(theUserInfo.OrgNickName == "MPBXX") {	// 1090601 Raymond 1081179 核章邏輯仍有意見先取消, 機關暱稱先改掉
					if(errMsg == "")
						errMsg = "您有" + d.name;
					else
						errMsg += "、" + d.name;
				}
				else {
				if(errMsg == "")
					errMsg = "下列文稿:\r\n";
				errMsg += "    文稿類型: " + d.docType + ", 標題: " + d.name + "\r\n";
				}
				//theLogger.warn("文稿'" + d.id + "'(" + d.name + "), 文稿稿型:'" + d.docType + "'未加蓋職名章!");
				theLogger.warn("文稿'" + d.name + "'(ID:" + d.id + "), 文稿稿型:'" + d.docType + "'未加蓋職名章!");	// 1081114 Raymond 文稿名稱與文稿ID對調, ID寫在括號內
			}
		}
		// 1090115 Raymond 1081179 新增航港局要求格式的訊息文字
		if(theUserInfo.OrgNickName == "MPBXX" && errMsg.length > 0)	// 1090601 Raymond 1081179 核章邏輯仍有意見先取消, 機關暱稱先改掉
			errMsg += "未蓋職名章，";
		else if(errMsg.length > 0)
			errMsg += "未加蓋職名章!";
		else
			return true;
	}
	// 1110810 Raymond 考試院序187 修正P核章模式下啟用來文簽辦時, 不會檢查來文頁面上的職名章, 導致跳出空字串訊息, 中止傳送問題
	else if(theAOL.getCurrFolio().getSignFolder().hasFromDoc()) {
		// TODO: 封裝檔版本小於2010才可用?
		// 沒有任何文稿，檢查來文本文頁面
		// 2015.6.18 - Raymond, 新增判斷AOL_ENABLE_RCVDOC_EDIT_FOLDER有值代表啟用來文頁面直接簽核, 應檢核職名章
		if(_enableRcvDocEditing()) {
			m = theAOL.getCurrFolio().getSignFolder().getDraftPageCounts(0);
			for(j=0; j<m; j++) {
				theLogger.log("pg#" + j + ":");
				var pg = theAOL.getCurrFolio().getSignFolder().getDraftPage(0, j);
				theLogger.log(pg);
			
				// 從新增的簽核物件中判斷是否有職名章
				if("newSignObjs" in pg) {
					for(var k=0; k<pg.newSignObjs.length; k++) {
						var newSO = pg.newSignObjs[k];
						theLogger.log(newSO);
						if(newSO.type == "stamp.signet") {
							theLogger.log("\t有職名章");
							return true;
						}
					}
				}
				// 2015.11.18 補救異動撤消後封裝內已儲存該流程點之職名章, 檢核不到的問題
				if("signObjs" in pg) {
					for(var k=0; k<pg.signObjs.length; k++) {
						var so = pg.signObjs[k];
						if(so.flowId == "sign_" + theAOL.docObj.msgId) {
							theLogger.warn("封裝檔既有簽核物件(ID:" + so.id + ")之產生點資訊與目前msgId(" + theAOL.docObj.msgId + ")相同, 應是異動撤消公文, 檢查該物件是否為職名章之一...");
							if("imgData" in so) {	// 只有Stamp有記錄imgData
								for(var sb=0; sb<theAOL.signetBox.length; sb++) {
									// 2015.12.10 直接比對base64編碼資料, 因為so.imgData有可能因為下載的副檔名仍保持TIF而被冠上image/tif的content type
									var a = theAOL.signetBox[sb].data.indexOf(";base64,"),
										b = so.imgData.indexOf(";base64,");
									if(a >= 0 && b >= 0 &&
										theAOL.signetBox[sb].data.substring(a) == so.imgData.substring(b)) {
									//if(theAOL.signetBox[sb].data == so.imgData) {
										theLogger.warn("->與職名章資料一致, 此文稿應已加蓋過職名章");
										return true;
									}
								}
							}
						}
					}
				}
			}
			errMsg = "來文內容未加蓋職名章!";
			theLogger.warn("來文頁面上未加蓋任何職名章!");
		}
		else {
			theLogger.log("不允許來文頁面上直接簽核, 不需檢核職名章");
			return true;
		}
	}
	else {
		errMsg = "沒有文稿!";
		theLogger.warn("無任何文稿無法檢核職名章");
	}
	
	// 1090115 Raymond 1081179 新增航港局要求格式的訊息文字及改為confirm
	// 1081114 Raymond 1080962 核章未過僅提示警告, 仍允許傳送(合併成大1070537功能)
	//if(theSSO.User.EnvSettings.get("AOL_ENABLE_PASS_CHECK_SIGNET_NG").match(/Y/i)) {
	if(theUserInfo.OrgNickName == "MPBXX") {	// 1090601 Raymond 1081179 核章邏輯仍有意見先取消, 機關暱稱先改掉
		if(!confirm(errMsg + "是否加蓋後再傳送？\n【確定（補蓋章）】\n【取消（直接傳送）】")) {	// 1090113 Raymond 依Jammie最終確認再修改
			theLogger.warn("未通過職名章檢核, 使用者仍選擇繼續傳送");
			return true;
		}
	}
	else if(theSSO.User.EnvSettings.get("AOL_ENABLE_PASS_CHECK_SIGNET_NG").match(/Y/i)) {
		// 1081226 Raymond 1081160 應鐵道局主任要求修改提示訊息文字
		//if(confirm(errMsg + "\n\n是否繼續?")) {
		if(confirm(errMsg + "\n\n無需補章，請按「確定」，\n需補章，請按「取消」。")) {
			theLogger.warn("未通過職名章檢核, 使用者仍選擇繼續傳送");
			return true;
		}
	}
	else
	alert(errMsg);
	return false;
}

/* 2016.3.21 改叫用Eric的SSOUtil.isConsultingDoc來判斷是否為會辦公文
function _isConsultingDoc() {
	var icOU = theAOL.docObj.get('ODWMSG', 'INCHARGE_OU'),
		ownOU = theAOL.docObj.get('ODWMSG', 'OWN_OU_ID');
	var lv1ICOU = icOU.substring(0, 2),
		lv1OwnOU = ownOU.substring(0, 2);
	
	if(icOU == ownOU) {
		theLogger.log("_isConsultingDoc(): ICOU = OwnOU = " + icOU);
		return false;
	}
	if(ownOU.length == 2 && ownOU == lv1ICOU) {
		theLogger.log("_isConsultingDoc(): OwnOUId=" + ownOU + " 為承辦單位=" + icOU + " 之上級單位.[非會辦]");
		return false;
	}
	if(icOU.length == 2 && icOU == lv1OwnOU) {
		theLogger.log("_isConsultingDoc(): 承辦單位=" + icOU + " 為目前單位=" + ownOU + " 之上級單位.[非會辦]");
		return false;
	}
	
	function getUnitByNo(orgNo, unitNo)
	{
		var sOrgInfoXML = window.localStorage['orgInfo_' + orgNo];
		if (!!sOrgInfoXML && sOrgInfoXML.length)
		{
			var parser = new DOMParser();
			var orgInfoDOM = parser.parseFromString(sOrgInfoXML, 'text/xml');
			var orgInfoDoc = orgInfoDOM.documentElement;
			var orgPath = 'OrgInfo';
			var unitPath = 'Unit[UnitCode="' + unitNo + '"]';
			if (!!orgInfoDoc) {
				var $orgNodes = $(orgInfoDoc).children(orgPath)
								.filter(function() {
									return $('OrgCode', this).text()===orgNo;
								});
				if ($orgNodes.length<=0) {
					theLogger.error("_isConsultingDoc(): OrgInfo which orgNo='" + orgNo + "' NOT Found!");
					return null;
				}
				
				var orgInfo = $orgNodes[0];
				if (!!orgInfo) {
					var $unitNodes = $(orgInfo).find(unitPath);
					if ($unitNodes.length<=0) {
						theLogger.error("_isConsultingDoc(): Unit which UnitCode='" + unitNo + "' NOT Found!");
						return null;
					}
					
					var unitInfo = $unitNodes[0];
					if (!!unitInfo) {
						return unitInfo;
					}
					else {
						theLogger.error("_isConsultingDoc(): $unitNodes[0] NOT exist!?");
					}
				}
			}
			else
				theLogger.error("_isConsultingDoc(): parseFromString() failed or documentElement not exists in orgInfoDOM");
		}
		else
			theLogger.error("_isConsultingDoc(): localStorage[orgInfo_" + orgNo + "] NOT Found!");
		return null;
	};
	var srcOrgNo = theAOL.docObj.get('ODWMSG', 'SOURCE_ORGNO');
	var u = getUnitByNo(srcOrgNo, lv1OwnOU);
	if(u == null) {
		theLogger.error("_isConsultingDoc(): 找不到 OwnOUID:'" + lv1OwnOU + "' 的單位資料");
		return false;
	}
	var v = $(u).find("> Virtual").text();
	if (v == "3" ||		// (一層決行單位)
		v == "2" ||		// (虛擬單位 Ex.檔案室, 總收/發)
		v == "6") {		// (一層決行可辦文單位)
		theLogger.log("_isConsultingDoc(): UnitNo=" + $(u).find("> UnitNo").text() + ", Virtual=" + v + " 不為會辦單位");
		return false;
	}
	return true;
}*/

function _shouldCheckSignetDraftType(docType) {
	var shouldCheckTypesStr = theSSO.User.EnvSettings.get('AOL_CHECK_SIGNET_DRAFT_TYPE');
	var shouldCheckTypes = shouldCheckTypesStr.split(';');
	for(var i=0; i<shouldCheckTypes.length; i++) {
		if(shouldCheckTypes[i] == docType) {
			theLogger.log("'" + docType + "'符合應檢核職名章的文稿類型(" + shouldCheckTypesStr + ")");	// 2015.6.18 - Raymond, 加說明
			return true;
	}
	}
	return false;
}

function _shouldAutoInsertSignet() {
	if(theSSO.User.EnvSettings.get('OD_AOL_AUTO_SIGNET') == 'N') {
		theLogger.log("OD_AOL_AUTO_SIGNET = '" + theSSO.User.EnvSettings.get('OD_AOL_AUTO_SIGNET') + "' 不需自動加蓋職名章");
		return false;
	}
	else
	{
		var nonAutoStampFoldersStr = theSSO.User.EnvSettings.get('AOL_NON_AUTOSTAMP_FOLDERS');
		if(nonAutoStampFoldersStr.length > 0) {
			var bSkip = false;
			var fldr = theAOL.docObj.get('ODWMSG', 'FOLDER');
			var subfldr = theAOL.docObj.get('ODWMSG', 'SUBFOLDER');
			// AOL程式碼將此環境變數的設定值視為XML解讀
			var nonAutoStampFolders = (new DOMParser()).parseFromString(nonAutoStampFoldersStr, "text/xml");
			if(nonAutoStampFoldersStr !== undefined) {
				$(nonAutoStampFoldersStr).find("item").each(function(i, item) {
					if ($(item).find("Folder").text() == fldr &&
						$(item).find("SubFolder").text() == subfldr) {
						theLogger.log("'" + fldr + "-" + subfldr + "'符合不須自動加蓋職名章的Folder/SubFolder");
						bSkip = true;
						return false;
					}
				});
			}
			if(bSkip)
				return false;
		}
	}
	return true;	// 預設要自動加蓋職名章
}

// 2015.9.1 - Raymond, 依MenuRule決定是否檢核職名章
function _shouldCheckSignetFolder() {
	var SAMLart = localStorage.Artifact,
		docObj = theAOL.docObj;
	
	var menuRule = SSOUtil.getMenuRule_Obj(SAMLart, docObj.sourceOrgNo, docObj.signType);
	if(menuRule) {
		var rule = menuRule.getRule(docObj.folder, docObj.subfolder);
		if(rule) {
			// 搜尋目前傳送別
			for(var i=0; i<rule.txList.length; i++) {
				if(rule.txList[i].txName == docObj.txName) {
					if("specialCheck" in rule.txList[i] && typeof rule.txList[i].specialCheck === "string") {
						var res = rule.txList[i].specialCheck.match(/9/g);	// 有標記9則要檢核職名章
						theLogger.log("找到傳送別'" + docObj.txName + "'的specialCheck = '" + rule.txList[i].specialCheck + "', " + ((res)?"需檢核職名章":"不需檢核職名章"));
						return res != null;
					}
					else {	// 異常
						throw new Error("傳送別'" + docObj.txName + "'的specialCheck為" + rule.txList[i].specialCheck);
					}
				}
			}
			// 找不到?
			throw new Error("找不到傳送別'" + docObj.txName + "'的OPTION");
		}
		else {	// 異常
			throw new Error("找不到'" + docObj.folder + "-" + docObj.subfolder + "'的EDOL_UI_RULE");
		}
	}
	else {
		throw new Error("找不到'" + docObj.sourceOrgNo + "'的MenuRule");
	}
	return true;
}

// 1090803 Raymond 1090409 新增判斷資料夾及異動別是否符合應產生抄本頁面的設定
function _shouldGenFormalPageFolderTxName(_docObj) {
	var folderTxNameForce = [], folderTxNameOption = [],
		genFormalFolderTxName = theSSO.User.EnvSettings.get("AOL_GEN_FORMAL_FOLDER_TXNAME_FORCE"),
		genFormalFolderTxNameOpt = theSSO.User.EnvSettings.get("AOL_GEN_FORMAL_FOLDER_TXNAME_OPTION"),
		genFormalDraftType = theSSO.User.EnvSettings.get("AOL_GEN_FORMAL_DRAFTTYPE");
	function matchForceSetting(folder, txname) {
		if(genFormalFolderTxName.length > 0) {
			var a = genFormalFolderTxName.split(';');
			for(var i=0; i<a.length; i++) {
				if(a[i].length > 0) {
					var b = a[i].split('|');
					if(folder == b[0] && txname == b[1]) {
						theLogger.log("'" + folder + "|" + txname + "'符合AOL_GEN_FORMAL_FOLDER_TXNAME_FORCE環境變數設定, 需強制轉抄本頁面");
						return true;
					}
				}
			}
			theLogger.log("'" + folder + "|" + txname + "'不符合AOL_GEN_FORMAL_FOLDER_TXNAME_FORCE環境變數設定, 不需強制轉抄本頁面");
		}
		else
			theLogger.log("未設定AOL_GEN_FORMAL_FOLDER_TXNAME_FORCE環境變數, 不需強制轉抄本頁面");
		return false;
	}
	function matchOptionSetting(folder, txname) {
		if(genFormalFolderTxNameOpt.length > 0) {
			var a = genFormalFolderTxNameOpt.split(';');
			for(var i=0; i<a.length; i++) {
				if(a[i].length > 0) {
					var b = a[i].split('|');
					if(folder == b[0] && txname == b[1]) {
						theLogger.log("'" + folder + "|" + txname + "'符合AOL_GEN_FORMAL_FOLDER_TXNAME_OPTION環境變數設定, 需轉抄本頁面");
						return true;
					}
				}
			}
			theLogger.log("'" + folder + "|" + txname + "'不符合AOL_GEN_FORMAL_FOLDER_TXNAME_OPTION環境變數設定, 不需轉抄本頁面");
		}
		else
			theLogger.log("未設定AOL_GEN_FORMAL_FOLDER_TXNAME_OPTION環境變數, 不需轉抄本頁面");
		return false;
	}
	var folder = _docObj.folder + "-" + _docObj.subfolder;
	var closeType = _docObj.get('ODWMSG', 'CLOSE_TYPE');
	return (closeType != "3") && (matchForceSetting(folder, _docObj.txName) || matchOptionSetting(folder, _docObj.txName));	// 非存查公文且符合第1或第2組環境變數設定的資料夾加異動別組合, 才會有匯出抄本需要
}

// 1090803 Raymond 1090409 檢查可發文文稿上是否有簽核物件, 若有則提示警告直接刪除簽核物件後通過或取消傳送
function _doClearNewSignObjs(_docObj) {
	var _fm = theAOL.getCurrFolio(),
		i, j, m, n = _fm.getSignFolder().getDraftCounts(),
		firstPrompt = false;
	if(_fm.getSignFolder().hasFromDoc())
		--n;	// 檢核標的不含來文文稿, 來文的index是最後一個
	if(n > 0) {
		for(i=0; i<n; i++) {
			var d = _fm.getSignFolder().getDraft(i);
			if(d.removed()) {
				theLogger.log("已刪除文稿不處理簽核物件");
				continue;
			}
			if(!_fm.isGenFormalDraftType(i)) {
				theLogger.warn("DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 非可發文文稿類型, 不需清除簽核物件");
				continue;
			}
			m = _fm.getSignFolder().getDraftPageCounts(i);
			for(j=0; j<m; j++) {
				//theLogger.log("pg#" + j + ":");
				var pg = _fm.getSignFolder().getDraftPage(i, j);
				//theLogger.log(pg);
			
				// 有新增的簽核物件
				if(!!pg.newSignObjs && pg.newSignObjs.length > 0) {
					theLogger.warn("文稿'" + d.name + "'頁面#" + j + "上有新增的簽核物件");
					if(!firstPrompt) {
						theLogger.warn("詢問使用者是否要直接刪除新增簽核物件後繼續傳送");
						if(!confirm("本份文已產生發文抄本，不得新增簽核物件，點擊「確定」鈕後，系統會自動刪除函稿頁面上新增之簽核物件並傳送，點擊「取消」鈕則將中止傳送。"))
							return false;	// 按「取消」則回傳false, 中止傳送作業
						firstPrompt = true;	// 記錄已詢問過
					}
					while(pg.newSignObjs.length > 0) {
						var newSO = pg.newSignObjs[0];
						theLogger.warn("刪除'" + newSO.type + "'簽核物件(" + newSO.id + ")");
						pg.newSignObjs.splice(0, 1);
					}
				}
			}
		}
	}
	return true;	// 無新增簽核物件或按「確定」直接刪除新增簽核物件, 回傳true, 繼續傳送作業
}

// 2015.6.18 - Raymond, 判斷是否允許直接在來文頁面上簽核
function _enableRcvDocEditing() {
	var enableRcvDocEditFolder = theSSO.User.EnvSettings.get('AOL_ENABLE_RCVDOC_EDIT_FOLDER');
	theLogger.log("環境變數AOL_ENABLE_RCVDOC_EDIT_FOLDER='" + enableRcvDocEditFolder + "'");	// 2016.2.22 新增LOG
	if(enableRcvDocEditFolder.length > 0) {
		var a = enableRcvDocEditFolder.split(';');
		if(a.length > 0) {
			var fldr = theAOL.docObj.get('ODWMSG', 'FOLDER');
			var subfldr = theAOL.docObj.get('ODWMSG', 'SUBFOLDER');
			for(var i=0; i<a.length; i++) {
				var b = a[i].split('-');
				if(b.length == 2) {
					if(b[0] == fldr && b[1] == subfldr) {
						theLogger.log("'" + fldr + "-" + subfldr + "'符合允許直接在來文頁面上簽核的Folder/SubFolder");
						return true;
					}
				}
				else if(b.length == 1) {	// 2016.2.22 新增應對可能只有'先閱'folder沒有subfolder的情況
					if(b[0] == fldr) {
						theLogger.log("'" + fldr + "'符合允許直接在來文頁面上簽核的Folder/SubFolder");
						return true;
					}
				}
				else {
					theLogger.warn("'" + a[i] + "'不符合Folder/SubFolder結構");
				}
			}
			theLogger.log("'" + fldr + "-" + subfldr + "'不允許直接在來文頁面上簽核!");	// 2016.2.22 新增LOG
		}
	}
	else
		theLogger.warn("未定義環境變數'AOL_ENABLE_RCVDOC_EDIT_FOLDER', 預設不允許直接在來文頁面上簽核");
	return false;	// 預設不允許直接在來文頁面上簽核
}

// 2015.6.5 - Raymond, 關閉或登出時會呼叫此函式, 可在此函式中清除一些功能的狀態
// 2016.10.6 - Raymond, 新增e2p參數, 若參數值是"E2P", 則表示線上轉紙本成功要關閉此公文, 則不要updateDocObj
// 2016.12.5 - Eric, 參數更名為extraSetting, 可接受"E2P"及"cancelUpdate"設定
function _onCloseFolio(extraSetting) {
	$("#aol").find("#tcControl1 select").val(1);	// 2015.12.10 調回完稿模式
	//$("#aol").find("#leftPart #zoomControl1 select").val("-2").trigger("change");	// 調回100%		2016.9.2 改成記憶縮放比例
	//$("#aol").find("#leftPart #zoomControl1 .ui-btn-text").html("100%");
	
	// 2016.8.27 - Eric Peng, 非唯讀模式且有msgId時才更新
	// 2015.6.11 - Eric Peng, 由theAOL.docObj更新MP docObj
	var docObj_AOL = theAOL.docObj;
	var updateDocObj = true;
	if (typeof docObj_AOL.msgId!=='string' || docObj_AOL.msgId.length===0) {
		updateDocObj = false;
	}
	//2016.9.19	Leslie	配合文稿可編輯不可儲存模式(AKI802&ODT351)
	//else if (typeof docObj_AOL.uiParam=='object' && typeof docObj_AOL.uiParam.aol_readonly_mode=='boolean') {
	else if ((typeof docObj_AOL.uiParam=='object' && typeof docObj_AOL.uiParam.aol_readonly_mode=='boolean') ||
			(typeof docObj_AOL.uiParam=='object' && typeof docObj_AOL.uiParam.aol_disable_save=='boolean')){
		
		//2016.9.19	Leslie	配合文稿可編輯不可儲存模式(AKI802&ODT351)
		//if (docObj_AOL.aol_readonly_mode) {
		if (docObj_AOL.uiParam.aol_readonly_mode || docObj_AOL.uiParam.aol_disable_save) {	//2017.2.15	Leslie bug-fix 
			updateDocObj = false;
		}
	}
	else if(extraSetting == "E2P" || extraSetting=='cancelUpdate') {	// 2016.10.6 新增e2p參數判斷, 若值是"E2P"則表示線上轉紙本成功要關閉此公文, 則不要updateDocObj
		updateDocObj = false;
	}
	// 1130813 Raymond 1130313 新增判斷離線模式下關閉公文時不要updateDocObj
	else if(!!theSSO && theSSO.offlineMode == true) {
		updateDocObj = false;
	}
	
	if (updateDocObj) {
		var rslt = theSSO.MP.todolist.builder.updateDocObj(docObj_AOL.msgId, docObj_AOL);
		
		if (!rslt) {
			theLogger.error('_onCloseFolio() invoke todolist.updateDocObj() failed! msgId=\'' + docObj_AOL.msgId + '\'.');
		}
	}
	
	// 2015.6.11 - Eric Peng, [核決]/[剔退]checkbox還原未勾選
	$('#aol #chkApprove').prop('checked', false).checkboxradio('refresh');
	$('#aol #chkReject').prop('checked', false).checkboxradio('refresh');
	
	$('#aol #moChkApprove').prop('checked', false).checkboxradio('refresh');
	$('#aol #moChkReject').prop('checked', false).checkboxradio('refresh');
	
	// 2017.4.21 - 1060272 select#chooseX 避免選到傳送子視窗
	// 2016.8 - Eric Peng, 傳送選單UI清空
	var $chooseA = $('#aol #transPanel select#chooseA'),
	    $chooseB = $('#aol #transPanel select#chooseB'),
		$chooseC = $('#aol #transPanel select#chooseC'),
		$chooseD = $('#aol #transPanel select#chooseD');
	$chooseA.html('').closest('.ui-select').hide();
	$chooseB.html('').closest('.ui-select').hide();
	$chooseC.html('').closest('.ui-select').hide();
	$chooseD.html('').closest('.ui-select').hide();
	$chooseA.selectmenu('refresh'); $chooseB.selectmenu('refresh');
	$chooseC.selectmenu('refresh'); $chooseD.selectmenu('refresh');

	// 2018.4.12 - NCKU107284, Eric Peng - 公文開啟完成前不顯示部份上方工具列按鈕(ex. 儲存/傳送)
	$('#aol #pcTxList').css({'display':'none'});
	$('#aol #pcSubmit').css({'display':'none'});
	$('#aol #pcUtil').css({'display':'none'});
	
	$('#aol #moGrpUtil').css({'display':'none'});
	$('#aol #moSubmitPanel').css({'display':'none'});

	//1110629	Leslie[1110629]	考試院UI/UX需求，修改傳送選單
	$('#aol #pcTranMode').hide();
	$('#aol #pcTxEasy').hide();
	$('#btnWWKFSetting').hide();
	$('#btnSendBack').hide();
	$('#swTranMode').val('on').slider('refresh');;	//回到預設值

	$('#btnWWKF_PDoc').hide(); // 2021.7 - 11--433 Eric, 預設不顯示btbWWFK_PDoc

	SSOUtil.toggleFuncButton(0x3, true); // 2019.7 - Eric, 公文傳送作業異常中斷,於關閉套件時恢復[儲存]/[傳送]按鈕.
	
	// 1100819 Raymond 1100431 關閉公文時一併關閉搜尋面板
	if(!!nsEditor && "searchPanel" in nsEditor) {
		nsEditor.searchPanel("close");
	}
}

// 2015.9.17 - Raymond, 依MenuRule決定是否readOnly
function _isReadOnlyFolder() {
	var SAMLart = localStorage.Artifact,
		docObj = theAOL.docObj,
		menuRule = SSOUtil.getMenuRule_Obj(SAMLart, docObj.sourceOrgNo, docObj.signType);
	
	if(menuRule) {
		var rule = menuRule.getRule(docObj.folder, docObj.subfolder);
		if(rule) {
			theLogger.log("文件夾[" + docObj.folder + "-" + docObj.subfolder + "].readOnly = " + rule.readOnly);
			return rule.readOnly == "Y" || rule.readOnly == "R";	// 2015.10.15 比照AOL
		}
	}
}

// 1100715 Raymond 1090927 修正獨立子視窗模式(DocView)下, 需要判斷是否為行動裝置但無ODWDCM, 導致其它UIStatus無法正常取得造成的錯誤問題, 將判斷行動裝置的部分切到_getUIStatus()外部
function _getMobileDeviceUI(docObj) {
	if (window.iOS_device || (typeof window.forceUIMode=='string' && window.forceUIMode=='MOBILE')) { // 2016.11.10
		return true;
	}
	else {
		var showMobileUI = false;
		// 2017.4.19 - Eric, ToDo: 下次改版前刪除此段測試碼!
		// 2017.3.30 - trace mobileUI switch
		// var debugToolbar = (typeof _debug==='boolean' && !!_debug && typeof window.forceUIMode!=='string' || window.forceUIMode!=='PC') ? true : false;
		var debugToolbar = (typeof window.forceUIMode!=='string' || window.forceUIMode!=='PC') ? true : false;
		if (docObj.signType=='E' && debugToolbar) {
			var wnd_w = $(window).innerWidth();
			if (wnd_w<=1024) {
				showMobileUI = true;
			}
		}
		if (showMobileUI) {
			return true;
		}
	}
	return false;
}

/* 2015.10.15 - Eric Peng, 依 MenuRule/EnvSet.MP_ENABLE_REJECTUSER/ODWDCM.CANCEL_APP_ENABLE
 * 決定儲存/核決/剔退/傳送UI顯示狀況
 */
function _getUIStatus(docObj, uiParam) {
	// 2021.7 - 1100433 Eric, merge: 2017.9.7 - 1060389
	function _showWWKFButton(_theDocObj) {
		var openMode = 0;
		var orgNode = SSOUtil.getOrgNode(_theDocObj.sourceOrgNo);
		var fConsultDoc = SSOUtil.isConsultingDoc(_theDocObj, theSSO.User.EnvSettings, orgNode);
		if (_theDocObj.ICOUId.length && _theDocObj.ownOUId.length) { // 2017.11.21 - NCKU9053/11001, 會辦單位可異動預排流程
            if (_theDocObj.ICUserId.length && _theDocObj.ownUserId.length &&
                _theDocObj.ICOUId==_theDocObj.ownOUId && _theDocObj.ICUserId==_theDocObj.ownUserId) {
                // 公文在承辦人流程 => mode: 1
                openMode = 1;
            }
            else { 
				// 2017.11.10 - NCKU9053/11001, 修改Mode設定值.
                if (fConsultDoc) {
                    openMode = 3; // 流程位於會辦單位
                }
                else {
                    openMode = 2;  // 其它, [非承辦人 && 流程不在會辦單位]
				}
			}
        }

		//1131204	Leslie[1131151]	修正因單位代碼含非數字部分，造成判斷一層決行與虛擬單位錯誤的問題，改用字串紀錄與比對
        // if (openMode==0 && parseInt(_theDocObj.ownOUId)>=window.sso_const.APPROVEUNIT_NUM) {
        if (openMode==0 && _theDocObj.ownOUId>=window.sso_const.APPROVEUNIT_NUM) {
            // ownOUId>=95 => mode: 2
            openMode = 2;    
        }

        if ((openMode==1 || openMode==2 || openMode==3)) { // && typeof SSO_CONFIG.WWKFSetup=='string' && SSO_CONFIG.WWKFSetup.length)  {
			return true;
		}
		return false;
	}

	var SAMLart = localStorage.Artifact,
		menuRule = null, rule = null;
		
	if (typeof docObj=='undefined' || docObj===null) {
		docObj = theAOL.docObj;
	}
	
	var readOnly = true;
	var buttonFlag = '';
	var showTButton = false;
	var showWWKFButton = false; // 2017.10.18 - 1060748
	var showRefDocButton = false; // 2021.6 - 1080761 Eric, merge 2018.5.14 - 1070298 (目前只要是線上簽核公文, 一律顯示)
	let sVal = theSSO.User.SystemSets.USE_REF_DOC;
	if (typeof sVal=='string' && sVal.length && SSOUtil.isValueTrue(sVal)) {
		showRefDocButton = true;
	}

	// 1100715 Raymond 1090927 修正獨立子視窗模式(DocView)下, 需要判斷是否為行動裝置但無ODWDCM, 導致其它UIStatus無法正常取得造成的錯誤問題, 將判斷行動裝置的部分切到_getUIStatus()外部, 即上方的_getMobileDeviceUI()
	// 2016.10.24
	//var mobileDeviceUI = false;
	var mobileDeviceUI = _getMobileDeviceUI(docObj);
	
	var rslt;
	if ((typeof uiParam=='object' && uiParam.aol_readonly_mode===true) ||
		//2016.9.19	Leslie	配合文稿可編輯不可儲存模式(AKI802&ODT351)
		(typeof uiParam=='object' && uiParam.aol_disable_save===true) ||
		(typeof docObj.msgId!=='string' || docObj.msgId.length===0)) { // 2016.9.14 - 若msgId未定義或為空字串=>檢閱模式
		rslt = {
			showTButton : false,
			hiddenSubmitPanel : true,
			readOnly : true,
			enableApproveBtn : false,
			showApproveBtn : false,
			showRejectBtn : false,
			buttonF : '',
			mobileDeviceUI : mobileDeviceUI,
			showWWKFButton: showWWKFButton
		};
		//2016.9.19	Leslie	增加處理disableSave相關邏輯
		if(typeof uiParam=='object' && uiParam.aol_readonly_mode!==true)	//2016.10.06	Leslie	readOnly的優先權應大於disableSave，故應該確認不為唯讀模式，才啟用編輯(文稿編輯模式，readOnly會給false)
		if(typeof uiParam=='object' && uiParam.aol_disable_save===true)
			rslt.buttonF = 'R';
		return rslt;
	}

	// 2021.7 - 1100433 Eric, merge: 2017.9.7 - 1060389
	showWWKFButton = _showWWKFButton(docObj); 
	let cancelAppEnable = docObj.get('ODWDCM', 'CANCEL_APP_ENABLE');
	if (cancelAppEnable.length) {
		cancelAppEnable = cancelAppEnable.toLowerCase();
	}
	
	/* 2016.7 - Eric Peng, 紙本公文 */
	if (docObj.signType=='P') {
		readOnly = false;
		var readOnlyP = false;	// 1101108 Raymond 1090860 新增另一個紙本公文唯讀模式專用Flag
		menuRule = SSOUtil.getMenuRule_Obj(SAMLart, docObj.sourceOrgNo, docObj.signType);
		if(menuRule) {
			rule = menuRule.getRule(docObj.folder, docObj.subfolder);
			if(rule) {
				if (typeof rule.buttonF == 'string') {
					buttonFlag = rule.buttonF;
				}
				else {
					buttonFlag = '';
				}
				// 1100906 Raymond 1090860 新增判斷metaDataM第3碼, 若為'R'則以唯讀模式開啟紙本公文
				if(typeof rule.metaDataM == 'string') {
					if(rule.metaDataM.length > 2) {
						// 1101108 Raymond 1090860 新增另一個紙本公文唯讀模式專用Flag
						//readOnly = rule.metaDataM[2] == 'R' || rule.metaDataM[2] == 'r';
						//if(readOnly)
						readOnlyP = rule.metaDataM[2] == 'R' || rule.metaDataM[2] == 'r';
						if(readOnlyP)
							theLogger.log("Rule的METADATA_M(" + rule.metaDataM + ")的第3碼為'" + rule.metaDataM[2] + "', 應以唯讀模式開啟紙本公文");
						else
							theLogger.log("Rule的METADATA_M(" + rule.metaDataM + ")的第3碼為'" + rule.metaDataM[2] + "', 無法識別的設定");
					}
				}

				//1110324 David 1101388 紙本簽核如RULE未設定WebPage，不顯示流程設定按鈕
				if(typeof rule.webPage == 'undefined')
					showWWKFButton = false;
				else if(rule.webPage.length == 0)
					showWWKFButton = false;
			}
		}
		
		var showSaveButton = false;
		buttonFlag = buttonFlag.toUpperCase();
		if (buttonFlag.indexOf('T')!=-1) {
			showTButton = true;
		}
		if (buttonFlag.indexOf('A')!=-1) {
			showSaveButton = true;
		}
		
		// 2016.8.26 - 紙本公文若BUTTON_F沒有R即為唯讀項目!
		if (buttonFlag.indexOf('R')==-1) {
			//readOnly = true;
		}
		
		rslt = {
			showTButton : showTButton,
			hiddenSubmitPanel : showTButton? false : true,
			readOnly : readOnly,
			readOnlyP : readOnlyP,	// 1101108 Raymond 1090860 新增另一個紙本公文唯讀模式專用Flag
			showApproveBtn : false,
			showRejectBtn : false,
			enableApproveBtn : false,
			showSaveButton : showSaveButton,
			buttonF : buttonFlag,
			mobileDeviceUI : mobileDeviceUI,
			showWWKFButton : showWWKFButton, // 2021.7 - 1100433 Eric, merge: 1060389; 2017.10.18 - 1060748
			showRefDocButton : false // 2021.6 - 1080761 Eric, merge: 2018.5.14 - 1070298
		};

		// 2021.7.9 - 1100433 Eric, merge: 2017.9.7 - 1060389, 紙本簽核公文顯示核決checkbox
		//  新增系統參數PFLOW_TO_USER決定紙本公文是否顯示[套件上方工具列]的[核決]checkbox
		let sTFlowToUser = theSSO.User.SystemSets.get('PFLOW_TO_USER');
		let fTFlowToUser = false;
		if (typeof sTFlowToUser=='string' && SSOUtil.isValueTrue(sTFlowToUser)) {
			fTFlowToUser = true;
		}

		//1110316 David 1101388 紙本簽核依參數判斷是否顯示流程設定按鈕
		let sPFlowUseWWKF = theSSO.User.SystemSets.get('P_FLOW_USE_WWKF');
		if(sPFlowUseWWKF != "Y")
			rslt.showWWKFButton = false;

		if (showTButton && fTFlowToUser) {
			rslt.showApproveBtn = true;
			if (cancelAppEnable=='y' && !readOnly) {
				rslt.enableApproveBtn = true;
			}
			else {
				rslt.enableApproveBtn = false;
			}
		}
		return rslt;
	}
	
	//var cancelAppEnable = docObj.get('ODWDCM', 'CANCEL_APP_ENABLE');
	//if (cancelAppEnable.length) {
	//	cancelAppEnable = cancelAppEnable.toLowerCase();
	//}
	
	rslt = {
		showTButton : false,
		hiddenSubmitPanel : true,
		readOnly : true,
		enableApproveBtn : false,
		showRejectBtn : false,
		mobileDeviceUI : mobileDeviceUI,
		showWWKFButton : false, // 2017.10.18 - 1060748
		showRefDocButton : false // 2021.6 - 1080761 Eric, merge: 2018.5.14 - 1070298
	};
	
	menuRule = SSOUtil.getMenuRule_Obj(SAMLart, docObj.sourceOrgNo, docObj.signType);
	if(menuRule) {
		rule = menuRule.getRule(docObj.folder, docObj.subfolder);
		if(rule) {
			theLogger.log("文件夾[" + docObj.folder + "-" + docObj.subfolder + "].readOnly = " + rule.readOnly);
			readOnly = (rule.readOnly == "Y" || rule.readOnly == "R") ? true : false;
			if (typeof rule.buttonF == 'string') {
				buttonFlag = rule.buttonF;
			}
			else {
				buttonFlag = '';
			}
		}
	}
	
	// 2017.10.13 - 1060748 預排流程設定UI調整
	if (docObj.signType=='E') {
		/* PC版實作預排程設定, [@MPRuleE_$OrgNo$.xml] <EDOL_UI_RULE><WEBPAGE>不為空字串時可開啟預排流程, 此處套用此設定,
         * 但開啟的 WebPage取 SSO_CONFIG.SetWWKF_Path設定值
         */
		var orgNode=null, fConsultDoc=false;
        var wwkf_URL = (typeof SSO_CONFIG.SetWWKF_Path=='string' && SSO_CONFIG.SetWWKF_Path.length) ? SSO_CONFIG.SetWWKF_Path : '';
        if (wwkf_URL.length && (typeof rule !== 'undefined') && (typeof rule.webPage !== 'undefined') && rule.webPage.length) {
			showWWKFButton = true;
			
			/* 2017.10.23 - 1060975, 會辦單位開啟預排流程判定取消[成大功能,毋須merge至共通版]
			orgNode = SSOUtil.getOrgNode(docObj.sourceOrgNo);
            if (typeof orgNode!=='undefined'){
				fConsultDoc = SSOUtil.isConsultingDoc(docObj, theSSO.User.EnvSettings, orgNode);
                // 會辦單位開啟不能使用預排流程設定!
                if (fConsultDoc) {
                    showWWKFButton = false;
                }
            }*/
        }
		rslt.showWWKFButton = showWWKFButton;

		// 2021.6 - 1080761 Eric, merge: 2018.5.29 - [補]1070298, 承辦人流程才顯示參考公文設定介面.
		if (docObj.ownRoleId=='OD99' && docObj.ownUserId==docObj.ICUserId && showRefDocButton) {
			rslt.showRefDocButton = showRefDocButton;
		}
	}

	buttonFlag = buttonFlag.toUpperCase();
	if (buttonFlag.indexOf('T')!=-1) {
		showTButton = true;
	}
	
	if (!showTButton) {
		rslt.hiddenSubmitPanel = true;
		rslt.readOnly = readOnly;
		rslt.buttonF = buttonFlag;
	}
	else {
		rslt.hiddenSubmitPanel = false;
		rslt.readOnly = readOnly; // AOL: readonly時不能儲存公文
		rslt.showTButton = showTButton; // 2016.10.4
		if (cancelAppEnable=='y' && !readOnly) {
			rslt.enableApproveBtn = true;
		}
		else {
			rslt.enableApproveBtn = false;
		}
		rslt.showApproveBtn = true;
		
		// 2017.3.14 - FDA-1060130-線上簽核公文不再使用剔退鍵
		/*var envSets = theSSO.User.EnvSettings;
		var showRejectUI = envSets.get('MP_ENABLE_REJECTUSER');
		if ((typeof showRejectUI === 'string') && (showRejectUI=='Y' || showRejectUI=='y')) {
			rslt.showRejectBtn = true;
		}
		else {
			rslt.showRejectBtn = false;
		}*/
		rslt.buttonF = buttonFlag;
	}
	return rslt;
}

// 2016.6.1 - Raymond, 檢核核示語詞(1050095)
function _checkStamp() {
	var i, j, n, m, errMsg = [];	// 2016.6.13 改成陣列
	
	// 2015.9.1 修正依MenuRule決定是否檢核核示語詞
	try {
		if(!_shouldCheckStampFolder())
			return true;	// 不需檢核核示語詞視為通過檢核
	}
	catch(e) {
		alert(e);
		return false;
	}
	
	var hasCoworkDraftType = false;	// 有簽稿會核單
		
	n = theAOL.getCurrFolio().getSignFolder().getDraftCounts();
	if(theAOL.getCurrFolio().getSignFolder().hasFromDoc())
		--n;	// 檢核標的不含來文文稿, 來文的index是最後一個
	if(n > 0) {
		errMsg.push("下列文稿:\r\n");	// 2016.6.13 改成陣列
		for(i=0; i<n; i++) {
			var d = theAOL.getCurrFolio().getSignFolder().getDraft(i);
			if(d.docType == "簽稿會核單")
				hasCoworkDraftType = true;
		}
		
		var allpass = true;	// 2016.6.13 要全部文稿都有才通過
		for(i=0; i<n; i++) {
			var d = theAOL.getCurrFolio().getSignFolder().getDraft(i);
			if(d.removed()) {
				theLogger.log("已刪除文稿不檢核核示語詞");
				continue;
			}
			if(!_shouldCheckSignetDraftType(d.docType)) {
				theLogger.warn("DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 不在應檢核文稿類型清單中.[見環境變數'AOL_CHECK_SIGNET_DRAFT_TYPE'設定值]");
				continue;
			}
			/*if(enhancedMode) {
				// 會辦公文且有簽稿會核單, 只檢核簽稿會核單
				if(isConsultingDoc && hasCoworkDraftType) {
					if(d.docType != "簽稿會核單") {
						theLogger.log("[會辦公文, 有簽稿會核單] DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 不檢核!");
						continue;
					}
				}
				// 有簽稿會核單但不是會辦公文, 毋須檢核簽稿會核單
				else if(hasCoworkDraftType) {
					if(d.docType == "簽稿會核單") {
						theLogger.log("[非會辦公文, 有簽稿會核單] DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 不檢核!");
						continue;
					}
				}
				theLogger.log("[EnhancedMode] " + (isConsultingDoc?"":"非") + "會辦公文, " + (hasCoworkDraftType?"有":"無") + "簽稿會核單, 檢核 DraftInfo Id='" + d.id + "' 文稿類型: '" + d.docType + "'");
			}
			else {
				theLogger.log("[NormalMode] gonna check all drafts");
			}*/
			if(d.docType == "簽稿會核單") {
				theLogger.warn("DraftInfo Id='" + d.id + "' 文稿類型:'" + d.docType + "' 不檢核!");
				continue;
			}
			
			//errMsg += (i+1) + ".文稿類型: " + d.docType + ", 標題: " + d.name + "\r\n";
			var found = false, wrong = [];
			m = theAOL.getCurrFolio().getSignFolder().getDraftPageCounts(i);
			for(j=0; j<m; j++) {
				theLogger.log("pg#" + j + ":");
				var pg = theAOL.getCurrFolio().getSignFolder().getDraftPage(i, j);
				theLogger.log(pg);
			
				// 從新增的簽核物件中判斷是否有核示語詞
				if("newSignObjs" in pg) {
					for(var k=0; k<pg.newSignObjs.length; k++) {
						var newSO = pg.newSignObjs[k];
						theLogger.log(newSO);
						if(newSO.type == "stamp" || newSO.type == "stamp.text") {
							if("actionName" in newSO && typeof newSO.actionName === "string" && newSO.actionName.length > 0) {
								theLogger.log("\t有核示語詞(" + newSO.actionName + ")");
								if(_checkActionMatch(newSO.actionName))
									found = true;	// 2016.6.13 fix
									//return true;	// 有一個符合條件即可通過檢核
								else {
									wrong.push({id: newSO.id, nm: newSO.actionName});
									//errMsg += "  有加蓋核示語詞(文件夾識別碼:" + newSO.id + ", " + newSO.actionName + "), 但與設定的結案類型不符!\r\n";
								}
							}
						}
					}
				}
			}
			if(!found) {
				if(wrong.length > 0) {
					var str = "" + (i+1) + ".文稿類型: " + d.docType + ", 標題: " + d.name + "\r\n";
					for(j=0; j<wrong.length; j++)
						// 1130805 Raymond 中榮序171 修正檢核核示語詞的關聯動作與結案類型不一致時, 顯示的核示語詞關聯動作名稱變成undefined的問題
						//str += "   有加蓋核示語詞(文件夾識別碼:" + wrong[j].id + ", " + wrong[j].actionName + "), 但與設定的結案類型不符!\r\n";
						str += "   有加蓋核示語詞(文件夾識別碼:" + wrong[j].id + ", " + wrong[j].nm + "), 但與設定的結案類型不符!\r\n";
					errMsg.push(str);
					theLogger.warn("文稿'" + d.id + "'(" + d.name + "), 文稿稿型:'" + d.docType + "'有加蓋核示語詞, 但與設定的結案類型不符!");
				}
				else {
					errMsg.push((i+1) + ".文稿類型: " + d.docType + ", 標題: " + d.name + "\r\n   未加蓋核示語詞!\r\n");	// 2016.6.13 改成陣列
					theLogger.warn("文稿'" + d.id + "'(" + d.name + "), 文稿稿型:'" + d.docType + "'未加蓋核示語詞!");
				}
				allpass = false;	// 2016.6.13 一筆沒有視為不通過
			}
		}
		if(allpass)	// 2016.6.13 要全部文稿都有才通過
			return true;
	}
	else if(theAOL.getCurrFolio().getSignFolder().hasFromDoc()) {
		// TODO: 封裝檔版本小於2010才可用?
		// 沒有任何文稿，檢查來文本文頁面
		// 2015.6.18 - Raymond, 新增判斷AOL_ENABLE_RCVDOC_EDIT_FOLDER有值代表啟用來文頁面直接簽核, 應檢核職名章
		if(_enableRcvDocEditing()) {
			var found = false;
			m = theAOL.getCurrFolio().getSignFolder().getDraftPageCounts(0);
			errMsg = "來文內容\r\n";
			for(j=0; j<m; j++) {
				theLogger.log("pg#" + j + ":");
				var pg = theAOL.getCurrFolio().getSignFolder().getDraftPage(0, j);
				theLogger.log(pg);
			
				// 從新增的簽核物件中判斷是否有職名章
				if("newSignObjs" in pg) {
					for(var k=0; k<pg.newSignObjs.length; k++) {
						var newSO = pg.newSignObjs[k];
						theLogger.log(newSO);
						if(newSO.type == "stamp" || newSO.type == "stamp.text") {
							if("actionName" in newSO && typeof newSO.actionName === "string" && newSO.actionName.length > 0) {
								theLogger.log("\t有核示語詞(" + newSO.actionName + ")");
								found = true;
								if(_checkActionMatch(newSO.actionName))
									return true;	// 有一個符合條件即可通過檢核
								else {
									theLogger.log("\t但與設定的結案類型不符!");
									errMsg += "   有加蓋核示語詞(文件夾識別碼:" + newSO.id + ", " + newSO.actionName + "), 但與設定的結案類型不符!\r\n";
								}
							}
						}
					}
				}
			}
			if(!found) {
				errMsg = "來文內容未加蓋核示語詞!";
				theLogger.warn("來文頁面上未加蓋任何核示語詞!");
			}
		}
		else {
			theLogger.log("不允許來文頁面上直接簽核, 不需檢核核示語詞");
			return true;
		}
	}
	else {
		errMsg = "沒有文稿!";
		theLogger.warn("無任何文稿無法檢核核示語詞");
	}
	if(typeof errMsg === "string")
		alert(errMsg);
	else {	// 2016.6.13 改成陣列
		var str = "";
		for(i=0; i<errMsg.length; i++)
			str += errMsg[i];
		alert(str);
	}
	return false;
}

// 2016.6.1 - Raymond, 依MenuRule決定是否檢核核示語詞(1050095)
function _shouldCheckStampFolder() {
	var SAMLart = localStorage.Artifact,
		docObj = theAOL.docObj,
		menuRule = null;
	
	menuRule = SSOUtil.getMenuRule_Obj(SAMLart, docObj.sourceOrgNo, docObj.signType);
	if(menuRule) {
		var rule = menuRule.getRule(docObj.folder, docObj.subfolder);
		if(rule) {
			// 搜尋目前傳送別
			for(var i=0; i<rule.txList.length; i++) {
				if(rule.txList[i].txName == docObj.txName) {
					if("specialCheck" in rule.txList[i] && typeof rule.txList[i].specialCheck === "string") {
						var res = rule.txList[i].specialCheck.match(/S/g);	// 有標記S則要檢核核示語詞
						theLogger.log("找到傳送別'" + docObj.txName + "'的specialCheck = '" + rule.txList[i].specialCheck + "', " + ((res)?"需檢核核示語詞":"不需檢核核示語詞"));
						return res != null;
					}
					else {	// 異常
						throw new Error("傳送別'" + docObj.txName + "'的specialCheck為" + rule.txList[i].specialCheck);
					}
				}
			}
			// 找不到?
			throw new Error("找不到傳送別'" + docObj.txName + "'的OPTION");
		}
		else {	// 異常
			throw new Error("找不到'" + docObj.folder + "-" + docObj.subfolder + "'的EDOL_UI_RULE");
		}
	}
	else {
		throw new Error("找不到'" + docObj.sourceOrgNo + "'的MenuRule");
	}
	return true;
}

// 2016.6.1 - Raymond, 檢核核示語詞的關聯動作與公文結案類型是否一致(1050095)
function _checkActionMatch(actName) {
	var a = theAOL.actDef.find(actName);
	if(a) {
		var at;
		if(a.approveType == "機關發文")
			at = 1;
		else if(a.approveType == "單位發文")
			at = 2;
		else if(a.approveType == "存查")
			at = 3;
		else
			theLogger.error("無法識別的approveType'" + a.approveType + "', 無法確定與公文結案類型是否一致");
		if(theAOL.docObj.ODWDCM.CLOSE_TYPE == at)
			return true;
	}
	else {
		theLogger.error("ActionDefine.XML中找不到核示語詞設定的關聯動作'" + actName + "'");
	}
	return false;
}

// 1140828 Raymond 1140762 會辦單位退文時, 若異動別符合環境變數「AOL_CHECK_SENDBACK_COMMENT_TXNAME」設定之一, 則檢核簽稿會核單是否有同一級單位流程點新增的文字意見, 無則提示警告訊息並中止傳送
function _checkTxCmt(_docObj) {
	let txNm = _docObj.txName,
		checkSBCmtTxName = theSSO.User.EnvSettings.get("AOL_CHECK_SENDBACK_COMMENT_TXNAME");
	if(!checkSBCmtTxName)	// 未設定環境變數時, 不做檢核, 可以傳送
		return true;
	
	let orgNode = SSOUtil.getOrgNode(_docObj.sourceOrgNo);
	if (typeof orgNode==='undefined') {
		theLogger.error("找不到'" + _docObj.sourceOrgNo + "'的OrgInfo節點, 無法判斷是否為會辦單位!");
		alert("找不到'" + _docObj.sourceOrgNo + "'的OrgInfo節點, 無法判斷是否為會辦單位!");
		return false;
	}
	let isConsultingDoc = SSOUtil.isConsultingDoc(_docObj, theSSO.User.EnvSettings, orgNode);
	if(!isConsultingDoc || _docObj.ownOUId.substr(0, 2) == _docObj.ICOUId.substr(0, 2))	// 非會辦公文或內會, 不做檢核, 可以傳送
		return true;
	
	checkSBCmtTxName = checkSBCmtTxName.split(",");
	if(checkSBCmtTxName.indexOf(txNm) < 0) {
		theLogger.log("異動別'" + txNm + "'不符合環境變數「AOL_CHECK_SENDBACK_COMMENT_TXNAME」設定, 不檢核有無文字意見(退文原因)");
		return true;
	}
	
	let res = false, n = theAOL.getCurrFolio().getSignFolder().getDraftCounts();
	theLogger.log(`checkTxCmt: 線上簽核公文共${n}筆文稿`);	// 1141223 Raymond 北榮序460 新增檢核過程的詳細資訊
	if(theAOL.getCurrFolio().getSignFolder().hasFromDoc()) {
		--n;	// 檢核標的不含來文文稿, 來文的index是最後一個
		theLogger.log(`checkTxCmt: 本件公文含來文, 文稿數-1=${n}`);	// 1141223 Raymond 北榮序460 新增檢核過程的詳細資訊
	}
	if(n > 0) {
		theLogger.log(`checkTxCmt: 本件公文sourceOrgNo=${_docObj.sourceOrgNo}, doNo=${_docObj.docNo}, artifact=${localStorage.Artifact}, 呼叫getToDoList2取得todoList...`);	// 1141223 Raymond 北榮序460 新增檢核過程的詳細資訊
		// 1141201 Raymond 北榮序411 getDocToDoList改成getDocToDoList2, 以避免找到其他機關的同文號的TodoList資訊
		//let docToDoList = SSOUtil.getDocToDoList(_docObj.docNo, htmlencode(localStorage.Artifact)),
		let docToDoList = SSOUtil.getDocToDoList2(_docObj.sourceOrgNo, _docObj.docNo, htmlencode(localStorage.Artifact)),
			lv1OU = _docObj.ownOUId.substr(0, 2),
			coll = [];
		theLogger.log(`checkTxCmt: docToDoList=${JSON.stringify(docToDoList)}`);	// 1141223 Raymond 北榮序460 新增檢核過程的詳細資訊
		// 1141216 Raymond 北榮序449 修正會辦單位加註意見呈核至長官, 長官退回原承辦人時, TodoList最後一個流程點是"已送出"資料夾, OwnOU前2碼會異於會辦單位OwnOU前2碼, 造成誤判的問題
		let fldrSubmit = theSSO.User.EnvSettings.get("FOLDER_SUBMIT"),		// 已送出
			fldrDiscuss = theSSO.User.EnvSettings.get("FOLDER_DISCUSS");	// 會核中
		theLogger.log(`checkTxCmt: 本件公文ownOUId=${_docObj.ownOUId}, lv1OU=${lv1OU}, FOLDER_SUBMIT=${fldrSubmit}, FOLDER_DISCUSS=${fldrDiscuss}, 開始過濾應檢核的流程點msgId...`);	// 1141223 Raymond 北榮序460 新增檢核過程的詳細資訊
		for(let i=docToDoList.length - 1; i>=0; i--) {
			if(docToDoList[i].ownOUId.substr(0, 2) == lv1OU) {
				theLogger.log(`checkTxCmt: docToDoList#${i} ownOUId=${docToDoList[i].ownOUId}, 前2碼=${docToDoList[i].ownOUId.substr(0, 2)}符合lv1OU(${lv1OU}), 應檢核msgId=${docToDoList[i].msgId}`);	// 1141223 Raymond 北榮序460 新增檢核過程的詳細資訊
				coll.push(docToDoList[i].msgId);
			}
			// 1141216 Raymond 北榮序449 修正會辦單位加註意見呈核至長官, 長官退回原承辦人時, TodoList最後一個流程點是"已送出"資料夾, OwnOU前2碼會異於會辦單位OwnOU前2碼, 造成誤判的問題
			// 1141201 Raymond 北榮序411 修正TodoList中會辦單位流程點後面若出現了承辦單位的"通知"流程點, 應忽略, 以免造成誤判的問題
			//else
			//else if(docToDoList[i].folder != "通知")
			else if(docToDoList[i].folder != fldrSubmit && docToDoList[i].folder != fldrDiscuss && docToDoList[i].folder != "通知") {
				theLogger.log(`checkTxCmt: docToDoList#${i} ownOUId=${docToDoList[i].ownOUId}, 前2碼=${docToDoList[i].ownOUId.substr(0, 2)}不符合lv1OU(${lv1OU}), 且folder=${docToDoList[i].folder}, 不是FOLDER_SUBMIT(${fldrSubmit})也不是FOLDER_DISCUSS(${fldrDiscuss})也不是'通知', 中止搜尋`);	// 1141223 Raymond 北榮序460 新增檢核過程的詳細資訊
				break;
			}
			else	// 1141223 Raymond 北榮序460 新增檢核過程的詳細資訊
				theLogger.log(`checkTxCmt: docToDoList#${i} ownOUId=${docToDoList[i].ownOUId}, 前2碼=${docToDoList[i].ownOUId.substr(0, 2)}不符合lv1OU(${lv1OU}), folder=${docToDoList[i].folder}符合例外資料夾, 忽略之, 搜尋下一筆`);
		}
		theLogger.log(`checkTxCmt: 應檢核流程點=${coll.join(',')}`);	// 1141223 Raymond 北榮序460 新增檢核過程的詳細資訊
		for(let i=0; i<n; i++) {
			let d = theAOL.getCurrFolio().getSignFolder().getDraft(i);
			// 1141107 Raymond 1140762 Ying說不要限制只檢核簽稿會核單, 任一文別有本流程新增的文字意見, 就可傳送
			//if(d.docType == "簽稿會核單") {
				console.log(d);
				for(let j=0; j<d.draftPages.pages.length; j++) {
					for(let k=0; k<d.draftPages.pages[j].newSignObjs.length; k++) {
						if(d.draftPages.pages[j].newSignObjs[k].type == "text") {
							theLogger.log("'" + d.name + "'上有本流程點新增的文字意見(ID:" + d.draftPages.pages[j].newSignObjs[k].id + "), 允許傳送");
							res = true;
						}
					}
				}
			//}
		}
		if(!res && coll.length > 0) {
			let revs = theAOL.signFolder.getRevisions();
			let ra = [];
			for(rev in revs)
				ra.push(rev);
			theLogger.log(`checkTxCmt: 封裝檔內所有流程點=${ra.join(',')}`);	// 1141223 Raymond 北榮序460 新增檢核過程的詳細資訊
			for(rev in revs) {
				if(coll.indexOf(rev.substr(rev.indexOf("_")+1)) >= 0) {
					theLogger.log(`checkTxCmt: 檢核${rev}流程點...文稿數=${revs[rev].obj.signInfo.drafts.length}`);	// 1141223 Raymond 北榮序460 新增檢核過程的詳細資訊
					for(let i=0; i<revs[rev].obj.signInfo.drafts.length; i++) {
						let d = revs[rev].obj.signInfo.drafts[i];
						// 1141107 Raymond 1140762 Ying說不要限制只檢核簽稿會核單, 任一文別有本流程新增的文字意見, 就可傳送
						//if(d.docType == "簽稿會核單") {
							console.log(d);
							// 1141223 Raymond 北榮序460 改為檢核draftPages.signObjs, 因為draftPages.pages[n].signObjs在異動內文後會清空
							//for(let j=0; j<d.draftPages.pages.length; j++) {
							theLogger.log(`checkTxCmt: 檢核稿#${i}'${d.name}', 簽核物件數=${d.draftPages.signObjs.length}...`);	// 1141223 Raymond 北榮序460 新增檢核過程的詳細資訊
							for(let j=0; j<d.draftPages.signObjs.length; j++) {
								// 1141223 Raymond 北榮序460 改為檢核draftPages.signObjs, 因為draftPages.pages[n].signObjs在異動內文後會清空
								//for(let k=0; k<d.draftPages.pages[j].signObjs.length; k++) {
								//	if(d.draftPages.pages[j].signObjs[k].type == "文字意見" && coll.indexOf(d.draftPages.pages[j].signObjs[k].flowId.substr(d.draftPages.pages[j].signObjs[k].flowId.indexOf("_")+1)) >= 0) {
								//		theLogger.log("'" + d.name + "'上有前流程點(" + d.draftPages.pages[j].signObjs[k].flowId + ")新增的文字意見(ID:" + d.draftPages.pages[j].signObjs[k].id + "), 允許傳送");
								//	}
								//}
								theLogger.log(`checkTxCmt: 檢核簽核物件#${j}, type=${d.draftPages.signObjs[j].type}, flowId=${d.draftPages.signObjs[j].flowId}...`);	// 1141223 Raymond 北榮序460 新增檢核過程的詳細資訊
								if(d.draftPages.signObjs[j].type == "文字意見" && coll.indexOf(d.draftPages.signObjs[j].flowId.substr(d.draftPages.signObjs[j].flowId.indexOf("_")+1)) >= 0) {
									theLogger.log("'" + d.name + "'上有前流程點(" + d.draftPages.signObjs[j].flowId + ")新增的文字意見(ID:" + d.draftPages.signObjs[j].id + "), 允許傳送");
									res = true;
								}
								else	// 1141223 Raymond 北榮序460 新增檢核過程的詳細資訊
									theLogger.log(`checkTxCmt: 不符合`);
							}
						//}
					}
				}
			}
		}
	}
	if(!res) {
		theLogger.log("提示警告訊息後中止傳送");
		alert("請加註退文意見後再進行退文");
	}
	return res;
}

// 1140903 Raymond 1140765 機關暱稱為TPVGH(北榮)時, 二級單位傳送出組室前或代理公文傳送前, 檢核是否有"代"字章, 無則提示警告訊息並中止傳送
function _checkProxyWord(_docObj) {
	// 1141028 Raymond 北榮序329 新增不檢核'代'字章的條件:未設定環境變數「AOL_CHECK_PROXY_WORD_TXNAME」時, 或異動別MenuRule設為不核章時
	if(SSO_CONFIG.OrgNickName == "TPVGH") {
		if(theSSO.User.EnvSettings.get("AOL_CHECK_PROXY_WORD_TXNAME").length == 0)	// 未設定環境變數時, 即不需檢核'代'字章, 不論是否為代理公文
			return true;
		try {
			if(!_shouldCheckSignetFolder()) {	// 比照職名章檢核, 依MenuRule決定是否檢核'代'字章
				theLogger.log("此資料夾的MenuRule設定為不需核章, 也就等於不需檢核'代'字章");
				return true;	// 不需檢核職名章即不需檢核'代'字章
			}
		}
		catch(e) {
			theLogger.warn("此資料夾的MenuRule設定異常, 檢核'代'字章視為不通過");
			alert(e);
			return false;
		}
	}
	let shouldCheck = 0,
		checkProxyWordTxName = theSSO.User.EnvSettings.get("AOL_CHECK_PROXY_WORD_TXNAME").split(",");
	if(SSO_CONFIG.OrgNickName == "TPVGH") {
		if(_docObj.ownOUId.length > 2 && checkProxyWordTxName.indexOf(_docObj.txName) >= 0) {	// 北榮, 二級單位, 異動別符合環境變數「AOL_CHECK_PROXY_WORD_TXNAME」設定之一
			theLogger.log("(北榮客製化邏輯)目前流程點為二級單位, 且異動別(" + _docObj.txName + ")符合環境變數「AOL_CHECK_PROXY_WORD_TXNAME」設定之一, 檢核是否有'代'字章...");
			shouldCheck = 1;
		}
		else if(_docObj.get("ODWMSG", "IS_PROXY_DOC") == "1") {
			theLogger.log("(北榮客製化邏輯)目前流程點為代理, 檢核是否有'代'字章...");
			shouldCheck = 2;
		}
	}
	if(!shouldCheck)	// 不需檢核則允許傳送
		return true;
	let res = false,
		n = theAOL.getCurrFolio().getDraftCounts();
	if(n > 0) {
		for(let i=0; i<n; i++) {
			let c = theAOL.getCurrFolio().getDraftPageCounts(i),
				d = theAOL.getCurrFolio().getEDraft(i);
			for(let j=0; j<c; j++) {
				let p = theAOL.getCurrFolio().getDraftPage(i, j);
				for(let k=0; k<p.newSignObjs.length; k++) {
					// 1141027 Raymond 北榮序321 修正檢核"代"字章功能要包含一般文字意見只寫"代"一個字的情況
					//if(p.newSignObjs[k].type == "stamp.text" && p.newSignObjs[k].content == "代") {
					//	theLogger.log("'" + ((!!d.fromType)?"來文":d.name) + "'上有本流程點新增的'代'字文字意見(ID:" + p.newSignObjs[k].id + "), 允許傳送");
					if((p.newSignObjs[k].type == "stamp.text" || p.newSignObjs[k].type == "text") && p.newSignObjs[k].content == "代") {
						theLogger.log("'" + ((!!d.fromType)?"來文":d.name) + "'上有本流程點新增的'代'字" + ((p.newSignObjs[k].type == "stamp.text")?"章":"文字意見") + "(ID:" + p.newSignObjs[k].id + "), 允許傳送");
						res = true;
					}
				}
			}
		}
	}
	if(!res) {
		theLogger.log("找不到任何'代'字文字意見, 提示警告訊息後中止傳送");
		if(shouldCheck == 1)
			alert("本份公文如無須陳核至一級主管，請加蓋代字。");
		else if(shouldCheck == 2)
			alert("請代理人加蓋代字章後，再行傳送。");
	}
	return res;
}

// 2014.1.8 - Raymond, 事件由pagecreate改成pageinit
//$(document).on("pageinit", "#aol", function(event) {
$(document).on("pagecreate", "#aol", function(event, ui) {
	
	theLogger.log("-II- #aol.onpagecreate() BEGIN...");
	theLogger.log(ui);	// 2016.8.16 aol_readonly_mode、aol_disable_save、aol_disable_odc010改為參數
	
	// 1110831 Raymond 1110762 修正文稿編輯新增稿件編輯並儲存後, 不是按「關閉」, 而是按瀏覽器的上一頁或F5, 再重新登入公文系統後, 開啟之前編輯的公文, 原本已儲存的新文稿內容會是未編輯過的樣版本來內容的問題
	sessionStorage.clear();	// 比照關閉公文要先清空sessionStorage
	
	// 2016.10.24 - Eric Peng, add #moBtnFlowSet
	// 2012.12.3 - Eric Peng, reload 流程設定網頁!
	//1130514	Leslie[中榮序106]	公文製作頁面功能選單，位置調整需求，加上新的簽辦意見按鈕(btnFlowSet2)
	$('#btnFlowSet, #moBtnFlowSet, #btnFlowSet2').on('click', function() {
		$("body").pagecontainer("change", 'RD-DlgProcessSetting.html', {transition:'slidedown', changeHash: false, history:false});  // 2016.5
	});
	
	// 2013.1 - Eric Peng, 按傳送下方的傳送對象button,顯示傳送內容
	$('#transTargetSetup, #moTransTargetSetup').on('click', function(event){
		theSSO.Util.getApproveOptionsDlgDisplaySettings(theAOL, theSSO.User.EnvSettings)
		.done(function(UISetting) {
			$('#home #popupSetting').popup('close'); // 2016.8.24 - Eric, 顯示子視窗前先關閉popup-menu
			SSOUtil.showTransTargetSetupDialog(event, UISetting);
		});
    });
		
	// 2013.9 - Eric Peng, 核決/剔退作業
	window._docAppRejChanging = false;
	var that = this;
	$('#aol #chkApprove, #aol #moChkApprove').on('change', function(event, ui) {
		if (window._docAppRejChanging) {
			window._docAppRejChanging = false;
			return;
		}
		
		var approved = $(event.currentTarget).is(':checked');
		var sId = $(event.currentTarget).attr('id');
		var sSyncApproveId='';
		if (sId=='chkApprove') {
			sSyncApproveId = 'moChkApprove';
		}
		else if (sId=='moChkApprove') {
			sSyncApproveId = 'chkApprove';
		}
		
		if (approved) {
			//1110629	Leslie[1110629]	考試院UI/UX需求，修改傳送選單
			if($('#btnSendBack').is(':visible'))
				$('#btnSendBack span').text('辦畢退回');
			// 未核決 => 核決, 執行核決作業...
			theSSO.Util.isSignDocApprove(theAOL)
			.done(function(rslt){
				if (rslt.success===false) {
					alert('-I- 取得公文簽辦狀態失敗, 錯誤訊息:' + rslt.errMsg);
					window._docAppRejChanging = false;
					return;
				}
				
				if (rslt.isSignDocDraft) {
					// -> 先簽後稿之簽呈流程公文 =>取OD_AOL_TX_FOR_SIGNDOC_APPROVE設定之異動別
					var txName = theSSO.User.EnvSettings.get('OD_AOL_TX_FOR_SIGNDOC_APPROVE');
					var defaultTarget = null;
					if ((typeof txName!=='undefined') && txName.length) {
						defaultTarget = {
							TxName : txName,
							OUId : '', RoleId : '', UserId : '',
							OUName : '', RoleName : '', UserName : ''
						};
					}
					
					var $rejectA = $('#aol #chkReject');
					var $rejectB = $('#aol #moChkReject');
					if (approved) {
						window._docAppRejChanging = true;
						$rejectA.prop('checked', false).checkboxradio('refresh'); // un-check reject checkbox
						$rejectB.prop('checked', false).checkboxradio('refresh'); // un-check reject checkbox
					}
				
					SSOUtil.updateApproveReject(false, false, theAOL.docObj);
					// 2021.7.9 - 1100433 Eric, merge: 2017.9.7 - 1060389, 成大紙本公文可核決
					if (theAOL.docObj.signType=='E') {
						SSOUtil.updateTransTarget(false, false, theAOL.docObj, defaultTarget);
					}
					else {
						SSOUtil.updateTransTarget_PDoc(false, false, theAOL.docObj, defaultTarget);
					}
					window._docAppRejChanging = false;
					return;
				}
				
				// 2021.3.16 - 1090836 Eric, 客委會核決時檢查是否符合核判區分設定.
				let draftAppRole = theAOL.docObj.get('ODWDCM', 'DRAFT_APP_ROLE');
				let _orgNickName = theUserInfo.OrgNickName;
				if (_orgNickName==='HAC' && draftAppRole.length) {
					let ownRoleId = theAOL.docObj.ownRoleId;
					if (draftAppRole!==ownRoleId) {
						let appRoleName = draftAppRole;
						let orgNode =  SSOUtil.getOrgNode(theAOL.docObj.sourceOrgNo);
						if (!!orgNode) {
							appRoleName = SSOUtil.getRoleNameForDraftAppRole(orgNode, draftAppRole, theAOL.docObj.ICOUId);
							if (appRoleName.length===0) {
								appRoleName = draftAppRole;
							}
						}
						alert('目前公文核判區分設定為['+ appRoleName + ']，請調整核判區分後再進行核決!');
						SSOUtil.updateApproveReject(false, false, theAOL.docObj);
						//SSOUtil.updateTransTarget(false, false, theAOL.docObj, defaultTarget);
						window._docAppRejChanging = false;
						return;
					}
				}

				// 2014.4 - 核決設定子視窗選項
				theSSO.Util.getApproveOptionsDlgDisplaySettings(theAOL, theSSO.User.EnvSettings)
				.done(function(setting) {
					var sCloseType = theAOL.docObj.get('ODWMSG', 'CLOSE_TYPE');
					if (setting.askCloseType)
					{
						if (!!window._debug) {
								alert('ask user to get CloseType...');
								var sendMail = '顯示寄送電子郵件:' + setting.enableSendMail ? 'Y' : 'N';
								if (setting.enableSendMail) {
									sendMail += ', 提示字串:' + setting.sendMailMsg;
								}
								theLogger.log('核決子視窗相關設定 -> 顯示子視窗:' + setting.askCloseType ? 'Y' : 'N' +
											'允許單位發文:' + setting.enableUnitIssue ? 'Y' : 'N' + '\t\n' + sendMail);
						}

						sCloseType = theAOL.docObj.get('ODWMSG', 'CLOSE_TYPE');
						SSOUtil.showApproveConfirmDialog(sCloseType, setting, that);
					}
					else {
						var $rejectA = $('#aol #chkReject');
						var $rejectB = $('#aol #moChkReject');
						if (approved) {
							window._docAppRejChanging = true;
							// un-check reject checkbox
							$rejectA.prop('checked', false).checkboxradio('refresh');
							$rejectB.prop('checked', false).checkboxradio('refresh');
						}
						
						var txName = '';
						sCloseType = theAOL.docObj.get('ODWMSG', 'CLOSE_TYPE');
						var closeType = parseInt(sCloseType); // 2016.2.19 - bug-fix
						var defaultTarget = SSOUtil.getDefaultTargetForCloseType(closeType); // 2017.4.6 - bug-fix
						
						if ((typeof theAOL != 'undefined') && (typeof theAOL.docObj != 'undefined')) {
							SSOUtil.updateApproveReject(approved, false, theAOL.docObj);
							// 2021.7 - 1100433 Eric, merge: 2017.9.7 - 1060389, 成大紙本公文可核決
							if (theAOL.docObj.signType=='E') {
								SSOUtil.updateTransTarget(approved, false, theAOL.docObj, defaultTarget); // 異動傳送選項
							}
							else if (theAOL.docObj.signType=='P') {
								SSOUtil.updateTransTarget_PDoc(approved, false, theAOL.docObj, defaultTarget);
							}
						}
						window._docAppRejChanging = false;
					}
				})
				.fail(function(rslt) {
					alert('取得公文核決選項發生錯誤:' + rslt.errMsg);
					window._docAppRejChanging = false;
				});
			})
			.fail(function(rslt) {
				alert('取得公文核決狀態發生錯誤:' + rslt.errMsg);
				window._docAppRejChanging = false;
			});
			
			if (sSyncApproveId.length) {
				$('#' + sSyncApproveId).prop('checked', false).checkboxradio('refresh');
			}
			if (sSyncApproveId.length) {
				$('#' + sSyncApproveId).prop('checked', true).checkboxradio('refresh');
			}
		}
		else {
			//1110629	Leslie[1110629]	考試院UI/UX需求，修改傳送選單
			if($('#btnSendBack').is(':visible'))
				$('#btnSendBack span').text('退承辦人');
			
			// 核決 => 未核決
			if ((typeof theAOL != 'undefined') && (typeof theAOL.docObj != 'undefined')) {
				SSOUtil.updateApproveReject(approved, false, theAOL.docObj);

				// 2021.7.9 - 1100433 Eric, merge: 2017.9.7 - 1060389, 成大紙本公文可核決
				if (theAOL.docObj.signType=='E') {
					SSOUtil.updateTransTarget(approved, false, theAOL.docObj); // 異動傳送選項
				}
				else if (theAOL.docObj.signType=='P') {
					SSOUtil.updateTransTarget_PDoc(approved, false, theAOL.docObj);
				}
			}
			
			if (sSyncApproveId.length) {
				$('#' + sSyncApproveId).prop('checked', false).checkboxradio('refresh');
			}
			window._docAppRejChanging = false;
		}
	});
	
	$('#aol #chkReject, #aol #moChkReject').on('change', function(event, ui) {
		if (window._docAppRejChanging) {
			window._docAppRejChanging = false;
			return;
		}
		
		var rejected = $(event.currentTarget).is(':checked');
		
		// 2016.10.24
		var sId = $(event.currentTarget).attr('id');
		var sSyncRejectId='';
		if (sId=='chkReject') {
			sSyncRejectId = 'moChkReject';
		}
		else if (sId=='moChkReject') {
			sSyncRejectId = 'chkReject';
		}
		
		var $approve = $('#aol #chkApprove');
		var $approveB = $('#aol #moChkApprove');
		if (rejected) {
			window._docAppRejChanging = true;
			// un-check reject checkbox
			$approve.prop('checked', false).checkboxradio('refresh');
			$approveB.prop('checked', false).checkboxradio('refresh');
		}
		
		//var approved = $approve.is(':checked');
		if ((typeof theAOL != 'undefined') && (typeof theAOL.docObj != 'undefined')) {
			SSOUtil.updateApproveReject(false, rejected, theAOL.docObj)	;
			// 異動傳送選項
			SSOUtil.updateTransTarget(false, rejected, theAOL.docObj);
		}
		
		if (sSyncRejectId.length) {
			$('#' + sSyncRejectId).prop('checked', false).checkboxradio('refresh');
		}
			
		window._docAppRejChanging = false;
	});
	
	// 2021.7.29 - Eric, 加回誤刪的#btnWWKF
	// 2021.7 - 1100433 Eric, 高雄大學紙本公文預排流程設定!
	// 2017.10.18 - 1060748新增[預排流程]button
	// 1110629	Leslie[1110629]	考試院UI/UX需求，修改傳送選單，加上新增的"預排流程"鈕(高大的不是這名字)
	// 1130514	Leslie[中榮序106]	公文製作頁面功能選單，位置調整需求，加上新的預排流程按鈕(btnWWKFSet2)
	$('#btnWWKF, #aol #pcUtil #btnWWKF_PDoc, #aol #moSubmitPanel #moBtnWWKF, #btnWWKFSetting, #btnWWKFSet2').on('click', function(event, ui) {
		$('#home #popupSetting').popup('close'); // 顯示子視窗前先關閉popup-menu
		// 1130514	Leslie[中榮序106]	公文製作頁面功能選單，位置調整需求，加上新的預排流程按鈕(btnWWKFSet2)
		$("#popupAdvance").popup('close');
		SSOUtil.showWorkFlowSetupDialog(event, null);
	});

	// 2021.4.21 - 1080761 Eric, merge MOI-1070298 參考公文功能.
	$('#btnRefDocSet, #aol #moGrpUtil #moBtnRefDocSet').on('click', function(event, ui) {
		$('#home #popupSetting').popup('close'); // 顯示子視窗前先關閉popup-menu
		// 2021.4.21 - 1080761 Eric, 若啟用才執行! (SystemSets.USE_REF_DOC=='Y')
		//1080822	Leslie[1080640]	新增更新參考公文頁籤
		//window.nsEditor.onRefDocMgmt(event, null, null); // @RD-RefDocMgmt.js
		let sVal = theSSO.User.SystemSets.USE_REF_DOC;
		if (typeof sVal=='string' && sVal.length && SSOUtil.isValueTrue(sVal) && typeof window.nsEditor.onRefDocMgmt=='function') {
			window.nsEditor.onRefDocMgmt(event, function(){
				var fv = $home.find("#leftPart .viewPort").data("view");
				fv.updateRefDocTag();
			},null); // @RD-RefDocMgmt.js
		}
	});

	//1110629	Leslie[1110629]	考試院UI/UX需求，修改傳送選單
	$('#swTranMode').on('change', function(event,ui){
		if($('#swTranMode').val() == 'on'){
			//1131008	Leslie[1130987]	取得使用者環境變數設定，是否啟用放大版的簽核功能鍵UI
			// $('#pcTxList').hide();
			$('#pcTxList').hide().addClass('hide')
			$('#pcTxEasy').show();
		}else{
			//1131008	Leslie[1130987]	取得使用者環境變數設定，是否啟用放大版的簽核功能鍵UI
			// $('#pcTxList').show();
			$('#pcTxList').show().removeClass('hide');
			$('#pcTxEasy').hide();
		}
	})
	
	$('#btnSendBack').on('click',function(event,ui){
		//退回承辦人
		$('#chooseA option[data-next="D"]:first').prop('selected',true)
		//1110916	Leslie	修改觸發流程，於確定完成onChange後，才觸發傳送
		// $('#chooseA').trigger('change');
		$('#chooseA').trigger('change',function(){
			$('#btnSubmit').trigger('click');			
		});
	})	
	//1110629	Leslie[1110629]	考試院UI/UX需求，修改傳送選單	==END==

	// 2015.8 - 1040692, 隱藏[剔退]按鈕
	/*var envSets = theSSO.User.EnvSettings;
	var showRejectUI = envSets.get('MP_ENABLE_REJECTUSER');
	if ((typeof showRejectUI !== 'undefined') && (showRejectUI=='Y' || showRejectUI=='y')) {
		$('div#transPanel input#chkReject').closest('div.ui-checkbox').css('visibility', 'visible');
	}
	else {
		$('div#transPanel input#chkReject').closest('div.ui-checkbox').css('visibility', 'hidden');
	}

	// 2014.11.25 - Raymond, 整合Banner: 角色選單
	var roleIndex = $('#roleid_input').data('roleIndex');
	var roleText = $('#roleid_input').val();
	$('#roleid_input_in_aol').val(roleText)
		.data('roleIndex', roleIndex)
		.focus(function(event) {	// 2015.5.14 - iOS 8.1 bug會使readonly input有focus, 導致再點時不會觸發click
			$(this).blur();
			event.preventDefault();
		});
	_initRoleListSpinWheel('roleid_input_in_aol', true, 'bottom', function(roleIndex, roleText) {
		// 同步MP頁面中的角色選單
		theLogger.log("在AOL中切換了角色 - roleIndex:" + roleIndex + ", roleText:" + roleText);
		$('#roleid_input').val(roleText);
		$('#roleid_input').data('roleIndex', roleIndex);
		$('#roleid_input').mobiscroll('setValue', [roleIndex]);
	});
	
	// 2014.11.25 - Raymond, 整合Banner: 登出
	$("#btn_logout_in_aol").click(function(event) {
		setTimeout(function() {
			// 2015.6.5 登出前先關閉公文
			if(theAOL.getCurrFolio())
				theAOL.getCurrFolio().close().done(function() {	// 2015.8.21 新增用延遲等待詢問是否儲存訊息
					// 2016.6
					$('#docWorkPane').hide()
					//$.mobile.changePage($('#home'), {transition: "slide", reverse: true, changeHash: false});
					$("#btn_logout").click();
				});
			else {
				// 2016.6
					$('#docWorkPane').hide()
				//$.mobile.changePage($('#home'), {transition: "slide", reverse: true, changeHash: false}); 
				$("#btn_logout").click();
			}
		}, 200);
	});*/
	
	/* 1111117 Raymond 1111069 取消呼叫saveTemp(), 且目前已無#btn_close_temp按鈕, 以避免不明步驟造成載入不同筆公文的文稿取代目前公文的文稿的問題
	// 2014.11.25 - Raymond, 整合Banner: 暫時右推視窗
	$("#btn_close_temp").on('click', function(event) {
		setTimeout(function() {
			// TODO: 應保留當前開啟中公文, 但因為資源未釋放, 可能會造成記憶體不足, 先暫時關閉當前公文
			if(theAOL.getCurrFolio())
				theAOL.getCurrFolio().saveTemp();	// 2015.8.21 暫時右推維持會自動暫存的機制, function改叫saveTemp,
													// 原來的close則改成不暫存, 但會檢查異動, 並提問是否儲存
			$.mobile.changePage($('#home'), {transition: "slide", reverse: true, changeHash: false});
			//$('body').pagecontainer('change', '#home', {transition: "slide", reverse: true, changeHash: false}); // 2016.5
		}, 200);
	});*/
	
	// 2014.11.25 - Raymond, 整合Banner: 今天日期
    $('#date_info_in_aol').text($(".date_info").text());
	$("#latest_notify_subject_in_aol").text($("#latest_notify_subject").text());


	theLogger.log("location.search:" + location.search);
	if(location.search) {
		var str = unescape(location.search.substring(1));
		var a = str.split("&");
		for(var i=0; i<a.length; i++) {
			var k = a[i].substring(0, a[i].indexOf('='));
			var v = a[i].substring(a[i].indexOf('=')+1);
			theLogger.log("k:" + k + ", v:" + v);
		}
	}
	var $home = $(this);
	
	// 1070124 Raymond 1061273 新增檢查環境變數, 設為Y才啟用簽辦意見窗格功能
	if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_PANEL") == "Y") {
	// 1111025 Raymond 1110864 合併1101468, 判斷若是行動裝置, 則顯示齒輪選單中的「簽辦意見窗格」選項按鈕
	if(window.iOS_device == true)
		$("#moBtnSignCmtPanel").closest("li").show();
	// 1140515 Raymond 1140474 修改記憶簽辦意見窗格是否顯示的變數從localStorage(show_sign_comment_panel)改為UserEnvSetting(USER_SHOW_SIGN_COMMENT_PANEL)
	// 1111027 Raymond 1110864 合併1101468, 修改當啟用「顯示我的最終意見」功能時預設為顯示簽辦意見窗格
	// 1070320 Raymond 1070363 恢復前一次最後勾選顯示簽辦意見窗格的記憶
	//if(localStorage["show_sign_comment_panel"] == "true") {
	//if(localStorage["show_sign_comment_panel"] == "true" || (theSSO.User.EnvSettings.get("AOL_SHOW_MY_FINAL_COMMENT") == "Y" && localStorage["show_sign_comment_panel"] != "false")) {
	var showSignCommentPanel = theWebServices.QueryDoc.GetUserEnvSetting(theSSO.Artifact,"USER_SHOW_SIGN_COMMENT_PANEL").RtnStr;
	if(!showSignCommentPanel && !!localStorage["show_sign_comment_panel"]) {	// 版更後第一次開公文, UserEnvSetting未設, 但localStorage有設的情況
		showSignCommentPanel = localStorage["show_sign_comment_panel"];
		theLogger.log("UserEnvSetting的'USER_SHOW_SIGN_COMMENT_PANEL'未設, 但localStorage的'show_sign_comment_panel'有設(" + localStorage["show_sign_comment_panel"] + "), 回寫到UserEnvSetting");
		if(showSignCommentPanel.match(/true|false/))
			theWebServices.QueryDoc.UpdateUserEnvSet(theSSO.Artifact,"USER_SHOW_SIGN_COMMENT_PANEL", showSignCommentPanel, false);
		else
			theLogger.error("localStorage的'show_sign_comment_panel'設定值非'true'或'false'不合法");
	}
	if(showSignCommentPanel == "true" || (theSSO.User.EnvSettings.get("AOL_SHOW_MY_FINAL_COMMENT") == "Y" && showSignCommentPanel != "false")) {
		$home.find("#leftPart #isoContainer").addClass("showSidePanel");
		// 1111025 Raymond 1110864 合併1101468, 新增位於齒輪按鈕的行動版選單按鈕
		//$("#btnSignCmtPanel").addClass("ui-checkbox-on");
		$("#btnSignCmtPanel, #moBtnSignCmtPanel").addClass("ui-checkbox-on");
	}
	else
		// 1111025 Raymond 1110864 合併1101468, 新增位於齒輪按鈕的行動版選單按鈕
		//$("#btnSignCmtPanel").addClass("ui-checkbox-off");
		$("#btnSignCmtPanel, #moBtnSignCmtPanel").addClass("ui-checkbox-off");
	// 1111025 Raymond 1110864 合併1101468, 新增位於齒輪按鈕的行動版選單按鈕
	// 1061109 Raymond 1060452 新增簽辦意見窗格button
	//$("#btnSignCmtPanel").addClass("ui-btn-icon-left").on('click', function(event) {
	$("#btnSignCmtPanel, #moBtnSignCmtPanel").addClass("ui-btn-icon-left").on('click', function(event) {
		$('#home #popupSetting').popup('close'); // 顯示子視窗前先關閉popup-menu
		
		if($home.find("#leftPart #sidePanel").is(":visible")) {	// 切換顯示或隱藏簽辦意見窗格
			$home.find("#leftPart #isoContainer").removeClass("showSidePanel");
			// 1111025 Raymond 1110864 合併1101468, 新增位於齒輪按鈕的行動版選單按鈕
			//$("#btnSignCmtPanel").addClass("ui-checkbox-off").removeClass("ui-checkbox-on");
			$("#btnSignCmtPanel, #moBtnSignCmtPanel").addClass("ui-checkbox-off").removeClass("ui-checkbox-on");
			// 1070320 Raymond 1070363 記憶取消勾選簽辦意見窗格
			localStorage["show_sign_comment_panel"] = "false";
			// 1140515 Raymond 1140474 修改記憶簽辦意見窗格是否顯示的變數從localStorage(show_sign_comment_panel)改為UserEnvSetting(USER_SHOW_SIGN_COMMENT_PANEL)
			showSignCommentPanel = "false";
			theWebServices.QueryDoc.UpdateUserEnvSet(theSSO.Artifact,"USER_SHOW_SIGN_COMMENT_PANEL", showSignCommentPanel, false);
			// 1100712 Raymond 1100648 修正關閉顯示簽辦意見窗格時, 只有清單隱藏, 側邊欄未縮回去的問題
			$home.find("#leftPart #isoContainer").css("margin-right", "");
		}
		else {
			$home.find("#leftPart #isoContainer").addClass("showSidePanel");
			// 1111025 Raymond 1110864 合併1101468, 新增位於齒輪按鈕的行動版選單按鈕
			//$("#btnSignCmtPanel").addClass("ui-checkbox-on").removeClass("ui-checkbox-off");
			$("#btnSignCmtPanel, #moBtnSignCmtPanel").addClass("ui-checkbox-on").removeClass("ui-checkbox-off");
			// 1070320 Raymond 1070363 記憶勾選簽辦意見窗格
			localStorage["show_sign_comment_panel"] = "true";
			// 1140515 Raymond 1140474 修改記憶簽辦意見窗格是否顯示的變數從localStorage(show_sign_comment_panel)改為UserEnvSetting(USER_SHOW_SIGN_COMMENT_PANEL)
			showSignCommentPanel = "true";
			theWebServices.QueryDoc.UpdateUserEnvSet(theSSO.Artifact,"USER_SHOW_SIGN_COMMENT_PANEL", showSignCommentPanel, false);
			$home.find("#leftPart #isoContainer").one("transitionend", function() {	// 動畫結束後再依據目前解析度下margin-right空出多少空間, 調整sidePanel的寬度
				var mr = $(this).css("margin-right");
				theLogger.log("#isoContainer.marginRight = " + mr);
				if(!!mr) {
					$home.find("#leftPart #sidePanel").width(mr);
					if(parseFloat(mr) < 200) {	// 1111025 Raymond 1110864 合併1101468, 修正行動裝置上關閉後開啟簽辦意見窗格時, 右側margin空間不足200px, 設定顯示簽辦意見窗格的最小寬度200px
						var cntrW = "200px";
						$home.find("#leftPart #sidePanel").width(cntrW);
						$home.find("#leftPart #isoContainer").css("margin-right", cntrW);
					}
				}
			});
			// 1070320 Raymond 1070363 重設簽辦意見窗格項目從click事件移出, 供公文載入或reload後呼叫重設
			_setupComments($home.find("#leftPart #sidePanel #signCmtList"));
		}
	});
	}
	else {	// 否則拿掉"簽辦意見窗格"按鈕
		// 1111025 Raymond 1110864 合併1101468, 新增位於齒輪按鈕的行動版選單按鈕
		//$("#btnSignCmtPanel").closest("li").remove();
		$("#btnSignCmtPanel, #moBtnSignCmtPanel").closest("li").remove();
	}
	
	// 1100707 Raymond 1100648 啟用分文稿記錄簽核意見功能時, 隱藏只能顯示一個全文簽辦意見的子視窗功能
	if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
		$("#btnFlowSet").closest("li").remove();
		$("#moBtnFlowSet").remove();
	}

	// 2019.8.15 - 1080654 Eric, AOL_AUTO_OPEN_NEXT/AOL_AUTO_OPEN_NEXT_ADV_MODE設定有異動, 立即 update User's EnvSet
	function _updateOpenNextUserEnvSet(openNextDoc, openNextDocAdvMode, advModeOnly) {
		let _dfd = $.Deferred();
		advModeOnly = (typeof advModeOnly=='boolean')?advModeOnly:false;
		openNextDocAdvMode = (typeof openNextDocAdvMode=='boolean')?openNextDocAdvMode:false;
		let _newOpenNextDocAdvModeValue = openNextDocAdvMode?'Y':'N';
		if (advModeOnly) {
			theWebServices.authws.UpdateUserEnvSet(localStorage.Artifact, 'AOL_AUTO_OPEN_NEXT_ADV_MODE', _newOpenNextDocAdvModeValue, false, {asycn:true})
			.done(function() {
				_dfd.resolve({success:true});
			})
			.fail(function(errRslt){
				_dfd.reject(errRslt);
			});
		}
		else {
			openNextDoc = (typeof openNextDoc=='boolean')?openNextDoc:false;
			let _newOpenNextValue = openNextDoc?'Y':'N';
			theWebServices.authws.UpdateUserEnvSet(localStorage.Artifact, 'AOL_AUTO_OPEN_NEXT', _newOpenNextValue, false, {asycn:true})
			.then(function() {
				return theWebServices.authws.UpdateUserEnvSet(localStorage.Artifact, 'AOL_AUTO_OPEN_NEXT_ADV_MODE', _newOpenNextDocAdvModeValue, false, {asycn:true});
			})
			.then(function() {
				_dfd.resolve({success:true});
			})
			.fail(function(errRslt) {
				_dfd.reject(errRslt);
			});
		}
		return _dfd.promise();			
	}

	// 2019.8.16 - 1080654 Eric, 初始化設定自動開啟下一筆公文/下一筆公文啟用進階模式UI
	function _initAOLAutoOpenSettingUI() {
		// 1130814 Raymond 1130313 新增判斷若是離線模式, 也不要自動開啟次筆公文
		// 2021.3.15 - 1100272 Eric, 若未啟用自動開啟次筆公文功能[AOL_AUTO_OPEN_NEXT!=Y], 一律不自動開啟次筆公文.
		//let fEnableOpenNextDoc = SSOUtil.isValueTrue(theSSO.User.EnvSettings.get("AOL_ENABLE_NEXT_DOC"));
		let fEnableOpenNextDoc = SSOUtil.isValueTrue(theSSO.User.EnvSettings.get("AOL_ENABLE_NEXT_DOC")) && (!theSSO || theSSO.offlineMode != true);
		if (fEnableOpenNextDoc) {
			$("#btnAutoOpenNext").closest("li").show();
		}
		else {
			$("#btnAutoOpenNext").closest("li").hide();
			$("#btnAutoOpenNextAdvMode").closest("li").hide();
		}

		let _openNextDoc = false;
		let _openNextDocAdvMode = false;
		if (fEnableOpenNextDoc) {
			// 2019.8.16 - 1080654 Eric, [改讀EnvSet]恢復前一次最後勾選顯示啟用自動開啟下一筆公文/下一筆公文啟用進階模式的記憶
			//let _sValue = (typeof localStorage['ENV_AOL_AUTO_OPEN_NEXT_DOC']=='string')?localStorage['ENV_AOL_AUTO_OPEN_NEXT_DOC']:'';
			let _sValue = theSSO.User.EnvSettings.get('AOL_AUTO_OPEN_NEXT');
			_openNextDoc = SSOUtil.isValueTrue(_sValue);
			//_sValue = (typeof localStorage['ENV_AOL_OPEN_NEXT_DOC_USE_ADVMODE']=='string')?localStorage['ENV_AOL_OPEN_NEXT_DOC_USE_ADVMODE']:'';
			_sValue = theSSO.User.EnvSettings.get('AOL_AUTO_OPEN_NEXT_ADV_MODE');
			_openNextDocAdvMode = SSOUtil.isValueTrue(_sValue);
		}

		if (_openNextDoc) {
			$("#btnAutoOpenNext").addClass("ui-checkbox-on");
			$("#btnAutoOpenNextAdvMode").closest("li").show();
			theSSO.openNextDoc = true;
			if (_openNextDocAdvMode) {
				$("#btnAutoOpenNextAdvMode").addClass("ui-checkbox-on");
				theSSO.openNextDocAdvMode = true;
			}
			else {
				$("#btnAutoOpenNextAdvMode").addClass("ui-checkbox-off");	
				theSSO.openNextDocAdvMode = false;
			}
		}
		else {
			$("#btnAutoOpenNext").addClass("ui-checkbox-off");
			$("#btnAutoOpenNextAdvMode").addClass("ui-checkbox-off");
			$("#btnAutoOpenNextAdvMode").closest("li").hide();
			theSSO.openNextDoc = false;
			theSSO.openNextDocAdvMode = false;
		}
	}
	SSOUtil.initAOLAutoOpenSettingUI = _initAOLAutoOpenSettingUI;

	// 2019.7.29 Eric 1080654 新增自動開啟次筆公文相關設定UI
	// 檢查環境變數: AOL_ENABLE_NEXT_DOC, 設為Y才啟用相關功能
	if (SSOUtil.isValueTrue(theSSO.User.EnvSettings.get("AOL_ENABLE_NEXT_DOC"))) {
		SSOUtil.initAOLAutoOpenSettingUI();

		// 2019.7.29 1080654 Eric, 新增自動開啟次筆公文設定buttons
		// [設定]/[啟用自動開啟下一筆公文] 按鍵UI及功能
		$("#btnAutoOpenNext").addClass("ui-btn-icon-left").on('click', function(event) {
			//$('#home #popupSetting').popup('close'); // 關閉popup-menu

			// 2019.7.29 - 1080654 Eric, 確認目前之設定值
			let _openNextDoc = (typeof theSSO.openNextDoc=='boolean')?theSSO.openNextDoc:false;
			//let _openNextDocAdvMode = (typeof theSSO.openNextDocAdvMode=='boolean')?theSSO.openNextDocAdvMode:false;
			if (_openNextDoc) {	// [自動開啟次筆]啟用=>停用切換
				$("#btnAutoOpenNext").addClass("ui-checkbox-off").removeClass("ui-checkbox-on");
				$("#btnAutoOpenNextAdvMode").addClass("ui-checkbox-off").removeClass("ui-checkbox-on");
				$("#btnAutoOpenNextAdvMode").closest("li").hide();

				// 2019.7.29 - 1080654 Eric, 記憶取消勾選並叫用AuthWS.UpdateUserEnvSet更新設定值!
				theSSO.openNextDoc = false;
				theSSO.openNextDocAdvMode = false;
				//localStorage['ENV_AOL_AUTO_OPEN_NEXT_DOC'] = 'N';
				//localStorage['ENV_AOL_OPEN_NEXT_DOC_USE_ADVMODE'] = 'N';

				// AOL_AUTO_OPEN_NEXT / AOL_OPEN_NEXT_USE_ADV_MODE
				// 2019.8.15 - 1080654 Eric, 設定有異動, 立即 update User's EnvSet
				_updateOpenNextUserEnvSet(theSSO.openNextDoc, theSSO.openNextDocAdvMode, false)
				.then(function(){
				 	$("#btnAutoOpenNextAdvMode").closest("li").hide();
				 	$('#home #popupSetting').popup('close'); // 關閉popup-menu
				})
				.fail(function() {
				 	$("#btnAutoOpenNextAdvMode").closest("li").hide();
				 	$('#home #popupSetting').popup('close'); // 關閉popup-menu
				});
			}
			else {
				// [自動開啟次筆]停用=>啟用切換
				$("#btnAutoOpenNext").addClass("ui-checkbox-on").removeClass("ui-checkbox-off");
				$("#btnAutoOpenNextAdvMode").addClass("ui-checkbox-off").removeClass("ui-checkbox-on");
				$("#btnAutoOpenNextAdvMode").closest("li").show();
				theSSO.openNextDoc = true;

				// 2019.8.15 - 1080654 Eric, 設定有異動, 立即 update User's EnvSet
				_updateOpenNextUserEnvSet(theSSO.openNextDoc, theSSO.openNextDocAdvMode, false)
				.then(function(){
				 	$('#home #popupSetting').popup('close'); // 關閉popup-menu
				})
				.fail(function() {
				 	$('#home #popupSetting').popup('close'); // 關閉popup-menu
				});
			}
		});

		// [設定]/[下一筆公文啟用進階模式] 按鍵UI及功能
		$("#btnAutoOpenNextAdvMode").addClass("ui-btn-icon-left").on('click', function(event) {
			$('#home #popupSetting').popup('close'); // 關閉popup-menu

			// 2019.7.29 - 1080654 Eric, 確認目前之設定值
			let _openNextDoc = (typeof theSSO.openNextDoc=='boolean')?theSSO.openNextDoc:false;
			let _openNextDocAdvMode = (typeof theSSO.openNextDocAdvMode=='boolean')?theSSO.openNextDocAdvMode:false;
			if (_openNextDoc) {
				if (_openNextDocAdvMode) {
					$("#btnAutoOpenNextAdvMode").addClass("ui-checkbox-off").removeClass("ui-checkbox-on");
					theSSO.openNextDocAdvMode = false;
					//localStorage['ENV_AOL_OPEN_NEXT_DOC_USE_ADVMODE'] = 'N';
				}
				else {
					$("#btnAutoOpenNextAdvMode").addClass("ui-checkbox-on").removeClass("ui-checkbox-off");
					theSSO.openNextDocAdvMode = true;
					//localStorage['ENV_AOL_OPEN_NEXT_DOC_USE_ADVMODE'] = 'Y';
				}

				// 有異動, 立即 update User's EnvSet
				if (_openNextDocAdvMode !== theSSO.openNextDocAdvMode) {
					// 有異動, 立即 update User's EnvSet
					_updateOpenNextUserEnvSet(theSSO.openNextDoc, theSSO.openNextDocAdvMode, true)
					.then(function(){
						$('#home #popupSetting').popup('close'); // 關閉popup-menu
					})
					.fail(function() {
						$('#home #popupSetting').popup('close'); // 關閉popup-menu
					});
				}
			}
			else {
				$("#btnAutoOpenNextAdvMode").addClass("ui-checkbox-off").removeClass("ui-checkbox-on");
				$("#btnAutoOpenNextAdvMode").closest("li").hide();
				theSSO.openNextDocAdvMode = false;
				
				//localStorage['ENV_AOL_OPEN_NEXT_DOC_USE_ADVMODE'] = 'N';
				// 有異動, 立即 update User's EnvSet
				_updateOpenNextUserEnvSet(theSSO.openNextDoc, theSSO.openNextDocAdvMode, true)
				.then(function(){
				 	$('#home #popupSetting').popup('close'); // 關閉popup-menu
				})
				.fail(function() {
				 	$('#home #popupSetting').popup('close'); // 關閉popup-menu
				});
			}
		});
	}
	else {	
		// 2021.3.23 - 1100272 Eric, 改為隱藏選項, 其它帳號登入可打開!
		// 若EnvSetting[AOL_ENABLE_NEXT_DOC]不為啟用, 拿掉"啟用自動開啟下一筆公文"及"下一筆公文啟用進階模式"按鈕
		$("#btnAutoOpenNext").closest("li").hide(); //remove();
		$("#btnAutoOpenNextAdvMode").closest("li").hide(); // remove();
		theSSO.openNextDoc = false;
		theSSO.openNextDocAdvMode = false;
	}

    // 2023.2.20 - Eric, 1111363 使用者可自訂顯示/隱藏[文字編輯工具列]
    function _initAOLTextEditToolbarSettingUI() {
        $("#btnEnableTextEditToolbar").closest("li").show();
		if (theSSO.enableTextEditToolbar) {
			$("#btnEnableTextEditToolbar").addClass("ui-checkbox-on").removeClass("ui-checkbox-off");
		}
		else {
			$("#btnEnableTextEditToolbar").addClass("ui-checkbox-off").removeClass('ui-checkbox-on');
		}

        $("#btnEnableTextEditToolbar").addClass("ui-btn-icon-left").on('click', function(event) {
            if (theSSO.enableTextEditToolbar) {	// [文字編輯工具列]啟用=>停用切換
				$("#btnEnableTextEditToolbar").addClass("ui-checkbox-off").removeClass("ui-checkbox-on");
                theSSO.enableTextEditToolbar = false;
                localStorage['aolEnableTextEditToolbar'] = 'false'
            }
            else {
                $("#btnEnableTextEditToolbar").addClass("ui-checkbox-on").removeClass("ui-checkbox-off");
                theSSO.enableTextEditToolbar = true;
                localStorage['aolEnableTextEditToolbar'] = 'true'
            }
        });
    }

    if (localStorage.getItem('aolEnableTextEditToolbar') !== null) { // 先確認localStorage是否有設定值
        theSSO.enableTextEditToolbar = SSOUtil.isValueTrue(localStorage['aolEnableTextEditToolbar'])
    }
    else {
        // 若localStorage不存在[aolEnableTextEditToolbar]項月
        //let defaultDisabled = false;
        //if (window.location.href.indexOf('docvip.fdat.com.tw')!==-1) {
        //    defaultDisabled = true;
        //}
        //if (SSO_CONFIG.OrgNickName=='EXAM' || defaultDisabled) {
        if (SSO_CONFIG.OrgNickName=='EXAM') {
            theSSO.enableTextEditToolbar = false;
        }
        else {
            theSSO.enableTextEditToolbar = true;
        }
    }
    _initAOLTextEditToolbarSettingUI();
	
	// 1070320 Raymond 1070363 重設簽辦意見窗格項目從#btnSignCmtPanel的click移出, 供公文載入或reload後呼叫重設
	// _setupComment複製自RD-DlgProcessSetting.js
	function _setupComments($comments) {
		function _getMsgIdFromAolFlowId(flowId) {
			var sPrefix = 'FLOW_';
			var msgId = '';
			if (flowId.indexOf(sPrefix)===0) {
				// 1100512 Raymond 1090821 外呈會公文的本機關流程點Id中間會多機關代碼, 要取最末個"_"後的才是真msgId
				//msgId = flowId.substr(sPrefix.length);
				msgId = flowId.substr(flowId.lastIndexOf('_') + 1);
				return msgId;
			}
		
			// 非預期格式, 回傳AOL	
			return '';
		}
		
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
	
		function getTimeString(time) {
			// 1100715 Raymond 1100854 新增[高大客製化]簽核意見時間顯示年月日時分秒
			if(theUserInfo.OrgNickName == "NUK") {
				if (typeof time === 'string') {
					var timeStr = time.substring(0, 3) + '/' + time.substring(3, 5) + '/' + time.substring(5, 7) + " " +
								  time.substring(7, 9) + ':' + time.substring(9, 11) + ':' + ((time.length == 13)?time.substring(11, 13):'00');
					return timeStr;
				}
			}
			else
			// YYYmmddHHMM -> mmdd<br>hhmm
			if (typeof time === 'string') {
				var timeStr = time.substring(3, 5) + '/' + time.substring(5, 7) + " " +
							  time.substring(7, 9) + ':' + time.substring(9, 11);
				return timeStr;
			}
			return '';
		}
	
		//var maxDraftMsgId = '1999'; // 草稿流程點的最大MsgId
		// 1120221 Raymond 1111225 修正支援內部意見
		//if ($comments.find('li').length) {
		//	$comments.find('li').remove();
		//}
		$comments.parent().find("li").remove();
		
		var nMaxDraftMsgId = 1999;
		// 1120224 Raymond 1111225 修正開啟子文或分會公文時, 簽辦意見窗格仍顯示可輸入意見的目前流程點及內剖意見區域的問題
		//var docObj = theAOL.docObj;
		var docObj = theAOL.getCurrFolio().getDocObj();
		if (typeof docObj==='undefined' || docObj===null) {
			theLogger.error('-E- _setupComments() failed. theAOL.docObj invalid.');
			alert("尚未開啟公文(無公文基資)");
			return;
		}
		
		// 1070331 Raymond 紙本不載入封裝檔, 不會有aolFlow
		if(docObj.signType == "P") {
			theLogger.warn("紙本簽核不載入封裝檔, 無簽署意見可顯示");
			// 1080130 Raymond 1080014 新增若前一次因開啟的線上簽核公文有簽署意見而自動顯示簽辦意見窗格的話, 開啟紙本公文要隱藏簽辦意見窗格
			$comments.closest("#isoContainer").removeClass("showSidePanel");
			// 1100712 Raymond 1100648 修正, 側邊欄未縮回去的問題
			$comments.closest("#isoContainer").css("margin-right", "");
			return;
		}
		
		var isDraft = theSSO.MP.todolist.builder.isDraftMsg(docObj);
		var aolFlows = theAOL.signFolder.getAolFlow();
		//1120313	1120203		Kevin	Cloud	弱掃修正Client DOM Stored XSS
		//var docToDoList = SSOUtil.getDocToDoList(docObj.docNo, localStorage.Artifact);
		var docToDoList = SSOUtil.getDocToDoList(docObj.docNo, htmlencode(localStorage.Artifact));
		
		// 1140408 Raymond 1140401 修正開啟分會會畢頁籤公文時, docObj沒有sourceOrgNo的問題
		//var orgNode = SSOUtil.getOrgNode(docObj.sourceOrgNo);
		var orgNode = SSOUtil.getOrgNode(docObj.sourceOrgNo || theSSO.User?.orgid);
		
		// 1070411 Raymond 1070463 比照傳送封裝功能, 遇代理公文時用ownOU及ownRole當單位、角色, 目前代理人的name當姓名來顯示
		// 2015.5 - docObj.ownUserId may be ''.
		/*var userId = docObj.ownUserId;
		// 1070331 Raymond 公文檢索或DocView開啟時的docObj, 連ownUserId都沒有
		//if (userId.length===0) {
		if (!userId || userId.length===0) {
			userId = theSSO.User.account;
		}
		
		var thisUserInfo = null;
		if (userId.length) {
			thisUserInfo = SSOUtil.getOrgUserInfo(orgNode, docObj.ownOUId, docObj.ownRoleId, userId, '');
		}*/
		// 1070416 Raymond 修正調閱時docObj沒有完整使用者的ownOUId、ownRoleId等資訊, 會跳Exception問題
		var thisUserInfo = {
			OUName: "",
			RoleName: "",
			UserName: theSSO.User.name
		};
		
		//var portraitUrl = SSOUtil.getRoleIconPathname(docObj.sourceOrgNo, docObj.ownOUId, docObj.ownRoleId);
		
		// 加入目前流程的項目 (2015.10 - 非唯讀文件夾才會加入)
		// 1070331 Raymond 修正在AKS116開啟DocView時, 取得UI狀態時沒有傳入uiParam導致aol_readonly_mode及aol_disable_save模式判斷錯誤造成Exception問題
		//var uiState = window._getUIStatus();
		var uiState = window._getUIStatus(docObj, docObj.uiParam);
		var commentItemStr = '', $commentItem;
		// 1100707 Raymond 1100648 新增啟用分文稿記錄簽核意見功能時, 要檢查目前顯示文稿是否不是來文
		function hasDraftBasedSignComment() {
			var currDraftInfo = theAOL.getCurrFolio().getCurrDraftInfo();
			return !!currDraftInfo &&	// currDraftInfo是null時表示目前顯示公文基資
				currDraftInfo.name != "來文簽辦" &&	// 來文簽辦是假文稿, 代表來文
				!currDraftInfo.fromType;	// 有fromType代表來文內容
		}
		
		var hasAnyComment = false;	// 1120221 Raymond 1111225 移至populateComments前宣告
		// 1120222 Raymond 1111225 判斷OUId是否為相同一級單位的代碼
		function sameLv1OU(ouA, ouB) {
			if(typeof ouA === "string" && typeof ouB === "string") {
				if(!!sso_const && !!sso_const.FIRSTCLASS_UNITNO_LEN)
					return ouA.substr(0, sso_const.FIRSTCLASS_UNITNO_LEN) == ouB.substr(0, sso_const.FIRSTCLASS_UNITNO_LEN);
				else
					return ouA.substr(0, 2) == ouB.substr(0, 2);
			}
			return false;
		}
		// 1120221 Raymond 1111225 獨立成function, 以同時用於組織簽辦意見及內部意見清單
		function populateComments(forInnerCmt, $innerCmt) {
		
		// 1100707 Raymond 1100648 新增啟用分文稿記錄簽核意見功能時, 要檢查目前顯示文稿是否不是來文
		//if ((typeof docObj !=='undefined') && !uiState.readOnly)
		if ((typeof docObj !=='undefined') && !uiState.readOnly && (theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") != "Y" || hasDraftBasedSignComment()))
		{
			// 1070416 Raymond 修正非調閱時再檢查docObj使用者的ownOUId、ownRoleId等資訊
			if("ODWMSG" in docObj && "OWN_OU_ID" in docObj.ODWMSG) {
				thisUserInfo.OUName = SSOUtil.getOrgUnitName(orgNode, docObj.ODWMSG.OWN_OU_ID);
				// 1130517 Raymond 1120888 合併屏東1120943, 新增單位代碼
				thisUserInfo.OUId = docObj.ODWMSG.OWN_OU_ID;
				if("OWN_ROLE_ID" in docObj.ODWMSG)
					thisUserInfo.RoleName = SSOUtil.getOrgRoleName(orgNode, docObj.ODWMSG.OWN_OU_ID, docObj.ODWMSG.OWN_ROLE_ID);
				else
					theLogger.error("ODWMSG無OWN_ROLE_ID資訊, 無法取得目前使用者的角色名稱");
			}
			else
				theLogger.error("ODWMSG無OWN_OU_ID資訊, 無法取得目前使用者的單位名稱");
			// 1090430 Raymond 1090261 若是代理公文, 在名稱後要加「(代)」
			var nameEx = "";
			if("ODWMSG" in docObj) {
				var isProxy = docObj.get('ODWSMG', 'IS_PROXY_DOC');
				if (SSOUtil.isValueTrue(isProxy))
					nameEx = "(代)";
			}

			// 1150409	Leslie[1150262]	[外貿]簽辦意見窗格新增主管核決用便捷功能鍵
			var approveBtnInSignCommentSet = theSSO.User.EnvSettings.get("AOL_APPROVE_BTN_IN_SIGNCOMMENT_SETTING").split('|');
			var approveBtnStr = '';
			if(approveBtnInSignCommentSet.length && !!approveBtnInSignCommentSet[0] && approveBtnInSignCommentSet.includes(`${docObj.folder}+${docObj.subfolder};${docObj.ownRoleId}`))
				approveBtnStr = '<div style="display: inline-block;margin-top: -7px;">'+
									'<a data-role="button" id="btnInputApprove1" class="ui-btn ui-btn-inline ui-mini ui-shadow" role="button">如擬</a>'+
									'<a data-role="button" id="btnInputApprove2" class="ui-btn ui-btn-inline ui-mini ui-shadow" role="button">可</a>'+
									'<a data-role="button" id="btnInputApprove3" class="ui-btn ui-btn-inline ui-mini ui-shadow" role="button">發</a>'+
								'</div>';

			// 1130510 Raymond 1120888 新增判斷環境變數「AOL_MY_SIGNCOMMENT_READONLY」設為Y時, 簽核意見唯讀, 且不顯示「辭庫」按鈕
			var mySignCommentReadOnly = theSSO.User.EnvSettings.get("AOL_MY_SIGNCOMMENT_READONLY") == "Y";
			// 2021.10.05 - 1100991 Eric, 弱掃修正(call htmlEncode)
			commentItemStr =  '<li>' +
									'<div class="flowsite_info">' +
										// 1150409	Leslie[1150262]	[外貿]簽辦意見窗格新增主管核決用便捷功能鍵
										// '<div class="date_time">[目前流程點]</div>' +
										`<div class="date_time">[目前流程點]${approveBtnStr}</div>` +
										// 1130517 Raymond 1120888 合併屏東1120943, 新增data-ouid屬性, 記錄此流程點的ownOUId
										//'<div class="unit">' + theSSO.Util.htmlEncode(thisUserInfo.OUName) + '</div>' +
										'<div class="unit" data-ouid="' + thisUserInfo.OUId + '">' + theSSO.Util.htmlEncode(thisUserInfo.OUName) + '</div>' +
										'<div class="role" style="float: left">' + theSSO.Util.htmlEncode(thisUserInfo.RoleName) + '</div>' +
										// 1090430 Raymond 1090261 若是代理公文, 在名稱後要加「(代)」
										//'<div class="name">' + thisUserInfo.UserName + '</div>' +
										'<div class="name">' + theSSO.Util.htmlEncode(thisUserInfo.UserName) + nameEx + '</div>' +
									'</div>' +
									'<div class="comment_text editable">' +
										// 1150213 Raymond 1150145 新增判斷機關暱稱為TAITRA時, 簽辦意見輸入區高度拉高為15行
										// 1130510 Raymond 1120888 新增判斷本流程點簽核意見設定為唯讀時, 簽核意見textarea設為反灰
										//'<textarea rows="3" style="width:95%;overflow:auto;line-height:1.2;white-space:pre-wrap">' +	// 1070112 Raymond 1060452 修正樣式避免IE下字串太長不會自動折行, 1101122 Raymond 高大序35 修正IE下輸入Enter會變空白而非折行的問題
										//'<textarea rows="3" style="width:95%;overflow:auto;line-height:1.2;white-space:pre-wrap"' + ((mySignCommentReadOnly)?' disabled':'') + '>' +	// 1070112 Raymond 1060452 修正樣式避免IE下字串太長不會自動折行, 1101122 Raymond 高大序35 修正IE下輸入Enter會變空白而非折行的問題
										'<textarea rows="' + ((SSO_CONFIG.OrgNickName == "TAITRA")?15:3)+ '" style="width:95%;overflow:auto;line-height:1.2;white-space:pre-wrap"' + ((mySignCommentReadOnly)?' disabled':'') + '>' +	// 1070112 Raymond 1060452 修正樣式避免IE下字串太長不會自動折行, 1101122 Raymond 高大序35 修正IE下輸入Enter會變空白而非折行的問題
										//theSSO.Util.htmlEncode(theAOL.currSignComment()) +	// 1100708 Raymond 1100648 配合支援分文稿記錄簽核意見功能修改, signComment->currSignComment, 1101122 Raymond 高大序35 移至下方用val()設定TEXTAREA的內容, 以修正第1個字按Enter儲存後再開啟或關閉窗格後再開啟, 第1個換行字元會不見的問題
										'</textarea>' +
										//'<div class="edit_icon" style="top: 5px"></div>' +
										'<div style="text-align:right"><a data-role="button" style="display:none" id="btnChangeCmtOK">確定</a><a data-role="button" style="display:none" id="btnChangeCmtCancel">取消</a></div>' +
									'</div>' +
									//'<div class="portrait" style="background: #fff url(\'' + portraitUrl + '\');"></div>' +
									// 1130510 Raymond 1120888 新增判斷本流程點簽核意見設定為唯讀時, 不顯示「辭庫」按鈕
									// 1100706 Raymond 1100648 新增"辭庫"按鈕
									//'<div style="position:absolute; right:4px; top:4px;"><a data-role="button" id="btnInputPhrase">辭庫</a></div>' +
									((mySignCommentReadOnly)?'':'<div style="position:absolute; right:4px; top:4px;"><a data-role="button" id="btnInputPhrase">辭庫</a></div>') +
									// 1111027 Raymond 1110864 合併1101468, 當啟用「顯示我的最終意見」功能時新增"意見管理"按鈕
									((theSSO.User.EnvSettings.get("AOL_SHOW_MY_FINAL_COMMENT") == "Y")?'<div style="position:absolute; right:64px; top:4px;"><a data-role="button" id="btnCommentMgmt">意見管理</a></div>':'') +
								'</li>';
			$commentItem = $(commentItemStr);
			// 1120221 Raymond 1111225 新增判斷forInnerCmt為true時, 改用currInnerComment()
			if(forInnerCmt == true) {
				// 1150211 Raymond 外貿序67 修正在簽辦意見輸入區輸入"<>", 儲存後再開啟會變成"&lt;&gt;"的問題, 設定TEXTAREA.value不需要htmlEncode, 因為會直接以文字形式顯示, 不會解析成HTML tag, 也就不會有XSS Attack的問題
				//$commentItem.find("textarea").val(theSSO.Util.htmlEncode(theAOL.currInnerComment()));
				$commentItem.find("textarea").val(theAOL.currInnerComment());
				$commentItem.appendTo($innerCmt);
			}
			else {
			// 1150211 Raymond 外貿序67 修正在簽辦意見輸入區輸入"<>", 儲存後再開啟會變成"&lt;&gt;"的問題, 設定TEXTAREA.value不需要htmlEncode, 因為會直接以文字形式顯示, 不會解析成HTML tag, 也就不會有XSS Attack的問題
			//$commentItem.find("textarea").val(theSSO.Util.htmlEncode(theAOL.currSignComment()));	// 1101122 Raymond 高大序35 用val()設定TEXTAREA的內容, 以修正第1個字按Enter儲存後再開啟或關閉窗格後再開啟, 第1個換行字元會不見的問題
			$commentItem.find("textarea").val(theAOL.currSignComment());	// 1101122 Raymond 高大序35 用val()設定TEXTAREA的內容, 以修正第1個字按Enter儲存後再開啟或關閉窗格後再開啟, 第1個換行字元會不見的問題
			$commentItem.appendTo($comments);
			}
			// 1140922 Raymond 1140887 新增判斷機關暱稱為TPVGH(北榮)時, 禁止輸入簽辦意見
			if(SSO_CONFIG.OrgNickName == "TPVGH") {
				$commentItem.find("textarea").prop("readonly", true);
				$commentItem.find("#btnInputPhrase").hide();
			}
			else {
			// 1140321 Raymond 1131303 簽辦意見新增錯別字校正功能
			if(!!theAOL.fixWordService) {
				//AlternativeLogger.set("logLevel", 0);	// for test
				// 1140428 Raymond 1131303 theAOL.getCurrFolio未初始化完成時, bindSC會失敗, 故在setComment時重bind一次
				if(theAOL.enableFixWord4TextComment == true) {
					if(mySignCommentReadOnly) {
						theLogger.log("因簽辦意見唯讀停用錯別字校正功能");
						theAOL.unbindSC();
					}
					else {
						theLogger.log("簽辦意見啟用錯別字校正功能");
						theAOL.bindSC();
					}
				}
				else if($comments.find("textarea").hasClass("err-corr-target")) {
					theLogger.log("簽辦意見停用錯別字校正功能");
					theAOL.unbindSC();
				}
			}
			$commentItem.find("textarea").on("input", function() {	// 在本流程點的簽辦意見內打字則顯示確定及取消按鈕
				// 1141015 Raymond 1141129 新增檢核若有傳入data物件, 且為hideBtns:true則不要顯示確定及取消按鈕
				if(arguments.length < 2 || !arguments[1]?.hideBtns)
				$(this).parent().find("a.ui-btn").show();
			});
			$commentItem.find("#btnChangeCmtOK").on('click', function() {	// 按確定鈕將目前的簽辦意見寫回封裝檔物件
				var newCmtStr = $(this).parent().parent().find("textarea").val();
				theLogger.log(newCmtStr);
				// 1120221 Raymond 1111225 新增判斷forInnerCmt為true時, 改用currInnerComment()
				if(forInnerCmt == true)
					theAOL.currInnerComment(newCmtStr);
				else
				theAOL.currSignComment(newCmtStr);	// 1100708 Raymond 1100648 配合支援分文稿記錄簽核意見功能修改, signComment->currSignComment
				$(this).parent().find("a.ui-btn").hide();
			}).buttonMarkup({corners: false, inline: true, icon: "edit", mini: true});
			$commentItem.find("#btnChangeCmtCancel").on('click', function() {	// 按取消則回復前一次儲存的簽辦意見
				// 1120221 Raymond 1111225 新增判斷forInnerCmt為true時, 改用currInnerComment()
				if(forInnerCmt == true)
					$(this).parent().parent().find("textarea").val(theAOL.currInnerComment());
				else
				$(this).parent().parent().find("textarea").val(theAOL.currSignComment());	// 1100708 Raymond 1100648 配合支援分文稿記錄簽核意見功能修改, signComment->currSignComment
				// 1140321 Raymond 1131303 回復上一次儲存的簽辦意見後同步至錯別字標示層
				if(!mySignCommentReadOnly && theAOL.enableFixWord4TextComment == true) {
					$(this).parent().parent().find("textarea").trigger("input");
				}
				$(this).parent().find("a.ui-btn").hide();
			}).buttonMarkup({corners: false, inline: true, icon: "delete", mini: true});
			// 1100706 Raymond 1100648 新增"辭庫"按鈕, 點擊後開啟常用詞彙子視窗(copy from RD-Edit.js)
			function showFrequentlyUsedPhrase() {
				var dfd = $.Deferred();
				// 對話盒子視窗一律以IFRAME+一個隱藏關閉按鈕顯示
				var $dlg = $("<div data-role='dialog'><iframe></iframe><a id='extdlg_close_btn' style='display:none' class='ui-link'>關閉</a></div>");
				// iframe內的網頁關閉時叫用parent.$.find("#extdlg_close_btn").trigger("click");
				$dlg.find("#extdlg_close_btn").on('click', function(event, retVal) {
					//alert("onclose子視窗(" + retVal + ")");
					// retVal參數即為查詢結果的字串, 直接回傳不回呼常用詞彙指令的callback
					if(typeof retVal === "string")
						dfd.resolve(retVal);
					else if(typeof retVal === "object" && "argClsNo" in retVal)	// 用EAC005測試的回傳值
						dfd.resolve(retVal.argClsNo);
					else
						dfd.reject("回傳值不是字串");
					$.modal.close();
				});
				
				var ow = $("#leftPart #iso").width(),
					oh = $("#leftPart #iso").height();
				var w = 600,
					h = 500;
				$.modal($dlg, {
					appendTo: $("#leftPart #iso"),
					overlayCss: {height: oh, width: ow},
					containerCss: {height: h, width: w},
					autoResize: true,
					focus: false,
					onShow: function() {
						var url = "../../WEDEP/WEI030.aspx?SAMLart=" + theUserInfo.Artifact;	// 共通版固定網址, 不需要比照內政部版用Custom_機關暱稱.js回傳值提供WEI030的內嵌網址
						var $frame = $dlg.find('IFRAME');
						var w = $frame.parent().width(),
							h = $frame.parent().height();
						$frame.css("width", w).css("height", h);
						theLogger.log("開啟子視窗內嵌網址(動態產生)'" + url + "'");
						$frame[0].src = url;
					}
				});
				return dfd.promise();
			}
			$commentItem.find("#btnInputPhrase").on('click', function() {
				try {
					// 呼叫子視窗
					var that = this;
					showFrequentlyUsedPhrase.call(this)
					.done(function(phrase) {
						if(typeof phrase === "string" && phrase.length > 0) {
							// 1150213 Raymond 1150145 新增判斷機關暱稱為TAITRA時, 辭庫輸入的字改為append
							if(SSO_CONFIG.OrgNickName == "TAITRA")
								$(that).closest("li").find("textarea").val($(that).closest("li").find("textarea").val() + phrase);
							else
							$(that).closest("li").find("textarea").val(phrase);
							$(that).closest("li").find(".comment_text a.ui-btn").show();
						}
					})
					.fail(function(errText) {
						theLogger.error(errText);
						alert(errText);
					});
				}
				catch(e) {
					theLogger.error(e.stack);
				}
			}).buttonMarkup({corners: false, mini: true});
				// 1150409	Leslie[1150262]	[外貿]簽辦意見窗格新增主管核決用便捷功能鍵
				$commentItem.find("#btnInputApprove1,#btnInputApprove2,#btnInputApprove3").on('click', function() {
					let oriStr = $(this).closest("li").find("textarea").val();
					let approveCommand = $(this).text();
					$(this).closest("li").find("textarea").val((oriStr == ''?'':oriStr+'\r') + approveCommand);
					$("#btnChangeCmtOK").trigger('click');
					$('#aol #chkApprove').prop('checked', true).checkboxradio('refresh');
				}).buttonMarkup({corners: false, mini: true});
			}
			
			// 1111027 Raymond 1110864 合併1101468, 啟用「顯示我的最終意見」功能時, 判斷若是草稿或來文分辦後的第一個流程點, 不要顯示"意見管理"按鈕
			if(theSSO.User.EnvSettings.get("AOL_SHOW_MY_FINAL_COMMENT") == "Y") {
				if(aolFlows.flows.length == 0 ||
					_getMsgIdFromAolFlowId(aolFlows.flows[aolFlows.flows.length - 1].id) == "0") {
					$commentItem.find("#btnCommentMgmt").hide();
				}
				else {
					// 1111025 Raymond 1110864 合併1101468, 新增"意見管理"按鈕, 點擊後開啟意見管理子視窗
					$commentItem.find("#btnCommentMgmt").show().on('click', function() {
						// 判斷有隱藏的流程點
						var hasHiddenComments = false,
							hideOldComments = false,
							xFS = undefined, xD = undefined;
						var idx = aolFlows.flows.length - 1;
						var aolFlow = aolFlows.flows.length ? aolFlows.flows[idx] : null; // 2016.10.12 - bug-fix, 草稿無法開啟簽辦意見子視窗問題
						var flowMsgId = (!!aolFlow) ? _getMsgIdFromAolFlowId(aolFlow.id) : '';
						var todoMsgId = '';
						if (isDraft) {
							var idxUL = docObj.msgId.indexOf('_');
							if (idxUL>0) {
								todoMsgId = docObj.msgId.substring(0, idxUL);
							}
						}
						else {
							todoMsgId = docObj.msgId;
						}
						if (flowMsgId.length && (flowMsgId===todoMsgId)) {
							idx--;
						}
						var currDraftInfo = theAOL.getCurrFolio().getCurrDraftInfo();	// 目前文稿提前在這裡宣告, 因啟用分文稿記錄簽核意見功能時會用到
						for (; idx>=0; idx--)
						{
							aolFlow = aolFlows.flows[idx];
							flowMsgId = _getMsgIdFromAolFlowId(aolFlow.id);
							if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {	// 啟用分文稿記錄簽核意見功能時, 取文稿下的xHideComments記錄來判斷是否有隱藏流程點的簽辦意見
								xD = theAOL.signFolder.xSignFolder().getDraft(currDraftInfo.guid);
								if(!!xD) {
									var xHC = xD.getHideComment(flowMsgId);
									if(!!xHC && xHC.value == "true") {
										hasHiddenComments = true;
										break;
									}
								}
							}
							else {	// 未啟用分文稿記錄簽核意見功能時, 取<流程點簽核人員>的記錄來判斷是否有隱藏流程點的簽辦意見
								xFS = theAOL.signFolder.xSignFolder().getXFlowSigner(flowMsgId);
								if(!!xFS && xFS.hideComment == "true") {
									hasHiddenComments = true;
									break;
								}
							}
						}
						
						var $dlg = $('<div data-role="dialog">\
										<header>\
											<h1>意見管理</h1>\
										</header>\
										<div data-role="content" data-theme="c">\
											<label for="hideOldComments">僅顯示我的最終意見</label>\
											<input id="hideOldComments" type="checkbox">\
											<label for="showAllComments">顯示完整意見</label>\
											<input id="showAllComments" type="checkbox">\
											<div class="ui-grid-a"">\
												<div class="ui-block-a"><a id="cancel" data-role="button" data-corners="false" data-theme="c">取消</a></div>\
												<div class="ui-block-b"><a id="ok" data-role="button" data-corners="false" data-theme="b">確定</a></div>\
											</div>\
										</div>\
									</div>');
						if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {	// 啟用分文稿記錄簽核意見功能時, 取文稿下的xHideComments記錄來判斷是否已設定隱藏流程點的簽辦意見
							xD = theAOL.signFolder.xSignFolder().getDraft(currDraftInfo.guid);
							if(!!xD) {
								var xHC = xD.getHideComment(docObj.msgId);
								if(!!xHC) {
									hideOldComments = xHC.value == "false";
									if(hideOldComments && xHC.account != theSSO.User.account)	// 目前流程點的使用者帳號與前次儲存時的使用者帳號不一致, 可能是代理公文, 若代理人欲使用"意見管理"功能時原流程點使用者已設定過"僅顯示我的最終意見", 則提示警告
										alert("此流程點已儲存過「僅顯示我的最終意見」設定，但並非目前使用者，請謹慎使用此功能。");
								}
								else if("hideComment" in xD)
									hideOldComments = xD.hideComment == false;
							}
						}
						else {	// 未啟用分文稿記錄簽核意見功能時, 取<流程點簽核人員>的記錄來判斷是否已設定隱藏流程點的簽辦意見
							xFS = theAOL.signFolder.xSignFolder().getXFlowSigner(docObj.msgId);
							if(!!xFS && "hideComment" in xFS) {
								hideOldComments = xFS.hideComment == "false";
								if(hideOldComments && xFS.account != theSSO.User.account)	// 目前流程點的使用者帳號與前次儲存時的使用者帳號不一致, 可能是代理公文, 若代理人欲使用"意見管理"功能時原流程點使用者已設定過"僅顯示我的最終意見", 則提示警告
									alert("此流程點已儲存過「僅顯示我的最終意見」設定，但並非目前使用者，請謹慎使用此功能。");
							}
							else if("hideComment" in theAOL.getCurrFolio())
								hideOldComments = theAOL.getCurrFolio().hideComment == false;
						}
						$dlg.find("#hideOldComments").prop("checked", hideOldComments);
						if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y")	// 啟用分文稿記錄簽核意見功能時, 用文稿來記憶是否顯示完整簽辦意見
							$dlg.find("#showAllComments").prop("checked", currDraftInfo.showAllComments == true);
						else
							$dlg.find("#showAllComments").prop("checked", theAOL.getCurrFolio().showAllComments == true);
						$dlg.find("#ok").on('click', function() {
							var refresh = false;
							if($dlg.find("#hideOldComments").prop("checked") != hideOldComments) {
								if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {	// 啟用分文稿記錄簽核意見功能時, 取文稿下的xHideComments記錄來設定是否隱藏流程點的簽辦意見
									xD = theAOL.signFolder.xSignFolder().getDraft(currDraftInfo.guid);
									if(!!xD) {
										if($dlg.find("#hideOldComments").prop("checked") == true) {	// 勾選時將目前流程點設為false, 之前的同UserID的流程點設為true
											xD.hideComment = false;	// 儲存XSignObjs.xml時記錄此流程點不隱藏簽辦意見
											var xHC = xD.getHideComment(docObj.msgId);
											if(!!xHC)
												xHC.value = "false";	// 目前流程點記錄為不隱藏簽辦意見
											for(var i=0, n=aolFlows.flows.length; i<n; i++) {
												var af = aolFlows.flows[i];
												flowMsgId = _getMsgIdFromAolFlowId(af.id);
												if(flowMsgId != docObj.msgId) {	// 封裝檔若有目前流程點msgId的<簽核點定義>, 應是異動撤消的結果, 設定已在for-loop上面執行過了, for-loop內的不能再做一次
													xHC = xD.getHideComment(flowMsgId);
													if(!!xHC) {
														if(af.refChangeInfo.charger.userId == theSSO.User.account)	// 只隱藏與目前使用者相同ID的流程點, 不考慮是不是代理人的情境
															xHC.value = "true";	// 之前的同UserID流程點則記錄為隱藏簽辦意見
													}
													else if(!!af.refChangeInfo) {	// XSignObjs.xml無此msgId的<隱藏簽辦意見>時, 新增
														if(af.refChangeInfo.charger.userId == theSSO.User.account)	// 只隱藏與目前使用者相同ID的流程點, 不考慮是不是代理人的情境
															xD.addHideComment(flowMsgId, af.refChangeInfo.charger.userId, "true");
														else
															xD.addHideComment(flowMsgId, af.refChangeInfo.charger.userId);
													}
												}
											}
										}
										else {	// 取消勾選時將目前流程點設為及之前的同UserID的流程點都設為空字串
											if("hideComment" in xD)
												delete xD.hideComment;	// 儲存XSignObjs.xml時不記錄"hideComment"
											var xHC = xD.getHideComment(docObj.msgId);
											if(!!xHC && "value" in xHC)
												delete xHC.value;	// 目前流程點不隱藏
											for(var i=0, n=aolFlows.flows.length; i<n; i++) {
												var af = aolFlows.flows[i];
												flowMsgId = _getMsgIdFromAolFlowId(af.id);
												if(flowMsgId != docObj.msgId) {	// 封裝檔若有目前流程點msgId的<簽核點定義>, 應是異動撤消的結果, 設定已在for-loop上面執行過了, for-loop內的不能再做一次
													xHC = xD.getHideComment(flowMsgId);
													if(!!xHC) {
														if(af.refChangeInfo.charger.userId == theSSO.User.account) {	// 只隱藏與目前使用者相同ID的流程點, 不考慮是不是代理人的情境
															if("value" in xHC)
																delete xHC.value;
														}
													}
													else if(flowMsgId != docObj.msgId && !!af.refChangeInfo) {	// XSignObjs.xml無此msgId的<隱藏簽辦意見>時, 新增
														xD.addHideComment(flowMsgId, af.refChangeInfo.charger.userId);
													}
												}
											}
										}
									}
									else {
										theLogger.error("XSignObjs.xml中找不到GUID為'" + currDraftInfo.guid + "'的文稿, 無法設定隱藏簽核意見功能");
										throw new Error("XSignObjs.xml中找不到GUID為'" + currDraftInfo.guid + "'的文稿, 無法設定隱藏簽核意見功能");
									}
								}
								else {	// 未啟用分文稿記錄簽核意見功能時, 取<流程點簽核人員>的記錄來設定是否隱藏流程點的簽辦意見
									if($dlg.find("#hideOldComments").prop("checked") == true) {	// 勾選時將目前流程點設為false, 之前的同UserID的流程點設為true
										theAOL.getCurrFolio().hideComment = false;	// 儲存XSignObjs.xml時記錄此流程點不隱藏簽辦意見
										xFS = theAOL.signFolder.xSignFolder().getXFlowSigner(docObj.msgId);
										if(!!xFS)
											xFS.hideComment = "false";	// 目前流程點記錄為不隱藏簽辦意見
										for(var i=0, n=aolFlows.flows.length; i<n; i++) {
											var af = aolFlows.flows[i];
											if(!!af.refChangeInfo && af.refChangeInfo.charger.userId == theSSO.User.account) {	// 只隱藏與目前使用者相同ID的流程點, 不考慮是不是代理人的情境
												flowMsgId = _getMsgIdFromAolFlowId(af.id);
												xFS = theAOL.signFolder.xSignFolder().getXFlowSigner(flowMsgId);
												if(!!xFS)
													xFS.hideComment = "true";	// 之前的同UserID流程點則記錄為隱藏簽辦意見
											}
										}
									}
									else {	// 取消勾選時將目前流程點設為及之前的同UserID的流程點都設為空字串
										if("hideComment" in theAOL.getCurrFolio())
											delete theAOL.getCurrFolio().hideComment;	// 儲存XSignObjs.xml時不記錄"hideComment"
										xFS = theAOL.signFolder.xSignFolder().getXFlowSigner(docObj.msgId);
										if(!!xFS && "hideComment" in xFS)
											delete xFS.hideComment;	// 目前流程點不隱藏
										for(var i=0, n=aolFlows.flows.length; i<n; i++) {
											var af = aolFlows.flows[i];
											if(!!af.refChangeInfo && af.refChangeInfo.charger.userId == theSSO.User.account) {	// 只隱藏與目前使用者相同ID的流程點, 不考慮是不是代理人的情境
												flowMsgId = _getMsgIdFromAolFlowId(af.id);
												xFS = theAOL.signFolder.xSignFolder().getXFlowSigner(flowMsgId);
												if(!!xFS && "hideComment" in xFS)
													delete xFS.hideComment;
											}
										}
									}
								}
								hideOldComments = $dlg.find("#hideOldComments").prop("checked");
								refresh = true;
							}
							
							if($dlg.find("#showAllComments").prop("checked") != theAOL.getCurrFolio().showAllComments) {	// 顯示完整意見的選項異動記錄在本次開啟的公文物件, 不同稿件共用這個設定值, 不同公文或同一件公文不同次開啟都會恢復成undefined
								if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {	// 啟用分文稿記錄簽核意見功能時, 用文稿來記憶是否顯示完整簽辦意見
									currDraftInfo.showAllComments = $dlg.find("#showAllComments").prop("checked");
								}
								else {
									theAOL.getCurrFolio().showAllComments = $dlg.find("#showAllComments").prop("checked");
								}
								refresh = true;
							}
							if(refresh)
								_setupComments($comments);
							$.modal.close();
						});
						$dlg.find("#cancel").on('click', function() {
							$.modal.close();
						});
						
						var ow = $("#leftPart #iso").width(),
							oh = $("#leftPart #iso").height();
						$.modal($dlg, {
							appendTo: $("#leftPart #iso"),
							overlayCss: {height: oh, width: ow},
							containerCss: {height: 230, width: 300},
							autoResize: true,
							focus: false,
							onShow: function() {
								$dlg.trigger("create");
								
								// 未輸入任可簽辦意見時, 「僅顯示我的最終意見」核取方塊反灰
								if($comments.find("textarea").val().length == 0) {
									$dlg.find("#hideOldComments").prop("checked", false).attr("disabled", true).checkboxradio("refresh");
								}
								else {
									$dlg.find("#hideOldComments").prop("checked", hideOldComments);
								}
								
								// 判斷沒有隱藏的流程點簽辦意見時, 隱藏「顯示完整意見」核取方塊
								if(!hasHiddenComments)
									$dlg.find("#showAllComments").parent().css("visibility", "hidden");
							}
						});
					}).buttonMarkup({corners: false, mini: true});
				}
			}
		}
		
		// 1130510 Raymond 1120888 新增判斷環境變數「AOL_SIGNCOMMENT_OLDER_FIRST」設為Y時, 簽核意見清單排序改為從舊到新
		var signCommentOlderFirst = theSSO.User.EnvSettings.get("AOL_SIGNCOMMENT_OLDER_FIRST") == "Y";
		var firstCmtIdx = $comments.find("li").length;
		var firstInnerCmtIdx = (forInnerCmt)?$innerCmt.find("li").length:-1;
		
		// 1150309 Raymond 1150145 新增取得第一個核決流程點的msgId
		var m = aolFlows.flows.length, firstAppFlow = undefined;
		for(var j=0; j<m; j++) {
			let aolFlow = aolFlows.flows[j];
			let flowMsgId = aolFlow.id.substr(aolFlow.id.lastIndexOf('_') + 1);
			let nMsgId = parseInt(flowMsgId);
			let itemDTDL = undefined;
			if (nMsgId<nMaxDraftMsgId && !!docToDoList && docToDoList.length) {
				itemDTDL = docToDoList[0];
			}
			else if (!!docToDoList) {
				itemDTDL = _getDocToDoListItem(docToDoList, flowMsgId);
			}
			if("refChangeInfo" in aolFlow) {
				if(!firstAppFlow) {
					if(!!itemDTDL && !!itemDTDL.appUserId && itemDTDL.appUserId.length > 0 && !!itemDTDL.appRoleId && itemDTDL.appRoleId.length > 0) {
						theLogger.log("第1個核決流程點是" + itemDTDL.msgId);
						firstAppFlow = itemDTDL.msgId;
					}
				}
			}
		}
		
		var idx = aolFlows.flows.length - 1;
		
		//若最後一個AolFlow項目為目前流程點, 跳過
		//var aolFlow = aolFlows.length ? aolFlows.flows[idx] : null; // 2016.10.12 - bug-fix, 草稿無法開啟簽辦意見子視窗問題
		var aolFlow = aolFlows.flows.length ? aolFlows.flows[idx] : null; // 2016.10.12 - bug-fix, 草稿無法開啟簽辦意見子視窗問題
		var flowMsgId = (!!aolFlow) ? _getMsgIdFromAolFlowId(aolFlow.id) : '';
		var todoMsgId = '';
		if (isDraft) {
			var idxUL = docObj.msgId.indexOf('_');
			if (idxUL>0) {
				todoMsgId = docObj.msgId.substring(0, idxUL);
			}
		}
		else {
			todoMsgId = docObj.msgId;
		}
		
		if (flowMsgId.length && (flowMsgId===todoMsgId)) {
			idx--;
		}
		// 1150224 Raymond 1150145 取消目前流程點為OD99角色時不預帶前一個流程點為同一級單位時的簽辦意見的條件
		// 1141027 Raymond 修正彙併辦公文, 點擊子文時因為沒有ODWMSG而發生Error的問題(查北榮序323問題時發現)
		// 1141015 Raymond 1141129 檢查最後一個流程點的OwnOU若與目前流程點為同個一級單位時，將其簽核意見複製到簽核意見文字方塊
		//if(theSSO.User.EnvSettings.get("AOL_COPY_LAST_SAMEOU_SIGNCOMMENT") == "Y" && theSSO.User.EnvSettings.get("AOL_MY_SIGNCOMMENT_READONLY") != "Y" && docObj.ODWMSG.OWN_ROLE_ID != "OD99" && idx >= 0) {
		//if(theSSO.User.EnvSettings.get("AOL_COPY_LAST_SAMEOU_SIGNCOMMENT") == "Y" && theSSO.User.EnvSettings.get("AOL_MY_SIGNCOMMENT_READONLY") != "Y" && !!docObj.ODWMSG && docObj.ODWMSG.OWN_ROLE_ID != "OD99" && idx >= 0) {
		if(theSSO.User.EnvSettings.get("AOL_COPY_LAST_SAMEOU_SIGNCOMMENT") == "Y" && theSSO.User.EnvSettings.get("AOL_MY_SIGNCOMMENT_READONLY") != "Y" && idx >= 0) {
			aolFlow = aolFlows.flows[idx];
			flowMsgId = _getMsgIdFromAolFlowId(aolFlow.id);
			let nMsgId = parseInt(flowMsgId);
			let itemDTDL = null;
			if (nMsgId<nMaxDraftMsgId && !!docToDoList && docToDoList.length) {
				itemDTDL = docToDoList[0];
			}
			else if (!!docToDoList) {
				itemDTDL = _getDocToDoListItem(docToDoList, flowMsgId);
			}
			if(!!aolFlow.refChangeInfo && !!itemDTDL) {
				theLogger.log("MsgID:" + itemDTDL.msgId + ", 單位代碼:" + itemDTDL.ownOUId);
				if(sameLv1OU(itemDTDL.ownOUId, docObj.ODWMSG.OWN_OU_ID)) {
					if($comments.find("textarea").val() == "") {
						theLogger.log("本流程點簽核意見為空, 預帶前一筆同一級單位的簽核意見內容至簽辦意見");
						theAOL.currSignComment(aolFlow.refChangeInfo.comment);
						$comments.find("textarea").val(aolFlow.refChangeInfo.comment);
					}
				}
			}
		}
		
		var $item, sItem, itemDTDL, comment;
		var nMsgId;
		// 1080130 Raymond 1080014 新增判斷整個封裝檔有任何流程點加過簽署意見
		//var hasAnyComment = false;	// 1120221 Raymond 1111225 移至populateComments前宣告
		// 1100706 Raymond 1100648 新增支援分文稿記錄簽核意見功能
		var currDraftInfo = theAOL.getCurrFolio().getCurrDraftInfo();
		// 1130517 Raymond 1120888 合併屏東1120943, 新增判斷中間間隔了其它單位的與目前流程點同一級單位的流程點變數
		var ownouSeperated = false, ownouSeperatedFlows = 0;
		// 最近的流程先加!
		for (; idx>=0; idx--)
		{
			aolFlow = aolFlows.flows[idx];
			// 1090430 Raymond 1090261 恢復由docToDoList取得流程點資訊
			/* 1070410 Raymond 1070463 直接以封裝裝記錄的流程點資訊顯示單位、角色、姓名, 以避免因OrgInfo找不到該此帳號資訊而當掉*/
			flowMsgId = _getMsgIdFromAolFlowId(aolFlow.id);
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
				thisUserInfo = {
					OUName: aolFlow.refChangeInfo.charger.ou,
					RoleName: aolFlow.refChangeInfo.charger.role,
					UserName: aolFlow.refChangeInfo.charger.name
				}
				// 1090430 Raymond 1090261 檢核docToDoList的Item的proxySend是否為1, 是則表示為代理流程點
				if(!!itemDTDL && itemDTDL.proxySend == "1") {
					theLogger.log("MsgID:" + itemDTDL.msgId + "為代理流程點, 流程點人員名稱變更為'" + aolFlow.refChangeInfo.charger.name + "(代)'");
					thisUserInfo.UserName += "(代)";
				}
				// 1130517 Raymond 1120888 合併屏東1120943, 新增單位代碼
				if(!!itemDTDL) {
					// 1150309 Raymond 1150145 新增判斷SSO_CONFIG.OrgNickName為"TAITRA"(外貿)時, 若ownOUId大於95且roleId為OD16時, 忽略不顯示此流程點
					if(SSO_CONFIG.OrgNickName == "TAITRA" && itemDTDL.ownOUId >= 95 && itemDTDL.ownRoleId == "OD16") {
						theLogger.log("MsgID:" + itemDTDL.msgId + ", 單位代碼:" + itemDTDL.ownOUId + ", 角色代碼:" + itemDTDL.ownRoleId + ", 符合外貿規則, 忽略不顯示此流程點");
						continue;
					}
					theLogger.log("MsgID:" + itemDTDL.msgId + ", 單位代碼:" + itemDTDL.ownOUId);
					//1140801	Leslie[1141011]	弱掃修正[Client DOM Stored XSS]，以套件做消毒
					// thisUserInfo.OUId = itemDTDL.ownOUId;
					thisUserInfo.OUId = DOMPurify.sanitize(itemDTDL.ownOUId);
					// 1150309 Raymond 1150145 新增決行流程點旗標
					if(!!firstAppFlow && firstAppFlow == itemDTDL.msgId) {
						thisUserInfo.appFlow = true;
						thisUserInfo.title = aolFlow.refChangeInfo.charger.title;
					}
				}
				/* 1130521 test 1120888 case
				else {
					if(thisUserInfo.OUName == "總務室")
						thisUserInfo.OUId = "41";
					else if(thisUserInfo.OUName == "事務組")
						thisUserInfo.OUId = "413";
					else if(thisUserInfo.OUName == "醫務企管部")
						thisUserInfo.OUId = "42";
					else if(thisUserInfo.OUName == "病歷管理組")
						thisUserInfo.OUId = "421";
					else if(thisUserInfo.OUName == "績效管理組")
						thisUserInfo.OUId = "422";
					else if(thisUserInfo.OUName == "資訊室")
						thisUserInfo.OUId = "37";
					else if(thisUserInfo.OUName == "系統發展組")
						thisUserInfo.OUId = "372";
				}*/
				// 1130520 Raymond 1120888 合併屏東縣序306, 新增一級單位名稱
				if(!!thisUserInfo.OUId) {
					if(thisUserInfo.OUId.length == sso_const.FIRSTCLASS_UNITNO_LEN) {
						thisUserInfo.lv1OUName = thisUserInfo.OUName;
					}
					else {
						thisUserInfo.lv1OUName = SSOUtil.getOrgUnitName(orgNode, thisUserInfo.OUId.substr(0, sso_const.FIRSTCLASS_UNITNO_LEN));
						/* 1130521 test 1120888 case
						if(thisUserInfo.OUId == "413")
							thisUserInfo.lv1OUName = "總務室";
						else if(thisUserInfo.OUId == "421")
							thisUserInfo.lv1OUName = "醫務企管部";
						else if(thisUserInfo.OUId == "422")
							thisUserInfo.lv1OUName = "醫務企管部";
						else if(thisUserInfo.OUId == "372")
							thisUserInfo.lv1OUName = "資訊室";*/
					}
				}
				else	// 1130520 Raymond 1120888 合併屏東縣序306, 外機關一級單位=原來的機關加單位名稱
					thisUserInfo.lv1OUName = thisUserInfo.OUName;
				
				// 1111027 Raymond 1110864 合併1101468, 啟用「顯示我的最終意見」功能時, 新增判斷是否設定成隱藏(僅顯示我的最終意見)
				if(theSSO.User.EnvSettings.get("AOL_SHOW_MY_FINAL_COMMENT") == "Y") {
					if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {	// 啟用分文稿記錄簽核意見功能時, 取文稿下的xHideComments記錄來決定是否隱藏流程點的簽辦意見
						xD = theAOL.signFolder.xSignFolder().getDraft(currDraftInfo.guid);
						if(!!xD) {
							var xHC = xD.getHideComment(flowMsgId);
							if(!!xHC && xHC.value == "true" && !currDraftInfo.showAllComments) {	// 勾選「顯示完整意見」時, 不隱藏任何簽辦意見, 但hideComment記錄不異動
								theLogger.log("隱藏[" + aolFlow.refChangeInfo.charger.ou + "-" + aolFlow.refChangeInfo.charger.role + "-" + aolFlow.refChangeInfo.charger.name + "(" + aolFlow.refChangeInfo.charger.userId + ")]的簽辦意見");
								continue;
							}
						}
					}
					else {	// 未啟用分文稿記錄簽核意見功能時, 取<流程點簽核人員>的記錄來決定是否隱藏流程點的簽辦意見
						var xFS = theAOL.signFolder.xSignFolder().getXFlowSigner(flowMsgId);
						if(!!xFS && xFS.hideComment == "true" && !theAOL.getCurrFolio().showAllComments) {	// 勾選「顯示完整意見」時, 不隱藏任何簽辦意見, 但hideComment記錄不異動
							theLogger.log("隱藏[" + aolFlow.refChangeInfo.charger.ou + "-" + aolFlow.refChangeInfo.charger.role + "-" + aolFlow.refChangeInfo.charger.name + "(" + aolFlow.refChangeInfo.charger.userId + ")]的簽辦意見");
							continue;
						}
					}
				}
			}
			else
				continue;
			
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
								// 1120221 Raymond 1111225 新增支援內部意見
								if(forInnerCmt == true) {
									if(!!aolFlow.refSignInfo.drafts[i].innerComment && aolFlow.refSignInfo.drafts[i].innerComment.length > 0)
										comment = aolFlow.refSignInfo.drafts[i].innerComment;
								}
								else
								if(!!aolFlow.refSignInfo.drafts[i].signComment && aolFlow.refSignInfo.drafts[i].signComment.length > 0) {	// 1100820 Raymond 修正舊檔沒有分文稿記錄的簽核意見時
									comment = aolFlow.refSignInfo.drafts[i].signComment;
									hasAnyComment = true;
								}
								break;
							}
						}
					}
				}
				catch(e) {
					theLogger.error(e.errorText);
				}
			}
			// 1120221 Raymond 1111225 新增支援內部意見
			else if(forInnerCmt == true) {
				// 過濾同一級單位的流程點
				if(!sameLv1OU(aolFlow.refChangeInfo.ownOUId, docObj.ODWMSG.OWN_OU_ID))
					continue;	// 非相同一級單位則忽略顯示此流程點
				if ((typeof aolFlow.refChangeInfo!=='undefined') && (typeof aolFlow.refChangeInfo.innerComment!=='undefined') && aolFlow.refChangeInfo.innerComment.length) {
					comment = aolFlow.refChangeInfo.innerComment;
					if($comments.find("textarea").val() == "") {
						theLogger.log("預帶最新一筆有輸入的內部意見的文字至簽辦意見文字方塊");
						$comments.find("textarea").val(comment);
						$comments.find("textarea").trigger("input");	// 觸發input事件以顯示「確定」、「取消」按鈕
					}
				}
			}
			else
			if ((typeof aolFlow.refChangeInfo!=='undefined') && (typeof aolFlow.refChangeInfo.comment!=='undefined') && aolFlow.refChangeInfo.comment.length) {
				comment = aolFlow.refChangeInfo.comment;
				// 1080130 Raymond 1080014 新增判斷整個封裝檔有任何流程點加過簽署意見
				hasAnyComment = true;
			}
			// 1111027 Raymond 1110864 合併1101468, 啟用「顯示我的最終意見」功能時, 新增判斷是否為最終意見
			if(theSSO.User.EnvSettings.get("AOL_SHOW_MY_FINAL_COMMENT") == "Y") {
				if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {	// 啟用分文稿記錄簽核意見功能時, 取文稿下的xHideComments記錄來決定是否隱藏流程點的簽辦意見
					xD = theAOL.signFolder.xSignFolder().getDraft(currDraftInfo.guid);
					if(!!xD) {
						var xHC = xD.getHideComment(flowMsgId);
						if(!!xHC && xHC.value == "false" && !currDraftInfo.showAllComments) {
							theLogger.log("顯示[" + aolFlow.refChangeInfo.charger.ou + "-" + aolFlow.refChangeInfo.charger.role + "-" + aolFlow.refChangeInfo.charger.name + "(" + aolFlow.refChangeInfo.charger.userId + ")]的簽辦意見為最終意見");
							comment += "(最終意見)";
						}
					}
				}
				else {	// 未啟用分文稿記錄簽核意見功能時, 取<流程點簽核人員>的記錄來決定是否隱藏流程點的簽辦意見
					var xFS = theAOL.signFolder.xSignFolder().getXFlowSigner(flowMsgId);
					if(!!xFS && xFS.hideComment == "false" && !theAOL.getCurrFolio().showAllComments) {
						theLogger.log("顯示[" + aolFlow.refChangeInfo.charger.ou + "-" + aolFlow.refChangeInfo.charger.role + "-" + aolFlow.refChangeInfo.charger.name + "(" + aolFlow.refChangeInfo.charger.userId + ")]的簽辦意見為最終意見");
						comment += "(最終意見)";
					}
				}
			}
			
			// 1100706 Raymond 1100648 新增支援分文稿記錄簽核意見功能, 啟用時要判斷此簽核流程找得到目前顯示文稿
			if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") != "Y" || !missCurrDraft) {
			
			// 1141014 Raymond 1141129 新增若機關暱稱為"TAITRA"(外貿)時, 採用外貿邏輯
			if(SSO_CONFIG.OrgNickName == "TAITRA") {
				if(sameLv1OU(thisUserInfo.OUId, docObj.ODWMSG.OWN_OU_ID)) {
					theLogger.log("此流程點(OUId:" + thisUserInfo.OUId + ")與目前流程點單位為相同一級單位(icOU:" + docObj.ODWMSG.OWN_OU_ID + "), 要顯示此流程點");
				}
				else {
					var $trgLi = (signCommentOlderFirst)?$comments.find("li").eq(firstCmtIdx):$comments.find("li:last");
					if(sameLv1OU(thisUserInfo.OUId, $trgLi.find("div.unit").attr("data-ouid"))) {
						theLogger.log("此流程點(OUId:" + thisUserInfo.OUId + ")與目前流程點非相同一級單位(ownOUId:" + docObj.ODWMSG.OWN_OU_ID + "), 且與後(倒序)一個流程點(OUId:" + $trgLi.find("div.unit").attr("data-ouid") + ")為相同一級單位, 不顯示此流程點");
						continue;
					}
				}
				var hideSameLv1OU = true;	// 顯示不同單位的流程點時, 僅顯示時間及單位名
			}
			else {
			// 1130517 Raymond 1120888 新增判斷環境變數「AOL_SIGNCOMMENT_HIDE_SAME_LV1OU」為"Y"時, 過濾只顯示連續的同個一級單位的最後一個流程點功能
			var hideSameLv1OU = theSSO.User.EnvSettings.get("AOL_SIGNCOMMENT_HIDE_SAME_LV1OU") == "Y";
			if(hideSameLv1OU) {
				// 1130517 Raymond 1120888 Jim說承辦單位的所有流程點都不要隱藏
				if(sameLv1OU(thisUserInfo.OUId, docObj.ODWMSG.INCHARGE_OU)) {
					theLogger.log("此流程點(OUId:" + thisUserInfo.OUId + ")與承辦單位為相同一級單位(icOU:" + docObj.ODWMSG.INCHARGE_OU + "), 要顯示此流程點");
				}
				else
				// 1130517 Raymond 1120888 合併屏東1120943, 新增判斷此流程點的data-ouid非ODWMSG.OWN_OU_ID且與後(因為倒序的關係)一個流程點的data-ouid為相同一級單位時, 不顯示此流程點
				if(!sameLv1OU(thisUserInfo.OUId, docObj.ODWMSG.OWN_OU_ID)) {
					ownouSeperated = true;	// 從這個流程點以下若有與目前流程點相同一級單位的流程點, 也是前一次送會前或受會時的流程點, 設定為分離狀態
					ownouSeperatedFlows = 0;	// 分離狀態的流程點計數變數歸零
					var $trgLi = (signCommentOlderFirst)?$comments.find("li").eq(firstCmtIdx):$comments.find("li:last");
					if(sameLv1OU(thisUserInfo.OUId, $trgLi.find("div.unit").attr("data-ouid"))) {
						// 1130517 Raymond 1120888 合併屏東1121105, 一層決行意見不要過濾：單位代碼大於95的單位，簽辦意見不要過濾顯示
						if(thisUserInfo.OUId > "95")
							theLogger.log("此流程點(OUId:" + thisUserInfo.OUId + ")與目前流程點非相同一級單位(ownOUId:" + docObj.ODWMSG.OWN_OU_ID + "), 且與後(倒序)一個流程點(OUId:" + $trgLi.find("div.unit").attr("data-ouid") + ")為相同一級單位但為一層決行單位, 要顯示此流程點");
						// 1130517 Raymond 1120888 不要合併屏東1121105, 會辦單位排除內會單位的簽辦意見不要顯示
						//else if(isInnerOU(thisUserInfo.OUId)) {
						//	theLogger.log("此流程點(OUId:" + thisUserInfo.OUId + ")與目前流程點非相同一級單位(ownOUId:" + docObj.ODWMSG.OWN_OU_ID + "), 且與後(倒序)一個流程點(OUId:" + $trgLi.find("div.unit").attr("data-ouid") + ")為相同一級單位但為內會單位, 不顯示此流程點");
						//	continue;
						//}
						// 1130520 Raymond 1120888 合併屏東縣序306, 再修正若無簽核意見,則改顯示前一個同單位流程點
						else if($trgLi.find("div.comment_text").text() == "[無簽核意見]") {
							theLogger.log("此流程點(OUId:" + thisUserInfo.OUId + ")與目前流程點非相同一級單位(ownOUId:" + docObj.ODWMSG.OWN_OU_ID + "), 且與後(倒序)一個流程點(OUId:" + $trgLi.find("div.unit").attr("data-ouid") + ")為相同一級單位, 但後一個流程點無簽核意見, 改顯示此流程點");
							$trgLi.remove();
						}
						else {
							theLogger.log("此流程點(OUId:" + thisUserInfo.OUId + ")與目前流程點非相同一級單位(ownOUId:" + docObj.ODWMSG.OWN_OU_ID + "), 且與後(倒序)一個流程點(OUId:" + $trgLi.find("div.unit").attr("data-ouid") + ")為相同一級單位, 不顯示此流程點");
							continue;
						}
					}
					theLogger.log("此流程點(OUId:" + thisUserInfo.OUId + ")與目前流程點非相同一級單位(ownOUId:" + docObj.ODWMSG.OWN_OU_ID + "), 且與後(倒序)一個流程點(OUId:" + $trgLi.find("div.unit").attr("data-ouid") + ")非相同一級單位, 要顯示此流程點");
				}
				else if(ownouSeperated) {
					if(++ownouSeperatedFlows > 1) {	// 分離狀態的流程點計數變數加1, 超過1個流程點不顯示
						// 1130517 Raymond 1120888 不要合併屏東1121105, 主辦單位排除內會單位的簽辦意見不要顯示
						//if(isInnerOU(thisUserInfo.OUId)) {
						//	theLogger.log("此流程點(OUId:" + thisUserInfo.OUId + ")與目前流程點為相同一級單位(ownOUId:" + docObj.ODWMSG.OWN_OU_ID + "), 但在其它單位的流程點前的第" + ownouSeperatedFlows + "個流程點(倒序), 但為內會單位, 不顯示此流程點");
						//	continue;
						//}
						var $trgLi = (signCommentOlderFirst)?$comments.find("li").eq(firstCmtIdx):$comments.find("li:last");// 1141008 Raymond 1141129 修正$trgLi未重取, 會一直指向錯的LI, 並錯誤執行remove行為
						// 1130520 Raymond 1120888 合併屏東縣序306, 再修正若無簽核意見,則改顯示前一個同單位流程點
						if($trgLi.find("div.comment_text").text() == "[無簽核意見]") {
							theLogger.log("此流程點(OUId:" + thisUserInfo.OUId + ")與目前流程點為相同一級單位(ownOUId:" + docObj.ODWMSG.OWN_OU_ID + "), 但在其它單位的流程點前的第" + ownouSeperatedFlows + "個流程點(倒序), 但後一個流程點無簽核意見, 改顯示此流程點");
							$trgLi.remove();
						}
						else {
						theLogger.log("此流程點(OUId:" + thisUserInfo.OUId + ")與目前流程點為相同一級單位(ownOUId:" + docObj.ODWMSG.OWN_OU_ID + "), 但在其它單位的流程點前的第" + ownouSeperatedFlows + "個流程點(倒序), 不顯示此流程點");
						continue;
						}
					}
					theLogger.log("此流程點(OUId:" + thisUserInfo.OUId + ")與目前流程點為相同一級單位(ownOUId:" + docObj.ODWMSG.OWN_OU_ID + "), 但在其它單位的流程點前的第" + ownouSeperatedFlows + "個流程點(倒序), 要顯示此流程點");
				}
			}
			}	// end of if(SSO_CONFIG.OrgNickName == "TAITRA") else
			
			var timeStr = '';
			if ((typeof aolFlow.refChangeInfo!=='undefined') && (typeof aolFlow.refChangeInfo.timeStamp==='string') && aolFlow.refChangeInfo.timeStamp.length) {
				timeStr = getTimeString(aolFlow.refChangeInfo.timeStamp);
			}
			else if ((typeof itemDTDL.txTime=='string') && itemDTDL.txTime.length) {
				//1140723	Leslie[1141011]	弱掃修正[Client DOM Stored XSS]，對一般字串改用內建編碼函式
				// timeStr = getTimeString(itemDTDL.txTime);
				timeStr = getTimeString(escape(itemDTDL.txTime));
			}

			// 2021.10.05 - 1100991 Eric, 弱掃修正(call htmlEncode)
			commentItemStr = '<li>' +
								// 1140922 Raymond 1140887 簽辦意見窗格各流程點資訊標籤新增data-flowid屬性, 以供點擊文字意見時捲動簽辦意見窗格到新增該文字意見的流程點
								//'<div class="flowsite_info">' +
								'<div class="flowsite_info" data-flowid="' + aolFlow.id + '">' +
									'<div class="date_time">' + theSSO.Util.htmlEncode(timeStr) + '</div>' +
									// 1141015 Raymond 1141129 新增判斷承辦單位一律顯示的邏輯, 排除外貿
									// 1130521 Raymond 1120888 合併屏東縣序306, 新增若非OWN_OU_ID且非承辦單位的流程點, 以一級單位名稱顯示
									// 1130517 Raymond 1120888 合併屏東1120943, 新增data-ouid屬性, 記錄此流程點的ownOUId
									//'<div class="unit">' + theSSO.Util.htmlEncode(thisUserInfo.OUName) + '</div>' +
									//'<div class="unit" data-ouid="' + thisUserInfo.OUId + '">' + theSSO.Util.htmlEncode(thisUserInfo.OUName) + '</div>' +
									//'<div class="unit" data-ouid="' + thisUserInfo.OUId + '">' + ((!hideSameLv1OU || (sameLv1OU(thisUserInfo.OUId, docObj.ODWMSG.OWN_OU_ID) && !ownouSeperated) || sameLv1OU(thisUserInfo.OUId, docObj.ODWMSG.INCHARGE_OU))?theSSO.Util.htmlEncode(thisUserInfo.OUName):theSSO.Util.htmlEncode(thisUserInfo.lv1OUName)) + '</div>' +
									'<div class="unit" data-ouid="' + thisUserInfo.OUId + '">' + ((!hideSameLv1OU || (sameLv1OU(thisUserInfo.OUId, docObj.ODWMSG.OWN_OU_ID) && !ownouSeperated) || (SSO_CONFIG.OrgNickName != "TAITRA" && sameLv1OU(thisUserInfo.OUId, docObj.ODWMSG.INCHARGE_OU)))?theSSO.Util.htmlEncode(thisUserInfo.OUName):theSSO.Util.htmlEncode(thisUserInfo.lv1OUName)) + '</div>' +
									// 1141015 Raymond 1141129 新增判斷承辦單位一律顯示的邏輯, 排除外貿
									// 1130521 Raymond 1120888 新增若為OWN_OU_ID或承辦單位的同一級單位流程點, 顯示角色及姓名
									// 1130517 Raymond 1120888 合併屏東1120943, 新增判斷此流程點的OUId非目前流程點的單位, 則不顯示角色及姓名欄位
									//'<div class="role" style="float: left">' + theSSO.Util.htmlEncode(thisUserInfo.RoleName) + '</div>' +
									//'<div class="name">' + theSSO.Util.htmlEncode(thisUserInfo.UserName) + '</div>' +
									//((!hideSameLv1OU || (sameLv1OU(thisUserInfo.OUId, docObj.ODWMSG.OWN_OU_ID) && !ownouSeperated) || sameLv1OU(thisUserInfo.OUId, docObj.ODWMSG.INCHARGE_OU))?'<div class="role" style="float: left">' + theSSO.Util.htmlEncode(thisUserInfo.RoleName) + '</div>' +
									((!hideSameLv1OU || (sameLv1OU(thisUserInfo.OUId, docObj.ODWMSG.OWN_OU_ID) && !ownouSeperated) || (SSO_CONFIG.OrgNickName != "TAITRA" && sameLv1OU(thisUserInfo.OUId, docObj.ODWMSG.INCHARGE_OU)))?'<div class="role" style="float: left">' + theSSO.Util.htmlEncode(thisUserInfo.RoleName) + '</div>' +
									'<div class="name">' + theSSO.Util.htmlEncode(thisUserInfo.UserName) + '</div>':'') +
								'</div>' +
								// 1081217 Raymond FIX XSS
								//'<div class="comment_text" style="white-space:normal">' + comment + '</div>' +
								'<div class="comment_text" style="white-space:pre-wrap">' + '</div>' +	// 1101122 Raymond 高大序35 修正簽核意見有換行字元時不會折行的問題
								//'<div class="portrait"  style="background:transparent url(\'' + portraitUrl + '\') 50% 50%;"></div>' +
								// 1120221 Raymond 1111225 新增"引用"按鈕
								((forInnerCmt == true && !uiState.readOnly)?'<div style="position:absolute; right:4px; top:4px;"><a data-role="button" id="btnCite">引用</a></div>':'') +
							 '</li>';
			$commentItem = $(commentItemStr);
			// 1081217 Raymond FIX XSS
			$commentItem.find("div.comment_text").text(comment.replace(/<br>/g, "\n"));	// 1081218 Raymond 為了顯示已用&lt;br&gt;記錄在封裝檔中的文字意見, 替換成折行字元
			// 1150309 Raymond 1150145 新增當SSO_CONFIG.OrgNickName為TAITRA(外貿)時, 單位名稱後顯示核決者
			if(SSO_CONFIG.OrgNickName == "TAITRA" && thisUserInfo.appFlow == true)
				$commentItem.find(".unit").text($commentItem.find(".unit").text() + " 核決者：" + thisUserInfo.title + "-" + thisUserInfo.UserName);
			// 1120221 Raymond 1111225 新增判斷forInnerCmt為true時, 改用$innerCmt
			if(forInnerCmt == true) {
				// 1130510 Raymond 1120888 新增判斷環境變數「AOL_SIGNCOMMENT_OLDER_FIRST」設為Y時, 簽核意見清單的上至下排序規則改為從舊到新
				if(signCommentOlderFirst && $innerCmt.find("li").length > firstInnerCmtIdx)
					$innerCmt.find("li").eq(firstInnerCmtIdx).before($commentItem);
				else
					$commentItem.appendTo($innerCmt);
			}
			else {
				// 1130510 Raymond 1120888 新增判斷環境變數「AOL_SIGNCOMMENT_OLDER_FIRST」設為Y時, 簽核意見清單的上至下排序規則改為從舊到新
				if(signCommentOlderFirst && $comments.find("li").length > firstCmtIdx)
					$comments.find("li").eq(firstCmtIdx).before($commentItem);
				else
					$commentItem.appendTo($comments);
			}
			// 1120221 Raymond 1111225 新增引用按鈕
			if(forInnerCmt == true && !uiState.readOnly) {
				$commentItem.find("#btnCite").on('click', function() {
					var txt = $(this).closest("li").find("div.comment_text").text();
					$comments.find("textarea").val(txt);
					$comments.find("textarea").trigger("input");	// 觸發input事件以顯示「確定」、「取消」按鈕
				}).buttonMarkup({corners: false, mini: true});
				if($commentItem.find("div.comment_text").text() == "[無簽核意見]")
					$commentItem.find("#btnCite").addClass("ui-disabled");
			}
			
			}	// end of 1100706 Raymond 1100648 新增支援分文稿記錄簽核意見功能, 啟用時要判斷此簽核流程找得到目前顯示文稿
		}
		// 1120221 Raymond 1111225 新增判斷forInnerCmt為true時, 改用$innerCmt
		if(forInnerCmt == true)
			$innerCmt.listview("refresh");
		else
		$comments.listview("refresh");
		
		}	// 1120221 Raymond 1111225 end of populateComments(forInnerCmt)
		populateComments();	// 組織原本的簽辦意見
		// 1120221 Raymond 1111225 環境變數啟用時且在承辦單位(一級)內或會辦單位時, 顯示內部意見區域
		if(theSSO.User.EnvSettings.get("AOL_ENABLE_INNERCOMMENT") == "Y") {
			if(!!docObj.ODWMSG && !!docObj.ODWMSG.OWN_OU_ID && !!docObj.ODWMSG.INCHARGE_OU &&
				(sameLv1OU(docObj.ODWMSG.OWN_OU_ID, docObj.ODWMSG.INCHARGE_OU) ||
				SSOUtil.isConsultingDoc(docObj, theSSO.User.EnvSettings, orgNode))) {
				$comments.parent().addClass("showInnerCmt");
				populateComments(true, $comments.parent().find("#innerCmtList"));
				hasAnyComment = true;	// 借用此變數讓未勾選過顯示簽辦意見窗格的電腦在創稿時可顯示簽辦意見窗格
			}
			else
				$comments.parent().removeClass("showInnerCmt");
		}
		
		// 1100831 Raymond 1100648 設定顯示簽辦意見窗格前先記憶是否顯示
		var vsb = $comments.parent().is(":visible");
		// 1140515 Raymond 1140474 修改記憶簽辦意見窗格是否顯示的變數從localStorage(show_sign_comment_panel)改為UserEnvSetting(USER_SHOW_SIGN_COMMENT_PANEL)
		// 1111027 Raymond 1110864 合併1101468, 不限行動版, 當啟用「顯示我的最終意見」功能時預設要顯示簽辦意見窗格
		// 1080130 Raymond 1080014 新增判斷整個封裝檔有任何流程點加過簽署意見或前一次手動勾選要顯示簽辦意見窗格的話, 就顯示簽辦意見窗格
		//if(hasAnyComment || localStorage["show_sign_comment_panel"] == "true") {
		//if(hasAnyComment || localStorage["show_sign_comment_panel"] == "true" || (theSSO.User.EnvSettings.get("AOL_SHOW_MY_FINAL_COMMENT") == "Y" && localStorage["show_sign_comment_panel"] != "false")) {
		if(hasAnyComment || showSignCommentPanel == "true" || (theSSO.User.EnvSettings.get("AOL_SHOW_MY_FINAL_COMMENT") == "Y" && showSignCommentPanel != "false")) {
			$comments.closest("#isoContainer").addClass("showSidePanel");
			$("#btnSignCmtPanel, #moBtnSignCmtPanel").addClass("ui-checkbox-on").removeClass("ui-checkbox-off");	// 1100712 Raymond 1100648 #moBtnSignCmtPanel預留給行動平台, 目前行動平台沒有設定鈕也沒有設定選單可勾選或取消勾選顯示簽辦意見窗格
		}
		else {	// 無任何簽署意見且前一次手動取消顯示簽辦意見窗格或未手動勾選過
			$comments.closest("#isoContainer").removeClass("showSidePanel");
			$("#btnSignCmtPanel, #moBtnSignCmtPanel").addClass("ui-checkbox-off").removeClass("ui-checkbox-on");	// 1100712 Raymond 1100648 #moBtnSignCmtPanel預留給行動平台, 目前行動平台沒有設定鈕也沒有設定選單可勾選或取消勾選顯示簽辦意見窗格
		}
		// 1100715 Raymond 1100648 判斷若是行動版傳送區面板顯示時, 調整簽辦意見窗格上邊界, 避免被面板遮到
		if((!!theAOL.docObj.uiState && theAOL.docObj.uiState.mobileDeviceUI) || (!theAOL.docObj.uiState && _getMobileDeviceUI(theAOL.docObj))) {
			$comments.css("margin-top", "40px");
		}
		// 1100831 Raymond 1100648 修正調整寬度會使簽辦意見窗格右側出現一小段空區域及自動顯示簽辦意見窗格後, 再開啟無簽辦意見公文, 會顯示無清單項目的簽辦意見窗格區域問題
		if($comments.closest("#isoContainer").hasClass("showSidePanel") && !vsb) {	// 切換顯示或隱藏簽辦意見窗格
			$comments.closest("#isoContainer").one("transitionend", function() {	// 動畫結束後再依據目前解析度下margin-right空出多少空間, 調整sidePanel的寬度
				// 1101208 Raymond 1101381 修正第一次開啟有簽核意見公文時, 在螢幕寬度1280以下可能發生簽辦意見窗格顯示的寬度大於開關簽辦意見窗格時的寬度
				/*if($(this).hasClass("showSidePanel")) {
					// 1100707 Raymond 1100648 調整不同螢幕寬度下簽辦意見窗格的顯示寬度
					var cntrW = $(this).css("margin-right");
					var pnlW = $comments.parent().width();
					theLogger.log("#isoContainer.marginRight = " + cntrW + ", #sidePanel.width = " + pnlW);
					if(parseFloat(cntrW) > parseFloat(pnlW))
						$comments.parent().width(cntrW);
					else if(parseFloat(pnlW) > parseFloat(cntrW)) {
						if(parseFloat(pnlW) < 200) {
							pnlW = "200px";
							$comments.parent().css("min-width", pnlW);
						}
						$comments.closest("#isoContainer").css("margin-right", pnlW);
						$comments.parent().width(pnlW);
					}
				}
				// 1100712 Raymond 1100648 修正關閉顯示簽辦意見窗格時, 只有清單隱藏, 側邊欄未縮回去的問題
				else {
					$(this).css("margin-right", "");
					
				}*/
				var cntrW = $(this).css("margin-right");
				$comments.parent().width(cntrW);
				if(parseFloat(cntrW) < 200) {	// 右側margin空間不足200px, 設定顯示簽辦意見窗格的最小寬度200px
					cntrW = "200px";
					$comments.parent().css("width", cntrW);
					$comments.closest("#isoContainer").css("margin-right", cntrW);
				}
			});
		}
		// 1101208 Raymond 1101381 排除須顯示且已顯示簽辦意見窗格及已設定簽辦意見窗格最小寬度的情況
		// 1100712 Raymond 1100648 修正關閉顯示簽辦意見窗格時, 只有清單隱藏, 側邊欄未縮回去的問題
		//else {
		else if(!$comments.closest("#isoContainer").hasClass("showSidePanel") ||
				!$comments.closest("#isoContainer").get(0).style.marginRight) {
			$comments.closest("#isoContainer").css("margin-right", "");
		}
	}
	
	// 1140224 Raymond 1131303 新增錯別字校正窗格功能
	function _setupFixWords($fixWordList) {
		// 1140623 Raymond 1131303 錯別字校正服務的系統參數未設定時, 移除錯別字校正窗格頁籤
		if(!theAOL.fixWordService) {
			theLogger.log("錯別字校正服務未設定, 移除錯別字校正窗格頁籤");
			$fixWordList.closest("#sidePanel").find(".ui-header").remove();
			return;
		}
		var dm = theAOL.getCurrFolio().getCurrDraftModel();
		// 1140626 Raymond 1131303 新增切換至來文內容頁籤或開啟信保特殊模式公文無dm時的錯誤處理
		if(!dm) {
			theLogger.log("無dm(來文或信保特殊模式公文), 不提供refreshFixWordList的方法");
			return;
		}
		dm.refreshFixWordList = function(fwo, flag) {	// flag:0 - remove same paraGUID fixwords, 1 - add fixword
			if(!fwo) {
				var fwos = this.getFixWordObjs();
				console.log(fwos);
				//$fixWordList.listview("refresh");
			}
			else if(flag == 0) {
				$fixWordList.find("li").filter(function(idx, li) {
					console.log(li, $(li).find(".fixWordItem").attr("paraGUID"), fwo.paraGUID, $(li).find(".fixWordItem").attr("paraGUID") == fwo.paraGUID);
					return $(li).find(".fixWordItem").attr("paraGUID") == fwo.paraGUID;
				}).remove();
			}
			else {
				var itemStr = '<li>' +
								'<div class="fixWordHeader">' + fwo.origChar + '</div>' +
								'<div class="fixWordHint">' + theAOL.getCurrFolio().getFixWordHintText(fwo) + '</div>' +
								'<div class="fixWordItem" draftGUID="' + fwo.draftGUID + '" paraGUID="' + fwo.paraGUID + '">' +
									'<span class="origChar">' + fwo.origChar + '</span>→' +
									'<span class="fixChar">' + fwo.fixChar + '</span>' +
									'<a data-role="button" class="btnRejectFixWord" title="忽略此錯別字">拒絕</a>' +
								'</div>' +
							'</li>';
				/* 1140623 Raymond 1131303 重新整理單一文稿的錯別字清單時, 先判斷此稿的index, 搜尋已存在清單中的最新下一筆稿件的GUID的錯別字項目, 若有則insertBefore此項目, 否則appendTo
				var $item = $(itemStr);
				var dGUIDs = theAOL.getCurrFolio().getAllDraftGUIDs();
				var dIdx = dGUIDs.indexOf(fwo.draftGUID);
				if(dIdx >= 0)
					dGUIDs.splice(0, dIdx + 1);
				var $nextLi = dGUIDs.length?$fixWordList.children("li").filter((idx, li) => {
					let itGUID = $(li).find(".fixWordItem").attr("draftGUID");
					return (dGUIDs.indexOf(itGUID) >= 0);
				}):null;
				if(!!$nextLi && $nextLi.length > 0)
					$item.insertBefore($nextLi.first());
				else
					$item.appendTo($fixWordList);*/
				// 1140623 Raymond 1131303 重新整理單一文稿的錯別字清單時, 先清除所有既有錯別字項目, 因跨稿件的點選錯別字項目翻頁、全部接受及全部拒絕尚未實作
				var $item = $(itemStr);
				var dGUIDs = theAOL.getCurrFolio().getAllDraftGUIDs();
				var dIdx = dGUIDs.indexOf(fwo.draftGUID);
				if(dIdx >= 0)
					dGUIDs.splice(dIdx, 1);
				if(dGUIDs.length > 0) {
					$fixWordList.children("li").filter((idx, li) => {
						let itGUID = $(li).find(".fixWordItem").attr("draftGUID");
						return (dGUIDs.indexOf(itGUID) >= 0);
					}).remove();
				}
				
				$item.appendTo($fixWordList).find("a.btnRejectFixWord").on("click", fwo, onRejectFixWord).buttonMarkup({corners: false, inline: true, icon: "delete", mini: true})
					.parent().find(".fixChar").on("click", fwo, onAcceptFixWord)
					.closest("li").on("click", fwo, onSwitchFixWord).data("fixWord", fwo);
				$fixWordList.listview("refresh");
				if(!fwo.$para.attr("data-po")) {	// 尚未分頁前, data-po屬性不存在, 每間隔50ms再判斷一次
					setTimeout(function($thisItem, fwo) {
						if(!fwo.$para.attr("data-po"))
							setTimeout(arguments.callee, 50, $thisItem, fwo);
						else
							$thisItem.find(".fixWordHint").text(theAOL.getCurrFolio().getFixWordHintText(fwo));
					}, 50, $item, fwo);
				}
			}
		}
		// 1140620 Raymond 1131303 新增依主旨、段落、條列GUID順序重新排序錯別字校正清單功能
		dm.reorderFixWordList = function(draftGUID, pars) {
			console.log(draftGUID, pars);
			// 先過濾掉合併條列後已不存在的條列
			$fixWordList.children("li").each((idx, li) => {
				if($(li).find(".fixWordItem").attr("draftGUID") == draftGUID) {
					let pguid = $(li).find(".fixWordItem").attr("paraGUID");
					if(pars.indexOf(pguid) < 0) {
						theLogger.log("錯別字#" + idx + "的條列(GUID:" + pguid + ")已不存在, 刪除");
						$(li).remove();
					}
				}
			});
			var lis = Array.from($fixWordList[0].getElementsByTagName("LI"));
			console.log(lis);
			var slis = lis.sort((a, b) => {
				let adg = $(a).find(".fixWordItem").attr("draftGUID"),
					bdg = $(b).find(".fixWordItem").attr("draftGUID");
				if(adg != draftGUID || bdg != draftGUID) {
					if(bdg == draftGUID)
						console.log("a的draftGUID(" + adg + ")不是排序標的, 忽略");
					else if(adg == draftGUID)
						console.log("b的draftGUID(" + bdg + ")不是排序標的, 忽略");
					else
						console.log("a與b的draftGUID(" + adg + ", " + bdg + ")不是排序標的, 忽略");
					return 0;
				}
				else {
					let apg = $(a).find(".fixWordItem").attr("paraGUID"),
						bpg = $(b).find(".fixWordItem").attr("paraGUID");
					let apidx = pars.indexOf(apg),
						bpidx = pars.indexOf(bpg);
					console.log("apidx:" + apidx + " bpidx:" + bpidx + " " + ((apidx < bpidx)?"-1":"1"));
					if(apidx < bpidx)
						return -1;
					return 1;
				}
			});
			console.log(slis);
			slis.forEach(li => $fixWordList.append(li));
			$fixWordList.listview("refresh");
		}
		$fixWordList.listview("refresh");
		function onSwitchFixWord(evt) {
			console.log("onSwitchFixWord:", evt.data);
			if(this.tagName == "LI" && !$(this).hasClass("ui-li-active")) {
				$(this).parent().find("li").removeClass("ui-li-active");
				$(this).addClass("ui-li-active");
			}
			var idx = -1, thisLi = this;
			$(this.parentNode.children).each((i, li) => {
				idx++;
				if(li == thisLi)
					return false;
			});
			theAOL.getCurrFolio().highlightChar(evt.data, idx);
		}
		function onAcceptFixWord(evt) {
			console.log("onAcceptFixWord:", evt.data, evt.isTrigger);
			var dm = theAOL.getCurrFolio().getCurrDraftModel();
			if(!!dm) {
				dm.acceptFixWord(evt.data);
				var $ns = $(this).closest("li").next();
				$(this).closest("li").addClass("removing").on("transitionend", function() {
					$(this).remove();
					if(!evt.isTrigger && theAOL.autoNextFixWord == true) {
						console.log("接受校正後自動選取下個錯別字");
						$ns.trigger("click");
					}
				});
			}
			else
				console.error("getCurrDraftModel() returns", dm);
			return false;
		}
		function onRejectFixWord(evt) {
			console.log("onRejectFixWord:", evt.data, evt.isTrigger);
			var dm = theAOL.getCurrFolio().getCurrDraftModel();
			if(!!dm) {
				dm.rejectFixWord(evt.data);
				var $ns = $(this).closest("li").next();
				$(this).closest("li").addClass("removing").on("transitionend", function() {
					$(this).remove();
					if(!evt.isTrigger && theAOL.autoNextFixWord == true) {
						console.log("接受校正後自動選取下個錯別字");
						$ns.trigger("click");
					}
				});
			}
			else
				console.error("getCurrDraftModel() returns", dm);
			return false;
		}
		$fixWordList.parent().find("#acceptAllFixWords").off("click").on("click", function() {
			console.log("[錯別字校正]全部接受");
			$fixWordList.find(".fixChar").trigger("click");
		});
		$fixWordList.parent().find("#rejectAllFixWords").off("click").on("click", function() {
			console.log("[錯別字校正]全部拒絕");
			$fixWordList.find("a.btnRejectFixWord").trigger("click");
		});
		theAOL.highlightFixWord = function(fwo) {
			if(!$fixWordList.is(":visible") && !!fwo) {	// 目前顯示的是簽辦意見窗格時, 自動切換為錯別字校正窗格
				onSwitchPane.call({id: "fixWordList_tag"});
			}
			$fixWordList.find("li").removeClass("ui-li-active");
			$fixWordList.find("li").filter((idx, li) => {
				return $(li).data("fixWord") == fwo;
			}).addClass("ui-li-active");
		}
		theAOL.removeFixWord = function(fwo) {
			$fixWordList.find("li").filter((idx, li) => {
				return $(li).data("fixWord") == fwo;
			}).remove();
		}
	}
	// 錯別字校正功能選項設定
	$("#fixWordSetting").on("click", function(evt) {
		Util.getDlg("RD-FixWordSetting.html").done(function($dlg) {
			
			$dlg.find("header > h1").unwrap();
			$dlg.find("footer > div").css("width", "50%").unwrap();
			
			if(!theAOL.fixWordService) {	// 錯別字校正服務不存在, 則選項全灰
				$dlg.find("#enableFixWord").prop("disabled", true);
				$dlg.find("#autoNextFixWord").prop("disabled", true);
				$dlg.find("#enableFixWord4TextComment").prop("disabled", true);
				$dlg.find("a#ok").addClass("ui-disabled");
			}
			
			$dlg.find("a#ok").on('click', function(event) {
				let oldFlag = theAOL.enableFixWord;
				theAOL.enableFixWord = $dlg.find("#enableFixWord").prop("checked");
				localStorage['enableFixWord'] = theAOL.enableFixWord;
				theAOL.autoNextFixWord = $dlg.find("#autoNextFixWord").prop("checked");
				localStorage['autoNextFixWord'] = theAOL.autoNextFixWord;
				theAOL.enableFixWord4TextComment = $dlg.find("#enableFixWord4TextComment").prop("checked");
				localStorage['enableFixWord4TextComment'] = theAOL.enableFixWord4TextComment;
				$.modal.close();
				
				if(theAOL.enableFixWord4TextComment == true)
					theAOL.bindSC();
				else
					theAOL.unbindSC();
				if(theAOL.enableFixWord != oldFlag)
					$home.find("#leftPart .viewPort .pages").flip("refresh");
				if(!theAOL.enableFixWord)
					$home.find("#leftPart #sidePanel #fixWordList").empty();
			});
			$dlg.find("#cancel").on('tap', function() {
				$.modal.close();
			});
			
			var w = $home.find("#mainContent").width(),
				h = $home.find("#mainContent").height();
			theLogger.log("新增錯別字校正設定對話方塊, w:" + w + ",h:" + h);
			$.modal($dlg, {
				appendTo: $home.find("#mainContent"),
				overlayCss: {width: w, height: h},
				containerCss: {width: "360px", height: "264px"},
				autoResize:true,
				onShow:function() {
					$dlg.trigger("create");
					$dlg.find(".ui-field-contain").css("margin", "0");
					$dlg.find(".ui-input-text").css("display", "inline-block");
					
					$dlg.find("#enableFixWord").prop("checked", theAOL.enableFixWord).checkboxradio("refresh")
					.on("click", function(evt) {
						if(this.checked) {
							$dlg.find("#autoNextFixWord").closest(".ui-checkbox").removeClass("ui-disabled");
							$dlg.find("#enableFixWord4TextComment").closest(".ui-checkbox").removeClass("ui-disabled");
						}
						else {
							$dlg.find("#autoNextFixWord").prop("checked", false).checkboxradio("refresh").closest(".ui-checkbox").addClass("ui-disabled");
							$dlg.find("#enableFixWord4TextComment").prop("checked", false).checkboxradio("refresh").closest(".ui-checkbox").addClass("ui-disabled");
						}
					});
					if(!theAOL.enableFixWord) {
						$dlg.find("#autoNextFixWord").closest(".ui-checkbox").addClass("ui-disabled");
						$dlg.find("#enableFixWord4TextComment").closest(".ui-checkbox").addClass("ui-disabled");
					}
					else {
						$dlg.find("#autoNextFixWord").prop("checked", theAOL.autoNextFixWord).checkboxradio("refresh");
						$dlg.find("#enableFixWord4TextComment").prop("checked", theAOL.enableFixWord4TextComment).checkboxradio("refresh");
					}
				}
			});
		});
	});
	// 點擊 簽辦意見/錯別字校正 頁籤切換對應窗格顯示
	function onSwitchPane() {
		if(this.id == "signCmtList_tag") {
			if(!$("#leftPart #sidePanel #signCmtList_panel").is(":visible")) {
				$("#leftPart #sidePanel #signCmtList_panel").show();
				$("#leftPart #sidePanel #signCmtList_tag").addClass("ui-btn-active");
				$("#leftPart #sidePanel #fixWordList_panel").hide();
				$("#leftPart #sidePanel #fixWordList_tag").removeClass("ui-btn-active");
				
			}
		}
		else {
			if(!$("#leftPart #sidePanel #fixWordList_panel").is(":visible")) {
				$("#leftPart #sidePanel #signCmtList_panel").hide();
				$("#leftPart #sidePanel #signCmtList_tag").removeClass("ui-btn-active");
				$("#leftPart #sidePanel #fixWordList_panel").show();
				$("#leftPart #sidePanel #fixWordList_tag").addClass("ui-btn-active");
			}
		}
	}
	$("#leftPart #sidePanel #signCmtList_tag, #leftPart #sidePanel #fixWordList_tag").on("click", onSwitchPane);
	
	$('#pencilMode').prop('checked', false).checkboxradio('refresh');
	$('#pencilMode').on('click', function() {
		/* 2016.4 - Eric Peng, for FDA prototype, hidden sign controls */
		//window.disableSecondTouch = $(this).prop("checked");
		_toggleReadOnlyUI(true);
		$('#aol #pencilMode').closest('div.ui-checkbox').hide();
		$('#aol #grpSubmit #btnSave').hide();
		$('#aol #transPanel').hide();
		$('#aol #refView').hide();
	});
	
	/* 2016.5.23 toggle顯示傳送對象 */
	var showTarget = true;
	$("#aol #btnExpand").on('click', function() {
		if(showTarget == true) {
			$("#aol #chooseA").closest(".ui-select").hide();
			$("#aol #chooseB").closest(".ui-controlgroup").hide();
			showTarget = false;
			this.innerText = "«";
		}
		else {
			$("#aol #chooseA").closest(".ui-select").show();
			$("#aol #chooseB").closest(".ui-controlgroup").show();
			showTarget = true;
			this.innerText = "»";
		}
	});
	
	/* 2016.4.18 符號表開闗 */
	$("#btnToggleSymbol").on("click", function(evt) {
		var c = $home.find(".viewPort").data("editCursor");
		if(c.symbolDocked.visible())
			c.symbolDocked.hide();
		else
			c.symbolDocked.show();
		$("#popupAdvance").popup("close");
	});
	// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式不顯示手寫筆設定及自動備份設定兩選項按鈕
	if(!!theSSO && theSSO.offlineMode == true) {
		$("#btnStrokeSetting, #btnAutoBackupSetting").closest("li").remove();
	}
	else {
	/* 2016.4.18 手寫筆設定 */
	$("#btnStrokeSetting").on('click', function(evt) {
		Util.getDlg("RD-PenSetting.html").done(function($dlg) {
			
			$dlg.find("header > h1").unwrap();
			$dlg.find("footer > div").unwrap();
			// 1060721 Raymond 1060593 實作手寫筆設定功能
			var _redPenColor = "255,0,0", _hilitPenColor = "255,255,0",
				_redPenWidth = 1, _hilitPenWidth = 12,
				_hilitPenTransparency = 0.3;
			
			function saveCurrPenSetting() {
				if($dlg.find("a.ui-btn-active").length > 0) {
					var id = $dlg.find("a.ui-btn-active").get(0).id;
					if(id == "redPenSetting") {
						_redPenColor = $dlg.find("input[name='penColor']:checked").val();
						_redPenWidth = $dlg.find("input[name='penWidth']:checked").val();
						theLogger.log("儲存紅筆設定 -- color:" + _redPenColor + ", width:" + _redPenWidth);
						localStorage['pen_setting_1'] = "rgb(" + _redPenColor + ")|" + _redPenWidth;
					}
					else if(id == "hilitPenSetting") {
						_hilitPenColor = $dlg.find("input[name='penColor']:checked").val();
						_hilitPenTransparency = $dlg.find("input[name='penTransparency']:checked").val();
						_hilitPenWidth = $dlg.find("input[name='penWidth']:checked").val();
						theLogger.log("儲存螢光筆設定 -- color:" + _hilitPenColor + ", transp:" + _hilitPenTransparency + ", width:" + _hilitPenWidth);
						localStorage['pen_setting_2'] = "rgba(" + _hilitPenColor + "," + _hilitPenTransparency + ")|" + _hilitPenWidth;
					}
				}
			}
			
			$dlg.find("a#redPenSetting").on('click', function() {
				if(!$(this).hasClass("ui-btn-active")) {
					saveCurrPenSetting();
					
					// 1070607 Raymond 1060862 IE不支援radio button的CSS customize須改用label做, 這裡配合調整對象改為label
					//$dlg.find("input.line-width").eq(0).show();
					//$dlg.find("input.line-width").eq(1).show();
					//$dlg.find("input.line-width").eq(3).hide();
					//$dlg.find("input.line-width").eq(4).hide();
					$dlg.find("label.line-width").eq(0).show();
					$dlg.find("label.line-width").eq(1).show();
					$dlg.find("label.line-width").eq(3).hide();
					$dlg.find("label.line-width").eq(4).hide();
					
					$dlg.find("input.color").prop("checked", false).each(function(idx, elm) {
						if(elm.value == _redPenColor) {
							$(elm).prop("checked", true);
							return false;
						}
					});
					$dlg.find("input.line-width").prop("checked", false).each(function(idx, elm) {
						if(elm.value == _redPenWidth) {
							$(elm).prop("checked", true);
							return false;
						}
					});
					// 1070607 Raymond 1060862 IE不支援radio button的CSS customize須改用label做, 這裡配合調整對象改為label
					$dlg.find("label.transparancy").addClass("ui-disabled");
					//$dlg.find("input.transparancy").prop("checked", false).addClass("ui-disabled");
					$dlg.find("input.transparancy").prop("checked", false);
					
					$dlg.find("a").removeClass("ui-btn-active");
					$(this).addClass("ui-btn-active");
				}
			});
			
			$dlg.find("a#hilitPenSetting").on('click', function() {
				if(!$(this).hasClass("ui-btn-active")) {
					saveCurrPenSetting();
					
					// 1070607 Raymond 1060862 IE不支援radio button的CSS customize須改用label做, 這裡配合調整對象改為label
					//$dlg.find("input.line-width").eq(0).hide();
					//$dlg.find("input.line-width").eq(1).hide();
					//$dlg.find("input.line-width").eq(3).show();
					//$dlg.find("input.line-width").eq(4).show();
					$dlg.find("label.line-width").eq(0).hide();
					$dlg.find("label.line-width").eq(1).hide();
					$dlg.find("label.line-width").eq(3).show();
					$dlg.find("label.line-width").eq(4).show();
					
					$dlg.find("input.color").prop("checked", false).each(function(idx, elm) {
						if(elm.value == _hilitPenColor) {
							$(elm).prop("checked", true);
							return false;
						}
					});
					$dlg.find("input.line-width").prop("checked", false).each(function(idx, elm) {
						if(elm.value == _hilitPenWidth) {
							$(elm).prop("checked", true);
							return false;
						}
					});
					// 1070607 Raymond 1060862 IE不支援radio button的CSS customize須改用label做, 這裡配合調整對象改為label
					$dlg.find("label.transparancy").removeClass("ui-disabled");
					//$dlg.find("input.transparancy").prop("checked", false).removeClass("ui-disabled").each(function(idx, elm) {
					$dlg.find("input.transparancy").prop("checked", false).each(function(idx, elm) {
						if(elm.value == _hilitPenTransparency) {
							$(elm).prop("checked", true);
							return false;
						}
					});
					
					$dlg.find("a").removeClass("ui-btn-active");
					$(this).addClass("ui-btn-active");
				}
			});
			
			$dlg.find("a#ok").on('click', function(event) {
				// 1060721 Raymond 1060593 儲存目前編輯結果
				saveCurrPenSetting();
				
				$.modal.close();
			});
			$dlg.find("#cancel").tap(function() {
				$.modal.close();
			});
			
			var w = $home.find("#mainContent").width(),
				h = $home.find("#mainContent").height();
			theLogger.log("新增筆跡設定對話方塊, w:" + w + ",h:" + h);
			$.modal($dlg, {
				appendTo: $home.find("#mainContent"),
				overlayCss: {width: w, height: h},
				minHeight: 440,
				autoResize:true,
				onShow:function() {
					
					// 1060721 Raymond 1060593 載入記憶的紅筆及螢光筆設定
					if("pen_setting_1" in localStorage && localStorage['pen_setting_1'].length > 0) {
						var a = localStorage['pen_setting_1'].split('|');
						if(a.length > 1) {
							if(a[0].match(/rgb\([\d,]+\)/))
								_redPenColor = a[0].substring(4, a[0].length - 1);
							if(a[1].match(/[\d]+/))
								_redPenWidth = parseInt(a[1]);
						}
					}
					if("pen_setting_2" in localStorage && localStorage['pen_setting_2'].length > 0) {
						var a = localStorage['pen_setting_2'].split('|');
						if(a.length > 1) {
							if(a[0].match(/rgba\([\d.,]+\)/)) {
								var rgba = a[0].substring(5, a[0].length - 1);
								var c = rgba.lastIndexOf(',');
								_hilitPenColor = rgba.substr(0, c);
								_hilitPenTransparency = parseFloat(rgba.substr(c+1));
							}
							if(a[1].match(/[\d]+/))
								_hilitPenWidth = parseInt(a[1]);
						}
					}
					
					$dlg.trigger("create");
					
					// 1070607 Raymond 1060862 IE不支援radio button的CSS customize須改用label做, 這裡配合調整對象改為label
					// 1060721 Raymond 1060593 預設顯示紅筆設定
					//$dlg.find("input.line-width").eq(0).show();
					//$dlg.find("input.line-width").eq(1).show();
					//$dlg.find("input.line-width").eq(3).hide();
					//$dlg.find("input.line-width").eq(4).hide();
					$dlg.find("label.line-width").eq(0).show();
					$dlg.find("label.line-width").eq(1).show();
					$dlg.find("label.line-width").eq(3).hide();
					$dlg.find("label.line-width").eq(4).hide();
					$dlg.find("input.color").each(function(idx, elm) {
						if(elm.value == _redPenColor) {
							$(elm).prop("checked", true);
							return false;
						}
					});
					$dlg.find("input.line-width").each(function(idx, elm) {
						if(elm.value == _redPenWidth) {
							$(elm).prop("checked", true);
							return false;
						}
					});
					// 1070607 Raymond 1060862 IE不支援radio button的CSS customize須改用label做, 這裡配合調整對象改為label
					//$dlg.find("input.transparancy").addClass("ui-disabled");
					$dlg.find("label.transparancy").addClass("ui-disabled");
					$dlg.find("a#redPenSetting").addClass("ui-btn-active");
				}
			});
		});
		$("#popupAdvance").popup("close");
	});
	/* 2016.5.9 自動備份設定 */
	$("#btnAutoBackupSetting").on('click', function(evt) {
		Util.getDlg("RD-AutoBackupSetting.html").done(function($dlg) {
			
			$dlg.find("header > h1").unwrap();
			$dlg.find("footer > div").css("width", "50%").unwrap();
			
			$dlg.find("a#ok").on('click', function(event) {
				if($dlg.find("#enableAutoBackup").prop("checked")) {
					var v = parseInt($dlg.find("#autoBackupPeriod").val());
					if(v >= 5 && v <= 30) {
						localStorage['autoBackupSetting'] = JSON.stringify({enable: true, period: v});
						theAOL.getCurrFolio().applyAutoBackup({enable: true, period: v});
					}
					else {
						theLogger.error("設定的時間間隔超出範圍");
						alert("設定的時間間隔超出範圍");
						return;
					}
				}
				else {
					var v = parseInt($dlg.find("#autoBackupPeriod").val());
					localStorage['autoBackupSetting'] = JSON.stringify({enable: false, period: v});
					theAOL.getCurrFolio().applyAutoBackup({enable: false, period: v});
				}
				$.modal.close();
			});
			$dlg.find("#cancel").on('tap', function() {
				$.modal.close();
			});
			
			$dlg.find("#autoBackupPeriod").on('change', function() {
				if(this.value < 5) {
					this.value = 5;
					return false;
				}
				else if(this.value > 30) {
					this.value = 30;
					return false;
				}
			});
			
			if("autoBackupSetting" in localStorage && localStorage['autoBackupSetting'].length > 0) {
				var setting = JSON.parse(localStorage['autoBackupSetting']);
				$dlg.find("#enableAutoBackup").prop("checked", setting.enable);
				$dlg.find("#autoBackupPeriod").val(setting.period);
			}
			else if("autoBackupDefaultSetting" in SSO_CONFIG && SSO_CONFIG.autoBackupDefaultSetting.length > 0) {
				var par = SSO_CONFIG.autoBackupDefaultSetting.split("|");
				$dlg.find("#enableAutoBackup").prop("checked", par[0] == "Y");
				$dlg.find("#autoBackupPeriod").val(par[1]);
			}
			else {
				// 什麼都沒設就預設停用
				$dlg.find("autoBackupPeriod").val("5");
			}
			
			var w = $home.find("#mainContent").width(),
				h = $home.find("#mainContent").height();
			theLogger.log("新增自動備份設定對話方塊, w:" + w + ",h:" + h);
			$.modal($dlg, {
				appendTo: $home.find("#mainContent"),
				overlayCss: {width: w, height: h},
				containerCss: {width: "300px", height: "210px"},
				autoResize:true,
				onShow:function() {
					$dlg.trigger("create");
					$dlg.find(".ui-field-contain").css("margin", "0");
					$dlg.find(".ui-input-text").css("display", "inline-block");
				}
			});
		});
		$("#popupAdvance").popup("close");
	});
	}
	
	// 1140930 Raymond 1140818 V5再變更需求項目8, 啟用簽核工具列設定功能僅判斷機關暱稱為"TPVGH"及aolModeEx="E"
	// 1140819 Raymond 1140818 新增簽核工具列設定
	//if(SSO_CONFIG.OrgNickName == "TPVGH" && SSO_CONFIG.aolModeEx == "E" && theSSO.User.EnvSettings.get("AOL_SHOW_COMPACT_CMD") == "Y" && theSSO.offlineMode != true) {
	if(SSO_CONFIG.OrgNickName == "TPVGH" && SSO_CONFIG.aolModeEx == "E" && theSSO.offlineMode != true) {
		$("#btnCommandSetting").on("click", function() {
			Util.getDlg("RD-CommandSetting.html").done(function($dlg) {
				
				$dlg.find("header > h1").unwrap();
				$dlg.find("footer > div").unwrap();
				
				$dlg.find("#selAll-in, #selAll-out").on('click', function(evt) {
					let $tbl = (evt.target.id == "selAll-in")?$dlg.find("table").eq(0):$dlg.find("table").eq(1);
					$tbl.find("input[type='checkbox']").prop("checked", true).checkboxradio("refresh");
				});
				
				$dlg.find("#unselAll-in, #unselAll-out").on('click', function(evt) {
					let $tbl = (evt.target.id == "unselAll-in")?$dlg.find("table").eq(0):$dlg.find("table").eq(1);
					$tbl.find("input[type='checkbox']").prop("checked", false).checkboxradio("refresh");
				});
				
				$dlg.find("#revert-in, #revert-out").on('click', function(evt) {
					let $tbl = (evt.target.id == "revert-in")?$dlg.find("table").eq(0):$dlg.find("table").eq(1);
					$tbl.find("input[type='checkbox']").each((idx, inp) => {
						$(inp).prop("checked", !$(inp).prop("checked")).checkboxradio("refresh");
					});
				});
				
				$dlg.find("a#ok").on('click', function(event) {
					// 儲存目前編輯結果
					let setting = {in: {}, out: {}};
					let $chks = $dlg.find("table").eq(0).find("input[type='checkbox']");
					for(let i=0; i<12; i++) {
						if($chks.eq(i).is(":visible")) {
							if($chks.eq(i).prop("checked"))
								setting.in[$chks.eq(i).data("cmdId")] = true;
							else
								setting.in[$chks.eq(i).data("cmdId")] = false;
						}
					}
					$chks = $dlg.find("table").eq(1).find("input[type='checkbox']");
					for(let i=0; i<12; i++) {
						if($chks.eq(i).is(":visible")) {
							if($chks.eq(i).prop("checked"))
								setting.out[$chks.eq(i).data("cmdId")] = true;
							else
								setting.out[$chks.eq(i).data("cmdId")] = false;
						}
					}
					let strSetting = JSON.stringify(setting);
					theLogger.log("儲存簽核工具列設定:", strSetting);
					theSSO.User.EnvSettings["USER_SIGN_TOOL_SETTING"] = strSetting;
					if(!theSSO || theSSO.offlineMode != true)	// 離線模式不要呼叫UpdateUserEnvSet
						theWebServices.QueryDoc.UpdateUserEnvSet(theSSO.Artifact, "USER_SIGN_TOOL_SETTING", strSetting, false);
					
					$.modal.close();
				});
				$dlg.find("#cancel").tap(function() {
					$.modal.close();
				});
				
				// 1140930 Raymond 1140818 V5再變更需求項目8, 若環境變數「AOL_SHOW_COMPACT_CMD」不是"Y", 隱藏右半邊簽核區域外工具列的設定
				if(theSSO.User.EnvSettings.get("AOL_SHOW_COMPACT_CMD") != "Y") {
					$dlg.find(".ui-block-b").hide();
					$dlg.find(".ui-grid-a").removeClass("ui-grid-a").addClass("ui-grid-solo");
				}
				
				var w = $home.find("#mainContent").width(),
					h = $home.find("#mainContent").height(),
					enableEraserTape = theSSO.User.EnvSettings.get('AOL_ENABLE_ERASER_TAPE') == '1';
				theLogger.log("新增簽核工具列設定對話方塊, w:" + w + ",h:" + h);
				$.modal($dlg, {
					appendTo: $home.find("#mainContent"),
					overlayCss: {width: w, height: h},
					minHeight: enableEraserTape?545:520,	// 1140930 Raymond 1140818 微調高度
					maxWidth: (theSSO.User.EnvSettings.get("AOL_SHOW_COMPACT_CMD") != "Y")?450:600,	// 1140930 Raymond 1140818 V5再變更需求項目8, 若環境變數「AOL_SHOW_COMPACT_CMD」不是"Y", 縮減子視窗寬度
					autoResize:true,
					onShow:function() {
						if(!enableEraserTape) {	// 未啟用貼布功能
							$dlg.find("table").eq(0).find("input[type='checkbox']").eq(11).closest("tr").hide();
							$dlg.find("table").eq(1).find("input[type='checkbox']").eq(11).closest("tr").hide();
						}
						// 載入記憶的簽核工具列設定
						let strSetting = theSSO.User.EnvSettings.get("USER_SIGN_TOOL_SETTING");
						if(strSetting == "" && (!theSSO || theSSO.offlineMode != true)) {// 離線模式不要呼叫GetUserEnvSetting
							strSetting = theWebServices.QueryDoc.GetUserEnvSetting(theSSO.Artifact, "USER_SIGN_TOOL_SETTING").RtnStr;
							theSSO.User.EnvSettings["USER_SIGN_TOOL_SETTING"] = strSetting;
						}
						if(strSetting.length > 0) {
							theLogger.log("前次設定的個人簽核工具列設定:", strSetting);
							let setting = JSON.parse(strSetting);
							if(!!setting.in && !!setting.out) {
								let $chks = $dlg.find("table").eq(0).find("input[type='checkbox']").prop("checked", false);
								for(let it in setting.in) {
									if(it >= 1 && it <= 12)
										$chks.filter("[data-cmd-id='" + it + "']").prop("checked", setting.in[it]);
								}
								// 1140930 Raymond 1140818 V5再變更需求項目8, 若前次儲存時setting.out為空(ex.環境變數「AOL_SHOW_COMPACT_CMD」不是"Y"), 則忽略設定前次設定的out
								if("1" in setting.out) {
									$chks = $dlg.find("table").eq(1).find("input[type='checkbox']").prop("checked", false);
									for(let it in setting.out) {
										if(it >= 1 && it <= 12)
											$chks.filter("[data-cmd-id='" + it + "']").prop("checked", setting.out[it]);
									}
								}
							}
						}
						else
							theLogger.log("未設定過個人的簽核工具列設定, 依預設勾選項目呈現");
						
						$dlg.trigger("create");
					}
				});
			});
			$("#popupAdvance").popup("close");
		});
	}
	else
		$("#btnCommandSetting").closest("li").remove();
	
	// 1141021 Raymond 1141125 新增當機關暱稱為"TAITRA"(外貿)時, 新增「匯入調派令CSV(多人)」、「匯入晉升令CSV(多人)」及「匯入獎勵令CSV(多人)」的選單項目於工具及設定選單中的最下面
	$("#popupAdvance").on("popupafteropen", function(evt, ui) {
		if(SSO_CONFIG?.OrgNickName == "TAITRA") {
			var fm = theAOL.getCurrFolio();
			if(!!fm) {
				var $list = $(this).find("ul");
				var menuItems = [
					{id:"importTAITRACSV",	name:"匯入調派令CSV(多人)",	vis:"onImportTAITRACSVVisible",		fn:"onImportTAITRACSV",	icon:"arrow-r",	chkStat: null},
					{id:"importTAITRACSV2",	name:"匯入晉升令CSV(多人)",	vis:"onImportTAITRACSV2Visible",	fn:"onImportTAITRACSV2",icon:"arrow-r",	chkStat: null},
					{id:"importTAITRACSV3",	name:"匯入獎勵令CSV(多人)",	vis:"onImportTAITRACSV3Visible",	fn:"onImportTAITRACSV3",icon:"arrow-r",	chkStat: null}
				];
				for(var i=0; i<menuItems.length; i++) {
					$list.find("a#" + menuItems[i].id).parent().remove();	// 先清除所有額外選單項目, 不然click handler裡的fm參數只會是一開始創建的那個fm
				}
				var extraMenuAdded = false;
				for(var i=0; i<menuItems.length; i++) {
					var mi = menuItems[i];
					if(nsEditor && mi.vis in nsEditor) {
						var vis = nsEditor[mi.vis].call(this, fm);
						if(vis == true) {
							if($list.find("a#" + mi.id).length == 0) {
								var $li = $("<li><a id='" + mi.id + "'>" + mi.name + "</a></li>").appendTo($list);
								$li.find("a").on("click", {fn: mi.fn}, function(evnt) {
									if(evnt.data && "fn" in evnt.data && typeof evnt.data.fn === "string" && evnt.data.fn.length > 0
										&& nsEditor && evnt.data.fn in nsEditor) {
										var trgEvt = $.Event("click", {target: evnt.target});
										trgEvt.data = $home.find("#leftPart .viewPort");
										$("#popupAdvance").popup("close");// 關閉選單
										try {
											nsEditor[evnt.data.fn].call(this, trgEvt, fm);
										}
										catch(e) {
											theLogger.error(e.stack || e.message);
										}
									}
								});
								extraMenuAdded = true;
							}
						}
					}
				}
				if(extraMenuAdded)
					$list.listview("refresh");
			}
		}
	});
	
	/* 2016.3.25 - Raymond, 延遲載入功能取消, 所需各模組改至RD-SSO.html載入
	theModMgr.include([
		//"WebServices.js", // 2013.3 - Eric Peng, 移至RD-SSO.html include
		"Lib/RD-CacheMgr.js",		// 暫存管理
		"Lib/RD-RsrcMgr.js",		// 資源管理
		"Lib/RD-Layout.js",		// 排版引撆
		"Lib/RD-Zoom.js",			// 縮放功能
		"Lib/RD-Edit.js",			// 內文編輯相關操作
		"Lib/RD-EditSO.js",		// 簽核物件相關操作
		"Lib/RD-DraftModel.js",	// 文稿Model相關操作
		"Lib/RD-DraftMgmt.js",		// 文稿管理檔相關操作, 2013.8.29 - Raymond新增
		"Lib/RD-FolioModel.js",	// 公文夾Model相關操作
		"Lib/RD-FolioView.js",		// 公文夾View相關操作
		"Lib/RD-TCControl.js",		// 追蹤修訂Control相關操作
		"Lib/RD-NewDraft.js",		// 新增文稿功能
		"Lib/RD-SignFolder.js",	// 封裝檔相關操作, 2013.8.29 - Raymond新增
		"Lib/RD-VerifyEnve.js",	// 驗章功能
		"Lib/RD-ParseStampMgmt.js",// 章戳管理檔相關操作, 2013.8.29 - Raymond新增
		"Lib/RD-SignWork.js",		// 加簽工作檔相關操作, 2013.8.29 - Raymond新增
		"Lib/RD-ObserverPattern.js",// Observer模式相關操作, 2013.8.29 - Raymond新增
		"Lib/RD-StampAct.js",		// 連動章戳, 2013.12.5 - Raymond新增
		"Lib/RD-jquery.tokenEdit.js",// 受文者詞庫, 2014.3.6 - Raymond新增
		"Lib/RD-CompoundFolio.js",	// 併辦案子文, 2014.4.2 - Raymond新增
		"Lib/RD-CustomMgr.js",		// 客製化管理功能, 2014.4.28 - Raymond新增
		"Lib/RD-RefView.js",			// 參照檢視功能, 2014.5.19 - Raymond新增
		"Lib/MS-ODC010.js",				// 公文基資功能, 2014.09.30 - Raymond新增
		"Lib/MS-ODC010WS.js",			// 公文基資功能, 2014.10.02 - Kevin新增
		"Lib/MS-ODC010UI.js",			// 公文基資功能, 2014.11.26 - Kevin新增
		"Lib/RD-jquery.confirm.js"		// 客製化詢問訊息功能, 2015.11.4 - Raymond新增
	])
	.done(function() {
		theLogger.log("-II- theModMgr.include() done() BEGIN...");*/
		
		// 2013.4.23 - Raymond, 加入theAOL全域物件
		if(!("theAOL" in window))
			window.theAOL = {};
		
		// 1110315 Raymond 1101578 新增sessionId供附件編輯模組識別
		theAOL.sessionId = Util.genGUID();
		
		// 1140815 Raymond 1141232 修正離線模式下即使有設定錯別字校正服務網址也不要啟用錯別字校正功能
		// 1140620 Raymond 1131303 新增判斷系統參數「AOL_FIX_WORD_SERVICE」是否有設, 沒有設表示禁用錯別字校正功能
		//if(!!theSSO?.User?.SystemSets?.get("AOL_FIX_WORD_SERVICE")) {
		if(!!theSSO?.User?.SystemSets?.get("AOL_FIX_WORD_SERVICE") && theSSO.offlineMode != true) {
			theAOL.fixWordService = theSSO.User.SystemSets.get("AOL_FIX_WORD_SERVICE");
			theLogger.log("錯別字校正服務網址: " + theAOL.fixWordService);
			if("enableFixWord" in localStorage && localStorage['enableFixWord'].length > 0) {
				theAOL.enableFixWord = localStorage['enableFixWord'] == "true";
			}
			else if("fixWordDefaultSetting" in SSO_CONFIG && SSO_CONFIG.fixWordDefaultSetting.length > 0) {
				var par = SSO_CONFIG.fixWordDefaultSetting.split("|");
				theAOL.enableFixWord = par[0] == "Y";
			}
			else {	// 什麼都沒設就預設停用
				theAOL.enableFixWord = false;
			}
			if("autoNextFixWord" in localStorage && localStorage['autoNextFixWord'].length > 0) {
				theAOL.autoNextFixWord = localStorage['autoNextFixWord'] == "true";
			}
			else if("fixWordDefaultSetting" in SSO_CONFIG && SSO_CONFIG.fixWordDefaultSetting.length > 0) {
				var par = SSO_CONFIG.fixWordDefaultSetting.split("|");
				theAOL.autoNextFixWord = par[1] == "Y";
			}
			else {	// 什麼都沒設就預設停用
				theAOL.autoNextFixWord = false;
			}
			if("enableFixWord4TextComment" in localStorage && localStorage['enableFixWord4TextComment'].length > 0) {
				theAOL.enableFixWord4TextComment = localStorage['enableFixWord4TextComment'] == "true";
			}
			else if("fixWordDefaultSetting" in SSO_CONFIG && SSO_CONFIG.fixWordDefaultSetting.length > 0) {
				var par = SSO_CONFIG.fixWordDefaultSetting.split("|");
				theAOL.enableFixWord4TextComment = par[2] == "Y";
			}
			else {	// 什麼都沒設就預設停用
				theAOL.enableFixWord4TextComment = false;
			}
		}
		else {
			theAOL.enableFixWord = false;
			theAOL.autoNextFixWord = false;
			theAOL.enableFixWord4TextComment = false;
		}
		theAOL.bindSC = function() {
			var $comments = $home.find("#leftPart #sidePanel #signCmtList");
			if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
				$comments.find("textarea").errCorr({fwd: theAOL.getCurrFolio().getFixWordData(), draftGUID: theAOL.getCurrFolio().getCurrDraftInfo().guid, paraGUID: "{00000000-0000-0000-0000-000000000002}", srcNm: "簽辦意見(隨稿)"});
			}
			else
				$comments.find("textarea").errCorr({fwd: theAOL.getCurrFolio().getFixWordData(), draftGUID: "{00000000-0000-0000-0000-000000000001}", paraGUID: "{00000000-0000-0000-0000-000000000002}", srcNm: "簽辦意見"});
		}
		theAOL.unbindSC = function() {
			var $comments = $home.find("#leftPart #sidePanel #signCmtList");
			$comments.find("textarea").errCorr("destroy");
		}
		
		// 2013.4.22 - Raymond, docObj搬到前面
		// 2013.4.30 - Raymond, 再搬到theAOL下
		var sDocObj = localStorage['working_doc_obj'];
		if(sDocObj && sDocObj.length) {
			theAOL.docObj = new MPDocObj(sDocObj);
		}
		else {	// 2013.8.29 - Raymond, 若無'working_doc_obj', 填入單元測試資料
			theAOL.docObj = new MPDocObj({
							msgId: "10135512",
							docNo: "1010009998",
							fileIOWS: "http://" + theWebServices.host + "/WebFileIO/T2100FileIoService.asmx",
							fileStoragePath: "D:\\Project\\RD_Test\\Raymond",
							fileSubDir: "usr\\10135512",
							ODWMSG: {OWN_OU_ID: "011"}
							});
		}

		// 2019.7 - Eric, 效能log!
		theLogger.log('-tm- invoke checkWS.GetUserInfo BEGIN...');
		
		//theWebServices.getUserInfo(docObj.ownUserId, localStorage['Artifact'] || "777dc5b0-fafd-442b-8742-8c45649cea6f")
		// 2013.4.22 - Raymond, 實裝SSO
		// 2013.4.30 - Raymond, 新增第3個DepartID參數
		theWebServices.getUserInfo(theSSO.User.account, localStorage['Artifact'], theAOL.docObj.getODWMSG().OWN_OU_ID)
		.then(thePublicRsrc.init)
		//.then(thePrivateRsrc.init)
		//.then(theLocalFolio.init)
		//.then(theEnvSet.init)
		.then(function() {	// 2014.11.21 - Raymond, 將客製化JS移至原初始程序之前, 以確保JS已完成載入
			//if("CustomMgr" in window) {	// 2016.8.17, 2016.12.9 fix for 此判斷式似乎會誤判, 改成try-catch, 當以調閱分頁開啟AOL時, 不會含入RD-CustomMgr.js
				try {
					// 1100610 Raymond 1100659 全域物件gCustomMgr改在RD-CustomMgr.js一載入就產生, 避免重複new, 造成客製化註冊的callback不見, 發文機關選單未初始化(出現"測試機關"選項)的問題
					//1091015	Leslie[1090719]	配合客製化功能可增修於客製化JS中，調整載入客製化模組行為
					//theAOL.customMgr = new CustomMgr();	// 客製化管理物件, 2014.4.28 - Raymond新增
					//1091023	Leslie[1090719]	考慮獨立視窗模式，修改可依當前現況取得正確來源
					//let bOpenFromSSO = ('gCustomMgr' in window);
					//if(bOpenFromSSO)
					//	theAOL.customMgr = window.gCustomMgr;	// 客製化管理物件, 2014.4.28 - Raymond新增
					//else	//獨立視窗模式
					//	theAOL.customMgr = new CustomMgr();
					if('gCustomMgr' in window && !!window.gCustomMgr)
						theAOL.customMgr = window.gCustomMgr;	// 客製化管理物件, 2014.4.28 - Raymond新增
					//var activeRole = theWebServices.authws.getActiveRole(window.localStorage["Artifact"]);	// 取得目前角色的機關代碼, 2014.4.28 - Raymond新增
					//return theModMgr.include("Lib/Custom_" + activeRole.orgNo + ".js");	// 動態載入機關客製碼, 2014.4.28 - Raymond新增
					Common.activeRole = theWebServices.authws.getActiveRole(window.localStorage["Artifact"]);	// 2015.1.15 - Raymond新增, 初始化目前選取角色以供客製化功能使用
					//1091015	Leslie[1090719]	配合客製化功能可增修於客製化JS中，調整載入客製化模組行為
					//return theModMgr.include("Lib/Custom_" + theUserInfo.OrgNickName + ".js");	// 動態載入機關客製碼, 2015.1.15 - Raymond新增, 改用機關別名
					//1091023	Leslie[1090719]	考慮獨立視窗模式，修改可依當前現況取得正確來源
					//if(!bOpenFromSSO)
					//	return theModMgr.include("Lib/Custom_" + theUserInfo.OrgNickName + ".js");	// 動態載入機關客製碼, 2015.1.15 - Raymond新增, 改用機關別名
					// 1100610 Raymond 1100659 載入客製化JS改為與RD-eDoc.js一致取SSO_CONFIG.OrgNickName, 並加上獨立視窗模式可能不載入RD-CustomMgr.js及RD-ModuleMgr.js的判斷
					if(!!theAOL.customMgr && !!theModMgr)
						return theModMgr.include("Lib/Custom_" + ((!!SSO_CONFIG)?SSO_CONFIG.OrgNickName:theUserInfo.OrgNickName) + ".js");
				}
				catch(e) {
					theLogger.error("載入客製化模組失敗! " + e.message);
				}
			//}
		})
		.then(function() {
		
			//var t = theWebServices.getServerTime();
			//theLogger.log("ServerTime: " + t);
				
			// 2015.9.17 新增唯讀模式
			// 2015.10.15 改用uiState的readOnly
			//var isReadOnly;
			
			// 2013.9 - Raymond, 下載章戳資源, 2016.8.17 改至reload判定非唯讀再叫用
			//theWebServices.initStampBox();
			
			// 2014.4.23 - Raymond, 下載ActionDefine.xml, 定義在StampAct.js中, 2016.8.17 改至reload判定非唯讀再叫用
			//initActionDefine();

			// 2013.9.12 - Raymond, 新增reload方法支援開啟另一筆公文
			// 2016.8.16 新增uiParam參數, aol_readonly_mode、aol_disable_save、aol_disable_odc010改用參數傳遞
			var _uiParam = {};	// 2016.8.16
			theAOL.reload = function(uiParam) {
				_uiParam = uiParam;	// 2016.8.16
				
				// 2016.10.7 - Raymond, 修正重讀working_doc_obj提前在getUserInfo前, 否則docObj.ownOUId仍會是前一次activeRole的單位
				// 2013.9.13 - Raymond, 重開前先重置getCurrFolio方法, 回傳false表示當前狀態為尚未開啟公文或開啟失敗
				theAOL.getCurrFolio = function() {
					// TODO: 若是開啟公文失敗的情況, 應要有提供錯誤資訊的方法
					return false;
				};
				var sDocObj = localStorage['working_doc_obj'];
				if(sDocObj && sDocObj.length) {
					theAOL.docObj = new MPDocObj(sDocObj);
					// 1110422 Raymond 1110318 修正先在主頁開啟一筆線上簽核公文, 再由AKI800查詢開啟另一筆線上簽核公文並用DocView開啟後, 再於主頁開啟參照窗格但載入的是用DocView開啟的那一筆公文的問題
					theAOL.sDocObj = sDocObj;	// 記錄下目前公文的DocObj字串資料於window scope的全域物件中, 這樣不同視窗(eDoc及DocView)間就不會發生localStorage["working_doc_obj"]資料被後來開啟的公文覆蓋的問題
					// 2015.4.14 - Raymond, 登出後再登入未重取UserInfo會導致權杖失效問題
					if(theUserInfo.Artifact != localStorage['Artifact']) {
						theLogger.log("-tm- theUserInfo的權杖資訊異於Artifact, 重新取得UserInfo...");
						theWebServices.getUserInfo(theAOL.docObj.ownUserId, localStorage['Artifact'], theAOL.docObj.ownOUId)	//2017.01.12	Leslie	帳號改用ownUserId，以配合代理的操作行為(需取得被代理人的資訊)
						.then(function() {// 2015.10.7 - FIX
							/* 整合Banner: 角色選單	2016.8.11 #aol下己無Banner
							var roleIndex = $('#roleid_input').data('roleIndex');
							var roleText = $('#roleid_input').val();
							$('#roleid_input_in_aol').val(roleText)
								.data('roleIndex', roleIndex);
							_initRoleListSpinWheel('roleid_input_in_aol', true, 'bottom', function(roleIndex, roleText) {
								// 同步MP頁面中的角色選單
								theLogger.log("在AOL中切換了角色 - roleIndex:" + roleIndex + ", roleText:" + roleText);
								$('#roleid_input').val(roleText);
								$('#roleid_input').data('roleIndex', roleIndex);
								$('#roleid_input').mobiscroll('setValue', [roleIndex]);
								// 重設當前角色
								Common.activeRole = theWebServices.authws.getActiveRole(window.localStorage["Artifact"]);// 初始化目前選取角色以供客製化功能使用
							});
							// 整合Banner: 今天日期
							$('#date_info_in_aol').text($(".date_info").text());*/
							// 重設當前角色
							Common.activeRole = theWebServices.authws.getActiveRole(window.localStorage["Artifact"]);// 初始化目前選取角色以供客製化功能使用
							//return theModMgr.include("Lib/Custom_" + theUserInfo.OrgNickName + ".js");	// TODO: 客製化架構不支援動態更換機關客製碼
						})
						.then(theWebServices.initStampBox)// 2015.10.7 FIX, 重取章戳
						.then(preloadAOL)	// 2016.10.26 先叫preloadAOL初始化(下載)ODWDCM
						.then(reloadAOL);	// 改叫reloadAOL
					}
					else {	// 2016.8.11 改為一律重新getUserInfo, 因為activeRole在開啟每一筆公文前可能會變
						theLogger.log("-tm- 開啟另一筆公文前重新取得UserInfo...");
						theWebServices.getUserInfo(theAOL.docObj.ownUserId, localStorage['Artifact'], theAOL.docObj.ownOUId)	//2017.01.12	Leslie	帳號改用ownUserId，以配合代理的操作行為(需取得被代理人的資訊)
						.then(function() {// 2015.10.7 - FIX
							// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式下要用非同步取得目前角色, 及先下載MPRule_機關代碼.XML及ODRPUI.XML到LocalStorage, 因為RD-DlgProcessSetting.js的下載是同步的, 且很難改成非同步
							if(!!theSSO && theSSO.offlineMode == true) {
								// 重設當前角色
								let _dfd = $.Deferred();
								theWebServices.authws.getActiveRole(window.localStorage["Artifact"])	// 初始化目前選取角色以供客製化功能使用
								.then(function(rslt) {
									Common.activeRole = rslt;
									
									var sMenuRule = '';
									var menuRule_xn = null;
									var filename = 'MPRule_' + theUserInfo.OrgID + '.xml';
									var ls_id = 'menuRulePDoc_' + theUserInfo.OrgID;
									var wsUrl = SSO_CONFIG.getWSUrl('fileiows');
									var wfio = new WebFileIO(wsUrl, '', window.localStorage["Artifact"]);
									var serverPath = SSO_CONFIG.getRsrcServerPath('sso', theUserInfo.OrgID);
									wfio.download(serverPath, filename, {
										async : true,
										success: function(rslt, res) {
											if(rslt !== undefined) {
												menuRule_xn = rslt;
												if (menuRule_xn) {
													sMenuRule = new XMLSerializer().serializeToString(menuRule_xn);
												}
												
												if (typeof sMenuRule !== 'string') {
													sMenuRule = '';
												}
												else {
													window.localStorage[ls_id] = sMenuRule;
												}
											}
											else {
												theLogger.warn('-W- WebFileIO呼叫成功但夾檔資料未下載.');
											}
											var sODRPUI = '';
											filename = 'ODRPUI.xml'; // 2016.7 - 目前尚未區分機關
											ls_id = 'ODRPUI_' + theUserInfo.OrgID;
											serverPath = SSO_CONFIG.getRsrcServerPath('AOL\\OD');
											wfio.download(serverPath, filename, {
												async : true,
												success: function(rslt, res) {
													if(rslt !== undefined) {
														if (rslt) {
															sODRPUI = new XMLSerializer().serializeToString(rslt);
														}
														
														if (typeof sODRPUI !== 'string') {
															sODRPUI = '';
														}
														else {
															window.localStorage[ls_id] = sODRPUI;
														}
													}
													else {
														theLogger.warn('-W- WebFileIO呼叫成功但夾檔資料未下載.');
													}
													// 離線模式下事先下載匯出DI.XSL、產生交換表.XSL...等檔案, 因目前為同步呼叫很難改成非同步
													let exDI, exSW, ex99DI, ex99SW;
													if("exDI" in nsEditor && "exSW" in nsEditor) {
														// 匯出DI、SW之XSL已下載
													}
													else {
														thePublicRsrc.enumDirs("匯出設定", function(dir) {
															for(var i=0; i<dir.children.length; i++) {
																var nm = dir.children[i].name;
																if(nm == "DI")
																	exDI = dir.children[i];
																else if(nm == "交換表")
																	exSW = dir.children[i];
																else if(nm == "99匯出DI")
																	ex99DI = dir.children[i];
																else if(nm == "99產生交換表")
																	ex99SW = dir.children[i];
															}
														});
														if(!!exDI) {	// PS:XSL須轉為UTF-16, 否則二代不能使用
															var ph = exDI.remote.path;
															theLogger.log("下載'" + ph + "'...");
															theCacheMgr.get({type: "rsrc", rsrc: exDI, async: true})	// 這裡用非同步
															.done(function(xslDoc) {
																if("file" in xslDoc && xslDoc.big5XML == true) {
																	var rdr = new FileReader();
																	rdr.onload = function() {
																		nsEditor.exDI = (new DOMParser()).parseFromString(this.result, "text/xml");
																	}
																	rdr.readAsText(xslDoc.file, "Big5");
																}
																else
																nsEditor.exDI = xslDoc;
															});
														}
														if(!!exSW) {
															var ph = exSW.remote.path;
															theLogger.log("下載'" + ph + "'...");
															theCacheMgr.get({type: "rsrc", rsrc: exSW, async: true})	// 這裡用非同步
															.done(function(xslDoc) {
																nsEditor.exSW = xslDoc;
															});
														}
														if(!!ex99DI) {
															var ph = ex99DI.remote.path;
															theLogger.log("下載'" + ph + "'...");
															theCacheMgr.get({type: "rsrc", rsrc: ex99DI, async: true})	// 這裡用非同步
															.done(function(xslDoc) {
																nsEditor.ex99DI = xslDoc;
															});
														}
														if(!!ex99SW) {
															var ph = ex99SW.remote.path;
															theLogger.log("下載'" + ph + "'...");
															theCacheMgr.get({type: "rsrc", rsrc: ex99SW, async: true})	// 這裡用非同步
															.done(function(xslDoc) {
																nsEditor.ex99SW = xslDoc;
															});
														}
														theLogger.log("匯出DI.XSL -- ");
														theLogger.log(nsEditor.exDI);
														theLogger.log("產生交換表.XSL -- ");
														theLogger.log(nsEditor.exSW);
													}
													_dfd.resolve();
												},
												error: function(errorText) {
													theLogger.error('-E- getMenuRule() invoke wfio.download() failed, ErrMsg=' + errorText);
													_dfd.resolve();
												}
											});
										},
										error: function(errorText) {
											theLogger.error('-E- getMenuRule() invoke wfio.download() failed, ErrMsg=' + errorText);
											_dfd.resolve();
										}
									});
								});
								return _dfd.promise();
							}
							else	// end of 1130809 Raymond 1130313 合併1111007(1100394), 離線模式下要用非同步取得目前角色, 及先下載MPRule_機關代碼.XML及ODRPUI.XML到LocalStorage, 因為RD-DlgProcessSetting.js的下載是同步的, 且很難改成非同步
							// 重設當前角色
							Common.activeRole = theWebServices.authws.getActiveRole(window.localStorage["Artifact"]);// 初始化目前選取角色以供客製化功能使用
						})
						.then(theWebServices.initStampBox)// 2016.9.20 FIX, 重取章戳
						.then(preloadAOL)	// 2016.10.26 先叫preloadAOL初始化(下載)ODWDCM
						.then(reloadAOL);	// 改叫reloadAOL
					}
				}
				else
					theLogger.error("working_doc_obj不存在!");
			}
			
			// 2016.10.26 initODWDCM()改用deferred模式, 在reloadAOL前執行
			function preloadAOL() {
				
				var dfd = $.Deferred();

				// 2021.5 - 1100093 Eric - merge: 1081168 子文彙併辦
				let _comNo = null;
				//1131206	Leslie[1130847]	增修調閱要用到的REF_DOC
				let _refDoc = null;
				let _docNo = '';
				//1140430	Leslie	修正調閱問題
				let _draftSourceType = '';
				if (typeof theAOL.docObj.ODWDCM!=='undefined' && theAOL.docObj.ODWDCM != null && 
					Array.isArray(theAOL.docObj.ODWDCM.COM_NO) && theAOL.docObj.ODWDCM.COM_NO.length && 
					typeof _uiParam.unv_obj=='object') {
					_comNo = theAOL.docObj.ODWDCM.COM_NO;
					_docNo = theAOL.docObj.docNo;
					
					//1131206	Leslie[1130847]	增修調閱要用到的REF_DOC
					_refDoc = theAOL.docObj.ODWDCM.REF_DOC;
					//1140430	Leslie	修正調閱問題
					_draftSourceType = theAOL.docObj.ODWDCM.DRAFT_SOURCE_TYPE;
				}

				// 1091013 Raymond 1090564 調閱時, 因信保特殊模式須保留ODWDCM, 故移至if(!readOnlyMode), 再設定為null
				// 2016.7 - 每次開啟都重新載入ODWDCM.XML
				//theAOL.docObj.ODWDCM = null;
				
				var readOnlyMode = false; // 唯讀檢閱模式開啟
				if ((typeof _uiParam=='object' && _uiParam.aol_readonly_mode===true) ||
					//2016.9.19	Leslie	配合文稿可編輯不可儲存模式(AKI802&ODT351)
					(typeof _uiParam=='object' && _uiParam.aol_disable_save===true) ||
					(typeof theAOL.docObj.msgId!=='string' || theAOL.docObj.msgId.length===0)) { // 2016.9.14 - 若msgId未定義或為空字串=>檢閱模式
					readOnlyMode = true;
				}

				theAOL.docObj.resetODWWKF();
				
				//1140321	Leslie[1131289]	增加可傳送給流程有經過的人員
				if(!readOnlyMode){				
					let menuRule = SSOUtil.getMenuRule_Obj(localStorage.Artifact, theAOL.docObj.sourceOrgNo, theAOL.docObj.signType);
					let menu = menuRule.getRule(theAOL.docObj.folder, theAOL.docObj.subfolder);
					menu.txList?.forEach(function(o){
						if(['Q1','Q2'].includes(o.next))
							menuRule.resetCTarget(o.next)
					})
				}

				SSOUtil.initAOLAutoOpenSettingUI(); // 2019.8.22 - 1080654 Eric, 自動開次筆設定UI

				if (!readOnlyMode) {
					// 1091013 Raymond 1090564 調閱時, 因信保特殊模式須保留ODWDCM, 故移至if(!readOnlyMode), 再設定為null
					theAOL.docObj.ODWDCM = null;
					return theSSO.MP.todolist.builder.initODWDCM(theAOL.docObj); // 2016.10.26 initODWDCM()改用deferred模式, 需等待下載完成
				}
				else {
					// 2021.5 - 1100093 Eric - merge: 1081168 子文彙併辦, 唯讀模式須取原先已parse完的COM_NO內容!
					//1140505	Leslie[問題序81]	調閱模式已無需重建ODWDCM，直接用ViewDoc建立的即可
					/*if (Array.isArray(_comNo) && theAOL.docObj.docNo==_docNo) {
						theAOL.docObj.ODWDCM = {};
						theAOL.docObj.ODWDCM.COM_NO = _comNo;
						//1131206	Leslie[1130847]	增修調閱要用到的REF_DOC
						theAOL.docObj.ODWDCM.REF_DOC = _refDoc;
						//1140430	Leslie	修正調閱問題
						theAOL.docObj.ODWDCM.DRAFT_SOURCE_TYPE = _draftSourceType;
					}*/
					dfd.resolve();
				}
				return dfd.promise();
			}
			
			// 2016.8.11 後續載入公文的程序獨立出來
			function reloadAOL() {
				// 2018.4.12 - NCKU107284
				function _updateTopToolbar(uiState, _uiParam, loading) {
					if (typeof uiState!=='object' || uiState===null ||
					    //typeof _uiParam!=='object' || _uiParam===null ||
					    typeof theAOL.docObj!=='object' || theAOL.docObj===null) {
						// 1090220 Raymond 1081090 區分工具列相關LOG
						//theLogger.warn('-W- SSOUtil.updateAOLTopToolbar() uiState/_uiParam/theAOL.docObj 物件內容異常!');
						theLogger.warn('[1081090] SSOUtil.updateAOLTopToolbar() uiState/_uiParam/theAOL.docObj 物件內容異常!');
						return;
					}
					loading = (typeof loading=='boolean')?loading:false;

					let readOnlyMode = (typeof _uiParam=='object' && typeof _uiParam.readOnlyMode=='boolean')?_uiParam.readOnlyMode:false;

					//1110629	Leslie[1110629]	考試院UI/UX需求，修改傳送選單
					let aolReplaceSettingToWWKF = theSSO.User.EnvSettings.get("AOL_REPLACE_SETTING_TO_WWKF") == 'Y';
					let aolEnableEasyModeFolder = theSSO.User.EnvSettings.get("AOL_ENABLE_EASY_MODE_FOLDER");
					let currFolder = theAOL.docObj.ODWMSG.FOLDER+'-'+theAOL.docObj.ODWMSG.SUBFOLDER;

					// 2018.4.3 - 先全部隱藏.
					if (loading) {
						//1110629	Leslie[1110629]	考試院UI/UX需求，修改傳送選單
						$('#aol #pcTranMode').hide();
						$('#aol #pcTxEasy').hide();
						$('#btnSendBack').hide();
						
						$('#aol #pcTxList').hide();
						$('#aol #pcSubmit').hide();
						$('#aol #pcUtil').hide();
						$('#aol #moGrpUtil').hide();
						$('#aol #moSubmitPanel').hide();
						
						//1140412	Leslie[1131309]	修正傳送相關功能鍵文字錯誤
						$('#btnSendBack span').text(($('#aol #chkApprove').prop('checked')?'辦畢退回':'退承辦人'));	//回到預設值
					}

					if(uiState.readOnly) {
						$("#btnSave").addClass("ui-disabled");	// disable儲存按鈕
						$("#moBtnSave").addClass("ui-disabled");
					}
					else if(_uiParam && "aol_disable_save" in _uiParam && _uiParam.aol_disable_save == true) {	// 2016.7.5 調閱時_getUIStatus().readOnly應是false, 但不允許儲存, 2016.8.16 從localStorage改為參數
						$("#btnSave").addClass("ui-disabled");
						$("#moBtnSave").addClass("ui-disabled");
					}
					else {
						$("#btnSave").removeClass("ui-disabled");
						$("#moBtnSave").removeClass("ui-disabled");
					}

					// 2021.7 - 1100433 Eric, merge: 2017.9.11 - 1060389
					// todo: 共通版的WWKF為[設定]鈕開啟之選單項目!
					if (uiState.showWWKFButton) {
						$('#popupSetting #btnWWKF').show();
						$('#aol #moSubmitPanel #moBtnWWKF').show(); // 2017.9.29 - 新增行動簽核UI button
					}
					else {
						$('#popupSetting #btnWWKF').hide();
						$('#aol #moSubmitPanel #moBtnWWKF').hide(); // 2017.9.29 - 新增行動簽核UI button
					}
					
					// 顯示/隱藏傳送面板
					if (readOnlyMode || (uiState.hiddenSubmitPanel==true)) {
						$("#transPanel").hide();
						$("#moSubmitPanel").hide();
						if ($('#home #btnCloseR').length) {
							$('#btnCloseR').show();
						}
						else {
							$('#btnCloseR').hide(); // @獨立分頁, 隱藏關閉button
						}
						//2016.11.11	Leslie	唯讀模式(或AKI802文稿編輯)下，不顯示#moGrpUtil 面板
						$('#moGrpUtil').hide();
						return;
					}
					else {
						if(uiState.mobileDevice && theAOL.docObj.signType=='E') {
							$("#moSubmitPanel").show();
						}
						else {
							$("#transPanel").show();
						}
						
						// 2021.7 - 1100433 Eric, merge: 1060389, 紙本公文可設定預排流程!
						if (theAOL.docObj.signType=='P') {
							$('#btnPopupSetting').hide(); // 紙本公文, 不顯示設定button
							
							// 1130809 Raymond 1130313 合併1111007, 離線模式下不要顯示流程設定按鈕
							//if (uiState.showWWKFButton===true) {
							if (uiState.showWWKFButton===true && (!theSSO || theSSO.offlineMode != true)) {
								$('#btnWWKF_PDoc').show(); // 紙本公文, 顯示WWFK_PDoc設定button
							}
							else {
								$('#btnWWKF_PDoc').hide(); // 紙本公文, 不顯示WWFK_PDoc設定button
							}
						}
						else if (theAOL.docObj.signType=='E') {
							//1110629	Leslie[1110629]	考試院UI/UX需求，修改傳送選單
							if(aolReplaceSettingToWWKF){
								$('#btnPopupSetting').hide();
								$('#btnWWKFSetting').show();
								
								//1130514	Leslie[中榮序106]	公文製作頁面功能選單，位置調整需求
								$('#popupAdvance #btnWWKFSet2').show();
								$('#popupAdvance #btnFlowSet2').show();
								$("#moBtnSignCmtPanel").closest("li").show();
							}
							else{
								$('#btnPopupSetting').show();
								
								//1130514	Leslie[中榮序106]	公文製作頁面功能選單，位置調整需求
								$('#popupAdvance #btnWWKFSet2').hide();
								$('#popupAdvance #btnFlowSet2').hide();
								$("#moBtnSignCmtPanel").closest("li").hide();
							}
							$('#btnWWKF_PDoc').hide(); // 不顯示WWFK_PDoc設定button
						}
						
						$('#btnCloseR').hide();
						
						// enable/disable 核決/剔退 button
						$('div#transPanel #chkApprove').prop('disabled', uiState.enableApproveBtn?false:true).checkboxradio('refresh');
						$('div#transPanel input#chkReject').closest('div.ui-checkbox').css('visibility', uiState.showRejectBtn?'visible':'hidden');
						
						$('div#moSubmitPanel #moChkApprove').prop('disabled', uiState.enableApproveBtn?false:true).checkboxradio('refresh');
						$('div#moSubmitPanel input#moChkReject').closest('div.ui-checkbox').css('visibility', uiState.showRejectBtn?'visible':'hidden');
						
						// 2016.10.4 - 唯讀時不可剔退
						if (uiState.readOnly) {
							$('div#transPanel #chkReject').prop('disabled', true).checkboxradio('refresh');
							$('div#moSubmitPanel #moChkReject').prop('disabled', true).checkboxradio('refresh');
						}
						else if (uiState.showRejectBtn) {
							$('div#transPanel #chkReject').prop('disabled', uiState.enableApproveBtn?false:true).checkboxradio('refresh');
							$('div#moSubmitPanel #moChkReject').prop('disabled', uiState.enableApproveBtn?false:true).checkboxradio('refresh');
						}
						
						/* 2016.7 - support 紙本公文 */
						if (!uiState.showApproveBtn) {
							$('div#transPanel #chkApprove').parent().hide();
							$('div#moSubmitPanel #moChkApprove').parent().hide();
						}
						else {
							$('div#transPanel #chkApprove').parent().show();
							$('div#moSubmitPanel #moChkApprove').parent().show();
						}
						
						if (!uiState.showRejectBtn) {
							$('div#transPanel #chkReject').parent().hide();
							$('div#moSubmitPanel #moChkReject').parent().hide();
						}
						else {
							$('div#transPanel #chkReject').parent().show(); // 2016.9.19 - Eric, bug-fix
							$('div#moSubmitPanel #moChkReject').parent().show();
						}
					}
					
					// enable/disable approve btn
					if (uiState.enableApproveBtn==true) {
						$("#aol #chkApprove").removeClass("ui-disabled");	// enable儲存按鈕
						$("#aol #moChkApprove").removeClass("ui-disabled");
					}
					else {
						$("#aol #chkApprove").addClass("ui-disabled");	// disable儲存按鈕
						$("#aol #moChkApprove").addClass("ui-disabled");
					}
					
					// 紙本公文隱藏[設定]button
					if (theAOL.docObj.signType=='P') {
						$('#aol #btnPopupSetting').hide();

						// 2022.6.24 - 1110180 Eric
						if (uiState.mobileDevice || window.forceUIMode=="MOBILE") {
							$('#aol #moBtnFlowSet').hide();
							$('#aol #moBtnRefDocSet').hide();
						}
						// 1130809 Raymond 1130313 合併1111007, 離線模式下隱藏參考公文設定鈕
						if(!!theSSO && theSSO.offlineMode == true)
							$('#popupAdvance #btnRefDocSet').hide();
					}
					// 2017.10.13 - 1060748, [流程設定]按鈕由[傳送對象設定子視窗]取出至[設定]選單
					else {
						if (uiState.showWWKFButton) {
							$('#popupSetting #btnWWKF').show();
						}
						else {
							$('#popupSetting #btnWWKF').hide();
						}

						// 2021.6 - 1080761 Eric, merge: 2018.5.14 - 1070298 參考公文設定
						if (typeof uiState.showRefDocButton=='boolean' && uiState.showRefDocButton) {
							// 1110711 Raymond 1110728 參考公文設定鈕從「設定」鈕選單搬到「齒輪」鈕選單
							//$('#popupSetting #btnRefDocSet').show();
							$('#popupAdvance #btnRefDocSet').show();
						}
						else {
							// 1110711 Raymond 1110728 參考公文設定鈕從「設定」鈕選單搬到「齒輪」鈕選單
							//$('#popupSetting #btnRefDocSet').hide();
							$('#popupAdvance #btnRefDocSet').hide();
						}
					}

					if (loading) {
						let $pcTxList = $('#aol #pcTxList');
						let $pcUtil = $('#aol #pcUtil');
						let $moGrpUtil = $('#aol #moGrpUtil');
						if (uiState.mobileDeviceUI && theAOL.docObj.signType=='E') {
							$moGrpUtil.css({'display':'inline-block'}).show();
							$('#aol #moSubmitPanel').css({'display':'inline-block'}).show();
						}
						else {
							$pcTxList.css({'display':'inline-block'}).show();
							$pcUtil.css({'display':'inline-block'}).show();
						}
						
						// 完成公文內容載入前, 隱藏上方工具列控制項
						// => #pcTxList不隱藏, 會影像內容初始化, 改隱藏其下的select elements.
						if ($pcTxList.length && $pcTxList.is(':visible')) {
							$pcTxList.find('.ui-select').css({'visibility':'hidden'}); // hide();
						}
						$('#aol #pcSubmit').css({'visibility':'hidden'}); // hide();
						if ($pcUtil.is(':visible')) {
							$pcUtil.find('#btnSave').css({'visibility':'hidden'}); // hide();
							$pcUtil.find('#btnPopupSetting').css({'visibility':'hidden'}); // hide();
							
							//1110629	Leslie[1110629]	考試院UI/UX需求，修改傳送選單
							$pcUtil.find('#btnWWKFSetting').css({'visibility':'hidden'});
						}
						
						if ($moGrpUtil.is(':visible')) {
							$moGrpUtil.find('#moBtnSave').css({'visibility':'hidden'}); // hide();
							$moGrpUtil.find('#moBtnFlowSet').css({'visibility':'hidden'}); // hide();
							$moGrpUtil.find('#moBtnRefDocSet').css({'visibility':'hidden'});; // 2021.6 - 1080761 Eric, merge: 2018.5.15 - 1070298
						}
						$('#aol #moSubmitPanel').hide();
					}
					else {
						// 2022.6.20 - 1110180 Eric, 高大行動簽核紙本簽核公文UI問題.
						let supportPDoc = false;
						if (SSO_CONFIG.OrgNickName=='NUK' || ('dev_mobileUI' in localStorage && SSOUtil.isValueTrue(localStorage.dev_mobileUI))) {
							supportPDoc = true;
						}

						// 2016.10.24 - show/hide上方工具列控制項
						if (uiState.mobileDeviceUI && ((theAOL.docObj.signType=='P' && supportPDoc) || theAOL.docObj.signType=='E')) {
							$('#aol #pcTxList').hide();
							$('#aol #pcSubmit').hide();
							$('#aol #pcUtil').hide();
							$('#aol #moGrpUtil').css({'display':'inline-block'}).show();
							$('#aol #moSubmitPanel').css({'display':'inline-block'}).show();
							$('#aol #moGrpUtil #moBtnFlowSet').css({'visibility':'visible'});
							$('#aol #moGrpUtil #moBtnRefDocSet').css({'visibility':'visible'}); // 2021.6 - 1088761 Eric, merge: 2018.5.15 - 1070298
							$('#aol #moGrpUtil #moBtnSave').css({'visibility':'visible'});
							// 1090224 Raymond 1081090 檢查因子文而將儲存按鈕hide, 恢復show
							if($('#aol #moGrpUtil #moBtnSave').css("display") == "none")
								$('#aol #moGrpUtil #moBtnSave').css("display", "");
						}
						else {
							let $pcTxList = $('#aol #pcTxList');
							
							//1110629	Leslie[1110629]	考試院UI/UX需求，修改傳送選單
							if(aolEnableEasyModeFolder.indexOf(currFolder) > -1 && currFolder != ''){
								$('#pcTranMode').css({'display':'inline-block'}).show();
								$('#pcTxEasy').css({'display':'inline-block'}).show();
							}
							else
							$pcTxList.css({'display':'inline-block'}).show();
							// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式下隱藏傳送對象及傳送鈕
							if(!!theSSO && theSSO.offlineMode == true) {
								$pcTxList.hide();
								$('#aol #pcSubmit').hide();
								$('#aol #tcControl1').hide();	// 隱藏追蹤修訂模式選單
							}
							else
							$('#aol #pcSubmit').css({'display':'inline-block'}).show();
							$('#aol #pcUtil').css({'display':'inline-block'}).show();

							// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式下隱藏傳送對象及傳送鈕
							if(!!theSSO && theSSO.offlineMode == true) {
							}
							else {
							// 2018.4.2 - NCKU107284, show controls
							$pcTxList.find('.ui-select').css({'visibility':'visible'});
							$('#aol #pcSubmit').css({'visibility':'visible'});
							}
							$('#aol #pcUtil #btnSave').css({'visibility':'visible'});
							// 1090224 Raymond 1081090 檢查因子文而將儲存按鈕hide, 恢復show
							if($('#aol #pcUtil #btnSave').css("display") == "none")
								$('#aol #pcUtil #btnSave').css("display", "");
							//1110629	Leslie[1110629]	考試院UI/UX需求，修改傳送選單
							if(aolReplaceSettingToWWKF)
								$('#aol #pcUtil #btnWWKFSetting').css({'visibility':'visible'});
							else
							$('#aol #pcUtil #btnPopupSetting').css({'visibility':'visible'});
						
							//1110629	Leslie[1110629]	考試院UI/UX需求，修改傳送選單
							if($('#swTranMode').is(':visible')){
								if($('#swTranMode').val() == 'on'){
									//1131008	Leslie[1130987]	取得使用者環境變數設定，是否啟用放大版的簽核功能鍵UI
									// $('#pcTxList').hide();
									$('#pcTxList').hide().addClass('hide')
									$('#pcTxEasy').show();
								}else{
									//1131008	Leslie[1130987]	取得使用者環境變數設定，是否啟用放大版的簽核功能鍵UI
									// $('#pcTxList').show();
									$('#pcTxList').show().removeClass('hide');
									$('#pcTxEasy').hide();
								}
							}
							
							//1131008	Leslie[1130987]	取得使用者環境變數設定，是否啟用放大版的簽核功能鍵UI
							if(theSSO.User.EnvSettings.get("AOL_ENABLE_BTN_HIGHMODE") == "Y"){
								$('#aol #leftPart .ui-header.ui-bar-a').addClass('highMode');
								//1131112	Leslie[序256]	當目前公文只有來文沒有文稿時，計算標的需換成頁籤
								var calcByTag = !$('.pages #pgFrontFace div[name="rightRegion"]').length
								// var signAreaWidth = $('.pages #pgFrontFace div[name="rightRegion"]').get(0).getBoundingClientRect().left  -  $('#leftPart')[0].getBoundingClientRect().left - 150;
								var calcLeft = calcByTag?$('#leftPart .viewPort>.tags').get(0).getBoundingClientRect().left - 90:$('.pages #pgFrontFace div[name="rightRegion"]').get(0).getBoundingClientRect().left 
								var signAreaWidth = calcLeft  -  $('#leftPart')[0].getBoundingClientRect().left - 150;
								$('#aol #leftPart .ui-header.ui-bar-a.highMode #transPanel').css('left',signAreaWidth)
							}
							else{
								$('#aol #leftPart .ui-header.ui-bar-a.highMode #transPanel').css('left','')
								$('#aol #leftPart .ui-header.ui-bar-a').removeClass('highMode');
							}

							$('#aol #moGrpUtil').hide();
							$('#aol #moSubmitPanel').hide();
						}
						//1130916	Leslie[1130864]	[北榮]修改預排流程功能鍵UI邏輯，當流程設定為不啟用時，直接將按鍵隱藏
						if(!SSOUtil.showWorkFlowSetupBtn())
							$('#btnWWKF, #aol #pcUtil #btnWWKF_PDoc, #aol #moSubmitPanel #moBtnWWKF, #btnWWKFSetting, #btnWWKFSet2').hide();
					}
					/* End of AOL top Toolbar initialize */
				}
				if (typeof SSOUtil=='object' && typeof SSOUtil.updateAOLTopToolbar=='undefined') {
					SSOUtil.updateAOLTopToolbar = _updateTopToolbar;
				}
				
				// 1130809 Raymond 1130313 合併1111007(1100394), 檢查側屜若開啟中則關閉
				if($('#newDocWorkspace').hasClass('doc_desktop_sidepage')) {
					$('#newDocWorkspace .dragControlPane .drag_to_close').trigger('click');
				}

				// 2013.4.23 - Raymond, 設定當前公文為theAOL全域物件的currFolio屬性
				//theAOL.currFolio = new FolioModel();	// 2013.9.13 - Raymond, 不可以直接用物件, 改成用方法取得當前公文物件, 否則會有變數保留物件Reference問題
				// 2013.9.13 - Raymond, 重開前先重置getCurrFolio方法, 回傳false表示當前狀態為尚未開啟公文或開啟失敗
				// 2016.10.7 - Raymond, 搬到reload()
				//theAOL.getCurrFolio = function() {
					// TODO: 若是開啟公文失敗的情況, 應要有提供錯誤資訊的方法
				//	return false;
				//};
			
				/* 2014.11.26 - Raymond, 整合Banner: 同步角色選單
				var roleIndex = $('#roleid_input').data('roleIndex');
				var roleText = $('#roleid_input').val();
				$('#roleid_input_in_aol').val(roleText);
				$('#roleid_input_in_aol').data('roleIndex', roleIndex);
				$('#roleid_input_in_aol').mobiscroll('setValue', [roleIndex]);*/
			
				// 2019.7 - Eric Peng, performance log
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- reloadAOL() BEGIN...');
					window.tmBeginReloadAOL = Date.now();
				}
				
				// 1100819 Raymond 1100431 載入公文時通知搜尋面板重置
				if(!!nsEditor && "searchPanel" in nsEditor)
					nsEditor.searchPanel("reload");

				// 2013.2.23 - Eric Peng, 在此處設定載入公文文號
				//f1.init("1000001001", {
				// 2013.4.22 - Raymond, 實裝ODWMSG
				// 2013.4.30 - Raymond, ODWMSG搬到theAOL下
				// 2013.9.13 - Raymond, 重複開啟公文時, 新增Model物件直接初始化, 成功後用getCurrFolio方法指向新增的Model物件
				//theAOL.currFolio.init(theAOL.docObj, {
				// 2016.10.7 - Raymond, 搬到reload()
				//var sDocObj = localStorage['working_doc_obj'];
				var odwdcm = null, comNo = null;
				// 2016.10.7 - Raymond, 搬到reload()
				//if(sDocObj && sDocObj.length) {
				//	theAOL.docObj = new MPDocObj(sDocObj);
					
					// 2016.7 - 每次開啟都重新載入ODWDCM.XML
					// 2016.10.26 移至前面改用deferred模式
					//theAOL.docObj.ODWDCM = null;
					
					var readOnlyMode = false; // 唯讀檢閱模式開啟
					if ((typeof _uiParam=='object' && _uiParam.aol_readonly_mode===true) ||
						//2016.9.19	Leslie	配合文稿可編輯不可儲存模式(AKI802&ODT351)
						(typeof _uiParam=='object' && _uiParam.aol_disable_save===true) ||
						(typeof theAOL.docObj.msgId!=='string' || theAOL.docObj.msgId.length===0)) { // 2016.9.14 - 若msgId未定義或為空字串=>檢閱模式
						readOnlyMode = true;
					}
					
					/* 2016.10.26 移至前面改用deferred模式
					theAOL.docObj.resetODWWKF();
					if (!readOnlyMode) {
						if (!theSSO.MP.todolist.builder.initODWDCM(theAOL.docObj)) { // 2016.10.12 - Eric Peng, iPad開啟公文異常問題
							theLogger.error('ERROR! invoke tdlBuilder.initODWDCM() failed.');
							return false;
						}
					}*/
					
					if (readOnlyMode) {
						$('#aol #chkApprove').hide();
						$('#aol #chkReject').hide();
						
						$('#aol #moChkApprove').hide();
						$('#aol #moChkReject').hide();
					}
					else if (theAOL.docObj.signType=='E') {
						// [核決]/[剔退]checkbox先還原到未勾選
						$('#aol #chkApprove').prop('checked', false).checkboxradio('refresh');
						$('#aol #chkReject').prop('checked', false).checkboxradio('refresh');
						
						$('#aol #moChkApprove').prop('checked', false).checkboxradio('refresh');
						$('#aol #moChkReject').prop('checked', false).checkboxradio('refresh');
						
						
						// 初始化[核決]/[剔退]checkbox
						var approved = (theAOL.docObj.get('', 'APP_USER_ID').length || theAOL.docObj.get('', 'APP_ROLE_ID').length) ? true : false;
						var rejected = theAOL.docObj.get('', 'REJECT_USER_NAME').length ? true : false;
						if (approved) {
							$('#aol #chkApprove').prop('checked', true).checkboxradio('refresh');
							$('#aol #moChkApprove').prop('checked', true).checkboxradio('refresh');
						}
						else if (rejected) {
							$('#aol #chkReject').prop('checked', true).checkboxradio('refresh');
							$('#aol #moChkReject').prop('checked', true).checkboxradio('refresh');
						}
					}
					
					// 2015.10.15 - Eric, 參照PC版實作, 重設UI狀態, 2016.8.17 新增_uiParam參數
					theAOL.docObj.uiParam = $.extend({'readOnlyMode': readOnlyMode}, _uiParam); // 2016.
					
					var uiState = _getUIStatus(theAOL.docObj, _uiParam);
					
					// 2018.4.12 - NCKU107284, Eric Peng
					theAOL.docObj.uiState = uiState; 
					_updateTopToolbar(uiState, _uiParam, true);

					//1140923	Leslie[1140848]	開啟可核決公文時先記錄預排流程的傳送對象，供取消核決時設定之用
					if (uiState.readOnly==false && uiState.enableApproveBtn) {
						var fRealApproved = (theAOL.docObj.get('', 'APP_USER_ID').length || theAOL.docObj.get('', 'APP_ROLE_ID').length) ? true : false;
						if (!fRealApproved) {
							let wwkfNext = theAOL.docObj.getWWKFNext();
							if (wwkfNext===null || wwkfNext.txMsgId!==theAOL.docObj.msgId) {
								wwkfNext = {
									txMsgId: theAOL.docObj.msgId,
									txName: theAOL.docObj.txName,
									toOUId: theAOL.docObj.toOUId,
									toRoleId: theAOL.docObj.toRoleId,
									toUserId: theAOL.docObj.toUserId
								};
								theAOL.docObj.setWWKFNext(wwkfNext);
							}
						}
					}

					/* 2018.4.11 - NCKU107284, 以下作業移到_updateTopToolbar()函式 */
					/*
					// 2016.10.24 - show/hide上方工具列控制項
					if (uiState.mobileDeviceUI && theAOL.docObj.signType=='E') {
						$('#aol #pcTxList').hide();
						$('#aol #pcSubmit').hide();
						$('#aol #pcUtil').hide();
						$('#aol #moGrpUtil').show();
						$('#aol #moSubmitPanel').show();
					}
					else {
						$('#aol #pcTxList').show();
						$('#aol #pcSubmit').show();
						$('#aol #pcUtil').show();
						$('#aol #moGrpUtil').hide();
						$('#aol #moSubmitPanel').hide();
					}
					
					if(uiState.readOnly) {
						$("#btnSave").addClass("ui-disabled");	// disable儲存按鈕
						$("#moBtnSave").addClass("ui-disabled");
					}
					else if(_uiParam && "aol_disable_save" in _uiParam && _uiParam.aol_disable_save == true) {	// 2016.7.5 調閱時_getUIStatus().readOnly應是false, 但不允許儲存, 2016.8.16 從localStorage改為參數
						$("#btnSave").addClass("ui-disabled");
						$("#moBtnSave").addClass("ui-disabled");
					}
					else {
						$("#btnSave").removeClass("ui-disabled");
						$("#moBtnSave").removeClass("ui-disabled");
					}
					
					// 顯示/隱藏傳送面板
					if (readOnlyMode || (uiState.hiddenSubmitPanel==true)) {
						$("#transPanel").hide();
						$("#moSubmitPanel").hide();
						if ($('#home #btnCloseR').length) {
							$('#btnCloseR').show();
						}
						else {
							$('#btnCloseR').hide(); // @獨立分頁, 隱藏關閉button
						}
						//2016.11.11	Leslie	唯讀模式(或AKI802文稿編輯)下，不顯示#moGrpUtil 面板
						$('#moGrpUtil').hide();
					}
					else {
						if(uiState.mobileDevice && theAOL.docObj.signType=='E') {
							$("#moSubmitPanel").show();
						}
						else {
							$("#transPanel").show();
						}
						
						// $("#transPanel > div").show(); // 2016.10 - Eric Peng, 
						
						if (theAOL.docObj.signType=='P') {
							$('#btnPopupSetting').hide(); // 紙本公文不顯示設定button
						}
						else if (theAOL.docObj.signType=='E') {
							$('#btnPopupSetting').show();
						}
						
						$('#btnCloseR').hide();
						
						// enable/disable 核決/剔退 button
						$('div#transPanel #chkApprove').prop('disabled', uiState.enableApproveBtn?false:true).checkboxradio('refresh');
						$('div#transPanel input#chkReject').closest('div.ui-checkbox').css('visibility', uiState.showRejectBtn?'visible':'hidden');
						
						$('div#moSubmitPanel #moChkApprove').prop('disabled', uiState.enableApproveBtn?false:true).checkboxradio('refresh');
						$('div#moSubmitPanel input#moChkReject').closest('div.ui-checkbox').css('visibility', uiState.showRejectBtn?'visible':'hidden');
						
						// 2016.10.4 - 唯讀時不可剔退
						if (uiState.readOnly) {
							$('div#transPanel #chkReject').prop('disabled', true).checkboxradio('refresh');
							$('div#moSubmitPanel #moChkReject').prop('disabled', true).checkboxradio('refresh');
						}
						else if (uiState.showRejectBtn) {
							$('div#transPanel #chkReject').prop('disabled', uiState.enableApproveBtn?false:true).checkboxradio('refresh');
							$('div#moSubmitPanel #moChkReject').prop('disabled', uiState.enableApproveBtn?false:true).checkboxradio('refresh');
						}
						
						// 2016.7 - support 紙本公文 
						if (!uiState.showApproveBtn) {
							$('div#transPanel #chkApprove').parent().hide();
							$('div#moSubmitPanel #moChkApprove').parent().hide();
						}
						else {
							$('div#transPanel #chkApprove').parent().show();
							$('div#moSubmitPanel #moChkApprove').parent().show();
						}
						
						if (!uiState.showRejectBtn) {
							$('div#transPanel #chkReject').parent().hide();
							$('div#moSubmitPanel #moChkReject').parent().hide();
						}
						else {
							$('div#transPanel #chkReject').parent().show(); // 2016.9.19 - Eric, bug-fix
							$('div#moSubmitPanel #moChkReject').parent().show();
						}
						
						// 2016.7 - 改變創稿側桌title
						//theSSO.MP.changeNewDocSidePaneTitle(true);
						
						// 2016.8 - 搬移Submit UI初始化作業至此(原在FolioModule.init.success callback)
						/*if (theAOL.docObj.signType=='E') {
							SSOUtil.hideSubmitUI(false);
							SSOUtil.getCurrentTransTarget(theAOL.nextTarget, theAOL.docObj);
							if (theAOL.nextTarget.TxName.length==0 ||
								(theAOL.nextTarget.TxName.length>0 && theAOL.nextTarget.UserId.length==0)) {
								SSOUtil.updateTransTarget(approved, rejected, theAOL.docObj, theAOL.nextTarget);
							}
							else {
								SSOUtil.changeTransTarget(theAOL.nextTarget, theAOL.docObj);
							}
						}
						else if (theAOL.docObj.signType=='P') {
							var SAMLart = localStorage.Artifact;
							var menuRule = SSOUtil.getMenuRule_Obj(SAMLart, theAOL.docObj.sourceOrgNo, theAOL.docObj.signType);
							var rule = null;
							if (menuRule) {
								rule = menuRule.getRule(theAOL.docObj.folder, theAOL.docObj.subfolder);
								if (!!rule && rule.txList!==null && rule.txList.length) {
									SSOUtil.hideSubmitUI(false);
									SSOUtil.getCurrentTransTarget(theAOL.nextTarget, theAOL.docObj);
									if (theAOL.nextTarget.TxName.length==0 ||
										(theAOL.nextTarget.TxName.length>0 && theAOL.nextTarget.UserId.length==0)) {
										if (typeof SSOUtil.updateTransTarget_PDoc !== 'undefined') {
											SSOUtil.updateTransTarget_PDoc(approved, rejected, theAOL.docObj, theAOL.nextTarget);
										}
									}
									else {
										SSOUtil.changeTransTarget(theAOL.nextTarget, theAOL.docObj);
									}
								}
							}
							
							if (typeof rule=='undefined' || rule===null || rule.txList===null || rule.txList.length===0) {
								// folder-subfolder沒有對應的Rule, 隱藏傳送UI
								SSOUtil.hideSubmitUI(true);
							}
						}
					}
					
					// enable/disable approve btn
					if (uiState.enableApproveBtn==true) {
						$("#aol #chkApprove").removeClass("ui-disabled");	// enable儲存按鈕
						$("#aol #moChkApprove").removeClass("ui-disabled");
					}
					else {
						$("#aol #chkApprove").addClass("ui-disabled");	// disable儲存按鈕
						$("#aol #moChkApprove").addClass("ui-disabled");
					}
					
					// 紙本公文隱藏[設定]button
					if (theAOL.docObj.signType=='P') {
						$('#aol #btnPopupSetting').hide();
					}
					// 2017.10.18 - 1060748, [流程設定]按鈕由[傳送對象設定子視窗]取出至[設定]選單
					else {
						if (uiState.showWWKFButton) {
							$('#popupSetting #btnWWKF').show();
						}
						else {
							$('#popupSetting #btnWWKF').hide();
						}
					}*/
					/* End of AOL top Toolbar initialize */
					
					var bDisplayFromOrg = false;
					//1111124	Leslie[1110920]	新增可設定顯示併案的來文機關
					if(theCustom.getCustomSet('DocTagWithFromOrgName') == 'Y'){
						bDisplayFromOrg = true;
						$("#aol #sidebar").addClass('Tag_FromOrg');
						$("#aol #iso").addClass('Tag_FromOrg');
					}else{
						$("#aol #sidebar").removeClass('Tag_FromOrg');
						$("#aol #iso").removeClass('Tag_FromOrg');
					}
					
					// 2014.4.1 - Raymond, 刪除前一筆文的子文標籤
					if($("#aol #tabbar > ul > li").length > 1)
						$("#aol #tabbar > ul > li:not(:first)").remove();
					// 2014.3.28 - Raymond, 若有子文則展開在左側邊欄的公文夾頁籤
					odwdcm = theAOL.docObj.getODWDCM();
					if(odwdcm && "COM_NO" in odwdcm) {	// 2016.9.1 FIX, 檢索公文不會有ODWDCM
						comNo = theAOL.docObj.get('ODWDCM', 'COM_NO');
						theLogger.log(Object.prototype.toString.call(comNo));
						if(Object.prototype.toString.call(comNo) === "[object Array]") {
							$.each(comNo, function(i, comDoc) {
								var docNo = theAOL.docObj.get('ODWMSG', 'DOC_NO');
								if(comDoc.COM_DOC_NO == docNo) {
									// 這筆是母文, bypass
									return;
								}
								// 1110829 Raymond 1110725 COM_COMBINE_TYPE非"1"為"併陳"
								//var title = "[併辦]";
								var title = "[併陳]";
								// 1060425 Raymond 1060285 修改comNo->comDoc, 併案->併陳
								//if(comNo.COM_COMBINE_TYPE == "3")
								//	title = "[併案]";
								// 1110829 Raymond 1110725 COM_COMBINE_TYPE為"1"為"併辦"
								//if(comDoc.COM_COMBINE_TYPE == "3")
								//	title = "[併陳]";
								if(comDoc.COM_COMBINE_TYPE == "1")
									title = "[併辦]";
								title += comDoc.COM_DOC_NO;
								
								//1111124	Leslie[1110920]	新增可設定顯示併案的來文機關
								if(bDisplayFromOrg && comDoc.FROMORG_NAME != '' && typeof comDoc.FROMORG_NAME == 'string')
									title += '<br>' + comDoc.FROMORG_NAME;
								
								var $ti = $("<li class='ui-block-a'><a></a></li>").appendTo("#aol #tabbar > ul");
								$ti.find("a")
									.attr({href: "folio_" + comDoc.COM_DOC_NO,
										"data-docno": comDoc.COM_DOC_NO,
										"data-signtype": comDoc.SIGN_TYPE,	// 2016.8.31 子文的SignType記錄在COM_NO, 用GetDocumentInfo取不到, 所以改成用屬性記錄方式傳給CompoundFolio
										"data-combinetype": comDoc.COM_COMBINE_TYPE})	// 1100901 Raymond 1100750 子文的CombineType記錄在COM_NO, 用GetDocumentInfo2取不到, 所以改成用屬性記錄方式傳給CompoundFolio
									//1111124	Leslie[1110920]	新增可設定顯示併案的來文機關
									// .text(title)
									.html(title)
									.buttonMarkup({
										corners: false,
										shadow: false,
										theme: 'c'
									})
									.removeClass('ui-link')
									.on("click tap", function(event) {
										$(this).closest("ul").find("a").removeClass("ui-btn-active");
										$(this).addClass("ui-btn-active");
										// 1060425 Raymond 修正從母文切到子文時, 應該要判斷母文是否可編輯, 若可編輯則先重新排版以更新編輯結果
										if(theAOL.getCurrFolio() && theAOL.getCurrFolio().enableEdit()) {
											var dm = theAOL.getCurrFolio().getCurrDraftModel();
											if(!!dm && dm.dirty() && "updateView" in dm) {
												dm.updateView();
											}
										}
										var model = $(this).data("model");
										if(typeof model !== "undefined") {
											// 1130503 Raymond 中榮序96 新增判斷機關暱稱為TVGH(中榮)時, 啟用「機案功能」按鈕, 原本的文號頁籤不顯示選單
											if(SSO_CONFIG.OrgNickName == "TVGH")
												model.refresh();
											else
											// 1061023 Raymond 1060282 新增傳入screen, list, listbox, holding參數, 供點擊子文時顯示列印選單
											//model.refresh();
											model.refresh($home.find("#leftPart .viewPort"), this, screen, list, listbox, holding, closeMenu);
											// 1060425 Raymond 1060276 重設該子文的UI狀態
											resetUI(model, "restore");
										}
										else {
											var docNo = $(this).attr("data-docno");
											var signType = $(this).attr("data-signtype");
											var combineType = $(this).attr("data-combinetype");	// 1100901 Raymond 1100750 取得原本記錄在COM_NO中的子文COMBINE_TYPE
											if(docNo.length > 0) {
												SSOUtil.loading("show", {text: "查詢子文..."});
												var thisElem = this;
												// 1100901 Raymond 1100750 新增傳入combineType參數
												//(new CompoundFolio(docNo, signType)).loadDocument()	// 2016.8.31 新增傳入signType參數
												(new CompoundFolio(docNo, signType, combineType)).loadDocument()
													.done(function(cf) {
														// 1110829 Raymond 1110725 修正第一次點擊子文頁籤, 若無任何文稿卻不會顯示無任何文稿訊息的問題
														//SSOUtil.loading("hide");
														$(thisElem).data("model", cf);
														// 1060425 Raymond 1060276 重設該子文的UI狀態
														resetUI(cf, "restore");
													})
													.fail(function(errorText) {
														SSOUtil.loading("hide");
														alert(errorText);
													});
											}
										}
										return false;
									});
							});
						}
					}
					// 1140408 Raymond 1140401 修正非會辦單位才能看到已會畢的分會單位頁籤
					//if(odwdcm && "IS_THREAD" in odwdcm && odwdcm.IS_THREAD == "Y") {	// 2017.4.7 新增分會頁籤功能
					if(odwdcm && "IS_THREAD" in odwdcm && odwdcm.IS_THREAD == "Y" && !SSOUtil.isConsultingDoc(theAOL.docObj, theSSO.User.EnvSettings, SSOUtil.getOrgNode(theAOL.docObj.sourceOrgNo))) {	// 2017.4.7 新增分會頁籤功能
						theLogger.log("查詢分會中已會畢單位...");
						initConFolio(theAOL.docObj.sourceOrgNo, theAOL.docObj.docNo)
						// 1091021 Raymond 1090564 修正分會會畢單位公文支援信保特殊模式, 新增記錄及傳入strDraftSourceType參數
						//.done(function(conOu) {
						.done(function(conOus, strDraftSourceType) {// 1091021 Raymond conOu -> conOus, 避免$.each混淆
							if(SSOUtil.typeOf(conOus) == "array") {	// 1091021 Raymond conOu -> conOus, 避免$.each混淆
								$.each(conOus, function(i, conOu) {	// 1091021 Raymond conOu -> conOus, 避免$.each混淆
									var title = "[分會]";
									title += conOu.OuName;
									var $ti = $("<li class='ui-block-a'><a></a></li>").appendTo("#aol #tabbar > ul");
									$ti.find("a")
										.attr({href: "folio_" + conOu.OuId,
											"data-docpath": conOu.DocPath})
										.data("conOu", conOu)
										.data("strDraftSourceType", strDraftSourceType)	// 1091021 Raymond 1090564 修正分會會畢單位公文支援信保特殊模式, 新增記錄及傳入strDraftSourceType參數
										.text(title)
										.buttonMarkup({
											corners: false,
											shadow: false,
											theme: 'c'
										})
										.removeClass('ui-link')
										.on("click tap", function(event) {
											$(this).closest("ul").find("a").removeClass("ui-btn-active");
											$(this).addClass("ui-btn-active");
											// 1060425 Raymond 修正從主辦文切到分會文時, 應該要判斷主辦文是否可編輯, 若可編輯則先重新排版以更新編輯結果
											if(theAOL.getCurrFolio() && theAOL.getCurrFolio().enableEdit()) {
												var dm = theAOL.getCurrFolio().getCurrDraftModel();
												if(!!dm && dm.dirty() && "updateView" in dm) {
													dm.updateView();
												}
											}
											var model = $(this).data("model");
											if(typeof model !== "undefined") {
												model.refresh();
												// 1060425 Raymond 1060276 重設該分會文的UI狀態
												resetUI(model, "restore");
											}
											else {
												//var docPath = $(this).attr("data-docpath");
												var co = $(this).data("conOu");
												if(!!co) {
													SSOUtil.loading("show", {text: "開啟分會公文..."});
													var thisElem = this;
													// 1091021 Raymond 1090564 修正分會會畢單位公文支援信保特殊模式, 新增記錄及傳入strDraftSourceType參數
													//(new ConFolio(co, theAOL.docObj.fileIOWS, theAOL.docObj.docNo)).loadDocument()
													(new ConFolio(co, theAOL.docObj.fileIOWS, theAOL.docObj.docNo, $(this).data("strDraftSourceType"))).loadDocument()
														.done(function(cf) {
															SSOUtil.loading("hide");
															$(thisElem).data("model", cf);
															// 1060425 Raymond 1060276 重設該分會文的UI狀態
															resetUI(cf, "restore");
														})
														.fail(function(errorText) {
															SSOUtil.loading("hide");
															alert(errorText);
														});
												}
											}
											return false;
										});
								});
							}
						})
						.fail(function(errorText) {
							alert(errorText);
						});
					}

					// 2019.7 - Eric, performance log
					if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
						theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- FolioModel.init() BEGIN...');
						window.tmBeginFolioModelInit = Date.now();
					}

					(new FolioModel()).init(theAOL.docObj, {
						buttonF: uiState.buttonF,	// 2016.8.26 新增buttonF參數, 供FolioModel判定載入DraftMgmt時是否應開放編輯
						// 1101108 Raymond 1090860 新增另一個紙本公文唯讀模式專用Flag, 以修正在會辦待分辦等資料夾可以唯讀模式檢視文稿但卻無傳送儲存等按鈕的問題
						//readOnly: ((_uiParam && "aol_readonly_mode" in _uiParam)?_uiParam.aol_readonly_mode:uiState.readOnly),//(uiState)?uiState.readOnly:_getUIStatus().readOnly,	// 2015.9.17 新增唯讀模式, 2015.10.15 改用uiState.readOnly, 2016.8.8 改用localStorage[指定名稱], 2016.8.16 改用參數
						readOnly: ((_uiParam && "aol_readonly_mode" in _uiParam)?_uiParam.aol_readonly_mode:(uiState.readOnlyP || uiState.readOnly)),//(uiState)?uiState.readOnly:_getUIStatus().readOnly,	// 2015.9.17 新增唯讀模式, 2015.10.15 改用uiState.readOnly, 2016.8.8 改用localStorage[指定名稱], 2016.8.16 改用參數
						hideODC010: ((_uiParam && "aol_disable_odc010" in _uiParam)?_uiParam.aol_disable_odc010:false),	// 2016.8.12 新增hideODC010選項, 2016.8.16 改用參數
						disableSave: ((_uiParam && "aol_disable_save" in _uiParam)?_uiParam.aol_disable_save:false),	//2016.9.19	Leslie	配合文稿可編輯不可儲存模式(AKI802&ODT351),增加傳入aol_disable_save
						success: function() {
							// 2019.7 - Eric, performance log
							if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
								let _log = SSOUtil.dev_getTimeElapseStr('FolioModel.init()作業-[success callback]', window.tmBeginFolioModelInit);
								theLogger.time(_log);
								window.tmBeginFolioModelInit = 0;
							}

							theLogger.log(this);
							theLogger.log("currFolio:" + this.getDocNo());
							//AlternativeLogger.upload();	// 2016.1.19 開啟成功先上傳一次
							// 2013.9.13 - Raymond, 改寫getCurrFolio方法指向新增的Model物件
							var _model = this;
							this.setAsCurr = function() {	// 2016.8.23 切換母子文頁籤時要執行重設getCurrFolio功能
								theAOL.getCurrFolio = function() {
									return _model;
								};
								theAOL.signFolder = _model.getSignFolder();	// 2013.4.23 - Raymond, 將SignFolder屬性expose在全域變數
								//theAOL.getAllDrafts = this.getAllDrafts;// 2013.4.23 - Raymond, 將getAllDrafts方法expose到全域變數
							}
							this.setAsCurr();
							
							if("customMgr" in theAOL)	// 2016.8.17 改為非必須
								theAOL.customMgr.onload(_model);	// 2014.4.28 - Raymond, 載入成功呼叫客製化onload
							
							// 1070921 Raymond 記憶主文UI按鈕狀態callback提到new FolioView之前宣告, 避免只有來文的母文(or併陳子文)只有來文頁面時, 提早呼叫saveUI卻找不到而導致切換母/子文仍出現相同問題
							this.saveUI = function() {
								resetUI(this, "save");
							}
							
							// 2019.7 - Eric, performance log
							if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
								theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- before new FolioView()...');
								window.tmBeginNewFolioView = Date.now();
							}

							new FolioView(this, $home.find("#leftPart .viewPort"));	// 2015.10.15 判斷是否readOnly改吃FolioModel.readOnly()
							
							// 2019.7 - Eric, performance log
							if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
								let _log = SSOUtil.dev_getTimeElapseStr('new FolioView() RETURNED.', window.tmBeginNewFolioView);
								theLogger.time(_log);
								window.tmBeginNewFolioView = 0;
								window.tmAfterFolioViewBEGIN = Date.now();
							}

							$('#aol a#btnCoworkProcSetting').hide(); // 隱藏分會設定按鈕(紙本公文用)
							
							// 1070323 Raymond 檢查環境變數, 設為Y是啟用簽辦意見窗格功能, 才需要初始化簽辦意見
							if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_PANEL") == "Y") {
								// 1140515 Raymond 1140474 修改記憶簽辦意見窗格是否顯示的變數從localStorage(show_sign_comment_panel)改為UserEnvSetting(USER_SHOW_SIGN_COMMENT_PANEL)
								// 1111027 Raymond 1110864 合併1101468, 修改當啟用「顯示我的最終意見」功能時預設為顯示簽辦意見窗格
								// 1071008 Raymond 1070937 登出再登入後因為沒有重新整理AOL畫面, 要更新簽辦意見窗格的選單勾選狀態
								//if(localStorage["show_sign_comment_panel"] == "true")
								//if(localStorage["show_sign_comment_panel"] == "true" || (theSSO.User.EnvSettings.get("AOL_SHOW_MY_FINAL_COMMENT") == "Y" && localStorage["show_sign_comment_panel"] != "false"))
								if(showSignCommentPanel == "true" || (theSSO.User.EnvSettings.get("AOL_SHOW_MY_FINAL_COMMENT") == "Y" && showSignCommentPanel != "false"))
									// 1111025 Raymond 1110864 合併1101468, 新增位於齒輪按鈕的行動版選單按鈕
									//$("#btnSignCmtPanel").addClass("ui-checkbox-on").removeClass("ui-checkbox-off");
									$("#btnSignCmtPanel, #moBtnSignCmtPanel").addClass("ui-checkbox-on").removeClass("ui-checkbox-off");
								// 1100715 Raymond 1100648 新增判斷是否啟用分文稿記錄簽核意見功能, 未啟用時才呼叫_setupComments(), 因為啟用時onDraftSelected@RD-FolioView.js會呼叫_setupComments(), 所以這裡要避免重複呼叫
								if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") != "Y")
								// 1070320 Raymond 1070363 載入公文後呼叫_setupComments以更新簽辦意見窗格
								_setupComments($home.find("#leftPart #sidePanel #signCmtList"));
							}
							
							var disableSave = _model.disableSave();	//2016.9.19	Leslie	配合文稿可編輯不可儲存模式(AKI802&ODT351)，增加disableSave相關判斷
							
							// 1101108 Raymond 1090860 紙本公文可能因ODRPUI.XML的metaDataM設定而變成readOnly(改成用readOnlyP代表, 但FolioModel的readOnly已與uiStatus的不一致), 會導致以下判斷不顯示傳送相關工具列按鈕, 所以這裡要改用uiStatus.readOnly來取代_model.readOnly()
							//var readOnly = _model.readOnly();
							var uiStatus = _getUIStatus(theAOL.docObj, _uiParam);	// 2016.10.14 FIX for AKI802文稿編輯
							// 1101108 Raymond 1090860 紙本公文可能因ODRPUI.XML的metaDataM設定而變成readOnly(改成用readOnlyP代表, 但FolioModel的readOnly已與uiStatus的不一致), 會導致以下判斷不顯示傳送相關工具列按鈕, 所以這裡要改用uiStatus.readOnly來取代_model.readOnly()
							var readOnly = uiStatus.readOnly;
							
							//2016.9.19	Leslie	配合文稿可編輯不可儲存模式(AKI802&ODT351)，增加disableSave相關判斷
							//if (!readOnly) {
							if (!readOnly&&!disableSave) {
								// 2013.9 - 非唯讀且未下載再下載章戳檔
								if(!("signetBox" in theAOL))
									theWebServices.initStampBox();
								
								// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式不要下載ActionDefine.xml
								if(!theSSO || theSSO.offlineMode != true) {
								// 2016.8.17 - 非唯讀且未下載再下載ActionDefine.xml
								if(!("actDef" in theAOL)) {
									initActionDefine();
									(new StampActionHandler()).install();	// 2016.8.17 章戳連動
								}
								}
								
								/* 2016.8 - Eric Peng, move to reloadAOL function.... */
								// 2015.6.11 - Eric Peng, [核決]/[剔退]checkbox先還原到未勾選
								$('#aol #chkApprove').prop('checked', false).checkboxradio('refresh');
								$('#aol #chkReject').prop('checked', false).checkboxradio('refresh');
								
								$('#aol #moChkApprove').prop('checked', false).checkboxradio('refresh');
								$('#aol #moCkReject').prop('checked', false).checkboxradio('refresh');
								
								// 2015.5.22 - Eric Peng, 初始化[核決]/[剔退]checkbox
								var approved = (theAOL.docObj.get('', 'APP_USER_ID').length || theAOL.docObj.get('', 'APP_ROLE_ID').length) ? true : false;
								var rejected = theAOL.docObj.get('', 'REJECT_USER_NAME').length ? true : false;
								if (approved) {
									$('#aol #chkApprove').prop('checked', true).checkboxradio('refresh');
									$('#aol #moChkApprove').prop('checked', true).checkboxradio('refresh');
								}
								else if (rejected) {
									$('#aol #chkReject').prop('checked', true).checkboxradio('refresh');
									$('#aol #moChkReject').prop('checked', true).checkboxradio('refresh');
								}
								
								// 1130813 Raymond 1130313 合併1111007(1100394), 離線模式下隱藏參照窗格按鈕, 不要setup TransTarget
								if(!!theSSO && theSSO.offlineMode == true)
									$("#refView").hide();
								else {
								
								// 2016.1 - bug trace
								theLogger.log('before setup TransTarget...');
								
								/* 2016.6.29 - Eric, 支援紙本公文開啟, 傳送對象修改
								 * 2015.10.19 - Eric, 若公文基資未設定傳送異動別或UserId,取MenuRuleAOL對應項目
								 * 2013.2.20 - Eric Peng, 設定目前的傳送對象
								 */
								if (theAOL.docObj.signType=='E') {
									SSOUtil.hideSubmitUI(false);

									// 2019.7 - Eric, performance log
									let tmBeginUpdateTransTarget = 0;
									if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
										theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- Update/ChangeTransTargets BEGIN...');
										tmBeginUpdateTransTarget = Date.now();
									}

									SSOUtil.getCurrentTransTarget(theAOL.nextTarget, theAOL.docObj);
									if (theAOL.nextTarget.TxName.length==0 ||
										(theAOL.nextTarget.TxName.length>0 && theAOL.nextTarget.UserId.length==0)) {
										SSOUtil.updateTransTarget(approved, rejected, theAOL.docObj, theAOL.nextTarget);
									}
									else {
										SSOUtil.changeTransTarget(theAOL.nextTarget, theAOL.docObj);
										// 2018.10.19 - Eric Peng, bug-fix
										theAOL.nextTarget.approved = approved;
										theAOL.nextTarget.rejected = rejected;
									}
									
									// 2019.7 - Eric, performance log
									if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
										let _log = SSOUtil.dev_getTimeElapseStr('Update/ChangeTransTarget作業', tmBeginUpdateTransTarget);
										theLogger.time(_log);
										tmBeginUpdateTransTarget = 0;
									}
								}
								else if (theAOL.docObj.signType=='P') {
									var SAMLart = localStorage.Artifact;
									var menuRule = SSOUtil.getMenuRule_Obj(SAMLart, theAOL.docObj.sourceOrgNo, theAOL.docObj.signType);
									var rule = null;
									if (menuRule) {
										rule = menuRule.getRule(theAOL.docObj.folder, theAOL.docObj.subfolder);
										if (!!rule && rule.txList!==null && rule.txList.length) {
											SSOUtil.hideSubmitUI(false);
											SSOUtil.getCurrentTransTarget(theAOL.nextTarget, theAOL.docObj);
											if (theAOL.nextTarget.TxName.length==0 ||
												(theAOL.nextTarget.TxName.length>0 && theAOL.nextTarget.UserId.length==0)) {
												if (typeof SSOUtil.updateTransTarget_PDoc !== 'undefined') {
													SSOUtil.updateTransTarget_PDoc(approved, rejected, theAOL.docObj, theAOL.nextTarget);
												}
											}
											else {
												SSOUtil.changeTransTarget(theAOL.nextTarget, theAOL.docObj);
												// 2018.10.19 - Eric Peng, bug-fix
												theAOL.nextTarget.approved = approved;
												theAOL.nextTarget.rejected = rejected;
											}
										}
									}
									
									if (typeof rule=='undefined' || rule===null || rule.txList===null || rule.txList.length===0) {
										// folder-subfolder沒有對應的Rule, 隱藏傳送UI
										SSOUtil.hideSubmitUI(true);
									}
									
									if (theAOL.nextTarget.TxName=='分會') {
										$('#aol a#btnCoworkProcSetting').show();
									}
								}
								
								// 2016.1 - bug trace
								theLogger.log('after setup TransTarget...');
								//AlternativeLogger.upload();
								}	//  end of 1130813 Raymond 1130313 合併1111007(1100394), 離線模式下隱藏參照窗格按鈕, 不要setup TransTarget
							}
							else if (readOnly && theAOL.docObj.signType=='E' && uiStatus.showTButton) { // 2016.10.4 - 回閱公文為唯讀, 但可傳送
								SSOUtil.hideSubmitUI(false);
								SSOUtil.getCurrentTransTarget(theAOL.nextTarget, theAOL.docObj);
								if (theAOL.nextTarget.TxName.length==0 ||
									(theAOL.nextTarget.TxName.length>0 && theAOL.nextTarget.UserId.length==0)) {
									SSOUtil.updateTransTarget(approved, rejected, theAOL.docObj, theAOL.nextTarget);
								}
								else {
									SSOUtil.changeTransTarget(theAOL.nextTarget, theAOL.docObj);
								}
							}
							else {
								if("hideSubmitUI" in SSOUtil)	//2016.10.14	文稿編輯模式未載入RD-Submit.js
								SSOUtil.hideSubmitUI(true); // 2016.10.4 - 隱藏傳送選項UI
							}
							
							/* 2016.8 - Eric Peng, move to reloadAOL function.... 						
							// 2015.10 - 依公文狀態設定UI (Save/Submit/核決 etc...), 2016.8.17 新增_uiParam參數
							var uiState = _getUIStatus(theAOL.docObj, _uiParam);
							if (!uiState.hiddenSubmitPanel && !readOnly) {
								$('div#transPanel #chkApprove').prop('disabled', uiState.enableApproveBtn?false:true).checkboxradio('refresh');
								$('div#transPanel input#chkReject').closest('div.ui-checkbox').css('visibility', uiState.showRejectBtn?'visible':'hidden');
							}*/
						
							// 2016.10.3 - Eric, 改到此處執行!
							//if (!readOnly) {
							if (!readOnly&&!disableSave){	//2016.10.14	Leslie	文稿編輯模式與ReadOnly一致
								// 2016.7 - 改變創稿側桌title
								theSSO.MP.changeNewDocSidePaneTitle(true);
							}
						
							TCControl.associate($home.find("#leftPart .viewPort"), $home.find("#tcControl1 select"));
							
							$home.find("#leftPart #zoomControl1 select").trigger('change');	// 2016.6.2 自動套用預設/當前的縮放比例
						
							// 2013.9.12 - Raymond, #btnSave、#btnSubmit、#btnClose等按鈕handler搬到reload方法外面
							//                      因為每成功初始化公文一次, handler會addEventListener多一次
							
							//1111124	Leslie[1110920]	新增可設定顯示併案的來文機關
							var title = theAOL.docObj.docNo || "[尚未取號]";
							if(bDisplayFromOrg && theAOL.docObj.fromOrg != '' && typeof theAOL.docObj.fromOrg == 'string')
								//1140723	Leslie[1141011]	弱掃修正[Client DOM Stored XSS]
								// title += '<br>' + theAOL.docObj.fromOrg;
								title += '<br>' + theSSO.Util.htmlEncode(theAOL.docObj.fromOrg);
							
							// 2013.9.12 - Raymond, 重開時設定公文夾頁籤顯示的文號
							// 2014.4.2 - Raymond, 增加記錄model物件於A
							// 2016.7.26 - Raymond, 頁籤文字因jQM4.5調整成直接設定A的內容
							$("#aol #tabbar ul li:first").find("a").attr({
									href: "folio_" + theAOL.docObj.msgId,
									id: "folio_" + theAOL.docObj.msgId
								})
								//1111124	Leslie[1110920]	新增可設定顯示併案的來文機關
								// .text(theAOL.docObj.docNo || "[尚未取號]")
								//1140801	Leslie[1141011]	弱掃修正[Client DOM Stored XSS]，以套件做消毒
								// .html(title)
								.html(DOMPurify.sanitize(title))
								.data("model", this);
								
							//1121222	Leslie[卡驗收序32]	新增客製化可設定功能鍵
							if(typeof theCustom.getCustomSet("CustomBtnSet") == 'object'){
								$('#cusBtnControl1').show();
								var cbSet = theCustom.getCustomSet("CustomBtnSet");
								for(var idxBt = 0; idxBt < 3 ;idxBt++){
									var bi = cbSet[idxBt];
									var $btCus = $(`#btCusBtn${idxBt}`);
									
									if(!bi){
										// 1130503 Raymond 中榮序97 修正客製化功能鍵少於3個時, 最後一個功能鍵沒套到右邊圓角的style問題
										//$btCus.hide();
										$btCus.remove();
										continue;
									}
									else {
										$btCus.show();
										// 1130503 Raymond 中榮序97 修正客製化功能鍵少於3個時, 最後一個功能鍵沒套到右邊圓角的style問題
										$btCus.addClass("ui-last-child").prev().removeClass("ui-last-child");
									}
									
									if(nsEditor && bi.vis in nsEditor){
										var vis = false;
										try {
											vis = nsEditor[bi.vis].call(this, this);	
										}
										catch(e) {
											theLogger.error(e.message);
										}
										
										$btCus.text(bi.name);
										
										if(vis == true){
											$btCus.removeClass("ui-disabled")
											
											$btCus.off('click').on('click', {fn: bi.fn,fm:this} , function(event){
												if(event.data && "fn" in event.data && typeof event.data.fn === "string" && event.data.fn.length > 0){
													if(nsEditor && event.data.fn in nsEditor) {
														var evt = $.Event("click", {target: event.target});
														var fm = event.data.fm;
														evt.data = $home.find("#leftPart .viewPort");
														try {
															//2017.2.15	Leslie	增加列印前自動儲存功能
															if(event.data.fn == "onPrintFolio"){
																var autoSave = true;
																var autoSaveBeforePrint = theSSO.User.EnvSettings.get('AOL_AUTOSAVE_BEFORE_PRINT');
																var docObj_AOL = theAOL.docObj;
																if ((typeof docObj_AOL.uiParam=='object' && typeof docObj_AOL.uiParam.aol_readonly_mode=='boolean') ||
																		(typeof docObj_AOL.uiParam=='object' && typeof docObj_AOL.uiParam.aol_disable_save=='boolean')){
																	
																	if (docObj_AOL.uiParam.aol_readonly_mode || docObj_AOL.uiParam.aol_disable_save) {
																		autoSave = false;
																	}
																}
																
																if(autoSave && typeof autoSaveBeforePrint != "undefined" && autoSaveBeforePrint == 'Y'){
																	//公文狀態為可儲存(非唯讀，非AKI802文稿編輯)時，檢核系統設定是否自動儲存
																	//1060825	Leslie[1060515]	增加傳入目前儲存的觸發作業文字"列印"
																	//theAOL.doSave().done(function() {
																	theAOL.doSave("列印").done(function() {
																		nsEditor[event.data.fn].call(this, evt, fm);	// 2016.9.2 傳入FolioModel參數
																	})
																	.fail(function(errorText) {
																		alert(errorText);
																	});
																}
																else
																	nsEditor[event.data.fn].call(this, evt, fm);	// 2016.9.2 傳入FolioModel參數
															}
															//1061120	Leslie[1061055]	增加於要號前檢核附件是否均已完成轉出(僅限線上簽核公文+附件匯出頁面)
															else if(event.data.fn == "onReqDocNo"){
																var checkAttConvert = true,isAnyAttUnFinish = false;
																var msg = [];
																var docObj_AOL = theAOL.docObj;
																if ((typeof docObj_AOL.uiParam=='object' && typeof docObj_AOL.uiParam.aol_readonly_mode=='boolean') ||
																		(typeof docObj_AOL.uiParam=='object' && typeof docObj_AOL.uiParam.aol_disable_save=='boolean')){
																	
																	if (docObj_AOL.uiParam.aol_readonly_mode || docObj_AOL.uiParam.aol_disable_save) {
																		checkAttConvert = false;
																	}
																}
																
																if(checkAttConvert && theAOL.docObj.signType == "E" && SSO_CONFIG.enableConvertAttPage){
																	var cntDraft = fm.getDraftCounts();
																	//1140804	Leslie[1141011]	修正弱掃[Unchecked Input For Loop Condition]
																	cntDraft = (cntDraft > 50? 50: cntDraft);
																	if(cntDraft != null && cntDraft > 0){
																		for(var iDraft=0;iDraft<cntDraft;iDraft++){
																			var msg2 = []
																			var cntAtt = fm.getDraftAttCounts(iDraft);
																			//1140804	Leslie[1141011]	修正弱掃[Unchecked Input For Loop Condition]
																			cntAtt = (cntAtt > 50? 50: cntAtt);
																			if(cntAtt != null && cntAtt > 0){
																				for(var iAtt=0;iAtt<cntAtt;iAtt++){
																					if(fm.isAttConvertFinish(iDraft,iAtt) === false){
																						//有附件沒轉完
																						isAnyAttUnFinish = true;
																						msg2.push(fm.getDraftAttName(iDraft,iAtt))
																					}
																				}
																			}
																			if(msg2.length){
																				msg.push(fm.getDraftName(iDraft)+"："+msg2.join('、'));
																			}
																		}
																	}
																	
																	if(isAnyAttUnFinish){
																		msg.push("請等候附件全數轉置完成後");
																		msg.push("再執行公文要號功能");
																		alert(msg.join('\r\n'));
																	}
																	else
																		nsEditor[event.data.fn].call(this, evt, fm);	// 2016.9.2 傳入FolioModel參數
																}
																else
																	nsEditor[event.data.fn].call(this, evt, fm);	// 2016.9.2 傳入FolioModel參數
															}	//1061120	Leslie[1061055]	增加於要號前檢核附件是否均已完成轉出(僅限線上簽核公文+附件匯出頁面)	==END==
															else
																nsEditor[event.data.fn].call(this, evt, fm);	// 2016.9.2 傳入FolioModel參數
														}
														catch(e) {
															theLogger.error(e.message);
														}
													}
												}										
											})
										}
										else
											$btCus.addClass("ui-disabled")
									}
									else
										$btCus.hide();
								}
							}else
								$('#cusBtnControl1').hide();
								
								
							// 1070921 Raymond 修正只有來文的彙併辦, 在new FolioView時就會觸發FolioModel.saveUI, 但因為宣告在new FolioView之後所以找不到saveUI, 導致切換子文再切回母文出現一樣問題
							// 1070620 Raymond 記憶UI按鈕狀態需延後至第一頁初始完成後
							//this.saveUI = function() {
							// 1060425 Raymond 1060276 記憶目前主文的UI的show/hide狀態
							//resetUI(this, "save");
							//}
							
							// 1120804 Raymond 1120503 修正DocView下會發生無DocSubmitUtil的Error
							// 2023.7.3 - merge: 2023.5.2 - 1111455 Eric, 公文開啟完成後立即初始化傳送子視窗
                            //if (typeof theSSO.MP.submitDocProcFrameWnd=='undefined' || theSSO.MP.submitDocProcFrameWnd==null) {
                            if ((typeof theSSO.MP.submitDocProcFrameWnd=='undefined' || theSSO.MP.submitDocProcFrameWnd==null) && !(!!theAOL.docObj.uiParam && !!theAOL.docObj.uiParam.unv_obj)) {
                                SSOUtil.setupAOLSubmitDocProcWnd(theAOL.docObj, DocSubmitUtil);
                            }

							// 2019.7 - Eric, performance log
							if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
								var sDocInfo = '[DocNo=' + theAOL.docObj.docNo + ', MsgId=' + theAOL.docObj.msgId + ']';
								
								// 2019.8.1 - 1080654 Eric, reloadAOL開啟時會被叫用2次, 只寫一次就好!
								if (typeof theSSO.MP.lastReloadDocNo=='undefined' || 
								    (typeof theSSO.MP.lastReloadDocNo=='string' && theSSO.MP.lastReloadDocNo!==theAOL.docObj.docNo)) {
									let _log = SSOUtil.dev_getTimeElapseStr('After new FolioView() RETURNED', window.tmAfterFolioViewBEGIN);
									theLogger.time(_log);
									_log = SSOUtil.dev_getTimeElapseStr('開啟公文作業(Path-2 @AOL.reloadAOL)' + sDocInfo, window.tmBeginOpenDoc2);
									theLogger.time(_log);
									_log = SSOUtil.dev_getTimeElapseStr('公文傳送後立即開次筆(傳送+開公文 Path-2 @AOL.reloadAOL)', window.tmBeginSubmitAndOpenNext2);
									theLogger.time(_log);
								}

								window.tmAfterFolioViewBEGIN = 0;
								window.tmBeginOpenDoc2 = 0;
								window.tmBeginSubmitAndOpenNext2 = 0;
								theSSO.MP.lastReloadDocNo = theAOL.docObj.docNo;
							}
							// END of FolioModel.init success callback
						},
						error: function(errorText) {
							theLogger.error(errorText);
							SSOUtil.loading("show", {theme:"e", text:errorText, textVisible:true});
						}
					});
					
					// 2013.11 - Eric Peng, reset nextTarget object
					theAOL.nextTarget = {
							TxName:'', OUId:'', RoleId:'', UserId:'',
							OUName:'', RoleName:'', UserName:'',
							approved: false, rejected: false,
							}; 
					theAOL.flowData = []; // 2013.12 - Eric Peng, reset flowData array (系統記錄的簽核流程項目)
					localStorage.removeItem('nextOptions'); // 2013.12 - Eric Peng

					// 2019.7 - Eric, performance log
					if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
						let _log = SSOUtil.dev_getTimeElapseStr('reloadAOL()', window.tmBeginReloadAOL);
						theLogger.time(_log);
						window.tmBeginReloadAOL = 0;
					}
				//}	// 2016.10.7 - Raymond, 搬到reload()
			}
			// 2016.7.1 簽核公文是否唯讀設定至localStorage['aol_readonly_mode']
			//localStorage['aol_readonly_mode'] = false;
			theAOL.reload(ui);	// onpagecreate時主動呼叫第一次開啟公文, 2016.8.16 傳入pagecreate的第2參數
			
			// 1100706 Raymond 1100648 放在全域物件, 供點擊文稿頁籤後呼叫重新整理
			theAOL.setupComments = _setupComments;
			
			// 1100928 Raymond 1100648 修正在啟用分文稿記錄簽核意見功能時, 點彙併辦子文再點母文會發生轉圈圈的問題(signFolder.currSignComment取到最後一次開啟的公文即子文, 其所屬的_fm的_views已關閉, 導致無法取到文稿資訊而發生Error)
			theAOL.currSignComment = function() {
				return this.getCurrFolio().getSignFolder().currSignComment.apply(this, arguments);	// 改成用getCurrFolio()去取目前開啟中的公文
			}
			// 1120221 Raymond 1111225 新增支援內部意見
			theAOL.currInnerComment = function() {
				return this.getCurrFolio().getSignFolder().currInnerComment.apply(this, arguments);	// 改成用getCurrFolio()去取目前開啟中的公文
			}
			
			// 1140224 Raymond 1131303 放在全域物件, 供點擊文稿頁籤後呼叫重新整理
			theAOL.setupFixWords = _setupFixWords;
			
			// 2016.8.29 儲存功能獨立成named function, btnSave及btnClose 2個click會用到, 並改成deferred
			//1060825	Leslie[1060515]	增加處理可能會傳入的當前作業，沒有時，即為原程式行為"儲存"
			//function doSave() {
			function doSave(argAction) {
				var dfd = $.Deferred();
				
				SSOUtil.loading('show', { text:'作業中...', textVisiable:true, theme:'c' });
				SSOUtil.toggleFuncButton(0x3, false);
				
				/* debug */
				if (_debug && theAOL.docObj.signType=='E') {
					var rcvDocSign = SSOUtil.shouldCreateRcvDocDraft(theAOL);
				}
				
				// 1081230 Raymond 1080194 配合fnWebEditSave改為非同步呼叫, saveView也改為非同步
				// 2014.10.21 - Raymond, 儲存時叫用FolioModel的saveView, 2016.7.19 新增回傳值, 若不是true要中止儲存作業
				//1060825	Leslie[1060515]	增加處理可能會傳入的當前作業，沒有時，即為原程式行為"儲存"
				//if(!theAOL.getCurrFolio().saveView()) {
				//if(!theAOL.getCurrFolio().saveView(argAction)) {
				//	SSOUtil.loading("hide");
				//	SSOUtil.toggleFuncButton(0x3, true);
				//	dfd.reject("檢核未通過, 中止儲存作業!");
				//	return dfd.promise();
				//}
				theAOL.getCurrFolio().saveView(argAction).done(function(res) {
					if(!res) {
						SSOUtil.loading("hide");
						SSOUtil.toggleFuncButton(0x3, true);
						dfd.reject("檢核未通過, 中止儲存作業!");
					}
					else {
				
				// apply changes
				$home.find("#leftPart .pg .para").each(function(idx, elm) {
					//theLogger.log($(elm).data("editCtlr"));
					var ctlr = $(elm).data("editCtlr");
					if(ctlr != undefined) {
						ctlr.applyChanges();
					}
				});
				
				
				//1060907	Leslie[1060453]	配合鐵工客製化密件邏輯，將原儲存邏輯以函式打包，以避免程式執行順序異常
				var fm = theAOL.getCurrFolio();
				var dlDeffer = [];
				
				function _doNormalSave(){
					/*
					 * 2013.9 - Eric Peng, 儲存時將ODWMSG內容上傳至server,並叫用ODMSSP.SaveMsg
					 */
					var _docObj = theAOL.docObj;
					var serverPath = SSOUtil.combineLocalPath(_docObj.fileStoragePath, _docObj.fileSubDir)
					var ODWMSG_XmlObj = SSOUtil.getODWMSG_XMLDOMObj(_docObj);
					
					var _upload = true;
					var wfio = new WebFileIO(_docObj.fileIOWS);	// 2016.8.29 改成在這裡new 1次
					var deferreds = [];							// 2016.8.29 新增陣列, 容納ODWMSG、ODWDCM、ODWWKF 3個檔案的上傳工作, for上傳失敗時呼叫dfd.reject
					if (_upload) {
						deferreds.push(wfio.upload(serverPath, "ODWMSG.xml", ODWMSG_XmlObj, {	// 2016.8.29 加入deferreds
							success: function() {
								theLogger.log("-=ODWMSG.xml上傳完畢=-");
								
								//dfd.resolve(null);
							},
							error: function(errorText) {
								theLogger.error("ODWMSG.xml上傳失敗! " + errorText);
								//dfd.reject(errorText);
							}/*,	2016.8.29 因為改成deferreds一起等, 所以可以不用sync
							async: false */
						}));
					}
					
					// 2016.9.21 - 若為[主辦待分辦]公文, 依設定
					if (_docObj.subfolder=='主辦待分辦') {
						var sShowEmpBeforeDisp = theSSO.User.EnvSettings.get('MP_SHOWEMP_BEFORE_DISP');
						if (typeof sShowEmpBeforeDisp=='string' && sShowEmpBeforeDisp.length) {
							sShowEmpBeforeDisp = sShowEmpBeforeDisp.toLowerCase();
							if (sShowEmpBeforeDisp=='y') {
								_docObj.set2('aol', 'ODWDCM', {EMP_NAME:_docObj.toUserName});
								theLogger.log('-I- SUBFOLDER=' + _docObj.subfolder + ', 設定ODWDCM.EMP_NAME值為:' + _docObj.toUserName);
							}
						}
					}		
					
					/* 2013.12 - Eric Peng, 儲存時將ODWDCM內容上傳至server */
					var ODWDCM_XmlObj = SSOUtil.getODWDCM_XMLDOMObj(_docObj.getODWDCM());
					
					//_upload = false;
					if (_upload) {
						deferreds.push(wfio.upload(serverPath, "ODWDCM.xml", ODWDCM_XmlObj, {	// 2016.8.29 加入deferreds
							success: function() {
								theLogger.log("-=ODWDCM.xml上傳完畢=-");
								
								//dfd.resolve(null);
							},
							error: function(errorText) {
								theLogger.error("ODWDCM.xml上傳失敗! " + errorText);
								//dfd.reject(errorText);
							}/*,	2016.8.29 因為改成deferreds一起等, 所以可以不用sync
							async: false */
						}));
					}
					
					/* 2016.8 - Eric Peng, 儲存時將ODWWKF-XX.XML內容上傳至server */
					var _uploadWWKF = false;
					var ODWWKF_XmlObj = null;
					if (_docObj.isODWWKUpdated() && _docObj.getODWWKF()!==null) {
						ODWWKF_XmlObj = _docObj.getODWWKF_XMLDOMObj();
						_uploadWWKF = true;
					}
					
					if (_uploadWWKF) {
						var thread = _docObj.get('ODWMSG', 'THREAD');
						if (typeof thread == 'string' && thread.length==1) {
							thread = '0' + thread;
						}
						if (typeof thread !== 'string' || thread.length!==2) {
							thread = '00';
						}
						var wwkfFilename = 'ODWWKF-' + thread + '.XML';
						deferreds.push(wfio.upload(serverPath, wwkfFilename, ODWWKF_XmlObj, {	// 2016.8.29 加入deferreds
							success: function() {
								theLogger.log('-=' + wwkfFilename + '上傳完畢=-');
								// 1130708 Raymond 1130637 儲存上傳預排流程檔完成後清除wwkfModified屬性
								if("wwkfModified" in _docObj)
									delete _docObj.wwkfModified;
							},
							error: function(errorText) {
								theLogger.error(wwkfFilename + "上傳失敗! " + errorText);
							}/*,	2016.8.29 因為改成deferreds一起等, 所以可以不用sync
							async: false */
						}));
					}
					
					// 2016.8.29 等待deferreds的ODWMSG、ODWDCM、ODWWKF一起上傳
					$.when.apply(this, deferreds).done(function() {	// 成功時, 再執行公文文稿資料儲存
						// 儲存整筆公文包括異動的文稿、DraftMgmt.xml、簽核物件、SignWork.xml
						// 2013.9.3 - 已完成簽核物件及SignWork.xml的上傳
						// 2013.9.13 - Raymond, 儲存公文改用getCurrFolio方法取得當前Model物件
						theAOL.getCurrFolio().save()
						.done(function() {
							theLogger.log('-I- currFolio.save() done.')
							
							// 叫用ODMSSP.saveMsg
							var SAMLart = localStorage['Artifact'];
							//var _doc = theAOL.docObj;	重複
							var rslt = null;
							if (_docObj.isDraft) {
								rslt = theWebServices.odmssp.saveDraftMsg(SAMLart, _docObj);
							}
							else {
								rslt = theWebServices.odmssp.saveMsg(SAMLart, _docObj.msgId);
							}
							
							//1120217	Leslie[1110881]	補上儲存時更新MP內容
							theSSO.MP.todolist.builder.updateDocObj(_docObj.msgId, _docObj)
							
							SSOUtil.loading('hide');
							SSOUtil.toggleFuncButton(0x3, true);
							
							if (rslt.success===true) {
								theLogger.log('-I- invoke ODMSSP.SaveMsg() succeeded.');

								// 2020.1.13 - 1080701 草稿儲存完須更新ODWDCM.LAST_UPDATE_PROG/LAST_UPDATE_TIME
								if (_docObj.isDraft) {
									if (typeof rslt.LastUpdateProg == 'string') {
										_docObj.set2('aol', 'ODWDCM', {LAST_UPDATE_PROG:rslt.LastUpdateProg});
									}
									if (typeof rslt.LastUpdateTime == 'string') {
										_docObj.set2('aol', 'ODWDCM', {LAST_UPDATE_TIME:rslt.LastUpdateTime});
									}
								}
								
								//alert('儲存作業完成!');
								dfd.resolve();
							}
							else {
								if (rslt.success!==true) {
									theLogger.error('-I- invoke ODMSSP.SaveMsg() failed. ErrCode=' + rslt.errCode + ', ErrMsg=' + rslt.errMsg);
									//alert('叫用ODMSSP.SaveMsg失敗! ErrCode=' + rslt.errCode + ', ErrMsg=' + rslt.errMsg);

									// 2018.1.15 - 1061276
									if (typeof rslt.checkDataErr=='boolean' && rslt.checkDataErr===true) {
										dfd.reject(rslt.errMsg);
									}
									else {
										dfd.reject('叫用ODMSSP.SaveMsg失敗! ErrCode=' + rslt.errCode + ', ErrMsg=' + rslt.errMsg);
									}
								}
							}
						})
						.fail(function(errorText) {
							theLogger.error(errorText);
							SSOUtil.loading('hide');
							SSOUtil.toggleFuncButton(0x3, true);
							dfd.reject(errorText);
						});
					})
					.fail(function(errorText) {	// ODWMSG、ODWDCM、ODWWKF上傳失敗
						theLogger.error(errorText);
						SSOUtil.loading('hide');
						SSOUtil.toggleFuncButton(0x3, true);
						dfd.reject(errorText);
					});
				}
				
				//1060905	Leslie[1060453]	鐵工局客製化密件邏輯，改為一律提示另存新檔
				function dlSingle(idx) {
					var dfdSingle =  $.Deferred();
					var dname = fm.getDraftName(idx);
					var fname = fm.getDraftFileName(idx);
					theLogger.log("下載'" + dname + "' - '" + fname + "'");
					// 預設檔名用文號-序, 或UserID + MsgID + 序
					if(fm.getDocNo().length > 0)
						fname = fm.getDocNo() + "-" + Util.padLeft(idx + 1, 3) + ".xml";
					else
						fname = theUserInfo.UserID + "_" + fm.getMsgId() + "-" + Util.padLeft(idx + 1, 3) + ".xml";
					theLogger.log("預設下載檔名'" + fname + "'");
					
					fm.accquireDraftModel(idx)
						.done(function(dm) {
							var data = dm.accquireXml();
							var xml = Util.getXml(data, false, "UTF-8");	// 指定encoding屬性為UTF-8, 因為下載後的檔案會變成UTF-8
							theLogger.log("下載第" + i + "個文稿檔(" + fname + ")");
							var blob = new Blob([xml], {type: "application/octet-stream"});
							if("msSaveBlob" in navigator)	// IE10/11專屬下載function
								navigator.msSaveBlob(blob, fname);
							else {	// Chrome用A的click事件
								var url = URL.createObjectURL(blob);
								var $a = $("<a data-role='none' rel='external' data-ajax='false' download='" + fname + "' href='" + url + "'></a>").appendTo("body");
								$a[0].click();	// 2016.12.22	Leslie	改回DOM的標準Click，加上"[0]"
								$a.remove();
							}
						})
						.fail(function(errorText) {
							alert(errorText);
						});
				}
				
				if(theAOL.docObj.secret > '1' && theSSO.User.SystemSets.get('RRB_ENABLE_SCRECT_DOC_LOGIC') == 'Y'){
					
					var n = fm.getDraftCounts();
					for(var i=0; i<n; i++) {
						dlDeffer.push(dlSingle(i));
					}
					
					$.when.apply(this,dlDeffer).done(function(){
						if(argAction == "列印"){	//列印的自動儲存，改為另存新檔後，就跳過儲存作業
							SSOUtil.loading('hide');
							SSOUtil.toggleFuncButton(0x3, true);
							dfd.resolve();
						}
						else{	//非列印的儲存，提示另存新檔後，清除稿件主旨
							dlDeffer.length = 0;
							if(window.confirm('所有稿件均已完成另存\r\n即將修訂「主旨」為"密不錄由"，並清除「段落」內容\r\n是否繼續儲存作業?')){
								for(var i=0;i<n;i++){
									dlDeffer.push(fm.accquireDraftModel(i).done(function(dm){
										// 1071023 Raymond 避免因簽稿會核單禁止非承辦人異動文稿等特殊限制, 造成儲存時轉圈圈問題
										if(!dm.getEditable())
											return;
										
										if(dm.nodes('//主旨/文字').length > 0){
											dm.text('//主旨/文字',"密不錄由");
										}
										//1070130	Leslie[1061332]	增加處理開會通知單類型主旨
										else if(dm.nodes('//開會事由/文字').length > 0){
											dm.text('//開會事由/文字',"密不錄由");
										}
										var nd = dm.nodes('//段落');
										if(nd.length > 0){
											for(var j=0;j<nd.length;j++){
												//1061018	Leslie	增加處理段落中的<文字>
												var objTxt = $(nd[j]).find('文字')[0];
												if("text" in objTxt)	// for IE-compatible
													objTxt.text = "";
												else
													objTxt.textContent = "";
									
												$(nd[j]).find('條列').each(function(idx){
													var $txt = $(this).find('文字'); 
													if($txt.length){
														if("text" in $txt[0])	// for IE-compatible
															$txt[0].text = "";
														else
															$txt[0].textContent = "";
													}
													if(idx>0)
														$(this).remove();
												})
											}
										}
									}))
								}
								$.when.apply(this,dlDeffer).done(function(){
									$("#aol #leftPart .viewPort").find(".pages").flip("refresh");	// 重新整理頁面
									_doNormalSave();
								})
							}
							else{	//取消，不儲存，應復原相關UI
								SSOUtil.loading('hide');
								SSOUtil.toggleFuncButton(0x3, true);
								dfd.reject("使用者取消儲存作業。");
							}
						}
					})
				}
				// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式不上傳ODWDCM.XML、ODWMSG.XML、ODWWKF.XML等檔案, 也不要呼叫saveDraftMsg/saveMsg等WS
				else if(!!theSSO && theSSO.offlineMode == true) {
					theAOL.getCurrFolio().save()
					.done(function() {
						
						SSOUtil.loading('hide');
						SSOUtil.toggleFuncButton(0x3, true);
						theLogger.log('-I- currFolio.save() done.');
						dfd.resolve();
					})
					.fail(function(errorText) {
						theLogger.error(errorText);
						SSOUtil.loading('hide');
						SSOUtil.toggleFuncButton(0x3, true);
						dfd.reject(errorText);
					});
				}
				else
					_doNormalSave();
				//1060907	Leslie[1060453]	配合鐵工客製化密件邏輯，將原儲存邏輯以函式打包，以避免程式執行順序異常	--END--
				
					}	// 1081230 Raymond 1080194 end of else
				})	// 1081230 Raymond 1080194 end of saveView().done callback function
				.fail(function(errorText) {	// saveView().fail callback function
					dfd.reject(errorText);
				});
				return dfd.promise();
			}
			theAOL.doSave = doSave;	// 2016.10.6 - Raymond, 放在全域物件, 供線上轉紙本功能叫用
			
			//2017.2.8	Leslie	新增要號後自動儲存ODWDCM、ODWMSG與ODWWKF，以減少要號後又不儲存的怪現象
			function autoSaveForDraftDocNoChange(){
				var dfd = $.Deferred();
				
				//1060907	Leslie[1060453]	配合鐵工客製化密件邏輯，密件公文停用自動儲存
				if(theAOL.docObj.secret > '1' && theSSO.User.SystemSets.get('RRB_ENABLE_SCRECT_DOC_LOGIC') == 'Y'){
					return dfd.promise();
				}
				/*
				 * 2013.9 - Eric Peng, 儲存時將ODWMSG內容上傳至server,並叫用ODMSSP.SaveMsg	--Copy by doSave()
				 */
				var _docObj = theAOL.docObj;
				var serverPath = SSOUtil.combineLocalPath(_docObj.fileStoragePath, _docObj.fileSubDir)
				var ODWMSG_XmlObj = SSOUtil.getODWMSG_XMLDOMObj(_docObj);
				
				var _upload = true;
				var wfio = new WebFileIO(_docObj.fileIOWS);	// 2016.8.29 改成在這裡new 1次
				var deferreds = [];							// 2016.8.29 新增陣列, 容納ODWMSG、ODWDCM、ODWWKF 3個檔案的上傳工作, for上傳失敗時呼叫dfd.reject
				if (_upload) {
					deferreds.push(wfio.upload(serverPath, "ODWMSG.xml", ODWMSG_XmlObj, {	// 2016.8.29 加入deferreds
						success: function() {
							theLogger.log("-=ODWMSG.xml上傳完畢=-");
							
							//dfd.resolve(null);
						},
						error: function(errorText) {
							theLogger.error("ODWMSG.xml上傳失敗! " + errorText);
							//dfd.reject(errorText);
						}/*,	2016.8.29 因為改成deferreds一起等, 所以可以不用sync
						async: false */
					}));
				}
				
				/* 2013.12 - Eric Peng, 儲存時將ODWDCM內容上傳至server 	--Copy by doSave()*/
				var ODWDCM_XmlObj = SSOUtil.getODWDCM_XMLDOMObj(_docObj.getODWDCM());
				
				//_upload = false;
				if (_upload) {
					deferreds.push(wfio.upload(serverPath, "ODWDCM.xml", ODWDCM_XmlObj, {	// 2016.8.29 加入deferreds
						success: function() {
							theLogger.log("-=ODWDCM.xml上傳完畢=-");
							
							//dfd.resolve(null);
						},
						error: function(errorText) {
							theLogger.error("ODWDCM.xml上傳失敗! " + errorText);
							//dfd.reject(errorText);
						}/*,	2016.8.29 因為改成deferreds一起等, 所以可以不用sync
						async: false */
					}));
				}
				
				/* 2016.8 - Eric Peng, 儲存時將ODWWKF-XX.XML內容上傳至server 	--Copy by doSave()*/
				var _uploadWWKF = false;
				var ODWWKF_XmlObj = null;
				if (_docObj.isODWWKUpdated() && _docObj.getODWWKF()!==null) {
					ODWWKF_XmlObj = _docObj.getODWWKF_XMLDOMObj();
					_uploadWWKF = true;
				}
				
				if (_uploadWWKF) {
					var thread = _docObj.get('ODWMSG', 'THREAD');
					if (typeof thread == 'string' && thread.length==1) {
						thread = '0' + thread;
					}
					if (typeof thread !== 'string' || thread.length!==2) {
						thread = '00';
					}
					var wwkfFilename = 'ODWWKF-' + thread + '.XML';
					deferreds.push(wfio.upload(serverPath, wwkfFilename, ODWWKF_XmlObj, {	// 2016.8.29 加入deferreds
						success: function() {
							theLogger.log('-=' + wwkfFilename + '上傳完畢=-');
							// 1130708 Raymond 1130637 儲存上傳預排流程檔完成後清除wwkfModified屬性
							if("wwkfModified" in _docObj)
								delete _docObj.wwkfModified;
						},
						error: function(errorText) {
							theLogger.error(wwkfFilename + "上傳失敗! " + errorText);
						}/*,	2016.8.29 因為改成deferreds一起等, 所以可以不用sync
						async: false */
					}));
				}
				
				// 2016.8.29 等待deferreds的ODWMSG、ODWDCM、ODWWKF一起上傳		--Copy by doSave()
				$.when.apply(this, deferreds).done(function() {	// 成功時, 再執行公文文稿資料儲存
					// 叫用ODMSSP.saveMsg
					theAOL.getCurrFolio().save()
					.done(function() {
						theLogger.log('-I- currFolio.save() done.')
						
						// 叫用ODMSSP.saveMsg
						var SAMLart = localStorage['Artifact'];
						var rslt = null;
						rslt = theWebServices.odmssp.saveDraftMsg(SAMLart, _docObj);
						
						if (rslt.success===true) {
							theLogger.log('-I- invoke ODMSSP.SaveMsg() succeeded.');

							// 2020.1.13 - 1080701 草稿儲存完須更新ODWDCM.LAST_UPDATE_PROG/LAST_UPDATE_TIME
							if (_docObj.isDraft) {
								if (typeof rslt.LastUpdateProg == 'string') {
									_docObj.set2('aol', 'ODWDCM', {LAST_UPDATE_PROG:rslt.LastUpdateProg});
								}
								if (typeof rslt.LastUpdateTime == 'string') {
									_docObj.set2('aol', 'ODWDCM', {LAST_UPDATE_TIME:rslt.LastUpdateTime});
								}
								
								//1120217	Leslie[1110881]	銓敘部-序14，新增支援紙本草稿轉正式公文
								if(_docObj.signType == 'P'){
									//1120503 David 支援代理人處理
									//var rsltDtoM = theWebServices.odmssp.ProcDraftToMain(SAMLart, _docObj.msgId, _docObj.sourceOrgNo, _docObj.docNo)
									var rsltDtoM = theWebServices.odmssp.ProcDraftToMain(SAMLart, _docObj)
									if(rsltDtoM.success === true){
										_docObj.newMsgId = rsltDtoM.sMsgId;	//給後面更新成新的MsgId，舊的會用在查找待更新資料
										theSSO.MP.todolist.builder.updateDocObj(_docObj.msgId, _docObj)
										
										_docObj.set2('DraftToMain', 'ODWMSG', {
											'MSG_ID':rsltDtoM.sMsgId,
											'WEB_SERVICE':rsltDtoM.sWebService, 
											'SRV_NO':rsltDtoM.sSrvNo,
											'STORAGE_PATH':rsltDtoM.sStoragePath,
											'SUB_DIR':rsltDtoM.sSubDir	//1120602	Leslie[領務局-序2]	修正SUB_DIR路徑未更新問題，SUD_DIR > SUB_DIR
										});
										
										_docObj.msgId = rsltDtoM.sMsgId;
										_docObj.fileIOWS = rsltDtoM.sWebService;
										_docObj.fileStoragePath = rsltDtoM.sStoragePath;
										_docObj.fileSubDir = rsltDtoM.sSubDir;
										_docObj.isDraft = false;
										var _fm = theAOL.getCurrFolio();
										if(_docObj.fileStoragePath.length && _docObj.fileStoragePath[_docObj.fileStoragePath.length-1] == '\\')	// 2016.1.15 可能尾字已有反斜線
											_fm.subDirPath = _docObj.fileStoragePath + _docObj.fileSubDir;
										else
											_fm.subDirPath = _docObj.fileStoragePath + "\\" + _docObj.fileSubDir; 
										_fm.fileIOWS = rsltDtoM.sWebService;
										//1120222	Leslie[1110881]	銓敘部-序14，新增支援紙本草稿轉正式公文，稿件路徑需一併更新
										_fm.doNoChangedAfterDraftToMain();
									}
									else{
										theLogger.error('-I- invoke ODMSSP.SaveMsg() failed. ErrCode=' + rslt.errCode + ', ErrMsg=' + rslt.errMsg);
										dfd.reject('叫用ODMSSP.SaveMsg失敗! ErrCode=' + rslt.errCode + ', ErrMsg=' + rslt.errMsg);
									}
								}
							}
							
							dfd.resolve();
						}
						else {
							if (rslt.success!==true) {
								theLogger.error('-I- invoke ODMSSP.SaveMsg() failed. ErrCode=' + rslt.errCode + ', ErrMsg=' + rslt.errMsg);
								dfd.reject('叫用ODMSSP.SaveMsg失敗! ErrCode=' + rslt.errCode + ', ErrMsg=' + rslt.errMsg);
							}
						}
					})
					.fail(function(errorText) {
						theLogger.error(errorText);
						SSOUtil.loading('hide');
						SSOUtil.toggleFuncButton(0x3, true);
						dfd.reject(errorText);
					});
				})
				.fail(function(errorText) {	// ODWMSG、ODWDCM、ODWWKF上傳失敗
					theLogger.error(errorText);
					dfd.reject(errorText);
				});
				var rslt = theSSO.MP.todolist.builder.updateDocObj(_docObj.msgId, _docObj);	//2017.2.8	Leslie	主動先更新MP，以避免使用者"真的沒存"時，MP看不到公文
				return dfd.promise();
			}
			theAOL.autoSaveForDraftDocNoChange = autoSaveForDraftDocNoChange;	//2017.2.8	Leslie	提供要號子視窗呼叫
			
			// 2013.9.12 - Raymond, 儲存、傳送、關閉等按鈕的click handler搬到reload方法外
			$("#btnSave, #moBtnSave").on("click", function(event)	{
				// 2013.9.13 - Raymond, 若尚未開啟公文或開啟失敗, getCurrFolio方法會回傳false, 故Save、Submit、Close等功能應先檢核這條件, 通過再繼續處理
				if(!theAOL.getCurrFolio())
					return false;
				
				// 2015.9.17 唯讀模式時, 儲存按鈕應已disabled, 不該觸發click
				// 2015.10.15 改依uiState.readOnly決定
				var uiState = _getUIStatus();
				if(uiState.readOnly) {
					alert("唯讀模式公文不可儲存!");
					return false;
				}
				
				// 1140918 Raymond 1141348 修正使用數位墨水簽核工具後, 但未點擊「新增簽核物件」指令列按鈕, 即點擊「儲存」, 會造成數位墨水簽核物件未記錄的問題
				let $vp = $home.find("#leftPart .viewPort");
				if($vp.find("canvas#sketchOverlay").length > 0) {
					let api = $vp.find("canvas#sketchOverlay").eq(0).data("sketch");
					if("termSketchMode" in api && $.isFunction(api.termSketchMode)) {
						theLogger.log("由於點擊「儲存」, 執行終止畫布模式新增簽核物件功能");
						api.termSketchMode(api);
					}
				}
				
				// 1110318 Raymond 1101578 儲存公文前檢核是否有開啟編輯中附件未關閉
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
				function proceedLast() {	// 1110318 Raymond 1101578 儲存公文前檢核若沒有開啟編輯中附件時繼續處理後續作業
				
				SSOUtil.toggleFuncButton(0x3, false); // 2017.3
				
				// 1060518 Raymond 1060269 檢核目前追蹤修訂模式是否為完稿模式, 若不是的話, 提示訊息後, 切回完稿模式
				if(TCControl.currMode != 1) {
					// 1140930 Raymond 1140818 V5再變更需求項目7, 判斷SSO_CONFIG.OrgNickName=TPVGH時, 取消提示非完稿模式的警告訊息
					if(SSO_CONFIG.OrgNickName != "TPVGH")
					alert("目前追蹤修訂模式非完稿模式，為避免簽核物件在非完稿模式下可能發生位置異常問題，系統將切回完稿模式顯示。");
					$("#aol #tcControl1 select").val(1).trigger("change");
				}
				if(theAOL.getCurrFolio().enableEdit()) {	// 2017.1.5 新增儲存前先重新排版
					var dm = theAOL.getCurrFolio().getCurrDraftModel();
					if(!!dm && dm.dirty() && "updateView" in dm) {
						dm.updateView();
					}
				}
				/* 2016.8.29 - Raymond, 以下程式搬到doSave函式, 並改成deferred模式
				SSOUtil.loading('show', { text:'作業中...', textVisiable:true, theme:'c' });*/
				
				/* debug */
				/*if (_debug && theAOL.docObj.signType=='E') {
					var rcvDocSign = SSOUtil.shouldCreateRcvDocDraft(theAOL);
				}
				
				// 2014.10.21 - Raymond, 儲存時叫用FolioModel的saveView, 2016.7.19 新增回傳值, 若不是true要中止儲存作業
				if(!theAOL.getCurrFolio().saveView()) {
					SSOUtil.loading("hide");
					return false;
				}
				
				// apply changes
				$home.find("#leftPart .pg .para").each(function(idx, elm) {
					//theLogger.log($(elm).data("editCtlr"));
					var ctlr = $(elm).data("editCtlr");
					if(ctlr != undefined) {
						ctlr.applyChanges();
					}
				});*/
				
				/*
				 * 2013.9 - Eric Peng, 儲存時將ODWMSG內容上傳至server,並叫用ODMSSP.SaveMsg
				 */
				/*var _docObj = theAOL.docObj;
				var serverPath = SSOUtil.combineLocalPath(_docObj.fileStoragePath, _docObj.fileSubDir)
				var ODWMSG_XmlObj = SSOUtil.getODWMSG_XMLDOMObj(_docObj);
				
				var _upload = true;
				var wfio = null;
				if (_upload) {
					wfio = new WebFileIO(_docObj.fileIOWS);
					wfio.upload(serverPath, "ODWMSG.xml", ODWMSG_XmlObj, {
						success: function() {
							theLogger.log("-=ODWMSG.xml上傳完畢=-");
							
							//dfd.resolve(null);
						},
						error: function(errorText) {
							theLogger.error("ODWMSG.xml上傳失敗! " + errorText);
							//dfd.reject(errorText);
						},
						async: false
					});
				}*/
				
				/* 2013.12 - Eric Peng, 儲存時將ODWDCM內容上傳至server */
				/*var ODWDCM_XmlObj = SSOUtil.getODWDCM_XMLDOMObj(_docObj.getODWDCM());
				
				//_upload = false;
				if (_upload) {
					wfio = new WebFileIO(_docObj.fileIOWS);
					wfio.upload(serverPath, "ODWDCM.xml", ODWDCM_XmlObj, {
						success: function() {
							theLogger.log("-=ODWDCM.xml上傳完畢=-");
							
							//dfd.resolve(null);
						},
						error: function(errorText) {
							theLogger.error("ODWDCM.xml上傳失敗! " + errorText);
							//dfd.reject(errorText);
						},
						async: false
					});
				}*/
				
				/* 2016.8 - Eric Peng, 儲存時將ODWWKF-XX.XML內容上傳至server */
				/*var _uploadWWKF = false;
				var ODWWKF_XmlObj = null;
				if (_docObj.isODWWKUpdated() && _docObj.getODWWKF()!==null) {
					ODWWKF_XmlObj = _docObj.getODWWKF_XMLDOMObj();
					_uploadWWKF = true;
				}
				
				if (_uploadWWKF) {
					wfio = new WebFileIO(_docObj.fileIOWS);
					
					var thread = _docObj.get('ODWMSG', 'THREAD');
					if (typeof thread == 'string' && thread.length==1) {
						thread = '0' + thread;
					}
					if (typeof thread !== 'string' || thread.length!==2) {
						thread = '00';
					}
					var wwkfFilename = 'ODWWKF-' + thread + '.XML';
					wfio.upload(serverPath, wwkfFilename, ODWWKF_XmlObj, {
						success: function() {
							theLogger.log('-=' + wwkfFilename + '上傳完畢=-');
						},
						error: function(errorText) {
							theLogger.error(wwkfFilename + "上傳失敗! " + errorText);
						},
						async: false
					});
				}
				
				// 儲存整筆公文包括異動的文稿、DraftMgmt.xml、簽核物件、SignWork.xml
				// 2013.9.3 - 已完成簽核物件及SignWork.xml的上傳
				// 2013.9.13 - Raymond, 儲存公文改用getCurrFolio方法取得當前Model物件
				theAOL.getCurrFolio().save()
				.done(function() {
					theLogger.log('-I- currFolio.save() done.')
					
					// 叫用ODMSSP.saveMsg
					var SAMLart = localStorage['Artifact'];
					var _doc = theAOL.docObj;
					var rslt = null;
					if (_docObj.isDraft) {
						rslt = theWebServices.odmssp.saveDraftMsg(SAMLart, _doc);
					}
					else {
						rslt = theWebServices.odmssp.saveMsg(SAMLart, _doc.msgId);
					}
					
					if (rslt.success===true) {
						theLogger.log('-I- invoke ODMSSP.SaveMsg() succeeded.');
						alert('儲存作業完成!')
					}
					else {
						if (rslt.success!==true) {
							theLogger.error('-I- invoke ODMSSP.SaveMsg() failed. ErrCode=' + rslt.errCode + ', ErrMsg=' + rslt.errMsg);
							alert('叫用ODMSSP.SaveMsg失敗! ErrCode=' + rslt.errCode + ', ErrMsg=' + rslt.errMsg);
						}
					}
					
					SSOUtil.loading('hide');
				})
				.fail(function(errorText) {
					theLogger.error(errorText);
					SSOUtil.loading('hide');
				});*/
				
				// 2016.8.29 改用新的doSave函式, 並顯示deferred模式的錯誤訊息
				doSave().done(function() {
					alert('儲存作業完成!');
					SSOUtil.toggleFuncButton(0x3, true);
				})
				.fail(function(errorText) {
					alert(errorText);
					SSOUtil.toggleFuncButton(0x3, true);
				});
				return false;
				}	// 1110318 Raymond 1101578 End of 儲存公文前檢核若沒有開啟編輯中附件時繼續處理後續作業
			});
			
			$("#btnSubmit, #moBtnSubmit").on("click", function(event) {
				/* 2016.7 - Eric Peng, 公文傳送作業實作移至 RD-Submit.js */
				
				// 2016.12.15 - 防止連續點擊傳送鍵
				if (typeof theSSO.MP.submitClicked !== 'undefined' && theSSO.MP.submitClicked===true) {
					if (!!_debug) {
						theLogger.log('連續點擊傳送鍵, skip...');
					}
					return;
				}
				else {
					theSSO.MP.submitClicked = true;
					setTimeout(function(){ theSSO.MP.submitClicked=false; }, 1000);
				}

				let sVal = localStorage.dev_testCOMDocMergeStatus;
				if (window.location.href.indexOf('docvip.fdat.com.tw')!==-1 && (typeof sVal==='string') && SSOUtil.isValueTrue(sVal)) {
					theLogger.log('what the hell!');
				}
				
				// 2019.8.26 - Eric, fix timer start!
				theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 公文傳送作業開始... [按下傳送鈕]');
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					window.tmBeginSubmit = Date.now();
					window.tmBeginSubmitAndOpenNext = Date.now();
					window.tmBeginSubmitAndOpenNext2 = Date.now();
					window.tmEndSubmit = 0; // 2019.9.26 - Eric, performance log bug fix
				}
				
				// 1140918 Raymond 1141348 修正使用數位墨水簽核工具後, 但未點擊「新增簽核物件」指令列按鈕, 即點擊「傳送」, 會造成數位墨水簽核物件未記錄的問題
				let $vp = $home.find("#leftPart .viewPort");
				if($vp.find("canvas#sketchOverlay").length > 0) {
					let api = $vp.find("canvas#sketchOverlay").eq(0).data("sketch");
					if("termSketchMode" in api && $.isFunction(api.termSketchMode)) {
						theLogger.log("由於點擊「傳送」, 執行終止畫布模式新增簽核物件功能");
						api.termSketchMode(api);
					}
				}

				var _docObj = theAOL.docObj;
				
				// 1110318 Raymond 1101578 傳送公文前檢核是否有開啟編輯中附件未關閉
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
				function proceedLast() {	// 1110318 Raymond 1101578 傳送公文前檢核若沒有開啟編輯中附件時繼續處理後續作業
				
				// 2015.10.16 唯讀模式時, 不異動封裝檔, 直接叫用ODMSSP.SubmitMsg (目前只有回閱公文使用!)
				var uiState = window._getUIStatus();
				if(uiState.readOnly) {
					var excludeNoEnveFolder = false;
					var settingFolder = theSSO.User.EnvSettings.get('AOL_ENVE_EXCLUDE_FOLDERS');
					if (typeof settingFolder !=='undefined' && settingFolder.length) {
						var settings = settingFolder.split(';');
						var curfolder = _docObj.folder + '-' + _docObj.subfolder;
						var idx = settings.indexOf(curfolder);
						if (idx>=0) {
							excludeNoEnveFolder = true;
						}
					}
					
					if (excludeNoEnveFolder) {
                        // 2022.11.10 - Eric, 內政部版更問題-自動開次筆公文Quick-fix
                        let _isDraft = _docObj.isDraft;
                        if (typeof _isDraft!=='boolean')
                            _isDraft = false;

                        let _openNextDoc = (typeof theSSO.openNextDoc=='boolean')?theSSO.openNextDoc:false;
                        let _openNextDocAdvMode = (typeof theSSO.openNextDocAdvMode=='boolean')?theSSO.openNextDocAdvMode:false;
                        if ('submitOptions' in theSSO.MP && theSSO.MP.submitOptions!=null) {
                            theSSO.MP.submitOptions.openNextDoc = _isDraft?false:_openNextDoc,
                            theSSO.MP.submitOptions.openNextDocAdvMode =  (_isDraft||!_openNextDoc)?false:_openNextDocAdvMode;
                        } 
                        else  {
                            theSSO.MP.submitOptions = { 
                                submitMode: 'basic',
                                cacheSCardInfo: true,
                                openNextDoc: false,
                                openNextDocAdvMode: false
                            };
                            theSSO.MP.submitOptions.openNextDoc = _isDraft?false:_openNextDoc,
                            theSSO.MP.submitOptions.openNextDocAdvMode =  (_isDraft||!_openNextDoc)?false:_openNextDocAdvMode;
                        }
                        // 2022.11.10 - Eric, 內政部版更問題-自動開次筆公文Quick-fix ==END==
						SSOUtil.readOnlySubmit(theAOL, _docObj);
					}
					return true;
				}
				
				// 2013.9.13 - Raymond, 若尚未開啟公文或開啟失敗, getCurrFolio方法會回傳false, 故Save、Submit、Close等功能應先檢核這條件, 通過再繼續處理
				if(!theAOL.getCurrFolio())
					return false;
				
				// 1080125 Leslie[1070200]	新增中興大學邏輯，參考附件子視窗設定是否已檢閱過參考附件
				//1080213	Leslie	紙本公文無參考附件
				//if(theAOL.getCurrFolio().enableEdit() && theSSO.User.EnvSettings.get("AOL_PROMPT_REFATT_BEFORE_SEND") == 'Y'){
				if(theAOL.docObj.signType == "E" && theAOL.getCurrFolio().enableEdit() && theSSO.User.EnvSettings.get("AOL_PROMPT_REFATT_BEFORE_SEND") == 'Y'){
					var currfm = theAOL.getCurrFolio();
					if( currfm.getRefAttachsFileCnt() > 0 && currfm.isViewRefAtt() == false){	//有參考附件，但沒進過管理視窗
						if(!confirm("本公文共有["+currfm.getRefAttachsFileCnt()+"]個參考附件，是否已確實檢閱參考附件內容?"))
							return false;
					}
				}

				//1090928 David 1090559 新增信保客製化欄位傳送前檢核
				if(theUserInfo.OrgNickName == "SMEG" && ((theAOL.docObj.ODWMSG.FOLDER == '待處理' && theAOL.docObj.ODWMSG.SUBFOLDER == '主辦') || theAOL.docObj.ODWMSG.FOLDER == '草稿'))
				{
					//依CHECK_MANAGE_AND_CARD設定檢核是否有專案卡號或列管編號
					var arrCheckManageAndCard = theSSO.User.SystemSets.get('CHECK_MANAGE_AND_CARD').split('|');
					if(arrCheckManageAndCard.length == 2)
					{
						var strInCharge = theAOL.docObj.ODWMSG.INCHARGE_OU;
						if(strInCharge.length > 2)
							strInCharge = strInCharge.substring(0, 2);
						var strCheckManage = arrCheckManageAndCard[0];
						var strCheckCard = arrCheckManageAndCard[1];
						if(strCheckManage.indexOf(strInCharge) != -1 && theAOL.docObj.ODWDCM.CLIENT_CARD_NO == "")
						{
							if(!confirm("本份公文基本資料未填寫專案卡號，若公文為專案案件時，必需輸入專案卡號。請確認是否要繼續傳送公文？ (按取消可至「基本資料」頁補填專案卡號)"))
								return false;
						}
						else if(strCheckCard.indexOf(strInCharge) != -1 && theAOL.docObj.ODWDCM.MANAGE_CASE_NO == "")
						{
							if(!confirm("本份公文基本資料未填寫列管編號，若公文為列管案件時，必需輸入列管編號。請確認是否要繼續傳送公文？ (按取消可至「基本資料」頁補填列管編號)"))
								return false;
						}
					}
					
					//雜項時需檢核保存年限是否小於5年
					if(theAOL.docObj.ODWDCM.CLIENT_CARD_NO == "" && theAOL.docObj.ODWDCM.MANAGE_CASE_NO == "" && theAOL.docObj.ODWMSG.KEEP_YEAR < "5")
					{
						if(!confirm("歸檔案件之簽呈或計畫等文件屬會計憑證需檢附者，請依規定保存年限至少5年，請問是否繼續傳送"))
							return false;
					}
				}
				
				//1100708 Raymond 1100648 新增高大客製化簽核意見傳送前檢核
				if(theAOL.docObj.signType == "E" && theUserInfo.OrgNickName == "NUK" && theAOL.docObj.ODWDCM.CANCEL_APP_ENABLE == "Y" &&	// 1.可核決
					((theAOL.docObj.ODWMSG.APP_USER_ID == theAOL.docObj.ODWMSG.OWN_USER_ID && theAOL.docObj.ODWMSG.APP_ROLE_ID == theAOL.docObj.ODWMSG.OWN_ROLE_ID) ||	// 2a.核決者就是本流程的使用者
					(theAOL.docObj.ODWMSG.IS_PROXY_DOC == "1" && theAOL.docObj.ODWMSG.APP_ROLE_ID == theAOL.docObj.ODWMSG.OWN_ROLE_ID))) {								// 2b.代理公文且核決者(角色)就是本流程的使用者(角色)
					if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
						theLogger.warn("[高大]客製化檢核核決流程點是否每個文稿皆有簽核意見");
						var docCloseSendDraftType = theSSO.User.EnvSettings.get("SSO_CLOSE_TYPE_SEND_DRAFTTYPE").split(";");	//可發文的稿件類型
						var n = theAOL.getCurrFolio().getSignFolder().getDraftCounts();
						if(theAOL.getCurrFolio().getSignFolder().hasFromDoc())
							--n;
						var allRight = true, lst = [];
						for(var i=0; i<n; i++) {
							var d = theAOL.getCurrFolio().getSignFolder().getDraft(i);
							theLogger.log("draft#" + i + "'" + d.name + "'[" + d.docType + "]:");
							if(docCloseSendDraftType.indexOf(d.docType) >= 0) {						// 3.符合發文文別的文稿
								if(!(!!d.newSignComment && d.newSignComment.length > 0)) {	// 都要有簽核意見
									theLogger.log("無簽核意見, 不可傳送");
									lst.push(d.name);
									allRight = false;
								}
								else
									theLogger.log("'" + d.newSignComment + "'");
							}
							else
								theLogger.log("非可發文文別, 不檢核簽核意見");
						}
						if(!allRight) {
							alert("「" + lst.join("、") + "」未加註簽核意見，請長官加注後再傳送。");
							return false;
						}
					}
					else
						theLogger.error("[高大]無法進行客製化檢核核決流程點是否每個文稿皆有簽核意見, 未啟用分文稿記錄簽核意見功能[環境變數AOL_ENABLE_SIGNCOMMENT_BY_DRAFT]?");
				}
				
				//1111024 Raymond 1110866 新增銓敘部客製化簽核意見傳送前檢核
				if(theAOL.docObj.signType == "E" && theUserInfo.OrgNickName == "MOCS" && theAOL.docObj.ODWDCM.CANCEL_APP_ENABLE == "Y" &&	// 1.可核決
					((theAOL.docObj.ODWMSG.APP_USER_ID == theAOL.docObj.ODWMSG.OWN_USER_ID && theAOL.docObj.ODWMSG.APP_ROLE_ID == theAOL.docObj.ODWMSG.OWN_ROLE_ID) ||	// 2a.核決者就是本流程的使用者
					(theAOL.docObj.ODWMSG.IS_PROXY_DOC == "1" && theAOL.docObj.ODWMSG.APP_ROLE_ID == theAOL.docObj.ODWMSG.OWN_ROLE_ID))) {								// 2b.代理公文且核決者(角色)就是本流程的使用者(角色)
					
					function hasSendStamp(d) {
						if(!!d.draftPages && !!d.draftPages.pages) {
							for(var j=0; j<d.draftPages.pages.length; j++) {
								var pg = d.draftPages.pages[j];
								if(!!pg.newSignObjs) {
									for(var k=0; k<pg.newSignObjs.length; k++) {
										var nso = pg.newSignObjs[k];
										if(nso.type == "stamp.text" && nso.content == "發") {
											theLogger.log(d.name + "的第" + j + "頁第" + k + "個新增簽核物件為文字式選用章戳「發」");
											return true;
										}
									}
								}
							}
						}
						return false;
					}
					
					var docCloseSendDraftType = theSSO.User.EnvSettings.get("SSO_CLOSE_TYPE_SEND_DRAFTTYPE").split(";");	//可發文的稿件類型
					if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
						theLogger.log("[銓敘部]客製化檢核核決流程點是否每個(因為啟用了「AOL_ENABLE_SIGNCOMMENT_BY_DRAFT」功能)發文文稿簽核意見皆為「發」, 非發文文稿簽核意見皆有值");
						var n = theAOL.getCurrFolio().getSignFolder().getDraftCounts();
						if(theAOL.getCurrFolio().getSignFolder().hasFromDoc())
							--n;
						var allRight = true, lst = [], lst2 = [];
						for(var i=0; i<n; i++) {
							var d = theAOL.getCurrFolio().getSignFolder().getDraft(i);
							theLogger.log("draft#" + i + "'" + d.name + "'[" + d.docType + "]:");
							if(docCloseSendDraftType.indexOf(d.docType) >= 0) {						// 3.符合發文文別的文稿
								if(!(!!d.newSignComment && d.newSignComment != "發")) {		// 簽核意見須為"發"
									if(hasSendStamp(d))
										theLogger.log("可發文文別簽核意見不是'發, 但有加蓋「發」字章, 忽略提示警告");
									else {
										theLogger.log("可發文文別簽核意見不是'發, 提示警告");
										lst.push(d.name);
										allRight = false;
									}
								}
								else
									theLogger.log("'" + d.newSignComment + "'");
							}
							else {
								if(!(!!d.newSignComment && d.newSignComment.length > 0)) {	// 都要有簽核意見
									theLogger.log("非可發文文別無簽核意見, 提示警告");
									lst2.push(d.name);
									allRight = false;
								}
								else
									theLogger.log("'" + d.newSignComment + "'");
							}
						}
						if(!allRight) {
							var msg = "";
							if(lst.length > 0)
								msg += ("「" + lst.join("、") + "」為發文用文稿，但簽核意見不是「發」\r\n");
							if(lst2.length > 0)
								msg += ("「" + lst2.join("、") + "」非發文用文稿, 但未輸入簽核意見\r\n");
							msg += "\r\n是否仍要傳送？";
							if(!confirm(msg)) {
								theLogger.log("使用者取消傳送");
								return false;
							}
						}
					}
					else {
						theLogger.log("[銓敘部]客製化檢核核決流程點是否含有可發文文稿時, 簽核意見為'發', 不含可發文文稿時, 簽核意見有值");
						var n = theAOL.getCurrFolio().getSignFolder().getDraftCounts();
						if(theAOL.getCurrFolio().getSignFolder().hasFromDoc())
							--n;
						var hasSendDraftType = false,
							sendDrafts = 0,
							lst = [];
						for(var i=0; i<n; i++) {
							var d = theAOL.getCurrFolio().getSignFolder().getDraft(i);
							if(docCloseSendDraftType.indexOf(d.docType) >= 0) {	// 符合發文文別的文稿
								theLogger.log("draft#" + i + "'" + d.name + "'[" + d.docType + "]:可發文");
								hasSendDraftType = true;
								sendDrafts ++;
								if(!hasSendStamp(d))	// 未加蓋「發」字章
									lst.push(d.name);
							}
							else
								theLogger.log("draft#" + i + "'" + d.name + "'[" + d.docType + "]:非可發文");
						}
						var sc = theAOL.getCurrFolio().getSignFolder().signComment()
						if(hasSendDraftType) {
							if(sc != "發") {
								if(lst.length == 0) {
									theLogger.log("有發文文稿且簽核意見不是「發」, 但發文文稿皆加蓋「發」字章, 忽略提示警告");
								}
								else if(lst.length == sendDrafts) {	// 所有發文文稿皆未加蓋「發」字章
									theLogger.log("有發文文稿且簽核意見不是「發」, 發文文稿皆未加蓋「發」字章, 提示警告");
									if(!confirm("本文具有發文用文稿，但簽核意見不是「發」，是否仍要傳送？")) {
										theLogger.log("使用者取消傳送");
										return false;
									}
								}
								else {	// 部分發文文稿未加蓋「發」字章
									theLogger.log("有發文文稿且簽核意見不是「發」, 發文文稿部分未加蓋「發」字章, 提示警告");
									if(!confirm("本文具有發文用文稿，但簽核意見不是「發」，\r\n且「" + lst.join("、") + "」未加蓋「發」字章，\r\n是否仍要傳送？")) {
										theLogger.log("使用者取消傳送");
										return false;
									}
								}
							}
						}
						else if(sc.length == 0) {
							theLogger.log("無發文文稿且未輸入簽核意見, 提示警告");
							if(!confirm("本文尚未輸入簽核意見，是否仍要傳送？")) {
								theLogger.log("使用者取消傳送");
								return false;
							}
						}
					}
				}
				
				//1140930 Raymond 1140818 V5新增傳送前檢核若有簽核區域外物件則提示警告訊息並中止傳送
				if(theAOL.docObj.signType == "E" && theSSO.User.EnvSettings.get("AOL_DISABLE_CHANGE_DRAFT_CONTENT") == "Y") {
					let n = theAOL.getCurrFolio().getDraftCounts(),
						xsf = theAOL.getCurrFolio().getSignFolder().xSignFolder(),
						oso = [];
					function t2t(type) {
						if(type == "text")
							return "文字意見";
						else if(type == "stamp.signet")
							return "職名章";
						else if(type.match(/^stamp./))
							return "選用章戳";
						else if(type == "sketch.tape")	// 1141117 Raymond fix typo: tap->tape
							return "貼布";
						else if(type.match(/^sketch/))
							return "數位墨水";
						return type;
					}
					for(let i=0; i<n; i++) {
						let d = theAOL.getCurrFolio().getEDraft(i);
						console.log(d);
						if(!d.fromType) {	// skip來文, 只檢核文稿
							let m = d.draftPages.pages.length;
							for(let j=0; j<m; j++) {
								let l = d.draftPages.pages[j].newSignObjs.length;
								for(let k=0; k<l; k++) {
									let o = d.draftPages.pages[j].newSignObjs[k],
										xos = xsf.findSignObjById(o.id);
									theLogger.log(`簽核物件#${o.id} - `, xos);
									for(let x=0; x<xos.length; x++) {
										if(xos[x].type == "B") {
											theLogger.warn(`檢核到簽核區域外物件 - ID:${o.id} 稿件:${d.name} 頁次:${xos[x].pgIdx+1}`);
											// 1141117 Raymond 北榮序375 修改刪除訊息內容的ID欄
											//oso.push(`ID:${o.id} 類型:${t2t(o.type)} 稿件:${d.name} 頁次:${xos[x].pgIdx+1}`);
											oso.push(`類型:${t2t(o.type)} 稿件:${d.name} 頁次:${xos[x].pgIdx+1}`);
										}
									}
								}
							}
						}
					}
					if(oso.length) {
						theLogger.warn("有簽核區域外簽核物件, 提示警告並中止傳送");
						// 1141117 Raymond 北榮序375 修改警告訊息內容
						//alert("檢核到簽核區域外簽核物件，禁止傳送!\n\n" + oso.join("\n"));
						alert("檢核到紅框(簽核區域)外有簽核物件，請將簽核物件移至紅框內，再進行傳送。\n\n" + oso.join("\n"));
						return false;
					}
				}
				
				// 1060518 Raymond 1060269 檢核目前追蹤修訂模式是否為完稿模式, 若不是的話, 提示訊息後, 切回完稿模式
				if(TCControl.currMode != 1) {
					// 1140930 Raymond 1140818 V5再變更需求項目7, 判斷SSO_CONFIG.OrgNickName=TPVGH時, 取消提示非完稿模式的警告訊息
					if(SSO_CONFIG.OrgNickName != "TPVGH")
					alert("目前追蹤修訂模式非完稿模式，為避免簽核物件在非完稿模式下可能發生位置異常問題，系統將切回完稿模式顯示。");
					$("#aol #tcControl1 select").val(1).trigger("change");
				}
				if(theAOL.getCurrFolio().enableEdit()) {	// 2017.1.5 新增傳送前先重新排版
					var dm = theAOL.getCurrFolio().getCurrDraftModel();
					if(!!dm && dm.dirty() && "updateView" in dm) {
						dm.updateView();
					}
				}
				
				// 1140701 Raymond 1140919 是否啟用自動新增文稿批示單功能, 改用擴充後的「WE_AUTO_GEN_文稿批示單」環境變數的第1變數判定
				// 1100927 Raymond 1100296 修正TX_NAME為"歸檔"時, 不需要檢核公文內必須有存查批示單或文稿批示單即可傳送
				// 1100923 Raymond 1100296 修正待處理-主辦資料夾TX_NAME為(線上簽核)"退回分辦人員"及(紙本簽核)"退回"時, 不需要檢核公文內必須有存查批示單或文稿批示單即可傳送
				// 1100615 Raymond 1100296 修正分文、分辦等資料夾不允許編輯內文時, 不需要檢核公文內必須有存查批示單或文稿批示單即可傳送
				// 1100531 Raymond 1100296 自動新增文稿批示單功能啟用時, 傳送及核章前檢核公文內必須有存查批示單或文稿批示單才可傳送
				//if(theSSO.User.EnvSettings.get("WE_AUTO_GEN_文稿批示單") == "Y") {
				//if(theAOL.getCurrFolio().enableEdit() && theSSO.User.EnvSettings.get("WE_AUTO_GEN_文稿批示單") == "Y") {
				//if(theAOL.getCurrFolio().enableEdit() && theSSO.User.EnvSettings.get("WE_AUTO_GEN_文稿批示單") == "Y" &&
				if(theAOL.getCurrFolio().enableEdit() && theAOL.getCurrFolio().isAutoGenInstructionSheetEnabled() &&
					!((theAOL.docObj.folder == "待處理" && theAOL.docObj.subfolder == "主辦" && ((theAOL.docObj.signType == "E" && theAOL.docObj.txName == "退回分辦人員") || (theAOL.docObj.signType == "P" && theAOL.docObj.txName == "退回"))) || theAOL.docObj.txName == "歸檔")) {
					if(!theAOL.getCurrFolio().checkInstructionSheet())
						return false;
				}
				
				/* 2016.7 - Eric Peng, 線上簽核傳送才會檢核職名章及核示語詞 */
				// 2014.12.2 - Raymond, 檢核職名章
				if (_docObj.signType==='E') {
					if(!_checkSignet(_docObj)) {	// 2016.3.24 FIX, 傳入_docObj, 因判斷會辦公文改用SSOUtil.isConsultingDoc, 需要此物件
						return false;
					}

					// 2016.6.1 - Raymond, 檢核核示語詞(1050095)
					if(!_checkStamp()) {
						return false;
					}
					
					// 1140827 Raymond 1140762 新增檢核文字意見
					if(!_checkTxCmt(_docObj)) {
						return false;
					}
					
					// 1140902 Raymond 1140765 新增檢核代字章
					if(!_checkProxyWord(_docObj)) {
						return false;
					}
				}
				
				var failed = false;
				
				// 2013.8 - Eric Peng - 公文傳送作業!
				SSOUtil.loading('show', { text:'公文傳送作業中', textVisible:true });
				SSOUtil.toggleFuncButton(0x3, false);
				
				// 儲存文稿/線上簽核內容
				// apply changes
				$home.find("#leftPart .pg .para").each(function(idx, elm) {
					var ctlr = $(elm).data("editCtlr");
					if(ctlr != undefined) {
						ctlr.applyChanges();
					}
				});

				// 2019.7.1 - Eric Peng, 傳送效能改善.
				let _sumbitMode = 'basic';
				let clientSignMode = SSO_CONFIG.getClientSignMode();
				let iOSDevice = window.iOS_device;
				let _signType = _docObj.signType;
				let _isDraft = _docObj.isDraft;
				if (typeof _isDraft!=='boolean')
					_isDraft = false;
				
				// ToDo: Eric, 確認下列各模式之判定方式:
				// 傳送子視窗支援之模式: PC使用智慧卡加簽, PC使用臨時憑證加簽, PC不加簽(II_SUBMIT_SIGN='N'), 
				//        不支援之模式: iOS平台所有模式 [因iOS Safari沒有子視窗模式, 開啟網頁一律為分頁]
				if (_signType=='E' && (typeof theSSO.MP.submitOptions=='undefined' || theSSO.MP.submitOptions==null)) {
					let sSubmitSign = theSSO.User.EnvSettings.get('II_SUBMIT_SIGN');
					let sEnvSubmitMode = theSSO.User.EnvSettings.get('AOL_SUBMIT_MODE');
					// 測舊傳送程序.
					//sEnvSubmitMode = '';
					if (typeof sEnvSubmitMode=='string' && sEnvSubmitMode.length) {
						sEnvSubmitMode =sEnvSubmitMode.toLowerCase();
					}

					let fSubmitSign=true;
					if (SSOUtil.isValueFalse(sSubmitSign)) {
						fSubmitSign = false;
						sEnvSubmitMode = 'basic'; // 2021.5.3 - Eric, bug-fix 不加簽時,不啟用傳送子視窗!
					}

					let _dumpObj = {
						SubmitSign: fSubmitSign,
						iOSDevice: iOSDevice,
						ClientSignMode: clientSignMode,
						AOLSubmitMode: sEnvSubmitMode
					};
					console.log('-I- submit settings:\n\t' + JSON.stringify(_dumpObj));

					// 行動平台, 草稿公文, 非智慧卡憑證加簽 => 皆不支援!
					if (!iOSDevice && !_isDraft && clientSignMode=='SCard') {
						if (typeof sEnvSubmitMode=='string' && sEnvSubmitMode.toLowerCase()=='signpage') {
							// 2020.7.8 - 1090390 Eric, IE: sigePage, chrome/firefox: 'webworker' or 'iframe'
							let ua = window.navigator.userAgent;
							if (ua.indexOf("MSIE")!=-1 || ua.indexOf("Trident")!=-1)  { //is IE, use ActiveX
								_sumbitMode = sEnvSubmitMode;
							}
							else {
								_sumbitMode = 'iframe'; // 2020.7.8 - 1090390 Eric, Chrome/FireFox - WebWorker/iFrame?
							}
						}
					}

					theSSO.MP.submitOptions = { 
						submitMode: _sumbitMode, // 'basic', 'signPage', 'webWorker';
						cacheSCardInfo: true,
						openNextDoc: false,
						openNextDocAdvMode: false
					};
				}
			
				// 每次重新檢查是否自動開啟次筆公文!
				let _openNextDoc = (typeof theSSO.openNextDoc=='boolean')?theSSO.openNextDoc:false;
				let _openNextDocAdvMode = (typeof theSSO.openNextDocAdvMode=='boolean')?theSSO.openNextDocAdvMode:false;
				if (typeof theSSO.MP.submitOptions!=='undefined' && theSSO.MP.submitOptions!==null) {
					theSSO.MP.submitOptions.openNextDoc = _isDraft?false:_openNextDoc,
					theSSO.MP.submitOptions.openNextDocAdvMode =  (_isDraft||!_openNextDoc)?false:_openNextDocAdvMode;
				}

				// 2021.5 - 1100093 Eric, 彙併辦母文傳送不使用傳送子視窗!
				let shouldProcEnveSubDoc = false;
				// 2021.12.28 - Eric, 將預設值改為true (彙併辦母文傳送時一併封裝子文)
				let _checkEnvelopSubDoc = true;
				let sValEnveCOMDoc = theSSO.User.EnvSettings.get('SSO_ENVELOP_COMDOC');
				if (typeof sValEnveCOMDoc=='string' && sValEnveCOMDoc.length && SSOUtil.isValueFalse(sValEnveCOMDoc)) {
					_checkEnvelopSubDoc = false;
				}
				if (_checkEnvelopSubDoc) {
					enveSubDocInfo = SSOUtil.checkEnveSubDocInfo(theAOL.docObj, false)
					if (typeof enveSubDocInfo=='object' && (enveSubDocInfo.newMergeDocs===true || enveSubDocInfo.unMergeDocs===true)) {
						shouldProcEnveSubDoc = true;
					}
				}

				// 2021.5 - 1100093 Eric, 行動平台簽辦, 須處理子文彙併辦/解彙併辦封裝則要求使用者以PC作業!
				if (shouldProcEnveSubDoc && iOSDevice && SSO_CONFIG.getClientSignMode()=='iOSApp') {
					alert('行動平台[DocSign App 加簽模式]不支援彙併辦子文封裝加簽作業, 請改用PC/Mac傳送本件公文!');
					SSOUtil.loading('hide');
					SSOUtil.toggleFuncButton(0x3, true);
					theSSO.MP.queryCertDeferred = null;
					return;
				}

                // 2022.11.8 - Eric, 若公文毋須異動封裝檔(e.g. 分文/分辦), 可直接傳送則不走傳送子視窗! (QuickFix for 內政部版更反映問題.)
                var canEDocSkipUpdate = false;
                if (_signType=='E') {
                    canEDocSkipUpdate = DocSubmitUtil.canEDocSkipUpdate(theAOL, _docObj);
                }

				// 2021.5 - 1100093 Eric, 若須處理子文彙併辦/解彙併辦封裝, 則不採用傳送子視窗!
				// 2019.7 - 1080654 Eric, 實作傳送子視窗功能!
				if (!canEDocSkipUpdate && !shouldProcEnveSubDoc &&!_isDraft && _signType=='E' && 'submitOptions' in theSSO.MP && 
				    (theSSO.MP.submitOptions.submitMode.toLowerCase()==='signpage' || theSSO.MP.submitOptions.submitMode.toLowerCase()==='iframe')) {
					var testRealSubmit = false;

					let _tmBefore = null;
					if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
						let _theDocNo = _docObj.docNo;
						let _theMsgId = _docObj.msgId;
						theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- submitDocProcess[withSignPage], DocNo='+ _theDocNo +', MsgId=' + _theMsgId + '. BEGIN...');
						
						if ((typeof theSSO.MP.submitDocProcWnd!=='undefined' && theSSO.MP.submitDocProcWnd!==null && theSSO.MP.submitDocProcWnd.closed!==true) || 
						    (typeof theSSO.MP.submitDocProcFrameWnd!=='undefined' && theSSO.MP.submitDocProcFrameWnd!==null && theSSO.MP.submitDocProcFrameWnd.closed!==true)) {
							theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- gonna invoke DocSubmitUtil.setupDocSubmitProcPage()...');
							_tmBefore = Date.now();						
						}
					}

					let mode = 'signpage';
					if (theSSO.MP.submitOptions.submitMode.toLowerCase()==='iframe') {
						mode = 'iframe';
					}
					
					DocSubmitUtil.setupDocSubmitProcPage('', mode)
					.then(function(rslt){
						if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
							if (_tmBefore!==null) {
								let _log = SSOUtil.dev_getTimeElapseStr('DocSubmitUtil.setupDocSubmitProcPage() DONE!', _tmBefore);
								theLogger.time(_log);
							}

							theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- DocSubmitUtil.submitDocProcess_withSignPage_Step1() BEGIN...');
							_tmBefore = Date.now();
						}

                        theLogger.log('-I- Submit doc use "' + mode + '" mode, call DocSubmitUtil.submitDocProcess_withSignPage_Step1().');
						return DocSubmitUtil.submitDocProcess_withSignPage_Step1(theAOL);
					})
					.then(function(rslt){
						if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
							let _log = SSOUtil.dev_getTimeElapseStr('DocSubmitUtil.submitDocProcess_withSignPage_Step1() DONE!', _tmBefore);
							theLogger.time(_log);
							_tmBefore = null;
						}

						if (!testRealSubmit) {
							// SSOUtil.loading('hide');
							// SSOUtil.toggleFuncButton(0x3, true);
							theSSO.MP.queryCertDeferred = null;
						}
					})
					.fail(function(errRslt){
						let _showError = true;
						if ('_showError' in errRslt && errRslt._showError==false) { // 2020.6.22 - Eric, typo fix. errRsl -> errRslt
							_showError = false;
						}
						if (_showError) {
                            // 2023.7.6 - Eric, 各機關問題彙整表 序97-修改錯誤訊息顯示.
                            let _errMsg = ''
                            if ('errMsg' in errRslt) {
                                _errMsg = errRslt.errMsg;
                            }
                            else if ('_errMsg' in errRslt) {
                                _errMsg = errRslt._errMsg;
                            }
                            else {
                                _errMsg = JSON.stringify(errRslt);
                            }
							alert(_errMsg);
                        }

						SSOUtil.loading('hide');
						SSOUtil.toggleFuncButton(0x3, true);
						theSSO.MP.queryCertDeferred = null; 
					});
				}
				else {
					if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
						theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- gonna invoke DocSubmitUtil.submitDocProcess()...');
					}
					theLogger.log('-I- Submit doc use "basic" mode, call DocSubmitUtil.submitDocProcess().');
					DocSubmitUtil.submitDocProcess(theAOL);
				}
				return false;
				}	// 1110318 Raymond 1101578 End of 傳送公文前檢核若沒有開啟編輯中附件時繼續處理後續作業
			});
			
			// 2013.9.12 - Raymond, 關閉page時清除FolioView所動態生成之元素
			// 2016.10.6 - Raymond, 新增e2p參數, 直接pass給FolioModel.close()
			$("#aol #btnClose, #aol #btnCloseR, #aol #moBtnClose").on("click", function(event, e2p) {
				// 2013.9.13 - Raymond, 若尚未開啟公文或開啟失敗, getCurrFolio方法會回傳false, 故Save、Submit、Close等功能應先檢核這條件, 通過再繼續處理
				if(theAOL.getCurrFolio()) {
					
					//1140424	Leslie[問題序79]	針對使用者於傳送等候時主動關閉公文，增加顯示警示訊息並取消簽署
					if(theSSO.MP.signDataDeferred != null && theSSO.MP.signDataDeferred.state() == "pending"){
						if(confirm("目前公文仍等候跨平台元件簽署中，是否確認取消並中止傳送?")){
							theLogger.warn('使用者關閉公文並取消傳送。')
							theSSO.MP.signDataDeferred.reject({success:false, errMsg:'使用者關閉公文並取消傳送'});
						}
					}
					
					// 1060518 Raymond 1060269 檢核目前追蹤修訂模式是否為完稿模式, 若不是的話, 提示訊息後, 切回完稿模式
					if(TCControl.currMode != 1) {
						// 1140930 Raymond 1140818 V5再變更需求項目7, 判斷SSO_CONFIG.OrgNickName=TPVGH時, 取消提示非完稿模式的警告訊息
						if(SSO_CONFIG.OrgNickName != "TPVGH")
						alert("目前追蹤修訂模式非完稿模式，為避免簽核物件在非完稿模式下可能發生位置異常問題，系統將切回完稿模式顯示。");
						$("#aol #tcControl1 select").val(1).trigger("change");
					}
					if(theAOL.getCurrFolio().enableEdit()) {	// 2017.1.5 新增關閉前先重新排版
						var dm = theAOL.getCurrFolio().getCurrDraftModel();
						if(!!dm && dm.dirty() && "updateView" in dm) {
							dm.updateView();
						}
					}
					
					// 1110318 Raymond 1101578 關閉公文前檢核是否有開啟編輯中附件未關閉
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

					// 1110318 Raymond 1101578 關閉公文前檢核若沒有開啟編輯中附件時繼續處理後續作業
					function proceedLast() {
					// 2020.2.13 - 1080782 Eric, merge MOI 1070309 - add 'closeRslt' for 儲存後發文...
					theAOL.getCurrFolio().close(doSave, e2p).done(function(closeRslt) {	// 2015.8.21 新增用延遲等待詢問是否儲存訊息, 2016.8.29 新增傳入doSave為參數, 當使用者點擊儲存時, 會呼叫doSave函式
						setTimeout(function() {
							/* 2016.4 - 顯示簽辦用UI controls */
							_toggleReadOnlyUI(false);

							// 2020.1.7 - 1081090 Eric, 開啟公文前回復套件上方工具列之原始狀態
							if ('defaultAOLToolbarCSSSet' in theSSO && typeof theSSO.defaultAOLToolbarCSSSet!=='undefined' && theSSO.defaultAOLToolbarCSSSet!==null) {
								SSOUtil.resetAOLToolbarCSS(theSSO.defaultAOLToolbarCSSSet, 'restore');
							}
							
							var readOnlyMode = false;
							if ((typeof theAOL.docObj.uiParam =='object' && typeof theAOL.docObj.uiParam.aol_readonly_mode == 'boolean' && theAOL.docObj.uiParam.aol_readonly_mode===true) ||
								//2016.9.19	Leslie	配合文稿可編輯不可儲存模式(AKI802&ODT351)
								(typeof theAOL.docObj.uiParam =='object' && typeof theAOL.docObj.uiParam.aol_disable_save == 'boolean' && theAOL.docObj.uiParam.aol_disable_save===true) ||
								(typeof theAOL.docObj.msgId!=='string' || theAOL.docObj.msgId.length===0)) { // 2016.9.14 - 若msgId未定義或為空字串=>檢閱模式)
								//2016.9.19	Leslie	配合文稿可編輯不可儲存模式(AKI802&ODT351)
								//readOnlyMode = theAOL.docObj.uiParam.aol_readonly_mode;
								readOnlyMode = theAOL.docObj.uiParam.aol_readonly_mode || theAOL.docObj.uiParam.aol_disable_save;
							}
							
							theAOL.getCurrFolio = function() {	// 2016.6.3 關閉後清除?
								return false;
							}
							
							// 2016.9.11 - 隱藏分會設定按鈕
							$('#aol a#btnCoworkProcSetting').hide();
							
							// 2016.8.2 - Raymond, 頁籤文字改為空白表示未開啟公文
							$("#aol #tabbar ul li:first").find("a")
								.attr({href: "folio_", id: "folio_"})
								.html("&nbsp;")
								.data("model", null);
							
							// 回TodoList頁
							/* 2016.6 */
							$('#docWorkPane').hide()
							
							if (!readOnlyMode) {
								// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式下不要顯示todolist的container pane
								if(!theSSO || theSSO.offlineMode != true) {
								// 2017.8.28 - 問題單1060802(東工處)
								var dpMode = localStorage['mp_display_mode'];
								var $displayPane=null, $hiddenPane=null;
								if (dpMode=='icon') {
									$displayPane = $('#todolistContainer #iconPane')
									$hiddenPane = $('#todolistContainer #listPane')
								}
								else {
									$displayPane = $('#todolistContainer #listPane');
									$hiddenPane = $('#todolistContainer #iconPane')
								}

								/*開啟todolist*/
								$('#todolistContainer #sidePane').hide();
								$hiddenPane.hide();
								$displayPane.show(); 
								var $listPane = $('#todolistContainer #listPane');

								// 2020.12.11 - 1090786 Eric, 追查MP todolist未顯示問題
								if ($listPane.length) {
									theLogger.log('-I- @_submitMsg() #listPane html=' + $listPane[0].outerHTML.substr(0, 256) + '...');
								}

								/*$('#todolistContainer #iconPane').hide();
								$('#todolistContainer #sidePane').hide();
								var $listPane = $('#todolistContainer #listPane');
								$listPane.show(); // 2016.10.5 - Eric, bug-fix, 由圖示模式開公文,關閉後無法顯示待辦清單問題
								*/
								
								// 2017.3.7 - 若AOL開啟中resize, 回MP顯示清單後須觸發resize作業
								h_header = $('#home_header').height();
								if (h_header!==0 && $listPane.data('resize')=='true') {
									theSSO.MP.resizeListPane(null, h_header, $listPane);
								}
								
								//1110831	Leslie	一律切回全開模式
								$('#todolistContainer').removeClass('doc_desktop_sidepage');
								$('#todolistContainer').removeClass('doc_desktop_hiddenpage').addClass('doc_desktop_showpage');
								//1130614	Leslie[中榮序128]	[上線需求序11] 新增客製化設定以強制公文開啟狀態下，點擊「公文檢索」時開啟為半開模式，增加於公文關閉時，設定tab-focus為待辦清單
								$('.drawer_switch .tab-item').removeClass('tab-focus');
								$('#tab_todo').addClass('tab-focus');								
								
								/* // 2020.11.27 - 1090786, Eric - 測公文傳送/關閉後待辦清單頁未拉出問題.
								let $tdlCntr = $('#todolistContainer');
								let classStrBefore = $tdlCntr.attr('class');
								theLogger.log('-I- #todolistContainer\'s class=\'' + classStrBefore + '\' [before switch to MP]');

								$tdlCntr.removeClass('doc_desktop_hiddenpage');
								$tdlCntr.addClass('doc_desktop_showpage');
								theLogger.log('-I- after #todolistContainer\'s class REMOVE doc_desktop_hiddenpage, and ADD doc_desktop_showpage');

								setTimeout(function() {
									let classStr = $tdlCntr.attr('class');
									if (classStr.indexOf('doc_desktop_showpage')==-1) {
										$tdlCntr.addClass('doc_desktop_showpage');
										theLogger.log('-I- after #todolistContainer\'s class ADD doc_desktop_showpage');
									}
								}, 10000);*/
								
								// 2020.11.27 - 1090786, Eric - 測公文傳送/關閉後待辦清單頁未拉出問題.
								let strClass =  $('#todolistContainer').attr('class');
								theLogger.log('-I- #todolistContainer\'s class=\'' + strClass + '\' after REMOVE doc_desktop_hiddenpage, and ADD doc_desktop_showpage');
								
								// 1130426 Raymond 中榮序97 關閉公文時檢查若有開雙視窗模式的話, 在開關主視窗的公文後一併關閉DocView子視窗的公文
								if(!!window.wndMirror && window.wndMirror.closed == false) {
									if(!!window.wndMirror.theAOL && !!window.wndMirror.theAOL.getCurrFolio())
										window.wndMirror.theAOL.getCurrFolio().close();
								}
								}
							}
							else {
								/*開啟AKI800*/
								// 2017.7 - 1060576, bug fix-若[公文檢索]側屜目前為半開狀態, 毋須重新開啟!
								var classWorkspace = $('#aki800ListWorkspace').attr('class');
								if (classWorkspace.indexOf('doc_desktop_sidepage')===-1) {
									// 2017.5.2 - 套件關閉後回AKI800側桌顯示問題!
									$('#querydoc_leftTopPane .searchViewContent').hide();
									$('#querydoc_leftTopPane .fullViewContent').show();
									$('#querydoc_leftTopPane').show();
									$('#aki800ListWorkspace').removeClass('doc_desktop_hiddenpage').addClass('doc_desktop_showpage');
								}
							}
							
							$('#leftDrawer').removeClass('drawer_show'); // 2017.5.2 - 隱藏側屜標籤
							// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式下不要展開側屜
							if(!!theSSO && theSSO.offlineMode == true) {
								$('#newDocWorkspace').removeClass("doc_desktop_hiddenpage").addClass("doc_desktop_sidepage");
							}
							
							theSSO.MP.changeNewDocSidePaneTitle(false);

							// 2020.2.13 - 1080782 Eric, merge MOI 1070309 - add 'closeRslt' for 儲存後發文...
							if (typeof closeRslt=='object' && 
							    typeof closeRslt.postAction!=='undefined' && closeRslt.postAction!==null) {
									closeRslt.postAction(closeRslt.param);
							}

							//$.mobile.changePage($('#home'), {transition: "slide", reverse: true, changeHash: false});
						}, 200);
					})
					.always(function() {
						SSOUtil.loading("hide");
					});
					}	// 1110318 Raymond 1101578 End of 關閉公文前檢核若沒有開啟編輯中附件時繼續處理後續作業
				}
				else {// 2014.2.27 - Raymond, 取消changeHash會造成關閉鈕的data-rel=back無效, 改用changePage返回主頁
					SSOUtil.loading("hide");

					// ToDo: 2020.12.11 - 1090786 Eric, 若公文未正常閞啟, 使用者按關閉鍵, 回MP後仍應顯示待辦清單
					//  Tip: for 公文簽辦 $('#todolistContainer').removeClass('doc_desktop_hiddenpage').addClass('doc_desktop_showpage');
					//       for 公文調閱 $('#aki800ListWorkspace').removeClass('doc_desktop_hiddenpage').addClass('doc_desktop_showpage');
					
					/* 2016.8.27 - 直接關閉AOL即可 */
					$('#docWorkPane').hide()
					theSSO.MP.changeNewDocSidePaneTitle(false);
				}
			});
			
			// 2016.10.11 非創稿, 直接新增文稿
			theAOL.newDraftFromTmpl = function(draftIdx) {
				if(theAOL.getCurrFolio()) {
					theAOL.getCurrFolio().newDraftFromTmpl({
						success: function(draftIdx) {
							var fv = $home.find("#leftPart .viewPort").data("view");
							fv.updateDraftTags(draftIdx);
							// 1130809 Raymond 1130313 合併1111007(1100394), 從MP新增文稿後關閉側屜
							if($('#newDocWorkspace').hasClass('doc_desktop_sidepage')) {
								$('#newDocWorkspace .dragControlPane .drag_to_close').trigger('click');
							}
						},
						error: function(errorText) {
							alert(errorText);
						}
					})
				}
				else
					alert("目前未開啟公文, 無法新增文稿");
			}
			
			// 2016.8.8 新增指定參照窗格開啟功能
			theAOL.reference = function(stgName) {
				var sDocObj = localStorage[stgName];
				var odwdcm = null, comNo = null;
				
				var bDisplayFromOrg = false;
				//1111124	Leslie[1110920]	新增可設定顯示併案的來文機關
				if(theCustom.getCustomSet('DocTagWithFromOrgName') == 'Y'){
					bDisplayFromOrg = true;
					$("#aol #sidebar").addClass('Tag_FromOrg');
					$("#aol #iso").addClass('Tag_FromOrg');
				}else{
					$("#aol #sidebar").removeClass('Tag_FromOrg');
					$("#aol #iso").removeClass('Tag_FromOrg');
				}
				
				if(sDocObj && sDocObj.length) {
					theAOL.refDocObj = new MPDocObj(sDocObj);
					
					// 2014.4.1 - Raymond, 刪除前一筆文的子文標籤
					if($("#aol #tabbar2 > ul > li").length > 1)
						$("#aol #tabbar2 > ul > li:not(:first)").remove();
					// 2014.3.28 - Raymond, 若有子文則展開在左側邊欄的公文夾頁籤
					odwdcm = theAOL.refDocObj.getODWDCM();
					if(odwdcm && "COM_NO" in odwdcm) {
						comNo = theAOL.refDocObj.get('ODWDCM', 'COM_NO');
						theLogger.log(Object.prototype.toString.call(comNo));
						if(Object.prototype.toString.call(comNo) === "[object Array]") {
							$.each(comNo, function(i, comDoc) {
								var docNo = theAOL.refDocObj.get('ODWMSG', 'DOC_NO');
								if(comDoc.COM_DOC_NO == docNo) {
									// 這筆是母文, bypass
									return;
								}
								var title = "[併辦]";
								// 1060425 Raymond 1060285 修改comNo->comDoc, 併案->併陳
								//if(comNo.COM_COMBINE_TYPE == "3")
								//	title = "[併案]";
								if(comDoc.COM_COMBINE_TYPE == "3")
									title = "[併陳]";
								title += comDoc.COM_DOC_NO;
								
								//1111124	Leslie[1110920]	新增可設定顯示併案的來文機關
								if(bDisplayFromOrg && comDoc.FROMORG_NAME != '' && typeof comDoc.FROMORG_NAME == 'string')
									title += '<br>' + comDoc.FROMORG_NAME;
								
								var $ti = $("<li class='ui-block-a'><a></a></li>").appendTo("#aol #tabbar2 > ul");
								$ti.find("a")
									.attr({href: "folio_" + comDoc.COM_DOC_NO,
										"data-docno": comDoc.COM_DOC_NO})
									//1111124	Leslie[1110920]	新增可設定顯示併案的來文機關
									// .text(title)
									.html(title)
									.buttonMarkup({
										corners: false,
										shadow: false,
										theme: 'c'
									})
									.removeClass('ui-link')
									.on("click tap", function(event) {
										$(this).closest("ul").find("a").removeClass("ui-btn-active");
										$(this).addClass("ui-btn-active");
										var model = $(this).data("model");
										if(typeof model !== "undefined")
											model.refresh();
										else {
											var docNo = $(this).attr("data-docno");
											if(docNo.length > 0) {
												SSOUtil.loading("show", {text: "查詢子文..."});
												var thisElem = this;
												(new CompoundFolio(docNo)).loadDocument()
													.done(function(cf) {
														SSOUtil.loading("hide");
														$(thisElem).data("model", cf);
													})
													.fail(function(errorText) {
														SSOUtil.loading("hide");
														alert(errorText);
													});
											}
										}
									});
							});
						}
					}
					// 1091229 Raymond 信保序131 修正信保特殊模式公文在參照窗格開啟歷史檢視模式時因無ODWDCM可判斷為特殊模式而在翻頁時有文稿頁籤未正確定位的問題
					if(!odwdcm && theAOL.refDocObj.docNo == theAOL.docObj.docNo) {
						theAOL.refDocObj.ODWDCM = theAOL.docObj.ODWDCM;	// 複製目前公文的ODWDCM到參照公文
					}
				}
				(new FolioModel()).init(theAOL.refDocObj, {
					readOnly: true,//(uiState)?uiState.readOnly:_getUIStatus().readOnly,	// 2015.9.17 新增唯讀模式, 2015.10.15 改用uiState.readOnly
					isRefDoc: true,	// 2016.8.8 新增參照公文旗標
					hideODC010: true,//((arguments.length > 1)?arguments[1]:false),	// 2016.8.12 reference()可選擇性多傳入第2參數hideODC010, true表示要隱藏基本資料頁籤
					isRefOfCurrFolio: (stgName == "working_doc_obj"),	// 2016.8.18 新增判斷是否為主文的歷史檢視複本
					success: function() {
						theLogger.log(this);
						theLogger.log("currFolio:" + this.getDocNo());
						//AlternativeLogger.upload();	// 2016.1.19 開啟成功先上傳一次
						// 2013.9.13 - Raymond, 改寫getCurrFolio方法指向新增的Model物件
						var _model = this;
						theAOL.getRefFolio = function() {	// 2016.8.9 新增getRefFolio表示參照公文
							return _model;
						};
						
						new FolioView(this, $home.find("#rightPart .viewPort"));	// 2015.10.15 判斷是否readOnly改吃FolioModel.readOnly()
						
						TCControl.associate($home.find("#rightPart .viewPort"), $home.find("#tcControl2 select"));
						
						$home.find("#rightPart #zoomControl2 select").trigger('change');	// 2016.6.2 自動套用預設/當前的縮放比例
					
						// 2013.9.12 - Raymond, #btnSave、#btnSubmit、#btnClose等按鈕handler搬到reload方法外面
						//                      因為每成功初始化公文一次, handler會addEventListener多一次
						
						//1111124	Leslie[1110920]	新增可設定顯示併案的來文機關
						var title = theAOL.refDocObj.docNo || "[尚未取號]";
						if(bDisplayFromOrg && theAOL.refDocObj.fromOrg != '' && typeof theAOL.refDocObj.fromOrg == 'string')
							title += '<br>' + theAOL.refDocObj.fromOrg;
						
						// 2013.9.12 - Raymond, 重開時設定公文夾頁籤顯示的文號
						// 2014.4.2 - Raymond, 增加記錄model物件於A
						// 2016.7.26 - Raymond, 頁籤文字因jQM4.5調整成直接設定A的內容
						$("#aol #tabbar2 ul li:first").find("a").attr({
								href: "folio_" + theAOL.refDocObj.msgId,
								id: "folio_" + theAOL.refDocObj.msgId
							})
							//1111124	Leslie[1110920]	新增可設定顯示併案的來文機關
							// .text(theAOL.refDocObj.docNo || "[無文號]")
							.html(title)
							.data("model", this);
						// 2016.8.18 切換顯示參照窗格
						(new RefViewController($home.find("#mainContent"))).open();
					},
					error: function(errorText) {
						theLogger.error(errorText);
						SSOUtil.loading("show", {theme:"e", text:errorText, textVisible:true});
					}
				});
			}
			
			// 2014.5.19 - Raymond, 初始化參照檢視功能
			var refViewCtlr = new RefViewController($home.find("#mainContent"));
			
			// 2022.1.19 - 1101562 Eric
			var toggoleMobileUI = false;
			$("#refView").on("click", function(event) {
				// 1110415 Raymond 1101578 關閉參照窗格公文前檢核是否有開啟編輯中附件未關閉
				if(!!window.theAttEditMgr && ("getRefFolio" in theAOL) && !!theAOL.getRefFolio() && refViewCtlr.currState == 2) {	// 目前是開啟參照窗格狀態, 所以點擊按鈕是要關閉
					theAttEditMgr.query()
					.done(function(res) {
						if(res >= "1.0") {	// query成功會回傳版號, 目前只發布了1.0版
							var docNo = theAOL.getRefFolio().getDocNo() || (theAOL.getRefFolio().getDocObj().isDraft?theAOL.getRefFolio().getOwnUserId():"USER");	// 未取文號的草稿以OWN_USER_ID為文號	1110503 Raymond 考試院序66 修正typo getRefolio ->getRefFolio
							var dfds = [], hasOpenedAtt = false;
							for(rev in theAOL.getRefFolio().getSignFolder().getRevisions()) {
								var msgid = rev.substr(rev.lastIndexOf("_") + 1);
								console.log("queryAttStat of rev:" + msgid);
								dfds.push(theAttEditMgr.queryAttStat(docNo, msgid, theAOL.sessionId, "*", "*")
									.done(function(stat) {
										if(stat.attCount == 1 && stat.attInfo.status == 3) {	// 唯讀附件開啟中
											hasOpenedAtt = true;
											console.log("尚有開啟中附件");
										}
										else if(stat.attCount > 1 && Array.isArray(stat.attInfo)) {
											for(var i=0; i<stat.attInfo.length; i++) {	// 1110323 Raymond fix IE不支援 for(ai of stat.attInfo) 語法
												var ai = stat.attInfo[i];
												if(ai.status == 3) {	// 唯讀附件開啟中
													hasOpenedAtt = true;
													console.log("尚有開啟中附件");
													break;
												}
											}
										}
									})
									.fail(function() {
										console.warn("queryAttStat failed!", arguments);
									})
								);
							}
							$.when.apply(this, dfds).always(function() {
								if(hasOpenedAtt)
									alert("尚有開啟中附件, 請關閉編輯程式再繼續!");
								else
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
				function proceedLast() {
				// 2014.8.25 - Raymond, 生成副面板內容改在onshow被呼叫再執行
				refViewCtlr.toggle(function(target) {
					// 2022.1.19 - 1101562 Eric, 隱藏前記錄是否使用MobileUI
					if ($home.find("#leftPart #moGrpUtil").is(':visible')) {
						toggoleMobileUI = true;
					}

					// 1100329 Raymond 1090927 新增判斷若是小螢幕模式則隱藏儲存傳送區及傳送對象區
					$home.find("#leftPart #moGrpUtil").hide();
					$home.find("#leftPart #moSubmitPanel").hide();
					// 1111025 Raymond 1110864 合併1101468, 展開參照窗格時自動隱藏簽辦意見窗格
					$home.find("#leftPart #isoContainer").removeClass("showSidePanel");
					$home.find("#leftPart #isoContainer").css("margin-right", "");
					
					// 1110422 Raymond 1110318 修正先在主頁開啟一筆線上簽核公文, 再由AKI800查詢開啟另一筆線上簽核公文並用DocView開啟後, 再於主頁開啟參照窗格但載入的是用DocView開啟的那一筆公文的問題
					localStorage.working_doc_obj = theAOL.sDocObj;	// working_doc_obj重新寫入目前的DocObj資料
					
					//localStorage["reference_doc_obj"] = ?
					if(!("getRefFolio" in theAOL) || !theAOL.getRefFolio()) {	// 2016.8.18 目前未開啟任何參照公文, 直接開啟主文的歷史檢視複本
						// 1060911 Raymond 1060739 紙本簽核不可歷史檢視
						if(theAOL.docObj.signType == "P")
							alert("紙本簽核公文無法進行歷史檢視功能!");
						else
							theAOL.reference("working_doc_obj");
					}
					else if(!theAOL.getRefFolio().isRefOfCurrFolio() ||	// 2016.8.18 目前參照公文非主文的歷史檢視複本, 詢問使用者是否要顯示歷史檢視複本
						theAOL.getCurrFolio().getDocNo() != theAOL.getRefFolio().getDocNo()) {	// 2016.11.29 改開別筆公文時, 參照公文不會換的問題
						// 1060911 Raymond 1060739 紙本簽核不可歷史檢視
						if(theAOL.docObj.signType == "P")
							alert("紙本簽核公文無法替換目前參照窗格的公文進行歷史檢視功能!");
						// 1101025 Raymond 1101259 修正第2次開啟參照窗格的歷史檢視時, 前一筆歷史檢視公文不會換掉的問題
						// 1090818 Raymond 1090409 南護要求繕校總發等角色開啟參照窗格時, 若參照窗格中已有別筆參照公文則不要詢問, 直接替換成本文的歷史檢視
						//else if(theAOL.docObj.ownRoleId.match(/OD92|OD93|OD94/)) {
						else if(!!theAOL.docObj.ownRoleId && theAOL.docObj.ownRoleId.match(/OD92|OD93|OD94/)) {
							theLogger.log("ownRoleId(" + theAOL.docObj.ownRoleId + ")符合不需詢問直接替換成本文的歷史檢視模式的角色條件");
							theAOL.getRefFolio().closeView();
							theAOL.reference("working_doc_obj");
						}
						// 1150107 Raymond 1141585 新增檢核環境變數「AOL_REFVIEW_NO_CONFIRM」若設為"Y", 則取消詢問訊息, 直接替換顯示本件公文的歷史檢視畫面
						else if(theSSO.User.EnvSettings.get("AOL_REFVIEW_NO_CONFIRM") == "Y") {
							theLogger.log("檢核環境變數「AOL_REFVIEW_NO_CONFIRM」設定為'Y', 不需詢問直接替換成本文的歷史檢視模式");
							theAOL.getRefFolio().closeView();
							theAOL.reference("working_doc_obj");
						}
						else {
							var param = {title: "參照檢視",
								message: "目前已有另一筆參照公文位於參照窗格，是否替換成本文的歷史檢視模式？",
								buttons: [
									{	name: "是",
										action: function() {
											theLogger.log("使用者選擇替換顯示主文的歷史檢視模式!");
											// 1060911 Raymond 1060739 更替目前參照公文前, 先關閉FolioView, 以免按鈕會Bind 2次以上問題
											theAOL.getRefFolio().closeView();
											theAOL.reference("working_doc_obj");
										}
									},
									{	name: "否",
										action: function() {
											theLogger.log("使用者選擇不要替換顯示主文的歷史檢視模式!");
										}
									},
									{	name: "取消",
										action: function() {
											theLogger.log("使用者選擇取消!");
											refViewCtlr.close();
										}
									}
								],
								beforeShow: function() {
									$(".contentPane").css("overflow", "hidden");	// 提示訊息顯示後, 禁止文稿頁面捲動
								},
								afterHide: function() {
									$(".contentPane").css("overflow", "");	// 提示訊息關閉後, 恢復文稿頁面捲動
								}
							};
							$.confirm(param);
						}
					}
					else if(theAOL.getRefFolio().getMsgId() != theAOL.getCurrFolio().getMsgId()) {	// 1061006 Raymond 修正當參照公文與簽辦公文同文號時, 進一步檢查MsgId是否一致, 不一致則重新下載參照公文
						theLogger.warn("參照檢視已有相同文號公文, 但MsgId(" + theAOL.getRefFolio().getMsgId() + ")與目前簽辦公文的MsgId(" + theAOL.getCurrFolio().getMsgId() + ")不一致, 直接關閉目前參照公文開啟簽辦公文的參照內容");
						if(theAOL.docObj.signType == "P")
							alert("紙本簽核公文無法進行歷史檢視功能!");
						else {
							theAOL.getRefFolio().closeView();
							theAOL.reference("working_doc_obj");
						}
					}
				},
				// 1100329 Raymond 1090927 新增關閉參照窗格事件處理函式, 若是小螢幕模式則恢復顯示儲存傳送區及傳送對象區
				function() {
					// 2022.1.19 - 1101562 Eric, @PC參閱窗格開啟時原解析度<1200, 使用者異動browser解析度>1200後再關閉參閱窗格, AOL上方UI未回復問題修正.
					// 1100715 Raymond 1090927 修正iPad下(非SDLMode)隱藏傳送對象區後不會恢復的問題
					//if(window.SDLMode) {
					if(theAOL.docObj.signType == "E" &&
						((!!theAOL.docObj.uiState && theAOL.docObj.uiState.mobileDeviceUI) || 
						 (!theAOL.docObj.uiState && _getMobileDeviceUI(theAOL.docObj)) || 
						 toggoleMobileUI)) { // 2022.1.19 - 1101562 Eric
						$home.find("#leftPart #moGrpUtil").show();
						$home.find("#leftPart #moSubmitPanel").show();
						// 2022.1.19 - 1101562 Eric
						if (toggoleMobileUI) {
							toggoleMobileUI = false;
						}
					}
					// 1140515 Raymond 1140474 修改記憶簽辦意見窗格是否顯示的變數從localStorage(show_sign_comment_panel)改為UserEnvSetting(USER_SHOW_SIGN_COMMENT_PANEL)
					// 1111027 Raymond 1110864 合併1101468, 當啟用「顯示我的最終意見」功能時, 關閉參照窗格時自動展開簽辦意見窗格
					//if(localStorage["show_sign_comment_panel"] == "true" || (theSSO.User.EnvSettings.get("AOL_SHOW_MY_FINAL_COMMENT") == "Y" && localStorage["show_sign_comment_panel"] != "false")) {	// 只要沒有手動關閉過, 簽辦意見窗格就是預設顯示
					if(showSignCommentPanel == "true" || (theSSO.User.EnvSettings.get("AOL_SHOW_MY_FINAL_COMMENT") == "Y" && showSignCommentPanel != "false")) {	// 只要沒有手動關閉過, 簽辦意見窗格就是預設顯示
						$home.find("#leftPart #isoContainer").addClass("showSidePanel");
						$home.find("#leftPart #isoContainer").one("transitionend", function() {	// 動畫結束後再依據目前解析度下margin-right空出多少空間, 調整sidePanel的寬度
							var mr = $(this).css("margin-right");
							theLogger.log("#isoContainer.marginRight = " + mr);
							if(!!mr) {
								$home.find("#leftPart #sidePanel").width(mr);
								if(parseFloat(mr) < 200) {	// 1111025 Raymond 1110864 合併1101468, 修正行動裝置上關閉後開啟簽辦意見窗格時, 右側margin空間不足200px, 設定顯示簽辦意見窗格的最小寬度200px
									var cntrW = "200px";
									$home.find("#leftPart #sidePanel").width(cntrW);
									$home.find("#leftPart #isoContainer").css("margin-right", cntrW);
								}
							}
						});
					}
				});
				}	// 1110415 Raymond 1101578 end of function proceedLast()
			});
			
			// 2015.1.28 - Raymond, 關閉參照窗格
			$("#btnCloseRefView").on("click", function(event) {
				// 1110415 Raymond 1101578 關閉參照窗格公文前檢核是否有開啟編輯中附件未關閉
				if(!!window.theAttEditMgr && !!theAOL.getRefFolio()) {
					theAttEditMgr.query()
					.done(function(res) {
						if(res >= "1.0") {	// query成功會回傳版號, 目前只發布了1.0版
							var docNo = theAOL.getRefFolio().getDocNo() || (theAOL.getRefFolio().getDocObj().isDraft?theAOL.getRefFolio().getOwnUserId():"USER");	// 未取文號的草稿以OWN_USER_ID為文號	1110503 Raymond 考試院序66 修正typo getRefolio ->getRefFolio
							var dfds = [], hasOpenedAtt = false;
							for(rev in theAOL.getRefFolio().getSignFolder().getRevisions()) {
								var msgid = rev.substr(rev.lastIndexOf("_") + 1);
								console.log("queryAttStat of rev:" + msgid);
								dfds.push(theAttEditMgr.queryAttStat(docNo, msgid, theAOL.sessionId, "*", "*")
									.done(function(stat) {
										if(stat.attCount == 1 && stat.attInfo.status == 3) {	// 唯讀附件開啟中
											hasOpenedAtt = true;
											console.log("尚有開啟中附件");
										}
										else if(stat.attCount > 1 && Array.isArray(stat.attInfo)) {
											for(var i=0; i<stat.attInfo.length; i++) {	// 1110323 Raymond fix IE不支援 for(ai of stat.attInfo) 語法
												var ai = stat.attInfo[i];
												if(ai.status == 3) {	// 唯讀附件開啟中
													hasOpenedAtt = true;
													console.log("尚有開啟中附件");
													break;
												}
											}
										}
									})
									.fail(function() {
										console.warn("queryAttStat failed!", arguments);
									})
								);
							}
							$.when.apply(this, dfds).always(function() {
								if(hasOpenedAtt)
									alert("尚有開啟中附件, 請關閉編輯程式再繼續!");
								else
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
				function proceedLast() {
				// 1100329 Raymond 1090927 新增關閉參照窗格事件處理函式, 若是小螢幕模式則恢復顯示儲存傳送區及傳送對象區
				//refViewCtlr.close();
				refViewCtlr.close(function() {
					// 1100715 Raymond 1090927 修正iPad下(非SDLMode)隱藏傳送對象區後不會恢復的問題
					//if(window.SDLMode) {
					if(theAOL.docObj.signType == "E" &&
						((!!theAOL.docObj.uiState && theAOL.docObj.uiState.mobileDeviceUI) || 
						 (!theAOL.docObj.uiState && _getMobileDeviceUI(theAOL.docObj)) ||
						 toggoleMobileUI)) {  // 2022.1.19 - 1101562 Eric
						$home.find("#leftPart #moGrpUtil").show();
						$home.find("#leftPart #moSubmitPanel").show();
						// 2022.1.19 - 1101562 Eric
						if (toggoleMobileUI) {
							toggoleMobileUI = false;
						}
					}
					// 1140515 Raymond 1140474 修改記憶簽辦意見窗格是否顯示的變數從localStorage(show_sign_comment_panel)改為UserEnvSetting(USER_SHOW_SIGN_COMMENT_PANEL)
					// 1111027 Raymond 1110864 合併1101468, 當啟用「顯示我的最終意見」功能時, 關閉參照窗格時自動展開簽辦意見窗格
					//if(localStorage["show_sign_comment_panel"] == "true" || (theSSO.User.EnvSettings.get("AOL_SHOW_MY_FINAL_COMMENT") == "Y" && localStorage["show_sign_comment_panel"] != "false")) {	// 只要沒有手動關閉過, 簽辦意見窗格就是預設顯示
					if(showSignCommentPanel == "true" || (theSSO.User.EnvSettings.get("AOL_SHOW_MY_FINAL_COMMENT") == "Y" && showSignCommentPanel != "false")) {	// 只要沒有手動關閉過, 簽辦意見窗格就是預設顯示
						$home.find("#leftPart #isoContainer").addClass("showSidePanel");
						$home.find("#leftPart #isoContainer").one("transitionend", function() {	// 動畫結束後再依據目前解析度下margin-right空出多少空間, 調整sidePanel的寬度
							var mr = $(this).css("margin-right");
							theLogger.log("#isoContainer.marginRight = " + mr);
							if(!!mr) {
								$home.find("#leftPart #sidePanel").width(mr);
								if(parseFloat(mr) < 200) {	// 1111025 Raymond 1110864 合併1101468, 修正行動裝置上關閉後開啟簽辦意見窗格時, 右側margin空間不足200px, 設定顯示簽辦意見窗格的最小寬度200px
									var cntrW = "200px";
									$home.find("#leftPart #sidePanel").width(cntrW);
									$home.find("#leftPart #isoContainer").css("margin-right", cntrW);
								}
							}
						});
					}
				});
				SSOUtil.loading("hide");	// 2016.9.2 關閉時一併關閉錯誤訊息
				}	// 1110415 Raymond 1101578 end of function proceedLast()
				return false;
			});
		})
		.fail(function(errorText) {
			theLogger.error("error!");
			theLogger.error(errorText);
			// 1141003	Leslie[1141264]	 修正載入異常後的錯誤訊息處理
			// alert(errorText);
			if($("#leftPart").closest("#viewDoc").length == 0)
				alert(`開啟AOL模組時發生異常[${errorText}]，請截取當前畫面並通知系統管理員，並依指示收集相應異常紀錄。`)
			else
            	alert(`開啟AOL模組時發生異常[${errorText}]，請截取當前畫面並關閉視窗再試一次，若仍無法正常開啟，請通知系統管理員以協助收集相應異常紀錄。`)
		});
		
		// 1060425 Raymond 1060276 重設/記憶目前公文的UI的show/hide狀態
		function resetUI(mdl, flag) {
			// 可切換顯示/隱藏的UI元素, 
			var uis = [
				'#aol #chkApprove',
				'#aol #chkReject',
				'#aol #moChkApprove',
				'#aol #moChkReject',
				'#aol #pcTxList',
				'#aol #pcSubmit',
				'#aol #pcUtil',
				'#aol #moGrpUtil',
				'#aol #moSubmitPanel',
				'#btnSave',
				'#moBtnSave',
				'#transPanel',
				'#moSubmitPanel',
				'#btnCloseR',
				'#moGrpUtil',
				'#btnPopupSetting',
				'#aol a#btnCoworkProcSetting'
			];
			
			if(flag == "save")
				mdl.visibleUI = [];	// 記憶目前UI於FolioModel的visibleUI陣列中
			if(flag == "save") {
				var allHidden = true;	// 1090221 Raymond 1081090 偵測儲存UI狀態記錄時是否有異常
				for(var i=0; i<uis.length; i++) {
					if($(uis[i]).is(":visible")) {
						// 1090220 Raymond 1081090 區分工具列相關LOG
						//theLogger.warn("resetUI:記憶'" + uis[i] + "'(顯示)");
						theLogger.warn("[1081090] resetUI:記憶'" + uis[i] + "'(顯示)");
						mdl.visibleUI.push(1);	// 未隱藏的元素記為1
						allHidden = false;
					}
					else {
						// 1090220 Raymond 1081090 區分工具列相關LOG
						//theLogger.warn("resetUI:記憶'" + uis[i] + "'(隱藏)");
						theLogger.warn("[1081090] resetUI:記憶'" + uis[i] + "'(隱藏)");
						mdl.visibleUI.push(0);	// 隱藏的元素記為0
					}
				}
				if(allHidden) {
					theLogger.warn("[1081090] Toolbar UI全部隱藏, 應為異常, 記錄uiState、uiParam及各UI元素目前Style");
					theLogger.log("[1081090] " + JSON.stringify(theAOL.docObj.uiState));
					theLogger.log("[1081090] " + JSON.stringify(theAOL.docObj.uiParam));
					for(var i=0; i<uis.length; i++) {
						theLogger.log("[1081090] " + $(uis[i]).get(0).outerHTML);
					}
				}
			}
			else if(flag == "restore") {
				if("visibleUI" in mdl && SSOUtil.typeOf(mdl.visibleUI) == "array") {
					for(var i=0; i<uis.length; i++) {
						if(mdl.visibleUI[i] == 1) {
							// 1090220 Raymond 1081090 區分工具列相關LOG
							//theLogger.warn("resetUI:顯示'" + uis[i] + "'");
							theLogger.warn("[1081090] resetUI:顯示'" + uis[i] + "'");
							$(uis[i]).show();
						}
						else {
							// 1090220 Raymond 1081090 區分工具列相關LOG
							//theLogger.warn("resetUI:隱藏'" + uis[i] + "'");
							theLogger.warn("[1081090] resetUI:隱藏'" + uis[i] + "'");
							$(uis[i]).hide();
						}
					}
				}
				else {	// 未記憶UI狀態的公文一律隱藏
					theLogger.warn("[1081090] 此公文(" + (("getDocObj" in mdl)?mdl.getDocObj().docNo:("model" in mdl)?mdl.model.getDocObj().docNo:"null") + ")未記憶UI狀態, 一律隱藏");
					for(var i=0; i<uis.length; i++) {
						// 1090220 Raymond 1081090 區分工具列相關LOG
						//theLogger.warn("resetUI:隱藏'" + uis[i] + "'");
						theLogger.warn("[1081090] resetUI:隱藏'" + uis[i] + "'");
						$(uis[i]).hide();
					}
				}
			}
		}
		
		// 2020.1.7 - 1081090 Eric, 開啟第一筆公文前, 儲存AOL上方工具列尚未異動過之原始HTMLDom Element style狀態
		if ('defaultAOLToolbarCSSSet' in theSSO && typeof theSSO.defaultAOLToolbarCSSSet!=='undefined' && theSSO.defaultAOLToolbarCSSSet!==null) {
			// 已儲存, 不再記錄!
		}
		else {
			theSSO.defaultAOLToolbarCSSSet = {};
			SSOUtil.resetAOLToolbarCSS(theSSO.defaultAOLToolbarCSSSet, 'save');
		}

		/* 2014.1.8 - Raymond, 直接在HTML中宣告data-role='listview'似乎在Mobile Safari iOS 7會有問題, 改成在pageinit後初始化
		$home.find(".tags ul").eq(2).listview();	// 似乎要從下到上套用才行
		$home.find(".tags ul").eq(1).listview();
		$home.find(".tags ul").eq(0).listview();*/
	
		var screen = $("<div>", {"class": "ui-popup-screen ui-screen-hidden"} ).appendTo( $home ), holding,
			listbox = $("<div class='ui-popup-container ui-selectmenu-hidden'><div class='ui-selectmenu ui-popup ui-overlay-shadow ui-corner-all ui-body-a'/></div>").insertAfter(screen),
			list = $( "<ul>", {
				"class": "ui-selectmenu-list",
				"id": "menuFolio",
				"role": "listbox",
				"aria-labelledby": "btnFolio",
				"data-divider-theme": "e"
			}).attr( "data-theme", "c" ).appendTo( listbox.children().eq(0) ),
			holding = false;
		function closeMenu() {
			screen.removeClass("in").addClass("ui-screen-hidden");
			listbox.removeClass("ui-popup-active").addClass("ui-selectmenu-hidden").removeAttr( "style" );
		}
		screen.on("tap", function() {
			closeMenu();
		});
		// 1100208 Raymond 1090927 小螢幕裝置, 調整選單高度
		if(window.SDLMode) {
			listbox.children().eq(0).css({maxHeight: (window.innerHeight - 60) + "px", overflowY: "scroll"});
		}
		
		// 2015.2.24 - 先停用設定功能
		$("#btnSetting").hide();
		/*$("#btnSetting").click(function(evt) {
			screen.height( $(document).height() ).removeClass( "ui-screen-hidden" ).addClass("in");
			list.empty().filter( ".ui-listview" ).listview( "destroy" );
			list.html("<li data-role='list-divider' tabindex='-1'><h3>設定</h3></li><li id='pen' data-icon='arrow-r' tabindex='0'><a>手寫筆設定</a></li><li data-icon='arrow-r' tabindex='0'><a>維護機關設定</a></li><li data-icon='arrow-r' tabindex='-1'><a>維護群組設定</a></li><li data-role='list-divider' tabindex='-1'><h3>工具</h3></li><li data-icon='arrow-r' tabindex='-1'><a>線上調檔</a></li>").listview();
			listbox.removeClass("ui-selectmenu-hidden").addClass("ui-popup-active").css({left: "30px", top: "50px", maxWidth: "200px", overflow: "hidden"});
			holding = true;
			
			list.find("li#pen").tap(function(evt) {
				closeMenu();
				Util.getDlg("RD-PenSetting.html").done(function($dlg) {
					
					$dlg.find("header > h1").unwrap();
					$dlg.find("footer > div").unwrap();
					
					$dlg.find("a#ok").click(function(event) {
						// TODO:
						$.modal.close();
					});
					$dlg.find("#cancel").tap(function() {
						$.modal.close();
					});
					
					var w = $home.find("#leftPart").width(),
						h = $home.find("#leftPart").height();
					theLogger.log("新增筆跡設定對話方塊, w:" + w + ",h:" + h);
					$.modal($dlg, {
						appendTo:$home.find("#leftPart"),
						overlayCss:{height:h, width:w},
						minHeight:440,
						autoResize:true,
						onShow:function() {
						}
					});
					
					$dlg.trigger("create");
				});
			});
		});*/
		
		// 2013.9.13 - Raymond, 左側邊欄的公文夾頁籤
		var $ti = $("<li><a></a></li>").appendTo("#aol #tabbar ul")
			.find("a")
			.attr({href: "folio_" + theAOL.docObj.msgId,
					id: "folio_" + theAOL.docObj.msgId})
			.text(theAOL.docObj.docNo || "[尚未取號]")	// 2016.7.20 新增無文號則顯示尚未取號
			.on("click tap", function(event) {
				event.preventDefault();
				$(this).closest("ul").find("a").removeClass("ui-btn-active");
				$(this).addClass("ui-btn-active");
				// 1060425 Raymond 修正從子文切到母文時, 應該要判斷子文是否可編輯, 而不是母文
				if(theAOL.getCurrFolio() && theAOL.getCurrFolio().enableEdit()) {
					var dm = theAOL.getCurrFolio().getCurrDraftModel();
					if(!!dm && dm.dirty() && "updateView" in dm) {
						dm.updateView();
					}
				}
				var model = $(this).data("model");
				if(typeof model !== "undefined") {// || theAOL.docObj.signType == "P") {	// 2016.6.28 新增紙本例外
					// 1060425 Raymond 修正從子文切到母文時, 應該要判斷子文是否可編輯, 而不是母文, 並移至if(typeof model !== "undefined")之前做
					/*if(model.enableEdit()) {	// 2017.1.5 新增切換公文前先重新排版
						var dm = model.getCurrDraftModel();
						if(!!dm && dm.dirty() && "updateView" in dm) {
							dm.updateView();
						}
					}*/
					if(model == theAOL.getCurrFolio()) {// || theAOL.docObj.signType == "P") {	// 2016.6.28 新增紙本例外
						//alert("same folio." + event.type);
						// 1130503 Raymond 中榮序96 新增判斷機關暱稱為TVGH(中榮)時, 啟用「機案功能」按鈕, 原本的文號頁籤不顯示選單
						if(SSO_CONFIG.OrgNickName != "TVGH")
						onclickFolio.call(this, event);	// 2015.6.3 若點擊同一個文號頁籤第2次則開啟選單
					}
					else {
						if(theAOL.getCurrFolio())	// 2016.8.23 FIX左右翻頁按鈕會bind 2次以上問題
							theAOL.getCurrFolio().closeView();
						model.setAsCurr();	// 2016.8.23 FIX子文開啟問題
						
						// 1090220 Raymond 1081090 從子文點回母文時, 先檢查第一次saveUI的記錄是否存在, 不存在可能表示未執行到saveUI所導致
						var stopRestore = false;
						if(!model.visibleUI || SSOUtil.typeOf(model.visibleUI) != "array" || model.visibleUI.length == 0) {
							theLogger.warn("[1081090] [點擊母文] 無前次儲存的工具列顯示狀態記錄, 重新執行更新工具列");
							if(!theAOL.docObj.uiState) {
								theLogger.warn("[1081090] [點擊母文] 無uiState物件, 重新取得");
								theAOL.docObj.uiState = _getUIStatus(theAOL.docObj, theAOL.docObj.uiParam);
							}
							SSOUtil.updateAOLTopToolbar(theAOL.docObj.uiState, theAOL.docObj.uiParam, true);
							stopRestore = true;
						}
						else {
							// 若有model.visibleUI, 再檢查一次是否是異常的全部隱藏, 若是也重跑一次updateTopToolbar
							var allHidden = true;
							for(var i=0, n=model.visibleUI.length; i<n; i++) {
								if(model.visibleUI[i] == 1) {
									allHidden = false;
									break;
								}
							}
							if(allHidden) {
								theLogger.warn("[1081090] [點擊母文] 前次儲存的工具列顯示狀態記錄全為隱藏, 應為異常, 重新執行更新工具列");
								if(!theAOL.docObj.uiState) {
									theLogger.warn("[1081090] [點擊母文] 無uiState物件, 重新取得");
									theAOL.docObj.uiState = _getUIStatus(theAOL.docObj, theAOL.docObj.uiParam);
								}
								SSOUtil.updateAOLTopToolbar(theAOL.docObj.uiState, theAOL.docObj.uiParam, true);
								stopRestore = true;
							}
						}
						
						new FolioView(model, $("#aol #leftPart .viewPort"));
						
						// 1120224 Raymond 1111225 啟用簽核意見窗格功能時, 從子文點回母文時要重新整理簽核意見窗格
						if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_PANEL") == "Y" && theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") != "Y")
							_setupComments($("#leftPart #sidePanel #signCmtList"));
						
						// 1090224 Raymond 1081090 從子文點回母文時, 檢查若saveUI記錄不存在或異常則重新updateAOLTopToolbar, 正常則restoreUI
						if(!stopRestore)
						// 1060425 Raymond 1060276 重設該母文的UI狀態
						resetUI(model, "restore");
					}
				}
				else {
					theLogger.error("未載入母文?");
				}
				return false;
			});
		// 2016.4.14 - 參照視窗的母子文頁籤
		var $ti2 = $("<li><a></a></li>").appendTo("#aol #tabbar2 ul")
			.find("a")
			/*.attr({href: "reffolio_" + theAOL.refDocObj.msgId,
				   id: "reffolio_" + theAOL.refDocObj.msgId})
			.text(theAOL.refDocObj.docNo || "[無文號]")	// 2016.8.9 新增無文號則顯示無文號*/
			.on("click", function(event) {
				$(this).closest("ul").find("a").removeClass("ui-btn-active");
				$(this).addClass("ui-btn-active");
				var model = $(this).data("model");
				if(typeof model !== "undefined") {
					if(model == theAOL.getRefFolio() || theAOL.refDocObj.signType == "P") {	// 2016.8.9 新增getRefDoc及紙本例外
						//alert("same folio");
						// 1130503 Raymond 中榮序96 新增判斷機關暱稱為TVGH(中榮)時, 啟用「機案功能」按鈕, 原本的文號頁籤不顯示選單
						if(SSO_CONFIG.OrgNickName != "TVGH")
						onclickRefFolio.call(this, event);	// 2015.12.28 若點擊同一個文號頁籤第2次則開啟選單
					}
					else
						new FolioView(model, $("#aol #rightPart .viewPort"));
				}
				else {
					theLogger.error("未載入母文?");
				}
			});
		
		$("#aol #tabbar, #aol #tabbar2").tabs({grid:"solo", afterTabShow:function(event, ui) {
			try {
				//ui.currentContent.data("dman").show();
			}
			catch(e) {
				theLogger.error("afterTagShow Exception! " + e.message);
			}
		}});
		
		// 2016.5.3 - Raymond, 改成function在上面#tabbar加入文號按鈕被觸發click時叫用
		function onclickFolio(evt) {
			
			// 2016.5.3 - Raymond, 公文選單依以下清單處理
			// id - HTML元素ID, 若是divider則表示分隔標題
			// name - 選單功能名稱或分隔標題名稱
			// vis - 是否顯示此選單項目的callback function name, 僅比對nsEditor命名空間內有無此名稱的function, 有且呼叫成功後回傳true, 才會顯示
			// fn - 執行此選單項目功能的callback function name, 僅比對nsEditor命名空間內有無此名稱的function, 有才呼叫
			// icon - 此選單項目名稱後面顯示的圖示
			// chkStat - 2016.11.2 新增, 若icon是check, 表示checkbox, chkStat為取得核取狀態的callback function name, 僅比對nsEditor命名空間內有無此名稱的function, 有才呼叫
			// 項目順序可依客戶需求調整
			var menuItems = [
				//{id:"viewRefAtt",	name:"參考附件",		vis:"onViewRefAttVisible",	fn:"onViewRefAtt",	icon:"arrow-r",	chkStat: null},
				{id:"importFile",	name:"開啟舊檔",		vis:"onImportFileVisible",	fn:"onImportFile",	icon:"arrow-r",	chkStat: null},
				{id:"exportFile",	name:"另存整份公文",	vis:"onExportFileVisible",	fn:"onExportFile",	icon:"arrow-r",	chkStat: null},	// 2016.11.23 更改指令名稱
				{id:"exportAtt",	name:"另存所有附件",	vis:"onExportAttVisible",	fn:"onExportAtt",	icon:"arrow-r",	chkStat: null},	// 1111122 Leslie[1110863]	新增下載所有附件子視窗
				{id:"reqDocNo",		name:"創稿號",			vis:"onReqDocNoVisible",	fn:"onReqDocNo",	icon:"arrow-r",	chkStat: null},
				{id:"changePpr",	name:"轉紙本簽核",		vis:"onChangePprVisible",	fn:"onChangePpr",	icon:"arrow-r",	chkStat: null},
				{id:"adjustOrder",	name:"自訂文稿顯示順序",vis:"onAdjustOrderVisible",	fn:"onAdjustOrder",	icon:"arrow-r",	chkStat: null},
				{id:"copyAll",		name:"複製所有稿件",	vis:"onCopyAllVisible",		fn:"onCopyAll",		icon:"false",	chkStat: null},
				{id:"pasteNew",		name:"貼上稿件(新增)",	vis:"onPasteNewVisible",	fn:"onPasteNew",	icon:"false",	chkStat: null},
				{id:"updateTAType",	name:"校正報送案別",	vis:"onUpdateTATypeVisible",fn:"onUpdateTAType",icon:"false",	chkStat: null},	// 1111124 Raymond 1110881 新增校正報送案別功能
				{id:"importTA",		name:"匯入銓敘系統文稿",vis:"onImportTAVisible",	fn:"onImportTA",	icon:"false",	chkStat: null},	// 1111011 Raymond 1110885 新增匯入銓敘系統文稿功能
				{id:"printFolio",	name:"列印簽核文件",	vis:"onPrintFolioVisible",	fn:"onPrintFolio",	icon:"arrow-r",	chkStat: null},				
				{id:"edt411",		name:"公文續管",		vis:"onOpenEDT411Visible",	fn:"onOpenEDT411",	icon:"arrow-r",	chkStat: null}, // 1140722	Leslie[1140808]	新增選單「公文續管」可開啟EDT411
				{id:"setReapply",	name:"補陳",			vis:"onSetReapplyVisible",	fn:"onSetReapply",	icon:"check",	chkStat: "onSetReapplyState"},	// 2016.12.15 (鐵工局客製)補呈是checkbox
				{id:"reViewSet",	name:"指定回閱",		vis:"onReViewSetVisible",	fn:"onOpenEDT010",	icon:"arrow-r",	chkStat: null},	//1130514	Leslie[中榮序106]	公文製作頁面功能選單，位置調整需求(指定回閱)
				{id:"reqReview",	name:"回閱",			vis:"onReqReviewVisible",	fn:"onReqReview",	icon:"check",	chkStat: "onReqReviewState"},	// 2016.11.2 回閱是checkbox
				{id:"reserveSO",	name:"保留簽署物件",	vis:"onReserveSOVisible",	fn:"onReserveSO",	icon:"check",	chkStat: "onReserveSOState"},	// 2016.11.10 保留簽署物件是checkbox
				//{id:"viewGuide",	name:"導覽",			vis:"onViewGuideVisible",	fn:"onViewGuide",	icon:"arrow-r",	chkStat: null}, //1090929 Kevin 1090729 因應弱掃廢除未使用功能
				//{id:"viewHistory",	name:"流程檢視",		vis:"onViewHistoryVisible",	fn:"onViewHistory",	icon:"arrow-r",	chkStat: null}, //1090929 Kevin 1090729 因應弱掃廢除未使用功能
				{id:"viewRef",		name:"對照檢視窗格",	vis:"onViewRefVisible",		fn:"onViewRef",		icon:"arrow-r",	chkStat: null},
				{id:"signObj",		name:"簽核物件檢閱窗格",vis:"onViewSignObjVisible",	fn:"onViewSignObj",	icon:"check",	chkStat: "onViewSignObjState"},	// 1060821 Raymond 1060703 簽核物件檢閱窗格是checkbox
				{id:"verifyEnve",	name:"簽章驗證檢核",	vis:"onVerifyEnveVisible",	fn:"onVerifyEnve",	icon:"arrow-r",	chkStat: null},
				{id:"delFolio",		name:"刪除本件公文",	vis:"onDelFolioVisible",	fn:"onDelFolio",	icon:"false",	chkStat: null},
				{id:"odi260",		name:"流程資訊",		vis:"onOpenODI260Visible",	fn:"onOpenODI260",	icon:"arrow-r",	chkStat: null},	// 2016.9.2 新增開啟ODI260功能
				{id:"edi011",		name:"電子來文檔案明細",vis:"onOpenEDI011Visible",	fn:"onOpenEDI011",	icon:"arrow-r",	chkStat: null},	// 2016.9.30 新增開啟EDI011功能
				{id:"edt440",		name:"批示錄案追蹤",	vis:"onOpenEDT440Visible",	fn:"onOpenEDT440",	icon:"arrow-r",	chkStat: null},	// 2017.2.7 新增開啟EDT440功能
				{id:"edt232",		name:"PDF/定型稿匯入",	vis:"onOpenEDT232Visible",	fn:"onOpenEDT232",	icon:"arrow-r",	chkStat: null},	// 2020.11.16 新增信保專用開啟EDT232功能
				{id:"openMirror",	name:"另開附件視窗",	vis:"onOpenMirrorVisible",	fn:"onOpenMirror",	icon:"arrow-r",	chkStat: null}	// 1130426 Raymond 中榮序97 新增類似一代雙螢幕模式的「另開附件視窗」功能
			];
			//1110321	Joe		1101416		依系統參數調整回閱顯示
			if(typeof(theSSO.User.SystemSets.RESIGN_SUBFOLDER) =='string' && theSSO.User.SystemSets.RESIGN_SUBFOLDER != "")
				// 1111129 Raymond 修正在文號選單的「回閱」項目前新增其它選單項目後, 指定將第「9」項目更名會更錯項目的問題
				//menuItems[9].name = theSSO.User.SystemSets.RESIGN_SUBFOLDER;
				menuItems.forEach(function(mi, idx) {
					if(mi.id == "reqReview")
						mi.name = theSSO.User.SystemSets.RESIGN_SUBFOLDER;
				});
			var fm = $(this).data("model");	// 2016.9.2 讀取此頁籤的FolioModel
			screen.height( $(document).height() ).removeClass( "ui-screen-hidden" );
			list.empty().filter( ".ui-listview" ).listview( "destroy" );
			
			for(var i=0; i<menuItems.length; i++) {
				var $li = $("<li tabindex='" + i + "'></li>");
				var mi = menuItems[i];
				if(mi.id == "divider") {
					$li.attr("data-role", "divider").attr("data-theme", "b").text(mi.name).appendTo(list);
				}
				else {
					if(typeof mi.vis === "string" && mi.vis.length > 0) {
						if(nsEditor && mi.vis in nsEditor) {
							var vis = false;
							try {
								vis = nsEditor[mi.vis].call(this, fm);	// 2016.9.2 傳入FolioModel參數
							}
							catch(e) {
								theLogger.error(e.message);
							}
							if(vis == true) {
								$li.attr("id", mi.id).attr("data-icon", mi.icon).append("<a>" + mi.name + "</a>").appendTo(list);
								// 2016.11.2 icon設定為check的選單項目要特別處理 for 回閱
								if(mi.icon == "check") {
									$li.find("a").on("click", {fn: mi.fn}, function(event) {
										if(event.data && "fn" in event.data && typeof event.data.fn === "string" && event.data.fn.length > 0) {
											if(nsEditor && event.data.fn in nsEditor) {
												var evt = $.Event("click", {target: event.target});
												evt.data = $home.find("#leftPart .viewPort");
												var checked = false;
												if($(this).hasClass("ui-checkbox-on"))
													$(this).addClass("ui-checkbox-off").removeClass("ui-checkbox-on");
												else {
													$(this).addClass("ui-checkbox-on").removeClass("ui-checkbox-off");
													checked = true;
												}
												try {
													nsEditor[event.data.fn].call(this, evt, fm, checked);	// 多傳入checked參數
												}
												catch(e) {
													theLogger.error(e.message);
												}
											}
										}
									});
								}
								else {
									$li.find("a").on("click", {fn: mi.fn}, function(event) {
										if(event.data && "fn" in event.data && typeof event.data.fn === "string" && event.data.fn.length > 0) {
											if(nsEditor && event.data.fn in nsEditor) {
												var evt = $.Event("click", {target: event.target});
												evt.data = $home.find("#leftPart .viewPort");
												closeMenu();	// 關閉選單
												try {
													//2017.2.15	Leslie	增加列印前自動儲存功能
													if(event.data.fn == "onPrintFolio"){
														var autoSave = true;
														var autoSaveBeforePrint = theSSO.User.EnvSettings.get('AOL_AUTOSAVE_BEFORE_PRINT');
														var docObj_AOL = theAOL.docObj;
														if ((typeof docObj_AOL.uiParam=='object' && typeof docObj_AOL.uiParam.aol_readonly_mode=='boolean') ||
																(typeof docObj_AOL.uiParam=='object' && typeof docObj_AOL.uiParam.aol_disable_save=='boolean')){
															
															if (docObj_AOL.uiParam.aol_readonly_mode || docObj_AOL.uiParam.aol_disable_save) {
																autoSave = false;
															}
														}
														
														// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式下列印前不要儲存上傳公文電子檔
														//if(autoSave && typeof autoSaveBeforePrint != "undefined" && autoSaveBeforePrint == 'Y'){
														// 1140422	Leslie[1131282]	[退輔會]增修草稿依設定是否啟用自動要號功能
														if(theCustom.getCustomSet('DraftAutoReqDocNo') && autoSave && docObj_AOL.docNo.length == 0 && (!theSSO || theSSO.offlineMode != true) &&
															confirm("尚未設定公文文號，是否自動取號？") ){
															fm.reqDocNo().done(function() {	// 自動取號
																theAOL.doSave("列印").done(function() {	// 自動取號後須自動儲存上傳
																	nsEditor[event.data.fn].call(this, evt, fm);	// 儲存上傳成功後再開啟列印子視窗
																})
																.fail(function(errorText) {
																	alert(errorText);
																});
															})
															.fail(function(errorText) {
																alert(errorText);
															});
														}
														else
														if(autoSave && typeof autoSaveBeforePrint != "undefined" && autoSaveBeforePrint == 'Y' && (!theSSO || theSSO.offlineMode != true)){
															//公文狀態為可儲存(非唯讀，非AKI802文稿編輯)時，檢核系統設定是否自動儲存
															//1060825	Leslie[1060515]	增加傳入目前儲存的觸發作業文字"列印"
															//theAOL.doSave().done(function() {
															theAOL.doSave("列印").done(function() {
																nsEditor[event.data.fn].call(this, evt, fm);	// 2016.9.2 傳入FolioModel參數
															})
															.fail(function(errorText) {
																alert(errorText);
															});
														}
														else
															nsEditor[event.data.fn].call(this, evt, fm);	// 2016.9.2 傳入FolioModel參數
													}
													//1061120	Leslie[1061055]	增加於要號前檢核附件是否均已完成轉出(僅限線上簽核公文+附件匯出頁面)
													else if(event.data.fn == "onReqDocNo"){
														var checkAttConvert = true,isAnyAttUnFinish = false;
														var msg = [];
														var docObj_AOL = theAOL.docObj;
														if ((typeof docObj_AOL.uiParam=='object' && typeof docObj_AOL.uiParam.aol_readonly_mode=='boolean') ||
																(typeof docObj_AOL.uiParam=='object' && typeof docObj_AOL.uiParam.aol_disable_save=='boolean')){
															
															if (docObj_AOL.uiParam.aol_readonly_mode || docObj_AOL.uiParam.aol_disable_save) {
																checkAttConvert = false;
															}
														}
														
														if(checkAttConvert && theAOL.docObj.signType == "E" && SSO_CONFIG.enableConvertAttPage){
															var cntDraft = fm.getDraftCounts();
															if(cntDraft != null && cntDraft > 0){
																for(var iDraft=0;iDraft<cntDraft;iDraft++){
																	var msg2 = []
																	var cntAtt = fm.getDraftAttCounts(iDraft);
																	if(cntAtt != null && cntAtt > 0){
																		for(var iAtt=0;iAtt<cntAtt;iAtt++){
																			if(fm.isAttConvertFinish(iDraft,iAtt) === false){
																				//有附件沒轉完
																				isAnyAttUnFinish = true;
																				msg2.push(fm.getDraftAttName(iDraft,iAtt))
																			}
																		}
																	}
																	if(msg2.length){
																		msg.push(fm.getDraftName(iDraft)+"："+msg2.join('、'));
																	}
																}
															}
															
															if(isAnyAttUnFinish){
																msg.push("請等候附件全數轉置完成後");
																msg.push("再執行公文要號功能");
																alert(msg.join('\r\n'));
															}
															else
																nsEditor[event.data.fn].call(this, evt, fm);	// 2016.9.2 傳入FolioModel參數
														}
														else
															nsEditor[event.data.fn].call(this, evt, fm);	// 2016.9.2 傳入FolioModel參數
													}	//1061120	Leslie[1061055]	增加於要號前檢核附件是否均已完成轉出(僅限線上簽核公文+附件匯出頁面)	==END==
													else
														nsEditor[event.data.fn].call(this, evt, fm);	// 2016.9.2 傳入FolioModel參數
												}
												catch(e) {
													theLogger.error(e.message);
												}
											}
										}
									});
								}
							}
							else if(vis == 2) {	// 2016.12.15 新增要顯示選單項目但Disable
								theLogger.log("選單項目(id:" + mi.id + ")的vis callback function回傳2, 顯示該項目但Disable");
								$li.attr("id", mi.id).attr("data-icon", mi.icon).append("<a class='ui-disabled'>" + mi.name + "</a>").appendTo(list);
								//1140709 Zen 1140392 "刪除本件公文"為Disable時，顯示tooltip
								if(mi.id == "delFolio")
									$li.attr('title','草稿已取號，無法刪除本件公文，請以銷號辦理')
							}
							else {
								theLogger.log("選單項目(id:" + mi.id + ")的vis callback function回傳false, 不顯示該項目");
							}
						}
						else {	// 未掛載onXXXVisible callback function在nsEditor
							theLogger.warn("未掛載'" + mi.vis + "'在nsEditor命名空間下, 無法建立選單項目");
							// 2016.5, for DEMO
							//$li.attr("id", mi.id).attr("data-icon", mi.icon).append("<a>" + mi.name + "</a>").appendTo(list);
						}
					}
					else {	// 未定義vis callback function name?
						theLogger.error("未定義選單項目(id:" + mi.id + ")的vis callback function name");
					}
				}
			}
			list.listview();	// 套用選單樣式
			// 2016.11.2 檢核a.ui-icon-check改成ui-check-on/off
			list.find("a.ui-icon-check").each(function(idx, a) {
				$(a).removeClass("ui-btn-icon-right").addClass("ui-btn-icon-left").removeClass("ui-icon-check");
				var cmdid = $(a).parent().attr("id");
				for(var i=0; i<menuItems.length; i++) {
					var mi = menuItems[i];
					if(mi.id == cmdid) {
						if("chkStat" in mi && typeof mi.chkStat === "string" && mi.chkStat.length > 0) {
							if(nsEditor && mi.chkStat in nsEditor) {
								// 1061023 Raymond 1060952 多傳入evt參數給chkStat函式
								var evt = $.Event("click", {target: event.target});
								evt.data = $home.find("#leftPart .viewPort");
								try {
									//var b = nsEditor[mi.chkStat].call(a, fm);	// 傳入FolioModel參數
									var b = nsEditor[mi.chkStat].call(a, fm, evt);	// 傳入FolioModel參數, 1061023 Raymond 1060952 多傳入evt參數
									if(b)	// 依據chkStat指定的function回傳值決定初始的核取狀態
										$(a).addClass("ui-checkbox-on");
									else
										$(a).addClass("ui-checkbox-off");
								}
								catch(e) {
									theLogger.error(e.message);
								}
							}
						}
						break;
					}
				}
			});
			var t = $(this).offset().top,
				l = $(this).offset().left;
			listbox.removeClass("ui-selectmenu-hidden").css({left: (l+60)+"px", top: 0+"px", maxWidth: "200px"});
			holding = true;
			
			/* 2016.4.20 回閱
			list.find("li#reqReview").click(function(evt) {
				if($(this).find("a.ui-btn").hasClass("ui-checkbox-on"))
					$(this).find("a.ui-btn").removeClass("ui-checkbox-on").addClass("ui-checkbox-off");
				else
					$(this).find("a.ui-btn").removeClass("ui-checkbox-off").addClass("ui-checkbox-on");
			});
			
			// 2016.4.20 抄本
			list.find("li#reqCopy").click(function(evt) {
				if($(this).find("span.ui-icon").hasClass("ui-icon-checkbox-on"))
					$(this).find("span.ui-icon").removeClass("ui-icon-checkbox-on").addClass("ui-icon-checkbox-off");
				else
					$(this).find("span.ui-icon").removeClass("ui-icon-checkbox-off").addClass("ui-icon-checkbox-on");
			});*/
		};
		// 2016.10.28 新增ALT-P快捷鍵開啟列印簽核文件功能, 2016.11.9 快捷鍵改為K, 因為IE的ALT-P已佔用, 另改A為input type='button', 一樣for IE, 2016.11.11 fix -100px不夠, 要-500px才會看不到
		$("<input type='button' accesskey='k' value='列印快捷鍵' style='position:absolute; left:-500px;'>").appendTo($("#aol #tabbar").parent())
		.on("click", function() {
			// 1100303 Raymond 1100092 比照點擊文稿頁籤及翻頁限制, 紙本公文不允許編輯內文時, 亦不可用快捷鍵執行列印簽核文件
			if(theAOL.docObj.signType == "P" && !theAOL.getCurrFolio().enableEdit()) {	// 卡紙本不允許編輯內文的流程點不可以看文稿
				theLogger.warn("此流程點不允許編輯紙本公文內文, 禁止列印簽核文件");
				alert("本流程點不允許編輯紙本公文內文, 亦禁止列印簽核文件");
			}
			else
			if(nsEditor && "onPrintFolio" in nsEditor) {
				var evt = $.Event("click", {target: event.target});
				evt.data = $home.find("#leftPart .viewPort");
				try {
					var fm = theAOL.getCurrFolio();
					if(fm){
						//2017.2.15	Leslie	增加列印前自動儲存功能
						var autoSave = true;
						var autoSaveBeforePrint = theSSO.User.EnvSettings.get('AOL_AUTOSAVE_BEFORE_PRINT');
						var docObj_AOL = theAOL.docObj;
						if ((typeof docObj_AOL.uiParam=='object' && typeof docObj_AOL.uiParam.aol_readonly_mode=='boolean') ||
								(typeof docObj_AOL.uiParam=='object' && typeof docObj_AOL.uiParam.aol_disable_save=='boolean')){
							
							if (docObj_AOL.uiParam.aol_readonly_mode || docObj_AOL.uiParam.aol_disable_save) {
								autoSave = false;
							}
						}
						
						// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式下列印前不要儲存上傳公文電子檔
						//if(autoSave && typeof autoSaveBeforePrint != "undefined" && autoSaveBeforePrint == 'Y'){
						// 1140422	Leslie[1131282]	[退輔會]增修草稿依設定是否啟用自動要號功能
						if(theCustom.getCustomSet('DraftAutoReqDocNo') && autoSave && docObj_AOL.docNo.length == 0 && (!theSSO || theSSO.offlineMode != true) &&
							confirm("尚未設定公文文號，是否自動取號？") ){
							fm.reqDocNo().done(function() {	// 自動取號
								theAOL.doSave("列印").done(function() {	// 自動取號後須自動儲存上傳
									nsEditor[event.data.fn].call(this, evt, fm);	// 儲存上傳成功後再開啟列印子視窗
								})
								.fail(function(errorText) {
									alert(errorText);
								});
							})
							.fail(function(errorText) {
								alert(errorText);
							});
						}
						else
						if(autoSave && typeof autoSaveBeforePrint != "undefined" && autoSaveBeforePrint == 'Y' && (!theSSO || theSSO.offlineMode != true)){
							//公文狀態為可儲存(非唯讀，非AKI802文稿編輯)時，檢核系統設定是否自動儲存
							//theAOL.doSave().done(function() {
							theAOL.doSave("列印").done(function() {
								nsEditor["onPrintFolio"].call(this, evt, fm);	// 2016.9.2 傳入FolioModel參數
							})
							.fail(function(errorText) {
								alert(errorText);
							});
						}
						else
							nsEditor["onPrintFolio"].call(this, evt, fm);	// 2016.9.2 傳入FolioModel參數
					}
				}
				catch(e) {
					theLogger.error(e.message);
				}
			}
		});
		
		// 2016.12.28 - 點擊參照公文時
		function onclickRefFolio(evt) {
			
			var menuItems = [
				{id:"printFolio",	name:"列印簽核文件",	vis:"onPrintRefDocVisible",	fn:"onPrintRefDoc",	icon:"arrow-r",	chkStat: null},
				{id:"signObj",		name:"簽核物件檢閱窗格",vis:"onViewSignObjVisible",	fn:"onViewSignObj",	icon:"check",	chkStat: "onViewSignObjState"}	// 1061023 Raymond 1060952 參照窗格新增簽核物件檢閱窗格功能
			];
			var fm = $(this).data("model");	// 2016.9.2 讀取此頁籤的FolioModel
			screen.height( $(document).height() ).removeClass( "ui-screen-hidden" );
			list.empty().filter( ".ui-listview" ).listview( "destroy" );
			
			for(var i=0; i<menuItems.length; i++) {
				var $li = $("<li tabindex='" + i + "'></li>");
				var mi = menuItems[i];
				if(mi.id == "divider") {
					$li.attr("data-role", "divider").attr("data-theme", "b").text(mi.name).appendTo(list);
				}
				else {
					if(typeof mi.vis === "string" && mi.vis.length > 0) {
						if(nsEditor && mi.vis in nsEditor) {
							var vis = false;
							try {
								vis = nsEditor[mi.vis].call(this, fm);	// 2016.9.2 傳入FolioModel參數
							}
							catch(e) {
								theLogger.error(e.message);
							}
							if(vis == true) {
								$li.attr("id", mi.id).attr("data-icon", mi.icon).append("<a>" + mi.name + "</a>").appendTo(list);
								// 2016.11.2 icon設定為check的選單項目要特別處理 for 回閱
								if(mi.icon == "check") {
									$li.find("a").on("click", {fn: mi.fn}, function(event) {
										if(event.data && "fn" in event.data && typeof event.data.fn === "string" && event.data.fn.length > 0) {
											if(nsEditor && event.data.fn in nsEditor) {
												var evt = $.Event("click", {target: event.target});
												evt.data = $home.find("#rightPart .viewPort");
												var checked = false;
												if($(this).hasClass("ui-checkbox-on"))
													$(this).addClass("ui-checkbox-off").removeClass("ui-checkbox-on");
												else {
													$(this).addClass("ui-checkbox-on").removeClass("ui-checkbox-off");
													checked = true;
												}
												try {
													nsEditor[event.data.fn].call(this, evt, fm, checked);	// 多傳入checked參數
												}
												catch(e) {
													theLogger.error(e.message);
												}
											}
										}
									});
								}
								else {
									$li.find("a").on("click", {fn: mi.fn}, function(event) {
										if(event.data && "fn" in event.data && typeof event.data.fn === "string" && event.data.fn.length > 0) {
											if(nsEditor && event.data.fn in nsEditor) {
												var evt = $.Event("click", {target: event.target});
												evt.data = $home.find("#rightPart .viewPort");
												closeMenu();	// 關閉選單
												try {
													nsEditor[event.data.fn].call(this, evt, fm);	// 2016.9.2 傳入FolioModel參數
												}
												catch(e) {
													theLogger.error(e.message);
												}
											}
										}
									});
								}
							}
							else if(vis == 2) {	// 2016.12.15 新增要顯示選單項目但Disable
								theLogger.log("選單項目(id:" + mi.id + ")的vis callback function回傳2, 顯示該項目但Disable");
								$li.attr("id", mi.id).attr("data-icon", mi.icon).append("<a class='ui-disabled'>" + mi.name + "</a>").appendTo(list);
							}
							else {
								theLogger.log("選單項目(id:" + mi.id + ")的vis callback function回傳false, 不顯示該項目");
							}
						}
						else {	// 未掛載onXXXVisible callback function在nsEditor
							theLogger.warn("未掛載'" + mi.vis + "'在nsEditor命名空間下, 無法建立選單項目");
							// 2016.5, for DEMO
							//$li.attr("id", mi.id).attr("data-icon", mi.icon).append("<a>" + mi.name + "</a>").appendTo(list);
						}
					}
					else {	// 未定義vis callback function name?
						theLogger.error("未定義選單項目(id:" + mi.id + ")的vis callback function name");
					}
				}
			}
			list.listview();	// 套用選單樣式
			// 2016.11.2 檢核a.ui-icon-check改成ui-check-on/off
			list.find("a.ui-icon-check").each(function(idx, a) {
				$(a).removeClass("ui-btn-icon-right").addClass("ui-btn-icon-left").removeClass("ui-icon-check");
				var cmdid = $(a).parent().attr("id");
				for(var i=0; i<menuItems.length; i++) {
					var mi = menuItems[i];
					if(mi.id == cmdid) {
						if("chkStat" in mi && typeof mi.chkStat === "string" && mi.chkStat.length > 0) {
							if(nsEditor && mi.chkStat in nsEditor) {
								// 1061023 Raymond 1060952 多傳入evt參數給chkStat函式
								var evt = $.Event("click", {target: event.target});
								evt.data = $home.find("#rightPart .viewPort");
								try {
									//var b = nsEditor[mi.chkStat].call(a, fm);	// 傳入FolioModel參數
									var b = nsEditor[mi.chkStat].call(a, fm, evt);	// 傳入FolioModel參數, 1061023 Raymond 1060952 多傳入evt參數
									if(b)	// 依據chkStat指定的function回傳值決定初始的核取狀態
										$(a).addClass("ui-checkbox-on");
									else
										$(a).addClass("ui-checkbox-off");
								}
								catch(e) {
									theLogger.error(e.message);
								}
							}
						}
						break;
					}
				}
			});
			var t = $(this).offset().top,
				l = $(this).offset().left;
			listbox.removeClass("ui-selectmenu-hidden").css({left: (l+60)+"px", top: 0+"px", maxWidth: "200px"});
			holding = true;
		};
		
		/*$("#refs").on('change', function(evt) {
			switch($(this).val()) {
				case "a":
					$("#rightPart .viewPort").css("display", "block");
					break;
			}
		});

		$('#btnClose').on('click', function(){
			
		});*/
		// 暫時的Panel widget
		function Panel() {
			var screen = $("<div>", {"class": "ui-popup-screen ui-screen-hidden"} ).appendTo( $home ),
				panel = $("<div class='ui-popup-container ui-selectmenu-hidden ui-panel'></div>").insertAfter(screen);
			function closePanel() {
				screen.removeClass("in").addClass("ui-screen-hidden");
				//listbox.removeClass("ui-popup-active").addClass("ui-selectmenu-hidden").removeAttr( "style" );
				panel.addClass("ui-selectmenu-hidden").empty();
			}
			screen.on('click',  function() {
				closePanel();
			});
			return {
				open: function($content, callback) {
					screen.removeClass("ui-screen-hidden");
					if(callback && $.isFunction(callback)) {
						panel.append($content.children()).addClass("ui-page");
						callback.call(panel.get(0));
						panel.trigger("create").removeClass("ui-selectmenu-hidden");
					}
					else
						panel.append($content.children()).addClass("ui-page").trigger("create").removeClass("ui-selectmenu-hidden");
				},
				close: function() {
					closePanel();
				}
			};
		};
		$home.data("panelWidget", new Panel());
		
		//theLogger.log(window.ZoomController);
		//(new ZoomController()).attach($("#leftPart .viewPort").get(0), $("#leftPart #zoomControl1 .ui-select .ui-btn-text").get(0));	// 2016.3.29 FIX
		//(new ZoomController()).attach($("#rightPart .viewPort").get(0), $("#rightPart #zoomControl2 .ui-select .ui-btn-text").get(0));	// 2016.3.29 FIX
		(new ZoomController()).attach($("#leftPart .viewPort").get(0), $("#leftPart #zoomControl1 select").get(0));	// 2016.3.29 FIX
		(new ZoomController()).attach($("#rightPart .viewPort").get(0), $("#rightPart #zoomControl2 select").get(0));	// 2016.3.29 FIX
		
		//(new StampActionHandler()).install();	// 2013.12.5 - Raymond 新增章戳連動, 2016.8.17 改至reload判定非唯讀再叫用
		
		// 1100204 Raymond 1090927 對應iPhone等小螢幕裝置的UI調整
		if(window.SDLMode) {
			console.log("[小螢幕模式]隱藏縮放工具列");
			//$("#leftPart #zoomControl1").hide(); // 2021.2.8 - 1090927 Eric, 測試用, 暫時顯示
			$("#rightPart #zoomControl2").hide();
			console.log("[小螢幕模式]隱藏追蹤修訂工具列");
			$("#leftPart #tcControl1").hide();
			console.log("[小螢幕模式]新增追蹤修訂選單項目至進階設定選單");
			$("#popupAdvance > ul").append("<li><a id='btnTCControl1'>追蹤修訂模式</a></li>").listview("refresh");
			$("#btnTCControl1").on("click", function() {
				console.log("[小螢幕模式]顯示追蹤修訂模式設定子視窗");
				Util.getDlg("RD-TCModeSetting.html").done(function($dlg) {
					
					$dlg.find("header > h1").unwrap();
					$dlg.find("footer > div").css("width", "50%").unwrap();
					
					$dlg.find("a#ok").on('click', function() {
						if($dlg.find("#chkTCMode0").prop("checked")) {	// 追蹤修訂模式
							TCControl.setCurrMode(0);
						}
						else if($dlg.find("#chkTCMode1").prop("checked")) {	// 完稿模式
							TCControl.setCurrMode(1);
						}
						$.modal.close();
					});
					$dlg.find("#cancel").on('tap', function() {
						$.modal.close();
					});
					
					$dlg.find("#chkTCMode0").prop("checked", TCControl.currMode != 1).on('click', function() {
						if(this.checked)
							$dlg.find("#chkTCMode1").prop("checked", false).checkboxradio("refresh");
						else
							this.checked = true;
					});
					$dlg.find("#chkTCMode1").prop("checked", TCControl.currMode == 1).on('click', function() {
						if(this.checked)
							$dlg.find("#chkTCMode0").prop("checked", false).checkboxradio("refresh");
						else
							this.checked = true;
					});
					
					var w = $home.find("#mainContent").width(),
						h = $home.find("#mainContent").height();
					theLogger.log("新增追蹤修訂模式設定對話方塊, w:" + w + ",h:" + h);
					$.modal($dlg, {
						appendTo: $home.find("#mainContent"),
						overlayCss: {width: w, height: h},
						containerCss: {width: "300px", height: "210px"},
						autoResize:true,
						onShow:function() {
							$dlg.trigger("create");
							$dlg.find(".ui-field-contain").css("margin", "0");
							$dlg.find(".ui-input-text").css("display", "inline-block");
						}
					});
				});
				$("#popupAdvance").popup("close");
			});
		}

	// 1110411 Raymond 1101578 判斷環境變數改為全域變數
	// 1110318 Raymond 1101578 新增附件編輯監測服務模組控制介面
	//if(!!theSSO && !!theSSO.User.EnvSettings && theSSO.User.EnvSettings.get("AOL_ENABLE_ATTACH_DIRECT_EDIT") == "Y" && $home.closest("#viewDoc").length == 0) {
	if(window.enableAttachDirectEdit == true && $home.closest("#viewDoc").length == 0) {
		window.theAttEditMgr = new function() {
			// init websocket
			var _mgmtUrl = "localhost:21001";
			var _callbacks = {};
			function addCallback(key, func, cbdata) {
				_callbacks[key] = {func: func, cbdata: cbdata};
			}
			var _lastError;
			var _websocket = null;
			var _wsConnectId = -1;
			var _padding = false;
			function _now() {
				var dt = new Date();
				return dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + "." + dt.getMilliseconds() + " - ";
			}
			function _reconnect() {
				console.log(_now() + "theAttEditMgr start connecting ws...");
				var dfd = $.Deferred();
				//try {	// IE會發生catchable錯誤, Chrome/Edge/FireFox會發生uncatchable錯誤, 不用try-catch可使IE下theAttEditMgr變成未定義, 使IE不會套用到附件編輯模組功能
					_websocket = new WebSocket("ws://" + _mgmtUrl + "/ws");	// 固定本地網址
				//}
				//catch(e) {
				//	console.error("建立WebSocket失敗! " + (e.stack || e.message));
				//	dfd.reject("建立WebSocket失敗! " + (e.stack || e.message));
				//	return dfd.promise();
				//}
				_websocket.onopen = function (ev) {
					console.log(_now() + "theAttEditMgr ws connected! msg='" + ev.data + "'");
					if (typeof ev.data=='string' && ev.data.length) {
						try {
							var welcome = JSON.parse(ev.data);			
							if (typeof welcome.connectId=='number') {
								_wsConnectId = welcome.connectId;
								dfd.resolve();
							}
							else
								dfd.reject("WS連線成功但回傳資料沒有連線ID或連線ID不是數字");
						}
						catch(e) {
							console.log(e.toString());
							_lastError = e.toString();
							dfd.reject("WS連線成功但回傳資料非JSON格式");
						}
					}
					else {
						console.log("WS連線成功但無回傳資料, 等到onmessage再處理");
						_padding = true;
					}
				};
				_websocket.onerror = function (ev) {
					console.error(_now() + "theAttEditMgr GOT a ws error! msg='" + ev.data + "'");
					_lastError = (!!ev.data)?ev.data:"";	// 1110407 Raymond 1101578 若ev.data是undefined, 回應的訊息不要出現undefined
					_websocket = null;
					_wsConnectId = -1;
					dfd.reject("WS連線失敗!\r\n" + _lastError, 1);	// 1110318 Raymond 1101578 指定回傳錯誤代碼1, 表示模組未啟動
				};
				_websocket.onclose = function (ev) {
					console.log(_now() + "theAttEditMgr ws connection closed! msg='" + ev.data + "'");
					_lastError = ev.data;	// 正常關閉應清空?
					_websocket = null;
					_wsConnectId = -1;
				};
				_websocket.onmessage = function (ev) {
					console.log(_now() + "theAttEditMgr GOT a ws message:'" + ev.data + "'");

					// 更新附件檔
					if (typeof ev.data=='string' && ev.data.length){
						try {
							let wsJSON = JSON.parse(ev.data);
							// action: update
							// target: attach
							// docNo: ???, msgId: ???, sessionId: ???
							// draftGUID: ???, attGUID: ???, fileHash: ???
							// ToDo: 確認草稿msgId是否須加帳號資訊!
							if (typeof wsJSON=='object' && wsJSON.target=="sys" && typeof wsJSON.connectId=='number') {
								console.log(wsJSON.msg + ', wsConnectId由', _wsConnectId, "重設為", wsJSON.connectId);
								_wsConnectId = wsJSON.connectId;
								if(_padding)
									dfd.resolve();
							}
							else if (typeof wsJSON=='object' && wsJSON.target==='attach') {
								var key = wsJSON.docNo + "-" + wsJSON.msgId + "-" + wsJSON.sessionId + "-" + wsJSON.draftGUID + "-" + wsJSON.attGUID;
								_getAttachFile(wsJSON.docNo, wsJSON.msgId, wsJSON.sessionId, wsJSON.draftGUID, wsJSON.attGUID)
								.done(function(blob) {
									//theSSO.MP.promptMsg('附件檔案更新', '檔案:"' + wsJSON.editFilename + '" size=' + blob.size + ', type=' + blob.type);
									console.log('updated file:"' + wsJSON.editFilename + '" size=' + blob.size + ', type=' + blob.type);
									if(!!_callbacks[key])
										_callbacks[key].func.call(_callbacks[key].cbdata, blob, wsJSON);
								})
								.fail(function(e) {
									console.error('附件檔案更新:"' + wsJSON.editFilename + '" 但取得檔案內容失敗!', e);
									if(!!_callbacks[key])
										_callbacks[key].func.call(_callbacks[key].cbdata, undefined, wsJSON, e);
								});
							}
						}
						catch(e) {
							console.log(e);
						}
					}
					//document.getElementById("ws_text").innerHTML = ev.data;
				};

				setTimeout(function() {
					// readystate: 0:CONNECTING, 1: OPEN, 2: CLOSING, 3: CLOSED
					if (typeof _websocket=='object' && _websocket!==null && _websocket.readyState!=1) {
						_lastError = "逾時(5s)";
						_websocket = null;
						_wsConnectId = -1;
						console.warn("theAttEditMgr ws connection timeout...");
						dfd.reject("WS連線失敗!\r\n" + _lastError, 2);	// 1110318 Raymond 1101578 指定回傳錯誤代碼2, 表示模組回應逾時
					}
				}, 5000);
				
				return dfd.promise();
			}

			// 查詢模組是否正常運行
			function _query() {
				var dfd = $.Deferred();
				console.log("theAttEditMgr.query()...");
				if(!_websocket || _wsConnectId < 0) {
					_reconnect()
					.done(doQuery)
					.fail(function(errorText, errorCode) {
						dfd.reject(errorText, errorCode);
					});
					return dfd.promise();
				}
				else
					return doQuery();
				function doQuery() {
					var url = "http://" + _mgmtUrl + "/query?target=moduleStatus";
					fetch(url)
					.then(function(resp) {
						console.log("theAttEditMgr.query() returns", resp.statusText);
						return resp.json();
					})
					.then(function(ro) {
						console.log("theAttEditMgr.query() returns", ro);
						if(ro.success == true)
							dfd.resolve(ro.version);	// 成功時回傳版號
						else
							dfd.reject(ro.errMsg, ro.errCode);	// 失敗時回傳錯誤訊息及代碼
					})
					.catch(function(e) {
						console.error("theAttEditMgr.query() failed!", e);
						dfd.reject(e);
					});
					return dfd.promise();
				}
			}
			// 查詢本次開啟作業附件是否已下載及編輯狀態, draftGUID設'*'表示全部, attGUID設'*'表示全部
			function _queryAttStat(docNo, msgId, sessionId, draftGUID, attGUID) {
				var dfd = $.Deferred();
				console.log("theAttEditMgr.queryAttStat(" + docNo + ", " + msgId + ", " + sessionId + ", " + draftGUID + ", " + attGUID + ")...");
				var url = "http://" + _mgmtUrl + "/query?target=attach&docNo=" + docNo + 
						"&msgId=" + msgId + "&sessionId=" + encodeURIComponent(sessionId) + 
						"&draftGUID=" + encodeURIComponent(draftGUID) + "&attGUID=" + encodeURIComponent(attGUID);
				fetch(url)
				.then(function(resp) {
					console.log("theAttEditMgr.queryAttStat() returns", resp.responseText);
					return resp.json();
				})
				.then(function(ro) {
					console.log("theAttEditMgr.queryAttStat() returns", ro);
					if(ro.success == true)
						dfd.resolve(ro);
					else
						dfd.reject(ro.errMsg, ro.errCode);	// 失敗時回傳錯誤訊息及代碼
				})
				.catch(function(e) {
					console.error("theAttEditMgr.queryAttStat() failed!", e);
					dfd.reject(e);
				});
				return dfd.promise();
			}
			// 要求開啟指定附件
			function _openAttach(docNo, msgId, sessionId, draftGUID, attGUID, filename, readonly, file, updateCallback, dm, notifyMode, notifyMsg, readonlyNotifyMsg) {
				var dfd = $.Deferred();
				console.log("theAttEditMgr.openAttach(" + docNo + ", " + msgId + ", " + sessionId + ", " + draftGUID + ", " + attGUID + ", " + filename + ", " + readonly + ", " + file + ")...");
				var url = "http://" + _mgmtUrl + "/openAttach";
				var editFilename = '公文系統-' + filename;
				var formData = new FormData();
				formData.append('docNo', docNo);
				formData.append('msgId', msgId);
				formData.append('sessionId', sessionId);
				formData.append('wsConnectId', _wsConnectId);
				formData.append('draftGUID', draftGUID);
				formData.append('attGUID', attGUID);
				formData.append('filename', filename);
				formData.append('editFilename', editFilename);
				formData.append('readonly', readonly); // 附件是否不可異動, false->可異動, true->不可異動!
				if(typeof notifyMode === "string") {
					if(notifyMode.match(/dialog|silence/))
						formData.append('notifyMode', notifyMode);
					else
						console.error("notifyMode參數(" + notifyMode + ")設定錯誤! 必需是dialog或silence");
				}
				if(typeof notifyMsg === "string")
					formData.append('notifyMsg', notifyMsg);
				if(typeof readonlyNotifyMsg === "string")
					formData.append('readonlyNotifyMsg', readonlyNotifyMsg);

				// NOTE: 若附件電子檔已下載, 則此欄位不給!
				if(!!file)
					formData.append(filename, file, file.name);
				$.ajax({
					url: url,
					type: 'POST',
					data: formData,
					processData: false,
					contentType: false,
					success: function(data){
						console.log("theAttEditMgr.openAttach() response='" + JSON.stringify(data) + "'");
						if(!!updateCallback && $.isFunction(updateCallback))
							addCallback(docNo + "-" + msgId + "-" + sessionId + "-" + draftGUID + "-" + attGUID, updateCallback, dm);
						dfd.resolve(data);
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.error("theAttEditMgr.openAttach() failed!", textStatus + ": " + errorThrown);
						dfd.reject(errorThrown, textStatus);
					},
					xhr: function() {
						// create an XMLHttpRequest
						var xhr = new XMLHttpRequest();
				
						// listen to the 'progress' event
						xhr.upload.addEventListener('progress', function(evt) {
							if (evt.lengthComputable) {
								// calculate the percentage of upload completed
								var percentComplete = evt.loaded / evt.total;
								percentComplete = parseInt(percentComplete * 100);
							}
						}, false);
						return xhr;
					}
				});
				return dfd.promise();
			}
			// 取得更新後附件電子檔
			function _getAttachFile(docNo, msgId, sessionId, draftGUID, attGUID) {
				var dfd = $.Deferred();
				console.log("theAttEditMgr.getAttachFile(" + docNo + ", " + msgId + ", " + sessionId + ", " + draftGUID + ", " + attGUID + ")...");
				var url = "http://" + _mgmtUrl + "/getAttachFile?docNo=" + docNo +
					"&msgId=" + msgId + "&sessionId=" + encodeURIComponent(sessionId) +
					"&draftGUID=" + encodeURIComponent(draftGUID) + "&attGUID=" + encodeURIComponent(attGUID);
				fetch(url)
				.then(function(resp) {
					return resp.blob();
				})
				.then(function(blob) {
					console.log('updated file:"' + blob.name + '" size=' + blob.size + ', type=' + blob.type);
					dfd.resolve(blob);
				})
				.catch(function(e) {
					console.error("theAttEditMgr.getAttachFile() failed!", e);
					dfd.reject(e);
				});
				return dfd.promise();
			}
			// 公文關閉/傳送後清除監測模組暫存工作檔, draftGUID設'*'表示全部, attGUID設'*'表示全部
			function _delAttachFile(docNo, msgId, sessionId, draftGUID, attGUID) {
				var dfd = $.Deferred();
				console.log("theAttEditMgr.delAttachFile(" + docNo + ", " + msgId + ", " + sessionId + ", " + draftGUID + ", " + attGUID + ")...");
				var url = "http://" + _mgmtUrl + "/delAttachFile?docNo=" + docNo +
					"&msgId=" + msgId + "&sessionId=" + encodeURIComponent(sessionId) +
					"&draftGUID=" + encodeURIComponent(draftGUID) + "&attGUID=" + encodeURIComponent(attGUID);
				fetch(url, {method:'POST'})
				.then(function(resp) {
					console.log("theAttEditMgr.delAttachFile() returns", resp.responseText);
					return resp.json();
				})
				.then(function(ro) {
					if(ro.success == true)
						dfd.resolve(ro);
					else
						dfd.reject(ro.errMsg, ro.errCode);	// 失敗時回傳錯誤訊息及代碼
				})
				.catch(function(e) {
					console.error("theAttEditMgr.delAttachFile() failed!", e);
					dfd.reject(e);
				});
				return dfd.promise();
			}
			_reconnect().fail(function(errorText, errorCode) {	// 第1次建立WS連線
				/* 1110407 Raymond 1101578 AOL首次載入公文時, 檢查若未啟動編輯模組, 則提示警告一次後, 以舊邏輯下載檔案方式處理附件頁籤點擊行為
				if(errorCode == 1)
					alert(errorText + "\r\n\r\n請安裝或啟動[附件編輯監測服務模組]");
				else if(errorCode == 2)
					alert(errorText + "\r\n\r\n請重新安裝或重新啟動[附件編輯監測服務模組]");
				else
					alert(errorText);*/

                // 2023.2.14 - Eric, 考試院保固需求序4
                let strSSOFAQMsg = theSSO.User.EnvSettings.get('SSO_FAQ_MSG')
                let strFAQ = ''
                if (strSSOFAQMsg.length) {
                    let listFAQ = strSSOFAQMsg.split(';')
                    if (listFAQ.length() > 0) {
                        strFAQ = listFAQ[0];
                    }
                }
                if (strFAQ.length) {
                    alert(errorText + "\r\n\r\n未啟動[公文附件編輯模組], 系統將以舊有方式下載/開啟附件!\n請參閱說明文件：\"" + strFAQ + "\"以排除異常。");
                }
                else {
                    alert(errorText + "\r\n\r\n未啟動[公文附件編輯模組], 系統將以舊有方式下載/開啟附件!");
                }
				// alert(errorText + "\r\n\r\n未啟動[附件編輯監測服務模組], 系統將以舊有方式下載/開啟附件!");
                theAOL.disableUseAttEdit = true;	// 設定停用旗標
                /*
                function _showWarning(errorText) {
                    let dfd = $.Deferred()

                    let faqUrl = 'tools/atteditaux_faq.pdf'
                    let msg = errorText + "\r\n\r\n未啟動[公文附件編輯模組], 系統將以舊有方式下載/開啟附件!";
                    msg += '<br>請參閱FAQ排除異常：<a href="' + faqUrl + '" style="cursor:pointer" target="_blank">[公文附件編輯模組]異常排除說明</a>';
                    var param = {title: "[公文系統提示]",
                        message: msg,
                        buttons: [{	name: "確定",
                                    action: function() {
                                            theLogger.log("使用者關閉提示視窗!");
                                            dfd.resolve({answer:1, asked:false});
                                        }
                                    }],
                        beforeShow: function() {
                        },
                        afterHide: function() {
                        }
                    };
                    $.confirm(param);	
                    return dfd.promise();
                }

                theAOL.disableUseAttEdit = true;	// 設定停用旗標
                _showWarning(errorText)
                .done(function() {
                });
                */
			});
			
			return {
				query: _query,
				queryAttStat: _queryAttStat,
				openAttach: _openAttach,
				getAttachFile: _getAttachFile,
				delAttachFile: _delAttachFile
			};
		}();
	}
	
	// 1120818 Raymond 1120503 新增插入表格功能, 依環境變數"WE_ENABLE_CUSTOM_TABLE"設定啟用
	if($("a#btnNewTable").length && theSSO.User.EnvSettings.get("WE_ENABLE_CUSTOM_TABLE") == "Y") {
		let screen = $("<div>", {"class": "ui-popup-screen ui-screen-hidden"} ).appendTo( $home ),
			cntr = $("<div class='ui-popup-container ui-selectmenu-hidden'></div>").insertAfter(screen);
		function closePopup() {
			screen.removeClass("in").addClass("ui-screen-hidden");
			cntr.removeClass("ui-popup-active").addClass("ui-selectmenu-hidden").removeAttr( "style" );
		}
		screen.on("tap", function() {
			closePopup();
		});
		$("a#btnNewTable").get(0).addEventListener("click", async (e) => {
			let sel = window.getSelection();
			if(sel.rangeCount > 0) {
				let rng = sel.getRangeAt(0);
				console.log(sel);
				console.log(rng);
				if(!!sel.focusNode && $(sel.focusNode).closest("span.a").length && $(sel.focusNode).closest("span.a").attr("sync-path") && $(sel.focusNode).closest("span.a").attr("sync-path").indexOf("條列") > 0) {	// 點擊插入表格前的游標位置是在條列中
					console.log("'" + sel.type + "'", sel.focusNode, "(" + sel.focusNode.nodeType + ")", sel.focusOffset);
					if($(sel.focusNode).closest(".custom-table").length) {
						console.warn("目前游標在自訂表格中, 無法再插入表格");
						alert("目前的滑鼠游標已在自訂表格中，\n無法再「插入表格」。");
						return false;
					}
					if(sel.focusNode.nodeType == 3)
						console.log("插入表格於'" + sel.focusNode.textContent.substr(0, sel.focusOffset) + "'與'" + sel.focusNode.textContent.substr(sel.focusOffset) + "'之間");
					else if(sel.focusNode.nodeType == 1)
						console.log("插入表格於" + sel.focusNode.outerHTML + "之後");
					sel = {node: sel.focusNode, offset: sel.focusOffset};
				}
				else {
					alert("請先將滑鼠游標點在條列中欲插入表格的位置，\n再點擊「插入表格」按鈕。");
					return false;
				}
			}
			let ofs = $(e.currentTarget).offset();
			let ofs2 = $home.offset();
			ofs.left -= ofs2.left;
			ofs.top -= ofs2.top;
			let [colCount, rowCount] = await tablePicker(Math.ceil(ofs.left), Math.ceil(ofs.top) + $(e.currentTarget).height());
			console.log(JSON.stringify({colCount, rowCount}));
			
			console.log(sel);
			let ec = $home.find(".viewPort").data("editCursor");
			ec.insertTable(sel, colCount, rowCount);
		});
		// 仿WORD拖拉幾欄幾列的UI參考自https://stackoverflow.com/questions/59160006/creating-a-control-like-microsoft-office-words-table-generator-in-html
		function tablePicker(x, y) {
			return new Promise(resolve => {
				let div = document.querySelector("#tblPicker");
				if (div) div.remove();
				let colCount = 0;
				let rowCount = 0;
				div = $('<div id="tblPicker"></div>').get(0);
				div.innerHTML = `<div>0欄x0列<\/div>
				<table>${`<tr>${`<td><\/td>`.repeat(10)}<\/tr>`.repeat(10)}<\/table>`;
				
				div.onmouseover = (e) => {
					if (e.target.tagName !== "TD") return;
					let td = e.target;
					let tr = td.parentNode;
					let table = tr.parentNode;
					colCount = td.cellIndex+1;
					rowCount = tr.rowIndex+1;
					for (let row of table.rows) {
						let inside = row.rowIndex < rowCount;
						for (let cell of row.cells) {
							cell.classList.toggle("tblPickerHighlight", inside && cell.cellIndex < colCount);
						}
					}
					div.children[0].textContent = `${colCount}欄x${rowCount}列`;
					return false;
				};

				div.onmousedown = () => {
					closePopup();
					resolve([colCount, rowCount]);
				};
				screen.height( $(document).height() ).removeClass( "ui-screen-hidden" );
				cntr.append(div).removeClass("ui-selectmenu-hidden").css({left: x + "px", top: y + "px"});//, border: "1px solid gray", width: "auto", height: "auto", minHeight: "0", padding: "0", transition: "none"});
			});
		}
	}
	
	// 1130322 Raymond 1130204 修正iPad上因無標楷體且字體Metrics比桌機小, 微調字距以便與桌機的排版斷行結果接近
	if(navigator.userAgent.search(/Mobile/gi) > 0 || (navigator.userAgent.search(/Macintosh/gi) > 0 && !window.realMac)) {
		$.each(document.styleSheets, function(si, ss) {
			console.log(si, ss);
			//1130722	Leslie[序138]	針對壓縮版修改相容檔名
			// if(!!ss.href && ss.href.match(/RD-AOL.css/)) {
			if(!!ss.href && ss.href.match(/(RD-AOL.css)|(RD-SSO_wfh.css)/ig)) {
				$.each(ss.rules, function(ri, r) {
					console.log(ri, r);
					if(!!r.selectorText && r.selectorText == ".para.segment") {
						r.style.letterSpacing = "0.06rem";
						return false;	// break each-rules-loop
					}
				});
				return false;	// break each-sheets-loop
			}
		});
	}
	
	// 1130426 Raymond 中榮序93 新增判斷環境變數「AOL_REFVIEW_IN_RIGHT」設為"Y"時, 將簽辦及參照窗格左右對調
	if(theSSO.User.EnvSettings.get("AOL_REFVIEW_IN_RIGHT") == "Y") {
		$.each(document.styleSheets, function(si, ss) {
			console.log(si, ss);
			//1130722	Leslie[序138]	針對壓縮版修改相容檔名
			// if(!!ss.href && ss.href.match(/RD-AOL.css/)) {
			if(!!ss.href && ss.href.match(/(RD-AOL.css)|(RD-SSO_wfh.css)/ig)) {
				$.each(ss.rules, function(ri, r) {
					console.log(ri, r);
					if(!!r.selectorText) {
						if(r.selectorText == "#aol #mainContent.ui-two-pane .ui-pane-a") {
							r.style.marginLeft = "0%";
						}
						else if(r.selectorText == "#aol #mainContent .ui-pane-b") {
							r.style.left = "100%";
						}
						else if(r.selectorText == "#aol #mainContent.ui-two-pane .ui-pane-b") {
							r.style.left = "calc(50% + 20px)";
						}
					}
				});
				return false;	// break each-sheets-loop
			}
		});
	}
	
	// 1130503 Raymond 中榮序97 新增判斷機關暱稱為TVGH(中榮)時, 將客製化功能鍵由"B"主題色換成"C"主題色
	if(SSO_CONFIG.OrgNickName == "TVGH") {
		$("#cusBtnControl1 a").removeClass("ui-btn-b").addClass("ui-btn-c");
	}
	
	// 1130503 Raymond 中榮序96 新增判斷機關暱稱為TVGH(中榮)時, 啟用「機案功能」按鈕
	if(SSO_CONFIG.OrgNickName == "TVGH") {
		$("#btnFolioCmds, #btnFolioCmds2").show();
		$.each(document.styleSheets, function(si, ss) {
			console.log(si, ss);
			//1130722	Leslie[序138]	針對壓縮版修改相容檔名
			// if(!!ss.href && ss.href.match(/RD-AOL.css/)) {
			if(!!ss.href && ss.href.match(/(RD-AOL.css)|(RD-SSO_wfh.css)/ig)) {
				$.each(ss.rules, function(ri, r) {
					console.log(ri, r);
					if(!!r.selectorText) {
						if(r.selectorText == "#aol .ui-tabs-bar") {
							r.style.height = "calc(100% - 150px)";
							return false;	// break each-rules-loop
						}
					}
				});
				return false;	// break each-sheets-loop
			}
		});
		$("#btnFolioCmds").on("click tap", function(evt) {
			let $li = $("#leftPart #tabbar li:has(> .ui-btn-active)");
			if($li.length) {
				if($li.is(":first-child")) {
					onclickFolio.call($li.find(".ui-btn-active").get(0), evt);
				}
				else {
					let mdl = $li.find(".ui-btn-active").data("model");
					if(!!mdl)
						mdl.refresh($home.find("#leftPart .viewPort"), this, screen, list, listbox, holding, closeMenu);
				}
			}
			return false;
		});
		$("#btnFolioCmds2").on("click tap", function(evt) {
			let $li = $("#rightPart #tabbar2 li:has(> .ui-btn-active)");
			if($li.length) {
				if($li.is(":first-child")) {
					onclickRefFolio.call($li.find(".ui-btn-active").get(0), evt);
				}
				else {
					let mdl = $li.find(".ui-btn-active").data("model");
					if(!!mdl)
						mdl.refresh($home.find("#leftPart .viewPort"), this, screen, list, listbox, holding, closeMenu);
				}
			}
			return false;
		});
	}
	
	/* 2016.3.25 - Raymond, 延遲載入功能取消, 所需各模組改至RD-SSO.html載入
		theLogger.log("-II- theModMgr.include() done() END.");
	});	// end of done()*/
	
	theLogger.log("-II- #aol.onpageinit() END.");
});