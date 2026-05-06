// RsrcMgmr class
//   
//  2015.12.15 - Raymond, 改用theLogger記錄LOG資訊
// DATE		MGRNO	SA		PG		Desc
// 1060623	1060147	Raymond	Raymond	新增同步下載(for第1次下載機關代碼_Data.xml)參數
// 1060707	1060361	Raymond	Raymond	展開範本樹狀目錄
// 1061024	1060980/1060997 Raymond 從文稿讀出'套用自訂'屬性, 若設為True則表示已設定過段落屬性, 排版時應套用自訂
// 1061026	1061053	Raymond	Raymond	修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
// 1080927  Kevin       Eric        1080339     jQuery 3.0 upgrade. ($.type => SSOUtil.typeOf)
// 1090423	1090257	Raymond	Raymond	點選共用範本加入時, 新增傳入type屬性, 設為1表示為共用範本
// 1100310	1090991	Raymond	Raymond	資源管理檔(RsrcMgmt.xml)新增"預設排版"屬性, 提供樣版指定預設的排版設定檔名稱
// 1100922	1080763	Raymond	Raymond	修正MP的新增稿件的範本面板的共用範本不會套用樣式及子目錄範本數量顯示為0的錯誤的問題
// 1110320	1110167	Leslie	Leslie	[考試院]UI調整，新增草稿方式可設定
// 1110505	1110521	Raymond	Raymond	新增支援調閱歷史公文直接載入DI顯示套用樣版頁面之功能, 修正當文稿DI為"來文頁面"時, 改搜尋"文"類型排版設定檔
// 1110818	-------	Raymond	Raymond	修正共用範本設定了"預設排版"屬性卻未生效的問題
// 1111207	1111396	Raymond	Raymond	修正Chrome更新至108.0.5359.72版後, 段落條列若跨頁時, 列印分頁正常但在瀏覽器的預覽介面中會有內容縮小, 導致右及下邊界多出一些空白空間的問題
// 1120703	標檢局序98	Raymond		修正開啟一代紙本簽核若有2筆以上函稿, 會發生詢問套用樣版檔一次後卡住(已經有一個confirmOverlay在畫面中!), 導致轉圈圈無法開啟的問題
// 1120822	1120494	Raymond	Raymond	新增新增文稿列舉排版設定檔供使用者選擇時, 檢核RsrcMgmt.xml中適用文別/函類別的排版設定檔是否有設定「適用單位代碼」屬性, 若有則檢核是否與本件公文的OWNOU相符, 若不符合則不列出此排版設定檔選項, 及記憶前次選取的排版設定檔, 在顯示選擇排版設定檔子視窗時, 預設選取前次記憶的選擇項目
// 1120828	1120750	Raymond	Raymond	新增判斷有新舊機關代碼轉換物件, 則套用轉換為新代碼, 來取得Data.xml及下載騎縫章的路徑
// 1120831	1120215	Raymond	Raymond	新增標檢局客製化支援捷成TXT檔匯入功能
// 1120901	1120407	David	Raymond	修正取得DataXML時以本件公文的機關代碼為準, 而非目前切換的activeRole的機關代碼
// 1120919	北大序213	Raymond		修正檢索側屜開啟的公文沒有ownOUId導致發生Error的問題
// 1121006	北大序256	Raymond		新增下載文別轉換預轉.xsl方法
// 1121107	1120941	David	Raymond	合併1120627, 新增判斷是否為被裁併機關的公文, 是則改用被裁併機關的資源管理檔搜尋應套用的排版設定檔、DataXML、騎縫章等資源檔, 修正登入系統後未開啟任何公文時, 點擊創稿面版無法顯示樣版清單的問題, 修正先開啟檢索側屜中的調閱被裁併機關的公文, 關閉後再點擊創稿面版會顯示成被裁併機關的樣版清單的問題
// 1121222	領務局需求序22	Raymond	修正DocView開啟一代紙本公文因無記錄排版設定檔資訊而出現排版設定檔選單問題, 改為判斷環境變數「WE_DOC_VIEW_APPLY_FIRST_MATCH_PRINTXSL」設為"Y"時, 直接套用第1個符合的排版設定檔
// 1130809	1130313	Raymond	Raymond	合併1111007(1100394), 首頁的開啟舊檔新增支援開啟離線模式下另存整份公文的ZIP檔
// 1130816	1130313	Raymond	Raymond	離線模式不要呼叫GetUserEnvSetting、UpdateUserEnvSet
// 1131101	勤益序337	Raymond		修正開啟公文時若同時有2筆以上文稿需選擇排版設定檔, 會卡在第2筆文稿的詢問子視窗無法顯示, 導致轉圈圈問題
// 1140708	1140159	David	Raymond	合併1111142, 機關代碼_Data.xml搬家到[Other\機關代碼]子目錄下, RsrcMgmt.xml中子目錄新增"欄位選項"分類, 用於專門放"機關代碼_Data.xml"
// 1140711	1140958	Raymond	Raymond	新增偵測樣版檔是否已改成會銜令比照令的凸排方式
// 1141022	1141125	Raymond	Raymond	新增當機關暱稱為"TAITRA"(外貿)時, 新增「匯入調派令CSV(多人)」、「匯入晉升令CSV(多人)」及「匯入獎勵令CSV(多人)」的按鈕於MP的樣版選單中的最下面
// 1141106	外貿序346	Raymond		修改為右側新增稿件頁籤開啟的樣版清單面板也比照左邊新增稿件頁籤開啟的樣版清單面板顯示3個匯入按鈕

(function RsrcMgmr() {
	
	if(window.theModMgr != undefined)
		var inst = window.theModMgr.install("RD-RsrcMgr.js");

	// private members
	var _initialized = false;	// 已初始化(thePublicRsrc)
	
	// private methods
	var RsrcConst = {
		FILE: 1,
		DIR: 2
	};
	function RsrcFile() {
		this.type = RsrcConst.FILE;
		this.name = "";
		this.path = "";
		this.href = "";
		this.desc = "";
		this.docType = "";
		this.subDocType = "";
		this.category = "";
		this.size = "";
		this.lastModifed = "";
		this.removed = "";
	}
	RsrcFile.prototype.fromXmlNode = function(xmlNode) {
		this.name = xmlNode.getAttribute("名稱");
		this.path = xmlNode.getAttribute("路徑");
		this.href = xmlNode.getAttribute("href");
		this.desc = xmlNode.getAttribute("描述");
		this.docType = xmlNode.getAttribute("文別");
		this.subDocType = xmlNode.getAttribute("函類別");
		this.category = xmlNode.getAttribute("類別");
		this.size = xmlNode.getAttribute("size");
		this.lastModifed = xmlNode.getAttribute("更新日期");
		this.removed = xmlNode.getAttribute("removed");
		if(xmlNode.hasAttribute("預設排版"))	// 1100310 Raymond 1090991 RsrcMgmt.xml新增"預設排版"屬性, 提供樣版指定預設的排版設定檔名稱
			this.defPrintXSLName = xmlNode.getAttribute("預設排版");
		if(xmlNode.hasAttribute("適用單位代碼"))	// 1120821 Raymond 1120494 RsrcMgmt.xml新增"適用單位代碼"屬性, 提供排版設定檔可依OWNOU過濾適用的排版設定檔功能
			this.allowOU = xmlNode.getAttribute("適用單位代碼");
	}
	RsrcFile.prototype.setRemote = function(remote) {
		this.remote = remote;
		if(this.href != remote.href)
			this.href = remote.href;
		if(this.desc != remote.desc)
			this.desc = remote.desc;
		if(this.docType != remote.docType)
			this.docType = remote.docType;
		if(this.subDocType != remote.subDocType)
			this.subDocType = remote.subDocType;
		if(this.category != remote.category)
			this.category = remote.category;
		if(this.size != remote.size)
			this.size = remote.size;
		if(!!remote.defPrintXSLName)	// 1100310 Raymond 1090991 RsrcMgmt.xml新增"預設排版"屬性, 提供樣版指定預設的排版設定檔名稱
			this.defPrintXSLName = remote.defPrintXSLName;
		if(!!remote.allowOU)	// 1120821 Raymond 1120494 RsrcMgmt.xml新增"適用單位代碼"屬性, 提供排版設定檔可依OWNOU過濾適用的排版設定檔功能
			this.allowOU = remote.allowOU;
	}
	RsrcFile.prototype.getDirPath = function() {
		if(this.parent)
			return this.parent.getFullPath();
		return new Error("RsrcFile物件未指定parent");
	}
	RsrcFile.prototype.getFullPath = function() {
		if(this.parent)
			return this.parent.getFullPath() + "\\" + this.path;
		return new Error("RsrcFile物件未指定parent");
	}
	RsrcFile.prototype.getWFIOURL = function() {
		if(this.parent)
			return this.parent.getWFIOURL();
		return new Error("RsrcFile物件未指定parent");
	}
	RsrcFile.prototype.outdated = function() {
		if(this.remote != undefined)
			return this.remote.lastModified != this.lastModifed;
		return false;
	}
	
	function RsrcDir() {
		this.type = RsrcConst.DIR;
		this.name = "";
		this.path = "";
		this.href = "";
		this.desc = "";
		this.deptNo = "";
		this.category = "";
		this.children = [];
	}
	RsrcDir.prototype.fromXmlNode = function(xmlNode) {
		this.name = xmlNode.getAttribute("名稱");
		this.path = xmlNode.getAttribute("路徑");
		this.href = xmlNode.getAttribute("href");
		this.desc = xmlNode.getAttribute("描述");
		this.deptNo = xmlNode.getAttribute("單位代碼");
		this.category = xmlNode.getAttribute("分類");
		for(var i=0; i<xmlNode.childNodes.length; i++) {
			if(xmlNode.childNodes[i].tagName == "子目錄") {
				this.children.push(new RsrcDir());
				this.children[this.children.length-1].parent = this;
				this.children[this.children.length-1].fromXmlNode(xmlNode.childNodes[i]);
			}
			else if(xmlNode.childNodes[i].tagName == "檔案"){
				this.children.push(new RsrcFile());
				this.children[this.children.length-1].parent = this;
				this.children[this.children.length-1].fromXmlNode(xmlNode.childNodes[i]);
			}
		}
	}
	RsrcDir.prototype.cd = function(rsrc, create) {
		for(var i=0; i<this.children.length; i++) {
			if(this.children[i].type == RsrcConst.DIR && this.children[i].name == rsrc.name)
				return this.children[i];
		}
		if(create) {
			this.children.push(new RsrcDir());
			this.children[this.children.length-1].parent = this;
			this.children[this.children.length-1].name = rsrc.name;
			this.children[this.children.length-1].newly = true;
			return this.children[this.children.length-1];
		}
		return null;
	}
	RsrcDir.prototype.locate = function(rsrc, create) {
		for(var i=0; i<this.children.length; i++) {
			if(this.children[i].type == RsrcConst.FILE &&
			   ((rsrc.name == "" && this.children[i].path == rsrc.path) || (this.children[i].name == rsrc.name)))
				return this.children[i];
		}
		if(create) {
			this.children.push(new RsrcFile());
			this.children[this.children.length-1].parent = this;
			this.children[this.children.length-1].name = rsrc.name;
			this.children[this.children.length-1].newly = true;
			return this.children[this.children.length-1];
		}
		return null;
	}
	RsrcDir.prototype.setRemote = function(remote) {
		this.remote = remote;
		if(this.href != remote.href)
			this.href = remote.href;
		if(this.desc != remote.desc)
			this.desc = remote.desc;
		if(this.deptNo != remote.deptNo)
			this.deptNo = remote.deptNo;
		if(this.category != remote.category)
			this.category = remote.category;
	}
	RsrcDir.prototype.find = function(filters) {
		var res = [];
		for(var i=0; i<this.children.length; i++) {
			var match = true;
			for(var f in filters) {
				var v = (this.children[i].remote != undefined)?this.children[i].remote[f]:this.children[i][f];
				if(v == undefined || v != filters[f])
					match &= false;
			}
			if(match)
				res.push(this.children[i]);
		}
		return res;
	}
	RsrcDir.prototype.getFullPath = function() {
		if(this.parent)
			return this.parent.getFullPath() + "\\" + this.path;
		return new Error("RsrcDir物件未指定parent");
	}
	RsrcDir.prototype.getWFIOURL = function() {
		if(this.parent)
			return this.parent.getWFIOURL();
		return new Error("RsrcDir物件未指定parent");
	}
	RsrcDir.prototype.getCategory = function() {	// 2016.8.18 新增, for IE-compatible要過濾下載資源檔若為template, 一律轉為MSXML2.DOMDocument
		if(this.category.length > 0)
			return this.category;
		else if(this.parent)
			return this.parent.getCategory();
		return this.category;
	}
	
	function RsrcRepo() {
		this.children = [];
		this.persist = function(flag) {
			if(flag == RsrcConst.READ) {
				
			}
			else if(flag == RsrcConst.WRITE) {
				
			}
		}
		function mergeDir(local, remote) {
			for(var i=0; i<remote.children.length; i++) {
				if(remote.children[i].type == RsrcConst.FILE) {
					var fil = local.locate(remote.children[i], true);
					fil.setRemote(remote.children[i]);
//                    theLogger.log("merge file:");
//                    theLogger.log(fil);
				}
				else if(remote.children[i].type == RsrcConst.DIR) {
					var dir = local.cd(remote.children[i], true);
					dir.setRemote(remote.children[i]);
//                    theLogger.log("merge dir:");
//                    theLogger.log(dir);
					arguments.callee(dir, remote.children[i]);
				}
			}
		}
		this.import = function(xmlNode) {
			this.remote = new RsrcDir();
			this.remote.fromXmlNode(xmlNode);
			this.remote.WSDL = xmlNode.getAttribute("WSDL");
			this.remote.getFullPath = function() {
				return this.path;
			}
			this.remote.getWFIOURL = function() {
				return this.WSDL;
			}
			theLogger.log("remote:");
			theLogger.log(this.remote);
			mergeDir(this, this.remote);
		}
	}
	RsrcRepo.prototype = new RsrcDir();
	
	// Singleton object
	window.thePublicRsrc = {
		
		// public methods
		init: function() {
			theLogger.log("初始化(共用)資源檔...");
			var dfd = $.Deferred();
			// 先讀本地暫存的
			/*if(localStorage["LocalRsrcMgmt.xml"] != undefined) {
				var nd = (new DOMParser()).parseFromString(localStorage["LocalRsrcMgmt.xml"], "text/xml");
				theLogger.log(nd);
				thePublicRsrc.rsrcRepo.formXmlNode(nd);
			}*/
			var that = this;
			if(_initialized) {	// 2016.6.29 已初始化過就不要再呼叫WS
				theLogger.warn("重複呼叫!");
				dfd.resolve();
			}
			else {
				thePublicRsrc.rsrcRepo = new RsrcRepo();
				theWebServices.getPublicRsrc({
					success: function(xmlNode) {
						theLogger.log("遠端資源管理檔已下載成功, 檢查更新...");	// 1121107 Raymond 1120941 合併1120627, 資源檔->資源"管理"檔
						// TODO: 合併
						thePublicRsrc.rsrcRepo.import(xmlNode);
						
						_initialized = true;	// 2016.6.29 初始化成功, 記錄旗標
						dfd.resolve();
					},
					error: function(e) {
						theLogger.log("遠端資源管理檔下載失敗!");	// 1121107 Raymond 1120941 合併1120627, 資源檔->資源"管理"檔
						dfd.reject(e);
					}
				});
			}
			return dfd.promise();
		},
		
		enumDirs: function(category, callback) {
			// 1121107 Raymond 1120941 合併1120627, 新增判斷是否為被裁併機關的公文, 是則改用被裁併機關的資源管理檔搜尋資源檔, 修正登入系統後未開啟任何公文時, 點擊創稿面版無法顯示樣版清單的問題, 修正先開啟檢索側屜中的調閱被裁併機關的公文, 關閉後再點擊創稿面版會顯示成被裁併機關的樣版清單的問題
			var dissolveOrgNo = (!!window.theAOL && !!theAOL.getCurrFolio())?theAOL.docObj.get("ODWMSG", "DISSOLVE_ORG_NO"):undefined;
			if(!!dissolveOrgNo && !!this.rsrcRepoDissolve && dissolveOrgNo in this.rsrcRepoDissolve) {
				for(var i=0; i<this.rsrcRepoDissolve[dissolveOrgNo].children.length; i++) {
					if("category" in this.rsrcRepoDissolve[dissolveOrgNo].children[i] &&
					   this.rsrcRepoDissolve[dissolveOrgNo].children[i].category == category) {
						callback(this.rsrcRepoDissolve[dissolveOrgNo].children[i]);
					}
				}
			}
			else
			for(var i=0; i<this.rsrcRepo.children.length; i++) {
				if("category" in this.rsrcRepo.children[i] &&
				   this.rsrcRepo.children[i].category == category) {
					callback(this.rsrcRepo.children[i]);
				}
			}
		},
		
		// 1100310 Raymond 1090991 新增defPrintXSLName參數
		// 2014.10.22 - 新增origPrintXSL參數
		// 2016.7.25 - 新增options參數
		// 2016.8.12 - 新增showPara參數
		//applyPrintXSLT: function(xmlDoc, docType, subDocType, origPrintXSL, options, showPara) {
		applyPrintXSLT: function(xmlDoc, docType, subDocType, origPrintXSL, options, showPara, defPrintXSLName) {
			theLogger.log("applyPrintXSLT('" + docType + "', '" + subDocType + "', '" + origPrintXSL + "')");
			var dfd = $.Deferred();
			// 1121107 Raymond 1120941 合併1120627, 新增判斷是否為被裁併機關的公文, 是則改用被裁併機關的資源管理檔搜尋應套用的排版設定檔
			// 搜尋相符文別、函類別的排版設定檔
			//var dirs = this.rsrcRepo.find({category: "排版設定"});
			var dirs = [], dissolveOrgNo = theAOL.docObj.get("ODWMSG", "DISSOLVE_ORG_NO");
			if(!!dissolveOrgNo) {
				theLogger.log("本文為被裁併機關(OrgNo:" + dissolveOrgNo + ")之公文, 搜尋被裁併機關之資源管理檔下應套用的排版設定檔...");
				if(!!this.rsrcRepoDissolve && dissolveOrgNo in this.rsrcRepoDissolve) {
					dirs = this.rsrcRepoDissolve[dissolveOrgNo].find({category: "排版設定"});
					doApplyPrintXSLT.apply(this);
				}
				else {	// 尚未初始化被裁併機關的資源管理檔
					var that = this;
					this.initDissolveRsrc(dissolveOrgNo).done(function() {
						dirs = that.rsrcRepoDissolve[dissolveOrgNo].find({category: "排版設定"});
						doApplyPrintXSLT.apply(that);
					})
					.fail(function(e) {
						theLogger.error("被裁併機關(OrgNo:" + dissolveOrgNo + ")的資源管理檔下載失敗:" + e + "\n改回套用本機關的排版設定檔...");
						dirs = that.rsrcRepo.find({category: "排版設定"});
						doApplyPrintXSLT.apply(that);
					});
					return dfd.promise();
				}
			}
			else {
				dirs = this.rsrcRepo.find({category: "排版設定"});
				doApplyPrintXSLT.apply(this);
			}
			function doApplyPrintXSLT() {
			if(dirs.length == 0) {
				dfd.reject("資源管理檔中找不到\"排版設定\"分類的子目錄!");
			}
			else {
				if(origPrintXSL != undefined && origPrintXSL.length > 0) {
					if(origPrintXSL == "reset") {	// 2017.3.21 新增當origPrintXSL參數設為'reset'時, 需重設搜尋適合的樣版檔
						theLogger.warn("需要重新搜尋適合的樣版檔");
					}
					else {
						var p = origPrintXSL.split('\\');
						var origPrintXSLFileName = p[p.length-1];
					}
				}
				var that = this;	//2017.01.17	Leslie	加了Cache後,可能會來不及宣告，移到最前面
				var foundFil = null, foundFiles = [];
				// 1110505 Raymond 1110521 新增支援調閱歷史公文直接載入DI顯示套用樣版頁面之功能, 修正當文稿DI為"來文頁面"時, 改搜尋"文"類型排版設定檔
				var searchFormalCate = false;
				if(!!options && "稿序" in options && options["稿序"] == "來文頁面")
					searchFormalCate = true;
				// 1120822 Raymond 1120494 新增本件公文的OWNOU的一級單位代碼, 及前次記憶的排版設定檔選擇
				// 1120919 Raymond 序213 修正檢索側屜開啟的公文沒有ownOUId導致發生Error的問題
				//let lv1OU = theAOL.docObj.ownOUId.substr(0, 2),
				let lv1OU = theAOL.docObj.get("ODWMSG", "OWN_OU_ID").substr(0, 2),
					strPreferPrintXSL = theSSO.User.EnvSettings.get("USER_PREFER_PRINTXSL"),
					preferPrintXSL = {},
					preferKey = docType + "," + (subDocType || "") + ",稿",	// 記憶的排版設定檔名稱用"文別,函類別,稿"做為記錄名稱
					defSelectedIndex = 0;
				// 1130816 Raymond 1130313 離線模式不要呼叫GetUserEnvSetting
				//if(strPreferPrintXSL.length == 0) {
				if(strPreferPrintXSL.length == 0 && (!theSSO || theSSO.offlineMode != true)) {
					strPreferPrintXSL = theWebServices.QueryDoc.GetUserEnvSetting(theSSO.Artifact, "USER_PREFER_PRINTXSL").RtnStr;	// 從個人環境變數中取得
					theSSO.User.EnvSettings["USER_PREFER_PRINTXSL"] = strPreferPrintXSL;
				}
				if(strPreferPrintXSL.length > 0)
					preferPrintXSL = JSON.parse(strPreferPrintXSL);
				for(var i=0; i<dirs.length; i++) {
					for(var j=0; j<dirs[i].children.length; j++) {
						var fil = dirs[i].children[j];
						//theLogger.log(fil);
						// 用文別及函類別在資源管理檔中搜尋最適合的排版設定檔
						// 2015.1.23 - Raymond, 若有提供origPrintXSL, 則應以該檔名做為搜尋條件, 完全找不到該檔名才用最適搜尋
						// 2015.4.30 - Raymond, 修正比對的是fil.path或fil.remote.path不是fil.name
						if(origPrintXSLFileName != undefined && ((fil.path != '' && origPrintXSLFileName == fil.path) || (fil.remote.path != '' && origPrintXSLFileName == fil.remote.path))) {
							theLogger.log("[" + j + "]'" + fil.docType + "', '" + fil.category + "', '" + fil.subDocType + "' MATCH(原排版設定檔)!");
							theLogger.log("找到指定的排版設定檔 '" + fil.name + "'(local:" + fil.path + ", remote:" + ((fil.remote != undefined)?fil.remote.path:"no remote") + ")");
							foundFil = fil;
							break;
						}
						// 1100310 Raymond 1090991 新增若傳入"預設排版"名稱, 則搜尋排版設定檔名稱相符者
						else if(!!defPrintXSLName && (fil.name != '' && defPrintXSLName == fil.name)) {
							theLogger.log("[" + j + "]'" + fil.docType + "', '" + fil.category + "', '" + fil.subDocType + "' MATCH(預設排版)!");
							theLogger.log("找到指定的排版設定檔 '" + fil.name + "'(local:" + fil.path + ", remote:" + ((fil.remote != undefined)?fil.remote.path:"no remote") + ")");
							foundFil = fil;
							break;
						}
						else if (fil.docType == docType &&
						   (subDocType == undefined || !subDocType.length || fil.subDocType == subDocType || fil.subDocType == "") &&	// 2016.11.1 RsrcMgmt.xml若定義函類別是空值則表示符合可套用條件, 避免既有樣版已設定非空值的函類別會找不到對應的排版設定檔問題
							// 1110505 Raymond 1110521 新增支援調閱歷史公文直接載入DI顯示套用樣版頁面之功能, 修正當文稿DI為"來文頁面"時, 改搜尋"文"類型排版設定檔
							//fil.category != "文" && foundFil == null) {
							((searchFormalCate)?fil.category == "文":fil.category != "文") && foundFil == null) {
							// 1120821 Raymond 1120494 新增檢核排版設定檔是否有設定allowOU, 若有則檢核OWNOU是否符合, 若不符合則略過此排版設定檔選項
							if(!!fil.allowOU || (!!fil.remote && !!fil.remote.allowOU)) {
								let allowOU = fil.allowOU || fil.remote.allowOU;
								if(allowOU.indexOf(",") >= 0) {
									if(allowOU.split(",").indexOf(lv1OU) < 0) {
										theLogger.log("[" + j + "]'" + fil.docType + "', '" + fil.category + "', '" + fil.subDocType + "' 適用單位:" + allowOU + ", 不符合(" + lv1OU + ") 忽略!");
										continue;
									}
								}
								else if(allowOU != lv1OU) {
									theLogger.log("[" + j + "]'" + fil.docType + "', '" + fil.category + "', '" + fil.subDocType + "' 適用單位:" + allowOU + ", 不符合(" + lv1OU + ") 忽略!");
									continue;
								}
							}
							// 1120822 Raymond 1120494 新增檢核此排版設定檔是否為前次選取的, 是則預設選取
							if(!searchFormalCate &&	// 來文DI不支援記憶前次選取排版設定檔功能
								!!preferPrintXSL[preferKey] && preferPrintXSL[preferKey] == fil.name) {
								defSelectedIndex = foundFiles.length;
								theLogger.log("[" + j + "]'" + fil.docType + "', '" + fil.category + "', '" + fil.subDocType + "' MATCH(前次記憶選取)!");
							}
							else
							theLogger.log("[" + j + "]'" + fil.docType + "', '" + fil.category + "', '" + fil.subDocType + "' MATCH!");
							theLogger.log("找到排版設定檔 '" + fil.name + "'(local:" + fil.path + ", remote:" + ((fil.remote != undefined)?fil.remote.path:"no remote") + ")");
							foundFiles.push(fil);	// 2016.4.7 以匹配比對的可能有複數符合
							//break;
						}
						else
							theLogger.log("[" + j + "]'" + fil.docType + "', '" + fil.category + "', '" + fil.subDocType + "', '" + fil.remote.path + "'");
					}
				}
				if(foundFil)	// 找到指定的排版設定檔
					doApply(foundFil);
				else if(foundFiles.length == 1) {	// 2016.4.7 若只有一個符合的排版設定檔則直接套用
					foundFil = foundFiles[0];
					doApply(foundFil);
				}
				// 1121222 Raymond 領務局需求序22 修正DocView開啟一代紙本公文因無記錄排版設定檔資訊而出現排版設定檔選單問題, 改為判斷環境變數「WE_DOC_VIEW_APPLY_FIRST_MATCH_PRINTXSL」設為"Y"時, 直接套用第1個符合的排版設定檔
				else if(foundFiles.length > 1 && $("#viewDoc").length && theSSO.User.EnvSettings.get("WE_DOC_VIEW_APPLY_FIRST_MATCH_PRINTXSL") == "Y") {
					theLogger.log("DocView開啟公文有多組符合的排版設定檔則直接套用第一筆, 不要顯示排版設定檔選單");
					foundFil = foundFiles[0];
					doApply(foundFil);
				}
				else if(foundFiles.length > 0) {// 有複數符合的排版設定檔則提問
					/*var msg = "請選擇欲套用的排版設定檔:\n";
					for(var i=0; i<foundFiles.length; i++) {
						msg += (i+1) + ". '" + foundFiles[i].name + "'\n";
					}
					alert(msg);*/
					var param = {
						title: "請選擇欲套用的排版設定檔",
						selectItems: [],
						selectedIndex: defSelectedIndex,	// 1120822 Raymond 1120494 0->defSelectedIndex
						buttons: [
							{	name: "確定",
								action: function(selectedIndex) {
									theLogger.log("使用者選擇項目" + selectedIndex);
									foundFil = foundFiles[selectedIndex];
									// 1120703 Raymond 標檢局序98 開啟一代紙本簽核若有2筆以上函稿, 會發生詢問套用樣版檔一次後卡住(已經有一個confirmOverlay在畫面中!), 導致轉圈圈無法開啟的問題
									// 原因為doApply後會resove, 然後外部會直接accquireDraftModel下一筆函稿, 但前一個confirm還沒hide, 解法是將doApply搬到afterHide執行
									//doApply(foundFil);
									// 1120822 Raymond 1120494 新增記憶選取的PrintXSL
									if(!searchFormalCate && selectedIndex != defSelectedIndex) {
										preferPrintXSL[preferKey] = foundFil.name;
										strPreferPrintXSL = JSON.stringify(preferPrintXSL);
										theSSO.User.EnvSettings["USER_PREFER_PRINTXSL"] = strPreferPrintXSL;
										// 1130816 Raymond 1130313 離線模式不要呼叫UpdateUserEnvSet
										if(!theSSO || theSSO.offlineMode != true)
										theWebServices.QueryDoc.UpdateUserEnvSet(theSSO.Artifact, "USER_PREFER_PRINTXSL", strPreferPrintXSL, false);
									}
								}
							},
							{	name: "取消",
								action: function() {
									theLogger.log("使用者選擇取消!");
									// 1120703 Raymond 標檢局序98 開啟一代紙本簽核若有2筆以上函稿, 會發生詢問套用樣版檔一次後卡住(已經有一個confirmOverlay在畫面中!), 導致轉圈圈無法開啟的問題
									// 原因為reject後外部會直接accquireDraftModel下一筆函稿, 但前一個confirm還沒hide, 解法是將reject搬到afterHide執行
									//dfd.reject("使用者取消套用排版設定檔!");
								}
							}
						],
						beforeShow: function() {},
						afterHide: function() {
							// 1120703 Raymond 標檢局序98 開啟一代紙本簽核若有2筆以上函稿, 會發生詢問套用樣版檔一次後卡住(已經有一個confirmOverlay在畫面中!), 導致轉圈圈無法開啟的問題
							// 原因為doApply後會resove或取消會reject, 然後外部會直接accquireDraftModel下一筆函稿, 但前一個confirm還沒hide, 解法是將doApply/reject搬到afterHide執行
							if(!!foundFil)
								doApply(foundFil);
							else
								dfd.reject("使用者取消套用排版設定檔!");
						}
					};
					for(var i=0; i<foundFiles.length; i++) {
						param.selectItems.push(foundFiles[i].name);
					}
					// 1131101 Raymond 勤益序337 修正開啟公文時若同時有2筆以上文稿需選擇排版設定檔, 會卡在第2筆文稿的詢問子視窗無法顯示, 導致轉圈圈問題
					if($("#confirmOverlay").length) {
						console.debug("目前已經有一個詢問子視窗在畫面中, 延遲1秒再詢問");
						function retry() {
							if($("#confirmOverlay").length) {
								console.debug("目前已經有一個詢問子視窗在畫面中, 延遲1秒再詢問");
								setTimeout(arguments.callee, 1000);
							}
							else
								$.confirm(param);
						};
						setTimeout(retry, 1000);
					}
					else
					$.confirm(param);
				}
				else
					dfd.reject("找不到符合的排版設定檔");
				
				//var that = this;	//2017.01.17	Leslie	加了Cache後,可能會來不及宣告，移到最前面
				function doApply(foundFil) {
					//2017.01.18	Leslie	為求效能，針對本函式呼叫theCacheMgr.get()增加參數，以強制取得指定類型之XML物件(for IE)
					if("ActiveXObject" in window)
						foundFil.IE = true;
					// 新方法
					theCacheMgr.get({type: "rsrc", rsrc: foundFil})
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
									var v;
									if(options && "新系統" in options && options['新系統'] == false) {	// 2016.7.25 新增支援'新系統'選項
										theLogger.log("套用指定的排版參數[新系統]: false");
									}
									else {
										v = xslDoc.evaluate("xsl:variable[@name='新系統']", xslDoc.documentElement, nsResolver, 7, null);
										if(v != null && v.snapshotLength > 0) {
											var newSys = v.snapshotItem(0);
											newSys.textContent = "true";
											theLogger.log("套用預設的排版參數[新系統]: true");
										}
										else	// 2015.3.19 - 新增警告訊息
											theLogger.warn("排版設定檔中找不到[新系統]變數, 可能未對行動平台最佳化!");
									}
									if(options && "檢視模式" in options) {	// 2016.7.25 新增支援'檢視模式'選項
										v = xslDoc.evaluate("xsl:variable[@name='檢視模式']", xslDoc.documentElement, nsResolver, 7, null);
										if(v != null && v.snapshotLength > 0) {
											var viewMode = v.snapshotItem(0);
											viewMode.textContent = options['檢視模式'];
											theLogger.log("套用指定的排版參數[檢視模式]: '" + viewMode.textContent + "'");
										}
									}
									else {
										// 2015.3.19 - 新增檢視模式預設"1"(追蹤修訂模式)
										v = xslDoc.evaluate("xsl:variable[@name='檢視模式']", xslDoc.documentElement, nsResolver, 7, null);
										if(v != null && v.snapshotLength > 0) {
											var viewMode = v.snapshotItem(0);
											if(viewMode.textContent != "1") {
												theLogger.log("預設排版參數[檢視模式]從'" + viewMode.textContent + "'改成'1'");
												viewMode.textContent = "1";
											}
										}
									}
									if(options && "自訂" in options) {	// 2016.7.25 新增支援'自訂'選項
										v = xslDoc.evaluate("xsl:variable[@name='自訂']", xslDoc.documentElement, nsResolver, 7, null);
										if(v != null && v.snapshotLength > 0) {
											var applyCustom = v.snapshotItem(0);
											applyCustom.textContent = options['自訂'];
											theLogger.log("套用指定的排版參數[自訂]: '" + applyCustom.textContent + "'");
										}
									}
									else {
										// 2015.7.24 - 預設套用自訂段落設定
										v = xslDoc.evaluate("xsl:variable[@name='自訂']", xslDoc.documentElement, nsResolver, 7, null);
										if(v != null && v.snapshotLength > 0) {
											var applyCustom = v.snapshotItem(0);
											//applyCustom.textContent = "true";	// 2015.10.8 預設不套用自訂, 因為國合會說的
											// 1061024 Raymond 1060980 從文稿讀出'套用自訂'屬性, 若設為True則表示已設定過段落屬性, 應套用自訂
											var v2 = xmlDoc.evaluate("@套用自訂", xmlDoc.documentElement, nsResolver, 7, null);
											if(v2 != null && v2.snapshotLength > 0) {
												theLogger.log("套用已記錄於文稿的'套用自訂'屬性:" + v2.snapshotItem(0).nodeValue);
												applyCustom.textContent = (v2.snapshotItem(0).nodeValue == "True")?"true":"false";
											}
										}
									}
									// 2016.7.1 - 預設套用併案文號
									var odwdcm = theAOL.docObj.getODWDCM();	// 2016.9.1 FIX, 檢索調閱公文沒有ODWDCM
									if(odwdcm && "COM_NO" in odwdcm) {
										var comNo = "";
										if(SSOUtil.typeOf(theAOL.docObj.ODWDCM.COM_NO) == "array") {
											for(var i=0; i<theAOL.docObj.ODWDCM.COM_NO.length; i++)
												comNo += (theAOL.docObj.ODWDCM.COM_NO[i].COM_DOC_NO + ";");
										}
										else {
											theLogger.error("ODWDCM.COM_NO非陣列結構!?");
										}
										
										v = xslDoc.evaluate("xsl:variable[@name='併案文號']", xslDoc.documentElement, nsResolver, 7, null);
										if(v != null && v.snapshotLength > 0) {
											var applyComNo = v.snapshotItem(0);
											applyComNo.textContent = comNo;
										}
									}
									// 2016.7.25 新增支援其它選項
									if(options) {
										for(opt in options) {
											if(opt == "新系統" || opt == "檢視模式" || opt == "自訂")
												continue;
											
											v = xslDoc.evaluate("xsl:variable[@name='" + opt + "']", xslDoc.documentElement, nsResolver, 7, null);
											if(v != null && v.snapshotLength > 0) {
												var paramNode = v.snapshotItem(0);
												paramNode.textContent = options[opt];
												theLogger.log("套用指定的排版參數[" + opt + "]: '" + paramNode.textContent + "'");
											}
										}
									}
									// 2016.8.12 新增顯示段落功能
									if(showPara) {
										v = xslDoc.evaluate("//xsl:with-param[@name='nodispifempty']", xslDoc.documentElement, nsResolver, 7, null);
										if(SSOUtil.typeOf(showPara) == "array") {
											for(var i=0; i<showPara.length; i++) {
												var re = new RegExp("@段名='" + showPara[i], "g");
												for(var j=0; j<v.snapshotLength; j++) {
													var sel = $(v.snapshotItem(j).parentNode).attr("select");
													if(sel.match(re)) {
														theLogger.warn("指定'" + sel + "'的nodispifempty參數為0");
														v.snapshotItem(j).textContent = "0";
														break;
													}
												}
											}
										}
									}
									// 1091016 Raymond 1090621 新增偵測樣版檔是否提供了"令條列"功能, 以做為應否套用令條列凸排2個字功能的依據
									var bSupport1090621Feature = false;
									v = xslDoc.evaluate("xsl:template[@name='令條列']", xslDoc.documentElement, nsResolver, 7, null);
									if(!!v && v.snapshotLength > 0)
										bSupport1090621Feature = true;
									
									// 1140711 Raymond 1140958 新增偵測樣版檔是否已改成會銜令比照令的凸排方式
									v = xslDoc.evaluate("xsl:template[@match='條列']/xsl:choose/xsl:when", xslDoc.documentElement, nsResolver, 7, null);
									if(!!v && v.snapshotLength > 0) {
										for(var i=0; i<v.snapshotLength; i++) {
											let tst = v.snapshotItem(i).getAttribute("test");
											if(!!tst && tst == "(name(/*)='令' and (/*/令類別/@代碼='令' or /*/函類別/@代碼='令' or /*/令類別/@代碼='會銜令')) or name(/*)='會銜令'") {
												theLogger.log("樣版支援會銜令比照令的凸排方式");
												bSupport1090621Feature = 2;
											}
										}
									}
									
									v = xslDoc.evaluate("xsl:variable[@name='dataXml']", xslDoc.documentElement, nsResolver, 7, null);
									if(v != null && v.snapshotLength > 0) {
										var dataXml = v.snapshotItem(0);
										theLogger.log(dataXml);
										// 1120901 Raymond 1120407 修正取得DataXML時以本件公文的機關代碼為準, 而非目前切換的activeRole的機關代碼
										//that.getDataXML(Common.activeRole.orgNo)
										that.getDataXML(theAOL.docObj.sourceOrgNo)
											.done(function(datDoc) {
												// 2016.8.26 在Common全域物件中新增發文字清單, 給取得發文字號功能使用
												if("Common" in window) {
													theLogger.log("預先取得發文字清單設定至Common.nsIssueWord");
													Common.ndIssueWord = $(datDoc.documentElement).find("data[type='發文字']");
												}
												
												theLogger.log("填入Data.XML節點至dataXml變數");
												dataXml.appendChild(datDoc.documentElement);
											})
											.fail(function(errorText) {
												theLogger.warn(errorText);
											})
											.always(function() {
												theLogger.log("xsl, xml:");
												theLogger.log(xslDoc);
												theLogger.log(xmlDoc);
												//try {
													var xslt = new XSLTProcessor();
													xslt.importStylesheet(xslDoc);
													var ownerDocument = document.implementation.createDocument("", "", null);	// 2016.8.4 照MDN範例
													var res = xslt.transformToFragment(xmlDoc, ownerDocument);
													if(res) {	// 2016.8.4 新增判斷轉換結果, 回傳null可能是PrintXSL有問題
														//dfd.resolve(res, foundFil.remote.getDirPath(), foundFil.remote.path, foundFil.category);	// 2016.8.1 新增多回傳樣版類型
														dfd.resolve(res, foundFil.remote.getDirPath(), foundFil.remote.path, foundFil.category, bSupport1090621Feature);	// 1091016 Raymond 1090621 新增回傳樣版檔支援"令條列"功能旗標
													}
													else {
														dfd.reject("套用PrintXSL(transfromToFragment)失敗!");
													}
												//}
												//catch(e) {
												//	theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
												//	dfd.reject(e.message);
												//}
											});
									}
									else {
										theLogger.log("xsl, xml:");
										theLogger.log(xslDoc);
										theLogger.log(xmlDoc);
										try {
											var xslt = new XSLTProcessor();
											xslt.importStylesheet(xslDoc);
											var res = xslt.transformToFragment(xmlDoc, document);
											if(res) {	// 2016.8.4 新增判斷轉換結果, 回傳null可能是PrintXSL有問題
												//dfd.resolve(res, foundFil.remote.getDirPath(), foundFil.remote.path, foundFil.category);	// 2014.10.22 - Raymond, 增加回傳實際取用的server上的遠端資源檔目錄, 2016.8.1 新增多回傳樣版類型
												dfd.resolve(res, foundFil.remote.getDirPath(), foundFil.remote.path, foundFil.category, bSupport1090621Feature);	// 1091016 Raymond 1090621 新增回傳樣版檔支援"令條列"功能旗標
											}
											else {
												dfd.reject("套用PrintXSL(transfromToFragment)失敗!");
											}
										}
										catch(e) {
											theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
											dfd.reject(e.message);
										}
									}
								}
								else {	// IE, 2016.5 - Raymond modify.
									//2017.01.18	Leslie	為求效能，已強制取得MSXML2物件(for IE，但僅為後續取得Cache檔案時有作用)
									if(!("selectSingleNode" in xslDoc)) {	// 2017.1.18 xslDoc不是MSXML2物件的話, 則重新轉換為MSXM
										var str = Util.getXml(xslDoc);
										xslDoc = new ActiveXObject("MSXML2.DOMDocument");
										var res = xslDoc.loadXML(str);
										if(!res) {
											var pe = xslDoc.parseError;
											theLogger.error("載入XSL失敗! " + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
											dfd.reject(pe.reason);
										}
									}
									/*else*/ {
										if(options && "新系統" in options && options['新系統'] == false) {	// 2016.7.25 新增支援'新系統'選項
											theLogger.log("套用指定的排版參數[新系統]: false");
										}
										else {
											var newSys = xslDoc.selectSingleNode("/*/xsl:variable[@name='新系統']");
											if(newSys)
												newSys.text = "true";
											else	// 警告訊息
												theLogger.error("排版設定檔中找不到[新系統]變數, 可能未對行動平台最佳化!");
										}
										if(options && "檢視模式" in options) {	// 2016.7.25 新增支援'檢視模式'選項
											var viewMode = xslDoc.selectSingleNode("/*/xsl:variable[@name='檢視模式']");
											if(viewMode) {
												if(viewMode.text != options['檢視模式']) {
													theLogger.log("排版設定檔[檢視模式]變數從'" + viewMode.text + "'改成'" + options['檢視模式'] + "'");
													viewMode.text = options['檢視模式'];
												}
											}
											else
												theLogger.error("PrintXSL中找不到'檢視模式'參數, 無法設定!");
										}
										else {// 2015.3.19 - 新增檢視模式預設"1"(追蹤修訂模式)
											var viewMode = xslDoc.selectSingleNode("/*/xsl:variable[@name='檢視模式']");
											if(viewMode) {
												if(viewMode.text != "1") {
													theLogger.log("排版設定檔[檢視模式]變數從'" + viewMode.text + "'改成'1'");
													viewMode.text = "1";
												}
											}
										}
										if(options && "自訂" in options) {	// 2016.7.25 新增支援'自訂'選項
											var applyCustom = xslDoc.selectSingleNode("/*/xsl:variable[@name='自訂']");
											if(applyCustom) {
												if(applyCustom.text != options['自訂']) {
													theLogger.log("排版設定檔[自訂]變數從'" + applyCustom.text + "'改成'" + options['自訂'] + "'");
													applyCustom.text = options['自訂']?"true":"false";	// 2016.12.13 bugfix
												}
											}
											else
												theLogger.error("PrintXSL中找不到'自訂'參數, 無法設定!");
										}
										else {
											// 2015.7.24 - 預設套用自訂段落設定
											var applyCustom = xslDoc.selectSingleNode("/*/xsl:variable[@name='自訂']");
											if(applyCustom) {
												/*if(applyCustom.text != "true") {
													theLogger.log("排版設定檔[自訂]變數設為'true'");
													applyCustom.text = "true";	// 2015.10.8 預設不套用自訂, 因為國合會說的
												}*/
												// 1061024 Raymond 1060980 從文稿讀出'套用自訂'屬性, 若設為True則表示已設定過段落屬性, 應套用自訂
												var applyCustom2 = xmlDoc.documentElement.getAttribute("套用自訂");
												if(!!applyCustom2) {
													theLogger.log("套用已記錄於文稿的'套用自訂'屬性:" + applyCustom2);
													applyCustom.text = (applyCustom2 == "True")?"true":"false";
												}
											}
										}
										// 2016.7.1 - 預設套用併案文號
										var odwdcm = theAOL.docObj.getODWDCM();	// 2016.9.1 FIX, 檢索調閱公文沒有ODWDCM
										if(odwdcm && "COM_NO" in odwdcm) {
											var comNo = "";
											if(SSOUtil.typeOf(theAOL.docObj.ODWDCM.COM_NO) == "array") {
												for(var i=0; i<theAOL.docObj.ODWDCM.COM_NO.length; i++)
													comNo += (theAOL.docObj.ODWDCM.COM_NO[i].COM_DOC_NO + ";");
											}
											else {
												theLogger.error("ODWDCM.COM_NO非陣列結構!?");
											}
											
											var applyComNo = xslDoc.selectSingleNode("/*/xsl:variable[@name='併案文號']");
											if(applyComNo) {
												applyComNo.text = comNo;
											}
										}
										// 2016.7.25 新增支援其它選項
										if(options) {
											for(opt in options) {
												if(opt == "新系統" || opt == "檢視模式" || opt == "自訂")
													continue;
												
												var paramNode = xslDoc.selectSingleNode("/*/xsl:variable[@name='" + opt + "']");
												if(paramNode) {
													if(typeof options[opt] === "boolean")	// 2016.10.13 修正IE不會分繕列印的問題
														paramNode.text = options[opt]?"true":"false";
													else
														paramNode.text = options[opt];
													theLogger.log("套用指定的排版參數[" + opt + "]: '" + paramNode.text + "'");
												}
												else
													theLogger.error("PrintXSL中找不到'" + opt + "'參數, 無法設定!");
											}
										}
										// 2016.8.12 新增顯示段落功能
										if(showPara) {
											var ps = xslDoc.selectNodes("//xsl:with-param[@name='nodispifempty']");
											if(SSOUtil.typeOf(showPara) == "array") {
												for(var i=0; i<showPara.length; i++) {
													var re = new RegExp("@段名='" + showPara[i], "g");
													for(var j=0; j<ps.length; j++) {
														var sel = $(ps[j].parentNode).attr("select");
														if(sel.match(re)) {
															theLogger.warn("指定'" + sel + "'的nodispifempty參數為0");
															ps[j].text = "0";
															break;
														}
													}
												}
											}
										}
										// 1091016 Raymond 1090621 新增偵測樣版檔是否提供了"令條列"功能, 以做為應否套用令條列凸排2個字功能的依據
										var bSupport1090621Feature = false;
										var tmpl1090621 = xslDoc.selectSingleNode("/*/xsl:template[@name='令條列']");
										if(!!tmpl1090621)
											bSupport1090621Feature = true;
										
										var dataXml = xslDoc.selectSingleNode("/*/xsl:variable[@name='dataXml']");
										if(dataXml) {
											// 1120901 Raymond 1120407 修正取得DataXML時以本件公文的機關代碼為準, 而非目前切換的activeRole的機關代碼
											//that.getDataXML(Common.activeRole.orgNo,true)	//2017.01.19	Leslie	增加傳入是否取得MSXML2物件
											that.getDataXML(theAOL.docObj.sourceOrgNo,true)	//2017.01.19	Leslie	增加傳入是否取得MSXML2物件
												.done(function(datDoc) {
													// 2016.8.26 在Common全域物件中新增發文字清單, 給取得發文字號功能使用
													if("Common" in window) {
														theLogger.log("預先取得發文字清單設定至Common.nsIssueWord");
														Common.ndIssueWord = $(datDoc.documentElement).find("data[type='發文字']");
													}
													
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
															theLogger.error("載入DATA.XML失敗! " + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
														}
													}
												})
												.fail(function(errorText) {
													theLogger.warn(errorText);
												})
												.always(function() {
													theLogger.log("xsl, xml:");
													try {	// for IE-compatible
														theLogger.log(xslDoc.xml);
														theLogger.log(xmlDoc.xml);
													}
													catch(e) {
														theLogger.error("dump xml failed! - " + e.message);
													}
													try {
														res = xmlDoc.transformNode(xslDoc);
														if(res) {
															theLogger.log("transformNode='" + res + "'");
															res = (new DOMParser).parseFromString(res, "text/xml");
															if(res)
																//dfd.resolve(res, foundFil.remote.getDirPath(), foundFil.remote.path, foundFil.category);	// 2016.8.1 新增多回傳樣版類型
																dfd.resolve(res, foundFil.remote.getDirPath(), foundFil.remote.path, foundFil.category, bSupport1090621Feature);	// 1091016 Raymond 1090621 新增回傳樣版檔支援"令條列"功能旗標
															else
																dfd.reject("套用PrintXSL(parseFromString)失敗!");
														}
														else
															dfd.reject("套用PrintXSL(transformNode)失敗!");
													}
													catch(e) {
														theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
														dfd.reject("套用PrintXSL失敗! " + e.message);
													}
												});
										}
										else {	// 未宣告<xsl:variable name='dataXml'>, 則不下載DataXML直接轉
											theLogger.log("xsl, xml:");
											try {	// for IE-compatible
												theLogger.log(xslDoc);
												theLogger.log(xmlDoc);
											}
											catch(e) {
												theLogger.error("dump xml failed! - " + e.message);
											}
											try {
												res = xmlDoc.transformNode(xslDoc);
												if(res) {
													theLogger.log("transformNode='" + res + "'");
													res = (new DOMParser).parseFromString(res, "text/xml");
													if(res)
														//dfd.resolve(res, foundFil.remote.getDirPath(), foundFil.remote.path, foundFil.category);	// 2016.8.1 新增多回傳樣版類型
														dfd.resolve(res, foundFil.remote.getDirPath(), foundFil.remote.path, foundFil.category, bSupport1090621Feature);	// 1091016 Raymond 1090621 新增回傳樣版檔支援"令條列"功能旗標
													else
														dfd.reject("套用PrintXSL(parseFromString)失敗!");
												}
												else
													dfd.reject("套用PrintXSL(transformNode)失敗!");
											}
											catch(e) {
												theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
												dfd.reject("套用PrintXSL失敗! " + e.message);
											}
										}
									}
								}
							}
							else {
								theLogger.error("無法套用PrintXSL! xslDoc不存在");
								dfd.reject("無法套用PrintXSL! xslDoc不存在");
							}
						})
						.fail(function(errorText) {
							dfd.reject(errorText);
						});
					/* 舊方法(AJAX)
					var path = "PrintXSL_AJAX/" + fil.remote.path;
					theLogger.log("找到排版設定檔'" + path + "'");
					$.ajax(path, {
						type: "GET",
						async: true,
						success: function(data, statusText, jqXHR) {
							
							theLogger.log("下載成功, XSLT轉換...");
							theLogger.log(typeof jqXHR.responseText);
							theLogger.log("比較xslstr及jqXHR.responseText: " + (xslstr == jqXHR.responseText));
							var xslDoc2 = (new DOMParser()).parseFromString(jqXHR.responseText, "text/xml");
							theLogger.log(typeof xslDoc2);
							var xsltProc = new XSLTProcessor();
							xsltProc.importStylesheet(xslDoc2);
							var res = xsltProc.transformToFragment(xmlDoc, document);
							theLogger.log(res);
							_dfd.resolve(res);
						},
						error: function(jqXHR, textStatus, errorThrown) {
							_dfd.reject("下載排版設定檔失敗! " + textStatus);
						}
					});*/
				}
			}
			}	// end of doApplyPrintXSLT()
			return dfd.promise();
		},
		
		getSymbolText: function() {
			theLogger.log("getSymbolText...");
			var dfd = $.Deferred();
			// 搜尋相符文別、函類別的排版設定檔
			var dirs = this.rsrcRepo.find({category: "其他"});
			if(dirs.length == 0) {
				dfd.reject("資源管理檔中找不到\"其它\"分類的子目錄!");
			}
			else {
				for(var i=0; i<dirs.length; i++) {
					for(var j=0; j<dirs[i].children.length; j++) {
						var fil = dirs[i].children[j];
						//theLogger.log(fil);
						if (fil.name == "符號表") {
							theLogger.log("找到符號表檔 '" + fil.name + "'(local:" + fil.path + ", remote:" + ((fil.remote != undefined)?fil.remote.path:"no remote") + ")");
							// 新方法
							theCacheMgr.get({type: "rsrc", rsrc: fil})
								.done(function(txt) {
									//theLogger.log(txt);
									if(txt != undefined) {
										dfd.resolve(txt);
									}
								})
								.fail(function(errorText) {
									dfd.reject(errorText);
								});
							return dfd;
						}
					}
				}
				dfd.reject("找不到符號表檔");
			}
			return dfd;
		},
		
		getSealMarkImage: function(orgNo, ouID) {
			theLogger.log("getSealMarkImage...");
			// 1120828 Raymond 1120750 新增判斷有新舊機關代碼轉換物件, 則套用轉換為新代碼
			if(!!theSSO && !!theSSO.OrgMap) {
				if(orgNo in theSSO.OrgMap) {
					theLogger.log("'" + orgNo + "'依OrgMap轉換為新代碼:" + theSSO.OrgMap[orgNo]);
					orgNo = theSSO.OrgMap[orgNo];
				}
				else {
					theLogger.warn("OrgMap中無'" + orgNo + "'對應新機關代碼!");
				}
			}
			var dfd = $.Deferred();
			// 1121107 Raymond 1120941 合併1120627, 新增判斷是否為被裁併機關的公文, 是則改用被裁併機關的資源管理檔搜尋應套用的騎縫章圖檔
			//var dirs = this.rsrcRepo.find({category: "騎縫章"});
			var dirs = [], dissolveOrgNo = theAOL.docObj.get("ODWMSG", "DISSOLVE_ORG_NO");
			if(!!dissolveOrgNo) {
				theLogger.log("本文為被裁併機關(OrgNo:" + dissolveOrgNo + ")之公文, 改搜尋被裁併機關之資源管理檔下的騎縫章...");
				if(!!this.rsrcRepoDissolve && dissolveOrgNo in this.rsrcRepoDissolve) {
					dirs = this.rsrcRepoDissolve[dissolveOrgNo].find({category: "騎縫章"});
					orgNo = dissolveOrgNo;
				}
				else {
					theLogger.warn("無被裁併機關的資源管理檔, 再改回使用本機關的資源管理檔搜尋騎縫章...");
					dirs = this.rsrcRepo.find({category: "騎縫章"});
				}
			}
			else
				dirs = this.rsrcRepo.find({category: "騎縫章"});
			if(dirs.length == 0) {
				dfd.reject("資源管理檔中找不到\"騎縫章\"分類的子目錄!");
			}
			else {
				for(var i=0; i<dirs.length; i++) {
					var dir = dirs[i].cd({name: orgNo});
					if(dir != null) {
						if(ouID != undefined && ouID.length > 0) {
							var subDir = dir.cd({name: ouID});
							if(subDir == null) {
								theLogger.log("找不到單位(" + ouID + ")騎縫章的子目錄, 改以機關騎縫章替代");
								subDir = dir.cd({name: "All"});
							}
							if(subDir != null) {
								var fil = subDir.locate({name: "騎縫章"});
								if(fil != null) {
									theLogger.log("找到騎縫章圖檔 '" + fil.name + "'(local:" + fil.path + ", remote:" + ((fil.remote != undefined)?fil.remote.path:"no remote") + ")");
									// 新方法
									theCacheMgr.get({type: "rsrc", rsrc: fil})
										// 1111207 Raymond 1111396 新增updateCacheFile的callback function
										//.done(function(img) {
										.done(function(img, updateCacheFile) {
											if(img != undefined) {
												// 1111207 Raymond 1111396 修正Chrome更新至108.0.5359.72版後, 段落條列若跨頁時, 列印分頁正常但在瀏覽器的預覽介面中會有內容縮小, 導致右及下邊界多出一些空白空間的問題
												if(typeof fil.size === "string" && fil.size.length > 0) {
													var p = fil.size.split(/x/i);	// 寬X高
													if(p[0] > p[1]) {	// 騎縫章為橫向的話, 預先轉為直向
														var canvas = document.createElement("canvas"),
															tmpImg = new Image();
														tmpImg.onload = function() {
															theLogger.log("騎縫章影像 - width: " + this.width + ", height: " + this.height);
															if(this.width > this.height) {
																canvas.width = this.height;
																canvas.height = this.width;
																var ctx = canvas.getContext("2d");
																ctx.rotate(Math.PI * 3 / 2);	// 畫布逆時針旋轉90度(即順時針270度)
																ctx.translate((0 - canvas.height), 0);
																ctx.drawImage(this, 0, 0);
																ctx.setTransform(1, 0, 0, 1, 0, 0);
																var dataUrl = canvas.toDataURL("image/png");
																if(typeof updateCacheFile === "function") {	// 更新Cache的騎縫章影像資料並修改寬X高記錄
																	updateCacheFile(dataUrl);
																	fil.size = p[1] + "x" + p[0];
																}
																dfd.resolve(dataUrl, p[1] + "x" + p[0]);
															}
														}
														tmpImg.src = img;
													}
													else	// 騎縫章為直向的話, 不需要轉
														dfd.resolve(img, fil.size);
												}
												else
												dfd.resolve(img, fil.size);
											}
										})
										.fail(function(errorText) {
											dfd.reject(errorText);
										});
									return dfd;
								}
								else {
									theLogger.log("找不到騎縫章檔案");
								}
							}
							else {
								theLogger.log("找不到單位或機關騎縫章的子目錄");
							}
						}
						else {	// 2016.12.14 fix for 調閱時列印會沒有ouID, 改用機關騎縫章
							var subDir = dir.cd({name: "All"});
							if(subDir != null) {
								var fil = subDir.locate({name: "騎縫章"});
								if(fil != null) {
									theLogger.log("找到騎縫章圖檔 '" + fil.name + "'(local:" + fil.path + ", remote:" + ((fil.remote != undefined)?fil.remote.path:"no remote") + ")");
									// 新方法
									theCacheMgr.get({type: "rsrc", rsrc: fil})
										// 1111207 Raymond 1111396 新增updateCacheFile的callback function
										//.done(function(img) {
										.done(function(img, updateCacheFile) {
											if(img != undefined) {
												// 1111207 Raymond 1111396 修正Chrome更新至108.0.5359.72版後, 段落條列若跨頁時, 列印分頁正常但在瀏覽器的預覽介面中會有內容縮小, 導致右及下邊界多出一些空白空間的問題
												if(typeof fil.size === "string" && fil.size.length > 0) {
													var p = fil.size.split(/x/i);	// 寬X高
													if(p[0] > p[1]) {	// 騎縫章為橫向的話, 預先轉為直向
														var canvas = document.createElement("canvas"),
															tmpImg = new Image();
														tmpImg.onload = function() {
															theLogger.log("騎縫章影像 - width: " + this.width + ", height: " + this.height);
															if(this.width > this.height) {
																canvas.width = this.height;
																canvas.height = this.width;
																var ctx = canvas.getContext("2d");
																ctx.rotate(Math.PI * 3 / 2);	// 畫布逆時針旋轉90度(即順時針270度)
																ctx.translate((0 - canvas.height), 0);
																ctx.drawImage(this, 0, 0);
																ctx.setTransform(1, 0, 0, 1, 0, 0);
																var dataUrl = canvas.toDataURL("image/png");
																if(typeof updateCacheFile === "function") {	// 更新Cache的騎縫章影像資料並修改寬X高記錄
																	updateCacheFile(dataUrl);
																	fil.size = p[1] + "x" + p[0];
																}
																dfd.resolve(dataUrl, p[1] + "x" + p[0]);
															}
														}
														tmpImg.src = img;
													}
													else	// 騎縫章為直向的話, 不需要轉
														dfd.resolve(img, fil.size);
												}
												else
												dfd.resolve(img, fil.size);
											}
										})
										.fail(function(errorText) {
											dfd.reject(errorText);
										});
									return dfd;
								}
								else {
									theLogger.log("找不到騎縫章檔案");
								}
							}
							else {
								theLogger.log("機關騎縫章的子目錄");
							}
						}
					}
				}
				dfd.reject("找不到符合的騎縫章圖檔");
			}
			return dfd;
		},
		
		// 2014.11.18 - Raymond, 下載機關代碼_Data.xml
		getDataXML: function(orgID,IE) {		//2017.01.19	Leslie	增加傳入是否取得MSXML2物件
			theLogger.log("getDataXML(orgID:'" + orgID + "')");
			// 1120828 Raymond 1120750 新增判斷有新舊機關代碼轉換物件, 則套用轉換為新代碼
			if(!!theSSO && !!theSSO.OrgMap) {
				if(orgID in theSSO.OrgMap) {
					theLogger.log("'" + orgID + "'依OrgMap轉換為新代碼:" + theSSO.OrgMap[orgID]);
					orgID = theSSO.OrgMap[orgID];
				}
				else {
					theLogger.warn("OrgMap中無'" + orgID + "'對應新機關代碼!");
				}
			}
			var dfd = $.Deferred();
			// 1121107 Raymond 1120941 合併1120627, 新增判斷是否為被裁併機關的公文, 是則改用被裁併機關的資源管理檔搜尋應套用的Data設定檔
			// 搜尋相符機關代碼的Data.XML檔
			//var dirs = this.rsrcRepo.find({category: "欄位對映"});
			var dirs = [], dissolveOrgNo = theAOL.docObj.get("ODWMSG", "DISSOLVE_ORG_NO");
			// 1140708 Raymond 1140159 合併1111142, 機關代碼_Data.xml搬家到[Other\機關代碼]子目錄下, RsrcMgmt.xml中子目錄新增"欄位選項"分類, 用於專門放"機關代碼_Data.xml"
			theLogger.log("搜尋'欄位選項'子目錄下(Other)的'機關代碼'子目錄下的'機關代碼_Data.xml'");
			if(!!dissolveOrgNo) {
				theLogger.log("本文為被裁併機關(OrgNo:" + dissolveOrgNo + ")之公文, 改搜尋被裁併機關之資源管理檔下的'" + dissolveOrgNo + "_Data.xml'...");
				if(!!this.rsrcRepoDissolve && dissolveOrgNo in this.rsrcRepoDissolve) {
					dirs = this.rsrcRepoDissolve[dissolveOrgNo].find({category: "欄位選項"});
					orgID = dissolveOrgNo;
				}
				else {
					theLogger.warn("無被裁併機關的資源管理檔, 再改回使用本機關的資源管理檔搜尋本機關的" + orgID + "_Data.xml...");
					dirs = this.rsrcRepo.find({category: "欄位選項"});
				}
			}
			else
				dirs = this.rsrcRepo.find({category: "欄位選項"});
			if(dirs.length == 0) {
				dfd.reject("資源管理檔中找不到\"欄位選項\"分類的子目錄!");
			}
			else {
				for(var i=0; i<dirs.length; i++) {
					var dir = dirs[i].cd({name: orgID});
					if(dir != null) {
						for(var j=0; j<dir.children.length; j++) {
							var fil = dir.children[j];
							//theLogger.log(fil);
							if (fil.name == orgID + "_Data.xml") {
								theLogger.log("找到DataXML檔 '" + fil.name + "'(local:" + fil.path + ", remote:" + ((fil.remote != undefined)?fil.remote.path:"no remote") + ")");
								// 新方法
								if(IE)		//2017.01.19	Leslie	增加傳入是否取得MSXML2物件
									fil.IE = true;
								else
									delete fil.IE;
								//theCacheMgr.get({type: "rsrc", rsrc: fil, async: false})	// 1060623 Raymond 1060147 新增同步下載(for第1次下載機關代碼_Data.xml)參數
								theCacheMgr.get({type: "rsrc", rsrc: fil, async: (!!theSSO && theSSO.offlineMode == true)?true:false})	// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式必須非同步
									.done(function(xmlDoc) {
										//theLogger.log(xmlDoc);
										if(xmlDoc != undefined) {
											dfd.resolve(xmlDoc);
										}
									})
									.fail(function(errorText) {
										dfd.reject(errorText);
									});
								return dfd;
							}
						}
					}
				}
				dfd.reject("找不到'" + orgID + "_Data.xml'檔");
			}
			/*if(!!dissolveOrgNo) {
				theLogger.log("本文為被裁併機關(OrgNo:" + dissolveOrgNo + ")之公文, 改搜尋被裁併機關之資源管理檔下的'" + dissolveOrgNo + "_Data.xml'...");
				if(!!this.rsrcRepoDissolve && dissolveOrgNo in this.rsrcRepoDissolve) {
					dirs = this.rsrcRepoDissolve[dissolveOrgNo].find({category: "欄位對映"});
					orgID = dissolveOrgNo;
				}
				else {
					theLogger.warn("無被裁併機關的資源管理檔, 再改回使用本機關的資源管理檔搜尋本機關的" + orgID + "_Data.xml...");
					dirs = this.rsrcRepo.find({category: "欄位對映"});
				}
			}
			else
				dirs = this.rsrcRepo.find({category: "欄位對映"});
			if(dirs.length == 0) {
				dfd.reject("資源管理檔中找不到\"欄位對映\"分類的子目錄!");
			}
			else {
				for(var i=0; i<dirs.length; i++) {
					for(var j=0; j<dirs[i].children.length; j++) {
						var fil = dirs[i].children[j];
						//theLogger.log(fil);
						if (fil.name == orgID + "_Data.xml") {
							theLogger.log("找到DataXML檔 '" + fil.name + "'(local:" + fil.path + ", remote:" + ((fil.remote != undefined)?fil.remote.path:"no remote") + ")");
							// 新方法
							if(IE)		//2017.01.19	Leslie	增加傳入是否取得MSXML2物件
								fil.IE = true;
							else
								delete fil.IE;
							//theCacheMgr.get({type: "rsrc", rsrc: fil, async: false})	// 1060623 Raymond 1060147 新增同步下載(for第1次下載機關代碼_Data.xml)參數
							theCacheMgr.get({type: "rsrc", rsrc: fil, async: (!!theSSO && theSSO.offlineMode == true)?true:false})	// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式必須非同步
								.done(function(xmlDoc) {
									//theLogger.log(xmlDoc);
									if(xmlDoc != undefined) {
										dfd.resolve(xmlDoc);
									}
								})
								.fail(function(errorText) {
									dfd.reject(errorText);
								});
							return dfd;
						}
					}
				}
				dfd.reject("找不到'" + orgID + "_Data.xml'檔");
			}*/
			return dfd;
		},
		
		// 2016.6.29 - Raymond, 展開樣版樹狀目錄, 第1個參數傳入UL, 第2個參數傳入選取的callback, 第3個參數傳入點擊"新增"的callback
		// 2016.11.1 - 新增noImportButton參數, 新增開啟舊檔按鈕, 未傳入noImportButton則表示要顯示開啟舊檔按鈕
		// 2016.11.3 - 新增filter參數, 提供過濾清單項目功能
		populateTmpl: function($divUl, onSelect, onClickAdd, filter, noImportButton) {
			
			function recursive(nd, $ul, ulAmount) {       
				for (var i=0; i<nd.children.length; i++) {                              
					if (nd.children[i].type == RsrcConst.FILE){
						if(!filter || ($.isFunction(filter) && filter(nd.children[i]))) {	// 未設定filter callback function或filter回傳true則顯示此項目
							$("<li data-theme='c' class='list' data-icon='false'><a></a></li>").appendTo($ul).find("a")
								//.attr("href", "pic/" + nd.children[i].path)
								.attr("title", nd.children[i].remote.path)
								.text(nd.children[i].name)
								.data("rsrcFile", nd.children[i])
								.on('click', function(event) {
									event.preventDefault();
									
									// 1110320	Leslie[1110167]	[考試院]UI調整，新增草稿方式可設定
									var bNewDraftWithConfirm = ('WE_NEW_DRAFT_WITHOUT_CONFIRM' in theSSO.User.EnvSettings)?theSSO.User.EnvSettings['WE_NEW_DRAFT_WITHOUT_CONFIRM'] == 'Y':false;
									if(bNewDraftWithConfirm && $.isFunction(onClickAdd)){
										var rsrcFile = $(this).data("rsrcFile");
										onClickAdd(rsrcFile.name, {name: rsrcFile.name, docType: rsrcFile.docType, subDocType: rsrcFile.subDocType, wfioUrl: rsrcFile.remote.getWFIOURL(), filePath: rsrcFile.remote.getDirPath() + "\\" + rsrcFile.remote.path, defPrintXSLName: rsrcFile.defPrintXSLName});
										return false;
									}
									
									$divUl.find("a button").remove();
									$divUl.find("a").removeClass("ui-btn-active");
									$(this).addClass("ui-btn-active");
									
									if($.isFunction(onSelect))
										onSelect($(this).data("rsrcFile").name, $(this).data("rsrcFile"));
									
									if($.isFunction(onClickAdd)) {	// 2016.11.3 若無onClickAdd callback function, 則不顯示「加入」按鈕
										$("<button>加入</button>").appendTo(this).buttonMarkup({corners: true, shadow: true, theme: 'b', inline: true})
											.on('click', function(evt) {
												evt.preventDefault();
												var $a = $(this).closest("a");
												var rsrcFile = $a.data("rsrcFile");
												// 1100310 Raymond 1090991 新增defPrintXSLName屬性
												//onClickAdd(rsrcFile.name, {name: rsrcFile.name, docType: rsrcFile.docType, subDocType: rsrcFile.subDocType, wfioUrl: rsrcFile.remote.getWFIOURL(), filePath: rsrcFile.remote.getDirPath() + "\\" + rsrcFile.remote.path});
												onClickAdd(rsrcFile.name, {name: rsrcFile.name, docType: rsrcFile.docType, subDocType: rsrcFile.subDocType, wfioUrl: rsrcFile.remote.getWFIOURL(), filePath: rsrcFile.remote.getDirPath() + "\\" + rsrcFile.remote.path, defPrintXSLName: rsrcFile.defPrintXSLName});
												return false;
											});
									}
									
									return false;
								});
						}
					}
					else {	// RsrcConst.DIR
						var child = nd.children[i];
						var $ulDiv = $("<li data-icon='false' style='padding-right:0px;padding-left:0px;padding:0em 0px;background:#ddd;'><div data-role='collapsible' data-theme='b' data-inset='false'></div></li>")
										.appendTo($ul)
										.find("div");
						var $spanH2 = $("<h2 style='margin:0;'>" + nd.children[i].name + "</h2>")
										.append("<span class='ui-li-count'></span>")
										.appendTo($ulDiv)
										.find("span");
						var $ulDivUl = $("<ul data-role='listview' class='ulChild"+ulAmount+"'></ul>").appendTo($ulDiv);
						
						//計算子節點下的檔案數量
						var count=0;
						for (var a=0;a<child.children.length;a++) {
							if(child.children[a].type == RsrcConst.FILE)
								count ++;
						}
						//寫入bubble count
						if (count!=0) {
							$spanH2.text(count);
						}
						else{
							$spanH2.text(count).hide();
						}
						recursive(child, $ulDivUl, ulAmount+1);	// 遞增子目錄的階層
					}
				}
			}
			if(!noImportButton) {	// 2016.11.1 新增開啟舊檔按鈕
				$("<li data-theme='b' class='list' data-icon='action'><a data-role='button'>開啟舊檔...</a></li>").appendTo($divUl).find("a")
				.on('click', function(event) {
					// 1120831 Raymond 1120215 新增標檢局客製化支援捷成TXT檔匯入功能
					// 1130809 Raymond 1130313 合併1111007(1100394), 支援開啟離線模式下儲存的ZIP公文電子檔
					//let accpExt = ".xml,.di";
					let accpExt = ".xml,.di,.zip";
					if(SSO_CONFIG.OrgNickName == "BSMI")
						accpExt += ",.txt";
					// 1120831 Raymond 1120215 新增標檢局客製化支援捷成TXT檔匯入功能
					//var $inp = $("<input id='importFileNew' type='file' accept='.xml,.di' style='display:none;'>").appendTo("body").on('change', function(event) {
					var $inp = $("<input id='importFileNew' type='file' accept='" + accpExt + "' style='display:none;'>").appendTo("body").on('change', function(event) {
						function load(str) {
							if("ActiveXObject" in window) {// for IE-compatible
								var xmlDoc = new ActiveXObject("MSXML2.DOMDocument");
								xmlDoc.resolveExternals = false;
								xmlDoc.validateOnParse = false;	// 2016.12.27 fix for 匯入DI
								xmlDoc.preserveWhiteSpace = true;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
								if(xmlDoc.loadXML(str)) {
									// 找文別及函(令)類別
									var docType = xmlDoc.documentElement.nodeName;
									var subDocType;
									var nd = xmlDoc.selectSingleNode("/*/函類別");
									if(nd) {
										subDocType = nd.getAttribute("代碼");
									}
									else {
										nd = xmlDoc.selectSingleNode("/*/令類別");
										if(nd)
											subDocType = nd.getAttribute("代碼");
									}
									if($.isFunction(onClickAdd)) {
										onClickAdd("開啟舊檔", {name: "開啟舊檔", docType: docType, subDocType: subDocType, content: str});
									}
								}
								else {
									var pe = xmlDoc.parseError;
									theLogger.error("(IE)載入XML失敗! " + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
									alert(pe.reason);
								}
							}
							else {	// for Non-IE
								try {
									var xmlDoc = (new DOMParser()).parseFromString(str, "text/xml");
									// 找文別及函(令)類別
									var docType = xmlDoc.documentElement.nodeName;
									var subDocType;
									var snapshot = xmlDoc.evaluate("/*/函類別", xmlDoc, null, 7, null);
									if(snapshot && snapshot.snapshotLength > 0) {
										subDocType = snapshot.snapshotItem(0).getAttribute("代碼");
									}
									else {
										snapshot = xmlDoc.evaluate("/*/令類別", xmlDoc, null, 7, null);
										if(snapshot && snapshot.snapshotLength > 0)
											subDocType = snapshot.snapshotItem(0).getAttribute("代碼");
									}
									if($.isFunction(onClickAdd)) {
										onClickAdd("開啟舊檔", {name: "開啟舊檔", docType: docType, subDocType: subDocType, content: str});
									}
								}
								catch(e) {
									theLogger.error("載入XML失敗! " + e.message + " - " + e.sourceURL + ":" + e.line);
									alert(e.message);
								}
							}
						};
						function reload(file) {
							var rdr = new FileReader();
							rdr.onload = function() {
								theLogger.log(this.result);
								theLogger.log(SSOUtil.typeOf(this.result));
								if(SSOUtil.typeOf(this.result) == "string") {
									// 1120831 Raymond 1120215 新增標檢局客製化支援捷成TXT檔匯入功能
									if(file.name.match(/.txt$/i) && !!nsEditor.determineAndImportFromTXT && nsEditor.determineAndImportFromTXT.call(this, function(xmlDoc) {
										load(Util.getXml(xmlDoc));
									})) {}
									else {
									load(this.result);
									}
								}
								else
									theLogger.error("檔案讀取後不是字串!!");
							}
							theLogger.log("以Big5編碼重新載入'" + file.name + "'(" + file.type + ", " + file.size + "bytes)");
							rdr.readAsText(file, "Big5");
						};
						var msg = "";
						for(var i=0; i<this.files.length; i++) {
							msg += this.files[i].name + "(" + this.files[i].type + ", " + this.files[i].size + "Bytes)\r\n";
							var rdr = new FileReader();
							var that = this.files[i];
							rdr.onload = function() {
								theLogger.log(this.result);
								theLogger.log(SSOUtil.typeOf(this.result));
								if(SSOUtil.typeOf(this.result) == "string") {
									// 1120831 Raymond 1120215 新增標檢局客製化支援捷成TXT檔匯入功能
									if(that.name.match(/.txt$/i)) {
										theLogger.warn("開啟的舊檔是TXT檔");
										reload(that);
									}
									else {
									// 偵測是否編碼錯誤
									var enc = this.result.indexOf("encoding");
									if(enc > 0) {
										var closure = this.result.indexOf("?>");
										if(enc < closure) {
											var par = this.result.substring(enc, closure);
											var m = par.match(/encoding\s*=\s*['"]([a-zA-Z0-9-]+)['"]/);
											if(m && m.length > 1) {
												if(m[1].toLowerCase() == "big5") {	// big5編碼須加參數重新讀取
													reload(that);
												}
												else {	// 非big5視為正常解讀的字串
													load(this.result);
												}
											}
											else
												theLogger.error("找不到encoding屬性中宣告的內容'" + par + "'");
										}
										else if(closure < 0)
											theLogger.error("有encoding字串但找不到'?>'結尾!");
										else
											theLogger.error("有encoding字串但在'?>'之後!");
									}
									else {	// 沒有宣告encoding的XML或DI視為UTF-8或UTF-16可正常解讀的字串
										load(this.result);
									}
									}
								}
								// 1130809 Raymond 1130313 合併1111007(1100394), 開啟的類型是ArrayBuffer表示是離線模式下儲存打包的ZIP檔
								else if(SSOUtil.typeOf(this.result) == "arraybuffer") {
									if($.isFunction(onClickAdd)) {
										let blb = new Blob([this.result]);
										onClickAdd("開啟舊檔", {name: "開啟舊檔", docType: "", subDocType: "", content: URL.createObjectURL(blb)});
									}
								}
								else
									theLogger.error("檔案讀取後不是字串!");
							}
							theLogger.log("載入'" + this.files[i].name + "'(" + this.files[i].type + ", " + this.files[i].size + "bytes)");
							// 1130809 Raymond 1130313 合併1111007(1100394), 判斷開啟的是ZIP檔(WIN7是application/zip, WIN10是application/x-zip-compressed)則改用readAsArrayBuffer, IE的FileReader會讀到type="", 故IE下改以副檔名判斷
							if(this.files[i].type == "application/zip" || this.files[i].type == "application/x-zip-compressed" || (navigator.userAgent.indexOf("Trident") >= 0 && that.name.match(/.zip$/i)))
								rdr.readAsArrayBuffer(this.files[i]);
							else
								rdr.readAsText(this.files[i]);
						}
						$(this).remove();
					}).trigger('click');
					return false;
				});
			}
			this.enumDirs("樣版", function(dir) {
				
				recursive(dir, $divUl ,1);
				
			});
			// 1141106 Raymond 外貿序346 修改為右側新增稿件頁籤開啟的樣版清單面板也比照左邊新增稿件頁籤開啟的樣版清單面板顯示3個匯入按鈕
			// 1141022 Raymond 1141125 新增當機關暱稱為"TAITRA"(外貿)時, 新增「匯入調派令CSV(多人)」、「匯入晉升令CSV(多人)」及「匯入獎勵令CSV(多人)」的按鈕於MP的樣版選單中的最下面
			//if(!noImportButton && SSO_CONFIG?.OrgNickName == "TAITRA") {
			if(SSO_CONFIG?.OrgNickName == "TAITRA") {
				// 三個按鈕共用函式, 只有呼叫onClickAdd時參數依據event.data變化
				function onClick(evt) {
					try {
						var csvType = evt.data.csvType;
						theLogger.log(`執行匯入${csvType}令(多人)選單項目功能...`);
						var $inp = $("<input id='importFileTAITRACSV' type='file' accept='.csv' style='display:none;'>").appendTo("body").on('change', function(evnt) {
							function load(str) {
								if($.isFunction(onClickAdd)) {
									onClickAdd(`匯入${csvType}令CSV(多人)`, {name: `匯入${csvType}令CSV(多人)`, docType: `多人格式${csvType}令CSV`, subDocType: "", content: str});
								}
							};
							function reload(file) {
								var rdr = new FileReader();
								rdr.onload = function() {
									theLogger.log(this.result);
									theLogger.log(SSOUtil.typeOf(this.result));
									if(SSOUtil.typeOf(this.result) == "string") {
										load(this.result);
									}
									else
										theLogger.error("檔案讀取後不是字串!!");
								}
								theLogger.log("以Big5編碼重新載入'" + file.name + "'(" + file.type + ", " + file.size + "bytes)");
								rdr.readAsText(file, "Big5");
							};
							var msg = "";
							for(var i=0; i<this.files.length; i++) {
								msg += this.files[i].name + "(" + this.files[i].type + ", " + this.files[i].size + "Bytes)\r\n";
								var rdr = new FileReader();
								var that = this.files[i];
								rdr.onload = function() {
									theLogger.log(this.result);
									theLogger.log(SSOUtil.typeOf(this.result));
									if(SSOUtil.typeOf(this.result) == "string") {
										// 偵測是否編碼錯誤
										if(this.result.charCodeAt(0) == 0xFFFD)	// 第一個字是Big5轉壞的字元, 則以Big5編碼重讀
											reload(that);
										else	// 沒有宣告encoding的XML或DI視為UTF-8或UTF-16可正常解讀的字串
											load(this.result);
									}
									else
										theLogger.error("檔案讀取後不是字串!");
								}
								theLogger.log("載入'" + this.files[i].name + "'(" + this.files[i].type + ", " + this.files[i].size + "bytes)");
								rdr.readAsText(this.files[i]);
							}
							$(this).remove();
						}).trigger('click');
						return false;
					}
					catch(e) {
						theLogger.error(e.stack || e.message);
					}
				}
				// 新增匯入調派令CSV(多人)按鈕
				$("<li data-theme='b' class='list' data-icon='action'><a data-role='button'>匯入調派令CSV(多人)...</a></li>").appendTo($divUl).find("a").on("click", {csvType: "調派"}, onClick);
				// 新增匯入晉升令CSV(多人)按鈕
				$("<li data-theme='b' class='list' data-icon='action'><a data-role='button'>匯入晉升令CSV(多人)...</a></li>").appendTo($divUl).find("a").on("click", {csvType: "晉升"}, onClick);
				// 新增匯入獎勵令CSV(多人)按鈕
				$("<li data-theme='b' class='list' data-icon='action'><a data-role='button'>匯入獎勵令CSV(多人)...</a></li>").appendTo($divUl).find("a").on("click", {csvType: "獎勵"}, onClick);
			}
		},
		
		// 1060707 Raymond 1060361 展開範本樹狀目錄, 第1個參數傳入UL, 第2個參數傳入選取的callback, 第3個參數傳入點擊"新增"的callback, 第4個參數提供過濾清單項目功能
		populateSample: function($divUl, onSelect, onClickAdd, filter) {
			
			function recursive(nd, $ul, ulAmount) {
				var counts = 0;
				for (var i=0; i<nd.children.length; i++) {                              
					if (nd.children[i].type == RsrcConst.FILE){
						if(!filter || ($.isFunction(filter) && filter(nd.children[i]))) {	// 未設定filter callback function或filter回傳true則顯示此項目
							counts++;
							$("<li data-theme='c' class='list' data-icon='false'><a></a></li>").appendTo($ul).find("a")
								//.attr("href", "pic/" + nd.children[i].path)
								.attr("title", nd.children[i].remote.path)
								.text(nd.children[i].name)
								.data("rsrcFile", nd.children[i])
								.on('click', function(event) {
									event.preventDefault();
									
									$divUl.find("a button").remove();
									$divUl.find("a").removeClass("ui-btn-active");
									$(this).addClass("ui-btn-active");
									
									if($.isFunction(onSelect))
										onSelect($(this).data("rsrcFile").name, $(this).data("rsrcFile"));
									
									if($.isFunction(onClickAdd)) {	// 若無onClickAdd callback function, 則不顯示「加入」按鈕
										$("<button>加入</button>").appendTo(this).buttonMarkup({corners: true, shadow: true, theme: 'b', inline: true})
											.on('click', function(evt) {
												evt.preventDefault();
												var $a = $(this).closest("a");
												var rsrcFile = $a.data("rsrcFile");
												// 1110818 Raymond 修正共用範本設定了"預設排版"屬性卻未生效的問題
												// 1090423 Raymond 1090257 共用範本新增type屬性並設為1
												//onClickAdd(rsrcFile.name, {name: rsrcFile.name, docType: rsrcFile.docType, subDocType: rsrcFile.subDocType, wfioUrl: rsrcFile.remote.getWFIOURL(), filePath: rsrcFile.remote.getDirPath() + "\\" + rsrcFile.remote.path});
												//onClickAdd(rsrcFile.name, {name: rsrcFile.name, docType: rsrcFile.docType, subDocType: rsrcFile.subDocType, wfioUrl: rsrcFile.remote.getWFIOURL(), filePath: rsrcFile.remote.getDirPath() + "\\" + rsrcFile.remote.path, type:1});
												onClickAdd(rsrcFile.name, {name: rsrcFile.name, docType: rsrcFile.docType, subDocType: rsrcFile.subDocType, wfioUrl: rsrcFile.remote.getWFIOURL(), filePath: rsrcFile.remote.getDirPath() + "\\" + rsrcFile.remote.path, type:1, defPrintXSLName: rsrcFile.defPrintXSLName});
												return false;
											});
									}
									
									return false;
								});
						}
					}
					else {	// RsrcConst.DIR
						var child = nd.children[i];
						// 1100922 Raymond 1080763 修正MP的新增稿件的範本面板的共用範本子目錄的樣式與自訂範本一致
						//var $ulDiv = $("<li data-icon='false' style='padding-right:0px;padding-left:0px;padding:0em 0px;background:#ddd;'><div data-role='collapsible' data-theme='b' data-inset='false'></div></li>")
						var $ulDiv = $("<li style='padding:0px' class='ui-li-has-count'><div data-role='collapsible' data-theme='b' data-inset='false'></div></li>")
										.appendTo($ul)
										.find("div");
						var $spanH2 = $("<h2 style='margin:0;'>" + nd.children[i].name + "</h2>")
										// 1100922 Raymond 1080763 修正MP的新增稿件的範本面板的共用範本子目錄的範本數量不會套用樣式的問題
										//.append("<span class='ui-li-count'></span>")
										.append("<span class='ui-li-count ui-body-inherit'></span>")
										.appendTo($ulDiv)
										.find("span");
						var $ulDivUl = $("<ul data-role='listview' class='ulChild"+ulAmount+"'></ul>").appendTo($ulDiv);
						
						//計算子節點下的檔案數量
						var count=0;
						for (var a=0;a<child.children.length;a++) {
							if(child.children[a].type == RsrcConst.FILE)
								count ++;
						}
						//寫入bubble count
						if (count!=0) {
							$spanH2.text(count);
						}
						else{
							$spanH2.text(count).hide();
						}
						recursive(child, $ulDivUl, ulAmount+1);	// 遞增子目錄的階層
					}
				}
				// 1100922 Raymond 1080763 修正子目錄範本數量顯示為0的錯誤
				//$ul.closest("li").find(".ui-li-count").text(counts);	// 更新數量
				$ul.closest("li").find("> div > h2 .ui-li-count").text(counts);	// 更新數量
			}
			this.enumDirs("範本", function(dir) {
				
				recursive(dir, $divUl.find("> li").eq(1).find("ul") ,1);
				
				// 1100922 Raymond 1080763 修正MP的新增稿件的範本面板的共用範本不會套用樣式的問題
				if($divUl.find("> li").eq(1).find("ul").eq(0).hasClass("ui-listview"))
					$divUl.find("> li").eq(1).find("ul").eq(0).listview("refresh").enhanceWithin();
			});
		},
		
		// 2016.8.5 - Raymond, 下載儲存檢核設定.xml
		getSaveCheckXML: function() {
			theLogger.log("getSaveCheckXML()");
			var dfd = $.Deferred();
			var dirs = this.rsrcRepo.find({category: "其他"});
			if(dirs.length == 0) {
				dfd.reject("資源管理檔中找不到\"其他\"分類的子目錄!");
			}
			else {
				for(var i=0; i<dirs.length; i++) {
					for(var j=0; j<dirs[i].children.length; j++) {
						var fil = dirs[i].children[j];
						//theLogger.log(fil);
						if (fil.name == "儲存檢核設定檔") {
							theLogger.log("找到儲存檢核設定檔 '" + fil.name + "'(local:" + fil.path + ", remote:" + ((fil.remote != undefined)?fil.remote.path:"no remote") + ")");
							// 新方法
							theCacheMgr.get({type: "rsrc", rsrc: fil})
								.done(function(xmlDoc) {
									//theLogger.log(xmlDoc);
									dfd.resolve(xmlDoc);
								})
								.fail(function(errorText) {
									dfd.reject(errorText);
								});
							return dfd.promise();
						}
					}
				}
				dfd.reject("找不到儲存檢核設定檔");
			}
			return dfd.promise();
		},
		
		// 1121006 Raymond 北大彙整表序256, 下載文別轉換預轉.xsl
		getPretransformDocTypeXSL: function() {
			theLogger.log("getPretransformDocTypeXSL()");
			var dfd = $.Deferred();
			var dirs = this.rsrcRepo.find({category: "其他"});
			if(dirs.length == 0) {
				dfd.reject("資源管理檔中找不到\"其他\"分類的子目錄!");
			}
			else {
				for(var i=0; i<dirs.length; i++) {
					for(var j=0; j<dirs[i].children.length; j++) {
						var fil = dirs[i].children[j];
						//theLogger.log(fil);
						if (fil.name == "文別轉換預轉") {
							theLogger.log("找到文別轉換預轉 '" + fil.name + "'(local:" + fil.path + ", remote:" + ((fil.remote != undefined)?fil.remote.path:"no remote") + ")");
							// 新方法
							theCacheMgr.get({type: "rsrc", rsrc: fil})
								.done(function(xmlDoc) {
									//theLogger.log(xmlDoc);
									dfd.resolve(xmlDoc);
								})
								.fail(function(errorText) {
									dfd.reject(errorText);
								});
							return dfd.promise();
						}
					}
				}
				dfd.reject("找不到文別轉換預轉設定檔");
			}
			return dfd.promise();
		},
		
		// 1121107 Raymond 1120941 合併1120627, 新增初始化被裁併機關的資源管理檔
		initDissolveRsrc: function(dissolveOrgNo) {
			theLogger.log("初始化被裁併機關(OrgNo:" + dissolveOrgNo + ")的(共用)資源檔...");
			var dfd = $.Deferred();
			var that = this;
			if(!("rsrcRepoDissolve" in that))
				that.rsrcRepoDissolve = {};	// 記錄機關代碼, 可支援多組被裁併機關
			if(dissolveOrgNo in that.rsrcRepoDissolve) {	// 已初始化過這個被裁併機關代碼就不要再呼叫WS
				theLogger.warn("重複呼叫!");
				dfd.resolve();
			}
			else {
				that.rsrcRepoDissolve[dissolveOrgNo] = new RsrcRepo();
				theWebServices.getDissolveRsrc(dissolveOrgNo, {
					success: function(xmlNode) {
						theLogger.log("被裁併機關(OrgNo:" + dissolveOrgNo + ")的資源管理檔已下載成功, 檢查更新...");
						// TODO: 合併
						that.rsrcRepoDissolve[dissolveOrgNo].import(xmlNode);
						dfd.resolve();
					},
					error: function(e) {
						theLogger.log("被裁併機關(OrgNo:" + dissolveOrgNo + ")的資源管理檔下載失敗!");
						dfd.reject(e);
					}
				});
			}
			return dfd.promise();
		},
	}
	
	window.thePrivateRsrc = {
		
		// public methods
		init: function() {
			theLogger.log("同步本地(個人)資源檔...");
			var dfd = $.Deferred();
			
			// 先讀本地暫存的
			thePrivateRsrc.rsrcRepo = new RsrcRepo();
			if(localStorage[theUserInfo.userId + "_UserRsrcMgmt.xml"] != undefined)
				thePrivateRsrc.rsrcRepo.formXmlNode((new DOMParser()).parseFromString(localStorage[theUserInfo.userId + "_UserRsrcMgmt.xml"], "text/xml"));
			
			var that = this;
			theWebServices.getPrivateRsrc({
				success: function(xmlNode) {
					theLogger.log("遠端資源檔已下載成功, 檢查更新...");
					// TODO: 合併
					thePrivateRsrc.rsrcRepo.import(xmlNode);
					
					dfd.resolve();
				},
				error: function(e) {
					theLogger.log("遠端資源檔下載失敗!");
					dfd.reject(e);
				}
			});
			return dfd.promise();
		}
	}
	
	if(inst != undefined)
		inst.finish();
	
})();
