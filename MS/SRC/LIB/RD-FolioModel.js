// FolioModel class
//   線上簽核公文
//
//   Revisions = 簽核點定義
//      FlowInfo = 簽核流程/異動資訊
//      Drafts = 文稿/來文
//         Attachments = 附件
//         MailMergeData = 分繕表(未實作)

// DATE		SA			PRG			MGR_NO		DESC
// 1060419	Raymond		Raymond		-------		修正開啟舊檔若是DI的話無法正確匯入的問題
// 1060427	Raymond		Raymond		-------		修正因調整附件順序, 須更名Server上的附件檔名, 在下載未完成前即上傳SignWork.xml等檔案, 導致部分應更名附件檔未上傳的問題, 航港-序637
// 1060427	Raymond		Raymond		-------		新增/置換過附件後儲存再開要更新SignFolder的_lastId, 以免文件夾識別碼重複
// 1060509	Raymond		Raymond		1060147		呼叫nsEditor.onNewDraftExt函式時新增isImport參數, true表示是開啟舊檔所匯入的文稿, false表示是從樣版新增的文稿
// 1060516	Raymond		Raymond		1060245		自動新增簽稿會核單時, 增加傳入來源文稿的發文機關節點參數, 若有的話複製其全銜、機關代碼至新增的簽稿會核單
// 1060519	Raymond		Raymond		-------		修正開啟舊檔是簽稿會核單時, 會稿單位列表未載入問題
// 1060606	Leslie		Leslie		1060248		修正開啟舊檔時，讀取樣版屬性的判斷錯誤(造成會辦單位與決行層級無法載入)
// 1060607	Leslie		Leslie		1060328		補修正FDA發生之紙本簽核公文，於傳送至發文人員時發現找不到封裝檔之錯誤
// 1060620	Raymond		Raymond		1060147		新增文稿時傳入第3參數, 標記是否為開啟舊檔所新增之文稿
// 1060628	Raymond		Raymond		1060465		改用文稿清單比對文別, 不要用已開啟文稿判定哪個文稿應套用會辦單位到預排流程
// 1060707	Raymond		Raymond		1060361		自訂範本未定義文別屬性, 須額外從文稿中取得
// 1060713	Leslie		Leslie		1060561		修正紙本簽核公文儲存時，增加處理要號後檔案搬移
// 1060724	Raymond		Raymond		1060604		新增檢核外部簽核記錄檔的簽核物件座標是否差異太大功能
// 1060804	Raymond		Raymond		1060579		歷史檢視開啟時計算各版本應保留的簽核物件
// 1060808	Raymond		Raymond		1060697		修正FDA空白公文不要檢核解密條件、日期
// 1060810	Raymond		Raymond		1060472		應檢核含附件與有無附件一致的文別環境變數, 分隔符號改成逗號
// 1060810	Raymond		Raymond		1060696		儲存前檢核文稿內文是否有造字或控制碼, 有則轉換為全形及半形空白並提示警告
// 1060817	Leslie		Leslie		1060740		儲存上傳的部分邏輯，加上try-catch以嚐試截取Exception紀錄，並上傳至ExceptionLog中儲存
// 1060822	Raymond		Raymond		1060703		新增取得線上簽核文稿功能及切換至特定頁面功能
// 1060824	Leslie		Leslie		1060567		高港警新增需求，結案公文開啟後，若發文字號、日期為空，則自動取得發文字號、日期，一併檢核發文日期是否為當日系統日期
// 1060825	Leslie		Leslie		1060515		高港警新增需求，針對各式稿件，可設定儲存前檢核
// 1060830	Raymond		Raymond		1060796		從範本新增文稿時補充因自訂範本清掉的發文字號的文號的子標籤 - 年度、流水號、支號
// 1060907	Leslie		Leslie		1060453		鐵工局客製化密件邏輯，密件不提供自動備份
// 1060913	Raymond		Raymond		1060756		修正多樣版的文稿儲存關閉後再開, 仍會詢問套用樣版的問題
// 1060915	Raymond		Raymond		1060801		令、函沒有<備註>, 不需要將段落[@段名='附註']搬到<備註>下
// 1061016	Leslie		Leslie		1060939		取消原單的錯誤邏輯
// 1061016	Raymond		Raymond		1060962+1060948+1060989 修正異動撤消後刪除附件會發生錯誤的問題
// 1061016	Raymond		Raymond		1060948+1060962	修正異動撤消回分辦後主辦流程點的附件未標示異動及未點開的文稿在儲存時跳出未設定樣版檔訊息情況的問題
// 1061017	Raymond		Raymond		1060948+1060962 修正異動撤消後前一次傳送前所新增文稿順序若與DraftMgmt.xml不一致, 則開啟附件管理子視窗點擊附件時會出現錯誤的問題
// 1061026	Raymond		Raymond		1061053		修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
// 1061108	Raymond		Raymond		-------		修正1061053問題, 導致開啟舊檔需補空文字或條列時, 誤判多補了一個文字節點的問題
// 1061114	Raymond		Raymond		1061068		判斷來文附件頁面是否允許實際上旋轉(影像處理)
// 1061117	Raymond		Raymond		1061118		檢查若有重新匯出頁面並缺少fileRef, 則重設附件fileRef.name, 並修正調換附件順序時可能因非同步下載附件原始檔所造成的問題
// 1061120	Raymond		Raymond		1060905		檢查文稿應否含附件時, 先判斷可編輯時才檢核
// 1061205	Raymond		Raymond		1060815		儲存文稿時若檢查有造字碼改為不以全形空白取代, 而是提示警告, 當DOC_STATE>=13(已歸檔)於開啟時檢查造字亦提示警告
// 1061205	Raymond		Raymond		-------		儲存文稿時檢查是否可編輯, 若不可編輯則不要儲存文稿及文稿管理檔
// 1061212	Raymond		Raymond		1061211		將transCmplXml函式expose到nsEditor, 供另存新檔叫用
// 1061222	David		David		1061170		開啟公文後新增呼叫WedEditSave.SetSourceODWObj()，記錄初始基資資訊
// 1070112	Raymond		Raymond		1060452		若是鐵工局秘書, 須上傳秘書的簽辦意見為獨立檔案
// 1070129	Leslie		Leslie		1061274		增加可取得附件摘要資訊(一律由文稿管理檔取得)
// 1070312	Raymond		Raymond		-------		修正getDraftAttDesc方法先判斷_currMgmt是否為有效值, 因為開啟參照公文時不會載入文稿管理檔
// 1070608	Raymond		Raymond		1070197		允許會辦單位新增文稿且封裝檔內未有已存在會辦單位子目錄的文稿管理檔時, 新增會辦單位子目錄的文稿管理檔
// 1070620	Raymond		Raymond		1070547		會辦單位手動調整文稿稿序的數量會比總文稿數少, 改用與SignFolder.adjustOrder相同方式重新整理_cachedDM的順序
// 1070926	Raymond		Raymond		-------		歷史檢視不會切換不同歷史流程就開啟對應的文號-00-01、02等子目錄, 取得附件摘要時以try-catch迴避Exception
// 1071018  Cloud		Cloud		--			修正重設發文日期，變數預設值重設時間點錯誤造成異常問題
// 1071025	Raymond		Raymond		-------		修正轉為完稿內容時, 輸出文字/text()時過濾掉\t\r\n等因縮排產生的XML內容, 避免產生有折行、縮排等字元的XML檔
// 1071025	Raymond		Raymond		-------		新增預處理開啟舊檔前, 先轉為無追蹤修訂標籤及\t\r\n字元的XML, 以避免載入原主旨、段落有異常字元的舊檔(例:一代儲存的), 也許會衍生其它問題的可能性, 並修正IE下轉完稿XML會發生Error的問題
// 1071112	Raymond		Raymond		1071085		判定機關為航港局(MPB)時, 讀取文稿中的<MTNET流水號>, 若有則將內容設定到ODWDCM.MTNET_NO
// 1071114	David		David		1071130		檢核支號參數未宣告導致檢核判斷錯誤，調整宣告時機，避免檢核錯誤
// 1071130	David		David		1071161		取得使用者PEN COLOR時，若OWN_ROLE_ID無值，依OD99取得
// 1071207	Raymond		Raymond		1071108		修正密件控管功能不要異動基資
// 1071210	Raymond		Raymond		1071181		新增開啟舊檔時判斷段名不為空才補上文字節點, 避免有些文別(ex.便簽)故意弄成沒有文字又不顯示段名是為了要隱藏整行, 但在開啟舊檔時又跑出空行出來的問題
// 1071212	Raymond		Raymond		1071233		修正會辦待分辦公文若文稿有造字碼, 傳送或儲存時會導致轉圈圈問題
// 1071222	Raymond		Raymond		-------		新增從AOLProccessData.xml找尋文稿最後版本的簽核區域, 以供寫SignWork.xml時計算簽核物件在簽核區域內的相對座標為頁面絕對座標
// 1071222	Raymond		Raymond		-------		自動備份目錄改為文號+msgId, 避免主辦流程點未正常關閉公文但傳送成功了, 到退回或結案未歸檔等msgId已變的流程點, 因跳出警告訊息, 而被使用者誤回復的問題
// 1071224	David		David		1071231		新增依系統參數判斷是否需檢核所有稿件分類號皆需相同
// 1080104	Raymond		Raymond		-------		修正未設定過發文字號時只取文號的文字內容會取到\r\n等字元, 導致誤判應檢核發文支號的問題
// 1080114	Raymond		Raymond		1080024		setAllDraftText是否有異動內文改存回傳值另一欄位, success若無error則一律為true
// 1080125	Leslie		Leslie		1070200		是否已檢視參考附件
// 1080117	Kevin		Joe			1080049		弱掃修正Hardcoded Absolute Path
// 1080211	Raymond		Raymond		1080052		修正開啟舊檔時呼叫CheckCls檢核分類號是否可用, 若可用則保留舊檔分類號
// 1080326	Raymond		Raymond		1070350		同步新增簽稿會核單時帶入承辦單位
// 1080424	Raymond		Raymond		1071206		修正異動撤消前有一個以上附件, 異動撤消後置換或新增其它附件, 暫存後再開啟會顯示成罝換前附件且再次置換附件會出現錯誤的問題
// 1080426	David		David		1080088		新增鐵道局單位發文僅能發內部單位檢核邏輯
// 1080502	David		David		1080045		新增鐵道局內部受文者正副本稱謂格式檢核
// 1080531	Raymond		Raymond		1080433		新增取得及設定文稿清單已異動旗標的方法
// 1080620	Raymond		Raymond		1080520		修正在唯讀模式時, 誤判附件為新增未匯出頁面的附件電子檔的問題
// 1080621	Raymond		Raymond		1080433		新增回報開啟公文時, 文稿管理檔初始記錄的文稿數的方法
// 1080626	Raymond		Raymond		1080520		修正受會待核示有文稿管理檔但無文稿時, 沒有從AOLProccessData.xml找出對應GUID, 而又導致附件頁籤變成超鏈結的問題
// 1080726	Raymond		Raymond		1080575		匯入自訂範本的新增文稿改依"開啟舊檔"邏輯執行, 以修正舊的自訂範本沒有新的樣版檔所新增的標籤、屬性, 造成功能異常的問題
// 1080823	Raymond		Raymond		1080708		修正章戳或圖檔簽核物件檔名(可能)為空造成SignWork.xml資訊記錄缺少電子檔名問題
// 1080905	Raymond		Raymond		1080660		新增開啟線上簽核公文時檢核國合會已匯出附件頁面卻發生附件以電子檔格式記錄的問題
// 1080911	Raymond		Raymond		1080708		修正線上簽核公文儲存後第2次開啟再暫存時, 章戳圖檔因是tif格式而改用odtools網址形式而未傳入第1次儲存時已上傳成功的影像檔檔名, 造成儲存傳送後章戳物件無電子檔名的問題
// 1080924	Raymond		Raymond		1080660		修正異動撤消時若該流程點前次傳送前未重新匯出附件頁面, 因附件ID傳送後固定會變更, 會發生誤判為附件已異動導致附件ID重新設定, 在載入SignWork.xml的情況下(異動撤消一個流程點)會發生GUID未還原, 導致儲存變成不匯出頁面的附件電子檔格式的問題
// 1080927  Kevin       Eric        1080339     jQuery 3.0 upgrade. ($.type => SSOUtil.typeOf)
// 1081213	Raymond		Raymond		1080786		合併內政部單號1070657, 檢查新增的文稿是否有設定會稿單位, 應否自動新增簽稿會核單, 並判斷是否要同步到預排流程
// 1081230	Raymond		Raymond		1080194		配合fnWebEditSave改為非同步呼叫, 儲存前檢核也改成非同步呼叫
// 1090107	Raymond		Raymond		1080701		清除暫存檔改成清空sessionStorage, 因為目前sessionStorage只有暫存文稿檔會用到, 而文稿檔不可暫存到開另一筆公文時還存在, 這會造成當文號相同時誤取暫存的前一筆公文的文稿內容, 故須在關閉公文呼叫clearTemp時將sessionStorage全部清空
// 1090109	Raymond		Raymond		1081164		修正線上簽核公文在文別轉換後, 儲存再開會發生樣版套錯的問題
// 1090110	Raymond		Raymond		1081141		新增一個由多稿轉出呼叫的新增文稿方法newDraftByMailMerge
// 1090115	Raymond		Raymond		1081166		新增設定應寫入SignWork.xml之DI文稿檔名的方法及修正儲存文稿時若傳入的資料參數不是Document而是(編碼後)字串時, "xml" in 指令會發生Error的問題
// 1090227	Raymond		Raymond		1080751		合併內政部1070381若公文由AKI800調閱要從uiParam取得UNV檔物件
// 1090318	Raymond		Raymond		1090089		修正紙本公文開啟舊檔時不會自動開啟受文者子視窗的問題
// 1090423	Raymond		Raymond		1090257		從共用或個人範本匯入時, 清空附件檔名, 以避免發生「無法要求取得第1個文稿的第0個附GUID, 超出範圍」錯誤訊息
// 1090424	Raymond		Raymond		1090305		新增文稿頁次時, 新增第2參數若有且傳入為true時表示不要將該文稿狀態設為dirty(已異動), 以避免簽核物件位於簽核框(最末頁)外時, 會出現找不到頁面ID的問題
// 1090428	Raymond		Raymond		1090320		修正允許開啟舊檔保留AlignParentContext屬性, 以恢復對齊父段落功能
// 1090429	Raymond		Raymond		1090001		修正檢核分類號及案次號呼叫WS時多第5參數, 傳入公文文號前3碼做為年度號, 檢核分類號可用時比對回傳值的KeepYear若與舊檔的保存年限不一致, 則重設保存年限為回傳值的KeepYear
// 1090505	Raymond		Raymond		1081101		修正重設支號時, 因陣列順序未必照文稿順序, 導致文稿支號未依照文稿順序編排的問題
// 1090513	Raymond		Raymond		1090223		新增支援手動或自動新增簽稿會核單時, 自動調整其為第一筆文稿順序功能
// 1090515	Raymond		Raymond		1090347		新增稿件方法新增第3參數, 傳入true表示不要自動產生簽稿會核單
// 1090527	Raymond		Raymond		1090392		將supplyFromTemplate函式expose到nsEditor, 供貼上稿件(置換)叫用, 及修正判斷可發文文別邏輯, 避免環境變數SSO_CLOSE_TYPE_SEND_DRAFTTYPE含"O簽"時, 誤判「簽」為可發文文別
// 1090527	Raymond		Raymond		1090391		修正儲存時檢核發文字號支號邏輯, 若WE_FIRST_ISSUENO_NO設為1時, 多稿時第2筆可發文稿件的發文支號應從2編起, 僅單筆可發文稿件時的發文支號則應為空
// 1090609	Raymond		Raymond		1090001		未取文號前開啟舊檔, 呼叫CheckCls及CheckCase檢核分類號及案次號時一律新增第5參數年度號, 值為空字串
// 1090714	Raymond		Raymond		CDC序103	修正當支號檢核邏輯設定不是"1Aa", 在多稿取完支號後儲存時會跳檢核支號順序錯誤問題, 修正支號邏輯的變數來源為系統參數
// 1090804	Raymond		Raymond		1090409		新增查詢線上簽核公文符合應轉抄本的可發文文別(環境變數AOL_GEN_FORMAL_DRAFTTYPE所設定)的文稿是否有內容異動, 及指定文稿是否符合應轉抄本的可發文文別
// 1090820	Raymond		Raymond		1090391		修正當WE_FIRST_ISSUENO_NO有設值, 到編號序列最後1筆時(例:第10筆文稿), 會超出序列可編碼的範圍("1"已用於第1筆文稿, 故第10筆文稿應為"A")導致儲存檢核不通過的問題
// 1090828	Raymond		Raymond		1090529		調閱公文若強制浮水印, 則下載浮水印設定及LOGO影像
// 1090916	Raymond		Raymond		1090564		新增支援信保特殊模式公文相關修改
// 1091008	Raymond		Raymond		1090542		新增檢核若機關暱稱為"RRB"(鐵道局)時, 則執行開啟舊檔功能時僅保留複製主旨、開會事由、段落、備註、受文者列表等五欄位, 再刪除保留的受文者列表中本別為抄本的受文者/群組
// 1091105	Raymond		Raymond		1090658		修正貼上稿件(置換)時, "公文文號"欄位會因樣版檔不存在而未保留, 因此欄位消失而導致條碼不會顯示的問題
// 1091111	Raymond		Raymond		1090564		修正信保特殊模式仍要執行基資的Save檢核(fnODC010Save), 以避免切換至基資頁面修改內容後按儲存不會回寫ODWDCM的問題
// 1091111	Raymond		Raymond		1090756		自動新增簽稿會核單時, 將根節點的NewDraft屬性設為'N'
// 1091201	Leslie		Leslie		1090888		新增於信保PDF匯入時，附件頁籤的說明，改由<附件類型>取得
// 1100217	Raymond		Raymond		1090610		儲存公文時儲存的完稿XML及線上簽核多產生的DI, 不要轉出群組受文者中的成員受文者, 以節省儲存所耗費時間
// 1100305	Raymond		Raymond		1090864		若機關暱稱為'HAC'(客委會)且資料夾符合系統參數設定, 則在傳送前檢核稿件是否含客語難用字, 是則顯示提醒另存為PDF的警告訊息
// 1100312	David		Joe			1090837		修改內部單位前綴詞，由鐵道局需求變更為全系統共用
// 1100312	Raymond		Raymond		1090864		依Ying說客戶要求再改檢核客語難用字功能的提示訊息修正, 稿序也不用顯示了
// 1100315	Raymond		Raymond		1090991		依環境變數(WE_CHOOSE_TEMPLATE_WHILE_IMPORT)設定啟用開啟舊檔時搜尋多筆適用的樣版提供選取功能, 若所選樣版在資料管理檔有設定"預設排版"屬性, 則直接套用不需要再選一次排版設定檔
// 1100323	Raymond		Raymond		1090857		新增符合機關暱稱為「HAC」且資料夾符合環境變數「WE_SUBJECT_SYNC_DIGEST_FOLDERS」設定時, 檢核若2頁以上文稿的「摘要」欄為空則不允許傳送
// 1100412	Raymond		Raymond		1100306		修正開啟舊檔時, 非令函文別(ex.開會通知單)無法依原本設定的函類別套用符合的樣版檔, 只會套用第一個同文別樣版, 導致排版設定檔也套錯的問題
// 1100419	Raymond		Raymond		1080767		合併內政部1070530, 新增判斷是否結案前新增文稿, 是則禁止編輯
// 1100423	Raymond		Raymond		1090991		修正變數名稱打錯字造成開啟舊檔可套用樣版僅有一個時, 發生Error的問題
// 1100505	Raymond		Raymond		1090542		鐵道局客製化套用樣版補充節點的功能條件, 增加限制僅適用由開啟舊檔加入的新稿件, 以免貼上稿件(置換)或從範本匯入時也套用到此條件, 造成貼上稿件(置換)後或從範本匯入的新稿件欄位變少的問題
// 1100507	Raymond		Raymond		1100296		當自動新增文稿批示單功能(環境變數WE_AUTO_GEN_文稿批示單=Y)啟用時, 判斷符合指定條件時自動新增文稿批示單, 並調整稿序至第一筆
// 1100510	Raymond		Raymond		1090634		修正紙本公文因不會寫出SignWork.xml, 故偵測不到有前次自動備份檔案而無法回復的問題
// 1100510	Raymond		Raymond		1100296		修正當自動新增文稿批示單功能(環境變數WE_AUTO_GEN_文稿批示單=Y)啟用時, 紙本公文新增文稿會發生Error的問題
// 1100512	Raymond		Raymond		1090821		支援外呈外會公文, 及解析公文呈現檔所匯出頁面對應至單層式文稿頁面
// 1100519	Raymond		Raymond		1100298		新增判斷是否允許「修改」他流程所新增之文字意見
// 1100531	Raymond		Raymond		1100296		自動新增文稿批示單功能啟用時, 傳送及核章前檢核公文內必須有存查批示單或文稿批示單才可傳送
// 1100618	Raymond		Raymond		1100482		修正設定會稿單位超過設定筆數, 若啟用簽稿會核單保留簽核物件功能, 則判斷既有的簽稿會核單是否為不同流程點所新增的, 若是則僅允許異動案情摘要(主旨)欄, 故不要同步會辦單位清單
// 1100708	Raymond		Raymond		1100648		取得目前檢視中的文稿資訊, 提供分文稿記錄簽核意見功能
// 1100709	Raymond		Raymond		1100581		修正未取文號時不檢核「發文字號」, 及不需檢核的例外文別判斷錯誤問題
// 1100730	Raymond		Raymond		1100935		修正會辦單位新增稿件並夾帶附件後, 因非主辦的文稿子目錄, 沒有再從AOLProcessData.xml把附件GUID取回來, 導致後續被當做新增附件而無匯出頁面處理的問題
// 1100813	Raymond		Raymond		1090991		開啟舊檔若需選取樣版時按取消, 改成不匯入這筆文稿
// 1100817	Raymond		Raymond		1090991		客委會要求沒有啟用變數也要套用第一筆樣版檔的"預設排版"
// 1100830	Raymond		Raymond		1100868		新增文稿前非同步呼叫_view[0].save()以同步主旨到基資
// 1100901	Raymond		Raymond		1100750		"併辦"子文僅顯示來文內容, 不需要載入文稿管理檔
// 1100914	Raymond		Raymond		1101143		修正新增文稿後儲存, 接著退文刪除文稿管理檔後, 若退文失敗, 再接著儲存的話, 會造成文稿管理檔不存在但SignWork.xml卻存在的問題而導致「要求取得第0 個文稿模型物件，超出範圍」無法開啟公文的問題
// 1100916	David		David		1101094		鐵道儲存前檢核，抄本受文者為承辦人時不檢核
// 1100927	Raymond		Raymond		-------		修正呼叫fnGetIssueNo取得發文字號時, 以回傳值的IssueYear為年度, 回傳值的IssueNo為流水號
// 1100928	Raymond		Raymond		1100648		theAOL.currSignComment改成function(@RD-AOL.js), 不要直接用signFolder.currSignComment, 因為子文切回母文時, 母文model不會重新初始化, 不會重設theAOL.currSignComment, 而導致取文稿簽核意見時發生無_views而無法取得文稿資訊的問題
// 1101203	Raymond		Raymond		1101369		新增在其他文稿異動會辦單位, 但單位數量未達門檻值時, 也要同步到既有的簽稿會核單功能
// 1110107	Raymond		Raymond		1101423		修正「轉線上」(EDT213)後的公文, 開啟儲存後文稿管理檔仍殘留轉線上之前新增的舊文稿(簽核頁面看不到但發文登錄會列出)的問題
// 1110112	Raymond		Raymond		1101596		新增紙本公文開啟時顯示前一次儲存的(分頁後總)頁數
// 1110302	Raymond		Raymond		1110106		合併1080815, 應匯出附件頁面的設定下, 支援不需匯出頁面的格式附件
// 1110304	Leslie		Leslie		1101459		新增依設定，提供承辦人可修改「附件標籤」名稱
// 1110317	Raymond		Raymond		1101578		新增取得目前公文所在流程點的角色名稱
// 1110318	David		David		1101388		紙本簽核支援新增預排流程
// 1110322	Raymond		Raymond		1101416		新增傳送前檢查有異動過文稿時，將ODWMSG.IS_MODIFY設定為Y
// 1110323	David		David		1110213		新增依設定檢核發文日期
// 1110328 	Leslie		Leslie		1100287		Merge[1070359]	新增支援載入DI副檔名時, 先執行前置處理再執行後續功能
// 1110418	Raymond		Raymond		1110088		新增以index取得文稿原本匯出頁面所使用的PrintXSL全徑名(供另存HTML功能判斷有數個同文別的匯出XSL時, 應套用哪一個匯出XSL)
// 1110421	Raymond		Raymond		1110439		修正Chrome在開啟舊檔時, 若樣版XML檔無舊檔的標籤某些屬性(例如:署名的取代章戳)時, 會未帶入這些屬性值, 而導致列印發文用不會顯示取代章戳圖形的問題
// 1110506	Raymond		Raymond		1110521		修正匯入DI時, 簽的年月日、承辦單位及擬辦段落有2個，開會通知單的主持人、聯絡人及電話未匯入的問題
// 1110526	Raymond		Raymond		1110521		匯入DI的前置處理函式新增第2個參數, 此參數若為true, 表示是調閱歷史公文所載入的DI檔, 則額外處理DI的機關地址及聯絡方式等標籤
// 1110531	Raymond		Raymond		1110527		新增特定資料夾(預設:會核中-主辦)為可編輯文稿時, 先下載文稿管理檔檢核一遍其最後儲存者若不是自己且不是目前下載的文稿管理檔記錄的前一流程點的使用者(表示在本次開啟公文後有別人異動儲存過)或前一流程點的使用者但最後儲存時間更新時, 則提示是否覆蓋的警告訊息
// 1110602	Raymond		Raymond		1110512		新增儲存時, 若文稿未記錄有異動再檢核文稿內是否有本流程點新增的追蹤修訂異動, 有則改為文稿有異動, 以避免傳送時未匯出頁面的問題
// 1110610	Raymond		Raymond		1110283		新增設定會稿單位或開啟舊檔符合自動產生簽稿會核單的條件時, 支援航港局客製化邏輯的「額外產生簽稿會核單」之選項功能, 及自動產生簽稿會核單後的稿序排列規則
// 1110614	Raymond		Raymond		1110547		合併一代1010558, 匯入的DI的受文者若為<姓名>時一律轉為<全銜>匯入, 以修正<姓名>受文者不會匯入的問題
// 1110624	David		David		1110268		特定公文夾異動別傳送時，需檢核可發文稿件夾帶的附件格式，是否符合設定，不符合顯示確認訊息
// 1110630	Raymond		Raymond		1110561		當開啟舊檔選擇的是令的DI且令類別為"令", 因無法分辨是一般令還是派令、派免令等, 改成提示請使用者選取套用的令樣版
// 1110804	Raymond		Raymond		考試院序163	文稿為不可編輯時(案例為"簽稿會核單"), 檢核發文日期功能取nodes會丟出error, 要用try-catch避掉
// 1110809	Raymond		Raymond		考試院序178	修正便簽等文別的樣版故意拿掉段落的<文字>是為了少顯示一行, 而開啟舊檔卻會把段落的<文字>補回來(1071181)造成多顯示一行的問題
// 1110812	Raymond		Raymond		考試院序185	新增判斷預排流程是否有異動, 有則也提問是否儲存
// 1110815	Raymond		Raymond		考試院序193	修正歷史檢視的附件tooltip(摘要)只用到-00-99流程點的文稿管理檔內容, 而不是各流程點的文稿管理檔內容的問題
// 1110816	Raymond		Raymond		航港局序225	修正在啟用航港局自動產生簽稿會核單的排序邏輯功能後, 手動新增簽稿會核單因無dmSrc而發生Error的問題, 手動新增的簽稿會核單不套用任何調整稿序邏輯, 與一般文別相同新增在最後一筆
// 1110817	Raymond		Raymond		中興序241	修正核決後公文禁止異動文別仍會寫入SignWork.xml中並記錄為已異動, 造成封裝錯誤無法傳送的問題
// 1110819	Raymond		Raymond		考試院序202	修正在異動預排流程後, 執行刪除公文功能, 會跳出是否儲存詢問訊息, 執行紙本轉線上功能, 會出現Error而中止紙本轉線上的問題
// 1110913	Raymond		Raymond		1111068		修正資料夾rule為readOnly但可傳送情況下(ex.通知-回閱), 傳送時仍會執行儲存並上傳SignWork.xml, 導致覆蓋掉同時間在其它資料夾暫存但未傳送的簽核物件等資料的問題
// 1111003	Raymond		Raymond		陸委會序313	修正開啟舊檔或貼上稿件(置換)一代的便簽時, 缺少"附件列表/文字"導致附件管理開啟跟儲存會出現錯誤的問題
// 1111012	Leslie		Leslie		1110865		新增客製化簽閱附件的配套功能
// 1111021	Raymond		Raymond		1110885		修改刪除文稿功能新增第2參數skipPrompt, 若傳入true, 則表示不要提示確認刪除的警告訊息
// 1111117	Raymond		Raymond		1111069		取消saveTemp方法, 以避免不明步驟造成載入不同筆公文的文稿取代目前公文的文稿的問題
// 1111226	Raymond		Raymond		1111401		修正第二個以後的流程點, 開啟公文未做任何編輯即直接關閉時, 仍會跳出公文已異動的確認訊息問題
// 1120111	Raymond		Raymond		1111444		修正調閱已歸檔公文, 因歸檔後會辦單位的99子目錄不會保留, 而使應載入「文號-會辦單位-99」子目錄下的文稿管理檔載入失敗, 造成簽辦頁面窗格不會顯示會辦單位所新增之文稿頁籤的問題
// 1120216	Raymond		Raymond		1111313		修正使用者在會核中-主辦開啟公文, 儲存公文時在檢核到伺服器上文稿已為其它使用者上傳, 而使用者選擇覆蓋上傳後, 於會核中-主辦第二次再開啟儲存, 會將第一次覆蓋文稿管理檔(及文稿檔)原因清空的問題
// 1120222	David		Leslie		1110881		銓敘部-序14，新增支援紙本草稿轉正式公文，稿件路徑需一併更新
// 1120314	Kevin		Raymond		銓敘部序113	新增儲存前當在承辦單位流程點時檢核公文是否有文稿, 有則寫入ODWDCM.DRAFT_STATE為"Y", 否則寫入"N"
// 1120314	Leslie		Raymond		1111133		新增存取文稿管理檔中的來文附件名稱功能, 及判斷附件頁籤若是來文附件, 則先從文稿管理檔取得重新命名過的來文附件名稱來顯示, 若未重新命名過或清空時則以原來(封裝檔)的名稱顯示
// 1120323	Raymond		Raymond		銓敘部序165	儲存時檢核新增的環境變數「WE_NO_CHECK_EUDC」若為"1", 則忽略檢核造字, 若為"2", 則忽略檢核<承辦人>欄位的造字
// 1120407	David		Raymond		銓敘部序209	1110885衍生需求, FolioModel.newDraft新增第5參數preventFromOrg, 匯入銓敘文稿一律傳入true表示不要預帶來文機關為正本受文者及承辦單位為抄本受文者
// 1120424	Raymond		Raymond		1111349		修正調閱已歸檔公文時, 若目前是啟用匯出附件頁面的設定, 但歷史公文當時可能是關閉匯出附件頁面的設定時, 忽略找不到附件頁面的提示警告
// 1120508	Leslie		Leslie		1110513		修正要號後的自動儲存，應正確執行錯誤處理
// 1120523	Raymond		Raymond		1120307		修正判斷文稿可否異動的confirmDraftEditable方法, 改用DraftMgmt新增的confirmDraftEditable方法判斷, 而非已點開的文稿, 以避免備份時由於未點開文稿, 而未執行到DraftModel的getEditable判斷, 造成SignWork.xml中漏寫未點開的<文稿>節點, 導致從備份還原後會發生傳送錯誤(代碼713)問題
// 1120707	Raymond		Raymond		標檢局序110	修正儲存功能檢核支號是否合法時, 判斷機關暱稱為"BSMI"時, 依標檢局規則：只有一筆可發文稿件時, 支號不應為空, 若支號為空則顯示警告訊息
// 1120817	Raymond		Raymond		1120503		新增判斷儲存動作為"傳送", 再判斷異動文稿是否為"簽", 及是否含有自訂表格, 若含則在客戶端先產生文稿頁面再儲存
// 1120915	Raymond		Raymond		1120574		新增判斷上次儲存後又有異動才需要儲存
// 1121003	Raymond		Raymond		1120775		關閉公文時, 新增判斷是否有隱藏傳送工具列, 若有隱藏傳送工具列(buttonF沒有"T"), 即使MenuRule有設定非唯讀且可編輯內文(buttonF有"R"), 在異動內文後關閉公文也不要詢問是否儲存
// 1121012	Raymond		Raymond		北大序255	新增儲存時檢核簽核框外簽核物件是否位於應重新匯出的頁面上, 卻不可編輯內文, 是則顯示警告並中斷儲存
// 1121020	Raymond		Raymond		1120907		修正會辦單位蓋章在簽核框外時無法傳送的問題(未判斷蓋章的頁次是否為不存在封裝檔內的頁次)
// 1121024	Raymond		Raymond		1120574		修正未異動文稿或異動後有先儲存過時, 在環境變數「SSO_SENDDOC_FOLDER」設定的資料夾(待處理-待繕印;待處理-待發文;)的公文直接關閉時, 不會跳出詢問是否儲存、儲存後發文的子視窗問題
// 1121025	Raymond		Raymond		1120907		修正檢核簽核框外簽核物件若位於應重新匯出的頁面上(可能是排版設定檔有異動過), 但不可編輯內文(buttonF沒有"R"), 儲存/傳送時會轉圈圈的問題
// 1121110	Raymond		Raymond		1120881		開啟舊檔及貼上稿件時不保留舊檔的"簽核區域排版屬性"設定內容, 以所選樣版檔中的設定值為準, 以避免舊檔的簽核區域ID與所選樣版檔的簽核區域ID不一致可能會產生的問題
// 1121116	Raymond		Raymond		航港局序319	修正1110725併陳子文封裝檔有文稿, 但在文號-00-99的流程點刪除了所有文稿的情況下, 因_currMgmt是undefined導致發生錯誤而出現轉圈圈的問題
// 1121123	Raymond		Raymond		序214、257	修正開啟會核中-主辦(唯讀、不可編輯)公文, 第一次點左邊新增稿件, 系統會跳警告無法新增文稿, 關閉後再開啟, 公文會呈現無文稿狀態, 左邊"新增稿件"頁籤會變成"創稿", 點了會新增一筆新的草稿公文的問題
// 1121222	Raymond		Raymond		領務局序345	新增轉成可保留格式化資訊的完稿XML功能及開啟舊檔時, 使用保留格式化資訊的預處理完稿內容
// 1130117	Raymond		Raymond		1121045		新增回傳線上簽核公文是否有來文
// 1130129	Raymond		Raymond		自測		修正1080088、1080045兩處條件式錯誤
// 1130207	Raymond		Raymond		1120887		新增支援簽稿會核單受會單位可編輯會辦意見功能
// 1130220	Raymond		Raymond		1120234		新增判斷是否為UNV直接開啟來文DI模式, 是則不要下載文稿管理檔, 並傳入DI檔檔名給_currMgmt.init新增的第4個參數
// 1130307	Joe			Joe			1121110		修改鐵道主持人、抄本不顯示內部單位前綴詞
// 1130326	Raymond		Raymond		1130016		修正異動撤消前文稿有附件, 異動撤消後刪除附件, 儲存關閉再開會轉圈圈的問題
// 1130411	Leslie		Leslie		1130240		修正僅異動簽閱附件時，不會正確儲存的問題
// 1130520	Joe			Joe			1130222		調整批次取得發文號
// 1130521	Raymond		Raymond		信保序113	新增設定文稿的文別、函類別的方法
// 1130605	Raymond		Raymond		屏東序688	若WE_FIRST_ISSUENO_NO設為"0"時, 要用原來的1~9區間檢核支號, 否則會誤判第10筆文稿(支號為"9")應設為"A"而出現錯誤訊息(1090391衍生問題)
// 1130606	Leslie		Leslie		1130077		[併1130078]當系統於當前文稿觸發自動備份後，若使用者操作增/刪文稿、附件(連動影響封裝內容)時，則主動觸發一次自動備份
// 1130611	Leslie		Leslie		--			[銓敘部-序36]增加檢查附件是否存在
// 1130703	Raymond		Raymond		中榮序141	修正開啟舊檔時, 申請項目列表(中榮的表單類文別)下僅會載入第一個項目資料的問題
// 1130710	Raymond		Raymond		1130637		公文儲存成功後清除簽核物件已異動狀態, 以避免關閉公文時再跳出提醒已異動應儲存的提示訊息
// 1130715	David		Raymond		1120885		新增儲存時將目前的簽核意見寫入ODWMSG.SIGN_COMM欄位中,若設定依稿件儲存簽核意見(環境變數AOL_ENABLE_SIGNCOMMENT_BY_DRAFT設為"Y"), 則合併所有稿件的簽核意見後寫入ODWMSG.SIGN_COMM中
// 1130718	Raymond		Raymond		1120899		修正封裝成功傳送失敗時, 載入AOLProcessData.xml中的目前流程點新增的<版本>, 其附件資訊會與已過濾掉目前流程點的封裝檔的<簽核點定義>的附件資訊不一致, 若傳送前有調整過附件順序的話會導致附件資訊錯亂的問題, 比照載入封裝檔邏輯一併過濾掉目前流程點的<版本>
// 1130723	Raymond		Raymond		1130323		修正線上簽核公文執行文別轉換後, 儲存關閉後再開啟, 仍會套用成原來的排版設定檔的問題
// 1130731	Raymond		Raymond		中榮序157	修正分會合併後最後一個分會流程點未異動內文時, 使得最後一個流程點的文稿會記錄成跑分會前的最初版本, 但因最初版後面有其它分會流程點的異動, 導致分會合併後的流程點, 出現未顯示其它分會流程點的簽核物件, 及傳送時發生-729錯誤的問題, 以及分會合併後, 設為"分會合併=Y"的文稿不會標記為已異動, 導致不會匯出頁面的問題
// 1130805	Raymond		Raymond		中興序167	修正當傳送撤回或異動撤消回到分文分辦後第一次主辦流程點時, 因讀取AOLProcessData.xml時會略過目前流程點的<版本>, 使versions陣列裡沒東西而發生Cannot read properties of undefined (reading 'id'), 導致開不了公文轉圈圈的問題
// 1130805	Raymond		Raymond		中榮序157	修正判斷條件為目前流程點的文稿的ID是被廢止的版本時, 才修改為以下一個未被廢止的版本取代
// 1130805	David		Raymond		1120885		增加判斷ODWDCM.TVGH_HOSP_UUID有資料時, 才記錄至ODWMSG.SIGN_COMM
// 1130805	Raymond		Raymond		中榮序157	修正下一個<版本>是目前流程點修改的版本時, 因為被移除, 會發生_apd[i].versions[j + k]是undefined的問題
// 1130806	Raymond		Raymond		中榮序157	修正分會合併後第一個分會流程點有異動內文時, 主辦單位看不到第一個分會流程點的章的問題
// 1130809	Raymond		Raymond		1130313		合併1111007(1100394), 離線模式下僅檢核附件是否夾帶及外字, 其餘欄位不檢核, 不自動備份, 儲存變為另存整份公文並以ZIP壓縮下載, 連線/離線模式下開啟舊檔可開啟離線模式下另存的ZIP檔
// 1130809	Raymond		Raymond		1130313		合併1111007(1100394), 修正符合需重設發文日期、字號的角色時, 若在離線模式中不要呼叫fnGetIssueNo, 以解決發文繕校人員創稿時轉圈圈的問題
// 1130902	Raymond		Raymond		中榮序181	修正最後一個分會流程點異動簽稿會核單後會畢退回, 承辦人流程點分會合併後寫出的外部簽核記錄檔(XSignObjs.xml)會刪除分會流程點異動過的版本的問題
// 1130920	Raymond		Raymond		中榮序182	修正異動撤消回分會合併後主辦流程點, 因文稿管理檔中的簽稿會核單的"分會合併"屬性已於前次傳送清除掉了, 所以異動撤消後會無法判斷簽稿會核單應標記異動, 造成再傳送時發生-711錯誤的問題
// 1131115	Leslie		Leslie		1131142		[Merge-1080812]新增針對屬性的欄位檢核邏輯，重寫本段邏輯，並調整訊息邏輯為"整合式"
// 1131227	Leslie		Leslie		1130824		增修於公文儲存時，一律檢核參考附件檔案的可用性
// 1140422	Raymond		Leslie		1131282		[退輔會]增修草稿依設定是否啟用自動要號功能
// 1140424	Raymond		Raymond		1140666		修正當AOLProcessData.xml中同一文稿第1個版本無<附件清單>, 第2個版本有<附件清單>時, 會發生Error, 導致儲存時XSignObjs.xml資料異常影響傳送問題
// 1140425	David		Leslie		1131297		[退輔會]紀錄可發文稿件數及對應稿件受文者發文類型數量
// 1140425	Raymond		Raymond		1140686		修正待銷號資料夾可能會發生文號-00-99下的文稿附件檔已被送銷號前的帳號異動過但未傳送, 而發生在AOLProcessData.xml中找不到對應的附件GUID的情況, 這種情況下要忽略找不到附件頁面的提示警告
// 1140515	Raymond		Raymond		1140198		新增檢核匯入舊檔的FromNo屬性是否與其它文稿一致, 若不一致則提示警告訊息並終止匯入
// 1140610	Leslie		Leslie		1131183		[Merge]新增行動自然人憑證模組[1110117、1111006]
// 1140623	Raymond		Raymond		1131303		新增錯別字校正資料物件檔上下載、高亮稿面上的錯別字、取得錯別字所在稿序及頁次資訊等方法
// 1140625	Raymond		Raymond		1140837		修正新增的追蹤修訂有連帶設定粗斜體底線上下標時<mi act="ins" styles="1">, 列印時未顯示粗斜體底線上下標的問題
// 1140701	Raymond		Raymond		1140919		新增判讀環境變數「WE_AUTO_GEN_文稿批示單」擴充成兩個變數的設定值, 改記錄為兩個區域變數, 程式中判斷「WE_AUTO_GEN_文稿批示單」="Y"及判斷文別="存查批示單"的地方都改為判定變數
// 1140801	Kevin		Leslie		1141011		弱掃修正[Client DOM Stored XSS]，註解整個IE段落
// 1140815	Raymond		Raymond		1141232		修正離線版不提供錯別字校正功能
// 1140820	Raymond		Raymond		1140818		新增取得文稿的產生時間及取得APD中指定文稿的最後一個版本的方法
// 1140829	Leslie		Leslie		1140985		修正公文開啟時判斷參考附件是否可編輯的邏輯
// 1140916	Raymond		Raymond		1140861		新增稿件時, 若環境變數「AOL_AUTO_ADJ_DRAFT_ORDER_FOR_TPVGH」為"Y", 則依北榮邏輯排列新增的稿件的順序: 1.非發文->2.發文->3.簽稿會核單, 新的在上面
// 1140917	Leslie		Raymond		屏東序1469	修正在用AKI802的文稿編輯開啟DocView時, 因基資無folder、subfolder, 而導致轉圈圈的問題
// 1140926	Raymond		Raymond		1140818		V5再變更需求項目6, 判斷新增的環境變數「AOL_DISABLE_MODIFY_CON_OD99_TEXT_COMMENT」若設為"Y", 則停用「修改」他流程所新增之文字意見的功能
// 1140930	Leslie		Raymond		中榮序260	復原弱掃導致開啟舊檔載入的XML字串變成"&gt;函&gt;"這種形式而無法載入的問題
// 1141013	Raymond		Raymond		1141111		新增判斷若機關暱稱是"RRB"(鐵道局)時, 開啟舊檔的DI是"獎懲令"或"令"且令類別或函類別為"獎懲令"時, 不要將DI的"受文者/交換表"或"受文者/全銜"帶入
// 1141020	Raymond		Raymond		1141013		新增檢核是否允許便簽也提供自訂表格功能
// 1141022	Raymond		Raymond		1141125		新增從MP的樣版選單及齒輪按鈕的選單匯入多人格式調派令、晉升令、獎勵令CSV功能
// 1141110	Raymond		Raymond		1141113		新增上傳下載便利貼資料檔及便利貼相關功能
// 1141117	Raymond		Raymond		北榮序377	修正1140861新增函、簽稿會核單後, 再新增簽, 會變成插入在非可發文的簽稿會核單前, 函後的位置的問題
// 1141117	Raymond		Raymond		北榮序382	修正貼上稿件或開啟舊檔時, 支援簽核框增高的簽稿會核單會變成沒有高度的問題, 及套用樣版檔有"會辦意見列表"節點時, 搜尋原稿中"會稿單位列表"的"單位代碼", 再比對"會辦意見列表"是否有對應單位代碼的會辦意見, 若無則新增
// 1141118	Raymond		Raymond		1141442		修正儲存或備份時, 判斷新增的職名章或數位墨水的副檔名時, 可能會抓到空值, 導致上傳會發生簽核物件圖檔無副檔名的錯誤的問題
// 1141126	Raymond		Raymond		北榮序403	開啟舊檔或貼上稿件時, 不要套用(覆寫)舊檔的/*/@DefaultSign、/*/決行層次/@決行層級(北榮only)到新稿件
// 1141127	Raymond		Raymond		1141255		修正調換附件後匯出附件頁面有可能因為不正常關閉瀏覽器, 導致工作站仍將調換過順序的附件原始檔上傳到FileServer, 但公文文稿檔及DraftMgmt.xml仍記錄的是調換前的順序, 而發生附件原始檔案內容與頁面或附件說明不一致的問題, 順便修正當調換附件順序先下載附件檔後, 設定適合的MimeType, 以避免PDF類型附件附件子視窗中點擊"開啟", 會變成下載, 而不會主動開啟Acrobat Reader的問題
// 1141208	Raymond		Raymond		1141581		修正文稿(簽稿會核單)的ID若為分會單位異動後形式(MsgID-序號), 但文稿管理檔因不明原因未標記「分會合併="Y"」時, 檢查異動流程點是否處於分會流程點中, 是則強制改為已異動, 以避免傳送時發生-729錯誤問題
// 1141213	Raymond		Leslie					[國合會版更問題]修正正規表示式
// 1141216	Raymond		Raymond		1141632		擴充1120887的環境變數「WE_ADD_CON_WHILE_TRANSPORT」參數為3個, 第3個設為'Y'時, 若公文內無任何簽稿會核單則自動新增一筆簽稿會核單
// 1141218	Raymond		Raymond		北榮序453	因1140818禁止出組室過的非可發文文別異動內文, 但要對自動增高簽核區域功能允許異動
// 1141230	Raymond		Raymond		1141693		新增判斷cachedDM.dirty(), 以避免因排版因素導致的簽核畫面頁數與封裝檔不一致時, 誤判為內文有異動的問題
// 1141230	Raymond		Raymond		1141058		修正在唯讀資料夾(ex.會核中-主辦)列印第1筆是不匯出頁面的附件及第2筆以後是有匯出附件頁面的附件時, 會發生a.fileRef是null的錯誤, 導致轉圈圈的問題
// 1150106	Raymond		Raymond		1140971		新增檢核是否有加註簽辦意見, 有則視為有異動, 需要更新封裝檔
// 1150107	Raymond		Raymond		北榮序10	當SSO_CONFIG.OrgNickName為"TPVGH"(北榮)時, 匯入範本時清空署名2內容
// 1140107	Raymond		Raymond		1141682		當SSO_CONFIG.OrgNickName為"TPVGH"(北榮)時, "通知"類資料夾公文, 點儲存或傳送時, 一律不檢核任何文稿欄位
// 1150108	Raymond		Raymond		北榮序12	修正紙本簽核傳送時不需要自動新增簽稿會核單
// 1150108	Raymond		Raymond		1141307		備份時叫用DraftModel.save時新增action=backup的參數, 以供DraftModel.save判斷是備份行為的儲存
// 1150109	Raymond		Raymond		北榮序14	1141632判斷公文內無任何簽稿會核單時要自動新增一筆簽稿會核單的功能, 新增的簽稿會核單的承辦單位欄位要改用原承辦單位的一級單位名稱(INCHARGE_OU前2碼的OrgInfo的UnitName), 承辦人欄位改用原承辦人(IC_USER_NAME), 聯絡電話、分機、傳真、EMail等欄位則清空
// 1150121	Raymond		Raymond		外貿序35	修正便利貼的日期變星期的問題
// 1150206	David		David		序57		新增允許紙本轉線上後封裝檔無資料情形，比照草稿公文狀態處理

// 1100223 Raymond 1090864 新增客語難用字表, 設為全域陣列變數即可共用, 且避免重複下載
window._difficultWords = [];

function FolioModel() {

	// private members
	var _docObj;							// 代表整份公文(MSG)
	//var _draftMgmt = new DraftMgmt();     // 文稿管理檔
	var _draftMgmts = [];					// 文稿管理檔包含會辦單位子目錄, 會有多個
	var _currMgmt;							// 目前編輯中的文稿管理檔
	var _signFolder = new SignFolder();		// 簽核文件夾
	var _apd = new Array();
	var _cachedDM = new Array();
	var _views = new Array();				// Views物件
	var _newDraftId = 0;					// 新增文稿的ID
	var _refAttMgmt;						// 2016.11.1	Leslie	新增參考附件
	
	this.dirty = new Observable(false);		// 已異動旗標
	
	// 原DraftMgmt.xml中的資訊
	this.tcSessions;						// 追蹤修訂階段: UserID, Name, Color, MsgID(Key)
	this.drafts;							// 文稿: 名稱, 路徑, 修訂檔路徑, 原稿新增階段序號, GUID(Key), 最後匯出頁面階段序號, 刪除稿件階段序號, 造字數, 文別, 函類別, 附件REF, 對照表(路徑, GUID)
	this.attachments;						// 附件: ID, 名稱, 摘要, 路徑, GUID, hash
	
	// 原封裝檔中的資訊
	this.revisions = [];
	
	// 匯出頁面模組
	var _rndrAtt = new RndrAtt();
	var _RndrAttDirty = false;				// 2016.12.20	Leslie	已匯出之附件，是否已被異動
	
	var _isFirstSign;						// 2016.8.31 新增是否首次簽辦
	
	var _reserveSO = true;					// 2016.11.10 新增是否保留簽署物件, 預設要
	
	var _unvObj = null;						// 1090227 Raymond 1080751 合併內政部1070381若公文由AKI800調閱要從uiParam取得UNV檔物件
	
	var _isConUnit = false;					// 1070608 Raymond 1070197 記錄目前公文是否為會辦中公文
	
	var bNeedCheckAllDraftCls = false;		//1071224 David 1071231 紀錄是否需檢核所有稿件分類號

	var _isViewRefAtt = false;				// 1080125	Leslie[1070200]	是否已檢視參考附件
	
	// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
	var _showCustomName = ("WE_ATT_SHOW_CUSTOM_NAME" in theSSO.User.SystemSets)?theSSO.User.SystemSets["WE_ATT_SHOW_CUSTOM_NAME"] == "Y":false;
	
	var _tmpAttMgmt;						//1111012	Leslie[1110865]	新增顯示客製化簽閱附件
	
	var _saveAction;						// 1120809 Raymond 1120503 新增儲存動作
	
	// 1130606	Leslie[1130077]	[併1130078]當系統於當前文稿觸發自動備份後，若使用者操作增/刪文稿、附件(連動影響封裝內容)時，則主動觸發一次自動備份
	var _backuped = false;
	
	//var _fixWordData = new FixWordData();	// 1140121 Raymond 1131303 新增錯別字校正資料物件
	var _fixWordData = (!!theSSO && theSSO.offlineMode == true)?undefined:new FixWordData();	// 1140815 Raymond 1141232 修正離線版不提供錯別字校正功能
	
	// 1140701 Raymond 1140919 新增自動新增文稿批示單的環境變數設定值(擴充成兩個變數)
	var _autoGenInstructionSheet = false;					// 原單1100296的是否啟用自動新增文稿批示單
	var _autoGenInstructionSheet2ndDocType = "存查批示單";	// 擴充變數後的判定文別, 若有設定的話應為"便簽"
	
	// 1141107 Raymond 1141113 新增便利貼相關變數
	var _lastNoteSN = 0;
	var _noteData = {lastModifyMsgId: undefined, lastModifiedTime: undefined, list: []};
	
	// private methods
	function _parseAPD(xmlDoc) {
		$.each($(xmlDoc.documentElement).find("簽署文稿"), function(i, nd) {
			_apd.push({
				guid: nd.getAttribute("識別碼"),
				subDocType: nd.getAttribute("次文別"),
				lastAutoObj: nd.getAttribute("最近自動物件"),
				printXSL: nd.getAttribute("print-xsl"),
				versions: new Array()
			});
			$.each(nd.getElementsByTagName("版本"), function(j, nd2) {
				// 1130718 Raymond 1120899 修正封裝成功傳送失敗時, 載入AOLProcessData.xml中的目前流程點新增的<版本>, 其附件資訊會與已過濾掉目前流程點的封裝檔的<簽核點定義>的附件資訊不一致, 若傳送前有調整過附件順序的話會導致附件資訊錯亂的問題, 比照載入封裝檔邏輯一併過濾掉目前流程點的<版本>
				if(!!_docObj.msgId && _docObj.msgId == nd2.getAttribute("建立流程點")) {
					theLogger.warn("AOLProcessData.XML記錄的簽署文稿" + _apd[_apd.length - 1].guid + "的<版本 文件夾識別碼='" + nd2.getAttribute("文件夾識別碼") + "'>與本流程點相同MsgID(" + _docObj.msgId + "), 應為封裝成功傳送失敗, 忽略載入此<版本>");
				}
				else {
				_apd[_apd.length-1].versions.push({
					id: nd2.getAttribute("文件夾識別碼"),
					docType: nd2.getAttribute("文別"),
					copy: nd2.getAttribute("抄本"),
					reserveSO: nd2.getAttribute("保留簽署意見"),	// 2015.4.14 新增讀取保留簽署意見屬性功能
					printXSL: nd2.getAttribute("print-xsl"),		// 2016.12.27 新增printXSL
					cMsgId: nd2.getAttribute("建立流程點"),			// 1061002 Raymond 新增建立流程點
					aMsgId: nd2.getAttribute("廢止流程點"),			// 1130731 Raymond 中榮序157 新增廢止流程點
					atts: []										// 1140424 Raymond 1140666 修正AOLProcessData.xml中同一文稿第1個版本無<附件清單>, 第2個版本有<附件清單>時, 會發生Error, 導致XSignObjs.xml資料異常問題
				});
				var attsNode = nd2.getElementsByTagName("附件清單");
				if(attsNode.length == 1) {
					var ver = _apd[_apd.length-1].versions[_apd[_apd.length-1].versions.length-1];
					ver.atts = [];
					$.each(attsNode[0].getElementsByTagName("附件"), function(k, nd3) {
						ver.atts.push({
							guid: nd3.getAttribute("識別碼"),
							id: nd3.getAttribute("文件夾識別碼")
						});
					});
				}
				// 1071222 Raymond 新增讀取簽核區域功能, 以供寫SignWork.xml時計算簽核區域內相對座標為頁面絕對座標
				var saNodes = nd2.getElementsByTagName("簽核區域");
				if(saNodes.length > 0) {
					var ver = _apd[_apd.length-1].versions[_apd[_apd.length-1].versions.length-1];
					ver.sas = [];
					$.each(saNodes, function(k, nd3) {
						ver.sas.push({
							type: nd3.getAttribute("類型"),
							id: nd3.getAttribute("代碼"),
							left: nd3.getAttribute("left"),
							top: nd3.getAttribute("top"),
							right: nd3.getAttribute("right"),
							bottom: nd3.getAttribute("bottom")
						});
					});
				}
				}	// end of 1130718 Raymond 1120899 
			});
			// 1130805 Raymond 中興序167 修正當傳送撤回或異動撤消回到分文分辦後第一次主辦流程點時, 因讀取AOLProcessData.xml時會略過目前流程點的<版本>, 使versions陣列裡沒東西而發生Cannot read properties of undefined (reading 'id'), 導致開不了公文轉圈圈的問題
			if(_apd[_apd.length-1].versions.length == 0) {
				theLogger.warn("因文稿(" + _apd[_apd.length-1].guid + ")下無任何<版本>, 刪除AOLProccessData資料中的此文稿, 以避免後續功能在比對<簽核文稿>的GUID符合目前文稿時, 再讀取其下<版本>會發生錯誤的問題");
				_apd.splice(_apd.length-1, 1);
			}
		});
		// 1100512 Raymond 1090821 解析外會公文的頁面呈現檔
		$.each($(xmlDoc.documentElement).find("EXORG_PRESENT_DATA"), function(i, nd) {
			_apd.ExorgPresentData = {
				msgId: nd.getAttribute("msgId"),
				comDocNo: nd.getAttribute("comDocNo"),
				comOrgNo: nd.getAttribute("comOrgNo"),
				comOrgName: nd.getAttribute("comOrgName"),
				pages: new Array()};
			var pageListNode = nd.getElementsByTagName("PAGE_LIST");
			if(pageListNode.length == 1) {
				$.each(pageListNode[0].getElementsByTagName("Page"), function(j, nd2) {
					_apd.ExorgPresentData.pages.push({ImgFilename: nd2.getAttribute("ImgFilename")});
				});
			}
		});
		_apd.rawXml = xmlDoc;	// 2015.5.6 用於搜尋
		if("xml" in xmlDoc)	// for IE-compatible
			theLogger.log(xmlDoc.xml);
		else
			theLogger.log(xmlDoc);
	}
	
	function _lookupDraftGUID(id) {
		for(var i=0; i<_apd.length; i++) {
			for(var j=0; j<_apd[i].versions.length; j++) {
				if(_apd[i].versions[j].id == id)
					return _apd[i].guid;
			}
		}
		theLogger.warn("AOLProccessData.xml中找不到文稿ID:" + id + "的版本所對應的文稿GUID");	// 2016.11.30 加說明
		return null;
	}
	
	function _lookupDraftID(guid) {
		for(var i=0; i<_apd.length; i++) {
			if(_apd[i].guid == guid) {
				return _apd[i].versions[_apd[i].versions.length - 1].id;
			}
		}
		theLogger.warn("AOLProccessData.xml中找不到文稿GUID:" + guid + "所對應的最新版本文稿ID");	// 2016.11.30 加說明
		return null;
	}
	
	// 2015.4.14 尋找保留簽署意見的不同版本文稿ID
	function _getReserveSODraftIDs(id) {
		var res = [];
		for(var i=0; i<_apd.length; i++) {
			for(var j=0; j<_apd[i].versions.length; j++) {
				if(_apd[i].versions[j].id == id) {
					for(var k=j-1; k>=0; k--) {
						if(_apd[i].versions[k].reserveSO) {
							res.push(_apd[i].versions[k].id);
						}
						else
							break;
					}
					theLogger.log("保留簽核意見的文稿:");
					theLogger.log(res);
					return res;
				}
			}
		}
		theLogger.warn("找不到符合文稿ID的版本!");
		return res;
	}
	
	// 2015.5.6 搜尋指定ID的簽核物件
	function _getAPDSOByID(id) {
		if(typeof _apd.rawXml != "undefined") {
			try {	// 2016.5.18 for Edge不支援中文XPath查詢
				var nlist = _apd.rawXml.evaluate("//*[@文件夾識別碼='" + id + "']", _apd.rawXml, null, 7, null);
				if(nlist.snapshotLength == 1)
					return nlist.snapshotItem(0);
				if(nlist.snapshotLength == 0)
					theLogger.warn("AOLProccessData.xml中找不到文件夾識別碼為'" + id + "'的節點");
				else
					theLogger.warn("AOLProccessData.xml中文件夾識別碼為'" + id + "'的節點有" + nlist.snapshotLength + "個");
			}
			catch(e) {
				theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
				theLogger.warn("改用querySelector...");
				var res = _apd.rawXml.querySelector("*[文件夾識別碼='" + id + "']");
				if(res)
					return res;
				else
					theLogger.warn("AOLProccessData.xml中找不到文件夾識別碼為'" + id + "'的節點");
			}
		}
	}
	
	// 2016.11.7 新增依GUID尋找文稿管理檔中正確的index
	function _getMappedDraftIndex(idx) {
		var draft = _signFolder.getDraft(idx);
		var guid = _lookupDraftGUID(draft.id);      // 透過AOLProcessData.xml尋找對應索引值的文稿GUID
		// 2016.2.1 文稿管理檔改成複數, KEY為子目錄名稱
		for(dir in _draftMgmts) {
			var res = _draftMgmts[dir].getDraftIndex(guid);	// 改用getDraftIndex(GUID)來確定該文稿是否存在於這個文稿管理檔中
			if(res >= 0)
				return res;
		}
		return null;	// 都找不到才回傳null
	}
	
	function _getMappedDraftName(idx) {         // 尋找文稿管理檔中對應的稿序名稱
		var draft = _signFolder.getDraft(idx);
		if("fromType" in draft)
			return "來文內容";
		// 1100512 Raymond 1090821 外會公文的頁面記錄方式為"單層式", 要回應無DM
		if(!!draft.draftPages && draft.draftPages.method == "單層式")
			return draft.name;
		if(draft.name == "來文簽辦")	// 2016.1.15 新增來文簽辦型態
			return draft.name;
		var guid = _lookupDraftGUID(draft.id);  // 透過AOLProcessData.xml尋找對應索引值的文稿GUID
		// 2016.2.1 文稿管理檔改成複數, KEY為子目錄名稱
		for(dir in _draftMgmts) {
			var idx = _draftMgmts[dir].getDraftIndex(guid);	// 改用getDraftIndex(GUID)來確定該文稿是否存在於這個文稿管理檔中
			if(idx >= 0)
				return _draftMgmts[dir].getDraftName(idx);
		}
		return null;	// 都找不到才回傳null
	}
	
	function _getMappedDraftFileName(idx) {         // 尋找文稿管理檔中對應的稿序檔名
		var draft = _signFolder.getDraft(idx);
		if("fromType" in draft) {
			throw new Error("來文目前不支援動態產生頁面");
		}
		var guid = _lookupDraftGUID(draft.id);      // 透過AOLProcessData.xml尋找對應索引值的文稿GUID
		// 2016.2.1 文稿管理檔改成複數, KEY為子目錄名稱
		for(dir in _draftMgmts) {
			var idx = _draftMgmts[dir].getDraftIndex(guid);	// 改用getDraftIndex(GUID)來確定該文稿是否存在於這個文稿管理檔中
			if(idx >= 0)
				return _draftMgmts[dir].getDraftFileName(idx);
		}
		return null;	// 都找不到才回傳null
	}
	
	// 1090804 Raymond 1090409 新增draftPrintXSL參數, 為文稿管理檔記錄的稿的樣版檔路徑
	// 2015.1.22 - Raymond, 由於文管理檔的文稿順序可能與封裝檔中的文稿順序不一致, 需改用GUID查找
	//function _getMappedDraftPrintXSL(guid) {         // 尋找AOLProcessData.xml中對應文稿的print-xsl屬性
	function _getMappedDraftPrintXSL(guid, draftPrintXSL) {
		// 透過AOLProcessData.xml尋找對應索引值的文稿print-xsl屬性值
		for(var i=0; i<_apd.length; i++) {
			if(_apd[i].guid == guid) {
				// 2016.12.27 先看最後一個版本有沒有printXSL, 有則回傳, 無再回傳簽署文稿這一層的printXSL
				if(typeof _apd[i].versions[_apd[i].versions.length-1].printXSL === "string" && _apd[i].versions[_apd[i].versions.length-1].printXSL.length > 0) {	// 2017.3.14 TODO: 貼上文稿或轉換文別時會重設最後版本的printXSL為空, 且儲存後, 轉換後文別的printXSL是記錄在SignWork.xml的, 載入時未更新_apd的記錄, 再讀取origPrintXSL時又會回傳錯誤的printXSL
					// 1090804 Raymond 1090409 檢查若AOLProcessData.xml所記錄最新版本為抄本, 則取文稿管理檔所記錄稿的樣版檔回傳
					if(_apd[i].versions[_apd[i].versions.length-1].copy == "true" && !!draftPrintXSL && draftPrintXSL.length > 0) {
						theLogger.log("文稿" + guid + "最新匯出抄本頁面, 改套用文稿管理檔的稿用排版設定檔'" + draftPrintXSL + "'");
						return draftPrintXSL;
					}
					// 1130723 Raymond 1130323 修正線上簽核公文執行文別轉換後, 儲存關閉後再開啟, 仍會套用成原來的排版設定檔的問題
					var d = _signFolder.getDraftByGUID(guid);
					if(!!d && !!d.applyPrintXSL)	// d有applyPrintXSL
						return d.applyPrintXSL;
					return _apd[i].versions[_apd[i].versions.length-1].printXSL;
				}
				return _apd[i].printXSL;
			}
		}
		return null;
	}
	
	// 1070608 Raymond 1070197 新增依文稿index->GUID尋找對應的文稿管理檔及idx
	function _getMappedDraftIndexAndMgmt(idx) {
		var draft = _signFolder.getDraft(idx);
		var guid = _lookupDraftGUID(draft.id);      // 透過AOLProcessData.xml尋找對應索引值的文稿GUID
		for(dir in _draftMgmts) {// 文稿管理檔為複數, KEY為子目錄名稱
			var res = _draftMgmts[dir].getDraftIndex(guid);	// 改用getDraftIndex(GUID)來確定該文稿是否存在於這個文稿管理檔中
			if(res >= 0)
				return {dmgt: _draftMgmts[dir], idx: res};
		}
		return null;	// 都找不到才回傳null
	}
	
	// 2015.1.22 - Raymond, 由於文管理檔的文稿順序可能與封裝檔中的文稿順序不一致, 需改用GUID查找
	// 2016.8.1 - 新增printXSLType參數
	function _setMappedDraftApplyPrintXSL(guid, path, printXSLType) {	// 設定文稿的apply-print-xsl屬性,供GenPage元件讀取
		for(var i=0; i<_apd.length; i++) {
			if(_apd[i].guid == guid) {
				// 2015.1.26 - Raymond, 修正判斷版本順序, 由新(後)往舊(前)找起
				if(_apd[i].versions.length > 0) {
					for(var j=_apd[i].versions.length-1; j>=0; j--) {
						var draft;
						try {
							draft = _signFolder.getDraftById(_apd[i].versions[j].id);
						}
						catch(e) {
							theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
						}
						if(draft) {
							if("fromType" in draft) {
								theLogger.error("來文目前不支援動態產生頁面, 無法設定applyPrintXSL");
							}
							else {
								draft.applyPrintXSL = path;
								draft.printXSLType = printXSLType;	// 2016.8.1 新增printXSLType參數
								
								// 2016.8.18 APD記錄也要改
								//theLogger.log("APD的文稿(GUID:" + _apd[i].guid + ")的printXSL由'" + _apd[i].printXSL + "'變更為'" + path + "'");
								//_apd[i].printXSL = path;
								// 2016.12.27 改在此版本
								theLogger.log("APD的文稿(GUID:" + _apd[i].guid + ")的版本[" + j + "]的printXSL由'" + _apd[i].versions[j].printXSL + "'變更為'" + path + "'");
								_apd[i].versions[j].printXSL = path;
							}
							break;
						}
					}
				}
				else
					theLogger.error("AOLProcessData.xml的文稿'" + guid + "'下無任何版本節點");
			}
		}
	}
	
	// 2016.11.18 新增更名稿序名稱功能
	function _setMappedDraftName(draft) {
		if("fromType" in draft)
			theLogger.error("稿序名稱'來文內容'不可更名");
		if(draft.name == "來文簽辦")	// 來文簽辦型態
			theLogger.error("稿序名稱'" + draft.name + "'不可更名");
		var guid = _lookupDraftGUID(draft.id);  // 透過AOLProcessData.xml尋找對應索引值的文稿GUID
		if(!!guid) {
			// 2016.2.1 文稿管理檔改成複數, KEY為子目錄名稱
			for(dir in _draftMgmts) {
				var idx = _draftMgmts[dir].getDraftIndex(guid);	// 改用getDraftIndex(GUID)來確定該文稿是否存在於這個文稿管理檔中
				if(idx >= 0) {
					_draftMgmts[dir].setDraftName(idx, draft.name);
					return true;
				}
			}
			theLogger.error("找不到含有稿件GUID為'" + guid + "'的文稿管理檔");
		}
		else
			theLogger.error("找不到稿件ID為'" + draft.id + "'的GUID");
	}
	
	/* 2016.3.21 這個函式的判斷錯了, 改用SSOUtil.isConsultingDoc取代
	// 2016.2.1 新增判斷是否為會辦單位
	function _isConUnit() {
		if(!_docObj) {
			theLogger.error("尚未指定開啟公文, 無法判斷是否為會辦單位!");
			throw new Exception("尚未指定開啟公文, 無法判斷是否為會辦單位!");
		}
		
		// 規則1: ICOUId不同於OwnOUId則是會辦公文, 僅比較一級是否相同(單位代碼前2碼)
		if(_docObj.ICOUId.substring(0, 2) == _docObj.ownOUId.substring(0, 2)) {
			// 規則2: 相同一級單位, 須排除內會情況
			var innerConFldrs = theSSO.User.EnvSettings.get("OD_INNER_COOP_FOLDERS");
			if(innerConFldrs && innerConFldrs.length > 0) {
				innerConFldrs = ";" + innerConFldrs + ";";
				var testFldr = ";" + _docObj.folder + "-" + _docObj.subfolder + ";";
				if(innerConFldrs.indexOf(testFldr) >= 0) {
					theLogger.log("目前公文夾位於'" + _docObj.folder + "-" + _docObj.subfolder + "'資料夾, 此單位屬於內會單位!");
					return true;
				}
				else {
					theLogger.log("相同一級單位代碼(" + _docObj.ICOUId.substring(0, 2) + "), 且位於'" + _docObj.folder + "-" + _docObj.subfolder + "'資料夾, 此單位不是會辦單位!");
					return false;
				}
			}
			else {
				theLogger.log("相同一級單位代碼(" + _docObj.ICOUId.substring(0, 2) + "), 此單位不是會辦單位!");
				return false;
			}
		}
		else {	// 規則3: 不同一級單位須排除決行、總發等單位才是會辦單位
			var orgNode = SSOUtil.getOrgNode(_docObj.sourceOrgNo);
			if(orgNode) {
				var $u = $(orgNode).find("Unit[UnitCode='" + _docObj.ICOUId.substring(0, 2) + "']");
				if($u.length > 0) {
					var vc = SSOUtil.xml_getChildNodeValue($u.get(0), 'Virtual');
					if(vc.length > 0) {
						if(vc == "2") {
							theLogger.log("不同一級單位代碼(" + _docObj.ICOUId.substring(0, 2) + "), Virtual(2)為虛擬單位, 此單位不是會辦單位!");
							return false;
						}
						else if(vc == "3") {
							theLogger.log("不同一級單位代碼(" + _docObj.ICOUId.substring(0, 2) + "), Virtual(3)為一層決行單位, 此單位不是會辦單位!");
							return false;
						}
						theLogger.log("不同一級單位代碼(" + _docObj.ICOUId.substring(0, 2) + "), Virtual(" + vc + ")非一層決行或虛擬單位, 此單位是會辦單位!");
						return true;
					}
					else {
						theLogger.error("找不到'" + _docObj.ICOUId + "'的Virtual節點或為空, 無法判斷是否為會辦單位!");
						throw new Error("找不到'" + _docObj.ICOUId + "'的Virtual節點或為空, 無法判斷是否為會辦單位!");
					}
				}
				else {
					theLogger.error("找不到'" + _docObj.ICOUId + "'的Unit節點, 無法判斷是否為會辦單位!");
					throw new Error("找不到'" + _docObj.ICOUId + "'的Unit節點, 無法判斷是否為會辦單位!");
				}
			}
			else {
				theLogger.error("找不到'" + _docObj.sourceOrgNo + "'的OrgInfo節點, 無法判斷是否為會辦單位!");
				throw new Error("找不到'" + _docObj.sourceOrgNo + "'的OrgInfo節點, 無法判斷是否為會辦單位!");
			}
		}
	}*/
	
	// 1080211 Raymond 1080052 新增密等參數並呼叫CheckCls檢核分類號是否可用
	// 2016.12.26 檢核開啟舊檔的分類號是否可用
	//function checkClsNo(clsNo) {
	function checkClsNo(clsNo, sec) {
		// 1080211 Raymond 1080052 新增呼叫CheckCls
		var DocSec = "1";
		if ((sec == "" && _docObj.secret > 1) ||
			(sec == "密" && _docObj.secret > 2) ||
			(sec == "機密" && _docObj.secret > 3) ||
			(sec == "極機密" && _docObj.secret > 4))
			DocSec = _docObj.secret;	// 用最高密等
		var params = {
			"ClassNo": clsNo,
			"UserID": theUserInfo.UserID,
			"OrgNo": theUserInfo.OrgID,
			"SecNo": DocSec};
		// 1090429 Raymond 1090001 新增第5參數, 傳入公文文號前3碼做為年度號
		if(_docObj.docNo.length > 3)
			params["argYear"] = _docObj.docNo.substr(0, 3);
		// 1090609 Raymond 1090001 未取文號時, 也要傳入新增的第5參數
		else
			params["argYear"] = "";
		// 1090429 Raymond 1090001 回傳值改成物件, 檢核可用時還須包含回傳的保存年限
		//var checkPass = false;
		var res = {checkPass:false, keepYear:""};
		theWebServices.invokeWS(SSO_CONFIG.getWSUrl("webeditws"), "CheckCls", "T2100", params, false, function(r) {	// 同步
			console.log("CheckCls returns: ");
			console.log(r);
			if("ErrorClass" in r && r.ErrorClass.IsErr == "true") {
				theLogger.error("檢核分類號'" + clsNo + "'不可用(" + r.ErrorClass.ErrMessage.anyType.text + ")");
			}
			else {
				// TODO: 檢核保存年限?
				//if(r.KeepYear != keepYear) {
					
				//}
				// 1090429 Raymond 1090001 回傳值改成物件, 檢核可用時還須包含回傳的保存年限
				//checkPass = true;
				res.checkPass = true;
				res.keepYear = r.KeepYear;
			}
		});
		// 1090429 Raymond 1090001 回傳值改成物件, 檢核可用時還須包含回傳的保存年限
		//return checkPass;
		return res;
	}
	
	// 1080211 Raymond 1080052 新增分類號參數並呼叫CheckCase檢核案次號是否可用
	// 2016.12.26 檢核開啟舊檔的案次號是否可用
	//function checkCaseNo(caseNo) {
	function checkCaseNo(caseNo, clsNo) {
		var params = {
			"ClassNo": clsNo,
			"CaseNo": caseNo,
			"UserID": theUserInfo.UserID,
			"OrgNo": theUserInfo.OrgID};
		// 1090429 Raymond 1090001 新增第5參數, 傳入公文文號前3碼做為年度號
		if(_docObj.docNo.length > 3)
			params["argYear"] = _docObj.docNo.substr(0, 3);
		// 1090609 Raymond 1090001 未取文號時, 也要傳入新增的第5參數
		else
			params["argYear"] = "";
		var checkPass = false;
		theWebServices.invokeWS(SSO_CONFIG.getWSUrl("webeditws"), "CheckCase", "T2100", params, false, function(r) {	// 同步
			console.log("CheckCase returns: ");
			console.log(r);
			if("ErrorClass" in r && r.ErrorClass.IsErr == "true") {
				theLogger.error("檢核案次號'" + caseNo + "'不可用(" + r.ErrorClass.ErrMessage.anyType.text + ")");
			}
			else {
				checkPass = true;
			}
		});
		return checkPass;
	}
	
	// 1110526 Raymond 1110521 新增第2參數fromMgmt, 若傳入true, 表示是文稿管理檔記錄的文稿檔本身就是DI檔, 不是開啟舊檔匯入的
	// 2016.12.26 匯入DI時的前置處理
	//function preprocessXML(xmlDoc) {
	function preprocessXML(xmlDoc, fromMgmt) {
		function wrapNode(nd, nm) {
			var newNode = xmlDoc.createElement(nm);
			nd.parentNode.insertBefore(newNode, nd);
			newNode.appendChild(nd);
			return newNode;
		}
		function addRcvr(xmlDoc, nd, issueType) {
			if(("text" in nd && nd.text.length == 0) || ("textContent" in nd && nd.textContent.length == 0)) {
				theLogger.warn("忽略匯入" + issueType + "受文者, 因為'" + nd.tagName + "'無內容");
			}
			// 1110614 Raymond 1110547 合併一代1010558, 匯入的DI的受文者若為<姓名>時一律轉為<全銜>匯入, 以修正<姓名>受文者不會匯入的問題
			// 1110505 Raymond 1110521 修正主持人是姓名的情況下會未匯入的問題
			//else if(nd.tagName == "全銜") {
			//else if(nd.tagName == "全銜" || (nd.tagName == "姓名" && issueType == "主持人")) {
			else if(nd.tagName == "全銜" || nd.tagName == "姓名") {
				var rcvr = xmlDoc.createElement("受文者");
				rcvr.setAttribute("本別", issueType);
				//rcvr.setAttribute("CreateSN", );
				
				var nd3 = xmlDoc.createElement("全銜");
				if("text" in nd3)
					nd3.text = nd.text;
				else
					nd3.textContent = nd.textContent;
				rcvr.appendChild(nd3);
				
				nd3 = xmlDoc.createElement("正式名稱");	// 2016.12.29 補上正式名稱
				if("text" in nd3)
					nd3.text = nd.text;
				else
					nd3.textContent = nd.textContent;
				rcvr.appendChild(nd3);
				
				rcvr.appendChild(xmlDoc.createElement("機關代碼"));
				rcvr.appendChild(xmlDoc.createElement("單位代碼"));
				rcvr.appendChild(xmlDoc.createElement("姓名"));
				rcvr.appendChild(xmlDoc.createElement("地址"));
				rcvr.appendChild(xmlDoc.createElement("郵遞區號"));
				rcvr.appendChild(xmlDoc.createElement("FEP交換代碼"));
				
				nd3 = xmlDoc.createElement("發文方式");
				if("text" in nd3)
					nd3.text = "郵寄";			// 2016.12.29 FDA複測時說一代匯入DI後是郵寄, 那就郵寄吧
				else
					nd3.textContent = "郵寄";	// 2016.12.29 FDA複測時說一代匯入DI後是郵寄, 那就郵寄吧
				rcvr.appendChild(nd3);
				
				nd3 = xmlDoc.createElement("含附件");
				if(issueType == "正本" || issueType == "主持人") {
					if("text" in nd3)
						nd3.text = "否";			// 2016.12.29 FDA複測時說一代匯入DI後是否, 那就否吧
					else
						nd3.textContent = "否";		// 2016.12.29 FDA複測時說一代匯入DI後是否, 那就否吧
				}
				else {
					if("text" in nd3)
						nd3.text = "否";
					else
						nd3.textContent = "否";
				}
				rcvr.appendChild(nd3);
				
				rcvr.appendChild(xmlDoc.createElement("櫃號"));
				rcvr.appendChild(xmlDoc.createElement("匣道"));
				rcvr.appendChild(xmlDoc.createElement("SYSID"));
				rcvr.appendChild(xmlDoc.createElement("Email"));
				rcvr.appendChild(xmlDoc.createElement("內部"));
				rcvr.appendChild(xmlDoc.createElement("海外單位"));
				rcvr.appendChild(xmlDoc.createElement("國別"));
				rcvr.appendChild(xmlDoc.createElement("郵寄地區"));
				
				ndList.appendChild(rcvr);
			}
			else if(nd.tagName == "單位名") {
				
			}
			else if(nd.tagName == "總稱") {
				
			}
		}
		// 1121222 Raymond 領務局345 改為保留格式化資訊的完稿XML
		// 1071025 Raymond 新增預處理開啟舊檔前, 先轉為無追蹤修訂標籤及\t\r\n字元的XML
		//theLogger.log("預處理開啟舊檔轉成完稿XML...");
		//var cleanXml = transCmplXml(xmlDoc);
		theLogger.log("預處理開啟舊檔轉成保留格式化資訊的完稿XML...");
		// 1140515 Raymond 1140198 新增傳入第2參數true, 保留根節點的當FromNo屬性
		//var cleanXml = transCmplXmlWithFmt(xmlDoc);
		var cleanXml = transCmplXmlWithFmt(xmlDoc, true);
		if(!!cleanXml) {
			theLogger.log("取代原檔的根節點");
			xmlDoc.replaceChild(cleanXml.documentElement, xmlDoc.documentElement);
		}
		else
			theLogger.error("失敗?");
		
		if("selectSingleNode" in xmlDoc) {	// for IE
			//1140801	Leslie[1141011]	弱掃修正[Client DOM Stored XSS]，註解整個IE段落
			// // 附件->附件列表
			// var nd = xmlDoc.selectSingleNode("/*/附件");
			// if(!!nd) {
				// theLogger.log("將附件轉為附件列表");
				// var ndList = nd.parentNode.insertBefore(xmlDoc.createElement("附件列表"), nd);
				// var nd2 = xmlDoc.selectSingleNode("/*/附件/文字");
				// if(!!nd2) {
					// ndList.appendChild(nd2);
				// }
				// ndList.parentNode.removeChild(nd);
			// }
			
			// // 受文者->受文者列表
			// nd = xmlDoc.selectSingleNode("/*/受文者");
			// if(!!nd) {
				// theLogger.log("將受文者轉為受文者列表");
				// var ndList = nd.parentNode.insertBefore(xmlDoc.createElement("受文者列表"), nd);
				// var tx = xmlDoc.createElement("文字");
				// ndList.appendChild(tx);
				
				// var nd2 = xmlDoc.selectSingleNode("/*/受文者/交換表");
				// if(!!nd2)
					// tx.text = nd2.text;
				// else {
					// nd2 = xmlDoc.selectSingleNode("/*/受文者/全銜");	// 2017.1.3 新增
					// if(!!nd2)
						// tx.text = nd2.text;
				// }
				// ndList.parentNode.removeChild(nd);
				
				// function addIssueTypeRcvrs(issueType) {
					// var nd3 = xmlDoc.selectSingleNode("/*/" + issueType);
					// if(!!nd3) {
						// for(var i=0; i<nd3.childNodes.length; i++)
							// addRcvr(xmlDoc, nd3.childNodes[i], issueType);
						// xmlDoc.documentElement.removeChild(nd3);
					// }
				// }
				// // 正本
				// addIssueTypeRcvrs("正本");
				// // 副本
				// addIssueTypeRcvrs("副本");
				// // 抄本
				// addIssueTypeRcvrs("抄本");
				// // 主持人
				// addIssueTypeRcvrs("主持人");
				// // 出席者
				// addIssueTypeRcvrs("出席者");
				// // 列席者
				// addIssueTypeRcvrs("列席者");
			// }
			
			// // 發文機關->發文機關列表
			// nd = xmlDoc.selectSingleNode("/*/發文機關");
			// if(!!nd) {
				// theLogger.log("將發文機關轉為發文機關列表");
				// var ndList = wrapNode(nd, "發文機關列表");
			// }
			
			// // 開會時間->開會時間列表
			// nd = xmlDoc.selectSingleNode("/*/開會時間");
			// if(!!nd) {
				// theLogger.log("將開會時間轉為開會時間列表");
				// var ndList = wrapNode(nd, "開會時間列表");
			// }
			
			// // 簽, 新增敬陳
			// if(xmlDoc.documentElement.tagName == "簽") {
				// nd = xmlDoc.selectSingleNode("/*/敬陳");
				// if(!nd) {
					// theLogger.log("文別是簽, 新增敬陳");
					// xmlDoc.documentElement.appendChild(xmlDoc.createElement("敬陳"));
				// }
				// // 1110506 Raymond 1110521 新增匯入簽的"年月日"為"發文日期/年月日"
				// nd = xmlDoc.selectSingleNode("/*/年月日");
				// if(!!nd) {
					// theLogger.log("將簽的年月日轉為發文日期/年月日");
					// var ndList = wrapNode(nd, "發文日期");
				// }
				// // 1110506 Raymond 1110521 新增匯入簽的"機關/全銜"為"發文機關列表/發文機關/承辦單位"
				// nd = xmlDoc.selectSingleNode("/*/機關/全銜");
				// if(!!nd) {
					// theLogger.log("將簽的'機關/全銜'轉為'發文機關列表/發文機關/承辦單位'");
					// var ndList = nd.parentNode.parentNode.insertBefore(xmlDoc.createElement("發文機關列表"), nd.parentNode);
					// var orgNd = xmlDoc.createElement("發文機關");
					// var icNd = xmlDoc.createElement("承辦單位");
					// icNd.text = nd.text;
					// orgNd.appendChild(icNd);
					// ndList.appendChild(orgNd);
					// nd.parentNode.parentNode.removeChild(nd.parentNode);
				// }
			// }
			// // 1110506 Raymond 1110521 新增支援匯入開會/會勘通知單的聯絡人及電話
			// if(xmlDoc.documentElement.tagName == "開會通知單" || xmlDoc.documentElement.tagName == "會勘通知單") {
				// nd = xmlDoc.selectSingleNode("/*/聯絡人及電話");
				// if(!!nd) {
					// theLogger.log("將" + xmlDoc.documentElement.tagName + "的聯絡人及電話轉為發文機關列表/發文機關/承辦人及發文機關列表/發文機關/電話");
					// var nd2 = xmlDoc.selectSingleNode("/*/發文機關列表/發文機關");
					// if(!!nd2) {
						// var ss = nd.selectSingleNode("姓名");
						// if(!!ss) {
							// var icUsrNd = xmlDoc.createElement("承辦人");
							// icUsrNd.text = ss.text;
							// nd2.appendChild(icUsrNd);
						// }
						// ss = nd.selectSingleNode("電話");
						// if(!!ss) {
							// var telNd = xmlDoc.createElement("聯絡電話");
							// telNd.text = ss.text;
							// nd2.appendChild(telNd);
						// }
						// nd.parentNode.removeChild(nd);
					// }
				// }
			// }
			// // 1110526 Raymond 1110521 新增判斷若fromMgmt為true, 則處理機關地址及聯絡方式等標籤
			// if(fromMgmt == true) {
				// nd = xmlDoc.selectSingleNode("/*/地址");
				// if(!!nd) {
					// theLogger.log("將" + xmlDoc.documentElement.tagName + "的地址轉為發文機關列表/發文機關/機關地址");
					// var nd2 = xmlDoc.selectSingleNode("/*/發文機關列表/發文機關");
					// if(!!nd2) {
						// var orgAddr = xmlDoc.createElement("機關地址");
						// orgAddr.text = nd.text;
						// nd2.appendChild(orgAddr);
					// }
				// }
				
				// var nl = xmlDoc.selectNodes("/*/聯絡方式");
				// if(nl.length > 0) {
					// for(var i=0; i<nl.length; i++) {
						// var str = nl[i].text;
						// if(!!str && str.length > 0) {
							// var m = str.match(/(承辦人|電話|分機|傳真|電子信箱)[：:]([\W\w]*)/);
							// if(!!m) {
								// var nd2 = xmlDoc.selectSingleNode("/*/發文機關列表/發文機關");
								// if(!!nd2) {
									// switch(m[1]) {
										// case "承辦人":
											// theLogger.log("將" + xmlDoc.documentElement.tagName + "的承辦人轉為發文機關列表/發文機關/承辦人");
											// var icUser = xmlDoc.createElement("承辦人");
											// icUser.text = m[2];
											// nd2.appendChild(icUser);
											// break;
										// case "電話":
											// theLogger.log("將" + xmlDoc.documentElement.tagName + "的電話轉為發文機關列表/發文機關/聯絡電話");
											// var tel = xmlDoc.createElement("聯絡電話");
											// tel.text = m[2];
											// nd2.appendChild(tel);
											// break;
										// case "分機":
											// theLogger.log("將" + xmlDoc.documentElement.tagName + "的電話轉為發文機關列表/發文機關/分機");
											// var telext = xmlDoc.createElement("分機");
											// telext.text = m[2];
											// nd2.appendChild(telext);
											// break;
										// case "傳真":
											// theLogger.log("將" + xmlDoc.documentElement.tagName + "的傳真轉為發文機關列表/發文機關/傳真");
											// var fax = xmlDoc.createElement("傳真");
											// fax.text = m[2];
											// nd2.appendChild(fax);
											// break;
										// case "電子信箱":
											// theLogger.log("將" + xmlDoc.documentElement.tagName + "的電子信箱轉為發文機關列表/發文機關/Email");
											// var email = xmlDoc.createElement("Email");
											// email.text = m[2];
											// nd2.appendChild(email);
											// break;
									// }
								// }
							// }
						// }
					// }
				// }
			// }
			
			// var preserveClsNoWhileImport = theSSO.User.EnvSettings.get("WE_PRESERVE_CLSNO_WHILE_IMPORT");
			// // 1080211 Raymond 1080052 新增"1"的判定
			// //if(preserveClsNoWhileImport == "Y") {
			// if(preserveClsNoWhileImport == "Y" || preserveClsNoWhileImport == "1") {
				// nd = xmlDoc.selectSingleNode("/*/分類號");
				// if(!!nd && nd.text.length > 0) {
					// // 1080211 Raymond 1080052 checkCls需要密等參數
					// //if(!checkClsNo(nd.text)) {	// 檢核分類號是否可用, 不可用則清空分類號、保存年限、案次號
					// var sec, ndS = xmlDoc.selectSingleNode("/*/密等及解密條件或保密期限/密等");
					// if(!!ndS)
						// sec = ndS.getAttribute("代碼");
					// // 1090429 Raymond 1090001 檢核分類是否可用改為回傳物件, 判定條件改為判斷回傳物件的checkPass屬性
					// //if(!checkClsNo(nd.text, sec)) {	// 檢核分類號是否可用, 不可用則清空分類號、保存年限、案次號
					// var chkRes = checkClsNo(nd.text, sec);
					// if(!chkRes.checkPass) {
						// theLogger.warn("檢核分類號(" + nd.text + ")不可用, 清空分類號、保存年限、案次號");
						// nd.text = "";
						// nd = xmlDoc.selectSingleNode("/*/保存年限");
						// if(!!nd)
							// nd.text = "";
						// nd = xmlDoc.selectSingleNode("/*/案次號");
						// if(!!nd)
							// nd.text = "";
					// }
					// else {
						// // 1090429 Raymond 1090001 檢核分類是否可用改為回傳物件, 檢核回傳物件的keepYear屬性若與舊檔的保存年限不一致, 則重設保存年限為回傳物件的keepYear屬性
						// var ndKY = xmlDoc.selectSingleNode("/*/保存年限");
						// if(!!ndKY && ndKY.text != chkRes.keepYear) {
							// theLogger.log("檢核分類號(" + nd.text + ")可用, 但回傳的保存年限(" + chkRes.keepYear + ")與舊檔(" + ndKY.text + ")不一致, 以回傳的保存年限為準");
							// ndKY.text = chkRes.keepYear;
						// }
						// if("ODWDCM" in _docObj && _docObj.get("ODWDCM", "FILE_CLS").length == 0) {	// 公文基資未設定分類號則自動設定
							// theLogger.log("因公文基資尚未設定分類號, 以開啟舊檔的分類號(" + nd.text + ")自動設定到公文基資");
							// _docObj.set("aol", "ODWDCM", [{fieldname: "FILE_CLS", value:nd.text}]);
							// //var ndKY = xmlDoc.selectSingleNode("/*/保存年限");	// 1090429 Raymond 1090001 移至上方
							// if(!!ndKY && ndKY.text.length > 0) {
								// theLogger.log("以開啟舊檔的保存年限(" + ndKY.text + ")自動設定到公文基資");
								// _docObj.set("aol", "ODWDCM", [{fieldname: "KEEP_YEAR", value:ndKY.text}]);
							// }
						// }
						// var nd2 = xmlDoc.selectSingleNode("/*/案次號");
						// if(!!nd2 && nd2.text.length > 0) {
							// // 1080211 Raymond 1080052 checkCase需要分類號參數
							// //if(!checkCaseNo(nd.text))	// 檢核案次號是否可用, 不可用則清空案次號
							// //	nd.text = "";
							// if(!checkCaseNo(nd2.text, nd.text))	// 檢核案次號是否可用, 不可用則清空案次號
								// nd2.text = "";
							// else {
								// if("ODWDCM" in _docObj && _docObj.get("ODWDCM", "FILE_CASE").length == 0) {	// 公文基資未設定案次號則自動設定
									// theLogger.log("因公文基資尚未設定案次號, 以開啟舊檔的案次號(" + nd2.text + ")自動設定到公文基資");
									// _docObj.set("aol", "ODWDCM", [{fieldname: "FILE_CASE", value:nd2.text}]);
								// }
							// }
						// }
					// }
				// }
			// }
			
			// nd = xmlDoc.selectSingleNode("/*/附件下載區設定/是否上傳至下載區");
			// if(!!nd && nd.text == "Y") {	// 清除附件文字及此欄位, 以觸發附件子視窗更新下載識別碼機制
				// nd.text = "";
				// nd = xmlDoc.selectSingleNode("/*/附件列表/文字");
				// if(!!nd)
					// nd.text = "";
			// }
			
			// // 1060915 Raymond 1060801 令、函沒有<備註>, 不需要搬
			// // 2016.12.29 FDA的人事令, 附註段落在第一層, 但DI的規則應該要在"備註"下
			// //nd = xmlDoc.selectSingleNode("/*/段落[@段名='附註：']");
			// //if(!!nd) {
			// //	wrapNode(nd, "備註");
			// //}
			
			// // 1071112 Raymond 1071085 判定機關為航港局(MPB)時, 讀取文稿中的<MTNET流水號>, 若有則將內容設定到ODWDCM.MTNET_NO
			// if(theSSO.User.EnvSettings.get("USE_MTNET") == "Y" && SSO_CONFIG.OrgNickName.match(/MPB/i)) {
				// var nd2 = xmlDoc.selectSingleNode("/*/MTNET流水號");
				// if(!!nd2) {
					// theLogger.log("寫入MTNET流水號'" + nd2.text + "'至ODWDCM");
					// if("ODWDCM" in _docObj)
						// _docObj.set("aol", "ODWDCM", [{fieldname:"MTNET_NO", value:nd2.text}]);
					// else
						// theLogger.error("無ODWDCM物件可寫入");
				// }
			// }
			
			// // dump
			// theLogger.log(xmlDoc.xml);
		}
		else if("evaluate" in xmlDoc) {	// for Non-IE
			// 附件->附件列表
			var snapshot = xmlDoc.evaluate("/*/附件", xmlDoc, null, 7, null);
			if(snapshot.snapshotLength > 0) {
				theLogger.log("將附件轉為附件列表");
				var ndList = snapshot.snapshotItem(0).parentNode.insertBefore(xmlDoc.createElement("附件列表"), snapshot.snapshotItem(0));
				var snapshot2 = xmlDoc.evaluate("/*/附件/文字", xmlDoc, null, 7, null);
				if(snapshot2.snapshotLength > 0) {
					ndList.appendChild(snapshot2.snapshotItem(0));
				}
				ndList.parentNode.removeChild(snapshot.snapshotItem(0));
			}
			
			// 受文者->受文者列表
			snapshot = xmlDoc.evaluate("/*/受文者", xmlDoc, null, 7, null);
			if(snapshot.snapshotLength > 0) {
				theLogger.log("將受文者轉為受文者列表");
				var ndList = snapshot.snapshotItem(0).parentNode.insertBefore(xmlDoc.createElement("受文者列表"), snapshot.snapshotItem(0));
				var tx = xmlDoc.createElement("文字");
				ndList.appendChild(tx);
				
				// 1141013 Raymond 1141111 新增判斷若機關暱稱是"RRB"(鐵道局)時, 開啟舊檔的DI是"獎懲令"或"令"且令類別或函類別為"獎懲令"時, 不要將DI的"受文者/交換表"或"受文者/全銜"帶入
				var rrbReward = false;
				if(SSO_CONFIG.OrgNickName == "RRB") {
					if(xmlDoc.documentElement.nodeName == "獎懲令") {
						rrbReward = true;
						theLogger.log("[鐵道局客製]開啟獎懲令DI時, 不要帶入受文者/交換表或受文者/全銜內容");
					}
					else if(xmlDoc.documentElement.nodeName == "令") {
						let ss = xmlDoc.evaluate("/*/令類別", xmlDoc, null, 7, null), subDocType = "";
						if(ss.snapshotLength > 0)
							subDocType = ss.snapshotItem(0).getAttribute("代碼");
						else {	// 令無令類別, 再搜尋函類別
							ss = xmlDoc.evaluate("/*/函類別", xmlDoc, null, 7, null)
							if(ss.snapshotLength > 0)
								subDocType = ss.snapshotItem(0).getAttribute("代碼");
							else
								theLogger.error("令無令類別亦無函類別, 無法判斷是否為'獎懲令'");
						}
						rrbReward = subDocType == "獎懲令";
						if(rrbReward)
							theLogger.log("[鐵道局客製]開啟獎懲令DI時, 不要帶入受文者/交換表或受文者/全銜內容");
					}
				}
				if(!rrbReward) {
				var snapshot2 = xmlDoc.evaluate("/*/受文者/交換表", xmlDoc, null, 7, null);
				if(snapshot2.snapshotLength > 0)
					tx.textContent = snapshot2.snapshotItem(0).textContent;
				else {
					snapshot2 = xmlDoc.evaluate("/*/受文者/全銜", xmlDoc, null, 7, null);	// 2017.1.3 新增
					if(snapshot2.snapshotLength > 0)
						tx.textContent = snapshot2.snapshotItem(0).textContent;
				}
				}	// end of if(!rrbReward)
				ndList.parentNode.removeChild(snapshot.snapshotItem(0));
				
				function addIssueTypeRcvrs(issueType) {
					var snapshot3 = xmlDoc.evaluate("/*/" + issueType, xmlDoc, null, 7, null);
					if(snapshot3.snapshotLength > 0) {
						var nd3 = snapshot3.snapshotItem(0);
						for(var i=0; i<nd3.children.length; i++)
							addRcvr(xmlDoc, nd3.children[i], issueType);
						xmlDoc.documentElement.removeChild(nd3);
					}
				}
				// 正本
				addIssueTypeRcvrs("正本");
				// 副本
				addIssueTypeRcvrs("副本");
				// 抄本
				addIssueTypeRcvrs("抄本");
				// 主持人
				addIssueTypeRcvrs("主持人");
				// 出席者
				addIssueTypeRcvrs("出席者");
				// 列席者
				addIssueTypeRcvrs("列席者");
			}
			
			// 發文機關->發文機關列表
			snapshot = xmlDoc.evaluate("/*/發文機關", xmlDoc, null, 7, null);
			if(snapshot.snapshotLength > 0) {
				theLogger.log("將發文機關轉為發文機關列表");
				var ndList = wrapNode(snapshot.snapshotItem(0), "發文機關列表");
			}
			
			// 開會時間->開會時間列表
			snapshot = xmlDoc.evaluate("/*/開會時間", xmlDoc, null, 7, null);
			if(snapshot.snapshotLength > 0) {
				theLogger.log("將開會時間轉為開會時間列表");
				var ndList = wrapNode(snapshot.snapshotItem(0), "開會時間列表");
			}
			
			// 簽, 新增敬陳
			if(xmlDoc.documentElement.tagName == "簽") {
				snapshot = xmlDoc.evaluate("/*/敬陳", xmlDoc, null, 7, null);
				if(snapshot.snapshotLength == 0) {
					theLogger.log("文別是簽, 新增敬陳");
					xmlDoc.documentElement.appendChild(xmlDoc.createElement("敬陳"));
				}
				// 1110505 Raymond 1110521 新增匯入簽的"年月日"為"發文日期/年月日"
				snapshot = xmlDoc.evaluate("/*/年月日", xmlDoc, null, 7, null);
				if(snapshot.snapshotLength > 0) {
					theLogger.log("將簽的年月日轉為發文日期/年月日");
					var ndList = wrapNode(snapshot.snapshotItem(0), "發文日期");
				}
				// 1110505 Raymond 1110521 新增匯入簽的"機關/全銜"為"發文機關列表/發文機關/承辦單位"
				snapshot = xmlDoc.evaluate("/*/機關/全銜", xmlDoc, null, 7, null);
				if(snapshot.snapshotLength > 0) {
					theLogger.log("將簽的'機關/全銜'轉為'發文機關列表/發文機關/承辦單位'");
					var ndList = snapshot.snapshotItem(0).parentNode.parentNode.insertBefore(xmlDoc.createElement("發文機關列表"), snapshot.snapshotItem(0).parentNode);
					var orgNd = xmlDoc.createElement("發文機關");
					var icNd = xmlDoc.createElement("承辦單位");
					icNd.textContent = snapshot.snapshotItem(0).textContent;
					orgNd.appendChild(icNd);
					ndList.appendChild(orgNd);
					snapshot.snapshotItem(0).parentNode.parentNode.removeChild(snapshot.snapshotItem(0).parentNode);
				}
			}
			// 1110505 Raymond 1110521 新增支援匯入開會/會勘通知單的聯絡人及電話
			if(xmlDoc.documentElement.tagName == "開會通知單" || xmlDoc.documentElement.tagName == "會勘通知單") {
				snapshot = xmlDoc.evaluate("/*/聯絡人及電話", xmlDoc, null, 7, null);
				if(snapshot.snapshotLength > 0) {
					theLogger.log("將" + xmlDoc.documentElement.tagName + "的聯絡人及電話轉為發文機關列表/發文機關/承辦人及發文機關列表/發文機關/電話");
					var snapshot2 = xmlDoc.evaluate("/*/發文機關列表/發文機關", xmlDoc, null, 7, null);
					if(snapshot2.snapshotLength > 0) {
						var ss = xmlDoc.evaluate("姓名", snapshot.snapshotItem(0), null, 7, null);
						if(ss.snapshotLength > 0) {
							var icUsrNd = xmlDoc.createElement("承辦人");
							icUsrNd.textContent = ss.snapshotItem(0).textContent;
							snapshot2.snapshotItem(0).appendChild(icUsrNd);
						}
						ss = xmlDoc.evaluate("電話", snapshot.snapshotItem(0), null, 7, null);
						if(ss.snapshotLength > 0) {
							var telNd = xmlDoc.createElement("聯絡電話");
							telNd.textContent = ss.snapshotItem(0).textContent;
							snapshot2.snapshotItem(0).appendChild(telNd);
						}
						snapshot.snapshotItem(0).parentNode.removeChild(snapshot.snapshotItem(0));
					}
				}
			}
			// 1110526 Raymond 1110521 新增判斷若fromMgmt為true, 則處理機關地址及聯絡方式等標籤
			if(fromMgmt == true) {
				snapshot = xmlDoc.evaluate("/*/地址", xmlDoc, null, 7, null);
				if(snapshot.snapshotLength > 0) {
					theLogger.log("將" + xmlDoc.documentElement.tagName + "的地址轉為發文機關列表/發文機關/機關地址");
					var snapshot2 = xmlDoc.evaluate("/*/發文機關列表/發文機關", xmlDoc, null, 7, null);
					if(snapshot2.snapshotLength > 0) {
						var orgAddr = xmlDoc.createElement("機關地址");
						orgAddr.textContent = snapshot.snapshotItem(0).textContent;
						snapshot2.snapshotItem(0).appendChild(orgAddr);
					}
				}
				
				snapshot = xmlDoc.evaluate("/*/聯絡方式", xmlDoc, null, 7, null);
				if(snapshot.snapshotLength > 0) {
					for(var i=0; i<snapshot.snapshotLength; i++) {
						var str = snapshot.snapshotItem(i).textContent;
						if(!!str && str.length > 0) {
							var m = str.match(/(承辦人|電話|分機|傳真|電子信箱)[：:]([\W\w]*)/);
							if(!!m) {
								var snapshot2 = xmlDoc.evaluate("/*/發文機關列表/發文機關", xmlDoc, null, 7, null);
								if(snapshot2.snapshotLength > 0) {
									switch(m[1]) {
										case "承辦人":
											theLogger.log("將" + xmlDoc.documentElement.tagName + "的承辦人轉為發文機關列表/發文機關/承辦人");
											var icUser = xmlDoc.createElement("承辦人");
											icUser.textContent = m[2];
											snapshot2.snapshotItem(0).appendChild(icUser);
											break;
										case "電話":
											theLogger.log("將" + xmlDoc.documentElement.tagName + "的電話轉為發文機關列表/發文機關/聯絡電話");
											var tel = xmlDoc.createElement("聯絡電話");
											tel.textContent = m[2];
											snapshot2.snapshotItem(0).appendChild(tel);
											break;
										case "分機":
											theLogger.log("將" + xmlDoc.documentElement.tagName + "的電話轉為發文機關列表/發文機關/分機");
											var telext = xmlDoc.createElement("分機");
											telext.textContent = m[2];
											snapshot2.snapshotItem(0).appendChild(telext);
											break;
										case "傳真":
											theLogger.log("將" + xmlDoc.documentElement.tagName + "的傳真轉為發文機關列表/發文機關/傳真");
											var fax = xmlDoc.createElement("傳真");
											fax.textContent = m[2];
											snapshot2.snapshotItem(0).appendChild(fax);
											break;
										case "電子信箱":
											theLogger.log("將" + xmlDoc.documentElement.tagName + "的電子信箱轉為發文機關列表/發文機關/Email");
											var email = xmlDoc.createElement("Email");
											email.textContent = m[2];
											snapshot2.snapshotItem(0).appendChild(email);
											break;
									}
								}
							}
						}
					}
				}
			}
			
			var preserveClsNoWhileImport = theSSO.User.EnvSettings.get("WE_PRESERVE_CLSNO_WHILE_IMPORT");
			// 1080211 Raymond 1080052 新增"1"的判定
			//if(preserveClsNoWhileImport == "Y") {
			if(preserveClsNoWhileImport == "Y" || preserveClsNoWhileImport == "1") {
				snapshot = xmlDoc.evaluate("/*/分類號", xmlDoc, null, 7, null);
				if(snapshot.snapshotLength > 0) {
					var nd = snapshot.snapshotItem(0);
					if(nd.textContent.length > 0) {
						// 1080211 Raymond 1080052 checkCls需要密等參數
						//if(!checkClsNo(nd.textContent)) {	// 檢核分類號是否可用, 不可用則清空分類號、保存年限、案次號
						var sec, snapshot2 = xmlDoc.evaluate("/*/密等及解密條件或保密期限/密等/@代碼", xmlDoc, null, 7, null);
						if(snapshot2.snapshotLength > 0)
							sec = snapshot2.snapshotItem(0).textContent;
						// 1090429 Raymond 1090001 檢核分類是否可用改為回傳物件, 判定條件改為判斷回傳物件的checkPass屬性
						//if(!checkClsNo(nd.textContent, sec)) {	// 檢核分類號是否可用, 不可用則清空分類號、保存年限、案次號
						var chkRes = checkClsNo(nd.textContent, sec);
						if(!chkRes.checkPass) {
							theLogger.warn("檢核分類號(" + nd.textContent + ")不可用, 清空分類號、保存年限、案次號");
							nd.textContent = "";
							snapshot = xmlDoc.evaluate("/*/保存年限", xmlDoc, null, 7, null);
							if(snapshot.snapshotLength > 0)
								snapshot.snapshotItem(0).textContent = "";
							snapshot = xmlDoc.evaluate("/*/案次號", xmlDoc, null, 7, null);
							if(snapshot.snapshotLength > 0)
								snapshot.snapshotItem(0).textContent = "";
						}
						else {
							// 1090429 Raymond 1090001 檢核分類是否可用改為回傳物件, 檢核回傳物件的keepYear屬性若與舊檔的保存年限不一致, 則重設保存年限為回傳物件的keepYear屬性
							var snapshot3 = xmlDoc.evaluate("/*/保存年限", xmlDoc, null, 7, null);
							if(snapshot3.snapshotLength > 0 && snapshot3.snapshotItem(0).textContent != chkRes.keepYear) {
								theLogger.log("檢核分類號(" + nd.textContent + ")可用, 但回傳的保存年限(" + chkRes.keepYear + ")與舊檔(" + snapshot3.snapshotItem(0).textContent + ")不一致, 以回傳的保存年限為準");
								snapshot3.snapshotItem(0).textContent = chkRes.keepYear;
							}
							if("ODWDCM" in _docObj && _docObj.get("ODWDCM", "FILE_CLS").length == 0) {	// 公文基資未設定分類號則自動設定
								theLogger.log("因公文基資尚未設定分類號, 以開啟舊檔的分類號(" + nd.textContent + ")自動設定到公文基資");
								_docObj.set("aol", "ODWDCM", [{fieldname: "FILE_CLS", value:nd.textContent}]);
								//var snapshot3 = xmlDoc.evaluate("/*/保存年限", xmlDoc, null, 7, null);	// 1090429 Raymond 1090001 移至上方
								if(snapshot3.snapshotLength > 0 && snapshot3.snapshotItem(0).textContent.length > 0) {
									theLogger.log("以開啟舊檔的保存年限(" + snapshot3.snapshotItem(0).textContent + ")自動設定到公文基資");
									_docObj.set("aol", "ODWDCM", [{fieldname: "KEEP_YEAR", value:snapshot3.snapshotItem(0).textContent}]);
								}
							}
							snapshot = xmlDoc.evaluate("/*/案次號", xmlDoc, null, 7, null);
							if(snapshot.snapshotLength > 0) {
								var nd2 = snapshot.snapshotItem(0);
								if(nd2.textContent.length > 0) {
									// 1080211 Raymond 1080052 checkCase需要分類號參數
									//if(!checkCaseNo(nd2.textContent))	// 檢核案次號是否可用, 不可用則清空案次號
									if(!checkCaseNo(nd2.textContent, nd.textContent))	// 檢核案次號是否可用, 不可用則清空案次號
										nd2.textContent = "";
									else {
										if("ODWDCM" in _docObj && _docObj.get("ODWDCM", "FILE_CASE").length == 0) {	// 公文基資未設定案次號則自動設定
											theLogger.log("因公文基資尚未設定案次號, 以開啟舊檔的案次號(" + nd2.textContent + ")自動設定到公文基資");
											_docObj.set("aol", "ODWDCM", [{fieldname: "FILE_CASE", value:nd2.textContent}]);
										}
									}
								}
							}
						}
					}
				}
			}
			
			snapshot = xmlDoc.evaluate("/*/附件下載區設定/是否上傳至下載區", xmlDoc, null, 7, null);
			if(snapshot.snapshotLength > 0) {	// 清除附件文字及此欄位, 以觸發附件子視窗更新下載識別碼機制
				var nd = snapshot.snapshotItem(0);
				if(nd.textContent == "Y") {
					nd.textContent = "";
					snapshot = xmlDoc.evaluate("/*/附件列表/文字", xmlDoc, null, 7, null);
					if(snapshot.snapshotLength > 0)
						snapshot.snapshotItem(0).textContent = "";
				}
			}
			
			// 1060915 Raymond 1060801 令、函沒有<備註>, 不需要搬
			// 2016.12.29 FDA的人事令, 附註段落在第一層, 但DI的規則應該要在"備註"下
			//snapshot = xmlDoc.evaluate("/*/段落[@段名='附註：']", xmlDoc, null, 7, null);
			//if(snapshot.snapshotLength > 0) {
			//	wrapNode(snapshot.snapshotItem(0), "備註");
			//}
			
			// 1071112 Raymond 1071085 判定機關為航港局(MPB)時, 讀取文稿中的<MTNET流水號>, 若有則將內容設定到ODWDCM.MTNET_NO
			if(theSSO.User.EnvSettings.get("USE_MTNET") == "Y" && SSO_CONFIG.OrgNickName.match(/MPB/i)) {
				var snapshot2 = xmlDoc.evaluate("/*/MTNET流水號", xmlDoc, null, 7, null);
				if(snapshot2.snapshotLength > 0) {
					var nd2 = snapshot2.snapshotItem(0);
					theLogger.log("寫入MTNET流水號'" + nd2.textContent + "'至ODWDCM");
					if("ODWDCM" in _docObj)
						_docObj.set("aol", "ODWDCM", [{fieldname:"MTNET_NO", value:nd2.textContent}]);
					else
						theLogger.error("無ODWDCM物件可寫入");
				}
			}
			
			// dump
			theLogger.log(xmlDoc);
		}
		else {
			theLogger.error("XML物件不支援selectSingleNode亦不支援evaluate方法, 無法處理");
		}
	}
	// 1110328 Leslie[1100287]	Merge[1070359]	將preprocessXML函式expose到nsEditor, 供調閱DI檔時叫用
	if(!!nsEditor)
		nsEditor.preprocessXML = preprocessXML;
	
	// 1130809 Raymond 1130313 合併1111007(1100394), 新增keepAttNode參數, 匯入ZIP壓縮檔中的文稿檔時, 在套用樣版檔時保留附件檔名節點使用
	// 1100505 Raymond 1090542 新增第2參數sourceType, 目前只定義「1」表示開啟舊檔
	//function supplyFromTemplate(xmlDoc) {
	//function supplyFromTemplate(xmlDoc, sourceType) {
	function supplyFromTemplate(xmlDoc, sourceType, keepAttNode) {
		var dfd = $.Deferred();
		var docType = xmlDoc.documentElement.nodeName;
		var subDocType = "";
		// 1100412 Raymond 1100306 修正開啟舊檔時, 非令函文別(ex.開會通知單)無法依原本設定的函類別套用符合的樣版檔, 只會套用第一個同文別樣版, 導致排版設定檔也套錯的問題
		//if(docType == "函") {
		//	subDocType = $(xmlDoc).find("函類別").attr("代碼");
		//}
		//else if(docType == "令") {
		//	subDocType = $(xmlDoc).find("令類別, 函類別").attr("代碼");
		//}
		var sub = xmlDoc.documentElement.getElementsByTagName("函類別")[0];	// 函類別 or 令類別
		if(sub == undefined)												// 因為舊的令, 可能沿用函類別的標籤而不是令類別
			sub = xmlDoc.documentElement.getElementsByTagName("令類別")[0];
		if(sub != undefined)
			subDocType = sub.getAttribute("代碼");
		// 1110629 Raymond 1110561 新增辨識匯入舊檔是否為DI
		var isDI = false;
		if(sourceType == 1) {
			if("selectSingleNode" in xmlDoc) {	// IE
				if(!!xmlDoc.doctype && xmlDoc.doctype.attributes.length > 0 && xmlDoc.doctype.attributes[0].nodeName == "SYSTEM" && xmlDoc.doctype.attributes[0].nodeValue.match(/.dtd$/i))
					isDI = true;
			}
			else {	// Non-IE
				if(!!xmlDoc.doctype && !!xmlDoc.doctype.systemId && xmlDoc.doctype.systemId.length > 0 && xmlDoc.doctype.systemId.match(/.dtd$/i))
					isDI = true;
			}
		}
		// 1110629 Raymond 1110561 當是DI且令類別為"令", 因無法分辨是一般令還是派令、派免令等, 改成提示請使用者選取套用的令樣版
		var chooseTemplateWhileImport = theSSO.User.EnvSettings.get("WE_CHOOSE_TEMPLATE_WHILE_IMPORT") == "Y";
		var filterSubDocType = false;	// 啟用選取非'獎懲令'的令樣版的過濾條件, 令的令類別法規僅有'令'及'獎懲令'兩種, 故派令所產生的DI, 令類別為'令', 匯入後不需要看到'獎懲令'的樣版
		if(isDI && docType == "令" && subDocType == "令") {
			theLogger.warn("由於匯入令DI的令類別為'令', 無法分辨是一般令還是派令、派免令等, 需提示請使用者選取套用的令樣版");
			filterSubDocType = true;
			chooseTemplateWhileImport = true;	// 匯入令DI的令類別為'令'時, 需選取令樣版, 強制啟用選取樣版功能
		}
		var foundRsrc = null;	// 2016.12.26 新增搜尋樣版
		var foundRsrcs = [];	// 1100311 Raymond 1090991 新增搜尋多筆
		thePublicRsrc.enumDirs("樣版", function(dir) {
			for(var i=0; i<dir.children.length; i++) {
				if(dir.children[i].type == 1) {	// RsrcFile
					var nm = dir.children[i].name;
					//if(dir.children[i].docType == docType && (subDocType.length == 0 || dir.children[i].subDocType == subDocType || dir.children[i].subDocType == "")) {	// 2016.11.1 若RsrcMgmt.xml的函類別為空值, 也算符合可套用格式條件
					if(dir.children[i].docType == docType && (subDocType.length == 0 || dir.children[i].subDocType == subDocType || dir.children[i].subDocType == "" || (filterSubDocType && dir.children[i].subDocType != "獎懲令"))) {	// 1110630 Raymond 1110561 匯入令DI的令類別為'令'時, 需選取除了'獎懲令'以外的令樣版(令、派令...等等)
						// 1110629 Raymond 1110561 當是DI且令類別為"令", 因無法分辨是一般令還是派令、派免令等, 改成提示請使用者選取套用的令樣版
						// 1100311 Raymond 1090991 依環境變數設定啟用搜尋多筆適用的樣版功能
						//if(theSSO.User.EnvSettings.get("WE_CHOOSE_TEMPLATE_WHILE_IMPORT") == "Y") {
						if(chooseTemplateWhileImport) {
							theLogger.log("找到符合的樣版檔'" + dir.children[i].remote.path + "'" + ((!!dir.children[i].defPrintXSLName)?(", 預設排版檔名稱:'" + dir.children[i].defPrintXSLName + "'"):""));
							foundRsrcs.push(dir.children[i]);
						}
						else {	// 未啟用則維持搜尋到第一筆即套用
						theLogger.log("找到第一個符合的樣版檔'" + dir.children[i].remote.path + "'");
						foundRsrc = dir.children[i];
						return false;
						}
					}
				}
				else {	// RsrcDir
					var res = arguments.callee(dir.children[i]);
					if(typeof res === "boolean" && res == false)
						return false;
				}
			}
		});
		// 1100311 Raymond 1090991 新增搜尋多筆適用的樣版檔提供使用者選擇功能
		var duringConfirm = false;	// 先預設詢問子視窗未開啟
		var resolveOnConfirmAfterHide = false;	// 詢問子視窗關閉時是否呼叫resolve
		// 1110629 Raymond 1110561 當是DI且令類別為"令", 因無法分辨是一般令還是派令、派免令等, 改成提示請使用者選取套用的令樣版
		//if(theSSO.User.EnvSettings.get("WE_CHOOSE_TEMPLATE_WHILE_IMPORT") == "Y") {
		if(chooseTemplateWhileImport) {
			function doApply(rsrcFile, autoApplyDefPrintXSLName) {
				theCacheMgr.get({type: "rsrc", rsrc: rsrcFile})
					.done(function(tmplDoc) {
						if(tmplDoc != undefined) {
							theLogger.log("下載指定的樣版檔'" + rsrcFile.remote.path + "'成功! 補充缺少的欄位");
							theLogger.log(tmplDoc.xml || tmplDoc);
							doSupplyElem(tmplDoc.documentElement, xmlDoc.documentElement, "/*", new Array(), tmplDoc);	// 2017.3.28 新增tmplDoc參數
							xmlDoc.replaceChild(tmplDoc.documentElement, xmlDoc.documentElement);
						}
					})
					.always(function() {
						if(autoApplyDefPrintXSLName == true)	// 若autoApplyDefPrintXSLName參數為true, 則傳入"預設排版"屬性值
							postSupplyElems(rsrcFile.defPrintXSLName);
						else
							postSupplyElems();
					});
			}
			if(foundRsrcs.length == 1) {
				// 1100423 Raymond 1090991 fix typo rsrcFile.name -> foundRsrcs[0].name
				//theLogger.log("直接套用唯一適用的樣版檔'" + rsrcFile.name + "'!");
				theLogger.log("直接套用唯一適用的樣版檔'" + foundRsrcs[0].name + "'!");
				doApply(foundRsrcs[0], true);
			}
			else if(foundRsrcs.length > 1) {
				var selectedDefPrintXSLName;
				var param = {
					title: "請選擇欲套用的樣版檔",
					selectItems: [],
					selectedIndex: 0,
					buttons: [
						{	name: "確定",
							action: function(selectedIndex) {
								theLogger.log("使用者選擇項目" + selectedIndex);
								doApply(foundRsrcs[selectedIndex], true);
								theLogger.log("選擇項目的預設排版:" + foundRsrcs[selectedIndex].defPrintXSLName);
								selectedDefPrintXSLName = foundRsrcs[selectedIndex].defPrintXSLName;
							}
						},
						{	name: "取消",
							action: function() {
								// 1100813 Raymond 1090991 開啟舊檔若需選取樣版時按取消, 改成不匯入這筆文稿
								//theLogger.log("使用者取消選擇套用樣版檔! 依舊邏輯直接套用第一筆適用的樣版檔");
								//doApply(foundRsrcs[0], false);	// 第2參數autoApplyDefPrintXSLName設為false, 表示取消選取樣版時依舊邏輯, 若有2筆以上適用的排版設定檔時, 由使用者選擇套用, 不要自動用這第一筆樣版檔的預設排版檔名稱套用
								dfd.reject("userCancel");
							}
						}
					],
					beforeShow: function() {
						duringConfirm = true;	// 詢問子視窗開啟中
					},
					afterHide: function() {
						duringConfirm = false;	// 詢問子視窗已關閉
						if(resolveOnConfirmAfterHide == true) {
							console.error("詢問子視窗已關閉, 呼叫resolve(" + selectedDefPrintXSLName + ")");
							dfd.resolve(selectedDefPrintXSLName);
						}
					}
				};
				for(var i=0; i<foundRsrcs.length; i++) {
					param.selectItems.push(foundRsrcs[i].name);
				}
				$.confirm(param);
			}
			else {
				theLogger.warn("找不到符合的樣版檔, 無法補充缺少的欄位");
				postSupplyElems();
			}
		}
		else
		if(!!foundRsrc) {
			theCacheMgr.get({type: "rsrc", rsrc: foundRsrc})
				.done(function(tmplDoc) {
					if(tmplDoc != undefined) {
						theLogger.log("下載符合的樣版檔成功! 補充缺少的欄位");
						theLogger.log(tmplDoc.xml || tmplDoc);
						doSupplyElem(tmplDoc.documentElement, xmlDoc.documentElement, "/*", new Array(), tmplDoc);	// 2017.3.28 新增tmplDoc參數
						// 1060419 Raymond 修正開啟舊檔若是DI的話無法正確匯入的問題
						//xmlDoc.documentElement = tmplDoc.documentElement;	// 2017.3.28 用樣版的結構取代匯入文稿
						xmlDoc.replaceChild(tmplDoc.documentElement, xmlDoc.documentElement);
						// 1100817 Raymond 1090991 客委會要求沒有啟用變數也要套用第一筆樣版檔的"預設排版"
						postSupplyElems(foundRsrc.defPrintXSLName);
					}
				})
				// 1100817 Raymond 1090991 客委會要求沒有啟用變數也要套用第一筆樣版檔的"預設排版"
				//.always(postSupplyElems);
				.fail(postSupplyElems);
		}
		else {
			theLogger.warn("找不到符合的樣版檔, 無法補充缺少的欄位");
			postSupplyElems();
		}
		function doSupplyElem(tmpl, nd, xp, checkedList, tmplDoc) {
			if(tmpl.tagName != nd.tagName) {
				theLogger.error("節點名稱不一致! 無法套用 - '" + tmpl.tagName + "' vs '" + nd.tagName);
				return;
			}
			for(var i=0; i<nd.attributes.length; i++) {	// 2017.3.28 修改成以樣版XML為底, 匯入XML提供內容
				var nm = nd.attributes[i].nodeName;
				if("hasAttribute" in tmpl) {	// for Non-IE
					//1060606	Leslie[1060248]	開啟舊檔時，檢核樣版屬性無需判斷length=0，會造成判斷錯誤
					//if(tmpl.hasAttribute(nm) && tmpl.getAttribute(nm).length == 0 && nd.attributes[i].nodeValue.length > 0) {
					if(tmpl.hasAttribute(nm) && nd.attributes[i].nodeValue.length > 0) {
						// 1141126 Raymond 北榮序403 開啟舊檔或貼上稿件時, 不要套用(覆寫)舊檔的/*/@DefaultSign、/*/決行層次/@決行層級(北榮only)到新稿件
						if((nm == "DefaultSign" && xp == "/*") || (nm == "決行層級" && xp == "/*/決行層次" && SSO_CONFIG.OrgNickName == "TPVGH")) {
							theLogger.log("不要套用(覆寫)'" + xp + "/@" + nm + "' = '" + nd.attributes[i].nodeValue + "'");
						}
						else {
						theLogger.log("套用(覆寫)'" + xp + "/@" + nm + "' = '" + nd.attributes[i].nodeValue + "'");
						tmpl.setAttribute(nm, nd.attributes[i].nodeValue);
						}
					}
					// 1110421 Raymond 1110439 樣版檔無此屬性時新增
					else if(!tmpl.hasAttribute(nm)) {
						theLogger.log("套用(新增)'" + xp + "/@" + nm + "' = '" + nd.attributes[i].nodeValue + "'");
						tmpl.setAttribute(nm, nd.attributes[i].nodeValue);
					}
				}
				else if(tmpl.getAttribute(nm) != null) {	// for IE
					//1060606	Leslie[1060248]	開啟舊檔時，檢核樣版屬性無需判斷length=0，會造成判斷錯誤
					//if(tmpl.getAttribute(nm).length == 0 && nd.attributes[i].nodeValue.length > 0) {
					if(nd.attributes[i].nodeValue.length > 0) {
						theLogger.log("套用(覆寫)'" + xp + "/@" + nm + "' = '" + nd.attributes[i].nodeValue + "'");
						tmpl.setAttribute(nm, nd.attributes[i].nodeValue);
					}
				}
				else {
					theLogger.log("套用(新增)'" + xp + "/@" + nm + "' = '" + nd.attributes[i].nodeValue + "'");
					tmpl.setAttribute(nm, nd.attributes[i].nodeValue);
				}
			}
			// 1141117 Raymond 北榮序382 修正貼上稿件時, 支援簽核框增高的簽稿會核單會變成沒有高度的問題
			// 1130703 Raymond 中榮序141 修正開啟舊檔時, 申請項目列表(中榮的表單類文別)下僅會載入第一個項目資料的問題
			// 1091105 Raymond 1090658 修正貼上稿件(置換)時, "公文文號"欄位會因樣版檔不存在而未保留, 因此欄位消失而導致條碼不會顯示的問題
			// 1060519 Raymond 修正開啟舊檔是簽稿會核單時, 會稿單位列表未載入問題
			//var copyTags = ["主指", "段落", "文字", "受文者列表", "附件列表"];	// 直接複製的欄位標籤
			//var copyTags = ["主旨", "段落", "文字", "受文者列表", "附件列表", "會稿單位列表"];	// 直接複製的欄位標籤
			//var copyTags = ["主旨", "段落", "文字", "受文者列表", "附件列表", "會稿單位列表", "公文文號"];	// 直接複製的欄位標籤
			//var copyTags = ["主旨", "段落", "文字", "受文者列表", "附件列表", "會稿單位列表", "公文文號", "申請項目列表"];	// 直接複製的欄位標籤
			var copyTags = ["主旨", "段落", "文字", "受文者列表", "附件列表", "會稿單位列表", "公文文號", "申請項目列表", "會辦意見列表"];	// 直接複製的欄位標籤
			// 1100505 Raymond 1090542 僅限開啟舊檔, 以免貼上稿件時也套用到此條件, 造成貼上後欄位變少的問題
			// 1091008 Raymond 1090542 鐵道局要求僅複製主旨、開會事由、段落、備註、受文者列表
			//if(theUserInfo.OrgNickName == "RRB")
			if(theUserInfo.OrgNickName == "RRB" && sourceType == 1)
				// 1091105 Raymond 1090658 修正貼上稿件(置換)時, "公文文號"欄位會因樣版檔不存在而未保留, 因此欄位消失而導致條碼不會顯示的問題
				//copyTags = ["主旨", "開會事由", "段落", "備註", "受文者列表"];
				copyTags = ["主旨", "開會事由", "段落", "備註", "受文者列表", "公文文號"];
			// 1130813 Raymond 1130313 RRB開啟舊檔會少了附件列表, 但開啟ZIP檔應加回來
			if(keepAttNode == true && copyTags.indexOf("附件列表") < 0)
				copyTags.push("附件列表");
			if("children" in nd) {	// for Non-IE
				if(nd.children.length == 0 && nd.textContent.length > 0) {	// 只有文字內容的標籤, 有內容即一律覆寫
					//if(tmpl.textContent.length == 0) {
						theLogger.log("套用(覆寫)'" + xp + "' = '" + nd.textContent + "'");
						tmpl.textContent = nd.textContent;
					//}
				}
				for(var i=0; i<nd.children.length; i++) {
					if(nd.children[i].nodeType == 1) {
						// 1110506 Raymond 1110521 修正段落複製時要對到段名相同的段落複製, 而不是照順序
						if(nd.children[i].nodeName == "段落") {
							var xp2 = xp + "/" + nd.children[i].nodeName + "[@段名 = \"" + nd.children[i].getAttribute("段名") + "\"]";
							if(xp2 in checkedList)
								theLogger.warn("之前已有同段名的段落, 複製取代恐會取代掉第一個同段名段落");
							checkedList[xp2] = false;	// 記錄查詢過的XPath
							
							var snapshot = tmplDoc.evaluate(xp2, tmplDoc, null, 7, null);
							if(snapshot.snapshotLength > 0) {
								checkedList[xp2] = true;	// 既有的XPath
								theLogger.log("複製取代'" + xp2 + "'");
								// 1110809 Raymond 考試院序178 修正便簽等文別的樣版故意拿掉段落的<文字>是為了少顯示一行, 而開啟舊檔卻會把段落的<文字>補回來(1071181)造成多顯示一行的問題
								var ssTxt = tmplDoc.evaluate(xp2 + "/文字", tmplDoc, null, 7, null);
								if(ssTxt.snapshotLength > 0) {	// 樣版有<文字>
									var srcNdHasTxt = false;
									for(var j=0; j<nd.children[i].children.length; j++) {
										if(nd.children[i].children[j].nodeName == "文字") {
											srcNdHasTxt = true;
											break;
										}
									}
									if(!srcNdHasTxt) {	// 開啟舊檔的段落沒有<文字>, 須補上
										theLogger.log("開啟舊檔的段落(" + xp2 + ")沒有<文字>, 但樣版檔有, 須補上");
										var ndTxt = nd.ownerDocument.createElement("文字");
										if(nd.children[i].children.length > 0) {
											nd.children[i].insertBefore(ndTxt, nd.children[i].children[0]);
										}
										else {
											nd.children[i].appendChild(ndTxt);
										}
									}
								}
								snapshot.snapshotItem(0).parentNode.replaceChild(nd.children[i].cloneNode(true), snapshot.snapshotItem(0));
							}
							else {	// 不存在, 補充
								theLogger.log("新增'" + xp2 + "'");
								tmpl.appendChild(nd.children[i].cloneNode(true));
							}
						}
						// 1110629 Raymond 1110561 修正"令類別"、"函類別"不應覆寫, 應保持tmpl中的設定值
						else if(nd.children[i].nodeName == "令類別" || nd.children[i].nodeName == "函類別") {
							theLogger.log("'" + nd.children[i].nodeName + "'保持為樣版檔本來的設定值, 不要覆蓋");
						}
						// 1121114 Raymond 1120881 新增樣版檔有"簽核區域排版屬性"時, 搜尋原稿中對應ID的高度欄位, 再帶入高度欄位的原稿設定值
						else if(nd.children[i].nodeName == "簽核區域排版屬性" && sourceType != 1) {	// 只有貼上稿件(置換)要帶入原稿的高度設定, 開啟舊檔及貼上稿件(新增)則不要帶入, 以樣版檔預設高度為準
							var ssNew = tmplDoc.evaluate("簽核區域排版屬性/高度", tmpl, null, 7, null);
							if(ssNew.snapshotLength > 0) {
								for(var j=0; j<ssNew.snapshotLength; j++) {
									let id = ssNew.snapshotItem(j).getAttribute("ID");
									let found = false;
									for(var k=0; k<nd.children[i].children.length; k++) {
										if(nd.children[i].children[k].nodeName == "高度" && nd.children[i].children[k].getAttribute("ID") == id) {
											found = true;
											let ctx = nd.children[i].children[k].textContent;
											theLogger.log("套用(覆寫)'簽核區域排版屬性/高度[@ID=\"" + id + "\"]'=" + ssNew.snapshotItem(j).textContent + "->" + ctx);
											ssNew.snapshotItem(j).textContent = ctx;
											break;
										}
									}
									if(!found)
										theLogger.warn("套用(覆寫)'簽核區域排版屬性/高度[@ID=\"" + id + "\"]'=" + ssNew.snapshotItem(j).textContent + "...樣版檔無對應此ID的欄位");
								}
							}
							else {
								theLogger.warn("樣版檔無'簽核區域排版屬性/高度'欄位");
							}
						}
						else if(copyTags.indexOf(nd.children[i].nodeName) >= 0) {	// 條列文字直接複製
							var xp2 = xp + "/" + nd.children[i].nodeName;
							// check dup
							var n = 1;
							while(xp2 in checkedList)
								xp2 = xp + "/" + nd.children[i].nodeName + "[" + (++n) + "]";
							checkedList[xp2] = false;	// 記錄查詢過的XPath
							
							var snapshot = tmplDoc.evaluate(xp2, tmplDoc, null, 7, null);
							if(snapshot.snapshotLength > 0) {
								checkedList[xp2] = true;	// 既有的XPath
								theLogger.log("複製取代'" + xp2 + "'");
								snapshot.snapshotItem(0).parentNode.replaceChild(nd.children[i].cloneNode(true), snapshot.snapshotItem(0));
							}
							else {	// 不存在, 補充
								theLogger.log("新增'" + xp2 + "'");
								tmpl.appendChild(nd.children[i].cloneNode(true));
							}
							// 1100505 Raymond 1090542 僅限開啟舊檔, 以免貼上稿件時也套用到此條件, 造成貼上後欄位變少的問題
							// 1091008 Raymond 1090542 鐵道局要求開啟舊檔要移除抄本受文者
							//if(nd.children[i].nodeName == "受文者列表" && theUserInfo.OrgNickName == "RRB") {
							if(nd.children[i].nodeName == "受文者列表" && theUserInfo.OrgNickName == "RRB" && sourceType == 1) {
								snapshot = tmplDoc.evaluate(xp2, tmplDoc, null, 7, null);	// 取代或新增子節點後重取子節點才能取得更新後的子節點
								if(snapshot.snapshotLength > 0) {
									var nd2 = snapshot.snapshotItem(0);
									for(var j=nd2.children.length-1; j>=0; j--) {
										if(nd2.children[j].nodeName == "受文者") {
											if(nd2.children[j].getAttribute("本別") == "抄本")
												$(nd2.children[j]).remove();
										}
										else if(nd2.children[j].nodeName == "受文者列表") {
											var $r = $(nd2.children[j]).find("受文者");
											if($r.length > 0 && $r.eq(0).attr("本別") == "抄本")
												$(nd2.children[j]).remove();
										}
									}
								}
							}
							// 1111003 Raymond 陸委會序313 修正開啟舊檔或轉換文別為便簽時, 缺少"附件列表/文字"導致附件管理開啟跟儲存會出現錯誤的問題
							else if(nd.children[i].nodeName == "附件列表") {
								snapshot = tmplDoc.evaluate(xp2 + "/文字", tmplDoc, null, 7, null);
								if(snapshot.snapshotLength == 0) {	// 缺少"附件列表/文字"節點
									var ndTx = tmplDoc.createElement("文字");
									snapshot = tmplDoc.evaluate(xp2, tmplDoc, null, 7, null);
									if(snapshot.snapshotLength > 0) {
										if(snapshot.snapshotItem(0).children.length > 0)
											snapshot.snapshotItem(0).insertBefore(ndTx, snapshot.snapshotItem(0).children[0]);
										else
											snapshot.snapshotItem(0).appendChild(ndTx);
									}
								}
							}
						}
						// 1100505 Raymond 1090542 僅限開啟舊檔, 以免貼上稿件時也套用到此條件, 造成貼上後欄位變少的問題
						// 1091008 Raymond 1090542 鐵道局要求僅複製主旨、開會事由、段落、備註、受文者列表
						//else {	// 非條列文字則往下搜尋
						//else if(theUserInfo.OrgNickName != "RRB") {
						else if(theUserInfo.OrgNickName != "RRB" || sourceType != 1) {
							var xp2 = xp + "/" + nd.children[i].nodeName;
							// check dup
							var n = 1;
							while(xp2 in checkedList)
								xp2 = xp + "/" + nd.children[i].nodeName + "[" + (++n) + "]";
							checkedList[xp2] = false;	// 記錄查詢過的XPath
							
							var snapshot = tmplDoc.evaluate(xp2, tmplDoc, null, 7, null);
							if(snapshot.snapshotLength > 0) {
								checkedList[xp2] = true;	// 既有的XPath
								theLogger.log("檢查'" + xp2 + "'存在");
								doSupplyElem(snapshot.snapshotItem(0), nd.children[i], xp2, checkedList, tmplDoc);
							}
							else {	// 不存在, 補充
								theLogger.log("檢查'" + xp2 + "'不存在, 忽略");
								/*var newElm = tmplDoc.createElement(nd.children[i].nodeName);
								tmpl.appendChild(newElm);
								doSupplyElem(newElm, nd.children[i], xp2, checkedList, tmplDoc);*/
							}
						}
					}
				}
			}
			else if("selectSingleNode" in tmplDoc) {
				if(nd.childNodes.length == 1 && nd.childNodes[0].nodeType == 3 && nd.childNodes[0].text.length > 0) {	// 只有文字內容的標籤
					//if(tmpl.text.length == 0) {
						theLogger.log("套用(覆寫)'" + xp + "' = '" + nd.text + "'");
						tmpl.text = nd.text;
					//}
				}
				for(var i=0; i<nd.childNodes.length; i++) {
					if(nd.childNodes[i].nodeType == 1) {
						// 1110506 Raymond 1110521 修正段落複製時要對到段名相同的段落複製, 而不是照順序
						if(nd.childNodes[i].nodeName == "段落") {
							var xp2 = xp + "/" + nd.childNodes[i].nodeName + "[@段名 = \"" + nd.childNodes[i].getAttribute("段名") + "\"]";
							if(xp2 in checkedList)
								theLogger.warn("之前已有同段名的段落, 複製取代恐會取代掉第一個同段名段落");
							checkedList[xp2] = false;	// 記錄查詢過的XPath
							
							var ndChild = tmplDoc.selectSingleNode(xp2);
							if(!!ndChild) {
								checkedList[xp2] = true;	// 既有的XPath
								theLogger.log("複製取代'" + xp2 + "'");
								// 1110809 Raymond 考試院序178 修正便簽等文別的樣版故意拿掉段落的<文字>是為了少顯示一行, 而開啟舊檔卻會把段落的<文字>補回來(1071181)造成多顯示一行的問題
								var ndTxt = tmplDoc.selectSingleNode(xp2 + "/文字");
								if(!!ndTxt) {	// 樣版有<文字>
									var srcNdHasTxt = false;
									for(var j=0; j<nd.childNodes[i].childNodes.length; j++) {
										if(nd.childNodes[i].childNodes[j].nodeName == "文字") {
											srcNdHasTxt = true;
											break;
										}
									}
									if(!srcNdHasTxt) {	// 開啟舊檔的段落沒有<文字>, 須補上
										theLogger.log("開啟舊檔的段落(" + xp2 + ")沒有<文字>, 但樣版檔有, 須補上");
										var ndTxt = nd.ownerDocument.createElement("文字");
										if(nd.childNodes[i].childNodes.length > 0) {
											nd.childNodes[i].insertBefore(ndTxt, nd.childNodes[i].childNodes[0]);
										}
										else {
											nd.childNodes[i].appendChild(ndTxt);
										}
									}
								}
								ndChild.parentNode.replaceChild(nd.childNodes[i].cloneNode(true), ndChild);
							}
							else {	// 不存在, 補充
								theLogger.log("新增'" + xp2 + "'");
								tmpl.appendChild(nd.childNodes[i].cloneNode(true));
							}
						}
						else
						if(copyTags.indexOf(nd.childNodes[i].nodeName) >= 0) {
							var xp2 = xp + "/" + nd.childNodes[i].nodeName;
							// check dup
							var n = 1;
							while(xp2 in checkedList)
								xp2 = xp + "/" + nd.childNodes[i].nodeName + "[" + (n++) + "]";
							checkedList[xp2] = false;	// 記錄查詢過的XPath
							
							var ndChild = tmplDoc.selectSingleNode(xp2);
							if(!!ndChild) {
								checkedList[xp2] = true;	// 既有的XPath
								theLogger.log("複製取代'" + xp2 + "'");
								ndChild.parentNode.replaceChild(nd.childNodes[i].cloneNode(true), ndChild);
							}
							else {	// 不存在, 補充
								theLogger.log("新增'" + xp2 + "'");
								tmpl.appendChild(nd.childNodes[i].cloneNode(true));
							}
							// 1100505 Raymond 1090542 僅限開啟舊檔, 以免貼上稿件時也套用到此條件, 造成貼上後欄位變少的問題
							// 1091008 Raymond 1090542 鐵道局要求開啟舊檔要移除抄本受文者
							//if(nd.childNodes[i].nodeName == "受文者列表" && theUserInfo.OrgNickName == "RRB") {
							if(nd.childNodes[i].nodeName == "受文者列表" && theUserInfo.OrgNickName == "RRB" && sourceType == 1) {
								ndChild = tmplDoc.selectSingleNode(xp2);	// 取代或新增子節點後重取子節點才能取得更新後的子節點
								if(!!ndChild) {
									for(var j=ndChild.childNodes.length-1; j>=0; j--) {
										if(ndChild.childNodes[j].nodeType == 1) {
											if(ndChild.childNodes[j].nodeName == "受文者") {
												if(ndChild.childNodes[j].getAttribute("本別") == "抄本")
													$(ndChild.childNodes[j]).remove();
											}
											else if(ndChild.childNodes[j].nodeName == "受文者列表") {
												var $r = $(ndChild.childNodes[j]).find("受文者");
												if($r.length > 0 && $r.eq(0).attr("本別") == "抄本")
													$(ndChild.childNodes[j]).remove();
											}
										}
									}
								}
							}
							// 1111003 Raymond 陸委會序313 修正開啟舊檔或轉換文別為便簽時, 缺少"附件列表/文字"導致附件管理開啟跟儲存會出現錯誤的問題
							else if(nd.children[i].nodeName == "附件列表") {
								ndChild = tmplDoc.selectSingleNode(xp2 + "/文字");
								if(!ndChild) {	// 缺少"附件列表/文字"節點
									var ndTx = tmplDoc.createElement("文字");
									ndChild = tmplDoc.selectSingleNode(xp2);
									if(!!ndChild) {
										if(ndChild.childNodes.length > 0)
											ndChild.insertBefore(ndTx, ndChild.childNodes[0]);
										else
											ndChild.appendChild(ndTx);
									}
								}
							}
						}
						// 1100505 Raymond 1090542 僅限開啟舊檔, 以免貼上稿件時也套用到此條件, 造成貼上後欄位變少的問題
						// 1091008 Raymond 1090542 鐵道局要求僅複製主旨、開會事由、段落、備註、受文者列表
						//else {
						//else if(theUserInfo.OrgNickName != "RRB") {
						else if(theUserInfo.OrgNickName != "RRB" || sourceType != 1) {
							var xp2 = xp + "/" + nd.childNodes[i].nodeName;
							// check dup
							var n = 1;
							while(xp2 in checkedList)
								xp2 = xp + "/" + nd.childNodes[i].nodeName + "[" + (n++) + "]";
							checkedList[xp2] = false;	// 記錄查詢過的XPath
							
							var ndChild = tmplDoc.selectSingleNode(xp2);
							if(!!ndChild) {
								checkedList[xp2] = true;	// 既有的XPath
								theLogger.log("檢查'" + xp2 + "'存在");
								doSupplyElem(ndChild, nd.childNodes[i], xp2, checkedList, tmplDoc);
							}
							else {	// 不存在, 補充
								theLogger.log("檢查'" + xp2 + "'不存在, 忽略");
								/*theLogger.log("新增'" + xp2 + "'");
								var newElm = xmlDoc.createElement(nd.childNodes[i].nodeName);
								nd.appendChild(newElm);
								doSupplyElem(newElm, nd.childNodes[i], xp2, checkedList, tmplDoc);*/
							}
						}
					}
				}
			}
			else {
				theLogger.error("XML物件不支援selectSingleNode亦不支援evaluate方法, 無法補充缺少的欄位");
			}
		}
		// 1100311 Raymond 1090991 新增defPrintXSLName參數, 啟用選擇套用樣版功能後, 若選取的樣版有設定"預設排版"屬性, 則該屬性值會以此參數傳入
		//function postSupplyElems() {
		function postSupplyElems(defPrintXSLName) {
			// 2016.10.28 新增匯入舊檔時, 補充段落/文字及段落/條列[1], 以避免無法編輯段落及條列文字的問題
			if("evaluate" in xmlDoc) {
				var snapshot;
				try {
					snapshot = xmlDoc.evaluate("/*/段落", xmlDoc, null, 7, null);
				}
				catch(e) {
					theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
				}
				if(snapshot.snapshotLength == 0)
					theLogger.warn("無段落, 不需檢核文字節點是否存在");
				else if(snapshot.snapshotLength > 0) {
					theLogger.log("有" + snapshot.snapshotLength + "個段落");
					for(var i=0; i<snapshot.snapshotLength; i++) {
						var paNode = snapshot.snapshotItem(i);
						if(paNode.children.length > 0) {
							if(paNode.children[0].nodeName == "文字") {
								theLogger.log("段落" + i + "已有文字子節點");
								if(paNode.children.length == 1 && paNode.children[0].textContent == "") {	// 2016.12.26 新增判斷文字是空字串的才新增條列
									var newNode2 = xmlDoc.createElement("條列");
									newNode2.setAttribute("序號", "一、");
									var newNode3 = xmlDoc.createElement("文字");
									newNode2.appendChild(newNode3);
									paNode.appendChild(newNode2);
									theLogger.log("段落" + i + "新增條列子節點");
								}
							}
							/* 1110809 Raymond 考試院序178 修正便簽等文別的樣版故意拿掉段落的<文字>是為了少顯示一行, 而開啟舊檔卻會把段落的<文字>補回來(1071181)造成多顯示一行的問題
							else {
								// 1071210 Raymond 1071181 新增判斷段名不為空才補上文字節點, 避免有些文別(ex.便簽)故意弄成沒有文字又不顯示段名是為了要隱藏整行, 但在開啟舊檔時又跑出空行出來的問題
								if(paNode.hasAttribute("段名") && paNode.getAttribute("段名").length > 0) {
									var newNode = xmlDoc.createElement("文字");
									paNode.insertBefore(newNode, paNode.children[0]);	// 2016.10.31 bugfix
									theLogger.log("段落" + i + "新增文字子節點");
								}
							}*/
						}
						else {
							/* 1110809 Raymond 考試院序178 修正便簽等文別的樣版故意拿掉段落的<文字>是為了少顯示一行, 而開啟舊檔卻會把段落的<文字>補回來(1071181)造成多顯示一行的問題
							// 1071210 Raymond 1071181 新增判斷段名不為空才補上文字節點, 避免有些文別(ex.便簽)故意弄成沒有文字又不顯示段名是為了要隱藏整行, 但在開啟舊檔時又跑出空行出來的問題
							if(paNode.hasAttribute("段名") && paNode.getAttribute("段名").length > 0) {
								var newNode = xmlDoc.createElement("文字");
								paNode.appendChild(newNode);
								theLogger.log("段落" + i + "新增文字子節點");
							}*/
							
							var newNode2 = xmlDoc.createElement("條列");
							newNode2.setAttribute("序號", "一、");
							var newNode3 = xmlDoc.createElement("文字");
							newNode2.appendChild(newNode3);
							paNode.appendChild(newNode2);
							theLogger.log("段落" + i + "新增條列子節點");
						}
					}
				}
				
				// 1130809 Raymond 1130313 合併1111007(1100394), 新增keepAttNode參數, 匯入ZIP壓縮檔中的文稿檔時, 在套用樣版檔時保留附件檔名節點使用
				if(keepAttNode != true) {
				// 2016.10.31 若有附件列表(及附件檔名)則移除
				try {
					snapshot = xmlDoc.evaluate("/*/附件列表", xmlDoc, null, 7, null);
				}
				catch(e) {
					theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
				}
				if(snapshot.snapshotLength == 0) {
					theLogger.warn("無附件列表, 新增一個");
					var newNode = xmlDoc.createElement("附件列表");
					xmlDoc.documentElement.appendChild(newNode);
					theLogger.log("新增附件列表子節點");
					var newNode2 = xmlDoc.createElement("文字");
					newNode.appendChild(newNode2);
					theLogger.log("新增附件列表文字子節點");
				}
				else if(snapshot.snapshotLength > 0) {
					try {
						snapshot = xmlDoc.evaluate("/*/附件列表/附件檔名", xmlDoc, null, 7, null);
					}
					catch(e) {
						theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
					}
					if(snapshot.snapshotLength > 0) {
						theLogger.warn("匯入舊檔有'附件檔名'記錄, 清除之");
						for(var i=snapshot.snapshotLength-1; i>=0; i--) {
							var nd = snapshot.snapshotItem(i);
							nd.parentNode.removeChild(nd);
						}
					}
				}
				}
				// 1141117 Raymond 北榮序382 修正樣版檔有"會辦意見列表"時, 搜尋原稿中"會稿單位列表"的"單位代碼", 再比對"會辦意見列表"是否有對應單位代碼的會辦意見, 若無則新增
				try {
					snapshot = xmlDoc.evaluate("/*/會辦意見列表", xmlDoc, null, 7, null);
				}
				catch(e) {
				}
				if(snapshot.snapshotLength > 0) {
					var defH = snapshot.snapshotItem(0).getAttribute("預設簽核區域高度");
					var ssT = xmlDoc.evaluate("/*/會辦意見列表/預設意見文字", xmlDoc, null, 7, null);
					theLogger.log("樣版檔有'會辦意見列表'節點, 新增與會稿單位列表的單位對應代碼的會辦意見...");
					var ss2 = xmlDoc.evaluate("/*/會稿單位列表/單位", xmlDoc, null, 7, null);
					if(ss2.snapshotLength > 0) {
						for(var i=0; i<ss2.snapshotLength; i++) {
							var ouid = ss2.snapshotItem(i).getAttribute("代碼");
							theLogger.log("搜尋會稿單位(單位代碼:" + ouid + ")的會辦意見...");
							var ss3 = xmlDoc.evaluate("/*/會辦意見列表/會辦意見[@代碼='" + ouid + "']", xmlDoc, null, 7, null);
							if(ss3.snapshotLength > 0) {
								theLogger.log("已存在, 略過");
							}
							else {
								theLogger.log("找不到, 新增...");
								var newNode = xmlDoc.createElement("會辦意見");
								newNode.setAttribute("代碼", ouid);
								newNode.setAttribute("簽核區域排版高度", defH);
								if(ssT.snapshotLength > 0) {
									newNode.appendChild(ssT.snapshotItem(0).cloneNode(true));
								}
								snapshot.snapshotItem(0).appendChild(newNode);
							}
						}
					}
				}
			}
			else if("selectNodes" in xmlDoc) {	// IE
				var nds = xmlDoc.selectNodes("/*/段落");
				if(nds.length > 0) {
					theLogger.log("有" + nds.length + "個段落");
					for(var i=0; i<nds.length; i++) {
						var paNode = nds[i];
						if(paNode.childNodes.length > 0) {
							// 1061108 Raymond 因為1061053修正追蹤修訂含半形空白設reserveWhiteSpace, 導致childNodes有TextNode, 須檢核nodeType並跳過
							/*if(paNode.childNodes[0].nodeName == "文字") {
								theLogger.log("段落" + i + "已有文字子節點");
								if(paNode.childNodes.length == 1 && paNode.childNodes[0].text == "") {	// 2016.12.26 新增判斷文字是空字串的才新增條列
									var newNode2 = xmlDoc.createElement("條列");
									newNode2.setAttribute("序號", "一、");
									var newNode3 = xmlDoc.createElement("文字");
									newNode2.appendChild(newNode3);
									paNode.appendChild(newNode2);
									theLogger.log("段落" + i + "新增條列子節點");
								}
							}
							else {
								var newNode = xmlDoc.createElement("文字");
								paNode.insertBefore(newNode, paNode.firstChild);	// 2016.10.31 bugfix
								theLogger.log("段落" + i + "新增文字子節點");
							}*/
							var hasTx = false, txLen = 0, hasLst = false, firstLst = null;
							for(var j=0; j<paNode.childNodes.length; j++) {
								if(paNode.childNodes[j].nodeType == 1) {
									if(paNode.childNodes[j].tagName == "文字") {
										hasTx = true;
										if("text" in paNode.childNodes[j])
											txLen = paNode.childNodes[j].text.replace(/[\r\n]/, "").length;	// 過濾\r\n
									}
									else if(paNode.childNodes[j].tagName == "條列") {
										hasLst = true;
										firstLst = paNode.childNodes[j];
										break;
									}
								}
							}
							if(hasTx) {
								theLogger.log("段落" + i + "已有文字子節點");
								if(txLen == 0 && !hasLst) {
									var newNode2 = xmlDoc.createElement("條列");
									newNode2.setAttribute("序號", "一、");
									var newNode3 = xmlDoc.createElement("文字");
									newNode2.appendChild(newNode3);
									paNode.appendChild(newNode2);
									theLogger.log("段落" + i + "新增條列子節點");
								}
							}
							else if(!!firstLst) {
								/* 1110809 Raymond 考試院序178 修正便簽等文別的樣版故意拿掉段落的<文字>是為了少顯示一行, 而開啟舊檔卻會把段落的<文字>補回來(1071181)造成多顯示一行的問題
								// 1071210 Raymond 1071181 新增判斷段名不為空才補上文字節點, 避免有些文別(ex.便簽)故意弄成沒有文字又不顯示段名是為了要隱藏整行, 但在開啟舊檔時又跑出空行出來的問題
								if(!!paNode.getAttribute("段名") && paNode.getAttribute("段名").length > 0) {
									var newNode = xmlDoc.createElement("文字");
									paNode.insertBefore(newNode, firstLst);
									theLogger.log("段落" + i + "新增文字子節點");
								}*/
							}
							else {
								/* 1110809 Raymond 考試院序178 修正便簽等文別的樣版故意拿掉段落的<文字>是為了少顯示一行, 而開啟舊檔卻會把段落的<文字>補回來(1071181)造成多顯示一行的問題
								// 1071210 Raymond 1071181 新增判斷段名不為空才補上文字節點, 避免有些文別(ex.便簽)故意弄成沒有文字又不顯示段名是為了要隱藏整行, 但在開啟舊檔時又跑出空行出來的問題
								if(!!paNode.getAttribute("段名") && paNode.getAttribute("段名").length > 0) {
									var newNode = xmlDoc.createElement("文字");
									paNode.appendChild(newNode);
									theLogger.log("段落" + i + "新增文字子節點");
								}*/
								
								var newNode2 = xmlDoc.createElement("條列");
								newNode2.setAttribute("序號", "一、");
								var newNode3 = xmlDoc.createElement("文字");
								newNode2.appendChild(newNode3);
								paNode.appendChild(newNode2);
								theLogger.log("段落" + i + "新增條列子節點");
							}
						}
						else {
							/* 1110809 Raymond 考試院序178 修正便簽等文別的樣版故意拿掉段落的<文字>是為了少顯示一行, 而開啟舊檔卻會把段落的<文字>補回來(1071181)造成多顯示一行的問題
							// 1071210 Raymond 1071181 新增判斷段名不為空才補上文字節點, 避免有些文別(ex.便簽)故意弄成沒有文字又不顯示段名是為了要隱藏整行, 但在開啟舊檔時又跑出空行出來的問題
							if(!!paNode.getAttribute("段名") && paNode.getAttribute("段名").length > 0) {
								var newNode = xmlDoc.createElement("文字");
								paNode.appendChild(newNode);
								theLogger.log("段落" + i + "新增文字子節點");
							}*/
							
							var newNode2 = xmlDoc.createElement("條列");
							newNode2.setAttribute("序號", "一、");
							var newNode3 = xmlDoc.createElement("文字");
							newNode2.appendChild(newNode3);
							paNode.appendChild(newNode2);
							theLogger.log("段落" + i + "新增條列子節點");
						}
					}
				}
				else
					theLogger.warn("無段落, 不需檢核文字節點是否存在");
				// 1130809 Raymond 1130313 合併1111007(1100394), 新增keepAttNode參數, 匯入ZIP壓縮檔中的文稿檔時, 在套用樣版檔時保留附件檔名節點使用
				if(keepAttNode != true) {
				// 2016.10.31 若有附件列表(及附件檔名)則移除
				var nd = xmlDoc.selectSingleNode("/*/附件列表");
				if(!nd) {
					theLogger.warn("無附件列表, 新增一個");
					var newNode = xmlDoc.createElement("附件列表");
					xmlDoc.documentElement.appendChild(newNode);
					theLogger.log("新增附件列表子節點");
					var newNode2 = xmlDoc.createElement("文字");
					newNode.appendChild(newNode2);
					theLogger.log("新增附件列表文字子節點");
				}
				else {
					var nds = xmlDoc.selectNodes("/*/附件列表/附件檔名");
					if(nds.length > 0) {
						theLogger.warn("匯入舊檔有'附件檔名'記錄, 清除之");
						for(var i=nds.length-1; i>=0; i--) {
							var nd = nds[i];
							nd.parentNode.removeChild(nd);
						}
					}
				}
				}
			}
			else
				throw new Error("XML文件不支援evaluate亦不支援selectNodes方法");
			// 1110629 Raymond 1110561 當是DI且令類別為"令", 因無法分辨是一般令還是派令、派免令等, 改成提示請使用者選取套用的令樣版
			// 1100311 Raymond 1090991 新增若被呼叫有傳入參數(應是defPrintXSLName)時回傳此參數
			//if(theSSO.User.EnvSettings.get("WE_CHOOSE_TEMPLATE_WHILE_IMPORT") == "Y") {
			if(chooseTemplateWhileImport) {
				if(duringConfirm == true) {
					console.warn("選擇樣版詢問子視窗尚未關閉, 延後至子視窗關閉後再呼叫resolve");	// 1100507 Raymond error->warn
					resolveOnConfirmAfterHide = true;
				}
				else {
					console.warn("回傳defPrintXSLName參數'" + defPrintXSLName + "'");	// 1100507 Raymond error->warn
					dfd.resolve(defPrintXSLName);
				}
			}
			else {
				// 1100817 Raymond 1090991 客委會要求沒有啟用變數也要套用第一筆樣版檔的"預設排版"
				//dfd.resolve();
				dfd.resolve(defPrintXSLName);
			}
		}
		return dfd.promise();
	}
	// 1090526 Raymond 1090392 將supplyFromTemplate函式expose到nsEditor, 供貼上稿件(置換)叫用
	if(!!nsEditor)
		nsEditor.supplyFromTemplate = supplyFromTemplate;
	
	// 1100217 Raymond 1090610 新增dontSaveReceiverGroupMembers參數, 在儲存公文需轉出完稿XML時傳入true, 將不會轉出群組受文者中的成員受文者, 可節省儲存所耗費時間
	// 2016.12.7 套用追蹤修訂結果轉成完稿XML, 1071025 Raymond 修正輸出文字/text()時過濾掉\t\r\n等因縮排產生的XML內容
	//function transCmplXml(xml) {
	function transCmplXml(xml, dontSaveReceiverGroupMembers) {
		var t0 = new Date();
		var res;
		var xslStr = '<?xml version="1.0" encoding="UTF-16"?>\
	<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">\
	<xsl:output method="xml" omit-xml-declaration="no" encoding="UTF-16" />\
	<xsl:template match="/ | @* | node()">\
		<xsl:choose>\
			<xsl:when test="name()=\'mi\'">\
				<xsl:choose>\
					<xsl:when test="name(..)=\'mi\'">\
						<xsl:apply-templates select=".."/>\
					</xsl:when>\
					<xsl:otherwise>\
						<xsl:if test="@act != \'del\'">\
							<xsl:value-of select="."/>\
						</xsl:if>\
					</xsl:otherwise>\
				</xsl:choose>\
			</xsl:when>\
			<xsl:when test="name()=\'fmt\'">\
				<xsl:choose>\
					<xsl:when test="name(..)=\'mi\'">\
						<xsl:apply-templates select=".."/>\
					</xsl:when>\
					<xsl:otherwise>\
						<xsl:value-of select="."/>\
					</xsl:otherwise>\
				</xsl:choose>\
			</xsl:when>\
			<xsl:when test="name()=\'函類別\'">\
				<xsl:element name="函類別">\
					<xsl:attribute name="代碼"><xsl:value-of select="@代碼"/></xsl:attribute>\
				</xsl:element>\
			</xsl:when>\
			<xsl:when test="name()=\'速別\'">\
				<xsl:element name="速別">\
					<xsl:attribute name="代碼"><xsl:value-of select="@代碼"/></xsl:attribute>\
				</xsl:element>\
			</xsl:when>\
			<xsl:when test="name()=\'space-before\'"/>\
			<xsl:when test="name()=\'space-after\'"/>\
			<xsl:when test="name()=\'space-start\'"/>\
			<xsl:when test="name()=\'space-end\'"/>\
			<xsl:when test="name()=\'line-height\'"/>\
			<xsl:when test="name()=\'padding-start\'"/>\
			<xsl:when test="name()=\'padding-end\'"/>\
			<xsl:when test="name()=\'font-family\'"/>\
			<xsl:when test="name()=\'font-size\'"/>\
			<xsl:when test="name()=\'alt-fontname\'"/>' +
			/* 1090428 Raymond 1090320 另存新檔及開啟舊檔都會執行到transCmplXml, 保留對齊父段落屬性, 以供開啟舊檔時保持對齊父段落狀態
			<xsl:when test="name()=\'AlignParentContext\'"/>\*/
			'<xsl:when test="name()=\'alignment\'"/>' +
			/* 1100217 Raymond 1090610 儲存公文時儲存的完稿XML及線上簽核多產生的DI, 不要轉出群組受文者中的成員受文者, 以節省儲存所耗費時間 */
			((dontSaveReceiverGroupMembers == true)?
			'<xsl:when test="name()=\'受文者\'">\
				<xsl:if test="not(name(../..)=\'受文者列表\')">\
					<xsl:copy>\
						<xsl:apply-templates select="@* | node()"/>\
					</xsl:copy>\
				</xsl:if>\
			</xsl:when>':'') +
			'<xsl:otherwise>\
				<xsl:choose>\
					<xsl:when test="name()=\'文字\'">\
						<文字><xsl:call-template name="conv文字"/></文字>\
					</xsl:when>\
					<xsl:otherwise>\
						<xsl:copy>\
							<xsl:apply-templates select="@* | node()"/>\
						</xsl:copy>\
					</xsl:otherwise>\
				</xsl:choose>\
			</xsl:otherwise>\
		</xsl:choose>\
	</xsl:template>\
	<xsl:template name="conv文字">\
		<xsl:for-each select=".//text()">\
			<xsl:choose>\
				<xsl:when test="name(..)=\'mi\'">\
					<xsl:apply-templates select=".."/>\
				</xsl:when>\
				<xsl:when test="name(..)=\'fmt\'">\
					<xsl:apply-templates select=".."/>\
				</xsl:when>\
				<xsl:otherwise><xsl:value-of select="translate(., \'&#x9;&#xD;&#xA;\', \'\')"/></xsl:otherwise>\
			</xsl:choose>\
		</xsl:for-each>\
	</xsl:template>\
</xsl:stylesheet>';
		if("ActiveXObject" in window) {
			var xsl = new ActiveXObject("MSXML2.DOMDocument");
			if(xsl.loadXML(xslStr)) {
				try {
					res = xml.transformNode(xsl);
					if(res) {
						theLogger.log("transformNode='" + res + "'");
						// 1071025 Raymond 修正IE下另存新檔先轉換為完稿XML時發生錯誤的問題
						//res = (new DOMParser).parseFromString(res, "text/xml");
						//if(!!res)
						//	return res;
						//else
						//	theLogger.error("套用完稿XSL(parseFromString)失敗!");
						var xmlDoc = new ActiveXObject("MSXML2.DOMDocument");
						xmlDoc.resolveExternals = false;
						xmlDoc.validateOnParse = false;
						xmlDoc.preserveWhiteSpace = true;
						if(xmlDoc.loadXML(res)) {
							console.log("transCmplXml() costs " + (new Date() - t0) + "s");
							return xmlDoc;
						}
						else {
							var pe = xmlDoc.parseError;
							theLogger.error("套用完稿XSL(loadXML)失敗! " + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
						}
					}
					else
						theLogger.error("套用完稿XSL(transformNode)失敗!");
				}
				catch(e) {
					theLogger.error("套用完稿XSL失敗! " + e.message);
				}
			}
			else {
				var pe = xslDoc.parseError;
				theLogger.error("載入完稿XSL失敗! " + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
			}
		}
		else {
			// 1140515 Raymond 1140198 新增移除根節點的FromNo屬性
			if(xml.documentElement.hasAttribute("FromNo")) {
				var xmlDup = (new DOMParser()).parseFromString("<root/>", "text/xml");
				xmlDup.replaceChild(xml.documentElement.cloneNode(true), xmlDup.documentElement);
				theLogger.log("移除文稿XML的根節點的'FromNo'屬性");
				xmlDup.documentElement.removeAttribute("FromNo");
				xml = xmlDup;
			}
			var xsl = (new DOMParser()).parseFromString(xslStr, "text/xml");
			var xslt = new XSLTProcessor();
			xslt.importStylesheet(xsl);
			var ownerDocument = document.implementation.createDocument("", "", null);	// 2016.8.4 照MDN範例
			res = xslt.transformToDocument(xml, ownerDocument);
			if(!!res) {	// 判斷轉換結果, 回傳null可能是PrintXSL有問題
				console.log("%ctransCmplXml() costs " + (new Date() - t0) + "s", "color:#00F");
				return res;
			}
			else
				theLogger.error("套用完稿XSL(transfromToFragment)失敗!");
		}
	}
	// 1061212 Raymond 1061211 將transCmplXml函式expose到nsEditor, 供另存新檔叫用
	if(!!nsEditor)
		nsEditor.transCmplXml = transCmplXml;
	// 1140515 Raymond 1140198 新增第2參數keepFromNoAttr, 若傳入true, 則表示要保留匯入DI的根節點的@FromNo屬性, 否則不保留
	// 1121222 Raymond 領務局序345 新增轉成可保留格式化資訊的完稿XML
	//function transCmplXmlWithFmt(xml) {
	function transCmplXmlWithFmt(xml, keepFromNoAttr) {
		var t0 = new Date();
		var res;
		// 1140625 Raymond 1140837 修正新增的追蹤修訂有連帶設定粗斜體底線上下標時<mi act="ins" styles="1">, 列印時未顯示粗斜體底線上下標的問題
		var xslStr = '<?xml version="1.0" encoding="UTF-16"?>\
	<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">\
	<xsl:output method="xml" omit-xml-declaration="no" encoding="UTF-16" />\
	<xsl:template match="/ | @* | node()">\
		<xsl:choose>\
			<xsl:when test="name()=\'mi\'">\
				<xsl:choose>\
					<xsl:when test="name(..)=\'mi\'">\
						<xsl:apply-templates select=".."/>\
					</xsl:when>\
					<xsl:otherwise>\
						<xsl:choose>\
							<xsl:when test="@act = \'fmt\'">\
								<fmt>\
									<xsl:attribute name="styles"><xsl:value-of select="@styles"/></xsl:attribute>\
									<xsl:value-of select="."/>\
								</fmt>\
							</xsl:when>\
							<xsl:when test="@act != \'del\'">\
								<xsl:choose>\
									<xsl:when test="@styles">\
										<fmt>\
											<xsl:attribute name="styles"><xsl:value-of select="@styles"/></xsl:attribute>\
											<xsl:value-of select="."/>\
										</fmt>\
									</xsl:when>\
									<xsl:otherwise>\
										<xsl:value-of select="."/>\
									</xsl:otherwise>\
								</xsl:choose>\
							</xsl:when>\
						</xsl:choose>\
					</xsl:otherwise>\
				</xsl:choose>\
			</xsl:when>\
			<xsl:when test="name()=\'fmt\'">\
				<xsl:choose>\
					<xsl:when test="name(..)=\'mi\'">\
						<xsl:apply-templates select=".."/>\
					</xsl:when>\
					<xsl:otherwise>\
						<xsl:choose>\
							<xsl:when test="@styles">\
								<fmt>\
									<xsl:attribute name="styles"><xsl:value-of select="@styles"/></xsl:attribute>\
									<xsl:value-of select="."/>\
								</fmt>\
							</xsl:when>\
							<xsl:otherwise>\
								<xsl:value-of select="."/>\
							</xsl:otherwise>\
						</xsl:choose>\
					</xsl:otherwise>\
				</xsl:choose>\
			</xsl:when>\
			<xsl:when test="name()=\'函類別\'">\
				<xsl:element name="函類別">\
					<xsl:attribute name="代碼"><xsl:value-of select="@代碼"/></xsl:attribute>\
				</xsl:element>\
			</xsl:when>\
			<xsl:when test="name()=\'速別\'">\
				<xsl:element name="速別">\
					<xsl:attribute name="代碼"><xsl:value-of select="@代碼"/></xsl:attribute>\
				</xsl:element>\
			</xsl:when>\
			<xsl:when test="name()=\'文字\'">\
				<文字><xsl:call-template name="conv文字"/></文字>\
			</xsl:when>\
			<xsl:otherwise>\
				<xsl:copy>\
					<xsl:apply-templates select="@* | node()"/>\
				</xsl:copy>\
			</xsl:otherwise>\
		</xsl:choose>\
	</xsl:template>\
	<xsl:template name="conv文字">\
		<xsl:for-each select=".//text()">\
			<xsl:choose>\
				<xsl:when test="name(..)=\'mi\'">\
					<xsl:apply-templates select=".."/>\
				</xsl:when>\
				<xsl:when test="name(..)=\'fmt\'">\
					<xsl:apply-templates select=".."/>\
				</xsl:when>\
				<xsl:otherwise><xsl:value-of select="translate(., \'&#x9;&#xD;&#xA;\', \'\')"/></xsl:otherwise>\
			</xsl:choose>\
		</xsl:for-each>\
	</xsl:template>\
</xsl:stylesheet>';
		if("ActiveXObject" in window) {
			var xsl = new ActiveXObject("MSXML2.DOMDocument");
			if(xsl.loadXML(xslStr)) {
				try {
					res = xml.transformNode(xsl);
					if(res) {
						theLogger.log("transformNode='" + res + "'");
						var xmlDoc = new ActiveXObject("MSXML2.DOMDocument");
						xmlDoc.resolveExternals = false;
						xmlDoc.validateOnParse = false;
						xmlDoc.preserveWhiteSpace = true;
						if(xmlDoc.loadXML(res)) {
							console.log("transCmplXmlWithFmt() costs " + (new Date() - t0) + "s");
							return xmlDoc;
						}
						else {
							var pe = xmlDoc.parseError;
							theLogger.error("套用保留格式化資訊的完稿XSL(loadXML)失敗! " + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
						}
					}
					else
						theLogger.error("套用保留格式化資訊的完稿XSL(transformNode)失敗!");
				}
				catch(e) {
					theLogger.error("套用保留格式化資訊的完稿XSL失敗! " + e.message);
				}
			}
			else {
				var pe = xslDoc.parseError;
				theLogger.error("載入保留格式化資訊的完稿XSL失敗! " + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
			}
		}
		else {
			// 1140515 Raymond 1140198 新增判斷若第2參數傳入true則保留根節點的FromNo屬性, 否則移除
			if(keepFromNoAttr != true) {
				if(xml.documentElement.hasAttribute("FromNo")) {
					var xmlDup = (new DOMParser()).parseFromString("<root/>", "text/xml");
					xmlDup.replaceChild(xml.documentElement.cloneNode(true), xmlDup.documentElement);
					theLogger.log("移除文稿XML的根節點的'FromNo'屬性");
					xmlDup.documentElement.removeAttribute("FromNo");
					xml = xmlDup;
				}
			}
			var xsl = (new DOMParser()).parseFromString(xslStr, "text/xml");
			var xslt = new XSLTProcessor();
			xslt.importStylesheet(xsl);
			var ownerDocument = document.implementation.createDocument("", "", null);	// 2016.8.4 照MDN範例
			res = xslt.transformToDocument(xml, ownerDocument);
			if(!!res) {	// 判斷轉換結果, 回傳null可能是PrintXSL有問題
				console.log("%ctransCmplXmlWithFmt() costs " + (new Date() - t0) + "s", "color:#00F");
				return res;
			}
			else
				theLogger.error("套用保留格式化資訊的完稿XSL(transfromToFragment)失敗!");
		}
	}
	if(!!nsEditor)
		nsEditor.transCmplXmlWithFmt = transCmplXmlWithFmt;
	
	// 1090828 Raymond 1090529 下載浮水印設定檔(複製自RD-UniView.js)
	function _getForceWaterMarkSettings(SAMLart, orgNo, forceDisplayWaterMark) {
		var _dfd = $.Deferred();
		
		if (typeof forceDisplayWaterMark==='boolean' && forceDisplayWaterMark===false) {
			_dfd.resolve({success:true, jsonObj:null});
			return _dfd.promise();
		}
		
		var _filePath = SSO_CONFIG.getRsrcServerPath('', orgNo);
		var _fileName = 'ForceWaterMark.JSON';
		var _wsUrl = SSO_CONFIG.getWSUrl('fileiows');
		(new WebFileIO(_wsUrl)).download(_filePath, _fileName, {
			async: true,	// 1130809 Raymond 1130313 合併1111007(1100394), 都用deferred了, 當然改為非同步
			success: function(rslt, res) {
				if (typeof rslt=='string' && rslt.length) {
					var rsltObj = JSON.parse(rslt)
					if (!!rsltObj) {
						_dfd.resolve({success:true, jsonObj:rsltObj});	// pass 第2個參數表示影像檔是300dpi, 2016.11.1 直接回傳cbdata參數
						return;
					}
				}
				_dfd.reject({success:false, jsonObj:null, errMsg:'無效的ForceWaterMark設定檔內容!\r\nFilePath=' + _filePath + ', FileName=' + _fileName});
			},
			error: function(errorText) {
				_dfd.reject({success:true, jsonObj:null, errMsg:'下載ForceWaterMark設定檔失敗!\r\nFilePath=' + _filePath + ', FileName=' + _fileName});
			}
		});
		return _dfd.promise();
	}
	// 1090828 Raymond 1090529 下載浮水印影像檔(複製自RD-UniView.js)
	function _getForceWaterMarkImage(SAMLart, wsUrl, wmfilePath, wmfileName) {
		var _dfd = $.Deferred();
		(new WebFileIO(wsUrl)).download(wmfilePath, wmfileName, {
			async: true,	// 1130809 Raymond 1130313 合併1111007(1100394), 都用deferred了, 當然改為非同步
			success: function(rslt, res) {
				if (typeof rslt=='string' && rslt.length && rslt.indexOf('data:image')!==-1) {
					_dfd.resolve({success:true, 'imgStr':rslt});
					return;
				}
				_dfd.reject({success:false, 'imgStr':'', errMsg:'無效的強制式浮水印影像檔內容!\r\nFilePath=' + wmfilePath + ', FileName=' + wmfileName});
			},
			error: function(errorText) {
				_dfd.reject({success:false, 'imgStr':'', errMsg:'下載強制浮水印影像檔失敗! 檔名:' + wmfilePath + '\\' + wmfileName + ' ' + errorText});
			}
		});
		return _dfd.promise();
	}
	// 1140701 Raymond 1140919 新增判讀自動新增文稿批示單的環境變數設定值(擴充成兩個變數)
	let envsetting = theSSO.User.EnvSettings.get("WE_AUTO_GEN_文稿批示單");
	if(!!envsetting) {
		if(envsetting.indexOf("|") >= 0) {	// 設定值有「|」區分出兩個變數, 第1個是原本的是否啟用變數, 第2個是原本判斷「存查批示單」文別的取代變數
			_autoGenInstructionSheet = envsetting.substr(0, envsetting.indexOf("|")) == "Y";
			_autoGenInstructionSheet2ndDocType = envsetting.substr(envsetting.indexOf("|") + 1);
			theLogger.log("環境變數「WE_AUTO_GEN_文稿批示單」設定值為'" + envsetting + "', " + (_autoGenInstructionSheet?"啟":"停") + "用自動新增文稿批示單功能, 「存查批示單」判定功能改以「" + _autoGenInstructionSheet2ndDocType + "」取代");
		}
		else {	// 未設定「|」時, 只能代表原本的是否啟用變數
			_autoGenInstructionSheet = setting == "Y";
			theLogger.log("環境變數「WE_AUTO_GEN_文稿批示單」設定值為'" + envsetting + "', " + (_autoGenInstructionSheet?"啟":"停") + "用自動新增文稿批示單功能");
		}
	}
	// 1100506 Raymond 1100296 判斷是否需自動新增文稿批示單
	function shouldAutoGenInstructionSheet(docType) {
		// 1140701 Raymond 1140919 修改為變數判定
		//if(theSSO.User.EnvSettings.get("WE_AUTO_GEN_文稿批示單") == "Y") {
		//	if(docType == "存查批示單" || docType == "文稿批示單") {
		if(_autoGenInstructionSheet) {
			if(docType == _autoGenInstructionSheet2ndDocType || docType == "文稿批示單") {
				theLogger.log("環境變數'WE_AUTO_GEN_文稿批示單'為啟用(Y), 新增文稿文別為'" + docType + "', 不需自動新增文稿批示單");
				return false;
			}
			if(docType == "綜簽") {
				theLogger.log("環境變數'WE_AUTO_GEN_文稿批示單'為啟用(Y), 新增文稿文別為'" + docType + "', 應自動新增文稿批示單");
				return true;
			}
			// 1100510 Raymond 1100296 紙本不會載入封裝檔, 改成判斷ODCMSG的NEW_BY_OU=N才是來文
			//if(_signFolder.hasFromDoc()) {	// 是來文時, 判斷公文內是否已有存查批示單或文稿批示單
			if(_docObj.get("ODWMSG", "NEW_BY_OU") == "N") {
				if(typeof _currMgmt !== "undefined") {	// 有文稿管理檔才可新增文稿
					if(_docObj.signType == "P") {
						var all = _currMgmt.getAllDrafts();
						for(var i=0; i<all.length; i++) {
							var dt = all[i].docType;
							// 1140701 Raymond 1140919 修改為變數判定
							//if(dt == "存查批示單" || dt == "文稿批示單") {
							if(dt == _autoGenInstructionSheet2ndDocType || dt == "文稿批示單") {
								theLogger.log("環境變數'WE_AUTO_GEN_文稿批示單'為啟用(Y), 新增文稿文別為'" + docType + "', 公文內有" + dt + ", 不需自動新增文稿批示單");
								return false;
							}
						}
					}
					else {
						var n = _signFolder.getDraftCounts();
						for(var i=0; i<n; i++) {
							var d = _signFolder.getDraft(i);
							if("fromType" in d) {
								theLogger.log("第" + i + "個文稿是電子來文, 忽略");
								continue;
							}
							else if(d.name == "來文簽辦") {
								theLogger.log("第" + i + "個文稿是來文簽辦, 忽略");
								continue;
							}
							// 1140701 Raymond 1140919 修改為變數判定
							//if(d.docType == "存查批示單" || d.docType == "文稿批示單") {
							if(d.docType == _autoGenInstructionSheet2ndDocType || d.docType == "文稿批示單") {
								theLogger.log("環境變數'WE_AUTO_GEN_文稿批示單'為啟用(Y), 新增文稿文別為'" + docType + "', 公文內有" + d.docType + ", 不需自動新增文稿批示單");
								return false;
							}
						}
					}
					// 1140701 Raymond 1140919 修改為變數判定
					//theLogger.log("環境變數'WE_AUTO_GEN_文稿批示單'為啟用(Y), 新增文稿文別為'" + docType + "', 公文內無存查批示單或文稿批示單, 應自動新增文稿批示單");
					theLogger.log("環境變數'WE_AUTO_GEN_文稿批示單'為啟用(Y), 新增文稿文別為'" + docType + "', 公文內無" + _autoGenInstructionSheet2ndDocType + "或文稿批示單, 應自動新增文稿批示單");
					return true;
				}
			}
		}
		return false;
	}
	
	// 1140515 Raymond 1140198 新增檢核匯入舊檔的FromNo屬性是否與其它文稿一致, 若不一致則提示警告訊息並終止匯入
	function checkFromNo4VAC(xmlDoc) {
		var dfd = $.Deferred();
		if(SSO_CONFIG.OrgNickName == "VAC") {
			var snapshot = xmlDoc.evaluate("/*/@FromNo", xmlDoc, null, 7, null);
			if(snapshot.snapshotLength > 0) {
				var diFromNo = snapshot.snapshotItem(0).nodeValue;
				if(!!diFromNo) {
					theLogger.log("匯入DI的@FromNo為'" + diFromNo + "', 檢核與既有文稿是否一致");
					var idx = 0, n = this.getDraftCounts() - ((this.hasFromDoc())?1:0);
					var that = this;
					function doNext() {
						if(idx == n) {
							theLogger.log("未檢到到與既有稿件的@FromNo不一致, 通過檢核");
							dfd.resolve();
						}
						else
							that.accquireDraftModel(idx).done(function(dm) {
								let fromNo = "";
								try {
									fromNo = dm.attr("/*/@FromNo");
								}
								catch(e) {}
								if(!!fromNo && fromNo != diFromNo) {
									theLogger.log("檢核到與第" + idx + "筆文稿的@FromNo'" + fromNo + "'不一致, 終止匯入此DI");
									dfd.reject("目前已匯入改支改辦DI檔，請勿匯入不同表單編號的DI資料。");
								}
								else {
									++idx;
									doNext();
								}
							});
					}
					doNext();
				}
				else {
					theLogger.log("匯入DI有@FromNo, 但為空值, 不需檢核與既有文稿是否一致");
					dfd.resolve();
				}
			}
			else {
				theLogger.log("匯入DI無@FromNo, 不需檢核與既有文稿是否一致");
				dfd.resolve();
			}
		}
		else
			dfd.resolve();
		return dfd.promise();
	}

	// public interface
	return {
		// public methods
		setDocNo: function(docNo, requested) {	//設定公文文號, 2016.8.26 新增第2參數, 標示是否為線上取得
			var dfd = $.Deferred();	// 1100709 Raymond 1100581 改成deferred模式, 以解決尚未下載文稿, 在取號後路徑換了檔案還沒複製的問題
			if(_docObj.docNo != docNo) {
				theLogger.log("設定公文文號為'" + docNo + "', " + ((requested)?"線上取得":"手動輸入"));
				_docObj.set("aol", "ODWMSG", [	// 同步ODWMSG的DOC_NO欄位
					{fieldname: "DOC_NO", value: docNo}
				]);
				var trgt = [],	// 1100709 Raymond 1100581 合併[CDC]1090062 須批次設定發文字號的文稿
					dfds = [];	// 等待尚未下載之文稿
				// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式不要自動帶入發文字號
				var autoFillIssueNo = theSSO.User.EnvSettings.get("WE_AUTO_FILL_ISSUE_NO");			// 自動設定發文字號
				if(autoFillIssueNo.length > 0) {
					autoFillIssueNo = (autoFillIssueNo == "Y" || autoFillIssueNo == "1");
					// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式不要呼叫fnGetIssueNo
					if(autoFillIssueNo && !!theSSO && theSSO.offlineMode == true) {
						autoFillIssueNo = false;
						theLogger.warn("環境變數WE_AUTO_FILL_ISSUE_NO雖為'" + theSSO.User.EnvSettings.get("WE_AUTO_FILL_ISSUE_NO") + "', 但離線模式預設為不自動帶入發文字號");
					}
				}
				else {
					autoFillIssueNo = false;
					theLogger.log("未設定WE_AUTO_FILL_ISSUE_NO環境變數, 預設為不自動帶入發文字號");
				}
				// 1090527 Raymond 1090392 環境變數可能包含"O簽", 導致誤判「簽」為可發文文別
				var closeTypeSendDraftTypes = theSSO.User.EnvSettings.get("SSO_CLOSE_TYPE_SEND_DRAFTTYPE").split(";");
				for(var i=0,iMax = this.getDraftCounts(); i<iMax; i++) {	//2017.2.10	Leslie	要號後，應針對所有文稿進行文號設定，修改設定邏輯，迴圈改為所有文稿
					/* 1090217 Raymond 1090062 取號後要自動批次要發文號
					if(_cachedDM[i] == undefined) {
						this.accquireDraftModel(i)
						.done(function(dm) {
							dm.setDocNo(_docObj.docNo);	// 立即寫入文號至已載入的文稿
							theLogger.log("公文要號，預載["+dm.getDraftName()+"]文稿模型，並設定文號資訊");
						})
						.fail(function(errorText) {
							alert(errorText);
							theLogger.log("公文要號，預載文稿模型失敗，異常訊息："+errorText);
						});
					}*/
					if(!this.isFromDoc(i)) {	// 非來文才呼叫fnGetIssueNo
						dfds.push(this.accquireDraftModel(i)
						.done(function(dm) {
							dm.setDocNo(_docObj.docNo);	// 立即寫入文號至已載入的文稿
							theLogger.log("公文要號, 設定["+dm.getDraftName()+"]文稿之文號資訊");
							
							// 1070803 Raymond 1070821 簽稿會核單禁止非承辦人異動時, 會丟出Exception, 須用try-catch迴避
							try {
								// 判斷是否有發文字號節點, 有才取號
								var nd = dm.nodes("//發文字號");
								// 1090527 Raymond 1090392 環境變數可能包含"O簽", 導致誤判「簽」為可發文文別
								//1060125 Cloud 航港局序-366-增加判斷可發文稿件才放入
								//if(nd.length > 0) {
								//if(nd.length > 0 && theSSO.User.EnvSettings.get("SSO_CLOSE_TYPE_SEND_DRAFTTYPE").indexOf(dm.getDocType())!=-1) {
								if(nd.length > 0 && closeTypeSendDraftTypes.indexOf(dm.getDocType())!=-1) {
									theLogger.log("可發文文別且有發文字號欄位, 應批次設定發文字號");
									trgt.push({dm: dm});
								}
							}
							catch(e) {
								theLogger.warn(e.message);
							}
						})
						.fail(function(errorText) {
							theLogger.error(errorText);
						}));
					}
				}
				// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式不要自動帶入發文字號
				//1130520	Joe		1130222		調整批次取得發文號
				// if((theSSO.User.EnvSettings.get("WE_AUTO_FILL_ISSUE_NO") == "Y" || theSSO.User.EnvSettings.get("WE_AUTO_FILL_ISSUE_NO") == "1") && "fnGetIssueNo" in nsEditor && $.isFunction(nsEditor.fnGetIssueNo)) {
				//if((theSSO.User.EnvSettings.get("WE_AUTO_FILL_ISSUE_NO") == "Y" || theSSO.User.EnvSettings.get("WE_AUTO_FILL_ISSUE_NO") == "1") && "fnGetIssueNoInBatch" in nsEditor && $.isFunction(nsEditor.fnGetIssueNoInBatch)) {
				if(autoFillIssueNo && "fnGetIssueNoInBatch" in nsEditor && $.isFunction(nsEditor.fnGetIssueNoInBatch)) {
					$.when.apply(this, dfds)
					.done(function() {
						if(trgt.length > 0) {
							var x = trgt.length;
							try {
								// theLogger.log("呼叫fnGetIssueNo(" + x + ")回傳:");
								// var res = nsEditor.fnGetIssueNo(x, trgt[0].dm);	// 2016.8.25 增加第2參數dm
								theLogger.log("呼叫fnGetIssueNoInBatch(" + x + ")回傳:");
								var res = nsEditor.fnGetIssueNoInBatch(trgt);	// 2016.8.25 增加第2參數dm
								theLogger.log(res);
								// 2016.8.26 設定各稿件發文字號
								if(res) {
									if("IssueNo_no" in res) {
										if(SSOUtil.typeOf(res.IssueNo_no) == "array") {
											if(res.IssueNo_no.length == x) {	// 回傳支號陣列數與可設定發文字號稿數相符
												theLogger.log("目前公文文號:" + _docObj.docNo);
												for(var i=0; i<res.IssueNo_no.length; i++) {
													try {
														//1130520	Joe		1130222		調整回傳值為Array
														// trgt[i].dm.text("//發文字號/字", res.IssueWord);
														trgt[i].dm.text("//發文字號/字", res.IssueWord[i]);
														// 1100927 Raymond 修正取得發文字號時, 以回傳值的IssueYear為年度, 回傳值的IssueNo為流水號
														//trgt[i].dm.text("//發文字號/文號/年度", _docObj.docNo.substr(0, 3));
														//trgt[i].dm.text("//發文字號/文號/流水號", _docObj.docNo.substr(3, 7));
														//1130520	Joe		1130222		調整回傳值為Array
														// trgt[i].dm.text("//發文字號/文號/年度", res.IssueYear);
														// trgt[i].dm.text("//發文字號/文號/流水號", res.IssueNo);
														trgt[i].dm.text("//發文字號/文號/年度", res.IssueYear[i]);
														trgt[i].dm.text("//發文字號/文號/流水號", res.IssueNo[i]);
														trgt[i].dm.text("//發文字號/文號/支號", res.IssueNo_no[i]);
													}
													catch(e) {
														theLogger.error(e.stack || e.message);
													}
												}
												// 刷新文面
												//$("#aol #leftPart .pages").flip("refresh");
											}
											else if(res.IssueNo_no.length == 0) {	// 回傳支號陣列數為0, 應是不需取支號的機關
												theLogger.log("目前公文文號:" + _docObj.docNo);
												for(var i=0; i<trgt.length; i++) {
													try {
														//1130520	Joe		1130222		調整回傳值為Array
														// trgt[i].dm.text("//發文字號/字", res.IssueWord);
														trgt[i].dm.text("//發文字號/字", res.IssueWord[i]);
														// 1100927 Raymond 修正取得發文字號時, 以回傳值的IssueYear為年度, 回傳值的IssueNo為流水號
														//trgt[i].dm.text("//發文字號/文號/年度", _docObj.docNo.substr(0, 3));
														//trgt[i].dm.text("//發文字號/文號/流水號", _docObj.docNo.substr(3, 7));
														//1130520	Joe		1130222		調整回傳值為Array
														// trgt[i].dm.text("//發文字號/文號/年度", res.IssueYear);
														// trgt[i].dm.text("//發文字號/文號/流水號", res.IssueNo);
														trgt[i].dm.text("//發文字號/文號/年度", res.IssueYear[i]);
														trgt[i].dm.text("//發文字號/文號/流水號", res.IssueNo[i]);
													}
													catch(e) {
														theLogger.error(e.stack || e.message);
													}
												}
												// 刷新文面
												//$("#aol #leftPart .pages").flip("refresh");
											}
											else
												theLogger.error("回傳支號陣列數(" + res.IssueNo_no.length + ")與可設定發文字號稿數(" + x + ")不相符");
										}
										else
											theLogger.error("回傳值的IssueNo_no不是陣列!");
									}
									else
										theLogger.error("回傳格式無IssueNo_no! 無法設定發文支號");
								}
								else
									theLogger.error("無回傳無法設定發文字號");
							}
							catch(e) {
								theLogger.error(e.stack || e.message);
							}
						}
						dfd.resolve();
					});
				}
				else
					dfd.resolve();

				_currMgmt.docNoChanged(requested);	// 通知文稿管理檔變更文號, 文稿管理檔上傳子目錄路徑須更名, 2016.8.26 新增參數標示是否線上取得
				if(_docObj.signType == "E"){	//2017.01.13	Leslie	bug Fix 紙本無參考附件
					_refAttMgmt.setRefAttachsMgmtDirty();	//2017.01.10	Leslie	提供公文要號後，強制重新儲存參考附件管理檔
					
					//1111012	Leslie[1110865]	新增客製化簽閱附件的配套功能
					if (SSO_CONFIG.OrgNickName == "MOCS"){
						_tmpAttMgmt.setTmpAttachsMgmtDirty();
					}
				}
				/* 1090217 Raymond 1090062 取號後要自動批次要發文號, 移至上方處理
				for(var i=0; i<_cachedDM.length; i++) {
					if(_cachedDM[i] !== undefined) {
						_cachedDM[i].setDocNo(_docObj.docNo);	// 立即寫入文號至已載入的文稿, TODO:是否要改成未下載的也要先下載?不然改不到
					}
				}*/
			}
			else
				dfd.resolve();
			// 1100709 Raymond 1100581 改成deferred模式, 以解決尚未下載文稿, 在取號後路徑換了檔案還沒複製的問題
			//return this;
			return dfd.promise();
		},
		getDocNo: function() {              //取得公文文號
			return _docObj.docNo;
		},
		isDocNoRequested: function() {	// 2016.8.26 新增方法回傳公文文號是否是線上取得
			if(_currMgmt) {
				return _currMgmt.isDocNoRequested();
			}
			return true;	// 無可編輯文稿管理檔(一般是唯讀模式下), 一律視為文號不可異動
		},
		getMsgId: function() {              //取得MsgID
			return _docObj.msgId;
		},
		getOwnUserId: function() {
			return _docObj.ownUserId;        // 取得ownUserId
		},
		getOwnUserName: function() {
			if("ownUserName" in _docObj) {  // 取得ownUserName
				return _docObj.ownUserName;
			}
			else if("name" in theSSO.User) {	// 2015.3.19 - 優先使用登入使用者的name
				return theSSO.User.name;
			}
			else {  // 若不存在則須查OrgInfo結構
				var orgNode = SSOUtil.getOrgNode(_docObj.sourceOrgNo);
				if(orgNode) {
					var userInfo = SSOUtil.getOrgUserInfo(orgNode, _docObj.ownOUId, _docObj.ownRoleId, _docObj.ownUserId);
					if(typeof userInfo != "undefined" && "UserName" in userInfo)
						return userInfo.UserName;
					theLogger.error("查詢OrgInfo使用者失敗或無姓名資訊!");
				}
				else
					theLogger.error("找不到'" + _docObj.sourceOrgNo + "'的OrgInfo節點");
			}
		},
		getUserColor: function() {          // 取得當前使用者的追蹤修訂色彩
			// 環境變數取得
			// 1071130 David 1071161 取得使用者PEN COLOR時，若OWN_ROLE_ID無值，依OD99取得
			//var res = theSSO.User.EnvSettings.get(_docObj.ownRoleId + "_PEN_COLOR");
			var EvenRolePenColor = "OD99_PEN_COLOR";
			if(_docObj.ownRoleId != "")
				EvenRolePenColor = _docObj.ownRoleId + "_PEN_COLOR";
			var res = theSSO.User.EnvSettings.get(EvenRolePenColor);
			if(res.length)
				return res;
			return 255 << 16;	// 回傳預設值(藍色)
		},
		
		getEditSN: function() {
			return _currMgmt.getEditSN();
		},
		
		getTCSess: function(sn) {           //取得追蹤修訂階段
			if(typeof sn === "string")
				return _currMgmt.getTCSess(Number(sn));
			return _currMgmt.getTCSess(sn);
		},
		
		/*getAllDrafts: function() {          //取得全部文稿
			return _folioInfo.drafts;
		},*/
		
		getDraftCounts: function() {        //取得文稿總數
			//return _folioInfo.drafts.length;
			if(_docObj.signType == "P") {	// 2016.6.22 支援紙本簽核
				return _currMgmt.getDraftCounts();
			}
			return _signFolder.getDraftCounts();
		},
		
		getDraftName: function(index) {     //取得文稿稿序, index指封裝檔中的序
			if(_docObj.signType == "P") {	// 2016.6.22 支援紙本簽核
				if(index >= 0 && index < _currMgmt.getDraftCounts())
					return _currMgmt.getDraftName(index);
				throw new Error("要求取得第" + index + "個文稿稿序名稱, 超出範圍");
			}
			else if("isRefDoc" in this && this.isRefDoc()) {	// 2016.12.29 參照公文不用找對應文稿, 直接回傳draft物件的name
				if(index < 0 || index >= _signFolder.getDraftCounts())
					throw new Error("要求取得第" + index + "個文稿稿序名稱, 超出範圍");
				var draft = _signFolder.getDraft(index);
				if("fromType" in draft)
					return "來文內容";
				return draft.name;
			}
			// 1090907 Raymond 1090564 信保特殊模式無文稿管理
			else if(_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
				return _signFolder.getDraft(index).name;
			}
			else if(index < 0 || index >= _signFolder.getDraftCounts()) {
				if(index >= 0 && _currMgmt && index < _currMgmt.getDraftCounts())	// 2016.6.17 新增文稿只會記錄在文稿管理檔
					return _currMgmt.getDraftName(index);
				throw new Error("要求取得第" + index + "個文稿稿序名稱, 超出範圍");
			}
			// 1110301 Raymond 1110106 合併1080815, 修正檢索側屜開啟時, 若own流程點有新增文稿暫存時, 會發生AOLProccessData.xml找不到新稿件的GUID而丟出Error的問題
			//return _getMappedDraftName(index);
			return _getMappedDraftName(index) || _signFolder.getDraft(index).name;
		},
		
		getDraftFileName: function(index) { //取得文稿檔名, index指封裝檔中的序
			if(_docObj.signType == "P") {	// 2016.6.22 支援紙本簽核
				if(index >= 0 && index < _currMgmt.getDraftCounts())
					return _currMgmt.getDraftFileName(index);
				throw new Error("要求取得第" + index + "個文稿檔名, 超出範圍");
			}
			else if(index < 0 || index >= _signFolder.getDraftCounts()) {
				if(index >= 0 && _currMgmt && index < _currMgmt.getDraftCounts())	// 2016.6.17 新增文稿只會記錄在文稿管理檔
					return _currMgmt.getDraftFileName(index);
				throw new Error("要求取得第" + index + "個文稿檔名, 超出範圍");
			}
			return _getMappedDraftFileName(index);
		},
		
		// 2016.10.31 新增讀取文別
		getDraftDocType: function(index) {
			if(_docObj.signType == "P") {
				if(index >= 0 && index < _currMgmt.getDraftCounts())
					return _currMgmt.getDraftDocType(index);
				throw new Error("要求取得第" + index + "個文稿文別, 超出範圍");
			}
			else if(index < 0 || index >= _signFolder.getDraftCounts()) {
				if(index >= 0 && _currMgmt && index < _currMgmt.getDraftCounts())	// 新增文稿只會記錄在文稿管理檔
					return _currMgmt.getDraftDocType(index);
				throw new Error("要求取得第" + index + "個文稿文別, 超出範圍");
			}
			var draft = _signFolder.getDraft(index);
			if("fromType" in draft)
				return "來文內容";
			if(draft.name == "來文簽辦")
				return draft.name;
			return draft.docType;
		},
		
		// 2016.4.15 是否為電子來文(1)或來文簽辦(2), 若非(正常文稿)則為回傳0
		isFromDoc: function(index) {
			if(_docObj.signType == "P")	// 2016.6.22 紙本簽核一律回傳0
				return 0;
			
			if(index < 0 || index >= _signFolder.getDraftCounts())
				throw new Error("要求取得第" + index + "個文稿資訊, 超出範圍");
			var draft = _signFolder.getDraft(index);
			if("fromType" in draft) {
				theLogger.log("第" + index + "個文稿是電子來文");
				return 1;
			}
			else if(draft.name == "來文簽辦") {
				theLogger.log("第" + index + "個文稿是來文簽辦");
				return 2;
			}
			theLogger.log("第" + index + "個文稿是正常文稿");
			return 0;
		},
		
		// 1060822 Raymond 1060703 新增取得Draft物件
		getEDraft: function(index) {
			if(index < 0 || index >= _signFolder.getDraftCounts())
				throw new Error("要求取得第" + index + "個文稿資訊, 超出範圍");
			return _signFolder.getDraft(index);
		},
		
		// 1130809 Raymond 1130313 合併1111007(1100394), 新增waitUntilSelXSL參數, 匯入ZIP壓縮檔中的文稿檔, 若要選取套用樣版檔時, 不要提前resolve
		//accquireDraftModel: function(index, cbData) {//取得文稿模型物件, 2016.9.8 新增cbData參數, resolve時傳回
		accquireDraftModel: function(index, cbData, waitUntilSelXSL) {//取得文稿模型物件, 2016.9.8 新增cbData參數, resolve時傳回
			var dfd = $.Deferred();
			if(_docObj.signType == "P") {	// 2016.6.22 支援紙本簽核
				if(index >= 0 && index < _currMgmt.getDraftCounts()) {
					if(_cachedDM[index] == undefined) {
						// 1130809 Raymond 1130313 合併1111007(1100394), 新增waitUntilSelXSL參數, 匯入ZIP壓縮檔中的文稿檔, 若要選取套用樣版檔時, 不要提前resolve
						//_currMgmt.accquireDraftModel(index)
						_currMgmt.accquireDraftModel(index, waitUntilSelXSL)
							.done(function(idx, dm) {
								_cachedDM[index] = dm;
								dm.draftInfo = null;	// 沒有封裝檔對照的文件夾資訊
								dfd.resolve(dm, cbData);	// 2016.9.8 新增cbData參數, resolve時傳回
							})
							.fail(function(idx, errorText) {
								theLogger.error(errorText);
								dfd.reject(errorText, cbData);	// 2016.9.8 新增cbData參數, reject時傳回
							});
					}
					else
						dfd.resolve(_cachedDM[index], cbData);	// 2016.9.8 新增cbData參數, resolve時傳回
					return dfd.promise();
				}

				if(_currMgmt.getDraftCounts() == 0) {
					dfd.reject("本件公文無任何文稿!", cbData);	// 2016.9.8 新增cbData參數, reject時傳回
					return dfd.promise();
				}
				throw new Error("要求取得第" + index + "個文稿模型物件, 超出範圍");
			}
			
			if(index < 0 || index >= _signFolder.getDraftCounts()) {
				if(index >= 0 && _currMgmt && index < _currMgmt.getDraftCounts()) {	// 2016.6.17 新增文稿只會記錄在目前編輯中的文稿管理檔
					if(_cachedDM[index] == undefined) {
						// 1130809 Raymond 1130313 合併1111007(1100394), 新增waitUntilSelXSL參數, 匯入ZIP壓縮檔中的文稿檔, 若要選取套用樣版檔時, 不要提前resolve
						//_currMgmt.accquireDraftModel(index)
						_currMgmt.accquireDraftModel(index, waitUntilSelXSL)
							.done(function(idx, dm) {
								_cachedDM[index] = dm;
								dm.draftInfo = null;	// 沒有封裝檔對照的文件夾資訊
								dfd.resolve(dm, cbData);	// 2016.9.8 新增cbData參數, resolve時傳回
							})
							.fail(function(idx, errorText) {
								theLogger.error(errorText);
								dfd.reject(errorText, cbData);	// 2016.9.8 新增cbData參數, reject時傳回
							});
					}
					else
						dfd.resolve(_cachedDM[index], cbData);	// 2016.9.8 新增cbData參數, resolve時傳回
					return dfd.promise();
				}

				// 1121116 Raymond 航港局彙整表序319 修正1110725併陳子文封裝檔有文稿, 但在文號-00-99的流程點刪除了所有文稿的情況下, 因_currMgmt是undefined導致發生錯誤而出現轉圈圈的問題
				//if(_currMgmt.getDraftCounts() == 0) {
				if((!!_currMgmt && _currMgmt.getDraftCounts() == 0) || _signFolder.getDraftCounts() == 0) {
					dfd.reject("本件公文無任何文稿!", cbData);	// 2016.9.8 新增cbData參數, reject時傳回
					return dfd.promise();
				}
				throw new Error("要求取得第" + index + "個文稿模型物件, 超出範圍");
			}
			
			var dfd = $.Deferred();
			if(_cachedDM[index] == undefined) {
				theLogger.log("要求取得第" + index + "個文稿模型物件, 初始化...");
				
				var draft = _signFolder.getDraft(index);
				if("fromType" in draft) {
					theLogger.log("點擊'電子來文'頁籤");
					dfd.resolve(null, cbData);	// 2016.9.8 新增cbData參數, resolve時傳回
				}
				// 1100512 Raymond 1090821 外會公文的頁面記錄方式為"單層式", 要回應無DM
				else if(!!draft.draftPages && draft.draftPages.method == "單層式") {
					theLogger.log("點擊'" + draft.name + "'頁籤(單層式頁面)");
					dfd.resolve(null, cbData);
				}
				else if(draft.name == "來文簽辦") {	// 2016.1.15 來文簽辦比照電子來文
					theLogger.log("點擊'來文簽辦'頁籤");
					dfd.resolve(null, cbData);	// 2016.9.8 新增cbData參數, resolve時傳回
				}
				else {
					try {	// 2015.12.29 加try-catch
						var guid = _lookupDraftGUID(draft.id);
						// 2016.2.1 文稿管理檔改成複數, KEY為子目錄名稱
						var found = false;
						for(dir in _draftMgmts) {
							if(guid != null)	// 2016.8.17 調閱線上簽核公文, 可能無AOLProccessData.xml
								var idx = _draftMgmts[dir].getDraftIndex(guid);	// 改用getDraftIndex(GUID)來確定該文稿是否存在於這個文稿管理檔中
							else {
								theLogger.warn("文稿GUID=" + guid + ", 改以指定索引值(" + index + ")為文稿管理檔中的稿序取得文稿模型物件");
								var idx = index;
							}
							if(idx >= 0) {
								var that = this;	// 1110302 Raymond 1110106 新增that給readOnly判斷用
								// 1130809 Raymond 1130313 合併1111007(1100394), 新增waitUntilSelXSL參數, 匯入ZIP壓縮檔中的文稿檔, 若要選取套用樣版檔時, 不要提前resolve
								//_draftMgmts[dir].accquireDraftModel(idx)
								_draftMgmts[dir].accquireDraftModel(idx, waitUntilSelXSL)
									.done(function(idx, dm) {
										_cachedDM[index] = dm;
										dm.draftInfo = draft;   // 第一次要求文稿模型時建立與封裝檔文稿物件的關聯
										if(draft.dirty()) {	// 2017.2.15 第一次要求文稿模型時, 同步設定為目前暫存檔中讀入的已異動狀態
											// 1110301 Raymond 1110106 合併1080815, 修正從檢索側屜開啟own流程點新增文稿暫存的公文時, 會出現此文稿禁止異動內容的Error的問題
											if(that.readOnly())
												theLogger.log("第一次要求文稿模型但唯讀(例:從檢索側屜開啟)時, 忽略同步設定從目前暫存檔中讀入的已異動狀態");
											else {
												theLogger.log("第一次要求文稿模型時, 同步設定為目前暫存檔中讀入的已異動狀態");
												try {	// 1070612 Raymond 1070197 draft因為實際頁數與封裝不一致而被判定dirty時
													//dm.dirty(true);
													dm.dirty(true, false);	// 1120915 Raymond 1120574 新增傳入第2個參數false, 表示不要記錄本次異動時間, 以免新增稿件暫存關閉後再開啟, 未異動內容情況下直接關閉會跳出詢問是否儲存問題
												}catch(e) {
													theLogger.error(e.stack);
												}
											}
										}
										dfd.resolve(dm, cbData);	// 2016.9.8 新增cbData參數, resolve時傳回
									})
									.fail(function(idx, errorText) {
										theLogger.error(errorText);	// 2016.2.26 新增寫LOG資訊
										dfd.reject(errorText, cbData);	// 2016.9.8 新增cbData參數, reject時傳回
									});
								found = true;
								break;
							}
						}

						if(!found) {	// 都找不到才回傳錯誤
							theLogger.error("找不到第" + index + "個文稿(GUID:" + guid + ")");
							dfd.reject("找不到第" + index + "個文稿(GUID:" + guid + ")", cbData);	// 2016.9.8 新增cbData參數, reject時傳回
						}
					}
					catch(e) {
						theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
						dfd.reject(e.message, cbData);	// 2016.9.8 新增cbData參數, reject時傳回
					}
				}
			}
			else {
				dfd.resolve(_cachedDM[index], cbData);	// 2016.9.8 新增cbData參數, resolve時傳回
			}
			return dfd.promise();
		},
		
		getDraftAttCounts: function(index) {
			if(_docObj.signType == "P") {	// 2016.6.22 支援紙本簽核
				if(index >= 0 && index < _currMgmt.getDraftCounts())
					return _currMgmt.getDraftAttCounts(index);
				throw new Error("要求取得第" + index + "個文稿附件數量, 超出範圍");
			}
			if(index < 0 || index >= _signFolder.getDraftCounts())
				throw new Error("要求取得第" + index + "個文稿附件數量, 超出範圍");
			return _signFolder.getAttCounts(index);
		},
		
		getDraftAttName: function(index, i) {
			if(_docObj.signType == "P") {	// 2016.6.22 支援紙本簽核
				if(index >= 0 && index < _currMgmt.getDraftCounts())
					return _currMgmt.getDraftAttName(index, i);
				throw new Error("要求取得第" + index + "個文稿的附件, 超出範圍");
			}
			if(index < 0 || index >= _signFolder.getDraftCounts())
				throw new Error("要求取得第" + index + "個文稿稿序, 超出範圍");
			if(i < 0 || i >= _signFolder.getAttCounts(index))
				throw new Error("要求取得第" + index + "個文稿的第" + i + "個附件名稱, 超出範圍");
			// 1120314 Raymond 1111133 新增判斷若是來文附件, 則先從文稿管理檔檢查是否有重新命名過來文附件名稱, 有則以重新命名過的名稱回傳
			if(this.isFromDoc(index)) {
				var renamed = this.getFromDocAttName(i);
				if(!!renamed)
					return renamed;
			}
			var att = _signFolder.getAttachment(index, i);
			
			// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱，啟用時，由文稿取得自訂附件名稱
			if(_showCustomName){
				var res = _getMappedDraftIndexAndMgmt(index);
				if(!!res) {
					try {
						if(res.dmgt.getDraftAttName(res.idx, i))
							return res.dmgt.getDraftAttName(res.idx, i);
					}
					catch(e) {
						theLogger.log("取得第"+index+"文稿附件自訂名稱時異常："+e.message);
					}
				}
			}
			
			return att.name.length?att.name:"附件"+(i+1);	// 2015.12.1 沒設附件名稱時, 改用"附件N"標示
		},
		
		getDraftAttFileName: function(index, i) {	// 2015.12.10 新增取附件電子檔路徑
			if(_docObj.signType == "P") {	// 2016.6.22 支援紙本簽核
				if(index >= 0 && index < _currMgmt.getDraftCounts())
					return _currMgmt.getDraftAttFileName(index, i);
				throw new Error("要求取得第" + index + "個文稿的附件檔名, 超出範圍");
			}
			if(index < 0 || index >= _signFolder.getDraftCounts())
				throw new Error("要求取得第" + index + "個文稿稿序, 超出範圍");
			if(i < 0 || i >= _signFolder.getAttCounts(index))
				throw new Error("要求取得第" + index + "個文稿的第" + i + "個附件名稱, 超出範圍");
			var att = _signFolder.getAttachment(index, i);
			if(!("fileRef" in att))
				throw new Error("封裝檔未記錄第" + index + "個文稿的第" + i + "個附件電子檔路徑");
			return att.fileRef.name;
		},
		
		getDraftAttOrigFileName: function(index, i) {	// 2016.7.12 新增取附件原始電子檔路徑
			if(_docObj.signType == "P") {	// 2016.6.22 支援紙本簽核
				if(index >= 0 && index < _currMgmt.getDraftCounts())
					return _currMgmt.getDraftAttOrigFileName(index, i);
				throw new Error("要求取得第" + index + "個文稿的原始附件檔名, 超出範圍");
			}
			if(index < 0 || index >= _signFolder.getDraftCounts())
				throw new Error("要求取得第" + index + "個文稿稿序, 超出範圍");
			if(i < 0 || i >= _signFolder.getAttCounts(index))
				throw new Error("要求取得第" + index + "個文稿的第" + i + "個附件名稱, 超出範圍");
			var att = _signFolder.getAttachment(index, i);
			if(!("fileRef" in att))
				throw new Error("封裝檔未記錄第" + index + "個文稿的第" + i + "個附件電子檔路徑");
			if("origFileName" in att.fileRef)	// 2016.9.7 若是新加入的附件會有origFileName
				return att.fileRef.origFileName;
			return att.fileRef.name;
		},
		//1070129	Leslie[1061274]	增加可取得附件摘要資訊
		getDraftAttDesc: function(index, i){
			// 1070613 Raymond 1070197 要同時取得index的文稿所屬的DraftMgmt及idx才能找到對應的附件摘要, 否則在會辦的DraftMgmt中必定找不到主辦文稿的附件, 反之亦然
			/*if(_currMgmt){
				if(index >= 0 && index < _currMgmt.getDraftCounts())	//無論紙本、線上，一律於文稿管理檔取得附件摘要
					return _currMgmt.getDraftAttDesc(index,i);
			}
			//1070205	Leslie	[1061274_版更後退修]唯讀模式依現行邏輯無設定_currMgmt，故改為取得_draftMgmts[dir]方式判斷
			else if(typeof dir != "undefined" && dir in _draftMgmts){	//1070213	Leslie	[1061274)版更後退修]	系統初次開啟來文公文(未開啟其他任何公文)時，dir可能仍未初始化
				var objMgmt = _draftMgmts[dir];
				// 1070321 Raymond 歷史檢視不會載入文稿管理檔, 也不會因為切換不同歷史流程開啟對應的文號-00-01、02等子目錄, 故以try-catch迴避Exception
				try {
				if(index >= 0 && index < objMgmt.getDraftCounts()){
					return objMgmt.getDraftAttDesc(index,i);
				}
				}
				catch(e) {
					theLogger.warn(e.message);
					return "";
				}
			}
			//1070205	Leslie	[1061274_版更後退修]來文附件改取附件檔名資訊，直接引用原有函式
			//throw new Error("要求取得第" + index + "個文稿的附件摘要, 超出範圍");
			//1070206	Leslie	[1061274_版更後退修]紙本來文掃描，走線上簽核時，附件無原始檔名
			if(index < 0 || index >= _signFolder.getDraftCounts())
				throw new Error("要求取得第" + index + "個文稿稿序, 超出範圍");
			if(i < 0 || i >= _signFolder.getAttCounts(index))
				throw new Error("要求取得第" + index + "個文稿的第" + i + "個附件名稱, 超出範圍");
			var att = _signFolder.getAttachment(index, i);
			if(!("fileRef" in att))
				throw new Error("封裝檔未記錄第" + index + "個文稿的第" + i + "個附件電子檔路徑");
			if(att.fileRef && "name" in att.fileRef)
				return att.fileRef.name;
			else
				return "";	//紙本來文的附件掃描，無原始檔案名
			//	return this.getDraftAttFileName(index, i);*/
			if(_docObj.signType == "P") {	// 紙本只有一個DraftMgmt
				if(!!_currMgmt)
					return _currMgmt.getDraftAttDesc(index, i);
				return "";	// 無_currMgmt的紙本? 不會吧...
			}
			if(this.isFromDoc(index) > 0) {	// 電子來文、來文簽辦都沒有附件摘要
				return "";
			}
			if(this.isExorgDraft(index) > 0) {	// 1100512 Raymond 1090821 外會公文文稿沒有附件摘要
				return "";
			}
			var res = _getMappedDraftIndexAndMgmt(index);
			if(!!res) {	// 1070926 Raymond 歷史檢視不會切換不同歷史流程就開啟對應的文號-00-01、02等子目錄, 故以try-catch迴避Exception
				try {
					return res.dmgt.getDraftAttDesc(res.idx, i);
				}
				catch(e) {
					return "";
				}
			}
			//1091201	Leslie[1090888]	新增於信保PDF匯入時，附件頁籤的說明，改由<附件類型>取得
			if (SSO_CONFIG.OrgNickName == "SMEG"){
				if("ODWDCM" in _docObj && "DRAFT_SOURCE_TYPE" in _docObj.ODWDCM && _docObj.ODWDCM.DRAFT_SOURCE_TYPE == "2"){
					if(index < 0 || index >= _signFolder.getDraftCounts())
						throw new Error("要求取得第" + index + "個文稿稿序, 超出範圍");
					if(i < 0 || i >= _signFolder.getAttCounts(index))
						throw new Error("要求取得第" + index + "個文稿的第" + i + "個附件名稱, 超出範圍");
					var att = _signFolder.getAttachment(index, i);
					return att.attType;
				}
			}
			return "";
		},
		
		init: function(docObj, options) {   //初始化
			var t0 = new Date();	// 2015.12.29 for 測試效能
			theLogger.log(docObj);
			_docObj = docObj;
			if(_docObj.isDraft)	// 2016.11.11 草稿及退文(記錄在封裝檔)預設為不保留簽署物件
				_reserveSO = false;
			//2016.9.19	Leslie	增加處理disableSave相關邏輯
			//theLogger.log("開啟公文(msgId:'" + docObj.msgId + "', docNo:'" + docObj.docNo + "', fileIOWS:'" + docObj.fileIOWS + "', fileStoragePath:'" + docObj.fileStoragePath + "', fileSubDir:'" + docObj.fileSubDir + ", readOnly:'" + options.readOnly + ", hideODC010:'" + options.hideODC010 + ", isRefDoc:'" + options.isRefDoc + ", buttonF:'" + options.buttonF + "', new_draft_from_tmpl:'" + localStorage['new_draft_from_tmpl'] + "')...");
			theLogger.log("開啟公文(msgId:'" + docObj.msgId + "', docNo:'" + docObj.docNo + "', fileIOWS:'" + docObj.fileIOWS + "', fileStoragePath:'" + docObj.fileStoragePath + "', fileSubDir:'" + docObj.fileSubDir + ", readOnly:'" + options.readOnly + ", hideODC010:'" + options.hideODC010 + ", disableSave:'" + options.disableSave + ", isRefDoc:'" + options.isRefDoc + ", buttonF:'" + options.buttonF + "', new_draft_from_tmpl:'" + localStorage['new_draft_from_tmpl'] + "')...");
			this.fileIOWS = docObj.fileIOWS;
			if(docObj.fileStoragePath.length && docObj.fileStoragePath[docObj.fileStoragePath.length-1] == '\\')	// 2016.1.15 可能尾字已有反斜線
				this.subDirPath = docObj.fileStoragePath + docObj.fileSubDir;
			else
				this.subDirPath = docObj.fileStoragePath + "\\" + docObj.fileSubDir;    // 線上簽核公文子目錄
			console.log("開啟公文('" + this.subDirPath + "')...");
			var _readOnly = false;	// 2016.7.1 新增從localStorage['aol_readonly_mode']讀取唯讀模式設定, 未設定則視為可編輯, 2016.8.16 改為用參數傳遞
			if("readOnly" in options) {
				theLogger.log("\treadOnly: " + options.readOnly);
				if(SSOUtil.typeOf(options.readOnly) == "string")
					_readOnly = options.readOnly == "true";
				else if(SSOUtil.typeOf(options.readOnly) == "boolean")
					_readOnly = options.readOnly;
				else
					theLogger.error("不支援指定readOnly'" + options.readOnly + "'(" + SSOUtil.typeOf(options.readOnly) + ")");
			}
			
			//2016.9.19	Leslie	增加處理disableSave相關邏輯
			var _disableSave = false;
			if("disableSave" in options) {
				theLogger.log("\disableSave: " + options.disableSave);
				if(SSOUtil.typeOf(options.disableSave) == "string")
					_disableSave = options.disableSave == "true";
				else if(SSOUtil.typeOf(options.disableSave) == "boolean")
					_disableSave = options.disableSave;
				else
					theLogger.error("不支援指定disableSave'" + options.disableSave + "'(" + SSOUtil.typeOf(options.disableSave) + ")");
			}
			this.disableSave = function(){
				return _disableSave;
			}
			//2016.9.19	Leslie	增加處理disableSave相關邏輯	--END--
			
			this.readOnly = function() {	// 2015.9.17 新增唯讀模式查詢
				return _readOnly;
			}
			
			var _isRefDoc = false;	// 2016.8.8 新增參照旗標
			if("isRefDoc" in options) {
				theLogger.log("\tisRefDoc: " + options.isRefDoc);
				_isRefDoc = options.isRefDoc;
			}
			this.isRefDoc = function() {
				return _isRefDoc;
			}
			var _hideODC010 = false;	// 2016.8.12 新增是否隱藏基資頁籤
			if("hideODC010" in options) {
				theLogger.log("\thideODC010: " + options.hideODC010);
				if(SSOUtil.typeOf(options.hideODC010) == "string")	// 2016.8.16 typo
					_hideODC010 = options.hideODC010 == "true";
				else if(SSOUtil.typeOf(options.hideODC010) == "boolean")
					_hideODC010 = options.hideODC010;
			}
			this.hideODC010 = function() {
				return _hideODC010;
			}
			var _isRefOfCurrFolio = false;	// 2016.8.18 新增是否為主文的歷史檢視複本
			if("isRefOfCurrFolio" in options) {
				theLogger.log("\tisRefOfCurrFolio: " + options.isRefOfCurrFolio);
				_isRefOfCurrFolio = options.isRefOfCurrFolio;
			}
			this.isRefOfCurrFolio = function() {
				return _isRefOfCurrFolio;
			}
			var _enableEdit = !_readOnly;	// 2016.8.26 新增是否允許編輯內文
			var _enableChangePpr = false;	// 2016.10.6 新增是否允許轉紙本
			var _enableDelDoc = false;		// 2016.11.16 新增是否允許刪除本件公文
			if("buttonF" in options && typeof options.buttonF === "string") {
				_enableEdit = options.buttonF.indexOf("R") >= 0;
				theLogger.log("\tbuttonF: " + options.buttonF + "(" + (_enableEdit?"":"不") + "允許編輯)");
				
				// 2016.10.6 新增是否允許轉紙本
				_enableChangePpr = options.buttonF.indexOf("O") >= 0;
				theLogger.log("\tbuttonF: " + options.buttonF + "(" + (_enableChangePpr?"":"不") + "允許轉紙本)");
				
				// 2016.11.16 新增是否刪除本件公文
				_enableDelDoc = options.buttonF.indexOf("D") >= 0;
				theLogger.log("\tbuttonF: " + options.buttonF + "(" + (_enableDelDoc?"":"不") + "允許刪除本件公文)");
			}
			this.enableEdit = function() {
				return _enableEdit;
			}
			this.enableChangePpr = function() {	// 2016.10.6 新增是否允許轉紙本
				return _enableChangePpr;
			}
			this.enableDelDoc = function() {	// 2016.10.6 新增是否允許刪除本件公文
				if(!_enableDelDoc)
					return false;
				if(theSSO.User.EnvSettings.get("WE_DISABLE_DELDOC") == "Y" && !!_currMgmt && _currMgmt.isDocNoRequested())	// 2016.12.15 新增鐵工局客製需求線上取號後不可刪除公文
					return 2;	// 回傳顯示選單項目但Disable
				return true;
			}
			
			// 1100901 Raymond 1100750 新增僅顯示來文內容選項
			var _onlyFromDoc = false;
			if("onlyFromDoc" in options) {
				theLogger.log("\onlyFromDoc: " + options.onlyFromDoc);
				if(SSOUtil.typeOf(options.onlyFromDoc) == "string")
					_onlyFromDoc = options.onlyFromDoc == "true";
				else if(SSOUtil.typeOf(options.onlyFromDoc) == "boolean")
					_onlyFromDoc = options.onlyFromDoc;
				else
					theLogger.error("不支援指定onlyFromDoc'" + options.onlyFromDoc + "'(" + SSOUtil.typeOf(options.onlyFromDoc) + ")");
			}
			this.onlyFromDoc = function() {
				return _onlyFromDoc;
			}
			
			// 2016.9.19 密件控管功能
			var _needSecControl = false;
			if(_enableEdit && docObj.signType == "P" && docObj.isDraft) {	// 是紙本草稿才要進一步檢核是否啟用密件控管功能
				var strCRule = theSSO.User.EnvSettings.get("SET_PDRAFT_SEC_BY_CRULE");
				var crule = strCRule.split("|");
				if(crule.length > 1) {
					if(crule[0] == "Y") {
						if(crule[1] == "")
							theLogger.log("SET_PDRAFT_SEC_BY_CRULE('" + strCRule + "')第1碼為'Y', 第2碼為空, 不需要密件控管");
						else {	// 用MsgID查詢
							theWebServices.getPDraftCRuleNo(docObj.msgId)
								.done(function(retVal) {
									if(retVal == crule[1]) {
										theLogger.log("SET_PDRAFT_SEC_BY_CRULE('" + strCRule + "')第1碼為'Y', 第2碼不為空, 且與GetPDraftCRuleNo回傳值(" + retVal + ")相符, 需要密件控管");
										_needSecControl = true;
										
										// 1071207 Raymond 1071108 修正密件控管功能不要異動基資
										// 新增設定ODWMSG.SECRETE為2
										//theAOL.docObj.set2("aol", "ODWMSG", {"SECRETE": "2"});	// 2016.11.2 修改actionId參數為aol
									}
									else {
										theLogger.log("SET_PDRAFT_SEC_BY_CRULE('" + strCRule + "')第1碼為'Y', 第2碼不為空, 但與GetPDraftCRuleNo回傳值(" + retVal + ")不相符, 不需要密件控管");
									}
								})
								.fail(function(errorText) {
									theLogger.error("呼叫GetPDraftCRuleNo發生錯誤:" + errorText);
								});
						}
					}
					else
						theLogger.log("SET_PDRAFT_SEC_BY_CRULE('" + strCRule + "')第1碼非為'Y', 不需要密件控管");
				}
				else
					theLogger.log("SET_PDRAFT_SEC_BY_CRULE('" + strCRule + "')格式不正確, 不需要密件控管");
			}
			this.needSecControl = function() {
				return _needSecControl;
			}
			
			// 2016.8.5 新增下載儲存檢核設定.XML
			if(!_readOnly) {
				thePublicRsrc.getSaveCheckXML().done(function(xml) {
					theAOL.saveCheckFields = [];
					$(xml.documentElement).find("檢核設定").each(function(idx, nd) {
						var setting = {};
						var $field = $(nd).find("欄位");
						if($field.length) {
							//1060825	Leslie[1060515]	高港警新增需求，針對各式稿件，可設定儲存前檢核，修改二代專用的欄位檢核設定格式
							/*if($field.attr("type") == "XPath")
								setting.xpath = $field.text();
							else
								theLogger.error("不支援非XPath類型的欄位");*/
							if($field.attr("type") == "JQuery"){
								setting.xpath = $field.text();
								if($field.attr("forDocType") != undefined && $field.attr("forDocType") != "")
									setting.forDocType = $field.attr("forDocType").split(';');
								else
									setting.forDocType = "";	//此檢核條件適用所有稿件
								
								if($field.attr("inValidDefault") != undefined && $field.attr("inValidDefault") != "")
									setting.inValidDefault = $field.attr("inValidDefault");
								else
									setting.inValidDefault = "";
								
								//1131115	Leslie[1131142]	[Merge-1080812]新增針對屬性的欄位檢核邏輯
								if($field.attr("attr") != undefined && $field.attr("attr") != "")
									setting.attr = $field.attr("attr");
								
								//1131115	Leslie[1131142]	[Merge-1081118]	儲存前檢核功能，新增有公文文號才啟用的檢核條件
								setting.enableWithDocNo = false;
								if($field.attr("enableWithDocNo") != undefined && $field.attr("enableWithDocNo") != "")
									setting.enableWithDocNo = ($field.attr("enableWithDocNo").toUpperCase() == "TRUE");
							}
							else
								theLogger.error("不支援非JQuery類型的查詢格式");
						}
						var $allow = $(nd).find("允許儲存");
						if($allow.length) {
							if($allow.text() == "false")
								setting.allowSave = false;
							else
								setting.allowSave = true;
						}
						var $msg = $(nd).find("訊息");
						if($msg.length) {
							setting.msg = $msg.text();
						}
						theAOL.saveCheckFields.push(setting);
					});
				});
			}
			
			// 1090227 Raymond 1080751 合併內政部1070381若公文由AKI800調閱要從uiParam取得UNV檔物件
			if("uiParam" in _docObj && "unv_obj" in _docObj.uiParam) {
				theLogger.warn("此公文為AKI800調閱公文");
				_unvObj = _docObj.uiParam.unv_obj;
			}
			
			var that = this;
			
			// 1090828 Raymond 1090529 若強制浮水印, 則初始化浮水印設定及下載浮水印影像
			if(!!_unvObj &&
				((typeof _unvObj.UnvRoot.ForceWaterMark === "string" && _unvObj.UnvRoot.ForceWaterMark.match(/true/i)) ||
				((typeof _unvObj.UnvRoot.ForceDisplayWaterMark === "string" && _unvObj.UnvRoot.ForceDisplayWaterMark.match(/true/i))))) {
				_getForceWaterMarkSettings(localStorage.Artifact, _unvObj.UnvRoot.USER_ORGNO, true)
				.done(function(rslt) {
					var _dfdSub = $.Deferred();

					if (rslt.success && rslt.jsonObj!==null) {
						that.fwmSettings = rslt.jsonObj;	// TODO: 可能要改到theAOL底下&考慮多機關環境
					}

					// get watermark image
					var filePathname = rslt.jsonObj.ImageFileName;
					if(!filePathname || filePathname.length == 0)
						theLogger.warn("浮水印設定檔未定義浮水印影像檔檔名路徑");
					var idxLastSlash = filePathname.lastIndexOf('\\');
					var wmfilePath='', wmfileName='';
					if (idxLastSlash!==-1 && idxLastSlash<(filePathname.length-2)) {
						wmfilePath = filePathname.substr(0, idxLastSlash);
						wmfileName = filePathname.substr(idxLastSlash+1);
					}

					if (wmfilePath.length && wmfileName.length) {
						_getForceWaterMarkImage(localStorage.Artifact, SSO_CONFIG.getWSUrl('fileiows'), wmfilePath, wmfileName)
						.done(function(rslt){
							if (typeof rslt.imgStr=='string' && rslt.imgStr.length) {
								that.fwmPath = rslt.imgStr;	// TODO: 可能要改到theAOL底下&考慮多機關環境
							}
						})
						.fail(function(rslt){
							theLogger.error(rslt.errMsg);
						})
					}
				})
				.fail(function(rslt) {
					theLogger.error(rslt.errMsg);
				});
			}
			
			// 1100223 Raymond 1090864 若機關暱稱為'HAC'(客委會)且資料夾符合系統參數設定, 則預先下載客語難用字表
			if(_enableEdit && SSO_CONFIG.OrgNickName == "HAC" && window._difficultWords.length == 0) {	// 允許異動內文的流程點, 才有警告的意義
				var checkDiffcultWordsFolder = theSSO.User.SystemSets.get("WE_CHECK_DIFFICULT_WORDS_FOLDER");
				if(checkDiffcultWordsFolder.length > 0) {
					var checkFolder = ';' + checkDiffcultWordsFolder + ';';
					var docFolder = ';' + _docObj.folder + '-' + _docObj.subfolder + ';';
					if(checkFolder.indexOf(docFolder) >= 0) {
						theLogger.warn("資料夾符合系統參數「WE_CHECK_DIFFICULT_WORDS_FOLDER」設定'" + checkDiffcultWordsFolder + "', 預先下載客語難用字資源檔");
						var foundRsrc = null;	// 搜尋'客語難用字'資源檔
						thePublicRsrc.enumDirs("其他", function(dir) {	// 在'其他'子目錄下
							for(var i=0; i<dir.children.length; i++) {
								if(dir.children[i].type == 1) {	// RsrcFile
									var nm = dir.children[i].name;
									if(nm == "客語難用字") {
										theLogger.log("找到'客語難用字'的資源檔'" + dir.children[i].remote.path + "'");
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
										theLogger.log("下載客語難用字資源檔成功! 建立檢核表");
										theLogger.log(txt);
										window._difficultWords = txt.split('\r\n');
									}
								})
								.fail(function(errorText) {
									theLogger.error("下載客語難用字資源檔失敗! " + errorText)
								});
						}
						else
							theLogger.warn("找不到'客語難用字'的資源檔, 無法建立客語難用字檢核表");
					}
					else
						theLogger.warn("資料夾不符合系統參數「WE_CHECK_DIFFICULT_WORDS_FOLDER」設定'" + checkDiffcultWordsFolder + "', 不須下載客語難用字資源檔");
				}
			}
			
			// 1121003 Raymond 1120775 新增取得uiState, 用於判斷是否有隱藏傳送工具列, 若有隱藏傳送工具列(buttonF沒有"T"), 即使MenuRule有設定非唯讀且可編輯內文, 也不要用自動備份檔回復
			// 1121221	Leslie[領務局-卡驗收序23]	參照公文無需設定UI
			// var uiState = window._getUIStatus(_docObj, _docObj.uiParam);
			var uiState = (!_isRefDoc)?window._getUIStatus(_docObj, _docObj.uiParam):{};
			// 2016.9.22 新增檢查是否有自動備份的暫存檔, 有的話表示前一次未正常關閉, 要提示使用者是否從暫存檔回復資料
			if(!_readOnly &&
				("autoBackupIOWS" in SSO_CONFIG) && typeof SSO_CONFIG.autoBackupIOWS === "string" && SSO_CONFIG.autoBackupIOWS.length > 0 &&
				//1080117	Joe		1080049		弱掃修正Hardcoded Absolute Path
				// ("autoBackupRootPath" in SSO_CONFIG) && typeof SSO_CONFIG.autoBackupRootPath === "string" && SSO_CONFIG.autoBackupRootPath.length > 0 &&
				 typeof theSSO.User.SystemSets.get("WORK_PATH") === "string" && theSSO.User.SystemSets.get("WORK_PATH").length > 0 &&
				(!!theUserInfo && "UserID" in theUserInfo && theUserInfo.UserID.length > 0) &&	// 2016.12.22 自動備份子目錄改為theUserInfo.UserID
				_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2" &&	// 1090910 Raymond 1090564 信保特殊模式不要用自動備份檔回復
				uiState.hiddenSubmitPanel != true &&	// 1121003 Raymond 1120775 新增判斷是否有隱藏傳送工具列, 若有隱藏傳送工具列(buttonF沒有"T"), 即使MenuRule有設定非唯讀且可編輯內文, 也不要用自動備份檔回復
				(!theSSO || theSSO.offlineMode != true)) {	// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式不自動備份
				
				var bkwfio = new WebFileIO(SSO_CONFIG.autoBackupIOWS);
				
				//1080117	Joe		1080049		弱掃修正Hardcoded Absolute Path
				// var bkDirPath = SSO_CONFIG.autoBackupRootPath;
				var bkDirPath = theSSO.User.SystemSets.get("WORK_PATH");
				if(bkDirPath[bkDirPath.length - 1] != "\\")
					bkDirPath += "\\";
				// 1071222 Raymond 備份目錄改為文號+msgId, 避免主辦流程點未正常關閉公文但傳送成功了, 到退回或結案未歸檔等msgId已變的流程點, 因跳出警告訊息, 而被使用者誤回復的問題
				//bkDirPath += _docObj.sourceOrgNo + "\\" + theUserInfo.UserID + "\\" + ((_docObj.isDraft)?_docObj.msgId:_docObj.docNo);	// 2016.9.22 草稿一律用msgId, 代理公文一律用原承辦的帳號子目錄, 2016.12.22 _docObj.ICUserId->theUserInfo.UserID區分不同流程點要自動備份在各自的子目錄
				bkDirPath += _docObj.sourceOrgNo + "\\" + theUserInfo.UserID + "\\" + ((_docObj.isDraft)?_docObj.msgId:(_docObj.docNo + "_" + _docObj.msgId));	// 2016.9.22 草稿一律用msgId, 代理公文一律用原承辦的帳號子目錄, 2016.12.22 _docObj.ICUserId->theUserInfo.UserID區分不同流程點要自動備份在各自的子目錄
				theLogger.warn("自動備份目錄為'" + bkDirPath + "'");
				
				// 1100510 Raymond 1090634 修正紙本公文因不會寫出SignWork.xml, 故偵測不到有前次自動備份檔案而無法回復的問題
				//bkwfio.download(bkDirPath, "SignWork.xml", {
				var prevBkFileName = "SignWork.xml";
				if(docObj.signType == "P") {
					prevBkFileName = ((docObj.docNo.length > 0)?(docObj.docNo + "-"):"") + "00-99\\DraftMgmt.xml";
					theLogger.warn("紙本公文改偵測自動備分目錄下的'" + prevBkFileName + "'是否存在");
				}
				bkwfio.download(bkDirPath, prevBkFileName, {
					success: function() {
						// 下載成功表示有暫存檔, 詢問使用者是否從暫存檔回復
						var param = {title: "回復備份檔",
							message: "前一次未正常關閉，是否從自動備份的暫存檔回復？",
							buttons: [
								{	name: "是",
									action: function() {
										theLogger.log("使用者選擇從暫存檔回復!");
										bkwfio.copy(bkDirPath, "", that.subDirPath, "", {toWebFileIOUrl: that.fileIOWS, delSource: true, overWrite: true, restore: true})	// 2016.9.26 新增restore參數, true表示要連子目錄一起搬移, 2016.10.11 delSource設為true, overWrite設為true
											.done(function() {
												theLogger.log("從暫存目錄回復(複製)檔案至公文目錄成功!");
												doInit();
											})
											.fail(function(err) {
												theLogger.error("從暫存目錄回復(複製)檔案至公文目錄失敗! " + err.errCode + ":" + err.errMsg);
												alert("從暫存目錄回復(複製)檔案至公文目錄失敗!\n\n" + err.errCode + ":" + err.errMsg);	// 2016.10.11 FIX
											});
									}
								},
								{	name: "否，清除暫存檔",
									action: function() {
										theLogger.log("使用者選擇不要回復!");
										bkwfio.del([{filePath: bkDirPath, fileName: ""}]);
										doInit();
									}
								}
							]
						};
						$.confirm(param);
					},
					error: function() {
						// 下載失敗表示無暫存檔, 繼續載入原公文
						doInit();
					}
				});
			}
			else	// 唯讀或未設定自動備份參數則不檢查, 直接載入原公文
				doInit();
			
			// 2016.9.22 配合新增自動備份回復功能, 將載入公文包成一個function
			function doInit() {
				// 2016.9.20 非唯讀才繼續判斷是否啟用自動備份功能
				if(!_readOnly) {
					// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式不自動備份
					if(!!theSSO && theSSO.offlineMode == true)
						that.applyAutoBackup({enable: false, period: 5});
					else
					if("autoBackupSetting" in localStorage && localStorage['autoBackupSetting'].length > 0) {	// 恢復前次儲存的自動備份設定
						that.applyAutoBackup(JSON.parse(localStorage['autoBackupSetting']));
					}
					else if("autoBackupDefaultSetting" in SSO_CONFIG && SSO_CONFIG.autoBackupDefaultSetting.length > 0) {	// 依預設值設定
						var par = SSO_CONFIG.autoBackupDefaultSetting.split("|");
						that.applyAutoBackup({enable: par[0] == "Y", period: parseInt(par[1])});
					}
					else // 否則停用
						that.applyAutoBackup({enable: false, period: 5});
				}
				
				// 1130814 Raymond 1130313 新增離線模式先下載"匯出文字檔.XSL", 因為判斷指令列按鈕是否顯示的架構只能以同步方式下載檔案, 但離線模式下只能以非同步方式才能下載
				if("exTXT" in nsEditor) {
					// 匯出TXT之XSL已下載
				}
				else {
					var exTXT;
					thePublicRsrc.enumDirs("匯出設定", function(dir) {
						for(var i=0; i<dir.children.length; i++) {
							var nm = dir.children[i].name;
							if(nm == "文字檔")
								exTXT = dir.children[i];
						}
					});
					if(!!exTXT) {	// PS:XSL須轉為UTF-16, 否則二代不能使用
						var ph = exTXT.remote.path;
						theLogger.log("下載'" + ph + "'...");
						theCacheMgr.get({type: "rsrc", rsrc: exTXT, async: true})
						.done(function(xslDoc) {
							if("file" in xslDoc && xslDoc.big5XML == true) {
								var rdr = new FileReader();
								rdr.onload = function() {
									nsEditor.exTXT = (new DOMParser()).parseFromString(this.result, "text/xml");
									theLogger.log("匯出文字檔.XSL -- ");
									theLogger.log(nsEditor.exTXT);
								};
								rdr.readAsText(xslDoc.file, "Big5");
							}
							else {
								nsEditor.exTXT = xslDoc;
								theLogger.log("匯出文字檔.XSL -- ");
								theLogger.log(nsEditor.exTXT);
							}
						});
					}
				}
				
				// 2016.5
				//$.mobile.showPageLoadingMsg();	// 2015.12.29 下載解析封裝檔前就show loading, 以免封裝檔太大解析太耗時有空白頁面的空檔
				SSOUtil.loading('show', {text:"公文載入中...", textVisible:true});

				//1061222 David 1061170 新增呼叫WedEditSave.SetSourceODWObj()，記錄初始基資資訊
				if(typeof SetSourceODWObj !== "undefined")
					SetSourceODWObj();
				
				// 2016.6.22 新增支援紙本簽核
				if(docObj.signType == "P") {
					theLogger.warn("紙本簽核公文...");
					
					_signFolder.ecapFileName = ((docObj.docNo.length > 0)?(docObj.docNo + "-"):"") + "X.XML";	// 2016.7.27 紙本不下載封裝檔但要記錄封裝檔名, 儲存時才檢查得出來是否需要因應要號而更名
					
					// 1130220 Raymond 1120234 新增判斷是否為UNV直接開啟來文DI模式, 是則不要下載文稿管理檔, 並傳入DI檔檔名給_currMgmt.init新增的第4個參數
					if(_readOnly && !!_docObj.uiParam && !!_docObj.uiParam && !!_docObj.uiParam.unv_obj && _docObj.uiParam.unv_obj.viewType == "FromDocDI") {
						var diFileName = _docObj.uiParam.unv_obj.UnvRoot.Doc.Att.File.FileName;
						_currMgmt = new DraftMgmt();
						_currMgmt.init(that, that.fileIOWS, that.subDirPath, diFileName)	// 傳入來文DI的檔名為第4參數
							.done(function() {
								postInit();
							});
					}
					else {
					
					var dir = ((docObj.docNo.length > 0)?(docObj.docNo + "-"):"") + "00-99";
					if(_readOnly) {	// 唯讀開啟時一律設為唯讀
						theLogger.log("整份公文唯讀, 故子目錄(" + dir + ")設為唯讀");
						_currMgmt = _draftMgmts[dir] = new DraftMgmt();
					}
					else {
						theLogger.log("公文文稿子目錄(" + dir + ")設為" + ((_enableEdit)?"可讀寫":"唯讀"));
						_currMgmt = _draftMgmts[dir] = new DraftMgmt(_enableEdit);	// 2016.8.26 改用_enableEdit
					}
					_currMgmt.init(that, that.fileIOWS, that.subDirPath + "\\" + dir)
						.done(function() {
							theLogger.warn("文稿管理檔初始化完成! 耗時" + ((new Date()) - t0) + "ms");	// for 測試效能
							
							// 2016.7.1 若指定自樣版檔新增文稿
							if("new_draft_from_tmpl" in localStorage && localStorage['new_draft_from_tmpl'].length > 0) {
								// 1140930 Raymond 中榮序260 復原弱掃導致開啟舊檔載入的XML字串變成"&gt;函&gt;"這種形式而無法載入的問題
								//1140723	Leslie[1141011]	弱掃修正[Client DOM Stored XSS]
								that.newDraft(JSON.parse(localStorage['new_draft_from_tmpl']))
								//that.newDraft(JSON.parse(HtmlEncode(localStorage['new_draft_from_tmpl'])))
									.done(function() {
										localStorage.removeItem('new_draft_from_tmpl');
										// 2016.10.28 初始化成功後, 改呼叫postInit()以支援後續客製化邏輯
										//if(options && options.success)
										//	options.success.call(that);
										postInit();
									})
									.fail(function(errorText) {
										if(options && options.error)
											options.error.call(that, errorText);
									});
							}
							else {
								// 2016.10.28 初始化成功後, 改呼叫postInit()以支援後續客製化邏輯
								//if(options && options.success)
								//	options.success.call(that);
								postInit();
							}
						})
						.fail(function(errorText) {
							theLogger.error(errorText);
							if(options && options.error)
								options.error.call(that, errorText);
						});
					}	// end of if(...) else 1130220 Raymond 1120234 新增判斷是否為UNV直接開啟來文DI模式
				}
				else {
					theLogger.warn("線上簽核公文...");
					
					var ecapFName = ((docObj.docNo.length > 0)?(docObj.docNo + "-"):"") + "X.XML";
					// 1070517 Raymond 1070547 修改SignFolder.init參數, 多傳入that, 少傳入docObj, docObj改由FolioModel.getDocObj()間接取得
					//_signFolder.init(docObj.fileIOWS, that.subDirPath, ecapFName, docObj)	// 2016.8.11 新增第4參數docObj
					_signFolder.init(that, that.fileIOWS, that.subDirPath, ecapFName)
						.done(function(sf) {
							theLogger.warn("封裝檔初始化完成! 耗時" + ((new Date()) - t0) + "ms");	// 2015.12.29 for 測試效能
							t0 = new Date();	// 2015.12.29 for 測試效能
							
							if(sf.isReturnDoc())	// 2016.11.11 草稿及退文(記錄在封裝檔)預設為不保留簽署物件
								_reserveSO = false;
							else	// 2016.2.15 新增由外部簽核記錄檔取回前次儲存的保留簽署物件設定
								_reserveSO = sf.xSignFolder().getReserveSO();
							
							// 2016.2.1 改從封裝檔中解讀可能包含的文稿子目錄, 載入的DraftMgmt.xml也不只一個
							
							//2016.9.19	Leslie	增加處理disableSave相關邏輯，ODT351與AKI802的文稿編輯模式(不可儲存)，亦無需判斷是否為會辦單位
							//if(!_readOnly) {	// 2016.3.21 非唯讀才判斷是否為會辦單位
							if(!_readOnly && !_disableSave){
								// 2016.3.21 改叫SSOUtil.isConsultingDoc來判斷是不是會辦單位
								var orgNode = SSOUtil.getOrgNode(_docObj.sourceOrgNo);
								if (typeof orgNode!=='undefined')
									// 1070608 Raymond 1070197 記錄目前公文是否為會辦中公文
									//var isConUnit = SSOUtil.isConsultingDoc(_docObj, theSSO.User.EnvSettings, orgNode);
									_isConUnit = SSOUtil.isConsultingDoc(_docObj, theSSO.User.EnvSettings, orgNode);
								else
									theLogger.error("找不到'" + _docObj.sourceOrgNo + "'的OrgInfo節點, 無法判斷是否為會辦單位!");
								//var isConUnit = _isConUnit();	// 是否為會辦單位, 2016.3.21 修正改用Eric寫的SSOUtil.isConsultingDoc來判定是否為會辦單位
							}
							// 2016.8.31 新增記錄封裝檔除了來文文件夾及來文簽辦外是否無其它文稿
							_isFirstSign = sf.getDraftCountsExcludeFromDoc() == 0;
							theLogger.log((_isFirstSign?"":"非") + "首次簽辦");
							
							var deferreds = [];
							// 1100901 Raymond 1100750 "併辦"子文僅顯示來文內容, 不需要載入文稿管理檔
							if(_onlyFromDoc) {
								theLogger.log("'併辦'子文僅顯示來文內容, 不需要載入文稿管理檔");
							}
							else
							// 1090910 Raymond 1090564 信保特殊模式沒有文稿管理檔
							if(_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
								theLogger.log("[信保特殊模式]不需下載文稿管理檔");
							}
							else {	// TODO: 參照公文無ODWDCM, 會無法判斷是否為信保特殊模式
							
							var c = sf.getDraftCounts();
							// 1100512 Raymond 1090821 新增判斷是否為外會公文, 若是則文稿編輯子目錄固定為「$文號-$受陳(會)機關(即本機關)代碼-00-99」
							if(_docObj.get("ODWMSG", "COME_OTHERS").match(/[12]/)) {
								var dir = _docObj.docNo + "-" + _docObj.sourceOrgNo + "-00-99";
								theLogger.log("外會公文的文稿編輯子目錄固定為'" + dir + "'");
								_currMgmt = _draftMgmts[dir] = new DraftMgmt(_enableEdit);
								deferreds.push(_draftMgmts[dir].init(that, that.fileIOWS, that.subDirPath + "\\" + dir));
							}
							else {
							// 創稿無公文
							if(c == 0) {
								//1150206 David 序57 新增允許紙本轉線上後封裝檔無資料情形，比照草稿公文狀態處理
								//if(docObj.isDraft) {
								if(docObj.isDraft || docObj.ODWDCM.IS_P2E == "Y") {
									var dir;
									if(docObj.docNo.length == 0) {
										theLogger.log("草稿公文未取文號以'00-99'為子目錄");
										dir = "00-99";
									}
									else {
										theLogger.log("草稿公文已取文號以'" + docObj.docNo + "-00-99'為子目錄");
										dir = docObj.docNo + "-00-99";
									}
									theLogger.log("設為" + ((_enableEdit)?"可讀寫":"唯讀"));
									_currMgmt = _draftMgmts[dir] = new DraftMgmt(_enableEdit);	// 2016.8.26 改用_enableEdit
									deferreds.push(_currMgmt.init(that, that.fileIOWS, that.subDirPath + "\\" + dir));
								}
								else {
									theLogger.error("非草稿公文無文稿!");
									alert("非草稿公文無文稿!");
								}
							}
							if(c == 1 && sf.hasFromDoc()) {	// 2016.11.28 只有來文文稿, 路徑無子目錄
								theLogger.warn("只有來文文稿, 設定子目錄為'" + _docObj.docNo + "-00-99");
								var dir = _docObj.docNo + "-00-99";
								if(_readOnly) {	// 2016.3.21 新增唯讀開啟時一律設為唯讀
								//else if(_readOnly || _disableSave) {
									theLogger.log("整份公文唯讀, 故子目錄(" + dir + ")設為唯讀");
									_draftMgmts[dir] = new DraftMgmt();
								}
								//2016.10.04	Leslie	移到_readOnly的後面
								//2016.9.19	Leslie	增加處理disableSave相關邏輯，ODT351與AKI802的文稿編輯模式(不可儲存)
								else if(_disableSave){
									_currMgmt = _draftMgmts[dir] = new DraftMgmt(_disableSave);
								}
								else {
									theLogger.log("設為" + ((_enableEdit)?"可讀寫":"唯讀"));
									_currMgmt = _draftMgmts[dir] = new DraftMgmt(_enableEdit);	// 2016.6.17 新增記錄目前編輯中文稿管理檔是這個 2016.8.26 改用_enableEdit
								}
								deferreds.push(_draftMgmts[dir].init(that, that.fileIOWS, that.subDirPath + "\\" + dir));
							}
							for(var i=0; i<c; i++) {
								var d = sf.getDraft(i);
								if(d && "fileRef" in d && d.fileRef) {	// 2016.2.16 fix FromDoc可能有fileRef但是null
									var bs = d.fileRef.name.indexOf('\\');
									if(bs > 0) {
										var p = d.fileRef.name.substring(0, bs);
										// 1110815 Raymond 考試院序193 修正歷史檢視的附件tooltip(摘要)只用到-00-99流程點的文稿管理檔內容, 而不是各流程點的文稿管理檔內容的問題
										if(that.isRefDoc())
											var dir = p;
										// 1120111 Raymond 1111444 修正調閱已歸檔公文, 因歸檔後會辦單位的99子目錄不會保留, 而使應載入「文號-會辦單位-99」子目錄下的文稿管理檔載入失敗, 造成簽辦頁面窗格不會顯示會辦單位所新增之文稿頁籤的問題
										else if(!p.match(/-00-/) &&	// 會辦單位99子目錄
											(!!_unvObj ||			// 調閱公文
											("docState" in _docObj && _docObj.docState >= "13" && !_enableEdit))) {	// 公文還在「已辦畢-已歸檔」資料夾時
											if(!!_unvObj)
												theLogger.log("此為調閱公文, 應直接載入封裝檔記錄的會辦單位子目錄'" + p + "'下的文稿");
											else
												theLogger.log("此為已歸檔公文且資料夾不允許編輯, 應直接載入封裝檔記錄的會辦單位子目錄'" + p + "'下的文稿");
											var dir = p;	// 用原本的會辦單位-0?子目錄而不是-99子目錄載入文稿
										}
										else
										var dir = p.replace(/-[0-9]{2}$/, '-99');
									}
									else if(c == 1 && sf.hasFromDoc()) {	// 2016.8.12 只有來文文稿, 路徑無子目錄
										theLogger.warn("只有來文文稿, 設定子目錄為'" + _docObj.docNo + "-00-99");
										var dir = _docObj.docNo + "-00-99";
										var p = dir;
									}
									
									if(dir in _draftMgmts) {
										//theLogger.error("'" + dir + "'之DraftMgmt已存在!?");	// 2016.2.16 fix 多稿情況下避免重複載入DraftMgmt, 但不知是否有後遺症(例如暫存未清!?)
										//throw new Error("'" + dir + "'之DraftMgmt已存在!?");
									}									
									else if(_readOnly) {	// 2016.3.21 新增唯讀開啟時一律設為唯讀
									//else if(_readOnly || _disableSave) {
										theLogger.log("整份公文唯讀, 故子目錄(" + dir + ")設為唯讀");
										_draftMgmts[dir] = new DraftMgmt();
										deferreds.push(_draftMgmts[dir].init(that, that.fileIOWS, that.subDirPath + "\\" + dir));
									}
									//2016.10.04	Leslie	移到_readOnly的後面
									//2016.9.19	Leslie	增加處理disableSave相關邏輯，ODT351與AKI802的文稿編輯模式(不可儲存)
									else if(_disableSave){
										_currMgmt = _draftMgmts[dir] = new DraftMgmt(_disableSave);
										deferreds.push(_draftMgmts[dir].init(that, that.fileIOWS, that.subDirPath + "\\" + dir));
									}
									else {
										// 1070608 Raymond 1070197 isConUnit改為_isConUnit
										//if(isConUnit) {	// 目前單位若是會辦單位
										if(_isConUnit) {	// 目前單位若是會辦單位
											// 則找出對應的會辦單位子目錄設為可讀寫
											var m = p.match(/-([0-9]{2})-[0-9]{2}$/);
											if(m && m[1] == _docObj.ownOUId.substring(0, 2)) {
												theLogger.log("會辦單位(" + _docObj.ownOUId.substring(0, 2) + ")的子目錄(" + dir + ")設為" + ((_enableEdit)?"可讀寫":"唯讀"));
												_currMgmt = _draftMgmts[dir] = new DraftMgmt(_enableEdit);	// 2016.6.17 新增記錄目前編輯中文稿管理檔是這個 2016.8.26 改用_enableEdit
											}
											else {	// 其它非會辦單位子目錄則設為唯讀
												theLogger.log("非會辦單位(" + _docObj.ownOUId.substring(0, 2) + ")的子目錄(" + dir + ")設為唯讀");
												_draftMgmts[dir] = new DraftMgmt();
											}
										}
										else {	// 非會辦單位
											var m = p.match(/-([0-9]{2})-[0-9]{2}$/);
											if(m && m[1] == "00") {
												theLogger.log("非會辦單位(" + _docObj.ownOUId.substring(0, 2) + ")的子目錄(" + dir + ")設為" + ((_enableEdit)?"可讀寫":"唯讀"));
												_currMgmt = _draftMgmts[dir] = new DraftMgmt(_enableEdit);	// 2016.6.17 新增記錄目前編輯中文稿管理檔是這個 2016.8.26 改用_enableEdit
											}
											else {
												theLogger.log("會辦單位(" + _docObj.ownOUId.substring(0, 2) + ")的子目錄(" + dir + ")設為唯讀");
												_draftMgmts[dir] = new DraftMgmt();
											}
										}
										deferreds.push(_draftMgmts[dir].init(that, that.fileIOWS, that.subDirPath + "\\" + dir));
									}
								}
							}
							// 1070608 Raymond 1070197 允許會辦單位新增文稿且封裝檔內未有已存在會辦單位子目錄的文稿管理檔時, 新增會辦單位子目錄的文稿管理檔
							if(!_readOnly && _enableEdit && !_currMgmt && _isConUnit) {
								theLogger.warn("允許會辦單位編輯文稿(新增稿件)...");
								var dir = _docObj.docNo + "-" + _docObj.ownOUId.substring(0, 2) + "-99";
								theLogger.warn("會辦單位子目錄為'" + dir + "'");
								_currMgmt = _draftMgmts[dir] = new DraftMgmt(_enableEdit);
								deferreds.push(_draftMgmts[dir].init(that, that.fileIOWS, that.subDirPath + "\\" + dir));
							}
							}	// end of if(_docObj.get("ODWMSG", "COME_OTHERS").match(/[12]/))
							}	// 1090910 Raymond 1090564 end of if(_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2")
							
							// 2016.7.14 下載AOLProccessData.xml移至外面
							function downloadAPD() {
								var dfd = $.Deferred();
								var cachedProcessData = _docObj.docNo + ".AOLProcessData.xml";
								/*if(cachedProcessData in sessionStorage) {
									theLogger.log("讀取暫存於連線階段的'" + cachedProcessData + "'");
									var xml = (new DOMParser()).parseFromString(sessionStorage[cachedProcessData], "text/xml");
									_parseAPD(xml);
									theLogger.log(_apd);
									// 2015.12.15 新增try-catch
									try {
										_signFolder.reserveSOofOtherRev(_apd.rawXml);	// 2015.4.14 新增讀取保留簽署意見功能, 2015.5.7 改為直接傳AOLProcessData.xml的DOM
									}
									catch(e) {
										theLogger.error(e.message + "-" + e.sourceURL + ":" + e.line);
									}
									dfd.resolve();
								}
								else*/ {
									var dirPath;
									if(_docObj.docNo.length == 0)	// 2016.7.14 未取文號的草稿, 子目錄是00-99
										dirPath = that.subDirPath + "\\00-99";
									else
										dirPath = that.subDirPath + "\\" + _docObj.docNo + "-00-99";	// 2016.2.1 AOLProccessData.xml只會出現在-00-99子目錄下, 不論是否為會辦單位
									theLogger.log("下載'" + dirPath + "\\AOLProcessData.xml'...");
									var wfio = new WebFileIO(that.fileIOWS);
									wfio.download(dirPath, "AOLProcessData.xml", {
										success: function(fil, res) {
											theLogger.warn("AOLProccessData.xml下載完成! 耗時" + ((new Date()) - t0) + "ms");
											t0 = new Date();
											
											_parseAPD(fil);
											theLogger.log(_apd);
											
											// 1100512 Raymond 1090821 使用AOLProcessData.xml的額外資訊補充外會公文的文稿頁面, 並從文稿清單中切割出來
											if(_docObj.get("ODWMSG", "COME_OTHERS").match(/[12]/) || _signFolder.hasSingleLayerDraft()) {
												if(!!_apd.ExorgPresentData)
													_signFolder.mapExorgPresentData(_apd.ExorgPresentData);
												else if(_signFolder.hasSingleLayerDraft())
													theLogger.error("封裝檔記錄有單層式文稿頁面, 但AOLProcessData未記錄呈現檔轉出之影像檔");
												else
													theLogger.error("封裝檔記錄無單層式文稿頁面, 且AOLProcessData未記錄呈現檔轉出之影像檔, 但ODWMSG記錄此筆公文為外呈外會公文(COME_OTHERS=" + _docObj.get("ODWMSG", "COME_OTHERS") + ")");
											}
											
											// 2016.7.14 線上簽核要同步文稿管理檔中有的文稿到封裝檔
											if(_docObj.signType == "E" && !that.isRefDoc()) {	// 2016.11.29 參照公文不要載入SignWork.xml
												// 1080626 Raymond 修正受會待核示有文稿管理檔但無文稿時, 不會執行到mapDrafts的callback, 造成文稿附件沒有從AOLProccessData.xml找出對應GUID, 而又導致已匯出頁面變成超鏈結的問題
												//if(_currMgmt) {	// 2016.8.9 無可編輯的文稿管理檔時不用偵測新增文稿, 例如：待處理-會簽中
												if(!!_currMgmt && _currMgmt.getDraftCounts() > 0) {
													_currMgmt.mapDrafts(function(draft, subdir) {
														// 透過AOLProcessData.xml尋找對應GUID的文稿
														var exists = false,
															shouldNewDraft = false;	// 2017.2.10 應新增此文稿至封裝記錄flag
														for(var i=0; i<_apd.length; i++) {
															if(_apd[i].guid == draft.guid) {
																theLogger.log("AOLProccessData.xml中找到GUID為'" + draft.guid + "'的文稿, 判定此文稿已存在封裝檔中!");
																for(var j=0; j<_apd[i].versions.length; j++) {	// 將GUID寫回封裝檔物件
																	try {
																		//var d = _signFolder.getDraftById(_apd[i].versions[j].id);
																		var d = _signFolder.findDraftByIdAllRev(_apd[i].versions[j].id);	// 2017.1.16 改成搜尋所有版本
																		d.guid = draft.guid;
																		
														// 1130805 Raymond 中榮序157 設定GUID與後續處理分開, 以避免取得後面<版本>的文稿時, 由於文稿GUID還未設定, 造成找不到文稿GUID對應的文稿的問題
																	}
																	catch(e) {
																		theLogger.error(e.stack || e.message);
																	}
																}
															}
														}
														for(var i=0; i<_apd.length; i++) {
															if(_apd[i].guid == draft.guid) {
																for(var j=0; j<_apd[i].versions.length; j++) {	// 將GUID寫回封裝檔物件
																	try {
																		var cd = _signFolder.getDraftByGUID(draft.guid);
																		// 1130805 Raymond 中榮序157 修正判斷條件為目前流程點的文稿的ID是被廢止的版本時, 才修改為以下一個未被廢止的版本取代
																		// 1130731 Raymond 中榮序157 修正分會合併後最後一個分會流程點未異動內文時, 使得最後一個流程點的文稿會記錄成跑分會前的最初版本, 但因最初版後面有其它分會流程點的異動, 導致分會合併後的流程點, 出現未顯示其它分會流程點的簽核物件, 及傳送時發生-729錯誤的問題
																		//if(!!_apd[i].versions[j].aMsgId) {
																		if(!!_apd[i].versions[j].aMsgId && cd.id == _apd[i].versions[j].id) {
																			theLogger.warn("AOLProcessData.xml中記錄<版本 文件夾識別碼='" + _apd[i].versions[j].id + "'>已被(aMsgId:" + _apd[i].versions[j].aMsgId + ")廢止");
																			var k = 1;
																			while(true) {
																				if(j + k == _apd[i].versions.length - 1) {
																					theLogger.warn("改以下個版本(cMsgId:" + _apd[i].versions[j + k].cMsgId + ")的文稿(" + _apd[i].versions[j + k].id + "取代之");
																					var dRep = _signFolder.findDraftByIdAllRev(_apd[i].versions[j + k].id);
																					if(!!dRep) {
																						theLogger.warn("文稿由(文件夾識別碼:'" + d.id + "')變更為(文件夾識別碼:'" + dRep.id + "')");
																						//console.warn(d);
																						// 1130806 Raymond 中榮序157 修正分會合併後第一個分會流程點有異動內文時, 主辦單位看不到第一個分會流程點的章的問題
																						//Object.assign(d, dRep);
																						Object.assign(cd, dRep);
																						//console.warn(d);
																						j = j + k;
																						break;
																					}
																					else {
																						theLogger.error("異常：封裝檔中找不到文件夾識別碼為'" + _apd[i].versions[j + k].id + "'的文稿, 無法取代");
																						break;
																					}
																				}
																				else if(j + k < _apd[i].versions.length - 1) {
																					if(!!_apd[i].versions[j + k].aMsgId) {
																						theLogger.warn("下個<版本 文件夾識別碼='" + _apd[i].versions[j + k].id + "'>已被(aMsgId:" + _apd[i].versions[j + k].aMsgId + ")廢止, 繼續搜尋下個版本");
																						k++;
																						continue;
																					}
																					else {
																						theLogger.error("異常：下個<版本 文件夾識別碼='" + _apd[i].versions[j + k].id + "'>未被廢止, 但卻非最後一個<版本>");
																						break;
																					}
																				}
																				else {
																					// 1130805 Raymond 中榮序157 修正下一個<版本>是目前流程點修改的版本時, 因為被移除, 會發生_apd[i].versions[j + k]是undefined的問題
																					//theLogger.error("異常：此<版本 文件夾識別碼='" + _apd[i].versions[j + k].id + "'>雖標記為已被(aMsgId:" + _apd[i].versions[j + k].aMsgId + ")廢止, 但卻是最後一個<版本>");
																					break;
																				}
																			}
																		}
																		// 1141208 Raymond 1141581 修正只要判斷ID相同的版本
																		if(d.id == _apd[i].versions[j].id) {
																			// 1130731 Raymond 中榮序157 修正分會合併後, 設為"分會合併=Y"的文稿不會標記為已異動, 導致不會匯出頁面的問題
																			if(draft.dispatchMerged == "Y") {
																				theLogger.log("分會合併的流程點後第一個流程點要直接設為已異動");
																				if(!("applyPrintXSL" in d)) {	// 1141208 Raymond 1141581 新增檢核applyPrintXSL是否有設
																					d.applyPrintXSL = _apd[i].versions[j].printXSL;	// 標記已異動的文稿必須要有applyPrintXSL
																				}
																				d.dirty(true);
																			}
																			// 1141208 Raymond 1141581 修正文稿(簽稿會核單)的ID若為分會單位異動後形式(MsgID-序號), 但文稿管理檔因不明原因未標記「分會合併="Y"」時, 檢查異動流程點是否處於分會流程點中, 是則強制改為已異動, 以避免傳送時發生-729錯誤問題
																			else if(d.docType == "簽稿會核單" && !d.dirty() && d.id.match(/\d+\-\d+/)) {
																				theLogger.log("簽稿會核單的ID(" + d.id + ")為分會單位異動後形式, 但未標記為分會合併或已異動, 檢核目前流程點是否為會畢退回後第一個流程點, 及簽稿會核單異動的分會流程點是否位於同一個分會點");
																				let lastDispatchFlow = _signFolder.getAolFlow().flows.findLast((f) => {return !!f.dispatch;}),
																					currFlow = _signFolder.getCurrRevision().replace("sign_", "FLOW_");
																				if(!!lastDispatchFlow) {
																					let currFlowInDsp = lastDispatchFlow.dispatch.find((dsp) => {return dsp.flows.find((f2) => {return f2.id == currFlow;});});
																					if(!!currFlowInDsp) {
																						let modFlow = "FLOW_" + d.id.substr(0, d.id.indexOf("-"));
																						let modFlowInDsp = lastDispatchFlow.dispatch.find((dsp) => {return dsp.flows.find((f2) => {return f2.id == modFlow;});});
																						if(!!modFlowInDsp) {
																							theLogger.log("最後流程點'" + currFlow + "'與異動流程點'" + modFlow + "'位在同一分會點中, 強制設定簽稿會核單為已異動");
																							draft.dispatchMerged = "Y";
																							if(!("applyPrintXSL" in d)) {
																								d.applyPrintXSL = _apd[i].versions[j].printXSL;	// 標記已異動的文稿必須要有applyPrintXSL
																							}
																							d.dirty(true);
																						}
																						else
																							theLogger.log("異動流程點'" + modFlow + "'不在分會點中, 忽略檢核");
																					}
																					else
																						theLogger.log("最後流程點'" + currFlow + "'不在分會點中, 忽略檢核");
																				}
																				else
																					theLogger.warn("封裝檔無任何分會點, 無法判斷是否為分會合併");
																			}
																		}
																		
																		// 1061016 Raymond 1060948+1060962 異動撤消回分辦後主辦流程點, 本來前次傳送的內容包括新增文稿及匯出頁面等應該被排除(會走exception那條路),
																		// 但因是分辦後僅1個流程點, 以避免來文文件夾資訊遺失問題將此流程點的簽核文件夾資料也讀進來了, 故在此檢查是否與目前流程點相同msgId,
																		// 是則表示為上述狀況, 須將文稿標記為已異動, 否則調整文稿順序等功能不會生效
																		if(d.flowId == "sign_" + _docObj.msgId) {
																			theLogger.warn("文稿'" + d.name + "'之'產生點資訊'(" + d.flowId + ")與目前流程點msgId相同, 視為異動撤消復原的文稿, 標記已異動狀態");
																			if(!("applyPrintXSL" in d)) {
																				d.applyPrintXSL = _apd[i].versions[j].printXSL;	// 標記已異動的文稿必須要有applyPrintXSL
																			}
																			d.dirty(true);
																		}
																		// 1130902 Raymond 中榮序181 最後一個分會流程點異動文稿後分會合併會執行到這一段, 新增已經設定過合併ID就不要再執行
																		// 1130123 Raymond 1120887 新增判斷最後流程點的文稿是分會合併時, 設為已異動
																		//else if(d.flowId == _signFolder.getCurrRevision() && draft.dispatchMerged == "Y") {
																		else if(d.flowId == _signFolder.getCurrRevision() && draft.dispatchMerged == "Y" && !d.dispatchMergedID) {
																			theLogger.log("文稿'" + d.name + "'之'產生點資訊'(" + d.flowId + ")與封裝檔最後一個流程點(" + _signFolder.getCurrRevision() + ")相同, 且文稿管理檔中標記'分會合併'為'Y', 標記為己異動狀態");
																			if(!("applyPrintXSL" in d)) {
																				d.applyPrintXSL = _apd[i].versions[j].printXSL;	// 標記已異動的文稿必須要有applyPrintXSL
																			}
																			// 從AOLProcessData.xml中搜尋最後一個主辦流程點的文稿ID
																			var lastICDraftID;
																			// 1130902 Raymond 中榮序181 從j開始往回搜尋, 但j從0開始, 所以有可能只會搜尋到第一筆主辦流程點的文稿ID, 而不是最後一筆主辦流程點異動後的文稿ID
																			//for(var k=j; k>=0; k--) {
																			for(var k=_apd[i].versions.length-1; k>=0; k--) {
																				if(!_apd[i].versions[k].id.match(/\d+\-\d+/) && _apd[i].versions[k].id.match(/\d+/)) {
																					lastICDraftID = _apd[i].versions[k].id;
																					break;
																				}
																			}
																			if(!!lastICDraftID) {
																				theLogger.log("最後一版主辦單位異動的文稿ID為'" + lastICDraftID + "'");
																				var lastICDraft = _signFolder.findDraftByIdAllRev(lastICDraftID);
																				if(!!lastICDraft) {
																					d.dispatchMergedID = d.id;	// 記下合併時的ID
																					d.id = lastICDraft.id;
																					var bs = d.fileRef.name.indexOf('\\');
																					if(bs >= 0) {
																						var p = lastICDraft.fileRef.name.indexOf('\\');
																						if(p >= 0) {
																							d.fileRef.name = d.fileRef.name.substr(0, bs) + lastICDraft.fileRef.name.substr(p);
																							theLogger.log("文稿'" + d.name + "'之'原始檔案名稱更新為'" + d.fileRef.name + "'");
																						}
																					}
																				}
																			}
																			d.dirty(true);
																		}
																		// 1130920 Raymond 中榮序182 修正異動撤消回分會合併後主辦流程點, 因文稿管理檔中的簽稿會核單的"分會合併"屬性已於前次傳送清除掉了, 所以異動撤消後會無法判斷簽稿會核單應標記異動, 造成再傳送時發生-711錯誤的問題
																		else if(!!_signFolder.getForbiddenSignDef()) {
																			var r = _signFolder.getRevisions(),
																				cr = _signFolder.getCurrRevision();
																			if(!!r[d.flowId] && !!r[d.flowId].refFlow && !!r[d.flowId].refFlow.dispatchNode &&
																				!!r[cr] && !!r[cr].refFlow && !!r[cr].refFlow.dispatchNode &&
																				r[d.flowId].refFlow.dispatchNode.parentFlow == r[cr].refFlow.dispatchNode.parentFlow) {
																				theLogger.log("文稿'" + d.name + "'之'產生點資訊'(" + d.flowId + ")與異動撤消後的封裝檔最後一個流程點(" + cr + ")為同一個分會流程點(" + r[cr].refFlow.dispatchNode.parentFlow.id + "), 標記為己異動狀態");
																				if(!("applyPrintXSL" in d)) {
																					d.applyPrintXSL = _apd[i].versions[j].printXSL;	// 標記已異動的文稿必須要有applyPrintXSL
																				}
																				d.dirty(true);
																			}
																		}
																		
																		if("attachs" in d) {
																			for(var k=0; k<d.attachs.length; k++) {
																				var a = d.attachs[k];
																				for(var m=0; m<_apd[i].versions[j].atts.length; m++) {
																					if(_apd[i].versions[j].atts[m].id == a.id) {
																						a.guid = _apd[i].versions[j].atts[m].guid;
																						break;
																					}
																				}
																				// 1060928 Raymond 1060948 修正無SignWork.xml情況下, 調整附件順序會沒有filRef可記錄檔名而導致存檔錯誤的問題
																				if(a.fileRef == null) {
																					if(!!a.guid) {
																						for(var m=0; m<draft.atts.length; m++) {
																							if(draft.atts[m].ref.guid == a.guid) {
																								theLogger.warn("找到與ID:" + a.id + "的GUID相符的文稿附件'" + draft.atts[m].ref.fileName + "'(from文稿管理檔)");
																								a.fileRef = {
																									fileSN: "",
																									sn: "",
																									time: "",
																									name: draft.atts[m].ref.fileName,
																									size: "",
																									format: ""
																								};
																								break;
																							}
																						}
																						if(!a.fileRef)
																							theLogger.warn("此附件ID:" + a.id + "找不到GUID相符的文稿附件(from文稿管理檔)");
																					}
																					else
																						theLogger.warn("此附件ID:" + a.id + "找不到GUID");
																				}
																			}
																		}
																	}
																	catch(e) {
																		theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
																		// 2017.2.10 AOLProccessData.xml記錄的id在封裝檔中找不到, 是因為封裝檔會濾掉目前
																		//			 流程點, 若因傳送失敗或異動撤消回"新增此文稿"的流程點時, 便會發生此Exception
																		//			 故記錄額外flag, 加上判斷版本只有一個的條件, 正常異動撤消應該會更新AOLProccessData.xml成只有一個版本
																		if(_apd[i].versions.length == 1) {
																			theLogger.warn("封裝檔由於過濾目前msgId的流程點資訊, 可能造成找不到此ID(" + _apd[i].versions[j].id + ")對應的文稿, 這種情形是目前流程點新增此文稿, 故應走新增文稿邏輯");
																			shouldNewDraft = true;
																		}
																		// 1061012 Raymond 1060962+1060948+1060989 異動撤消後刪除附件會發生錯誤,
																		// 因異動撤消後AOLProcessData保留同msgId傳送後所產生的附件ID及匯出頁面, 但二代會將封裝檔同msgId的簽核文件夾捨棄
																		// 導致找不到AOLProcessData所查到的附件ID, 刪除不了附件
																		// 故在解讀AOLProcessData時, 判斷與目前流程點同msgId即為撤消或封裝成功傳送失敗, 將封裝檔的附件部分更新為
																		// AOLProcessData所記錄的ID、所匯出的頁面, 並標記文稿內容有異動
																		else if(_apd[i].versions.length > 1) {
																			if(_apd[i].versions[_apd[i].versions.length-1].cMsgId == _docObj.msgId) {
																				theLogger.warn("AOLProccessData.xml中相同msgId的流程點位於最後一個, 應是異動撤消或封裝成功傳送失敗所留下的, 更新封裝檔文稿的附件清單及所匯出附件頁面等資訊...");
																				var ver = _apd[i].versions[_apd[i].versions.length-1];
																				var prevVer = _apd[i].versions[_apd[i].versions.length-2];	// 前一版本AOLProcessData的文稿
																				try {
																					var d = _signFolder.findDraftByIdAllRev(prevVer.id);		// 目前封裝檔的文稿
																					// 從已棄用的簽核點定義復原附件及匯出頁面
																					var fsd = _signFolder.getForbiddenSignDef();
																					if(!!fsd) {
																						var s = fsd.findDraft(ver.id);	// 被棄用的封裝檔文稿
																						if("attachs" in s) {	// 異動後有附件
																							for(var m=0; m<s.attachs.length; m++) {
																								// 先取回附件GUID
																								for(var k=0; k<ver.atts.length; k++) {
																									if(s.attachs[m].id == ver.atts[k].id) {
																										s.attachs[m].guid = ver.atts[k].guid;
																										break;
																									}
																								}
																								// 再判斷是否異動
																								var attNotChanged = false;
																								for(var k=0; k<d.attachs.length; k++) {
																									// 1080924 Raymond 1080660 修正異動撤消時若該流程點前次傳送前未重新匯出附件頁面, 因附件ID傳送後固定會變更, 會發生誤判為附件已異動導致附件ID重新設定, 在載入SignWork.xml的情況下(異動撤消一個流程點)會發生GUID未還原, 導致儲存變成不匯出頁面的附件電子檔格式的問題
																									//if(s.attachs[m].id == d.attachs[k].id) {	// 前一流程點附件ID與被棄用的流程點相同表示此附件未異動
																									if(s.attachs[m].guid == d.attachs[k].guid) {// 前一流程點附件GUID與被棄用的流程點相同表示此附件未異動
																										attNotChanged = true;
																										break;
																									}
																								}
																								// 異動過的附件須更新相關資訊
																								if(!attNotChanged) {
																									// 1110301 Raymond 1110106 合併1080815, 支援不匯出頁面的附件
																									//if(SSO_CONFIG.enableConvertAttPage) {	// 匯出頁面資訊
																									if(SSO_CONFIG.enableConvertAttPage && d.attachs[m].fmt == "文稿頁面檔格式") {	// 匯出頁面資訊
																										var old = {id: d.attachs[m].id, guid: d.attachs[m].guid, time: d.attachs[m].time, sn: d.attachs[m].sn, name: d.attachs[m].name, pgs: d.attachs[m].draftPages.pages.length};
																										d.attachs[m].id = _signFolder.accquireNewId();
																										d.attachs[m].guid = s.attachs[m].guid;
																										d.attachs[m].time = s.attachs[m].time;
																										d.attachs[m].draftPages.time = s.attachs[m].draftPages.time;
																										d.attachs[m].draftPages.pages.length = 0;
																										function getFileInfo(files, sn) {
																											for(var h=0; h<files.length; h++) {
																												if(files[h].fileSN == sn) {
																													return files[h];
																												}
																											}
																											return null;
																										}
																										for(var k=0; k<s.attachs[m].draftPages.pages.length; k++) {
																											var p = _signFolder.restoreAttPage(d.attachs[m], k);
																											//p.id = s.attachs[m].draftPages.pages[k].id;
																											//p.fileSN = s.attachs[m].draftPages.pages[k].fileSN;
																											p.time = s.attachs[m].draftPages.pages[k].time;
																											p.sn = k;
																											p.fileRef = s.attachs[m].draftPages.pages[k].fileRef;
																											if(!p.fileRef) {
																												p.fileRef = getFileInfo(fsd.obj.signInfo.files, s.attachs[m].draftPages.pages[k].fileSN);
																											}
																											d.attachs[m].draftPages.pages.push(p);
																										}
																										d.attachs[m].draftPages.pages.count = k;
																										theLogger.warn("還原異動撤消的附件異動資訊 - id:" + old.id + "->" + d.attachs[m].id + ", guid:" + old.guid + "->" + d.attachs[m].guid + ", time:" + old.time + "->" + d.attachs[m].time + ", pages:" + old.pgs + "->" + d.attachs[m].draftPages.pages.length);
																									}
																									else {	// 附件電子檔資訊
																										// TODO:
																									}
																								}
																							}
																							d.attachs.splice(m);	// 多的附件就是這個流程點刪掉的
																							d.dirty(true);	// 標記已異動
																						}
																						else {	// 異動後無附件
																							if(d.attachs.length > 0) {
																								d.attachs.length = 0;
																								d.dirty(true);	// 標記已異動
																							}
																						}
																					}
																				}
																				catch(e2) {
																					theLogger.error(e2.message + " - " + e2.sourceURL + ":" + e2.line);
																				}
																			}
																			else {
																				var invalidVersion = false;
																				for(var m=0; m<_apd[i].versions.length; m++) {
																					if(_apd[i].versions[m].cMsg == _docObj.msgId) {
																						theLogger.error("AOLProccessData.xml中有相同msgId的流程點但不是最後一個, 正常異動撤消或封裝成功傳送失敗不應有此情形");
																						invalidVersion = true;
																						break;
																					}
																				}
																				if(!invalidVersion) {
																					// 1110107 Raymond 1101423 轉線上(EDT213)前線上簽核已傳送, 且長官有異動文稿檔, 使AOLProcessData.xml記錄舊文稿有2個以上版本時, 會走到這段
																					var aolFlow = _signFolder.getAolFlow();
																					if(!!aolFlow && !!aolFlow.flows && aolFlow.flows.length > 0 && aolFlow.flows[0].type == "轉線上") {
																						theLogger.error("AOLProccessData.xml中記錄文稿版本的ID在封裝檔中找不到, 應是轉線上清除所有簽核流程點定義之緣故");
																						shouldNewDraft = true;	// 判斷是「轉線上」造成的問題要用新增文稿再刪除的方式處理
																					}
																					else
																					theLogger.error("AOLProccessData.xml中記錄文稿版本的ID在封裝檔中找不到, 封裝檔與AOLProcessData記錄不一致?");
																				}
																			}
																		}
																	}
																}
																// TODO: 已存的文稿是否會增刪附件, 需要同步?
																
																exists = true;
																//return;	// 2016.8.2 傳送失敗等異常可能導致封裝檔及AOLProccessData.xml有記錄目前流程點新增的文稿,
																			//			但由於為了避免AOL版資料的相容問題, 封裝檔解讀會將目前流程點的資料捨棄
																			//			造成AOLProccessData.xml記錄的id在封裝檔找不到的Exception
															}
														}
														
														if(!exists || shouldNewDraft) {	// 2017.2.10 新增支援異動撤消的例外情形
															var forbiddenDraft;	// 1061016 記下刪除的文稿版本, 以供後續復原前次傳送已匯出成功的附件頁面
															if(exists && shouldNewDraft) {
																theLogger.log("AOLProccessData.xml中雖找到GUID為'" + draft.guid + "'的文稿(" + subdir + "\\" + draft.fileName + "), 但不存在封裝記錄, 判定為目前流程點的新增文稿, 同步封裝檔...");
																for(var i=0; i<_apd.length; i++) {
																	if(_apd[i].guid == draft.guid) {
																		theLogger.warn("刪除AOLProccessData記錄舊的的文稿, 重新產生");
																		forbiddenDraft = _apd.splice(i, 1)[0];	// 1061016 記下刪除的文稿版本, 以供後續復原前次傳送已匯出成功的附件頁面
																		break;
																	}
																}
															}
															else
																theLogger.log("AOLProccessData.xml中找不到GUID為'" + draft.guid + "'的文稿(" + subdir + "\\" + draft.fileName + "), 判定為新增文稿, 同步封裝檔...");
															_newDraftId++;
															var newDraftId = "NewDraft" + _newDraftId;
															_apd.push({	guid: draft.guid,
																		subDocType: draft.subDocType,
																		lastAutoObj: 0,
																		//printXSL: draft.printXsl,
																		printXSL: draft.applyPrintXSL,	// 1060913 Raymond 1060756 修正多樣版的文稿儲存關閉後再開, 仍會詢問套用樣版的問題
																		versions: [{
																			id: newDraftId,
																			docType: draft.docType,
																			copy: "",	// 抄本?
																			reserveSO: false,	// 保留簽署意見
																		}]});
															// 2016.9.5 FIX APD也要新增附件
															var v = _apd[_apd.length - 1].versions[_apd[_apd.length - 1].versions.length - 1];
															if("atts" in draft && draft.atts.length > 0) {
																v.atts = [];
																for(var i=0; i<draft.atts.length; i++) {
																	v.atts.push({
																		name: draft.atts[i].ref.name,	// 識別用資訊
																		guid: draft.atts[i].ref.guid,
																		id: draft.atts[i].ref.id		// 文稿ID可能與以下用_signFolder.newDraft所加入的附件ID不同, 需再多一次同步(從_signFolder.newDraft)
																	});
																}
															}
															// 新增加入至目前封裝檔
															// 1061012 Raymond 1060962 異動撤消或封裝成功傳送失敗可能會忽略讀取SignWork.xml(因msgId不同), 須由SignWork.xml提供的applyPrintXSL、printXSLType資訊會沒有機會補述, 故增加由文稿管理檔提供
															//var newD = _signFolder.newDraft({name: draft.name, msgId: _docObj.msgId, fileName: subdir + "\\" + draft.fileName, docType: draft.docType, createTime: new Date(), guid: draft.guid, id: newDraftId, atts: draft.atts, skipX: true});	// 2016.8.10 新增atts附件, 2017.1.16 忽略同步XSignFolder
															var newD = _signFolder.newDraft({name: draft.name, msgId: _docObj.msgId, fileName: subdir + "\\" + draft.fileName, docType: draft.docType, createTime: new Date(), guid: draft.guid, id: newDraftId, atts: draft.atts, skipX: true, applyPrintXSL: draft.applyPrintXSL, printXSLType: "稿"});	// 1061012 Raymond 1060962 補充applyPrintXSL及printXSLType, printXSLType固定為'稿', 因尚未提供稿轉函功能
															
															// 2016.9.5 FIX APD新增的附件的ID要改成與newDraft的一致
															if("atts" in v) {
																if(v.atts.length == newD.attachs.length) {
																	for(var i=0; i<v.atts.length; i++) {
																		for(var j=0; j<newD.attachs.length; j++) {
																			if(v.atts[i].guid == newD.attachs[j].guid) {
																				theLogger.log("附件'" + v.atts[i].name + "'的ID從" + v.atts[i].id + "修正為" + newD.attachs[j].id);
																				v.atts[i].id = newD.attachs[j].id;
																				break;
																			}
																		}
																	}
																}
															}
															
															// 1061016 復原傳送前已匯出頁面成功的附件
															if(!!forbiddenDraft) {
																var fv = forbiddenDraft.versions[0];
																var fsd = _signFolder.getForbiddenSignDef();
																if(!!fsd) {
																	var s = fsd.findDraft(fv.id);	// 被棄用的封裝檔文稿
																	// 1080307 Raymond 因封裝成功傳送失敗造成找不到fv.id文稿
																	//if("attachs" in s) {	// 異動後有附件
																	if(!!s && "attachs" in s) {	// 異動後有附件
																		for(var m=0; m<s.attachs.length; m++) {
																			// 1130326 Raymond 1130016 修正異動撤消前文稿有附件, 異動撤消後刪除附件, 儲存關閉再開會轉圈圈的問題
																			// 1110301 Raymond 1110106 合併1080815, 支援不匯出頁面的附件
																			//if(SSO_CONFIG.enableConvertAttPage) {	// 匯出頁面資訊
																			//if(SSO_CONFIG.enableConvertAttPage && newD.attachs[m].fmt == "文稿頁面檔格式") {
																			if(SSO_CONFIG.enableConvertAttPage && !!newD.attachs[m] && newD.attachs[m].fmt == "文稿頁面檔格式") {
																				var old = {id: newD.attachs[m].id, guid: newD.attachs[m].guid, time: newD.attachs[m].time, sn: newD.attachs[m].sn, name: newD.attachs[m].name, pgs: newD.attachs[m].draftPages.pages.length};
																				//newD.attachs[m].id = _signFolder.accquireNewId();
																				//newD.attachs[m].guid = s.attachs[m].guid;
																				newD.attachs[m].time = s.attachs[m].time;
																				newD.attachs[m].draftPages.time = s.attachs[m].draftPages.time;
																				newD.attachs[m].draftPages.pages.length = 0;
																				function getFileInfo(files, sn) {
																					for(var h=0; h<files.length; h++) {
																						if(files[h].fileSN == sn) {
																							return files[h];
																						}
																					}
																					return null;
																				}
																				for(var k=0; k<s.attachs[m].draftPages.pages.length; k++) {
																					var p = _signFolder.restoreAttPage(newD.attachs[m], k);
																					//p.id = s.attachs[m].draftPages.pages[k].id;
																					//p.fileSN = s.attachs[m].draftPages.pages[k].fileSN;
																					p.time = s.attachs[m].draftPages.pages[k].time;
																					p.sn = k;
																					p.fileRef = s.attachs[m].draftPages.pages[k].fileRef;
																					if(!p.fileRef) {
																						p.fileRef = getFileInfo(fsd.obj.signInfo.files, s.attachs[m].draftPages.pages[k].fileSN);
																					}
																					newD.attachs[m].draftPages.pages.push(p);
																				}
																				newD.attachs[m].draftPages.pages.count = k;
																				theLogger.warn("還原異動撤消的附件異動資訊 - id:" + old.id + "->" + newD.attachs[m].id + ", guid:" + old.guid + "->" + newD.attachs[m].guid + ", time:" + old.time + "->" + newD.attachs[m].time + ", pages:" + old.pgs + "->" + newD.attachs[m].draftPages.pages.length);
																			}
																			else {	// 附件電子檔資訊
																				// TODO:
																			}
																		}
																	}
																}
															}
														}
													});
													// 1100730 Raymond 1100935 修正會辦單位新增稿件並夾帶附件後, 因非主辦的文稿子目錄, 沒有再從AOLProcessData.xml把附件GUID取回來, 導致後續被當做新增附件而無匯出頁面處理的問題
													for(var i=0; i<_apd.length; i++) {
														for(var j=0; j<_apd[i].versions.length; j++) {	// 用AOLProccessData各版本ID查詢封裝檔, 再將GUID寫回封裝檔物件
															try {
																var d = _signFolder.findDraftByIdAllRev(_apd[i].versions[j].id);	// 設定對象為所有版本
																if(!d.guid) {
																	theLogger.log("封裝檔文稿(ID:" + _apd[i].versions[j].id + ")無GUID, 從APD讀取: " + d.guid + "->" + _apd[i].guid);
																	d.guid = _apd[i].guid;
																}
																
																if("attachs" in d) {
																	for(var k=0; k<d.attachs.length; k++) {	// 用封裝檔的附件ID查詢AOLProccessData同一版本下的附件GUID
																		var a = d.attachs[k];
																		for(var m=0; m<_apd[i].versions[j].atts.length; m++) {
																			if(_apd[i].versions[j].atts[m].id == a.id) {
																				if(!a.guid) {
																					theLogger.log("封裝檔附件(ID:" + a.id + ")無GUID, 從APD讀取: " + a.guid + "->" + _apd[i].versions[j].atts[m].guid);
																					a.guid = _apd[i].versions[j].atts[m].guid;
																				}
																				break;
																			}
																		}
																		if(!a.guid)
																			theLogger.error("AOLProccessData之文稿(版本:" + _apd[i].versions[j].id + ")中找不到附件(ID:" + a.id + ")之GUID");
																	}
																}
															}
															catch(e) {
																theLogger.warn("AOLProccessData記錄之文稿(ID:" + _apd[i].versions[j].id + ")在封裝檔中找不到, 可能是被刪除文稿");
															}
														}
													}
												}
												else {	// 1080620 Raymond 1080520 修正在唯讀資料夾時也要讀取AOLProcessData.xml設定文稿附件的GUID, 以免後續判斷附件GUID與DraftMgmt.xml的記錄不符, 被判定為新增未匯出頁面的附件電子檔
													theLogger.warn("無可編輯文稿管理檔(唯讀模式)時, 從AOLProcessData.xml搜尋對應封裝檔文稿及附件的GUID:");
													for(var i=0; i<_apd.length; i++) {
														for(var j=0; j<_apd[i].versions.length; j++) {	// 用AOLProccessData各版本ID查詢封裝檔, 再將GUID寫回封裝檔物件
															try {
																var d = _signFolder.findDraftByIdAllRev(_apd[i].versions[j].id);	// 設定對象為所有版本
																theLogger.log("封裝檔文稿(ID:" + _apd[i].versions[j].id + "): " + d.guid + "->" + _apd[i].guid);
																d.guid = _apd[i].guid;
																
																if("attachs" in d) {
																	for(var k=0; k<d.attachs.length; k++) {	// 用封裝檔的附件ID查詢AOLProccessData同一版本下的附件GUID
																		var a = d.attachs[k];
																		for(var m=0; m<_apd[i].versions[j].atts.length; m++) {
																			if(_apd[i].versions[j].atts[m].id == a.id) {
																				theLogger.log("封裝檔附件(ID:" + a.id + "): " + a.guid + "->" + _apd[i].versions[j].atts[m].guid);
																				a.guid = _apd[i].versions[j].atts[m].guid;
																				break;
																			}
																		}
																		if(!a.guid)
																			theLogger.error("AOLProccessData之文稿(版本:" + _apd[i].versions[j].id + ")中找不到附件(ID:" + a.id + ")之GUID");
																	}
																}
															}
															catch(e) {
																theLogger.warn("AOLProccessData記錄之文稿(ID:" + _apd[i].versions[j].id + ")在封裝檔中找不到, 可能是被刪除文稿");
															}
														}
													}
												}
												
												_signFolder.xSignFolder().syncWithEnvelopeFile(_apd);	// 2017.1.12 外部簽核物件記錄檔與封裝檔記錄同步
												
												// 1110106 Raymond 1101423 修正「轉線上」(EDT213)後的公文, 開啟儲存後文稿管理檔仍殘留轉線上之前新增的舊文稿(簽核頁面看不到但發文登錄會列出)的問題, 多傳入文稿管理檔物件
												// 2016.7.27 文稿管理檔map完才會有草稿封裝檔不存在的文稿, 此時才能合併SignWork.xml中記錄的暫存簽核物件
												//_signFolder.mergeSignWork().always(function(sw) {
												_signFolder.mergeSignWork(_currMgmt).always(function(sw) {
													// 1090911 Raymond 1090564 信保特殊模式沒有刪除稿件使用情境
													if(_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2") {
													
													// 2016.10.4 有刪除文稿的ID會跟文稿管理檔不一致
													var n = _signFolder.getDraftCounts();
													for(var i=0; i<n; i++) {
														var d = _signFolder.getDraft(i);
														for(var j=0; j<_apd.length; j++) {
															// 1130123 Raymond 1120887 新增排除分會合併的文稿不要修正ID
															//if(_apd[j].guid == d.guid) {
															if(_apd[j].guid == d.guid && !d.dispatchMergedID) {
																var lastVer = _apd[j].versions[_apd[j].versions.length - 1];
																theLogger.log("文稿(GUID:" + d.guid + ")的最新版本ID由'" + lastVer.id + "'修正為'" + d.id + "'");
																lastVer.id = d.id;	// 修正APD.version的ID
																// 1090109 Raymond 1081164 修正線上簽核公文在文別轉換後, 儲存再開會發生樣版套錯的問題
																if(lastVer.docType != d.docType) {
																	if(typeof d.applyPrintXSL === "string" && d.applyPrintXSL.length > 0) {
																		theLogger.log("文稿(GUID:" + d.guid + ")的最新版本文別由'" + lastVer.docType + "'修正為'" + d.docType + "', 樣版由'" + lastVer.printXSL + "'修正為'" + d.applyPrintXSL + "'");
																		lastVer.docType = d.docType;
																		lastVer.printXSL = d.applyPrintXSL;
																	}
																	else {
																		theLogger.log("文稿(GUID:" + d.guid + ")的最新版本文別由'" + lastVer.docType + "'修正為'" + d.docType + "', 樣版由於SignWork.xsl非當前流程點不載入等原因維持為'" + lastVer.printXSL + "'");
																		lastVer.docType = d.docType;
																	}
																}
															}
														}
														
														// 2016.10.19 FIX for 合併完暫存檔未更新_newDraftIdx計數, 而導致新增文稿時重複ID問題
														if("id" in d && typeof d.id === "string" && d.id.match(/^NewDraft/)) {
															var lastNewDraftIdx = parseInt(d.id.substr(8));
															_newDraftId = Math.max(_newDraftId, lastNewDraftIdx);
															theLogger.log("最後一個新文稿編號(newDraftId)自" + _newDraftId + "編起");
														}
													}
													function getAtt(arr, guid) {
														for(var i=0; i<arr.length; i++) {
															if(arr[i].guid == guid)
																return arr.splice(i, 1)[0];
														}
														return null;
													}
													// 2016.12.1 過濾無GUID的文稿, 視為已刪除的文稿
													for(var i=n-1; i>=0; i--) {
														var d = _signFolder.getDraft(i);
														if("guid" in d && typeof d.guid === "string" && d.guid.length) {
															/* 過濾無GUID的附件, 視為已刪除的附件
															var m = ("attachs" in d)?d.attachs.length:0;
															for(var j=0; j<m; j++) {
																d.attachs[j].willDel = true;	// 先設要刪除
																for(dir in _draftMgmts) {
																	var dIdx = _draftMgmts[dir].getDraftIndex(d.guid);	// 改用getDraftIndex(GUID)來確定該文稿是否存在於這個文稿管理檔中
																	if(dIdx >= 0) {
																		for(var k=0; k<_draftMgmts[dir].getDraftAttCounts(dIdx); k++) {
																			var aGUID = _draftMgmts[dir].getDraftAttGUID(dIdx, k);
																			if(typeof aGUID === "string" && aGUID.length > 0) {
																				// 文稿管理檔中有相同GUID的附件要保留
																				if(aGUID == d.attachs[j].guid) {
																					theLogger.warn("保留GUID:" + aGUID + "的附件");
																					delete d.attachs[j].willDel;
																					break;
																				}
																			}
																		}
																		break;
																	}
																}
															}
															for(var j=m-1; j>=0; j--) {
																if("willDel" in d.attachs[j] && d.attachs[j].willDel) {
																	theLogger.warn("刪除文稿(ID:" + d.id + ")之附件(ID:" + d.attachs[j].id + ")");
																	d.attachs.splice(j, 1);
																}
															}*/
															var exists = false;	// 2017.2.10 雖然有GUID, 但若目前所有文稿管理檔都找不到該GUID的文稿, 則表示此文稿在這個流程點被刪除了(會發生的情境應該是異動撤消)
															for(dir in _draftMgmts) {
																var dIdx = _draftMgmts[dir].getDraftIndex(d.guid);
																if(dIdx >= 0) {
																	exists = true;	// 在任一文稿管理檔中找到就不是已刪除
																	// 偵測新增及重排附件
																	if(!("attachs" in d))
																		d.attachs = [];
																	else if(d.attachs.length > 0) {// 2017.2.14 檢查若是文稿頁面檔格式(匯出頁面模式, 沒有電子檔), 則忽略下段, 貌似只有會核中主辦才會走這段邏輯?
																		// 1141230 Raymond 1141058 修正在唯讀資料夾(ex.會核中-主辦)列印第1筆是不匯出頁面的附件及第2筆以後是有匯出附件頁面的附件時, 會發生a.fileRef是null的錯誤, 導致轉圈圈的問題, 取消只檢查第一筆附件是匯出頁面的判斷條件
																		//if("draftPages" in d.attachs[0] && d.attachs[0].fmt == "文稿頁面檔格式") {
																			// 1061117 Raymond 1061118 Raymond 檢查若有重新匯出頁面並缺少fileRef, 則從_draftMgmts找出對應的GUID, 重設附件fileRef.name
																			//theLogger.warn("附件為文稿頁面檔格式, 不進行文稿內附件檔比對");
																			theLogger.warn("附件為文稿頁面檔格式, 進行附件重新匯出頁面後原始檔資訊檢核");
																			for(var j=0; j<_draftMgmts[dir].getDraftAttCounts(dIdx); j++) {
																				var aGUID = _draftMgmts[dir].getDraftAttGUID(dIdx, j);
																				for(var k=0; k<d.attachs.length; k++) {
																					if(d.attachs[k].guid == aGUID && !d.attachs[k].fileRef) {
																						var fn = _draftMgmts[dir].getDraftAttFileName(dIdx, j);
																						theLogger.log("設定附件(ID:" + d.attachs[k].id + ", GUID:" + d.attachs[k].guid + ")的原始檔名為'" + fn + "'");
																						d.attachs[k].fileRef = {name: fn};
																					}
																				}
																			}
																			//break;	// 1080424 Raymond 1071206 修正異動撤消前有一個以上附件, 異動撤消後置換或新增其它附件, 暫存後再開啟會顯示成罝換前附件且再次置換附件會出現錯誤的問題
																		//}
																	}
																	// 1080905 Raymond 1080660 新增記錄是否匯出附件頁面
																	theLogger.warn("SSO_CONFIG.enableConvertAttPage=" + SSO_CONFIG.enableConvertAttPage);
																	var oldAtts = d.attachs;
																	d.attachs = [];
																	for(var j=0; j<_draftMgmts[dir].getDraftAttCounts(dIdx); j++) {
																		var aGUID = _draftMgmts[dir].getDraftAttGUID(dIdx, j);
																		var a = getAtt(oldAtts, aGUID);	// 原本附件清單有重複的GUID則保留在新清單中
																		if(!!a) {
																			theLogger.log("保留GUID:" + aGUID + "之附件在位置" + d.attachs.length);
																			d.attachs.push(a);
																			// 1060427 Raymond 新增/置換過附件後儲存再開要更新SignFolder的_lastId, 以免文件夾識別碼重複
																			_signFolder.updateLastId(d.attachs[d.attachs.length-1].id);
																			if("draftPages" in d.attachs[d.attachs.length-1] && "pages" in d.attachs[d.attachs.length-1].draftPages) {
																				for(var x=0; x<d.attachs[d.attachs.length-1].draftPages.pages.length; x++) {
																					_signFolder.updateLastId(d.attachs[d.attachs.length-1].draftPages.pages[x].id);
																				}
																			}
																		}
																		else {	// 不存在則是新增或置換的附件
																			var newAtt = {
																				guid: aGUID,
																				name: _draftMgmts[dir].getDraftAttName(dIdx, j),
																				fileRef: {},
																				fmt: "電子檔格式"
																			};
																			var subDirPath = _draftMgmts[dir].getDraftDirPath();
																			var p = subDirPath.lastIndexOf("\\");
																			subDirPath = subDirPath.substr(p + 1) + "\\";
																			var fn = _draftMgmts[dir].getDraftAttFileName(dIdx, j);
																			newAtt.fileRef.name = subDirPath + fn;
																			p = fn.lastIndexOf(".");
																			newAtt.attType = (p > 0)?fn.substr(p + 1).toUpperCase():"";
																			if(!!sw) {	// 有SignWork.xml就從其中找出對應GUID的產生時間
																				var found = false;
																				for(var k=0; k<sw.atts.length; k++) {
																					if(sw.atts[k].guid == aGUID) {
																						newAtt.time = sw.atts[k].time;
																						newAtt.sn = sw.atts[k].sn;
																						newAtt.id = sw.atts[k].id;
																						newAtt.obj = sw.atts[k].obj;
																						newAtt.fmt = sw.atts[k].fmt;	// fix
																						found = true;
																						
																						_signFolder.updateLastId(sw.atts[k].id);	// 2017.3.3 從SignWork.xml讀回上次儲存的附件時, SignFolder的_lastid要更新, 否則再新增附件會又從1開始編, 重複會導致更新附件頁面發生問題
																						
																						// 2016.12.29 補上前次已匯出的頁面資訊
																						if("name" in sw.atts[k])
																							newAtt.name = sw.atts[k].name;
																						if("attType" in sw.atts[k])
																							newAtt.attType = sw.atts[k].attType;
																						if("draftPages" in sw.atts[k]) {
																							newAtt.draftPages = {
																								time: sw.atts[k].draftPages.time,
																								method: sw.atts[k].draftPages.method,
																								dirty: sw.atts[k].draftPages.dirty,
																								pages: []
																							};
																							if("pages" in sw.atts[k].draftPages) {
																								for(var x=0; x<sw.atts[k].draftPages.pages.length; x++) {
																									newAtt.draftPages.pages.push({
																										fileRef: {name: sw.atts[k].draftPages.pages[x].fileRef.name},
																										id: sw.atts[k].draftPages.pages[x].id,
																										time: sw.atts[k].draftPages.pages[x].time,
																										flowId: sw.atts[k].draftPages.pages[x].flowId,
																										container: newAtt	// container指向Attach
																									});
																									
																									_signFolder.updateLastId(sw.atts[k].draftPages.pages[x].id);	// 2017.3.3 從SignWork.xml讀回上次儲存的附件時, SignFolder的_lastid要更新, 否則再新增附件會又從1開始編, 重複會導致更新附件頁面發生問題
																								}
																							}
																						}
																						// 1120424 Raymond 1111349 修正調閱已歸檔公文時, 若目前是啟用匯出附件頁面的設定, 但歷史公文當時可能是關閉匯出附件頁面的設定時, 忽略找不到附件頁面的提示警告
																						// 1080905 Raymond 1080660 新增檢核國合會已匯出附件頁面卻發生附件以電子檔格式記錄的問題
																						//else if(SSO_CONFIG.enableConvertAttPage) {
																						else if(SSO_CONFIG.enableConvertAttPage && !!_docObj.uiParam && !_docObj.uiParam.unv_obj) {
																							theLogger.error("SignWork.xml暫存檔記錄GUID為'" + aGUID + "'的附件(目前msgId=" + _docObj.msgId + ")無已匯出頁面, 導致錯誤記錄為電子檔格式");
																							alert("前次儲存之暫存檔中找不到應已匯出的附件頁面, 此將導致記錄錯誤\r\n請保留目前公文狀態且不要儲存, 並請洽客服人員");
																						}
																						break;
																					}
																				}
																				if(!found) {
																					// 1080905 Raymond 1080660 新增檢核國合會已匯出附件頁面卻發生附件以電子檔格式記錄的問題
																					//theLogger.error("SignWork.xml暫存檔未記錄GUID:" + aGUID + "之附件的相關資訊, 可能附件異動不是透過二代");
																					theLogger.error("SignWork.xml暫存檔未記錄GUID:" + aGUID + "之附件的相關資訊(目前msgId=" + _docObj.msgId + "), 可能附件異動不是透過二代");
																					alert("前次儲存之暫存檔中找不到對應的附件, 此將導致記錄錯誤\r\n請保留目前公文狀態且不要儲存, 並請洽客服人員");
																				}
																			}
																			// 1140425 Raymond 1140686 修正待銷號資料夾可能會發生文號-00-99下的文稿附件檔已被送銷號前的帳號異動過但未傳送, 而發生在AOLProcessData.xml中找不到對應的附件GUID的情況, 這種情況下要忽略找不到附件頁面的提示警告
																			// 1120424 Raymond 1111349 修正調閱已歸檔公文時, 若目前是啟用匯出附件頁面的設定, 但歷史公文當時可能是關閉匯出附件頁面的設定時, 忽略找不到附件頁面的提示警告
																			// 1080905 Raymond 1080660 新增檢核國合會已匯出附件頁面卻發生附件以電子檔格式記錄的問題
																			//else if(SSO_CONFIG.enableConvertAttPage) {
																			//else if(SSO_CONFIG.enableConvertAttPage && !!_docObj.uiParam && !_docObj.uiParam.unv_obj) {
																			else if(SSO_CONFIG.enableConvertAttPage && !!_docObj.uiParam && !_docObj.uiParam.unv_obj && (!theSSO.User.EnvSettings.get("MainCancelSubfolder") || theSSO.User.EnvSettings.get("MainCancelSubfolder").split(";").indexOf(_docObj.subfolder) < 0)) {
																				theLogger.error("已匯出頁面的附件(封裝檔及AOLProcessData.xml)中找不到GUID為'" + aGUID + "'的附件(目前msgId=" + _docObj.msgId + "), 導致錯誤記錄為電子檔格式");
																				alert("封裝檔中找不到對應的附件, 此將導致記錄錯誤\r\n請保留目前公文狀態且不要儲存, 並請洽客服人員");
																			}
																			theLogger.warn("新增GUID:" + aGUID + "之附件(" + newAtt.name + ")在位置" + d.attachs.length);
																			d.attachs.push(newAtt);
																		}
																	}
																	
																	break;
																}
															}
															if(!exists) {
																// 1100901 Raymond 1100750 "併辦"子文不載入文稿管理檔, 修改LOG資訊
																if(_onlyFromDoc)
																	theLogger.warn("文稿(ID:" + d.id + ", GUID:" + d.guid + ")在'併辦'子文下僅顯示來文內容, 刪除之");
																else
																theLogger.warn("文稿(ID:" + d.id + ", GUID:" + d.guid + ")在任何文稿管理檔中都找不到, 應是刪除文稿");
																_signFolder.delDraft(i);
															}
														}
														else {
															if("fromType" in d) {
																// 來文內容不能刪除
															}
															else if(d.name == "來文簽辦") {	// 2016.1.15 新增來文簽辦型態
																// TODO: 來文簽辦文稿會刪除嗎?
															}
															// 1100512 Raymond 1090821 外會公文的文稿不刪
															else if("comOrgNo" in d) {
																// 外會公文的文稿不能刪除
															}
															else {
																var guid = _lookupDraftGUID(d.id);  // 透過AOLProcessData.xml尋找對應索引值的文稿GUID
																if(typeof guid === "string" && guid.length) {	// 2016.12.2 bugfix
																	// 2016.12.2 bugfix for 刪光光
																	var dExists = false;
																	for(dir in _draftMgmts) {
																		var dIdx = _draftMgmts[dir].getDraftIndex(guid);
																		if(dIdx >= 0) {
																			dExists = true;
																			break;
																		}
																	}
																	if(dExists)
																		theLogger.warn("保留GUID:" + guid + "的文稿");
																	else {
																		theLogger.warn("文稿(ID:" + d.id + ", GUID:" + guid + ")在文稿管理檔找不到, 應是刪除文稿");
																		_signFolder.delDraft(i);
																	}
																}
																else {
																	theLogger.warn("文稿(ID:" + d.id + ")無GUID, 應是刪除文稿");
																	_signFolder.delDraft(i);
																}
															}
														}
													}
													
													// 2015.12.15 新增try-catch
													/*try {
														_signFolder.reserveSOofOtherRev(_apd.rawXml);	// 2015.4.14 新增讀取保留簽署意見功能, 2015.5.7 改為直接傳AOLProcessData.xml的DOM
													}
													catch(e) {
														theLogger.error(e.message + "-" + e.sourceURL + ":" + e.line);
													}*/
													}	// 1090911 Raymond 1090564 end of if(_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2")
													dfd.resolve();
												});
											}
											else if(_docObj.signType == "E") {	// 2016.11.29 fix for 線上簽核但是參照公文
												_signFolder.xSignFolder().syncWithEnvelopeFile(_apd);	// 2017.1.17 外部簽核物件記錄檔與封裝檔記錄同步
												// 1060804 Raymond 1060579 恢復計算各版本應保留的簽核物件
												try {
													_signFolder.reserveSOofOtherRev(_apd.rawXml);	// 2015.4.14 新增讀取保留簽署意見功能, 2015.5.7 改為直接傳AOLProcessData.xml的DOM
												}
												catch(e) {
													theLogger.error(e.message + "-" + e.sourceURL + ":" + e.line);
												}
												dfd.resolve();
											}
											else
												dfd.resolve();
										},
										error: function(errorText) {
											// 2016.2.3 找不到AOLProccessData.xml算合理
											//if(options && options.error)
											//	options.error.call(that, errorText);
											theLogger.warn(errorText);
											// 2016.7.22 線上簽核要同步文稿管理檔中有的文稿到封裝檔
											if(_docObj.signType == "E" && !that.isRefDoc()) {	// 2016.11.29 參照公文不要載入SignWork.xml
												// 1090910 Raymond 1090564 信保特殊模式無文稿管理檔
												//if(_currMgmt) {	// 2016.8.9 無可編輯的文稿管理檔時不用偵測新增文稿, 例如：待處理-會簽中
												if(_currMgmt && _docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2") {	// 2016.8.9 無可編輯的文稿管理檔時不用偵測新增文稿, 例如：待處理-會簽中
													_currMgmt.mapDrafts(function(draft, subdir) {
														theLogger.log("由於無AOLProccessData.xml(通常為草稿公文)可反查GUID, 故文稿管理檔中的文稿(" + subdir + "\\" + draft.fileName + ")皆判定為新增文稿, 同步封裝檔...");
														_newDraftId++;
														var newDraftId = "NewDraft" + _newDraftId;
														_apd.push({	guid: draft.guid,
																	subDocType: draft.subDocType,
																	lastAutoObj: 0,
																	//printXSL: draft.printXsl,
																	printXSL: draft.applyPrintXSL,	// 1060913 Raymond 1060756 修正多樣版的文稿儲存關閉後再開, 仍會詢問套用樣版的問題
																	versions: [{
																		id: newDraftId,
																		docType: draft.docType,
																		copy: "",	// 抄本?
																		reserveSO: false,	// 保留簽署意見
																	}]});
														// 2016.9.5 FIX APD也要新增附件
														var v = _apd[_apd.length - 1].versions[_apd[_apd.length - 1].versions.length - 1];
														if("atts" in draft && draft.atts.length > 0) {
															v.atts = [];
															for(var i=0; i<draft.atts.length; i++) {
																v.atts.push({
																	name: draft.atts[i].ref.name,	// 識別用資訊
																	guid: draft.atts[i].ref.guid,
																	id: draft.atts[i].ref.id		// 文稿ID可能與以下用_signFolder.newDraft所加入的附件ID不同, 需再多一次同步(從_signFolder.newDraft)
																});
															}
														}
														// 新增加入至目前封裝檔
														var newD =_signFolder.newDraft({name: draft.name, msgId: _docObj.msgId, fileName: subdir + "\\" + draft.fileName, docType: draft.docType, createTime: new Date(), guid: draft.guid, id: newDraftId, atts: draft.atts});	// 2016.8.10 新增atts附件
														
														// 2016.9.5 FIX APD新增的附件的ID要改成與newDraft的一致
														if("atts" in v) {
															if(v.atts.length == newD.attachs.length) {
																for(var i=0; i<v.atts.length; i++) {
																	for(var j=0; j<newD.attachs.length; j++) {
																		if(v.atts[i].guid == newD.attachs[j].guid) {
																			theLogger.log("附件'" + v.atts[i].name + "'的ID從" + v.atts[i].id + "修正為" + newD.attachs[j].id);
																			v.atts[i].id = newD.attachs[j].id;
																			break;
																		}
																	}
																}
															}
														}
													});
												}
												
												_signFolder.xSignFolder().syncWithEnvelopeFile();	// 2017.1.12 外部簽核物件記錄檔與封裝檔記錄同步
												
												// 2016.7.27 文稿管理檔map完才會有草稿封裝檔不存在的文稿, 此時才能合併SignWork.xml中記錄的暫存簽核物件
												_signFolder.mergeSignWork().done(function() {
													// 2016.10.4 有刪除文稿的ID會跟文稿管理檔不一致
													var n = _signFolder.getDraftCounts();
													for(var i=0; i<n; i++) {
														var d = _signFolder.getDraft(i);
														for(var j=0; j<_apd.length; j++) {
															if(_apd[j].guid == d.guid) {
																var lastVer = _apd[j].versions[_apd[j].versions.length - 1];
																theLogger.log("文稿(GUID:" + d.guid + ")的最新版本ID由'" + lastVer.id + "'修正為'" + d.id + "'");
																lastVer.id = d.id;	// 修正APD.version的ID
															}
														}
														
														// 2016.10.19 FIX for 合併完暫存檔未更新_newDraftIdx計數, 而導致新增文稿時重複ID問題
														if("id" in d && typeof d.id === "string" && d.id.match(/^NewDraft/)) {
															var lastNewDraftIdx = parseInt(d.id.substr(8));
															_newDraftId = Math.max(_newDraftId, lastNewDraftIdx);
															theLogger.log("最後一個新文稿編號(newDraftId)自" + _newDraftId + "編起");
														}
													}
													// 2016.8.18 因為AOLProccessData.xml不存在, 故printXSL要從SignWork.xml回存到SignFolder的Draft物件中再讀回
													for(var i=0; i<_apd.length; i++) {
														for(var j=0; j<_apd[i].versions.length; j++) {
															var draftId = _apd[i].versions[j].id;
															var draft = undefined;
															try {
																//draft = _signFolder.getDraftById(draftId);
																draft = _signFolder.findDraftByIdAllRev(draftId);	// 2017.1.16 改成搜尋所有版本
															}
															catch(e) {
																theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
															}
															if(!!draft && "applyPrintXSL" in draft && typeof draft.applyPrintXSL == "string" && draft.applyPrintXSL.length > 0) {
																// TODO: printXSL設定在文稿那一層, 但有可能不同流程點匯出頁面時選擇不同樣版,
																//       可能導致printXSL被改成最後匯出頁面的那一版所套用的樣版檔,
																//       歷史檢視時即時排版套用的排版設定檔不是當時該流程點所設定匯出頁面套用的樣版檔
																//if(typeof _apd[i].printXSL === "string" && _apd[i].printXSL.length > 0) {
																//	theLogger.log("APD的文稿(GUID:" + _apd[i].guid + ")的printXSL更新為'" + draft.applyPrintXSL + "'");
																//	_apd[i].printXSL = draft.applyPrintXSL;
																//}
																//else {
																//	theLogger.log("APD的文稿(GUID:" + _apd[i].guid + ")的printXSL設定為'" + draft.applyPrintXSL + "'");
																//	_apd[i].printXSL = draft.applyPrintXSL;
																//}
																if(typeof _apd[i].versions[j].printXSL === "string" && _apd[i].versions[j].printXSL.length > 0) {
																	theLogger.log("APD的文稿(GUID:" + _apd[i].guid + ")的版本[" + j + "]的printXSL從'" + _apd[i].versions[j].printXSL + "'更新為'" + draft.applyPrintXSL + "'");
																	_apd[i].versions[j].printXSL = draft.applyPrintXSL;
																}
																else {
																	theLogger.log("APD的文稿(GUID:" + _apd[i].guid + ")的版本[" + j + "]的printXSL更新為'" + draft.applyPrintXSL + "'");
																	_apd[i].versions[j].printXSL = draft.applyPrintXSL;
																}
															}
														}
													}
												}).always(function() {
													dfd.resolve();
												});
											}
											else
												dfd.reject(errorText);
										}
									});
								}
								return dfd.promise();
							}
							
							// 2016.2.24 修正若來文簽辦無任何文稿管理檔, 仍須下載AOLProccessData.xml, 因為asIcon記錄在AOLProccessData.xml
							if(deferreds.length > 0) {
								//that.draftDirPath = that.subDirPath + "\\" + _docObj.docNo + "-00-99";   // 文稿檔子目錄
								//_draftMgmt.init(that, that.fileIOWS, that.draftDirPath)
								$.when.apply(this, deferreds)
									.done(function() {
										theLogger.warn("文稿管理檔初始化完成! 耗時" + ((new Date()) - t0) + "ms");	// 2015.12.29 for 測試效能
										t0 = new Date();
										downloadAPD()	// 下載AOLProccessData.xml
										.always(function() {// 2016.7.18 若指定自樣版檔新增文稿
											if("new_draft_from_tmpl" in localStorage && localStorage['new_draft_from_tmpl'].length > 0) {
												// 1140930 Raymond 中榮序260 復原弱掃導致開啟舊檔載入的XML字串變成"&gt;函&gt;"這種形式而無法載入的問題
												//1140723	Leslie[1141011]	弱掃修正[Client DOM Stored XSS]
												that.newDraft(JSON.parse(localStorage['new_draft_from_tmpl']))
												//that.newDraft(JSON.parse(HtmlEncode(localStorage['new_draft_from_tmpl'])))
													.done(function() {
														localStorage.removeItem('new_draft_from_tmpl');
														// 2016.10.28 初始化成功後, 改呼叫postInit()以支援後續客製化邏輯
														//if(options && options.success)
														//	options.success.call(that);
														postInit();
													})
													.fail(function(errorText) {
														if(options && options.error)
															options.error.call(that, errorText);
													});
											}
											else {
												// 2016.10.28 初始化成功後, 改呼叫postInit()以支援後續客製化邏輯
												//if(options && options.success)
												//	options.success.call(that);
												postInit();
											}
										});
									})
									.fail(function(errorText) {
										// 2015.6.10 找不到管理檔時, 會回傳錯誤碼02
										if(errorText.match(/^02:/)) {
											theLogger.log("找不到文稿管理檔, 忽略下載AOLProcessData.xml");
											// 2016.10.28 初始化成功後, 改呼叫postInit()以支援後續客製化邏輯
											//if(options && options.success)
											//	options.success.call(that);
											postInit();
										}
										else if(options && options.error)
											options.error.call(that, errorText);
									});
							}
							else {
								downloadAPD()	// 下載AOLProccessData.xml
								.always(function() {// 2016.7.18 若指定自樣版檔新增文稿
									if("new_draft_from_tmpl" in localStorage && localStorage['new_draft_from_tmpl'].length > 0) {
										// 1140930 Raymond 中榮序260 復原弱掃導致開啟舊檔載入的XML字串變成"&gt;函&gt;"這種形式而無法載入的問題
										//1140723	Leslie[1141011]	弱掃修正[Client DOM Stored XSS]
										that.newDraft(JSON.parse(localStorage['new_draft_from_tmpl']))
										//that.newDraft(JSON.parse(HtmlEncode(localStorage['new_draft_from_tmpl'])))
											.done(function() {
												localStorage.removeItem('new_draft_from_tmpl');
												// 2016.10.28 初始化成功後, 改呼叫postInit()以支援後續客製化邏輯
												//if(options && options.success)
												//	options.success.call(that);
												postInit();
											})
											.fail(function(errorText) {
												if(options && options.error)
													options.error.call(that, errorText);
											});
									}
									else {
										// 2016.10.28 初始化成功後, 改呼叫postInit()以支援後續客製化邏輯
										//if(options && options.success)
										//	options.success.call(that);
										postInit();
									}
								});
							}
							
							//2016.11.1	Leslie	新增載入參考附件管理檔
							var _Folder = theAOL.docObj.folder;
							var _SubFolder = theAOL.docObj.subfolder;
							// 1140917 Raymond 屏東序1469 修正在用AKI802的文稿編輯開啟DocView時, 因基資無folder、subfolder, 而導致轉圈圈的問題
							if(!_Folder || !_SubFolder) {
								var _enableEditRefAtt = false;
							}
							else {
							var _AOL_REFATT_EDIT_FOLDER = theSSO.User.EnvSettings.get("AOL_REFATT_EDIT_FOLDER");
							//1140829	Leslie[1140985]	修正判斷公文所在文件夾的正規表示式邏輯
							var _re = new RegExp(_Folder+'-'+_SubFolder.replace(/(\()(\W)(\))/,'\\$1$2\\$3'))
							// var _enableEditRefAtt = (_AOL_REFATT_EDIT_FOLDER.match(_Folder+'-'+_SubFolder))?true:false;
							var _enableEditRefAtt = (_AOL_REFATT_EDIT_FOLDER.match(_re))?true:false;
							}	// end of else
							_refAttMgmt = new RefAttachMgmt(_enableEditRefAtt);
							var dir = (_docObj.docNo.length > 0)?_docObj.docNo+"-00-99":"00-99";
							_refAttMgmt.init(that ,that.fileIOWS, that.subDirPath + "\\" + dir)
							
							//1111012	Leslie[1110865]	新增顯示客製化簽閱附件
							//1121115	Leslie	改為一律初始化，避免其他涉及所有附件的相關功能無法使用
							_tmpAttMgmt = new TmpAttachMgmt(true);	//一律開放
							if (SSO_CONFIG.OrgNickName == "MOCS"){
								//_tmpAttMgmt = new TmpAttachMgmt(true);	//一律開放
								_tmpAttMgmt.init(that ,that.fileIOWS, that.subDirPath + "\\" + dir)
							}
							
							// 2013.9.14 - Raymond, 對應封裝檔的簽核意見
							theAOL.signComment = sf.signComment;
							// 1100928 Raymond 1100648 改成function(@RD-AOL.js), 不要直接用signFolder.currSignComment, 因為子文切回母文時, 母文model不會重新初始化, 不會重設theAOL.currSignComment, 而導致取文稿簽核意見時發生無_views而無法取得文稿資訊的問題
							// 1100708 Raymond 1100648 配合支援分文稿記錄簽核意見功能, 簽辦意見窗格的存取當前文稿的簽核意見方法改為currSignComment
							//theAOL.currSignComment = sf.currSignComment;
						})
						.fail(function(errorText) {
							if(options && options.error)
								options.error.call(that, errorText);
						});
				}
			}
			// 2016.10.28 新增doInit()成功後處理
			function postInit() {
				// 1141107 Raymond 1141113 新增下載便利貼資料檔
				if(SSO_CONFIG.OrgNickName == "TAITRA" && _docObj.signType == "E") {
					theLogger.log("下載'" + that.subDirPath + "\\NoteData.json'...");
					var t0 = new Date();
					var wfio = new WebFileIO(that.fileIOWS);
					wfio.download(that.subDirPath, "NoteData.json", {
						async: false,
						success: function(fil, res) {
							theLogger.warn("NoteData.json下載完成! 耗時" + ((new Date()) - t0) + "ms");
							_noteData = JSON.parse(fil);
							if(!!_noteData.list) {
								if(_noteData.list.length > 0) {
									_lastNoteSN = _noteData.list[_noteData.list.length - 1].sn;
									theLogger.log("最後一個便利貼SN為" + _lastNoteSN);
								}
								else
									theLogger.log("未記錄任何便利貼資訊");
							}
						},
						error: function(errorText) {
							// 找不到NoteData.json
							theLogger.log(errorText);
						}
					});
				}
				// 1140121 Raymond 1131303 新增錯別字校正資料物件檔下載
				//if(!_readOnly) {	// 公文非唯讀時才載入
				if(!_readOnly && (theSSO.offlineMode != true)) {	// 1140815 Raymond 1141232 離線模式不提供錯別字校正功能
					theLogger.log("下載'" + that.subDirPath + "\\FixWordData.json'...");
					var t0 = new Date();
					var wfio = new WebFileIO(that.fileIOWS);
					wfio.download(that.subDirPath, "FixWordData.json", {
						success: function(fil, res) {
							theLogger.warn("FixWordData.json下載完成! 耗時" + ((new Date()) - t0) + "ms");
							var obj = JSON.parse(fil);
							if(obj.msgId == _docObj.msgId)	// 同一流程點寫入的資料物件檔才載入
								_fixWordData.load(obj, _docObj.msgId);
							else {
								_fixWordData.docNo(_docObj.docNo);
								_fixWordData.msgId(_docObj.msgId);
							}
							var mySignCommentReadOnly = theSSO?.User?.EnvSettings?.get("AOL_MY_SIGNCOMMENT_READONLY") == "Y";
							if(!!theAOL.fixWordService) {
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
								else {
									theLogger.log("簽辦意見停用錯別字校正功能");
									theAOL.unbindSC();
								}
							}
						},
						error: function(errorText) {
							// 找不到FixWordData.json
							theLogger.warn(errorText);
							_fixWordData.docNo(_docObj.docNo);
							_fixWordData.msgId(_docObj.msgId);
							var mySignCommentReadOnly = theSSO?.User?.EnvSettings?.get("AOL_MY_SIGNCOMMENT_READONLY") == "Y";
							if(!!theAOL.fixWordService) {
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
								else {
									theLogger.log("簽辦意見停用錯別字校正功能");
									theAOL.unbindSC();
								}
							}
						}
					});
				}
				
				//1071224 David 1071231 紀錄是否已下載所有稿件
				var bHasDownLoadAllDraft = false;

				// 1061206 Raymond 1060815 判斷公文為已歸檔則檢核造字
				var shouldVerifyInvalidChar = ("ODWDCM" in _docObj && !!_docObj.ODWDCM && "DOC_STATE" in _docObj.ODWDCM && _docObj.ODWDCM.DOC_STATE.length > 0 && parseInt(_docObj.ODWDCM.DOC_STATE) >= 13);
				if(shouldVerifyInvalidChar) {
					theLogger.warn("公文基資的DOC_STATE(" + _docObj.ODWDCM.DOC_STATE + ")大於等於13, 表示已歸檔, 應檢核文稿是否有造字");
					//1071224 David 1071231 紀錄是否已下載所有稿件
					bHasDownLoadAllDraft = true;
					
					function verifyInvalidChar(xml, pua) {	// 文稿內文若有不合法字元會回傳true, ascii參數會加入檢出的ASCII控制碼, pua參數會加入檢出的造字碼
						function getInvalidChar(nd, pua) {	// 判斷不合法字元
							var modifiedPUA = false;
							var str = ("text" in nd)?nd.text:nd.textContent;	// 1060811 bugfix
							for(var n=0; n<str.length; n++) {
								var cc = str.charCodeAt(n);
								if(cc >= 0xE000 && cc <= 0xF8FF) {	// 造字碼
									if(nd.parentNode.nodeName == "mi" || nd.parentNode.nodeName == "fmt") {
										var $par = $(nd.parentNode).closest("主旨, 段落, 條列");
										if($par.length) {
											if($par.get(0).nodeName == "段落")
												pua.push({fld: "段落'" + $par.attr("段名") + "'", ch: str[n]});
											else if($par.get(0).nodeName == "條列")
												pua.push({fld: "條列'" + $par.attr("序號") + "'", ch: str[n]});
											else
												pua.push({fld: $par.get(0).nodeName, ch: str[n]});
										}
										else {
											theLogger.error("MI/FMT標籤不在主旨/段落/條列之下!?");
											pua.push({fld: nd.parentNode.nodeName, ch: str[n]});
										}
									}
									else if(nd.parentNode.nodeName == "段落")
										pua.push({fld: "段落'" + $(nd.parentNode).attr("段名") + "'", ch: str[n]});
									else if(nd.parentNode.nodeName == "條列")
										pua.push({fld: "條列'" + $(nd.parentNode).attr("序號") + "'", ch: str[n]});
									else
										pua.push({fld: nd.parentNode.nodeName, ch: str[n]});
									modifiedPUA = true;
								}
							}
							if(modifiedPUA)
								theLogger.warn("<" + nd.parentNode.nodeName + ">內文有造字碼, 記錄以提示警告");
							return modifiedPUA;
						}
						function doVerify(nd, pua) {
							if(nd.nodeType == 3) {	// TextNode
								return getInvalidChar(nd, pua);
							}
							else if(nd.nodeType == 1) {	// ElementNode
								var hasInvalidChar = false;
								for(var m=0; m<nd.childNodes.length; m++) {
									if(doVerify(nd.childNodes[m], pua))
										hasInvalidChar = true;
								}
								return hasInvalidChar;
							}
							// pass verify other node types(attribute、comment...)
							return false;
						}
						return doVerify(xml.documentElement, pua);
					}
					
					var n = that.getDraftCounts();
					var dfds = [], msg = [];
					for(var i=0; i<n; i++) {
						dfds.push(that.accquireDraftModel(i, i)
							.done(function(dm, idx) {
								var pua = [];	// 檢出的造字碼
								if(!!dm && verifyInvalidChar(dm.accquireXml(), pua)) {
									var str = dm.getDraftName() + ": 含有不合法的字元-- ";
									if(pua.length > 0) {
										for(var k=0; k<pua.length; k++) {
											if(k > 0)
												str += ("、" + pua[k].fld + ":" + pua[k].ch);
											else
												str += (pua[k].fld + ":" + pua[k].ch);
										}
									}
									msg.push(str);
								}
							})
							.fail(function(errorText) {
								theLogger.error(errorText);
							})
						);
					}
					$.when.apply(this, dfds)
					.always(function() {	// 貎似F5後第1次開啟公文不會等待所有accquireDraftModel done
						if(msg.length > 0)
							alert(msg.join("\r\n"));
						if(options && options.success)
							options.success.call(that);
					});
				}
				else {	// 已歸檔公文應該與重設發文日期互斥吧?
				
				// 判斷目前使用者角色若符合環境變數, 則重設發文日期(FDA客製)
				var roles = theSSO.User.EnvSettings.get("WE_RESET_ISSUE_ROLES");
				if(typeof roles === "string" && roles.length > 0 && roles.indexOf(theUserInfo.RoleID) >= 0) {
					// 1130809 Raymond 1130313 合併1111007(1100394), 修正離線版不要呼叫fnGetIssueNo
					if(!!theSSO && theSSO.offlineMode == true) {
						theLogger.log("目前角色(" + theUserInfo.RoleID + ")符合需重設發文日期環境變數設定'WE_RESET_ISSUE_ROLES'[" + roles + "], 但離線版不重設");
						if(options && options.success)
							options.success.call(that);
					}
					else {
					
					//1071224 David 1071231 紀錄是否已下載所有稿件
					bHasDownLoadAllDraft = true;

					theLogger.log("目前角色(" + theUserInfo.RoleID + ")需重設發文日期");
					var n = that.getDraftCounts();
					var dfds = [];
					//1060125 CLOUD 比照一代，發文日期無值才做重寫
					var reWriteIssueDate = true;
					
					//1060824	Leslie[1060567]	增加結案後公文的發文字號、日期自動更新邏輯
					var reAutoSetIssueWithNoApp = theSSO.User.EnvSettings.get("WE_AUTOSET_ISSUE_WITHNOAPP");
					// 1090527 Raymond 1090392 環境變數可能包含"O簽", 導致誤判「簽」為可發文文別
					//var docCloseSendDraftType = theSSO.User.EnvSettings.get("SSO_CLOSE_TYPE_SEND_DRAFTTYPE");	//可發文的稿件類型
					var docCloseSendDraftType = theSSO.User.EnvSettings.get("SSO_CLOSE_TYPE_SEND_DRAFTTYPE").split(";");	//可發文的稿件類型
					var trgt=[],bAutoSetIssueNo = (reAutoSetIssueWithNoApp == 'Y' && theAOL.docObj.getODWMSG().APP_ROLE_ID!="");
					var bUpdateIssueDateToNow = false,newIssueRes;
					//1060824	Leslie[1060567]	增加結案後公文的發文字號、日期自動更新邏輯	--新增宣告結束--
					
					for(var i=0; i<n; i++) {
						// 1071018 Cloud		Cloud		--			修正重設發文日期，變數預設值重設時間點錯誤造成異常問題
						//reWriteIssueDate = true;
						dfds.push(that.accquireDraftModel(i, i)
							.done(function(dm, idx) {
								if("fnGetIssueNo" in nsEditor && $.isFunction(nsEditor.fnGetIssueNo) && dm && dm.getEditable()) {	// 2016.11.14 bugfix, dm若是null表示是來文, 來文不需要重設發文日期, 2017.3.23 不可異動的文稿(簽稿會核單)也不能重設發文日期, 2017.4.5 bugfix
									
									//1060824	Leslie[1060567]	先取得所有需設定發文字號的稿件
									if(bAutoSetIssueNo){
										var nd = dm.nodes("//發文字號");
										if(nd.length > 0 && docCloseSendDraftType.indexOf(dm.getDocType())!=-1) {
											// 1090505 Raymond 1081101 修正開啟公文時, 要求下載文稿會有後來先至情況, 導致陣列順序未必照文稿順序的問題, 增加idx索引值資訊到陣列中
											//trgt.push({dm: dm});
											trgt.push({dm: dm, idx: idx});
										}
									}
								
									//1060125 CLOUD 比照一代，發文日期無值才做重寫
									// 1071018 Cloud	修正重設發文日期，變數預設值重設時間點錯誤造成異常問題
									reWriteIssueDate = true;
									try
									{
										if(dm.text("//發文日期/年月日")!="")
											reWriteIssueDate = false;
									}
									catch(e)
									{reWriteIssueDate = false;}
									if(reWriteIssueDate){
										var res = nsEditor.fnGetIssueNo(idx, dm, 2);
										theLogger.log("fnGetIssueNo(" + idx + ")回傳:");
										theLogger.log(res);
										if("ISSUE_DATE" in res && res.ISSUE_DATE.length > 0) {
											var d = res.ISSUE_DATE.split("/");	// fnGetIssueNo()回傳的日期格式是: 日/月/西元年
											try {
												if(dm.getDocType() == "簽")	// 一代並無檢核文別帶無國號的年月日這個邏輯, 但因為二代的簽日期欄位已改為無國號了, 所以只好檢核文別
													dm.text("//發文日期/年月日", "" + (parseInt(d[2]) - 1911) + "年" + d[1] + "月" + d[0] + "日");
												else
													dm.text("//發文日期/年月日", "中華民國" + (parseInt(d[2]) - 1911) + "年" + d[1] + "月" + d[0] + "日");
											}
											catch(e) {
												theLogger.warn(e.message);
												try {	// 文稿無發文日期的話, 再試陳核日期
													dm.text("//陳核日期/年月日", "" + (parseInt(d[2]) - 1911) + "年" + d[1] + "月" + d[0] + "日");
												}
												catch(e) {
													theLogger.warn(e.message);
												}
											}
										}
									}
									//1060824	Leslie[1060567]	發文日期已有，檢查是否需更新
									else if(bAutoSetIssueNo){
										var ndIssueDate = dm.nodes("//發文日期");
										if(ndIssueDate.length > 0){
											var sIssueDate = dm.text("//發文日期/年月日");
											theLogger.log("取得發文日期："+sIssueDate);
											if(sIssueDate != ""){
												var SystemDate = new Date();
												var	st = (SystemDate.getFullYear()-1911) + "年" + (SystemDate.getMonth()+1)+ "月"+SystemDate.getDate() + "日";
												if(sIssueDate.replace("中華民國","") != st){
													if(bUpdateIssueDateToNow == false && !newIssueRes){
													//當前稿件的發文日期，不等於系統日期，詢問是否自動更新，僅第一份文稿詢問即可
														if(confirm("文稿紀錄之發文日期與當前系統日期不同，是否自動更新?")){
															newIssueRes = nsEditor.fnGetIssueNo(idx, dm, 2);
															bUpdateIssueDateToNow = true;
														}
													}
													if(bUpdateIssueDateToNow && "ISSUE_DATE" in newIssueRes && newIssueRes.ISSUE_DATE.length > 0){
														var d = newIssueRes.ISSUE_DATE.split("/");	// fnGetIssueNo()回傳的日期格式是: 日/月/西元年
														try {
															if(dm.getDocType() == "簽")	// 一代並無檢核文別帶無國號的年月日這個邏輯, 但因為二代的簽日期欄位已改為無國號了, 所以只好檢核文別
																dm.text("//發文日期/年月日", "" + (parseInt(d[2]) - 1911) + "年" + d[1] + "月" + d[0] + "日");
															else
																dm.text("//發文日期/年月日", "中華民國" + (parseInt(d[2]) - 1911) + "年" + d[1] + "月" + d[0] + "日");
														}
														catch(e) {
															theLogger.warn(e.message);
															try {	// 文稿無發文日期的話, 再試陳核日期
																dm.text("//陳核日期/年月日", "" + (parseInt(d[2]) - 1911) + "年" + d[1] + "月" + d[0] + "日");
															}
															catch(e) {
																theLogger.warn(e.message);
															}
														}
													}
												}
											}
										}
									}
									//1060824	Leslie[1060567]	發文日期已有，檢查是否需更新	--更新現有發文日期結束--
								}
							})
							.fail(function(errorText) {
								theLogger.error(errorText);
							})
						);
					}
					
					
					
				
					$.when.apply(this, dfds)
					//1060824	Leslie[1060567]	增加結案後公文的發文字號、日期自動更新邏輯
					.done(function(){
						if(bAutoSetIssueNo){
							//啟用自動更新發新字號、日期，且目前公文已有核決者(結案)
							var x = trgt.length;
							// 1090505 Raymond 1081101 修正重設支號時, 因陣列順序未必照文稿順序, 導致文稿支號未連續的問題, 依新增的idx索引值先排序
							if(x > 1) {
								trgt.sort(function(a, b) {return a.idx - b.idx;});
							}
							try {
								var res = nsEditor.fnGetIssueNo(x, trgt[0].dm);
								theLogger.log("fnGetIssueNo(" + x + ")回傳:");
								theLogger.log(res);
								//設定各稿件發文字號
								if(res) {
									if("IssueNo_no" in res) {
										if(SSOUtil.typeOf(res.IssueNo_no) == "array") {
											if(res.IssueNo_no.length == trgt.length) {	// 回傳支號陣列數與可設定發文字號稿數相符
												theLogger.log("目前公文文號:" + theAOL.docObj.docNo);
												for(var i=0; i<res.IssueNo_no.length; i++) {
													try {
														trgt[i].dm.text("//發文字號/字", res.IssueWord);
														// 1100927 Raymond 修正取得發文字號時, 以回傳值的IssueYear為年度, 回傳值的IssueNo為流水號
														//trgt[i].dm.text("//發文字號/文號/年度", theAOL.docObj.docNo.substr(0, 3));
														//trgt[i].dm.text("//發文字號/文號/流水號", theAOL.docObj.docNo.substr(3, 7));
														trgt[i].dm.text("//發文字號/文號/年度", res.IssueYear);
														trgt[i].dm.text("//發文字號/文號/流水號", res.IssueNo);
														trgt[i].dm.text("//發文字號/文號/支號", res.IssueNo_no[i]);
													}
													catch(e) {
														theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
													}
												}
											}
											else if(res.IssueNo_no.length == 0) {	// 回傳支號陣列數為0, 應是不需取支號的機關
												theLogger.log("目前公文文號:" + theAOL.docObj.docNo);
												for(var i=0; i<trgt.length; i++) {
													try {
														trgt[i].dm.text("//發文字號/字", res.IssueWord);
														// 1100927 Raymond 修正取得發文字號時, 以回傳值的IssueYear為年度, 回傳值的IssueNo為流水號
														//trgt[i].dm.text("//發文字號/文號/年度", theAOL.docObj.docNo.substr(0, 3));
														//trgt[i].dm.text("//發文字號/文號/流水號", theAOL.docObj.docNo.substr(3, 7));
														trgt[i].dm.text("//發文字號/文號/年度", res.IssueYear);
														trgt[i].dm.text("//發文字號/文號/流水號", res.IssueNo);
													}
													catch(e) {
														theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
													}
												}
											}
											else
												theLogger.error("回傳支號陣列數(" + res.IssueNo_no.length + ")與可設定發文字號稿數(" + x + ")不相符");
										}
										else
											theLogger.error("回傳值的IssueNo_no不是陣列!");
									}
									else
										theLogger.error("回傳格式無IssueNo_no! 無法設定發文支號");
								}
								else
									theLogger.error("無回傳無法設定發文字號");
							}
							catch(e) {
								theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
							}
						}
					})
					//1060824	Leslie[1060567]	增加結案後公文的發文字號、日期自動更新邏輯	--END--
					.always(function() {
						if(options && options.success)
							options.success.call(that);
					});
					}
				}
				else {
					if(typeof roles === "string" && roles.length > 0)
						theLogger.log("目前角色(" + theUserInfo.RoleID + ")非需重設發文日期的角色之一, 不重設發文日期");
					else
						theLogger.log("環境變數(WE_RESET_ISSUE_ROLES)未設定, 無法判斷目前角色是否應重設發文日期, 不重設發文日期");
					if(options && options.success)
						options.success.call(that);
				}
				}
				
				//1071224 David 1071231 目前資料夾為符合參數設定的資料夾且尚未下載所有稿件時，再下載所有稿件
				var arrCheckAllDraftClsFolder = theSSO.User.SystemSets.get('CHECK_ALL_DRAFT_CLS_FOLDER').split(';');
				for(var iCheck=0; iCheck<arrCheckAllDraftClsFolder.length; iCheck++) {
					if(arrCheckAllDraftClsFolder[iCheck] != "" && arrCheckAllDraftClsFolder[iCheck] == _docObj.folder + "-" + _docObj.subfolder){
						bNeedCheckAllDraftCls = true;
						if(!bHasDownLoadAllDraft){
							var dfds = [];
							for(var i=0; i<that.getDraftCounts(); i++) {
								dfds.push(that.accquireDraftModel(i));
							}
							$.when.apply(this, dfds)
							.always(function() {
								if(options && options.success)
									options.success.call(that);
							});
						}
						break;
					}
				}
				
				// 1130123 Raymond 1120887 檢查若有非第1筆的分會合併的文稿, 則事先下載, 以免不點擊該文稿時儲存, 無法儲存該文稿的異動流程點資訊到外部簽核記錄檔
				var n = _signFolder.getDraftCounts();
				for(var i=1; i<n; i++) {	// 第1筆預設會開啟, 不需要特別下載
					var d = _signFolder.getDraft(i);
					if(!!d.dispatchMergedID) {
						theLogger.log("'" + d.name + "'為非第1筆的分會合併的文稿, 預先下載, 以避免不點擊該文稿時儲存, 無法儲存該文稿的異動流程點資訊到外部簽核記錄檔");
						that.accquireDraftModel(i).done(function(dm) {
							if(!!dm) {	// 來文無dm
								dm.getInternalFO().done(function(fo) {
									theLayoutEng.instanciateSOPages(fo, $("#pgBackBuffer"), {}, 0, _docObj, dm, false).done(function() {
										theLogger.log("dm.signAreas:", dm.signAreas);
									});
								});
							}
						});
					}
				}
			}
		},
		registerView: function(view) {  // 註冊View物件
			for(var i=0; i<_views.length; i++) {
				if(_views[i] == view) {
					theLogger.log("重複註冊View物件");
					return -1;
				}
			}
			// 2016.8.23 目前只會且只能有一個FolioView存在
			for(var i=0; i<_views.length; i++) {
				_views[i].closeView();
			}
			_views.length = 0;
			
			_views.push(view);
			return _views.length - 1;
		},
		revokeView: function(view) {    // 反註冊View物件, 目前無用
			_views.splice(_views.indexOf(view), 1);
		},
		closeView: function() {	// 2016.8.23 關閉View
			for(var i=0; i<_views.length; i++) {
				if($.isFunction(_views[i].closeView))
					_views[i].closeView();
			}
			_views.length = 0;
		},
		
		getSignFolder: function() {
			return _signFolder;
		},
		getSignType: function() {	// 2016.8.8 新增回傳signType
			return _docObj.signType;
		},
		getDocObj: function() {		// 2016.8.10 新增回傳基資docObj
			return _docObj;
		},
		getDraftPageCounts: function(idx) {
			if(_docObj.signType == "P") {	// 2016.6.22 支援紙本簽核
				// 1110112 Raymond 1101596 新增紙本公文開啟時顯示前一次儲存的(分頁後總)頁數
				//return 0;
				if(idx >= 0 && idx < _currMgmt.getDraftCounts())
					return _currMgmt.getDraftPageCounts(idx);
				throw new Error("要求取得第" + idx + "個文稿的頁數, 超出範圍");
			}
			if(idx < 0 || idx >= _signFolder.getDraftCounts()) {
				if(idx >= 0 && _currMgmt && idx < _currMgmt.getDraftCounts())	// 2016.6.17 新增文稿只會記錄在文稿管理檔
					return 0;
				throw new Error("要求取得第" + idx + "個文稿的頁數, 超出範圍");
			}
			return _signFolder.getDraftPageCounts(idx);
		},
		getDraftPage: function(idx, po) {
			if(_docObj.signType == "P") {	// 2016.6.22 支援紙本簽核
				return null;
			}
			return _signFolder.getDraftPage(idx, po);
		},
		getAttPageCounts: function(draftIdx, idx) {
			if(_docObj.signType == "P") {	// 2016.6.22 支援紙本簽核
				return 0;
			}
			return _signFolder.getAttPageCounts(draftIdx, idx);
		},
		getAttPage: function(draftIdx, idx, po) {
			if(_docObj.signType == "P") {	// 2016.6.22 支援紙本簽核
				return null;
			}
			return _signFolder.getAttPage(draftIdx, idx, po);
		},
		//getPageImage: function(pg, cbdata) {	// 2016.11.1 新增cbdata參數
		getPageImage: function(pg, cbdata, disp) {	// 1090828 Raymond 1090529 新增disp參數, 值為true時檢查是否應套用強制顯示浮水印, 否則檢核是否應套用強制浮水印
			if(_docObj.signType == "P") {	// 2016.6.22 支援紙本簽核
				return null;
			}
			//return _signFolder.getPageImage(pg, cbdata);	// 2016.11.1 pass新增的cbdata參數給_signFolder.getPageImage
			return _signFolder.getPageImage(pg, cbdata, disp);	// 1090828 Raymond 1090529 pass新增的disp參數給_signFolder.getPageImage
		},
		// 1090424 Raymond 1090305 新增傳入noDirty參數true時不要設定該文稿有異動, 以避免簽核物件位於簽核框(最末頁)外時, 會出現找不到頁面ID的問題
		// 2015.10.1 新增頁次
		//newDraftPage: function(idx) {
		newDraftPage: function(idx, noDirty) {
			if(_docObj.signType == "P") {	// 2016.6.22 支援紙本簽核
				return null;
			}
			// 1090424 Raymond 1090305 新增傳入noDirty參數true時不要設定該文稿有異動, 以避免簽核物件位於簽核框(最末頁)外時, 會出現找不到頁面ID的問題
			//return _signFolder.newDraftPage(idx);
			return _signFolder.newDraftPage(idx, noDirty);
		},
		
		save: function(options) {	// 2016.9.21 新增options參數
			var that = this;
			var dfd = $.Deferred();
			var i = 0, deferreds = new Array();		// 並聯處理不固定數量Deferred物件的方法
			var preceed = new Array();				// 先置處理(下載調整順序前的附件電子檔)
			var wfio = new WebFileIO(that.fileIOWS);
			var upSeq = true;						// 2016.12.12 改採循序方式上傳電子檔, 以排除WebFileIO multi entry問題
			var q = new Array();					// 2016.12.12 循序上傳的queue
			
			if(typeof options !== "undefined" && options.delAllDrafts) {
				theLogger.log("儲存作業指定刪除所有文稿...");
				// 1100914 Raymond 1101143 修正新增文稿後儲存, 接著退文刪除文稿管理檔後, 若退文失敗, 再接著儲存的話, 會造成文稿管理檔不存在但SignWork.xml卻存在的問題而導致「要求取得第0 個文稿模型物件，超出範圍」無法開啟公文的問題
				function delFiles() {	// 用callback function包住刪除文稿管理檔及暫存工作檔的功能, 於退文成功時再由RD-Submit.js呼叫
				var files = [];
				if(_currMgmt) {
					files.push({filePath: _currMgmt.getDraftDirPath(),
								fileName: "DraftMgmt.xml"});
					theLogger.log("刪除文稿管理檔...");
				}
				theLogger.log("刪除工作檔...")
				files.push({filePath: that.subDirPath,
							fileName: "SignWork.xml"});
				return wfio.del(files)	// 直接回傳Deferred物件
					.done(function() {
						theLogger.log("成功");
						//dfd.resolve();	// 退文成功時再呼叫此callback, 故不要用save()的dfd來resolve
					})
					.fail(function(errorText) {
						theLogger.log("失敗!" + errorText);
						//dfd.reject(errorText);	// 退文成功時再呼叫此callback, 故不要用save()的dfd來reject
					});
				}
				
				//1140610	Leslie[1131183]	[Merge-1111006]新增應刪除的檔案清單並做為第2個回傳值
				var files = [];
				if(_currMgmt) {
					files.push({filePath: _currMgmt.getDraftDirPath(),
								fileName: "DraftMgmt.xml"});
					theLogger.log("傳送成功後應刪除文稿管理檔'" + _currMgmt.getDraftDirPath() + "\\DraftMgmt.xml'");
				}
				files.push({filePath: that.subDirPath,
							fileName: "SignWork.xml"});
				theLogger.log("傳送成功後應刪除工作檔'" + that.subDirPath + "\\SignWork.xml'");
				
				if(_currMgmt)
					_currMgmt.dirty(true);	// 將文稿管理檔先設為dirty, 若退文失敗, 再按儲存即可上傳
				//1140610	Leslie[1131183]	[Merge-1111006]新增應刪除的檔案清單並做為第2個回傳值
				// dfd.resolve(delFiles);	// 不要刪除文稿管理檔及暫存工作檔, 直接回傳callback function
				dfd.resolve(delFiles, files);	// 不要刪除文稿管理檔及暫存工作檔, 直接回傳callback function
				return dfd.promise();
			}
			
			// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式不要呼叫copy
			if(!theSSO || theSSO.offlineMode != true) {
			// 1110913 Raymond 1111068 修正資料夾rule為readOnly但可傳送情況下(ex.通知-回閱), 傳送時仍會執行儲存並上傳SignWork.xml, 導致覆蓋掉同時間在其它資料夾暫存但未傳送的簽核物件等資料的問題
			var uiState = window._getUIStatus(_docObj, _docObj.uiParam);
			if(uiState.readOnly) {
				theLogger.warn("目前資料夾(" + _docObj.folder + "-" + _docObj.subfolder + ")為唯讀, 忽略儲存上傳公文電子檔案");
				dfd.resolve();
				return dfd.promise();
			}
			
			// 2016.7.22 新增判斷要號後要更名封裝檔, 2016.7.27 線上與紙本簽核都要更名
			//if(_signFolder.ecapFileName == "X.XML" && _docObj.docNo.length > 0) {	// 原草稿封裝檔要號後須更名	
			if(_docObj.docNo.length > 0 && _signFolder.ecapFileName.indexOf(_docObj.docNo) == -1 ) {	// 原草稿封裝檔要號後須更名	//2017.2.6	Leslie	變更判斷條件，看看會不會減少"文號-X.XML"沒上傳的發生率
				wfio.copy(that.subDirPath, _signFolder.ecapFileName, that.subDirPath, _docObj.docNo + "-X.XML")
					.done(function() {
						theLogger.log("草稿封裝檔已更名為'" + _docObj.docNo + "-X.XML'");
						_signFolder.ecapFileName = _docObj.docNo + "-X.XML";	// 套用新檔名, 以免第2次儲存會多複製一次
					})
					.fail(function(err) {
						theLogger.error("草稿封裝檔更名失敗! " + err.errCode + ":" + err.errMsg);
						dfd.reject("草稿封裝檔更名失敗! " + err.errCode + ":" + err.errMsg);	//2017.2.6	Leslie	增加失敗後處理
						return dfd.promise();
					});
			}
			}	// end of if(!theSSO || theSSO.offlineMode != true)
			// 1110527 Raymond 1110527 新增特定資料夾(預設:會核中-主辦)為可編輯文稿時, 先下載文稿管理檔檢核一遍其最後儲存者若不是自己且不是目前下載的文稿管理檔記錄的前一流程點的使用者(表示在本次開啟公文後有別人異動儲存過), 則提示警告訊息
			var verifyOverwriteFldrs = ["會核中-主辦"],
				strOverwriteReason = "";
			if((!theSSO || theSSO.offlineMode != true) &&	// 離線模式不要檢核, 1110602 Raymond 修正, 共通版沒有離線模式, 1130809 Raymond 1130313 修正, 共通版有離線模式了
				that.enableEdit() && verifyOverwriteFldrs.indexOf(_docObj.folder + "-" + _docObj.subfolder) >= 0) {
				theLogger.log("目前公文資料夾[" + _docObj.folder + "-" + _docObj.subfolder + "]符合應檢核文稿可能被不正確覆蓋的資料夾, 先下載目前在Server上的文稿管理檔");
				
				function isSameUser(sessA, sessB) {
					return (sessA.msgId == sessB.msgId && sessA.userId == sessB.userId && sessA.name == sessB.name);	// 同時比對3個屬性相同才算同一人
				}
				var sessLcl = _currMgmt.getAllTCSess();
				var me = sessLcl[sessLcl.length - 1];
				var prv = (sessLcl.length > 1)?sessLcl[sessLcl.length - 2]:null;
				
				var dmgtSvr = new DraftMgmt();
				dmgtSvr.init(that, that.fileIOWS, _currMgmt.getDraftDirPath())
				.done(function() {
					var sessSvr = dmgtSvr.getAllTCSess();
					if(sessSvr.length > 0) {
						if(isSameUser(sessSvr[sessSvr.length - 1], me)) {
							// 1120216 Raymond 1111313 修正使用者在會核中-主辦開啟公文, 儲存公文時在檢核到伺服器上文稿已為其它使用者上傳, 而使用者選擇覆蓋上傳後, 於會核中-主辦第二次再開啟儲存, 會將第一次覆蓋文稿管理檔(及文稿檔)原因清空的問題
							if(!!sessSvr[sessSvr.length - 1].overwriteReason) {
								strOverwriteReason = sessSvr[sessSvr.length - 1].overwriteReason + "(儲存時間:" + sessSvr[sessSvr.length - 1].lastModified + ")";	// 繼續寫回覆蓋原因並加上前次儲存記錄的時間
								theLogger.log("伺服器上目前的文稿管理檔記錄的最後流程點是自己(但有前次儲存時覆蓋別的流程點的記錄:" + sessSvr[sessSvr.length - 1].overwriteReason + "), 檢核通過!");
							}
							else
							theLogger.log("伺服器上目前的文稿管理檔記錄的最後流程點是自己, 檢核通過!");
							proceedLast();
						}
						else if(!!prv && isSameUser(sessSvr[sessSvr.length - 1], prv)) {
							if(sessSvr[sessSvr.length - 1].lastModified == prv.lastModified) {
								theLogger.log("伺服器上目前的文稿管理檔記錄的最後流程點是已下載文稿管理檔的前一個流程點使用者, 檢核通過!");
								proceedLast();
							}
							else {
								var tm = sessSvr[sessSvr.length - 1].lastModified;
								tm = tm.substr(0, 3) + "/" + tm.substr(3, 2) + "/" + tm.substr(5, 2) + " " + tm.substr(7, 2) + ":" + tm.substr(9, 2) + ":" + tm.substr(11);
								var msg = "伺服器上目前的文稿管理檔為[" + sessSvr[sessSvr.length - 1].name + "](MsgId:" + sessSvr[sessSvr.length - 1].msgId + ")異動後於" + tm + "再次儲存的內容";
								if(confirm(msg + "\r\n請問是否覆蓋?")) {
									theLogger.warn(msg + ", 使用者選擇覆蓋!");
									strOverwriteReason = msg + ", 使用者選擇覆蓋!";	// 1110531 Raymond 1110527 將覆蓋文稿管理檔(及文稿檔)原因記錄起來
									proceedLast();
								}
								else {
									theLogger.warn(msg + ", 使用者選擇不覆蓋!");
									dfd.reject(msg + ", 使用者選擇不覆蓋, 中止儲存作業!");
								}
							}
						}
						else {
							var msg = "伺服器上目前的文稿管理檔為[" + sessSvr[sessSvr.length - 1].name + "](MsgId:" + sessSvr[sessSvr.length - 1].msgId + ")異動後儲存的內容";
							if(confirm(msg + "\r\n請問是否覆蓋?")) {
								theLogger.warn(msg + ", 使用者選擇覆蓋!");
								strOverwriteReason = msg + ", 使用者選擇覆蓋!";	// 1110531 Raymond 1110527 將覆蓋文稿管理檔(及文稿檔)原因記錄起來
								proceedLast();
							}
							else {
								theLogger.warn(msg + ", 使用者選擇不覆蓋!");
								dfd.reject(msg + ", 使用者選擇不覆蓋, 中止儲存作業!");
							}
						}
					}
					else {
						theLogger.error("伺服器上目前的文稿管理檔未記錄任何流程點使用者, 無法檢核是否可覆蓋儲存!");
						dfd.reject("伺服器上目前的文稿管理檔未記錄任何流程點使用者, 無法檢核是否可覆蓋儲存!");
					}
				})
				.fail(function(errorText) {
					theLogger.error("下載伺服器上目前的文稿管理檔失敗! 無法檢核是否可覆蓋儲存! " + errorText);
					dfd.reject("下載伺服器上目前的文稿管理檔失敗! 無法檢核是否可覆蓋儲存! " + errorText);
				});
			}
			else {
				proceedLast();
			}
			function proceedLast() {	// 1110527 Raymond 1110527 將上傳程序包成function, 不需檢核檔案覆蓋或檢核通過時再呼叫
			if(_docObj.signType == "P") {	// 紙本簽核
				// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式不要檢查Server上是否存在「文號-X.XML」
				if(!theSSO || theSSO.offlineMode != true) {
				//1060607	Leslie[1060328]	於紙本有文號的公文，儲存時補檢查「文號-X.XML」是否存在，若否，則重新執行更名搬移
				if(_docObj.docNo.length > 0 && _signFolder.ecapFileName.indexOf(_docObj.docNo) != -1 ){
					wfio.download(that.subDirPath, _docObj.docNo + "-X.XML", {
						keepRawData: true,	
						success: function(fil, all) {
							//已存在，什麼事也不做
						},
						error: function(errorText) {
							//檔案不存在，重新copy X.XML -> 文號-X.XML
							if(errorText.indexOf(_docObj.docNo + '-X.XML不存在') != -1){
								wfio.copy(that.subDirPath, "X.XML", that.subDirPath, _docObj.docNo + "-X.XML")
								.done(function() {
									theLogger.log("重新複製封裝檔，並更名為'" + _docObj.docNo + "-X.XML'");
									_signFolder.ecapFileName = _docObj.docNo + "-X.XML";	// 套用新檔名, 以免第2次儲存會多複製一次
								})
								.fail(function(err) {
									theLogger.error("重新複製封裝檔更名失敗! " + err.errCode + ":" + err.errMsg);
									alert("重新複製封裝檔更名失敗! 請洽系統管理員，錯誤訊息：" + err.errCode + ":" + err.errMsg);	//直接Alert()
								});
							}
						}
					});
				}
				}	// end of if(!theSSO || theSSO.offlineMode != true)
				for(var i=0; i<_currMgmt.getDraftCounts(); i++) {
					if(_cachedDM[i] !== undefined) {
						//if(_cachedDM[i].dirty()) {
						if(_cachedDM[i].getEditable()) {	// 1061205 Raymond 文稿可異動才儲存
							_cachedDM[i].save({
								success: function(index, path, fname, fnameCmpl, xml) {
									theLogger.log("儲存[" + (index + 1) + "] - '" + fname + "'...");
									// 1090213 Raymond 修正傳字串時, in指令會發生Error的問題
									//if("xml" in xml)	// for IE-compatible
									if(!!xml.xml)
										theLogger.log(xml.xml);
									else
										theLogger.log(xml);
									if(upSeq)	// 2016.12.12 改採循序方式上傳電子檔
										q.push({fp: path, fn: fname, dat: xml});
									else
										deferreds.push(wfio.upload(path, fname, xml));
									if(typeof fnameCmpl === "string" && fnameCmpl.length > 0) {	// 2016.10.26 檢查有無傳完稿檔名, 因為上傳分繕變數檔不會傳這個參數
										// 1100217 Raymond 1090610 儲存公文時儲存的完稿XML, 不要轉出群組受文者中的成員受文者, 以節省儲存所耗費時間
										//var cmplXml = transCmplXml(xml);	// 2016.12.7 轉成完稿XML
										var cmplXml = transCmplXml(xml, true);	// 2016.12.7 轉成完稿XML
										if(!!cmplXml) {
											if(upSeq)	// 2016.12.12 改採循序方式上傳電子檔
												q.push({fp: path, fn: fnameCmpl, dat: cmplXml});
											else
												deferreds.push(wfio.upload(path, fnameCmpl, cmplXml));	// 2016.7.29 上傳完稿XML
										}
										else
											theLogger.error("轉換完稿XML失敗, 無法上傳'" + fnameCmpl + "'");
									}
								}
							});
							_currMgmt.saveDraftAtts(i, {	// 2016.7.12 新增儲存附件、分繕表等額外電子檔案
								//1071108	Leslie	修正於新增附件，且同時調整順序時，第二次儲存會造成附件錯誤(傳入attId，用於更新OrigFileName)
								//rename: function(index, name, path, fname, origFileName) {	// 應更名的附件檔要先下載再上傳
								rename: function(index, name, path, fname, origFileName, hasDocNo, attId, guid) {
									theLogger.log("更名儲存[" + (index + 1) + "]['" + name + "'] - '" + origFileName + "' -> '" + fname + "'...");
									var dfd2 = $.Deferred();
									wfio.download(path, origFileName, {
										keepRawData: true,	// 2016.7.13 保持原始資料格式(Typed Array)
										success: function(fil, all) {
											if(upSeq){	// 2016.12.12 改採循序方式上傳電子檔
												//1071108	Leslie	修正於新增附件，且同時調整順序時，第二次儲存會造成附件錯誤(更名後，應立即更新目前使用中的附件資訊)
												//q.push({fp: path, fn: fname, dat: fil});
												q.push({fp: path, fn: fname, dat: fil, param: {
														success: function(newFileName, newPathName) {
															_currMgmt.reSetAttachOrigFileName(attId,newFileName);
														}
												}});
											}
											else{
												//1071108	Leslie	修正於新增附件，且同時調整順序時，第二次儲存會造成附件錯誤(更名後，應立即更新目前使用中的附件資訊)
												//deferreds.push(wfio.upload(path, fname, fil));
												deferreds.push(wfio.upload(path, fname, fil, {
														success: function(newFileName, newPathName) {
															_currMgmt.reSetAttachOrigFileName(attId,newFileName);
														}
												}));
											}
											
											//1130611	Leslie[銓敘部-序36]	增加檢查附件是否存在
											q.push({method: "check", fp: path, fn: fname});
											
											dfd2.resolve();
										},
										error: function(errorText) {
											dfd2.reject(errorText);
										}
									});
									preceed.push(dfd2.promise());
								},
								success: function(index, name, path, fname, origFileName) {
									if(origFileName.match(/^blob:/)) {	// 2016.9.1 FIX
										theLogger.log("儲存[" + (index + 1) + "]['" + name + "'] - '" + fname + "', '" + origFileName + "'...");
										if(upSeq)	// 2016.12.12 改採循序方式上傳電子檔
											q.push({fp: path, fn: fname, dat: origFileName, isBlobUrl: true});
										else
											deferreds.push(wfio.uploadAtt(path, fname, origFileName));
									}
									else {
										//1120509	Leslie[1110513]	儲存時，補上檢核附件是否存在正確位置
										//1130611	Leslie[銓敘部-序36]	改為一律檢查附件是否存在
										//q.push({method: "check", fp: path, fn: fname});
										theLogger.log("[" + (index + 1) + "]['" + name + "'] - '" + origFileName + "'前一次儲存己上傳, 本次忽略");
									}
									
									//1130611	Leslie[銓敘部-序36]	改為一律檢查附件是否存在
									q.push({method: "check", fp: path, fn: fname});
								},
								//1060713	Leslie[1060561]	修正紙本簽核儲存時，參照線上簽核公文的處理方式，搬移附件檔
								moveDraftAtt: function(index, name, path, fname, origFileName){
									var srcAttPath = path.replace(theAOL.docObj.docNo+"-","");
									theLogger.log("搬移[" + (index + 1) + "]['" + name + "'] - '" + fname + "', '" + srcAttPath + "'...");
									if(upSeq)	// 2016.12.12 改採循序方式上傳電子檔
										q.push({method: "copy", srcfp: srcAttPath, srcfn: fname, fp: path, fn: fname});
									else
										deferreds.push(wfio.copy(srcAttPath,fname, path, fname, null));
								}
							});
						//}
						//_cachedDM[i].needRetransFO(true);	// 2016.1.13 存檔後要重新產生FO, 雖然不知道為什麼
						}
					}
				}
				// 1111226 Raymond 1111401 DraftMgmt更改dirty()切割出getSessionDirty(), 代表是編輯階段序號的異動, 故關閉公文只要判斷dirty(), 儲存公文則是dirty()加getSessionDirty()任一成立就上傳文稿管理檔
				// 1061211 Raymond 可異動文稿管理檔才儲存
				//if(_currMgmt.dirty()) {
				//if(_currMgmt.dirty() && _currMgmt.getEditable()) {
				if((_currMgmt.dirty() || _currMgmt.getSessionDirty()) && _currMgmt.getEditable()) {
					_currMgmt.save({
						success: function(path, fname, xml) {
							theLogger.log("儲存文稿管理檔...");
							if("xml" in xml)	// for IE-compatible
								theLogger.log(xml.xml);
							else
								theLogger.log(xml);
							if(upSeq)	// 2016.12.12 改採循序方式上傳電子檔
								q.push({fp: path, fn: fname, dat: xml});
							else
								deferreds.push(wfio.upload(path, fname, xml));
						},
						overwriteReason: strOverwriteReason		// 1110531 Raymond 1110527 新增儲存覆蓋原因
					});
				}
				
				// 1140123 Raymond 1131303 新增儲存上傳錯別字校正資料物件檔
				deferreds.push(_fixWordData.save().done(function(obj) {
					var str = JSON.stringify(obj);
					return wfio.upload(that.subDirPath, "FixWordData.json", WebFileIO.prototype.utf8.encode(str));
				}));
				// 1060427 Raymond 須更名附件檔的下載需在完成後才能執行最後上傳等待作業
				// 2016.7.12 新增preceed要先下載的物件
				//if(preceed.length > 0) {
				//	$.when.apply(this, preceed).done(function() {
				//		theLogger.log("須更名附件檔已先下載完成!");
				//	});
				//}
				
				// 1060427 Raymond 最後上傳等待作業以函式包住, 供後續判斷是否應先下載須更名附件檔再呼叫
				function doFinal() {
					if(upSeq) {	// 2016.12.12 改採循序方式上傳電子檔
						if(q.length > 0) {	// 2016.12.14 bugfix for 紙本可能沒有任何檔案要上傳
							var it = 0;
							function doSingle() {
								var job = q[it++];
								theLogger.warn("循序上傳電子檔[" + it + "]: '" + job.fn + "'");
								//1060713	Leslie[1060561]	配合修正紙本簽核公文的附件要號後搬移功能，參照線上簽核儲存邏輯，增加copy功能
								if("method" in job && job.method == "copy") {	// 2016.12.16 bugfix job.type->job.method
									wfio.copy(job.srcfp, job.srcfn, job.fp, job.fn, null)
									.done(function() {
										if(it == q.length) {
											theLogger.log("-=全部異動文稿附件及文稿管理檔上傳完畢=-");
											dfd.resolve(null);
										}
										else
											doSingle();
									})
									.fail(function(errorText) {
										theLogger.log("-=異動文稿或附件未全部上傳=-" + errorText);
										dfd.reject(errorText);
									});
								}
								//1120509	Leslie[1110513]	新增檢查檔案是否存在的功能，搭配原循序流程去叫用
								else if('method' in job && job.method == 'check'){
									var params = new SOAPClientParameters();
									params.add('argFilePath', job.fp+'\\'+job.fn);
									
									SOAPClient.invokeJSON(that.fileIOWS, 'CheckFileExist', params, true,function(rslt){
										if (typeof rslt === 'object') {
											if(!rslt.value){
												//查無檔案，或路徑異常
												dfd.reject(`檢查檔案時發現異常，在[${job.fp}]找不到[${job.fn}]。`);												
											}
											else{
												if(it == q.length) {
													theLogger.log("-=全部異動文稿附件及文稿管理檔上傳完畢=-");
													dfd.resolve(null);
												}
												else
													doSingle();
											}
										}
										else {
											theLogger.log("CheckFileExist fail!")
											dfd.reject("CheckFileExist fail!");
										}
									});
								}
								else if(job.isBlobUrl) {
								//if(job.isBlobUrl) {
								//1060713	Leslie[1060561]	配合修正紙本簽核公文的附件要號後搬移功能，參照線上簽核儲存邏輯，增加copy功能	--END--
									wfio.uploadAtt(job.fp, job.fn, job.dat)
									.done(function() {
										if(it == q.length) {
											theLogger.log("-=全部異動文稿附件及文稿管理檔上傳完畢=-");
											dfd.resolve(null);
										}
										else
											doSingle();
									})
									.fail(function(errorText) {
										theLogger.log("-=異動文稿或附件未全部上傳=-" + errorText);
										dfd.reject(errorText);
									});
								}
								else {
									//1071108	Leslie	配合附件更名後，需回Call更名後處理函式，比照線上簽核的上傳階段，增加傳入job.param
									//wfio.upload(job.fp, job.fn, job.dat)
									wfio.upload(job.fp, job.fn, job.dat, job.param)
									.done(function() {
										if(it == q.length) {
											theLogger.log("-=全部異動文稿附件及文稿管理檔上傳完畢=-");
											dfd.resolve(null);
										}
										else
											doSingle();
									})
									.fail(function(errorText) {
										theLogger.log("-=異動文稿或附件未全部上傳=-" + errorText);
										dfd.reject(errorText);
									});
								}
							};
							doSingle();
						}
						else {	// 2016.12.14 bugfix for 紙本可能沒有任何檔案要上傳
							theLogger.log("紙本簽核無任何檔案要上傳");
							dfd.resolve(null);
						}
					}
					else {
						// 並聯處理不固定數量Deferred物件的方法
						$.when.apply(this, deferreds).done(function() {
							theLogger.log("-=全部異動文稿附件及文稿管理檔上傳完畢=-");
							dfd.resolve(null);
						})
						.fail(function(errorText) {
							theLogger.log("-=異動文稿或附件未全部上傳=-" + errorText);
							dfd.reject(errorText);
						});
					}
				}
				// 1060427 Raymond 須更名附件檔的下載需在完成後才能執行最後上傳等待作業
				if(preceed.length > 0) {
					$.when.apply(this, preceed).done(function() {
						theLogger.log("須更名附件檔已先下載完成!");
						doFinal();
					});
				}
				// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式下將公文電子檔打包成一個ZIP檔下載
				if(!!theSSO && theSSO.offlineMode == true) {
					var zip = new JSZip();
					var it = 0;
					function doPack() {
						var job = q[it++];
						if(!job) {
							theLogger.log("打包完成產生下載BLOB...");
							zip.generateAsync({type:"blob"})
							.then(function(content) {
								var url = URL.createObjectURL(content);
								console.log("\t%c'" + url + "%c'(" + content.size + " bytes)", "color:lightblue;", "color:lightblue;");
								var link = document.createElement("a");
								link.href = url;
								link.download = "公文製作文稿檔_" + theUserInfo.UserID + "_" + ((_docObj.docNo.length > 0)?_docObj.docNo:"無文號") + ".zip";
								document.body.appendChild(link);
								link.click();
								document.body.removeChild(link);
								dfd.resolve(null);
							});
						}
						else if("method" in job && job.method == "copy") {
							theLogger.log("離線模式不需要更名已上傳Server的電子檔");
							doPack();
						}
						// 1130813 Raymond 1130313 新增離線模式下忽略檢核Server上電子檔是否已存在的功能
						else if("method" in job && job.method == "check") {
							theLogger.log("離線模式不需要檢核Server上的電子檔是否已存在");
							doPack();
						}
						else if(job.isBlobUrl) {	// 附件電子檔
							theLogger.log("離線模式打包附件電子檔-" + job.fn, job.dat);
							var xhr = new XMLHttpRequest();
							xhr.open('GET', job.dat, true);
							xhr.responseType = 'blob';
							xhr.onload = function(e) {
								if (this.status == 200) {
									console.log("\t'" + job.dat + "'(" + this.response.size + " bytes)");
									zip.file(job.fn, this.response);
									doPack();
								}
								else
									console.warn(this.status);
							};
							xhr.onerror = function(e) {
								theLogger.error("失敗!", e);
							};
							xhr.send();
						}
						else {
							theLogger.log("離線模式打包文稿電子檔-" + job.fn);
							// 1130813 Raymond 1130313 修正打包.di檔時, 判斷job.dat為字串時, 直接打包ZIP
							if(typeof job.dat === "string") {
								zip.file(job.fn, job.dat);
							}
							else {
								var xmlstr = Util.getXml(job.dat, false, "UTF-8");	// 指定encoding屬性為UTF-8, 因為下載後的檔案會變成UTF-8
								zip.file(job.fn, xmlstr);
							}
							doPack();
						}
					}
					doPack();
				}
				else {
					doFinal();
				}
			}
			else {	// 線上簽核
				// 1060724 Raymond 1060604 新增檢核外部簽核記錄檔的簽核物件座標是否差異太大功能
				var vsResult = _signFolder.xSignFolder().verifySavable();
				if(!vsResult.pass) {
					dfd.reject(vsResult.msg);
					return dfd.promise();
				}
				// 1120811 Raymond 1120503 新增判斷儲存動作為"傳送", 再判斷異動文稿是否為"簽", 及是否含有自訂表格, 若含則在客戶端先產生文稿頁面再儲存
				var pregenpage = [];
				
				//1060817	Leslie[1060740]	加try-catch，以嚐試截取異常訊息
				try{
					for(i=0; i<_signFolder.getDraftCounts(); i++) {
						if(_cachedDM[i] !== undefined) {    // _cachedDM所記錄的文稿是固定順序, 非push
							//if(_cachedDM[i].dirty()) {      // 有開啟的文稿才有機會異動?
							// 1141218 Raymond 北榮序453 當因為自動增高簽核區域而異動內文時, 要能儲存
							//if(_cachedDM[i].getEditable()) {	// 1061205 Raymond 文稿可異動才儲存
							if(_cachedDM[i].getEditable() || _cachedDM[i].changedForSALP()) {	// 1061205 Raymond 文稿可異動才儲存
								// 1110602 Raymond 1110512 新增儲存時, 若文稿未記錄有異動再檢核文稿內是否有本流程點新增的追蹤修訂異動, 有則改為文稿有異動, 以避免傳送時未匯出頁面的問題
								if(!_signFolder.getDraft(i).dirty()) {
									// 1130105 Raymond 1120887 修正會辦單位可編輯主辦單位的簽稿會核單時, 用_currMgmt不能取得文稿檔名的問題
									//var sn = _currMgmt.getEditSN(),
									var sn = _cachedDM[i].getEditSN(),
										dn = _cachedDM[i].getDraftName(),
										dguid = _cachedDM[i].getDraftGUID(),
										// 1130105 Raymond 1120887 修正會辦單位可編輯主辦單位的簽稿會核單時, 用_currMgmt不能取得文稿檔名的問題
										//dfn = _currMgmt.getDraftFileName(dguid);
										dfn = _cachedDM[i].getDraftFileName();
									theLogger.log("檢核文稿'" + dn + "'(" + dfn + ")檔內容是否有本流程點(追蹤修訂階段序號:" + sn + ")新增的追蹤修訂異動...");
									var xmlDoc = _cachedDM[i].accquireXml();
									if("evaluate" in xmlDoc) {	// Non-IE
										var snapshot = xmlDoc.evaluate("/*//mi[@sn='" + sn + "']", xmlDoc, null, 7, null);
										if(snapshot.snapshotLength > 0) {
											theLogger.warn("文稿'" + dn + "'(" + dfn + ")檔內容有本流程新增的追蹤修訂異動(" + snapshot.snapshotLength + "處), 但記錄卻是無異動, 修正為有異動");
											_cachedDM[i].dirty(true);
										}
									}
									else if("selectNodes" in xmlDoc) {	// IE
										var nds = xmlDoc.selectNodes("/*//mi[@sn='" + sn + "']");
										if(nds.length > 0) {
											theLogger.warn("文稿'" + dn + "'(" + dfn + ")檔內容有本流程新增的追蹤修訂異動(" + nds.length + "處), 但記錄卻是無異動, 修正為有異動");
											_cachedDM[i].dirty(true);
										}
									}
								}
								// 1141020 Raymond 1141013 新增檢核是否允許便簽也提供自訂表格功能
								// 1120811 Raymond 1120503 新增判斷儲存動作為"傳送", 再判斷異動文稿是否為"簽", 及是否含有自訂表格, 若含則在客戶端先產生文稿頁面再儲存
								//if(_saveAction == "傳送" && _cachedDM[i].getDocType() == "簽" && _cachedDM[i].hasCTBL()) {
								//	console.log("傳送前儲存, " + _cachedDM[i].getDraftName() + "之文別為'簽', 且有自訂表格, 應先在各戶端匯出文稿頁面");
								if(_saveAction == "傳送" && (_cachedDM[i].getDocType() == "簽" || (theSSO.User.EnvSettings.get("WE_ENABLE_CUSTOM_TABLE_FOR_便簽") == "Y" && _cachedDM[i].getDocType() == "便簽")) && _cachedDM[i].hasCTBL()) {
									console.log("傳送前儲存, " + _cachedDM[i].getDraftName() + "之文別為'" + _cachedDM[i].getDocType() + "', 且有自訂表格, 應先在各戶端匯出文稿頁面");
									pregenpage.push(_cachedDM[i]);
								}
								_cachedDM[i].save({
									success: function(index, path, fname, fnameCmpl, xml) {	// 2016.2.2 新增第2參數, 原文稿下載的子目錄路徑, 2016.7.29 新增第4參數, 完稿檔名
										// 1090115 Raymond 1081166 修正傳字串時, in指令會發生Error的問題
										//if("xml" in xml)	// for IE-compatible
										if(!!xml.xml)
											theLogger.log(xml.xml);
										else
											theLogger.log(xml);
										if(upSeq)	// 2016.12.12 改採循序方式上傳電子檔
											q.push({fp: path, fn: fname, dat: xml});
										else
											deferreds.push(wfio.upload(path, fname, xml));		// 2016.2.2 上傳子目錄改以傳入的path
										if(typeof fnameCmpl === "string" && fnameCmpl.length > 0) {	// 2016.10.26 檢查有無傳完稿檔名, 因為上傳分繕變數檔不會傳這個參數
											// 1100217 Raymond 1090610 儲存公文時儲存的完稿XML, 不要轉出群組受文者中的成員受文者, 以節省儲存所耗費時間
											//var cmplXml = transCmplXml(xml);	// 2016.12.7 轉成完稿XML
											var cmplXml = transCmplXml(xml, true);	// 2016.12.7 轉成完稿XML
											if(!!cmplXml) {
												if(upSeq)	// 2016.12.12 改採循序方式上傳電子檔
													q.push({fp: path, fn: fnameCmpl, dat: cmplXml});
												else
													deferreds.push(wfio.upload(path, fnameCmpl, cmplXml));	// 2016.7.29 上傳完稿XML
											}
											else
												theLogger.error("轉換完稿XML失敗, 無法上傳'" + fnameCmpl + "'");
										}
									}
								});
							//}
							_cachedDM[i].needRetransFO(true, false);	// 2016.1.13 存檔後要重新產生FO, 雖然不知道為什麼, 2017.2.9 新增第2參數dirty, 正常省略第2參數的情形下, 會自動設為dirty, 但此處僅要更新FO不要設dirty
							}
						}
					}
				}catch(e){
					//1060817	Leslie[1060740]	增加寫出ExceptionLog
					window.ExceptionLog("執行文稿上傳前準備時發生錯誤! " + e.message,e);
					
					theLogger.error("執行文稿上傳前準備時發生錯誤! " + e.message);
					dfd.reject(e.message);
					return dfd.promise();
				}
				
				//1060817	Leslie[1060740]	加try-catch，以嚐試截取異常訊息
				try{
					for(dir in _draftMgmts) {	// 2016.2.1 文稿管理檔有複數改為集合物件, KEY是子目錄名
						// 1130109 Raymond 1120887 新增判斷會辦單位可編輯簽稿會核單的會辦意見區時, 及主辦單位的文稿管理檔內的文稿有異動時, 可儲存主辦單位的文稿管理檔
						// 1111226 Raymond 1111401 DraftMgmt更改dirty()切割出getSessionDirty(), 代表是編輯階段序號的異動, 故關閉公文只要判斷dirty(), 儲存公文則是dirty()加getSessionDirty()任一成立就上傳文稿管理檔
						// 1061205 Raymond 可異動文稿管理檔才儲存
						//if(_draftMgmts[dir].dirty()) {
						//if(_draftMgmts[dir].dirty() && _draftMgmts[dir].getEditable()) {
						//if((_draftMgmts[dir].dirty() || _draftMgmts[dir].getSessionDirty()) && _draftMgmts[dir].getEditable()) {
						if((_draftMgmts[dir].dirty() || _draftMgmts[dir].getSessionDirty() || _draftMgmts[dir].hasDraftModified()) && (_draftMgmts[dir].getEditable() || _draftMgmts[dir].canEditCon())) {
							_draftMgmts[dir].save({
								success: function(path, fname, xml) {	// 儲存的callback介面也增加dirPath, 因不同文稿管理檔存在不同子目錄
									theLogger.log("儲存文稿管理檔...");
									if("xml" in xml)	// for IE-compatible
										theLogger.log(xml.xml);
									else
										theLogger.log(xml);
									if(upSeq)	// 2016.12.12 改採循序方式上傳電子檔
										q.push({fp: path, fn: fname, dat: xml});
									else
										deferreds.push(wfio.upload(path, fname, xml));
								},
								overwriteReason: strOverwriteReason		// 1110531 Raymond 1110527 新增儲存覆蓋原因
							});
							var n = _draftMgmts[dir].getDraftCounts();
							for(var i=0; i<n; i++) {
								_draftMgmts[dir].saveDraftAtts(i, {	// 2016.7.20 新增儲存附件、分繕表等額外電子檔案
									//rename: function(index, name, path, fname, origFileName, hasDocNo, attId) {	// 應更名的附件檔要先下載再上傳		//2016.12.6	Leslie	增加傳入目前附件在附加時，是否已取號	//2016.12.7	Leslie	增加傳入附件idx	//2016.12.13	Leslie	改傳id去對應，attIdx→attId
									rename: function(index, name, path, fname, origFileName, hasDocNo, attId, guid) {	// 應更名的附件檔要先下載再上傳	//2017.2.17	Leslie	太長寫到下一行，增加傳入guid給signfolder比對用
										theLogger.log("更名儲存[" + (index + 1) + "]['" + name + "'] - '" + origFileName + "' -> '" + fname + "'...");
										var srcAttPath = path;
										if( !hasDocNo && theAOL.docObj.docNo != ""){
											srcAttPath = path.replace(theAOL.docObj.docNo+"-","");
										}
										var dfd2 = $.Deferred();
										wfio.download(srcAttPath, origFileName, {	//2016.12.6	Leslie	改用srcAttPath
											keepRawData: true,	// 2016.7.20 保持原始資料格式(Typed Array)
											success: function(fil, all) {
												if(upSeq) {	// 2016.12.12 改採循序方式上傳電子檔
													// 2016.12.7	Leslie	更名後，應立即更新目前使用中的附件資訊
													//deferreds.push(wfio.upload(path, fname, fil));
													q.push({fp: path, fn: fname, dat: fil, param: {
														success: function(newFileName, newPathName) {
															_draftMgmts[dir].reSetAttachOrigFileName(attId,newFileName);	//更新DraftMtmt._attachs		//2016.12.13	Leslie	改傳id去對應，attIdx→attId
															var subDir = newPathName.split('\\').pop();
															_signFolder.reSetAttachRefFileName(index, guid, subDir+'\\'+newFileName);		//2016.12.13	Leslie	改傳id去對應，attIdx→attId	//2017.2.17	Leslie	改為傳入guid給signfolder比對用
														}
													}});
												}
												else {
													// 2016.12.7	Leslie	更名後，應立即更新目前使用中的附件資訊
													//deferreds.push(wfio.upload(path, fname, fil));
													deferreds.push(wfio.upload(path, fname, fil, {
														success: function(newFileName, newPathName) {
															_draftMgmts[dir].reSetAttachOrigFileName(attId,newFileName);	//更新DraftMtmt._attachs	//2016.12.13	Leslie	改傳id去對應，attIdx→attId
															var subDir = newPathName.split('\\').pop();
															_signFolder.reSetAttachRefFileName(index, attId, subDir+'\\'+newFileName);	//2016.12.13	Leslie	改傳id去對應，attIdx→attId
														}
													}));
												}
												
												//1130611	Leslie[銓敘部-序36]	改為一律檢查附件是否存在
												q.push({method: "check", fp: path, fn: fname});
												
												dfd2.resolve();
											},
											error: function(errorText) {
												dfd2.reject(errorText);
											}
										});
										preceed.push(dfd2.promise());
									},
									success: function(index, name, path, fname, origFileName, hasDocNo) {		// 2016.12.2	Leslie	增加傳入目前附件在附加時，是否已取號
										// 1141125 Raymond 1141255 取消附件匯出頁面時由工作站上傳附件原始檔, 客戶端不上傳的機制(ImgCovert2), 改回一律由客戶端上傳附件原始檔
										// 1110301 Raymond 1110106 合併1080815, 判斷是否為不匯出頁面的附件格式
										//1050919	Leslie	配合附件匯出頁面時，已將附件原始檔上傳至公文所在目錄，故略過儲存時的附件上傳邏輯
										//if(SSO_CONFIG.enableConvertAttPage){
										/*var shouldConvertAttPage = SSO_CONFIG.enableConvertAttPage;
										if(SSO_CONFIG.enableConvertAttPage && "WE_ALLOW_RAW_ATTACH_FMT" in theSSO.User.SystemSets && theSSO.User.SystemSets.get("WE_ALLOW_RAW_ATTACH_FMT").length > 0) {
											var dot = fname.lastIndexOf(".");
											if(dot > 0) {
												if(theSSO.User.SystemSets.get("WE_ALLOW_RAW_ATTACH_FMT").indexOf(fname.substr(dot + 1).toUpperCase()) >= 0) {
													theLogger.log("附件'" + fname + "'符合不匯出頁面格式, 應上傳原始檔");
													shouldConvertAttPage = false;
												}
											}
											else
												theLogger.warn("附件電子檔無副檔名, 無法判斷是否為不匯出頁面之格式");
										}
										if(SSO_CONFIG.enableConvertAttPage && shouldConvertAttPage){
											// 1051201	Leslie	若於未取號前執行附件匯出頁面，則需將檔案由"00-99"搬到"文號-00-99"目錄
											if( !hasDocNo && theAOL.docObj.docNo != ""){
												var srcAttPath = path.replace(theAOL.docObj.docNo+"-","");
												theLogger.log("搬移[" + (index + 1) + "]['" + name + "'] - '" + fname + "', '" + srcAttPath + "'...");
												if(upSeq)	// 2016.12.12 改採循序方式上傳電子檔
													q.push({method: "copy", srcfp: srcAttPath, srcfn: fname, fp: path, fn: fname});
												else
													deferreds.push(wfio.copy(srcAttPath,fname, path, fname, null));
											}
											else{
												//1120509	Leslie[1110513]	儲存時，補上檢核附件是否存在正確位置
												//1130611	Leslie[銓敘部-序36]	改為一律檢查附件是否存在
												//q.push({method: "check", fp: path, fn: fname});
												theLogger.log("[" + (index + 1) + "]['" + name + "'] - '" + origFileName + "'於匯出頁面時已上傳, 本次忽略");
											}
										}
										else{*/
											if(origFileName.match(/^blob:/)) {	// 2016.9.1 FIX
												theLogger.log("儲存[" + (index + 1) + "]['" + name + "'] - '" + fname + "', '" + origFileName + "'...");
												if(upSeq)	// 2016.12.12 改採循序方式上傳電子檔
													q.push({fp: path, fn: fname, dat: origFileName, isBlobUrl: true});
												else
													deferreds.push(wfio.uploadAtt(path, fname, origFileName));
											}
											else {
												theLogger.log("[" + (index + 1) + "]['" + name + "'] - '" + origFileName + "'前一次儲存己上傳, 本次忽略");
											}
										//}	end of else // 1141125 Raymond 1141255 取消附件匯出頁面時由工作站上傳附件原始檔, 客戶端不上傳的機制, 改回一律由客戶端上傳附件原始檔
										
										//1130611	Leslie[銓敘部-序36]	改為一律檢查附件是否存在
										q.push({method: "check", fp: path, fn: fname});
									},
									moveDraftAtt: function(index, name, path, fname, origFileName){
										var srcAttPath = path.replace(theAOL.docObj.docNo+"-","");
										theLogger.log("搬移[" + (index + 1) + "]['" + name + "'] - '" + fname + "', '" + srcAttPath + "'...");
										if(upSeq)	// 2016.12.12 改採循序方式上傳電子檔
											q.push({method: "copy", srcfp: srcAttPath, srcfn: fname, fp: path, fn: fname});
										else
											deferreds.push(wfio.copy(srcAttPath,fname, path, fname, null));
									}
								});
							}
						}
					}
				}
				catch(e){
					//1060817	Leslie[1060740]	增加寫出ExceptionLog
					window.ExceptionLog("執行附件及管理檔儲存前準備時發生錯誤! " + e.message,e);
					
					theLogger.error("執行附件及管理檔儲存前準備時發生錯誤! " + e.message);
					dfd.reject(e.message);
					return dfd.promise();
				}
				
				// 1120811 Raymond 1120503 新增判斷儲存動作為"傳送", 再判斷異動文稿是否為"簽", 及是否含有自訂表格, 若含則在客戶端先產生文稿頁面再儲存
				if(pregenpage.length > 0) {
					var dIdx = 0;
					function doGenPage() {	// 匯出頁面會共用window.tmpHtml, 須循序不能平行處理
						if(dIdx < pregenpage.length) {
							pregenpage[dIdx++].genPage().done(doGenPage);
						}
						else {
							theLogger.log("預先匯出文稿頁面已完成");
							proceedLastLast();
						}
					}
					doGenPage();
				}
				else
					proceedLastLast();
				function proceedLastLast() {
					// 1121012 Raymond 北大彙整表序255 新增檢核簽核框外簽核物件是否位於應重新匯出的頁面上, 卻不可編輯內文, 是則顯示警告並中斷儲存
					i = 0;
					var checkSOSavable = true;
					_signFolder.enumAllPages(function(pg) {
						//theLogger.log("pg#" + (++i) + ":");
						//theLogger.log(pg);
						if("newSignObjs" in pg) {	// 新增的簽核物件
							for(var j=0; j<pg.newSignObjs.length; j++) {
								var nSO = pg.newSignObjs[j];
								console.log(nSO);
								// 1121025 Raymond 北大彙整表序255(1120907) 修正不可異動內文的文稿, 蓋章在簽核框外時儲存/傳送會轉圈圈的問題
								// 1121020 Raymond 北大彙整表序255(1120907) 修正會辦單位蓋章在簽核框外時無法傳送的問題(未判斷蓋章的頁次是否為不存在封裝檔內的頁次)
								//if((!nSO.signArea || !nSO.saType || !nSO.saID) && !!nSO.boundTo && !!nSO.boundTo.container && "docType" in nSO.boundTo.container && !nSO.boundTo.container.dirty()) {	// 簽核物件為框外物件且簽核物件所在頁次屬於文稿本文, 但文稿未標記已異動
								//if((!nSO.signArea || !nSO.saType || !nSO.saID) && !!nSO.boundTo && !nSO.boundTo.fileSN && !!nSO.boundTo.container && "docType" in nSO.boundTo.container && !nSO.boundTo.container.dirty()) {	// 增加檢核簽核物件所在頁次是否無fileSN, 無則表示是不存在封裝檔的頁次
								if((!nSO.signArea || !nSO.saType || !nSO.saID) && !!nSO.boundTo && !nSO.boundTo.fileSN && !!nSO.boundTo.container && "docType" in nSO.boundTo.container && !!nSO.boundTo.container.docType) {	// 排版頁數超過封裝檔頁數時文稿會標記已異動, 但因文稿不可異動, 無法重新匯出新增的頁次, 加蓋的簽核物件會無法記錄, 必須中止儲存
									if(!that.confirmDraftEditable(nSO.boundTo.container)) {
										theLogger.warn("簽核框外簽核物件位於不存在封裝檔的頁次, 且文稿不可異動, 無法記錄此簽核物件");
										checkSOSavable = false;
										break;
									}
								}
							}
						}
					});
					if(!checkSOSavable) {
						dfd.reject("無法儲存：\n簽核框外的簽核物件加蓋在封裝檔不存在的頁次(可能是排版設定檔異動或瀏覽器不同造成匯出頁面有差異所導致)，且本流程點不可異動此文稿，請將加蓋於簽核框外的的簽核物件刪除或移回簽核框內。");
						return dfd.promise();
					}
				var pregenpagesn = 0;	// 預先匯出的文稿頁面影像檔名流水號
				try {	// 2017.3.23 新增try-catch
					var signWork = new SignWork(that, _signFolder, function(page) {	// 2016.7.20 新增收集須上傳附件匯出頁面影像, 2016.12.15 傳入that(FolioModel)參數給SignWork()
						theLogger.log("儲存附件頁面 - '" + page.fileRef.name + "'...");	// 檔名
						if("content" in page) {	// 2016.9.12 新增匯出頁面時不要下載實體檔資料到客戶端資源
							if(page.content.match(/^data:image\/([a-z]+);base64,/)) {
								var bin = page.content.substr(19 + RegExp.$1.length);
								//theLogger.log(bin);
								bin = Base64.decode(bin);
								//theLogger.log(bin);
								if(upSeq)	// 2016.12.12 改採循序方式上傳電子檔
									q.push({fp: that.subDirPath, fn: page.fileRef.name, dat: bin});
								else
									deferreds.push(wfio.upload(that.subDirPath, page.fileRef.name, bin));
							}
							// 1141125 Raymond 1141255 新增判斷若匯出頁面是暫存在工作站上的位置, 則呼叫工作站的WebFileIO搬移暫存的頁面影像檔至FileServer
							// 1141213 Leslie[國合會版更問題]	修正正規表示式
							// else if(page.content.match(/^http[s]:\/\//i)) {
							else if(page.content.match(/^http[s]?:\/\//i)) {
								theLogger.log("附件頁面檔在工作站上暫存目錄下, 儲存時搬移至FileServer...");
								if(page.fileRef.name.lastIndexOf('\\') > 0) {
									var sp = page.fileRef.name.lastIndexOf('\\'),
										srcAttPath = page.fileRef.name.substr(0, sp),
										fname = page.fileRef.name.substr(sp + 1),
										srcWFIO = page.content.substr(0, page.content.indexOf("IMGTRAN.ASHX")) + "ImgConvertWS.asmx";
									page.fileRef.name = fname;	// 附件頁面更名
									if(upSeq)	// 2016.12.12 改採循序方式上傳電子檔
										q.push({method: "copy", srcwfio: srcWFIO, srcfp: srcAttPath, srcfn: fname, fp: that.subDirPath, fn: fname, param: {success: function() {
											theLogger.log("搬移成功, ...");
											delete page.content;
										}}});
									else
										deferreds.push((new WebFileIO(srcWFIO)).copy(srcAttPath, fname, that.subDirPath, fname, {toWebFileIOUrl: that.fileIOWS}).done(function() {
											theLogger.log("搬移成功, ...");
											delete page.content;
										}));
								}
								else
									theLogger.error("附件頁面檔非全徑名, 無法搬移");
							}
							else {
								theLogger.warn("附件頁面非影像檔!?");
								theLogger.log(page);
							}
						}
						else {
							theLogger.warn("附件頁面不是以本地資源暫存, 不必上傳");
						}
					}, function(secretarySignCommentDoc) {	// 1070111 Raymond 1060452 若是鐵工局秘書, 須上傳秘書的簽辦意見為獨立檔案
						theLogger.log("儲存秘書簽辦意見...");
						if(upSeq)
							q.push({fp: that.subDirPath, fn: "SecretarySignComment.xml", dat: secretarySignCommentDoc});
						else
							deferreds.push(wfio.upload(that.subDirPath, "SecretarySignComment.xml", secretarySignCommentDoc));
					}, function(pgp) {	// 1120811 Raymond 1120503 新增上傳客戶端預先產生的文稿頁面影像檔
						if(pgp.imgData.match(/^data:image\/([a-z]+);base64,/)) {
							var ext = RegExp.$1;
							var bin = pgp.imgData.substr(19 + ext.length);
							//theLogger.log(bin);
							bin = Base64.decode(bin);
							//theLogger.log(bin);
							pgp.uploadFileName = "NewDraft-P-" + Util.padLeft(++pregenpagesn, 4) + "." + ext;
							theLogger.log("儲存文稿頁面 - '" + pgp.uploadFileName + "'...");	// 檔名
							if(upSeq)	// 2016.12.12 改採循序方式上傳電子檔
								q.push({fp: that.subDirPath, fn: pgp.uploadFileName, dat: bin});
							else
								deferreds.push(wfio.upload(that.subDirPath, pgp.uploadFileName, bin));
						}
						else {
							theLogger.warn("附件頁面非影像檔!?");
							theLogger.log(page);
						}
					});
				}
				catch(e) {
					//1060817	Leslie[1060740]	增加寫出ExceptionLog
					window.ExceptionLog("準備暫存資料時發生錯誤! " + e.message,e);
					
					theLogger.error("準備暫存資料時發生錯誤! " + e.message);
					dfd.reject(e.message);
					return dfd.promise();
				}
				i = 0;
				_signFolder.enumAllPages(function(pg) {
					theLogger.log("pg#" + (++i) + ":");
					theLogger.log(pg);
					// 新增的簽核物件
					if("newSignObjs" in pg) {
						for(var j=0; j<pg.newSignObjs.length; j++) {
							var newSO = pg.newSignObjs[j];
							// 1141117 Raymond 1141442 修正RegExp.$1可能是空值, 會導致上傳發生錯誤的問題
							//if(newSO.content.match(/^data:image\/([a-z]+);base64,/)) {
							//	theLogger.log("match! '" + RegExp.$1 + "'");
							var m = newSO.content.match(/^data:image\/([a-z]+);base64,/);
							if(!!m && m.length > 1) {
								theLogger.log("match! '" + m[1] + "'");
								
								// 2015.5.15 數位墨水簽核物件要轉回白底圖檔
								if(newSO.type == "sketch") {
									// 並聯處理不固定數量Deferred物件的方法
									deferreds.push(function(nso, que) {
									
										nso.maskBkgnd = "Y";	// 設成去背
									
										var dfd = $.Deferred();
										
										// 加工轉成沒有alpha的圖檔
										var img = new Image();
										img.onload = function(evt) {
											theLogger.log("將數位墨水轉成沒有alpha的圖檔...");
											var w = evt.target.width;
											var h = evt.target.height;
											var can = $("<canvas width='" + w + "px' height='" + h + "px'></canvas>");  // 未append到DOM中的Canvas在FF下可能無法使用
											var ctx = can.get(0).getContext("2d");
											ctx.drawImage(evt.target, 0, 0);
											var imgData = ctx.getImageData(0, 0, w, h);
											var r, g, b, a, q = 0, z = 0;
											for(var y=0; y<h; y++) {
												for(var x=0; x<w; x++, z+=4) {
													r = imgData.data[q++];
													g = imgData.data[q++];
													b = imgData.data[q++];
													a = imgData.data[q++];
													if(a == 0) {    // 透明則設定成白色
														imgData.data[z] = 255;
														imgData.data[z+1] = 255;
														imgData.data[z+2] = 255;
														imgData.data[z+3] = 255;
													}
													else	// 其餘不透明或半透明都設成不透明
														imgData.data[z+3] = 255;
												}
											}
											ctx.putImageData(imgData, 0, 0);
											var newContent = can.get(0).toDataURL();
											
											// 1141117 Raymond 1141442 修正RegExp.$1可能是空值, 會導致上傳發生錯誤的問題
											//if(newContent.match(/^data:image\/([a-z]+);base64,/)) {
											//	var bin = newContent.substr(19 + RegExp.$1.length);
											var m2 = newContent.match(/^data:image\/([a-z]+);base64,/);
											if(!!m2 && m2.length > 1) {
												var bin = newContent.substr(19 + m2[1].length);
												//theLogger.log(bin);
												bin = Base64.decode(bin);
												//theLogger.log(bin);
												// 1080823 Raymond 1080708 修正章戳或圖檔簽核物件檔名(可能)為空造成SignWork.xml資訊記錄缺少電子檔名問題
												//if(!("fileName" in nso))
												if(!("fileName" in nso) || nso.fileName.length == 0)
													// 1141117 Raymond 1141442 修正RegExp.$1可能是空值, 會導致上傳發生錯誤的問題
													//nso.fileName = "NewSignObj" + Util.padLeft(++_signFolder.lastSNofSOFileName, 3) + "." + RegExp.$1;    // TODO: 檔名命名原則?
													nso.fileName = "NewSignObj" + Util.padLeft(++_signFolder.lastSNofSOFileName, 3) + "." + m2[1];    // TODO: 檔名命名原則?
												theLogger.log("上傳修正過的數位墨水圖檔'" + nso.fileName + "'...");
												if(upSeq) {	// 2016.12.12 改採循序方式上傳電子檔
													que.push({fp: that.subDirPath, fn: nso.fileName, dat: bin, param: {
														cbdata: nso,
														success: function(fileName, filePath) {
															signWork.addSO(this.cbdata, fileName);
														},
														error: function(errorText) {
															theLogger.error(errorText);
														}
													}});
													dfd.resolve();
												}
												else {
													wfio.upload(that.subDirPath, nso.fileName, bin, {
														cbdata: nso,
														success: function(fileName, filePath) {
															signWork.addSO(this.cbdata, fileName);
														},
														error: function(errorText) {
															theLogger.error(errorText);
														}
													}).done(function() {	// 成功時串回dfd
														dfd.resolve();
													});
												}
											}
											else {
												theLogger.warn("轉換成沒alpha的圖檔沒有dataURL相關宣告!?");
												theLogger.log(newContent);
											}
										};
										img.src = newSO.content;
										return dfd.promise();
									}(newSO, q));
								}
								else {	// 章戳則原檔上傳
									// 1141117 Raymond 1141442 修正RegExp.$1可能是空值, 會導致上傳發生錯誤的問題
									//var bin = newSO.content.substr(19 + RegExp.$1.length);
									var bin = newSO.content.substr(19 + m[1].length);
									//theLogger.log(bin);
									bin = Base64.decode(bin);
									//theLogger.log(bin);
									// 1080823 Raymond 1080708 修正章戳或圖檔簽核物件檔名(可能)為空造成SignWork.xml資訊記錄缺少電子檔名問題
									//if(!("fileName" in newSO))
									if(!("fileName" in newSO) || newSO.fileName.length == 0)
										// 1141117 Raymond 1141442 修正RegExp.$1可能是空值, 會導致上傳發生錯誤的問題
										//newSO.fileName = "NewSignObj" + Util.padLeft(++_signFolder.lastSNofSOFileName, 3) + "." + RegExp.$1;    // TODO: 檔名命名原則?
										newSO.fileName = "NewSignObj" + Util.padLeft(++_signFolder.lastSNofSOFileName, 3) + "." + m[1];    // TODO: 檔名命名原則?
									if(upSeq) {	// 2016.12.12 改採循序方式上傳電子檔
										q.push({fp: that.subDirPath, fn: newSO.fileName, dat: bin, param: {
											cbdata: newSO,
											success: function(fileName, filePath) {
												signWork.addSO(this.cbdata, fileName);
											},
											error: function(errorText) {
												theLogger.log(errorText);
											}}
										});
									}
									else {
										deferreds.push(wfio.upload(that.subDirPath, newSO.fileName, bin, {
											cbdata: newSO,
											success: function(fileName, filePath) {
												signWork.addSO(this.cbdata, fileName);
											},
											error: function(errorText) {
												theLogger.log(errorText);
											}})
										);
									}
								}
							}
							else
							{
								// 1080911 Raymond 1080708 修正第2次開啟再暫存時, 章戳圖檔因是tif格式而改用odtools網址形式而走到這造成儲存傳送後章戳物件無電子檔名的問題
								//signWork.addSO(pg.newSignObjs[j], null);
								signWork.addSO(pg.newSignObjs[j], pg.newSignObjs[j].fileName);
							}
						}
					}
				});
				
				// 2017.1.12 Raymond 新增上傳外部簽核物件記錄檔
				deferreds.push(wfio.upload(that.subDirPath, "XSignObjs.xml", _signFolder.xSignFolder().save()));
				
				// 1141107 Raymond 1141113 新增[外貿客製化]上傳便利貼記錄檔
				if(SSO_CONFIG.OrgNickName == "TAITRA") {
					_noteData.lastModifyMsgId = _docObj.msgId;
					let now = new Date();
					// 1150121 Raymond 外貿序35 修正日期變星期的問題
					//_noteData.lastModifiedTime = Util.padLeft(now.getYear() - 11, 3) + "/" + Util.padLeft(now.getMonth() + 1, 2) + "/" + Util.padLeft(now.getDay(), 2) + " " + Util.padLeft(now.getHours(), 2) + ":" + Util.padLeft(now.getMinutes(), 2) + ":" + Util.padLeft(now.getSeconds(), 2);
					_noteData.lastModifiedTime = Util.padLeft(now.getYear() - 11, 3) + "/" + Util.padLeft(now.getMonth() + 1, 2) + "/" + Util.padLeft(now.getDate(), 2) + " " + Util.padLeft(now.getHours(), 2) + ":" + Util.padLeft(now.getMinutes(), 2) + ":" + Util.padLeft(now.getSeconds(), 2);
					deferreds.push(wfio.upload(that.subDirPath, "NoteData.json", WebFileIO.prototype.utf8.encode(JSON.stringify(_noteData))));
				}
				
				// 1140121 Raymond 1131303 新增儲存上傳錯別字校正資料物件檔
				deferreds.push(_fixWordData.save().done(function(obj) {
					var str = JSON.stringify(obj);
					return wfio.upload(that.subDirPath, "FixWordData.json", WebFileIO.prototype.utf8.encode(str));
				}));
				
				//2016.11.2	Leslie	新增儲存參考附件相關
				//1060817	Leslie[1060740]	加try-catch，以嚐試截取異常訊息
				try{
					//1130411	Leslie[1130240]	配合簽閱附件，dir移到外面宣告
					let dir = (_docObj.docNo.length > 0)?_docObj.docNo+"-00-99":"00-99";	// 1141230 Raymond 1141058 var->let, 修正草稿公文要號後調換附件順序, 儲存公文時上面6240行會發生_draftMgmts['文號-00-99']是undefinded的錯誤
					if(_refAttMgmt.isRefAttachsDirty()){
						//1130411	Leslie[1130240]	配合簽閱附件，dir移到外面宣告
						// var dir = (_docObj.docNo.length > 0)?_docObj.docNo+"-00-99":"00-99";
						_refAttMgmt.save(that.subDirPath + "\\" + dir,{
							success:function(path, fname, xml){
								theLogger.log("儲存參考附件管理檔...");
								if("xml" in xml)	// for IE-compatible
									theLogger.log(xml.xml);
								else
									theLogger.log(xml);
								if(upSeq)	// 2016.12.12 改採循序方式上傳電子檔
									q.push({fp: path, fn: fname, dat: xml});
								else
									deferreds.push(wfio.upload(path, fname, xml));
							}
						});
						_refAttMgmt.saveRefAtts({
							//1111012	Leslie[1110865]	補齊刪除附件實體檔功能
							// success:function(path,fname,origFileName){	//於RD-RefAttachMgmt.js 中已處理，僅本流程新增的會上傳
							// 1131227 Leslie[1130824] 增修於公文儲存時，一律檢核參考附件檔案的可用性
							// success:function(path,fname,origFileName,remove = false){	//於RD-RefAttachMgmt.js 中已處理，僅本流程新增的會上傳
							success:function(path,fname,origFileName,options){	//於RD-RefAttachMgmt.js 中已處理，僅本流程新增的會上傳
								theLogger.log("儲存["+ fname + "], '" + origFileName + "'...");
								if(upSeq){	// 2016.12.12 改採循序方式上傳電子檔
									//1111012	Leslie[1110865]	補齊刪除附件實體檔功能
									// 1131227 Leslie[1130824] 增修於公文儲存時，一律檢核參考附件檔案的可用性
									// if(remove)
									if(options?.remove)
										q.push({method: "delete", arFile: [{filePath:Utf7.encode(path),fileName:Utf7.encode(fname)}]})
									// 1131227 Leslie[1130824] 增修於公文儲存時，一律檢核參考附件檔案的可用性
									else if(options?.check)
										q.push({method: "check", fp: path, fn: fname, ftype: "參考附件"});
									else
										q.push({fp: path, fn: fname, dat: origFileName, isBlobUrl: true});
								}
								else
									deferreds.push(wfio.uploadAtt(path, fname, origFileName));
							}
						});
					}
					else
						_refAttMgmt.checkAllAttachExist({
							success:function(path,fname,origFileName,options){
								q.push({method: "check", fp: path, fn: fname, ftype: "參考附件"});
							}
						});
					
					//1111012	Leslie[1110865]	新增客製化簽閱附件的配套功能
					if (SSO_CONFIG.OrgNickName == "MOCS" && _tmpAttMgmt.isTmpAttachsDirty()){
						_tmpAttMgmt.save(that.subDirPath + "\\" + dir,{
							success:function(path, fname, xml){
								theLogger.log("儲存簽閱附件管理檔...");
								if("xml" in xml)	// for IE-compatible
									theLogger.log(xml.xml);
								else
									theLogger.log(xml);
								if(upSeq)	// 2016.12.12 改採循序方式上傳電子檔
									q.push({fp: path, fn: fname, dat: xml});
								else
									deferreds.push(wfio.upload(path, fname, xml));
							}
						});
						_tmpAttMgmt.saveTmpAtts({
							success:function(path,fname,origFileName,remove = false){	
								theLogger.log("儲存["+ fname + "], '" + origFileName + "'...");
								if(upSeq){
									if(remove)
										q.push({method: "delete", arFile: [{filePath:Utf7.encode(path),fileName:Utf7.encode(fname)}]})
									else
										q.push({fp: path, fn: fname, dat: origFileName, isBlobUrl: true});
								}
								else
									deferreds.push(wfio.uploadAtt(path, fname, origFileName));
							}
						});
					}
				}catch(e){
					//1060817	Leslie[1060740]	增加try-catch，並寫出ExceptionLog
					window.ExceptionLog("準備儲存參考附件時發生錯誤! " + e.message,e);
					
					theLogger.error("準備儲存參考附件時發生錯誤! " + e.message);
					dfd.reject(e.message);
					return dfd.promise();
				}
				
				// 1060427 Raymond 須更名附件檔的下載需在完成後才能執行最後上傳等待作業
				// 2016.7.12 新增preceed要先下載的物件
				//if(preceed.length > 0) {
				//	$.when.apply(this, preceed).done(function() {
				//		theLogger.log("須更名附件檔已先下載完成!");
				//	});
				//}
				
				// 1060427 Raymond 最後上傳等待作業以函式包住, 供後續判斷是否應先下載須更名附件檔再呼叫
				function doFinal() {
					if(upSeq) {	// 2016.12.12 改採循序方式上傳電子檔
						// 先處理完還在deferreds中的物件(數位墨水變色)
						$.when.apply(this, deferreds).done(function() {
							theLogger.log("簽核物件加工完畢");
							q.push({fp: that.subDirPath, fn: "SignWork.xml", dat: signWork.getDoc(), param: {
								success: function() {
									theLogger.log("-=SignWork.xml上傳完畢=-");
								},
								error: function(errorText) {
									theLogger.log("SignWork.xml上傳失敗! " + errorText);
								}
							}});
							var it = 0;
							function doSingle() {
								var job = q[it++];
								if("method" in job && job.method == "copy") {	// 2016.12.16 bugfix job.type->job.method
									// 1141125 Raymond 1141255 新增可傳入param, 以支援從工作站(job.param.toWebFileIOUrl)搬移附件匯出頁面檔到FileServer功能
									if(!!job.srcwfio) {
										(new WebFileIO(job.srcwfio)).copy(job.srcfp, job.srcfn, job.fp, job.fn, {toWebFileIOUrl: that.fileIOWS})
										.done(function() {
											// 1141125 Raymond 1141255 新增傳入的param若有success函式, 則搬移成功後呼叫
											if(!!job.param && !!job.param.success && $.isFunction(job.param.success))
												job.param.success(job);
											if(it == q.length) {
												theLogger.log("-=全部異動文稿附件及文稿管理檔上傳完畢=-");
												// 1130710 Raymond 1130637 儲存成功後清除簽核物件已異動狀態
												if("soModified" in that)
													delete that.soModified;
												dfd.resolve(null);
											}
											else
												doSingle();
										})
										.fail(function(errorText) {
											theLogger.log("-=異動文稿或附件未全部上傳=-" + errorText);
											// 1141125 Raymond 1141255 新增傳入的param若有error函式, 則搬移失敗後呼叫
											if(!!job.param && !!job.param.error && $.isFunction(job.param.error))
												job.param.error(job);
											dfd.reject(errorText);
										});
									}
									else {
										wfio.copy(job.srcfp, job.srcfn, job.fp, job.fn, null)
										.done(function() {
											// 1141125 Raymond 1141255 新增傳入的param若有success函式, 則搬移成功後呼叫
											if(!!job.param && !!job.param.success && $.isFunction(job.param.success))
												job.param.success(job);
											if(it == q.length) {
												theLogger.log("-=全部異動文稿附件及文稿管理檔上傳完畢=-");
												// 1130710 Raymond 1130637 儲存成功後清除簽核物件已異動狀態
												if("soModified" in that)
													delete that.soModified;
												dfd.resolve(null);
											}
											else
												doSingle();
										})
										.fail(function(errorText) {
											theLogger.log("-=異動文稿或附件未全部上傳=-" + errorText);
											// 1141125 Raymond 1141255 新增傳入的param若有error函式, 則搬移失敗後呼叫
											if(!!job.param && !!job.param.error && $.isFunction(job.param.error))
												job.param.error(job);
											dfd.reject(errorText);
										});
									}
								}
								//1111012	Leslie[1110865]	配合新增簽閱附件，新增刪除作業
								else if('method' in job && job.method == 'delete'){
									wfio.del(job.arFile)
									.done(function() {
										if(it == q.length) {
											theLogger.log("-=全部異動文稿附件及文稿管理檔上傳完畢=-");
											// 1130710 Raymond 1130637 儲存成功後清除簽核物件已異動狀態
											if("soModified" in that)
												delete that.soModified;
											dfd.resolve(null);
										}
										else
											doSingle();
									})
									.fail(function(errorText) {
										theLogger.log("-=異動文稿或附件未全部上傳=-" + errorText);
										dfd.reject(errorText);
									});
								}
								//1120509	Leslie[1110513]	新增檢查檔案是否存在的功能，搭配原循序流程去叫用
								else if('method' in job && job.method == 'check'){
									var params = new SOAPClientParameters();
									params.add('argFilePath', job.fp+'\\'+job.fn);
									
									SOAPClient.invokeJSON(that.fileIOWS, 'CheckFileExist', params, true,function(rslt){
										if (typeof rslt === 'object') {
											if(!rslt.value){
												// 1131227 Leslie[1130824] 增修於公文儲存時，一律檢核參考附件檔案的可用性
												if(job?.ftype){
													theLogger.warn(`檢查檔案時發現異常，在[${job.fp}]找不到[${job.fn}]。`);
													dfd.reject(`檢查檔案時發現異常，文號[${that.getDocNo()}]公文目錄中找不到${job?.ftype}[${job.fn}]。`);
												}
												else
												//查無檔案，或路徑異常
												dfd.reject(`檢查檔案時發現異常，在[${job.fp}]找不到[${job.fn}]。`);
											}
											else{
												if(it == q.length) {
													theLogger.log("-=全部異動文稿附件及文稿管理檔上傳完畢=-");
													// 1130710 Raymond 1130637 儲存成功後清除簽核物件已異動狀態
													if("soModified" in that)
														delete that.soModified;
													dfd.resolve(null);
												}
												else
													doSingle();
											}
										}
										else {
											theLogger.log("CheckFileExist fail!")
											dfd.reject("CheckFileExist fail!");
										}
									});
								}
								else if(job.isBlobUrl) {
									wfio.uploadAtt(job.fp, job.fn, job.dat)
									.done(function() {
										if(it == q.length) {
											theLogger.log("-=全部異動文稿附件及文稿管理檔上傳完畢=-");
											// 1130710 Raymond 1130637 儲存成功後清除簽核物件已異動狀態
											if("soModified" in that)
												delete that.soModified;
											dfd.resolve(null);
										}
										else
											doSingle();
									})
									.fail(function(errorText) {
										theLogger.log("-=異動文稿或附件未全部上傳=-" + errorText);
										dfd.reject(errorText);
									});
								}
								else {
									wfio.upload(job.fp, job.fn, job.dat, job.param)
									.done(function() {
										if(it == q.length) {
											theLogger.log("-=全部異動文稿附件及文稿管理檔上傳完畢=-");
											// 1130710 Raymond 1130637 儲存成功後清除簽核物件已異動狀態
											if("soModified" in that)
												delete that.soModified;
											dfd.resolve(null);
										}
										else
											doSingle();
									})
									.fail(function(errorText) {
										theLogger.log("-=異動文稿或附件未全部上傳=-" + errorText);
										dfd.reject(errorText);
									});
								}
							};
							doSingle();
						})
						.fail(function(errorText) {
							theLogger.log("簽核物件未加工完畢: " + errorText);
							dfd.reject(errorText);
						});
					}
					else {
						// 並聯處理不固定數量Deferred物件的方法
						$.when.apply(this, deferreds).done(function() {
							theLogger.log("-=全部異動文稿及簽核物件上傳完畢=-");
							wfio.upload(that.subDirPath, "SignWork.xml", signWork.getDoc(), {
								success: function() {
									theLogger.log("-=SignWork.xml上傳完畢=-");
									// 1130710 Raymond 1130637 儲存成功後清除簽核物件已異動狀態
									if("soModified" in that)
										delete that.soModified;
									dfd.resolve(null);
								},
								error: function(errorText) {
									theLogger.log("SignWork.xml上傳失敗! " + errorText);
									dfd.reject(errorText);
								}
							});
						})
						.fail(function(errorText) {
							theLogger.log("-=簽核物件未全部上傳=-" + errorText);
							dfd.reject(errorText);
						});
					}
				}
				// 1060427 Raymond 須更名附件檔的下載需在完成後才能執行最後上傳等待作業
				if(preceed.length > 0) {
					$.when.apply(this, preceed).done(function() {
						theLogger.log("須更名附件檔已先下載完成!");
						doFinal();
					});
				}
				else {
					doFinal();
				}
				}	// end of proceedLastLast() 1120811 Raymond 1120503 新增判斷儲存動作為"傳送", 再判斷異動文稿是否為"簽", 及是否含有自訂表格, 若含則在客戶端先產生文稿頁面再儲存
			}	// end of 線上簽核
			}	// end of proceedLast() 1110527 Raymond 1110527 將上傳程序包成function, 不需檢核檔案覆蓋或檢核通過時再呼叫
			return dfd.promise();
		},
		
		// 2015.8.21 新增取代close, 檢查有異動則提示是否儲存或放棄本次異動,
		// 2016.8.29 新增doSave參數, 當使用者選擇儲存時呼叫doSave取代that.save
		// 2016.10.6 新增e2p參數, 當其值為"E2P"時表示線上轉紙本成功要關閉此公文, 則不要檢查dirty並pass給_onCloseFolio()
		close: function(doSave, e2p) {
			var that = this,
				asked = false,
				anwser = 0,	// 2:儲存, 1:放棄本次異動, 0:取消, 3:儲存後發文!
				dfd = $.Deferred();	// 用deferred延遲等待詢問結果

			// 2020.2.13 - 1080782 Eric, merge MOI 1070309 - add 'closeRslt' for 儲存後發文...
			function _getSendDocButtons() {
				function _postAction(params) {
					let _SAMLart = '', _docNo='';
					if (typeof params == 'object') {
						_SAMLart = (typeof params.SAMLart=='string' && params.SAMLart.length)?params.SAMLart:'';
						_docNo = (typeof params.docNo=='string' && params.docNo.length)?params.docNo:'';
					}
					let url = window.location.protocol + '//' + window.location.hostname + '/oddep/odt351.aspx' + 
								'?SAMLart=' + _SAMLart  + '&argDocNo=' + _docNo;
					theSSO.Util.openASPXApp_NewFrame(url);
				}

				let _sendDocButtons = [];
				let sendDocFolder = theSSO.User.EnvSettings.get('SSO_SENDDOC_FOLDER');
				let docFolder = theAOL.docObj.folder + '-' + theAOL.docObj.subfolder + ';';
				let _docNo = theAOL.docObj.docNo;
				if (sendDocFolder.indexOf(docFolder)!==-1) {
					_sendDocButtons.push({
						name: '儲存後發文',
						action: function() {
							theLogger.log("使用者選擇儲存後發文!");
							anwser = 3;
							asked = true;
							if(typeof doSave !== "undefined" && $.isFunction(doSave)) {	// 2016.8.29 改呼叫doSave執行儲存
								doSave().done(function() {
									that.clearTemp();	// 2015.9.1 儲存完畢後清除暫存文稿資料
									// 關閉後呼叫global function
									if(typeof _onCloseFolio !== "undefined" && $.isFunction(_onCloseFolio)) {
										_onCloseFolio();
									}
									that.termAutoBackup();	// 2016.9.21 結束自動備份
									dfd.resolve({postAction:_postAction, param: {SAMLart:localStorage.Artifact, docNo: theAOL.docObj.docNo}}); // 2018.3.15 - Eric, 1070309要求開啟ODT351
								}).fail(function(errorText) {
									dfd.reject(errorText);
								});
							}
							else {
								theLogger.warn("FolioModel.close()未傳入doSave函式參數! 僅儲存公文文稿資料");	// 保險起見
								that.save().done(function() {
									that.clearTemp();	// 2015.9.1 儲存完畢後清除暫存文稿資料
									// 關閉後呼叫global function
									if(typeof _onCloseFolio !== "undefined" && $.isFunction(_onCloseFolio)) {
										_onCloseFolio();
									}
									that.termAutoBackup();	// 2016.9.21 結束自動備份
									dfd.resolve({postAction:_postAction, param: {SAMLart:localStorage.Artifact, docNo: theAOL.docObj.docNo}}); // 2018.3.15 - Eric, 1070309要求開啟ODT351
								}).fail(function(errorText) {
									dfd.reject(errorText);
								});
							}
						}
					});
				}
				return _sendDocButtons;
			}

			function askSave() {
				theLogger.log("公文已異動, 詢問是否儲存...");
				// 2015.11.4 - 改用jQuery.confirm外掛處理詢問需求
				//var $dlg = $("<h3>關閉公文</h3><div class='content'><p>公文已異動，是否儲存?</p><button id='ok'>儲存公文</button><button id='discard'>放棄本次異動</button><button id='cancel'>取消</button></div>");

				// 2020.2.13 - 1080782 Eric, merge MOI 1070309 - add 'closeRslt' for 儲存後發文...
				let _normalButtons = [
					{	name: "儲存公文",
						action: function() {
							theLogger.log("使用者選擇儲存!");
							anwser = 2;
							asked = true;
							if(typeof doSave !== "undefined" && $.isFunction(doSave)) {	// 2016.8.29 改呼叫doSave執行儲存
								doSave().done(function() {
									that.clearTemp();	// 2015.9.1 儲存完畢後清除暫存文稿資料
									// 關閉後呼叫global function
									if(typeof _onCloseFolio !== "undefined" && $.isFunction(_onCloseFolio)) {
										_onCloseFolio();
									}
									that.termAutoBackup();	// 2016.9.21 結束自動備份
									dfd.resolve();
								}).fail(function(errorText) {
									dfd.reject(errorText);
								});
							}
							else {
								theLogger.warn("FolioModel.close()未傳入doSave函式參數! 僅儲存公文文稿資料");	// 保險起見
								that.save().done(function() {
									that.clearTemp();	// 2015.9.1 儲存完畢後清除暫存文稿資料
									// 關閉後呼叫global function
									if(typeof _onCloseFolio !== "undefined" && $.isFunction(_onCloseFolio)) {
										_onCloseFolio();
									}
									that.termAutoBackup();	// 2016.9.21 結束自動備份
									dfd.resolve();
								}).fail(function(errorText) {
									dfd.reject(errorText);
								});
							}
						}
					},
					{	name: "放棄本次異動",
						action: function() {
							theLogger.log("使用者選擇放棄本次異動!");
							anwser = 1;
							asked = true;
							that.clearTemp();
							// 關閉後呼叫global function
							if(typeof _onCloseFolio !== "undefined" && $.isFunction(_onCloseFolio)) {
								_onCloseFolio('cancelUpdate'); // 2016.12.5 - Eric Peng, 告知後續作業user按[放棄異動]鍵!
							}
							that.termAutoBackup();	// 2016.9.21 結束自動備份
							dfd.resolve();
						}
					},
					{	name: "取消",
						action: function() {
							theLogger.log("使用者選擇取消!");
							anwser = 0;
							asked = true;
							dfd.reject();
						}
					}
				];

				let _sendDocButtons = _getSendDocButtons();
				let _actButtons = null;
				if (_sendDocButtons.length) {
					_actButtons = _sendDocButtons.concat(_normalButtons);
				}
				else {
					_actButtons = _normalButtons;
				}

				var param = {title: "關閉公文",
					message: "公文已異動，是否儲存？",
					buttons: _actButtons,
					/*buttons: [
						{	name: "儲存公文",
							action: function() {
								theLogger.log("使用者選擇儲存!");
								anwser = 2;
								asked = true;
								if(typeof doSave !== "undefined" && $.isFunction(doSave)) {	// 2016.8.29 改呼叫doSave執行儲存
									doSave().done(function() {
										that.clearTemp();	// 2015.9.1 儲存完畢後清除暫存文稿資料
										// 關閉後呼叫global function
										if(typeof _onCloseFolio !== "undefined" && $.isFunction(_onCloseFolio)) {
											_onCloseFolio();
										}
										that.termAutoBackup();	// 2016.9.21 結束自動備份
										dfd.resolve();
									}).fail(function(errorText) {
										dfd.reject(errorText);
									});
								}
								else {
									theLogger.warn("FolioModel.close()未傳入doSave函式參數! 僅儲存公文文稿資料");	// 保險起見
									that.save().done(function() {
										that.clearTemp();	// 2015.9.1 儲存完畢後清除暫存文稿資料
										// 關閉後呼叫global function
										if(typeof _onCloseFolio !== "undefined" && $.isFunction(_onCloseFolio)) {
											_onCloseFolio();
										}
										that.termAutoBackup();	// 2016.9.21 結束自動備份
										dfd.resolve();
									}).fail(function(errorText) {
										dfd.reject(errorText);
									});
								}
							}
						},
						{	name: "放棄本次異動",
							action: function() {
								theLogger.log("使用者選擇放棄本次異動!");
								anwser = 1;
								asked = true;
								that.clearTemp();
								// 關閉後呼叫global function
								if(typeof _onCloseFolio !== "undefined" && $.isFunction(_onCloseFolio)) {
									_onCloseFolio('cancelUpdate'); // 2016.12.5 - Eric Peng, 告知後續作業user按[放棄異動]鍵!
								}
								that.termAutoBackup();	// 2016.9.21 結束自動備份
								dfd.resolve();
							}
						},
						{	name: "取消",
							action: function() {
								theLogger.log("使用者選擇取消!");
								anwser = 0;
								asked = true;
								dfd.reject();
							}
						}
					],*/
					beforeShow: function() {
						$(".contentPane").css("overflow", "hidden");	// 提示訊息顯示後, 禁止文稿頁面捲動
					},
					afterHide: function() {
						$(".contentPane").css("overflow", "");	// 提示訊息關閉後, 恢復文稿頁面捲動
					}
				};
				/*$dlg.find("#ok").click(function(event) {
					$.modal.close();
					
				});
				$dlg.find("#discard").click(function(event) {
					$.modal.close();
					
				});
				$dlg.find("#cancel").click(function(event) {
					$.modal.close();
				});
				$.modal($dlg, {
					width:360,
					height:240,
					minHeight:240,
					autoResize:true,
					onShow:function() {
					}
				});
				$dlg.trigger("create");*/
				$.confirm(param);
				// End-of 改用jQuery.confirm外掛處理詢問需求
			}
		
			// 2016.12.20	Leslie	新增"必需儲存"內部函式
			function haveToSave(){
				theLogger.log("匯出的附件頁面已異動, 必需儲存...");

				// 2020.2.13 - 1080782 Eric, merge MOI 1070309 - add 'closeRslt' for 儲存後發文...
				let _normalButtons = [
					{	name: "儲存公文",
						action: function() {
							theLogger.log("使用者選擇儲存!");
							anwser = 2;
							asked = true;
							if(typeof doSave !== "undefined" && $.isFunction(doSave)) {	// 2016.8.29 改呼叫doSave執行儲存
								doSave().done(function() {
									that.clearTemp();	// 2015.9.1 儲存完畢後清除暫存文稿資料
									// 關閉後呼叫global function
									if(typeof _onCloseFolio !== "undefined" && $.isFunction(_onCloseFolio)) {
										_onCloseFolio();
									}
									that.termAutoBackup();	// 2016.9.21 結束自動備份
									dfd.resolve();
								}).fail(function(errorText) {
									dfd.reject(errorText);
								});
							}
							else {
								theLogger.warn("FolioModel.close()未傳入doSave函式參數! 僅儲存公文文稿資料");	// 保險起見
								that.save().done(function() {
									that.clearTemp();	// 2015.9.1 儲存完畢後清除暫存文稿資料
									// 關閉後呼叫global function
									if(typeof _onCloseFolio !== "undefined" && $.isFunction(_onCloseFolio)) {
										_onCloseFolio();
									}
									that.termAutoBackup();	// 2016.9.21 結束自動備份
									dfd.resolve();
								}).fail(function(errorText) {
									dfd.reject(errorText);
								});
							}
						}
					},
					{	name: "取消",
						action: function() {
							theLogger.log("使用者選擇取消!");
							anwser = 0;
							asked = true;
							dfd.reject();
						}
					}
				];

				let _sendDocButtons = _getSendDocButtons();
				let _actButtons = null;
				if (_sendDocButtons.length) {
					_actButtons = _sendDocButtons.concat(_normalButtons);
				}
				else {
					_actButtons = _normalButtons;
				}

				var param = {title: "關閉公文",
					message: "匯出的附件頁面已異動，本公文必需儲存，是否確認儲存或繼續編輯？",
					buttons: _actButtons,
					/*buttons: [
						{	name: "儲存公文",
							action: function() {
								theLogger.log("使用者選擇儲存!");
								anwser = 2;
								asked = true;
								if(typeof doSave !== "undefined" && $.isFunction(doSave)) {	// 2016.8.29 改呼叫doSave執行儲存
									doSave().done(function() {
										that.clearTemp();	// 2015.9.1 儲存完畢後清除暫存文稿資料
										// 關閉後呼叫global function
										if(typeof _onCloseFolio !== "undefined" && $.isFunction(_onCloseFolio)) {
											_onCloseFolio();
										}
										that.termAutoBackup();	// 2016.9.21 結束自動備份
										dfd.resolve();
									}).fail(function(errorText) {
										dfd.reject(errorText);
									});
								}
								else {
									theLogger.warn("FolioModel.close()未傳入doSave函式參數! 僅儲存公文文稿資料");	// 保險起見
									that.save().done(function() {
										that.clearTemp();	// 2015.9.1 儲存完畢後清除暫存文稿資料
										// 關閉後呼叫global function
										if(typeof _onCloseFolio !== "undefined" && $.isFunction(_onCloseFolio)) {
											_onCloseFolio();
										}
										that.termAutoBackup();	// 2016.9.21 結束自動備份
										dfd.resolve();
									}).fail(function(errorText) {
										dfd.reject(errorText);
									});
								}
							}
						},
						{	name: "取消",
							action: function() {
								theLogger.log("使用者選擇取消!");
								anwser = 0;
								asked = true;
								dfd.reject();
							}
						}
					],*/
					beforeShow: function() {
						$(".contentPane").css("overflow", "hidden");	// 提示訊息顯示後, 禁止文稿頁面捲動
					},
					afterHide: function() {
						$(".contentPane").css("overflow", "");	// 提示訊息關閉後, 恢復文稿頁面捲動
					}
				};
				
				$.confirm(param);
			}
		
			var dty = false;
			if(!this.readOnly() && e2p != "E2P") {	// 2016.8.16 唯讀不需判斷異動, 2016.10.5 e2p若是E2P也不需要檢核
				if(_docObj.signType == "P") {	// 紙本簽核
					for(var d in _cachedDM) {
						// 1120915 Raymond 1120574 新增判斷上次儲存後又有異動才需要儲存
						//if(_cachedDM[d].dirty()) {
						if(_cachedDM[d].dirty() && _cachedDM[d].hasModifiedSinceLastSave()) {
							dty = true;
							break;
						}
					}
					// 1120915 Raymond 1120574 新增判斷上次儲存後又有異動才需要儲存
					//if(!dty && _currMgmt.dirty())
					if(!dty && _currMgmt.dirty() && _currMgmt.hasModifiedSinceLastSave())
						dty = true;
				}
				else {	// 線上簽核
					for(var i=0; i<_signFolder.getDraftCounts(); i++) {
						if(_cachedDM[i] !== undefined) {    // _cachedDM所記錄的文稿是固定順序, 非push
							// 1120915 Raymond 1120574 新增判斷上次儲存後又有異動才需要儲存
							//if(_cachedDM[i].dirty()) {      // 有開啟的文稿才有機會異動?
							if(_cachedDM[i].dirty() && _cachedDM[i].hasModifiedSinceLastSave()) {
								dty = true;
								break;
							}
						}
					}
					if(!dty) {
						for(dir in _draftMgmts) {	// 2016.2.1 文稿管理檔有複數改為集合物件, KEY是子目錄名
							// 1120915 Raymond 1120574 新增判斷上次儲存後又有異動才需要儲存
							//if(_draftMgmts[dir].dirty()) {
							if(_draftMgmts[dir].dirty() && _draftMgmts[dir].hasModifiedSinceLastSave()) {
								dty = true;
								break;
							}
						}
					}
					if(!dty) {
						var brk = false;
						_signFolder.enumAllPages(function(pg) {
							// 新增的簽核物件
							if("newSignObjs" in pg) {
								for(var j=0; j<pg.newSignObjs.length; j++) {
									var newSO = pg.newSignObjs[j];
									if(newSO.sessionNew) {
										dty = true;
										brk = true;
										break;
									}
								}
							}
							if(brk)
								return false;	// break enumAllPages
						});
					}
					// 1130710 Raymond 1130637 新增檢核簽核物件已異動旗標
					if(!dty && that.soModified == true)
						dty = true;
				}
			}
			
			// 1121024 Raymond 1120574 修正未異動文稿或異動後有先儲存過時, 在環境變數「SSO_SENDDOC_FOLDER」設定的資料夾(待處理-待繕印;待處理-待發文;)的公文直接關閉時, 不會跳出詢問是否儲存、儲存後發文的子視窗問題
			let sendDocFolder = theSSO.User.EnvSettings.get('SSO_SENDDOC_FOLDER');
			let docFolder = _docObj.folder + '-' + _docObj.subfolder + ';';
			// 1121003 Raymond 1120775 新增取得uiState, 用於判斷是否有隱藏傳送工具列, 若有隱藏傳送工具列(buttonF沒有"T"), 即使MenuRule有設定非唯讀且可編輯內文, 在異動內文後關閉公文也不要詢問是否儲存
			var uiState = window._getUIStatus(_docObj, _docObj.uiParam);
			//_RndrAttDirty = true;	
			//if(dty)	//2016.12.20	Leslie	原本已匯出頁面之附件，在異動後，"必需"儲存
			if(_RndrAttDirty)
				haveToSave();
			// 1121024 Raymond 1120574 修正未異動文稿或異動後有先儲存過時, 在環境變數「SSO_SENDDOC_FOLDER」設定的資料夾(待處理-待繕印;待處理-待發文;)的公文直接關閉時, 不會跳出詢問是否儲存、儲存後發文的子視窗問題
			// 1121003 Raymond 1120775 新增判斷是否有隱藏傳送工具列, 若有隱藏傳送工具列(buttonF沒有"T"), 即使MenuRule有設定非唯讀且可編輯內文, 在異動內文後關閉公文也不要詢問是否儲存
			// 1110819 Raymond 考試院序202 修正在異動預排流程後, 執行刪除公文功能, 會跳出是否儲存詢問訊息, 執行紙本轉線上功能, 會出現Error而中止紙本轉線上的問題
			// 1110812 Raymond 考試院序185 新增判斷預排流程是否有異動, 有則也提問是否儲存
			//else if(dty)
			//else if(dty || ("wwkfModified" in _docObj && _docObj.wwkfModified == true))
			//else if(dty || (e2p != "E2P" && "wwkfModified" in _docObj && _docObj.wwkfModified == true))
			//else if((dty || (e2p != "E2P" && "wwkfModified" in _docObj && _docObj.wwkfModified == true)) && uiState.hiddenSubmitPanel != true)
			else if((dty || (e2p != "E2P" && "wwkfModified" in _docObj && _docObj.wwkfModified == true) || sendDocFolder.indexOf(docFolder)!==-1) && uiState.hiddenSubmitPanel != true)
				askSave();
			else {	// 2015.9.11 沒有異動關閉要清除暫存
				that.clearTemp();
				// 關閉後呼叫global function
				if(typeof _onCloseFolio !== "undefined" && $.isFunction(_onCloseFolio) && !this.readOnly()) {	// 2016.8.16 新增唯讀不需同步基資
					_onCloseFolio(e2p);	// 2016.10.6 將e2p參數直接pass給_onCloseFolio()
				}
				that.termAutoBackup();	// 2016.9.21 結束自動備份
				dfd.resolve();
			}
			return dfd.promise();
		},
		
		/* 1111117 Raymond 1111069 取消saveTemp方法, 以避免不明步驟造成載入不同筆公文的文稿取代目前公文的文稿的問題
		saveTemp: function() {	// 2015.8.21 close更名為saveTemp, 會保留暫存資料在客戶端
			// 關閉時暫存已異動過的文稿檔XML於SessionStorage
			var i;
			for(i=0; i<_signFolder.getDraftCounts(); i++) {
				if(_cachedDM[i] !== undefined) {    // _cachedDM所記錄的文稿是固定順序, 非push
					if(_cachedDM[i].dirty()) {      // 有開啟的文稿才有機會異動?
						_cachedDM[i].save({
							success: function(index, path, fname, fnameCmpl, xml) {	// 2016.2.2 新增第2個參數原本下載的子目錄路徑, 2016.7.29 新增第4參數, 完稿檔名
								var l = path.lastIndexOf('\\');
								if(l >= 0) {
									theLogger.log("暫存文稿XML'" + path.substring(l+1) + "." + fname + "'");	// 暫存檔名改為子目錄名.檔名
									// 1090213 Raymond 修正傳字串時, in指令會發生Error的問題
									//if("xml" in xml)	// IE-compatible
									if(!!xml.xml)
										theLogger.log(xml.xml);
									else
										theLogger.log(xml);
									var cachedDraftName = path.substring(l+1) + "." + fname;
									sessionStorage[cachedDraftName] = (new XMLSerializer()).serializeToString(xml);
								}
								else
									theLogger.error("暫存文稿檔失敗! path(" + path + ")不含'\\'");
							}
						});
					}
				}
			}
			for(dir in _draftMgmts) {	// 2016.2.1 文稿管理檔有複數改為集合物件, KEY是子目錄名
				if(_draftMgmts[dir].dirty()) {
					_draftMgmts[dir].save({
						success: function(path, fname, xml) {	// 儲存的callback介面也增加dirPath, 因不同文稿管理檔存在不同子目錄
							var l = path.lastIndexOf('\\');
							if(l >= 0) {
								theLogger.log("暫存文稿管理檔'" + path.substring(l+1) + "." + fname + "'");
								if("xml" in xml)	// for IE-compatible
									theLogger.log(xml.xml);
								else
									theLogger.log(xml);
								var cachedDraftMgmt = path.substring(l+1) + "." + fname;
								sessionStorage[cachedDraftMgmt] = (new XMLSerializer()).serializeToString(xml);
							}
							else
								theLogger.error("暫存文稿管理檔失敗! path(" + path + ")不含'\\'");
						}
					});
				}
			}
			var signWork = new SignWork(_signFolder);
			i = 0;
			_signFolder.enumAllPages(function(pg) {
				theLogger.log("pg#" + (++i) + ":");
				theLogger.log(pg);
				// 新增的簽核物件
				if("newSignObjs" in pg) {
					for(var j=0; j<pg.newSignObjs.length; j++) {
						var newSO = pg.newSignObjs[j];
						if(newSO.content.match(/^data:image\/([a-z]+);base64,/)) {
							theLogger.log("match! '" + RegExp.$1 + "'");
							//var bin = newSO.content.substr(19 + RegExp.$1.length);
							// 1080823 Raymond 1080708 修正章戳或圖檔簽核物件檔名(可能)為空造成SignWork.xml資訊記錄缺少電子檔名問題
							//if(!("fileName" in newSO))
							if(!("fileName" in newSO) || newSO.fileName.length == 0)
								newSO.fileName = "NewSignObj" + Util.padLeft(++_signFolder.lastSNofSOFileName, 3) + "." + RegExp.$1;    // TODO: 檔名命名原則?

							// 2016.1.28 數位墨水簽核物件要轉回白底圖檔
							if(newSO.type == "sketch") {
								//newSO.maskBkgnd = "Y";	// 設成去背
								(function(nso) {	// 用function包裝SO參數, 以免影像延遲載入時都只會存取到最後一個SO
									// 加工轉成沒有alpha的圖檔
									var img = new Image();
									img.onload = function(evt) {
										theLogger.log("將數位墨水轉成沒有alpha的圖檔...");
										var w = evt.target.width;
										var h = evt.target.height;
										var can = $("<canvas width='" + w + "px' height='" + h + "px'></canvas>");  // 未append到DOM中的Canvas在FF下可能無法使用
										var ctx = can.get(0).getContext("2d");
										ctx.drawImage(evt.target, 0, 0);
										var imgData = ctx.getImageData(0, 0, w, h);
										var r, g, b, a, q = 0, z = 0;
										for(var y=0; y<h; y++) {
											for(var x=0; x<w; x++, z+=4) {
												r = imgData.data[q++];
												g = imgData.data[q++];
												b = imgData.data[q++];
												a = imgData.data[q++];
												if(a == 0) {    // 透明則設定成白色
													imgData.data[z] = 255;
													imgData.data[z+1] = 255;
													imgData.data[z+2] = 255;
													imgData.data[z+3] = 255;
												}
												else	// 其餘不透明或半透明都設成不透明
													imgData.data[z+3] = 255;
											}
										}
										ctx.putImageData(imgData, 0, 0);
										nso.content = can.get(0).toDataURL("image/png");
										
										theLogger.log("暫存簽核物件影像檔'" + _docObj.docNo + "." + nso.fileName + "'");
										var cachedSOFileName = _docObj.docNo + "." + nso.fileName;
										sessionStorage[cachedSOFileName] = nso.content;
									}
									img.src = nso.content;
								})(newSO);
							}
							else {
								theLogger.log("暫存簽核物件影像檔'" + _docObj.docNo + "." + newSO.fileName + "'");
								var cachedSOFileName = _docObj.docNo + "." + newSO.fileName;
								sessionStorage[cachedSOFileName] = newSO.content;
							}
							signWork.addSO(newSO, newSO.fileName);
						}
						else
						{
							// 1080911 Raymond 1080708 修正第2次開啟再暫存時, 章戳圖檔因是tif格式而改用odtools網址形式而走到這造成儲存傳送後章戳物件無電子檔名的問題
							//signWork.addSO(newSO, null);
							signWork.addSO(newSO, newSO.fileName);
						}
					}
				}
			});
			theLogger.log("暫存簽核工作檔'" + _docObj.docNo + ".SignWork.xml'");
			var cachedSignWork = _docObj.docNo + ".SignWork.xml";
			sessionStorage[cachedSignWork] = (new XMLSerializer()).serializeToString(signWork.getDoc());
			for(i=0; i<_views.length; i++) {
				_views[i].closeView();
			}
			_views.length = 0;
			
			// 2015.6.5 新增關閉後呼叫global function
			if(typeof _onCloseFolio !== "undefined" && $.isFunction(_onCloseFolio)) {
				_onCloseFolio();
			}
		},*/
		
		clearTemp: function() {	// 2015.8.21 新增清除暫存檔功能
			// 1090107 Raymond 1080701 清除暫存檔改成清空sessionStorage, 因為目前sessionStorage只有暫存文稿檔會用到, 而文稿檔不可暫存到開另一筆公文時還存在, 這會造成當文號相同時誤取暫存的前一筆公文的文稿內容, 故須在關閉公文呼叫clearTemp時將sessionStorage全部清空
			/*if(_docObj.signType == "P") {	// 紙本簽核
				_currMgmt.clearTemp();
			}
			else {	// 線上簽核
				for(dir in _draftMgmts)	// 2016.2.1 文稿管理檔有複數改為集合物件, KEY是子目錄名
					_draftMgmts[dir].clearTemp();
				_signFolder.enumAllPages(function(pg) {
					// 新增的簽核物件
					if("newSignObjs" in pg) {
						for(var j=0; j<pg.newSignObjs.length; j++) {
							var newSO = pg.newSignObjs[j];
							if("content" in newSO) {
								if(newSO.content.match(/^data:image\/([a-z]+);base64,/)) {
									//theLogger.log("match! '" + RegExp.$1 + "'");
									//var bin = newSO.content.substr(19 + RegExp.$1.length);
									// 1080823 Raymond 1080708 修正章戳或圖檔簽核物件檔名(可能)為空造成SignWork.xml資訊記錄缺少電子檔名問題
									//if(!("fileName" in newSO))
									if(!("fileName" in newSO) || newSO.fileName.length == 0)
										newSO.fileName = "NewSignObj" + Util.padLeft(++_signFolder.lastSNofSOFileName, 3) + "." + RegExp.$1;    // TODO: 檔名命名原則?
									var cachedSOFileName = _docObj.docNo + "." + newSO.fileName;
									if(cachedSOFileName in sessionStorage) {
										theLogger.log("清除暫存簽核物件影像檔'" + _docObj.docNo + "." + newSO.fileName + "'");
										sessionStorage.removeItem(cachedSOFileName);
									}
								}
							}
							else
								theLogger.warn("簽核物件(id:" + newSO.id + ")之content不存在(問題公文?), 無法清除暫存影像檔");
						}
					}
				});
			}
			var cachedSignWork = _docObj.docNo + ".SignWork.xml";
			if(cachedSignWork in sessionStorage) {
				theLogger.log("清除暫存簽核工作檔'" + _docObj.docNo + ".SignWork.xml'");
				sessionStorage.removeItem(cachedSignWork);
			}*/
			sessionStorage.clear();
			
			for(i=0; i<_views.length; i++) {
				_views[i].closeView();
			}
			_views.length = 0;
		},
		
		// 自動產生簽稿會核單
		// 1110609 Raymond 1110283 新增第4個參數dmSrc, 為觸發自動產生簽稿會核單的來源文稿
		// 1060516 Raymond 1060245 新增來源文稿的發文機關節點參數, 若有的話複製其全銜、機關代碼至新增的簽稿會核單
		//autoGenCon: function(conUnits, subject) {
		//autoGenCon: function(conUnits, subject, senders) {
		autoGenCon: function(conUnits, subject, senders, dmSrc) {
			var dfd = $.Deferred();	// 2016.9.2 改成deferred模式
			function syncConUnits(xmlDoc) {
				var $conUnits = $(xmlDoc.documentElement).find("會稿單位列表");
				if($conUnits.length) {
					$conUnits.children().remove();
					for(var i=0; i<conUnits.length; i++) {
						theLogger.log("新增'" + conUnits[i].name + "', 代碼:" + conUnits[i].value + ", type:" + conUnits[i].type);
						// 2016.8.18 for IE-compatible
						var u = xmlDoc.createElement("單位");
						u.setAttribute("代碼", conUnits[i].value);
						u.setAttribute("type", conUnits[i].type);
						if("text" in u)
							u.text = conUnits[i].name;
						else
							u.textContent = conUnits[i].name;
						$conUnits.append(u);
					}
					if("xml" in xmlDoc) {	// debug for IE
						theLogger.log(xmlDoc.xml);
					}
					else
						theLogger.log(xmlDoc);
				}
				// 1121208 Raymond 1120887 簽稿會核單若支援簽核區域增高, 則從<會辦意見列表>下新增<會辦意見>, 並複製<預設意見文字>至其下
				let $conCmtList = $(xmlDoc.documentElement).find("會辦意見列表");
				if($conCmtList.length) {
					let defSAHeight = $conCmtList.attr("預設簽核區域高度");
					let defCmdText = $conCmtList.find("預設意見文字").get(0).innerHTML;
					for(let i=0; i<conUnits.length; i++) {
						let alreadyExist = false;
						$conCmtList.find("會辦意見").each(function(idx, elm) {
							if(elm.getAttribute("代碼") == conUnits[i].value) {
								theLogger.log("代碼'" + conUnits[i].value + "'之會辦意見已存在");
								alreadyExist = true;
								//if(i != idx)	// 應調序?
								return false;
							}
						});
						if(!alreadyExist) {
							theLogger.log("新增代碼'" + conUnits[i].value + "'之會辦意見");
							let newConCmt = xmlDoc.createElement("會辦意見");
							newConCmt.setAttribute("代碼", conUnits[i].value);
							newConCmt.setAttribute("簽核區域排版高度", defSAHeight);
							$(newConCmt).html(defCmdText);
							$conCmtList.append(newConCmt);
						}
					}
				}
			}
			function syncConUnitsAndSubject(xmlDoc) {	// 2016.8.25 新增for新增簽核會核單時同步設定主旨(案情摘要)
				var $subj = $(xmlDoc.documentElement).find("主旨 文字");
				if($subj.length) {
					if("text" in $subj.get(0))
						$subj.get(0).text = subject;
					else
						$subj.get(0).textContent = subject;
				}
				// 1060516 Raymond 1060245 新增帶入發文機關內容
				if(!!senders && senders.length > 0) {
					var $sndr = $(senders[0]);
					var sndrName = $sndr.find("全銜").text(),
						sndrNo = $sndr.find("機關代碼").text(),
						sndrUn = $sndr.find("承辦單位").text();	// 1080326 Raymond 1070350 新增帶入承辦單位
					var $target = $(xmlDoc.documentElement).find("發文機關列表 發文機關");
					if($target.length) {
						var $nm = $target.find("全銜");
						if($nm.length) {
							if("text" in $nm.get(0))
								$nm.get(0).text = sndrName;
							else
								$nm.get(0).textContent = sndrName;
							theLogger.warn("設定簽稿會核單的'發文機關列表/發文機關/機關全銜'為'" + sndrName + "'");
						}
						else
							theLogger.warn("簽稿會核單無'發文機關列表/發文機關/機關全銜'節點, 無法設定發文機關資訊");
						var $no = $target.find("機關代碼");
						if($no.length) {
							if("text" in $no.get(0))
								$no.get(0).text = sndrNo;
							else
								$no.get(0).textContent = sndrNo;
							theLogger.warn("設定簽稿會核單的'發文機關列表/發文機關/機關代碼'為'" + sndrNo + "'");
						}
						else
							theLogger.warn("簽稿會核單無'發文機關列表/發文機關/機關代碼'節點, 無法設定發文機關資訊");
						// 1080326 Raymond 1070350 新增帶入承辦單位
						var $un = $target.find("承辦單位");
						if($un.length) {
							if("text" in $un.get(0))
								$un.get(0).text = sndrUn;
							else
								$un.get(0).textContent = sndrUn;
							theLogger.warn("設定簽稿會核單的'發文機關列表/發文機關/承辦單位'為'" + sndrUn + "'");
						}
						else
							theLogger.warn("簽稿會核單無'發文機關列表/發文機關/承辦單位'節點, 無法設定發文機關資訊");
					}
					else
						theLogger.warn("簽稿會核單無'發文機關列表/發文機關'節點, 無法設定發文機關資訊");
				}
				else
					theLogger.warn("文稿無發文機關資訊, 忽略帶入簽稿會核單");
				syncConUnits(xmlDoc);
			}
			// 先檢查是否已有簽稿會核單
			var that = this;
			if(typeof _currMgmt !== "undefined") {
				// 1110609 Raymond 1110283 啟用航港局額外產生簽稿會核單邏輯時, 不需要檢查是否已有簽稿會核單
				if(theSSO.User.EnvSettings.get("WE_GEN_CON_FOR_MPB") == "Y") {
					theLogger.log("啟用「額外產生簽稿會核單」功能, 不檢查公文夾是否已有簽稿會核單, 直接新增");
				}
				else
				if(_docObj.signType == "P") {	// 2016.10.31 bugfix
					var all = _currMgmt.getAllDrafts();
					for(var i=0; i<all.length; i++) {
						var dt = all[i].docType;
						// 1100419 Raymond 1080767 合併內政部1070530, 須排除結案前已新增的簽稿會核單
						//if(dt == "簽稿會核單") {
						if(dt == "簽稿會核單" && !_currMgmt.isClosedDraft(i)) {
							theLogger.log("公文夾已有簽稿會核單, 不需重複新增, 僅同步會辦單位...");
							that.accquireDraftModel(i).done(function(dm) {
								syncConUnits(dm.accquireXml());
								dm.needRetransFO(true);
								dfd.resolve(dm);	// deferred模式
							});
							return dfd.promise();
						}
					}
				}
				else {
					var n = _signFolder.getDraftCounts();
					for(var i=0; i<n; i++) {
						var d = _signFolder.getDraft(i);
						if("fromType" in d) {
							theLogger.log("第" + i + "個文稿是電子來文, 忽略");
							continue;
						}
						else if(d.name == "來文簽辦") {
							theLogger.log("第" + i + "個文稿是來文簽辦, 忽略");
							continue;
						}
						// 1100419 Raymond 1080767 合併內政部1070530, 須排除結案前已新增的簽稿會核單
						//if(d.docType == "簽稿會核單") {
						if(d.docType == "簽稿會核單" && !that.isClosedDraft(i)) {
							theLogger.log("第" + i + "個文稿是簽稿會核單, 更新既有簽稿會核單");
							that.accquireDraftModel(i).done(function(dm) {
								if(dm.getEditable()) {
									// 1100618 Raymond 1100482 新增若啟用簽稿會核單保留簽核物件功能, 則判斷既有的簽稿會核單是否為不同流程點所新增的, 若是則僅允許異動案情摘要(主旨)欄, 故不要同步會辦單位清單
									if(theSSO.User.EnvSettings.get("WE_ALLOW_CON_KEEP_SIGNOBJ") == "Y" && dm.getCreateSN() != dm.getEditSN()) {
										theLogger.warn("啟用簽稿會核單保留簽核物件(環境變數'WE_ALLOW_CON_KEEP_SIGNOBJ'設為'Y')功能時, 簽稿會核單在新增的流程點與目前流程點不同時, 禁止異動'會稿單位列表'欄");
										alert("當啟用簽稿會核單保留簽核物件功能時,\r\n由於既有的簽稿會核單非目前流程點所新增,\r\n中止同步異動其「會稿單位」!");
									}
									else {
									syncConUnits(dm.accquireXml());
									dm.needRetransFO(true);
									d.dirty(true);	// 2017.1.16 bugfix for 同步至簽稿會核單時, 簽稿會核單文稿的狀態仍未異動導致不會寫入SignWork.xml的Updates問題
									}
								}
								else {	// 2017.3.15 當簽稿會核單禁止編輯內文時不要同步會辦單位, 問題1060140
									theLogger.warn("簽稿會核單禁止編輯內文, 不要同步會辦單位");
								}
								dfd.resolve(dm);	// 2016.9.2 改成deferred模式
							});
							return dfd.promise();
						}
					}
				}
				// 搜尋簽稿會核單樣版
				function recursive(nd) {
					for(var i=0; i<nd.children.length; i++) {
						if(nd.children[i].type == 1){	// RsrcConst.FILE
							if(nd.children[i].docType == "簽稿會核單") {
								theLogger.log("找到'簽稿會核單'樣版(" + nd.children[i].remote.path + ")");
								return nd.children[i];
							}
						}
						else {	// RsrcConst.DIR
							var child = nd.children[i];
							var res = recursive(child);
							if(res)
								return res;
						}
					}
				}
				var res = null;
				thePublicRsrc.enumDirs("樣版", function(dir) {
					res = recursive(dir);
					if(res)
						return false;
				});
				if(res) {
					// 1110609 Raymond 1110283 傳入新增的第4個dmSrc參數給newDraft函式
					// 1090513 Raymond 1090223 新增done handler的第2參數, 若有自動調整簽稿會核單順序時傳入
					//that.newDraft(res, syncConUnitsAndSubject).done(function(idx) {	// 2016.8.25 從樣版新增簽稿會核單時改叫syncConUnitsAndSubject
					//that.newDraft(res, syncConUnitsAndSubject).done(function(idx, adjustOrderParam) {	// 2016.8.25 從樣版新增簽稿會核單時改叫syncConUnitsAndSubject
					that.newDraft(res, syncConUnitsAndSubject, undefined, dmSrc).done(function(idx, adjustOrderParam) {	// 2016.8.25 從樣版新增簽稿會核單時改叫syncConUnitsAndSubject
						// 1090513 Raymond 109223 叫用autoGenCon的地方已對應呼叫updateDraftTags, 不需重複呼叫
						//theLogger.log("新增成功, 更新文稿頁籤..." + idx);
						// 更新文稿頁籤
						//for(i=0; i<_views.length; i++) {
						//	_views[i].updateDraftTags();
						//}
						that.accquireDraftModel(idx).done(function(dm) {	// 2016.9.2 新增取得自動新的的簽稿會核單DM
							// 1091111 Raymond 1090756 自動新增簽稿會核單時, 將根節點的NewDraft屬性設為'N'
							dm.attr("/*/@NewDraft", "N");
							// 1090513 Raymond 1090223 新增第2個參數傳入true, 表示此簽稿會核單dm是新增的, 第3參數直接將newDraft回傳的adjustOrderParam傳入
							//dfd.resolve(dm);	// 2016.9.2 改成deferred模式
							dfd.resolve(dm, true, adjustOrderParam);
						});
					})
					.fail(function(errorText) {
						theLogger.error("新增簽稿會核單失敗, " + errorText);
						dfd.reject(errorText);
					});
				}
				else {
					theLogger.error("找不到'簽稿會核單'的樣版檔, 無法自動新增");
					dfd.reject("找不到'簽稿會核單'的樣版檔, 無法自動新增");	// 2016.9.2 改成deferred模式
				}
			}
			else {
				theLogger.error("無可編輯的文稿管理檔可自動新增簽稿會核單");
				dfd.reject("無可編輯的文稿管理檔可自動新增簽稿會核單");	// 2016.9.2 改成deferred模式
			}
			return dfd.promise();	// 2016.9.2 改成deferred模式
		},
		// 1101203 Raymond 1101369 新增在其他文稿異動會辦單位, 但單位數量未達門檻值時, 也要同步到既有的簽稿會核單功能
		syncConUnitsOfCoworkDraft: function(conUnits) {
			var dfd = $.Deferred();
			function syncConUnits(xmlDoc) {
				var $conUnits = $(xmlDoc.documentElement).find("會稿單位列表");
				if($conUnits.length) {
					$conUnits.children().remove();
					for(var i=0; i<conUnits.length; i++) {
						theLogger.log("新增'" + conUnits[i].name + "', 代碼:" + conUnits[i].value + ", type:" + conUnits[i].type);
						// 2016.8.18 for IE-compatible
						var u = xmlDoc.createElement("單位");
						u.setAttribute("代碼", conUnits[i].value);
						u.setAttribute("type", conUnits[i].type);
						if("text" in u)
							u.text = conUnits[i].name;
						else
							u.textContent = conUnits[i].name;
						$conUnits.append(u);
					}
					if("xml" in xmlDoc) {	// debug for IE
						theLogger.log(xmlDoc.xml);
					}
					else
						theLogger.log(xmlDoc);
				}
				// 1121208 Raymond 1120887 簽稿會核單若支援簽核區域增高, 則從<會辦意見列表>下新增<會辦意見>, 並複製<預設意見文字>至其下
				let $conCmtList = $(xmlDoc.documentElement).find("會辦意見列表");
				if($conCmtList.length) {
					let defSAHeight = $conCmtList.attr("預設簽核區域高度");
					let defCmdText = $conCmtList.find("預設意見文字").get(0).innerHTML;
					for(let i=0; i<conUnits.length; i++) {
						let alreadyExist = false;
						$conCmtList.find("會辦意見").each(function(idx, elm) {
							if(elm.getAttribute("代碼") == conUnits[i].value) {
								theLogger.log("代碼'" + conUnits[i].value + "'之會辦意見已存在");
								alreadyExist = true;
								//if(i != idx)	// 應調序?
								return false;
							}
						});
						if(!alreadyExist) {
							theLogger.log("新增代碼'" + conUnits[i].value + "'之會辦意見");
							let newConCmt = xmlDoc.createElement("會辦意見");
							newConCmt.setAttribute("代碼", conUnits[i].value);
							newConCmt.setAttribute("簽核區域排版高度", defSAHeight);
							$(newConCmt).html(defCmdText);
							$conCmtList.append(newConCmt);
						}
					}
				}
			}
			// 1110610 Raymond 1110283 新增航港局邏輯的自動產生簽稿會核單
			var genCon4MPB = theSSO.User.EnvSettings.get("WE_GEN_CON_FOR_MPB") == "Y",
				lastCon = {sn: -1, idx: undefined, createTime: "", createSN: "-1"};
			// 先檢查是否已有簽稿會核單
			var that = this;
			if(typeof _currMgmt !== "undefined") {
				if(_docObj.signType == "P") {	// 2016.10.31 bugfix
					var all = _currMgmt.getAllDrafts();
					for(var i=0; i<all.length; i++) {
						var dt = all[i].docType;
						// 1110610 Raymond 1110283 新增航港局邏輯的自動產生簽稿會核單, 以最後新增的簽稿會核單為更新標的
						if(genCon4MPB) {
							if(dt == "簽稿會核單" && !_currMgmt.isClosedDraft(i)) {	// 須排除結案前已新增的簽稿會核單
								if(!!all[i].createTime && all[i].createTime > lastCon.createTime) {	// createTime「原稿新增日期時間」是本單新增之屬性, 若文稿有記錄此屬性則以此屬性優先比對
									lastCon.createTime = all[i].createTime;
									lastCon.createSN = all[i].createSN;	// 也記錄「原稿新增階段序號」, 若有新舊文稿並存時, 可改以此屬性比對
									lastCon.idx = i;
								}
								else if(!all[i].createTime && all[i].createSN > lastCon.createSN) {	// createSN「原稿新增階段序號」為既有屬性, 但若同一流程點新增兩筆以上簽稿會核單, 則分不出何者較新
									lastCon.createSN = all[i].createSN;
									lastCon.idx = i;
								}
							}
						}
						else
						if(dt == "簽稿會核單" && !_currMgmt.isClosedDraft(i)) {	// 須排除結案前已新增的簽稿會核單
							theLogger.log("公文夾已有簽稿會核單, 不需重複新增, 僅同步會辦單位...");
							that.accquireDraftModel(i).done(function(dm) {
								syncConUnits(dm.accquireXml());
								dm.needRetransFO(true);
								dfd.resolve(dm);
							});
							return dfd.promise();
						}
					}
					// 1110610 Raymond 1110283 新增航港局邏輯的自動產生簽稿會核單, 以最後新增的簽稿會核單為更新標的
					if(genCon4MPB && lastCon.createSN >= 0) {
						theLogger.log("第" + lastCon.idx + "個文稿是最後新增的簽稿會核單, 更新既有簽稿會核單");
						that.accquireDraftModel(lastCon.idx).done(function(dm) {
							syncConUnits(dm.accquireXml());
							dm.needRetransFO(true);
							dfd.resolve(dm);
						});
						return dfd.promise();
					}
				}
				else {
					var n = _signFolder.getDraftCounts();
					for(var i=0; i<n; i++) {
						var d = _signFolder.getDraft(i);
						if("fromType" in d) {
							theLogger.log("第" + i + "個文稿是電子來文, 忽略");
							continue;
						}
						else if(d.name == "來文簽辦") {
							theLogger.log("第" + i + "個文稿是來文簽辦, 忽略");
							continue;
						}
						// 1110610 Raymond 1110283 新增航港局邏輯的自動產生簽稿會核單, 以最後新增的簽稿會核單為更新標的
						if(genCon4MPB) {
							if(d.docType == "簽稿會核單" && !that.isClosedDraft(i)) {	// 須排除結案前已新增的簽稿會核單
								if(d.sn > lastCon.sn) {
									lastCon.sn = d.sn;
									lastCon.idx = i;
								}
							}
						}
						else
						if(d.docType == "簽稿會核單" && !that.isClosedDraft(i)) {	// 須排除結案前已新增的簽稿會核單
							theLogger.log("第" + i + "個文稿是簽稿會核單, 更新既有簽稿會核單");
							that.accquireDraftModel(i).done(function(dm) {
								if(dm.getEditable()) {
									// 1100618 Raymond 1100482 新增若啟用簽稿會核單保留簽核物件功能, 則判斷既有的簽稿會核單是否為不同流程點所新增的, 若是則僅允許異動案情摘要(主旨)欄, 故不要同步會辦單位清單
									if(theSSO.User.EnvSettings.get("WE_ALLOW_CON_KEEP_SIGNOBJ") == "Y" && dm.getCreateSN() != dm.getEditSN()) {
										theLogger.warn("啟用簽稿會核單保留簽核物件(環境變數'WE_ALLOW_CON_KEEP_SIGNOBJ'設為'Y')功能時, 簽稿會核單在新增的流程點與目前流程點不同時, 禁止異動'會稿單位列表'欄");
										alert("當啟用簽稿會核單保留簽核物件功能時,\r\n由於既有的簽稿會核單非目前流程點所新增,\r\n中止同步異動其「會稿單位」!");
									}
									else {
										syncConUnits(dm.accquireXml());
										dm.needRetransFO(true);
										d.dirty(true);	// 2017.1.16 bugfix for 同步至簽稿會核單時, 簽稿會核單文稿的狀態仍未異動導致不會寫入SignWork.xml的Updates問題
									}
								}
								else {	// 2017.3.15 當簽稿會核單禁止編輯內文時不要同步會辦單位, 問題1060140
									theLogger.warn("簽稿會核單禁止編輯內文, 不要同步會辦單位");
								}
								dfd.resolve(dm);
							});
							return dfd.promise();
						}
					}
					// 1110610 Raymond 1110283 新增航港局邏輯的自動產生簽稿會核單, 以最後新增的簽稿會核單為更新標的
					if(genCon4MPB && lastCon.sn >= 0) {
						theLogger.log("第" + lastCon.idx + "個文稿是最後新增的簽稿會核單, 更新既有簽稿會核單");
						that.accquireDraftModel(lastCon.idx).done(function(dm) {
							if(dm.getEditable()) {
								// 1100618 Raymond 1100482 新增若啟用簽稿會核單保留簽核物件功能, 則判斷既有的簽稿會核單是否為不同流程點所新增的, 若是則僅允許異動案情摘要(主旨)欄, 故不要同步會辦單位清單
								if(theSSO.User.EnvSettings.get("WE_ALLOW_CON_KEEP_SIGNOBJ") == "Y" && dm.getCreateSN() != dm.getEditSN()) {
									theLogger.warn("啟用簽稿會核單保留簽核物件(環境變數'WE_ALLOW_CON_KEEP_SIGNOBJ'設為'Y')功能時, 簽稿會核單在新增的流程點與目前流程點不同時, 禁止異動'會稿單位列表'欄");
									alert("當啟用簽稿會核單保留簽核物件功能時,\r\n由於既有的簽稿會核單非目前流程點所新增,\r\n中止同步異動其「會稿單位」!");
								}
								else {
									syncConUnits(dm.accquireXml());
									dm.needRetransFO(true);
									_signFolder.getDraft(lastCon.idx).dirty(true);	// 2017.1.16 bugfix for 同步至簽稿會核單時, 簽稿會核單文稿的狀態仍未異動導致不會寫入SignWork.xml的Updates問題
								}
							}
							else {	// 2017.3.15 當簽稿會核單禁止編輯內文時不要同步會辦單位, 問題1060140
								theLogger.warn("簽稿會核單禁止編輯內文, 不要同步會辦單位");
							}
							dfd.resolve(dm);
						});
						return dfd.promise();
					}
				}
				dfd.resolve(null);	// 未結案公文內無任何簽稿會核單, 或已結案公文內無任何結案後新增的簽稿會核單, 回傳null
			}
			else {
				theLogger.error("無可編輯的文稿管理檔可搜尋簽稿會核單");
				dfd.reject("無可編輯的文稿管理檔可搜尋簽稿會核單");
			}
			return dfd.promise();
		},
		
		// 2016.10.11 指定自樣版檔新增文稿(由MP呼叫)
		newDraftFromTmpl: function(options) {
			if(_currMgmt) {
				if("new_draft_from_tmpl" in localStorage && localStorage['new_draft_from_tmpl'].length > 0) {
					// 1140930 Raymond 中榮序260 復原弱掃導致開啟舊檔載入的XML字串變成"&gt;函&gt;"這種形式而無法載入的問題
					//1140723	Leslie[1141011]	弱掃修正[Client DOM Stored XSS]
					this.newDraft(JSON.parse(localStorage['new_draft_from_tmpl']))
					//this.newDraft(JSON.parse(HtmlEncode(localStorage['new_draft_from_tmpl'])))
						.done(function(draftIdx) {
							localStorage.removeItem('new_draft_from_tmpl');
							if(options && options.success)
								options.success.call(this, draftIdx);
						})
						.fail(function(errorText) {
							if(options && options.error)
								options.error.call(this, errorText);
						});
				}
				else if(options && options.success)
					options.success.call(this);
			}
			else {
				// 1121123 Raymond 序214、257 修正開啟會核中-主辦(唯讀、不可編輯)公文, 第一次點左邊新增稿件, 系統會跳警告無法新增文稿, 關閉後再開啟, 公文會呈現無文稿狀態, 左邊"新增稿件"頁籤會變成"創稿", 點了會新增一筆新的草稿公文的問題
				if("new_draft_from_tmpl" in localStorage)
					localStorage.removeItem('new_draft_from_tmpl');
				if(options && options.error) {
					// 1090916 Raymond 1090564 信保特殊模式不提供新增文稿功能
					if(_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
						options.error.call(this, "特殊模式公文不可新增文稿");
					else
					options.error.call(this, "此筆公文無任何可編輯的文稿管理檔可新增文稿");
				}
			}
		},
		
		// 1130809 Raymond 1130313 合併1111007(1100394), 新增keepAttNode參數, 匯入ZIP壓縮檔中的文稿檔時, 在套用樣版檔時保留附件檔名節點使用, 再新增mmXmlStr, 為對照表檔案內容
		// 1120407 Raymond 銓敘部序209(1110885衍生需求) 新增第5參數preventFromOrg, 傳入true表示不要預帶來文機關為正本受文者
		// 1110609 Raymond 1110283 新增第4參數, 傳入觸發自動產生簽稿會核單的來源文稿dmSrc, 以供啟用航港局自動產生簽稿會核單的排序邏輯使用
		// 1090515 Raymond 1090347 新增第3參數, 傳入true表示不要自動產生簽稿會核單
		// 從樣版檔新增文稿
		//newDraft: function(rsrcFile, postNewDraft) {
		//newDraft: function(rsrcFile, postNewDraft, preventGenCon, dmSrc) {
		//newDraft: function(rsrcFile, postNewDraft, preventGenCon, dmSrc, preventFromOrg) {
		newDraft: function(rsrcFile, postNewDraft, preventGenCon, dmSrc, preventFromOrg, keepAttNode, mmXmlStr) {
			//alert("新增文稿 '" + rsrcFile.name + "'\n" + rsrcFile.docType + "," + rsrcFile.subDocType + "\n" + rsrcFile.remote.getFullPath());
			var dfd = $.Deferred();
			var that = this;
			if(typeof _currMgmt !== "undefined") {
				// 1141022 Raymond 1141125 新增從MP匯入多人格式調派令、晉升令、獎勵令CSV功能
				if(typeof rsrcFile == "object" && !!rsrcFile.content) {
					// 匯入調派令CSV(多人)
					if("docType" in rsrcFile && rsrcFile.docType == "多人格式調派令CSV") {
						theLogger.log("新增文稿(MP匯入多人格式調派令CSV)'" + rsrcFile.content.substring(0, 30) + "...'");
						return that.newTAITRACSVDraft(rsrcFile.content);
					}
					// 匯入晉升令CSV(多人)
					else if("docType" in rsrcFile && rsrcFile.docType == "多人格式晉升令CSV") {
						theLogger.log("新增文稿(MP匯入多人格式晉升令CSV)'" + rsrcFile.content.substring(0, 30) + "...'");
						return that.newTAITRACSV2Draft(rsrcFile.content);
					}
					// 匯入獎勵令CSV(多人)
					else if("docType" in rsrcFile && rsrcFile.docType == "多人格式獎勵令CSV") {
						theLogger.log("新增文稿(MP匯入多人格式獎勵令CSV)'" + rsrcFile.content.substring(0, 30) + "...'");
						return that.newTAITRACSV3Draft(rsrcFile.content);
					}
				}
				// 1100830 Raymond 1100868 用function包起來, 給後面非同步叫用
				function doNewDraft() {
				
				if(SSOUtil.typeOf(rsrcFile) == "string" || "content" in rsrcFile && rsrcFile.content.length > 0) {	// 2016.8.16 新增字串形式(從開啟舊檔來)
					var str;
					if(SSOUtil.typeOf(rsrcFile) == "string") {
						theLogger.log("新增文稿(開啟舊檔)'" + rsrcFile.substring(0, 30) + "...'");
						str = rsrcFile;
					}
					// 1130809 Raymond 1130313 合併1111007(1100394), 新增從MP開啟離線模式另存整份公文的ZIP壓縮檔功能
					else if("content" in rsrcFile && rsrcFile.content.match(/^blob:/)) {
						theLogger.log("開啟ZIP檔(MP開啟舊檔)'" + rsrcFile.content + "'");
						// 1130809 Raymond 1130313 合併1111007, 因為包成doNewDraft function, this改成that, 要接done再resolve
						//return this.newDraftsFromZip(rsrcFile.content);
						that.newDraftsFromZip(rsrcFile.content).done(dfd.resolve).fail(dfd.reject);
						return;
					}
					else {
						theLogger.log("新增文稿(MP開啟舊檔)'" + rsrcFile.content.substring(0, 30) + "...'");
						str = rsrcFile.content;
					}
					
					if("ActiveXObject" in window) {// for IE-compatible
						var xmlDoc = new ActiveXObject("MSXML2.DOMDocument");
						xmlDoc.resolveExternals = false;
						xmlDoc.validateOnParse = false;		// 2016.12.19 fix for 匯入DI
						xmlDoc.preserveWhiteSpace = true;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
						if(xmlDoc.loadXML(str)) {
							preprocessXML(xmlDoc);	// 2016.12.26 匯入DI時的前置處理
							// 1130809 Raymond 1130313 合併1111007(1100394), 新增keepAttNode參數, 匯入ZIP壓縮檔中的文稿檔時, 在套用樣版檔時保留附件檔名節點使用
							// 1100505 Raymond 1090542 新增第2參數, 傳入1表示開啟舊檔
							// 1100311 Raymond 1090991 新增回傳值, 若有啟用開啟舊檔時選取套用樣版功能, 則會將所選取樣版檔設定的"預設排版"屬性回傳
							//supplyFromTemplate(xmlDoc).done(function() {
							//supplyFromTemplate(xmlDoc).done(function(defPrintXSLName) {
							//supplyFromTemplate(xmlDoc, 1).done(function(defPrintXSLName) {
							supplyFromTemplate(xmlDoc, 1, keepAttNode).done(function(defPrintXSLName) {
								// 1130809 Raymond 1130313 合併1111007(1100394), 新增mmXmlStr參數, 表示從ZIP中一起打包匯入的對照表檔案內容
								// 1100311 Raymond 1090991 新增傳入樣版檔案的預設排版檔名稱
								// 1060509 Raymond 1060147新增isImport參數, 設為true表示是開啟舊檔所匯入的文稿
								//onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName);
								//onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName, true);
								//onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName, true, defPrintXSLName);
								onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName, true, defPrintXSLName, mmXmlStr);
							})
							.fail(function(errorText) {
								theLogger.error(errorText);
								// 1100813 Raymond 1090991 開啟舊檔若需選取樣版時按取消, 改成不匯入這筆文稿
								if(errorText == "userCancel") {
									theLogger.warn("使用者取消選擇樣版版, 即取消開啟舊檔");
									dfd.reject("使用者取消");
								}
								else
								// 1130809 Raymond 1130313 合併1111007(1100394), 新增mmXmlStr參數, 表示從ZIP中一起打包匯入的對照表檔案內容
								// 1060509 Raymond 1060147新增isImport參數, 設為true表示是開啟舊檔所匯入的文稿
								//onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName);	// 無法從樣版檔補充欄位也要載入
								//onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName, true);	// 無法從樣版檔補充欄位也要載入
								onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName, true, undefined, mmXmlStr);	// 無法從樣版檔補充欄位也要載入
							});
						}
						else {
							var pe = xmlDoc.parseError;
							theLogger.error("(IE)載入XML失敗!" + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
							dfd.reject(pe.reason);
						}
					}
					else {	// for Non-IE
						try {
							var xmlDoc = (new DOMParser()).parseFromString(str, "text/xml");
							// 從讀取本地檔匯入的文稿, 需要用Template補充節點
							preprocessXML(xmlDoc);	// 2016.12.26 匯入DI時的前置處理
							// 1140515 Raymond 1140198 新增檢核匯入舊檔的FromNo屬性是否與其它文稿一致, 若不一致則提示警告訊息並終止匯入
							checkFromNo4VAC.call(that, xmlDoc).done(function() {
							// 1130809 Raymond 1130313 合併1111007(1100394), 新增keepAttNode參數, 匯入ZIP壓縮檔中的文稿檔時, 在套用樣版檔時保留附件檔名節點使用
							// 1100505 Raymond 1090542 新增第2參數, 傳入1表示開啟舊檔
							// 1100311 Raymond 1090991 新增回傳值, 若有啟用開啟舊檔時選取套用樣版功能, 則會將所選取樣版檔設定的"預設排版"屬性回傳
							//supplyFromTemplate(xmlDoc).done(function() {
							//supplyFromTemplate(xmlDoc).done(function(defPrintXSLName) {
							//supplyFromTemplate(xmlDoc, 1).done(function(defPrintXSLName) {
							supplyFromTemplate(xmlDoc, 1, keepAttNode).done(function(defPrintXSLName) {
								// 1130809 Raymond 1130313 合併1111007(1100394), 新增mmXmlStr參數, 表示從ZIP中一起打包匯入的對照表檔案內容
								// 1100311 Raymond 1090991 新增傳入樣版檔案的預設排版檔名稱
								// 1060509 Raymond 1060147新增isImport參數, 設為true表示是開啟舊檔所匯入的文稿
								//onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName);
								//onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName, true);
								//onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName, true, defPrintXSLName);
								onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName, true, defPrintXSLName, mmXmlStr);
							})
							.fail(function(errorText) {
								theLogger.error(errorText);
								// 1100813 Raymond 1090991 開啟舊檔若需選取樣版時按取消, 改成不匯入這筆文稿
								if(errorText == "userCancel") {
									theLogger.warn("使用者取消選擇樣版版, 即取消開啟舊檔");
									dfd.reject("使用者取消");
								}
								else
								// 1130809 Raymond 1130313 合併1111007(1100394), 新增mmXmlStr參數, 表示從ZIP中一起打包匯入的對照表檔案內容
								// 1060509 Raymond 1060147新增isImport參數, 設為true表示是開啟舊檔所匯入的文稿
								//onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName);	// 無法從樣版檔補充欄位也要載入
								//onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName, true);	// 無法從樣版檔補充欄位也要載入
								onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName, true, undefined, mmXmlStr);	// 無法從樣版檔補充欄位也要載入
							});
							// 1140515 Raymond 1140198 新增檢核匯入DI的FromNo屬性是否與其它文稿一致, 若不一致則提示警告訊息並終止匯入
							})
							.fail(function(errorText) {
								theLogger.error(errorText);
								alert(errorText);
								dfd.reject(errorText);
							});
						}
						catch(e) {
							theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
							dfd.reject(e.message);
						}
					}
				}
				else {
					// 1081210 Raymond 1080786 合併內政部單號1070657, 從自訂範本新增文稿時無docType、subDocType, 改用id(共通版的自訂範本沒有類別cls屬性)
					//theLogger.log("新增文稿'" + rsrcFile.name + "'(" + rsrcFile.docType + ", " + rsrcFile.subDocType + ") '" + rsrcFile.filePath + "'");
					theLogger.log("新增文稿'" + rsrcFile.name + "'(" + (rsrcFile.docType || rsrcFile.id) + ", " + (rsrcFile.subDocType || "") + ") '" + rsrcFile.filePath + "'");
					theCacheMgr.get({type: "rsrc", rsrc: rsrcFile})
						.done(function(xmlDoc) {
							// 1090423 Raymond 1090257 新增判斷type是否大於0, 1表示共用範本, 2表示個人範本, 大於0即為範本
							if("type" in rsrcFile && rsrcFile.type > 0) {
								// 若是範本則檢查並清空<附件檔名>
								var $attFiles = $(xmlDoc.documentElement).find("附件列表 > 附件檔名");
								if($attFiles.length > 0) {
									theLogger.log("清空從範本所匯入的附件檔名(" + $attFiles.length + "筆)資訊");
									$attFiles.remove();
								}
								// 1150107 Raymond 北榮序10 當SSO_CONFIG.OrgNickName為"TPVGH"(北榮)時, 匯入範本時清空署名2內容
								if(SSO_CONFIG.OrgNickName == "TPVGH") {
									let $targ = $(xmlDoc.documentElement).find("署名");
									if($targ.length > 1) {
										theLogger.log("(北榮客製化)清空從範本所匯入的署名2資訊'" + $targ.eq(1).text() + "'");
										$targ.eq(1).text("");
									}
								}
							}
							// 1080726 Raymond 1080575 匯入自訂範本的新增文稿改依"開啟舊檔"邏輯以樣版為底, 故不需要特別再補年度、流水號、支號
							// 1060830 Raymond 1060796 補充因自訂範本清掉的發文字號的文號的子標籤 - 年度、流水號、支號
							/*var $issueNo = $(xmlDoc.documentElement).find("發文字號 > 文號");
							if($issueNo.length > 0) {
								if ($issueNo.find("年度").length == 0 ||
									$issueNo.find("流水號").length == 0) {
									theLogger.warn("補充發文字號缺少的子標籤「年度」、「流水號」、「支號」");
									while($issueNo.get(0).childNodes.length > 0)	// IE無法用$issueNo.empty()
										$issueNo.get(0).removeChild($issueNo.get(0).childNodes[0]);
									$issueNo.get(0).appendChild(xmlDoc.createElement("年度"));	// IE無法用$issueNo.append()
									$issueNo.get(0).appendChild(xmlDoc.createElement("流水號"));
									$issueNo.get(0).appendChild(xmlDoc.createElement("支號"));
								}
							}*/
							if(!("docType" in rsrcFile)) {	// 共同版自訂範本沒docType
								preprocessXML(xmlDoc);	// 2016.12.26 匯入DI時的前置處理
								// 1100311 Raymond 1090991 新增回傳值, 若有啟用開啟舊檔時選取套用樣版功能, 則會將所選取樣版檔設定的"預設排版"屬性回傳
								//supplyFromTemplate(xmlDoc).done(function() {
								supplyFromTemplate(xmlDoc).done(function(defPrintXSLName) {
									// 1100311 Raymond 1090991 新增傳入樣版檔案的預設排版檔名稱
									// 1060509 Raymond 1060147新增isImport參數, 設為true表示是開啟舊檔所匯入的文稿
									//onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName);
									//onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName, true);
									onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName, true, defPrintXSLName);
								})
								.fail(function(errorText) {
									theLogger.error(errorText);
									// 1060509 Raymond 1060147新增isImport參數, 設為true表示是開啟舊檔所匯入的文稿
									//onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName);	// 無法從樣版檔補充欄位也要載入
									onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName, true);	// 無法從樣版檔補充欄位也要載入
								});
							}
							else {	// 反之樣版有docType
								// 1100310 Raymond 1090991 新增傳入樣版檔案的預設排版檔名稱
								// 1060509 Raymond 1060147新增isImport參數, 設為false表示是從樣版新增的文稿
								//onLoadXML(xmlDoc, rsrcFile.docType);
								//onLoadXML(xmlDoc, rsrcFile.docType, false);
								onLoadXML(xmlDoc, rsrcFile.docType, false, rsrcFile.defPrintXSLName);
							}
						})
						.fail(function(errorText) {
							dfd.reject(errorText);
						});
				}
				
				}// 1100830 Raymond 1100868 end of doNewDraft()
				// 1100830 Raymond 1100868 新增非同步呼叫_view[0].save()以同步主旨到基資
				if(_views.length > 0) {
					theLogger.log("新增文稿前同步基資");
					_views[0].save().done(doNewDraft);
				}
				else
					doNewDraft();
				// 1130809 Raymond 1130313 合併1111007(1100394), 新增mmXmlStr參數, 表示從ZIP中一起打包的對照表檔案內容
				// 1100310 Raymond 1090991 新增defPrintXSLName, 傳入樣版資源檔設好的預設排版資源檔名稱, 若是開啟舊檔或貼上稿件則此參數應為undefined
				// 1060509 Raymond 1060147新增isImport參數, true表示是開啟舊檔所匯入的文稿, false表示是從樣版新增的文稿
				//function onLoadXML(xmlDoc, docType) {
				//function onLoadXML(xmlDoc, docType, isImport) {
				//function onLoadXML(xmlDoc, docType, isImport, defPrintXSLName) {
				function onLoadXML(xmlDoc, docType, isImport, defPrintXSLName, mmXmlStr) {
					if("xml" in xmlDoc)	// for IE-compatible
						theLogger.log(xmlDoc.xml);
					else
						theLogger.log(xmlDoc);
					// 2016.6.21 呼叫新增文稿後的擴充功能(ex.代預設值...)
					if("onNewDraftExt" in nsEditor) {
						try {
							theLogger.log("執行新增文稿後續擴充功能...");
							// 1120407 Raymond 銓敘部序209(1110885衍生需求) 新增preventFromOrg參數, 傳入true表示不要預帶來文機關為正本受文者
							// 1060509 Raymond 1060147新增isImport參數, true表示是開啟舊檔所匯入的文稿, false表示是從樣版新增的文稿
							//nsEditor.onNewDraftExt.call(that, xmlDoc);
							//nsEditor.onNewDraftExt.call(that, xmlDoc, isImport);
							nsEditor.onNewDraftExt.call(that, xmlDoc, isImport, preventFromOrg);
						}
						catch(e) {
							theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
						}
					}
					// 2016.8.4 呼叫新增文稿後的補充修正功能(簽稿會核單的會辦單位同步)
					if(postNewDraft && $.isFunction(postNewDraft)) {
						try {
							theLogger.log("執行新增文稿後補充修正功能...");
							postNewDraft(xmlDoc);
						}
						catch(e) {
							theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
						}
					}
					// 1060707 Raymond 1060361 自訂範本未定義文別屬性, 須額外從文稿中取得
					if(typeof docType === "undefined") {
						docType = xmlDoc.documentElement.nodeName;
						theLogger.log("新增文稿未指定文別, 從文稿中取得 - '" + docType + "'");
					}
					
					// 新增加入至目前文稿管理檔
					//_currMgmt.newDraft(xmlDoc, docType, isImport)	// 1060620 Raymond 1060147 新增第3參數, 標記是否為開啟舊檔所新增之文稿
					//_currMgmt.newDraft(xmlDoc, docType, isImport, defPrintXSLName)	// 1100310 Raymond 1090991 新增第4參數, 傳入樣版檔案的預設排版檔名稱
					_currMgmt.newDraft(xmlDoc, docType, isImport, defPrintXSLName, mmXmlStr)	// 1130809 Raymond 1130313 合併1111007(1100394), 新增第5參數, 為從ZIP中一起打包的對照表檔案內容
						.done(function(idx, draft, subDirName) {
							// 1081210 Raymond 1080786 合併內政部單號1070657, 新增變數記錄最後要resolve的回傳值
							var resIdx;
							// 1090513 Raymond 1090223 新增調整稿序參數
							var adjustOrderParam;
							
							if(_docObj.signType == "E") {
								_newDraftId++;
								var newDraftId = "NewDraft" + _newDraftId;
								_apd.push({	guid: draft.guid,
											subDocType: draft.subDocType,
											lastAutoObj: 0,
											//printXSL: draft.printXsl,
											printXSL: draft.applyPrintXSL,	// 1060913 Raymond 1060756 修正多樣版的文稿儲存關閉後再開, 仍會詢問套用樣版的問題
											versions: [{
												id: newDraftId,
												docType: draft.docType,
												copy: "",	// 抄本?
												reserveSO: false,	// 保留簽署意見
											}]});
								// 新增加入至目前封裝檔
								_signFolder.newDraft({name: draft.name, msgId: _docObj.msgId, fileName: subDirName + "\\" + draft.fileName, docType: draft.docType, subDocType: draft.subDocType, createTime: new Date(), guid: draft.guid, id: newDraftId});
								
								// 1130606	Leslie[1130077]	[併1130078]當系統於當前文稿觸發自動備份後，若使用者操作增/刪文稿、附件(連動影響封裝內容)時，則主動觸發一次自動備份
								if(_backuped)
									setTimeout(function() {that.backup();}, 1000);
								
								// 2016.8.23 FIX線上簽核來文擬辦, 文稿序少1問題
								if(_signFolder.hasFromDoc()) {
									// 1100512 Raymond 1090821 有外機關文稿時, 回傳稿序要再減1
									if(_signFolder.hasExorgDraft())
										dfd.resolve(_signFolder.getDraftCounts() - 3);
									else
									// 1081210 Raymond 1080786 合併內政部單號1070657, 記錄最後要resolve的回傳值
									//dfd.resolve(_signFolder.getDraftCounts() - 2);
									resIdx = _signFolder.getDraftCounts() - 2;
								}
								// 1100512 Raymond 1090821 有外機關文稿時, 回傳稿序要再減1
								else if(_signFolder.hasExorgDraft()) {
									dfd.resolve(_signFolder.getDraftCounts() - 2);
								}
								else
									// 1081210 Raymond 1080786 合併內政部單號1070657, 記錄最後要resolve的回傳值
									//dfd.resolve(_signFolder.getDraftCounts() - 1);
									resIdx = _signFolder.getDraftCounts() - 1;
							}
							else {	// 紙本
								// 1081210 Raymond 1080786 合併內政部單號1070657, 記錄最後要resolve的回傳值
								//dfd.resolve(idx);
								resIdx = idx;
							}
							// 1110609 Raymond 1110283 新增航港局的自動產生簽稿會核單的排序邏輯, 此功能優先於AOL_AUTO_ADJ_CON_FIRST所啟用的邏輯
							if(docType == "簽稿會核單" && theSSO.User.EnvSettings.get("AOL_AUTO_ADJ_CON_FOR_MPB") == "Y") {
								// 1110816 Raymond 航港局序225 修正在啟用航港局自動產生簽稿會核單的排序邏輯功能後, 手動新增簽稿會核單因無dmSrc而發生Error的問題, 手動新增的簽稿會核單不套用任何調整稿序邏輯, 與一般文別相同新增在最後一筆
								if(!!dmSrc) {
									var idxOfSrcDM = dmSrc.getIndex();
									var docTypeOfSrcDM = dmSrc.getDocType();
									var n = that.getDraftCounts();
									if(_docObj.signType == "E" && _signFolder.hasFromDoc())	// 線上簽核且有來文則排除來文
										n--;
									// 依主辦或會辦單位過濾可調整稿序的文稿清單
									adjustOrderParam = [];
									for(var i=0, j=0; i<n; i++) {
										var draftOU = that.getConDraftUnitNo(i);
										if ((_isConUnit && draftOU == _docObj.ownOUId.substr(0, 2)) ||	// 會辦公文, 同單位的文稿才可以調整稿序
											(!_isConUnit && draftOU == "00")) {					// 主辦, 00子目錄的文稿才可以調整稿序
											adjustOrderParam.push({
												origIdx: i,			// 封裝檔的索引
												origMgmtIdx: j++,	// 各別主會辦子目錄中DraftMgmt的索引
												name: that.getDraftName(i)
											});
										}
									}
									theLogger.log(adjustOrderParam);
									// 1140701 Raymond 1140919 修改為變數判定
									//if(docTypeOfSrcDM == "存查批示單") {
									if(docTypeOfSrcDM == _autoGenInstructionSheet2ndDocType) {
										adjustOrderParam.splice(idxOfSrcDM, 0, adjustOrderParam.pop());	// pop取出最後加入的文稿, splice插入存查批示單本來的位置
										resIdx = idxOfSrcDM;
									}
									else if(docTypeOfSrcDM == "文稿批示單" && idxOfSrcDM < (adjustOrderParam.length - 1)) {
										adjustOrderParam.splice(idxOfSrcDM + 1, 0, adjustOrderParam.pop());	// pop取出最後加入的文稿, splice插入文稿批示單後一個的位置
										resIdx = idxOfSrcDM + 1;
									}
									theLogger.log(adjustOrderParam);
									that.adjustOrder(adjustOrderParam);
								}
							}
							else
							// 1090511 Raymond 1090223 檢核自動調整簽稿會核單為第一筆順序
							if(docType == "簽稿會核單" && theSSO.User.EnvSettings.get("AOL_AUTO_ADJ_CON_FIRST") == "Y") {
								var n = that.getDraftCounts();
								if(_docObj.signType == "E" && _signFolder.hasFromDoc())	// 線上簽核且有來文則排除來文
									n--;
								// 依主辦或會辦單位過濾可調整稿序的文稿清單
								adjustOrderParam = [];
								for(var i=0, j=0; i<n; i++) {
									var draftOU = that.getConDraftUnitNo(i);
									if ((_isConUnit && draftOU == _docObj.ownOUId.substr(0, 2)) ||	// 會辦公文, 同單位的文稿才可以調整稿序
										(!_isConUnit && draftOU == "00")) {					// 主辦, 00子目錄的文稿才可以調整稿序
										adjustOrderParam.push({
											origIdx: i,			// 封裝檔的索引
											origMgmtIdx: j++,	// 各別主會辦子目錄中DraftMgmt的索引
											name: that.getDraftName(i)
										});
									}
								}
								theLogger.log(adjustOrderParam);
								adjustOrderParam.splice(0, 0, adjustOrderParam.pop());	// pop取出最後加入的文稿, splice插入第1位
								theLogger.log(adjustOrderParam);
								that.adjustOrder(adjustOrderParam);
								resIdx = 0;
							}
							// 1140916 Raymond 1140861 新增稿件時, 若環境變數「AOL_AUTO_ADJ_DRAFT_ORDER_FOR_TPVGH」為"Y", 則依北榮邏輯排列新增的稿件的順序: 1.非發文->2.發文->3.簽稿會核單, 新的在上面
							else if(theSSO.User.EnvSettings.get("AOL_AUTO_ADJ_CON_FIRST") != "Y" && theSSO.User.EnvSettings.get("AOL_AUTO_ADJ_DRAFT_ORDER_FOR_TPVGH") == "Y") {
								var n = that.getDraftCounts();
								if(_docObj.signType == "E" && _signFolder.hasFromDoc())	// 線上簽核且有來文則排除來文
									n--;
								// 依主辦或會辦單位過濾可調整稿序的文稿清單
								adjustOrderParam = [];
								for(var i=0, j=0; i<n; i++) {
									var draftOU = that.getConDraftUnitNo(i);
									if ((_isConUnit && draftOU == _docObj.ownOUId.substr(0, 2)) ||	// 會辦公文, 同單位的文稿才可以調整稿序
										(!_isConUnit && draftOU == "00")) {					// 主辦, 00子目錄的文稿才可以調整稿序
										adjustOrderParam.push({
											origIdx: i,			// 封裝檔的索引
											origMgmtIdx: j++,	// 各別主會辦子目錄中DraftMgmt的索引
											name: that.getDraftName(i),
											docType: that.getDraftDocType(i)
										});
									}
								}
								theLogger.log(adjustOrderParam);
								var docCloseSendDraftTypes = theSSO.User.EnvSettings.get("SSO_CLOSE_TYPE_SEND_DRAFTTYPE").split(";");	//可發文的稿件類型才檢核
								if(adjustOrderParam.length > 1) {	// 新增第2筆文稿才有排序問題
									let found = 0;
									if(docType != "簽稿會核單" && docCloseSendDraftTypes.indexOf(docType) < 0) {	// 先判斷新增的文稿若為非可發文文別
										for(var i=0; i<adjustOrderParam.length-1; i++) {
											// 1141117 Raymond 北榮序377 修正新增函、簽稿會核單後, 再新增簽, 會變成插入在非可發文的簽稿會核單前, 函後的位置的問題
											//if(docCloseSendDraftTypes.indexOf(adjustOrderParam[i].docType) < 0) {	// 找到第一個非可發文文別的文稿, 插入其原本位置
											if(adjustOrderParam[i].docType != "簽稿會核單" && docCloseSendDraftTypes.indexOf(adjustOrderParam[i].docType) < 0) {	// 找到第一個非可發文文別的文稿, 插入其原本位置
												theLogger.log("找到第一個非可發文文別「" + adjustOrderParam[i].docType + "」('" + adjustOrderParam[i].name + "')在" + i + "位置");
												adjustOrderParam.splice(i, 0, adjustOrderParam.pop());
												resIdx = i;
												found = 1;
												break;
											}
										}
										if(!found)	// 找不到的話, 改找第一個可發文文別的文稿
											theLogger.log("找不到第一個非可發文文別的文稿, 改找第一個可發文文別的文稿");
									}
									if(docType != "簽稿會核單" && (docCloseSendDraftTypes.indexOf(docType) >= 0 || !found)) {
										for(var i=0; i<adjustOrderParam.length-1; i++) {
											if(docCloseSendDraftTypes.indexOf(adjustOrderParam[i].docType) >= 0) {	// 找到第一個可發文文別的文稿, 插入其原本位置
												theLogger.log("找到第一個可發文文別「" + adjustOrderParam[i].docType + "」('" + adjustOrderParam[i].name + "')在" + i + "位置");
												adjustOrderParam.splice(i, 0, adjustOrderParam.pop());
												resIdx = i;
												found = 2;
												break;
											}
										}
										if(!found)	// 找不到的話, 改找第一個簽稿會核單文稿
											theLogger.log("找不到第一個可發文文別的文稿, 改找第一個簽稿會核單文稿");
									}
									if(!found) {
										for(var i=0; i<adjustOrderParam.length-1; i++) {
											if(adjustOrderParam[i].docType == "簽稿會核單") {	// 找到第一個簽稿會核單, 插入其原本位置
												theLogger.log("找到第一個「簽稿會核單」('" + adjustOrderParam[i].name + "')在" + i + "位置");
												adjustOrderParam.splice(i, 0, adjustOrderParam.pop());
												resIdx = i;
												found = 3;
												break;
											}
										}
										if(!found)	// 找不到簽稿會核單的話, 就新增在最後, 不需排序
											theLogger.log("找不到第一個簽稿會核單的文稿, 不需排序");
									}
									if(!!found) {
										theLogger.log("排序:" + found, adjustOrderParam);
										that.adjustOrder(adjustOrderParam);
									}
								}
							}
							
							// 1140701 Raymond 1140919 修改為變數判定
							// 1100506 Raymond 1100296 檢核自動調整文稿批示單為第一筆稿序
							//if(docType == "文稿批示單" && theSSO.User.EnvSettings.get("WE_AUTO_GEN_文稿批示單") == "Y") {
							if(docType == "文稿批示單" && _autoGenInstructionSheet) {
								var n = that.getDraftCounts();
								if(_docObj.signType == "E" && _signFolder.hasFromDoc())	// 線上簽核且有來文則排除來文
									n--;
								// 依主辦或會辦單位過濾可調整稿序的文稿清單
								adjustOrderParam = [];
								for(var i=0, j=0; i<n; i++) {
									var draftOU = that.getConDraftUnitNo(i);
									if ((_isConUnit && draftOU == _docObj.ownOUId.substr(0, 2)) ||	// 會辦公文, 同單位的文稿才可以調整稿序
										(!_isConUnit && draftOU == "00")) {					// 主辦, 00子目錄的文稿才可以調整稿序
										adjustOrderParam.push({
											origIdx: i,			// 封裝檔的索引
											origMgmtIdx: j++,	// 各別主會辦子目錄中DraftMgmt的索引
											name: that.getDraftName(i)
										});
									}
								}
								theLogger.log(adjustOrderParam);
								adjustOrderParam.splice(0, 0, adjustOrderParam.pop());	// pop取出最後加入的文稿, splice插入第1位
								theLogger.log(adjustOrderParam);
								that.adjustOrder(adjustOrderParam);
								resIdx = 0;
							}

							// 1081210 Raymond 1080786 合併內政部單號1070657, 檢查新增的文稿是否應新增簽稿會核單(copy from 10249@RD-Edit.js)
							var delayResolve = false;	// 若進入autoGenCon的非同步作業, 則要延後resolve
							var $conList = $(xmlDoc.documentElement).find("會稿單位列表");
							if($conList.length > 0) {
								var conUnits = [];
								$conList.find("單位").each(function(i, cu) {
									var name = $(cu).text();
									var type = $(cu).attr("type") || "";
									var value = $(cu).attr("代碼") || "";
									conUnits.push({name: name, type: type, value: value});
								});
								if(conUnits.length > 0) {	// 有會稿單位
									if(docType == "簽稿會核單") {
										if(isImport || (SSOUtil.typeOf(rsrcFile) != "string" && "id" in rsrcFile)) {
											//1110318 David 1101388 紙本簽核支援新增預排流程
											//if(that.getSignType() == "E" && that.isApplyConUnitDraft(docType)) {
											if((that.getSignType() == "E" || (that.getSignType() == "P" && theSSO.User.SystemSets.get("P_FLOW_USE_WWKF") == "Y"))
												&& that.isApplyConUnitDraft(docType)) {
												theLogger.log("開啟舊檔或貼上稿件是簽稿會核單且設定有會稿單位, 呼叫同步到預排流程的函式");
												try {
													// TODO: 呼叫同步到預排流程的函式
													theAOL.docObj.updateWWKFCoWorkFlow(conUnits);
												}
												catch(e) {
													theLogger.error(e.stack || e.message);
												}
											}
										}
										else
											theLogger.log("非開啟舊檔的簽稿會核單(同步新增的), 不要更新預排流程");
									}
									else {	// 非簽稿會核單
										var genCon = theSSO.User.EnvSettings.get("WE_GEN_CON");
										// 1110609 Raymond 1110283 新增航港局邏輯的自動產生簽稿會核單
										var genCon4MPB = theSSO.User.EnvSettings.get("WE_GEN_CON_FOR_MPB") == "Y";
										var genConThreshold = theSSO.User.EnvSettings.get("WE_GEN_CON_THRESHOLD");
										// 1110609 Raymond 1110283 新增航港局邏輯的自動產生簽稿會核單
										// 1090515 Raymond 1090347 新增判斷preventGenCon參數若為true, 則不要自動產生簽稿會核單
										//if(genCon.toUpperCase() == "Y" && genConThreshold.length > 0 && conUnits.length >= parseInt(genConThreshold)) {
										//if(genCon.toUpperCase() == "Y" && genConThreshold.length > 0 && conUnits.length >= parseInt(genConThreshold) && !preventGenCon) {
										if((genCon.toUpperCase() == "Y" || genCon4MPB) && genConThreshold.length > 0 && conUnits.length >= parseInt(genConThreshold) && !preventGenCon) {
											theLogger.warn("會辦單位數(" + conUnits.length + ")超過門檻值(WE_GEN_CON_THRESHOLD=" + genConThreshold + "), 自動產生簽稿會核單");
											delayResolve = true;	// 自動新增簽稿會核單要延後resolve
											that.accquireDraftModel(resIdx)
											.done(function(dm) {
												var subj = "";
												if(docType == "便簽") {
													try {
														subj = dm.pureText("//便簽/段落/條列/文字");
														theLogger.log("便簽的第1個段落的第1個條列的欄位內容為'" + subj + "'");
													}
													catch(e) {
														theLogger.warn("取得便簽的'段落/條列/文字'失敗, 改取'段落/文字'");
													}
													if(subj == "") {
														try {
															subj = dm.pureText("//便簽/段落/文字");
															theLogger.log("便簽的第1個段落的欄位內容為'" + subj + "'");
														}
														catch(e) {
															theLogger.error("取得便簽的'段落/文字'失敗! " + e.message);
														}
													}
												}
												else {
													var $ODLTMT;
													var wfio = new WebFileIO(SSO_CONFIG.getWSUrl('fileiows'), '', localStorage.Artifact);
													var serverPath = SSO_CONFIG.getRsrcServerPath("AOL\\OD", "");
													wfio.download(serverPath, "ODLTMT.xml", {
														async: false,	// 非同步
														success: function (rslt, res) {
															if (rslt !== undefined) {
																$ODLTMT = $(rslt);
															}
															else {
																theLogger.error("WebFileIO呼叫成功但ODLTMT.XML未下載");
															}
														},
														error: function (status) {
															theLogger.error("下載ODLTMT.XML失敗：" + status);
														}
													});
													if(!!$ODLTMT) {
														var $DraftSet = $ODLTMT.find(docType);
														if($DraftSet.length > 0)
														{
															// 該文別應取得主旨欄位內容的XML路徑
															var xp = $DraftSet.find("SUBJECT").text();
															if(typeof xp == "string" && xp.length > 0) {
																theLogger.log("ODLTMT.XML定義'" + docType + "'的SUBJECT欄位路徑為'" + xp + "'");
																try {
																	subj = dm.pureText(xp);
																	theLogger.log("此文稿的SUBJECT欄位內容為'" + subj + "'");
																}
																catch(e) {
																	theLogger.error("取得目前文稿的主旨(" + xp + ")發生錯誤! " + e.message);
																}
															}
															else {
																theLogger.error("ODLTMT.XML的'" + docType + "'的SUBJECT欄位路徑未定義");
															}
														}
													}
												}
												if(subj == "") {// 萬一下載不到ODLTMT.XML或未定義此文別, 就依預設的主旨/文字來設定案情摘要
													try {
														subj = dm.pureText("//主旨/文字");
														theLogger.log("[FALLBACK]主旨欄位內容為'" + subj + "'");
													}
													catch(e) {
														try {
															subj = dm.pureText("//開會事由/文字");
															theLogger.log("[FALLBACK]開會事由欄位內容為'" + subj + "'");
														}
														catch(e) {
															theLogger.error("[FALLBACK]取得目前文稿的主旨/開會事由發生錯誤! " + e.message);
														}
													}
												}
												var sender;
												try {
													sender = dm.nodes("//發文機關列表/發文機關");
												}
												catch(e) {
													theLogger.error("無法取得發文機關節點! " + e.message);
												}
												// 1110609 Raymond 1110283 新增傳入第4參數目前文稿的dm, 供航港局自動產生簽稿會核單的排序功能使用
												// 1081213 Raymond 1080786 DraftModel.getIndex()是1070547所新增的方法, 但共通版不合併1070547自動調整新增文稿的稿序功能, 故無該方法
												//that.autoGenCon(conUnits, subj, sender, dm.getIndex())
												//that.autoGenCon(conUnits, subj, sender)
												that.autoGenCon(conUnits, subj, sender, dm)
												//.done(function(dm2) {	// dm2是新增的或同流程點即有的簽稿會核單
												.done(function(dm2, autoGened, aoParam) {	// 1090513 Raymond 1090223 第2參數若是true表示簽稿會核單是新增的, 第3參數則為自動調整稿序的參數
													// 同步到預排流程
													//1110318 David 1101388 紙本簽核支援新增預排流程
													//if(that.getSignType() == "E" && that.isApplyConUnitDraft(dm2)) {	// 先判斷簽稿會核單是否是優先套用會辦單位的文稿
													if((that.getSignType() == "E" || (that.getSignType() == "P" && theSSO.User.SystemSets.get("P_FLOW_USE_WWKF") == "Y"))
														&& that.isApplyConUnitDraft(dm2)) {
														theLogger.log("呼叫同步到預排流程的函式");
														try {
															// TODO: 呼叫同步到預排流程的函式
															theAOL.docObj.updateWWKFCoWorkFlow(conUnits);
														}
														catch(e) {
															theLogger.error(e.stack || e.message);
														}
													}
													//1110318 David 1101388 紙本簽核支援新增預排流程
													//else if(that.getSignType() == "E" && that.isApplyConUnitDraft(dm)) {	// 若否再判斷目前文稿是否是優先套用會辦單位的文稿
													else if((that.getSignType() == "E" || (that.getSignType() == "P" && theSSO.User.SystemSets.get("P_FLOW_USE_WWKF") == "Y"))
														&& that.isApplyConUnitDraft(dm)) {
														theLogger.log("呼叫同步到預排流程的函式");
														try {
															// TODO: 呼叫同步到預排流程的函式
															theAOL.docObj.updateWWKFCoWorkFlow(conUnits);
														}
														catch(e) {
															theLogger.error(e.stack || e.message);
														}
													}
													// 1100507 Raymond 1100296 判斷是否自動新增文稿批示單
													if(shouldAutoGenInstructionSheet(docType)) {
														that.autoGenInstructionSheet()
															.done(function(dm2, autoGened2, aoParam2) {
																// 若第2參數autoGened2為true, 表示文稿批示單是新增的, 則目前稿件的順序會往後遞延
																// 1090511 Raymond 1090223 若新增的第2參數autoGened為true, 表示簽稿會核單是新增的, 若環境變數設定要將簽稿會核單移至第一筆, 則目前稿件的順序會再往後遞延一筆
																if(theSSO.User.EnvSettings.get("AOL_AUTO_ADJ_CON_FIRST") == "Y")
																	dfd.resolve(resIdx + ((autoGened2 === true)?1:0) + ((autoGened === true)?1:0), aoParam2 || aoParam);	// 若不需新增文稿批示單, aoParam2會是undefined, 改用自動新增簽稿會核單的稿序aoParam回傳
																else
																	dfd.resolve(resIdx + ((autoGened2 === true)?1:0), aoParam2 || aoParam);	// 若不需新增文稿批示單, aoParam2會是undefined, 改用自動新增簽稿會核單的稿序aoParam回傳
															})
															.fail(function(errorText) {
																alert(errorText);
																// 1090511 Raymond 1090223 若新增的第2參數autoGened為true, 表示簽稿會核單是新增的, 若環境變數設定要將簽稿會核單移至第一筆, 則目前稿件的順序會往後遞延
																if(theSSO.User.EnvSettings.get("AOL_AUTO_ADJ_CON_FIRST") == "Y")
																	dfd.resolve(resIdx + ((autoGened === true)?1:0), aoParam);
																else
																	dfd.resolve(resIdx);	// 自動新增文稿批示單失敗後也resolve?
															});
													}
													// 1110610 Raymond 1110283 新增航港局自動產生簽稿會核單排序邏輯
													else if(theSSO.User.EnvSettings.get("AOL_AUTO_ADJ_CON_FOR_MPB") == "Y") {
														// 1140701 Raymond 1140919 修改為變數判定
														//if(docType == "存查批示單")	// 從存查批示單產生的簽稿會核單排在存查批示單前面, 所以目前顯示的存查批示單的稿序加一
														if(docType == _autoGenInstructionSheet2ndDocType)
															dfd.resolve(resIdx + ((autoGened === true)?1:0), aoParam);
														else
															dfd.resolve(resIdx);
													}
													// 1100507 Raymond 1100296 應自動新增文稿批示單時, 再延後resolve
													// 1090511 Raymond 1090223 若新增的第2參數autoGened為true, 表示簽稿會核單是新增的, 若環境變數設定要將簽稿會核單移至第一筆, 則目前稿件的順序會往後遞延
													//if(theSSO.User.EnvSettings.get("AOL_AUTO_ADJ_CON_FIRST") == "Y")
													else if(theSSO.User.EnvSettings.get("AOL_AUTO_ADJ_CON_FIRST") == "Y")
														dfd.resolve(resIdx + ((autoGened === true)?1:0), aoParam);
													else
													dfd.resolve(resIdx);	// 自動新增簽稿會核單後resolve
												})
												.fail(function(errorText) {
													alert(errorText);
													// 同步到預排流程
													//1110318 David 1101388 紙本簽核支援新增預排流程
													//if(that.getSignType() == "E" && that.isApplyConUnitDraft(dm)) {	// 新增簽稿會核單失敗, 則改判斷目前文稿是否是優先套用會辦單位的文稿
													if((that.getSignType() == "E" || (that.getSignType() == "P" && theSSO.User.SystemSets.get("P_FLOW_USE_WWKF") == "Y"))
														&& that.isApplyConUnitDraft(dm)) {
														theLogger.log("呼叫同步到預排流程的函式");
														try {
															// TODO: 呼叫同步到預排流程的函式
															theAOL.docObj.updateWWKFCoWorkFlow(conUnits);
														}
														catch(e) {
															theLogger.error(e.stack || e.message);
														}
													}
													dfd.resolve(resIdx);	// 自動新增簽稿會核單失敗後也resolve?
												});
											})
											.fail(function(errorText) {
												theLogger.error("要求取得剛新增的第" + resIdx + "文稿物件失敗! " + errorText);
												dfd.reject(errorText);
											});
										}
										else {	// 不需要自動新增簽稿會核單, 但符合條件的話要更新預排流程
											// 1090515 Raymond 1090347 若貼上稿件(新增)時指定避免自動產生簽稿會核單, 則表示貼上的文稿中有簽稿會核單, 若簽稿會核單也是應同步預排流程的文別, 則忽略非簽稿會核單文別的預排流程同步(以簽稿會核單為優先)
											//if(that.getSignType() == "E" && that.isApplyConUnitDraft(docType)) {
											//1110318 David 1101388 紙本簽核支援新增預排流程
											//if(that.getSignType() == "E" && that.isApplyConUnitDraft(docType) && (!preventGenCon || !that.isApplyConUnitDraft("簽稿會核單"))) {
											if((that.getSignType() == "E" || (that.getSignType() == "P" && theSSO.User.SystemSets.get("P_FLOW_USE_WWKF") == "Y"))
												&& that.isApplyConUnitDraft(docType) 
												&& (!preventGenCon || !that.isApplyConUnitDraft("簽稿會核單"))) {
												theLogger.log("不需要自動新增簽稿會核單, 但因新增文稿設定有會稿單位所以呼叫同步到預排流程的函式");
												try {
													// TODO: 呼叫同步到預排流程的函式
													theAOL.docObj.updateWWKFCoWorkFlow(conUnits);
												}
												catch(e) {
													theLogger.error(e.stack || e.message);
												}
											}
										}
									}
								}
							}
							// 1100507 Raymond 1100296 判斷若不需要自動新增簽稿會核單, 再判斷是否自動新增文稿批示單
							if(!delayResolve && shouldAutoGenInstructionSheet(docType) && (docType != "簽稿會核單" || !(typeof postNewDraft === "function" && postNewDraft.name == "syncConUnitsAndSubject"))) {	// 排除自動新增的簽稿會核單
								delayResolve = true;	// 自動新增文稿批示單要延後resolve
								that.autoGenInstructionSheet()
									.done(function(dm2, autoGened, aoParam2) {	// 1090513 Raymond 1090223 第2參數若是true表示簽稿會核單是新增的, 第3參數則為自動調整稿序的參數
										// 若第2參數autoGened為true, 表示文稿批示單是新增的, 則目前稿件的順序會往後遞延
										dfd.resolve(resIdx + ((autoGened === true)?1:0), aoParam2);
									})
									.fail(function(errorText) {
										alert(errorText);
										dfd.resolve(resIdx);	// 自動新增文稿批示單失敗後也resolve?
									});
							}
							if(!delayResolve)	// 未進入自動新增簽稿會核單的程序則直接resolve
								// 1090513 Raymond 1090223 傳入調整稿序參數, 新增稿件為簽稿會核單時會有此參數
								//dfd.resolve(resIdx);
								dfd.resolve(resIdx, adjustOrderParam);
						})
						.fail(function(errorText) {	// 2017.2.20 bugfix 補errorText參數
							dfd.reject(errorText);
						});
				}
			}
			else
				dfd.reject("無可編輯的文稿管理檔可新增加入文稿!");
			return dfd.promise();
		},
		
		// 1090110 Raymond 1081141 由多稿轉出呼叫的新增文稿
		newDraftByMailMerge: function(mailMergedXmlStr) {
			var dfd = $.Deferred();
			if(typeof _currMgmt !== "undefined") {
				theLogger.log("新增文稿(多稿轉出)...");
				if("ActiveXObject" in window) {// for IE-compatible
					var xmlDoc = new ActiveXObject("MSXML2.DOMDocument");
					xmlDoc.resolveExternals = false;
					xmlDoc.validateOnParse = false;		// 2016.12.19 fix for 匯入DI
					xmlDoc.preserveWhiteSpace = true;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
					if(xmlDoc.loadXML(mailMergedXmlStr)) {
						onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName);
					}
					else {
						var pe = xmlDoc.parseError;
						theLogger.error("(IE)載入XML失敗!" + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
						dfd.reject(pe.reason);
					}
				}
				else {	// for Non-IE
					try {
						var xmlDoc = (new DOMParser()).parseFromString(mailMergedXmlStr, "text/xml");
						onLoadXML(xmlDoc, xmlDoc.documentElement.nodeName);
					}
					catch(e) {
						theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
						dfd.reject(e.message);
					}
				}
				function onLoadXML(xmlDoc, docType) {
					// 新增加入至目前文稿管理檔
					_currMgmt.newDraft(xmlDoc, docType, false)	// 第3參數isImported, 設為false表示不是開啟舊檔所新增之文稿
						.done(function(idx, draft, subDirName) {
							if(_docObj.signType == "E") {
								_newDraftId++;
								var newDraftId = "NewDraft" + _newDraftId;
								_apd.push({	guid: draft.guid,
											subDocType: draft.subDocType,
											lastAutoObj: 0,
											//printXSL: draft.printXsl,
											printXSL: draft.applyPrintXSL,	// 1060913 Raymond 1060756 修正多樣版的文稿儲存關閉後再開, 仍會詢問套用樣版的問題
											versions: [{
												id: newDraftId,
												docType: draft.docType,
												copy: "",	// 抄本?
												reserveSO: false,	// 保留簽署意見
											}]});
								// 新增加入至目前封裝檔
								_signFolder.newDraft({name: draft.name, msgId: _docObj.msgId, fileName: subDirName + "\\" + draft.fileName, docType: draft.docType, subDocType: draft.subDocType, createTime: new Date(), guid: draft.guid, id: newDraftId});
								
								// 1130606	Leslie[1130077]	[併1130078]當系統於當前文稿觸發自動備份後，若使用者操作增/刪文稿、附件(連動影響封裝內容)時，則主動觸發一次自動備份
								if(_backuped)
									setTimeout(function() {that.backup();}, 1000);
								
								// 2016.8.23 FIX線上簽核來文擬辦, 文稿序少1問題
								if(_signFolder.hasFromDoc())
									dfd.resolve(_signFolder.getDraftCounts() - 2);
								else
									dfd.resolve(_signFolder.getDraftCounts() - 1);
							}
							else {	// 紙本
								dfd.resolve(idx);
							}
						})
						.fail(function(errorText) {	// 2017.2.20 bugfix 補errorText參數
							dfd.reject(errorText);
						});
				}
			}
			else
				dfd.reject("無可編輯的文稿管理檔可新增加入文稿!");
			return dfd.promise();
		},
		
		// 2016.7.14 新增附件, 2016.9.22 新增第3參數文稿附件應上傳的路徑, 2016.11.7 新增attId附件序
		newAtt: function(draft, attach, draftPath, attIdx) {
			var that = this;	//2016.12.8	Leslie	宣告後續要用的物件
			if(_docObj.signType == "E") {	// 線上簽核才要更新封裝檔
				//var id = _lookupDraftID(draft.guid);
				for(var i=0; i<_apd.length; i++) {
					if(_apd[i].guid == draft.guid) {
						var ver = _apd[i].versions[_apd[i].versions.length - 1];	// 最後一版
						var attExists = false;
						var attId;
						if("atts" in ver) {
							for(var j=0; j<ver.atts.length; j++) {
								if(ver.atts[j].guid == attach.guid) {
									attExists = true;
									if("markAsDel" in ver.atts[j])		// 2016.9.12
										delete ver.atts[j].markAsDel;	// 移除標記
									attId = ver.atts[j].id;	// 封裝檔中的附件ID
									break;
								}
							}
						}
						// 2017.3.3 fix for 此流程點新增附件的刪除, 鐵工-序238
						if(!attExists) {
							var d = _signFolder.getDraftById(ver.id);
							if(!!d) {
								if("attachs" in d) {
									for(var j=0; j<d.attachs.length; j++) {
										if(d.attachs[j].guid == attach.guid) {
											attExists = true;
											theLogger.log("線上簽核公文調換此流程點新增之附件順序時, 以GUID(" + d.attachs[j].guid + ")取代ID做為更新附件物件的參數");
											if("markAsDel" in d.attachs[j])
												delete d.attachs[j].markAsDel;	// 移除標記
											attId = d.attachs[j].guid;	// 此流程點所新增的附件沒有ID, 改用GUID取代
											break;
										}
									}
								}
							}
						}
						if(attExists) {
							_signFolder.updateAtt(attId, attach, attIdx, function(att){			// 2016.12.8	Leslie	增加callBack函式，以處理附件匯出後，因搬移造成的檔名異動
								// 1110301 Raymond 1110106 合併1080815, 新增的附件經判斷不是以匯出頁面方式處理的就不要加入轉換附件匯出頁面的佇列
								//if(SSO_CONFIG.enableConvertAttPage) {	// 判斷是否啟用附件匯出頁面設定
								if(SSO_CONFIG.enableConvertAttPage && att.fmt == "文稿頁面檔格式") {
									if(!attach.origFileName.match(/^blob:/)){	//非本次加入之新增附件，需先下載再執行匯出
										theLogger.warn("判斷附件(ID:" + att.id + ")非本Session加入之附件'" + attach.origFileName + "', 須先下載附件原始檔");
										// 1141128 Raymond 1141255 copy form line619@RD-AttachMgmt.js
										let getMimeType = function (fileName) {
											let sType = fileName.substring(fileName.lastIndexOf('.') + 1).toUpperCase();
											let MimeType = {
												'PDF': 'application/pdf',
												'JPG': 'image/jpeg',
												'GIF': 'image/gif',
												'PNG': 'image/png',
											};
											return (MimeType[sType]) ? MimeType[sType] : 'application/octet-binary';
										}
										// 1141128 Raymond 1141255 當調換附件順序需要先下載附件檔時, 取得適合的MimeType
										var fileType = getMimeType(attach.origFileName);
										var wfio = new WebFileIO(that.fileIOWS);
										wfio.download(draftPath, attach.origFileName, {
											keepRawData: true,	// 保持原始資料格式(Typed Array)
											async: false,	// 1061117 Raymond 1061118 調換附件順序時, 須先下載"完"所有附件原始檔, 才進行轉檔, 因此下載其它附件檔途中萬一第1個附件檔已經完成轉檔, 可能會覆蓋掉其它還沒開始轉的附件檔, 若副檔名一樣會變成有2個相同內容的附件檔, 改成sync應該可以避免此情況發生, 但附件檔案太大可能會有衍生問題
											success: function(fil, all) {
												// 1141128 Raymond 1141255 當調換附件順序先下載附件檔後, 設定適合的MimeType, 以避免PDF類型附件附件子視窗中點擊"開啟", 會變成下載, 而不會主動開啟Acrobat Reader的問題
												//var blb = new Blob([fil],{type: "application/octet-binary"});
												var blb = new Blob([fil],{type: fileType});
												var blbNm = URL.createObjectURL(blb);
												attach.origFileName = blbNm;
												// 1061117 Raymond 1061118 同一Session調換附件順序2次以上會因為第1次調換順序沒有把下載後的blbNm更新到附件檔名節點, 導致第2次調換順序時會重新從FileServer再下載一次未調換順序前的origFileName, 造成複製到錯誤的附件原始檔, 衍生問題包括2個附件同副檔名時調換無效, 也可能是附件無頁面的原因
												if("ndAtt" in attach) {
													theLogger.warn("設定附件原始檔下載後的BlobName'" + blbNm + "'至文稿檔的附件檔名節點");
													attach.ndAtt.setAttribute("data-blob-name", blbNm);
												}
												_signFolder.removeAttPages(att);// 先清除舊的頁面
												_rndrAtt.addAtt(att, attach, draftPath);	// 加入應匯出頁面的附件清單
												// 1061117 Raymond 1061118 調換附件順序時, 須先下載"完"所有附件原始檔, 才進行轉檔, 故下載改為sync, 不要下載完1個附件原始檔就proceedRndrAtt()
												//2016.12.20	Leslie	因下載再重匯會有時間差，故經由_view再重新呼叫匯出頁面
												//_views[0].proceedRndrAtt();		//目前架構，都只會有一個View
											},
											error: function(errorText) {
												alert(errorText);
											}
										});
									}
									else{
										theLogger.warn("判斷附件(ID:" + att.id + ")為本Session加入之新附件'" + attach.origFileName + "', 不須下載");
										_signFolder.removeAttPages(att);// 先清除舊的頁面
										_rndrAtt.addAtt(att, attach, draftPath);	// 加入應匯出頁面的附件清單
									}
									_RndrAttDirty = true;	//原本已匯出頁面之附件，在異動後，"必需"儲存
								}
							});
							// TODO: 已存在附件有可能被置換 or 調換位置導致檔名異動 or 即使完全未異動附件但在1.0版的邏輯是仍然一律匯出
							theLogger.warn("附件已存在封裝檔, 有可能被置換或調換位置導致檔名異動, 或即使完全未異動但在1.0版的邏輯仍一律匯出!");
						}
						else {
							_signFolder.newAtt(ver.id, attach, attIdx, function(att) {	// 新增至封裝檔後會配置新的ID, 記錄在APD	// 2016.12.7	Leslie	新增attId附件序，以直接新增至指定位置
								if(!("atts" in ver))
									ver.atts = [];
								ver.atts.push({
									id: att.id,
									guid: attach.guid
								});
								
								// 1110301 Raymond 1110106 合併1080815, 新增的附件經判斷不是以匯出頁面方式處理的就不要加入轉換附件匯出頁面的佇列
								//if(SSO_CONFIG.enableConvertAttPage) {	// 2016.9.7 新增判斷是否啟用附件匯出頁面設定
								if(SSO_CONFIG.enableConvertAttPage && att.fmt == "文稿頁面檔格式") {
									_signFolder.removeAttPages(att);// 先清除舊的頁面
									_rndrAtt.addAtt(att, attach, draftPath);	// 加入應匯出頁面的附件清單, 2016.9.22 新增第3參數文稿附件應上傳的路徑
								}
							});
						}
						break;
					}
				}
			}
		},
		
		// 2016.9.12 刪除附件
		removeAtt: function(draft, attach) {
			if(_docObj.signType == "E") {	// 線上簽核才要更新封裝檔
				//var id = _lookupDraftID(draft.guid);
				for(var i=0; i<_apd.length; i++) {
					if(_apd[i].guid == draft.guid) {
						var ver = _apd[i].versions[_apd[i].versions.length - 1];	// 最後一版
						var found = false;
						if("atts" in ver) {
							var attId;
							for(var j=0; j<ver.atts.length; j++) {
								if(ver.atts[j].guid == attach.guid) {
									found = true;
									attId = ver.atts[j].id;	// 封裝檔中的附件ID
									ver.atts[j].markAsDel = true;	// 標記
									theLogger.log("線上簽核公文刪除附件時, 先標記應同步刪除的封裝檔中的附件(ID:" + attId + ")");
									break;
								}
							}
							if(!found) {
								theLogger.warn("AOLProccessData中找不到相符(GUID:" + attach.guid + ")的附件, 無法刪除");
							}
						}
						else
							theLogger.warn("AOLProccessData此版本文稿未記錄任何附件");
						// 2017.3.3 fix for 此流程點新增附件的刪除, 鐵工-序238
						if(!found) {
							var d = _signFolder.getDraftById(ver.id);
							if(!!d) {
								if("attachs" in d) {
									for(var j=0; j<d.attachs.length; j++) {
										if(d.attachs[j].guid == attach.guid) {
											theLogger.log("線上簽核公文刪除此流程點新增之附件時, 先標記應同步刪除的封裝檔中的附件(GUID:" + d.attachs[j].guid + ")");
											d.attachs[j].markAsDel = true;	// 標記
											break;
										}
									}
								}
							}
						}
						return;
					}
				}
				theLogger.error("AOLProccessData中找不到相符(GUID:" + draft.guid + ")的文稿, 無法刪除其附件");
			}
		},
		// 2016.9.12 結束增刪附件作業(實際刪除)
		commitAttachFiles: function(draft) {
			if(_docObj.signType == "E") {	// 線上簽核才要更新封裝檔
				// 1130606	Leslie[1130077]	[併1130078]當系統於當前文稿觸發自動備份後，若使用者操作增/刪文稿、附件(連動影響封裝內容)時，則主動觸發一次自動備份
				var that = this;
				//var id = _lookupDraftID(draft.guid);
				for(var i=0; i<_apd.length; i++) {
					if(_apd[i].guid == draft.guid) {
						var ver = _apd[i].versions[_apd[i].versions.length - 1];	// 最後一版
						if("atts" in ver) {
							for(var j=ver.atts.length-1; j>=0; j--) {
								if("markAsDel" in ver.atts[j] && ver.atts[j].markAsDel) {
									//1050921	Leslie	設定為要匯出附件頁面時，若附件維護子視窗註記刪除，則該附件應不再需要執行匯出頁面
									if(SSO_CONFIG.enableConvertAttPage){
										_rndrAtt.removeAtt(ver.atts[j].guid);
										theLogger.log("刪除附件時, 則該附件不再執行匯出頁面(GUID:" + ver.atts[j].guid + ")");
									}
									var attId = ver.atts[j].id;	// 封裝檔中的附件ID
									// 1061013 Raymond 1060962+1060948 異動撤消後刪除附件, 因附件ID會重編與AOLProcessData所記錄的不一致, 會導致刪除封裝記錄的附件失敗, 傳入有GUID的atts參數, 由SignFolder.removeAtt補救
									//_signFolder.removeAtt(attId);
									_signFolder.removeAtt(attId, ver.atts[j]);
									theLogger.log("線上簽核公文增刪除附件結束, 實際同步刪除封裝檔中的附件(ID:" + attId + ")");
									ver.atts.splice(j, 1);
								}
							}
						}
						else
							theLogger.warn("AOLProccessData此版本文稿未記錄任何附件");
						// 2017.3.3 fix for 此流程點新增附件的刪除, 鐵工-序238
						var d = _signFolder.getDraftById(ver.id);
						if(!!d) {
							if("attachs" in d) {
								for(var j=0; j<d.attachs.length; j++) {
									if("markAsDel" in d.attachs[j] && d.attachs[j].markAsDel) {
										theLogger.log("線上簽核公文增刪此流程點新增之附件結束, 實際同步刪除封裝檔中的附件(GUID:" + d.attachs[j].guid + ")");
										d.attachs.splice(j, 1);	// 2017.3.15 bugfix 打錯字
										--j;	// 2017.3.15 bugfix 刪除多筆時
									}
								}
							}
						}
						
						// 1130606	Leslie[1130077]	[併1130078]當系統於當前文稿觸發自動備份後，若使用者操作增/刪文稿、附件(連動影響封裝內容)時，則主動觸發一次自動備份
						if(_backuped)
							setTimeout(function() {that.backup();}, 1000);
						
						return;
					}
				}
				theLogger.error("AOLProccessData中找不到相符(GUID:" + draft.guid + ")的文稿, 無法刪除其附件");
			}
		},
		
		startRndrAtt: function(finish, progress) {
			// 1130606	Leslie[1130077]	[併1130078]當系統於當前文稿觸發自動備份後，若使用者操作增/刪文稿、附件(連動影響封裝內容)時，則主動觸發一次自動備份
			var that = this;
			// 1141124 Raymond 1141255 修正調換附件後匯出附件頁面有可能因為不正常關閉瀏覽器, 導致工作站仍將調換過順序的附件原始檔上傳到FileServer, 但公文文稿檔及DraftMgmt.xml仍記錄的是調換前的順序, 而發生附件原始檔案內容與頁面或附件說明不一致的問題
			//_rndrAtt.start(function(att, allparts, tSpan) {
			_rndrAtt.start2(function(att, allparts, tSpan) {
				function getPgImgUrl(filePath) {
					var imgProcUrl = att.rndrPageUrl.substr(0, att.rndrPageUrl.lastIndexOf("/") + 1) + "IMGTRAN.ASHX";
					imgProcUrl += ("?FileName=" + encodeURIComponent(Base64.encode(filePath)));
					imgProcUrl += ("&Pixel=300dpi&Format=33&SAMLart=" + localStorage['Artifact']);
					imgProcUrl += ("&_t=" + (new Date()).getTime());
					return imgProcUrl;
				}
				theLogger.log("startRndrAtt success! - " + att.att.id + ":");
				theLogger.log(allparts);
				if("FileList" in allparts) {	// 2016.9.13 修改成不直接下載影像資料, 而是檔名清單
					if("string" in allparts.FileList) {
						if(SSOUtil.typeOf(allparts.FileList.string) == "array") {
							for(var i=0; i<allparts.FileList.string.length; i++)
								// 1141124 Raymond 1141255 傳入第3參數從工作站調閱暫存的附件匯出頁面
								//_signFolder.addAttPage(att, allparts.FileList.string[i]);
								_signFolder.addAttPage(att, allparts.FileList.string[i], getPgImgUrl(allparts.FileList.string[i]));
						}
						else if(SSOUtil.typeOf(allparts.FileList.string) == "string") {	// 只有1個檔案
							// 1141124 Raymond 1141255 傳入第3參數從工作站調閱暫存的附件匯出頁面
							//_signFolder.addAttPage(att, allparts.FileList.string);
							_signFolder.addAttPage(att, allparts.FileList.string, getPgImgUrl(allparts.FileList.string));
						}
					}
				}
				else {
					for(p in allparts) {	// 2016.8.22 for IE-compatible, "item"在IE只會是function
						if(!p.match(/^uuid/))
							_signFolder.addAttPage(att, p, allparts[p]);
					}
				}
				
				// 1130606	Leslie[1130077]	[併1130078]當系統於當前文稿觸發自動備份後，若使用者操作增/刪文稿、附件(連動影響封裝內容)時，則主動觸發一次自動備份
				if(_backuped)
					setTimeout(function() {that.backup();}, 1000);
				
				if(finish && $.isFunction(finish))
					finish();
			});
		},
		
		//1060825	Leslie[1060515]	新增客製化訊息
		//saveView: function() {	// 2014.10.21 - Raymond, 叫用_views儲存當前頁面的內容到model
		saveView: function(argAction) {	// 2014.10.21 - Raymond, 叫用_views儲存當前頁面的內容到model
			var res = true;		// 2016.7.19 新增回傳成功或失敗
			// 1081230 Raymond 1080194 配合fnWebEditSave改為非同步呼叫, saveView也改為非同步
			var dfd = $.Deferred();
			
			// 1120809 Raymond 1120503 新增儲存動作
			_saveAction = "";
			
			// 1081230 Raymond 1080194 配合fnWebEditSave改為非同步呼叫, saveView也改為非同步
			var dfds = [];
			for(var i=0; i<_views.length; i++) {
				// 1081230 Raymond 1080194 配合fnWebEditSave改為非同步呼叫, saveView也改為非同步
				//res &= _views[i].save();	// FolioView主要處理呼叫基資的Save檢核(fnODC010Save)功能, 若回傳false表示基資欄位檢核未通過
				dfds.push(_views[i].save().done(function(r) {
					res &= r;
				}));
			}
			// 1091111 Raymond 1090564 修正信保特殊模式仍要執行基資的Save檢核(fnODC010Save), 以避免切換至基資頁面修改內容後按儲存不會回寫ODWDCM的問題
			// 1090910 Raymond 1090564 信保特殊模式不檢核任何文稿欄位
			if(_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
				theLogger.log("[信保特殊模式]儲存時不檢核任何文稿欄位");
				dfd.resolve(true);
				return dfd.promise();
			}
			// 1140107 Raymond 1141682 (北榮客製化)修改"通知"類資料夾公文, 點儲存或傳送時, 一律不檢核任何文稿欄位
			if(SSO_CONFIG.OrgNickName == "TPVGH" && _docObj.folder == "通知") {
				theLogger.log("(北榮客製化)'通知'資料夾公文在" + ((!!argAction)?argAction:"儲存") + "時不檢核任何文稿欄位");
				dfd.resolve(true);
				return dfd.promise();
			}
			// 1120314 Raymond 銓敘部序113 新增儲存前當在承辦單位流程點時檢核公文是否有文稿
			function sameLv1OU(ouA, ouB) {// 判斷OUId是否為相同一級單位的代碼
				if(typeof ouA === "string" && typeof ouB === "string") {
					if(!!sso_const && !!sso_const.FIRSTCLASS_UNITNO_LEN)
						return ouA.substr(0, sso_const.FIRSTCLASS_UNITNO_LEN) == ouB.substr(0, sso_const.FIRSTCLASS_UNITNO_LEN);
					else
						return ouA.substr(0, 2) == ouB.substr(0, 2);
				}
				return false;
			}
			//1140425	Leslie[1131297]	新增that for 檢核線上簽核文稿的頁數
			var that = this;
			var swP = 0, swE = 0, swDraftCnt = 0, detectSendWay=false;
			
			if(!!_docObj.ODWMSG && !!_docObj.ODWMSG.OWN_OU_ID && !!_docObj.ODWMSG.INCHARGE_OU &&
				sameLv1OU(_docObj.ODWMSG.OWN_OU_ID, _docObj.ODWMSG.INCHARGE_OU)) {	// 在同一級承辦單位流程點時
				if(!!_currMgmt && _currMgmt.getEditable()) {
					if(_currMgmt.getDraftCounts() > 0) {	// 只計算承辦單位所新增的文稿數
						theLogger.log("承辦單位流程點公文有新增的文稿, 設定ODWDCM.DRAFT_STATE為'Y'");
						_docObj.set("aol", "ODWDCM", [{fieldname: "DRAFT_STATE", value: "Y"}]);
					}
					else {
						theLogger.log("承辦單位流程點公文內無任何文稿, 設定ODWDCM.DRAFT_STATE為'N'");
						_docObj.set("aol", "ODWDCM", [{fieldname: "DRAFT_STATE", value: "N"}]);
					}
					
					//1140425	Leslie[1131297]	[退輔會]紀錄可發文稿件數及對應稿件受文者發文類型數量
					detectSendWay = true;
					var docCloseSendDraftTypes = theSSO.User.EnvSettings.get("SSO_CLOSE_TYPE_SEND_DRAFTTYPE").split(";");	//可發文的稿件類型才檢核
					var n = that.getDraftCounts();
					if(_docObj.signType == "E" && _signFolder.hasFromDoc())	// 線上簽核且有來文則排除來文
						n--;
					if(_docObj.signType == "E" && _signFolder.hasExorgDraft())	// 線上簽核且有外機關文稿則排除
						n--;
					for(var i=0; i<n; i++) {
						if(this.isExorgDraft(i))
							continue;
						dfds.push(that.accquireDraftModel(i).done(function(dm) {
							var dt = dm.getDocType(),
								sdt = dm.getSubDocType();
							if(docCloseSendDraftTypes.indexOf(dt) >= 0 ||
								((dt == "令" || dt == "函") && docCloseSendDraftTypes.indexOf(sdt) >= 0)) {
								swDraftCnt++;	//可發文稿件
								theLogger.log("檢查" + dm.getDraftName() + "(" + dt + "," + sdt + ")的非抄本受文者的發文方式...");
								$(dm.accquireXml().documentElement).find("> 受文者列表 受文者[本別 != '抄本']").each(function(idx, nd) {	// 非抄本受文者
									console.debug(Util.getXml(nd));
									var sw = $(nd).find("發文方式").text();
									if(sw.match(/郵寄|人工傳遞/))
										swP++;
									else 
										swE++;
								});
							}
						}));
					}
					
				}
				else if(!!_currMgmt)
					theLogger.warn("承辦單位流程點但不可編輯, 故不更新ODWDCM.DRAFT_STATE");
			}
			// 1130805 Raymond 1120885 增加判斷ODWDCM.TVGH_HOSP_UUID有資料時, 才記錄至ODWMSG.SIGN_COMM
			// 1130715 Raymond 1120885 新增儲存時將目前的簽核意見寫入ODWMSG.SIGN_COMM欄位中,若設定依稿件儲存簽核意見(環境變數AOL_ENABLE_SIGNCOMMENT_BY_DRAFT設為"Y"), 則合併所有稿件的簽核意見後寫入ODWMSG.SIGN_COMM中
			//if(_docObj.signType == "E") {
			if(_docObj.signType == "E" && !!_docObj.ODWDCM && !!_docObj.ODWDCM.TVGH_HOSP_UUID) {
				if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
					var mrgcmt = "";
					var n = _signFolder.getDraftCounts() - (_signFolder.hasFromDoc()?1:0);
					for(var i=0; i<n; i++) {
						var d = _signFolder.getDraft(i);
						if(!!d.newSignComment) {
							if(mrgcmt.length > 0 && !mrgcmt.match(/\n$/))
								mrgcmt += "\n";
							mrgcmt += d.newSignComment;
						}
					}
					_docObj.set("aol", "ODWMSG", [{fieldname: "SIGN_COMM", value: mrgcmt}]);
				}
				else {
					_docObj.set("aol", "ODWMSG", [{fieldname: "SIGN_COMM", value: _signFolder.currSignComment()}]);
				}
			}
			// 1100323 Raymond 1090857 新增that for 檢核線上簽核文稿的頁數
			var that = this;
			// 1141216 Raymond 1141632 擴充環境變數為3個, 第3個設為'Y'時, 若公文內無任何簽稿會核單則自動新增一筆簽稿會核單, 新增過稿中的錯誤記錄於此變數
			var autoGenConErr = "";
			// 1150108 Raymond 北榮序12 修正紙本簽核傳送時不需要自動新增簽稿會核單
			// 1130207 Raymond 1120887 需要判斷資料夾+異動別符合環境變數「WE_ADD_CON_WHILE_TRANSPORT」時, 要事先將簽稿會核單全部下載
			//if(argAction == "傳送") {
			if(argAction == "傳送" && _docObj.signType == "E") {
				let addConWhileTransport = theSSO.User.EnvSettings.get("WE_ADD_CON_WHILE_TRANSPORT");
				if(addConWhileTransport.length > 0) {
					let s = addConWhileTransport.split("|");
					// 1141216 Raymond 1141632 擴充環境變數為3個, 第3個設為'Y'時, 若公文內無任何簽稿會核單則自動新增一筆簽稿會核單
					//if(s.length == 2) {
					if(s.length >= 2) {
						let fs = s[0].split(";");
						let ct = s[1].split(";");
						let thisFolder = _docObj.folder + "-" + _docObj.subfolder;
						if(fs.indexOf(thisFolder) >= 0 && ct.indexOf(_docObj.txName) >= 0) {
							theLogger.log("公文資料夾'" + thisFolder + "'及異動別'" + _docObj.txName + "'符合環境變數「WE_ADD_CON_WHILE_TRANSPORT」'" + addConWhileTransport + "'設定, 應先下載全部簽稿會核單以供檢核");
							var n = _signFolder.getDraftCounts() - (_signFolder.hasFromDoc()?1:0);
							let hasCon = false;	// 1141216 Raymond 1141632 檢核公文內有無任何簽稿會核單
							for(var i=1; i<n; i++) {	// 第1筆預設會開啟, 不需要特別下載
								var d = _signFolder.getDraft(i);
								// 1141216 Raymond 1141632 檢核公文內有無任何簽稿會核單
								if(d.docType == "簽稿會核單")
									hasCon = true;
								if(d.docType == "簽稿會核單" && !_cachedDM[i]) {
									theLogger.log("'" + d.name + "'為尚未開啟過的簽稿會核單, 應預先下載");
									dfds.push(that.accquireDraftModel(i));
								}
							}
							// 1141216 Raymond 1141632 擴充環境變數為3個, 第3個設為'Y'時, 若公文內無任何簽稿會核單則自動新增一筆簽稿會核單
							if(!hasCon && s.length > 2 && s[2] == "Y") {
								theLogger.log("公文內無任何簽稿會核單, 環境變數第3參數設為'Y', 自動新增一筆簽稿會核單");
								function syncConUnitsAndSubject(xmlDoc) {	// 新增簽核會核單時同步設定主旨(案情摘要)
									var $subj = $(xmlDoc.documentElement).find("主旨 文字");
									if($subj.length) {
										if("text" in $subj.get(0))
											$subj.get(0).text = _docObj.get("ODWMSG", "SUBJECT");
										else
											$subj.get(0).textContent = _docObj.get("ODWMSG", "SUBJECT");
									}
									// 新增帶入發文機關內容
									var sndrName = theUserInfo.OrgName,
										sndrNo = theUserInfo.OrgID,
										sndrAddr = theUserInfo.OrgAddr;
									var $target = $(xmlDoc.documentElement).find("發文機關列表 發文機關");
									if($target.length) {
										var $nm = $target.find("全銜");
										if($nm.length) {
											if("text" in $nm.get(0))
												$nm.get(0).text = sndrName;
											else
												$nm.get(0).textContent = sndrName;
											theLogger.warn("設定簽稿會核單的'發文機關列表/發文機關/機關全銜'為'" + sndrName + "'");
										}
										else
											theLogger.warn("簽稿會核單無'發文機關列表/發文機關/機關全銜'節點, 無法設定發文機關資訊");
										var $no = $target.find("機關代碼");
										if($no.length) {
											if("text" in $no.get(0))
												$no.get(0).text = sndrNo;
											else
												$no.get(0).textContent = sndrNo;
											theLogger.warn("設定簽稿會核單的'發文機關列表/發文機關/機關代碼'為'" + sndrNo + "'");
										}
										else
											theLogger.warn("簽稿會核單無'發文機關列表/發文機關/機關代碼'節點, 無法設定發文機關資訊");
										var $addr = $target.find("機關地址");
										if($addr.length) {
											if("text" in $addr.get(0))
												$addr.get(0).text = sndrAddr;
											else
												$addr.get(0).textContent = sndrAddr;
											theLogger.warn("設定簽稿會核單的'發文機關列表/發文機關/機關地址'為'" + sndrAddr + "'");
										}
										else
											theLogger.warn("簽稿會核單無'發文機關列表/發文機關/機關地址'節點, 無法設定發文機關資訊");
										// 1150109 Raymond 北榮序14 1141632判斷公文內無任何簽稿會核單時要自動新增一筆簽稿會核單的功能, 新增的簽稿會核單的承辦單位欄位要改用原承辦單位的一級單位名稱(INCHARGE_OU前2碼的OrgInfo的UnitName), 承辦人欄位改用原承辦人(IC_USER_NAME), 聯絡電話、分機、傳真、EMail等欄位則清空
										var $dept = $target.find("承辦單位");
										if($dept.length) {
											var deptNm = SSOUtil.getOrgUnitName(SSOUtil.getOrgNode(_docObj.sourceOrgNo), _docObj.get("ODWMSG", "INCHARGE_OU").substr(0, 2));
											if("text" in $dept.get(0))
												$dept.get(0).text = deptNm;
											else
												$dept.get(0).textContent = deptNm;
											theLogger.warn("設定簽稿會核單的'發文機關列表/發文機關/承辦單位'為'" + deptNm + "'");
										}
										else
											theLogger.warn("簽稿會核單無'發文機關列表/發文機關/承辦單位'節點, 無法設定承辦單位資訊");
										var $user = $target.find("承辦人");
										if($user.length) {
											var userNm = _docObj.get("ODWMSG", "IC_USER_NAME");
											if("text" in $user.get(0))
												$user.get(0).text = userNm;
											else
												$user.get(0).textContent = userNm;
											theLogger.warn("設定簽稿會核單的'發文機關列表/發文機關/承辦人'為'" + userNm + "'");
										}
										else
											theLogger.warn("簽稿會核單無'發文機關列表/發文機關/承辦人'節點, 無法設定承辦人資訊");
										var $others = $target.find("聯絡電話,分機,傳真,EMail");
										if($others.length) {
											let others = "";
											$others.each((idx, nd) => {others += ((!!others)?",":"") + nd.nodeName;});
											theLogger.warn("設定簽稿會核單的'發文機關列表/發文機關/其他欄位(" + others + ")'為空");
											$others.empty();
										}
									}
									else
										theLogger.warn("簽稿會核單無'發文機關列表/發文機關'節點, 無法設定發文機關資訊");
									snapshot = xmlDoc.evaluate("/簽稿會核單/會稿單位列表", xmlDoc, null, 7, null);
									if(snapshot.snapshotLength > 0) {
										theLogger.log("新增'" + _docObj.toOUName + "'(代碼:'" + _docObj.toOUId + "', type:'" + _docObj.txName + "')之會稿單位");
										let u = xmlDoc.createElement("單位");
										u.setAttribute("代碼", _docObj.toOUId);
										u.setAttribute("type", _docObj.txName);
										u.textContent = _docObj.toOUName;
										snapshot.snapshotItem(0).appendChild(u);
										
										// 再新增對應的會辦意見
										let $conCmtList = $(xmlDoc.documentElement).find("會辦意見列表");
										if($conCmtList.length) {
											let defSAHeight = $conCmtList.attr("預設簽核區域高度");
											let defCmdText = $conCmtList.find("預設意見文字").get(0).innerHTML;
											theLogger.log("新增代碼'" + _docObj.toOUId + "'之會辦意見");
											let newConCmt = xmlDoc.createElement("會辦意見");
											newConCmt.setAttribute("代碼", _docObj.toOUId);
											newConCmt.setAttribute("簽核區域排版高度", defSAHeight);
											$(newConCmt).html(defCmdText);
											$conCmtList.append(newConCmt);
										}
										else {
											theLogger.error("自動新增的'簽稿會核單'找不到'會辦意見列表'節點, 無法新增對應此傳送對象的'會辦意見'!");
											autoGenConErr = "自動新增的'簽稿會核單'找不到'會辦意見列表'節點, 無法新增對應此傳送對象的'會辦意見'!";
										}
									}
									else {
										theLogger.error("自動新增的簽稿會核單找不到'會稿單位列表'節點, 無法自動新增傳送對象為會稿單位!");
										autoGenConErr = "自動新增的簽稿會核單找不到'會稿單位列表'節點, 無法自動新增傳送對象為會稿單位!";
									}
								}
								// 搜尋簽稿會核單樣版
								function recursive(nd) {
									for(var i=0; i<nd.children.length; i++) {
										if(nd.children[i].type == 1){	// RsrcConst.FILE
											if(nd.children[i].docType == "簽稿會核單") {
												theLogger.log("找到'簽稿會核單'樣版(" + nd.children[i].remote.path + ")");
												return nd.children[i];
											}
										}
										else {	// RsrcConst.DIR
											var child = nd.children[i];
											var res = recursive(child);
											if(res)
												return res;
										}
									}
								}
								var res = null;
								thePublicRsrc.enumDirs("樣版", function(dir) {
									res = recursive(dir);
									if(res)
										return false;
								});
								if(res) {
									dfds.push(that.newDraft(res, syncConUnitsAndSubject)
									.then(function(idx, adjustOrderParam) {
										return that.accquireDraftModel(idx).done(function(dm) {
											dm.attr("/*/@NewDraft", "N");
											var fv = _views[0];
											if(!!fv) {
												fv.updateDraftTags(undefined, adjustOrderParam);
											}
										});
									})
									.fail(function(errorText) {
										theLogger.error("新增簽稿會核單失敗, " + errorText);
										autoGenConErr = "新增簽稿會核單失敗, " + errorText;
									}));
								}
								else {
									theLogger.error("找不到'簽稿會核單'的樣版檔, 無法自動新增");
									autoGenConErr = "找不到'簽稿會核單'的樣版檔, 無法自動新增";
								}
							}
						}
					}
				}
			}
			// 1081230 Raymond 1080194 配合fnWebEditSave改為非同步呼叫, saveView也改為非同步, 檢核文稿欄位改用function包住
			//if(!res) {
			//	theLogger.error("fnODC010Save()回傳false, 禁止儲存!");	// 2016.9.26 依匯整表序317取消alert訊息
				//alert("fnODC010Save()回傳false, 禁止儲存!");
			//}
			//else {	// 2016.8.5 新增檢核文稿欄位
			function doCheck() {
				// Q: 有下載的文稿才會檢核, 若是動到公文文號等欄位, 未下載的文稿資料一定是錯的, 但也因此檢核不到 -> 非唯讀公文不就要全文稿下載?
				var msg2 = [];
				
				// 各旗標來源
				var bVerifyDocNoLen = true;		// 非線上整合模式要設為false
				var docNoLen = 10;				// 公文文號限長
				var checkSecField = (theSSO.User.EnvSettings.get("OD_ODC010_IS_CHECK_SEC_FIELD") == "Y") || false;
				var autoGetIssueNoNo = (theSSO.User.EnvSettings.get("WE_AUTOGET_ISSUENO_NO") == "Y") || false;
				// 1090714 Raymond CDC序103 修正支號邏輯的變數來源為系統參數
				//var issueNoNoRule = theSSO.User.EnvSettings.get("WE_ISSUENONO_RULE");
				var issueNoNoRule = theSSO.User.SystemSets.get("WE_ISSUENONO_RULE");
				var checkIssueWordNo = (theSSO.User.EnvSettings.get("WE_CHECK_ISSUE_WORD_NO") == "1") || false;
				var checkDelaminateLvl = (theSSO.User.EnvSettings.get("WE_CHECK_DELAMINATE_LVL") == "Y") || false;
				var checkDecryptDate = (theSSO.User.EnvSettings.get("OD_ODC010_IS_CHECK_SEC_DATE") == "Y") || false;
				var checkAttDocTypes = theSSO.User.EnvSettings.get("WE_CHECK_ATT_DOC_TYPES");
				var firstIssueNoNo = theSSO.User.EnvSettings.get("WE_FIRST_ISSUENO_NO");
				var checkCaseNo = (theSSO.User.EnvSettings.get("OD_CHECK_FILE_CASE") == "Y") || false;
				var checkProcWay = (theSSO.User.EnvSettings.get("WE_CHECK_PROC_WAY") == "Y") || false;	// 2016.12.19 新增公文擬辦方式檢核(FDA客製邏輯)
				//1060825	Leslie[1060515]	依高港警需求，新增儲存前檢核至少要有一個正式的受文者
				var docCloseSendDraftType = theSSO.User.EnvSettings.get("SSO_CLOSE_TYPE_SEND_DRAFTTYPE");	//可發文的稿件類型，才檢核至少要有正式的受文者
				var checkMainIssuer = (theSSO.User.EnvSettings.get("WE_CHECK_MAIN_ISSUER") == "Y") || false;
				//1080426 David 1080088 取得鐵道局是否啟用單位發文僅能發內部受文者設定
				var SendUnitOnlyInternal = false;
				var SendUnitExcludeOuId = "";
				var SendUnitEmailDomain = "";
				if(typeof theSSO.User.SystemSets.RRB_SENDUNIT_ONLY_INTERNAL !== "undefined") {
					var arrRRBSendUnitSet = theSSO.User.SystemSets.RRB_SENDUNIT_ONLY_INTERNAL.split('|');
					if(arrRRBSendUnitSet.length == 3){
						SendUnitOnlyInternal = (arrRRBSendUnitSet[0] == "Y") || false;
						SendUnitExcludeOuId = ";" + arrRRBSendUnitSet[1] + ";";
						SendUnitEmailDomain = arrRRBSendUnitSet[2];
					}
				}
				//1080502 David 1080045 取得鐵道局內部受文者正副本稱謂格式檢核設定
				//1100312	Joe		1090837		修改內部單位前綴詞，由鐵道局需求變更為全系統共用
				// var RRBCheckIssueFullName = false;
				// if(typeof theSSO.User.SystemSets.RRB_CHECK_ISSUE_FULLNAME !== "undefined")
					// RRBCheckIssueFullName = (theSSO.User.SystemSets.RRB_CHECK_ISSUE_FULLNAME == "Y") || false;
				var CheckIssueFullName = false;
				var NameBeforeIssuer = "";
				if(typeof theSSO.User.SystemSets.CHECK_ISSUE_FULLNAME !== "undefined"){
					if(theSSO.User.SystemSets.CHECK_ISSUE_FULLNAME.split('|').length == 2){
						CheckIssueFullName = (theSSO.User.SystemSets.CHECK_ISSUE_FULLNAME.split('|')[0] == "Y" && theSSO.User.SystemSets.CHECK_ISSUE_FULLNAME.split('|')[1] != "") || false;
						NameBeforeIssuer = theSSO.User.SystemSets.CHECK_ISSUE_FULLNAME.split('|')[1];
					}
				}
				var orgNickName = SSO_CONFIG.OrgNickName.toUpperCase();
				//1060825	Leslie[1060515]	新增必需儲存的訊息，用於訊息整合
				var msgAllowSave = [],msgCantSave = [];
				//1060825	Leslie[1060515]	新增客製化訊息
				if(!argAction)
					argAction = "儲存";
				// 1100223 Raymond 1090864 符合客委會機關暱稱及系統參數設定的資料夾時, 傳送前須檢核稿件是否含客語難用字
				var shouldCheckDiffcultWords = false;
				if(orgNickName == "HAC" && argAction == "傳送") {
					var checkDiffcultWordsFolder = theSSO.User.SystemSets.get("WE_CHECK_DIFFICULT_WORDS_FOLDER");
					if(checkDiffcultWordsFolder.length > 0) {
						var checkFolder = ';' + checkDiffcultWordsFolder + ';';
						var docFolder = ';' + _docObj.folder + '-' + _docObj.subfolder + ';';
						if(checkFolder.indexOf(docFolder) >= 0) {
							theLogger.warn("資料夾符合系統參數「WE_CHECK_DIFFICULT_WORDS_FOLDER」設定'" + checkDiffcultWordsFolder + "', 傳送前應檢核客語難用字");
							shouldCheckDiffcultWords = true;
						}
						else
							theLogger.warn("資料夾不符合系統參數「WE_CHECK_DIFFICULT_WORDS_FOLDER」設定'" + checkDiffcultWordsFolder + "', 傳送前不須檢核客語難用字");
					}
					else
						theLogger.warn("未設定系統參數「WE_CHECK_DIFFICULT_WORDS_FOLDER」, 預設不檢核客語難用字");
				}
				// 1100322 Raymond 1090857 新增符合以下條件則檢核「摘要」欄(於次頁顯示)不可為空
				var shouldCheckDigest = false;
				if(orgNickName == "HAC" && argAction == "傳送") {	// 條件1.機關暱稱為「HAC」(客委會), 傳送前檢核, 僅儲存不檢核
					var subjSyncDigestFldrs = theSSO.User.EnvSettings.get("WE_SUBJECT_SYNC_DIGEST_FOLDERS");
					if(subjSyncDigestFldrs.length > 0) {
						var checkFolders = '|' + subjSyncDigestFldrs + '|';
						var docFolder = '|' + _docObj.folder + "-" + _docObj.subfolder + '|';
						if(checkFolders.indexOf(docFolder) >= 0) {	// 條件2.目前公文所在資料夾符合環境變數設定
							theLogger.debug("目前資料夾'" + _docObj.folder + "-" + _docObj.subfolder + "'符合環境變數「WE_SUBJECT_SYNC_DIGEST_FOLDERS」設定(" + subjSyncDigestFldrs + ")設定");
							shouldCheckDigest = true;
						}
					}
				}
				//1110323 David 1110213 新增儲存前依設定檢核發日期
				var checkIssueDateFolder = theSSO.User.SystemSets.get("CHECK_ISSUEDATE_FOLDER");

				//1110624 David 1110268 取得傳送時需檢核可發文稿件的附件格式的資料夾異動別及格式設定
				var checkIssueAttachFolderSet = theSSO.User.SystemSets.get("CHECK_ISSUE_ATTACH_FOLDER_SET");
				var checkIssueAttachFolder = [];
				var checkIssueAttachExt = [];
				if(checkIssueAttachFolderSet != ""){
					let ArrIssueAttachFolderSet = checkIssueAttachFolderSet.split('|');
					if(typeof ArrIssueAttachFolderSet[0] != undefined)
						checkIssueAttachFolder = ArrIssueAttachFolderSet[0].split(';');
					if(typeof ArrIssueAttachFolderSet[1] != undefined)
						checkIssueAttachExt = ArrIssueAttachFolderSet[1].toLowerCase().split(';');
				}
				
				// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式下只檢核附件是否夾帶及外字, 其餘欄位不檢核
				if(!theSSO || theSSO.offlineMode != true) {
				// 公文文號長度
				if(bVerifyDocNoLen && docNoLen > 0) {
					if(_docObj.docNo == "") {
						var ans = confirm("您尚未設定公文文號，要繼續儲存嗎？");
						if(!ans)
							return false;
					}
					else if(_docObj.docNo.length != docNoLen) {
						alert("公文文號長度僅" + _docObj.docNo.length + "碼，請修正為" + docNoLen + "碼！");
						return false;
					}
				}
				
				// 儲存檢核設定.XML
				if(theAOL.saveCheckFields && SSOUtil.typeOf(theAOL.saveCheckFields) == "array") {
					for(var i=0; i<theAOL.saveCheckFields.length; i++) {
						var s = theAOL.saveCheckFields[i];
						if(s.xpath && s.xpath.length) {
							if(s.xpath.indexOf('/') >= 0) {
								theLogger.warn("暫不支援XPath:'" + s.xpath + "'的欄位檢核");
							}
							else {
								//1131115	Leslie[]	[Merge-1081118]儲存前檢核功能，新增有公文文號才啟用的檢核條件
								if(s.enableWithDocNo && _docObj.docNo == "")
									continue;	//有公文文號才啟用，無公文文號就跳下一個檢核條件
								for(var j=0; j<_cachedDM.length; j++) {
									if(_cachedDM[j] !== undefined) {	// 2016.11.4 bugfix
										//1060828	Leslie[1060515]	補上先檢查是否符合forDocType條件
										if(s.forDocType == "" || s.forDocType.indexOf(_cachedDM[j].getDocType()) != -1){
											var $field = $(_cachedDM[j].accquireXml().documentElement).find(s.xpath);
											//1131115	Leslie[1131142]	[Merge-1080812]新增針對屬性的欄位檢核邏輯，重寫本段邏輯，並調整訊息邏輯為"整合式"
											//1060828	Leslie[1060515]	增加不合法的欄位預設值判斷(有些欄位會放欄位預設值，例如：簽的陳核日期，預設值為:"請選擇陳核日期")
											//if($field.length && $field.text().trim() == "") {	//1060825	Leslie[1060515]	加上trim()，以去除換行字元
											/*if($field.length && ($field.text().trim() == "" || $field.text().trim() == s.inValidDefault)) {
												//1060825	Leslie[1060515]	調整調息整合顯示
												//msg2.push(s.msg.replace("%1", _cachedDM[j].getDraftName()));
												if(s.allowSave){
													if(orgNickName == "KHPB"){
														if(msgAllowSave.indexOf(_cachedDM[j].getDraftName()) == -1){
															msgAllowSave.push(_cachedDM[j].getDraftName());
															msgAllowSave[_cachedDM[j].getDraftName()] = [];
															msgAllowSave[_cachedDM[j].getDraftName()].push(s.msg);
														}
														else{
															msgAllowSave[_cachedDM[j].getDraftName()].push(s.msg);
														}
													}
													else{
														msgAllowSave.push(s.msg.replace("%1", _cachedDM[j].getDraftName()));
													}
												}
												else{
													if(orgNickName == "KHPB"){
														if(msgCantSave.indexOf(_cachedDM[j].getDraftName()) == -1){
															msgCantSave.push(_cachedDM[j].getDraftName());
															msgCantSave[_cachedDM[j].getDraftName()] = [];
															msgCantSave[_cachedDM[j].getDraftName()].push(s.msg);
														}
														else{
															msgCantSave[_cachedDM[j].getDraftName()].push(s.msg);
														}
													}
													else{
														msgCantSave.push(s.msg.replace("%1", _cachedDM[j].getDraftName()));
													}
												}
											}*/
											
											if($field.length){	//先確定有欄位，再依設定檔決定檢核text()或attr()
												let ckField = ('attr' in s)?$field.attr(s.attr).trim():$field.text().trim();
												if(ckField == "" || ckField == s.inValidDefault){
													if(s.allowSave){
														if(msgAllowSave.indexOf(_cachedDM[j].getDraftName()) == -1){
															msgAllowSave.push(_cachedDM[j].getDraftName());
															msgAllowSave[_cachedDM[j].getDraftName()] = [];
															msgAllowSave[_cachedDM[j].getDraftName()].push(s.msg);
														}
														else{
															msgAllowSave[_cachedDM[j].getDraftName()].push(s.msg);
														}
													}
													else{
														if(msgCantSave.indexOf(_cachedDM[j].getDraftName()) == -1){
															msgCantSave.push(_cachedDM[j].getDraftName());
															msgCantSave[_cachedDM[j].getDraftName()] = [];
															msgCantSave[_cachedDM[j].getDraftName()].push(s.msg);
														}
														else{
															msgCantSave[_cachedDM[j].getDraftName()].push(s.msg);
														}
													}
												}
											}
											//1131115	Leslie[1131142]	[Merge-1080812]新增針對屬性的欄位檢核邏輯，重寫本段邏輯，並調整訊息邏輯為"整合式"	--END--
										}
									}
								}
							}
							//1060825	Leslie[1060515]	調整調息整合顯示
							/*
							if(msg2.length) {
								if(s.allowSave) {
									msg2.push("是否繼續儲存？");
									var ans = confirm(msg2.join("\r\n"));
									if(!ans)
										return false;
									msg2.length = 0;	// clear msg
								}
								else {
									msg2.push("請修正後再儲存。")
									alert(msg2.join("\r\n"));
									return false;
								}
							}*/
						}
					}
					//1060825	Leslie[1060515]	調整調息整合顯示
					//1131115	Leslie[1131142]	[Merge-1080812]直接調整訊息邏輯為"整合式"
					//if(orgNickName == "KHPB"){
						if(msgAllowSave.length){
							for(var iMsg=0;iMsg<msgAllowSave.length;iMsg++){
								msg2.push(msgAllowSave[iMsg]+":"+msgAllowSave[msgAllowSave[iMsg]].join(","));
							}
							msg2.push("請填入上述文稿欄位內容後，再進行"+argAction+"動作!!\r\n繼續"+argAction+"?");
							var ans = confirm(msg2.join("\r\n"));
							if(!ans)
								return false;
							msg2.length = 0;
						}
						
						if(msgCantSave.length){
							for(var iMsg=0;iMsg<msgCantSave.length;iMsg++){
								msg2.push(msgCantSave[iMsg]+":"+msgCantSave[msgCantSave[iMsg]].join(","));
							}
							msg2.push("請填入上述文稿欄位內容後，再進行"+argAction+"動作!!")
							alert(msg2.join("\r\n"));
							return false;
						}
					/*}
					else{
						if(msgAllowSave.length) {
							msgAllowSave.push("是否繼續儲存？");
							var ans = confirm(msgAllowSave.join("\r\n"));
							if(!ans)
								return false;
							msgAllowSave.length = 0;	// clear msg
						}
						
						if(msgCantSave.length){
							msgCantSave.push("請修正後再儲存。")
							alert(msgCantSave.join("\r\n"));
							return false;
						}
					}*/
					//1131115	Leslie[1131142]	[Merge-1080812]直接調整訊息邏輯為"整合式"	--END--
					//1060825	Leslie[1060515]	調整調息整合顯示	--END--
				}
				
				// 文稿密等、解密條件
				if(checkSecField) {
					for(var j=0; j<_cachedDM.length; j++) {
						if(_cachedDM[j] !== undefined) {	// 2016.11.4 bugfix
							var $field = $(_cachedDM[j].accquireXml().documentElement).find("密等");
							// 1060808 Raymond 1060697 修正FDA空白公文不要檢核解密條件、日期
							//if($field.length) {
							if($field.length > 0 && _cachedDM[j].getDocType() != "空白公文") {
								var sec = $field.attr("代碼");
								if(sec == "密" || sec == "機密" || sec == "極機密" || sec == "絕對機密") {
									$field = $(_cachedDM[j].accquireXml().documentElement).find("解密條件或保密期限");
									if($field.length && $field.text() == "") {
										msg2.push(_cachedDM[j].getDraftName() + ": 密等為'" + sec + "'，解密條件或保密期限不得為空!");
									}
								}
							}
						}
					}
					if(msg2.length) {
						msg2.push("請修正後再儲存。");
						alert(msg2.join("\r\n"));
						return false;
					}
				}
				
				// 發文方式
				if(true) {
					var excludes = ["簽","便簽","便簽此致","公文改分單","公文提陳單","空白公文","簽稿會核單"];
					for(var j=0; j<_cachedDM.length; j++) {
						if(_cachedDM[j] !== undefined) {	// 2016.11.4 bugfix
							var docType = _cachedDM[j].getDocType();
							if(excludes.indexOf(docType) >= 0)	// 2016.8.24 FIX
								theLogger.log(_cachedDM[j].getDraftName() + "為不需檢核「發文方式」的例外文別 - " + docType + "!");
							else {
								var c = 0;
								var firstRcvr = "";
								// 1111020 Raymond 1110885 修正檢核受文者發文方式以<受文者列表>下的為準, 以避免檢核到跟受文者列表同一層的<受文者>
								//var $field = $(_cachedDM[j].accquireXml().documentElement).find("受文者");
								var $field = $(_cachedDM[j].accquireXml().documentElement).find("> 受文者列表 受文者");
								if($field.length) {
									$field.each(function(idx, nd) {
										if($(nd).find("發文方式").text() == "") {
											c++;
											if(firstRcvr == "")
												firstRcvr = $(nd).find("正式名稱").text();
										}
									});
									if(c > 0) {
										msg2.push(_cachedDM[j].getDraftName() + ": 共有'" + firstRcvr + "'等 " + c + " 個受文者之「發文方式」未設定!");
									}
								}
							}
						}
					}
					if(msg2.length) {
						msg2.push("請修正後再儲存。");
						alert(msg2.join("\r\n"));
						return false;
					}
				}
				
				// 分層負責代碼
				if(true) {
					for(var j=0; j<_cachedDM.length; j++) {
						if(_cachedDM[j] !== undefined) {	// 2016.11.4 bugfix
							var dm = _cachedDM[j];
							// 條件1: 文稿內有「是否啟用分層負責代碼機制」且設為Y
							var $field = $(dm.accquireXml().documentElement).find("是否啟用分層負責代碼機制");
							if($field.length) {
								if($field.text() == "Y") {
									// 條件2: 文稿內有「分層負責代碼」且為空值
									var $field2 = $(dm.accquireXml().documentElement).find("分層負責代碼");
									if($field2.length) {
										//var v = $field2.attr("代碼");
										var v = $field2.text();	// 2016.10.6 據Nick說FDA自某次版更後就喪失分層負責代碼檢核機制, 因此本來要檢核代碼屬性, 改檢核文字內容, 以配合一般機關的分層負責代碼都是寫回文字內容的行為
										if(v == "") {
											// 條件3: 符合文別及函類別
											var docType = dm.getDocType(), subDocType = dm.getSubDocType();
											if((docType == "函" && (subDocType == "函" || subDocType == "書函")) ||	// 2016.10.5 FIX
												docType == "令" || docType == "公告" || docType == "開會通知單") {
												/* 2016.12.8 Dick說FDA要取消第4條件, 並變更提示訊息文字
												// 條件4: 發文機關是'衛生福利部'
												var $sendOrg = $(dm.accquireXml().documentElement).find("發文機關");
												if($sendOrg.length) {
													var sendOrg = $sendOrg.find("全銜").text();
													if(sendOrg == "衛生福利部") {
														msg2.push(dm.getDraftName() + ": 代發部函代碼不得為空!");
													}
												}*/
												msg2.push(dm.getDraftName() + ": 分層負責代碼不得為空!");
											}
										}
									}
								}
							}
						}
					}
					if(msg2.length) {
						msg2.push("請修正後再儲存。");
						alert(msg2.join("\r\n"));
						return false;
					}
				}
				
				// 公文擬辦方式 - 2016.12.19 新增, 因FDA修改檢核邏輯, 只能改程式去檢核, 無法適用參數檔, 故FDA需設置環境變數WE_CHECK_PROC_WAY為"Y", 以開啟此功能, 並將「公文擬辦方式」檢核項目從"儲存檢核設定.XML"中移除
				if(checkProcWay) {
					for(var j=0; j<_cachedDM.length; j++) {
						if(_cachedDM[j] !== undefined) {
							var $field = $(_cachedDM[j].accquireXml().documentElement).find("公文擬辦方式");
							if($field.length) {
								var v = $field.text();
								if(v == "" && _docObj.get("ODWDCM", "CLOSE_DATE") == "") {	// 依FDA1051216提出的客製化檢核邏輯
									msg2.push(_cachedDM[j].getDraftName() + ": 公文擬辦方式不得為空!");
								}
								//1061016	Leslie[1060939]	取消原單的錯誤邏輯
								//1060825	Leslie[1060515]	新增高港警客製化檢核條件
								/*else if((v.trim() == "" || v == "無") &&  _docObj.get("ODWDCM", "CLOSE_DATE") == "" && orgNickName == "KHPB" ){
									msg2.push(_cachedDM[j].getDraftName() + ": 公文擬辦方式不得為空!");
								}*/
							}
						}
					}
					if(msg2.length) {
						msg2.push("請修正後再儲存。");
						alert(msg2.join("\r\n"));
						return false;
					}
				}

				//1071224 David 1071231 檢核各稿件分類號是否一致
				if(bNeedCheckAllDraftCls){
					var CheckClsMsg = [];
					var arrDraftCls = [];
					var HasDifCls = false;
					for(var j=0; j<_cachedDM.length; j++) {
						if(_cachedDM[j] !== undefined) {
							// 分類號
							var $field = $(_cachedDM[j].accquireXml().documentElement).find("分類號");
							if($field.length) {
								var DraftCls = $field.text();
								CheckClsMsg.push(_cachedDM[j].getDraftName() + ":分類號為" + DraftCls);

								if(arrDraftCls.length == 0)
									arrDraftCls.push(DraftCls);
								else if(arrDraftCls.indexOf(DraftCls) == -1)
									HasDifCls = true;
							}
						}
					}
					if(HasDifCls){
						CheckClsMsg.push("檢核各稿件分類號不一致");
						CheckClsMsg.push("請修正後再儲存。");
						alert(CheckClsMsg.join("\r\n"));
						return false;
					}
				}

				// 發文字號支號
				if(autoGetIssueNoNo) {
					// 1090527 Raymond 1090391 新增過濾可發文的稿件才檢核支號
					var unExcludes = docCloseSendDraftType.split(';');	//可發文的稿件類型;
					// 先檢查是否已有文稿取過發文字號
					// 1090527 Raymond 1090391 移除重複宣告的j, 新增統計總共幾件可發文稿件
					//var hasIssueNo = false, j;
					var hasIssueNo = false, needIssueDrafts = 0;
					for(var j=0; j<_cachedDM.length; j++) {
						if(_cachedDM[j] !== undefined) {	// 2016.11.4 bugfix
							var dm = _cachedDM[j];
							// 1090527 Raymond 1090391 非可發文的文別之一則跳過檢核支號, 避免有「發文字號」的簽, 因不需取號而提示警告
							if(unExcludes.indexOf(dm.getDocType()) < 0)
								continue;
							var $field = $(dm.accquireXml().documentElement).find("發文字號");
							if($field.length) {
								// 1080104 Raymond 修正未設定過發文字號時只取文號的文字內容會取到\r\n等字元, 導致誤判hasIssueNo的問題
								//var issueNo = $field.find("文號").text();
								var issueNo = $field.find("年度").text() + $field.find("流水號").text();
								if(issueNo != "") {
									hasIssueNo = true;
									//break;	// 1090527 Raymond 1090391 偵測到第1筆有發文字號的稿件不要中斷, 還要統計總共幾件可發文稿件
								}
								// 1090527 Raymond 1090391 統計總共幾件可發文稿件
								needIssueDrafts++;
							}
						}
					}
					// 再檢查支號
					var mem = {};
					for(var j=0; j<_cachedDM.length; j++) {
						if(_cachedDM[j] !== undefined) {	// 2016.11.4 bugfix
							var dm = _cachedDM[j];
							// 1090527 Raymond 1090391 非可發文的文別之一則跳過檢核支號, 避免有「發文字號」的簽, 因不需取號而提示警告
							if(unExcludes.indexOf(dm.getDocType()) < 0)
								continue;
							var $field = $(dm.accquireXml().documentElement).find("發文字號");
							if($field.length) {
								var $issueNo = $field.find("文號");
								if($issueNo.length) {
									var issueNo = $issueNo.find("年度").text() + $issueNo.find("流水號").text();
									if(issueNo == "") {
										if(hasIssueNo) {
											theLogger.warn(dm.getDraftName() + "未取發文號, 但其它文稿已取過發文號, 故要求使用者應批次取發文號。");
											msg2.push(dm.getDraftName());
										}
									}
									else {
										//1071114 David 1071130 修正宣告時機
										var no = $issueNo.find("支號").text();

										if(issueNo in mem) {	// 已有相同發文文號文稿
											//1071114 David 1071130 修正宣告時機
											//var no = $issueNo.find("支號").text();
											if(no == "") {
												theLogger.warn(dm.getDraftName() + "已取相同發文號但未編支號, 要求使用者批次取得發文號。");
												msg2.push(dm.getDraftName());
											}
											else {
												var availPatterns = {
													"1Aa": [1, 9, 10, 35, 36, 61],
													"1aA": [1, 9, 36, 61, 10, 35],
													"A1a": [27, 35, 1, 26, 36, 61],
													"Aa1": [53, 61, 1, 26, 27, 52],
													"a1A": [27, 35, 36, 61, 1, 26],
													"aA1": [53, 61, 27, 52, 1, 26]
												}, ptrn = availPatterns["1Aa"];
												// 1130605 Raymond 屏東序688 若WE_FIRST_ISSUENO_NO設為"0"時, 要用原來的1~9區間檢核支號, 否則會誤判第10筆文稿(支號為"9")應設為"A"而出現錯誤訊息
												// 1090820 Raymond 1090391 若firstIssueNoNo有設值, 下一組支號會從firstIssueNoNo加1開始編, 到序列最後1碼時, 會超出序列可編碼的範圍, 故用第2個陣列來定義第1碼被吃掉的情況
												//if(firstIssueNoNo != "") {
												if(firstIssueNoNo == "1") {
													availPatterns['1Aa'] = [1, 8, 9, 34, 35, 60];
													availPatterns['1aA'] = [1, 8, 35, 60, 9, 34];
													availPatterns['A1a'] = [26, 34, 1, 25, 35, 60];
													availPatterns['Aa1'] = [52, 60, 1, 25, 26, 51],
													availPatterns['a1A'] = [26, 34, 35, 60, 1, 25];
													availPatterns['aA1'] = [52, 60, 26, 51, 1, 25];
												}
												if(issueNoNoRule != "") {
													for(p in availPatterns) {
														if(p == issueNoNoRule) {
															ptrn = availPatterns[p];
															break;
														}
													}
												}
												var occ = mem[issueNo];
												if(occ >= ptrn[0] && occ <= ptrn[1]) {
													// 1090527 Raymond 1090391 若WE_FIRST_ISSUENO_NO設為1, 則第2筆可發文稿件的支號應從2編起
													//var correct = "1".charCodeAt(0) + occ - ptrn[0];
													var correct = ((firstIssueNoNo == "1")?"2":"1").charCodeAt(0) + occ - ptrn[0];
													correct = String.fromCharCode(correct);
													if(no != correct) {
														theLogger.warn(dm.getDraftName() + "已取發文號及支號('" + no + "'), 但順序不符(應為'" + correct + "'), 要求使用者重新批次取得發文號。");
														msg2.push(dm.getDraftName());
													}
												}
												else if(occ >= ptrn[2] && occ <= ptrn[3]) {
													// 1090714 Raymond CDC序103 修正儲存檢核支號順序錯誤問題
													// 1090527 Raymond 1090391 若WE_FIRST_ISSUENO_NO設為A, 則第2筆可發文稿件的支號應從B編起
													//var correct = "A".charCodeAt(0) + occ - ptrn[0];
													//var correct = ((firstIssueNoNo == "A")?"B":"A").charCodeAt(0) + occ - ptrn[0];
													var correct = ((firstIssueNoNo == "A")?"B":"A").charCodeAt(0) + occ - ptrn[2];
													correct = String.fromCharCode(correct);
													if(no != correct) {
														theLogger.warn(dm.getDraftName() + "已取發文號及支號('" + no + "'), 但順序不符(應為'" + correct + "'), 要求使用者重新批次取得發文號。");
														msg2.push(dm.getDraftName());
													}
												}
												else if(occ >= ptrn[4] && occ <= ptrn[5]) {
													// 1090714 Raymond CDC序103 修正儲存檢核支號順序錯誤問題
													// 1090527 Raymond 1090391 若WE_FIRST_ISSUENO_NO設為a, 則第2筆可發文稿件的支號應從b編起
													//var correct = "a".charCodeAt(0) + occ - ptrn[0];
													//var correct = ((firstIssueNoNo == "a")?"b":"a").charCodeAt(0) + occ - ptrn[0];
													var correct = ((firstIssueNoNo == "a")?"b":"a").charCodeAt(0) + occ - ptrn[4];
													correct = String.fromCharCode(correct);
													if(no != correct) {
														theLogger.warn(dm.getDraftName() + "已取發文號及支號('" + no + "'), 但順序不符(應為'" + correct + "'), 要求使用者重新批次取得發文號。");
														msg2.push(dm.getDraftName());
													}
												}
												else {
													theLogger.error(dm.getDraftName() + "已取發文號及支號('" + no + "'), 但文稿數量(" + occ + ")已超過可用支號範圍, 要求使用者重新批次取得發文號。");
													msg2.push(dm.getDraftName());
												}
											}
											mem[issueNo]++;
										}
										else {	// 這是此發文號的第一筆
											// 1090527 Raymond 1090391 若可發文稿件僅有1筆, 則支號應為空
											//if(firstIssueNoNo != "") {
											if(firstIssueNoNo != "" && needIssueDrafts > 1) {
												if(firstIssueNoNo != no) {
													theLogger.warn(dm.getDraftName() + "已取發文號及支號('" + no + "'), 但順序不符(首筆應為'" + firstIssueNoNo + "'), 要求使用者重新批次取得發文號。");
													msg2.push(dm.getDraftName());
												}
											}
											// 1120707 Raymond 標檢局序110 標檢局規則：只有一筆可發文稿件時, 支號不應為空
											else if(SSO_CONFIG.OrgNickName == "BSMI") {
												if(no == "") {
													theLogger.warn(dm.getDraftName() + "已取發文號及支號('" + no + "'), 僅有一筆可發文稿件其支號也不應為空值, 要求使用者重新批次取得發文號。");
													msg2.push(dm.getDraftName());
												}
											}
											else if(no != "") {	// 支號應為空, 若否則提示
												theLogger.warn(dm.getDraftName() + "已取發文號及支號('" + no + "'), 但順序不符(應為空值), 要求使用者重新批次取得發文號。");
												msg2.push(dm.getDraftName());
											}
											mem[issueNo] = 1;
										}
									}
								}
							}
						}
					}
					if(msg2.length) {
						var ans = confirm("以下稿件：\r\n" + msg2.join("、\r\n") + "\r\n支號有誤，請調整支號順序!\r\n仍繼續儲存嗎?");
						if(!ans)
							return false;
						msg2.length = 0;	// clear msg
					}
				}
				
				// 發文字號
				// 1100709 Raymond 1100581 修正未取文號時不檢核「發文字號」
				//if(checkIssueWordNo) {
				if(checkIssueWordNo && _docObj.docNo != "") {
					var excludes = ["簽","便簽","便簽此致","公文改分單","公文提陳單","空白公文","簽稿會核單"];
					for(var j=0; j<_cachedDM.length; j++) {
						if(_cachedDM[j] !== undefined) {	// 2016.11.4 bugfix
							var docType = _cachedDM[j].getDocType();
							// 1100709 Raymond 1100581 修正除外文別符合的才不檢核「發文字號」
							//if(excludes.indexOf(docType) < 0)
							if(excludes.indexOf(docType) >= 0)
								theLogger.log(_cachedDM[j].getDraftName() + "為不需檢核「發文字號」的例外文別 - " + docType + "!");
							else {
								var $field = $(_cachedDM[j].accquireXml().documentElement).find("發文字號");
								if($field.length) {
									var word = $field.find("字").text();
									var $no = $field.find("文號");
									if($no.length) {
										var no = $no.find("年度").text();
										no += $no.find("流水號").text();
										if(word == "" && no == "")
											msg2.push(_cachedDM[j].getDraftName() + ": 「發文字」及「發文號」均未設定!");
										else if(word == "")
											msg2.push(_cachedDM[j].getDraftName() + ": 「發文字」未設定!");
										else if(no == "")
											msg2.push(_cachedDM[j].getDraftName() + ": 「發文號」未設定!");
									}
								}
							}
						}
					}
					if(msg2.length) {
						msg2.push("請修正，請問繼續儲存嗎？");
						var ans = confirm(msg2.join("\r\n"));
						if(!ans)
							return false;
						msg2.length = 0;	// clear msg
					}
				}

				//1110213 David 1110213 新增發文日期檢核
				if(checkIssueDateFolder && checkIssueDateFolder != ""){
					var folder = _docObj.folder, subfolder = _docObj.subfolder;
					var arFolder = checkIssueDateFolder.split('|');
					var checkResult = arFolder.filter(function(f){
						return f === folder + "-" + subfolder;
					});
					
					if(checkResult.length > 0){
						for(var j=0; j<_cachedDM.length; j++) {
							if(_cachedDM[j] !== undefined) {
								var dm = _cachedDM[j];
								// 1110804 Raymond 考試院序163 文稿為不可編輯時, 取nodes會丟出error, 要用try-catch避掉
								try {
								var ndIssueDate = dm.nodes("//發文日期");
								if(ndIssueDate.length > 0){
									if(dm.text("//發文日期/年月日") == "")
										msg2.push(_cachedDM[j].getDraftName() + ": 「發文日期」未設定!");
								}
								}
								catch(e) {
									theLogger.warn("無法檢核發文日期: " + e.message);
								}
							}
						}
					}
					if(msg2.length) {
						msg2.push("請修正後再儲存。");
						alert(msg2.join("\r\n"));
						return false;
					}
				}
				
				// 解密日期
				if(true) {
					for(var j=0; j<_cachedDM.length; j++) {
						if(_cachedDM[j] !== undefined) {	// 2016.11.4 bugfix
							var dm = _cachedDM[j];
							var $field = $(dm.accquireXml().documentElement).find("解密日期");
							// 1060808 Raymond 1060697 修正FDA空白公文不要檢核解密條件、日期
							//if($field.length) {
							if($field.length > 0 && _cachedDM[j].getDocType() != "空白公文") {
								var $date = $field.find("年月日");
								var decdate;
								if($date.length)
									decdate = $date.text();
								else
									decdate = $field.text();
								
								if(decdate == "") {
									var $deccond = $(dm.accquireXml().documentElement).find("解密條件或保密期限");
									if($deccond.length) {
										var deccond = $deccond.text();
										if(deccond.match(/^[\(（]本件至/)) {
											msg2.push(dm.getDraftName() + ": 解密條件或保密期限為'" + deccond + "'，解密日期不得為空!");
										}
									}
								}
							}
						}
					}
					if(msg2.length) {
						msg2.push("請修正後再儲存。");
						alert(msg2.join("\r\n"));
						return false;
					}
				}
				
				//1060825	Leslie[1060515]	新增檢核受文者數量
				// 受文者
				if(checkMainIssuer) {
					var unExcludes = docCloseSendDraftType.split(';');	//可發文的稿件類型;
					for(var j=0; j<_cachedDM.length; j++) {
						if(_cachedDM[j] !== undefined) {
							var docType = _cachedDM[j].getDocType();
							if(unExcludes.indexOf(docType) < 0)
								theLogger.log(_cachedDM[j].getDraftName() + "為不需檢核「受文者」的例外文別 - " + docType + "!");
							else {
								if(docType == "開會通知單" || docType == "會勘通知單"){
									var $field = $(_cachedDM[j].accquireXml().documentElement).find("受文者[本別='主持人'],受文者[本別='出席者']");
									if(!$field.length) {
										msg2.push(dm.getDraftName() + "：至少要有一個主持人或出席者");
									}
								}
								else{
									var $field = $(_cachedDM[j].accquireXml().documentElement).find("受文者[本別='正本']");
									if(!$field.length) {
										msg2.push(dm.getDraftName() + "：至少要有一個正本受文者");
									}
								}
							}
						}
						if(msg2.length) {
							msg2.push("請修正後再儲存。");
							alert(msg2.join("\r\n"));
							return false;
						}
					}
				}
				
				// 受文者含附件是否有附件
				if(checkAttDocTypes.length) {
					// 1060810 Raymond 1060472 環境變數的分隔符號是逗號不是分號
					//var checkList = checkAttDocTypes.split(";");
					var checkList = checkAttDocTypes.split(",");
					for(var j=0; j<_cachedDM.length; j++) {
						if(_cachedDM[j] !== undefined) {	// 2016.11.4 bugfix
							var dm = _cachedDM[j];
							// 1061120 Raymond 1060905 檢查文稿可編輯時才檢核應否含附件
							if(dm.getEditable()) {
								var docType = dm.getDocType();
								if(checkList.indexOf(docType) >= 0) {
									var $atts = $(dm.accquireXml().documentElement).find("附件檔名");
									var $rcvrs = $(dm.accquireXml().documentElement).find("受文者");
									if($rcvrs.length) {
										var c = 0;
										for(var i=0; i<$rcvrs.length; i++) {
											var hasAtt = $rcvrs.eq(i).find("含附件").text();
											if(hasAtt == "是")
												c++;
										}
									}
									if($atts.length > 0 && c == 0) {
										msg2.push(dm.getDraftName() + ": 已夾帶附件，是否不更改受文者編輯之附件欄位?");
									}
									else if($atts.length == 0 && c > 0) {
										msg2.push(dm.getDraftName() + ": 未夾帶附件。");
									}
								}
							}
						}
					}
					if(msg2.length) {
						msg2.push("仍繼續儲存？");
						var ans = confirm(msg2.join("\r\n"));
						if(!ans)
							return false;
						msg2.length = 0;	// clear msg
					}
				}
				
				//1080426 David 1080088 新增鐵道局單位發文僅能發內部單位檢核邏輯
				if(SendUnitOnlyInternal && SendUnitExcludeOuId.indexOf(theAOL.docObj.ICOUId.substr(0,2))==-1 ) {
					var checkSendUnitOnlyInternal = 0;
					for(var j=0; j<_cachedDM.length; j++) {
						//文稿可異動才檢核
						// 1130129 Raymond 自測 修正條件式錯誤
						//if(_cachedDM[j] !== "undefined" && _cachedDM[j].getEditable){
						if(_cachedDM[j] !== undefined && _cachedDM[j].getEditable()){
							//取得發文機關資訊，
							var $field = $(_cachedDM[j].accquireXml().documentElement).find("發文機關列表 發文機關 機關代碼");
							if($field.length) {
								var DraftIssueOrgNo = $field.text();
								if(DraftIssueOrgNo.length == 17){
									var $Issue = $(_cachedDM[j].accquireXml().documentElement).find("受文者");
									if($Issue.length) {
										$Issue.each(function(idx, nd) {
											if($(nd).find("內部單位代碼").text() == "") {
												var IssueType = $(nd).find("發文方式").text();
												var Email = $(nd).find("Email").text();
												var arrEmailDomain = Email.split('@');
												var EmailDomain = "";
												if(arrEmailDomain.length == 2)
													EmailDomain = arrEmailDomain[1];

												//1100916 David 1101094 抄本受文者為承辦人時，不檢核
												var DocTyoe = $(nd).attr('本別');
												var IssueOrgName = $(nd).find("正式名稱").text();
												if(DocTyoe == "抄本" && IssueOrgName == theAOL.docObj.ODWMSG.IC_USER_NAME)
													return;

												if(IssueType != "電子郵件" )
													checkSendUnitOnlyInternal++;
												else if(EmailDomain.toUpperCase() != SendUnitEmailDomain.toUpperCase())
													checkSendUnitOnlyInternal++;
											}
										});
									}
								}
							}
						}
					}
					if(checkSendUnitOnlyInternal > 0){
						alert("單位發文不可發送外機關，請修正受文者為內部單位或調整以機關名義發文");
						return false;
					}
				}
				
				//1080502 David 1080045 取得鐵道局內部受文者正副本稱謂格式檢核設定
				//1100312	Joe		1090837		修改內部單位前綴詞，由鐵道局需求變更為全系統共用
				// if(RRBCheckIssueFullName){
				if(CheckIssueFullName){
					//1110114 David 1101425 取得組織物件
					let orgNode = SSOUtil.getOrgNode(_docObj.sourceOrgNo);
					for(var j=0; j<_cachedDM.length; j++) {
						//文稿可異動才檢核
						var setFullName = false;
						// 1130129 Raymond 自測 修正條件式錯誤
						//if(_cachedDM[j] !== "undefined" && _cachedDM[j].getEditable){
						if(_cachedDM[j] !== undefined && _cachedDM[j].getEditable()){
							//1130307	Joe		1121110		修改鐵道主持人、抄本不顯示內部單位前綴詞--S
							// var CheckDocType = ["正本","副本","抄本","主持人","出席者","列席者"];
							var CheckDocType;
							if(SSO_CONFIG.OrgNickName == "RRB")
								CheckDocType = ["正本","副本","出席者","列席者"];
							else
								CheckDocType = ["正本","副本","抄本","主持人","出席者","列席者"];
							//1130307	Joe		1121110		修改鐵道主持人、抄本不顯示內部單位前綴詞--E
							for(var iType = 0 ; iType < CheckDocType.length ; iType++)
							{
								var $Issue = $(_cachedDM[j].accquireXml().documentElement).find("受文者[本別='" + CheckDocType[iType] + "']");
								if($Issue.length) {
									var NeedSetIssueFullName = false;
									$Issue.each(function(idx, nd) {
										if($(nd).find("內部單位代碼").text() == "")
											NeedSetIssueFullName = false;
										else{
											var FullName = $(nd).find("全銜").text();
											var $IssueNode = $(nd).find("全銜").get(0);

											if(!NeedSetIssueFullName){
												NeedSetIssueFullName = true;

												//1110114 David 1101425 客委會新增可單位發文的內部單位不需帶前綴詞
												if(SSO_CONFIG.OrgNickName == "HAC"){
													let unitNo = $(nd).find("內部單位代碼").text();
													if (orgNode && unitNo && unitNo.length){
														let $unitNodes = $(orgNode).find('Unit[UnitCode="' + unitNo + '"]')
														if ($unitNodes.length) {
															let UnitIssue = SSOUtil.xml_getChildNodeValue($unitNodes,"UnitIssue")
															if(UnitIssue == "Y")
																return;
														}
													}
												}

												//1100312	Joe		1090837		修改內部單位前綴詞，由鐵道局需求變更為全系統共用
												// if(FullName.indexOf("本局") != 0){
												if(FullName.indexOf(NameBeforeIssuer) != 0){
													if("text" in $IssueNode)
														// $IssueNode.text = "本局" + FullName;
														$IssueNode.text = NameBeforeIssuer + FullName;
													else
														// $IssueNode.textContent = "本局" + FullName;
														$IssueNode.textContent = NameBeforeIssuer + FullName;
													setFullName = true;
													_cachedDM[j].needRetransFO(true);
												}
											}
											else{
												// if(FullName.indexOf("本局") == 0){
												if(FullName.indexOf(NameBeforeIssuer) == 0){
													if("text" in $IssueNode)
														// $IssueNode.text = FullName.replace("本局", "");
														$IssueNode.text = FullName.replace(NameBeforeIssuer, "");
													else
														// $IssueNode.textContent = FullName.replace("本局", "");
														$IssueNode.textContent = FullName.replace(NameBeforeIssuer, "");
													setFullName = true;
													_cachedDM[j].needRetransFO(true);
												}
											}
										}
									});
								}
							}
						}

						if(setFullName)
							$("#aol #leftPart .viewPort").find(".pages").flip("refresh");	// 重新整理頁面
					}
				}
				
				// 分層負責代碼(一般機關)
				if(checkDelaminateLvl) {
					for(var j=0; j<_cachedDM.length; j++) {
						if(_cachedDM[j] !== undefined) {	// 2016.11.4 bugfix
							var dm = _cachedDM[j];	// 2016.11.4 bugfix
							var $field = $(dm.accquireXml().documentElement).find("分層負責代碼");
							if($field.length) {
								var dela = $field.text();
								if(dela == "") {
									msg2.push(dm.getDraftName() + ": 分層負責代碼不得為空!");
								}
							}
						}
					}
					if(msg2.length) {
						msg2.push("請修正後再儲存。");
						alert(msg2.join("\r\n"));
						return false;
					}
				}
				
				// 應解密日期(陸委會)
				if(checkDecryptDate) {
					for(var j=0; j<_cachedDM.length; j++) {
						if(_cachedDM[j] !== undefined) {	// 2016.11.4 bugfix
							var dm = _cachedDM[j];
							var $field = $(dm.accquireXml().documentElement).find("應解密日期");
							if($field.length) {
								var $date = $field.find("年月日");
								var decdate;
								if($date.length)
									decdate = $date.text();
								else
									decdate = $field.text();
								
								if(decdate == "") {
									var $deccond = $(dm.accquireXml().documentElement).find("解密條件或保密期限");
									if($deccond.length) {
										var deccond = $deccond.text();
										if(deccond.match(/[\d]*/)) {
											msg2.push(dm.getDraftName() + ": 解密條件或保密期限含阿拉伯數字，應解密日期不得為空!");
										}
									}
								}
							}
						}
					}
					if(msg2.length) {
						msg2.push("請修正後再儲存。");
						alert(msg2.join("\r\n"));
						return false;
					}
				}
				
				for(var j=0; j<_cachedDM.length; j++) {
					var msg3 = [];
					if(_cachedDM[j] !== undefined) {	// 2016.11.4 bugfix
						// 分類號
						if(true) {
							var $field = $(_cachedDM[j].accquireXml().documentElement).find("分類號");
							if($field.length) {
								if($field.text() == "")
									msg3.push("分類號");
							}
						}
						
						// 保存年限
						if(true) {
							var $field = $(_cachedDM[j].accquireXml().documentElement).find("保存年限");
							if($field.length) {
								if($field.text() == "")
									msg3.push("保存年限");
							}
						}
						
						// 案次號
						if(checkCaseNo) {
							var $field = $(_cachedDM[j].accquireXml().documentElement).find("案次號");
							if($field.length) {
								if($field.text() == "")
									msg3.push("案次號");
							}
						}
					}
					
					if(msg3.length) {
						msg2.push(_cachedDM[j].getDraftName() + ": " + msg3.join("、") + "等欄位未設定!");
					}
				}
				}	// end of if(!theSSO || theSSO.offlineMode != true)
				
				//1051003	Leslie	增加儲存前檢核附件是否均已匯出完成
				if(SSO_CONFIG.enableConvertAttPage){
					var hasAttErr;
					for(var j=0; j<_cachedDM.length; j++) {
						var msg3 = [];
						if(_cachedDM[j] !== undefined) {	// 2016.11.4 bugfix
							var _attCnt = _cachedDM[j].getAttachFileCounts();
							for(var iAttIdx=0;iAttIdx<_attCnt;iAttIdx++){
								if(_rndrAtt.checkAttWaitConvert(_cachedDM[j].getAttachGUID(iAttIdx))){
									msg3.push($(_cachedDM[j].getAttachFile(iAttIdx)).attr('附件名'));
								}
							}
						}
						if(msg3.length){
							msg2.push(_cachedDM[j].getDraftName() + ": "  + msg3.join("、") + " 頁面匯出未完成!");
							hasAttErr = true;
						}
					}
					
					if(hasAttErr) {
						msg2.push("請點擊附件以重新匯出或修正附件內容後再儲存。");
						alert(msg2.join("\r\n"));
						return false;
					}
				}

				//1110624 David 1110268 新增傳送時需檢核可發文稿件的附件格式
				let needCheckIssueAttach = false;
				let CheckIssueAttachErr = false;
				let IssueDraftHasAtt = false;
				if(checkIssueAttachFolder.length > 0 && checkIssueAttachExt.length > 0 && argAction == "傳送" && checkIssueAttachFolder.includes(theAOL.docObj.folder + "-" + theAOL.docObj.subfolder + "-" + theAOL.docObj.txName))
				{
					let CheckIssueAttachErrMsg = theSSO.User.EnvSettings.get("WE_WARNING_ATTACH_MSG");
					if(CheckIssueAttachErrMsg == "")
						CheckIssueAttachErrMsg = "可發文稿件的附件格式不符合傳送設定";

					let arrIssueDocType = docCloseSendDraftType.split(';');	//可發文的稿件類型;

					for(let idm=0; idm<_cachedDM.length; idm++) {
						if(CheckIssueAttachErr)
							break;

						if(_cachedDM[idm] !== undefined) {
							let dm = _cachedDM[idm];
							if(arrIssueDocType.includes(dm.getSubDocType())){
								let _attCnt = dm.getAttachFileCounts();
								for(let iAttIdx = 0 ; iAttIdx <_attCnt ; iAttIdx++){
									IssueDraftHasAtt = true;
									let arrAttName = $(dm.getAttachFile(iAttIdx)).text().toLowerCase().split('.');
									if(arrAttName.length > 1 && !checkIssueAttachExt.includes(arrAttName[arrAttName.length-1])){
										CheckIssueAttachErr = true;
										break;
									}
								}
							}
						}
					}
					
					if(IssueDraftHasAtt)
					{
						if(CheckIssueAttachErr){
							msg2.push(CheckIssueAttachErrMsg);
							alert(msg2.join("\r\n"));
							return false;
						}
						else
						{
							if(!confirm("請確認所有附件格式或內容與核定時相符\r\n直接傳送，請按「確定」\r\n再次檢查，請按「取消」"))
								return false;
						}
					}
				}
				
				// 1120323 Raymond 銓敘部序165 檢核新增的環境變數「WE_NO_CHECK_EUDC」若為"1", 則忽略檢核造字
				// 1060810 Raymond 1060696 儲存前檢核文稿內文是否有造字或控制碼, 有則轉換為全形及半形空白並提示警告
				//if(true) {
				var noCheckEUDC = theSSO.User.EnvSettings.get("WE_NO_CHECK_EUDC");
				if(!!noCheckEUDC)
					theLogger.log("環境變數「WE_NO_CHECK_EUDC」設定為'" + noCheckEUDC + "'-" + ((noCheckEUDC == "1")?"忽略檢核造字":((noCheckEUDC == "2")?"忽略檢核<承辦人>欄位的造字":((noCheckEUDC == "0")?"檢核造字":"不支援的設定值"))));
				if(!noCheckEUDC || noCheckEUDC != "1") {
					function verifyInvalidChar(xml, ascii, pua) {	// 文稿內文若有不合法字元會回傳true, ascii參數會加入檢出的ASCII控制碼, pua參數會加入檢出的造字碼
						function getInvalidChar(nd, ascii, pua) {	// 判斷不合法字元
							var modifiedPUA = false, modifiedASCII = false;
							var str = ("text" in nd)?nd.text:nd.textContent;	// 1060811 bugfix
							for(var n=0; n<str.length; n++) {
								var cc = str.charCodeAt(n);
								if(cc >= 0xE000 && cc <= 0xF8FF) {	// 造字碼
									// 1061205 Raymond 1060815 改為不以全形空白取代, 而是提示警告
									//pua.push(str[n]);
									//str = str.substr(0, n) + "　" + str.substr(n + 1);// 取代為全形空白
									if(nd.parentNode.nodeName == "mi" || nd.parentNode.nodeName == "fmt") {
										var $par = $(nd.parentNode).closest("主旨, 段落, 條列");
										if($par.length) {
											if($par.get(0).nodeName == "段落")
												pua.push({fld: "段落'" + $par.attr("段名") + "'", ch: str[n]});
											else if($par.get(0).nodeName == "條列")
												pua.push({fld: "條列'" + $par.attr("序號") + "'", ch: str[n]});
											else
												pua.push({fld: $par.get(0).nodeName, ch: str[n]});
										}
										else {
											theLogger.error("MI/FMT標籤不在主旨/段落/條列之下!?");
											pua.push({fld: nd.parentNode.nodeName, ch: str[n]});
										}
									}
									else if(nd.parentNode.nodeName == "段落")
										pua.push({fld: "段落'" + $(nd.parentNode).attr("段名") + "'", ch: str[n]});
									else if(nd.parentNode.nodeName == "條列")
										pua.push({fld: "條列'" + $(nd.parentNode).attr("序號") + "'", ch: str[n]});
									else
										pua.push({fld: nd.parentNode.nodeName, ch: str[n]});
									modifiedPUA = true;
								}
								else if(cc == 0x0080) {				// ASCII控制碼
									ascii.push("0x80");
									str = str.substr(0, n) + " " + str.substr(n + 1);// 取代為半形空白
									modifiedASCII = true;
								}
							}
							if(modifiedPUA || modifiedASCII) {
								if(modifiedPUA && modifiedASCII)
									// 1061205 Raymond 1060815 改為不以全形空白取代, 而是提示警告
									//theLogger.warn("<" + nd.parentNode.nodeName + ">內文有造字碼及ASCII控制碼, 以全形及半形空白取代");
									theLogger.warn("<" + nd.parentNode.nodeName + ">內文有造字碼及ASCII控制碼, ASCII以半形空白取代, 造字碼則提示警告");
								else if(modifiedPUA)
									// 1061205 Raymond 1060815 改為不以全形空白取代, 而是提示警告
									//theLogger.warn("<" + nd.parentNode.nodeName + ">內文有造字碼, 以全形空白取代");
									theLogger.warn("<" + nd.parentNode.nodeName + ">內文有造字碼, 記錄以提示警告");
								else
									theLogger.warn("<" + nd.parentNode.nodeName + ">內文有ASCII控制碼, 以半形空白取代");
								if("text" in nd)	// IE
									nd.text = str;
								else
									nd.textContent = str;
							}
							return modifiedPUA || modifiedASCII;
						}
						function doVerify(nd, ascii, pua) {
							if(nd.nodeType == 3) {	// TextNode
								return getInvalidChar(nd, ascii, pua);
							}
							else if(nd.nodeType == 1) {	// ElementNode
								// 1120323 Raymond 銓敘部序165 檢核新增的環境變數「WE_NO_CHECK_EUDC」若為"2", 則忽略檢核<承辦人>欄位的造字
								if(noCheckEUDC == "2" && nd.nodeName == "承辦人")
									return false;
								var hasInvalidChar = false;
								for(var m=0; m<nd.childNodes.length; m++) {
									if(doVerify(nd.childNodes[m], ascii, pua))
										hasInvalidChar = true;
								}
								return hasInvalidChar;
							}
							// pass verify other node types(attribute、comment...)
							return false;
						}
						return doVerify(xml.documentElement, ascii, pua);
					}
					
					var msg3 = [];
					for(var j=0; j<_cachedDM.length; j++) {
						// 1071212 Raymond 1071233 修正會辦待分辦公文若文稿有造字碼, 傳送或儲存時會導致轉圈圈問題
						//if(_cachedDM[j] !== undefined) {
						if(_cachedDM[j] !== undefined && _cachedDM[j].getEditable()) {
							
							var ascii = [],	// 檢出的ASCII控制碼
								pua = [];	// 檢出的造字碼
							if(verifyInvalidChar(_cachedDM[j].accquireXml(), ascii, pua)) {
								var str = _cachedDM[j].getDraftName() + ": 含有不合法的字元-- ";
								if(ascii.length > 0) {
									for(var k=0; k<ascii.length; k++) {
										if(k > 0)
											str += "、" + ascii[k];
										else
											str += ascii[k];
									}
									str += "已轉存為半形空白";
									if(pua.length > 0)
										str += ";";
								}
								if(pua.length > 0) {
									// 1061205 Raymond 1060815 改為不以全形空白取代, 而是提示警告
									for(var k=0; k<pua.length; k++) {
										if(k > 0)
											//str += "、" + pua[k];
											str += ("、" + pua[k].fld + ":" + pua[k].ch);
										else
											//str += pua[k];
											str += (pua[k].fld + ":" + pua[k].ch);
									}
									//str += "已轉存為全形空白";
								}
								msg3.push(str);
								_cachedDM[j].needRetransFO(true);	// 標記內文已異動需重新排版
							}
						}
					}
					if(msg3.length > 0) {
						msg2.push(msg3.join("\r\n"));
						$("#aol #leftPart .viewPort").find(".pages").flip("refresh");	// 重新整理頁面
					}
				}
				
				if(msg2.length > 0) {
					msg2.push("要繼續儲存嗎?");
					// 1100223 Raymond 1090864 繼續儲存後還要檢核客語難用字, 故改為不是直接return confirm()
					//return confirm(msg2.join("\r\n"));
					if(!confirm(msg2.join("\r\n")))
						return false;
				}
				// 1100223 Raymond 1090864 須檢核客語難用字
				if(shouldCheckDiffcultWords) {
					function checkDiffcultWords(xml, difficultWords) {	// 文稿內文若有客語難用字會回傳true, difficultWords參數會加入檢出的難字
						function getDifficultWords(nd, difficultWords) {	// 判斷客語難用字
							let hasDifficultWords = false;
							let str = ("text" in nd)?nd.text:nd.textContent;
							for(let k=0; k<_difficultWords.length; k++) {
								if(str.indexOf(_difficultWords[k]) >= 0) {
									difficultWords.push(_difficultWords[k]);
									hasDifficultWords = true;
								}
							}
							return hasDifficultWords;
						}
						function doCheck2(nd, difficultWords) {	// 1100312 Raymond 1090864 更名doCheck2以避免與外層的doCheck重名
							if(nd.nodeType == 3) {	// TextNode
								return getDifficultWords(nd, difficultWords);
							}
							else if(nd.nodeType == 1) {	// ElementNode
								let hasDifficultWords = false;
								for(let m=0; m<nd.childNodes.length; m++) {
									if(doCheck2(nd.childNodes[m], difficultWords))	// 1100312 Raymond 1090864 更名doCheck2以避免與外層的doCheck重名
										hasDifficultWords = true;
								}
								return hasDifficultWords;
							}
							// pass check other node types(attribute、comment...)
							return false;
						}
						return doCheck2(xml.documentElement, difficultWords);	// 1100312 Raymond 1090864 更名doCheck2以避免與外層的doCheck重名
					}
					var msg3 = "";
					for(var j=0; j<_cachedDM.length; j++) {
						if(_cachedDM[j] !== undefined && _cachedDM[j].getEditable()) {
							var difficultWords = [];	// 檢出的難字
							if(checkDiffcultWords(_cachedDM[j].accquireXml(), difficultWords)) {
								if(msg3.length > 0)
									msg3 += "、";
								else
									msg3 = "本份公文";	// 1100305 Raymond 1090864 Ying說客戶要求提示訊息的稿序前面要加這4個字
								msg3 += _cachedDM[j].getDraftName();
								theLogger.warn("#" + (j+1) + ":" + _cachedDM[j].getDraftName() + "含有'" + difficultWords.join("、") + "'等客語難用字");
							}
						}
					}
					if(msg3.length > 0) {
						// 1100312 Raymond 1090864 Ying說客戶要求再改提示訊息, 稿序也不用顯示了
						//msg3 += "內含有特殊字形，請將文稿另存成PDF檔，並夾帶於附件中一併發文。\r\n\r\n(按[確定]鈕繼續傳送, 或按[取消]鈕返回文稿編輯)";
						msg3 = "本文含客家(特殊)字體，如需電子發文，請於送發文後逕洽總發文索取正式發文公函(已用印)，並自行上傳為該函附件，再送發文單位完成電子交換作業。\r\n\r\n(按[確定]鈕繼續傳送，或按[取消]鈕返回文稿編輯)";
						if(!confirm(msg3))
							return false;
					}
				}
				// 1100322 Raymond 1090857 須檢核「摘要」欄不可為空
				if(shouldCheckDigest) {
					var msg3 = "";
					for(var j=0; j<_cachedDM.length; j++) {
						if(_cachedDM[j] !== undefined && _cachedDM[j].getEditable()) {
							var $field = $(_cachedDM[j].accquireXml().documentElement).find("摘要");	// 3.有「摘要」欄才檢核
							if($field.length) {
								var pgs = _cachedDM[j].getLayoutedPages();	// 以DraftMgmt.xml記錄的"分頁後總頁數"為主
								if(!pgs && _docObj.signType == "E")	// 若DraftMgmt.xml未記錄"分頁後總頁數", 線上簽核改以封裝檔或SignWork.xml的記錄為判斷依據
									pgs = that.getDraftPageCounts(j);
								else if(!pgs) {
									// TODO: 紙本未記錄"分頁後總頁數"
								}
								if($field.text() == "" && pgs > 1) {	// 4.稿件頁數2頁以上才檢核
									theLogger.warn("#" + (j+1) + ":" + _cachedDM[j].getDraftName() + "有" + pgs + "頁但「摘要」欄未設定");
									if(msg3.length > 0)
										msg3 += "、";
									msg3 += _cachedDM[j].getDraftName();
								}
							}
						}
					}
					if(msg3.length > 0) {
						msg3 += "未設定「摘要」，請修正後再" + argAction + "。";
						alert(msg3);
						return false;
					}
				}

				// 1110322 Raymond 1101416 傳送前檢查有異動過文稿時，將ODWMSG.IS_MODIFY設定為Y
				if(argAction == "傳送") {
					if(_docObj.signType == "P") {
						if(_currMgmt.isDraftListModified() || _currMgmt.isDraftContextModified()) {
							theLogger.log("紙本公文文稿清單或內文已異動, 設定(ODWMSG.IS_MODIFY)為Y");
							_docObj.set2("aol", "ODWMSG", {"IS_MODIFY": "Y"});
						}
					}
					else {
						if(!!_currMgmt && _currMgmt.isDraftListModified()) {
							theLogger.log("線上公文文稿清單已異動, 設定(ODWMSG.IS_MODIFY)為Y");
							_docObj.set2("aol", "ODWMSG", {"IS_MODIFY": "Y"});
						}
						else {
							var n = _signFolder.getDraftCounts();
							for(var i=0; i<n; i++) {
								var d = _signFolder.getDraft(i);
								if("dirty" in d && d.dirty()) {	// 無dirty方法的是來文文稿
									// 1141229 Raymond 1141693 新增判斷cachedDM.dirty(), 以避免因排版因素導致的簽核畫面頁數與封裝檔不一致時, 誤判為內文有異動的問題
									if(that.getCachedDM(d)?.dirty() == false) {	// 回傳的cdm為null時, 表示未下載, 未下載的DraftModel就標示dirty, 就表示不是因頁數差異造成的, 而是前次儲存就是dirty了
										theLogger.log("文稿(ID:" + d.id + ")未異動內容, 應是簽核頁面頁數與封裝檔記錄不一致導致的, 忽略此異動");
									}
									else {
									theLogger.log("線上公文文稿內文已異動, 設定(ODWMSG.IS_MODIFY)為Y");
									_docObj.set2("aol", "ODWMSG", {"IS_MODIFY": "Y"});
									}
								}
							}
						}
					}
				}
				
				// 1130202 Raymond 1120887 傳送前檢查資料夾+異動別是否符合環境變數「WE_ADD_CON_WHILE_TRANSPORT」設定
				if(argAction == "傳送") {
					let addConWhileTransport = theSSO.User.EnvSettings.get("WE_ADD_CON_WHILE_TRANSPORT");
					if(addConWhileTransport.length > 0) {
						let s = addConWhileTransport.split("|");
						// 1141216 Raymond 1141632 擴充環境變數為3個, 第3個設為'Y'時, 若公文內無任何簽稿會核單則自動新增一筆簽稿會核單
						//if(s.length == 2) {
						if(s.length >= 2) {
							let fs = s[0].split(";");
							let ct = s[1].split(";");
							let thisFolder = _docObj.folder + "-" + _docObj.subfolder;
							if(fs.indexOf(thisFolder) >= 0 && ct.indexOf(_docObj.txName) >= 0) {
								theLogger.log("公文資料夾'" + thisFolder + "'及異動別'" + _docObj.txName + "'符合環境變數「WE_ADD_CON_WHILE_TRANSPORT」'" + addConWhileTransport + "'設定, 應檢核傳送對象是否存在於最新簽稿會核單之會稿單位清單內");
								// 搜尋最後新增的簽稿會核單
								let msg4 = "", ccSN = -1, lastCon = -1;
								for(let j=0; j<_cachedDM.length; j++) {
									if(_cachedDM[j] !== undefined && _cachedDM[j].getDocType() == "簽稿會核單") {
										if(_cachedDM[j].getCreateSN() > ccSN) {
											lastCon = j;
											ccSN = _cachedDM[j].getCreateSN();
										}
									}
								}
								if(lastCon >= 0) {
									let xmlDoc = _cachedDM[lastCon].accquireXml(), toOUExist = false;
									let snapshot = xmlDoc.evaluate("/簽稿會核單/會稿單位列表/單位", xmlDoc, null, 7, null);
									if(snapshot.snapshotLength > 0) {
										for(let j=0; j<snapshot.snapshotLength; j++) {
											if(snapshot.snapshotItem(j).textContent == _docObj.toOUName) {	// 已存在則不需要自動新增這個會稿單位
												toOUExist = true;
												break;
											}
										}
									}
									if(!toOUExist) {
										if(_cachedDM[lastCon].getEditable()) {
											snapshot = xmlDoc.evaluate("/簽稿會核單/會稿單位列表", xmlDoc, null, 7, null);
											if(snapshot.snapshotLength > 0) {
												theLogger.log("新增'" + _docObj.toOUName + "'(代碼:'" + _docObj.toOUId + "', type:'" + _docObj.txName + "')之會稿單位");
												let u = xmlDoc.createElement("單位");
												u.setAttribute("代碼", _docObj.toOUId);
												u.setAttribute("type", _docObj.txName);
												u.textContent = _docObj.toOUName;
												snapshot.snapshotItem(0).appendChild(u);
												_cachedDM[lastCon].needRetransFO(true);
												
												// 再新增對應的會辦意見
												let $conCmtList = $(xmlDoc.documentElement).find("會辦意見列表");
												if($conCmtList.length) {
													let defSAHeight = $conCmtList.attr("預設簽核區域高度");
													let defCmdText = $conCmtList.find("預設意見文字").get(0).innerHTML;
													theLogger.log("新增代碼'" + _docObj.toOUId + "'之會辦意見");
													let newConCmt = xmlDoc.createElement("會辦意見");
													newConCmt.setAttribute("代碼", _docObj.toOUId);
													newConCmt.setAttribute("簽核區域排版高度", defSAHeight);
													$(newConCmt).html(defCmdText);
													$conCmtList.append(newConCmt);
													console.error(_cachedDM[lastCon].accquireXml());
													_cachedDM[lastCon].getInternalFO().done(function(fo) {
														_cachedDM[lastCon].signAreas = [];
														theLayoutEng.instanciateSOPages(fo, $("#pgBackBuffer"), {}, 0, _docObj, _cachedDM[lastCon], false).done(function() {
															theLogger.warn("updated signAreas:", _cachedDM[lastCon].signAreas);
														});
													});
												}
												else {
													theLogger.error("'" + _cachedDM[lastCon].getDraftName() + "'找不到'會辦意見列表'節點, 無法新增對應此傳送對象的'會辦意見'!");
													msg4 = "'" + _cachedDM[lastCon].getDraftName() + "'找不到'會辦意見列表'節點, 無法新增對應此傳送對象的'會辦意見'!";
												}
											}
											else {
												theLogger.error("'" + _cachedDM[lastCon].getDraftName() + "'找不到'會稿單位列表'節點, 無法自動新增傳送對象為會稿單位!");
												msg4 = "'" + _cachedDM[lastCon].getDraftName() + "'找不到'會稿單位列表'節點, 無法自動新增傳送對象為會稿單位!";
											}
										}
										else {
											theLogger.warn("'" + _cachedDM[lastCon].getDraftName() + "'的會稿單位列表中找不到'" + _docObj.toOUName + "', 但文稿為不可異動內文狀態, 無法自動新增傳送對象為會稿單位!");
											msg4 = "'" + _cachedDM[lastCon].getDraftName() + "'的會稿單位列表中找不到'" + _docObj.toOUName + "', 但文稿為不可異動內文狀態, 無法自動新增傳送對應為會稿單位!";
										}
									}
								}
								// 1141216 Raymond 1141632 在doCheck前的自動新增簽稿會核單有失敗情況時, 檢核不通過
								else if(autoGenConErr.length) {
									msg4 = autoGenConErr;
								}
								if(msg4.length > 0) {
									msg4 += "\r\n\r\n(按[確定]鈕繼續傳送，或按[取消]鈕返回文稿編輯)";
									if(!confirm(msg4))
										return false;
								}
							}
						}
					}
				}
				
				return true;	// 1081230 Raymond 1080194 檢核都通過回傳true
			}

			// 2020.1.10 - 1080701 Eric, make xml content for ODMSSP.checkDraftLastUpdate
			function getCheckDraftLastUpdateXMLStr(theDocObj) {
				var xmlDoc = document.implementation.createDocument('', 'Root', null);
				var elemInfo = xmlDoc.createElement('INFO');
				var elemProg = xmlDoc.createElement('LAST_UPDATE_PROG');
				var txtElem = xmlDoc.createTextNode(theDocObj.get('ODWDCM', 'LAST_UPDATE_PROG'));
				elemProg.appendChild(txtElem);
				elemInfo.appendChild(elemProg);
				var elemTime = xmlDoc.createElement('LAST_UPDATE_TIME');
				txtElem = xmlDoc.createTextNode(theDocObj.get('ODWDCM', 'LAST_UPDATE_TIME'));
				elemTime.appendChild(txtElem);
				elemInfo.appendChild(elemTime);

				var _serializer = new XMLSerializer();
				return _serializer.serializeToString(elemInfo);
			}
			
			// 1140422	Leslie[1131282]	[退輔會]增修草稿依設定是否啟用自動要號功能
			if(theCustom.getCustomSet('DraftAutoReqDocNo') && argAction == "傳送" && _docObj.docNo.length == 0) {
				that.reqDocNo()
				.done(procLast)
				.fail(function(errorText) {
					dfd.resolve(false);
				});
			}
			else
				procLast();
			
			function procLast() {	// 本來執行的步驟包成一個function, 供非同步的自動要號後執行
				// 1081230 Raymond 1080194 配合fnWebEditSave改為非同步呼叫, saveView也改為非同步
				//return res;
				$.when.apply(this, dfds).done(function() {
					//1140425	Leslie[1131297]	[退輔會]紀錄可發文稿件數及對應稿件受文者發文類型數量
					if(detectSendWay){
						_docObj.set("aol", "ODWDCM", [{fieldname:"RECEIVE_P", value:swP}]);
						_docObj.set("aol", "ODWDCM", [{fieldname:"RECEIVE_E", value:swE}]);
						_docObj.set("aol", "ODWDCM", [{fieldname:"ISSUE_DRAFT_CNT", value:swDraftCnt}]);
					}
					if(!res) {
						theLogger.error("fnODC010Save()回傳false, 禁止儲存!");	// 2016.9.26 依匯整表序317取消alert訊息
						dfd.resolve(false);
					}
					else {
						// 2020.1.10 - 1080701 Eric, 叫用ODMSSP.checkDraftLastUpdate()確認無誤再儲存!
						let checkRslt = doCheck();
						// 1130809 Raymond 1130313 合併1111007, 離線模式不呼叫ODMSSP.CheckDraftLastUpdate
						//if (checkRslt===true && theSSO.MP.todolist.builder.isDraftMsg(_docObj)) {
						if (checkRslt===true && theSSO.MP.todolist.builder.isDraftMsg(_docObj) && !theSSO.offlineMode) {
							let _orgNo = _docObj.sourceOrgNo;
							let _draftMsgId = _docObj.msgId;
							let _userId = _docObj.ownUserId;
							let _xmlStr = getCheckDraftLastUpdateXMLStr(_docObj);
							theWebServices.odmssp.checkDraftLastUpdate(localStorage.Artifact, _orgNo, _draftMsgId, _userId, _xmlStr)
							.then(function(rslt) {
								// { success: true, valid: false, msg: rslt.m_strErrMsg }
								theLogger.log('-I- saveView() done! invoke ODMSSP.checkDraftLastUpdate() rslt={succes:' + rslt.success + ', valid:' + rslt.valid +'}');
								if (typeof rslt.success=='boolean' && rslt.success===true) {
									if (typeof rslt.valid=='boolean' && rslt.valid===true) {
										// 1120809 Raymond 1120503 新增儲存動作
										if(!!argAction)
											_saveAction = argAction;
										dfd.resolve(true);
									}
									else {
										// 叫用checkDraftLastUpdate成功, 但檢核失敗, show err msg
										if (typeof rslt.msg=='string' && rslt.msg.length) {
											alert(rslt.msg);
										}	
										else {
											alert("叫用ODMSSP.CheckDraftLastUpdate()回傳不能儲存, 但未提供錯誤原因!\r\n[docNo=" + _docObj.docNo + ", msgId=" + _docObj.msgId + "]");
										}
										dfd.resolve(false);
									}
								}
								else { 
									// 叫用checkDraftLastUpdate失敗, show err msg
									alert("叫用ODMSSP.CheckDraftLastUpdate()發生錯誤!\r\n[rslt.success!==true, docNo=" + _docObj.docNo + ", msgId=" + _docObj.msgId + "]");
									dfd.resolve(false);
								}
							})
							.fail(function(errRslt) {
								alert("叫用ODMSSP.CheckDraftLastUpdate()發生錯誤!\r\n[invoke function failed, docNo=" + _docObj.docNo + ", msgId=" + _docObj.msgId + "]");
								dfd.resolve(false);
							});
						}
						else {
							// 1120809 Raymond 1120503 新增儲存動作
							if(checkRslt && !!argAction)
								_saveAction = argAction;
							dfd.resolve(checkRslt);
						}
					}
				})
				// 1141216 Raymond 1141632 自動新增簽稿會核單失敗時, 顯示錯誤訊息並reject
				.fail(function(errText) {
					alert(errText);
					dfd.reject(errText);
				});
			}	// 1140422	Leslie[1131282]	[退輔會]增修草稿依設定是否啟用自動要號功能 end of function procLast() {
			return dfd.promise();
		},
		// 1090804 Raymond 1090409 新增draftPrintXSL參數, 由DraftMgmt.js傳入文稿管理檔所記錄稿的樣版檔路徑
		// 2014.10.22 - Raymond, 取得文稿原本匯出頁面所使用的PrintXSL全徑名, index指封裝檔中的序
		// 2015.1.22 - Raymond, 由於文稿管理檔中的文稿順序與封裝檔中文稿的順序可能不一致, 需改用GUID查找
		//getDraftOrigPrintXSL: function(guid) {
		//	return _getMappedDraftPrintXSL(guid);
		getDraftOrigPrintXSL: function(guid, draftPrintXSL) {
			return _getMappedDraftPrintXSL(guid, draftPrintXSL);
		},
		
		// 2014.10.22 - Raymond, 設定文稿目前套用的PrintXSL全徑名
		// 2016.8.1 - 新增printXSLType參數
		setDraftApplyPrintXSL: function(guid, path, printXSLType) {
			if(_docObj.signType == "P") {	// 2016.6.22 支援紙本簽核
				theLogger.warn("紙本簽核忽略設定套用PrintXSL");
				return;
			}
			_setMappedDraftApplyPrintXSL(guid, path, printXSLType);
		},
		
		getAllDraftText: function(xpath) {
			theLogger.log("非同步取得所有文稿之'" + xpath + "'文字...");
			var dfd = $.Deferred();
			var res = [];
			if(_docObj.signType == "P") {	// 2016.8.5 新增支援紙本簽核
				var n = _currMgmt.getDraftCounts();
				var i = 0;
				var that = this;
				function doAccqP() {	// 2016.9.14 FIX, 同一scope(function)中的subfunction不可同名, 否則在Safari等瀏覽器會指向最後一個subfunction
					res.push({name: _currMgmt.getDraftName(i)});
					that.accquireDraftModel(i)
						.done(function(dm) {
							try {
								res[res.length-1].text = dm.text(xpath);
								theLogger.log(i + ": '" + res[res.length-1].text + "'");
							}
							catch(e) {
								theLogger.warn(i + ":Exception! " + e.message + " - " + e.sourceURL + ":" + e.line);
								res[res.length-1].text = "";
								res[res.length-1].errorText = e.message;
							}
							if(++i < n)
								doAccqP();	// 2016.9.14 FIX, 同一scope(function)中的subfunction不可同名, 否則在Safari等瀏覽器會指向最後一個subfunction
							else
								dfd.resolve(res);
						})
						.fail(function(errorText) {
							theLogger.error(i + ":失敗! " + errorText);
							res[res.length-1].text = "";
							res[res.length-1].errorText = errorText;
							if(++i < n)
								doAccqP();	// 2016.9.14 FIX, 同一scope(function)中的subfunction不可同名, 否則在Safari等瀏覽器會指向最後一個subfunction
							else
								dfd.resolve(res);
						});
				}
				if(n > 0)
					doAccqP();	// 2016.9.14 FIX, 同一scope(function)中的subfunction不可同名, 否則在Safari等瀏覽器會指向最後一個subfunction
				else
					dfd.resolve(res);
			}
			else {	// 線上簽核
				// 1071126 Raymond 同步所有稿件要排除來文
				//var n = _signFolder.getDraftCounts();
				var n = _signFolder.getDraftCounts() - (_signFolder.hasFromDoc()?1:0);
				var i = 0;
				var that = this;
				function doAccqE() {	// 2016.9.14 FIX, 同一scope(function)中的subfunction不可同名, 否則在Safari等瀏覽器會指向最後一個subfunction
					res.push({name: _getMappedDraftName(i)});
					that.accquireDraftModel(i)
						.done(function(dm) {
							if(dm) {	// 2016.8.23 無dm(來文)則不搜尋xpath
								try {
									res[res.length-1].text = dm.text(xpath);
									theLogger.log(i + ": '" + res[res.length-1].text + "'");
								}
								catch(e) {
									theLogger.warn(i + ":Exception! " + e.message + " - " + e.sourceURL + ":" + e.line);
									res[res.length-1].text = "";
									res[res.length-1].errorText = e.message;
								}
							}
							else {	// 2016.8.24 FIX, 來文項目要從res中刪掉
								theLogger.log(i + ": 刪除無DraftModel的'" + res[res.length-1].name + "'");
								res.splice(res.length-1, 1);
							}
							if(++i < n)
								doAccqE();	// 2016.9.14 FIX, 同一scope(function)中的subfunction不可同名, 否則在Safari等瀏覽器會指向最後一個subfunction
							else
								dfd.resolve(res);
						})
						.fail(function(errorText) {
							theLogger.error(i + ":失敗! " + errorText);
							res[res.length-1].text = "";
							res[res.length-1].errorText = errorText;
							if(++i < n)
								doAccqE();	// 2016.9.14 FIX, 同一scope(function)中的subfunction不可同名, 否則在Safari等瀏覽器會指向最後一個subfunction
							else
								dfd.resolve(res);
						});
				}
				if(n > 0)
					doAccqE();	// 2016.9.14 FIX, 同一scope(function)中的subfunction不可同名, 否則在Safari等瀏覽器會指向最後一個subfunction
				else
					dfd.resolve(res);
			}
			return dfd.promise();
		},
		
		setAllDraftText: function(xpath, val) {
			theLogger.log("非同步設定所有文稿之'" + xpath + "'文字為'" + val + "'...");
			var dfd = $.Deferred();
			var res = [];
			if(_docObj.signType == "P") {	// 2016.8.5 新增支援紙本簽核
				var n = _currMgmt.getDraftCounts();
				var i = 0;
				var that = this;
				function doAccqP() {
					res.push({name: _currMgmt.getDraftName(i)});
					that.accquireDraftModel(i)
						.done(function(dm) {
							theLogger.log(i + ": '" + xpath + "'設為'" + val + "'");
							try {
								// 1080114 Raymond 1080024 是否有異動內文改存另一欄位
								//res[res.length-1].success = dm.text(xpath, val);
								res[res.length-1].success = true;
								res[res.length-1].modified = dm.text(xpath, val);
							}
							catch(e) {
								theLogger.warn(i + ":Exception! " + e.message + " - " + e.sourceURL + ":" + e.line);
								res[res.length-1].success = false;
								res[res.length-1].errorText = e.message;
							}
							if(++i < n)
								doAccqP();
							else
								dfd.resolve(res);
						})
						.fail(function(errorText) {
							theLogger.error(i + ":失敗! " + errorText);
							res[res.length-1].success = false;
							res[res.length-1].errorText = errorText;
							if(++i < n)
								doAccqP();
							else
								dfd.resolve(res);
						});
				}
				if(n > 0)
					doAccqP();
				else
					dfd.resolve(res);
			}
			else {	// 線上簽核
				// 1071126 Raymond 同步所有稿件要排除來文
				//var n = _signFolder.getDraftCounts();
				var n = _signFolder.getDraftCounts() - (_signFolder.hasFromDoc()?1:0);
				var i = 0;
				var that = this;
				function doAccqE() {
					res.push({name: _getMappedDraftName(i)});
					that.accquireDraftModel(i)
						.done(function(dm) {
							theLogger.log(i + ": '" + xpath + "'設為'" + val + "'");
							try {
								// 1080114 Raymond 1080024 是否有異動內文改存另一欄位
								//res[res.length-1].success = dm.text(xpath, val);
								res[res.length-1].success = true;
								res[res.length-1].modified = dm.text(xpath, val);
							}
							catch(e) {
								theLogger.warn(i + ":Exception! " + e.message + " - " + e.sourceURL + ":" + e.line);
								res[res.length-1].success = false;
								res[res.length-1].errorText = e.message;
							}
							if(++i < n)
								doAccqE();
							else
								dfd.resolve(res);
						})
						.fail(function(errorText) {
							theLogger.error(i + ":失敗! " + errorText);
							res[res.length-1].success = false;
							res[res.length-1].errorText = errorText;
							if(++i < n)
								doAccqE();
							else
								dfd.resolve(res);
						});
				}
				if(n > 0)
					doAccqE();
				else
					dfd.resolve(res);
			}
			return dfd.promise();
		},
		
		getChangedDraftOrAttachIDs: function() {
			theLogger.log("取得已異動簽核物件的文稿或來文...");
			var res = [];
			_signFolder.enumAllPages(function(pg) {
				// 新增的簽核物件
				if("newSignObjs" in pg) {
					for(var j=0; j<pg.newSignObjs.length; j++) {
						var newSO = pg.newSignObjs[j];
						//if(newSO.sessionNew) {	// 已異動物件
							theLogger.log(newSO);
							if("boundTo" in newSO) {
								if("container" in newSO.boundTo) {
									if("id" in newSO.boundTo.container)
										res.push(newSO.boundTo.container.id);
									else {	// 來文無'文件夾識別碼', 判斷是否是來文若是的話直接回傳'來文內容'
										if("fromType" in newSO.boundTo.container)
											res.push("來文內容");
										else
											theLogger.error("簽核物件所屬的文稿無'文件夾識別碼'資訊");
									}
								}
								else
									theLogger.error("簽核物件所屬的頁面無文稿或來文物件");
							}
							else
								theLogger.error("簽核物件無頁面物件");
						//}
					}
				}
			});
			return res;
		},
		
		getCurrDraftModel: function() {	// 2016.8.15 取得目前檢視中的文稿
			if(_views.length > 0) {
				var idx = _views[0].currDraftIndex();
				theLogger.log("取得目前檢視中的文稿(index:" + idx + ")");
				if(idx >= 0)
					return _cachedDM[idx];
			}
			return null;	// 基資或無文稿回傳null
		},
		// 1100706 Raymond 1100648 取得目前檢視中的文稿資訊, 提供分文稿記錄簽核意見功能
		getCurrDraftInfo: function() {
			if(_views.length > 0) {
				var idx = _views[0].currDraftIndex();
				theLogger.log("取得目前檢視中的文稿資訊(index:" + idx + ")");
				if(idx >= 0)
					return _signFolder.getDraft(idx);
			}
			return null;	// 基資或無文稿回傳null
		},
		
		getFolder: function() {	// 2016.8.26 for DraftMgmt過濾'主辦'-'待分辦'沒有文稿管理檔視為正常情況的判定
			return _docObj.folder;
		},
		getSubFolder: function() {
			return _docObj.subfolder;
		},
		isFirstSign: function() {	// 2016.8.31 新增查詢是否為首次簽辦
			if(_docObj.signType == "P") {
				theLogger.error("紙本簽核不會載入封裝檔, 無從判定是否為首次簽辦");
				throw new Exception("紙本簽核不會載入封裝檔, 無從判定是否為首次簽辦");
			}
			return _isFirstSign;
		},
		isContentChanged: function() {	// 2016.8.31 新增查詢是否有內文異動或新增簽核物件
			var dty = false;
			if(_docObj.signType == "P") {	// 紙本簽核
				for(var d in _cachedDM) {
					if(_cachedDM[d].dirty()) {
						theLogger.log("'" + _cachedDM[d].getDraftName() + "'已異動");
						dty = true;
						break;
					}
				}
			}
			else {	// 線上簽核
				// 1090730 Raymond 1090409 修正多稿時第1稿不異動, 異動其它稿件, 儲存關閉再開啟後, 不翻頁至其它稿件就會誤判為文稿未異動的問題
				//for(var i=0; i<_signFolder.getDraftCounts(); i++) {
				//	if(_cachedDM[i] !== undefined) {    // _cachedDM所記錄的文稿是固定順序, 非push
				//		if(_cachedDM[i].dirty()) {      // 有開啟的文稿才有機會異動?
				//			theLogger.log("'" + _cachedDM[i].getDraftName() + "'已異動");
				//			dty = true;
				//			break;
				//		}
				//	}
				//}
				var n = _signFolder.getDraftCounts() - (_signFolder.hasFromDoc()?1:0);	// 排除來文
				for(var i=0; i<n; i++) {
					var d = _signFolder.getDraft(i);
					if(!!d) {
						if(d.dirty()) {
							// 1141230 Raymond 1141693 新增判斷cachedDM.dirty(), 以避免因排版因素導致的簽核畫面頁數與封裝檔不一致時, 誤判為內文有異動的問題
							if(this.getCachedDM(d)?.dirty() == false) {	// 回傳的cdm為null時, 表示未下載, 未下載的DraftModel就標示dirty, 就表示不是因頁數差異造成的, 而是前次儲存就是dirty了
								theLogger.log("文稿'" + d.name + "'(ID:" + d.id + ")未異動內容, 應是簽核頁面頁數與封裝檔記錄不一致導致的, 忽略此異動");
							}
							else {
							theLogger.log("'" + d.name + "'已異動");
							dty = true;
							break;
							}
						}
					}
				}
				if(!dty) {
					var brk = false;
					_signFolder.enumAllPages(function(pg) {
						// 新增的簽核物件
						if("newSignObjs" in pg) {
							for(var j=0; j<pg.newSignObjs.length; j++) {
								//var newSO = pg.newSignObjs[j];
								//if(newSO.sessionNew) {
									theLogger.log("(PageID:" + pg.id + ")有加入簽核物件");
									dty = true;
									brk = true;
									break;
								//}
							}
						}
						if(brk)
							return false;	// break enumAllPages
					});
				}
				// 1150106 Raymond 1140971 新增檢核是否有加註簽辦意見, 有則視為有異動, 需要更新封裝檔
				if(!dty) {
					if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
						var mrgcmt = "";
						var n = _signFolder.getDraftCounts() - (_signFolder.hasFromDoc()?1:0);
						for(var i=0; i<n; i++) {
							var d = _signFolder.getDraft(i);
							if(!!d.newSignComment) {
								theLogger.log("文稿無異動, 且無加蓋簽核物件, 但有加註文稿(" + d.name + ")簽辦意見, 視為有異動需更新封裝檔");
								dty = true;
								break;
							}
						}
					}
					else if(!!_signFolder.currSignComment()) {
						theLogger.log("文稿無異動, 且無加蓋簽核物件, 但有加註簽辦意見, 視為有異動需更新封裝檔");
						dty = true;
					}
				}
			}
			return dty;
		},
		isApplyConUnitDraft: function(dm) {
			var docTypes = ['簽稿會核單', '簽', '函'];
			var envSettings = theSSO.User.EnvSettings.get("AOL_PARSE_COWORK_DRAFT_TYPE");
			if(envSettings.length > 0) {
				docTypes = envSettings.split(";");	// 環境變數以分號區隔
				theLogger.log(docTypes);
			}
			var shouldApplyConUnitDraft = null;	// 目前公文夾應套用會辦單位到預排流程的文稿
			if(_docObj.signType == "P") {	// 紙本簽核
				// 1060628 Raymond 1060465 改用文稿清單比對文別, 不要用已開啟文稿判定
				var n = _currMgmt.getDraftCounts();
				for(var i=0; i<n; i++) {
					var dt = _currMgmt.getDraftDocType(i);
					var pri = docTypes.indexOf(dt);
					if(pri >= 0) {
						theLogger.log("'" + _currMgmt.getDraftName(i) + "'的會辦單位設定可套用到預排流程, 優先序:" + pri);
						if(!shouldApplyConUnitDraft || shouldApplyConUnitDraft.pri > pri)	// 未設定或己設定之優先序在目前文別後則以目前文稿取代
							shouldApplyConUnitDraft = {dt: dt, pri: pri};	// 改用文別記錄, 以免有相同文別存在時, 只會判定第1個該優先文別的文稿才允許同步到WWKF的問題
					}
				}
				//for(var d in _cachedDM) {
				//	var dt = _cachedDM[d].getDocType();
				//	var pri = docTypes.indexOf(dt);
				//	if(pri >= 0) {
				//		theLogger.log("'" + _cachedDM[d].getDraftName() + "'的會辦單位設定可套用到預排流程, 優先序:" + pri);
				//		if(!shouldApplyConUnitDraft || shouldApplyConUnitDraft.pri > pri)	// 未設定或己設定之優先序在目前文別後則以目前文稿取代
				//			shouldApplyConUnitDraft = {dm: _cachedDM[d], pri: pri};
				//	}
				//}
			}
			else {	// 線上簽核
				for(var i=0; i<_signFolder.getDraftCounts(); i++) {
					// 1060628 Raymond 1060465 改用文稿清單比對文別, 不要用已開啟文稿判定
					var d = _signFolder.getDraft(i);
					var dt = d.docType;
					var pri = docTypes.indexOf(dt);
					if(pri >= 0) {
						theLogger.log("'" + d.name + "'的會辦單位設定可套用到預排流程, 優先序:" + pri);
						if(!shouldApplyConUnitDraft || shouldApplyConUnitDraft.pri > pri)	// 未設定或己設定之優先序在目前文別後則以目前文稿取代
							shouldApplyConUnitDraft = {dt: dt, pri: pri};	// 改用文別記錄, 以免有相同文別存在時, 只會判定第1個該優先文別的文稿才允許同步到WWKF的問題
					}
					//if(_cachedDM[i] !== undefined) {    // _cachedDM所記錄的文稿是固定順序, 非push
					//	var dt = _cachedDM[i].getDocType();
					//	var pri = docTypes.indexOf(dt);
					//	if(pri >= 0) {
					//		theLogger.log("'" + _cachedDM[i].getDraftName() + "'的會辦單位設定可套用到預排流程, 優先序:" + pri);
					//		if(!shouldApplyConUnitDraft || shouldApplyConUnitDraft.pri > pri)	// 未設定或己設定之優先序在目前文別後則以目前文稿取代
					//			shouldApplyConUnitDraft = {dm: _cachedDM[i], pri: pri};
					//	}
					//}
				}
			}
			if(shouldApplyConUnitDraft) {
				// 1081210 Raymond 1080786 合併內政部單號1070657, 新增判斷傳入dm參數是否為字串(文別), newDraft在新增文稿後會接著判斷是否應同步更新預排流程, 此時dm還未產生
				if(SSOUtil.typeOf(dm) == "string") {
					if(shouldApplyConUnitDraft.dt == dm) {
						theLogger.log("此文稿之文別(" + dm + ")符合優先套用會辦單位設定到預排流程之文別(" + shouldApplyConUnitDraft.dt + ")");
						return true;
					}
					else
						theLogger.log("此文稿之文別(" + dm + ")不符合優先套用會辦單位設定到預排流程之文別(" + shouldApplyConUnitDraft.dt + ")");
				}
				else
				// 1060628 Raymond 1060465 改用文別判定是否為優先套用會辦單位的文稿, 以免同時有2個以上優先文別的文稿時(EX:2個簽稿會核單), 只有第1個文稿才符合應套用會辦單位邏輯, 第2個文稿異動時不會套用會辦單位到WWKF的問題
				if(shouldApplyConUnitDraft.dt == dm.getDocType()) {
					theLogger.log("此文稿'" + dm.getDraftName() + "'之文別(" + dm.getDocType() + ")符合優先套用會辦單位設定到預排流程之文別(" + shouldApplyConUnitDraft.dt + ")");
					return true;
				}
				else
					theLogger.log("此文稿'" + dm.getDraftName() + "'之文別(" + dm.getDocType() + ")不符合優先套用會辦單位設定到預排流程之文別(" + shouldApplyConUnitDraft.dt + ")");
				//theLogger.log("應套用會辦單位設定到預排流程的文稿是'" + shouldApplyConUnitDraft.dm.getDraftName() + "'(" + shouldApplyConUnitDraft.dm.getDocType() + ")");
				//return shouldApplyConUnitDraft.dm == dm;	// 回傳應套用會辦單位的文稿是否為參數所指定文稿
			}
			return false;
		},
		calcQuantity: function() {	// 2016.9.5 計算數量
			if(_docObj.signType == "E") {
				return String(_signFolder.calcQuantity());	// 2016.9.8 回傳值改成字串, 因為設定ODWDCM/ODWMSG欄位值只能用字串
			}
			else {
				if(_currMgmt)
					return String(_currMgmt.calcQuantity());	// 2016.9.8 回傳值改成字串, 因為設定ODWDCM/ODWMSG欄位值只能用字串
			}
			return "0";	// 2016.9.8 回傳值改成字串, 因為設定ODWDCM/ODWMSG欄位值只能用字串
		},
		// 2016.9.20 新增自動備份功能
		applyAutoBackup: function(setting) {
			this.autoBackupSetting = setting;
			if(setting.period < 5 || setting.period > 30) {
				theLogger.warn("指定自動備份時間間隔(" + setting.period + ")超出範圍!(5~30)");
				if("autoBackupDefaultSetting" in SSO_CONFIG && SSO_CONFIG.autoBackupDefaultSetting.length > 0) {
					var par = SSO_CONFIG.autoBackupDefaultSetting.split("|");
					theLogger.log("恢復為預設值的時間間隔:" + par[1]);
					this.autoBackupSetting.period = parseInt(par[1]);
				}
				else {
					theLogger.log("恢復為預設值的5分鐘");
					this.autoBackupSetting.period = 5;
				}
			}
			
			// 1121003 Raymond 1120775 新增取得uiState, 用於判斷是否有隱藏傳送工具列, 若有隱藏傳送工具列(buttonF沒有"T"), 即使MenuRule有設定非唯讀且可編輯內文, 也不要用自動備份
			var uiState = window._getUIStatus(_docObj, _docObj.uiParam);
			// 1090910 Raymond 1090564 信保特殊模式不啟用自動備份
			if(_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
				theLogger.log("信保特殊模式公文不啟用自動備份");
			}
			else if(uiState.hiddenSubmitPanel == true) {	// 1121003 Raymond 1120775 新增判斷是否有隱藏傳送工具列, 若有隱藏傳送工具列(buttonF沒有"T"), 即使MenuRule有設定非唯讀且可編輯內文, 也不要用自動備份
				theLogger.log("隱藏傳送工具列(BUTTON_F沒有'T')時不啟用自動備份");
			}
			else
			if((!this.readOnly() || this.enableEdit()) && !this.disableSave()) {
				if(this.autoBackupTimer != undefined) {
					theLogger.log("停止前一次自動備份計時器");
					clearInterval(this.autoBackupTimer);
					this.autoBackupTimer = undefined;
				}
				
				if(this.autoBackupSetting.enable) {
					theLogger.log("啟用自動備份...");
					if(typeof this.autoBackupSetting.period === "number") {
						theLogger.log("設置自動備份計時器(" + this.autoBackupSetting.period + "分鐘)");
						var that = this;
						this.autoBackupTimer = setInterval(function() {that.backup();}, this.autoBackupSetting.period * 60000);
						// 1130606	Leslie[1130077]	[併1130078]當系統於當前文稿觸發自動備份後，若使用者操作增/刪文稿、附件(連動影響封裝內容)時，則主動觸發一次自動備份
						_backuped = false;
					}
					else
						theLogger.error("自動備份時間間隔參數類型錯誤!");
				}
				else
					theLogger.log("停用自動備份");
			}
			else
				theLogger.log("唯讀或禁止編輯/儲存的公文不可套用自動備份");
		},
		// 2016.9.20 新增自動備份功能
		backup: function() {
			var that = this;
			var dfd = $.Deferred();
			if(theAOL.getCurrFolio() != this) {
				theLogger.warn("目前公文非此公文, 正常應經由close()函式停止計時器, 不應觸發backup(), 中止自動備份");
				dfd.reject("目前公文非此公文, 正常應經由close()函式停止計時器, 不應觸發backup(), 中止自動備份");
				return dfd.promise();
			}
			else if((this.readOnly() && !this.enableEdit()) || this.disableSave()) {
				theLogger.log("唯讀並禁止編輯/儲存的公文停用自動備份");
				dfd.reject("唯讀並禁止編輯/儲存的公文停用自動備份");
				return dfd.promise();
			}
			var i = 0, deferreds = new Array();		// 並聯處理不固定數量Deferred物件的方法
			var preceed = new Array();				// 先置處理(下載調整順序前的附件電子檔)
			if(!("autoBackupIOWS" in SSO_CONFIG) || typeof SSO_CONFIG.autoBackupIOWS !== "string" || SSO_CONFIG.autoBackupIOWS.length == 0) {
				theLogger.error("SSO_CONFIG未設定自動備份伺服器的WebFileIO網址");
				dfd.reject("SSO_CONFIG未設定自動備份伺服器的WebFileIO網址");
				return dfd.promise();
			}
			//1080117	Joe		1080049		弱掃修正Hardcoded Absolute Path
			// if(!("autoBackupRootPath" in SSO_CONFIG) || typeof SSO_CONFIG.autoBackupRootPath !== "string" || SSO_CONFIG.autoBackupRootPath.length == 0) {
			if(typeof theSSO.User.SystemSets.get("WORK_PATH") !== "string" || theSSO.User.SystemSets.get("WORK_PATH").length == 0) {
				theLogger.error("SSO_CONFIG未設定自動備份伺服器的儲存根目錄路徑");
				dfd.reject("SSO_CONFIG未設定自動備份伺服器的儲存根目錄路徑");
				return dfd.promise();
			}
			if(!(!!theUserInfo && "UserID" in theUserInfo && theUserInfo.UserID.length > 0)) {	// 2016.12.22 自動備份子目錄改為theUserInfo.UserID
				theLogger.error("無theUserInfo或無UserID, 無法自動備份");
				dfd.reject("無theUserInfo或無UserID, 無法自動備份");
				return dfd.promise();
			}
			
			//1060905	Leslie[1060453]		鐵工局客製化需求，密件公文不備份
			if(theAOL.docObj.secret > '1' && theSSO.User.SystemSets.get('RRB_ENABLE_SCRECT_DOC_LOGIC') == 'Y'){
				theLogger.error("鐵工局客製化檢核，密件不提供自動備份");
				dfd.reject("鐵工局客製化檢核，密件不提供自動備份");
				return dfd.promise();
			}
			
			var wfio = new WebFileIO(SSO_CONFIG.autoBackupIOWS);
			
			//1080117	Joe		1080049		弱掃修正Hardcoded Absolute Path
			// var dirPath = SSO_CONFIG.autoBackupRootPath;
			var dirPath = theSSO.User.SystemSets.get("WORK_PATH");
			if(dirPath[dirPath.length - 1] != "\\")
				dirPath += "\\";
			// 1071222 Raymond 備份目錄改為文號+msgId, 避免主辦流程點未正常關閉公文但傳送成功了, 到退回或結案未歸檔等msgId已變的流程點, 因跳出警告訊息, 而被使用者誤回復的問題
			//dirPath += _docObj.sourceOrgNo + "\\" + theUserInfo.UserID + "\\" + ((_docObj.isDraft)?_docObj.msgId:_docObj.docNo);// 2016.9.22 草稿一律用msgId, 代理公文一律用原承辦的帳號子目錄, 2016.12.22 _docObj.ICUserId->theUserInfo.UserID區分不同流程點要自動備份在各自的子目錄
			dirPath += _docObj.sourceOrgNo + "\\" + theUserInfo.UserID + "\\" + ((_docObj.isDraft)?_docObj.msgId:(_docObj.docNo + "_" + _docObj.msgId));// 2016.9.22 草稿一律用msgId, 代理公文一律用原承辦的帳號子目錄, 2016.12.22 _docObj.ICUserId->theUserInfo.UserID區分不同流程點要自動備份在各自的子目錄
			theLogger.warn("自動備份目錄為'" + dirPath + "'");
			
			if(_docObj.signType == "P") {	// 紙本簽核
				for(var i=0; i<_currMgmt.getDraftCounts(); i++) {
					if(_cachedDM[i] !== undefined) {
						//if(_cachedDM[i].dirty()) {
							_cachedDM[i].save({
								action: "backup",	// 1150108 Raymond 1141307 新增action=backup的參數, 以供DraftModel.save判斷是備份行為的儲存
								success: function(index, path, fname, fnameCmpl, xml) {
									var path2 = dirPath;
									var p = path.lastIndexOf("\\");
									if(p > 0)
										path2 = dirPath + path.substring(p);
									theLogger.log("備份儲存[" + (index + 1) + "] - '" + fname + "'到'" + path2 + "'...");
									// 1090213 Raymond 修正傳字串時, in指令會發生Error的問題
									//if("xml" in xml)	// for IE-compatible
									if(!!xml.xml)
										theLogger.log(xml.xml);
									else
										theLogger.log(xml);
									deferreds.push(wfio.upload(path2, fname, xml));
									if(typeof fnameCmpl === "string" && fnameCmpl.length > 0) {	// 2016.10.27 檢查有無傳完稿檔名, 因為上傳分繕變數檔不會傳這個參數
										// 1100217 Raymond 1090610 儲存公文時儲存的完稿XML, 不要轉出群組受文者中的成員受文者, 以節省儲存所耗費時間
										//var cmplXml = transCmplXml(xml);	// 2016.12.7 轉成完稿XML
										var cmplXml = transCmplXml(xml, true);	// 2016.12.7 轉成完稿XML
										if(!!cmplXml)
											deferreds.push(wfio.upload(path2, fnameCmpl, cmplXml));	// 上傳完稿XML
										else
											theLogger.error("轉換完稿XML失敗, 無法上傳'" + fnameCmpl + "'");
									}
								}
							});
							_currMgmt.saveDraftAtts(i, {	// 2016.7.12 新增儲存附件、分繕表等額外電子檔案
								rename: function(index, name, path, fname, origFileName) {	// 應更名的附件檔要先下載再上傳
									/*theLogger.log("更名儲存[" + (index + 1) + "]['" + name + "'] - '" + origFileName + "' -> '" + fname + "'...");
									var dfd2 = $.Deferred();
									wfio.download(path, origFileName, {
										keepRawData: true,	// 2016.7.13 保持原始資料格式(Typed Array)
										success: function(fil, all) {
											deferreds.push(wfio.upload(path, fname, fil));
											dfd2.resolve();
										},
										error: function(errorText) {
											dfd2.reject(errorText);
										}
									});
									preceed.push(dfd2.promise());*/
								},
								success: function(index, name, path, fname, origFileName) {
									if(origFileName.match(/^blob:/)) {	// 2016.9.1 FIX
										var path2 = dirPath;
										var p = path.lastIndexOf("\\");
										if(p > 0)
											path2 = dirPath + path.substring(p);
										theLogger.log("備份儲存[" + (index + 1) + "]['" + name + "'] - '" + fname + "', '" + origFileName + "'到'" + path2 + "'...");
										deferreds.push(wfio.uploadAtt(path2, fname, origFileName));
									}
									else {
										theLogger.log("[" + (index + 1) + "]['" + name + "'] - '" + origFileName + "'前一次一般儲存己上傳, 不需備份");
									}
								}
							});
						//}
						//_cachedDM[i].needRetransFO(true);	// 2016.1.13 存檔後要重新產生FO, 雖然不知道為什麼
					}
				}
				//if(_currMgmt.dirty()) {
					_currMgmt.save({
						success: function(path, fname, xml) {
							var path2 = dirPath;
							var p = path.lastIndexOf("\\");
							if(p > 0)
								path2 = dirPath + path.substring(p);
							theLogger.log("備份儲存文稿管理檔到'" + path2 + "'...");
							if("xml" in xml)	// for IE-compatible
								theLogger.log(xml.xml);
							else
								theLogger.log(xml);
							deferreds.push(wfio.upload(path2, fname, xml));
						}
					});
				//}
				// 2016.7.12 新增preceed要先下載的物件
				if(preceed.length > 0) {
					$.when.apply(this, preceed).done(function() {
						theLogger.log("須更名附件檔已先下載完成!");
					});
				}
				
				// 並聯處理不固定數量Deferred物件的方法
				$.when.apply(this, deferreds).done(function() {
					theLogger.log("-=全部異動文稿附件及文稿管理檔上傳備份完畢=-");
					dfd.resolve(null);
				})
				.fail(function(errorText) {
					theLogger.log("-=異動文稿或附件未全部上傳備份=-" + errorText);
					dfd.reject(errorText);
				});
			}
			else {	// 線上簽核
				for(i=0; i<_signFolder.getDraftCounts(); i++) {
					if(_cachedDM[i] !== undefined) {    // _cachedDM所記錄的文稿是固定順序, 非push
						// 1141218 Raymond 北榮序453 當因為自動增高簽核區域而異動內文時, 要能儲存
						//if(_cachedDM[i].getEditable())	// 1060829 Raymond 文稿可編輯情況下才可備份, 否則利用備份還原功能會覆蓋到原稿
						if(_cachedDM[i].getEditable() || _cachedDM[i].changedForSALP())	// 1060829 Raymond 文稿可編輯情況下才可備份, 否則利用備份還原功能會覆蓋到原稿
						//if(_cachedDM[i].dirty()) {      // 有開啟的文稿才有機會異動?
							_cachedDM[i].save({
								action: "backup",	// 1150108 Raymond 1141307 新增action=backup的參數, 以供DraftModel.save判斷是備份行為的儲存
								success: function(index, path, fname, fnameCmpl, xml) {	// 2016.2.2 新增第2參數, 原文稿下載的子目錄路徑, 2016.7.29 新增第4參數, 完稿檔名
									var path2 = dirPath;
									var p = path.lastIndexOf("\\");
									if(p > 0)
										path2 = dirPath + path.substring(p);
									theLogger.log("備份儲存[" + (index + 1) + "] - '" + fname + "'到'" + path2 + "'...");
									// 1090213 Raymond 修正傳字串時, in指令會發生Error的問題
									//if("xml" in xml)	// for IE-compatible
									if(!!xml.xml)
										theLogger.log(xml.xml);
									else
										theLogger.log(xml);
									deferreds.push(wfio.upload(path2, fname, xml));		// 2016.2.2 上傳子目錄改以傳入的path
									if(typeof fnameCmpl === "string" && fnameCmpl.length > 0) {	// 2016.10.27 檢查有無傳完稿檔名, 因為上傳分繕變數檔不會傳這個參數
										// 1100217 Raymond 1090610 儲存公文時儲存的完稿XML, 不要轉出群組受文者中的成員受文者, 以節省儲存所耗費時間
										//var cmplXml = transCmplXml(xml);	// 2016.12.7 轉成完稿XML
										var cmplXml = transCmplXml(xml, true);	// 2016.12.7 轉成完稿XML
										if(!!cmplXml)
											deferreds.push(wfio.upload(path2, fnameCmpl, cmplXml));	// 2016.7.29 上傳完稿XML
										else
											theLogger.error("轉換完稿XML失敗, 無法上傳'" + fnameCmpl + "'");
									}
								}
							});
						//}
						//_cachedDM[i].needRetransFO(true);	// 2016.1.13 存檔後要重新產生FO, 雖然不知道為什麼
					}
				}
				for(dir in _draftMgmts) {	// 2016.2.1 文稿管理檔有複數改為集合物件, KEY是子目錄名
					// 1130109 Raymond 1120887 新增判斷會辦單位可編輯簽稿會核單的會辦意見區時, 及主辦單位的文稿管理檔內的文稿有異動時, 可儲存主辦單位的文稿管理檔
					//if(_draftMgmts[dir].getEditable()) {	// 可編輯的文稿管理檔才要備份
					if((_draftMgmts[dir].dirty() || _draftMgmts[dir].getSessionDirty() || _draftMgmts[dir].hasDraftModified()) && (_draftMgmts[dir].getEditable() || _draftMgmts[dir].canEditCon())) {
						_draftMgmts[dir].save({
							success: function(path, fname, xml) {	// 儲存的callback介面也增加dirPath, 因不同文稿管理檔存在不同子目錄
								var path2 = dirPath;
								var p = path.lastIndexOf("\\");
								if(p > 0)
									path2 = dirPath + path.substring(p);
								theLogger.log("備份儲存文稿管理檔到'" + path2 + "'...");
								if("xml" in xml)	// for IE-compatible
									theLogger.log(xml.xml);
								else
									theLogger.log(xml);
								deferreds.push(
									wfio.upload(path2, fname, xml)
								);
							}
						});
						var n = _draftMgmts[dir].getDraftCounts();
						for(var i=0; i<n; i++) {
							_draftMgmts[dir].saveDraftAtts(i, {	// 2016.7.20 新增儲存附件、分繕表等額外電子檔案
								rename: function(index, name, path, fname, origFileName) {	// 應更名的附件檔要先下載再上傳
									/*theLogger.log("更名儲存[" + (index + 1) + "]['" + name + "'] - '" + origFileName + "' -> '" + fname + "'...");
									var dfd2 = $.Deferred();
									wfio.download(path, origFileName, {
										keepRawData: true,	// 2016.7.20 保持原始資料格式(Typed Array)
										success: function(fil, all) {
											deferreds.push(wfio.upload(path, fname, fil));
											dfd2.resolve();
										},
										error: function(errorText) {
											dfd2.reject(errorText);
										}
									});
									preceed.push(dfd2.promise());*/
								},
								success: function(index, name, path, fname, origFileName) {
									// 1141125 Raymond 1141255 取消附件匯出頁面時由工作站上傳附件原始檔, 客戶端不上傳的機制, 改回一律由客戶端上傳附件原始檔
									// 1110301 Raymond 1110106 合併1080815, 判斷是否為不匯出頁面的附件格式
									//1050919	Leslie	配合附件匯出頁面時，已將附件原始檔上傳至公文所在目錄，故略過儲存時的附件上傳邏輯
									//if(SSO_CONFIG.enableConvertAttPage)
									/*var shouldConvertAttPage = SSO_CONFIG.enableConvertAttPage;
									if(SSO_CONFIG.enableConvertAttPage && "WE_ALLOW_RAW_ATTACH_FMT" in theSSO.User.SystemSets && theSSO.User.SystemSets.get("WE_ALLOW_RAW_ATTACH_FMT").length > 0) {
										var dot = fname.lastIndexOf(".");
										if(dot > 0) {
											if(theSSO.User.SystemSets.get("WE_ALLOW_RAW_ATTACH_FMT").indexOf(fname.substr(dot + 1).toUpperCase()) >= 0) {
												theLogger.log("附件'" + fname + "'符合不匯出頁面格式, 應上傳原始檔");
												shouldConvertAttPage = false;
											}
										}
										else
											theLogger.warn("附件電子檔無副檔名, 無法判斷是否為不匯出頁面之格式");
									}
									if(SSO_CONFIG.enableConvertAttPage && shouldConvertAttPage)
										theLogger.log("[" + (index + 1) + "]['" + name + "'] - '" + origFileName + "'於匯出頁面時已上傳, 不需備份");
									else{*/
										if(origFileName.match(/^blob:/)) {	// 2016.9.1 FIX
											var path2 = dirPath;
											var p = path.lastIndexOf("\\");
											if(p > 0)
												path2 = dirPath + path.substring(p);
											theLogger.log("備份儲存[" + (index + 1) + "]['" + name + "'] - '" + fname + "', '" + origFileName + "'到'" + path2 + "'...");
											deferreds.push(wfio.uploadAtt(path2, fname, origFileName));
										}
										else {
											theLogger.log("[" + (index + 1) + "]['" + name + "'] - '" + origFileName + "'前一次一般儲存己上傳, 不需備份");
										}
									//}	end of else // 1141125 Raymond 1141255 取消附件匯出頁面時由工作站上傳附件原始檔, 客戶端不上傳的機制, 改回一律由客戶端上傳附件原始檔
								}
							});
						}
					}
				}
				var signWork = new SignWork(that, _signFolder, function(page) {	// 2016.7.20 新增收集須上傳附件匯出頁面影像, 2016.12.15 傳入that(FolioModel)參數給SignWork()
					/*theLogger.log("儲存附件頁面 - '" + page.fileRef.name + "'...");	// 檔名
					if("content" in page) {	// 2016.9.12 新增匯出頁面時不要下載實體檔資料到客戶端資源
						if(page.content.match(/^data:image\/([a-z]+);base64,/)) {
							var bin = page.content.substr(19 + RegExp.$1.length);
							//theLogger.log(bin);
							bin = Base64.decode(bin);
							//theLogger.log(bin);
							deferreds.push(wfio.upload(that.subDirPath, page.fileRef.name, bin));
						}
						else {
							theLogger.warn("附件頁面非影像檔!?");
							theLogger.log(page);
						}
					}
					else {
						theLogger.warn("附件頁面不是以本地資源暫存, 不必上傳");
					}*/
					// 1141127 Raymond 1141255 備分也要備匯出完成的附件頁面檔
					theLogger.log("備份附件頁面 - '" + page.fileRef.name + "'...");	// 檔名
					if("content" in page) {	// 2016.9.12 新增匯出頁面時不要下載實體檔資料到客戶端資源
						if(page.content.match(/^data:image\/([a-z]+);base64,/)) {
							var bin = page.content.substr(19 + RegExp.$1.length);
							//theLogger.log(bin);
							bin = Base64.decode(bin);
							//theLogger.log(bin);
							deferreds.push(wfio.upload(dirPath, page.fileRef.name, bin));
						}
						// 1141125 Raymond 1141255 新增判斷若匯出頁面是暫存在工作站上的位置, 則呼叫工作站的WebFileIO搬移暫存的頁面影像檔至FileServer
						// 1141213 Leslie[國合會版更問題]	修正正規表示式
						// else if(page.content.match(/^http[s]:\/\//i)) {
						else if(page.content.match(/^http[s]?:\/\//i)) {
							theLogger.log("附件頁面檔在工作站上暫存目錄下, 備份時搬移至FileServer...");
							if(page.fileRef.name.lastIndexOf('\\') > 0) {
								var sp = page.fileRef.name.lastIndexOf('\\'),
									srcAttPath = page.fileRef.name.substr(0, sp),
									fname = page.fileRef.name.substr(sp + 1),
									srcWFIO = page.content.substr(0, page.content.indexOf("IMGTRAN.ASHX")) + "ImgConvertWS.asmx";
								//page.fileRef.name = fname;	// 附件頁面更名, 備份時不要更名, 由RD-FolioModel.js在檢核到有content時, 再重新寫入非全路徑的檔名
								deferreds.push((new WebFileIO(srcWFIO)).copy(srcAttPath, fname, dirPath, fname, {toWebFileIOUrl: that.fileIOWS}));
							}
							else
								theLogger.error("附件頁面檔非全徑名, 無法搬移");
						}
						else {
							theLogger.warn("附件頁面非影像檔!?");
							theLogger.log(page);
						}
					}
					else {
						theLogger.warn("附件頁面不是以本地資源暫存, 不必上傳");
					}
				}, function(secretarySignCommentDoc) {	// 1070112 Raymond 1060452 若是鐵工局秘書, 須上傳秘書的簽辦意見為獨立檔案
					theLogger.log("儲存秘書簽辦意見...");
					deferreds.push(wfio.upload(dirPath, "SecretarySignComment.xml", secretarySignCommentDoc));
				});
				i = 0;
				_signFolder.enumAllPages(function(pg) {
					theLogger.log("pg#" + (++i) + ":");
					theLogger.log(pg);
					// 新增的簽核物件
					if("newSignObjs" in pg) {
						for(var j=0; j<pg.newSignObjs.length; j++) {
							var newSO = pg.newSignObjs[j];
							// 1141117 Raymond 1141442 修正RegExp.$1可能是空值, 會導致上傳發生錯誤的問題
							//if(newSO.content.match(/^data:image\/([a-z]+);base64,/)) {
							//	theLogger.log("match! '" + RegExp.$1 + "'");
							var m = newSO.content.match(/^data:image\/([a-z]+);base64,/);
							if(!!m && m.length > 1) {
								theLogger.log("match! '" + m[1] + "'");
								
								// 2015.5.15 數位墨水簽核物件要轉回白底圖檔
								if(newSO.type == "sketch") {
									// 並聯處理不固定數量Deferred物件的方法
									deferreds.push(function(nso) {
									
										nso.maskBkgnd = "Y";	// 設成去背
									
										var dfd = $.Deferred();
										
										// 加工轉成沒有alpha的圖檔
										var img = new Image();
										img.onload = function(evt) {
											theLogger.log("將數位墨水轉成沒有alpha的圖檔...");
											var w = evt.target.width;
											var h = evt.target.height;
											var can = $("<canvas width='" + w + "px' height='" + h + "px'></canvas>");  // 未append到DOM中的Canvas在FF下可能無法使用
											var ctx = can.get(0).getContext("2d");
											ctx.drawImage(evt.target, 0, 0);
											var imgData = ctx.getImageData(0, 0, w, h);
											var r, g, b, a, q = 0, z = 0;
											for(var y=0; y<h; y++) {
												for(var x=0; x<w; x++, z+=4) {
													r = imgData.data[q++];
													g = imgData.data[q++];
													b = imgData.data[q++];
													a = imgData.data[q++];
													if(a == 0) {    // 透明則設定成白色
														imgData.data[z] = 255;
														imgData.data[z+1] = 255;
														imgData.data[z+2] = 255;
														imgData.data[z+3] = 255;
													}
													else	// 其餘不透明或半透明都設成不透明
														imgData.data[z+3] = 255;
												}
											}
											ctx.putImageData(imgData, 0, 0);
											var newContent = can.get(0).toDataURL();
											
											// 1141117 Raymond 1141442 修正RegExp.$1可能是空值, 會導致上傳發生錯誤的問題
											//if(newContent.match(/^data:image\/([a-z]+);base64,/)) {
											//	var bin = newContent.substr(19 + RegExp.$1.length);
											var m2 = newContent.match(/^data:image\/([a-z]+);base64,/);
											if(!!m2 && m2.length > 1) {
												var bin = newContent.substr(19 + m2[1].length);
												//theLogger.log(bin);
												bin = Base64.decode(bin);
												//theLogger.log(bin);
												// 1080823 Raymond 1080708 修正章戳或圖檔簽核物件檔名(可能)為空造成SignWork.xml資訊記錄缺少電子檔名問題
												//if(!("fileName" in nso))
												if(!("fileName" in nso) || nso.fileName.length == 0)
													// 1141117 Raymond 1141442 修正RegExp.$1可能是空值, 會導致上傳發生錯誤的問題
													//nso.fileName = "NewSignObj" + Util.padLeft(++_signFolder.lastSNofSOFileName, 3) + "." + RegExp.$1;    // TODO: 檔名命名原則?
													nso.fileName = "NewSignObj" + Util.padLeft(++_signFolder.lastSNofSOFileName, 3) + "." + m2[1];    // TODO: 檔名命名原則?
												theLogger.log("備份上傳修正過的數位墨水圖檔'" + nso.fileName + "'...");
												wfio.upload(dirPath, nso.fileName, bin, {
													cbdata: nso,
													success: function(fileName, filePath) {
														signWork.addSO(this.cbdata, fileName);
													},
													error: function(errorText) {
														theLogger.error(errorText);
													}
												}).done(function() {	// 成功時串回dfd
													dfd.resolve();
												});
											}
											else {
												theLogger.warn("轉換成沒alpha的圖檔沒有dataURL相關宣告!?");
												theLogger.log(newContent);
											}
										};
										img.src = newSO.content;
										return dfd.promise();
									}(newSO));
								}
								else {	// 章戳則原檔上傳
									// 1141117 Raymond 1141442 修正RegExp.$1可能是空值, 會導致上傳發生錯誤的問題
									//var bin = newSO.content.substr(19 + RegExp.$1.length);
									var bin = newSO.content.substr(19 + m[1].length);
									//theLogger.log(bin);
									bin = Base64.decode(bin);
									//theLogger.log(bin);
									// 1080823 Raymond 1080708 修正章戳或圖檔簽核物件檔名(可能)為空造成SignWork.xml資訊記錄缺少電子檔名問題
									//if(!("fileName" in newSO))
									if(!("fileName" in newSO) || newSO.fileName.length == 0)
										// 1141117 Raymond 1141442 修正RegExp.$1可能是空值, 會導致上傳發生錯誤的問題
										//newSO.fileName = "NewSignObj" + Util.padLeft(++_signFolder.lastSNofSOFileName, 3) + "." + RegExp.$1;    // TODO: 檔名命名原則?
										newSO.fileName = "NewSignObj" + Util.padLeft(++_signFolder.lastSNofSOFileName, 3) + "." + m[1];    // TODO: 檔名命名原則?
									deferreds.push(wfio.upload(dirPath, newSO.fileName, bin, {
										cbdata: newSO,
										success: function(fileName, filePath) {
											signWork.addSO(this.cbdata, fileName);
										},
										error: function(errorText) {
											theLogger.log(errorText);
										}})
									);
								}
							}
							else
							{
								// 1080911 Raymond 1080708 修正第2次開啟再暫存時, 章戳圖檔因是tif格式而改用odtools網址形式而走到這造成儲存傳送後章戳物件無電子檔名的問題
								//signWork.addSO(pg.newSignObjs[j], null);
								signWork.addSO(pg.newSignObjs[j], pg.newSignObjs[j].fileName);
							}
						}
					}
				});
				// 1060829 Raymond 新增上傳外部簽核物件記錄檔
				deferreds.push(wfio.upload(dirPath, "XSignObjs.xml", _signFolder.xSignFolder().save()));
				
				// 2016.7.12 新增preceed要先下載的物件
				if(preceed.length > 0) {
					$.when.apply(this, preceed).done(function() {
						theLogger.log("須更名附件檔已先下載完成!");
					});
				}
				
				// 並聯處理不固定數量Deferred物件的方法
				$.when.apply(this, deferreds).done(function() {
					theLogger.log("-=全部異動文稿及簽核物件備份上傳完畢=-");
					wfio.upload(dirPath, "SignWork.xml", signWork.getDoc(), {
						success: function() {
							// 1130606	Leslie[1130077]	[併1130078]當系統於當前文稿觸發自動備份後，若使用者操作增/刪文稿、附件(連動影響封裝內容)時，則主動觸發一次自動備份
							_backuped = true;
							theLogger.log("-=SignWork.xml備份上傳完畢=-");
							dfd.resolve(null);
						},
						error: function(errorText) {
							theLogger.log("SignWork.xml備份上傳失敗! " + errorText);
							dfd.reject(errorText);
						}
					});
				})
				.fail(function(errorText) {
					theLogger.log("-=簽核物件未全部備份上傳=-" + errorText);
					dfd.reject(errorText);
				});
			}
			return dfd.promise();
		},
		// 2016.9.21 新增自動備份功能
		termAutoBackup: function() {
			if(typeof this.autoBackupTimer !== "undefined") {
				theLogger.log("停止自動備份計時器");
				clearInterval(this.autoBackupTimer);
				this.autoBackupTimer = undefined;
			}
			// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式不自動備份
			if(!!theSSO && theSSO.offlineMode == true)
				return false;
			// 清除Server上的自動備份暫存檔
			if(!("autoBackupIOWS" in SSO_CONFIG) || typeof SSO_CONFIG.autoBackupIOWS !== "string" || SSO_CONFIG.autoBackupIOWS.length == 0) {
				theLogger.error("SSO_CONFIG未設定自動備份伺服器的WebFileIO網址");
				return false;
			}
			//1080117	Joe		1080049		弱掃修正Hardcoded Absolute Path
			// if(!("autoBackupRootPath" in SSO_CONFIG) || typeof SSO_CONFIG.autoBackupRootPath !== "string" || SSO_CONFIG.autoBackupRootPath.length == 0) {
			if(typeof theSSO.User.SystemSets.get("WORK_PATH") !== "string" || theSSO.User.SystemSets.get("WORK_PATH").length == 0) {
				theLogger.error("SSO_CONFIG未設定自動備份伺服器的儲存根目錄路徑");
				return false;
			}
			if(!(!!theUserInfo && "UserID" in theUserInfo && theUserInfo.UserID.length > 0)) {	// 2016.12.22 自動備份子目錄改為theUserInfo.UserID
				theLogger.error("無theUserInfo或無UserID, 無法自動備份");
				return false;
			}
			var wfio = new WebFileIO(SSO_CONFIG.autoBackupIOWS);
			
			//1080117	Joe		1080049		弱掃修正Hardcoded Absolute Path
			// var dirPath = SSO_CONFIG.autoBackupRootPath;
			var dirPath = theSSO.User.SystemSets.get("WORK_PATH");
			if(dirPath[dirPath.length - 1] != "\\")
				dirPath += "\\";
			
			// 2017.2.7 - 公文傳送時草稿之真實msgId為ODWMSG.DRAFT_MSG_ID
			var _msgId = _docObj.msgId, _draftMsgId='';
			if (_docObj.isDraft && _msgId=='0') {
				_draftMsgId = _docObj.get('ODWMSG', 'DRAFT_MSG_ID');
				if (typeof _draftMsgId=='string' && _draftMsgId.length) {
					_msgId = _draftMsgId;
				}
			}
			// 1071222 Raymond 備份目錄改為文號+msgId, 避免主辦流程點未正常關閉公文但傳送成功了, 到退回或結案未歸檔等msgId已變的流程點, 因跳出警告訊息, 而被使用者誤回復的問題
			//dirPath += _docObj.sourceOrgNo + "\\" + theUserInfo.UserID + "\\" + ((_docObj.isDraft)?_msgId:_docObj.docNo);// 2016.10.12 草稿一律用msgId, 代理公文一律用原承辦的帳號子目錄, 2016.12.22 _docObj.ICUserId->theUserInfo.UserID區分不同流程點要自動備份在各自的子目錄
			dirPath += _docObj.sourceOrgNo + "\\" + theUserInfo.UserID + "\\" + ((_docObj.isDraft)?_msgId:(_docObj.docNo + "_" + _docObj.msgId));// 2016.10.12 草稿一律用msgId, 代理公文一律用原承辦的帳號子目錄, 2016.12.22 _docObj.ICUserId->theUserInfo.UserID區分不同流程點要自動備份在各自的子目錄
			theLogger.warn("清除自動備份目錄'" + dirPath + "'");
			wfio.del([{filePath: dirPath, fileName: ""}])
				.done(function() {
					theLogger.log("成功");
				})
				.fail(function(err) {
					theLogger.error("失敗! " + err.errCode + ":" + err.errMsg);
				});
		},
		// 2016.9.21	Leslie	新增檢核附件是否仍未完成匯出
		isAttConvertFinish: function(draftIdx, attIdx){
			if(_docObj.signType == "P") {	// Leslie	先當做紙本沒這回事
				return null;
			}
			// 1090908 Raymond 1090564 信保特殊模式不要重新匯出附件頁面
			if(_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
				return null;
			}
			// 1061017 Raymond 1060948+1060962 異動撤消後前一次傳送前所新增文稿順序若與DraftMgmt.xml不一致, 則開啟附件管理子視窗時,
			// 點擊附件會出現錯誤, 因為由DraftMgmt.js叫用此方法時所傳入的是DraftMgmt.xml中的該文稿的index, 與復原後的封裝檔+文稿管理檔
			// 所顯示的index不同, 故DraftMgmt.js改傳入該文稿的GUID做為第1個參數, 若判斷第1個參數是GUID則不需要叫用_getMappedDraftIndex()
			// 將畫面上的頁籤index轉換為實際index, 直接使用
			if(typeof draftIdx === "string" && draftIdx.indexOf("{") == 0) {
				theLogger.log("檢查文稿(GUID:" + draftIdx + ")的第" + attIdx + "附件是否已匯出頁面完成...");
				var idx = _currMgmt.getDraftIndex(draftIdx);
				if(idx < 0) {
					theLogger.error("指定的文稿GUID(" + draftIdx + ")在目前文稿管理檔中找不到");
					alert("指定的文稿GUID(" + draftIdx + ")在目前文稿管理檔中找不到");
					return null;
				}
				return !_rndrAtt.checkAttWaitConvert(_currMgmt.getDraftAttGUID(idx, attIdx));
			}
			if(this.isFromDoc(draftIdx) > 0) {	// 2016.9.26 Raymond, 新增判斷若是電子來文也不用檢核, 2017.3.22 來文簽辦(2)也不用檢核, FDA-序3566
				return null;
			}
			if(this.isExorgDraft(draftIdx)) {	// 1100512 Raymond 1090821 外會公文的附件無頁面
				return null;
			}
			if(!_currMgmt) {	// 2016.9.26 Raymond, 新增若無_currMgmt(可能是不允許編輯的Folder-Subfolder)也不要檢核
				return null;
			}
			// 1070608 Raymond 1070197 要同時取得draftIdx的文稿所屬的DraftMgmt及idx才能找到對應的附件GUID, 否則在會辦的DraftMgmt中必定找不到主辦文稿的附件
			var res = _getMappedDraftIndexAndMgmt(draftIdx);
			if(!!res)
				return !_rndrAtt.checkAttWaitConvert(res.dmgt.getDraftAttGUID(res.idx, attIdx));
			
			return !_rndrAtt.checkAttWaitConvert(_currMgmt.getDraftAttGUID(_getMappedDraftIndex(draftIdx), attIdx));	// 2016.11.7 用_getMappedDraftIndex()取得文稿管理檔中的順序	//2016.12.19 Leslie Bug Fix 函式語意錯誤，應加"!"反向回傳
		},
		// 2016.9.21	Leslie	新增取得附件的最後一次處理訊息
		getConvertMsg: function(draftIdx, attIdx){
			if(_docObj.signType == "P") {	// Leslie	先當做紙本沒這回事
				return null;
			}
			// 1070608 Raymond 1070197 因為開啟會辦單位擬稿, 所以draftIdx必須先反查出位於DraftMgmt的idx才能正確找到對應的附件
			return _rndrAtt.getErrMsg(_currMgmt.getDraftAttGUID(_getMappedDraftIndex(draftIdx),attIdx));
			//return _rndrAtt.getErrMsg(_currMgmt.getDraftAttGUID(draftIdx,attIdx));
		},
		// 2016.9.23 - Raymond, 新增用DraftInfo找DM
		getCachedDM: function(draftInfo)  {
			// 1090318 Raymond 1090089 修正紙本公文開啟舊檔時不會自動開啟受文者子視窗的問題
			if(_docObj.signType == "P" && typeof draftInfo === "number") {
				if(draftInfo < _cachedDM.length)
					return _cachedDM[draftInfo];
				else
					theLogger.error("要求取得紙本公文暫存的DraftModel[" + draftInfo + "]超過邊界");
			}
			else
			if(!!draftInfo) {	// 2017.3.31 fix for 附件頁面的container為undefined情況
				for(var i=0; i<_cachedDM.length; i++) {
					if(_cachedDM[i] != undefined && _cachedDM[i].draftInfo == draftInfo)	// 2016.9.29 FIX, _cachedDM非push
						return _cachedDM[i];
				}
				if("guid" in draftInfo && !!draftInfo.guid && draftInfo.guid.length > 0) {	// 2016.12.22 改用GUID找, 1061116 Raymond 1061118 fix for 附件會有guid但為undefined情況
					for(var i=0; i<_cachedDM.length; i++) {
						if(_cachedDM[i] != undefined && _cachedDM[i].draftInfo.guid == draftInfo.guid)
							return _cachedDM[i];
					}
				}
			}
			return null;
		},
		// 2016.10.4 - Raymond, 新增判斷文稿可不可以刪除
		isDraftDeletable: function(index) {     // index指封裝檔中的序
			if(_docObj.signType == "P") {	// 紙本簽核
				if(index >= 0 && index < _currMgmt.getDraftCounts())
					return _currMgmt.isDraftDeletable(index);
				throw new Error("要求取得第" + index + "個文稿可否刪除, 超出範圍");
			}
			else if(index < 0 || index >= _signFolder.getDraftCounts()) {
				if(index >= 0 && _currMgmt && index < _currMgmt.getDraftCounts())	// 新增文稿只會記錄在文稿管理檔
					return _currMgmt.isDraftDeletable(index);
				throw new Error("要求取得第" + index + "個文稿可否刪除, 超出範圍");
			}
			var draft = _signFolder.getDraft(index);
			if("fromType" in draft)
				return false;	// 來文內容不可刪除
			if(draft.name == "來文簽辦")
				return false;	// 來文簽辦不可刪除
			var guid = _lookupDraftGUID(draft.id);  // 透過AOLProcessData.xml尋找對應索引值的文稿GUID
			// 文稿管理檔, KEY為子目錄名稱
			for(dir in _draftMgmts) {
				if(guid != null)	// 2016.8.17 調閱線上簽核公文, 可能無AOLProccessData.xml
					var idx = _draftMgmts[dir].getDraftIndex(guid);	// 改用getDraftIndex(GUID)來確定該文稿是否存在於這個文稿管理檔中
				else {
					theLogger.warn("文稿GUID=" + guid + ", 改以指定索引值(" + index + ")為文稿管理檔中的稿序取得文稿模型物件");
					var idx = index;
				}
				if(idx >= 0)
					return _draftMgmts[dir].isDraftDeletable(idx);
			}
			theLogger.error("找不到指定ID:" + draft.id + "的文稿可判斷是否可刪除");
			return false;	// 都找不到
		},
		// 1111021 Raymond 1110885 新增第2參數skipPrompt, 若傳入true, 則表示不要提示確認刪除的警告訊息
		// 2016.10.4 - Raymond, 新增刪除文稿
		//deleteDraft: function(index) {
		deleteDraft: function(index, skipPrompt) {
			if(_docObj.signType == "P") {	// 紙本簽核
				if(index >= 0 && index < _currMgmt.getDraftCounts()) {
					// 1111021 Raymond 1110885 直接傳入新增的skipPrompt參數
					//if(_currMgmt.deleteDraft(index)) {
					if(_currMgmt.deleteDraft(index, skipPrompt)) {
						_cachedDM.splice(index, 1);
						return true;	// 2016.10.31 bugfix
					}
				}
				throw new Error("要求刪除第" + index + "個文稿, 超出範圍");
			}
			else if(index < 0 || index >= _signFolder.getDraftCounts()) {
				if(index >= 0 && _currMgmt && index < _currMgmt.getDraftCounts()) {	// 新增文稿只會記錄在文稿管理檔
					// 1111021 Raymond 1110885 直接傳入新增的skipPrompt參數
					//if(_currMgmt.deleteDraft(index)) {
					if(_currMgmt.deleteDraft(index, skipPrompt)) {
						_cachedDM.splice(index, 1);
						return true;	// 2016.10.31 bugfix
					}
				}
				throw new Error("要求刪除第" + index + "個文稿, 超出範圍");
			}
			var draft = _signFolder.getDraft(index);
			if("fromType" in draft) {
				theLogger.error("來文內容不可刪除");
				return false;	// 來文內容不可刪除
			}
			if(draft.name == "來文簽辦") {
				theLogger.error("來文簽辦不可刪除");
				return false;	// 來文簽辦不可刪除
			}
			// 1130606	Leslie[1130077]	[併1130078]當系統於當前文稿觸發自動備份後，若使用者操作增/刪文稿、附件(連動影響封裝內容)時，則主動觸發一次自動備份
			var that = this;
			var guid = _lookupDraftGUID(draft.id);  // 透過AOLProcessData.xml尋找對應索引值的文稿GUID
			// 文稿管理檔, KEY為子目錄名稱
			for(dir in _draftMgmts) {
				if(guid != null)	// 2016.8.17 調閱線上簽核公文, 可能無AOLProccessData.xml
					var idx = _draftMgmts[dir].getDraftIndex(guid);	// 改用getDraftIndex(GUID)來確定該文稿是否存在於這個文稿管理檔中
				else {
					theLogger.warn("文稿GUID=" + guid + ", 改以指定索引值(" + index + ")為文稿管理檔中的稿序取得文稿模型物件");
					var idx = index;
				}
				if(idx >= 0) {
					// 1121005 Raymond 1111194 修正受會單位新增文稿後無法刪除的問題
					// 1111021 Raymond 1110885 直接傳入新增的skipPrompt參數
					//if(_draftMgmts[dir].deleteDraft(idx)) {
					//if(_draftMgmts[dir].deleteDraft(index, skipPrompt)) {
					if(_draftMgmts[dir].deleteDraft(idx, skipPrompt)) {
						theLogger.warn("刪除文稿管理檔的文稿(索引:" + idx + ")成功");
						for(var i=0; i<_apd.length; i++) {
							for(var j=0; j<_apd[i].versions.length; j++) {
								if(_apd[i].versions[j].id == draft.id) {
									theLogger.warn("刪除AOLProccessData的文稿(ID:" + draft.id + ")成功");
									_apd[i].versions.splice(j, 1);
									break;
								}
							}
						}
						_signFolder.delDraft(index);
						_cachedDM.splice(index, 1);
						
						// 1130606	Leslie[1130077]	[併1130078]當系統於當前文稿觸發自動備份後，若使用者操作增/刪文稿、附件(連動影響封裝內容)時，則主動觸發一次自動備份
						if(_backuped)
							setTimeout(function() {that.backup();}, 1000);
						
						return true;
					}
				}
			}
			theLogger.error("找不到指定ID:" + draft.id + "的文稿可刪除");
			return false;	// 都找不到
		},
		// 2016.10.21 調整稿序
		adjustOrder: function(param) {
			if(_docObj.signType == "E") {	// 線上簽核直接調整signFolder的稿序
				_signFolder.adjustOrder(param, function(draft) {	// 2016.11.18 新增更名callback
					_setMappedDraftName(draft);
				});
			}
			//else {	// 紙本簽核則是直接調整文稿管理檔的稿序		//2017.3.15	Leslie	不論線上、紙本，均一律跟著調整文稿管理檔稿序
				_currMgmt.adjustOrder(param);
			//}
			var tmp = [];
			for(var i=0; i<_cachedDM.length; i++)
				tmp[i] = _cachedDM[i];
			// 1070620 Raymond 1070547 會辦單位手動調整稿序後, param數量比總文稿數少, 改用push的重新整理
			_cachedDM.length = 0;
			for(var i=0; i<param.length; i++) {
				theLogger.log(i + ": origIdx:" + param[i].origIdx + ", name:" + param[i].name);
				theLogger.log("\t\tcachedDM:" + tmp[param[i].origIdx]);
				if(tmp[param[i].origIdx] != undefined) {
					_cachedDM[i] = tmp[param[i].origIdx];
					// 1070620 Raymond 1070547 已經恢復的dm從tmp中刪除
					tmp[param[i].origIdx] = null;
				}
				else
					_cachedDM[i] = undefined;
			}
			// 1070620 Raymond 1070547 剩餘的加回或插回原位置
			if(param.length < tmp.length) {
				for(var i=0; i<tmp.length; i++) {
					if(tmp[i] != null) {
						if(_isConUnit)	// 會辦公文
							_cachedDM.splice(i, 0, tmp[i]);	// 用插入的才能在會辦公文時將主辦或先會單位的文稿加回去
						else
							_cachedDM.push(tmp[i]);
					}
				}
			}
		},
		// 2016.11.1	Leslie	新增取得參考附件內容的備份物件(以區別儲存行為)
		getRefAttachsClone: function(){
			return _refAttMgmt.accquireRefAttachsClone();
		},
		commitRefAttachs: function(_refAtt){
			_refAttMgmt.saveTmpAtts(_refAtt);
		},
		isRefAttachsEdit: function(){
			return _refAttMgmt.isEnableWrite();
		},
		isRefAttachsDirty: function(){
			return _refAttMgmt.isRefAttachsDirty();
		},
		getRefAttachsFileCnt: function(){
			return _refAttMgmt.getAttachFileCounts();
		},
		// 1111012	Leslie[1110865]	新增簽閱附件配套功能，以及擴充展開參考附件的配套函式
		getRefAttachNameInfo: function(idx){
			return _refAttMgmt.getRefAttachNameInfo(idx);
		},
		getTmpAttachsClone: function(){
			return _tmpAttMgmt.accquireTmpAttachsClone();
		},
		commitTmpAttachs: function(_tmpAtt){
			_tmpAttMgmt.saveTempTmpAtts(_tmpAtt);
		},
		isTmpAttachsEdit: function(){
			return _tmpAttMgmt.isEnableWrite();
		},
		isTmpAttachsDirty: function(){
			return _tmpAttMgmt.isTmpAttachsDirty();
		},
		getTmpAttachsFileCnt: function(){
			return _tmpAttMgmt.getAttachFileCounts();
		},
		getTmpAttachNameInfo: function(idx){
			return _tmpAttMgmt.getTmpAttachNameInfo(idx);
		},
		// 1111012	Leslie[1110865]	新增簽閱附件配套功能 --END--
		// 2016.11.8 Raymond, 取得附件所在目錄 for 複製文稿
		getDraftDirPath: function(index) {
			if(_docObj.signType == "P") {	// 2016.6.22 支援紙本簽核
				return _currMgmt.getDraftDirPath();
			}
			if(index < 0 || index >= _signFolder.getDraftCounts())
				throw new Error("要求取得第" + index + "個文稿稿序, 超出範圍");
			var draft = _signFolder.getDraft(index);
			var guid = _lookupDraftGUID(draft.id);  // 透過AOLProcessData.xml尋找對應索引值的文稿GUID
			// 文稿管理檔改成複數, KEY為子目錄名稱
			for(dir in _draftMgmts) {
				var idx = _draftMgmts[dir].getDraftIndex(guid);	// 改用getDraftIndex(GUID)來確定該文稿是否存在於這個文稿管理檔中
				if(idx >= 0)	// 大於等於0才表示此GUID的文稿在此文稿管理檔中
					return _draftMgmts[dir].getDraftDirPath();
			}
			return null;
		},
		// 2016.11.10 新增是否保留簽署物件
		getReserveSO: function() {
			return _reserveSO;
		},
		setReserveSO: function(b) {
			theLogger.log("設定" + ((b)?"要":"不") + "保留簽署物件");
			_reserveSO = b;
		},
		// 2016.11.24 新增因文別轉換引起的重設稿序名稱功能
		resetDraftName: function(draft) {
			if(_docObj.signType == "E") {	// 線上簽核才要更新封裝檔物件對應的文稿屬性
				var id = _lookupDraftID(draft.guid);
				if(id) {
					try {
						var d = _signFolder.getDraftById(id);
						theLogger.log("重設ID:" + id + "的文稿... 稿序名稱=" + draft.name + ", 文別=" + draft.docType + ", 函/令類別=" + draft.subDocType);
						d.name = draft.name;
						d.docType = draft.docType;
						d.subDocType = draft.subDocType;
					}
					catch(e) {
						theLogger.error("找不到ID:" + id + "的文稿物件, " + e.message);
					}
				}
				else
					theLogger.error("找不到GUID:" + draft.guid + "的文稿ID");
			}
		},
		// 2016.12.15 新增confirmDraftEditable方法, 由SignFolder.prepareSignWork()判斷文稿有異動時追加判斷文稿是否可編輯, 若不可編輯則不寫出Updates文稿
		confirmDraftEditable: function(draft) {
			if("fromType" in draft) {
				theLogger.error("電子來文不可編輯");
				return false;
			}
			else if(draft.name == "來文簽辦") {	// 來文簽辦比照電子來文
				theLogger.error("'來文簽辦'不可編輯");
				return false;
			}
			else if(typeof draft.id === "string") {
				var guid = _lookupDraftGUID(draft.id);
				if(!!guid) {
					// 文稿管理檔為複數, KEY為子目錄名稱
					for(dir in _draftMgmts) {
						var idx = _draftMgmts[dir].getDraftIndex(guid);	// 用getDraftIndex(GUID)來確定該文稿是否存在於這個文稿管理檔中
						if(idx >= 0) {	// 大於等於0才表示此GUID的文稿在此文稿管理檔中
							if(_draftMgmts[dir].getEditable()) {
								// 1141218 Raymond 北榮序453 因1140818禁止出組室過的非可發文文別異動內文, 但要對自動增高簽核區域允許異動, DraftMgmt.confirmDraftEditable新增purpose參數, 若環境變數「AOL_DISABLE_CHANGE_DRAFT_CONTENT」設為"Y", 則傳入"forSALP"
								// 1120523 Raymond 1120307 改用DraftMgmt的confirmDraftEditable判斷文稿是否可異動, 而非已點開的文稿, 以避免備份時由於未點開文稿, 而未執行到DraftModel的getEditable判斷, 造成SignWork.xml中漏寫未點開的<文稿>節點, 導致從備份還原後會發生傳送錯誤(代碼713)問題
								// 1110817 Raymond 中興序241 修正核決後公文禁止異動文別仍會寫入SignWork.xml中並記錄為已異動, 造成封裝錯誤無法傳送的問題
								//var dmEditable = false;
								//for(var i=0; i<_cachedDM.length; i++) {
								//	if(_cachedDM[i] !== undefined && _cachedDM[i].draftInfo == draft) {
								//		dmEditable = _cachedDM[i].getEditable();
								//		break;
								//	}
								//}
								//if(dmEditable) {
								//if(_draftMgmts[dir].confirmDraftEditable(idx)) {
								if(_draftMgmts[dir].confirmDraftEditable(idx, ((theSSO.User.EnvSettings.get("AOL_DISABLE_CHANGE_DRAFT_CONTENT") == "Y")?"forSALP":undefined))) {
									theLogger.log("GUID:" + guid + "之文稿'" + draft.name + "'屬於可編輯內文的文稿管理檔(" + dir + ")");
									return true;
								}
								else {
									//theLogger.error("GUID:" + guid + "之文稿'" + draft.name + "'屬於不可編輯內文的文稿管理檔(" + dir + ")");
									theLogger.error("GUID:" + guid + "之文稿'" + draft.name + "'屬於不可編輯內文的文稿管理檔(" + dir + ")或特定情境下限制為不可編輯(ex.結案後禁止異動的文別)");	// 1120523 Raymond 1120307 調整不可編輯的原因訊息
									return false;
								}
							}
							else {
								theLogger.error("GUID:" + guid + "之文稿'" + draft.name + "'屬於不可編輯內文的文稿管理檔(" + dir + ")");
								return false;
							}
						}
					}
					// 都找不到可能是此流程點的新增文稿
					theLogger.error("所有文稿管理檔都找不到GUID:" + guid + "的文稿(ID:" + draft.id + "), 可能是刪除文稿, 允許編輯內文");
					return true;
				}
				else {
					// 找不到GUID可能是此流程點的新增文稿
					theLogger.error("此文稿(ID:" + draft.id + ")找不到對應的GUID, 可能是新增文稿, 允許編輯內文");
					return true;
				}
			}
			else {	// 不知道會不會有沒有id的情況發生
				theLogger.error("confirmDraftEditable(): 文稿ID不是字串! draft.id=" + draft.id);
				alert("文稿資料異常!");
			}
		},
		// 1060822 Raymond 1060703 新增切換至特定頁面功能
		goToAnyPage: function(draftIdx, attIdx, po) {
			for(var i=0; i<_views.length; i++) {
				_views[i].goToAnyPage(draftIdx, attIdx, po);
			}
		},
		// 1061114 Raymond 1061068 判斷來文附件頁面是否允許實際上旋轉(影像處理)
		enableRcvAttPageRotate: function(pg) {
			return _signFolder.enableRcvAttPageRotate(pg);
		},
		// 1090227 Raymond 1080751 合併內政部1070381若公文由AKI800調閱則具備UNV檔物件
		getUNVObj: function() {
			return _unvObj;
		},
		// 1070608 Raymond 1070197 新增取得文稿新增的單位代碼
		getConDraftUnitNo: function(idx) {
			if(_docObj.signType == "P") {	// 紙本簽核
				return _currMgmt.getConDraftUnitNo(idx);
			}
			if(idx < 0 || idx >= _signFolder.getDraftCounts())
				throw new Error("要求取得第" + idx + "個文稿資訊, 超出範圍");
			var d = _signFolder.getDraft(idx);
			if(!!d) {
				// 1090911 Raymond 1090564 信保特殊模式一律回"00"
				if(_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
					return "00";
				if("fileRef" in d) {	// 已寫入封裝檔的文稿檔
					var m = d.fileRef.name.match(/-([0-9]{2})-[0-9]{2}\\/);
					return RegExp.$1;
				}
				else if("fileName" in d) {	// 本流程所新增的文稿檔
					var m = d.fileName.match(/([0-9]{2})-[0-9]{2}\\/);
					return RegExp.$1;
				}
			}
			return "";
		},
		// 1070608 Raymond 1070197 新增判斷各別文稿是否可編輯, 供DraftCmds叫用
		getDraftEditable: function(idx) {
			if(idx >= 0 && idx < _cachedDM.length) {
				if(_cachedDM[idx] !== undefined)
					return _cachedDM[idx].getEditable();
				theLogger.warn("尚未載入文稿");
				return false;
			}
			return false;
		},
		// 1070608 Raymond 1070197 新增取得目前公文所在流程點的單位代碼
		getOwnOUId: function() {
			return _docObj.ownOUId;
		},
		// 1070608 Raymond 1070197 回傳目前公文是否為會辦中公文
		isConUnit: function() {
			return _isConUnit;
		},
		// 1071222 Raymond 新增從AOLProccessData.xml找尋文稿最後版本的簽核區域
		findSignAreaAPD: function(draft, saType, saID) {
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
				else if(t == "自訂")	// 1070831 Raymond 1070656 新增"自訂"簽核區域類型
					res = "4";
				return res;
			}
			for(var i=0; i<_apd.length; i++) {
				for(var j=0; j<_apd[i].versions.length; j++) {
					if(_apd[i].versions[j].id == draft.id) {
						if("sas" in _apd[i].versions[j]) {
							for(var k=0; k<_apd[i].versions[j].sas.length; k++) {
								var sa = _apd[i].versions[j].sas[k];
								if(toSAType(sa.type) == toSAType(saType) && sa.id == saID)
									return sa;
							}
							theLogger.warn("AOLProccessData.xml中有文稿ID:" + draft.id + "的版本, 但找不到類別:" + saType + ",代碼:" + saID + "相符之簽核區域");
						}
						else
							theLogger.warn("AOLProccessData.xml中有文稿ID:" + draft.id + "的版本, 但無任何簽核區域");
						return null;
					}
				}
			}
			theLogger.warn("AOLProccessData.xml中找不到文稿ID:" + draft.id + "所對應的文稿的版本");
			return null;
		},
		// 1080125 Leslie[1070200]	供參考附件子視窗設定是否已檢閱過參考附件，另提供函式以供"傳送"前檢核
		setViewRefAtt: function(){
			_isViewRefAtt = true;
		},
		isViewRefAtt: function(){
			return _isViewRefAtt;
		},
		// 1080531 Raymond 1080433 新增取得文稿清單已異動旗標
		isDraftListChanged: function() {
			if(_currMgmt) {
				return _currMgmt.draftListChanged();
			}
			return false;	// 無可編輯文稿管理檔(一般是唯讀模式下), 一律回傳未異動
		},
		// 1080531 Raymond 1080433 新增設定文稿清單已異動旗標
		setDraftListChanged: function(b) {
			if(_currMgmt)
				_currMgmt.draftListChanged(b);
			else
				theLogger.error("無可編輯文稿管理檔! 無法設定文稿清單已異動旗標");
		},
		// 1080621 Raymond 1080433 新增取得初始時文稿數
		getOrigDraftCounts: function() {
			if(_currMgmt)
				return _currMgmt.getOrigDraftCounts();
			else
				theLogger.error("無可編輯文稿管理檔! 無法初始文稿數");
		},
		// 1090115 Raymond 1081166 新增設定應寫入SignWork.xml之DI文稿檔名
		setECapDraftFileNameAsDI: function(guid, diFileName) {
			for(var i=0; i<_apd.length; i++) {
				if(_apd[i].guid == guid) {
					// 2015.1.26 - Raymond, 修正判斷版本順序, 由新(後)往舊(前)找起
					if(_apd[i].versions.length > 0) {
						for(var j=_apd[i].versions.length-1; j>=0; j--) {
							var draft;
							try {
								draft = _signFolder.getDraftById(_apd[i].versions[j].id);
							}
							catch(e) {
								theLogger.error(e.stack || e.message);
							}
							if(draft) {
								if("fromType" in draft) {
									theLogger.error("來文不支援應寫入SignWork.xml之DI文稿檔名");
								}
								else {
									theLogger.log("文稿(GUID:" + guid + ")的版本(" + draft.id + ")的fileName由'" + draft.fileName + "'變更為'" + diFileName + "'");
									draft.fileName = diFileName;
								}
								break;
							}
						}
					}
					else
						theLogger.error("AOLProcessData.xml的文稿'" + guid + "'下無任何版本節點");
				}
			}
		},
		// 1090730 Raymond 1090409 新增查詢線上簽核公文的文稿是否有內容異動
		isSendDraftContentChanged: function() {
			var dty = false;
			if(_docObj.signType == "P") {	// 紙本簽核
				theLogger.error("isDraftContentChanged方法僅檢核線上簽核公文的文稿是否有內容異動");
				throw new Error("isDraftContentChanged方法僅檢核線上簽核公文的文稿是否有內容異動");
			}
			else {	// 線上簽核
				var genFormalDraftType = theSSO.User.EnvSettings.get("AOL_GEN_FORMAL_DRAFTTYPE").split(";");
				var n = _signFolder.getDraftCounts() - (_signFolder.hasFromDoc()?1:0);	// 排除來文
				for(var i=0; i<n; i++) {
					var d = _signFolder.getDraft(i);
					if(!!d) {
						if(d.dirty()) {
							var dt = d.docType, sub = "";
							if(d.docType == "令" || d.docType == "函") {	// 令、函需改用令、函類別比對
								var res = _getMappedDraftIndexAndMgmt(i);
								if(!!res) {
									try {
										dt = res.dmgt.getDraftSubDocType(res.idx);
										sub = "函類別為'" + dt + "'";
									}
									catch(e) {
										theLogger.error(e.message);
									}
								}
							}
							if(genFormalDraftType.indexOf(dt) >= 0) {
								theLogger.log("'" + d.name + "'" + sub + "已異動, 且符合可發文文別設定");
								dty = true;
							}
							else
								theLogger.log("'" + d.name + "'" + sub + "已異動, 但不符合可發文文別設定");
						}
						else
							theLogger.log("'" + d.name + "'未異動");
					}
				}
			}
			return dty;
		},
		// 1090804 Raymond 1090409 新增查詢線上簽核公文的文稿是否符合應轉抄本的可發文文別
		isGenFormalDraftType: function(idx) {
			if(_docObj.signType == "P") {	// 紙本簽核
				theLogger.error("isGenFormalDraftType方法僅檢核線上簽核公文的文稿是否符合應轉抄本的可發文文別");
				throw new Error("isGenFormalDraftType方法僅檢核線上簽核公文的文稿是否符合應轉抄本的可發文文別");
			}
			// 線上簽核
			var genFormalDraftType = theSSO.User.EnvSettings.get("AOL_GEN_FORMAL_DRAFTTYPE").split(";");
			var d = _signFolder.getDraft(idx);
			if(!!d) {
				var dt = d.docType, sub = "";
				if(d.docType == "令" || d.docType == "函") {	// 令、函需改用令、函類別比對
					var res = _getMappedDraftIndexAndMgmt(idx);
					if(!!res) {
						try {
							dt = res.dmgt.getDraftSubDocType(res.idx);
							sub = "函類別為'" + dt + "'";
						}
						catch(e) {
							theLogger.error(e.message);
						}
					}
				}
				if(genFormalDraftType.indexOf(dt) >= 0) {
					theLogger.log("'" + d.name + "'" + sub + "符合應轉抄本的可發文文別設定");
					return true;
				}
				else
					theLogger.log("'" + d.name + "'" + sub + "不符合應轉抄本的可發文文別設定");
			}
			return false;
		},
		// 1100419 Raymond 1080767 合併內政部1070530, 新增判斷是否結案前新增文稿, 是則禁止編輯
		isClosedDraft: function(idx) {
			if(_docObj.signType == "P") {	// 紙本簽核
				return _currMgmt.isClosedDraft(idx);
			}
			if(idx < 0 || idx >= _signFolder.getDraftCounts())
				throw new Error("要求取得第" + idx + "個文稿資訊, 超出範圍");
			var d = _signFolder.getDraft(idx);
			// 1070608 Raymond 修正調閱時_docObj有ODWDCM但卻是null, 導致發生Exception的問題
			//if("ODWDCM" in _docObj && "CLOSE_MSG_ID" in _docObj.ODWDCM && _docObj.ODWDCM.CLOSE_MSG_ID.length > 0) {
			if("ODWDCM" in _docObj && !!_docObj.ODWDCM && "CLOSE_MSG_ID" in _docObj.ODWDCM && _docObj.ODWDCM.CLOSE_MSG_ID.length > 0) {
				if(_docObj.ODWDCM.CLOSE_MSG_ID == _docObj.msgId)	// 排除發文流程點發文後暫存再開啟會被鎖的問題
					return false;
				// 從AOLProcessData.xml中找到第一個版本的msgId才是創稿的msgId
				for(var i=0; i<_apd.length; i++) {
					if(_apd[i].guid == d.guid) {
						var msgid = _apd[i].versions[0].cMsgId;
					}
				}
				if(!!msgid)
					return parseInt(msgid) <= parseInt(_docObj.ODWDCM.CLOSE_MSG_ID);	// 新增文稿的msgId小於發文/結案的msgId就是發文/結案前所新增的文稿
				else if("fileName" in d)	// 本流程新增的
					return false;
				else
					theLogger.error("從AOLProcessData.xml找不到GUID:" + d.guid + "的文稿, 無法判斷是否為結案前新增");
			}
			return false;
		},
		// 1100506 Raymond 1100296 自動產生文稿批示單
		autoGenInstructionSheet: function(subject, senders) {
			var dfd = $.Deferred();
			/*function syncSubjectAndSenders(xmlDoc) {	// 新增文稿批示單時同步設定主旨及發文機關
				var $subj = $(xmlDoc.documentElement).find("主旨 文字");
				if($subj.length) {
					if("text" in $subj.get(0))
						$subj.get(0).text = subject;
					else
						$subj.get(0).textContent = subject;
				}
				// 1060516 Raymond 1060245 新增帶入發文機關內容
				if(!!senders && senders.length > 0) {
					var $sndr = $(senders[0]);
					var sndrName = $sndr.find("全銜").text(),
						sndrNo = $sndr.find("機關代碼").text(),
						sndrUn = $sndr.find("承辦單位").text();	// 1080326 Raymond 1070350 新增帶入承辦單位
					var $target = $(xmlDoc.documentElement).find("發文機關列表 發文機關");
					if($target.length) {
						var $nm = $target.find("全銜");
						if($nm.length) {
							if("text" in $nm.get(0))
								$nm.get(0).text = sndrName;
							else
								$nm.get(0).textContent = sndrName;
							theLogger.warn("設定文稿批示單的'發文機關列表/發文機關/機關全銜'為'" + sndrName + "'");
						}
						else
							theLogger.warn("文稿批示單無'發文機關列表/發文機關/機關全銜'節點, 無法設定發文機關資訊");
						var $no = $target.find("機關代碼");
						if($no.length) {
							if("text" in $no.get(0))
								$no.get(0).text = sndrNo;
							else
								$no.get(0).textContent = sndrNo;
							theLogger.warn("設定文稿批示單的'發文機關列表/發文機關/機關代碼'為'" + sndrNo + "'");
						}
						else
							theLogger.warn("文稿批示單無'發文機關列表/發文機關/機關代碼'節點, 無法設定發文機關資訊");
						// 1080326 Raymond 1070350 新增帶入承辦單位
						var $un = $target.find("承辦單位");
						if($un.length) {
							if("text" in $un.get(0))
								$un.get(0).text = sndrUn;
							else
								$un.get(0).textContent = sndrUn;
							theLogger.warn("設定文稿批示單的'發文機關列表/發文機關/承辦單位'為'" + sndrUn + "'");
						}
						else
							theLogger.warn("文稿批示單無'發文機關列表/發文機關/承辦單位'節點, 無法設定發文機關資訊");
					}
					else
						theLogger.warn("文稿批示單無'發文機關列表/發文機關'節點, 無法設定發文機關資訊");
				}
				else
					theLogger.warn("文稿無發文機關資訊, 忽略帶入文稿批示單");
			}*/
			var that = this;
			if(typeof _currMgmt !== "undefined") {
				// 搜尋文稿批示單樣版
				function recursive(nd) {
					for(var i=0; i<nd.children.length; i++) {
						if(nd.children[i].type == 1){	// RsrcConst.FILE
							if(nd.children[i].docType == "文稿批示單") {
								theLogger.log("找到'文稿批示單'樣版(" + nd.children[i].remote.path + ")");
								return nd.children[i];
							}
						}
						else {	// RsrcConst.DIR
							var child = nd.children[i];
							var res = recursive(child);
							if(res)
								return res;
						}
					}
				}
				var res = null;
				thePublicRsrc.enumDirs("樣版", function(dir) {
					res = recursive(dir);
					if(res)
						return false;
				});
				if(res) {
					that.newDraft(res).done(function(idx, adjustOrderParam) {
						that.accquireDraftModel(idx).done(function(dm) {
							// 1091111 Raymond 1090756 自動新增文稿批示單時, 將根節點的NewDraft屬性設為'N'
							dm.attr("/*/@NewDraft", "N");
							// 1090513 Raymond 1090223 新增第2個參數傳入true, 表示此文稿批示單dm是新增的, 第3參數直接將newDraft回傳的adjustOrderParam傳入
							dfd.resolve(dm, true, adjustOrderParam);
						});
					})
					.fail(function(errorText) {
						theLogger.error("新增文稿批示單失敗, " + errorText);
						dfd.reject(errorText);
					});
				}
				else {
					theLogger.error("找不到'文稿批示單'的樣版檔, 無法自動新增");
					dfd.reject("找不到'文稿批示單'的樣版檔, 無法自動新增");
				}
			}
			else {
				theLogger.error("無可編輯的文稿管理檔可自動新增文稿批示單");
				dfd.reject("無可編輯的文稿管理檔可自動新增文稿批示單");
			}
			return dfd.promise();
		},
		// 1100512 Raymond 1090821 判斷是否為外會公文的外機關文稿
		isExorgDraft: function(index) {
			if(_docObj.signType == "P")
				return false;
			
			if(index < 0 || index >= _signFolder.getDraftCounts())
				throw new Error("要求取得第" + index + "個文稿資訊, 超出範圍");
			var draft = _signFolder.getDraft(index);
			if("comOrgNo" in draft) {
				theLogger.log("第" + index + "個文稿是外機關(" + draft.comOrgNo + ", " + draft.comOrgName + ")文稿");
				return true;
			}
			return false;
		},
		// 1100519 Raymond 1100298 是否允許「修改」他流程所新增之文字意見
		isEnableCoverOtherTextObj: function(otherSO) {
			// 1140926 Raymond 1140818 V5再變更需求項目6, 判斷新增的環境變數「AOL_DISABLE_MODIFY_CON_OD99_TEXT_COMMENT」若設為"Y", 則停用「修改」他流程所新增之文字意見的功能
			if(theSSO.User.EnvSettings.get("AOL_DISABLE_MODIFY_CON_OD99_TEXT_COMMENT") == "Y")
				theLogger.log("環境變數「AOL_DISABLE_MODIFY_CON_OD99_TEXT_COMMENT」='Y', 停用「修改」他流程所新增之文字意見的功能");
			else
			if(_isConUnit && _docObj.ownRoleId != "OD99") {	// 條件一、會辦公文 & 條件二、非承辦人角色
				var charger = _signFolder.getFlowCharger(otherSO.flowId);
				if(!!charger) {
					var orgNode = SSOUtil.getOrgNode(_docObj.sourceOrgNo);
					if(orgNode) {
						var otherOU = SSOUtil.getOrgUnitNoByName(orgNode, charger.ou);
						if(otherOU.length > 1 && otherOU.length < 4) {	// 此功能設計條件限於單位代碼在2~3碼範圍內
							if(_docObj.ownOUId.length == 3)	// 條件三、二級受會單位長官只能修改同二級單位之他流程文字意見
								return _docObj.ownOUId == otherOU;
							else if(_docObj.ownOUId.length == 2)	// 條件四、一級受會單位長官能修改同一、二級單位之他流程文字意見
								return _docObj.ownOUId == (otherOU.substr(0, 2));
							else
								theLogger.error("目前使用者的單位代碼(ownOUId:" + _docObj.ownOUId + ")長度異常!");
						}
						else if(otherOU.length > 0)
							theLogger.error("查詢OrgInfo簽核物件之異動資訊簽核人員單位(" + charger.ou + ")之代碼(" + otherOU + ")長度異常!");
						else
							theLogger.error("查詢OrgInfo簽核物件之異動資訊簽核人員單位(" + charger.ou + ")之代碼失敗!");
					}
					else
						theLogger.error("找不到'" + _docObj.sourceOrgNo + "'的OrgInfo節點");
				}
				else
					theLogger.error("找不到他流程文字意見簽核物件(flowId:" + otherSO.flowId + ")的異動資訊!'");
			}
			return false;
		},
		// 1100531 Raymond 1100296 自動新增文稿批示單功能啟用時, 傳送及核章前檢核公文內必須有存查批示單或文稿批示單才可傳送
		checkInstructionSheet: function() {
			var hasInstructionSheet = false;
			if(_docObj.signType == "P") {
				var all = _currMgmt.getAllDrafts();
				for(var i=0; i<all.length; i++) {
					var dt = all[i].docType;
					// 1140701 Raymond 1140919 修改為變數判定
					//if(dt == "存查批示單" || dt == "文稿批示單") {
					if(dt == _autoGenInstructionSheet2ndDocType || dt == "文稿批示單") {
						theLogger.log("環境變數'WE_AUTO_GEN_文稿批示單'為啟用(Y), 公文內有" + dt + ", 允許傳送");
						hasInstructionSheet = true;
						break;
					}
				}
			}
			else {
				var n = _signFolder.getDraftCounts();
				for(var i=0; i<n; i++) {
					var d = _signFolder.getDraft(i);
					if("fromType" in d) {
						theLogger.log("第" + i + "個文稿是電子來文, 忽略");
						continue;
					}
					else if(d.name == "來文簽辦") {
						theLogger.log("第" + i + "個文稿是來文簽辦, 忽略");
						continue;
					}
					// 1140701 Raymond 1140919 修改為變數判定
					//if(d.docType == "存查批示單" || d.docType == "文稿批示單") {
					if(d.docType == _autoGenInstructionSheet2ndDocType || d.docType == "文稿批示單") {
						theLogger.log("環境變數'WE_AUTO_GEN_文稿批示單'為啟用(Y), 公文內有" + d.docType + ", 允許傳送");
						hasInstructionSheet = true;
						break;
					}
				}
			}
			if(!hasInstructionSheet) {
				// 1140701 Raymond 1140919 修改為變數判定
				//theLogger.log("環境變數'WE_AUTO_GEN_文稿批示單'為啟用(Y), 公文內無存查批示單或文稿批示單, 禁止傳送");
				//alert("此公文無「文稿批示單」或「存查批示單」，請新增後再傳送!");
				theLogger.log("環境變數'WE_AUTO_GEN_文稿批示單'為啟用(Y), 公文內無" + _autoGenInstructionSheet2ndDocType + "或文稿批示單, 禁止傳送");
				alert("此公文無「文稿批示單」或「" + _autoGenInstructionSheet2ndDocType + "」，請新增後再傳送!");
				return false;
			}
			return true;
		},
		// 1110317 Raymond 1101578 新增取得目前公文所在流程點的角色名稱
		getOwnRoleName: function() {
			if(!!_docObj.ownRoleName && _docObj.ownRoleName.length > 0)
				return _docObj.ownRoleName;
			if(!!_docObj.ownRoleId && _docObj.ownRoleId.length > 0 && !!_docObj.sourceOrgNo)
				return SSOUtil.getOrgRoleName(SSOUtil.getOrgNode(_docObj.sourceOrgNo), _docObj.ownOUId, _docObj.ownRoleId);
			return _docObj.ownRoleId || "";
		},
		// 1110324 Raymond 1101578 新增取得指定附件是否有異動
		getDraftAttModified: function(draftIdx, idx) {
			if(!!_cachedDM[draftIdx]) {
				return _cachedDM[draftIdx].getAttachModified(idx);
			}
		},
		// 1110408 Raymond 1101578 新增取得目前公文的承辦人姓名
		getICUserName: function() {
			return _docObj.ICUserName;
		},
		// 1110418 Raymond 1110088 新增以index取得文稿原本匯出頁面所使用的PrintXSL全徑名(供另存HTML功能判斷套用哪一個匯出XSL)
		getDraftOrigPrintXSLByIndex: function(index) {     // index指封裝檔中的序
			if(_docObj.signType == "P") {	// 紙本簽核
				if(index >= 0 && index < _currMgmt.getDraftCounts())
					return _currMgmt.getDraftOrigPrintXSL(index);
				throw new Error("要求取得第" + index + "個文稿原本匯出頁面所使用的PrintXSL全徑名, 超出範圍");
			}
			else if(index < 0 || index >= _signFolder.getDraftCounts()) {
				if(index >= 0 && _currMgmt && index < _currMgmt.getDraftCounts())	// 新增文稿只會記錄在文稿管理檔
					return _currMgmt.getDraftOrigPrintXSL(index);
				throw new Error("要求取得第" + index + "個文稿原本匯出頁面所使用的PrintXSL全徑名, 超出範圍");
			}
			var draft = _signFolder.getDraft(index);
			if("fromType" in draft)
				return undefined;	// 來文內容無
			if(draft.name == "來文簽辦")
				return undefined;	// 來文簽辦無
			if(!!draft.applyPrintXSL)
				return draft.applyPrintXSL;
			var guid = _lookupDraftGUID(draft.id);  // 透過AOLProcessData.xml尋找對應索引值的文稿GUID
			if(!!guid)
				return this.getDraftOrigPrintXSL(guid);
			theLogger.error("找不到指定ID:" + draft.id + "的文稿GUID, 無法取得原本匯出頁面所使用的PrintXSL全徑名");
			return undefined;
		},
		// 1110531 Raymond 1110527 新增取得目前公文所在流程點的角色代碼
		getOwnRoleId: function() {
			return _docObj.ownRoleId;
		},
		//1120222	Leslie[1110881]	銓敘部-序14，新增支援紙本草稿轉正式公文，稿件路徑需一併更新
		doNoChangedAfterDraftToMain: function(){
			if(_currMgmt !== 'undefined')
				_currMgmt.doNoChangedAfterDraftToMain(this.subDirPath + "\\" + _docObj.docNo + "-"+ "00-99");
		},
		// 1140422	Leslie[1131282]	[退輔會]增修草稿依設定是否啟用自動要號功能，新增取號方法供列印簽核文件前使用
		reqDocNo: function() {
			var that = this;
			var dfd = $.Deferred();
			var reqDocNoUrl = theUserInfo.WSDL4GetDocNo;
			theLogger.log("傳送前檢核尚未設定公文文號需自動取號, 呼叫要號WS(" + reqDocNoUrl + ")...");
			theWebServices.invokeWS(reqDocNoUrl, "GetNo", "T2100", {OrgNo: _docObj.sourceOrgNo, Deptment: _docObj.ICOUId}, true, function(r) {
				theLogger.log("要號WS回傳:'" + r + "'");
				if(r.match(/錯誤：/g)) {
					alert(r.substr(3));
					dfd.reject(r);
				}
				else {
					// 儲存文號
					that.setDocNo(r, true)	// 第2參數傳入true表示是線上取得的文號
					.then(function(){
						if(!theSSO || theSSO.offlineMode != true) 
							return theAOL.autoSaveForDraftDocNoChange();
						else{
							let _dfd2 = $.Deferred();
							_dfd2.resolve();
							return _dfd2.promise();
						}
					})
					.done(function() {
						$("#aol #tabbar a").filter(function() {		// 取號後更新頁籤文字
							var res = (this.id == "folio_" + _docObj.msgId || this.textContent == '[尚未取號]');
							
							return res;
						}).text(r);	// 設定頁籤文號
						$("#aol #leftPart .pages").flip("refresh");	// 2016.7.21 要號後刷新文面
						dfd.resolve();
					})
					.fail(function(err) {
						theLogger.error("要號後，自動儲存至公文目錄發生異常! " + err.errCode + ":" + err.errMsg);
						alert("要號後，自動儲存至公文目錄發生異常!\n\n" + err.errCode + ":" + err.errMsg + "\n\n 請檢查相關附件檔案是否需重新加入。");	// 2016.10.11 FIX
					});
				}
			});
			return dfd.promise();
		},
		// 1120314 Raymond 1111133 新增判斷是否可寫入承辦單位(文號-00-99子目錄)的文稿管理檔
		isICOUDraftMgmtEditable: function() {
			var dir = (_docObj.docNo.length > 0)?_docObj.docNo + "-00-99":"00-99";
			if(dir in _draftMgmts)
				return _draftMgmts[dir].getEditable();
			return false;
		},
		// 1120314 Raymond 1111133 新增設定來文附件名稱
		setFromDocAttName: function(attIdx, txt) {
			var dir = (_docObj.docNo.length > 0)?_docObj.docNo + "-00-99":"00-99";
			if(dir in _draftMgmts)
				_draftMgmts[dir].setFromDocAttName(attIdx, txt);
		},
		// 1120314 Raymond 1111133 新增取得重新命名過的來文附件名稱
		getFromDocAttName: function(attIdx, txt) {
			var dir = (_docObj.docNo.length > 0)?_docObj.docNo + "-00-99":"00-99";
			if(dir in _draftMgmts)
				return _draftMgmts[dir].getFromDocAttName(attIdx, txt);
		},
		// 1130117 Raymond 1121045 新增回傳線上簽核公文是否有來文
		hasFromDoc: function() {
			return _docObj.signType == "E" && _signFolder.hasFromDoc();
		},
		// 1130521 Raymond 信保序113 新增設定文稿的文別
		setDraftDocType: function(guid, docType) {
			if(_docObj.signType == "P") {
				theLogger.warn("紙本簽核忽略設定文別");
				return;
			}
			var n = _signFolder.getDraftCounts();
			for(var i=0; i<n; i++) {
				var d = _signFolder.getDraft(i);
				if("fromType" in d) {
					theLogger.log("第" + i + "個文稿是電子來文, 忽略");
					continue;
				}
				else if(d.name == "來文簽辦") {
					theLogger.log("第" + i + "個文稿是來文簽辦, 忽略");
					continue;
				}
				if(d.guid == guid) {
					if(!d.docType) {
						theLogger.log("文稿未設定文別, 重設為'" + docType + "'");
						d.docType = docType;
					}
					else if(d.docType != docType) {
						theLogger.warn("文稿已設定文別'" + d.docType + "', 重設為'" + docType + "'");
						d.docType = docType;
					}
					break;
				}
			}
		},
		// 1130521 Raymond 信保序113 新增設定文稿的函類別
		setDraftSubDocType: function(guid, subDocType) {
			if(_docObj.signType == "P") {
				theLogger.warn("紙本簽核忽略設定函類別");
				return;
			}
			var n = _signFolder.getDraftCounts();
			for(var i=0; i<n; i++) {
				var d = _signFolder.getDraft(i);
				if("fromType" in d) {
					theLogger.log("第" + i + "個文稿是電子來文, 忽略");
					continue;
				}
				else if(d.name == "來文簽辦") {
					theLogger.log("第" + i + "個文稿是來文簽辦, 忽略");
					continue;
				}
				if(d.guid == guid) {
					if(!d.subDocType) {
						theLogger.log("文稿未設定函類別, 重設為'" + subDocType + "'");
						d.subDocType = subDocType;
					}
					else if(d.subDocType != subDocType) {
						theLogger.warn("文稿已設定函類別'" + d.subDocType + "', 重設為'" + subDocType + "'");
						d.subDocType = subDocType;
					}
					break;
				}
			}
		},
		// 1130809 Raymond 1130313 合併1111007(1100394), 新增匯入離線模式下另存整份公文的ZIP壓縮檔功能
		newDraftsFromZip: function(zipBlb) {
			var dfd = $.Deferred();
			var that = this;
			var xhr = new XMLHttpRequest();
			xhr.open('GET', zipBlb, true);
			xhr.responseType = 'arraybuffer';//'blob';	使用blob的話, 在WIN7環境下開啟大於7MB的ZIP檔會沒反應
			xhr.onload = function(e) {
				if (this.status == 200) {
					console.log("\t'" + zipBlb + "'(" + this.response.type + ", " + this.response.size + " bytes)");
					nsEditor.importZippedFolio(that, _views[0], this.response, dfd);
				}
			};
			xhr.onerror = function(e) {
				theLogger.error("失敗!", e);
				alert("讀取ZIP失敗!\r\n" + e.message);
				dfd.reject(e.message);
			};
			xhr.send();
			return dfd.promise();
		},
		//1130909	Leslie[1130691]	新增取得所有稿件附件總容量
		getDocAttachTotalSize: function(bypassGuid){
			var _total = 0;
			//計算附件容量，只能由稿件中的紀錄取得
			for(var i=0,iMax = _cachedDM.length;i<iMax;i++){
				if(bypassGuid != _cachedDM[i].getDraftGUID()){
					for(var j=0,jMax = _cachedDM[i].getAttachFileCounts();j<jMax;j++){
						let nd = _cachedDM[i].getAttachFile(j);
						if(nd){
							_total += parseInt($(nd).attr("大小"))||0;
						}					
					}
				}
			}		
			return _total;
		},
		// 1140122 Raymond 1131303 新增取得錯別字校正資料物件方法
		getFixWordData: function() {
			return _fixWordData;
		},
		// 1140304 Raymond 1131303 高亮稿面上的錯別字
		highlightChar: function(fwo, lidx) {
			if(!fwo && lidx >= 0) {
				// 翻頁重整後, 本來的fwo.$para會失效, 要從錯別字校正清單中重新取得fwo物件
				fwo = $("#fixWordList").find("li").eq(lidx).data("fixWord");
				$("#fixWordList").find("li").eq(lidx).addClass("ui-li-active");
			}
			if(_views.length > 0) {
				var po = _views[0].currPo();
				var cdi = _views[0].currDraftIndex();
				if(cdi >= 0) {
					var cdm = _cachedDM[cdi];
					if(!!cdm && cdm.getDraftGUID() == fwo.draftGUID) {
						fwo.$para.closest("DIV[name='flow']").find(".checkedError").removeClass("focused");
						if(fwo.$para.attr("data-po") == po) {	// 錯別字在目前頁次
							var $ce = fwo.$para.find(".checkedError").filter((idx, ce) => {
								var fwo2 = $(ce).data("fixWord");
								console.log(idx, ce, fwo2);
								console.log(fwo2 == fwo);
								return fwo2 == fwo;
							}).addClass("focused");
							var rng = document.createRange();
							rng.selectNodeContents($ce[0]);
							var brc = rng.getBoundingClientRect();
							console.log(brc);
							var $cp = fwo.$para.closest(".contentPane");
							var cpofs = $cp.offset();
							var brc2 = {left: brc.left - cpofs.left, top: brc.top - cpofs.top, right: brc.right - cpofs.left, bottom: brc.bottom - cpofs.top, width: brc.width, height: brc.height};
							console.log(brc2);
							var st = $cp[0].scrollTop;
							var sh = $cp[0].scrollHeight;
							var ch = $cp[0].clientHeight;
							if(brc2.top < 0)	// 錯別字在目前可見範圍上面
								$cp[0].scrollTop = brc2.top;
							else if(brc2.bottom > ch)	// 錯別字在目前可見範圍下面
								$cp[0].scrollTop = brc2.bottom - ch;
						}
						else if(fwo.$para.attr("data-po") !== undefined) {
							_views[0].goToAnyPage(cdi, -1, fwo.$para.attr("data-po"));
							setTimeout(arguments.callee, 50, null, lidx);
						}
					}
				}
			}
			else
				console.error("_views.length = " + _views.length);
		},
		// 1140306 Raymond 1131303 新增取得錯別字所在稿序及頁次資訊
		getFixWordHintText: function(fwo) {
			function _getDraftName() {
				for(dir in _draftMgmts) {
					var idx = _draftMgmts[dir].getDraftIndex(fwo.draftGUID);
					if(idx >= 0)
						return _draftMgmts[dir].getDraftName(idx);
				}
				return null;
			}
			return _getDraftName() + " P" + (Number(fwo.$para.attr("data-po")) + 1);
		},
		// 1140623 Raymond 1131303 新增回傳所有稿件GUID的Array
		getAllDraftGUIDs: function() {
			var res = [];
			if(_docObj.signType == "P") {	// 2016.6.22 支援紙本簽核
				for(var i=0, n=_currMgmt.getDraftCounts(); i<n; i++)
					res.push(_currMgmt.getDraftGUID(i));
			}
			else {
				for(var i=0, n=_signFolder.getDraftCounts() - (_signFolder.hasFromDoc()?1:0); i<n; i++) {
					var draft = _signFolder.getDraft(i);
					res.push(draft.guid);
				}
			}
			return res;
		},
		// 1140701 Raymond 1140919 新增將區域變數expose
		isAutoGenInstructionSheetEnabled: function() {
			return _autoGenInstructionSheet;	// 原單1100296的是否啟用自動新增文稿批示單
		},
		getAutoGenInstructionSheet2ndDocType: function() {
			return _autoGenInstructionSheet2ndDocType;	// 擴充變數後的判定文別, 若有設定的話應為"便簽"
		},
		// 1140723 Raymond 1140818 新增取得文稿的產生時間
		getDraftCreateTime: function(idx) {
			if(_docObj.signType == "P") {	// 2016.6.22 支援紙本簽核
				if(idx >= 0 && idx < _currMgmt.getDraftCounts())
					return _currMgmt.getDraftCreateTime(idx);
				throw new Error("要求取得第" + idx + "個文稿產生時間, 超出範圍");
			}
			else if("isRefDoc" in this && this.isRefDoc()) {	// 2016.12.29 參照公文不用找對應文稿, 直接回傳draft物件的name
				if(idx < 0 || idx >= _signFolder.getDraftCounts())
					throw new Error("要求取得第" + idx + "個文稿產生時間, 超出範圍");
				var draft = _signFolder.getDraft(idx);
				if("fromType" in draft)
					return "";
				return draft.time;
			}
			else if(_docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {// 信保特殊模式無文稿管理
				return _signFolder.getDraft(idx).createTime;
			}
			else if(idx < 0 || idx >= _signFolder.getDraftCounts()) {
				if(idx >= 0 && _currMgmt && idx < _currMgmt.getDraftCounts())	// 2016.6.17 新增文稿只會記錄在文稿管理檔
					return _currMgmt.getDraftCreateTime(idx);
				throw new Error("要求取得第" + idx + "個文稿產生時間, 超出範圍");
			}
			var draft = _signFolder.getDraft(idx);
			if("fromType" in draft)
				return draft.time;
			if(draft.name == "來文簽辦")	// 2016.1.15 新增來文簽辦型態
				return draft.time;
			var guid = _lookupDraftGUID(draft.id);  // 透過AOLProcessData.xml尋找對應索引值的文稿GUID
			// 2016.2.1 文稿管理檔改成複數, KEY為子目錄名稱
			for(dir in _draftMgmts) {
				var idx = _draftMgmts[dir].getDraftIndex(guid);	// 改用getDraftIndex(GUID)來確定該文稿是否存在於這個文稿管理檔中
				if(idx >= 0)
					return _draftMgmts[dir].getDraftCreateTime(idx);
			}
			return null;	// 都找不到才回傳null
		},
		// 1140814 Raymond 1140818 新增取得APD中指定文稿的最後一個版本
		getDraftLastVerAPD: function(draft) {
			for(var i=0; i<_apd.length; i++) {
				for(var j=_apd[i].versions.length-1; j>=0; j--) {
					if(_apd[i].versions[j].id == draft.id) {
						theLogger.warn("AOLProccessData.xml中找到文稿ID:" + draft.id + "所對應的文稿的版本[" + j + "]");
						return _apd[i].versions[j];
					}
				}
			}
			theLogger.warn("AOLProccessData.xml中找不到文稿ID:" + draft.id + "所對應的文稿的版本");
			return null;
		},
		// 1141021 Raymond 1141125 新增匯入調派令CSV自動產生多人調派令稿功能
		newTAITRACSVDraft: function(csvstr) {
			var dfd = $.Deferred();
			// utility for IE-compatible
			function setText(nd, txt) {
				if("text" in nd)
					nd.text = txt;
				else
					nd.textContent = txt;
				return nd;
			}
			
			// 讀入CSV
			theLogger.log("匯入調派令CSV:");
			try {
				var data = $.csv.toArrays(csvstr);
				theLogger.log(data);
			}
			catch(e) {
				theLogger.error(e.stack);
				dfd.reject(e.message);
				return dfd.promise();
			}
			
			// 設定多人格式調派令內容callback
			function setContextMultiForm(xmlDoc) {
				var $docElm = $(xmlDoc.documentElement);
				// 帶入段落內容
				if(!!data && data.length > 1) {
					var $target = $docElm.find("段落").eq(0).empty();
					for(var i=1; i<data.length; i++) {
						var $it = $(xmlDoc.createElement("條列")).appendTo($target).attr("序號", Util.translateNumber(i, false) + "、");
						$it.append('<文字>' + data[i][0]?.replace(/\n/g, '') + '</文字>');
						
						var $it2 = $(xmlDoc.createElement("條列")).appendTo($it).attr("序號", "(一)");
						$it2.append('<文字>區分：' + data[i][1] + '</文字>');
						
						$it2 = $(xmlDoc.createElement("條列")).appendTo($it).attr("序號", "(二)");
						$it2.append('<文字>新派服務單位及職稱：' + data[i][2] + '</文字>');
						
						$it2 = $(xmlDoc.createElement("條列")).appendTo($it).attr("序號", "(三)");
						$it2.append('<文字>原派服務單位及職稱：' + data[i][3] + '</文字>');
						
						$it2 = $(xmlDoc.createElement("條列")).appendTo($it).attr("序號", "(四)");
						$it2.append('<文字>生效日期：' + data[i][4] + '</文字>');
						
						$it2 = $(xmlDoc.createElement("條列")).appendTo($it).attr("序號", "(五)");
						$it2.append('<文字>備註：' + data[i][5] + '</文字>');
					}
				}
			}
			
			var that = this;
			if(typeof _currMgmt !== "undefined") {
				// 搜尋相符的資源檔名
				function recursive(nd, fn) {
					for(var i=0; i<nd.children.length; i++) {
						if(nd.children[i].type == 1){	// RsrcConst.FILE
							if(nd.children[i].remote.path == fn) {
								theLogger.log("找到'" + fn + "'樣版(" + nd.children[i].name + ")");
								return nd.children[i];
							}
						}
						else {	// RsrcConst.DIR
							var child = nd.children[i];
							var res = recursive(child, fn);
							if(res)
								return res;
						}
					}
				}
				const tmplFn = "611調派令_稿(多人格式).xml";
				var res = null;	// 搜尋對應的多人調派令Template檔
				thePublicRsrc.enumDirs("樣版", function(dir) {
					res = recursive(dir, tmplFn);
					if(!!res)
						return false;
				});
				if(!!res) {
					that.newDraft(res, setContextMultiForm).done(function(idx) {	// 從樣版新增多人格式調派令呼叫setContextMultiForm
						theLogger.log("新增多人格式調派令成功, 文稿頁籤#" + idx);
						
						dfd.resolve(idx);// 產生多人格式調派令稿後即可回傳
					})
					.fail(function(errorText) {
						theLogger.error("新增多人格式調派令失敗, " + errorText);
						dfd.reject(errorText);
					});
				}
				else {
					theLogger.error(`找不到'${tmplFn}'的樣版檔, 無法自動新增`);
					dfd.reject(`找不到'${tmplFn}'的樣版檔, 無法自動新增`);
				}
			}
			else {
				theLogger.error("無可編輯的文稿管理檔可自動新增多人格式調派令稿");
				dfd.reject("無可編輯的文稿管理檔可自動新增多人格式調派令稿");
			}
			return dfd.promise();
		},
		// 1141022 Raymond 1141125 新增匯入晉升令CSV自動產生多人晉升令稿功能
		newTAITRACSV2Draft: function(csvstr) {
			var dfd = $.Deferred();
			// utility for IE-compatible
			function setText(nd, txt) {
				if("text" in nd)
					nd.text = txt;
				else
					nd.textContent = txt;
				return nd;
			}
			
			// 讀入CSV
			theLogger.log("匯入晉升令CSV:");
			try {
				var data = $.csv.toArrays(csvstr);
				theLogger.log(data);
			}
			catch(e) {
				theLogger.error(e.stack);
				dfd.reject(e.message);
				return dfd.promise();
			}
			
			// 設定多人格式晉升令內容callback
			function setContextMultiForm(xmlDoc) {
				var $docElm = $(xmlDoc.documentElement);
				// 帶入段落內容
				if(!!data && data.length > 1) {
					var $target = $docElm.find("段落").eq(0).empty();
					for(var i=1; i<data.length; i++) {
						var $it = $(xmlDoc.createElement("條列")).appendTo($target).attr("序號", Util.translateNumber(i, false) + "、");
						$it.append('<文字>' + data[i][0]?.replace(/\n/g, '') + '</文字>');
						
						var $it2 = $(xmlDoc.createElement("條列")).appendTo($it).attr("序號", "(一)");
						$it2.append('<文字>區分：' + data[i][1] + '</文字>');
						
						$it2 = $(xmlDoc.createElement("條列")).appendTo($it).attr("序號", "(二)");
						$it2.append('<文字>新派服務單位及職稱：' + data[i][2] + '</文字>');
						
						$it2 = $(xmlDoc.createElement("條列")).appendTo($it).attr("序號", "(三)");
						$it2.append('<文字>原派服務單位及職稱：' + data[i][3] + '</文字>');
						
						$it2 = $(xmlDoc.createElement("條列")).appendTo($it).attr("序號", "(四)");
						$it2.append('<文字>生效日期：' + data[i][4] + '</文字>');
					}
				}
			}
			
			var that = this;
			if(typeof _currMgmt !== "undefined") {
				// 搜尋相符的資源檔名
				function recursive(nd, fn) {
					for(var i=0; i<nd.children.length; i++) {
						if(nd.children[i].type == 1){	// RsrcConst.FILE
							if(nd.children[i].remote.path == fn) {
								theLogger.log("找到'" + fn + "'樣版(" + nd.children[i].name + ")");
								return nd.children[i];
							}
						}
						else {	// RsrcConst.DIR
							var child = nd.children[i];
							var res = recursive(child, fn);
							if(res)
								return res;
						}
					}
				}
				const tmplFn = "613晉升令_稿(多人格式).xml";
				var res = null;	// 搜尋對應的多人晉升令Template檔
				thePublicRsrc.enumDirs("樣版", function(dir) {
					res = recursive(dir, tmplFn);
					if(!!res)
						return false;
				});
				if(!!res) {
					that.newDraft(res, setContextMultiForm).done(function(idx) {	// 從樣版新增多人格式晉升令呼叫setContextMultiForm
						theLogger.log("新增多人格式晉升令成功, 文稿頁籤#" + idx);
						
						dfd.resolve(idx);// 產生多人格式晉升令稿後即可回傳
					})
					.fail(function(errorText) {
						theLogger.error("新增多人格式晉升令失敗, " + errorText);
						dfd.reject(errorText);
					});
				}
				else {
					theLogger.error(`找不到'${tmplFn}'的樣版檔, 無法自動新增`);
					dfd.reject(`找不到'${tmplFn}'的樣版檔, 無法自動新增`);
				}
			}
			else {
				theLogger.error("無可編輯的文稿管理檔可自動新增多人格式晉升令稿");
				dfd.reject("無可編輯的文稿管理檔可自動新增多人格式晉升令稿");
			}
			return dfd.promise();
		},
		// 1141022 Raymond 1141125 新增匯入獎勵令CSV自動產生多人獎勵令稿功能
		newTAITRACSV3Draft: function(csvstr) {
			var dfd = $.Deferred();
			// utility for IE-compatible
			function setText(nd, txt) {
				if("text" in nd)
					nd.text = txt;
				else
					nd.textContent = txt;
				return nd;
			}
			
			// 讀入CSV
			theLogger.log("匯入獎勵令CSV:");
			try {
				var data = $.csv.toArrays(csvstr);
				theLogger.log(data);
			}
			catch(e) {
				theLogger.error(e.stack);
				dfd.reject(e.message);
				return dfd.promise();
			}
			
			// 設定多人格式獎勵令內容callback
			function setContextMultiForm(xmlDoc) {
				var $docElm = $(xmlDoc.documentElement);
				// 帶入段落內容
				if(!!data && data.length > 1) {
					var $target = $docElm.find("段落").eq(0).empty();
					for(var i=1; i<data.length; i++) {
						var $it = $(xmlDoc.createElement("條列")).appendTo($target).attr("序號", Util.translateNumber(i, false) + "、");
						$it.append('<文字>' + data[i][0]?.replace(/\n/g, '') + '</文字>');
						
						var $it2 = $(xmlDoc.createElement("條列")).appendTo($it).attr("序號", "(一)");
						$it2.append('<文字>單位：' + data[i][1] + '</文字>');
						
						$it2 = $(xmlDoc.createElement("條列")).appendTo($it).attr("序號", "(二)");
						$it2.append('<文字>獎勵事由：' + data[i][2] + '</文字>');
						
						$it2 = $(xmlDoc.createElement("條列")).appendTo($it).attr("序號", "(三)");
						$it2.append('<文字>獎勵種類：' + data[i][3] + '</文字>');
					}
				}
			}
			
			var that = this;
			if(typeof _currMgmt !== "undefined") {
				// 搜尋相符的資源檔名
				function recursive(nd, fn) {
					for(var i=0; i<nd.children.length; i++) {
						if(nd.children[i].type == 1){	// RsrcConst.FILE
							if(nd.children[i].remote.path == fn) {
								theLogger.log("找到'" + fn + "'樣版(" + nd.children[i].name + ")");
								return nd.children[i];
							}
						}
						else {	// RsrcConst.DIR
							var child = nd.children[i];
							var res = recursive(child, fn);
							if(res)
								return res;
						}
					}
				}
				const tmplFn = "614獎勵令_稿(多人格式).xml";
				var res = null;	// 搜尋對應的多人獎勵令Template檔
				thePublicRsrc.enumDirs("樣版", function(dir) {
					res = recursive(dir, tmplFn);
					if(!!res)
						return false;
				});
				if(!!res) {
					that.newDraft(res, setContextMultiForm).done(function(idx) {	// 從樣版新增多人格式獎勵令呼叫setContextMultiForm
						theLogger.log("新增多人格式獎勵令成功, 文稿頁籤#" + idx);
						
						dfd.resolve(idx);// 產生多人格式獎勵令稿後即可回傳
					})
					.fail(function(errorText) {
						theLogger.error("新增多人格式獎勵令失敗, " + errorText);
						dfd.reject(errorText);
					});
				}
				else {
					theLogger.error(`找不到'${tmplFn}'的樣版檔, 無法自動新增`);
					dfd.reject(`找不到'${tmplFn}'的樣版檔, 無法自動新增`);
				}
			}
			else {
				theLogger.error("無可編輯的文稿管理檔可自動新增多人格式獎勵令稿");
				dfd.reject("無可編輯的文稿管理檔可自動新增多人格式獎勵令稿");
			}
			return dfd.promise();
		},
		// 1141107 Raymond 1141113 新增便利貼相關功能
		newNoteSN: function() {
			return ++_lastNoteSN;
		},
		getNoteCounts: function() {
			return _noteData.list.length;
		},
		getNote: function(idx) {
			if(idx >= 0 && idx < _noteData.list.length)
				return _noteData.list[idx];
			throw new Error("指定索引值超過範圍, 無法取得第" + idx + "個便利貼記錄");
		},
		addNote: function(note) {
			theLogger.log("加入便利貼(sn:" + note.sn + "):'" + ((note.content.length > 5)?note.content.substr(0, 5) + "...":note.content) + "'");
			let exist = false;
			for(let i=0; i<_noteData.list.length; i++) {
				if(_noteData.list[i].sn == note.sn) {
					theLogger.log("便利貼記錄中已存在sn=" + note.sn + "的記錄, 無法新增");
					exist = true;
					break;
				}
			}
			if(!exist)
				_noteData.list.push(note);
		},
		modifyNote: function(note) {
			theLogger.log("異動便利貼(sn:" + note.sn + "):");
			let found = false;
			for(let i=0; i<_noteData.list.length; i++) {
				if(_noteData.list[i].sn == note.sn) {
					theLogger.log("'" + _noteData.list[i].content + "'->");
					theLogger.log("'" + note.content + "'");
					found = true;
					break;
				}
			}
			if(!found)
				theLogger.error("便利貼記錄中找不到sn=" + note.sn + "的記錄");
		},
		delNote: function(note) {
			theLogger.log("刪除便利貼(sn:" + note.sn + "):'" + ((note.content.length > 5)?note.content.substr(0, 5) + "...":note.content) + "'");
			let found = false;
			for(let i=0; i<_noteData.list.length; i++) {
				if(_noteData.list[i].sn == note.sn) {
					_noteData.list.splice(i, 1);
					found = true;
					break;
				}
			}
			if(!found)
				theLogger.error("便利貼記錄中找不到sn=" + note.sn + "的記錄, 無法刪除");
		}
	};
}

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-FolioModel.js").finish();
})();