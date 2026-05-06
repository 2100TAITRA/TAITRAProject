// SignWork class
//   加簽工作檔
// DATE		SA		PRG		MGR_NO	DESC
// 1060414	Raymond	Raymond	-------	修正儲存後再載入做第2次儲存時, 已匯出頁面沒有fileSN導致未寫入前一次已匯出頁面的原始檔名的錯誤
// 1060602	Raymond	Raymond	-------	新增記錄文稿ID, 供找不到對應頁面時, 延後到頁面排版後再綁定的功能-FDA序4361
// 1060825	Raymond	Raymond	1060661	修正暫存的簽核物件在附件頁面上時, 誤加入到文稿的頁面上的問題
// 1060901	Raymond	Raymond	1060766	若受會不可重新匯出頁面但因排版差異而導致簽核物件記錄在封裝檔不存在的頁次, 在SignWork.xml中寫入前一版本的頁面ID及頁次到parent-id及page-index, 另外此流程點當時所呈現的頁面及頁次則記錄於新增的acturalPgId、acturalPgIdx
// 1060930	Raymond	Raymond	1060962	修正異動撤消或封裝成功傳送失敗時, 需載入傳送前SignWork.xml但文稿ID與封裝檔重編後不一致的問題
// 1061003	Raymond	Raymond	1060989	修正暫存後附件頁面無法再加入新的簽核物件問題
// 1061025	Raymond	Raymond	1061005 修正非分文後第1個流程點在來文內容及來文附件頁面上加簽核物件儲存會發生錯誤的問題
// 1061117	Raymond	Raymond	1061118	附件若未重新匯出頁面且有cachedDOM, 直接複製寫入暫存檔, 讀取時判斷附件頁面是否有重新匯出, 若無則保留封裝檔的附件節點內容, 包含以前流程點所加的簽核物件
// 1070112	Raymond	Raymond	1060452	若是鐵工局的秘書, 不要設定SignWork.xml的簽辦意見, 上傳秘書的簽辦意見檔
// 1070118	Raymond	Raymond	1070035	修正非異動撤消時, SignWork.xml因調整稿序導致ID與照順序編設的新稿ID不一致, 而重設SignWork.xml中的文稿ID會導致套用樣版錯誤而無法開啟文稿的問題
// 1070817  Kevin   Zen     1070678 弱掃XSS修正
// 1071221	Raymond	Raymond	1071260	修正重新匯出頁面超過一定頁數後, 可能有一頁附件會與前個版本的本文頁次ID相同, 導致應蓋在本文頁次的簽核物件被誤判加在附件頁次下的問題
// 1071222	Raymond	Raymond	-------	若簽核物件為文稿頁面且位於簽核區域內, 則從AOLProccessData.xml中搜尋實際影像頁面上的簽核區域, 計算出絕對座標, 若文稿內文未異動僅加簽核物件, 簽核物件應跟隨文稿匯出頁面當時的簽核區域, 而不是目前簽核時看到的簽核區域位置, 這樣若歷史檢視與簽核時排版不一致時才不會位置錯誤
// 1080328	Raymond	Raymond	1080206	修正新增簽稿會核單在樣版(PrintXSL)有設定簽核區域的情形下, 傳送時GenPage會寫文稿頁面未設定寬高的錯誤的問題
// 1080823	Raymond	Raymond	1080708	新增儲存SignWork.xml時, 檢核新增的章戳圖檔檔名是否為空, 是則跳出錯誤訊息並中斷儲存
// 1081217	Raymond	Raymond	-------	修正文字意見的XSS漏洞
// 1090312	Raymond	Raymond	1081105	新增選用章戳連動職名章功能, 記錄連結資訊於圖檔及文字意見簽核物件
// 1090424	Raymond	Raymond	1090305	修正數位墨水圖檔偶而會沒有顯示的問題
// 1090916	Raymond	Raymond	1090546	新增支援信保特殊模式公文相關修改
// 1091006	Raymond	Raymond	1090736	修正來文擬辦新增稿一並增加內文到2頁加簽核物件後再新增稿二, 儲存後再開啟, 稿一的簽核物件會顯示在稿二的問題, 並修正來文擬辦新增2頁文稿, 加入附件並匯出附件頁面後, 再刪減文稿內文至1頁, 於附件頁面上新增簽核物件, 儲存關閉後再開啟, 附件頁面上簽核物件會消失的問題
// 1091231	Raymond	Raymond	信保序138	修正代理人蓋章的tooltip應顯示代理人姓名而非被代理人姓名
// 1100416	Raymond	Raymond	1090564	修正在信保特殊模式公文的草稿附件頁面上新增簽核物件, 儲存關閉再開啟後會不見的問題
// 1100517	Raymond	Raymond	1100298	新增取代他流程文字意見功能
// 1100531	Raymond	Raymond	1100681	修正異動內文未異動附件同時在附件頁面上加簽核物件時, 儲存後再開啟會發生找不到附件GUID而無法顯示之前在附件頁面上新增的簽核物件的問題
// 1100607	Raymond	Raymond	國教院序37	修正簽稿會核單/會辦單文別的更新文稿的保留簽署意見flag設置條件(1080785+1090409衍生問題)
// 1100615	Raymond	Raymond	1100639	新增若載入SignWork.xml不是目前流程點的, 回傳false, 以解決異動撤消後, 文稿內文若已被異動, 則因未恢復dirty狀態, 而導致傳送時不會匯出文稿頁面的問題
// 1100616	Raymond	Raymond	1100552	修正草稿新增三文稿再刪除一文稿再調整稿序後, 儲存再開啟, 已匯出附件頁面的稿件未顯示附件頁籤的問題
// 1100707	Raymond	Raymond	1100648	新增支援分文稿記錄簽核意見功能
// 1100715	Raymond	Raymond	1100854	新增[高大客製化]支援讀取及寫出SignWork.xml暫存檔的"產生時間"屬性為包含秒的13碼
// 1100820	Raymond	Raymond	1101066	修正原本無附件文稿, 在傳送後新增附件, 儲存關閉再開啟後, 附件頁面上無法加簽核物件問題(補單號)
// 1100910	Raymond	Raymond	1100771	修正未異動內文但簽核物件位於封裝檔頁數(問題案例為3頁)後動態排版多出的新頁面(問題案例為第4頁), 因改判讀前一次暫存的頁面ID(小於100, 問題案例為'1')但找不到上層<文稿>而發生「Cannot read property 'replace' of undefined」錯誤的問題
// 1101102	Raymond	Raymond	1100991	修正弱掃Client Potential XSS
// 1110106	Raymond	Raymond	1101423	修正「轉線上」(EDT213)後的公文, 開啟儲存後文稿管理檔仍殘留轉線上之前新增的舊文稿(簽核頁面看不到但發文登錄會列出)的問題
// 1110119	Raymond	Raymond	1101548	開啟會核中-主辦(FOLDER_DISCUSS)或已送出-線上簽核(FOLDER_SUBMIT)的公文, 呼叫ODMSSP新增的GetDocTodoListNow方法查詢目前實際Owner的MsgID, 判斷應否載入SignWork.xml暫存檔
// 1110301	Raymond	Raymond	1110106	合併1080815, 修正可支援讀入不匯出頁面的附件屬性
// 1110620	Raymond	Raymond	1110579	異動撤消後載入文號-00-99子目錄下的SignWork_msgId.xml備份檔還原時, 用XSignObjs.xml記錄的資訊反查當時傳送後職名章的影像檔名再載入
// 1120210	Raymond	Raymond	1111035	若文字意見是貼式狀態, 則寫入未以邊框寬度自動折行的原始文字, 以避免傳送後檢視及列印文字意見頁面顯示貼式文字意見為以較窄寬度自動折行的排版結果
// 1120519	Raymond	Raymond	1120379	修正讀取SignWork.xml時, 若文字意見的文字內容的srcContent屬性為空時, 此簽核物件會因無srcContent而使breakLineForTextComment發生Exception, 導致轉圈圈無法繼續操作的問題
// 1120817	Raymond	Raymond	1120503	新增支援預先匯出的文稿頁面影像記錄
// 1121005	Raymond	Raymond	1111194	修正受會單位新增文稿後, 在順會待核示或分會待核示中修改文稿儲存後再開啟, 文稿原始檔名被錯誤記錄為「文號-受會單位代碼-01」路徑的問題
// 1121114	Raymond	Raymond	1120503	修正自動備份時, 若第2筆後的文稿未點開時, 會出現cdm是null的錯誤, 導致備份的檔案缺少了SignWork.xml、XSignObjs.xml及章戳圖檔的問題
// 1130315	Raymond	Raymond	1130050	新增支援儲存讀取「貼布」簽核物件, 新增的簽核物件依ID由小至大排序
// 1130524	Raymond	Raymond	1130179	修正來文擬辦新增文稿及附件後再加蓋職名章於文稿頁面, 傳送後再撤回(或異動撤消), 會發生加蓋於文稿頁面的簽核物件被移至附件的倒數第2+%文稿頁面數%的頁面上(案例公文為共15頁的附件一的第12頁)的問題
// 1130705	Raymond	Raymond	中榮序139	新增影像式選用章戳記錄章戳名稱功能
// 1130710	Raymond	Raymond	1130637	儲存簽核物件後清除sessionNew屬性, 以避免關閉公文時再跳出提醒已異動應儲存的提示訊息
// 1130718	Raymond	Raymond	1120899	修正在不匯出附件頁面的設定下, 調整附件順序後儲存, 關閉再開時附件頁籤名稱及檔名變回未調整前的名稱及檔名, 若再儲存或傳送的話, 會造成與文稿管理檔記錄的檔名不一致而導致傳送失敗的問題
// 1130803	Raymond	Raymond	中興序167	修正在要匯出附件頁面的設定下有2筆附件以上時, 異動內文後儲存關閉再開時, 第2筆以後的附件的"原始檔序號"屬性會不見, 造成傳送會失敗的問題
// 1130830	Raymond	Raymond	中榮序218	載入XSignObjs.xml時, 異動過的文稿版本, 改移至暫存而不是直接刪除, 在載入SignWork.xml後, 判斷Updates中有此文稿ID再恢復, 以避免第二筆文稿未點開的情況下自動備份, 不會寫出ID有X的版本, 但SignWork.xml中Updates有此ID的異動文稿, 若不正常關閉系統再用自動備份復原的話, 會導致傳送時發生-731問題
// 1131115	Raymond	Raymond	北榮序378	修正在會核中-主辦或已送出-線上簽核資料夾開啟公文後, 因1101548需要載入目前OwnUser寫的工作檔SignWork.xml, 新增判斷載入的工作檔若為別的流程點所寫入, 則不載入此工作檔所記錄的簽核物件
// 1141117	Raymond	Raymond	1141442	修正RegExp.$1可能是空值的問題
// 1141128	Raymond	Raymond	1141255	新增附件頁面需要從工作站暫存路徑搬移到FileServer時(儲存), 全徑名的原始檔名要更名為僅有檔名, 備份時也是

// 1120811 Raymond 1120503 新增callback3收集須上傳的預先匯出文稿頁面影像
//function SignWork(fm, signFolder, callback, callback2) {	// 2016.7.20 新增callback收集須上傳的附件匯出頁面影像, 2016.12.15 新增fm(FolioModel)參數, 用來傳入prepareSignWork()
															// 1070111 Raymond 1060452 新增callback2若是鐵工局的秘書, 須上傳秘書的簽辦意見檔
function SignWork(fm, signFolder, callback, callback2, callback3) {
	// private members
	var _updDrafts = new Array();
	//var _doc = (new DOMParser()).parseFromString("<加簽工作檔></加簽工作檔>", "text/xml");
	var _doc = signFolder.prepareSignWork(fm, function(updId, draft) {  // 2013.9.25 - Raymond, 新增回呼函式處理異動文稿, 2016.12.15 新增傳入fm(FolioModel)參數
		// 1090910 Raymond 1090564 信保特殊模式文稿無套用樣版檔屬性, 不需要檢核applyPrintXSL
		// 2017.3.23 新增檢核applyPrintXSL若無值則丟出Error
		//if(!("applyPrintXSL" in draft) || draft.applyPrintXSL.length == 0) {
		if((!("applyPrintXSL" in draft) || draft.applyPrintXSL.length == 0) && fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2") {
			if(!confirm("文稿'" + draft.name + "'資料異常(無「套用樣版檔」設定值), 是否繼續儲存？"))
				throw new Error("文稿'" + draft.name + "'無「套用樣版檔」設定值, 無法儲存暫存檔。");
		}
		var upd = {
			id: draft.id,
			sn: draft.sn,
			guid: draft.guid,					// 2016.7.20 新增GUID
			updId: updId,
			fileName: draft.getFileName(),		// 取得原始檔名
			pages: "",
			pageExt: draft.pageExt,				// 頁面的寬高(DP)
			applyPrintXSL: draft.applyPrintXSL,	// 2014.10.22 - Raymond, 實際套用的PrintXSL全徑名
			docType: draft.docType,				// 2016.7.29 新增文稿類型
			subDocType: draft.subDocType,		// 			新增次文別
			name: draft.name,					// 			新增名稱
			printXSLType: draft.printXSLType,	// 2016.8.1 新增匯出樣版類型(文/稿)
			time: draft.time,					//			新增產生時間
			flowId: draft.flowId,				// 2017.1.18 新增產生點資訊
			signAreas: draft.signAreas			// 2017.3.7 新增簽核區域
		};
		// 1090911 Raymond 1090564 信保特殊模式文稿檔直接放在公文目錄, 而非子目錄下
		//if(upd.fileName.indexOf("\\") < 0) {
		if(upd.fileName.indexOf("\\") < 0 && theAOL.docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2") {
			throw new Error("'" + upd.name + "'文稿檔路徑(" + upd.fileName + ")未含子目錄名稱。");	// 2017.3.23 改丟Error
		}
		if(upd.fileName.match(/^\d\d-\d\d/) && theAOL.docObj.docNo.length > 0)
			upd.fileName = theAOL.docObj.docNo + "-" + upd.fileName;
		if("cachedDOM" in draft) {
			upd.cachedDOM = draft.cachedDOM;
		}
		else {	// 新增文稿沒有cachedDOM
			// TODO:
		}
		// 1090910 Raymond 1090564 信保特殊模式暫存工作檔的文稿有文稿頁面檔結構
		if(fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
			if("draftPages" in draft) {
				upd.draftPages = draft.draftPages;
				delete upd.pages;
			}
			else
				theLogger.error("[信保特殊模式]文稿(" + draft.name + ")無'draftPages'!");
		}
		else {
		for(var i=0; i<draft.draftPages.pages.length; i++) {
			if(upd.pages.length > 0)
				upd.pages += " ";
			upd.pages += draft.draftPages.pages[i].id;
		}
		}
		if("attachs" in draft) {
			upd.attachs = draft.attachs;
		}
		_updDrafts.push(upd);
	}, callback2);	// 1070111 Raymond 1060452 直接傳入callback2參數給SignFolder.prepareSignWork()
	// 插入異動文稿的節點
	if(_updDrafts.length) {
		
		var $root = $(_doc.documentElement);
		if($root.find("> Updates").length == 0)
			$root.append(_doc.createElement("Updates"));
		var $upd = $root.find("> Updates");
		
		$.each(_updDrafts, function(i, updD) {	// 2017.3.7 draft改為updD, 以免混餚
			//if("cachedDOM" in draft) {
				var $draft = $upd.find("文稿[id='" + updD.updId + "']");
				if($draft.length == 0) {    // 尚未新增則新增
					// 1090910 Raymond 1090564 信保特殊模式暫存工作檔儲存結構與正常模式不同
					if(fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
						theLogger.log("[信保特殊模式]將更新的文稿節點加入Updates");
						$draft = newElm("文稿", $upd).attr({
							"id": updD.updId,
							"序號": updD.sn,
							"GUID": updD.guid,						// 2016.7.20 新增GUID
							"原始檔名": updD.fileName,
							"文稿類型": updD.docType,				// 2016.7.29 新增文稿類型
							"名稱": updD.name,						//			新增名稱
							"產生時間": updD.time,					//			新增產生時間
							"保留簽署意見": fm.getReserveSO()?"true":"false",	// 2016.10.6 新增保留簽署意見, 供後端傳送元件寫入AOLProccessData.xml, 2016.11.10 依使用者設定值設定
							"產生點資訊": updD.flowId});			// 2016.11.17 新增產生點資訊
						appendTxtElm("名稱", updD.name, $draft);
						appendTxtElm("文稿類型", updD.docType, $draft);
						var $draftPages = newElm("文稿頁面檔", $draft).attr({"產生時間": updD.draftPages.time, "記錄方式": updD.draftPages.method});
						var $pages = newElm("文稿頁面清單", $draftPages).attr("頁面數", updD.draftPages.pages.length);
						$.each(updD.draftPages.pages, function(k, page) {
							// 2016.8.12 未重新匯出頁面, 但此附件頁面是前一次暫存, 檢查fileSN若是空值, 則改存原始檔名
							if(!("fileSN" in page) || page.fileSN == "") {
								if(!!page.fileRef) {
									newElm("頁面", $pages).attr({
										"原始檔名": page.fileRef.name,
										"文件夾識別碼": page.id,
										"產生時間": page.time,
										"產生點資訊": page.flowId
									});
								}
								else {
									theLogger.error("[信保特殊模式]文稿(" + updD.name + ")無匯出頁面");
								}
							}
							else
								newElm("頁面", $pages).attr({
									"原始檔序號": page.fileSN,
									"序號": page.sn,
									"文件夾識別碼": page.id,
									"物件識別碼": page.obj,
									"產生時間": page.time,
									"產生點資訊": page.flowId
								});
						});
					}
					else {
					theLogger.log("將更新的文稿節點加入Updates");
					// 1100607 Raymond 國教院序37 修正簽稿會核單/會辦單文別的更新文稿的保留簽署意見flag設置條件(1080785+1090409衍生問題)
					var reserveSO;
					if(updD.docType == "簽稿會核單" || updD.docType == "會辦單")
						reserveSO = (fm.getReserveSO() && theSSO.User.EnvSettings.get("WE_ALLOW_CON_KEEP_SIGNOBJ") == "Y")?"true":"false";	// 環境變數「WE_ALLOW_CON_KEEP_SIGNOBJ」設為Y時, 才允許保留簽稿會核單/會辦單的簽署意見
					else
						reserveSO = fm.getReserveSO()?"true":"false";
					$draft = newElm("文稿", $upd).attr({
						"id": updD.updId,
						"序號": updD.sn,
						"GUID": updD.guid,						// 2016.7.20 新增GUID
						"原始檔名": updD.fileName,
						"套用樣版檔": updD.applyPrintXSL,		// 2014.10.22 - Raymond, 記錄實際套用樣版檔到SignWork.xml
						"文稿類型": updD.docType,				// 2016.7.29 新增文稿類型
						"次文別": updD.subDocType,				//			新增次文別
						"名稱": updD.name,						//			新增名稱
						"樣版類型": updD.printXSLType,			// 2016.8.1 新增樣版類型
						"產生時間": updD.time,					//			新增產生時間
						//"保留簽署意見": fm.getReserveSO()?"true":"false",	// 2016.10.6 新增保留簽署意見, 供後端傳送元件寫入AOLProccessData.xml, 2016.11.10 依使用者設定值設定
						"保留簽署意見": reserveSO,				// 1100607 Raymond 國教院序37 是否保留簽署意見, 改至上面判定
						"產生點資訊": updD.flowId});			// 2016.11.17 新增產生點資訊
					// 1120810 Raymond 1120503 新增文稿頁面檔節點變數
					// 1080328 Raymond 1080206 修正新增簽稿會核單有簽核區域的情形下, GenPage會寫有錯誤的問題
					//newElm("文稿頁面檔", $draft);
					//newElm("文稿頁面檔", $draft).attr("page-width", 794)
					var $draftPages = newElm("文稿頁面檔", $draft).attr("page-width", 794)
												.attr("page-height", 1123);
					//var $atts = $(draft.cachedDOM).find("附件清單");
					//if($atts.length)
					//	$draft.append($atts.get(0).cloneNode(true));
					
					// 2016.12.22 新增記錄簽核區域座標在SignWork.xml
					var cdm = fm.getCachedDM(updD);
					// 1121114 Raymond 1120503 修正自動備份時, 若第2筆後的文稿未點開時, 會出現cdm是null的錯誤
					// 1120811 Raymond 1120503 新增判斷有預先匯出文稿頁面時, 寫出已匯出文稿頁面的格式
					//var pgps = cdm.getPreGenPages();
					//if(pgps.length > 0) {
					var pgps = (!!cdm)?cdm.getPreGenPages():undefined;
					if(!!cdm && pgps.length > 0) {
						if(callback3 && $.isFunction(callback3)) {
							const saTypes = ["群組", "角色", "單位", "覆閱", "自訂"];
							beforeTxtElm("名稱", updD.name, $draftPages);
							beforeTxtElm("文稿類型", updD.docType, $draftPages);
							$draftPages.removeAttr("page-width").removeAttr("page-height")
								.attr("記錄方式", "堆疊式").attr("產生時間", SSOUtil.getCurrentTimeStr_YYYMMDDhhmm()).attr("預先匯出文稿頁面", "Y").attr("文稿含自訂表格", (cdm.hasCTBL()?"Y":"N"));
							var $pages = newElm("文稿頁面清單", $draftPages).attr("頁面數", pgps.length);
							$.each(pgps, function(j, pgp) {
								callback3(pgp);
								var $pg = newElm("頁面", $pages).attr({
									"原始檔名": pgp.uploadFileName,
									"產生時間": pgp.time
								});
								if(pgp.sa.length > 0) {
									$.each(pgp.sa, function(k, sa) {
										newElm("簽核區域", $pg).attr({
											"類型": saTypes[sa.type],
											"代碼": sa.id,
											"left": Math.floor(sa.left),
											"top": Math.floor(sa.top),
											"right": Math.ceil(sa.right),
											"bottom": Math.ceil(sa.bottom)
										});
									});
								}
							});
						}
						else
							theLogger.error("有預先匯出的文稿頁面但無callback3參數可上傳文稿頁面影像檔");
					}
					else
					if(!!cdm && !!cdm.signAreas) {
						theLogger.log(cdm.signAreas);
						for(var j=0; j<cdm.signAreas.length; j++) {
							var $sa = newElm("簽核區域", $draft);
							$sa.attr({
								po: cdm.signAreas[j].po,
								type: cdm.signAreas[j].saType,
								id: cdm.signAreas[j].id,
								left: cdm.signAreas[j].left,
								top: cdm.signAreas[j].top,
								width: cdm.signAreas[j].width,
								height: cdm.signAreas[j].height});
						}
					}
					// 2017.3.7 前一次儲存的記錄在draft(封裝檔)物件
					else if(!!updD.signAreas) {
						theLogger.log(updD.signAreas);
						for(var j=0; j<updD.signAreas.length; j++) {
							var $sa = newElm("簽核區域", $draft);
							$sa.attr({
								po: updD.signAreas[j].po,
								type: updD.signAreas[j].saType,
								id: updD.signAreas[j].id,
								left: updD.signAreas[j].left,
								top: updD.signAreas[j].top,
								width: updD.signAreas[j].width,
								height: updD.signAreas[j].height});
						}
					}
					}	// 1090910 Raymond 1090564 end of if(fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
				}
				if("attachs" in updD) {
					var $atts = newElm("附件清單", $draft).attr("附件數", updD.attachs.length);
					var subDir = updD.fileName.substring(0, updD.fileName.indexOf("\\"));
					$.each(updD.attachs, function(j, att) {
						// 1061116 Raymond 1061118 未重新匯出頁面且有cachedDOM, 則直接複製寫入
						if("draftPages" in att && !att.draftPages.dirty && "cachedDOM" in att) {
							if(navigator.userAgent.match(/Trident/)) {	// 1061124 Raymond 1061118 fix for IE
								function recurs(nd, $par) {
									var $a = newElm(nd.tagName, $par);
									$.each(nd.attributes, function(k, a) {
										$a.attr(a.nodeName, a.nodeValue);
									});
									$.each(nd.childNodes, function(k, c) {
										if(c.nodeType == 3)
											$a.append(_doc.createTextNode(c.nodeValue));
										else if(c.nodeType == 1)
											recurs(c, $a);
									});
								}
								recurs(att.cachedDOM, $atts);
							}
							else
								$atts.append(att.cachedDOM.cloneNode(true));
							// 1110301 Raymond 1110106 合併1080815, 修正補上異動文稿後, 有匯出頁面的附件未記錄GUID的問題
							if(!!att.guid)
								$atts.find("附件").eq($atts.find("附件").length - 1).attr("GUID", att.guid);
						}
						else {
						var $att = newElm("附件", $atts).attr({
							"序號": att.sn,
							"文件夾識別碼": att.id,
							"格式": att.fmt,
							"物件識別碼": att.obj,
							"產生時間": att.time,
							"GUID": att.guid});
						
						appendTxtElm("名稱", att.name, $att);
						appendTxtElm("附件類型", att.attType, $att);
						
						if("draftPages" in att) {
							var $draftPagesAtt = newElm("文稿頁面檔格式附件", $att);
							var $draftPages = newElm("文稿頁面檔", $draftPagesAtt).attr({"產生時間": att.draftPages.time, "記錄方式": att.draftPages.method});
							var $pages = newElm("文稿頁面清單", $draftPages).attr("頁面數", att.draftPages.pages.length);
							if(att.draftPages.dirty) {	// 有重新匯出頁面
								$.each(att.draftPages.pages, function(k, page) {
									// 1141128 Raymond 1141255 新增附件頁面需要從工作站暫存路徑搬移到FileServer時(儲存), 全徑名的原始檔名要更名為僅有檔名, 備份時也是
									//newElm("頁面", $pages).attr({
									var $pg = newElm("頁面", $pages).attr({
										"原始檔名": page.fileRef.name,
										"文件夾識別碼": page.id,
										"產生時間": page.time,
										"產生點資訊": page.flowId
									});
									if(callback && $.isFunction(callback)) {	// 2016.7.20 新增回呼收集須上傳的附件匯出頁面影像
										callback(page);
										// 1141125 Raymond 1141255 新增附件頁面需要從工作站暫存路徑搬移到FileServer時(儲存), 全徑名的原始檔名會更名為僅有檔名, 所以要再寫一次原始檔名
										if($pg.attr("原始檔名") != page.fileRef.name) {
											theLogger.log("儲存時, 附件匯出頁面檔從'" + $pg.attr("原始檔名") + "'更名為'" + page.fileRef.name + "'");
											$pg.attr("原始檔名", page.fileRef.name);
										}
										// 1141128 Raymond 1141255 新增附件頁面備份時, page.fileRef.name會保持全徑名, 但寫入SignWork.xml時要用沒有子目錄的僅有檔名寫入, 這樣復原後才能正確讀取到也一併復原到FileServer上的附件頁面檔
										else if(page.fileRef.name.match(/\\\d{4}\-\d+.\d{4}$/)) {
											let fn = page.fileRef.name.substr(page.fileRef.name.lastIndexOf("\\") + 1);
											theLogger.log("備份時, 寫入非全路徑的檔名'" + fn + "'");
											$pg.attr("原始檔名", fn);
										}
									}
								});
							}
							else {	// 未重新匯出頁面
								$.each(att.draftPages.pages, function(k, page) {
									// 2016.8.12 未重新匯出頁面, 但此附件頁面是前一次暫存, 檢查fileSN若是空值, 則改存原始檔名
									// 1060414 Raymond 再載入時沒有fileSN
									//if(page.fileSN == "")
									if(!("fileSN" in page) || page.fileSN == "") {
										if(!!page.fileRef) {
											newElm("頁面", $pages).attr({
												"原始檔名": page.fileRef.name,
												"文件夾識別碼": page.id,
												"產生時間": page.time,
												"產生點資訊": page.flowId
											});
										}
										else {
											theLogger.error("附件(" + att.guid + ")尚未重新匯出頁面");
										}
									}
									else
										newElm("頁面", $pages).attr({
											"原始檔序號": page.fileSN,
											"序號": page.sn,
											"文件夾識別碼": page.id,
											"物件識別碼": page.obj,
											"產生時間": page.time,
											"產生點資訊": page.flowId
										});
								});
							}
						}
						else if(att.fmt == "電子檔格式") {	// 2016.9.7 新增不匯出附件頁面的格式
							if("fileRef" in att) {
								var attFileName = att.fileRef.name;
								// 2016.12.7 附件檔名因調整順序後未及更新回fileRef.name時(上傳成功才會修正), 須依另一新屬性來設定正確的檔名
								if("newName" in att.fileRef && typeof att.fileRef.newName === "string" && att.fileRef.newName.length > 0) {
									theLogger.warn("原附件但順序有變, 附件檔名須更正為'" + att.fileRef.newName + "'");
									attFileName = att.fileRef.newName;
								}
							}
							else if("fileName" in att) {	// 2017.3.22 新增暫存後再開啟但未開啟附件管理, 沒有fileRef時
								var attFileName = att.fileName;
							}
							if(attFileName.indexOf("\\") > 0)	// 已有子目錄要先去掉
								attFileName = attFileName.substring(attFileName.indexOf("\\") + 1);
							$att.attr("原始檔名", subDir + "\\" + attFileName);	// 再接上文稿的子目錄名稱, 以免取號改了子目錄名稱而沒有配合異動
						}
						
						}
					});
				}
			//}
			//else {	//新增文稿
			//}
		});
	}

	// private methods
	function newElm(name, parent) {
		return $(_doc.createElement(HtmlEncode(name))).appendTo(parent);	// 1101102 Raymond 1100991 修正弱掃Client Potential XSS
	}
	function appendTxtElm(name, text, parent) {
		var $res = $(_doc.createElement(name)).appendTo(parent);
		if(typeof text === "function") {
			var ret = text.call($res.get(0));
			if(typeof ret === "string") {
				if("text" in $res.get(0))	// for IE-compatible
					$res.get(0).text = ret;
				else
					$res.text(ret);
			}
		}
		else if(typeof text === "string") {
			if("text" in $res.get(0))	// for IE-compatible
				$res.get(0).text = text;
			else
				$res.text(text);
		}
		return $res;
	}
	// 1120811 Raymond 1120503 新增插入文字欄位於指定節點之前
	function beforeTxtElm(name, text, node) {
		var $res = $(_doc.createElement(name)).insertBefore(node);
		if(typeof text === "function") {
			var ret = text.call($res.get(0));
			if(typeof ret === "string") {
				if("text" in $res.get(0))	// for IE-compatible
					$res.get(0).text = ret;
				else
					$res.text(ret);
			}
		}
		else if(typeof text === "string") {
			if("text" in $res.get(0))	// for IE-compatible
				$res.get(0).text = text;
			else
				$res.text(text);
		}
		return $res;
	}
	function _toDateTime(t) {
		// 1100715 Raymond 1100854 新增[高大客製化]簽核物件的產生時間顯示到秒功能
		if(theUserInfo.OrgNickName == "NUK")
			return Util.padLeft(t.getYear() - 11, 3) + Util.padLeft(t.getMonth() + 1, 2) + Util.padLeft(t.getDate(), 2) + Util.padLeft(t.getHours(), 2) + Util.padLeft(t.getMinutes(), 2) + Util.padLeft(t.getSeconds(), 2);
		return Util.padLeft(t.getYear() - 11, 3) + Util.padLeft(t.getMonth() + 1, 2) + Util.padLeft(t.getDate(), 2) + Util.padLeft(t.getHours(), 2) + Util.padLeft(t.getMinutes(), 2);
	}
	
	function _makeSO(so, fileName) {
		var $obj = newElm("簽核物件", _doc.documentElement)
					.attr("id", so.id)							// 2017.1.18 新增記錄ID
					.attr("parent-id", so.boundTo.id)
					.attr("page-index", so.boundTo.po)
					.attr("產生時間", _toDateTime(so.cTime))
					.attr("產生點資訊", "sign_" + theAOL.docObj.msgId)
					.attr("頁面顯示", "Y")
					.attr("draft-id", so.boundTo.container.id);	// 1060602 新增記錄文稿ID, 供找不到對應頁面時, 延後到頁面排版後再綁定的功能
		// 1060901 Raymond 1060766 若有pgId、pgIdx表示簽核物件位於不存在封裝檔的頁次上, 須額外記錄
		if("pgId" in so) {
			$obj.attr("parent-id", so.pgId)				// 前一版對應的頁面
				.attr("acturalPgId", so.boundTo.id);	// 實際上的頁面
		}
		if("pgIdx" in so) {
			$obj.attr("page-index", so.pgIdx)			// 前一版對應的頁次
				.attr("acturalPgIdx", so.boundTo.po);	// 實際上的頁次
		}
		if(so.type == "stamp" || so.type == "stamp.signet") {	// 2014.12.5 新增stamp.signet類型
			appendTxtElm("物件類型", "章戳", $obj);
			var $el = newElm("章戳", $obj)
					.attr("顯示時間", (so.dispTime)?"Y":"N")
					.attr("type", so.type);
			// 2016.6.13 新增actionName屬性
			if("actionName" in so && typeof so.actionName === "string" && so.actionName.length > 0)
				$el.attr("actionName", so.actionName);
			
			// 2014.12.5 新增自動加蓋記錄
			if(so.auto == true)
				$el.attr("自動加蓋", "true");
			
			// 2017.3.30 新增連動代字功能
			if("linkSOID" in so && typeof so.linkSOID === "string" && so.linkSOID.length > 0)
				$el.attr("linkSOID", so.linkSOID);
			
			// 2015.5.8 新增簽核區域類型、ID、offset
			if(!!so.signArea) {
				$el.attr("簽核區域類型", so.signArea.saType);
				$el.attr("簽核區域ID", so.signArea.id);
				$el.attr("簽核區域內座標", so.offset.left + "," + so.offset.top);
			}
			else if("saType" in so && "saID" in so) {	// 2017.3.7 fix for 開啟未翻頁即儲存
				$el.attr("簽核區域類型", so.saType);
				$el.attr("簽核區域ID", so.saID);
				$el.attr("簽核區域內座標", so.offset.left + "," + so.offset.top);
			}
			
			appendTxtElm("文字走向", so.orient, $el);
			
			// 2013.10.8 - Raymond, 多填入絕對座標的左、右、上、下
			var pg = signFolder.findPageById(so.boundTo.id),
				pgExt = {width: 794, height: 1123},//pg.container.pageExt,	// 2016.12.23 fix 在Chrome下第2次pageFlipped()時重取$pg.width()會取到210這種錯誤數值問題
				l = so.pos.left * 2480 / pgExt.width,
				t = so.pos.top * 3507 / pgExt.height;
			// 1071222 Raymond 若簽核物件為文稿頁面且位於簽核區域內, 則從AOLProccessData.xml中搜尋實際影像頁面上的簽核區域, 計算出絕對座標, 若文稿內文未異動僅加簽核物件, 簽核物件應跟隨文稿匯出頁面當時的簽核區域, 而不是目前簽核時看到的簽核區域位置, 這樣若歷史檢視與簽核時排版不一致時才不會位置錯誤
			if("docType" in so.boundTo.container && (!!so.signArea || ("saType" in so && "saID" in so))) {
				var sa = (!!so.signArea)?
					fm.findSignAreaAPD(so.boundTo.container, so.signArea.saType, so.signArea.id):
					fm.findSignAreaAPD(so.boundTo.container, so.saType, so.saID);
				if(!!sa) {
					var l2 = parseInt(sa.left) + (so.offset.left * 2480 / pgExt.width);
					var t2 = parseInt(sa.top) + (so.offset.top * 3507 / pgExt.height);
					theLogger.log("章戳絕對座標依最後版本的簽核區域(ID:" + ((!!so.signArea)?so.signArea.id:so.saID) + ")計算, 修改為左:" + l + "->" + l2 + ", 上:" + t + "->" + t2);
					l = l2;
					t = t2;
				}
			}
			if(so.size.width.match(/([0-9.]+)mm/))
				var w = Number(RegExp.$1) * 300 / 25.4;
			if(so.size.height.match(/([0-9.]+)mm/))
				var h = Number(RegExp.$1) * 300 / 25.4;
			// 2015.10.14 FIX
			if(navigator.userAgent.indexOf("Chrome") >= 0 || navigator.userAgent.indexOf("Mobile") >= 0) {
//				l += ((l - 496) * 0.04);
//				t += 17;
			}
			newElm("區域", $el)
				.attr("左", Math.ceil(l))
				.attr("上", Math.ceil(t))
				.attr("右", Math.ceil(l + w + ((so.dispTime)?h:0)))    // 2013.9.12 - Raymond, 封裝檔/加簽工作檔中章戳物件的右包含時戳的寬度, 時戳是正方形寬度等於章戳的高度
				.attr("下", Math.ceil(t + h))
				.attr("left", so.pos.left)
				.attr("top", so.pos.top)
				.attr("width", so.size.width)
				.attr("height", so.size.height);
			newElm("顏色", $el)
				.attr("紅", so.color.r)
				.attr("綠", so.color.g)
				.attr("藍", so.color.b);
			// 1080823 Raymond 1080708 新增檢核fileName是否為空
			if(!fileName || fileName.length == 0) {
				theLogger.error("儲存SignWork.xml時發生章戳電子檔名為空的錯誤!");
				alert("儲存SignWork.xml時發生章戳電子檔名為空的錯誤!");
				throw new Error("儲存SignWork.xml時發生章戳電子檔名為空的錯誤!");
			}
			appendTxtElm("電子檔名", fileName, $el);
			// 1130710 Raymond 1130637 儲存簽核物件後清除sessionNew屬性, 以避免關閉公文時再跳出提醒已異動應儲存的訊息
			if("sessionNew" in so)
				delete so.sessionNew;
		}
		// 1130314 Raymond 1130050 新增支援「貼布」簽核物件
		//else if(so.type == "sketch") {
		else if(so.type == "sketch" || so.type == "sketch.tape") {
			appendTxtElm("物件類型", "圖檔", $obj);
			// 1130314 Raymond 1130050 新增支援「貼布」簽核物件
			if(so.type == "sketch.tape")
				var $el = newElm("圖檔", $obj)
						.attr("去背景", "N")
						.attr("透明度", "0")
						.attr("type", so.type)
						.attr("as-icon", "false")
						.attr("color", so.color);	// 「貼布」簽核物件多一個"color"屬性, 記錄格式不是章戳的"顏色[紅,綠,藍]", 是"rgb(r,g,b)"
			else
			var $el = newElm("圖檔", $obj)
					.attr("去背景", "Y")
					.attr("透明度", so.transparency)
					.attr("type", so.type)
					.attr("as-icon", so.asIcon);
			
			// 1090312 Raymond 1081105 新增圖檔簽核物件(選用章戳)連動職名章功能
			if("linkSOID" in so && typeof so.linkSOID === "string" && so.linkSOID.length > 0)
				$el.attr("linkSOID", so.linkSOID);
			
			// 1130705 Raymond 中榮序139 新增影像式選用章戳記錄章戳名稱功能
			if(!!so.stampName)
				$el.attr("stampName", so.stampName);
			
			// 2015.5.29 新增簽核區域類型、ID、offset
			if(so.signArea) {
				$el.attr("簽核區域類型", so.signArea.saType);
				$el.attr("簽核區域ID", so.signArea.id);
				$el.attr("簽核區域內座標", so.offset.left + "," + so.offset.top);
			}
			else if("saType" in so && "saID" in so) {	// 2017.3.13 fix for 開啟未翻頁即儲存
				$el.attr("簽核區域類型", so.saType);
				$el.attr("簽核區域ID", so.saID);
				$el.attr("簽核區域內座標", so.offset.left + "," + so.offset.top);
			}
			
			// 2013.10.8 - Raymond, 多填入絕對座標的左、右、上、下
			var pg = signFolder.findPageById(so.boundTo.id),
				pgExt = {width: 794, height: 1123},//pg.container.pageExt,	// 2016.12.23 fix 在Chrome下第2次pageFlipped()時重取$pg.width()會取到210這種錯誤數值問題
				l = so.pos.left * 2480 / pgExt.width,
				t = so.pos.top * 3507 / pgExt.height;
			// 1071222 Raymond 若簽核物件為文稿頁面且位於簽核區域內, 則從AOLProccessData.xml中搜尋實際影像頁面上的簽核區域, 計算出絕對座標, 若文稿內文未異動僅加簽核物件, 簽核物件應跟隨文稿匯出頁面當時的簽核區域, 而不是目前簽核時看到的簽核區域位置, 這樣若歷史檢視與簽核時排版不一致時才不會位置錯誤
			if("docType" in so.boundTo.container && (!!so.signArea || ("saType" in so && "saID" in so))) {
				var sa = (!!so.signArea)?
					fm.findSignAreaAPD(so.boundTo.container, so.signArea.saType, so.signArea.id):
					fm.findSignAreaAPD(so.boundTo.container, so.saType, so.saID);
				if(!!sa) {
					var l2 = parseInt(sa.left) + (so.offset.left * 2480 / pgExt.width);
					var t2 = parseInt(sa.top) + (so.offset.top * 3507 / pgExt.height);
					theLogger.log("圖檔絕對座標依最後版本的簽核區域(ID:" + ((!!so.signArea)?so.signArea.id:so.saID) + ")計算, 修改為左:" + l + "->" + l2 + ", 上:" + t + "->" + t2);
					l = l2;
					t = t2;
				}
			}
			// 2015.7.14 逆修正
			if(navigator.userAgent.indexOf("Chrome") >= 0 || navigator.userAgent.indexOf("Mobile") >= 0) {
				//l += ((l - 496) * 0.04);	// 2015.10.14 FIX比例
				//t += 17;	// 2015.10.14 FIX
			}
			if(so.size.width.match(/([0-9.]+)mm/))
				var w = Number(RegExp.$1) * 300 / 25.4;
			if(so.size.height.match(/([0-9.]+)mm/))
				var h = Number(RegExp.$1) * 300 / 25.4;
			newElm("區域", $el)
				.attr("左", Math.ceil(l))
				.attr("上", Math.ceil(t))
				.attr("右", Math.ceil(l + w))
				.attr("下", Math.ceil(t + h))
				.attr("left", so.pos.left)
				.attr("top", so.pos.top)
				.attr("width", so.size.width)
				.attr("height", so.size.height);
			// 1080823 Raymond 1080708 新增檢核fileName是否為空
			if(!fileName || fileName.length == 0) {
				theLogger.error("儲存SignWork.xml時發生章戳電子檔名為空的錯誤!");
				alert("儲存SignWork.xml時發生章戳電子檔名為空的錯誤!");
				throw new Error("儲存SignWork.xml時發生章戳電子檔名為空的錯誤!");
			}
			appendTxtElm("電子檔名", fileName, $el);
			// 1130710 Raymond 1130637 儲存簽核物件後清除sessionNew屬性, 以避免關閉公文時再跳出提醒已異動應儲存的訊息
			if("sessionNew" in so)
				delete so.sessionNew;
		}
		else if(so.type == "text" || so.type == "stamp.text") {
			appendTxtElm("物件類型", "文字意見", $obj);
			var pg = signFolder.findPageById(so.boundTo.id),
				pgExt = {width: 794, height: 1123};//pg.container.pageExt;	// 2016.12.23 fix 在Chrome下第2次pageFlipped()時重取$pg.width()會取到210這種錯誤數值問題
			var $el = newElm("文字意見", $obj)
					.attr("type", so.type)
					.attr("as-icon", so.asIcon);
			// 2016.6.13 新增actionName屬性
			if("actionName" in so && typeof so.actionName === "string" && so.actionName.length > 0)
				$el.attr("actionName", so.actionName);
			
			// 2014.12.5 新增自動加蓋記錄
			if(so.auto == true)
				$el.attr("自動加蓋", "true");
			
			// 1090312 Raymond 1081105 新增圖檔簽核物件(文字意見)連動職名章功能
			if("linkSOID" in so && typeof so.linkSOID === "string" && so.linkSOID.length > 0)
				$el.attr("linkSOID", so.linkSOID);
			
			// 2015.5.29 新增簽核區域類型、ID、offset
			if(so.signArea) {
				$el.attr("簽核區域類型", so.signArea.saType);
				$el.attr("簽核區域ID", so.signArea.id);
				$el.attr("簽核區域內座標", so.offset.left + "," + so.offset.top);
			}
			else if("saType" in so && "saID" in so) {	// 2017.3.13 fix for 開啟未翻頁即儲存
				$el.attr("簽核區域類型", so.saType);
				$el.attr("簽核區域ID", so.saID);
				$el.attr("簽核區域內座標", so.offset.left + "," + so.offset.top);
			}
			
			// 1100517 Raymond 1100298 新增取代他流程文字意見功能
			if(!!so.substObjId)
				$el.attr("subst-objid", so.substObjId);
			
			// 2013.10.8 - Raymond, 多填入絕對座標的X/Y
			// 2015.7.14 逆修正
			var X = so.pos.left * 2480 / pgExt.width,
				Y = so.pos.top * 3507 / pgExt.height;
			// 1071222 Raymond 若簽核物件為文稿頁面且位於簽核區域內, 則從AOLProccessData.xml中搜尋實際影像頁面上的簽核區域, 計算出絕對座標, 若文稿內文未異動僅加簽核物件, 簽核物件應跟隨文稿匯出頁面當時的簽核區域, 而不是目前簽核時看到的簽核區域位置, 這樣若歷史檢視與簽核時排版不一致時才不會位置錯誤
			if("docType" in so.boundTo.container && (!!so.signArea || ("saType" in so && "saID" in so))) {
				var sa = (!!so.signArea)?
					fm.findSignAreaAPD(so.boundTo.container, so.signArea.saType, so.signArea.id):
					fm.findSignAreaAPD(so.boundTo.container, so.saType, so.saID);
				if(!!sa) {
					var x2 = parseInt(sa.left) + (so.offset.left * 2480 / pgExt.width);
					var y2 = parseInt(sa.top) + (so.offset.top * 3507 / pgExt.height);
					theLogger.log("文字意見絕對座標依最後版本的簽核區域(ID:" + ((!!so.signArea)?so.signArea.id:so.saID) + ")計算, 修改為左:" + X + "->" + x2 + ", 上:" + Y + "->" + y2);
					X = x2;
					Y = y2;
				}
			}
			if(navigator.userAgent.indexOf("Chrome") >= 0 || navigator.userAgent.indexOf("Mobile") >= 0) {
				//X += (so.pos.left * 0.015);
				//Y += 19;	// 2015.10.14 FIX
			}
			newElm("位置", $el)
				.attr("X", Math.ceil(X))
				.attr("Y", Math.ceil(Y))
				.attr("left", so.pos.left)
				.attr("top", so.pos.top);
			var $txElm = appendTxtElm("文字內容", so.content, $el);
			if('srcContent' in so) {	//2016.12.28	Leslie	確認有內容時，才設定至srcContent屬性中
				$txElm.attr('srcContent',Utf7.encode(so.srcContent));	//2016.12.27	Leslie	新增原始文字屬性，並經過encode以避免換行字元遺失
				// 1120210 Raymond 1111035 若文字意見是貼式狀態, 則寫入未以邊框寬度自動折行的原始文字, 以避免傳送後檢視及列印文字意見頁面顯示貼式文字意見為以較窄寬度自動折行的排版結果
				if(so.asIcon)
					$txElm.text(so.srcContent);
				// 1120210 Raymond 1111035 一併寫入文字意見的寬度(不論目前是否為貼式狀態), 以免暫存再開啟後之前調過的寬度在貼式展開後變沒有寬度的問題
				if(!!so.width)
					$txElm.attr("width", so.width);
			}
			appendTxtElm("文字走向", so.orient, $el);
			var $font = newElm("字型", $el);
			appendTxtElm("名稱", so.fontName, $font);
			appendTxtElm("樣式", function() {
				if(so.fontWeight && so.fontStyle)
					return "粗斜體";	// FIX for IE-compatible
				else if(so.fontWeight)
					return "粗體";
				else if(so.fontStyle)
					return "斜體";
				return "普通";}, $font);
			appendTxtElm("大小", so.fontSize.replace(/[^0-9]/g, ""), $font);
			var $clr = newElm("顏色", $font);
			if(typeof so.color === "string")
				$clr.attr({"紅": Util.getRed(so.color), "綠": Util.getGreen(so.color), "藍": Util.getBlue(so.color)});
			else
				$clr.attr({"紅": so.color.r, "綠": so.color.g, "藍": so.color.b});
			// 1130710 Raymond 1130637 儲存簽核物件後清除sessionNew屬性, 以避免關閉公文時再跳出提醒已異動應儲存的訊息
			if("sessionNew" in so)
				delete so.sessionNew;
		}
		return $obj;
	}
	// 1130314 Raymond 1130050 新增的簽核物件依ID由小至大排序, 因新增支援貼布功能, 後加的簽核物件(文字意見)必須排在貼布後才能覆蓋在貼布上顯示, 但SignWork.addSO可能會因為上傳貼布圖檔而晚於文字意見加入, 導致貼布物件在文字意見後, 依序顯示時後加的文字意見就會被貼布蓋住
	function sortSO(a, b) {
		var aid = $(a).attr("id"),
			bid = $(b).attr("id");
		console.log("sort:", aid, bid);
		if(!!aid && !!bid && aid.match(/^X_/) && bid.match(/^X_/)) {
			console.log("sort result:", aid.substr(2) - bid.substr(2), typeof (aid.substr(2) - bid.substr(2)));
			return aid.substr(2) - bid.substr(2);
		}
		return 0;
	}
	
	return {
		// public methods
		addSO: function(so, fileName) { // FolioModel上傳簽核物件完畢後會呼叫
			var pgid = so.boundTo.id;   // 原封裝檔既有頁面ID(文件夾識別碼)
			
			var $root = $(_doc.documentElement);
			var $pg = $root.find("頁面[文件夾識別碼='" + pgid + "']");
			// 1071221 Raymond 1071260 修正重新匯出頁面超過一定頁數後, 可能有一頁附件會與前個版本的本文頁次ID相同, 導致應蓋在本文頁次的簽核物件被誤判加在附件頁次下的問題
			//if($pg.length) {
			if($pg.length && !("docType" in so.boundTo.container && so.boundTo.container.dirty())) {	// 非本文或是本文但未異動
				if($pg.closest("附件").length > 0 &&        // 是附件下的頁面
					$pg.closest("Updates").length > 0) {    // 頁面已在Updates下
					// 1130315 Raymond 1130050 新增的簽核物件依ID由小至大排序
					//$pg.append(_makeSO(so, fileName));
					$pg.append(_makeSO(so, fileName)).children("簽核物件").sort(sortSO).appendTo($pg);
				}
				else {
					if($root.find("> Updates").length == 0)
						$root.append(_doc.createElement("Updates"));
					var $upd = $root.find("> Updates");
					// 1130315 Raymond 1130050 新增的簽核物件依ID由小至大排序
					//$upd.append(_makeSO(so, fileName));
					$upd.append(_makeSO(so, fileName)).children("簽核物件").sort(sortSO).appendTo($upd);
				}
				var pg = signFolder.findPageById(pgid);
				var pgExt = {width: 794, height: 1123};//pg.container.pageExt;	// 2016.12.23 fix 在Chrome下第2次pageFlipped()時重取$pg.width()會取到210這種錯誤數值問題
				$pg.parent().parent()
							.attr("page-width", pgExt.width)
							.attr("page-height", pgExt.height);
			}
			// 1061025 Raymond 1061005 非分文後第1個流程點在來文內容頁面上加簽核物件
			else if(!!so.boundTo.container && "fromType" in so.boundTo.container) {
				theLogger.log("簽核物件(ID:" + so.id + ")位於被參照的來文頁面(ID:" + so.boundTo.id + ")");
				if($root.find("> Updates").length == 0)
					$root.append(_doc.createElement("Updates"));
				var $upd = $root.find("> Updates");
				// 1130315 Raymond 1130050 新增的簽核物件依ID由小至大排序
				//$upd.append(_makeSO(so, fileName));
				$upd.append(_makeSO(so, fileName)).children("簽核物件").sort(sortSO).appendTo($upd);
			}
			// 1061025 Raymond 1061005 非分文後第1個流程點在來文的附件頁面上加簽核物件
			else if(!!so.boundTo.container && "attType" in so.boundTo.container && "parent" in so.boundTo.container && "fromType" in so.boundTo.container.parent) {
				theLogger.log("簽核物件(ID:" + so.id + ")位於被參照的來文附件頁面(ID:" + so.boundTo.id + ")");
				if($root.find("> Updates").length == 0)
					$root.append(_doc.createElement("Updates"));
				var $upd = $root.find("> Updates");
				// 1130315 Raymond 1130050 新增的簽核物件依ID由小至大排序
				//$upd.append(_makeSO(so, fileName));
				$upd.append(_makeSO(so, fileName)).children("簽核物件").sort(sortSO).appendTo($upd);
			}
			else {
				var found = false;
				$.each(_updDrafts, function(i, draft) {
					//if("cachedDOM" in draft) {
						//var $pg = $(draft.cachedDOM).find("頁面[文件夾識別碼='" + pgid + "']");
						//if($pg.length) {
						// 2015.12.22 判斷物件所屬文稿是否為目前列舉的文稿
						if(so.boundTo.container.id == draft.id) {
							if($root.find("> Updates").length == 0)
								$root.append(_doc.createElement("Updates"));
							var $upd = $root.find("> Updates");
							
							var $draft = $upd.find("文稿[id='" + draft.updId + "']");
							if($draft.length) {
								// 2013.12.31 - Raymond, 增加判斷附件頁面
								$pg = $draft.find("頁面[文件夾識別碼='" + pgid + "']");
								// 1090910 Raymond 1090564 信保特殊模式文稿頁面上的簽核物件要加在<頁面>下
								if($pg.length && fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2" && "docType" in so.boundTo.container) {
									// 1130315 Raymond 1130050 新增的簽核物件依ID由小至大排序
									//$pg.append(_makeSO(so, fileName));
									$pg.append(_makeSO(so, fileName)).children("簽核物件").sort(sortSO).appendTo($pg);
								}
								else
								// 1071221 Raymond 1071260 新增判斷簽核物件所在頁次確實是附件, 才寫入該頁面節點, 否則應該是匯出附件頁面時與前一版文稿頁面重複ID導致的結果
								//if($pg.length) {    // 找得到ID的即表示是附件頁面
								if($pg.length && "attType" in so.boundTo.container) {
									// 1130315 Raymond 1130050 新增的簽核物件依ID由小至大排序
									//$pg.append(_makeSO(so, fileName));
									$pg.append(_makeSO(so, fileName)).children("簽核物件").sort(sortSO).appendTo($pg);
									var pg = signFolder.findPageById(pgid);
									var pgExt = {width: 794, height: 1123};//pg.container.pageExt;	// 2016.12.23 fix 在Chrome下第2次pageFlipped()時重取$pg.width()會取到210這種錯誤數值問題
									$pg.parent().parent()
												.attr("page-width", pgExt.width)
												.attr("page-height", pgExt.height);
								}
								else {  // 找不到ID的頁面表示是內文已異動的文稿頁面
									// 1120811 Raymond 1120503 新增判斷是否已有預先匯出的文稿頁面
									let pgps = $draft.find("> 文稿頁面檔 > 文稿頁面清單 > 頁面").length;
									if(pgps > 0) {
										if("pgIdx" in so) {
											if(so.pgIdx >= 0 && so.pgIdx < pgps) {
												// 1130315 Raymond 1130050 新增的簽核物件依ID由小至大排序
												//$draft.find("> 文稿頁面檔 > 文稿頁面清單 > 頁面").eq(so.pgIdx).append(_makeSO(so, fileName));
												var $trgPg = $draft.find("> 文稿頁面檔 > 文稿頁面清單 > 頁面").eq(so.pgIdx);
												$trgPg.append(_makeSO(so, fileName)).children("簽核物件").sort(sortSO).appendTo($trgPg);
											}
											else
												theLogger.error("簽核物件#" + so.id + "的pgIdx(" + so.pgIdx + ")在已匯出文稿頁面範圍(0-" + (pgps - 1) + ")外");
										}
										else if(!!so.boundTo) {
											if(so.boundTo.po >= 0 && so.boundTo.po < pgps) {
												// 1130315 Raymond 1130050 新增的簽核物件依ID由小至大排序
												//$draft.find("> 文稿頁面檔 > 文稿頁面清單 > 頁面").eq(so.boundTo.po).append(_makeSO(so, fileName));
												var $trgPg = $draft.find("> 文稿頁面檔 > 文稿頁面清單 > 頁面").eq(so.boundTo.po);
												$trgPg.append(_makeSO(so, fileName)).children("簽核物件").sort(sortSO).appendTo($trgPg);
											}
											else
												theLogger.error("簽核物件#" + so.id + "的boundTo.po(" + so.boundTo.po + ")在已匯出文稿頁面範圍(0-" + (pgps - 1) + ")外");
										}
										else
											theLogger.error("簽核物件#" + so.id + "無pgIdx或boundTo, 無法設定");
									}
									else
									$draft.find("> 文稿頁面檔")
											.attr("page-width", 794)//draft.pageExt.width)	// 2016.12.23 fix 在Chrome下第2次pageFlipped()時重取$pg.width()會取到210這種錯誤數值問題
											.attr("page-height", 1123)//draft.pageExt.height)	// 2016.12.23 fix 在Chrome下第2次pageFlipped()時重取$pg.height()會取到297這種錯誤數值問題
											// 1130315 Raymond 1130050 新增的簽核物件依ID由小至大排序
											//.append(_makeSO(so, fileName));
											.append(_makeSO(so, fileName)).children("簽核物件").sort(sortSO).appendTo($draft.find("> 文稿頁面檔"));
								}
							}
							/*else {  // 文稿節點塞到Updates
								theLogger.log("將更新的文稿節點加入Updates");
								var $draft = newElm("文稿", $upd).attr("id", draft.updId).attr("序號", draft.sn).attr("原始檔名", draft.fileName);
								var $pages = newElm("文稿頁面檔", $draft).attr("page-width", draft.pageExt.width).attr("page-height", draft.pageExt.height).attr("pages", draft.pages);
								$pages.append(_makeSO(so, fileName));
								var $atts = $(draft.cachedDOM).find("附件清單");
								if($atts.length)
									$draft.append($atts.cloneNode(true));
							}*/
							found = true;
							return false;   // break each-loop
						}
					//}
					//else
					//	throw new Error("暫不支援新增文稿的異動");
				});
				if(!found) {
					if(!!so.signArea || ("saType" in so && "saID" in so)) {	// 2017.3.29 檢核區域內物件不需要封裝檔內存在既有頁面, 航港-序591
						theLogger.warn("簽核物件(ID:" + so.id + ")綁定的頁面(ID:" + pgid + ")在封裝檔中找不到, 但此物件為簽核區域內物件, 不需要對應頁面ID, 可直接記錄儲存");
						if($root.find("> Updates").length == 0)
							$root.append(_doc.createElement("Updates"));
						var $upd = $root.find("> Updates");
						
						// 1060830 Raymond 1060766 修正因受會不可重新匯出頁面但因排版差異而導致簽核物件記錄在封裝檔不存在的頁次的資訊, 無法傳送的問題
						//$upd.append(_makeSO(so, fileName));
						var soMod = {
							id: so.id,
							boundTo: {id: so.boundTo.id, po: so.boundTo.po, container: {id: so.boundTo.container.id}},
							cTime: so.cTime,
							type: so.type,
							dispTime: so.dispTime,
							actionName: so.actionName,
							auto: so.auto,
							linkSOID: so.linkSOID,
							signArea: so.signArea,
							saType: so.saType,
							saID: so.saID,
							offset: so.offset,
							orient: so.orient,
							pos: {left: null, top: null},
							size: so.size,
							color: so.color,
							transparency: so.transparency,
							asIcon: so.asIcon,
							content: so.content,
							//srcContent: so.srcContent,
							fontName: so.fontName,
							fontWeight: so.fontWeight,
							fontStyle: so.fontStyle,
							fontSize: so.fontSize
						};
						if("srcContent" in so)
							soMod.srcContent = so.srcContent;
						var v = theAOL.getCurrFolio().getSignFolder().xSignFolder().getDraft(so.boundTo.container.guid).getVer(so.boundTo.container.id);
						var saID = (!!so.signArea)?so.signArea.id:so.saID;
						for(var i=0; i<v.xSignAreas.length; i++) {
							if(v.xSignAreas[i].saID == saID) {
								theLogger.warn("找到前一版文稿(ID:" + so.boundTo.container.id + ")對應的簽核區域(saID:" + saID + ") - pgId:" + v.xSignAreas[i].pgId + ", pgIdx:" + v.xSignAreas[i].pgIdx + ", left:" + v.xSignAreas[i].left + ", top:" + v.xSignAreas[i].top);
								//soMod.boundTo.id = v.xSignAreas[i].pgId;
								//soMod.boundTo.po = v.xSignAreas[i].pgIdx;
								soMod.pgId = v.xSignAreas[i].pgId;
								soMod.pgIdx = v.xSignAreas[i].pgIdx;
								soMod.pos.left = Math.ceil(parseInt(v.xSignAreas[i].left) * 794 / 2480) + so.offset.left;
								soMod.pos.top = Math.ceil(parseInt(v.xSignAreas[i].top) * 1123 / 3507) + so.offset.top;
								break;
							}
						}
						// 1130315 Raymond 1130050 新增的簽核物件依ID由小至大排序
						//$upd.append(_makeSO(soMod, fileName));
						$upd.append(_makeSO(soMod, fileName)).children("簽核物件").sort(sortSO).appendTo($upd);
					}
					else
						throw new Error("找不到檢核區域外物件(ID:" + so.id + ")綁定的頁面(ID:" + pgid + "), 因封裝檔未記錄此ID且文稿內容未標記異動");	// 2017.1.16 新增註解
				}
			}
		},
		getDoc: function() {    // FolioModel最後儲存上傳時叫用
			// 2015.5.19 儲存前套用簽核意見內容
			var $signCmt = $(_doc.documentElement).find("> 異動資訊 > 簽核意見");
			// 1100707 Raymond 1100648 啟用分文稿記錄簽核意見功能時不要再重複寫一次簽核意見, 避免將不同文稿的簽核意見都寫成目前顯示文稿的簽核意見
			// 1070112 Raymond 1060452 鐵工局秘書的簽辦意見是另外寫在一個獨立檔案
			//if($signCmt.length > 0) {
			//if($signCmt.length > 0 && !signFolder.isSecretary()) {
			if($signCmt.length > 0 && !signFolder.isSecretary() && theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") != "Y") {
				if("text" in $signCmt.get(0))	// for IE-compatible
					$signCmt.get(0).text = signFolder.signComment();
				else
					$signCmt.text(signFolder.signComment());
			}
			// 2015.10.1 dump signwork.xml
			theLogger.log("SignWork.getDoc()=");
			try {	// for IE-compatible
				theLogger.log(_doc);
			}
			catch(e) {
				theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
			}
			return _doc;
		}
	};
}

// 1110106 Raymond 1101423 修正「轉線上」(EDT213)後的公文, 開啟儲存後文稿管理檔仍殘留轉線上之前新增的舊文稿(簽核頁面看不到但發文登錄會列出)的問題, 新增文稿管理檔物件參數
// 2013.10.16 - Raymond, 解讀SignWork.xml將簽核物件取出
//function SignWorkParser(signFolder) {
function SignWorkParser(signFolder, currMgmt) {
	
	function getElmText(nd, childElmName) {
		if("getElementsByTagName" in nd)
			var childElm = nd.getElementsByTagName(childElmName)[0];
		else
			var childElm = nd.find(childElmName)[0];
		if(childElm != undefined) {
			if("text" in childElm)	// for IE-compatible
				return childElm.text;
			return childElm.textContent;
		}
		return "";
	}
	
	function toCTime(str) {
		var t = new Date();
		t.setFullYear(Number(str.substr(0, 3)) + 1911, Number(str.substr(3, 2)) - 1, str.substr(5, 2));
		// 1100715 Raymond 1100854 新增支援[高大客製化]的包含秒的時間
		if(str.length == 13)
			t.setHours(str.substr(7, 2), str.substr(9, 2), str.substr(11, 2));
		else
		t.setHours(str.substr(7, 2), str.substr(9, 2));
		return t;
	}
	
	this.atts = [];	// 2016.12.13 記錄上次儲存的附件GUID-產生時間
	
	var that = this;
	// 1110620 Raymond 1110579 新增第2參數isRecover, 傳入true表示是從文號-00-99的SignWork_msgId.xml備份檔還原的
	//this.load = function(doc) {
	this.load = function(doc, isRecover) {
		// 1110119 Raymond 1101548 開啟會核中-主辦(FOLDER_DISCUSS)或已送出-線上簽核(FOLDER_SUBMIT)的公文, 需查詢目前實際Owner的MsgID, 判斷應否載入SignWork.xml暫存檔
		var docTodoListNowMsgId;
		if(theAOL.docObj.folder == theSSO.User.EnvSettings.FOLDER_DISCUSS || theAOL.docObj.folder == theSSO.User.EnvSettings.FOLDER_SUBMIT) {
			var params = {
				argArtifact: localStorage.Artifact,
				argOrgNo: theAOL.docObj.sourceOrgNo,
				argDocNo: theAOL.docObj.docNo};
			theWebServices.invokeWS(SSO_CONFIG.getWSUrl("odmsspws"), "GetDocTodoListNow", "http://www.2100t.com.tw/webservices/", params, false, function(r) {
				theLogger.log(r);
				if(r.m_bSuccess)
					docTodoListNowMsgId = r.m_strRetStr;
				else
					theLogger.error("資料夾[" + theAOL.docObj.folder + "]符合特定資料夾設定需載入目前實際Owner的暫存檔, 但無法取得目前實際Owner的MsgID!", r.m_strErrMsg);
			});
		}
		// 2015.6.18 新增檢核msgid程序, 因來文分辦可能會儲存SignWork.xml但又不會update封裝檔, 導致SignWork.xml不會經由一般的異動封裝檔
		// 功能清除, 故改在行動版載入前先檢核是否為當流程點所儲存的SignWork.xml, 是才繼續載入, 否則不載入
		var thisFlowId = "sDoc_" + theAOL.docObj.msgId;	// 當前流程點的Id
		var otherMsgId = false;	// 1131115 Raymond 北榮序378 標記此SignWork.xml是否為別的流程點所寫入
		// 1110119 Raymond 1101548 開啟會核中-主辦(FOLDER_DISCUSS)或已送出-線上簽核(FOLDER_SUBMIT)的公文, 需查詢目前實際Owner的MsgID, 判斷應否載入SignWork.xml暫存檔
		if(!!docTodoListNowMsgId) {
			theLogger.log("資料夾[" + theAOL.docObj.folder + "]符合特定資料夾設定, 若SignWork.xml為目前實際Owner所暫存(msgId:" + docTodoListNowMsgId + ")則應載入");
			thisFlowId = "sDoc_" + docTodoListNowMsgId;
			otherMsgId = true;	// 1131115 Raymond 北榮序378 標記此SignWork.xml為別的流程點所寫入, 只是因為1101548的需要而載入
		}
		var $sf = $(doc.documentElement).find("> 簽核資訊 > 簽核文件夾");
		if($sf.length) {
			var idOfSignFolder = $sf.attr("Id");
			if(idOfSignFolder != thisFlowId) {
				theLogger.warn("SignWork.xml暫存工作檔中簽核文件夾的Id:'" + idOfSignFolder + "'與代表當前流程點應顯示的'" + thisFlowId + "'不一致! 忽略載入此工作檔");
				// 1100615 Raymond 1100639 新增若載入SignWork.xml不是目前流程點的, 回傳false
				//return;
				return false;
			}
			else
				theLogger.log("SignWork.xml暫存工作檔中簽核文件夾的Id:'" + idOfSignFolder + "'與代表當前流程點應顯示的'" + thisFlowId + "'一致, 繼續載入此工作檔");
			
			// 2016.11.30 先過濾封裝檔中已刪除文稿(封裝檔有但SignWork.xml沒有的文稿)
			var $keepDrafts = $sf.find("文稿");
			//if($keepDrafts.length) {	// 2016.12.1 fix for 全刪光的情況
				var n = signFolder.getDraftCounts();
				for(var i=0; i<n; i++) {
					var d2 = signFolder.getDraft(i);
					//if(d2.name != "來文內容")
					if(!("fromType" in d2))	// 2017.1.16 bugfix for 來文判定
						d2.willDel = true;
				}
				$.each($keepDrafts, function(idx, d) {
					var did = $(d).attr("文件夾識別碼");
					// 1100616 Raymond 1100552 修正草稿新增三文稿再刪除一文稿再調整稿序後, 儲存再開啟, 已匯出附件頁面的稿件未顯示附件頁籤的問題
					var guid = undefined;
					if(did.match(/X$/)) {	// 2017.1.23 文稿異動後暫存會以原文件夾識別碼+X為新的文件夾識別碼命名, 載入時要還原
						theLogger.warn("暫存檔文稿ID:'" + did + "'->'" + did.replace(/X$/, "") + "'");
						did = did.replace(/X$/, "");
					}
					// 1100616 Raymond 1100552 修正草稿新增三文稿再刪除一文稿再調整稿序後, 儲存再開啟, 已匯出附件頁面的稿件未顯示附件頁籤的問題
					else if(did.match(/^NewDraft/)) {
						var updId = $(d).attr("update-id");
						var $nd = $(doc.documentElement).find("> Updates > 文稿").filter(function(idx2, d2) {
							return $(d2).attr("id") == updId;
						});
						guid = $nd.attr("GUID");
						theLogger.warn("暫存檔文稿GUID:'" + guid + "'");
					}
					try {
						// 1100616 Raymond 1100552 修正草稿新增三文稿再刪除一文稿再調整稿序後, 儲存再開啟, 已匯出附件頁面的稿件未顯示附件頁籤的問題
						//var d2 = signFolder.getDraftById(did);
						var d2 = (!!guid)?signFolder.getDraftByGUID(guid):signFolder.getDraftById(did);
						if(d2) {
							// 1100616 Raymond 1100552 修正草稿新增三文稿再刪除一文稿再調整稿序後, 儲存再開啟, 已匯出附件頁面的稿件未顯示附件頁籤的問題
							//theLogger.warn("應保留封裝檔中ID:" + did + "之文稿");
							theLogger.warn("應保留封裝檔中ID:" + ((!!guid)?guid:did) + "之文稿");
							delete d2.willDel;
						}
					}
					catch(e) {
						theLogger.warn("封裝檔中無ID為'" + did + "'之文稿, 應是新增");
						var updId = $(d).attr("update-id");
						var $upd = $(doc.documentElement).find("> Updates > 文稿").filter(function(x, d3) {
							if($(d3).attr("id") == updId)
								return true;
						});
						if($upd.length) {
							var guid = $upd.attr("GUID");
							for(var i=0; i<n; i++) {
								var d2 = signFolder.getDraft(i);
								if(d2.guid == guid) {
									// 1070118 Raymond 1070035 修正非異動撤消時, SignWork.xml因調整稿序導致ID與照順序編設的新稿ID不一致, 而重設SignWork.xml中的文稿ID會導致套用樣版錯誤而無法開啟文稿的問題
									if(d2.id.match(/^NewDraft/)) {
										theLogger.warn("應保留封裝檔中GUID:" + d2.guid + "之文稿, 且保持原新增文稿的文件夾識別碼(ID):" + did + ", 因此ID為新增文稿而非異動撤消所造成的封裝檔ID");
									}
									else {
										// 1060930 Raymond 1060962 修正異動撤消或封裝成功傳送失敗時, 需載入傳送前SignWork.xml但文稿ID與封裝檔重編後不一致的問題
										//theLogger.warn("應保留封裝檔中GUID:" + d2.guid + "之文稿, 並更名為'" + did + "'");	// 2016.12.9 fix d.guid->d2.guid
										theLogger.warn("應保留封裝檔中GUID:" + d2.guid + "之文稿, 並更名為'" + d2.id + "'");
										$(d).attr("文件夾識別碼", d2.id);
									}
									delete d2.willDel;
									break;
								}
							}
						}
						else
							theLogger.error("SignWork.xml找不到update-id為'" + updId + "'之文稿");
					}
				});
				for(var i=n-1; i>=0; i--) {
					var d2 = signFolder.getDraft(i);
					//if(d2.name != "來文內容" && "willDel" in d2 && d2.willDel == true) {
					if(!("fromType" in d2) && "willDel" in d2 && d2.willDel == true) {	// 2017.1.16 bugfix for 來文判定
						theLogger.warn("由於SignWork.xml暫存檔中無記錄ID:" + d2.id + "之文稿, 判定為本流程刪除之文稿, 同步異動至封裝檔結構");
						// 1110106 Raymond 1101423 修正「轉線上」(EDT213)後的公文, 開啟儲存後文稿管理檔仍殘留轉線上之前新增的舊文稿(簽核頁面看不到但發文登錄會列出)的問題
						if(!!currMgmt && !!d2.guid) {
							var idxInMgmt = currMgmt.getDraftIndex(d2.guid);
							if(idxInMgmt >= 0) {
								theLogger.warn("同步刪除文稿管理檔中GUID為'" + d2.guid + "'的文稿(index:" + idxInMgmt + ")");
								currMgmt.deleteDraft(idxInMgmt);
							}
							else
								theLogger.warn("文稿管理檔找不到GUID為'" + d2.guid + "'的文稿, 無法同步刪除");
						}
						signFolder.delDraft(i);
					}
				}
			//}
			// 1090908 Raymond 1090564 解析"簽核物件"獨立成function, 供信保特殊模式共用
			function parseSignObj($so) {
				var t = $so.attr("產生時間");
				var so = {
					id: $so.attr("id") || Math.ceil(Math.random() * 1000),	// 2017.1.18 新增優先從SignWork.xml讀取ID屬性, 若無此屬性才用隨機數字
					// 1100715 Raymond 1100854 新增支援[高大客製化]包含秒的時間
					// 1091231 Raymond 信保序138 代理人蓋章的tooltip應顯示代理人姓名而非被代理人姓名
					//info: t.substr(0, 3) + "年" + t.substr(3, 2) + "月" + t.substr(5, 2) + "日 " + t.substr(7, 2) + ":" + t.substr(9, 2) + "\n" + theUserInfo.UserName,
					//info: t.substr(0, 3) + "年" + t.substr(3, 2) + "月" + t.substr(5, 2) + "日 " + t.substr(7, 2) + ":" + t.substr(9, 2) + "\n" + ((!!theSSO && !!theSSO.User && !!theSSO.User.name && theSSO.User.name.length > 0)?theSSO.User.name:theUserInfo.UserName),
					info: t.substr(0, 3) + "年" + t.substr(3, 2) + "月" + t.substr(5, 2) + "日 " + t.substr(7, 2) + ":" + t.substr(9, 2) + ((t.length == 13)?(":"+t.substr(11, 2)):"") + "\n" + ((!!theSSO && !!theSSO.User && !!theSSO.User.name && theSSO.User.name.length > 0)?theSSO.User.name:theUserInfo.UserName),
					cTime: toCTime(t)};
				// 2017.1.25 因為外部記錄檔不會記錄來文及附件上的新增簽核物件, 所以當暫存檔載入時要判斷是新增物件並更新流水號
				if(typeof so.id === "string" && so.id.match(/X_\d+/)) {
					theLogger.log("此ID(" + so.id + ")是新增物件, 更新流水號");
					signFolder.xSignFolder().newSOID(parseInt(so.id.substr(2)));
				}
				// 1110620 Raymond 1110579 新增讀入"產生點資訊"屬性並轉為msgId, 及將"產生時間"屬性記錄下來, 用於比對異動撤消後還原職名章
				if(!!$so.attr("產生點資訊")) {
					so.msgId = $so.attr("產生點資訊").replace("sign_", "");
					so.time = t;
				}
				var type = getElmText($so, "物件類型");
				switch(type) {
					case "章戳":
						var $stamp = $so.find(type);
						so.type = $stamp.attr("type");
						// 2016.6.13 新增actionName屬性
						if($stamp.attr("actionName"))
							so.actionName = $stamp.attr("actionName");
						so.dispTime = $stamp.attr("顯示時間") == "Y";
						so.orient = getElmText($stamp, "文字走向");
						var $rect = $stamp.find("區域");
						so.pos = {
							left: Number($rect.attr("left")),
							top: Number($rect.attr("top"))};
						so.size = {
							width: $rect.attr("width"),
							height: $rect.attr("height")};
						var $clr = $stamp.find("顏色");
						so.color = {
							r: $clr.attr("紅"),
							g: $clr.attr("綠"),
							b: $clr.attr("藍")};
						// 2014.12.5 新增自動加蓋記錄
						if($stamp.attr("自動加蓋") == "true")
							so.auto = true;
						// 2017.3.30 新增linkSOID屬性
						if($stamp.attr("linkSOID"))
							so.linkSOID = $stamp.attr("linkSOID");
						// 2015.5.8 新增簽核區域類型、ID、offset
						if($stamp.attr("簽核區域類型") !== undefined) {
							so.saType = $stamp.attr("簽核區域類型");
							so.saID = $stamp.attr("簽核區域ID");
							var pstr = $stamp.attr("簽核區域內座標");
							var pa = pstr.split(",");
							if(pa.length == 2)
								so.offset = {left:Number(pa[0]), top:Number(pa[1])};
						}
						so.content = {};
						so.fileName = getElmText($stamp, "電子檔名");
						// 1141117 Raymond 1141442 修正RegExp.$1可能是空值的問題
						//if(so.fileName.match(/NewSignObj([0-9]+)[^\.a-zA-Z]*/)) {
						//	theLogger.log(RegExp.$1);
						//	var n = Number(RegExp.$1);
						var m = so.fileName.match(/NewSignObj([0-9]+)[^\.a-zA-Z]*/);
						if(!!m && m.length > 1) {
							var n = Number(m[1]);
							signFolder.lastSNofSOFileName = Math.max(n, signFolder.lastSNofSOFileName);
						}
						// 1110617 Raymond 1110579 若是異動撤消公文, 從SignWork_msgId.xml中還原的話, 改從封裝檔中被刪除的流程點及簽核物件中搜尋職名章圖檔下載
						var fsd = signFolder.getForbiddenSignDef(), revised = false;
						if(isRecover && !!fsd) {
							var fsos = signFolder.getForbiddenSignObjs();
							if(fsos.length > 0) {
								console.log("暫存檔中職名章ID=" + so.id);
								var xso = signFolder.xSignFolder().findMissingXSignObj(so);
								if(!!xso) {
									for(var j=0; j<fsos.length; j++) {
										var fso = fsos[j];
										if(fso.id == xso.id) {
											if(!!fso.content && !!fso.content.fileSN) {
												console.log("封裝檔找到職名章ID=" + fso.id + ", fileSN=" + fso.content.fileSN);
												revised = true;
												signFolder.getSODataURL(fso, fsd).done(function(dataUrl) {	// 使用相同方法, 但給forbiddenSignObj及forbiddenSignDef, 以下載前次傳送時的職名章圖檔, 而不是SignWork_msgId.xml中記錄的影像檔名
													so.content = dataUrl;
													if("reload" in so)
														so.reload();
												});
											}
											else
												console.error("封裝檔找到職名章ID=" + fso.id + ", 但封裝檔未記錄檔案序號, 無法取得圖檔影像");
										}
									}
								}
							}
						}
						if(!revised)
						signFolder.getSODataURL(so).done(function(dataUrl) {
							so.content = dataUrl;
							// 1060420 Raymond 1060156 修正章戳偶而會顯示[object%20Object]問題
							if("reload" in so)
								so.reload();
						});
						break;
					case "圖檔":
						var $img = $so.find(type);
						so.type = $img.attr("type");
						so.maskBkgnd = $img.attr("去背景");
						so.transparency = $img.attr("透明度");
						so.asIcon = $img.attr("as-icon") == "true";
						// 1130314 Raymond 1130050 新增「貼布」產生的圖檔簽核物件的color屬性
						if($img.attr("color"))
							so.color = $img.attr("color");
						var $rect = $img.find("區域");
						so.pos = {
							left: Number($rect.attr("left")),
							top: Number($rect.attr("top"))};
						so.size = {
							width: $rect.attr("width"),
							height: $rect.attr("height")};
						// 1090312 Raymond 1081105 新增linkSOID屬性
						if($img.attr("linkSOID"))
							so.linkSOID = $img.attr("linkSOID");
						// 1130705 Raymond 中榮序139 新增影像式選用章戳記錄章戳名稱功能
						if($img.attr("stampName"))
							so.stampName = $img.attr("stampName");
						// 2015.5.29 新增簽核區域類型、ID、offset
						if($img.attr("簽核區域類型") !== undefined) {
							so.saType = $img.attr("簽核區域類型");
							so.saID = $img.attr("簽核區域ID");
							var pstr = $img.attr("簽核區域內座標");
							var pa = pstr.split(",");
							if(pa.length == 2)
								so.offset = {left:Number(pa[0]), top:Number(pa[1])};
						}
						so.content = {};
						so.fileName = getElmText($img, "電子檔名");
						// 2016.1.27 match不能用RegExp.$1?
						var m = so.fileName.match(/NewSignObj([0-9]+)[^\.a-zA-Z]*/);
						if(m && m.length > 1) {
							//theLogger.log(m[1]);
							var n = Number(m[1]);
							signFolder.lastSNofSOFileName = Math.max(n, signFolder.lastSNofSOFileName);
						}
						signFolder.getSODataURL(so).done(function(dataUrl) {
							so.content = dataUrl;
							// 1090424 Raymond 1090305 修正數位墨水圖檔偶而會沒有顯示的問題
							if("reload" in so)
								so.reload();
						});
						break;
					case "文字意見":
						var $txt = $so.find(type);
						so.type = $txt.attr("type");
						// 2016.6.13 新增actionName屬性
						if($txt.attr("actionName"))
							so.actionName = $txt.attr("actionName");
						so.asIcon = $txt.attr("as-icon") == "true";
						// 1100517 Raymond 1100298 新增取代他流程文字意見屬性
						if(!!$txt.attr("subst-objid"))
							so.substObjId = $txt.attr("subst-objid");
						var $pos = $txt.find("位置");
						so.pos = {
							left: Number($pos.attr("left")),
							top: Number($pos.attr("top"))};
						// 1081217 Raymond FIX XSS, Entity由XML讀回不要再編碼, 由顯示在頁面上時用.text()處理
					    //1070817 Zen 1070678 弱掃XSS修正
						//so.content = getElmText($txt, "文字內容");
						so.content = HtmlEncode(getElmText($txt, "文字內容"));
						var str = $txt.find("文字內容").attr('srcContent');	//2016.12.27	Leslie	取得原始文字內容，若有，則設定至so.srcContent
						if(str)	
							so.srcContent = Utf7.decode(str);	//2016.12.27	Leslie	新增原始文字內容屬性，decode出原始內容
						// 1120519 Raymond 1120379 修正讀取SignWork.xml時, 若文字意見的文字內容的srcContent屬性為空時, 此簽核物件會因無srcContent而使breakLineForTextComment發生Exception, 導致轉圈圈無法繼續操作的問題
						else
							so.srcContent = "";
						// 1120210 Raymond 1111035 讀回前次暫存的文字意見寬度(不論目前是否為貼式狀態)
						if(!!$txt.find("文字內容").attr("width"))
							so.width = $txt.find("文字內容").attr("width");
						so.orient = getElmText($txt, "文字走向");
						var $fnt = $txt.find("字型");
						so.fontName = getElmText($fnt, "名稱");
						var style = getElmText($fnt, "樣式");
						so.fontWeight = style.search("粗") >= 0;
						so.fontStyle = style.search("斜") >= 0;
						so.fontSize = getElmText($fnt, "大小") + "pt";
						var $clr = $txt.find("顏色");
						so.color = {
							r: $clr.attr("紅"),
							g: $clr.attr("綠"),
							b: $clr.attr("藍")};
						// 2014.12.5 新增自動加蓋記錄
						if($txt.attr("自動加蓋") == "true")
							so.auto = true;
						// 1090312 Raymond 1081105 新增linkSOID屬性
						if($txt.attr("linkSOID"))
							so.linkSOID = $txt.attr("linkSOID");
						// 2015.5.29 新增簽核區域類型、ID、offset
						if($txt.attr("簽核區域類型") !== undefined) {
							so.saType = $txt.attr("簽核區域類型");
							so.saID = $txt.attr("簽核區域ID");
							var pstr = $txt.attr("簽核區域內座標");
							var pa = pstr.split(",");
							if(pa.length == 2)
								so.offset = {left:Number(pa[0]), top:Number(pa[1])};
						}
						break;
				};
				return so;
			}
			
			// 2016.7.22 新增解讀新增文稿
			var $newDrafts = $sf.find("文稿").filter(function(idx, d) {
				var did = $(d).attr("文件夾識別碼");
				if(typeof did === "string" && did.match(/^NewDraft/))
					return true;
				return false;
			});
			if($newDrafts.length) {
				$.each($newDrafts, function(idx, d) {
					var updId = $(d).attr("update-id");
					var did = $(d).attr("文件夾識別碼");
					var $nd = $(doc.documentElement).find("> Updates > 文稿").filter(function(idx2, d2) {
						return $(d2).attr("id") == updId;
					});
					var draftInfo = {
						id: did,
						guid: $nd.attr("GUID"),
						applyPrintXSL: $nd.attr("套用樣版檔"),
						fileName: $nd.attr("原始檔名"),
						sn: $nd.attr("序號"),
						printXSLType: $nd.attr("樣版類型"),
						time: $nd.attr("產生時間"),
						docType: $nd.attr("文稿類型"),		// 2016.11.17 讀入新增的文稿類型、次文別、名稱屬性
						subDocType: $nd.attr("次文別"),
						name: $nd.attr("名稱")
					};
					var flowId = $nd.attr("產生點資訊");	// 2016.11.17 讀入新增的產生點資訊並截成msgId, 配合SignFolder.newDraft()
					if(typeof flowId === "string" && flowId.length > 0 && flowId.match(/^sign_/))
						draftInfo.msgId = flowId.substr(5);
					// 1090907 Raymond 1090564 信保特殊模式
					if(theAOL.docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
						var $draftPgs = $nd.find("> 文稿頁面檔");
						if($draftPgs.length) {	// 載入暫存檔中記錄的文稿頁面檔資訊
							draftInfo.draftPgs = {
								method: $draftPgs.attr("記錄方式"),
								time: $draftPgs.attr("產生時間"),
								pages: []};
							draftInfo.draftPgs.count = $draftPgs.find("文稿頁面清單").attr("頁面數");
							var $pgs = $draftPgs.find("文稿頁面清單 頁面");
							if($pgs.length == 0)
								theLogger.error("[信保特殊模式]公文文稿無<頁面>!");
							for(var i=0; i<$pgs.length; i++) {
								var pgInfo = {
									fileRef: {name: $pgs.eq(i).attr("原始檔名")},
									time: $pgs.eq(i).attr("產生時間"),
									newSignObjs: []
								};
								// 文稿頁面的簽核物件要在這裡就取出
								$pgs.eq(i).find("簽核物件").each(function(idxSO, ndSO) {
									var newSO = parseSignObj($(ndSO));
									//newSO.boundTo = pgInfo;	綁定要在signFolder.newDraft做
									//newSO.bounded = true;
									pgInfo.newSignObjs.push(newSO);
								}).remove();	// 取得後即刪掉, 避免後面的撈出簽核物件動作需要比對parent-id時發生文稿無GUID的錯誤
								draftInfo.draftPgs.pages.push(pgInfo);
							}
							draftInfo.skipX = true;	// 避免在外部簽核記錄檔XSignObjs.xml中同步新增文稿
						}
						else
							theLogger.error("[信保特殊模式]公文文稿無<文稿頁面檔>!");
					}
					// 2016.8.11 新增解讀附件
					var $atts = $nd.find("附件清單 附件");
					if($atts.length > 0) {
						draftInfo.attachs = [];
						for(var i=0; i<$atts.length; i++) {
							var $att = $atts.eq(i);
							var attInfo = {
								sn: $att.attr("序號"),
								id: $att.attr("文件夾識別碼"),
								fmt: $att.attr("格式"),
								time: $att.attr("產生時間"),
								guid: $att.attr("GUID"),
								name: $att.find("> 名稱").text(),	// 1090910 Raymond 1090564 修正附件頁面下有文字意見時, 附件名稱後面會多出文字意見的"字型名稱"問題
								attType: $att.find("附件類型").text(),
								fileRef: {name: $att.attr("原始檔名")}	// 2017.4.12 add
							};
							if($att.find("文稿頁面檔格式附件").length > 0) {	// 匯出附件頁面的結構
								var $attPages = $att.find("文稿頁面檔格式附件 文稿頁面檔");
								if($attPages.length) {
									attInfo.draftPages = {
										time: $attPages.attr("產生時間"),
										method: $attPages.attr("記錄方式"),
										pages: []
									};
									var $pages = $attPages.find("頁面");
									for(var j=0; j<$pages.length; j++) {
										var pageInfo = {
											container: attInfo,		// 2017.4.12 新增, 避免檢查pg.container時出錯
											//fileName: $pages.eq(j).attr("原始檔名"),
											id: $pages.eq(j).attr("文件夾識別碼"),
											time: $pages.eq(j).attr("產生時間"),
											flowId: $pages.eq(j).attr("產生點資訊")
										};
										if($pages.eq(j).attr("原始檔序號")) {	// 2017.4.12 新增文稿的附件(頁面)應該沒有原始檔序號
											pageInfo.fileSN = $pages.eq(j).attr("原始檔序號");
											pageInfo.sn = $pages.eq(j).attr("序號");
										}
										else 
											pageInfo.fileRef = {name: $pages.eq(j).attr("原始檔名")};
										attInfo.draftPages.pages.push(pageInfo);
									}
									//signFolder.restoreAttFileRef(attInfo);	// 2017.4.12 新增文稿的附件(頁面)應該沒有原始檔序號
								}
							}
							draftInfo.attachs.push(attInfo);
						}
					}
					signFolder.newDraft(draftInfo);
				});
			}
			// 2017.3.21 新增解讀異動文稿
			var $modDrafts = $sf.find("文稿").filter(function(idx, d) {
				var did = $(d).attr("文件夾識別碼");
				if(typeof did === "string" && did.match(/\d+X/))
					return true;
				return false;
			});
			if($modDrafts.length) {
				$.each($modDrafts, function(idx, d) {
					var updId = $(d).attr("update-id");
					var did = $(d).attr("文件夾識別碼").replace(/X$/, "");
					var $nd = $(doc.documentElement).find("> Updates > 文稿").filter(function(idx2, d2) {
						return $(d2).attr("id") == updId;
					});
					var draftInfo = {
						id: did,
						guid: $nd.attr("GUID"),
						applyPrintXSL: $nd.attr("套用樣版檔"),
						fileName: $nd.attr("原始檔名"),
						sn: $nd.attr("序號"),
						printXSLType: $nd.attr("樣版類型"),
						time: $nd.attr("產生時間"),
						docType: $nd.attr("文稿類型"),		// 2016.11.17 讀入新增的文稿類型、次文別、名稱屬性
						subDocType: $nd.attr("次文別"),
						name: $nd.attr("名稱")
					};
					// 1121005 Raymond 1111194 修正受會單位新增文稿後, 在順會待核示或分會待核示中修改文稿儲存後再開啟, 文稿原始檔名被錯誤記錄為「文號-受會單位代碼-01」路徑的問題
					let chk = draftInfo.fileName.match(/-[0-9]{2}\\/);
					if(!!chk && chk[0].substr(1, 2) != "99") {
						theLogger.warn("修正SignWork.xml中記錄的文稿原始檔路徑'" + draftInfo.fileName + "'為'" + draftInfo.fileName.replace(/-[0-9]{2}\\/, "-99\\") + "'");
						draftInfo.fileName = draftInfo.fileName.replace(/-[0-9]{2}\\/, "-99\\");
					}
					var flowId = $nd.attr("產生點資訊");	// 2016.11.17 讀入新增的產生點資訊並截成msgId, 配合SignFolder.newDraft()
					if(typeof flowId === "string" && flowId.length > 0 && flowId.match(/^sign_/))
						draftInfo.msgId = flowId.substr(5);
					// 1090914 Raymond 1090564 信保特殊模式
					if(theAOL.docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
						var $draftPgs = $nd.find("> 文稿頁面檔");
						if($draftPgs.length) {	// 載入暫存檔中記錄的文稿頁面檔資訊
							draftInfo.draftPgs = {
								method: $draftPgs.attr("記錄方式"),
								time: $draftPgs.attr("產生時間"),
								pages: []};
							draftInfo.draftPgs.count = $draftPgs.find("文稿頁面清單").attr("頁面數");
							var $pgs = $draftPgs.find("文稿頁面清單 頁面");
							if($pgs.length == 0)
								theLogger.error("[信保特殊模式]公文文稿無<頁面>!");
							for(var i=0; i<$pgs.length; i++) {
								var pgInfo = {
									fileRef: {name: $pgs.eq(i).attr("原始檔名")},
									time: $pgs.eq(i).attr("產生時間"),
									newSignObjs: []
								};
								// 文稿頁面的簽核物件要在這裡就取出
								$pgs.eq(i).find("簽核物件").each(function(idxSO, ndSO) {
									var newSO = parseSignObj($(ndSO));
									//newSO.boundTo = pgInfo;	綁定在後面更新再做
									//newSO.bounded = true;
									pgInfo.newSignObjs.push(newSO);
								}).remove();	// 取得後即刪掉, 避免後面的撈出簽核物件動作需要比對parent-id時發生文稿無GUID的錯誤
								draftInfo.draftPgs.pages.push(pgInfo);
							}
						}
						else
							theLogger.error("[信保特殊模式]公文文稿無<文稿頁面檔>!");
					}
					// 2016.8.11 新增解讀附件
					var $atts = $nd.find("附件清單 附件");
					if($atts.length > 0) {
						draftInfo.attachs = [];
						for(var i=0; i<$atts.length; i++) {
							var $att = $atts.eq(i);
							var attInfo = {
								sn: $att.attr("序號"),
								id: $att.attr("文件夾識別碼"),
								fmt: $att.attr("格式"),
								time: $att.attr("產生時間"),
								guid: $att.attr("GUID"),
								name: $att.find("> 名稱").text(),	// 1090910 Raymond 1090564 修正附件頁面下有文字意見時, 附件名稱後面會多出文字意見的"字型名稱"問題
								attType: $att.find("附件類型").text(),
								fileRef: {name: $att.attr("原始檔名")}	// 2017.3.22 新增從暫存檔讀回原始檔名, 2017.4.11 bugfix, 2017.4.12 再fix
							};
							if($att.find("文稿頁面檔格式附件").length > 0) {	// 匯出附件頁面的結構
								var $attPages = $att.find("文稿頁面檔格式附件 文稿頁面檔");
								if($attPages.length) {
									attInfo.draftPages = {
										time: $attPages.attr("產生時間"),
										method: $attPages.attr("記錄方式"),
										pages: []
									};
									var $pages = $attPages.find("頁面");
									for(var j=0; j<$pages.length; j++) {
										var pageInfo = {
											container: attInfo,		// 2017.4.12 新增, 避免檢查pg.container時出錯
											//fileRef: {name: $pages.eq(j).attr("原始檔名")},	// 2017.3.31 fix
											id: $pages.eq(j).attr("文件夾識別碼"),
											time: $pages.eq(j).attr("產生時間"),
											flowId: $pages.eq(j).attr("產生點資訊")
										};
										if($pages.eq(j).attr("原始檔序號")) {	// 2017.4.12 bugfix
											pageInfo.fileSN = $pages.eq(j).attr("原始檔序號");
											pageInfo.sn = $pages.eq(j).attr("序號");
										}
										else 
											pageInfo.fileRef = {name: $pages.eq(j).attr("原始檔名")};
										attInfo.draftPages.pages.push(pageInfo);
									}
									signFolder.restoreAttFileRef(attInfo);	// 2017.4.12 新增呼叫此函式重建以原始檔序號記錄的附件(頁面)檔案參照
								}
							}
							draftInfo.attachs.push(attInfo);
						}
					}
					theLogger.log("更新已異動文稿:");
					theLogger.log(draftInfo);
					try {
						var d2 = signFolder.getDraftById(draftInfo.id);
						theLogger.log(d2);
						if(d2.guid != draftInfo.guid)
							theLogger.error("GUID:" + d2.guid + "->" + draftInfo.guid + "不一致");
						if(d2.applyPrintXSL != draftInfo.applyPrintXSL) {
							theLogger.warn("applyPrintXSL更新為'" + d2.applyPrintXSL + "'->'" + draftInfo.applyPrintXSL);
							d2.applyPrintXSL = draftInfo.applyPrintXSL;
						}
						if(d2.fileName != draftInfo.fileName) {
							theLogger.warn("fileName更新為'" + d2.fileName + "'->'" + draftInfo.fileName);
							d2.fileName = draftInfo.fileName;
						}
						if(d2.sn != draftInfo.sn) {
							theLogger.warn("sn更新為'" + d2.sn + "'->'" + draftInfo.sn);
							d2.sn = draftInfo.sn;
						}
						if(d2.printXSLType != draftInfo.printXSLType) {
							theLogger.warn("printXSLType更新為'" + d2.printXSLType + "'->'" + draftInfo.printXSLType);
							d2.printXSLType = draftInfo.printXSLType;
						}
						if(d2.time != draftInfo.time) {
							theLogger.warn("time更新為'" + d2.time + "'->'" + draftInfo.time);
							d2.time = draftInfo.time;
						}
						if(d2.docType != draftInfo.docType) {
							theLogger.warn("docType更新為'" + d2.docType + "'->'" + draftInfo.docType);
							d2.docType = draftInfo.docType;
						}
						if(d2.subDocType != draftInfo.subDocType) {
							theLogger.warn("subDocType更新為'" + d2.subDocType + "'->'" + draftInfo.subDocType);
							d2.subDocType = draftInfo.subDocType;
						}
						if(d2.name != draftInfo.name) {
							theLogger.warn("name更新為'" + d2.name + "'->'" + draftInfo.name);
							d2.name = draftInfo.name;
						}
						// 1090914 Raymond 1090564 信保特殊模式下文稿更新須讀入文稿頁面檔取代
						if(theAOL.docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
							if(!!draftInfo.draftPgs) {
								var abandonedDraftPages = d2.draftPages;
								d2.draftPages = {	// 重置文稿頁面檔
									method: draftInfo.draftPgs.method,
									time: draftInfo.draftPgs.time,
									pages: []
								};
								for(var k=0; k<draftInfo.draftPgs.pages.length; k++) {
									var p = signFolder.restoreAttPage(d2, k, draftInfo.draftPgs.pages[k]);
									// 加入簽核物件
									for(var j=0; j<draftInfo.draftPgs.pages[k].newSignObjs.length; j++) {
										draftInfo.draftPgs.pages[k].newSignObjs[j].boundTo = p;
										draftInfo.draftPgs.pages[k].newSignObjs[j].bounded = true;
										p.newSignObjs.push(draftInfo.draftPgs.pages[k].newSignObjs[j]);
									}
									d2.draftPages.pages.push(p);
								}
							}
							else
								theLogger.error("[信保特殊模式]文稿更新無<文稿頁面檔>");
						}
						if(!!draftInfo.attachs) {
							theLogger.warn("更新附件清單:");
							// 1100820 Raymond 1101066 修正原本無附件文稿, 在傳送後新增附件, 儲存關閉再開啟後, 附件頁面上無法加簽核物件問題(補單號)
							//var abandonedAttachs = d2.attachs;	// 1061116 Raymond 1061118 將封裝檔原本的附件、頁面、簽核物件資訊暫存到區域變數
							var abandonedAttachs = d2.attachs || [];	// 1061116 Raymond 1061118 將封裝檔原本的附件、頁面、簽核物件資訊暫存到區域變數
							d2.attachs = [];	// 重置附件清單
							for(var j=0; j<draftInfo.attachs.length; j++) {
								theLogger.warn(draftInfo.attachs[j]);
								// 1061116 Raymond 1061118 檢查ID是否相同, 若相同則從abandonedAttachs回復此附件的相關結構, 不同則新建結構
								var recoverFromX = false;
								// 1090914 Raymond 1090564 信保特殊模式下文稿更新必定連帶附件更新
								if(theAOL.docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2") {
								for(var k=0; k<abandonedAttachs.length; k++) {
									if(!!abandonedAttachs[k].id && !!draftInfo.attachs[j].id &&
										abandonedAttachs[k].id == draftInfo.attachs[j].id) {
										// 1110301 Raymond 1110106 合併1080815, 修正異動文稿後儲存再開啟時, 不匯出頁面的附件會有Error的問題
										// 1061117 Raymond 1061118 再檢查附件頁面是否為前次重新匯出之頁面, 若否才從封裝檔回復
										//if (draftInfo.attachs[j].draftPages.pages.length > 0 &&
										if (draftInfo.attachs[j].fmt == "文稿頁面檔格式" &&
											draftInfo.attachs[j].draftPages.pages.length > 0 &&
											"fileRef" in draftInfo.attachs[j].draftPages.pages[0] &&
											draftInfo.attachs[j].draftPages.pages[0].fileRef.name.match(/\d{4}\-\d+.\d{4}/)) {
											theLogger.log("附件#" + j + "(ID:" + draftInfo.attachs[j].id + ")為封裝檔既有附件, 因前次調整順序而重新匯出頁面, 從暫存檔新增");
										}
										else {
											theLogger.log("附件#" + j + "(ID:" + draftInfo.attachs[j].id + ")為封裝檔既有附件且未重新匯出頁面, 從封裝檔復原加入");
											d2.attachs.push(abandonedAttachs.splice(k, 1)[0]);
											recoverFromX = true;
											// 1130718 Raymond 1120899 修正在不匯出附件頁面的設定下, 調整附件順序後儲存, 關閉再開時附件頁籤名稱及檔名變回未調整前的名稱及檔名, 若再儲存或傳送的話, 會造成與文稿管理檔記錄的檔名不一致而導致傳送失敗的問題
											var la = d2.attachs[d2.attachs.length - 1];
											// 1130803 Raymond 中興序167 修正在要匯出附件頁面的設定下有2筆附件以上時, 異動內文後儲存關閉再開時, 第2筆以後的附件的"原始檔序號"屬性會不見, 造成傳送會失敗的問題
											//if(!!la.fileRef && !!la.fileRef.name) {
											if(!!la.fileRef && !!la.fileRef.name && !!draftInfo.attachs[j].fileRef && !!draftInfo.attachs[j].fileRef.name) {
												var xafn = la.fileRef.name.substr(la.fileRef.name.indexOf("\\") + 1);
												var mafn = draftInfo.attachs[j].fileRef.name.substr(draftInfo.attachs[j].fileRef.name.indexOf("\\") + 1);
												if(xafn != mafn) {
													theLogger.warn("封裝檔記錄的附件#" + k + "(id:" + la.id + ")檔名為'" + xafn + "'與文稿管理檔記錄的附件#" + j + "檔名'" + mafn + "'不一致, 應該是調整稿序造成的, 從暫存檔復原");
													recoverFromX = false;
													d2.attachs.splice(d2.attachs.length - 1, 1);	// 移除先加入的封裝檔附件資訊, 以免從暫存檔復原後重複
												}
											}
										}
										break;
									}
								}
								}	// 1090914 Raymond 1090564 end of if(theAOL.docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2")
								if(!recoverFromX) {
									theLogger.log("附件#" + j + "(ID:" + draftInfo.attachs[j].id + ")不存在於封裝檔, 從暫存檔新增");
								// 1061003 Raymond 1060989 修正暫存後附件頁面無法再加入新的簽核物件問題
								//d2.attachs.push(draftInfo.attachs[j]);
								var a = signFolder.restoreAtt(draftInfo.attachs[j], d2);
								a.id = draftInfo.attachs[j].id;
								a.time = draftInfo.attachs[j].time;
								// 1110301 Raymond 1110106 合併1080815, 支援讀入不匯出頁面的附件
								if("fmt" in a && a.fmt == "電子檔格式") {
									theLogger.log("從SignWork.xml恢復的附件" + j + "'" + a.name + "'是電子檔格式附件");
									a.fileRef = draftInfo.attachs[j].fileRef;
								}
								else
								// 1080904 Raymond 1080660 修正不匯出附件頁面的暫存檔復原時會發生Error的問題
								if("draftPages" in draftInfo.attachs[j]) {
									a.draftPages.time = draftInfo.attachs[j].draftPages.time;
									a.draftPages.pages.length = 0;
									for(var k=0; k<draftInfo.attachs[j].draftPages.pages.length; k++) {
										// 1090911 Raymond 1090564 信保特殊模式多傳入第3參數page
										if(theAOL.docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
											var p = signFolder.restoreAttPage(a, k, draftInfo.attachs[j].draftPages.pages[k]);
										}
										else {
										var p = signFolder.restoreAttPage(a, k);
										p.id = draftInfo.attachs[j].draftPages.pages[k].id;
										if("fileSN" in draftInfo.attachs[j].draftPages.pages[k])
											p.fileSN = draftInfo.attachs[j].draftPages.pages[k].fileSN;
										p.time = draftInfo.attachs[j].draftPages.pages[k].time;
										p.sn = k;
										p.fileRef = draftInfo.attachs[j].draftPages.pages[k].fileRef;
										// 1061117 Raymond 1061118 從頁面檔名判斷是否為本流程重新匯出
										if(k == 0 && !!p.fileRef && typeof p.fileRef.name === "string" && p.fileRef.name.match(/\d{4}\-\d+.\d{4}/)) {
											theLogger.log("頁面的影像檔名為'" + p.fileRef.name + "'符合匯出的頁面影像檔命名規則, 判斷此附件為本流程重新匯出");
											a.draftPages.dirty = true;
										}
										}
										a.draftPages.pages.push(p);
									}
									a.draftPages.pages.count = k;
								}
								d2.attachs.push(a);
								}
							}
						}
						else if(!!d2.attachs) {
							theLogger.warn("清除附件清單");
							d2.attachs.length = 0;
						}
					}
					catch(e) {
						theLogger.error("找不到文稿(ID:" + draftInfo.id + "), 無法更新上次儲存時的異動! " + e.message);
					}
				});
			}
			// 2016.10.21 新增恢復上次異動後的稿序
			theLogger.log("恢復上次異動後的稿序...");
			var param = [];
			$sf.find("文稿").each(function(idx, d) {
				var did = $(d).attr("文件夾識別碼");
				if(did.match(/X$/)) {	// 2017.1.23 文件夾識別碼有X表示異動內文, ID要還原
					did = did.replace(/X$/, "");
					theLogger.log(idx + ": id:" + did + "(X)");
				}
				else
					theLogger.log(idx + ": id:" + did);
				param.push({id: did})
			});
			signFolder.reorder(param);
		}
		else {
			theLogger.warn("SignWork.xml暫存工作檔中找不到'簽核文件夾'節點!?");
			return;
		}
		
		var $signCmt = $(doc.documentElement).find("> 異動資訊 > 簽核意見");    // 2014.1.16 - Raymond, 讀回暫存在工作檔中的簽核意見
		if($signCmt.length) {
			// 1100707 Raymond 1100648 新增支援分文稿記錄簽核意見功能
			if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
				// 恢復上次儲存的簽核意見移至讀取完Updates內容後做, 這樣才能區分文稿是否為dirty(新增或有異動內文)
			}
			else
				signFolder.signComment($signCmt.text());
		}
		
		var $upd = $(doc.documentElement).find("> Updates");
		if($upd.length) {
			// 1130830 Raymond 中榮序218 載入XSignObjs.xml時, 異動過的文稿版本, 改移至暫存而不是直接刪除, 在載入SignWork.xml後, 判斷Updates中有此文稿ID再恢復, 以避免第二第文稿未點開的情況下自動備份, 會寫出ID沒有X的版本, 但SignWork.xml中Updates有此ID的異動文稿, 導致傳送時會發生-731問題
			var recoverXDraftVers = [];
			$upd.find("> 文稿").each(function(idx, nd) {
				var id = $(nd).attr("id");
				var $d = $(doc.documentElement).find("文稿[update-id='" + id + "']");
				recoverXDraftVers.push({guid: $(nd).attr("GUID"), verId: $d.attr("文件夾識別碼")});
			});
			if(recoverXDraftVers.length > 0)
				signFolder.xSignFolder().recoverRemovedDraftVers(recoverXDraftVers);
			
			$upd.find("簽核物件").each(function(idx, nd) {
				var $so = $(nd);
				var parentId = $so.attr("parent-id");
				// 1060901 Raymond 1060766 若前一次暫存有實際上的頁面ID, 則讀回取代parent-id
				if(!!$so.attr("acturalPgId")) {
					parentId = $so.attr("acturalPgId");
					theLogger.warn("讀回前一次暫存的頁面ID(" + parentId + ")");
				}
				if(!parentId) {	// 2016.1.11 無parent-id屬性的簽核物件, 可能是附件頁面上原始的簽核物件, 因為附件不會重新匯出頁面, 故會從<附件清單>節點開始從封裝檔複製到工作檔中記錄下來
					theLogger.warn("簽核物件無parent-id屬性, 應是附件頁面上原始的簽核物件");
					return true;
				}
				var pgIdx = $so.attr("page-index");
				// 1060901 Raymond 1060766 若前一次暫存有實際上的頁次, 則讀回取代page-index
				if(!!$so.attr("acturalPgIdx")) {
					pgIdx = $so.attr("acturalPgIdx");
					theLogger.warn("讀回前一次暫存的頁面ID(" + pgIdx + ")");
				}
				// 1090908 Raymond 1090564 移至獨立function, 提供信保特殊模式共用
				var so = parseSignObj($so);
				// 2016.12.21 quickfix for parentId = "NaN", 新增文稿時會產生這種記錄, 應改用page-index的頁次來找對應頁面
				var pg;
				// 1130524 Raymond 1130179 修正來文擬辦新增文稿及附件後再加蓋職名章於文稿頁面, 傳送後再撤回(或異動撤消), 會發生加蓋於文稿頁面的簽核物件被移至附件的倒數第2+%文稿頁面數%的頁面上(案例公文為共15頁的附件一的第12頁)的問題
				// 1100910 Raymond 1100771 修正未異動內文但簽核物件位於封裝檔頁次(問題案例為3頁)後動態排版多出的新頁面(問題案例為第4頁), 因改判讀前一次暫存的頁面ID(小於100, 問題案例為'1')但找不到上層<文稿>而造成「$d.attr("文件夾識別碼").replace(/X$/, "")」這行發生錯誤的問題
				// 1100416 Raymond 1090564 修正在信保特殊模式公文的草稿附件頁面上新增簽核物件, 儲存關閉再開啟後會不見的問題
				// 1091005 Raymond 1090736 修正來文擬辦新增稿一並增加內文到2頁加簽核物件後再新增稿二, 儲存後再開啟, 稿一的簽核物件會顯示在稿二的問題
				//if((parentId == "NaN" || parseInt(parentId) < 100) && pgIdx.match(/\d+/)) {	// 2017.3.14 fix for 儲存2個新增或異動文稿時, 第1個文稿有2頁, 簽核物件的parentId為2, 在載入時會變成找到第2個文稿的問題
				//if((parentId == "NaN" || parseInt(parentId) < 100 || $so.closest("文稿").length > 0) && pgIdx.match(/\d+/)) {	// 2017.3.14 fix for 儲存2個新增或異動文稿時, 第1個文稿有2頁, 簽核物件的parentId為2, 在載入時會變成找到第2個文稿的問題
				//if((parentId == "NaN" || parseInt(parentId) < 100 || $so.closest("文稿").length > 0) && pgIdx.match(/\d+/) && theAOL.docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2") {
				//if((parentId == "NaN" || parseInt(parentId) < 100) && $so.closest("文稿").length > 0 && pgIdx.match(/\d+/) && theAOL.docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2") {
				if($so.closest("文稿").length > 0 && pgIdx.match(/\d+/) && theAOL.docObj.get("ODWDCM", "DRAFT_SOURCE_TYPE") != "2") {
					var id = $so.closest("文稿").attr("id");
					var $d = $(doc.documentElement).find("文稿[update-id='" + id + "']");
					var did = $d.attr("文件夾識別碼").replace(/X$/, "");	// 2017.1.23 有X要去掉, 還原成與封裝檔一致的ID
					var d = signFolder.getDraftById(did);
					// 1060825 Raymond 1060661 若簽核物件在附件頁面上要搜尋對應的pg物件來加入
					if($so.closest("附件").length > 0) {
						// 1091006 Raymond 1090736 以比對附件GUID取代比對附件的文件夾識別碼, 因儲存時若有先匯出附件頁面再刪減文稿內文至減少頁數時, 暫存檔記錄的附件及附件頁面的文件夾識別碼都是跳過號的, 但開啟時重新載入都會變成連續的新ID, 導致用SignWork.xml的文件夾識別碼會對不到附件正確的頁次
						//var aid = $so.closest("附件").attr("文件夾識別碼");
						var aid = $so.closest("附件").attr("GUID");
						if(!!aid) {
							for(var i=0; i<d.attachs.length; i++) {
								// 1091006 Raymond 1090736 以比對附件GUID取代比對附件的文件夾識別碼, 因儲存時若有先匯出附件頁面再刪減文稿內文至減少頁數時, 暫存檔記錄的附件及附件頁面的文件夾識別碼都是跳過號的, 但開啟時重新載入都會變成連續的新ID, 導致用SignWork.xml的文件夾識別碼會對不到附件正確的頁次
								//if(d.attachs[i].id == aid) {
								if(d.attachs[i].guid == aid) {
									if(Number(pgIdx) < d.attachs[i].draftPages.pages.length)
										pg = d.attachs[i].draftPages.pages[Number(pgIdx)];
									else
										theLogger.error("簽核物件#" + $so.attr("id") + "的頁次(" + pgIdx + ")超出附件頁面數(" + d.attachs[i].draftPages.pages.length + ")");
									break;
								}
							}
							if(i == d.attachs.length)
								theLogger.error("簽核物件#" + $so.attr("id") + "所屬附件(ID:" + aid + ")在文稿(ID:" + id + ")找不到");
						}
						// 1100531 Raymond 1100681 修正異動內文未異動附件同時在附件頁面上加簽核物件時, 儲存後再開啟會發生找不到附件GUID而無法顯示之前在附件頁面上新增的簽核物件的問題
						else {
							aid = $so.closest("附件").attr("文件夾識別碼");
							if(!!aid) {
								for(var i=0; i<d.attachs.length; i++) {
									if(d.attachs[i].id == aid) {
										if(Number(pgIdx) < d.attachs[i].draftPages.pages.length)
											pg = d.attachs[i].draftPages.pages[Number(pgIdx)];
										else
											theLogger.error("簽核物件#" + $so.attr("id") + "的頁次(" + pgIdx + ")超出附件頁面數(" + d.attachs[i].draftPages.pages.length + ")");
										break;
									}
								}
								if(i == d.attachs.length)
									theLogger.error("簽核物件#" + $so.attr("id") + "所屬附件(ID:" + aid + ")在文稿(ID:" + id + ")找不到");
							}
							else
								theLogger.error("簽核物件#" + $so.attr("id") + "所屬附件無'文件識別碼'屬性, 無法搜尋對應的頁面");
						}
					}
					else if(Number(pgIdx) < d.draftPages.pages.length)	// 2017.3.14 修正若簽核物件在已新增頁次或第1頁會沒抓pg的問題
						pg = d.draftPages.pages[Number(pgIdx)];
					else {
						while(Number(pgIdx) >= d.draftPages.pages.length) {
							theLogger.warn("暫存檔記錄的簽核物件(pageIndex:" + pgIdx + ")屬於不存在封裝檔的頁面(ID:" + parentId + "), 應新增次頁");
							pg = signFolder.newDraftPage(d);
						}
					}
				}
				else {
					try {	// 2015.10.2 新增次頁後, 再從暫存原始封裝檔資料載入時須重新新增次頁
						pg = signFolder.findPageById(parentId);
					}
					catch(e) {
						// 1060531 Raymond 修正不允許編輯內文的流程點, 因不同瀏覽器導致封裝檔與此流程排版頁數不一致時, 暫存後再開啟,
						// 因找不到封裝檔內的Page ID(此流程第一次開啟), 而無法找到對應頁面的問題
						if($so.closest("文稿").length > 0) {
							var id = $so.closest("文稿").attr("id");
							theLogger.warn("簽核物件(ID:" + so.id + ")找不到對應的頁面(ID:" + parentId + "), 但有異動文稿(update-id:" + id + ")");
							if(!!id) {
							var $d = $(doc.documentElement).find("文稿[update-id='" + id + "']");
							var did = $d.attr("文件夾識別碼").replace(/X$/, "");	// 2017.1.23 有X要去掉, 還原成與封裝檔一致的ID
							var d = signFolder.getDraftById(did);
							// 1060825 Raymond 1060661 若簽核物件在附件頁面上要搜尋對應的pg物件來加入
							if($so.closest("附件").length > 0) {
								// 1091006 Raymond 1090736 以比對附件GUID取代比對附件的文件夾識別碼, 因儲存時若有先匯出附件頁面再刪減文稿內文至減少頁數時, 暫存檔記錄的附件及附件頁面的文件夾識別碼都是跳過號的, 但開啟時重新載入都會變成連續的新ID, 導致用SignWork.xml的文件夾識別碼會對不到附件正確的頁次
								//var aid = $so.closest("附件").attr("文件夾識別碼");
								var aid = $so.closest("附件").attr("GUID");
								if(!!aid) {
									for(var i=0; i<d.attachs.length; i++) {
										// 1091006 Raymond 1090736 以比對附件GUID取代比對附件的文件夾識別碼, 因儲存時若有先匯出附件頁面再刪減文稿內文至減少頁數時, 暫存檔記錄的附件及附件頁面的文件夾識別碼都是跳過號的, 但開啟時重新載入都會變成連續的新ID, 導致用SignWork.xml的文件夾識別碼會對不到附件正確的頁次
										//if(d.attachs[i].id == aid) {
										if(d.attachs[i].guid == aid) {
											if(Number(pgIdx) < d.attachs[i].draftPages.pages.length)
												pg = d.attachs[i].draftPages.pages[Number(pgIdx)];
											else
												theLogger.error("簽核物件#" + $so.attr("id") + "的頁次(" + pgIdx + ")超出附件頁面數(" + d.attachs[i].draftPages.pages.length + ")");
											break;
										}
									}
									if(i == d.attachs.length)
										theLogger.error("簽核物件#" + $so.attr("id") + "所屬附件(ID:" + aid + ")在文稿(ID:" + id + ")找不到");
								}
								else
									theLogger.error("簽核物件#" + $so.attr("id") + "所屬附件無'文件識別碼'屬性, 無法搜尋對應的頁面");
							}
							else if(Number(pgIdx) < d.draftPages.pages.length)	// 2017.3.14 修正若簽核物件在已新增頁次或第1頁會沒抓pg的問題
								pg = d.draftPages.pages[Number(pgIdx)];
							else {
								while(Number(pgIdx) >= d.draftPages.pages.length) {
									theLogger.warn("暫存檔記錄的簽核物件(pageIndex:" + pgIdx + ")屬於不存在封裝檔的頁面(ID:" + parentId + "), 應新增次頁");
									pg = signFolder.newDraftPage(d);
								}
							}
							}
						}
						else {
							var did = $so.attr("draft-id");	// 1060531 暫存檔新增文稿ID屬性
							if(!!did) {
								theLogger.warn("簽核物件(ID:" + so.id + ")找不到對應的頁面(ID:" + parentId + "), 且無異動文稿, 改取原始文稿(ID:" + did + ")");
								did = did.replace(/X$/, "");	// 有X要去掉, 還原成與封裝檔一致的ID
								var d = signFolder.getDraftById(did);
								if(!!d) {
									so.pgIdx = pgIdx;
									if(!("missingSOs" in d))
										d.missingSOs = new Array();
									d.missingSOs.push(so);
								}
								else
									theLogger.error("文稿(ID:" + did + ")無對應封裝檔物件, 無法暫時記錄遺失頁面的簽核物件");
								/*if(Number(pgIdx) < d.draftPages.pages.length)	// 修正若簽核物件在已新增頁次或第1頁會沒抓pg的問題
									pg = d.draftPages.pages[Number(pgIdx)];
								else {
									while(Number(pgIdx) >= d.draftPages.pages.length) {
										theLogger.warn("暫存檔記錄的簽核物件(pageIndex:" + pgIdx + ")屬於不存在封裝檔的頁面(ID:" + parentId + "), 應新增次頁");
										pg = signFolder.newDraftPage(d);
									}
								}*/
							}
							else {
								theLogger.error("簽核物件(ID:" + so.id + ")找不到對應的頁面(ID:" + parentId + "), 且無異動文稿, 無法取得對應頁面物件");
							}
						}
					}
				}
				if(!!pg) {
					if(!("newSignObjs" in pg))
						pg.newSignObjs = new Array();
					so.boundTo = pg;
					so.bounded = true;
					// 1131115 Raymond 北榮序378 判斷此SignWork.xml是否為別的流程點所寫入, 若是的話就不載入此簽核物件
					if(!otherMsgId) {
					
					pg.newSignObjs.push(so);
					
					if("guid" in pg.container && !("attType" in pg.container))	// 2017.1.24 fix for 來文沒有GUID及附件頁面不需要同步外部簽核物件
						signFolder.xSignFolder().getDraft(pg.container.guid).restoreSignObj(so);	// 2017.1.18 同步至外部簽核物件記錄檔
					
					}// end of 1131115 Raymond 北榮序378 判斷此SignWork.xml是否為別的流程點所寫入, 若是的話就不載入此簽核物件
					
					if(!("pageExt" in pg.container)) {
						var $draftPages = $so.closest("文稿頁面檔");
						if($draftPages.length > 0) {
							pg.container.pageExt = {
								width: $draftPages.attr("page-width"),
								height: $draftPages.attr("page-height")};
						}
						else {
							//var did = pg.container.id;	// 2017.1.23 修改為固定值
							//var $d = $(doc.documentElement).find("文稿[文件夾識別碼='" + did + "']");
							//$draftPages = $d.find("文稿頁面檔");
							pg.container.pageExt = {
								width: 794,//$draftPages.attr("page-width"),
								height: 1123};//$draftPages.attr("page-height")};
						}
					}
				}
				else
					theLogger.warn("找不到簽核物件記錄的頁面(id:" + parentId + ")");
			});
			
			$upd.find("> 文稿").each(function(idx, nd) {
				var id = $(nd).attr("id");
				var $d = $(doc.documentElement).find("文稿[update-id='" + id + "']");
				var did = $d.attr("文件夾識別碼").replace(/X$/, "");	// 2017.1.23 有X要去掉, 還原成與封裝檔一致的ID
				try {
					var draft = signFolder.findDraftById(did);
					draft.dirty(true);	// 位於Updates節點下表示前一次存檔時已異動過內文
					
					// 2017.3.7 新增讀取上次儲存的簽核區域, 並記錄在封裝檔draft物件而不是DM
					if(!("signAreas" in draft))
						draft.signAreas = [];
					$(nd).find("簽核區域").each(function(idx3, s) {
						var sa = {
							po: $(s).attr("po"),
							saType: $(s).attr("type"),
							id: $(s).attr("id"),
							left: $(s).attr("left"),
							top: $(s).attr("top"),
							width: $(s).attr("width"),
							height: $(s).attr("height")};
						draft.signAreas.push(sa);
					});
					
					// 2016.12.13 新增讀取上次儲存的附件產生時間
					//draft.attachs = [];	// 重置附件清單
					$(nd).find("附件清單 > 附件").each(function(idx2, a) {
						var att = {
							guid: $(a).attr("GUID"),
							time: $(a).attr("產生時間"),
							sn: $(a).attr("序號"),
							id: $(a).attr("文件夾識別碼"),
							obj: $(a).attr("物件識別碼"),
							fmt: $(a).attr("格式")};
						
						// 2016.12.29 補上前次已匯出附件頁面資訊
						if($(a).find("> 名稱").length)				// 1090910 Raymond 1090564 修正附件頁面下有文字意見時, 附件名稱後面會多出文字意見的"字型名稱"問題
							att.name = $(a).find("> 名稱").text();	// 1090910 Raymond 1090564 修正附件頁面下有文字意見時, 附件名稱後面會多出文字意見的"字型名稱"問題
						if($(a).find("附件類型").length)
							att.attType = $(a).find("附件類型").text();
						if($(a).find("文稿頁面檔格式附件").length && $(a).find("文稿頁面檔格式附件 文稿頁面檔").length) {
							var $pgs = $(a).find("文稿頁面檔格式附件 文稿頁面檔");
							att.draftPages = {
								time: $pgs.attr("產生時間"),
								method: $pgs.attr("記錄方式"),
								dirty: false
							};
							if($pgs.find("文稿頁面清單").length) {
								att.draftPages.pages = [];
								$pgs.find("文稿頁面清單 頁面").each(function(idx3, p) {
									var pg = {
										fileRef: {name: $(p).attr("原始檔名")},
										id: $(p).attr("文件夾識別碼"),
										time: $(p).attr("產生時間"),
										flowId: $(p).attr("產生點資訊")};
									att.draftPages.pages.push(pg);
									att.draftPages.dirty = true;	// 表示有匯出頁面
								});
							}
						}
						
						// 1061116 Raymond 1061118 保留附件節點
						att.cachedDOM = a.cloneNode(true);
						
						//draft.attachs.push(att);
						that.atts.push(att);
					});
				}
				catch(e) {
					theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
				}
			});
		}
		signFolder.xSignFolder().clearUnreferencedSignObjs();	// 2017.1.18 清除外部簽核物件記錄檔中未關聯封裝檔或暫存檔的簽核物件
		
		// 1100707 Raymond 1100648 新增支援分文稿記錄簽核意見功能
		if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") == "Y") {
			$signCmt.each(function(idx, nd) {
				signFolder.restoreSignComment(nd.getAttribute("URI"), (nd.text || nd.textContent));	// 呼叫專用function恢復不同文稿的簽核意見
			});
		}

	    //1070817 Zen 1070678 弱掃XSS修正
		function HtmlEncode(s)
		{
		    var div = document.createElement('div');
		    div.appendChild(document.createTextNode(s));
		    return div.innerHTML;
		}
	}
}

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-SignWork.js").finish();
})();