// 文稿指令列功能模組
//	掛在nsEditor命名空間下
//	2016.10.5 FIX, 參數改為FolioView, FolioModel, draftIdx, this為指令按鈕Element
// DATE		MGRNO	SA		PG		Desc
// 1060621 1060283	Raymond Raymond	新增附件所有頁面向右及左旋轉功能
// 1060707 1060361	Raymond	Raymond	新增另存自訂範本功能
// 1060830 1060796	Raymond	Raymond	修正新增自訂範本後, 發文字號/文號下無年度、流水號、支號子標籤問題
// 1061026 1061053	Raymond	Raymond	修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
// 1061114 1061068	Raymond	Raymond	判斷是否允許旋轉來文附件頁面
// 1061123 1061113	Raymond	Raymond	貼上(置換)文稿改為isImported, 使重整時可開啟受文者子視窗
// 1061123 1060913	Raymond	Raymond	樣版沒有公文文號時自動新增, 以免文別轉換時沒有公文文號節點可以允許複製
// 1061204 1060913	Raymond	Raymond	修正文別轉換時未正確偵測到樣版檔無'公文文號'欄位而沒有自動新增的問題
// 1061212 1061113	Raymond	Raymond	FDA說他們的助理會利用這個漏洞幫原承辦人擬稿, 所以承辦人資訊須保持原樣, 不可遵循開啟舊檔功能以目前使用者資訊置換的邏輯
// 1061213 1061211	Raymond	Raymond	另存新檔及複製稿件轉換為完稿結果的XML
// 1061222 1061155	Raymond	Raymond	新增另存DI檔功能
// 1061225 1060929	Raymond	Raymond 多稿轉出功能先轉換為完稿結果的XML, 再搜尋^變數, 以免追蹤修訂標籤影響變數名稱判斷
// 1070122 NCKU107153		Raymond	另存自訂範本要清空決行層級
// 1070411 1070431	Raymond	Raymond 修正多稿轉出時未按儲存即轉出時不會套用變數問題及轉出後可能不會更新文稿頁籤並翻頁問題
// 1070608 1070197	Raymond	Raymond	因為有會辦文稿要禁止編輯, 改成用各別文稿檢查
// 1071012 -------	Raymond	Raymond	另存自訂範本前先轉換為完稿結果的XML
// 1071025 -------	Raymond	Raymond 另存DI前先轉換為完稿結果的XML
// 1071112 1071070	Raymond	Raymond	自訂範本名稱新增轉換<>&"'為entity功能
// 1080220 1080089	Raymond	Raymond	修正使用新增的方法操作分繕表物件
// 1080425 1080046	David	David	稿件刪除時後，呼叫WedEditSave.DraftRecoveryDefault()進行時效基資初始處理
// 1080826 1080733	Raymond	Raymond	修正多稿轉出匯出CSV後因utf-8編碼無BOM, 導致EXCEL開啟時變成亂碼的問題
// 1080923 1080339  Kevin   Eric    jQuery 3.0 upgrade
// 1081212 1080786	Raymond	Raymond	合併內政部單號1070657, 另存範本時不要刪除會稿單位, 及檢查置換的文稿是否應自動新增簽稿會核單, PS:因置換文稿功能未恢復onNewDraftExt呼叫(因FDA要求而mark掉)故另外做提示是否保留會辦單位的訊息及處理
// 1090110 1081141	Raymond	Raymond	修正多稿轉出取消勾選「轉出包含副本受文者」時仍轉出副本受文者的分繕稿件, 及轉出的分繕稿件會多出一組重複的來文機關/承辦單位為正/抄本受文者的問題
// 1090206 1070503	Raymond	Raymond	多稿轉出的匯入CSV功能合併一代共通版也提供的CDC需求(1000194)的'正副本取代模式'及'加入額外受文者'功能, 並修正無法匯入Big5編碼的CSV問題
// 1090227 1080751	Raymond	Raymond	合併內政部1070381調閱公文時, 另存新檔、另存DI、另存HTML檔時新增回報另存記錄
// 1090407 1090178	Raymond	Raymond	修正複製文稿時, 比照開啟舊檔保留附件文字
// 1090415 1080786	Raymond	Raymond	修正複製有會辦單位的稿件後貼上會跳出dm.getIndex is not a function錯誤訊息的問題
// 1090513 1090223	Raymond	Raymond	修改貼上稿件(置換)檢核需自動新增簽稿會核單時, 配合自動調整簽稿會核單文稿順序更新文稿頁籤的功能
// 1090526 1090392	Raymond	Raymond	新增貼上稿件(置換)時呼叫nsEditor.supplyFromTemplate函式以文別樣版檔為底補充缺少的欄位
// 1090916 1090564	Raymond	Raymond	信保基金特殊模式公文不提供另存新檔、另存DI、另存HTML、另存自訂範本、刪除稿件、複製、貼上稿件、文別轉換、多稿轉出等功能
// 1091015 1090695	Raymond	Raymond	鐵道局已核決公文(ODWMSG.APP_USER_NAME不為空)不可刪除稿件, 1091015 再要求判定條件增加僅限線上簽核
// 1091202 1090908	Raymond	Raymond	信保基金特殊模式草稿公文的文稿頁籤提供「所有頁面向右轉90度」、「所有頁面向左轉90度」功能
// 1091224 1090866	Raymond	Raymond	另存DI功能新增判定機關暱稱為"HAC"(客委會)時, 設定產生有"署名"的DI, 須配合更新過的"匯出DI.XSL"及"99匯出DI.XSL"
// 1100311 1090991	Raymond	Raymond	文別轉換選擇套用樣版後, 若樣版設定有"預設排版"屬性, 可直接套用, 不必選排版設定檔, 若啟用開啟舊檔時選取套用樣版功能, 則貼上(置換)稿件比照開啟舊檔行為
// 1100414 1100407	Raymond	Raymond	另存DI功能判定機關暱稱為"HAC"(客委會)時, 設定只產生一個對應署名2的"署名"標籤的DI, 須配合更新過的"匯出DI.XSL"及"99匯出DI.XSL"
// 1100507 1100296	Raymond	Raymond	當自動新增文稿批示單功能(環境變數WE_AUTO_GEN_文稿批示單=Y)啟用時, 文別轉換為"綜簽"或貼上稿件(置換)為"綜簽"時自動新增文稿批示單, 並調整稿序至第一筆
// 1100512 1100334	Raymond	Raymond	另存DI檔時, 檢核99匯出DI.XSL是否支援目前文稿之文別, 若不支援則Disable「99年版」選項, 以及修正環境變數「OD_ELEC_VERSION」設為"104"開頭時, 未預設勾選「104年版」選項的問題
// 1100601 1100523	Raymond	Raymond	修正在文別轉換至無「附件列表」的文別後, 再轉回有「附件列表」的文別時, 文稿XML中的「附件檔名」已清空, 但封裝檔draft物件的附件及頁面仍存在且附件頁籤未更新的問題
// 1100621 1100482	Raymond	Raymond	貼上稿件(置換)在啟用保留簽稿會核單簽核物件功能時, 比照一代手動輸入會辦單位時, 從10000流水號自動編會辦單位代碼(1100688的修正後邏輯), 以避免兩個以上無代碼(手動輸入)的會辦單位簽核區域無法區分的問題
// 1100716 1100787	Raymond	Raymond	複製稿件時清除年度號, 貼上稿件(置換)時判斷是否已取文號, 若已取文號則以ODWDCM.FILE_YEAR優先設為年度號, 若未設定分類號則以文號前3碼設為年度號
// 1100720 1100431	Raymond	Raymond	新增查找取代文字功能
// 1100908 1090863	Raymond	Raymond	新增下載R.PDF功能
// 1100917 1080763	Raymond	Raymond	合併1070348, 修正另存自訂範本功能新增設定類別功能。合併1071123,	另存為新範本後設置localStorage旗標, 供MP的範本清單檢查刷新
// 1101005 1101145	Raymond	Raymond	修正文別轉換時, 若轉換目的文別的主旨/@段名與目前文別不一致, 則要重設主旨為目的文別的@段名
// 1101021 1100342	Raymond	Raymond	配合109法規新增文書訊息代碼「6」-"本文附件未修正重發", 修正新的代碼存回文稿
// 1101022 1101327	Raymond	Raymond	修正分繕變數名稱重複時, 多稿轉出子視窗會出現2個以上相同變數名稱欄位的問題
// 1110125 1110137	Raymond	Raymond	修正多稿轉出的匯入CSV功能, 匯入含有正副本欄位的CSV時, 第2筆以後紀錄的受文者欄內容若與第1筆的正/副本欄一致, 其後續欄位內容會誤設為第1筆的欄位內容的問題
// 1110318 1101388	David	David	紙本簽核支援新增預排流程
// 1110321 1110216	Raymond	Raymond	多稿轉出的匯入CSV功能新增判斷若CSV同時有受文者及本別, 則以受文者+本別為KEY來判斷受文者是否同一個, 以修正同名受文者分別為正、副本的情況, 後者本別受文者的變數寫成前者本別受文者的內容的問題
// 1110323 1110243	Raymond	Raymond	新增其他文別轉為開會/會勘通知單時, 刪除主持人/出席者/列席者本別的受文者, 反之則刪除正本受文者
// 1110418 1110088	Raymond	Raymond	新增判斷另存HTML功能若設定的匯出XSL有與套用的PrintXSL同檔名則使用
// 1110510 1110470	Raymond	Raymond	新增貼上稿件(置換)時重新整理受文者列表的受文者的編號功能
// 1110610 1110283	Raymond	Raymond	新增貼上稿件(置換)時, 支援航港局客製化邏輯的自動產生簽稿會核單及排序功能
// 1110929 1111025	David	Joe		修改匯入功能發文方式預設值為郵寄
// 1111006 序324	Raymond	Raymond	修正多稿轉出分繕變數表, 比照一代不列出抄本受文者
// 1111205 1110867	Raymond	Raymond	新增「另存文字檔」及「另存ODT檔」功能
// 1111207 1110832	Kevin	Leslie	新增來文頁面的旋轉功能
// 1111221 銓敘部序73		Raymond	新增「貼上稿件(置換)」前提示警告訊息
// 1120118 國防部彙整表序29	Raymond	修正轉換文別"令"<->"獎懲令"(令類別未忽略)無效(稿序仍顯示原來的令類別)問題
// 1120314 1111133	Leslie	Raymond	新增來文附件重新命名功能
// 1120321 --		Leslie	Leslie	[考試院序9]修改"R.PDF"為"來文.PDF"
// 1120505 1120055	Raymond	Raymond	修正恢復貼上稿件(置換)時, 比照貼上稿件(新增), 應以目前角色資訊取代貼上的稿件的承辦人及承辦單位資訊
// 1120714 標檢局序127		Raymond	比照一代另存DI時一併另存附件電子檔
// 1120818 1120503	Raymond	Raymond	檢核文別若為"簽", 並含自訂表格, 要顯示警告並中止文別轉換
// 1120901 1120407	David	Raymond	修正取得DataXML時以本件公文的機關代碼為準, 而非目前切換的activeRole的機關代碼
// 1120904 1120640	Raymond	Raymond	新增當環境變數「WE_TRANSFORM_DOCTYPE_KEEP_ISSUEORG」設為"Y"時, 檢核為簽->簽/便簽或便簽->便簽/簽時, 發文機關列表下的全銜、機關地址、機關代碼要保留新樣版本來的, 而不是以原稿件的蓋過去
// 1120901  Kevin		Leslie		1120709		弱掃修正Client DOM Stored XSS
// 1121006 北大彙整表序256	Raymond	新增實作一代的文別轉換預轉功能
// 1121110 1120881	Raymond	Raymond	文別轉換時不保留舊檔的"簽核區域排版屬性"設定內容, 以所選的樣版檔中的設定值為準, 以避免原檔的簽核區域ID與所選樣版檔的簽核區域ID不一致可能會產生的問題
// 1121222 領務局序345		Raymond	修正另存新檔為保留格式化資訊的完稿XML
// 1121222 卡驗收序43		Leslie	新增客製化可設定留存自訂範本時，是否保留受文者資訊
// 1130216 1120232	Raymond	Raymond	新增另存HTML檔時傳入目前公文的簽核類型, 客委會樣版會依線上或紙本簽核類型的不同, 產出不同的排版結果
// 1120220 1120234	Raymond	Raymond	新增來文DI可直接在DocView新分頁中單獨載入顯示, 環境變數「AOL_VIEW_FROM_DOC_DI」設為"Y"時啟用此功能
// 1130621 1130489	Raymond	Raymond	取消複製稿件時清除決行層次行為(即保留原稿件的決行層次設定), 以避免排版稿面(內政部的代辦院函稿)上無決行層次欄位可選, 儲存檢核又設定成決行層次無值(或是全/半形空白)不可儲存時, 造成複製稿件後貼上稿件無法儲存公文的問題
// 1130808 1121009	Raymond	Raymond	新增比照一代公文製作的行為複製來源文稿的附件到多稿轉出的新增文稿
// 1130808 1130313	Raymond	Raymond	合併1111007(1100394), 離線模式不提供另存為自訂範本功能
// 1130813 1130313	Raymond	Raymond	離線模式不提供另存ODT檔功能
// 1130910 1130694	Leslie	Leslie	新增於來文頁籤可開啟EDI021 來文文字子視窗
// 1130924 1130834	Raymond	Raymond	修改來文R.PDF下載後的檔名為「文號-來文.PDF」
// 1131122 北榮序399Raymond	Raymond	合併屏東序899, 新增貼上稿件(置換)時檢核若為線上簽核公文, 則清空密等及解密條件或保密期限欄位內容
// 1140114 1131139	Raymond	Raymond	修正以轉換為完稿結果的XML再套預轉HTML的OutXSL檔, 以避免轉出的ODT出現已標記刪除的文字
// 1140225 1131096	Leslie	Leslie	修正取得來文附件資訊時，附件實體路徑邏輯
// 1140505 1140556	Kevin	Leslie	取消網址參數權杖
// 1140701 1140919	Raymond	Raymond	是否啟用自動新增文稿批示單功能, 改用擴充後的「WE_AUTO_GEN_文稿批示單」環境變數的第1變數判定, "存查批示單"判定文別改用第2變數取代
// 1140723 1141011	Kevin	Leslie	弱掃修正[Client DOM XSS]
// 1140729 1140381	David	Raymond	多稿轉出從匯入CSV新增額外受文者, 若已有附件分繕設定, 則新增的受文者一律不含附件, 關閉多稿轉出子視窗時, 若有從匯入CSV新增了額外的受文者, 則設立需異動附件分繕旗標, 在行動平台時, 檢查若有附件分繕設定, 則提示訊息後開啟附件管理子視窗
// 1140801 1141011	Kevin	Leslie	弱掃修正[Client DOM XSS]
// 1141020 1141013	Raymond	Raymond	新增檢核是否允許便簽也提供自訂表格功能
// 1141117 北榮序382Raymond	Raymond	修正貼上稿件(置換)時若簽稿會核單有會辦單位會詢問2次是否保留的問題
// 1141217 國合序451 Leslie	Leslie	修正因單號[1141255]改動附件匯出頁面的儲存流程，而影響的頁面轉向問題

var nsEditor = nsEditor||{};

// 1090227 Raymond 1080751 合併內政部1070381若是調閱公文, 回報另存記錄
nsEditor.ReportSaveAsLog = function(fm) {
	var uo = fm.getUNVObj();
	if(!!uo && "UnvRoot" in uo) {
		if("WSDLurl" in uo.UnvRoot && uo.UnvRoot.WSDLurl.length > 0) {
			var wsUrl = uo.UnvRoot.WSDLurl;
			var wsFuncName = 'SaveAsLog';
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
						alert("回報另存記錄失敗!");
					}
				}
				else {
					theLogger.error('Error! AKI500WS[' + wsFuncName + '] 回傳不為boolean');
					alert("回報另存記錄發生錯誤!");
				}
			});
		}
		else
			theLogger.error("此為調閱公文, 但UNV檔物件中未記錄應回報的WSDLurl網址");
	}
}

// 另存新檔
nsEditor.onExportCurrDraftVisible = function(view, model, draftIdx) {
	// 1090916 Raymond 1090564 信保特殊模式公文不提供此功能
	if(model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
		return false;
	return true;
};

nsEditor.onExportCurrDraft = function(view, model, draftIdx) {	// 2016.10.4 新增folioModel參數, 2016.10.5 FIX
	//theAOL.demoExportFile(true);
	var that = this;
	
	var dname = model.getDraftName(draftIdx);
	var fname = model.getDraftFileName(draftIdx);
	theLogger.log("下載'" + dname + "' - '" + fname + "'");
	// 預設檔名用文號-序, 或UserID + MsgID + 序
	if(model.getDocNo().length > 0)
		fname = model.getDocNo() + "-" + Util.padLeft(draftIdx + 1, 3) + ".xml";
	else
		fname = theUserInfo.UserID + "_" + model.getMsgId() + "-" + Util.padLeft(draftIdx + 1, 3) + ".xml";
	theLogger.log("預設下載檔名'" + fname + "'");
	
	/*var littleEndian = (function() {
		var buffer = new ArrayBuffer(2);
		new DataView(buffer).setInt16(0, 256, true);
		return new Int16Array(buffer)[0] === 256;
	})();*/
	
	model.accquireDraftModel(draftIdx)
		.done(function(dm) {
			var data = dm.accquireXml();
			// 1121222 Raymond 領務局序345 修正另存新檔為保留格式化資訊的完稿XML
			// 1061212 Raymond 1061211 新增轉換為完稿結果的XML
			//if("transCmplXml" in nsEditor) {
			//	data = nsEditor.transCmplXml(data);
			if("transCmplXmlWithFmt" in nsEditor) {
				data = nsEditor.transCmplXmlWithFmt(data);
			}
			var xml = Util.getXml(data, false, "UTF-8");	// 指定encoding屬性為UTF-8, 因為下載後的檔案會變成UTF-8
			/*var ab = new ArrayBuffer(xml.length * 2);
			var vw = new DataView(ab);
			for(var i=0; i<xml.length; i++) {
				var c = xml.charCodeAt(i);
				if(c > 255)
					vw.setUint8(i * 2, c >> 8);
				else
					vw.setUint8(i * 2, 0);
				vw.setInt8(i * 2 + 1, c & 0xff);
			}*/
			var blob = new Blob([xml], {type: "application/octet-stream"});
			//1140723	Leslie[1141011]	弱掃修正[Client DOM XSS]
			// var url = URL.createObjectURL(blob);
			//1140801	Leslie[1141011]	弱掃修正[Client DOM XSS]
			// var url = encodeURI(URL.createObjectURL(blob));
			var re = new RegExp(`blob:${location.protocol}//${location.host}/[0-9a-z]{8,8}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{12,12}`);
			var reUrl = re.exec(URL.createObjectURL(blob))[0];
			var url = encodeURI(reUrl);
			//var str = "data:application/octet-stream;base64," + Base64.encode(xml);
			if("msSaveBlob" in navigator)	// IE10/11專屬下載function
				navigator.msSaveBlob(blob, fname);
			else	// Chrome用A的click事件
				$(that).attr("data-role", "none").attr("href", url).attr("rel", "external").attr("data-ajax", "false").attr("download", fname);
			
			// 1090227 Raymond 1080751 合併內政部1070381回報另存記錄
			nsEditor.ReportSaveAsLog(model);
		})
		.fail(function(errorText) {
			alert(errorText);
		});
};

// 刪除文稿, 2016.10.4 實作刪除稿件
nsEditor.onDelCurrDraftVisible = function(view, model, draftIdx) {
	// 1091007 Raymond 1090695 鐵道局已核決公文(ODWMSG.APP_USER_NAME不為空)不可刪除稿件, 1091015 鐵道局要求不可刪除稿件的條件再侷限於線上簽核
	// 1090916 Raymond 1090564 信保特殊模式公文不提供此功能
	//if(model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
	if(model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2" || (theUserInfo.OrgNickName == "RRB" && model.getDocObj().get("ODWMSG", "APP_USER_NAME").length > 0 && model.getSignType() == "E"))
		return false;
	return model.isDraftDeletable(draftIdx);
};

nsEditor.onDelCurrDraft = function(view, model, draftIdx) {
	if(model.deleteDraft(draftIdx)) {
		//1080425 David 1080046 稿件刪除完成時，呼叫DraftRecoveryDefault()進行基資初始辦判斷
		if(typeof DraftRecoveryDefault !== "undefined")
			DraftRecoveryDefault(model);
		view.delPPD(draftIdx);	// 2017.2.9 新增叫用delPPD, 以避免刪除來文上面最後一筆文稿時, 會轉圈圈問題
		view.updateDraftTags(draftIdx);
	}
};

// 複製目前文稿, 2016.11.8 實作複製文稿
nsEditor.onCopyCurrDraftVisible = function(view, model, draftIdx) {
	// 1090916 Raymond 1090564 信保特殊模式公文不提供此功能
	if(model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
		return false;
	return true;
};

nsEditor.onCopyCurrDraft = function(view, model, draftIdx) {
	model.accquireDraftModel(draftIdx)
	.done(function(dm) {
		var doc = dm.accquireXml();
		theLogger.log(doc.xml || doc);
		// 1061213 Raymond 1061211 新增轉換為完稿結果的XML
		if("transCmplXml" in nsEditor) {
			doc = nsEditor.transCmplXml(doc);
		}
		localStorage.removeItem("copy_draft");
		var str = Util.getXml(doc);
		if("ActiveXObject" in window) {
			doc = new ActiveXObject("MSXML2.DOMDocument");
			doc.resolveExternals = false;
			doc.validateOnParse = false;
			doc.preserveWhiteSpace = true;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
			if(!doc.loadXML(str)) {
				var pe = doc.parseError;
				theLogger.error("載入XML失敗! " + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
			}
		}
		else {
			doc = (new DOMParser()).parseFromString(str, "text/xml");
		}
		/* 2016.11.21 FDA要求不要複製附件檔, 並應連附件文字一起清除
		// 下載已上傳的附件檔轉成Blob物件, 文稿XML則記錄ObjectURL
		var dfds = [];
		$(doc.documentElement).find("附件檔名").each(function(idx, elm) {
			if(("hasAttribute" in elm && elm.hasAttribute("data-blob-name")) ||	// 2016.11.14 bugfix, 非IE才有hasAttribute方法
				elm.getAttribute("data-blob-name") != null) {					// IE(MSXML)無hasAttribute方法, 用getAttribute回傳null則表示無此屬性
				var bn = elm.getAttribute("data-blob-name");
				if(bn.match(/^blob:/)) {	// 本來就是暫存檔
				}
				else {	// 先前已儲存上傳過的附件檔
					theLogger.warn("下載已上傳的附件檔'" + bn + "'");
					var dirPath = model.getDraftDirPath(draftIdx);
					theLogger.warn("子目錄為'" + dirPath + "'");
					var wfio = new WebFileIO(model.fileIOWS);
					var dfd = $.Deferred();
					wfio.download(dirPath, bn, {
						keepRawData: true,	// 保持原始資料格式(Typed Array)
						success: function(fil, all) {
							var blb = new Blob([fil], {type: "application/octet-stream"});
							var blbName = URL.createObjectURL(blb);
							theLogger.log("下載'" + elm.getAttribute("data-blob-name") + "'成功, 變更為'" + blbName + "'");	// 2016.11.15 added
							elm.setAttribute("data-blob-name", blbName);
							dfd.resolve();
						},
						error: function(errorText) {
							theLogger.error("下載'" + bn + "'失敗! " + errorText);	// 2016.11.15 bugfix
							dfd.reject(errorText);
						}
					});
					dfds.push(dfd);
				}
			}
			else {
				theLogger.warn("下載已上傳的附件檔'" + (elm.text || elm.textContent) + "'");
				var dirPath = model.getDraftDirPath(draftIdx);
				theLogger.warn("子目錄為'" + dirPath + "'");
				var wfio = new WebFileIO(model.fileIOWS);
				var dfd = $.Deferred();
				wfio.download(dirPath, (elm.text || elm.textContent), {
					keepRawData: true,	// 保持原始資料格式(Typed Array)
					success: function(fil, all) {
						var blb = new Blob([fil], {type: "application/octet-stream"});
						var blbName = URL.createObjectURL(blb);
						theLogger.log("下載'" + (elm.text || elm.textContent) + "'成功, 變更為'" + blbName + "'");	// 2016.11.15 added
						elm.setAttribute("data-blob-name", blbName);
						dfd.resolve();
					},
					error: function(errorText) {
						theLogger.error("下載'" + (elm.text || elm.textContent) + "'失敗! " + errorText);	// 2016.11.15 bugfix
						dfd.reject(errorText);
					}
				});
				dfds.push(dfd);
			}
		});
		if(dfds.length > 0) {
			$.when.apply(this, dfds)
			.done(function() {
				theLogger.log(doc.xml || doc);
				var str = Util.getXml(doc);
				copy(str);
			});
		}
		else
			copy(str);*/
		$(doc.documentElement).find("附件檔名").remove();
		/* 1090407 Raymond 1090178 複製貼上文稿不要清除附件文字
		if($(doc.documentElement).find("附件列表").find("文字").length) {
			var nd = $(doc.documentElement).find("附件列表").find("文字").get(0);
			if("text" in nd)
				nd.text = "";
			else
				nd.textContent = "";
		}*/
		// 2016.11.21 清除發文日期、字號
		if($(doc.documentElement).find("發文日期").find("年月日").length) {
			var nd = $(doc.documentElement).find("發文日期").find("年月日").get(0);
			if("text" in nd)
				nd.text = "";
			else
				nd.textContent = "";
		}
		if($(doc.documentElement).find("發文字號").length) {
			if($(doc.documentElement).find("發文字號").find("字").length) {
				var nd = $(doc.documentElement).find("發文字號").find("字").get(0);
				if("text" in nd)
					nd.text = "";
				else
					nd.textContent = "";
			}
			if($(doc.documentElement).find("發文字號").find("文號").find("年度").length) {
				var nd = $(doc.documentElement).find("發文字號").find("文號").find("年度").get(0);
				if("text" in nd)
					nd.text = "";
				else
					nd.textContent = "";
			}
			if($(doc.documentElement).find("發文字號").find("文號").find("流水號").length) {
				var nd = $(doc.documentElement).find("發文字號").find("文號").find("流水號").get(0);
				if("text" in nd)
					nd.text = "";
				else
					nd.textContent = "";
			}
			if($(doc.documentElement).find("發文字號").find("文號").find("支號").length) {
				var nd = $(doc.documentElement).find("發文字號").find("文號").find("支號").get(0);
				if("text" in nd)
					nd.text = "";
				else
					nd.textContent = "";
			}
		}
		// 2016.11.28 FDA要求清除決行層次、分層負責代碼
		/* 1130621 Raymond 1130489 取消複製稿件時清除決行層次行為(即保留原稿件的決行層次設定), 以避免排版稿面(內政部的代辦院函稿)上無決行層次欄位可選, 儲存檢核又設定成決行層次無值(或是全/半形空白)不可儲存時, 造成複製稿件後貼上稿件無法儲存公文的問題
		if($(doc.documentElement).find("決行層次").length) {
			var nd = $(doc.documentElement).find("決行層次").get(0);
			if("text" in nd)
				nd.text = "";
			else
				nd.textContent = "";
			if(("hasAttribute" in nd && nd.hasAttribute("決行層級")) ||		// Chrome
				nd.getAttribute("決行層級") != null)						// IE
				nd.setAttribute("決行層級", "　");
		}*/
		if($(doc.documentElement).find("分層負責代碼").length) {
			var nd = $(doc.documentElement).find("分層負責代碼").get(0);
			if("text" in nd)
				nd.text = "";
			else
				nd.textContent = "";
		}
		// 1100716 Raymond 1100787 中興要求清除年度號
		if($(doc.documentElement).find("年度號").length) {
			var nd = $(doc.documentElement).find("年度號").get(0);
			if("text" in nd)
				nd.text = "";
			else
				nd.textContent = "";
		}
		str = Util.getXml(doc);
		theLogger.log(str);
		copy(str);
		
		function copy(str) {
			/*if(document.queryCommandSupported("copy")) {	// 支援系統剪貼簿的話, 複製文字到剪貼簿, 2016.11.14 不要用剪貼簿以免IE跳出警告又要解釋一大堆
				var ta = document.createElement("textarea");
				ta.defaultValue = str;
				$(ta).appendTo("body");
				ta.select();
				document.execCommand("copy");
				$(ta).remove();
			}*/
			localStorage['copy_draft'] = str;
		}
	});
};

// 貼上文稿(置換), 2016.11.8 實作貼上文稿
nsEditor.onPasteCurrDraftVisible = function(view, model, draftIdx) {
	// 1090916 Raymond 1090564 信保特殊模式公文不提供此功能
	if(model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
		return false;
	/*var ta = document.createElement("textarea");
	$(ta).appendTo("body").on("paste", function(event) {
		alert(this.value);
	})
	.on("focus blur", function(event) {
		theLogger.log("on" + event.type + ": paste:" + document.queryCommandEnabled("paste"));
	})
	.trigger('focus');
	document.execCommand("paste");*/
	return "copy_draft" in localStorage && localStorage['copy_draft'].length > 0 && model.enableEdit();
};

nsEditor.onPasteCurrDraft = function(view, model, draftIdx) {
	// 1111221 Raymond 銓敘部序73 新增貼上稿件(置換)前提示警告訊息
	if(!confirm("貼上稿件後，會覆蓋現有文稿內容，\r\n您確定要進行貼上稿件(置換)嗎?"))
		return;
	var $viewPort = $(this).closest(".viewPort");
	model.accquireDraftModel(draftIdx)
	.done(function(dm) {
		var origDOM = dm.accquireXml();
		if("ActiveXObject" in window) {	// 2016.5.17 for IE
			var newDOM = new ActiveXObject("MSXML2.DOMDocument");
			newDOM.resolveExternals = false;
			newDOM.validateOnParse = false;
			newDOM.preserveWhiteSpace = true;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
			var b = newDOM.loadXML(localStorage['copy_draft']);
			if(!b) {
				var pe = newDOM.parseError;
				theLogger.error("載入XML失敗! " + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
				//dfd.reject(draftIdx, pe.reason);
			}
			else {	// 2016.12.21 新增貼上時重設公文文號為目前公文
				var tn = newDOM.selectSingleNode("/*/公文文號");	// 搜尋公文文號欄位
				if(!!tn) {
					var docNo = model.getDocNo();
					if(docNo.length > 0)	// 若已取號則重設公文文號
						tn.text = docNo;
					else					// 否則清空
						tn.text = "";
				}
			}
		}
		else {
			var newDOM = (new DOMParser()).parseFromString(localStorage['copy_draft'], "text/xml");
			if(newDOM) {	// 2016.12.21 新增貼上時重設公文文號為目前公文
				var snapshot = newDOM.evaluate("/*/公文文號", newDOM, null, 7, null);
				if(snapshot.snapshotLength > 0) {	// 搜尋公文文號欄位
					var docNo = model.getDocNo();
					if(docNo.length > 0)	// 若已取號則重設公文文號
						snapshot.snapshotItem(0).textContent = docNo;
					else					// 否則清空
						snapshot.snapshotItem(0).textContent = "";
				}
				// 1131122 Raymond 北榮序399 合併屏東序899, 新增貼上時若為線上簽核, 則清空密等及解密條件或保密期限
				if(model.getSignType() == "E") {
					snapshot = newDOM.evaluate("/*/密等及解密條件或保密期限", newDOM, null, 7, null);
					if(snapshot.snapshotLength > 0) {
						var snapshot2 = newDOM.evaluate("密等", snapshot.snapshotItem(0), null, 7, null);
						if(snapshot2.snapshotLength > 0)
							snapshot2.snapshotItem(0).setAttribute("代碼", "");
						snapshot2 = newDOM.evaluate("解密條件或保密期限", snapshot.snapshotItem(0), null, 7, null);
						if(snapshot2.snapshotLength > 0)
							snapshot2.snapshotItem(0).textContent = "";
					}
				}
			}
		}
		origDOM.replaceChild(newDOM.documentElement, origDOM.documentElement);	// 根節點換成新的
		theLogger.log(origDOM);
		// 1120505 Raymond 1120055 修正恢復貼上稿件(置換)時, 比照貼上稿件(新增), 應以目前角色資訊取代貼上的稿件的承辦人及承辦單位資訊
		// 1061212 Raymond FDA說他們的助理會利用這個漏洞幫原承辦人擬稿, 所以承辦人資訊須保持原樣, 不可遵循開啟舊檔功能以目前使用者資訊置換的邏輯
		// 1061123 Raymond 1061113 呼叫新增文稿後的擴充功能(ex.檢查發文機關...)
		if("onNewDraftExt" in nsEditor) {
			try {
				//theLogger.log("執行新增文稿後續擴充功能...");
				theLogger.log("貼上稿件(置換)比照貼上稿件(新增)功能, 執行新增文稿後續擴充功能...");
				nsEditor.onNewDraftExt.call(model, origDOM, true);
			}
			catch(e) {
				//theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
				theLogger.error(e.stack || e.message);
			}
		}
		// 1110510 Raymond 1110470 新增重新整理受文者列表的受文者的編號功能, onNewDraftExt會叫用到, 但因上段onNewDraftExt.call被mark掉而使貼上稿件(置換)無此功能, 故新增
		var $rcvrList = $(origDOM.documentElement).find("> 受文者列表");
		if($rcvrList.length > 0) {
			if("refreshDeptSeqNo" in nsEditor)
				nsEditor.refreshDeptSeqNo.call(model, $rcvrList.get(0));
			else
				theLogger.error("nsEditor無refreshDeptSeqNo方法可執行重新整理受文者編號的功能");
		}
		// 1141117 Raymond 北榮序382 修正onNewDraftExt已包含1080786此功能, 貼上稿件(置換)這裡再詢問一次會變成問2次的問題, 故此處mark掉
		// 1081212 Raymond 1080786 合併內政部單號1070657, 此段提示訊息因上段onNewDraftExt.call被mark掉而新增
		/*var $conList = $(origDOM.documentElement).find("> 會稿單位列表");
		if($conList.length > 0) {	// 有會稿單位列表欄位才檢查
			var cus = $conList.find("單位").length;
			if(cus > 0) {
				if(confirm("此文稿含有" + cus + "個會稿單位，是否保留匯入？")) {
					theLogger.warn("使用者選擇保留匯入文稿的" + cus + "個會稿單位");
					// 1100621 Raymond 1100482 貼上稿件(置換)在啟用保留簽稿會核單簽核物件功能時, 比照一代手動輸入會辦單位時, 從10000流水號自動編會辦單位代碼(1100688的修正後邏輯), 以避免兩個以上無代碼(手動輸入)的會辦單位簽核區域無法區分的問題
					if(theSSO.User.EnvSettings.get("WE_ALLOW_CON_KEEP_SIGNOBJ") == "Y") {
						var baseSN = 10000;
						$conList.find("單位").each(function(idx, cu) {
							var id = cu.getAttribute("代碼");
							if(!!id) {
								if(parseInt(id) >= baseSN)
									baseSN = parseInt(id) + 1;
								else if(parseInt(id) >= 10000)	// 代碼大於等於10000是手動輸入, 但比前一個手動輸入單位代碼小, 為避免重複, 重新取大一號的代碼
									cu.setAttribute("代碼", baseSN++);
							}
							else
								cu.setAttribute("代碼", baseSN++);
						});
					}
				}
				else {
					theLogger.warn("使用者選擇不保留匯入文稿的會稿單位, 清空所有會稿單位");
					$conList.children().remove();	// 按'否'則刪除會稿單位列表下的所有單位
				}
			}
		}*/
		// 1100716 Raymond 1100787 新增貼上(置換)時, 檢查是否已取文號, 已取文號則預設年度號為FILE_YEAR, 若無FILE_YEAR(未設分類號)則以文號前3碼為年度號
		var $fileYear = $(origDOM.documentElement).find("> 年度號");
		if($fileYear.length > 0) {
			if(model.getDocNo().length > 0) {
				theLogger.log("已取文號, 預帶年度號...");
				var fileYear = model.getDocObj().get("ODWDCM", "FILE_YEAR");
				if(!!fileYear && fileYear.length) {	// 已設分類號的話, 以與分類號一併取得的年度號為主(與RD-NewDraftExt.js一致)
					theLogger.log("預帶年度號為ODWDCM.FILE_YEAR:'" + fileYear + "'");
				}
				else {	// 未設分類號的話, 以文號前3碼為年度號
					fileYear = model.getDocNo().substr(0, 3);
					theLogger.log("預帶年度號為公文文號前3碼:'" + fileYear + "'");
				}
				if("text" in $fileYear.get(0))
					$fileYear.get(0).text = fileYear;
				else
					$fileYear.get(0).textContent = fileYear;
			}
		}
		
		// 1081210 Raymond 1080786 合併內政部單號1070657, 檢查置換的文稿是否應新增簽稿會核單(copy from 10249@RD-Edit.js)
		function detectAutoGenConAndSyncFlow(dm) {
			var _dfd = $.Deferred();	// 1090512 Raymond 1090223 改成Deferred執行, 避免需自動新增簽稿會核單時, 因非同步使簽稿會核單較晚
			var docType = dm.getDocType();
			var $conList = $(dm.accquireXml().documentElement).find("會稿單位列表");
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
						//1110318 David 1101388 紙本簽核支援新增預排流程
						//if(model.getSignType() == "E" && model.isApplyConUnitDraft(docType)) {
						if((model.getSignType() == "E" || (model.getSignType() == "P" && theSSO.User.SystemSets.get("P_FLOW_USE_WWKF") == "Y")) 
							&& model.isApplyConUnitDraft(docType)) {
							theLogger.log("開啟舊檔或貼上稿件是簽稿會核單且設定有會稿單位, 呼叫同步到預排流程的函式");
							try {
								// TODO: 呼叫同步到預排流程的函式
								theAOL.docObj.updateWWKFCoWorkFlow(conUnits);
							}
							catch(e) {
								theLogger.error(e.stack || e.message);
							}
						}
						// 1090512 Raymond 1090223 改成Deferred執行, 稿件是簽稿會核單, 只要同步預排流程不需自動新增簽稿會核單
						_dfd.resolve();
					}
					else {	// 非簽稿會核單
						var genCon = theSSO.User.EnvSettings.get("WE_GEN_CON");
						// 1110609 Raymond 1110283 新增航港局邏輯的自動產生簽稿會核單
						var genCon4MPB = theSSO.User.EnvSettings.get("WE_GEN_CON_FOR_MPB") == "Y";
						var genConThreshold = theSSO.User.EnvSettings.get("WE_GEN_CON_THRESHOLD");
						// 1110609 Raymond 1110283 新增航港局邏輯的自動產生簽稿會核單
						//if(genCon.toUpperCase() == "Y" && genConThreshold.length > 0 && conUnits.length >= parseInt(genConThreshold)) {
						if((genCon.toUpperCase() == "Y" || genCon4MPB) && genConThreshold.length > 0 && conUnits.length >= parseInt(genConThreshold)) {
							theLogger.warn("會辦單位數(" + conUnits.length + ")超過門檻值(WE_GEN_CON_THRESHOLD=" + genConThreshold + "), 自動產生簽稿會核單");
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
							// 1090415 Raymond 1080786 DraftModel.getIndex()是1070547所新增的方法, 但共通版不合併1070547自動調整新增文稿的稿序功能, 故無該方法
							//model.autoGenCon(conUnits, subj, sender, dm.getIndex())
							//model.autoGenCon(conUnits, subj, sender)
							model.autoGenCon(conUnits, subj, sender, dm)
							//.done(function(dm2) {	// dm2是新增的或同流程點即有的簽稿會核單
							.done(function(dm2, autoGened, aoParam) {	// 1090513 Raymond 1090223 新增的第2參數若是true表示簽稿會核單是新增的, 第3參數則為自動調整稿序的參數
								// 同步到預排流程
								//1110318 David 1101388 紙本簽核支援新增預排流程
								//if(model.getSignType() == "E" && model.isApplyConUnitDraft(dm2)) {	// 先判斷簽稿會核單是否是優先套用會辦單位的文稿
								if((model.getSignType() == "E" || (model.getSignType() == "P" && theSSO.User.SystemSets.get("P_FLOW_USE_WWKF") == "Y"))
									&& model.isApplyConUnitDraft(dm2)) {
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
								//else if(model.getSignType() == "E" && model.isApplyConUnitDraft(dm)) {	// 若否再判斷目前文稿是否是優先套用會辦單位的文稿
								else if((model.getSignType() == "E" || (model.getSignType() == "P" && theSSO.User.SystemSets.get("P_FLOW_USE_WWKF") == "Y")) 
									&& model.isApplyConUnitDraft(dm)) {
									theLogger.log("呼叫同步到預排流程的函式");
									try {
										// TODO: 呼叫同步到預排流程的函式
										theAOL.docObj.updateWWKFCoWorkFlow(conUnits);
									}
									catch(e) {
										theLogger.error(e.stack || e.message);
									}
								}
								// 1110610 Raymond 1110283 新增航港局自動產生簽稿會核單排序邏輯
								if(autoGened && theSSO.User.EnvSettings.get("AOL_AUTO_ADJ_CON_FOR_MPB") == "Y") {
									// 1140701 Raymond 1140919 "存查批示單"判定文別改用擴充後的「WE_AUTO_GEN_文稿批示單」環境變數的第2變數取代
									//if(docType == "存查批示單")	// 從存查批示單產生的簽稿會核單排在存查批示單前面, 所以目前顯示的存查批示單的稿序加一
									if(docType == model.getAutoGenInstructionSheet2ndDocType()) {
										if(theSSO.User.EnvSettings.get("WE_AUTO_GEN_文稿批示單")?.indexOf("|") >= 0)
											theLogger.log("目前文別(" + docType + ")符合環境變數「WE_AUTO_GEN_文稿批示單」的第2變數設定, 新增簽稿會核單後順序加一");
										view.shiftCurrDraftIndex();
									}
								}
								else
								// 1090512 Raymond 1090223 若簽稿會核單是自動新增的且環境變數設定要將簽稿會核單自動調整至第一筆, 則目前編輯的稿件的順序會遞增1
								if(autoGened && theSSO.User.EnvSettings.get("AOL_AUTO_ADJ_CON_FIRST") == "Y") {
									view.shiftCurrDraftIndex();
									//view.updateDraftTags();	// resolve時會updateDraftTags
								}
								_dfd.resolve(aoParam);	// 改成Deferred執行, 自動新增簽稿會核單成功, 直接傳入回傳的調整稿序參數
							})
							.fail(function(errorText) {
								alert(errorText);
								// 同步到預排流程
								//1110318 David 1101388 紙本簽核支援新增預排流程
								//if(model.getSignType() == "E" && model.isApplyConUnitDraft(dm)) {	// 新增簽稿會核單失敗, 則改判斷目前文稿是否是優先套用會辦單位的文稿
								if((model.getSignType() == "E" || (model.getSignType() == "P" && theSSO.User.SystemSets.get("P_FLOW_USE_WWKF") == "Y"))
									&& model.isApplyConUnitDraft(dm)) {
									theLogger.log("呼叫同步到預排流程的函式");
									try {
										// TODO: 呼叫同步到預排流程的函式
										theAOL.docObj.updateWWKFCoWorkFlow(conUnits);
									}
									catch(e) {
										theLogger.error(e.stack || e.message);
									}
								}
								// 1090512 Raymond 1090223 改成Deferred執行, 自動新增簽稿會核單失敗
								_dfd.resolve();
							});
						}
						else {	// 不需要自動新增簽稿會核單, 但符合條件的話要更新預排流程
							//1110318 David 1101388 紙本簽核支援新增預排流程
							//if(model.getSignType() == "E" && model.isApplyConUnitDraft(docType)) {
							if((model.getSignType() == "E" || (model.getSignType() == "P" && theSSO.User.SystemSets.get("P_FLOW_USE_WWKF") == "Y"))
								&& model.isApplyConUnitDraft(docType)) {
								theLogger.log("不需要自動新增簽稿會核單, 但因新增文稿設定有會稿單位所以呼叫同步到預排流程的函式");
								try {
									// TODO: 呼叫同步到預排流程的函式
									theAOL.docObj.updateWWKFCoWorkFlow(conUnits);
								}
								catch(e) {
									theLogger.error(e.stack || e.message);
								}
							}
							// 1090512 Raymond 1090223 改成Deferred執行, 不需自動新增簽稿會核單
							_dfd.resolve();
						}
					}
				}
				else	// 1090512 Raymond 1090223 改成Deferred執行, 稿件無"會稿單位列表/單位"
					_dfd.resolve();
			}
			else	// 1090512 Raymond 1090223 改成Deferred執行, 稿件無"會稿單位列表"
				_dfd.resolve();
			return _dfd.promise();	// 1090512 Raymond 1090223 改成Deferred執行, 避免需自動新增簽稿會核單時, 因非同步使簽稿會核單較晚
		}
		
		// 1061123 Raymond 1061113 改為isImported, 使重整時可開啟受文者子視窗
		dm.isImported(true);
		
		// 1090526 Raymond 1090392 新增呼叫nsEditor.supplyFromTemplate函式補充缺少的欄位
		if(!!nsEditor && !!nsEditor.supplyFromTemplate) {
		// 1100311 Raymond 1090991 新增回傳值, 若有啟用開啟舊檔時選取套用樣版功能, 則會將所選取樣版檔設定的"預設排版"屬性回傳
		//	nsEditor.supplyFromTemplate(origDOM).done(function() {
		//dm.transformDocType()
			nsEditor.supplyFromTemplate(origDOM).done(function(defPrintXSLName) {
		dm.transformDocType(defPrintXSLName)	// 將回傳的預設排版檔名稱直接做為參數傳入transformDocType函式
		.done(function() {
			// 1140701 Raymond 1140919 是否啟用自動新增文稿批示單功能, 改用擴充後的「WE_AUTO_GEN_文稿批示單」環境變數的第1變數判定
			// 1100507 Raymond 1100296 若啟用自動新增文稿批示單功能, 則判斷文別轉換為"綜簽"時, 自動新增文稿批示單
			//if(theSSO.User.EnvSettings.get("WE_AUTO_GEN_文稿批示單") == "Y" && dm.getDocType() == "綜簽") {
			if(model.isAutoGenInstructionSheetEnabled() && dm.getDocType() == "綜簽") {
				/* 先新增文稿批示單, 如果貼上的稿件有會稿單位再新增簽稿會核單, 若環境變數AOL_AUTO_ADJ_CON_FIRST啟用時, 簽稿會核單稿序會在文稿批示單之前
				model.autoGenInstructionSheet()
				.always(function(dm2, autoGened, aoParam2) {
					if(autoGened)
						view.shiftCurrDraftIndex();				// 若自動新增文稿批示單, 目前編輯中稿件序遞增1
					detectAutoGenConAndSyncFlow(dm)	// 1081210 Raymond 1080786 合併內政部單號1070657, 呼叫自動新增簽稿會核單及同步會辦單位至預排流程
					.done(function(aoParam) {
						// 1090513 Raymond 1090223 回傳值為自動調整文稿順序的參數, 直接傳入updateDraftTags
						view.updateDraftTags(undefined, aoParam);
						dm.updateAttachFiles();	// 更新附件檔名及更新文稿管理檔/封裝檔的附件項目
						if(SSO_CONFIG.enableConvertAttPage) {	// 判斷是否啟用附件匯出頁面設定
							view.proceedRndrAtt();	// proceedRndrAtt()會在附件匯出頁面後更新頁籤
						}
						else {
							view.updateAttTags();	// 更新附件頁籤
						}
						$viewPort.find(".pages").flip("refresh");	// 重新整理頁面
					});
				});*/
				// 如果貼上的稿件有會稿單位先新增簽稿會核單, 再新增文稿批示單, 若環境變數AOL_AUTO_ADJ_CON_FIRST啟用時, 文稿批示單稿序會在簽稿會核單之前
				detectAutoGenConAndSyncFlow(dm)	// 1081210 Raymond 1080786 合併內政部單號1070657, 呼叫自動新增簽稿會核單及同步會辦單位至預排流程
				.done(function(aoParam) {
					model.autoGenInstructionSheet()
					.always(function(dm2, autoGened, aoParam2) {
						if(autoGened)
							view.shiftCurrDraftIndex();				// 若自動新增文稿批示單, 目前編輯中稿件序遞增1
						// 1090513 Raymond 1090223 回傳值為自動調整文稿順序的參數, 直接傳入updateDraftTags
						view.updateDraftTags(undefined, aoParam2);
						dm.updateAttachFiles();	// 更新附件檔名及更新文稿管理檔/封裝檔的附件項目
						if(SSO_CONFIG.enableConvertAttPage) {	// 判斷是否啟用附件匯出頁面設定
							view.proceedRndrAtt();	// proceedRndrAtt()會在附件匯出頁面後更新頁籤
						}
						else {
							view.updateAttTags();	// 更新附件頁籤
						}
						$viewPort.find(".pages").flip("refresh");	// 重新整理頁面
					});
				});
			}
			else {
				// 1090512 Raymond 1090223 detectAutoGenConAndSyncFlow()改成Deferred, 避免需自動新增簽稿會核單時, 因非同步使簽稿會核單較晚新增, 而使文稿順序改變後的頁數暫存資料對應錯誤
				detectAutoGenConAndSyncFlow(dm)	// 1081210 Raymond 1080786 合併內政部單號1070657, 呼叫自動新增簽稿會核單及同步會辦單位至預排流程
				.done(function(aoParam) {
				// 1090513 Raymond 1090223 回傳值為自動調整文稿順序的參數, 直接傳入updateDraftTags
				//view.updateDraftTags();	// 2016.11.14 bugfix
				view.updateDraftTags(undefined, aoParam);
				dm.updateAttachFiles();	// 更新附件檔名及更新文稿管理檔/封裝檔的附件項目
				if(SSO_CONFIG.enableConvertAttPage) {	// 判斷是否啟用附件匯出頁面設定
					view.proceedRndrAtt();	// proceedRndrAtt()會在附件匯出頁面後更新頁籤
				}
				else {
					view.updateAttTags();	// 更新附件頁籤
				}
				$viewPort.find(".pages").flip("refresh");	// 重新整理頁面
				});
			}
		})
		.fail(function(errorText) {
			theLogger.error("重新套用樣版檔失敗! " + errorText);
		});
		// 1090526 Raymond 1090392 新增呼叫nsEditor.supplyFromTemplate函式補充缺少的欄位
			})
			.fail(function(errorText) {
				theLogger.error("補充文別樣版欄位失敗! " + errorText);
			});
		}
		else {
			theLogger.error("無nsEditor或supplyFromTemplate函式, 無法補充貼上稿件的文別樣版欄位");
		}
	});
};

// 另存HTML檔, 2016.10.28 新增
nsEditor.onExportCurrDraftHTMLVisible = function(view, model, draftIdx) {
	// 1090916 Raymond 1090564 信保特殊模式公文不提供此功能
	if(model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
		return false;
	var docType = model.getDraftDocType(draftIdx),	// 2016.10.31 改成判斷文別有無匯出設定的XSL再顯示
		res = false;
	// 1110418 Raymond 1110088 新增判斷若匯出XSL有與套用的PrintXSL同檔名則使用
	var origPrintXSL = model.getDraftOrigPrintXSLByIndex(draftIdx),
		origPrintXSLFN = undefined;
	if(typeof origPrintXSL === "string" && origPrintXSL.length > 0)
		origPrintXSLFN = origPrintXSL.substr(origPrintXSL.lastIndexOf("\\") + 1);
	thePublicRsrc.enumDirs("匯出設定", function(dir) {
		for(var i=0; i<dir.children.length; i++) {
			var nm = dir.children[i].name;
			if(nm == docType) {
				res = true;
				break;
			}
			// 1110418 Raymond 1110088 新增判斷若匯出XSL有與套用的PrintXSL同檔名則使用
			else if(!!origPrintXSLFN) {
				var path = dir.children[i].remote.path;
				if(path == origPrintXSLFN) {
					res = true;
					break;
				}
			}
		}
	});
	return res;
};

nsEditor.onExportCurrDraftHTML = function(view, model, draftIdx) {
	var that = this;
	
	var dname = model.getDraftName(draftIdx);
	var fname = model.getDraftFileName(draftIdx);
	theLogger.log("下載'" + dname + "' - '" + fname + "'");
	// 預設檔名用文號-序, 或UserID + MsgID + 序
	if(model.getDocNo().length > 0)
		fname = model.getDocNo() + "-" + Util.padLeft(draftIdx + 1, 3) + ".htm";
	else
		fname = theUserInfo.UserID + "_" + model.getMsgId() + "-" + Util.padLeft(draftIdx + 1, 3) + ".htm";
	theLogger.log("預設下載檔名'" + fname + "'");
	
	/*var littleEndian = (function() {
		var buffer = new ArrayBuffer(2);
		new DataView(buffer).setInt16(0, 256, true);
		return new Int16Array(buffer)[0] === 256;
	})();*/
	
	model.accquireDraftModel(draftIdx)
	.done(function(dm) {
		var xmlDoc = dm.accquireXml();
		//var xml = Util.getXml(data, false, "UTF-8");	// 指定encoding屬性為UTF-8, 因為下載後的檔案會變成UTF-8
		
		var docType = dm.getDocType();	// 文別
		// 1110418 Raymond 1110088 新增判斷若匯出XSL有與套用的PrintXSL同檔名則使用
		var origPrintXSL = model.getDraftOrigPrintXSLByIndex(draftIdx),
			origPrintXSLFN = undefined;
		if(typeof origPrintXSL === "string" && origPrintXSL.length > 0)
			origPrintXSLFN = origPrintXSL.substr(origPrintXSL.lastIndexOf("\\") + 1);
		var fitRsrcFile = undefined;	// 1111202 Raymond 1110867 檢查若匯出XSL有與套用的PrintXSL同檔名則「優先」使用
		thePublicRsrc.enumDirs("匯出設定", function(dir) {
			for(var i=0; i<dir.children.length; i++) {
				var nm = dir.children[i].name;
				// 1111202 Raymond 1110867 檢查若匯出XSL有與套用的PrintXSL同檔名則「優先」使用
				// 1110418 Raymond 1110088 新增判斷若匯出XSL有與套用的PrintXSL同檔名則使用
				//if(nm == docType) {
				//if(nm == docType || (!!origPrintXSLFN && origPrintXSLFN == dir.children[i].remote.path)) {
				if(!!origPrintXSLFN && origPrintXSLFN == dir.children[i].remote.path) {
					fitRsrcFile = dir.children[i];
					break;
				}
				else if(nm == docType) {
					fitRsrcFile = dir.children[i];
				}
			}
			//theLogger.warn("無任何文別'" + docType + "'的匯出設定XSL檔");
		});
		// 1111202 Raymond 1110867 檢查若匯出XSL有與套用的PrintXSL同檔名則「優先」使用
		if(!!fitRsrcFile) {
			var ph = fitRsrcFile.remote.path;
			theLogger.log("下載'" + ph + "'...");
			// 1130216 Raymond 1120232 新增noCache參數, 設為true可邊改OutXSL邊測, 1130219復原
			theCacheMgr.get({type: "rsrc", rsrc: fitRsrcFile})
			//theCacheMgr.get({type: "rsrc", rsrc: fitRsrcFile, noCache: true})
			.done(function(xslDoc) {
				theLogger.log("轉換為HTML...");
				try {
					if("XSLTProcessor" in window) {
						// 1111205 Raymond 1110867 另存HTML也帶入稿序、dataXml
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
						var v = xslDoc.evaluate("xsl:variable[@name='稿序']", xslDoc.documentElement, nsResolver, 7, null);
						if(v != null && v.snapshotLength > 0) {
							var paramNode = v.snapshotItem(0);
							paramNode.textContent = dname;
							theLogger.log("套用排版參數[稿序]: '" + paramNode.textContent + "'");
						}
						// 1130216 Raymond 1120232 新增另存HTML檔時傳入目前公文的簽核類型, 客委會樣版會依線上或紙本簽核類型的不同, 產出不同的排版結果
						v = xslDoc.evaluate("xsl:variable[@name='簽核類型']", xslDoc.documentElement, nsResolver, 7, null);
						if(v != null && v.snapshotLength > 0) {
							var paramNode = v.snapshotItem(0);
							paramNode.textContent = model.getSignType();
							theLogger.log("套用排版參數[簽核類型]: '" + paramNode.textContent + "'");
						}
						v = xslDoc.evaluate("xsl:variable[@name='dataXml']", xslDoc.documentElement, nsResolver, 7, null);
						if(v != null && v.snapshotLength > 0) {
							var dataXml = v.snapshotItem(0);
							theLogger.log("取得Data.XML資料");
							// 1120901 Raymond 1120407 修正取得DataXML時以本件公文的機關代碼為準, 而非目前切換的activeRole的機關代碼
							//thePublicRsrc.getDataXML(Common.activeRole.orgNo)
							thePublicRsrc.getDataXML(model.getDocObj().sourceOrgNo)
								.done(function(datDoc) {
									theLogger.log("填入Data.XML節點至dataXml變數");
									dataXml.appendChild(datDoc.documentElement);
								})
								.fail(function(errorText) {
									theLogger.warn(errorText);
								})
								.always(function() {
									console.log("xsl, xml, xslt:");
									console.log(xslDoc);
									console.log(xmlDoc);
									var xslt = new XSLTProcessor();
									xslt.importStylesheet(xslDoc);
									var res = xslt.transformToDocument(xmlDoc, document);
									console.log(res);
									
									var xml = (new XMLSerializer()).serializeToString(res);
									var blob = new Blob([xml], {type: "text/plain"});
									var a = window.document.createElement("a");
									//1140723	Leslie[1141011]	弱掃修正[Client DOM XSS]
									// a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
									//1140801	Leslie[1141011]	弱掃修正[Client DOM XSS]
									// a.href = encodeURI(window.URL.createObjectURL(blob, {type: "text/plain"}));
									var re = new RegExp(`blob:${location.protocol}//${location.host}/[0-9a-z]{8,8}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{12,12}`);
									var reUrl = re.exec(window.URL.createObjectURL(blob, {type: "text/plain"}))[0];
									a.href = encodeURI(reUrl);
									a.download = fname;
									document.body.appendChild(a);
									a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
									document.body.removeChild(a);
								});
						}
						else {
							console.log("xsl, xml, xslt:");
							console.log(xslDoc);
							console.log(xmlDoc);
							var xslt = new XSLTProcessor();
							xslt.importStylesheet(xslDoc);
							var res = xslt.transformToDocument(xmlDoc, document);
							console.log(res);
							
							var xml = (new XMLSerializer()).serializeToString(res);
							var blob = new Blob([xml], {type: "text/plain"});
							var a = window.document.createElement("a");
							//1140723	Leslie[1141011]	弱掃修正[Client DOM XSS]
							// a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
							//1140801	Leslie[1141011]	弱掃修正[Client DOM XSS]
							// a.href = encodeURI(window.URL.createObjectURL(blob, {type: "text/plain"}));
							var re = new RegExp(`blob:${location.protocol}//${location.host}/[0-9a-z]{8,8}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{12,12}`);
							var reUrl = re.exec(window.URL.createObjectURL(blob, {type: "text/plain"}))[0];
							a.href = encodeURI(reUrl);
							a.download = fname;
							document.body.appendChild(a);
							a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
							document.body.removeChild(a);
						}
					}
					else {
						var msxsl = new ActiveXObject("MSXML2.DOMDocument");
						var res = msxsl.loadXML(Util.getXml(xslDoc));
						res = xmlDoc.transformNode(msxsl);
						theLogger.log("xsl, xml, xslt:");
						theLogger.log(Util.getXml(msxsl));	// 2016.11.2 bugfix
						theLogger.log(Util.getXml(xmlDoc));
						theLogger.log(res);
						
						var blob = new Blob([res], {type: "application/octet-stream"});
						//1140723	Leslie[1141011]	弱掃修正[Client DOM XSS]
						// var url = URL.createObjectURL(blob);
						//1140801	Leslie[1141011]	弱掃修正[Client DOM XSS]
						// var url = encodeURI(URL.createObjectURL(blob));
						var re = new RegExp(`blob:${location.protocol}//${location.host}/[0-9a-z]{8,8}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{12,12}`);
						var reUrl = re.exec(URL.createObjectURL(blob))[0];
						var url = encodeURI(reUrl);
						if("msSaveBlob" in navigator)	// IE10/11專屬下載function
							navigator.msSaveBlob(blob, fname);
						else
							theLogger.error("無msSaveBlob函式");
					}
					
					// 1090227 Raymond 1080751 合併內政部1070381回報另存記錄
					nsEditor.ReportSaveAsLog(model);
				}
				catch(e) {
					theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
				}
			})
			.fail(function(errorText) {
				theLogger.error(errorText);
				alert(errorText);
			});
		}
		else {
			theLogger.error("找不到適用於" + docType + "之匯出XSL檔");
			alert("找不到適用於" + docType + "之匯出XSL檔");
		}
	});
};

// 文別轉換
nsEditor.onTransformDocTypeVisible = function(view, model, draftIdx) {
	// 1090916 Raymond 1090564 信保特殊模式公文不提供此功能
	if(model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
		return false;
	// 1070608 Raymond 1070197 因為有會辦文稿要禁止編輯, 改成用各別文稿檢查
	//return model.enableEdit();
	return model.getDraftEditable(draftIdx);
};

nsEditor.onTransformDocType = function(view, model, draftIdx) {
	var $viewPort = $(this).closest(".viewPort");
	var that = this;
	var w = $viewPort.closest(".ui-pane-a, .ui-pane-b").width(),
		h = $viewPort.closest(".ui-pane-a, .ui-pane-b").height();
	
	// 1120818 Raymond 1120503 檢核文別若為"簽", 並含自訂表格, 要顯示警告並中止文別轉換
	var hasCTBL = false;
	// 1141020 Raymond 1141013 新增檢核是否允許便簽也提供自訂表格功能
	//if(model.getDraftDocType(draftIdx) == "簽") {
	if(model.getDraftDocType(draftIdx) == "簽" || (theSSO.User.EnvSettings.get("WE_ENABLE_CUSTOM_TABLE_FOR_便簽") == "Y" && model.getDraftDocType(draftIdx) == "便簽")) {
		model.accquireDraftModel(draftIdx).done(function(dm) {
			hasCTBL = dm.hasCTBL();
		});
	}
	if(hasCTBL)
		alert("本文稿含有自訂表格, 無法轉換為其它文別。");
	else
	if(confirm("文別轉換後，某些欄位文字會消失，\n您確定要進行文別轉換嗎？")) {
		
		Util.getDlg("RD-TransformDocType.html").done(function($dlg) {
			$dlg.find("header > h1").unwrap();
			$dlg.find("footer > div").unwrap();
			
			var docType = model.getDraftDocType(draftIdx), subDocType = "";// 2016.11.21 新增函類別變數
			var selectedRsrcFile = undefined;
			thePublicRsrc.populateTmpl($dlg.find("ul"), function(rsrcName, rsrcFile) {	// onSelect
				selectedRsrcFile = rsrcFile;
				$dlg.find("#ok").removeClass("ui-disabled");
			}, null, function(rsrcFile) {	// filter
				return true;
			}, true);
			
			// 1121006 Raymond 北大彙整表序256 新增實作一代的文別轉換預轉功能
			function pretransformElement(origDOM, trgDocType, trgSubDocType) {
				var dfd = $.Deferred();
				thePublicRsrc.getPretransformDocTypeXSL().done(function(xsl) {
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
					// 設定目的文別變數
					let ss = xsl.evaluate("xsl:variable[@name=\'目的文別\']", xsl.documentElement, nsResolver, 7, null);
					if(ss.snapshotLength > 0)
						ss.snapshotItem(0).textContent = trgDocType;
					if(!!trgSubDocType) {
						ss = xsl.evaluate("xsl:variable[@name=\'次文別\']", xsl.documentElement, nsResolver, 7, null);
						if(ss.snapshotLength > 0)
							ss.snapshotItem(0).textContent = trgSubDocType;
					}
					theLogger.log("(預)轉換為文別:" + trgDocType + ", 次文別:" + trgSubDocType + "...");
					let xslt = new XSLTProcessor();
					xslt.importStylesheet(xsl);
					//let xformed = xslt.transformToFragment(origDOM, document);
					let xformed = xslt.transformToDocument(origDOM);
					if(!!xformed) {
						theLogger.log("成功!", xformed);
						dfd.resolve(xformed.documentElement);
					}
					else {
						theLogger.error("失敗!");
						dfd.reject("(預)轉換為文別:" + trgDocType + ", 次文別:" + trgSubDocType + "失敗!");
					}
				})
				.fail(function(errText) {
					dfd.reject(errText);
				});
				return dfd.promise();
			}
			
			// 用新根節點下的每個子節點查詢舊的根節點, 有相同的子節點則取代新的
			function matchElements(oldElm, newElm) {
				// 1110323 Raymond 1110243 新增其他文別轉為開會/會勘通知單時, 刪除主持人/出席者/列席者本別的受文者, 反之則刪除正本受文者
				var delRcvrsByIssueType = 0;
				if((docType == "開會通知單" || docType == "會勘通知單") && selectedRsrcFile.docType != "開會通知單" && selectedRsrcFile.docType != "會勘通知單") {	// 開會通知單/會勘通知單->X
					theLogger.log("'" + docType + "'轉換為'" + selectedRsrcFile.docType + "', 應刪除主持人/出席者/列席者本別的受文者...");
					delRcvrsByIssueType = 1;
				}
				else if((selectedRsrcFile.docType == "開會通知單" || selectedRsrcFile.docType == "會勘通知單") && docType != "開會通知單" && docType != "會勘通知單") {
					theLogger.log("'" + docType + "'轉換為'" + selectedRsrcFile.docType + "', 應刪除正本本別的受文者...");
					delRcvrsByIssueType = 2;
				}
				
				var nl = newElm.children || newElm.childNodes;	// MSXML2.DOMDocument沒有children有childNodes, Chrome的DOM二者都有, 但childNodes包含textNode, 要優先使用children
				var nSignIndex = 0;	// 署名序
				for(var i=0; i<nl.length; i++) {
					var childNode = nl[i];
					if(childNode.nodeType == 1) {	// 1061123 Raymond fix for IE childNodes包含#text時selectSingleNode會出現語法錯誤問題
						var nodeName = childNode.nodeName;
						
						// 1120118 Raymond 國防部彙整表序29 修正轉換文別"令"<->"獎懲令"(令類別未忽略)無效(稿序仍顯示原來的令類別)問題
						//if(nodeName == "函類別")
						//{
						//	theLogger.log("忽略函類別");
						if(nodeName == "函類別" || nodeName == "令類別")
						{
							theLogger.log("忽略" + nodeName);
							continue;
						}
						// 1121114 Raymond 1120881 新增樣版檔有"簽核區域排版屬性"時, 搜尋原稿中對應ID的高度欄位, 再帶入高度欄位的原稿設定值
						else if(nodeName == "簽核區域排版屬性")
						{
							var ssOld = oldElm.ownerDocument.evaluate("簽核區域排版屬性/高度", oldElm, null, 7, null);
							if(ssOld.snapshotLength > 0) {
								var ssNew = newElm.ownerDocument.evaluate("高度", childNode, null, 7, null);
								if(ssNew.snapshotLength > 0) {
									for(var j=0; j<ssNew.snapshotLength; j++) {
										let id = ssNew.snapshotItem(j).getAttribute("ID");
										let found = false;
										for(var k=0; k<ssOld.snapshotLength; k++) {
											if(ssOld.snapshotItem(k).getAttribute("ID") == id) {
												found = true;
												let ctx = ssOld.snapshotItem(k).textContent;
												theLogger.log("文別轉換: '簽核區域排版屬性/高度[@ID=\"" + id + "\"]'=" + ssNew.snapshotItem(j).textContent + "->" + ctx);
												ssNew.snapshotItem(j).textContent = ctx;
											}
										}
										if(!found)
											theLogger.warn("文別轉換: '簽核區域排版屬性/高度[@ID=\"" + id + "\"]'=" + ssNew.snapshotItem(j).textContent + "...原稿無對應此ID的欄位");
									}
									continue;
								}
								else {
									theLogger.warn("樣版檔無'簽核區域排版屬性/高度'欄位");
								}
							}
							else {
								theLogger.warn("原稿無'簽核區域排版屬性/高度'欄位");
							}
						}
						else if(nodeName == "署名")	// 2016.11.21 署名不取代, 用樣版預設的署名, 簽、書函適用, 其餘文別互轉則要保留原稿的署名(FDA規則, Dick說的)
						{
							if(docType == "簽" ||																		// 簽->X
								(docType == "函" && subDocType == "書函") ||											// 書函->X
								docType == "開會通知單" || docType == "會勘通知單" ||									// 開會通知單/會勘通知單->X
								selectedRsrcFile.docType == "簽" ||														// X->簽
								(selectedRsrcFile.docType == "函" && selectedRsrcFile.subDocType == "書函") ||			// X->書函
								selectedRsrcFile.docType == "開會通知單" || selectedRsrcFile.docType == "會勘通知單") {	// X->開會通知單/會勘通知單
								if(docType == "簽" || selectedRsrcFile.docType == "簽")
									theLogger.log(docType + "轉" + selectedRsrcFile.docType + ":忽略署名");
								else if(docType == "函") {
									if(selectedRsrcFile.docType == "函")
										theLogger.log(subDocType + "轉" + selectedRsrcFile.subDocType + ":忽略署名");
									else
										theLogger.log(subDocType + "轉" + selectedRsrcFile.docType + ":忽略署名");
								}
								else
									theLogger.log(docType + "轉" + selectedRsrcFile.subDocType + ":忽略署名");
								continue;
							}
						}
						// 1120904 Raymond 1120640 新增當環境變數「WE_TRANSFORM_DOCTYPE_KEEP_ISSUEORG」設為"Y"時, 檢核為簽->簽/便簽或便簽->便簽/簽時, 發文機關列表下的全銜、機關地址、機關代碼要保留新樣版本來的, 而不是以原稿件的蓋過去
						else if(theSSO.User.EnvSettings.get("WE_TRANSFORM_DOCTYPE_KEEP_ISSUEORG") == "Y" &&
							(docType == "簽" || docType == "便簽") && (selectedRsrcFile.docType == "簽" || selectedRsrcFile.docType == "便簽")) {
							if("evaluate" in oldElm.ownerDocument) {	// for Non-IE
								if(nodeName == "發文機關列表") {
									var ssOld = oldElm.ownerDocument.evaluate("發文機關列表/發文機關", oldElm, null, 7, null);
									if(ssOld.snapshotLength > 0) {
										var ssNew = newElm.ownerDocument.evaluate("發文機關列表/發文機關", newElm, null, 7, null);
										if(ssNew.snapshotLength > 0) {
											theLogger.log("環境變數「WE_TRANSFORM_DOCTYPE_KEEP_ISSUEORG」為'Y', 文別轉換: '發文機關列表/發文機關'...");
											matchElements(ssOld.snapshotItem(0), ssNew.snapshotItem(0), true);	// 多傳入第3參數為true, 表示這是recursive call
											continue;
										}
										else {
											theLogger.warn("樣版檔無'發文機關列表/發文機關'欄位");
										}
									}
									else {
										theLogger.warn("原稿無'發文機關列表/發文機關'欄位");
									}
								}
								else if(arguments.length > 2 && arguments[2] == true) {	// 若有傳入第3參數為true, 則表示這是recursive call
									if(nodeName == "全銜" || nodeName == "機關地址" || nodeName == "機關代碼") {
										theLogger.log("環境變數「WE_TRANSFORM_DOCTYPE_KEEP_ISSUEORG」為'Y', 忽略發文機關之'" + nodeName + "'");
										continue;
									}
								}
							}
							else
								theLogger.error("DOM無evaluate方法可使用");
						}
						var strMatch;
						// Fix, 段落必須段名作matching
						if(nodeName == "段落")
						{
							var attrName = childNode.getAttribute("段名");
							strMatch = "段落[@段名='" + attrName + "']";
						}
						/* Fix, 署名可能有2筆
						else if(bstrName == CComBSTR("署名"))
						{
							CString str;
							str.Format(_T("署名[%d]"), ++nSignIndex);
							bstrMatch = str;
						}*/
						else
							strMatch = nodeName;
						theLogger.log("文別轉換: '" + strMatch + "'...");
						
						if("evaluate" in oldElm.ownerDocument) {	// for Non-IE
							var snapshot = oldElm.ownerDocument.evaluate(strMatch, oldElm, null, 7, null);
							if(snapshot.snapshotLength > 0) {
								if(snapshot.snapshotLength == 1) {
									// 1101005 Raymond 1101145 修正若轉換目的文別的主旨/@段名與目前文別不一致, 則要重設主旨為目的文別的@段名
									var subjNm = "";
									if(strMatch == "主旨")
										subjNm = childNode.getAttribute("段名");
									
									newElm.replaceChild(snapshot.snapshotItem(0), childNode);
									theLogger.log("取代'" + strMatch + "'成功");
									
									// 1101005 Raymond 1101145 修正若轉換目的文別的主旨/@段名與目前文別不一致, 則要重設主旨為目的文別的@段名
									if(strMatch == "主旨") {
										if(!!subjNm) {
											theLogger.log("重設主旨/@段名為目的文別的'" + subjNm + "'");
											snapshot.snapshotItem(0).setAttribute("段名", subjNm);
										}
										else if(snapshot.snapshotItem(0).hasAttribute("段名")) {
											theLogger.log("比照目的文別移除主旨/@段名");
											snapshot.snapshotItem(0).removeAttribute("段名");
										}
									}
									// 1110323 Raymond 1110243 新增其他文別轉為開會/會勘通知單時, 刪除主持人/出席者/列席者本別的受文者, 反之則刪除正本受文者
									else if(strMatch == "受文者列表") {
										if(delRcvrsByIssueType == 1) {	// 刪除主持人/出席者/列席者本別的受文者
											$(snapshot.snapshotItem(0).children).filter(function(idx, nd) {
												if(nd.nodeName == "受文者") {
													let it = nd.getAttribute("本別");
													if(typeof it == "string" && it.match(/主持人|出席者|列席者/)) {
														theLogger.log("刪除" + it + "本別的受文者[" + $(nd).find("全銜").text() + "]");
														return true;
													}
												}
												else if(nd.nodeName == "受文者列表") {
													let it = nd.getAttribute("本別");
													if(typeof it == "string" && it.match(/主持人|出席者|列席者/)) {
														theLogger.log("刪除" + it + "本別的受文者列表(群組)[" + $(nd).find("文字").text() + "]");
														return true;
													}
												}
											}).remove();
										}
										else if(delRcvrsByIssueType == 2) {	// 刪除正本本別的受文者
											$(snapshot.snapshotItem(0).children).filter(function(idx, nd) {
												if(nd.nodeName == "受文者") {
													let it = nd.getAttribute("本別");
													if(typeof it == "string" && it.match(/正本/)) {
														theLogger.log("刪除" + it + "本別的受文者[" + $(nd).find("全銜").text() + "]");
														return true;
													}
												}
												else if(nd.nodeName == "受文者列表") {
													let it = nd.getAttribute("本別");
													if(typeof it == "string" && it.match(/正本/)) {
														theLogger.log("刪除" + it + "本別的受文者列表(群組)[" + $(nd).find("文字").text() + "]");
														return true;
													}
												}
											}).remove();
										}
									}
								}
								else {
									theLogger.warn("取代'" + strMatch + "'失敗, 舊文稿有多組相同XPath的元素");
								}
							}
							else {
								theLogger.warn("取代'" + strMatch + "'失敗, 舊文稿無此XPath的元素");
							}
						}
						else if("selectSingleNode" in oldElm) {	// for IE
							var oldChild = oldElm.selectSingleNode(strMatch);
							if(oldChild) {
								// 1101005 Raymond 1101145 修正若轉換目的文別的主旨/@段名與目前文別不一致, 則要重設主旨為目的文別的@段名
								var subjNm = "";
								if(strMatch == "主旨")
									subjNm = childNode.getAttribute("段名");
								
								newElm.replaceChild(oldChild, childNode);
								
								// 1101005 Raymond 1101145 修正若轉換目的文別的主旨/@段名與目前文別不一致, 則要重設主旨為目的文別的@段名
								if(strMatch == "主旨") {
									if(!!subjNm) {
										theLogger.log("重設主旨/@段名為目的文別的'" + subjNm + "'");
										oldChild.setAttribute("段名", subjNm);
									}
									else if(!!oldChild.getAttribute("段名")) {
										theLogger.log("比照目的文別移除主旨/@段名");
										oldChild.removeAttribute("段名");
									}
								}
								// 1110323 Raymond 1110243 新增其他文別轉為開會/會勘通知單時, 刪除主持人/出席者/列席者本別的受文者, 反之則刪除正本受文者
								else if(strMatch == "受文者列表") {
									if(delRcvrsByIssueType == 1) {	// 刪除主持人/出席者/列席者本別的受文者
										$(oldChild.childNodes).filter(function(idx, nd) {
											if(nd.nodeName == "受文者") {
												let it = nd.getAttribute("本別");
												if(typeof it == "string" && it.match(/主持人|出席者|列席者/)) {
													theLogger.log("刪除" + it + "本別的受文者[" + $(nd).find("全銜").text() + "]");
													return true;
												}
											}
											else if(nd.nodeName == "受文者列表") {
												let it = nd.getAttribute("本別");
												if(typeof it == "string" && it.match(/主持人|出席者|列席者/)) {
													theLogger.log("刪除" + it + "本別的受文者列表(群組)[" + $(nd).find("文字").text() + "]");
													return true;
												}
											}
										}).remove();
									}
									else if(delRcvrsByIssueType == 2) {	// 刪除正本本別的受文者
										$(oldChild.childNodes).filter(function(idx, nd) {
											if(nd.nodeName == "受文者") {
												let it = nd.getAttribute("本別");
												if(typeof it == "string" && it.match(/正本/)) {
													theLogger.log("刪除" + it + "本別的受文者[" + $(nd).find("全銜").text() + "]");
													return true;
												}
											}
											else if(nd.nodeName == "受文者列表") {
												let it = nd.getAttribute("本別");
												if(typeof it == "string" && it.match(/正本/)) {
													theLogger.log("刪除" + it + "本別的受文者列表(群組)[" + $(nd).find("文字").text() + "]");
													return true;
												}
											}
										}).remove();
									}
								}
							}
							else {
								theLogger.warn("取代'" + strMatch + "'失敗, 舊文稿無此XPath的元素");
							}
						}
						else {
							
						}
					}
				}
			}
			
			$dlg.find("#ok").addClass("ui-disabled").on('click', function() {
				
				if(selectedRsrcFile) {
					if(selectedRsrcFile.docType == "函")
						theLogger.log("轉換為'" + selectedRsrcFile.docType + "'(" + selectedRsrcFile.subDocType + ")...");
					else
						theLogger.log("轉換為'" + selectedRsrcFile.docType + "'...");
					
					theCacheMgr.get({type: "rsrc", rsrc: selectedRsrcFile})	// 載入樣版檔
					.done(function(newDOM) {
						theLogger.log(Util.getXml(newDOM));
						var newDocElm = newDOM.documentElement;	// 樣版檔的根節點
						// 1061204 Raymond bugfix getElementsByTagName回傳的是一個物件(IE是IXMLDOMSelection), 須用length屬性判斷是否有此節點
						// 1061123 Raymond 1060913 樣版沒有公文文號時自動新增, 以免文別轉換時沒有公文文號節點可以允許複製
						//if(!newDocElm.getElementsByTagName("公文文號")) {
						if(newDocElm.getElementsByTagName("公文文號").length == 0) {
							theLogger.warn("樣版無'公文文號'欄位, 自動新增");
							newDocElm.appendChild(newDocElm.ownerDocument.createElement("公文文號"));
						}
						model.accquireDraftModel(draftIdx)	// 取得目前文稿
						.done(function(dm) {
							var origDOM = dm.accquireXml();	// 取得目前文稿的XML
							var origOrXformedDocElm = origDOM.documentElement;	// 目前文稿XML的根節點
							//hr = PretransformElement(m_spXmlDoc, pSelTmplFile->GetDocType(), pSelTmplFile->GetSubDocType(), &spOrigOrXformedDocElm);	// 預轉XSL, 二代未實作
							
							if(origOrXformedDocElm.nodeName == "函")	// 2016.11.21 若是函, 讀取函類別
								subDocType = $(origOrXformedDocElm).find("函類別").attr("代碼");
							
							// 1121006 Raymond 北大彙整表序256 新增實作一代的文別轉換預轉功能
							let trgDocType = newDocElm.nodeName;
							let trgSubDocType = (trgDocType == "令" || trgDocType == "函")?$(newDocElm).find("函類別, 令類別").attr("代碼"):"";
							pretransformElement(origDOM, trgDocType, trgSubDocType).done(function(pretransformedDocElm) {
								origOrXformedDocElm = pretransformedDocElm;
								procLast();
							})
							.fail(function() {
								procLast();	// 預轉失敗也要繼續文別轉換
							});
							function procLast() {
							
							matchElements(origOrXformedDocElm, newDocElm);
							
							// 1121006 Raymond 北大彙整表序256 origOrXformedDocElm已被換成預轉後的XML根節點, 所以第2個參數要改成origDOM.documentElement才能被取代
							//origDOM.replaceChild(newDocElm, origOrXformedDocElm);	// 根節點換成新的
							origDOM.replaceChild(newDocElm, origDOM.documentElement);	// 根節點換成新的
							theLogger.log(origDOM);
							
							// 1100311 Raymond 1090991 新增傳入預設排版資源檔名稱, 若所選取樣版檔有設定"預設排版"屬性, 則直接套用以避免選取排版設定檔的詢問視窗出現
							//dm.transformDocType()
							dm.transformDocType(selectedRsrcFile.defPrintXSLName)
							.done(function() {
								// 1140701 Raymond 1140919 是否啟用自動新增文稿批示單功能, 改用擴充後的「WE_AUTO_GEN_文稿批示單」環境變數的第1變數判定
								// 1100507 Raymond 1100296 若啟用自動新增文稿批示單功能, 則判斷文別轉換為"綜簽"時, 自動新增文稿批示單
								//if(theSSO.User.EnvSettings.get("WE_AUTO_GEN_文稿批示單") == "Y" && dm.getDocType() == "綜簽") {
								if(model.isAutoGenInstructionSheetEnabled() && dm.getDocType() == "綜簽") {
									model.autoGenInstructionSheet()
									.done(function(dm2, autoGened, aoParam) {
										if(autoGened)
											view.shiftCurrDraftIndex();				// 若自動新增文稿批示單, 目前編輯中稿件序遞增1
										view.updateDraftTags(undefined, aoParam);	// 傳入異動後稿序
										// 1100601 Raymond 1100523 修正在文別轉換至無「附件列表」的文別後, 再轉回有「附件列表」的文別時, 文稿XML中的「附件檔名」已清空, 但封裝檔draft物件的附件及頁面仍存在且附件頁籤未更新的問題
										dm.updateAttachFiles(true);	// 若文別轉換後有「附件列表」節點則保留文稿管理檔/封裝檔的附件項目, 無則清空
										if(SSO_CONFIG.enableConvertAttPage) {	// 判斷是否啟用附件匯出頁面設定
											view.proceedRndrAtt();	// proceedRndrAtt()會在附件匯出頁面後更新頁籤
										}
										else {
											view.updateAttTags();	// 更新附件頁籤
										}
										$viewPort.find(".pages").flip("refresh");	// 重新整理頁面
									})
									.fail(function() {
										view.updateDraftTags();
										// 1100601 Raymond 1100523 修正在文別轉換至無「附件列表」的文別後, 再轉回有「附件列表」的文別時, 文稿XML中的「附件檔名」已清空, 但封裝檔draft物件的附件及頁面仍存在且附件頁籤未更新的問題
										dm.updateAttachFiles(true);	// 若文別轉換後有「附件列表」節點則保留文稿管理檔/封裝檔的附件項目, 無則清空
										if(SSO_CONFIG.enableConvertAttPage) {	// 判斷是否啟用附件匯出頁面設定
											view.proceedRndrAtt();	// proceedRndrAtt()會在附件匯出頁面後更新頁籤
										}
										else {
											view.updateAttTags();	// 更新附件頁籤
										}
										$viewPort.find(".pages").flip("refresh");	// 重新整理頁面
									});
								}
								else {
									view.updateDraftTags();	// 2016.11.14 fix
									// 1100601 Raymond 1100523 修正在文別轉換至無「附件列表」的文別後, 再轉回有「附件列表」的文別時, 文稿XML中的「附件檔名」已清空, 但封裝檔draft物件的附件及頁面仍存在且附件頁籤未更新的問題
									dm.updateAttachFiles(true);	// 若文別轉換後有「附件列表」節點則保留文稿管理檔/封裝檔的附件項目, 無則清空
									if(SSO_CONFIG.enableConvertAttPage) {	// 判斷是否啟用附件匯出頁面設定
										view.proceedRndrAtt();	// proceedRndrAtt()會在附件匯出頁面後更新頁籤
									}
									else {
										view.updateAttTags();	// 更新附件頁籤
									}
									$viewPort.find(".pages").flip("refresh");	// 重新整理頁面
								}
							})
							.fail(function(errorText) {
								theLogger.error("重新套用樣版檔失敗! " + errorText);
							});
							}	// end of procLast()
						})
						.fail(function(errorText) {
							theLogger.error("要求取得第 " + draftIdx + " 文稿失敗! " + errorText);
						});
					})
					.fail(function(errorText) {
						theLogger.error("下載指定的樣版檔失敗! " + errorText);
					});
				}

				// 儲存
				$.modal.close();
			});
			$dlg.find("#cancel").on('click', function() {
				$.modal.close();
			});
			$dlg.find("li").on('click', function(event) {
				event.preventDefault();
				
				$dlg.find("li a").removeClass("ui-btn-active");
				$(this).find("a").addClass("ui-btn-active");
			});
			$.modal($dlg, {
				appendTo: $viewPort.closest(".ui-pane-a, .ui-pane-b"),
				overlayCss: {width: w, height: h},
				containerCss: {width: "400px", height: "380px"},
				onShow: function() {
					$dlg.trigger("create");
					
				}
			});
		});
	}
};

// 多稿轉出
nsEditor.onGenMailMergesVisible = function(view, model, draftIdx) {
	// 1090916 Raymond 1090564 信保特殊模式公文不提供此功能
	if(model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
		return false;
	return model.enableEdit();
};

nsEditor.onGenMailMerges = function(view, model, draftIdx) {
	var $viewPort = $(this).closest(".viewPort");
	var that = this;
	var w = $viewPort.closest(".ui-pane-a, .ui-pane-b").width(),
		h = $viewPort.closest(".ui-pane-a, .ui-pane-b").height();
	var thisDM = undefined;
	var specialMode = false;	// 1090206 Raymond 1070503 合併一代共通版也提供的CDC需求(1000194)的'正副本取代模式'功能
	var addExtraRcvrs = false;	// 1090206 Raymond 1070503 是否從匯入CSV新增了額外受文者
	
	function findVar(str) {
		//var re = new RegExp("\^", "g");
		var oi = 0;
		var m = [];
		var i = str.substr(oi).indexOf("^");
		while(i >= 0) {
			m.push(oi + i);
			oi += i + 1;
			i = str.substr(oi).indexOf("^");
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
	
	Util.getDlg("RD-GenMailMerges.html").done(function($dlg) {
		$dlg.find("header > h1").unwrap();
		//$dlg.find("footer > div").unwrap();
		// 關閉
		$dlg.find("a#cancel").on('click', function() {
			// 1090206 Raymond 1070503 若有從匯入CSV新增了額外受文者, 要重新整理文稿頁面
			if(addExtraRcvrs == true)
				$viewPort.find(".pages").flip("refresh");
			// TODO: 檢查是否異動, 並提示警告
			$.modal.close();
		});
		
		var $list = $dlg.find("#mailMergeList");
		
		var vars = [];
		var colWidths = [];
		var mailMergeTable = undefined;
		function doPopulate(idx, node) {
			/* 1140729 Raymond 1140381 改成列出抄本受文者但隱藏
			// 1111006 Raymond 陸委會序324 修正多稿轉出分繕變數表, 比照一代不列出抄本受文者
			if($(node).attr("本別") == "抄本")
				theLogger.log("忽略抄本" + node.tagName + "(" + $(node).find("全銜").text() + ")");
			else*/
			if(node.tagName == "受文者") {
				var $li = $("<li class='ui-table-item'></li>");
				$("<div class='ui-table-column-item'>" + (idx + 1) + "</div>").appendTo($li).css("width", colWidths[0]);
				// 1140729 Raymond 1140381 受文者欄DIV指定為一個變數
				// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
				// $("<div class='ui-table-column-item'>" + $(node).find("全銜").text() + "</div>").appendTo($li).css("width", colWidths[1])	//2017.01.19	Leslie	配合一代行為，由"正式名稱"改用"全銜"
				//$("<div class='ui-table-column-item'>" + HtmlEncode($(node).find("全銜").text()) + "</div>").appendTo($li).css("width", colWidths[1])	//2017.01.19	Leslie	配合一代行為，由"正式名稱"改用"全銜"
				var $divNm = $("<div class='ui-table-column-item'>" + HtmlEncode($(node).find("全銜").text()) + "</div>").appendTo($li).css("width", colWidths[1])	//2017.01.19	Leslie	配合一代行為，由"正式名稱"改用"全銜"
					//.data("extraAttrs", {"fullName": $(node).find("正式名稱").text(), "userName": $(node).find("姓名").text(), "sn": $(node).attr("編號")});	// 1080218 Raymond 1080089 新增額外屬性記錄"正式名稱", "姓名", "編號"
					.data("extraAttrs", {"fullName": $(node).find("正式名稱").text(), "userName": $(node).find("姓名").text(), "sn": $(node).attr("編號"), "issueType": $(node).attr("本別")});	// 1090110 Raymond 1081141 新增額外屬性記錄"本別"
				// $("<div class='ui-table-column-item'>" + $(node).attr("本別") + "</div>").appendTo($li).css("width", colWidths[2]);
				$("<div class='ui-table-column-item'>" + HtmlEncode($(node).attr("本別")) + "</div>").appendTo($li).css("width", colWidths[2]);
				// 1140729 Raymond 1140381 改成列出抄本受文者但隱藏
				if($(node).attr("本別") == "抄本")
					$li.hide();
				if(mailMergeTable)
					// 1080218 Raymond 1080089 分繕表物件新增find2方法, 傳入"全銜", "正式名稱", "姓名", "編號"完整屬性參數取代只有"全銜"的舊方法find
					//var ri = mailMergeTable.find("受文者", $(node).find("全銜").text());	//2017.01.19	Leslie	配合一代行為，由"正式名稱"改用"全銜"
					var ri = mailMergeTable.find2("受文者", {name:$(node).find("全銜").text(), fullName:$(node).find("正式名稱").text(), userName:$(node).find("姓名").text(), sn:$(node).attr("編號")});
				for(var i=0; i<vars.length; i++) {
					var $inp = $("<div class='ui-table-column-item'><input></div>").appendTo($li).find("INPUT").css("width", colWidths[i+3]);
					if(mailMergeTable && ri >= 0)
						$inp.val(mailMergeTable.get(ri, i + 1));
				}
				// 1140729 Raymond 1140381 若有附件分繕設定則寫入受文者欄DIV的一個data變數
				if(mailMergeTable && ri >= 0) {
					let dAtt = mailMergeTable.getAtt(ri);
					console.log(`記錄#${ri}已設定附件分繕的值為data('dispAtt'):`, dAtt);
					$divNm.data("dispAtt", dAtt);
				}
				$li.appendTo($list);
			}
			else if(node.tagName == "受文者列表") {
				var $li = $("<li class='ui-table-item'></li>");
				$("<div class='ui-table-column-item'>" + (idx + 1) + "</div>").appendTo($li).css("width", colWidths[0]);
				// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
				// $("<div class='ui-table-column-item'>" + $(node).find("文字").text() + "</div>").appendTo($li).css("width", colWidths[1])
				$("<div class='ui-table-column-item'>" + HtmlEncode($(node).find("文字").text()) + "</div>").appendTo($li).css("width", colWidths[1])
					//.data("extraAttrs", {"fullName": "", "userName": "", "sn": $(node).attr("編號")});	// 1080218 Raymond 1080089 新增額外屬性記錄"正式名稱", "姓名", "編號"
					.data("extraAttrs", {"fullName": "", "userName": "", "sn": $(node).attr("編號"), "issueType": $(node).attr("本別")});	// 1090110 Raymond 1081141 新增額外屬性記錄"本別"
				// $("<div class='ui-table-column-item'>" + $(node).attr("本別") + "</div>").appendTo($li).css("width", colWidths[2]);
				$("<div class='ui-table-column-item'>" + HtmlEncode($(node).attr("本別")) + "</div>").appendTo($li).css("width", colWidths[2]);
				if(mailMergeTable)
					// 1080218 Raymond 1080089 分繕表物件新增find2方法, 傳入"全銜", "正式名稱", "姓名", "編號"完整屬性參數取代只有"全銜"的舊方法find
					//var ri = mailMergeTable.find("受文者", $(node).find("文字").text());
					var ri = mailMergeTable.find2("受文者", {name:$(node).find("文字").text(), fullName:"", userName:"", sn:$(node).attr("編號")});
				for(var i=0; i<vars.length; i++) {
					var $inp = $("<div class='ui-table-column-item'><input></div>").appendTo($li).find("INPUT").css("width", colWidths[i+3]);
					if(mailMergeTable && ri >= 0)
						$inp.val(mailMergeTable.get(ri, i + 1));
				}
				$li.appendTo($list);
			}
			else
				theLogger.log("忽略'" + node.tagName + "'");
		}
		// 儲存
		$dlg.find("a#save").on('click', function() {
			if(mailMergeTable)	// 先清除原資料
				mailMergeTable.clear();
			$list.find("li.ui-table-item").each(function(idx, li) {
				$(li).find("div.ui-table-column-item").each(function(idx2, div) {
					if(idx2 == 1) {	// 受文者
						var v = $(div).text();
						if(mailMergeTable) {
							// 1080218 Raymond 1080089 改用新增的add2方法, 故只要使用過多稿轉出的儲存功能, 儲存時就會自動儲存為新版結構
							//mailMergeTable.add(v);
							var exa = $(div).data("extraAttrs");
							mailMergeTable.add2(v, exa.fullName, exa.userName, exa.sn);
						}
					}
					else if(idx2 > 2) {	// 各變數
						var v = $(div).find("input").val();
						if(mailMergeTable)
							mailMergeTable.set(idx, vars[idx2 - 3].key, v);
					}
				});
			});
			// 1090206 Raymond 1070503 合併一代共通版也提供的CDC需求(1000194)的'正副本取代模式'功能
			if(specialMode == true) {
				try {
					thisDM.attr("/*/@正副本取代模式", "True");
				}
				catch(e) {}
			}
			// 1090206 Raymond 1070503 若有從匯入CSV新增了額外受文者, 要重新整理文稿頁面
			if(addExtraRcvrs == true) {
				// 1140728 Raymond 1140381 設立需異動附件分繕旗標
				thisDM.needSaveDispatchAtt(true);
				$viewPort.find(".pages").flip("refresh");	// 先重新整理文稿頁面
				if(navigator.userAgent.search(/Mobile/gi) < 0 && "showReceiverSetting" in nsEditor) {	// 再開啟受文者子視窗
					nsEditor.showReceiverSetting(thisDM, function() {	// callback也會重新整理文稿頁面, 但若在受文者子視窗按取消則不會叫用callback
						thisDM.needRetransFO(true);
						$viewPort.find(".pages").flip("refresh");
					});
				}
				// 1140728 Raymond 1140381 關閉多稿轉出子視窗時, 檢查若有附件分繕設定, 且有異動, 則提示訊息後開啟附件管理子視窗
				else if(!!nsEditor && !!nsEditor.checkHasDispatchAttAndChanged) {
					nsEditor.checkHasDispatchAttAndChanged(thisDM);
				}
			}
			// TODO: 詢問是否關閉子視窗
			$.modal.close();
		});
		// 轉出
		$dlg.find("a#ok").on('click', function() {
			// 1070411 Raymond 1070431 修正未按儲存即轉出時不會套用變數問題
			if(mailMergeTable)	// 先清除原資料
				mailMergeTable.clear();
			// 1090110 Raymond 1081141 修正讀取「轉出包含副本受文者」選項是否勾選
			var incCopy = $dlg.find("#incCopy").prop("checked");
			var rcvrs = [];
			$list.find("li.ui-table-item").each(function(idx, li) {
				$(li).find("div.ui-table-column-item").each(function(idx2, div) {
					if(idx2 == 1) {	// 受文者
						// 1080219 Raymond 1080089 修改為完整"全銜", "正式名稱", "姓名", "編號"
						//var v = $(div).text();
						var exa = $(div).data("extraAttrs");
						var v = {name: $(div).text(),
								fullName: exa.fullName,
								userName: exa.userName,
								sn: exa.sn};
						// 1090110 Raymond 1081141 修正若未勾選「轉出包含副本受文者」則略過本別為'副本'的受文者
						if(!incCopy && exa.issueType == "副本")
							theLogger.log("多稿轉出排除副本受文者'" + exa.fullName + "'");
						// 1140729 Raymond 1140381 新增略過隱藏的受文者(抄本)
						else if(!$(li).is(":visible"))
							theLogger.log("多稿轉出排除隱藏的(抄本)受文者'" + exa.fullName + "'");
						else
						rcvrs.push(v);
						// 1070411 Raymond 1070431 修正未按儲存即轉出時不會套用變數問題
						if(mailMergeTable) {
							// 1080218 Raymond 1080089 改用新增的add2方法
							//mailMergeTable.add(v);
							mailMergeTable.add2(v.name, v.fullName, v.userName, v.sn);
						}
					}
					else if(idx2 > 2) {	// 各變數
						var v = $(div).find("input").val();
						if(mailMergeTable)
							mailMergeTable.set(idx, vars[idx2 - 3].key, v);
					}
				});
			});
			// 1070411 Raymond 新增成功時若done在for-loop中觸發會因i未+1而不等於rcvrs.length, 導致不會更新頁籤及翻至新增文稿的問題
			var lastDraftIdx = 0, deferreds = [];
			// 1130808 Raymond 1121009 新增比照一代公文製作的行為複製來源文稿的附件到多稿轉出的新增文稿
			var newDraftIndex = [];
			for(var i=0; i<rcvrs.length; i++) {
				var mailMergedXml = thisDM.accquireMailMergedXml(rcvrs[i]);
				var str = Util.getXml(mailMergedXml);
				// 1090110 Raymond 1081141 改呼叫新增的newDraftByMailMerge方法, 不會再跑一次onNewDraftExt, 也就不會多一組重複的來文機關或承辦單位受文者
				// 1070411 Raymond 改用deferreds收集非同步新增文稿, 並記錄最後一個新增的文稿序
				/*model.newDraft(str).done(function(idx) {
					if(i == rcvrs.length)	//2017.01.13	buxFix 修正判斷條件應等於其Length
						view.updateDraftTags(idx);
				});*/
				//deferreds.push(model.newDraft(str).done(function(idx) {
				deferreds.push(model.newDraftByMailMerge(str).done(function(idx) {
					lastDraftIdx = Math.max(lastDraftIdx, idx);
					// 1130808 Raymond 1121009 新增比照一代公文製作的行為複製來源文稿的附件到多稿轉出的新增文稿
					newDraftIndex.push(idx);
				}));
			}
			// 1130808 Raymond 1121009 新增比照一代公文製作的行為複製來源文稿的附件到多稿轉出的新增文稿
			var srcAttInfos = [], dlAttBlob = {}, wfio = new WebFileIO(model.fileIOWS);
			for(var j=0, n=thisDM.getAttachFileCounts(); j<n; j++) {
				var nd = thisDM.getAttachFile(j);
				if(!!nd) {
					var $nd = $(nd);
					srcAttInfos.push({
						nm: $nd.attr("附件名"),
						desc: $nd.attr("摘要"),
						size: $nd.attr("大小"),
						guid: thisDM.getAttachGUID(j),
						hash: thisDM.getAttachHash(j),
						fname: HtmlEncode($nd.text()),	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
						blbNm: $nd.attr("data-blob-name"),
						cusName: $nd.attr("標籤名稱")
					});
				}
			}
			function dlSrcAttFile(idx) {
				if(idx == srcAttInfos.length) {
					theLogger.log("來源文稿的已上傳附件已全部下載完成, 開始處理轉出的新文稿的附件");
					reAddAttachFiles(0);
				}
				else {
					if(!srcAttInfos[idx].blbNm || !srcAttInfos[idx].blbNm.match(/^blob:/)) {
						theLogger.log("下載已上傳過的非BLOB附件 - '" + srcAttInfos[idx].nm + "', '" + srcAttInfos[idx].desc + "', '"  + srcAttInfos[idx].fname + "', " + srcAttInfos[idx].size + "Bytes, " + srcAttInfos[idx].guid + ", " + srcAttInfos[idx].hash, "color:blue;", "color:black");
						wfio.download(thisDM.getDraftDirPath(), srcAttInfos[idx].fname, {
							keepRawData: true,	// 保持原始資料格式(Typed Array)
							success: function(fil, all) {
								var blb = new Blob([fil], {type: "application/octet-stream"});
								theLogger.log("下載'" + srcAttInfos[idx].fname + "'成功!", "color:blue;", "color:black");
								if(!!dlAttBlob[srcAttInfos[idx].fname])
									theLogger.error("'" + srcAttInfos[idx].fname + "'已下載過!? blob=" + dlAttBlob[srcAttInfos[idx].fname]);
								//1140723	Leslie[1141011]	弱掃修正[Client DOM XSS]
								// dlAttBlob[srcAttInfos[idx].fname] = URL.createObjectURL(blb);
								//1140801	Leslie[1141011]	弱掃修正[Client DOM XSS]
								// dlAttBlob[srcAttInfos[idx].fname] = encodeURI(URL.createObjectURL(blb));
								var re = new RegExp(`blob:${location.protocol}//${location.host}/[0-9a-z]{8,8}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{12,12}`);
								var reUrl = re.exec(URL.createObjectURL(blb))[0];
								dlAttBlob[srcAttInfos[idx].fname] = encodeURI(reUrl);
								dlSrcAttFile(idx+1);
							},
							error: function(errorText) {
								theLogger.error("下載'" + srcAttInfos[idx].fname + "'失敗! " + errorText);
							}
						});
					}
					else
						dlSrcAttFile(idx+1);
				}
			}
			function reAddAttachFiles(idx) {
				if(idx == newDraftIndex.length) {
					theLogger.log("新文稿的附件已全部處理完成, 切換顯示為最後一筆新增文稿的頁面");
					view.updateDraftTags(lastDraftIdx);
					if(SSO_CONFIG.enableConvertAttPage) {	// 判斷是否啟用附件匯出頁面設定
						view.proceedRndrAtt();	// proceedRndrAtt()會在附件匯出頁面後更新頁籤
					}
				}
				else {
					model.accquireDraftModel(newDraftIndex[idx]).done(function(newDM) {
						if(newDM.getAttachFileCounts() > 0) {
							newDM.emptyAttachFiles();
							for(var j=0; j<srcAttInfos.length; j++) {
								console.log("新增附件至新文稿", srcAttInfos[j]);
								var fileObj = {
									blbName: srcAttInfos[j].blbNm,
									idx: j,
									desc: srcAttInfos[j].desc,
									size: srcAttInfos[j].size,
									name: srcAttInfos[j].nm,
									fileName: srcAttInfos[j].fname,
									guid: undefined,
									hash: srcAttInfos[j].hash,
									hasDocNo: model.getDocNo().length > 0,
									isNew: true,
									isBW: undefined,
									cusName: srcAttInfos[j].cusName};
								if(!srcAttInfos[j].blbNm || !srcAttInfos[j].blbNm.match(/^blob:/)) {
									var blbNm = dlAttBlob[srcAttInfos[j].fname];
									if(!!blbNm)
										fileObj.blbName = blbNm;
									else
										theLogger.error("未下載已上傳的來源文稿的附件'" + srcAttInfos[j].fname + "'!?");
								}
								newDM.addAttachFile(fileObj);
							}
							newDM.commitAttachFiles();
						}
						reAddAttachFiles(idx+1);	// 處理下一筆新增的文稿
					});
				}
			}
			// 1070411 Raymond deferreds全部新增完後, 再更新文稿頁籤
			if(deferreds.length > 0) {
				$.when.apply(this, deferreds).done(function() {
					// 1130808 Raymond 1121009 新增比照一代公文製作的行為複製來源文稿的附件到多稿轉出的新增文稿
					if(newDraftIndex.length > 0 && srcAttInfos.length > 0)
						dlSrcAttFile(0);
					else
					view.updateDraftTags(lastDraftIdx);
				});
				$.modal.close();	// 關閉子視窗
			}
		});
		// 匯入CSV
		$dlg.find("a#importCSV").on('click', function() {
			var hdrs = [];
			var recs = [];
			function parseLine(txt, firstLine) {
				var i = 0, rec = [];
				while(txt.length > 0) {
					var sep = txt.indexOf(",");
					if(sep >= 0) {
						var word = txt.substr(0, sep);
						rec[i++] = word;
						txt = txt.substr(sep + 1);
						// 若字首是「"」且字尾有「",」則表示這個字有半形逗號在內用雙引號包起來了
						if(word.match(/^"/) && txt.match(/",/g)) {
							theLogger.log("處理以雙引號包起來的字");
							sep = txt.search(/",/g);
							theLogger.log("sep=" + sep);
							word = word.substr(1) + "," + txt.substr(0, sep);
							rec[i-1] = word;
							txt = txt.substr(sep + 2);
						}
						else if(word.match(/^"/) && txt.match(/"$/)) {
							theLogger.log("處理以雙引號包起來的字(末)");
							sep = txt.search(/"$/);
							word = word.substr(1) + "," + txt.substr(0, sep);
							rec[i-1] = word;
							txt = txt.substr(sep + 1);
						}
					}
					else {
						rec[i++] = txt;
						break;
					}
				}
				if(firstLine)
					hdrs = rec;
				else
					recs.push(rec);
			}
			function parseCSV(txt) {
				var firstLine = true;
				while(txt.length > 0) {
					var lbrk = txt.indexOf("\r\n");
					if(lbrk >= 0) {
						var ln = txt.substr(0, lbrk);
						if(firstLine) {
							parseLine(ln, firstLine);
							firstLine = false;
						}
						else
							parseLine(ln);
						txt = txt.substr(lbrk + 2);
					}
					else {
						lbrk = txt.indexOf("\r");
						if(lbrk < 0)
							lbrk = txt.indexOf("\n");
						if(lbrk >= 0) {
							var ln = txt.substr(0, lbrk);
							if(firstLine) {
								parseLine(ln, firstLine);
								firstLine = false;
							}
							else
								parseLine(ln);
							txt = txt.substr(lbrk + 1);
						}
						else {
							if(firstLine) {
								parseLine(txt, firstLine);
								firstLine = false;
							}
							else
								parseLine(txt);
							break;
						}
					}
				}
				// 1090206 Raymond 1070503 合併一代共通版也提供的CDC需求(1000194)的'正副本取代模式'功能
				var shallRefreshList = false;
				var c1 = hdrs.indexOf("正本"),
					c2 = hdrs.indexOf("副本");
				if(c1 >= 0 && c2 >= 0)
					theLogger.warn("匯入工作表含'正本'(" + c1 + "欄)及'副本'(" + c2 + "欄), 啟用正副本取代功能!");
				else if(c1 >= 0)
					theLogger.warn("匯入工作表含'正本'(" + c1 + "欄), 啟用正副本取代功能!");
				else if(c2 >= 0)
					theLogger.warn("匯入工作表含'副本'(" + c2 + "欄), 啟用正副本取代功能!");
				if(c1 >= 0 || c2 >= 0) {
					var shallAddExtraColumn = true;
					for(var i=0; i<vars.length; i++) {
						if(vars[i].key == "正本" || vars[i].key == "副本") {
							shallAddExtraColumn = false;
							break;
						}
					}
					if(shallAddExtraColumn) {
						alert("匯入的XLS檔包含了'正本'、'副本'，這將使本文稿啟用'正副本取代模式'，這個模式轉換為不可逆的。\r\n若不想啟用這個模式，請不要儲存並取消本次多稿轉出作業，將CSV檔中'正本'及'副本'欄刪除或更名後，再次執行多稿轉出作業的匯入CSV功能。");
						theLogger.log("新增'正本'、'副本'分繕變數");
						var n = vars.length;
						vars.push({key:"正本"});
						vars.push({key:"副本"});
						for(var i=n; i<vars.length; i++) {
							$('<div class="ui-table-column-header" style="width:150px">' + vars[i].key + '</div>').appendTo($dlg.find("#mailMergeTable .ui-table-header"));
							colWidths.push(154);
						}
						var w = (vars.length * 154) + 330;
						$dlg.find(".ui-table-header, .ui-table-body-container").css("width", w + "px");
						
						$list.find("li.ui-table-item").each(function(idx, li) {
							$("<div class='ui-table-column-item'><input></div>").appendTo(li).find("INPUT").css("width", colWidths[n+3]);
							$("<div class='ui-table-column-item'><input></div>").appendTo(li).find("INPUT").css("width", colWidths[n+4]);
						});
						
						specialMode = true;	// 設定啟用正副本取代模式, 按儲存時才會寫入文稿
						shallRefreshList = true;	// 加入新欄位要刷新
					}
				}
				// 1090206 Raymond 1070503 合併一代共通版也提供的CDC需求(1000194)的可加入額外受文者功能
				var c0 = hdrs.indexOf("受文者");
				var c3 = hdrs.indexOf("本別");		// 1110321 Raymond 1110216 本別欄位索引值提前取得
				if(c0 >= 0) {
					var rcvList = $(thisDM.accquireXml().documentElement).find("> 受文者列表");
					if(rcvList.length) {
						var extraRcvrs = [];
						for(var i=0; i<recs.length; i++) {
							var recNm = recs[i][c0];
							var rcvrExists = false;
							rcvList.eq(0).find("受文者").each(function(idx, node) {
								if(node.tagName == "受文者") {
									if(recNm == $(node).find("全銜").text()) {
										rcvrExists = true;
										return false;	// break each-loop
									}
								}
							});
							if(!rcvrExists) {
								theLogger.log("須新增'" + recNm + "'受文者");
								extraRcvrs.push(i);
							}
						}
						if (extraRcvrs.length > 0 &&
							confirm("匯入的CSV檔包含了'" + recs[extraRcvrs[0]][c0] + "'...等額外" + extraRcvrs.length + "個受文者,\r\n是否新增至受文者列表中?")) {
							theLogger.log("匯入CSV, 使用者選擇要新增受文者...");
							// 計算最後的編號
							gDept_SeqNo = rcvList.attr("編號");
							if(!gDept_SeqNo)	//無編號屬性
								gDept_SeqNo = 1;
							else
								gDept_SeqNo = parseInt(gDept_SeqNo);
							//var c3 = hdrs.indexOf("本別");		// 一代可由XLS/CSV額外匯入新增受文者的本別、郵遞區號、地址及發文方式 1110321 Raymond 1110216 本別欄位索引值提前取得, 後面還要用
							var c4 = hdrs.indexOf("郵遞區號");
							var c5 = hdrs.indexOf("地址");
							var c6 = hdrs.indexOf("發文方式");
							var idx = $list.find("li.ui-table-item").length;
							var dom = rcvList.get(0).ownerDocument;
							function addElem(tag, val, container) {
								var nd = dom.createElement(tag);
								if("text" in nd)
									nd.text = val;
								else
									nd.textContent = val;
								container.appendChild(nd);
							}
							for(var i=0; i<extraRcvrs.length; i++) {
								var newRcvr = dom.createElement("受文者");
								newRcvr.setAttribute("本別", (c3 >= 0)?recs[extraRcvrs[i]][c3]:"正本");// CSV檔未設定本別欄的話, 額外新增的受文者預設為正本
								newRcvr.setAttribute("CreateSN", thisDM.getEditSN());
								newRcvr.setAttribute("編號", gDept_SeqNo.toString());
								gDept_SeqNo++;
								addElem("全銜", recs[extraRcvrs[i]][c0], newRcvr);
								addElem("正式名稱", recs[extraRcvrs[i]][c0], newRcvr);
								addElem("機關代碼", "", newRcvr);
								addElem("單位代碼", "", newRcvr);
								addElem("姓名", "", newRcvr);
								addElem("地址", (c5 >= 0)?recs[extraRcvrs[i]][c5]:"", newRcvr);
								addElem("郵遞區號", (c4 >= 0)?recs[extraRcvrs[i]][c4]:"", newRcvr);
								addElem("FEP交換代碼", "", newRcvr);
								//1110929	Joe		1111025		修改發文方式預設值為郵寄
								// addElem("發文方式", (c6 >= 0)?recs[extraRcvrs[i]][c6]:"人工傳遞", newRcvr);
								addElem("發文方式", (c6 >= 0)?recs[extraRcvrs[i]][c6]:"郵寄", newRcvr);
								// 1140728 Raymond 1140381 新增若有附件分繕設定, 則新增受文者一律不含附件
								if(mailMergeTable?.hasDispatchAtt())
									addElem("含附件", "否", newRcvr);
								else
								addElem("含附件", (c3 >= 0)?(recs[extraRcvrs[i]][c3].match(/正本|主持人/)?"是":"否"):"是", newRcvr);
								addElem("櫃號", "", newRcvr);
								addElem("匣道", "", newRcvr);
								addElem("SYSID", "", newRcvr);
								addElem("Email", "", newRcvr);
								addElem("內部", "", newRcvr);
								addElem("海外單位", "", newRcvr);
								addElem("國別", "", newRcvr);
								addElem("郵寄地區", "", newRcvr);
								addElem("內部單位代碼", "", newRcvr);
								addElem("電子交換現況", "", newRcvr);
								rcvList.get(0).appendChild(newRcvr);
								
								var $li = $("<li class='ui-table-item'></li>");
								$("<div class='ui-table-column-item'>" + (++idx) + "</div>").appendTo($li).css("width", colWidths[0]);
								// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
								// $("<div class='ui-table-column-item'>" + $(newRcvr).find("全銜").text() + "</div>").appendTo($li).css("width", colWidths[1])
								$("<div class='ui-table-column-item'>" + HtmlEncode($(newRcvr).find("全銜").text()) + "</div>").appendTo($li).css("width", colWidths[1])
									.data("extraAttrs", {"fullName": $(newRcvr).find("正式名稱").text(), "userName": $(newRcvr).find("姓名").text(), "sn": $(newRcvr).attr("編號")});
								// $("<div class='ui-table-column-item'>" + $(newRcvr).attr("本別") + "</div>").appendTo($li).css("width", colWidths[2]);
								$("<div class='ui-table-column-item'>" + HtmlEncode($(newRcvr).attr("本別")) + "</div>").appendTo($li).css("width", colWidths[2]);
								for(var j=0; j<vars.length; j++) {
									$("<div class='ui-table-column-item'><input></div>").appendTo($li).find("INPUT").css("width", colWidths[j+3]);
								}
								$li.appendTo($list);
							}
							rcvList.attr("編號", gDept_SeqNo.toString());
							/* 不能在Modal再ShowModal
							if(!!nsEditor && "showReceiverSetting" in nsEditor) {
								nsEditor.showReceiverSetting(thisDM, function() {
									thisDM.needRetransFO(true);// 因為是直接改rawXml, 所以要主動通知DraftModel重新套用PrintXSL, 否則排版不會變
									$("#aol #leftPart .pages").flip("refresh");
								});
							}*/
							thisDM.needRetransFO(true);	// 1090206 Raymond 1070503 設定DraftModel應重新套用PrintXSL, 否則重新整理不會有變化
							addExtraRcvrs = true;	// 1090206 Raymond 1070503 設定新增額外受文者, 關閉子視窗時重新整理文稿頁面
							shallRefreshList = true;	// 加入新受文者要刷新
						}
					}
				}
				if(shallRefreshList)	// 刷新清單
					$list.trigger("create");
				
				$list.find("li.ui-table-item").each(function(idx, li) {
					var rec = null;
					$(li).find("div.ui-table-column-item").each(function(idx2, div) {
						if(idx2 == 1) {	// 受文者
							var rcvr = $(div).text(), found = false;
							// 找受文者
							for(var i=0; i<recs.length; i++) {
								// 1110321 Raymond 1110216 新增判斷若CSV同時有受文者及本別, 則以受文者+本別為KEY來判斷受文者是否同一個, 以修正同名受文者分別為正、副本的情況, 後者本別受文者的變數寫成前者本別受文者的內容的問題
								if(c0 >= 0 && c3 >= 0) {
									var issueType = $(div).next().text();
									if(recs[i][c0] == rcvr && recs[i][c3] == issueType) {
										theLogger.log("找到本別(" + c3 + ")受文者(" + c0 + ")'" + issueType + " " + rcvr + "'的CSV ROW(" + i + ")");
										rec = recs[i];
										found = true;
										break;
									}
								}
								else
								// 1110125 Raymond 1110137 修正第2筆以後紀錄的受文者欄內容若與第1筆的正/副本欄一致, 其後續欄位內容會誤設為第1筆的欄位內容的問題
								if(c0 >= 0) {
									if(recs[i][c0] == rcvr) {
										theLogger.log("找到受文者(" + c0 + ")'" + rcvr + "'的CSV ROW(" + i + ")");
										rec = recs[i];
										found = true;
										break;
									}
								}
								else {
								for(var j=0; j<recs[i].length; j++) {
									if(recs[i][j] == rcvr) {
										theLogger.log("找到受文者(" + j + ")'" + rcvr + "'的CSV ROW(" + i + ")");
										rec = recs[i];
										found = true;
										break;
									}
								}
								}
								if(found)
									break;
							}
							if(!found)
								theLogger.warn("找不到受文者'" + rcvr + "'在CSV的記錄");
						}
						else if(idx2 > 2) {	// 各變數
							if(rec != null) {
								// 在ROW中找變數
								var k = vars[idx2 - 3].key, idx3 = -1;
								for(var i=0; i<hdrs.length; i++) {	// 先找欄位索引
									if(hdrs[i] == k) {
										idx3 = i;
										break;
									}
								}
								if(idx3 < 0) {
									theLogger.warn("CSV中找不到此變數欄位'" + k + "'");
								}
								else {
									if(idx3 < rec.length) {
										theLogger.log("CSV欄位[" + k + "](索引值:" + idx3 + ")為'" + rec[idx3] + "'");
										$(div).find("input").val(rec[idx3]);
									}
									else
										theLogger.warn("CSV欄位[" + k + "]索引值(" + idx3 + ")超出記錄數目");
								}
							}
						}
					});
				});
			}
			
			var $inp = $("<input type='file' accept='csv' style='display:none;'>").appendTo($viewPort.closest("#aol"));
			$inp.on('change', function() {
				if(this.files.length == 1) {
					var rdr = new FileReader();
					var that = this.files[0];
					rdr.onload = function() {
						theLogger.log(this.result);
						theLogger.log(SSOUtil.typeOf(this.result));
						if(SSOUtil.typeOf(this.result) == "string") {
							// 1090206 Raymond 1070503 偵測是否編碼錯誤
							if(this.result.indexOf('��') >= 0) {
								theLogger.warn("偵測到讀入檔案的編碼非UTF-8, 改以Big5編碼方式重新載入...");
								rdr.readAsText(that, "Big5");
							}
							else {
								parseCSV(this.result);
								$inp.remove();
							}
						}
						else
							theLogger.error("檔案讀取後不是字串!");
					}
					theLogger.log("載入'" + this.files[0].name + "'(" + this.files[0].type + ", " + this.files[0].size + "bytes)");
					rdr.readAsText(this.files[0]);
				}
				else {
					theLogger.error("未選取檔案!");
				}
			}).trigger('click');
		});
		// 匯出CSV
		$dlg.find("a#exportCSV").on('click', function() {
			// 1080826 Raymond 1080733 修正匯出CSV後編碼無BOM, 導致EXCEL開啟時變成亂碼的問題
			//var res = "受文者,本別";
			var res = "\uFEFF受文者,本別";
			for(var i=0; i<vars.length; i++)
				res += "," + vars[i].key;
			$list.find("li.ui-table-item").each(function(idx, li) {
				$(li).find("div.ui-table-column-item").each(function(idx2, div) {
					if(idx2 == 1) {	// 受文者
						res += "\r\n" + $(div).text();
					}
					else if(idx2 == 2) {	// 本別
						res += "," + $(div).text();
					}
					else if(idx2 > 2) {	// 各變數
						var v = $(div).find("input").val();
						if(v.match(/,/g))	// 內容有半形逗號要用"包起來
							res += ",\"" + v + "\"";
						else
							res += "," + v;
					}
				});
			});
			var fname = model.getDraftFileName(draftIdx);
			fname = fname.replace("-tc.xml", ".csv");
			var blob = new Blob([res], {type: "application/octet-stream"});
			//1140723	Leslie[1141011]	弱掃修正[Client DOM XSS]
			// var url = URL.createObjectURL(blob);
			//1140801	Leslie[1141011]	弱掃修正[Client DOM XSS]
			// var url = encodeURI(URL.createObjectURL(blob));
			var re = new RegExp(`blob:${location.protocol}//${location.host}/[0-9a-z]{8,8}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{12,12}`);
			var reUrl = re.exec(URL.createObjectURL(blob))[0];
			var url = encodeURI(reUrl);
			//var str = "data:application/octet-stream;base64," + Base64.encode(xml);
			if("msSaveBlob" in navigator)	// IE10/11專屬下載function
				navigator.msSaveBlob(blob, fname);
			else	// Chrome用A的click事件
				$(this).attr("data-role", "none").attr("href", url).attr("rel", "external").attr("data-ajax", "false").attr("download", fname);
		});
		// 設定預設值
		$dlg.find("a#default").on('click', function() {
			$list.find("li.ui-table-item").each(function(idx, li) {
				$(li).find("div.ui-table-column-item").each(function(idx2, div) {
					if(idx2 == 1) {	// 受文者
					}
					else if(idx2 > 2) {	// 各變數
						var v = $(div).find("input").val();
						if(v == "")
							$(div).find("input").val("【" + vars[idx2 - 3].key + "】");
					}
				});
			});
		});
		
		// 初始化
		view.accquireCurrDraftModel().done(function(dm) {
			thisDM = dm;
			var rawXml = dm.accquireXml();
			// 1061225 Raymond 1060929 先轉換為完稿結果的XML, 再搜尋^變數, 以免追蹤修訂標籤影響變數名稱判斷
			//var str = Util.getXml(rawXml);
			var data = rawXml;
			if("transCmplXml" in nsEditor) {
				data = nsEditor.transCmplXml(rawXml);
			}
			var str = Util.getXml(data);
			vars = findVar(str);
			// 1090206 Raymond 1070503 合併一代共通版也提供的CDC需求(1000194)的'正副本取代模式'功能
			try {
				specialMode = dm.attr("/*/@正副本取代模式") == "True";
				if(specialMode) {
					theLogger.warn("本文稿已啟用'正副本取代模式'!");
					vars.push({key:"正本"});
					vars.push({key:"副本"});
				}
			}
			catch(e) {
				// 找不到'正副本取代模式'屬性, 即為未設定
			}
			for(var i=0; i<vars.length; i++) {
				$('<div class="ui-table-column-header" style="width:150px">' + vars[i].key + '</div>').appendTo($dlg.find("#mailMergeTable .ui-table-header"));
			}
			var w = (vars.length * 154) + 330;
			$dlg.find(".ui-table-header, .ui-table-body-container").css("width", w + "px");
			
			var rcvList = $(rawXml.documentElement).find("> 受文者列表");
			if(rcvList.length) {
				$dlg.find(".ui-table-header .ui-table-column-header").each(function(i, elem) {
					colWidths.push($(elem).css("width"));
				});
				mailMergeTable = dm.accquireMailMergeTable();
				rcvList.eq(0).find("受文者").each(doPopulate);	//2017.01.19	Leslie	改用find取得所有受文者(含群組內的)
			}
			$.modal($dlg, {
				appendTo: $viewPort.closest(".ui-pane-a, .ui-pane-b"),
				overlayCss: {width: w, height: h},
				containerCss: {width: "840px", height: "500px"},
				onShow: function() {
					$dlg.trigger("create");
					
					$dlg.find("#incCopy").closest(".ui-checkbox").css({display:"inline-block", verticalAlign:"bottom"});
				}
			});
		})
		.fail(function(errorText) {
			alert(errorText);
		});
	});
};

// 提示翻頁對話盒, 從UniView.html複製來的
function promptGoToPage($viewPort, cntPage, currPo) {
	var $dlg = $("#uvGoToPageDialog");
	var _dfd = $.Deferred();
	
	function _onCancelClick() {
		var rtnObj = {success:true, userCancel:true};
		_dfd.resolve(rtnObj);
		$dlg.popup('close');
	}
	
	function _onOKClick() {
		
		var pageIndex = -1;
		var sGotoPageNo = $dlg.find('input#gotoPageNo').val();
		if (typeof sGotoPageNo=='string' && sGotoPageNo.length) {
			pageIndex = parseInt(sGotoPageNo);
			if (isNaN(pageIndex)) {
				pageIndex = -1;
			}
			else if ((pageIndex<1) || (pageIndex>cntPage)) {
				pageIndex = -1;
			}
			else  {
				pageIndex -= 1;
			}
		}
		
		var rtnObj;
		if (pageIndex>=0) {
			//var _newPos = {
			//	draftIdx: currPos.draftIdx,
			//	attIdx: currPos.attIdx,
			//	po: pageIndex };
			rtnObj = {success:true, userCancel:false, newPo:pageIndex};
			_dfd.resolve(rtnObj);
		}
		else {
			alert('輸入的頁序: ' + sGotoPageNo + ' 不正確, 請修正後重試!');
			return;
		}
		
		$dlg.popup('close');
	}
	
	$(document).on('popupafteropen', '#uvGoToPageDialog', function(event, ui) {
	});
	
	$(document).on('popupcreate', '#uvGoToPageDialog', function(event, ui) {
		// why not been called? ahhhhhh ahhhhh ahhhh....
	});
	
	// 結束後清除 selectmenu object
	$dlg.on('popupafterclose', function(event, ui) {
		$dlg.find('#btn_uvGotoPageCancel').off('click', _onCancelClick);
		$dlg.find('#btn_uvGotoPageOK').off('click', _onOKClick);
	});
	
	$dlg.find('#btn_uvGotoPageCancel').on('click', _onCancelClick);
	$dlg.find('#btn_uvGotoPageOK').on('click', _onOKClick);
	
	var sRange = '[1 - ' + cntPage + ']';
	$dlg.find('span#rangeHint').text(sRange);
	$dlg.find('input#gotoPageNo').val(currPo+1); // 預設目前頁次
	
	var _options = {corners: false, history: false, positionTo: 'window' }; 
	$dlg.popup(_options);
	$dlg.popup('open', _options);
	return _dfd.promise();
}

// (文稿)跳頁
nsEditor.onGoToDraftPageVisible = function(view, model, draftIdx) {
	return model.getDraftPageCounts(draftIdx) >= 1;
};

nsEditor.onGoToDraftPage = function(view, model, draftIdx) {
	var $viewPort = $(this).closest(".viewPort");
	var that = this;
	var totalPages = model.getDraftPageCounts(draftIdx);
	promptGoToPage($viewPort, totalPages, view.currPo())
	.done(function(ret) {
		if(!ret.userCancel) {
			view.goToPage(ret.newPo);
		}
	});
};

// (附件)跳頁
nsEditor.onGoToAttPageVisible = function(view, model, draftIdx, attIdx) {
	return model.getAttPageCounts(draftIdx, attIdx) >= 1;
};

nsEditor.onGoToAttPage = function(view, model, draftIdx, attIdx) {
	var $viewPort = $(this).closest(".viewPort");
	var that = this;
	var totalPages = model.getAttPageCounts(draftIdx, attIdx);
	promptGoToPage($viewPort, totalPages, view.currPo())
	.done(function(ret) {
		if(!ret.userCancel) {
			view.goToPage(ret.newPo);
		}
	});
};

// 另存為自訂範本
nsEditor.onSaveAsSampleVisible = function(view, model, draftIdx) {
	// 1130808 Raymond 1130313 合併1111007(1100394), 離線模式不提供另存為自訂範本功能
	if(!!theSSO && theSSO.offlineMode == true)
		return false;
	// 1090916 Raymond 1090564 信保特殊模式公文不提供此功能
	if(model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
		return false;
	var that = this;
	if(!!nsEditor._sampleRootPath && !!nsEditor._sampleWFIOUrl) {
	}
	else {	// 呼叫WebService取得個人自訂的範本清單
		theWebServices.getPrivateExamples({
			success: function(nd) {
			
				nsEditor._sampleRootPath = $(nd).attr("路徑");
				nsEditor._sampleWFIOUrl = $(nd).attr("WebfileioURL");
				theLogger.log("個人自訂範本的儲存路徑為'" + nsEditor._sampleRootPath + "'(" + nsEditor._sampleWFIOUrl + ")");
				
			},
			error: function(errorText) {
				theLogger.error(errorText);
				alert(errorText);
			}
		});
	}
	return true;
};

nsEditor.onSaveAsSample = function(view, model, draftIdx) {
	var $viewPort = $(this).closest(".viewPort");
	var that = this;
	
	function emptyFieldValue($nd) {
		$nd.each(function(i, nd) {
			if("text" in nd)	// for IE-compatible
				nd.text = "";
			else
				nd.textContent = "";
		});
	}
	function doAdd() {
		promptNewName()
		.done(function(ret) {
			if(ret.success && !ret.userCancel) {
				model.accquireDraftModel(draftIdx)	// 取得目前文稿
					.done(function(dm) {
						// 1060831 Raymond 1060796 修正作為複製來源的文稿, 發文字號也會被清空的問題
						//var sampleDoc = dm.accquireXml();	// 取得目前文稿的XML
						var origDoc = dm.accquireXml();
						// 1071012 Raymond 新增轉換為完稿結果的XML
						if("transCmplXml" in nsEditor) {
							theLogger.log("新增範本前轉為完稿XML...");
							var data = nsEditor.transCmplXml(origDoc);
							var xml = Util.getXml(data, false, "UTF-8");	// 指定encoding屬性為UTF-8, 因為下載後的檔案會變成UTF-8
							if("ActiveXObject" in window) {
								var sampleDoc = new ActiveXObject("MSXML2.DOMDocument");
								sampleDoc.resolveExternals = false;
								sampleDoc.validateOnParse = false;
								sampleDoc.preserveWhiteSpace = true;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題

								var	b = sampleDoc.loadXML(xml);
								if(!b) {
									var pe = sampleDoc.parseError;
									theLogger.error("(IE)載入XML失敗!" + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
									alert("載入完稿XML失敗!" + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
									return;
								}
								else
									theLogger.log("轉換成功!");
							}
							else {
								var sampleDoc = (new DOMParser()).parseFromString(xml, "text/xml");
								if(sampleDoc.getElementsByTagName("parsererror").length > 0) {
									var pe = sampleDoc.getElementsByTagName("parsererror");
									theLogger.error("(Chrome)載入XML失敗!", pe);
									// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
									// alert("載入完稿XML失敗!" + $(pe).html());
									alert("載入完稿XML失敗!" + pe.innerHTML);
									return;
								}
								else
									theLogger.log("轉換成功!");
							}
						}
						else
						if(origDoc instanceof Document) {
							var sampleDoc = origDoc.implementation.createDocument(origDoc.namespaceURI, null, null);
							var newNode = sampleDoc.importNode(origDoc.documentElement, true);
							sampleDoc.appendChild(newNode);
						}
						else if("xml" in origDoc) {
							var sampleDoc = new ActiveXObject("MSXML2.DOMDocument");
							sampleDoc.resolveExternals = false;
							sampleDoc.validateOnParse = false;
							sampleDoc.preserveWhiteSpace = true;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題

							var	b = sampleDoc.loadXML(origDoc.xml);
							if(!b) {
								var pe = sampleDoc.parseError;
								theLogger.error("(IE)載入XML失敗!" + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
								// 1071012 Raymond 修正載入失敗時的反應
								//throw new Error("載入'" + fileName + "'失敗!" + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
								alert("載入原稿XML失敗!" + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
								return;
							}
						}
						// 清空部分欄位
						var $docElm = $(sampleDoc.documentElement);
						emptyFieldValue($docElm.find("發文日期 > 年月日"));
						emptyFieldValue($docElm.find("發文字號 > 字"));
						// 1060830 Raymond 1060796 修正新增自訂範本後, 發文字號/文號下無年度、流水號、支號問題
						//emptyFieldValue($docElm.find("發文字號 > 文號"));
						//emptyFieldValue($docElm.find("發文字號 > 文號 > 年度號"));
						emptyFieldValue($docElm.find("發文字號 > 文號 > 年度"));
						emptyFieldValue($docElm.find("發文字號 > 文號 > 流水號"));
						emptyFieldValue($docElm.find("發文字號 > 文號 > 支號"));
						emptyFieldValue($docElm.find("決行層次"));
						//1121222	Leslie[驗收項目序43]	新增客製化可設定留存自訂範本時，是否保留受文者資訊
						if(!theCustom.getCustomSet("keepCustomSampleIssuerList")){
							$docElm.find("> 受文者列表 > 受文者列表").remove();
							$docElm.find("> 受文者列表 > 受文者").remove();
							$docElm.find("> 受文者列表 > 已刪除").remove();
						}
						//$docElm.find("> 會稿單位列表").children().remove();	// 1081210 Raymond 1080786 合併內政部單號1070657, 另存範本時不要刪除會稿單位, 不然需求描述的匯入範本時若有設定會辦資訊, 須提示是否匯入會辦單位的前提就不可能存在
						// 1070122 Raymond NCKU107153 清空決行層級
						$docElm.find("> 決行層次").attr("決行層級", "");
						
						// 1100917 Raymond 1080763 合併1070348, 新增sampleClass參數
						//theWebServices.addPrivateExample(nsEditor._sampleWFIOUrl, nsEditor._sampleRootPath, ret.sampleName, sampleDoc)
						theWebServices.addPrivateExample(nsEditor._sampleWFIOUrl, nsEditor._sampleRootPath, ret.sampleName, ret.sampleClass, sampleDoc)
						.done(function(m_ID) {
							// 1100917 Raymond 1080763 合併1071123, 設置localStorage旗標, 供MP的範本清單檢查刷新
							localStorage['refreshSampleList'] = "true";
							alert("新增自訂範本成功");
						})
						.fail(function(errorText) {
							alert(errorText);
						});
					})
					.fail(function(errorText) {
						alert(errorText);
					});
			}
		});
	}
	function promptNewName() {
		var $dlg = $("#uvNewSampleDialog");
		var dfd = $.Deferred();
		var _existClasses = [];	// 1100917 Raymond 1080763 合併1070348, 新增
		
		function checkNamingRule(str) {
			if(str.length == 0)
				return "不可為空";
			// 1071112 Raymond 1071070 新增了轉換<>&"'為entity功能, 故不需禁止
			//else if(str.match(/[<>]/g))
			//	return "不可含有'<'、'>'等符號";
			return true;
		}
		
		function _onCancelClick() {
			dfd.resolve({success:true, userCancel:true});
			$dlg.popup('close');
		}
		
		function _onOKClick() {
			
			var newSampleName = $dlg.find('input#newSampleName').val();
			
			var chkRst = checkNamingRule(newSampleName);
			if(typeof chkRst === "string"){
				alert('輸入的名稱: ' + newSampleName + ' ' + chkRst + ', 請修正後重試!');
				return;
			}
			else {
				// 1100917 Raymond 1080763 合併1070348, 新增sampleClass
				// 1071112 Raymond 1071070 新增轉換<>&"'為entity功能
				//dfd.resolve({success:true, userCancel:false, sampleName:newSampleName});
				//dfd.resolve({success:true, userCancel:false, sampleName:escapeXml(newSampleName)});
				var newSampleClass = $dlg.find('select#chooseSampleClass').val();
				if(newSampleClass == "newSampleClass") {
					newSampleClass = $dlg.find("input#newSampleClass").val();
					if(newSampleClass.length == 0) {
						alert("輸入類別名稱不可為空, 請修正後重試!");
						return;
					}
					else if(_existClasses.length > 0 && _existClasses.indexOf(newSampleClass) >= 0) {
						if(!confirm("類別已存在, 是否以現有類別新增?"))
							return;
					}
				}
				chkRst = checkNamingRule(newSampleClass);
				if(typeof chkRst === "string") {
					alert("輸入的類別名稱: " + newSampleClass + " " + chkRst + ", 請修正後重試!");
					return;
				}
				dfd.resolve({success:true, userCancel:false, sampleName:escapeXml(newSampleName), sampleClass:escapeXml(newSampleClass)});
			}
			
			$dlg.popup('close');
		}
		
		// 1100917 Raymond 1080763 合併1070348, 初始化類別選單, callback 改成named function, 以便於close時off
		//$(document).on('popupafteropen', '#uvGoToPageDialog', function(event, ui) {
		//});
		function _onInitDialog(event, ui) {
			theWebServices.getPrivateClass({
				success: function(arr) {
					_existClasses = arr;
					var mnu = $(event.target).find("select#chooseSampleClass").empty();
					for(var i=0; i<arr.length; i++) {
						mnu.append("<option value='" + arr[i] + "'>" + arr[i] + "</option>");
					}
					mnu.append("<option value='newSampleClass' selected>新增</option>");	// 最後加入"新增"項目
					//mnu.selectmenu();
				},
				error: function(errorText) {
					theLogger.error(errorText);
					alert(errorText);
				}
			})
		}
		$(document).on('popupafteropen', '#uvNewSampleDialog', _onInitDialog);
		
		//$(document).on('popupcreate', '#uvGoToPageDialog', function(event, ui) {
			// why not been called? ahhhhhh ahhhhh ahhhh....
		//});
		
		// 1100917 Raymond 1080763 合併1070348, 類別選單連動新類別名稱輸入欄位
		$dlg.find("select#chooseSampleClass").on('change', function(event) {
			if($(this).val() == "newSampleClass")
				$dlg.find("input#newSampleClass").closest(".ui-input-text").removeClass("ui-disabled");
			else
				$dlg.find("input#newSampleClass").val("").closest(".ui-input-text").addClass("ui-disabled");
		});
		
		// 結束後清除 selectmenu object
		$dlg.on('popupafterclose', function(event, ui) {
			$dlg.find('#btn_uvNewSampleCancel').off('click', _onCancelClick);
			$dlg.find('#btn_uvNewSampleOK').off('click', _onOKClick);
			// 1100917 Raymond 1080763 合併1070348, close時off
			$(document).off('popupafteropen', '#uvNewSampleDialog', _onInitDialog);
		});
		
		$dlg.find('#btn_uvNewSampleCancel').on('click', _onCancelClick);
		$dlg.find('#btn_uvNewSampleOK').on('click', _onOKClick);
		
		var _options = {corners: false, history: false, positionTo: 'window' }; 
		$dlg.popup(_options);
		$dlg.popup('open', _options);
		return dfd.promise();
	}
	if(!!nsEditor._sampleRootPath && !!nsEditor._sampleWFIOUrl) {
		doAdd();
	}
	else {	// 呼叫WebService取得個人自訂的範本清單
		theWebServices.getPrivateExamples({
			success: function(nd) {
			
				nsEditor._sampleRootPath = $(nd).attr("路徑");
				nsEditor._sampleWFIOUrl = $(nd).attr("WebfileioURL");
				theLogger.log("個人自訂範本的儲存路徑為'" + nsEditor._sampleRootPath + "'(" + nsEditor._sampleWFIOUrl + ")");
				doAdd();
			},
			error: function(errorText) {
				theLogger.error(errorText);
				alert(errorText);
			}
		});
	}
};

// (附件)所有頁面向右轉90度, 1060621 Raymond 1060283 新增所有頁面向右旋轉功能
nsEditor.onRotateAllPageRightVisible = function(view, model, draftIdx, attIdx) {
	var n = model.getAttPageCounts(draftIdx, attIdx);
	if(n > 0) {
		var pg = model.getAttPage(draftIdx, attIdx, 0);
		if("fileRef" in pg && pg.fileRef.name.match(/\d{4}\-\d+.\d{4}/)) {
			theLogger.log("此附件第一頁檔名符合當流程點所匯出頁面的命名規則, 允許旋轉頁面");
			return true;
		}
		// 1061114 Raymond 1061068 判斷是否允許旋轉來文附件頁面
		else if("parent" in pg.container && "fromType" in pg.container.parent) {
			if(model.enableRcvAttPageRotate(pg)) {
				theLogger.log("此附件為來文附件, 且允許旋轉頁面");
				return true;
			}
			else {
				theLogger.warn("此附件為來文附件, 且不允許旋轉頁面");
			}
		}
		else {
			if("fileRef" in pg)
				theLogger.warn("此附件第一頁檔名不符當流程點所匯出頁面的命名規則, 不允許旋轉頁面");
			else
				theLogger.warn("此附件第一頁無檔名參照, 無法判斷是否為當流程點所匯出頁面");
		}
	}
	else
		theLogger.warn("此附件無頁面, 不允許旋轉頁面");
	return false;
};

nsEditor.onRotateAllPageRight = function(view, model, draftIdx, attIdx) {
	var $viewPort = $(this).closest(".viewPort");
	theLogger.log("向右旋轉此附件所有頁面");
	SSOUtil.loading("show", {text: "向右旋轉此附件所有頁面...", textVisible: true});
	var params = {argArtifact: window.theUserInfo.Artifact,
					Path: model.subDirPath,
					FileName: new Array(),
					Angle: 90};
	var n = model.getAttPageCounts(draftIdx, attIdx);
	// 1141217	Leslie[國合序451]	修正因單號[1141255]改動附件匯出頁面的儲存流程，而影響的頁面轉向問題
	var page;
	for(var i=0; i<n; i++) {
		var pg = model.getAttPage(draftIdx, attIdx, i);
		if("fileRef" in pg && pg.fileRef.name.match(/\d{4}\-\d+.\d{4}/)) {
			theLogger.log("應旋轉頁面檔'" + pg.fileRef.name + "'");
			// 1141217	Leslie[國合序451]	修正因單號[1141255]改動附件匯出頁面的儲存流程，而影響的頁面轉向問題
			if('content' in pg && pg.content.match(/^http[s]?:\/\//i)){
				page = pg;
				var sp = page.fileRef.name.lastIndexOf('\\'),
					srcAttPath = page.fileRef.name.substr(0, sp),
					fname = page.fileRef.name.substr(sp + 1);
				params['Path'] = srcAttPath;
				params.FileName.push({string: fname});
			}
			else
			params.FileName.push({string: pg.fileRef.name});
		}
		// 1061114 Raymond 1061068 判斷是否允許旋轉來文附件頁面
		else if("parent" in pg.container && "fromType" in pg.container.parent && model.enableRcvAttPageRotate(pg)) {
			theLogger.log("應旋轉來文附件頁面檔'" + pg.fileRef.name + "'");
			params.FileName.push({string: pg.fileRef.name});
		}
		else {
			if("fileRef" in pg)
				theLogger.warn("此附件第" + i + "頁檔名不符當流程點所匯出頁面的命名規則, 不允許旋轉頁面");
			else
				theLogger.error("此附件第" + i + "頁無檔名參照, 無法判斷是否為當流程點所匯出頁面");
		}
	}

	// 1141217	Leslie[國合序451]	修正因單號[1141255]改動附件匯出頁面的儲存流程，而影響的頁面轉向問題
	var rotaUrl = SSO_CONFIG.getWSUrl("imgws");
	if(page != undefined && 'content' in page && page.content.match(/^http[s]?:\/\//i)){
		rotaUrl = page.content.substr(0, page.content.toLowerCase().indexOf("imgconvert")) + "/WebFileIO/T2100FileIOService.asmx";
	}
	
	theLogger.log(params);
	// 1141217	Leslie[國合序451]	修正因單號[1141255]改動附件匯出頁面的儲存流程，而影響的頁面轉向問題
	// theWebServices.invokeWS(SSO_CONFIG.getWSUrl("imgws"), "ImgRotate", "http://2100T.com.tw", params, true, function(r) {
	theWebServices.invokeWS(rotaUrl, "ImgRotate", "http://2100T.com.tw", params, true, function(r) {
		theLogger.log("ImgRotate returns:");
		theLogger.log(r);
		if("m_bSuccess" in r && r.m_bSuccess == "false") {
			theLogger.error("旋轉此附件所有頁面失敗 - " + r.m_strErrMsg);
			alert(r.m_strErrMsg);
		}
		else {
			theLogger.log("旋轉此附件所有頁面成功");
			for(var i=0; i<n; i++) {
				var pg = model.getAttPage(draftIdx, attIdx, i);
				if("rotated" in pg) {
					pg.rotated += 90;
					if(pg.rotated == 360)
						pg.rotated = 0;
				}
				else
					pg.rotated = 90;
				pg.rotate = pg.rotated;
			}
			$viewPort.find(".pages").flip("refresh");	// 重新整理頁面
		}
		SSOUtil.loading("hide");
	});
};

// (附件)所有頁面向左轉90度, 1060621 Raymond 1060283 新增所有頁面向左旋轉功能
nsEditor.onRotateAllPageLeftVisible = function(view, model, draftIdx, attIdx) {
	var n = model.getAttPageCounts(draftIdx, attIdx);
	if(n > 0) {
		var pg = model.getAttPage(draftIdx, attIdx, 0);
		if("fileRef" in pg && pg.fileRef.name.match(/\d{4}\-\d+.\d{4}/)) {
			theLogger.log("此附件第一頁檔名符合當流程點所匯出頁面的命名規則, 允許旋轉頁面");
			return true;
		}
		// 1061114 Raymond 1061068 判斷是否允許旋轉來文附件頁面
		else if("parent" in pg.container && "fromType" in pg.container.parent) {
			if(model.enableRcvAttPageRotate(pg)) {
				theLogger.log("此附件為來文附件, 且允許旋轉頁面");
				return true;
			}
			else {
				theLogger.warn("此附件為來文附件, 且不允許旋轉頁面");
			}
		}
		else {
			if("fileRef" in pg)
				theLogger.warn("此附件第一頁檔名不符當流程點所匯出頁面的命名規則, 不允許旋轉頁面");
			else
				theLogger.warn("此附件第一頁無檔名參照, 無法判斷是否為當流程點所匯出頁面");
		}
	}
	else
		theLogger.warn("此附件無頁面, 不允許旋轉頁面");
	return false;
};

nsEditor.onRotateAllPageLeft = function(view, model, draftIdx, attIdx) {
	var $viewPort = $(this).closest(".viewPort");
	theLogger.log("向左旋轉此附件所有頁面");
	SSOUtil.loading("show", {text: "向左旋轉此附件所有頁面", textVisible: true});
	var params = {argArtifact: window.theUserInfo.Artifact,
					Path: model.subDirPath,
					FileName: new Array(),
					Angle: -90};
	var n = model.getAttPageCounts(draftIdx, attIdx);
	// 1141217	Leslie[國合序451]	修正因單號[1141255]改動附件匯出頁面的儲存流程，而影響的頁面轉向問題
	var page;
	for(var i=0; i<n; i++) {
		var pg = model.getAttPage(draftIdx, attIdx, i);
		if("fileRef" in pg && pg.fileRef.name.match(/\d{4}\-\d+.\d{4}/)) {
			theLogger.log("應旋轉頁面檔'" + pg.fileRef.name + "'");
			// 1141217	Leslie[國合序451]	修正因單號[1141255]改動附件匯出頁面的儲存流程，而影響的頁面轉向問題
			if('content' in pg && pg.content.match(/^http[s]?:\/\//i)){
				page = pg;
				var sp = page.fileRef.name.lastIndexOf('\\'),
					srcAttPath = page.fileRef.name.substr(0, sp),
					fname = page.fileRef.name.substr(sp + 1);
				params['Path'] = srcAttPath;
				params.FileName.push({string: fname});
			}
			else
			params.FileName.push({string: pg.fileRef.name});
		}
		// 1061114 Raymond 1061068 判斷是否允許旋轉來文附件頁面
		else if("parent" in pg.container && "fromType" in pg.container.parent && model.enableRcvAttPageRotate(pg)) {
			theLogger.log("應旋轉來文附件頁面檔'" + pg.fileRef.name + "'");
			params.FileName.push({string: pg.fileRef.name});
		}
		else {
			if("fileRef" in pg)
				theLogger.warn("此附件第" + i + "頁檔名不符當流程點所匯出頁面的命名規則, 不允許旋轉頁面");
			else
				theLogger.error("此附件第" + i + "頁無檔名參照, 無法判斷是否為當流程點所匯出頁面");
		}
	}

	// 1141217	Leslie[國合序451]	修正因單號[1141255]改動附件匯出頁面的儲存流程，而影響的頁面轉向問題
	var rotaUrl = SSO_CONFIG.getWSUrl("imgws");
	if(page != undefined && 'content' in page && page.content.match(/^http[s]?:\/\//i)){
		rotaUrl = page.content.substr(0, page.content.toLowerCase().indexOf("imgconvert")) + "/WebFileIO/T2100FileIOService.asmx";
	}

	theLogger.log(params);
	// 1141217	Leslie[國合序451]	修正因單號[1141255]改動附件匯出頁面的儲存流程，而影響的頁面轉向問題
	// theWebServices.invokeWS(SSO_CONFIG.getWSUrl("imgws"), "ImgRotate", "http://2100T.com.tw", params, true, function(r) {
	theWebServices.invokeWS(rotaUrl, "ImgRotate", "http://2100T.com.tw", params, true, function(r) {
		theLogger.log("ImgRotate returns:");
		theLogger.log(r);
		if("m_bSuccess" in r && r.m_bSuccess == "false") {
			theLogger.error("旋轉此附件所有頁面失敗 - " + r.m_strErrMsg);
			alert(r.m_strErrMsg);
		}
		else {
			theLogger.log("旋轉此附件所有頁面成功");
			for(var i=0; i<n; i++) {
				var pg = model.getAttPage(draftIdx, attIdx, i);
				if("rotated" in pg) {
					pg.rotated -= 90;
					if(pg.rotated < 0)
						pg.rotated = 270;
				}
				else
					pg.rotated = 270;
				pg.rotate = pg.rotated;
			}
			$viewPort.find(".pages").flip("refresh");	// 重新整理頁面
		}
		SSOUtil.loading("hide");
	});
};

// (來文)檢核所有頁面旋轉, 1111207	Leslie[1110832] 新增所有頁面旋轉功能
nsEditor.onRotateRcvAllPageVisible = function(view, model, draftIdx) {
	var n = model.getDraftPageCounts(draftIdx);
	if(n > 0) {
		var pg = model.getDraftPage(draftIdx, 0);
		if("fromType" in pg.container) {
			//Leslie	借用跟附件頁面相同邏輯來判斷來文頁面可否旋轉
			if(model.enableRcvAttPageRotate(pg)) {
				theLogger.log("此為來文頁面, 且允許旋轉");
				return true;
			}
			else {
				theLogger.warn("此為來文頁面, 且不允許旋轉頁面");
			}
		}
		else {
			if("fileRef" in pg)
				theLogger.warn("此文稿第一頁檔名不符當流程點所預先匯出頁面的命名規則, 不允許旋轉頁面");
			else
				theLogger.warn("此來文第一頁無檔名參照,不允許旋轉頁面");
		}
	}
	else
		theLogger.warn("此附件無頁面, 不允許旋轉頁面");
	return false;
};

// (來文)所有頁面向右轉90度, 1111207	Leslie[1110832] 新增所有頁面旋轉功能
nsEditor.onRotateRcvAllPageRight = function(view, model, draftIdx) {
	RotateRcvAllPage(this, view, model, draftIdx, 90);	
};

// (來文)所有頁面向左轉90度, 1111207	Leslie[1110832] 新增所有頁面旋轉功能
nsEditor.onRotateRcvAllPageLeft = function(view, model, draftIdx) {
	RotateRcvAllPage(this, view, model, draftIdx, -90);	
};

function RotateRcvAllPage(eventTag, view, model, draftIdx, Rotate){
	var $viewPort = $(eventTag).closest(".viewPort");
	var wRotate = (Rotate > 0)?"右":"左";
	theLogger.log(`向${wRotate}旋轉此文稿所有頁面`);
	SSOUtil.loading("show", {text: `向${wRotate}旋轉此文稿所有頁面...`, textVisible: true});
	var params = {argArtifact: window.theUserInfo.Artifact,
					Path: model.subDirPath,
					FileName: new Array(),
					Angle: Rotate};
	var n = model.getDraftPageCounts(draftIdx);
	for(var i=0; i<n; i++) {
		var pg = model.getDraftPage(draftIdx, i);
		if("fromType" in pg.container){
			theLogger.log("應旋轉來文頁面檔'" + pg.fileRef.name + "'");
			params.FileName.push({string: pg.fileRef.name});
		}
		else {
			if("fileRef" in pg)
				theLogger.warn("此文稿第" + i + "頁檔名不符當流程點所預先匯出頁面的命名規則, 不允許旋轉頁面");
			else
				theLogger.warn("此來文第" + i + "頁無檔名參照,不允許旋轉頁面");
		}
	}
	theLogger.log(params);
	theWebServices.invokeWS(SSO_CONFIG.getWSUrl("imgws"), "ImgRotate", "http://2100T.com.tw", params, true, function(r) {
		theLogger.log("ImgRotate returns:");
		theLogger.log(r);
		if("m_bSuccess" in r && r.m_bSuccess == "false") {
			theLogger.error("旋轉此文稿所有頁面失敗 - " + r.m_strErrMsg);
			alert(r.m_strErrMsg);
		}
		else {
			theLogger.log("旋轉此文稿所有頁面成功");
			for(var i=0; i<n; i++) {
				var pg = model.getDraftPage(draftIdx, i);
				if("rotated" in pg) {
					pg.rotated += Rotate;
					if(pg.rotated == 360)
						pg.rotated = 0;
				}
				else
					pg.rotated = Rotate;
				pg.rotate = pg.rotated;
			}
			$viewPort.find(".pages").flip("refresh");	// 重新整理頁面
		}
		SSOUtil.loading("hide");
	});
}


// 另存DI檔, 1061218 Raymond 1061155 新增另存DI檔功能
nsEditor.onExportDIVisible = function(view, model, draftIdx) {
	// 1090916 Raymond 1090564 信保特殊模式公文不提供此功能
	if(model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
		return false;
	var docType = model.getDraftDocType(draftIdx),	// 2016.10.31 改成判斷文別有無匯出設定的XSL再顯示
		res = false,
		exDI, exSW, ex99DI, ex99SW;
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
			theCacheMgr.get({type: "rsrc", rsrc: exDI, async: false})
			.done(function(xslDoc) {
				nsEditor.exDI = xslDoc;
			});
		}
		if(!!exSW) {
			var ph = exSW.remote.path;
			theLogger.log("下載'" + ph + "'...");
			theCacheMgr.get({type: "rsrc", rsrc: exSW, async: false})
			.done(function(xslDoc) {
				nsEditor.exSW = xslDoc;
			});
		}
		if(!!ex99DI) {
			var ph = ex99DI.remote.path;
			theLogger.log("下載'" + ph + "'...");
			theCacheMgr.get({type: "rsrc", rsrc: ex99DI, async: false})
			.done(function(xslDoc) {
				nsEditor.ex99DI = xslDoc;
			});
		}
		if(!!ex99SW) {
			var ph = ex99SW.remote.path;
			theLogger.log("下載'" + ph + "'...");
			theCacheMgr.get({type: "rsrc", rsrc: ex99SW, async: false})
			.done(function(xslDoc) {
				nsEditor.ex99SW = xslDoc;
			});
		}
		theLogger.log("匯出DI.XSL -- ");
		theLogger.log(nsEditor.exDI);
		theLogger.log("產生交換表.XSL -- ");
		theLogger.log(nsEditor.exSW);
	}
	if(!!nsEditor.exDI) {
		var supNodes = nsEditor.exDI.getElementsByTagNameNS("http://www.2100t.com.tw/2008/OD/Export","supported-doctypes");
		if(supNodes.length > 0) {
			var supDocTypes = supNodes[0].textContent.split("|");
			theLogger.log(supDocTypes);
			if(supDocTypes.indexOf(docType) >= 0) {
				theLogger.warn("匯出DI.XSL支援'" + docType + "'");
				res = true;
			}
			else
				theLogger.error("匯出DI.XSL不支援'" + docType + "'");
		}
		else
			theLogger.error("匯出DI.XSL未定義supported-doctypes參數, 無法判斷是否支援'" + docType + "'另存DI功能");
	}
	return res;
};

nsEditor.onExportDI = function(view, model, draftIdx) {
	var $viewPort = $(this).closest(".viewPort");
	var that = this;
	var w = $viewPort.closest(".ui-pane-a, .ui-pane-b").width(),
		h = $viewPort.closest(".ui-pane-a, .ui-pane-b").height();
	
	// 1120714 Raymond 標檢局序127 比照一代另存DI時一併另存附件電子檔
	var links = [];
	function now() {
		function padLeft(num, len) {
			if(typeof num != "string")
				num = num.toString();
			if(num.length >= len)
				return num;
			else
				return arguments.callee("0" + num, len);
		}
		var t = new Date();
		if(navigator.userAgent.indexOf("Trident") >= 0)
			return padLeft(t.getHours(), 2) + ":" + padLeft(t.getMinutes(), 2) + ":" + padLeft(t.getSeconds(), 2) + "." + padLeft(t.getMilliseconds(), 3) + " ";
		return "%c" + padLeft(t.getHours(), 2) + ":" + padLeft(t.getMinutes(), 2) + ":" + padLeft(t.getSeconds(), 2) + "." + padLeft(t.getMilliseconds(), 3) + " %c";
	}
	function dlAttach(dm, idx) {
		var nd = dm.getAttachFile(idx);
		if(nd) {
			var $nd = $(nd);
			var nm = $nd.attr("附件名"),
				desc = $nd.attr("摘要"),
				size = parseInt($nd.attr("大小")),
				guid = dm.getAttachGUID(idx),
				hash = dm.getAttachHash(idx),
				fname = HtmlEncode($nd.text()),	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
				blbNm = HtmlEncode($nd.attr("data-blob-name"));	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
			if(!!blbNm && blbNm.match(/^blob:/)) {	// 客戶端剛新增的附件
				theLogger.log("另存BLOB附件(" + blbNm + ") - '" + nm + "', '" + desc + "', '"  + fname + "', " + size + "Bytes, " + guid + ", " + hash);
				if("msSaveBlob" in navigator) {	// 2016.11.7 for IE-compatible
					var xhr = new XMLHttpRequest();
					xhr.open('GET', blbNm, true);
					xhr.responseType = 'blob';
					xhr.onload = function(e) {
						if (this.status == 200) {
							console.log("\t'" + blbNm + "'(" + this.response.size + " bytes)");
							//var myBlob = this.response;
							navigator.msSaveBlob(this.response, fname);
							
							if((idx + 1) < dm.getAttachFileCounts())// 若還有次筆附件
								dlAttach(dm, idx + 1);	// 循序下載次筆附件
							else
								dlCommit();	// 若是Chrome, 會延後在此function實際下載
						}
					};
					xhr.onerror = function(e) {
						theLogger.error("失敗!", e);
						alert("另存'" + fname + "'失敗!\r\n" + e.message);
						if("durringDownloadAll" in model) {	// 防呆
							delete model.durringDownloadAll;
							if("durringDownloadAllTimer" in nsEditor && typeof nsEditor.durringDownloadAllTimer === "number") {	// 中止補救防呆鎖定計時器
								clearTimeout(nsEditor.durringDownloadAllTimer);
								delete nsEditor.durringDownloadAllTimer;
							}
						}
					};
					xhr.send();
				}
				else {
					// 1080711 Raymond 1080518 改用createElement
					//var $a = $("<a data-role='none' rel='external' data-ajax='false' download='" + fname + "' href='" + blbNm + "'></a>").appendTo("body");
					//$a[0].click();	// 2016.12.22	Leslie	改回DOM的標準Click，加上"[0]"
					//$a.remove();
					console.log("\t%c'" + blbNm + "%c'", "color:blue;", "color:blue;");
					var link2 = document.createElement("a");
					link2.href = blbNm;
					link2.download = fname;
					document.body.appendChild(link2);
					if(navigator.userAgent.indexOf("Chrome") >= 0)	// Chrome自動下載有每連續另存(用Click指令觸發, 手動點超鏈結的不太可能短時間連續)10個檔案就會開始missing click or download, 導致漏存檔案的問題
						links.push(link2);							// 改成暫時push到陣列中, 等最後一筆檔案下載完再一次另存, 用async + await指令(IE不支援這些keyword, 連JS都無法載入成功)的方式處理這個問題
					else {	// 其它(Firefox etc...)沒有這個問題, 可能是自動下載功能的問題
						link2.click();
						document.body.removeChild(link2);
					}
					
					if((idx + 1) < dm.getAttachFileCounts())// 若還有次筆附件
						dlAttach(dm, idx + 1);	// 循序下載次筆附件
					else
						dlCommit();	// 若是Chrome, 會延後在此function實際下載
				}
			}
			else {	// 從Server上下載附件電子檔
				theLogger.log(now() + "下載非BLOB附件 - '" + nm + "', '" + desc + "', '"  + fname + "', " + size + "Bytes, " + guid + ", " + hash, "color:blue;", "color:black");
				var wfio = new WebFileIO(model.fileIOWS);
				wfio.download(dm.getDraftDirPath(), fname, {
					keepRawData: true,	// 保持原始資料格式(Typed Array)
					success: function(fil, all) {
						var blb = new Blob([fil], {type: "application/octet-stream"});
						theLogger.log(now() + "下載'" + fname + "'成功!", "color:blue;", "color:black");
						if("msSaveBlob" in navigator)
							navigator.msSaveBlob(blb, fname);
						else {
							//1140723	Leslie[1141011]	弱掃修正[Client DOM XSS]
							// var url = URL.createObjectURL(blb);
							//1140801	Leslie[1141011]	弱掃修正[Client DOM XSS]
							// var url = encodeURI(URL.createObjectURL(blb));
							var re = new RegExp(`blob:${location.protocol}//${location.host}/[0-9a-z]{8,8}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{12,12}`);
							var reUrl = re.exec(URL.createObjectURL(blb))[0];
							var url = encodeURI(reUrl);
							// 1080711 Raymond 1080518 改用createElement
							//var $a = $("<a data-role='none' rel='external' data-ajax='false' download='" + fname + "' href='" + url + "'></a>").appendTo("body");		// 2016.12.22	Leslie	改回DOM的標準Click，移到後面去Click
							//$a[0].click()	// 2016.12.22	Leslie	改回DOM的標準Click，加上"[0]"
							//$a.remove();
							console.log("\t%c'" + url + "%c'(" + blb.size + " bytes)", "color:blue;", "color:blue;");
							var link2 = document.createElement("a");
							link2.href = url;
							link2.download = fname;
							document.body.appendChild(link2);
							if(navigator.userAgent.indexOf("Chrome") >= 0)	// Chrome自動下載有每連續另存(用Click指令觸發, 手動點超鏈結的不太可能短時間連續)10個檔案就會開始missing click or download, 導致漏存檔案的問題
								links.push(link2);							// 改成暫時push到陣列中, 等最後一筆檔案下載完再一次另存, 用async + await指令(IE不支援這些keyword, 連JS都無法載入成功)的方式處理這個問題
							else {	// 其它(Firefox etc...)似乎沒有這個問題
								link2.click();
								document.body.removeChild(link2);
							}
							//URL.revokeObjectURL(url);	// 不確定click後立即釋放url會不會有問題
						}
						
						if((idx + 1) < dm.getAttachFileCounts())// 若還有次筆附件
							dlAttach(dm, idx + 1);	// 循序下載次筆附件
						else
							dlCommit();	// 若是Chrome, 會延後在此function實際下載
					},
					error: function(errorText) {
						theLogger.error("下載'" + fname + "'失敗! " + errorText);
						alert("另存'" + fname + "'失敗!\r\n" + errorText);
						if("durringDownloadAttach" in model) {	// 防呆
							delete model.durringDownloadAttach;
							if("durringDownloadAttachTimer" in nsEditor && typeof nsEditor.durringDownloadAttachTimer === "number") {	// 中止補救防呆鎖定計時器
								clearTimeout(nsEditor.durringDownloadAttachTimer);
								delete nsEditor.durringDownloadAttachTimer;
							}
						}
					}
				});
			}
		}
		else {
			theLogger.error("無法取得第" + idx + "個附件資訊");
			if("durringDownloadAttach" in model) {	// 防呆
				delete model.durringDownloadAttach;
				if("durringDownloadAttachTimer" in nsEditor && typeof nsEditor.durringDownloadAttachTimer === "number") {	// 中止補救防呆鎖定計時器
					clearTimeout(nsEditor.durringDownloadAttachTimer);
					delete nsEditor.durringDownloadAttachTimer;
				}
			}
		}
	}
	function dlCommit() {
		// Chrome連續另存10個檔案以上好像就會開始missing幾個檔案, 第1次另存整份公文時因為非同步下載檔案資料, 另存每筆檔案中間有個時間差, 所以
		// 比較不會漏檔案, 但第2次另存整份公文時, 因為大部分用Cache的檔案資料, 所以變成另存每筆檔案中間幾乎沒有時間間隔, 等於連續另存, 在這種
		// 情境下就會開始漏檔案, 故改成async + await指令(IE不支援這些keyword, 連JS都無法載入成功, 改用setTimeout)來做出每10筆檔案另存後同步延遲個1秒鐘來解決Chrome的這個問題
		if(links.length > 0) {
			/*function pause(msec) {
				return new Promise(function(resolve, reject) {
						setTimeout(resolve, msec || 1000);
					}
				);
			}
			async function downloadAll(elements) {
				var count = 0;
				for(var i=0; i<elements.length; i++) {

					elements[i].click();
					var url = elements[i].getAttribute("href");
					document.body.removeChild(elements[i]);
					//URL.revokeObjectURL(url);	// 不確定click後立即釋放url會不會有問題

					if (++count >= 10) {	// 每另存10個檔案就等待1秒鐘
						await pause(1000);
						count = 0;
					}
				}
			}
			downloadAll(links);*/
			var cur = 0;
			function dlBatch() {
				for(var i=cur; i<links.length; i++) {
					var url = links[i].getAttribute("href");
					theLogger.debug("click dl link", url);
					links[i].click();
					document.body.removeChild(links[i]);
					//URL.revokeObjectURL(url);	// 不確定click後立即釋放url會不會有問題

					if((++cur % 10) == 0 && (cur < links.length)) {	// 每另存10個檔案就等待1秒鐘
						theLogger.log("因應Chrome自動下載每連續另存10個檔案就有可能會漏掉幾個的問題, 每另存10個檔案就等待1秒鐘再繼續另存作業");
						setTimeout(arguments.callee, 1000);
						return;
					}
				}
				if("durringDownloadAttach" in model) {	// 防呆
					delete model.durringDownloadAttach;
					if("durringDownloadAttachTimer" in nsEditor && typeof nsEditor.durringDownloadAttachTimer === "number") {	// 中止補救防呆鎖定計時器
						clearTimeout(nsEditor.durringDownloadAttachTimer);
						delete nsEditor.durringDownloadAttachTimer;
					}
				}
			}
			dlBatch();
		}
		else if("durringDownloadAttach" in model) {	// 防呆
			delete model.durringDownloadAttach;
			if("durringDownloadAttachTimer" in nsEditor && typeof nsEditor.durringDownloadAttachTimer === "number") {	// 中止補救防呆鎖定計時器
				clearTimeout(nsEditor.durringDownloadAttachTimer);
				delete nsEditor.durringDownloadAttachTimer;
			}
		}
	}
	Util.getDlg("RD-ExportDI.html").done(function($dlg) {
		$dlg.find("header > h1").unwrap();
		
		// 關閉
		$dlg.find("a#cancel").on('click', function() {
			$.modal.close();
		});
		
		// 確定
		$dlg.find("a#ok").on('click', function() {
			// 1120714 Raymond 標檢局序127 比照一代另存DI時一併另存附件電子檔
			if(!!model.durringDownloadAttach) {	// 防呆
				theLogger.warn("前次作業仍在下載中, 請稍後再試!");
				alert("前次作業仍在下載中, 請稍後再試!");
				return;
			}
			var diVer = $dlg.find("#di99").prop("checked")?"99":"104";
			if(diVer == "104") {
				var genDM = $dlg.find("#genDM").prop("checked");
				var dmCode = $dlg.find("#dmCode").prop("selectedIndex");
				// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
				// var dmComment = $("<p/>").text($dlg.find("#dmComment").val()).html();	// encode xml entities
				var dmComment = HtmlEncode($dlg.find("#dmComment").val());	// encode xml entities
			}
			else {	// 99DI
			}
			model.accquireDraftModel(draftIdx)
			.done(function(dm) {
				var xmlDoc = dm.accquireXml(), exDI, exSW;
				// 1071025 Raymond 新增轉換為完稿結果的XML
				if("transCmplXml" in nsEditor) {
					xmlDoc = nsEditor.transCmplXml(xmlDoc);
				}
				if(diVer == "104") {
					exDI = nsEditor.exDI;
					exSW = nsEditor.exSW;
					theLogger.log("轉換為104DI...");
				}
				else {
					exDI = nsEditor.ex99DI;
					exSW = nsEditor.ex99SW;
					theLogger.log("轉換為99DI...");
				}
				var fnSW, fnDM, fnDI;
				//1140801	Leslie[1141011]	弱掃修正[Client DOM XSS]
				var re = new RegExp(`blob:${location.protocol}//${location.host}/[0-9a-z]{8,8}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{12,12}`);
				
				// 預設檔名用文號-序, 或UserID + MsgID + 序
				if(model.getDocNo().length > 0) {
					fnSW = model.getDocNo() + "-" + Util.padLeft(draftIdx + 1, 3) + ".sw";
					fnDM = model.getDocNo() + "-" + Util.padLeft(draftIdx + 1, 3) + ".dm";
					fnDI = model.getDocNo() + "-" + Util.padLeft(draftIdx + 1, 3) + ".di";
				}
				else {
					fnSW = theUserInfo.UserID + "_" + model.getMsgId() + "-" + Util.padLeft(draftIdx + 1, 3) + ".sw";
					fnDM = theUserInfo.UserID + "_" + model.getMsgId() + "-" + Util.padLeft(draftIdx + 1, 3) + ".dm";
					fnDI = theUserInfo.UserID + "_" + model.getMsgId() + "-" + Util.padLeft(draftIdx + 1, 3) + ".di";
				}
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
						// 先匯出SW
						var xslt = new XSLTProcessor();
						xslt.importStylesheet(exSW);
						var res = xslt.transformToDocument(xmlDoc, document);
						theLogger.log("xsl, xml, xslt:");
						theLogger.log(Util.getXml(exSW));
						theLogger.log(Util.getXml(xmlDoc));
						theLogger.log((new XMLSerializer()).serializeToString(res));
						var xml = '<?xml version="1.0" encoding="utf-8"?>\r\n' + (new XMLSerializer()).serializeToString(res);
						var blob = new Blob([xml], {type: "text/xml"});
						var a = window.document.createElement("a");
						//1140723	Leslie[1141011]	弱掃修正[Client DOM XSS]
						// a.href = window.URL.createObjectURL(blob, {type: "text/xml"});
						//1140801	Leslie[1141011]	弱掃修正[Client DOM XSS]
						// a.href = encodeURI(window.URL.createObjectURL(blob, {type: "text/xml"}));
						let reUrl = re.exec(window.URL.createObjectURL(blob, {type: "text/xml"}))[0];
						a.href = encodeURI(reUrl);
						a.download = fnSW;
						document.body.appendChild(a);
						a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
						document.body.removeChild(a);
						
						var snapshot = exDI.evaluate("xsl:variable[@name='exch']", exDI.documentElement, nsResolver, 7, null);
						if(snapshot.snapshotLength > 0)
							snapshot.snapshotItem(0).textContent = fnSW;
						// 先匯出DM
						if(genDM) {
							// 1101021 Raymond 1100342 配合109法規新增文書訊息代碼「6」-"本文附件未修正重發"
							// 文書訊息代碼及備註要存回文稿
							//if(dmCode > 0 && dmCode <= 5) {
							if(dmCode > 0 && dmCode <= 6) {
								try {
									dm.text("/*/文書訊息代碼", "" + dmCode);
								}
								catch(e) {	// 欄位不存在, 新增
									dm.appendChild("<文書訊息代碼>" + dmCode + "</文書訊息代碼>", "/*");
								}
							}
							try {
								dm.text("/*/文書訊息備註", dmComment);
							}
							catch(e) {
								dm.appendChild("<文書訊息備註>" + dmComment + "</文書訊息備註>", "/*");
							}
							
							// 寫出DM檔
							xml = '<?xml version="1.0" encoding="utf-8"?>\r\n' +
									'<!DOCTYPE 文書訊息表單 SYSTEM "104_dm_utf8.dtd">\r\n<文書訊息表單><文書訊息代碼>' +
									dmCode + '</文書訊息代碼><訊息備註>' +
									dmComment + '</訊息備註></文書訊息表單>';
							blob = new Blob([xml], {type: "text/xml"});
							a = window.document.createElement("a");
							//1140723	Leslie[1141011]	弱掃修正[Client DOM XSS]
							// a.href = window.URL.createObjectURL(blob, {type: "text/xml"});
							//1140801	Leslie[1141011]	弱掃修正[Client DOM XSS]
							// a.href = encodeURI(window.URL.createObjectURL(blob, {type: "text/xml"}));
							let reUrl = re.exec(window.URL.createObjectURL(blob, {type: "text/xml"}))[0];
							a.href = encodeURI(reUrl);
							a.download = fnDM;
							document.body.appendChild(a);
							a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
							document.body.removeChild(a);
							
							snapshot = exDI.evaluate("xsl:variable[@name='dm']", exDI.documentElement, nsResolver, 7, null);
							if(snapshot.snapshotLength > 0)
								snapshot.snapshotItem(0).textContent = fnDM;
						}
						// 1091224 Raymond 1090866 新增判定機關暱稱為"HAC"(客委會)時, 設定產生有"署名"的DI
						if(theUserInfo.OrgNickName == "HAC") {
							snapshot = exDI.evaluate("xsl:variable[@name='OutputSign']", exDI.documentElement, nsResolver, 7, null);
							if(snapshot.snapshotLength > 0) {
								theLogger.log("機關暱稱'" + theUserInfo.OrgNickName + "', 設定所匯出DI應含'署名'標籤'");
								// 1100414 Raymond 1100407 應客委會需求修改傳入匯出DI.XSL的「OutputSign」參數為"2", 表示所產出DI檔僅須包含對應署名2的一個「署名」標籤
								//snapshot.snapshotItem(0).textContent = "true";
								snapshot.snapshotItem(0).textContent = "2";
							}
							else
								theLogger.error("機關暱稱'" + theUserInfo.OrgNickName + "', 須設定匯出DI應含'署名'標籤', 但'" + ((diVer == "104")?"匯出DI.XSL":"99匯出DI.XSL") + "'找不到OutputSign參數");
						}
						// 再匯出DI
						//var xslt = new XSLTProcessor();
						// 因為Chrome直接transformToDocument只會產生DOCTYPE, 不會產生DOCTYPE的ENTITY, 故先用output method="text"轉出純文字包含ENTITY的部分, 並切割出來
						snapshot = exDI.evaluate("xsl:output", exDI.documentElement, nsResolver, 7, null);
						if(snapshot.snapshotLength > 0)
							snapshot.snapshotItem(0).setAttribute("method", "text");
						xslt.reset();
						xslt.importStylesheet(exDI);
						res = xslt.transformToDocument(xmlDoc);
						theLogger.log("xsl, xml, xslt:");
						theLogger.log(Util.getXml(exDI));
						theLogger.log(Util.getXml(xmlDoc));
						//theLogger.log((new XMLSerializer()).serializeToString(res));
						var tmp = res.body.firstElementChild.textContent;
						theLogger.log(tmp);
						var pend = tmp.indexOf("]>"), dtcl = "";
						if(pend > 0)
							dtcl = tmp.substr(0, pend + 3);
						// 恢復output method="xml", 再轉一次
						if(snapshot.snapshotLength > 0)
							snapshot.snapshotItem(0).setAttribute("method", "xml");
						xslt.reset();
						xslt.importStylesheet(exDI);
						res = xslt.transformToDocument(xmlDoc);
						theLogger.log("xsl, xml, xslt:");
						theLogger.log(Util.getXml(exDI));
						theLogger.log(Util.getXml(xmlDoc));
						theLogger.log((new XMLSerializer()).serializeToString(res.documentElement));
						// 只取documentElement部分, 與xml declaration, doctype合併為一個檔案
						xml = '<?xml version="1.0" encoding="utf-8"?>\r\n' + dtcl + (new XMLSerializer()).serializeToString(res.documentElement);
						blob = new Blob([xml], {type: "text/xml"});
						a = window.document.createElement("a");
						//1140723	Leslie[1141011]	弱掃修正[Client DOM XSS]
						// a.href = window.URL.createObjectURL(blob, {type: "text/xml"});
						//1140801	Leslie[1141011]	弱掃修正[Client DOM XSS]
						// a.href = encodeURI(window.URL.createObjectURL(blob, {type: "text/xml"}));
						var regUrl = re.exec(window.URL.createObjectURL(blob, {type: "text/xml"}))[0];
						a.href = encodeURI(regUrl);
						a.download = fnDI;
						document.body.appendChild(a);
						a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
						document.body.removeChild(a);
						
						// 1120714 Raymond 標檢局序127 比照一代另存DI時一併另存附件電子檔
						var nAttachments = dm.getAttachFileCounts();
						if(nAttachments > 0) {
							theLogger.log("另存附件(共" + nAttachments + "筆)開始...");
							links = [];	// 重置下載鏈結陣列
							model.durringDownloadAttach = true;	// 防呆
							nsEditor.durringDownloadAttachTimer = setTimeout(function() {	// 5分鐘後解除防呆鎖定, 若發生任何exception導致持續鎖定功能, 還能在5分鐘後恢復
								if("durringDownloadAttach" in model)						// 另存整份公文的功能, 若檔案多到5分鐘都下載不完, 導致鎖定被解除, 那就只好認了
									delete model.durringDownloadAttach;
							}, 300000);
							dlAttach(dm, 0);	// 下載此文稿的第1筆附件
						}
					}
					else {
						//1140723	Leslie[1141011]	弱掃修正[Client DOM Stored XSS]，註解整個IE段落
						// // 先匯出SW
						// var msxsl = new ActiveXObject("MSXML2.DOMDocument");
						// var res = msxsl.loadXML(Util.getXml(exSW));
						// /*var exch = msxsl.selectSingleNode("//xsl:variable[@name='exch']");
						// exch.text = "TEST.SW";*/
						// res = xmlDoc.transformNode(msxsl);
						// theLogger.log("xsl, xml, xslt:");
						// theLogger.log(Util.getXml(msxsl));	// 2016.11.2 bugfix
						// theLogger.log(Util.getXml(xmlDoc));
						// theLogger.log(res);
						
						// //var xml = Util.getXml(res);
						// var blob = new Blob(['<?xml version="1.0" encoding="utf-8"?>\r\n', res], {type: "application/octet-stream"});
						// //1140723	Leslie[1141011]	弱掃修正[Client DOM XSS]
						// // var url = URL.createObjectURL(blob);
						// var url = encodeURI(URL.createObjectURL(blob));
						// //var str = "data:application/octet-stream;base64," + Base64.encode(xml);
						// if("msSaveBlob" in navigator)	// IE10/11專屬下載function
							// navigator.msSaveBlob(blob, fnSW);
						// else
							// theLogger.error("無msSaveBlob函式");
						// // 再匯出DI
						// //var msxsl = new ActiveXObject("MSXML2.DOMDocument");
						// res = msxsl.loadXML(Util.getXml(exDI));
						// // 先匯出DM
						// if(genDM) {
							// // 1101021 Raymond 1100342 配合109法規新增文書訊息代碼「6」-"本文附件未修正重發"
							// // 文書訊息代碼及備註要存回文稿
							// //if(dmCode > 0 && dmCode <= 5) {
							// if(dmCode > 0 && dmCode <= 6) {
								// try {
									// dm.text("/*/文書訊息代碼", "" + dmCode);
								// }
								// catch(e) {	// 欄位不存在, 新增
									// dm.appendChild("<文書訊息代碼>" + dmCode + "</文書訊息代碼>", "/*");
								// }
							// }
							// try {
								// dm.text("/*/文書訊息備註", dmComment);
							// }
							// catch(e) {
								// dm.appendChild("<文書訊息備註>" + dmComment + "</文書訊息備註>", "/*");
							// }
							
							// // 寫出DM檔
							// res = '<?xml version="1.0" encoding="utf-8"?>\r\n' +
									// '<!DOCTYPE 文書訊息表單 SYSTEM "104_dm_utf8.dtd">\r\n<文書訊息表單><文書訊息代碼>' +
									// dmCode + '</文書訊息代碼><訊息備註>' +
									// dmComment + '</訊息備註></文書訊息表單>';
							// blob = new Blob([res], {type: "application/octet-stream"});
							// //1140723	Leslie[1141011]	弱掃修正[Client DOM XSS]
							// // url = URL.createObjectURL(blob);
							// url = encodeURI(URL.createObjectURL(blob));
							// //var str = "data:application/octet-stream;base64," + Base64.encode(xml);
							// if("msSaveBlob" in navigator)	// IE10/11專屬下載function
								// navigator.msSaveBlob(blob, fnDM);
							// else
								// theLogger.error("無msSaveBlob函式");
							
							// var dmVar = msxsl.selectSingleNode("//xsl:variable[@name='dm']");
							// if(!!dmVar)
								// dmVar.text = fnDM;
						// }
						// var exchVar = msxsl.selectSingleNode("//xsl:variable[@name='exch']");
						// if(!!exchVar)
							// exchVar.text = fnSW;
						// // 1091224 Raymond 1090866 新增判定機關暱稱為"HAC"(客委會)時, 設定產生有"署名"的DI
						// if(theUserInfo.OrgNickName == "HAC") {
							// var outputSign = msxsl.selectSingleNode("//xsl:variable[@name='OutputSign']");
							// if(!!outputSign) {
								// theLogger.log("機關暱稱'" + theUserInfo.OrgNickName + "', 設定所匯出DI應含'署名'標籤'");
								// outputSign.text = "true";
							// }
							// else
								// theLogger.error("機關暱稱'" + theUserInfo.OrgNickName + "', 須設定匯出DI應含'署名'標籤', 但'" + ((diVer == "104")?"匯出DI.XSL":"99匯出DI.XSL") + "'找不到OutputSign參數");
						// }
						// res = xmlDoc.transformNode(msxsl);
						// theLogger.log("xsl, xml, xslt:");
						// theLogger.log(Util.getXml(msxsl));	// 2016.11.2 bugfix
						// theLogger.log(Util.getXml(xmlDoc));
						// theLogger.log(res);
						
						// //var xml = Util.getXml(res);
						// blob = new Blob(['<?xml version="1.0" encoding="utf-8"?>\r\n', res], {type: "application/octet-stream"});
						// //1140723	Leslie[1141011]	弱掃修正[Client DOM XSS]
						// // url = URL.createObjectURL(blob);
						// url = encodeURI(URL.createObjectURL(blob));
						// //var str = "data:application/octet-stream;base64," + Base64.encode(xml);
						// if("msSaveBlob" in navigator)	// IE10/11專屬下載function
							// navigator.msSaveBlob(blob, fnDI);
						// else
							// theLogger.error("無msSaveBlob函式");
					}
					
					// 1090227 Raymond 1080751 合併內政部1070381回報另存記錄
					nsEditor.ReportSaveAsLog(model);
				}
				catch(e) {
					theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
				}
			});
		});
		
		// 99/104年版
		$dlg.find("#di99, #di104").on('click', function() {
			if($dlg.find("#di104").prop("checked"))
				$dlg.find("#genDM").closest(".ui-checkbox").removeClass("ui-disabled");
			else {
				$dlg.find("#genDM").prop("checked", false).checkboxradio("refresh");	// 1100512 Raymond 1100334 切換至「99年版」時取消勾選「產生文書訊息表單檔」選項
				$dlg.find("#genDM").closest(".ui-checkbox").addClass("ui-disabled");
				$dlg.find("#ok").removeClass("ui-disabled");	// 1100512 Raymond 1100334 切換至「99年版」時啟用「確定」鈕
			}
		});
		
		// 產生文書訊息表單檔
		$dlg.find("#genDM").on('click', function() {
			if($(this).prop("checked")) {
				if($dlg.find("#dmCode").prop("selectedIndex") > 0)
					$dlg.find("#ok").removeClass("ui-disabled");
				else
					$dlg.find("#ok").addClass("ui-disabled");
			}
			else
				$dlg.find("#ok").removeClass("ui-disabled");
		});
		
		// 文書訊息代碼
		$dlg.find("#dmCode").on('change', function() {
			// 1100512 Raymond 1100334 新增判斷勾選「104年版」時, 才恢復Enable「產生文書訊息表單檔」選項
			//if(this.selectedIndex > 0) {
			if(this.selectedIndex > 0 && $dlg.find("#di104").prop("checked")) {
				$dlg.find("#genDM").closest(".ui-checkbox").removeClass("ui-disabled");
				if($dlg.find("#genDM").prop("checked"))
					$dlg.find("#ok").removeClass("ui-disabled");
			}
			else {
				$dlg.find("#genDM").prop("checked", false).checkboxradio("refresh");
				$dlg.find("#genDM").closest(".ui-checkbox").addClass("ui-disabled");
			}
		});
		
		$.modal($dlg, {
			appendTo: $viewPort.closest(".ui-pane-a, .ui-pane-b"),
			overlayCss: {width: w, height: h},
			containerCss: {width: "414px", height: "380px"},	// 1081022 Raymond fix 400px -> 404px, 1100119 Raymond 1090927 fix 404px -> 414px for FireFox
			onShow: function() {
				$dlg.trigger("create");
				
				// 初始化選項
				if(theSSO.User.EnvSettings.get("OD_ELEC_VERSION").match(/^104/)) {	// 啟用104法規
					// 1100512 Raymond 1100334 修正環境變數預設104年版, 系統卻未切換勾選「104年版」選項的問題
					//$dlg.find("#di99").prop("checked", false);
					//$dlg.find("#di104").prop("checked", true);
					$dlg.find("#di99").prop("checked", false).checkboxradio("refresh");
					$dlg.find("#di104").prop("checked", true).checkboxradio("refresh");
				}
				else
					$dlg.find("#genDM").closest(".ui-checkbox").addClass("ui-disabled");
				
				// 1100512 Raymond 1100334 新增檢核99年版是否支援此文稿之文別
				if(!!nsEditor.ex99DI) {
					var docType = model.getDraftDocType(draftIdx);
					var supNodes = nsEditor.ex99DI.getElementsByTagNameNS("http://www.2100t.com.tw/2008/OD/Export","supported-doctypes");
					if(supNodes.length > 0) {
						var supDocTypes = supNodes[0].textContent.split("|");
						theLogger.log(supDocTypes);
						if(supDocTypes.indexOf(docType) >= 0)
							theLogger.warn("99匯出DI.XSL支援'" + docType + "'");
						else {
							theLogger.error("99匯出DI.XSL不支援'" + docType + "', 禁用「99年版」選項");
							$dlg.find("#di99").prop("checked", false).checkboxradio("refresh").closest(".ui-radio").addClass("ui-disabled");
							$dlg.find("#di104").prop("checked", true).checkboxradio("refresh");
						}
					}
					else
						theLogger.error("99匯出DI.XSL未定義supported-doctypes參數, 無法判斷是否支援'" + docType + "'另存DI功能");
				}
				
				// 上次儲存的文書訊息代碼及備註
				model.accquireDraftModel(draftIdx)
				.done(function(dm) {
					try {
						var dmCode = dm.text("/*/文書訊息代碼");
						if(dmCode.length > 0)
							$dlg.find("#dmCode").prop("selectedIndex", parseInt(dmCode)).selectmenu("refresh");
						var dmComment = $("<p/>").html(dm.text("/*/文書訊息備註")).text();	// decode xml entities
						$dlg.find("#dmComment").val(dmComment);
					}
					catch(e) {
						// 無文書訊息代碼/備註欄位
						$dlg.find("#genDM").closest(".ui-checkbox").addClass("ui-disabled");
					}
				});
			}
		});
	});
};

// [信保特殊模式](本文)所有頁面向右轉90度, 1091202 Raymond 1090908 新增文稿的所有頁面向右旋轉功能
nsEditor.onRotateDraftAllPageRightVisible = function(view, model, draftIdx) {
	if(model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
		var n = model.getDraftPageCounts(draftIdx);
		if(n > 0) {
			var pg = model.getDraftPage(draftIdx, 0);
			if("fileRef" in pg && pg.fileRef.name.match(/^NewDraft-P-/)) {
				theLogger.log("[信保特殊模式]此文稿第一頁檔名符合當流程點所預先匯出頁面的命名規則, 允許旋轉頁面");
				return true;
			}
			else {
				if("fileRef" in pg)
					theLogger.warn("[信保特殊模式]此文稿第一頁檔名不符當流程點所預先匯出頁面的命名規則, 不允許旋轉頁面");
				else
					theLogger.warn("[信保特殊模式]此文稿第一頁無檔名參照, 無法判斷是否為當流程點所預先匯出頁面");
			}
		}
		else
			theLogger.warn("[信保特殊模式]此文稿無頁面, 不允許旋轉頁面");
	}
	return false;
};

nsEditor.onRotateDraftAllPageRight = function(view, model, draftIdx) {
	var $viewPort = $(this).closest(".viewPort");
	theLogger.log("[信保特殊模式]向右旋轉此文稿所有頁面");
	SSOUtil.loading("show", {text: "向右旋轉此文稿所有頁面...", textVisible: true});
	var params = {argArtifact: window.theUserInfo.Artifact,
					Path: model.subDirPath,
					FileName: new Array(),
					Angle: 90};
	var n = model.getDraftPageCounts(draftIdx);
	for(var i=0; i<n; i++) {
		var pg = model.getDraftPage(draftIdx, i);
		if("fileRef" in pg && pg.fileRef.name.match(/^NewDraft-P-/)) {
			theLogger.log("[信保特殊模式]應旋轉頁面檔'" + pg.fileRef.name + "'");
			params.FileName.push({string: pg.fileRef.name});
		}
		else {
			if("fileRef" in pg)
				theLogger.warn("[信保特殊模式]此文稿第" + i + "頁檔名不符當流程點所預先匯出頁面的命名規則, 不允許旋轉頁面");
			else
				theLogger.error("[信保特殊模式]此文稿第" + i + "頁無檔名參照, 無法判斷是否為當流程點所預先匯出頁面");
		}
	}
	theLogger.log(params);
	theWebServices.invokeWS(SSO_CONFIG.getWSUrl("imgws"), "ImgRotate", "http://2100T.com.tw", params, true, function(r) {
		theLogger.log("ImgRotate returns:");
		theLogger.log(r);
		if("m_bSuccess" in r && r.m_bSuccess == "false") {
			theLogger.error("[信保特殊模式]旋轉此文稿所有頁面失敗 - " + r.m_strErrMsg);
			alert(r.m_strErrMsg);
		}
		else {
			theLogger.log("[信保特殊模式]旋轉此文稿所有頁面成功");
			for(var i=0; i<n; i++) {
				var pg = model.getDraftPage(draftIdx, i);
				if("rotated" in pg) {
					pg.rotated += 90;
					if(pg.rotated == 360)
						pg.rotated = 0;
				}
				else
					pg.rotated = 90;
				pg.rotate = pg.rotated;
			}
			$viewPort.find(".pages").flip("refresh");	// 重新整理頁面
		}
		SSOUtil.loading("hide");
	});
};

// [信保特殊模式](本文)所有頁面向左轉90度, 1091202 Raymond 1090908 新增文稿所有頁面向左旋轉功能
nsEditor.onRotateDraftAllPageLeftVisible = function(view, model, draftIdx) {
	if(model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
		var n = model.getDraftPageCounts(draftIdx);
		if(n > 0) {
			var pg = model.getDraftPage(draftIdx, 0);
			if("fileRef" in pg && pg.fileRef.name.match(/^NewDraft-P-/)) {
				theLogger.log("[信保特殊模式]此文稿第一頁檔名符合當流程點所預先匯出頁面的命名規則, 允許旋轉頁面");
				return true;
			}
			else {
				if("fileRef" in pg)
					theLogger.warn("[信保特殊模式]此文稿第一頁檔名不符當流程點所預先匯出頁面的命名規則, 不允許旋轉頁面");
				else
					theLogger.warn("[信保特殊模式]此文稿第一頁無檔名參照, 無法判斷是否為當流程點所預先匯出頁面");
			}
		}
		else
			theLogger.warn("[信保特殊模式]此文稿無頁面, 不允許旋轉頁面");
	}
	return false;
};

nsEditor.onRotateDraftAllPageLeft = function(view, model, draftIdx) {
	var $viewPort = $(this).closest(".viewPort");
	theLogger.log("[信保特殊模式]向左旋轉此文稿所有頁面");
	SSOUtil.loading("show", {text: "向左旋轉此文稿所有頁面", textVisible: true});
	var params = {argArtifact: window.theUserInfo.Artifact,
					Path: model.subDirPath,
					FileName: new Array(),
					Angle: -90};
	var n = model.getDraftPageCounts(draftIdx);
	for(var i=0; i<n; i++) {
		var pg = model.getDraftPage(draftIdx, i);
		if("fileRef" in pg && pg.fileRef.name.match(/^NewDraft-P-/)) {
			theLogger.log("[信保特殊模式]應旋轉頁面檔'" + pg.fileRef.name + "'");
			params.FileName.push({string: pg.fileRef.name});
		}
		else {
			if("fileRef" in pg)
				theLogger.warn("[信保特殊模式]此文稿第" + i + "頁檔名不符當流程點所預先匯出頁面的命名規則, 不允許旋轉頁面");
			else
				theLogger.error("[信保特殊模式]此文稿第" + i + "頁無檔名參照, 無法判斷是否為當流程點所預先匯出頁面");
		}
	}
	theLogger.log(params);
	theWebServices.invokeWS(SSO_CONFIG.getWSUrl("imgws"), "ImgRotate", "http://2100T.com.tw", params, true, function(r) {
		theLogger.log("ImgRotate returns:");
		theLogger.log(r);
		if("m_bSuccess" in r && r.m_bSuccess == "false") {
			theLogger.error("[信保特殊模式]旋轉此文稿所有頁面失敗 - " + r.m_strErrMsg);
			alert(r.m_strErrMsg);
		}
		else {
			theLogger.log("[信保特殊模式]旋轉此文稿所有頁面成功");
			for(var i=0; i<n; i++) {
				var pg = model.getDraftPage(draftIdx, i);
				if("rotated" in pg) {
					pg.rotated -= 90;
					if(pg.rotated < 0)
						pg.rotated = 270;
				}
				else
					pg.rotated = 270;
				pg.rotate = pg.rotated;
			}
			$viewPort.find(".pages").flip("refresh");	// 重新整理頁面
		}
		SSOUtil.loading("hide");
	});
};

// 查找取代文字, 1100720 Raymond 1100431 新增查找取代文字功能
nsEditor.onSearchReplaceVisible = function(view, model, draftIdx) {
	if(model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")	// 信保特殊模式公文不提供此功能
		return false;
	return true;
};

nsEditor.onSearchReplace = function(view, model, draftIdx) {
	var that = this;
	$("#aol #searchPanel").show();
};

// 來文頁籤下載R.PDF, 1100907 Raymond 1090863 新增下載R.PDF功能
nsEditor.onDlRPDFVisible = function(view, model, draftIdx) {
	// copy form line1418@RD-AttachMgmt.js
	var res = false;
	var params = {
		"argArtifact": localStorage.Artifact,
		"argDocNo": theAOL.docObj.docNo
	};
	console.log("查詢來文電子檔 - ");
	window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "GetDocAttach", null, params, false, function (rtn, xml) {
		console.log(rtn, xml);
		if (rtn.ErrorClass.IsErr == "false") {
			if(rtn.RtnField0.string && rtn.RtnField0.string.length > 0) {
				var arListName = rtn.RtnField0.string,
					arFileName = rtn.RtnField1.string;
				for(var ind = 0; ind < arListName.length; ind++) {
					if(arFileName[ind].match(/R.PDF/i)) {
						console.log(ind + ":" + arListName[ind] + " - " + arFileName[ind] + " - MATCH!");
						res = true;
						
						//1140225	Leslie[1131096]	增加紀錄附件真實路徑
						theAOL.docObj.rcvAttachInfo = {'attStoragePath': rtn.RtnField4.string[0], 'attSubDir': rtn.RtnField5.string[0]};
					}
					else
						console.log(ind + ":" + arListName[ind] + " - " + arFileName[ind]);
				}
			}
		}
		else {
			alert(rtn.ErrorClass.ErrMessage);
		}
	});
	return res;
};

nsEditor.onDlRPDF = function(view, model, draftIdx) {
	var that = this;
	// copy form line468@RD-AttachMgmt.js
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
	var wfio = new WebFileIO(model.getDocObj().fileIOWS);
	//1140225	Leslie[1131096]	增加紀錄附件真實路徑
	// var rcvAttPath = model.getDocObj().fileStoragePath + model.getDocObj().fileSubDir + "\\Receive\\";
	var rcvAttPath = model.getDocObj().rcvAttachInfo.attStoragePath + model.getDocObj().rcvAttachInfo.attSubDir;
	var rcvAttFileName = "R.PDF";

	wfio.download(rcvAttPath, rcvAttFileName, {
		keepRawData: true,	// 保持原始資料格式(Typed Array)
		//async: false,	// 1061117 Raymond 1061118 調換附件順序時, 須先下載"完"所有附件原始檔, 才進行轉檔, 因此下載其它附件檔途中萬一第1個附件檔已經完成轉檔, 可能會覆蓋掉其它還沒開始轉的附件檔, 若副檔名一樣會變成有2個相同內容的附件檔, 改成sync應該可以避免此情況發生, 但附件檔案太大可能會有衍生問題
		success: function (fil, all) {
			//1071024	Leslie[1070999]	針對可於瀏覽器直接開啟的附件[JPG、PNG、GIF、PDF]，設定對應的MIME-Type以觸發正確的行為
			//var blb = new Blob([fil],{type: "application/octet-binary"});
			var blb = new Blob([fil], { type: getMimeType(rcvAttFileName) });
			if(navigator.userAgent.indexOf("Trident") >= 0) {
				if("msSaveBlob" in navigator)	// IE10/11專屬下載function
					// 1130924 Raymond 1130834 修改下載的檔名為「文號-來文.PDF」
					// 1120321	Leslie	[考試院序9]修改"R.PDF"為"來文.PDF"
					// navigator.msSaveBlob(blb, rcvAttFileName);
					//navigator.msSaveBlob(blb, "來文.PDF");
					navigator.msSaveBlob(blb, model.getDocNo() + "-來文.PDF");
				else
					theLogger.error("無msSaveBlob函式");
			}
			else {
				var a = window.document.createElement("a");
				//1140723	Leslie[1141011]	弱掃修正[Client DOM XSS]
				// a.href = window.URL.createObjectURL(blb);
				//1140801	Leslie[1141011]	弱掃修正[Client DOM XSS]
				// a.href = encodeURI(window.URL.createObjectURL(blb));
				var re = new RegExp(`blob:${location.protocol}//${location.host}/[0-9a-z]{8,8}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{12,12}`);
				var reUrl = re.exec(window.URL.createObjectURL(blb))[0];
				a.href = encodeURI(reUrl);
				// 1130924 Raymond 1130834 修改下載的檔名為「文號-來文.PDF」
				// 1120321	Leslie	[考試院序9]修改"R.PDF"為"來文.PDF"
				// a.download = rcvAttFileName;
				//a.download = "來文.PDF";
				a.download = model.getDocNo() + "-來文.PDF";
				document.body.appendChild(a);
				a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
				document.body.removeChild(a);
			}
		},
		error: function (errorText) {
			alert(errorText);
		}
	});
};

// 另存TXT檔, 1111201 Raymond 1110867 合併內政部1070198, 新增另存TXT檔功能
nsEditor.onExportTXTVisible = function(view, model, draftIdx) {
	// 信保特殊模式公文不提供此功能
	if(model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
		return false;
	var docType = model.getDraftDocType(draftIdx),	// 改成判斷文別有無匯出設定的XSL再顯示
		res = false,
		exTXT;
	if("exTXT" in nsEditor) {
		// 匯出TXT之XSL已下載
	}
	else {
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
			theCacheMgr.get({type: "rsrc", rsrc: exTXT, async: false})
			.done(function(xslDoc) {
				if("file" in xslDoc && xslDoc.big5XML == true) {
					var rdr = new FileReader();
					rdr.onload = function() {
						nsEditor.exTXT = (new DOMParser()).parseFromString(this.result, "text/xml");
					}
					rdr.readAsText(xslDoc.file, "Big5");
				}
				else
				nsEditor.exTXT = xslDoc;
			});
		}
		theLogger.log("匯出文字檔.XSL -- ");
		theLogger.log(nsEditor.exTXT);
	}
	if(!!nsEditor.exTXT) {
		var supNodes = nsEditor.exTXT.getElementsByTagNameNS("http://www.2100t.com.tw/2008/OD/Export","supported-doctypes");
		if(supNodes.length > 0) {
			var supDocTypes = supNodes[0].textContent.split("|");
			theLogger.log(supDocTypes);
			if(supDocTypes.indexOf(docType) >= 0) {
				theLogger.warn("匯出文字檔.XSL支援'" + docType + "'");
				res = true;
			}
			// 1080409 Raymond 1071144 新增支援所有文別的匯出TXT功能
			else if(supDocTypes.indexOf("*") >= 0) {
				theLogger.warn("匯出文字檔.XSL支援'*'(所有文別)");
				res = true;
			}
			else
				theLogger.error("匯出文字檔.XSL不支援'" + docType + "'");
		}
		else
			theLogger.error("匯出文字檔.XSL未定義supported-doctypes參數, 無法判斷是否支援'" + docType + "'另存文字檔功能");
	}
	return res;
};

nsEditor.onExportTXT = function(view, model, draftIdx) {
	model.accquireDraftModel(draftIdx)
	.done(function(dm) {
		var xmlDoc = dm.accquireXml(),
			exTXT = nsEditor.exTXT,
			fn = "unnamed.txt";
		theLogger.log("轉換為文字檔...");
		// 預設檔名用文號-序, 或UserID + MsgID + 序
		if(model.getDocNo().length > 0) {
			fn = model.getDocNo() + "-" + Util.padLeft(draftIdx + 1, 3) + ".txt";
		}
		else {
			fn = theUserInfo.UserID + "_" + model.getMsgId() + "-" + Util.padLeft(draftIdx + 1, 3) + ".txt";
		}
		try {
			if("XSLTProcessor" in window) {	// Chrome、Firefox
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
				// 匯出TXT
				var xslt = new XSLTProcessor();
				xslt.importStylesheet(exTXT);
				var res = xslt.transformToDocument(xmlDoc, document);
				theLogger.log("xsl, xml, xslt:");
				theLogger.log(Util.getXml(exTXT));
				theLogger.log(Util.getXml(xmlDoc));
				theLogger.log(res);
				if(res instanceof Document) {
					// 1101115 Raymond 1101223 FireFox不是用pre包住
					if($(res).find("pre").length)	// Chrome會以<html><body><pre>包住轉出的文字
						res = $(res).find("pre").get(0).textContent;//.replace(/\x0A/g, "\x0D\x0A");
					else
						res = res.documentElement.innerHTML;
				}
				var blob = new Blob([res], {type: "text/plain"});
				var a = window.document.createElement("a");
				//1140723	Leslie[1141011]	弱掃修正[Client DOM XSS]
				// a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
				//1140801	Leslie[1141011]	弱掃修正[Client DOM XSS]
				// a.href = encodeURI(window.URL.createObjectURL(blob, {type: "text/plain"}));
				var re = new RegExp(`blob:${location.protocol}//${location.host}/[0-9a-z]{8,8}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{12,12}`);
				var reUrl = re.exec(window.URL.createObjectURL(blob, {type: "text/plain"}))[0];
				a.href = encodeURI(reUrl);
				a.download = fn;
				document.body.appendChild(a);
				a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
				document.body.removeChild(a);
			}
			else {	// IE
				// 匯出TXT
				var msxsl = new ActiveXObject("MSXML2.DOMDocument");
				msxsl.preserveWhiteSpace = true;	// 1101116 Raymond IE不設這個屬性的話, 文字會黏成一行
				var res = msxsl.loadXML(Util.getXml(exTXT));
				/*var exch = msxsl.selectSingleNode("//xsl:variable[@name='exch']");
				exch.text = "TEST.SW";*/
				res = xmlDoc.transformNode(msxsl);
				theLogger.log("xsl, xml, xslt:");
				theLogger.log(Util.getXml(msxsl));	// 2016.11.2 bugfix
				theLogger.log(Util.getXml(xmlDoc));
				theLogger.log(res);
				
				//var xml = Util.getXml(res);
				var blob = new Blob([res], {type: "text/plain"});
				//1140723	Leslie[1141011]	弱掃修正[Client DOM XSS]
				// var url = URL.createObjectURL(blob);
				//1140801	Leslie[1141011]	弱掃修正[Client DOM XSS]
				// var url = encodeURI(URL.createObjectURL(blob));
				var re = new RegExp(`blob:${location.protocol}//${location.host}/[0-9a-z]{8,8}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{12,12}`);
				var reUrl = re.exec(URL.createObjectURL(blob))[0];
				var url = encodeURI(reUrl);
				//var str = "data:application/octet-stream;base64," + Base64.encode(xml);
				if("msSaveBlob" in navigator)	// IE10/11專屬下載function
					navigator.msSaveBlob(blob, fn);
				else
					theLogger.error("無msSaveBlob函式");
			}
		}
		catch(e) {
			theLogger.error(e);
		}
	});
};

// 另存ODT檔, 1111201 Raymond 1110867 新增另存ODT檔功能
nsEditor.onExportODTVisible = function(view, model, draftIdx) {
	// 1090916 Raymond 1090564 信保特殊模式公文不提供此功能
	if(model.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
		return false;
	// 1130813 Raymond 1130313 離線模式不提供另存ODT檔功能
	if(!!theSSO && theSSO.offlineMode == true)
		return false;
	var docType = model.getDraftDocType(draftIdx),	// 2016.10.31 改成判斷文別有無匯出設定的XSL再顯示
		res = false;
	// 1111202 Raymond 1110867 合併1110088, 新增判斷若匯出XSL有與套用的PrintXSL同檔名則使用
	var origPrintXSL = model.getDraftOrigPrintXSLByIndex(draftIdx),
		origPrintXSLFN = undefined;
	if(typeof origPrintXSL === "string" && origPrintXSL.length > 0)
		origPrintXSLFN = origPrintXSL.substr(origPrintXSL.lastIndexOf("\\") + 1);
	thePublicRsrc.enumDirs("匯出設定", function(dir) {
		for(var i=0; i<dir.children.length; i++) {
			var nm = dir.children[i].name;
			if(nm == docType || (!!origPrintXSLFN && origPrintXSLFN == dir.children[i].remote.path)) {// 1111202 Raymond 1110867 合併1110088, 新增判斷若匯出XSL有與套用的PrintXSL同檔名則使用
				res = true;
				break;
			}
		}
	});
	return res;
};

nsEditor.onExportODT = function(view, model, draftIdx) {
	var that = this;
	
	// 轉檔Util - copy from RD-RndrAtt.js
	function ServerList() {
		var _list = SSO_CONFIG.getIsoConvertURLs();	// 2016.8.29 改讀SSO_CONFIG.getIsoConvertURLs()
		if(_list.length > 0) {
			theLogger.log("轉附件頁面工作站:");
			for(var i=0; i<_list.length; i++)
				theLogger.log(_list[i]);
		}
		else
			theLogger.warn("未設定任何轉附件頁面工作站網址!");
		this.add = function(url) {
			_list.push(url);
		}
		this.get = function(idx) {
			return _list[idx];
		}
		this.suffle = function() {
			var mem = [];
			mem.length = _list.length;
			return {
				pick: function() {
					while(1) {
						var idx = Math.floor(Math.random() * _list.length);
						if(mem[idx]) {
							var alltry = true;
							for(var i=0; i<mem.length; i++) {
								if(!mem[i]) {
									alltry = false;
									break;
								}
							}
							if(alltry)
								return null;
							continue;
						}
						else {
							mem[idx] = true;
							return _list[idx];
						}
					}
				}
			}
		}
	}
	var _serverList = new ServerList();
	
	var _lockedUrl = "";		// 2016.8.5 已鎖定工作站
	var _lockedPath = "";		// 2016.8.5 已鎖定工作站的上傳目錄
	var _bUplading = false;		// 2016.11.29	Leslie	修正附件匯出未完成，僅需加入待轉集合即可，無需重覆執行轉出邏輯
	
	function queryState() {
		var dfd = $.Deferred();
		var suffle = _serverList.suffle();
		function doQS() {
			try {
				var params = {};
				var url = suffle.pick();
				if(url) {
					_url = url;
					var t0 = new Date();
					theWebServices.invokeWS(url, "QueryState", "http://2100T.com.tw", params, true, function(r) {
						var t = new Date();
						theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - QueryState returns(" + (t - t0) + "ms): " + r);
						if(typeof r === "string" && r.length > 0) {
							var p = r.indexOf("|");
							if(p > 0) {
								var stat = r.substring(0, p);
								if(stat == "Idle") {
									_lockedUrl = url;						// 2016.8.5 記錄已鎖定工作站
									_lockedPath = r.substring(p+1);			// 2016.8.5 記錄已鎖定工作站的上傳目錄
									dfd.resolve(url, r.substring(p+1));
								}
								else
									doQS();
							}
							else if(r == "Busy")
								doQS();
							else
								dfd.reject("回傳格式不正確:'" + r + "'");
						}
						else {
							if(r.Err != undefined)
								dfd.reject("轉檔工作站["+_url.split('/')[2]+"]目前無法正常工作，請連絡公文系統駐點人員或公文管理員處理。\n異常訊息："+r.Err.ErrMsg);	//2016.11.25	Leslie	修正異常訊息
							else
								dfd.reject("呼叫QueryIdle成功但無返回資料!");
						}
					});
				}
				else
					dfd.reject("所有附件轉檔工作站均忙碌中，請稍候數分鐘再執行另存功能。");	// 修改忙碌中訊息
			}
			catch(e) {
				alert(e.stack || e.message);
			}
		}
		if(_lockedUrl.length && _lockedPath.length)	// 2016.8.5 重複使用已鎖定工作站
			dfd.resolve(_lockedUrl, _lockedPath);
		else
			doQS();
		return dfd.promise();
	}
	
	// 解鎖工作站
	function unlockServer() {
		if(_lockedUrl.length && _lockedPath.length) {
			var t0 = new Date();
			//1060503	Leslie[1060275]	修改子目錄組成邏輯，最後的(A)?B:C判斷式，應以括號獨立括起來，此錯誤會造成置換時新的附件影像無法正確產出，仍顯示前次附件的影像
			//var subdir = theSSO.User.account + "-" + (theAOL.docObj.docNo.length)?theAOL.docObj.docNo:theAOL.docObj.msgId;
			var subdir = theSSO.User.account + "-" + ((model.getDocObj().docNo.length)?model.getDocObj().docNo:model.getDocObj().msgId);
			theWebServices.invokeWS(_lockedUrl, "SetQueryStateIdle", "http://2100T.com.tw", {ProcessID: subdir}, true, function(r) {
				var t = new Date();
				theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - SetQueryStateIdle success(" + (t - t0) + "ms): " + r);
				_lockedUrl = _lockedPath = "";
			});
		}
	}
	
	// ODFConvert
	function odfConvert(url, filePath, fileIOWS, uploadPath) {
		var dfd = $.Deferred();
		var params = {
			TranFile: filePath,
			FileIOWS: fileIOWS,
			UploadPath: uploadPath,
			SAMLart: localStorage['Artifact']
		}
		function getParamsXml() {
			var res = "";
			for(field in params) {
				res += "<" + field + ">" + params[field] + "</" + field + ">";
			}
			return res;
		}
		
		var envelope = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
							'<soap:Body>' +
								'<ODFConvert xmlns="http://2100T.com.tw">' +
									getParamsXml() +
								'</ODFConvert>' +
							'</soap:Body>' +
						'</soap:Envelope>\r\n';
		//theLogger.debug(envelope);
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		
		var t0 = new Date();
		theWebServices.invokeWS(url, "ODFConvert", "http://2100T.com.tw", params, true, function(res, resXml) {
			var t = new Date();
			theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - ODFConvert returns(" + (t - t0) + "ms): ");
			theLogger.debug(res);
			theLogger.debug(resXml);
			//1050920	Leslie	增加處理回傳的錯誤訊息
			if(('rtnErr' in res) && (typeof res.rtnErr == 'object')){
				dfd.reject(res.rtnErr.Err.ErrMsg);
			}
			dfd.resolve(res);
		});
		return dfd.promise();
	}
	function procConvert(fn, cvtrfn, htmlData) {
		var dfd = $.Deferred(), t0 = new Date(), tOvr = t0;
		theLogger.log(t0.getHours() + ":" + t0.getMinutes() + ":" + t0.getSeconds() + " - 處理'" + fn + "'轉換為'" + cvtrfn + "'...");
		// 1.鎖定
		queryState().done(function(url, path) {
			var t = new Date();
			theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - lock success(" + (t - t0) + "ms)");
			t0 = t;
			// 2.上傳
			var subdir = theSSO.User.account + "-" + ((model.getDocObj().docNo.length)?model.getDocObj().docNo:model.getDocObj().msgId);	//2017.2.22	Leslie	修改子目錄組成邏輯，最後的(A)?B:C判斷式，應以括號獨立括起來
			var filePath = path + "\\" + subdir;
			(new WebFileIO(url)).upload(filePath, fn, htmlData, {
				transcode: 1,	// 上傳新增transcode參數, 設定1表示必須強制轉換為UTF-16, 上傳後檔案才不會出現亂碼
				success: function(fname, fpath) {
					t = new Date();
					theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - upload success(" + (t - t0) + "ms) '" + fname + "', '" + fpath + "'");
					t0 = t;
					var bkDirPath = theSSO.User.SystemSets.get("WORK_PATH");
					if(bkDirPath[bkDirPath.length - 1] != "\\")
						bkDirPath += "\\";
					bkDirPath += model.getDocObj().sourceOrgNo + "\\" + theUserInfo.UserID + "\\" + ((model.getDocObj().isDraft)?model.getDocObj().msgId:(model.getDocObj().docNo + "_" + model.getDocObj().msgId));
					theLogger.warn("使用自動備份目錄'" + bkDirPath + "'做為轉出路徑");
					// 3.轉換
					odfConvert(url, filePath + "\\" + fn, model.getDocObj().fileIOWS, bkDirPath).done(function(allparts) {
						t = new Date();
						if(!!allparts && !!allparts.FileList)
							theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - 轉換成功! 回傳'" + allparts.FileList.string + "'(" + (t - t0) + "ms)");
						else
							theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - 轉換成功! 回傳", allparts, "(" + (t - t0) + "ms)");
						t0 = t;
						
						// 4.重置Idle
						unlockServer();
						
						// 5.到FileServer上的WORK_PATH下載轉出的ODT檔
						(new WebFileIO(model.getDocObj().fileIOWS)).download(bkDirPath, cvtrfn, {
							//async: false,	// 非同步
							keepRawData: true,
							success: function (rslt, wfiores) {
								t = new Date();
								if (rslt !== undefined) {
									theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - 下載轉換後的ODT檔成功!(" + (t - t0) + "ms, 總耗時" + (t - tOvr) + "ms)");
									var blob = new Blob([rslt], {type: "application/vnd.oasis.opendocument.text"});
									if("msSaveBlob" in navigator)	// IE10/11專屬下載function
										navigator.msSaveBlob(blob, cvtrfn);
									else {
										var a = window.document.createElement("a");
										//1140723	Leslie[1141011]	弱掃修正[Client DOM XSS]
										// a.href = window.URL.createObjectURL(blob, {type: "application/vnd.oasis.opendocument.text"});
										//1140801	Leslie[1141011]	弱掃修正[Client DOM XSS]
										// a.href = encodeURI(window.URL.createObjectURL(blob, {type: "application/vnd.oasis.opendocument.text"}));
										var re = new RegExp(`blob:${location.protocol}//${location.host}/[0-9a-z]{8,8}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{4,4}-[0-9a-z]{12,12}`);
										var reUrl = re.exec(window.URL.createObjectURL(blob, {type: "application/vnd.oasis.opendocument.text"}))[0];
										a.href = encodeURI(reUrl);
										a.download = cvtrfn;
										document.body.appendChild(a);
										a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
										document.body.removeChild(a);
									}
									dfd.resolve();
								}
								else {
									theLogger.error(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - WebFileIO呼叫成功但" + cvtrfn + "未下載!(" + (t - t0) + "ms)");
									dfd.reject("WebFileIO呼叫成功但" + cvtrfn + "未下載");
								}
							},
							error: function (errorText) {
								t = new Date();
								theLogger.error("下載" + cvtrfn + "失敗(" + (t - t0) + "ms) - " + errorText);
								dfd.reject("下載" + cvtrfn + "失敗 - " + errorText);
							}
						});
					})
					.fail(function(errText) {
						t = new Date();
						theLogger.error("ODFConvert失敗(" + (t - t0) + "ms) - " + errText);
						// 4.重置Idle
						unlockServer();
						dfd.reject("轉換為ODT格式失敗 - " + errText);
					});
				},
				error: function(errText) {
					t = new Date();
					theLogger.error("上傳" + fn + "檔至轉檔工作站失敗(" + (t - t0) + "ms) - " + errText);
					// 4.重置Idle
					unlockServer();
					dfd.reject("上傳" + fn + "檔至轉檔工作站失敗 - " + errText);
				}
			});
		})
		.fail(function(errText) {
			var t = new Date();
			theLogger.error("QueryState失敗(" + (t - t0) + "ms) - " + errText);
			dfd.reject(errText);
		});
		return dfd.promise();
	}
	// end of Util
	
	var dname = model.getDraftName(draftIdx);
	theLogger.log("另存'" + dname + "成ODT格式");
	// 預設檔名用文號-序, 或UserID + MsgID + 序
	var fn = "";
	if(model.getDocNo().length > 0)
		fn = model.getDocNo() + "-" + Util.padLeft(draftIdx + 1, 3) + ".htm";
	else
		fn = theUserInfo.UserID + "_" + model.getMsgId() + "-" + Util.padLeft(draftIdx + 1, 3) + ".htm";
	theLogger.log("預轉的HTML檔名'" + fn + "'");
	var cvtrfn = fn.replace(/.htm$/, ".odt");
	theLogger.log("預設下載檔名'" + cvtrfn + "'");
	
	SSOUtil.loading("show", {text: "處理中...", textVisible: true});
	model.accquireDraftModel(draftIdx)
	.done(function(dm) {
		var xmlDoc = dm.accquireXml();
		// 1140114 Raymond 1131139 修正以轉換為完稿結果的XML再套預轉HTML的OutXSL檔, 以避免轉出的ODT出現已標記刪除的文字
		if("transCmplXml" in nsEditor) {
			xmlDoc = nsEditor.transCmplXml(xmlDoc);
		}
		//var xml = Util.getXml(data, false, "UTF-8");	// 指定encoding屬性為UTF-8, 因為下載後的檔案會變成UTF-8
		
		var docType = dm.getDocType();	// 文別
		// 1111202 Raymond 1110867 合併1110088, 新增判斷若匯出XSL有與套用的PrintXSL同檔名則使用
		var origPrintXSL = model.getDraftOrigPrintXSLByIndex(draftIdx),
			origPrintXSLFN = undefined;
		if(typeof origPrintXSL === "string" && origPrintXSL.length > 0)
			origPrintXSLFN = origPrintXSL.substr(origPrintXSL.lastIndexOf("\\") + 1);
		var fitRsrcFile = undefined;
		thePublicRsrc.enumDirs("匯出設定", function(dir) {
			for(var i=0; i<dir.children.length; i++) {
				var nm = dir.children[i].name;
				// 1111202 Raymond 1110867 合併1110088, 新增判斷若匯出XSL有與套用的PrintXSL同檔名則「優先」使用
				if(!!origPrintXSLFN && origPrintXSLFN == dir.children[i].remote.path) {
					fitRsrcFile = dir.children[i];
					break;
				}
				else if(nm == docType) {
					fitRsrcFile = dir.children[i];
				}
			}
		});
		if(!!fitRsrcFile) {
			var ph = fitRsrcFile.remote.path;
			theLogger.log("下載'" + ph + "'...");
			theCacheMgr.get({type: "rsrc", rsrc: fitRsrcFile})
			.done(function(xslDoc) {
				theLogger.log("轉換為HTML...");
				var proceedWithDataXML = false;
				try {
					if("XSLTProcessor" in window) {
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
						var v = xslDoc.evaluate("xsl:variable[@name='稿序']", xslDoc.documentElement, nsResolver, 7, null);
						if(v != null && v.snapshotLength > 0) {
							var paramNode = v.snapshotItem(0);
							paramNode.textContent = dname;
							theLogger.log("套用排版參數[稿序]: '" + paramNode.textContent + "'");
						}
						v = xslDoc.evaluate("xsl:variable[@name='dataXml']", xslDoc.documentElement, nsResolver, 7, null);
						if(v != null && v.snapshotLength > 0) {
							var dataXml = v.snapshotItem(0);
							proceedWithDataXML = true;
							theLogger.log("取得Data.XML資料");
							// 1120901 Raymond 1120407 修正取得DataXML時以本件公文的機關代碼為準, 而非目前切換的activeRole的機關代碼
							//thePublicRsrc.getDataXML(Common.activeRole.orgNo)
							thePublicRsrc.getDataXML(model.getDocObj().sourceOrgNo)
								.done(function(datDoc) {
									theLogger.log("填入Data.XML節點至dataXml變數");
									dataXml.appendChild(datDoc.documentElement);
								})
								.fail(function(errorText) {
									theLogger.warn(errorText);
								})
								.always(function() {
									console.log("xsl, xml, xslt:");
									console.log(xslDoc);
									console.log(xmlDoc);
									var xslt = new XSLTProcessor();
									xslt.importStylesheet(xslDoc);
									var res = xslt.transformToFragment(xmlDoc, document);
									if(res) {	// 2016.8.4 新增判斷轉換結果, 回傳null可能是PrintXSL有問題
										console.log(res);
										if(!(res instanceof Document)) {	// OutXSL用output="xml"時, res會是document-fragment, 轉回document
											var xml = (new XMLSerializer()).serializeToString(res);
											res = (new DOMParser()).parseFromString(xml, "text/html");
										}
										procConvert(fn, cvtrfn, res)
										.fail(function(errText) {
											alert(errText);
										})
										.always(function() {
											SSOUtil.loading("hide");
										});
									}
									else {
										theLogger.error("套用XSL(transfromToFragment)失敗!");
										alert("套用XSL失敗!");
										SSOUtil.loading("hide");
									}
								});
						}
						else {
							console.log("xsl, xml, xslt:");
							console.log(xslDoc);
							console.log(xmlDoc);
							var xslt = new XSLTProcessor();
							xslt.importStylesheet(xslDoc);
							var res = xslt.transformToDocument(xmlDoc, document);
							console.log(res);
						}
					}
					else {
						var paramNode = xslDoc.selectSingleNode("/*/xsl:variable[@name='稿序']");
						if(paramNode) {
							paramNode.text = dname;
							theLogger.log("套用排版參數[稿序]: '" + paramNode.text + "'");
						}
						var dataXml = xslDoc.selectSingleNode("/*/xsl:variable[@name='dataXml']");
						if(dataXml) {
							proceedWithDataXML = true;
							theLogger.log("取得Data.XML資料");
							// 1120901 Raymond 1120407 修正取得DataXML時以本件公文的機關代碼為準, 而非目前切換的activeRole的機關代碼
							//thePublicRsrc.getDataXML(Common.activeRole.orgNo,true)	//2017.01.19	Leslie	增加傳入是否取得MSXML2物件
							thePublicRsrc.getDataXML(model.getDocObj().sourceOrgNo,true)	//2017.01.19	Leslie	增加傳入是否取得MSXML2物件
								.done(function(datDoc) {
									theLogger.log("填入Data.XML節點至dataXml變數");
									if("selectSingleNode" in datDoc) {	// 2017.1.18 確認datDoc是MSXML2物件的話, 就不用重新載入
										dataXml.appendChild(datDoc.documentElement);
									}
									else {
										var str2 = Util.getXml(datDoc);
										datDoc = new ActiveXObject("MSXML2.DOMDocument");
										res = datDoc.loadXML(str2);
										if(res)
											dataXml.appendChild(datDoc.documentElement);
										else {
											var pe = datDoc.parseError;
											theLogger.error("載入Data.XML失敗! " + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
										}
									}
								})
								.fail(function(errorText) {
									theLogger.warn(errorText);
								})
								.always(function() {
									console.log("xsl, xml, xslt:");
									try {	// for IE-compatible
										console.log(xslDoc.xml);
										console.log(xmlDoc.xml);
									}
									catch(e) {
										theLogger.error("dump xml failed! - " + e.message);
									}
									try {
										res = xmlDoc.transformNode(xslDoc);
										if(res) {
											console.log(res.xml);
											res = (new DOMParser).parseFromString(res, "text/html");
											if(res) {
												console.log(res);
												procConvert(fn, cvtrfn, res)
												.fail(function(errText) {
													alert(errText);
												})
												.always(function() {
													SSOUtil.loading("hide");
												});
											}
											else {
												theLogger.error("套用PrintXSL(parseFromString)失敗!");
												alert("套用XSL失敗!");
												SSOUtil.loading("hide");
											}
										}
										else {
											theLogger.error("套用XSL(transformNode)失敗!");
											alert("套用XSL失敗!");
											SSOUtil.loading("hide");
										}
									}
									catch(e) {
										theLogger.error(e.stack || e.message);
										alert("套用XSL失敗! " + e.message);
										SSOUtil.loading("hide");
									}
								});
						}
						else {
							var msxsl = new ActiveXObject("MSXML2.DOMDocument");
							var res = msxsl.loadXML(Util.getXml(xslDoc));
							console.log("xsl, xml, xslt:");
							console.log(Util.getXml(msxsl));	// 2016.11.2 bugfix
							console.log(Util.getXml(xmlDoc));
							res = xmlDoc.transformNode(msxsl);
							console.log(Util.getXml(res));
						}
					}
					if(!proceedWithDataXML) {
						procConvert(fn, cvtrfn, res)
						.fail(function(errText) {
							alert(errText);
						})
						.always(function() {
							SSOUtil.loading("hide");
						});
					}
				}
				catch(e) {
					theLogger.error(e.stack || e.message);
					alert(e.message);
					SSOUtil.loading("hide");
				}
			})
			.fail(function(errorText) {
				theLogger.error(errorText);
				alert(errorText);
				SSOUtil.loading("hide");
			});
		}
		else {
			theLogger.error("找不到適用於" + docType + "之匯出XSL檔");
			alert("找不到適用於" + docType + "之匯出XSL檔");
			SSOUtil.loading("hide");
		}
	});
};

// (附件)重新命名, 1120314 Raymond 1111133 新增來文附件重新命名功能
nsEditor.onRenameAttNameVisible = function(view, model, draftIdx, attIdx) {
	return model.isFromDoc(draftIdx) &&		// 只有來文附件及
		model.isICOUDraftMgmtEditable();	// 目前文稿管理檔為可編輯狀態時才顯示此指令列按鈕
}

nsEditor.onRenameAttName = function(view, model, draftIdx, attIdx) {
	var $viewPort = $(this).closest(".viewPort");
	var $ti = $viewPort.find(".tags .tags-group .tags-item-active > div");
	var txt = $ti.text();
	$ti.text("");
	// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
	// var $inp = $("<input type='text' maxlength='4' value='" + txt + "'>").appendTo($ti);
	var $inp = $("<input type='text' maxlength='4' value='" + HtmlEncode(txt) + "'>").appendTo($ti);
	$inp.on("blur keydown", function(evt) {
		if(evt.type == "blur" || evt.keyCode == 13) {	// onblur或Enter keydown
			model.setFromDocAttName(attIdx, this.value);
			$(this).remove();
			$ti.text(model.getDraftAttName(draftIdx, attIdx));
		}
	}).focus();
	$viewPort.data("editCursor").cmdFloat.hide();
};

// 來文DI直接以DocView新分頁開啟, 1120220 Raymond 1120234 新增來文DI可直接在DocView新分頁中單獨載入顯示
nsEditor.onViewFromDocVisible = function(view, model, draftIdx) {
	return model.hasFromDoc() && theSSO.User.EnvSettings.get("AOL_VIEW_FROM_DOC_DI") == "Y";
}

nsEditor.onViewFromDoc = function(view, model, draftIdx) {
	var fromDIFileName, fromDIPath = model.getDocObj().fileStoragePath + model.getDocObj().fileSubDir;
	var fd = model.getEDraft(draftIdx);
	if(!!fd.fileRef && !!fd.fileRef.name)
		fromDIFileName = fd.fileRef.name;

	var wfio = new WebFileIO(model.getDocObj().fileIOWS);
	wfio.download(fromDIPath, fromDIFileName, {
		keepRawData: true,	// 保持原始資料格式(Typed Array)
		//async: false,	// 1061117 Raymond 1061118 調換附件順序時, 須先下載"完"所有附件原始檔, 才進行轉檔, 因此下載其它附件檔途中萬一第1個附件檔已經完成轉檔, 可能會覆蓋掉其它還沒開始轉的附件檔, 若副檔名一樣會變成有2個相同內容的附件檔, 改成sync應該可以避免此情況發生, 但附件檔案太大可能會有衍生問題
		success: function (fil, all) {
			let unvObjForPDoc = {UnvRoot: {
				Doc: {
					SourceOrgNo: model.getDocObj().sourceOrgNo,
					DocNo: model.getDocNo(),
					Att: [{
						Type: '99', // 歷史公文一律給'99', 另以RD-ViewDoc.html內嵌AOL開啟
						Alias: '"來文DI檔', 
						PrintEnable: 'TRUE',
						File:{
							Pages: '1', 
							FileName: fromDIFileName,
							FilePath: fromDIPath,
							WSDL: model.getDocObj().fileIOWS
							},
						Group:{GrpName:'來文附件檔-1', StartPO: '0'}
					}]
				}
			},
			viewType: "FromDocDI"};	// 新增viewType, 指定為"FromDocDI"可直接讓AOL以假的DraftMgmt.xml開啟來文DI檔檢視

			let _signType = 'P';
			var objViewDoc = {
				UNVObj: unvObjForPDoc,
				docInfoPage:"UniView",
				openDocModule:'AOL',
				signType:_signType,
				readOnlyMode:true,
				disableSave:true,
				//HistoryDoc:true, // 107.10.9
			};

			let docNo = '';
			let doc = unvObjForPDoc.UnvRoot.Doc;
			if (typeof doc =='object') {
				if ($.type(doc)=='array' && doc.length) {
					docNo = doc[0].DocNo;
					doc = doc[0];
				}
				else {
					docNo = doc.DocNo;
				}

				let i=0, att = null;
				if ($.type(doc.Att)=='array') {
					for(i=0; i<doc.Att.length; i++) {
						let _att = doc.Att[i];
						if (typeof _att=='object' && _att!==null && _att.Type=='99') {
							let theAtt = jQuery.extend(true, {}, _att);
							theAtt.Type = '0';
							doc.Att = theAtt;
							break;
						}
					}
				}
				else {
					alert('無效的群組資訊! [開啟歷史公文, Doc.Att內容不為Array]');
					return;
				}
			}
			else {
				alert('無效的公文資訊. [invalid UNVObj.UnvRoot.Doc]');
				return;
			}

			let docId = docNo + '_' + Util.genGUID();
			//alert('Open DocNo:' + docNo + '\'s DI content with AOL...');
			localStorage['viewDoc_out_'+docId] = JSON.stringify(objViewDoc);
			let url = 'RD-ViewDoc.html?Artifact=' + localStorage.Artifact + '&DocId=' + encodeURI(docId);
			let wndDIAOL = window.open(url, '_blank');
		},
		error: function (errorText) {
			alert(errorText);
		}
	});
};


// 1130910	Leslie[1130694]	新增於來文頁籤可開啟EDI021 來文文字子視窗
nsEditor.onViewRcvTextVisible = function(view, model, draftIdx) {
	if(model && (model.getDocObj().get("ODWMSG", "SYSID").length > 0 || model.getDocObj().get("ODWDCM", "RCVSCAN_SYSID").length > 0 ))	// SYSID有值表示電子來文，RCVSCAN_SYSID有值表示有收文掃描
		return true;
	return false;
}

nsEditor.onViewRcvText = function(view, model, draftIdx) {
	
	var url = theSSO.User.EnvSettings.get("WS_ED_SITE");
	if(url) {
		var SAMLart = localStorage["Artifact"];
		var kv1 = model.getDocObj().get("ODWMSG", "SYSID");
		var kv2 = model.getDocObj().get("ODWDCM", "RCVSCAN_SYSID");
		//1140505	Leslie[1140556]	取消網址參數權杖
		//url = url + "ED0/EDI012.aspx?SAMLart=" + SAMLart + "&kv1=" + kv1 + "&kv2=" + kv2;
		url = url + "ED0/EDI012.aspx?kv1=" + kv1 + "&kv2=" + kv2;
		theLogger.log("開啟來文文字網頁'" + url + "'");
		/*$(this).attr({
			"data-role": "none",
			"data-ajax": "false",
			"rel": "external",
			"target": "new",
			"href": url
		});*/
		window.open(url, '_blank');
	}
	else {
		theLogger.error("環境變數'WS_ED_SITE'未設定");
		alert("環境變數'WS_ED_SITE'未設定");
	}
};

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-DraftCmds.js").finish();	// 2016.11.10 fix file name
})();