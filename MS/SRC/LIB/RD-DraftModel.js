// DraftModel class
//   
//	2015.12.15 - Raymond, 改用theLogger記錄LOG資訊
//	2016.10.25 - Raymond, 新增MailMergeTable支援分繕變數表相關功能
//
// DATE		SA			PRG			MGR_NO		DESC
// 1060526	Raymond		Raymond		1060337		讀取異動的欄位內容時, 轉換nbsp為sp
// 1060608	Raymond		Raymond		1060474		修正節點文字中有超過1組「<」、「>」字元時, 在編輯頁面會變成標籤問題
// 1060620	Raymond		Raymond		1060147		新增判斷文稿是否為匯入的
// 1060901	Leslie		Leslie		1060683		配合附件匯出可設定黑白或彩色，增修傳入相關屬性
// 1060913	Raymond		Raymond		1060735		新增取得原始套用的樣版檔名
// 1060921	Raymond		Raymond		1060709		IE在沒開F12的情況下log MSXML2.XMLDOMNode會丟出「物件不支援此屬性或方法」的Exception
// 1061026	Raymond		Raymond		1061053		修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
// 1061117	Raymond		Raymond		1061118		新增第3參數傳入新增的附件檔名節點, 供調換附件順序功能在下載原始檔後設定data-blob-name屬性
// 1061205	Raymond		Raymond		1061231		修正Chrome下取得css("text-decoration")會回傳包含"underline solid rgb(0,0,0)"這種值, 導致未記錄到底線樣式的問題
// 1061225	Raymond		Raymond		1060929		取得套用分繕變數前的XML時先轉換為完稿結果的XML, 再搜尋^變數, 以免追蹤修訂標籤影響變數名稱判斷
// 1070108	Raymond		Raymond		-------		修正開啟文稿時, 可能由MS-Common.js等客製化邏輯中預設、重設各欄位內容導致dirty狀態, 所衍生框外簽核物件未顯示問題
// 1070305	Raymond		Raymond		1061140		改用比對新舊差異方式重寫主旨、段落及條列的文字以避免特殊的輸入步驟產生錯誤的追蹤修訂標記
// 1070320	Raymond		Raymond		1070364		修正為比對非同一編輯階段所新增的文稿才是要追蹤修訂, 同一編輯階段所新增的文稿可能包括承辦人(sn=0)或長官或退回後的承辦人(sn!=0)
// 1070606	Raymond		Raymond		1070183		合併內政部功能新增分繕附件的記錄格式
// 1070608	Raymond		Raymond		1070197		不可異動文稿內容時, 透過setAllDraftText()等方法同步設定欄位內容的功能要擋掉
// 1071011	Raymond		Raymond		1061140		修正追蹤修訂時異動欄位文字內容比對差異寫回文稿的文字要將&<>"'等XML保留字元轉換為&amp;等Entity格式的文字
// 1071121	Raymond		Raymond		1071137		text()新增第3個參數mergeSegment, 在合併條列時設定此參數為true, 避免用比對差異方式產生追蹤修訂標記
// 1071128	Raymond		Raymond		1071187		修正在有錯誤追蹤修訂標記的條列刪除或異動後發生Exception, 導致整個條列未更新為刪除後內容的問題
// 1080121	Raymond		Raymond		1071187		修正刪除後翻頁再刪除會出現誤判第2次刪除的內容為新增的問題
// 1080219	Raymond		Raymond		1080089		修改分繕表物件的受文者記錄結構, 並增加新方法以對應新版的記錄結構
// 1080319	Raymond		Raymond		1080195		比對修改差異時判斷是否為BMP外的Unicode, 若是則以2個字組為1個字進行比對
// 1080326	Raymond		Raymond		1071137		applyChange時arguments.callee增加傳入mergeSegment參數, 若原本不要用比對差異方式產生追蹤修訂標記則子節點也不要比對
// 1080531	Raymond		Raymond		1080433		新增取得及設定文稿清單已異動旗標的方法
// 1080723	Raymond		Raymond		1080570		載入及儲存文稿時修復無效及錯誤的追蹤修訂標籤結構, 此異常會導致預覽列印及傳送匯出頁面中同一流程點新增又刪除的字被顯示出來
// 1081125	Raymond		Raymond		1081007		儲存文稿時, 新增一代文稿編輯已轉換粗斜體底線等符號標記屬性, 避免這些符號在用一代文稿編輯開啟時被轉成粗斜體底線等樣式的問題
// 1090115	Raymond		Raymond		1081166		儲存時若文稿的文別可支援匯出DI格式的話另存DI, 並設定應寫入SignWork.xml中的文稿檔名之副檔名為.DI
// 1090206	Raymond		Raymond		1070503		合併一代共通版也提供的CDC需求(1000194)的'正副本取代模式'功能
// 1090304	Raymond		Raymond		1080420		修正條列比對異動邏輯因選取文字直接打字遇原XML標記刪除字與目前HTML游標後字相同(異常樣態III)會發生誤判而標記新增, 導致已刪除字又出現的問題
// 1090327	Raymond		Raymond		1090134		修正IE下完稿模式下用拖拉方式若拖拉文字後方有隱藏的DEL元素, 會被一起拖拉, 重新整理後會變成新增文字的問題
// 1090903  Leslie      Zen         1090524     (信保基金)附件明細新增上傳人員、時間欄位
// 1100217	Raymond		Raymond		1090610		儲存公文時儲存線上簽核多產生的DI, 不要轉出群組受文者中的成員受文者, 以節省儲存所耗費時間
// 1100309	Raymond		Raymond		1090990		支援排版設定檔新增的「簽核類型」變數, 傳入目前公文的SignType
// 1100310	Raymond		Raymond		1090991		從樣版新增稿件及文別轉換時新增參數, 傳入在資源管理檔中樣版檔案所設定的預設排版資源檔名稱
// 1100318	Raymond		Raymond		1090853		新增當環境變數「WE_DISABLE_REEDIT_簽稿會核單」設為"Y"時, 禁止任何人包含主會辦單位承辦人(OD99)異動簽稿會核單內文, 只有新增簽稿會核單的當下流程點可異動內文
// 1100323	Raymond		Raymond		1090857		新增記錄文稿的「分頁後總頁數」資訊在DraftMgmt.xml、及取得的方法
// 1100419	Raymond		Raymond		1080767		合併內政部1070530, 若系統參數CHECK_CLOSEDDRAFT_EDIT為Y, 發文/結案流程點前所新增文稿不可異動內容
// 1100525	Raymond		Raymond		1100495		分繕變數表物件新增del方法, 支援刪除單筆Record功能
// 1100601	Raymond		Raymond		1100523		新增keepAtt參數, 文別轉換時傳入true, 表示若新文別有「附件列表」節點時, 將會保留舊文稿所加入附件及轉出的附件頁面, 故附件GUID等要保留與舊文稿一樣
// 1100621	Raymond		Raymond		1090001		修正未取文號時設定"年度號"會以數字型別同步設定至其他稿件, 會發生"childNodes" in 數字的Error的問題
// 1100816	Raymond		Raymond		1100482		新增當環境變數「WE_ALLOW_CON_KEEP_SIGNOBJ」為Y時, 允許任何人異動簽稿會核單內文
// 1100819	Raymond		Raymond		1100431		搜尋取代功能取代文字時不會有<INS>標籤, 故diff判斷是否為復原文字要先判斷原來是否為刪除標記的文字
// 1100909	Raymond		Raymond		1101135		若異動欄位為發文機關全銜, 則設置因預設內容異動而須重新整理旗標
// 1101022	Raymond		Raymond		1101327		修正分繕變數名稱重複時, 多稿轉出子視窗會出現2個以上相同變數名稱欄位的問題
// 1101026	Raymond		Raymond		1100991		修正弱掃Client Potential XSS
// 1101125	Raymond		Raymond		1101370		修正當前一個使用者新增文字一併設定樣式時, 長官修訂為"正常"樣式後, 仍呈現前一個使用者所設定的樣式的問題
// 1110303	Raymond		Raymond		1101578		新增取得文稿GUID的方法
// 1110304	Leslie		Leslie		1101459		新增依設定，提供承辦人可修改「附件標籤」名稱
// 1110316	Raymond		Raymond		1101578		附件編輯異動後使用者選擇上傳更新附件時, 更新附件資訊及實體資料
// 1110322	Raymond		Raymond		1101416		新增文稿內容被異動時, 同步呼叫DraftMgmt的dirty方法時多傳入本文稿的索引值, 以供DraftMgmt.xml記錄下本文稿的"最後異動內文階段序號"
// 1110328 	Leslie		Leslie		1100287		Merge[1070359]	歷史公文之來文及簽辦文稿內容
// 1110506	Raymond		Raymond		1110521		修正IE無法正常匯入DI的問題
// 1110526	Raymond		Raymond		1110521		開啟歷史調閱公文的DI時的前置處理新增參數供前置處理功能區別是歷史公文的DI還是一般開啟舊檔的DI, 新增判斷若稿序為"創稿", 則檢核是否為調閱歷史公文的DI檔, 若是則將稿序改為「文別or令函類別（稿）」
// 1110610	Raymond		Raymond		1110283		新增回傳文稿序供啟用航港局的自動產生簽稿會核單功能排序邏輯時使用
// 1110624	Raymond		Raymond		1110548		新增核決後公文以環境變數「WE_APPROVE_DISABLE_DRAFTEDIT_TYPE」設定的文別決定文稿是否要禁止編輯
// 1111006	Raymond		Raymond		陸委會序324	指定分繕受文者為抄本時改用「【變數名稱請分繕】」表示
// 1111007	Raymond		Raymond		陸委會序325	修正當前一流程點新增文字為上下標時, 再點上下標會出現上標再上標或下標再下標問題(重新載入或翻頁)
// 1111117	Raymond		Raymond		1111069		載入新增文稿檔後就刪掉暫存在sessionStorage的項目, 以避免不明步驟造成載入不同筆公文的文稿取代目前公文的文稿的問題
// 1111229	Raymond		Raymond		1111351		修正分繕變數名稱中含有半形括號等Regular Expression會用到的關鍵字時, 無法取代為分繕變數值的問題
// 1120523	Raymond		Raymond		1120307		將DraftModel的getEditable判斷移至DraftMgmt, 以避免備份時由於未點開文稿, 而未執行到DraftModel的getEditable判斷, 造成SignWork.xml中漏寫未點開的<文稿>節點, 導致從備份還原後會發生傳送錯誤(代碼713)問題
// 1120817	Raymond		Raymond		1120503		新增支援自訂表格讀取及儲存, 匯出文稿頁面功能
// 1120901  Kevin		Leslie		1120709		弱掃修正Client DOM Stored XSS
// 1120915	Raymond		Raymond		1120574		新增記錄最新異動時間, 儲存時與上次儲存時間比對, 若未比上次儲存時間晚, 則不需要儲存
// 1121005	Raymond		Raymond		北大序257	修正刪掉條列後再於段落按Enter新增條列, 新的子條列沒有縮排及其它問題(ex.無法翻頁、再Enter新增下個子條列會無標號...)
// 1121006	Raymond		Raymond		北大序256	轉換文別時標記需重新整理條列序號, 因簽/函->便簽預轉會將主旨改為說明一、, 若不重新整理條列序號, 會變成說明段落下有兩個一、的情況
// 1121110	Raymond		Raymond		1120881		新增支援簽核區域自訂高度功能
// 1121123	Raymond		Raymond		領務局序321	新增判斷ODWMSG.COM_NO下有併案文號的話, 文稿可編輯且有<母文文號>節點時, 檢查與ODWMSG.COM_NO下的第一筆COM_DOC_NO(母文文號)是否相同, 不同的話直接將第一筆ODWMSG.COM_NO.COM_DOC_NO寫到文稿的<母文文號>節點(補實作一代變更單1010363功能)
// 1130124	Raymond		Raymond		1120887		新增判斷簽稿會核單是否支援會辦意見編輯區及簽核區域自訂高度功能
// 1130424	Raymond		Raymond		1120881		修正一般文稿誤判為支援簽核區域增高功能的問題
// 1130521	Raymond		Raymond		信保序113	新增判斷若為信保EDT232匯入的空白公文稿, 在尚未指定套用的排版設定檔時, 搜尋RsrcMgmt.xml中符合文別的樣版檔設定的「預設排版」名稱, 預設套用此名稱的排版設定檔, 並檢查文稿管理檔若未設定稿件的文別屬性, 則補上
// 1130808	Raymond		Raymond		1130313		合併1111007(1100394), 配合開啟離線模式另存整份公文的ZIP壓縮檔功能, 修改文稿初始化時若要選取套用樣版檔時, 要等到選完套用樣版再返回
// 1140620	Raymond		Raymond		1131303		新增錯別字校正功能
// 1140710	Leslie		Raymond		1140310		修正下載DI檔時會以Document物件回傳, 而非字串, 導致<附件>標籤未預處理為<附件列表>而衍生的問題
// 1140729	David		Raymond		1140381		新增是否需異動附件分繕旗標, 及是否已設定過附件分繕
// 1140815	Raymond		Raymond		1141232		修正無錯別字校正功能時(離線模式)會發生錯誤的問題
// 1140904	Raymond		Raymond		退輔會序201	新增環境變數「AOL_DISABLE_CONUNIT_EDIT_CON_SIGNAREA」, 設為"Y"時禁止會辦單位異動簽稿會核單的簽核框高度
// 1140910	Raymond		Raymond		1141254		修正若稿件無任何分繕變數, 但有設定分繕附件時, 列印發文用時, 附件文字變更不同受文者的下載區識別碼會變成改到原稿XML的問題
// 1141218	Raymond		Raymond		北榮序453	因1140818禁止出組室過的非可發文文別異動內文, 但要對自動增高簽核區域功能允許異動
// 1150108	Raymond		Raymond		1141307		儲存及備份時都寫最後儲存日期時間, 但備份不要記憶, 以避免備份過後直接關閉公文, 會誤判為已儲存過而沒跳出提示儲存的子視窗, 及修正記錄最後修改日期時間功能失效問題(北榮序453衍生問題)
// 1150428	Raymond		Raymond		1150093		修正出組室過的非可發文文別, 自動增高簽核區域後儲存已異動, 但關閉後再開啟會變回未異動狀態, 導致不會匯出頁面的問題

function DraftModel() {

	// private members
	var _mgmt;				// 公文夾物件
	var _index = -1;		// 稿序
	var _rawXml;			// 讀入的文稿的XML DOM
	var _docType = "";		// 文別
	var _subDocType = "";	// 函(令)類別
	var _internalFO;		// 轉譯後的排版物件
	var _createSN;			// 原稿新增階段序號
	var _attSN = 0;			// 附件序號, 異動時要重編
	var _dirty = false;		// 新增異動旗標
	var _showPara = [];		// 強制顯示空段落的段名
	var _mailMergeTable = new MailMergeTable();	// 分繕變數表
	var _updateTimer = null;
	var _support1090621Feature = false;	// 1091016 Raymond 1090621 新增判斷樣版檔是否支援"令條列"凸排功能旗標
	var _needRetransInitialFO = false;	// 1100909 Raymond 1101135 新增目前文稿是否需要因預設內容異動而重新整理旗標
	var _ctblRecords = new CustomTable();	// 1120807 Raymond 1120503 新增自訂表格記錄檔
	var _preGenPages = [];					// 1120810 Raymond 1120503 新增預先匯出的文稿頁面
	var _lastSaveTime = "";					// 1120915 Raymond 1120574 新增上次儲存時間(記錄在文稿根節點的LastModified屬性)
	var _lastModifyTime = "";				// 1120915 Raymond 1120574 新增最新異動時間
	var _supportSALP = false;				// 1121106 Raymond 1120881 新增文稿是否支援簽核區域自訂高度功能
	var _saOrigHei = {};					// 1121108 Raymond 1120881 新增切換保留簽署物件功能時, 記憶簽核區域恢復為預設高度前的原始高度
	var _SALPresumed = false;				// 1121117 Raymond 1120881 新增簽核區域是否已恢復為預設值旗標
	//var _errCrct = new ErrorCorrection();	// 1131224 Raymond 1131303 新增錯別字校正功能
	var _errCrct = (!!theSSO && theSSO.offlineMode == true)?undefined:new ErrorCorrection();	// 1140815 Raymond 1141232 修正離線版不提供錯別字校正功能
	var _fixWordObjs = [];					// 1140224 Raymond 1131303 新增錯別字校正標示物件
	var _needSaveDispatchAtt = false;		// 1140728 Raymond 1140381 新增需異動附件分繕旗標
	
	// private methods
	function _getCurrSN() {
		return _mgmt.getEditSN();
	}
	function _getDateTime() {
		var now = new Date();
		return (now.getYear() + 1900) + "/" + (now.getMonth() + 1) + "/" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
	}
	function isChanged(xmlNode, val) {
		// 1070108 Raymond 修正開啟文稿時, 可能由MS-Common.js等客製化邏輯中預設、重設各欄位內容導致dirty狀態, 所衍生框外簽核物件未顯示問題
		if("text" in xmlNode)
			return xmlNode.text != val;
		else
			return xmlNode.textContent != val;
		return true;
	}
	// 1060526 Raymond 1060337 新增轉換nbsp為sp
	function rpnbsp(str) {
		//return str.replace(/\xA0/g, " ");
		return str;
	}
	//1101026 Raymond 1100991 弱掃XSS修正
	function HtmlEncode(s) {
		var div = document.createElement('div');
		div.appendChild(document.createTextNode(s));
		return div.innerHTML;
	}
	function mergeStyles(mi, nd) {	// 2014.5.13 若nd是<B>、<I>、<U>則合併到mi的styles屬性
		var s = Number(mi.getAttribute("styles"));
		if(nd.tagName == "B")
			s = s | 1;
		else if(nd.tagName == "I")
			s = s | 2;
		else if(nd.tagName == "U")
			s = s | 4;
		mi.setAttribute("styles", s);
		if(nd.childNodes.length == 1 && (nd.childNodes[0].tagName == "B" || nd.childNodes[0].tagName == "I" || nd.childNodes[0].tagName == "U"))
			arguments.callee(mi, nd.childNodes[0]);
		else {
			if("text" in mi)	// for IE-compatible
				mi.text = rpnbsp(nd.textContent);	// 1060526 Raymond 1060337 新增轉換nbsp為sp
			else
				mi.textContent = rpnbsp(nd.textContent);	// 1060526 Raymond 1060337 新增轉換nbsp為sp
		}
	}
	// 1071116 Raymond 1071137 新增第3參數mergeSegment, true表示為合併條列或段落, 不要用比對差異方式產生追蹤修訂標記
	//function applyChange(xmlNode, sentence) {	// sentence是HTML的node
	function applyChange(xmlNode, sentence, mergeSegment) {	// sentence是HTML的node
		if(typeof sentence == "string") {
			if("nodeType" in xmlNode && xmlNode.nodeType == 2)	// attr node
				xmlNode.nodeValue = sentence;
			else {	// elem node, text node
				if("text" in xmlNode)	// for IE-compatible
					xmlNode.text = rpnbsp(sentence);	// 1060526 Raymond 1060337 新增轉換nbsp為sp
				else
					xmlNode.textContent = rpnbsp(sentence);	// 1060526 Raymond 1060337 新增轉換nbsp為sp
			}
		}
		// 1100621 Raymond 1090001 修正未取文號時設定"年度號"會以數字型別同步設定至其他稿件, 會發生"childNodes" in 數字的Error的問題
		else if(typeof sentence == "number") {
			if("nodeType" in xmlNode && xmlNode.nodeType == 2)	// attr node
				xmlNode.nodeValue = sentence;
			else {	// elem node, text node
				if("text" in xmlNode)	// for IE-compatible
					xmlNode.text = sentence;
				else
					xmlNode.textContent = sentence;
			}
		}
		else {
			// 1120804 Raymond 1120503 支援自訂表格的儲存
			if("childNodes" in sentence && ($(sentence).find("table.custom-table").length || $(sentence).closest("table.custom-table").length)) {
				let clr0 = "color:black;background-color:white",
					clr1 = "color:cyan;background-color:darkgray",
					$ctbl = ($(sentence).find("table.custom-table").length)?$(sentence).find("table.custom-table"):$(sentence).closest("table.custom-table");
				console.log("%cCTBL%c: 儲存自訂表格", clr1, clr0, $ctbl.get(0));
				let tblId = $ctbl.attr("id"),
					lastModTime = $ctbl.attr("data-lastmodtime");
				// TODO: save to external file(000X-tb.xml)
				let tri = _ctblRecords.find(tblId);
				if(tri < 0) {
					_ctblRecords.add($ctbl.get(0));
				}
				else {
					_ctblRecords.set(tri, $ctbl.get(0));
				}
				if($(xmlNode).find("CTBL[ref='#" + tblId + "']").length == 0) {
					$(xmlNode).empty();
					let tblNd = xmlNode.ownerDocument.createElement("CTBL");
					tblNd.setAttribute("ref", "#" + tblId);
					xmlNode.appendChild(tblNd);
				}
			}
			else
			if("childNodes" in sentence) {
				// 1070213 Raymond 1061140 改用比對新舊差異方式以避免特殊的輸入步驟造成追蹤修訂錯誤
				var _editSN = _getCurrSN();
				// 1071116 Raymond 1071137 若mergeSegment為true, 則不要用比對差異方式產生追蹤修訂標記
				// 1070320 Raymond 1070364 修正為比對非同一編輯階段所新增的文稿才是要追蹤修訂, 同一編輯階段所新增的文稿可能包括承辦人(sn=0)或長官或退回後的承辦人(sn!=0)
				// 1070308 Raymond 1061140 非草稿才要追蹤修訂
				//if(_editSN > 0) {
				//if(_editSN != _createSN) {
				if(_editSN != _createSN && !mergeSegment) {
					// 1071011 Raymond 1061140 新增寫入文稿的文字內容要轉換&<>"'等XML保留字元為&amp;等Entity格式的轉換方法
					function XmlEncode(s) {
						// 1071128 Raymond 1071187 修正航港局錯誤追蹤修訂標記發生Exception, 導致未更新為刪除後內容的問題
						if(!s) {
							theLogger.error("XmlEncode: invalid s");
							return "";
						}
						return s.replace(/&/g, "&amp;")
							.replace(/</g, "&lt;")
							.replace(/>/g, "&gt;")
							.replace(/"/g, "&quot;")
							.replace(/'/g, "&#039;");
					}
					function ch(tn, offset) {
						var _tn = tn;
						var _offset = offset;
						var _isSrgPr = false;	// 1080311 Raymond 1080195 新增判斷是否為BMP外的Unicode
						// 1080311 Raymond 1080195 新增判斷是否為BMP外的Unicode
						if("text" in tn) {
							if(tn.text.length > (offset+1) && tn.text[offset].match(/[\uD800-\uDBFF]/) && tn.text[offset+1].match(/[\uDC00-\uDFFF]/)) {
								theLogger.warn("純文字內容為BMP外的Unicode'" + tn.text + "'");
								_isSrgPr = true;
							}
						}
						else {
							if(tn.textContent.length > (offset+1) && tn.textContent[offset].match(/[\uD800-\uDBFF]/) && tn.textContent[offset+1].match(/[\uDC00-\uDFFF]/)) {
								theLogger.warn("純文字內容為BMP外的Unicode'" + tn.textContent + "'");
								_isSrgPr = true;
							}
						}
						// 1080311 Raymond 1080195 新增回傳是否為BMP外的Unicode
						this.isSrgPr = function() {
							return _isSrgPr;
						}
						this.val = function() {
							if("text" in _tn) {
								// 1080311 Raymond 1080195 新增判斷是否為BMP外的Unicode
								if(_tn.text.length > (_offset+1) && _isSrgPr)
									return _tn.text[_offset] + _tn.text[_offset + 1];
								return _tn.text[_offset];
							}
							// 1080311 Raymond 1080195 新增判斷是否為BMP外的Unicode
							if(_tn.textContent.length > (_offset+1) && _isSrgPr)
								return _tn.textContent[_offset] + _tn.textContent[_offset + 1];
							return _tn.textContent[_offset];
						}
						this.nodeName = function() {
							return null;
						}
						this.equals = function(p) {
							if(!!p && p.nodeName() == null)
								return this.val() == p.val();
							return false;
						}
						this.copy = function() {
							// 1071011 Raymond 1061140 改用this.toString()取代直接用原文字回傳
							//if("text" in _tn)
							//	return _tn.text[_offset];
							//return _tn.textContent[_offset];
							return this.toString();
						}
						this.isDEL = function() {
							return false;
						}
						this.isINS = function() {
							return false;
						}
						this.same = function(p) {	// 值相同
							return this.val() == p.val();
						}
						this.isRCV = function(p) {
							return false;
						}
						this.toString = function() {
							// 1071011 Raymond 1061140 回傳文字先過濾&<>"'等XML保留字元轉換為&amp;等Entity格式的文字
							//if("text" in _tn)
							//	return _tn.text[_offset];
							//return _tn.textContent[_offset];
							if("text" in _tn) {
								// 1080311 Raymond 1080195 新增判斷是否為BMP外的Unicode
								if(_tn.text.length > (_offset+1) && _isSrgPr)
									return XmlEncode(_tn.text[_offset] + _tn.text[_offset + 1]);
								return XmlEncode(_tn.text[_offset]);
							}
							// 1080311 Raymond 1080195 新增判斷是否為BMP外的Unicode
							if(_tn.textContent.length > (_offset+1) && _isSrgPr)
								return XmlEncode(_tn.textContent[_offset] + _tn.textContent[_offset + 1]);
							return XmlEncode(_tn.textContent[_offset]);
						}
					}
					function getFirstChild(nd) {
						var res = null;
						for(var i=0; i<nd.childNodes.length; i++) {
							if(nd.childNodes[i].nodeType == 1) {
								if(!res)
									res = nd.childNodes[i];
								else
									theLogger.error("getFirstChild()異常:'" + (("xml" in nd)?nd.xml:nd.outerHTML) + "'含有超過1個有效的子節點");
							}
							else if("text" in nd.childNodes[i] && nd.childNodes[i].text.length > 0) {
								if(!res)
									res = nd.childNodes[i];
								else
									theLogger.error("getFirstChild()異常:'" + (("xml" in nd)?nd.xml:nd.outerHTML) + "'含有超過1個有效的子節點");
							}
							else if(!("text" in nd.childNodes[i]) && nd.childNodes[i].textContent.length > 0) {
								if(!res)
									res = nd.childNodes[i];
								else
									theLogger.error("getFirstChild()異常:'" + (("xml" in nd)?nd.xml:nd.outerHTML) + "'含有超過1個有效的子節點");
							}
						}
						return res;
					}
					function xe(nd, offset) {
						var _nd = nd;
						var _offset = offset;
						var _isSrgPr = false;	// 1080311 Raymond 1080195 新增判斷是否為BMP外的Unicode
						if(offset > 0)
							theLogger.warn("XML標籤<" + nd.nodeName + ">中文字內容長度超過1'" + (("text" in nd)?nd.text:nd.textContent) + "'");
						// 1071011 Raymond 1061140 修正textContent未.length的問題
						//else if((("text" in nd)?nd.text.length:nd.textContent) == 0)
						else if((("text" in nd)?nd.text.length:nd.textContent.length) == 0)
							theLogger.error("XML標籤<" + nd.nodeName + ">中文字內容長度為0");
						// 1080311 Raymond 1080195 新增判斷是否為BMP外的Unicode
						if("text" in nd) {
							if(nd.text.length > (offset+1) && nd.text[offset].match(/[\uD800-\uDBFF]/) && nd.text[offset+1].match(/[\uDC00-\uDFFF]/)) {
								theLogger.warn("XML標籤<" + nd.nodeName + ">文字內容為BMP外的Unicode'" + nd.text + "'");
								_isSrgPr = true;
							}
						}
						else {
							if(nd.textContent.length > (offset+1) && nd.textContent[offset].match(/[\uD800-\uDBFF]/) && nd.textContent[offset+1].match(/[\uDC00-\uDFFF]/)) {
								theLogger.warn("XML標籤<" + nd.nodeName + ">文字內容為BMP外的Unicode'" + nd.textContent + "'");
								_isSrgPr = true;
							}
						}
						// 1080311 Raymond 1080195 新增回傳是否為BMP外的Unicode
						this.isSrgPr = function() {
							return _isSrgPr;
						}
						this.val = function() {
							if("text" in _nd) {
								// 1080311 Raymond 1080195 新增判斷是否為BMP外的Unicode
								if(_nd.text.length > (_offset+1) && _isSrgPr)
									return _nd.text[_offset] + _nd.text[_offset + 1];
								return _nd.text[_offset];
							}
							// 1080311 Raymond 1080195 新增判斷是否為BMP外的Unicode
							if(_nd.textContent.length > (_offset+1) && _isSrgPr)
								return _nd.textContent[_offset] + _nd.textContent[_offset + 1];
							return _nd.textContent[_offset];
						}
						this.nodeName = function() {
							return _nd.nodeName;
						}
						this.attr = function(attrNm) {
							return _nd.getAttribute(attrNm);
						}
						this.same = function(p) {	// 值相同
							return this.val() == p.val();
						}
						this.copy = function(p) {
							// 1090303 Raymond 1080420 修正若未傳入p則不改寫styles屬性
							//if(_nd.getAttribute("sn") == _editSN) {
							if(!!p && _nd.getAttribute("sn") == _editSN) {
								var s = p.styles();
								if(!!s)
									_nd.setAttribute("styles", s);
								else
									_nd.removeAttribute("styles");
							}
							return this.toString();
						}
						this.isRCV = function(p) {
							// 1100819 Raymond 1100431 取代文字時不會有<INS>標籤, 故判斷是否為復原文字要先判斷原來是否為刪除標記的文字
							if(_nd.nodeName == "mi" && _nd.getAttribute("act") == "del") {
								var firstChild = getFirstChild(_nd);
								if(firstChild.nodeType == 1)
									return p.equals(new xe(firstChild, 0));
								return p.equals(new ch(firstChild, 0));
							}
							return false;
						}
						this.unwrap = function() {
							var firstChild = getFirstChild(_nd);
							if(firstChild.nodeType == 1)
								return (new xe(firstChild, 0)).toString();
							return (new ch(firstChild, 0)).toString();
						}
						this.toString = function() {
							function toS(node) {
								var res = "<" + node.nodeName;
								for(var i=0; i<node.attributes.length; i++) {
									res += " " + node.attributes[i].nodeName + "='" + node.attributes[i].nodeValue + "'";
								}
								res += ">";
								for(var i=0; i<node.childNodes.length; i++) {
									if(node.childNodes[i].nodeType == 3 && node.childNodes[i].nodeValue.length > 0) {
										// 1071011 Raymond 1061140 回傳文字先過濾&<>"'等XML保留字元轉換為&amp;等Entity格式的文字
										//res += node.childNodes[i].nodeValue[_offset];
										// 1080311 Raymond 1080195 新增判斷是否為BMP外的Unicode
										if(node.childNodes[i].nodeValue.length > (_offset+1) && _isSrgPr)
											res += XmlEncode(node.childNodes[i].nodeValue[_offset] + node.childNodes[i].nodeValue[_offset+1]);
										else
										res += XmlEncode(node.childNodes[i].nodeValue[_offset]);
									}
									else if(node.childNodes[i].nodeType == 1)
										res += arguments.callee(node.childNodes[i]);
								}
								res += "</" + node.nodeName + ">";
								return res;
							}
							return toS(_nd);
						}
					}
					function he(nd, offset) {
						var _nd = nd;
						var _offset = offset;
						var _isAbnormal = false;
						var _isSrgPr = false;	// 1080311 Raymond 1080195 新增判斷是否為BMP外的Unicode
						// 1140303 Raymond 1131303 新增排除SPAN.checkedError
						if(nd.nodeName == "SPAN" && $(nd).is(".checkedError")) {
							if(!!nd.children && nd.children.length > 0) {
								_nd = nd.children[0];
								console.log("錯別字標示節點重指向第0個子節點", _nd);
							}
							else if(nd.childNodes.length == 1) {
								_nd = nd.childNodes[0];
								console.log("錯別字標示節點重指向唯一文字節點", _nd);
							}
							else {
								for(var x=0; x<nd.childNodes.length; x++) {
									if(nd.childNodes[x].nodeType == 1) {
										_nd = nd.childNodes[x];
										console.log("錯別字標示節點重指向第" + x + "個子節點", _nd);
										break;
									}
									else if(nd.childNodes[x].nodeValue.length) {
										_nd = nd.childNodes[x];
										console.log("錯別字標示節點重指向第" + x + "個文字節點", _nd);
										break;
									}
								}
							}
						}
						if(_nd.textContent.length > 1) {	// 1140303 Raymond 1131303 nd -> _nd
							// 1080311 Raymond 1080195 新增判斷追蹤修訂BMP外的Unicode
							if(_nd.textContent[offset].match(/[\uD800-\uDBFF]/) && _nd.textContent[offset+1].match(/[\uDC00-\uDFFF]/)) {	// 1140303 Raymond 1131303 nd -> _nd
								theLogger.warn("HTML標籤<" + _nd.nodeName + ">文字內容為BMP外的Unicode'" + _nd.textContent + "'");	// 1140303 Raymond 1131303 nd -> _nd
								_isSrgPr = true;
							}
							else {
							theLogger.warn("HTML標籤<" + _nd.nodeName + ">文字內容長度超過1'" + _nd.textContent + "'");	// 1140303 Raymond 1131303 nd -> _nd
							_isAbnormal = true;
							}
						}
						// 1080311 Raymond 1080195 新增回傳是否為BMP外的Unicode
						this.isSrgPr = function() {
							return _isSrgPr;
						}
						this.val = function() {
							//if("text" in _nd)
							//	return _nd.text[_offset];
							// 1080311 Raymond 1080195 新增判斷追蹤修訂BMP外的Unicode
							if(_nd.textContent.length > (_offset+1) && _isSrgPr)
								return _nd.textContent[_offset] + _nd.textContent[_offset + 1];
							return _nd.textContent[_offset];
						}
						this.nodeName = function() {
							return _nd.nodeName;
						}
						this.attr = function(attrNm) {
							return _nd.getAttribute(attrNm);
						}
						this.equals = function(p) {
							if(!!p) {
								if(_nd.nodeName == p.nodeName())
									return this.val() == p.val();
								else if(_nd.nodeName == "INS" && p.nodeName() == "mi" && p.attr("act") == "ins" && $(_nd).attr("data-sn") == p.attr("sn"))
									return this.val() == p.val();
								else if(_nd.nodeName == "DEL" && p.nodeName() == "mi" && p.attr("act") == "del" && $(_nd).attr("data-sn") == p.attr("sn"))
									return this.val() == p.val();
								//else if(_nd.nodeName == "SPAN" && $(_nd).hasClass("fmt") && p.nodeName() == "mi" && p.attr("act") == "fmt" && $(_nd).attr("data-sn") == p.attr("sn"))	// 本流程點的fmt異動在第2次異動時視為相同, 再使用copy將第2次異動的樣式寫入
								//	return this.val() == p.val();
								else if(_nd.nodeName == "SPAN" && $(_nd).hasClass("fmt") && (p.nodeName() == "fmt" || (p.nodeName() == "mi" && p.attr("act") == "fmt")) && $(_nd).attr("data-styles") == p.attr("styles"))	// 承辦人或前一流程點的fmt異動, 若本流程未異動樣式才視為相同
									return this.val() == p.val();
								// 1111007 Raymond 陸委會序325 修正在前一流程點的ins格式化為相同樣式, 視為未異動
								else if(_nd.nodeName == "SPAN" && $(_nd).hasClass("fmt") && p.nodeName() == "mi" && p.attr("act") == "ins" && $(_nd).attr("data-styles") == p.attr("styles"))
									return this.val() == p.val();
							}
							return false;
						}
						this.isDEL = function() {
							return _nd.nodeName == "DEL";// && _nd.getAttribute("data-sn") == _editSN;
						}
						this.isINS = function() {
							return _nd.nodeName == "INS" && _nd.getAttribute("data-sn") == _editSN;	// 是否為新增的字元須識別sn
						}
						this.isAbnormal = function() {
							return _isAbnormal;
						}
						this.isFmt = function() {
							return _nd.nodeName == "SPAN" && $(_nd).hasClass("fmt");
						}
						this.styles = function() {
							var s = 0;
							var fw = $(_nd).css("font-weight");	// 樣式異動算在INS上
							// 1090324 Raymond 1090134 IE下拖拉文字到有粗體樣式的文字中間會多出STRONG標籤, 去掉後SPAN.fmt會少font-weight, 改用data-styles補充
							//if(fw == "bold" || fw == "bolder" || fw > 400)
							if(fw == "bold" || fw == "bolder" || fw > 400 || ($(_nd).attr("data-styles") != null && Number($(_nd).attr("data-styles")) & 1))
								s |= 1;
							var fs = $(_nd).css("font-style");
							// 1090324 Raymond 1090134 IE下拖拉文字到有斜體樣式的文字中間會多出EM標籤, 去掉後SPAN.fmt會少font-style, 改用data-styles補充
							//if(fs == "italic")
							if(fs == "italic" || ($(_nd).attr("data-styles") != null && Number($(_nd).attr("data-styles")) & 2))
								s |= 2;
							//var fd = $(n).css("text-decoration");
							//if(fd == "underline")
							if($(_nd).attr("data-styles") != null &&
								Number($(_nd).attr("data-styles")) & 4)	// 插入一定有underline樣式
								s |= 4;
							var va = $(_nd).css("vertical-align");
							if(va == "super")
								s |= 8;
							else if(va == "sub")
								s |= 16;
							if(s > 0)
								return s;
							return null;
						}
						this.toString = function() {
							function toS(node) {
								var res = "<" + node.nodeName;
								for(var i=0; i<node.attributes.length; i++) {
									res += " " + node.attributes[i].nodeName + "='" + node.attributes[i].nodeValue + "'";
								}
								res += ">";
								for(var i=0; i<node.childNodes.length; i++) {
									if(node.childNodes[i].nodeType == 3 && node.childNodes[i].nodeValue.length > 0) {
										// 1071011 Raymond 1061140 回傳文字先過濾&<>"'等XML保留字元轉換為&amp;等Entity格式的文字
										//res += node.childNodes[i].nodeValue[_offset];
										// 1080311 Raymond 1080195 新增判斷是否為BMP外的Unicode
										if(node.childNodes[i].nodeValue.length > (_offset+1) && _isSrgPr)
											res += XmlEncode(node.childNodes[i].nodeValue[_offset] + node.childNodes[i].nodeValue[_offset+1]);
										else
										res += XmlEncode(node.childNodes[i].nodeValue[_offset]);
									}
									else if(node.childNodes[i].nodeType == 1)
										res += arguments.callee(node.childNodes[i]);
								}
								res += "</" + node.nodeName + ">";
								return res;
							}
							return toS(_nd);
						}
					}
					function ptr(nd, initialIndex, isHtml) {
						var _nd = nd;
						var _idx = initialIndex || 0;
						var _c = new Array();
						for(var i=0; i<nd.childNodes.length; i++) {
							var cn = nd.childNodes[i];
							if(cn.nodeType == 3) {	// text node
								for(var j=0; j<(("text" in cn)?cn.text.length:cn.textContent.length); j++) {
									_c.push(new ch(cn, j));
									// 1080311 Raymond 1080195 新增判斷字元是否為BMP外的Unicode
									if(_c[_c.length-1].isSrgPr())
										++j;
								}
							}
							else {	// elem node
								if(isHtml) {
									for(var j=0; j<cn.textContent.length; j++) {
										// 1140401 Raymond 1131303 新增過濾錯別字標記元素
										if(cn.tagName == "SPAN" && $(cn).is(".checkedError")) {
											if(!!cn.children && cn.children.length > 0) {
												cn = cn.children[0];
												console.log("(ptr)錯別字標示節點重指向第0個子節點", cn);
											}
											else if(cn.childNodes.length == 1) {
												cn = cn.childNodes[0];
												console.log("(ptr)錯別字標示節點重指向唯一文字節點", cn);
											}
											else {
												for(var x=0; x<cn.childNodes.length; x++) {
													if(cn.childNodes[x].nodeType == 1) {
														cn = cn.childNodes[x];
														console.log("(ptr)錯別字標示節點重指向第" + x + "個子節點", cn);
														break;
													}
													else if(cn.childNodes[x].nodeValue.length) {
														cn = cn.childNodes[x];
														console.log("(ptr)錯別字標示節點重指向第" + x + "個文字節點", cn);
														break;
													}
												}
											}
											if(cn.nodeType == 3)
												_c.push(new ch(cn, j));
											else
												_c.push(new he(cn, j));
										}
										else
										_c.push(new he(cn, j));
										// 1080311 Raymond 1080195 新增判斷字元是否為BMP外的Unicode
										if(_c[_c.length-1].isSrgPr())
											++j;
									}
								}
								else {
									for(var j=0; j<(("text" in cn)?cn.text.length:cn.textContent.length); j++) {
										_c.push(new xe(cn, j));
										// 1080311 Raymond 1080195 新增判斷字元是否為BMP外的Unicode
										if(_c[_c.length-1].isSrgPr())
											++j;
									}
								}
							}
						}
						var s = "";
						for(var i=0; i<_c.length; i++) {
							if(!!_c[i].nodeName()) {
								if(_c[i].nodeName() == "mi" || _c[i].nodeName() == "fmt")
									s += _c[i].toString();
								else
									s += "<" + _c[i].nodeName() + ">" + _c[i].val() + "</" + _c[i].nodeName() + ">";
							}
							else
								s += _c[i].val();
						}
						theLogger.log("'" + s + "'(nodes:" + _c.length + ", initIdx:" + initialIndex + ", isHtml:" + isHtml + ")");
						
						this.isNull = function() {
							return (_idx >= _c.length);
						}
						this.val = function() {
							if(_idx >= _c.length)
								return null;
							return _c[_idx];
						}
						this.equals = function(p) {
							if(_idx >= _c.length) {	// 字串結束位置的字元永不等於其它字元
								theLogger.warn("字串結束位置的字元永不等於其它字元");
								return false;
							}
							return _c[_idx].equals(p.val());
						}
						this.forward = function() {
							if(_idx < _c.length) {
								++_idx;
								return true;
							}
							return false;	// 已位於字串結束位置則回傳false
						}
						this.currIndex = function() {
							return _idx;
						}
						this.copy = function(p) {
							if(_idx >= _c.length) {
								theLogger.error("ptr.copy()不可複製位於字串結束位置的字元");
								throw new Error("ptr.copy()不可複製位於字串結束位置的字元");
							}
							return _c[_idx].copy(p);
						}
						this.markAsINS = function(p) {
							if(_idx >= _c.length) {
								theLogger.error("ptr.markAsINS()不可標記新增位於字串結束位置的字元");
								throw new Error("ptr.markAsINS()不可標記新增位於字串結束位置的字元");
							}
							if(!!_c[_idx].nodeName() && !!p) {
								if(_c[_idx].isFmt()) {
									if(!!p.nodeName() && p.attr("sn") == _editSN)
										return "<mi act='fmt' sn='" + _editSN + "' date='" + _getDateTime() + "' styles='" + ((_c[_idx].styles())?_c[_idx].styles():0) + "'>" + p.unwrap() + "</mi>";
									else
										return "<mi act='fmt' sn='" + _editSN + "' date='" + _getDateTime() + "' styles='" + ((_c[_idx].styles())?_c[_idx].styles():0) + "'>" + p.toString() + "</mi>";
								}
								else if(!!_c[_idx].styles())
									// 1071011 Raymond 1061140 回傳文字先過濾&<>"'等XML保留字元轉換為&amp;等Entity格式的文字
									//return "<mi act='ins' sn='" + _editSN + "' date='" + _getDateTime() + "' styles='" + _c[_idx].styles() + "'>" + _c[_idx].val() + "</mi>";
									return "<mi act='ins' sn='" + _editSN + "' date='" + _getDateTime() + "' styles='" + _c[_idx].styles() + "'>" + XmlEncode(_c[_idx].val()) + "</mi>";
							}
							// 1140303 Raymond 1131303 新增文字若有data-styles屬性, 則保留到新增文字中, 配合錯別字校正功能
							if(!!_c[_idx].styles && !!_c[_idx].styles())	// 1140708 Raymond 1131303 修正選取文字拖拉會出現錯誤的問題
								return "<mi act='ins' sn='" + _editSN + "' date='" + _getDateTime() + "' styles='" + _c[_idx].styles() + "'>" + XmlEncode(_c[_idx].val()) + "</mi>";
							// 1071011 Raymond 1061140 回傳文字先過濾&<>"'等XML保留字元轉換為&amp;等Entity格式的文字
							//return "<mi act='ins' sn='" + _editSN + "' date='" + _getDateTime() + "'>" + _c[_idx].val() + "</mi>";
							return "<mi act='ins' sn='" + _editSN + "' date='" + _getDateTime() + "'>" + XmlEncode(_c[_idx].val()) + "</mi>";
						}
						this.markAsDEL = function() {
							if(_idx >= _c.length) {
								theLogger.error("ptr.markAsDEL()不可標記刪除位於字串結束位置的字元");
								throw new Error("ptr.markAsDEL()不可標記刪除位於字串結束位置的字元");
							}
							if(_c[_idx].nodeName() == "mi" &&
								_c[_idx].attr("act") == "del")
								return _c[_idx].toString();	// 已是刪除標記則不重複刪除
							else if(_c[_idx].nodeName() == "mi" &&
								_c[_idx].attr("act") == "ins" &&
								_c[_idx].attr("sn") == _editSN)
								return "";	// 刪除自己新增的字元直接刪除
							else if(_c[_idx].nodeName() == "mi" &&
								_c[_idx].attr("act") == "fmt" &&
								_c[_idx].attr("sn") == _editSN)
								return "<mi act='del' sn='" + _editSN + "' date='" + _getDateTime() + "'>" + _c[_idx].unwrap() + "</mi>";	// 刪除自己格式化的字元則unwrap再包mi del
							return "<mi act='del' sn='" + _editSN + "' date='" + _getDateTime() + "'>" + _c[_idx].toString() + "</mi>";
						}
						this.isDEL = function() {
							if(_idx >= _c.length) {
								theLogger.error("ptr.isDEL()不可檢測是否為刪除位於字串結束位置的字元");
								throw new Error("ptr.isDEL()不可檢測是否為刪除位於字串結束位置的字元");
							}
							return _c[_idx].isDEL();
						}
						this.isINS = function() {
							if(_idx >= _c.length) {
								theLogger.error("ptr.isINS()不可檢測是否為新增位於字串結束位置的字元");
								throw new Error("ptr.isINS()不可檢測是否為新增位於字串結束位置的字元");
							}
							return _c[_idx].isINS();
						}
						this.isAbnormal = function() {
							if(_idx >= _c.length) {
								theLogger.error("ptr.isAbnormal()不可檢測是否為異常位於字串結束位置的字元");
								throw new Error("ptr.isAbnormal()不可檢測是否為異常位於字串結束位置的字元");
							}
							return _c[_idx].isAbnormal();
						}
						this.same = function(p) {
							if(_idx >= _c.length) {
								theLogger.error("ptr.same()不可檢測是否為相同值位於字串結束位置的字元");
								throw new Error("ptr.same()不可檢測是否為相同值位於字串結束位置的字元");
							}
							return _c[_idx].same(p);
						}
						this.isRCV = function(p) {
							if(_idx >= _c.length) {
								theLogger.error("ptr.isRCV()不可檢測是否為復原刪除位於字串結束位置的字元");
								throw new Error("ptr.isRCV()不可檢測是否為復原刪除位於字串結束位置的字元");
							}
							return _c[_idx].isRCV(p);
						}
						this.unwrap = function() {
							if(_idx >= _c.length) {
								theLogger.error("ptr.unwrap()不可復原刪除位於字串結束位置的字元");
								throw new Error("ptr.unwrap()不可復原刪除位於字串結束位置的字元");
							}
							return _c[_idx].unwrap();
						}
					}
					function diff(tx1, tx2, callback) {
						theLogger.warn("開始比對:");
						theLogger.log("" + (tx1.text || tx1.textContent) + "");
						theLogger.log("" + tx2.textContent + "");
						var o = new ptr(tx1, 0, false);
						var n = new ptr(tx2, 0, true);
						var res = "";
						while(!o.isNull() || !n.isNull()) {
							if(n.equals(o)) {	// 值相同
								res += o.copy(n.val());	// 若是本流程新增的字元, 多傳入新增的元素, 若是樣式有改變, 則直接寫回所改變的樣式
								o.forward();
								n.forward();
							}
							else if(n.isNull()) {	// tx2已結束, tx1剩下的都是刪除
								theLogger.warn("(XML)" + o.currIndex() + "~EOL為刪除的字元");
								res += o.markAsDEL();
								o.forward();
							}
							else if(o.isNull()) {	// tx1已結束, tx2剩下的都是新增
								theLogger.warn("(HTML)" + n.currIndex() + "~EOL為新增的字元");
								res += n.markAsINS();
								n.forward();
							}
							else {	// tx1與tx2不同, 先檢查tx1剩下的字元是否與tx2目前字元相同, 相同表示有可能tx1中間有異常的刪除字元, 再檢查tx2剩下的字元是否與tx1目前字元相同, 相同表示有可能tx2中間有異常的新增字元, 若兩種可能都存在時, 取最小差異字數的可能來判斷為新增或刪除
								var dej = null;	// walk-through tx1期間遇到相同字元, 表示n目前位置的tx2字元不是新增的
								var frs = null;	// walk-through tx2期間遇到相同字元, 表示o目前位置的tx1字元不是刪除的
								if(n.isDEL() && o.same(n.val())) {	// 若tx2是正常的刪除標記, 則設定dej為此位置
									theLogger.warn("tx2(HTML)'" + n.val().toString() + "'是正常刪除'" + o.val().toString() + "'的標記");
									res += o.markAsDEL();
									o.forward();
									n.forward();
									continue;
								}
								else if(o.same(n.val()) && o.isRCV(n.val())) {	// 若tx2是正常的復原刪除標記, 直接unwrap後continue loop
									theLogger.warn("tx2(HTML)'" + n.val().toString() + "'是正常復原刪除'" + o.val().toString() + "'的標記");
									res += o.unwrap();
									o.forward();
									n.forward();
									continue;
								}
								else if(n.isINS()) {	// 若tx2是正常的新增標記, 再判斷是否為異常新增樣態I
									if(n.isAbnormal()) {
										theLogger.warn("tx2(HTML)'" + n.val().toString() + "'是異常新增的標記(樣態I)");
										res += n.markAsINS();
										n.forward();
										continue;
									}
									else {
										theLogger.warn("tx2(HTML)'" + n.val().toString() + "'是正常新增的標記");
										res += n.markAsINS();
										n.forward();
										continue;
									}
								}
								else {
									if(n.isDEL() && n.isAbnormal())
										theLogger.error("tx2(HTML)'" + n.val().toString() + "'是異常刪除的標記(樣態II)");
									var o2 = new ptr(tx1, o.currIndex() + 1, false);	// 1.從tx1的下一個字元開始巡覽
									while(!o2.isNull()) {	// 只forward o2, 所以只要檢查o2是否結束
										if(n.equals(o2)) {	// 2.若walk-through tx1期間遇到第1個相同字元, 即表示從o2這個位置開始n未異動
											dej = o2.currIndex();	// 4.從o.currIndex()(含)到o2.currIndex()(不含)中間的字元可能是被刪除的
											theLogger.warn("tx1(XML)的" + o.currIndex() + "~" + (dej-1) + "可能是刪除的字元");
											break;	// 5.中斷o2的巡覽
										}
										else if(n.isDEL() && o2.same(n.val())) {	// 1080116 Raymond 1071187 修正刪除後翻頁再刪除會出現誤判第2次刪除的內容為新增的問題
											dej = o2.currIndex();	// 4.5.從o.currIndex()(含)到o2.currIndex()(不含)中間的字元是被刪除的
											theLogger.warn("tx1(XML)的" + o.currIndex() + "~" + (dej-1) + "是刪除的字元");
											break;	// 5.中斷o2的巡覽
										}
										o2.forward();	// 3.walk-through tx1即可
									}
									var n2 = new ptr(tx2, n.currIndex() + 1, true);	// 6.從tx2的下一個字元開始巡覽
									while(!n2.isNull()) {	// 只forward n2, 所以只要檢查n2是否結束
										if(n2.equals(o)) {	// 7.若walk-through tx2期間遇到第1個相同字元, 即表示從n2這個位置開始o未異動
											frs = n2.currIndex();	// 9.從n.currIndex()(含)到n2.currIndex()(不含)中間的字元可能是新增的
											theLogger.warn("tx2(XML)的" + n.currIndex() + "~" + (frs-1) + "可能是新增的字元");
											break;	// 10.中斷n2的巡覽
										}
										n2.forward();	// 8.walk-through tx2即可
									}
								}
								if(dej == null) {	// 11.若1.~5.的walk-through tx1期間找不到相同字元即表示n位置的tx2字元是異常新增的或是正常改變樣式的
									if(o.same(n.val()) &&
										(n.val().nodeName() == "SPAN" && n.val().attr("class") == "fmt")) {
										if(o.val().nodeName() == null || (o.val().nodeName() == "mi" && o.val().attr("act") == "fmt") || o.val().nodeName() == "fmt") {
											theLogger.warn("(HTML)" + n.currIndex() + ":'" + n.val().toString() + "'為正常改變樣式的字元(樣態I)");
											res += n.markAsINS(o.val());
										}
										else if(o.val().nodeName() == "mi" && o.val().attr("act") == "ins") {
											theLogger.warn("(HTML)" + n.currIndex() + ":'" + n.val().toString() + "'為正常改變樣式的字元(樣態II)");
											res += n.markAsINS(o.val());
										}
										else {
											theLogger.error("(HTML)" + n.currIndex() + ":'" + n.val().toString() + "'為異常改變樣式的字元");
										}
										n.forward();
										o.forward();
									}
									// 1090327 Raymond 1090134 完稿模式下用拖拉方式若拖拉文字後方有隱藏的DEL元素, 會被一起拖拉, 這些DEL不是新增, 須排除
									else if(n.val().nodeName() == "DEL") {
										theLogger.warn("->(HTML)" + n.currIndex() + ":'" + n.val().toString() + "'為拖拉文字後連著的DEL, 忽略之");
										n.forward();		// 僅前進HTML字串指標
									}
									else {
										theLogger.warn("(HTML)" + n.currIndex() + ":'" + n.val().toString() + "'為異常新增的字元(樣態II)");
										res += n.markAsINS();
										n.forward();
									}
								}
								else if(frs == null) {	// 12.若6.~10.的walk-through tx2期間找不到相同字元即表示o位置的tx2字元是異常刪除的
									// 1090303 Raymond 1080420 排除既有的<mi act='del'>
									if(o.val().nodeName() == "mi" && o.val().attr("act") == "del") {
										theLogger.warn("(XML)" + o.currIndex() + ":'" + o.val().toString() + "'為既有刪除的字元");
										res += o.copy();	// n指標不是同一字, 故不用傳入n.val()
									}
									else {
									theLogger.warn("(XML)" + o.currIndex() + ":'" + o.val().toString() + "'為異常刪除的字元");
									res += o.markAsDEL();
									}
									o.forward();
								}
								else {	// 13.若巡覽tx1及tx2期間都有找到相同字元則比較最小異常的字數, 判斷為異常新增或異常刪除
									if((dej - o.currIndex()) >= (frs - n.currIndex())) {
										theLogger.warn("(HTML)" + n.currIndex() + ":'" + n.val().toString() + "'為異常新增的字元(樣態III), 因此字元出現在原來字串的位置比下一個字出現在原來字串的位置後面或相同");
										// 1090303 Raymond 1080420 完稿模式下選取範圍直接打字會發生<DEL>消失, 若消失的字有游標後面相同的字在比對時, 會造成此異常, 檢核若是<INS>或<DEL>就略過
										if(o.val().nodeName() == "mi" && o.val().attr("act") == "del") {
											theLogger.warn("->(XML)" + o.currIndex() + ":'" + o.val().toString() + "'為選取範圍後打字造成DEL消失, 而消失的字含有與游標後面相同的字, 此為應保留的刪除字");
											res += o.copy();	// n指標不是同一字, 故不用傳入n.val()
											o.forward();		// 僅前進XML字串指標
										}
										// 1090325 Raymond 1090134 完稿模式下用拖拉方式若拖拉文字後方有隱藏的DEL元素, 會被一起拖拉, 這些DEL不是新增, 須排除
										else if(n.val().nodeName() == "DEL") {
											theLogger.warn("->(HTML)" + n.currIndex() + ":'" + n.val().toString() + "'為拖拉文字後連著的DEL, 忽略之");
											n.forward();		// 僅前進HTML字串指標
										}
										else {
										res += n.markAsINS();
										n.forward();
										}
									}
									else {
										theLogger.warn("(XML)" + o.currIndex() + ":'" + o.val().toString() + "'為異常刪除的字元(樣態III), 因此字元出現在原來字串的位置比下一個字出現在原來字串的位置前面");
										res += o.markAsDEL();
										o.forward();
									}
								}
							}
						}
						theLogger.warn(res);
						return res;
					}
					var res = diff(xmlNode, sentence);
					
					var doc = xmlNode.ownerDocument;
					// 1071011 Raymond 1061140 修正若res無任何錯誤, 再清空原來的子節點, 避免清空後也沒有其它資料回寫, 造成整段內容不見的問題
					//for(var i=xmlNode.childNodes.length-1; i>=0; i--) {
					//	xmlNode.removeChild(xmlNode.childNodes[i]);
					//}
					if(navigator.userAgent.indexOf("Trident") >= 0) {	// IE須改用MSXML.DOMDocument來載入XML字串
						var tmpDoc = new ActiveXObject("MSXML2.DOMDocument");
						tmpDoc.resolveExternals = false;
						tmpDoc.validateOnParse = false;
						tmpDoc.preserveWhiteSpace = true;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
						if(!tmpDoc.loadXML("<root>" + res + "</root>")) {
							var pe = tmpDoc.parseError;
							theLogger.error("載入XML失敗! " + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
						}
						else {
							// 1071011 Raymond 1061140 修正IE下若res無任何錯誤, 再清空原來的子節點, 避免清空後也沒有其它資料回寫, 造成整段內容不見的問題
							for(var i=xmlNode.childNodes.length-1; i>=0; i--)
								xmlNode.removeChild(xmlNode.childNodes[i]);
							
							while(tmpDoc.documentElement.childNodes.length > 0) {
								theLogger.warn("appendChild'" + tmpDoc.documentElement.childNodes[0].xml + "'");
								xmlNode.appendChild(tmpDoc.documentElement.childNodes[0]);
							}
						}
					}
					else {// 1071011 Raymond 1061140 修正Chrome下若res有任何錯誤, 在錯誤那行之前會載入成功, 變成寫入部分的問題
						//$(xmlNode).append(res);
						var tdom = (new DOMParser()).parseFromString("<root>" + res + "</root>", "text/xml");
						if($(tdom).find("parsererror").length > 0) {
							theLogger.error($(tdom).find("parsererror").html());
						}
						else {
							// 1071011 Raymond 1061140 修正若res無任何錯誤, 再清空原來的子節點, 避免清空後也沒有其它資料回寫, 造成整段內容不見的問題
							for(var i=xmlNode.childNodes.length-1; i>=0; i--)
								xmlNode.removeChild(xmlNode.childNodes[i]);
							
							while(tdom.documentElement.childNodes.length > 0) {
								theLogger.warn("appendChild'" + (tdom.documentElement.childNodes[0].outerHTML||tdom.documentElement.childNodes[0].nodeValue) + "'");
								xmlNode.appendChild(tdom.documentElement.childNodes[0]);
							}
						}
					}
				}
				else {	// 1070308 Raymond 1061140 草稿時不要追蹤修訂
					var doc = xmlNode.ownerDocument;
					for(var i=xmlNode.childNodes.length-1; i>=0; i--) {
						xmlNode.removeChild(xmlNode.childNodes[i]);
					}
					for(var i=0; i<sentence.childNodes.length; i++) {
						var n = sentence.childNodes[i];
						if(n.nodeType == 3) {   // Text node
							var t = doc.createTextNode(rpnbsp(n.nodeValue));	// 1060526 Raymond 1060337 新增轉換nbsp為sp
							xmlNode.appendChild(t);
						}
						else {	// Element node
							if(n.tagName == "INS") {
								var mi = doc.createElement("mi");
								mi.setAttribute("act", "ins");
								// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
								// mi.setAttribute("sn", $(n).attr("data-sn"));
								// mi.setAttribute("date", $(n).attr("data-date") || _getDateTime());
								mi.setAttribute("sn", HtmlEncode($(n).attr("data-sn")));
								mi.setAttribute("date", HtmlEncode($(n).attr("data-date")) || _getDateTime());
								if("text" in mi)	// for IE-compatible
									mi.text = rpnbsp(n.textContent);	// 1060526 Raymond 1060337 新增轉換nbsp為sp
								else
									mi.textContent = rpnbsp(n.textContent);	// 1060526 Raymond 1060337 新增轉換nbsp為sp
								xmlNode.appendChild(mi);
								
								var s = 0;
								var fw = $(n).css("font-weight");	// 樣式異動算在INS上
								if(fw == "bold" || fw == "bolder" || fw > 400)
									s |= 1;
								var fs = $(n).css("font-style");
								if(fs == "italic")
									s |= 2;
								//var fd = $(n).css("text-decoration");
								//if(fd == "underline")
								if($(n).attr("data-styles") != null &&
									Number($(n).attr("data-styles")) & 4)	// 插入一定有underline樣式
									s |= 4;
								var va = $(n).css("vertical-align");
								if(va == "super")
									s |= 8;
								else if(va == "sub")
									s |= 16;
								if(s > 0)
									mi.setAttribute("styles", s);
								
								// 選取單字異動樣式時, 可能會新增<B>、<U>、<I>在<INS>下
								if($(n).find("B, U, I").length > 0) {
									if($(n).find("B").length)
										s |= 1;
									if($(n).find("I").length)
										s |= 2;
									if($(n).find("U").length)
										s |= 4;
									mi.setAttribute("styles", s);
								}
							}
							else if(n.tagName == "DEL") {
								var mi = doc.createElement("mi");
								mi.setAttribute("act", "del");
								mi.setAttribute("sn", $(n).attr("data-sn"));
								mi.setAttribute("date", $(n).attr("data-date") || _getDateTime());
								if("text" in mi)	// for IE-compatible
									mi.text = rpnbsp(n.textContent);	// 1060526 Raymond 1060337 新增轉換nbsp為sp
								else
									mi.textContent = rpnbsp(n.textContent);	// 1060526 Raymond 1060337 新增轉換nbsp為sp
								xmlNode.appendChild(mi);
								
								// recursive rebuild child nodes
								if(n.childNodes.length == 1) {
									if(n.childNodes[0].nodeType == 3 ||		// Text node
										n.childNodes[0].tagName == "INS" ||
										n.childNodes[0].tagName == "SPAN") {
										// 1080326 Raymond 1071137 增加傳入mergeSegment參數, 若原本不要用比對差異方式產生追蹤修訂標記則子節點也不要比對
										//arguments.callee(mi, n);
										arguments.callee(mi, n, mergeSegment);
									}
									else if(n.childNodes[0].nodeType == 1) {
										if(n.childNodes[0].tagName == "DEL")
											theLogger.error("<DEL>的子節點不應該是<DEL>");
										else
											theLogger.warn("<DEL>的子節點是<" + n.childNodes[0].tagName + ">, 無法識別");
									}
								}
								else if(n.childNodes.length > 1) {	// 2015.6.10 新增可能錯誤的細節判斷
									var len = 0, el = false;
									for(var j=0; j<n.childNodes.length; j++) {
										if(n.childNodes[j].nodeType == 3)
											len += n.childNodes[j].nodeValue.length;
										else
											el = true;
									}
									if(len > 1 || el) {
										theLogger.error("<DEL>的子節點超過1個:");
										for(var j=0; j<n.childNodes.length; j++) {
											if(n.childNodes[j].nodeType == 3)
												theLogger.log("\t" + n.childNodes[j].nodeType + ",'" + n.childNodes[j].nodeValue + "'");
											else
												theLogger.log("\t" + n.childNodes[j].nodeType + "(" + n.childNodes[j].tagName + "),'" + n.childNodes[j].textContent + "'");
										}
									}
									else {
										for(var j=0; j<n.childNodes.length; j++) {
											if(n.childNodes[j].nodeValue.length > 0) {
												if(mi.childNodes.length == 1 && mi.childNodes[0].nodeType == 3) {
													if(mi.childNodes[0].nodeValue != n.childNodes[j].nodeValue) {
														theLogger.error("<DEL>的子節點有" + n.childNodes.length + "個文字節點, 但內容與寫入的不一致('" + n.childNodes[j].nodeValue + "' vs '" + mi.childNodes[0].nodeValue + "')");
													}
												}
												else {
													for(var k=0; k<mi.childNodes.length; k++) {
														if(mi.childNodes[k].nodeType == 3) {
															if(mi.childNodes[k].nodeValue == n.childNodes[j].nodeValue)
																theLogger.error("<DEL>的子節點有" + n.childNodes.length + "個文字節點, 內容與寫入的追蹤修訂節點一致('" + n.childNodes[j].nodeValue + "' vs '" + mi.childNodes[k].nodeValue + "')");
															else
																theLogger.error("<DEL>的子節點有" + n.childNodes.length + "個文字節點, 但內容與寫入的追蹤修訂節點不一致('" + n.childNodes[j].nodeValue + "' vs '" + mi.childNodes[k].nodeValue + "')");
														}
														else {
															theLogger.error("<DEL>的子節點有" + n.childNodes.length + "個文字節點, 但寫入的追蹤修訂節點卻有其它非文字子節點!");
														}
													}
												}
											}
										}
									}
								}
							}
							else if(n.tagName == "SPAN") {
								if($(n).hasClass("fmt")) {
								
									// 2015.5.13 從目前CSS樣式判斷styles
									var s = 0;
									var fw = $(n).css("font-weight");
									if(fw == "bolder" || fw == "bold" || fw > 400)
										s |= 1;
									var fs = $(n).css("font-style");
									if(fs == "italic")
										s |= 2;
									var td = $(n).css("text-decoration");
									// 1061205 Raymond 1061231 修正Chrome下取得css("text-decoration")會回傳包含"underline solid rgb(0,0,0)"這種值, 導致未記錄到底線樣式的問題
									//if(td == "underline")
									if(td.indexOf("underline") >= 0)
										s |= 4;
									var va = $(n).css("vertical-align");
									if(va == "super")
										s |= 8;
									else if(va == "sub")
										s |= 16;
									
									if($(n).attr("data-sn") == null || $(n).attr("data-sn") == _createSN) {	// 無data-sn表示是承辦人異動的樣式, 2016.12.20 若data-sn等於創稿SN也要用fmt標記, 否則一代開啟會出錯
										var fmt = doc.createElement("fmt");
										fmt.setAttribute("styles", s);
										xmlNode.appendChild(fmt);
										
										if(n.childNodes.length == 1) {
											if(n.childNodes[0].nodeType == 3) {
												// 1080326 Raymond 1071137 增加傳入mergeSegment參數, 若原本不要用比對差異方式產生追蹤修訂標記則子節點也不要比對
												//arguments.callee(fmt, n);
												arguments.callee(fmt, n, mergeSegment);
											}
											else if(n.childNodes[0].tagName == "B" || n.childNodes[0].tagName == "I" || n.childNodes[0].tagName == "U") {
												mergeStyles(fmt, n.childNodes[0]);	// 選取單字時<B>、<I>、<U>等樣式異動會變成在<SPAN>中
											}
											else {
												theLogger.warn("<SPAN class='fmt'>下不應該有<" + n.tagName + ">");
												if("text" in fmt)	// for IE-compatible
													fmt.text = rpnbsp(n.textContent);	// 1060526 Raymond 1060337 新增轉換nbsp為sp
												else
													fmt.textContent = rpnbsp(n.textContent);	// 1060526 Raymond 1060337 新增轉換nbsp為sp
											}
										}
										else if(n.childNodes.length == 0) {
											theLogger.warn("<SPAN class='fmt'>下無任何子節點");
										}
										else {
											theLogger.warn("<SPAN class='fmt'>下有超過1個子節點");
											theLogger.log(n.childNodes);
											if("text" in fmt)	// for IE-compatible
												fmt.text = rpnbsp(n.textContent);	// 1060526 Raymond 1060337 新增轉換nbsp為sp
											else
												fmt.textContent = rpnbsp(n.textContent);	// 1060526 Raymond 1060337 新增轉換nbsp為sp
										}
									}
									else {
										var mi = doc.createElement("mi");
										mi.setAttribute("act", "fmt");
										mi.setAttribute("sn", $(n).attr("data-sn"));
										mi.setAttribute("date", $(n).attr("data-date") || _getDateTime());
											//.attr("styles", $(n).attr("data-styles"))
											//.text(n.textContent)
										xmlNode.appendChild(mi);
										
										if(s > 0)
											mi.setAttribute("styles", s);
										
										// recursive rebuild child nodes
										if(n.childNodes.length == 1) {
											if(n.childNodes[0].nodeType == 3 || n.childNodes[0].tagName == "INS" || n.childNodes[0].tagName == "DEL" || n.childNodes[0].tagName == "SPAN") {
												// 1080326 Raymond 1071137 增加傳入mergeSegment參數, 若原本不要用比對差異方式產生追蹤修訂標記則子節點也不要比對
												//arguments.callee(mi, n);
												arguments.callee(mi, n, mergeSegment);
											}
											else if(n.childNodes[0].tagName == "B" || n.childNodes[0].tagName == "I" || n.childNodes[0].tagName == "U") {
												mergeStyles(mi, n.childNodes[0]);	// 選取單字時<B>、<I>、<U>等樣式異動會變成在<SPAN>中
											}
											else {
												theLogger.warn("<SPAN class='fmt'>下不應該有<" + n.tagName + ">");
												if("text" in mi)	// for IE-compatible
													mi.text = rpnbsp(n.textContent);	// 1060526 Raymond 1060337 新增轉換nbsp為sp
												else
													mi.textContent = rpnbsp(n.textContent);	// 2015.6.25 修正$fmt為$mi, 1060526 Raymond 1060337 新增轉換nbsp為sp
											}
										}
										else if(n.childNodes.length == 0) {
											theLogger.warn("<SPAN class='fmt'>下無任何子節點");
										}
										else {
											theLogger.warn("<SPAN class='fmt'>下有超過1個子節點");
											theLogger.log(n.childNodes);
											if("text" in mi)	// for IE-compatible
												mi.text = rpnbsp(n.textContent);	// 1060526 Raymond 1060337 新增轉換nbsp為sp
											else
												mi.textContent = rpnbsp(n.textContent);	// 2015.6.25 修正$fmt為$mi, 1060526 Raymond 1060337 新增轉換nbsp為sp
										}
									}
								}
								else {	// 標點符號
									var t = doc.createTextNode(rpnbsp(n.textContent));	// 1060526 Raymond 1060337 新增轉換nbsp為sp
									xmlNode.appendChild(t);
								}
							}
							else if(n.tagName == "B") {	// 2015.5.13 - 瀏覽器選單變更選取文字為粗體
								buildFmt(xmlNode, n, 1);
							}
							else if(n.tagName == "I") {	// 2015.5.13 - 瀏覽器選單變更選取文字為斜體
								buildFmt(xmlNode, n, 2);
							}
							else if(n.tagName == "U") {	// 2015.5.13 - 瀏覽器選單變更選取文字為底線
								buildFmt(xmlNode, n, 4);
							}
							else if(n.tagName == "FONT") {	// 2015.5.21 - 瀏覽器選單「簡<>繁」變更選取文字會用FONT再包一層B或I或U
								for(var j=0; j<n.childNodes.length; j++) {
									if(n.childNodes[j].nodeType == 1) {
										if(n.childNodes[j].tagName == "B")
											buildFmt(xmlNode, n.childNodes[j], 1);
										else if(n.childNodes[j].tagName == "I")
											buildFmt(xmlNode, n.childNodes[j], 2);
										else if(n.childNodes[j].tagName == "U")
											buildFmt(xmlNode, n.childNodes[j], 4);
									}
								}
							}
							else
								theLogger.warn("不支援寫回XML的元素<" + n.tagName + ">");
						}
					}
				}
			}
		}
	}
	function rebuildMI(xmlDoc, xmlNode, htmlNode) {
		if(htmlNode.tagName == "INS") {
			var mi = xmlDoc.createElement("mi");
			mi.setAttribute("act", "ins");
			mi.setAttribute("sn", $(htmlNode).attr("data-sn"));
			mi.setAttribute("date", $(htmlNode).attr("data-date") || _getDateTime());
			if("text" in mi)	// for IE-compatible
				mi.text = htmlNode.textContent;
			else
				mi.textContent = htmlNode.textContent;
			xmlNode.appendChild(mi);
			
			if($(htmlNode).attr("data-styles") != null)
				mi.setAttribute("styles", $(htmlNode).attr("data-styles"));
		}
		else if(htmlNode.tagName == "DEL") {
			var mi = xmlDoc.createElement("mi");
			mi.setAttribute("act", "del");
			mi.setAttribute("sn", HtmlEncode($(htmlNode).attr("data-sn")));	// 1101026 Raymond 1100991 修正弱掃Client Potential XSS
			mi.setAttribute("date", HtmlEncode($(htmlNode).attr("data-date")) || _getDateTime());	// 1101026 Raymond 1100991 修正弱掃Client Potential XSS
				//.text(htmlNode.textContent)
			xmlNode.appendChild(mi);
			
			// recursive rebuild child nodes
			applyChange(mi, htmlNode);
		}
		else if(htmlNode.tagName == "SPAN") {
			if($(htmlNode).hasClass("fmt")) {
				// 2015.5.13 從目前CSS樣式判斷styles
				var s = 0;
				var fw = $(htmlNode).css("font-weight");
				if(fw == "bolder" || fw == "bold" || fw > 400)
					s |= 1;
				var fs = $(htmlNode).css("font-style");
				if(fs == "italic")
					s |= 2;
				var td = $(htmlNode).css("text-decoration");
				// 1061205 Raymond 1061231 修正Chrome下取得css("text-decoration")會回傳包含"underline solid rgb(0,0,0)"這種值, 導致未記錄到底線樣式的問題
				//if(td == "underline")
				if(td.indexOf("underline") >= 0)
					s |= 4;
				var va = $(n).css("vertical-align");
				if(va == "super")
					s |= 8;
				else if(va == "sub")
					s |= 16;
				
				if($(htmlNode).attr("data-sn") == null) {	// 無data-sn表示是承辦人異動的樣式
					var fmt = doc.createElement("fmt");
					fmt.setAttribute("styles", s);
					xmlNode.appendChild(fmt);
					
					// recursive rebuild child nodes
					applyChange(fmt, n);
				}
				else {
					var mi = xmlDoc.createElement("mi");
					mi.setAttribute("act", "fmt");
					mi.setAttribute("sn", HtmlEncode($(htmlNode).attr("data-sn")));	// 1101026 Raymond 1100991 修正弱掃Client Potential XSS
					mi.setAttribute("date", HtmlEncode($(htmlNode).attr("data-date")) || _getDateTime());	// 1101026 Raymond 1100991 修正弱掃Client Potential XSS
					mi.setAttribute("styles", HtmlEncode($(htmlNode).attr("data-styles")));	// 1101026 Raymond 1100991 修正弱掃Client Potential XSS
						//.text(htmlNode.textContent)
					xmlNode.appendChild(mi);
					
					// recursive rebuild child nodes
					applyChange(mi, htmlNode);
				}
			}
			else {	// 標點符號
				var t = doc.createTextNode(htmlNode.textContent);
				xmlNode.appendChild(t);
			}
		}
	}
	function buildFmt(xmlNode, htmlNode, styles) {
		if("childNodes" in htmlNode) {
			var doc = xmlNode.ownerDocument;
			for(var i=0; i<htmlNode.childNodes.length; i++) {
				var n = htmlNode.childNodes[i];
				if(n.nodeType == 3) {
					theLogger.log("buildFmt: '" + n.nodeValue + "' with style:" + styles);
					for(var j=0; j<n.nodeValue.length; j++) {
						var mi = doc.createElement("mi");
						mi.setAttribute("act", "fmt");
						mi.setAttribute("sn", _getCurrSN());
						mi.setAttribute("date", _getDateTime());
						mi.setAttribute("styles", styles);
						if("text" in mi)	// for IE-compatible
							mi.text = n.nodeValue.substr(j, 1);
						else
							mi.textContent = n.nodeValue.substr(j, 1);
						xmlNode.appendChild(mi);
					}
				}
				else {
					if(n.tagName == "INS" || n.tagName == "DEL" || (n.tagName == "SPAN" && $(n).hasClass("fmt"))) {
						var sn = $(n).attr("data-sn");
						if(sn != _getCurrSN()) {	// 不同流程點
							// 新增mi act=fmt
							var mi = doc.createElement("mi");
							mi.setAttribute("act", "fmt");
							mi.setAttribute("sn", _getCurrSN());
							mi.setAttribute("date", _getDateTime());
							mi.setAttribute("styles", styles);
								//.text(n.textContent)
							xmlNode.appendChild(mi);
								
							// rebuild mi
							rebuildMI(doc, mi, n);
						}
						else {	// 相同流程點
							if(n.tagName == "INS") {
								var mi = doc.createElement("mi");
								mi.setAttribute("act", "ins");
								mi.setAttribute("sn", $(n).attr("data-sn"));
								mi.setAttribute("date", _getDateTime());
								mi.setAttribute("styles", styles);
								if("text" in mi)	// for IE-compatible
									mi.text = n.textContent;
								else
									mi.textContent = n.textContent;
								xmlNode.appendChild(mi);
							}
							else if(n.tagName == "DEL") {
								// DEL不變更styles
								// rebuild this MI
								rebuildMI(doc, xmlNode, n);
							}
							else if(n.tagName == "SPAN") {
								if($(n).hasClass("fmt")) {
								
									// 2015.5.13 從目前CSS樣式判斷styles
									var s = 0;
									var fw = $(n).css("font-weight");
									if(fw == "bolder" || fw == "bold" || fw > 400)
										s |= 1;
									var fs = $(n).css("font-style");
									if(fs == "italic")
										s |= 2;
									var td = $(n).css("text-decoration");
									// 1061205 Raymond 1061231 修正Chrome下取得css("text-decoration")會回傳包含"underline solid rgb(0,0,0)"這種值, 導致未記錄到底線樣式的問題
									//if(td == "underline")
									if(td.indexOf("underline") >= 0)
										s |= 4;
									var va = $(n).css("vertical-align");
									if(va == "super")
										s |= 8;
									else if(va == "sub")
										s |= 16;
									
									if($(n).attr("data-sn") == null) {	// 無data-sn表示是承辦人異動的樣式
										var fmt = doc.createElement("fmt");
										fmt.setAttribute("styles", styles | s);
										xmlNode.appendChild(fmt);
										
										// recursive rebuild child nodes
										applyChange(fmt, n);
									}
									else {
										var mi = doc.createElement("mi");
										mi.setAttribute("act", "fmt");
										mi.setAttribute("sn", HtmlEncode($(n).attr("data-sn")));	// 1101026 Raymond 1100991 修正弱掃Client Potential XSS
										mi.setAttribute("date", _getDateTime());
										mi.setAttribute("styles", styles | s);
											//.text(n.textContent)
										xmlNode.appendChild(mi);
										
										// recursive rebuild child nodes
										applyChange(mi, n);
									}
								}
								else {	// 標點符號
									var t = doc.createTextNode(n.textContent);
									xmlNode.appendChild(t);
								}
							}
						}
					}
					else {	// 外層<B>、<I>、<U>
						if(n.tagName == "B")
							arguments.callee(xmlNode, n, styles | 1);
						else if(n.tagName == "I")
							arguments.callee(xmlNode, n, styles | 2);
						else if(n.tagName == "U")
							arguments.callee(xmlNode, n, styles | 4);
						else
							theLogger.warn("不支援寫回XML的元素<" + n.tagName + ">");
					}
				}
			}
		}
	}
	// 1101125 Raymond 1101370 新增ignoreStyles參數, 若為true則不要將childNodes中的act=ins的styles輸出成CSS style, 以修正當前一個使用者新增文字一併設定樣式時, 長官修訂為"正常"樣式後, 仍呈現前一個使用者所設定的樣式的問題
	//function toHtml(xmlNode) {
	function toHtml(xmlNode, ignoreStyles) {
		var res = "";
		if(xmlNode.nodeType == 1) {	// 2016.5.10 檢查若是attr或text node要另外回傳純文字內容
			for(var i=0; i<xmlNode.childNodes.length; i++) {
				var n = xmlNode.childNodes[i];
				if(n.nodeType == 3)
					// 1060608 Raymond 1060474 修正節點文字中有超過1組「<」、「>」字元時, 在編輯頁面會變成標籤問題
					//res += n.nodeValue.replace(/[\t\r\n]*/g, "").replace("<", "&lt;").replace(">", "&gt;");	// 2017.2.20 大小於半形符號要用entity取代才能顯示
					//if(n.parentNode.nodeName == "INS" || n.parentNode.nodeName == "DEL" || (n.parentNode.nodeName == "SPAN" && $(n.parentNode).hasClass("fmt")))
					//	res += n.nodeValue.replace(/[\t\r\n]*/g, "").replace(/[<> ]/g, function(c) {
					//		return {
					//			'<': '&lt;',
					//			'>': '&gt;',
					//			' ': '&nbsp;'
					//		}[c];
					//	});
					//else
						res += n.nodeValue.replace(/[\t\r\n]*/g, "").replace(/[<>]/g, function(c) {
							return {
								'<': '&lt;',
								'>': '&gt;'
							}[c];
						});//.replace(/  /g, "&nbsp; ");	// 1060613 Raymond 修正連續半形空白會變成只有1個空白的問題(1060337)
				else {
					if(n.nodeName == "mi") {
						var sn = $(n).attr("sn");
						var dt = $(n).attr("date");
						var tcSess = _mgmt.getTCSess(sn);	// 2016.2.2 改向DraftMgmt取得TCSess
						//var tcSess = theAOL.getCurrFolio().getTCSess(sn);
						var clr = Util.toHtmlColor(tcSess.color);
						var tipInfo = dt + "\r\n" + tcSess.name;
						switch($(n).attr("act")) {
							case "ins":
								if($(n).attr("styles") != null) {
									var s = Number($(n).attr("styles")), css = "";
									// 1101125 Raymond 1101370 修正當前一個使用者新增文字一併設定樣式時, 長官修訂為"正常"樣式後, 仍呈現前一個使用者所設定的樣式的問題
									if(!ignoreStyles) {
										if(s & 1)
											css += "font-weight:bolder;";
										if(s & 2)
											css += "font-style:italic;";
										if(s & 4)
											css += "text-decoration:underline;";
										if(s & 8) {
											// 1111007 Raymond 陸委會序325 修正當前一流程點新增文字為上下標時, 再點上下標會出現上標再上標或下標再下標問題(重新載入或翻頁)
											if(n.parentNode.nodeName == "mi" && n.parentNode.getAttribute("act") == "fmt") {
												let ss = Number(n.parentNode.getAttribute("styles"));
												if(ss & 16)	// 新流程點的樣式為下標
													css += "vertical-align:super;";	// 前一流程點的樣式則只要留上標, 不要縮小字型大小
												// 若新流程點的樣式為上標, 則連上標的都不留
											}
											else
											css += "vertical-align:super;font-size:75%;";
										}
										else if(s & 16) {
											// 1111007 Raymond 陸委會序325 修正當前一流程點新增文字為上下標時, 再點上下標會出現上標再上標或下標再下標問題(重新載入或翻頁)
											if(n.parentNode.nodeName == "mi" && n.parentNode.getAttribute("act") == "fmt") {
												let ss = Number(n.parentNode.getAttribute("styles"));
												if(ss & 8)	// 新流程點的樣式為上標
													css += "vertical-align:sub;";	// 前一流程點的樣式則只要留下標, 不要縮小字型大小
												// 若新流程點的樣式為下標, 則連下標的都不留
											}
											else
											css += "vertical-align:sub;font-size:75%;";
										}
									}
									res += "<ins style='color:" + clr + ";" + css + "' data-sn='" + sn + "' data-date='" + dt + "' data-styles='" + s + "' title='" + tipInfo + "'>" + toHtml(n) + "</ins>";
								}
								else
									res += "<ins style='color:" + clr + "' data-sn='" + sn + "' data-date='" + dt + "' title='" + tipInfo + "'>" + toHtml(n) + "</ins>";
								break;
							case "del":
								res += "<del style='color:" + clr + "' data-sn='" + sn + "' data-date='" + dt + "' title='" + tipInfo + "'>" + toHtml(n) + "</del>";
								break;
							case "fmt":
								if($(n).attr("styles")) {	// 2016.9.6 修正無styles屬性的節點, 直接以文字呈現
									var s = Number($(n).attr("styles")), css = "";
									// 1101125 Raymond 1101370 修正當前一個使用者新增文字一併設定樣式時, 長官修訂為"正常"樣式後, 仍呈現前一個使用者所設定的樣式的問題
									if(!ignoreStyles) {
										if(s & 1)
											css += "font-weight:bolder;";
										if(s & 2)
											css += "font-style:italic;";
										if(s & 4)
											css += "text-decoration:underline;";
										if(s & 8)
											css += "vertical-align:super;font-size:75%;";
										else if(s & 16)
											css += "vertical-align:sub;font-size:75%;";
									}
									// 1101125 Raymond 1101370 修正當前一個使用者新增文字一併設定樣式時, 長官修訂為"正常"樣式後, 仍呈現前一個使用者所設定的樣式的問題
									//res += "<span class='fmt' style='color:" + clr + ";" + css + "' data-sn='" + sn + "' data-date='" + dt + "' data-styles='" + s + "' title='" + tipInfo + "'>" + toHtml(n) + "</span>";
									res += "<span class='fmt' style='color:" + clr + ";" + css + "' data-sn='" + sn + "' data-date='" + dt + "' data-styles='" + s + "' title='" + tipInfo + "'>" + toHtml(n, css.length == 0) + "</span>";
								}
								else
									res += toHtml(n);
								break;
							default:
								theLogger.error("EXCEPTION! mi.act not match!");
								theLogger.warn(n);
								break;
						};
					}
					else if(n.nodeName == "fmt") {
						if($(n).attr("styles")) {	// 2016.9.6 修正無styles屬性的節點, 直接以文字呈現
							var s = Number($(n).attr("styles")), css = "";
							// 1101125 Raymond 1101370 修正當前一個使用者新增文字一併設定樣式時, 長官修訂為"正常"樣式後, 仍呈現前一個使用者所設定的樣式的問題
							if(!ignoreStyles) {
								if(s & 1)
									css += "font-weight:bolder;";
								if(s & 2)
									css += "font-style:italic;";
								if(s & 4)
									css += "text-decoration:underline;";
								if(s & 8)
									css += "vertical-align:super;font-size:75%;";
								else if(s & 16)
									css += "vertical-align:sub;font-size:75%;";
							}
							res += "<span class='fmt' style='" + css + "' data-styles='" + s + "'>" + toHtml(n) + "</span>";
						}
						else
							res += toHtml(n);
					}
					else {
						res += toHtml(n);
					}
				}
			}
		}
		else {	// 2016.5.10 檢查若是attr或text node要另外回傳純文字內容
			if("nodeValue" in xmlNode)
				res = xmlNode.nodeValue;
			else if("text" in xmlNode)	// for IE-compatible
				res = xmlNode.text;
			else
				res = xmlNode.textContent;
		}
		return res;
	}
	var _needRetrans = false;
	function _needRetransInternalFO() {
		if(arguments.length > 0)
			_needRetrans = arguments[0];
		else
			return _needRetrans;
	}
	function findVar(str) {
		//var re = new RegExp(/\^/, "g");
		var oi = 0;
		var m = [];
		var i = str.substr(oi).indexOf("^");	// 2016.11.3 IE用RegExp會有問題
		while(i >= 0) {
			m.push(oi + i);
			oi += i + 1;
			i = str.substr(oi).indexOf("^");	// 2016.11.3 IE用RegExp會有問題
		}
		var res = [];
		for(i=0; i<m.length; i++) {
			if(i+1 < m.length) {
				var key = str.substring(m[i]+1, m[i+1]);
				if(key == "" || key.match(/[\r\n<>]/g))	// 空字串、不同行及跨節點不算一個keyword
					continue;
				// 1101022 Raymond 1101327 修正分繕變數名稱重複時, 多稿轉出子視窗會出現2個以上相同變數名稱欄位的問題
				var dup = false;
				for(var j=0; j<res.length; j++) {
					if(res[j].key == key) {
						dup = true;
						if(Array.isArray(res[j].from)) {
							res[j].from.push(m[i]);
							res[j].to.push(m[i+1]);
						}
						else {
							res[j].from = [res[j].from, m[i]];
							res[j].to = [res[j].to, m[i+1]];
						}
						break;
					}
				}
				if(!dup)
				res.push({key: key, from: m[i], to: m[i+1]});
				++i;
			}
		}
		return res;
	}
	// 1130808 Raymond 1130313 合併1111007(1100394), 新增waitUntilSelXSL參數, 匯入ZIP壓縮檔中的文稿檔, 若要選取套用樣版檔時, 不要提前resolve
	// 1100310 Raymond 1090991 新增第4參數defPrintXSLName, 樣版資源檔設定的預設排版資源檔名稱
	// 2016.11.3 搬到private, 供init()及transformDocType()共用, 新增第3參數當值為true時, 重設DraftName
	//function doInit(dfd, that, shouldResetDraftName) {
	//function doInit(dfd, that, shouldResetDraftName, defPrintXSLName) {
	function doInit(dfd, that, shouldResetDraftName, defPrintXSLName, waitUntilSelXSL) {
		// 記錄原稿新增階段序號
		_createSN = _mgmt.getDraftCreateSN(_index);
	
		_docType = _rawXml.documentElement.tagName;
		var sub = _rawXml.documentElement.getElementsByTagName("函類別")[0];	// 函類別 or 令類別, 2016.11.1 改成抓固定的函類別或令類別,
		if(sub == undefined)													// 因為舊的令, 可能沿用函類別的標籤而不是令類別
			sub = _rawXml.documentElement.getElementsByTagName("令類別")[0];
		if(sub != undefined)
			_subDocType = sub.getAttribute("代碼");
		theLogger.log("文別: " + _docType + ", 函(令)類別: " + _subDocType + ", _index:" + _index);
		
		//106.4.17	Leslie	原邏輯搬移到applyXSL之前，以避免用到舊的稿件名稱
		if(shouldResetDraftName)	// 2016.11.3 若shouldResetDraftName參數設為true, 則呼叫DraftMgmt.resetDraftName()重設稿序名稱
			_mgmt.resetDraftName(_index, _docType, _subDocType);
		// 1120915 Raymond 1120574 新增讀取上次儲存時間
		else {	// !shouldResetDraftName時才取得"LastModified"屬性, 因shouldResetDraftName為true時為文別轉換
			theLogger.log("LastModified:", _rawXml.documentElement.getAttribute("LastModified"));
			_lastSaveTime = _rawXml.documentElement.getAttribute("LastModified") || "";
		}
		
		// 1121106 Raymond 1120881 新增判斷文稿是否支援簽核區域自訂高度功能
		if(_docType == "簽稿會核單") {
			// 1121120 Raymond 1120887 新增判斷簽稿會核單是否支援會辦意見編輯區及簽核區域自訂高度功能
			let saLP = _rawXml.documentElement.getElementsByTagName("會辦意見列表");
			if(!!saLP && saLP.length && saLP[0].hasAttribute("預設簽核區域高度")) {
				_supportSALP = true;
				theLogger.log("稿[" + _index + "]'" + _mgmt.getDraftName(_index) + "'(簽稿會核單)支援會辦意見編輯區及簽稿區域自訂高度功能");
				if(_mgmt.isConUnit()) {	// 目前流程點在會辦單位, 允許編輯主辦單位的簽稿會核單
					// 1140904 Raymond 退輔會序201 新增環境變數「AOL_DISABLE_CONUNIT_EDIT_CON_SIGNAREA」, 設為"Y"時禁止會辦單位異動簽稿會核單的簽核框高度
					if(theSSO.User.EnvSettings.get("AOL_DISABLE_CONUNIT_EDIT_CON_SIGNAREA") == "Y") {
						theLogger.log("環境變數「AOL_DISABLE_CONUNIT_EDIT_CON_SIGNAREA」為'Y', 停用簽稿會核單的簽核框自動增高功能");
						_supportSALP = false;
					}
					else
					_mgmt.updateEditSN();	// 新增追蹤修訂階段及更新編輯階段序號
				}
			}
		}
		else {
			let saLP = _rawXml.documentElement.getElementsByTagName("簽核區域排版屬性");
			// 1130424 Raymond 1120881 修正一般文稿誤判為支援簽核區域增高功能的問題
			//_supportSALP = !!saLP;
			_supportSALP = !!saLP && saLP.length > 0;
		}
		
		// 1140624 Raymond 1131303 新增錯別字校正物件初始化
		if(that.getEditable() && !!theAOL.fixWordService)
			_errCrct.init(_mgmt.getFixWordData(), that, _createSN == _getCurrSN()).done(doInitLast);
		else
			doInitLast();
		// 1140224 Raymond 1131303 後半段要等待錯別字校正物件載入完成再執行
		function doInitLast() {
		
		// 2016.10.19 FIX for 未帶稿序問題
		var params = {
				/*"檢視模式": opts.applyTCMode || "3",
				"編輯階段序號": dm.getEditSN(),
				"稿": rsrcFile.category == "稿",
				"條碼": opts.printBarcode == true,
				"頁碼": opts.printPageNo == true,
				"預設字型": opts.printFont || "標楷體",
				"預設行高": opts.printLineHeight || "1.5",
				"自訂": opts.applyCustom == true,*/
				"稿序": _mgmt.getDraftName(_index),
				/*"檔名": opts.printDraftFileName?fm.getDraftFileName(draftIdx):""*/
			};
		var tcSess = _mgmt.getAllTCSess();
		for(var i=0; i<tcSess.length; i++) {
			params["color" + tcSess[i].index] = tcSess[i].color;
		}
		// 1100309 Raymond 1090990 新增「簽核類型」變數, 傳入目前公文的SignType
		params["簽核類型"] = _mgmt.getDocObj().signType;

		// 1130808 Raymond 1130313 合併1111007(1100394) 新增文稿時遇須選擇樣版立即返回, 避免(setAllDraftText)多次要求DraftModel但因卡在選取樣版而產生多餘無用DraftModel
		var noWaitResolved = false, cbFirstResolve;
		// 1130808 Raymond 1130313 合併1111007(1100394), 新增waitUntilSelXSL參數, 匯入ZIP壓縮檔中的文稿檔, 若要選取套用樣版檔時, 不要提前resolve
		//if(!shouldResetDraftName && !_mgmt.getDraftOrigPrintXSL(_index)) {
		if(!shouldResetDraftName && !_mgmt.getDraftOrigPrintXSL(_index) && !waitUntilSelXSL) {
			cbFirstResolve = function() {
				theLogger.warn("初始化文稿物件時因出現選取樣版視窗, 須提前返回");
				dfd.resolve(_index, that);
				noWaitResolved = true;
			}
		}
		
		// 2019.7 - 1080654 Eric, performance log
		if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
            theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- applyPrintXSLT() BEGIN...');
            window.tmBeginApplyPrintXSL = Date.now();
		}
		
		// 1110526 Raymond 1110521 新增判斷若稿序為"創稿", 則檢核是否為調閱歷史公文的DI檔, 若是則將稿序改為「文別or令函類別（稿）」
		if(params["稿序"] == "創稿") {
			var draftfn = _mgmt.getDraftFileName(_index);
			if(!!draftfn && draftfn.match(/.di$/i)) {
				if(!!_subDocType) {
					theLogger.warn("稿序為'創稿'且文稿檔副檔名為'DI', 判斷為調閱歷史公文, 將稿序變更為令函類別的'" + _subDocType + "（稿）'");
					params["稿序"] = _subDocType + "（稿）";
				}
				else if(!!_docType) {
					theLogger.warn("稿序為'創稿'且文稿檔副檔名為'DI', 判斷為調閱歷史公文, 將稿序變更為文別的'" + _subDocType + "（稿）'");
					params["稿序"] = _docType + "（稿）";
				}
				else {
					theLogger.error("稿序為'創稿'且文稿檔副檔名為'DI', 判斷為調閱歷史公文, 但無法取得文別, 無法將稿序變更為'文別（稿）'");
				}
			}
		}
		
		// 1130521 Raymond 信保序113 新增判斷若為信保EDT232匯入的空白公文稿, 在尚未指定套用的排版設定檔時, 搜尋RsrcMgmt.xml中符合文別的樣版檔設定的「預設排版」名稱, 預設套用此名稱的排版設定檔
		if(!_mgmt.getDraftOrigPrintXSL(_index) && !defPrintXSLName && _mgmt.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "3") {
			theLogger.log("信保空白公文稿(DRAFT_SOURCE_TYPE=3)未指定套用的排版設定檔, 搜尋RsrcMgmt.xml中樣版檔設定的「預設排版」名稱...");
			var foundRsrcs = [];
			thePublicRsrc.enumDirs("樣版", function(dir) {
				for(var i=0; i<dir.children.length; i++) {
					if(dir.children[i].type == 1) {	// RsrcFile
						if(dir.children[i].docType == _docType && (!_subDocType || dir.children[i].subDocType == _subDocType || dir.children[i].subDocType == "")) {	// 2016.11.1 若RsrcMgmt.xml的函類別為空值, 也算符合可套用格式條件
							if(theSSO.User.EnvSettings.get("WE_CHOOSE_TEMPLATE_WHILE_IMPORT") == "Y") {
								theLogger.log("找到符合的樣版檔'" + dir.children[i].remote.path + "'" + ((!!dir.children[i].defPrintXSLName)?(", 預設排版:'" + dir.children[i].defPrintXSLName + "'"):""));
								foundRsrcs.push(dir.children[i]);
							}
							else {	// 未啟用則維持搜尋到第一筆即套用
								theLogger.log("找到第一個符合的樣版檔'" + dir.children[i].remote.path + "'" + ((!!dir.children[i].defPrintXSLName)?(", 預設排版:'" + dir.children[i].defPrintXSLName + "'"):""));
								foundRsrcs.push(dir.children[i]);
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
			if(foundRsrcs.length == 1) {
				theLogger.log("找到一筆符合的樣版檔, 「預設排版」為'" + foundRsrcs[0].defPrintXSLName + "', 直接指定套用此排版名稱");
				defPrintXSLName = foundRsrcs[0].defPrintXSLName;
			}
			else
				theLogger.warn("找到" + foundRsrcs.length + "筆符合的樣版檔(因環境變數「WE_CHOOSE_TEMPLATE_WHILE_IMPORT」設為'Y', 會搜尋符合文別的所有樣版檔), 無法確定應套用哪個樣版檔的「預設排版」名稱");
			// 修正EDT232匯入的空白公文稿, 在文稿管理檔中未設定「文別」屬性, 後續可能會有衍生問題, 故在此檢查並補記錄
			if(!_mgmt.getDraftDocType(_index)) {
				theLogger.log("因文稿管理檔未設定此稿件的「文別」屬性, 為避免後續發生衍生問題, 重設此稿件的文別'" + _docType + "'至文稿管理檔");
				_mgmt.setDraftDocType(_index, _docType);
				if(!_subDocType && !_mgmt.getDraftSubDocType(_index))
					console.log("文稿電子檔及文稿管理檔未記錄函類別時(文稿為'', 文稿管理檔為null), 不需要重設");
				else if(_subDocType != _mgmt.getDraftSubDocType(_index)) {
					theLogger.log("因文稿管理檔未設定或設定為不同於此稿件的「函類別」屬性, 為避免後續發生衍生問題, 重設此稿件的函類別'" + _subDocType + "'至文稿管理檔");
					_mgmt.setDraftSubDocType(_index, _subDocType);
				}
			}
			else if(_mgmt.getDraftDocType(_index) != _docType) {
				theLogger.error("文稿管理檔設定此稿件的「文別」屬性為'" + _mgmt.getDraftDocType(_index) + "', 但此稿件的電子檔實際為'" + _docType + "'");
			}
		}
		
		// 1130808 Raymond 1130313 合併1111007(1100394) 新增draftFileName, firstResolve參數
		// 1100310 Raymond 1090991 新增傳入defPrintXSLName參數, 預設排版檔名稱
		// 2014.10.22 - Raymond, 增加傳入原始匯出頁面所使用的PrintXSL全徑名(記錄在AOLProcessData.xml)
		// 套用完成後, 回傳值增加實際套用的遠端printXSL路徑及檔名
		//thePublicRsrc.applyPrintXSLT(_rawXml, _docType, _subDocType, _mgmt.getDraftOrigPrintXSL(_index), params)
		//thePublicRsrc.applyPrintXSLT(_rawXml, _docType, _subDocType, _mgmt.getDraftOrigPrintXSL(_index), params, undefined, defPrintXSLName)
		thePublicRsrc.applyPrintXSLT(_rawXml, _docType, _subDocType, _mgmt.getDraftOrigPrintXSL(_index), params, undefined, defPrintXSLName, _mgmt.getDraftFileName(_index), cbFirstResolve)
			//.done(function(intermediateXml, printXSLdir, printXSLfileName, printXSLType) {	// 2016.8.1 新增多回傳樣版類型
			//	theLogger.log([printXSLdir, printXSLfileName, printXSLType]);
			.done(function(intermediateXml, printXSLdir, printXSLfileName, printXSLType, bSupport1090621Feature) {	// 1091016 Raymond 1090621 新增多回傳樣版是否支援"令條列"旗標
				theLogger.log([printXSLdir, printXSLfileName, printXSLType, bSupport1090621Feature]);
				theLogger.log(intermediateXml);
				
				_support1090621Feature = bSupport1090621Feature;	// 1091016 Raymond 1090621 第一次排版後記下是否支援"令條列"凸排功能旗標
				
				// 2019.7 - 1080654 Eric, performance log
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                    SSOUtil.dev_logTimeElapse('applyPrintXSLT()',  window.tmBeginApplyPrintXSL);
                    window.tmBeginApplyPrintXSL = null;
				}
				
				if(!!intermediateXml) {
					if(intermediateXml.childNodes.length == 1 && intermediateXml.childNodes[0].childNodes.length == 0) {	// 2017.3.21 新增套錯樣版檔時提示錯誤
						dfd.reject(_index, "套用樣版檔'" + printXSLfileName + "'產生無效內容");
					}
					else {
						_internalFO = theLayoutEng.transXmlFragToInternalFO(intermediateXml, that);
						theLogger.log(_internalFO);
						_needRetrans = false;	// 2016.11.3 剛轉完不需要重轉
						_needRetransInitialFO = false;	// 1100909 Raymond 1101135 重置因預設內容異動而重新整理旗標
						
						// 2019.7 - 1080654 Eric, performance log
						if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                            theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- transXmlFragToInternalFO() END...');
                        }

						// 2014.10.22 - Raymond, 新增設定實際套用printXSL的全徑名
						var printXSLpath = printXSLdir;
						if(printXSLpath != "" && printXSLpath[printXSLpath.length-1] != '\\')
							printXSLpath += "\\";
						printXSLpath += printXSLfileName;
						_mgmt.setDraftApplyPrintXSL(_index, printXSLpath, printXSLType);	// 2016.8.1 多傳入樣版類型參數
						
						//106.4.17	Leslie	原邏輯搬移到applyXSL之前，以避免用到舊的稿件名稱
						//if(shouldResetDraftName)	// 2016.11.3 若shouldResetDraftName參數設為true, 則呼叫DraftMgmt.resetDraftName()重設稿序名稱
						//	_mgmt.resetDraftName(_index, _docType, _subDocType);
						
						dfd.resolve(_index, that);
					}
				}
				else {
					dfd.reject(_index, "套用樣版檔'" + printXSLfileName + "'產生無效內容(" + intermediateXml + ")");
				}
			})
			.fail(function(errorText) {
				dfd.reject(_index, errorText);
			});
		}	// end of 1140224 Raymond 1131303 後半段要等待錯別字校正物件載入完成再執行
	}
	
	// 1080723 Raymond 1080570 修復不知用何操作產生<mi act='ins'>外多了一個無sn的<fmt>, 外層再一個<mi act='del'>的無效結構(國合-蔡祥吾處長), 此結構會導致預覽列印及傳送匯出頁面中同一流程點新增又刪除的字被顯示出來
	function correctTC() {
		theLogger.log("檢測是否有異常追蹤修訂標籤並修復");
		if("xml" in _rawXml) {	// IE
			var nodeList = _rawXml.selectNodes("/*//fmt");
			if(nodeList.length > 0) {
				var removes = [],		// 應移除的節點
					movesBefore = [];	// 應移至父層之前的子節點
				for(var i=0; i<nodeList.length; i++) {
					// fmt是新稿流程點產生的, 子節點不應該有追蹤修訂的mi標籤, 以國合會案例來看是fmt不應該存在
					var thisFmt = nodeList[i];
					var childMIs = thisFmt.selectNodes("mi");
					if(childMIs.length > 0) {
						var styl = thisFmt.getAttribute("styles");
						for(var j=0; j<childMIs.length; j++) {
							if(childMIs[j].getAttribute("act") == "ins") {
								if(childMIs[j].text.length == 0) {	// 無內容的ins
									theLogger.warn("檢測到無內容的追蹤修訂標籤" + childMIs[j].xml + ", 應刪除之");
									removes.push(childMIs[j]);		// 刪除之
								}
								else {	// 有內容的ins
									if(styl > 0)	// 若fmt.styles有值, 則ins套用fmt的styles屬性
										childMIs[j].setAttribute("styles", styl);
									// 若fmt上層是mi且是del, 且sn與子mi一樣, 則刪除上層mi, 等同於新增文字後又刪除的操作
									if (thisFmt.parentNode.nodeName == "mi" &&
										thisFmt.parentNode.getAttribute("act") == "del" &&
										thisFmt.parentNode.getAttribute("sn") == childMIs[j].getAttribute("sn")) {
										theLogger.warn("檢測到同sn的刪除-新增追蹤修訂標籤" + thisFmt.parentNode.xml + ", 應刪除之");
										removes.push(thisFmt.parentNode);
									}
									else {	// 否則將ins移至fmt前
										theLogger.warn("應將子節點的追蹤修訂標籤" + childMIs[j].xml + "移至fmt父節點之前");
										movesBefore.push(childMIs[j]);
									}
								}
							}
							else {	// 其它act的mi都保留並移至fmt前
								theLogger.warn("應將子節點的追蹤修訂標籤" + childMIs[j].xml + "移至fmt父節點之前");
								movesBefore.push(childMIs[j]);
							}
						}
						theLogger.warn("應刪除多餘的fmt節點");
						removes.push(thisFmt);	// 移除此fmt
					}
				}
				if(movesBefore.length > 0 || removes.length > 0) {
					// 先移
					for(var i=0; i<movesBefore.length; i++) {
						theLogger.log("移動" + movesBefore[i].xml + "至父節點前");
						try {
							movesBefore[i].parentNode.parentNode.insertBefore(movesBefore[i], movesBefore[i].parentNode);
						}
						catch(e) {
							theLogger.error(e.message);
						}
					}
					// 再刪
					for(var i=0; i<removes.length; i++) {
						theLogger.log("移除" + removes[i].xml);
						try {
							removes[i].parentNode.removeChild(removes[i]);
						}
						catch(e) {
							theLogger.error(e.message);
						}
					}
					return true;	// 檢測到異常追蹤修訂標籤結構且已修復
				}
			}
		}
		else {	// Other
			var snapshot = _rawXml.evaluate("/*//fmt", _rawXml, null, 7, null);
			if(snapshot.snapshotLength > 0) {
				var removes = [],		// 應移除的節點
					movesBefore = [];	// 應移至父層之前的子節點
				for(var i=0; i<snapshot.snapshotLength; i++) {
					// fmt是新稿流程點產生的, 子節點不應該有追蹤修訂的mi標籤, 以國合會案例來看是fmt不應該存在
					var thisFmt = snapshot.snapshotItem(i);
					var childMIs = thisFmt.getElementsByTagName("mi");
					if(childMIs.length > 0) {
						var styl = thisFmt.getAttribute("styles");
						for(var j=0; j<childMIs.length; j++) {
							if(childMIs[j].getAttribute("act") == "ins") {
								if(childMIs[j].textContent.length == 0) {	// 無內容的ins
									theLogger.warn("檢測到無內容的追蹤修訂標籤" + $("<div/>").append(childMIs[j].cloneNode(true)).html() + ", 應刪除之");
									removes.push(childMIs[j]);		// 刪除之
								}
								else {	// 有內容的ins
									if(styl > 0)	// 若fmt.styles有值, 則ins套用fmt的styles屬性
										childMIs[j].setAttribute("styles", styl);
									// 若fmt上層是mi且是del, 且sn與子mi一樣, 則刪除上層mi, 等同於新增文字後又刪除的操作
									if (thisFmt.parentNode.nodeName == "mi" &&
										thisFmt.parentNode.getAttribute("act") == "del" &&
										thisFmt.parentNode.getAttribute("sn") == childMIs[j].getAttribute("sn")) {
										theLogger.warn("檢測到同sn的刪除-新增追蹤修訂標籤" + $("<div/>").append(thisFmt.parentNode.cloneNode(true)).html() + ", 應刪除之");
										removes.push(thisFmt.parentNode);
									}
									else {	// 否則將ins移至fmt前
										theLogger.warn("應將子節點的追蹤修訂標籤" + $("<div/>").append(childMIs[j].cloneNode(true)).html() + "移至fmt父節點之前");
										movesBefore.push(childMIs[j]);
									}
								}
							}
							else {	// 其它act的mi都保留並移至fmt前
								theLogger.warn("應將子節點的追蹤修訂標籤" + $("<div/>").append(childMIs[j].cloneNode(true)).html() + "移至fmt父節點之前");
								movesBefore.push(childMIs[j]);
							}
						}
						theLogger.warn("應刪除多餘的fmt節點");
						removes.push(thisFmt);	// 移除此fmt
					}
				}
				if(movesBefore.length > 0 || removes.length > 0) {
					// 先移
					for(var i=0; i<movesBefore.length; i++) {
						theLogger.log("移動" + $("<div/>").append(movesBefore[i].cloneNode(true)).html() + "至父節點前");
						try {
							movesBefore[i].parentNode.parentNode.insertBefore(movesBefore[i], movesBefore[i].parentNode);
						}
						catch(e) {
							theLogger.error(e.message);
						}
					}
					// 再刪
					for(var i=0; i<removes.length; i++) {
						theLogger.log("移除" + $("<div/>").append(removes[i].cloneNode(true)).html());
						try {
							removes[i].parentNode.removeChild(removes[i]);
						}
						catch(e) {
							theLogger.error(e.message);
						}
					}
					return true;	// 檢測到異常追蹤修訂標籤結構且已修復
				}
			}
		}
		return false;	// 未檢測到異常追蹤修訂標籤結構
	}
	
	// 1090115 Raymond 1081166 新增判斷此文別是否支援匯出DI格式
	function supportSaveDI() {
		var res = false, exDI;
		if("exDI" in nsEditor && "exSW" in nsEditor) {
			// 匯出DI、SW之XSL已下載
		}
		else {
			thePublicRsrc.enumDirs("匯出設定", function(dir) {
				for(var i=0; i<dir.children.length; i++) {
					var nm = dir.children[i].name;
					if(nm == "DI") {
						exDI = dir.children[i];
						break;
					}
				}
			});
			if(!!exDI) {	// PS:XSL須轉為UTF-16, 否則二代不能使用
				var ph = exDI.remote.path;
				theLogger.log("下載'" + ph + "'...");
				theCacheMgr.get({type: "rsrc", rsrc: exDI, async: false})
				.done(function(xslDoc) {
					nsEditor.exDI = xslDoc;
				});
			}
			theLogger.log("匯出DI.XSL -- ");
			theLogger.log(nsEditor.exDI);
		}
		if(!!nsEditor.exDI) {
			var supNodes = nsEditor.exDI.getElementsByTagNameNS("http://www.2100t.com.tw/2008/OD/Export","supported-doctypes");
			if(supNodes.length > 0) {
				var supDocTypes = supNodes[0].textContent.split("|");
				theLogger.log(supDocTypes);
				if(supDocTypes.indexOf(_docType) >= 0) {
					theLogger.warn("匯出DI.XSL支援'" + _docType + "'");
					res = true;
				}
				else
					theLogger.error("匯出DI.XSL不支援'" + _docType + "'");
			}
			else
				theLogger.error("匯出DI.XSL未定義supported-doctypes參數, 無法判斷是否支援'" + _docType + "'另存DI功能");
		}
		else
			theLogger.error("資源管理檔未定義匯出DI的XSL資源, 無法進行匯出DI");
		return res;
	}
	
	// 1090115 Raymond 1081166 新增匯出DI格式
	function saveDI(options, dirPath, fileName) {
		if(!nsEditor.exDI) {
			theLogger.error("資源管理檔未定義匯出DI的XSL資源, 無法進行匯出DI");
			throw new Error("資源管理檔未定義匯出DI的XSL資源, 無法進行匯出DI");
		}
		var xmlDoc = _rawXml;
		// 1071025 Raymond 新增轉換為完稿結果的XML
		if("transCmplXml" in nsEditor) {
			// 1100217 Raymond 1090610 儲存公文時儲存線上簽核多產生的DI, 不要轉出群組受文者中的成員受文者, 以節省儲存所耗費時間
			//xmlDoc = nsEditor.transCmplXml(_rawXml);
			xmlDoc = nsEditor.transCmplXml(_rawXml, true);
		}
		theLogger.log("轉換為104DI...");
		try {
			if("XSLTProcessor" in window) {
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
				// 直接匯出DI, 不用先匯出SW再設定DI的交換檔名ENTITY
				var xslt = new XSLTProcessor();
				// 因為Chrome直接transformToDocument只會產生DOCTYPE, 不會產生DOCTYPE的ENTITY, 故先用output method="text"轉出純文字包含ENTITY的部分, 並切割出來
				var snapshot = nsEditor.exDI.evaluate("xsl:output", nsEditor.exDI.documentElement, nsResolver, 7, null);
				if(snapshot.snapshotLength > 0)
					snapshot.snapshotItem(0).setAttribute("method", "text");
				xslt.importStylesheet(nsEditor.exDI);
				var res = xslt.transformToDocument(xmlDoc);
				theLogger.log("xsl, xml, xslt:");
				theLogger.log(Util.getXml(nsEditor.exDI));
				theLogger.log(Util.getXml(xmlDoc));
				theLogger.log((new XMLSerializer()).serializeToString(res));
				var tmp = res.body.firstElementChild.textContent;
				theLogger.log(tmp);
				var pend = tmp.indexOf("]>"), dtcl = "";
				if(pend > 0)
					dtcl = tmp.substr(0, pend + 3);
				// 恢復output method="xml", 再轉一次
				if(snapshot.snapshotLength > 0)
					snapshot.snapshotItem(0).setAttribute("method", "xml");
				xslt.reset();
				xslt.importStylesheet(nsEditor.exDI);
				res = xslt.transformToDocument(xmlDoc, document);
				theLogger.log("xsl, xml, xslt:");
				theLogger.log(Util.getXml(nsEditor.exDI));
				theLogger.log(Util.getXml(xmlDoc));
				theLogger.log((new XMLSerializer()).serializeToString(res.documentElement));
				
				var xml = '<?xml version="1.0" encoding="utf-8"?>\r\n' + dtcl + (new XMLSerializer()).serializeToString(res.documentElement);
				var dat = unescape(encodeURIComponent(xml));;
				options.success(_index, dirPath, fileName, null, dat);
				return true;
			}
			else {
				// 直接匯出DI, 不用先匯出SW再設定DI的交換檔名ENTITY
				var msxsl = new ActiveXObject("MSXML2.DOMDocument");
				var res = msxsl.loadXML(Util.getXml(nsEditor.exDI));
				res = xmlDoc.transformNode(msxsl);
				theLogger.log("xsl, xml, xslt:");
				theLogger.log(Util.getXml(msxsl));	// 2016.11.2 bugfix
				theLogger.log(Util.getXml(xmlDoc));
				theLogger.log(res);
				
				var xml = '<?xml version="1.0" encoding="utf-8"?>\r\n' + res;
				var dat = unescape(encodeURIComponent(xml));;
				options.success(_index, dirPath, fileName, null, dat);
				return true;
			}
		}
		catch(e) {
			theLogger.error(e.stack || e.message);
			throw e;
		}
	}
	// 1120810 Raymond 1120503 新增將文稿列印頁面轉為影像檔功能(copy from 高大客製需求單1101223)
	function printDraftPages(that, opts, $pages) {
		var dfd = $.Deferred();
		var applyCustom = _rawXml.documentElement.getAttribute("套用自訂") == "True";	// 套用自訂屬性, 若值為True表示經過設定段落屬性, 需套用自訂
		var origPrintXSL = _mgmt.getDraftOrigPrintXSL(_index);	// 取得原始套用的樣版檔名, 若無表示文稿未初始化或未選取排版設定檔
		if(typeof origPrintXSL === "string" && origPrintXSL.length > 0) {
			var rsrcFile = undefined;
			var fnPrintXSL = origPrintXSL.substr(origPrintXSL.lastIndexOf('\\') + 1);
			var found = false;
			thePublicRsrc.enumDirs("排版設定", function(dir) {
				for(var j=0; j<dir.children.length; j++) {
					if(fnPrintXSL == dir.children[j].remote.path) {
						rsrcFile = dir.children[j];
						found = true;
						$.extend(opts, {printXslName: dir.children[j].name,		// 套用樣版檔名
										printMailMerge: false,					// 列印用途
										applyCustom: applyCustom});				// 套用自訂, 預設是否套用自訂改依文稿的設定值決定
						break;
					}
				}
			});
			if(!found) {
				theLogger.error("資源管理檔中找不到前次儲存時所套用的排版設定檔(" + origPrintXSL + ")");
				dfd.reject("資源管理檔中找不到前次儲存時所套用的排版設定檔(" + origPrintXSL + ")");
			}
			
			if(rsrcFile.category == "稿" || opts.printMailMerge == false) {	// 稿樣版或簽核用
				var params = {
					"新系統": false,
					"檢視模式": opts.applyTCMode || "3",
					"編輯階段序號": _mgmt.getEditSN(),
					"稿": rsrcFile.category == "稿",
					"條碼": opts.printBarcode == true,
					"頁碼": opts.printPageNo == true,
					"自訂": opts.applyCustom == true,
					"稿序": _mgmt.getDraftName(_index),
					"檔名": opts.printDraftFileName?_mgmt.getDraftFileName(_index):""
				};
				var tcSess = _mgmt.getAllTCSess();
				for(var i=0; i<tcSess.length; i++) {
					params["color" + tcSess[i].index] = tcSess[i].color;
				}
				// 1100309 Raymond 1090990 新增「簽核類型」變數, 傳入目前公文的SignType, 僅"稿"需要
				if(rsrcFile.category == "稿")
					params["簽核類型"] = _mgmt.getDocObj().signType;
				
				thePublicRsrc.applyPrintXSLT(_rawXml, _docType, _subDocType, rsrcFile.remote.getFullPath(), params)
				.done(function(intermediateXml, printXSLdir, printXSLfileName) {
					theLogger.log([printXSLdir, printXSLfileName]);
					theLogger.log(intermediateXml);
			
					if(intermediateXml != undefined) {
						var internalFO = theLayoutEng.transXmlFragToInternalFO(intermediateXml, that);
						theLogger.log(internalFO);
						
						theLayoutEng.instanciateFOPages(internalFO, opts, $pages).done(function(nfo, $pages) {
							theLogger.warn("所有文稿頁面已動態排版完成, 共" + nfo.pages + "頁, $pages.find('.pg').length = " + $pages.find(".pg").length);
							
							dfd.resolve(nfo, $pages);
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
		}
		else {
			theLogger.error("前次儲存未儲存套用之排版設定檔路徑或本次開啟時未選取套用之排版設定檔");
			dfd.reject("前次儲存未儲存套用之排版設定檔路徑或本次開啟時未選取套用之排版設定檔");
		}
		return dfd.promise();
	}
	
	// public interface
	return {
		// public methods
		setDocType: function(docType) {
			_docType = docType;
		},
		getDocType: function() {
			return _docType;
		},
		setSubDocType: function(subDocType) {
			_subDocType = subDocType;
		},
		getSubDocType: function() {
			return _subDocType;
		},
		getTCSess: function(sn) {
			return _mgmt.getTCSess(sn);
		},
		getAllTCSess: function() {
			return _mgmt.getAllTCSess();
		},
		getCreateSN: function() {
			return _createSN;
		},
		getEditSN: function() {	// 2016.2.1 新增, 因文稿管理檔不只一個, 故文稿內要求取得EditSN須改經過DraftModel向DraftMgmt取得, 不可直接用theAOL.getCurrFolio().getEditSN()
			return _mgmt.getEditSN();
		},
		// 1141218 Raymond 北榮序453 因1140818禁止出組室過的非可發文文別異動內文, 但要對自動增高簽核區域允許異動, 新增purpose參數, 若傳入"forSALP", 則允許異動
		//getEditable: function() {	// 2016.2.2 新增, 文稿可否編輯改由DraftMgmt決定, 因同一公文內有會辦文稿時承辦或非會辦單位不可編輯
		getEditable: function(purpose) {	// 2016.2.2 新增, 文稿可否編輯改由DraftMgmt決定, 因同一公文內有會辦文稿時承辦或非會辦單位不可編輯
			/* 1120523 Raymond 1120307 將以下判斷移至DraftMgmt, 以避免備份時由於未點開文稿, 而未執行到DraftModel的getEditable判斷, 造成SignWork.xml中漏寫未點開的<文稿>節點, 導致從備份還原後會發生傳送錯誤(代碼713)問題
			// 1110624 Raymond 1110548 新增核決後公文以環境變數「WE_APPROVE_DISABLE_DRAFTEDIT_TYPE」設定的文別決定文稿是否要禁止編輯
			if(theSSO.User.EnvSettings.get("WE_APPROVE_DISABLE_DRAFTEDIT_TYPE").length > 0 && !!_mgmt.getDocObj().get("ODWMSG", "APP_USER_ID") && _mgmt.getDocObj().get("ODWMSG", "APP_USER_ID").length > 0) {
				var disDraftTypes = theSSO.User.EnvSettings.get("WE_APPROVE_DISABLE_DRAFTEDIT_TYPE").split(";");
				if(disDraftTypes.indexOf(_docType) >= 0) {
					theLogger.log("已核決公文, 此文稿之文別符合環境變數「WE_APPROVE_DISABLE_DRAFTEDIT_TYPE」設定, 禁止編輯內文");
					return false;
				}
			}
			else	// 此功能與下面互斥
			// 1100419 Raymond 1080767 合併內政部1070530並新增判斷系統參數"CHECK_CLOSEDDRAFT_EDIT"為"Y"時, 發文/結案流程點前所新增文稿不可異動內容
			if(_mgmt.getEditable() && theSSO.User.SystemSets.get("CHECK_CLOSEDDRAFT_EDIT") == "Y" && _mgmt.isClosedDraftCrSN(_createSN)) {
				if(_mgmt.isClosedDraftCanEditFolder()) {
					if(_docType != "簽稿會核單" && _docType != "會辦單") {
						theLogger.log("此文稿為發文/結案流程點前所新增文稿, 但符合可編輯資料夾設定, 允許異動內容");
						return true;
					}
					else	// 結案前新增的簽稿會核單再依舊邏輯判定可否編輯
						theLogger.log("此文稿為發文/結案流程點前所新增「" + _docType + "」, 但符合可編輯資料夾設定, 依承辦會辦角色進一步判定");
				}
				else {
					theLogger.log("此文稿為發文/結案流程點前所新增文稿, 不允許異動內容");
					return false;
				}
			}
			if((_docType == "簽稿會核單" || _docType == "會辦單") && _mgmt.getEditable()) {	// 2017.3.15 簽稿會核單及會辦單額外檢核是否符合禁止編輯內文的folder-subfolder, 若是的話, 禁止編輯內文, 問題1060140*/
				/* 以下為預設禁止編輯簽稿會核單內文的folder-subfolder
				var lst = ["待處理-待核示", "待處理-補陳中", "待處理-待補核", "待處理-單位發文", "待處理-待繕印", "待處理-待校對", "待處理-待發文"];
				var str = theSSO.User.EnvSettings.get("AOL_DISABLE_EDIT_CON_FOLDER_LIST");	// 讀取禁止編輯簽稿會核單的folder-subfolder清單
				if(typeof str === "string" && str.length > 0) {
					theLogger.log("環境變數[AOL_DISABLE_EDIT_CON_FOLDER_LIST] = '" + str + "'");
					lst = str.split(";");
				}
				
				var folder = _mgmt.getDocObj().folder,
					subfolder = _mgmt.getDocObj().subfolder,
					key = folder + "-" + subfolder;
				if(lst.indexOf(key) >= 0) {
					theLogger.warn("本文位於'" + key + "', 符合禁止編輯簽稿會核單/會辦單內文的條件, 禁止編輯內文");
					return false;
				}*/
				/* 2017.3.16 改依系統部評估的判斷規則
				var icou = _mgmt.getDocObj().ICOUId,
					ownou = _mgmt.getDocObj().ownOUId,
					ownrole = _mgmt.getDocObj().ownRoleId;
				if(!icou && !ownou && !ownrole)	// 2017.4.6 fix for AKI802文稿編輯開啟DocView模式時, 無ownou等資訊的情況, 問題1060206
					return _mgmt.getEditable();
				// 1100318 Raymond 1090853 新增當環境變數「WE_DISABLE_REEDIT_簽稿會核單」為Y時, 禁止任何人包含主會辦單位承辦人(OD99)異動簽稿會核單內文
				if(theSSO.User.EnvSettings.get("WE_DISABLE_REEDIT_簽稿會核單") == "Y") {
					if(_createSN == _mgmt.getEditSN()) {
						theLogger.warn(_docType + "為此流程點新增, 允許編輯(環境變數「WE_DISABLE_REEDIT_簽稿會核單」='Y')");
						return true;
					}
					theLogger.warn(_docType + "非此流程點新增, 禁止編輯(環境變數「WE_DISABLE_REEDIT_簽稿會核單」='Y')");
					return false;
				}
				else
				if(icou.substr(0, 2) == ownou.substr(0, 2) && ownrole == "OD99") {
					theLogger.warn(_docType + "在承辦人流程點(ICOUId:" + icou + ", ownOUId:" + ownou + ", ownRoleId:" + ownrole + "), 允許編輯");
					return true;
				}
				// 1070608 Raymond 1070197 會辦單位新增的簽稿會核單在同一會辦單位的承辦人角色時可編輯
				else if(_mgmt.getConDraftUnitNo(_index) == ownou.substr(0, 2) && ownrole == "OD99") {
					theLogger.warn(_docType + "在會辦人流程點(DraftOU:" + _mgmt.getConDraftUnitNo(_index) + ", ownOUId:" + ownou + ", ownRoleId:" + ownrole + "), 允許編輯");
					return true;
				}
				else if(_createSN == _mgmt.getEditSN()) {	// 2017.3.31 新增當流程點新增的簽稿會核單, 允許編輯
					theLogger.warn(_docType + "在非承辦人流程點(ICOUId:" + icou + ", ownOUId:" + ownou + ", ownRoleId:" + ownrole + "), 但為此流程點新增, 允許編輯");
					return true;
				}
				// 1100816 Raymond 1100482 新增當環境變數「WE_ALLOW_CON_KEEP_SIGNOBJ」為Y時, 允許任何人異動簽稿會核單內文
				else if(theSSO.User.EnvSettings.get("WE_ALLOW_CON_KEEP_SIGNOBJ") == "Y") {
					theLogger.warn(_docType + "在非承辦人流程點(ICOUId:" + icou + ", ownOUId:" + ownou + ", ownRoleId:" + ownrole + "), 但(環境變數「WE_DISABLE_REEDIT_簽稿會核單」='" + theSSO.User.EnvSettings.get("WE_DISABLE_REEDIT_簽稿會核單") + "' & 「WE_ALLOW_CON_KEEP_SIGNOBJ」='Y'), 允許編輯");
					return true;
				}
				else {
					theLogger.warn(_docType + "在非承辦人流程點(ICOUId:" + icou + ", ownOUId:" + ownou + ", ownRoleId:" + ownrole + "), 禁止編輯");
					return false;
				}
			}
			return _mgmt.getEditable();*/
			// 1141218 Raymond 北榮序453 因1140818禁止出組室過的非可發文文別異動內文, 但要對自動增高簽核區域允許異動, 新增purpose參數, 若傳入"forSALP", 則允許異動
			//return _mgmt.confirmDraftEditable(_index) ||	// 改呼叫移至DraftMgmt後新增的confirmDraftEditable方法, 傳入本文稿的索引值
			return _mgmt.confirmDraftEditable(_index, purpose) ||	// 改呼叫移至DraftMgmt後新增的confirmDraftEditable方法, 傳入本文稿的索引值
				this.canEditCon();	// 1121219 Raymond 1120887 新增支援簽稿會核單可編輯會辦意見區
		},
		// 1130808 Raymond 1130313 合併1111007(1100394), 新增waitUntilSelXSL參數, 匯入ZIP壓縮檔中的文稿檔, 若要選取套用樣版檔時, 不要提前resolve
		// 1100310 Raymond 1090991 新增第5參數defPrintXSLName, 若樣版資源檔有設定"預設排版"屬性值, 將會以此參數傳入
		//init: function(folio, index, fileIOWS, dirPath) {
		//init: function(folio, index, fileIOWS, dirPath, defPrintXSLName) {
		init: function(folio, index, fileIOWS, dirPath, defPrintXSLName, waitUntilSelXSL) {
			_mgmt = folio;
			//theLogger.log("DraftModal.init(index:" + index + "), private _index: " + _index);
			_index = index;
			var that = this;
			var dfd = $.Deferred();
			// 2016.2.2 改用dirPath切出子目錄名稱加.文稿檔名作為暫存檔名
			var l = dirPath.lastIndexOf('\\');
			if(l < 0)
				dfd.reject(_index, "傳入的應下載子目錄路徑未包含'\\', 應是不合法的路徑名");
			else {
				var cachedDraftName = dirPath.substring(l+1) + "." + _mgmt.getDraftFileName(index);
				if(cachedDraftName in sessionStorage) {
					theLogger.log("讀取暫存於連線階段的文稿XML'" + cachedDraftName + "'");
					if("ActiveXObject" in window) {	// 2016.5.17 for IE
						_rawXml = new ActiveXObject("MSXML2.DOMDocument");
						_rawXml.resolveExternals = false;
						_rawXml.validateOnParse = false;
						_rawXml.preserveWhiteSpace = true;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
						var b = _rawXml.loadXML(sessionStorage[cachedDraftName]);
						if(!b) {
							var pe = _rawXml.parseError;
							theLogger.error("載入XML失敗! " + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
							dfd.reject(_index, pe.reason);
						}
					}
					else {
						theLogger.log("sessionStorage[" + cachedDraftName + "]:");
						theLogger.log(sessionStorage[cachedDraftName]);
						_rawXml = (new DOMParser()).parseFromString(sessionStorage[cachedDraftName], "text/xml");
					}
					if(cachedDraftName + ".dirty" in sessionStorage) {	// 預設從樣版新增文稿要設dirty
						_dirty = sessionStorage[cachedDraftName + ".dirty"] == "true";
						sessionStorage.removeItem(cachedDraftName + ".dirty");
						// 1120915 Raymond 1120574 新增記錄最後異動時間
						if(_dirty) {
							var dt = Util.now();
							_lastModifyTime = Util.padLeft(dt.getYear() - 11, 3) + Util.padLeft(dt.getMonth() + 1, 2) + Util.padLeft(dt.getDate(), 2) + Util.padLeft(dt.getHours(), 2) + Util.padLeft(dt.getMinutes(), 2) + Util.padLeft(dt.getSeconds(), 2);
						}
					}
					// 1130808 Raymond 1130313 合併1111007(1100394), 新增匯入ZIP壓縮檔中的對照檔
					var cachedMMName = dirPath.substring(l+1) + "." + _mgmt.getDraftFileName(index).replace("-tc", "-mm");
					if(cachedMMName in sessionStorage) {
						theLogger.log("讀取暫存於連線階段的對照表XML'" + cachedMMName + "'");
						if("ActiveXObject" in window) {	// 2016.5.17 for IE
							var mmxml = new ActiveXObject("MSXML2.DOMDocument");
							mmxml.resolveExternals = false;
							mmxml.validateOnParse = false;
							mmxml.preserveWhiteSpace = true;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
							var b = mmxml.loadXML(sessionStorage[cachedMMName]);
							if(!b) {
								var pe = mmxml.parseError;
								theLogger.error("載入XML失敗! " + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
							}
							else
								_mailMergeTable.load(mmxml);
						}
						else {
							theLogger.log("sessionStorage[" + cachedMMName + "]:");
							theLogger.log(sessionStorage[cachedMMName]);
							var mmxml = (new DOMParser()).parseFromString(sessionStorage[cachedMMName], "text/xml");
							_mailMergeTable.load(mmxml);
						}
						sessionStorage.removeItem(cachedMMName);
					}					
					// 1111117 Raymond 1111069 載入新增文稿檔後就刪掉暫存在sessionStorage的項目, 以避免不明步驟造成載入不同筆公文的文稿取代目前公文的文稿的問題
					sessionStorage.removeItem(cachedDraftName);
					// 1130808 Raymond 1130313 合併1111007(1100394), 新增waitUntilSelXSL參數, 匯入ZIP壓縮檔中的文稿檔, 若要選取套用樣版檔時, 不要提前resolve
					// 1100310 Raymond 1090991 新增傳入第4參數defPrintXSLName
					//doInit(dfd, that);
					//doInit(dfd, that, undefined, defPrintXSLName);
					doInit(dfd, that, undefined, defPrintXSLName, waitUntilSelXSL);
				}
				else {
					theLogger.log("下載文稿檔#" + index + ":'" + dirPath + "\\" + _mgmt.getDraftFileName(index) + "'");
					
					// 2019.7 - 1080654 Eric, performance log
					if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                        theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 下載文稿檔 BEGIN...');
                        window.tmBeginDownloadDraft = Date.now();
					}
					
					var wfio = new WebFileIO(fileIOWS);
					var tcFileName = _mgmt.getDraftFileName(index);	// 2016.10.25 FIX for 下載MM檔
					wfio.download(dirPath, tcFileName, {	// 下載追蹤修訂文稿檔
						allowMSXML: true,				// 2016.5.17 新增允許回傳MSXML物件
						success: function(fil, res) {
							// 1140710 Raymond 1140310 修正下載DI檔時會以Document物件回傳, 而非string, 導致附件標籤未預處理為附件列表衍生的問題
							// 1110328 Leslie[1100287]	Merge[1070359]	新增支援載入DI副檔名時, 先執行前置處理再執行後續功能
							//if(typeof fil === "string" && tcFileName.match(/.di$/i)) {
							if((typeof fil === "string" || fil instanceof Document) && tcFileName.match(/.di$/i)) {
								if("ActiveXObject" in window) {
									_rawXml = new ActiveXObject("MSXML2.DOMDocument");
									_rawXml.resolveExternals = false;
									_rawXml.validateOnParse = false;
									_rawXml.preserveWhiteSpace = true;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
									// 1110506 Raymond 1110521 修正IE無法正常匯入DI的問題
									//if(_rawXml.loadXML(fil)) {
									if(!_rawXml.loadXML(fil)) {
										var pe = _rawXml.parseError;
										theLogger.error("載入XML失敗! " + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
										dfd.reject(_index, "載入'" + tcFileName + "'失敗! " + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
									}
									else {
										// 1110526 Raymond 1110521 新增傳入第2參數為true, 表示是文稿管理檔記錄的文稿檔本身就是DI檔, 不是開啟舊檔匯入的
										//nsEditor.preprocessXML(_rawXml);	// 匯入DI時的前置處理
										nsEditor.preprocessXML(_rawXml, true);	// 匯入DI時的前置處理
										nsEditor.supplyFromTemplate(_rawXml).always(function() {
											afterLoadDraft();	// 非同步處理完載入DI的前置作業後再執行後續
										});
									}
								}
								else {
									// 1140710 Raymond 1140310 修正下載DI檔會以Document物件回傳, 而非字串, 導致<附件>標籤未預處理為<附件列表>而衍生的問題
									//_rawXml = (new DOMParser()).parseFromString(fil, "text/xml");
									_rawXml = (fil instanceof Document)?fil:(new DOMParser()).parseFromString(fil, "text/xml");
									if(_rawXml.documentElement.nodeName == "parsererror") {	// FireFox用這種方式回傳錯誤
										theLogger.error("載入XML失敗! " + _rawXml.documentElement.firstChild.textContent);
										dfd.reject(_index, "載入'" + tcFileName + "'失敗! " + _rawXml.documentElement.firstChild.textContent);
									}
									else if(_rawXml.documentElement.nodeName == "html" &&
											_rawXml.documentElement.firstChild.nodeName == "body" &&
											_rawXml.documentElement.firstChild.firstChild.nodeName == "parsererror") {	// Big5編碼變亂碼, Chrome會產生<html><body><parsererror>
										theLogger.error("載入XML失敗! " + _rawXml.documentElement.firstChild.firstChild.textContent);
										dfd.reject(_index, "載入'" + tcFileName + "'失敗! " + _rawXml.documentElement.firstChild.firstChild.textContent);
									}
									else {	// 載入成功則新增文稿
										// 1060919 Raymond 1060801 新增判斷是否解碼不正常
										if(_rawXml.documentElement.nodeName.length > 0 &&
											_rawXml.documentElement.nodeName.charCodeAt(0) == 0xFFFD) {
											theLogger.error("載入XML失敗! 根節點名稱<" + _rawXml.documentElement.nodeName + ">含有不正確解碼的識別字元");
											dfd.reject(_index, "載入'" + tcFileName + "'失敗! 根節點名稱<" + _rawXml.documentElement.nodeName + ">含有不正確解碼的識別字元");
										}
										else {
											// 1110526 Raymond 1110521 新增傳入第2參數為true, 表示是文稿管理檔記錄的文稿檔本身就是DI檔, 不是開啟舊檔匯入的
											//nsEditor.preprocessXML(_rawXml);	// 匯入DI時的前置處理
											nsEditor.preprocessXML(_rawXml, true);	// 匯入DI時的前置處理
											nsEditor.supplyFromTemplate(_rawXml).always(function() {
												afterLoadDraft();	// 非同步處理完載入DI的前置作業後再執行後續
											});
										}
									}
								}
							}
							else {
								_rawXml = fil;
								
								// 1120807 Raymond 1120503 下載自訂表格記錄檔
								//afterLoadDraft();	// 一般XML在download後即為XML Document, 直接同步執行後續作業
								var tbFileName = tcFileName.replace("-tc", "-tb");
								wfio.download(dirPath, tbFileName, {
									success: function(fil2, res2) {	// 只處理成功下載的情況, 自訂表格記錄檔不一定存在
										let clr0 = "color:black;background-color:white",
											clr1 = "color:cyan;background-color:darkgray";
										console.log("%cCTBL%c: 載入自訂表格記錄檔...", clr1, clr0);
										_ctblRecords.load(fil2);
										afterLoadDraft();	// 下載tb檔成功後才能開始載入文稿後的處理程序
									},
									error: function() {
										// bypass 不存在的error
										afterLoadDraft();	// 判斷tb檔不存在後才能開始載入文稿後的處理程序
									}
								});
							}
							// 1070612 Raymond 載入XML或DI後續部分切為一個function, 供同步或非同步前置處理完成後再執行
							function afterLoadDraft() {
								try {	// for IE-compatible, IE在沒開F12的情況下log MSXML2.XMLDOMNode會丟出「物件不支援此屬性或方法」的Exception
									theLogger.log(_rawXml);
								}
								catch(e) {
									theLogger.error("dump rawXml fail! - " + e.message);
								}
							// 1110328 Leslie[1100287]	Merge[1070359]	新增支援載入DI副檔名時, 先執行前置處理再執行後續功能	==END==
							/* 2016.9.22 取消Cache下載的文稿檔, 避免附件列表之類的因Cache沒更新
							if(navigator.userAgent.match(/Trident/)) {	// 2016.5.17 for IE
								sessionStorage[cachedDraftName] = _rawXml.xml;
							}
							else {
								sessionStorage[cachedDraftName] = (new XMLSerializer()).serializeToString(_rawXml);
							}*/
							
							// 2016.10.25 下載分繕變數記錄檔
							var mmFileName = tcFileName.replace("-tc", "-mm");
							wfio.download(dirPath, mmFileName, {
								allowMSXML: true,
								success: function(fil2, res2) {	// 只處理成功下載的情況, 分繕變數記錄檔不一定存在
									_mailMergeTable.load(fil2);
								},
								error: function() {
									// bypass 不存在的error
								}
							});
							
							// 1080723 Raymond 1080570 修復無效及錯誤的追蹤修訂結構
							if(correctTC() && that.getEditable()) {	// 先correctTC再getEditable, getEditable只是確認可以set dirty
								theLogger.log("因修復異常或錯誤追蹤修訂結構, 設定為已異動");
								_dirty = true;
							}
							
							// 2019.7 - 1080654 Eric, performance log
							if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                                SSOUtil.dev_logTimeElapse('下載文稿檔作業',  window.tmBeginDownloadDraft);
                                window.tmBeginDownloadDraft = null;
                            }
							// 1100310 Raymond 1090991 新增傳入第4參數defPrintXSLName
							//doInit(dfd, that);
							doInit(dfd, that, undefined, defPrintXSLName);
							}
						},
						error: function(errorText) {
							dfd.reject(_index, errorText);
						}
					});
				}
			}
			return dfd.promise();
		},
		getInternalFO: function() {
			var dfd = $.Deferred();
			// 1130111 Raymond 1120887 修正分會中公文docObj無getODWDCM()的問題
			// 1121123 Raymond 領務局問題序321 新增判斷ODWMSG.COM_NO下有併案文號的話, 文稿可編輯且有<母文文號>節點時, 檢查與ODWMSG.COM_NO下的第一筆COM_DOC_NO(母文文號)是否相同, 不同的話直接將第一筆ODWMSG.COM_NO.COM_DOC_NO寫到文稿的<母文文號>節點
			//if(!!_mgmt && !!_mgmt.getDocObj() && !!_mgmt.getDocObj().getODWDCM() && !!_mgmt.getDocObj().getODWDCM().COM_NO && Array.isArray(_mgmt.getDocObj().getODWDCM().COM_NO) && _mgmt.getDocObj().getODWDCM().COM_NO.length > 0 && !!_mgmt.getDocObj().getODWDCM().COM_NO[0]) {
			if(!!_mgmt && !!_mgmt.getDocObj() && !!_mgmt.getDocObj().getODWDCM && !!_mgmt.getDocObj().getODWDCM() && !!_mgmt.getDocObj().getODWDCM().COM_NO && Array.isArray(_mgmt.getDocObj().getODWDCM().COM_NO) && _mgmt.getDocObj().getODWDCM().COM_NO.length > 0 && !!_mgmt.getDocObj().getODWDCM().COM_NO[0]) {
				let comDocNo = _mgmt.getDocObj().getODWDCM().COM_NO[0].COM_DOC_NO;
				let comDocNoNodes = _rawXml.getElementsByTagName("母文文號");
				if(comDocNoNodes.length > 0 && comDocNoNodes[0].textContent != comDocNo) {
					if(this.getEditable()) {
						theLogger.log("公文基資(ODWDCM.XML)有設定併案母文號('" + comDocNo + "'), 但與本文稿的「母文文號」欄位內容('" + comDocNoNodes[0].textContent + "')不相同, 自動重新設定為'" + comDocNo + "'");
						this.text("/*/母文文號", comDocNo);
					}
					else
						theLogger.warn("公文基資(ODWDCM.XML)有設定併案母文號('" + comDocNo + "'), 但與本文稿的「母文文號」欄位內容('" + comDocNoNodes[0].textContent + "')不相同, 但因本流程點無編輯本文稿權限, 故無法自動重設為新的母文文號");
				}
			}
			if(_needRetransInternalFO() || _mgmt.isDraftNameChanged(_index)) {	// 2016.11.23 新增判斷稿序名稱是否有異動, 有異動的話需要重新套用樣版
				var that = this;
				// 2016.10.19 FIX for 未帶稿序問題
				var params = {
						/*"檢視模式": opts.applyTCMode || "3",
						"編輯階段序號": dm.getEditSN(),
						"稿": rsrcFile.category == "稿",
						"條碼": opts.printBarcode == true,
						"頁碼": opts.printPageNo == true,
						"預設字型": opts.printFont || "標楷體",
						"預設行高": opts.printLineHeight || "1.5",
						"自訂": opts.applyCustom == true,*/
						"稿序": _mgmt.getDraftName(_index),
						/*"檔名": opts.printDraftFileName?fm.getDraftFileName(draftIdx):""*/
					};
				var tcSess = _mgmt.getAllTCSess();
				for(var i=0; i<tcSess.length; i++) {
					params["color" + tcSess[i].index] = tcSess[i].color;
				}
				// 1100309 Raymond 1090990 新增「簽核類型」變數, 傳入目前公文的SignType
				params["簽核類型"] = _mgmt.getDocObj().signType;
				
				// 1110526 Raymond 1110521 新增判斷若稿序為"創稿", 則檢核是否為調閱歷史公文的DI檔, 若是則將稿序改為「文別or令函類別（稿）」
				if(params["稿序"] == "創稿") {
					var draftfn = _mgmt.getDraftFileName(_index);
					if(!!draftfn && draftfn.match(/.di$/i)) {
						if(!!_subDocType) {
							theLogger.warn("稿序為'創稿'且文稿檔副檔名為'DI', 判斷為調閱歷史公文, 將稿序變更為令函類別的'" + _subDocType + "（稿）'");
							params["稿序"] = _subDocType + "（稿）";
						}
						else if(!!_docType) {
							theLogger.warn("稿序為'創稿'且文稿檔副檔名為'DI', 判斷為調閱歷史公文, 將稿序變更為文別的'" + _subDocType + "（稿）'");
							params["稿序"] = _docType + "（稿）";
						}
						else {
							theLogger.error("稿序為'創稿'且文稿檔副檔名為'DI', 判斷為調閱歷史公文, 但無法取得文別, 無法將稿序變更為'文別（稿）'");
						}
					}
				}
				
				thePublicRsrc.applyPrintXSLT(_rawXml, _docType, _subDocType, _mgmt.getDraftOrigPrintXSL(_index), params, _showPara)	// 2016.8.12 新增原始(或重設後)的PrintXSL檔名, _showPara強制顯示空段落
					.done(function(intermediateXml) {
						theLogger.log(intermediateXml);
				
						if(intermediateXml != undefined) {
							_internalFO = theLayoutEng.transXmlFragToInternalFO(intermediateXml, that);
							theLogger.log(_internalFO);
							_needRetransInternalFO(false);	// 2016.1.13 恢復不需重新套用
							_needRetransInitialFO = false;	// 1100909 Raymond 1101135 重置因預設內容異動而重新整理旗標
							_mgmt.isDraftNameChanged(_index, false);	// 2016.11.24 恢復稿序名稱未異動狀態, 避免更名一次以後每次翻頁都在重新套用
							dfd.resolve(_internalFO);
						}
						else {
							dfd.reject(_mgmt.getDraftName(_index) + " - 套用PrintXSL未返回有效內容");
						}
					})
					.fail(function(errorText) {
						dfd.reject(errorText);
					});
			}
			else
				dfd.resolve(_internalFO);
			return dfd.promise();
		},
		
		accquireXml: function() {
			return _rawXml;
		},
		text: function() {
			// 2016.5.17 for IE
			if("evaluate" in _rawXml) {	// IE以外
				if(arguments.length == 1) {	// 第1個參數是XPath
					var nodeList = [];
					try {
						var snapshot = _rawXml.evaluate(arguments[0], _rawXml, null, 7, null);
						if(snapshot.snapshotLength == 0)	// 2014.11.14 - Raymond, 新增找不到錯誤
							throw new Error("指定XPath:\"" + arguments[0] + "\"找不到");
						for(var i=0; i<snapshot.snapshotLength; i++)
							nodeList.push(snapshot.snapshotItem(i));
						if(nodeList.length == 1)
							return toHtml(nodeList[0]);
						throw new Error("指定XPath:\"" + arguments[0] + "\"非唯一?");
					}
					catch(e) {
						theLogger.error(e.message + "(" + arguments[0] + ")");
						throw e;	// 2016.8.15 丟出錯誤
					}
				}
				else if(arguments.length > 1) {	// 第2個參數是新值
					// 1141218 Raymond 北榮序453 因1140818禁止出組室過的非可發文文別異動內文, 但要對自動增高簽核區域允許異動, 新增purpose參數, 若傳入"forSALP", 則允許異動
					// 1070608 Raymond 1070197 不可異動文稿內容時, 透過setAllDraftText()等方法同步設定欄位內容的功能要擋掉
					//if(!this.getEditable())
					var purpose = (theSSO.User.EnvSettings.get("AOL_DISABLE_CHANGE_DRAFT_CONTENT") == "Y" && arguments[0].match(/簽核區域排版屬性\/高度/))?"forSALP":undefined;
					if(!this.getEditable(purpose))
						throw new Error("此文稿(" + _mgmt.getDraftName(_index) + ")禁止異動內容");
					var nodeList = [];
					try {
						var snapshot = _rawXml.evaluate(arguments[0], _rawXml, null, 7, null);
						if(snapshot.snapshotLength == 0)	// 2014.11.14 - Raymond, 新增找不到錯誤
							throw new Error("指定XPath:\"" + arguments[0] + "\"找不到");
						for(var i=0; i<snapshot.snapshotLength; i++)
							nodeList.push(snapshot.snapshotItem(i));
						if(nodeList.length == 1) {
							if(isChanged(nodeList[0], arguments[1])) {
								// 1071116 Raymond 1071137 新增傳入第3參數mergeSegment
								//applyChange(nodeList[0], arguments[1]);
								applyChange(nodeList[0], arguments[1], arguments[2]);
								_needRetransInternalFO(true);	// 需要重新產生FO
								// 1100909 Raymond 1101135 若異動欄位為發文機關全銜, 則設置因預設內容異動而須重新整理旗標
								if(arguments[0].match(/發文機關\/全銜/)) {
									theLogger.warn("'" + arguments[0] + "'異動, 須重新整理");
									_needRetransInitialFO = true;
								}
								theLogger.warn("文稿內容已異動!");	// 2015.7.17 新增
								// 1150108 Raymond 1141307 修正記錄最後修改日期時間功能失效問題
								// 1141218 Raymond 北榮序453 因1140818禁止出組室過的非可發文文別異動內文, 但要對自動增高簽核區域允許異動, 新增purpose第3參數, 若傳入"forSALP", 則允許異動
								//this.dirty(true);
								//this.dirty(true, undefined, purpose);
								this.dirty(true, true, purpose);
								return true;	// 與原值不同, 套用新值
							}
							return false;	// 與原值相同, 不套用
						}
						throw new Error("指定XPath:\"" + arguments[0] + "\"非唯一?");
					}
					catch(e) {
						theLogger.error(e.message + "(" + arguments[0] + ")");
						throw e;	// 2016.8.15 丟出錯誤
					}
				}
			}
			else if("selectSingleNode" in _rawXml) {	// IE
				if(arguments.length == 1) {
					var nd = _rawXml.selectSingleNode(arguments[0]);
					if(nd)
						return toHtml(nd);
					throw new Error("指定XPath:\"" + arguments[0] + "\"找不到");
				}
				else if(arguments.length > 1) {
					// 1070608 Raymond 1070197 不可異動文稿內容時, 透過setAllDraftText()等方法同步設定欄位內容的功能要擋掉
					if(!this.getEditable())
						throw new Error("此文稿(" + _mgmt.getDraftName(_index) + ")禁止異動內容");
					var nd = _rawXml.selectSingleNode(arguments[0]);
					if(nd) {
						if(isChanged(nd, arguments[1])) {
							// 1071116 Raymond 1071137 新增傳入第3參數mergeSegment
							//applyChange(nd, arguments[1]);
							applyChange(nd, arguments[1], arguments[2]);
							_needRetransInternalFO(true);	// 需要重新產生FO
							// 1100909 Raymond 1101135 若異動欄位為發文機關全銜, 則設置因預設內容異動而須重新整理旗標
							if(arguments[0].match(/發文機關\/全銜/)) {
								theLogger.warn("'" + arguments[0] + "'異動, 須重新整理");
								_needRetransInitialFO = true;
							}
							theLogger.warn("文稿內容已異動!");	// 2015.7.17 新增
							this.dirty(true);
							return true;	// 與原值不同, 套用新值
						}
						return false;	// 與原值相同, 不套用
					}
					else
						throw new Error("指定XPath:\"" + arguments[0] + "\"找不到");
				}
			}
			else
				throw new Error("XML文件不支援evaluate亦不支援selectSingleNode方法");
		},
		//pureText: function(xPath) {	// 2015.7.17 新增取完稿後文字, 用於比對主旨、段落條列的內容是否有異動
		pureText: function(xPath, keepSegNo) {	// 1130124 Raymond 1120887 新增第2參數, 遇到條列時可輸出序號及斷行字元, 供會辦意見異動後同步至目前簽辦意見使用
			// 2016.8.15 for IE
			if("evaluate" in _rawXml) {	// IE以外
				try {
					var snapshot = _rawXml.evaluate(xPath, _rawXml, null, 7, null);
				}
				catch(e) {
					theLogger.error(e.message);
				}
				if(snapshot.snapshotLength == 0)
					throw new Error("指定XPath:\"" + xPath + "\"找不到");
				else if(snapshot.snapshotLenth > 1)
					throw new Error("指定XPath:\"" + xPath + "\"非唯一?");
				// 1130124 Raymond 1120887 修正取得段落節點內容時, 其下條列的內容會連<mi act='del'>的一起輸出的問題
				//var nd = snapshot.snapshotItem(0), res = "";
				var res = "";
				function _collectChildNodesText(nd) {
					for(var i=0; i<nd.childNodes.length; i++) {
						var cn = nd.childNodes[i];
						if(cn.nodeType == 3)	// Text node
							res += cn.nodeValue.replace(/[\t\r\n]*/g, "");
						else if(cn.nodeType == 1) {	// Element node
							if(cn.nodeName == "mi") {
								if($(cn).attr("act") != "del")
									res += cn.textContent.replace(/[\t\r\n]*/g, "");
							}
							else if(cn.nodeName == "條列" && keepSegNo == true) {
								if(res.length > 0)
									res += "\n";
								res += cn.getAttribute("序號") || "";
								arguments.callee.call(this, cn);
							}
							else
								// 1130124 Raymond 1120887 子節點要再recursive loop一遍, 才能遇到<mi>元素
								//res += cn.textContent.replace(/[\t\r\n]*/g, "");
								arguments.callee.call(this, cn);
						}
					}
				}
				_collectChildNodesText(snapshot.snapshotItem(0));
				return res;
			}
			else if("selectSingleNode" in _rawXml) {	// IE
				var nd = _rawXml.selectSingleNode(xPath), res = "";
				for(var i=0; i<nd.childNodes.length; i++) {
					var cn = nd.childNodes[i];
					if(cn.nodeType == 3)	// Text node
						res += cn.nodeValue.replace(/[\t\r\n]*/g, "");
					else if(cn.nodeType == 1) {	// Element node
						if(cn.nodeName == "mi") {
							if(cn.getAttribute("act") != "del")
								res += cn.text.replace(/[\t\r\n]*/g, "");
						}
						else
							res += cn.text.replace(/[\t\r\n]*/g, "");
					}
				}
				return res;
			}
			else
				throw new Error("XML文件不支援evaluate亦不支援selectSingleNode方法");
		},
		appendChild: function(srcXPath, destXPath) {	// 2015.3.19 - Raymond, 新增搬移子節點
			// 1070608 Raymond 1070197 不可異動文稿內容時, 透過setAllDraftText()等方法同步設定欄位內容的功能要擋掉
			if(!this.getEditable())
				throw new Error("此文稿(" + _mgmt.getDraftName(_index) + ")禁止異動內容");
			if(srcXPath.search(/[<>]/g) != -1) {	// 2016.8.9 新增支援XML標記文字直接新增
				// 2016.8.15 for IE
				if("evaluate" in _rawXml) {	// IE以外
					var nd = (new DOMParser()).parseFromString(srcXPath, "text/xml");
					if(nd) {
						var ne = nd.documentElement;
						
						try {
							var snapshot = _rawXml.evaluate(destXPath, _rawXml, null, 7, null);
						}
						catch(e) {
							theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
						}
						if(snapshot.snapshotLength == 0)
							throw new Error("指定搬移destXPath:\"" + destXPath + "\"找不到");
						else if(snapshot.snapshotLength > 1)
							throw new Error("指定搬移destXPath:\"" + destXPath + "\"有" + snapshot.snapshotLength + "個, 不支援");
						else {
							var destNode = snapshot.snapshotItem(0);
							var resNode = destNode.appendChild(ne);
							theLogger.log("resNode:");
							theLogger.log(resNode);
							_needRetransInternalFO(true);	// 2016.10.21 需要重新產生FO
							// 2015.6.4 遞增子節點的回傳值改為xPath
							var resXPath = Util.getXPath(resNode);
							theLogger.log("resXPath:");
							theLogger.log(resXPath);
							return resXPath;
						}
					}
				}
				else if("selectSingleNode" in _rawXml) {	// IE
					var srcDOM = new ActiveXObject("MSXML2.DOMDocument");
					if(srcDOM.loadXML(srcXPath)) {
						var ne = srcDOM.documentElement;
						
						var nd = _rawXml.selectSingleNode(destXPath);
						if(nd) {
							var resNode = nd.appendChild(ne);
							//theLogger.log("resNode:");
							//theLogger.log(resNode);	// 1060921 Raymond 1060709 IE在沒開F12的情況下log MSXML2.XMLDOMNode會丟出「物件不支援此屬性或方法」的Exception
							_needRetransInternalFO(true);	// 2016.10.21 需要重新產生FO
							// 遞增子節點xPath當回傳值
							var resXPath = Util.getXPath(resNode);
							theLogger.log("resXPath:");
							theLogger.log(resXPath);
							return resXPath;
						}
						else
							throw new Error("指定搬移destXPath:\"" + destXPath + "\"找不到");
					}
					else {
						var pe = srcDOM.parseError;
						theLogger.error("載入XML失敗! " + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
					}
				}
				else
					throw new Error("XML文件不支援evaluate亦不支援selectSingleNode方法");
			}
			else {
				// 2016.8.15 for IE
				if("evaluate" in _rawXml) {	// IE以外
					try {
						var snapshot = _rawXml.evaluate(srcXPath, _rawXml, null, 7, null);
					}
					catch(e) {
						theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
					}
					if(snapshot.snapshotLength == 0)
						throw new Error("指定搬移srcXPath:\"" + srcXPath + "\"找不到");
					else if(snapshot.snapshotLength > 1)
						throw new Error("指定搬移srcXPath:\"" + srcXPath + "\"有" + snapshot.snapshotLength + "個, 不支援");
					else {
						var srcNode = snapshot.snapshotItem(0);
						
						try {
							snapshot = _rawXml.evaluate(destXPath, _rawXml, null, 7, null);
						}
						catch(e) {
							theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
						}
						if(snapshot.snapshotLength == 0)
							throw new Error("指定搬移destXPath:\"" + destXPath + "\"找不到");
						else if(snapshot.snapshotLength > 1)
							throw new Error("指定搬移destXPath:\"" + destXPath + "\"有" + snapshot.snapshotLength + "個, 不支援");
						else {
							theLogger.log("指定搬移'" + srcXPath + "'至'" + destXPath + "'...");
							var destNode = snapshot.snapshotItem(0);
							var resNode = destNode.appendChild(srcNode);
							theLogger.log("resNode:");
							theLogger.log(resNode);
							_needRetransInternalFO(true);	// 2016.10.21 需要重新產生FO
							// 2015.6.4 遞增子節點的回傳值改為xPath
							var resXPath = Util.getXPath(resNode);
							theLogger.log("resXPath:");
							theLogger.log(resXPath);
							return resXPath;
						}
					}
				}
				else if("selectSingleNode" in _rawXml) {	// IE
					var srcNode = _rawXml.selectSingleNode(srcXPath);
					if(srcNode) {
						
						var destNode = _rawXml.selectSingleNode(destXPath);
						if(destNode) {
							theLogger.log("指定搬移'" + srcXPath + "'至'" + destXPath + "'...");
							var resNode = destNode.appendChild(srcNode);
							//theLogger.log("resNode:");
							//theLogger.log(resNode);	// 1060921 Raymond 1060709 IE在沒開F12的情況下log MSXML2.XMLDOMNode會丟出「物件不支援此屬性或方法」的Exception
							_needRetransInternalFO(true);	// 2016.10.21 需要重新產生FO
							// 遞增子節點的xPath當回傳值
							var resXPath = Util.getXPath(resNode);
							theLogger.log("resXPath:");
							theLogger.log(resXPath);
							return resXPath;
						}
						else
							throw new Error("指定搬移destXPath:\"" + destXPath + "\"找不到");
					}
					else
						throw new Error("指定搬移srcXPath:\"" + srcXPath + "\"找不到");
				}
				else
					throw new Error("XML文件不支援evaluate亦不支援selectSingleNode方法");
			}
		},
		removeNode: function(xPath) {
			// 1070608 Raymond 1070197 不可異動文稿內容時, 透過setAllDraftText()等方法同步設定欄位內容的功能要擋掉
			if(!this.getEditable())
				throw new Error("此文稿(" + _mgmt.getDraftName(_index) + ")禁止異動內容");
			// 2016.8.15 for IE
			if("evaluate" in _rawXml) {	// IE以外
				try {
					var snapshot = _rawXml.evaluate(xPath, _rawXml, null, 7, null);
				}
				catch(e) {
					theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
				}
				if(snapshot.snapshotLength == 0)
					throw new Error("指定移除xPath:\"" + xPath + "\"找不到");
				else if(snapshot.snapshotLength > 1)
					throw new Error("指定移除xPath:\"" + xPath + "\"有" + snapshot.snapshotLength + "個, 不支援");
				else {
					theLogger.log("指定移除'" + xPath + "'節點");
					var destNode = snapshot.snapshotItem(0);
					$(destNode).remove();
					_needRetransInternalFO(true);	// 2016.10.21 需要重新產生FO
				}
			}
			else if("selectSingleNode" in _rawXml) {	// IE
				var destNode = _rawXml.selectSingleNode(xPath);
				if(destNode) {
					theLogger.log("指定移除'" + xPath + "'節點");
					$(destNode).remove();
					_needRetransInternalFO(true);	// 2016.10.21 需要重新產生FO
				}
				else
					throw new Error("指定移除xPath:\"" + xPath + "\"找不到");
			}
			else
				throw new Error("XML文件不支援evaluate亦不支援selectSingleNode方法");
		},
		getNodeCounts: function(xPath) {
			// 2016.8.15 for IE
			if("evaluate" in _rawXml) {	// IE以外
				try {
					var snapshot = _rawXml.evaluate(xPath, _rawXml, null, 7, null);
				}
				catch(e) {
					theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
				}
				return snapshot.snapshotLength;
			}
			else if("selectNodes" in _rawXml) {	// IE
				var nodes = _rawXml.selectNodes(xPath);
				if(nodes) {
					return nodes.length;
				}
				else
					throw new Error("指定xPath:\"" + xPath + "\"找不到");
			}
			else
				throw new Error("XML文件不支援evaluate亦不支援selectNodes方法");
		},
		// 2016.8.9 新增選節點
		nodes: function(xPath) {
			// 1070608 Raymond 1070197 不可異動文稿內容時, 透過setAllDraftText()等方法同步設定欄位內容的功能要擋掉
			if(!this.getEditable())
				throw new Error("此文稿(" + _mgmt.getDraftName(_index) + ")禁止異動內容");
			// 2016.8.15 for IE
			if("evaluate" in _rawXml) {	// IE以外
				try {
					var snapshot = _rawXml.evaluate(xPath, _rawXml, null, 7, null);
					var res = new Array(snapshot.snapshotLength);
					for(var i=0; i<snapshot.snapshotLength; i++)
						res[i] = snapshot.snapshotItem(i);
					return res;
				}
				catch(e) {
					theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
					throw e;
				}
			}
			else if("selectNodes" in _rawXml) {	// IE
				var res = _rawXml.selectNodes(xPath);
				return res;
			}
			else
				throw new Error("XML文件不支援evaluate亦不支援selectNodes方法");
		},
		insertSibling: function(srcXPath, destXPath) {
			// 1070608 Raymond 1070197 不可異動文稿內容時, 透過setAllDraftText()等方法同步設定欄位內容的功能要擋掉
			if(!this.getEditable())
				throw new Error("此文稿(" + _mgmt.getDraftName(_index) + ")禁止異動內容");
			if(srcXPath.search(/[<>]/g) != -1) {
				// 2016.8.15 for IE
				if("evaluate" in _rawXml) {	// IE以外
					var nd = (new DOMParser()).parseFromString(srcXPath, "text/xml");
					if(nd) {
						var ne = nd.documentElement;
						
						try {
							var snapshot = _rawXml.evaluate(destXPath, _rawXml, null, 7, null);
						}
						catch(e) {
							theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
						}
						if(snapshot.snapshotLength == 0)
							throw new Error("指定插入於後destXPath:\"" + destXPath + "\"找不到");
						else if(snapshot.snapshotLength > 1)
							throw new Error("指定插入於後destXPath:\"" + destXPath + "\"有" + snapshot.snapshotLength + "個, 不支援");
						else {
							theLogger.log("指定插入XML片斷於'" + destXPath + "'後...");
							var destNode = snapshot.snapshotItem(0);
							//var n = $(destNode).prevAll().length + 1;
							$(destNode).after(ne);
							_needRetransInternalFO(true);	// 2016.10.21 需要重新產生FO
							// 2015.6.4 插入子節點的回傳值改為xPath+序號
							var res = {node: ne};	// 2016.11.18 新增回傳插入的新節點
							res.xPath = Util.getXPath(ne);
							theLogger.log("指定插入於後destXPath:\"" + destXPath + "\"...結果:\"" + res.xPath + "\"");
							try {
								snapshot = _rawXml.evaluate("preceding-sibling::*[name()='" + ne.nodeName + "']", ne, null, 7, null);
							}
							catch(e) {
								theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
							}
							if(snapshot != null) {
								res.no = snapshot.snapshotLength + 1;
								theLogger.log("\t序號:" + res.no);
							}
							theLogger.warn("文稿內容已異動!");	// 2015.10.1 新增
							this.dirty(true);					// 2015.10.1 新增
							return res;
						}
					}
					else
						theLogger.error("insertSibling('" + srcXPath + "')不是正確的XML標記");
				}
				else if("selectSingleNode" in _rawXml) {	// IE
					var srcDOM = new ActiveXObject("MSXML2.DOMDocument");
					if(srcDOM.loadXML(srcXPath)) {
						var ne = srcDOM.documentElement;
						
						var nd = _rawXml.selectSingleNode(destXPath);
						if(nd) {
							theLogger.log("指定插入XML片斷於'" + destXPath + "'後...");
							$(nd).after(ne);	// 2016.8.22 FIX typo
							_needRetransInternalFO(true);	// 2016.10.21 需要重新產生FO
							// 插入子節點的回傳值改為xPath+序號
							var res = {node: ne};	// 2016.11.18 新增回傳插入的新節點
							res.xPath = Util.getXPath(ne);
							theLogger.log("指定插入於後destXPath:\"" + destXPath + "\"...結果:\"" + res.xPath + "\"");
							function prevLength(nd, nm) {
								var cnt = 0;
								while(nd && "nodeType" in nd && nd.nodeType == 1) {
									if(nd.nodeName == nm)
										cnt ++;
									nd = nd.previousSibling;
								}
								return cnt;
							}
							if("previousSibling" in ne) {	// 2016.8.22 FIX for IE not support previous-sibling xpath syntex
								res.no = prevLength(ne.previousSibling, ne.nodeName) + 1;
								theLogger.log("\t序號:" + res.no);
							}
							theLogger.warn("文稿內容已異動!");
							this.dirty(true);
							return res;
						}
						else
							throw new Error("指定搬移destXPath:\"" + destXPath + "\"找不到");
					}
					else {
						var pe = srcDOM.parseError;
						theLogger.error("載入XML失敗! " + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
					}
				}
				else
					throw new Error("XML文件不支援evaluate亦不支援selectSingleNode方法");
			}
			else {
				// 2016.8.15 for IE
				if("evaluate" in _rawXml) {	// IE以外
					try {
						var snapshot = _rawXml.evaluate(srcXPath, _rawXml, null, 7, null);
					}
					catch(e) {
						theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
					}
					if(snapshot.snapshotLength == 0)
						throw new Error("指定插入srcPath:\"" + srcXPath + "\"找不到");
					else if(snapshot.snapshotLength > 1)
						throw new Error("指定插入srcXPath:\"" + srcXPath + "\"有" + snapshot.snapshotLength + "個, 不支援");
					else {
						var srcNode = snapshot.snapshotItem(0);
						
						try {
							snapshot = _rawXml.evaluate(destXPath, _rawXml, null, 7, null);
						}
						catch(e) {
							theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
						}
						if(snapshot.snapshotLength == 0)
							throw new Error("指定插入於後destXPath:\"" + destXPath + "\"找不到");
						else if(snapshot.snapshotLength > 1)
							throw new Error("指定插入於後destXPath:\"" + destXPath + "\"有" + snapshot.snapshotLength + "個, 不支援");
						else {
							var destNode = snapshot.snapshotItem(0);
							//var n = $(destNode).prevAll().length + 1;
							$(destNode).after(srcNode);
							_needRetransInternalFO(true);	// 2016.10.21 需要重新產生FO
							// 2015.6.4 插入子節點的回傳值改為xPath+序號
							var res = {};
							res.xPath = Util.getXPath(srcNode);
							theLogger.log("指定插入於後destXPath:\"" + destXPath + "\"...結果:\"" + res.xPath + "\"");
							try {
								snapshot = _rawXml.evaluate("preceding-sibling::*[name()='" + srcNode.nodeName + "']", srcNode, null, 7, null);
							}
							catch(e) {
								theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
							}
							if(snapshot != null) {
								res.no = snapshot.snapshotLength + 1;
								theLogger.log("\t序號:" + res.no);
							}
							theLogger.warn("文稿內容已異動!");	// 2015.10.1 新增
							this.dirty(true);					// 2015.10.1 新增
							return res;
						}
					}
				}
				else if("selectSingleNode" in _rawXml) {	// IE
					var srcNode = _rawXml.selectSingleNode(srcXPath);
					// 2019.10.4 - 1080339 Eric, jQuery 3.0 upgrade [IE文稿段落"減少階層"無動作問題確認!]
					// [此處未修改, Raymond於舊版jquery.js有修正, 須merge至新版jquery.js]
					if(srcNode) { 
						
						var destNode = _rawXml.selectSingleNode(destXPath);
						if(destNode) {
							$(destNode).after(srcNode);
							_needRetransInternalFO(true);	// 2016.10.21 需要重新產生FO
							// 2015.6.4 插入子節點的回傳值改為xPath+序號
							var res = {};
							res.xPath = Util.getXPath(srcNode);
							theLogger.log("指定插入於後destXPath:\"" + destXPath + "\"...結果:\"" + res.xPath + "\"");
							function prevLength(nd, nm) {
								var cnt = 0;
								while(nd && "nodeType" in nd && nd.nodeType == 1) {
									if(nd.nodeName == nm)
										cnt ++;
									nd = nd.previousSibling;
								}
								return cnt;
							}
							if("previousSibling" in srcNode) {	// 2016.8.22 FIX for IE not support previous-sibling xpath syntex
								res.no = prevLength(srcNode.previousSibling, srcNode.nodeName) + 1;
								theLogger.log("\t序號:" + res.no);
							}
							theLogger.warn("文稿內容已異動!");
							this.dirty(true);
							return res;
						}
						else
							throw new Error("指定插入destXPath:\"" + destXPath + "\"找不到");
					}
					else
						throw new Error("指定插入srcXPath:\"" + srcXPath + "\"找不到");
				}
				else
					throw new Error("XML文件不支援evaluate亦不支援selectSingleNode方法");
			}
		},
		attr: function() {	// 2015.5.19 新增存取屬性功能
			if(arguments.length == 1) {	// 第1個參數是含屬性的XPath
				// 先檢查有無指定屬性
				if(!arguments[0].search(/@/g)) {
					throw new Error("指定XPath:\"" + arguments[0] + "\"非屬性!");
				}
				else {
					// 2016.8.15 for IE
					if("evaluate" in _rawXml) {	// IE以外
						var nodeList = [];
						try {
							var snapshot = _rawXml.evaluate(arguments[0], _rawXml, null, 7, null);
						}
						catch(e) {
							theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
						}
						if(snapshot.snapshotLength == 0)	// 2014.11.14 - Raymond, 新增找不到錯誤
							throw new Error("指定XPath:\"" + arguments[0] + "\"找不到");
						for(var i=0; i<snapshot.snapshotLength; i++)
							nodeList.push(snapshot.snapshotItem(i));
						if(nodeList.length == 1)
							return nodeList[0].nodeValue;
						throw new Error("指定XPath:\"" + arguments[0] + "\"非唯一?");
					}
					else if("selectSingleNode" in _rawXml) {	// IE
						var nd = _rawXml.selectSingleNode(arguments[0]);
						if(nd) {
							return nd.nodeValue;
						}
						else
							throw new Error("指定XPath:\"" + arguments[0] + "\"找不到");
					}
					else
						throw new Error("XML文件不支援evaluate亦不支援selectSingleNode方法");
				}
			}
			else if(arguments.length > 1) {	// 第2個參數是新值
				// 1141218 Raymond 北榮序453 因1140818禁止出組室過的非可發文文別異動內文, 但要對自動增高簽核區域允許異動, 新增purpose參數, 若傳入"forSALP", 則允許異動
				// 1070608 Raymond 1070197 不可異動文稿內容時, 透過setAllDraftText()等方法同步設定欄位內容的功能要擋掉
				//if(!this.getEditable())
				var purpose = (theSSO.User.EnvSettings.get("AOL_DISABLE_CHANGE_DRAFT_CONTENT") == "Y" && arguments[0].match(/會辦意見列表\/會辦意見\[@代碼=["']99["']\]\/@簽核區域排版高度/))?"forSALP":undefined;
				if(!this.getEditable(purpose))
					throw new Error("此文稿(" + _mgmt.getDraftName(_index) + ")禁止異動內容");
				// 先檢查有無指定屬性
				var found = arguments[0].search(/\/@/g);
				if(!found) {
					throw new Error("指定XPath:\"" + arguments[0] + "\"非屬性!");
				}
				else {
					// 2016.8.15 for IE
					if("evaluate" in _rawXml) {	// IE以外
						var nodeList = [];
						try {
							var snapshot = _rawXml.evaluate(arguments[0], _rawXml, null, 7, null);
						}
						catch(e) {
							theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
						}
						if(snapshot.snapshotLength == 0) {	// 2014.11.14 - Raymond, 新增找不到錯誤
							// 2015.6.4 - 設定屬性若是原本不存在, 也要新增
							var par = arguments[0].substring(0, found);
							var att = arguments[0].substring(found + 2);
							try {
								snapshot = _rawXml.evaluate(par, _rawXml, null, 7, null);
							}
							catch(e) {
								theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
							}
							if(snapshot.snapshotLength == 0) {
								throw new Error("指定XPath:\"" + arguments[0] + "\"找不到, 父元素\"" + par + "\"也找不到");
							}
							else if(snapshot.snapshotLength == 1) {
								theLogger.log("設定屬性(\"" + par + "\", \"" + att + "\")=\"" + arguments[1] + "\"");
								snapshot.snapshotItem(0).setAttribute(att, arguments[1]);
								_needRetransInternalFO(true);	// 需要重新產生FO
								// 1150108 Raymond 1141307 修正記錄最後修改日期時間功能失效問題
								// 1141218 Raymond 北榮序453 因1140818禁止出組室過的非可發文文別異動內文, 但要對自動增高簽核區域允許異動, 新增purpose第3參數, 若傳入"forSALP", 則允許異動
								//this.dirty(true);
								//this.dirty(true, undefined, purpose);
								this.dirty(true, true, purpose);
								return true;	// 與原值不同, 套用新值
							}
							else
								throw new Error("指定XPath:\"" + arguments[0] + "\"找不到, 但父元素\"" + par + "\"非唯一?");
						}
						else {
							for(var i=0; i<snapshot.snapshotLength; i++)
								nodeList.push(snapshot.snapshotItem(i));
							if(nodeList.length == 1) {
								if(nodeList[0].nodeValue != arguments[1]) {
									theLogger.log("設定屬性(\"" + arguments[0] + "\")=\"" + arguments[1] + "\"");
									nodeList[0].nodeValue = arguments[1];
									_needRetransInternalFO(true);	// 需要重新產生FO
									// 1150108 Raymond 1141307 修正記錄最後修改日期時間功能失效問題
									// 1141218 Raymond 北榮序453 因1140818禁止出組室過的非可發文文別異動內文, 但要對自動增高簽核區域允許異動, 新增purpose第3參數, 若傳入"forSALP", 則允許異動
									//this.dirty(true);
									//this.dirty(true, undefined, purpose);
									this.dirty(true, true, purpose);
									return true;	// 與原值不同, 套用新值
								}
								return false;	// 與原值相同, 不套用
							}
							throw new Error("指定XPath:\"" + arguments[0] + "\"非唯一?");
						}
					}
					else if("selectSingleNode" in _rawXml) {	// IE
						var nd = _rawXml.selectSingleNode(arguments[0]);
						if(!nd) {	// 設定屬性若是原本不存在, 也要新增
							var par = arguments[0].substring(0, found);
							var att = arguments[0].substring(found + 2);
							var pn = _rawXml.selectSingleNode(par);
							if(!pn)
								throw new Error("指定XPath:\"" + arguments[0] + "\"找不到, 父元素\"" + par + "\"也找不到");
							else {
								pn.setAttribute(att, arguments[1]);
								_needRetransInternalFO(true);	// 需要重新產生FO
								this.dirty(true);
								return true;	// 與原值不同, 套用新值
							}
						}
						else {
							if(nd.nodeValue != arguments[1]) {
								theLogger.log("設定屬性(\"" + arguments[0] + "\")=\"" + arguments[1] + "\"");
								nd.nodeValue = arguments[1];
								_needRetransInternalFO(true);	// 需要重新產生FO
								this.dirty(true);
								return true;	// 與原值不同, 套用新值
							}
							return false;	// 與原值相同, 不套用
						}
					}
					else
						throw new Error("XML文件不支援evaluate亦不支援selectSingleNode方法");
				}
			}
		},
		emptyAttachFiles: function() {
			// 1070608 Raymond 1070197 不可異動文稿內容時, 透過setAllDraftText()等方法同步設定欄位內容的功能要擋掉
			if(!this.getEditable())
				throw new Error("此文稿(" + _mgmt.getDraftName(_index) + ")禁止異動內容");
			var $attl = $(_rawXml).find("附件列表");
			if($attl.length) {
				$attl.find("附件檔名").remove();
				this.dirty(true);
			}
			// 更新DraftMgmt
			_mgmt.removeDraftAtt(_index);
			// 重置附件序號
			_attSN = 0;
		},
		addAttachFile: function(filObj) {	// 2016.4.15 新增附件
			// 1070608 Raymond 1070197 不可異動文稿內容時, 透過setAllDraftText()等方法同步設定欄位內容的功能要擋掉
			if(!this.getEditable())
				throw new Error("此文稿(" + _mgmt.getDraftName(_index) + ")禁止異動內容");
			var dfd = $.Deferred();
			var attl = _rawXml.getElementsByTagName("附件列表");
			//var $attl = $(_rawXml).find("附件列表");
			//if($attl.length) {
			if(attl.length) {
				//var n = $attl.children("附件檔名").length;
				var n = attl[0].getElementsByTagName("附件檔名").length;
				var newAttName = filObj.name || "附件" + (n+1);	// 重新命名
				//$attl.append('<附件檔名 附件名="附件' + (n+1) + '" 摘要="' + fil.name + '" 大小="' + fil.size + '" data-blob-name="' + blbNm + '">' + fil.name + '</附件檔名>');
				var na = _rawXml.createElement("附件檔名");
				na.setAttribute("附件名", newAttName);
				na.setAttribute("摘要", filObj.desc);
				na.setAttribute("大小", filObj.size);

			    //1090903 Zen 1090524 (信保基金)附件明細新增上傳人員、時間欄位
				if (SSO_CONFIG.OrgNickName == "SMEG"){
				    na.setAttribute("上傳人員", filObj.uploadUser);
				    na.setAttribute("上傳時間", filObj.uploadTime);
				}

				// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
				if(("WE_ATT_SHOW_CUSTOM_NAME" in theSSO.User.SystemSets) && (theSSO.User.SystemSets["WE_ATT_SHOW_CUSTOM_NAME"] == "Y"))
					na.setAttribute("標籤名稱", filObj.cusName);
				
				if(filObj.blbName)
					na.setAttribute("data-blob-name", filObj.blbName);
				// 2016.11.30 修正附件檔名以文稿檔名為prefix, 不要用index
				var prefix = _mgmt.getCmplDraftFileName(_index);
				prefix = prefix.replace(/.xml$/i, "");
				// 重新命名附件檔名
				var p = filObj.fileName.lastIndexOf(".");
				var newAttFileName;
				if(p > 0) {
					var ext = filObj.fileName.substring(p);
					newAttFileName = prefix + "-" + (++_attSN) + ext;	// 2016.11.30 fix附件檔名
					if("text" in na)	// for IE-compatible
						//Leslie for IE-compatible
						//na.text(newAttFileName);	
						na.text = newAttFileName;
					else
						na.textContent = newAttFileName;
				}
				else {
					theLogger.warn("新增的附件無副檔名! '" + filObj.fileName + "'");
					newAttFileName = prefix + "-" + (++_attSN);	// 2016.11.30 fix附件檔名
					if("text" in na)	// for IE-compatible
						//Leslie for IE-compatible
						//na.text(newAttFileName);
						na.text = newAttFileName;
					else
						na.textContent = newAttFileName;
				}
				theLogger.debug("DraftModel.addAttachFile(附件名:'" + newAttName + "', 摘要:'" + filObj.desc + "', 大小:'" + filObj.size + "', data-blob-name:'" + filObj.blbName + "', 附件檔名:'" + newAttFileName + "'");
				attl[0].appendChild(na);
				n = attl[0].getElementsByTagName("附件檔名").length;
				na = attl[0].getElementsByTagName("附件檔名")[n-1];
				try {
					// 更新DraftMgmt
					// 2016.12.2	Leslie	增加傳入附件於附加時，是否已取號
					//_mgmt.newDraftAtt(_index, {name: newAttName, desc: filObj.desc, fileName: newAttFileName, origFileName: filObj.blbName, guid: filObj.guid, attIdx: n-1});	// 2016.11.7 fix for 無附件序資訊問題
					
					// 1061117 Raymond 1061118 新增第3參數傳入新增的附件檔名節點
					//1060901	Leslie[1060683]	增加傳入匯出設定
					//_mgmt.newDraftAtt(_index, {name: newAttName, desc: filObj.desc, fileName: newAttFileName, origFileName: filObj.blbName, guid: filObj.guid, attIdx: n-1, hasDocNo: filObj.hasDocNo});	// 2016.11.7 fix for 無附件序資訊問題
					// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
					// _mgmt.newDraftAtt(_index, {name: newAttName, desc: filObj.desc, fileName: newAttFileName, origFileName: filObj.blbName, guid: filObj.guid, attIdx: n-1, hasDocNo: filObj.hasDocNo, isBW:filObj.isBW }, na);
					//_mgmt.newDraftAtt(_index, {name: newAttName, desc: filObj.desc, fileName: newAttFileName, origFileName: filObj.blbName, guid: filObj.guid, attIdx: n-1, hasDocNo: filObj.hasDocNo, isBW:filObj.isBW ,cusName:filObj.cusName}, na);
					// 1110408 Raymond 1101578 新增傳入最後異動人員欄位
					_mgmt.newDraftAtt(_index, {name: newAttName, desc: filObj.desc, fileName: newAttFileName, origFileName: filObj.blbName, guid: filObj.guid, attIdx: n-1, hasDocNo: filObj.hasDocNo, isBW:filObj.isBW ,cusName:filObj.cusName, lastModifiedSN: filObj.lastModifiedSN, lastModifiedTime: filObj.lastModifiedTime, lastModifiedUser: filObj.lastModifiedUser, lastModifiedRole: filObj.lastModifiedRole}, na);
					
					this.dirty(true);
					dfd.resolve();
				}
				catch(e) {
					dfd.reject(e.message);
				}
			}
			else
				dfd.reject("此文稿無「附件列表」欄位, 無法新增附件!");
			return dfd.promise();
		},
		commitAttachFiles: function() {	// 2016.9.12 新增結束附件清單增刪作業
			// 1070608 Raymond 1070197 不可異動文稿內容時, 透過setAllDraftText()等方法同步設定欄位內容的功能要擋掉
			if(!this.getEditable())
				throw new Error("此文稿(" + _mgmt.getDraftName(_index) + ")禁止異動內容");
			_mgmt.commitAttachFiles(_index);
		},
		// 1100601 Raymond 1100523 新增keepAtt參數, 文別轉換時傳入true, 表示若新文別有「附件列表」節點時, 將會保留舊文稿所加入附件及轉出的附件頁面, 故附件GUID等要保留與舊文稿一樣
		//updateAttachFiles: function() {	// 2016.11.9 更新附件清單(貼上文稿時叫用)
		updateAttachFiles: function(keepAtt) {
			// 1070608 Raymond 1070197 不可異動文稿內容時, 透過setAllDraftText()等方法同步設定欄位內容的功能要擋掉
			if(!this.getEditable())
				throw new Error("此文稿(" + _mgmt.getDraftName(_index) + ")禁止異動內容");
			// 1100601 Raymond 1100523 若keepAtt為true, 則視(文別轉換後的)文稿是否有「附件列表」節點, 若無則清空管理檔記錄的舊文稿的附件
			if(keepAtt == true) {
				var attl = _rawXml.getElementsByTagName("附件列表");
				if(attl.length) {
					theLogger.log("文別轉換(" + this.getDocType() + ")後文稿有「附件列表」節點, 保留管理檔記錄的原附件資訊");
				}
				else {
					theLogger.log("文別轉換(" + this.getDocType() + ")後文稿無「附件列表」節點, 清空管理檔記錄的原附件資訊");
					// 清除文稿管理檔原本的清單
					_mgmt.removeDraftAtt(_index);
					// 結束更新DraftMgmt
					_mgmt.commitAttachFiles(_index);
				}
			}
			else {
				// 先清除文稿管理檔原本的清單
				_mgmt.removeDraftAtt(_index);
				// 2016.11.30 修正附件檔名以文稿檔名為prefix, 不要用index
				var prefix = _mgmt.getCmplDraftFileName(_index);
				prefix = prefix.replace(/.xml$/i, "");
				// 重置附件序號
				_attSN = 0;
				// 更新附件檔名
				var attl = _rawXml.getElementsByTagName("附件列表");
				if(attl.length) {
					var atts = attl[0].getElementsByTagName("附件檔名");
					for(var i=0; i<atts.length; i++) {
						var oldFileName = atts[i].text || atts[i].textContent;
						var p = oldFileName.lastIndexOf(".");
						var newFileName;
						if(p > 0) {
							var ext = oldFileName.substring(p);
							newFileName = prefix + "-" + (++_attSN) + ext;	// 2016.11.30 fix附件檔名
							if("text" in atts[i])	// for IE-compatible
								atts[i].text = newFileName;
							else
								atts[i].textContent = newFileName;
						}
						else {
							theLogger.warn("原本的附件無副檔名! '" + oldFileName + "'");
							newFileName = prefix + "-" + (++_attSN);	// 2016.11.30 fix附件檔名
							if("text" in na)	// for IE-compatible
								atts[i].text = newFileName;
							else
								atts[i].textContent = newFileName;
						}
						// 更新DraftMgmt
						_mgmt.newDraftAtt(_index, {
							name: atts[i].getAttribute("附件名"),
							desc: atts[i].getAttribute("摘要"),
							fileName: newFileName,
							origFileName: atts[i].getAttribute("data-blob-name"),
							guid: atts[i].getAttribute("GUID"),
							attIdx: i,
							hasDocNo: (theAOL.docObj.docNo != "")	//2016.12.2	Leslie	新增紀錄加入附件時，是否已有取號
							// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
							,cusName: (atts[i].getAttribute("標籤名稱")?atts[i].getAttribute("標籤名稱"):"")
							});
					}
				}
				// 結束更新DraftMgmt
				_mgmt.commitAttachFiles(_index);
			}	// end of if(keepAtt == true) else
		},
		getAttachFileCounts: function() {	// 2016.4.15 新增查詢附件數量
			var $attl = $(_rawXml).find("附件列表");
			if($attl.length)
				return $attl.children("附件檔名").length;
			else
				return -1;	// means 無附件列表
		},
		getAttachFile: function(idx) {	// 2016.4.15 新增查詢指定index的附件資訊
			var $attl = $(_rawXml).find("附件列表");
			if($attl.length) {
				if(idx >= 0 && idx < $attl.children("附件檔名").length)
					return $attl.children("附件檔名").get(idx);
				throw new Error("指定Index(" + idx + ")超出附件項目數量!");
			}
			else
				throw new Error("此文稿無「附件列表」欄位, 無法取得附件資訊!");
		},
		getAttachGUID: function(idx) {	// 2016.7.15 新增取得指定index附件的GUID
			var $attl = $(_rawXml).find("附件列表");
			if($attl.length) {
				if(idx >= 0 && idx < $attl.children("附件檔名").length)
					return _mgmt.getDraftAttGUID(_index, idx);
				throw new Error("指定Index(" + idx + ")超出附件項目數量!");
			}
			else
				throw new Error("此文稿無「附件列表」欄位, 無法取得附件資訊!");
		},
		getAttachHash: function(idx) {	// 2016.7.19 新增取得指定index附件的Hash
			var $attl = $(_rawXml).find("附件列表");
			if($attl.length) {
				if(idx >= 0 && idx < $attl.children("附件檔名").length)
					return _mgmt.getDraftAttHash(_index, idx);
				throw new Error("指定Index(" + idx + ")超出附件項目數量!");
			}
			else
				throw new Error("此文稿無「附件列表」欄位, 無法取得附件資訊!");
		},
		getAttachHashDocNo: function(idx){	// 2016.12.2	Leslie	新增取得附件加入時是否已取號
			var $attl = $(_rawXml).find("附件列表");
			if($attl.length) {
				if(idx >= 0 && idx < $attl.children("附件檔名").length)
					return _mgmt.getDraftAttHasDocNo(_index, idx);
				throw new Error("指定Index(" + idx + ")超出附件項目數量!");
			}
			else
				throw new Error("此文稿無「附件列表」欄位, 無法取得附件資訊!");
		},
		dirty: function() {
			if(arguments.length > 0) {
				// 1141218 Raymond 北榮序453 因1140818禁止出組室過的非可發文文別異動內文, 但要對自動增高簽核區域允許異動, 新增purpose第3參數, 若傳入"forSALP", 則允許異動
				// 1070608 Raymond 1070197 不可異動文稿內容時, 透過setAllDraftText()等方法同步設定欄位內容的功能要擋掉
				//if(!this.getEditable())
				var purpose = (arguments.length > 2)?arguments[2]:undefined;
				if(!this.getEditable(purpose)) {
					// 1150428 Raymond 1150093 修正出組室過的非可發文文別, 自動增高簽核區域後儲存已異動, 但關閉後再開啟會變回未異動狀態, 導致不會匯出頁面的問題
					if(!_mgmt.changedForSALP(_index))
					throw new Error("此文稿(" + _mgmt.getDraftName(_index) + ")禁止異動內容");
				}
				_dirty = arguments[0];
				// 1120915 Raymond 1120574 新增記錄最後異動時間
				if(_dirty && (arguments.length < 2 || arguments[1] == true)) {	// 若有傳入第2參數且非true, 則不要記錄最後異動時間
					var dt = Util.now();
					_lastModifyTime = Util.padLeft(dt.getYear() - 11, 3) + Util.padLeft(dt.getMonth() + 1, 2) + Util.padLeft(dt.getDate(), 2) + Util.padLeft(dt.getHours(), 2) + Util.padLeft(dt.getMinutes(), 2) + Util.padLeft(dt.getSeconds(), 2);
				}
				// 1121110 Raymond 1120881 新增異動內文後判斷文稿支援簽核區域自動增高功能時, 檢查若是不保留簽署物件, 則自動恢復簽核區域預設高度
				if(_dirty && _supportSALP && !_mgmt.getReserveSO()) {
					this.resumeSALP(false);
				}
				// 1141218 Raymond 北榮序453 因1140818禁止出組室過的非可發文文別異動內文, 但要對自動增高簽核區域允許異動, 新增purpose第3參數, 若傳入"forSALP", 則允許異動, 記錄下因自動增高簽核區域的異動旗標
				if(_dirty && (arguments.length > 2 && arguments[2] == "forSALP")) {
					_mgmt.changedForSALP(_index, true);
				}
				if(_dirty && "updateView" in this) {	// 2016.11.11 異動時重新整理畫面
					if(_updateTimer == null) {	// 增加timer阻擋連續updateView情況
						var that  = this;
						_updateTimer = setTimeout(function() {
							//that.updateView();	// 2016.11.16 先不要updateView
							_updateTimer = null;
						}, 50);
					}
				}
			}
			else
				return _dirty;
			if("draftInfo" in this) {
				if(this.draftInfo)	// 2016.6.22 新增支援紙本簽核(draftInfo=null)
					return this.draftInfo.dirty.apply(this, arguments);
				else
					// 1110322 Raymond 1101416 新增多傳入文稿的索引值, 以供DraftMgmt.xml記錄"最後異動內文階段序號"
					//return _mgmt.dirty.apply(this, arguments);
					return _mgmt.dirty.apply(this, [arguments[0], _index]);
			}
			else
				throw new Error("此DraftModel未與封裝檔DraftInfo建立關聯!");
		},
		// 1141218 Raymond 北榮序453 因自動增高簽核區域而異動內文的異動旗標
		changedForSALP: function() {
			return _mgmt.changedForSALP(_index);
		},
		save: function(options) {
			theLogger.log("saving #" + _index + " draft...");
			// TODO: save Draft XML
			// 1141218 Raymond 北榮序453 當因為自動增高簽核區域而異動內文時, 要能儲存
			// 1070608 Raymond 1070197 不可異動文稿內容時, 透過setAllDraftText()等方法同步設定欄位內容的功能要擋掉
			//if(!this.getEditable())
			if(!this.getEditable() && !this.changedForSALP())
				throw new Error("此文稿(" + _mgmt.getDraftName(_index) + ")禁止異動內容");
			
			// 1081125 Raymond 1081007 新增一代文稿編輯已轉換粗斜體底線等符號標記屬性, 避免輸入這些符號後用一代文稿編輯開啟而轉成粗斜體底線的問題
			_rawXml.documentElement.setAttribute("StyleSymbols", "translated");
			
			// 1120915 Raymond 1120574 新增記錄最後儲存日期時間
			var dt = Util.now();
			// 1150108 Raymond 1141307 儲存及備份時都寫最後儲存日期時間, 但備份不要記憶, 以避免備份過後直接關閉公文, 會誤判為已儲存過而沒跳出提示儲存的子視窗
			//_lastSaveTime = Util.padLeft(dt.getYear() - 11, 3) + Util.padLeft(dt.getMonth() + 1, 2) + Util.padLeft(dt.getDate(), 2) + Util.padLeft(dt.getHours(), 2) + Util.padLeft(dt.getMinutes(), 2) + Util.padLeft(dt.getSeconds(), 2);
			//_rawXml.documentElement.setAttribute("LastModified", _lastSaveTime);
			var lastSaveTime = Util.padLeft(dt.getYear() - 11, 3) + Util.padLeft(dt.getMonth() + 1, 2) + Util.padLeft(dt.getDate(), 2) + Util.padLeft(dt.getHours(), 2) + Util.padLeft(dt.getMinutes(), 2) + Util.padLeft(dt.getSeconds(), 2);
			_rawXml.documentElement.setAttribute("LastModified", lastSaveTime);
			if(!!options && options.action != "backup")
				_lastSaveTime = lastSaveTime;
			
			// 1080723 Raymond 1080570 檢測異常追蹤修訂標籤結構並修復
			if(correctTC())
				theLogger.warn("檢測到異常或錯誤追蹤修訂結構並已修復");
			
			// 1130808 Raymond 1130313 合併1111007(1100394), 離線模式不要清除blbName
			if(!theSSO || theSSO.offlineMode != true) {
			// 清除附件檔名的data-blob-name
			var attl = _rawXml.getElementsByTagName("附件列表");
			if(attl.length) {
				var attfn = attl[0].getElementsByTagName("附件檔名");
				for(var i=0; i<attfn.length; i++) {
					attfn[i].removeAttribute("data-blob-name");
				}
			}
			}	// end of if(!theSSO || theSSO.offlineMode != true)
			
			if(options != undefined && $.isFunction(options.success)) {
				var dirPath = _mgmt.getDraftDirPath();	// 2016.10.25 FIX for 上傳分繕變數記錄檔
				var tcFileName = _mgmt.getDraftFileName(_index);
				options.success(_index, dirPath, tcFileName, _mgmt.getCmplDraftFileName(_index), _rawXml);	// 2016.2.2 新增第2參數傳入下載路徑, 2016.7.29 新增第4參數完稿檔名
				
				// 2016.10.25 若分繕變數記錄有異動也要儲存
				var mmFileName = tcFileName.replace("-tc", "-mm");
				_mailMergeTable.save(options, _index, dirPath, mmFileName, _mgmt);	// 2017.01.13	Leslie	增加傳入_mgmt，以設定對照表資訊
				
				// 1120807 Raymond 1120503 若自訂表格記錄有異動也要儲存
				var tbFileName = tcFileName.replace("-tc", "-tb");
				_ctblRecords.save(options, _index, dirPath, tbFileName, _mgmt);	// 2017.01.13	Leslie	增加傳入_mgmt，以設定對照表資訊
				
				// 1090115 Raymond 1081166 若支援匯出DI格式的話另存DI
				if(supportSaveDI()) {
					var diFileName = tcFileName.replace("-tc.xml", ".di");
					try {
						if(saveDI(options, dirPath, diFileName)) {
							var l = dirPath.lastIndexOf('\\');
							if(l >= 0)
								_mgmt.setECapDraftFileNameAsDI(_index, dirPath.substr(l+1) + "\\" + diFileName);
							else
								theLogger.error("另存DI子目錄路徑未包含'\\', 應是不合法的路徑名");
						}
						else
							theLogger.error("另存DI失敗");
					}
					catch(e) {
						theLogger.error("另存DI失敗" + (e.stack || e.message));
					}
				}
			}
		},
		getDraftName: function() {		// 2016.8.5 新增
			return _mgmt.getDraftName(_index);
		},
		getDraftDirPath: function() {	// 2015.11.19 新增
			return _mgmt.getDraftDirPath();
		},
		needRetransFO: function(b, setDirty) {	// 2016.1.13 供FolioModel存檔後呼叫, 設定是否應重新產生FO, 2017.2.9 新增參數setDirty, 未設定時預設會設dirty
			_needRetrans = b;
			// 2017.2.9 bugfix 應檢查b是否為true, 及改用dirty()才能連動DraftInfo
			if(b && !(typeof setDirty == "boolean" && setDirty == false))	// 2017.2.9 若給第2參數, 則判斷不是false時才設為已異動, 若不給第2參數則預設為已異動
				this.dirty(b);
			//_dirty = true;	// 2016.11.11 需重新產生FO即表示內容有異動
		},
		needRetransInitialFO: function() {	// 1100909 Raymond 1101135 新增唯讀方法, 判斷目前文稿是否需要因預設內容異動而重新整理
			return _needRetransInitialFO;
		},
		setDocNo: function(docNo) {
			// 1070608 Raymond 1070197 不可異動文稿內容時, 透過setAllDraftText()等方法同步設定欄位內容的功能要擋掉
			if(!this.getEditable())
				throw new Error("此文稿(" + _mgmt.getDraftName(_index) + ")禁止異動內容");
			var dn = _rawXml.getElementsByTagName("公文文號");
			if(dn.length) {
				if("text" in dn[0]) {	// for IE-compatible
					if(dn[0].text != docNo) {
						dn[0].text = docNo;
						_needRetransInternalFO(true);		// 需要重新產生FO
						theLogger.warn("文稿內容已異動!");
						this.dirty(true);
					}
				}
				else {
					if(dn[0].textContent != docNo) {
						dn[0].textContent = docNo;
						_needRetransInternalFO(true);		// 需要重新產生FO
						theLogger.warn("文稿內容已異動!");
						this.dirty(true);
					}
				}
			}
			else {
				dn = _rawXml.createElement("公文文號");
				if("text" in dn)	// for IE-compatible
					dn.text = docNo;
				else
					dn.textContent = docNo;
				_rawXml.documentElement.appendChild(dn);
				_needRetransInternalFO(true);		// 需要重新產生FO
				theLogger.warn("文稿內容已異動!");
				this.dirty(true);
			}
		},
		showPara: function(paName) {
			for(var i=0; i<_showPara.length; i++) {
				if(_showPara[i] == paName) {
					theLogger.warn("已顯示" + paName + "段落");
					return;
				}
			}
			theLogger.warn("顯示" + paName + "段落");
			_showPara.push(paName);
			_needRetransInternalFO(true);		// 需要重新產生FO
		},
		hidePara: function(paName) {
			for(var i=0; i<_showPara.length; i++) {
				if(_showPara[i] == paName) {
					theLogger.warn("隱藏" + paName + "段落");
					_showPara.splice(i, 1);
					_needRetransInternalFO(true);		// 需要重新產生FO
					return;
				}
			}
		},
		reduceIndex: function() {	// 2016.10.4 因刪除文稿需減去後面文稿的index
			if(_index == 0)
				theLogger.error("因刪除前面文稿, 需減後面文稿的, 但此文稿的index已是0, 不可再減");
			else {
				theLogger.warn("因刪除前面文稿, 需減後面文稿的index:" + (_index - 1));
				--_index;
			}
		},
		resetIndex: function(idx) {	// 2016.10.21 因調整稿序需重設每筆文稿的index
			theLogger.warn("因調整稿序, 需重設文稿的index從 " + _index + " -> " + idx);
			_index = idx;
		},
		accquireMailMergeTable: function() {	// 2016.10.25 新增支援分繕變數表
			return _mailMergeTable;
		},
		accquireMailMergedXml: function(receiverFullName) {	// 2016.10.27 新增產生套用分繕變數後的XML
			// 1111006 Raymond 陸委會序324 指定分繕受文者為抄本時改用「【變數名稱請分繕】」表示
			// 1080219 Raymond 1080089 修改傳入參數改為物件並改用find2新方法
			//if(_mailMergeTable && typeof receiverFullName === "string") {	// 指定受文者正式名稱時套用變數表
			//	var ri = _mailMergeTable.find("受文者", receiverFullName);
			//if(!!_mailMergeTable && !!receiverFullName) {	// 指定受文者時套用變數表
			if(!!_mailMergeTable && !!receiverFullName && receiverFullName.issueType != "抄本") {	// 指定受文者時套用變數表
				var ri = _mailMergeTable.find2("受文者", receiverFullName);	// 改用find2
				if(ri >= 0) {
					// 1061225 Raymond 1060929 先轉換為完稿結果的XML, 再搜尋^變數, 以免追蹤修訂標籤影響變數名稱判斷
					//var str = Util.getXml(_rawXml);
					var data = _rawXml;
					if("transCmplXml" in nsEditor) {
						data = nsEditor.transCmplXml(_rawXml);
					}
					// 1090206 Raymond 1070503 合併一代共通版也提供的CDC需求(1000194)的'正副本取代模式'功能
					if(data.documentElement.getAttribute("正副本取代模式") == "True") {
						var $docElm = $(data.documentElement);
						if($docElm.find("正本").length == 0)
							data.documentElement.appendChild(data.createElement("正本"));
						if("text" in $docElm.find("正本").get(0))
							$docElm.find("正本").get(0).text = "^正本^";
						else
							$docElm.find("正本").get(0).textContent = "^正本^";
						if($docElm.find("副本").length == 0)
							data.documentElement.appendChild(data.createElement("副本"));
						if("text" in $docElm.find("副本").get(0))
							$docElm.find("副本").get(0).text = "^副本^";
						else
							$docElm.find("副本").get(0).textContent = "^副本^";
					}
					var str = Util.getXml(data);
					var vars = findVar(str);
					if(vars.length == 0) {
						theLogger.log("未定義任何變數, 不需分繕");
						// 1140910 Raymond 1141254 修正若稿件無任何分繕變數, 但有設定分繕附件時, 列印發文用時, 附件文字變更不同受文者的下載區識別碼會變成改到原稿XML的問題
						//return _rawXml;
						return data;
					}
					for(var i=0; i<vars.length; i++) {
						var v = _mailMergeTable.get(ri, vars[i].key);
						theLogger.log("「^" + vars[i].key + "^」置換為「" + v + "」");
						// 1111229 Raymond 1111351 修正分繕變數名稱中含有半形括號等Regular Expression會用到的關鍵字時, 無法取代為分繕變數值的問題
						// 1101022 Raymond 1101327 修正XML中有相同分繕變數名稱時, 多稿轉出只會取代第一個相同分繕變數名稱位置的內容的問題
						//str = str.replace("^" + vars[i].key + "^", v);
						//str = str.replace(new RegExp("\\^" + vars[i].key + "\\^", "g"), v);
						var ptrn = vars[i].key.replace(/[\.\\\+\*\?\^\$\[\]\{\}\(\)\|]/g, "\\$&");
						str = str.replace(new RegExp("\\^" + ptrn + "\\^", "g"), v);
					}
					if("ActiveXObject" in window) {
						var dom = new ActiveXObject("MSXML2.DOMDocument");
						dom.resolveExternals = false;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
						dom.validateOnParse = false;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
						dom.preserveWhiteSpace = true;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
						if(!dom.loadXML(str)) {	//2017.01.16	Leslie	載入XML字串，應使用loadXML()
							theLogger.error("載入XML失敗!");
							var pe = dom.parseError;
							theLogger.error(pe);
						}
					}
					else {
						var dom = (new DOMParser()).parseFromString(str, "text/xml");
					}
					return dom;
				}
			}
			else {	// 未指定受文者正式名稱時以「【變數名稱請分繕】」表示
				// 1061225 Raymond 1060929 先轉換為完稿結果的XML, 再搜尋^變數, 以免追蹤修訂標籤影響變數名稱判斷
				//var str = Util.getXml(_rawXml);
				var data = _rawXml;
				if("transCmplXml" in nsEditor) {
					data = nsEditor.transCmplXml(_rawXml);
				}
				var str = Util.getXml(data);
				var vars = findVar(str);
				if(vars.length == 0) {
					theLogger.log("未定義任何變數, 不需分繕");
					return _rawXml;
				}
				for(var i=0; i<vars.length; i++) {
					// 1111229 Raymond 1111351 修正分繕變數名稱中含有半形括號等Regular Expression會用到的關鍵字時, 無法取代為分繕變數值的問題
					var ptrn = vars[i].key.replace(/[\.\\\+\*\?\^\$\[\]\{\}\(\)\|]/g, "\\$&");
					if(i == vars.length - 1) {
						theLogger.log("「^" + vars[i].key + "^」置換為「【 " + vars[i].key + "請分繕，如分繕表】」");
						// 1111229 Raymond 1111351 修正分繕變數名稱中含有半形括號等Regular Expression會用到的關鍵字時, 無法取代為分繕變數值的問題
						// 1101022 Raymond 1101327 修正XML中有相同分繕變數名稱時, 多稿轉出只會取代第一個相同分繕變數名稱位置的內容的問題
						//str = str.replace("^" + vars[i].key + "^", "【" + vars[i].key + "請分繕，如分繕表】");
						//str = str.replace(new RegExp("\\^" + vars[i].key + "\\^", "g"), "【" + vars[i].key + "請分繕，如分繕表】");
						str = str.replace(new RegExp("\\^" + ptrn + "\\^", "g"), "【" + vars[i].key + "請分繕，如分繕表】");
					}
					else {
						theLogger.log("「^" + vars[i].key + "^」置換為「【 " + vars[i].key + "請分繕】」");
						// 1111229 Raymond 1111351 修正分繕變數名稱中含有半形括號等Regular Expression會用到的關鍵字時, 無法取代為分繕變數值的問題
						// 1101022 Raymond 1101327 修正XML中有相同分繕變數名稱時, 多稿轉出只會取代第一個相同分繕變數名稱位置的內容的問題
						//str = str.replace("^" + vars[i].key + "^", "【" + vars[i].key + "請分繕】");
						//str = str.replace(new RegExp("\\^" + vars[i].key + "\\^", "g"), "【" + vars[i].key + "請分繕】");
						str = str.replace(new RegExp("\\^" + ptrn + "\\^", "g"), "【" + vars[i].key + "請分繕】");
					}
				}
				if("ActiveXObject" in window) {
					var dom = new ActiveXObject("MSXML2.DOMDocument");
					dom.resolveExternals = false;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
					dom.validateOnParse = false;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
					dom.preserveWhiteSpace = true;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
					if(!dom.loadXML(str)) {	//2017.01.16	Leslie	載入XML字串，應使用loadXML()
						theLogger.error("載入XML失敗!");
						var pe = dom.parseError;
						theLogger.error(pe);
					}
				}
				else {
					var dom = (new DOMParser()).parseFromString(str, "text/xml");
				}
				return dom;
			}
			return _rawXml;
		},
		hasMailMergeVars: function() {	// 2016.10.27 新增判斷文稿是否含有分繕變數
			// 1061225 Raymond 1060929 先轉換為完稿結果的XML, 再搜尋^變數, 以免追蹤修訂標籤影響變數名稱判斷
			//var str = Util.getXml(_rawXml);
			var data = _rawXml;
			if("transCmplXml" in nsEditor) {
				data = nsEditor.transCmplXml(_rawXml);
			}
			var str = Util.getXml(data);
			var vars = findVar(str);
			return (vars.length > 0);
		},
		getMailMergeVars: function() {	// 2016.10.27 分繕變數
			// 1061225 Raymond 1060929 先轉換為完稿結果的XML, 再搜尋^變數, 以免追蹤修訂標籤影響變數名稱判斷
			//var str = Util.getXml(_rawXml);
			var data = _rawXml;
			if("transCmplXml" in nsEditor) {
				data = nsEditor.transCmplXml(_rawXml);
			}
			var str = Util.getXml(data);
			return findVar(str);
		},
		//transformDocType: function() {	// 2016.11.3 新增轉換文別後要重新doInit
		transformDocType: function(defPrintXSLName) {	// 1100311 Raymond 1090991 新增defPrintXSLName參數
			theLogger.warn("轉換文別先設定原來的套用樣版屬性為'reset', 讓doInit()時applyPrintXSL()可搜尋適用的樣版");	// 2017.3.21 重設printXSL file path參數為'reset'以免因getOrigPrintXSL()的邏輯判斷version的printXSL為空值而改抓文稿那一層的printXSL而造成一直套用一開始新增此文稿的文別樣版, 航港-序424
			_mgmt.setDraftApplyPrintXSL(_index, "reset", "");	// 設定所套用樣版為空字串, 讓doInit()時applyPrintXSL()跳出選項
			this.dirty(true);	// 2017.3.21 轉換文別視為異動
			this.refreshSegmentsNum = true;	// 1121006 Raymond 北大彙整表序256 標記轉換文別需重新整理條列序號, 因簽/函->便簽預轉會將主旨改為說明一、, 若不重新整理條列序號, 會變成說明段落下有兩個一、的情況
			var dfd = $.Deferred();
			//doInit(dfd, this, true);	// 第3參數設為true表示要重設DraftName
			doInit(dfd, this, true, defPrintXSLName);	// 1100311 Raymond 1090991 第4參數傳入在文別轉換子視窗所選取的樣版檔的"預設排版"屬性
			return dfd.promise();
		},
		isAttRndrFinish: function(idx) {	// 2016.12.16	Leslie	新增檢核附件是否已完成匯出
			return _mgmt.isAttRndrFinish(_index,idx);
		},
		isImported: function() {	// 1060620 Raymond 1060147 新增判斷文稿是否為匯入的
			if(arguments.length > 0)	// 設定
				_mgmt.isDraftImported(_index, arguments[0]);
			else
				return _mgmt.isDraftImported(_index);
		},
		getOrigPrintXSL: function() {	// 1060913 Raymond 1060735 新增取得原始套用的樣版檔名
			return _mgmt.getDraftOrigPrintXSL(_index);
		},
		// 1080531 Raymond 1080433 新增取得文稿清單已異動旗標
		isDraftListChanged: function() {
			if(_mgmt) {
				return _mgmt.draftListChanged();
			}
			return false;	// 無可編輯文稿管理檔(一般是唯讀模式下), 一律回傳未異動
		},
		// 1080531 Raymond 1080433 新增設定文稿清單已異動旗標
		setDraftListChanged: function(b) {
			if(_mgmt)
				_mgmt.draftListChanged(b);
			else
				theLogger.error("無可編輯文稿管理檔! 無法設定文稿清單已異動旗標");
		},
		// 1091016 Raymond 1090621 新增判斷樣版檔是否支援"令條列"凸排功能旗標
		support1090621Feature: function() {
			return _support1090621Feature;
		},
		// 1100323 Raymond 1090857 新增記錄分頁後總頁數在DraftMgmt.xml、及取得的方法
		setLayoutedPages: function(n) {
			_mgmt.setLayoutedPages(_index, n);
		},
		getLayoutedPages: function() {
			return _mgmt.getLayoutedPages(_index);
		},
		// 1110303 Raymond 1101578 新增取得文稿GUID的方法
		getDraftGUID: function() {
			return _mgmt.getDraftGUID(_index);
		},
		// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
		getAttachInfo: function(attIdx) {
			if(_mgmt) {
				return _mgmt.getDraftAttInfo(_index,attIdx);
			}
			else{
				theLogger.error("無對應的文稿管理檔");
				return null;
			}
		},
		// 1110316 Raymond 1101578 附件編輯異動後使用者選擇上傳更新附件時, 更新附件資訊及實體資料
		replaceAttachFile: function(idx, blob, param) {
			var $attl = $(_rawXml).find("附件列表");
			if($attl.length) {
				if(idx >= 0 && idx < $attl.children("附件檔名").length) {
					console.log($attl.children("附件檔名").get(idx).xml || $attl.children("附件檔名").get(idx).outerHTML);
					if(_mgmt.getDraftAttHash(_index, idx) != param.fileHash) {
						var blbNm = URL.createObjectURL(blob);
						$attl.children("附件檔名").eq(idx)
							.attr("data-blob-name", blbNm)
							.attr("大小", blob.size);
						console.log("%c異動為%c", "color:blue", "color:black", $attl.children("附件檔名").get(idx).xml || $attl.children("附件檔名").get(idx).outerHTML);
						this.dirty(true);
						_mgmt.replaceAttachFile(_index, idx, param, blbNm);
					}
					else
						console.warn("hash未異動, 不需更新?");
					return;
				}
				throw new Error("指定Index(" + idx + ")超出附件項目數量!");
			}
			else
				throw new Error("此文稿無「附件列表」欄位, 無法取得附件資訊!");
		},
		// 1110324 Raymond 1101578 查詢附件是否曾異動過
		getAttachModified: function(attIdx) {
			if(!!_mgmt) {
				// 1110408 Raymond 1101578 會辦單位新增文稿及附件不要判斷異動
				if(_mgmt.getConDraftUnitNo() != "00")
					return false;
				// 1110408 Raymond 1101578 未記錄附件的最後異動人員資訊的公文, 視為未異動
				if("lastModifiedUser" in _mgmt.getDraftAttInfo(_index, attIdx))
					return _mgmt.getDraftAttInfo(_index, attIdx).lastModifiedUser != _mgmt.getICUserName();
				return false;
			}
			else{
				theLogger.error("無對應的文稿管理檔");
			}
		},
		// 1110610 Raymond 1110283 回傳文稿序供啟用航港局的自動產生簽稿會核單功能排序邏輯時使用
		getIndex: function() {
			return _index;
		},
		// 1120808 Raymond 1120503 新增搜尋自訂表格並回傳轉換回HTML的內容
		getCTBLHtml: function(refId) {
			let clr0 = "color:black;background-color:white",
				clr1 = "color:cyan;background-color:darkgray",
				id = refId;
			if(refId.match(/^#/))
				id = refId.substr(1);
			let ri = _ctblRecords.find(id);
			if(ri < 0) {
				console.error("%cCTBL%c 找不到指定ID'" + refId + "'的自訂表格記錄", clr1, clr0);
				return "";
			}
			return _ctblRecords.get(ri);
		},
		// 1120808 Raymond 1120503 新增插入表格時取得下一個自訂表格的ID的流水號
		getNextCTBLSN: function() {
			return _ctblRecords.nextSN();
		},
		// 1120808 Raymond 1120503 新增判斷條列文字內容是否為自訂表格
		isCTBL: function(xPath) {
			if("evaluate" in _rawXml) {	// IE以外
				try {
					var snapshot = _rawXml.evaluate(xPath, _rawXml, null, 7, null);
				}
				catch(e) {
					theLogger.error(e.message);
				}
				if(snapshot.snapshotLength == 0) {
					// 1121005 Raymond 北大彙整表序257 修正刪掉條列後再於段落按Enter新增條列, 新的子條列沒有縮排及其它問題(ex.無法翻頁、再Enter新增下個子條列會無標號...)
					//throw new Error("指定XPath:\"" + xPath + "\"找不到");
					theLogger.warn("指定XPath:\"" + xPath + "\"找不到");
					return [false];
				}
				else if(snapshot.snapshotLenth > 1)
					throw new Error("指定XPath:\"" + xPath + "\"非唯一?");
				var nd = snapshot.snapshotItem(0);
				if($(nd).find("CTBL").length)
					return [true, $(nd).find("CTBL").attr("ref")];
				return [false];
			}
			else {
				console.error("瀏覽器不支援evaluate!");
				throw new Error("瀏覽器不支援evaluate!");
			}
		},
		// 1120809 Raymond 1120503 新增判斷文稿內是否有自訂表格
		hasCTBL: function() {
			if("evaluate" in _rawXml) {	// IE以外
				try {
					var snapshot = _rawXml.evaluate("/*//CTBL", _rawXml, null, 7, null);
				}
				catch(e) {
					theLogger.error(e.message);
				}
				if(snapshot.snapshotLength > 0)
					return true;
				return false;
			}
			else {
				console.error("瀏覽器不支援evaluate!");
				throw new Error("瀏覽器不支援evaluate!");
			}
		},
		// 1120810 Raymond 1120503 匯出文稿頁面影像
		genPage: function() {
			var dfd = $.Deferred();
			var $pages = $("<div class='pages' style='z-index:-1;position:absolute;'></div>").appendTo("body");	// 2016.9.8 FIX, 未appendTo目前DOM的元素, 計算寬高會有問題
			var opts = {applyTCMode: 3,							// 檢視模式
						printSealMark: false,					// 列印騎縫章
						printSealMarkAtSamePos: false,			// 列印騎縫章在相同位置
						printBarcode: true, 					// 列印條碼
						printPageNo: true,						// 列印頁碼
						printDraftFileName: false				// 列印本文檔名
			};
			_preGenPages.length = 0;	// 先清空之前的匯出頁面
			printDraftPages(this, opts, $pages).done(function(nfo, $pages) {
				// 檔名命名規則: 文號_稿序-頁次.jpg or 帳號_MsgID_稿序-頁次.jpg
				var printTitle = (_mgmt.getDocObj().docNo != "")?_mgmt.getDocObj().docNo:theUserInfo.UserID + "_" + model.getMsgId();
				printTitle += ("_" + _mgmt.getDraftName(_index));
				window.tmpTitle = printTitle;
				
				theLogger.warn("本文及附件已等待完成");
				//2017.01.24	Leslie	修改IE載入IMG問題
				var jobId = SSOUtil.getCurrentTimeStr_YYYMMDDhhmm(true);
				var printUrl = SSO_CONFIG.ServerHost + '/MS/RD-AOLPrint.html?JobId='+jobId;
				//var newWin = window.open(printUrl,'_blank');
				var newWin;
				for(ifrm of document.body.getElementsByTagName("iframe")) {
					if(ifrm.id == "exportImageContainer") {
						newWin = ifrm;
						break;
					}
				}
				if(!newWin) {
					newWin = document.createElement("iframe");	// 用IFRAME內嵌輸出頁面
					newWin.id = "exportImageContainer";
					newWin.style = "position:absolute; left:0px; top:0px; width:600px; height: 1024px; z-index:-100";
					document.body.appendChild(newWin);
				}
				newWin.src = printUrl;
				var _html = "";
				$pages.each(function(){_html+=this.outerHTML});
				window.tmpHtml = _html;
				window.onExportImage = function(imgData, elapsedTime, isLastPage, elapsedAll, sa) {
					if(isLastPage)
						console.log("onExportImage", imgData, "單頁耗時" + elapsedTime + "ms", sa, "全部耗時" + elapsedAll + "ms");
					else
						console.log("onExportImage", imgData, "單頁耗時" + elapsedTime + "ms", sa);
					
					_preGenPages.push({"imgData": imgData, "sa": sa, "time": SSOUtil.getCurrentTimeStr_YYYMMDDhhmm()});
					
					if(isLastPage) {
						$pages.remove();
						dfd.resolve();
					}
				}
				localStorage[jobId] = "Ready, ExportImage";	// 新增"ExportImage"字樣, 給RD-AOLPrint.js指令執行產生影像檔(PNG)的功能
			})
			.fail(function(errorText) {
				theLogger.error("匯出文稿頁面失敗!" + errorText);
				dfd.reject(errorText);
			});
			return dfd.promise();
		},
		// 1120810 Raymond 1120503 取得預先匯出的文稿頁面影像
		getPreGenPages: function() {
			return _preGenPages;
		},
		// 1120915 Raymond 1120574 上次儲存後是否又有異動
		hasModifiedSinceLastSave: function() {
			return (!_lastSaveTime || _lastModifyTime > _lastSaveTime);	// _lastSaveTime空值即未儲存過
		},
		// 1121106 Raymond 1120881 新增文稿是否支援簽核區域自訂高度功能
		supportSALP: function() {
			return _supportSALP;
		},
		// 1121108 Raymond 1120881 新增不保留簽署物件時恢復簽核區域預設高度功能
		resumeSALP: function(reserveSO) {
			try {
				let nds = this.nodes("/*/簽核區域排版屬性/高度");
				var that = this;
				$.each(nds, function(idx, nd) {
					let saId = nd.getAttribute("ID");
					if(reserveSO) {	// 保留簽署物件
						if(_saOrigHei[saId] != undefined && nd.textContent != _saOrigHei[saId]) {
							nd.textContent = _saOrigHei[saId];	// 恢復為改為預設高度之前記憶的原始高度
							_needRetrans = true;
							_SALPresumed = false;	// 標記簽核區域高度未恢復預設值
						}
					}
					else {	// 取消保留簽署物件
						let dh = nd.getAttribute("預設");
						if(nd.textContent != dh) {
							_saOrigHei[saId] = nd.textContent;	// 記憶恢復為預設高度前的原始高度
							nd.textContent = dh;	// 恢復為"預設"屬性設定的高度
							_needRetrans = true;
							_SALPresumed = true;	// 標記簽核區域高度已恢復預設值
						}
					}
				});
			}
			catch(e) {
				theLogger.error(e.stack || e.message);
			}
		},
		// 1121117 Raymond 1120881 新增取得簽核區域是否已恢復為預設值旗標
		isSALPresumed: function() {
			return _SALPresumed;
		},
		// 1121117 Raymond 1120881 新增清除簽核區域已恢復為預設值旗標
		clearSALPresumed: function() {
			_SALPresumed = false;
		},
		// 1121110 Raymond 1120881 新增取得目前公文是否保留簽署物件
		getReserveSO: function() {
			return _mgmt.getReserveSO();
		},
		// 1121207 Raymond 1120887 新增取得目前公文是否為會辦公文
		isConUnit: function() {
			return _mgmt.isConUnit();
		},
		// 1121207 Raymond 1120887 新增取得docObj
		getDocObj: function() {
			return _mgmt.getDocObj();
		},
		// 1130105 Raymond 1120887 新增判斷簽稿會核單為會辦單位可編輯意見區
		canEditCon: function() {
			return (_docType == "簽稿會核單" && _supportSALP && _mgmt.isConUnit());
		},
		// 1130105 Raymond 1120887 新增回傳文稿檔名
		getDraftFileName: function() {
			return _mgmt.getDraftFileName(_index);
		},
		// 1130105 Raymond 1120887 新增回傳追蹤修訂階段序號
		getEditSN: function() {
			return _mgmt.getEditSN();
		},
		// 1131224 Raymond 1131303 新增錯別字校正功能, 第2參數為true時, 表示需要重新排序錯別字校正清單
		attachEC: function($para, reorder) {
			if(!theAOL?.enableFixWord)
				return;
			var that = this;
			_errCrct.attach($para).done(function(paraGUID, fixWordObjs) {
				if(!!that.refreshFixWordList) {
					that.refreshFixWordList({paraGUID: paraGUID}, 0);	// 先移除錯別字校正清單中同paraGUID的fixWordObj
				}
				//var oldFWO = _fixWordObjs.find(fwo => {fwo.paraGUID == paraGUID});
				for(var i=0; i<fixWordObjs.length; i++) {
					_fixWordObjs.push(fixWordObjs[i]);
					if(!!that.refreshFixWordList) {
						that.refreshFixWordList(fixWordObjs[i], 1);	// 再加入此fixWordObj至錯別字校正清單中
					}
				}
				if(reorder == true) {
					// 1140620 Raymond 1131303 新增依主旨、段落、條列GUID順序重新排序錯別字校正清單功能
					if(!!that.reorderFixWordList && "evaluate" in _rawXml) {
						var ss = _rawXml.evaluate("/*/主旨 | /*/段落", _rawXml, null, 7, null);
						var pars = [];
						function collGUID(par) {
							if(par.nodeName == "條列")
								console.log(par.nodeName + "#" + par.getAttribute("序號"), par.getAttribute("guid"));
							else if(par.nodeName == "段落")
								console.log(par.nodeName + "#" + par.getAttribute("段名"), par.getAttribute("guid"));
							else
								console.log(par.nodeName + (par.hasAttribute("段名")?"#" + par.getAttribute("段名"):""), par.getAttribute("guid"));
							pars.push(par.getAttribute("guid"));
							var ss2 = _rawXml.evaluate("條列", par, null, 7, null);
							for(var j=0; j<ss2.snapshotLength; j++)
								arguments.callee.call(this, ss2.snapshotItem(j));
						}
						for(var i=0; i<ss.snapshotLength; i++) {
							collGUID(ss.snapshotItem(i));
						}
						that.reorderFixWordList(that.getDraftGUID(), pars);
					}
				}
			});
		},
		clickEC: function(sp) {
			_errCrct.click(sp);
		},
		removeEC: function(sp) {
			_errCrct.remove(sp);
		},
		hideEC: function() {
			// 1140815 Raymond 1141232 修正無錯別字校正功能時(離線模式)會發生錯誤的問題
			//_errCrct.hide();
			_errCrct?.hide();
		},
		enumPara: function(callback) {
			if("evaluate" in _rawXml) {
				var ss = _rawXml.evaluate("/*/主旨 | /*/段落", _rawXml, null, 7, null);
				for(var i=0; i<ss.snapshotLength; i++) {
					var par = ss.snapshotItem(i);
					var txt = "";
					$.each(par.childNodes, function(idx, nd) {
						if(nd.nodeType == 1 && nd.nodeName == "文字") {
							$.each(nd.childNodes, function(idx2, nd2) {
								if(nd2.nodeType == 3)
									txt += nd2.nodeValue;
								else if(nd2.nodeType == 1 && (nd2.nodeName == "fmt" || (nd2.nodeName == "mi" && nd2.getAttribute("act") != "del")))
									txt += nd2.textContent;
							});
						}
					});
					console.log(txt);
					try {
						callback(par, txt);
					}
					catch(e) {
						console.error(e.stack);
					}
					if(par.nodeName == "段落")
						sq(par);
				}
				function sq(pnd) {
					for(var j=0; j<pnd.childNodes.length; j++) {
						var cnd = pnd.childNodes[j];
						if(cnd.nodeType == 1 && cnd.nodeName == "條列") {
							var txt = "";
							$.each(cnd.childNodes, function(idx, nd) {
								if(nd.nodeType == 1 && nd.nodeName == "文字") {
									$.each(nd.childNodes, function(idx2, nd2) {
										if(nd2.nodeType == 3)
											txt += nd2.nodeValue;
										else if(nd2.nodeType == 1 && (nd2.nodeName == "fmt" || (nd2.nodeName == "mi" && nd2.getAttribute("act") != "del")))
											txt += nd2.textContent;
									});
								}
							});
							console.log(txt);
							try {
								callback(cnd, txt);
							}
							catch(e) {
								console.error(e.stack);
							}
							arguments.callee.call(this, cnd);
						}
					}
				}
			}
			else
				throw new Error("瀏覽器不支援evaluate方法, 無法執行enumPara功能");
		},
		checkPara: function(txt, $para, paraHash, paraLen, $secPara, secParaHash, mergedParaHash) {
			if(!theAOL?.enableFixWord)
				return;
			// 1140620 Raymond 1131303 合併條列時, 因為會重校, 所以需要接fixWordObjs並refreshFixWordList
			if(!!$secPara) {
				var that = this;
				_errCrct.checkPara(txt, $para, paraHash, paraLen, $secPara, secParaHash, mergedParaHash).done(function(paraGUID, fixWordObjs) {
					if(!!that.refreshFixWordList) {
						that.refreshFixWordList({paraGUID: paraGUID}, 0);	// 先移除錯別字校正清單中同paraGUID的fixWordObj
					}
					//var oldFWO = _fixWordObjs.find(fwo => {fwo.paraGUID == paraGUID});
					for(var i=0; i<fixWordObjs.length; i++) {
						_fixWordObjs.push(fixWordObjs[i]);
						if(!!that.refreshFixWordList) {
							that.refreshFixWordList(fixWordObjs[i], 1);	// 再加入此fixWordObj至錯別字校正清單中
						}
					}
					// 1140620 Raymond 1131303 新增依主旨、段落、條列GUID順序重新排序錯別字校正清單功能
					if(!!that.reorderFixWordList && "evaluate" in _rawXml) {
						var ss = _rawXml.evaluate("/*/主旨 | /*/段落", _rawXml, null, 7, null);
						var pars = [];
						function collGUID(par) {
							if(par.nodeName == "條列")
								console.log(par.nodeName + "#" + par.getAttribute("序號"), par.getAttribute("guid"));
							else if(par.nodeName == "段落")
								console.log(par.nodeName + "#" + par.getAttribute("段名"), par.getAttribute("guid"));
							else
								console.log(par.nodeName + (par.hasAttribute("段名")?"#" + par.getAttribute("段名"):""), par.getAttribute("guid"));
							pars.push(par.getAttribute("guid"));
							var ss2 = _rawXml.evaluate("條列", par, null, 7, null);
							for(var j=0; j<ss2.snapshotLength; j++)
								arguments.callee.call(this, ss2.snapshotItem(j));
						}
						for(var i=0; i<ss.snapshotLength; i++) {
							collGUID(ss.snapshotItem(i));
						}
						that.reorderFixWordList(that.getDraftGUID(), pars);
					}
				});
			}
			else
			_errCrct.checkPara(txt, $para, paraHash, paraLen, $secPara, secParaHash, mergedParaHash);
		},
		delPara: function(paraGUID) {
			_errCrct.delPara(paraGUID);
		},
		splitPara: function($para, breakIndex, $secPara, origContentChanged) {
			_errCrct.splitPara($para, breakIndex, $secPara, origContentChanged);
		},
		getFixWordObjs: function() {
			return _fixWordObjs;
		},
		acceptFixWord: function(fwo) {
			_errCrct.acceptFixWord(fwo);
		},
		rejectFixWord: function(fwo) {
			_errCrct.rejectFixWord(fwo);
		},
		// 1140728 Raymond 1140381 新增是否需異動附件分繕
		needSaveDispatchAtt: function() {
			if(arguments.length > 0) {
				if(typeof arguments[0] === "boolean") {
					theLogger.log((arguments[0]?"設立":"清除") + "需異動附件分繕旗標");
					_needSaveDispatchAtt = arguments[0];
				}
				else
					throw new Error("needSaveDispatchAtt參數須為boolean值, 傳入的值為" + arguments[0] + "(" + (typeof arguments[0]) + ")");
			}
			return _needSaveDispatchAtt;
		}
	};
};	// end of DraftModel

// 2016.10.25 分繕變數表類別
function MailMergeTable() {
	// 分繕變數表檔名是000X-MM.XML
	// 記錄格式是:
	// <Record>
	//    <Value Key="受文者">受文者正式名稱</Value>
	//    <Value Key="變數1名稱">變數1值</Value>
	//    <Value Key="變數2名稱">變數2值</Value>
	// </Record>
	// 第1組Value固定為受文者正式名稱
	// 第2組開始才是變數值
	// 1070518 Raymond 1070183 新增分繕附件的記錄格式
	// <Record>
	//    <Value Key="受文者">受文者正式名稱</Value>
	//    <Attach>
	//        <附件 附件名="附件1" 搞要="1070331程式名稱.txt" GUID="{973630C4-F0AB-4459-B353-9B05A3C15AF5}">0001-1.txt</附件>
	//        <附件 附件名="附件2" 搞要="1.jpg" GUID="{C536CADB-12DC-4550-81A6-EDD1A52E1819}">0001-2.jpg</附件>
	//    </Attach>
	// <Record>
	// 第1組Value固定為受文者正式名稱
	// 第2組Attach一筆受文者Record僅有一個Attach子節點, 內容為指定分繕給該受文者的附件清單
	// 附件標籤的附件名、搞要屬性及textContent的電子檔名與文稿XML的附件檔名標籤一樣
	// 額外新增的GUID屬性則與DraftMgmt.xml中的附件一樣, 目的為提供線上簽核公文可比對過濾出應分繕列印的已匯出附件頁面影像
	// 1080218 Raymond 1080089 修改受文者記錄結構
	// <Record>
	//    <Value Key="受文者" 正式名稱="受文者正式名稱" 姓名="受文者姓名" 編號="受文者編號">受文者全銜</Value>
	//    <Value Key="變數1名稱">變數1值</Value>
	//    <Value Key="變數2名稱">變數2值</Value>
	//    <Attach>
	//        <附件 附件名="附件1" 搞要="1070331程式名稱.txt" GUID="{973630C4-F0AB-4459-B353-9B05A3C15AF5}">0001-1.txt</附件>
	//        <附件 附件名="附件2" 搞要="1.jpg" GUID="{C536CADB-12DC-4550-81A6-EDD1A52E1819}">0001-2.jpg</附件>
	//    </Attach>
	// <Record>
	// 第1組Value固定為受文者全銜
	// 再新增受文者正式名稱、姓名、編號等3個屬性
	var _table = [];
	var _dirty = false;
	var _recycle = [];	// 1070521 Raymond 1070183 新增重新整理分繕變數時, 暫時保存已設定的分繕附件
	var _newVer = false;	// 1080218 Raymond 1080089 新增版別
	
	function Record() {
		var _varList = [];
		_varList.attach = null;	// 預設無分繕附件
		if(arguments.length > 1) {
			_varList.push({key: arguments[0], value: arguments[1]});
			// 1080218 Raymond 1080089 新增記錄額外傳入的"正式名稱", "姓名", "編號"
			if(arguments.length > 2) {
				_varList[_varList.length - 1].fullName = arguments[2];
				_varList[_varList.length - 1].userName = arguments[3];
				_varList[_varList.length - 1].sn = arguments[4];
			}
			
			// 1070521 Raymond 1070183 從暫存中還原已設定過的分繕附件
			for(var i=0; i<_recycle.length; i++) {
				// 1080218 Raymond 1080089 新增比對額外屬性
				//if(_recycle[i].name == arguments[1]) {
				if(arguments.length > 2 && "fullName" in _recycle[i]) {
					if(_recycle[i].name == arguments[1] &&		// 全銜
						_recycle[i].fullName == arguments[2] &&		// 正式名稱
						_recycle[i].userName == arguments[3] &&			// 姓名
						_recycle[i].sn == arguments[4]) {			// 編號
						theLogger.log("還原'" + arguments[1] + "'(編號:" + arguments[4] + ")的分繕附件設定");
						_varList.attach = _recycle[i].attach;
						_recycle.splice(i, 1);
						break;
					}
				}
				else if(_recycle[i].name == arguments[1]) {		// 清除前無額外屬性或新增Record時未傳入額外屬性都只能用全銜比對是否為同一受文者
					theLogger.log("還原'" + arguments[1] + "'的分繕附件設定");
					_varList.attach = _recycle[i].attach;
					_recycle.splice(i, 1);
					break;
				}
			}
		}
		return _varList;
	}
	
	function _get(rec, ki) {
		if(typeof ki === "string") {	// ki是Key name
			for(var i=0; i<rec.length; i++) {
				if(rec[i].key == ki)
					return rec[i].value;
			}
			return "";	// 找不到的key當做未設定, 回傳空白
		}
		else if(typeof ki === "number") {	// ki是Index
			if(ki >=0 && ki < rec.length) {
				return rec[ki].value;
			}
			//throw new Error("索引值(KeyIndex)超出範圍");
			theLogger.error("MailMergeTable._get()發生錯誤! 索引值(KeyIndex)超出範圍");
			return "";	// 超過索引範圍當做未設定, 回傳空白
		}
		else {
			//throw new Error("不支援指定的索引值(KeyIndex)類型:" + typeof(ki));
			theLogger.error("MailMergeTable._get()發生錯誤! 不支援指定的索引值(KeyIndex)類型:" + typeof(ki));
		}
	};
	function _set(rec, ki, val) {
		if(typeof ki === "string") {	// ki是Key name
			for(var i=0; i<rec.length; i++) {
				if(rec[i].key == ki) {
					// 1080219 Raymond 1080089 新增判斷val為字串或物件, 物件的話只能改"受文者"的屬性
					if(typeof val === "object") {
						if("name" in val && typeof val.name === "string")
							rec[i].value = val.name;
						if("fullName" in val && typeof val.fullName === "string")
							rec[i].fullName = val.fullName;
						if("userName" in val && typeof val.userName === "string")
							rec[i].userName = val.userName;
						if("sn" in val && (typeof val.sn === "string" || typeof val.sn === "number"))
							rec[i].sn = val.sn;
					}
					else
						rec[i].value = val;
					return true;
				}
			}
			//theLogger.warn("MailMergeTable._set()失敗! 找不到指定的索引值(KeyIndex)變數'" + ki + "'記錄");
			theLogger.log("MailMergeTable._set()找不到指定的鍵值'" + ki + "'記錄, 新增一個");
			rec.push({key: ki, value: val});
			return true;
		}
		else if(typeof ki === "number") {	// ki是Index
			if(ki >=0 && ki < rec.length) {
				// 1080219 Raymond 1080089 新增判斷val為字串或物件, 物件的話只能改"受文者"的屬性
				if(typeof val === "object") {
					if("name" in val && typeof val.name === "string")
						rec[ki].value = val.name;
					if("fullName" in val && typeof val.fullName === "string")
						rec[ki].fullName = val.fullName;
					if("userName" in val && typeof val.userName === "string")
						rec[ki].userName = val.userName;
					if("sn" in val && (typeof val.sn === "string" || typeof val.sn === "number"))
						rec[ki].sn = val.sn;
				}
				else
					rec[ki].value = val;
				return true;
			}
			//throw new Error("索引值(KeyIndex)超出範圍");
			theLogger.warn("MailMergeTable._set()失敗! 找不到指定的索引值(KeyIndex)變數(" + ki + ")記錄");
		}
		else {
			//throw new Error("不支援指定的索引值(KeyIndex)類型:" + typeof(ki));
			theLogger.error("MailMergeTable._set()發生錯誤! 不支援指定的索引值(KeyIndex)類型:" + typeof(ki));
		}
		return false;
	};
	// 1070518 Raymond 1070183 新增操作分繕附件的功能
	// 分繕附件物件的定義:
	// name: 即附件的"名稱"屬性
	// desc: 即附件的"搞要"屬性
	// guid: 即附件的"GUID"屬性
	// fileName: 即附件檔名
	function _getAtt(rec, idx) {
		if(typeof idx === "number") {
			if(rec.attach == null) {
				theLogger.warn("受文者'" + rec[0].value + "'未設定分繕附件");
				return null;
			}
			if(idx >=0 && idx < rec.attach.length) {
				return rec.attach[idx];
			}
			//throw new Error("索引值(KeyIndex)超出範圍");
			theLogger.error("MailMergeTable._getAtt()發生錯誤! '" + rec[0].value + "'之分繕附件索引值超出範圍");
			return null;	// 超過索引範圍當做未設定, 回傳null
		}
		else {
			//throw new Error("不支援指定的索引值(KeyIndex)類型:" + typeof(ki));
			theLogger.error("MailMergeTable._getAtt()發生錯誤! 不支援指定的索引值類型:" + typeof(idx));
		}
	};
	function _setAtt(rec, idx, att) {
		if(typeof idx === "number") {
			if(rec.attach == null) {	// 尚未設定過分繕附件
				rec.attach = [];	// 初始化分繕附件清單
			}
			if(idx >=0) {
				if(!rec.attach[idx])
					rec.attach[idx] = {};
				// 設定分繕附件屬性用loop properties方式, 可僅設定1個屬性, 不需要傳入完整的附件定義物件
				if("nodeName" in att) {	// 從MM檔讀入
					if(att.nodeName == "附件") {
						var $att = $(att);
						rec.attach[idx].name = $att.attr("名稱");
						rec.attach[idx].desc = $att.attr("摘要");
						rec.attach[idx].guid = $att.attr("GUID");
						rec.attach[idx].fileName = att.text || att.textContent;
					}
					else {
						theLogger.error("MailMergeTable._setAtt()失敗! '" + att.nodeName + "'節點名稱非附件");
						return false;
					}
				}
				else {
					for(p in att) {
						rec.attach[idx][p] = att[p];
					}
				}
				theLogger.log(rec.attach[idx]);
				return true;
			}
			//throw new Error("索引值(KeyIndex)超出範圍");
			theLogger.warn("MailMergeTable._setAtt()失敗! '" + rec[0].value + "'找不到指定的索引值(" + idx + ")的分繕附件記錄");
		}
		else {
			//throw new Error("不支援指定的索引值(KeyIndex)類型:" + typeof(ki));
			theLogger.error("MailMergeTable._setAtt()發生錯誤! 不支援指定的索引值類型:" + typeof(idx));
		}
		return false;
	};
	
	return {
		// 1080218 Raymond 1080089 新增判斷是否為新版
		isNewVersion: function() {
			return _newVer;
		},
		count: function() {
			return _table.length;
		},
		clear: function() {
			theLogger.warn("清除分繕變數表項目");
			if(_table.length > 0) {
				// 1070521 Raymond 1070183 保存已設定過的分繕附件
				for(var i=0; i<_table.length; i++) {
					if(!!_table[i].attach) {
						// 1080218 Raymond 1080089 配合新增額外屬性
						//_recycle.push({name: _table[i][0].value, attach: _table[i].attach});
						if("fullName" in _table[i][0])
							// 1140729 Raymond 1140381 修正_recycle記錄的userName一直是undefined, 導致不會復原分繕附件設定的問題
							//_recycle.push({name: _table[i][0].value, fullName: _table[i][0].fullName, userName: _table[i][0].name, sn: _table[i][0].sn, attach: _table[i].attach});
							_recycle.push({name: _table[i][0].value, fullName: _table[i][0].fullName, userName: _table[i][0].userName, sn: _table[i][0].sn, attach: _table[i].attach});
						else
						_recycle.push({name: _table[i][0].value, attach: _table[i].attach});
					}
				}
				
				_dirty = true;
			}
			_table.length = 0;
		},
		find: function(key, val) {
			for(var i=0; i<_table.length; i++) {
				var rec = _table[i];
				for(var j=0; j<rec.length; j++) {
					if(rec[j].key == key && rec[j].value == val)
						return i;
				}
			}
			theLogger.warn("MailMergeTable.find()失敗! 找不到指定鍵值'" + key + "'為'" + val + "'的記錄");
			return -1;
		},
		// 1080218 Raymond 1080089 新增find2方法, 傳入val為物件時, 以物件屬性比對搜尋記錄
		find2: function(key, val) {
			if(typeof val === "string")	// 字串型別參數照舊只比對Key-Value
				return this.find(key, val);
			for(var i=0; i<_table.length; i++) {
				var rec = _table[i];
				for(var j=0; j<rec.length; j++) {
					if(rec[j].key == key) {
						if("fullName" in rec[j]) {	// 新版記錄檔要比對"全銜", "正式名稱", "姓名", "編號"
							if(rec[j].value == val.name &&
								rec[j].fullName == val.fullName &&
								rec[j].userName == val.userName &&
								rec[j].sn == val.sn)
								return i;
						}
						else if(rec[j].value == val.name)	// 舊記錄檔只有全銜可比對
							return i;
						break;
					}
				}
			}
			theLogger.warn("MailMergeTable.find()失敗! 找不到指定鍵值'" + key + "'為", val, "的記錄");
			return -1;
		},
		add: function(val) {	// 新增記錄, 一律是受文者正式名稱
			if(_newVer == true) {
				theLogger.warn("新增分繕變數記錄為舊格式受文者, 自動設為儲存舊版");
				_newVer = false;
			}
			var rec = new Record("受文者", val);
			_table.push(rec);
			_dirty = true;
			return _table.length - 1;
		},
		// 1080218 Raymond 1080089 新增add2方法, 傳入"全銜", "正式名稱", "姓名", "編號"
		add2: function(name, fullName, userName, sn) {
			if(_table.length == 0) {	// 以新格式新增第一筆受文者記錄, 自動設定為新版
				theLogger.log("第一筆分繕變數記錄為新格式受文者, 自動設為儲存新版");
				_newVer = true;
			}
			var rec = new Record("受文者", name, fullName, userName, sn);
			_table.push(rec);
			_dirty = true;
			return _table.length - 1;
		},
		get: function(ri, ki) {
			if(ri >= 0 && ri < _table.length) {
				return _get(_table[ri], ki);
			}
			//throw new Error("索引值(RecordIndex)超出範圍");
			theLogger.error("MailMergeTable.get()發生錯誤! 索引值(RecordIndex)超出範圍");
		},
		set: function(ri, ki, val) {
			if(ri >= 0 && ri < _table.length) {
				_dirty = true;
				return _set(_table[ri], ki, val);
			}
			//throw new Error("索引值(RecordIndex)超出範圍");
			theLogger.error("MailMergeTable.set()發生錯誤! 索引值(RecordIndex)超出範圍");
		},
		// 1080219 Raymond 1080089 新增set2方法, 傳入用find2搜尋到的index, 及要修改的欄位物件
		set2: function(ri, val) {
			if(ri >= 0 && ri < _table.length) {
				_dirty = true;
				return _set(_table[ri], "受文者", val);
			}
			//throw new Error("索引值(RecordIndex)超出範圍");
			theLogger.error("MailMergeTable.set2()發生錯誤! 索引值(RecordIndex)超出範圍");
		},
		load: function(xmlDoc) {
			theLogger.log("MailMergeTable.load()...");
			// 1070521 Raymond 1070183 清除暫存
			_recycle.length = 0;
			
			// 1080218 Raymond 1080089 新增讀取版別
			_newVer = $(xmlDoc.documentElement).attr("Version") == "2.0";
			var records = $(xmlDoc.documentElement).children("Record");
			for(var i=0; i<records.length; i++) {
				var rec = records.eq(i);
				var vals = rec.children("Value");
				var ri = -1;
				for(var j=0; j<vals.length; j++) {
					if(j == 0) {
						// 1080218 Raymond 1080089 新增支援額外屬性
						var exa = vals.eq(j).attr("正式名稱");
						if(typeof exa !== typeof undefined && exa !== false)	// jQuery沒有hasAttr方法
							_table.push(new Record("受文者", vals.eq(j).text(), vals.eq(j).attr("正式名稱"), vals.eq(j).attr("姓名") || "", vals.eq(j).attr("編號") || ""));	// 姓名或編號若當時為空值的話儲存後會變不存在的屬性, 所以在讀取時要以空字串代替, 不然find2在比對姓名或編號時會有undefined != ""的情形
						else
						_table.push(new Record("受文者", vals.eq(j).text()));// 新增一筆Record, 並固定第一組KEY-VALUE為受文者
						ri = _table.length - 1;
					}
					else
						_set(_table[ri], vals.eq(j).attr("Key"), vals.eq(j).text());
				}
				// 1070518 Raymond 1070183 新增支援Attach
				var $attach = rec.find("Attach");
				if($attach.length) {
					var $atts = $attach.children("附件");
					$atts.each(function(j, att) {
						_setAtt(_table[ri], j, att);
					});
				}
			}
		},
		save: function(options, draftIndex, dirPath, mmFileName, CurrMgmt) {		// 2017.01.13	Leslie	增加傳入_mgmt，以設定對照表資訊
			if(_table.length == 0) {
				theLogger.log("MailMergeTable.save()...無變數, by pass");
				return false;
			}
			theLogger.log("MailMergeTable.save()...");
			
			if("ActiveXObject" in window) {	// for IE-compatible
				var doc = new ActiveXObject("MSXML2.DOMDocument");
				doc.resolveExternals = false;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
				doc.validateOnParse = false;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
				doc.preserveWhiteSpace = true;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
				// 1080218 Raymond 1080089 新增版別
				//if(!doc.loadXML("<MailMerge></MailMerge>")) {
				if(!doc.loadXML('<MailMerge' + ((_newVer)?' Version="2.0"':'') + '></MailMerge>')) {
					var pe = doc.parseError;
					throw new Error(pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
				}
			}
			else {
				// 1080218 Raymond 1080089 新增版別
				//var doc = (new DOMParser()).parseFromString("<MailMerge></MailMerge>", "text/xml");
				var doc = (new DOMParser()).parseFromString('<MailMerge' + ((_newVer)?' Version="2.0"':'') + '></MailMerge>', 'text/xml');
			}
			
			// utility function
			function newElm(name, parent) {
				try {
					return $(doc.createElement(name)).appendTo(parent);
				}
				catch(e) {
					theLogger.error("newElm('" + name + "') failed! - " + e.message);
					throw e;
				}
			}
			function newElmTxt(name, parent, txt) {
				try {
					var $res = $(doc.createElement(name)).appendTo(parent);
					if("text" in $res.get(0))	// for IE-compatible
						$res.get(0).text = txt;
					else
						$res.text(txt);
					return $res;
				}
				catch(e) {
					theLogger.error("newElmTxt('" + name + "') failed! - " + e.message);
					throw e;
				}
			}
			
			for(var i=0; i<_table.length; i++) {
				var rec = _table[i];
				var $rec = newElm("Record", doc.documentElement);
				for(var j=0; j<rec.length; j++) {
					var v = rec[j];
					var $v = newElmTxt("Value", $rec, v.value);
					$v.attr("Key", v.key);
					// 1080218 Raymond 1080089 新增額外屬性
					if("fullName" in v) {
						$v.attr("正式名稱", v.fullName);
						$v.attr("姓名", v.userName);
						$v.attr("編號", v.sn);
					}
				}
				// 1070518 Raymond 1070183 新增支援Attach
				if(!!rec.attach) {
					var $attach = newElm("Attach", $rec);
					for(var k=0; k<rec.attach.length; k++) {
						var a = rec.attach[k];
						var $att = newElmTxt("附件", $attach, a.fileName);	// 1070528 Raymond bugfix
						$att.attr("名稱", a.name);
						$att.attr("摘要", a.desc);
						$att.attr("GUID", a.guid);
					}
				}
			}
			
			CurrMgmt.setDraftMailMergeInfo(draftIndex);	//2017.01.13	Leslie	更新DraftMgmt對照表
			options.success(draftIndex, dirPath, mmFileName, null, doc);
		},
		// 1070518 Raymond 1070183 新增支援Attach
		countAtt: function(ri) {
			if(ri >= 0 && ri < _table.length) {
				if(!!_table[ri].attach)
					return _table[ri].attach.length;
				return null;
			}
			theLogger.error("MailMergeTable.countAtt()發生錯誤! 索引值(RecordIndex)超出範圍");
		},
		clearAtt: function(ri) {
			if(ri >= 0 && ri < _table.length) {
				if(!!_table[ri].attach) {
					theLogger.warn("清除'" + _table[ri][0] + "'分繕附件項目");
					_table[ri].attach.length = 0;
					_table[ri].attach = null;
					_dirty = true;
				}
			}
			else
				theLogger.error("MailMergeTable.clearAtt()發生錯誤! 索引值(RecordIndex)超出範圍");
		},
		addAtt: function(ri, att) {	// 新增分繕附件
			if(ri >= 0 && ri < _table.length) {
				if(_table[ri].attach == null) {	// 尚未設定過分繕附件
					_table[ri].attach = [];	// 初始化分繕附件清單
				}
				_table[ri].attach.push(att);
				_dirty = true;
				return _table[ri].attach.length - 1;
			}
			else
				theLogger.error("MailMergeTable.addAtt()發生錯誤! 索引值(RecordIndex)超出範圍");
		},
		getAtt: function(ri, idx) {
			if(ri >= 0 && ri < _table.length) {
				if(typeof idx === "undefined")	// 未指定idx參數時回傳attach陣列(可能為null)
					return _table[ri].attach;
				return _getAtt(_table[ri], idx);
			}
			//throw new Error("索引值(RecordIndex)超出範圍");
			theLogger.error("MailMergeTable.getAtt()發生錯誤! 索引值(RecordIndex)超出範圍");
		},
		setAtt: function(ri, idx, att) {
			if(ri >= 0 && ri < _table.length) {
				_dirty = true;
				return _setAtt(_table[ri], idx, att);
			}
			//throw new Error("索引值(RecordIndex)超出範圍");
			theLogger.error("MailMergeTable.setAtt()發生錯誤! 索引值(RecordIndex)超出範圍");
		},
		// 1100525 Raymond 1100495 新增del方法, 刪除單筆Record
		del: function(ri) {
			if(ri >= 0 && ri < _table.length) {
				theLogger.log("刪除#" + ri + "'" + _get(_table[ri], 0) + "'" + ((!!_table[ri][0] && "sn" in _table[ri][0])?(" @編號='" + _table[ri][0].sn + "'"):"") + " 剩餘" + (_table.length - 1) + "筆記錄");
				_dirty = true;
				return _table.splice(ri, 1);
			}
			//throw new Error("索引值(RecordIndex)超出範圍");
			theLogger.error("MailMergeTable.del()發生錯誤! 索引值(RecordIndex)超出範圍");
		},
		// 1140728 Raymond 1140381 新增是否有設定分繕附件
		hasDispatchAtt: function() {
			for(var ri=0, n=_table.length; ri<n; ri++) {
				if(!!_table[ri].attach && _table[ri].attach.length > 0)
					return true;
			}
			return false;
		}
	}
};	// end of MailMergeTable

// 1120807 Raymond 1120503 自訂表格記錄檔類別
function CustomTable() {
	// 自訂表格記錄檔檔名是000X-TB.XML
	// 記錄格式是:
	// <CustomTable>
	//    <Record ID="tb1">{"type":"TABLE", "id":"tb1", "createSN":"0", "lastEditSN":"0", "lastModTime":"20230807160015999", "children":[{"children":[{"width":"100%", "children":[{"textAlign":"left","innerHTML":"一<B>二</B>三"}]}]}]}</Record>
	//    <Record ID="tb2">{...}</Record>
	// </CustomTable>
	var _recs = [];
	var _dirty = false;
	var _nextSN = 0;
	
	// utility functions
	let clr0 = "color:black;background-color:white",
		clr1 = "color:cyan;background-color:darkgray";
	function _toHtml(obj, trgt) {
		let nd = trgt;
		if(obj["name"] == "TABLE")
			nd = document.createElement("TABLE");
		for(let par in obj) {
			if(par == "name") {
			}
			else if(par == "rows") {
				if(Array.isArray(obj[par])) {
					for(let i=0; i<obj[par].length; i++) {
						if(i == 0) {
							if(!nd.tHead)
								nd.createTHead();
							var r = nd.tHead.insertRow(0);
						}
						else {
							if(nd.tBodies.length == 0)
								nd.createTBody();
							var r = nd.tBodies[0].insertRow(-1);
						}
						arguments.callee(obj[par][i], r);
					}
				}
				else {
					console.warn(obj["name"] + "的rows非Array");
					//let cnd = arguments.callee(obj[par]);
				}
			}
			else if(par == "cells") {
				if(Array.isArray(obj[par])) {
					for(let i=0; i<obj[par].length; i++) {
						if(obj[par][i]["name"] == "TH") {
							let th = document.createElement(obj[par][i]["name"]);
							let c = nd.appendChild(th);
							arguments.callee(obj[par][i], c);
						}
						else {
							let c = nd.insertCell(-1);
							arguments.callee(obj[par][i], c);
						}
					}
				}
				else {
					console.warn(obj["name"] + "的cells非Array");
					//let cnd = arguments.callee(obj[par]);
				}
			}
			else if(par == "children") {
				if(Array.isArray(obj[par])) {
					for(let i=0; i<obj[par].length; i++) {
						let p = document.createElement(obj[par][i]["name"]);
						let c = nd.appendChild(p);
						arguments.callee(obj[par][i], c);
					}
				}
				else {
					console.warn(obj["name"] + "的children非Array");
					//let cnd = arguments.callee(obj[par]);
				}
			}
			else if(!!nd) {
				if(par == "innerHTML")
					nd.innerHTML = obj[par];
				else
					nd.setAttribute(par, obj[par]);
			}
		}
		return nd;
	}
	function _toObj(tHtml) {
		let obj = {name: tHtml.tagName};
		for(attr of tHtml.attributes) {
			obj[attr.nodeName] = attr.nodeValue;
		}
		if(tHtml.tagName == "TABLE") {
			obj.rows = [];
			for(r of tHtml.rows) {
				obj.rows.push(arguments.callee(r));
			}
		}
		else if(tHtml.tagName == "TR") {
			obj.cells = [];
			for(c of tHtml.cells) {
				obj.cells.push(arguments.callee(c));
			}
		}
		else if(tHtml.tagName == "TH") {
		}
		else if(tHtml.tagName == "TD") {
			obj.children = [];
			for(cn of tHtml.children) {
				obj.children.push(arguments.callee(cn));
			}
		}
		else if(tHtml.tagName == "P") {
			obj.innerHTML = tHtml.innerHTML;
		}
		return obj;
	}
	
	// Record class
	function Record() {
		this.id = undefined;
		this.ctxOBJ = undefined;
		this.toHTML = function() {
			return _toHtml(this.ctxOBJ);
		}
		this.fromHTML = function(tHtml) {
			this.ctxOBJ = _toObj(tHtml);
		}
		
		// constructor
		if(arguments.length > 1) {	// 從load載入記錄檔
			this.id = arguments[0];
			this.ctxOBJ = arguments[1];
		}
		else {	// 編輯時插入表格
			let tHtml = arguments[0];
			this.id = tHtml.getAttribute("id");
			this.ctxOBJ = _toObj(tHtml);
		}
	}
	
	return {
		nextSN: function() {
			return ++_nextSN;
		},
		count: function() {
			return _recs.length;
		},
		clear: function() {
			theLogger.warn("%cCTBL%c: 清除自訂表格記錄項目", clr1, clr0);
			if(_recs.length > 0) {
				_dirty = true;
			}
			_recs.length = 0;
		},
		find: function(refId) {
			for(var i=0; i<_recs.length; i++) {
				if(_recs[i].id == refId)
					return i;
			}
			theLogger.warn("CustomTable.find()失敗! 找不到指定ID'" + refId + "'的記錄");
			return -1;
		},
		add: function(tHtml) {
			var rec = new Record(tHtml);
			console.log(rec);
			_recs.push(rec);
			console.log(rec.toHTML());
			_dirty = true;
			return _recs.length - 1;
		},
		get: function(ri) {
			if(ri >= 0 && ri < _recs.length) {
				return _recs[ri].toHTML();
			}
			//throw new Error("索引值(RecordIndex)超出範圍");
			theLogger.error("CustomTable.get()發生錯誤! 索引值(RecordIndex)'" + ri + "'超出範圍");
		},
		set: function(ri, tHtml) {
			if(ri >= 0 && ri < _recs.length) {
				_dirty = true;
				_recs[ri].fromHTML(tHtml);
				console.debug("%cCTBL%c: rec[" + ri + "]", clr1, clr0, _recs[ri].ctxOBJ);
			}
			else
			//throw new Error("索引值(RecordIndex)超出範圍");
			theLogger.error("CustomTable.set()發生錯誤! 索引值(RecordIndex)'" + ri + "'超出範圍");
		},
		load: function(xmlDoc) {
			theLogger.log("%cCTBL%c: CustomTable.load()...", clr1, clr0);
			var records = $(xmlDoc.documentElement).children("Record");
			for(let i=0; i<records.length; i++) {
				let rec = records.eq(i);
				let r = new Record(rec.attr("ID"), JSON.parse(rec.text()));
				let sn = r.id.substr(2);
				console.log("%cCTBL%c: Record[" + i + "]", clr1, clr0, r.id, sn, r.ctxOBJ);
				_nextSN = Math.max(_nextSN, sn);
				_recs.push(r);
			}
		},
		save: function(options, draftIndex, dirPath, tbFileName, CurrMgmt) {		// 2017.01.13	Leslie	增加傳入_mgmt，以設定對照表資訊
			if(_recs.length == 0) {
				theLogger.log("%cCTBL%c: CustomTable.save()...無自訂表格, by pass", clr1, clr0);
				return false;
			}
			theLogger.log("%cCTBL%c: CustomTable.save()...", clr1, clr0);
			
			var doc = (new DOMParser()).parseFromString("<CustomTable></CustomTable>", "text/xml");
			
			// utility function
			function newElm(name, parent) {
				try {
					return $(doc.createElement(name)).appendTo(parent);
				}
				catch(e) {
					theLogger.error("newElm('" + name + "') failed! - " + e.message);
					throw e;
				}
			}
			
			for(var i=0; i<_recs.length; i++) {
				var r = _recs[i];
				console.debug("%cCTBL%c: rec[" + i + "]", clr1, clr0, r.ctxObj);
				var $rec = newElm("Record", doc.documentElement);
				$rec.attr("ID", r.id);
				$rec.text(JSON.stringify(r.ctxOBJ));
			}
			
			//CurrMgmt.setDraftMailMergeInfo(draftIndex);	//2017.01.13	Leslie	更新DraftMgmt對照表
			options.success(draftIndex, dirPath, tbFileName, null, doc);
		}
	}
};	// end of CustomTable

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-DraftModel.js").finish();
})();