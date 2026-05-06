// DraftMgmt class
//   對應DraftMgmt.xml
//   2015.12.15 - Raymond, 改用theLogger記錄LOG資訊
/*
DATE	MGRNO		SA		PG		Desc
1060509	1060297		Leslie	Leslie	於轉紙本選定樣版檔後，應直接存入文稿管理檔，以避免多樣版環境會重覆跳出詢問對話框
1060606	1060477		Raymond	Raymond	修正僅開啟未異動, 關閉時卻顯示已異動是否儲存對話盒問題
1060620	1060147		Raymond	Raymond	新增文稿時傳入是否為開啟舊檔旗標、新增回傳或設定文稿是否為開啟舊檔所匯入的方法
1060705	-------		Raymond	Raymond	改為預設第1種稿序命名邏輯, 因為有機關(中興)不設定WE_DRAFT_NAMING環境變數
1060901	1060683		Leslie	Leslie	配合附件匯出可設定黑白或彩色，增修傳入相關屬性
1061017	1060948+1060962		Raymond	修正異動撤消後前一次傳送前所新增文稿的順序若與文稿管理檔不一致會導致在附件子視窗點擊附件出現錯誤
1061117	1061118		Raymond	Raymond	新增傳入文稿檔內新增的附件檔名節點, 供調換附件順序功能在下載原始檔後設定data-blob-name屬性
1070129	1061274		Leslie	Leslie	增加可取得附件摘要資訊
1070608	1070197		Raymond	Raymond	新增紙本簽核時取得文稿新增的單位代碼
1070620	1070547		Raymond	Raymond	因線上簽核多了會辦單位新增的文稿, 故順序數量跟各主會辦子目錄的文稿不一致, 改用origMgmtIdx做為DraftMgmt的排序依據
1071226	-------		Raymond	Raymond	自訂文稿顯示順序時, 若有更名則判斷更名後稿序名稱是否與原稿序名稱不同, 避免紙本公文調整稿序名稱時未重新整理頁面的問題
1080531	1080433		Raymond	Raymond	新增取得及設定文稿清單已異動旗標功能, 包括新增、刪除文稿及調整稿序等三種異動會將旗標設為true
1080621	1080433		Raymond	Raymond	初始載入文稿管理檔後, 記錄文稿數, 並新增回報初始文稿數的方法
1090115	1081166		Raymond	Raymond	新增設定應寫入SignWork.xml之DI文稿檔名
1090310	1081106		Raymond	Raymond	新增判斷機關暱稱為"HAC"(客委會), 則非承辦人(原新增文稿者)本人不允許刪除稿件, 承辦人本人刪除稿件時, 也要提問確認刪除訊息
1090730	1090409		Raymond	Raymond	新增查詢文稿的函類別
1090813	1090589		Raymond	Raymond	台南護專需求所有刪除文稿都要提問確認刪除訊息, 且為共通邏輯
1100310	1090991		Raymond	Raymond	從樣版新增文稿時, 會從RsrcMgmt.xml中取得"預設排版"屬性, 並記錄在文稿物件中, 供applyPrintXSL時搜尋使用
1100323	1090857		Raymond	Raymond	新增記錄文稿的「分頁後總頁數」屬性在DraftMgmt.xml、及取得的方法
1100419	1080767		Raymond	Raymond	合併內政部1070530, 若系統參數CHECK_CLOSEDDRAFT_EDIT為Y, 判斷是否結案前新增文稿, 是則禁止編輯
1100629	1100726		Raymond	Raymond	新增客委會同userId的階段所新增的文稿可刪除, 以解決代理人無法刪除被代理人所新增的稿件, 反之亦然
1101101	1100991		Raymond	Raymond	修正弱掃Client Potential XSS
1110112	1101596		Raymond	Raymond	新增回傳紙本公文的分頁後總頁數
1110225	1110289		Raymond	Raymond	修正取號前已加入附件, 儲存關閉再開啟後, 在取號後自動儲存時不會將[00-99]目錄下的附件電子檔複製到[$文號$-00-99]目錄的問題
1110304	1101459		Leslie	Leslie	新增依設定，提供承辦人可修改「附件標籤」名稱
1110317	1101578		Raymond	Raymond	附件編輯異動後使用者選擇上傳更新附件時, 更新附件資訊及實體資料
1110322	1101416		Raymond	Raymond	新增記錄最後異動文稿清單(新增、刪除稿件、調整稿序)的階段序號, 傳送時檢查若最後異動文稿清單的階段與當前編輯階段相同, 則表示本流程有新增、刪除稿件、調整稿序過
1110531	1110527		Raymond	Raymond	新增儲存管理檔時, 記錄目前流程點的最後儲存日期時間, 及當流程點的OWN_OU_ID、OWN_ROLE_ID、FOLDER-SUBFOLDER、覆蓋別的流程點儲存上傳的新檔的原因
1110610	1110283		Raymond	Raymond	新增記錄文稿加入的日期時間
1110624	1110548		Raymond	Raymond	新增核決後公文以環境變數「WE_ALLOW_DEL_DRAFT_CONDITION」設定決定是否允許刪除文稿
1111021	1110885		Raymond	Raymond	修改刪除文稿功能新增第2參數skipPrompt, 若傳入true, 則表示不要提示確認刪除的警告訊息
1111117	1111069		Raymond	Raymond	若文稿有執行貼上稿件(置換)功能, 則文稿管理檔記錄最後置換文稿的階段序號
1111226	1111401		Raymond	Raymond	新增編輯階段序號的異動改為另一個變數記錄, 與其它異動(新增/刪除文稿、附件、調整稿序...etc)切開
1120222	1110881		David	Leslie	銓敘部-序14，新增支援紙本草稿轉正式公文，稿件路徑需一併更新
1120314	1111133		Leslie	Raymond	新增重新命名來文附件名稱及儲存功能
1120508	1110513		Leslie	Leslie	修正要號後的自動儲存，應正確執行錯誤處理
1120523	1120307		Raymond	Raymond	將DraftModel的getEditable判斷移至DraftMgmt, 以避免備份時由於未點開文稿, 而未執行到DraftModel的getEditable判斷, 造成SignWork.xml中漏寫未點開的<文稿>節點, 導致從備份還原後會發生傳送錯誤(代碼713)問題
1120821	彙整表序158	Raymond	Raymond	AKI802文稿編輯開啟DocView模式時, 無icou及ownrole資訊(只有ownou)會導致轉圈圈問題
1120915	1120574		Raymond	Raymond	新增記錄最新異動時間, 儲存時與上次儲存時間比對, 若未比上次儲存時間晚, 則不需要儲存
1121110	1120881		Raymond	Raymond	新增取得目前公文是否保留簽署物件
1121222	領務局需求序37		Raymond	貼上稿件(置換)及文別轉換時, 新增判斷OrgNickName為"BOCA"(領務局)時, 原稿序的「（」前更換為新文別, 「（」後不動, 做為重設的稿序名稱, 若使用者自訂稿序名稱將「（」刪掉了, 則重設為新文別+「（稿）」
1130123	1120887		Raymond	Raymond	新增支援會辦單位可編輯簽稿會核單功能及分會合併功能
1130220	1120234		Raymond	Raymond	init初始化方法新增第4參數, 傳入來文DI的檔名時, 不會下載文稿管理檔, 而是直接以假的文稿管理檔內容動態載入來文DI, 並套用「文」格式排版設定, 以唯讀但可複製文字的模式顯示來文頁面
1130411	1130091		Raymond	Raymond	accquireDraftModel時檢查文稿是否尚在初始化中, 是則導回前一個accquireDraftModel的deferred物件, 以避免樣版未下載前(通常是登入後第一次開公文)立即存取文稿模型時(ex.匯入銓敘系統文稿時會立即存取文稿模型來設定發文附件)會重複初始化文稿模型, 而第2次重複初始化時會錯誤地下載Server上已存在文稿, 衍生套用PrintXSL錯誤導致附件無法設定的問題
1130521	信保序113	Raymond	Raymond	新增設定文稿管理檔中記錄的稿件文別、函類別的方法
1130808	1130313		Raymond	Raymond	合併1111007(1100394), 配合開啟離線模式另存整份公文的ZIP壓縮檔功能, 修改文稿初始化時若要選取套用樣版檔時, 要等到選完套用樣版再返回
1131108	勤益序362	Raymond	Raymond	修正文別轉換或貼上稿件(置換)後, 只要未翻頁至公文基資, 儲存或傳送的擬辦設定就會保持舊的設定, 不會依據轉換後或貼上後的文別重新設定的問題
1140318	1140209		Leslie	Leslie	修正調閱公文的來文及簽辦文稿開啟歷史來文DI時, 文稿管理檔追蹤修訂階段節點下無任何階段, 會導致無法開啟公文的問題
1140122	1131303		Raymond	Raymond	新增取得錯別字校正資料物件方法
1140630	1140890		Raymond	Raymond	來文分辦後因無文稿管理檔可下載, 新增編輯階段序號後會標記已異動(_dirty), 改成比照1111401, 新增編輯階段序號的異動改為另一個變數記錄, 與其它異動(新增/刪除文稿、附件、調整稿序...etc)的「_dirty」變數切開, 以避免來文分辦打開公文後直接關閉時, 仍會跳出是否儲存的詢問子視窗的問題
1140821	1140818		Raymond	Raymond	新增取得文稿「原稿新增日期時間」, 新增當環境變數「AOL_DISABLE_CHANGE_DRAFT_CONTENT」為"Y"且為線上簽核時, 以北榮3條件決定可否刪除文稿及異動內文
1140926	1140818		Raymond	Raymond	V5再變更需求項目1, 判斷新增的環境變數「AOL_ENABLE_CHANGE_DRAFT_CONTENT_OU_ROLES」若有值, 且當前流程點符合該變數設定的單位-角色條件, 則再允許異動稿件
1141003	1140818		Raymond	Raymond	DocView模組開啟公文時, 不要進行北榮邏輯判斷文稿是否禁止編輯或刪除
1141016	北榮序290	Raymond	Raymond	修正從檢索側屜開啟線上簽核公文時, 不要進行北榮邏輯判斷文稿是否禁止編輯
1141027	北榮序323	Raymond	Raymond	修正開啟併陳公文後點子文時會轉圈圈的問題
1141106	1140818		Raymond	Raymond	修正出組室後退回原承辦人時, TodoList最後一個流程點是"已送出"資料夾, MsgId會大於承辦人流程點, 若承辦人在此流程點新增非可發文文別的稿件時, 會無法異動的問題
1141117	北榮序374	Raymond	Raymond	修正出組室後退回原承辦人時, TodoList最後一個流程點是"已送出"資料夾, MsgId會大於承辦人流程點, 若承辦人在此流程點新增非可發文文別的稿件時, 會無法刪除的問題
1141124	1140818		Raymond	Raymond	改用getDocToDoList2取得流程, 以避免多機關架構下, 創稿取的文號剛好是別的機關已存在的文號, 而取到錯誤的流程清單, 導致誤判為不可編輯/刪除的問題
1141201	北榮序414	Raymond	Raymond	修正分會合併後, 因北榮1140818邏輯而不能異動簽稿會核單, 造成傳送時發生-729問題
1141212	1141627		Raymond	Raymond	修正不同人用同一個msgId開啟公文後, 應以後來者的資訊記錄為該msgId的使用者, 以與封裝檔傳送的邏輯一致
1141216	1141632		Raymond	Raymond	修正結案未歸檔的已核決公文, 在後會時因北榮邏輯而不能異動簽稿會核單造成自動新增簽稿會核單功能無法執行的問題
1141218	北榮序453	Raymond	Raymond	因1140818禁止出組室過的非可發文文別異動內文, 但要對自動增高簽核區域功能允許異動
1141224	北榮序469	Raymond	Raymond	未核決時, 流程點位於承辦同一級單位任一流程點的可發文文別文稿可刪除
*/

function DraftMgmt(readWrite) {	// 2016.2.1 開啟文稿管理檔會因不同條件(例如會辦)而設為可讀寫或唯讀

	// private members
	var _readWrite = readWrite || false;	// 是否唯讀, 未傳入flag則預設唯讀
	var _model;							// 公文夾模型物件(FolioModel), 由Init傳入
	var _fileIOWS;						// WebFileIO網址, 由Init傳入
	var _dirPath;						// 公文夾子目錄路徑, 由Init傳入
	//var _rawXml;						// 讀入的文稿管理檔的XML DOM
	var _folioInfo = {};				// 文稿管理物件
	var _tcSess = new Array();			// 追蹤修訂階段
	var _drafts = new Array();			// 文稿
	var _attachs = new Array();			// 附件
	var _mailmerges = new Array();		// 對照表
	var _editSN = 0;					// 當前編輯階段序號
	var _dirty = false;
	var _sessDirty = false;				// 1111226 Raymond 1111401 新增編輯階段序號的異動改為另一個變數記錄, 與其它異動(新增/刪除文稿、附件、調整稿序...etc)的「_dirty」變數切開
	var _lastFileNameSN = 0;			// 2016.6.17 新增最後一筆文稿的檔名流水號
	var _lastAttSN = 0;					// 2016.7.12 新增附件流水號
	var _RequestDocNoFlag = false;		// 2016.12.2	Leslie	新增變數以紀錄是否本次操作過程中有取號
	var _lastMailMergeID = 0;			// 2017.01.13	Leslie	新增取後一筆對照表序號
	var _draftListChanged = false;		// 1080531 Raymond 1080433 文稿清單已異動旗標, 包括新增、刪除文稿及調整稿序等三種異動
	var _origDraftCounts = 0;			// 1080620 Raymond 1080433 記錄初始載入時的文稿數
	// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
	var _showCustomName = ("WE_ATT_SHOW_CUSTOM_NAME" in theSSO.User.SystemSets)?theSSO.User.SystemSets["WE_ATT_SHOW_CUSTOM_NAME"] == "Y":false;
	var _lastModifyDraftListSN = 0;		// 1110322 Raymond 1101416 新增最後異動文稿清單(新增、刪除稿件、調整稿序)的階段序號
	var _fromDocAttName = [];			// 1120314 Raymond 1111133 新增重新命名的來文附件名稱
	var _lastSaveTime = "";				// 1120915 Raymond 1120574 新增上次儲存時間(最後一個編輯階段的LastModified屬性)
	var _lastModifyTime = "";			// 1120915 Raymond 1120574 新增最新異動時間
	var _canEditCon = false;			// 1130105 Raymond 1120887 主辦單位子目錄下的文稿管理檔, 會辦單位是否可異動儲存(簽稿會核單支援會辦單位編輯意見區時)
	var _isDispatchMerged = undefined;	// 1130122 Raymond 1120887 新增分會合併旗標

	// private methods
	//1101101 Raymond 1100991 弱掃XSS修正
	function HtmlEncode(s) {
		var div = document.createElement('div');
		div.appendChild(document.createTextNode(s));
		return div.innerHTML;
	}
	function getElemText(xmlNode, tagName) {
		var nl = xmlNode.getElementsByTagName(tagName);
		if(nl != undefined && nl.length > 0) {
			if(nl[0].childNodes.length > 0)
				return nl[0].childNodes[0].nodeValue;
			return "";
		}
		return undefined;
	}
	function _parseXML(xmlDoc) {
		_folioInfo.docNo = xmlDoc.documentElement.getAttribute("公文文號");
		_folioInfo.requested = xmlDoc.documentElement.getAttribute("線上取號");	// 2016.8.26 舊版寫1或0
		// 1110322 Raymond 1101416 新增讀取最後異動文稿清單(新增、刪除稿件、調整稿序)的階段序號
		_lastModifyDraftListSN = xmlDoc.documentElement.getAttribute("最後異動文稿清單階段序號");
		if(!!_lastModifyDraftListSN && typeof _lastModifyDraftListSN == "string" && _lastModifyDraftListSN.length > 0)
			_lastModifyDraftListSN = parseInt(_lastModifyDraftListSN);
		// 1130122 Raymond 1120887 新增分會合併
		if(xmlDoc.documentElement.hasAttribute("分會合併"))
			_isDispatchMerged = xmlDoc.documentElement.getAttribute("分會合併");
		
		for(var i=0; i<xmlDoc.documentElement.childNodes.length; i++) {
			var n = xmlDoc.documentElement.childNodes[i];
			if(n.nodeType == 1) {
				switch(n.nodeName) {
					case "追蹤修訂階段":
						_parseTCSessions(n);
						break;
					case "文稿":
						_parseDraft(n);
						break;
					case "附件":
						_parseAttach(n);
						break;
					case "對照表":
						_parseMailMerge(n);
						break;
					case "來文附件":	// 1120314 Raymond 1111133 新增讀取重新命名的來文附件名稱
						_parseFromDocAtt(n);
					default:
						_parseExtra(n);
						break;
				}
			}
		}
		
		// 對應附件
		function lookupAttach(id) {
			for(var i=0; i<_attachs.length; i++) {
				if(_attachs[i].id == id)
					return _attachs[i];
			}
			return null;
		}
		for(var i=0; i<_drafts.length; i++) {
			for(var j=0; j<_drafts[i].atts.length; j++) {
				_drafts[i].atts[j].ref = lookupAttach(_drafts[i].atts[j].id);
			}
		}
	}
	function _parseTCSessions(n) {
		var sesss = n.getElementsByTagName("階段");
		for(var i=0; i<sesss.length; i++) {
			_tcSess.push({
				index: parseInt(sesss[i].getAttribute("序號")),
				userId: sesss[i].getAttribute("UserID"),
				name: sesss[i].getAttribute("Name"),
				color: sesss[i].getAttribute("Color"),
				msgId: sesss[i].getAttribute("MsgID"),
				ouId: sesss[i].getAttribute("OUID") || "",							// 1110531 Raymond 1110527 新增記錄該流程點的OWN_OU_ID
				roleId: sesss[i].getAttribute("RoleID") || "",						// 1110531 Raymond 1110527 新增記錄該流程點的OWN_ROLE_ID
				folder: sesss[i].getAttribute("Folder") || "",						// 1110531 Raymond 1110527 新增記錄該流程點的Folder-Subfolder,
				lastModified: sesss[i].getAttribute("LastModified") || "",			// 1110527 Raymond 1110527 新增LastModified屬性, 記錄該流程點最後儲存日期時間
				overwriteReason: sesss[i].getAttribute("OverwriteReason") || "",	// 1110531 Raymond 1110527 新增記錄該流程點儲存覆蓋別人儲存上傳的新檔的原因
			});
			// 1130122 Raymond 1120887 新增分會
			if(sesss[i].hasAttribute("分會"))
				_tcSess[_tcSess.length - 1].isDispatch = sesss[i].getAttribute("分會");
		}
		// 1140318	Leslie[1140209]	修正調閱公文的來文及簽辦文稿開啟歷史來文DI時, 文稿管理檔追蹤修訂階段節點下無任何階段, 會導致無法開啟公文的問題
		if(_tcSess.length > 0)
		// 1120915 Raymond 1120574 最後一個編輯階段的LastModified屬性即是上次儲存時間
		_lastSaveTime = _tcSess[_tcSess.length - 1].LastModified;
	}
	function _parseDraft(n) {
		var d = {
			name: n.getAttribute("名稱"),
			fileName: n.getAttribute("路徑"),
			tcFileName: n.getAttribute("修訂檔路徑"),
			createSN: n.getAttribute("原稿新增階段序號"),
			guid: n.getAttribute("GUID"),
			rndrSN: n.getAttribute("最後匯出頁面階段序號"),
			docType: n.getAttribute("文別"),
			atts: new Array()
		}
		// 2016.11.14 新增讀取函類別
		if(n.hasAttribute("函類別"))
			d.subDocType = n.getAttribute("函類別");
		// 2016.6.17 新增追蹤最後檔名流水號, 供新增文稿遞增用
		if(d.tcFileName && d.tcFileName.length > 0) {
			if(d.tcFileName.match(/(\d{4})-tc.xml/i)) {
				console.log(RegExp.$1);
				_lastFileNameSN = Math.max(_lastFileNameSN, Number(RegExp.$1));
			}
		}
		else if(d.fileName && d.fileName.length > 0) {
			if(d.fileName.match(/(\d{4}).xml/i)) {
				console.log(RegExp.$1);
				_lastFileNameSN = Math.max(_lastFileNameSN, Number(RegExp.$1));
			}
		}
		if(n.hasAttribute("套用樣版檔"))	// 2016.9.29 紙本簽核改記錄在DraftMgmt.xml
			d.applyPrintXSL = n.getAttribute("套用樣版檔");
		
		// 1100323 Raymond 1090857 新增從DraftMgmt.xml中讀回文稿分頁後總頁數
		if(n.hasAttribute("分頁後總頁數"))
			d.pages = parseInt(n.getAttribute("分頁後總頁數"));
		
		// 1100323 Raymond 1090857 新增從DraftMgmt.xml中讀回文稿分頁後總頁數
		if(n.hasAttribute("最後異動內文階段序號"))
			d.lastModifiedSN = parseInt(n.getAttribute("最後異動內文階段序號"));
		else
			d.lastModifiedSN = d.createSN;
		
		// 1110610 Raymond 1110283 新增記錄文稿加入的日期時間
		if(n.hasAttribute("原稿新增日期時間"))
			d.createTime = n.getAttribute("原稿新增日期時間");
		
		// 1130122 Raymond 1120887 新增分會合併
		if(n.hasAttribute("分會合併"))
			d.dispatchMerged = n.getAttribute("分會合併");
		
		// 1141218 Raymond 北榮序453 新增最後因自動增高簽核區域而異動內文的階段序號
		if(n.hasAttribute("最後自動增高簽核區域階段序號"))
			d.changedForSALPSN = n.getAttribute("最後自動增高簽核區域階段序號");
		
		var refs = n.getElementsByTagName("附件REF");
		if(refs != undefined && refs.length > 0) {
			for(var i=0; i<refs.length; i++)
				d.atts.push({id: refs[i].getAttribute("ID")});
		}
		refs = n.getElementsByTagName("對照表REF");
		if(refs != undefined && refs.length > 0) {
			d.mailmerge = {id: refs[0].getAttribute("ID")};
			_lastMailMergeID = (_lastMailMergeID > d.mailmerge.id)?_lastMailMergeID:d.mailmerge.id;	// 2017.01.13	Leslie	紀錄最後一個對照表序號
		}
		_drafts.push(d);
	}
	function _parseAttach(n) {
		_attachs.push({
			id: n.getAttribute("ID"),
			name: n.getAttribute("名稱"),
			desc: n.getAttribute("摘要"),
			fileName: n.getAttribute("路徑"),
			origFileName: n.getAttribute("路徑"),	// 2016.7.12 新增記錄原始附件檔名, 因為調整附件順序會影響附件檔名
			guid: n.getAttribute("GUID"),
			hash: n.getAttribute("hash"),
			//hasDocNo: ( theAOL.docObj.docNo != "" || (_folioInfo.docNo != null && _folioInfo.docNo != ""))	// 2016.12.2	Leslie	新增紀錄各附件加入時，是否有文號資訊(同一份草稿可能在取號前、後分別加入附件)	//2016.12.12	Leslie	增加判斷目前公文是否有文號，並作為優先條件
			hasDocNo: ( theAOL.docObj.docNo != "" || (_folioInfo.docNo != null && _folioInfo.docNo != "" && _folioInfo.docNo != "undefined"))	// 1110225 Raymond 1110289 修正取號前已加入附件, 儲存關閉再開啟後, 在取號後自動儲存時不會走到moveDraftAtt的問題, 因為取號前儲存時記錄在DraftMgmt.xml中的docNo、requested屬性值為"undefined"
			// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
			,cusName: (n.getAttribute("標籤名稱")?n.getAttribute("標籤名稱"):"")
		});
		
		if(_attachs[_attachs.length - 1].id.match(/NewAtt(\d+)/))	// 更新計數
			_lastAttSN = Math.max(_lastAttSN, RegExp.$1);
		else if(_attachs[_attachs.length - 1].id.match(/\d+/))	// 2016.12.12 bugfix for 已有附件再新增時, 附件序號不會遞增
			_lastAttSN = Math.max(_lastAttSN, _attachs[_attachs.length - 1].id);
		
		// 1110317 Raymond 1101578 新增最後異動人員及時間記錄
		if(!!n.getAttribute("lastModifiedSN")) {
			_attachs[_attachs.length - 1].lastModifiedSN = n.getAttribute("lastModifiedSN");
			_attachs[_attachs.length - 1].lastModifiedTime = n.getAttribute("lastModifiedTime");
			_attachs[_attachs.length - 1].lastModifiedUser = n.getAttribute("lastModifiedUser");
			_attachs[_attachs.length - 1].lastModifiedRole = n.getAttribute("lastModifiedRole");
		}
	}
	function _parseMailMerge(n) {
		//2017.01.13	Leslie	修改對照表物件格式，改為跟著 _drafts 的子物件
		var _id = n.getAttribute("ID");
		for(var i=0,_drf;_drf=_drafts[i];i++){
			if('mailmerge' in _drf && _drf.mailmerge != undefined && _drf.mailmerge.id == _id){
				_drf.mailmerge.fileName = n.getAttribute("路徑");
				_drf.mailmerge.guid = n.getAttribute("GUID");
			}
		}
		/*_mailmerges.push({
			id: n.getAttribute("ID"),
			fileName: n.getAttribute("路徑"),
			guid: n.getAttribute("GUID")
		});*/
	}
	function _parseExtra(n) {
		switch(n.nodeName) {
			case "分類號":
				_folioInfo.clsNo = n.textContent;
				break;
			case "保存年限":
				_folioInfo.keepYear = n.textContent;
				break;
			case "密等及解密條件或保密期限":
				var s = n.getElementsByTagName("密等");
				if(s != undefined && s.length > 0) {
					_folioInfo.secret = s[0].getAttribute("代碼");
				}
				s = n.getElementsByTagName("解密條件或保密期限");
				if(s != undefined && s.length > 0) {
					_folioInfo.decrypt = s[0].textContent;
				}
				break;
			case "速別":
				_folioInfo.speed = n.getAttribute("代碼");
				break;
		}
	}
	// 1120314 Raymond 1111133 新增讀取重新命名的來文附件名稱
	function _parseFromDocAtt(n) {
		var sn = n.getAttribute("序號");
		if(!!sn && sn.match(/\d+/)) {
			_fromDocAttName[parseInt(sn)] = n.getAttribute("名稱");
		}
	}
	
	// 2016.6.17 取得新文稿稿序名稱, 2016.10.4 新增以函(令)類別為稿序名稱
	function _getNewDraftName(docType, subDocType) {
		// 依據不同邏輯設定新文稿的稿序名稱
		var rule = theSSO.User.EnvSettings.get("WE_DRAFT_NAMING");
		function formatName(dt, cnt) {
			/* 1060705 Raymond 改為預設第1種命名邏輯, 因為有機關(中興)不會設定WE_DRAFT_NAMING環境變數
			if(rule == "1") {
				if(cnt == 0)
					return dt + "（稿）";
				return dt + "（稿" + (cnt+1) + "）";
			}
			else*/ if(rule == "2") {
				if(cnt == 0)
					return dt + "（稿）";
				return dt + "（稿" + Util.translateNumber(cnt+1, false) + "）";
			}
			else if(rule == "3") {
				if(cnt == 0)
					return dt + "（稿）";
				// TODO: 把第1筆同文別的稿序改成"（稿一）"
				return dt + "（稿" + Util.translateNumber(cnt+1, false) + "）";
			}
			else {	// 1060705 Raymond 改為預設第1種命名邏輯, 因為有機關(中興)不會設定WE_DRAFT_NAMING環境變數
				if(cnt == 0)
					return dt + "（稿）";
				return dt + "（稿" + (cnt+1) + "）";
			}
		}
		var c = 0;
		if(typeof subDocType === "string" && subDocType.length > 0 && 	// 2016.10.4 若新稿件有函(令)類別, 則以函(令)類別為稿序名稱
			(docType == "函" || docType == "令")) {						// 2016.11.14 令或函才要依函類別計算
			for(var i=0; i<_drafts.length; i++) {
				if(_drafts[i].subDocType == subDocType)
					c ++;
			}
			// 2016.11.18 fix for 刪除後新增或貼上/文別轉換可能會重複稿序名稱, 須重取
			var candidate = formatName(subDocType, c);
			while(true) {
				var dup = false;
				for(var i=0; i<_drafts.length; i++) {
					if(_drafts[i].name == candidate) {
						candidate = formatName(subDocType, ++c);	// 重複則重取, 2016.12.19 bugfix
						dup = true;
						break;
					}
				}
				if(!dup)
					return candidate;
			}
		}
		else {
			for(var i=0; i<_drafts.length; i++) {
				if(_drafts[i].docType == docType)
					c ++;
			}
			// 2016.11.18 fix for 刪除後新增或貼上/文別轉換可能會重複稿序名稱, 須重取
			var candidate = formatName(docType, c);
			while(true) {
				var dup = false;
				for(var i=0; i<_drafts.length; i++) {
					if(_drafts[i].name == candidate) {
						candidate = formatName(docType, ++c);	// 重複則重取, 2016.12.19 bugfix
						dup = true;
						break;
					}
				}
				if(!dup)
					return candidate;
			}
		}
		return docType + "（稿）";
	}
	
	// 1130116 Raymond 1120887 若是分會的話, 異動過的簽稿會核單(支援自訂簽核框高度)tc檔名須更名
	function _getDispatchConDraftFileName(idx) {
		if(!!_model.getDocObj().ODWDCM && _model.getDocObj().get("ODWDCM", "IS_THREAD") == "Y") {	// 分會中
			if(!!_drafts[idx].dm && _drafts[idx].dm.dirty() && _drafts[idx].dm.supportSALP()) {
				let p = _dirPath.lastIndexOf("\\");
				let p2 = _dirPath.substr(0, p).lastIndexOf("\\");
				let dispConDirName = _dirPath.substring(p2 + 1, p);
				if((new RegExp(dispConDirName)).test(_drafts[idx].tcFileName)) {	// 檢查tc檔名是否已更名過
				}
				else {	// 未更名過才以「分會根目錄+原本檔名」更名
					let newDraftFileName = dispConDirName + "-" + _drafts[idx].tcFileName;
					theLogger.log("分會中'" + _drafts[idx].name + "'已異動, TC檔須另存為'" + newDraftFileName + "'");
					_drafts[idx].tcFileName = newDraftFileName;
					return newDraftFileName;
				}
			}
		}
	}
	
	// 1130116 Raymond 1120887 若是分會的話, 異動過的簽稿會核單(支援自訂簽核框高度)完稿檔名須更名
	function _getDispatchConCmplDraftFileName(idx) {
		if(!!_model.getDocObj().ODWDCM && _model.getDocObj().get("ODWDCM", "IS_THREAD") == "Y") {	// 分會中
			if(!!_drafts[idx].dm && _drafts[idx].dm.dirty() && _drafts[idx].dm.supportSALP()) {
				let p = _dirPath.lastIndexOf("\\");
				let p2 = _dirPath.substr(0, p).lastIndexOf("\\");
				let dispConDirName = _dirPath.substring(p2 + 1, p);
				if((new RegExp(dispConDirName)).test(_drafts[idx].fileName)) {	// 檢查完稿檔名是否已更名過
				}
				else {	// 未更名過才以「分會根目錄+原本檔名」更名
					let newDraftFileName = dispConDirName + "-" + _drafts[idx].fileName;
					theLogger.log("分會中'" + _drafts[idx].name + "'已異動, 完稿檔須另存為'" + newDraftFileName + "'");
					_drafts[idx].fileName = newDraftFileName;
					return newDraftFileName;
				}
			}
		}
	}
	
	// public interface
	return {
		// public methods
		setDocNo: function(docNo) {			//設定公文文號
			_model.setDocNo(docNo);
			return this;
		},
		getDocNo: function() {				//取得公文文號
			return _model.getDocNo();
		},
		getMsgId: function() {				//取得MsgID
			return _model.getMsgId();
		},
		
		getTCSess: function(sn) {			//取得追蹤修訂階段
			if(sn < 0 || sn >= _tcSess.length)
				throw new Error("要求取得第" + sn + "個追蹤修訂階段物件, 超出範圍");
			return _tcSess[sn];
		},
		getAllTCSess: function() {			// 取得所有追蹤修訂階段
			return _tcSess;
		},
		
		getEditSN: function() {
			return _editSN;
		},
		
		getEditable: function() {			// 是否可編輯, 2016.2.2 新增, 文稿是否可編輯由DraftMgmt決定
			return _readWrite;
		},
		
		getAllDrafts: function() {			//取得全部文稿
			return _drafts;
		},
		
		getDraftCounts: function() {		//取得文稿總數
			return _drafts.length;
		},
		
		getDraftName: function(indexOrGUID) {	//取得文稿稿序
			if(typeof indexOrGUID === "string" && indexOrGUID.match(/^\{[0-9a-fA-F\-]*\}/)) {
				for(var i=0; i<_drafts.length; i++) {
					if(indexOrGUID == _drafts[i].guid)
						return _drafts[i].name;
				}
				throw new Error("管理檔中找不到指定GUID為'" + indexOrGUID + "'的文稿");
			}
			else if(indexOrGUID < 0 || indexOrGUID >= _drafts.length)
				throw new Error("要求取得第" + indexOrGUID + "個文稿稿序名稱, 超出範圍");
			return _drafts[indexOrGUID].name;
		},
		
		getDraftFileName: function(indexOrGUID) {	//取得文稿檔名, index指封裝檔中的序
			if(typeof indexOrGUID === "string" && indexOrGUID.match(/^\{[0-9a-fA-F\-]*\}/)) {
				for(var i=0; i<_drafts.length; i++) {
					if(indexOrGUID == _drafts[i].guid)
						return _drafts[i].tcFileName;
				}
				throw new Error("管理檔中找不到指定GUID為'" + indexOrGUID + "'的文稿");
			}
			else if(indexOrGUID < 0 || indexOrGUID >= _drafts.length)
				throw new Error("要求取得第" + indexOrGUID + "個文稿檔名, 超出範圍");
			// 1130116 Raymond 1120887 若是分會的話, 異動過的簽稿會核單(支援自訂簽核框高度)tc檔名須更名
			// 1100316 Raymond 1090991 修正一代紙本公文文稿"修訂檔路徑"可能是空值, 導致無法下載文稿檔問題
			//return _drafts[indexOrGUID].tcFileName;
			//return _drafts[indexOrGUID].tcFileName || _drafts[indexOrGUID].fileName;
			return _getDispatchConDraftFileName(indexOrGUID) || _drafts[indexOrGUID].tcFileName || _drafts[indexOrGUID].fileName;
		},
		
		getCmplDraftFileName: function(indexOrGUID) {	//取得完稿稿檔名, index指封裝檔中的序
			if(typeof indexOrGUID === "string" && indexOrGUID.match(/^\{[0-9a-fA-F\-]*\}/)) {
				for(var i=0; i<_drafts.length; i++) {
					if(indexOrGUID == _drafts[i].guid)
						return _drafts[i].fileName;
				}
				throw new Error("管理檔中找不到指定GUID為'" + indexOrGUID + "'的文稿");
			}
			else if(indexOrGUID < 0 || indexOrGUID >= _drafts.length)
				throw new Error("要求取得第" + indexOrGUID + "個文稿檔名, 超出範圍");
			// 1130116 Raymond 1120887 若是分會的話, 異動過的簽稿會核單(支援自訂簽核框高度)完稿檔名須更名
			//return _drafts[indexOrGUID].fileName;
			return _getDispatchConCmplDraftFileName(indexOrGUID) || _drafts[indexOrGUID].fileName;
		},
		
		getDraftCreateSN: function(indexOrGUID) {	//取得原稿新增階段序號, index指封裝檔中的序
			if(typeof indexOrGUID === "string" && indexOrGUID.match(/^\{[0-9a-fA-F\-]*\}/)) {
				for(var i=0; i<_drafts.length; i++) {
					if(indexOrGUID == _drafts[i].guid)
						return _drafts[i].createSN;
				}
				throw new Error("管理檔中找不到指定GUID為'" + indexOrGUID + "'的文稿");
			}
			else if(indexOrGUID < 0 || indexOrGUID >= _drafts.length)
				throw new Error("要求取得第" + indexOrGUID + "個文稿原稿新增階段序號, 超出範圍");
			return _drafts[indexOrGUID].createSN;
		},
		
		getDraftDocType: function(indexOrGUID) {	// 2016.10.31 新增直接取得文別功能
			if(typeof indexOrGUID === "string" && indexOrGUID.match(/^\{[0-9a-fA-F\-]*\}/)) {
				for(var i=0; i<_drafts.length; i++) {
					if(indexOrGUID == _drafts[i].guid)
						return _drafts[i].docType;
				}
				throw new Error("管理檔中找不到指定GUID為'" + indexOrGUID + "'的文稿");
			}
			else if(indexOrGUID < 0 || indexOrGUID >= _drafts.length)
				throw new Error("要求取得第" + indexOrGUID + "個文稿文別, 超出範圍");
			return _drafts[indexOrGUID].docType;
		},
		
		getDraftIndex: function(GUID) {	// 2016.2.1 從GUID找出文稿索引值
			for(var i=0; i<_drafts.length; i++) {
				if(GUID == _drafts[i].guid) {
					return i;
				}
			}
			return -1;	// 找不到則回傳-1
		},
		
		// 1130808 Raymond 1130313 合併1111007(1100394), 新增waitUntilSelXSL參數, 匯入ZIP壓縮檔中的文稿檔, 若要選取套用樣版檔時, 不要提前resolve
		//accquireDraftModel: function(indexOrGUID) {	//取得文稿模型物件
		accquireDraftModel: function(indexOrGUID, waitUntilSelXSL) {	//取得文稿模型物件
			var idx = -1;
			if(typeof indexOrGUID === "string" && indexOrGUID.match(/^\{[0-9a-fA-F\-]*\}/)) {
				for(var i=0; i<_drafts.length; i++) {
					if(indexOrGUID == _drafts[i].guid) {
						idx = i;
						break;
					}
				}
				if(idx < 0)
					throw new Error("管理檔中找不到指定GUID為'" + indexOrGUID + "'的文稿");
			}
			else if(indexOrGUID < 0 || indexOrGUID >= _drafts.length)
				throw new Error("要求取得第" + indexOrGUID + "個文稿模型物件, 超出範圍");
			else
				idx = indexOrGUID;
			
			// 1130411 Raymond 1130091 檢查是否尚在初始化中
			if(!_drafts[idx].dm && !!_drafts[idx].padding) {
				theLogger.log("要求取得第" + idx + "個文稿模型物件, 尚在初始化中...");
				return _drafts[idx].padding.promise();
			}
			
			var dfd = $.Deferred();
			theLogger.log("要求取得第" + idx + "個文稿模型物件, 初始化...");
			// 1130411 Raymond 1130091 設定文稿尚在初始化中
			_drafts[idx].padding = dfd.promise();
			// 1130808 Raymond 1130313 合併1111007(1100394), 新增waitUntilSelXSL參數, 匯入ZIP壓縮檔中的文稿檔, 若要選取套用樣版檔時, 不要提前resolve
			// 1100310 Raymond 1090991 新增傳入第5參數defPrintXSLName, 從樣版新增文稿時, 會從RsrcMgmt.xml中取得"預設排版"屬性, 並記錄為_drafts[idx]的defPrintXSLName
			//(new DraftModel()).init(this, idx, _fileIOWS, _dirPath)
			//(new DraftModel()).init(this, idx, _fileIOWS, _dirPath, _drafts[idx].defPrintXSLName)
			(new DraftModel()).init(this, idx, _fileIOWS, _dirPath, _drafts[idx].defPrintXSLName, waitUntilSelXSL)
				.done(function(idx, dm) {	// 迴圈中廷後觸發的callback所看到的(迴圈中定義的)區域變數都會變成最後設定值, 須用callback參數回傳才正確
					theLogger.log("#" + idx + ": \"" + _drafts[idx].name + "\"載入成功!");
					_drafts[idx].dm = dm;	// 2016.10.4 新增DM, 刪除時要用來- _index
					delete _drafts[idx].padding;	// 1130411 Raymond 1130091 刪除文稿尚在初始化中狀態
					dfd.resolve(indexOrGUID, dm);	// 新增的DraftModel, DraftMgmt本身不記錄, 由叫用accquire方法的對象(FolioModel)記錄
				})
				.fail(function(idx, errorText) {
					dfd.reject(indexOrGUID, "\"" + _drafts[idx].name + "\"載入失敗! " + errorText);
				});
			return dfd;
		},
		
		// 1130220 Raymond 1120234 新增第4參數, 傳入來文DI的檔名, 可直接以假的文稿管理檔內容動態載入來文DI顯示
		//init: function(model, fileIOWS, dirPath) {	//初始化
		init: function(model, fileIOWS, dirPath, fromDIFileName) {	//初始化
			
			_model = model;
			_fileIOWS = fileIOWS;
			_dirPath = dirPath;
			
			_lastAttSN = 0;	// 2016.7.12 計數歸0
			var dfd = $.Deferred();
			// 1130220 Raymond 1120234 新增第4參數, 傳入來文DI的檔名, 可直接以假的文稿管理檔內容動態載入來文DI顯示
			if(!!fromDIFileName) {
				_drafts.push({name:"來文頁面", fileName:fromDIFileName, atts:new Array()});	// 指定頁籤名稱為"來文頁面"借用1110521功能, 會改搜尋「文」格式的排版設定檔來套用
				dfd.resolve();
				return dfd.promise();
			}
			
			// 從SessionStorage中讀回暫存的文稿管理檔XML
			var l = dirPath.lastIndexOf('\\');	// 2016.2.1 文稿管理檔會有多筆, 須依下載子目錄區分不同暫存物件
			if(l < 0)
				throw new Error("傳入的文稿管理檔下載路徑(" + dirPath + ")無'\\'!");
			// 1130808 Raymond 1130313 合併1111007(1100394), 離線版不要下載文稿管理檔
			if(!!theSSO && theSSO.offlineMode == true) {
				_tcSess.push({
					index: 0,
					userId: _model.getOwnUserId(),
					name: _model.getOwnUserName(),
					color: _model.getUserColor(),
					msgId: _model.getMsgId(),
					ouId: _model.getOwnOUId(),									// 1110531 Raymond 1110527 新增記錄公文目前流程點的OWN_OU_ID
					roleId: _model.getOwnRoleId(),								// 1110531 Raymond 1110527 新增記錄公文目前流程點的OWN_ROLE_ID
					folder: _model.getFolder() + "-" + _model.getSubFolder()	// 1110531 Raymond 1110527 新增記錄公文目前流程點的Folder-Subfolder
				});
				_dirty = true;
				_editSN = 0;	// 2016.2.1 新增
				dfd.resolve();
				return dfd.promise();
			}
			var cachedDraftMgmt = dirPath.substring(l+1) + ".DraftMgmt.xml";
			/*if(cachedDraftMgmt in sessionStorage) {
				theLogger.log("讀取暫存於連線階段的文稿管理檔'" + cachedDraftMgmt + "'");
				var xml = (new DOMParser()).parseFromString(sessionStorage[cachedDraftMgmt], "text/xml");
				_parseXML(xml);	// 載入文稿管理檔
				theLogger.log("folioInfo:");
				theLogger.log(_folioInfo);
				theLogger.log("drafts:");
				theLogger.log(_drafts);
				dfd.resolve();
			}
			else*/ {
				theLogger.log("下載文稿管理檔'" + dirPath + "\\DraftMgmt.xml'...");
				var wfio = new WebFileIO(fileIOWS);
				wfio.download(dirPath, "DraftMgmt.xml", {
					success: function(fil, res) {
						theLogger.log(fil);
						_parseXML(fil);	// 載入文稿管理檔
						theLogger.log("folioInfo:");
						theLogger.log(_folioInfo);
						theLogger.log("drafts:");
						theLogger.log(_drafts);
						
						_origDraftCounts = _drafts.length;	// 1080620 Raymond 1080433 記錄初始載入時的文稿數
						
						if(_readWrite) {	// 2015.9.17 新增呼叫FolioModel.readOnly判斷是否為唯讀模式, 非唯讀再新增追蹤修訂階段, 2016.2.1 修改由readWrite決定
							if(_tcSess.length > 0) {
								var msgId = _model.getMsgId();
								if(_model.getMsgId().indexOf('_') > 0) {	// 草稿公文夾的msgId會多一個_帳號
									msgId = _model.getMsgId().substring(0, _model.getMsgId().indexOf('_'));
								}
								if(_tcSess[_tcSess.length-1].msgId != msgId) {    // msg id 不同需新增流程點
									theLogger.log("文稿管理檔中最後一筆MsgID與目前公文的MsgID不同, 新增追蹤修訂階段");
									_tcSess.push({
										index: _tcSess[_tcSess.length-1].index + 1,
										userId: _model.getOwnUserId(),
										name: _model.getOwnUserName(),
										color: _model.getUserColor(),
										msgId: _model.getMsgId(),
										ouId: _model.getOwnOUId(),									// 1110531 Raymond 1110527 新增記錄公文目前流程點的OWN_OU_ID
										roleId: _model.getOwnRoleId(),								// 1110531 Raymond 1110527 新增記錄公文目前流程點的OWN_ROLE_ID
										folder: _model.getFolder() + "-" + _model.getSubFolder()	// 1110531 Raymond 1110527 新增記錄公文目前流程點的Folder-Subfolder
									});
									// 1111226 Raymond 1111401 新增編輯階段序號的異動改為另一個變數記錄, 與其它異動(新增/刪除文稿、附件、調整稿序...etc)的「_dirty」變數切開
									// 即使未異動內文也要更新文稿管理檔?
									//_dirty = true;
									_sessDirty = true;	// 用另一個變數記錄此異動, _dirty用於除此之外的所有異動
								}
								else {
									// 1141212 Raymond 1141627 修正不同人用同一個msgId開啟公文後, 應以後來者的資訊記錄為該msgId的使用者, 以與封裝檔傳送的邏輯一致
									//theLogger.log("文稿管理檔中最後一筆MsgID與目前公文的MsgID相同, 不新增追蹤修訂階段");
									if(_tcSess[_tcSess.length - 1].name != _model.getOwnUserName()) {
										theLogger.log("文稿管理檔中最後一筆MsgID與目前公文的MsgID相同, 但Name與目前使用者的OwnUserName不同, 覆寫為目前使用者的OwnUserID、OwnUserName...etc");
										_tcSess[_tcSess.length - 1].userId = _model.getOwnUserId();
										_tcSess[_tcSess.length - 1].name = _model.getOwnUserName();
										_tcSess[_tcSess.length - 1].color = _model.getUserColor();
										_tcSess[_tcSess.length - 1].ouId = _model.getOwnOUId();
										_tcSess[_tcSess.length - 1].roleId = _model.getOwnRoleId();
										_tcSess[_tcSess.length - 1].folder = _model.getFolder() + "-" + _model.getSubFolder();
									}
									else {
										theLogger.log("文稿管理檔中最後一筆MsgID與目前公文的MsgID相同, 且UserID也與目前使用者OwnUserID相同, 不新增追蹤修訂階段");
									}
								}
								_editSN = _tcSess[_tcSess.length-1].index;
								
								// 1110322 Raymond 1101416 新增若文稿管理檔未記錄最後異動文稿清單(新增、刪除稿件、調整稿序)的階段序號
								if(typeof _lastModifyDraftListSN != "number") {
									if(_drafts.length > 0) {	// 則以最後新增稿件的階段序號做為最後異動文稿清單的階段序號
										for(var i=0; i<_drafts.length; i++) {
											_lastModifyDraftListSN = Math.max(parseInt(_drafts[i].lastModifiedSN), _lastModifyDraftListSN);
										}
									}
									else	// 無任何新增稿件的話, 最後異動文稿清單的階段序號則預設為0
										_lastModifyDraftListSN = 0;
								}
							}
							else {	// 2015.9.17 空的文稿管理檔(承辦人), 直接新增追蹤修訂階段
								theLogger.log("文稿管理檔未記錄任何追蹤修訂階段, 直接新增");
								_tcSess.push({
									index: 0,
									userId: _model.getOwnUserId(),
									name: _model.getOwnUserName(),
									color: _model.getUserColor(),
									msgId: _model.getMsgId(),
									ouId: _model.getOwnOUId(),									// 1110531 Raymond 1110527 新增記錄公文目前流程點的OWN_OU_ID
									roleId: _model.getOwnRoleId(),								// 1110531 Raymond 1110527 新增記錄公文目前流程點的OWN_ROLE_ID
									folder: _model.getFolder() + "-" + _model.getSubFolder()	// 1110531 Raymond 1110527 新增記錄公文目前流程點的Folder-Subfolder
								});
								// 1140630 Raymond 1140890 比照1111401, 新增編輯階段序號的異動改為另一個變數記錄, 與其它異動(新增/刪除文稿、附件、調整稿序...etc)的「_dirty」變數切開
								//_dirty = true;
								_sessDirty = true;	// 用另一個變數記錄此異動, _dirty用於除此之外的所有異動
								_editSN = 0;	// 2016.2.1 新增
								_lastModifyDraftListSN = 0;	// 1110322 Raymond 1101416 新增最後異動文稿清單的階段序號預設為0
							}
						}
						dfd.resolve();
					},
					error: function(errorText) {	// 2015.6.10 fix callback function name
						theLogger.log(errorText);
						// 找不到管理檔時, 會回傳錯誤碼02
						if(errorText.match(/^02:/)) {
							if(_readWrite) {	// 2016.7.1 找不到文稿管理檔, 但可readWrite, 表示是創稿
								theLogger.log("找不到文稿管理檔, 應是草稿, 直接新增追蹤修訂階段");
								_tcSess.push({
									index: 0,
									userId: _model.getOwnUserId(),
									name: _model.getOwnUserName(),
									color: _model.getUserColor(),
									msgId: _model.getMsgId(),
									ouId: _model.getOwnOUId(),									// 1110531 Raymond 1110527 新增記錄公文目前流程點的OWN_OU_ID
									roleId: _model.getOwnRoleId(),								// 1110531 Raymond 1110527 新增記錄公文目前流程點的OWN_ROLE_ID
									folder: _model.getFolder() + "-" + _model.getSubFolder()	// 1110531 Raymond 1110527 新增記錄公文目前流程點的Folder-Subfolder
								});
								// 1140630 Raymond 1140890 比照1111401, 新增編輯階段序號的異動改為另一個變數記錄, 與其它異動(新增/刪除文稿、附件、調整稿序...etc)的「_dirty」變數切開
								//_dirty = true;
								_sessDirty = true;	// 用另一個變數記錄此異動, _dirty用於除此之外的所有異動
								_editSN = 0;	// 2016.2.1 新增
								dfd.resolve();
							}
							/* 2016.9.19 管不了什麼例不例外了, Folder-Subfolder是人工訂的名稱, 加也加不完, 乾脆通通不要警告
							else if(_model.getFolder() == "待處理" && _model.getSubFolder() == "主辦待分辦") {	// 2016.8.26 新增'待處理-主辦待分辦'為例外
								theLogger.log("找不到文稿管理檔, 待處理-主辦待分辦公文, 合理情況");
								dfd.resolve();
							}
							else
								dfd.reject(errorText);*/
							else
								dfd.resolve();
						}
						else
							dfd.reject(errorText);
					}
				});
			}
			return dfd.promise();
		},
		
		notifyContentChanged: function(fieldName, value) {	// 由DraftModel通知內文有異動
			theLogger.log("'" + fieldName + "'的內容已異動為'" + value + "'");
			// 文稿管理檔中的共同欄位
			if(fieldName == "分類號") {
				_folioInfo.clsNo = value;	// 2016.11.3 補上
			}
			else if(fieldName == "保存年限"){
				_folioInfo.keepYear = value;	// 2016.11.3 補上
			}
			else if(fieldName == "密等") {	// 2016.11.3 補上
				_folioInfo.secret = value;
			}
			else if(fieldName == "解密條件或保密期限") {	// 2016.11.3 補上
				_folioInfo.decrypt = value;
			}
		},
		
		dirty: function() {
			if(arguments.length > 0) {
				if(!readWrite && arguments[0] == true) {
					theLogger.error("唯讀文稿管理檔不可設為dirty!");
					alert("唯讀文稿管理檔不可設為dirty!");
				}
				theLogger.warn("DraftMgmt.dirty(" + arguments[0] + ")");
				_dirty = arguments[0];
				
				// 1120915 Raymond 1120574 新增記錄最後異動時間
				if(_dirty) {
					var dt = Util.now();
					_lastModifyTime = Util.padLeft(dt.getYear() - 11, 3) + Util.padLeft(dt.getMonth() + 1, 2) + Util.padLeft(dt.getDate(), 2) + Util.padLeft(dt.getHours(), 2) + Util.padLeft(dt.getMinutes(), 2) + Util.padLeft(dt.getSeconds(), 2);
				}
				
				// 1110322 Raymond 1101416 新增若多了第2參數, 則是DraftModel.dirty呼叫的多傳了的文稿index, 則設定<文稿>的最後異動內文階段序號
				if(_dirty && arguments.length > 1) {
					if(typeof arguments[1] == "number") {
						if(arguments[1] >= 0 && arguments[1] < _drafts.length)
							_drafts[arguments[1]].lastModifiedSN = _editSN;
						else
							throw new Error("無法設定第" + arguments[1] + "個文稿之最後異動內文階段序號, 超出範圍");
					}
					else
						theLogger.error("DraftMgmt.dirty()傳入的第2個參數非數字, 不支援!", arguments[0]);
				}
			}
			else
				theLogger.warn("DraftMgmt.dirty()=" + _dirty);
			return _dirty;
		},
		// 1111226 Raymond 1111401 新增編輯階段序號的異動改為另一個變數記錄, 與其它異動(新增/刪除文稿、附件、調整稿序...etc)的「_dirty」變數切開
		getSessionDirty: function() {
			return _sessDirty;
		},
		
		save: function(options) {
			// 組成 DraftMgmt.xml
			if("ActiveXObject" in window) {
				var doc = new ActiveXObject("MSXML2.DOMDocument");
				if(!doc.loadXML("<公文夾/>")) {
					var pe = doc.parseError;
					throw new Error(pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
				}
			}
			else
				var doc = (new DOMParser()).parseFromString("<公文夾/>", "text/xml");
			
			function newElm(name, parent) {
				return $(doc.createElement(name)).appendTo(parent);
			}
			function newElmTxt(name, parent, txt) {	// 2016.11.3 新增 for IE-compatible
				var $newElm = $(doc.createElement(name)).appendTo(parent);
				if("text" in $newElm.get(0))	// 2016.11.3 for IE-compatible
					$newElm.get(0).text = txt;
				else
					$newElm.text(txt);
			}
			// 1110527 Raymond 1110527 新增取得現在日期時間, 格式轉為YYYMMDDhhmmss(民國年)
			function getCurrDateTime() {
				var dt = Util.now();
				return Util.padLeft(dt.getYear() - 11, 3) + Util.padLeft(dt.getMonth() + 1, 2) + Util.padLeft(dt.getDate(), 2) + Util.padLeft(dt.getHours(), 2) + Util.padLeft(dt.getMinutes(), 2) + Util.padLeft(dt.getSeconds(), 2);
			}
			
			var $root = $(doc.documentElement)
							.attr("公文文號", HtmlEncode(_folioInfo.docNo))	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
							.attr("線上取號", HtmlEncode(_folioInfo.requested))	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
							.attr("最後異動文稿清單階段序號", HtmlEncode(_lastModifyDraftListSN));	// 1110322 Raymond 1101416 新增記錄最後異動文稿清單(新增、刪除稿件、調整稿序)的階段序號
			var $sess = newElm("追蹤修訂階段", $root);
			var i, j;
			for(i=0; i<_tcSess.length; i++) {
				newElm("階段", $sess)
					.attr("序號", _tcSess[i].index)
					.attr("UserID", _tcSess[i].userId)
					.attr("Name", _tcSess[i].name)
					.attr("Color", _tcSess[i].color)
					.attr("MsgID", _tcSess[i].msgId)
					.attr("OUID", _tcSess[i].ouId)																// 1110531 Raymond 1110527 新增記錄該流程點的OWN_OU_ID
					.attr("RoleID", _tcSess[i].roleId)															// 1110531 Raymond 1110527 新增記錄該流程點的OWN_ROLE_ID
					.attr("Folder", _tcSess[i].folder)															// 1110531 Raymond 1110527 新增記錄該流程點的Folder-Subfolder
					.attr("LastModified", (i == _editSN)?getCurrDateTime():_tcSess[i].lastModified)				// 1110527 Raymond 1110527 新增記錄最後儲存日期時間
					.attr("OverwriteReason", (i == _editSN)?options.overwriteReason:_tcSess[i].overwriteReason);	// 1110531 Raymond 1110527 新增記錄該流程點儲存覆蓋別人儲存上傳的新檔的原因
				// 1130123 Raymond 1120887 新增"分會"屬性
				if(!!_tcSess[i].isDispatch)
					$sess.children().last().attr("分會", _tcSess[i].isDispatch);
			}
			// 1120915 Raymond 1120574 更新上次儲存時間
			_lastSaveTime = _tcSess[_editSN].lastModified = $sess.children().last().attr("LastModified");
			if("clsNo" in _folioInfo) {
				newElmTxt("分類號", $root, _folioInfo.clsNo);	// 2016.11.3 for IE-compatible
			}
			if("keepYear" in _folioInfo) {
				newElmTxt("保存年限", $root, _folioInfo.keepYear);	// 2016.11.3 for IE-compatible
			}
			if("secret" in _folioInfo) {
				var $secret = newElm("密等及解密條件或保密期限", $root);
				newElm("密等", $secret).attr("代碼", _folioInfo.secret);
				var $decrypt = newElm("解密條件或保密期限", $secret);
				if("decrypt" in _folioInfo) {
					if("text" in $decrypt.get(0))	// 2016.11.3 for IE-compatible
						$decrypt.get(0).text = _folioInfo.decrypt;
					else
						$decrypt.text(_folioInfo.decrypt);
				}
			}
			if("speed" in _folioInfo) {
				newElm("速別", $root).attr("代碼", _folioInfo.speed);
			}
			for(i=0; i<_drafts.length; i++) {
				var $draft = newElm("文稿", $root)
							.attr("名稱", HtmlEncode(_drafts[i].name))	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
							.attr("路徑", HtmlEncode(_drafts[i].fileName))	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
							.attr("修訂檔路徑", HtmlEncode(_drafts[i].tcFileName))	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
							.attr("原稿新增階段序號", HtmlEncode(_drafts[i].createSN))	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
							.attr("GUID", HtmlEncode(_drafts[i].guid))	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
							.attr("最後匯出頁面階段序號", HtmlEncode(_drafts[i].rndrSN))	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
							.attr("文別", HtmlEncode(_drafts[i].docType));	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
				if("subDocType" in _drafts[i] && _drafts[i].subDocType.length > 0)
					$draft.attr("函類別", HtmlEncode(_drafts[i].subDocType));	// 2016.11.14 新增記錄函類別	1101101 Raymond 1100991 修正弱掃Client Potential XSS
				//1060509	Leslie[1060297]	一律回寫文稿管理檔的，以避免線上轉紙本的儲存，存不到已選擇的樣版，取消紙本簽核的判斷條件
				//if(_model.getSignType() == "P")	// 2016.9.29 紙本簽核改記錄在DraftMgmt.xml
					$draft.attr("套用樣版檔", HtmlEncode(_drafts[i].applyPrintXSL));	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
				// 1100323 Raymond 1090857 新增記錄分頁後總頁數在DraftMgmt.xml
				if("pages" in _drafts[i] && _drafts[i].pages > 0)
					$draft.attr("分頁後總頁數", HtmlEncode(_drafts[i].pages));	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
				// 1110322 Raymond 1101416 新增若文稿內容有異動, 則寫入最後異動內文階段序號
				if(!!_drafts[i].dm && _drafts[i].dm.dirty())
					$draft.attr("最後異動內文階段序號", HtmlEncode(_editSN));
				else if("lastModifiedSN" in _drafts[i])
					$draft.attr("最後異動內文階段序號", HtmlEncode(_drafts[i].lastModifiedSN));
				// 1110610 Raymond 1110283 新增記錄文稿加入的日期時間
				if(!!_drafts[i].createTime)
					$draft.attr("原稿新增日期時間", HtmlEncode(_drafts[i].createTime));
				// 1111117 Raymond 1111069 新增記錄最後置換文稿的階段序號
				if(!!_drafts[i].lastReplaceSN)
					$draft.attr("最後置換文稿階段序號", HtmlEncode(_drafts[i].lastReplaceSN));
				// 1141218 Raymond 北榮序453 新增記錄最後因自動增高簽核區域而異動內文的階段序號
				if(!!_drafts[i].changedForSALPSN)
					$draft.attr("最後自動增高簽核區域階段序號", HtmlEncode(_drafts[i].changedForSALPSN));
				for(j=0; j<_drafts[i].atts.length; j++) {
					newElm("附件REF", $draft).attr("ID", HtmlEncode(_drafts[i].atts[j].id));	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
				}
				if("mailmerge" in _drafts[i])
					newElm("對照表REF", $draft).attr("ID", HtmlEncode(_drafts[i].mailmerge.id));	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
			}
			for(i=0; i<_attachs.length; i++) {
				// 1110317 Raymond 1101578 新增記錄最後異動人員
				//newElm("附件", $root)
				var $att = newElm("附件", $root)
					.attr("ID", _attachs[i].id)
					.attr("名稱", _attachs[i].name)
					.attr("摘要", _attachs[i].desc)
					.attr("路徑", _attachs[i].fileName)
					.attr("GUID", _attachs[i].guid)
					.attr("hash", _attachs[i].hash)
					.attr("標籤名稱", _attachs[i].cusName);	// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
				// 1110317 Raymond 1101578 新增記錄最後異動人員
				if("lastModifiedSN" in _attachs[i]) {
					$att.attr("lastModifiedSN", _attachs[i].lastModifiedSN)
						.attr("lastModifiedTime", _attachs[i].lastModifiedTime)
						.attr("lastModifiedUser", _attachs[i].lastModifiedUser)
						.attr("lastModifiedRole", _attachs[i].lastModifiedRole);
				}
			}
			//2017.01.13	Leslie	修改對照表物件格式，改為跟著 _drafts 的子物件，順便修正應存為"對照表"
			/*for(i=0; i<_mailmerges.length; i++) {
				newElm("分繕表", $root)
					.attr("ID", _mailmerges[i].id)
					.attr("路徑", _mailmerges[i].fileName)
					.attr("GUID", _mailmerges[i].guid);
			}*/
			for(i=0;i<_drafts.length;i++){
				if('mailmerge' in _drafts[i]){
					newElm("對照表", $root)
					.attr("ID", _drafts[i].mailmerge.id)
					.attr("路徑", _drafts[i].tcFileName.replace("-tc", "-mm"))
					.attr("GUID", _drafts[i].mailmerge.guid);
				}
			}
			// 1120314 Raymond 1111133 新增儲存重新命名的來文附件名稱
			for(i=0; i<_fromDocAttName.length; i++) {
				if(!!_fromDocAttName[i]) {
					newElm("來文附件", $root)
					.attr("序號", i)
					.attr("名稱", _fromDocAttName[i]);
				}
			}
			
			if(options != undefined && $.isFunction(options.success))
				options.success(_dirPath, "DraftMgmt.xml", doc);	// 2016.2.1 儲存的callback新增應上傳的子目錄路徑, 因文稿管理檔會有複數
		},
		
		//newDraft: function(xmlDoc, docType, isImported) {	// 1060620 Raymond 1060147 新增文稿是否為匯入的旗標
		//newDraft: function(xmlDoc, docType, isImported, defPrintXSLName) {	// 1100310 Raymond 1090991 新增預設排版設定檔名稱參數
		newDraft: function(xmlDoc, docType, isImported, defPrintXSLName, mmXmlStr) {	// 1130808 Raymond 1130313 合併1111007(1100394), 新增第5參數, 為從ZIP中一起打包的對照表檔案內容
			//alert("新增文稿 '" + path + "'");
			var dfd = $.Deferred();
			if(!_readWrite) {
				theLogger.error("唯讀文稿管理檔不可執行新增文稿!");
				dfd.reject("唯讀文稿管理檔不可執行新增文稿!");
			}
			else {
				var d = {
					name: "",
					createSN: _tcSess.length-1,
					guid: Util.genGUID(),
					rndrSN: "-1",
					docType: docType,
					atts: new Array(),
					isImported: isImported	// 1060620 Raymond 1060147 新增文稿是否為匯入的旗標
				};
				// 2016.7.29 新增文稿才會多次文別
				if(docType == "函") {
					var $dt = $(xmlDoc.documentElement).find("函類別");
					if($dt.length)
						d.subDocType = $dt.attr("代碼");
				}
				else if(docType == "令") {
					var $dt = $(xmlDoc.documentElement).find("令類別, 函類別");
					if($dt.length)
						d.subDocType = $dt.attr("代碼");
				}
				d.name = _getNewDraftName(docType, d.subDocType);	// 2016.10.4 多傳入函(令)類別參數
				var newFileName = Util.padLeft(++_lastFileNameSN, 4);
				d.fileName = newFileName + ".xml";
				d.tcFileName = newFileName + "-tc.xml";
				// 1100310 Raymond 1090991 新增若有傳入預設排版檔名稱, 則記錄在文稿物件d中, 供applyPrintXSL時搜尋使用
				if(!!defPrintXSLName && defPrintXSLName.length > 0)
					d.defPrintXSLName = defPrintXSLName;
				// 1110610 Raymond 1110283 新增記錄文稿加入的日期時間
				var now = Util.now();
				d.createTime = Util.padLeft(now.getYear() - 11, 3) + Util.padLeft(now.getMonth() + 1, 2) + Util.padLeft(now.getDate(), 2) + Util.padLeft(now.getHours(), 2) + Util.padLeft(now.getMinutes(), 2);	// 時間格式為年月日時分共11碼數字
				_drafts.push(d);
				
				// 將樣版XML檔儲存在sessionStorage, 當accquireDraftModel時會優先從sessionStorage讀取
				var l = _dirPath.lastIndexOf('\\');
				if(l < 0) {
					theLogger.warn("傳入的應下載子目錄路徑未包含'\\', 應是不合法的路徑名");
					dfd.reject("傳入的應下載子目錄路徑未包含'\\', 應是不合法的路徑名");
				}
				else {
					var cachedDraftName = _dirPath.substring(l+1) + "." + d.tcFileName;
					theLogger.log("新增文稿成功, 暫存於sessionStorage[" + cachedDraftName + "]");
					if("xml" in xmlDoc)	// for IE
						sessionStorage[cachedDraftName] = xmlDoc.xml;
					else
						sessionStorage[cachedDraftName] = (new XMLSerializer()).serializeToString(xmlDoc);
					sessionStorage[cachedDraftName + ".dirty"] = "true";	// DraftModel.init載入此item時, 預設要設dirty
					// 1130808 Raymond 1130313 合併1111007(1100394), 新增的第4參數若有值, 為從ZIP中一起打包的對照表檔案內容, 一併暫存於sessionStorage中, 在accquireDraftModel時一併讀取
					var cachedMMName = _dirPath.substring(l+1) + "." + d.tcFileName.replace("-tc", "-mm");
					theLogger.log("新增對照表成功, 暫存於sessionStorage[" + cachedMMName + "]");
					sessionStorage[cachedMMName] = mmXmlStr;

					_dirty = true;	// 新增文稿要設dirty
					// 1120915 Raymond 1120574 新增記錄最後異動時間
					_lastModifyTime = Util.padLeft(now.getYear() - 11, 3) + Util.padLeft(now.getMonth() + 1, 2) + Util.padLeft(now.getDate(), 2) + Util.padLeft(now.getHours(), 2) + Util.padLeft(now.getMinutes(), 2) + Util.padLeft(now.getSeconds(), 2);
					_draftListChanged = true;	// 1080531 Raymond 1080433 新增文稿使文稿清單變成已異動
					_lastModifyDraftListSN = _editSN;	// 1110322 Raymond 1101416 新增記錄最後異動文稿清單(新增、刪除稿件、調整稿序)的階段序號
					dfd.resolve(_drafts.length - 1, d, _dirPath.substring(l+1));	// 2016.7.29 新增回傳子目錄名稱, 因為SignWork.xml須記錄的檔名為子目錄+檔名
				}
			}
			return dfd.promise();
		},
		
		// 2016.7.14 同步文稿管理檔的文稿至封裝檔(由FolioModel呼叫)
		mapDrafts: function(callback) {
			var l = _dirPath.lastIndexOf('\\');	// 2016.8.12 新增傳回文稿管理檔所在子目錄子目錄
			if(l < 0)
				throw new Error("文稿管理檔下載路徑(" + _dirPath + ")無'\\'!");
			for(var i=0; i<_drafts.length; i++)
				callback(_drafts[i], _dirPath.substring(l+1));
		},
		
		// 2014.10.22 - Raymond, 轉向FolioModel物件查詢原本匯出頁面的print-xsl全徑名
		// 2015.1.22 - Raymond, 由於文稿管理檔中的文稿順序可能與封裝檔不一致, 故需改用GUID查詢
		getDraftOrigPrintXSL: function(idx) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿原匯出頁面所套用之PrintXSL全徑名, 超出範圍");
			if(_model.getSignType() == "P") {	// 2016.9.29 紙本簽核改記錄在DraftMgmt.xml
				return _drafts[idx].applyPrintXSL;
			}
			var guid = _drafts[idx].guid;
			theLogger.debug("getDraftOrigPrintXSL(" + idx + ")...guid:" + guid);
			// 1090804 Raymond 1090409 新增傳入文稿管理檔記錄的稿的樣版檔路徑
			//return _model.getDraftOrigPrintXSL(guid);
			return _model.getDraftOrigPrintXSL(guid, _drafts[idx].applyPrintXSL);
		},
		// 2014.10.22 - Raymond, 設定套用的printXSL全徑名
		// 2015.1.22 - Raymond, 由於文稿管理檔中的文稿順序可能與封裝檔不一致, 故需改用GUID查詢
		// 2016.8.1 - 新增printXSLType參數
		setDraftApplyPrintXSL: function(idx, path, printXSLType) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿原匯出頁面所套用之PrintXSL全徑名, 超出範圍");
			//1060509	Leslie[1060297]	於選定樣版檔後，應一律回寫文稿管理檔(讀取時會自動區分)，以避免線上轉紙本的儲存，存不到已選擇的樣版	--START--
			/*if(_model.getSignType() == "P") {	// 2016.9.29 紙本簽核改記錄在DraftMgmt.xml
				_drafts[idx].applyPrintXSL = path;
			}
			else {*/
			// 1060606 Raymond 1060477 修正僅開啟未異動, 關閉時卻顯示已異動是否儲存對話盒問題
			if(_drafts[idx].applyPrintXSL != path) {	// 登記桌等流程點, applyPrintXSL應有值且與path相同
				_drafts[idx].applyPrintXSL = path;
				_dirty = true;	//1060509	Leslie[1060297]	增加註記管理檔需回存
			}
			if(_model.getSignType() == "E"){	//1060509	Leslie[1060297]	僅線上簽核需設定至SignWork	--END--
				var guid = _drafts[idx].guid;
				theLogger.debug("setDraftOrigPrintXSL(" + idx + ", '" + path + "', '" + printXSLType + "')...guid:" + guid);
				_model.setDraftApplyPrintXSL(guid, path, printXSLType);
			}
		},
		// 2015.8.21 新增清除暫存檔功能
		clearTemp: function() {
			var l = _dirPath.lastIndexOf('\\');	// 2016.2.1 文稿管理檔會有多筆, 須依下載子目錄區分不同暫存物件
			if(l < 0)
				throw new Error("傳入的文稿管理檔下載路徑(" + _dirPath + ")無'\\'!");
			for(var i=0; i<_drafts.length; i++) {
				var cachedDraftName = _dirPath.substring(l+1) + "." + _drafts[i].tcFileName;	// 暫存檔名改為子目錄名.文稿檔名
				if(cachedDraftName in sessionStorage) {
					theLogger.log("清除暫存於連線階段的文稿XML'" + cachedDraftName + "'");
					sessionStorage.removeItem(cachedDraftName);
				}
			}
			var cachedDraftMgmt = _dirPath.substring(l+1) + ".DraftMgmt.xml";	// 暫存檔名改為子目錄名.DraftMgmt.xml
			//var cachedDraftMgmt = _model.getDocNo() + ".DraftMgmt.xml";
			if(cachedDraftMgmt in sessionStorage) {
				theLogger.log("清除暫存於連線階段的文稿管理檔'" + cachedDraftMgmt + "'");
				sessionStorage.removeItem(cachedDraftMgmt);
			}
		},
		// 2015.11.19 新增取得文稿所在路徑, 供超鏈結開啟附件檔使用
		getDraftDirPath: function() {
			if(typeof _dirPath === "string" && _dirPath.length)
				return _dirPath;
			theLogger.error("文稿檔所在根路徑未設定, 可能尚未初始化");
			throw new Error("文稿檔所在根路徑未設定, 可能尚未初始化");
		},
		// 2016.6.22 新增取得附件
		getDraftAttCounts: function(idx) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的附件數量, 超出範圍");
			theLogger.debug("getDraftAttCounts(" + idx + ") = " + _drafts[idx].atts.length);
			return _drafts[idx].atts.length;
		},
		// 2016.7.11 新增取得附件名
		getDraftAttName: function(idx, idx2) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的附件名稱, 超出範圍");
			if(idx2 < 0 || idx2 >= _drafts[idx].atts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的第" + idx2 + "個附件名稱, 超出範圍");
			var id = _drafts[idx].atts[idx2].id;
			for(var i=0; i<_attachs.length; i++) {
				if(_attachs[i].id == id) {
					theLogger.debug("getDraftAttName(" + idx + "," + idx2 + ") = " + _attachs[i].name);
					// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
					if(_showCustomName && _attachs[i].cusName)
						return (_attachs[i].cusName.length > 4)? _attachs[i].cusName.substring(0,4):_attachs[i].cusName;
					return _attachs[i].name;
				}
			}
			theLogger.error("找不到id:" + id + "的附件名");
			return null;
		},
		// 2016.7.12 新增取得附件檔名
		getDraftAttFileName: function(idx, idx2) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的附件檔名, 超出範圍");
			if(idx2 < 0 || idx2 >= _drafts[idx].atts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的第" + idx2 + "個附件檔名, 超出範圍");
			var id = _drafts[idx].atts[idx2].id;
			for(var i=0; i<_attachs.length; i++) {
				if(_attachs[i].id == id) {
					theLogger.debug("getDraftAttFileName(" + idx + "," + idx2 + ") = " + _attachs[i].fileName);
					return _attachs[i].fileName;
				}
			}
			theLogger.error("找不到id:" + id + "的附件名");
			return null;
		},
		// 2016.7.12 新增取得原始附件檔名
		getDraftAttOrigFileName: function(idx, idx2) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的原始附件檔名, 超出範圍");
			if(idx2 < 0 || idx2 >= _drafts[idx].atts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的第" + idx2 + "個原始附件檔名, 超出範圍");
			var id = _drafts[idx].atts[idx2].id;
			for(var i=0; i<_attachs.length; i++) {
				if(_attachs[i].id == id) {
					//2016.11.11	Leslie	增加處理新增的附件檔案，回傳正確的origFileName
					if(_attachs[i].origFileName.match(/^blob:/)){
						theLogger.debug("getDraftAttOrigFileName(" + idx + "," + idx2 + ") = '" + _attachs[i].origFileName + "'");
						return _attachs[i].origFileName;
					}
					var l = _dirPath.lastIndexOf('\\');	// 2016.2.1 文稿管理檔會有多筆, 須依下載子目錄區分不同暫存物件
					if(l < 0)
						throw new Error("傳入的文稿管理檔下載路徑(" + _dirPath + ")無'\\'!");
					theLogger.debug("getDraftAttOrigFileName(" + idx + "," + idx2 + ") = '" + _dirPath.substring(l+1) + "\\" + _attachs[i].origFileName + "'");
					return _dirPath.substring(l+1) + "\\" + _attachs[i].origFileName;
				}
			}
			theLogger.error("找不到id:" + id + "的附件名");
			return null;
		},
		// 2016.7.15 取得附件GUID
		getDraftAttGUID: function(idx, idx2) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的附件GUID, 超出範圍");
			if(idx2 < 0 || idx2 >= _drafts[idx].atts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的第" + idx2 + "個附件GUID, 超出範圍");
			var id = _drafts[idx].atts[idx2].id;
			for(var i=0; i<_attachs.length; i++) {
				if(_attachs[i].id == id) {
					theLogger.debug("getDraftAttGUID(" + idx + "," + idx2 + ") = " + _attachs[i].guid);
					return _attachs[i].guid;
				}
			}
			theLogger.error("找不到id:" + id + "的附件名");
			return null;
		},
		// 2016.7.19 取得附件hash
		getDraftAttHash: function(idx, idx2) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的附件hash, 超出範圍");
			if(idx2 < 0 || idx2 >= _drafts[idx].atts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的第" + idx2 + "個附件hash, 超出範圍");
			var id = _drafts[idx].atts[idx2].id;
			for(var i=0; i<_attachs.length; i++) {
				if(_attachs[i].id == id) {
					theLogger.debug("getDraftAttHash(" + idx + "," + idx2 + ") = " + _attachs[i].hash);	// 1061017 fix typo
					return _attachs[i].hash;
				}
			}
			theLogger.error("找不到id:" + id + "的附件名");
			return null;
		},
		// 2016.12.2	Leslie	取得附件附加時是否已取號
		getDraftAttHasDocNo: function(idx, idx2) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的附件的hasDocNo, 超出範圍");
			if(idx2 < 0 || idx2 >= _drafts[idx].atts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的第" + idx2 + "個附件的hasDocNo, 超出範圍");
			var id = _drafts[idx].atts[idx2].id;
			for(var i=0; i<_attachs.length; i++) {
				if(_attachs[i].id == id) {
					theLogger.debug("getDraftAttHasDocNo(" + idx + "," + idx2 + ") = " + _attachs[i].hasDocNo);	// 1061017 fix typo
					return _attachs[i].hasDocNo;
				}
			}
			theLogger.error("找不到id:" + id + "的附件名");
			return null;
		},
		// 2016.7.12 清除附件
		removeDraftAtt: function(idx) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿以清除附件, 超出範圍");
			theLogger.debug("removeDraftAtt(" + idx + ")");
			if(!_readWrite) {
				theLogger.error("唯讀文稿管理檔不可執行清除附件!");
			}
			else {
				for(var i=0; i<_drafts[idx].atts.length; i++) {
					for(var j=0; j<_attachs.length; j++) {
						if(_drafts[idx].atts[i].id == _attachs[j].id) {
							_model.removeAtt(_drafts[idx], _attachs[j]);	// 2016.9.12 若是線上簽核, 刪除附件應同步異動封裝檔
							_attachs.splice(j, 1);	// 清除附件
							break;
						}
					}
				}
				if(_drafts[idx].atts.length > 0) {	// 若原本已有附件, 則清空時要設dirty, 2016.11.18 bugfix
					_dirty = true;
					// 1120915 Raymond 1120574 新增記錄最後異動時間
					var dt = Util.now();
					_lastModifyTime = Util.padLeft(dt.getYear() - 11, 3) + Util.padLeft(dt.getMonth() + 1, 2) + Util.padLeft(dt.getDate(), 2) + Util.padLeft(dt.getHours(), 2) + Util.padLeft(dt.getMinutes(), 2) + Util.padLeft(dt.getSeconds(), 2);
				}
				_drafts[idx].atts.length = 0;	// 清除附件REF
			}
		},
		// 2016.7.7 新增附件
		newDraftAtt: function(idx, obj, na) {
			//alert("新增附件 '" + path + "'");
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿以新增附件, 超出範圍");
			theLogger.debug("DraftMgmt.newDraftAtt(" + idx + "):");
			theLogger.debug(obj);
			if(!_readWrite) {
				theLogger.error("唯讀文稿管理檔不可執行新增附件!");
			}
			else {
				// 1110317 Raymond 1101578 新增記錄最後異動時間, 以加入附件時間為預設的最後異動時間
				var dt = Util.now();
				//var timeStr = (dt.getYear() + 1900) + "/" + (dt.getMonth() + 1) + "/" + dt.getDate() + " " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
				var timeStr = Util.padLeft(dt.getYear() - 11, 3) + Util.padLeft(dt.getMonth() + 1, 2) + Util.padLeft(dt.getDate(), 2) + Util.padLeft(dt.getHours(), 2) + Util.padLeft(dt.getMinutes(), 2);	// 1110408 Raymond 1101578 時間格式改為年月日時分共11碼數字
				var ownUser = _model.getOwnUserName();
				var ownRole = _model.getOwnRoleName();
				
				_lastAttSN++;
				var att = {id: _lastAttSN};
				_drafts[idx].atts.push(att);
				_attachs.push({
					id: att.id,
					name: obj.name,
					desc: obj.desc,
					fileName: obj.fileName,
					origFileName: obj.origFileName,
					guid: obj.guid || Util.genGUID(),
					hash: obj.hash,
					hasDocNo: obj.hasDocNo	// 2016.12.2	Leslie	新增紀錄各附件加入時，是否有文號資訊(同一份草稿可能在取號前、後分別加入附件)
					,isBW: obj.isBW			// 1060901	Leslie[1060683]	新增傳入匯出設定
					,ndAtt: na				// 1061117 Raymond 1061118 新增傳入文稿檔內新增的附件檔名節點
					,cusName: obj.cusName	// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
					,lastModifiedSN: (!!obj.lastModifiedSN && obj.lastModifiedSN.length > 0)?obj.lastModifiedSN:_editSN	// 1110317 Raymond 1101578 新增記錄最後異動階段序號, 1110408 Raymond 1101578 若有傳入最後異動階段序號則沿用
					,lastModifiedTime: (!!obj.lastModifiedTime && obj.lastModifiedTime.length > 0)?obj.lastModifiedTime:timeStr	// 1110317 Raymond 1101578 新增記錄最後異動時間, 1110408 Raymond 1101578 若有傳入最後異動時間則沿用
					,lastModifiedUser: (!!obj.lastModifiedUser && obj.lastModifiedUser.length > 0)?obj.lastModifiedUser:ownUser	// 1110317 Raymond 1101578 新增記錄最後異動人員姓名, 1110408 Raymond 1101578 若有傳入最後異動人員姓名則沿用
					,lastModifiedRole: (!!obj.lastModifiedRole && obj.lastModifiedRole.length > 0)?obj.lastModifiedRole:ownRole	// 1110317 Raymond 1101578 新增記錄最後異動人員角色, 1110408 Raymond 1101578 若有傳入最後異動人員角色則沿用
				});
				_dirty = true;	// 新增附件要設dirty
				// 1120915 Raymond 1120574 新增記錄最後異動時間
				_lastModifyTime = Util.padLeft(dt.getYear() - 11, 3) + Util.padLeft(dt.getMonth() + 1, 2) + Util.padLeft(dt.getDate(), 2) + Util.padLeft(dt.getHours(), 2) + Util.padLeft(dt.getMinutes(), 2) + Util.padLeft(dt.getSeconds(), 2);
				_model.newAtt(_drafts[idx], _attachs[_attachs.length-1], _dirPath, obj.attIdx);	// 2016.7.14 若是線上簽核, 新增附件應同步異動封裝檔, 2016.9.22 新增第3參數文稿附件應上傳的路徑, 2016.11.7 新增attIdx附件序
			}
		},
		// 2016.9.12 新增結束附件清單增刪作業
		commitAttachFiles: function(idx) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿以新增附件, 超出範圍");
			theLogger.debug("DraftMgmt.commitAttachFiles(" + idx + ")");
			if(!_readWrite) {
				theLogger.error("唯讀文稿管理檔不可執行新增附件!");
			}
			else {
				_model.commitAttachFiles(_drafts[idx]);
			}
		},
		// 2016.7.12 儲存附件、分繕表等電子檔
		saveDraftAtts: function(idx, options) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿以儲存附件, 超出範圍");
			theLogger.debug("saveDraftAtts(" + idx + ")");
			if(!_readWrite) {
				theLogger.error("唯讀文稿管理檔不可執行儲存附件!");
			}
			else if(options != undefined && $.isFunction(options.success) && $.isFunction(options.rename)) {
				for(var i=0; i<_drafts[idx].atts.length; i++) {
					for(var j=0; j<_attachs.length; j++) {
						if(_drafts[idx].atts[i].id == _attachs[j].id) {
							if(_attachs[j].fileName == _attachs[j].origFileName) {
								// 2016.12.2	Leslie	新增判斷本次操作有取號時，應針對原本在未取號前的附件，進行搬移作業
								if(_RequestDocNoFlag && !_attachs[j].hasDocNo){	//2016.12.6	Leslie	不論是否匯出附件，都有可能在要號前即上傳附件，取消"enableConvertAttPage"判斷
									options.moveDraftAtt(idx, _attachs[j].name, _dirPath, _attachs[j].fileName, _attachs[j].origFileName);
								}
								else{
									//1120509	Leslie[1110513]	儲存時，補上檢核附件是否存在正確位置
									options.success(idx, _attachs[j].name, _dirPath, _attachs[j].fileName, _attachs[j].origFileName, _attachs[j].hasDocNo)
									//theLogger.log("附件檔名未異動, 不需上傳");
									theLogger.log(`附件檔名[${_attachs[j].fileName}-${_attachs[j].hasDocNo}]未異動, 不需上傳`);
								}
							}
							else if(_attachs[j].origFileName.match(/^\d{4}\-\d+/)) {
								//options.rename(idx, _attachs[j].name, _dirPath, _attachs[j].fileName, _attachs[j].origFileName, _attachs[j].hasDocNo, _attachs[j].id);	//2016.12.6	Leslie	增加傳入目前附件在附加時，是否已取號	//2016.12.7	Leslie	增加傳入目前附件的idx	//2016.12.13	Leslie	修正附件索引錯誤，改用id去對應，i→_attachs[j].id
								options.rename(idx, _attachs[j].name, _dirPath, _attachs[j].fileName, _attachs[j].origFileName, _attachs[j].hasDocNo, _attachs[j].id, _attachs[j].guid);	//2017.2.17	Leslie	太長改到下一行，增加傳入guid以便給Signfolder裡的attach集合去比對
							}
							else{
								options.success(idx, _attachs[j].name, _dirPath, _attachs[j].fileName, _attachs[j].origFileName, _attachs[j].hasDocNo);	// 2016.12.2	Leslie	增加傳入目前附件在附加時，是否已取號
							}
							if(_RequestDocNoFlag && !_attachs[j].hasDocNo)	//2016.12.7	Leslie	取號後，儲存時更新附件的附加狀態→已取號
								_attachs[j].hasDocNo = true;
							break;
						}
					}
				}
			}
			else
				theLogger.error("options參數不正確!");
		},
		docNoChanged: function(requested) {	// 2016.8.26 新增requested參數, 標示異動的文號是否為線上取得
			if(theAOL.docObj.docNo.length > 0) {
				if(_folioInfo.docNo != theAOL.docObj.docNo) {
					_folioInfo.docNo = theAOL.docObj.docNo;
					_folioInfo.requested = (requested)?"1":"0";	// 2016.8.26 照舊版寫1或0
				}
				
				if(_dirPath.match(/\\00\-99$/)) {	// 草稿路徑
					var old = _dirPath;
					_dirPath = _dirPath.replace(/\\00\-99$/, "\\" + theAOL.docObj.docNo + "-00-99");
					theLogger.log("文號異動, 文稿管理檔儲存路徑配合由'" + old + "'更改為'" + _dirPath + "'");
					_dirty = true;	// 2016.8.12 改變文號須重新儲存
					// 1120915 Raymond 1120574 新增記錄最後異動時間
					var dt = Util.now();
					_lastModifyTime = Util.padLeft(dt.getYear() - 11, 3) + Util.padLeft(dt.getMonth() + 1, 2) + Util.padLeft(dt.getDate(), 2) + Util.padLeft(dt.getHours(), 2) + Util.padLeft(dt.getMinutes(), 2) + Util.padLeft(dt.getSeconds(), 2);
					_RequestDocNoFlag = true;	// 2016.12.2	Leslie	新增變數以紀錄是否本次操作過程中有取號
				}
				return _dirPath;
			}
		},
		isDocNoRequested: function() {	// 2016.8.26 新增查詢文號是否為線上取得
			return _folioInfo.requested == "1";
		},
		calcQuantity: function() {	// 2016.9.5 新增計算數量
			var res = 0;
			// TODO: 紙本計算頁數?
			return res;
		},
		// 2016.10.4 新增可否刪除文稿
		isDraftDeletable: function(index) {
			var dfd = $.Deferred();
			if(!_readWrite) {
				return false;
			}
			else if(index >= 0 && index < _drafts.length) {
				var d = _drafts[index],
					docObj = _model.getDocObj();	// 1140820 Raymond 1140818 docObj宣告在if前
				if(d.createSN == _editSN) {
					theLogger.log("同一階段(流程點)新增的文稿可以刪除");
					return true;
				}
				// 1141003 Raymond 1140818 DocView模組開啟公文時, 不要進行北榮邏輯判斷文稿是否禁止刪除
				// 1140821 Raymond 1140818 新增當環境變數「AOL_DISABLE_CHANGE_DRAFT_CONTENT」為"Y"且為線上簽核時, 以北榮3條件決定可否刪除文稿
				//else if(theSSO.User.EnvSettings.get("AOL_DISABLE_CHANGE_DRAFT_CONTENT") == "Y" && _model.getSignType() == "E" &&
				else if($("#leftPart").closest("#viewDoc").length == 0 && theSSO.User.EnvSettings.get("AOL_DISABLE_CHANGE_DRAFT_CONTENT") == "Y" && _model.getSignType() == "E" &&
					!(docObj.get("ODWMSG", "OWN_OU_ID").substr(0, 2) == docObj.get("ODWMSG", "INCHARGE_OU").substr(0, 2) && _model.isConUnit())) {	// 排除內會情況
					let closeTypeSendDraftTypes = theSSO.User.EnvSettings.get("SSO_CLOSE_TYPE_SEND_DRAFTTYPE").split(";");
					// 條件3.核決後,流程點位於承辦單位承辦人或總發時
					if((!!docObj.get("ODWMSG", "APP_USER_ID") || !!docObj.get("ODWMSG", "APP_ROLE_ID")) &&
						((docObj.get("ODWMSG", "OWN_OU_ID") == docObj.get("ODWMSG", "INCHARGE_OU") && docObj.get("ODWMSG", "OWN_USER_ID") == docObj.get("ODWMSG", "IC_USER_ID")) ||
						docObj.get("ODWMSG", "OWN_OU_ID") == "92")) {
						if(closeTypeSendDraftTypes.indexOf(_drafts[index].docType) >= 0) {	// 可發文文別允許刪除
							theLogger.log("[北榮禁止刪除文稿邏輯] 已核決線上簽核公文, 在" + ((docObj.get("ODWMSG", "OWN_OU_ID") == "92")?"總發":"承辦單位承辦人") + "流程點, '" + _drafts[index].docType + "'為可發文文別 - 禁止刪除稿件");
							return false;
						}
						else {	// 不可發文文別禁止刪除
							theLogger.log("[北榮禁止刪除文稿邏輯] 已核決線上簽核公文, 在" + ((docObj.get("ODWMSG", "OWN_OU_ID") == "92")?"總發":"承辦單位承辦人") + "流程點, '" + _drafts[index].docType + "'為不可發文文別 - 禁止刪除稿件");
							return false;
						}
					}
					// 條件2.未核決時,流程點位於承辦同一級單位任一流程點
					else if(!docObj.get("ODWMSG", "APP_USER_ID") && !docObj.get("ODWMSG", "APP_ROLE_ID") &&
						docObj.get("ODWMSG", "OWN_OU_ID").substr(0, 2) == docObj.get("ODWMSG", "INCHARGE_OU").substr(0, 2)) {
						if(closeTypeSendDraftTypes.indexOf(_drafts[index].docType) >= 0) {	// 可發文文別允許刪除
							// 1141224 Raymond 北榮序469 未核決的可發文文別文稿可刪除
							//theLogger.log("[北榮禁止刪除文稿邏輯] 未核決線上簽核公文, 在承辦單位流程點, '" + _drafts[index].docType + "'為可發文文別 - 禁止刪除稿件");
							//return false;
							theLogger.log("[北榮禁止刪除文稿邏輯V5] 未核決線上簽核公文, 在承辦單位流程點, '" + _drafts[index].docType + "'為可發文文別 - 允許刪除稿件");
							return true;
						}
						else {	// 不可發文文別出過組室禁止刪除, 未出過組室則允許刪除
							let createMsgId = parseInt(_tcSess[d.createSN].msgId),	// 1141117 Raymond 北榮序374 修正createSN->d.createSN
								// 1141124 Raymond 1140818 改用getDocToDoList2取得流程, 以避免多機關架構下, 創稿取的文號剛好是別的機關已存在的文號, 而取到錯誤的流程清單, 導致誤判為不可刪除的問題
								//docToDoList = SSOUtil.getDocToDoList(docObj.docNo, htmlencode(localStorage.Artifact));
								docToDoList = SSOUtil.getDocToDoList2(docObj.sourceOrgNo, docObj.docNo, htmlencode(localStorage.Artifact));
							// 1141117 Raymond 北榮序374 修正出組室後退回原承辦人時, TodoList最後一個流程點是"已送出"資料夾, MsgId會大於承辦人流程點, 若承辦人在此流程點新增非可發文文別的稿件時, 會無法刪除的問題
							let fldrSubmit = theSSO.User.EnvSettings.get("FOLDER_SUBMIT"),		// 已送出
								fldrDiscuss = theSSO.User.EnvSettings.get("FOLDER_DISCUSS");	// 會核中
							for(let i=docToDoList.length-1; i>=0; i--) {	// 從後向前搜尋
								// 1141117 Raymond 北榮序374 修正出組室後退回原承辦人時, TodoList最後一個流程點是"已送出"資料夾, MsgId會大於承辦人流程點, 若承辦人在此流程點新增非可發文文別的稿件時, 會無法刪除的問題
								//if(docToDoList[i].ownOUId.substr(0, 2) != docObj.get("ODWMSG", "OWN_OU_ID").substr(0, 2)) {	// 單位前2碼與承辦單位前2碼不同
								if(docToDoList[i].folder != fldrSubmit && docToDoList[i].folder != fldrDiscuss && docToDoList[i].folder != "通知" && docToDoList[i].ownOUId.substr(0, 2) != docObj.get("ODWMSG", "OWN_OU_ID").substr(0, 2)) {	// 單位前2碼與承辦單位前2碼不同
									if(createMsgId < docToDoList[i].msgId) {
										theLogger.log("[北榮禁止異動文稿邏輯] 未核決線上簽核公文, 在承辦單位流程點, '" + _drafts[index].docType + "'為不可發文文別且已出過組室(新增時msgId:" + createMsgId + "小於最後一個非承辦單位MsgID:" + docToDoList[i].msgId + ") - 禁止刪除稿件");	// 1141117 Raymond 北榮序374 修正idx->index
										return false;
									}
								}
							}
							theLogger.log("[北榮禁止異動文稿邏輯] 未核決線上簽核公文, 在承辦單位流程點, '" + _drafts[index].docType + "'為不可發文文別但新增後未出組室 - 允許刪除稿件");	// 1141117 Raymond 北榮序374 修正idx->index
							return true;
						}
					}
					// 條件1,流程點位於非承辦同一級單位亦非總發
					else if(docObj.get("ODWMSG", "OWN_OU_ID").substr(0, 2) != docObj.get("ODWMSG", "INCHARGE_OU").substr(0, 2) &&
						docObj.get("ODWMSG", "OWN_OU_ID") != "92") {
						theLogger.log("[北榮禁止刪除文稿邏輯] 線上簽核公文, 在非承辦一級單位亦非總發流程點(OWN_OU_ID:" + docObj.get("ODWMSG", "OWN_OU_ID") + ") - 禁止刪除稿件");
						return false;
					}
					theLogger.log("[北榮禁止刪除文稿邏輯] 線上簽核公文, 在流程點(OWN_OU_ID:" + docObj.get("ODWMSG", "OWN_OU_ID") + ") - 允許刪除稿件");
					return true;
				}
				// 1110624 Raymond 1110548 新增核決後公文以環境變數「WE_ALLOW_DEL_DRAFT_CONDITION」設定決定是否允許刪除文稿
				else if(theSSO.User.EnvSettings.get("WE_ALLOW_DEL_DRAFT_CONDITION").length > 0 && !!docObj.get("ODWMSG", "APP_USER_ID") && docObj.get("ODWMSG", "APP_USER_ID").length > 0) {
					var delDraftConds = theSSO.User.EnvSettings.get("WE_ALLOW_DEL_DRAFT_CONDITION").split("|");
					if(docObj.get("ODWMSG", "SECRETE") < 2) {	// 普通件
						theLogger.log("已核決公文, 公文基資的密等為普通件, 依環境變數「WE_ALLOW_DEL_DRAFT_CONDITION」設定, " + ((delDraftConds[0] == "Y")?"允許":"禁止") + "刪除文稿");
						return delDraftConds[0] == "Y";
					}
					else {	// 密件
						theLogger.log("已核決公文, 公文基資的密等為密件, 依環境變數「WE_ALLOW_DEL_DRAFT_CONDITION」設定, " + ((delDraftConds[1] == "Y")?"允許":"禁止") + "刪除文稿");
						return delDraftConds[1] == "Y";
					}
				}
				// 1100419 Raymond 1080767 合併內政部1070530並新增判斷系統參數"CHECK_CLOSEDDRAFT_EDIT"為"Y"時, 結案前新增的文稿不可異動、刪除
				else if(theSSO.User.SystemSets.get("CHECK_CLOSEDDRAFT_EDIT") == "Y" && this.isClosedDraftCrSN(d.createSN)) {
					// 符合特定資料夾時, 允許編輯
					if(this.isClosedDraftCanEditFolder()) {
						theLogger.log("結案前新增的文稿, 但符合可編輯資料夾設定, 可刪除");
						return true;
					}
					theLogger.log("結案前新增的文稿, 不可刪除");
					return false;
				}
				else {	// 非同一階段(流程點)新增的文稿要判斷是否為同一人所新增
					if(_tcSess[d.createSN].name == _tcSess[_editSN].name) {
						theLogger.log("同一人所新增的文稿即使在不同流程點亦可刪除");	// 2016.10.28 直接刪除
						return true;
						//theLogger.warn("目前不支援標記刪除文稿");
						//return false;
					}
					// 1090310 Raymond 1081106 客委會需求非承辦人不要提供「刪除稿件」功能
					else if(theUserInfo.OrgNickName == "HAC") {
						theLogger.warn("[客委會]非此階段(流程點)及非本人所新增的文稿不可刪除");
						// 1100629 Raymond 1100726 新增同userId的階段所新增的文稿可刪除, 代理時因userId記錄的是被代理人的ownUserId, 故代理人及被代理人的userId會是一致的
						if(_tcSess[d.createSN].userId == _tcSess[_editSN].userId) {
							theLogger.warn("[客委會]但代理人與被代理人可互刪對方所新增的文稿");
							return true;
						}
						return false;
					}
					else {
						//theLogger.warn("非此階段(流程點)使用者所新增的文稿不可刪除");
						theLogger.log("非此階段(流程點)及非本人所新增的文稿確認後可刪除");	// 2016.10.28 非同一人新增的文稿改為詢問確定刪除
						return true;
					}
				}
			}
			else {
				theLogger.error("指定索引值:" + index + ", 超出範圍, 無法判斷可否刪除文稿");
			}
			return false;
		},
		// 1111021 Raymond 1110885 新增第2參數skipPrompt, 若傳入true, 則表示不要提示確認刪除的警告訊息
		// 2016.10.4 新增刪除文稿
		//deleteDraft: function(index) {
		deleteDraft: function(index, skipPrompt) {
			var dfd = $.Deferred();
			if(!_readWrite) {
				theLogger.error("唯讀文稿管理檔不可執行刪除文稿!");
				return false;
			}
			else if(index >= 0 && index < _drafts.length) {
				var d = _drafts[index];
				if(d.createSN == _editSN) {
					theLogger.warn("刪除同一階段(流程點)新增的文稿");
					// 1111021 Raymond 1110885 新增若傳入第2參數skipPrompt為true, 則不要提示確認刪除訊息
					// 1090813 Raymond 1090589 台南護專需求所有刪除文稿都要提問確認刪除訊息, 且為共通邏輯
					// 1090310 Raymond 1081106 客委會需求承辦人刪除稿件也要提問確認刪除訊息
					//if(theUserInfo.OrgNickName != "HAC" || confirm("確定要刪除「" + d.name + "」嗎？")) {
					//if(confirm("確定要刪除此文稿「" + d.name + "」？")) {
					if(skipPrompt == true || confirm("確定要刪除此文稿「" + d.name + "」？")) {
					for(var i=0; i<d.atts.length; i++) {	// 2016.11.30 依附件REF清除附件
						for(var j=0; j<_attachs.length; j++) {
							if(d.atts[i].id == _attachs[j].id) {
								_attachs.splice(j, 1);	// 清除附件
							}
						}
					}
					_drafts.splice(index, 1);
					for(var i=index; i<_drafts.length; i++) {
						if(_drafts[i].dm)
							_drafts[i].dm.reduceIndex();
					}
					_dirty = true;	// 刪除文稿要設dirty
					// 1120915 Raymond 1120574 新增記錄最後異動時間
					var dt = Util.now();
					_lastModifyTime = Util.padLeft(dt.getYear() - 11, 3) + Util.padLeft(dt.getMonth() + 1, 2) + Util.padLeft(dt.getDate(), 2) + Util.padLeft(dt.getHours(), 2) + Util.padLeft(dt.getMinutes(), 2) + Util.padLeft(dt.getSeconds(), 2);
					_draftListChanged = true;	// 1080531 Raymond 1080433 新增文稿使文稿清單變成已異動
					_lastModifyDraftListSN = _editSN;	// 1110322 Raymond 1101416 新增記錄最後異動文稿清單(新增、刪除稿件、調整稿序)的階段序號
					return true;
					}
					else	// 1090813 Raymond 1090589 新增記錄使用者取消刪除動作
						theLogger.log("使用者取消刪除動作");
				}
				else {	// 非同一階段(流程點)新增的文稿要判斷是否為同一人所新增
					if(_tcSess[d.createSN].name == _tcSess[_editSN].name) {	// 2016.10.28 使用者可刪除自己在不同流程點所新增的文稿
						theLogger.warn("刪除同一人在不同流程點所新增的文稿");
						// 1111021 Raymond 1110885 新增若傳入第2參數skipPrompt為true, 則不要提示確認刪除訊息
						// 1090813 Raymond 1090589 台南護專需求所有刪除文稿都要提問確認刪除訊息, 且為共通邏輯
						// 1090310 Raymond 1081106 客委會需求承辦人刪除稿件也要提問確認刪除訊息
						//if(theUserInfo.OrgNickName != "HAC" || confirm("確定要刪除「" + d.name + "」嗎？")) {
						//if(confirm("確定要刪除此文稿「" + d.name + "」？")) {
						if(skipPrompt == true || confirm("確定要刪除此文稿「" + d.name + "」？")) {
						for(var i=0; i<d.atts.length; i++) {	// 2016.11.30 依附件REF清除附件
							for(var j=0; j<_attachs.length; j++) {
								if(d.atts[i].id == _attachs[j].id) {
									_attachs.splice(j, 1);	// 清除附件
								}
							}
						}
						_drafts.splice(index, 1);
						for(var i=index; i<_drafts.length; i++) {
							if(_drafts[i].dm)
								_drafts[i].dm.reduceIndex();
						}
						_dirty = true;	// 刪除文稿要設dirty
						// 1120915 Raymond 1120574 新增記錄最後異動時間
						var dt = Util.now();
						_lastModifyTime = Util.padLeft(dt.getYear() - 11, 3) + Util.padLeft(dt.getMonth() + 1, 2) + Util.padLeft(dt.getDate(), 2) + Util.padLeft(dt.getHours(), 2) + Util.padLeft(dt.getMinutes(), 2) + Util.padLeft(dt.getSeconds(), 2);
						_draftListChanged = true;	// 1080531 Raymond 1080433 新增文稿使文稿清單變成已異動
						_lastModifyDraftListSN = _editSN;	// 1110322 Raymond 1101416 新增記錄最後異動文稿清單(新增、刪除稿件、調整稿序)的階段序號
						return true;
						//theLogger.warn("目前不支援標記刪除文稿");
						//return false;
						}
						else	// 1090813 Raymond 1090589 新增記錄使用者取消刪除動作
							theLogger.log("使用者取消刪除動作");
					}
					else {
						theLogger.warn("此文稿為不同人在不同流程點所新增, 詢問是否確定要刪除")
						// 1111021 Raymond 1110885 新增若傳入第2參數skipPrompt為true, 則不要提示確認刪除訊息
						//if(confirm("確定要刪除此文稿「" + d.name + "」？")) {
						if(skipPrompt == true || confirm("確定要刪除此文稿「" + d.name + "」？")) {
							theLogger.warn("使用者確認要刪除, 刪除不同人在不同流程點所新增的文稿");	// 2016.10.28 新增使用者刪除不同人所新增的文稿
							for(var i=0; i<d.atts.length; i++) {	// 2016.11.30 依附件REF清除附件
								for(var j=0; j<_attachs.length; j++) {
									if(d.atts[i].id == _attachs[j].id) {
										_attachs.splice(j, 1);	// 清除附件
									}
								}
							}
							_drafts.splice(index, 1);
							for(var i=index; i<_drafts.length; i++) {
								if(_drafts[i].dm)
									_drafts[i].dm.reduceIndex();
							}
							_dirty = true;	// 刪除文稿要設dirty
							// 1120915 Raymond 1120574 新增記錄最後異動時間
							var dt = Util.now();
							_lastModifyTime = Util.padLeft(dt.getYear() - 11, 3) + Util.padLeft(dt.getMonth() + 1, 2) + Util.padLeft(dt.getDate(), 2) + Util.padLeft(dt.getHours(), 2) + Util.padLeft(dt.getMinutes(), 2) + Util.padLeft(dt.getSeconds(), 2);
							_draftListChanged = true;	// 1080531 Raymond 1080433 新增文稿使文稿清單變成已異動
							_lastModifyDraftListSN = _editSN;	// 1110322 Raymond 1101416 新增記錄最後異動文稿清單(新增、刪除稿件、調整稿序)的階段序號
							return true;
						}
						else
							theLogger.log("使用者取消刪除動作");
						//theLogger.error("非此階段(流程點)使用者所新增的文稿不可刪除");
						//return false;
					}
				}
			}
			else {
				theLogger.error("指定索引值:" + index + ", 超出範圍, 無法刪除文稿");
			}
			return false;
		},
		// 2016.10.21 調整稿序
		adjustOrder: function(param) {
			theLogger.log("adjustOrder()");
			theLogger.log(param);
			var tmp = [];
			for(var i=0; i<_drafts.length; i++) {
				tmp[i] = _drafts[i];
			}
			_drafts.length = 0;	// clear current list
			for(var i=0; i<param.length; i++) {
				// 1070620 Raymond 1070547 因線上簽核多了會辦單位新增的文稿, 故順序數量跟各主會辦子目錄的文稿不一致, 改用origMgmtIdx做為DraftMgmt的排序依據
				// 2016.11.18 新增支援更名
				if("rename" in param[i] && typeof param[i].rename === "string") {
					if(param[i].rename.length)
						//theLogger.log(i + ": origIdx:" + param[i].origIdx + " '" + param[i].name + "'更名為'" + param[i].rename + "'");
						theLogger.log(i + ": origMgmtIdx:" + param[i].origMgmtIdx + " '" + param[i].name + "'更名為'" + param[i].rename + "'");
					else
						//theLogger.warn(i + ": origIdx:" + param[i].origIdx + " '" + param[i].name + "', 指定更名為空字串, 故不更名");
						theLogger.warn(i + ": origMgmtIdx:" + param[i].origMgmtIdx + " '" + param[i].name + "', 指定更名為空字串, 故不更名");
				}
				else
					//theLogger.log(i + ": origIdx:" + param[i].origIdx + " '" + param[i].name + "'");
					theLogger.log(i + ": origMgmtIdx:" + param[i].origMgmtIdx + " '" + param[i].name + "'");
				//_drafts.push(tmp[param[i].origIdx]);
				_drafts.push(tmp[param[i].origMgmtIdx]);
				
				// 2016.11.18 新增支援更名
				if("rename" in param[i] && typeof param[i].rename === "string" && param[i].rename.length) {
					// 1071226 Raymond 判斷更名後稿序名稱是否與原稿序名稱不同, 避免紙本調整稿序名稱時未重新整理頁面
					if(_drafts[_drafts.length - 1].name != param[i].rename) {
						_drafts[_drafts.length - 1].nameChanged = true;	// 設定稿序名稱異動旗標
						_drafts[_drafts.length - 1].name = param[i].rename;
					}
				}
			}
			for(var i=0; i<_drafts.length; i++) {
				if(_drafts[i].dm)
					_drafts[i].dm.resetIndex(i);
			}
			_dirty = true;	// 調整稿序要設dirty
			// 1120915 Raymond 1120574 新增記錄最後異動時間
			var dt = Util.now();
			_lastModifyTime = Util.padLeft(dt.getYear() - 11, 3) + Util.padLeft(dt.getMonth() + 1, 2) + Util.padLeft(dt.getDate(), 2) + Util.padLeft(dt.getHours(), 2) + Util.padLeft(dt.getMinutes(), 2) + Util.padLeft(dt.getSeconds(), 2);
			_draftListChanged = true;	// 1080531 Raymond 1080433 新增文稿使文稿清單變成已異動
			_lastModifyDraftListSN = _editSN;	// 1110322 Raymond 1101416 新增記錄最後異動文稿清單(新增、刪除稿件、調整稿序)的階段序號
		},
		// 2016.11.3 新增重取稿序名稱
		resetDraftName: function(index, docType, subDocType) {
			if(index >= 0 && index < _drafts.length) {
				// 1121222 Raymond 領務局需求序37 新增判斷OrgNickName為"BOCA"時, 原稿序的「（」前更換為新文別, 「（」後不動, 做為重設的稿序名稱
				if(theUserInfo.OrgNickName == "BOCA") {
					let p = _drafts[index].name.indexOf("（");
					if(p >= 0) {
						if(!!subDocType && (docType == "令" || docType == "函"))	// 令函時以令函類別為稿序名稱
							_drafts[index].name = subDocType + _drafts[index].name.substr(p);
						else	// 非令函時以文別為稿序名稱
							_drafts[index].name = docType + _drafts[index].name.substr(p);
					}
					else {	// 原稿序名稱無「（」可做為取代文別的依據, 改為直接更名為令函類別/文別+「（稿）」
						if(!!subDocType && (docType == "令" || docType == "函"))	// 令函時以令函類別為稿序名稱
							_drafts[index].name = subDocType + "（稿）";
						else	// 非令函時以文別為稿序名稱
							_drafts[index].name = docType + "（稿）";
					}
				}
				else
				_drafts[index].name = _getNewDraftName(docType, subDocType);
				// 1131108 Raymond 勤益序362 修正文別轉換或貼上稿件(置換)後, 只要未翻頁至公文基資, 儲存或傳送的擬辦設定就會保持舊的設定, 不會依據轉換後或貼上後的文別重新設定的問題
				_draftListChanged = true;
				// 2016.11.14 bugfix for 修正文別及函類別
				_drafts[index].docType = docType;
				if(typeof subDocType === "string" && subDocType.length > 0)
					_drafts[index].subDocType = subDocType;
				else if("subDocType" in _drafts[index])
					delete _drafts[index].subDocType;
				_dirty = true;	// 重設稿序名稱要設dirty
				// 1120915 Raymond 1120574 新增記錄最後異動時間
				var dt = Util.now();
				_lastModifyTime = Util.padLeft(dt.getYear() - 11, 3) + Util.padLeft(dt.getMonth() + 1, 2) + Util.padLeft(dt.getDate(), 2) + Util.padLeft(dt.getHours(), 2) + Util.padLeft(dt.getMinutes(), 2) + Util.padLeft(dt.getSeconds(), 2);
				// 2016.11.24 fix for 線上簽核文別轉換 函->開會通知單->函, 署名回不去問題
				_model.resetDraftName(_drafts[index]);
			}
		},
		// 2016.11.18 新增自訂稿序名稱功能(線上簽核更名稿序會叫用)
		setDraftName: function(index, newName) {
			if(index >= 0 && index < _drafts.length) {
				theLogger.log("自訂稿序名稱為'" + newName + "'");
				_drafts[index].nameChanged = _drafts[index].name != newName;	// 2016.11.23 新增稿序名稱異動旗標
				_drafts[index].name = newName;
				_dirty = true;	// 線上簽核自訂稿序名稱要設dirty
				// 1120915 Raymond 1120574 新增記錄最後異動時間
				var dt = Util.now();
				_lastModifyTime = Util.padLeft(dt.getYear() - 11, 3) + Util.padLeft(dt.getMonth() + 1, 2) + Util.padLeft(dt.getDate(), 2) + Util.padLeft(dt.getHours(), 2) + Util.padLeft(dt.getMinutes(), 2) + Util.padLeft(dt.getSeconds(), 2);
			}
		},
		// 2016.11.23 新增稿序名稱異動查詢
		isDraftNameChanged: function() {
			if(arguments.length == 1) {
				var index = arguments[0];
				if(index >= 0 && index < _drafts.length)
					return !!_drafts[index].nameChanged;
			}
			else if(arguments.length == 2) {	// 2016.11.24 新增設值功能
				var index = arguments[0];
				var val = arguments[1];
				theLogger.log("設定稿序名稱變更旗標=" + val);
				if(index >= 0 && index < _drafts.length)
					_drafts[index].nameChanged = val;
			}
		},
		// 2016.12.7	Leslie	附件移動儲存後，應更新指向檔名以避免重覆執行搬移
		reSetAttachOrigFileName: function(id, newOrigFileName){	//2016.12.13	Leslie	改用id去對應，idx→id
			for(var i=0,iMax=_attachs.length;i<iMax;i++)
				if(_attachs[i].id == id)
					_attachs[i].origFileName = newOrigFileName;	//2016.12.13	Leslie	改用id去對應，idx→i
		},
		// 2016.12.16	Leslie	新增檢核附件是否已完成匯出
		isAttRndrFinish: function(dfIdx,attIdx){
			// 1061017 Raymond 1060948+1060962 異動撤消後前一次傳送前所新增文稿順序若與DraftMgmt.xml不一致, 則開啟附件管理子視窗時,
			// 點擊附件會出現錯誤, 因為由DraftMgmt.js叫用此方法時所傳入的是DraftMgmt.xml中的該文稿的index, 與復原後的封裝檔+文稿管理檔
			// 所顯示的index不同, 故此處改傳入該文稿的GUID做為第1個參數, 由FolioModel.js判斷第1個參數若已是GUID則將用getDraftIndex()轉換
			//return _model.isAttConvertFinish(dfIdx,attIdx);
			if(dfIdx < 0 || dfIdx >= _drafts.length)
				throw new Error("無法要求取得第" + dfIdx + "個文稿的GUID, 超出範圍");
			return _model.isAttConvertFinish(_drafts[dfIdx].guid,attIdx);
		},
		// 2017.01.13	Leslie	新增更新"對照表"資訊
		setDraftMailMergeInfo: function(index){
			if(index >= 0 && index < _drafts.length) {
				theLogger.log("設定稿[" + index + "]對照表'");
				if(!("mailmerge" in _drafts[index])){
					_drafts[index].mailmerge = {
						id: ++_lastMailMergeID,
						guid: Util.genGUID()
					}
					_dirty = true;
					// 1120915 Raymond 1120574 新增記錄最後異動時間
					var dt = Util.now();
					_lastModifyTime = Util.padLeft(dt.getYear() - 11, 3) + Util.padLeft(dt.getMonth() + 1, 2) + Util.padLeft(dt.getDate(), 2) + Util.padLeft(dt.getHours(), 2) + Util.padLeft(dt.getMinutes(), 2) + Util.padLeft(dt.getSeconds(), 2);
				}
			}
		},
		// 2017.3.15 新增取得docObj
		getDocObj: function() {
			return _model.getDocObj();
		},
		// 1060620 Raymond 1060147 新增回傳或設定文稿是否為匯入的
		isDraftImported: function(idx, flag) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿是否為匯入, 超出範圍");
			if(typeof flag === "boolean") {	// 設定
				_drafts[idx].isImported = flag;
				// 1111117 Raymond 1111069 新增判斷設定為true時, 標記置換此文稿的追蹤修訂階段, 因為會呼叫DraftModel.isImported(true)方法的目前只有執行「貼上稿件(置換)」才會
				if(flag == true)
					_drafts[idx].lastReplaceSN = _editSN;
			}
			else
				return _drafts[idx].isImported;
		},
		//1070129	Leslie[1061274]	新增取得附件摘要
		getDraftAttDesc: function(idx, idx2) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的附件摘要, 超出範圍");
			if(idx2 < 0 || idx2 >= _drafts[idx].atts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的第" + idx2 + "個附件摘要, 超出範圍");
			var id = _drafts[idx].atts[idx2].id;
			for(var i=0; i<_attachs.length; i++) {
				if(_attachs[i].id == id) {
					theLogger.debug("getDraftAttDesc(" + idx + "," + idx2 + ") = " + _attachs[i].desc);
					// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
					if(_showCustomName && _attachs[i].cusName)
						return _attachs[i].cusName;
					return _attachs[i].desc;
				}
			}
			theLogger.error("找不到id:" + id + "的附件摘要資訊");
			return null;
		},
		// 1070608 Raymond 1070197 新增紙本簽核時取得文稿新增的單位代碼
		getConDraftUnitNo: function(idx) {
			var m = _dirPath.match(/(\d{2})-99$/);
			return RegExp.$1;
		},
		// 1080531 Raymond 1080433 新增取得及設定文稿清單已異動旗標
		draftListChanged: function() {
			if(arguments.length > 0) {	// 有參數表示設定, 無參數則是取得
				if(typeof arguments[0] === "boolean") {
					theLogger.log("設定draftListChanged旗標從" + _draftListChanged + "改為" + arguments[0]);
					_draftListChanged = arguments[0];
				}
				else
					theLogger.error("設定draftListChanged旗標為" + arguments[0] + "錯誤! 參數型別(" + (typeof arguments[0]) + ")異常");
			}
			return _draftListChanged;
		},
		// 1080621 Raymond 1080433 新增取得初始時文稿數
		getOrigDraftCounts: function() {
			return _origDraftCounts;
		},
		// 1090115 Raymond 1081166 新增設定應寫入SignWork.xml之DI文稿檔名
		setECapDraftFileNameAsDI: function(idx, diFileName) {
			if(_model.getSignType() == "E"){	//1060509	Leslie[1060297]	僅線上簽核需設定至SignWork	--END--
				if(idx < 0 || idx >= _drafts.length)
					throw new Error("無法要求取得第" + idx + "個文稿設定應寫入SignWork.xml之DI文稿檔名, 超出範圍");
				var guid = _drafts[idx].guid;
				theLogger.debug("setECapDraftFileNameAsDI(" + idx + ", '" + diFileName + "')...guid:" + guid);
				_model.setECapDraftFileNameAsDI(guid, diFileName);
			}
		},
		// 1090730 Raymond 1090409 新增查詢文稿的函類別
		getDraftSubDocType: function(indexOrGUID) {
			if(typeof indexOrGUID === "string" && indexOrGUID.match(/^\{[0-9a-fA-F\-]*\}/)) {
				for(var i=0; i<_drafts.length; i++) {
					if(indexOrGUID == _drafts[i].guid)
						return _drafts[i].subDocType;
				}
				throw new Error("管理檔中找不到指定GUID為'" + indexOrGUID + "'的文稿");
			}
			else if(indexOrGUID < 0 || indexOrGUID >= _drafts.length)
				throw new Error("要求取得第" + indexOrGUID + "個文稿文別, 超出範圍");
			return _drafts[indexOrGUID].subDocType;
		},
		// 1100323 Raymond 1090857 新增記錄分頁後總頁數在DraftMgmt.xml、及取得的方法
		setLayoutedPages: function(idx, n) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求設定第" + idx + "個文稿分頁後的總頁數, 超出範圍");
			if(n > 0 || !_drafts[idx].pages)
				_drafts[idx].pages = n;
			else if(!!_drafts[idx].pages)
				theLogger.warn("前次記錄第" + idx + "文稿分頁後的總頁數為" + _drafts[idx].pages + ", 此次欲設定為" + n + ", 保險起見不接受此次設定");
		},
		getLayoutedPages: function(idx) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿分頁後的總頁數, 超出範圍");
			return _drafts[idx].pages;
		},
		// 1100419 Raymond 1080767 合併內政部1070530, 新增判斷是否結案前新增文稿, 是則禁止編輯, 供DraftModel叫用
		isClosedDraftCrSN: function(sn) {
			var _docObj = _model.getDocObj();
			// 1070608 Raymond 修正調閱時_docObj有ODWDCM但卻是null, 導致發生Exception的問題
			//if("ODWDCM" in _docObj && "CLOSE_MSG_ID" in _docObj.ODWDCM && _docObj.ODWDCM.CLOSE_MSG_ID.length > 0) {
			if("ODWDCM" in _docObj && !!_docObj.ODWDCM && "CLOSE_MSG_ID" in _docObj.ODWDCM && _docObj.ODWDCM.CLOSE_MSG_ID.length > 0) {
				if(_docObj.ODWDCM.CLOSE_MSG_ID == _docObj.msgId)	// 排除發文流程點發文後暫存再開啟會被鎖的問題
					return false;
				var sess = this.getTCSess(sn);
				return parseInt(sess.msgId) <= parseInt(_docObj.ODWDCM.CLOSE_MSG_ID);	// 新增文稿的msgId小於發文/結案的msgId就是發文/結案前所新增的文稿
			}
			return false;
		},
		// 1100419 Raymond 1080767 合併內政部1070530, 新增判斷是否結案前新增文稿, 是則禁止編輯, 供FolioModel叫用
		isClosedDraft: function(idx) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿是否已結案, 超出範圍");
			var _docObj = _model.getDocObj();
			// 1070608 Raymond 修正調閱時_docObj有ODWDCM但卻是null, 導致發生Exception的問題
			//if("ODWDCM" in _docObj && "CLOSE_MSG_ID" in _docObj.ODWDCM && _docObj.ODWDCM.CLOSE_MSG_ID.length > 0) {
			if("ODWDCM" in _docObj && !!_docObj.ODWDCM && "CLOSE_MSG_ID" in _docObj.ODWDCM && _docObj.ODWDCM.CLOSE_MSG_ID.length > 0) {
				if(_docObj.ODWDCM.CLOSE_MSG_ID == _docObj.msgId)	// 排除發文流程點發文後暫存再開啟會被鎖的問題
					return false;
				var sess = this.getTCSess(_drafts[idx].createSN);
				return parseInt(sess.msgId) <= parseInt(_docObj.ODWDCM.CLOSE_MSG_ID);	// 新增文稿的msgId小於發文/結案的msgId就是發文/結案前所新增的文稿
			}
			return false;
		},
		// 1100419 Raymond 1080767 合併內政部1070530, 新增回傳指定文稿的GUID
		getDraftGUID: function(idx) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的GUID, 超出範圍");
			return _drafts[idx].guid;
		},
		// 1100419 Raymond 1080767 合併內政部1070530, 符合特定資料夾可允許編輯內文及刪除文稿
		isClosedDraftCanEditFolder: function() {
			var fldrs = theSSO.User.EnvSettings.get("AOL_CLOSEDDRAFT_EDIT_FOLDERS");
			if(fldrs.length > 0) {
				var fdr = _model.getDocObj().ODWMSG.FOLDER + "-" + _model.getDocObj().ODWMSG.SUBFOLDER;
				return (fldrs.indexOf(fdr) >= 0);
			}
			return false;	// 未設定環境變數則都不可異動
		},
		// 1110112 Raymond 1101596 新增回傳紙本公文的分頁後總頁數
		getDraftPageCounts: function(idx) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的分頁後總頁數, 超出範圍");
			return _drafts[idx].pages;
		},
		// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
		getDraftAttInfo: function(idx, idx2) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的附件, 超出範圍");
			if(idx2 < 0 || idx2 >= _drafts[idx].atts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的第" + idx2 + "個附件, 超出範圍");
			var id = _drafts[idx].atts[idx2].id;
			for(var i=0; i<_attachs.length; i++) {
				if(_attachs[i].id == id) {
					theLogger.debug("getDraftAttInfo(" + idx + "," + idx2 + ")");
					return _attachs[i];
				}
			}
			theLogger.error("找不到id:" + id + "的附件資訊");
			return null;
		},
		// 1110316 Raymond 1101578 附件編輯異動後使用者選擇上傳更新附件時, 更新附件資訊及實體資料
		replaceAttachFile: function(idx, idx2, param, blbNm) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的附件, 超出範圍");
			if(idx2 < 0 || idx2 >= _drafts[idx].atts.length)
				throw new Error("無法要求取得第" + idx + "個文稿的第" + idx2 + "個附件, 超出範圍");
			var id = _drafts[idx].atts[idx2].id;
			for(var i=0; i<_attachs.length; i++) {
				if(_attachs[i].id == id) {
					theLogger.debug("replaceAttachFile(" + idx + "," + idx2 + ")");
					/* 暫時先不更新編輯後附件的GUID, 若更新的話, 目前是會有重複下載同一階段的前一次編輯儲存後的附件內容(blob://...)的情形(不知道算不算問題)
					var newGUID = Util.genGUID();
					theLogger.debug("%cGUID%c " + _attachs[i].guid + " %c→%c", "color:blue", "color:black", "color:blue", "color:black", newGUID);	// 比照置換附件更新GUID
					_attachs[i].guid = newGUID;*/
					theLogger.debug("%chash%c " + _attachs[i].hash + " %c→%c", "color:blue", "color:black", "color:blue", "color:black", param.fileHash);	// 更新Hash
					_attachs[i].hash = param.fileHash;
					theLogger.debug("%corigFileName%c " + _attachs[i].origFileName + " %c→%c", "color:blue", "color:black", "color:blue", "color:black", blbNm);	// 更新origFileName
					_attachs[i].origFileName = blbNm;
					_attachs[i].lastModifiedSN = _editSN;					// 記錄最後異動階段序號
					var dt = Util.now();
					//var timeStr = (dt.getYear() + 1900) + "/" + (dt.getMonth() + 1) + "/" + dt.getDate() + " " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
					var timeStr = Util.padLeft(dt.getYear() - 11, 3) + Util.padLeft(dt.getMonth() + 1, 2) + Util.padLeft(dt.getDate(), 2) + Util.padLeft(dt.getHours(), 2) + Util.padLeft(dt.getMinutes(), 2);	// 1110408 Raymond 1101578 時間格式改為年月日時分共11碼數字
					_attachs[i].lastModifiedTime = timeStr;					// 記錄最後異動時間
					_attachs[i].lastModifiedUser = _model.getOwnUserName();	// 記錄最後異動人員姓名
					_attachs[i].lastModifiedRole = _model.getOwnRoleName();	// 記錄最後異動人員角色
					_dirty = true;	// 異動附件Hash要設dirty
					// 1120915 Raymond 1120574 新增記錄最後異動時間
					_lastModifyTime = Util.padLeft(dt.getYear() - 11, 3) + Util.padLeft(dt.getMonth() + 1, 2) + Util.padLeft(dt.getDate(), 2) + Util.padLeft(dt.getHours(), 2) + Util.padLeft(dt.getMinutes(), 2) + Util.padLeft(dt.getSeconds(), 2);
					return true;
				}
			}
			throw new Error("文稿管理檔中找不到第" + idx + "筆文稿的第" + idx2 + "筆附件(id為" + id + ")的附件資訊");
		},
		// 1110408 Raymond 1101578 新增取得目前公文的ICUserName方法, 提供判斷附件是否為非承辦人本人異動
		getICUserName: function() {
			return _model.getICUserName();
		},
		// 1110322 Raymond 1101416 新增判斷文稿清單(新增、刪除稿件、調整稿序)是否異動
		isDraftListModified: function() {
			if(_drafts.length == 0 && !_model.getDocObj().isDraft) {	// 非草稿無任何文稿時, 算未異動
				theLogger.log("非草稿公文未新增任何文稿時, 在本修訂階段(" + _editSN + ")視為未異動");
				return false;
			}
			theLogger.log("文稿清單(新增、刪除稿件、調整稿序)在本修訂階段(" + _editSN + ")" + ((_lastModifyDraftListSN == _editSN)?"已":"未") + "異動");
			return _lastModifyDraftListSN == _editSN;
		},
		// 1110322 Raymond 1101416 新增判斷(任一筆)文稿內文是否異動
		isDraftContextModified: function() {
			for(var i=0; i<_drafts.length; i++) {
				if(!!_drafts[i].lastModifiedSN && _drafts[i].lastModifiedSN == _editSN) {
					theLogger.log("第" + i + "筆文稿內文在本修訂階段(" + _editSN + ")" + ((_drafts[i].lastModifiedSN == _editSN)?"已":"未") + "異動");
					return true;
				}
			}
			return false;
		},
		//1120222	Leslie[1110881]	銓敘部-序14，新增支援紙本草稿轉正式公文，稿件路徑需一併更新
		doNoChangedAfterDraftToMain: function(newDirPath){
			_dirPath = newDirPath;
			theLogger.log("紙本文號異動並轉正式公文, 文稿管理檔儲存路徑配合由'" + _dirPath + "'更改為'" + newDirPath + "'");
		},
		// 1120314 Raymond 1111133 設定來文附件名稱
		setFromDocAttName: function(attIdx, txt) {
			if(!_readWrite)
				throw new Error("此文稿管理檔為不可編輯狀態, 無法提供設定來文附件名稱功能");
			if(!_fromDocAttName[attIdx] || _fromDocAttName[attIdx] != txt) {
				_fromDocAttName[attIdx] = txt;
				_dirty = true;
				// 1120915 Raymond 1120574 新增記錄最後異動時間
				var dt = Util.now();
				_lastModifyTime = Util.padLeft(dt.getYear() - 11, 3) + Util.padLeft(dt.getMonth() + 1, 2) + Util.padLeft(dt.getDate(), 2) + Util.padLeft(dt.getHours(), 2) + Util.padLeft(dt.getMinutes(), 2) + Util.padLeft(dt.getSeconds(), 2);
			}
		},
		// 1120314 Raymond 1111133 取得重新命名過的來文附件名稱
		getFromDocAttName: function(attIdx) {
			return _fromDocAttName[attIdx];
		},
		// 1141218 Raymond 北榮序453 因1140818禁止出組室過的非可發文文別異動內文, 但要對自動增高簽核區域允許異動, 新增purpose參數, 若傳入"forSALP", 則允許異動
		// 1120523 Raymond 1120307 將DraftModel的getEditable判斷移至DraftMgmt, 以避免備份時由於未點開文稿, 而未執行到DraftModel的getEditable判斷, 造成SignWork.xml中漏寫未點開的<文稿>節點, 導致從備份還原後會發生傳送錯誤(代碼713)問題
		//confirmDraftEditable: function(idx) {
		confirmDraftEditable: function(idx, purpose) {
			var docObj = _model.getDocObj();
			var docType = _drafts[idx].docType;		// 指定文稿的文別
			var createSN = _drafts[idx].createSN;	// 指定文稿的新增階段序號
			// 1141027 Raymond 北榮序323 修正開啟併陳公文後點子文時會轉圈圈的問題
			// 1141016 Raymond 北榮序290 修正從檢索側屜開啟線上簽核公文時, 不要進行北榮邏輯判斷文稿是否禁止編輯
			// 1141003 Raymond 1140818 DocView模組開啟公文時, 不要進行北榮邏輯判斷文稿是否禁止編輯
			// 1140812 Raymond 1140818 新增當環境變數「AOL_DISABLE_CHANGE_DRAFT_CONTENT」為"Y"且為線上簽核時, 以北榮3條件決定可否異動文稿
			//if(theSSO.User.EnvSettings.get("AOL_DISABLE_CHANGE_DRAFT_CONTENT") == "Y" && _model.getSignType() == "E" &&
			//if($("#leftPart").closest("#viewDoc").length == 0 && theSSO.User.EnvSettings.get("AOL_DISABLE_CHANGE_DRAFT_CONTENT") == "Y" && _model.getSignType() == "E" &&
			//if($("#leftPart").closest("#viewDoc").length == 0 && !docObj.uiParam.unv_obj && theSSO.User.EnvSettings.get("AOL_DISABLE_CHANGE_DRAFT_CONTENT") == "Y" && _model.getSignType() == "E" &&
			if($("#leftPart").closest("#viewDoc").length == 0 && (!!docObj.uiParam && !docObj.uiParam.unv_obj) && theSSO.User.EnvSettings.get("AOL_DISABLE_CHANGE_DRAFT_CONTENT") == "Y" && _model.getSignType() == "E" &&
				!(docObj.get("ODWMSG", "OWN_OU_ID").substr(0, 2) == docObj.get("ODWMSG", "INCHARGE_OU").substr(0, 2) && _model.isConUnit())) {	// 排除內會情況
				let closeTypeSendDraftTypes = theSSO.User.EnvSettings.get("SSO_CLOSE_TYPE_SEND_DRAFTTYPE").split(";");
				// 條件3.核決後,流程點位於承辦單位承辦人或總發時
				if((!!docObj.get("ODWMSG", "APP_USER_ID") || !!docObj.get("ODWMSG", "APP_ROLE_ID")) &&
					((docObj.get("ODWMSG", "OWN_OU_ID") == docObj.get("ODWMSG", "INCHARGE_OU") && docObj.get("ODWMSG", "OWN_USER_ID") == docObj.get("ODWMSG", "IC_USER_ID")) ||
					docObj.get("ODWMSG", "OWN_OU_ID") == "92")) {
					if(closeTypeSendDraftTypes.indexOf(_drafts[idx].docType) >= 0) {	// 可發文文別允許異動
						theLogger.log("[北榮禁止異動文稿邏輯] 已核決線上簽核公文, 在" + ((docObj.get("ODWMSG", "OWN_OU_ID") == "92")?"總發":"承辦單位承辦人") + "流程點, '" + _drafts[idx].docType + "'為可發文文別 - 允許異動稿件");
						return true;
					}
					// 1141216 Raymond 1141632 修正結案未歸檔的已核決公文, 在後會時因北榮邏輯而不能異動簽稿會核單造成自動新增簽稿會核單功能無法執行的問題
					else if(_drafts[idx].docType == "簽稿會核單") {
						theLogger.log("[北榮禁止異動文稿邏輯例外] 已核決線上簽核公文, 在承辦單位流程點, '" + _drafts[idx].docType + "'為不可發文文別, 但因後會等需求 - 允許異動稿件");
						return true;
					}
					else {	// 不可發文文別禁止異動
						// 1141218 Raymond 北榮序453 因1140818禁止出組室過的非可發文文別異動內文, 但要對自動增高簽核區域允許異動, 新增purpose參數, 若傳入"forSALP", 則允許異動
						if(!!purpose && purpose == "forSALP") {
							theLogger.log("[北榮禁止異動文稿邏輯] 已核決線上簽核公文, 在" + ((docObj.get("ODWMSG", "OWN_OU_ID") == "92")?"總發":"承辦單位承辦人") + "流程點, '" + _drafts[idx].docType + "'為不可發文文別應禁止異動稿件, 但for自動增高簽核區域功能 - 允許異動稿件");
							return true;
						}
						theLogger.log("[北榮禁止異動文稿邏輯] 已核決線上簽核公文, 在" + ((docObj.get("ODWMSG", "OWN_OU_ID") == "92")?"總發":"承辦單位承辦人") + "流程點, '" + _drafts[idx].docType + "'為不可發文文別 - 禁止異動稿件");
						return false;
					}
				}
				// 條件2.未核決時,流程點位於承辦同一級單位任一流程點
				else if(!docObj.get("ODWMSG", "APP_USER_ID") && !docObj.get("ODWMSG", "APP_ROLE_ID") &&
					docObj.get("ODWMSG", "OWN_OU_ID").substr(0, 2) == docObj.get("ODWMSG", "INCHARGE_OU").substr(0, 2)) {
					if(closeTypeSendDraftTypes.indexOf(_drafts[idx].docType) >= 0) {	// 可發文文別允許異動
						theLogger.log("[北榮禁止異動文稿邏輯] 未核決線上簽核公文, 在承辦單位流程點, '" + _drafts[idx].docType + "'為可發文文別 - 允許異動稿件");
						return true;
					}
					// 1141201 Raymond 北榮序414 修正分會合併後, 因北榮邏輯而不能異動簽稿會核單, 造成傳送時發生-729問題
					else if(_drafts[idx].docType == "簽稿會核單" && _drafts[idx].dispatchMerged == "Y") {
						theLogger.log("[北榮禁止異動文稿邏輯例外] 未核決線上簽核公文, 在承辦單位流程點, '" + _drafts[idx].docType + "'為不可發文文別, 但處於分會合併後流程點 - 允許異動稿件");
						return true;
					}
					else {	// 不可發文文別出過組室禁止異動, 未出過組室則允許異動
						let createMsgId = parseInt(_tcSess[createSN].msgId),
							// 1141124 Raymond 1140818 改用getDocToDoList2取得流程, 以避免多機關架構下, 創稿取的文號剛好是別的機關已存在的文號, 而取到錯誤的流程清單, 導致誤判為不可編輯的問題
							//docToDoList = SSOUtil.getDocToDoList(docObj.docNo, htmlencode(localStorage.Artifact));
							docToDoList = SSOUtil.getDocToDoList2(docObj.sourceOrgNo, docObj.docNo, htmlencode(localStorage.Artifact));
						// 1141106 Raymond 1140818 修正出組室後退回原承辦人時, TodoList最後一個流程點是"已送出"資料夾, MsgId會大於承辦人流程點, 若承辦人在此流程點新增非可發文文別的稿件時, 會無法異動的問題
						let fldrSubmit = theSSO.User.EnvSettings.get("FOLDER_SUBMIT"),		// 已送出
							fldrDiscuss = theSSO.User.EnvSettings.get("FOLDER_DISCUSS");	// 會核中
						for(let i=docToDoList.length-1; i>=0; i--) {	// 從後向前搜尋
							// 1141106 Raymond 1140818 修正出組室後退回原承辦人時, TodoList最後一個流程點是"已送出"資料夾, MsgId會大於承辦人流程點, 若承辦人在此流程點新增非可發文文別的稿件時, 會無法異動的問題
							//if(docToDoList[i].ownOUId.substr(0, 2) != docObj.get("ODWMSG", "OWN_OU_ID").substr(0, 2)) {	// 單位前2碼與承辦單位前2碼不同
							if(docToDoList[i].folder != fldrSubmit && docToDoList[i].folder != fldrDiscuss && docToDoList[i].folder != "通知" && docToDoList[i].ownOUId.substr(0, 2) != docObj.get("ODWMSG", "OWN_OU_ID").substr(0, 2)) {	// 單位前2碼與承辦單位前2碼不同
								if(createMsgId < docToDoList[i].msgId) {
									// 1141218 Raymond 北榮序453 因1140818禁止出組室過的非可發文文別異動內文, 但要對自動增高簽核區域允許異動, 新增purpose參數, 若傳入"forSALP", 則允許異動
									if(!!purpose && purpose == "forSALP") {
										theLogger.log("[北榮禁止異動文稿邏輯] 未核決線上簽核公文, 在承辦單位流程點, '" + _drafts[idx].docType + "'為不可發文文別且已出過組室(新增時msgId:" + createMsgId + "小於最後一個非承辦單位MsgID:" + docToDoList[i].msgId + "), 應禁止異動稿件, 但for自動增高簽核區域功能 - 允許異動稿件");
										return true;
									}
									theLogger.log("[北榮禁止異動文稿邏輯] 未核決線上簽核公文, 在承辦單位流程點, '" + _drafts[idx].docType + "'為不可發文文別且已出過組室(新增時msgId:" + createMsgId + "小於最後一個非承辦單位MsgID:" + docToDoList[i].msgId + ") - 禁止異動稿件");
									return false;
								}
							}
						}
						theLogger.log("[北榮禁止異動文稿邏輯] 未核決線上簽核公文, 在承辦單位流程點, '" + _drafts[idx].docType + "'為不可發文文別但新增後未出組室 - 允許異動稿件");
						return true;
					}
				}
				// 1140926 Raymond 1140818 V5再變更需求項目1, 判斷新增的環境變數「AOL_ENABLE_CHANGE_DRAFT_CONTENT_OU_ROLES」若有值, 且當前流程點符合該變數設定的單位-角色條件, 則再允許異動稿件
				// 條件1,流程點位於非承辦同一級單位亦非總發
				//else if(docObj.get("ODWMSG", "OWN_OU_ID").substr(0, 2) != docObj.get("ODWMSG", "INCHARGE_OU").substr(0, 2) &&
				//	docObj.get("ODWMSG", "OWN_OU_ID") != "92") {
				else if(docObj.get("ODWMSG", "OWN_OU_ID").substr(0, 2) != docObj.get("ODWMSG", "INCHARGE_OU").substr(0, 2)) {	// 已核決總發(92)會走條件3, 未核決總發據Ying表示不可能發生, 所以條件1此處不需要排除總發
					let excSets = theSSO.User.EnvSettings.get("AOL_ENABLE_CHANGE_DRAFT_CONTENT_OU_ROLES");
					if(excSets.length > 0) {
						theLogger.log("環境變數「AOL_ENABLE_CHANGE_DRAFT_CONTENT_OU_ROLES」='" + excSets + "'");
						excSets = excSets.split("|");
						for(let i=0; i<excSets.length; i++) {
							excSets[i] = excSets[i].split(",");
							if(excSets[i].length < 2) {
								theLogger.warn(`第${i+1}組參數設定格式不正確`);
							}
						}
						for(let i=0; i<excSets.length; i++) {
							if(excSets[i].length > 1) {
								if(excSets[i][0] == docObj.get("ODWMSG", "OWN_OU_ID") &&
									excSets[i].slice(1).indexOf(docObj.get("ODWMSG", "OWN_ROLE_ID")) >= 0) {
									theLogger.log(`[北榮禁止異動文稿邏輯] 線上簽核公文, 在非承辦一級單位(OWN_OU_ID:${docObj.get("ODWMSG", "OWN_OU_ID")}), 但OWN_OU_ID及OWN_ROLE_ID(${docObj.get("ODWMSG", "OWN_ROLE_ID")})符合第${i+1}組單位-角色設定值, 允許異動稿件`);
									return true;
								}
							}
						}
					}
					//theLogger.log("[北榮禁止異動文稿邏輯] 線上簽核公文, 在非承辦一級單位亦非總發流程點(OWN_OU_ID:" + docObj.get("ODWMSG", "OWN_OU_ID") + ") - 禁止異動稿件");
					theLogger.log(`[北榮禁止異動文稿邏輯] 線上簽核公文, 在非承辦一級單位(OWN_OU_ID:${docObj.get("ODWMSG", "OWN_OU_ID")}) - 禁止異動稿件`);
					return false;
				}
				theLogger.log("[北榮禁止異動文稿邏輯] 線上簽核公文, 在流程點(OWN_OU_ID:" + docObj.get("ODWMSG", "OWN_OU_ID") + ") - 允許異動稿件");
				return true;
			}
			else
			// 以下從getEditable@RD-DraftModel.js 複製過來並依DraftMgmt適用調整
			// 1110624 Raymond 1110548 新增核決後公文以環境變數「WE_APPROVE_DISABLE_DRAFTEDIT_TYPE」設定的文別決定文稿是否要禁止編輯
			if(theSSO.User.EnvSettings.get("WE_APPROVE_DISABLE_DRAFTEDIT_TYPE").length > 0 && !!docObj.get("ODWMSG", "APP_USER_ID") && docObj.get("ODWMSG", "APP_USER_ID").length > 0) {
				var disDraftTypes = theSSO.User.EnvSettings.get("WE_APPROVE_DISABLE_DRAFTEDIT_TYPE").split(";");
				if(disDraftTypes.indexOf(docType) >= 0) {
					theLogger.log("已核決公文, 此文稿之文別符合環境變數「WE_APPROVE_DISABLE_DRAFTEDIT_TYPE」設定, 禁止編輯內文");
					return false;
				}
			}
			else	// 此功能與下面互斥
			// 1100419 Raymond 1080767 合併內政部1070530並新增判斷系統參數"CHECK_CLOSEDDRAFT_EDIT"為"Y"時, 發文/結案流程點前所新增文稿不可異動內容
			if(_readWrite && theSSO.User.SystemSets.get("CHECK_CLOSEDDRAFT_EDIT") == "Y" && this.isClosedDraftCrSN(createSN)) {
				if(this.isClosedDraftCanEditFolder()) {
					if(docType != "簽稿會核單" && docType != "會辦單") {
						theLogger.log("此文稿為發文/結案流程點前所新增文稿, 但符合可編輯資料夾設定, 允許異動內容");
						return true;
					}
					else	// 結案前新增的簽稿會核單再依舊邏輯判定可否編輯
						theLogger.log("此文稿為發文/結案流程點前所新增「" + docType + "」, 但符合可編輯資料夾設定, 依承辦會辦角色進一步判定");
				}
				else {
					theLogger.log("此文稿為發文/結案流程點前所新增文稿, 不允許異動內容");
					return false;
				}
			}
			if((docType == "簽稿會核單" || docType == "會辦單") && _readWrite) {	// 2017.3.15 簽稿會核單及會辦單額外檢核是否符合禁止編輯內文的folder-subfolder, 若是的話, 禁止編輯內文, 問題1060140
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
				// 2017.3.16 改依系統部評估的判斷規則
				var icou = docObj.ICOUId,
					ownou = docObj.ownOUId,
					ownrole = docObj.ownRoleId;
				//if(!icou && !ownou && !ownrole)	// 2017.4.6 fix for AKI802文稿編輯開啟DocView模式時, 無ownou等資訊的情況, 問題1060206
				if(!icou || !ownou || !ownrole)	// 1120821 Raymond 中興彙整表序158 AKI802文稿編輯開啟DocView模式時, 無icou及ownrole資訊(只有ownou)會導致轉圈圈問題
					return _readWrite;
				// 1100318 Raymond 1090853 新增當環境變數「WE_DISABLE_REEDIT_簽稿會核單」為Y時, 禁止任何人包含主會辦單位承辦人(OD99)異動簽稿會核單內文
				if(theSSO.User.EnvSettings.get("WE_DISABLE_REEDIT_簽稿會核單") == "Y") {
					if(createSN == _editSN) {
						theLogger.warn(docType + "為此流程點新增, 允許編輯(環境變數「WE_DISABLE_REEDIT_簽稿會核單」='Y')");
						return true;
					}
					theLogger.warn(docType + "非此流程點新增, 禁止編輯(環境變數「WE_DISABLE_REEDIT_簽稿會核單」='Y')");
					return false;
				}
				else
				if(icou.substr(0, 2) == ownou.substr(0, 2) && ownrole == "OD99") {
					theLogger.warn(docType + "在承辦人流程點(ICOUId:" + icou + ", ownOUId:" + ownou + ", ownRoleId:" + ownrole + "), 允許編輯");
					return true;
				}
				// 1070608 Raymond 1070197 會辦單位新增的簽稿會核單在同一會辦單位的承辦人角色時可編輯
				else if(this.getConDraftUnitNo(idx) == ownou.substr(0, 2) && ownrole == "OD99") {
					theLogger.warn(docType + "在會辦人流程點(DraftOU:" + this.getConDraftUnitNo(idx) + ", ownOUId:" + ownou + ", ownRoleId:" + ownrole + "), 允許編輯");
					return true;
				}
				else if(createSN == _editSN) {	// 2017.3.31 新增當流程點新增的簽稿會核單, 允許編輯
					theLogger.warn(docType + "在非承辦人流程點(ICOUId:" + icou + ", ownOUId:" + ownou + ", ownRoleId:" + ownrole + "), 但為此流程點新增, 允許編輯");
					return true;
				}
				// 1100816 Raymond 1100482 新增當環境變數「WE_ALLOW_CON_KEEP_SIGNOBJ」為Y時, 允許任何人異動簽稿會核單內文
				else if(theSSO.User.EnvSettings.get("WE_ALLOW_CON_KEEP_SIGNOBJ") == "Y") {
					theLogger.warn(docType + "在非承辦人流程點(ICOUId:" + icou + ", ownOUId:" + ownou + ", ownRoleId:" + ownrole + "), 但(環境變數「WE_DISABLE_REEDIT_簽稿會核單」='" + theSSO.User.EnvSettings.get("WE_DISABLE_REEDIT_簽稿會核單") + "' & 「WE_ALLOW_CON_KEEP_SIGNOBJ」='Y'), 允許編輯");
					return true;
				}
				else {
					theLogger.warn(docType + "在非承辦人流程點(ICOUId:" + icou + ", ownOUId:" + ownou + ", ownRoleId:" + ownrole + "), 禁止編輯");
					return false;
				}
			}
			return _readWrite;
		},
		// 1120915 Raymond 1120574 上次儲存後是否又有異動
		hasModifiedSinceLastSave: function() {
			return (!_lastSaveTime || _lastModifyTime > _lastSaveTime);	// _lastSaveTime空值即未儲存過
		},
		// 1121110 Raymond 1120881 新增取得目前公文是否保留簽署物件
		getReserveSO: function() {
			return _model.getReserveSO();
		},
		// 1121207 Raymond 1120887 新增取得目前公文是否為會辦公文
		isConUnit: function() {
			return _model.isConUnit();
		},
		// 1130105 Raymond 1120887 新增更新編輯階段序號功能(會辦單位翻頁至主辦單位的簽稿會核單時呼叫)
		updateEditSN: function() {
			if(_tcSess.length > 0) {
				var msgId = _model.getMsgId();
				if(_model.getMsgId().indexOf('_') > 0) {	// 草稿公文夾的msgId會多一個_帳號
					msgId = _model.getMsgId().substring(0, _model.getMsgId().indexOf('_'));
				}
				if(_tcSess[_tcSess.length-1].msgId != msgId) {    // msg id 不同需新增流程點
					theLogger.log("文稿管理檔中最後一筆MsgID與目前公文的MsgID不同, 新增追蹤修訂階段");
					_tcSess.push({
						index: _tcSess[_tcSess.length-1].index + 1,
						userId: _model.getOwnUserId(),
						name: _model.getOwnUserName(),
						color: _model.getUserColor(),
						msgId: _model.getMsgId(),
						ouId: _model.getOwnOUId(),									// 1110531 Raymond 1110527 新增記錄公文目前流程點的OWN_OU_ID
						roleId: _model.getOwnRoleId(),								// 1110531 Raymond 1110527 新增記錄公文目前流程點的OWN_ROLE_ID
						folder: _model.getFolder() + "-" + _model.getSubFolder()	// 1110531 Raymond 1110527 新增記錄公文目前流程點的Folder-Subfolder
					});
					// 1111226 Raymond 1111401 新增編輯階段序號的異動改為另一個變數記錄, 與其它異動(新增/刪除文稿、附件、調整稿序...etc)的「_dirty」變數切開
					// 即使未異動內文也要更新文稿管理檔?
					//_dirty = true;
					_sessDirty = true;	// 用另一個變數記錄此異動, _dirty用於除此之外的所有異動
				}
				else
					theLogger.log("文稿管理檔中最後一筆MsgID與目前公文的MsgID相同, 不新增追蹤修訂階段");
				_editSN = _tcSess[_tcSess.length-1].index;
				_canEditCon = true;	// 主辦單位子目錄下的文稿管理檔, 會辦單位也可異動儲存
				
				// 1110322 Raymond 1101416 新增若文稿管理檔未記錄最後異動文稿清單(新增、刪除稿件、調整稿序)的階段序號
				if(typeof _lastModifyDraftListSN != "number") {
					if(_drafts.length > 0) {	// 則以最後新增稿件的階段序號做為最後異動文稿清單的階段序號
						for(var i=0; i<_drafts.length; i++) {
							_lastModifyDraftListSN = Math.max(parseInt(_drafts[i].lastModifiedSN), _lastModifyDraftListSN);
						}
					}
					else	// 無任何新增稿件的話, 最後異動文稿清單的階段序號則預設為0
						_lastModifyDraftListSN = 0;
				}
			}
			else
				theLogger.error("[" + _dirPath + "]文稿管理檔未記錄任何追蹤修訂階段!");
		},
		// 1130105 Raymond 1120887 主辦單位子目錄下的文稿管理檔, 會辦單位是否可異動儲存(簽稿會核單支援會辦單位編輯意見區時)
		canEditCon: function() {
			return _canEditCon;
		},
		// 1130109 Raymond 1120887 檢查此文稿管理檔內的文稿是否有異動
		hasDraftModified: function() {
			for(var i=0; i<_drafts.length; i++) {
				if(!!_drafts[i].dm && _drafts[i].dm.dirty())
					return true;
			}
			return false;
		},
		// 1130521 Raymond 信保序113 新增設定文稿管理檔中記錄的稿件文別
		setDraftDocType: function(idx, docType) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求設定第" + idx + "個文稿之文別屬性, 超出範圍");
			if(_drafts[idx].docType != docType) {
				_drafts[idx].docType = docType;
				//_dirty = true;	// 目前此方法只會在EDT232匯入空白公文稿時被叫用, 故不需要註記管理檔回存
			}
			if(_model.getSignType() == "E") {
				var guid = _drafts[idx].guid;
				theLogger.debug("setDraftDocType(" + idx + ", '" + docType + "')...guid:" + guid);
				_model.setDraftDocType(guid, docType);
			}
		},
		// 1130521 Raymond 信保序113 新增設定文稿管理檔中記錄的稿件函類別
		setDraftSubDocType: function(idx, subDocType) {
			if(idx < 0 || idx >= _drafts.length)
				throw new Error("無法要求設定第" + idx + "個文稿之函類別屬性, 超出範圍");
			if(_drafts[idx].subDocType != subDocType) {
				_drafts[idx].subDocType = subDocType;
				//_dirty = true;	// 目前此方法只會在EDT232匯入空白公文稿時被叫用, 故不需要註記管理檔回存
			}
			if(_model.getSignType() == "E") {
				var guid = _drafts[idx].guid;
				theLogger.debug("setDraftSubDocType(" + idx + ", '" + subDocType + "')...guid:" + guid);
				_model.setDraftSubDocType(guid, subDocType);
			}
		},
		// 1140122 Raymond 1131303 新增取得錯別字校正資料物件方法
		getFixWordData: function() {
			return _model.getFixWordData();
		},
		// 1140723 Raymond 1140818 新增取得文稿「原稿新增日期時間」
		getDraftCreateTime: function(indexOrGUID) {	//取得原稿新增階段序號, index指封裝檔中的序
			if(typeof indexOrGUID === "string" && indexOrGUID.match(/^\{[0-9a-fA-F\-]*\}/)) {
				for(var i=0; i<_drafts.length; i++) {
					if(indexOrGUID == _drafts[i].guid)
						return _drafts[i].createTime;
				}
				throw new Error("管理檔中找不到指定GUID為'" + indexOrGUID + "'的文稿");
			}
			else if(indexOrGUID < 0 || indexOrGUID >= _drafts.length)
				throw new Error("要求取得第" + indexOrGUID + "個文稿原稿新增階段序號, 超出範圍");
			return _drafts[indexOrGUID].createTime;
		},
		// 1141218 Raymond 北榮序453 新增記錄因自動增高簽核區域而異動內文的階段序號
		changedForSALP: function(idx, flag) {
			if(flag == true) {
				if(idx < 0 || idx >= _drafts.length)
					throw new Error("無法設定第" + idx + "個文稿的自動增高, 超出範圍");
				_drafts[idx].changedForSALPSN = _editSN;
			}
			return _drafts[idx].changedForSALPSN == _editSN;
		}
	};
}

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-DraftMgmt.js").finish();
})();