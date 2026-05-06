// 轉紙本簽核功能模組
//	掛在nsEditor命名空間下
//	2016.11.2 從RD-ImportFile.js搬過來
//
// DATE		SA			PRG			MGR_NO		DESC
// 1060512	Eric 		Eric    	1060246		彙併辦公文轉紙本簽核檢核並提示使用者後續作業選項
// 1061018	Raymond		Raymond		1060930		修正時戳顯示年時年超出職名章高度問題
// 1061221	Raymond		Raymond		1061309		修改來文影像是第1頁時Chrome預覽列印顯示空白的問題(改用Leslie解決IE的IMG列印問題方案)
// 1070212	Raymond		Raymond		NCKU107216	修正文字意見的預設行高與簽核頁面不一致, 導致蓋到其它簽核物件的問題
// 1070815	Raymond		Raymond		1070832		修正來文、附件頁面影像在RD-AOLPrint.js載入後不會觸發load事件而導致轉圈圈不會結束的問題
// 1071207	Raymond		Raymond		1071108		將詢問轉紙本原因提前至列印前執行, 若是草稿且轉紙本原因與環境變數設定一致則重設所有文稿的密等為'密',解密條件為'(其它)', 並同步至基資
// 1080119	Raymond		Raymond		1070619		修正IE及MacOSX Safari列印時297mm滿版高度會多出一頁空白頁的問題
// 1080923  Kevin   	Eric		1080339     jQuery 3.0 upgrade
// 1081209	Raymond		Raymond		1080785		合併內政部客製化需求單號1070656, 新增"自訂"簽核區域類型
// 1081218	Raymond		Raymond		-------		修正文字意見的XSS漏洞, 並轉換非圖示化文字意見的<br>為折行字元, 以符合未修正漏洞前的顯示行為
// 1090826	Raymond		Raymond		1090620		修正來文及附件頁面影像比照列印簽核文件功能不要套用IE列印邊界反推, 補顯示來文或附件頁面上的簽核物件及本文頁面上的簽核物件要套用IE列印邊界反推
// 1090916	Raymond		Raymond		1090546		信保基金特殊模式公文不提供轉紙本功能
// 1100315	Raymond		Raymond		1090991		合併1060735, 有原始套用的樣版檔名則預設為該樣版, 否則依原來第1筆符合文別、函類別的邏輯搜尋適用的排版設定檔來套用列印成紙本
// 1100317	Raymond		Raymond		1100016		信保特殊模式(ODWDCM.DRAFT_SOURCE_TYPE=2)公文提供轉紙本功能
// 1100512	Raymond		Raymond		1090821		新增判斷若是具有單層式文稿頁面的封裝檔, 則忽略顯示外機關流程點的簽核物件(因為也沒有簽核物件)
// 1100715	Raymond		Raymond		1100649		列印簽核物件資訊頁功能新增簽核意見, 及新增僅顯示會辦單位長官意見選項[高大客製化選項]
// 1100715	Raymond		Raymond		1100854		簽核物件資訊頁的簽核物件支援[高大客製化]需求顯示年月日時分秒
// 1100716	Raymond		Raymond		-------		修正列印簽核物件資訊頁的上邊界消失問題
// 1100728	Raymond		Raymond		1100928		新增搜尋被取代掉的文字意見ID陣列, 以支援「修改」他流程之文字意見功能的列印
// 1101029	Raymond		Raymond		1101199		修正Chrome V94、95版列印預覽時有些標楷體字型會破字的問題, 依環境變數「AOL_PRINT_USE_CNSFONT」決定產生轉紙本的列印內容時是否額外新增指定"全字庫正楷體"字型
// 1101110	Raymond		Raymond		1101199		新增依環境變數設定啟用文字意見及簽核物件資訊頁、分繕變數表的標楷體加套"全字庫正楷體"字型功能
// 1101110	Raymond		Raymond		-------		修正草稿公文列印簽核物件資訊頁時, 本流程點才新增的簽核物件會重複出現, 及文稿上的簽核物件的序號會跳號的問題
// 1110207	Raymond		Raymond		1110013		新增列印簽核物件資訊頁時, 在核決流程點的簽核意見姓名後註記「[決行]」
// 1110401	Raymond		Raymond		1110383		轉紙本列印新增雙面列印功能
// 1110627	Raymond		Raymond		1110271		新增航港局邏輯, 若啟用稿間加蓋騎縫章功能且雙面列印時, 奇數頁文稿跟簽核物件資訊頁間補上空白頁, 附件也要加蓋騎縫章
// 1110812	Raymond		Raymond		1110749		新增判斷若機關是信保基金, 則產生的列印分頁不要顯示右上角的「文號：」資訊
// 1111228	Raymond		Raymond		1111405		修正列印選用章戳(圖檔)時未去背的問題
// 1120106	Raymond		Raymond		1111361		修改成以一個背景的IFrame內嵌列印分頁的方式執行列印
// 1120210	Raymond		Raymond		1111035		由於貼式文字意見改為未依邊框寬度自動折行的原始輸入文字, 所以列印貼式文字意見的簽核物件資訊頁也要改成會折行, 以免一行太長超出表格範圍的問題
// 1120608	Raymond		Raymond		1120515		新增判斷環境變數「WE_ALLOW_USE_SEALMARK_ROLES」是否有設定, 若有設定則判斷目前公文的OwnRoleID是否符合設定之一, 若不符合則禁止套用騎縫章, 未設定此環境變數時簽核頁面一律套用騎縫章
// 1120620	Raymond		Raymond		標檢局序86	修正職名章高度設定小於7.7mm時, 時戳字型大小計算會得出小於9pt的大小, 但瀏覽器最小只能顯示9pt的字, 將導致時戳文字高於職名章的問題, 故再計算縮小行高來調整時戳文字的高度
// 1121004	Raymond		Raymond		1120776		取消第1個詢問確認訊息, 改在詢問轉紙本簽核原因的確認子視窗中顯示確認訊息, 第2個確認子視窗則修正標題文字
// 1130220	Raymond		Raymond		1120887		分會流程點可能不保留前一版本的簽核物件, 需再從搜尋前一個分會流程點的保留簽核物件, 以避免其它分會單位的簽核物件不會顯示的問題
// 1130605	Raymond		Raymond		1130120		修正文稿頁面上的簽核框外物件也可套用外部簽核記錄檔所記錄的座標, 以避免一些較早期線上簽核公文寫了錯誤(超大)座標資訊到封裝檔的簽核物件無法藉由XSignObjs.xml修復, 造成預覽列印時產生超多(數千)空白頁的問題
// 1130722	Raymond		Raymond		1130400		修正先列印過一次公文(包括線上轉紙本、參照窗格公文的列印), 再傳送時輸入PIN CODE畫面左半邊會出現前次列印時的文稿內容及簽核物件的問題
// 1130826	Raymond		Raymond		中榮序214	修正自動增高簽核區域高度或異動內文後, 加蓋貼布物件於前流程點的簽核物件後傳送, 被蓋住的簽核物件仍會顯示的問題
// 1140311	Raymond		Raymond		1140413		修正列印簽核物件資訊頁的簽核意見若內容過多高度超過剩餘單頁高度, 則分頁顯示
// 1140410	Raymond		Raymond		1140481		修正使用雙面列印時, 偶數頁的裝訂線應顯示在右邊界, 左右騎縫章內縮距離也要對調
// 1140422	Raymond		Leslie		1131223		[退輔會]增修騎縫章顯示邏輯，一律僅於列印時顯示

var nsEditor = nsEditor||{};

// 2016.10.6 轉紙本功能
nsEditor.onChangePprVisible = function(fm) {
	// 1100317 Raymond 1100016 信保特殊模式公文提供轉紙本功能
	// 1090916 Raymond 1090564 信保特殊模式公文不提供此功能
	//if(fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
	//	return false;
	if(fm.getSignType() == "E" && fm.enableChangePpr())
		return true;
	return false;
}

nsEditor.onChangePpr = function(event, fm) {
	var $viewPort = event.data;
	
	var isIE = navigator.userAgent.indexOf("Trident") > 0;	// 2016.12.1 新增IE旗標
	// 2016.12.1 新增使用IE列印時邊界反推
	var pm = 0;
	if(isIE && "printMarginForIE" in SSO_CONFIG && SSO_CONFIG.printMarginForIE > 0) {
		pm = 0 - SSO_CONFIG.printMarginForIE;
	}
	
	var bBothSide = false;	// 1110401 Raymond 1110383 轉紙本列印新增雙面列印功能, 預設不勾選
	
	// 1120608 Raymond 1120515 新增判斷環境變數是否有設定, 若有設定則判斷OwnRoleID是否符合設定之一, 若不符合則不允許套用騎縫章, 未設定環境變數時允許套用騎縫章
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
	
	function _prepopulate(fm, q) {
		var dfd = $.Deferred();	// 開啟時就要下載每個文稿, 因為使用者不會每筆文稿都點開檢查選項跟套用格式就列印了
		var n = fm.getDraftCounts();
		function doNext(i) {
			if(i < n) {
				// 1100317 Raymond 1100016 新增信保特殊模式公文轉紙本列印
				if(fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2") {
					var idx = i;
					q.push({type: "smegdraft", draftIdx: idx, enable: true});
					
					var m = fm.getDraftAttCounts(idx);
					for(var k=0; k<m; k++) {
						var l = fm.getAttPageCounts(idx, k);
						if(l > 0) {
							q.push({type: "attach", draftIdx: idx, attIdx: k, enable: true});
						}
						else {
							theLogger.warn("附件無頁面!");
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
							var keepSecret = dm.accquireXml().documentElement.getAttribute("行文單位保密") == "True";
							var keepSecret2 = dm.accquireXml().documentElement.getAttribute("副本行文單位保密") == "True";
							var keepSecret3 = dm.accquireXml().documentElement.getAttribute("主持人行文單位保密") == "True";
							var found = false;
							// 1100315 Raymond 1090991 合併1060735, 取得原始套用的樣版檔名
							var origPrintXSL = dm.getOrigPrintXSL();
							if(typeof origPrintXSL === "string" && origPrintXSL.length > 0) {
								var fn = origPrintXSL.substr(origPrintXSL.lastIndexOf('\\') + 1);
							}
							thePublicRsrc.enumDirs("排版設定", function(dir) {
								for(var j=0; j<dir.children.length; j++) {
									var nm = dir.children[j].name;
									// 1100315 Raymond 1090991 合併1060735, 有原始套用的樣版檔名則預設為該樣版, 否則依原來第1筆符合文別、函類別的邏輯
									//if(dir.children[j].docType == docType && (subDocType.length == 0 || dir.children[j].subDocType == subDocType || dir.children[j].subDocType == "")) {	// 2016.11.10 若RsrcMgmt.xml的函類別為空值, 也算符合可套用格式條件
									if((!!fn && fn == dir.children[j].remote.path) ||
										(!fn && dir.children[j].docType == docType && (subDocType.length == 0 || dir.children[j].subDocType == subDocType || dir.children[j].subDocType == ""))) {	// 2016.11.10 若RsrcMgmt.xml的函類別為空值, 也算符合可套用格式條件
										// 預設套用第1筆符合的PrintXSL
										var data = {type: "draft",
													draftIdx: idx,
													enable: true,							// 勾選
													rsrcFile: dir.children[j],				// 套用樣版檔
													printXslName: dir.children[j].name,		// 套用樣版檔名
													printFont: "",							// 預設字型
													printLineHeight: "",					// 預設行高
													applyCustom: false,						// 套用自訂
													applyTCMode: 3,							// 檢視模式
													printRange: "-1",						// 列印範圍
													printMailMerge: false,					// 列印用途
													printSingleReceiver: true,				// 單選/複選受文者
													specifySingleReceiver: "all",			// 單選受文者
													specifyMultiReceiver: [],				// 複選受文者
													keepSecret: keepSecret,					// 正本行文單位保密
													keepSecret2: keepSecret2,				// 副本行文單位保密
													//printSealMark: true,					// 列印騎縫章
													printSealMark: (allowUseSealMark == false)?false:true,	// 列印騎縫章, 1120608 Raymond 1120515 若禁用騎縫章則預設成false
													printSealMarkAtSamePos: false,			// 列印騎縫章在相同位置
													printBarcode: true, 					// 列印條碼
													printPageNo: true,						// 列印頁碼
													printDraftFileName: false,				// 列印本文檔名
													dispatchConUnits: false					// 會辦單位分繕列印
													};
										q.push(data);
										
										var m = fm.getDraftAttCounts(idx);
										for(var k=0; k<m; k++) {
											var l = fm.getAttPageCounts(idx, k);
											if(l > 0) {
												q.push({
														type: "attach",
														draftIdx: idx,
														attIdx: k,
														enable: true,
														//printSealMark: true,					// 列印騎縫章
														printSealMark: (allowUseSealMark == false)?false:true,	// 列印騎縫章, 1120608 Raymond 1120515 若禁用騎縫章則預設成false
														printSealMarkAtSamePos: false,			// 列印騎縫章在相同位置
														printBarcode: true, 					// 列印條碼
														printPageNo: true						// 列印頁碼
														});
											}
											else {
												theLogger.warn("附件無頁面");
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
								//q.push(data);
								
								var m = fm.getDraftAttCounts(idx);
								for(var k=0; k<m; k++) {
									var l = fm.getAttPageCounts(idx, k);
									if(l > 0) {
										q.push({
												type: "attach",
												draftIdx: idx,
												attIdx: k,
												enable: true,
												//printSealMark: true,					// 列印騎縫章, 2016.9.26 改成預設true
												printSealMark: (allowUseSealMark == false)?false:true,	// 列印騎縫章, 1120608 Raymond 1120515 若禁用騎縫章則預設成false
												printSealMarkAtSamePos: false,			// 列印騎縫章在相同位置
												printBarcode: true, 					// 列印條碼, 2016.9.26 改成預設true
												printPageNo: true						// 列印頁碼, 2016.9.26 改成預設true
												});
									}
									else {
										theLogger.warn("附件無頁面");
									}
								}
							}
						}
						else {	// 來文
							q.push({type: "fromdoc", draftIdx: idx, enable: true});
							
							var m = fm.getDraftAttCounts(idx);
							for(var k=0; k<m; k++) {
								var l = fm.getAttPageCounts(idx, k);
								if(l > 0) {
									q.push({type: "attach", draftIdx: idx, attIdx: k, enable: true});
								}
								else {
									theLogger.warn("附件無頁面!");
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
	var noStyles = "position:absolute;left:-0.5em;top:-0.5em;border:1px solid gray;background-color:rgba(245,222,179,0.8)";
	// 1101110 Raymond 1101199 新增依環境變數設定啟用文稿、文字意見及簽核物件資訊頁的標楷體加套"全字庫正楷體"字型功能
	var useCNSFont = false;
	var dtb = navigator.userAgent.match(/Chrome\/(\d+)/);
	if(!!dtb && dtb[1] >= 94) {	// 判斷是Chrome且94版以上
		var printUseCNSFont = theSSO.User.EnvSettings.get("AOL_PRINT_USE_CNSFONT");	// Y為啟用, N或未設定為不啟用, 環境變數允許設定兩個字, 第一個字代表列印線上簽核文稿的「文」格式的發文用、簽核及繕校用及紙本簽核文稿的「文」或「稿」格式時是否啟用此功能, 第二個字代表列印線上簽核文稿的「稿」格式時是否啟用此功能, 分開設定是怕萬一線上簽核文稿的「稿」格式套用了"全字庫正楷體", 由於字寬等與"標楷體"不一致時, 可能發生列印結果頁面與簽核頁面不一致, 而導致簽核物件位置不正確的問題
		if(printUseCNSFont.length > 1)												// 線上簽核公文的「稿」格式, 若環境變數有設定第二個字
			useCNSFont = printUseCNSFont[1] == 'Y';									// 以環境變數設定的第二個字控制是否啟用套用"全字庫正楷體"字型功能
	}
	// 2017.2.8 建立章戳類型簽核物件
	function _createStampSO(so, $parent, offsetLP, dfd, no) {
		var areaLP = DPtoLP(so.content.area, "mm");
		var w = areaLP.right - areaLP.left,
			h = areaLP.bottom - areaLP.top;
		// 1090826 Raymond 1090620 修正來文或附件頁面上的簽核物件無no, 不顯示編號
		//var $img = $("<div class='sign-obj so-stamp' data-id='" + so.id + "'><span style='" + noStyles + "'>" + no + "</span><img/></div>").appendTo($parent).css({
		var spanNo = (!!no)?"<span style='" + noStyles + "'>" + no + "</span>":"";
		var $img = $("<div class='sign-obj so-stamp' data-id='" + so.id + "'>" + spanNo + "<img/></div>").appendTo($parent).css({
				position: "absolute",
				left: offsetLP.x + "mm",
				top: offsetLP.y + "mm"})
			.find("img").css({
				width: w + "mm",
				height: h + "mm"});
		// 1090826 Raymond 1090620 修正本文頁面上的簽核物件套用IE列印時邊界反推
		if(isIE && !$parent.find("> img").hasClass("attachment"))
			$img.parent().css({left: (offsetLP.x + pm) + "mm", top: (offsetLP.y + pm) + "mm"});
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
		// 1090826 Raymond 1090620 修正來文或附件頁面上的簽核物件無no, 不顯示編號
		//var $img = $("<div class='sign-obj so-img' data-id='" + so.id + "'><span style='" + noStyles + "'>" + no + "</span>" +
		var spanNo = (!!no)?"<span style='" + noStyles + "'>" + no + "</span>":"";
		var $img = $("<div class='sign-obj so-img' data-id='" + so.id + "'>" + spanNo +
			"<img src='image/AOL/sketch_comment.bmp' style='display:" + ((so.asIcon)?"inline":"none") + "'></img>" +
			"<img style='display:" + ((so.asIcon)?"none":"inline") + ";vertical-align:top'></img></div>").appendTo($parent).css({	// 2017.2.15 加上vertical-align以免數位墨水物件徧下
				position: "absolute",
				left: (offsetLP.x - (so.asIcon?4:0)) + "mm",
				top: (offsetLP.y - (so.asIcon?4:0)) + "mm"});
		// 1090826 Raymond 1090620 修正本文頁面上的簽核物件套用IE列印時邊界反推
		if(isIE && !$parent.find("> img").hasClass("attachment"))
			$img.css({left: (offsetLP.x - (so.asIcon?4:0) + pm) + "mm", top: (offsetLP.y - (so.asIcon?4:0) + pm) + "mm"});
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
					$img.find("img").get(1).src = canvas.toDataURL("image/png");
					dfd.resolve();	// 非同步完成圖檔下載及背景透明化顯示
				}
				img.src = dataUrl;	// 用img.onload去背
			}
			else {
				$img.find("img").get(1).src = dataUrl;
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
		// 1090826 Raymond 1090620 修正來文或附件頁面上的簽核物件無no, 不顯示編號
		// 2016.10.3 新增title資訊
		//var $tx = $("<div class='sign-obj so-text' data-id='" + so.id + "'><span style='" + noStyles + "'>" + no + "</span>" +
		var spanNo = (!!no)?"<span style='" + noStyles + "'>" + no + "</span>":"";
		var $tx = $("<div class='sign-obj so-text' data-id='" + so.id + "'>" + spanNo +
			"<img src='image/AOL/txt_comment.bmp' style='display:" + ((so.asIcon)?"inline":"none")+ "'>" +
			"<div style='display:" + ((so.asIcon)?"none":"block") +
				";writing-mode:" + ((so.content.orient == "直書")?"tb-rl":"lr-tb") +
				// 1101110 Raymond 1101199 新增依環境變數設定啟用文字意見的標楷體加套"全字庫正楷體"字型功能
				//";font-family:" + so.content.font.name +
				";font-family:" + ((so.content.font.name == "標楷體" && useCNSFont)?"全字庫正楷體,":"") + so.content.font.name +
				";font-size:" + (so.content.font.size+"pt") +
				";line-height:1" +	// 1070212 Raymond NCKU107216 修正預設行高與簽核頁面不一致問題
				// 1081217 Raymond FIX XSS & 保留折行
				//";color: rgb(" + so.content.font.color.r + "," + so.content.font.color.g + "," + so.content.font.color.b + ")'>" +
				//so.content.text.replace(/\n/g, '<br>') + "</div></div>").appendTo($parent).css({
				";color: rgb(" + so.content.font.color.r + "," + so.content.font.color.g + "," + so.content.font.color.b + ")" +
				";white-space:pre'>" + "</div></div>").appendTo($parent).css({
					position: "absolute",
					left: (offsetLP.x - (so.asIcon?4:0)) + "mm",
					top: (offsetLP.y - (so.asIcon?4:0)) + "mm"});
		// 1090826 Raymond 1090620 修正本文頁面上的簽核物件套用IE列印時邊界反推
		if(isIE && !$parent.find("> img").hasClass("attachment"))
			$tx.css({left: (offsetLP.x - (so.asIcon?4:0) + pm) + "mm", top: (offsetLP.y - (so.asIcon?4:0) + pm) + "mm"});
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
		else if(t == "自訂")	// 1081209 Raymond 1080785 合併內政部客製化需求單號1070656, 新增"自訂"簽核區域類型
			res = "4";
		return res;
	}

	function _buildSO(fm, idx, so, pg, $pg) {
		theLogger.log("封裝檔已存在的簽核物件 - #" + (idx+1));
		theLogger.log(so);
		var dfd = $.Deferred();
		if(so.type == "章戳") {
				theLogger.log("章戳位置:(" + so.content.area.left + "," + so.content.area.top + "," + so.content.area.right + "," + so.content.area.bottom + ")");	// 2016.12.20 fix for 還沒顯示過的頁面不會有pageExt的問題
			
			var areaLP = DPtoLP(so.content.area, "mm");   // 先將座標值轉成邏輯座標
			var w = areaLP.right - areaLP.left,
				h = areaLP.bottom - areaLP.top;
			var $img = $("<div class='sign-obj so-stamp' data-id='" + so.id + "'><img/></div>").appendTo($pg).css({
							position: "absolute",
							left: areaLP.left + "mm",
							top: areaLP.top + "mm"})
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
				.css({position: "absolute", left: (areaLP.left - (so.asIcon?4:0)) + "mm", top: (areaLP.top - (so.asIcon?4:0)) + "mm"});
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
			";font-family:" + ((so.content.font.name == "標楷體" && useCNSFont)?"全字庫正楷體,":"") + so.content.font.name +
			";font-size:" + (so.content.font.size+"pt") +
			";line-height:1" +	// 1070212 Raymond NCKU107216 修正預設行高與簽核頁面不一致問題
			// 1081217 Raymond FIX XSS & 保留折行
			//";color: rgb(" + so.content.font.color.r + "," + so.content.font.color.g + "," + so.content.font.color.b + ")'>" + so.content.text.replace(/\n/g, '<br>') + "</div></div>")
			";color: rgb(" + so.content.font.color.r + "," + so.content.font.color.g + "," + so.content.font.color.b + ")" +
			";white-space:pre'>" + "</div></div>")
				.appendTo($pg)
				.css({position: "absolute", left: (posLP.x - (so.asIcon?4:0)) + "mm", top: (posLP.y - (so.asIcon?4:0)) + "mm"});
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

	function _buildSOX(fm, idx, so, pg, $pg, no) {
		theLogger.log("暫存檔的簽核物件 - " + (idx+1));
		theLogger.log(so);
		var dfd = $.Deferred();
		if("type" in so) {
			if(so.type.match(/^stamp/)) {	// 章戳有圖檔章戳(stamp)、文字章戳(stamp.text)、職名章(stamp.signet)三種
				// 1100317 Raymond 1100016 修正來文/信保特殊模式或附件頁面上的簽核物件無no, 不顯示編號
				//var $so = $("<div class='sign-obj so-stamp' data-id='" + so.id + "' title='" + so.info + "'><span style='" + noStyles + "'>" + no + "</span><img style='width:1.04in;'/></div>")
				var spanNo = (!!no)?"<span style='" + noStyles + "'>" + no + "</span>":"";
				var $so = $("<div class='sign-obj so-stamp' data-id='" + so.id + "' title='" + so.info + "'>" + spanNo + "<img style='width:1.04in;'/></div>")
					.appendTo($pg)
					.css({position: "absolute", left: so.pos.left, top: so.pos.top});
				// 1090826 Raymond 1090620 修正本文頁面上的簽核物件套用IE列印時邊界反推
				if(isIE && !$pg.find("> img").hasClass("attachment"))
					$so.css({left: so.pos.left + (3.78 * pm), top: so.pos.top + (3.78 * pm)});
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
			else if(so.type == "sketch") {
				// 1100317 Raymond 1100016 修正來文/信保特殊模式或附件頁面上的簽核物件無no, 不顯示編號
				//var $so = $("<div class='sign-obj so-img' data-id='" + so.id + "' title='" + so.info + "'><span style='" + noStyles + "'>" + no + "</span>
				var spanNo = (!!no)?"<span style='" + noStyles + "'>" + no + "</span>":"";
				var $so = $("<div class='sign-obj so-img' data-id='" + so.id + "' title='" + so.info + "'>" + spanNo + "\
	<img src='image/AOL/sketch_comment.bmp' style='display:" + ((so.asIcon)?"inline":"none") + "'></img>\
	<img style='display:" + ((so.asIcon)?"none":"inline") + ";vertical-align:top'></img></div>")	// 2017.2.15 加上vertical-align以免數位墨水物件徧下
					.appendTo($pg)
					.css({position: "absolute", left: so.pos.left, top: so.pos.top});
				// 1090826 Raymond 1090620 修正本文頁面上的簽核物件套用IE列印時邊界反推
				if(isIE && !$pg.find("> img").hasClass("attachment"))
					$so.css({left: so.pos.left + (3.78 * pm) - ((so.asIcon)?18:0), top: so.pos.top + (3.78 * pm) - ((so.asIcon)?18:0)});
				// 1090826 Raymond 1090620 修正當流程點加蓋圖檔章戳後, 會異常放大的問題, 及數位墨水影像寬高比照signObj的圖檔, 設定在img
				if("size" in so)
					$so.find("img").eq(1).css(so.size);
				// 1111228 Raymond 1111405 修正列印選用章戳(圖檔)時未去背的問題
				//$so.find("img").eq(1).attr("src", so.content);	// 修正未顯示數位墨水問題
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
				// 1100317 Raymond 1100016 修正來文/信保特殊模式或附件頁面上的簽核物件無no, 不顯示編號
				//var $so = $("<div class='sign-obj so-text' data-id='" + so.id + "' title='" + so.info + "'><span style='" + noStyles + "'>" + no + "</span>
				var spanNo = (!!no)?"<span style='" + noStyles + "'>" + no + "</span>":"";
				var $so = $("<div class='sign-obj so-text' data-id='" + so.id + "' title='" + so.info + "'>" + spanNo + "\
	<img src='image/AOL/txt_comment.bmp' style='display:" + ((so.asIcon)?"inline":"none")+ "'>\
	<div style='display:" + ((so.asIcon)?"none":"block") +
			// 1101110 Raymond 1101199 新增依環境變數設定啟用文字意見的標楷體加套"全字庫正楷體"字型功能
			//";font-family:" + ((so.fontName)?so.fontName:"標楷體") +		// 2015.6.25 新增指定字型
			";font-family:" + (((!so.fontName || so.fontName == "標楷體") && useCNSFont)?"全字庫正楷體,":"") + ((so.fontName)?so.fontName:"標楷體") +		// 2015.6.25 新增指定字型
			";font-size:" + ((so.fontSize)?so.fontSize:"12pt") +
			";font-weight:" + ((so.fontWeight)?"bolder":"normal") +
			";font-style:" + ((so.fontStyle)?"italic":"normal") +
			";line-height:1" +	// 1070212 Raymond NCKU107216 修正預設行高與簽核頁面不一致問題
			// 1081217 Raymond FIX XSS & 保留折行
			//";color:" + ((so.color)?Util.toHtmlColor(so.color):"black") + "'>" + so.content.replace(/\n/g, '<br>') + "</div></div>")
			";color:" + ((so.color)?Util.toHtmlColor(so.color):"black") +
			";white-space:pre'>" + "</div></div>")
					.appendTo($pg)
					.css({position: "absolute", left: so.pos.left, top: so.pos.top});
				// 1090826 Raymond 1090620 修正本文頁面上的簽核物件套用IE列印時邊界反推
				if(isIE && !$pg.find("> img").hasClass("attachment"))
					$so.css({left: so.pos.left + (3.78 * pm) - ((so.asIcon)?18:0), top: so.pos.top + (3.78 * pm) - ((so.asIcon)?18:0)});
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

	// 1080119 Raymond 1070619 使用IE列印時邊界反推並修正頁碼錯誤問題
	//function _printMarginText($pg, docNo, po, sum) {
	function _printMarginText($pg, docNo, po, sum, type) {
		//$("<div style='position:absolute; left:0px; top:0px'>文稿頁面</div>").appendTo($pg);
		//$("<div style='position:absolute; right:0px; top:0px'>文號：" + docNo + "</div>").appendTo($pg);
		//$("<div style='position:absolute; left:calc(50% - 8em); bottom:0px'>線上簽核轉紙本列印 - 第" + po + "頁(共" + sum + "頁)</div>").appendTo($pg);
		if(type == "pn")
			$("<div class='appendex3' style='position:absolute; left:calc(50% - " + ((pm < 0)?7:8) + "em); bottom:" + ((pm < 0)?0:3) + "mm; font-size:10pt'>線上簽核轉紙本列印 - 第" + po + "頁/共" + sum + "頁</div>").appendTo($pg);
		else {
			$("<div class='appendex1' style='position:absolute; left:" + (4 + pm) + "mm; top:" + ((pm < 0)?0:3) + "mm; font-size:10pt'>文稿頁面</div>").appendTo($pg);
			// 1110812 Raymond 1110749 新增判斷若是信保基金, 則不要顯示「文號：」資訊
			if(!theUserInfo || theUserInfo.OrgNickName != "SMEG")
			$("<div class='appendex2' style='position:absolute; right:" + ((pm < 0)?50:7) + "mm; top:" + ((pm < 0)?0:3) + "mm; font-size:10pt'>文號：" + docNo + "</div>").appendTo($pg);	// 2017.3.2 文號向左移(FDA-序1292)
		}
	}

	function _printDraftPages(fm, draftIdx, rsrcFile, opts, $pages) {
		var dfd = $.Deferred();
		theLogger.log("$pages.length = " + $pages.find(".pg").length);
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
		fm.getSignFolder().xSignFolder().save();	// 2017.2.22 更新目前流程點的簽核區域資訊
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
						var tcSess = dm.getAllTCSess();
						for(var i=0; i<tcSess.length; i++) {
							params["color" + tcSess[i].index] = tcSess[i].color;
						}
						thePublicRsrc.applyPrintXSLT(dm.accquireXml(), dm.getDocType(), dm.getSubDocType(), rsrcFile.remote.getFullPath(), params)
							.done(function(intermediateXml, printXSLdir, printXSLfileName) {
								theLogger.log([printXSLdir, printXSLfileName]);
								theLogger.log(intermediateXml);
						
								if(intermediateXml != undefined) {
									var internalFO = theLayoutEng.transXmlFragToInternalFO(intermediateXml, dm);
									theLogger.log(internalFO);
									
									// 1101029 Raymond 1101199 修正Chrome V94、95版列印預覽時有些標楷體字型會破字的問題, 依環境變數「AOL_PRINT_USE_CNSFONT」決定產生分繕列印內容時傳入useCNSFont參數是否為true
									//theLayoutEng.instanciateFOPages(internalFO, opts, $pages)
									/* 1101110 Raymond 1101199 移至此函式外部判斷, 以供列印文字意見及簽核物件資訊頁使用
									var useCNSFont = false;
									var dtb = navigator.userAgent.match(/Chrome\/(\d+)/);
									if(!!dtb && dtb[1] >= 94) {	// 判斷是Chrome且94版以上
										var printUseCNSFont = theSSO.User.EnvSettings.get("AOL_PRINT_USE_CNSFONT");	// Y為啟用, N或未設定為不啟用, 環境變數允許設定兩個字, 第一個字代表列印線上簽核文稿的「文」格式的發文用、簽核及繕校用及紙本簽核文稿的「文」或「稿」格式時是否啟用此功能, 第二個字代表列印線上簽核文稿的「稿」格式時是否啟用此功能, 分開設定是怕萬一線上簽核文稿的「稿」格式套用了"全字庫正楷體", 由於字寬等與"標楷體"不一致時, 可能發生列印結果頁面與簽核頁面不一致, 而導致簽核物件位置不正確的問題
										if(printUseCNSFont.length > 1)												// 線上簽核公文的「稿」格式, 若環境變數有設定第二個字
											useCNSFont = printUseCNSFont[1] == 'Y';									// 以環境變數設定的第二個字控制是否啟用套用"全字庫正楷體"字型功能
									}*/
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
											
											// 1120608 Raymond 1120515 新增列印稿格式的第1頁記錄是否要套印騎縫章, 以修正列印稿格式時取消勾選騎縫章仍會列印(額外)騎縫章的問題
											$pages.find(".pg").eq(base).attr("data-printsealmark", opts.printSealMark);
											
											// 套印簽核物件
											var n = fm.getDraftPageCounts(draftIdx);
											var deferreds = [];
											var soList = [];	// 2017.2.8 顯示的簽核物件以此陣列記錄, 列印簽核資訊頁時, 以此陣列包含的簽核物件及順序排列顯示
											var scList = [];	// 1100715 Raymond 1100649 新增應顯示的簽核意見陣列記錄
											for(var i=0; i<n; i++) {
												var pg = fm.getDraftPage(draftIdx, i);
												if(pg) {
													var $pg = $pages.find(".pg").eq(base + i).attr("data-pgIdx", base + i);
													if($pg.length) {
														/* 2017.2.8 改從外部記錄檔取以文稿為基礎的簽核物件來顯示
														if("signObjs" in pg) {
															for(var j=0; j<pg.signObjs.length; j++) {
																var so = pg.signObjs[j];
																deferreds.push(_buildSO(fm, j, so, pg, $pg));
															}
														}*/
														// 2017.2.8 從外部記錄檔取以文稿為基礎的簽核物件
														if("guid" in pg.container && !!pg.container.guid) {
															var d0 = fm.getSignFolder().xSignFolder().getDraft(pg.container.guid);
															if(!!d0) {
																var d = d0.getVer(pg.container.id);
																if(!!d) {
																	// 1100728 Raymond 1100928 新增搜尋被取代掉的文字意見ID陣列
																	var substedSO = [];
																	function doSearchSubstedSO(v, cv, showTypeB) {
																		if(v.keepSO == "true") {
																			var pv = d0.getPrevVer(v.id);
																			if(!!pv)
																				doSearchSubstedSO(pv, cv, false);	// 之前版本不要顯示框外物件
																		}
																		// 1130220 Raymond 1120887 分會流程點可能不保留前一版本的簽核物件, 需再從搜尋前一個分會流程點的保留簽核物件
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
																		// 1130826 Raymond 中榮序214 修正自動增高簽核區域高度或異動內文後, 加蓋貼布物件於前流程點的簽核物件後傳送, 被蓋住的簽核物件仍會顯示的問題
																		if(v.keepSO == "true") {
																			// 1130826 Raymond 1120887 改為重複使用d0
																			//theLogger.warn("保留顯示前一版本的簽核物件");
																			//var pv = fm.getSignFolder().xSignFolder().getDraft(pg.container.guid).getPrevVer(v.id);
																			var pv = d0.getPrevVer(v.id);
																			if(!!pv) {
																				theLogger.warn("保留顯示前一版本(" + pv.msgId + ")的簽核物件");
																				doBuildSO(pv, cv, false);	// 之前版本不要顯示框外物件
																			}
																		}
																		// 1130220 Raymond 1120887 分會流程點可能不保留前一版本的簽核物件, 需再從搜尋前一個分會流程點的保留簽核物件
																		else {
																			var pv = d0.getPrevDispatchVer(v.id);
																			if(!!pv) {
																				theLogger.warn("找到前一分會流程點(" + pv.msgId + "), 保留該版本的簽核物件");
																				doBuildSO(pv, cv, false);	// 之前版本不要顯示框外物件
																			}
																		}
																		for(var j=0; j<v.xSignObjs.length; j++) {	// 1100728 Raymond fix loop var dup i->j
																			var so = v.xSignObjs[j];				// 1100728 Raymond fix loop var dup i->j
																			// 1100728 Raymond 1100928 新增符合被取代掉的文字意見ID陣列, 則不要顯示
																			//if(coll.indexOf(so.msgId) >= 0) {
																			if(coll.indexOf(so.msgId) >= 0 && substedSO.indexOf(so.id) < 0) {
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
																								theLogger.warn("簽核物件(ID:" + so.id + ")位於此頁(pgId:" + pg.id + ")的簽核區域(saType:" + sa.saType + ", saID:" + sa.saID + ")內");
																								if("ref" in so && !!so.ref) {	// 2017.2.18 bugfix
																									// 1101110 Raymond 修正草稿公文列印簽核物件資訊頁時, 本流程點才新增的簽核物件會重複出現, 及文稿上的簽核物件的序號會跳號的問題
																									if(so.ref.type.match(/章戳|文字意見|圖檔/)) {
																									deferreds.push(_buildSOTypeA2(so, sa, $pg, soList.length + 1));
																									soList.push(so.ref);	// 加入此物件到將簽核物件清單以供簽核物件資訊頁顯示
																									}
																								}
																								else {
																									theLogger.error("無對應實際簽核物件");
																								}
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
																							deferreds.push(_buildSOTypeB(so, $pg, soList.length + 1));
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
																		deferreds.push(_buildSOTypeB(so, $pg, soList.length + 1));
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
																	deferreds.push(_buildSOTypeB(so, $pg, soList.length + 1));
																	soList.push(so);	// 加入此物件到將簽核物件清單以供簽核物件資訊頁顯示
																});
															}
															else
																theLogger.error("文稿無GUID, 無法顯示簽核物件");
														}
														if("newSignObjs" in pg) {
															for(var j=0; j<pg.newSignObjs.length; j++) {
																var so = pg.newSignObjs[j];
																deferreds.push(_buildSOX(fm, j, so, pg, $pg, soList.length + 1));
																soList.push(so);	// 加入此物件到將簽核物件清單以供簽核物件資訊頁顯示
															}
														}
													}
													else {
														theLogger.error("第" + i + "頁有pg但無$pg");
													}
												}
											}
											
											// 1100715 Raymond 1100649 新增應顯示的簽核意見 copy from _setupComments@RD-AOL.js
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
											// 最近的流程先加!
											//for (; idx>=0; idx--)
											for (var idx=0; idx<m; idx++)
											{
												aolFlow = aolFlows.flows[idx];
												// 1090430 Raymond 1090261 恢復由docToDoList取得流程點資訊
												/* 1070410 Raymond 1070463 直接以封裝裝記錄的流程點資訊顯示單位、角色、姓名, 以避免因OrgInfo找不到該此帳號資訊而當掉*/
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
												}
												else	// 無異動資訊的流程點(ex.分文)不需要顯示簽核意見
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
												}
												else if ((typeof aolFlow.refChangeInfo!=='undefined') && (typeof aolFlow.refChangeInfo.comment!=='undefined') && aolFlow.refChangeInfo.comment.length) {
													comment = aolFlow.refChangeInfo.comment;
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
												
												}	// end of 1100706 Raymond 1100648 新增支援分文稿記錄簽核意見功能, 啟用時要判斷此簽核流程找得到目前顯示文稿
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
											
											// 套印邊界文字
											n = $pages.find(".pg").length - base;
											for(var i=0; i<n; i++) {
												var $pg = $pages.find(".pg").eq(base + i);
												_printMarginText($pg, fm.getDocNo(), i+1, n);
											}
											if(deferreds.length) {
												$.when.apply(this, deferreds)
												.done(function() {	// 非同步等待所有簽核物件完成下載顯示
													// 1110627 Raymond 1110271 新增航港局邏輯, 若啟用稿間加蓋騎縫章功能且雙面列印時, 奇數頁文稿跟簽核物件資訊頁間補上空白頁
													if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1) && "printSealMarkBetweenDoc" in SSO_CONFIG && SSO_CONFIG.printSealMarkBetweenDoc == true)
														$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);
													
													//printSignObjPages(draftIdx, {}, $pages, soList);	// 2017.2.8 傳入第4參數簽核物件清單
													printSignObjPages(draftIdx, {}, $pages, soList, scList);	// 1100715 Raymond 1100649 傳入第5參數簽核意見清單
													
													// 1110401 Raymond 1110383 轉紙本列印新增雙面列印功能
													if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1))
														$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);	// 補上空白頁
													dfd.resolve();
												})
												.fail(function(errorText) {
													theLogger.error("套印簽核物件時發生錯誤:" + errorText);
													dfd.reject("套印簽核物件時發生錯誤:" + errorText);
												});
											}
											else {
												// 1110401 Raymond 1110383 轉紙本列印新增雙面列印功能
												if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1))
													$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);	// 補上空白頁
												dfd.resolve();
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
							
							// 1110401 Raymond 1110383 轉紙本列印新增雙面列印功能
							if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1))
								$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);	// 補上空白頁
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
	
	function _printAttachPages(fm, draftIdx, attIdx, opts, $pages) {
		var dfd = $.Deferred();
		var deferreds = [];	// 等待多頁同時完成
		var n = fm.getAttPageCounts(draftIdx, attIdx);
		for(var i=0; i<n; i++) {
			var pg = fm.getAttPage(draftIdx, attIdx, i);
			if(pg) {
				// 1110401 Raymond 1110383 比照1071208修正在Chrome下附件頁碼會與線上簽核轉紙本列印的下邊界字串重疊問題
				// 2016.12.29 修改成先組pg, 把img當回呼參數傳入getPageImage(), 因為getPageImage()是非同步, 雖然只是組出imgtran的網址, 仍不排除會有後頁先resolve的情形
				//var $pg = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><img class='attachment'/><div class='att-po' style='display:" + (opts.printPageNo?"block":"none") + "'>第 " + (i + 1) + " 頁，共 " + n + " 頁</div></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推
				var $pg = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><img class='attachment'/><div class='att-po' style='display:" + (opts.printPageNo?"block":"none") + "; bottom:calc(1em + " + ((pm < 0)?0:3) + "mm)'>第 " + (i + 1) + " 頁，共 " + n + " 頁</div></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推
				// 1110627 Raymond 1110271 設定data-printsealmark屬性為opts.printSealMark
				if("printSealMarkBetweenDoc" in SSO_CONFIG && SSO_CONFIG.printSealMarkBetweenDoc == true)
					$pg.attr("data-printsealmark", opts.printSealMark);
				// 1090826 Raymond 1090620 附件頁面影像比照列印簽核文件功能不要套用IE列印邊界反推
				//if(pm < 0)	// 2016.12.29 配合IE列印邊界問題, 影像也要反推
				//	$pg.find("img").css({marginLeft: pm + "mm", marginTop: pm + "mm"});
				deferreds.push(fm.getPageImage(pg, $pg.find("img"))
					.done(function(data, dpi, $img) {	// 2016.12.29 頁碼己在非同步外先組pg時填入, 不用在done()時填入了
						//var $img = $("<div class='pg'><img class='attachment' style='width:210mm; height:297mm'/><div class='att-po' style='display:" + (opts.printPageNo?"block":"none") + "'>第 " + (i + 1) + " 頁，共 " + n + " 頁</div></div></div>").appendTo($pages)
						//		.find("img").attr("src", data);
						$img.on("load", function(event) {
							console.log("附件頁面影像.on" + event.type + "(" + event.target.naturalWidth + " x " + event.target.naturalHeight + ")");
							if("naturalWidth" in event.target && "naturalHeight" in event.target) {
								var w = event.target.naturalWidth / (dpi || 300),	// 頁面影像為200dpi, 若有傳入dpi參數則以dpi為準
									h = event.target.naturalHeight / (dpi || 300);
								$img.css({width: w + "in", height: h + "in"});
							}
						// 1070814 Raymond 1070832 修正附件頁面影像在RD-AOLPrint.js載入後不會觸發load事件而導致轉圈圈不會結束的問題
						//}).attr("src", data);
						}).attr("data-src", data);
					}));
				// 1090826 Raymond 1090620 補列印附件頁面上的簽核物件
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
		}
		if(deferreds.length > 0) {
			$.when.apply(this, deferreds)
				.done(function() {
					theLogger.warn("所有附件頁面已下載完成, 共" + deferreds.length + "頁");
					
					// 1110401 Raymond 1110383 轉紙本列印新增雙面列印功能
					if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1))
						$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);	// 補上空白頁
					dfd.resolve();
				})
				.fail(function(errorText) {
					dfd.reject(errorText);
				});
		}
		else {
			theLogger.warn("附件無頁面!?");
			dfd.resolve();
		}
		return dfd.promise();
	}

	function _printFromDocPages(fm, draftIdx, opts, $pages) {
		var dfd = $.Deferred();
		var deferreds = [];	// 等待多頁同時完成
		var n = fm.getDraftPageCounts(draftIdx);
		for(var i=0; i<n; i++) {
			var pg = fm.getDraftPage(draftIdx, i);
			if(pg) {
				// 2016.12.29 修改成先組pg, 把img當回呼參數傳入getPageImage(), 因為getPageImage()是非同步, 雖然只是組出imgtran的網址, 仍不排除會有後頁先resolve的情形
				var $pg = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><img class='attachment'/><div class='att-po' style='display:" + (opts.printPageNo?"block":"none") + "'>第 " + (i + 1) + " 頁，共 " + n + " 頁</div></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推
				// 1090826 Raymond 1090620 附件頁面影像比照列印簽核文件功能不要套用IE列印邊界反推
				//if(pm < 0)	// 2016.12.29 配合IE列印邊界問題, 影像也要反推
				//	$pg.find("img").css({marginLeft: pm + "mm", marginTop: pm + "mm"});
				deferreds.push(fm.getPageImage(pg, $pg.find("img"))
					.done(function(data, dpi, $img) {
						//var $img = $("<div class='pg'><img class='attachment' style='width:210mm; height:297mm'/><div class='att-po' style='display:" + (opts.printPageNo?"block":"none") + "'>第 " + (i + 1) + " 頁，共 " + n + " 頁</div></div></div>").appendTo($pages)
						//		.find("img").attr("src", data);
						$img.on("load", function(event) {
							console.log("來文頁面影像.on" + event.type + "(" + event.target.naturalWidth + " x " + event.target.naturalHeight + ")");
							if("naturalWidth" in event.target && "naturalHeight" in event.target) {
								var w = event.target.naturalWidth / (dpi || 300),	// 頁面影像為200dpi, 若有傳入dpi參數則以dpi為準
									h = event.target.naturalHeight / (dpi || 300);
								$img.css({width: w + "in", height: h + "in"});
							}
						// 1070814 Raymond 1070832 修正來文頁面影像在RD-AOLPrint.js載入後不會觸發load事件而導致轉圈圈不會結束的問題
						//}).attr("src", data);
						}).attr("data-src", data);
					}));
				// 1090826 Raymond 1090620 補來文頁面上的簽核物件
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
		}
		if(deferreds.length > 0) {
			$.when.apply(this, deferreds)
				.done(function() {
					theLogger.warn("所有附件頁面已下載完成, 共" + deferreds.length + "頁");
					
					// 1110401 Raymond 1110383 轉紙本列印新增雙面列印功能
					if(bBothSide && ($pages.find(".pg:visible").length % 2 == 1))
						$("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'></div>").appendTo($pages);	// 補上空白頁
					dfd.resolve();
				})
				.fail(function(errorText) {
					dfd.reject(errorText);
				});
		}
		else {
			theLogger.warn("附件無頁面!?");
			dfd.resolve();
		}
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
	
	// 1100715 Raymond 1100649 新增簽核意見參數
	//function printSignObjPages(draftIdx, opts, $pages, soList) {	// 2017.2.8 改用外部簽核物件顯示, 因簽核框內物件出現順序可能與頁次不符, 故改用加入順序顯示
	function printSignObjPages(draftIdx, opts, $pages, soList, scList) {
		/* 1110401 Raymond 修正簽核物件資訊頁沒有任何影像檔需要等待
		var dfd = $.Deferred();
		var deferreds = [];	// 等待多頁同時完成*/
		var n = fm.getDraftPageCounts(draftIdx), po = 1;
		// 1140311 Raymond 1140413 修正計算分頁時行高預設為1.3與列印結果行高為normal高度不一致, 造成分頁位置有誤差問題
		// 1101110 Raymond 1101199 新增依環境變數設定啟用簽核物件資訊頁的標楷體加套"全字庫正楷體"字型功能
		//var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm;'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:標楷體;'><h1 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
		//var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFont)?"全字庫正楷體,":"") + "標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
		var $container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFont)?"全字庫正楷體,":"") + "標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
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
						//$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFont)?"全字庫正楷體,":"") + "標楷體;'><h3>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
						$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFont)?"全字庫正楷體,":"") + "標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
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
						//$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFont)?"全字庫正楷體,":"") + "標楷體;'><h3>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
						$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFont)?"全字庫正楷體,":"") + "標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
						$cmt.appendTo($container.find(".body"));
						sum = h;
					}
				}
			}
		}
		// 1100715 Raymond 1100649 新增列印簽核意見
		if(!!scList) {
			for(var j=0, k=soList.length; j<scList.length; j++) {
				var sc = scList[j], $cmt = undefined;
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
								// 1101110 Raymond 1101199 新增依環境變數設定啟用簽核物件資訊頁的標楷體加套"全字庫正楷體"字型功能
								$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFont)?"全字庫正楷體,":"") + "標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
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
										// 1101110 Raymond 1101199 新增依環境變數設定啟用簽核物件資訊頁的標楷體加套"全字庫正楷體"字型功能
										$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFont)?"全字庫正楷體,":"") + "標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
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
						// 1140311 Raymond 1140413 修正計算分頁時行高預設為1.3與列印結果行高為normal高度不一致, 造成分頁位置有誤差問題
						// 1140311 Raymond 1101199 新增依環境變數設定啟用簽核物件資訊頁的標楷體加套"全字庫正楷體"字型功能
						$container = $("<div class='pg' style='width:" + (210 + (pm * 2)) + "mm; height:" + (297 + (pm * 2) - 3) + "mm; line-height:1.3'><div style='width:100%; height:25mm;'></div><div class='body' style='width:160mm; margin-left:" + (25 + pm) + "mm; height:247mm; font-family:" + ((useCNSFont)?"全字庫正楷體,":"") + "標楷體;'><h3 style='margin:0'>簽核物件資訊頁 - " + po + "/<span class='so-pages'>" + po + "</span></h3><hr/></div></div>").appendTo($pages);	// 2016.12.1 新增使用IE列印時邊界反推, 1101004 Raymond <div/>改成<div></div>, 用<div/>似乎後面的div會變它的child
						$cmt.appendTo($container.find(".body"));
						sum = h;
						}
					}
				}
			}
		}
		_printMarginText($container, fm.getDocNo(), po, po, "signObjs");
		
		/* 1110401 Raymond 修正簽核物件資訊頁沒有任何影像檔需要等待
		if(deferreds.length > 0) {
			$.when.apply(this, deferreds)
				.done(function() {
					theLogger.warn("所有附件頁面已下載完成, 共" + deferreds.length + "頁");
					dfd.resolve();
				})
				.fail(function(errorText) {
					dfd.reject(errorText);
				});
		}
		else {
			theLogger.warn("附件無頁面!?");
			dfd.resolve();
		}
		return dfd.promise();*/
	}
	
	// 1121004 Raymond 1120776 將確認訊息文字改為變數, 傳入詢問轉紙本原因的子視窗中顯示
	// 2017.5.12 - Eric, 問題單1060246, 執行前依公文彙併辦狀態提示後續作業.
	//var fComDoc = false, fContinue = false;;
	var fComDoc = false, fContinue = true, msgE2P = '確定要轉成紙本簽核流程嗎?';
	if (typeof theAOL.docObj=='object' && theAOL.docObj!==null) {
		if (SSOUtil.typeOf(theAOL.docObj.ODWDCM.COM_NO)=='array' && theAOL.docObj.ODWDCM.COM_NO.length) {
			fComDoc = true;
		}
	}
	// 1121004 Raymond 1120776 取消第1個詢問確認訊息
	//if (!fComDoc) {
	//	fContinue = confirm("確定要轉成紙本簽核流程嗎?");
	//}
	//else {
	if(fComDoc) {
		var comType = theAOL.docObj.get('ODWMSG', 'COM_TYPE');
		var combineType = theAOL.docObj.get('ODWDCM', 'COMBINE_TYPE');
		if (comType=='2') {
			// 公文為子文, 必定為併案陳核公文
			if (combineType!=='3') {
				alert('不正確的併辦/併案陳核資訊:\nCOM_TYPE=\'' + comType + '\', COMBINE_TYPE=\'' + combineType + '.\n');
				fContinue = false;
			}
			else {
				// 1121004 Raymond 1120776 修改確認訊息改在詢問轉紙本原因的子視窗中顯示
				//fContinue = confirm('目前公文有相關併案線上簽核公文，若欲轉紙本簽核，\n則會將目前公文解併，是否確認要轉紙本簽核?');
				msgE2P = '目前公文有相關併案線上簽核公文，若欲轉紙本簽核，\n則會將目前公文解併，是否確認要轉紙本簽核?';
			}
		}
		else if (comType=='1') {
			if (combineType=='3') {
				// 1121004 Raymond 1120776 修改確認訊息改在詢問轉紙本原因的子視窗中顯示
				//fContinue = confirm('目前公文為併案陳核母文，且有相關併案線上簽核公文,\n若欲轉紙本簽核，則會將所有公文解併，是否確認要轉\n紙本簽核?');
				msgE2P = '目前公文為併案陳核母文，且有相關併案線上簽核公文，若欲\n轉紙本簽核，則會將所有公文解併，是否確認要轉紙本簽核?';
			}
			else if (combineType=='1') {
				alert('目前公文為彙併辦公文母文，且有相關併案線上簽核公文,\n請先至EDP460公文彙併辦設定作業解除彙併辦後,再進行轉\n紙本簽核作業。');
				fContinue = false;
			}
			else {
				alert('不正確的併辦/併案陳核資訊:\nCOM_TYPE=\'' + comType + '\', COMBINE_TYPE=\'' + combineType + '\'.\n');
				fContinue = false;
			}
		}
		else {
			alert('不正確的併辦/併案陳核資訊:\n無效的 COM_TYPE 值:' + comType);
			fContinue = false;
		}
	}
	
	if (fContinue) {
	// 1121004 Raymond 1120776 多傳入轉紙本簽核用的訊息文字參數, 於詢問轉紙本原因的子視窗中顯示
	// 1071207 Raymond 1071108 將詢問轉紙本原因提前至列印前執行
	//nsEditor._getPDocReason(localStorage['Artifact'], fm.getDocObj().sourceOrgNo, fm.getSignType(), "E2P")
	nsEditor._getPDocReason(localStorage['Artifact'], fm.getDocObj().sourceOrgNo, fm.getSignType(), "E2P", msgE2P)
	.done(function(rslt){
		theLogger.log(rslt);
		// 1071207 Raymond 1071108 新增判斷轉紙本原因是否為密件控管
		var strCRule = theSSO.User.EnvSettings.get("SET_PDRAFT_SEC_BY_CRULE");
		var crule = strCRule.split("|");
		if(crule.length > 1 && fm.getDocObj().isDraft) {
			if(crule[0] == "Y") {
				if(crule[1] == "")
					theLogger.log("SET_PDRAFT_SEC_BY_CRULE('" + strCRule + "')第1碼為'Y', 第2碼為空, 不需要密件控管");
				else if(rslt.code == crule[1]) {
					theLogger.log("SET_PDRAFT_SEC_BY_CRULE('" + strCRule + "')第1碼為'Y', 第2碼不為空, 且與轉紙本原因(" + rslt.code + ")相符, 需要密件控管");
					// 重設所有稿件的密等為密
					theAOL.getCurrFolio().setAllDraftText("/*/密等及解密條件或保密期限/密等/@代碼", "密");
					// 重設所有稿件的解密條件或保密期限為(其它), for 避免儲存檢核密件的解密條件不可為空
					theAOL.getCurrFolio().setAllDraftText("/*/密等及解密條件或保密期限/解密條件或保密期限", "(其它)");
					$("#leftPart .pages").flip("refresh");
					
					// 同步至基資
					fnWebEditSave();
				}
				else
					theLogger.log("SET_PDRAFT_SEC_BY_CRULE('" + strCRule + "')第1碼為'Y', 第2碼不為空, 與轉紙本原因(" + rslt.code + ")不符, 不需要密件控管");
			}
		}
		
		// 1110401 Raymond 1110383 轉紙本列印新增雙面列印功能
		if("bothSide" in rslt && typeof rslt.bothSide == "boolean")
			bBothSide = rslt.bothSide;
		
		// TODO: 列印前先儲存
		theAOL.doSave()
		.done(function() {
		
			// TODO: 列印
			var q = [];
			_prepopulate(fm, q)
			.done(function() {
				// 1120620 Raymond 新增z-index:-1;position:absolute;以避免在準備預覽頁面資料時顯示在主頁面
				//var $pages = $("<div class='pages'></div>").appendTo("body");	// 2016.9.8 FIX, 未appendTo目前DOM的元素, 計算寬高會有問題
				var $pages = $("<div class='pages' style='z-index:-1;position:absolute;'></div>").appendTo("body");	// 2016.9.8 FIX, 未appendTo目前DOM的元素, 計算寬高會有問題
				var cursor = 0;
				function doSingle() {
					if(cursor < q.length) {
						var item = q[cursor++];
						if(item.type == "draft") {			// 本文
							var rsrcFile = item.rsrcFile;
							_printDraftPages(fm, item.draftIdx, rsrcFile, item, $pages)
								.done(doSingle)
								.fail(function(errorText) {alert(errorText);});
						}
						else if(item.type == "attach") {	// 附件
							_printAttachPages(fm, item.draftIdx, item.attIdx, item, $pages)
								.done(doSingle)
								.fail(function(errorText) {alert(errorText);});
						}
						else if(item.type == "fromdoc") {	// 來文
							_printFromDocPages(fm, item.draftIdx, item, $pages)
								.done(doSingle)
								.fail(function(errorText) {alert(errorText);});
						}
						else if(item.type == "smegdraft") {	// 1100317 Raymond 1100016 信保基金特殊模式文稿比照來文頁面影像列印
							_printFromDocPages(fm, item.draftIdx, item, $pages)
								.done(doSingle)
								.fail(function(errorText) {alert(errorText);});
						}
					}
					else {
						// 1080119 Raymond 1070619 修正套印頁次錯誤問題
						var m = $pages.find(".pg").length;
						for(var i=0; i<m; i++) {
							_printMarginText($pages.find(".pg").eq(i), undefined, i+1, m, "pn");
						}
						// 1080119 Raymond 1070619 修正IE及MacOSX Safari列印時297mm滿版高度會多出一頁空白頁的問題
						if(pm == 0) {	// SSO_CONFIG.printMarginForIE為0邊界的機關
							if(navigator.userAgent.indexOf("Trident") > 0 ||	// for IE與眾不同的品味
								navigator.userAgent.indexOf("Mac OS X") > 0) {	// for MacOSX Safari
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
						// 1080119 Raymond 補1060653/1060679 修正Chrome下列印預覽各頁間會黏在一起(page-break-before無效)導致約第5頁以後的本文分類號等行出現在前一頁的問題
						$pages.css("position", "");
						
						theLogger.warn("本文及附件已等待完成");
						// 1061221 Raymond 1061309 修改來文影像是第1頁時Chrome預覽列印顯示空白的問題(改用Leslie解決IE的IMG列印問題方案)
						var jobId = SSOUtil.getCurrentTimeStr_YYYMMDDhhmm(true);
						// 1120608 Raymond 1120515 列印分頁網址改為相對路徑, 以供掛舊的不同版本的站台測試時, 列印分頁不會跑去用最新版的列印分頁
						//var printUrl = SSO_CONFIG.ServerHost + '/MS/RD-AOLPrint.html?JobId='+jobId;
						var printUrl = 'RD-AOLPrint.html?JobId='+jobId;
						// 1120106 Raymond 1111361 修改成以一個背景的IFrame內嵌列印分頁的方式執行列印
						if(window.dbgPrint)	// 1120608 Raymond 1120515 新增用舊的列印分頁模式顯示控制方式, 用於偵錯
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
						
						/*
						var newWin = window.open();
						newWin.document.write('<!DOCTYPE html><html><head><meta http-equiv="cache-control" content="max-age=0" />\
							<meta http-equiv="cache-control" content="no-cache" />\
							<meta http-equiv="expires" content="0" />\
							<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />\
							<meta http-equiv="pragma" content="no-cache" />\
							<title>PRINT</title><link rel="stylesheet" href="CSS/PrintChrome.css?ver=5.0.18"/></head><body>');
						for(var i=0; i<$pages.length; i++)
							newWin.document.write($pages.get(i).outerHTML);
						newWin.document.write("</body></html>");
						newWin.document.close();
						newWin.focus();
						*/
						$pages.remove();	// 2016.9.8 FIX, 移除暫時appendTo目前DOM的元素
					}
				}
				if(q.length > 0) {
					doSingle();
				}
				else {
					theLogger.warn("無任何文稿可列印!");
					$pages.remove();
					alert("無任何文稿可列印!");
				}

			});
			
			/* 1071207 Raymond 1071108 將詢問轉紙本原因提前至列印前執行
			nsEditor._getPDocReason(localStorage['Artifact'], fm.getDocObj().sourceOrgNo, fm.getSignType(), "E2P")
			.done(function(rslt){
				theLogger.log(rslt);*/
			// 1080119 Raymond 1070619 比照一代新增再確認是否印出紙本訊息
			var param = {
				// 1121004 Raymond 1120776 修改列印後顯示的確認列印結果子視窗的標題文字
				//title: "轉紙本列印",
				title: "請確認列印結果是否正確",
				message: "請確認印表機是否已正確列印出文件！\n若正確列印，請按確定鍵繼續將本文轉為紙本簽核文件。",	// 1080122 Raymond 1070619 提示訊息改成跟一代套件一樣
				buttons: [
				{
					name: "確定",
					action: function() {
						// 呼叫WS
						theSSO.MP.todolist.builder.setMsgE2P(fm.getDocObj(), rslt.code, rslt.desc)
						.done(function() {
							// 關閉公文, 額外參數是"E2P"給FolioModel.close()呼叫_onCloseFolio()時傳入
							$("#aol #btnClose").trigger("click", ["E2P"]);
						})
						.fail(function(errorText) {
							alert(errorText);
						});
					}
				}, {
					name: "取消",
					action: function() {
						theLogger.warn("使用者取消轉紙本作業");
					}
				}]
			};
			$.confirm(param);
			/* 1071207 Raymond 1071108 將詢問轉紙本原因提前至列印前執行
			})
			.fail(function(rslt) {
				theLogger.error(rslt._errMsg);
				if(rslt._showError)
					alert(rslt._errMsg);
			});*/
		})
		.fail(function(errorText) {
			alert(errorText);
		});
	// 1071207 Raymond 1071108 將詢問轉紙本原因提前至列印前執行
	})
	.fail(function(rslt) {
		theLogger.error(rslt._errMsg);
		if(rslt._showError)
			alert(rslt._errMsg);
	});
	}
};


(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-ChangePpr.js").finish();	// 2016.11.10 fix file name
})();